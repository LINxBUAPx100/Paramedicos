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

  await updateDoc(doc(db, 'usuarios', uid), { academiaId: cod })
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
