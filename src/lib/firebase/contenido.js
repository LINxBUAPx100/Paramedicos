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
  academiaMigrada, ensamblarModulos, construirApi,
  indiceDesdeEstructura, indiceDesdeModulos,
} from '../contenidoApi.js'
import { huellaTema } from '../replicacionModelo.js'
import { programasVisibles, programasDeGrupo } from '../programasModelo.js'
import { cursosDelUsuario, cursoAServir } from '../cursosDelUsuario.js'
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

// Rastro de cambios de una academia, recientes primero. El filtro por
// academiaId es el que la regla `list` necesita para evaluarse (misma lección
// que `temasDeCurso`): sin él, la consulta entera se deniega.
// Solo lo lee el director de esa academia o el super-admin.
export async function historialDeAcademia(academiaId, { limite = 25 } = {}) {
  const q = query(collection(db, 'historial'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
    .slice(0, limite)
}

// --- Activar la copia editable SIN clonar nada ------------------------------
// El editor exigía que la academia estuviera «migrada», y migrar era clonar una
// plantilla, algo que solo podía hacer el super-admin desde otra pantalla. Un
// director que quisiera montar su temario desde cero se topaba con un cartel
// que le decía que pidiera ayuda. Esto enciende la copia y ya.
//
// No deja a nadie sin temario mientras se construye: sin cursos PUBLICADOS,
// `indiceDeAcademia` y `contenidoDeAcademia` lanzan y sus llamantes caen al
// bundle, así que los alumnos siguen viendo el contenido estándar hasta que su
// academia publique el suyo.
export async function activarCopiaEditable(academiaId) {
  if (!academiaId) throw new Error('activarCopiaEditable: falta academiaId.')
  await marcarEstadoContenido(academiaId, { estado: 'migrado', plantillaId: null, version: 1, origen: 'desde-cero' })
  await registrarHistorial({
    academiaId, accion: 'activar-copia-editable', coleccion: 'academias', docId: academiaId,
    despues: { estado: 'migrado', origen: 'desde-cero' },
  }).catch(() => null)
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
          // SELLO de origen (Fase 7): huella del contenido tal como se recibió.
          // Permite a la replicación distinguir "modificado por la academia"
          // de "cambiado en la plantilla" sin depender de updatedAt.
          origen: { plantillaId, version, hash: huellaTema(datos), replicacionId: 'clonacion' },
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
    (f.unidades || []).flatMap((m) => (m.temas || []).map((t) => t.id))
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

// OJO con el filtro de academiaId: NO es redundante aunque cursoId ya empiece
// por el código de la academia. En una consulta `list`, las reglas de Firestore
// se evalúan contra los campos que FILTRA la consulta, no contra el documento;
// sin este filtro, `resource.data.academiaId` es undefined en la regla, la
// evaluación revienta y el alumno recibe permission-denied.
//
// El fallo era invisible: ContenidoContext traga ese error y cae al temario del
// bundle, así que una academia migrada mostraba el contenido genérico como si
// fuera el suyo. Lo destapó el CI (tests/rules/contenido.rules.test.mjs).
export async function temasDeCurso(cursoId, { academiaId = null, soloPublicados = true } = {}) {
  const filtros = [where('cursoId', '==', cursoId)]
  if (academiaId) filtros.push(where('academiaId', '==', academiaId))
  if (soloPublicados) filtros.push(where('estado', '==', 'publicado'))
  const snap = await getDocs(query(collection(db, 'temas'), ...filtros))
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }))
}

export async function temaDeCurso(cursoId, temaId) {
  const snap = await getDoc(doc(db, 'temas', `${cursoId}__${temaId}`))
  return snap.exists() ? { docId: snap.id, ...snap.data() } : null
}

// --- RESOLUTOR ------------------------------------------------------------
// Caché por academia Y POR ALCANCE DE PROGRAMAS: dos personas de la misma
// academia en grupos distintos reciben contenido DISTINTO (un alumno de
// Enfermería no ve TUM), así que la clave no puede ser solo el academiaId.
// Si lo fuera, el primero en cargar dejaría su temario en caché para el resto.
const cacheContenido = new Map()
const CLAVE_LEGACY = '__legacy__'

// Alcance normalizado de una persona: qué programas puede ver.
//  - staff/superadmin → '*' (todos los de su academia)
//  - alumno           → sus programas ordenados (clave estable)
function claveAlcance(acceso) {
  if (!acceso) return '*'
  const { rol, esSuperadmin } = acceso
  if (esSuperadmin || rol === 'instructor' || rol === 'admin_escuela') return '*'
  const ids = programasDeGrupo(acceso.grupo)
  return ids.length ? [...ids].sort().join(',') : '∅'
}

// El CURSO entra en la clave: dos cursos de la misma academia y el mismo
// alcance son contenidos distintos, y sin esto el segundo se serviría desde
// la caché del primero.
const claveContenido = (academiaId, acceso, cursoPreferido = null) =>
  `${academiaId}||${claveAlcance(acceso)}||${cursoPreferido || "auto"}`

// Cursos de la academia que ESTA persona puede ver. Es el filtro de
// aislamiento por programa en el cliente; la barrera real son las reglas
// (firestore.rules), esto solo evita pedir lo que se va a rechazar.
function cursosPermitidos(cursos, acceso) {
  if (!acceso) return cursos
  return programasVisibles(cursos, {
    rol: acceso.rol,
    esSuperadmin: acceso.esSuperadmin,
    grupo: acceso.grupo,
  })
}

function contenidoLegacy() {
  if (!cacheContenido.has(CLAVE_LEGACY)) {
    cacheContenido.set(
      CLAVE_LEGACY,
      import('../../data/index.js').then((mod) => ({ ...mod, fuente: 'legacy' }))
    )
  }
  return cacheContenido.get(CLAVE_LEGACY)
}

async function cargarDeFirestore(academiaId, acceso, cursoPreferido = null) {
  const todos = await cursosDeAcademia(academiaId)
  if (!todos.length) throw new Error(`La academia ${academiaId} no tiene cursos publicados.`)
  const cursos = cursosPermitidos(todos, acceso)
  if (!cursos.length) {
    // NO es un error de datos: es el aislamiento funcionando. Cae a legacy
    // igual que cualquier otro fallo del resolutor, pero la ruta protegida
    // ya habrá bloqueado antes a quien no tiene programa (programasModelo).
    throw new Error(`Sin programas visibles en ${academiaId} para este usuario.`)
  }
  // El curso que ESTA persona está estudiando. Antes era siempre `cursos[0]`:
  // con dos programas (una carrera y su especialización, o una academia que
  // imparte paramédico y enfermería) el segundo era inalcanzable, daba igual
  // lo que se pulsara. `cursoAServir` respeta la elección PERO nunca sirve un
  // curso fuera del alcance: el aislamiento no lo decide el cliente.
  const elegido = cursoAServir(cursosDelUsuario(cursos, acceso || {}), cursoPreferido)
  const curso = cursos.find((c) => c.id === elegido) || cursos[0]
  if (!curso.clonacion?.completa) {
    throw new Error(`El curso ${curso.id} tiene una clonación incompleta.`)
  }
  // academiaId es OBLIGATORIO aquí: es el camino del ALUMNO y su regla de
  // lectura se apoya en ese campo (ver el comentario de temasDeCurso).
  const temas = await temasDeCurso(curso.id, { academiaId })
  const temasPorId = new Map(temas.map((t) => [t.temaId, t]))
  const { modulos, faltantes } = ensamblarModulos(curso.estructura, temasPorId)
  if (faltantes.length) {
    throw new Error(`Faltan ${faltantes.length} temas del curso ${curso.id}: ${faltantes.slice(0, 5).join(', ')}…`)
  }
  const api = construirApi(modulos)
  return {
    ...api,
    // Índice ligero EXACTO del contenido cargado (para el shell/nav).
    indice: { ...indiceDesdeModulos(api.modulos), stats: api.stats, fuente: 'firestore' },
    fuente: 'firestore',
    academiaId,
    cursoId: curso.id,
    // Los cursos que esta persona puede estudiar, ya filtrados. Viajan con
    // el contenido porque la lectura ya está hecha: el Home no paga otra.
    cursos: cursosDelUsuario(cursos, acceso || {}, curso.id),
  }
}

// ÚNICA puerta de la app al contenido académico. Recibe la academia del
// usuario (doc con id, como la expone AuthContext) y devuelve la API de
// contenido (misma forma que src/data/index.js) + `fuente`.
//  - Academia 'migrado'  → su copia de Firestore.
//  - Cualquier otro caso → bundle legacy (src/data) sin tocar Firestore.
//  - Si la carga de Firestore falla (parcial, permisos, red) → fallback a
//    legacy y se limpia la caché para poder reintentar después.
//  `acceso` = { rol, esSuperadmin, grupo } de quien pide. Determina QUÉ
//  programas ve (aislamiento por programa) y forma parte de la clave de caché.
export async function contenidoDeAcademia(academia, acceso = null, cursoPreferido = null) {
  const academiaId = academia?.id
  if (!academiaId || !academiaMigrada(academia)) return contenidoLegacy()
  const clave = claveContenido(academiaId, acceso, cursoPreferido)
  if (!cacheContenido.has(clave)) {
    cacheContenido.set(
      clave,
      cargarDeFirestore(academiaId, acceso, cursoPreferido).catch((err) => {
        console.warn(`[contenido] Fallback a legacy para ${academiaId}:`, err?.message || err)
        cacheContenido.delete(clave)
        return contenidoLegacy()
      })
    )
  }
  return cacheContenido.get(clave)
}

// --- Índice ligero por academia (para el shell: nav, home, temario, panel) --
// Solo baja el DOC DEL CURSO (1 lectura) y deriva la misma forma que
// src/data/navIndice.js. Caché por academiaId, separada del contenido pesado.
const cacheIndices = new Map()

export async function indiceDeAcademia(academia, acceso = null, cursoPreferido = null) {
  const academiaId = academia?.id
  // Sin academia o sin migrar: el shell sigue usando el índice del bundle.
  if (!academiaId || !academiaMigrada(academia)) return null
  const clave = claveContenido(academiaId, acceso, cursoPreferido)
  if (!cacheIndices.has(clave)) {
    cacheIndices.set(
      clave,
      (async () => {
        const todos = await cursosDeAcademia(academiaId)
        if (!todos.length) throw new Error(`La academia ${academiaId} no tiene cursos publicados.`)
        // MISMO filtro que el contenido completo: si el nav mostrara módulos
        // de un programa ajeno, el alumno vería títulos que no puede abrir.
        const cursos = cursosPermitidos(todos, acceso)
        if (!cursos.length) throw new Error(`Sin programas visibles en ${academiaId} para este usuario.`)
        // Mismo criterio que el resolutor de contenido: el nav y el temario
        // tienen que hablar del MISMO curso que se está sirviendo.
        const elegido = cursoAServir(cursosDelUsuario(cursos, acceso || {}), cursoPreferido)
        const curso = cursos.find((c) => c.id === elegido) || cursos[0]
        if (!curso.clonacion?.completa) throw new Error(`El curso ${curso.id} tiene una clonación incompleta.`)
        return {
          ...indiceDesdeEstructura(curso.estructura),
          fuente: 'firestore',
          academiaId,
          cursoId: curso.id,
          cursos: cursosDelUsuario(cursos, acceso || {}, curso.id),
        }
      })().catch((err) => {
        console.warn(`[contenido] Índice legacy para ${academiaId}:`, err?.message || err)
        cacheIndices.delete(clave)
        return null
      })
    )
  }
  return cacheIndices.get(clave)
}

// Variante por ID (superadmin gestionando OTRA academia): baja su doc para
// conocer el estado de migración y reutiliza indiceDeAcademia.
export async function indicePorAcademiaId(academiaId) {
  if (!academiaId) return null
  const snap = await getDoc(doc(db, 'academias', academiaId))
  if (!snap.exists()) return null
  // Solo la usa el super-admin desde /admin y /temario: ve la academia entera,
  // sin filtro de programa (es quien la gestiona, no quien la cursa).
  return indiceDeAcademia({ id: snap.id, ...snap.data() }, { esSuperadmin: true })
}

// Limpia la caché (logout, cambio de academia, después de clonar/editar).
// Las claves son `${academiaId}||${alcance}`, así que limpiar UNA academia es
// borrar TODAS sus entradas: si solo se borrara la clave exacta, quedarían
// vivos los alcances de otros grupos con la estructura vieja.
export function limpiarCacheContenido(academiaId) {
  if (academiaId) {
    const prefijo = `${academiaId}||`
    for (const clave of [...cacheContenido.keys()]) {
      if (clave.startsWith(prefijo)) cacheContenido.delete(clave)
    }
    for (const clave of [...cacheIndices.keys()]) {
      if (clave.startsWith(prefijo)) cacheIndices.delete(clave)
    }
  } else {
    cacheContenido.clear()
    cacheIndices.clear()
  }
}
