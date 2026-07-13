// ============================================================
//  Migración de contenido: seed de plantillas y clonación por academia.
// ------------------------------------------------------------
//  DRY-RUN POR DEFECTO: sin --apply NUNCA escribe. Idempotente: los doc-id
//  son deterministas, reejecutar reescribe los mismos docs (sirve para
//  reanudar una clonación parcial, jamás duplica).
//
//  Uso:
//    node scripts/migrar-contenido.mjs --seed                    (dry-run del seed)
//    node scripts/migrar-contenido.mjs --seed --apply            (escribe la plantilla)
//    node scripts/migrar-contenido.mjs --academia=AEP-2026       (dry-run de clonación)
//    node scripts/migrar-contenido.mjs --academia=AEP-2026 --apply
//    node scripts/migrar-contenido.mjs --verificar --academia=AEP-2026
//  Opciones: --plantilla=paramedico-tum (default) · --produccion
//
//  Conexión (sin credenciales en el repo):
//    - Emulador: exporta FIRESTORE_EMULATOR_HOST (p. ej. 127.0.0.1:8080).
//    - Producción: requiere --produccion + GOOGLE_APPLICATION_CREDENTIALS
//      apuntando a un service account (nunca se guarda en el repo).
//  Requiere `firebase-admin` (devDependency; fuera del bundle del frontend):
//    npm i -D firebase-admin
// ============================================================
import { fases, todosLosTemas, stats } from '../src/data/index.js'
import {
  plantillaDesdeData, docsClonadosParaAcademia, cursoDesdePlantilla, lotes,
} from '../src/lib/contenidoModelo.js'

const PLANTILLA_OFICIAL_ID = 'paramedico-tum'
const PLANTILLA_OFICIAL_NOMBRE = 'Programa Paramédico (TUM)'
const PROYECTO_DEFAULT = 'ptem-a304f'

// ---------- argumentos ----------
const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const valor = (n) => {
  const a = args.find((x) => x.startsWith(`--${n}=`))
  return a ? a.split('=').slice(1).join('=') : null
}
const APPLY = flag('apply')
const SEED = flag('seed')
const VERIFICAR = flag('verificar')
const PRODUCCION = flag('produccion')
const ACADEMIA = valor('academia')
const PLANTILLA = valor('plantilla') || PLANTILLA_OFICIAL_ID
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
const PROYECTO = process.env.FIREBASE_PROJECT_ID || PROYECTO_DEFAULT

if (!SEED && !ACADEMIA && !VERIFICAR) {
  console.log(`Migración de contenido PTEM — dry-run por defecto (usa --apply para escribir).

  --seed                 siembra la plantilla oficial (${PLANTILLA_OFICIAL_ID}) desde src/data
  --academia=CODIGO      clona la plantilla al namespace de esa academia
  --verificar            junto con --academia: revisa si la clonación está completa
  --plantilla=ID         plantilla a usar (default ${PLANTILLA_OFICIAL_ID})
  --apply                ESCRIBE (sin esto solo se muestra el plan)
  --produccion           permite conectar a producción (requiere GOOGLE_APPLICATION_CREDENTIALS)

Temario local: ${stats.fases} fases · ${stats.temas} temas · ${stats.preguntas} preguntas · ${stats.flashcards} flashcards`)
  process.exit(0)
}

// ---------- banner de destino ----------
console.log('— Migración de contenido PTEM —')
console.log(`Proyecto Firebase objetivo : ${PROYECTO}`)
console.log(`Destino                    : ${EMULADOR ? `EMULADOR (${EMULADOR})` : PRODUCCION ? 'PRODUCCIÓN' : 'sin conexión (plan local)'}`)
console.log(`Modo                       : ${APPLY ? 'APPLY (escribe)' : 'DRY-RUN (no escribe nada)'}`)
console.log('')

if (APPLY && !EMULADOR && !PRODUCCION) {
  console.error('✗ --apply sin emulador requiere --produccion explícito (y GOOGLE_APPLICATION_CREDENTIALS).')
  process.exit(1)
}
if (PRODUCCION && !EMULADOR && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('✗ Producción requiere GOOGLE_APPLICATION_CREDENTIALS (service account fuera del repo).')
  process.exit(1)
}

// ---------- documentos que TOCARÍA la operación (puro, sin conexión) ----------
const { plantilla, temas: temasPlantilla } = plantillaDesdeData({
  id: PLANTILLA === PLANTILLA_OFICIAL_ID ? PLANTILLA_OFICIAL_ID : PLANTILLA,
  nombre: PLANTILLA_OFICIAL_NOMBRE,
  tipoDestino: 'basico',
  version: 1,
  fases,
  todosLosTemas,
})

// ---------- conexión (solo si hay a dónde conectar) ----------
let dba = null
let FieldValue = null
const conectar = Boolean(EMULADOR || PRODUCCION)
if (conectar) {
  let adminApp, adminFirestore
  try {
    adminApp = await import('firebase-admin/app')
    adminFirestore = await import('firebase-admin/firestore')
  } catch {
    console.error('✗ Falta firebase-admin. Instálalo con:  npm i -D firebase-admin')
    process.exit(1)
  }
  const opciones = { projectId: PROYECTO }
  if (!EMULADOR) opciones.credential = adminApp.applicationDefault()
  const app = adminApp.getApps().length ? adminApp.getApp() : adminApp.initializeApp(opciones)
  dba = adminFirestore.getFirestore(app)
  FieldValue = adminFirestore.FieldValue
}

const resumen = { leidos: 0, aEscribir: 0, escritos: 0, avisos: [] }

async function existeDoc(coleccion, id) {
  const snap = await dba.collection(coleccion).doc(id).get()
  resumen.leidos++
  return snap.exists
}

// ---------- SEED de la plantilla global ----------
async function seed() {
  console.log(`Seed de plantilla "${plantilla.id}" (${plantilla.estructura.length} fases, ${temasPlantilla.length} temas)`)
  const docs = [
    { coleccion: 'plantillas', id: plantilla.id },
    ...temasPlantilla.map((t) => ({ coleccion: 'plantillasTemas', id: t.docId })),
  ]
  resumen.aEscribir += docs.length

  if (conectar) {
    const yaPlantilla = await existeDoc('plantillas', plantilla.id)
    const snap = await dba.collection('plantillasTemas')
      .where('plantillaId', '==', plantilla.id).get()
    resumen.leidos += snap.size
    const existentes = new Set(snap.docs.map((d) => d.id))
    const nuevos = temasPlantilla.filter((t) => !existentes.has(t.docId)).length
    console.log(`  Estado remoto: plantilla ${yaPlantilla ? 'YA existe (se reescribe)' : 'nueva'}; temas existentes ${existentes.size}, por crear ${nuevos}`)
    if (existentes.size > 0 && existentes.size < temasPlantilla.length) {
      resumen.avisos.push(`Seed parcial detectado (${existentes.size}/${temasPlantilla.length} temas): reejecutar con --apply lo completa.`)
    }
  }

  if (!APPLY) {
    console.log(`  DRY-RUN: se escribirían ${docs.length} docs (1 plantilla + ${temasPlantilla.length} temas).`)
    return
  }
  await dba.collection('plantillas').doc(plantilla.id).set({
    ...plantilla,
    actualizado: FieldValue.serverTimestamp(),
  })
  resumen.escritos++
  for (const grupo of lotes(temasPlantilla, 20)) {
    const batch = dba.batch()
    for (const t of grupo) {
      const { docId, ...datos } = t
      batch.set(dba.collection('plantillasTemas').doc(docId), datos)
    }
    await batch.commit()
    resumen.escritos += grupo.length
    console.log(`  temas escritos: ${resumen.escritos - 1}/${temasPlantilla.length}`)
  }
}

// ---------- CLONACIÓN a una academia ----------
async function clonar(academiaId) {
  const curso = cursoDesdePlantilla({ academiaId, plantilla })
  const { cursoId, temas } = docsClonadosParaAcademia({
    academiaId, plantillaId: plantilla.id, plantillaTemas: temasPlantilla,
  })
  console.log(`Clonación "${plantilla.id}" → academia ${academiaId}`)
  console.log(`  curso destino: cursos/${cursoId} · temas destino: ${temas.length} docs en temas/`)
  resumen.aEscribir += 1 + temas.length

  let existentes = new Set()
  if (conectar) {
    const acaSnap = await dba.collection('academias').doc(academiaId).get()
    resumen.leidos++
    if (!acaSnap.exists) {
      resumen.avisos.push(`La academia ${academiaId} NO existe en ${PROYECTO}: la clonación aplicada fallaría.`)
      console.log(`  ⚠ academias/${academiaId} no existe en el destino.`)
      if (APPLY) throw new Error(`No existe la academia ${academiaId}.`)
    }
    const cursoSnap = await dba.collection('cursos').doc(cursoId).get()
    resumen.leidos++
    const temasSnap = await dba.collection('temas').where('cursoId', '==', cursoId).get()
    resumen.leidos += temasSnap.size
    existentes = new Set(temasSnap.docs.map((d) => d.id))
    const completa = cursoSnap.exists && cursoSnap.data()?.clonacion?.completa
    console.log(`  Estado remoto: curso ${cursoSnap.exists ? (completa ? 'COMPLETO' : 'PARCIAL (se reanuda)') : 'inexistente'}; temas ya clonados ${existentes.size}/${temas.length}`)
    if (cursoSnap.exists && !completa) {
      resumen.avisos.push(`Clonación parcial detectada en ${cursoId}: reejecutar con --apply la completa (idempotente).`)
    }
  }

  if (!APPLY) {
    console.log(`  DRY-RUN: se escribirían ${1 + temas.length} docs + estado 'migrado' en academias/${academiaId}.contenido.`)
    return
  }

  // Secuencia real (espejo de src/lib/firebase/contenido.js, con admin SDK):
  const acaRef = dba.collection('academias').doc(academiaId)
  const marcar = (estado, extra = {}) => acaRef.set({
    contenido: {
      estado, plantillaId: plantilla.id, version: plantilla.version ?? 1,
      actualizado: FieldValue.serverTimestamp(), ...extra,
    },
  }, { merge: true })

  await marcar('migrando')
  try {
    const { docId, ...datosCurso } = curso
    await dba.collection('cursos').doc(docId).set({
      ...datosCurso,
      clonacion: { plantillaId: plantilla.id, version: plantilla.version ?? 1, completa: false, fecha: FieldValue.serverTimestamp() },
      actualizado: FieldValue.serverTimestamp(),
      actualizadoPor: 'script:migrar-contenido',
    })
    resumen.escritos++
    for (const grupo of lotes(temas, 20)) {
      const batch = dba.batch()
      for (const t of grupo) {
        const { docId: temaDocId, ...datos } = t
        batch.set(dba.collection('temas').doc(temaDocId), {
          ...datos, version: plantilla.version ?? 1, actualizado: FieldValue.serverTimestamp(),
        })
      }
      await batch.commit()
      resumen.escritos += grupo.length
      console.log(`  temas escritos: ${resumen.escritos - 1}/${temas.length}`)
    }
    await dba.collection('cursos').doc(cursoId).update({
      'clonacion.completa': true,
      actualizado: FieldValue.serverTimestamp(),
    })
    await marcar('migrado')
    await dba.collection('historial').add({
      academiaId, usuario: 'script:migrar-contenido', accion: 'clonar-plantilla',
      coleccion: 'cursos', docId: cursoId, antes: null,
      despues: { plantillaId: plantilla.id, version: plantilla.version ?? 1, temas: temas.length },
      origen: 'script', fecha: FieldValue.serverTimestamp(),
    })
    console.log(`  ✓ clonación completa; academias/${academiaId}.contenido.estado = 'migrado'`)
  } catch (err) {
    await marcar('error', { detalle: String(err?.message || err) }).catch(() => null)
    throw err
  }
}

// ---------- VERIFICAR una clonación ----------
async function verificar(academiaId) {
  if (!conectar) {
    console.error('✗ --verificar necesita conexión (emulador o --produccion).')
    process.exit(1)
  }
  const cursoId = `${academiaId}__${plantilla.id}`
  const cursoSnap = await dba.collection('cursos').doc(cursoId).get()
  resumen.leidos++
  if (!cursoSnap.exists) {
    console.log(`  cursos/${cursoId}: NO existe (academia sin clonar → legacy).`)
    return
  }
  const curso = cursoSnap.data()
  const esperados = (curso.estructura || []).flatMap((f) =>
    (f.modulos || []).flatMap((m) => (m.temas || []).map((t) => t.id)))
  const snap = await dba.collection('temas').where('cursoId', '==', cursoId).get()
  resumen.leidos += snap.size
  const presentes = new Set(snap.docs.map((d) => d.data().temaId))
  const faltantes = esperados.filter((id) => !presentes.has(id))
  console.log(`  cursos/${cursoId}: clonacion.completa=${Boolean(curso.clonacion?.completa)}; temas ${presentes.size}/${esperados.length}; faltantes: ${faltantes.length ? faltantes.join(', ') : 'ninguno'}`)
}

// ---------- ejecución ----------
try {
  if (SEED) await seed()
  if (ACADEMIA && !VERIFICAR) await clonar(ACADEMIA)
  if (VERIFICAR && ACADEMIA) await verificar(ACADEMIA)

  console.log('')
  console.log('— Resumen —')
  console.log(`  Lecturas remotas : ${resumen.leidos}`)
  console.log(`  Docs del plan    : ${resumen.aEscribir}`)
  console.log(`  Docs escritos    : ${resumen.escritos}${APPLY ? '' : ' (dry-run)'}`)
  for (const a of resumen.avisos) console.log(`  ⚠ ${a}`)
  process.exit(0)
} catch (err) {
  console.error(`✗ Error: ${err?.message || err}`)
  process.exit(1)
}
