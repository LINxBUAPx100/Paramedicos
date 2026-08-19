// ============================================================
//  Pruebas de la navegación de la consola (contexto plataforma / academia)
// ------------------------------------------------------------
//  Lo que se protege: que ninguna conexión interna quede rota. Un enlace del
//  riel que apunte a una ruta que nadie declara no falla el build ni ninguna
//  prueba de la app: deja al super-admin en un 404. Aquí se comprueba que el
//  contexto se lee bien de la URL, que las rutas se construyen en un solo sitio
//  y que cambiar de academia no te devuelve al principio.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  SECCIONES_PLATAFORMA, SECCIONES_ACADEMIA, RAIZ_ADMIN,
  rutaDeAcademia, seccionesDeAdmin, contextoDeRuta, rutaAlCambiarAcademia,
  resumenDeAcademia,
} from '../src/lib/adminModelo.js'

test('los dos catálogos están completos y sin ids repetidos', () => {
  for (const catalogo of [SECCIONES_PLATAFORMA, SECCIONES_ACADEMIA]) {
    const ids = catalogo.map((s) => s.id)
    assert.equal(new Set(ids).size, ids.length, `ids repetidos: ${ids.join(', ')}`)
    for (const s of catalogo) {
      assert.ok(s.etiqueta, `${s.id} sin etiqueta`)
      assert.ok(s.icono, `${s.id} sin icono`)
    }
  }
  // El resumen existe en los dos: es el destino al que siempre se puede caer.
  assert.ok(SECCIONES_PLATAFORMA.some((s) => s.id === 'resumen'))
  assert.ok(SECCIONES_ACADEMIA.some((s) => s.id === 'resumen'))
})

test('las rutas de academia se construyen en un solo sitio', () => {
  assert.equal(rutaDeAcademia('RES-2026'), '/admin/aca/RES-2026')
  assert.equal(rutaDeAcademia('RES-2026', 'grupos'), '/admin/aca/RES-2026/grupos')
  assert.equal(rutaDeAcademia('RES-2026', '/grupos/'), '/admin/aca/RES-2026/grupos')
  // Un código con caracteres raros no puede romper la URL.
  assert.equal(rutaDeAcademia('A B/C'), '/admin/aca/A%20B%2FC')
  // Sin academia no se inventa una ruta a medias.
  assert.equal(rutaDeAcademia(''), RAIZ_ADMIN)
  assert.equal(rutaDeAcademia(null), RAIZ_ADMIN)
})

test('el riel es el del contexto en el que estás', () => {
  assert.deepEqual(seccionesDeAdmin(null), SECCIONES_PLATAFORMA)
  const deAcademia = seccionesDeAdmin('RES-2026')
  assert.equal(deAcademia.length, SECCIONES_ACADEMIA.length)
  for (const s of deAcademia) {
    assert.match(s.ruta, /^\/admin\/aca\/RES-2026/, `${s.id} → ${s.ruta}`)
  }
  assert.equal(deAcademia.find((s) => s.id === 'resumen').ruta, '/admin/aca/RES-2026')
  assert.equal(deAcademia.find((s) => s.id === 'alumnos').ruta, '/admin/aca/RES-2026/alumnos')
})

test('el contexto se lee de la URL, que es la fuente de verdad', () => {
  assert.deepEqual(contextoDeRuta('/admin'), { academiaId: null, seccion: 'resumen' })
  assert.deepEqual(contextoDeRuta('/admin/usuarios'), { academiaId: null, seccion: 'usuarios' })
  assert.deepEqual(contextoDeRuta('/admin/aca/RES-2026'), { academiaId: 'RES-2026', seccion: 'resumen' })
  assert.deepEqual(contextoDeRuta('/admin/aca/RES-2026/grupos'), { academiaId: 'RES-2026', seccion: 'grupos' })
  // Sección desconocida dentro de una academia: se sabe la academia, no la sección.
  assert.deepEqual(contextoDeRuta('/admin/aca/RES-2026/inventada'), { academiaId: 'RES-2026', seccion: null })
  // Y un código con escape se devuelve descodificado, listo para usar.
  assert.equal(contextoDeRuta('/admin/aca/A%20B/grupos').academiaId, 'A B')
  assert.equal(contextoDeRuta('').academiaId, null)
})

test('cambiar de academia CONSERVA la sección en la que estabas', () => {
  assert.equal(
    rutaAlCambiarAcademia('/admin/aca/RES-2026/grupos', 'OTRA-2027'),
    '/admin/aca/OTRA-2027/grupos',
    'si mirabas grupos, quieres los grupos de la otra, no su resumen',
  )
  assert.equal(rutaAlCambiarAcademia('/admin/aca/RES-2026', 'OTRA-2027'), '/admin/aca/OTRA-2027')
  // Desde una sección que solo existe en la plataforma, se cae al resumen.
  assert.equal(rutaAlCambiarAcademia('/admin/facturacion', 'OTRA-2027'), '/admin/aca/OTRA-2027')
  // Y volver a «toda la plataforma» es volver al resumen general.
  assert.equal(rutaAlCambiarAcademia('/admin/aca/RES-2026/grupos', null), RAIZ_ADMIN)
})

test('el resumen de una academia cuenta solo lo suyo y no lo eliminado', () => {
  const usuarios = [
    { academiaId: 'A', rol: 'alumno', estado: 'activo' },
    { academiaId: 'A', rol: 'alumno', estado: 'eliminado' },
    { academiaId: 'A', rol: 'instructor', estado: 'activo' },
    { academiaId: 'A', rol: 'admin_escuela', estado: 'activo' },
    { academiaId: 'B', rol: 'alumno', estado: 'activo' },
  ]
  const intentos = [{ academiaId: 'A' }, { academiaId: 'B' }, { academiaId: 'B' }]

  const a = resumenDeAcademia({ id: 'A', nombre: 'Academia A', planComercial: 'pro' }, { usuarios, intentos })
  assert.equal(a.alumnos, 1, 'el eliminado no cuenta')
  assert.equal(a.staff, 2)
  assert.equal(a.intentos, 1)
  assert.equal(a.sinActividad, false)
  assert.equal(a.plan, 'pro')

  const c = resumenDeAcademia({ id: 'C' }, { usuarios, intentos })
  assert.equal(c.alumnos, 0)
  assert.equal(c.sinActividad, true, 'una academia sin exámenes es lo primero que hay que ver')
  assert.equal(c.nombre, 'C', 'sin nombre, se muestra su código')
})
