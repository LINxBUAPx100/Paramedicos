// ============================================================
//  Pruebas de lib/homeAcademiaModelo.js — módulo puro
// ------------------------------------------------------------
//  Lo que importa aquí es que sea FAIL-OPEN: este bloque se pinta en el Home
//  de todos los miembros de una academia, así que un dato corrupto en
//  Firestore no puede dejarlo en blanco ni reventar el render.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  VARIANTES, DESTINOS, MAX_AVISOS, MAX_ACCESOS,
  homeAcademiaDefault, normalizarHomeAcademia, homeAcademiaDe,
  esHomeAcademiaDefault, alternarAcceso, agregarAviso, editarAviso, quitarAviso,
} from '../src/lib/homeAcademiaModelo.js'

test('el default es la banda de siempre', () => {
  const d = homeAcademiaDefault()
  assert.equal(d.variante, 'banda')
  assert.equal(d.mostrarGrupo, true)
  assert.deepEqual(d.avisos, [])
  assert.deepEqual(d.accesos, [])
  assert.equal(esHomeAcademiaDefault(d), true)
  assert.equal(esHomeAcademiaDefault(null), true)
})

test('fail-open: basura de cualquier forma cae al default sin lanzar', () => {
  for (const basura of [null, undefined, 42, 'texto', [], true, { variante: 'inventada' }]) {
    const c = normalizarHomeAcademia(basura)
    assert.ok(VARIANTES.includes(c.variante), `variante válida para ${JSON.stringify(basura)}`)
    assert.ok(Array.isArray(c.avisos))
    assert.ok(Array.isArray(c.accesos))
  }
})

test('los accesos SOLO admiten rutas del catálogo', () => {
  // El vector que esto cierra: una ruta escrita a mano con javascript: acabaría
  // en el href de un enlace y se ejecutaría en la sesión de cada alumno.
  const c = normalizarHomeAcademia({
    accesos: [
      { ruta: 'javascript:alert(1)', etiqueta: 'Pulsa' },
      { ruta: 'https://evil.example', etiqueta: 'Premio' },
      { ruta: '/admin', etiqueta: 'Panel' },
      { ruta: '/atlas', etiqueta: 'Atlas' },
    ],
  })
  assert.deepEqual(c.accesos.map((a) => a.ruta), ['/atlas'])
})

test('los accesos no se duplican y respetan el tope', () => {
  const c = normalizarHomeAcademia({
    accesos: [...DESTINOS, ...DESTINOS].map((d) => ({ ruta: d.ruta, etiqueta: d.etiqueta })),
  })
  assert.equal(c.accesos.length, MAX_ACCESOS)
  assert.equal(new Set(c.accesos.map((a) => a.ruta)).size, c.accesos.length)
})

test('el icono de un acceso lo pone el catálogo, no el dato guardado', () => {
  const c = normalizarHomeAcademia({ accesos: [{ ruta: '/atlas', etiqueta: 'X', icono: 'basura' }] })
  assert.equal(c.accesos[0].icono, 'atlas')
})

test('los avisos vacíos se descartan y se respeta el tope', () => {
  const c = normalizarHomeAcademia({
    avisos: [
      { titulo: '', texto: '' },
      { titulo: 'Uno', texto: 'a' },
      { titulo: 'Dos', texto: 'b' },
      { titulo: 'Tres', texto: 'c' },
      { titulo: 'Cuatro', texto: 'd' },
    ],
  })
  assert.equal(c.avisos.length, MAX_AVISOS)
  assert.deepEqual(c.avisos.map((a) => a.titulo), ['Uno', 'Dos', 'Tres'])
})

test('los textos se recortan y el color debe ser hex de 6', () => {
  const c = normalizarHomeAcademia({
    titulo: 'x'.repeat(500),
    mensaje: 'y'.repeat(500),
    colorAcento: 'rojo',
  })
  assert.equal(c.titulo.length, 80)
  assert.equal(c.mensaje.length, 200)
  assert.equal(c.colorAcento, '')
  assert.equal(normalizarHomeAcademia({ colorAcento: '#0c5fc4' }).colorAcento, '#0c5fc4')
})

test('mostrarGrupo solo se apaga con false explícito', () => {
  assert.equal(normalizarHomeAcademia({ mostrarGrupo: false }).mostrarGrupo, false)
  for (const v of [undefined, null, 0, '', 'no', 1]) {
    assert.equal(normalizarHomeAcademia({ mostrarGrupo: v }).mostrarGrupo, true)
  }
})

test('homeAcademiaDe rellena huecos con lo que la academia ya tenía', () => {
  const aca = { id: 'AEP-2026', nombre: 'Academia X', lema: 'Formamos TUM', colorHero: '#123456', logo: 'L' }
  const c = homeAcademiaDe(aca)
  assert.equal(c.titulo, 'Academia X')
  assert.equal(c.mensaje, 'Formamos TUM')
  assert.equal(c.colorAcento, '#123456')
  assert.equal(c.logo, 'L')
  // Y lo configurado gana sobre el relleno.
  const d = homeAcademiaDe({ ...aca, homeAcademia: { titulo: 'Propio', mensaje: 'Mío' } })
  assert.equal(d.titulo, 'Propio')
  assert.equal(d.mensaje, 'Mío')
})

test('homeAcademiaDe no revienta sin academia', () => {
  const c = homeAcademiaDe(null)
  assert.equal(c.variante, 'banda')
  assert.equal(c.titulo, '')
})

test('alternarAcceso añade, quita y respeta el tope', () => {
  let c = homeAcademiaDefault()
  c = alternarAcceso(c, '/atlas')
  assert.deepEqual(c.accesos.map((a) => a.ruta), ['/atlas'])
  c = alternarAcceso(c, '/atlas')
  assert.deepEqual(c.accesos, [])
  for (const d of DESTINOS) c = alternarAcceso(c, d.ruta)
  assert.equal(c.accesos.length, MAX_ACCESOS)
  // Una ruta fuera del catálogo no entra ni por aquí.
  const antes = c.accesos.length
  c = alternarAcceso(c, '/admin')
  assert.equal(c.accesos.length, antes)
})

test('los avisos se editan sin perderse mientras están vacíos', () => {
  // Al añadir uno nuevo está vacío; si la normalización lo descartara en cada
  // tecla, sería imposible escribirlo.
  let c = agregarAviso(homeAcademiaDefault())
  assert.equal(c.avisos.length, 1)
  c = editarAviso(c, 0, { titulo: 'Aviso' })
  assert.equal(c.avisos[0].titulo, 'Aviso')
  c = quitarAviso(c, 0)
  assert.equal(c.avisos.length, 0)
})
