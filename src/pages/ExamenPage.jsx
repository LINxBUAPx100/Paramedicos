import { useState } from 'react'
import { Link } from 'react-router-dom'
import { todasLasPreguntas } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
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
  const [config, setConfig] = useState(null) // { preguntas }
  const [cantidad, setCantidad] = useState(10)

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

  return (
    <div className="examen-page">
      <header className="examen-hero">
        <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
        <h1>Examen general</h1>
        <p>
          Preguntas aleatorias de todas las fases, con explicación de cada respuesta.
          Mide tu dominio integral antes del examen real.
        </p>
      </header>

      <div className="examen-config">
        <h3>¿Cuántas preguntas?</h3>
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
        <Link to="/" className="link-discreto">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
