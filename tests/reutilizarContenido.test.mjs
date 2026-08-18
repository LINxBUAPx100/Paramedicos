// Regresión del motor de reutilización.
//
// Caso real detectado por el usuario en la aplicación: un protocolo de
// reperfusión coronaria (angioplastia, fibrinólisis, IAMCEST) apareció dentro
// del tema «Evaluación inicial y secundaria. (XABCDE)» del módulo de primeros
// auxilios. Las dos cadenas solo compartían la palabra «inicial».
import test from 'node:test'
import assert from 'node:assert/strict'
import { indiceDestinos, mejorDestino, terminos } from '../src/lib/reutilizarContenido.js'

const TEMAS = [
  { id: 'xabcde', titulo: 'Evaluación inicial y secundaria. (XABCDE)' },
  { id: 'sica', titulo: 'Síndrome coronario agudo.' },
  { id: 'avdi', titulo: 'AVDI' },
  { id: 'glasgow', titulo: 'Escala de coma de Glasgow.' },
  { id: 'quemaduras', titulo: 'Quemaduras.' },
]
const IDX = indiceDestinos(TEMAS)

test('una sola palabra de relleno NO arrastra contenido clínico', () => {
  const destino = mejorDestino('Tratamiento inicial y reperfusión en el IAMCEST', IDX)
  assert.notEqual(destino?.id, 'xabcde',
    'un protocolo de reperfusión no puede caer en un tema de primeros auxilios')
})

test('las palabras de relleno quedan fuera del vocabulario', () => {
  const t = terminos('Evaluación inicial y secundaria del paciente')
  for (const vacia of ['evaluacion', 'inicial', 'secundaria', 'paciente']) {
    assert.ok(!t.includes(vacia), `"${vacia}" no debería ser un término significativo`)
  }
})

test('una sigla exclusiva SÍ basta por sí sola', () => {
  // AVDI o XABCDE identifican un tema sin ambigüedad: son la excepción
  // deliberada a la regla de los dos términos.
  assert.equal(mejorDestino('Valoración del estado de conciencia con AVDI', IDX)?.id, 'avdi')
})

test('dos términos coincidentes sí ubican', () => {
  assert.equal(
    mejorDestino('Manejo del síndrome coronario agudo con elevación del ST', IDX)?.id,
    'sica'
  )
})

test('un texto sin nada en común no se ubica en ninguna parte', () => {
  assert.equal(mejorDestino('Trámites administrativos de la unidad', IDX), null)
})
