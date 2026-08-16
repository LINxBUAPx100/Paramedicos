// ============================================================
//  Solicitudes de acceso — colección `solicitudes`
// ------------------------------------------------------------
//  Dos tipos:
//   - 'módulo'  → un alumno terminó un módulo y pide que le habiliten la
//                 siguiente. La aprueba cualquier staff de su academia:
//                 añade el módulo a usuarios/{uid}.modulosDesbloqueados (ese
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
  moduloId = null, moduloNumero = null, moduloTitulo = '',
}) {
  const ref = await addDoc(collection(db, 'solicitudes'), {
    tipo,
    uid,
    nombre,
    academiaId: academiaId || null,
    grupoId: grupoId || null,
    moduloId,
    moduloNumero,
    moduloTitulo,
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

// Habilita un módulo a UN alumno (staff): se suma a sus módulos desbloqueadas.
export async function desbloquearModulo(uid, moduloId) {
  await updateDoc(doc(db, 'usuarios', uid), { modulosDesbloqueados: arrayUnion(moduloId) })
}

// Retrocede: le quita al alumno un módulo habilitada individualmente (vuelve a
// regir lo oculto de su grupo). No afecta los módulos que el grupo ya muestra.
export async function bloquearModulo(uid, moduloId) {
  await updateDoc(doc(db, 'usuarios', uid), { modulosDesbloqueados: arrayRemove(moduloId) })
}

export async function rechazarSolicitud(id, resueltoPor) {
  await updateDoc(doc(db, 'solicitudes', id), {
    estado: 'rechazada', resueltoPor, resuelto: serverTimestamp(),
  })
}

// Aprueba una solicitud de MÓDULO: desbloquea el módulo y marca la solicitud.
export async function aprobarSolicitudModulo(sol, resueltoPor) {
  await desbloquearModulo(sol.uid, sol.moduloId)
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

// RETIRA el acceso a los códigos a un profesor. No existía: se podía conceder
// y no había absolutamente nada que lo deshiciera, ni en la interfaz ni en la
// capa de datos. Un profesor que dejaba de dar clase conservaba para siempre
// la capacidad de ver —y repartir— los códigos de la academia.
//
// La regla que lo permite es la misma que la de conceder: el director escribe
// `puedeVerCodigos` de un instructor de SU academia.
export async function revocarAccesoCodigos(uid) {
  await updateDoc(doc(db, 'usuarios', uid), { puedeVerCodigos: false })
}
