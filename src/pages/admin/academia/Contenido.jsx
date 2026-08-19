import { Link } from 'react-router-dom'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import VisibilidadGrupos from '../../../components/panel/VisibilidadGrupos.jsx'

// Academia · CONTENIDO: qué ve cada grupo, y desde dónde se edita su copia.
export default function AcademiaContenido() {
  const { academiaId, academiaNombre } = useAcademiaAdmin()
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
        <h1>Contenido</h1>
        <p>Qué módulos y temas ve cada grupo de esta academia. Lo oculto sale bloqueado en Logros.</p>
      </header>

      <VisibilidadGrupos
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={datos.grupos}
      />

      <p className="panel-nota">
        Para editar el temario de esta academia entra a su{' '}
        <Link to={`/editor/${academiaId}`}>editor de contenido</Link>. Las plantillas globales y la
        replicación son de plataforma: están en <Link to="/admin/contenido">Contenido</Link>.
      </p>
    </div>
  )
}
