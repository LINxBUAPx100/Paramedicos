// ============================================================
//  Banco elegible de examen — solo material AVALADO
// ------------------------------------------------------------
//  Hallazgo de la segunda auditoría: la pantalla decía usar material aprobado
//  y filtraba con `muestraContenido`, que también deja pasar `borrador` y
//  `en_revision`. Estas pruebas fijan la regla correcta y, sobre todo, fijan
//  que NO se puede activar un examen ascendiendo temas: un tema solo entra si
//  alguien lo validó.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  bancoDeExamen, temasElegibles, motivoExamenInactivo, temasEsperandoValidacion,
} from '../src/lib/bancoExamen.js'
import { todosLosTemas } from '../src/data/index.js'
import { estadoEditorialDe, estaAvalado } from '../src/lib/estadoEditorial.js'

const pregunta = { pregunta: '¿?', opciones: ['a', 'b'], correcta: 0, explicacion: 'x' }

// Un tema mínimo con material real y ficha declarada.
function tema(id, estado) {
  return {
    id,
    titulo: id,
    estadoEditorial: estado,
    secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'contenido' }] }],
    quiz: [pregunta, { ...pregunta }],
  }
}

test('un quiz de un tema en BORRADOR no entra al banco', () => {
  const banco = bancoDeExamen([tema('t-borrador', 'borrador')])
  assert.deepEqual(banco, [])
})

test('un quiz de un tema EN REVISIÓN no entra al banco', () => {
  const banco = bancoDeExamen([tema('t-revision', 'en_revision')])
  assert.deepEqual(banco, [])
})

test('un quiz de un tema VALIDADO sí puede entrar', () => {
  const banco = bancoDeExamen([tema('t-validado', 'validado')])
  assert.equal(banco.length, 2)
  assert.equal(banco[0].temaId, 't-validado')
  assert.equal(banco[0].id, 't-validado-0')
})

test('un quiz de un tema PUBLICADO sí puede entrar', () => {
  assert.equal(bancoDeExamen([tema('t-publicado', 'publicado')]).length, 2)
})

test('el bloqueado y el vacío tampoco entran, aunque declaren material', () => {
  assert.deepEqual(bancoDeExamen([tema('t-bloq', 'bloqueado_por_decision')]), [])
  assert.deepEqual(bancoDeExamen([{ id: 't-vacio', quiz: [] }]), [])
})

test('un tema oculto para el grupo no aporta reactivos aunque esté validado', () => {
  const banco = bancoDeExamen([tema('t-oculto', 'validado')], { temaVisible: () => false })
  assert.deepEqual(banco, [])
})

test('el filtro mezcla ambas condiciones: visible Y avalado', () => {
  const lista = [tema('a', 'validado'), tema('b', 'en_revision'), tema('c', 'publicado')]
  const elegibles = temasElegibles(lista, { temaVisible: (id) => id !== 'c' })
  assert.deepEqual(elegibles.map((t) => t.id), ['a'])
})

test('un examen sin preguntas aprobadas se desactiva y distingue el motivo', () => {
  // Nada escrito todavía.
  const sinMaterial = motivoExamenInactivo([{ id: 'x', quiz: [] }])
  assert.equal(sinMaterial.clave, 'sin-material')
  assert.match(sinMaterial.texto, /todavía no tienen preguntas redactadas/)

  // Escrito pero sin validar: el mensaje NO puede decir que no hay nada.
  const sinValidar = motivoExamenInactivo([tema('y', 'en_revision')])
  assert.equal(sinValidar.clave, 'sin-validar')
  assert.match(sinValidar.texto, /ninguna ha sido validada/)
  assert.doesNotMatch(sinValidar.texto, /no tienen preguntas redactadas/)

  // Con material aprobado, no hay motivo de bloqueo.
  assert.equal(motivoExamenInactivo([tema('z', 'validado')]), null)
})

test('se puede contar cuántos temas del alcance esperan validación', () => {
  const lista = [tema('a', 'borrador'), tema('b', 'en_revision'), tema('c', 'validado')]
  assert.deepEqual(temasEsperandoValidacion(lista).map((t) => t.id), ['a', 'b'])
})

// ---------- sobre el temario REAL ----------

test('hoy ningún examen del plan tiene banco, porque no hay temas validados', () => {
  const porId = new Map(todosLosTemas.map((t) => [t.id, t]))
  const avalados = todosLosTemas.filter((t) => estaAvalado(estadoEditorialDe(t)))
  assert.deepEqual(avalados.map((t) => t.id), [], 'Nadie debe haber ascendido temas a validado.')

  for (const examen of todosLosTemas.filter((t) => t.alcanceExamen)) {
    const alcance = examen.alcanceExamen.temas.map((id) => porId.get(id))
    assert.deepEqual(
      bancoDeExamen(alcance), [],
      `${examen.id} tiene banco sin que ningún tema esté validado.`
    )
    // Y el motivo tiene que ser el honesto: hay material esperando revisión.
    const motivo = motivoExamenInactivo(alcance)
    assert.ok(motivo, `${examen.id} debería estar desactivado.`)
  }
})

test('los exámenes cuyo alcance ya tiene lecciones redactadas lo dicen así', () => {
  const porId = new Map(todosLosTemas.map((t) => [t.id, t]))
  const m1 = todosLosTemas.find((t) => t.id === 'm1-examen-aplicacion')
  const alcance = m1.alcanceExamen.temas.map((id) => porId.get(id))
  assert.ok(temasEsperandoValidacion(alcance).length > 0)
  assert.equal(motivoExamenInactivo(alcance).clave, 'sin-validar')
})
