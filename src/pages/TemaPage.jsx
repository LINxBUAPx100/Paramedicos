import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getTema, getTemaVecinos } from '../data/index.js'
import { getRecursos } from '../data/recursosDescarga.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Contenido from '../components/Contenido.jsx'
import NotFound from './NotFound.jsx'

export default function TemaPage() {
  const { temaId } = useParams()
  const navigate = useNavigate()
  const tema = getTema(temaId)
  const { estado, marcarLeido } = useProgress()

  // Sube al inicio al cambiar de tema.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [temaId])

  if (!tema) return <NotFound />

  const vecinos = getTemaVecinos(temaId)
  const leido = estado.leidos[temaId]
  const recursos = getRecursos(temaId)

  return (
    <article className="tema-page" style={{ '--fase-color': tema.faseColor }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span>{' '}
        <Link to={`/fase/${tema.faseId}`}>Fase {tema.faseNumero}</Link> <span>/</span>{' '}
        {tema.numero}
      </nav>

      <header className="tema-header">
        <span className="tema-header-ico">{tema.icono}</span>
        <div className="tema-header-info">
          <span className="tema-header-num">Tema {tema.numero}</span>
          <h1>{tema.titulo}</h1>
          <div className="tema-header-meta">
            <span>⏱️ {tema.duracion}</span>
            <span>❓ {tema.quiz.length} preguntas</span>
            <span>🎴 {tema.flashcards.length} flashcards</span>
          </div>
        </div>
      </header>

      <p className="tema-resumen">{tema.resumen}</p>

      {tema.objetivos && (
        <div className="objetivos">
          <h3>🎯 Al terminar este tema podrás</h3>
          <ul>
            {tema.objetivos.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {recursos.length > 0 && (
        <div className="descargas">
          <h3>📚 Material descargable de este tema</h3>
          <div className="descargas-grid">
            {recursos.map((r, i) => (
              <a
                key={i}
                className="descarga-btn"
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="descarga-ico">📥</span>
                <span className="descarga-txt">Descarga: {r.titulo} {r.emoji}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <Contenido secciones={tema.secciones} />

      {tema.conceptosClave && (
        <section className="conceptos">
          <h2 className="seccion-titulo">🔑 Conceptos clave</h2>
          <div className="conceptos-grid">
            {tema.conceptosClave.map((c, i) => (
              <div className="concepto-card" key={i}>
                <strong>{c.termino}</strong>
                <p>{c.definicion}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="tema-acciones">
        <button
          className={`btn ${leido ? 'btn-ok' : 'btn-secundario'}`}
          onClick={() => marcarLeido(temaId, !leido)}
        >
          {leido ? '✓ Marcado como leído' : 'Marcar como leído'}
        </button>
        <Link to={`/tema/${temaId}/quiz`} className="btn btn-primario">
          🧪 Hacer el quiz de este tema
        </Link>
        <Link to={`/flashcards/${temaId}`} className="btn btn-secundario">
          🎴 Repasar flashcards
        </Link>
      </div>

      <nav className="tema-nav">
        {vecinos.anterior ? (
          <button
            className="tema-nav-btn"
            onClick={() => navigate(`/tema/${vecinos.anterior.id}`)}
          >
            <span>← Anterior</span>
            <strong>{vecinos.anterior.numero} {vecinos.anterior.titulo}</strong>
          </button>
        ) : (
          <span />
        )}
        {vecinos.siguiente ? (
          <button
            className="tema-nav-btn derecha"
            onClick={() => navigate(`/tema/${vecinos.siguiente.id}`)}
          >
            <span>Siguiente →</span>
            <strong>{vecinos.siguiente.numero} {vecinos.siguiente.titulo}</strong>
          </button>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
