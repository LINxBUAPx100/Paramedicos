// ============================================================
//  Recepción · agenda del grupo — SOLO LECTURA
// ------------------------------------------------------------
//  Se pidió que recepción pueda consultar lo que el profesor ha creado para
//  ese alumno o su clase: qué se hizo y qué está planeado. Dos precisiones que
//  no son un tecnicismo:
//
//  1. **Es lectura y nada más.** No hay aquí ni un `set`, ni un `update`, ni un
//     `delete`. Recepción informa a quien pregunta en el mostrador; quien crea,
//     cambia o califica es el profesor, en su panel. Si un día hace falta que
//     recepción modifique algo, se añade con su propia regla y su propio
//     rastro, no ensanchando este archivo.
//
//  2. **No se leen calificaciones.** La nota de un alumno es suya y de su
//     profesor. Recepción ve QUÉ trabajo hay y CUÁNDO se entrega —que es lo que
//     se pregunta en un mostrador—, no cuánto sacó nadie. Es también lo que
//     dice la hoja impresa cuando se marca ese apartado.
//
//  SOBRE LOS «SIMULADORES». Se mencionaron junto a eventos y tareas. Hoy el
//  sistema no tiene una entidad «simulador» que el profesor CREE para un
//  alumno: lo que hay son el temario, los exámenes generados y las herramientas
//  de práctica (atlas y botiquín), que no se asignan. Lo que sí existe y sí se
//  crea por alumno o por grupo son las EVALUACIONES —examen presencial,
//  práctica, trabajo— y el HORARIO del grupo. Eso es lo que se enseña. El día
//  que exista un simulador asignable, entra por esta misma función.
// ============================================================
import { db } from '../init.js'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { normalizarEvaluacion } from '../../calificacionesModelo.js'

/**
 * Lo que el profesor ha creado para este alumno.
 *
 * Trae las de SU grupo y las de toda la academia (`grupoId` nulo = para todos),
 * porque en el mostrador se pregunta por las dos sin distinguirlas. Se ordena
 * en memoria para no necesitar un índice compuesto, igual que
 * `listarEvaluaciones`.
 *
 * @returns {{pasadas: Array, proximas: Array, todas: Array}}
 *   Partidas por la fecha de entrega, que es lo que se pregunta: «¿qué le toca
 *   ahora?» y «¿qué se perdió?».
 */
export async function agendaDelAlumno({ academiaId, grupoId, ahora = new Date(), limite = 100 }) {
  if (!academiaId) return { pasadas: [], proximas: [], todas: [] }

  const snap = await getDocs(query(
    collection(db, 'evaluaciones'),
    where('academiaId', '==', academiaId),
    limit(limite),
  ))

  const todas = snap.docs
    .map((d) => normalizarEvaluacion({ id: d.id, ...d.data() }))
    // Del grupo de esta persona, o de la academia entera.
    .filter((e) => !e.grupoId || !grupoId || e.grupoId === grupoId)
    .map((e) => ({ ...e, _entrega: fecha(e.fechaEntrega) || fecha(e.fecha) }))
    .sort((a, b) => (b._entrega?.getTime() || 0) - (a._entrega?.getTime() || 0))

  const ref = ahora instanceof Date ? ahora : new Date()
  return {
    todas,
    proximas: todas.filter((e) => e._entrega && e._entrega >= ref).reverse(),
    pasadas: todas.filter((e) => !e._entrega || e._entrega < ref),
  }
}

function fecha(valor) {
  if (!valor) return null
  if (valor instanceof Date) return Number.isNaN(valor.getTime()) ? null : valor
  if (typeof valor?.toDate === 'function') { try { return valor.toDate() } catch { return null } }
  if (typeof valor?.seconds === 'number') return new Date(valor.seconds * 1000)
  const d = new Date(valor)
  return Number.isNaN(d.getTime()) ? null : d
}
