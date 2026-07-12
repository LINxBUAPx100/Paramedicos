// ============================================================
//  Intentos de examen de fase — colección `intentos`
// ------------------------------------------------------------
//  Cada intento queda guardado con uid + academiaId, para que el alumno vea su
//  historial y su maestro/academia pueda revisar su avance por fase.
// ============================================================
import { db } from './init.js'
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'

// Registra un intento de examen de fase. Devuelve el porcentaje.
export async function guardarIntentoFase({ uid, nombre, academiaId, fase, aciertos, total }) {
  const porcentaje = total ? Math.round((aciertos / total) * 100) : 0
  await addDoc(collection(db, 'intentos'), {
    uid,
    nombre: nombre || '',
    academiaId: academiaId || null,
    faseId: fase.id,
    faseNumero: fase.numero,
    faseTitulo: fase.titulo,
    aciertos,
    total,
    porcentaje,
    fecha: serverTimestamp(),
  })
  return porcentaje
}

// Intentos de un alumno (para su propio historial). Orden: más reciente primero.
export async function intentosDeAlumno(uid) {
  const q = query(collection(db, 'intentos'), where('uid', '==', uid), orderBy('fecha', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Intentos de toda una academia (para el panel del maestro/admin).
export async function intentosDeAcademia(academiaId) {
  const q = query(
    collection(db, 'intentos'),
    where('academiaId', '==', academiaId),
    orderBy('fecha', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
