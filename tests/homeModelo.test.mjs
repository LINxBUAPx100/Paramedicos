// ============================================================
//  Roadmap F7 — Home por secciones configurables (lógica pura)
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  SECCIONES_HOME, IDS_SECCIONES_HOME, homeSeccionesDefault,
  normalizarHomeSecciones, seccionesDeHome, idsVisiblesDeHome,
  alternarSeccion, moverSeccion, esHomeDefault,
} from '../src/lib/homeModelo.js'
import { capacidadesDe } from '../src/lib/capacidades.js'

test('catálogo: secciones con id/etiqueta/descripcion y default todo visible', () => {
  assert.ok(SECCIONES_HOME.length >= 6)
  for (const s of SECCIONES_HOME) {
    assert.ok(s.id && s.etiqueta && s.descripcion)
  }
  const def = homeSeccionesDefault()
  assert.deepEqual(def.map((s) => s.id), IDS_SECCIONES_HOME)
  assert.ok(def.every((s) => s.visible === true))
})

test('normalizar: descarta ids desconocidos y duplicados; completa faltantes al final', () => {
  const norm = normalizarHomeSecciones([
    { id: 'fases', visible: false },
    { id: 'inventada', visible: true },
    { id: 'fases', visible: true }, // duplicado: gana el primero
    { id: 'hero', visible: true },
  ])
  assert.deepEqual(norm.slice(0, 2), [
    { id: 'fases', visible: false },
    { id: 'hero', visible: true },
  ])
  // Las que faltan se añaden visibles, en el orden del catálogo.
  const resto = IDS_SECCIONES_HOME.filter((id) => id !== 'fases' && id !== 'hero')
  assert.deepEqual(norm.slice(2).map((s) => s.id), resto)
  assert.ok(norm.slice(2).every((s) => s.visible))
})

test('normalizar: basura de Firestore es fail-open (nunca borra el Home)', () => {
  for (const basura of [null, undefined, 'x', 42, {}, [{ sinId: true }, null]]) {
    const norm = normalizarHomeSecciones(basura)
    assert.equal(norm.length, IDS_SECCIONES_HOME.length)
    assert.ok(norm.every((s) => s.visible === true))
  }
  // `visible` no booleano ⇒ visible (solo `false` explícito oculta).
  const raro = normalizarHomeSecciones([{ id: 'hero', visible: 0 }, { id: 'fases', visible: false }])
  assert.equal(raro.find((s) => s.id === 'hero').visible, true)
  assert.equal(raro.find((s) => s.id === 'fases').visible, false)
})

test('seccionesDeHome: sin academia o sin configuración = el Home de siempre', () => {
  assert.deepEqual(seccionesDeHome(null), homeSeccionesDefault())
  assert.deepEqual(seccionesDeHome({ id: 'A' }), homeSeccionesDefault())
  assert.deepEqual(seccionesDeHome({ id: 'A', homeSecciones: [] }), homeSeccionesDefault())
  assert.deepEqual(idsVisiblesDeHome(null), IDS_SECCIONES_HOME)
})

test('seccionesDeHome: respeta orden y ocultamientos guardados', () => {
  const academia = {
    id: 'A',
    homeSecciones: [
      { id: 'fases', visible: true },
      { id: 'hero', visible: false },
      { id: 'flashcards', visible: true },
    ],
  }
  const ids = idsVisiblesDeHome(academia)
  assert.equal(ids[0], 'fases')
  assert.ok(!ids.includes('hero'))
  assert.ok(ids.includes('flashcards'))
  // Las no mencionadas siguen visibles (completadas al final).
  assert.ok(ids.includes('prueba'))
})

test('alternar y mover: inmutables, con límites y sin perder secciones', () => {
  const base = homeSeccionesDefault()
  const sinHero = alternarSeccion(base, 'hero')
  assert.equal(sinHero.find((s) => s.id === 'hero').visible, false)
  assert.equal(base.find((s) => s.id === 'hero').visible, true) // no muta
  const subida = moverSeccion(base, 'fases', 'arriba')
  const idxAntes = base.findIndex((s) => s.id === 'fases')
  assert.equal(subida.findIndex((s) => s.id === 'fases'), idxAntes - 1)
  // Límite superior/inferior: no pasa nada.
  assert.deepEqual(moverSeccion(base, base[0].id, 'arriba'), base)
  assert.deepEqual(moverSeccion(base, base[base.length - 1].id, 'abajo'), base)
  assert.equal(moverSeccion(base, 'inexistente', 'abajo').length, base.length)
})

test('esHomeDefault: detecta el default (para guardar null y no arrastrar campo)', () => {
  assert.ok(esHomeDefault(homeSeccionesDefault()))
  assert.ok(esHomeDefault(null))
  assert.ok(!esHomeDefault(alternarSeccion(homeSeccionesDefault(), 'hero')))
  assert.ok(!esHomeDefault(moverSeccion(homeSeccionesDefault(), 'fases', 'arriba')))
})

test('capacidad: paginaInicioConfigurable solo PRO/CURSO (fuente única)', () => {
  assert.equal(capacidadesDe({ planComercial: 'pro' }).paginaInicioConfigurable, true)
  assert.equal(capacidadesDe({ planComercial: 'curso' }).paginaInicioConfigurable, true)
  assert.equal(capacidadesDe({ planComercial: 'base' }).paginaInicioConfigurable, false)
  // Legacy sin campo ⇒ pro (conserva lo que hoy tiene).
  assert.equal(capacidadesDe({}).paginaInicioConfigurable, true)
})
