// ============================================================
//  Reportes de problemas en temas — colección `reportes`
// ------------------------------------------------------------
//  Cualquier usuario puede reportar un problema desde la página de un tema;
//  el SUPER-ADMIN los revisa en su dashboard (/admin → Problemas), los marca
//  como resueltos o los elimina.
// ============================================================
import { db } from './init.js'
import {
  doc, updateDoc, deleteDoc, collection, addDoc, getDocs, serverTimestamp,
} from 'firebase/firestore'

export async function crearReporte({ uid, nombre, email, academiaId, grupoId, temaId, temaTitulo, mensaje }) {
  const texto = String(mensaje || '').trim()
  if (!texto) throw new Error('Describe el problema antes de enviarlo.')
  await addDoc(collection(db, 'reportes'), {
    uid,
    nombre: nombre || '',
    email: email || '',
    academiaId: academiaId || null,
    grupoId: grupoId || null,
    temaId,
    temaTitulo: temaTitulo || temaId,
    mensaje: texto.slice(0, 1000),
    estado: 'abierto',
    fecha: serverTimestamp(),
  })
}

// Todos los reportes (solo super-admin), más recientes primero.
export async function listarReportes() {
  const snap = await getDocs(collection(db, 'reportes'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
}

export async function actualizarReporte(id, cambios) {
  await updateDoc(doc(db, 'reportes', id), cambios)
}

export async function borrarReporte(id) {
  await deleteDoc(doc(db, 'reportes', id))
}
