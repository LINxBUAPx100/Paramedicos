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
  const { faseVisible, temaVisible } = useVisibilidad()

  const [iniciado, setIniciado] = useState(false)
  const [intentoKey, setIntentoKey] = useState(0)
  const [guardado, setGuardado] = useState(null) // { ok, pct } | { ok: false }
  const [fin, setFin] = useState(null) // { pct } → pantalla de felicitaciones

  // Baraja las preguntas de la fase (excluyendo temas ocultos) una vez por intento.
  const preguntas = useMemo(
    () => mezclar(preguntasDeFase(faseId).filter((q) => temaVisible(q.temaId))),
    [faseId, intentoKey, temaVisible]
  )

  if (!fase) return <NotFound />

  // Fase (módulo) oculta para el grupo del alumno: examen no disponible.
  if (!faseVisible(fase.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Examen no disponible</h1>
        <p>Tu profesor todavía no libera este módulo para tu grupo. Vuelve más adelante.</p>
        <Link to="/examen" className="btn-pildora btn-pildora--solido">Volver a exámenes</Link>
      </div>
    )
  }

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
                ? `Intento guardado (${guardado.pct}%). Tu maestro podrá verlo en tu avance.`
                : 'No se pudo guardar el intento (revisa tu conexión). Tu resultado sigue abajo.'}
            </div>
          )}

          <Quiz
            key={intentoKey}
            preguntas={preguntas}
            titulo={`Fase ${fase.numero}`}
            onComplete={onComplete}
          />

          <div className="quiz-page-pie">
            <button type="button" className="btn btn-secundario" onClick={otroIntento}>
              Otro intento
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

// Mensaje según la CALIFICACIÓN del módulo (60% examen + 40% actividades de los
// temas). Reconocimiento + diagnóstico + siguiente acción: corrige sin humillar
// y motiva sin exagerar (sin emojis ni afirmaciones que la nota no demuestra).
function mensajeDeNota(n, nombre) {
  const nota = Math.max(0, Math.min(100, Number(n) || 0))
  const saludo = nombre ? `${nombre}, ` : ''
  if (nota >= 95) return {
    icono: 'medalla',
    tono: 'sobresaliente',
    titulo: `${saludo}dominas este módulo`,
    texto: 'Tu resultado demuestra un dominio sobresaliente de los contenidos. Revisa tus respuestas para consolidar los últimos detalles y continúa con el siguiente módulo.',
  }
  if (nota >= 90) return {
    icono: 'trofeo',
    tono: 'excelente',
    titulo: `${saludo}lograste un excelente resultado`,
    texto: 'Comprendes los conceptos principales y los aplicaste correctamente. Repasa los pocos puntos pendientes para fortalecer todavía más tu preparación.',
  }
  if (nota >= 80) return {
    icono: 'tendencia',
    tono: 'solido',
    titulo: `${saludo}tienes un desempeño sólido`,
    texto: 'La base del módulo está bien comprendida. Identifica los temas con menor puntuación, refuérzalos y continúa avanzando.',
  }
  if (nota >= 76) return {
    icono: 'verificado',
    tono: 'aprobado',
    titulo: `${saludo}completaste el módulo`,
    texto: 'Alcanzaste los objetivos necesarios para aprobar. Antes de continuar, dedica unos minutos a revisar tus errores y asegurar los conceptos clave.',
  }
  if (nota >= 70) return {
    icono: 'alerta',
    tono: 'aprobado-ajustado',
    titulo: `${saludo}aprobaste, pero aún puedes reforzarlo`,
    texto: 'Cumpliste con la calificación mínima. Conviene repasar los temas con menor resultado antes de avanzar, especialmente aquellos que requieren aplicación práctica.',
  }
  if (nota >= 60) return {
    icono: 'diana',
    tono: 'cerca',
    titulo: `${saludo}estás cerca de aprobar`,
    texto: 'Ya tienes parte importante del módulo comprendida. Revisa los temas con menor porcentaje, completa las actividades pendientes y vuelve a intentarlo.',
  }
  if (nota >= 50) return {
    icono: 'herramientas',
    tono: 'refuerzo',
    titulo: `${saludo}necesitas reforzar algunos fundamentos`,
    texto: 'Has avanzado, pero todavía hay conceptos esenciales que requieren práctica. Trabaja primero en los temas con menor desempeño y después repite la evaluación.',
  }
  return {
    icono: 'libro',
    tono: 'inicio',
    titulo: `${saludo}vamos a fortalecer este módulo`,
    texto: 'Este resultado indica que necesitas revisar los contenidos desde la base. Avanza tema por tema, completa las actividades y utiliza los resultados para orientar tu siguiente intento.',
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

  // Mientras el mensaje está en pantalla, congela el scroll del fondo para que
  // la pantalla quede optimizada y el mensaje siempre centrado hasta cerrarlo.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const [envio, setEnvio] = useState(bloqueada ? 'cargando' : 'puede')
  const [confirmar, setConfirmar] = useState(false) // muestra la advertencia antes de solicitar
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
        <span className={`modulo-fin-icono t-${m.tono}`} aria-hidden="true">
          <Icon name={m.icono} size={26} />
        </span>
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

        <details className="modulo-fin-aprendizajes">
          <summary>
            <Icon name="diana" size={16} /> Aprendizajes de este módulo
            <em>{fase.temas.length} temas</em>
          </summary>
          <ul>
            {porTema.map((t) => (
              <li key={t.id}>
                <span>{t.numero}</span> {t.titulo}
                <em className={`mf-chip ${t.pct === null ? 'sin' : t.pct >= 70 ? 'ok' : 'mal'}`}>
                  {t.pct === null ? '—' : `${t.pct}%`}
                </em>
              </li>
            ))}
          </ul>
        </details>

        <div className="modulo-fin-cta">
          {debeRepasar ? (
            <Link to={`/fase/${fase.id}`} className="btn btn-primario btn-grande" onClick={onCerrar}>
              Repasar los temas de la fase
            </Link>
          ) : !siguiente ? (
            <p className="modulo-fin-final">
              Esta era la última fase del temario: completaste todo el programa.
            </p>
          ) : bloqueada ? (
            <>
              {envio === 'enviada' || envio === 'pendiente' ? (
                <p className="modulo-fin-final" role="status">
                  {envio === 'enviada' ? 'Solicitud enviada.' : 'Ya tienes una solicitud pendiente.'}{' '}
                  Tu profesor la verá en su panel y te habilitará la
                  Fase {siguiente.numero} · {siguiente.titulo}.
                </p>
              ) : confirmar ? (
                <div className="modulo-fin-aviso" role="alert">
                  <p>
                    <b>Vas a solicitar avanzar a la Fase {siguiente.numero}.</b> Solo hazlo si ya
                    dominas este módulo: tu profesor revisará tu desempeño antes de habilitártela y
                    no podrás cancelar la solicitud una vez enviada.
                  </p>
                  <div className="modulo-fin-aviso-btns">
                    <button
                      className="btn btn-primario"
                      onClick={solicitar}
                      disabled={envio === 'enviando'}
                    >
                      {envio === 'enviando' ? 'Enviando…' : 'Sí, solicitar avanzar'}
                    </button>
                    <button
                      className="btn btn-secundario"
                      onClick={() => setConfirmar(false)}
                      disabled={envio === 'enviando'}
                    >
                      Mejor no
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-primario btn-grande modulo-fin-solicitar"
                  onClick={() => setConfirmar(true)}
                  disabled={envio === 'cargando'}
                >
                  Solicitar avanzar al siguiente módulo
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
