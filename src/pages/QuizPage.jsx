import { useParams, Link } from 'react-router-dom'
import { getTema } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Quiz from '../components/Quiz.jsx'
import NotFound from './NotFound.jsx'

export default function QuizPage() {
  const { temaId } = useParams()
  const tema = getTema(temaId)
  const { registrarQuiz } = useProgress()

  if (!tema) return <NotFound />

  return (
    <div className="quiz-page" style={{ '--fase-color': tema.faseColor }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span>{' '}
        <Link to={`/fase/${tema.faseId}`}>Fase {tema.faseNumero}</Link> <span>/</span>{' '}
        <Link to={`/tema/${temaId}`}>{tema.numero}</Link> <span>/</span> Quiz
      </nav>

      <header className="quiz-page-header">
        <h1>
          <span className="quiz-page-ico">🧪</span> Quiz · {tema.titulo}
        </h1>
        <p>Pon a prueba lo aprendido. Necesitas 70% para aprobar. Cada respuesta incluye su explicación.</p>
      </header>

      <Quiz
        preguntas={tema.quiz}
        titulo={`Tema ${tema.numero}`}
        onComplete={(aciertos, total) => registrarQuiz(temaId, aciertos, total)}
      />

      <div className="quiz-page-pie">
        <Link to={`/tema/${temaId}`} className="btn btn-secundario">
          ← Volver al tema
        </Link>
      </div>
    </div>
  )
}
