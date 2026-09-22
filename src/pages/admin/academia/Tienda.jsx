import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import EditorCatalogo from '../../../components/tienda/EditorCatalogo.jsx'

// ============================================================
//  Academia · TIENDA — el mismo catálogo, desde la consola
// ------------------------------------------------------------
//  Paridad del super-admin: «el super admin debe poder hacer TODO lo que hacen
//  los demás usuarios». El director publica desde /panel/tienda; aquí se hace
//  lo mismo sobre la academia que se esté mirando, con el MISMO editor.
//
//  Las reglas ya lo permitían —`esSuper()` está en el `allow` de `articulos`—;
//  lo que faltaba era dónde pulsarlo, que es el hueco que
//  `tests/paridadSuperAdmin.test.mjs` vigila.
//
//  Va FUERA del nivel de programa (`deLaAcademia`) a propósito: el catálogo es
//  de la academia entera. Un uniforme no pertenece al plan de paramédicos ni
//  al de enfermería, y partirlo por programa obligaría a publicarlo dos veces.
// ============================================================
export default function AcademiaTienda() {
  const { academiaId, academiaNombre, miUid } = useAcademiaAdmin()

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Tienda</h1>
        <p>
          Catálogo de <strong>{academiaNombre || academiaId}</strong>: uniformes, libros e
          insumos. Lo publicado lo ven sus alumnos, y su recepción puede apartarlo, cobrarlo y
          entregarlo descontando inventario.
        </p>
      </header>

      <EditorCatalogo
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={miUid}
      />
    </div>
  )
}
