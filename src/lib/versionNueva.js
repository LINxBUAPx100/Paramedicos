// ============================================================
//  Recuperación cuando se publica una versión nueva mientras alguien navega
// ------------------------------------------------------------
//  El fallo real, visto en producción:
//
//    Failed to fetch dynamically imported module:
//    …/assets/pintarTemario-BTy23tvp.js
//
//  Qué pasó: la aplicación se parte en trozos con el hash del contenido en el
//  nombre, y se cargan cuando hacen falta (una ruta, el generador del PNG del
//  temario…). Al publicar, los trozos del despliegue anterior DESAPARECEN del
//  servidor. Quien tuviera la página abierta —o servida desde la caché— sigue
//  ejecutando el código viejo, que pide un archivo con el nombre viejo: 404, y
//  la pantalla se queda con el error en rojo. No se arregla solo, y quien lo
//  sufre no tiene forma de saber que la solución es recargar.
//
//  La cura es recargar: al hacerlo llega el index.html nuevo, con los nombres
//  nuevos. Vite avisa con el evento `vite:preloadError`, que dispara cuando un
//  import dinámico no se puede traer.
//
//  EL PELIGRO ES EL BUCLE. Si el archivo falta de verdad —un despliegue a
//  medias, un corte de red— recargar sin memoria deja la página parpadeando
//  para siempre. Por eso se recuerda el intento, y se recuerda en DOS sitios:
//
//    · `sessionStorage`, que es lo natural;
//    · y si está bloqueado (modo privado estricto, permisos denegados), una
//      marca en la URL, que sobrevive a la recarga igual de bien.
//
//  Sin el segundo, el navegador que no deja escribir sería justo el que entra
//  en bucle: el remedio no puede depender de algo opcional.
// ============================================================

const MARCA = 'ptem:recarga-por-version'
const PARAM = 'ptem_recarga'

function leerSesion() {
  try { return sessionStorage.getItem(MARCA) === '1' } catch { return null } // null = no se pudo
}

function escribirSesion(valor) {
  try {
    if (valor) sessionStorage.setItem(MARCA, '1')
    else sessionStorage.removeItem(MARCA)
    return true
  } catch {
    return false
  }
}

function urlMarcada() {
  try { return new URL(window.location.href).searchParams.has(PARAM) } catch { return false }
}

// Añade la marca a la URL ANTES de recargar. Va en la query, no en el hash,
// porque el hash es la ruta (HashRouter) y ahí ensuciaría la navegación.
function urlConMarca() {
  const url = new URL(window.location.href)
  url.searchParams.set(PARAM, '1')
  return url.toString()
}

export function vigilarVersionNueva(recargar = null) {
  window.addEventListener('vite:preloadError', (evento) => {
    const enSesion = leerSesion()
    const yaSeIntento = enSesion === null ? urlMarcada() : enSesion
    if (yaSeIntento) return // ya se probó: que el error se vea, no se esconda

    evento.preventDefault() // sin esto el error sube igual a la consola
    const pudoRecordar = escribirSesion(true)
    if (recargar) { recargar(); return }
    // Sin almacenamiento, la marca viaja en la URL.
    if (pudoRecordar) window.location.reload()
    else window.location.replace(urlConMarca())
  })
}

// La aplicación llegó a montarse: lo anterior está superado y la próxima vez se
// podrá volver a recargar. Se limpian las dos marcas, incluida la de la URL,
// que si no se quedaría pegada en lo que el usuario comparta.
export function versionCargadaBien() {
  escribirSesion(false)
  try {
    const url = new URL(window.location.href)
    if (url.searchParams.has(PARAM)) {
      url.searchParams.delete(PARAM)
      window.history.replaceState(null, '', url.toString())
    }
  } catch {
    // Sin History API no pasa nada: la marca sobra, no estorba.
  }
}
