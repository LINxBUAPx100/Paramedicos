// ============================================================
//  Auditoría estática de TODO src/ — referencias que solo fallan al ejecutar
// ------------------------------------------------------------
//  Por qué existe: la sección Incidencias del panel de plataforma se rompía con
//  «Algo salió mal» porque `AdminPage.jsx` usaba `useEffect` sin importarlo.
//  Ni las 541 pruebas ni el build lo veían: Vite empaqueta sin quejarse y el
//  ReferenceError solo aparece cuando alguien abre esa pantalla. Es decir, la
//  única red que teníamos para esa clase de fallo era que el usuario entrara.
//
//  Estas pruebas recorren el árbol entero y comprueban lo que un compilador
//  haría por nosotros si el proyecto tuviera tipos:
//
//    1. hooks de React usados sin importar (el fallo real);
//    2. imports relativos que apuntan a un archivo que no existe;
//    3. imports con nombre que el módulo destino no exporta;
//    4. componentes JSX usados sin importar ni definir.
//
//  Todo con lectura de texto: sin dependencias nuevas y sin ejecutar la app.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const RAIZ = new URL('../src/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

function archivos(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) archivos(f, acc)
    else if (/\.(jsx?|mjs)$/.test(e.name)) acc.push(f)
  }
  return acc
}

const FUENTES = archivos(RAIZ).map((f) => ({ ruta: f, rel: path.relative(RAIZ, f).replace(/\\/g, '/'), texto: fs.readFileSync(f, 'utf8') }))

// Un import comentado no es un import.
function sinComentarios(texto) {
  return texto
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ')
}

// Además, un `useEffect(` citado dentro de un texto de la interfaz no es una
// llamada. Ojo: esto vacía también las rutas de los import, así que solo sirve
// para detectar USOS, nunca para leer imports.
function sinRuido(texto) {
  return sinComentarios(texto)
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
}

// Nombres que trae cada import: default, con nombre y namespace.
function importaciones(texto) {
  const nombres = new Set()
  const rutas = []
  const re = /import\s+(?:([\w$]+)\s*,\s*)?(?:\{([^}]*)\}|\*\s+as\s+([\w$]+)|([\w$]+))?\s*(?:from\s*)?['"]([^'"]+)['"]/g
  for (const m of texto.matchAll(re)) {
    const [, porDefectoAntes, conNombre, comoNamespace, porDefectoSolo, ruta] = m
    const pedidos = []
    if (porDefectoAntes) nombres.add(porDefectoAntes)
    if (porDefectoSolo) nombres.add(porDefectoSolo)
    if (comoNamespace) nombres.add(comoNamespace)
    for (const parte of (conNombre || '').split(',')) {
      const t = parte.trim()
      if (!t) continue
      const [origen, alias] = t.split(/\s+as\s+/).map((x) => x.trim())
      nombres.add(alias || origen)
      pedidos.push(origen)
    }
    rutas.push({ ruta, pedidos })
  }
  return { nombres, rutas }
}

// Lo que un módulo exporta, leído del texto (sin ejecutarlo).
function exportaciones(texto) {
  const set = new Set()
  let reexporta = false
  for (const m of texto.matchAll(/export\s+(?:async\s+)?(?:function|const|let|var|class)\s+([\w$]+)/g)) set.add(m[1])
  for (const m of texto.matchAll(/export\s*\{([^}]*)\}(?:\s*from\s*['"][^'"]+['"])?/g)) {
    for (const parte of m[1].split(',')) {
      const t = parte.trim()
      if (!t) continue
      const trozos = t.split(/\s+as\s+/).map((x) => x.trim())
      set.add(trozos[trozos.length - 1])
    }
  }
  if (/export\s+default/.test(texto)) set.add('default')
  if (/export\s+\*\s+from/.test(texto)) reexporta = true
  return { set, reexporta }
}

function resolver(desde, ruta) {
  if (!ruta.startsWith('.')) return null // paquete de node_modules: fuera de alcance
  const base = path.resolve(path.dirname(desde), ruta)
  const candidatos = [base, `${base}.js`, `${base}.jsx`, `${base}.mjs`, path.join(base, 'index.js'), path.join(base, 'index.jsx')]
  return candidatos.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) || null
}

const HOOKS = [
  'useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useContext',
  'useReducer', 'useLayoutEffect', 'useId', 'useSyncExternalStore',
  'useTransition', 'useDeferredValue',
]

test('nada usa un hook de React sin importarlo (el fallo de Incidencias)', () => {
  const fallos = []
  for (const f of FUENTES) {
    const texto = sinRuido(f.texto)
    const { nombres } = importaciones(sinComentarios(f.texto))
    for (const h of HOOKS) {
      if (nombres.has(h) || texto.includes(`React.${h}`)) continue
      // Definido en el propio archivo (un hook casero) tampoco es un fallo.
      if (new RegExp(`(function|const|let)\\s+${h}\\b`).test(texto)) continue
      if (new RegExp(`(^|[^\\w$.])${h}\\s*\\(`, 'm').test(texto)) fallos.push(`${f.rel} → ${h}`)
    }
  }
  assert.deepEqual(fallos, [], `Hooks usados sin importar:\n  ${fallos.join('\n  ')}`)
})

test('todos los imports relativos apuntan a un archivo que existe', () => {
  const fallos = []
  for (const f of FUENTES) {
    for (const { ruta } of importaciones(sinComentarios(f.texto)).rutas) {
      if (!ruta.startsWith('.')) continue
      if (/\.(css|svg|png|jpe?g|webp|avif|json|woff2?)$/.test(ruta)) continue
      if (!resolver(f.ruta, ruta)) fallos.push(`${f.rel} → ${ruta}`)
    }
  }
  assert.deepEqual(fallos, [], `Imports rotos:\n  ${fallos.join('\n  ')}`)
})

test('todo import con nombre existe en el módulo del que se pide', () => {
  const cache = new Map()
  const exportsDe = (ruta) => {
    if (!cache.has(ruta)) cache.set(ruta, exportaciones(fs.readFileSync(ruta, 'utf8')))
    return cache.get(ruta)
  }
  const fallos = []
  for (const f of FUENTES) {
    for (const { ruta, pedidos } of importaciones(sinComentarios(f.texto)).rutas) {
      if (!pedidos.length || !ruta.startsWith('.')) continue
      const destino = resolver(f.ruta, ruta)
      if (!destino) continue // ya lo reporta la prueba anterior
      const { set, reexporta } = exportsDe(destino)
      if (reexporta) continue // `export * from` no se puede seguir leyendo texto
      for (const nombre of pedidos) {
        if (!set.has(nombre)) fallos.push(`${f.rel} pide "${nombre}" a ${ruta}`)
      }
    }
  }
  assert.deepEqual(fallos, [], `Imports con nombre inexistente:\n  ${fallos.join('\n  ')}`)
})

test('ningún componente JSX se usa sin importar ni definir', () => {
  // Etiquetas propias de React que no son componentes del proyecto.
  const PROPIAS = new Set(['Fragment', 'Suspense', 'StrictMode', 'Profiler'])
  const fallos = []
  for (const f of FUENTES) {
    if (!f.rel.endsWith('.jsx')) continue
    const texto = sinRuido(f.texto)
    const { nombres } = importaciones(sinComentarios(f.texto))
    const definidos = new Set([
      ...[...texto.matchAll(/(?:function|const|let|class)\s+([A-Z][\w$]*)/g)].map((m) => m[1]),
      // Ligado por desestructuración con otro nombre: `{ as: Tag = 'div' }`,
      // que es como Reveal recibe la etiqueta que va a pintar.
      ...[...texto.matchAll(/:\s*([A-Z][\w$]*)\s*(?:=|[,}])/g)].map((m) => m[1]),
      // Cualquier otro nombre al que se le asigna algo también está ligado.
      ...[...texto.matchAll(/\b([A-Z][\w$]*)\s*=[^=]/g)].map((m) => m[1]),
    ])
    // `<React.StrictMode>` cuenta como uso de `React`: la raíz es lo que hay
    // que tener importado.
    for (const m of texto.matchAll(/<([A-Z][\w$.]*)/g)) {
      const comp = m[1].split('.')[0]
      if (nombres.has(comp) || definidos.has(comp) || PROPIAS.has(comp)) continue
      fallos.push(`${f.rel} → <${comp}>`)
    }
  }
  assert.deepEqual([...new Set(fallos)], [], `Componentes JSX sin importar:\n  ${[...new Set(fallos)].join('\n  ')}`)
})
