import { Link } from 'react-router-dom'
import Icon from '../../../components/Icon.jsx'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import VisibilidadGrupos from '../../../components/panel/VisibilidadGrupos.jsx'
import { gruposDelPrograma } from '../../../lib/programasModelo.js'

// Academia · CONTENIDO: qué ve cada grupo, y desde dónde se edita su copia.
export default function AcademiaContenido() {
  const { academiaId, cursoId, academiaNombre } = useAcademiaAdmin()
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
        grupos={gruposDelPrograma(datos.grupos, cursoId)}
        cursoId={cursoId}
      />

      {/* ENTRAR AL EDITOR DE ESTA ACADEMIA. Era una frase suelta al pie y se
          leía como una nota, no como la puerta que es: el super-admin acababa
          entrando con la cuenta del director porque no encontraba por dónde.
          La ruta `/editor/:academiaId` ya existía y ya era suya; lo que faltaba
          era ofrecerla donde se busca. */}
      <div className="editor-acciones">
        <Link to={`/editor/${academiaId}`} className="btn btn--pildora btn--carbon">
          <Icon name="herramientas" size={16} /> Editar el temario de esta academia
        </Link>
      </div>

      <p className="panel-nota">
        Ahí se crean, editan, duplican y borran los cursos de <strong>{academiaNombre}</strong>.
        Las plantillas globales y la replicación son de plataforma: están en{' '}
        <Link to="/admin/contenido">Contenido</Link>.
      </p>
    </div>
  )
}
