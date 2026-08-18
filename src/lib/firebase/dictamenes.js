// ============================================================
//  Dictámenes de revisión docente — colección `dictamenes`
// ------------------------------------------------------------
//  Un dictamen es la firma de un docente sobre un tema: lo valida, pide
//  correcciones o reporta un problema. NO cambia el estado editorial del tema.
//
//  POR QUÉ NO LO CAMBIA
//
//  `validado` y `publicado` abren el banco de examen (lib/bancoExamen.js), así
//  que un clic que ascendiera el estado metería contenido en los exámenes sin
//  segunda mano. El dictamen queda firmado y en cola; la coordinación lo aplica
//  desde el panel, y ahí sí pasa por `validarRevision`.
//
//  La barrera REAL es firestore.rules: crear un dictamen exige sesión, y
//  resolverlo exige ser director de la academia o super-admin. Aquí solo se
//  valida la forma antes de escribir y se registra la auditoría.
// ============================================================
import { db } from './init.js'
import {
  doc, updateDoc, deleteDoc, collection, addDoc, getDocs, query, where,
  serverTimestamp,
} from 'firebase/firestore'
import { validarDictamen, normalizarDictamen, ESTADOS_DICTAMEN } from '../revisionDocente.js'

/**
 * Firma un dictamen sobre un tema. Devuelve el id del documento creado.
 *
 * `accion`: 'validar' | 'corregir' | 'reportar'. Cada una exige lo suyo, y
 * `validarDictamen` lo comprueba antes de tocar la red.
 */
export async function crearDictamen({
  uid, nombre, email, academiaId, grupoId, cursoId = null,
  temaId, temaTitulo, accion, comentario = '', revisadoPor = '',
  fuentes = [], checklist = null, deudasAlFirmar = [],
}) {
  if (!uid) throw new Error('Necesitas iniciar sesión para firmar un dictamen.')
  const bruto = {
    accion, temaId, temaTitulo, comentario, revisadoPor, fuentes, checklist, deudasAlFirmar,
  }
  const error = validarDictamen(bruto)
  if (error) throw new Error(error)
  const limpio = normalizarDictamen(bruto)

  const ref = await addDoc(collection(db, 'dictamenes'), {
    ...limpio,
    uid,
    nombre: nombre || '',
    email: email || '',
    academiaId: academiaId || null,
    grupoId: grupoId || null,
    cursoId,
    fecha: serverTimestamp(),
  })
  return ref.id
}

// Dictámenes de un tema concreto, más recientes primero. Los lee la barra de
// revisión para no dejar que el mismo revisor firme dos veces.
export async function dictamenesDeTema(temaId, { academiaId = null } = {}) {
  const filtros = [where('temaId', '==', temaId)]
  if (academiaId) filtros.push(where('academiaId', '==', academiaId))
  const snap = await getDocs(query(collection(db, 'dictamenes'), ...filtros))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
}

// Cola de la coordinación: todos los dictámenes de una academia. El filtro por
// estado se hace en memoria para no exigir un índice compuesto en Firestore.
export async function dictamenesDeAcademia(academiaId, { soloAbiertos = false } = {}) {
  if (!academiaId) return []
  const snap = await getDocs(query(collection(db, 'dictamenes'), where('academiaId', '==', academiaId)))
  const todos = snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
  return soloAbiertos ? todos.filter((d) => (d.estado || 'abierto') === 'abierto') : todos
}

/**
 * Marca un dictamen como aplicado o descartado. `nota` explica qué se hizo,
 * porque un dictamen descartado sin motivo es una decisión sin rastro.
 */
export async function resolverDictamen(dictamenId, estado, { nota = '', porUid = null } = {}) {
  if (!ESTADOS_DICTAMEN.includes(estado) || estado === 'abierto') {
    throw new Error(`Estado de resolución inválido: "${estado}".`)
  }
  if (estado === 'descartado' && !String(nota).trim()) {
    throw new Error('Explica por qué se descarta el dictamen.')
  }
  await updateDoc(doc(db, 'dictamenes', dictamenId), {
    estado,
    notaResolucion: String(nota || '').trim().slice(0, 1000),
    resueltoPor: porUid || null,
    resueltoEn: serverTimestamp(),
  })
}

// Solo para limpieza del super-admin: un dictamen resuelto se conserva como
// rastro, y borrarlo es una decisión deliberada.
export async function borrarDictamen(dictamenId) {
  await deleteDoc(doc(db, 'dictamenes', dictamenId))
}
