// ============================================================
//  Solo las portadas se indexan
// ------------------------------------------------------------
//  `robots.txt` no decide nada en una aplicación de una sola página: el
//  rastreador ejecuta el JavaScript y lee la etiqueta `<meta name="robots">`
//  que quede puesta. Esto comprueba qué valor le corresponde a cada ruta.
//
//  Es LISTA BLANCA a propósito: una ruta nueva nace sin indexar, y abrirla
//  exige declararlo. Al revés, cada pantalla nueva del panel o de la consola
//  nacería indexable y habría que acordarse de cerrarla una por una.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { esIndexable, metaRobots, rutasPublicas } from '../src/lib/indexable.js'
import { CARRERAS } from '../src/lib/carrerasModelo.js'

test('las portadas públicas se indexan', () => {
  for (const r of ['/', '/creditos', '/terminos-y-condiciones']) {
    assert.equal(esIndexable(r), true, `${r} debería indexarse`)
    assert.equal(metaRobots(r), 'index, follow')
  }
  for (const c of CARRERAS) {
    assert.equal(esIndexable(`/${c.slug}`), true, `/${c.slug} debería indexarse`)
  }
  assert.equal(rutasPublicas().length, 3 + CARRERAS.length)
})

test('NADA del contenido de la academia se indexa', () => {
  const privadas = [
    '/tema/m1-int-definicion', '/tema/m5-hemorragia-shock/quiz',
    '/modulo/m1-propedeutico', '/temario', '/examen', '/flashcards',
    '/progreso', '/logros', '/buscar',
    '/panel', '/panel/miembros', '/panel/contenido',
    '/admin', '/admin/usuarios', '/admin/contenido', '/editor',
  ]
  for (const r of privadas) {
    assert.equal(esIndexable(r), false, `${r} NO puede indexarse`)
    assert.equal(metaRobots(r), 'noindex, nofollow')
  }
})

test('la pantalla de cuenta tampoco: no aporta y ensucia la marca', () => {
  assert.equal(esIndexable('/cuenta'), false)
})

test('una ruta inventada nace cerrada (lista blanca)', () => {
  assert.equal(esIndexable('/lo-que-sea'), false)
  assert.equal(esIndexable('/panel/seccion-que-aun-no-existe'), false)
})

test('la barra final no cambia la respuesta', () => {
  assert.equal(esIndexable('/paramedicos/'), true)
  assert.equal(esIndexable('/temario/'), false)
  assert.equal(esIndexable(''), true)   // raíz
  assert.equal(esIndexable(null), true) // raíz
})
