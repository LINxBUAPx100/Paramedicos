// ============================================================
//  Mandar una hoja a imprimir — el gesto, en un solo sitio
// ------------------------------------------------------------
//  Tres pantallas imprimen (estado de cuenta, padrón y corte de caja) y las
//  tres tienen que hacer exactamente lo mismo: montar la hoja, cambiar el
//  título del documento —que es lo que el navegador propone como nombre del
//  archivo al guardar en PDF— y devolverlo a su valor. Tres copias de ese
//  baile acaban divergiendo, y la que se olvide de restaurar el título deja la
//  pestaña llamándose «corte-de-caja» para el resto de la sesión.
// ============================================================

/**
 * @param {string} nombreArchivo  lo que se propondrá al guardar como PDF.
 * @param {function} montar       enciende la vista previa (la hoja tiene que
 *                                estar en el DOM antes de imprimir).
 */
export function imprimirHoja(nombreArchivo, montar) {
  const anterior = document.title
  montar?.()
  document.title = nombreArchivo || anterior
  // Un ciclo de pintado para que React haya montado la hoja antes de que el
  // navegador congele la vista.
  setTimeout(() => {
    try {
      window.print()
    } finally {
      document.title = anterior
    }
  }, 50)
}

/** `padron-2026-09-20`, sin acentos ni espacios. */
export function nombreSimple(base, fecha = new Date()) {
  const limpio = String(base || 'documento')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()
  const d = fecha instanceof Date ? fecha : new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${limpio}-${d.getFullYear()}-${mes}-${dia}`
}
