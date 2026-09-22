import test from 'node:test'
import assert from 'node:assert/strict'
import { buscarModulos } from '../src/prototipo/recorrido.js'

test('búsqueda del prototipo tolera acentos, espacios y orden de palabras sin modificar el catálogo', () => {
  const modulos = [{ id: 'a', titulo: 'Evaluación del paciente' }, { id: 'b', titulo: 'El cuerpo humano' }]
  assert.deepEqual(buscarModulos(modulos, '  PACIENTE evaluacion '), [modulos[0]])
  assert.deepEqual(buscarModulos(modulos, ' '), modulos)
  assert.deepEqual(buscarModulos(modulos, 'sin coincidencias'), [])
  assert.deepEqual(buscarModulos([], 'evaluacion'), [])
  assert.equal(modulos.length, 2)
})
