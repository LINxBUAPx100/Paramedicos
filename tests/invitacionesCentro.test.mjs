// ============================================================
//  Pruebas del centro de invitaciones — generaciones y quién emite
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  normalizarGeneracion, etiquetaGeneracion, claveGeneracion, agruparPorGeneracion,
  rolesQuePuedeInvitar, puedeInvitarRol, puedeCrearCodigoPrueba, filtroDeInvitaciones,
} from '../src/lib/invitacionesCentro.js'

// ---------- generaciones ----------

test('la generación solo acepta número y año razonables', () => {
  assert.deepEqual(normalizarGeneracion({ numero: 1, anio: 2026 }), { numero: 1, anio: 2026 })
  assert.deepEqual(normalizarGeneracion({ numero: '3', anio: '2027' }), { numero: 3, anio: 2027 })
  for (const basura of [null, undefined, 'gen 1', 42, {}, { numero: 0, anio: 2026 },
    { numero: 100, anio: 2026 }, { numero: 1, anio: 1800 }, { numero: 1.5, anio: 2026 }]) {
    assert.equal(normalizarGeneracion(basura), null, JSON.stringify(basura))
  }
})

test('un grupo SIN generación sigue siendo válido: los que ya existen no la tienen', () => {
  assert.equal(etiquetaGeneracion(null), 'Sin generación')
  assert.equal(claveGeneracion(null), 'sin')
  assert.equal(etiquetaGeneracion({ numero: 2, anio: 2026 }), 'Generación 2 · 2026')
})

test('la clave ordena bien aunque el número tenga una cifra', () => {
  assert.equal(claveGeneracion({ numero: 2, anio: 2026 }), '2026-02')
  const claves = [
    claveGeneracion({ numero: 10, anio: 2026 }),
    claveGeneracion({ numero: 2, anio: 2026 }),
  ].sort()
  assert.deepEqual(claves, ['2026-02', '2026-10'], 'el 2 antes que el 10, no al revés')
})

test('los grupos se agrupan por generación, de la más reciente a la más antigua', () => {
  const grupos = [
    { id: 'A', generacion: { numero: 1, anio: 2026 } },
    { id: 'B', generacion: null },
    { id: 'C', generacion: { numero: 2, anio: 2026 } },
    { id: 'D', generacion: { numero: 3, anio: 2025 } },
    { id: 'E', generacion: { numero: 1, anio: 2026 } },
  ]
  const bloques = agruparPorGeneracion(grupos)
  assert.deepEqual(bloques.map((b) => b.etiqueta), [
    'Generación 2 · 2026', 'Generación 1 · 2026', 'Generación 3 · 2025', 'Sin generación',
  ])
  assert.deepEqual(bloques[1].grupos.map((g) => g.id), ['A', 'E'], 'los de la misma generación, juntos')
  assert.deepEqual(agruparPorGeneracion([]), [])
  assert.deepEqual(agruparPorGeneracion(null), [])
})

// ---------- quién emite ----------

test('el director y el super-admin reparten cualquier rol', () => {
  for (const quien of [{ rol: 'admin_escuela' }, { rol: 'alumno', esSuperadmin: true }]) {
    assert.deepEqual(rolesQuePuedeInvitar(quien), ['alumno', 'instructor', 'admin_escuela'])
    assert.ok(puedeCrearCodigoPrueba(quien))
  }
})

test('el profesor CON permiso invita alumnos, y solo alumnos', () => {
  const profe = { rol: 'instructor', puedeVerCodigos: true }
  assert.deepEqual(rolesQuePuedeInvitar(profe), ['alumno'])
  assert.ok(puedeInvitarRol(profe, 'alumno'))
  // Repartir el rol de profesor o de director sigue siendo del director: una
  // invitación de 'admin_escuela' entrega la academia entera.
  assert.ok(!puedeInvitarRol(profe, 'instructor'))
  assert.ok(!puedeInvitarRol(profe, 'admin_escuela'))
  // Y los códigos de prueba no: dan acceso sin inscribir a nadie.
  assert.ok(!puedeCrearCodigoPrueba(profe))
})

test('el profesor SIN permiso no emite nada', () => {
  const profe = { rol: 'instructor', puedeVerCodigos: false }
  assert.deepEqual(rolesQuePuedeInvitar(profe), [])
  assert.ok(!puedeInvitarRol(profe, 'alumno'))
  assert.deepEqual(rolesQuePuedeInvitar({ rol: 'alumno' }), [])
})

test('el profesor solo puede LISTAR las invitaciones que él emitió', () => {
  const academia = 'ACA-A'
  assert.deepEqual(filtroDeInvitaciones({ rol: 'admin_escuela' }, academia), { academiaId: academia })
  assert.deepEqual(
    filtroDeInvitaciones({ rol: 'instructor', puedeVerCodigos: true, uid: 'p1' }, academia),
    { academiaId: academia, creadoPor: 'p1' },
    'la lista completa incluye las de director: copiar ese enlace es repartir la academia',
  )
  assert.equal(filtroDeInvitaciones({ rol: 'instructor' }, academia), null)
  assert.equal(filtroDeInvitaciones({ rol: 'alumno' }, academia), null)
})
