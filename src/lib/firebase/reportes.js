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

// Envía el DIAGNÓSTICO técnico de la sesión (los errores que la app se tragó
// para no romperle la pantalla al usuario, ver lib/registro.js) como un
// reporte más, para que el super-admin lo vea en el mismo sitio.
//
// Es la única vía por la que esos errores salen del dispositivo, y siempre a
// petición de la persona. Va a `reportes` porque la colección y sus reglas ya
// existen: el usuario firma con su uid y solo el super-admin lo lee.
export async function enviarDiagnostico({ uid, nombre, email, academiaId, grupoId, diagnostico, nota }) {
  const errores = diagnostico?.errores || []
  if (errores.length === 0) throw new Error('No hay nada que enviar: esta sesión no registró ningún fallo.')
  await addDoc(collection(db, 'reportes'), {
    uid,
    nombre: nombre || '',
    email: email || '',
    academiaId: academiaId || null,
    grupoId: grupoId || null,
    temaId: '__diagnostico__',
    temaTitulo: 'Diagnóstico técnico',
    // El super-admin lee `mensaje` en su dashboard: se resume ahí lo esencial
    // para no obligarle a abrir el detalle en cada reporte.
    mensaje: [
      String(nota || '').trim().slice(0, 400),
      `— ${errores.length} fallo(s) en esta sesión —`,
      ...errores.slice(-10).map((e) => `${e.ambito}: ${e.codigo || e.tipo || ''} ${e.mensaje}`.trim()),
    ].filter(Boolean).join('\n').slice(0, 1000),
    diagnostico,
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
