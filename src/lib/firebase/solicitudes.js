// ============================================================
//  Solicitudes de acceso — colección `solicitudes`
// ------------------------------------------------------------
//  Dos tipos:
//   - 'modulo'  → un alumno terminó una fase y pide que le habiliten la
//                 siguiente. La aprueba cualquier staff de su academia:
//                 añade la fase a usuarios/{uid}.fasesDesbloqueadas (ese
//                 campo anula lo oculto del grupo SOLO para ese alumno).
//   - 'codigos' → un profesor pide ver los códigos de academia/grupos.
//                 La aprueba el director o el super-admin: pone
//                 usuarios/{uid}.puedeVerCodigos = true.
// ============================================================
import { db } from './init.js'
import {
  collection, doc, addDoc, updateDoc, query, where, getDocs,
  serverTimestamp, arrayUnion, arrayRemove,
} from 'firebase/firestore'

export async function crearSolicitud({
  tipo, uid, nombre = '', academiaId = null, grupoId = null,
  faseId = null, faseNumero = null, faseTitulo = '',
}) {
  const ref = await addDoc(collection(db, 'solicitudes'), {
    tipo,
    uid,
    nombre,
    academiaId: academiaId || null,
    grupoId: grupoId || null,
    faseId,
    faseNumero,
    faseTitulo,
    estado: 'pendiente',
    fecha: serverTimestamp(),
    resueltoPor: null,
  })
  return { id: ref.id }
}

// Solicitudes de una academia (panel del staff). Orden en cliente: recientes primero.
export async function solicitudesDeAcademia(academiaId) {
  const q = query(collection(db, 'solicitudes'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
}

// Mis solicitudes (para saber si ya hay una pendiente antes de crear otra).
export async function misSolicitudes(uid) {
  const q = query(collection(db, 'solicitudes'), where('uid', '==', uid))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
}

// Habilita una fase a UN alumno (staff): se suma a sus fases desbloqueadas.
export async function desbloquearFase(uid, faseId) {
  await updateDoc(doc(db, 'usuarios', uid), { fasesDesbloqueadas: arrayUnion(faseId) })
}

// Retrocede: le quita al alumno una fase habilitada individualmente (vuelve a
// regir lo oculto de su grupo). No afecta las fases que el grupo ya muestra.
export async function bloquearFase(uid, faseId) {
  await updateDoc(doc(db, 'usuarios', uid), { fasesDesbloqueadas: arrayRemove(faseId) })
}

export async function rechazarSolicitud(id, resueltoPor) {
  await updateDoc(doc(db, 'solicitudes', id), {
    estado: 'rechazada', resueltoPor, resuelto: serverTimestamp(),
  })
}

// Aprueba una solicitud de MÓDULO: desbloquea la fase y marca la solicitud.
export async function aprobarSolicitudModulo(sol, resueltoPor) {
  await desbloquearFase(sol.uid, sol.faseId)
  await updateDoc(doc(db, 'solicitudes', sol.id), {
    estado: 'aprobada', resueltoPor, resuelto: serverTimestamp(),
  })
}

// Aprueba una solicitud de CÓDIGOS (solo director/super-admin, por reglas).
export async function aprobarSolicitudCodigos(sol, resueltoPor) {
  await updateDoc(doc(db, 'usuarios', sol.uid), { puedeVerCodigos: true })
  await updateDoc(doc(db, 'solicitudes', sol.id), {
    estado: 'aprobada', resueltoPor, resuelto: serverTimestamp(),
  })
}
