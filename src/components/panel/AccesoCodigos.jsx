import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import Icon from '../Icon.jsx'
import CompartirCodigo from '../CompartirCodigo.jsx'

// Acceso de un PROFESOR a los códigos: los ve solo si su director se lo aprobó.
// Mientras no lo tenga, esta sección es el sitio donde lo pide.
export default function AccesoCodigos({ academiaId, academiaNombre = '', grupos }) {
  const { user, perfil, puedeVerCodigos } = useAuth()
  const [estado, setEstado] = useState('cargando') // cargando | puede | pendiente | enviando | enviada | error

  useEffect(() => {
    if (puedeVerCodigos || !user) return undefined
    let activo = true
    ;(async () => {
      try {
        const { misSolicitudes } = await import('../../lib/firebase/solicitudes.js')
        const lista = await misSolicitudes(user.uid)
        const ya = lista.some((s) => s.tipo === 'codigos' && s.estado === 'pendiente')
        if (activo) setEstado(ya ? 'pendiente' : 'puede')
      } catch {
        if (activo) setEstado('puede')
      }
    })()
    return () => { activo = false }
  }, [puedeVerCodigos, user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  const copiar = (id) => {
    try { navigator.clipboard.writeText(id) } catch { /* sin permisos */ }
  }

  // Acceso aprobado: lista de códigos en solo lectura.
  //
  // Aquí SOLO están los códigos de academia y de grupo. Las invitaciones por
  // rol no: reparten el rol con el que entra la persona —incluido el de
  // director— y eso lo decide únicamente quien dirige la academia.
  if (puedeVerCodigos) {
    return (
      <section className="panel-codigos-acceso">
        <h2><Icon name="candado" size={20} /> Códigos de tu academia</h2>
        <p className="panel-gestion-sub">
          Tu director te aprobó el acceso. Comparte el enlace de tu grupo (tu alumno se une con el
          código ya pre-llenado). Compártelo solo con quien deba unirse.
        </p>
        <ul className="pc-lista">
          <li className="pc-item activo">
            <strong className="pg-nombre">Academia</strong>
            <code className="pc-codigo">{academiaId}</code>
            <span className="pc-acciones">
              <button className="pc-copiar" onClick={() => copiar(academiaId)}>Copiar</button>
              <CompartirCodigo codigo={academiaId} nombre={academiaNombre || academiaId} tipo="academia" />
            </span>
          </li>
          {grupos.map((g) => (
            <li key={g.id} className={`pc-item ${g.estado === 'activo' ? 'activo' : 'inactivo'}`}>
              <strong className="pg-nombre">{g.nombre}</strong>
              <code className="pc-codigo">{g.id}</code>
              <span className="pc-acciones">
                <button className="pc-copiar" onClick={() => copiar(g.id)}>Copiar</button>
                <CompartirCodigo codigo={g.id} nombre={academiaNombre || academiaId} contexto={g.nombre} tipo="grupo" />
              </span>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const solicitar = async () => {
    setEstado('enviando')
    try {
      const { crearSolicitud } = await import('../../lib/firebase/solicitudes.js')
      await crearSolicitud({
        tipo: 'codigos',
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        grupoId: perfil?.grupoId || null,
      })
      setEstado('enviada')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section className="panel-codigos-acceso">
      <h2><Icon name="candado" size={20} /> Códigos de academia y grupos</h2>
      <p className="panel-gestion-sub">
        Los códigos solo los ve el director. Si necesitas compartirlos (p. ej. para inscribir
        alumnos), solicita el acceso y un director deberá aprobarlo.
      </p>
      {estado === 'pendiente' || estado === 'enviada' ? (
        <p className="cuenta-ok" role="status">
          Solicitud {estado === 'enviada' ? 'enviada' : 'pendiente'}: espera la aprobación de tu director.
        </p>
      ) : (
        <button
          className="btn btn--suave"
          onClick={solicitar}
          disabled={estado === 'enviando' || estado === 'cargando'}
        >
          {estado === 'enviando' ? 'Enviando…' : 'Solicitar ver los códigos'}
        </button>
      )}
      {estado === 'error' && (
        <p className="cuenta-error" role="alert">No se pudo enviar la solicitud (revisa tu conexión).</p>
      )}
    </section>
  )
}
