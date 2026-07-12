// ============================================================
//  Intentos de examen de fase — colección `intentos`
// ------------------------------------------------------------
//  Cada intento queda guardado con uid + academiaId, para que el alumno vea su
//  historial y su maestro/academia pueda revisar su avance por fase.
//  Nota: se ordena en el CLIENTE (where + orderBy en campos distintos exigiría
//  un índice compuesto en Firestore; así evitamos ese paso manual).
// ============================================================
import { db } from './init.js'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'

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

// Más reciente primero (orden en cliente).
function ordenar(docs) {
  return docs.sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
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
