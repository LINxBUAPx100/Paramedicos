import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTodasLasFichas, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { buscarEnFilas } from '../lib/agregadosModelo.js'
import Icon from '../components/Icon.jsx'
import MedicalIcon from '../components/MedicalIcon.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { filtrarTemasEstudio, paginarLista } from '../lib/listasEstudio.js'
import Paginacion from '../components/ui/Paginacion.jsx'
import { estadoEditorialDeFicha, ETIQUETA_ESTADO } from '../lib/estadoEditorial.js'

export default function BuscarPage() {
  const { fichas, cargando, error, reintentar } = useTodasLasFichas()
  const [params, setParams] = useSearchParams()
  const { temaVisible } = useVisibilidad()
  const conteo = useRef(null)
  const query = params.get('q') || ''
  const moduloId = params.get('modulo') || ''
  // PTEM Pulso: departamentos, como una tienda bien ordenada.
  const dep = ['temas', 'conceptos', 'farmacos'].includes(params.get('dep')) ? params.get('dep') : 'todo'
  const farmacos = useCatalogoFarmacos(Boolean(query.trim()) && (dep === 'todo' || dep === 'farmacos'))
  const [recientes, guardarReciente] = useBusquedasRecientes()
  const visibles = filtrarTemasEstudio(fichas, { temaVisible })
  const modulos = [...new Map(visibles.map((t) => [t.moduloId, t.moduloTitulo])).entries()]
  const resultados = buscarEnFilas(filtrarTemasEstudio(visibles, { moduloId }), query)
  const pagina = paginarLista(resultados, params.get('pagina') || 1)
  const cambiar = (clave, valor) => {
    const siguiente = new URLSearchParams(params)
    if (valor) siguiente.set(clave, valor)
    else siguiente.delete(clave)
    if (clave !== 'pagina') siguiente.delete('pagina')
    setParams(siguiente, { replace: true })
    if (clave === 'pagina') conteo.current?.focus()
  }

  // Una búsqueda cuenta como «reciente» cuando se deja de escribir.
  useEffect(() => {
    const q = query.trim()
    if (q.length < 3) return undefined
    const t = setTimeout(() => guardarReciente(q), 1200)
    return () => clearTimeout(t)
  }, [query, guardarReciente])

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (cargando) return <CargandoContenido />

  const q = normalizar(query.trim())
  const conceptos = q
    ? resultados.flatMap(({ tema, conceptos: cs }) => cs.filter((c) => normalizar(c.termino).includes(q)).map((c) => ({ ...c, tema }))).slice(0, 12)
    : []
  const farmacosHallados = q && farmacos
    ? farmacos.filter((f) => normalizar(`${f.nombre} ${f.grupo || ''} ${f.uso || ''}`).includes(q)).slice(0, 12)
    : []
  const verTemas = dep === 'todo' || dep === 'temas'

  return (
    <div className="buscar-page">
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Tu material de estudio</span>
        <h1>Buscar en el temario</h1>
        <p>Encuentra temas y conceptos clave por palabra.</p>
      </header>

      <form className="pl-busca" role="search" onSubmit={(e) => { e.preventDefault(); if (query.trim()) guardarReciente(query.trim()) }}>
        <label className="pl-solo-lector" htmlFor="pl-busca-dep">Departamento</label>
        <select id="pl-busca-dep" value={dep} onChange={(e) => cambiar('dep', e.target.value === 'todo' ? '' : e.target.value)}>
          <option value="todo">Todo</option>
          <option value="temas">Temas</option>
          <option value="conceptos">Conceptos</option>
          <option value="farmacos">Fármacos</option>
        </select>
        <input
          aria-label="Buscar tema o concepto en el temario"
          type="search"
          className="buscar-input"
          placeholder="Tema, concepto, fármaco o escala"
          value={query}
          autoFocus
          onChange={(e) => cambiar('q', e.target.value)}
        />
        <button type="submit" aria-label="Buscar"><Icon name="buscar" size={20} /></button>
      </form>
      {!query.trim() && recientes.length > 0 && (
        <div className="pl-recientes">
          <span>Buscaste hace poco:</span>
          {recientes.map((r) => <button type="button" key={r} className="pl-chip" onClick={() => cambiar('q', r)}>{r}</button>)}
        </div>
      )}

      <div className="ui-herramientas">
      <label className="ui-campo">Módulo<select value={moduloId} onChange={(e) => cambiar('modulo', e.target.value)}>
        <option value="">Todos los módulos disponibles</option>
        {modulos.map(([id, titulo]) => <option key={id} value={id}>{titulo}</option>)}
      </select></label>
      {(query || moduloId) && <button className="btn btn--suave" onClick={() => setParams({}, { replace: true })}>Limpiar filtros</button>}
      </div>

      {query.trim() && (
        <p className="buscar-conteo" role="status" ref={conteo} tabIndex={-1}>
          {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'} para «{query}»
        </p>
      )}

      {q && (dep === 'todo' || dep === 'farmacos') && farmacosHallados.length > 0 && (
        <section className="pl-grupo-res" aria-label="Fármacos">
          <h2 className="pl-rotulo">Fármacos · {farmacosHallados.length}</h2>
          <ul>
            {farmacosHallados.map((f) => (
              <li key={f.id}><Link to={`/farmacos/${f.id}`}><Resaltado texto={f.nombre} q={q} /></Link> <span>{f.grupo}</span></li>
            ))}
          </ul>
        </section>
      )}
      {q && (dep === 'todo' || dep === 'conceptos') && conceptos.length > 0 && (
        <section className="pl-grupo-res" aria-label="Conceptos">
          <h2 className="pl-rotulo">Conceptos · {conceptos.length}</h2>
          <ul>
            {conceptos.map((c, i) => (
              <li key={i}><Link to={`/tema/${c.tema.id}`}><Resaltado texto={c.termino} q={q} /></Link> <span>{c.tema.numero} {c.tema.titulo}</span></li>
            ))}
          </ul>
        </section>
      )}

      {verTemas && <div className="buscar-resultados">
        {pagina.filas.map(({ tema, conceptos }) => (
          <div className="buscar-card" key={tema.id} style={{ '--modulo-color': tema.moduloColor }}>
            <Link to={`/tema/${tema.id}`} className="buscar-card-titulo">
              <span className="tema-fila-num">{tema.numero}</span>
              <MedicalIcon id={tema.icono} size={20} /> <Resaltado texto={tema.titulo} q={q} />
            </Link>
            <p className="buscar-card-resumen">{tema.resumen}</p>
            {conceptos.length > 0 && (
              <div className="buscar-conceptos">
                {conceptos.map((c, i) => (
                  <div key={i} className="buscar-concepto">
                    <strong>{c.termino}:</strong> {c.definicion}
                  </div>
                ))}
              </div>
            )}
            <span className="buscar-card-modulo">Modulo {tema.moduloNumero} · {tema.moduloTitulo}</span>
            <span className="ui-etiqueta">{ETIQUETA_ESTADO[estadoEditorialDeFicha(tema)]}</span>
          </div>
        ))}
      </div>}
      {verTemas && <Paginacion datos={pagina} onCambiar={(p) => cambiar('pagina', String(p))} />}
      {!query.trim() && <div className="ui-estado"><h2>¿Qué quieres repasar?</h2><p>Escribe una palabra del tema o de sus conceptos. Puedes acotar la búsqueda a un módulo disponible para tu grupo.</p></div>}

      {query.trim() && resultados.length === 0 && (
        <div className="buscar-vacio">
          <span><Icon name="buscar" size={44} /></span>
          <p>No se encontraron resultados. Prueba con otra palabra.</p>
        </div>
      )}
    </div>
  )
}

const normalizar = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Marca la coincidencia sin distinguir acentos: se busca sobre el texto
// normalizado y se corta el original en las mismas posiciones (la
// normalización NFD + quitar diacríticos conserva la longitud en español).
function Resaltado({ texto, q }) {
  const t = String(texto || '')
  const i = q ? normalizar(t).indexOf(q) : -1
  if (i < 0 || normalizar(t).length !== t.length) return t
  return <>{t.slice(0, i)}<mark className="pl-marca">{t.slice(i, i + q.length)}</mark>{t.slice(i + q.length)}</>
}

// El catálogo de fármacos viaja aparte (FarmacosPage lo carga igual): solo se
// pide cuando hay una búsqueda que lo necesita.
function useCatalogoFarmacos(activo) {
  const [lista, setLista] = useState(null)
  useEffect(() => {
    if (!activo || lista) return undefined
    let vivo = true
    import('../data/farmacos/catalogo.js').then((m) => { if (vivo) setLista(m.FARMACOS) }).catch(() => { if (vivo) setLista([]) })
    return () => { vivo = false }
  }, [activo, lista])
  return lista
}

// Búsquedas recientes: solo en este dispositivo, las últimas seis.
const CLAVE_RECIENTES = 'ptem:busquedas-recientes'
function useBusquedasRecientes() {
  const [lista, setLista] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CLAVE_RECIENTES) || '[]').slice(0, 6) } catch { return [] }
  })
  const guardar = useRef((q) => {
    setLista((previa) => {
      const n = [q, ...previa.filter((x) => normalizar(x) !== normalizar(q))].slice(0, 6)
      try { localStorage.setItem(CLAVE_RECIENTES, JSON.stringify(n)) } catch { /* sin almacenamiento */ }
      return n
    })
  }).current
  return [lista, guardar]
}
