// ============================================================
//  Plantillas y replicación — capa de DATOS del SUPER-ADMIN (Fase 7)
// ------------------------------------------------------------
//  Única puerta de escritura de plantillas/versiones/replicaciones. Todas
//  las operaciones exigen super-admin en las REGLAS (la barrera real); esta
//  capa además valida antes de tocar la red y aplica el modelo PURO
//  (plantillasModelo.js / replicacionModelo.js).
//
//  Escala: el navegador solo aplica operaciones ACOTADAS
//  (≤ MAX_DESTINOS_CLIENTE academias por operación, lotes ≤ 20 escrituras).
//  Las replicaciones masivas se ejecutan con el script privado
//  `scripts/replicar-contenido.mjs` (firebase-admin, dry-run por defecto),
//  que reutiliza este MISMO modelo puro — nunca con reglas permisivas.
//
//  Nada aquí toca progreso, intentos, calificaciones, usuarios ni grupos.
// ============================================================
import { auth, db } from './init.js'
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc,
  query, where, orderBy, limit, startAfter, writeBatch, runTransaction,
  serverTimestamp,
} from 'firebase/firestore'
import { lotes, clonProfundo, cursoIdDe } from '../contenidoModelo.js'
import {
  ESTADOS_PLANTILLA, normalizarMetadatosPlantilla, validarMetadatosPlantilla,
  puedePublicarPlantilla, prepararNuevaVersion,
  snapshotDeVersion, versionDocId, cambiosEntreVersiones,
  plantillaDesdeCurso, slugPlantilla,
} from '../plantillasModelo.js'
import {
  ESTRATEGIA_DEFAULT, ESTRATEGIAS, puedeTransicionar, compararCurso,
  accionesPorEstrategia, validarCompatibilidad, planParaAcademia,
  verificarRespaldo, planDeRollback, fraseConfirmacion, resumenDeOperacion,
  huellaTema, huellaEstructura,
} from '../replicacionModelo.js'
import { registrarHistorial, limpiarCacheContenido, temasDeCurso, obtenerCurso } from './contenido.js'

// Límite de academias destino que la UI puede APLICAR directamente. Más
// destinos = usar el script privado (backend seguro), nunca el navegador.
export const MAX_DESTINOS_CLIENTE = 5

function uidActual() {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Sesión no válida.')
  return uid
}

// ============================================================
//  PLANTILLAS: catálogo, metadatos y ciclo de vida
// ============================================================

export async function listarPlantillasAdmin() {
  const snap = await getDocs(collection(db, 'plantillas'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => String(a.nombre || a.id).localeCompare(String(b.nombre || b.id)))
}

export async function crearPlantillaVacia({ nombre, descripcion = '', categoria = '', tipoDestino = 'basico', planesCompatibles }) {
  const meta = normalizarMetadatosPlantilla({ nombre, descripcion, categoria, tipoDestino, planesCompatibles })
  const error = validarMetadatosPlantilla(meta)
  if (error) throw new Error(error)
  const id = slugPlantilla(nombre)
  const ref = doc(db, 'plantillas', id)
  const ya = await getDoc(ref)
  if (ya.exists()) throw new Error(`Ya existe una plantilla con el id "${id}".`)
  await setDoc(ref, {
    id, ...meta,
    version: 1, estado: 'borrador', origen: 'manual',
    estructura: [],
    creadaPor: uidActual(), creadaEn: serverTimestamp(),
    actualizadaPor: uidActual(), actualizado: serverTimestamp(),
  })
  await registrarHistorial({
    academiaId: 'plataforma', accion: 'crear-plantilla', coleccion: 'plantillas', docId: id,
  }).catch(() => null)
  return { id }
}

// Metadatos SIEMPRE editables (no son contenido); el contenido de una
// publicada es inmutable (editor bloqueado por puedeEditarPlantilla).
export async function actualizarMetadatosPlantilla(plantillaId, meta) {
  const m = normalizarMetadatosPlantilla(meta)
  const error = validarMetadatosPlantilla(m)
  if (error) throw new Error(error)
  await updateDoc(doc(db, 'plantillas', plantillaId), {
    ...m, actualizadaPor: uidActual(), actualizado: serverTimestamp(),
  })
}

export async function cambiarEstadoPlantilla(plantillaId, estado) {
  if (!ESTADOS_PLANTILLA.includes(estado)) throw new Error(`Estado inválido: ${estado}`)
  await updateDoc(doc(db, 'plantillas', plantillaId), {
    estado, actualizadaPor: uidActual(), actualizado: serverTimestamp(),
  })
  await registrarHistorial({
    academiaId: 'plataforma', accion: `plantilla-${estado}`, coleccion: 'plantillas', docId: plantillaId,
  }).catch(() => null)
}

export async function duplicarPlantilla(plantillaId, nuevoNombre) {
  const original = await getDoc(doc(db, 'plantillas', plantillaId))
  if (!original.exists()) throw new Error('La plantilla origen no existe.')
  const datos = original.data()
  const id = slugPlantilla(nuevoNombre || `${datos.nombre} copia`)
  const ya = await getDoc(doc(db, 'plantillas', id))
  if (ya.exists()) throw new Error(`Ya existe una plantilla con el id "${id}".`)
  const temasSnap = await getDocs(query(collection(db, 'plantillasTemas'), where('plantillaId', '==', plantillaId)))

  await setDoc(doc(db, 'plantillas', id), {
    ...clonProfundo(datos),
    id,
    nombre: nuevoNombre || `${datos.nombre} (copia)`,
    version: 1, estado: 'borrador', origen: 'duplicado',
    plantillaOrigenId: plantillaId,
    creadaPor: uidActual(), creadaEn: serverTimestamp(),
    actualizadaPor: uidActual(), actualizado: serverTimestamp(),
    publicadaEn: null,
  })
  for (const grupo of lotes(temasSnap.docs, 20)) {
    const batch = writeBatch(db)
    for (const d of grupo) {
      const t = d.data()
      batch.set(doc(db, 'plantillasTemas', `${id}__${t.temaId}`), {
        ...clonProfundo(t), plantillaId: id,
      })
    }
    await batch.commit()
  }
  return { id, temas: temasSnap.size }
}

// Crea una plantilla global (borrador) desde el CURSO de una academia.
// Bloquea contenido con referencias privadas de Storage (modelo puro).
export async function crearPlantillaDesdeCursoAcademia({ cursoId, meta }) {
  const curso = await obtenerCurso(cursoId)
  if (!curso) throw new Error('El curso origen no existe.')
  const temas = await temasDeCurso(cursoId, { soloPublicados: false })
  const { plantilla, temas: temasPlantilla } = plantillaDesdeCurso({
    plantillaId: meta?.id, meta, curso, temas, autor: uidActual(),
  })
  const ya = await getDoc(doc(db, 'plantillas', plantilla.id))
  if (ya.exists()) throw new Error(`Ya existe una plantilla con el id "${plantilla.id}".`)

  await setDoc(doc(db, 'plantillas', plantilla.id), {
    ...plantilla, creadaEn: serverTimestamp(),
    actualizadaPor: uidActual(), actualizado: serverTimestamp(),
  })
  for (const grupo of lotes(temasPlantilla, 20)) {
    const batch = writeBatch(db)
    for (const t of grupo) {
      const { docId, ...datos } = t
      batch.set(doc(db, 'plantillasTemas', docId), datos)
    }
    await batch.commit()
  }
  await registrarHistorial({
    academiaId: curso.academiaId, accion: 'plantilla-desde-curso',
    coleccion: 'plantillas', docId: plantilla.id,
    despues: { cursoOrigenId: cursoId, temas: temasPlantilla.length },
  }).catch(() => null)
  return { id: plantilla.id, temas: temasPlantilla.length }
}

// ============================================================
//  VERSIONADO: publicar snapshots inmutables y consultarlos
// ============================================================

export async function publicarVersionPlantilla(plantillaId, { notas = '' } = {}) {
  const snap = await getDoc(doc(db, 'plantillas', plantillaId))
  if (!snap.exists()) throw new Error('La plantilla no existe.')
  const plantilla = { id: snap.id, ...snap.data() }
  const gate = puedePublicarPlantilla(plantilla)
  if (!gate.permitido) throw new Error(gate.motivo)

  const version = plantilla.version ?? 1
  const vRef = doc(db, 'plantillasVersiones', versionDocId(plantillaId, version))
  const vSnap = await getDoc(vRef)
  if (vSnap.exists()) {
    throw new Error(`La versión ${version} ya fue publicada y es inmutable: crea la versión siguiente.`)
  }

  const temasSnap = await getDocs(query(collection(db, 'plantillasTemas'), where('plantillaId', '==', plantillaId)))
  const temas = temasSnap.docs.map((d) => ({ docId: d.id, ...d.data() }))
  const { docVersion, docsTemas } = snapshotDeVersion({
    plantilla, temas, autor: uidActual(), notas,
  })

  // Cambios frente a la versión anterior (si existe) para las notas.
  let cambios = null
  if (version > 1) {
    const prev = await temasDeVersion(plantillaId, version - 1).catch(() => null)
    if (prev) cambios = cambiosEntreVersiones({ temasAnterior: prev, temasNueva: docsTemas })
  }

  const { docId: vDocId, ...datosVersion } = docVersion
  await setDoc(vRef, {
    ...datosVersion, cambios, fecha: serverTimestamp(),
  })
  for (const grupo of lotes(docsTemas, 20)) {
    const batch = writeBatch(db)
    for (const t of grupo) {
      const { docId, ...datos } = t
      batch.set(doc(db, 'plantillasVersionesTemas', docId), datos)
    }
    await batch.commit()
  }
  await updateDoc(doc(db, 'plantillas', plantillaId), {
    estado: 'publicada',
    publicadaEn: serverTimestamp(),
    hash: docVersion.hash,
    conteos: docVersion.conteos,
    actualizadaPor: uidActual(),
    actualizado: serverTimestamp(),
  })
  await registrarHistorial({
    academiaId: 'plataforma', accion: 'publicar-version',
    coleccion: 'plantillasVersiones', docId: vDocId,
    despues: { version, temas: docsTemas.length, cambios },
  }).catch(() => null)
  return { version, temas: docsTemas.length, cambios }
}

// Abre el borrador de la SIGUIENTE versión (el contenido de trabajo continúa).
export async function abrirSiguienteVersion(plantillaId) {
  const snap = await getDoc(doc(db, 'plantillas', plantillaId))
  if (!snap.exists()) throw new Error('La plantilla no existe.')
  const cambios = prepararNuevaVersion({ id: snap.id, ...snap.data() })
  await updateDoc(doc(db, 'plantillas', plantillaId), {
    ...cambios, actualizadaPor: uidActual(), actualizado: serverTimestamp(),
  })
  return cambios
}

export async function listarVersiones(plantillaId) {
  const snap = await getDocs(query(
    collection(db, 'plantillasVersiones'), where('plantillaId', '==', plantillaId)
  ))
  return snap.docs
    .map((d) => ({ docId: d.id, ...d.data() }))
    .sort((a, b) => (b.version ?? 0) - (a.version ?? 0))
}

// Temas del snapshot de UNA versión (where de un solo campo: sin índice compuesto).
export async function temasDeVersion(plantillaId, version) {
  const snap = await getDocs(query(
    collection(db, 'plantillasVersionesTemas'),
    where('versionId', '==', versionDocId(plantillaId, version))
  ))
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }))
}

// Academias cuyos cursos nacieron de esta plantilla (paginado).
export async function academiasQueUsanPlantilla(plantillaId, { limite = 20, cursor = null } = {}) {
  const filtros = [where('plantillaOrigenId', '==', plantillaId), limit(limite)]
  const q = cursor
    ? query(collection(db, 'cursos'), ...filtros, startAfter(cursor))
    : query(collection(db, 'cursos'), ...filtros)
  const snap = await getDocs(q)
  return {
    cursos: snap.docs.map((d) => ({
      id: d.id, academiaId: d.data().academiaId,
      versionOrigen: d.data().versionOrigen ?? null,
      replicacion: d.data().replicacion || null,
    })),
    cursor: snap.docs.length === limite ? snap.docs[snap.docs.length - 1] : null,
  }
}

// ¿Alguna academia usó esta versión? (guarda para no depurar versiones usadas)
export async function versionEstaEnUso(plantillaId, version) {
  const snap = await getDocs(query(
    collection(db, 'cursos'),
    where('plantillaOrigenId', '==', plantillaId),
    where('versionOrigen', '==', version),
    limit(1)
  ))
  return !snap.empty
}

// ============================================================
//  ACADEMIAS DESTINO (paginado; el filtrado fino es del wizard)
// ============================================================

export async function listarAcademiasPagina({ limite = 25, cursor = null } = {}) {
  const filtros = [orderBy('nombre'), limit(limite)]
  const q = cursor
    ? query(collection(db, 'academias'), ...filtros, startAfter(cursor))
    : query(collection(db, 'academias'), ...filtros)
  const snap = await getDocs(q)
  return {
    academias: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    cursor: snap.docs.length === limite ? snap.docs[snap.docs.length - 1] : null,
  }
}

// ============================================================
//  OPERACIONES DE REPLICACIÓN (doc replicaciones/{id})
// ============================================================

async function transicion(replicacionId, a, extra = {}) {
  await runTransaction(db, async (tx) => {
    const ref = doc(db, 'replicaciones', replicacionId)
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('La operación no existe.')
    const de = snap.data().estado
    if (de !== a && !puedeTransicionar(de, a)) {
      throw new Error(`Transición inválida: ${de} → ${a} (¿otra sesión está ejecutando esta operación?).`)
    }
    tx.update(ref, { estado: a, actualizado: serverTimestamp(), ...extra })
  })
}

export async function crearReplicacion({ plantillaId, version, destinos, estrategia = ESTRATEGIA_DEFAULT, tipo = 'replicacion' }) {
  if (!ESTRATEGIAS.includes(estrategia)) throw new Error(`Estrategia inválida: ${estrategia}`)
  if (!Array.isArray(destinos) || destinos.length === 0) throw new Error('Selecciona al menos una academia destino.')
  const unicos = [...new Set(destinos)]
  if (unicos.length > MAX_DESTINOS_CLIENTE) {
    throw new Error(
      `Desde el navegador se aplican máximo ${MAX_DESTINOS_CLIENTE} academias por operación. ` +
      'Para más destinos usa el script privado (scripts/replicar-contenido.mjs).'
    )
  }
  const vSnap = await getDoc(doc(db, 'plantillasVersiones', versionDocId(plantillaId, version)))
  if (!vSnap.exists()) throw new Error(`La versión ${version} de "${plantillaId}" no está publicada.`)

  const ref = await addDoc(collection(db, 'replicaciones'), {
    tipo, // 'clonacion' | 'replicacion'
    plantillaId,
    version,
    destinos: unicos,
    estrategia,
    estado: 'borrador',
    dryRun: null,
    confirmacion: null,
    respaldo: null,
    progreso: {},
    creadoPor: uidActual(),
    creadoEn: serverTimestamp(),
    actualizado: serverTimestamp(),
  })
  return { id: ref.id }
}

// Lee el estado ACTUAL de una academia frente a la versión origen.
async function estadoDestino({ academiaId, plantillaId }) {
  const acaSnap = await getDoc(doc(db, 'academias', academiaId))
  const academia = acaSnap.exists() ? { id: acaSnap.id, ...acaSnap.data() } : null
  const cursoId = cursoIdDe(academiaId, plantillaId)
  const curso = await obtenerCurso(cursoId)
  const temas = curso ? await temasDeCurso(cursoId, { soloPublicados: false }) : []
  const cursosSnap = await getDocs(query(collection(db, 'cursos'), where('academiaId', '==', academiaId)))
  const cursosActivos = cursosSnap.docs.filter((d) => (d.data().estado || 'publicado') !== 'archivado').length
  return { academia, curso, temas, cursosActivos }
}

// DRY-RUN obligatorio: analiza cada destino SIN escribir contenido. Guarda en
// el doc de la operación el resumen por academia + la huella del destino
// (para detectar si cambia antes de aplicar) + los elementos que requieren
// decisión. Ninguna escritura fuera del propio doc de la operación.
export async function analizarReplicacion(replicacionId) {
  const opSnap = await getDoc(doc(db, 'replicaciones', replicacionId))
  if (!opSnap.exists()) throw new Error('La operación no existe.')
  const op = opSnap.data()
  await transicion(replicacionId, 'analizando')

  try {
    const [vSnap, temasOrigen] = await Promise.all([
      getDoc(doc(db, 'plantillasVersiones', versionDocId(op.plantillaId, op.version))),
      temasDeVersion(op.plantillaId, op.version),
    ])
    if (!vSnap.exists()) throw new Error('La versión origen ya no existe.')
    const estructuraOrigen = vSnap.data().estructura || []
    const plantillaMeta = vSnap.data()

    const analisis = {}
    let totalEscrituras = 0
    let totalConflictos = 0
    const advertencias = []

    for (const academiaId of op.destinos) {
      const destino = await estadoDestino({ academiaId, plantillaId: op.plantillaId })
      const incompat = validarCompatibilidad({
        plantilla: plantillaMeta,
        academia: destino.academia,
        cursosActivos: destino.cursosActivos,
        esNuevoCurso: !destino.curso,
      })
      const comparacion = compararCurso({
        estructuraOrigen,
        temasOrigen,
        cursoDestino: destino.curso,
        temasDestino: destino.temas,
      })
      const conAccion = accionesPorEstrategia({
        elementos: comparacion.elementos,
        estrategia: op.estrategia,
        selecciones: op.confirmacion?.selecciones || {},
      })
      const escrituras = conAccion.filter((e) => ['crear', 'actualizar', 'duplicar'].includes(e.accion)).length + 1
      const conflictos = comparacion.resumen.conflicto || 0
      totalEscrituras += escrituras
      totalConflictos += conflictos
      if (!destino.curso && op.tipo === 'replicacion') {
        advertencias.push(`${academiaId}: no tiene el curso; la operación lo CLONARÁ completo.`)
      }
      analisis[academiaId] = {
        existeCurso: Boolean(destino.curso),
        incompatibilidades: incompat,
        resumen: comparacion.resumen,
        huellaDestino: comparacion.huellaDestino,
        escrituras,
        // Solo los elementos que piden atención (el detalle completo se
        // recalcula al aplicar): mantiene el doc de la operación pequeño.
        atencion: conAccion
          .filter((e) => ['conflicto', 'modificado_local', 'archivado_local'].includes(e.clase) || e.accion === 'requiere_decision')
          .slice(0, 200)
          .map((e) => ({
            temaId: e.temaId, titulo: e.titulo, ruta: e.ruta, clase: e.clase, accion: e.accion,
            versionDestino: e.versionDestino, modificadoLocalPor: e.modificadoLocalPor,
          })),
      }
    }

    const bloqueada = Object.values(analisis).some((a) =>
      a.incompatibilidades.some((i) => !i.advertencia)
    )
    await transicion(replicacionId, bloqueada ? 'fallida' : 'lista', {
      dryRun: {
        fecha: serverTimestamp(),
        analisis,
        totales: {
          academias: op.destinos.length,
          escrituras: totalEscrituras,
          conflictos: totalConflictos,
        },
        advertencias,
        bloqueada,
      },
    })
    return { analisis, totalEscrituras, totalConflictos, advertencias, bloqueada }
  } catch (err) {
    await transicion(replicacionId, 'fallida', { error: String(err?.message || err) }).catch(() => null)
    throw err
  }
}

// Confirmación reforzada: frase exacta + estrategia + decisiones manuales.
export async function confirmarReplicacion(replicacionId, { frase, selecciones = {} }) {
  const opSnap = await getDoc(doc(db, 'replicaciones', replicacionId))
  if (!opSnap.exists()) throw new Error('La operación no existe.')
  const op = opSnap.data()
  if (op.estado !== 'lista') throw new Error('La operación no tiene un análisis vigente.')
  const esperada = fraseConfirmacion({
    tipo: op.tipo, estrategia: op.estrategia, numAcademias: op.destinos.length,
  })
  if (String(frase || '').trim().toUpperCase() !== esperada) {
    throw new Error(`Frase incorrecta. Escribe exactamente: ${esperada}`)
  }
  await transicion(replicacionId, 'esperando_confirmacion', {
    confirmacion: {
      frase: esperada,
      selecciones,
      usuario: uidActual(),
      fecha: serverTimestamp(),
    },
  })
}

// ---------- Aplicación (acotada, idempotente, reanudable) ----------

// Respaldo de los docs que el plan modificará. IDEMPOTENTE: cada respaldo
// usa un doc-id determinista y NUNCA se sobrescribe — al reanudar una
// aplicación parcial, el snapshot original (previo a toda escritura) se
// conserva intacto. La aplicación NO continúa si el respaldo queda incompleto.
async function respaldarDocs({ replicacionId, backupId, academiaId, requeridos }) {
  const respaldados = []
  const existentes = []
  for (const r of requeridos) {
    const snap = await getDoc(doc(db, r.coleccion, r.docId))
    if (!snap.exists()) continue // nada que respaldar (el doc se creará)
    existentes.push({ coleccion: r.coleccion, docId: r.docId })
    const respaldoId = `${backupId}__${r.coleccion}__${r.docId}`
    const respaldoRef = doc(db, 'respaldos', respaldoId)
    const ya = await getDoc(respaldoRef)
    if (!ya.exists()) {
      const datos = snap.data()
      await setDoc(respaldoRef, {
        backupId, replicacionId, academiaId,
        coleccion: r.coleccion, docId: r.docId,
        datos: clonProfundo(datos),
        versionDoc: datos.version ?? null,
        fecha: serverTimestamp(),
      })
    }
    respaldados.push({ coleccion: r.coleccion, docId: r.docId })
  }
  return { respaldados, existentes }
}

// Aplica la operación confirmada. Idempotente y reanudable: el progreso por
// academia queda en el doc; reejecutar salta lo completado y reescribe los
// mismos doc-id (deterministas). Verifica ANTES de escribir que el destino no
// cambió desde el dry-run (huella); si cambió, esa academia se salta con
// advertencia y hay que re-analizar.
export async function aplicarReplicacion(replicacionId, { onProgreso, reanudar = false } = {}) {
  const opSnap = await getDoc(doc(db, 'replicaciones', replicacionId))
  if (!opSnap.exists()) throw new Error('La operación no existe.')
  const op = { id: replicacionId, ...opSnap.data() }
  if (!op.confirmacion) throw new Error('La operación no está confirmada.')
  if (!op.dryRun || op.dryRun.bloqueada) throw new Error('La operación no tiene un análisis vigente y aprobado.')

  // Bloqueo anti doble ejecución: 'aplicando' no transiciona a sí mismo.
  // Reanudar tras un cierre abrupto del navegador exige `reanudar: true`
  // explícito (jamás dos ejecuciones simultáneas por accidente).
  if (op.estado === 'aplicando' && !reanudar) {
    throw new Error('La operación ya se está aplicando en otra sesión. Si esa sesión murió, reanuda explícitamente.')
  }
  if (op.estado !== 'aplicando') {
    await transicion(replicacionId, 'aplicando', { inicioAplicacion: serverTimestamp() })
  }

  const backupId = `bk-${replicacionId}`
  const [vSnap, temasOrigen] = await Promise.all([
    getDoc(doc(db, 'plantillasVersiones', versionDocId(op.plantillaId, op.version))),
    temasDeVersion(op.plantillaId, op.version),
  ])
  if (!vSnap.exists()) {
    await transicion(replicacionId, 'fallida', { error: 'La versión origen desapareció.' })
    throw new Error('La versión origen desapareció.')
  }
  const estructuraOrigen = vSnap.data().estructura || []
  const temasOrigenPorId = new Map(temasOrigen.map((t) => [t.temaId, t]))

  const progreso = { ...(op.progreso || {}) }
  const advertencias = [...(op.dryRun.advertencias || [])]
  const creadosPorAcademia = { ...(op.creados || {}) }
  let fallo = null

  for (const academiaId of op.destinos) {
    if (progreso[academiaId]?.estado === 'completada') continue // reanudación
    try {
      const destino = await estadoDestino({ academiaId, plantillaId: op.plantillaId })
      const comparacion = compararCurso({
        estructuraOrigen, temasOrigen,
        cursoDestino: destino.curso, temasDestino: destino.temas,
      })
      const analizada = op.dryRun.analisis?.[academiaId]
      if (!analizada) throw new Error('Esta academia no está en el análisis.')
      if (comparacion.huellaDestino !== analizada.huellaDestino) {
        advertencias.push(`${academiaId}: el contenido cambió después del análisis; se omitió (re-analiza la operación).`)
        progreso[academiaId] = { estado: 'destino_cambiado' }
        continue
      }
      const incompatDuras = (analizada.incompatibilidades || []).filter((i) => !i.advertencia)
      if (incompatDuras.length) {
        advertencias.push(`${academiaId}: incompatible (${incompatDuras.map((i) => i.detalle).join(' ')}); se omitió.`)
        progreso[academiaId] = { estado: 'incompatible' }
        continue
      }

      const conAccion = accionesPorEstrategia({
        elementos: comparacion.elementos,
        estrategia: op.estrategia,
        selecciones: op.confirmacion.selecciones || {},
      })
      if (!destino.curso && op.tipo === 'replicacion') {
        throw new Error('El destino no tiene el curso: usa una operación de clonación.')
      }
      const plan = planParaAcademia({
        academiaId,
        plantillaId: op.plantillaId,
        versionOrigen: op.version,
        replicacionId,
        elementosConAccion: conAccion,
        temasOrigenPorId,
        estructuraOrigen,
        cursoDestino: destino.curso,
        plantillaMeta: vSnap.data(),
      })

      // 1) RESPALDO obligatorio y verificado (idempotente al reanudar).
      const { respaldados, existentes } = await respaldarDocs({
        replicacionId, backupId, academiaId, requeridos: plan.respaldar,
      })
      const check = verificarRespaldo({ requeridos: existentes, respaldados })
      if (!check.completo) {
        throw new Error(`Respaldo incompleto (${check.faltantes.length} doc(s)); no se aplica nada.`)
      }

      // 2) Escrituras por lotes (ids deterministas ⇒ reanudar reescribe igual).
      const creados = creadosPorAcademia[academiaId] || []
      const yaRegistrado = new Set(creados.map((c) => c.docId))
      let lote = progreso[academiaId]?.loteConfirmado || 0
      const grupos = plan.lotes
      for (let i = lote; i < grupos.length; i++) {
        const batch = writeBatch(db)
        for (const d of grupos[i]) {
          batch.set(doc(db, 'temas', d.docId), {
            ...d.datos, actualizado: serverTimestamp(), actualizadoPor: uidActual(),
          })
          if (d.accion === 'crear' && !yaRegistrado.has(d.docId)) {
            yaRegistrado.add(d.docId)
            creados.push({ coleccion: 'temas', docId: d.docId, hashEscrito: huellaTema(d.datos) })
          }
        }
        await batch.commit()
        lote = i + 1
        progreso[academiaId] = { estado: 'aplicando', loteConfirmado: lote }
        await updateDoc(doc(db, 'replicaciones', replicacionId), {
          progreso, creados: { ...creadosPorAcademia, [academiaId]: creados },
          actualizado: serverTimestamp(),
        })
        onProgreso?.({ academiaId, lote, lotes: grupos.length })
      }

      // 3) Curso (estructura fusionada + versión recibida) al final.
      if (plan.docCurso.accion === 'crear') {
        // Clonación completa: doc de curso nuevo + academia marcada 'migrado'.
        await setDoc(doc(db, 'cursos', plan.cursoId), {
          ...plan.docCurso.datos,
          clonacion: { ...plan.docCurso.datos.clonacion, fecha: serverTimestamp() },
          actualizado: serverTimestamp(), actualizadoPor: uidActual(),
        })
        await setDoc(doc(db, 'academias', academiaId), {
          contenido: {
            estado: 'migrado', plantillaId: op.plantillaId, version: op.version,
            actualizado: serverTimestamp(),
          },
        }, { merge: true })
      } else {
        await updateDoc(doc(db, 'cursos', plan.cursoId), {
          ...plan.docCurso.datos, actualizado: serverTimestamp(), actualizadoPor: uidActual(),
        })
      }

      creadosPorAcademia[academiaId] = creados
      progreso[academiaId] = {
        estado: 'completada',
        loteConfirmado: lote,
        escrituras: plan.estimacion.escrituras,
        hashCursoEscrito: huellaEstructura(plan.docCurso.datos?.estructura || destino.curso?.estructura || []),
      }
      await updateDoc(doc(db, 'replicaciones', replicacionId), {
        progreso, creados: creadosPorAcademia, actualizado: serverTimestamp(),
      })
      limpiarCacheContenido(academiaId)
      await registrarHistorial({
        academiaId, accion: 'replicar-contenido', coleccion: 'cursos', docId: plan.cursoId,
        despues: { replicacionId, version: op.version, estrategia: op.estrategia, escrituras: plan.estimacion.escrituras },
      }).catch(() => null)
    } catch (err) {
      fallo = `${academiaId}: ${err?.message || err}`
      progreso[academiaId] = { ...(progreso[academiaId] || {}), estado: 'fallida', error: fallo }
      await updateDoc(doc(db, 'replicaciones', replicacionId), {
        progreso, actualizado: serverTimestamp(),
      }).catch(() => null)
      break // una academia fallida detiene la operación (reanudable)
    }
  }

  const estados = op.destinos.map((a) => progreso[a]?.estado || 'pendiente')
  const final = fallo ? 'fallida'
    : estados.every((e) => e === 'completada') ? (advertencias.length ? 'completada_con_advertencias' : 'completada')
    : 'completada_con_advertencias'
  await transicion(replicacionId, final, {
    finAplicacion: serverTimestamp(),
    advertenciasFinales: advertencias,
    backupId,
    ...(fallo ? { error: fallo } : {}),
  })
  if (fallo) throw new Error(`Replicación detenida — ${fallo}. Reanuda la operación cuando lo corrijas.`)
  return { estado: final, advertencias, progreso }
}

// ---------- Rollback (desde los respaldos de la operación) ----------

async function respaldosDeReplicacion(replicacionId) {
  const snap = await getDocs(query(collection(db, 'respaldos'), where('replicacionId', '==', replicacionId)))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Vista previa del rollback (no escribe): qué se restaura, qué se archiva y
// qué se conserva por haber cambiado DESPUÉS de la replicación.
export async function previsualizarRollback(replicacionId, { forzar = {} } = {}) {
  const opSnap = await getDoc(doc(db, 'replicaciones', replicacionId))
  if (!opSnap.exists()) throw new Error('La operación no existe.')
  const op = opSnap.data()
  if (!['completada', 'completada_con_advertencias', 'fallida'].includes(op.estado)) {
    throw new Error(`No se puede revertir una operación en estado "${op.estado}".`)
  }
  const respaldos = await respaldosDeReplicacion(replicacionId)
  const creados = Object.entries(op.creados || {}).flatMap(([, lista]) => lista)

  // Estado actual de todos los docs implicados.
  const claves = [
    ...respaldos.map((r) => ({ coleccion: r.coleccion, docId: r.docId })),
    ...creados.map((c) => ({ coleccion: c.coleccion, docId: c.docId })),
  ]
  const docsActuales = []
  for (const k of claves) {
    const snap = await getDoc(doc(db, k.coleccion, k.docId))
    if (snap.exists()) docsActuales.push({ ...k, datos: snap.data() })
  }

  // La huella "escrita por la replicación" de los ACTUALIZADOS es la del
  // contenido de la versión origen (sello origen.hash del doc actual si la
  // replicación fue lo último que lo tocó).
  const respaldosConHash = respaldos.map((r) => {
    const actual = docsActuales.find((d) => d.coleccion === r.coleccion && d.docId === r.docId)
    let hashEscrito = null
    if (r.coleccion === 'temas') {
      hashEscrito = actual?.datos?.origen?.replicacionId === replicacionId ? actual.datos.origen.hash : null
    } else if (r.coleccion === 'cursos') {
      hashEscrito = op.progreso?.[r.academiaId]?.hashCursoEscrito || null
    }
    return { ...r, hashEscrito }
  })

  const plan = planDeRollback({ respaldos: respaldosConHash, creados, docsActuales, forzar })
  return { ...plan, respaldos: respaldos.length, creados: creados.length, op }
}

// Ejecuta el rollback (idempotente y reanudable: restaurar reescribe los
// mismos docs; archivar es un update de estado). Exige respaldo válido.
export async function ejecutarRollback(replicacionId, { forzar = {}, frase, onProgreso } = {}) {
  const prev = await previsualizarRollback(replicacionId, { forzar })
  const { op } = prev
  const esperada = fraseConfirmacion({ tipo: 'rollback', numAcademias: op.destinos.length })
  if (String(frase || '').trim().toUpperCase() !== esperada) {
    throw new Error(`Frase incorrecta. Escribe exactamente: ${esperada}`)
  }
  if (!prev.restaurar.length && !prev.archivar.length) {
    throw new Error('No hay nada que revertir (¿ya se revirtió, o todo cambió después?).')
  }
  await transicion(replicacionId, 'revirtiendo', { inicioRollback: serverTimestamp() })
  try {
    let hechos = 0
    for (const grupo of lotes(prev.restaurar, 20)) {
      const batch = writeBatch(db)
      for (const r of grupo) {
        batch.set(doc(db, r.coleccion, r.docId), {
          ...r.datos,
          version: (r.datos.version ?? 0) + 1, // la restauración también versiona
          actualizado: serverTimestamp(),
          actualizadoPor: uidActual(),
        })
      }
      await batch.commit()
      hechos += grupo.length
      onProgreso?.({ hechos, total: prev.restaurar.length + prev.archivar.length })
    }
    for (const grupo of lotes(prev.archivar, 20)) {
      const batch = writeBatch(db)
      for (const a of grupo) {
        batch.update(doc(db, a.coleccion, a.docId), {
          estado: 'archivado',
          actualizado: serverTimestamp(),
          actualizadoPor: uidActual(),
        })
      }
      await batch.commit()
      hechos += grupo.length
      onProgreso?.({ hechos, total: prev.restaurar.length + prev.archivar.length })
    }
    for (const academiaId of op.destinos) limpiarCacheContenido(academiaId)
    await transicion(replicacionId, 'revertida', {
      finRollback: serverTimestamp(),
      rollback: {
        restaurados: prev.restaurar.length,
        archivados: prev.archivar.length,
        conservados: prev.advertencias.filter((a) => a.conservado).length,
        usuario: uidActual(),
      },
    })
    for (const academiaId of op.destinos) {
      await registrarHistorial({
        academiaId, accion: 'rollback-replicacion', coleccion: 'replicaciones', docId: replicacionId,
        despues: { restaurados: prev.restaurar.length, archivados: prev.archivar.length },
      }).catch(() => null)
    }
    return { restaurados: prev.restaurar.length, archivados: prev.archivar.length, advertencias: prev.advertencias }
  } catch (err) {
    await transicion(replicacionId, 'fallida', { error: `rollback: ${err?.message || err}` }).catch(() => null)
    throw err
  }
}

// ---------- Consultas de historial de operaciones ----------

export async function listarReplicaciones({ limite = 20, cursor = null } = {}) {
  const filtros = [orderBy('creadoEn', 'desc'), limit(limite)]
  const q = cursor
    ? query(collection(db, 'replicaciones'), ...filtros, startAfter(cursor))
    : query(collection(db, 'replicaciones'), ...filtros)
  const snap = await getDocs(q)
  return {
    operaciones: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    cursor: snap.docs.length === limite ? snap.docs[snap.docs.length - 1] : null,
  }
}

export async function obtenerReplicacion(replicacionId) {
  const snap = await getDoc(doc(db, 'replicaciones', replicacionId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function cancelarReplicacion(replicacionId) {
  await transicion(replicacionId, 'cancelada', { canceladaPor: uidActual() })
}

export { fraseConfirmacion, resumenDeOperacion, MAX_DESTINOS_CLIENTE as LIMITE_DESTINOS }
