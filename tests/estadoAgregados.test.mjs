// ============================================================
//  Los índices que faltaban en silencio
// ------------------------------------------------------------
//  R.E.S.C.A.T.E. llevaba desde su migración sin agregados y nadie lo notó,
//  porque no rompen nada: el resolutor cae a un camino más caro pero correcto.
//  El único síntoma era el coste en lecturas de Firestore.
//
//  Lo que estas pruebas fijan es justamente ese coste, porque es lo que
//  convierte «falta un índice» en una decisión.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  estadoDeIndices, lecturasPorCarga, cargasAntesDeAgotarCuota,
  resumenDeIndices, temasDeEstructura, CUOTA_SPARK_DIARIA,
} from '../src/lib/estadoAgregados.js'

test('sin sello, el curso nunca generó sus índices', () => {
  assert.equal(estadoDeIndices(null), 'nunca')
  assert.equal(estadoDeIndices(undefined), 'nunca')
  assert.equal(estadoDeIndices({}), 'nunca')
  // Versión 0 no es un sello: es un sello a medio escribir.
  assert.equal(estadoDeIndices({ version: 0 }), 'nunca')
})

test('un sello marcado desactualizado está caducado, no al día', () => {
  assert.equal(estadoDeIndices({ version: 3, desactualizado: true }), 'caducado')
  assert.equal(estadoDeIndices({ version: 3 }), 'al-dia')
  assert.equal(estadoDeIndices({ version: 3, desactualizado: false }), 'al-dia')
})

test('el coste real: 3 lecturas con índices, una por lección sin ellos', () => {
  assert.equal(lecturasPorCarga(287, true), 3)
  // 287 lecciones + el documento del curso.
  assert.equal(lecturasPorCarga(287, false), 288)
})

test('LA CIFRA QUE IMPORTA: cuántas cargas caben en la cuota gratuita', () => {
  // Con índices, la cuota diaria no es un problema en la práctica.
  assert.equal(cargasAntesDeAgotarCuota(287, true), Math.floor(CUOTA_SPARK_DIARIA / 3))
  assert.ok(cargasAntesDeAgotarCuota(287, true) > 16000)

  // Sin ellos —el estado real de R.E.S.C.A.T.E. el 31-08-2026— caben 173.
  // Un grupo de treinta alumnos se las come en una clase, y agotada la cuota
  // Firestore deja de responder hasta el día siguiente.
  assert.equal(cargasAntesDeAgotarCuota(287, false), 173)
})

test('el resumen del panel trae estado, texto y las dos cifras', () => {
  const r = resumenDeIndices({ sello: null, temas: 287 })
  assert.equal(r.estado, 'nunca')
  assert.equal(r.grave, true)
  assert.equal(r.lecturasPorCarga, 288)
  assert.equal(r.cargasAlDia, 173)
  assert.match(r.accion, /Generar/)
  // El texto no puede decir que algo está roto, porque no lo está.
  assert.match(r.detalle, /Nada está roto/)

  const ok = resumenDeIndices({ sello: { version: 2 }, temas: 287 })
  assert.equal(ok.estado, 'al-dia')
  assert.equal(ok.grave, false)
  assert.equal(ok.lecturasPorCarga, 3)
  assert.equal(ok.version, 2)
})

test('contar temas admite las dos formas de estructura', () => {
  // La real: módulos → unidades → temas. Es la de R.E.S.C.A.T.E.
  const conUnidades = [
    { id: 'm1', unidades: [{ temas: [1, 2, 3] }, { temas: [4, 5] }] },
    { id: 'm2', unidades: [{ temas: [6] }] },
  ]
  assert.equal(temasDeEstructura(conUnidades), 6)

  // La antigua, con los temas colgando del módulo.
  assert.equal(temasDeEstructura([{ id: 'm1', temas: [1, 2] }]), 2)

  // Envuelta en un objeto, como la devuelven algunas rutas.
  assert.equal(temasDeEstructura({ modulos: conUnidades }), 6)

  // Y lo que no es una estructura no revienta ni inventa temas.
  assert.equal(temasDeEstructura(null), 0)
  assert.equal(temasDeEstructura(undefined), 0)
  assert.equal(temasDeEstructura([]), 0)
})

test('un curso sin temas no divide por cero', () => {
  // Un curso recién creado y vacío: la cifra tiene que salir, no explotar.
  assert.equal(lecturasPorCarga(0, false), 1)
  assert.equal(cargasAntesDeAgotarCuota(0, false), CUOTA_SPARK_DIARIA)
})
