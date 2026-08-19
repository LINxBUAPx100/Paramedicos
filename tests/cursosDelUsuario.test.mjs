// ============================================================
//  Pruebas de los cursos del usuario — multi-programa
// ------------------------------------------------------------
//  Lo que se protege: que el aislamiento por programa siga mandando (un alumno
//  de enfermería no ve el TUM), que con un solo curso nada cambie respecto a
//  hoy, y que la elección de curso no pueda servir uno prohibido ni uno a
//  medio clonar.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  cursosDelUsuario, cursoAServir, hayVariosCursos, conteosDeCurso,
} from '../src/lib/cursosDelUsuario.js'

const ESTRUCTURA = [
  { id: 'm1', unidades: [{ id: 'u1', temas: [{ id: 't1' }, { id: 't2' }] }] },
  { id: 'm2', unidades: [{ id: 'u2', temas: [{ id: 't3' }] }] },
]

const CURSOS = [
  { id: 'ACA__tum', titulo: 'Paramédico', tipoPrograma: 'tum', estructura: ESTRUCTURA, clonacion: { completa: true }, orden: 1 },
  { id: 'ACA__enf', titulo: 'Enfermería', tipoPrograma: 'enfermeria', estructura: ESTRUCTURA, clonacion: { completa: true }, orden: 2 },
  { id: 'ACA__tsu', titulo: 'TSU a medias', tipoPrograma: 'tsu', estructura: ESTRUCTURA, clonacion: { completa: false }, orden: 3 },
]

test('conteos: salen de la estructura, sin bajar un solo tema', () => {
  assert.deepEqual(conteosDeCurso(CURSOS[0]), { modulos: 2, temas: 3 })
  assert.deepEqual(conteosDeCurso({}), { modulos: 0, temas: 0 })
  // Estructura antigua, con los temas colgando del módulo.
  assert.deepEqual(conteosDeCurso({ estructura: [{ id: 'm', temas: [{ id: 'a' }, { id: 'b' }] }] }), { modulos: 1, temas: 2 })
})

test('el alumno solo ve los cursos de SU grupo', () => {
  const soloEnfermeria = cursosDelUsuario(CURSOS, { rol: 'alumno', grupo: { programaId: 'ACA__enf' } })
  assert.deepEqual(soloEnfermeria.map((c) => c.id), ['ACA__enf'])

  // Con una especialización añadida al grupo, ve las dos.
  const conExtra = cursosDelUsuario(CURSOS, {
    rol: 'alumno', grupo: { programaId: 'ACA__enf', programasExtra: ['ACA__tum'] },
  })
  assert.deepEqual(conExtra.map((c) => c.id), ['ACA__tum', 'ACA__enf'], 'ordenados por `orden`')

  // Sin grupo no ve nada: es el aislamiento funcionando.
  assert.deepEqual(cursosDelUsuario(CURSOS, { rol: 'alumno', grupo: null }), [])
})

test('el staff ve todos los cursos de la academia (los gestiona)', () => {
  for (const rol of ['instructor', 'admin_escuela']) {
    assert.equal(cursosDelUsuario(CURSOS, { rol }).length, 3, rol)
  }
  assert.equal(cursosDelUsuario(CURSOS, { rol: 'alumno', esSuperadmin: true }).length, 3)
})

test('cada curso llega con su identidad de programa para pintarlo', () => {
  const [tum, enf] = cursosDelUsuario(CURSOS, { rol: 'instructor' })
  assert.equal(tum.etiquetaCorta, 'TUM/TEM')
  assert.equal(enf.etiquetaCorta, 'Enfermería')
  assert.notEqual(tum.color, enf.color)
  assert.ok(tum.icono && enf.icono)
  assert.deepEqual(tum.conteos, { modulos: 2, temas: 3 })
})

test('un tipo de programa desconocido no rompe la tarjeta', () => {
  const raro = cursosDelUsuario([{ id: 'x', titulo: 'X', tipoPrograma: 'brujeria', estructura: [] }], { rol: 'instructor' })
  assert.equal(raro[0].tipoPrograma, 'tum', 'cae al plan que la plataforma sí tiene')
})

test('se sirve el curso elegido, pero jamás uno fuera de alcance', () => {
  const visibles = cursosDelUsuario(CURSOS, { rol: 'alumno', grupo: { programaId: 'ACA__enf' } })
  assert.equal(cursoAServir(visibles, 'ACA__enf'), 'ACA__enf')
  // Pide el TUM, que no es suyo: se le sirve lo que sí puede ver.
  assert.equal(cursoAServir(visibles, 'ACA__tum'), 'ACA__enf')
  assert.equal(cursoAServir(visibles, null), 'ACA__enf')
  assert.equal(cursoAServir([], 'lo-que-sea'), null)
})

test('un curso a medio clonar no se sirve si hay otro completo', () => {
  const staff = cursosDelUsuario(CURSOS, { rol: 'instructor' })
  assert.equal(staff.find((c) => c.id === 'ACA__tsu').listo, false)
  assert.equal(cursoAServir(staff, 'ACA__tsu'), 'ACA__tum', 'salta al primero completo')
  // Si NO hay ninguno completo, se sirve el que haya: mejor eso que nada.
  const soloAMedias = cursosDelUsuario([CURSOS[2]], { rol: 'instructor' })
  assert.equal(cursoAServir(soloAMedias, null), 'ACA__tsu')
})

test('con un solo curso no se ofrece elegir: el Home no cambia', () => {
  assert.equal(hayVariosCursos(cursosDelUsuario([CURSOS[0]], { rol: 'instructor' })), false)
  assert.equal(hayVariosCursos(cursosDelUsuario(CURSOS, { rol: 'instructor' })), true)
  assert.equal(hayVariosCursos([]), false)
  assert.equal(hayVariosCursos(null), false)
})
