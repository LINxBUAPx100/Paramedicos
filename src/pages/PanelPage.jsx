import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PanelAcademia from '../components/PanelAcademia.jsx'
import PersonalizacionAcademia from '../components/PersonalizacionAcademia.jsx'
import Icon from '../components/Icon.jsx'

// Panel de la academia propia, según jerarquía:
//   - superadmin     → se va a su dashboard general (/admin).
//   - admin_escuela  → avance + gestión de miembros (director).
//   - instructor     → avance de los alumnos (solo lectura).
export default function PanelPage() {
  const { cargando, esStaff, esSuperadmin, academiaId, academia, rol, user, perfil, capacidades } = useAuth()

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }

  // El super-admin tiene su propio dashboard con todas las academias.
  if (esSuperadmin) return <Navigate to="/admin" replace />

  // Solo staff (instructor / admin de escuela).
  if (!esStaff) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Panel exclusivo del personal</h1>
        <p>Esta sección es solo para instructores y administradores de academia.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  if (!academiaId) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="alerta" size={30} /></span>
        <h1>Sin academia asignada</h1>
        <p>Tu cuenta es de personal pero no está ligada a ninguna academia. Pide al administrador que te asigne una.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  const esDirector = rol === 'admin_escuela'

  return (
    <div className="panel-page">
      <header className="panel-header">
        <div>
          <h1><Icon name="progreso" size={24} /> {esDirector ? 'Dashboard de tu academia' : 'Panel de avance'}</h1>
          <p>
            {esDirector
              ? `Avance y miembros de tu academia (${academiaId}).`
              : `Avance de los alumnos de ${academia?.nombre || 'tu academia'}.`}
          </p>
        </div>
        {/* Editor de contenido: capacidad del plan (Pro/Curso) para el director;
            un profesor entra solo con permisos editoriales explícitos. */}
        {((esDirector && capacidades.editorContenido) || perfil?.permisosEditor?.editarContenido) && (
          <Link to="/editor" className="btn-pildora">
            <Icon name="herramientas" size={16} /> Editor de contenido
          </Link>
        )}
      </header>
      <PanelAcademia
        academiaId={academiaId}
        academiaNombre={academia?.nombre || ''}
        gestion={esDirector ? 'director' : null}
        miUid={user?.uid}
        soloGrupo={!esDirector ? perfil?.grupoId || null : null}
      />

      {/* La personalización visual es una CAPACIDAD del plan (Pro/Curso);
          las reglas de Firestore la imponen también en el servidor. */}
      {esDirector && capacidades.personalizacionVisual && (
        <PersonalizacionAcademia academia={academia} />
      )}
    </div>
  )
}
