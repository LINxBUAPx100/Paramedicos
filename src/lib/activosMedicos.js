// ============================================================
//  Activos médicos — acceso desde la aplicación
// ------------------------------------------------------------
//  Punto único por el que la interfaz pregunta por una imagen médica. Lo que
//  resuelve, y por qué está aquí y no repartido por los componentes:
//
//   · UNA SOLA VERDAD. `src/data/activosMedicos.js` lo genera el pipeline y
//     nadie lo edita a mano. Todo lo que la web sabe de una imagen —dónde está
//     el archivo, quién la hizo, qué licencia tiene, qué se cambió— sale de
//     ahí. Si un assetId no existe, estas funciones devuelven null y el
//     componente pinta el estado «no disponible»: nunca una URL inventada.
//
//   · LA RUTA SE RESUELVE UNA VEZ. El archivo se guarda como ruta relativa
//     («imagenes/medical/…») y `rutaImagen` de lib/img.js le pone el BASE_URL
//     que toque. Así el día que el material se sirva desde un CDN no hay que
//     tocar 228 fichas.
//
//  ESTE MÓDULO LEE EL CATÁLOGO LIGERO, Y ESO ES DELIBERADO.
//
//  El catálogo completo son 500 kB y lo importa quien lo entra a mirar:
//  `lib/creditosActivos.js`, que sirve al panel «Créditos», a /creditos y al
//  selector del editor. Aquí solo llega la proyección de
//  `src/data/activosLigeros.js` —ruta, texto alternativo, licencia recortada—,
//  porque este módulo está en la ruta de PINTAR, que la recorre todo el mundo,
//  incluido el visitante anónimo de la portada, que no ve ninguna figura.
//
//  Consecuencia práctica: `activo(id)` devuelve una ficha LIGERA. No tiene
//  `origin`, `attribution`, `originalCreator`, `usages` ni `tags`. Quien
//  necesite eso pide `activoCompleto(id)` a creditosActivos.js —y con ello
//  acepta cargar el catálogo entero, que es justo la decisión que se quiere
//  visible.
// ============================================================
import {
  ACTIVOS_LIGEROS, ACTIVOS_POR_TEMA, ICONO_POR_TEMA, ICONO_POR_MODULO, PRESUPUESTO_ICONO,
} from '../data/activosLigeros.js'
import { rutaImagen } from './img.js'

export { PRESUPUESTO_ICONO }

const POR_ID = new Map(ACTIVOS_LIGEROS.map((a) => [a.id, a]))

// Directorios donde puede vivir una imagen médica. Cualquier ruta fuera de
// aquí se rechaza: es la misma frontera que aplica el validador del editor.
export const DIRECTORIOS_IMAGEN = ['imagenes/medical/', 'imagenes/temario/', 'imagenes/m1/', 'imagenes/m2/', 'imagenes/m3/', 'imagenes/m4/', 'imagenes/m5/', 'imagenes/m6/', 'imagenes/m7/']

export function activo(id) {
  return POR_ID.get(String(id || '')) || null
}

export function existeActivo(id) {
  return POR_ID.has(String(id || ''))
}

// URL lista para `<img src>`. Devuelve '' si el activo no existe, para que el
// componente pinte el hueco declarado en vez de pedir un archivo inexistente.
export function srcDeActivo(id) {
  const a = activo(id)
  return a ? rutaImagen(a.filePath) : ''
}

// Los activos de un tema, en el orden de pertinencia que fijó la curación.
export function activosDeTema(temaId) {
  return (ACTIVOS_POR_TEMA[temaId] || []).map(activo).filter(Boolean)
}

// El activo canónico de un tema: el que encabeza su galería y hace de tarjeta
// en Logros.
export function activoCanonicoDeTema(temaId) {
  return activosDeTema(temaId)[0] || null
}

// El activo que hace de ICONO. Puede no ser el canónico: una composición de
// 400 KB es una gran figura y un icono horrible, así que el pipeline elige
// para este papel uno que entre en el presupuesto de peso.
export function iconoDeTema(temaId) {
  return activo(ICONO_POR_TEMA[temaId])
}

export function iconoDeModulo(moduloId) {
  return activo(ICONO_POR_MODULO[moduloId])
}

// ¿Este identificador es un activo válido? Es lo que comprueban las pruebas
// sobre los campos `icono` del contenido: ahí ya no puede haber un emoji.
export function esIdentificadorDeActivo(valor) {
  const s = String(valor || '')
  return /^[a-z0-9][a-z0-9-]{2,63}$/.test(s) && POR_ID.has(s)
}

// ¿Hay que mostrar el control «Créditos» junto a la figura? Sí cuando la
// licencia lo exige, o cuando la figura es una composición cuyos componentes lo
// exigen. Un CC0 no lo exige, pero su procedencia sigue en /creditos.
//
// Se decide con el catálogo ligero A PROPÓSITO: es una condición de la ruta de
// pintado, y resolverla con el catálogo completo obligaría a cargar 500 kB para
// averiguar si hace falta enseñar un botón.
export function requiereCreditoVisible(id) {
  const a = activo(id)
  if (!a) return false
  if (a.license.attributionRequired) return true
  return (a.componentes || []).some((c) => activo(c)?.license.attributionRequired)
}
