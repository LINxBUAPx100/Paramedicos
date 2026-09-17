import { useRef } from 'react'
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

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (cargando) return <CargandoContenido />

  return (
    <div className="buscar-page">
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Tu material de estudio</span>
        <h1>Buscar en el temario</h1>
        <p>Encuentra temas y conceptos clave por palabra.</p>
      </header>

      <div className="ui-herramientas">
      <label className="ui-campo">Tema o concepto<input
        aria-label="Buscar tema o concepto en el temario"
        type="search"
        className="buscar-input"
        placeholder="Ej. shock, capnografía, lactato, sepsis…"
        value={query}
        onChange={(e) => cambiar('q', e.target.value)}
      /></label>
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

      <div className="buscar-resultados">
        {pagina.filas.map(({ tema, conceptos }) => (
          <div className="buscar-card" key={tema.id} style={{ '--modulo-color': tema.moduloColor }}>
            <Link to={`/tema/${tema.id}`} className="buscar-card-titulo">
              <span className="tema-fila-num">{tema.numero}</span>
              <MedicalIcon id={tema.icono} size={20} /> {tema.titulo}
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
      </div>
      <Paginacion datos={pagina} onCambiar={(p) => cambiar('pagina', String(p))} />
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
