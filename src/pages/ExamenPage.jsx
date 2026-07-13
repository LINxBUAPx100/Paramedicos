import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { todasLasPreguntas } from '../data/index.js'
import { fasesNav } from '../data/navIndice.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'

function mezclar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ExamenPage() {
  const { registrarExamen } = useProgress()
  const { user } = useAuth()
  const [config, setConfig] = useState(null) // { preguntas }
  const [cantidad, setCantidad] = useState(10)
  const [intentos, setIntentos] = useState(null) // null = cargando; [] = sin intentos / no disponible

  // Intentos del alumno (para mostrar su mejor puntuación por fase).
  useEffect(() => {
    if (!user) { setIntentos([]); return }
    let activo = true
    ;(async () => {
      try {
        const { intentosDeAlumno } = await import('../lib/firebase/intentos.js')
        const lista = await intentosDeAlumno(user.uid)
        if (activo) setIntentos(lista)
      } catch {
        if (activo) setIntentos([]) // sin permisos/conexión: se muestra "sin intentos"
      }
    })()
    return () => { activo = false }
  }, [user])

  // Mejor puntuación e intentos por fase.
  const porFase = useMemo(() => {
    const map = {}
    for (const it of intentos || []) {
      const c = (map[it.faseId] = map[it.faseId] || { mejor: 0, n: 0, ultima: 0 })
      c.n += 1
      if (it.porcentaje >= c.mejor) c.mejor = it.porcentaje
      const seg = it.fecha?.seconds || 0
      if (seg > c.ultima) c.ultima = seg
    }
    return map
  }, [intentos])

  function iniciar(n) {
    const seleccion = mezclar(todasLasPreguntas).slice(0, n)
    setConfig({ preguntas: seleccion, key: Date.now() })
  }

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
          key={config.key}
          preguntas={config.preguntas}
          titulo="Examen general"
          onComplete={(aciertos, total) => registrarExamen(aciertos, total)}
        />
        <div className="quiz-page-pie">
          <button className="btn btn-secundario" onClick={() => setConfig(null)}>
            ← Configurar otro examen
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
        <h1>Exámenes</h1>
        <p>
          Practica con el examen general de todo el temario o presenta el examen de una fase
          específica. Tu mejor puntuación por fase queda registrada para tu maestro.
        </p>
      </header>

      <div className="examen-config">
        <h3>Examen general — ¿cuántas preguntas?</h3>
        <div className="examen-opciones">
          {[5, 10, 15, 20].map((n) => (
            <button
              key={n}
              className={`examen-cantidad ${cantidad === n ? 'activa' : ''}`}
              onClick={() => setCantidad(n)}
            >
              {n}
            </button>
          ))}
          <button
            className={`examen-cantidad ${cantidad === todasLasPreguntas.length ? 'activa' : ''}`}
            onClick={() => setCantidad(todasLasPreguntas.length)}
          >
            Todas ({todasLasPreguntas.length})
          </button>
        </div>
        <button className="btn btn-primario btn-grande" onClick={() => iniciar(cantidad)}>
          Comenzar examen de {cantidad} preguntas
        </button>
      </div>

      <section className="examen-fases">
        <h2><span className="examen-fases-ico"><Icon name="temario" size={22} /></span> Examen por fase</h2>
        <p className="examen-fases-sub">
          Cada examen reúne todas las preguntas de su fase. Se muestra tu mejor puntuación.
        </p>
        <div className="examen-fases-lista">
          {fasesNav.map((f) => {
            const m = porFase[f.id]
            return (
              <Link
                to={`/fase/${f.id}/examen`}
                key={f.id}
                className="examen-fase-item"
                style={{ '--fase-color': f.color }}
              >
                <span className="ef-num">{String(f.numero).padStart(2, '0')}</span>
                <div className="ef-info">
                  <strong>{f.titulo}</strong>
                  <span className="ef-meta">
                    {intentos === null
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

      <Link to="/" className="link-discreto">← Volver al inicio</Link>
    </div>
  )
}
