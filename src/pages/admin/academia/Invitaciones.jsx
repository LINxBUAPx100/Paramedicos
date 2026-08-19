import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import AccesoCodigos from '../../../components/panel/AccesoCodigos.jsx'
import InvitacionesRol from '../../../components/panel/InvitacionesRol.jsx'
import CodigosPrueba from '../../../components/panel/CodigosPrueba.jsx'

// Academia · INVITACIONES: todo lo que reparte acceso, en el mismo orden que en
// el panel del director (códigos permanentes → invitaciones con rol → prueba).
export default function AcademiaInvitaciones() {
  const { academiaId, academiaNombre, miUid } = useAcademiaAdmin()
  const datos = useDatosAcademia(academiaId)

  if (datos.cargando && !datos.hayDatos) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando academia…</span>
      </div>
    )
  }
  if (datos.error) return <p className="cuenta-error" role="alert">{datos.error}</p>

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Invitaciones</h1>
        <p>Códigos permanentes, invitaciones con rol y accesos de prueba de esta academia.</p>
      </header>

      <AccesoCodigos academiaId={academiaId} academiaNombre={academiaNombre} grupos={datos.grupos} />

      <InvitacionesRol
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={miUid}
        grupos={datos.grupos}
      />

      <CodigosPrueba
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={miUid}
        grupos={datos.grupos}
      />
    </div>
  )
}
