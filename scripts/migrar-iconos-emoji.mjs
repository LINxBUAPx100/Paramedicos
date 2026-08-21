// ============================================================
//  Migración de los iconos de tema: emoji → identificador de activo
// ------------------------------------------------------------
//  Sustituye el valor del campo `icono` de cada tema en
//  src/data/contenido/*.js por el identificador del activo médico que le
//  corresponde según el catálogo (`ICONO_POR_TEMA`).
//
//  Por qué se hace con un script y no a mano: son 269 usos repartidos en 42
//  archivos, y el criterio no es «este emoji por este dibujo» sino «este TEMA
//  por el activo que le tocó en la curación». Un reemplazo por emoji habría
//  puesto el mismo dibujo en temas que no tienen nada que ver —🩸 aparecía en
//  hemorragia, en hematopoyesis y en sangrado digestivo— y habría repetido el
//  error que ya tenía el temario: 🫀 (corazón) en tres temas de hígado.
//
//  Lo que NO hace: no toca una sola letra de prosa, ni objetivos, ni quiz, ni
//  fuentes. Solo el valor entre comillas de `icono:`.
//
//  Deja constancia en src/data/contenido/iconosTemas.js: qué emoji tenía cada
//  tema y por qué identificador se cambió. Es la tabla de reversión de esta
//  parte de la migración.
//
//  Uso:  node scripts/migrar-iconos-emoji.mjs [--dry-run]
// ============================================================
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ICONO_POR_TEMA } from '../src/data/activosMedicos.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(RAIZ, 'src', 'data', 'contenido')
const SECO = process.argv.includes('--dry-run')

// Cualquier carácter fuera del latín habitual en el valor de `icono`: es la
// forma fiable de detectar un pictograma sin escribir a mano la lista de
// bloques Unicode, y de que la prueba y el script usen el mismo criterio.
const RE_PICTOGRAFICO = /[\p{Extended_Pictographic}\p{Emoji_Presentation}️‍⃣]/u

const registro = []
const sinIcono = []
let cambiados = 0
let archivosTocados = 0

for (const archivo of readdirSync(DIR).filter((f) => f.endsWith('.js'))) {
  // `reutilizado.js` es el corpus heredado en cuarentena: no se sirve al
  // alumno y no se toca (CLAUDE.md §4).
  if (archivo === 'reutilizado.js') continue
  const ruta = path.join(DIR, archivo)
  const lineas = readFileSync(ruta, 'utf8').split(/\r?\n/)
  let temaActual = ''
  let tocado = false

  for (let i = 0; i < lineas.length; i++) {
    const clave = lineas[i].match(/^ {2}'([a-z0-9-]+)':\s*\{/)
    if (clave) { temaActual = clave[1]; continue }
    const ic = lineas[i].match(/^(\s*icono:\s*')([^']*)('.*)$/)
    if (!ic) continue

    const anterior = ic[2]
    const nuevo = ICONO_POR_TEMA[temaActual]
    if (!nuevo) {
      sinIcono.push(`${archivo}:${i + 1} · tema "${temaActual}" no tiene icono en el catálogo`)
      continue
    }
    if (anterior === nuevo) continue
    lineas[i] = `${ic[1]}${nuevo}${ic[3]}`
    registro.push({ tema: temaActual, archivo, anterior, nuevo, eraEmoji: RE_PICTOGRAFICO.test(anterior) })
    cambiados++
    tocado = true
  }

  if (tocado) {
    archivosTocados++
    if (!SECO) writeFileSync(ruta, lineas.join('\n'))
  }
}

if (sinIcono.length) {
  console.error(`✗ ${sinIcono.length} campos \`icono\` sin activo en el catálogo:`)
  for (const s of sinIcono) console.error(`   · ${s}`)
  process.exit(1)
}

const conEmoji = registro.filter((r) => r.eraEmoji)
console.log(`\n· Iconos de tema: ${cambiados} campos actualizados en ${archivosTocados} archivos`)
console.log(`  de ellos, ${conEmoji.length} contenían un emoji`)
console.log(`  emojis distintos retirados: ${new Set(conEmoji.map((r) => r.anterior)).size}`)

if (SECO) {
  console.log('\n  [--dry-run] nada escrito.\n')
  process.exit(0)
}

// --- constancia y reversión -------------------------------------------------
const porTema = {}
for (const r of registro) porTema[r.tema] = { anterior: r.anterior, nuevo: r.nuevo }

const doc = `// ARCHIVO GENERADO por scripts/migrar-iconos-emoji.mjs — constancia y reversión.
//
// Qué es: el registro de la migración de iconos de tema. Para cada tema, el
// valor que tenía el campo \`icono\` antes (un emoji) y el identificador de
// activo médico que tiene ahora.
//
// Para qué sirve:
//   · REVERTIR. Si hubiera que volver atrás, aquí está el valor anterior de
//     cada tema, tema por tema.
//   · AUDITAR. Deja ver los casos en los que el emoji era, además de frágil,
//     incorrecto: 🫀 (corazón) en tres temas de hígado, 🦵 (pierna) en uno de
//     cadera, 🩸 (sangre) repetido en hemorragia y en hematopoyesis.
//
// La regla del reemplazo NO fue «este emoji por este dibujo», sino «este TEMA
// por el activo que le asignó la curación» (scripts/activos/mapa-temas.json).
// Por eso el mismo emoji aparece sustituido por activos distintos.
//
// Nadie edita este archivo a mano y la aplicación no lo importa.

export const ICONOS_MIGRADOS = ${JSON.stringify(porTema, null, 2)}

// Emojis retirados, con cuántos temas los usaban.
export const EMOJIS_RETIRADOS = ${JSON.stringify(
  Object.fromEntries(
    [...conEmoji.reduce((m, r) => m.set(r.anterior, (m.get(r.anterior) || 0) + 1), new Map())]
      .sort((a, b) => b[1] - a[1])
  ),
  null,
  2
)}
`
writeFileSync(path.join(DIR, 'iconosTemas.js'), doc)
console.log(`  src/data/contenido/iconosTemas.js escrito (constancia y reversión)\n`)
