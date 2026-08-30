// ============================================================
//  ¿Esta ruta se coloca sola? — lógica PURA
// ------------------------------------------------------------
//  El armazón sube al inicio en cada cambio de ruta, y está bien: casi todas
//  las pantallas se leen desde arriba. El problema es la excepción.
//
//  Cuando el lector pulsa un tecnicismo subrayado dentro de una lección, el
//  destino no es «la pantalla de Logros»: es UNA PALABRA concreta al final de
//  esa pantalla. La pantalla se desplaza sola hasta ella… y acto seguido el
//  armazón la devolvía arriba, porque los efectos de un componente hijo corren
//  ANTES que los del padre. El lector veía Logros desde el principio y tenía que
//  buscar su palabra a mano, que es exactamente lo que el enlace prometía
//  ahorrarle.
//
//  Aquí se declara qué parámetros de la URL significan «esta pantalla se coloca
//  sola, no la muevas»:
//
//    ?t=<slug>   → una palabra del glosario en /logros
//    ?ref=<clave> → un diagrama concreto dentro de una lección
//
//  Vive en su propio módulo, y no dentro del armazón, por dos razones: para que
//  añadir un destino nuevo sea una línea en una lista con nombre en vez de una
//  condición escondida en un `useEffect`, y para poder probarlo sin navegador.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

// Parámetros que apuntan a un sitio DENTRO de la página ya cargada.
export const PARAMS_DE_SALTO = ['t', 'ref']

/**
 * ¿La ruta trae un destino dentro de la propia página?
 *
 * Acepta cualquier cosa con `search` (el `location` de React Router, el del
 * navegador, o un objeto simple en las pruebas). Un parámetro presente pero
 * vacío —`?t=`— no cuenta: no señala ninguna palabra.
 */
export function tieneSaltoPropio(location) {
  const busqueda = typeof location === 'string' ? location : location?.search
  if (!busqueda) return false
  let params
  try {
    params = new URLSearchParams(busqueda)
  } catch {
    return false
  }
  return PARAMS_DE_SALTO.some((p) => (params.get(p) || '').trim() !== '')
}

/**
 * ¿Debe el armazón subir al inicio al llegar a esta ruta?
 *
 * Es la pregunta al revés, escrita así porque es la que hace el armazón y
 * porque `if (debeSubirAlInicio(location))` se lee mejor que una negación.
 */
export function debeSubirAlInicio(location) {
  return !tieneSaltoPropio(location)
}
