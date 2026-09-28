import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import SesionEspaciada from '../components/pulso/SesionEspaciada.jsx'
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
  // PTEM Pulso: «hoy» es el repaso espaciado (vencidas + algunas nuevas);
  // «libre» es el recorrido de siempre, en orden o barajado.
  const modo = params.get('modo') === 'libre' ? 'libre' : 'hoy'
  const cambiar = (clave, valor) => {
    const siguiente = new URLSearchParams(params)
    if (valor) siguiente.set(clave, valor)
    else siguiente.delete(clave)
    setParams(siguiente, { replace: true })
  }
  const base = tema
    ? tema.flashcards.map((carta, i) => ({ ...carta, id: `${tema.id}-${i}`, temaId: tema.id, temaTitulo: tema.titulo }))
    : flashcards.filter((carta) => temaVisible(carta.temaId))
  // PTEM Pulso: con el entrenador de farmacología en el plan, sus tarjetas
  // entran al repaso global (una opción más del selector y parte de «todos»).
  const farmacos = useTarjetasDeFarmacos(!tema)
  const temas = [...new Map(base.map((carta) => [carta.temaId, carta.temaTitulo])).entries()]
  const cartas = tema
    ? base
    : temaFiltro === 'farmacos' ? farmacos
      : temaFiltro ? base.filter((carta) => carta.temaId === temaFiltro)
        : [...base, ...farmacos]
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
      <div className="pl-modo" role="tablist" aria-label="Tipo de repaso">
        <button type="button" role="tab" aria-selected={modo === 'hoy'} className={modo === 'hoy' ? 'es-activo' : ''} onClick={() => cambiar('modo', '')}>
          Repaso de hoy
        </button>
        <button type="button" role="tab" aria-selected={modo === 'libre'} className={modo === 'libre' ? 'es-activo' : ''} onClick={() => cambiar('modo', 'libre')}>
          Repaso libre
        </button>
      </div>
      {!tema && <label className="ui-campo">Tema para repasar
        <select value={temaFiltro} onChange={(e) => cambiar('tema', e.target.value)}>
          <option value="">Todos los temas disponibles</option>
          {farmacos.length > 0 && <option value="farmacos">Fármacos del entrenador</option>}
          {temas.map(([id, titulo]) => <option key={id} value={id}>{titulo}</option>)}
        </select>
      </label>}
      {cartas.length && modo === 'hoy'
        ? <SesionEspaciada key={`hoy-${temaFiltro}-${tema?.id || ''}-${farmacos.length}`} cartas={cartas} />
        : cartas.length
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

// Tarjetas del entrenador de farmacología, solo si el plan lo incluye. El
// catálogo viaja aparte: se pide al entrar, no con la página.
function useTarjetasDeFarmacos(activo) {
  const { capacidades, esSuperadmin } = useAuth()
  const puede = activo && (esSuperadmin || Boolean(capacidades?.entrenadorFarmacologia))
  const [lista, setLista] = useState([])
  useEffect(() => {
    if (!puede) { setLista([]); return undefined }
    let vivo = true
    Promise.all([
      import('../data/farmacos/catalogo.js'),
      import('../lib/farmacosModelo.js'),
      import('../lib/rutaFarmacos.js'),
    ]).then(([cat, mod, ruta]) => {
      if (vivo) setLista(ruta.tarjetasParaRepaso(mod.tarjetasDe(cat.FARMACOS), cat.FARMACOS))
    }).catch(() => { if (vivo) setLista([]) })
    return () => { vivo = false }
  }, [puede])
  return lista
}
