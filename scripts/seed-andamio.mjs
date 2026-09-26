// ============================================================
//  Siembra (y retirada) de los PROGRAMAS DE ANDAMIO
// ------------------------------------------------------------
//  Enfermería, TSU, Licenciatura y Protección Civil, con cuatro módulos de
//  tres lecciones de lorem ipsum cada uno (src/data/programasAndamio.js).
//  Existen para PROBAR: que un programa que no es TUM funciona de punta a punta
//  y que ocultar y desbloquear módulos a un grupo se cumple de verdad (R03).
//  Se borran al terminar las pruebas.
//
//  Dos destinos:
//    · sin --academia: solo las PLANTILLAS globales (`plantillas` +
//      `plantillasTemas`), como hacía la Fase 3. Las ve el super-admin en su
//      catálogo, en borrador, y ningún alumno.
//    · con --academia=CODIGO: además, un CURSO por carrera dentro de esa
//      academia (`cursos`, `temas`, `agregados`), listo para asignarlo a un
//      grupo. Sus temas llevan `moduloId`, así que las reglas de visibilidad
//      por módulo se aplican igual que en el temario real.
//
//  EN BORRADOR POR DEFECTO. Con --publicar, curso, temas y agregados quedan
//  publicados: es lo que hace falta para probar con una cuenta de alumno. Aun
//  así, un alumno solo los ve si su grupo apunta a ese curso, y eso lo decide
//  el director a mano.
//
//  TODO LO QUE ESCRIBE SE RECONOCE Y SE BORRA: ids con prefijo `andamio-`,
//  `esAndamio: true` en cada documento, y --retirar lo quita entero —antes de
//  borrar avisa de qué grupos apuntan todavía a un curso de andamio—.
//
//  DRY-RUN POR DEFECTO: sin --apply NUNCA escribe. Idempotente: los doc-id son
//  deterministas, así que reejecutar reescribe los mismos documentos.
//
//  Uso:
//    node scripts/seed-andamio.mjs                                  (dry-run)
//    node scripts/seed-andamio.mjs --apply                          (plantillas)
//    node scripts/seed-andamio.mjs --academia=RES-2026 --publicar --apply
//    node scripts/seed-andamio.mjs --programa=andamio-tsu --academia=RES-2026 --apply
//    node scripts/seed-andamio.mjs --retirar --academia=RES-2026 --apply
//
//  Conexión (sin credenciales en el repo):
//    - Emulador: exporta FIRESTORE_EMULATOR_HOST (p. ej. 127.0.0.1:8080).
//    - Producción: --produccion + GOOGLE_APPLICATION_CREDENTIALS.
// ============================================================
import { PROGRAMAS_ANDAMIO, esDeAndamio } from '../src/data/programasAndamio.js'
import {
  plantillaDesdeData, cursoDesdePlantilla, docsClonadosParaAcademia, lotes,
} from '../src/lib/contenidoModelo.js'
import { ensamblarModulos, construirApi } from '../src/lib/contenidoApi.js'
import { SELLO, docIdAgregado, docsAgregadosDeCurso } from '../src/lib/agregadosModelo.js'

const PROYECTO_DEFAULT = 'ptem-a304f'

const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const valor = (n) => {
  const a = args.find((x) => x.startsWith(`--${n}=`))
  return a ? a.split('=').slice(1).join('=') : null
}
const APPLY = flag('apply')
const RETIRAR = flag('retirar')
const PUBLICAR = flag('publicar')
const PRODUCCION = flag('produccion')
const SOLO = valor('programa')
const ACADEMIA = valor('academia')
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
// `emulators:exec` exporta GCLOUD_PROJECT con el `--project` que se le pasó.
// Sin mirarlo, el script escribía en el proyecto por defecto mientras las
// comprobaciones leían el del emulador: dos espacios distintos, y el resultado
// era «sembrado correctamente» seguido de «no hay nada».
const PROYECTO = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || PROYECTO_DEFAULT

if (flag('help') || flag('h')) {
  console.log(`Programas de andamio — dry-run por defecto.

  --programa=ID      solo ese programa (default: los cuatro)
  --academia=CODIGO  además, un curso por carrera dentro de esa academia
  --publicar         curso, temas y agregados publicados (para probar con alumnos)
  --retirar          BORRA el andamio en vez de sembrarlo
  --apply            ESCRIBE (sin esto solo se muestra el plan)
  --produccion       permite conectar a producción (con GOOGLE_APPLICATION_CREDENTIALS)`)
  process.exit(0)
}

const elegidos = SOLO ? PROGRAMAS_ANDAMIO.filter((p) => p.id === SOLO) : PROGRAMAS_ANDAMIO
if (!elegidos.length) {
  console.error(`✗ No hay ningún programa de andamio con id "${SOLO}".`)
  console.error(`  Disponibles: ${PROGRAMAS_ANDAMIO.map((p) => p.id).join(', ')}`)
  process.exit(1)
}
if (PUBLICAR && !ACADEMIA) {
  console.error('✗ --publicar solo tiene sentido con --academia: las plantillas no se publican nunca.')
  process.exit(1)
}

const estadoDoc = PUBLICAR ? 'publicado' : 'borrador'

// ---------- documentos a escribir ----------
const paquetes = elegidos.map((programa) => {
  const { plantilla, temas } = plantillaDesdeData({
    id: programa.id,
    nombre: programa.titulo,
    modulos: programa.modulos,
    todosLosTemas: programa.todosLosTemas,
  })
  // La plantilla queda en BORRADOR, no 'publicada': `plantillaDesdeData` la
  // marca publicada porque su caso normal es el temario oficial. Un andamio
  // publicado aparecería en el catálogo del super-admin como si fuera un
  // programa listo para clonar, que es exactamente lo que no debe pasar.
  const plantillaAndamio = {
    ...plantilla, estado: 'borrador', tipoPrograma: programa.tipoPrograma, esAndamio: true,
  }
  const temasPlantilla = temas.map((t) => ({ ...t, esAndamio: true }))
  const paquete = { programa, plantilla: plantillaAndamio, temas: temasPlantilla, curso: null }

  if (ACADEMIA) {
    const curso = cursoDesdePlantilla({ academiaId: ACADEMIA, plantilla: plantillaAndamio })
    const { cursoId, temas: temasCurso } = docsClonadosParaAcademia({
      academiaId: ACADEMIA,
      plantillaId: plantillaAndamio.id,
      plantillaTemas: temasPlantilla,
      estructura: curso.estructura,
    })
    const docsTemas = temasCurso.map((t) => ({ ...t, estado: estadoDoc, esAndamio: true, version: 1, creadoPor: 'script:seed-andamio' }))
    const temasPorId = new Map(docsTemas.map((t) => [t.temaId, t]))
    const { modulos } = ensamblarModulos(curso.estructura, temasPorId, { incluirBorradores: true })
    // Los agregados heredan el estado del curso. Publicados sobre un curso en
    // borrador, el alumno de un grupo que apuntara aquí leería las preguntas
    // de un temario que las reglas le niegan.
    const agregados = docsAgregadosDeCurso({
      academiaId: ACADEMIA, cursoId, modulos: construirApi(modulos).modulos, version: 1,
    }).map((d) => ({ ...d, estado: estadoDoc, esAndamio: true }))
    paquete.curso = {
      doc: {
        ...curso,
        tipoPrograma: programa.tipoPrograma,
        estado: estadoDoc,
        esAndamio: true,
        version: 1,
        creadoPor: 'script:seed-andamio',
        clonacion: { plantillaId: plantillaAndamio.id, version: 1, completa: true },
      },
      temas: docsTemas,
      agregados,
    }
  }
  return paquete
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

// ---------- plan ----------
console.log('\n— Programas de andamio —')
console.log(`  destino:  ${EMULADOR ? `emulador ${EMULADOR}` : PRODUCCION ? `PRODUCCIÓN ${PROYECTO}` : 'ninguno (solo plan)'}`)
console.log(`  modo:     ${RETIRAR ? 'RETIRAR' : 'SEMBRAR'} · ${APPLY ? 'APPLY (escribe)' : 'dry-run'}`)
console.log(`  academia: ${ACADEMIA || '— (solo plantillas globales)'}${ACADEMIA && !RETIRAR ? ` · cursos en ${estadoDoc}` : ''}\n`)

let docs = 0
for (const p of paquetes) {
  const enCurso = p.curso ? 1 + p.curso.temas.length + p.curso.agregados.length + 1 : 0
  console.log(`  ${p.plantilla.id.padEnd(26)} ${p.programa.tipoPrograma.padEnd(16)} ${p.programa.modulos.length} módulos · ${p.temas.length} temas${p.curso ? ` · curso ${p.curso.doc.docId}` : ''}`)
  docs += 1 + p.temas.length + enCurso
}
console.log(`\n  ${docs} documentos en juego`)

if (APPLY && PRODUCCION && !RETIRAR) {
  console.log('\n  ⚠ Vas a escribir en PRODUCCIÓN contenido de relleno.')
  console.log(PUBLICAR
    ? '    Los cursos van PUBLICADOS: cualquier grupo que apunte a ellos los verá.'
    : '    Todo va en borrador: ningún alumno lo alcanza aunque un grupo apunte aquí.')
}

if (!APPLY) {
  console.log('\n  DRY-RUN: no se ha escrito nada. Añade --apply para aplicarlo.\n')
  process.exit(0)
}
if (!conectar) {
  console.error('\n✗ --apply necesita un destino: exporta FIRESTORE_EMULATOR_HOST o usa --produccion.\n')
  process.exit(1)
}

// ---------- ejecución ----------
async function borrarPorLotes(refs) {
  for (const grupo of lotes(refs, 400)) {
    const batch = dba.batch()
    for (const r of grupo) batch.delete(r)
    await batch.commit()
  }
  return refs.length
}

// Solo borra lo que se reconoce como andamio: el id del documento tiene que
// llevar el prefijo. Una consulta mal escrita no puede llevarse un tema real.
const esDocDeAndamio = (docId) => docId.split('__').some((parte) => esDeAndamio(parte))

let escritos = 0
for (const p of paquetes) {
  if (RETIRAR) {
    if (ACADEMIA) {
      const cursoId = `${ACADEMIA}__${p.plantilla.id}`
      // Grupos que todavía apuntan aquí: se avisa ANTES de borrar, porque
      // después se quedarían apuntando a un curso que no existe.
      const grupos = await dba.collection('grupos').where('academiaId', '==', ACADEMIA).get()
      const colgados = grupos.docs.filter((g) => {
        const d = g.data()
        return d.programaId === cursoId || (d.programasExtra || []).includes(cursoId)
      })
      for (const g of colgados) {
        console.log(`  ⚠ el grupo ${g.id} apunta a ${cursoId}: reasígnalo en el panel`)
      }
      const temas = await dba.collection('temas').where('cursoId', '==', cursoId).get()
      const agregados = await dba.collection('agregados').where('cursoId', '==', cursoId).get()
      const refs = [...temas.docs, ...agregados.docs].filter((d) => esDocDeAndamio(d.id)).map((d) => d.ref)
      escritos += await borrarPorLotes(refs)
      if (esDocDeAndamio(cursoId)) {
        await dba.collection('cursos').doc(cursoId).delete()
        escritos += 1
      }
      console.log(`  ✓ retirado ${cursoId} (${refs.length + 1} documentos)`)
    }
    const refsPlantilla = p.temas.filter((t) => esDocDeAndamio(t.docId))
      .map((t) => dba.collection('plantillasTemas').doc(t.docId))
    escritos += await borrarPorLotes(refsPlantilla)
    await dba.collection('plantillas').doc(p.plantilla.id).delete()
    escritos += 1
    console.log(`  ✓ retirada la plantilla ${p.plantilla.id}`)
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
  console.log(`  ✓ plantilla ${p.plantilla.id}`)

  if (p.curso) {
    const { docId: cursoId, ...datosCurso } = p.curso.doc
    await dba.collection('cursos').doc(cursoId).set({ ...datosCurso, actualizado: FieldValue.serverTimestamp() })
    escritos += 1
    for (const grupo of lotes([...p.curso.temas, ...p.curso.agregados], 20)) {
      const batch = dba.batch()
      for (const d of grupo) {
        const { docId, ...datos } = d
        const coleccion = d.tipo ? 'agregados' : 'temas'
        batch.set(dba.collection(coleccion).doc(docId), { ...datos, actualizado: FieldValue.serverTimestamp() })
      }
      await batch.commit()
      escritos += grupo.length
    }
    // El SELLO va al final (mismo invariante que migrar-contenido.mjs): si la
    // escritura se corta, sin sello el resolutor sirve el curso completo.
    await dba.collection('agregados').doc(docIdAgregado(cursoId, SELLO)).set({
      academiaId: ACADEMIA,
      cursoId,
      tipo: SELLO,
      moduloId: null,
      estado: estadoDoc,
      esAndamio: true,
      version: 1,
      documentos: p.curso.agregados.length,
      desactualizado: false,
      actualizado: FieldValue.serverTimestamp(),
      actualizadoPor: 'script:seed-andamio',
    })
    escritos += 1
    console.log(`  ✓ curso ${cursoId} · ${p.curso.temas.length} temas · ${p.curso.agregados.length} agregados + sello`)
  }
}

console.log(`\n  ${escritos} documentos ${RETIRAR ? 'borrados' : 'escritos'}.\n`)
if (!RETIRAR && ACADEMIA) {
  console.log('  Para verlo como alumno: en el panel, apunta un grupo de prueba a uno de estos')
  console.log('  cursos (o añádelo a sus programas extra). Para quitarlo todo al terminar:')
  console.log(`    node scripts/seed-andamio.mjs --retirar --academia=${ACADEMIA} --apply${PRODUCCION ? ' --produccion' : ''}\n`)
}
