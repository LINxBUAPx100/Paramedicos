import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { nuevaSemilla } from '../lib/azar.js'
import { seleccionarPreguntas } from '../lib/examenModelo.js'
import Quiz from '../components/Quiz.jsx'
import NotFound from './NotFound.jsx'
import Icon from '../components/Icon.jsx'

export default function QuizPage() {
  const { temaId } = useParams()
  const { contenido, error, reintentar } = useContenido()
  const tema = contenido?.getTema(temaId)
  const { registrarQuiz } = useProgress()
  const { temaVisible } = useVisibilidad()
  const [semilla, setSemilla] = useState(() => nuevaSemilla(temaId))

  // El quiz de tema entraba SIEMPRE en el orden del temario: solo se barajaban
  // las opciones. Con 7 preguntas fijas y en el mismo orden, a la tercera vuelta
  // ya te sabes cuál toca antes de leerla, que es memorizar la posición y no el
  // contenido. Aquí sí van todas —es práctica, no examen: quitar preguntas de
  // un quiz de 7 solo dejaría al alumno sin repasar parte del tema—, pero cada
  // vez en otro orden.
  const preguntas = useMemo(
    () => seleccionarPreguntas(tema?.quiz || [], { semilla, tamano: null }),
    [tema, semilla]
  )

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
        <Link to={`/modulo/${tema.moduloId}`} className="btn btn--pildora btn--carbon">Volver al módulo</Link>
      </div>
    )
  }

  return (
    <div className="quiz-page" style={{ '--modulo-color': tema.moduloColor }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span>{' '}
        <Link to={`/modulo/${tema.moduloId}`}>Modulo {tema.moduloNumero}</Link> <span>/</span>{' '}
        <Link to={`/tema/${temaId}`}>{tema.numero}</Link> <span>/</span> Quiz
      </nav>

      <header className="quiz-page-header">
        <h1>
          <span className="quiz-page-ico"><Icon name="matraz" size={24} /></span> Quiz · {tema.titulo}
        </h1>
        <p>Pon a prueba lo aprendido. Necesitas 70% para aprobar. Cada respuesta incluye su explicación.</p>
      </header>

      <Quiz
        key={semilla}
        preguntas={preguntas}
        titulo={`Tema ${tema.numero}`}
        semilla={semilla}
        onComplete={(aciertos, total) => registrarQuiz(temaId, aciertos, total)}
        onReintentar={() => setSemilla(nuevaSemilla(temaId))}
      />

      <div className="quiz-page-pie">
        <Link to={`/tema/${temaId}`} className="btn btn--suave">
          ← Volver al tema
        </Link>
      </div>
    </div>
  )
}
