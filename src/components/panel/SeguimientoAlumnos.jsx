import { useEffect, useRef, useState } from 'react'
import { filasSeguimiento, semaforoDeModulo, atenderPrimero } from '../../lib/seguimientoModelo.js'
import BotonPersona from '../usuarios/BotonPersona.jsx'

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
    {/* PTEM Pulso: el triage del grupo. Cada etiqueta es un filtro de la
        tabla; «sin evidencia» va aparte de «en riesgo» porque no haber
        presentado no es reprobar. */}
    <div className="pl-triage-grupo" role="group" aria-label={`Triage del grupo: ${alumnos.length} alumnos`}>
      {[
        ['riesgo', 'rojo', 'En riesgo', 'Promedio menor de 70'],
        ['sin-evidencia', 'amarillo', 'Sin evidencia', 'No han presentado examen'],
        ['con-evidencia', 'verde', 'Van bien', 'Promedio de 70 o más'],
      ].map(([id, color, titulo, sub]) => (
        <button
          type="button"
          key={id}
          className={`pl-etiqueta pl-etiqueta--${color} ${categoria === id ? 'es-filtro' : ''}`}
          aria-pressed={categoria === id}
          onClick={() => { setCategoria(categoria === id ? 'todos' : id); setPagina(0); setAbierto(null) }}
        >
          <span className="pl-etiqueta-ojal" aria-hidden="true" />
          <span><b>{titulo}</b><span className="pl-etiqueta-sub">{sub}</span></span>
          <span className="pl-etiqueta-n">{resumen.filter((f) => f.categoria === id).length}</span>
        </button>
      ))}
    </div>
    {atenderPrimero(alumnos, porAlumno).length > 0 && (
      <div className="pl-atender">
        <span className="pl-rotulo">Atender primero</span>
        <ul>
          {atenderPrimero(alumnos, porAlumno).map((f) => (
            <li key={f.alumno.id}>
              <button type="button" className="ui-enlace" onClick={(e) => { disparador.current = e.currentTarget; setAbierto(f.alumno.id) }}>
                {f.alumno.nombre || f.alumno.email || f.alumno.id}
              </button>
              <span>{f.promedio === null ? 'sin evidencia' : `${f.promedio} %`}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    {modulos.length > 0 && alumnos.length > 0 && (
      <div className="pl-semaforo" aria-label="Semáforo por módulo">
        <span className="pl-rotulo">Semáforo por módulo</span>
        {modulos.map((m) => {
          const s = semaforoDeModulo(alumnos, porAlumno, m.id)
          const pct = (n) => `${(n / Math.max(1, s.total)) * 100}%`
          return (
            <div className="pl-semaforo-fila" key={m.id}>
              <span className="pl-semaforo-nombre" title={m.titulo}>M{m.numero ?? ''} {m.titulo}</span>
              <span className="pl-semaforo-barra" role="img" aria-label={`${s.aprobados} aprueban, ${s.bajo} por debajo, ${s.sinIntento} sin intento`}>
                <i style={{ width: pct(s.aprobados), background: 'var(--exito-solido)' }} />
                <i style={{ width: pct(s.bajo), background: 'var(--urgencia)' }} />
                <i style={{ width: pct(s.sinIntento), background: 'var(--borde-fuerte)' }} />
              </span>
              <span className="pl-semaforo-cifra">{s.aprobados}/{s.total}</span>
            </div>
          )
        })}
        <p className="pl-ruta-leyenda"><span><i style={{ background: 'var(--exito-solido)' }} />Aprueban</span><span><i style={{ background: 'var(--urgencia)' }} />Por debajo de 70</span><span><i style={{ background: 'var(--borde-fuerte)' }} />Sin intento</span></p>
      </div>
    )}
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
        <th scope="row"><button className="ui-enlace" aria-expanded={abierto === f.alumno.id} aria-controls="seguimiento-detalle" onClick={(e) => { disparador.current = e.currentTarget; setAbierto(f.alumno.id) }}>{f.alumno.nombre || f.alumno.email || f.alumno.id}</button><BotonPersona persona={{ ...f.alumno, uid: f.alumno.id }} variante="icono" /></th>
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
