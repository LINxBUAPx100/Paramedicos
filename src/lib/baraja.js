// ============================================================
//  Barajado de preguntas de examen
// ------------------------------------------------------------
//  · Reordena las OPCIONES de cada pregunta al azar en cada intento, para que
//    la respuesta correcta no caiga siempre en la misma letra (A/B/C…).
//  · Soporta 1, 2 o 3 respuestas correctas por pregunta: `correcta` puede ser
//    un número (índice) o un arreglo de índices. Cualquiera de las marcadas
//    se cuenta como correcta.
// ============================================================

function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Normaliza `correcta` a un arreglo de índices.
export function correctasDe(correcta) {
  if (Array.isArray(correcta)) return correcta
  return [correcta]
}

// Devuelve una copia de la pregunta con las opciones barajadas y `correcta`
// remapeada (siempre como arreglo de índices sobre las opciones ya barajadas).
export function barajarPregunta(p) {
  const orden = barajar(p.opciones.map((_, i) => i))
  const opciones = orden.map((i) => p.opciones[i])
  const correctasOrig = new Set(correctasDe(p.correcta))
  const correcta = orden
    .map((idxOriginal, idxNuevo) => (correctasOrig.has(idxOriginal) ? idxNuevo : -1))
    .filter((i) => i >= 0)
  return { ...p, opciones, correcta }
}

export function barajarPreguntas(preguntas) {
  return (preguntas || []).map(barajarPregunta)
}
