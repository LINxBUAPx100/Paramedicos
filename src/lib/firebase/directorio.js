// ============================================================
//  Directorio público de academias + solicitudes de acceso
// ------------------------------------------------------------
//  Resuelve un estado que la app no contemplaba: alguien con cuenta pero SIN
//  academia. Hasta ahora no tenía ninguna acción disponible — la colección
//  `solicitudes` exige pertenecer ya a una academia para poder pedir algo.
//
//  Dos vías para entrar, y son excluyentes por diseño:
//    · CÓDIGO   → academias fuera del directorio (lib/firebase/usuarios.js).
//    · SOLICITUD → academias publicadas en el directorio.
//
//  El porqué de la exclusión: el id del doc de una academia ES su código, así
//  que publicarla en un directorio lo revela. Si además se pudiera entrar con
//  el código, el directorio sería una puerta abierta al contenido de pago. Por
//  eso publicarse cambia el modo de acceso a "solo por aprobación", y quien lo
//  impone son las reglas, no esta capa.
// ============================================================
import { db } from './init.js'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, where,
  serverTimestamp,
} from 'firebase/firestore'

// Id determinista: un usuario tiene como mucho UNA solicitud por academia.
// Mismo cálculo que en firestore.rules (idSolicitudAcceso). Si cambia aquí,
// cambia allí.
export function idSolicitud(uid, academiaId) {
  return `${uid}__${academiaId}`
}

// --- Escaparate ---------------------------------------------------------

// Academias que admiten solicitudes. Devuelve solo datos de escaparate: el
// plan, la facturación y el estado comercial viven en `academias`, cuyo listado
// sigue siendo exclusivo del super-admin.
export async function listarDirectorio() {
  const snap = await getDocs(collection(db, 'directorio'))
  return snap.docs
    .map((d) => ({ academiaId: d.id, ...d.data() }))
    .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
}

export async function estaEnDirectorio(academiaId) {
  const snap = await getDoc(doc(db, 'directorio', academiaId))
  return snap.exists() ? { academiaId: snap.id, ...snap.data() } : null
}

// Publicar o actualizar la ficha. OJO: al publicarse, esa academia deja de
// admitir entrada por código. Quien llame debe advertirlo.
export async function publicarEnDirectorio(academiaId, { nombre, descripcion = '', logo = '' }) {
  const limpio = String(nombre || '').trim()
  if (!limpio) throw new Error('La ficha del directorio necesita un nombre.')
  await setDoc(doc(db, 'directorio', academiaId), {
    nombre: limpio,
    descripcion: String(descripcion || '').trim().slice(0, 300),
    logo: String(logo || '').trim(),
    actualizadoEn: serverTimestamp(),
  })
}

// Retirarse del directorio devuelve la academia al acceso por código.
export async function quitarDelDirectorio(academiaId) {
  await deleteDoc(doc(db, 'directorio', academiaId))
}

// --- Solicitudes --------------------------------------------------------

export async function crearSolicitudAcceso({ uid, nombre, email, academiaId, mensaje = '' }) {
  if (!uid || !academiaId) throw new Error('Faltan datos para enviar la solicitud.')
  await setDoc(doc(db, 'solicitudesAcceso', idSolicitud(uid, academiaId)), {
    uid,
    nombre: String(nombre || '').trim(),
    email: String(email || '').trim(),
    academiaId,
    mensaje: String(mensaje || '').trim().slice(0, 300),
    estado: 'pendiente',
    creadoEn: serverTimestamp(),
  })
}

export async function misSolicitudesAcceso(uid) {
  const snap = await getDocs(query(collection(db, 'solicitudesAcceso'), where('uid', '==', uid)))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function solicitudesAccesoDeAcademia(academiaId) {
  const snap = await getDocs(
    query(collection(db, 'solicitudesAcceso'), where('academiaId', '==', academiaId))
  )
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.creadoEn?.seconds || 0) - (a.creadoEn?.seconds || 0))
}

// El director resuelve. Aceptar NO mete al alumno en la academia: solo deja la
// solicitud en 'aceptada'. El alta la completa el propio interesado
// (aplicarSolicitudAceptada), y así no hace falta abrir en las reglas la
// escritura del perfil de otra persona.
export async function resolverSolicitudAcceso(id, { aceptar, resueltoPor, motivo = '' }) {
  await updateDoc(doc(db, 'solicitudesAcceso', id), {
    estado: aceptar ? 'aceptada' : 'rechazada',
    resueltoPor: resueltoPor || null,
    resueltoEn: serverTimestamp(),
    motivo: String(motivo || '').trim().slice(0, 200),
  })
}

export async function cancelarSolicitudAcceso(id) {
  await deleteDoc(doc(db, 'solicitudesAcceso', id))
}

// Último paso del alta por aprobación, ejecutado por el propio interesado. Las
// reglas lo permiten porque su solicitud está en 'aceptada'.
export async function aplicarSolicitudAceptada(uid, academiaId) {
  await updateDoc(doc(db, 'usuarios', uid), {
    academiaId,
    grupoId: null,
    esPrueba: false,
  })
}
