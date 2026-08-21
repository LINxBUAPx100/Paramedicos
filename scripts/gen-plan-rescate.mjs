// ============================================================
//  Genera src/data/planRescate.js desde la semilla oficial.
// ------------------------------------------------------------
//  El bundle `src/data` es lo que la app sirve cuando la academia todavía NO
//  tiene su copia clonada en Firestore (el fallback del resolutor). Mientras el
//  temario oficial viviera solo en la semilla, la app seguía enseñando el
//  temario ficticio: por eso se genera aquí, para que el plan de R.E.S.C.A.T.E.
//  sea lo que se ve por defecto, sin depender de credenciales.
//
//  Se GENERA, no se escribe a mano: la única fuente del temario es el PDF
//  transcrito en scripts/seed/plan-rescate.json.
//
//  Uso:  node scripts/gen-plan-rescate.mjs   (o `npm run gen:plan`)
// ============================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import {
  estadoEditorialDe, validarRevision, esEstadoEditorial, esNodoDeEvaluacion, tieneMaterial,
} from '../src/lib/estadoEditorial.js'
import {
  TITULOS_VISIBLES_TEMA, TITULOS_VISIBLES_UNIDAD, TITULOS_VISIBLES_MODULO,
} from '../src/data/contenido/titulosVisibles.js'

// Material de los temas. Puede no existir todavía (la primera generación se
// hace antes de que haya contenido), así que se carga de forma tolerante.
let MATERIAL = {}
let REDACTADOS = []
let REVISIONES = {}
let EVALUACIONES = {}
const rutaContenido = new URL('../src/data/contenido/index.js', import.meta.url)
if (existsSync(rutaContenido)) {
  const mod = await import(rutaContenido.href)
  MATERIAL = mod.default || {}
  REDACTADOS = mod.TEMAS_REDACTADOS || []
  REVISIONES = mod.REVISIONES || {}
  EVALUACIONES = mod.EVALUACIONES || {}
}

// Una ficha editorial mal escrita es peor que no tenerla: haría pasar por
// «validado» algo que nadie firmó. Se comprueba ANTES de generar y se aborta.
for (const [temaId, rev] of Object.entries(REVISIONES)) {
  const error = validarRevision(rev)
  if (error) {
    console.error(`✗ Ficha de revisión inválida en "${temaId}": ${error}`)
    process.exit(1)
  }
}

const SEMILLA = new URL('./seed/plan-rescate.json', import.meta.url)
// Destino del archivo generado. `--salida=<ruta>` lo redirige: lo usan las
// pruebas para comprobar que el archivo del repositorio está al día SIN
// escribir en el árbol de trabajo. Una prueba que reescribe el repositorio
// compite con las demás —el ejecutor corre los archivos en paralelo— y deja el
// árbol distinto de como lo encontró.
const argSalida = process.argv.find((a) => a.startsWith('--salida='))
const DESTINO = argSalida
  ? pathToFileURL(path.resolve(process.cwd(), argSalida.slice(9)))
  : new URL('../src/data/planRescate.js', import.meta.url)

const semilla = JSON.parse(readFileSync(SEMILLA, 'utf8'))
const programa = semilla.programas.find((p) => p.id === 'tum-rescate')
if (!programa) {
  console.error('✗ La semilla no trae el programa tum-rescate.')
  process.exit(1)
}

// Paleta por módulo. Es lo ÚNICO que no sale del PDF (el documento no define
// color); no altera títulos, orden ni contenido.
const COLORES = [
  '#0ea5e9', // 1 Propedéutico
  '#10b981', // 2 El cuerpo humano
  '#f59e0b', // 3 Evaluación y soporte vital
  '#ef4444', // 4 Urgencias médico quirúrgicas
  '#8b5cf6', // 5 Emergencias traumatológicas
  '#14b8a6', // 6 Poblaciones especiales
  '#0891b2', // 7 Operaciones especiales
]

// Los iconos ya NO se escriben aquí. Antes eran emojis (🩹, 🫀, 🚑…) y eso
// costaba tres cosas: los dibujaba la fuente del sistema —el mismo módulo se
// veía distinto en cada plataforma y a veces no se veía—, no respondían al tema
// claro/oscuro, y un lector de pantalla los leía en medio del título.
//
// Ahora cada módulo y cada tema declaran el IDENTIFICADOR de un activo médico
// del catálogo, que es un archivo del repositorio con su autor y su licencia
// registrados. La fuente es src/data/activosMedicos.js, que genera
// `npm run activos:importar`; aquí solo se lee.
const { ICONO_POR_MODULO, ICONO_POR_TEMA } = await import('../src/data/activosMedicos.js')
  .catch(() => ({ ICONO_POR_MODULO: {}, ICONO_POR_TEMA: {} }))

// ---------- alcance de los exámenes del plan ----------
//
// Un parcial que preguntara temas que el grupo aún no ha visto sería, sin más,
// un examen mal armado. La regla es la misma que aplica `alcanceDeExamen` en
// programasModelo.js, calculada aquí sobre la semilla (donde las unidades
// traen sus temas completos) y CONGELADA en el plan generado, para que la UI
// no tenga que reconstruirla:
//
//   · EXAMEN FINAL → desde el inicio del módulo hasta el examen.
//   · parcial      → desde el examen anterior hasta este.
//   · las unidades de examen y de práctica nunca aportan temas.
const esExamen = (u) => (u.tipo || 'contenido') === 'examen'
const esFinal = (u) => /\bfinal\b/i.test(u.titulo || '')

function alcanceDelExamen(modulo, indice) {
  const unidad = modulo.unidades[indice]
  let desde = 0
  if (!esFinal(unidad)) {
    for (let k = indice - 1; k >= 0; k--) {
      if (esExamen(modulo.unidades[k])) { desde = k + 1; break }
    }
  }
  const unidades = modulo.unidades
    .slice(desde, indice)
    .filter((u) => (u.tipo || 'contenido') === 'contenido')
  return {
    esFinal: esFinal(unidad),
    unidades: unidades.map((u) => u.id),
    temas: unidades.flatMap((u) => u.temas.map((t) => t.id)),
  }
}

const modulos = programa.modulos.map((m, i) => {
  const color = COLORES[i] || '#64748b'
  const iconoModulo = ICONO_POR_MODULO[m.id] || ''
  // temaId → alcance, para colgarlo del tema homónimo de la unidad de examen.
  const alcances = {}
  m.unidades.forEach((u, k) => {
    if (!esExamen(u)) return
    const alcance = alcanceDelExamen(m, k)
    for (const t of u.temas) alcances[t.id] = { unidadId: u.id, ...alcance }
  })
  const unidades = m.unidades.map((u) => ({
    id: u.id,
    titulo: u.titulo,
    // Transcripción documental intacta + grafía académica corregida. Ver
    // src/data/contenido/titulosVisibles.js.
    tituloOficial: u.titulo,
    ...(TITULOS_VISIBLES_UNIDAD[u.id] ? { tituloVisible: TITULOS_VISIBLES_UNIDAD[u.id] } : {}),
    tipo: u.tipo || 'contenido',
    numeroOficial: u.numeroOficial ?? null,
    semanas: u.semanas ?? null,
    horas: u.horas ?? null,
    ...(u.opcional ? { opcional: true } : {}),
    ...(u.grupos ? { grupos: u.grupos } : {}),
    ...(u.sesiones ? { sesiones: u.sesiones } : {}),
    ...(u.revisar ? { revisar: true, notaRevision: u.notaRevision } : {}),
    temas: u.temas.map((t) => t.id),
  }))
  // Temas APLANADOS en el orden del plan: es la forma que consume la API de
  // src/data/index.js (módulo → temas). La agrupación por unidad viaja aparte
  // en `unidades`, para que la UI pueda pintar el nivel intermedio.
  const temas = m.unidades.flatMap((u) => u.temas.map((t) => {
    const mat = MATERIAL[t.id] || {}
    const rev = REVISIONES[t.id] || null
    const base = {
      secciones: mat.secciones || [],
      conceptosClave: mat.conceptosClave || [],
      flashcards: mat.flashcards || [],
      quiz: mat.quiz || [],
      objetivos: mat.objetivos || [],
      estadoEditorial: rev?.estado,
      // Un examen o una práctica no se miden por prosa: se miden por su
      // configuración, y sin esto un examen bien armado saldría «vacío».
      evaluacion: EVALUACIONES[t.id] || null,
    }
    // El estado se DECLARA en la ficha, pero un tema sin una sola pieza es
    // `vacio` aunque diga otra cosa: así el rótulo nunca promete material que
    // no existe.
    const estadoEditorial = estadoEditorialDe(base)
    if (rev && esEstadoEditorial(rev.estado) && rev.estado !== estadoEditorial
        && rev.estado !== 'bloqueado_por_decision') {
      console.warn(`  · "${t.id}": ficha dice "${rev.estado}" y el material da "${estadoEditorial}".`)
    }
    return {
    id: t.id,
    titulo: t.titulo,
    tituloOficial: t.titulo,
    ...(TITULOS_VISIBLES_TEMA[t.id] ? { tituloVisible: TITULOS_VISIBLES_TEMA[t.id] } : {}),
    estadoEditorial,
    revision: rev,
    ...(alcances[t.id] ? { alcanceExamen: alcances[t.id] } : {}),
    ...(EVALUACIONES[t.id] ? { evaluacion: EVALUACIONES[t.id] } : {}),
    // El icono sale del catálogo de activos; el contenido puede sobrescribirlo.
    icono: mat.icono || ICONO_POR_TEMA[t.id] || '',
    duracion: mat.duracion || '',
    resumen: mat.resumen || '',
    objetivos: mat.objetivos || [],
    secciones: mat.secciones || [],
    conceptosClave: mat.conceptosClave || [],
    flashcards: mat.flashcards || [],
    quiz: mat.quiz || [],
    recursos: mat.recursos ?? null,
    actividades: mat.actividades ?? null,
    unidadId: u.id,
    unidadTitulo: u.titulo,
    grupo: t.grupo ?? null,
    sesion: t.sesion ?? null,
    ...(t.revisar ? { revisar: true, notaRevision: t.notaRevision } : {}),
    ...(t.generado ? { generado: true } : {}),
    }
  }))
  return {
    id: m.id,
    titulo: m.titulo,
    tituloOficial: m.titulo,
    ...(TITULOS_VISIBLES_MODULO[m.id] ? { tituloVisible: TITULOS_VISIBLES_MODULO[m.id] } : {}),
    subtitulo: m.subtitulo || '',
    descripcion: `${m.encabezadoOficial} — ${m.totales.semanas} semanas · ${m.totales.horas} horas.`,
    color,
    icono: iconoModulo,
    encabezadoOficial: m.encabezadoOficial,
    numeroOficial: m.numeroOficial,
    totales: m.totales,
    unidades,
    temas,
  }
})

const cab = `// ARCHIVO GENERADO por scripts/gen-plan-rescate.mjs — NO editar a mano.
// Temario oficial de la academia R.E.S.C.A.T.E., transcrito del PDF
// «${semilla.fuente}».
// Fuente única: scripts/seed/plan-rescate.json. Para cambiar el temario se
// edita la semilla y se vuelve a generar (npm run gen:plan).
//
// Los temas nacen SIN contenido (secciones, quiz, flashcards, recursos y
// actividades vacíos): el plan define la estructura y los títulos; el material
// se redacta después desde el editor.
`

writeFileSync(
  DESTINO,
  `${cab}export const planRescate = ${JSON.stringify(modulos, null, 2)}\n`
)

const temas = modulos.reduce((n, m) => n + m.temas.length, 0)
const unidades = modulos.reduce((n, m) => n + m.unidades.length, 0)
console.log(`planRescate.js generado → ${modulos.length} módulos, ${unidades} unidades, ${temas} temas`)

// Cobertura EDITORIAL, no mecánica: cuántos temas tienen a alguien detrás.
const porEstado = {}
for (const m of modulos) {
  for (const t of m.temas) porEstado[t.estadoEditorial] = (porEstado[t.estadoEditorial] || 0) + 1
}
console.log('  Estado editorial:', Object.entries(porEstado)
  .sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '))

// Cuántas LECCIONES hay de verdad.
//
// Antes esta línea imprimía `REDACTADOS.length`, que son los ids declarados en
// los archivos de contenido. Contaba 64 porque incluía `m1-examen-aplicacion`,
// un nodo de examen que se declara para configurarlo y que no tiene ni puede
// tener material de estudio. La cifra real de lecciones es 63.
//
// Se cuenta con la MISMA definición que usa el estado editorial —`tieneMaterial`
// sobre el tema ya ensamblado— para que inventario, generador y contenido
// servido no puedan divergir.
const todos = modulos.flatMap((m) => m.temas)
const lecciones = todos.filter((t) => !esNodoDeEvaluacion(t) && tieneMaterial(t))
const evaluaciones = todos.filter((t) => esNodoDeEvaluacion(t))
const declaradosSinMaterial = REDACTADOS
  .filter((id) => !lecciones.some((t) => t.id === id))
console.log(`  Lecciones con material estudiable: ${lecciones.length}`)
console.log(`  Nodos de evaluación configurados: ${evaluaciones.filter((t) => t.evaluacion).length} de ${evaluaciones.length}`)
if (declaradosSinMaterial.length) {
  console.log(`  Ids declarados sin material de estudio: ${declaradosSinMaterial.join(', ')}`)
}
