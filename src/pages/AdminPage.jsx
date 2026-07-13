import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ETIQUETA_ROL } from '../components/PanelAcademia.jsx'
import Icon from '../components/Icon.jsx'

// ============================================================
//  Dashboard general del SUPER-ADMIN (/admin)
// ------------------------------------------------------------
//  - Vista de todas las academias (miembros, intentos, estado) con
//    entrada al dashboard individual de cada una.
//  - Gestión global de usuarios: cambiar rol, academia y estado.
// ============================================================

const ROLES = ['alumno', 'instructor', 'admin_escuela', 'superadmin']

export default function AdminPage() {
  const { cargando, esSuperadmin, user } = useAuth()

  const [datos, setDatos] = useState(null) // { academias, usuarios, intentos }
  const [cargandoDatos, setCargandoDatos] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('')
  const [ocupado, setOcupado] = useState(null) // uid en proceso
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    if (!esSuperadmin) return
    let activo = true
    setCargandoDatos(true)
    setError('')
    ;(async () => {
      try {
        const [{ listarAcademias, listarUsuarios }, { listarIntentos }] = await Promise.all([
          import('../lib/firebase/usuarios.js'),
          import('../lib/firebase/intentos.js'),
        ])
        const [academias, usuarios, intentos] = await Promise.all([
          listarAcademias(),
          listarUsuarios(),
          listarIntentos(),
        ])
        if (!activo) return
        setDatos({ academias, usuarios, intentos })
      } catch {
        if (activo) setError('No se pudo cargar el dashboard. Verifica que las reglas de Firestore estén publicadas.')
      } finally {
        if (activo) setCargandoDatos(false)
      }
    })()
    return () => { activo = false }
  }, [esSuperadmin, recarga])

  // Conteos por academia: alumnos, staff, intentos.
  const porAcademia = useMemo(() => {
    const map = {}
    for (const u of datos?.usuarios || []) {
      if (!u.academiaId) continue
      const c = (map[u.academiaId] = map[u.academiaId] || { alumnos: 0, staff: 0, intentos: 0 })
      if (u.rol === 'alumno') c.alumnos += 1
      else c.staff += 1
    }
    for (const it of datos?.intentos || []) {
      if (!it.academiaId) continue
      const c = (map[it.academiaId] = map[it.academiaId] || { alumnos: 0, staff: 0, intentos: 0 })
      c.intentos += 1
    }
    return map
  }, [datos])

  const usuariosFiltrados = useMemo(() => {
    const q = filtro.trim().toLowerCase()
    const lista = datos?.usuarios || []
    if (!q) return lista
    return lista.filter((u) =>
      (u.nombre || '').toLowerCase().includes(q)
      || (u.email || '').toLowerCase().includes(q)
      || (u.academiaId || '').toLowerCase().includes(q)
      || (u.rol || '').toLowerCase().includes(q)
    )
  }, [datos, filtro])

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }

  if (!esSuperadmin) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Solo super-administradores</h1>
        <p>Este dashboard es exclusivo del administrador de la plataforma.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  const cambiar = async (uid, cambios) => {
    setOcupado(uid)
    setError('')
    try {
      const { actualizarUsuario } = await import('../lib/firebase/usuarios.js')
      await actualizarUsuario(uid, cambios)
      setRecarga((n) => n + 1)
    } catch {
      setError('No se pudo aplicar el cambio.')
    } finally {
      setOcupado(null)
    }
  }

  const academias = datos?.academias || []
  const usuarios = datos?.usuarios || []
  const totalAlumnos = usuarios.filter((u) => u.rol === 'alumno').length

  return (
    <div className="panel-page admin-page">
      <header className="panel-header">
        <div>
          <h1><Icon name="capas" size={24} /> Dashboard general</h1>
          <p>Vista de super-administrador: todas las academias y todos los usuarios de la plataforma.</p>
        </div>
      </header>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {cargandoDatos && (
        <div className="ruta-cargando" role="status">
          <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando plataforma…</span>
        </div>
      )}

      {!cargandoDatos && datos && (
        <>
          <div className="panel-stats">
            <span><strong>{academias.length}</strong> academias</span>
            <span><strong>{usuarios.length}</strong> usuarios</span>
            <span><strong>{totalAlumnos}</strong> alumnos</span>
            <span><strong>{datos.intentos.length}</strong> intentos de examen</span>
          </div>

          <section className="admin-academias">
            <h2><Icon name="temario" size={20} /> Academias</h2>
            {academias.length === 0 ? (
              <p className="panel-vacio">
                Aún no hay academias. Crea la primera en la consola de Firestore
                (colección <code>academias</code>, el id del doc es el código).
              </p>
            ) : (
              <div className="admin-academias-grid">
                {academias.map((a) => {
                  const c = porAcademia[a.id] || { alumnos: 0, staff: 0, intentos: 0 }
                  const activa = a.estado === 'activo'
                  return (
                    <Link to={`/admin/academia/${a.id}`} key={a.id} className="admin-academia-card">
                      <div className="aa-cabecera">
                        <strong>{a.nombre || a.id}</strong>
                        <span className={`aa-estado ${activa ? 'ok' : 'mal'}`}>
                          {activa ? 'Activa' : 'Suspendida'}
                        </span>
                      </div>
                      <span className="aa-codigo">{a.id}{a.tipo ? ` · ${a.tipo}` : ''}</span>
                      <div className="aa-stats">
                        <span><b>{c.alumnos}</b> alumnos</span>
                        <span><b>{c.staff}</b> staff</span>
                        <span><b>{c.intentos}</b> intentos</span>
                      </div>
                      <span className="aa-ver">Ver dashboard <Icon name="chevronDer" size={16} /></span>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>

          <section className="admin-usuarios">
            <h2><Icon name="usuario" size={20} /> Usuarios y roles</h2>
            <p className="panel-gestion-sub">
              Cambia el rol de cualquier usuario de la plataforma. Los cambios aplican de inmediato.
            </p>
            <input
              type="search"
              className="admin-buscar"
              placeholder="Filtrar por nombre, correo, academia o rol…"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              aria-label="Filtrar usuarios"
            />
            <div className="panel-tabla-wrap">
              <table className="panel-tabla panel-tabla--gestion">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Academia</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((u) => {
                    const soyYo = u.id === user?.uid
                    const suspendido = u.estado && u.estado !== 'activo'
                    return (
                      <tr key={u.id} className="panel-fila-gestion">
                        <td className="panel-alumno">
                          <strong>{u.nombre || '—'}</strong>
                          {soyYo && <span className="panel-tag-yo">tú</span>}
                        </td>
                        <td className="panel-correo">{u.email || '—'}</td>
                        <td>
                          {u.academiaId
                            ? <Link to={`/admin/academia/${u.academiaId}`} className="admin-aca-link">{u.academiaId}</Link>
                            : <span className="panel-celda-vacia">—</span>}
                        </td>
                        <td>
                          {soyYo ? (
                            <span className="panel-rol-tag rol-superadmin">{ETIQUETA_ROL[u.rol] || u.rol}</span>
                          ) : (
                            <select
                              className="panel-rol-select"
                              value={u.rol}
                              disabled={ocupado === u.id}
                              onChange={(e) => cambiar(u.id, { rol: e.target.value })}
                            >
                              {ROLES.map((r) => (
                                <option key={r} value={r}>{ETIQUETA_ROL[r]}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td>
                          {soyYo ? (
                            <span className="panel-rol-tag rol-activo">Activo</span>
                          ) : (
                            <button
                              className={`panel-estado-btn ${suspendido ? 'suspendido' : 'activo'}`}
                              disabled={ocupado === u.id}
                              onClick={() => cambiar(u.id, { estado: suspendido ? 'activo' : 'suspendido' })}
                            >
                              {ocupado === u.id ? '…' : suspendido ? 'Reactivar' : 'Suspender'}
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
