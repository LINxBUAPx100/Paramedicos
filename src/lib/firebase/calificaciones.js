// ============================================================
//  Libro de calificaciones — capa de datos
// ------------------------------------------------------------
//  Dos colecciones: `evaluaciones` (lo que el maestro crea) y `calificaciones`
//  (la nota de un alumno en una evaluación). Toda la aritmética vive en
//  `lib/calificacionesModelo.js`; aquí solo se lee y se escribe.
//
//  Las consultas filtran SIEMPRE por `academiaId`, y no por comodidad: en un
//  `list`, Firestore evalúa las reglas contra los FILTROS de la consulta, no
//  contra los documentos. Una consulta sin ese filtro se deniega entera, y el
//  cliente se lo tragaría mostrando una tabla vacía como si no hubiera notas.
// ============================================================
import { db, auth } from './init.js'
import {
  collection, doc, deleteDoc, getDocs, query, where, setDoc, updateDoc,
  serverTimestamp, writeBatch,
} from 'firebase/firestore'
import { idCalificacion, validarValor } from '../calificacionesModelo.js'

const uidActual = () => auth.currentUser?.uid || null

// --- Evaluaciones ------------------------------------------------------------

export async function listarEvaluaciones(academiaId) {
  if (!academiaId) return []
  const q = query(collection(db, 'evaluaciones'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    // Por fecha ascendente: el libro se lee en el orden en que se evaluó. Se
    // ordena en el cliente para no necesitar un índice compuesto.
    .sort((a, b) => (a.fecha?.seconds || 0) - (b.fecha?.seconds || 0))
}

export async function crearEvaluacion({
  academiaId, grupoId = null, titulo, descripcion = '', ponderacion = 1, fecha = null,
  fechaEntrega = null, enlace = '',
}) {
  const limpio = String(titulo || '').trim()
  if (!academiaId) throw new Error('Falta la academia.')
  if (!limpio) throw new Error('Escribe el título de la evaluación.')
  const pond = Number(ponderacion)
  if (!Number.isFinite(pond) || pond <= 0) throw new Error('La ponderación debe ser un número mayor que 0.')
  const ref = doc(collection(db, 'evaluaciones'))
  await setDoc(ref, {
    academiaId,
    grupoId,
    titulo: limpio.slice(0, 120),
    descripcion: String(descripcion || '').slice(0, 500),
    ponderacion: pond,
    escala: 100,
    fecha: fecha || serverTimestamp(),
    // La fecha de ENTREGA es del alumno y es distinta de `fecha` (creación).
    // Llega como 'YYYY-MM-DD' de un <input type="date">: se guarda como Date a
    // las 23:59 locales, porque «entregar el día 20» incluye el día 20 entero.
    fechaEntrega: fechaEntrega ? new Date(`${fechaEntrega}T23:59:59`) : null,
    enlace: String(enlace || '').trim().slice(0, 500),
    creadoPor: uidActual(),
    creadoEn: serverTimestamp(),
  })
  return { id: ref.id }
}

export async function actualizarEvaluacion(id, cambios) {
  await updateDoc(doc(db, 'evaluaciones', id), cambios)
}

// Borra la evaluación Y sus notas. Las notas primero: si se borrara la
// evaluación antes y fallara el resto, quedarían calificaciones huérfanas que
// nadie puede ver ni limpiar desde la interfaz.
export async function borrarEvaluacion(id, academiaId) {
  const notas = await listarCalificaciones(academiaId)
  const suyas = notas.filter((c) => c.evaluacionId === id)
  for (let i = 0; i < suyas.length; i += 200) {
    const batch = writeBatch(db)
    for (const c of suyas.slice(i, i + 200)) batch.delete(doc(db, 'calificaciones', c.id))
    await batch.commit()
  }
  await deleteDoc(doc(db, 'evaluaciones', id))
  return suyas.length
}

// --- Calificaciones ----------------------------------------------------------

export async function listarCalificaciones(academiaId) {
  if (!academiaId) return []
  const q = query(collection(db, 'calificaciones'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Las de UN alumno. Filtra por uid porque es lo que su regla exige poder
// comprobar: sin ese filtro, un alumno recibe permission-denied.
export async function misCalificacionesDe(uid, academiaId) {
  if (!uid || !academiaId) return []
  const q = query(
    collection(db, 'calificaciones'),
    where('academiaId', '==', academiaId),
    where('uid', '==', uid)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Pone o corrige una nota. Id determinista, así que reintentar no duplica.
export async function guardarCalificacion({ evaluacionId, academiaId, grupoId = null, uid, valor, nota = '' }) {
  const error = validarValor(valor)
  if (error) throw new Error(error)
  const id = idCalificacion(evaluacionId, uid)
  if (!id) throw new Error('Falta la evaluación o el alumno.')
  await setDoc(doc(db, 'calificaciones', id), {
    evaluacionId,
    academiaId,
    grupoId,
    uid,
    valor: Number(valor),
    nota: String(nota || '').slice(0, 300),
    calificadoPor: uidActual(),
    calificadoEn: serverTimestamp(),
  })
  return { id }
}

// Quitar una nota (dejar la celda vacía) NO es lo mismo que poner un 0: un 0 es
// un juicio y una celda vacía es «todavía no evaluado». Por eso se borra el
// documento en vez de escribir un cero.
export async function quitarCalificacion(evaluacionId, uid) {
  const id = idCalificacion(evaluacionId, uid)
  if (!id) return
  await deleteDoc(doc(db, 'calificaciones', id))
}
