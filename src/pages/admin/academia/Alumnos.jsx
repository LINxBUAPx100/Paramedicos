import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import { useIndiceAcademia } from '../../../context/ContenidoContext.jsx'
import { pasaFiltroGrupo } from '../../../lib/panelModelo.js'
import AvanceAlumnos from '../../../components/panel/AvanceAlumnos.jsx'
import GestionMiembros from '../../../components/panel/GestionMiembros.jsx'
import PermisosEditoriales from '../../../components/PermisosEditoriales.jsx'

// Academia · ALUMNOS Y STAFF: el avance de cada alumno, el alta y baja de
// miembros y los permisos de los profesores. El filtro por grupo vive aquí,
// que es donde se usa.
export default function AcademiaAlumnos() {
  const { puedeVerCodigos } = useAuth()
  const { academiaId, miUid } = useAcademiaAdmin()
  const { modulos } = useIndiceAcademia(academiaId)
  const datos = useDatosAcademia(academiaId)
  const [grupoFiltro, setGrupoFiltro] = useState('') // '' = todos; 'sin' = sin grupo

  if (datos.cargando && !datos.hayDatos) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando academia…</span>
      </div>
    )
  }
  if (datos.error) return <p className="cuenta-error" role="alert">{datos.error}</p>

  const nombreGrupo = (id) => datos.grupos.find((g) => g.id === id)?.nombre || id
  const alumnos = datos.miembros.filter(
    (m) => m.rol === 'alumno' && pasaFiltroGrupo(m, grupoFiltro)
  )

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Alumnos y staff</h1>
        <p>El avance de cada alumno, el alta y baja de miembros, y los permisos de tus profesores.</p>
      </header>

      {datos.grupos.length > 0 && (
        <label className="panel-selector panel-selector--grupo">
          Grupo
          <select value={grupoFiltro} onChange={(e) => setGrupoFiltro(e.target.value)}>
            <option value="">Todos los grupos</option>
            {datos.grupos.map((g) => (
              <option key={g.id} value={g.id}>{g.nombre} ({g.id})</option>
            ))}
            <option value="sin">Sin grupo</option>
          </select>
        </label>
      )}

      <AvanceAlumnos
        alumnos={alumnos}
        grupos={datos.grupos}
        modulos={modulos}
        porAlumno={datos.porAlumno}
        intentos={datos.intentos}
        grupoFiltro={grupoFiltro}
        nombreGrupo={nombreGrupo}
        academiaId={academiaId}
        puedeVerCodigos={puedeVerCodigos}
        onCambio={datos.recargar}
      />

      <GestionMiembros
        miembros={datos.miembros}
        grupos={datos.grupos}
        gestion="superadmin"
        miUid={miUid}
        onCambio={datos.recargar}
      />

      <PermisosEditoriales
        academiaId={academiaId}
        instructores={datos.miembros.filter((m) => m.rol === 'instructor')}
        onCambio={datos.recargar}
      />
    </div>
  )
}
