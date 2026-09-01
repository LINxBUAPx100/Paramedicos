// ============================================================
//  Qué puede crear una academia, y qué es de R.E.S.C.A.T.E.
// ------------------------------------------------------------
//  Decisión del dueño del producto el 31-08-2026:
//
//  «R.E.S.C.A.T.E. hizo un gran trabajo con su contenido, y a menos que yo lo
//   crea pertinente nadie debería poder entrar a lo que es de R.E.S.C.A.T.E.»
//
//  Estas pruebas fijan las tres consecuencias: por omisión nadie crea nada, la
//  concesión es por tipo, y `tum` no se concede por esta vía ni escribiéndolo a
//  mano en la base de datos.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  TIPOS_CREABLES, TIPOS_PROGRAMA, tiposQuePuedeCrear,
  puedeCrearPrograma, puedeCrearProgramas,
} from '../src/lib/programasModelo.js'
import { capacidadesDe } from '../src/lib/capacidades.js'

test('POR OMISIÓN una academia no crea ningún programa', () => {
  // La regla que protege el trabajo de R.E.S.C.A.T.E.: se recibe lo que el
  // super-admin clone, no se toma lo que se quiera.
  assert.deepEqual(tiposQuePuedeCrear({}), [])
  assert.equal(puedeCrearProgramas({}), false)
  assert.equal(puedeCrearProgramas({ planComercial: 'pro' }), false,
    'un plan caro NO da derecho a crear programas propios')
})

test('la capacidad viene vacía en TODOS los planes', () => {
  for (const plan of ['base', 'pro', 'curso']) {
    const caps = capacidadesDe({ planComercial: plan })
    assert.deepEqual(caps.programasPropios, [], `el plan ${plan} no puede venir abierto`)
  }
})

test('el super-admin concede POR TIPO, no con un interruptor', () => {
  // Poder abrir «cursos y certificaciones» sin abrir carreras completas es
  // justamente el punto: son negocios distintos.
  const aca = { capacidades: { programasPropios: ['curso', 'certificacion'] } }
  assert.deepEqual(tiposQuePuedeCrear(aca), ['curso', 'certificacion'])
  assert.equal(puedeCrearPrograma(aca, 'curso'), true)
  assert.equal(puedeCrearPrograma(aca, 'enfermeria'), false)
})

test('TUM NO SE CONCEDE, ni escribiéndolo a mano en la base de datos', () => {
  // Es el programa insignia de R.E.S.C.A.T.E. La lista guardada no es la
  // autoridad: esta función lo es, y filtra siempre contra TIPOS_CREABLES.
  const aca = { capacidades: { programasPropios: ['tum', 'enfermeria'] } }
  assert.deepEqual(tiposQuePuedeCrear(aca), ['enfermeria'])
  assert.equal(puedeCrearPrograma(aca, 'tum'), false)

  // Ni aunque sea lo único concedido.
  assert.equal(puedeCrearProgramas({ capacidades: { programasPropios: ['tum'] } }), false)
})

test('los tipos creables son exactamente los seis del catálogo, sin TUM', () => {
  assert.deepEqual(TIPOS_CREABLES,
    ['enfermeria', 'tsu', 'licenciatura', 'proteccion_civil', 'curso', 'certificacion'])
  assert.equal(TIPOS_CREABLES.includes('tum'), false)
  // Y no se inventa ninguno: todos salen del catálogo oficial.
  for (const t of TIPOS_CREABLES) {
    assert.ok(TIPOS_PROGRAMA.includes(t), `${t} no está en el catálogo de programas`)
  }
})

test('un tipo inventado no cuela aunque esté en la concesión', () => {
  const aca = { capacidades: { programasPropios: ['magia', 'curso'] } }
  assert.deepEqual(tiposQuePuedeCrear(aca), ['curso'])
  assert.equal(puedeCrearPrograma(aca, 'magia'), false)
})

test('una concesión mal escrita se trata como ninguna, no como todas', () => {
  // El modo de fallo peligroso sería abrir de más. Cualquier cosa que no sea
  // una lista se lee como lista vacía.
  for (const basura of ['todos', true, 42, {}, null, undefined]) {
    assert.deepEqual(tiposQuePuedeCrear({ capacidades: { programasPropios: basura } }), [],
      `«${String(basura)}» no puede interpretarse como acceso total`)
  }
})

test('sin tipo no se puede crear nada', () => {
  const aca = { capacidades: { programasPropios: TIPOS_CREABLES } }
  assert.equal(puedeCrearPrograma(aca, ''), false)
  assert.equal(puedeCrearPrograma(aca, null), false)
  assert.equal(puedeCrearPrograma(aca, undefined), false)
})

test('concedido todo, se puede todo MENOS tum', () => {
  const aca = { capacidades: { programasPropios: TIPOS_PROGRAMA } }
  assert.equal(tiposQuePuedeCrear(aca).length, 6)
  assert.equal(puedeCrearPrograma(aca, 'tum'), false)
  assert.equal(puedeCrearPrograma(aca, 'licenciatura'), true)
})
