// ============================================================
//  LA FUGA DEL BUNDLE, CERRADA — y este archivo la mantiene cerrada
// ------------------------------------------------------------
//  Durante meses el temario completo viajó compilado dentro de la aplicación.
//  Como el sitio se sirve estático, cualquiera podía descargar un archivo y
//  quedarse con las 287 lecciones y el banco de exámenes entero: sin cuenta,
//  sin academia y sin grupo. Medido el 30-08-2026 sobre `dist/`: 1 546
//  respuestas correctas, 1 539 explicaciones y 1 428 tarjetas.
//
//  El trabajo P2 lo apagó el 31-08-2026, en tres frentes:
//
//   · El resolutor dejó de caer al bundle cuando Firestore no responde. Sin
//     contenido propio no hay contenido (ver lib/contenidoVacio.js).
//   · La muestra de la portada pública salió del temario: ahora es un módulo
//     de 3 kB con las dos secciones que de verdad enseña.
//   · El índice de navegación dejó de publicar los 287 títulos. Eran contenido
//     de la academia y estaban descargables aunque la interfaz no los pintara.
//
//  ESTE ARCHIVO YA NO MIDE LA FUGA: LA IMPIDE. Si alguien vuelve a enlazar el
//  temario desde la aplicación —por comodidad, por un fallback «temporal» o por
//  una muestra nueva en la portada— estas pruebas fallan.
//
//  Lo que SÍ queda en el archivo publicado y no es una fuga: los nombres de
//  campo «correcta», «explicacion» y «frente» aparecen en el CÓDIGO del editor
//  y del quiz, que trabajan con esos objetos.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENTRADA = path.join(RAIZ, 'src', 'main.jsx')

// El material de las lecciones: prosa, preguntas con su respuesta y tarjetas.
const MATERIAL = path.join(RAIZ, 'src', 'data', 'planRescate.js')
const NAV = path.join(RAIZ, 'src', 'data', 'navIndice.js')

const IMPORTA = /(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g

/**
 * Quita comentarios antes de buscar imports.
 *
 * Sin esto, un comentario que EXPLICA un import retirado se cuenta como el
 * import mismo. Pasó exactamente eso: el comentario de `plantillas.js` que
 * documenta por qué ya no se importa el temario hacía que esta suite siguiera
 * viendo el temario como alcanzable, con el fallback ya apagado y `dist/` ya
 * limpio. Una prueba que se cree su propio comentario no vale nada.
 */
function sinComentarios(fuente) {
  return fuente
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
}

function resolver(desde, especificador) {
  if (!especificador.startsWith('.')) return null // paquete de node_modules
  const base = path.resolve(path.dirname(desde), especificador)
  for (const cand of [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js')]) {
    if (existsSync(cand) && !cand.endsWith(path.sep)) {
      try { if (readFileSync(cand)) return cand } catch { /* directorio */ }
    }
  }
  return null
}

/**
 * Recorre el grafo de imports desde la entrada de la aplicación.
 *
 * Sigue TAMBIÉN los `import()` diferidos, y eso es deliberado: un import
 * dinámico no saca el código de la aplicación, lo mueve a otro archivo que se
 * sirve igual de abierto. Para quien quiere descargar el temario, un chunk
 * diferido y uno de entrada valen exactamente lo mismo.
 */
function grafoDesde(entrada) {
  const vistos = new Set()
  const cola = [entrada]
  while (cola.length) {
    const archivo = cola.pop()
    if (!archivo || vistos.has(archivo)) continue
    vistos.add(archivo)
    let fuente
    try { fuente = sinComentarios(readFileSync(archivo, 'utf8')) } catch { continue }
    for (const m of fuente.matchAll(IMPORTA)) {
      const destino = resolver(archivo, m[1])
      if (destino && !vistos.has(destino)) cola.push(destino)
    }
  }
  return vistos
}

test('el grafo de la aplicación arranca y alcanza sus propios módulos', () => {
  const grafo = grafoDesde(ENTRADA)
  // Cordura: si el recorrido se rompiera, las aserciones de abajo pasarían por
  // no encontrar nada y la prueba mentiría en verde.
  assert.ok(grafo.size > 50, `el recorrido solo alcanzó ${grafo.size} archivos`)
  assert.ok(grafo.has(path.join(RAIZ, 'src', 'App.jsx')))
})

test('el temario YA NO viaja en la aplicación', () => {
  const grafo = grafoDesde(ENTRADA)
  assert.equal(grafo.has(MATERIAL), false,
    'Alguien volvió a enlazar `src/data/planRescate.js` desde la aplicación. Eso '
    + 'publica el temario completo —287 lecciones y las respuestas de todos sus '
    + 'exámenes— en un archivo que cualquiera puede descargar sin cuenta. Si '
    + 'necesitas un fragmento para una portada, genéralo aparte, como hace '
    + 'scripts/gen-demo-portada.mjs.')
})

test('tampoco viajan los 287 títulos del temario', () => {
  // `navIndice.js` SÍ se importa: publica las CIFRAS que enseña la portada
  // pública (7 módulos, 287 temas…). Son números, no contenido. Lo que no puede
  // volver a publicar son los títulos.
  const fuente = readFileSync(NAV, 'utf8')
  assert.doesNotMatch(fuente, /export const modulosNav/,
    'navIndice.js volvió a publicar `modulosNav`: son los 287 títulos del '
    + 'temario, y los títulos son contenido de la academia.')
  assert.match(fuente, /export const stats/, 'las cifras sí deben seguir publicándose')
})

test('la muestra de la portada es un fragmento, no un temario', () => {
  const demo = path.join(RAIZ, 'src', 'data', 'demoPortada.js')
  assert.ok(existsSync(demo), 'falta src/data/demoPortada.js — genéralo con npm run gen:demo')
  const fuente = readFileSync(demo, 'utf8')
  assert.doesNotMatch(fuente, /"correcta"/, 'la muestra no puede llevar respuestas de examen')
  assert.doesNotMatch(fuente, /"frente"/, 'la muestra no puede llevar flashcards')
  assert.ok(fuente.length < 40000,
    `la muestra pesa ${fuente.length} bytes: debe ser un fragmento, no un temario`)
})

test('el resolutor sirve contenido VACÍO, no el de otra academia', () => {
  const resolutor = readFileSync(path.join(RAIZ, 'src', 'lib', 'firebase', 'contenido.js'), 'utf8')
  assert.match(resolutor, /contenidoVacio/,
    'el resolutor debe caer a `contenidoVacio`, nunca al temario del bundle')
  assert.doesNotMatch(sinComentarios(resolutor), /import\(['"]\.\.\/\.\.\/data\/index\.js['"]\)/,
    'el resolutor volvió a importar el temario del bundle')
})
