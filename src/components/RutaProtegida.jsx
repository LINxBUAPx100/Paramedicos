import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from './Icon.jsx'

// Mensajes según el motivo por el que se bloquea el acceso al contenido.
const MENSAJES = {
  'usuario-bloqueado': {
    titulo: 'Tu cuenta está inactiva',
    texto: 'Tu acceso fue suspendido. Contacta al administrador de tu academia.',
    cta: null,
  },
  'sin-academia': {
    titulo: 'Únete a tu academia',
    texto: 'Para acceder al contenido necesitas unirte a tu academia con el código que te dieron.',
    cta: { to: '/cuenta', label: 'Ir a mi cuenta' },
  },
  'academia-inactiva': {
    titulo: 'Tu academia no está activa',
    texto: 'El acceso de tu academia está suspendido o su plan venció. Contacta al administrador de tu academia.',
    cta: null,
  },
}

export default function RutaProtegida({ children }) {
  const { autenticado, puedeAcceder, accesoCargando, motivoBloqueo } = useAuth()
  const location = useLocation()

  if (accesoCargando) {
    return (
      <div className="ruta-cargando" role="status" aria-live="polite">
        <span className="ruta-spinner" aria-hidden="true" />
        <span>Cargando…</span>
      </div>
    )
  }

  // Sin sesión → al login, recordando a dónde quería ir.
  if (!autenticado) {
    return <Navigate to="/cuenta" state={{ desde: location.pathname }} replace />
  }

  if (puedeAcceder) return children

  const info = MENSAJES[motivoBloqueo] || MENSAJES['sin-academia']
  return (
    <div className="acceso-restringido" role="alert">
      <span className="acceso-ico"><Icon name="candado" size={30} /></span>
      <h1>{info.titulo}</h1>
      <p>{info.texto}</p>
      {info.cta && (
        <Link to={info.cta.to} className="btn-pildora btn-pildora--solido">
          {info.cta.label}
        </Link>
      )}
    </div>
  )
}
