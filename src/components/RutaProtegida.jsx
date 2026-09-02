import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { motivoSinPrograma } from '../lib/programasModelo.js'
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
  'prueba-expirada': {
    icono: 'reloj',
    titulo: 'Tu periodo de prueba terminó',
    texto:
      'El código temporal que usaste ya venció. Pide un código nuevo, o únete a tu academia con su código oficial para seguir estudiando.',
    cta: { to: '/cuenta', label: 'Ingresar otro código' },
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
  const { puedeAcceder, accesoCargando, motivoBloqueo, rol, grupo, esSuperadmin, encender } = useAuth()

  // Enciende Firebase sin esperar a la sonda. Detrás de esta puerta está todo
  // lo que depende de quién eres, así que aquí se paga la descarga siempre:
  // es el único sitio donde suponer «no hay sesión» sería inaceptable, y quien
  // llega hasta aquí o tiene sesión o va a que se le pida.
  useEffect(() => { encender() }, [encender])

  if (accesoCargando) {
    return (
      <div className="ruta-cargando" role="status" aria-live="polite">
        <span className="ruta-spinner" aria-hidden="true" />
        <span>Verificando tu acceso…</span>
      </div>
    )
  }

  // Segunda puerta: el contenido está aislado por PROGRAMA y el programa lo
  // define el grupo. Un alumno sin grupo entró por código de academia o de
  // prueba y todavía no está en ningún plan de estudios: no se le enseña un
  // temario genérico, se le manda a canjear el código de su grupo.
  // El staff y el super-admin nunca pasan por aquí (gestionan la academia).
  if (puedeAcceder) {
    const bloqueo = motivoSinPrograma({ rol, esSuperadmin, grupo })
    if (!bloqueo) return children
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>{bloqueo.titulo}</h1>
        <p>{bloqueo.texto}</p>
        <Link to={bloqueo.destino} className="btn btn--pildora btn--carbon">
          {bloqueo.codigo === 'sin-grupo' ? 'Ingresar mi código de grupo' : 'Volver al inicio'}
        </Link>
        {bloqueo.destino !== '/' && (
          <Link to="/" className="link-discreto"><Icon name="chevronIzq" size={15} /> Volver al inicio</Link>
        )}
      </div>
    )
  }

  const info = MENSAJES[motivoBloqueo] || MENSAJES['no-sesion']
  return (
    <div className="acceso-restringido" role="alert">
      <span className="acceso-ico"><Icon name={info.icono} size={30} /></span>
      <h1>{info.titulo}</h1>
      <p>{info.texto}</p>
      {info.cta && (
        <Link to={info.cta.to} className="btn btn--pildora btn--carbon">
          {info.cta.label}
        </Link>
      )}
      <Link to="/" className="link-discreto"><Icon name="chevronIzq" size={15} /> Volver al inicio</Link>
    </div>
  )
}
