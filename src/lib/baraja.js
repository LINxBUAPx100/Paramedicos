// ============================================================
//  Barajado de OPCIONES de una pregunta
// ------------------------------------------------------------
//  · Reordena las OPCIONES de cada pregunta para que la respuesta correcta no
//    caiga siempre en la misma letra (A/B/C…).
//  · Soporta 1, 2 o 3 respuestas correctas por pregunta: `correcta` puede ser
//    un número (índice) o un arreglo de índices. Cualquiera de las marcadas
//    se cuenta como correcta.
//
//  El azar viene SEMBRADO desde fuera (lib/azar.js): con la misma semilla, las
//  opciones caen en el mismo sitio. Sin eso, refrescar la página a mitad de un
//  examen movía las letras bajo los pies del alumno, y no había forma de
//  reconstruir qué vio si reclamaba una nota. Sin semilla se cae a
//  `Math.random`, que es lo que quiere una práctica suelta.
// ============================================================
import { generador, barajarCon } from './azar.js'

// Normaliza `correcta` a un arreglo de índices.
export function correctasDe(correcta) {
  if (Array.isArray(correcta)) return correcta
  return [correcta]
}

// Devuelve una copia de la pregunta con las opciones barajadas y `correcta`
// remapeada (siempre como arreglo de índices sobre las opciones ya barajadas).
export function barajarPregunta(p, rng = Math.random) {
  const orden = barajarCon(rng, p.opciones.map((_, i) => i))
  const opciones = orden.map((i) => p.opciones[i])
  const correctasOrig = new Set(correctasDe(p.correcta))
  const correcta = orden
    .map((idxOriginal, idxNuevo) => (correctasOrig.has(idxOriginal) ? idxNuevo : -1))
    .filter((i) => i >= 0)
  return { ...p, opciones, correcta }
}

// Baraja las opciones de toda una tanda.
//
// OJO: un solo `rng` para toda la lista, no uno por pregunta. Si cada pregunta
// arrancara su propio generador a partir de la semilla, todas recibirían la
// MISMA permutación y la correcta caería en la misma letra en todo el examen
// —justo lo que este módulo existe para evitar.
export function barajarPreguntas(preguntas, semilla = null) {
  const rng = semilla == null ? Math.random : generador(semilla)
  return (preguntas || []).map((p) => barajarPregunta(p, rng))
}
