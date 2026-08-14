import test from 'node:test'
import assert from 'node:assert/strict'

import {
  estadoFaseAlumno, sePuedeAlternar, accionDeAlternar,
  avanceDeAlumno, fasesHasta, resumenAvanceGrupo,
} from '../src/lib/avanceAlumno.js'

const FASES = [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }, { id: 'f4' }]
// El grupo muestra f1 y oculta f2, f3 y f4.
const OCULTAS = ['f2', 'f3', 'f4']

test('las dos capas: lo del grupo y lo del alumno', () => {
  assert.equal(estadoFaseAlumno('f1', { fasesOcultasDelGrupo: OCULTAS }), 'grupo')
  assert.equal(estadoFaseAlumno('f2', { fasesOcultasDelGrupo: OCULTAS }), 'oculta')
  assert.equal(
    estadoFaseAlumno('f2', { fasesOcultasDelGrupo: OCULTAS, fasesDesbloqueadas: ['f2'] }),
    'individual',
    'lo desbloqueado al alumno anula lo oculto del grupo'
  )
})

test('una fase que el grupo YA muestra no se puede quitar a una sola persona', () => {
  // El campo solo suma, no resta: ofrecer un interruptor que no hace nada es
  // peor que no ofrecerlo.
  assert.equal(sePuedeAlternar('grupo'), false)
  assert.equal(accionDeAlternar('grupo'), null)
  assert.equal(sePuedeAlternar('oculta'), true)
  assert.equal(accionDeAlternar('oculta'), 'desbloquear')
  assert.equal(sePuedeAlternar('individual'), true)
  assert.equal(accionDeAlternar('individual'), 'bloquear')
})

test('el avance de un alumno cuenta lo que ve y lo que se le abrió a él', () => {
  const al = { id: 'a1', fasesDesbloqueadas: ['f2'] }
  const r = avanceDeAlumno(al, FASES, OCULTAS)
  assert.deepEqual(r.filas.map((x) => x.estado), ['grupo', 'individual', 'oculta', 'oculta'])
  assert.equal(r.visibles, 2) // f1 por grupo + f2 por desbloqueo
  assert.equal(r.individuales, 1) // solo f2 es trabajo del profesor
  assert.equal(r.total, 4)
})

test('un alumno sin nada desbloqueado solo ve lo del grupo', () => {
  const r = avanceDeAlumno({ id: 'a2' }, FASES, OCULTAS)
  assert.equal(r.visibles, 1)
  assert.equal(r.individuales, 0)
})

test('«ábrele hasta aquí» devuelve solo lo que falta', () => {
  // Un maestro no piensa «desbloquea la 2, la 3 y la 4», piensa «que llegue
  // hasta la 4».
  assert.deepEqual(
    fasesHasta(FASES, 'f4', { fasesOcultasDelGrupo: OCULTAS }),
    ['f2', 'f3', 'f4']
  )
  // Lo que ya tiene no se vuelve a pedir.
  assert.deepEqual(
    fasesHasta(FASES, 'f4', { fasesOcultasDelGrupo: OCULTAS, fasesDesbloqueadas: ['f3'] }),
    ['f2', 'f4']
  )
  // Lo que el grupo ya muestra no hace falta desbloquearlo.
  assert.deepEqual(fasesHasta(FASES, 'f1', { fasesOcultasDelGrupo: OCULTAS }), [])
  // Una fase que no existe no produce escrituras.
  assert.deepEqual(fasesHasta(FASES, 'nope', { fasesOcultasDelGrupo: OCULTAS }), [])
})

test('el resumen del grupo dice cuántos llegan a cada fase', () => {
  const alumnos = [
    { id: 'a1', fasesDesbloqueadas: ['f2'] },
    { id: 'a2', fasesDesbloqueadas: ['f2', 'f3'] },
    { id: 'a3' },
  ]
  const r = resumenAvanceGrupo(alumnos, FASES, OCULTAS)
  assert.deepEqual(r.map((x) => [x.fase.id, x.conAcceso, x.individuales]), [
    ['f1', 3, 0], // el grupo la muestra: todos
    ['f2', 2, 2], // dos la tienen abierta individualmente
    ['f3', 1, 1],
    ['f4', 0, 0],
  ])
  assert.ok(r.every((x) => x.total === 3))
})

test('aguanta datos ausentes sin romperse', () => {
  assert.deepEqual(avanceDeAlumno(null, null, null).filas, [])
  assert.deepEqual(resumenAvanceGrupo(null, null, null), [])
  assert.equal(estadoFaseAlumno('f1', {}), 'grupo')
  assert.equal(estadoFaseAlumno('f1'), 'grupo')
})
