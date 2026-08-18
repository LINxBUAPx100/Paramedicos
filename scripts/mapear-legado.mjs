// ============================================================
//  Reparte el corpus del temario anterior sobre el plan oficial.
// ------------------------------------------------------------
//  El temario ficticio cubría los mismos contenidos que el plan de
//  R.E.S.C.A.T.E., con otros títulos y otro agrupamiento. Su material ya está
//  redactado, así que no se reescribe: se redistribuye.
//
//  Genera src/data/contenido/reutilizado.js. Lo escrito a mano en los demás
//  archivos de src/data/contenido/ tiene PRIORIDAD sobre lo reutilizado.
//
//  Uso:  node scripts/mapear-legado.mjs            (informe, no escribe)
//        node scripts/mapear-legado.mjs --escribir
//        node scripts/mapear-legado.mjs --umbral=3 --detalle
// ============================================================
import { writeFileSync } from 'node:fs'
import { REGISTRO } from '../src/data/registro.js'
import { repartirCorpus } from '../src/lib/reutilizarContenido.js'
import { planRescate } from '../src/data/planRescate.js'

const args = process.argv.slice(2)
const ESCRIBIR = args.includes('--escribir')
const DETALLE = args.includes('--detalle')
const umbralArg = args.find((a) => a.startsWith('--umbral='))
const UMBRAL = umbralArg ? Number(umbralArg.split('=')[1]) : 2.5

// --- corpus antiguo (sigue en el repo, ya sin importarse desde index.js) ---
const temasLegado = []
for (const r of REGISTRO) {
  for (const t of [...(r.fase.temas || []), ...(r.extra || [])]) temasLegado.push(t)
}

// --- destinos: los 287 temas oficiales, con su unidad como contexto ---
const temasOficiales = planRescate.flatMap((m) =>
  m.temas.map((t) => ({ id: t.id, titulo: t.titulo, unidadId: t.unidadId, unidadTitulo: t.unidadTitulo }))
)

const { contenido, sinUbicar, resumen } = repartirCorpus(temasLegado, temasOficiales, { umbral: UMBRAL })

console.log('— Reparto del corpus anterior sobre el plan oficial —')
console.log(`Origen  : ${temasLegado.length} temas del temario anterior`)
console.log(`Destino : ${temasOficiales.length} temas del plan oficial`)
console.log(`Umbral  : ${UMBRAL}\n`)
console.log(`  temas oficiales que reciben material : ${resumen.temasConMaterial} de ${temasOficiales.length}`)
console.log(`  secciones  : ${resumen.secciones}`)
console.log(`  conceptos  : ${resumen.conceptos}`)
console.log(`  flashcards : ${resumen.flashcards}`)
console.log(`  preguntas  : ${resumen.quiz}`)
console.log(`  sin ubicar : ${resumen.sinUbicar}`)

// Los temas que quedan vacíos son trabajo editorial pendiente: se listan para
// que la academia sepa exactamente qué falta y no lo descubra un alumno.
const vacios = temasOficiales.filter((t) => !contenido[t.id])
console.log(`\n  temas SIN material: ${vacios.length}`)
if (DETALLE) {
  for (const t of vacios) console.log(`    · ${t.id} — ${t.titulo}`)
  console.log('\n  Piezas sin ubicar (revisar a mano):')
  for (const s of sinUbicar.slice(0, 40)) console.log(`    [${s.tipo}] ${s.origen}: ${s.texto}…`)
}

if (!ESCRIBIR) {
  console.log('\nInforme only. Repite con --escribir para generar el archivo.')
  process.exit(0)
}

const cab = `// ⚠️ ARCHIVO GENERADO por scripts/mapear-legado.mjs — NO editar a mano.
// Material del temario ANTERIOR redistribuido sobre los temas del plan oficial
// de R.E.S.C.A.T.E. No se reescribió nada: cada pieza conserva su texto y lleva
// \`procedencia.temaOriginal\` con el tema del que venía.
//
// El reparto es AUTOMÁTICO (solapamiento de términos con peso IDF), así que la
// ubicación de cada pieza es una PROPUESTA que el cuerpo docente debe revisar
// antes de publicar. Lo escrito a mano en los otros archivos de esta carpeta
// tiene prioridad sobre lo de aquí.
//
// Regenerar:  node scripts/mapear-legado.mjs --escribir
`
writeFileSync(
  new URL('../src/data/contenido/reutilizado.js', import.meta.url),
  `${cab}export default ${JSON.stringify(contenido, null, 2)}\n`
)
console.log('\n✓ src/data/contenido/reutilizado.js generado.')
