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
  academiaMigrada, ensamblarModulos, construirApi, construirApiBajoDemanda,
  indiceDesdeEstructura, indiceDesdeModulos, temaDesdeDoc,
} from '../contenidoApi.js'
import {
  leerAgregado, escribirAgregadosDeCurso, selloDeAgregados, agregadosUtilizables,
} from './agregados.js'
import { huellaTema } from '../replicacionModelo.js'
import { programasVisibles, programasDeGrupo } from '../programasModelo.js'
import { cursosDelUsuario, cursoAServir } from '../cursosDelUsuario.js'
import { obtenerPlantilla, temasDePlantilla } from './plantillas.js'
import { contenidoVacio } from '../contenidoVacio.js'

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

    // AGREGADOS antes de dar la clonación por completa. Se generan desde los
    // mismos temas que se acaban de escribir, no releyéndolos de Firestore:
    // serían 287 lecturas para producir lo que ya está en memoria.
    //
    // Un fallo aquí NO invalida la clonación: los temas ya están y el curso
    // funciona por el camino completo. Se registra y se sigue; el sello que
    // escribe `escribirAgregadosDeCurso` es lo que activa el camino barato, y
    // sin él el resolutor no lo intenta.
    // Un fallo aquí NO invalida la clonación, pero SÍ tiene que quedar escrito.
    //
    // Antes solo se registraba con `console.warn`, y eso resultó ser lo mismo
    // que no registrarlo: R.E.S.C.A.T.E. se migró el 31-08-2026 y sus agregados
    // nunca se escribieron. La clonación se dio por completa, nadie vio la
    // consola de quien clonó, y el único síntoma —cada carga costando 288
    // lecturas en vez de 3— tardó semanas en salir a la luz, y por casualidad.
    //
    // Ahora el resultado viaja en el documento del curso, así que se puede ver
    // en el panel y consultar después. Un aviso que solo vive en una consola
    // cerrada no es un aviso.
    let resultadoAgregados = 'ok'
    let motivoAgregados = null
    try {
      const temasPorId = new Map(temas.map((t) => [t.temaId, t]))
      const { modulos } = ensamblarModulos(curso.estructura, temasPorId, { incluirBorradores: true })
      await escribirAgregadosDeCurso({
        academiaId, cursoId, version,
        modulos: construirApi(modulos).modulos,
      })
    } catch (err) {
      resultadoAgregados = 'fallo'
      motivoAgregados = String(err?.message || err).slice(0, 300)
      console.warn(`[contenido] Agregados no generados para ${cursoId}:`, motivoAgregados)
    }

    await updateDoc(doc(db, 'cursos', cursoId), {
      'clonacion.completa': true,
      'clonacion.agregados': resultadoAgregados,
      'clonacion.agregadosMotivo': motivoAgregados,
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

/**
 * Cursos que esta persona puede leer, PIDIENDO SOLO LOS SUYOS.
 *
 * Antes se listaba `where(academiaId) + where(estado)` y se filtraba después en
 * el cliente. Parecía inofensivo y no lo era: en Firestore, la regla de un
 * `list` se evalúa contra CADA documento del resultado, y si UNO falla se
 * deniega la consulta ENTERA. Basta con que la academia tenga publicado un
 * curso en el que el alumno no está inscrito —el caso normal en cuanto haya
 * más de una carrera— para que el alumno no pueda leer NINGUNO.
 *
 * Y el fallo era silencioso de la peor manera: el resolutor caía a legacy, o
 * sea al bundle, o sea al temario de R.E.S.C.A.T.E. Medido el 31-08-2026 en el
 * emulador con una academia migrada y verificada: la consulta se denegaba
 * («Null value error» en la regla de `cursos`) y el alumno seguía viendo el
 * temario del paquete creyendo que era el suyo.
 *
 * Ahora, si se sabe qué programas cursa, se piden UNO A UNO por id. Un `get`
 * se evalúa contra su propio documento, así que no puede fallar por culpa de
 * un curso ajeno. De paso son menos lecturas: un alumno tiene uno o dos
 * programas, y la academia puede tener diez.
 *
 * El staff y el super-admin siguen listando: su regla (`esStaffDe`) sí es
 * cierta para todos los documentos de su academia, y necesitan verlos todos.
 */
async function cursosVisibles(academiaId, acceso) {
  const ids = acceso ? programasDeGrupo(acceso.grupo) : []
  const esAlumno = acceso && !acceso.esSuperadmin && acceso.rol === 'alumno'

  if (!esAlumno || ids.length === 0) return cursosDeAcademia(academiaId)

  const docs = await Promise.all(ids.map((id) => obtenerCurso(id).catch(() => null)))
  return docs
    .filter((c) => c && c.academiaId === academiaId && c.estado === 'publicado')
    .sort((a, b) => (a.orden ?? 1e9) - (b.orden ?? 1e9))
}

// Filtro de aislamiento por programa en el cliente; la barrera real son las
// reglas (firestore.rules), esto solo evita servir lo que no toca.
function cursosPermitidos(cursos, acceso) {
  if (!acceso) return cursos
  return programasVisibles(cursos, {
    rol: acceso.rol,
    esSuperadmin: acceso.esSuperadmin,
    grupo: acceso.grupo,
  })
}

// EL FALLBACK AL BUNDLE SE APAGÓ (trabajo P2, 31-08-2026).
//
// Antes esto devolvía `src/data/index.js`: el temario de R.E.S.C.A.T.E.
// compilado dentro de la aplicación. Servía de red cuando Firestore no
// respondía, y a cambio obligaba a publicar 4,3 MB con las 287 lecciones y las
// respuestas de todos los exámenes, descargables sin cuenta. Además, a una
// academia que no fuera R.E.S.C.A.T.E. le enseñaba material ajeno en silencio.
//
// Ahora, sin contenido propio no hay contenido. Las pantallas ya sabían
// enseñar su estado vacío; lo que faltaba era dejar de taparlo.
function contenidoLegacy(motivo = '') {
  if (!cacheContenido.has(CLAVE_LEGACY)) {
    cacheContenido.set(CLAVE_LEGACY, Promise.resolve(contenidoVacio(motivo)))
  }
  return cacheContenido.get(CLAVE_LEGACY)
}

async function cargarDeFirestore(academiaId, acceso, cursoPreferido = null) {
  const todos = await cursosVisibles(academiaId, acceso)
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
  if (!academiaId || !academiaMigrada(academia)) {
    return contenidoLegacy(academiaId
      ? `La academia ${academiaId} todavía no tiene su contenido migrado.`
      : 'Sin academia: no hay temario que servir.')
  }
  const clave = claveContenido(academiaId, acceso, cursoPreferido)
  if (!cacheContenido.has(clave)) {
    cacheContenido.set(
      clave,
      cargarDeFirestore(academiaId, acceso, cursoPreferido).catch((err) => {
        // Se avisa SIEMPRE: antes esto caía al bundle y el fallo quedaba
        // invisible —la persona veía un temario y nadie se enteraba de que no
        // era el suyo—. Ahora se ve el estado vacío, que es la verdad.
        console.warn(`[contenido] Sin contenido para ${academiaId}:`, err?.message || err)
        cacheContenido.delete(clave)
        return contenidoLegacy(err?.message || 'No se pudo cargar el temario.')
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
        const todos = await cursosVisibles(academiaId, acceso)
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
          // Sello de agregados del curso. Viaja con el índice porque el doc del
          // curso ya se leyó aquí: así el resolutor bajo demanda sabe si puede
          // usar el camino barato sin gastar otra lectura para averiguarlo.
          agregados: curso.agregados || null,
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
export async function indicePorAcademiaId(academiaId, cursoPreferido = null) {
  if (!academiaId) return null
  const snap = await getDoc(doc(db, 'academias', academiaId))
  if (!snap.exists()) return null
  // Solo la usa el super-admin desde /admin y /temario: ve la academia entera,
  // sin filtro de programa (es quien la gestiona, no quien la cursa).
  //
  // `cursoPreferido` llegó cuando el panel de la academia pasó a poder
  // administrar VARIOS cursos: sin él, el panel enseñaba siempre el primero
  // —el de paramédico— y no había forma de mirar las cifras de enfermería.
  return indiceDeAcademia({ id: snap.id, ...snap.data() }, { esSuperadmin: true }, cursoPreferido)
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


// ============================================================
//  RESOLUTOR BAJO DEMANDA (Fase 1)
// ------------------------------------------------------------
//  `contenidoDeAcademia` sigue existiendo y sigue siendo correcto: baja el
//  curso entero y responde todo en memoria. El problema es el precio —287
//  lecturas y ~3 MB por alumno y sesión, 57 400 lecturas cuando 200 alumnos
//  abren clase a la vez—, no el resultado.
//
//  Esta puerta devuelve la MISMA información pidiendo solo lo que hace falta:
//  el índice ya está cargado por el shell, la lección es una lectura y cada
//  vista derivada lee su agregado. Abrir una lección pasa de 287 a 3.
//
//  Tres caminos, y el orden importa:
//
//   1. Academia migrada CON agregados al día → lectura por tema. El objetivo.
//   2. Academia migrada SIN agregados (curso clonado antes de esta fase, o
//      recién editado) → carga completa de SU Firestore, envuelta en la misma
//      interfaz. Cuesta lo de antes y es correcta.
//   3. Academia sin migrar → bundle, también envuelto.
//
//  El caso 2 NO puede caer al bundle, y por eso está separado del 3: el bundle
//  es el temario genérico, y servírselo a una academia migrada le enseñaría
//  contenido que no es el suyo creyendo que sí lo es. Es el mismo fallo que ya
//  destapó el CI en `temasDeCurso`, y aquí sería silencioso.
// ============================================================

const cacheBajoDemanda = new Map()

/**
 * Envuelve una API COMPLETA (la de siempre) en la interfaz bajo demanda.
 *
 * No ahorra nada: el contenido ya está entero en memoria. Existe para que las
 * pantallas hablen una sola interfaz y no tengan que preguntar de dónde viene
 * lo que reciben, que es la regla de este archivo desde el principio.
 */
async function envolverApiCompleta(api) {
  const { construirAgregados } = await import('../agregadosModelo.js')
  const { porModulo, globales } = construirAgregados(api.modulos)
  const porId = new Map(porModulo.map((m) => [m.moduloId, m]))
  const temas = new Map(api.todosLosTemas.map((t) => [t.id, t]))
  return construirApiBajoDemanda({
    indice: api.indice || { ...indiceDesdeModulos(api.modulos), stats: api.stats },
    fuente: api.fuente,
    academiaId: api.academiaId || null,
    cursoId: api.cursoId || null,
    cursos: api.cursos || [],
    cargarTema: async (temaId) => temas.get(temaId) || null,
    cargarAgregado: async (tipo, moduloId) =>
      (moduloId ? porId.get(moduloId)?.[tipo] : globales[tipo]) ?? null,
  })
}

// Camino 1: lectura por tema. Devuelve null si este curso todavía no puede
// servirse así, para que el llamante elija el camino correcto.
async function bajoDemandaDeFirestore(academia, acceso, cursoPreferido) {
  const indice = await indiceDeAcademia(academia, acceso, cursoPreferido)
  if (!indice?.cursoId) return null
  const { cursoId, academiaId } = indice
  // Una lectura para saber si los agregados están completos y al día.
  if (!agregadosUtilizables(await selloDeAgregados(cursoId))) return null
  return construirApiBajoDemanda({
    indice,
    fuente: 'firestore',
    academiaId,
    cursoId,
    cursos: indice.cursos || [],
    cargarTema: async (temaId) => {
      const docTema = await temaDeCurso(cursoId, temaId)
      return docTema ? temaDesdeDoc(docTema) : null
    },
    cargarAgregado: (tipo, moduloId) => leerAgregado(cursoId, tipo, moduloId),
  })
}

/**
 * Contenido del curso servido POR TEMA. Misma información que
 * `contenidoDeAcademia`, sin bajar las 287 lecciones.
 *
 * @param {Object} academia doc de la academia (como lo expone AuthContext).
 * @param {Object} acceso   { rol, esSuperadmin, grupo } de quien pide.
 * @param {string} cursoPreferido curso elegido en el selector, si lo hay.
 */
export async function contenidoBajoDemandaDeAcademia(academia, acceso = null, cursoPreferido = null) {
  const academiaId = academia?.id
  const clave = claveContenido(academiaId || 'legacy', acceso, cursoPreferido)
  if (!cacheBajoDemanda.has(clave)) {
    cacheBajoDemanda.set(
      clave,
      (async () => {
        if (academiaId && academiaMigrada(academia)) {
          const barato = await bajoDemandaDeFirestore(academia, acceso, cursoPreferido)
          if (barato) return barato
        }
        // Camino 2 o 3 según la academia. `contenidoDeAcademia` ya decide entre
        // su Firestore y el bundle, y ya cae a legacy solo si de verdad falla;
        // aquí solo hay que envolver lo que devuelva.
        return envolverApiCompleta(await contenidoDeAcademia(academia, acceso, cursoPreferido))
      })().catch((err) => {
        console.warn(`[contenido] Bajo demanda no disponible para ${academiaId}:`, err?.message || err)
        cacheBajoDemanda.delete(clave)
        return null
      })
    )
  }
  return cacheBajoDemanda.get(clave)
}

/**
 * Regenera los agregados de un curso tras editar su contenido.
 *
 * Sin esto, quien edita una lección ve su cambio en la lección pero NO en el
 * examen, el buscador ni el glosario: esas pantallas leen el agregado, que
 * seguiría con el texto anterior.
 *
 * Relee los temas del curso a propósito. Son 287 lecturas, pero las paga UNA
 * persona al editar y no doscientos alumnos al entrar a clase, y es la única
 * forma de que el agregado refleje el curso entero y no solo la lección que se
 * acaba de tocar. Si el coste llegara a molestar, el paso siguiente es
 * reconstruir solo el módulo afectado y rehacer los globales desde los
 * agregados por módulo, sin volver a leer ningún tema.
 */
export async function regenerarAgregados(academiaId, cursoId) {
  if (!academiaId || !cursoId) throw new Error('regenerarAgregados: faltan academiaId o cursoId.')
  const curso = await obtenerCurso(cursoId)
  if (!curso) throw new Error(`No existe el curso ${cursoId}.`)
  const sello = await selloDeAgregados(cursoId)
  const temas = await temasDeCurso(cursoId, { academiaId, soloPublicados: false })
  const temasPorId = new Map(temas.map((t) => [t.temaId, t]))
  const { modulos } = ensamblarModulos(curso.estructura, temasPorId, { incluirBorradores: true })
  const resultado = await escribirAgregadosDeCurso({
    academiaId,
    cursoId,
    modulos: construirApi(modulos).modulos,
    version: (sello?.version || 0) + 1,
  })
  limpiarCacheContenido(academiaId)
  cacheBajoDemanda.clear()
  return resultado
}

// Temporizadores de regeneración por curso.
const regeneracionPendiente = new Map()

/**
 * Programa la regeneración de agregados tras editar, agrupando ráfagas.
 *
 * Un editor no guarda una lección: guarda quince seguidas. Regenerar en cada
 * guardado serían quince pasadas completas sobre el curso para un resultado que
 * solo importa al final. Se espera a que la ráfaga pare.
 *
 * Mientras tanto el sello está en `desactualizado` y los alumnos se sirven por
 * el camino completo: más caro, pero nunca con el contenido anterior. Si la
 * pestaña se cierra antes de que salte el temporizador, el sello se queda
 * caducado y el siguiente guardado —o la acción manual del panel— lo arregla.
 * Ese caso degrada el coste, nunca la corrección.
 */
export function programarRegeneracionAgregados(academiaId, cursoId, { esperaMs = 15000 } = {}) {
  if (!academiaId || !cursoId) return
  const anterior = regeneracionPendiente.get(cursoId)
  if (anterior) clearTimeout(anterior)
  regeneracionPendiente.set(
    cursoId,
    setTimeout(() => {
      regeneracionPendiente.delete(cursoId)
      regenerarAgregados(academiaId, cursoId).catch((err) => {
        // No se reintenta en bucle: el sello sigue caducado, así que el
        // contenido servido es correcto y el siguiente guardado lo reintenta.
        console.warn(`[agregados] Regeneración fallida de ${cursoId}:`, err?.message || err)
      })
    }, esperaMs)
  )
}
