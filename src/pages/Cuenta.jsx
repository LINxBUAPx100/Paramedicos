import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { registrarEmail, entrarEmail, entrarGoogle } from '../lib/firebase/auth.js'
import { unirseAcademia } from '../lib/firebase/usuarios.js'
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
  if (c.includes('network')) return 'Sin conexión. Revisa tu internet.'
  return e?.message || 'Ocurrió un error. Intenta de nuevo.'
}

export default function Cuenta() {
  const { autenticado, cargando, user, perfil, salir } = useAuth()

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

// --- No autenticado: login / registro ---
function Acceso() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('login') // 'login' | 'registro'
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setOcupado(true)
    try {
      if (modo === 'registro') await registrarEmail({ nombre, email, password })
      else await entrarEmail({ email, password })
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
      await entrarGoogle()
      navigate('/') // al entrar, directo al inicio
    } catch (err) {
      setError(traducirError(err))
      setOcupado(false)
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

        <button type="submit" className="btn-pildora btn-pildora--solido" disabled={ocupado}>
          {ocupado ? 'Un momento…' : modo === 'registro' ? 'Crear cuenta' : 'Entrar'}
        </button>
      </form>

      <div className="cuenta-sep"><span>o</span></div>
      <button className="btn-pildora btn-pildora--oscuro cuenta-google" onClick={conGoogle} disabled={ocupado}>
        <Icon name="buscar" size={16} /> Continuar con Google
      </button>
    </div>
  )
}

// --- Autenticado: perfil + unirse por código ---
function Perfil({ user, perfil, salir }) {
  const [codigo, setCodigo] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const unir = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const aca = await unirseAcademia(user.uid, codigo)
      setMsg(`Te uniste a: ${aca.nombre}`)
      setCodigo('')
    } catch (err) {
      setError(traducirError(err))
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
      </dl>

      {!perfil?.academiaId && (
        <form className="cuenta-unir" onSubmit={unir}>
          <label>
            Únete a tu academia
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código (p. ej. AEP-2026)"
              aria-label="Código de la academia"
            />
          </label>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {msg && <p className="cuenta-ok" role="status">{msg}</p>}
          <button type="submit" className="btn-pildora btn-pildora--solido" disabled={ocupado}>
            {ocupado ? 'Validando…' : 'Unirme'}
          </button>
        </form>
      )}
      {msg && perfil?.academiaId && <p className="cuenta-ok" role="status">{msg}</p>}

      <button className="btn-pildora btn-pildora--oscuro cuenta-salir" onClick={salir}>
        Cerrar sesión
      </button>
    </div>
  )
}
