import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from './Icon.jsx'

// Pantallas específicas según el motivo por el que se bloquea el contenido.
const MENSAJES = {
  'no-sesion': {
    icono: 'usuario',
    titulo: 'No has iniciado sesión',
    texto:
      'Este contenido es exclusivo para alumnos e instructores registrados. Inicia sesión con tu cuenta o crea una para continuar.',
    cta: { to: '/cuenta', label: 'Iniciar sesión' },
  },
  'sin-perfil': {
    icono: 'usuario',
    titulo: 'No encontramos tu perfil',
    texto:
      'Tu sesión está activa pero tu perfil no se pudo cargar. Cierra sesión y vuelve a entrar; si el problema sigue, contacta a tu academia.',
    cta: { to: '/cuenta', label: 'Ir a mi cuenta' },
  },
  'usuario-bloqueado': {
    icono: 'candado',
    titulo: 'Tu cuenta está suspendida',
    texto:
      'Tu acceso fue suspendido por el administrador. Contacta a tu academia para reactivarlo.',
    cta: { to: '/cuenta', label: 'Ver mi cuenta' },
  },
  'sin-academia': {
    icono: 'candado',
    titulo: 'Únete a tu academia',
    texto:
      'Para acceder al contenido necesitas unirte a tu academia con el código que te dieron al inscribirte.',
    cta: { to: '/cuenta', label: 'Ingresar mi código' },
  },
  'academia-inactiva': {
    icono: 'candado',
    titulo: 'Tu academia no está al corriente',
    texto:
      'El plan de tu academia está vencido o suspendido. Pide a tu academia ponerse al corriente con sus pagos para recuperar el acceso al contenido.',
    cta: { to: '/cuenta', label: 'Ver mi cuenta' },
  },
}

export default function RutaProtegida({ children }) {
  const { puedeAcceder, accesoCargando, motivoBloqueo } = useAuth()

  if (accesoCargando) {
    return (
      <div className="ruta-cargando" role="status" aria-live="polite">
        <span className="ruta-spinner" aria-hidden="true" />
        <span>Verificando tu acceso…</span>
      </div>
    )
  }

  if (puedeAcceder) return children

  const info = MENSAJES[motivoBloqueo] || MENSAJES['no-sesion']
  return (
    <div className="acceso-restringido" role="alert">
      <span className="acceso-ico"><Icon name={info.icono} size={30} /></span>
      <h1>{info.titulo}</h1>
      <p>{info.texto}</p>
      {info.cta && (
        <Link to={info.cta.to} className="btn-pildora btn-pildora--solido">
          {info.cta.label}
        </Link>
      )}
      <Link to="/" className="link-discreto">← Volver al inicio</Link>
    </div>
  )
}
