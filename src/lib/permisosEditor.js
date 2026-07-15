// ============================================================
//  Matriz CENTRALIZADA de permisos editoriales del profesor (Fase 6)
// ------------------------------------------------------------
//  ÚNICA fuente de verdad de la granularidad editorial del INSTRUCTOR.
//  La misma matriz se refleja, sin dispersarse, en las cuatro capas:
//    1. interfaz React        (capacidadesEditor / tienePermisoEditor),
//    2. capa de acceso a datos (permisoAccionEditor / permisosRequeridosPorContenido),
//    3. firestore.rules       (helpers profesorPuedeEditar / camposTema…),
//    4. storage.rules         (administrarRecursos para subir/borrar).
//
//  Los permisos SOLO los concede/retira el director PRO (o el super-admin) a
//  los profesores de SU academia. Un profesor SIN permisos concedidos no edita
//  nada: no hay acceso por defecto.
//
//  Módulo PURO (sin Firebase, sin React): se prueba con `npm test`.
//
//  Doc: usuarios/{uid}.permisosEditor = {
//    editarContenido, crearTemas, editarActividades, editarExamenes,
//    publicarContenido, administrarRecursos, cursosPermitidos:[cursoId]
//  }
// ============================================================

// Los 6 permisos booleanos. `cursosPermitidos` (arreglo) se maneja aparte.
export const PERMISOS_EDITOR = [
  'editarContenido',
  'crearTemas',
  'editarActividades',
  'editarExamenes',
  'publicarContenido',
  'administrarRecursos',
]

export const ETIQUETA_PERMISO = {
  editarContenido: 'Editar contenido',
  crearTemas: 'Crear temas y estructura',
  editarActividades: 'Editar actividades',
  editarExamenes: 'Editar exámenes y quiz',
  publicarContenido: 'Publicar y archivar',
  administrarRecursos: 'Administrar recursos y archivos',
}

export const DESCRIPCION_PERMISO = {
  editarContenido: 'Abrir el editor y modificar textos, secciones y bloques de los cursos permitidos.',
  crearTemas: 'Crear fases, módulos y temas nuevos (y duplicar) dentro de los cursos permitidos.',
  editarActividades: 'Editar las actividades de repaso (ordenar, completar, preguntas).',
  editarExamenes: 'Editar el quiz del tema, que alimenta el examen de la fase.',
  publicarContenido: 'Publicar, despublicar y archivar contenido (lo que ven los alumnos).',
  administrarRecursos: 'Subir, reemplazar y quitar recursos y archivos descargables.',
}

// Campo de CONTENIDO del tema gobernado por cada permiso fino. Cambiar uno de
// estos campos exige el permiso correspondiente (además de editarContenido).
export const PERMISO_POR_CAMPO_TEMA = {
  quiz: 'editarExamenes',
  actividades: 'editarActividades',
  recursos: 'administrarRecursos',
}

// Permisos "todo apagado": profesor sin nada concedido (o revocación total).
export const PERMISOS_VACIO = Object.freeze({
  editarContenido: false,
  crearTemas: false,
  editarActividades: false,
  editarExamenes: false,
  publicarContenido: false,
  administrarRecursos: false,
  cursosPermitidos: [],
})

// ---------- normalización ----------

// Lleva un mapa arbitrario a la forma canónica: SOLO las claves conocidas,
// booleanos estrictos y cursosPermitidos como arreglo de strings sin duplicados.
// Un dato basura en Firestore nunca inventa permisos ni cursos.
export function normalizarPermisos(bruto) {
  const fuente = bruto && typeof bruto === 'object' ? bruto : {}
  const salida = {}
  for (const clave of PERMISOS_EDITOR) salida[clave] = fuente[clave] === true
  const cursos = Array.isArray(fuente.cursosPermitidos) ? fuente.cursosPermitidos : []
  salida.cursosPermitidos = [...new Set(cursos.filter((c) => typeof c === 'string' && c))]
  return salida
}

// ---------- validación (para la capa de datos y la UI) ----------

// Valida un mapa de permisos ANTES de escribirlo. `cursosDisponibles`
// (opcional): los cursoId reales de la academia; si se pasa, cursosPermitidos
// debe ser un subconjunto (no se concede acceso a un curso inexistente).
// Devuelve un mensaje de error, o null si es válido.
export function validarPermisos(bruto, cursosDisponibles = null) {
  if (bruto == null || typeof bruto !== 'object' || Array.isArray(bruto)) {
    return 'Permisos inválidos.'
  }
  const permitidas = new Set([...PERMISOS_EDITOR, 'cursosPermitidos'])
  for (const clave of Object.keys(bruto)) {
    if (!permitidas.has(clave)) return `Permiso desconocido: "${clave}".`
  }
  for (const clave of PERMISOS_EDITOR) {
    if (clave in bruto && typeof bruto[clave] !== 'boolean') {
      return `El permiso "${clave}" debe ser verdadero o falso.`
    }
  }
  const cursos = bruto.cursosPermitidos
  if (cursos !== undefined) {
    if (!Array.isArray(cursos) || cursos.some((c) => typeof c !== 'string')) {
      return 'La lista de cursos permitidos es inválida.'
    }
    if (cursosDisponibles) {
      const set = new Set(cursosDisponibles)
      const fuera = cursos.find((c) => !set.has(c))
      if (fuera) return `El curso "${fuera}" no pertenece a esta academia.`
    }
  }
  // Coherencia: conceder cualquier acción fina sin "editarContenido" no tiene
  // sentido (el editor ni se abre). Revocar todo (todo en falso) sí es válido.
  const norm = normalizarPermisos(bruto)
  const algunaAccion = norm.crearTemas || norm.editarActividades || norm.editarExamenes
    || norm.publicarContenido || norm.administrarRecursos
  if (algunaAccion && !norm.editarContenido) {
    return 'Para conceder cualquier permiso, primero habilita "Editar contenido".'
  }
  return null
}

// ---------- consultas puntuales ----------

export function tienePermisoEditor(perfil, permiso) {
  return normalizarPermisos(perfil?.permisosEditor)[permiso] === true
}

export function cursosPermitidosDe(perfil) {
  return normalizarPermisos(perfil?.permisosEditor).cursosPermitidos
}

// ---------- capacidades EFECTIVAS del editor por rol (para la UI) ----------

// Colapsa el rol en el conjunto de acciones que la interfaz debe ofrecer:
//  - superadmin / director (admin_escuela): TODO (la granularidad fina es
//    exclusiva del profesor; el plan del director ya se validó en permisoEdicion).
//  - instructor: exactamente sus permisosEditor.
//  - cualquier otro: nada.
export function capacidadesEditor({ esSuperadmin, rol, perfil } = {}) {
  const todo = {
    editarContenido: true, crearTemas: true, editarActividades: true,
    editarExamenes: true, publicarContenido: true, administrarRecursos: true,
  }
  if (esSuperadmin || rol === 'admin_escuela') return { ...todo }
  if (rol === 'instructor') {
    const p = normalizarPermisos(perfil?.permisosEditor)
    return {
      editarContenido: p.editarContenido,
      crearTemas: p.crearTemas,
      editarActividades: p.editarActividades,
      editarExamenes: p.editarExamenes,
      publicarContenido: p.publicarContenido,
      administrarRecursos: p.administrarRecursos,
    }
  }
  return {
    editarContenido: false, crearTemas: false, editarActividades: false,
    editarExamenes: false, publicarContenido: false, administrarRecursos: false,
  }
}

// ---------- permiso por ACCIÓN (para la capa de datos) ----------

// Permiso fino que exige una acción del editor (más allá de editarContenido).
// Devuelve null cuando la acción solo requiere el permiso base editarContenido
// (editar campos, mover, reordenar).
export function permisoDeAccion(accion) {
  const a = String(accion || '')
  if (a.startsWith('crear-') || a.startsWith('duplicar-')) return 'crearTemas'
  if (a.startsWith('publicar-') || a.startsWith('despublicar-')
    || a.startsWith('archivar-') || a.startsWith('restaurar-')) return 'publicarContenido'
  return null
}

// ¿Puede este usuario ejecutar esta acción del editor? Presupone que
// permisoEdicion ya autorizó el acceso general (rol/academia/plan/curso).
// Para el instructor, exige además el permiso fino de la acción.
export function permisoAccionEditor({ esSuperadmin, rol, perfil, accion } = {}) {
  if (esSuperadmin || rol !== 'instructor') return { permitido: true, motivo: null }
  const permiso = permisoDeAccion(accion)
  if (!permiso) return { permitido: true, motivo: null }
  if (!tienePermisoEditor(perfil, permiso)) {
    return {
      permitido: false,
      motivo: `No tienes el permiso "${ETIQUETA_PERMISO[permiso]}". Pídelo al director de tu academia.`,
    }
  }
  return { permitido: true, motivo: null }
}

// ---------- permisos que exige un cambio de CONTENIDO del tema ----------

// Igualdad tolerante al vacío: null / undefined / arreglos vacíos / objetos con
// todo vacío se consideran equivalentes, para no exigir un permiso cuando el
// profesor NO tocó ese campo (evita falsos positivos con docs recién clonados).
function vacio(v) {
  if (v == null || v === '') return true
  if (Array.isArray(v)) return v.every(vacio)
  if (typeof v === 'object') return Object.values(v).every(vacio)
  return false
}
function igualProfundo(a, b) {
  if (a === b) return true
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false
    if (Array.isArray(a)) {
      return a.length === b.length && a.every((x, i) => igualProfundo(x, b[i]))
    }
    const ka = Object.keys(a)
    const kb = Object.keys(b)
    return ka.length === kb.length && ka.every((k) => igualProfundo(a[k], b[k]))
  }
  return false
}
function igualOAmbosVacios(a, b) {
  if (vacio(a) && vacio(b)) return true
  return igualProfundo(a, b)
}

// Dado el contenido normalizado ANTES y DESPUÉS, ¿qué permisos finos exige el
// cambio? (además de editarContenido, que siempre es la base). Ambos deben
// venir ya por `normalizarContenido` para que la comparación sea fiable.
export function permisosRequeridosPorContenido(antes, despues) {
  const req = []
  for (const [campo, permiso] of Object.entries(PERMISO_POR_CAMPO_TEMA)) {
    if (!igualOAmbosVacios(antes?.[campo], despues?.[campo])) req.push(permiso)
  }
  return req
}
