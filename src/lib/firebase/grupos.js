// ============================================================
//  Grupos internos de una academia — colección `grupos`
// ------------------------------------------------------------
//  El ID del doc ES el código del grupo (p. ej. GRP-7K3M). Un mismo código
//  sirve para profesores y alumnos: al unirse, el perfil recibe grupoId y
//  academiaId (la academia del grupo). El director y el super-admin crean,
//  renombran y desactivan los grupos; el panel filtra avances por grupo.
// ============================================================
import { db } from './init.js'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where,
  getDocs, serverTimestamp,
} from 'firebase/firestore'

// Código legible tipo GRP-7K3M (sin caracteres confusos).
function generarCodigoGrupo() {
  const abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let sufijo = ''
  for (let i = 0; i < 4; i++) sufijo += abc[Math.floor(Math.random() * abc.length)]
  return `GRP-${sufijo}`
}

// Crea un grupo de la academia. Devuelve { id }.
export async function crearGrupo({ academiaId, nombre, creadoPor }) {
  if (!nombre?.trim()) throw new Error('Escribe el nombre del grupo.')
  if (!academiaId) throw new Error('El grupo necesita una academia.')
  for (let intento = 0; intento < 5; intento++) {
    const id = generarCodigoGrupo()
    const ref = doc(db, 'grupos', id)
    const ya = await getDoc(ref)
    if (ya.exists()) continue
    await setDoc(ref, {
      academiaId,
      nombre: nombre.trim(),
      creadoPor,
      estado: 'activo',
      creado: serverTimestamp(),
    })
    return { id }
  }
  throw new Error('No se pudo generar un código único. Intenta de nuevo.')
}

// Grupos de una academia (staff).
export async function listarGrupos(academiaId) {
  const q = query(collection(db, 'grupos'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
}

// Renombrar (solo director/super-admin, lo imponen las reglas).
export async function renombrarGrupo(id, nombre) {
  const limpio = String(nombre || '').trim()
  if (!limpio) throw new Error('Escribe el nombre del grupo.')
  await updateDoc(doc(db, 'grupos', id), { nombre: limpio })
}

export async function alternarGrupo(id, estado) {
  await updateDoc(doc(db, 'grupos', id), { estado })
}

export async function borrarGrupo(id) {
  await deleteDoc(doc(db, 'grupos', id))
}

// Une al usuario (alumno o profesor) a un grupo por su código: fija grupoId
// y también academiaId (la academia del grupo). Devuelve el grupo.
export async function unirseGrupo(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  const snap = await getDoc(doc(db, 'grupos', cod))
  if (!snap.exists()) throw new Error('No existe un grupo con ese código.')
  const g = snap.data()
  if (g.estado !== 'activo') throw new Error('Ese grupo está desactivado.')
  const aca = await getDoc(doc(db, 'academias', g.academiaId))
  if (!aca.exists() || aca.data().estado !== 'activo') {
    throw new Error('La academia de ese grupo no está activa.')
  }
  // Unión REAL: quita la marca de prueba si venía de un código temporal.
  await updateDoc(doc(db, 'usuarios', uid), { grupoId: cod, academiaId: g.academiaId, esPrueba: false })
  return { id: cod, ...g, academia: { id: g.academiaId, ...aca.data() } }
}
