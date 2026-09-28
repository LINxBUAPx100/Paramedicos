import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { barajarPreguntas } from '../../lib/baraja.js'
import { resumenExamen } from '../../lib/pulsoModelo.js'

// Examen en modo sin distracciones (PTEM Pulso). Distinto del Quiz de
// práctica a propósito:
//  · no corrige pregunta a pregunta: se responde, se cambia de opinión y se
//    entrega al final, como en un examen de verdad;
//  · mapa de preguntas para saltar y marcar «revisar después»;
//  · entregar pide confirmación en la misma pantalla y dice cuántas faltan;
//  · el resultado dice qué temas repasar y permite revisar cada respuesta.
//
// Mismas props que Quiz (preguntas, onComplete, titulo, semilla, onReintentar)
// para poder sustituirlo sin tocar cómo se guardan los intentos. El barajado de
// opciones usa la misma función y la misma semilla: el examen que ve el alumno
// es reproducible igual que antes.
export default function ExamenPulso({ preguntas, onComplete, titulo, semilla = null, onReintentar = null }) {
  const baraja = useMemo(() => barajarPreguntas(preguntas, semilla), [preguntas, semilla])
  const total = baraja.length
  const [i, setI] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [marcadas, setMarcadas] = useState(() => new Set())
  const [fase, setFase] = useState('respondiendo') // respondiendo | confirmar | resultado
  const [mapa, setMapa] = useState(false)
  const [segundos, setSegundos] = useState(0)
  const [soloErrores, setSoloErrores] = useState(false)
  const titular = useRef(null)
  const avisado = useRef(false)

  const respondidas = Object.keys(respuestas).length
  const enCurso = fase !== 'resultado'

  // Modo sin distracciones: mientras se responde se ocultan menú, pestañas y pie.
  useEffect(() => {
    if (!enCurso) return undefined
    document.body.classList.add('pl-modo-examen')
    return () => document.body.classList.remove('pl-modo-examen')
  }, [enCurso])

  // Protección de salida: cerrar o recargar a medias pide confirmación.
  useEffect(() => {
    if (!enCurso || !respondidas) return undefined
    const aviso = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', aviso)
    return () => window.removeEventListener('beforeunload', aviso)
  }, [enCurso, respondidas])

  useEffect(() => {
    if (!enCurso) return undefined
    const t = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [enCurso])

  useEffect(() => { titular.current?.focus({ preventScroll: true }) }, [i, fase])

  // Teclado: 1-4 elige, ← → navega, M marca.
  useEffect(() => {
    if (fase !== 'respondiendo') return undefined
    const tecla = (e) => {
      if (!total || e.target.closest?.('input, textarea, select')) return
      const n = Number(e.key)
      if (n >= 1 && n <= (baraja[i]?.opciones.length || 0)) { e.preventDefault(); elegir(n - 1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); ir(i + 1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); ir(i - 1) }
      else if (e.key === 'm' || e.key === 'M') { e.preventDefault(); marcar() }
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  })

  if (!total) {
    return <section className="ui-estado" role="status"><h2>No hay preguntas disponibles</h2><p>Este examen todavía no tiene preguntas avaladas. Vuelve al módulo desde la navegación.</p></section>
  }

  const pregunta = baraja[i]
  const ir = (k) => { setI(Math.max(0, Math.min(total - 1, k))); setMapa(false) }
  const elegir = (op) => setRespuestas((r) => ({ ...r, [i]: op }))
  const marcar = () => setMarcadas((m) => { const n = new Set(m); if (n.has(i)) n.delete(i); else n.add(i); return n })
  const entregar = () => {
    const res = resumenExamen(baraja, respuestas)
    setFase('resultado')
    if (!avisado.current) { avisado.current = true; onComplete?.(res.aciertos, total) }
  }
  const reloj = `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`

  if (fase === 'resultado') {
    const res = resumenExamen(baraja, respuestas)
    const pct = Math.round((res.aciertos / total) * 100)
    return (
      <div className="pl-examen-resultado">
        <div className="pl-franja" aria-hidden="true" />
        <div className="pl-examen-res-cab">
          <div className={`pl-examen-pct ${pct >= 70 ? 'es-ok' : 'es-bajo'}`} style={{ '--pct': pct }}>
            <b>{pct}%</b><span>{res.aciertos} de {total}</span>
          </div>
          <div>
            <h2 tabIndex={-1} ref={titular}>{pct >= 70 ? 'Buen resultado' : 'Todavía hay temas que reforzar'}</h2>
            <p>{res.sinResponder ? `${res.sinResponder} sin responder · ` : ''}{reloj} en total. Es una autoevaluación para saber qué repasar, no una calificación oficial.</p>
          </div>
        </div>
        {res.porTema.length > 0 && (
          <section className="pl-examen-temas" aria-label="Qué repasar">
            <h3 className="pl-rotulo">Qué repasar primero</h3>
            <ul>
              {res.porTema.map((t) => (
                <li key={t.temaId}>
                  <Link to={`/tema/${t.temaId}`}>{t.temaTitulo || t.temaId}</Link>
                  <span className="pl-examen-barra" aria-hidden="true"><i style={{ width: `${(t.aciertos / t.total) * 100}%` }} /></span>
                  <span className="pl-examen-cifra">{t.aciertos}/{t.total}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="pl-examen-revision-cab">
          <h3>Revisa tus respuestas</h3>
          <button type="button" className="btn btn--fantasma btn--sm" aria-pressed={soloErrores} onClick={() => setSoloErrores((v) => !v)}>
            Solo errores ({total - res.aciertos})
          </button>
        </div>
        <ol className="pl-examen-revision">
          {baraja.map((p, k) => {
            const elegida = respuestas[k]
            const ok = elegida !== undefined && p.correcta.includes(elegida)
            if (soloErrores && ok) return null
            return (
              <li key={k} className={ok ? 'es-ok' : 'es-mal'} value={k + 1}>
                <b>{p.pregunta}</b>
                <span>Tu respuesta: {elegida === undefined ? 'sin responder' : p.opciones[elegida]}</span>
                {!ok && <span className="pl-examen-correcta">Correcta: {p.correcta.map((c) => p.opciones[c]).join(' / ')}</span>}
                {p.explicacion && <p>{p.explicacion}</p>}
              </li>
            )
          })}
        </ol>
        {onReintentar && <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={onReintentar}>Otro intento</button>}
      </div>
    )
  }

  return (
    <div className="pl-examen">
      <div className="pl-examen-barra-sup">
        <b>{titulo}</b>
        <span className="pl-examen-cifra">{respondidas}/{total} respondidas</span>
        <span className="pl-examen-reloj" aria-label={`Tiempo: ${reloj}`}>{reloj}</span>
        <button type="button" className="btn btn--fantasma btn--sm pl-examen-ver-mapa" aria-expanded={mapa} onClick={() => setMapa((v) => !v)}>Mapa</button>
      </div>

      <div className="pl-examen-cuerpo">
        <section className="pl-examen-pregunta" aria-live="polite">
          <span className="pl-rotulo">Pregunta {i + 1} de {total}{marcadas.has(i) ? ' · marcada para revisar' : ''}</span>
          <h2 tabIndex={-1} ref={titular}>{pregunta.pregunta}</h2>
          <div className="pl-examen-opciones" role="radiogroup" aria-label="Opciones">
            {pregunta.opciones.map((op, k) => (
              <button
                type="button"
                key={k}
                role="radio"
                aria-checked={respuestas[i] === k}
                className={respuestas[i] === k ? 'es-elegida' : ''}
                onClick={() => elegir(k)}
              >
                <span>{k + 1}</span>{op}
              </button>
            ))}
          </div>
          <div className="pl-examen-acciones">
            <button type="button" className="btn btn--fantasma" onClick={() => ir(i - 1)} disabled={i === 0}>‹ Anterior</button>
            <button type="button" className="btn btn--fantasma" aria-pressed={marcadas.has(i)} onClick={marcar}>
              {marcadas.has(i) ? 'Quitar marca' : 'Revisar después'}
            </button>
            {i < total - 1
              ? <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={() => ir(i + 1)}>Siguiente ›</button>
              : <button type="button" className="btn btn--critico-pl" onClick={() => setFase('confirmar')}>Entregar examen</button>}
          </div>
          <p className="pl-nota-pie">Teclas: 1 a {pregunta.opciones.length} para elegir, flechas para moverte, M para marcar.</p>
        </section>

        <aside className={`pl-examen-mapa ${mapa ? 'es-abierto' : ''}`} aria-label="Mapa de preguntas">
          <span className="pl-rotulo">Mapa del examen</span>
          <div className="pl-examen-casillas">
            {baraja.map((_, k) => (
              <button
                type="button"
                key={k}
                className={[respuestas[k] !== undefined ? 'es-respondida' : '', marcadas.has(k) ? 'es-marcada' : '', k === i ? 'es-actual' : ''].join(' ')}
                aria-label={`Pregunta ${k + 1}${respuestas[k] !== undefined ? ', respondida' : ', sin responder'}${marcadas.has(k) ? ', marcada' : ''}`}
                aria-current={k === i ? 'step' : undefined}
                onClick={() => ir(k)}
              >
                {k + 1}
              </button>
            ))}
          </div>
          <p className="pl-examen-leyenda"><i className="es-respondida" />Respondida <i className="es-marcada" />Marcada <i />Sin responder</p>
          <button type="button" className="btn btn--critico-pl" onClick={() => setFase('confirmar')}>Entregar examen</button>
        </aside>
      </div>

      {fase === 'confirmar' && (
        <div className="pl-cierre-velo" role="presentation">
          <div className="pl-cierre" role="alertdialog" aria-modal="true" aria-labelledby="pl-entregar-titulo">
            <div className="pl-cierre-cuerpo">
              <h2 id="pl-entregar-titulo" tabIndex={-1} ref={titular}>¿Entregar el examen?</h2>
              <p>
                {total - respondidas > 0 ? `Te faltan ${total - respondidas} sin responder. ` : 'Respondiste todas. '}
                {marcadas.size > 0 ? `Tienes ${marcadas.size} marcada${marcadas.size === 1 ? '' : 's'} para revisar.` : ''}
                {' '}Después de entregar ya no podrás cambiar respuestas.
              </p>
              <div className="pl-acciones">
                <button type="button" className="btn btn--critico-pl" onClick={entregar}>Entregar examen</button>
                <button type="button" className="btn btn--fantasma" onClick={() => setFase('respondiendo')}>Seguir revisando</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
