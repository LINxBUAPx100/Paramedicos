// ============================================================
//  Centro de invitaciones — lógica PURA
// ------------------------------------------------------------
//  La plataforma reparte acceso por CINCO puertas distintas y cada una vivía en
//  una pantalla: el código de la academia, el de cada grupo, la invitación por
//  rol, el código de prueba y la solicitud del directorio. Nadie sabía cuál
//  usar porque ninguna cubría los dos ejes que de verdad importan:
//
//      A DÓNDE entra   → academia · grupo (y con el grupo, su programa)
//      COMO QUÉ entra  → alumno · profesor · director, permanente o de prueba
//
//  Este módulo pone en un solo sitio las reglas de ese reparto:
//
//    · GENERACIONES: los grupos empiezan en fechas distintas, así que se
//      etiquetan por generación (número + año) y se agrupan por ella. Es un
//      dato del grupo, no una colección aparte: se filtra y se ordena, y no
//      hay nada que mantener sincronizado.
//
//    · QUIÉN PUEDE EMITIR QUÉ: el director y el super-admin, todo. El profesor
//      con el permiso de códigos aprobado, SOLO invitaciones de alumno. No es
//      una concesión nueva: ese profesor ya puede repartir el código de su
//      grupo, que mete a quien sea como alumno para siempre y sin tope de usos.
//      Una invitación hace lo mismo pero caduca y se agota, así que es la
//      versión más estrecha de lo que ya tenía. Lo que sigue sin poder es
//      repartir roles: la invitación de profesor o de director, jamás.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// ---------- generaciones ----------

export const ANIO_MIN = 2000
export const ANIO_MAX = 2100

/**
 * Normaliza la generación de un grupo. Devuelve `null` si no hay una válida:
 * un grupo sin generación es perfectamente legítimo (los que ya existen no la
 * tienen) y debe seguir funcionando.
 */
export function normalizarGeneracion(valor) {
  if (!valor || typeof valor !== 'object') return null
  const numero = Number(valor.numero)
  const anio = Number(valor.anio)
  if (!Number.isInteger(numero) || numero < 1 || numero > 99) return null
  if (!Number.isInteger(anio) || anio < ANIO_MIN || anio > ANIO_MAX) return null
  return { numero, anio }
}

export function etiquetaGeneracion(generacion) {
  const g = normalizarGeneracion(generacion)
  return g ? `Generación ${g.numero} · ${g.anio}` : 'Sin generación'
}

// Clave ordenable y estable: sirve de id de agrupación y de valor de un filtro.
export function claveGeneracion(generacion) {
  const g = normalizarGeneracion(generacion)
  return g ? `${g.anio}-${String(g.numero).padStart(2, '0')}` : 'sin'
}

/**
 * Agrupa los grupos de una academia por generación, de la más reciente a la
 * más antigua. Los que no la tienen van al final, juntos: son los de antes de
 * que existiera el campo y hay que poder verlos para etiquetarlos.
 */
export function agruparPorGeneracion(grupos) {
  const bloques = new Map()
  for (const grupo of grupos || []) {
    const g = normalizarGeneracion(grupo?.generacion)
    const clave = claveGeneracion(g)
    if (!bloques.has(clave)) {
      bloques.set(clave, { clave, generacion: g, etiqueta: etiquetaGeneracion(g), grupos: [] })
    }
    bloques.get(clave).grupos.push(grupo)
  }
  return [...bloques.values()].sort((a, b) => {
    if (!a.generacion) return 1 // «Sin generación», al final
    if (!b.generacion) return -1
    return b.generacion.anio - a.generacion.anio || b.generacion.numero - a.generacion.numero
  })
}

// ---------- quién puede emitir qué ----------

export const ROLES_INVITABLES = ['alumno', 'instructor', 'admin_escuela']

/**
 * Roles que ESTA persona puede repartir en una invitación.
 *
 * @param {{rol?:string, esSuperadmin?:boolean, puedeVerCodigos?:boolean}} quien
 * @returns {string[]} vacío = no puede emitir invitaciones
 */
export function rolesQuePuedeInvitar(quien = {}) {
  if (quien.esSuperadmin || quien.rol === 'admin_escuela') return [...ROLES_INVITABLES]
  // El profesor SOLO con el permiso de códigos aprobado por su director, y solo
  // alumnos: repartir un rol es otra cosa: la invitación de director incluida.
  if (quien.rol === 'instructor' && quien.puedeVerCodigos) return ['alumno']
  return []
}

export function puedeInvitarRol(quien, rol) {
  return rolesQuePuedeInvitar(quien).includes(rol)
}

// Los códigos de prueba siguen siendo del director: dan acceso sin inscribir a
// nadie, y esa es una decisión de la academia, no del aula.
export function puedeCrearCodigoPrueba(quien = {}) {
  return Boolean(quien.esSuperadmin || quien.rol === 'admin_escuela')
}

/**
 * Qué invitaciones puede LISTAR. El director ve todas las de su academia; el
 * profesor, solo las que él emitió —la lista completa incluye las de director,
 * y poder copiar ese enlace equivale a poder crearlo—. `null` = no puede.
 *
 * Devuelve el filtro que la consulta debe llevar, que es lo mismo que las
 * reglas van a exigir para dejar leer.
 */
export function filtroDeInvitaciones(quien = {}, academiaId) {
  if (quien.esSuperadmin || quien.rol === 'admin_escuela') return { academiaId }
  if (quien.rol === 'instructor' && quien.puedeVerCodigos) {
    return { academiaId, creadoPor: quien.uid || null }
  }
  return null
}
