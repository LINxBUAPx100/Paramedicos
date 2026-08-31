// ============================================================
//  Qué ruta puede indexar un buscador — PURO
// ------------------------------------------------------------
//  `robots.txt` no basta para una aplicación de una sola página. Con HashRouter
//  el rastreador solo ve la raíz, y cuando se migre a URLs reales (trabajo F1)
//  seguirá descargando UNA página que después se reescribe con JavaScript.
//  Google ejecuta ese JavaScript, así que lo que decide de verdad es la
//  etiqueta `<meta name="robots">` que haya en el documento cuando termina de
//  pintarse.
//
//  Aquí se responde una sola pregunta —¿esta ruta es pública?— y el shell pone
//  o quita la etiqueta según la respuesta.
//
//  LISTA BLANCA, no negra. Lo que no está declarado como público NO se indexa.
//  Al revés, cada ruta nueva nacería indexable y habría que acordarse de
//  cerrarla; así, una ruta nueva nace cerrada y hay que abrirla a propósito.
//
//  Sin React: se prueba con `npm test`.
// ============================================================
import { CARRERAS } from './carrerasModelo.js'

// Rutas públicas que no son carreras. Los créditos son obligación de las
// licencias CC BY del material visual; los términos tienen que poder leerse
// antes de aceptarlos.
const PUBLICAS_FIJAS = ['/', '/creditos', '/terminos-y-condiciones']

/** Todas las rutas indexables, en el orden en que se anuncian. */
export function rutasPublicas() {
  return [...PUBLICAS_FIJAS, ...CARRERAS.map((c) => `/${c.slug}`)]
}

/**
 * ¿Puede un buscador indexar esta ruta?
 *
 * `/cuenta` NO entra: no es contenido de la academia, pero indexar una pantalla
 * de inicio de sesión no aporta nada y sí ensucia los resultados de marca.
 */
export function esIndexable(pathname) {
  const ruta = String(pathname || '/').replace(/\/+$/, '') || '/'
  return rutasPublicas().includes(ruta)
}

/** Valor de la etiqueta `<meta name="robots">` para esta ruta. */
export function metaRobots(pathname) {
  return esIndexable(pathname) ? 'index, follow' : 'noindex, nofollow'
}
