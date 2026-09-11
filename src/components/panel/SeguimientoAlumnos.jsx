import { useEffect, useRef, useState } from 'react'
import { filasSeguimiento } from '../../lib/seguimientoModelo.js'

const etiquetas = { riesgo: 'Promedio menor de 70', 'sin-evidencia': 'Sin evidencia de evaluación', 'con-evidencia': 'Promedio de 70 o más' }

export default function SeguimientoAlumnos({ alumnos = [], porAlumno = {}, modulos = [] }) {
  const [consulta, setConsulta] = useState('')
  const [categoria, setCategoria] = useState('todos')
  const [orden, setOrden] = useState('nombre')
  const [pagina, setPagina] = useState(0)
  const [abierto, setAbierto] = useState(null)
  const detalle = useRef(null)
  const disparador = useRef(null)
  const filas = filasSeguimiento(alumnos, porAlumno, { consulta, categoria, orden })
  const resumen = filasSeguimiento(alumnos, porAlumno)
  const ultima = Math.max(0, Math.ceil(filas.length / 20) - 1)
  const actual = Math.min(pagina, ultima)
  const seleccionado = filas.find((f) => f.alumno.id === abierto)
  useEffect(() => { if (seleccionado) detalle.current?.focus() }, [abierto])
  const cambiar = (fn) => (e) => { fn(e.target.value); setPagina(0); setAbierto(null) }
  return <section className="ui-panel" aria-labelledby="seguimiento-titulo">
    <h2 id="seguimiento-titulo">Seguimiento de alumnos</h2>
    <p>Mejor resultado por módulo. La ausencia de intentos no equivale a reprobación.</p>
    <div className="ui-atajos" aria-label="Resumen de evidencia"><span className="ui-etiqueta">{alumnos.length} alumnos en el grupo</span><span className="ui-etiqueta ui-etiqueta--riesgo">{resumen.filter((f) => f.categoria === 'riesgo').length} con promedio menor de 70</span><span className="ui-etiqueta">{resumen.filter((f) => f.categoria === 'sin-evidencia').length} sin evidencia de evaluación</span></div>
    <div className="ui-herramientas">
      <label className="ui-campo">Buscar alumno<input type="search" value={consulta} onChange={cambiar(setConsulta)} placeholder="Nombre o correo" /></label>
      <label className="ui-campo">Evidencia<select value={categoria} onChange={cambiar(setCategoria)}><option value="todos">Todos los alumnos</option>{Object.entries(etiquetas).map(([id, t]) => <option value={id} key={id}>{t}</option>)}</select></label>
      <label className="ui-campo">Orden<select value={orden} onChange={cambiar(setOrden)}><option value="nombre">Nombre A–Z</option><option value="promedio">Menor promedio primero</option></select></label>
    </div>
    <p role="status">{filas.length} alumnos{consulta ? ` para «${consulta}»` : ''}</p>
    {filas.length ? <div className="ui-tabla-wrap"><table className="ui-tabla">
      <caption>Resultados de exámenes de módulo; no incluye el libro de calificaciones docentes.</caption>
      <thead><tr><th scope="col">Alumno</th><th scope="col">Evidencia</th><th scope="col">Promedio</th><th scope="col">Módulos</th></tr></thead>
      <tbody>{filas.slice(actual * 20, actual * 20 + 20).map((f) => <tr key={f.alumno.id}>
        <th scope="row"><button className="ui-enlace" aria-expanded={abierto === f.alumno.id} aria-controls="seguimiento-detalle" onClick={(e) => { disparador.current = e.currentTarget; setAbierto(f.alumno.id) }}>{f.alumno.nombre || f.alumno.email || f.alumno.id}</button></th>
        <td><span className={`ui-etiqueta ${f.categoria === 'riesgo' ? 'ui-etiqueta--riesgo' : ''}`}>{etiquetas[f.categoria]}</span></td><td>{f.promedio === null ? '—' : `${f.promedio}%`}</td><td>{f.modulos}</td>
      </tr>)}</tbody></table></div> : <div className="ui-estado">{alumnos.length ? 'No hay coincidencias. Cambia la búsqueda o el filtro.' : 'Este grupo todavía no tiene alumnos.'}</div>}
    <div className="ui-paginacion"><button className="btn btn--suave btn--sm" disabled={actual === 0} onClick={() => { setPagina(actual - 1); setAbierto(null) }}>Anterior</button><span>Página {actual + 1} de {ultima + 1}</span><button className="btn btn--suave btn--sm" disabled={actual >= ultima} onClick={() => { setPagina(actual + 1); setAbierto(null) }}>Siguiente</button></div>
    {seleccionado && <section id="seguimiento-detalle" className="ui-panel ui-detalle" tabIndex={-1} ref={detalle} aria-label={`Detalle de ${seleccionado.alumno.nombre}`}>
      <h3>{seleccionado.alumno.nombre || seleccionado.alumno.email}</h3><p>{etiquetas[seleccionado.categoria]}</p>
      <ul>{modulos.map((m) => { const nota = porAlumno[abierto]?.[m.id]; return <li key={m.id}><strong>{m.titulo}</strong> — {nota ? `${nota.mejor}% · ${nota.n} intentos` : 'Sin evidencia de evaluación'}</li> })}</ul>
      <button className="btn btn--suave" onClick={() => { setAbierto(null); disparador.current?.focus() }}>Cerrar detalle</button>
    </section>}
  </section>
}
