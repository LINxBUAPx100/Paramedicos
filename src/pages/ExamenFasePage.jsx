import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFase, preguntasDeFase } from '../data/index.js'
import { fasesNav } from '../data/navIndice.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'

function mezclar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ExamenFasePage() {
  const { faseId } = useParams()
  const fase = getFase(faseId)
  const { user, perfil, academiaId } = useAuth()

  const [iniciado, setIniciado] = useState(false)
  const [intentoKey, setIntentoKey] = useState(0)
  const [guardado, setGuardado] = useState(null) // { ok, pct } | { ok: false }
  const [fin, setFin] = useState(null) // { pct } → pantalla de felicitaciones

  // Baraja las preguntas de la fase una vez por intento.
  const preguntas = useMemo(
    () => mezclar(preguntasDeFase(faseId)),
    [faseId, intentoKey]
  )

  if (!fase) return <NotFound />

  const onComplete = async (aciertos, total) => {
    const pctLocal = total ? Math.round((aciertos / total) * 100) : 0
    setFin({ pct: pctLocal })
    try {
      const { guardarIntentoFase } = await import('../lib/firebase/intentos.js')
      const pct = await guardarIntentoFase({
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        fase,
        aciertos,
        total,
      })
      setGuardado({ ok: true, pct })
    } catch {
      setGuardado({ ok: false })
    }
  }

  const otroIntento = () => {
    setGuardado(null)
    setFin(null)
    setIntentoKey((k) => k + 1)
  }

  return (
    <div className="examen-page" style={{ '--fase-color': fase.color }}>
      <nav className="migas">
        <Link to={`/fase/${fase.id}`}>Fase {fase.numero}</Link> <span>/</span> Examen de fase
      </nav>

      {!iniciado ? (
        <div className="examen-fase-intro">
          <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
          <h1>Examen de la Fase {fase.numero}</h1>
          <p className="examen-fase-nombre">{fase.titulo}</p>
          <p>
            {preguntas.length} preguntas de los {fase.temas.length} temas de esta fase. Al terminar,
            tu resultado se guarda como intento (fecha, puntaje y % de acierto) para que tú y tu
            maestro puedan seguir tu avance.
          </p>
          <button className="btn btn-primario btn-grande" onClick={() => setIniciado(true)}>
            Comenzar examen ({preguntas.length} preguntas)
          </button>
          <Link to={`/fase/${fase.id}`} className="link-discreto">← Volver a la fase</Link>
        </div>
      ) : (
        <>
          <header className="quiz-page-header">
            <h1>
              <span className="quiz-page-ico"><Icon name="examen" size={24} /></span>
              Examen · Fase {fase.numero}
            </h1>
            <p>{fase.titulo}</p>
          </header>

          {guardado && (
            <div className={`examen-fase-guardado ${guardado.ok ? 'ok' : 'error'}`} role="status">
              {guardado.ok
                ? `✓ Intento guardado (${guardado.pct}%). Tu maestro podrá verlo en tu avance.`
                : '⚠ No se pudo guardar el intento (revisa tu conexión). Tu resultado sigue abajo.'}
            </div>
          )}

          <Quiz
            key={intentoKey}
            preguntas={preguntas}
            titulo={`Fase ${fase.numero}`}
            onComplete={onComplete}
          />

          <div className="quiz-page-pie">
            <button className="btn btn-secundario" onClick={otroIntento}>
              ↻ Otro intento
            </button>
            <Link to={`/fase/${fase.id}`} className="btn btn-secundario">
              ← Volver a la fase
            </Link>
          </div>

          {fin && <ModuloCompletado fase={fase} pct={fin.pct} onCerrar={() => setFin(null)} />}
        </>
      )}
    </div>
  )
}

// Mensaje personalizado según la CALIFICACIÓN del módulo (60% examen +
// 40% actividades de los temas). Cada rango tiene su propia personalidad.
function mensajeDeNota(n, nombre) {
  const N = nombre ? `, ${nombre}` : ''
  if (n >= 100) return {
    emoji: '💯',
    titulo: `¡PERFECTO${N}!`,
    texto: 'Cien de cien: cada tema, cada actividad y cada pregunta del examen. Esto ya es nivel instructor. Que nadie te detenga.',
  }
  if (n === 99) return {
    emoji: '😱',
    titulo: `¿¡99${N}!?`,
    texto: 'TAN cerca de la perfección que hasta duele. Te separó UNA respuesta… y esa ya nunca se te va a olvidar. Resultado de élite.',
  }
  if (n >= 90) return {
    emoji: '🏆',
    titulo: `¡Impresionante${N}!`,
    texto: 'Arriba de 90: este módulo ya es tuyo. Este es el nivel que salva vidas en la calle. Vas más que listo para lo que sigue.',
  }
  if (n >= 80) return {
    emoji: '🎉',
    titulo: `¡Excelente trabajo${N}!`,
    texto: 'Desempeño sólido: los conceptos importantes ya son tuyos. Dale una repasada a lo que fallaste y estás del otro lado.',
  }
  if (n >= 76) return {
    emoji: '👏',
    titulo: `¡Bien hecho${N}!`,
    texto: 'Aprobaste con margen. Hay detalles por pulir, pero la base está firme. El siguiente módulo te espera.',
  }
  if (n >= 70) return {
    emoji: '😅',
    titulo: `Aprobado… por poquito${N}`,
    texto: 'Cruzaste la línea del 70 raspando. Cuenta — ¡pero en la ambulancia no hay opción múltiple! Dale otra vuelta a tus temas flojos antes de avanzar.',
  }
  if (n >= 60) return {
    emoji: '🤏',
    titulo: `Te faltó tantito${N}`,
    texto: 'Te quedaste a unos puntos del 70. El módulo ya lo entiendes; ahora hay que afinarlo. Revisa los temas con menor porcentaje y repite el examen: el siguiente intento es tuyo.',
  }
  if (n >= 50) return {
    emoji: '💪',
    titulo: `Vas a medio camino${N}`,
    texto: 'La mitad ya está. Completa los quizzes de los temas que te faltan, repasa los que salieron bajos y vuelve a presentar el examen.',
  }
  return {
    emoji: '📚',
    titulo: `Aún no${N}…`,
    texto: 'Este módulo todavía no está dominado, y en paramedicina los cimientos lo son todo. Vuelve a los temas, haz sus actividades y quizzes, y repite el examen. El siguiente intento será otra historia.',
  }
}

// ------------------------------------------------------------
//  Pantalla completa al terminar el examen de fase: CALIFICACIÓN del
//  módulo (60% examen + 40% actividades de los temas), felicitación
//  personalizada por rango, resumen de aprendizajes con el desempeño
//  por tema y, si la siguiente fase está bloqueada para el alumno,
//  botón para SOLICITAR el acceso (el staff aprueba desde su panel).
//  Con menos de 50% no se solicita: se invita a repasar.
// ------------------------------------------------------------
function ModuloCompletado({ fase, pct, onCerrar }) {
  const { user, perfil, rol, academiaId, grupoId } = useAuth()
  const { estado } = useProgress()
  const { faseVisible } = useVisibilidad()

  // Desempeño en las ACTIVIDADES de cada tema (mejor quiz guardado del tema;
  // un tema sin quiz hecho cuenta como 0 — el desglose lo deja claro).
  const porTema = fase.temas.map((t) => {
    const q = estado.quizzes[t.id]
    return { id: t.id, numero: t.numero, titulo: t.titulo, pct: q ? Math.round((q.aciertos / q.total) * 100) : null }
  })
  const promTemas = Math.round(porTema.reduce((s, t) => s + (t.pct || 0), 0) / (porTema.length || 1))
  const conQuiz = porTema.filter((t) => t.pct !== null).length
  const calificacion = Math.round(0.6 * pct + 0.4 * promTemas)
  const debeRepasar = calificacion < 50
  const nivelNota = calificacion >= 70 ? 'ok' : calificacion >= 50 ? 'media' : 'mal'
  const m = mensajeDeNota(calificacion, (perfil?.nombre || '').split(' ')[0])

  const idx = fasesNav.findIndex((f) => f.id === fase.id)
  const siguiente = idx >= 0 ? fasesNav[idx + 1] || null : null
  // El alumno solo SOLICITA cuando la siguiente fase está oculta para él;
  // si ya la ve (o es staff), se le invita a continuar directamente.
  const bloqueada = Boolean(siguiente) && rol === 'alumno' && !faseVisible(siguiente.id)

  const [envio, setEnvio] = useState(bloqueada ? 'cargando' : 'puede')
  // ¿Ya tiene una solicitud pendiente de esa fase? (no duplicar)
  useEffect(() => {
    if (!bloqueada) return
    let activo = true
    ;(async () => {
      try {
        const { misSolicitudes } = await import('../lib/firebase/solicitudes.js')
        const lista = await misSolicitudes(user.uid)
        const ya = lista.some(
          (s) => s.tipo === 'modulo' && s.faseId === siguiente.id && s.estado === 'pendiente'
        )
        if (activo) setEnvio(ya ? 'pendiente' : 'puede')
      } catch {
        if (activo) setEnvio('puede')
      }
    })()
    return () => { activo = false }
  }, [bloqueada, siguiente?.id, user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  const solicitar = async () => {
    setEnvio('enviando')
    try {
      const { crearSolicitud } = await import('../lib/firebase/solicitudes.js')
      await crearSolicitud({
        tipo: 'modulo',
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        grupoId,
        faseId: siguiente.id,
        faseNumero: siguiente.numero,
        faseTitulo: siguiente.titulo,
      })
      setEnvio('enviada')
    } catch {
      setEnvio('error')
    }
  }

  return (
    <div className="modulo-fin" role="dialog" aria-modal="true" aria-label="Módulo completado">
      <div className="modulo-fin-card" style={{ '--fase-color': fase.color }}>
        <small className="modulo-fin-fase">Fase {fase.numero} · {fase.titulo}</small>
        <span className="modulo-fin-emoji" aria-hidden="true">{m.emoji}</span>
        <h2>{m.titulo}</h2>

        <div className={`modulo-fin-nota ${nivelNota}`}>
          <b>{calificacion}%</b>
          <small>Calificación del módulo</small>
          <span>
            Examen {pct}% · Actividades de los temas {promTemas}%
            {conQuiz < porTema.length && ` (${conQuiz}/${porTema.length} temas con quiz hecho)`}
          </span>
        </div>

        <p className="modulo-fin-sub">{m.texto}</p>

        <div className="modulo-fin-aprendizajes">
          <h3><Icon name="diana" size={18} /> Aprendizajes de este módulo</h3>
          <ul>
            {porTema.map((t) => (
              <li key={t.id}>
                <span>{t.numero}</span> {t.titulo}
                <em className={`mf-chip ${t.pct === null ? 'sin' : t.pct >= 70 ? 'ok' : 'mal'}`}>
                  {t.pct === null ? 'sin quiz' : `${t.pct}%`}
                </em>
              </li>
            ))}
          </ul>
        </div>

        <div className="modulo-fin-cta">
          {debeRepasar ? (
            <Link to={`/fase/${fase.id}`} className="btn btn-primario btn-grande" onClick={onCerrar}>
              📚 Repasar los temas de la fase
            </Link>
          ) : !siguiente ? (
            <p className="modulo-fin-final">
              🏆 Esta era la última fase del temario. ¡Completaste todo el programa!
            </p>
          ) : bloqueada ? (
            <>
              {envio === 'enviada' || envio === 'pendiente' ? (
                <p className="modulo-fin-final" role="status">
                  ✓ {envio === 'enviada' ? 'Solicitud enviada.' : 'Ya tienes una solicitud pendiente.'}{' '}
                  Tu profesor la verá en su panel y te habilitará la
                  Fase {siguiente.numero} · {siguiente.titulo}.
                </p>
              ) : (
                <button
                  className="btn btn-primario btn-grande"
                  onClick={solicitar}
                  disabled={envio === 'enviando' || envio === 'cargando'}
                >
                  {envio === 'enviando' ? 'Enviando…' : 'Solicitar acceso al siguiente módulo'}
                </button>
              )}
              {envio === 'error' && (
                <p className="cuenta-error" role="alert">
                  No se pudo enviar la solicitud (revisa tu conexión e inténtalo de nuevo).
                </p>
              )}
            </>
          ) : (
            <Link to={`/fase/${siguiente.id}`} className="btn btn-primario btn-grande">
              Continuar con la Fase {siguiente.numero} →
            </Link>
          )}
        </div>

        <button className="modulo-fin-cerrar" onClick={onCerrar}>
          Seguir repasando esta fase
        </button>
      </div>
    </div>
  )
}
