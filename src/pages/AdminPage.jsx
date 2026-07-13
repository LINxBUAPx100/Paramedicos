import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ETIQUETA_ROL, CodigosPrueba } from '../components/PanelAcademia.jsx'
import Icon from '../components/Icon.jsx'

// ============================================================
//  Dashboard general del SUPER-ADMIN (/admin)
// ------------------------------------------------------------
//  - Todas las academias (con alta de nuevas) y entrada a su dashboard.
//  - Gestión global de usuarios: crear, cambiar rol/estado, renombrar,
//    enviar restablecimiento de contraseña y eliminar.
//  - Códigos de prueba globales.
// ============================================================

const ROLES = ['alumno', 'instructor', 'admin_escuela', 'superadmin']

export default function AdminPage() {
  const { cargando, esSuperadmin, user } = useAuth()

  const [datos, setDatos] = useState(null) // { academias, usuarios, intentos }
  const [cargandoDatos, setCargandoDatos] = useState(true)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [filtro, setFiltro] = useState('')
  const [ocupado, setOcupado] = useState(null) // uid en proceso
  const [editando, setEditando] = useState(null) // { uid, nombre } en edición
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

  const refrescar = () => setRecarga((n) => n + 1)

  const correr = async (uid, fn, exito = '') => {
    setOcupado(uid)
    setError('')
    setAviso('')
    try {
      await fn()
      if (exito) setAviso(exito)
      refrescar()
    } catch (err) {
      setError(err?.message || 'No se pudo aplicar el cambio.')
    } finally {
      setOcupado(null)
    }
  }

  const cambiar = (uid, cambios) =>
    correr(uid, async () => {
      const { actualizarUsuario } = await import('../lib/firebase/usuarios.js')
      await actualizarUsuario(uid, cambios)
    })

  const guardarNombre = () => {
    const { uid, nombre } = editando
    setEditando(null)
    return correr(uid, async () => {
      const { actualizarUsuario } = await import('../lib/firebase/usuarios.js')
      await actualizarUsuario(uid, { nombre: nombre.trim() })
    })
  }

  const resetPassword = (u) =>
    correr(u.id, async () => {
      const { enviarResetPassword } = await import('../lib/firebase/admin.js')
      await enviarResetPassword(u.email)
    }, `Correo de restablecimiento enviado a ${u.email}.`)

  const eliminar = (u) => {
    const seguro = window.confirm(
      `¿Eliminar a ${u.nombre || u.email}?\n\nSe borran su perfil y su progreso. Sus intentos de examen se conservan. ` +
      'Su acceso (correo/contraseña) se elimina del todo desde la consola de Firebase → Authentication.'
    )
    if (!seguro) return
    correr(u.id, async () => {
      const { eliminarUsuario } = await import('../lib/firebase/admin.js')
      await eliminarUsuario(u.id)
    }, 'Usuario eliminado (perfil y progreso).')
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
      {aviso && <p className="cuenta-ok" role="status">{aviso}</p>}
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
              <p className="panel-vacio">Aún no hay academias: crea la primera aquí abajo.</p>
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
            <NuevaAcademia onCreada={refrescar} />
          </section>

          <section className="admin-usuarios">
            <h2><Icon name="usuario" size={20} /> Usuarios y roles</h2>
            <p className="panel-gestion-sub">
              Cambia rol, nombre y estado de cualquier usuario; envíale el correo para crear una
              contraseña nueva, o elimínalo. El correo de inicio de sesión solo puede cambiarlo cada
              usuario desde <strong>Mi cuenta</strong>.
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((u) => {
                    const soyYo = u.id === user?.uid
                    const suspendido = u.estado && u.estado !== 'activo'
                    const enEdicion = editando?.uid === u.id
                    return (
                      <tr key={u.id} className="panel-fila-gestion">
                        <td className="panel-alumno">
                          {enEdicion ? (
                            <span className="admin-editar-nombre">
                              <input
                                type="text"
                                value={editando.nombre}
                                onChange={(e) => setEditando({ uid: u.id, nombre: e.target.value })}
                                onKeyDown={(e) => { if (e.key === 'Enter') guardarNombre() }}
                                autoFocus
                              />
                              <button className="pc-copiar" onClick={guardarNombre}>Guardar</button>
                              <button className="pc-copiar" onClick={() => setEditando(null)}>×</button>
                            </span>
                          ) : (
                            <>
                              <strong>{u.nombre || '—'}</strong>
                              {soyYo && <span className="panel-tag-yo">tú</span>}
                            </>
                          )}
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
                        <td className="admin-acciones">
                          <button
                            className="admin-accion"
                            title="Cambiar nombre"
                            disabled={ocupado === u.id}
                            onClick={() => setEditando({ uid: u.id, nombre: u.nombre || '' })}
                          >✎</button>
                          <button
                            className="admin-accion"
                            title="Enviarle correo para restablecer su contraseña"
                            disabled={ocupado === u.id || !u.email}
                            onClick={() => resetPassword(u)}
                          >🔑</button>
                          {!soyYo && (
                            <button
                              className="admin-accion admin-accion--rojo"
                              title="Eliminar usuario"
                              disabled={ocupado === u.id}
                              onClick={() => eliminar(u)}
                            >🗑</button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <NuevoUsuario academias={academias} onCreado={refrescar} />
          </section>

          <CodigosPrueba academiaId={null} miUid={user?.uid} />
        </>
      )}
    </div>
  )
}

// ---------- Alta de academia ----------
function NuevaAcademia({ onCreada }) {
  const [abierto, setAbierto] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('basico')
  const [plan, setPlan] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const crear = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { crearAcademia } = await import('../lib/firebase/admin.js')
      const cod = await crearAcademia({ codigo, nombre, tipo, plan })
      setMsg(`Academia ${cod} creada. Comparte ese código con sus alumnos.`)
      setCodigo(''); setNombre(''); setPlan('')
      onCreada()
    } catch (err) {
      setError(err?.message || 'No se pudo crear la academia.')
    } finally {
      setOcupado(false)
    }
  }

  return (
    <div className="admin-form-bloque">
      <button className="admin-form-toggle" onClick={() => setAbierto((v) => !v)}>
        {abierto ? '▲ Ocultar' : '+ Nueva academia'}
      </button>
      {abierto && (
        <form className="admin-form" onSubmit={crear}>
          <label>
            Código (será el ID)
            <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} placeholder="AEP-2027" required />
          </label>
          <label>
            Nombre
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Academia Estatal de Paramédicos" required />
          </label>
          <label>
            Tipo
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="basico">Básico</option>
              <option value="avanzado">Avanzado</option>
              <option value="medicina">Medicina</option>
            </select>
          </label>
          <label>
            Plan (opcional)
            <input type="text" value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="anual" />
          </label>
          <button className="btn btn-primario" type="submit" disabled={ocupado}>
            {ocupado ? 'Creando…' : 'Crear academia'}
          </button>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {msg && <p className="cuenta-ok" role="status">{msg}</p>}
        </form>
      )}
    </div>
  )
}

// ---------- Alta de usuario (app secundaria: no toca tu sesión) ----------
function NuevoUsuario({ academias, onCreado }) {
  const [abierto, setAbierto] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('alumno')
  const [academiaId, setAcademiaId] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const crear = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { crearUsuarioNuevo } = await import('../lib/firebase/admin.js')
      await crearUsuarioNuevo({ nombre, email, password, rol, academiaId: academiaId || null })
      setMsg(`Usuario ${email} creado. Compártele su contraseña; puede cambiarla con "¿Olvidaste tu contraseña?".`)
      setNombre(''); setEmail(''); setPassword('')
      onCreado()
    } catch (err) {
      const c = err?.code || ''
      setError(
        c.includes('email-already-in-use') ? 'Ese correo ya tiene cuenta.'
        : c.includes('invalid-email') ? 'El correo no es válido.'
        : err?.message || 'No se pudo crear el usuario.'
      )
    } finally {
      setOcupado(false)
    }
  }

  return (
    <div className="admin-form-bloque">
      <button className="admin-form-toggle" onClick={() => setAbierto((v) => !v)}>
        {abierto ? '▲ Ocultar' : '+ Nuevo usuario'}
      </button>
      {abierto && (
        <form className="admin-form" onSubmit={crear}>
          <label>
            Nombre
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </label>
          <label>
            Correo
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Contraseña temporal
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required placeholder="mínimo 6 caracteres" />
          </label>
          <label>
            Rol
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
              {ROLES.map((r) => <option key={r} value={r}>{ETIQUETA_ROL[r]}</option>)}
            </select>
          </label>
          <label>
            Academia
            <select value={academiaId} onChange={(e) => setAcademiaId(e.target.value)}>
              <option value="">— Sin academia —</option>
              {academias.map((a) => <option key={a.id} value={a.id}>{a.id} — {a.nombre}</option>)}
            </select>
          </label>
          <button className="btn btn-primario" type="submit" disabled={ocupado}>
            {ocupado ? 'Creando…' : 'Crear usuario'}
          </button>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {msg && <p className="cuenta-ok" role="status">{msg}</p>}
        </form>
      )}
    </div>
  )
}
