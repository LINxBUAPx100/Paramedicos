// ============================================================
//  Caché de contenido en IndexedDB — la deuda que dejó la Fase 1
// ------------------------------------------------------------
//  QUÉ PROBLEMA RESUELVE.
//
//  La Fase 1 bajó el coste de abrir contenido de 287 lecturas a 3 precalculando
//  los agregados. Lo que no resolvió es que esas 3 se vuelven a pagar EN CADA
//  RECARGA de la pestaña: la caché de `firebase/agregados.js` es un `Map` en
//  memoria y muere con la página. Un alumno que refresca cinco veces mientras
//  estudia paga quince lecturas por el mismo material que no ha cambiado.
//
//  Y no es solo cuota. El agregado de enlaces del glosario son 71 kB que viajan
//  en la ruta caliente —lo pide cada lección— y las fichas de un módulo pasan de
//  100 kB. Volver a descargarlos en cada recarga se nota en un móvil con datos.
//
//  CÓMO SE EVITA SERVIR CONTENIDO VIEJO, que es el único riesgo real.
//
//  Nada se sirve de la caché sin comprobar antes contra el SELLO del curso, que
//  se lee siempre de Firestore (es la única lectura que no se ahorra, y es la
//  que hace segura a las demás):
//
//   · la entrada guarda la `version` del sello con la que se escribió;
//   · si la versión remota no coincide, la entrada se descarta;
//   · si el sello viene `desactualizado` —lo pone el editor al guardar—, la
//     caché ni se consulta ni se escribe: el resolutor ya sabe que tiene que
//     servir por el camino completo.
//
//  Dicho de otro modo: la caché nunca decide si el contenido es válido. Solo
//  guarda lo que el sello ya declaró válido, y con el número de versión pegado.
//
//  TODO FALLA HACIA FIRESTORE. Sin IndexedDB, con el almacenamiento bloqueado,
//  en una ventana privada, con la base corrupta o si una lectura tarda más de la
//  cuenta, estas funciones devuelven `null` y quien llama va a la red, que es
//  exactamente lo que hacía antes. Una caché que puede tumbar la aplicación no
//  compensa las lecturas que ahorra.
// ============================================================

const BASE = 'ptem-contenido'
const ALMACEN = 'documentos'
const VERSION_ESQUEMA = 1

// Plazo para cualquier operación. IndexedDB puede quedarse esperando a otra
// pestaña que tenga la base bloqueada, y arrancar la aplicación no puede
// depender de eso.
const PLAZO_MS = 600

let promesaBase = null

function conPlazo(promesa, ms = PLAZO_MS) {
  return Promise.race([
    promesa,
    new Promise((res) => { setTimeout(() => res(null), ms) }),
  ])
}

function abrir() {
  if (promesaBase) return promesaBase
  promesaBase = new Promise((resolver) => {
    let idb
    try { idb = globalThis.indexedDB } catch { idb = null }
    if (!idb) { resolver(null); return }
    let peticion
    try { peticion = idb.open(BASE, VERSION_ESQUEMA) } catch { resolver(null); return }
    peticion.onupgradeneeded = () => {
      const db = peticion.result
      if (!db.objectStoreNames.contains(ALMACEN)) db.createObjectStore(ALMACEN)
    }
    peticion.onsuccess = () => resolver(peticion.result)
    peticion.onerror = () => resolver(null)
    peticion.onblocked = () => resolver(null)
  })
  return promesaBase
}

function transaccion(db, modo) {
  try {
    return db.transaction(ALMACEN, modo).objectStore(ALMACEN)
  } catch {
    return null
  }
}

/**
 * Lee una entrada válida para esta versión del curso.
 *
 * @returns {Promise<any|null>} el dato guardado, o null si no hay, si no vale
 *   para esta versión o si la caché no está disponible.
 */
export async function leerCache(clave, version) {
  if (!clave || !version) return null
  const db = await conPlazo(abrir())
  if (!db) return null
  const almacen = transaccion(db, 'readonly')
  if (!almacen) return null
  const entrada = await conPlazo(new Promise((res) => {
    let p
    try { p = almacen.get(clave) } catch { res(null); return }
    p.onsuccess = () => res(p.result || null)
    p.onerror = () => res(null)
  }))
  if (!entrada) return null
  // La comprobación que hace segura a toda la caché.
  if (entrada.version !== version) return null
  return entrada.dato
}

/** Guarda una entrada sellada con la versión del curso. No lanza nunca. */
export async function escribirCache(clave, version, dato) {
  if (!clave || !version) return false
  const db = await conPlazo(abrir())
  if (!db) return false
  const almacen = transaccion(db, 'readwrite')
  if (!almacen) return false
  return Boolean(await conPlazo(new Promise((res) => {
    let p
    try { p = almacen.put({ version, dato, guardado: Date.now() }, clave) } catch { res(false); return }
    p.onsuccess = () => res(true)
    p.onerror = () => res(false)
  })))
}

/**
 * Borra lo guardado de un curso (o la caché entera).
 *
 * Se llama al detectar que el sello cambió. No es imprescindible para la
 * corrección —una entrada con versión vieja nunca se sirve— pero sin esto la
 * base crece con material que ya nadie va a leer.
 */
export async function limpiarCache(cursoId = null) {
  const db = await conPlazo(abrir())
  if (!db) return false
  const almacen = transaccion(db, 'readwrite')
  if (!almacen) return false
  if (!cursoId) {
    return Boolean(await conPlazo(new Promise((res) => {
      let p
      try { p = almacen.clear() } catch { res(false); return }
      p.onsuccess = () => res(true)
      p.onerror = () => res(false)
    })))
  }
  const claves = await conPlazo(new Promise((res) => {
    let p
    try { p = almacen.getAllKeys() } catch { res(null); return }
    p.onsuccess = () => res(p.result || [])
    p.onerror = () => res(null)
  }))
  if (!claves) return false
  for (const k of claves) {
    if (typeof k === 'string' && k.startsWith(`${cursoId}|`)) {
      try { almacen.delete(k) } catch { /* la siguiente limpieza lo intentará */ }
    }
  }
  return true
}

// Claves. El curso va delante para poder borrar por prefijo.
export const claveAgregado = (cursoId, tipo, moduloId = null) =>
  `${cursoId}|agregado|${tipo}|${moduloId || '*'}`
export const claveTema = (cursoId, temaId) => `${cursoId}|tema|${temaId}`
