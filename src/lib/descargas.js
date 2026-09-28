// ============================================================
//  Descargas para estudiar sin conexión (PTEM Pulso, entrega 6)
// ------------------------------------------------------------
//  Por qué no la caché persistente de Firestore: guardaría en el equipo TODO
//  lo que se lea, sin distinguir cuenta y sin borrarse al salir, y eso choca
//  con el blindaje del contenido (docs/PLAN-TECNICO-FASES.md, bloque P). Aquí
//  solo se guarda lo que el alumno pide descargar, a nombre de SU cuenta, y se
//  borra al cerrar sesión o al entrar otra persona.
//
//  Solo se USA cuando la lectura normal falla (sin red). Con conexión manda
//  siempre Firestore: una copia descargada nunca tapa una corrección.
// ============================================================

const BD = 'ptem-descargas'
const TEMAS = 'temas'
const MODULOS = 'modulos'
let dueno = null

function abrir() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('sin-indexeddb')); return }
    const pet = indexedDB.open(BD, 1)
    pet.onupgradeneeded = () => {
      const db = pet.result
      if (!db.objectStoreNames.contains(TEMAS)) db.createObjectStore(TEMAS)
      if (!db.objectStoreNames.contains(MODULOS)) db.createObjectStore(MODULOS)
    }
    pet.onsuccess = () => resolve(pet.result)
    pet.onerror = () => reject(pet.error)
  })
}

async function conAlmacen(nombre, modo, fn) {
  const db = await abrir()
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(nombre, modo)
      const almacen = tx.objectStore(nombre)
      let resultado
      Promise.resolve(fn(almacen)).then((r) => { resultado = r }, reject)
      tx.oncomplete = () => resolve(resultado)
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
  } finally {
    db.close()
  }
}

const pedir = (req) => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result)
  req.onerror = () => reject(req.error)
})

/**
 * Cuenta dueña de las descargas. Al pasar de una cuenta a otra, o a ninguna
 * (cerrar sesión), se borran las de la anterior.
 *
 * Un `null` al ARRANCAR no borra nada: mientras Firebase restaura la sesión el
 * usuario también es null, y borrar ahí dejaría sin descargas a quien abre la
 * aplicación sin red. Cuando la sesión se conoce, se borra lo de otras cuentas.
 */
export async function fijarDuenoDescargas(uid) {
  const anterior = dueno
  dueno = uid || null
  if (anterior && anterior !== dueno) await borrarDescargasDe(anterior).catch(() => {})
  if (!anterior && dueno) await borrarTodoMenos(dueno).catch(() => {})
}

async function borrarTodoMenos(uid) {
  for (const almacen of [TEMAS, MODULOS]) {
    await conAlmacen(almacen, 'readwrite', async (a) => {
      const claves = await pedir(a.getAllKeys())
      for (const k of claves) if (!uid || !String(k).startsWith(`${uid}|`)) a.delete(k)
    })
  }
}

/** Todo lo descargado, de cualquier cuenta. Lo usa `salir` antes de recargar. */
export async function borrarTodasLasDescargas() {
  dueno = null
  await borrarTodoMenos(null)
}

export async function borrarDescargasDe(uid) {
  if (!uid) return
  for (const almacen of [TEMAS, MODULOS]) {
    await conAlmacen(almacen, 'readwrite', async (a) => {
      const claves = await pedir(a.getAllKeys())
      for (const k of claves) if (String(k).startsWith(`${uid}|`)) a.delete(k)
    })
  }
}

/**
 * Descarga un módulo: pide cada lección con `cargar(temaId)` (una lectura por
 * tema, la misma que abrirla) y la guarda. `alAvanzar(hechos, total)`.
 */
export async function descargarModulo(moduloId, temaIds, cargar, alAvanzar = () => {}) {
  if (!dueno) throw new Error('sin-sesion')
  const uid = dueno
  const guardados = []
  for (let i = 0; i < temaIds.length; i++) {
    const tema = await cargar(temaIds[i])
    if (tema) {
      await conAlmacen(TEMAS, 'readwrite', (a) => { a.put({ ...tema, descargadoEn: Date.now() }, `${uid}|${temaIds[i]}`) })
      guardados.push(temaIds[i])
    }
    alAvanzar(i + 1, temaIds.length)
  }
  const ficha = { moduloId, temas: guardados, fecha: Date.now() }
  await conAlmacen(MODULOS, 'readwrite', (a) => { a.put(ficha, `${uid}|${moduloId}`) })
  prepararAplicacionSinConexion()
  return ficha
}

export async function quitarDescargaDeModulo(moduloId) {
  if (!dueno) return
  const uid = dueno
  const ficha = await estadoDescargaModulo(moduloId)
  await conAlmacen(TEMAS, 'readwrite', (a) => { for (const t of ficha?.temas || []) a.delete(`${uid}|${t}`) })
  await conAlmacen(MODULOS, 'readwrite', (a) => { a.delete(`${uid}|${moduloId}`) })
}

export async function estadoDescargaModulo(moduloId) {
  if (!dueno) return null
  const uid = dueno
  return conAlmacen(MODULOS, 'readonly', (a) => pedir(a.get(`${uid}|${moduloId}`))).catch(() => null)
}

export async function leerTemaDescargado(temaId) {
  if (!dueno) return null
  const uid = dueno
  return conAlmacen(TEMAS, 'readonly', (a) => pedir(a.get(`${uid}|${temaId}`))).catch(() => null)
}

// ---------- La aplicación misma, sin conexión ----------
//
// Las lecciones guardadas no sirven si la aplicación no abre sin red. El
// service worker (public/sw.js) solo se registra cuando alguien descarga un
// módulo: quien no lo usa no carga nada nuevo. Se le pasa la lista de archivos
// que esta sesión ya trajo para que los guarde de una vez.
export function prepararAplicacionSinConexion() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
  if (import.meta.env?.DEV) return // en desarrollo, Vite sirve módulos sueltos
  const base = import.meta.env?.BASE_URL || '/'
  navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).then(async (reg) => {
    await navigator.serviceWorker.ready
    const propios = performance.getEntriesByType('resource')
      .map((e) => e.name)
      .filter((u) => u.startsWith(location.origin))
    ;(reg.active || navigator.serviceWorker.controller)?.postMessage({ tipo: 'precargar', urls: [location.href.split('#')[0], ...propios] })
  }).catch(() => {})
}
