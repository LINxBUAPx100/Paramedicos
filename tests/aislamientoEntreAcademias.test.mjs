// ============================================================
//  El defecto peligroso: una academia sin migrar recibe el temario ajeno
// ------------------------------------------------------------
//  Comprobado el 31 de agosto de 2026 sembrando DOS academias en el emulador —
//  «PRUEBA» (R.E.S.C.A.T.E.) y «CRUZVERDE»— y entrando con gente de cada una.
//  Resultado, en tres partes:
//
//   · PERSONAS Y GRUPOS: aislados. El director de Cruz Verde ve a sus tres
//     miembros y a nadie más. Lo garantizan las reglas (`esStaffDe`) y hay 133
//     pruebas de reglas que lo cubren, 9 de ellas con cruce entre academias.
//   · CONTENIDO de una academia marcada `migrado`: aislado. Cero fuga.
//   · CONTENIDO de una academia SIN MIGRAR: **recibe el temario completo de
//     R.E.S.C.A.T.E.** Un alumno de Cruz Verde veía los 287 títulos —OVACE,
//     AVDI, PROPEDÉUTICO, «Botiquín ideal»— dentro de su propia academia.
//
//  POR QUÉ, y por qué no lo paran las reglas: `academias/{id}.contenido.estado`
//  decide de dónde se lee, y su valor por omisión es `legacy`. Legacy significa
//  «sírvele el bundle», y el bundle ES el temario de R.E.S.C.A.T.E. El bundle
//  no pasa por Firestore, así que ninguna regla de seguridad puede intervenir:
//  ya está en el navegador de quien abrió la página.
//
//  Dicho en una frase: **el día que se cree la segunda academia, si nadie pone
//  `contenido.estado = 'migrado'`, esa academia ve el material de la primera.**
//
//  Esto NO se arregla aquí. Quitar el fallback hoy dejaría a R.E.S.C.A.T.E. sin
//  temario, porque hoy es precisamente una academia sin migrar que depende del
//  bundle. La salida es P1 (migrarla) y después P2 (apagar el bundle), en ese
//  orden. Esta suite existe para que el riesgo esté medido y con nombre, y para
//  avisar el día que cambie.
//
//  CUANDO SE HAGA P2 esta suite va a fallar. Ese fallo es la señal de que
//  funcionó: entonces se invierte `elFallbackSigueVivo` y pasa a ser el
//  guardián de que no vuelva.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { estadoContenido, academiaMigrada } from '../src/lib/contenidoApi.js'
import { contenidoVacio } from '../src/lib/contenidoVacio.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const leer = (...p) => readFileSync(path.join(RAIZ, ...p), 'utf8')

// Comprobar sobre el CÓDIGO, no sobre los comentarios. El comentario que
// explica por qué se retiró algo nombra ese algo, y una aserción ingenua lo
// cuenta como si siguiera ahí. Pasó dos veces el mismo día.
const SIN_BLOQUE = /\/\*[\s\S]*?\*\//g
const SIN_LINEA = /(^|[^:])\/\/[^\n]*/g
const codigo = (...p) => leer(...p).replace(SIN_BLOQUE, '').replace(SIN_LINEA, '$1')

// ---------- el defecto ----------

test('una academia recién creada NO está migrada: su defecto es leer el bundle', () => {
  assert.equal(estadoContenido({}), 'legacy')
  assert.equal(estadoContenido({ nombre: 'Nueva' }), 'legacy')
  assert.equal(estadoContenido(null), 'legacy')
  assert.equal(estadoContenido({ contenido: {} }), 'legacy')
  // Y basura tampoco la marca como migrada.
  assert.equal(estadoContenido({ contenido: { estado: 'lo-que-sea' } }), 'legacy')

  assert.equal(academiaMigrada({}), false,
    'Si esto cambiara a true por defecto, una academia sin contenido propio '
    + 'empezaría a leer Firestore vacío en vez del bundle. Es el otro extremo.')
})

test('solo `migrado` habilita leer su propio contenido', () => {
  assert.equal(academiaMigrada({ contenido: { estado: 'migrado' } }), true)
  assert.equal(academiaMigrada({ contenido: { estado: 'migrando' } }), false)
  assert.equal(academiaMigrada({ contenido: { estado: 'error' } }), false)
  assert.equal(academiaMigrada({ contenido: { estado: 'legacy' } }), false)
})

// ---------- el fallback, mientras exista ----------

test('el fallback al bundle ESTÁ APAGADO', () => {
  const ctx = codigo('src', 'context', 'ContenidoContext.jsx')

  // El índice de arranque del shell ya no lleva los títulos del temario: solo
  // cifras. Una academia sin migrar arranca vacía, no con el plan de otra.
  assert.match(ctx, /const INDICE_VACIO/,
    'el shell volvió a tener un índice de reserva con contenido del bundle')
  assert.doesNotMatch(ctx, /modulosNav/,
    'ContenidoContext volvió a importar los 287 títulos del temario')

  const resolutor = codigo('src', 'lib', 'firebase', 'contenido.js')
  assert.match(resolutor, /contenidoVacio/,
    'el resolutor debe caer a contenido vacío, nunca al temario de otra academia')
})

test('una academia sin migrar recibe NADA, no el temario de la primera', () => {
  // Ésta era la fuga: el defecto de `contenido.estado` es `legacy`, y legacy
  // significaba «sírvele el bundle». El defecto no ha cambiado —cambiarlo
  // rompería otras cosas— pero lo que se sirve sí: ahora, nada.
  assert.equal(academiaMigrada({}), false, 'el defecto sigue siendo «no migrada»')

  const vacio = contenidoVacio('sin migrar')
  assert.equal(vacio.fuente, 'vacio')
  assert.deepEqual(vacio.modulos, [])
  assert.deepEqual(vacio.todosLosTemas, [])
  assert.equal(vacio.getTema('m1-pab-avdi'), null,
    'el contenido vacío no puede devolver una lección de nadie')
  assert.equal(vacio.stats.temas, 0)
})


// ---------- lo que sí está protegido ----------

test('las reglas cubren el cruce entre academias: no hay que reinventarlo', () => {
  // Se comprueba que las suites existan y nombren la segunda academia. Las que
  // de verdad las ejecutan son `npm run test:rules` (133 pruebas, con emulador).
  const conCruce = ['agregados', 'contenido', 'perfil', 'calificaciones', 'multigrupo']
  for (const nombre of conCruce) {
    const suite = leer('tests', 'rules', `${nombre}.rules.test.mjs`)
    assert.match(suite, /ACA-B/,
      `${nombre}.rules.test.mjs debería probar contra una segunda academia`)
  }
})
