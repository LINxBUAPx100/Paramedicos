// ============================================================
//  Contenido POR ACADEMIA: clonación desde plantillas + resolutor
// ------------------------------------------------------------
//  - `cursos/{academiaId__plantillaId}`        → estructura ligera del curso.
//  - `temas/{academiaId__plantillaId__temaId}` → contenido de cada tema.
//  Cada academia opera SU copia: nunca dos academias escriben el mismo doc
//  (ids deterministas con el academiaId como prefijo = namespace propio).
//
//  El RESOLUTOR (`contenidoDeAcademia`) es la ÚNICA puerta de la app al
//  contenido: decide entre la copia de Firestore (academia 'migrado') y el
//  bundle legacy `src/data` (todo lo demás), y devuelve SIEMPRE la misma
//  interfaz que src/data/index.js. Los componentes no eligen la fuente.
// ============================================================
import { auth, db } from './init.js'
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc,
  query, where, writeBatch, serverTimestamp,
} from 'firebase/firestore'
import {
  cursoIdDe, lotes, cursoDesdePlantilla, docsClonadosParaAcademia,
} from '../contenidoModelo.js'
import {
  academiaMigrada, ensamblarFases, construirApi,
  indiceDesdeEstructura, indiceDesdeFases,
} from '../contenidoApi.js'
import { obtenerPlantilla, temasDePlantilla } from './plantillas.js'

// --- Estado de migración de la academia (academias/{id}.contenido) ---------
// Solo lo escribe el super-admin (las reglas del doc de academia ya lo acotan:
// el director únicamente puede tocar logo/lema/colorHero).
async function marcarEstadoContenido(academiaId, datos) {
  await setDoc(
    doc(db, 'academias', academiaId),
    { contenido: { ...datos, actualizado: serverTimestamp() } },
    { merge: true }
  )
}

// --- Historial (auditoría append-only) --------------------------------------
export async function registrarHistorial({
  academiaId, accion, coleccion, docId, antes = null, despues = null, origen = 'app',
}) {
  const uid = auth.currentUser?.uid
  if (!uid) return null
  const ref = await addDoc(collection(db, 'historial'), {
    academiaId, usuario: uid, accion, coleccion, docId, antes, despues, origen,
    fecha: serverTimestamp(),
  })
  return ref.id
}

// --- Clonación plantilla → academia -----------------------------------------
// Idempotente: los doc-id son deterministas, así que reejecutar REESCRIBE los
// mismos documentos (nunca duplica) y sirve para reanudar una clonación
// interrumpida. Secuencia:
//   1. academia.contenido.estado = 'migrando'
//   2. doc del curso con clonacion.completa = false
//   3. temas en lotes (writeBatch ≤ 20 por lote)
//   4. clonacion.completa = true → academia.contenido.estado = 'migrado'
//   En error: academia.contenido.estado = 'error' (y se relanza).
export async function clonarPlantillaAAcademia({ academiaId, plantillaId, onProgreso }) {
  if (!academiaId || !plantillaId) {
    throw new Error('clonarPlantillaAAcademia: faltan academiaId o plantillaId.')
  }
  const academiaSnap = await getDoc(doc(db, 'academias', academiaId))
  if (!academiaSnap.exists()) throw new Error(`No existe la academia ${academiaId}.`)
  const plantilla = await obtenerPlantilla(plantillaId)
  if (!plantilla) throw new Error(`No existe la plantilla ${plantillaId}.`)
  const plantillaTemas = await temasDePlantilla(plantillaId)
  if (!plantillaTemas.length) throw new Error(`La plantilla ${plantillaId} no tiene temas.`)

  const version = plantilla.version ?? 1
  await marcarEstadoContenido(academiaId, { estado: 'migrando', plantillaId, version })
  try {
    const curso = cursoDesdePlantilla({ academiaId, plantilla })
    const { cursoId, temas } = docsClonadosParaAcademia({ academiaId, plantillaId, plantillaTemas })

    const { docId, ...datosCurso } = curso
    await setDoc(doc(db, 'cursos', docId), {
      ...datosCurso,
      clonacion: { plantillaId, version, completa: false, fecha: serverTimestamp() },
      actualizado: serverTimestamp(),
      actualizadoPor: auth.currentUser?.uid || null,
    })

    let hechos = 0
    for (const grupo of lotes(temas, 20)) {
      const batch = writeBatch(db)
      for (const t of grupo) {
        const { docId: temaDocId, ...datos } = t
        batch.set(doc(db, 'temas', temaDocId), {
          ...datos,
          version,
          actualizado: serverTimestamp(),
        })
      }
      await batch.commit()
      hechos += grupo.length
      onProgreso?.({ hechos, total: temas.length })
    }

    await updateDoc(doc(db, 'cursos', cursoId), {
      'clonacion.completa': true,
      actualizado: serverTimestamp(),
    })
    await marcarEstadoContenido(academiaId, { estado: 'migrado', plantillaId, version })
    await registrarHistorial({
      academiaId, accion: 'clonar-plantilla', coleccion: 'cursos', docId: cursoId,
      despues: { plantillaId, version, temas: temas.length },
    }).catch(() => null)
    return { cursoId, temas: temas.length }
  } catch (err) {
    await marcarEstadoContenido(academiaId, {
      estado: 'error', plantillaId, version, detalle: String(err?.message || err),
    }).catch(() => null)
    throw err
  }
}

// Verifica si la clonación de una academia está completa (detecta parciales).
export async function verificarClonacion({ academiaId, plantillaId }) {
  const cursoId = cursoIdDe(academiaId, plantillaId)
  const cursoSnap = await getDoc(doc(db, 'cursos', cursoId))
  if (!cursoSnap.exists()) return { existe: false, completa: false, faltantes: [] }
  const curso = cursoSnap.data()
  const esperados = (curso.estructura || []).flatMap((f) =>
    (f.modulos || []).flatMap((m) => (m.temas || []).map((t) => t.id))
  )
  const snap = await getDocs(query(collection(db, 'temas'), where('cursoId', '==', cursoId)))
  const presentes = new Set(snap.docs.map((d) => d.data().temaId))
  const faltantes = esperados.filter((id) => !presentes.has(id))
  return {
    existe: true,
    completa: Boolean(curso.clonacion?.completa) && faltantes.length === 0,
    faltantes,
  }
}

// --- Lecturas por academia ----------------------------------------------------
export async function cursosDeAcademia(academiaId, { soloPublicados = true } = {}) {
  const filtros = [where('academiaId', '==', academiaId)]
  if (soloPublicados) filtros.push(where('estado', '==', 'publicado'))
  const snap = await getDocs(query(collection(db, 'cursos'), ...filtros))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.orden ?? 1e9) - (b.orden ?? 1e9))
}

export async function obtenerCurso(cursoId) {
  const snap = await getDoc(doc(db, 'cursos', cursoId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function estructuraDeCurso(cursoId) {
  const curso = await obtenerCurso(cursoId)
  return curso?.estructura || null
}

export async function temasDeCurso(cursoId, { soloPublicados = true } = {}) {
  const filtros = [where('cursoId', '==', cursoId)]
  if (soloPublicados) filtros.push(where('estado', '==', 'publicado'))
  const snap = await getDocs(query(collection(db, 'temas'), ...filtros))
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }))
}

export async function temaDeCurso(cursoId, temaId) {
  const snap = await getDoc(doc(db, 'temas', `${cursoId}__${temaId}`))
  return snap.exists() ? { docId: snap.id, ...snap.data() } : null
}

// --- RESOLUTOR ------------------------------------------------------------
// Caché por academiaId: nunca se mezclan resultados entre academias (cada
// entrada del Map es de UNA academia; legacy tiene su propia entrada aparte).
const cacheContenido = new Map()
const CLAVE_LEGACY = '__legacy__'

function contenidoLegacy() {
  if (!cacheContenido.has(CLAVE_LEGACY)) {
    cacheContenido.set(
      CLAVE_LEGACY,
      import('../../data/index.js').then((mod) => ({ ...mod, fuente: 'legacy' }))
    )
  }
  return cacheContenido.get(CLAVE_LEGACY)
}

async function cargarDeFirestore(academiaId) {
  const cursos = await cursosDeAcademia(academiaId)
  if (!cursos.length) throw new Error(`La academia ${academiaId} no tiene cursos publicados.`)
  const curso = cursos[0] // multi-curso real llega con el editor (Fase 4)
  if (!curso.clonacion?.completa) {
    throw new Error(`El curso ${curso.id} tiene una clonación incompleta.`)
  }
  const temas = await temasDeCurso(curso.id)
  const temasPorId = new Map(temas.map((t) => [t.temaId, t]))
  const { fases, faltantes } = ensamblarFases(curso.estructura, temasPorId)
  if (faltantes.length) {
    throw new Error(`Faltan ${faltantes.length} temas del curso ${curso.id}: ${faltantes.slice(0, 5).join(', ')}…`)
  }
  const api = construirApi(fases)
  return {
    ...api,
    // Índice ligero EXACTO del contenido cargado (para el shell/nav).
    indice: { ...indiceDesdeFases(api.fases), stats: api.stats, fuente: 'firestore' },
    fuente: 'firestore',
    academiaId,
    cursoId: curso.id,
  }
}

// ÚNICA puerta de la app al contenido académico. Recibe la academia del
// usuario (doc con id, como la expone AuthContext) y devuelve la API de
// contenido (misma forma que src/data/index.js) + `fuente`.
//  - Academia 'migrado'  → su copia de Firestore.
//  - Cualquier otro caso → bundle legacy (src/data) sin tocar Firestore.
//  - Si la carga de Firestore falla (parcial, permisos, red) → fallback a
//    legacy y se limpia la caché para poder reintentar después.
export async function contenidoDeAcademia(academia) {
  const academiaId = academia?.id
  if (!academiaId || !academiaMigrada(academia)) return contenidoLegacy()
  if (!cacheContenido.has(academiaId)) {
    cacheContenido.set(
      academiaId,
      cargarDeFirestore(academiaId).catch((err) => {
        console.warn(`[contenido] Fallback a legacy para ${academiaId}:`, err?.message || err)
        cacheContenido.delete(academiaId)
        return contenidoLegacy()
      })
    )
  }
  return cacheContenido.get(academiaId)
}

// --- Índice ligero por academia (para el shell: nav, home, temario, panel) --
// Solo baja el DOC DEL CURSO (1 lectura) y deriva la misma forma que
// src/data/navIndice.js. Caché por academiaId, separada del contenido pesado.
const cacheIndices = new Map()

export async function indiceDeAcademia(academia) {
  const academiaId = academia?.id
  // Sin academia o sin migrar: el shell sigue usando el índice del bundle.
  if (!academiaId || !academiaMigrada(academia)) return null
  if (!cacheIndices.has(academiaId)) {
    cacheIndices.set(
      academiaId,
      (async () => {
        const cursos = await cursosDeAcademia(academiaId)
        if (!cursos.length) throw new Error(`La academia ${academiaId} no tiene cursos publicados.`)
        const curso = cursos[0] // mismo criterio que el resolutor de contenido
        if (!curso.clonacion?.completa) throw new Error(`El curso ${curso.id} tiene una clonación incompleta.`)
        return {
          ...indiceDesdeEstructura(curso.estructura),
          fuente: 'firestore',
          academiaId,
          cursoId: curso.id,
        }
      })().catch((err) => {
        console.warn(`[contenido] Índice legacy para ${academiaId}:`, err?.message || err)
        cacheIndices.delete(academiaId)
        return null
      })
    )
  }
  return cacheIndices.get(academiaId)
}

// Variante por ID (superadmin gestionando OTRA academia): baja su doc para
// conocer el estado de migración y reutiliza indiceDeAcademia.
export async function indicePorAcademiaId(academiaId) {
  if (!academiaId) return null
  const snap = await getDoc(doc(db, 'academias', academiaId))
  if (!snap.exists()) return null
  return indiceDeAcademia({ id: snap.id, ...snap.data() })
}

// Limpia la caché (logout, cambio de academia, después de clonar/editar).
export function limpiarCacheContenido(academiaId) {
  if (academiaId) {
    cacheContenido.delete(academiaId)
    cacheIndices.delete(academiaId)
  } else {
    cacheContenido.clear()
    cacheIndices.clear()
  }
}
