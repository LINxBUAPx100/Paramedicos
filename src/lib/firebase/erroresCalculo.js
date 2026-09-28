// Errores de cálculo del entrenador de farmacología en Firestore (PTEM Pulso).
// Un documento por alumno en `erroresCalculo/{uid}`; ver su regla en
// firestore.rules. Solo cuentas por tipo: nada del contenido ni respuestas.
import { db } from './init.js'
import { doc, setDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { NOMBRE_ERROR } from '../rutaFarmacos.js'

// Solo los tipos que la regla admite, como enteros no negativos.
function limpiar(errores = {}) {
  const out = {}
  for (const tipo of Object.keys(NOMBRE_ERROR)) {
    const n = Math.floor(Number(errores[tipo]) || 0)
    if (n > 0) out[tipo] = Math.min(n, 100000)
  }
  return out
}

export async function subirErroresCalculo({ uid, academiaId, grupoId = null, errores }) {
  if (!uid || !academiaId) return
  await setDoc(doc(db, 'erroresCalculo', uid), {
    uid, academiaId, grupoId: grupoId || null, errores: limpiar(errores), actualizado: serverTimestamp(),
  })
}

/** Documentos de la academia; con `grupoId`, solo los de ese grupo. */
export async function erroresDeGrupo({ academiaId, grupoId = null }) {
  const filtros = [where('academiaId', '==', academiaId)]
  if (grupoId) filtros.push(where('grupoId', '==', grupoId))
  const snap = await getDocs(query(collection(db, 'erroresCalculo'), ...filtros))
  return snap.docs.map((d) => d.data())
}
