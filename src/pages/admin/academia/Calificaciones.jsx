import { useState } from 'react'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import { pasaFiltroGrupo } from '../../../lib/panelModelo.js'
import { gruposDelPrograma } from '../../../lib/programasModelo.js'
import { LibroDeCalificaciones } from '../../panel/Calificaciones.jsx'

// ============================================================
//  Academia · CALIFICACIONES, desde la consola del super-admin
// ------------------------------------------------------------
//  El libro de calificaciones existía SOLO en el panel del director. El
//  super-admin no entra ahí —opera cada academia desde /admin/academia/:id— así
//  que no podía ver una nota ni corregirla, aunque las reglas siempre se lo
//  hayan permitido.
//
//  Es el mismo libro, no una copia: `LibroDeCalificaciones` recibe sus datos por
//  props y cada pantalla se los da desde donde los tenga. Duplicarlo habría
//  garantizado que las dos versiones divergieran a la primera corrección.
//
//  VA DENTRO DEL PROGRAMA, no al nivel de la academia, y eso no es un detalle:
//  un grupo cursa UN plan de estudios, así que sus calificaciones son de ese
//  plan. Enseñarlas todas juntas era exactamente lo que hacía que el panel
//  mostrara siempre lo de paramédicos.
// ============================================================
export default function AcademiaCalificaciones() {
  const { academiaId, cursoId, academiaNombre } = useAcademiaAdmin()
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

  const grupos = gruposDelPrograma(datos.grupos, cursoId)
  const nombreGrupo = (id) => datos.grupos.find((g) => g.id === id)?.nombre || id
  const alumnos = datos.miembros.filter(
    (m) => m.rol === 'alumno' && pasaFiltroGrupo(m, grupoFiltro)
  )

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Calificaciones</h1>
        <p>
          El libro de <strong>{academiaNombre}</strong> en este programa. Son las evaluaciones del
          maestro —un examen presencial, una práctica—, no los intentos que el alumno repite en la app.
        </p>
      </header>

      {grupos.length > 0 && (
        <label className="panel-selector panel-selector--grupo">
          Grupo
          <select value={grupoFiltro} onChange={(e) => setGrupoFiltro(e.target.value)}>
            <option value="">Todos los grupos</option>
            {grupos.map((g) => (
              <option key={g.id} value={g.id}>{g.nombre} ({g.id})</option>
            ))}
            <option value="sin">Sin grupo</option>
          </select>
        </label>
      )}

      <LibroDeCalificaciones
        academiaId={academiaId}
        alumnos={alumnos}
        grupos={grupos}
        grupoFiltro={grupoFiltro}
        nombreGrupo={nombreGrupo}
        // El super-admin gestiona: puede crear evaluaciones y borrarlas, igual
        // que el director de la academia.
        gestion="director"
      />
    </div>
  )
}
