import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import GruposAcademia from '../../../components/panel/GruposAcademia.jsx'

// Academia · GRUPOS: crearlos, asignarles su plan de estudios y su generación.
export default function AcademiaGrupos() {
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

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Grupos</h1>
        <p>
          Cada grupo lleva su plan de estudios y su generación: eso decide qué contenido ven sus
          alumnos y cómo se agrupan en las listas y en las invitaciones.
        </p>
      </header>

      <GruposAcademia
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={datos.grupos}
        miembros={datos.miembros}
        miUid={miUid}
        onCambio={datos.recargar}
      />
    </div>
  )
}
