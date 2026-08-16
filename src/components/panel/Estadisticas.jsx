import { useMemo } from 'react'
import { APROBADO, resumenAcademia } from '../../lib/panelModelo.js'

// Retrato de la academia (o del grupo filtrado). Toda la aritmética está en
// `lib/panelModelo.js`: aquí solo se pinta lo que ese módulo decide.
export default function Estadisticas({ alumnos, staff, intentos, porAlumno, modulos }) {
  const stats = useMemo(
    () => resumenAcademia({ alumnos, staff, intentos, porAlumno, modulos }),
    [alumnos, staff, intentos, porAlumno, modulos]
  )

  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : '—'

  return (
    <section className="panel-estadisticas">
      <div className="pe-kpis">
        <div className="pe-kpi">
          <b>{stats.promedio === null ? '—' : `${stats.promedio}%`}</b>
          <span>Promedio general</span>
          <small>de las mejores calificaciones</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.aprobacion === null ? '—' : `${stats.aprobacion}%`}</b>
          <span>Aprobación</span>
          <small>módulos presentados con ≥{APROBADO}%</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.activos}<small className="pe-kpi-de">/{stats.totalAlumnos}</small></b>
          <span>Alumnos activos</span>
          <small>con al menos un examen</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.semana}</b>
          <span>Intentos esta semana</span>
          <small>últimos 7 días</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.totalStaff}</b>
          <span>Staff</span>
          <small>directores y profesores</small>
        </div>
      </div>

      <div className="pe-columnas">
        <div className="pe-card">
          <h3>Dominio por módulo</h3>
          <p className="pe-card-sub">Promedio de la mejor calificación entre quienes presentaron.</p>
          <div className="pe-barras">
            {stats.porModulo.map(({ modulo, prom, presentaron }) => (
              <div className="pe-barra-fila" key={modulo.id} style={{ '--modulo-color': modulo.color }}>
                <span className="pe-barra-label" title={modulo.titulo}>F{modulo.numero}</span>
                <div className="pe-barra-pista">
                  <div
                    className={`pe-barra ${prom !== null && prom < APROBADO ? 'baja' : ''}`}
                    style={{ width: prom === null ? 0 : `${Math.max(prom, 4)}%` }}
                  />
                </div>
                <span className="pe-barra-valor">
                  {prom === null ? <em>sin datos</em> : <>{prom}% <small>· {presentaron} alumno{presentaron !== 1 ? 's' : ''}</small></>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pe-lado">
          <div className="pe-card">
            <h3>Actividad reciente</h3>
            {stats.recientes.length === 0 ? (
              <p className="panel-vacio">Todavía no hay exámenes presentados.</p>
            ) : (
              <ul className="pe-actividad">
                {stats.recientes.map((it) => (
                  <li key={it.id}>
                    <span className="pe-act-nombre">{it.nombre || '—'}</span>
                    <span className="pe-act-modulo">F{it.moduloNumero}</span>
                    <b className={it.porcentaje >= APROBADO ? 'ok' : 'mal'}>{it.porcentaje}%</b>
                    <small>{fechaTxt(it.fecha)}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pe-card pe-card--riesgo">
            <h3>Alumnos en riesgo</h3>
            {stats.enRiesgo.length === 0 ? (
              <p className="panel-vacio">Nadie por debajo del {APROBADO}% de promedio.</p>
            ) : (
              <ul className="pe-riesgo">
                {stats.enRiesgo.map((al) => (
                  <li key={al.id}>
                    <span>{al.nombre || al.email}</span>
                    <b>{al.prom}%</b>
                    <small>{al.modulos} modulo{al.modulos !== 1 ? 's' : ''}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
