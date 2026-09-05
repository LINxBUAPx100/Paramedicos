import { Navigate } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import AltaDeRecepcion from '../../components/panel/AltaDeRecepcion.jsx'

// ============================================================
//  Panel · RECEPCIÓN — el alta de mostrador (trabajo O4a)
// ------------------------------------------------------------
//  El formulario vive en `components/panel/AltaDeRecepcion.jsx` porque lo monta
//  también la consola del super-admin. Aquí solo está la puerta: quién entra.
//
//  El director es quien puede. Un alta reserva una matrícula —el contador de la
//  academia— y emite una invitación personal, y ninguna de las dos cosas es de
//  un profesor, ni siquiera con el acceso a códigos aprobado: ese permiso le
//  abre los códigos de academia y de grupo, que no gastan numeración. En el
//  menú lo decide `seccionesPanel`; aquí se vuelve a mirar porque la ruta se
//  puede teclear.
// ============================================================
export default function PanelRecepcion() {
  const { academiaId, academiaNombre, grupos, miUid, gestion, nombreGrupo } = usePanel()

  if (gestion !== 'director') return <Navigate to="/panel" replace />

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Recepción</h1>
        <p>
          El alta de mostrador, completa: ficha, grupo, matrícula y primer pago. Al terminar
          tendrás su número de matrícula y el enlace personal con el que entra a la plataforma.
        </p>
      </header>

      <AltaDeRecepcion
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={grupos}
        miUid={miUid}
        nombreGrupo={nombreGrupo}
      />
    </div>
  )
}
