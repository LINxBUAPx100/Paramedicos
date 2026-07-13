// ============================================================
//  Códigos de acceso temporal — colección `codigos`
// ------------------------------------------------------------
//  Un código da acceso de PRUEBA al contenido hasta su fecha de expiración,
//  sin necesidad de pertenecer a una academia. Los crean el super-admin o el
//  director de una academia (queda ligado a ella solo como referencia).
//  El canje escribe { codigoPrueba, pruebaHasta } en el perfil del usuario;
//  las reglas validan que pruebaHasta COPIE la expiración real del código.
// ============================================================
import { db } from './init.js'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where,
  getDocs, serverTimestamp, Timestamp,
} from 'firebase/firestore'

// Genera un código legible tipo PRUEBA-7K3M (sin caracteres confusos).
function generarCodigo() {
  const abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let sufijo = ''
  for (let i = 0; i < 4; i++) sufijo += abc[Math.floor(Math.random() * abc.length)]
  return `PRUEBA-${sufijo}`
}

// Crea un código vigente por `dias`. Devuelve { id, expira }.
export async function crearCodigo({ creadoPor, academiaId = null, dias = 7, nota = '' }) {
  const expira = Timestamp.fromDate(new Date(Date.now() + dias * 24 * 60 * 60 * 1000))
  // Reintenta si el código generado ya existe (colisión improbable).
  for (let intento = 0; intento < 5; intento++) {
    const id = generarCodigo()
    const ref = doc(db, 'codigos', id)
    const ya = await getDoc(ref)
    if (ya.exists()) continue
    await setDoc(ref, {
      academiaId: academiaId || null,
      creadoPor,
      nota: nota || '',
      estado: 'activo',
      dias,
      creado: serverTimestamp(),
      expira,
    })
    return { id, expira }
  }
  throw new Error('No se pudo generar un código único. Intenta de nuevo.')
}

// Códigos del super-admin (todos) o de una academia (director).
export async function listarCodigos(academiaId = null) {
  const ref = collection(db, 'codigos')
  const q = academiaId ? query(ref, where('academiaId', '==', academiaId)) : ref
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.creado?.seconds || 0) - (a.creado?.seconds || 0))
}

export async function alternarCodigo(id, estado) {
  await updateDoc(doc(db, 'codigos', id), { estado })
}

export async function borrarCodigo(id) {
  await deleteDoc(doc(db, 'codigos', id))
}

// Canjea un código sobre el perfil del usuario. Devuelve la fecha de fin.
export async function canjearCodigo(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  const snap = await getDoc(doc(db, 'codigos', cod))
  if (!snap.exists()) throw new Error('Ese código no existe.')
  const data = snap.data()
  if (data.estado !== 'activo') throw new Error('Ese código fue desactivado.')
  if (data.expira.toMillis() <= Date.now()) throw new Error('Ese código ya expiró.')
  await updateDoc(doc(db, 'usuarios', uid), {
    codigoPrueba: cod,
    pruebaHasta: data.expira,
  })
  return data.expira
}

// ¿El perfil tiene un acceso de prueba vigente?
export function pruebaVigente(perfil) {
  const seg = perfil?.pruebaHasta?.seconds
  return Boolean(seg && seg * 1000 > Date.now())
}
