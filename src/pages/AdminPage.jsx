import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ETIQUETA_ROL, CodigosPrueba } from '../components/PanelAcademia.jsx'
import { FacturacionAcademias, AnuncioGlobal } from '../components/AdminPlataforma.jsx'
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

  const cambiar = (uid, cambios, exito = 'Cambios guardados.') =>
    correr(uid, async () => {
      const { actualizarUsuario } = await import('../lib/firebase/usuarios.js')
      await actualizarUsuario(uid, cambios)
    }, exito)

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

          <FacturacionAcademias academias={academias} onCambio={refrescar} />

          <AnuncioGlobal />

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
                    <th scope="col">Usuario</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Academia</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((u) => {
                    const soyYo = u.id === user?.uid
                    const suspendido = u.estado && u.estado !== 'activo'
                    const enEdicion = editando?.uid === u.id
                    const quien = u.nombre || u.email || u.id
                    const sinNombre = !u.nombre
                      || u.nombre.trim().toLowerCase() === (u.email || '').trim().toLowerCase()
                    return (
                      <tr key={u.id} className="panel-fila-gestion">
                        <td className="panel-alumno" data-label="Usuario">
                          {enEdicion ? (
                            <span className="admin-editar-nombre">
                              <input
                                type="text"
                                value={editando.nombre}
                                onChange={(e) => setEditando({ uid: u.id, nombre: e.target.value })}
                                onKeyDown={(e) => { if (e.key === 'Enter') guardarNombre() }}
                                aria-label={`Nuevo nombre para ${u.email || u.id}`}
                                autoFocus
                              />
                              <button type="button" className="pc-copiar" onClick={guardarNombre}>Guardar</button>
                              <button type="button" className="pc-copiar" aria-label="Cancelar edición" onClick={() => setEditando(null)}>×</button>
                            </span>
                          ) : (
                            <>
                              {sinNombre
                                ? <span className="panel-sin-nombre">Sin nombre registrado</span>
                                : <strong>{u.nombre}</strong>}
                              {soyYo && <span className="panel-tag-yo">tú</span>}
                            </>
                          )}
                        </td>
                        <td className="panel-correo" data-label="Correo">{u.email || '—'}</td>
                        <td data-label="Academia">
                          <div className="admin-aca-cell">
                            <select
                              className="panel-rol-select"
                              value={u.academiaId || ''}
                              disabled={ocupado === u.id}
                              aria-label={`Academia de ${quien}`}
                              onChange={(e) => {
                                const destino = e.target.value
                                const pregunta = destino
                                  ? `¿Mover a ${quien} a la academia ${destino}?\n\nSaldrá de su grupo actual.`
                                  : `¿Quitar a ${quien} de su academia?\n\nPerderá el acceso al contenido hasta unirse a otra.`
                                if (!window.confirm(pregunta)) {
                                  e.target.value = u.academiaId || ''
                                  return
                                }
                                cambiar(
                                  u.id,
                                  { academiaId: destino || null, grupoId: null },
                                  destino ? `${quien} ahora pertenece a ${destino}.` : `${quien} quedó sin academia.`
                                )
                              }}
                            >
                              <option value="">— Sin academia —</option>
                              {academias.map((a) => (
                                <option key={a.id} value={a.id}>{a.id}</option>
                              ))}
                            </select>
                            {u.academiaId && (
                              <Link
                                to={`/admin/academia/${u.academiaId}`}
                                className="admin-aca-ver"
                                title={`Ver dashboard de ${u.academiaId}`}
                                aria-label={`Ver dashboard de ${u.academiaId}`}
                              >
                                <Icon name="chevronDer" size={16} />
                              </Link>
                            )}
                          </div>
                        </td>
                        <td data-label="Rol">
                          {soyYo ? (
                            <span className="panel-rol-tag rol-superadmin">{ETIQUETA_ROL[u.rol] || u.rol}</span>
                          ) : (
                            <select
                              className="panel-rol-select"
                              value={u.rol}
                              disabled={ocupado === u.id}
                              aria-label={`Rol de ${quien}`}
                              onChange={(e) => {
                                const rol = e.target.value
                                if (
                                  rol === 'superadmin'
                                  && !window.confirm(
                                    `¿Convertir a ${quien} en SUPER-ADMINISTRADOR?\n\n` +
                                    'Tendrá control total de la plataforma: todas las academias, usuarios, pagos y anuncios.'
                                  )
                                ) {
                                  e.target.value = u.rol
                                  return
                                }
                                cambiar(u.id, { rol }, `${quien} ahora es ${ETIQUETA_ROL[rol]}.`)
                              }}
                            >
                              {ROLES.map((r) => (
                                <option key={r} value={r}>{ETIQUETA_ROL[r]}</option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td data-label="Estado">
                          {soyYo ? (
                            <span className="panel-rol-tag rol-activo">Activo</span>
                          ) : (
                            <button
                              type="button"
                              className={`panel-estado-btn ${suspendido ? 'suspendido' : 'activo'}`}
                              disabled={ocupado === u.id}
                              onClick={() => {
                                if (
                                  !suspendido
                                  && !window.confirm(
                                    `¿Suspender el acceso de ${quien}?\n\n` +
                                    'Ya no podrá ingresar a la plataforma, pero conservará sus datos y su avance. Puedes reactivarle cuando quieras.'
                                  )
                                ) return
                                cambiar(
                                  u.id,
                                  { estado: suspendido ? 'activo' : 'suspendido' },
                                  suspendido ? `Acceso de ${quien} reactivado.` : `${quien} quedó suspendido.`
                                )
                              }}
                            >
                              {ocupado === u.id ? '…' : suspendido ? 'Reactivar' : 'Suspender'}
                            </button>
                          )}
                        </td>
                        <td className="admin-acciones" data-label="Acciones">
                          <button
                            type="button"
                            className="admin-accion"
                            title="Cambiar nombre"
                            aria-label={`Cambiar nombre de ${quien}`}
                            disabled={ocupado === u.id}
                            onClick={() => setEditando({ uid: u.id, nombre: u.nombre || '' })}
                          >
                            <Icon name="editar" size={17} />
                            <span className="admin-accion-txt">Editar</span>
                          </button>
                          <button
                            type="button"
                            className="admin-accion"
                            title="Enviarle correo para restablecer su contraseña"
                            aria-label={`Enviar restablecimiento de contraseña a ${u.email || quien}`}
                            disabled={ocupado === u.id || !u.email}
                            onClick={() => resetPassword(u)}
                          >
                            <Icon name="llave" size={17} />
                            <span className="admin-accion-txt">Restablecer</span>
                          </button>
                          {!soyYo && (
                            <button
                              type="button"
                              className="admin-accion admin-accion--rojo"
                              title="Eliminar usuario"
                              aria-label={`Eliminar a ${quien}`}
                              disabled={ocupado === u.id}
                              onClick={() => eliminar(u)}
                            >
                              <Icon name="basura" size={17} />
                              <span className="admin-accion-txt">Eliminar</span>
                            </button>
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

          <ProblemasReportados />

          <CodigosPrueba academiaId={null} miUid={user?.uid} academias={academias} />
        </>
      )}
    </div>
  )
}

// ---------- Problemas reportados en los temas ----------
function ProblemasReportados() {
  const [reportes, setReportes] = useState(null)
  const [soloAbiertos, setSoloAbiertos] = useState(true)
  const [ocupado, setOcupado] = useState(null) // id en proceso
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      const { listarReportes } = await import('../lib/firebase/reportes.js')
      setReportes(await listarReportes())
    } catch {
      setReportes([])
      setError('No se pudieron cargar los reportes (¿reglas publicadas?).')
    }
  }
  useEffect(() => { cargar() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const accion = async (id, fn) => {
    setOcupado(id)
    setError('')
    try {
      await fn()
      await cargar()
    } catch {
      setError('No se pudo aplicar el cambio.')
    } finally {
      setOcupado(null)
    }
  }

  const resolver = (r) =>
    accion(r.id, async () => {
      const { actualizarReporte } = await import('../lib/firebase/reportes.js')
      await actualizarReporte(r.id, { estado: r.estado === 'abierto' ? 'resuelto' : 'abierto' })
    })

  const borrar = (r) => {
    if (!window.confirm('¿Eliminar este reporte definitivamente?')) return
    accion(r.id, async () => {
      const { borrarReporte } = await import('../lib/firebase/reportes.js')
      await borrarReporte(r.id)
    })
  }

  const abiertos = (reportes || []).filter((r) => r.estado === 'abierto').length
  const visibles = (reportes || []).filter((r) => (soloAbiertos ? r.estado === 'abierto' : true))
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

  return (
    <section className="admin-problemas">
      <h2>
        <Icon name="alerta" size={20} /> Problemas reportados
        {abiertos > 0 && <span className="admin-problemas-badge">{abiertos}</span>}
      </h2>
      <p className="panel-gestion-sub">
        Reportes enviados desde el botón "Reportar un problema" de cada tema.
      </p>
      <label className="admin-problemas-filtro">
        <input type="checkbox" checked={soloAbiertos} onChange={(e) => setSoloAbiertos(e.target.checked)} />
        Solo abiertos
      </label>
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {reportes === null ? null : visibles.length === 0 ? (
        <p className="panel-vacio">
          {soloAbiertos ? 'No hay problemas abiertos.' : 'No hay reportes.'}
        </p>
      ) : (
        <ul className="admin-reportes">
          {visibles.map((r) => (
            <li key={r.id} className={`admin-reporte ${r.estado}`}>
              <div className="ar-cab">
                <Link to={`/tema/${r.temaId}`} className="ar-tema">{r.temaTitulo || r.temaId}</Link>
                <span className={`pc-estado ${r.estado === 'abierto' ? 'expirado' : 'activo'}`}>{r.estado}</span>
              </div>
              <p className="ar-mensaje">{r.mensaje}</p>
              <div className="ar-pie">
                <span>
                  {r.nombre || r.email || 'Anónimo'}
                  {r.academiaId ? ` · ${r.academiaId}` : ''}
                  {r.grupoId ? ` · ${r.grupoId}` : ''}
                  {' · '}{fechaTxt(r.fecha)}
                </span>
                <span className="pc-acciones">
                  <button className="pc-toggle" disabled={ocupado === r.id} onClick={() => resolver(r)}>
                    {r.estado === 'abierto' ? 'Marcar resuelto' : 'Reabrir'}
                  </button>
                  <button className="pc-copiar" disabled={ocupado === r.id} onClick={() => borrar(r)}>
                    Eliminar
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// ---------- Alta de academia ----------
function NuevaAcademia({ onCreada }) {
  const [abierto, setAbierto] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('basico')
  const [plan, setPlan] = useState('')
  const [logo, setLogo] = useState('')
  const [lema, setLema] = useState('')
  const [colorHero, setColorHero] = useState('#0c5fc4')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const crear = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { crearAcademia } = await import('../lib/firebase/admin.js')
      const cod = await crearAcademia({ codigo, nombre, tipo, plan, logo, lema, colorHero })
      setMsg(`Academia ${cod} creada. Comparte ese código con sus alumnos.`)
      setCodigo(''); setNombre(''); setPlan(''); setLogo(''); setLema('')
      onCreada()
    } catch (err) {
      setError(err?.message || 'No se pudo crear la academia.')
    } finally {
      setOcupado(false)
    }
  }

  return (
    <div className="admin-form-bloque">
      <button type="button" className="admin-form-toggle" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}>
        {abierto ? 'Cerrar' : '+ Nueva academia'}
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
          <label>
            Logo (Drive o URL)
            <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="Enlace del logo de la academia" />
          </label>
          <label>
            Lema (para su hero)
            <input type="text" value={lema} onChange={(e) => setLema(e.target.value)} placeholder="Formando a los mejores" maxLength={90} />
          </label>
          <label className="pa-color">
            Color
            <input type="color" value={colorHero} onChange={(e) => setColorHero(e.target.value)} />
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
  const [verPassword, setVerPassword] = useState(false)
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
      <button type="button" className="admin-form-toggle" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}>
        {abierto ? 'Cerrar' : '+ Nuevo usuario'}
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
            <span className="admin-password">
              <input
                type={verPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={10}
                required
                placeholder="mínimo 10 caracteres"
              />
              <button
                type="button"
                className="admin-password-ver"
                aria-label={verPassword ? 'Ocultar la contraseña' : 'Mostrar la contraseña'}
                aria-pressed={verPassword}
                onClick={() => setVerPassword((v) => !v)}
              >
                <Icon name={verPassword ? 'ojoCerrado' : 'ojo'} size={17} />
              </button>
            </span>
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
