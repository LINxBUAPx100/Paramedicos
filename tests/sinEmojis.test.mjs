// ============================================================
//  La web no muestra emojis
// ------------------------------------------------------------
//  Por qué esto es una prueba y no una preferencia estética:
//
//   · un emoji lo dibuja la FUENTE DEL SISTEMA. El mismo tema se veía distinto
//     en Windows, en Android y en iOS, y algunos —🫀, 🫁, 🫘, 🩻— son
//     recientes: en un equipo con fuentes antiguas salían como un rectángulo
//     vacío. Es material de estudio: no puede depender de eso;
//   · no responde al tema claro/oscuro ni al color del módulo;
//   · un lector de pantalla lo anuncia («cara con mascarilla médica») en medio
//     del título del tema, que no es lo que el alumno necesita oír;
//   · y en el temario había casos en los que además era INCORRECTO: 🫀
//     (corazón) encabezando tres temas de hígado, 🦵 (pierna) uno de cadera,
//     🩸 (sangre) repetido en hemorragia y en hematopoyesis sin distinguirlas.
//
//  Alcance de la prueba: el contenido y los datos GENERADOS que la aplicación
//  sirve, y los componentes de la interfaz. Los archivos del temario LEGADO
//  (`fase*.js`, `extraFase*.js`, `registro.js`, `temarioOficial.js`,
//  `reutilizado.js`) quedan fuera a propósito: están en cuarentena, no se
//  importan desde la app y CLAUDE.md §4 prohíbe borrarlos.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { modulos, todosLosTemas } from '../src/data/index.js'
import { esIdentificadorDeActivo } from '../src/lib/activosMedicos.js'

const RAIZ = new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

// Un pictograma es cualquier cosa con `Extended_Pictographic`, más los
// selectores de variación y el carácter de unión de emoji que forman las
// secuencias compuestas (👨‍👩‍👧, 🧑‍🚒). Se usa la propiedad Unicode en vez de
// una lista de rangos escrita a mano: la lista se queda vieja, la propiedad no.
//
// Se excluyen © ® ™: Unicode los marca como Extended_Pictographic por razones
// históricas, pero son símbolos tipográficos de siempre —aparecen en el pie del
// sitio y en citas bibliográficas— y ninguna fuente falla al dibujarlos.
const RE_PICTOGRAMA = /(?![©®™])[\p{Extended_Pictographic}️⃣‍]/u

// Dingbats usados como icono: ✓ ✗ ✕ y compañía. Se prohíben en el marcado de
// los componentes por la misma razón que los emojis: los dibuja la fuente y no
// son accesibles. En comentarios sí valen.
const RE_DINGBAT = /[✀-➿]/

// Flechas usadas COMO ICONO al principio o al final de una etiqueta («← Volver»,
// «Siguiente →»). Una flecha en medio de una frase es puntuación legítima
// —«¿Cambiar el código AAA → BBB?», «curso → módulo → unidad»— y no se toca:
// lo que se persigue es la flecha que hace de icono en un botón.
// Los delimitadores (comillas, `>`, `<`) quedan excluidos a los dos lados: una
// flecha SOLA en su propia cadena —`{' → '}`, que separa dos valores en el
// registro de cambios— es puntuación, no un icono.
const DELIM = '\'"`<>'
const RE_FLECHA_ICONO = new RegExp(
  `(?:^|[>'"\`])\\s*[←→↔⇐⇒]\\s+[^\\s${DELIM}]`
  + `|[^\\s${DELIM}]\\s+[←→↔⇐⇒]\\s*(?:[<'"\`]|$)`,
  'm'
)

// Archivos legados en cuarentena: no se importan desde la aplicación.
const LEGADO = [
  /^src\/data\/fase\d+\.js$/,
  /^src\/data\/extraFase\d+\.js$/,
  /^src\/data\/registro\.js$/,
  /^src\/data\/temarioOficial\.js$/,
  /^src\/data\/contenido\/reutilizado\.js$/,
  // Registro de la propia migración: su razón de ser es CONSERVAR los emojis
  // retirados, para poder revertir y para auditar los que estaban mal.
  /^src\/data\/contenido\/iconosTemas\.js$/,
]

function esLegado(rel) {
  const r = rel.replace(/\\/g, '/')
  return LEGADO.some((re) => re.test(r))
}

function archivos(dir, ext) {
  const salida = []
  for (const e of fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) salida.push(...archivos(rel, ext))
    else if (ext.some((x) => e.name.endsWith(x))) salida.push(rel)
  }
  return salida
}

// Quita comentarios de línea y de bloque: un `→` explicando un flujo de datos
// en un comentario no lo ve ningún alumno.
function sinComentarios(txt) {
  return txt
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
}

test('el temario que la app sirve no lleva un solo pictograma', () => {
  // Se mira el árbol ENSAMBLADO, que es exactamente lo que la interfaz recibe:
  // así la prueba no depende de en qué archivo esté escrito cada campo.
  const mal = []
  const revisar = (valor, donde) => {
    if (typeof valor === 'string') {
      if (RE_PICTOGRAMA.test(valor)) mal.push(`${donde}: ${JSON.stringify(valor.slice(0, 70))}`)
      return
    }
    if (Array.isArray(valor)) { valor.forEach((v, i) => revisar(v, `${donde}[${i}]`)); return }
    if (valor && typeof valor === 'object') {
      for (const [k, v] of Object.entries(valor)) revisar(v, `${donde}.${k}`)
    }
  }
  for (const m of modulos) revisar(m, m.id)
  assert.deepEqual(mal, [], `Pictogramas en el temario servido (${mal.length}):\n  ${mal.slice(0, 30).join('\n  ')}`)
})

test('el campo `icono` de cada tema es un identificador de activo, no un carácter', () => {
  const mal = []
  for (const t of todosLosTemas) {
    if (!t.icono) { mal.push(`${t.id}: sin icono`); continue }
    if (!esIdentificadorDeActivo(t.icono)) mal.push(`${t.id}: "${t.icono}" no es un activo del catálogo`)
  }
  assert.deepEqual(mal, [], `Iconos de tema inválidos (${mal.length}):\n  ${mal.slice(0, 30).join('\n  ')}`)
})

test('el campo `icono` de cada módulo es un identificador de activo', () => {
  const mal = modulos
    .filter((m) => !esIdentificadorDeActivo(m.icono))
    .map((m) => `${m.id}: "${m.icono}"`)
  assert.deepEqual(mal, [], `Iconos de módulo inválidos: ${mal.join(', ')}`)
})

test('los archivos de contenido no dejan ningún emoji en un campo `icono`', () => {
  // La prueba anterior mira el resultado ensamblado; esta mira el ORIGEN, para
  // que un emoji reintroducido a mano en un archivo de contenido se detecte
  // aunque el generador lo hubiera sustituido por el del catálogo.
  const mal = []
  for (const rel of archivos('src/data/contenido', ['.js'])) {
    if (esLegado(rel)) continue
    const txt = fs.readFileSync(path.join(RAIZ, rel), 'utf8')
    for (const m of txt.matchAll(/icono:\s*'([^']*)'/g)) {
      if (RE_PICTOGRAMA.test(m[1])) mal.push(`${rel}: icono: '${m[1]}'`)
      else if (m[1] && !/^[a-z0-9][a-z0-9-]{2,63}$/.test(m[1])) mal.push(`${rel}: icono con forma inválida '${m[1]}'`)
    }
  }
  assert.deepEqual(mal, [], `Emojis en campos icono (${mal.length}):\n  ${mal.slice(0, 20).join('\n  ')}`)
})

test('los datos generados no llevan pictogramas', () => {
  // planRescate.js y navIndice.js los escribe un script y los sirve la app.
  // Un emoji en la cabecera del archivo generado volvería solo en cada
  // generación, así que se comprueba el archivo completo.
  const mal = []
  for (const rel of ['src/data/planRescate.js', 'src/data/navIndice.js', 'src/data/activosMedicos.js']) {
    const txt = fs.readFileSync(path.join(RAIZ, rel), 'utf8')
    const hallazgos = txt.match(new RegExp(RE_PICTOGRAMA.source, 'gu'))
    if (hallazgos) mal.push(`${rel}: ${hallazgos.length} pictograma(s) — ${[...new Set(hallazgos)].slice(0, 8).join(' ')}`)
  }
  assert.deepEqual(mal, [], `Archivos generados con pictogramas:\n  ${mal.join('\n  ')}`)
})

test('ningún componente de la interfaz pinta un pictograma ni un dingbat', () => {
  const mal = []
  const fuentes = [
    ...archivos('src/components', ['.jsx']),
    ...archivos('src/pages', ['.jsx']),
  ]
  for (const rel of fuentes) {
    const codigo = sinComentarios(fs.readFileSync(path.join(RAIZ, rel), 'utf8'))
    if (RE_PICTOGRAMA.test(codigo)) {
      const h = codigo.match(new RegExp(RE_PICTOGRAMA.source, 'gu'))
      mal.push(`${rel}: pictograma ${[...new Set(h)].join(' ')}`)
    }
    if (RE_DINGBAT.test(codigo)) {
      const h = codigo.match(new RegExp(RE_DINGBAT.source, 'g'))
      mal.push(`${rel}: dingbat ${[...new Set(h)].join(' ')}`)
    }
    const flecha = codigo.match(new RegExp(RE_FLECHA_ICONO.source, 'gm'))
    if (flecha) mal.push(`${rel}: flecha como icono → ${flecha.map((s) => JSON.stringify(s.trim())).join(', ')}`)
  }
  assert.deepEqual(mal, [], `Glifos usados como icono en la interfaz:\n  ${mal.join('\n  ')}`)
})

test('los textos que la app genera para compartir tampoco llevan emoji', () => {
  // El texto de invitación se copia al portapapeles y viaja por WhatsApp o
  // correo: es contenido que la aplicación produce, aunque no se pinte aquí.
  const txt = fs.readFileSync(path.join(RAIZ, 'src/components/CompartirCodigo.jsx'), 'utf8')
  const h = sinComentarios(txt).match(new RegExp(RE_PICTOGRAMA.source, 'gu'))
  assert.equal(h, null, `El texto de invitación lleva emoji: ${h ? [...new Set(h)].join(' ') : ''}`)
})
