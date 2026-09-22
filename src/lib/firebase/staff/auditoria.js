// ============================================================
//  Recepción · auditoría — la misma colección, sin arrastrar el temario
// ------------------------------------------------------------
//  POR QUÉ ESTE ARCHIVO EXISTE, si `registrarHistorial` ya estaba escrito.
//
//  El original vive en `lib/firebase/contenido.js`, que es el resolutor de
//  contenido: importa la clonación de plantillas, los agregados, la caché de
//  temas, el modelo de programas y el catálogo entero. Importarlo desde
//  recepción metería toda esa maquinaria en el paquete de una pantalla que no
//  enseña ni una lección, y deshacer eso es justamente lo que costaron los
//  trabajos P2 y P5 (el paquete de entrada bajó de 3 037 kB a 461 kB).
//
//  Así que aquí se escribe el MISMO documento, con el MISMO contrato:
//
//      { academiaId, usuario, accion, coleccion, docId, antes, despues,
//        origen, fecha }
//
//  Si ese contrato cambia, cambia en los dos sitios. Está dicho aquí y en
//  `contenido.js` para que quien toque uno encuentre el otro.
// ============================================================
import { auth, db } from '../init.js'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

/**
 * Deja constancia de una acción de mostrador.
 *
 * `usuario` se toma de la sesión y no de un argumento: es el único valor que no
 * se puede falsear desde la pantalla, y la regla de Firestore exige que
 * coincida con el uid de quien escribe.
 *
 * @returns {string|null} el id de la entrada, o `null` si no se pudo registrar.
 */
export async function registrarEnHistorial({
  academiaId, accion, coleccion, docId, antes = null, despues = null,
}) {
  const uid = auth.currentUser?.uid
  if (!uid || !academiaId || !accion) return null
  const ref = await addDoc(collection(db, 'historial'), {
    academiaId,
    usuario: uid,
    accion,
    coleccion: coleccion || null,
    docId: docId || null,
    antes,
    despues,
    origen: 'recepcion',
    fecha: serverTimestamp(),
  })
  return ref.id
}

/**
 * Lo mismo, pero sin poder romper la operación principal.
 *
 * Se usa cuando el rastro acompaña a algo que YA se guardó: perder el rastro es
 * malo, pero hacer fallar un cobro ya cobrado porque no se pudo escribir su
 * línea de historial es peor. Devuelve `false` en vez de lanzar, y quien llama
 * tiene que DECIRLO en pantalla: una auditoría que falla en silencio es la peor
 * de las tres opciones.
 */
export async function registrarSinRomper(entrada) {
  try {
    return Boolean(await registrarEnHistorial(entrada))
  } catch {
    return false
  }
}
