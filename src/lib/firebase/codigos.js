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

const ABC = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // sin caracteres confusos (0/O, 1/I/L)
const rand = (n) =>
  Array.from({ length: n }, () => ABC[Math.floor(Math.random() * ABC.length)]).join('')
const abreviar = (txt, n) =>
  String(txt || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, n)

// Código legible y con significado: ABREVIATURA de la academia (el primer
// segmento de su código, p. ej. AEP-2026 → AEP) + 2 letras del GRUPO +
// vigencia y azar (7D4K = 7 días + sufijo). Ej: AEP-GE-7D4K. Sin academia → PT.
function generarCodigo({ academiaId = null, grupoNombre = '', dias = 7 } = {}) {
  const aca = academiaId ? abreviar(academiaId.split('-')[0], 4) || 'PT' : 'PT'
  const grp = abreviar(grupoNombre, 2)
  const cola = `${dias}D${rand(2)}`
  return [aca, grp, cola].filter(Boolean).join('-')
}

// Crea un código vigente por `dias`, opcionalmente ligado a una academia y a
// un GRUPO (al canjearlo, la persona queda integrada en ellos). Devuelve { id, expira }.
export async function crearCodigo({ creadoPor, academiaId = null, grupoId = null, grupoNombre = '', dias = 7, nota = '' }) {
  const expira = Timestamp.fromDate(new Date(Date.now() + dias * 24 * 60 * 60 * 1000))
  // Reintenta si el código generado ya existe (colisión improbable).
  for (let intento = 0; intento < 5; intento++) {
    const id = generarCodigo({ academiaId, grupoNombre, dias })
    const ref = doc(db, 'codigos', id)
    const ya = await getDoc(ref)
    if (ya.exists()) continue
    await setDoc(ref, {
      academiaId: academiaId || null,
      grupoId: grupoId || null,
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

// Canjea un código sobre el perfil del usuario: acceso hasta `expira` y, si el
// código trae academia/grupo, lo INTEGRA en ellos (marcado como esPrueba: al
// vencer pierde el acceso aunque siga listado, hasta meter un código real).
// Devuelve la fecha de fin.
export async function canjearCodigo(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  const snap = await getDoc(doc(db, 'codigos', cod))
  if (!snap.exists()) throw new Error('Ese código no existe.')
  const data = snap.data()
  if (data.estado !== 'activo') throw new Error('Ese código fue desactivado.')
  if (data.expira.toMillis() <= Date.now()) throw new Error('Ese código ya expiró.')

  const cambios = { codigoPrueba: cod, pruebaHasta: data.expira, esPrueba: true }
  // Integración a academia (solo si sigue activa) y a grupo (solo si sigue activo).
  if (data.academiaId) {
    const aca = await getDoc(doc(db, 'academias', data.academiaId))
    if (aca.exists() && aca.data().estado === 'activo') {
      cambios.academiaId = data.academiaId
      if (data.grupoId) {
        const grupo = await getDoc(doc(db, 'grupos', data.grupoId))
        if (grupo.exists() && grupo.data().estado === 'activo' && grupo.data().academiaId === data.academiaId) {
          cambios.grupoId = data.grupoId
        }
      }
    }
  }
  await updateDoc(doc(db, 'usuarios', uid), cambios)
  return data.expira
}

// ¿El perfil tiene un acceso de prueba vigente?
export function pruebaVigente(perfil) {
  const seg = perfil?.pruebaHasta?.seconds
  return Boolean(seg && seg * 1000 > Date.now())
}
