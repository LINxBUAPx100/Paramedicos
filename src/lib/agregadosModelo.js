// ============================================================
//  Agregados del curso — lógica PURA
// ------------------------------------------------------------
//  POR QUÉ EXISTE ESTE MÓDULO
//
//  Para abrir UNA lección, la app leía las 287 del curso: `contenidoDeAcademia`
//  bajaba la colección `temas` entera y desde ahí construía el glosario, el
//  buscador, el banco de exámenes, las flashcards, la galería y los contadores.
//  Son 287 lecturas y ~3 MB por alumno y por sesión. Con 200 alumnos abriendo
//  clase a la vez son 57 400 lecturas: más que la cuota diaria del plan gratuito.
//
//  La lección suelta ya se sabía pedir (`temaDeCurso`). Lo que ataba a cargarlo
//  todo eran las SEIS vistas derivadas de arriba: cada una necesita un pedacito
//  de todos los temas. Este módulo las precalcula en documentos pequeños —los
//  AGREGADOS— para que cada pantalla lea solo el suyo.
//
//  REGLA DE PARTICIÓN: todo agregado que crezca con el temario se parte POR
//  MÓDULO. Medido sobre el contenido actual, un agregado global de preguntas
//  ocupa 487 KB; como 107 de los 287 temas están todavía vacíos, al completarse
//  el temario rebasaría el límite de 1 MiB por documento de Firestore. Por
//  módulo, el mayor son 146 KB y admite triplicarse.
//
//  Los dos globales lo son a propósito:
//   · `glosarioEnlaces` porque la deduplicación del glosario es global («la
//     primera aparición manda») y partirla duplicaría términos. Son 71 KB y es
//     el único agregado de la ruta caliente: lo pide cada lección.
//   · `atlas` porque es un mapa clave→tema de unos pocos cientos de bytes.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================
import { construirGlosario, slugTermino } from './glosario.js'

// Agregados que se parten por módulo, y los que son únicos para el curso.
export const AGREGADOS_POR_MODULO = ['fichas', 'preguntas', 'flashcards', 'glosario', 'imagenes']
export const AGREGADOS_GLOBALES = ['glosarioEnlaces', 'atlas', 'contadores']

/**
 * Documento de control: dice si este curso tiene agregados utilizables.
 *
 * No es contenido derivado, es metadato, y por eso no sale de
 * `construirAgregados`. Está aquí y no en el documento del curso por las
 * reglas: `edicionContenidoValida()` exige que CADA escritura de un curso suba
 * su `version`, así que un profesor que guarda una lección no puede sellar el
 * curso de paso —se lo deniegan—. Dentro de `agregados` sí puede, porque esa
 * colección tiene sus propias reglas.
 *
 * Cuesta una lectura por sesión averiguarlo. Es el precio de no volver a leer
 * las 287 lecciones, y sale a cuenta con mucho margen.
 */
export const SELLO = 'sello'

export const TIPOS_AGREGADO = [...AGREGADOS_POR_MODULO, ...AGREGADOS_GLOBALES, SELLO]

/**
 * Nombre del agregado dentro de su curso (sin el curso delante).
 *
 * El separador es `__`, el mismo que ya usan `cursos` y `temas`, para que un id
 * de módulo con guiones simples (`m4-urgencias…`) no se confunda con el corte.
 */
export function idAgregado(tipo, moduloId = null) {
  if (!TIPOS_AGREGADO.includes(tipo)) {
    throw new Error(`idAgregado: tipo desconocido «${tipo}».`)
  }
  const global = AGREGADOS_GLOBALES.includes(tipo) || tipo === SELLO
  if (global) {
    if (moduloId) throw new Error(`idAgregado: «${tipo}» es global y no lleva módulo.`)
    return tipo
  }
  if (!moduloId) throw new Error(`idAgregado: «${tipo}» necesita moduloId.`)
  return `${tipo}__${moduloId}`
}

/**
 * Id del DOCUMENTO en la colección `agregados`, con el curso por delante.
 *
 * Colección propia y no subcolección de `cursos` a propósito. Una regla sobre
 * `cursos/{cursoId}/agregados/{id}` no ve los datos del curso padre: habría que
 * resolverlos con `get()` dentro de la regla, y eso es una lectura FACTURADA
 * por cada documento pedido. Leer los siete agregados de un curso costaría
 * siete lecturas de más, que es justo lo que esta fase viene a quitar.
 *
 * Con colección propia y `academiaId`/`cursoId` copiados en el documento, la
 * regla se evalúa sin leer nada: exactamente el mismo patrón que ya usa `temas`.
 */
export function docIdAgregado(cursoId, tipo, moduloId = null) {
  if (!cursoId) throw new Error('docIdAgregado: falta cursoId.')
  return `${cursoId}__${idAgregado(tipo, moduloId)}`
}

/**
 * Documento listo para escribir en Firestore.
 *
 * El contenido va SERIALIZADO en `datos` por una limitación dura: Firestore no
 * admite arreglos dentro de arreglos, y dos agregados los tienen —los enlaces
 * del glosario son tuplas `[termino, slug, temaId]` y cada fila de búsqueda
 * lleva `conceptos: [[termino, definicion]]`—. Convertirlos a objetos los haría
 * casi el doble de grandes en la ruta caliente.
 *
 * Se pierde poder consultar dentro del agregado, y no importa: un agregado
 * siempre se lee entero, nunca se filtra. Los campos por los que SÍ se consulta
 * o se autoriza (academia, curso, estado) quedan fuera del JSON.
 */
export function docAgregado({ academiaId, cursoId, tipo, moduloId = null, estado = 'publicado', datos, version = 1 }) {
  return {
    docId: docIdAgregado(cursoId, tipo, moduloId),
    academiaId,
    cursoId,
    tipo,
    moduloId: moduloId || null,
    estado,
    version,
    datos: JSON.stringify(datos ?? null),
  }
}

// Lee el `datos` de un documento de agregado. Un JSON corrupto no debe tumbar
// la pantalla: se trata como «no hay agregado» y quien llama decide (el
// resolutor cae al bundle, igual que con cualquier otro fallo de contenido).
export function datosDeDoc(docAgr) {
  if (!docAgr) return null
  try {
    return JSON.parse(docAgr.datos ?? 'null')
  } catch {
    return null
  }
}

/**
 * Todos los documentos de agregado de un curso, listos para escribir.
 * Es lo que consume la clonación y la regeneración tras editar.
 */
export function docsAgregadosDeCurso({ academiaId, cursoId, modulos, version = 1 }) {
  const { porModulo, globales } = construirAgregados(modulos)
  const docs = []
  for (const m of porModulo) {
    for (const tipo of AGREGADOS_POR_MODULO) {
      docs.push(docAgregado({ academiaId, cursoId, tipo, moduloId: m.moduloId, datos: m[tipo], version }))
    }
  }
  for (const tipo of AGREGADOS_GLOBALES) {
    docs.push(docAgregado({ academiaId, cursoId, tipo, datos: globales[tipo], version }))
  }
  return docs
}

// --- Construcción -----------------------------------------------------------

// Metadatos del tema que las vistas derivadas necesitan repetir en cada
// elemento (la tarjeta de un resultado pinta el color de su módulo, la carta de
// una flashcard dice de qué tema salió). Se copian al generar para que la
// pantalla no tenga que cruzar con el índice.
function selloDeTema(tema) {
  return {
    temaId: tema.id,
    temaTitulo: tema.titulo,
    moduloColor: tema.moduloColor || '',
  }
}

// FICHA de un tema: todo lo que se puede decir de una lección SIN abrirla.
//
// Un solo agregado sirve a las dos pantallas que listan lecciones sin
// mostrarlas —el índice de un módulo y los resultados del buscador—, y por eso
// lleva la unión de lo que ambas pintan: icono, resumen y duración para la
// ficha, conceptos para buscar, y los conteos de quiz y flashcards, que son lo
// único que la tarjeta necesitaba del cuerpo de la lección.
//
// Deliberadamente NO lleva `secciones`: el cuerpo es el 90 % del peso y ninguna
// de las dos pantallas lo enseña.
function fichaDeTema(tema) {
  return {
    id: tema.id,
    numero: tema.numero,
    titulo: tema.titulo,
    icono: tema.icono || '',
    resumen: tema.resumen || '',
    duracion: tema.duracion || '',
    nQuiz: (tema.quiz || []).length,
    nFlashcards: (tema.flashcards || []).length,
    moduloId: tema.moduloId,
    moduloNumero: tema.moduloNumero,
    moduloTitulo: tema.moduloTitulo,
    moduloColor: tema.moduloColor || '',
    conceptos: (tema.conceptosClave || []).map((c) => [c.termino, c.definicion]),
  }
}

function preguntasDeTema(tema) {
  return (tema.quiz || []).map((q, i) => ({ ...q, id: `${tema.id}-${i}`, ...selloDeTema(tema) }))
}

function flashcardsDeTema(tema) {
  return (tema.flashcards || []).map((f, i) => ({
    ...f,
    id: `${tema.id}-fc-${i}`,
    ...selloDeTema(tema),
  }))
}

// Tipos de bloque que pueden traer imagen. Se repite aquí a propósito en vez de
// importarlo de galeriaLogros.js: aquel módulo recorre TEMAS COMPLETOS en
// tiempo de ejecución y este genera el agregado que lo sustituye; atarlos haría
// que un cambio en la galería obligara a regenerar todos los cursos sin avisar.
const TIPOS_CON_IMAGEN = ['imagen', 'diagrama']

// Piezas de imagen de un tema, CONSERVANDO las que solo traen clave y no src:
// esas las resuelve el catálogo (ATLAS_TEMAS) en tiempo de ejecución, y si el
// agregado las descartara la galería perdería justo las del Atlas.
function imagenesDeTema(tema) {
  const piezas = []
  for (const seccion of tema?.secciones || []) {
    for (const bloque of seccion?.bloques || []) {
      if (!TIPOS_CON_IMAGEN.includes(bloque?.tipo)) continue
      const src = (bloque.src || '').trim()
      const clave = bloque.clave || null
      if (!src && !clave) continue
      piezas.push({
        src: src || null,
        clave,
        titulo: (bloque.caption || bloque.titulo || bloque.alt || '').trim() || null,
      })
    }
  }
  for (const img of tema?.recursos?.imagenes || []) {
    const src = (img?.src || '').trim()
    if (!src) continue
    piezas.push({ src, clave: null, titulo: (img?.caption || img?.busqueda || '').trim() || null })
  }
  return piezas
}

/**
 * Construye TODOS los agregados de un curso a partir de sus módulos ya
 * ensamblados y numerados (la salida de `construirApi`).
 *
 * @param {Array} modulos módulos con sus temas completos, en orden de plan.
 * @returns {{porModulo: Array, globales: Object}}
 */
export function construirAgregados(modulos) {
  const lista = modulos || []

  const todosLosTemas = lista.flatMap((modulo) =>
    (modulo.temas || []).map((tema) => ({
      ...tema,
      moduloId: modulo.id,
      moduloNumero: modulo.numero,
      moduloTitulo: modulo.titulo,
      moduloColor: modulo.color,
    }))
  )

  // El glosario se construye SOBRE EL CURSO ENTERO y solo después se reparte:
  // su regla es que la primera aparición de un término manda, y eso no se puede
  // decidir módulo a módulo sin duplicar entradas.
  const glosario = construirGlosario(todosLosTemas)
  const entradasPorModulo = new Map()
  for (const entrada of glosario.entradas) {
    if (!entradasPorModulo.has(entrada.moduloId)) entradasPorModulo.set(entrada.moduloId, [])
    entradasPorModulo.get(entrada.moduloId).push(entrada)
  }

  const porModulo = lista.map((modulo) => {
    const temas = (modulo.temas || []).map((tema) => ({
      ...tema,
      moduloId: modulo.id,
      moduloNumero: modulo.numero,
      moduloTitulo: modulo.titulo,
      moduloColor: modulo.color,
    }))
    return {
      moduloId: modulo.id,
      fichas: temas.map(fichaDeTema),
      preguntas: temas.flatMap(preguntasDeTema),
      flashcards: temas.flatMap(flashcardsDeTema),
      glosario: entradasPorModulo.get(modulo.id) || [],
      // Van TODOS los temas, incluidos los que no tienen ninguna imagen. La
      // entrada vacía pesa unos 60 bytes y a cambio conserva la posición de
      // cada tema en el plan: la galería coloca una pieza del catálogo justo
      // donde está SU tema, y si el tema no estuviera en la lista, la pieza se
      // iría al final. Filtrarlos ahorraría 17 KB y cambiaría el orden.
      imagenes: temas.map((tema) => ({
        temaId: tema.id,
        temaTitulo: tema.titulo,
        piezas: imagenesDeTema(tema),
      })),
    }
  })

  // Enlaces del glosario: lo ÚNICO que necesita cada lección para subrayar sus
  // tecnicismos. Va como tuplas y no como objetos porque se repite 1 042 veces
  // y las claves («termino», «slug», «temaId») pesarían más que los datos:
  // en tuplas son 71 KB y en objetos pasarían de 130 KB, en la ruta caliente.
  const glosarioEnlaces = glosario.entradas.map((e) => [e.termino, e.slug, e.temaId])

  const atlas = {}
  for (const tema of todosLosTemas) {
    for (const seccion of tema.secciones || []) {
      for (const bloque of seccion.bloques || []) {
        if (TIPOS_CON_IMAGEN.includes(bloque?.tipo) && bloque.clave && !atlas[bloque.clave]) {
          atlas[bloque.clave] = tema.id
        }
      }
    }
  }

  const contadores = {
    modulos: lista.length,
    temas: todosLosTemas.length,
    preguntas: todosLosTemas.reduce((acc, t) => acc + (t.quiz?.length || 0), 0),
    flashcards: todosLosTemas.reduce((acc, t) => acc + (t.flashcards?.length || 0), 0),
    conceptos: todosLosTemas.reduce((acc, t) => acc + (t.conceptosClave?.length || 0), 0),
  }

  return { porModulo, globales: { glosarioEnlaces, atlas, contadores } }
}

// --- Reensamblado (el lado que consumen las pantallas) ----------------------

/**
 * Glosario mínimo para SUBRAYAR términos en una lección.
 *
 * Devuelve la misma forma que `construirGlosario` en lo que `partirTexto`
 * necesita —`indice` y `entradas`—, pero sin definiciones: la ficha completa
 * vive en /logros y allí se lee el agregado con definiciones. Así la ruta
 * caliente baja 71 KB en vez de 489 KB.
 */
export function glosarioParaEnlazar(enlaces) {
  const entradas = (enlaces || []).map(([termino, slug, temaId], orden) => ({
    termino,
    slug: slug || slugTermino(termino),
    temaId,
    orden,
    clave: normalizar(termino),
    definicion: '', // no viaja: /logros carga el agregado con definiciones
    tambienEn: [],
  }))
  const indice = new Map()
  for (const e of entradas) if (!indice.has(e.clave)) indice.set(e.clave, e)
  return { entradas, porModulo: [], indice, total: entradas.length }
}

// Misma normalización que glosario.js. Se reimplementa en una línea en vez de
// exportarla allí para no ampliar la superficie pública de aquel módulo.
function normalizar(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Búsqueda sobre las filas de los agregados, con el MISMO criterio que la
 * `buscar()` de contenidoApi: título, resumen y conceptos clave.
 *
 * Devuelve `{ tema, conceptos }` igual que antes para que BuscarPage no cambie
 * su forma de pintar; `tema` es la fila ligera, que ya trae todos los campos
 * que la tarjeta usa (número, icono, resumen y datos del módulo).
 */
export function buscarEnFilas(filas, query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return []
  const resultados = []
  for (const fila of filas || []) {
    const enTitulo = (fila.titulo || '').toLowerCase().includes(q)
    const enResumen = (fila.resumen || '').toLowerCase().includes(q)
    const conceptos = (fila.conceptos || [])
      .filter(([t, d]) => t.toLowerCase().includes(q) || d.toLowerCase().includes(q))
      .map(([termino, definicion]) => ({ termino, definicion }))
    if (enTitulo || enResumen || conceptos.length > 0) {
      resultados.push({ tema: fila, conceptos })
    }
  }
  return resultados
}

/**
 * Galería de /logros desde el agregado de imágenes, con el mismo contrato que
 * `galeriaDeLogros`: sin repetir un `src`, contenido primero y catálogo después.
 *
 * @param {Array} porTema entradas `{temaId, temaTitulo, piezas}` en orden de plan.
 * @param {Array} catalogo ATLAS_TEMAS (escrito a mano en la app, no en el curso).
 */
export function galeriaDesdeAgregado(porTema, catalogo = []) {
  const porClave = new Map((catalogo || []).map((c) => [c.clave, c]))
  const ordenDeTema = new Map((porTema || []).map((t, i) => [t.temaId, i]))
  const vistas = new Set()
  const salida = []

  ;(porTema || []).forEach((tema, iTema) => {
    let nEnTema = 0
    for (const pieza of tema.piezas || []) {
      // Un `diagrama` puede traer solo la clave: la imagen la pone el catálogo.
      const src = pieza.src || porClave.get(pieza.clave)?.src || ''
      if (!src || vistas.has(src)) continue
      vistas.add(src)
      nEnTema += 1
      salida.push({
        clave: pieza.clave || `${tema.temaId}-img-${nEnTema}`,
        titulo: pieza.titulo || tema.temaTitulo,
        src,
        tema: tema.temaId,
        origen: 'contenido',
        ancla: pieza.clave || null,
        orden: iTema,
      })
    }
  })

  for (const entrada of catalogo || []) {
    const src = (entrada.src || '').trim()
    if (!src || vistas.has(src)) continue
    vistas.add(src)
    salida.push({
      clave: entrada.clave,
      titulo: entrada.titulo,
      src,
      tema: entrada.tema || null,
      origen: 'catalogo',
      ancla: entrada.clave || null,
      // Se coloca donde está SU tema; sin tema, al final.
      orden: ordenDeTema.has(entrada.tema) ? ordenDeTema.get(entrada.tema) : Number.MAX_SAFE_INTEGER,
    })
  }

  // Orden del plan, con desempate por posición de lectura: mismo contrato que
  // `galeriaDeLogros`, del que esta función es el sustituto sin temas completos.
  return salida
    .map((e, i) => ({ e, i }))
    .sort((a, b) => a.e.orden - b.e.orden || a.i - b.i)
    .map(({ e }) => {
      const { orden, ...resto } = e
      return resto
    })
}
