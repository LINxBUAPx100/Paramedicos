// ============================================================
//  La casa limpia — y este archivo la mantiene limpia
// ------------------------------------------------------------
//  El 5 de septiembre de 2026 se hizo una pasada de orden sobre el repositorio.
//  Dos cosas se habían acumulado durante meses de desarrollo, y ninguna daba la
//  cara: nada fallaba, nada se veía, y por eso nadie las quitaba.
//
//   1. **El temario legado vivía dentro de `src/`.** 1,8 MB de material en
//      cuarentena (`fase*.js`, `extraFase*.js`, `registro.js`,
//      `temarioOficial.js`, `reutilizado.js`) mezclados con el código vivo, en
//      las dos carpetas donde más se trabaja. Quien llegaba nuevo no podía
//      distinguir a simple vista qué archivo de `src/data/` era el temario real
//      y cuál el que se retiró por mezclar tres lecciones en una. Se archivó en
//      `legado/`, que está fuera de `src/` y tiene su propio README.
//
//   2. **Quedaban archivos que ya no importaba nadie.** Un componente huérfano,
//      dos scripts sin entrada en `package.json` y ayudantes del temario
//      anterior. Cuestan poco espacio y mucha lectura: aparecen en cada
//      búsqueda de texto y se leen como si estuvieran en uso.
//
//  ESTAS PRUEBAS NO MIDEN LA LIMPIEZA: LA MANTIENEN. Volver a dejar el legado
//  en `src/`, o añadir un archivo que nadie importa, hace fallar la suite.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const RAIZ = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const EXT = ['.js', '.jsx', '.mjs']

function archivos(dir, salida = []) {
  if (!fs.existsSync(dir)) return salida
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) archivos(p, salida)
    else if (EXT.includes(path.extname(e.name))) salida.push(p)
  }
  return salida
}

const rel = (p) => path.relative(RAIZ, p).split(path.sep).join('/')

// ------------------------------------------------------------
//  1. El temario legado se queda fuera de `src/`
// ------------------------------------------------------------

const NOMBRES_LEGADO = [
  /^fase\d+\.js$/,
  /^extraFase\d+\.js$/,
  // Ojo: `src/lib/registro.js` es OTRA cosa —el registro de errores de sesión—
  // y por eso esta comprobación mira solo dentro de `src/data/`.
  /^registro\.js$/,
  /^temarioOficial\.js$/,
  /^reutilizado\.js$/,
]

test('el temario legado no vuelve a vivir dentro de src/', () => {
  const intrusos = archivos(path.join(RAIZ, 'src', 'data'))
    .filter((p) => NOMBRES_LEGADO.some((re) => re.test(path.basename(p))))
    .map(rel)
  assert.deepEqual(
    intrusos,
    [],
    'El temario legado está archivado en `legado/` (ver legado/README.md). '
      + 'Si un archivo suyo reaparece en src/data/, es que alguien lo restauró: '
      + 'no se publica, no se reparte por similitud de palabras y no se mezcla '
      + 'con el temario oficial.'
  )
})

test('solo un archivo de src/ mira hacia legado/, y no es de la aplicación', () => {
  // El punto de unión del material, que solo consumen los scripts y las pruebas.
  const PUERTA = 'src/data/contenido/index.js'
  // Se mira línea a línea y se saltan los comentarios: `src/data/index.js`
  // explica en uno de ellos cómo se revertiría la fase (volviendo a importar
  // `legado/registro.js`), y esa frase no es un import.
  const importaLegado = (texto) =>
    texto
      .split('\n')
      .some((linea) => {
        const l = linea.trim()
        if (l.startsWith('//') || l.startsWith('*')) return false
        return /from\s+['"][^'"]*legado\//.test(l)
      })

  const miran = archivos(path.join(RAIZ, 'src'))
    .filter((p) => importaLegado(fs.readFileSync(p, 'utf8')))
    .map(rel)
  assert.deepEqual(
    miran,
    [PUERTA],
    'El legado entra por una sola puerta —`BORRADORES_LEGADO` en '
      + `${PUERTA}, que la aplicación no importa— y sirve de borrador para `
      + 'quien reescribe un tema. Cualquier otro import lo devuelve al alumno.'
  )
})

// ------------------------------------------------------------
//  2. Nada en `src/` que no importe nadie
// ------------------------------------------------------------

// Archivos vivos que ningún `import` alcanza, y por qué se quedan.
const HUERFANOS_PERMITIDOS = new Map([
  [
    'src/data/contenido/iconosTemas.js',
    'Constancia de la migración de iconos: guarda qué emoji tenía cada tema '
      + 'para poder revertirla y para auditar los que estaban mal asignados.',
  ],
])

const RE_IMPORT = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g

function importadosDesde(ficheros) {
  const vistos = new Set()
  for (const f of ficheros) {
    const src = fs.readFileSync(f, 'utf8')
    for (const m of src.matchAll(RE_IMPORT)) {
      const spec = m[1]
      if (!spec.startsWith('.')) continue
      let destino = path.resolve(path.dirname(f), spec)
      if (fs.existsSync(destino) && fs.statSync(destino).isDirectory()) {
        destino = path.join(destino, 'index.js')
      }
      vistos.add(destino)
      for (const ext of EXT) vistos.add(destino + ext)
    }
  }
  return vistos
}

test('no queda código muerto en src/', () => {
  const enSrc = archivos(path.join(RAIZ, 'src'))
  const fuera = [...archivos(path.join(RAIZ, 'tests')), ...archivos(path.join(RAIZ, 'scripts'))]
  const importados = importadosDesde([...enSrc, ...fuera])

  // Una prueba puede LEER un módulo como texto en vez de importarlo —es lo que
  // hacen las que comprueban el ORDEN de unas escrituras—. Eso también es uso.
  const textoDeFuera = fuera.map((f) => fs.readFileSync(f, 'utf8')).join('\n')

  const ENTRADAS = new Set(['src/main.jsx', 'src/App.jsx'])

  const muertos = enSrc
    .map(rel)
    .filter((r) => !ENTRADAS.has(r))
    .filter((r) => !importados.has(path.join(RAIZ, r)))
    .filter((r) => !textoDeFuera.includes(r))
    .filter((r) => !HUERFANOS_PERMITIDOS.has(r))

  assert.deepEqual(
    muertos,
    [],
    'Estos archivos de src/ no los importa nadie. O se enchufan donde tocaba, '
      + 'o se borran (el historial de git los conserva), o —si son una '
      + 'constancia deliberada— se añaden a HUERFANOS_PERMITIDOS con el motivo.'
  )
})
