import { useParams, Link } from 'react-router-dom'
import { useContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Quiz from '../components/Quiz.jsx'
import NotFound from './NotFound.jsx'
import Icon from '../components/Icon.jsx'

export default function QuizPage() {
  const { temaId } = useParams()
  const { contenido, error, reintentar } = useContenido()
  const tema = contenido?.getTema(temaId)
  const { registrarQuiz } = useProgress()
  const { temaVisible } = useVisibilidad()

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!contenido) return <CargandoContenido />
  if (!tema) return <NotFound />

  // Quiz de un tema oculto para el grupo del alumno: no disponible.
  if (!temaVisible(tema.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Quiz no disponible</h1>
        <p>Tu profesor todavía no libera este tema para tu grupo. Vuelve más adelante.</p>
        <Link to={`/fase/${tema.faseId}`} className="btn-pildora btn-pildora--solido">Volver a la fase</Link>
      </div>
    )
  }

  return (
    <div className="quiz-page" style={{ '--fase-color': tema.faseColor }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span>{' '}
        <Link to={`/fase/${tema.faseId}`}>Fase {tema.faseNumero}</Link> <span>/</span>{' '}
        <Link to={`/tema/${temaId}`}>{tema.numero}</Link> <span>/</span> Quiz
      </nav>

      <header className="quiz-page-header">
        <h1>
          <span className="quiz-page-ico"><Icon name="matraz" size={24} /></span> Quiz · {tema.titulo}
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
