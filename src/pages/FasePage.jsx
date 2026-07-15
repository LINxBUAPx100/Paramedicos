import { useParams, Link } from 'react-router-dom'
import { useContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import NotFound from './NotFound.jsx'
import Icon from '../components/Icon.jsx'

export default function FasePage() {
  const { faseId } = useParams()
  const { contenido, error, reintentar } = useContenido()
  const fase = contenido?.getFase(faseId)
  const { estado } = useProgress()
  const { faseVisible, temaVisible } = useVisibilidad()

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!contenido) return <CargandoContenido />
  if (!fase) return <NotFound />

  // Fase oculta para el grupo del alumno: aún no disponible.
  if (!faseVisible(fase.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Módulo aún no disponible</h1>
        <p>Tu profesor todavía no libera esta fase para tu grupo. Vuelve más adelante.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  const temas = fase.temas.filter((t) => temaVisible(t.id))

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
        {temas.map((tema) => {
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
                  <span><Icon name="reloj" size={14} /> {tema.duracion}</span>
                  <span><Icon name="pregunta" size={14} /> {tema.quiz.length} preguntas</span>
                  <span><Icon name="flashcards" size={14} /> {tema.flashcards.length} flashcards</span>
                </div>
              </div>
              <span className="tema-fila-flecha">→</span>
            </Link>
          )
        })}
      </div>

      <section className="fase-examen-cta">
        <div className="fase-examen-txt">
          <h2><Icon name="examen" size={22} /> Examen de la Fase {fase.numero}</h2>
          <p>Pon a prueba todo lo visto en esta fase. Tu resultado se guarda como intento para seguir tu avance.</p>
        </div>
        <Link to={`/fase/${fase.id}/examen`} className="btn btn-primario btn-grande">
          Presentar examen de fase
        </Link>
      </section>
    </div>
  )
}
