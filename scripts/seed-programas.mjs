// ============================================================
//  Siembra de PROGRAMAS oficiales desde una semilla JSON.
// ------------------------------------------------------------
//  Convierte scripts/seed/plan-rescate.json (transcripción literal del
//  «PLAN DE ESTUDIOS PARAMÉDICO R.E.S.C.A.T.E.») en las plantillas globales
//  `plantillas/{id}` + `plantillasTemas/{id__temaId}`, que después se clonan a
//  cada academia con scripts/migrar-contenido.mjs --academia=CODIGO.
//
//  DRY-RUN POR DEFECTO: sin --apply NUNCA escribe. Idempotente: los doc-id son
//  deterministas, así que reejecutar reescribe los mismos documentos y jamás
//  duplica (sirve para reanudar una siembra interrumpida).
//
//  Uso:
//    node scripts/seed-programas.mjs                       (plan local, sin conexión)
//    node scripts/seed-programas.mjs --programa=tum-rescate (solo uno)
//    node scripts/seed-programas.mjs --apply                (escribe; exige emulador o --produccion)
//    node scripts/seed-programas.mjs --verificar            (compara lo sembrado con la semilla)
//  Opciones: --semilla=RUTA · --version=N · --produccion
//
//  Conexión (sin credenciales en el repo):
//    - Emulador: exporta FIRESTORE_EMULATOR_HOST (p. ej. 127.0.0.1:8080).
//    - Producción: --produccion + GOOGLE_APPLICATION_CREDENTIALS.
// ============================================================
import { readFileSync } from 'node:fs'
import { plantillaDesdePrograma, metaDePrograma } from '../src/lib/programasModelo.js'
import { temaDocIdEnPlantilla, lotes } from '../src/lib/contenidoModelo.js'

const PROYECTO_DEFAULT = 'ptem-a304f'
const SEMILLA_DEFAULT = new URL('./seed/plan-rescate.json', import.meta.url)

// ---------- argumentos ----------
const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const valor = (n) => {
  const a = args.find((x) => x.startsWith(`--${n}=`))
  return a ? a.split('=').slice(1).join('=') : null
}
const APPLY = flag('apply')
const VERIFICAR = flag('verificar')
const PRODUCCION = flag('produccion')
const SOLO = valor('programa')
const VERSION = Number(valor('version') || 1)
const RUTA = valor('semilla')
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
const PROYECTO = process.env.FIREBASE_PROJECT_ID || PROYECTO_DEFAULT

if (flag('help') || flag('h')) {
  console.log(`Siembra de programas oficiales — dry-run por defecto.

  --programa=ID     siembra SOLO ese programa (default: todos los de la semilla)
  --semilla=RUTA    otra semilla (default scripts/seed/plan-rescate.json)
  --version=N       versión de la plantilla (default 1)
  --verificar       compara lo que hay en Firestore contra la semilla
  --apply           ESCRIBE (sin esto solo se muestra el plan)
  --produccion      permite conectar a producción (con GOOGLE_APPLICATION_CREDENTIALS)`)
  process.exit(0)
}

// ---------- semilla ----------
let semilla
try {
  semilla = JSON.parse(readFileSync(RUTA ? new URL(RUTA, `file://${process.cwd()}/`) : SEMILLA_DEFAULT, 'utf8'))
} catch (err) {
  console.error(`✗ No se pudo leer la semilla: ${err.message}`)
  process.exit(1)
}

const programas = (semilla.programas || []).filter((p) => !SOLO || p.id === SOLO)
if (!programas.length) {
  console.error(SOLO ? `✗ La semilla no tiene un programa "${SOLO}".` : '✗ La semilla no tiene programas.')
  process.exit(1)
}

console.log('— Siembra de programas oficiales —')
console.log(`Fuente                     : ${semilla.fuente || '(sin declarar)'}`)
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

// ---------- conversión (PURA: se valida entera antes de tocar nada) ----------
const planes = []
let avisos = 0
for (const p of programas) {
  let convertido
  try {
    convertido = plantillaDesdePrograma(p, { version: VERSION, temaDocId: temaDocIdEnPlantilla })
  } catch (err) {
    console.error(`✗ ${p.id}: ${err.message}`)
    process.exit(1)
  }
  const { plantilla, temas } = convertido
  const revisar = temas.filter((t) => t.revisar).length
  avisos += revisar
  planes.push({ plantilla, temas, revisar })
  const meta = metaDePrograma(p)
  const unidades = plantilla.estructura.reduce((n, m) => n + m.unidades.length, 0)
  console.log(
    `  ${plantilla.id.padEnd(28)} ${meta.etiquetaCorta.padEnd(14)} `
    + `${String(plantilla.estructura.length).padStart(2)} módulos · `
    + `${String(unidades).padStart(3)} unidades · ${String(temas.length).padStart(4)} temas`
    + (revisar ? `  ⚠ ${revisar} con errata marcada` : '')
  )
}

const totalDocs = planes.reduce((n, p) => n + 1 + p.temas.length, 0)
console.log(`\nDocumentos a escribir: ${totalDocs} (${planes.length} plantillas + ${totalDocs - planes.length} temas)`)
if (avisos) {
  console.log(
    `\n⚠ ${avisos} tema(s) conservan una errata del PDF y llevan \`revisar: true\`.\n`
    + '  Se transcriben LITERALES a propósito: la corrección la decide la academia.'
  )
}

// ---------- conexión ----------
let dba = null
const conectar = Boolean(EMULADOR || PRODUCCION)
if (!conectar) {
  console.log('\nSin conexión: esto es solo el plan local. Exporta FIRESTORE_EMULATOR_HOST o usa --produccion.')
  process.exit(0)
}

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

// ---------- verificación ----------
if (VERIFICAR) {
  let fallos = 0
  for (const { plantilla, temas } of planes) {
    const doc = await dba.doc(`plantillas/${plantilla.id}`).get()
    if (!doc.exists) {
      console.log(`  ✗ ${plantilla.id}: no sembrada`)
      fallos++
      continue
    }
    const snap = await dba.collection('plantillasTemas').where('plantillaId', '==', plantilla.id).get()
    const faltan = temas.length - snap.size
    console.log(
      faltan === 0
        ? `  ✓ ${plantilla.id}: ${snap.size}/${temas.length} temas`
        : `  ✗ ${plantilla.id}: ${snap.size}/${temas.length} temas (faltan ${faltan})`
    )
    if (faltan !== 0) fallos++
  }
  console.log(fallos ? `\n✗ ${fallos} programa(s) incompletos. Reejecuta con --apply (es idempotente).` : '\n✓ Todo sembrado.')
  process.exit(fallos ? 1 : 0)
}

if (!APPLY) {
  console.log('\nDRY-RUN: no se escribió nada. Repite con --apply para sembrar.')
  process.exit(0)
}

// ---------- escritura (por lotes, idempotente) ----------
let escritos = 0
for (const { plantilla, temas } of planes) {
  await dba.doc(`plantillas/${plantilla.id}`).set({ ...plantilla, actualizado: new Date() }, { merge: true })
  escritos++
  // Lotes de 20: el límite de Firestore son 500 operaciones y ~10 MB, y 20
  // deja holgura de sobra aunque un tema crezca al llenarse de contenido.
  for (const lote of lotes(temas, 20)) {
    const batch = dba.batch()
    for (const t of lote) {
      const { docId, ...datos } = t
      batch.set(dba.doc(`plantillasTemas/${docId}`), datos, { merge: true })
    }
    await batch.commit()
    escritos += lote.length
  }
  console.log(`  ✓ ${plantilla.id}: ${temas.length + 1} documentos`)
}

console.log(`\n✓ ${escritos} documentos escritos.`)
console.log('Siguiente paso: clonar a una academia con')
console.log(`  node scripts/migrar-contenido.mjs --academia=CODIGO --plantilla=${planes[0].plantilla.id} --apply`)
