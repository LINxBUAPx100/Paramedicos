// ============================================================
//  Carreras PÚBLICAS — lo que se anuncia antes de tener cuenta
// ------------------------------------------------------------
//  PTEM dejó de ser «la plataforma de paramédicos» el 30 de agosto de 2026:
//  la academia imparte varias carreras y la portada tiene que decirlo. Lo que
//  NO cambió es que solo una tiene temario.
//
//  Este catálogo describe la VITRINA, no el plan de estudios:
//
//    · `abierta`       → la carrera existe, tiene temario y se entra con código.
//                        Hoy solo paramédicos (el plan oficial R.E.S.C.A.T.E.).
//    · `en_preparacion`→ la academia la imparte o la va a impartir, pero su
//                        temario todavía no está en PTEM. La página lo dice.
//
//  REGLA DURA, heredada de CLAUDE.md: aquí no se inventa el alcance de un
//  programa. El texto de una carrera `en_preparacion` describe la PROFESIÓN,
//  que es conocimiento general y verificable, y nunca promete módulos, horas,
//  certificaciones ni contenidos concretos que nadie ha definido. Prometer un
//  plan de estudios que no existe es la versión comercial de inventar un
//  subtema, y se prohíbe por el mismo motivo.
//
//  UNA SOLA RUTA. `/:slug` se resuelve contra este catálogo. Añadir una
//  carrera es una entrada aquí y nada más: ni una página nueva, ni un `if`
//  suelto por los componentes. Mismo patrón que META_PROGRAMA y capacidades.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================
import { META_PROGRAMA, TIPOS_PROGRAMA } from './programasModelo.js'

export const ESTADOS_CARRERA = ['abierta', 'en_preparacion']

// Vía de contacto de la academia. Es la misma que ya usaba la portada de
// paramédicos: un solo sitio donde cambiarla el día que cambie.
export const CONTACTO_WHATSAPP = '522202256586'

export function enlaceWhatsapp(mensaje) {
  return `https://wa.me/${CONTACTO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`
}

// ------------------------------------------------------------
//  El catálogo
// ------------------------------------------------------------
//  `slug` es identidad pública: una vez anunciado, no se renombra. Va en la
//  raíz (`/paramedicos`, no `/carrera/paramedicos`) porque es una dirección
//  para compartir, y cuanto más corta, mejor se dicta por teléfono.
export const CARRERAS = [
  {
    slug: 'paramedicos',
    tipo: 'tum',
    estado: 'abierta',
    nombre: 'Técnico en Urgencias Médicas',
    nombreCorto: 'Paramédicos',
    titular: 'Forma paramédicos que entienden lo que hacen',
    resumen:
      'La carrera de Atención Prehospitalaria completa, del plan oficial de '
      + 'R.E.S.C.A.T.E.: fisiología, farmacología, trauma y urgencias médicas, '
      + 'con el avance de cada alumno a la vista de su maestro.',
    queEs:
      'El Técnico en Urgencias Médicas es quien llega primero. Evalúa a la '
      + 'persona en el sitio donde ocurrió el problema, decide qué es urgente y '
      + 'qué puede esperar, estabiliza lo que amenaza la vida y traslada al '
      + 'hospital que corresponde.',
    puntos: [
      'Temario completo del plan oficial de R.E.S.C.A.T.E.',
      'Quiz, flashcards y exámenes por módulo y por unidad.',
      'El maestro ve quién ha leído qué y quién se está quedando atrás.',
    ],
  },
  {
    slug: 'enfermeria',
    tipo: 'enfermeria',
    estado: 'en_preparacion',
    nombre: 'Enfermería',
    nombreCorto: 'Enfermería',
    titular: 'Enfermería, con el mismo rigor que la urgencia',
    resumen:
      'La academia prepara el temario de Enfermería para PTEM. Todavía no está '
      + 'disponible en la plataforma.',
    queEs:
      'La enfermería acompaña a la persona a lo largo de todo el proceso de '
      + 'atención: valora, aplica el plan de cuidados, administra tratamientos, '
      + 'vigila la evolución y educa al paciente y a su familia. Es la '
      + 'disciplina que sostiene la continuidad entre lo que ocurre en la '
      + 'urgencia y lo que ocurre después.',
    puntos: [
      'El temario se está construyendo con el mismo método que el de paramédicos.',
      'Ninguna lección se publica sin que la firme un docente.',
    ],
  },
  {
    slug: 'tsu-paramedico',
    tipo: 'tsu',
    estado: 'en_preparacion',
    nombre: 'Técnico Superior Universitario en Paramédico',
    nombreCorto: 'TSU Paramédico',
    titular: 'El grado técnico superior, sobre la misma base clínica',
    resumen:
      'La academia prepara el temario del TSU en Paramédico para PTEM. Todavía '
      + 'no está disponible en la plataforma.',
    queEs:
      'El Técnico Superior Universitario amplía la formación del paramédico con '
      + 'grado universitario: además de la atención en campo, incorpora el '
      + 'trabajo con protocolos, la coordinación de servicios y la '
      + 'responsabilidad sobre equipo y procedimientos.',
    puntos: [
      'Comparte base clínica con la carrera de paramédicos ya disponible.',
      'El temario se está construyendo; no hay fecha comprometida.',
    ],
  },
  {
    slug: 'licenciatura-paramedico',
    tipo: 'licenciatura',
    estado: 'en_preparacion',
    nombre: 'Licenciatura en Paramédico',
    nombreCorto: 'Licenciatura',
    titular: 'La formación larga, para quien va a dirigir el servicio',
    resumen:
      'La academia prepara el temario de la Licenciatura en Paramédico para '
      + 'PTEM. Todavía no está disponible en la plataforma.',
    queEs:
      'La licenciatura forma al profesional que además de atender, dirige: '
      + 'gestión de servicios de emergencia, docencia, investigación aplicada y '
      + 'diseño de protocolos. Es el grado que habilita para responsabilidades '
      + 'que exceden la atención directa.',
    puntos: [
      'Pensada para quien ya ejerce y quiere el grado.',
      'El temario se está construyendo; no hay fecha comprometida.',
    ],
  },
  {
    slug: 'proteccion-civil',
    tipo: 'proteccion_civil',
    estado: 'en_preparacion',
    nombre: 'Protección Civil',
    nombreCorto: 'Protección Civil',
    titular: 'Antes de la emergencia, y durante',
    resumen:
      'La academia prepara el temario de Protección Civil para PTEM. Todavía no '
      + 'está disponible en la plataforma.',
    queEs:
      'Protección Civil trabaja en los tres tiempos del riesgo: prevenir que '
      + 'ocurra, responder cuando ocurre y recuperar después. Identifica '
      + 'amenazas, planea evacuaciones, coordina a los cuerpos de respuesta y '
      + 'organiza a la población.',
    puntos: [
      'Se apoya en la misma base de urgencias que el resto de las carreras.',
      'El temario se está construyendo; no hay fecha comprometida.',
    ],
  },
  {
    slug: 'cursos',
    tipo: 'curso',
    estado: 'en_preparacion',
    nombre: 'Cursos y certificaciones',
    nombreCorto: 'Cursos',
    titular: 'Formación corta, con constancia',
    resumen:
      'La academia imparte cursos y talleres cortos. Su carga en PTEM está en '
      + 'preparación.',
    queEs:
      'A diferencia de una carrera, un curso resuelve una competencia concreta '
      + 'en pocas sesiones y termina con una constancia. Es el formato de la '
      + 'actualización y del reentrenamiento periódico.',
    puntos: [
      'Duración corta y objetivo único por curso.',
      'El catálogo de cursos en PTEM está en preparación.',
    ],
  },
]

// ------------------------------------------------------------
//  Consultas
// ------------------------------------------------------------

const POR_SLUG = new Map(CARRERAS.map((c) => [c.slug, c]))

/** La carrera de ese slug, o null. Nunca lanza: `/loquesea` es un 404, no un fallo. */
export function carreraPorSlug(slug) {
  return POR_SLUG.get(String(slug || '').toLowerCase()) || null
}

export function esSlugDeCarrera(slug) {
  return POR_SLUG.has(String(slug || '').toLowerCase())
}

/** Todas las carreras, en el orden en que se anuncian. */
export function carrerasPublicas() {
  return CARRERAS
}

/** Las que ya tienen temario y se puede entrar. Hoy: una. */
export function carrerasAbiertas() {
  return CARRERAS.filter((c) => c.estado === 'abierta')
}

export function carrerasEnPreparacion() {
  return CARRERAS.filter((c) => c.estado === 'en_preparacion')
}

/** Color e icono salen de META_PROGRAMA: la vitrina no inventa identidad visual. */
export function estiloDeCarrera(carrera) {
  const meta = META_PROGRAMA[carrera?.tipo]
  return {
    color: meta?.color || '#64748b',
    icono: meta?.icono || 'libro',
    etiquetaTipo: meta?.etiquetaCorta || '',
  }
}

/** Ruta pública de una carrera. Un solo sitio que sepa cómo se arma. */
export function rutaDeCarrera(carrera) {
  return `/${carrera.slug}`
}

/**
 * Mensaje de WhatsApp ya redactado para una carrera. Quien escribe desde la
 * vitrina de Enfermería pregunta por Enfermería, no manda un «Hola» a secas.
 */
export function contactoDeCarrera(carrera) {
  return carrera.estado === 'abierta'
    ? enlaceWhatsapp(`Hola, quiero información sobre ${carrera.nombre} en PTEM.`)
    : enlaceWhatsapp(`Hola, quiero saber cuándo estará ${carrera.nombre} en PTEM.`)
}

// ------------------------------------------------------------
//  Validación del catálogo
// ------------------------------------------------------------
//  Se ejecuta en las pruebas, no en producción: es una red para quien añada
//  una carrera, no una comprobación que el navegador deba pagar.

const RESERVADOS = [
  'cuenta', 'terminos-y-condiciones', 'modulo', 'fase', 'tema', 'examen',
  'flashcards', 'logros', 'creditos', 'atlas', 'temario', 'progreso',
  'buscar', 'panel', 'editor', 'admin',
]

/** Devuelve la lista de problemas del catálogo. Vacía = está bien. */
export function problemasDelCatalogo() {
  const fallos = []
  const vistos = new Set()
  for (const c of CARRERAS) {
    if (!/^[a-z0-9-]+$/.test(c.slug || '')) {
      fallos.push(`Slug inválido: "${c.slug}" (solo minúsculas, números y guiones).`)
    }
    if (vistos.has(c.slug)) fallos.push(`Slug repetido: "${c.slug}".`)
    vistos.add(c.slug)
    if (RESERVADOS.includes(c.slug)) {
      fallos.push(`El slug "${c.slug}" choca con una ruta de la aplicación.`)
    }
    if (!TIPOS_PROGRAMA.includes(c.tipo)) {
      fallos.push(`La carrera "${c.slug}" declara un tipo fuera del catálogo: "${c.tipo}".`)
    }
    if (!ESTADOS_CARRERA.includes(c.estado)) {
      fallos.push(`La carrera "${c.slug}" declara un estado desconocido: "${c.estado}".`)
    }
    for (const campo of ['nombre', 'nombreCorto', 'titular', 'resumen', 'queEs']) {
      if (typeof c[campo] !== 'string' || c[campo].trim().length === 0) {
        fallos.push(`La carrera "${c.slug}" no tiene ${campo}.`)
      }
    }
    if (!Array.isArray(c.puntos) || c.puntos.length === 0) {
      fallos.push(`La carrera "${c.slug}" no tiene puntos que enseñar.`)
    }
  }
  return fallos
}
