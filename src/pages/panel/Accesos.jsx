import { usePanel } from '../../components/panel/PanelShell.jsx'
import SolicitudesInternas from '../../components/panel/SolicitudesInternas.jsx'
import SolicitudesDeAcceso from '../../components/panel/SolicitudesDeAcceso.jsx'
import { Link } from 'react-router-dom'

// ============================================================
//  Panel del director · ACCESOS (Bloque O)
// ------------------------------------------------------------
//  Lo que se RESPONDE, no lo que se emite: las solicitudes de dentro
//  (siguiente módulo, ver los códigos) y las de fuera vía directorio.
//
//  Los códigos —de academia, de grupo, de prueba— y las invitaciones por rol
//  se fueron al centro de invitaciones (/panel/invitaciones). Aquí convivían
//  dos cosas distintas: pedir acceso y repartirlo, y eso obligaba a recorrer
//  media pantalla para saber cuál de las cinco puertas tocaba usar.
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
        <p>
        Quién pide entrar a tu academia y quién pide avanzar. Para repartir acceso —códigos,
        invitaciones y pruebas— ve a <Link to="/panel/invitaciones">Invitaciones</Link>.
      </p>
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


    </div>
  )
}
