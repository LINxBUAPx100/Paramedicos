// ============================================================
//  Los grupos de una persona — lógica PURA
// ------------------------------------------------------------
//  EL PROBLEMA QUE RESUELVE
//
//  `usuarios/{uid}.grupoId` es UN campo, así que en el sistema una maestra con
//  tres grupos tenía uno. El panel lo dejaba escrito sin rodeos:
//
//      const soloGrupo = !esDirector ? perfil?.grupoId || null : null
//
//  Un profesor quedaba clavado a ese grupo y no podía ni mirar los demás.
//
//  LA FORMA DE ARREGLARLO SIN ROMPER NADA
//
//  Se AÑADE `grupoIds` (lista) y solo para el STAFF. Los alumnos siguen con su
//  `grupoId` de siempre, y eso no es pereza: el grupo de un alumno lleva el
//  `programaId`, o sea el plan de estudios que decide qué temario puede leer.
//  Convertirlo en lista tocaría el aislamiento por programa —la barrera entre
//  Enfermería y TUM— y esta fase no tiene por qué acercarse a eso.
//
//  MIGRACIÓN: ninguna. Sin `grupoIds`, se usa `[grupoId]`. Un profesor de hoy
//  sigue funcionando exactamente igual hasta que su director le asigne más.
//
//  `grupoIds` NO ES UNA CREDENCIAL, es un filtro. Quien manda sigue siendo
//  `esStaffDe(academiaId)` en cada colección: un id colado en la lista no abre
//  ninguna puerta, solo aparece en un desplegable que luego no lee nada.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// Cuántos grupos puede llevar una persona. No es una regla pedagógica: es un
// tope para que un documento de perfil no crezca sin control y para que la
// regla de Firestore pueda validar la forma sin recorrer una lista infinita.
export const MAX_GRUPOS = 40

const ROLES_STAFF = ['instructor', 'admin_escuela', 'superadmin']

export function esStaff(rol) {
  return ROLES_STAFF.includes(rol)
}

// Limpia una lista de ids: strings no vacíos, sin repetidos, en orden estable.
export function normalizarGrupoIds(valor) {
  if (!Array.isArray(valor)) return []
  const vistos = new Set()
  const salida = []
  for (const id of valor) {
    if (typeof id !== 'string') continue
    const limpio = id.trim()
    if (!limpio || vistos.has(limpio)) continue
    vistos.add(limpio)
    salida.push(limpio)
  }
  return salida
}

/**
 * Los grupos a los que esta persona pertenece o que dirige.
 *
 * - ALUMNO: siempre su grupo único. Aunque el documento trajera `grupoIds`, se
 *   ignora: un alumno con dos planes de estudio a la vez no es un caso que el
 *   producto contemple, y aceptarlo aquí lo colaría por la puerta de atrás.
 * - STAFF: su lista. Si no la tiene todavía, su grupo de siempre.
 *
 * @returns {string[]} ids, sin repetidos y en orden estable.
 */
export function gruposDeUsuario(perfil, rol = null) {
  const papel = rol || perfil?.rol || 'alumno'
  const unico = typeof perfil?.grupoId === 'string' && perfil.grupoId.trim()
    ? perfil.grupoId.trim()
    : null

  if (!esStaff(papel)) return unico ? [unico] : []

  const lista = normalizarGrupoIds(perfil?.grupoIds)
  if (lista.length) return lista
  return unico ? [unico] : []
}

/**
 * Con qué grupo está trabajando ahora.
 *
 * `elegido` es la preferencia guardada en el navegador. NO se acepta a ciegas:
 * si no está entre los grupos de la persona, se devuelve el primero. Escribir
 * otro id a mano en el almacenamiento no da acceso a nada —mismo criterio que
 * el curso servido—, pero devolverlo dejaría al panel pidiendo datos que las
 * reglas van a rechazar, y eso se ve como una pantalla rota.
 *
 * @returns {string|null} null cuando la persona no tiene ningún grupo.
 */
export function grupoActivoDe({ perfil, rol = null, elegido = null } = {}) {
  const grupos = gruposDeUsuario(perfil, rol)
  if (!grupos.length) return null
  if (elegido && grupos.includes(elegido)) return elegido
  return grupos[0]
}

/**
 * ¿Tiene sentido enseñarle un selector de grupo?
 *
 * Con uno solo no: un desplegable de una sola opción es ruido. El director no
 * lo usa porque su filtro del panel ya abarca TODOS los grupos de la academia,
 * que es otra cosa.
 */
export function puedeElegirGrupo(rol, grupos) {
  return rol === 'instructor' && (grupos?.length || 0) > 1
}

/**
 * Los grupos que el PANEL puede ofrecer a quien mira.
 *
 * - Director y super-admin: todos los de la academia.
 * - Profesor: solo los suyos, y en el orden en que la academia los lista (no en
 *   el orden en que se los asignaron, que no significa nada para él).
 * - Alumno: ninguno; el panel no es suyo.
 *
 * Se filtra contra los grupos REALES de la academia a propósito: un id que
 * quedó en el perfil después de borrar el grupo desaparece del selector en vez
 * de ofrecer una opción que no lleva a ninguna parte.
 */
export function gruposDelPanel({ rol, perfil, gruposDeAcademia = [] } = {}) {
  if (rol === 'admin_escuela' || rol === 'superadmin') return gruposDeAcademia
  if (rol !== 'instructor') return []
  const mios = new Set(gruposDeUsuario(perfil, rol))
  return gruposDeAcademia.filter((g) => mios.has(g.id))
}

/**
 * Con qué grupo filtra el panel quien está mirando.
 *
 * Devuelve una de tres cosas, y la tercera es la que importa:
 *   · un id      → ese grupo;
 *   · `''`       → todos (solo el director);
 *   · `null`     → NINGUNO.
 *
 * `null` existe para el profesor al que todavía no le han asignado grupos. Con
 * `''` se le enseñaría la academia entera justo debajo del aviso de que no
 * tiene ninguno, y la pantalla se contradiría. No es un agujero de seguridad
 * —las reglas dejan a cualquier profesor leer a los miembros de SU academia—,
 * pero sí una pantalla que dice una cosa y hace otra.
 */
export function filtroDeGrupoDelPanel({ rol, misGrupos = [], grupoActivoId = null, filtroDirector = '' } = {}) {
  if (rol === 'admin_escuela' || rol === 'superadmin') return filtroDirector
  if (rol !== 'instructor') return null
  const ids = misGrupos.map((g) => (typeof g === 'string' ? g : g?.id)).filter(Boolean)
  if (!ids.length) return null
  if (grupoActivoId && ids.includes(grupoActivoId)) return grupoActivoId
  return ids[0]
}

/**
 * Valida lo que el director va a guardar ANTES de intentarlo.
 *
 * La regla de Firestore impone lo mismo en el servidor; esto existe para no
 * ofrecer lo que va a rechazarse y para poder decir POR QUÉ, que una regla no
 * puede.
 *
 * @returns {string} mensaje de error, o '' si es válido.
 */
export function validarGrupoIds(ids, gruposDeAcademia = []) {
  if (!Array.isArray(ids)) return 'La lista de grupos no es válida.'
  const limpios = normalizarGrupoIds(ids)
  if (limpios.length > MAX_GRUPOS) {
    return `Un profesor no puede llevar más de ${MAX_GRUPOS} grupos.`
  }
  const validos = new Set((gruposDeAcademia || []).map((g) => g.id))
  const ajenos = limpios.filter((id) => !validos.has(id))
  if (ajenos.length) {
    return `Estos grupos no son de tu academia: ${ajenos.join(', ')}.`
  }
  return ''
}

/**
 * Los campos que hay que escribir para asignar grupos a un profesor.
 *
 * Se escriben LOS DOS: la lista nueva y el `grupoId` de siempre, con el primero
 * de la lista. El campo viejo sigue leyéndose en sitios que esta fase no toca
 * (invitaciones, códigos, la propia regla de Firestore), y dejar los dos en
 * desacuerdo es la clase de incoherencia que aparece meses después como «a este
 * profesor le salen los alumnos de otro grupo».
 *
 * Quitarle todos los grupos deja `grupoId` en null, no en el último que tuvo.
 */
export function camposDeAsignacion(ids) {
  const limpios = normalizarGrupoIds(ids)
  return { grupoIds: limpios, grupoId: limpios[0] || null }
}
