// ============================================================
//  Contenido enriquecido del TEMA — lógica PURA (Fase 4)
// ------------------------------------------------------------
//  Sin Firebase, sin React. Valida y transforma el CONTENIDO interno de un
//  tema (secciones/bloques, objetivos, conceptos, flashcards, quiz con
//  ponderaciones, recursos y actividades) con los MISMOS esquemas que ya
//  renderizan los componentes del alumno (Contenido/Recursos/Actividades/
//  Quiz) — compatibilidad total con el temario existente.
//
//  Esquemas (fuente: componentes actuales):
//   bloque    → p|h3|lista|pasos|tabla|callout|formula|imagen|diagrama|fuentes
//   quiz      → [{ pregunta, opciones[], correcta: idx|idx[], explicacion, peso? }]
//               `peso` es NUEVO (ponderación, default 1) — aditivo.
//   recursos  → { videos:[{titulo,url,canal}], fuentes:[{titulo,url,tipo}],
//                 imagenes:[{src,busqueda,caption}],
//                 archivos:[{titulo,url,path,tipo,tamano}] }  ← `archivos` es NUEVO
//   actividades → { ordenar:{titulo,pasos[]},
//                   completar:[{texto('…___…'),opciones[],correcta,explicacion}],
//                   preguntas:[{pregunta,opciones[],correcta,explicacion}] }
//   conceptosClave → [{termino,definicion}] · flashcards → [{frente,reverso}]
// ============================================================
import { clonProfundo } from './contenidoModelo.js'

// ---------- catálogo de bloques ----------

export const TIPOS_BLOQUE = {
  p: { etiqueta: 'Párrafo', campos: ['texto'] },
  h3: { etiqueta: 'Subtítulo', campos: ['texto'] },
  lista: { etiqueta: 'Lista', campos: ['titulo', 'items'] },
  pasos: { etiqueta: 'Pasos numerados', campos: ['titulo', 'items'] },
  tabla: { etiqueta: 'Tabla', campos: ['titulo', 'headers', 'filas'] },
  callout: { etiqueta: 'Recuadro destacado', campos: ['variante', 'titulo', 'texto'] },
  formula: { etiqueta: 'Fórmula', campos: ['texto', 'nota'] },
  imagen: { etiqueta: 'Imagen', campos: ['src', 'alt', 'caption', 'fuente', 'fuenteUrl', 'busqueda', 'ratio'] },
  diagrama: { etiqueta: 'Diagrama (Atlas)', campos: ['clave', 'src', 'titulo'] },
  fuentes: { etiqueta: 'Fuentes y lecturas', campos: ['titulo', 'items'] },
}

export const VARIANTES_CALLOUT = ['clave', 'clinico', 'alerta', 'dosis']

export const LIMITE_TEXTO_BLOQUE = 4000
export const LIMITE_OPCIONES = 6
export const MINIMO_OPCIONES = 2
export const LIMITE_DOC_TEMA = 900 * 1024 // límite práctico de Firestore (1 MB)

// ---------- URLs ----------

// Solo enlaces http(s); nada de javascript:, data:, file:, rutas relativas raras.
export function urlSegura(url) {
  const u = String(url || '').trim()
  return /^https?:\/\/[^\s]+$/i.test(u)
}

// ---------- validaciones de bloques ----------

function textoValido(v, max = LIMITE_TEXTO_BLOQUE) {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= max
}

// Devuelve un mensaje de error o null.
export function validarBloque(bloque) {
  if (!bloque || typeof bloque !== 'object') return 'Bloque inválido.'
  const spec = TIPOS_BLOQUE[bloque.tipo]
  if (!spec) return `Tipo de bloque desconocido: "${bloque.tipo}".`
  switch (bloque.tipo) {
    case 'p':
    case 'h3':
      if (!textoValido(bloque.texto)) return `El ${spec.etiqueta.toLowerCase()} necesita texto (máx. ${LIMITE_TEXTO_BLOQUE} caracteres).`
      return null
    case 'lista':
    case 'pasos': {
      const items = bloque.items
      if (!Array.isArray(items) || items.length === 0) return `La ${spec.etiqueta.toLowerCase()} necesita al menos un elemento.`
      if (items.some((it) => !textoValido(it))) return `Hay elementos vacíos en la ${spec.etiqueta.toLowerCase()}.`
      return null
    }
    case 'tabla': {
      if (!Array.isArray(bloque.headers) || bloque.headers.length === 0) return 'La tabla necesita encabezados.'
      if (!Array.isArray(bloque.filas) || bloque.filas.length === 0) return 'La tabla necesita al menos una fila.'
      if (bloque.filas.some((f) => !Array.isArray(f) || f.length !== bloque.headers.length)) {
        return 'Cada fila de la tabla debe tener tantas celdas como encabezados.'
      }
      return null
    }
    case 'callout':
      if (!VARIANTES_CALLOUT.includes(bloque.variante)) return `Variante de recuadro inválida (usa ${VARIANTES_CALLOUT.join(', ')}).`
      if (!textoValido(bloque.texto)) return 'El recuadro necesita texto.'
      return null
    case 'formula':
      if (!textoValido(bloque.texto)) return 'La fórmula necesita texto.'
      return null
    case 'imagen':
      // El componente Imagen admite huecos SIN src (placeholder con pie y
      // término de búsqueda) — patrón usado por el temario actual.
      if (bloque.src && !urlSegura(bloque.src)) return 'El enlace de la imagen debe ser http(s).'
      if (!bloque.src && !textoValido(bloque.alt || bloque.caption || bloque.busqueda || '', 300)) {
        return 'La imagen necesita un enlace o al menos un pie/término de búsqueda.'
      }
      if (bloque.fuenteUrl && !urlSegura(bloque.fuenteUrl)) return 'El enlace de la fuente de la imagen no es válido.'
      return null
    case 'diagrama':
      if (!bloque.clave && !urlSegura(bloque.src)) return 'El diagrama necesita una clave del Atlas o un enlace http(s).'
      return null
    case 'fuentes': {
      const items = bloque.items
      if (!Array.isArray(items) || items.length === 0) return 'El bloque de fuentes necesita al menos una.'
      for (const f of items) {
        if (!textoValido(f?.nombre, 300)) return 'Cada fuente necesita un nombre.'
        if (f.url && !urlSegura(f.url)) return `El enlace de la fuente "${f.nombre}" no es válido.`
      }
      return null
    }
    default:
      return null
  }
}

export function validarSecciones(secciones) {
  if (secciones == null) return null
  if (!Array.isArray(secciones)) return 'Las secciones del tema son inválidas.'
  for (const sec of secciones) {
    if (!textoValido(sec?.titulo, 200)) return 'Cada sección necesita un título.'
    if (!Array.isArray(sec.bloques)) return `La sección "${sec.titulo}" no tiene bloques válidos.`
    for (const b of sec.bloques) {
      const e = validarBloque(b)
      if (e) return `Sección "${sec.titulo}": ${e}`
    }
  }
  return null
}

// ---------- quiz / preguntas (compartido por quiz, examen y actividades) ----------

// `correcta` puede ser un índice o un arreglo de índices (contrato de Quiz.jsx).
export function correctasDe(pregunta) {
  return Array.isArray(pregunta.correcta) ? pregunta.correcta : [pregunta.correcta]
}

export function validarPregunta(q, { conPeso = true } = {}) {
  if (!q || typeof q !== 'object') return 'Pregunta inválida.'
  if (!textoValido(q.pregunta, 600)) return 'Escribe el enunciado de la pregunta.'
  if (!Array.isArray(q.opciones) || q.opciones.length < MINIMO_OPCIONES) {
    return `La pregunta necesita al menos ${MINIMO_OPCIONES} opciones.`
  }
  if (q.opciones.length > LIMITE_OPCIONES) return `Máximo ${LIMITE_OPCIONES} opciones por pregunta.`
  if (q.opciones.some((op) => !textoValido(op, 400))) return 'Hay opciones vacías en la pregunta.'
  const correctas = correctasDe(q)
  if (correctas.length === 0) return 'Marca al menos una respuesta correcta.'
  if (correctas.length >= q.opciones.length) return 'No todas las opciones pueden ser correctas.'
  for (const c of correctas) {
    if (!Number.isInteger(c) || c < 0 || c >= q.opciones.length) {
      return 'La respuesta correcta no apunta a una opción existente.'
    }
  }
  if (conPeso && q.peso != null) {
    if (typeof q.peso !== 'number' || !Number.isFinite(q.peso) || q.peso <= 0 || q.peso > 100) {
      return 'La ponderación debe ser un número mayor que 0 (máximo 100).'
    }
  }
  return null
}

export function validarQuiz(quiz) {
  if (quiz == null) return null
  if (!Array.isArray(quiz)) return 'El quiz es inválido.'
  for (let i = 0; i < quiz.length; i++) {
    const e = validarPregunta(quiz[i])
    if (e) return `Pregunta ${i + 1}: ${e}`
  }
  return null
}

// ---------- calificación (ponderada, retrocompatible) ----------

// respuestas: arreglo con el índice elegido por pregunta (null = sin responder).
// Sin `peso` en ninguna pregunta ⇒ resultado idéntico al cálculo actual
// (aciertos/total y porcentaje redondeado), que es el que guardan los intentos.
export function calcularCalificacion(preguntas, respuestas) {
  const lista = preguntas || []
  let puntos = 0
  let pesoTotal = 0
  let aciertos = 0
  const porPregunta = lista.map((q, i) => {
    const peso = typeof q.peso === 'number' && q.peso > 0 ? q.peso : 1
    const elegida = respuestas?.[i]
    const correcta = elegida != null && correctasDe(q).includes(elegida)
    pesoTotal += peso
    if (correcta) {
      puntos += peso
      aciertos++
    }
    return { indice: i, correcta, peso, elegida: elegida ?? null }
  })
  const porcentaje = pesoTotal > 0 ? Math.round((puntos / pesoTotal) * 100) : 0
  return {
    aciertos,               // preguntas correctas (compat con intentos actuales)
    total: lista.length,    // preguntas totales   (compat con intentos actuales)
    puntos,                 // suma ponderada obtenida
    pesoTotal,              // suma ponderada posible
    porcentaje,             // redondeado 0-100 (ponderado)
    porPregunta,
  }
}

// ---------- recursos ----------

export function validarRecursos(recursos) {
  if (recursos == null) return null
  if (typeof recursos !== 'object' || Array.isArray(recursos)) return 'Los recursos son inválidos.'
  for (const v of recursos.videos || []) {
    if (!textoValido(v?.titulo, 200)) return 'Cada video necesita un título.'
    if (!urlSegura(v.url)) return `El enlace del video "${v.titulo}" debe ser http(s).`
  }
  for (const f of recursos.fuentes || []) {
    if (!textoValido(f?.titulo, 300)) return 'Cada fuente necesita un título.'
    if (!urlSegura(f.url)) return `El enlace de la fuente "${f.titulo}" debe ser http(s).`
  }
  for (const img of recursos.imagenes || []) {
    if (img?.src && !urlSegura(img.src)) return 'Hay una imagen de recursos con enlace inválido.'
    if (!img?.src && !textoValido(img?.busqueda || img?.caption, 300)) {
      return 'Cada imagen de recursos necesita enlace o una descripción de búsqueda.'
    }
  }
  for (const a of recursos.archivos || []) {
    if (!textoValido(a?.titulo, 200)) return 'Cada archivo descargable necesita un título.'
    if (!urlSegura(a.url)) return `El enlace del archivo "${a.titulo}" no es válido.`
    if (!a.path || typeof a.path !== 'string') return `El archivo "${a.titulo}" no tiene ruta de almacenamiento.`
  }
  return null
}

// ---------- actividades ----------

export function validarActividades(actividades) {
  if (actividades == null) return null
  if (typeof actividades !== 'object' || Array.isArray(actividades)) return 'Las actividades son inválidas.'
  const { ordenar, completar, preguntas } = actividades
  if (ordenar != null) {
    if (!textoValido(ordenar.titulo, 200)) return 'La actividad de ordenar necesita un título.'
    if (!Array.isArray(ordenar.pasos) || ordenar.pasos.length < 2) {
      return 'La actividad de ordenar necesita al menos 2 pasos.'
    }
    if (ordenar.pasos.some((p) => !textoValido(p))) return 'Hay pasos vacíos en la actividad de ordenar.'
  }
  for (const it of completar || []) {
    if (!textoValido(it?.texto, 600)) return 'Cada frase de completar necesita texto.'
    if (!String(it.texto).includes('___')) {
      return 'Cada frase de completar debe marcar el hueco con tres guiones bajos (___).'
    }
    const e = validarPregunta({ pregunta: it.texto, opciones: it.opciones, correcta: it.correcta }, { conPeso: false })
    if (e) return `Completar la frase: ${e}`
  }
  for (let i = 0; i < (preguntas || []).length; i++) {
    const e = validarPregunta(preguntas[i], { conPeso: false })
    if (e) return `Pregunta de repaso ${i + 1}: ${e}`
  }
  return null
}

// ---------- conceptos y flashcards ----------

export function validarConceptos(conceptos) {
  if (conceptos == null) return null
  if (!Array.isArray(conceptos)) return 'Los conceptos clave son inválidos.'
  for (const c of conceptos) {
    if (!textoValido(c?.termino, 200) || !textoValido(c?.definicion, 600)) {
      return 'Cada concepto clave necesita término y definición.'
    }
  }
  return null
}

export function validarFlashcards(flashcards) {
  if (flashcards == null) return null
  if (!Array.isArray(flashcards)) return 'Las flashcards son inválidas.'
  for (const f of flashcards) {
    if (!textoValido(f?.frente, 600) || !textoValido(f?.reverso, 600)) {
      return 'Cada flashcard necesita frente y reverso.'
    }
  }
  return null
}

// ---------- contenido completo del tema ----------

export const CAMPOS_CONTENIDO_TEMA = [
  'resumen', 'duracion', 'objetivos', 'secciones', 'conceptosClave',
  'flashcards', 'quiz', 'recursos', 'actividades',
]

// Valida TODO el contenido editable de un tema. Devuelve mensaje o null.
export function validarContenidoTema(contenido) {
  if (!contenido || typeof contenido !== 'object') return 'Contenido inválido.'
  for (const clave of Object.keys(contenido)) {
    if (!CAMPOS_CONTENIDO_TEMA.includes(clave)) {
      return `El campo "${clave}" no es contenido editable del tema.`
    }
  }
  if (contenido.objetivos != null) {
    if (!Array.isArray(contenido.objetivos)) return 'Los objetivos son inválidos.'
    if (contenido.objetivos.some((o) => !textoValido(o, 400))) return 'Hay objetivos vacíos.'
  }
  return validarSecciones(contenido.secciones)
    || validarConceptos(contenido.conceptosClave)
    || validarFlashcards(contenido.flashcards)
    || validarQuiz(contenido.quiz)
    || validarRecursos(contenido.recursos)
    || validarActividades(contenido.actividades)
    || (JSON.stringify(contenido).length > LIMITE_DOC_TEMA
      ? 'El tema es demasiado grande: divídelo en dos temas.'
      : null)
}

// ---------- normalización del borrador antes de guardar ----------

const recortar = (v) => (typeof v === 'string' ? v.trim() : v)
const lineasNoVacias = (arr) => (arr || []).map(recortar).filter((s) => s)

// Limpia lo que el editor produce de forma natural (espacios, renglones
// vacíos, `correcta` de un solo elemento) SIN cambiar la semántica. El
// resultado es lo que se valida y se guarda.
export function normalizarContenido(contenido) {
  const c = clonProfundo(contenido || {})
  if (typeof c.resumen === 'string') c.resumen = c.resumen.trim()
  if (typeof c.duracion === 'string') c.duracion = c.duracion.trim()
  if (c.objetivos) c.objetivos = lineasNoVacias(c.objetivos)
  for (const sec of c.secciones || []) {
    sec.titulo = recortar(sec.titulo)
    for (const b of sec.bloques || []) {
      for (const k of Object.keys(b)) b[k] = recortar(b[k])
      if (b.tipo === 'lista' || b.tipo === 'pasos') b.items = lineasNoVacias(b.items)
      if (b.tipo === 'fuentes') b.items = (b.items || []).filter((f) => recortar(f?.nombre))
    }
    sec.bloques = (sec.bloques || []).filter((b) => b.tipo !== 'p' || b.texto)
  }
  const compactarCorrecta = (q) => {
    if (Array.isArray(q.correcta)) {
      q.correcta = [...new Set(q.correcta)].sort((a, b) => a - b)
      if (q.correcta.length === 1) q.correcta = q.correcta[0]
    }
    if (q.peso === 1 || q.peso == null) delete q.peso // peso default no se guarda
  }
  for (const q of c.quiz || []) {
    q.pregunta = recortar(q.pregunta)
    q.opciones = (q.opciones || []).map(recortar)
    q.explicacion = recortar(q.explicacion)
    compactarCorrecta(q)
  }
  if (c.actividades) {
    const a = c.actividades
    if (a.ordenar) {
      a.ordenar.titulo = recortar(a.ordenar.titulo)
      a.ordenar.pasos = lineasNoVacias(a.ordenar.pasos)
      if (a.ordenar.pasos.length === 0) a.ordenar = null
    }
    for (const it of a.completar || []) {
      it.texto = recortar(it.texto)
      it.opciones = (it.opciones || []).map(recortar)
    }
    for (const q of a.preguntas || []) {
      q.pregunta = recortar(q.pregunta)
      q.opciones = (q.opciones || []).map(recortar)
      q.explicacion = recortar(q.explicacion)
      const peso = q.peso
      compactarCorrecta(q)
      if (peso != null) delete q.peso // las actividades no llevan ponderación
    }
    if (!a.ordenar && !(a.completar || []).length && !(a.preguntas || []).length) {
      c.actividades = null
    }
  }
  if (c.recursos) {
    for (const lista of ['videos', 'fuentes', 'imagenes', 'archivos']) {
      if (c.recursos[lista]) {
        c.recursos[lista] = c.recursos[lista].filter((x) =>
          Object.values(x || {}).some((v) => typeof v === 'string' ? v.trim() : v != null)
        )
        for (const x of c.recursos[lista]) {
          for (const k of Object.keys(x)) x[k] = recortar(x[k])
        }
      }
    }
    const vacio = ['videos', 'fuentes', 'imagenes', 'archivos']
      .every((l) => !(c.recursos[l] || []).length)
    if (vacio) c.recursos = null
  }
  return c
}

// ---------- plantillas y duplicación ----------

export function bloqueNuevo(tipo) {
  switch (tipo) {
    case 'p': return { tipo: 'p', texto: '' }
    case 'h3': return { tipo: 'h3', texto: '' }
    case 'lista': return { tipo: 'lista', titulo: '', items: [''] }
    case 'pasos': return { tipo: 'pasos', titulo: '', items: [''] }
    case 'tabla': return { tipo: 'tabla', titulo: '', headers: ['Columna 1', 'Columna 2'], filas: [['', '']] }
    case 'callout': return { tipo: 'callout', variante: 'clave', titulo: '', texto: '' }
    case 'formula': return { tipo: 'formula', texto: '', nota: '' }
    case 'imagen': return { tipo: 'imagen', src: '', alt: '', caption: '' }
    case 'fuentes': return { tipo: 'fuentes', titulo: '', items: [{ nombre: '', url: '' }] }
    default: throw new Error(`Tipo de bloque desconocido: "${tipo}".`)
  }
}

export function preguntaNueva() {
  return { pregunta: '', opciones: ['', ''], correcta: 0, explicacion: '', peso: 1 }
}

// Duplicados 100 % independientes (mismo principio que la Fase 2/3).
export function duplicarPregunta(q) {
  return clonProfundo(q)
}
export function duplicarBloque(b) {
  return clonProfundo(b)
}
export function duplicarSeccion(sec) {
  const copia = clonProfundo(sec)
  copia.titulo = `Copia de ${sec.titulo}`
  return copia
}
