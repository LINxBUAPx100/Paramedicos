// ============================================================
//  Migración de matrículas al formato por generación (21-09-2026)
// ------------------------------------------------------------
//  QUÉ HACE. Recorre a los ALUMNOS de una academia y les emite la matrícula
//  nueva: siete dígitos que dicen generación, mes de inicio del grupo, día de
//  clase y orden de llegada, con la tarde a partir del 51 (lib/matriculas.js).
//  Se pidió que TODOS tengan matrícula, exista ya el usuario o no.
//
//  LO QUE NO HACE, Y HAY QUE SABERLO ANTES DE EJECUTARLO:
//
//   · **No reescribe los pagos.** Un pago es inmutable por regla (`allow
//     update: if false` en /pagos) y guarda la matrícula que estaba vigente el
//     día del cobro. Por eso la matrícula anterior de cada persona se conserva
//     en `matriculasAnteriores`, y las pantallas buscan su dinero por todas.
//     Si se borrara ese campo, el historial de cobros dejaría de encontrarse.
//   · **No inventa datos del grupo.** Si a un grupo le falta la generación, la
//     fecha de inicio, el día único de clase o la hora, sus alumnos se quedan
//     como están y el informe dice exactamente qué falta y en qué grupo. Eso lo
//     arregla la dirección, no un script.
//   · **No toca a quien no tiene grupo.** La matrícula la dicta el grupo: sin
//     grupo no hay número que emitir. Salen listados aparte.
//
//  EL ORDEN DE LLEGADA. Dentro de cada serie y turno se ordena por la fecha de
//  alta del perfil (`creado`), y a falta de ella por el número de su matrícula
//  vieja y luego por el nombre. No es perfecto —el sistema no guarda la fecha
//  real de inscripción de quien entró antes que él— pero es reproducible: dos
//  ejecuciones dan el mismo resultado.
//
//  DRY-RUN POR DEFECTO: sin --apply no escribe nada, e imprime la tabla entera
//  de lo que haría.
//
//  Uso:
//    node scripts/migrar-matriculas.mjs                      (enseña el plan)
//    node scripts/migrar-matriculas.mjs --apply               (emulador)
//    node scripts/migrar-matriculas.mjs --apply --produccion  (de verdad)
//    node scripts/migrar-matriculas.mjs --academia=RESCATE
// ============================================================
import {
  RANGOS_TURNO, esMatriculaValida, formatearMatricula, partirMatriculaHeredada,
  serieDeGrupo,
} from '../src/lib/matriculas.js'

const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const valor = (n) => (args.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1] || ''
const APPLY = flag('apply')
const PRODUCCION = flag('produccion')
const SOLO_ACADEMIA = valor('academia')
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
const PROYECTO = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || 'ptem-a304f'

if (flag('help') || flag('h')) {
  console.log(`Migración de matrículas — dry-run por defecto.

  --apply             ESCRIBE (sin esto solo se muestra el plan)
  --produccion        permite escribir fuera del emulador
  --academia=CODIGO   solo esa academia`)
  process.exit(0)
}

if (APPLY && !EMULADOR && !PRODUCCION) {
  console.error('✗ Sin FIRESTORE_EMULATOR_HOST esto escribiría en producción. Añade --produccion si es lo que quieres.')
  process.exit(1)
}

let adminApp; let adminFirestore
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
const db = adminFirestore.getFirestore(app)

// ------------------------------------------------------------
//  Leer
// ------------------------------------------------------------
const alumnos = []
{
  let q = db.collection('usuarios').where('rol', '==', 'alumno')
  if (SOLO_ACADEMIA) q = q.where('academiaId', '==', SOLO_ACADEMIA)
  const snap = await q.get()
  snap.forEach((d) => alumnos.push({ uid: d.id, ...d.data() }))
}

const grupos = new Map()
{
  const snap = await db.collection('grupos').get()
  snap.forEach((d) => grupos.set(d.id, { id: d.id, ...d.data() }))
}

console.log(`\nAlumnos leídos: ${alumnos.length}${SOLO_ACADEMIA ? ` (academia ${SOLO_ACADEMIA})` : ''}`)
console.log(`Grupos leídos:  ${grupos.size}\n`)

// ------------------------------------------------------------
//  Repartir
// ------------------------------------------------------------
const sinGrupo = []
const gruposIncompletos = new Map() // grupoId → problemas
const porSerie = new Map()          // `${academiaId}|${clave}` → alumnos

for (const a of alumnos) {
  if (!a.grupoId) { sinGrupo.push(a); continue }
  const grupo = grupos.get(a.grupoId)
  if (!grupo) {
    gruposIncompletos.set(a.grupoId, ['El grupo ya no existe: reasígnalo antes de emitir su matrícula.'])
    continue
  }
  const serie = serieDeGrupo(grupo)
  if (!serie.ok) {
    gruposIncompletos.set(`${grupo.nombre || grupo.id} (${grupo.id})`, serie.problemas)
    continue
  }
  const llave = `${a.academiaId}|${serie.clave}`
  if (!porSerie.has(llave)) porSerie.set(llave, { academiaId: a.academiaId, serie, alumnos: [] })
  porSerie.get(llave).alumnos.push(a)
}

/** Orden reproducible: fecha de alta, luego matrícula vieja, luego nombre. */
const ordenar = (lista) => lista.slice().sort((x, y) => (
  (x.creado?._seconds ?? x.creado?.seconds ?? Number.MAX_SAFE_INTEGER)
  - (y.creado?._seconds ?? y.creado?.seconds ?? Number.MAX_SAFE_INTEGER)
  || (partirMatriculaHeredada(x.matricula)?.numero ?? Number.MAX_SAFE_INTEGER)
  - (partirMatriculaHeredada(y.matricula)?.numero ?? Number.MAX_SAFE_INTEGER)
  || String(x.nombre || '').localeCompare(String(y.nombre || ''), 'es')
))

const plan = []
const desbordadas = []

for (const { academiaId, serie, alumnos: suyos } of porSerie.values()) {
  const rango = RANGOS_TURNO[serie.turno]
  let orden = rango.desde
  for (const a of ordenar(suyos)) {
    // Quien ya tiene una matrícula NUEVA y correcta de esta serie la conserva:
    // volver a emitirla en cada pasada convertiría el script en una fuente de
    // credenciales caducadas.
    if (esMatriculaValida(a.matricula) && a.matricula.startsWith(serie.serie)) {
      plan.push({ a, matricula: a.matricula, cambia: false, serie })
      continue
    }
    if (orden > rango.hasta) {
      desbordadas.push({ serie: serie.clave, alumno: a })
      continue
    }
    plan.push({ a, matricula: formatearMatricula(serie.serie, orden), cambia: true, serie })
    orden += 1
  }
}

// ------------------------------------------------------------
//  Informar
// ------------------------------------------------------------
const cambian = plan.filter((p) => p.cambia)
console.log('--- LO QUE SE EMITIRÍA ---------------------------------------')
for (const { a, matricula, serie } of cambian) {
  const antes = a.matricula || '—'
  console.log(`  ${String(a.nombre || a.email || a.uid).padEnd(34).slice(0, 34)}  ${antes.padEnd(10)} → ${matricula}   [${serie.clave}]`)
}
console.log(`\n  ${cambian.length} matrícula(s) nueva(s); ${plan.length - cambian.length} ya estaban bien.`)

if (sinGrupo.length) {
  console.log('\n--- SIN GRUPO: no se les puede emitir --------------------------')
  console.log('  La matrícula sale de la generación, el mes, el día y el turno del grupo.')
  for (const a of sinGrupo) console.log(`  · ${a.nombre || a.email || a.uid}  (${a.academiaId || 'sin academia'})`)
}

if (gruposIncompletos.size) {
  console.log('\n--- GRUPOS A LOS QUE LES FALTAN DATOS --------------------------')
  for (const [grupo, problemas] of gruposIncompletos) {
    console.log(`  · ${grupo}`)
    for (const p of problemas) console.log(`      ${p}`)
  }
}

if (desbordadas.length) {
  console.log('\n--- SERIES AGOTADAS --------------------------------------------')
  console.log('  Caben 49 alumnos por turno y serie. Estos se quedan sin número:')
  for (const d of desbordadas) console.log(`  · ${d.alumno.nombre || d.alumno.uid} — serie ${d.serie}`)
}

if (!APPLY) {
  console.log('\n(dry-run: no se escribió nada. Añade --apply para aplicarlo.)\n')
  process.exit(0)
}

// ------------------------------------------------------------
//  Escribir
// ------------------------------------------------------------
let escritas = 0
for (const { a, matricula } of cambian) {
  const anterior = String(a.matricula || '').trim()
  const previas = Array.isArray(a.matriculasAnteriores) ? a.matriculasAnteriores : []
  const parche = { matricula }
  // La anterior se guarda SIEMPRE que exista: los pagos ya cobrados la llevan
  // dentro y son inmutables.
  if (anterior && anterior !== matricula) {
    parche.matriculasAnteriores = [...new Set([...previas, anterior])]
  }
  await db.collection('usuarios').doc(a.uid).update(parche)
  escritas += 1
}

// Los contadores quedan por encima del último repartido, para que el próximo
// alta siga la cuenta en vez de repetir un número.
let contadores = 0
for (const { academiaId, serie, alumnos: suyos } of porSerie.values()) {
  const delGrupo = plan.filter((p) => p.serie.clave === serie.clave && suyos.includes(p.a))
  const ultimo = delGrupo.reduce((mayor, p) => {
    const n = Number(String(p.matricula).slice(5))
    return n > mayor ? n : mayor
  }, RANGOS_TURNO[serie.turno].desde - 1)
  if (ultimo < RANGOS_TURNO[serie.turno].desde) continue
  await db.collection('contadores').doc(academiaId).collection('series').doc(serie.clave)
    .set({ academiaId, serie: serie.serie, turno: serie.turno, ultimo }, { merge: true })
  contadores += 1
}

console.log(`\n✓ ${escritas} perfil(es) actualizado(s) y ${contadores} contador(es) de serie puestos al día.\n`)
