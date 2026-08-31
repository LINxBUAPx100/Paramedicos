// ============================================================
//  La FUGA DEL BUNDLE — medida, fijada y con fecha de caducidad
// ------------------------------------------------------------
//  Hoy el temario completo viaja compilado dentro de la aplicación. Como el
//  sitio se sirve estático, cualquiera puede descargar el archivo y quedarse
//  con las 287 lecciones y el banco de exámenes entero, sin cuenta, sin
//  academia y sin grupo. `RutaProtegida` no lo impide: es una comprobación de
//  cliente sobre un archivo que ya está en el navegador de quien lo pidió.
//
//  ESTA PRUEBA NO ARREGLA LA FUGA. La mide y la deja escrita, que es lo que
//  faltaba: hasta ahora el problema se discutía sin número.
//
//  Está en VERDE a propósito. Afirma lo que hoy es cierto, no lo que debería
//  ser: una prueba en rojo en `main` corta el despliegue, y los profesores
//  están validando material en producción ahora mismo.
//
//  CUANDO SE HAGA EL TRABAJO P2 (apagar el bundle), esta prueba va a fallar.
//  Ese fallo es la señal de que P2 funcionó. Entonces se invierten las dos
//  aserciones: `assert.equal(alcanzable, false)` y `assert.equal(respuestas, 0)`.
//  No se borra el archivo: pasa a ser el guardián que impide que la fuga
//  vuelva a abrirse.
//
//  Ver `docs/PLAN-TECNICO-FASES.md`, bloque P.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ENTRADA = path.join(RAIZ, 'src', 'main.jsx')

// El material de las lecciones. Es lo que no puede acabar en el navegador de
// quien no ha entrado: prosa, preguntas con su respuesta correcta y tarjetas.
const MATERIAL = path.join(RAIZ, 'src', 'data', 'planRescate.js')

const IMPORTA = /(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g

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
    try { fuente = readFileSync(archivo, 'utf8') } catch { continue }
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

test('HOY el temario completo viaja en la aplicación — ésta es la fuga que cierra P2', () => {
  const grafo = grafoDesde(ENTRADA)
  const alcanzable = grafo.has(MATERIAL)

  assert.equal(alcanzable, true,
    'Si esto falla, el material dejó de viajar en el bundle: es lo que persigue '
    + 'P2. Invierte las aserciones de este archivo (ver la cabecera) en vez de '
    + 'volver a enlazar el temario.')
})

test('la fuga tiene tamaño, y queda escrito cuál es', () => {
  const fuente = readFileSync(MATERIAL, 'utf8')
  const cuenta = (re) => (fuente.match(re) || []).length

  const respuestas = cuenta(/"correcta":/g)
  const explicaciones = cuenta(/"explicacion":/g)
  const tarjetas = cuenta(/"frente":/g)

  // Cifras medidas el 30 de agosto de 2026. No se afirman como constantes: se
  // comprueba que sean SUSTANCIALES, porque el temario sigue creciendo y una
  // igualdad exacta rompería la suite en cada lote redactado.
  assert.ok(respuestas > 1000,
    `respuestas de examen expuestas: ${respuestas} (se esperaban más de 1000)`)
  assert.ok(explicaciones > 1000, `explicaciones expuestas: ${explicaciones}`)
  assert.ok(tarjetas > 1000, `tarjetas expuestas: ${tarjetas}`)

  // Deja el número a la vista de quien corra la suite: es el argumento entero.
  console.log(`    · fuga actual: ${respuestas} respuestas correctas, `
    + `${explicaciones} explicaciones y ${tarjetas} tarjetas descargables sin cuenta`)
})
