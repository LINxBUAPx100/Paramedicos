import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { registrarEmail, entrarEmail, entrarGoogle } from '../lib/firebase/auth.js'
import { firebaseListo } from '../lib/firebase/init.js'
import Icon from '../components/Icon.jsx'

// Traduce los códigos de error de Firebase a mensajes claros en español.
function traducirError(e) {
  const c = e?.code || ''
  if (c.includes('invalid-credential') || c.includes('wrong-password')) return 'Correo o contraseña incorrectos.'
  if (c.includes('email-already-in-use')) return 'Ese correo ya está registrado. Inicia sesión.'
  if (c.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.'
  if (c.includes('invalid-email')) return 'El correo no es válido.'
  if (c.includes('popup-closed')) return 'Cerraste la ventana de Google antes de terminar.'
  if (c.includes('requires-recent-login')) return 'Por seguridad, cierra sesión y vuelve a entrar antes de hacer este cambio.'
  if (c.includes('network')) return 'Sin conexión. Revisa tu internet.'
  return e?.message || 'Ocurrió un error. Intenta de nuevo.'
}

// --- Perfiles recordados (solo correo y nombre; NUNCA contraseñas) ---
const LS_PERFILES = 'ptem-perfiles'

function leerPerfiles() {
  try {
    const lista = JSON.parse(localStorage.getItem(LS_PERFILES) || '[]')
    return Array.isArray(lista) ? lista : []
  } catch { return [] }
}
export function recordarPerfil({ email, nombre }) {
  if (!email) return
  const lista = leerPerfiles().filter((p) => p.email !== email)
  lista.unshift({ email, nombre: nombre || '' })
  try { localStorage.setItem(LS_PERFILES, JSON.stringify(lista.slice(0, 6))) } catch { /* lleno */ }
}
function olvidarPerfil(email) {
  try {
    localStorage.setItem(LS_PERFILES, JSON.stringify(leerPerfiles().filter((p) => p.email !== email)))
  } catch { /* nada */ }
}

export default function Cuenta() {
  const { autenticado, cargando, user, perfil, salir } = useAuth()

  // Cada vez que hay sesión con perfil cargado, recuerda ese perfil.
  useEffect(() => {
    if (user?.email) recordarPerfil({ email: user.email, nombre: perfil?.nombre || user.displayName || '' })
  }, [user?.email, perfil?.nombre])

  if (!firebaseListo) {
    return (
      <div className="cuenta-wrap">
        <p className="cuenta-aviso">Firebase no está configurado (falta el archivo <code>.env</code>).</p>
      </div>
    )
  }
  if (cargando) {
    return <div className="ruta-cargando"><span className="ruta-spinner" /> <span>Cargando…</span></div>
  }
  return (
    <div className="cuenta-wrap">
      {autenticado ? <Perfil user={user} perfil={perfil} salir={salir} /> : <Acceso />}
    </div>
  )
}

// --- No autenticado: login / registro + perfiles recordados ---
function Acceso() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('login') // 'login' | 'registro'
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [perfiles, setPerfiles] = useState(leerPerfiles)

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setOcupado(true)
    try {
      let u
      if (modo === 'registro') u = await registrarEmail({ nombre, email, password })
      else u = await entrarEmail({ email, password })
      recordarPerfil({ email: u.email, nombre: u.displayName || nombre })
      navigate('/') // al entrar, directo al inicio
    } catch (err) {
      setError(traducirError(err))
      setOcupado(false)
    }
  }

  const conGoogle = async () => {
    setError('')
    setOcupado(true)
    try {
      const u = await entrarGoogle()
      recordarPerfil({ email: u.email, nombre: u.displayName || '' })
      navigate('/') // al entrar, directo al inicio
    } catch (err) {
      setError(traducirError(err))
      setOcupado(false)
    }
  }

  const olvidar = (em) => {
    olvidarPerfil(em)
    setPerfiles(leerPerfiles())
  }

  const olvidada = async () => {
    setError(''); setAviso('')
    if (!email) { setError('Escribe tu correo y vuelve a tocar "¿Olvidaste tu contraseña?".'); return }
    try {
      const { enviarResetPassword } = await import('../lib/firebase/admin.js')
      await enviarResetPassword(email)
      setAviso(`Te enviamos un correo a ${email} para restablecer tu contraseña.`)
    } catch (err) {
      setError(traducirError(err))
    }
  }

  return (
    <div className="cuenta-card">
      <div className="cuenta-tabs" role="tablist">
        <button role="tab" aria-selected={modo === 'login'} className={modo === 'login' ? 'on' : ''} onClick={() => setModo('login')}>
          Iniciar sesión
        </button>
        <button role="tab" aria-selected={modo === 'registro'} className={modo === 'registro' ? 'on' : ''} onClick={() => setModo('registro')}>
          Crear cuenta
        </button>
      </div>

      {modo === 'login' && perfiles.length > 0 && (
        <div className="cuenta-perfiles" aria-label="Perfiles recordados">
          {perfiles.map((p) => (
            <span key={p.email} className={`cuenta-perfil-chip ${email === p.email ? 'on' : ''}`}>
              <button type="button" className="cpc-usar" onClick={() => setEmail(p.email)} title={`Usar ${p.email}`}>
                <span className="cpc-inicial">{(p.nombre || p.email).charAt(0).toUpperCase()}</span>
                <span className="cpc-texto">
                  <strong>{p.nombre || p.email.split('@')[0]}</strong>
                  <small>{p.email}</small>
                </span>
              </button>
              <button type="button" className="cpc-quitar" onClick={() => olvidar(p.email)} aria-label={`Olvidar ${p.email}`}>×</button>
            </span>
          ))}
        </div>
      )}

      <form className="cuenta-form" onSubmit={enviar}>
        {modo === 'registro' && (
          <label>
            Nombre
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" required />
          </label>
        )}
        <label>
          Correo
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={modo === 'registro' ? 'new-password' : 'current-password'}
            minLength={6}
            required
          />
        </label>

        {error && <p className="cuenta-error" role="alert">{error}</p>}
        {aviso && <p className="cuenta-ok" role="status">{aviso}</p>}

        <button type="submit" className="btn-pildora btn-pildora--solido" disabled={ocupado}>
          {ocupado ? 'Un momento…' : modo === 'registro' ? 'Crear cuenta' : 'Entrar'}
        </button>
        {modo === 'login' && (
          <button type="button" className="cuenta-olvide" onClick={olvidada}>
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </form>

      <div className="cuenta-sep"><span>o</span></div>
      <button className="btn-pildora btn-pildora--oscuro cuenta-google" onClick={conGoogle} disabled={ocupado}>
        <Icon name="buscar" size={16} /> Continuar con Google
      </button>
    </div>
  )
}

// --- Autenticado: perfil + unirse por código (academia o prueba) + mis datos ---
function Perfil({ user, perfil, salir }) {
  const [codigo, setCodigo] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [editando, setEditando] = useState(false)

  const pruebaSeg = perfil?.pruebaHasta?.seconds || 0
  const pruebaVigente = pruebaSeg * 1000 > Date.now()
  const fechaPrueba = pruebaSeg
    ? new Date(pruebaSeg * 1000).toLocaleDateString('es-MX', { dateStyle: 'long' })
    : ''

  // Un solo campo: primero intenta unirse a una ACADEMIA; si el código no es
  // de academia, intenta canjearlo como código de PRUEBA temporal.
  const unir = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { unirseAcademia } = await import('../lib/firebase/usuarios.js')
      const aca = await unirseAcademia(user.uid, codigo)
      setMsg(`Te uniste a: ${aca.nombre}`)
      setCodigo('')
    } catch (err) {
      if (String(err?.message || '').includes('No existe una academia')) {
        try {
          const { canjearCodigo } = await import('../lib/firebase/codigos.js')
          const expira = await canjearCodigo(user.uid, codigo)
          setMsg(`Código de prueba activado: tienes acceso hasta el ${new Date(expira.toMillis()).toLocaleDateString('es-MX', { dateStyle: 'long' })}.`)
          setCodigo('')
        } catch (err2) {
          setError(traducirError(err2))
        }
      } else {
        setError(traducirError(err))
      }
    } finally {
      setOcupado(false)
    }
  }

  return (
    <div className="cuenta-card">
      <h1 className="cuenta-titulo">Mi cuenta</h1>
      <dl className="cuenta-datos">
        <div><dt>Nombre</dt><dd>{perfil?.nombre || user.displayName || '—'}</dd></div>
        <div><dt>Correo</dt><dd>{user.email}</dd></div>
        <div><dt>Rol</dt><dd><span className="cuenta-badge">{perfil?.rol || '—'}</span></dd></div>
        <div>
          <dt>Academia</dt>
          <dd>{perfil?.academiaId ? <span className="cuenta-badge cuenta-badge--ok">{perfil.academiaId}</span> : <em>Sin academia</em>}</dd>
        </div>
        {pruebaSeg > 0 && (
          <div>
            <dt>Prueba</dt>
            <dd>
              <span className={`cuenta-badge ${pruebaVigente ? 'cuenta-badge--ok' : ''}`}>
                {pruebaVigente ? `Acceso hasta el ${fechaPrueba}` : `Expiró el ${fechaPrueba}`}
              </span>
            </dd>
          </div>
        )}
      </dl>

      {!perfil?.academiaId && (
        <form className="cuenta-unir" onSubmit={unir}>
          <label>
            Únete con tu código (academia o prueba)
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código (p. ej. AEP-2026 o PRUEBA-XXXX)"
              aria-label="Código de academia o de prueba"
            />
          </label>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {msg && <p className="cuenta-ok" role="status">{msg}</p>}
          <button type="submit" className="btn-pildora btn-pildora--solido" disabled={ocupado}>
            {ocupado ? 'Validando…' : 'Activar código'}
          </button>
        </form>
      )}
      {msg && perfil?.academiaId && <p className="cuenta-ok" role="status">{msg}</p>}

      <button className="cuenta-editar-toggle" onClick={() => setEditando((v) => !v)}>
        {editando ? '▲ Ocultar edición' : '✎ Editar mis datos'}
      </button>
      {editando && <EditarMisDatos user={user} perfil={perfil} />}

      <button className="btn-pildora btn-pildora--oscuro cuenta-salir" onClick={salir}>
        Cerrar sesión
      </button>
    </div>
  )
}

// Edición de los datos propios: nombre, correo (con verificación) y contraseña.
function EditarMisDatos({ user, perfil }) {
  const [nombre, setNombre] = useState(perfil?.nombre || user.displayName || '')
  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const correr = async (fn, exito) => {
    setMsg(''); setError(''); setOcupado(true)
    try {
      await fn()
      setMsg(exito)
    } catch (err) {
      setError(traducirError(err))
    } finally {
      setOcupado(false)
    }
  }

  const guardarNombre = () =>
    correr(async () => {
      const { cambiarMiNombre } = await import('../lib/firebase/auth.js')
      await cambiarMiNombre(nombre)
      recordarPerfil({ email: user.email, nombre })
    }, 'Nombre actualizado.')

  const cambiarCorreo = () =>
    correr(async () => {
      const { cambiarMiCorreo } = await import('../lib/firebase/auth.js')
      await cambiarMiCorreo(nuevoCorreo)
    }, `Te enviamos un enlace de verificación a ${nuevoCorreo}. Al confirmarlo, tu correo de acceso cambiará.`)

  const resetPassword = () =>
    correr(async () => {
      const { restablecerMiPassword } = await import('../lib/firebase/auth.js')
      await restablecerMiPassword()
    }, `Te enviamos un correo a ${user.email} para crear una nueva contraseña.`)

  return (
    <div className="cuenta-editar">
      <label>
        Nombre
        <div className="cuenta-editar-fila">
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button className="btn btn-secundario" onClick={guardarNombre} disabled={ocupado}>Guardar</button>
        </div>
      </label>
      <label>
        Nuevo correo de acceso
        <div className="cuenta-editar-fila">
          <input type="email" value={nuevoCorreo} onChange={(e) => setNuevoCorreo(e.target.value)} placeholder="nuevo@correo.com" />
          <button className="btn btn-secundario" onClick={cambiarCorreo} disabled={ocupado || !nuevoCorreo}>Cambiar</button>
        </div>
      </label>
      <button className="btn btn-secundario" onClick={resetPassword} disabled={ocupado}>
        Enviarme correo para cambiar mi contraseña
      </button>
      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {msg && <p className="cuenta-ok" role="status">{msg}</p>}
    </div>
  )
}
