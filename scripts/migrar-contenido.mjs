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
//    node scripts/migrar-contenido.mjs --agregados --academia=AEP-2026 --apply
//  Opciones: --plantilla=paramedico-tum (default) · --produccion
//            --tipo=basico|avanzado   fija tipoDestino (por omisión CONSERVA el remoto)
//            --version=N              fija el contador (por omisión CONSERVA el remoto)
//            --forzar-estructura      permite BORRAR módulos creados desde el editor
//
//  NO PISA lo que no es suyo: el repositorio manda sobre el contenido del plan,
//  no sobre el tipo de academia destino, el contador de versión ni los módulos
//  que alguien haya añadido desde el editor. Reescribirlos en cada resiembra
//  rompió la plantilla oficial el 31-08-2026.
//
//  Conexión (sin credenciales en el repo):
//    - Emulador: exporta FIRESTORE_EMULATOR_HOST (p. ej. 127.0.0.1:8080).
//    - Producción: requiere --produccion + GOOGLE_APPLICATION_CREDENTIALS
//      apuntando a un service account (nunca se guarda en el repo).
//  Requiere `firebase-admin` (devDependency; fuera del bundle del frontend):
//    npm i -D firebase-admin
// ============================================================
import { modulos, todosLosTemas, stats } from '../src/data/index.js'
import {
  plantillaDesdeData, docsClonadosParaAcademia, cursoDesdePlantilla, lotes,
} from '../src/lib/contenidoModelo.js'
import { ensamblarModulos, construirApi } from '../src/lib/contenidoApi.js'
import { SELLO, docIdAgregado, docsAgregadosDeCurso } from '../src/lib/agregadosModelo.js'
import { huellaTema } from '../src/lib/replicacionModelo.js'
import {
  metadatosDePlantilla, modulosQueSePerderian, versionesPublicadas, versionBloqueada,
} from '../src/lib/seedPlantilla.js'

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
const AGREGADOS = flag('agregados')
const PRODUCCION = flag('produccion')
const ACADEMIA = valor('academia')
const PLANTILLA = valor('plantilla') || PLANTILLA_OFICIAL_ID
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
const PROYECTO = process.env.FIREBASE_PROJECT_ID || PROYECTO_DEFAULT

if (!SEED && !ACADEMIA && !VERIFICAR && !AGREGADOS) {
  console.log(`Migración de contenido PTEM — dry-run por defecto (usa --apply para escribir).

  --seed                 siembra la plantilla oficial (${PLANTILLA_OFICIAL_ID}) desde src/data
  --academia=CODIGO      clona la plantilla al namespace de esa academia
  --verificar            junto con --academia: revisa la clonación Y sus agregados
  --agregados            junto con --academia: SOLO regenera los agregados del curso
  --plantilla=ID         plantilla a usar (default ${PLANTILLA_OFICIAL_ID})
  --apply                ESCRIBE (sin esto solo se muestra el plan)
  --produccion           permite conectar a producción (requiere GOOGLE_APPLICATION_CREDENTIALS)

Temario local: ${stats.modulos} modulos · ${stats.temas} temas · ${stats.preguntas} preguntas · ${stats.flashcards} flashcards`)
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
//
// `tipoDestino` y `version` salen de aquí solo como VALOR INICIAL, para el caso
// de que la plantilla todavía no exista. Si ya existe, se conservan los suyos
// (ver `src/lib/seedPlantilla.js`). Antes iban fijos —'basico' y 1— y este
// script los reescribía en cada ejecución: el 31-08-2026 eso dejó la plantilla
// oficial marcada como «basico» frente a una academia «avanzado» —bloqueando su
// replicación con un aviso de incompatibilidad que nadie había provocado— y
// reinició el contador de versión a 1 cuando ya había una v7 publicada, con lo
// que publicar la siguiente versión dejó de ser posible.
const { plantilla, temas: temasPlantilla } = plantillaDesdeData({
  id: PLANTILLA === PLANTILLA_OFICIAL_ID ? PLANTILLA_OFICIAL_ID : PLANTILLA,
  nombre: PLANTILLA_OFICIAL_NOMBRE,
  tipoDestino: valor('tipo') || 'basico',
  version: Number(valor('version')) || 1,
  modulos,
  todosLosTemas,
})
const TIPO_EXPLICITO = Boolean(valor('tipo'))
const VERSION_EXPLICITA = Boolean(valor('version'))

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
  console.log(`Seed de plantilla "${plantilla.id}" (${plantilla.estructura.length} modulos, ${temasPlantilla.length} temas)`)
  const docs = [
    { coleccion: 'plantillas', id: plantilla.id },
    ...temasPlantilla.map((t) => ({ coleccion: 'plantillasTemas', id: t.docId })),
  ]
  resumen.aEscribir += docs.length

  if (conectar) {
    const refP = dba.collection('plantillas').doc(plantilla.id)
    const snapP = await refP.get()
    resumen.leidos++
    const yaPlantilla = snapP.exists
    const remota = yaPlantilla ? snapP.data() : null

    // --- 1. Metadatos que NO son del repositorio ---
    // El repositorio manda sobre el CONTENIDO del plan oficial. No manda sobre
    // a qué tipo de academia va dirigida la plantilla ni por qué versión va:
    // eso lo deciden desde el panel, y reescribirlo en cada resiembra es
    // pisarle el trabajo a quien lo puso.
    if (remota) {
      Object.assign(plantilla, metadatosDePlantilla({
        remota,
        tipoInicial: plantilla.tipoDestino,
        versionInicial: plantilla.version,
        tipoExplicito: TIPO_EXPLICITO,
        versionExplicita: VERSION_EXPLICITA,
      }))
    }

    // --- 2. El contador de versión contra lo ya publicado ---
    // `publicarVersionPlantilla` crea el snapshot `plantilla__vN` con la N que
    // lleve la plantilla y se niega si ese documento ya existe. Si el contador
    // quedó por debajo de una versión publicada, publicar la siguiente es
    // imposible. Se detecta y se dice cómo arreglarlo; no se toca solo, porque
    // mover un contador de versión a ciegas es peor que avisar.
    const vs = await dba.collection('plantillasVersiones').get()
    resumen.leidos += vs.size
    const publicadas = versionesPublicadas(plantilla.id, vs.docs.map((d) => d.id))
    const maxPublicada = publicadas.length ? Math.max(...publicadas) : 0
    const bloqueo = versionBloqueada(plantilla.version, publicadas)
    if (bloqueo) {
      resumen.avisos.push(
        `El contador de versión de la plantilla (${bloqueo.version}) NO supera a la mayor ` +
        `versión publicada (v${bloqueo.mayorPublicada}). Publicar la siguiente versión ` +
        `fallará. Corrígelo con --version=${bloqueo.sugerida}.`
      )
    }

    // --- 3. Módulos creados desde el editor ---
    // Éste es el que muerde en silencio: el seed hace `set()` de la estructura
    // entera con los módulos del repositorio, así que un módulo añadido desde
    // el editor de contenido desaparece sin dejar rastro. Pasó a un paso de
    // pasar el 31-08-2026 con un módulo «NORMATIVAS» recién creado.
    const soloRemotos = modulosQueSePerderian(plantilla.estructura, remota?.estructura)
    if (soloRemotos.length && !flag('forzar-estructura')) {
      console.error(
        `\n✗ La plantilla remota tiene ${soloRemotos.length} módulo(s) que NO están en el ` +
        `repositorio y que esta operación BORRARÍA:\n` +
        soloRemotos.map((m) => `    · ${m.id} — ${m.titulo || '(sin título)'}`).join('\n') +
        `\n\n  Se crearon desde el editor de contenido. Opciones:\n` +
        `    · pásalos al repositorio y vuelve a ejecutar; o\n` +
        `    · --forzar-estructura para borrarlos a sabiendas.\n`
      )
      process.exit(1)
    }
    if (soloRemotos.length) {
      resumen.avisos.push(`--forzar-estructura: se BORRAN ${soloRemotos.length} módulo(s) creados desde el editor.`)
    }

    const snap = await dba.collection('plantillasTemas')
      .where('plantillaId', '==', plantilla.id).get()
    resumen.leidos += snap.size
    const existentes = new Set(snap.docs.map((d) => d.id))
    const nuevos = temasPlantilla.filter((t) => !existentes.has(t.docId)).length
    console.log(`  Estado remoto: plantilla ${yaPlantilla ? 'YA existe (se reescribe)' : 'nueva'}; temas existentes ${existentes.size}, por crear ${nuevos}`)
    console.log(`  Metadatos: tipoDestino=${plantilla.tipoDestino} version=${plantilla.version}` +
      `${maxPublicada ? ` (mayor publicada: v${maxPublicada})` : ''}`)
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

// ---------- AGREGADOS del curso ----------
//
// POR QUÉ ESTO ESTÁ AQUÍ, Y NO ESTABA.
//
// Los agregados son las vistas derivadas del temario —glosario, buscador, banco
// de exámenes, mazo, galería y contadores— precalculadas en documentos pequeños
// para que abrir UNA lección no cueste las 287 lecturas del curso entero. El
// porqué completo está en `src/lib/agregadosModelo.js`.
//
// La aplicación los escribe al clonar (`clonarPlantillaAAcademia`). Este script
// NO los mencionaba una sola vez: no falló al generarlos, nunca lo intentó. Por
// eso R.E.S.C.A.T.E. quedó migrada sin ellos el 31-08-2026 —288 documentos
// escritos, 287 verificados, `agregados` en cero— y cada carga de contenido
// volvió a costar 288 lecturas en vez de 3. Nada se rompía: el resolutor cae al
// camino completo, que es correcto. Solo se perdía el objetivo de la Fase 1, y
// con él la cuota diaria del plan gratuito: ~173 cargas al día en vez de ~16 600.
//
// Espejo de `escribirAgregadosDeCurso` (src/lib/firebase/agregados.js) con el
// SDK de administración. Dos invariantes que no se cambian:
//   · el SELLO va al FINAL. Si la escritura se corta a medias no llega, y sin
//     sello el resolutor ni intenta el camino barato: sirve el curso completo,
//     más caro pero correcto. Sellar primero dejaría agregados incompletos
//     marcados como buenos, y el examen saldría corto sin que nadie se enterara;
//   · los ids son deterministas, así que reejecutar sobrescribe y nunca duplica.

// Plan de agregados, sin conexión: qué documentos saldrían de esta estructura y
// estos temas. Se calcula igual en dry-run que en apply, para que el dry-run
// diga la cifra de verdad y no una estimación.
function planAgregados({ academiaId, cursoId, estructura, temas, version }) {
  const temasPorId = new Map((temas || []).map((t) => [t.temaId, t]))
  const { modulos: ensamblados, faltantes } = ensamblarModulos(estructura, temasPorId, { incluirBorradores: true })
  const docs = docsAgregadosDeCurso({
    academiaId, cursoId, version,
    modulos: construirApi(ensamblados).modulos,
  })
  return { docs, faltantes }
}

async function escribirAgregados({ academiaId, cursoId, estructura, temas, version }) {
  const { docs, faltantes } = planAgregados({ academiaId, cursoId, estructura, temas, version })
  if (faltantes.length) {
    // No aborta: un tema declarado en la estructura sin documento ya es un
    // problema anterior a los agregados, y generarlos sin él es mejor que no
    // generarlos. Pero se dice, porque su examen y su glosario faltarán.
    resumen.avisos.push(
      `Agregados: ${faltantes.length} tema(s) de la estructura no tienen documento ` +
      `(${faltantes.slice(0, 3).join(', ')}${faltantes.length > 3 ? ', …' : ''}). Se generan sin ellos.`
    )
  }
  resumen.aEscribir += docs.length + 1 // + el sello
  console.log(`  agregados: ${docs.length} documentos + sello (v${version})`)

  if (!APPLY) {
    console.log(`  DRY-RUN: se escribirían ${docs.length + 1} docs en agregados/.`)
    return { escritos: 0, docs: docs.length }
  }

  for (const grupo of lotes(docs, 20)) {
    const batch = dba.batch()
    for (const d of grupo) {
      const { docId, ...datos } = d
      batch.set(dba.collection('agregados').doc(docId), {
        ...datos,
        actualizado: FieldValue.serverTimestamp(),
        actualizadoPor: 'script:migrar-contenido',
      })
    }
    await batch.commit()
    resumen.escritos += grupo.length
  }
  await dba.collection('agregados').doc(docIdAgregado(cursoId, SELLO)).set({
    academiaId,
    cursoId,
    tipo: SELLO,
    moduloId: null,
    estado: 'publicado',
    version,
    documentos: docs.length,
    desactualizado: false,
    actualizado: FieldValue.serverTimestamp(),
    actualizadoPor: 'script:migrar-contenido',
  })
  resumen.escritos++
  console.log(`  ✓ agregados escritos y sellados (${docs.length} + sello)`)
  return { escritos: docs.length + 1, docs: docs.length }
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
    const { docs } = planAgregados({
      academiaId, cursoId, estructura: curso.estructura, temas, version: plantilla.version ?? 1,
    })
    resumen.aEscribir += docs.length + 1
    console.log(`  DRY-RUN: se escribirían ${1 + temas.length} docs de contenido + ${docs.length + 1} de agregados` +
      ` + estado 'migrado' en academias/${academiaId}.contenido.`)
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
          ...datos,
          version: plantilla.version ?? 1,
          // Sello de origen (Fase 7): huella para detectar cambios locales.
          origen: {
            plantillaId: plantilla.id,
            version: plantilla.version ?? 1,
            hash: huellaTema(datos),
            replicacionId: 'clonacion',
          },
          actualizado: FieldValue.serverTimestamp(),
        })
      }
      await batch.commit()
      resumen.escritos += grupo.length
      console.log(`  temas escritos: ${resumen.escritos - 1}/${temas.length}`)
    }
    // AGREGADOS desde los mismos temas que se acaban de escribir, no
    // releyéndolos: serían 287 lecturas para producir lo que ya está en memoria.
    //
    // Un fallo aquí NO invalida la clonación —los temas ya están y el curso
    // funciona por el camino completo— pero SÍ queda escrito en el documento del
    // curso, para que el panel del director lo enseñe y se pueda consultar
    // después. Un aviso que solo vive en una consola cerrada no es un aviso.
    let resultadoAgregados = 'ok'
    let motivoAgregados = null
    try {
      await escribirAgregados({
        academiaId, cursoId, estructura: curso.estructura, temas, version: plantilla.version ?? 1,
      })
    } catch (err) {
      resultadoAgregados = 'fallo'
      motivoAgregados = String(err?.message || err).slice(0, 300)
      resumen.avisos.push(
        `Agregados NO generados para ${cursoId}: ${motivoAgregados}. El curso funciona, pero cada ` +
        `carga costará ${temas.length + 1} lecturas en vez de 3. Regenéralos con --agregados o ` +
        `desde Panel → Contenido.`
      )
    }

    await dba.collection('cursos').doc(cursoId).update({
      'clonacion.completa': true,
      'clonacion.agregados': resultadoAgregados,
      'clonacion.agregadosMotivo': motivoAgregados,
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

// ---------- SOLO AGREGADOS de un curso ya clonado ----------
//
// Cuesta las 287 lecturas del curso, y por eso NO es la vía normal: en
// producción esto lo arregla un director desde Panel → Contenido, con su propia
// sesión y sin que nadie tenga que repartir una clave de service account —que
// es justo el error que ya se cometió una vez—. Esta vía existe para el
// emulador, para academias de prueba y para quien YA tiene la credencial porque
// es el dueño del proyecto.
async function soloAgregados(academiaId) {
  if (!conectar) {
    console.error('✗ --agregados necesita conexión (emulador o --produccion).')
    process.exit(1)
  }
  const cursoId = `${academiaId}__${plantilla.id}`
  const cursoSnap = await dba.collection('cursos').doc(cursoId).get()
  resumen.leidos++
  if (!cursoSnap.exists) {
    console.error(`✗ No existe cursos/${cursoId}. Clona primero con --academia=${academiaId} --apply.`)
    process.exit(1)
  }
  const curso = cursoSnap.data()
  const temasSnap = await dba.collection('temas').where('cursoId', '==', cursoId).get()
  resumen.leidos += temasSnap.size
  const temas = temasSnap.docs.map((d) => d.data())
  console.log(`Agregados de cursos/${cursoId} — ${temas.length} temas leídos`)

  // Versión del sello: la siguiente a la que hubiera, igual que hace
  // `regenerarAgregados` en la aplicación. El número solo tiene que subir.
  const selloSnap = await dba.collection('agregados').doc(docIdAgregado(cursoId, SELLO)).get()
  resumen.leidos++
  const version = (selloSnap.exists ? selloSnap.data()?.version || 0 : 0) + 1

  await escribirAgregados({ academiaId, cursoId, estructura: curso.estructura, temas, version })
  if (!APPLY) return
  await dba.collection('cursos').doc(cursoId).update({
    'clonacion.agregados': 'ok',
    'clonacion.agregadosMotivo': null,
    actualizado: FieldValue.serverTimestamp(),
  })
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
    (f.unidades || []).flatMap((m) => (m.temas || []).map((t) => t.id)))
  const snap = await dba.collection('temas').where('cursoId', '==', cursoId).get()
  resumen.leidos += snap.size
  const presentes = new Set(snap.docs.map((d) => d.data().temaId))
  const faltantes = esperados.filter((id) => !presentes.has(id))
  console.log(`  cursos/${cursoId}: clonacion.completa=${Boolean(curso.clonacion?.completa)}; temas ${presentes.size}/${esperados.length}; faltantes: ${faltantes.length ? faltantes.join(', ') : 'ninguno'}`)

  // Los AGREGADOS, que es lo que faltaba mirar aquí. Una clonación puede estar
  // «completa» y correcta y aun así costar 288 lecturas por carga: eso es
  // exactamente lo que pasó con R.E.S.C.A.T.E. y lo que nadie vio durante
  // semanas, porque esta verificación no los miraba.
  const selloSnap = await dba.collection('agregados').doc(docIdAgregado(cursoId, SELLO)).get()
  resumen.leidos++
  const agSnap = await dba.collection('agregados').where('cursoId', '==', cursoId).get()
  resumen.leidos += agSnap.size
  const sello = selloSnap.exists ? selloSnap.data() : null
  if (!sello) {
    console.log(`  agregados: SIN SELLO (${agSnap.size} docs). Cada carga de contenido cuesta ${esperados.length + 1} lecturas en vez de 3.`)
    resumen.avisos.push(
      `El curso ${cursoId} no tiene agregados sellados. Regenéralos desde Panel → Contenido ` +
      `o con --agregados --academia=${academiaId} --apply.`
    )
  } else if (sello.desactualizado) {
    console.log(`  agregados: sello v${sello.version} DESACTUALIZADO (${agSnap.size} docs presentes). Se sirve por el camino completo hasta regenerarlos.`)
    resumen.avisos.push(`Los agregados de ${cursoId} están marcados como desactualizados tras una edición.`)
  } else {
    const esperadosAg = (sello.documentos || 0) + 1 // + el propio sello
    const ok = agSnap.size >= esperadosAg
    console.log(`  agregados: sello v${sello.version} al día; documentos ${agSnap.size}/${esperadosAg}${ok ? "" : " ← INCOMPLETO"}`)
    if (!ok) resumen.avisos.push(`Faltan documentos de agregados en ${cursoId}: el sello dice ${esperadosAg} y hay ${agSnap.size}.`)
  }
}

// ---------- ejecución ----------
try {
  if (AGREGADOS && !ACADEMIA) {
    console.error('✗ --agregados necesita --academia=CODIGO.')
    process.exit(1)
  }
  if (SEED) await seed()
  if (ACADEMIA && AGREGADOS) await soloAgregados(ACADEMIA)
  else if (ACADEMIA && !VERIFICAR) await clonar(ACADEMIA)
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
