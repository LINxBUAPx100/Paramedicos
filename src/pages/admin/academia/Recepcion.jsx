import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import StaffShell from '../../../components/staff/StaffShell.jsx'

// ============================================================
//  Academia · RECEPCIÓN — el mismo mostrador, desde la consola
// ------------------------------------------------------------
//  Paridad del super-admin (trabajo Z): «el super admin debe poder hacer TODO
//  lo que hacen los demás usuarios». Desde el 21-09-2026 eso ya no significa
//  «el mismo formulario de alta», significa **la misma pantalla entera**: se
//  monta el mismo `StaffShell` que ven recepción y la dirección, sobre la
//  academia que se esté mirando en la consola.
//
//  Lo que había antes era solo el alta, y con ella el super-admin no podía
//  buscar a nadie, ni cobrar una mensualidad, ni entregar material, ni atender
//  un pedido de la tienda de esa academia.
//
//  Ya NO se leen aquí los grupos: los lee el propio armazón con el `academiaId`
//  que recibe, que es lo que hace que esta página sea seis líneas y no cien.
//
//  Las reglas ya lo permitían: `esSuper()` está en el `allow` de invitaciones,
//  pagos, órdenes y del contador de matrículas. Lo que faltaba era dónde
//  pulsarlo, que es el hueco que `tests/paridadSuperAdmin.test.mjs` vigila.
// ============================================================
export default function AcademiaRecepcion() {
  const { academiaId, academiaNombre, miUid } = useAcademiaAdmin()

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Recepción</h1>
        <p>
          El mostrador de <strong>{academiaNombre || academiaId}</strong>, completo y sobre esta
          academia: buscar, registrar entrada, cobrar, dar de alta, entregar material y atender la
          tienda. La matrícula sale de la serie del grupo de <strong>esta</strong> academia.
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
