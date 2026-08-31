// ============================================================
//  Pruebas del orden y los filtros de las listas de usuarios
// ------------------------------------------------------------
//  Reportado el 30 de agosto de 2026: «las listas de usuarios están
//  desordenadas, quiero que estén bien ordenadas y con opciones de filtro».
//
//  Lo que se protege aquí es el español: mayúsculas, acentos y números. Una
//  comparación byte a byte pone «Ximena» antes que «alexis» y «Díaz» después
//  de «Duarte», y las dos cosas hacen que no se encuentre a nadie.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  claveDeOrden, ordenarUsuarios, filtrarUsuarios, prepararLista,
  opcionesDeRol, opcionesDeEstado, hayFiltro, ORDENES, ORDEN_DEFECTO, FILTRO_VACIO,
} from '../src/lib/listaUsuarios.js'

const nombres = (lista) => lista.map((u) => u.nombre || u.email)

// ---------- orden ----------

test('las mayúsculas no mandan a nadie al final de la lista', () => {
  const lista = [
    { nombre: 'Ximena' }, { nombre: 'alexis' }, { nombre: 'Angel' },
    { nombre: 'PROFESOR' }, { nombre: 'chatgpt' },
  ]
  assert.deepEqual(nombres(ordenarUsuarios(lista)),
    ['alexis', 'Angel', 'chatgpt', 'PROFESOR', 'Ximena'])
})

test('los acentos ordenan como su letra sin acento', () => {
  const lista = [{ nombre: 'Duarte' }, { nombre: 'Díaz' }, { nombre: 'Dávila' }]
  assert.deepEqual(nombres(ordenarUsuarios(lista)), ['Dávila', 'Díaz', 'Duarte'])
})

test('los números ordenan como números, no como texto', () => {
  const lista = [{ nombre: 'Grupo 10' }, { nombre: 'Grupo 2' }, { nombre: 'Grupo 1' }]
  assert.deepEqual(nombres(ordenarUsuarios(lista)), ['Grupo 1', 'Grupo 2', 'Grupo 10'])
})

test('quien no tiene nombre se ordena por su correo', () => {
  assert.equal(claveDeOrden({ email: 'zoe@x.com' }), 'zoe@x.com')
  // Un «nombre» que es su propio correo no aporta nada.
  assert.equal(claveDeOrden({ nombre: 'ana@x.com', email: 'ana@x.com' }), 'ana@x.com')
  assert.equal(claveDeOrden({ nombre: 'Ana', email: 'z@x.com' }), 'Ana')
  assert.equal(claveDeOrden({ id: 'uid-1' }), 'uid-1')
})

test('ordenar NO muta la lista que recibe', () => {
  const lista = [{ nombre: 'B' }, { nombre: 'A' }]
  const copia = [...lista]
  ordenarUsuarios(lista)
  assert.deepEqual(lista, copia)
})

test('por rol: quien gestiona arriba, y a igual rol por nombre', () => {
  const lista = [
    { nombre: 'Zoe', rol: 'alumno' },
    { nombre: 'Ana', rol: 'alumno' },
    { nombre: 'Beto', rol: 'admin_escuela' },
    { nombre: 'Caro', rol: 'instructor' },
  ]
  assert.deepEqual(nombres(ordenarUsuarios(lista, 'rol')), ['Beto', 'Caro', 'Ana', 'Zoe'])
})

test('por estado: activas primero, bajas al final', () => {
  const lista = [
    { nombre: 'C', estado: 'eliminado' },
    { nombre: 'A', estado: 'suspendido' },
    { nombre: 'B' },
  ]
  assert.deepEqual(nombres(ordenarUsuarios(lista, 'estado')), ['B', 'A', 'C'])
})

test('por grupo: quien no tiene grupo va al final, no enterrado en medio', () => {
  const lista = [
    { nombre: 'A', grupoId: null },
    { nombre: 'B', grupoId: 'g2' },
    { nombre: 'C', grupoId: 'g1' },
  ]
  const nombreDeGrupo = (id) => ({ g1: 'Matutino', g2: 'Vespertino' }[id])
  assert.deepEqual(nombres(ordenarUsuarios(lista, 'grupo', { nombreDeGrupo })),
    ['C', 'B', 'A'])
})

test('un criterio desconocido cae en el orden por nombre', () => {
  const lista = [{ nombre: 'B' }, { nombre: 'A' }]
  assert.deepEqual(nombres(ordenarUsuarios(lista, 'inventado')), ['A', 'B'])
  assert.equal(ORDEN_DEFECTO, 'nombre')
  assert.ok(ORDENES.some((o) => o.id === ORDEN_DEFECTO))
})

test('ordenar aguanta nulos y listas vacías', () => {
  assert.deepEqual(ordenarUsuarios(null), [])
  assert.deepEqual(ordenarUsuarios([null, undefined]), [])
})

// ---------- filtros ----------

test('el texto busca sin acentos y sin distinguir mayúsculas', () => {
  const lista = [{ nombre: 'Díaz Pacheco' }, { nombre: 'Ximena' }]
  assert.equal(filtrarUsuarios(lista, { texto: 'diaz' }).length, 1)
  assert.equal(filtrarUsuarios(lista, { texto: 'DÍAZ' }).length, 1)
  assert.equal(filtrarUsuarios(lista, { texto: 'XIMENA' }).length, 1)
})

test('el texto entra en correo, academia, rol y grupo', () => {
  const lista = [{ nombre: 'Ana', email: 'a@x.com', academiaId: 'RES-2026', rol: 'instructor', grupoId: 'g1' }]
  const opciones = { nombreDeGrupo: () => 'Sabatino' }
  for (const q of ['a@x', 'RES-2026', 'Profesor', 'sabatino']) {
    assert.equal(filtrarUsuarios(lista, { texto: q }, opciones).length, 1, `no encontró con «${q}»`)
  }
})

test('los filtros se ACUMULAN', () => {
  const lista = [
    { nombre: 'A', rol: 'instructor' },
    { nombre: 'B', rol: 'instructor', estado: 'suspendido' },
    { nombre: 'C', rol: 'alumno' },
  ]
  assert.deepEqual(nombres(filtrarUsuarios(lista, { rol: 'instructor' })), ['A', 'B'])
  assert.deepEqual(nombres(filtrarUsuarios(lista, { rol: 'instructor', estado: 'activo' })), ['A'])
})

test('se puede filtrar por «sin grupo» y «sin academia»', () => {
  const lista = [
    { nombre: 'A', grupoId: 'g1', academiaId: 'RES' },
    { nombre: 'B', grupoId: null, academiaId: null },
  ]
  assert.deepEqual(nombres(filtrarUsuarios(lista, { grupoId: '__sin__' })), ['B'])
  assert.deepEqual(nombres(filtrarUsuarios(lista, { academiaId: '__sin__' })), ['B'])
  assert.deepEqual(nombres(filtrarUsuarios(lista, { grupoId: 'g1' })), ['A'])
})

test('sin filtro no se descarta a nadie', () => {
  const lista = [{ nombre: 'A' }, { nombre: 'B' }]
  assert.equal(filtrarUsuarios(lista, FILTRO_VACIO).length, 2)
  assert.equal(filtrarUsuarios(lista, {}).length, 2)
  assert.equal(hayFiltro(FILTRO_VACIO), false)
  assert.equal(hayFiltro({ rol: 'alumno' }), true)
  assert.equal(hayFiltro({ texto: '   ' }), false)
})

// ---------- desplegables ----------

test('los desplegables solo ofrecen lo que de verdad está en la lista', () => {
  const lista = [
    { rol: 'alumno' }, { rol: 'alumno', estado: 'suspendido' }, { rol: 'instructor' },
  ]
  assert.deepEqual(opcionesDeRol(lista).map((o) => o.id), ['alumno', 'instructor'])
  assert.deepEqual(opcionesDeRol(lista).map((o) => o.etiqueta), ['Alumno', 'Profesor'])
  assert.deepEqual(opcionesDeEstado(lista).map((o) => o.id), ['activo', 'suspendido'])
  // Nadie dado de baja ⇒ no se ofrece ese filtro.
  assert.equal(opcionesDeEstado(lista).some((o) => o.id === 'eliminado'), false)
})

test('prepararLista filtra y ordena de una pasada', () => {
  const lista = [
    { nombre: 'Zoe', rol: 'alumno' },
    { nombre: 'ana', rol: 'alumno' },
    { nombre: 'Beto', rol: 'instructor' },
  ]
  assert.deepEqual(nombres(prepararLista(lista, { rol: 'alumno' }, 'nombre')), ['ana', 'Zoe'])
})
