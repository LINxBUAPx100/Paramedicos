import { Link } from 'react-router-dom'
import { usePanel, FiltroGrupo } from '../../components/panel/PanelShell.jsx'
import Estadisticas from '../../components/panel/Estadisticas.jsx'
import { ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo } from '../../lib/capacidades.js'
import Icon from '../../components/Icon.jsx'

// ============================================================
//  Panel del director · RESUMEN (Bloque O)
// ------------------------------------------------------------
//  Lo que exige atención hoy arriba, y el retrato de la academia debajo. Antes
//  las estadísticas eran lo tercero que aparecía tras dos secciones de gestión,
//  así que la primera pantalla del director no decía cómo iba su academia.
// ============================================================

export default function PanelResumen() {
  const {
    academia, academiaId, alumnos, staff, intentos, porAlumno, modulos, solicitudes,
    gestion, soloGrupo,
  } = usePanel()

  const pendientes = solicitudes.filter((s) => s.estado === 'pendiente')
  const visibles = pendientes.filter((s) =>
    s.tipo === 'codigos' ? Boolean(gestion) : soloGrupo ? s.grupoId === soloGrupo : true
  )
  const plan = planEfectivo(academia)

  return (
    <div className="cs-resumen">
      <header className="cs-cabecera">
        <h1>{academia?.nombre || academiaId}</h1>
        <p>
          Código <strong>{academiaId}</strong>
          {academia?.tipo ? <> · {ETIQUETA_TIPO[academia.tipo] || academia.tipo}</> : null}
          {plan ? <> · plan <strong>{ETIQUETA_PLAN[plan] || plan}</strong></> : null}
        </p>
      </header>

      {visibles.length > 0 && (
        <ul className="cs-alertas">
          <li className="cs-alerta cs-alerta--aviso">
            <span className="cs-alerta-ico"><Icon name="check" size={18} /></span>
            <div>
              <strong>{visibles.length} solicitud(es) pendiente(s)</strong>
              <p>Alumnos que piden el siguiente módulo o profesores que piden ver los códigos.</p>
            </div>
            <Link to="/panel/accesos" className="btn btn--sm btn--suave">Atenderlas</Link>
          </li>
        </ul>
      )}

      <FiltroGrupo />

      <Estadisticas
        alumnos={alumnos}
        staff={staff}
        intentos={intentos}
        porAlumno={porAlumno}
        modulos={modulos}
      />
    </div>
  )
}
