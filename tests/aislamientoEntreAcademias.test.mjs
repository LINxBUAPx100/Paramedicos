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

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const leer = (...p) => readFileSync(path.join(RAIZ, ...p), 'utf8')

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

test('el fallback al bundle SIGUE VIVO — es el riesgo, medido', () => {
  const ctx = leer('src', 'context', 'ContenidoContext.jsx')
  // Hoy: si la academia no está migrada, el índice del shell es el del bundle.
  const elFallbackSigueVivo = ctx.includes('setIndice(INDICE_BUNDLE)')
    && ctx.includes('if (!migrada) return undefined')

  assert.equal(elFallbackSigueVivo, true,
    'Si esto falla, el fallback al bundle desapareció: es lo que persigue P2. '
    + 'Invierte esta aserción y actualiza la cabecera de este archivo en vez de '
    + 'volver a enlazar el bundle.')
})

test('el bundle que se sirve por defecto ES el temario de R.E.S.C.A.T.E.', () => {
  // No es un temario genérico ni de ejemplo: son las lecciones de la academia.
  const plan = leer('src', 'data', 'planRescate.js')
  for (const marca of ['OVACE', 'AVDI', 'PROPED']) {
    assert.ok(plan.includes(marca),
      `el plan del bundle debería contener "${marca}"`)
  }
  // Y por eso servirlo a otra academia es filtrar material ajeno, no dar un
  // temario de muestra.
  assert.ok(plan.length > 100000,
    'el plan del bundle es el temario completo, no una muestra')
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
