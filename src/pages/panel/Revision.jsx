import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTodasLasFichas, CargandoContenido, ErrorContenido } from '../../context/ContenidoContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useVisibilidad } from '../../lib/useVisibilidad.js'
import { estadoEditorialDeFicha, ETIQUETA_ESTADO } from '../../lib/estadoEditorial.js'
import { motivoSinRevision } from '../../lib/revisionDocente.js'
import { FiltroGrupo } from '../../components/panel/PanelShell.jsx'

export default function Revision() {
  const { fichas, cargando, error, reintentar } = useTodasLasFichas()
  const { temaVisible } = useVisibilidad()
  const { perfil, rol, esSuperadmin } = useAuth()
  const [parametros, setParametros] = useSearchParams()
  const consulta = parametros.get('q') || ''
  const estado = parametros.get('estado') || 'todos'
  const [pagina, setPagina] = useState(1)
  useEffect(() => { setPagina(1) }, [consulta, estado])
  const cambiarFiltro = (clave, valor) => {
    const siguientes = new URLSearchParams(parametros)
    if (valor && valor !== 'todos') siguientes.set(clave, valor)
    else siguientes.delete(clave)
    setParametros(siguientes, { replace: true })
  }
  const motivo = motivoSinRevision({ perfil, rol, esSuperadmin, hoy: new Date().toISOString().slice(0, 10) })
  if (cargando) return <CargandoContenido />
  if (error) return <ErrorContenido onReintentar={reintentar} />
  const normalizar = (texto) => String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
  const visibles = fichas.filter((t) => temaVisible(t.id)
    && (estado === 'todos' || estadoEditorialDeFicha(t) === estado)
    && normalizar(`${t.numero} ${t.tituloVisible || t.titulo}`).includes(normalizar(consulta.trim())))
  const paginas = Math.max(1, Math.ceil(visibles.length / 20))
  const actual = Math.min(pagina, paginas)
  const filas = visibles.slice((actual - 1) * 20, actual * 20)
  return (
    <div className="cs-seccion">
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Trabajo docente</span>
        <h1>Revisión de temas</h1>
        <p>Encuentra un tema y abre su contenido para Validar, Corregir o Reportar.</p>
      </header>
      <FiltroGrupo />
      {motivo && <p className="ui-estado" role="status">{motivo}</p>}
      <div className="ui-herramientas">
        <label className="ui-campo">Buscar tema
          <input type="search" value={consulta} onChange={(e) => cambiarFiltro('q', e.target.value)} placeholder="Título o número" />
        </label>
        <label className="ui-campo">Estado editorial
          <select value={estado} onChange={(e) => cambiarFiltro('estado', e.target.value)}>
            <option value="todos">Todos los estados</option>
            {Object.entries(ETIQUETA_ESTADO).map(([id, titulo]) => <option key={id} value={id}>{titulo}</option>)}
          </select>
        </label>
      </div>
      <p role="status">{visibles.length} temas · página {actual} de {paginas}</p>
      <div className="ui-tabla-wrap" tabIndex={0} role="region" aria-label="Temas para revisión docente">
        <table className="ui-tabla">
          <caption>Contenido disponible en tu contexto actual. Cada firma requiere autorización vigente.</caption>
          <thead><tr><th scope="col">Tema</th><th scope="col">Estado editorial</th><th scope="col">Acción</th></tr></thead>
          <tbody>{filas.map((tema) => (
            <tr key={tema.id}>
              <th scope="row">{tema.numero} · {tema.tituloVisible || tema.titulo}</th>
              <td><span className="ui-etiqueta">{ETIQUETA_ESTADO[estadoEditorialDeFicha(tema)]}</span></td>
              <td><Link to={`/tema/${tema.id}`} className="ui-enlace" aria-label={`Revisar ${tema.tituloVisible || tema.titulo}`}>Abrir tema</Link></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {!visibles.length && <p className="ui-estado">No hay temas que coincidan con estos filtros.</p>}
      <nav className="ui-paginacion" aria-label="Páginas de revisión docente">
        <button className="btn btn--suave" disabled={actual === 1} onClick={() => setPagina(actual - 1)}>Anterior</button>
        <span>{actual} / {paginas}</span>
        <button className="btn btn--suave" disabled={actual === paginas} onClick={() => setPagina(actual + 1)}>Siguiente</button>
      </nav>
    </div>
  )
}
