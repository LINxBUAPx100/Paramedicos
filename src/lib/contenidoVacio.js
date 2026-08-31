// ============================================================
//  Contenido VACÍO — lo que se sirve cuando no hay temario que servir
// ------------------------------------------------------------
//  Hasta el trabajo P2, cuando el resolutor no podía traer el temario de una
//  academia desde Firestore, servía el del BUNDLE. Sonaba prudente —«mejor algo
//  que nada»— y era justo lo contrario:
//
//   · El bundle es el temario de R.E.S.C.A.T.E. Servírselo a otra academia le
//     enseña material ajeno creyendo que es el suyo, y en silencio.
//   · Y para que ese fallback existiera, el temario entero tenía que viajar
//     dentro del JavaScript publicado: 4,3 MB con las 287 lecciones, sus
//     flashcards y las respuestas correctas de todos sus exámenes,
//     descargables por cualquiera sin cuenta.
//
//  Ahora, si no hay contenido, no hay contenido. Este módulo tiene la MISMA
//  forma que `src/data/index.js` pero sin nada dentro, para que ninguna
//  pantalla se rompa por un `undefined`: enseñan sus estados vacíos, que ya
//  existían y ya estaban escritos.
//
//  `fuente: 'vacio'` permite distinguirlo de un temario real que esté vacío.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

export const modulos = []
export const todosLosTemas = []
export const todasLasPreguntas = []
export const todasLasFlashcards = []
export const temaPorClaveImagen = {}

export const stats = {
  modulos: 0, temas: 0, preguntas: 0, flashcards: 0,
}

export function getModulo() { return null }
export function getTema() { return null }
export function getTemaVecinos() { return { anterior: null, siguiente: null } }
export function preguntasDeModulo() { return [] }
export function buscar() { return [] }

/**
 * API con la forma que espera el resolutor. Se devuelve congelada porque es un
 * singleton compartido: si una pantalla le añadiera algo, se lo añadiría a
 * todas.
 */
export function contenidoVacio(motivo = '') {
  return Object.freeze({
    fuente: 'vacio',
    motivo,
    indice: null,
    modulos, todosLosTemas, todasLasPreguntas, todasLasFlashcards,
    temaPorClaveImagen, stats,
    getModulo, getTema, getTemaVecinos, preguntasDeModulo, buscar,
  })
}
