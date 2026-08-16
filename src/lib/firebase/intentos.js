// ============================================================
//  Intentos de examen de módulo — colección `intentos`
// ------------------------------------------------------------
//  Cada intento queda guardado con uid + academiaId, para que el alumno vea su
//  historial y su maestro/academia pueda revisar su avance por módulo.
//  Nota: se ordena en el CLIENTE (where + orderBy en campos distintos exigiría
//  un índice compuesto en Firestore; así evitamos ese paso manual).
// ============================================================
import { db } from './init.js'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { normalizarIntentos } from '../compatNombres.js'

// Registra un intento de examen de módulo. Devuelve el porcentaje.
//
// `semilla`: con ella y el banco del módulo se REGENERA el examen exacto que
// vio el alumno (lib/examenModelo.js). Desde que el examen es un subconjunto
// del banco, sin este dato un intento es un porcentaje suelto y una
// reclamación de nota no se puede resolver: nadie sabe qué preguntas tocaron.
export async function guardarIntentoModulo({
  uid, nombre, academiaId, modulo, aciertos, total, semilla = null,
}) {
  const porcentaje = total ? Math.round((aciertos / total) * 100) : 0
  await addDoc(collection(db, 'intentos'), {
    uid,
    nombre: nombre || '',
    academiaId: academiaId || null,
    moduloId: modulo.id,
    moduloNumero: modulo.numero,
    moduloTitulo: modulo.titulo,
    aciertos,
    total,
    porcentaje,
    semilla: semilla || null,
    fecha: serverTimestamp(),
  })
  return porcentaje
}

// Más reciente primero (orden en cliente). Traduce de paso los intentos
// anteriores al renombrado (`faseId` → `moduloId`): son inmutables por regla,
// así que conservarán el nombre viejo siempre (ver lib/compatNombres.js).
function ordenar(docs) {
  return normalizarIntentos(docs).sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
}

// Intentos de un alumno (para su propio historial).
export async function intentosDeAlumno(uid) {
  const q = query(collection(db, 'intentos'), where('uid', '==', uid))
  const snap = await getDocs(q)
  return ordenar(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
}

// Intentos de toda una academia (para el panel del maestro/admin).
export async function intentosDeAcademia(academiaId) {
  const q = query(collection(db, 'intentos'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return ordenar(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
}

// TODOS los intentos de la plataforma (dashboard global del super-admin).
export async function listarIntentos() {
  const snap = await getDocs(collection(db, 'intentos'))
  return ordenar(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
}
