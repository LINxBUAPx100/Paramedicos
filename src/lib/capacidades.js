// ============================================================
//  Capacidades por plan comercial y tipo de academia
// ------------------------------------------------------------
//  ÚNICA fuente de verdad de lo que cada academia puede hacer.
//  Prohibido dispersar `planComercial === 'pro'` por los componentes:
//  se consulta `capacidades.<nombre>` (expuesto en useAuth()).
//
//  Módulo PURO (sin Firebase, sin React): se prueba con `npm test`.
//
//  OJO con los nombres de campos en academias/{id}:
//    - `planComercial`  → base | pro | curso  (este módulo)
//    - `plan`           → texto libre de PERIODICIDAD de facturación
//                         ("anual"); NO es el plan comercial.
//    - `tipo`           → basico | avanzado | medicina
//    - `capacidades`    → mapa opcional de EXCEPCIONES por academia
//                         (solo lo escribe el super-admin).
// ============================================================

export const PLANES = ['base', 'pro', 'curso']
export const TIPOS = ['basico', 'avanzado', 'medicina']

export const ETIQUETA_PLAN = {
  base: 'Base',
  pro: 'Pro',
  curso: 'Curso',
}

export const DESCRIPCION_PLAN = {
  base: 'Contenido y funciones actuales; sin edición de la estructura del temario.',
  pro: 'Todo Base + editor de contenido, personalización, certificados e historial.',
  curso: 'Una sola capacitación activa (RCP, ACLS, PHTLS…), con certificado opcional.',
}

export const ETIQUETA_TIPO = {
  basico: 'Paramédico básico',
  avanzado: 'Paramédico avanzado',
  medicina: 'Medicina',
}

// Capacidades que otorga cada plan. Añadir una capacidad nueva = una línea
// por plan aquí (y nada más): los componentes solo leen el resultado.
const POR_PLAN = {
  base: {
    editorContenido: false,
    personalizacionVisual: false,
    paginaInicioConfigurable: false,
    certificados: false,
    historialCambios: false,
    permisosEditoriales: false,
    directorioCapacitadores: false,
    exportaciones: false,
    plantillas: true, // puede recibir clonaciones de plantillas oficiales
    multiCurso: true, // catálogo fijo (el oficial), varios cursos visibles
    maxCursos: null, // null = sin tope propio (usa el catálogo asignado)
  },
  pro: {
    editorContenido: true,
    personalizacionVisual: true,
    paginaInicioConfigurable: true,
    certificados: true,
    historialCambios: true,
    permisosEditoriales: true,
    directorioCapacitadores: false,
    exportaciones: true,
    plantillas: true,
    multiCurso: true,
    maxCursos: null,
  },
  curso: {
    editorContenido: true, // limitado a su único curso (maxCursos)
    personalizacionVisual: true,
    paginaInicioConfigurable: true, // página enfocada en la capacitación
    certificados: true, // opcional: la academia decide activarlo
    historialCambios: false,
    permisosEditoriales: false,
    directorioCapacitadores: true, // disponible; la academia decide mostrarlo
    exportaciones: false,
    plantillas: true,
    multiCurso: false,
    maxCursos: 1,
  },
}

// Capacidades "todo apagado": usuarios sin academia (o academia inexistente).
const SIN_ACADEMIA = Object.fromEntries(
  Object.entries(POR_PLAN.base).map(([k, v]) => [k, typeof v === 'boolean' ? false : null])
)

// Plan efectivo de una academia.
//  - Sin campo `planComercial` (academias creadas antes de la Fase 1): se
//    tratan como 'pro' para CONSERVAR todo lo que ya tienen (p. ej. la
//    personalización del hero). El super-admin fija el plan real después.
//    Este default está espejado en firestore.rules: get('planComercial','pro').
//  - Tipo 'avanzado' exige plan 'pro' (requisito del producto): se fuerza.
export function planEfectivo(academia) {
  if (!academia) return null
  const declarado = PLANES.includes(academia.planComercial) ? academia.planComercial : 'pro'
  if (academia.tipo === 'avanzado') return 'pro'
  return declarado
}

// Valida la combinación plan/tipo al crearla o editarla.
// Devuelve un mensaje de error, o null si es válida.
export function validarPlanTipo(planComercial, tipo) {
  if (!PLANES.includes(planComercial)) {
    return `Plan inválido: usa ${PLANES.join(', ')}.`
  }
  if (tipo && !TIPOS.includes(tipo)) {
    return `Tipo inválido: usa ${TIPOS.join(', ')}.`
  }
  if (tipo === 'avanzado' && planComercial !== 'pro') {
    return 'Las academias de Paramédico avanzado requieren el plan Pro.'
  }
  return null
}

// Capacidades efectivas de una academia: las de su plan + las EXCEPCIONES
// del mapa academia.capacidades (solo las claves conocidas, para que un
// dato basura en Firestore no invente capacidades nuevas).
export function capacidadesDe(academia) {
  const plan = planEfectivo(academia)
  if (!plan) return { ...SIN_ACADEMIA }
  const base = { ...POR_PLAN[plan] }
  const extra = academia.capacidades
  if (extra && typeof extra === 'object') {
    for (const clave of Object.keys(base)) {
      if (clave in extra) base[clave] = extra[clave]
    }
  }
  return base
}
