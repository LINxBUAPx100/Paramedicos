// ============================================================
//  Lo que descarga quien solo abre la portada
// ------------------------------------------------------------
//  Medido sobre `dist/` el 2 de septiembre de 2026, el trozo de ENTRADA de la
//  aplicación pesaba 731 kB y 499 de sus 1 401 kB de fuente —un 36 %— eran
//  `src/data/activosMedicos.js`: la procedencia, la licencia, el hash y el
//  texto de atribución de las 228 figuras del Atlas. Todo eso hace falta para
//  la página /creditos y para el panel «Créditos» de cada imagen. Nada de eso
//  hace falta para PINTAR una imagen, y desde luego no para abrir la portada
//  pública, que no tiene ninguna.
//
//  El arreglo fue partir el catálogo: `src/data/activosLigeros.js` con lo que
//  se necesita para pintar, y el completo detrás de `lib/creditosActivos.js`,
//  que se carga cuando alguien pregunta. La entrada bajó a 461 kB (138 kB
//  comprimidos, desde 176).
//
//  ESTAS PRUEBAS NO MIDEN EL BUNDLE: IMPIDEN QUE VUELVA A ENGORDAR ASÍ. Un
//  `import` de más en cualquier módulo de la ruta de pintado devuelve los
//  269 kB a la entrada sin que nada falle ni se vea, que es exactamente cómo
//  llegaron ahí la primera vez.
//
//  El recorrido es de imports ESTÁTICOS y esa es la diferencia con
//  `fugaDelBundle.test.mjs`, que sigue también los diferidos: allí se mide qué
//  se puede DESCARGAR (y un chunk diferido se descarga igual), aquí qué se
//  descarga SIN PEDIRLO.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENTRADA = path.join(RAIZ, 'src', 'main.jsx')
const CATALOGO = path.join(RAIZ, 'src', 'data', 'activosMedicos.js')
const LIGERO = path.join(RAIZ, 'src', 'data', 'activosLigeros.js')

// Solo `from '…'` y `import '…'`: el paréntesis de `import(` queda fuera a
// propósito, porque un import diferido NO entra en el trozo de entrada.
const ESTATICO = /(?:^|\n)\s*(?:import\s[^\n;]*?from\s*|import\s+)['"]([^'"]+)['"]/g

function sinComentarios(fuente) {
  return fuente
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

function resolver(desde, especificador) {
  if (!especificador.startsWith('.')) return null // paquete de node_modules
  const base = path.resolve(path.dirname(desde), especificador)
  for (const cand of [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')]) {
    if (existsSync(cand) && statSync(cand).isFile()) return cand
  }
  return null
}

// Todo lo que se evalúa por el hecho de abrir la aplicación.
function grafoEstatico(entrada) {
  const vistos = new Set()
  const cola = [entrada]
  while (cola.length) {
    const archivo = cola.pop()
    if (!archivo || vistos.has(archivo)) continue
    vistos.add(archivo)
    let fuente
    try { fuente = sinComentarios(readFileSync(archivo, 'utf8')) } catch { continue }
    for (const m of fuente.matchAll(ESTATICO)) {
      const destino = resolver(archivo, m[1])
      if (destino && !vistos.has(destino)) cola.push(destino)
    }
  }
  return vistos
}

test('el recorrido estático arranca y alcanza los módulos de la aplicación', () => {
  // Cordura: sin esto, un recorrido roto haría pasar en verde todo lo de abajo
  // por no encontrar nada.
  const grafo = grafoEstatico(ENTRADA)
  assert.ok(grafo.size > 40, `el recorrido solo alcanzó ${grafo.size} archivos`)
  assert.ok(grafo.has(path.join(RAIZ, 'src', 'App.jsx')))
  assert.ok(grafo.has(path.join(RAIZ, 'src', 'components', 'Imagen.jsx')))
})

test('el catálogo COMPLETO de activos no entra al abrir la aplicación', () => {
  const grafo = grafoEstatico(ENTRADA)
  assert.equal(grafo.has(CATALOGO), false,
    'Algún módulo de la ruta de pintado volvió a importar `src/data/activosMedicos.js` '
    + 'de forma estática. Son 500 kB de procedencia, licencias y hashes que se '
    + 'descargarían al abrir la portada. Para pintar usa `lib/activosMedicos.js` '
    + '(catálogo ligero); para la autoría, `lib/creditosActivos.js`, con import '
    + 'diferido si lo necesitas desde un componente que sí esté en la entrada.')
})

test('la ruta de pintado usa el catálogo ligero', () => {
  const grafo = grafoEstatico(ENTRADA)
  assert.ok(grafo.has(LIGERO),
    'la aplicación ya no alcanza `src/data/activosLigeros.js`: si el ligero dejó '
    + 'de usarse, las figuras se están resolviendo desde otro sitio')
})

test('el ligero es ligero: sin procedencia, sin licencias completas y sin hashes', () => {
  const fuente = readFileSync(LIGERO, 'utf8')
  // Los campos que justifican el corte. Si vuelven, el ligero deja de serlo y
  // la partición no sirve de nada aunque el archivo siga llamándose ligero.
  for (const campo of ['originalCreator', 'sha256', 'rawFileUrl', 'displayText', 'upstreamCommit', 'catalogProvider']) {
    assert.doesNotMatch(fuente, new RegExp(`"${campo}"`),
      `el catálogo ligero volvió a llevar "${campo}": eso es procedencia, y va en el completo`)
  }
  assert.ok(fuente.length < 260 * 1024,
    `el catálogo ligero pesa ${Math.round(fuente.length / 1024)} kB; el 02-09-2026 eran 160 kB`)
})

test('los datos que se descargan sin pedirlos siguen dentro de su presupuesto', () => {
  // El presupuesto no es un número bonito: es la diferencia entre una portada
  // que abre en un móvil con datos y una que no. Se mide sobre `src/data`
  // porque es donde vive lo que crece solo —catálogos generados— y donde ya
  // pasó dos veces: primero el temario (P2), después los activos.
  const grafo = grafoEstatico(ENTRADA)
  const datos = [...grafo]
    .filter((f) => f.includes(path.join('src', 'data')))
    .map((f) => [path.relative(RAIZ, f), statSync(f).size])
    .sort((a, b) => b[1] - a[1])
  const total = datos.reduce((a, [, n]) => a + n, 0)
  const detalle = datos.map(([f, n]) => `${f} ${Math.round(n / 1024)} kB`).join(', ')
  assert.ok(total < 300 * 1024,
    `src/data alcanzable al arrancar: ${Math.round(total / 1024)} kB (${detalle}). `
    + 'El 02-09-2026 eran 200 kB. Si un catálogo nuevo tiene que crecer, pártelo '
    + 'como se partió el de activos en vez de subir este número.')
})
