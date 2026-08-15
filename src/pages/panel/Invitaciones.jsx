import { Navigate } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import InvitacionesRol from '../../components/panel/InvitacionesRol.jsx'

// ============================================================
//  Panel del director · INVITACIONES POR ROL
// ------------------------------------------------------------
//  Vivía al final de «Accesos», debajo de las solicitudes internas, las del
//  directorio y los códigos de prueba. Dar de alta a un profesor o a un
//  codirector no es un trámite escondido al fondo de una pantalla larga: es de
//  las cosas que más hace un director, y ahora tiene su propia entrada.
//
//  SOLO director y super-admin. `seccionesPanel` ni siquiera pinta el enlace
//  para un profesor (panelModelo.js), pero un profesor podría teclear la ruta:
//  de ahí el redirect de abajo. Y por debajo de las dos, la barrera que de
//  verdad manda son las reglas — un profesor no puede crear ni listar
//  invitaciones aunque llegue hasta aquí.
// ============================================================

export default function PanelInvitaciones() {
  const { academiaId, academiaNombre, grupos, miUid, gestion } = usePanel()

  if (!gestion) return <Navigate to="/panel" replace />

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Invitaciones</h1>
        <p>
          Da de alta a alguien con el rol que le toca: alumno, profesor o director. Cada invitación
          es un enlace con caducidad que puedes desactivar cuando quieras.
        </p>
      </header>

      <InvitacionesRol
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={miUid}
        grupos={grupos}
      />
    </div>
  )
}
