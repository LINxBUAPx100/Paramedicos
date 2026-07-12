import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fasesNav } from '../data/navIndice.js'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from '../components/Icon.jsx'

// Panel del maestro / administrador: avance de los alumnos de la academia,
// desglosado por fase (mejor calificación y nº de intentos del examen de fase).
// El super-admin puede elegir cualquier academia.
export default function PanelPage() {
  const { cargando, esStaff, esSuperadmin, academiaId, perfil } = useAuth()

  const [academias, setAcademias] = useState([])
  const [acaSel, setAcaSel] = useState('')
  const [datos, setDatos] = useState(null) // { miembros, intentos }
  const [cargandoDatos, setCargandoDatos] = useState(false)
  const [error, setError] = useState('')
  const [alumnoAbierto, setAlumnoAbierto] = useState(null) // uid del detalle

  const academiaActiva = esSuperadmin ? acaSel : academiaId

  // Super-admin: cargar la lista de academias para el selector.
  useEffect(() => {
    if (!esSuperadmin) return
    let activo = true
    ;(async () => {
      try {
        const { listarAcademias } = await import('../lib/firebase/usuarios.js')
        const lista = await listarAcademias()
        if (!activo) return
        setAcademias(lista)
        if (lista.length && !acaSel) setAcaSel(lista[0].id)
      } catch {
        if (activo) setError('No se pudieron cargar las academias.')
      }
    })()
    return () => { activo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esSuperadmin])

  // Cargar miembros + intentos de la academia seleccionada.
  useEffect(() => {
    if (!academiaActiva || !esStaff) return
    let activo = true
    setCargandoDatos(true)
    setError('')
    setDatos(null)
    ;(async () => {
      try {
        const [{ miembrosDeAcademia }, { intentosDeAcademia }] = await Promise.all([
          import('../lib/firebase/usuarios.js'),
          import('../lib/firebase/intentos.js'),
        ])
        const [miembros, intentos] = await Promise.all([
          miembrosDeAcademia(academiaActiva),
          intentosDeAcademia(academiaActiva),
        ])
        if (!activo) return
        setDatos({ miembros, intentos })
      } catch {
        if (activo) setError('No se pudo cargar la información. Revisa tu conexión o tus permisos.')
      } finally {
        if (activo) setCargandoDatos(false)
      }
    })()
    return () => { activo = false }
  }, [academiaActiva, esStaff])

  // Agrega los intentos por alumno y por fase: { uid: { faseId: { mejor, n, ultimo } } }
  const resumen = useMemo(() => {
    const map = {}
    for (const it of datos?.intentos || []) {
      const porFase = (map[it.uid] = map[it.uid] || {})
      const celda = (porFase[it.faseId] = porFase[it.faseId] || { mejor: 0, n: 0, ultimo: null })
      celda.n += 1
      if (it.porcentaje >= celda.mejor) celda.mejor = it.porcentaje
      const seg = it.fecha?.seconds || 0
      if (!celda.ultimo || seg > celda.ultimo) celda.ultimo = seg
    }
    return map
  }, [datos])

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }

  // Solo staff (instructor / admin de escuela / super-admin).
  if (!esStaff) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Panel exclusivo del personal</h1>
        <p>Esta sección es solo para instructores y administradores de academia.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  const alumnos = (datos?.miembros || []).filter((m) => m.rol === 'alumno')
  const staff = (datos?.miembros || []).filter((m) => m.rol !== 'alumno')
  const fechaTxt = (seg) => (seg ? new Date(seg * 1000).toLocaleDateString('es-MX') : '')

  return (
    <div className="panel-page">
      <header className="panel-header">
        <div>
          <h1><Icon name="progreso" size={24} /> Panel de avance</h1>
          <p>
            {esSuperadmin
              ? 'Vista de super-administrador: elige una academia para revisar el avance de sus alumnos.'
              : `Avance de los alumnos de tu academia (${academiaId || '—'}).`}
          </p>
        </div>
        {esSuperadmin && (
          <label className="panel-selector">
            Academia
            <select value={acaSel} onChange={(e) => { setAcaSel(e.target.value); setAlumnoAbierto(null) }}>
              {academias.map((a) => (
                <option key={a.id} value={a.id}>{a.id} — {a.nombre}</option>
              ))}
            </select>
          </label>
        )}
      </header>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {cargandoDatos && (
        <div className="ruta-cargando" role="status">
          <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando alumnos…</span>
        </div>
      )}

      {!cargandoDatos && datos && (
        <>
          <div className="panel-stats">
            <span><strong>{alumnos.length}</strong> alumnos</span>
            <span><strong>{staff.length}</strong> staff</span>
            <span><strong>{datos.intentos.length}</strong> intentos de examen</span>
          </div>

          {alumnos.length === 0 ? (
            <p className="panel-vacio">
              Aún no hay alumnos en esta academia. Compárteles el código
              {academiaActiva ? <strong> {academiaActiva} </strong> : ' '}
              para que se unan desde su cuenta.
            </p>
          ) : (
            <div className="panel-tabla-wrap">
              <table className="panel-tabla">
                <thead>
                  <tr>
                    <th>Alumno</th>
                    {fasesNav.map((f) => (
                      <th key={f.id} title={f.titulo}>F{f.numero}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((al) => {
                    const porFase = resumen[al.id] || {}
                    const abierto = alumnoAbierto === al.id
                    return (
                      <tr
                        key={al.id}
                        className={abierto ? 'abierto' : ''}
                        onClick={() => setAlumnoAbierto(abierto ? null : al.id)}
                      >
                        <td className="panel-alumno">
                          <strong>{al.nombre || al.email || al.id}</strong>
                          {al.estado !== 'activo' && <span className="panel-tag-suspendido">suspendido</span>}
                        </td>
                        {fasesNav.map((f) => {
                          const c = porFase[f.id]
                          if (!c) return <td key={f.id} className="panel-celda-vacia">—</td>
                          const nivel = c.mejor >= 70 ? 'ok' : 'mal'
                          return (
                            <td key={f.id} className={`panel-celda ${nivel}`} title={`Último intento: ${fechaTxt(c.ultimo)}`}>
                              <b>{c.mejor}%</b>
                              <small>×{c.n}</small>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {alumnoAbierto && (
            <DetalleAlumno
              alumno={alumnos.find((a) => a.id === alumnoAbierto)}
              intentos={(datos.intentos || []).filter((i) => i.uid === alumnoAbierto)}
              onCerrar={() => setAlumnoAbierto(null)}
            />
          )}

          <p className="panel-nota">
            Cada celda muestra la <strong>mejor calificación</strong> del examen de fase y el número de
            intentos (×n). Toca un alumno para ver su historial completo.
          </p>
        </>
      )}
    </div>
  )
}

// Historial completo de intentos de un alumno.
function DetalleAlumno({ alumno, intentos, onCerrar }) {
  if (!alumno) return null
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
  return (
    <section className="panel-detalle" aria-label={`Historial de ${alumno.nombre}`}>
      <header>
        <h2>{alumno.nombre || alumno.email}</h2>
        <button className="btn btn-secundario" onClick={onCerrar}>Cerrar</button>
      </header>
      {intentos.length === 0 ? (
        <p className="panel-vacio">Este alumno aún no presenta ningún examen de fase.</p>
      ) : (
        <ul className="panel-intentos">
          {intentos.map((it) => (
            <li key={it.id} className={it.porcentaje >= 70 ? 'ok' : 'mal'}>
              <span className="pi-fase">Fase {it.faseNumero}</span>
              <span className="pi-titulo">{it.faseTitulo}</span>
              <span className="pi-nota">{it.aciertos}/{it.total} · <b>{it.porcentaje}%</b></span>
              <span className="pi-fecha">{fechaTxt(it.fecha)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
