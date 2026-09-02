// ============================================================
//  ¿Hace falta encender Firebase para saber si hay sesión?
// ------------------------------------------------------------
//  POR QUÉ EXISTE.
//
//  `AuthProvider` cargaba el SDK de Firebase nada más montarse, en toda visita
//  y en toda página: era la única forma que tenía de saber si había sesión. Son
//  ~950 kB (240 kB comprimidos) entre el SDK de Firestore, el arranque y el de
//  Auth, y los descargaba también quien solo abría la portada pública, que no
//  tiene nada detrás de sesión.
//
//  Este módulo responde a esa pregunta SIN cargar nada, leyendo lo que el
//  propio SDK deja escrito en el navegador cuando alguien inicia sesión.
//
//  LA REGLA QUE GOBIERNA TODO ESTE ARCHIVO: ante la duda, ENCENDER.
//
//  Equivocarse hacia «no hay sesión» es el peor fallo posible de la
//  plataforma —un alumno con sesión abierta se vería como visitante anónimo y
//  perdería su temario— y equivocarse hacia «sí hay» solo cuesta la descarga
//  que se hacía siempre hasta hoy. Por eso CADA camino incierto devuelve
//  `true`: sin `indexedDB`, sin `databases()`, con el almacenamiento bloqueado,
//  si la lectura tarda demasiado o ante cualquier excepción.
//
//  Consecuencia conocida y aceptada: **Firefox no implementa
//  `indexedDB.databases()`**, así que allí se enciende siempre y la visita
//  anónima pesa lo que pesaba. Se prefiere eso a inventar una heurística que
//  pueda dejar fuera a alguien con sesión.
//
//  HAY QUE MIRAR DENTRO DE LA BASE, Y ESO SE APRENDIÓ PROBÁNDOLO.
//
//  La primera versión daba por buena la EXISTENCIA de `firebaseLocalStorageDb`.
//  Comprobado en el navegador el 02-09-2026: esa base la crea el SDK **al
//  inicializarse**, no al iniciar sesión, y en una pestaña que nunca había
//  entrado a ninguna cuenta ya estaba ahí con su almacén vacío. Con aquella
//  versión, cualquiera que hubiera abierto la web una vez volvía a descargar el
//  SDK para siempre: la optimización no habría servido de nada y habría
//  parecido que sí.
//
//  Así que se leen las CLAVES del almacén. Vacío = nunca se inició sesión aquí.
//
//  DÓNDE MIRA, y por qué en dos sitios:
//   · `indexedDB` → `firebaseLocalStorageDb`, la persistencia por omisión.
//   · `localStorage` → cuando IndexedDB no está disponible, el SDK cae a
//     `localStorage` con claves `firebase:authUser:…`. Mirar solo IndexedDB
//     dejaría fuera justo esos casos.
//
//  La base NO se crea si no existe: primero se pregunta a `databases()` y solo
//  se abre lo que ya estaba. `indexedDB.open()` sobre una base inexistente la
//  crearía, y una comprobación que crea lo que va a comprobar siempre encuentra
//  algo.
// ============================================================

// La base y el almacén que crea Firebase Auth con su persistencia por omisión.
export const BASE_AUTH = 'firebaseLocalStorageDb'
export const ALMACEN_AUTH = 'firebaseLocalStorage'

// El prefijo de la clave con que el SDK guarda la sesión, igual en IndexedDB
// que en el localStorage de respaldo.
export const CLAVE_AUTH = 'firebase:authUser:'

const esClaveDeSesion = (k) => typeof k === 'string' && k.startsWith(CLAVE_AUTH)

/**
 * Claves guardadas en el almacén de Firebase Auth, sin crear nada.
 *
 * Devuelve `null` cuando no se puede saber (y quien llama debe encender).
 */
function clavesDeLaBase(idb, esperaMs) {
  return new Promise((resolver) => {
    let resuelto = false
    const fin = (v) => { if (!resuelto) { resuelto = true; resolver(v) } }

    // Una apertura puede quedarse esperando indefinidamente si otra pestaña
    // tiene la base bloqueada. Arrancar la aplicación no puede depender de eso:
    // pasado el plazo se responde «no lo sé» y se enciende.
    const plazo = setTimeout(() => fin(null), esperaMs)
    const cerrar = (v) => { clearTimeout(plazo); fin(v) }

    let peticion
    try {
      peticion = idb.open(BASE_AUTH)
    } catch {
      cerrar(null)
      return
    }
    peticion.onerror = () => cerrar(null)
    peticion.onblocked = () => cerrar(null)
    // Si dispara `upgradeneeded` es que la base NO existía y la estamos
    // creando: se aborta para no dejar rastro, y se responde «sin claves».
    peticion.onupgradeneeded = () => {
      try { peticion.transaction?.abort() } catch { /* nada */ }
      cerrar([])
    }
    peticion.onsuccess = () => {
      const db = peticion.result
      try {
        if (![...db.objectStoreNames].includes(ALMACEN_AUTH)) {
          db.close()
          cerrar([])
          return
        }
        const tx = db.transaction(ALMACEN_AUTH, 'readonly')
        const pedido = tx.objectStore(ALMACEN_AUTH).getAllKeys()
        pedido.onsuccess = () => { db.close(); cerrar(pedido.result || []) }
        pedido.onerror = () => { db.close(); cerrar(null) }
      } catch {
        try { db.close() } catch { /* nada */ }
        cerrar(null)
      }
    }
  })
}

/**
 * ¿Hay indicios de que este navegador tenga una sesión de Firebase?
 *
 * @param {object} [deps] inyectables para poder probarlo sin navegador.
 * @param {Storage} [deps.almacen] localStorage.
 * @param {IDBFactory} [deps.idb] indexedDB.
 * @param {number} [deps.esperaMs] plazo máximo de la lectura.
 * @returns {Promise<boolean>} true = enciende Firebase; false = puedes esperar.
 */
export async function hayIndicioDeSesion({ almacen, idb, esperaMs = 400 } = {}) {
  // 1. localStorage. Es síncrono y barato, y cubre el caso en que el SDK no
  //    pudo usar IndexedDB.
  try {
    const ls = almacen === undefined ? globalThis.localStorage : almacen
    if (ls) {
      for (let i = 0; i < ls.length; i += 1) {
        if (esClaveDeSesion(ls.key(i))) return true
      }
    }
  } catch {
    // Almacenamiento bloqueado: no se puede saber ⇒ encender.
    return true
  }

  // 2. IndexedDB, que es donde vive la sesión en el caso normal.
  const base = idb === undefined ? globalThis.indexedDB : idb
  if (!base || typeof base.databases !== 'function' || typeof base.open !== 'function') return true

  let listadas
  try {
    listadas = await base.databases()
  } catch {
    return true
  }
  if (!Array.isArray(listadas)) return true
  // La base no existe: en este navegador no se ha iniciado sesión nunca.
  if (!listadas.some((d) => d && d.name === BASE_AUTH)) return false

  const claves = await clavesDeLaBase(base, esperaMs)
  if (claves === null) return true // no se pudo leer ⇒ encender
  return claves.some(esClaveDeSesion)
}
