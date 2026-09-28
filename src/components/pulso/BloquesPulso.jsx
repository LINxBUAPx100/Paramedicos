import { useEffect, useRef, useState } from 'react'
import { useProgress } from '../../context/ProgressContext.jsx'

// Bloques de lectura de PTEM Pulso. Toman bloques que YA existen en el molde
// v2 (tabla, lista de «Repaso rápido», lista de «Preguntas de repaso oral") y
// los presentan de otra forma. No añaden texto: cada palabra sale del bloque.

// ---------- Siglas como fichas ----------

// Una tabla es una sigla cuando su primera columna son letras sueltas (AVDI,
// SAMPLE, XABCDE…). Entonces se lee mejor como fichas que como tabla.
export function esTablaSigla(bloque) {
  const filas = bloque?.filas || []
  return filas.length >= 2 && filas.length <= 8 && (bloque.headers || []).length >= 2 &&
    filas.every((f) => Array.isArray(f) && /^[A-ZÁÉÍÓÚÑ0-9]{1,2}$/.test(String(f[0] || '').trim()))
}

export function FichasSigla({ bloque }) {
  const [fijas, setFijas] = useState(() => new Set())
  const alternar = (i) => setFijas((s) => {
    const n = new Set(s)
    if (n.has(i)) n.delete(i); else n.add(i)
    return n
  })
  return (
    <div className="pl-sigla-wrap">
      {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
      <div className="pl-sigla" style={{ '--pl-sigla-n': Math.min(4, bloque.filas.length) }}>
        {bloque.filas.map((fila, i) => (
          <button
            type="button"
            key={i}
            className="pl-ficha"
            aria-pressed={fijas.has(i)}
            onClick={() => alternar(i)}
          >
            <span className="pl-ficha-letra">{fila[0]}</span>
            {fila[1] && <b>{fila[1]}</b>}
            {fila.slice(2).filter(Boolean).map((t, j) => <span key={j}>{t}</span>)}
          </button>
        ))}
      </div>
      {/* La tabla original sigue ahí para lectores de pantalla. */}
      <table className="pl-solo-lector">
        <thead><tr>{bloque.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{bloque.filas.map((f, i) => <tr key={i}>{f.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

// ---------- Repaso rápido: autoevaluación ----------

export function RepasoRapido({ temaId, bloque }) {
  const { estado, marcarRepasoRapido } = useProgress()
  const sabidos = new Set(estado.repasoRapido?.[temaId] || [])
  const items = bloque.items || []
  const n = items.filter((_, i) => sabidos.has(i)).length
  return (
    <div className="pl-repaso">
      <div className="pl-repaso-cab">
        <span className="pl-rotulo">{bloque.titulo || 'Marca lo que ya sabes sin mirar'}</span>
        <span className="pl-repaso-cuenta" aria-live="polite">{n} de {items.length}{n === items.length && items.length ? ' · completo' : ''}</span>
      </div>
      <ul className="pl-checklist">
        {items.map((it, i) => (
          <li key={i}>
            <label className={sabidos.has(i) ? 'es-sabido' : ''}>
              <input type="checkbox" checked={sabidos.has(i)} onChange={(e) => marcarRepasoRapido(temaId, i, e.target.checked)} />
              <span>{it}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="pl-nota-pie">Lo que dejes sin marcar se queda resaltado para la próxima vez. Se guarda solo en este dispositivo.</p>
    </div>
  )
}

// ---------- Preguntas de repaso oral ----------

// Acepta cadenas (lo que hay hoy en el temario) o { pregunta, respuesta }.
// La respuesta solo se muestra cuando el tema la trae escrita: inventarla
// sería contenido clínico nuevo sin revisión.
const SEGUNDOS = 20

export function ModoOral({ temaId, bloque }) {
  const { estado, calificarOral } = useProgress()
  const preguntas = (bloque.items || []).map((it) => (typeof it === 'string' ? { pregunta: it } : it))
  const previas = estado.oral?.[temaId] || {}
  const [i, setI] = useState(0)
  const [fase, setFase] = useState('pensar') // pensar | calificar | fin
  const [lista, setLista] = useState(false)
  const barra = useRef(null)
  const actual = preguntas[i]

  useEffect(() => {
    const el = barra.current
    if (!el || fase !== 'pensar') return undefined
    el.style.transition = 'none'
    el.style.width = '0%'
    const reducir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducir) return undefined
    const t = setTimeout(() => { el.style.transition = `width ${SEGUNDOS}s linear`; el.style.width = '100%' }, 40)
    return () => clearTimeout(t)
  }, [i, fase])

  if (!preguntas.length) return null
  const calificar = (r) => {
    calificarOral(temaId, i, r)
    if (i + 1 >= preguntas.length) setFase('fin')
    else { setI(i + 1); setFase('pensar') }
  }
  const cuenta = [0, 1, 2].map((r) => preguntas.filter((_, k) => (k in previas ? previas[k] : null) === r).length)

  return (
    <div className="pl-oral">
      <div className="pl-oral-cab">
        <span className="pl-rotulo">Modo oral · {fase === 'fin' ? preguntas.length : i + 1} de {preguntas.length}</span>
        <button type="button" className="btn btn--atajo pl-oral-lista" onClick={() => setLista((v) => !v)} aria-expanded={lista}>
          {lista ? 'Una a la vez' : 'Ver todas'}
        </button>
      </div>
      {lista ? (
        <ol className="pl-oral-todas">{preguntas.map((p, k) => <li key={k}>{p.pregunta}</li>)}</ol>
      ) : fase === 'fin' ? (
        <div className="pl-oral-fin">
          <p className="pl-oral-preg">Terminaste las {preguntas.length}.</p>
          <p className="pl-oral-resumen">
            <span><i style={{ background: 'var(--exito-solido)' }} />{cuenta[2]} completas</span>
            <span><i style={{ background: 'var(--alerta)' }} />{cuenta[1]} a medias</span>
            <span><i style={{ background: 'var(--urgencia)' }} />{cuenta[0]} no salieron</span>
          </p>
          <button type="button" className="btn btn--turno" onClick={() => { setI(0); setFase('pensar') }}>Empezar de nuevo</button>
        </div>
      ) : (
        <>
          <p className="pl-oral-preg" aria-live="polite">{actual.pregunta}</p>
          <div className="pl-oral-tiempo" aria-hidden="true"><i ref={barra} /></div>
          {fase === 'pensar' ? (
            <div className="pl-oral-acciones">
              <button type="button" className="btn btn--turno" onClick={() => setFase('calificar')}>
                {actual.respuesta ? 'Mostrar respuesta' : 'Ya la dije'}
              </button>
              <span className="pl-oral-ayuda">Respóndela en voz alta primero</span>
            </div>
          ) : (
            <>
              {actual.respuesta ? (
                <div className="pl-oral-respuesta"><span className="pl-rotulo">Según la lección</span><p>{actual.respuesta}</p></div>
              ) : (
                <p className="pl-oral-ayuda">Si no te salió con tus palabras, vuelve a la sección que la explica antes de seguir.</p>
              )}
              <div className="pl-oral-calificar" role="group" aria-label="¿Cómo te salió?">
                <button type="button" style={{ '--c': 'var(--urgencia)' }} onClick={() => calificar(0)}>No me salió</button>
                <button type="button" style={{ '--c': 'var(--alerta)' }} onClick={() => calificar(1)}>A medias</button>
                <button type="button" style={{ '--c': 'var(--exito-solido)' }} onClick={() => calificar(2)}>Completa</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
