// ============================================================
//  Editor estructural — capa de DATOS (Fase 3)
// ------------------------------------------------------------
//  ÚNICA puerta de escritura del editor. Los componentes NUNCA escriben
//  Firestore directamente: llaman estas operaciones, que:
//    1. validan permisos (permisoEdicion, espejo de las reglas),
//    2. aplican la operación PURA (editorModelo.js) fuera de aquí,
//    3. escriben en una TRANSACCIÓN con control de versión optimista
//       (si otro editor guardó antes, se lanza ConflictoVersion y la UI
//       recarga en lugar de pisar su trabajo),
//    4. registran la acción en `historial` (append-only).
//
//  Doble destino, misma API:
//    { modo:'academia',  academiaId }  → cursos/ + temas/        (director, prof., super)
//    { modo:'plantilla', plantillaId } → plantillas/ + plantillasTemas/ (SOLO super-admin)
//  El doc de plantilla se adapta a la forma de "curso" para reutilizar todo.
// ============================================================
import { auth, db } from './init.js'
import {
  collection, doc, getDoc, getDocs, setDoc, query, where,
  runTransaction, writeBatch, serverTimestamp,
} from 'firebase/firestore'
import {
  validarEstructura, esEstadoValido, validarTitulo, validarDescripcion,
  nuevoCurso, duplicadoDeCurso, permisoEdicion,
} from '../editorModelo.js'
import {
  permisoAccionEditor, permisosRequeridosPorContenido, tienePermisoEditor,
  ETIQUETA_PERMISO,
} from '../permisosEditor.js'
import { validarContenidoTema, normalizarContenido } from '../temaContenidoModelo.js'
import { validarReferenciasStorage } from '../archivosModelo.js'
import { lotes } from '../contenidoModelo.js'
import { registrarHistorial, limpiarCacheContenido } from './contenido.js'

export class ConflictoVersion extends Error {
  constructor() {
    super('Otra persona guardó cambios en este curso mientras editabas. Se recargó la última versión; revisa y vuelve a intentar.')
    this.name = 'ConflictoVersion'
  }
}

// ---------- destino (academia | plantilla) ----------

function coleccionesDe(destino) {
  if (destino?.modo === 'plantilla') {
    return { cursos: 'plantillas', temas: 'plantillasTemas' }
  }
  return { cursos: 'cursos', temas: 'temas' }
}

function idAcademiaDe(destino) {
  return destino?.modo === 'plantilla' ? `plantilla:${destino.plantillaId}` : destino.academiaId
}

// Valida permiso ANTES de tocar la red (las reglas son la barrera real).
// `accion` (opcional): exige además el permiso FINO del profesor para esa
// acción (crear/publicar/…); espejo de firestore.rules.
function exigirPermiso(contexto, destino, cursoId = null, accion = null) {
  if (destino?.modo === 'plantilla') {
    if (!contexto?.esSuperadmin) {
      throw new Error('Solo el administrador de la plataforma edita plantillas globales.')
    }
    return
  }
  const { permitido, motivo } = permisoEdicion({
    esSuperadmin: contexto?.esSuperadmin,
    rol: contexto?.rol,
    academiaIdUsuario: contexto?.academiaId,
    academiaIdObjetivo: destino?.academiaId,
    capacidades: contexto?.capacidades,
    perfil: contexto?.perfil,
    cursoId,
  })
  if (!permitido) throw new Error(motivo)
  if (accion) {
    const fino = permisoAccionEditor({
      esSuperadmin: contexto?.esSuperadmin,
      rol: contexto?.rol,
      perfil: contexto?.perfil,
      accion,
    })
    if (!fino.permitido) throw new Error(fino.motivo)
  }
}

function historialSeguro(datos) {
  // La auditoría no debe tumbar la operación principal si falla.
  return registrarHistorial({ origen: 'editor', ...datos }).catch(() => null)
}

// Campos base de un doc de tema NUEVO (sin contenido enriquecido: Fase 5).
function docTemaNuevo(destino, cursoDocId, temaId, titulo, uid) {
  const base = {
    temaId,
    titulo,
    icono: '',
    duracion: '',
    resumen: '',
    objetivos: [],
    secciones: [],
    conceptosClave: [],
    flashcards: [],
    quiz: [],
    recursos: null,
    actividades: null,
    estado: 'borrador',
    version: 1,
    creadoPor: uid,
    creadoEn: serverTimestamp(),
    actualizado: serverTimestamp(),
    actualizadoPor: uid,
  }
  return destino.modo === 'plantilla'
    ? { plantillaId: destino.plantillaId, ...base }
    : { academiaId: destino.academiaId, cursoId: cursoDocId, ...base }
}

// ---------- lecturas ----------

// Doc de la academia objetivo (el superadmin edita academias ajenas y
// necesita su doc para el candado de migración y las etiquetas).
export async function obtenerAcademiaEditor(academiaId) {
  const snap = await getDoc(doc(db, 'academias', academiaId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// Cursos del destino en TODOS los estados (vista del editor; el staff puede
// leerlos por reglas). Nunca consulta otra academia.
export async function listarCursosEditor(destino) {
  const col = coleccionesDe(destino)
  if (destino.modo === 'plantilla') {
    const snap = await getDoc(doc(db, col.cursos, destino.plantillaId))
    if (!snap.exists()) return []
    const p = snap.data()
    return [{
      id: snap.id,
      titulo: p.nombre || snap.id,
      descripcion: p.descripcion || '',
      estado: p.estado === 'publicada' ? 'publicado' : (p.estado || 'publicado'),
      estructura: p.estructura || [],
      version: p.version ?? 0,
      orden: 1,
      esPlantilla: true,
    }]
  }
  const snap = await getDocs(query(
    collection(db, col.cursos), where('academiaId', '==', destino.academiaId)
  ))
  return snap.docs
    .map((d) => ({ id: d.id, version: 0, ...d.data() }))
    .sort((a, b) => (a.orden ?? 1e9) - (b.orden ?? 1e9))
}

export async function temasDeCursoEditor(destino, cursoId) {
  const col = coleccionesDe(destino)
  const campo = destino.modo === 'plantilla' ? 'plantillaId' : 'cursoId'
  const snap = await getDocs(query(collection(db, col.temas), where(campo, '==', cursoId)))
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }))
}

export async function temaDelEditor(destino, cursoId, temaId) {
  const col = coleccionesDe(destino)
  const snap = await getDoc(doc(db, col.temas, `${cursoId}__${temaId}`))
  return snap.exists() ? { docId: snap.id, ...snap.data() } : null
}

// ---------- guardado transaccional de estructura ----------

// Guarda la ESTRUCTURA (ya transformada por editorModelo) + operaciones de
// tema asociadas, todo en UNA transacción con check de versión.
//   extras = {
//     camposCurso:     { titulo?, descripcion?, estado? }         (opcional)
//     temasNuevos:     [{ temaId, titulo }]                       (crearTema)
//     temasDuplicados: [{ origenId, nuevoId }]                    (duplicar)
//     temaCampos:      { temaId, campos: { titulo?, resumen? } }  (panel de tema)
//   }
export async function guardarEstructura(contexto, destino, cursoId, versionEsperada, estructura, accion, extras = {}) {
  exigirPermiso(contexto, destino, cursoId, accion)
  const errorEstructura = validarEstructura(estructura)
  if (errorEstructura) throw new Error(errorEstructura)
  const { camposCurso = null, temasNuevos = [], temasDuplicados = [], temaCampos = null } = extras
  if (camposCurso?.estado && !esEstadoValido(camposCurso.estado)) {
    throw new Error('Estado de curso inválido.')
  }
  const col = coleccionesDe(destino)
  const uid = auth.currentUser?.uid || null
  const cursoRef = doc(db, col.cursos, cursoId)

  const version = await runTransaction(db, async (tx) => {
    const cursoSnap = await tx.get(cursoRef)
    if (!cursoSnap.exists()) throw new Error('El curso ya no existe.')
    // Una plantilla PUBLICADA es inmutable (Fase 7): editarla exige abrir la
    // versión siguiente desde la administración de plantillas.
    if (destino?.modo === 'plantilla' && cursoSnap.data().estado === 'publicada') {
      throw new Error('Esta plantilla está publicada y su versión es inmutable: abre la siguiente versión para editarla.')
    }
    const actual = cursoSnap.data().version ?? 0
    if (actual !== versionEsperada) throw new ConflictoVersion()

    // Sincronía estructura ⇄ doc de tema: si la operación cambió el ESTADO de
    // entradas de tema, el doc correspondiente debe reflejarlo (la consulta
    // del alumno filtra por el estado del DOC). Se detecta por diff.
    const estadoAntes = new Map()
    for (const f of cursoSnap.data().estructura || []) {
      for (const m of f.modulos || []) {
        for (const t of m.temas || []) estadoAntes.set(t.id, t.estado || 'publicado')
      }
    }
    const temasEstadoCambiado = []
    for (const f of estructura) {
      for (const m of f.modulos || []) {
        for (const t of m.temas || []) {
          const antes = estadoAntes.get(t.id)
          const ahora = t.estado || 'publicado'
          if (antes !== undefined && antes !== ahora) {
            temasEstadoCambiado.push({ temaId: t.id, estado: ahora })
          }
        }
      }
    }

    // LECTURAS primero (regla de las transacciones de Firestore).
    const docsEstado = []
    for (const cambio of temasEstadoCambiado) {
      const snap = await tx.get(doc(db, col.temas, `${cursoId}__${cambio.temaId}`))
      if (snap.exists()) docsEstado.push({ cambio, version: snap.data().version ?? 0 })
    }
    const origenes = []
    for (const dup of temasDuplicados) {
      const snap = await tx.get(doc(db, col.temas, `${cursoId}__${dup.origenId}`))
      origenes.push({ dup, datos: snap.exists() ? snap.data() : null })
    }
    let temaEditado = null
    if (temaCampos) {
      const snap = await tx.get(doc(db, col.temas, `${cursoId}__${temaCampos.temaId}`))
      if (!snap.exists()) throw new Error('El tema ya no existe.')
      temaEditado = snap.data()
    }

    // Curso: estructura + metadatos de historial básico + versión estricta +1.
    tx.update(cursoRef, {
      ...(camposCurso || {}),
      estructura,
      version: actual + 1,
      actualizado: serverTimestamp(),
      actualizadoPor: uid,
      ultimaAccion: accion,
    })

    for (const { cambio, version: vTema } of docsEstado) {
      tx.update(doc(db, col.temas, `${cursoId}__${cambio.temaId}`), {
        estado: cambio.estado,
        version: vTema + 1,
        actualizado: serverTimestamp(),
        actualizadoPor: uid,
      })
    }
    for (const t of temasNuevos) {
      tx.set(doc(db, col.temas, `${cursoId}__${t.temaId}`),
        docTemaNuevo(destino, cursoId, t.temaId, t.titulo, uid))
    }
    for (const { dup, datos } of origenes) {
      const base = docTemaNuevo(destino, cursoId, dup.nuevoId, '', uid)
      const copia = datos ? { ...datos } : {}
      delete copia.creadoPor; delete copia.creadoEn
      delete copia.actualizado; delete copia.actualizadoPor; delete copia.version
      tx.set(doc(db, col.temas, `${cursoId}__${dup.nuevoId}`), {
        ...base,
        ...copia,
        temaId: dup.nuevoId,
        estado: 'borrador',
        duplicadoDe: dup.origenId,
        ...(destino.modo === 'plantilla'
          ? { plantillaId: destino.plantillaId }
          : { academiaId: destino.academiaId, cursoId }),
      })
    }
    if (temaCampos && temaEditado) {
      if ('titulo' in temaCampos.campos) {
        const e = validarTitulo(temaCampos.campos.titulo)
        if (e) throw new Error(e)
      }
      if ('resumen' in temaCampos.campos) {
        const e = validarDescripcion(temaCampos.campos.resumen)
        if (e) throw new Error(e)
      }
      tx.update(doc(db, col.temas, `${cursoId}__${temaCampos.temaId}`), {
        ...temaCampos.campos,
        version: (temaEditado.version ?? 0) + 1,
        actualizado: serverTimestamp(),
        actualizadoPor: uid,
      })
    }
    return actual + 1
  })

  // La copia servida a los alumnos de esta academia queda obsoleta.
  if (destino.modo === 'academia') limpiarCacheContenido(destino.academiaId)
  await historialSeguro({
    academiaId: idAcademiaDe(destino), accion,
    coleccion: col.cursos, docId: cursoId,
    despues: { version },
  })
  return { version }
}

// ---------- contenido enriquecido del tema (Fase 4) ----------

// Guarda el CONTENIDO interno de un tema (secciones/bloques, objetivos,
// conceptos, flashcards, quiz con ponderaciones, recursos, actividades) en
// una transacción con control de versión sobre el DOC del tema.
//  - Solo campos de contenido (CAMPOS_CONTENIDO_TEMA): el estado, los ids y
//    los metadatos administrativos se manejan por sus propias operaciones.
//  - Valida el contenido completo Y que ninguna referencia de Storage apunte
//    al almacenamiento de otra academia.
export async function guardarContenidoTema(contexto, destino, cursoId, temaId, versionEsperada, contenido, accion = 'editar-contenido-tema') {
  exigirPermiso(contexto, destino, cursoId)
  const errorContenido = validarContenidoTema(contenido)
  if (errorContenido) throw new Error(errorContenido)
  if (destino.modo === 'academia') {
    const errorRefs = validarReferenciasStorage(contenido, destino.academiaId)
    if (errorRefs) throw new Error(errorRefs)
  }
  const col = coleccionesDe(destino)
  const temaRef = doc(db, col.temas, `${cursoId}__${temaId}`)
  const uid = auth.currentUser?.uid || null
  // El profesor solo cambia quiz/actividades/recursos si tiene el permiso fino
  // (espejo de camposTemaSegunPermisos en firestore.rules). Se compara el
  // contenido ANTES/DESPUÉS ya normalizado, tolerante al vacío (no falso
  // positivo cuando no lo tocó). Director/super no pasan por esta rejilla.
  const esInstructor = !contexto?.esSuperadmin && contexto?.rol === 'instructor'

  const version = await runTransaction(db, async (tx) => {
    if (destino.modo === 'plantilla') {
      const plantillaSnap = await tx.get(doc(db, col.cursos, cursoId))
      if (plantillaSnap.exists() && plantillaSnap.data().estado === 'publicada') {
        throw new Error('Esta plantilla está publicada y su versión es inmutable: abre la siguiente versión para editarla.')
      }
    }
    const snap = await tx.get(temaRef)
    if (!snap.exists()) throw new Error('El tema ya no existe.')
    const actual = snap.data().version ?? 0
    if (actual !== versionEsperada) throw new ConflictoVersion()
    if (esInstructor) {
      const antes = normalizarContenido(snap.data())
      const requeridos = permisosRequeridosPorContenido(antes, contenido)
      const faltante = requeridos.find((p) => !tienePermisoEditor(contexto?.perfil, p))
      if (faltante) {
        throw new Error(`No tienes el permiso "${ETIQUETA_PERMISO[faltante]}" para ese cambio. Pídelo al director de tu academia.`)
      }
    }
    tx.update(temaRef, {
      ...contenido,
      version: actual + 1,
      actualizado: serverTimestamp(),
      actualizadoPor: uid,
      ultimaAccion: accion,
    })
    return actual + 1
  })

  if (destino.modo === 'academia') limpiarCacheContenido(destino.academiaId)
  await historialSeguro({
    academiaId: idAcademiaDe(destino), accion,
    coleccion: col.temas, docId: `${cursoId}__${temaId}`,
    despues: { version },
  })
  return { version }
}

// ---------- operaciones de curso ----------

export async function crearCursoEditor(contexto, destino, { titulo, descripcion = '' }) {
  exigirPermiso(contexto, destino)
  if (destino.modo === 'plantilla') {
    throw new Error('Las plantillas se crean desde el flujo de migración, no desde el editor.')
  }
  const existentes = await listarCursosEditor(destino)
  const cursoDoc = nuevoCurso({
    academiaId: destino.academiaId,
    titulo,
    descripcion,
    cursosExistentes: existentes,
    uid: auth.currentUser?.uid || null,
    maxCursos: contexto?.esSuperadmin ? null : contexto?.capacidades?.maxCursos ?? null,
  })
  const { docId, ...datos } = cursoDoc
  await setDoc(doc(db, 'cursos', docId), {
    ...datos,
    creadoEn: serverTimestamp(),
    actualizado: serverTimestamp(),
    actualizadoPor: datos.creadoPor,
    ultimaAccion: 'crear-curso',
  })
  await historialSeguro({
    academiaId: destino.academiaId, accion: 'crear-curso', coleccion: 'cursos', docId,
    despues: { titulo: datos.titulo },
  })
  return { id: docId, ...datos }
}

// Título/descripción/estado del curso (sin tocar estructura).
export async function actualizarCursoEditor(contexto, destino, cursoId, versionEsperada, campos, accion = 'editar-curso') {
  exigirPermiso(contexto, destino, cursoId, accion)
  if ('titulo' in campos) {
    const e = validarTitulo(campos.titulo)
    if (e) throw new Error(e)
  }
  if ('descripcion' in campos) {
    const e = validarDescripcion(campos.descripcion)
    if (e) throw new Error(e)
  }
  if ('estado' in campos && !esEstadoValido(campos.estado)) {
    throw new Error('Estado de curso inválido.')
  }
  const col = coleccionesDe(destino)
  const cursoRef = doc(db, col.cursos, cursoId)
  const uid = auth.currentUser?.uid || null
  const version = await runTransaction(db, async (tx) => {
    const snap = await tx.get(cursoRef)
    if (!snap.exists()) throw new Error('El curso ya no existe.')
    const actual = snap.data().version ?? 0
    if (actual !== versionEsperada) throw new ConflictoVersion()
    const datos = { ...campos }
    // En modo plantilla el "título" vive en `nombre`.
    if (destino.modo === 'plantilla' && 'titulo' in datos) {
      datos.nombre = datos.titulo
      delete datos.titulo
      delete datos.estado // el estado de una plantilla no se maneja aquí
    }
    tx.update(cursoRef, {
      ...datos,
      version: actual + 1,
      actualizado: serverTimestamp(),
      actualizadoPor: uid,
      ultimaAccion: accion,
    })
    return actual + 1
  })
  if (destino.modo === 'academia') limpiarCacheContenido(destino.academiaId)
  await historialSeguro({
    academiaId: idAcademiaDe(destino), accion, coleccion: col.cursos, docId: cursoId,
    despues: { ...campos, version },
  })
  return { version }
}

// Reordena los cursos de la academia: escribe SOLO los docs cuyo `orden`
// cambió (no toda la lista).
export async function reordenarCursosEditor(contexto, destino, cursosEnOrden) {
  exigirPermiso(contexto, destino)
  if (destino.modo === 'plantilla') return { cambiados: 0 }
  const batch = writeBatch(db)
  const uid = auth.currentUser?.uid || null
  let cambiados = 0
  cursosEnOrden.forEach((curso, i) => {
    const orden = i + 1
    if (curso.orden !== orden) {
      batch.update(doc(db, 'cursos', curso.id), {
        orden,
        version: (curso.version ?? 0) + 1,
        actualizado: serverTimestamp(),
        actualizadoPor: uid,
        ultimaAccion: 'reordenar-cursos',
      })
      cambiados++
    }
  })
  if (cambiados) await batch.commit()
  await historialSeguro({
    academiaId: destino.academiaId, accion: 'reordenar-cursos', coleccion: 'cursos',
    docId: destino.academiaId, despues: { cambiados },
  })
  // El resolutor sirve el primer curso publicado: el orden le cambia la fuente.
  if (cambiados) limpiarCacheContenido(destino.academiaId)
  return { cambiados }
}

// Duplica un curso COMPLETO dentro de la misma academia (estructura + temas;
// nunca progreso/intentos/calificaciones).
export async function duplicarCursoEditor(contexto, destino, curso) {
  exigirPermiso(contexto, destino, curso?.id, 'duplicar-curso')
  if (destino.modo === 'plantilla') {
    throw new Error('Duplicar plantillas completas llega con la replicación (fase posterior).')
  }
  const uid = auth.currentUser?.uid || null
  const temasDocs = await temasDeCursoEditor(destino, curso.id)
  const existentes = await listarCursosEditor(destino)
  const { curso: nuevo, temas } = duplicadoDeCurso({
    curso, temasDocs, cursosExistentes: existentes, uid,
    maxCursos: contexto?.esSuperadmin ? null : contexto?.capacidades?.maxCursos ?? null,
  })
  const { docId, ...datosCurso } = nuevo
  await setDoc(doc(db, 'cursos', docId), {
    ...datosCurso,
    creadoEn: serverTimestamp(),
    actualizado: serverTimestamp(),
    actualizadoPor: uid,
    ultimaAccion: 'duplicar-curso',
  })
  for (const grupo of lotes(temas, 20)) {
    const batch = writeBatch(db)
    for (const t of grupo) {
      const { docId: temaDocId, ...datos } = t
      delete datos.creadoPor; delete datos.creadoEn
      delete datos.actualizado; delete datos.actualizadoPor
      batch.set(doc(db, 'temas', temaDocId), {
        ...datos,
        version: 1,
        creadoPor: uid,
        creadoEn: serverTimestamp(),
        actualizado: serverTimestamp(),
        actualizadoPor: uid,
      })
    }
    await batch.commit()
  }
  await historialSeguro({
    academiaId: destino.academiaId, accion: 'duplicar-curso', coleccion: 'cursos', docId,
    antes: { origen: curso.id }, despues: { titulo: datosCurso.titulo, temas: temas.length },
  })
  return { id: docId, ...datosCurso }
}
