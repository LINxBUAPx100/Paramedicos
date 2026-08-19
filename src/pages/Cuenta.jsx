import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { registrarEmail, entrarEmail, entrarGoogle } from '../lib/firebase/auth.js'
import { firebaseListo } from '../lib/firebase/init.js'
import { errores as leerErrores, diagnostico, limpiar as limpiarRegistro } from '../lib/registro.js'
// El código del enlace (?c=XXX) y su almacén viven en lib/codigoInvitacion.js:
// esta pantalla ya no es la única que lo necesita (también «Bienvenida»).
import { codigoInvitacionActual, limpiarCodigoInvitacion } from '../lib/codigoInvitacion.js'
// Los mensajes de error de Firebase (Auth Y Firestore) se traducen en un solo
// sitio: lib/mensajeError.js. Antes esta función vivía aquí y «Bienvenida»,
// que hace los mismos canjes, mostraba el texto en inglés del SDK.
import { mensajeDeError as traducirError } from '../lib/mensajeError.js'
import Icon from '../components/Icon.jsx'

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
  const [params, setParams] = useSearchParams()
  // La captura es SÍNCRONA, en el estado inicial: si se hiciera en un efecto,
  // el primer render pintaría el campo vacío (y con él, el aviso «no tienes
  // invitación») aunque el enlace sí trajera código.
  const [codigoInvitacion, setCodigoInvitacion] = useState(codigoInvitacionActual)

  // Ya guardado: se quita de la URL para que un refresh o un enlace compartido
  // por error no lo re-dispare.
  useEffect(() => {
    if (params.get('c')) {
      setCodigoInvitacion(codigoInvitacionActual())
      params.delete('c')
      setParams(params, { replace: true })
    }
  }, [params, setParams])

  // Cada vez que hay sesión con perfil cargado, recuerda ese perfil.
  useEffect(() => {
    if (user?.email) recordarPerfil({ email: user.email, nombre: perfil?.nombre || user.displayName || '' })
  }, [user?.email, perfil?.nombre])

  const limpiarInvitacion = () => { limpiarCodigoInvitacion(); setCodigoInvitacion('') }

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
      {autenticado
        ? <Perfil user={user} perfil={perfil} salir={salir} codigoInvitacion={codigoInvitacion} onConsumir={limpiarInvitacion} />
        : <Acceso codigoInvitacion={codigoInvitacion} />}
    </div>
  )
}

// --- No autenticado: login / registro + perfiles recordados ---
function Acceso({ codigoInvitacion = '' }) {
  const navigate = useNavigate()
  const [modo, setModo] = useState(codigoInvitacion ? 'registro' : 'login')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [perfiles, setPerfiles] = useState(leerPerfiles)

  // Con invitación NO navegamos fuera: al autenticarse, Cuenta re-renderiza y
  // muestra el perfil con el código ya pre-llenado para activarlo.
  const trasEntrar = () => { if (!codigoInvitacion) navigate('/') }

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setOcupado(true)
    try {
      let u
      if (modo === 'registro') u = await registrarEmail({ nombre, email, password })
      else u = await entrarEmail({ email, password })
      recordarPerfil({ email: u.email, nombre: u.displayName || nombre })
      trasEntrar()
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
      trasEntrar()
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
      {codigoInvitacion && (
        <div className="cuenta-invitacion" role="status">
          <span className="cuenta-invitacion-ico"><Icon name="pildora" size={18} /></span>
          <div>
            <strong>Tienes una invitación</strong>
            <p>Crea tu cuenta o inicia sesión y activaremos tu código <code>{codigoInvitacion}</code> automáticamente.</p>
          </div>
        </div>
      )}
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

        <button type="submit" className="btn btn--pildora btn--carbon" disabled={ocupado}>
          {ocupado ? 'Un momento…' : modo === 'registro' ? 'Crear cuenta' : 'Entrar'}
        </button>
        {modo === 'login' && (
          <button type="button" className="cuenta-olvide" onClick={olvidada}>
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </form>

      <div className="cuenta-sep"><span>o</span></div>
      <button className="btn btn--pildora btn--fantasma cuenta-google" onClick={conGoogle} disabled={ocupado}>
        <Icon name="buscar" size={16} /> Continuar con Google
      </button>
    </div>
  )
}

// --- Autenticado: perfil + unirse por código (academia o prueba) + mis datos ---
function Perfil({ user, perfil, salir, codigoInvitacion = '', onConsumir }) {
  // Los CÓDIGOS de academia/grupo no se muestran a alumnos ni profesores
  // (solo director/super-admin): en su lugar va el NOMBRE.
  const { academia, grupo, puedeVerCodigos } = useAuth()
  const [codigo, setCodigo] = useState(codigoInvitacion || '')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [editando, setEditando] = useState(false)

  // Si llega una invitación después de montar (login recién hecho), pre-llénala.
  useEffect(() => { if (codigoInvitacion) setCodigo(codigoInvitacion) }, [codigoInvitacion])

  const pruebaSeg = perfil?.pruebaHasta?.seconds || 0
  const pruebaVigente = pruebaSeg * 1000 > Date.now()
  const fechaPrueba = pruebaSeg
    ? new Date(pruebaSeg * 1000).toLocaleDateString('es-MX', { dateStyle: 'long' })
    : ''

  // Un solo campo para cuatro tipos de código: INVITACIÓN POR ROL (te une con
  // el rol que trae dentro), ACADEMIA, GRUPO (te une al grupo y a su academia)
  // o PRUEBA temporal. La cascada vive en lib/firebase/canjear.js porque la
  // pantalla de bienvenida usa exactamente la misma.
  const unir = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { canjearCualquierCodigo } = await import('../lib/firebase/canjear.js')
      const r = await canjearCualquierCodigo(user.uid, codigo)
      setMsg(r.mensaje)
      setCodigo('')
      onConsumir?.()
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
          <dd>
            {perfil?.academiaId ? (
              <span className="cuenta-badge cuenta-badge--ok">
                {academia?.nombre || (puedeVerCodigos ? perfil.academiaId : 'Tu academia')}
              </span>
            ) : (
              <em>Sin academia</em>
            )}
          </dd>
        </div>
        {perfil?.grupoId && (
          <div>
            <dt>Grupo</dt>
            <dd>
              <span className="cuenta-badge">
                {grupo?.nombre || (puedeVerCodigos ? perfil.grupoId : 'Tu grupo')}
              </span>
            </dd>
          </div>
        )}
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

      {(!perfil?.academiaId || perfil?.esPrueba || codigoInvitacion) && (
        <form className="cuenta-unir" onSubmit={unir}>
          {codigoInvitacion && (
            <p className="cuenta-invitacion-nota" role="status">
              Te invitaron con el código <code>{codigoInvitacion}</code>. Toca «Activar código» para unirte.
            </p>
          )}
          <label>
            Únete con tu código (invitación, academia, grupo o prueba)
            <input
              type="text"
              value={codigo}
              // En mayúsculas al escribir: los códigos lo son, y en un móvil el
              // teclado ofrece minúsculas. Se sigue pudiendo borrar y reescribir.
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="INV-XXX-X-XXXX, AEP-2026 o GRP-XXXX"
              aria-label="Código de invitación, academia, grupo o prueba"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck="false"
            />
          </label>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {msg && <p className="cuenta-ok" role="status">{msg}</p>}
          <button type="submit" className="btn btn--pildora btn--carbon" disabled={ocupado}>
            {ocupado ? 'Validando…' : 'Activar código'}
          </button>
        </form>
      )}
      {msg && perfil?.academiaId && <p className="cuenta-ok" role="status">{msg}</p>}

      <button className="cuenta-editar-toggle" onClick={() => setEditando((v) => !v)}>
        {editando ? 'Cerrar edición' : 'Editar mis datos'}
      </button>
      {editando && <EditarMisDatos user={user} perfil={perfil} />}

      {/* Fuera del desplegable a propósito: si algo falló, la persona tiene que
          verlo sin ir a buscarlo. Solo aparece cuando hay algo que enviar. */}
      <EnviarDiagnostico user={user} perfil={perfil} />

      <button className="btn btn--pildora btn--fantasma cuenta-salir" onClick={salir}>
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
          <button className="btn btn--suave" onClick={guardarNombre} disabled={ocupado}>Guardar</button>
        </div>
      </label>
      <label>
        Nuevo correo de acceso
        <div className="cuenta-editar-fila">
          <input type="email" value={nuevoCorreo} onChange={(e) => setNuevoCorreo(e.target.value)} placeholder="nuevo@correo.com" />
          <button className="btn btn--suave" onClick={cambiarCorreo} disabled={ocupado || !nuevoCorreo}>Cambiar</button>
        </div>
      </label>
      <button className="btn btn--suave" onClick={resetPassword} disabled={ocupado}>
        Enviarme correo para cambiar mi contraseña
      </button>
      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {msg && <p className="cuenta-ok" role="status">{msg}</p>}
    </div>
  )
}

// Botón para mandar al super-admin los errores que la app se tragó en esta
// sesión (lib/registro.js). Solo aparece si hay algo que contar: si la sesión
// fue limpia, este bloque no existe y nadie se preocupa sin motivo.
function EnviarDiagnostico({ user, perfil }) {
  const [errores, setErrores] = useState(() => leerErrores())
  const [nota, setNota] = useState('')
  const [estado, setEstado] = useState('') // '' | 'enviando' | 'ok' | mensaje de error

  if (errores.length === 0) return null

  const enviar = async () => {
    setEstado('enviando')
    try {
      const { enviarDiagnostico } = await import('../lib/firebase/reportes.js')
      await enviarDiagnostico({
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        email: user.email || '',
        academiaId: perfil?.academiaId || null,
        grupoId: perfil?.grupoId || null,
        diagnostico: diagnostico(),
        nota,
      })
      limpiarRegistro()
      setErrores([])
      setEstado('ok')
    } catch (err) {
      setEstado(err.message || 'No se pudo enviar el diagnóstico.')
    }
  }

  if (estado === 'ok') {
    return <p className="cuenta-ok" role="status">Diagnóstico enviado. Gracias: con esto podemos ver qué falló.</p>
  }

  return (
    <div className="cuenta-diagnostico">
      <p>
        <strong>Detectamos {errores.length} problema(s) técnico(s)</strong> durante esta sesión.
        La app siguió funcionando, pero puedes enviarnos el detalle para que lo revisemos.
      </p>
      <input
        type="text"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        placeholder="¿Qué estabas haciendo? (opcional)"
        aria-label="Qué estabas haciendo cuando falló"
      />
      <button className="btn btn--suave" onClick={enviar} disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando…' : 'Enviar diagnóstico'}
      </button>
      {estado && estado !== 'enviando' && estado !== 'ok' && (
        <p className="cuenta-error" role="alert">{estado}</p>
      )}
    </div>
  )
}
