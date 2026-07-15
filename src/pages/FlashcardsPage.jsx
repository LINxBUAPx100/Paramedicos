import { useParams, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Icon from '../components/Icon.jsx'

function mezclar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Puerta de carga: el estado inicial del mazo (orden barajable) se calcula al
// montar, así que el componente interno solo se monta con el contenido listo.
export default function FlashcardsPage() {
  const { contenido, error, reintentar } = useContenido()
  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!contenido) return <CargandoContenido />
  return <Flashcards contenido={contenido} />
}

function Flashcards({ contenido }) {
  const { temaId } = useParams()
  const tema = temaId ? contenido.getTema(temaId) : null
  const { temaVisible } = useVisibilidad()

  // Flashcards de un tema oculto para el grupo del alumno: no disponibles.
  const bloqueado = tema && !temaVisible(tema.id)

  const baseCartas = useMemo(() => {
    if (tema) {
      return tema.flashcards.map((f, i) => ({ ...f, id: `${tema.id}-${i}` }))
    }
    // Repaso global: excluye las flashcards de temas ocultos.
    return contenido.todasLasFlashcards.filter((f) => temaVisible(f.temaId))
  }, [tema, temaVisible, contenido])

  const [orden, setOrden] = useState(() => baseCartas.map((_, i) => i))
  const [indice, setIndice] = useState(0)
  const [volteada, setVolteada] = useState(false)

  const cartas = orden.map((i) => baseCartas[i])
  const carta = cartas[indice]

  function avanzar(dir) {
    setVolteada(false)
    setIndice((i) => {
      const next = i + dir
      if (next < 0) return cartas.length - 1
      if (next >= cartas.length) return 0
      return next
    })
  }

  function barajar() {
    setOrden(mezclar(baseCartas.map((_, i) => i)))
    setIndice(0)
    setVolteada(false)
  }

  if (bloqueado) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Flashcards no disponibles</h1>
        <p>Tu profesor todavía no libera este tema para tu grupo. Vuelve más adelante.</p>
        <Link to={`/tema/${tema.id}`} className="btn-pildora btn-pildora--solido">Volver al tema</Link>
      </div>
    )
  }

  if (!baseCartas.length) {
    return (
      <div className="flashcards-page">
        <p>No hay flashcards disponibles.</p>
      </div>
    )
  }

  return (
    <div className="flashcards-page">
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span> Flashcards
        {tema && (
          <>
            {' '}
            <span>/</span> {tema.titulo}
          </>
        )}
      </nav>

      <header className="flashcards-header">
        <h1>Flashcards</h1>
        <p>
          {tema
            ? `Repaso del tema ${tema.numero}: ${tema.titulo}`
            : 'Repaso global de todos los conceptos de alto rendimiento'}
        </p>
      </header>

      <div className="flashcards-barra">
        <span className="flashcards-contador">
          {indice + 1} / {cartas.length}
        </span>
        <button className="btn btn-secundario btn-mini" onClick={barajar}>
          Barajar
        </button>
      </div>

      <div
        className={`flashcard ${volteada ? 'volteada' : ''}`}
        onClick={() => setVolteada((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setVolteada((v) => !v)
        }}
      >
        <div className="flashcard-inner">
          <div className="flashcard-cara flashcard-frente">
            <span className="flashcard-etiqueta">Pregunta</span>
            <p>{carta.frente}</p>
            <span className="flashcard-pista">Toca para ver la respuesta</span>
            {!tema && carta.temaTitulo && (
              <span className="flashcard-tema">{carta.temaTitulo}</span>
            )}
          </div>
          <div className="flashcard-cara flashcard-reverso">
            <span className="flashcard-etiqueta">Respuesta</span>
            <p>{carta.reverso}</p>
          </div>
        </div>
      </div>

      <div className="flashcards-nav">
        <button className="btn btn-secundario" onClick={() => avanzar(-1)}>
          ← Anterior
        </button>
        <button className="btn btn-primario" onClick={() => setVolteada((v) => !v)}>
          {volteada ? 'Ocultar' : 'Voltear'}
        </button>
        <button className="btn btn-secundario" onClick={() => avanzar(1)}>
          Siguiente →
        </button>
      </div>

      {tema && (
        <div className="quiz-page-pie">
          <Link to={`/tema/${tema.id}`} className="link-discreto">
            ← Volver al tema
          </Link>
        </div>
      )}
    </div>
  )
}
