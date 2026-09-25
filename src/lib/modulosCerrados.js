// ============================================================
//  Módulos CERRADOS para quien pide el contenido — lógica PURA
// ------------------------------------------------------------
//  Espejo en el cliente de `moduloAbiertoParaMi()` en firestore.rules (R03,
//  auditoría de riesgos del 19-09-2026). Desde el 25-09-2026 las reglas
//  niegan a un alumno las lecciones y los agregados de un módulo que su grupo
//  le oculta. Si el cliente siguiera pidiéndolos, cada pantalla recibiría un
//  `permission-denied` y el resolutor caería al estado de error entero.
//
//  Aquí se decide, con los mismos datos que la regla, qué módulos NO se piden:
//    · oculto en el grupo (`grupos/{id}.modulosOcultos`)
//    · y no desbloqueado a esta persona (`usuarios/{uid}.modulosDesbloqueados`).
//
//  El staff y el super-admin no tienen módulos cerrados: su regla es otra
//  (`esStaffDe`) y leen el curso entero. Quien no tiene grupo tampoco: sin
//  grupo las reglas no le sirven nada, y eso lo resuelve otra puerta.
//
//  Esto NO es la protección: la protección es la regla. Esto solo evita
//  preguntar lo que ya se sabe que se va a negar.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

const ROLES_STAFF = ['instructor', 'admin_escuela', 'superadmin']

/**
 * ¿Lee esta persona por la rama del ALUMNO de las reglas? Todo el que no es
 * staff. Importa aunque no tenga nada oculto: la regla exige `moduloId`, y una
 * consulta solo se permite si las reglas pueden demostrarla segura para todo
 * lo que podría devolver. Sin filtrar por módulo no pueden, y la niegan entera.
 */
export function leePorRamaDeAlumno(acceso) {
  const { rol, esSuperadmin } = acceso || {}
  return !esSuperadmin && !ROLES_STAFF.includes(rol)
}

/**
 * @param {Object} acceso { rol, esSuperadmin, grupo, desbloqueados }
 * @returns {Set<string>} ids de los módulos que no se deben pedir.
 */
export function modulosCerrados(acceso) {
  const { grupo, desbloqueados } = acceso || {}
  if (!leePorRamaDeAlumno(acceso) || !grupo) return new Set()
  const ocultos = Array.isArray(grupo.modulosOcultos) ? grupo.modulosOcultos : []
  const abiertos = new Set(Array.isArray(desbloqueados) ? desbloqueados : [])
  return new Set(ocultos.filter((id) => typeof id === 'string' && !abiertos.has(id)))
}

/**
 * Firma estable del cierre, para la clave de caché: si el profesor abre un
 * módulo, la clave cambia y el contenido se vuelve a resolver. Sin esto, el
 * alumno seguiría con el módulo cerrado hasta recargar la página.
 */
export function firmaDeCierre(acceso) {
  return [...modulosCerrados(acceso)].sort().join(',')
}

/** Tope de valores de un filtro `in` de Firestore. */
export const MAX_IN = 30

/** Parte una lista en trozos que caben en un `in`. */
export function trozosParaIn(lista, tope = MAX_IN) {
  const out = []
  for (let i = 0; i < (lista || []).length; i += tope) out.push(lista.slice(i, i + tope))
  return out
}
