import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useTema, useTodasLasFlashcards, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'

export default function FlashcardsPage() {
  const { temaId } = useParams()
  const { tema, cargando: cargandoTema, error: errorTema, reintentar: reintentarTema } = useTema(temaId)
  const { flashcards, cargando: cargandoMazo, error: errorMazo, reintentar: reintentarMazo } = useTodasLasFlashcards(!temaId)
  if (temaId ? errorTema : errorMazo) return <ErrorContenido onReintentar={temaId ? reintentarTema : reintentarMazo} />
  const cargando = temaId ? cargandoTema : cargandoMazo
  if (cargando) return <CargandoContenido />
  if (temaId && !tema) return <NotFound />
  return <Flashcards tema={tema} flashcards={flashcards} />
}

function Flashcards({ tema, flashcards }) {
  const { temaVisible } = useVisibilidad()
  const [params, setParams] = useSearchParams()
  const temaFiltro = params.get('tema') || ''
  const base = tema
    ? tema.flashcards.map((carta, i) => ({ ...carta, id: `${tema.id}-${i}`, temaId: tema.id, temaTitulo: tema.titulo }))
    : flashcards.filter((carta) => temaVisible(carta.temaId))
  const temas = [...new Map(base.map((carta) => [carta.temaId, carta.temaTitulo])).entries()]
  const cartas = tema || !temaFiltro ? base : base.filter((carta) => carta.temaId === temaFiltro)
  if (tema && !temaVisible(tema.id)) return (
    <div className="acceso-restringido" role="alert">
      <h1>Flashcards no disponibles</h1>
      <p>Tu profesor todavía no libera este tema para tu grupo.</p>
      <Link to="/" className="btn btn--suave">Volver al inicio</Link>
    </div>
  )
  return (
    <div className="flashcards-page ui-repaso">
      <nav className="migas" aria-label="Ubicación"><Link to="/">Inicio</Link><span>/</span>Flashcards</nav>
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Repaso activo</span>
        <h1>Flashcards</h1>
        <p>{tema ? `Repaso de ${tema.titulo}` : 'Elige un tema o recorre las tarjetas disponibles para tu grupo.'}</p>
      </header>
      {!tema && <label className="ui-campo">Tema para repasar
        <select value={temaFiltro} onChange={(e) => {
          const siguiente = new URLSearchParams(params)
          if (e.target.value) siguiente.set('tema', e.target.value)
          else siguiente.delete('tema')
          setParams(siguiente, { replace: true })
        }}>
          <option value="">Todos los temas disponibles</option>
          {temas.map(([id, titulo]) => <option key={id} value={id}>{titulo}</option>)}
        </select>
      </label>}
      {cartas.length
        ? <SesionFlashcards key={cartas.map((c) => c.id).join('|')} cartas={cartas} />
        : <div className="ui-estado"><h2>No hay tarjetas para este repaso</h2><p>{base.length ? 'Elige otro tema o vuelve a todos los temas disponibles.' : 'Puedes continuar estudiando el temario mientras se preparan las tarjetas.'}</p><Link to={tema ? `/tema/${tema.id}` : '/'} className="btn btn--suave">Volver al estudio</Link></div>}
    </div>
  )
}

function SesionFlashcards({ cartas }) {
  const [orden, setOrden] = useState(() => cartas.map((_, i) => i))
  const [indice, setIndice] = useState(0)
  const [volteada, setVolteada] = useState(false)
  const carta = cartas[orden[indice]]
  const avanzar = (paso) => {
    setIndice((actual) => Math.max(0, Math.min(cartas.length - 1, actual + paso)))
    setVolteada(false)
  }
  const barajar = () => {
    const nuevo = cartas.map((_, i) => i)
    for (let i = nuevo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
    }
    setOrden(nuevo); setIndice(0); setVolteada(false)
  }
  return (
    <section aria-label="Tarjetas de repaso">
      <div className="ui-repaso-barra">
        <span role="status">Tarjeta {indice + 1} de {cartas.length}</span>
        <button className="btn btn--suave" onClick={barajar}>Barajar</button>
      </div>
      <button type="button" className={`ui-tarjeta-repaso ${volteada ? 'ui-tarjeta-repaso--respuesta' : ''}`} aria-pressed={volteada} onClick={() => setVolteada((valor) => !valor)}>
        <span className="ui-antetitulo">{volteada ? 'Respuesta' : 'Pregunta'}</span>
        <span className="ui-tarjeta-texto">{volteada ? carta.reverso : carta.frente}</span>
        <span className="ui-tarjeta-pista">{volteada ? 'Volver a la pregunta' : 'Mostrar respuesta'} · Enter, espacio o clic</span>
      </button>
      <div className="ui-repaso-barra">
        <button className="btn btn--suave" disabled={indice === 0} onClick={() => avanzar(-1)}><Icon name="chevronIzq" size={15} /> Anterior</button>
        <button className="btn btn--primario" disabled={indice === cartas.length - 1} onClick={() => avanzar(1)}>Siguiente <Icon name="chevronDer" size={15} /></button>
      </div>
      {indice === cartas.length - 1 && <p className="ui-estado" role="status">Esta es la última tarjeta. Puedes volver a la primera o barajar para repasar de nuevo.<button className="btn btn--suave" onClick={() => { setIndice(0); setVolteada(false) }}>Volver a la primera</button></p>}
      <p className="ui-repaso-origen"><Link to={`/tema/${carta.temaId}`}>Volver a la lección: {carta.temaTitulo || 'abrir tema'}</Link></p>
    </section>
  )
}
