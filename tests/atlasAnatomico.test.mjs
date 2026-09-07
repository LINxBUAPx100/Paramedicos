import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
  DEFAULT_VISIBLE,
  nombreEstructura,
  terminosEstructura,
} from '../src/features/anatomy3d/anatomyData.js'
import {
  ATLAS_MODEL_BASE,
  ATLAS_SOURCE_COMMIT,
  THREE_MODULE_URL,
  resolveModelUrl,
} from '../src/features/anatomy3d/atlasSource.js'
import { createExplosionLayout } from '../src/features/anatomy3d/explosionLayout.js'
import { PointerTap } from '../src/features/anatomy3d/pointerTap.js'

test('el atlas fija versiones y solo acepta nombres de modelo seguros', () => {
  assert.match(ATLAS_SOURCE_COMMIT, /^[a-f0-9]{40}$/)
  assert.match(ATLAS_MODEL_BASE, new RegExp(ATLAS_SOURCE_COMMIT))
  assert.match(THREE_MODULE_URL, /three@0\.159\.0/)
  assert.equal(
    resolveModelUrl('/models/body-0.bin.gz'),
    `${ATLAS_MODEL_BASE}/body-0.bin.gz`,
  )
  assert.throws(() => resolveModelUrl('/models/body-0.bin?raw=1'), /ruta de modelo inválida/)
})

test('la capa española conserva el nombre fuente y permite buscar sin acentos', () => {
  assert.equal(nombreEstructura('heart'), 'Corazón')
  assert.equal(nombreEstructura('urinary bladder'), 'Vejiga urinaria')
  assert.equal(nombreEstructura('unknown source name'), 'unknown source name')
  assert.match(
    terminosEstructura({ id: 'heart', name: 'heart' }),
    /corazon/,
  )
  assert.ok(DEFAULT_VISIBLE.includes('skeletal'))
  assert.ok(!DEFAULT_VISIBLE.includes('integumentary'))
})

test('la distribución explotada asigna una celda independiente a cada pieza', () => {
  const parts = [
    { id: 'a', bounds: [[0, 0, 0], [1, 1, 1]] },
    { id: 'b', bounds: [[0, 0, 0], [0.5, 0.7, 0.5]] },
    { id: 'c', bounds: [[0, 0, 0], [0.8, 0.3, 0.5]] },
  ]
  const layout = createExplosionLayout(parts, 1.4)
  assert.equal(layout.cells.size, parts.length)
  assert.ok(layout.width > 0)
  assert.ok(layout.height > 0)

  const cells = [...layout.cells.values()]
  for (let i = 0; i < cells.length; i += 1) {
    for (let j = i + 1; j < cells.length; j += 1) {
      const a = cells[i]
      const b = cells[j]
      const overlapX = Math.abs(a.x - b.x) < (a.width + b.width) / 2
      const overlapY = Math.abs(a.y - b.y) < (a.height + b.height) / 2
      assert.equal(overlapX && overlapY, false)
    }
  }
})

test('un arrastre no se interpreta como selección anatómica', () => {
  const tap = new PointerTap()
  tap.down(1, 10, 10, 5)
  tap.move(1, 20, 10)
  assert.equal(tap.up(1, 20, 10), false)

  tap.down(2, 10, 10, 5)
  assert.equal(tap.up(2, 11, 11), true)
})

test('ruta, navegación y CSP quedan cableadas en PTEM', async () => {
  const [app, layout, vite, page] = await Promise.all([
    readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Layout.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../vite.config.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/AtlasAnatomicoPage.jsx', import.meta.url), 'utf8'),
  ])

  assert.match(app, /AtlasAnatomicoPage/)
  assert.match(app, /path="\/atlas-anatomico"/)
  assert.match(layout, /to: '\/atlas-anatomico'/)
  assert.match(layout, /contenido--atlas/)
  assert.match(vite, /const scriptAtlas = ' https:\/\/cdn\.jsdelivr\.net'/)
  assert.match(vite, /connect-src[^\n]*cdn\.jsdelivr\.net/)
  assert.match(page, /BodyParts3D/)
  assert.match(page, /CC BY 4\.0/)
})

test('los módulos React nuevos y modificados tienen JSX válido', async () => {
  const { transformWithEsbuild } = await import('vite')
  const files = [
    '../src/App.jsx',
    '../src/components/Layout.jsx',
    '../src/pages/AtlasAnatomicoPage.jsx',
    '../src/features/anatomy3d/AnatomyScene.js',
  ]

  for (const relativePath of files) {
    const url = new URL(relativePath, import.meta.url)
    const source = await readFile(url, 'utf8')
    await transformWithEsbuild(source, url.pathname, {
      loader: relativePath.endsWith('.jsx') ? 'jsx' : 'js',
      jsx: 'automatic',
      target: 'es2022',
    })
  }
})
