// ============================================================
//  Tutoriales vistos — colección `tutoriales`
// ------------------------------------------------------------
//  UN documento por usuario (`tutoriales/{uid}`):
//
//      { vistos: { [clave]: true }, actualizado }
//
//  POR QUÉ UNA COLECCIÓN APARTE Y NO UN CAMPO EN `usuarios/{uid}`
//
//  La regla de actualización de `usuarios` tiene una LISTA BLANCA estricta, y
//  sus propios comentarios cuentan por qué: cuando no la tenía, campos no
//  enumerados quedaban escribibles por su dueño y un alumno podía abrirse los
//  módulos que su grupo tenía ocultos. Añadir `tutoriales` a esa lista sería
//  ensanchar la puerta más sensible del proyecto para guardar «ya vi el
//  tutorial del panel». Una colección propia no toca esa regla: el peor caso
//  posible aquí es que alguien se marque un tutorial como visto.
//
//  NUNCA LANZA. Si las reglas lo deniegan, si no hay red o si el usuario no ha
//  iniciado sesión, se devuelve o se descarta en silencio y el tutorial cae en
//  `localStorage`. Un tutorial que rompe la pantalla que venía a explicar es
//  peor que un tutorial que se repite en otro dispositivo.
// ============================================================
import { db } from './init.js'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { normalizarVistos } from '../tutorialesModelo.js'

const refDe = (uid) => doc(db, 'tutoriales', String(uid))

/** Mapa `clave → true` de lo que este usuario ya vio. Una lectura. */
export async function leerVistos(uid) {
  if (!uid) return {}
  try {
    const snap = await getDoc(refDe(uid))
    return snap.exists() ? normalizarVistos(snap.data()?.vistos) : {}
  } catch {
    return {}
  }
}

/**
 * Marca un tutorial como visto. `merge` sobre la rama de esa clave, así que
 * dos pestañas abiertas en pantallas distintas no se pisan.
 *
 * Devuelve true si se guardó en el servidor. El llamador usa ese dato para
 * saber si tiene que conformarse con `localStorage`, no para reintentar.
 */
export async function marcarVisto(uid, clave) {
  if (!uid || !clave) return false
  try {
    await setDoc(
      refDe(uid),
      { vistos: { [clave]: true }, actualizado: serverTimestamp() },
      { merge: true }
    )
    return true
  } catch {
    return false
  }
}

/**
 * Borra TODO lo visto: el usuario pidió volver a ver los tutoriales.
 *
 * Se escribe `vistos: {}` en vez de borrar el documento porque borrarlo exige
 * permiso de `delete`, y no hace falta abrirlo para esto.
 */
export async function reiniciarVistos(uid) {
  if (!uid) return false
  try {
    await setDoc(refDe(uid), { vistos: {}, actualizado: serverTimestamp() }, { merge: true })
    return true
  } catch {
    return false
  }
}
