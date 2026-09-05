import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import AltaDeRecepcion from '../../../components/panel/AltaDeRecepcion.jsx'

// ============================================================
//  Academia · RECEPCIÓN — el mismo mostrador, desde la consola
// ------------------------------------------------------------
//  Paridad del super-admin (trabajo Z): «el super admin debe poder hacer TODO
//  lo que hacen los demás usuarios». El director da de alta desde
//  /panel/recepcion; aquí se hace lo mismo sobre la academia que se esté
//  mirando, con el MISMO formulario —montarlo dos veces sería mantener dos.
//
//  Las reglas ya lo permitían: `esSuper()` está en el `allow` de invitaciones,
//  pagos y del contador de matrículas. Lo que faltaba era dónde pulsarlo, que
//  es exactamente el hueco que `tests/paridadSuperAdmin.test.mjs` vigila.
// ============================================================
export default function AcademiaRecepcion() {
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

  const nombreGrupo = (id) => datos.grupos.find((g) => g.id === id)?.nombre || id

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Recepción</h1>
        <p>
          Alta de mostrador de esta academia: ficha, grupo, matrícula y primer pago. La matrícula
          sale del contador de <strong>esta</strong> academia, no de un contador de la plataforma.
        </p>
      </header>

      <AltaDeRecepcion
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={datos.grupos}
        miUid={miUid}
        nombreGrupo={nombreGrupo}
      />
    </div>
  )
}
