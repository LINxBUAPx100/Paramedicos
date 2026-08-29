// ============================================================
//  Siembra de los PROGRAMAS DE ANDAMIO (Fase 3)
// ------------------------------------------------------------
//  Enfermería, TSU, Licenciatura y Protección Civil, con dos lecciones de
//  relleno cada uno, como plantillas globales. Existen para comprobar que un
//  programa que NO es TUM funciona de punta a punta —se ve, se abre, tiene
//  quiz, guarda progreso, respeta el aislamiento por grupo— antes de invertir
//  meses en escribir su temario.
//
//  El contenido es lorem ipsum y cada tema nace en `borrador`: la regla
//  `alumnoLeeCurso` exige 'publicado', así que ningún alumno lo alcanza aunque
//  se clonara por error. Ver src/data/programasAndamio.js.
//
//  DRY-RUN POR DEFECTO: sin --apply NUNCA escribe. Idempotente: los doc-id son
//  deterministas, así que reejecutar reescribe los mismos documentos.
//
//  Uso:
//    node scripts/seed-andamio.mjs                 (dry-run: enseña qué haría)
//    node scripts/seed-andamio.mjs --apply         (escribe; exige emulador o --produccion)
//    node scripts/seed-andamio.mjs --programa=andamio-tsu
//    node scripts/seed-andamio.mjs --retirar --apply   (borra el andamio)
//
//  Conexión (sin credenciales en el repo):
//    - Emulador: exporta FIRESTORE_EMULATOR_HOST (p. ej. 127.0.0.1:8080).
//    - Producción: --produccion + GOOGLE_APPLICATION_CREDENTIALS.
// ============================================================
import { PROGRAMAS_ANDAMIO } from '../src/data/programasAndamio.js'
import { plantillaDesdeData, lotes } from '../src/lib/contenidoModelo.js'

const PROYECTO_DEFAULT = 'ptem-a304f'

const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const valor = (n) => {
  const a = args.find((x) => x.startsWith(`--${n}=`))
  return a ? a.split('=').slice(1).join('=') : null
}
const APPLY = flag('apply')
const RETIRAR = flag('retirar')
const PRODUCCION = flag('produccion')
const SOLO = valor('programa')
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
// `emulators:exec` exporta GCLOUD_PROJECT con el `--project` que se le pasó.
// Sin mirarlo, el script escribía en el proyecto por defecto mientras las
// comprobaciones leían el del emulador: dos espacios distintos, y el resultado
// era «sembrado correctamente» seguido de «no hay nada».
const PROYECTO = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || PROYECTO_DEFAULT

if (flag('help') || flag('h')) {
  console.log(`Siembra de programas de andamio — dry-run por defecto.

  --programa=ID   solo ese programa (default: los cuatro)
  --apply         ESCRIBE (sin esto solo se muestra el plan)
  --retirar       BORRA el andamio en vez de sembrarlo
  --produccion    permite conectar a producción (con GOOGLE_APPLICATION_CREDENTIALS)`)
  process.exit(0)
}

const elegidos = SOLO
  ? PROGRAMAS_ANDAMIO.filter((p) => p.id === SOLO)
  : PROGRAMAS_ANDAMIO

if (!elegidos.length) {
  console.error(`✗ No hay ningún programa de andamio con id "${SOLO}".`)
  console.error(`  Disponibles: ${PROGRAMAS_ANDAMIO.map((p) => p.id).join(', ')}`)
  process.exit(1)
}

// ---------- documentos a escribir ----------
const paquetes = elegidos.map((programa) => {
  const { plantilla, temas } = plantillaDesdeData({
    id: programa.id,
    nombre: programa.titulo,
    modulos: programa.modulos,
    todosLosTemas: programa.todosLosTemas,
  })
  return {
    programa,
    // La plantilla queda en BORRADOR, no 'publicada': `plantillaDesdeData` la
    // marca publicada porque su caso normal es el temario oficial. Un andamio
    // publicado aparecería en el catálogo del super-admin como si fuera un
    // programa listo para clonar, que es exactamente lo que no debe pasar.
    plantilla: { ...plantilla, estado: 'borrador', tipoPrograma: programa.tipoPrograma, esAndamio: true },
    temas: temas.map((t) => ({ ...t, esAndamio: true })),
  }
})

// ---------- conexión (solo si hay a dónde conectar) ----------
let dba = null
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
}

// ---------- ejecución ----------
console.log('\n— Programas de andamio (Fase 3) —')
console.log(`  destino: ${EMULADOR ? `emulador ${EMULADOR}` : PRODUCCION ? `PRODUCCIÓN ${PROYECTO}` : 'ninguno (solo plan)'}`)
console.log(`  modo:    ${RETIRAR ? 'RETIRAR' : 'SEMBRAR'} · ${APPLY ? 'APPLY (escribe)' : 'dry-run'}\n`)

let docs = 0
for (const p of paquetes) {
  const estados = [...new Set(p.temas.map((t) => t.estado))].join(', ')
  console.log(`  ${p.plantilla.id.padEnd(28)} ${p.programa.tipoPrograma.padEnd(14)} ${p.temas.length} temas · ${estados}`)
  docs += 1 + p.temas.length
}
console.log(`\n  ${docs} documentos (${paquetes.length} plantillas + ${docs - paquetes.length} temas)`)

// Un andamio en producción es defendible —la academia quiere ver sus carreras
// futuras— pero tiene que ser una decisión consciente, no el resultado de
// olvidar una bandera.
if (APPLY && PRODUCCION) {
  console.log('\n  ⚠ Vas a escribir en PRODUCCIÓN contenido de relleno.')
  console.log('    Los temas van en borrador y ningún alumno los alcanza, pero')
  console.log('    aparecerán en el catálogo del super-administrador.')
}

if (!APPLY) {
  console.log('\n  DRY-RUN: no se ha escrito nada. Añade --apply para aplicarlo.\n')
  process.exit(0)
}

if (!conectar) {
  console.error('\n✗ --apply necesita un destino: exporta FIRESTORE_EMULATOR_HOST o usa --produccion.\n')
  process.exit(1)
}

let escritos = 0
for (const p of paquetes) {
  if (RETIRAR) {
    for (const grupo of lotes(p.temas, 20)) {
      const batch = dba.batch()
      for (const t of grupo) batch.delete(dba.collection('plantillasTemas').doc(t.docId))
      await batch.commit()
      escritos += grupo.length
    }
    await dba.collection('plantillas').doc(p.plantilla.id).delete()
    escritos += 1
    console.log(`  ✓ retirado ${p.plantilla.id}`)
    continue
  }

  await dba.collection('plantillas').doc(p.plantilla.id).set(p.plantilla)
  escritos += 1
  for (const grupo of lotes(p.temas, 20)) {
    const batch = dba.batch()
    for (const t of grupo) {
      const { docId, ...datos } = t
      batch.set(dba.collection('plantillasTemas').doc(docId), datos)
    }
    await batch.commit()
    escritos += grupo.length
  }
  console.log(`  ✓ sembrado ${p.plantilla.id}`)
}

console.log(`\n  ${escritos} documentos ${RETIRAR ? 'borrados' : 'escritos'}.\n`)
