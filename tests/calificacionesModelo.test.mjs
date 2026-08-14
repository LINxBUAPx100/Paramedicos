// ============================================================
//  Pruebas del libro de calificaciones
// ------------------------------------------------------------
//  La decisión que más se prueba aquí: una evaluación SIN CALIFICAR no vale
//  cero. Si valiera cero, el promedio de un alumno al día se hundiría por
//  trabajo que el maestro aún no ha revisado, y el libro mentiría justo en lo
//  único que se le pide.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  idCalificacion, validarValor, normalizarEvaluacion, indexarCalificaciones,
  promedioDeAlumno, resumenDeEvaluacion, resumenDelGrupo, misCalificaciones,
  APROBADO, ESCALA,
} from '../src/lib/calificacionesModelo.js'

const EVS = [
  normalizarEvaluacion({ id: 'e1', titulo: 'Parcial 1', ponderacion: 1 }),
  normalizarEvaluacion({ id: 'e2', titulo: 'Práctica', ponderacion: 3 }),
]
const ALUMNOS = [{ id: 'a1', nombre: 'Ana' }, { id: 'a2', nombre: 'Beto' }, { id: 'a3', nombre: 'Caro' }]

test('el id de una nota es determinista: una por alumno y evaluación', () => {
  assert.equal(idCalificacion('e1', 'a1'), 'e1__a1')
  assert.equal(idCalificacion('e1', 'a1'), idCalificacion('e1', 'a1'))
  assert.equal(idCalificacion(null, 'a1'), null)
  assert.equal(idCalificacion('e1', null), null)
})

test('validarValor acepta enteros de 0 a 100 y nada más', () => {
  assert.equal(validarValor(0), '')
  assert.equal(validarValor(100), '')
  assert.equal(validarValor(70), '')
  assert.match(validarValor(''), /Escribe/)
  assert.match(validarValor(null), /Escribe/)
  assert.match(validarValor('abc'), /número/)
  assert.match(validarValor(70.5), /entero/)
  assert.match(validarValor(-1), /0 a 100/)
  assert.match(validarValor(101), /0 a 100/)
})

test('normalizarEvaluacion es fail-open con datos corruptos', () => {
  // Una ponderación inválida no debe reventar la tabla: pesa 1, como el resto.
  assert.equal(normalizarEvaluacion({ id: 'x', ponderacion: 'abc' }).ponderacion, 1)
  assert.equal(normalizarEvaluacion({ id: 'x', ponderacion: 0 }).ponderacion, 1)
  assert.equal(normalizarEvaluacion({ id: 'x', ponderacion: -3 }).ponderacion, 1)
  assert.equal(normalizarEvaluacion({ id: 'x' }).titulo, 'Sin título')
  assert.equal(normalizarEvaluacion(null).escala, ESCALA)
})

test('el promedio PONDERA de verdad', () => {
  // Parcial (peso 1) = 100; Práctica (peso 3) = 60 → (100 + 180) / 4 = 70.
  const indice = indexarCalificaciones([
    { uid: 'a1', evaluacionId: 'e1', valor: 100 },
    { uid: 'a1', evaluacionId: 'e2', valor: 60 },
  ])
  const r = promedioDeAlumno('a1', EVS, indice)
  assert.equal(r.promedio, 70)
  assert.equal(r.calificadas, 2)
  assert.equal(r.pendientes, 0)
  assert.equal(r.aprobado, true)
})

test('lo SIN CALIFICAR no cuenta como cero', () => {
  // Solo tiene el parcial, con 90. Su promedio es 90, no 22 (90/4).
  const indice = indexarCalificaciones([{ uid: 'a1', evaluacionId: 'e1', valor: 90 }])
  const r = promedioDeAlumno('a1', EVS, indice)
  assert.equal(r.promedio, 90)
  assert.equal(r.calificadas, 1)
  assert.equal(r.pendientes, 1, 'la que falta se informa aparte')
})

test('un CERO puesto a mano sí cuenta: es una nota', () => {
  const indice = indexarCalificaciones([
    { uid: 'a1', evaluacionId: 'e1', valor: 0 },
    { uid: 'a1', evaluacionId: 'e2', valor: 100 },
  ])
  // (0*1 + 100*3) / 4 = 75. Si el 0 se tratara como «sin calificar» daría 100.
  assert.equal(promedioDeAlumno('a1', EVS, indice).promedio, 75)
  assert.equal(promedioDeAlumno('a1', EVS, indice).calificadas, 2)
})

test('sin ninguna nota el promedio es null, no 0', () => {
  const r = promedioDeAlumno('a9', EVS, {})
  assert.equal(r.promedio, null, 'null y 0 son cosas distintas y se pintan distinto')
  assert.equal(r.aprobado, false)
  assert.equal(r.pendientes, 2)
})

test('el resumen de una evaluación cuenta calificadas, pendientes y aprobados', () => {
  const indice = indexarCalificaciones([
    { uid: 'a1', evaluacionId: 'e1', valor: 90 },
    { uid: 'a2', evaluacionId: 'e1', valor: 50 },
  ])
  const r = resumenDeEvaluacion(EVS[0], ALUMNOS, indice)
  assert.equal(r.promedio, 70) // (90 + 50) / 2
  assert.equal(r.calificadas, 2)
  assert.equal(r.pendientes, 1) // Caro
  assert.equal(r.aprobados, 1)
})

test('el resumen del grupo separa «en riesgo» de «sin evaluar»', () => {
  const indice = indexarCalificaciones([
    { uid: 'a1', evaluacionId: 'e1', valor: 90 },
    { uid: 'a2', evaluacionId: 'e1', valor: 40 },
    // a3 no tiene nada.
  ])
  const r = resumenDelGrupo(EVS, ALUMNOS, indice)
  assert.equal(r.promedio, 65) // (90 + 40) / 2, solo quien tiene nota
  assert.deepEqual(r.enRiesgo.map((f) => f.alumno.id), ['a2'])
  // a3 NO está en riesgo: está sin evaluar. Confundirlos manda al maestro a
  // hablar con el alumno equivocado.
  assert.deepEqual(r.sinNota.map((f) => f.alumno.id), ['a3'])
  assert.equal(r.filas.length, 3)
  assert.equal(r.pendientesTotal, 1 + 1 + 2)
})

test('el umbral de aprobado es el mismo que en el resto de la app', () => {
  const indice = indexarCalificaciones([{ uid: 'a1', evaluacionId: 'e1', valor: APROBADO }])
  assert.equal(promedioDeAlumno('a1', [EVS[0]], indice).aprobado, true)
  const bajo = indexarCalificaciones([{ uid: 'a1', evaluacionId: 'e1', valor: APROBADO - 1 }])
  assert.equal(promedioDeAlumno('a1', [EVS[0]], bajo).aprobado, false)
})

test('misCalificaciones devuelve las del alumno y su promedio', () => {
  const califs = [
    { uid: 'a1', evaluacionId: 'e1', valor: 80, nota: 'Buen trabajo' },
    { uid: 'a2', evaluacionId: 'e1', valor: 30 },
  ]
  const r = misCalificaciones('a1', EVS, califs)
  assert.equal(r.lista.length, 2, 'una fila por evaluación, calificada o no')
  assert.equal(r.lista[0].valor, 80)
  assert.equal(r.lista[0].nota, 'Buen trabajo')
  assert.equal(r.lista[0].aprobado, true)
  assert.equal(r.lista[1].valor, null, 'la que no tiene nota va en null')
  assert.equal(r.promedio, 80)
  // Y NO se cuela la nota de otro alumno.
  assert.ok(!r.lista.some((f) => f.valor === 30))
})

test('indexarCalificaciones ignora registros sin uid o sin evaluación', () => {
  const i = indexarCalificaciones([
    { uid: 'a1', evaluacionId: 'e1', valor: 10 },
    { uid: 'a1', valor: 20 },
    { evaluacionId: 'e2', valor: 30 },
    null,
  ])
  assert.deepEqual(Object.keys(i), ['a1'])
  assert.deepEqual(Object.keys(i.a1), ['e1'])
})
