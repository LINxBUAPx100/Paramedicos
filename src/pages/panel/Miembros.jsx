import { useAuth } from '../../context/AuthContext.jsx'
import { usePanel, FiltroGrupo } from '../../components/panel/PanelShell.jsx'
import AvanceAlumnos from '../../components/panel/AvanceAlumnos.jsx'
import GestionMiembros from '../../components/panel/GestionMiembros.jsx'
import PermisosEditoriales from '../../components/PermisosEditoriales.jsx'

// ============================================================
//  Panel del director · MIEMBROS (Bloque O)
// ------------------------------------------------------------
//  Avance de los alumnos, gestión de roles y grupos, y los permisos
//  editoriales: todo lo que se hace SOBRE una persona, en un solo sitio.
//  El profesor ve el avance en solo lectura.
// ============================================================

export default function PanelMiembros() {
  const { capacidades, puedeVerCodigos } = useAuth()
  const {
    academiaId, alumnos, miembros, miembrosInactivos, grupos, modulos, porAlumno, intentos,
    grupoFiltro, nombreGrupo, gestion, miUid, recargar,
  } = usePanel()

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Miembros</h1>
        <p>
          {gestion
            ? 'Avance de tus alumnos, roles, grupos y permisos de edición.'
            : 'Avance de los alumnos de tu academia.'}
        </p>
      </header>

      <FiltroGrupo />

      <AvanceAlumnos
        alumnos={alumnos}
        grupos={grupos}
        modulos={modulos}
        porAlumno={porAlumno}
        intentos={intentos}
        grupoFiltro={grupoFiltro}
        nombreGrupo={nombreGrupo}
        academiaId={academiaId}
        puedeVerCodigos={puedeVerCodigos}
        onCambio={recargar}
      />

      {gestion && (
        <GestionMiembros
          miembros={miembros}
          inactivos={miembrosInactivos}
          grupos={grupos}
          gestion={gestion}
          miUid={miUid}
          academiaId={academiaId}
          onCambio={recargar}
        />
      )}

      {/* Permisos editoriales (Fase 6): el director PRO concede o retira a sus
          profesores el permiso de editar contenido. Un director BASE no ve esta
          sección porque su plan no la incluye. */}
      {gestion === 'director' && capacidades?.permisosEditoriales && (
        <PermisosEditoriales
          academiaId={academiaId}
          instructores={miembros.filter((m) => m.rol === 'instructor')}
          onCambio={recargar}
        />
      )}
    </div>
  )
}
