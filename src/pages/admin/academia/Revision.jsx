import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import ColaDictamenes from '../../../components/ColaDictamenes.jsx'

// Academia · REVISIÓN DOCENTE: lo que sus profesores han firmado sobre el
// contenido. La cola global de la plataforma está en /admin/contenido.
export default function AcademiaRevision() {
  const { academiaId, cursoId } = useAcademiaAdmin()

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Revisión docente</h1>
        <p>
          Lo que los profesores de esta academia han firmado sobre cada tema. Una validación no
          asciende el tema por sí sola: se resuelve aquí y el cambio pasa por el editor.
        </p>
      </header>

      <ColaDictamenes academiaId={academiaId} desplegada />
    </div>
  )
}
