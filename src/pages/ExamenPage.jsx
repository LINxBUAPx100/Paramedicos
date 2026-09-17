import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useApiContenido, useTodasLasPreguntas, CargandoContenido, ErrorContenido,
} from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'
import { nuevaSemilla } from '../lib/azar.js'
import { seleccionarPreguntas } from '../lib/examenModelo.js'

export default function ExamenPage() {
  const { registrarExamen } = useProgress()
  const { user } = useAuth()
  const { api } = useApiContenido()
  const { preguntas: bancoCompleto, cargando, error, reintentar } = useTodasLasPreguntas()
  const { moduloVisible, temaVisible } = useVisibilidad()
  const [config, setConfig] = useState(null) // { preguntas }
  const [cantidad, setCantidad] = useState(10)
  const [intentos, setIntentos] = useState(null) // null = cargando; [] = sin intentos / no disponible
  const [errorIntentos, setErrorIntentos] = useState(false)
  const [recargaIntentos, setRecargaIntentos] = useState(0)

  // Examen general: solo preguntas de temas visibles para el grupo del alumno.
  const preguntasDisponibles = useMemo(
    () => bancoCompleto.filter((q) => temaVisible(q.temaId)),
    [bancoCompleto, temaVisible]
  )
  // Módulos visibles para la lista de "examen por módulo".
  const modulosDisponibles = useMemo(
    () => (api?.modulos || []).filter((f) => moduloVisible(f.id)),
    [api, moduloVisible]
  )

  // Intentos del alumno (para mostrar su mejor puntuación por módulo).
  useEffect(() => {
    if (!user) { setIntentos([]); return }
    let activo = true
    setIntentos(null)
    setErrorIntentos(false)
    ;(async () => {
      try {
        const { intentosDeAlumno } = await import('../lib/firebase/intentos.js')
        const lista = await intentosDeAlumno(user.uid)
        if (activo) setIntentos(lista)
      } catch {
        if (activo) { setIntentos([]); setErrorIntentos(true) }
      }
    })()
    return () => { activo = false }
  }, [user, recargaIntentos])

  // Mejor puntuación e intentos por módulo.
  const porModulo = useMemo(() => {
    const map = {}
    for (const it of intentos || []) {
      const c = (map[it.moduloId] = map[it.moduloId] || { mejor: 0, n: 0, ultima: 0 })
      c.n += 1
      if (it.porcentaje >= c.mejor) c.mejor = it.porcentaje
      const seg = it.fecha?.seconds || 0
      if (seg > c.ultima) c.ultima = seg
    }
    return map
  }, [intentos])

  // El general SÍ deja elegir el tamaño (es práctica libre: quien quiere 5
  // preguntas está repasando, no examinándose). El reparto por tema hace que
  // esas 10 no caigan todas del mismo sitio; "Todas" pide el banco entero, y
  // ahí `tamano: null` desactiva la política de tamaño.
  function iniciar(n) {
    const semilla = nuevaSemilla('gen')
    const tamano = n >= preguntasDisponibles.length ? null : n
    setConfig({
      preguntas: seleccionarPreguntas(preguntasDisponibles, { semilla, tamano }),
      semilla,
    })
  }

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (cargando) return <CargandoContenido />

  if (config) {
    return (
      <div className="examen-page">
        <header className="quiz-page-header">
          <h1>
            <span className="quiz-page-ico"><Icon name="examen" size={24} /></span> Examen general
          </h1>
          <p>{config.preguntas.length} preguntas aleatorias de todo el temario.</p>
        </header>
        <Quiz
          key={config.semilla}
          preguntas={config.preguntas}
          titulo="Examen general"
          semilla={config.semilla}
          onComplete={(aciertos, total) => registrarExamen(aciertos, total)}
          onReintentar={() => iniciar(cantidad)}
        />
        <div className="quiz-page-pie">
          <button className="btn btn--suave" onClick={() => setConfig(null)}>
            <Icon name="chevronIzq" size={15} /> Configurar otro examen
          </button>
        </div>
      </div>
    )
  }

  const fecha = (seg) => (seg ? new Date(seg * 1000).toLocaleDateString('es-MX') : '')

  return (
    <div className="examen-page">
      <header className="examen-hero">
        <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
        <h1>Ponte a prueba</h1>
        <p>
          Practica con preguntas del temario disponible o de un módulo concreto. Consulta tu mejor resultado
          por módulo para decidir qué repasar.
        </p>
        {/* Honestidad sobre lo que esto ES: las respuestas correctas viajan en la
            app, así que cualquiera puede consultarlas. Presentarlo como examen
            acreditativo sería mentir; como autoevaluación es exactamente útil. */}
        <p className="examen-nota-autoeval">
          Son ejercicios de <strong>autoevaluación</strong>, no un examen oficial: sirven para
          detectar qué repasar, no para acreditar.
        </p>
      </header>

      <div className="examen-config">
        <h3>Examen general — ¿cuántas preguntas?</h3>
        <div className="examen-opciones">
          {[5, 10, 15, 20].filter((n) => n < preguntasDisponibles.length).map((n) => (
            <button
              key={n}
              className={`examen-cantidad ${cantidad === n ? 'activa' : ''}`}
              aria-pressed={cantidad === n}
              onClick={() => setCantidad(n)}
            >
              {n}
            </button>
          ))}
          <button
            className={`examen-cantidad ${cantidad >= preguntasDisponibles.length ? 'activa' : ''}`}
            aria-pressed={cantidad >= preguntasDisponibles.length}
            disabled={!preguntasDisponibles.length}
            onClick={() => setCantidad(preguntasDisponibles.length)}
          >
            Todas ({preguntasDisponibles.length})
          </button>
        </div>
        {preguntasDisponibles.length === 0 && <p className="ui-estado" role="status">Todavía no hay preguntas avaladas disponibles. Puedes seguir estudiando los temas.</p>}
        <button className="btn btn--primario btn--lg" disabled={!preguntasDisponibles.length} onClick={() => iniciar(cantidad)}>
          Comenzar examen de {Math.min(cantidad, preguntasDisponibles.length)} preguntas
        </button>
      </div>

      <section className="examen-modulos">
        <h2><span className="examen-modulos-ico"><Icon name="temario" size={22} /></span> Examen por módulo</h2>
        <p className="examen-modulos-sub">
          Abre un módulo para consultar su evaluación. Aquí se muestra tu mejor puntuación registrada.
        </p>
        {errorIntentos && <div className="ui-estado" role="alert"><p>No se pudo cargar tu historial. Puedes practicar; tus resultados anteriores no están disponibles en este momento.</p><button className="btn btn--suave" onClick={() => setRecargaIntentos((valor) => valor + 1)}>Reintentar historial</button></div>}
        <div className="examen-modulos-lista">
          {modulosDisponibles.map((f) => {
            const m = porModulo[f.id]
            return (
              <Link
                to={`/modulo/${f.id}/examen`}
                key={f.id}
                className="examen-modulo-item"
                style={{ '--modulo-color': f.color }}
              >
                <span className="ef-num">{String(f.numero).padStart(2, '0')}</span>
                <div className="ef-info">
                  <strong>{f.titulo}</strong>
                  <span className="ef-meta">
                    {errorIntentos ? 'Historial no disponible' : intentos === null
                      ? 'Cargando…'
                      : m
                        ? `${m.n} intento${m.n > 1 ? 's' : ''} · último ${fecha(m.ultima)}`
                        : 'Aún no lo presentas'}
                  </span>
                </div>
                {m ? (
                  <span className={`ef-mejor ${m.mejor >= 70 ? 'ok' : 'mal'}`}>
                    <b>{m.mejor}%</b>
                    <small>mejor</small>
                  </span>
                ) : (
                  <span className="ef-mejor ef-mejor--vacio">—</span>
                )}
                <Icon name="chevronDer" size={20} />
              </Link>
            )
          })}
        </div>
      </section>

      <Link to="/" className="link-discreto"><Icon name="chevronIzq" size={15} /> Volver al inicio</Link>
    </div>
  )
}
