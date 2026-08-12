import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceAcademia } from '../context/ContenidoContext.jsx'
import { pasaFiltroGrupo } from '../lib/panelModelo.js'
import Icon from './Icon.jsx'
import PermisosEditoriales from './PermisosEditoriales.jsx'
import { useDatosAcademia } from './panel/datosAcademia.js'
import Estadisticas from './panel/Estadisticas.jsx'
import AvanceAlumnos from './panel/AvanceAlumnos.jsx'
import SolicitudesInternas from './panel/SolicitudesInternas.jsx'
import SolicitudesDeAcceso from './panel/SolicitudesDeAcceso.jsx'
import GruposAcademia from './panel/GruposAcademia.jsx'
import GestionMiembros from './panel/GestionMiembros.jsx'
import CodigosPrueba from './panel/CodigosPrueba.jsx'
import VisibilidadGrupos from './panel/VisibilidadGrupos.jsx'

// ============================================================
//  Dashboard de UNA academia visto por el SUPER-ADMIN
// ------------------------------------------------------------
//  Eran 1271 líneas que servían a la vez al super-admin, al director y al
//  profesor. El director y el profesor tienen ahora su propia consola con una
//  sección por asunto (`components/panel/PanelShell.jsx`, Bloque O); aquí queda
//  la vista de UNA academia ajena, que sí quiere todo a la vista de una pasada
//  —es una inspección, no el trabajo del día— compuesta con los MISMOS
//  componentes de sección: nada duplicado.
// ============================================================

export default function PanelAcademia({ academiaId, academiaNombre = '', miUid = null }) {
  const { puedeVerCodigos } = useAuth()
  // Fases de LA ACADEMIA gestionada (su copia si está migrada; bundle si no):
  // el avance por fase debe alinearse con el contenido que ven SUS alumnos.
  const { fases } = useIndiceAcademia(academiaId)
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

  const { miembros, intentos, grupos, solicitudes, porAlumno, recargar } = datos
  const nombreGrupo = (id) => grupos.find((g) => g.id === id)?.nombre || id
  const alumnos = miembros.filter((m) => m.rol === 'alumno' && pasaFiltroGrupo(m, grupoFiltro))
  const staff = miembros.filter((m) => m.rol !== 'alumno')

  return (
    <>
      {grupos.length > 0 && (
        <label className="panel-selector panel-selector--grupo">
          Grupo
          <select value={grupoFiltro} onChange={(e) => setGrupoFiltro(e.target.value)}>
            <option value="">Todos los grupos</option>
            {grupos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}{puedeVerCodigos ? ` (${g.id})` : ''}
              </option>
            ))}
            <option value="sin">Sin grupo</option>
          </select>
        </label>
      )}

      <Estadisticas
        alumnos={alumnos}
        staff={staff}
        intentos={intentos}
        porAlumno={porAlumno}
        fases={fases}
      />

      <SolicitudesInternas
        solicitudes={solicitudes}
        errorCarga={datos.errorSolicitudes}
        gestion="superadmin"
        miUid={miUid}
        soloGrupo={null}
        nombreGrupo={nombreGrupo}
        onCambio={recargar}
      />

      <SolicitudesDeAcceso academiaId={academiaId} academiaNombre={academiaNombre} miUid={miUid} />

      <AvanceAlumnos
        alumnos={alumnos}
        grupos={grupos}
        fases={fases}
        porAlumno={porAlumno}
        intentos={intentos}
        grupoFiltro={grupoFiltro}
        nombreGrupo={nombreGrupo}
        academiaId={academiaId}
        puedeVerCodigos={puedeVerCodigos}
        onCambio={recargar}
      />

      <GruposAcademia
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={grupos}
        miembros={miembros}
        miUid={miUid}
        onCambio={recargar}
      />

      <section className="panel-visibilidad">
        <h2><Icon name="ojo" size={20} /> Qué contenido ve cada grupo</h2>
        <p className="panel-gestion-sub">
          Lo oculto desaparece de las listas de esos alumnos y sale bloqueado en el Atlas.
        </p>
        <VisibilidadGrupos academiaId={academiaId} grupos={grupos} />
      </section>

      <GestionMiembros
        miembros={miembros}
        grupos={grupos}
        gestion="superadmin"
        miUid={miUid}
        onCambio={recargar}
      />

      <PermisosEditoriales
        academiaId={academiaId}
        instructores={miembros.filter((m) => m.rol === 'instructor')}
        onCambio={recargar}
      />

      <CodigosPrueba
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={miUid}
        grupos={grupos}
      />
    </>
  )
}
