import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
  CATEGORIAS_BOTIQUIN,
  COMPARTIMENTOS_BOTIQUIN,
  cantidadTotalArticulo,
  etiquetaCantidadArticulo,
  filtrarCatalogoBotiquin,
  problemasDelCatalogoBotiquin,
} from '../src/lib/botiquinModelo.js'
import {
  accesoDeArticulo,
  estadosDelCatalogo,
  resumenDeEstados,
} from '../src/lib/botiquinEstados.js'
import {
  CATALOGO_BOTIQUIN_INICIAL,
  VERSION_CATALOGO_BOTIQUIN,
  catalogoBotiquinInicial,
} from '../src/data/botiquin/catalogoInicial.js'

test('el catálogo inicial es ampliable, válido y conserva las cantidades confirmadas', () => {
  const catalogo = catalogoBotiquinInicial()
  assert.equal(VERSION_CATALOGO_BOTIQUIN, 1)
  assert.ok(catalogo.length >= 35)
  assert.equal(problemasDelCatalogoBotiquin(catalogo).length, 0)
  assert.equal(new Set(catalogo.map((item) => item.id)).size, catalogo.length)
  assert.equal(COMPARTIMENTOS_BOTIQUIN.length, 8)
  assert.ok(CATEGORIAS_BOTIQUIN.includes('familia'))

  const gasas = catalogo.find((item) => item.id === 'gasa-esteril-10x10')
  const vendas = catalogo.find((item) => item.id === 'vendas-elasticas')
  const cateteres = catalogo.find((item) => item.id === 'cateteres-venosos-perifericos')
  assert.equal(cantidadTotalArticulo(gasas), 10)
  assert.equal(cantidadTotalArticulo(vendas), 6)
  assert.equal(etiquetaCantidadArticulo(vendas), '6 rollos')
  assert.equal(cantidadTotalArticulo(cateteres), null)
  assert.equal(etiquetaCantidadArticulo(cateteres), 'Cantidad por confirmar')
})

test('el catálogo no incluye una segunda versión de la enseñanza clínica', () => {
  const prohibidas = new Set(['dosis', 'indicaciones', 'contraindicaciones', 'tecnica', 'procedimiento'])
  for (const articulo of CATALOGO_BOTIQUIN_INICIAL) {
    for (const clave of Object.keys(articulo)) {
      assert.equal(prohibidas.has(clave), false, `${articulo.id} contiene el campo clínico ${clave}`)
    }
    assert.ok(articulo.resumen.length > 10)
    assert.ok(Array.isArray(articulo.comoSeRevisa))
  }
})

test('la búsqueda reconoce alias, calibres y medidas', () => {
  const catalogo = catalogoBotiquinInicial()
  assert.deepEqual(
    filtrarCatalogoBotiquin(catalogo, { consulta: 'ambu' }).map((item) => item.id),
    ['bvm'],
  )
  assert.deepEqual(
    filtrarCatalogoBotiquin(catalogo, { consulta: '14g' }).map((item) => item.id),
    ['cateteres-venosos-perifericos'],
  )
  assert.ok(filtrarCatalogoBotiquin(catalogo, { compartimento: 'viaAerea' }).length >= 4)
})

test('el alumno desbloquea con su progreso y el instructor puede revisar todo', () => {
  const catalogo = catalogoBotiquinInicial()
  const torniquete = catalogo.find((item) => item.id === 'torniquete-control-hemorragia')
  const bloqueado = accesoDeArticulo(torniquete, { leidos: {} })
  assert.equal(bloqueado.desbloqueado, false)

  const sinFirma = accesoDeArticulo(torniquete, {
    leidos: { 'm1-pab-hemorragias': true },
    validaciones: {},
  })
  assert.equal(sinFirma.estado, 'silueta')
  assert.equal(sinFirma.muestraFicha, false)

  const instructor = accesoDeArticulo(torniquete, { vistaInstructor: true })
  assert.equal(instructor.estado, 'disponible')
  assert.equal(instructor.muestraFicha, true)

  const estados = estadosDelCatalogo(catalogo, { vistaInstructor: true })
  const resumen = resumenDeEstados(estados)
  assert.equal(resumen.total, catalogo.length)
  assert.equal(resumen.disponible, catalogo.length)
})

test('ruta, menú y superficie inmersiva quedan cableados', async () => {
  const [app, layout, page] = await Promise.all([
    readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Layout.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/BotiquinPage.jsx', import.meta.url), 'utf8'),
  ])
  assert.match(app, /BotiquinPage/)
  assert.match(app, /path="\/botiquin"/)
  assert.match(layout, /to: '\/botiquin'/)
  assert.match(layout, /Mi Botiquín 3D/)
  assert.match(layout, /startsWith\('\/botiquin'\)/)
  assert.match(page, /La ficha identifica; la lección enseña/)
})

test('los módulos React del botiquín tienen JSX válido', async () => {
  const { transformWithEsbuild } = await import('vite')
  const files = [
    '../src/pages/BotiquinPage.jsx',
    '../src/features/botiquin3d/BotiquinScene.jsx',
  ]
  for (const relativePath of files) {
    const url = new URL(relativePath, import.meta.url)
    const source = await readFile(url, 'utf8')
    await transformWithEsbuild(source, url.pathname, {
      loader: 'jsx',
      jsx: 'automatic',
      target: 'es2022',
    })
  }
})
