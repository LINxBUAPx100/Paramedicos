// ============================================================
//  Pruebas de las tablas frente a Firestore
// ------------------------------------------------------------
//  EL FALLO QUE FIJAN AQUÍ, porque costó encontrarlo:
//
//  Firestore RECHAZA un arreglo que contenga otro arreglo. Un bloque de tabla
//  guarda sus filas exactamente así —`filas: [['a','b'], ['c','d']]`— y en el
//  temario actual son 1 026 filas repartidas por 170 de los 287 temas.
//
//  Consecuencia: NINGUNA academia con tablas podía migrarse. Tanto la siembra
//  de plantillas como `clonarPlantillaAAcademia` fallaban con «Property array
//  contains an invalid nested entity», y como el resolutor cae al bundle
//  cuando algo va mal, el síntoma visible era solo que la academia «seguía en
//  legacy». Nada avisaba de la causa.
//
//  Estas pruebas comprueban tres cosas: que lo que se escribe es apto para
//  Firestore, que lo que se lee es idéntico a lo original, y que un tema
//  guardado ANTES del arreglo se sigue leyendo bien.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'

import * as legacy from '../src/data/index.js'
import {
  contenidoTema, seccionesParaFirestore, seccionesDesdeFirestore,
} from '../src/lib/contenidoModelo.js'
import { temaDesdeDoc } from '../src/lib/contenidoApi.js'

// Réplica de la restricción de Firestore: un arreglo no puede contener otro.
function tieneArreglosAnidados(valor, dentroDeArreglo = false) {
  if (Array.isArray(valor)) {
    if (dentroDeArreglo) return true
    return valor.some((x) => tieneArreglosAnidados(x, true))
  }
  if (valor && typeof valor === 'object') {
    return Object.values(valor).some((x) => tieneArreglosAnidados(x, false))
  }
  return false
}

const CON_TABLA = legacy.todosLosTemas.filter((t) =>
  (t.secciones || []).some((s) => (s.bloques || []).some((b) => Array.isArray(b.filas))))

test('la prueba sabe detectar el caso que Firestore rechaza', () => {
  // Si este detector se rompiera, las demás pruebas pasarían sin comprobar nada.
  assert.ok(tieneArreglosAnidados({ filas: [['a', 'b']] }))
  assert.ok(tieneArreglosAnidados([[1]]))
  assert.ok(!tieneArreglosAnidados({ filas: [{ celdas: ['a', 'b'] }] }))
  assert.ok(!tieneArreglosAnidados({ a: [1, 2], b: { c: ['x'] } }))
})

test('el temario real SÍ tiene el problema en origen', () => {
  // La prueba solo significa algo si el material de partida es el que falla.
  assert.ok(CON_TABLA.length > 100, `esperaba muchos temas con tabla, hay ${CON_TABLA.length}`)
  assert.ok(tieneArreglosAnidados(CON_TABLA[0].secciones))
})

test('ningún tema escrito a Firestore lleva arreglos anidados', () => {
  const malos = legacy.todosLosTemas
    .filter((t) => tieneArreglosAnidados(contenidoTema(t)))
    .map((t) => t.id)
  assert.deepEqual(malos, [], `estos temas no se pueden escribir: ${malos.slice(0, 5).join(', ')}`)
})

test('ida y vuelta: lo que se lee es idéntico a lo que había', () => {
  // Lo que de verdad importa: que el arreglo no cambie una sola celda del
  // temario. Se comprueba sobre los 287 temas, no sobre un ejemplo.
  for (const tema of legacy.todosLosTemas) {
    const vuelta = temaDesdeDoc(contenidoTema(tema))
    assert.deepEqual(vuelta.secciones, tema.secciones || [], `${tema.id} no sobrevive la ida y vuelta`)
  }
})

test('un tema guardado ANTES del arreglo se sigue leyendo', () => {
  // Compatibilidad: los temas sin tabla ya estaban escritos con filas crudas.
  // Si la lectura no las aceptara, migrar rompería lo que ya funcionaba.
  const crudo = {
    temaId: 't', titulo: 'T',
    secciones: [{ titulo: 'S', bloques: [{ tipo: 'tabla', filas: [['a', 'b'], ['c', 'd']] }] }],
  }
  assert.deepEqual(
    temaDesdeDoc(crudo).secciones[0].bloques[0].filas,
    [['a', 'b'], ['c', 'd']]
  )
})

test('las dos conversiones son inversas y no tocan lo que no es tabla', () => {
  const secciones = [
    { titulo: 'A', bloques: [{ tipo: 'p', texto: 'hola' }, { tipo: 'lista', items: ['x', 'y'] }] },
    { titulo: 'B', bloques: [{ tipo: 'tabla', headers: ['H'], filas: [['1'], ['2']] }] },
    { titulo: 'C' }, // sección sin bloques: no debe romper
  ]
  const ida = seccionesParaFirestore(secciones)
  assert.ok(!tieneArreglosAnidados(ida))
  assert.deepEqual(seccionesDesdeFirestore(ida), secciones)
  // Los bloques que no son tabla salen intactos.
  assert.deepEqual(ida[0], secciones[0])
  // Idempotente: aplicarla dos veces no envuelve dos veces.
  assert.deepEqual(seccionesParaFirestore(ida), ida)
})

test('una fila vacía o rara no rompe la conversión', () => {
  const raras = [{ titulo: 'X', bloques: [{ tipo: 'tabla', filas: [[], null, ['a']] }] }]
  const ida = seccionesParaFirestore(raras)
  assert.ok(!tieneArreglosAnidados(ida))
  assert.deepEqual(seccionesDesdeFirestore(ida)[0].bloques[0].filas, [[], [], ['a']])
})
