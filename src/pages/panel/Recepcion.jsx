import { Navigate } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import StaffShell from '../../components/staff/StaffShell.jsx'

// ============================================================
//  Panel · RECEPCIÓN — el mostrador ENTERO, no solo el alta
// ------------------------------------------------------------
//  HASTA EL 21-09-2026 AQUÍ SOLO HABÍA EL FORMULARIO DE ALTA, y eso hacía que
//  el director tuviera media recepción: podía dar de alta y cobrar el primer
//  pago, pero no buscar a nadie, ni registrarle la entrada, ni cobrarle una
//  mensualidad, ni entregarle material, ni atender un pedido de la tienda. Para
//  todo eso tenía que ir a `/recepcion`, que es una ruta que no está en su menú.
//
//  Se pidió que la vista sea **100 % igual** para dirección y super-admin, así
//  que aquí se monta el MISMO `StaffShell` que usa el personal de mostrador.
//  No es una copia: es el mismo componente, con el mismo contexto y los mismos
//  paneles. Montar una segunda recepción «para el director» sería mantener dos
//  pantallas que se separan a la primera corrección.
//
//  LA ÚNICA DIFERENCIA, y es la que se pidió: dirección y super-admin pueden
//  CORREGIR EL CONCEPTO de un pago ya registrado. Recepción no. El importe no
//  lo toca nadie (ver PanelCaja y la regla de /pagos).
// ============================================================
export default function PanelRecepcion() {
  const { academiaId, academiaNombre, miUid, gestion } = usePanel()

  if (gestion !== 'director') return <Navigate to="/panel" replace />

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Recepción</h1>
        <p>
          El mostrador completo: buscar a alguien, registrarle la entrada, cobrarle, darlo de
          alta, entregarle material y atender los pedidos de la tienda. Es la misma pantalla que
          usa tu personal de recepción, con una cosa más: aquí puedes corregir el concepto de un
          pago ya registrado.
        </p>
      </header>

      <StaffShell
        academiaId={academiaId}
        academia={{ id: academiaId, nombre: academiaNombre }}
        miUid={miUid}
        puedeCorregirPagos
      />
    </div>
  )
}
