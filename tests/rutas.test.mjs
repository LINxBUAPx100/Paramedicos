// ============================================================
//  Auditoría de NAVEGACIÓN — enlaces que llevan a ninguna parte
// ------------------------------------------------------------
//  Un `<Link to="/panel/contenidos">` con una letra de más no rompe el build ni
//  ninguna prueba: compila, se pinta y el usuario acaba en el NotFound. Como el
//  árbol de rutas está anidado (/admin y /panel tienen hijas), es fácil escribir
//  una ruta que existió en otra versión de la consola.
//
//  Aquí se reconstruye el árbol real de <Route> de App.jsx —componiendo cada
//  hija con el prefijo de su padre— y se comprueba que todo enlace interno del
//  proyecto case con alguna ruta declarada.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const RAIZ = new URL('../src/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const APP = fs.readFileSync(path.join(RAIZ, 'App.jsx'), 'utf8')

// ---------- 1. Árbol de rutas declarado ----------
function rutasDeclaradas(texto) {
  const rutas = new Set()
  const pila = [''] // prefijos de los <Route> abiertos
  const re = /<Route\b([^>]*?)(\/?)>|<\/Route>/g
  for (const m of texto.matchAll(re)) {
    if (m[0] === '</Route>') { pila.pop(); continue }
    const atributos = m[1]
    const autocierre = m[2] === '/'
    const padre = pila[pila.length - 1]
    const conPath = /\bpath="([^"]*)"/.exec(atributos)
    const esIndex = /\bindex\b/.test(atributos)
    let completa = padre
    if (conPath) {
      const p = conPath[1]
      completa = p.startsWith('/') ? p : `${padre.replace(/\/$/, '')}/${p}`
    }
    if (conPath || esIndex) rutas.add(completa || '/')
    if (!autocierre) pila.push(completa)
  }
  return rutas
}

const DECLARADAS = [...rutasDeclaradas(APP)]

// `:param` casa con cualquier segmento; `*` con lo que quede.
const comoRegExp = (patron) => new RegExp(
  `^${patron
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[\w]+/g, '[^/]+')
    .replace(/\*/g, '.*')}$`
)
const PATRONES = DECLARADAS.map(comoRegExp)

// ---------- 2. Enlaces internos del proyecto ----------
function archivos(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name)
    if (e.isDirectory()) archivos(f, acc)
    else if (/\.jsx$/.test(e.name)) acc.push(f)
  }
  return acc
}

function enlacesDe(texto) {
  const salida = []
  // to="/ruta"  ·  to={`/ruta/${x}`}  ·  navigate('/ruta')
  for (const m of texto.matchAll(/\bto="(\/[^"]*)"/g)) salida.push(m[1])
  for (const m of texto.matchAll(/\bto=\{`(\/[^`]*)`\}/g)) salida.push(m[1])
  for (const m of texto.matchAll(/navigate\(\s*['"](\/[^'"]*)['"]/g)) salida.push(m[1])
  for (const m of texto.matchAll(/navigate\(\s*`(\/[^`]*)`/g)) salida.push(m[1])
  return salida
    // `${loQueSea}` es un segmento cualquiera; la query no forma parte de la ruta.
    .map((r) => r.replace(/\$\{[^}]*\}/g, 'x').split('?')[0].split('#')[0])
    .map((r) => (r.length > 1 ? r.replace(/\/$/, '') : r))
}

test('el árbol de rutas de App.jsx se lee entero (guardia de la propia prueba)', () => {
  // Sin esto, un cambio de formato en App.jsx dejaría la lista vacía y la
  // comprobación de abajo pasaría por no encontrar nada que revisar.
  assert.ok(DECLARADAS.length > 15, `solo se leyeron ${DECLARADAS.length} rutas`)
  assert.ok(DECLARADAS.includes('/'), 'debería estar la portada')
  assert.ok(DECLARADAS.includes('/admin/incidencias'), 'las rutas hijas deben componerse con su padre')
  assert.ok(DECLARADAS.includes('/tema/:temaId'), 'deberían estar las rutas con parámetro')
})

test('todo enlace interno apunta a una ruta declarada', () => {
  const rotos = []
  let revisados = 0
  for (const f of archivos(RAIZ)) {
    const rel = path.relative(RAIZ, f).replace(/\\/g, '/')
    for (const destino of enlacesDe(fs.readFileSync(f, 'utf8'))) {
      revisados += 1
      if (!PATRONES.some((p) => p.test(destino))) rotos.push(`${rel} → ${destino}`)
    }
  }
  // Segunda guardia: si la extracción de enlaces dejara de casar, no habría
  // nada que comprobar y esto saldría verde sin haber mirado nada.
  assert.ok(revisados > 40, `solo se extrajeron ${revisados} enlaces`)
  assert.deepEqual([...new Set(rotos)], [], `Enlaces a rutas inexistentes:\n  ${[...new Set(rotos)].join('\n  ')}`)
})
