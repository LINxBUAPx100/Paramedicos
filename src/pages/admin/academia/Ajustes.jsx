import { Link } from 'react-router-dom'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import PersonalizacionAcademia from '../../../components/PersonalizacionAcademia.jsx'

// Academia · AJUSTES: identidad y presentación. Lo delicado —cambiar el código,
// suspender, dar de baja— sigue en su ficha de /admin/academias: son
// operaciones de plataforma, no del día a día de la academia.
export default function AcademiaAjustes() {
  const { academia, refrescar } = useAcademiaAdmin()

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Ajustes de la academia</h1>
        <p>Nombre visible, logo, lema, color y la página de inicio que ven sus miembros.</p>
      </header>

      <PersonalizacionAcademia academia={academia} onGuardado={refrescar} />

      <p className="panel-nota">
        Cambiar el código, suspenderla o darla de baja se hace desde{' '}
        <Link to="/admin/academias">Academias</Link>: son operaciones de plataforma.
      </p>
    </div>
  )
}
