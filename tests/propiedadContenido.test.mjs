// ============================================================
//  Pruebas del SELLO DE PROPIEDAD del contenido
// ------------------------------------------------------------
//  El sello existe para responder una pregunta que hoy es obvia y dentro de un
//  año no lo será: ¿de quién es este tema, y puede servirse a otra academia?
//
//  Dos cosas se protegen aquí, y la segunda es la que de verdad importa:
//
//   1. Que el defecto sea SEGURO. Un tema sin sellar es de la academia, no de
//      la plataforma: el error barato es no replicar algo replicable; el caro
//      es replicar material ajeno.
//   2. Que el sello SOBREVIVA el viaje a Firestore. Las claves que no se
//      copian explícitamente en contenidoModelo/contenidoApi se pierden al
//      migrar —ya pasó con `estadoEditorial`, y por eso una academia migrada
//      veía todo su temario como borrador—. Si el sello se perdiera, la
//      migración del trabajo P1 lo borraría entero en una sola pasada.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  PROPIETARIOS, PROPIETARIO_DEFECTO, ETIQUETA_PROPIETARIO, esPropietario,
  propietarioDe, esReutilizable, validarPropietario, repartoPorPropietario,
} from '../src/lib/estadoEditorial.js'
import { contenidoTema } from '../src/lib/contenidoModelo.js'
import { planRescate } from '../src/data/planRescate.js'

// ---------- el catálogo ----------

test('los tres dueños posibles están, y cada uno tiene etiqueta legible', () => {
  assert.deepEqual(PROPIETARIOS, ['rescate', 'ptem', 'terceros'])
  for (const p of PROPIETARIOS) {
    assert.ok(ETIQUETA_PROPIETARIO[p], `falta etiqueta de ${p}`)
    assert.equal(esPropietario(p), true)
  }
  assert.equal(esPropietario('cualquiera'), false)
})

// ---------- el defecto seguro ----------

test('un tema sin sellar es de la academia, nunca de la plataforma', () => {
  assert.equal(PROPIETARIO_DEFECTO, 'rescate')
  assert.equal(propietarioDe(undefined), 'rescate')
  assert.equal(propietarioDe({}), 'rescate')
  assert.equal(propietarioDe({ propietario: '' }), 'rescate')
  assert.equal(propietarioDe({ propietario: 'inventado' }), 'rescate')
  assert.equal(propietarioDe({ propietario: 'ptem' }), 'ptem')
})

test('solo el material de la plataforma se puede servir a otra academia', () => {
  assert.equal(esReutilizable({ propietario: 'ptem' }), true)
  assert.equal(esReutilizable({ propietario: 'rescate' }), false)
  assert.equal(esReutilizable({ propietario: 'terceros' }), false)
  // Y lo que nadie selló tampoco: el defecto tiene que caer del lado seguro.
  assert.equal(esReutilizable({}), false)
  assert.equal(esReutilizable(null), false)
})

test('validarPropietario acepta lo ausente y rechaza lo desconocido', () => {
  assert.equal(validarPropietario(null), null)
  assert.equal(validarPropietario(undefined), null)
  assert.equal(validarPropietario('rescate'), null)
  assert.match(validarPropietario('otra-cosa'), /Propietario desconocido/)
})

test('el reparto cuenta todos los temas y no se deja ninguno fuera', () => {
  const reparto = repartoPorPropietario([
    { propietario: 'rescate' }, { propietario: 'ptem' },
    { propietario: 'terceros' }, {}, { propietario: 'basura' },
  ])
  // Los dos últimos caen en el defecto.
  assert.deepEqual(reparto, { rescate: 3, ptem: 1, terceros: 1 })
  assert.deepEqual(repartoPorPropietario([]), { rescate: 0, ptem: 0, terceros: 0 })
  assert.deepEqual(repartoPorPropietario(null), { rescate: 0, ptem: 0, terceros: 0 })
})

// ---------- que no se pierda al migrar ----------

test('el sello sobrevive el viaje a Firestore (contenidoTema lo conserva)', () => {
  const tema = contenidoTema({
    id: 'm1-x', titulo: 'X', estadoEditorial: 'borrador', propietario: 'ptem',
  })
  assert.equal(tema.propietario, 'ptem',
    'contenidoTema perdió el sello: al migrar, el tema quedaría sin dueño declarado')
})

// ---------- el corpus real ----------

test('los 287 nodos del plan oficial llevan sello, sin una sola excepción', () => {
  const temas = planRescate.flatMap((m) => m.temas || [])
  assert.equal(temas.length, 287)
  const sinSello = temas.filter((t) => !esPropietario(t.propietario)).map((t) => t.id)
  assert.deepEqual(sinSello, [],
    `estos temas se generaron sin sello de propiedad: ${sinSello.join(', ')}`)
})

test('hoy TODO el temario es de R.E.S.C.A.T.E., y nada se puede replicar', () => {
  const temas = planRescate.flatMap((m) => m.temas || [])
  const reparto = repartoPorPropietario(temas)
  assert.equal(reparto.rescate, 287)
  assert.equal(reparto.ptem, 0)
  assert.equal(reparto.terceros, 0)
  // La consecuencia, dicha en la prueba para que se lea sin interpretar cifras:
  // ninguna otra academia puede recibir nada de este corpus.
  assert.equal(temas.some(esReutilizable), false)
})
