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
  collection, doc, getDoc, getDocs, query, where,
} from 'firebase/firestore'
import { temaDocIdEnPlantilla } from '../contenidoModelo.js'

export const PLANTILLA_OFICIAL_ID = 'paramedico-tum'
export const PLANTILLA_OFICIAL_NOMBRE = 'Programa Paramédico (TUM)'

// LA SIEMBRA DE LA PLANTILLA OFICIAL YA NO VIVE AQUÍ.
//
// `importarPlantillaOficial` construía la plantilla desde `src/data` con un
// `import('../../data/index.js')` diferido. Dos problemas:
//
//   · No la llamaba NADIE. Ninguna pantalla la usaba: era código muerto.
//   · Y aun así arrastraba el temario entero —4,3 MB— al archivo publicado,
//     porque un import dinámico no saca el código de la aplicación: lo mueve a
//     otro archivo que se sirve igual de abierto.
//
// La siembra se hace con `scripts/migrar-contenido.mjs --seed`, que corre en
// una terminal con credenciales y no necesita que el temario viaje al
// navegador de nadie. Ver el bloque P del plan (trabajo P2).

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
