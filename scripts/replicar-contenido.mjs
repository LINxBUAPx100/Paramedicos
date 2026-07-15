// ============================================================
//  Replicación de contenido — BACKEND SEGURO (script privado, Fase 7)
// ------------------------------------------------------------
//  Vía recomendada para replicaciones MASIVAS (más academias que el límite
//  del navegador) y para rollbacks grandes. Usa firebase-admin con un
//  service account PRIVADO (jamás en el repo) o el emulador; las reglas de
//  Firestore no se relajan para esto.
//
//  DRY-RUN POR DEFECTO: sin --apply NUNCA escribe. Idempotente y reanudable:
//  doc-ids deterministas + respaldos con id determinista que no se
//  sobrescriben + progreso por academia en el doc de la operación.
//
//  Uso:
//    node scripts/replicar-contenido.mjs --plantilla=ID --version=N --destinos=A,B,C
//        [--estrategia=conservar_local|reemplazar_con_origen|duplicar_como_nuevo]
//        [--apply] [--confirmar="FRASE"] [--produccion]
//    node scripts/replicar-contenido.mjs --operacion=ID [--apply] [--reanudar]
//    node scripts/replicar-contenido.mjs --rollback --operacion=ID [--apply] [--confirmar="FRASE"]
//
//  Conexión: FIRESTORE_EMULATOR_HOST (emulador) o --produccion +
//  GOOGLE_APPLICATION_CREDENTIALS. La estrategia reemplazar_con_origen y toda
//  operación multi-academia exigen --confirmar con la frase exacta.
// ============================================================
import {
  compararCurso, accionesPorEstrategia, validarCompatibilidad, planParaAcademia,
  verificarRespaldo, planDeRollback, fraseConfirmacion, resumenDeOperacion,
  huellaTema, huellaEstructura, ESTRATEGIAS, ESTRATEGIA_DEFAULT,
  requiereConfirmacionReforzada,
} from '../src/lib/replicacionModelo.js'
import { versionDocId } from '../src/lib/plantillasModelo.js'
import { cursoIdDe, lotes, clonProfundo } from '../src/lib/contenidoModelo.js'

const PROYECTO_DEFAULT = 'ptem-a304f'
const USUARIO = 'script:replicar-contenido'

// ---------- argumentos ----------
const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const valor = (n) => {
  const a = args.find((x) => x.startsWith(`--${n}=`))
  return a ? a.split('=').slice(1).join('=') : null
}
const APPLY = flag('apply')
const ROLLBACK = flag('rollback')
const REANUDAR = flag('reanudar')
const PRODUCCION = flag('produccion')
const PLANTILLA = valor('plantilla')
const VERSION = valor('version') ? Number(valor('version')) : null
const DESTINOS = (valor('destinos') || '').split(',').map((s) => s.trim()).filter(Boolean)
const ESTRATEGIA = valor('estrategia') || ESTRATEGIA_DEFAULT
const OPERACION = valor('operacion')
const CONFIRMAR = valor('confirmar')
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
const PROYECTO = process.env.FIREBASE_PROJECT_ID || PROYECTO_DEFAULT

if (!OPERACION && (!PLANTILLA || !VERSION || !DESTINOS.length) && !ROLLBACK) {
  console.log(`Replicación de contenido PTEM — dry-run por defecto (usa --apply para escribir).

  --plantilla=ID --version=N --destinos=A,B,C   nueva operación (análisis)
  --estrategia=${ESTRATEGIAS.join('|')}
  --operacion=ID                                 continuar/reanudar una operación existente
  --rollback --operacion=ID                      revertir una operación aplicada
  --confirmar="FRASE"                            frase de confirmación reforzada (ver salida del análisis)
  --reanudar                                     retomar una operación atascada en 'aplicando'
  --apply                                        ESCRIBE (sin esto: solo análisis)
  --produccion                                   conectar a producción (GOOGLE_APPLICATION_CREDENTIALS)`)
  process.exit(0)
}
if (!ESTRATEGIAS.includes(ESTRATEGIA)) {
  console.error(`✗ Estrategia inválida: ${ESTRATEGIA}`)
  process.exit(1)
}

console.log('— Replicación de contenido PTEM —')
console.log(`Proyecto : ${PROYECTO}`)
console.log(`Destino  : ${EMULADOR ? `EMULADOR (${EMULADOR})` : PRODUCCION ? 'PRODUCCIÓN' : 'sin conexión'}`)
console.log(`Modo     : ${APPLY ? 'APPLY (escribe)' : 'DRY-RUN (no escribe nada)'}`)
console.log('')

if (!EMULADOR && !PRODUCCION) {
  console.error('✗ Este script necesita conexión: exporta FIRESTORE_EMULATOR_HOST o usa --produccion.')
  process.exit(1)
}
if (PRODUCCION && !EMULADOR && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('✗ Producción requiere GOOGLE_APPLICATION_CREDENTIALS (service account fuera del repo).')
  process.exit(1)
}

// ---------- conexión admin ----------
let adminApp, adminFirestore
try {
  adminApp = await import('firebase-admin/app')
  adminFirestore = await import('firebase-admin/firestore')
} catch {
  console.error('✗ Falta firebase-admin:  npm i -D firebase-admin')
  process.exit(1)
}
const opciones = { projectId: PROYECTO }
if (!EMULADOR) opciones.credential = adminApp.applicationDefault()
const app = adminApp.getApps().length ? adminApp.getApp() : adminApp.initializeApp(opciones)
const db = adminFirestore.getFirestore(app)
const FieldValue = adminFirestore.FieldValue

// ---------- acceso a datos (espejo admin de src/lib/firebase/replicacion.js) ----------
async function temasDeVersion(plantillaId, version) {
  const snap = await db.collection('plantillasVersionesTemas')
    .where('versionId', '==', versionDocId(plantillaId, version)).get()
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }))
}

async function estadoDestino(academiaId, plantillaId) {
  const acaSnap = await db.collection('academias').doc(academiaId).get()
  const academia = acaSnap.exists ? { id: acaSnap.id, ...acaSnap.data() } : null
  const cursoId = cursoIdDe(academiaId, plantillaId)
  const cursoSnap = await db.collection('cursos').doc(cursoId).get()
  const curso = cursoSnap.exists ? { id: cursoSnap.id, ...cursoSnap.data() } : null
  const temasSnap = curso
    ? await db.collection('temas').where('cursoId', '==', cursoId).get()
    : { docs: [] }
  const cursosSnap = await db.collection('cursos').where('academiaId', '==', academiaId).get()
  return {
    academia, curso,
    temas: temasSnap.docs.map((d) => ({ docId: d.id, ...d.data() })),
    cursosActivos: cursosSnap.docs.filter((d) => (d.data().estado || 'publicado') !== 'archivado').length,
  }
}

// ---------- operación (nueva o existente) ----------
async function cargarOperacion() {
  if (OPERACION) {
    const snap = await db.collection('replicaciones').doc(OPERACION).get()
    if (!snap.exists) { console.error(`✗ No existe replicaciones/${OPERACION}`); process.exit(1) }
    return { id: snap.id, ...snap.data() }
  }
  return {
    id: null,
    tipo: 'replicacion',
    plantillaId: PLANTILLA,
    version: VERSION,
    destinos: [...new Set(DESTINOS)],
    estrategia: ESTRATEGIA,
    estado: 'borrador',
    progreso: {},
    creados: {},
    confirmacion: { selecciones: {} },
  }
}

// ---------- análisis + aplicación ----------
async function replicar() {
  const op = await cargarOperacion()
  const vSnap = await db.collection('plantillasVersiones')
    .doc(versionDocId(op.plantillaId, op.version)).get()
  if (!vSnap.exists) {
    console.error(`✗ La versión ${op.version} de "${op.plantillaId}" no está publicada.`)
    process.exit(1)
  }
  const plantillaMeta = vSnap.data()
  const estructuraOrigen = plantillaMeta.estructura || []
  const temasOrigen = await temasDeVersion(op.plantillaId, op.version)
  const temasOrigenPorId = new Map(temasOrigen.map((t) => [t.temaId, t]))
  console.log(`Origen: ${op.plantillaId} v${op.version} (${temasOrigen.length} temas) → ${op.destinos.length} academia(s), estrategia ${op.estrategia}`)

  // Frase de confirmación reforzada (aplicación real de operaciones sensibles).
  const frase = fraseConfirmacion({ tipo: op.tipo, estrategia: op.estrategia, numAcademias: op.destinos.length })
  if (APPLY && requiereConfirmacionReforzada({ tipo: op.tipo, estrategia: op.estrategia, numAcademias: op.destinos.length })) {
    if (String(CONFIRMAR || '').trim().toUpperCase() !== frase) {
      console.error(`✗ Esta operación exige confirmación reforzada:  --confirmar="${frase}"`)
      process.exit(1)
    }
  }

  const planes = []
  const analisis = {}
  for (const academiaId of op.destinos) {
    if (op.progreso?.[academiaId]?.estado === 'completada') {
      console.log(`  ${academiaId}: ya completada (reanudación) — se salta.`)
      continue
    }
    const destino = await estadoDestino(academiaId, op.plantillaId)
    const incompat = validarCompatibilidad({
      plantilla: plantillaMeta, academia: destino.academia,
      cursosActivos: destino.cursosActivos, esNuevoCurso: !destino.curso,
    })
    const duras = incompat.filter((i) => !i.advertencia)
    const comparacion = compararCurso({
      estructuraOrigen, temasOrigen, cursoDestino: destino.curso, temasDestino: destino.temas,
    })
    const conAccion = accionesPorEstrategia({
      elementos: comparacion.elementos, estrategia: op.estrategia,
      selecciones: op.confirmacion?.selecciones || {},
    })
    const r = comparacion.resumen
    console.log(`  ${academiaId}: curso ${destino.curso ? 'existe' : 'NO existe (clonará)'} · nuevos ${r.nuevo} · sin cambios ${r.sin_cambios} · del origen ${r.modificado_en_origen} · locales ${r.modificado_local} · conflictos ${r.conflicto} · solo-local ${r.solo_local} · archivados ${r.archivado_local}`)
    for (const i of incompat) console.log(`    ${i.advertencia ? '⚠' : '✗'} ${i.detalle}`)
    if (duras.length) { analisis[academiaId] = { bloqueada: true }; continue }

    const plan = planParaAcademia({
      academiaId, plantillaId: op.plantillaId, versionOrigen: op.version,
      replicacionId: op.id || 'dry-run',
      elementosConAccion: conAccion, temasOrigenPorId, estructuraOrigen,
      cursoDestino: destino.curso, plantillaMeta,
    })
    analisis[academiaId] = { huellaDestino: comparacion.huellaDestino, escrituras: plan.estimacion.escrituras }
    planes.push({ academiaId, plan, destino })
  }

  const totales = resumenDeOperacion(planes.map((p) => p.plan))
  console.log(`\nPlan total: ${totales.escrituras} escrituras · ${totales.respaldos} respaldos · ${totales.creados} creados · ${totales.actualizados} actualizados · ${totales.duplicados} duplicados`)

  if (!APPLY) {
    console.log(`\nDRY-RUN: no se escribió nada. Frase para aplicar: "${frase}"`)
    return
  }

  // Doc de operación (auditoría) si no existía.
  let opId = op.id
  if (!opId) {
    const ref = await db.collection('replicaciones').add({
      tipo: op.tipo, plantillaId: op.plantillaId, version: op.version,
      destinos: op.destinos, estrategia: op.estrategia,
      estado: 'aplicando', origen: 'script', creadoPor: USUARIO,
      creadoEn: FieldValue.serverTimestamp(), actualizado: FieldValue.serverTimestamp(),
      dryRun: { analisis: Object.fromEntries(Object.entries(analisis).map(([k, v]) => [k, { escrituras: v.escrituras ?? 0 }])) },
      confirmacion: { frase, usuario: USUARIO, fecha: FieldValue.serverTimestamp() },
      progreso: {}, creados: {},
    })
    opId = ref.id
  } else {
    const estado = op.estado
    if (estado === 'aplicando' && !REANUDAR) {
      console.error('✗ La operación ya está en estado "aplicando". Usa --reanudar si esa ejecución murió.')
      process.exit(1)
    }
    await db.collection('replicaciones').doc(opId).update({
      estado: 'aplicando', actualizado: FieldValue.serverTimestamp(),
    })
  }
  const backupId = `bk-${opId}`
  const progreso = { ...(op.progreso || {}) }
  const creadosPorAcademia = { ...(op.creados || {}) }

  for (const { academiaId, plan } of planes) {
    // Recalcula el plan con el replicacionId REAL (sello de origen correcto).
    const destino = await estadoDestino(academiaId, op.plantillaId)
    const comparacion = compararCurso({
      estructuraOrigen, temasOrigen, cursoDestino: destino.curso, temasDestino: destino.temas,
    })
    if (analisis[academiaId] && comparacion.huellaDestino !== analisis[academiaId].huellaDestino) {
      console.log(`  ⚠ ${academiaId}: cambió entre el análisis y la aplicación — se omite (vuelve a ejecutar).`)
      progreso[academiaId] = { estado: 'destino_cambiado' }
      continue
    }
    const conAccion = accionesPorEstrategia({
      elementos: comparacion.elementos, estrategia: op.estrategia,
      selecciones: op.confirmacion?.selecciones || {},
    })
    const planReal = planParaAcademia({
      academiaId, plantillaId: op.plantillaId, versionOrigen: op.version,
      replicacionId: opId,
      elementosConAccion: conAccion,
      temasOrigenPorId, estructuraOrigen,
      cursoDestino: destino.curso, plantillaMeta,
    })

    // Respaldo idempotente (nunca sobrescribe un snapshot previo).
    const respaldados = []
    const existentes = []
    for (const r of planReal.respaldar) {
      const snap = await db.collection(r.coleccion).doc(r.docId).get()
      if (!snap.exists) continue
      existentes.push(r)
      const respaldoRef = db.collection('respaldos').doc(`${backupId}__${r.coleccion}__${r.docId}`)
      if (!(await respaldoRef.get()).exists) {
        await respaldoRef.set({
          backupId, replicacionId: opId, academiaId,
          coleccion: r.coleccion, docId: r.docId,
          datos: clonProfundo(snap.data()),
          versionDoc: snap.data().version ?? null,
          fecha: FieldValue.serverTimestamp(),
        })
      }
      respaldados.push(r)
    }
    const check = verificarRespaldo({ requeridos: existentes, respaldados })
    if (!check.completo) {
      console.error(`✗ ${academiaId}: respaldo incompleto; no se escribe nada en esta academia.`)
      progreso[academiaId] = { estado: 'fallida', error: 'respaldo incompleto' }
      break
    }

    const creados = creadosPorAcademia[academiaId] || []
    const yaRegistrado = new Set(creados.map((c) => c.docId))
    let lote = progreso[academiaId]?.loteConfirmado || 0
    for (let i = lote; i < planReal.lotes.length; i++) {
      const batch = db.batch()
      for (const d of planReal.lotes[i]) {
        batch.set(db.collection('temas').doc(d.docId), {
          ...d.datos, actualizado: FieldValue.serverTimestamp(), actualizadoPor: USUARIO,
        })
        if (d.accion === 'crear' && !yaRegistrado.has(d.docId)) {
          yaRegistrado.add(d.docId)
          creados.push({ coleccion: 'temas', docId: d.docId, hashEscrito: huellaTema(d.datos) })
        }
      }
      await batch.commit()
      lote = i + 1
      progreso[academiaId] = { estado: 'aplicando', loteConfirmado: lote }
      creadosPorAcademia[academiaId] = creados
      await db.collection('replicaciones').doc(opId).update({
        progreso, creados: creadosPorAcademia, actualizado: FieldValue.serverTimestamp(),
      })
      console.log(`  ${academiaId}: lote ${lote}/${planReal.lotes.length}`)
    }
    if (planReal.docCurso.accion === 'crear') {
      await db.collection('cursos').doc(planReal.cursoId).set({
        ...planReal.docCurso.datos,
        clonacion: { ...planReal.docCurso.datos.clonacion, fecha: FieldValue.serverTimestamp() },
        actualizado: FieldValue.serverTimestamp(), actualizadoPor: USUARIO,
      })
      await db.collection('academias').doc(academiaId).set({
        contenido: {
          estado: 'migrado', plantillaId: op.plantillaId, version: op.version,
          actualizado: FieldValue.serverTimestamp(),
        },
      }, { merge: true })
    } else {
      await db.collection('cursos').doc(planReal.cursoId).update({
        ...planReal.docCurso.datos, actualizado: FieldValue.serverTimestamp(), actualizadoPor: USUARIO,
      })
    }
    progreso[academiaId] = {
      estado: 'completada', loteConfirmado: lote,
      escrituras: planReal.estimacion.escrituras,
      hashCursoEscrito: huellaEstructura(planReal.docCurso.datos?.estructura || []),
    }
    await db.collection('replicaciones').doc(opId).update({
      progreso, creados: creadosPorAcademia, actualizado: FieldValue.serverTimestamp(),
    })
    await db.collection('historial').add({
      academiaId, usuario: USUARIO, rol: 'superadmin', accion: 'replicar-contenido',
      coleccion: 'cursos', docId: planReal.cursoId, antes: null,
      despues: { replicacionId: opId, version: op.version, estrategia: op.estrategia },
      origen: 'script', fecha: FieldValue.serverTimestamp(),
    })
    console.log(`  ✓ ${academiaId}: completada (${planReal.estimacion.escrituras} escrituras)`)
  }

  const estados = op.destinos.map((a) => progreso[a]?.estado || 'completada')
  const final = estados.some((e) => e === 'fallida') ? 'fallida'
    : estados.every((e) => e === 'completada') ? 'completada' : 'completada_con_advertencias'
  await db.collection('replicaciones').doc(opId).update({
    estado: final, backupId, finAplicacion: FieldValue.serverTimestamp(),
  })
  console.log(`\n✓ Operación ${opId}: ${final}`)
}

// ---------- rollback ----------
async function rollback() {
  if (!OPERACION) { console.error('✗ --rollback requiere --operacion=ID'); process.exit(1) }
  const opSnap = await db.collection('replicaciones').doc(OPERACION).get()
  if (!opSnap.exists) { console.error(`✗ No existe replicaciones/${OPERACION}`); process.exit(1) }
  const op = { id: opSnap.id, ...opSnap.data() }
  if (!['completada', 'completada_con_advertencias', 'fallida', 'revirtiendo'].includes(op.estado)) {
    console.error(`✗ No se puede revertir una operación en estado "${op.estado}".`)
    process.exit(1)
  }
  const respSnap = await db.collection('respaldos').where('replicacionId', '==', op.id).get()
  const respaldos = respSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
  const creados = Object.values(op.creados || {}).flat()
  if (!respaldos.length && !creados.length) {
    console.error('✗ Sin respaldo válido: el rollback no está permitido.')
    process.exit(1)
  }

  const docsActuales = []
  for (const k of [...respaldos, ...creados]) {
    const snap = await db.collection(k.coleccion).doc(k.docId).get()
    if (snap.exists) docsActuales.push({ coleccion: k.coleccion, docId: k.docId, datos: snap.data() })
  }
  const respaldosConHash = respaldos.map((r) => {
    const actual = docsActuales.find((d) => d.coleccion === r.coleccion && d.docId === r.docId)
    let hashEscrito = null
    if (r.coleccion === 'temas') {
      hashEscrito = actual?.datos?.origen?.replicacionId === op.id ? actual.datos.origen.hash : null
    } else if (r.coleccion === 'cursos') {
      hashEscrito = op.progreso?.[r.academiaId]?.hashCursoEscrito || null
    }
    return { ...r, hashEscrito }
  })
  const plan = planDeRollback({ respaldos: respaldosConHash, creados, docsActuales })
  console.log(`Rollback de ${op.id}: restaurar ${plan.restaurar.length} · archivar ${plan.archivar.length} · conservados ${plan.advertencias.filter((a) => a.conservado).length}`)
  for (const a of plan.advertencias) console.log(`  ⚠ ${a.docId}: ${a.motivo}`)

  if (!APPLY) {
    const frase = fraseConfirmacion({ tipo: 'rollback', numAcademias: op.destinos.length })
    console.log(`\nDRY-RUN: no se escribió nada. Frase para aplicar: "${frase}"`)
    return
  }
  const frase = fraseConfirmacion({ tipo: 'rollback', numAcademias: op.destinos.length })
  if (String(CONFIRMAR || '').trim().toUpperCase() !== frase) {
    console.error(`✗ El rollback exige confirmación reforzada:  --confirmar="${frase}"`)
    process.exit(1)
  }

  await db.collection('replicaciones').doc(op.id).update({
    estado: 'revirtiendo', inicioRollback: FieldValue.serverTimestamp(),
  })
  for (const grupo of lotes(plan.restaurar, 20)) {
    const batch = db.batch()
    for (const r of grupo) {
      batch.set(db.collection(r.coleccion).doc(r.docId), {
        ...r.datos, version: (r.datos.version ?? 0) + 1,
        actualizado: FieldValue.serverTimestamp(), actualizadoPor: USUARIO,
      })
    }
    await batch.commit()
  }
  for (const grupo of lotes(plan.archivar, 20)) {
    const batch = db.batch()
    for (const a of grupo) {
      batch.update(db.collection(a.coleccion).doc(a.docId), {
        estado: 'archivado', actualizado: FieldValue.serverTimestamp(), actualizadoPor: USUARIO,
      })
    }
    await batch.commit()
  }
  await db.collection('replicaciones').doc(op.id).update({
    estado: 'revertida', finRollback: FieldValue.serverTimestamp(),
    rollback: {
      restaurados: plan.restaurar.length, archivados: plan.archivar.length,
      conservados: plan.advertencias.filter((a) => a.conservado).length, usuario: USUARIO,
    },
  })
  for (const academiaId of op.destinos) {
    await db.collection('historial').add({
      academiaId, usuario: USUARIO, rol: 'superadmin', accion: 'rollback-replicacion',
      coleccion: 'replicaciones', docId: op.id, antes: null,
      despues: { restaurados: plan.restaurar.length, archivados: plan.archivar.length },
      origen: 'script', fecha: FieldValue.serverTimestamp(),
    })
  }
  console.log(`✓ Rollback de ${op.id} completado.`)
}

try {
  if (ROLLBACK) await rollback()
  else await replicar()
  process.exit(0)
} catch (err) {
  console.error(`✗ Error: ${err?.message || err}`)
  process.exit(1)
}
