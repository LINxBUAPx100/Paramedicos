// Pruebas del sistema de capacidades (módulo puro, sin Firebase).
// Correr con: npm test  (node --test)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  PLANES, TIPOS, planEfectivo, capacidadesDe, validarPlanTipo,
} from '../src/lib/capacidades.js'

test('catálogos de planes y tipos', () => {
  assert.deepEqual(PLANES, ['base', 'pro', 'curso'])
  assert.deepEqual(TIPOS, ['basico', 'avanzado', 'medicina'])
})

test('planEfectivo: academia legacy (sin planComercial) se trata como pro', () => {
  assert.equal(planEfectivo({ tipo: 'basico' }), 'pro')
  assert.equal(planEfectivo({}), 'pro')
  assert.equal(planEfectivo({ planComercial: 'no-existe' }), 'pro')
})

test('planEfectivo: respeta el plan declarado', () => {
  assert.equal(planEfectivo({ planComercial: 'base' }), 'base')
  assert.equal(planEfectivo({ planComercial: 'curso' }), 'curso')
  assert.equal(planEfectivo({ planComercial: 'pro' }), 'pro')
})

test('planEfectivo: tipo avanzado fuerza pro', () => {
  assert.equal(planEfectivo({ planComercial: 'base', tipo: 'avanzado' }), 'pro')
  assert.equal(planEfectivo({ tipo: 'avanzado' }), 'pro')
})

test('planEfectivo: sin academia', () => {
  assert.equal(planEfectivo(null), null)
  assert.equal(planEfectivo(undefined), null)
})

test('capacidadesDe: plan base no edita contenido ni personaliza', () => {
  const c = capacidadesDe({ planComercial: 'base' })
  assert.equal(c.editorContenido, false)
  assert.equal(c.personalizacionVisual, false)
  assert.equal(c.certificados, false)
  assert.equal(c.multiCurso, true)
})

test('capacidadesDe: plan pro tiene editor, personalización e historial', () => {
  const c = capacidadesDe({ planComercial: 'pro' })
  assert.equal(c.editorContenido, true)
  assert.equal(c.personalizacionVisual, true)
  assert.equal(c.historialCambios, true)
  assert.equal(c.permisosEditoriales, true)
  assert.equal(c.maxCursos, null)
})

test('capacidadesDe: plan curso es mono-curso con capacitadores', () => {
  const c = capacidadesDe({ planComercial: 'curso' })
  assert.equal(c.multiCurso, false)
  assert.equal(c.maxCursos, 1)
  assert.equal(c.directorioCapacitadores, true)
  assert.equal(c.certificados, true)
  assert.equal(c.historialCambios, false)
})

test('capacidadesDe: academia legacy conserva la personalización (pro)', () => {
  const c = capacidadesDe({ tipo: 'basico' }) // sin planComercial
  assert.equal(c.personalizacionVisual, true)
})

test('capacidadesDe: excepciones por academia solo sobre claves conocidas', () => {
  const c = capacidadesDe({
    planComercial: 'base',
    capacidades: { certificados: true, inventada: true },
  })
  assert.equal(c.certificados, true) // excepción aplicada
  assert.equal('inventada' in c, false) // clave basura ignorada
})

test('capacidadesDe: sin academia todo queda apagado', () => {
  const c = capacidadesDe(null)
  assert.equal(c.editorContenido, false)
  assert.equal(c.personalizacionVisual, false)
  assert.equal(c.maxCursos, null)
})

test('validarPlanTipo: avanzado exige pro', () => {
  assert.notEqual(validarPlanTipo('base', 'avanzado'), null)
  assert.notEqual(validarPlanTipo('curso', 'avanzado'), null)
  assert.equal(validarPlanTipo('pro', 'avanzado'), null)
})

test('validarPlanTipo: valores fuera de catálogo', () => {
  assert.notEqual(validarPlanTipo('premium', 'basico'), null)
  assert.notEqual(validarPlanTipo('base', 'universidad'), null)
  assert.equal(validarPlanTipo('base', 'basico'), null)
  assert.equal(validarPlanTipo('curso', 'medicina'), null)
})
