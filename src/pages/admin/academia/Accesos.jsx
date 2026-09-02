import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.jsx'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import SolicitudesInternas from '../../../components/panel/SolicitudesInternas.jsx'
import SolicitudesDeAcceso from '../../../components/panel/SolicitudesDeAcceso.jsx'

// ============================================================
//  Academia · ACCESOS, desde la consola del super-admin
// ------------------------------------------------------------
//  Esta pantalla existía SOLO en el panel del director (`/panel/accesos`), y el
//  super-admin no entra ahí: opera cada academia desde `/admin/academia/:id`.
//  El resultado era que quien manda en la plataforma no podía responder una
//  solicitud de acceso sin pedirle a un director que lo hiciera por él.
//
//  Las reglas nunca fueron el problema: `esSuper()` puede todo lo que puede un
//  director. Lo que faltaba era la pantalla, y es la misma —los dos componentes
//  se reutilizan tal cual, con los datos de la academia que se está operando—.
//
//  REGLA que esto hace cumplir: **el super-admin puede hacer todo lo que hace un
//  director.** Una acción de academia que solo viva en el panel del director es
//  un hueco, no un diseño.
// ============================================================
export default function AcademiaAccesos() {
  const { academiaId, academiaNombre } = useAcademiaAdmin()
  const { user } = useAuth()
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
        <h1>Accesos</h1>
        <p>
          Quién pide entrar a <strong>{academiaNombre}</strong> y quién pide avanzar. Para repartir
          acceso —códigos, invitaciones y pruebas— ve a{' '}
          <Link to={`/admin/academia/${academiaId}/invitaciones`}>Invitaciones</Link>.
        </p>
      </header>

      <SolicitudesInternas
        solicitudes={datos.solicitudes}
        errorCarga={datos.errorSolicitudes}
        // El super-admin gestiona siempre: no está limitado a un grupo, como sí
        // puede estarlo un profesor dentro del panel de su academia.
        gestion
        miUid={user?.uid || null}
        soloGrupo={null}
        nombreGrupo=""
        onCambio={datos.recargar}
      />

      <SolicitudesDeAcceso
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={user?.uid || null}
      />
    </div>
  )
}
