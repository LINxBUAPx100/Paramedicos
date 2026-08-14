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

// ---------- una sección nueva entra en SU SITIO, no al final ----------
//  Se añadió «Tu academia» justo tras la portada. Con la regla vieja —los
//  ausentes al final— cada academia que ya hubiera tocado su Home habría visto
//  su identidad saltar al pie de la página sin pedirlo.

test('una sección ausente entra donde le toca del catálogo', () => {
  // Configuración vieja: no conoce 'academia'.
  const vieja = [
    { id: 'hero', visible: true },
    { id: 'progreso', visible: true },
    { id: 'fases', visible: true },
  ]
  const ids = normalizarHomeSecciones(vieja).map((s) => s.id)
  assert.equal(ids[0], 'hero')
  assert.equal(ids[1], 'academia', 'va tras la portada, no al final')
  assert.equal(ids[2], 'progreso')
})

test('respeta el orden elegido por el director al insertar', () => {
  // El director subió las fases por delante de la portada.
  const suyo = [
    { id: 'fases', visible: true },
    { id: 'hero', visible: false },
    { id: 'atlas', visible: true },
  ]
  const ids = normalizarHomeSecciones(suyo).map((s) => s.id)
  // Su orden se conserva: fases sigue primera y hero sigue oculta.
  assert.equal(ids[0], 'fases')
  assert.equal(ids.indexOf('hero'), 1)
  assert.equal(normalizarHomeSecciones(suyo).find((s) => s.id === 'hero').visible, false)
  // Y 'academia' entra detrás de 'hero', su vecina anterior en el catálogo.
  assert.equal(ids[2], 'academia')
})

test('si falta la PRIMERA del catálogo, abre la lista', () => {
  const sinHero = [{ id: 'fases', visible: true }, { id: 'academia', visible: true }]
  const ids = normalizarHomeSecciones(sinHero).map((s) => s.id)
  assert.equal(ids[0], 'hero', 'no hay vecina anterior: encabeza')
})

test('la identidad de la academia se puede ocultar y mover como cualquier sección', () => {
  const oculta = alternarSeccion(homeSeccionesDefault(), 'academia')
  assert.equal(oculta.find((s) => s.id === 'academia').visible, false)
  assert.ok(!idsVisiblesDeHome({ homeSecciones: oculta }).includes('academia'))

  const movida = moverSeccion(homeSeccionesDefault(), 'academia', 'arriba')
  assert.equal(movida[0].id, 'academia', 'sube por delante de la portada')
})

test('el default incluye la academia justo tras la portada', () => {
  const ids = homeSeccionesDefault().map((s) => s.id)
  assert.deepEqual(ids.slice(0, 2), ['hero', 'academia'])
})
