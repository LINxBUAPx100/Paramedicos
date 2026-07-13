// ============================================================
//  Operaciones sobre usuarios / academias
// ============================================================
import { db } from './init.js'
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'

// Une al alumno a una academia validando su código (el código ES el id del doc).
export async function unirseAcademia(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  if (!cod) throw new Error('Escribe el código de tu academia.')

  const aca = await getDoc(doc(db, 'academias', cod))
  if (!aca.exists()) throw new Error('No existe una academia con ese código.')
  if (aca.data().estado !== 'activo') throw new Error('Esa academia no está activa.')

  // Al cambiar de academia por código directo, el grupo anterior deja de aplicar.
  await updateDoc(doc(db, 'usuarios', uid), { academiaId: cod, grupoId: null })
  return { id: cod, ...aca.data() }
}

// Miembros de una academia (para el panel del maestro/admin).
export async function miembrosDeAcademia(academiaId) {
  const q = query(collection(db, 'usuarios'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
}

// Todas las academias (para el selector del super-admin).
export async function listarAcademias() {
  const snap = await getDocs(collection(db, 'academias'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.id.localeCompare(b.id))
}

// Una academia por su código (dashboard individual).
export async function obtenerAcademia(academiaId) {
  const snap = await getDoc(doc(db, 'academias', academiaId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// Actualiza campos de una academia (estado, nombre…). Solo super-admin (reglas).
export async function actualizarAcademia(academiaId, cambios) {
  await updateDoc(doc(db, 'academias', academiaId), cambios)
}

// TODOS los usuarios de la plataforma (dashboard del super-admin).
export async function listarUsuarios() {
  const snap = await getDocs(collection(db, 'usuarios'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.nombre || a.email || '').localeCompare(b.nombre || b.email || ''))
}

// Cambia rol / estado / academia de un usuario. Las reglas deciden quién puede:
// super-admin (cualquier cambio) o admin_escuela (alumno<->instructor de su academia).
export async function actualizarUsuario(uid, cambios) {
  await updateDoc(doc(db, 'usuarios', uid), cambios)
}
