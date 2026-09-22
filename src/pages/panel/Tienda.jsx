import { Navigate } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import EditorCatalogo from '../../components/tienda/EditorCatalogo.jsx'

// ============================================================
//  Panel · TIENDA — el catálogo que ven los alumnos
// ------------------------------------------------------------
//  El editor vive en `components/tienda/EditorCatalogo.jsx` porque lo monta
//  también la consola del super-admin. Aquí solo está la puerta: quién entra.
//
//  El DIRECTOR es quien puede, y no un profesor con permisos editoriales: esto
//  no es contenido, es el inventario y los precios de la academia. Las reglas
//  imponen lo mismo (`esAdminDe` en `articulos`); aquí se vuelve a mirar porque
//  la ruta se puede teclear.
// ============================================================
export default function PanelTienda() {
  const { academiaId, academiaNombre, miUid, gestion } = usePanel()

  if (gestion !== 'director') return <Navigate to="/panel" replace />

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Tienda</h1>
        <p>
          Uniformes, libros e insumos que vende tu academia. Lo que publiques aquí lo verán tus
          alumnos en su tienda, y recepción podrá apartarlo, cobrarlo y entregarlo descontando
          el inventario.
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
