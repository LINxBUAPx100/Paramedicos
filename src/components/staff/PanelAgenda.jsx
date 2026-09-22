import { useFicha } from '../../context/FichaStaffContext.jsx'
import { fechaCorta } from '../../lib/staff/cajaModelo.js'
import { resumenDeHorario } from '../../lib/horarioGrupos.js'

// ============================================================
//  Lo que el profesor ha creado — SOLO LECTURA
// ------------------------------------------------------------
//  Recepción responde a «¿qué le toca hoy?» y «¿qué tenía que entregar?». Para
//  eso hace falta ver el trabajo asignado y el horario del grupo, y no hace
//  falta nada más.
//
//  NO SE ENSEÑAN CALIFICACIONES. La nota de un alumno es suya y de su profesor;
//  en un mostrador, con gente detrás, no es el sitio. Si alguien pregunta por
//  su nota, se le remite a su profesor: eso es una decisión, no una carencia.
//
//  Tampoco hay aquí ningún botón que escriba: el componente no importa nada que
//  pueda modificar `evaluaciones`.
// ============================================================
export default function PanelAgenda() {
  const { agenda, grupo } = useFicha()
  const horario = horarioLegible(grupo)

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-agenda-t">
      <h3 id="staff-agenda-t">Clase y trabajo asignado</h3>

      <p className="staff-ayuda">
        Consulta. Lo crea y lo califica el profesor desde su panel; aquí no se modifica nada.
      </p>

      {horario && (
        <p className="staff-horario">
          <b>Horario del grupo:</b> {horario}
        </p>
      )}

      <h4>Próximo</h4>
      {agenda.proximas.length === 0
        ? <p className="staff-ayuda">Sin entregas pendientes.</p>
        : (
          <ul className="staff-lista-agenda">
            {agenda.proximas.map((e) => (
              <li key={e.id}>
                <b>{e.titulo}</b>
                <span>{e._entrega ? `Entrega: ${fechaCorta(e._entrega)}` : 'Sin fecha de entrega'}</span>
                {e.descripcion && <span className="staff-ayuda">{e.descripcion}</span>}
              </li>
            ))}
          </ul>
        )}

      <h4>Ya pasado</h4>
      {agenda.pasadas.length === 0
        ? <p className="staff-ayuda">El profesor todavía no ha creado trabajo para este grupo.</p>
        : (
          <ul className="staff-lista-agenda staff-lista-agenda--apagada">
            {agenda.pasadas.slice(0, 10).map((e) => (
              <li key={e.id}>
                <b>{e.titulo}</b>
                <span>{e._entrega ? fechaCorta(e._entrega) : '—'}</span>
              </li>
            ))}
          </ul>
        )}
    </section>
  )
}

/**
 * El horario del grupo en una frase.
 *
 * Se delega en `resumenDeHorario`, el mismo módulo que usa el panel del
 * director. Escribirlo otra vez aquí daría dos formas distintas de decir el
 * mismo horario, y quien lo dicta por teléfono acabaría leyendo una u otra
 * según la pantalla en la que estuviera.
 */
function horarioLegible(grupo) {
  if (!grupo) return ''
  const texto = resumenDeHorario(grupo)
  return texto === 'Sin horario configurado' ? '' : texto
}
