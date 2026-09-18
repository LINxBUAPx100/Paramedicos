// ============================================================
//  Cola de CONTRASTE contra evidencia externa (OpenEvidence u otra búsqueda)
// ------------------------------------------------------------
//  Qué problema resuelve. El temario tiene 268 lecciones con material y 828
//  referencias, pero «tiene fuente» no es «está comprobado»: la fuente dice de
//  dónde salió la frase, no que la frase siga siendo cierta hoy. Contrastar a
//  ojo 268 lecciones es inviable y contrastarlas al azar no prueba nada.
//
//  Este script extrae las afirmaciones comprobables (ver
//  `src/lib/contrasteEvidencia.js`) y las ordena por el daño que haría
//  equivocarse. El resultado es una cola finita y priorizada: unas decenas de
//  preguntas concretas, no un temario entero.
//
//  QUÉ NO HACE, y es deliberado:
//
//    · No consulta nada. La consulta la hace una persona con su sesión, y
//      pega el resultado en `docs/CONTRASTE-EVIDENCIA.json`.
//    · No corrige lecciones. Un veredicto es un HALLAZGO; la corrección se
//      hace después, en la lección concreta, como manda CLAUDE.md.
//    · No convierte al buscador en fuente. Sirve para LOCALIZAR la guía o el
//      artículo primario, que es lo que se cita.
//
//  Uso:  node scripts/contraste-evidencia.mjs             (resumen)
//        node scripts/contraste-evidencia.mjs --lista     (cola completa)
//        node scripts/contraste-evidencia.mjs --md        (escribe docs/CONTRASTE-EVIDENCIA.md)
//        node scripts/contraste-evidencia.mjs --top 40    (tamaño del lote piloto)
// ============================================================
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { planRescate } from '../src/data/planRescate.js'
import { afirmacionesDe, agrupar, fuentesDeBuscador } from '../src/lib/contrasteEvidencia.js'

const args = process.argv.slice(2)
const LISTA = args.includes('--lista')
const MD = args.includes('--md')
const TOP = Number(args[args.indexOf('--top') + 1]) || 40

const LIBRO = 'docs/CONTRASTE-EVIDENCIA.json'

// ---------- 1. temas del plan, con su módulo ----------

const temas = []
for (const m of planRescate) {
  for (const u of m.unidades) {
    for (const temaId of u.temas) {
      const t = m.temas.find((x) => x.id === temaId)
      if (t) temas.push({ ...t, modulo: m.numeroOficial })
    }
  }
}

const afirmaciones = afirmacionesDe(temas)
const hechos = agrupar(afirmaciones)

// ---------- 2. libro de veredictos ----------

const libro = existsSync(LIBRO) ? JSON.parse(readFileSync(LIBRO, 'utf8')) : { entradas: [] }
const yaVisto = new Map((libro.entradas || []).map((e) => [e.id, e]))

const cola = hechos
  .filter((a) => a.ambito === 'evidencia')
  // Basta con que una de las formulaciones del hecho tenga veredicto: son la
  // misma cifra y se comprobaron juntas.
  .filter((a) => !a.idsAgrupados.some((id) => yaVisto.has(id)))
const ORDEN = { alto: 0, medio: 1, bajo: 2 }
cola.sort((a, b) => ORDEN[a.riesgo] - ORDEN[b.riesgo] || b.temas.length - a.temas.length)

// Pregunta lista para pegar. El armazón va en inglés porque el corpus que
// indexan estos buscadores lo está; la frase se conserva literal para que
// quien consulte compare contra lo que de verdad dice la lección.
function consulta(a) {
  const t = a.temas[0]
  return [
    `Topic: ${t.titulo} (prehospital / EMS scope).`,
    'Question: what does the current guideline recommend, which body issued it, in what year or edition,'
    + ' and what primary sources support it?',
    `Statement to check (Spanish, from our course): "${a.literal}"`,
    'Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded'
    + ' or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).',
  ].join('\n')
}

// ---------- 3. salida ----------

const porAmbito = {}
for (const a of hechos) porAmbito[a.ambito] = (porAmbito[a.ambito] || 0) + 1
const porRiesgo = {}
for (const a of cola) porRiesgo[a.riesgo] = (porRiesgo[a.riesgo] || 0) + 1

console.log('— Cola de contraste contra evidencia externa —\n')
console.log(`  Enunciados comprobables extraídos   : ${afirmaciones.size}`)
console.log(`  Hechos distintos tras agrupar       : ${hechos.length}`)
console.log('  Por ámbito:')
const NOTA = {
  evidencia: '  <- contrastables con literatura clínica',
  normativo: '  <- derecho mexicano: no lo resuelve un buscador clínico',
  local: '  <- depende del protocolo del servicio: lo decide la academia',
  curricular: '  <- alcance del plan oficial: lo decide la academia',
}
for (const [k, v] of Object.entries(porAmbito).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${String(v).padStart(4)}  ${k}${NOTA[k] || ''}`)
}
console.log(`\n  Ya con veredicto en ${LIBRO} : ${yaVisto.size}`)
console.log(`  PENDIENTES de contrastar             : ${cola.length}`)
for (const r of ['alto', 'medio', 'bajo']) {
  if (porRiesgo[r]) console.log(`    ${String(porRiesgo[r]).padStart(4)}  riesgo ${r}`)
}

const citandoBuscador = fuentesDeBuscador(temas)
console.log(`\n  Referencias que citan un buscador de IA: ${citandoBuscador.length}`
  + (citandoBuscador.length ? '  ← HALLAZGO: el buscador no es la fuente' : '  (correcto)'))
for (const m of citandoBuscador) console.log(`    · ${m.temaId} — ${m.nombre} ${m.url}`)

console.log(`\n  Lote piloto sugerido: las ${Math.min(TOP, cola.length)} de mayor riesgo.`)

if (LISTA) {
  console.log('\n— Cola completa —')
  for (const a of cola) {
    console.log(`\n[${a.riesgo}] ${a.id} · ${a.temas.map((t) => t.id).join(', ')}`)
    console.log(`   ${a.literal}`)
  }
}

if (MD) {
  const L = []
  L.push('# Contraste del temario contra evidencia externa')
  L.push('')
  L.push('> Generado por `scripts/contraste-evidencia.mjs` — no editar a mano.')
  L.push('> Regenerar: `npm run contraste -- --md`')
  L.push('')
  L.push('Una fuente dice de dónde salió una frase; no dice que la frase siga siendo')
  L.push('cierta hoy. Esta cola separa las afirmaciones del temario que **se pueden**')
  L.push('comprobar contra literatura clínica de las que no, y las ordena por el daño')
  L.push('que haría equivocarse.')
  L.push('')
  L.push('**El buscador no es la fuente.** OpenEvidence y equivalentes sintetizan')
  L.push('literatura: sirven para localizar la guía o el artículo primario. Lo que se')
  L.push('cita en la lección es ese documento, abierto y leído.')
  L.push('`tests/contrasteEvidencia.test.mjs` impide que su dominio aparezca en un')
  L.push('bloque `fuentes`.')
  L.push('')
  L.push('**Un veredicto no valida un tema.** `validado` y `publicado` siguen exigiendo')
  L.push('firma docente. Lo que un veredicto produce es un hallazgo concreto, que es')
  L.push('exactamente lo que CLAUDE.md pide para poder tocar una lección ya terminada.')
  L.push('')
  L.push('## Reparto')
  L.push('')
  L.push('| Ámbito | Afirmaciones | Quién lo resuelve |')
  L.push('|---|---:|---|')
  L.push(`| evidencia | ${porAmbito.evidencia || 0} | literatura y guías clínicas — esta cola |`)
  L.push(`| curricular | ${porAmbito.curricular || 0} | alcance del plan oficial: decisión de la academia |`)
  L.push(`| normativo | ${porAmbito.normativo || 0} | DOF y Secretaría de Salud: texto vigente, no literatura |`)
  L.push(`| local | ${porAmbito.local || 0} | protocolo y formulario del servicio: decisión de la academia |`)
  L.push('')
  L.push(`Con veredicto registrado: **${yaVisto.size}**. Pendientes: **${cola.length}**`
    + ` (${porRiesgo.alto || 0} de riesgo alto, ${porRiesgo.medio || 0} medio, ${porRiesgo.bajo || 0} bajo).`)
  L.push('')
  L.push('## Cómo se anota un resultado')
  L.push('')
  L.push('En `docs/CONTRASTE-EVIDENCIA.json`, una entrada por afirmación consultada:')
  L.push('')
  L.push('```json')
  L.push(JSON.stringify({
    id: 'af-0000000000',
    temaId: 'm5-que-parkland',
    literal: 'la frase tal como está en la lección',
    consultadoEl: '2026-09-17',
    consultadoPor: 'nombre o rol',
    veredicto: 'matiza',
    resumen: 'qué dijo la evidencia, en una o dos frases',
    fuentesPrimarias: [
      { cita: 'Institución. Documento, edición/año, sección o tabla.', url: 'https://…', doi: '10.xxxx/xxxxx' },
    ],
    accion: 'precisar',
    nota: 'qué habría que cambiar en la lección',
  }, null, 2))
  L.push('```')
  L.push('')
  L.push(`## Lote piloto — las ${Math.min(TOP, cola.length)} de mayor riesgo`)
  L.push('')
  L.push('Cada bloque se pega tal cual en el buscador.')
  L.push('')
  for (const [i, a] of cola.slice(0, TOP).entries()) {
    L.push(`### ${i + 1}. \`${a.id}\` · riesgo ${a.riesgo}`)
    L.push('')
    L.push(`**Dónde:** ${a.temas.map((t) => `\`${t.id}\` (M${t.modulo})`).join(', ')}`)
    L.push('')
    L.push(`**Dice el curso:** ${a.literal}`)
    L.push('')
    if (a.variantes.length) {
      L.push(`**La misma cifra aparece además en ${a.variantes.length} sitio(s) de la lección:**`)
      for (const v of a.variantes) L.push(`- ${v}`)
      L.push('')
    }
    if (a.citaActual) {
      L.push(`**Cita actual de la lección:** ${a.citaActual}`)
      L.push('')
    }
    L.push('```text')
    L.push(consulta(a))
    L.push('```')
    L.push('')
  }
  writeFileSync('docs/CONTRASTE-EVIDENCIA.md', L.join('\n') + '\n')
  console.log('\n  Escrito docs/CONTRASTE-EVIDENCIA.md')
}
