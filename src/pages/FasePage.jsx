import { useParams, Link } from 'react-router-dom'
import { getFase } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
import NotFound from './NotFound.jsx'

export default function FasePage() {
  const { faseId } = useParams()
  const fase = getFase(faseId)
  const { estado } = useProgress()

  if (!fase) return <NotFound />

  return (
    <div className="fase-page" style={{ '--fase-color': fase.color }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span> Fase {fase.numero}
      </nav>

      <header className="fase-header">
        <span className="fase-header-ico">{fase.icono}</span>
        <div>
          <span className="fase-header-num">Fase {fase.numero}</span>
          <h1>{fase.titulo}</h1>
          <p className="fase-header-sub">{fase.subtitulo}</p>
        </div>
      </header>

      <p className="fase-desc">{fase.descripcion}</p>

      <div className="temas-lista">
        {fase.temas.map((tema) => {
          const leido = estado.leidos[tema.id]
          const quiz = estado.quizzes[tema.id]
          return (
            <Link to={`/tema/${tema.id}`} key={tema.id} className="tema-fila">
              <span className="tema-fila-ico">{tema.icono}</span>
              <div className="tema-fila-info">
                <div className="tema-fila-titulo">
                  <span className="tema-fila-num">{tema.numero}</span>
                  {tema.titulo}
                  {leido && <span className="chip chip-ok">✓ Leído</span>}
                  {quiz && (
                    <span className="chip chip-quiz">
                      Quiz: {Math.round((quiz.aciertos / quiz.total) * 100)}%
                    </span>
                  )}
                </div>
                <p className="tema-fila-resumen">{tema.resumen}</p>
                <div className="tema-fila-meta">
                  <span>⏱️ {tema.duracion}</span>
                  <span>❓ {tema.quiz.length} preguntas</span>
                  <span>🎴 {tema.flashcards.length} flashcards</span>
                </div>
              </div>
              <span className="tema-fila-flecha">→</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
