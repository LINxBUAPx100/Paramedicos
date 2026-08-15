import { usePanel } from '../../components/panel/PanelShell.jsx'
import SolicitudesInternas from '../../components/panel/SolicitudesInternas.jsx'
import SolicitudesDeAcceso from '../../components/panel/SolicitudesDeAcceso.jsx'
import CodigosPrueba from '../../components/panel/CodigosPrueba.jsx'
import InvitacionesRol from '../../components/panel/InvitacionesRol.jsx'
import AccesoCodigos from '../../components/panel/AccesoCodigos.jsx'

// ============================================================
//  Panel del director · ACCESOS (Bloque O)
// ------------------------------------------------------------
//  Todo lo que decide QUIÉN ENTRA y a qué: solicitudes de dentro (siguiente
//  módulo, ver los códigos), solicitudes de fuera vía directorio (Bloque K) y
//  códigos de prueba. Estaban repartidas por tres zonas del panel viejo.
// ============================================================

export default function PanelAccesos() {
  const {
    academiaId, academiaNombre, solicitudes, errorSolicitudes, grupos,
    gestion, miUid, soloGrupo, nombreGrupo, recargar,
  } = usePanel()

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Accesos</h1>
        <p>Quién entra a tu academia, quién pide avanzar y qué códigos están vivos.</p>
      </header>

      <SolicitudesInternas
        solicitudes={solicitudes}
        errorCarga={errorSolicitudes}
        gestion={gestion}
        miUid={miUid}
        soloGrupo={soloGrupo}
        nombreGrupo={nombreGrupo}
        onCambio={recargar}
      />

      {/* Solicitudes de gente de FUERA + ficha del directorio. Solo las gestiona
          el director: aceptar a alguien es meterlo en la academia. */}
      {gestion && (
        <SolicitudesDeAcceso
          academiaId={academiaId}
          academiaNombre={academiaNombre}
          miUid={miUid}
        />
      )}

      {/* Invitaciones POR ROL: el único sitio donde se decide con qué rol entra
          alguien sin tener que promoverlo después en Miembros. Va antes de los
          códigos de prueba porque es el alta normal; la prueba es la excepción. */}
      {gestion && (
        <InvitacionesRol
          academiaId={academiaId}
          academiaNombre={academiaNombre}
          miUid={miUid}
          grupos={grupos}
        />
      )}

      {gestion ? (
        <CodigosPrueba
          academiaId={academiaId}
          academiaNombre={academiaNombre}
          miUid={miUid}
          grupos={grupos}
        />
      ) : (
        // Profesor: los códigos requieren aprobación del director.
        <AccesoCodigos academiaId={academiaId} academiaNombre={academiaNombre} grupos={grupos} />
      )}
    </div>
  )
}
