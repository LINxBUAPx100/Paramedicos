// ============================================================
//  Plantillas GLOBALES del catálogo (solo super-admin)
// ------------------------------------------------------------
//  - `plantillas/{id}`         → metadatos + estructura ligera del curso.
//  - `plantillasTemas/{id__t}` → contenido de cada tema.
//  El seed de la plantilla oficial se construye desde `src/data` con la MISMA
//  lógica pura que las pruebas (contenidoModelo.js), así no hay dos verdades.
//  Las academias NO escriben plantillas: clonan una copia a su namespace.
// ============================================================
import { db } from './init.js'
import {
  collection, doc, getDoc, getDocs, setDoc, query, where, writeBatch, serverTimestamp,
} from 'firebase/firestore'
import { plantillaDesdeData, lotes, temaDocIdEnPlantilla } from '../contenidoModelo.js'

export const PLANTILLA_OFICIAL_ID = 'paramedico-tum'
export const PLANTILLA_OFICIAL_NOMBRE = 'Programa Paramédico (TUM)'

// Siembra (o re-siembra) la plantilla oficial desde el temario del bundle.
// Idempotente: reescribe los mismos doc-id. Lo ejecuta el super-admin una vez.
export async function importarPlantillaOficial({ onProgreso } = {}) {
  // El contenido pesado se importa de forma diferida solo al sembrar.
  const { fases, todosLosTemas } = await import('../../data/index.js')
  const { plantilla, temas } = plantillaDesdeData({
    id: PLANTILLA_OFICIAL_ID,
    nombre: PLANTILLA_OFICIAL_NOMBRE,
    tipoDestino: 'basico',
    version: 1,
    fases,
    todosLosTemas,
  })

  await setDoc(doc(db, 'plantillas', plantilla.id), {
    ...plantilla,
    actualizado: serverTimestamp(),
  })

  let hechos = 0
  for (const grupo of lotes(temas, 20)) {
    const batch = writeBatch(db)
    for (const t of grupo) {
      const { docId, ...datos } = t
      batch.set(doc(db, 'plantillasTemas', docId), datos)
    }
    await batch.commit()
    hechos += grupo.length
    onProgreso?.({ hechos, total: temas.length })
  }
  return { plantillaId: plantilla.id, temas: temas.length }
}

export async function listarPlantillas() {
  const snap = await getDocs(collection(db, 'plantillas'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function obtenerPlantilla(plantillaId) {
  const snap = await getDoc(doc(db, 'plantillas', plantillaId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// Todos los temas de una plantilla (para clonar). Consulta de un solo campo:
// no requiere índice compuesto.
export async function temasDePlantilla(plantillaId) {
  const q = query(collection(db, 'plantillasTemas'), where('plantillaId', '==', plantillaId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }))
}

export { temaDocIdEnPlantilla }
