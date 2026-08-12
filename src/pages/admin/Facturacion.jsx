import { useAdmin } from '../../components/admin/AdminShell.jsx'
import { FacturacionAcademias, AnuncioGlobal } from '../../components/AdminPlataforma.jsx'
import CodigosPrueba from '../../components/panel/CodigosPrueba.jsx'

// Consola del super-admin · FACTURACIÓN Y PLATAFORMA.
// Antes vivían a media altura del dashboard general, entre la lista de
// academias y la de usuarios: para revisar vencimientos había que pasar por
// encima de todo lo demás.
export default function AdminFacturacion() {
  const { academias, refrescar, miUid } = useAdmin()
  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Facturación y plataforma</h1>
        <p>Plan, renovación y estado de pago de cada academia. Y el anuncio global.</p>
      </header>
      <FacturacionAcademias academias={academias} onCambio={refrescar} />
      <AnuncioGlobal />
      {/* Códigos de prueba a nivel plataforma: el super-admin puede emitirlos
          para cualquier academia, o sueltos para enseñar el producto. */}
      <CodigosPrueba academiaId={null} miUid={miUid} academias={academias} />
    </div>
  )
}
