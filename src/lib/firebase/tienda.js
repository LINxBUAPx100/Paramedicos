// ============================================================
//  Tienda — catálogo (dirección) y pedido (alumno)
// ------------------------------------------------------------
//  Dos públicos en un archivo porque comparten la colección y sus reglas, y
//  separarlos haría que alguien cambiara una forma de documento sin ver la
//  otra. Quién puede qué lo impone `firestore.rules`; aquí solo se escribe.
//
//   · Catálogo → lo publica el DIRECTOR de la academia (o el super-admin).
//   · Pedido   → lo crea el ALUMNO, y nace `solicitado`: sin precios y sin
//     reservar inventario. Ver la cabecera de `lib/tiendaModelo.js`.
//
//  LAS IMÁGENES. Firebase Storage exige Blaze y en esta instalación está
//  apagado (`STORAGE_ACTIVO`), así que hoy la imagen es un ENLACE pegado —el
//  mismo camino por el que se sirve todo el material de la plataforma—. El
//  código de subida existe y se enciende solo el día que haya bucket: no hay
//  que volver aquí a escribir nada, solo poner `VITE_STORAGE_ACTIVO=1`.
// ============================================================
import { db } from './init.js'
import {
  addDoc, collection, deleteDoc, doc, getDocs, limit, query, serverTimestamp,
  setDoc, updateDoc, where,
} from 'firebase/firestore'
import { articuloParaGuardar, lineasDePedido, problemasDelArticulo } from '../tiendaModelo.js'
import { normalizarArticulo } from '../staff/carritoModelo.js'

// --- CATÁLOGO ---------------------------------------------------------------

/**
 * El catálogo de una academia.
 *
 * `incluirInactivos` lo pide la dirección, que tiene que ver lo despublicado
 * para volver a publicarlo. El alumno recibe solo lo activo.
 */
export async function catalogoDeAcademia(academiaId, { incluirInactivos = false } = {}) {
  if (!academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'articulos'),
    where('academiaId', '==', academiaId),
    limit(300),
  ))
  return snap.docs
    .map((d) => ({
      ...normalizarArticulo({ id: d.id, ...d.data() }),
      descripcion: String(d.data()?.descripcion || ''),
      categoria: d.data()?.categoria || 'otro',
      imagen: String(d.data()?.imagen || ''),
    }))
    .filter((a) => incluirInactivos || a.activo)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

/**
 * Crea o actualiza un artículo.
 *
 * Se valida ANTES de tocar la red: la regla de Firestore impone lo mismo en el
 * servidor, y mandar algo que se va a denegar produce un `permission-denied`
 * que en pantalla parece un problema de permisos y no un precio mal escrito.
 */
export async function guardarArticulo({ articulo, articuloId = null, academiaId, creadoPor }) {
  if (!academiaId) throw new Error('Falta la academia.')
  const fallos = problemasDelArticulo(articulo)
  if (fallos.length) throw new Error(fallos.join(' '))

  const datos = articuloParaGuardar(articulo, { academiaId, creadoPor })
  if (articuloId) {
    // `updateDoc` y no `setDoc`: un artículo editado conserva su fecha de alta
    // y cualquier campo que otra pantalla le haya añadido. Y `academiaId` no
    // viaja en el parche —la regla lo comprueba contra el documento existente—.
    const { academiaId: _, creadoPor: __, ...parche } = datos
    await updateDoc(doc(db, 'articulos', articuloId), { ...parche, actualizado: serverTimestamp() })
    return { id: articuloId }
  }
  const ref = await addDoc(collection(db, 'articulos'), { ...datos, creado: serverTimestamp() })
  return { id: ref.id }
}

/**
 * Despublica un artículo: deja de verse en la tienda y sigue existiendo.
 *
 * Es lo que se debe usar casi siempre. Borrarlo se lleva por delante el nombre
 * que aparece en las órdenes que ya lo incluyen, y un historial de compras con
 * huecos no sirve para reclamar nada.
 */
export async function despublicarArticulo(articuloId, activo = false) {
  await updateDoc(doc(db, 'articulos', articuloId), { activo, actualizado: serverTimestamp() })
}

/** Borrado de verdad. Reservado para un alta equivocada recién hecha. */
export async function borrarArticulo(articuloId) {
  await deleteDoc(doc(db, 'articulos', articuloId))
}

// --- PEDIDO DEL ALUMNO ------------------------------------------------------

/**
 * El alumno manda su pedido.
 *
 * NACE `solicitado`, con artículos y cantidades y NADA MÁS: sin precios y sin
 * total. No es una simplificación, es lo que hace que el pedido sea seguro sin
 * servidor —las reglas de Firestore no tienen bucles, así que no pueden
 * comprobar línea a línea que un precio enviado coincida con el del catálogo—.
 * Quien pone los importes es recepción al confirmar, con el catálogo delante.
 *
 * El id es DETERMINISTA por persona y momento no: se deja a Firestore, porque
 * un alumno sí puede tener varios pedidos abiertos (uno por visita).
 */
export async function crearPedido({ carrito, alumno, academiaId }) {
  if (!academiaId) throw new Error('Falta la academia.')
  const uid = alumno?.uid || alumno?.id
  if (!uid) throw new Error('Falta tu cuenta.')
  const lineas = lineasDePedido(carrito)
  if (!lineas.length) throw new Error('Tu pedido está vacío.')

  const ref = await addDoc(collection(db, 'ordenes'), {
    academiaId,
    uid,
    matricula: alumno?.matricula || null,
    nombre: String(alumno?.nombre || '').trim(),
    lineas,
    // Cero y no ausente: la regla lo exige para que no quepa un importe
    // decidido por el cliente, y un campo que existe con valor conocido es más
    // fácil de leer que uno que a veces está.
    total: 0,
    estado: 'solicitado',
    origen: 'alumno',
    registradoPor: uid,
    creado: serverTimestamp(),
  })
  return { id: ref.id }
}

/** Los pedidos de quien los pide. Para su propia pantalla de «mis pedidos». */
export async function misPedidos({ uid, academiaId, limite = 30 }) {
  if (!uid || !academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'ordenes'),
    where('academiaId', '==', academiaId),
    where('uid', '==', uid),
    limit(limite),
  ))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.creado?.seconds || 0) - (a.creado?.seconds || 0))
}

/**
 * El alumno cancela lo suyo, y solo mientras nadie lo haya confirmado.
 *
 * En cuanto recepción lo aparta hay material reservado y una conversación de
 * por medio: cancelarlo entonces es una gestión de mostrador, no un botón.
 */
export async function cancelarMiPedido(ordenId) {
  await setDoc(
    doc(db, 'ordenes', ordenId),
    { estado: 'cancelado', actualizado: serverTimestamp() },
    { merge: true },
  )
}
