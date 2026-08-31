// ============================================================
//  La resiembra no puede pisar lo que no es suya
// ------------------------------------------------------------
//  El 31 de agosto de 2026, `migrar-contenido.mjs --seed --apply` rompió la
//  plantilla oficial de tres maneras a la vez y ninguna dio error: escribe el
//  documento con `set()`, que reemplaza TODO, y llevaba `tipoDestino` y
//  `version` fijos en el código.
//
//  Cada prueba de aquí es uno de esos tres destrozos. No hacía falta red para
//  encontrarlos: eran decisiones, no conexión.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  metadatosDePlantilla, modulosQueSePerderian, modulosDe,
  versionesPublicadas, versionBloqueada,
} from '../src/lib/seedPlantilla.js'

// ---------- 1. tipoDestino ----------

test('DESTROZO 1: el tipo de academia destino se CONSERVA, no se reescribe', () => {
  // Lo que pasó: la plantilla quedó 'basico' frente a una academia 'avanzado',
  // y su replicación empezó a salir con un aviso de incompatibilidad que nadie
  // había provocado.
  const m = metadatosDePlantilla({
    remota: { tipoDestino: 'avanzado', version: 7 },
    tipoInicial: 'basico',
  })
  assert.equal(m.tipoDestino, 'avanzado')
})

test('un --tipo explícito sí gana al remoto', () => {
  const m = metadatosDePlantilla({
    remota: { tipoDestino: 'avanzado' },
    tipoInicial: 'basico',
    tipoExplicito: true,
  })
  assert.equal(m.tipoDestino, 'basico')
})

test('sin plantilla remota se usa el valor inicial', () => {
  const m = metadatosDePlantilla({ remota: null, tipoInicial: 'basico', versionInicial: 1 })
  assert.equal(m.tipoDestino, 'basico')
  assert.equal(m.version, 1)
})

// ---------- 2. contador de versión ----------

test('DESTROZO 2: el contador de versión se CONSERVA', () => {
  // Lo que pasó: volvió a 1 con una v7 ya publicada.
  const m = metadatosDePlantilla({ remota: { version: 7 }, versionInicial: 1 })
  assert.equal(m.version, 7)
})

test('versionesPublicadas lee los números de los snapshots, y solo los suyos', () => {
  const ids = ['paramedico-tum__v1', 'paramedico-tum__v7', 'otra__v9', 'basura']
  assert.deepEqual(versionesPublicadas('paramedico-tum', ids), [1, 7])
})

test('un contador por debajo de lo publicado se detecta y trae el número correcto', () => {
  // `publicarVersionPlantilla` crea `plantilla__vN` y se niega si ya existe;
  // con el contador en 1 y una v7 publicada, publicar es imposible.
  const b = versionBloqueada(1, [7])
  assert.ok(b, 'tiene que detectarse')
  assert.equal(b.mayorPublicada, 7)
  assert.equal(b.sugerida, 8)

  // Igualar tampoco sirve: esa versión ya está tomada.
  assert.ok(versionBloqueada(7, [7]))
  // Por encima, bien.
  assert.equal(versionBloqueada(8, [7]), null)
  // Y sin nada publicado no hay nada que bloquear.
  assert.equal(versionBloqueada(1, []), null)
})

// ---------- 3. módulos creados desde el editor ----------

test('DESTROZO 3: se detectan los módulos que la resiembra borraría', () => {
  // El caso real: alguien creó «NORMATIVAS» desde el editor de contenido. El
  // repositorio no lo tiene, así que el `set()` lo habría hecho desaparecer sin
  // dejar rastro. Se salvó por unas horas de diferencia.
  const repo = [{ id: 'm1' }, { id: 'm2' }]
  const remota = [{ id: 'm1' }, { id: 'm2' }, { id: 'm8-normativas', titulo: 'NORMATIVAS' }]
  const perdidos = modulosQueSePerderian(repo, remota)
  assert.equal(perdidos.length, 1)
  assert.equal(perdidos[0].id, 'm8-normativas')
  assert.equal(perdidos[0].titulo, 'NORMATIVAS')
})

test('si la remota no añade nada, no se pierde nada', () => {
  const repo = [{ id: 'm1' }, { id: 'm2' }]
  assert.deepEqual(modulosQueSePerderian(repo, [{ id: 'm1' }]), [])
  assert.deepEqual(modulosQueSePerderian(repo, []), [])
  assert.deepEqual(modulosQueSePerderian(repo, null), [])
})

test('la estructura se lee igual venga como arreglo o como {modulos}', () => {
  // Las dos formas circulan por el código; leer mal una de ellas haría creer
  // que no se pierde nada justo cuando sí.
  const repo = [{ id: 'm1' }]
  const remotaObjeto = { modulos: [{ id: 'm1' }, { id: 'm9' }] }
  assert.equal(modulosQueSePerderian(repo, remotaObjeto).length, 1)
  assert.equal(modulosDe(remotaObjeto).length, 2)
  assert.equal(modulosDe([{ id: 'x' }]).length, 1)
  assert.equal(modulosDe(null).length, 0)
})

test('un módulo remoto sin id no cuenta como pérdida', () => {
  // Basura en la estructura no debe bloquear una resiembra legítima.
  assert.deepEqual(modulosQueSePerderian([{ id: 'm1' }], [{ titulo: 'sin id' }, null]), [])
})

// ---------- el script usa la regla, no una copia ----------

test('migrar-contenido.mjs usa este módulo en vez de reimplementarlo', async () => {
  const { readFileSync } = await import('node:fs')
  const { fileURLToPath } = await import('node:url')
  const path = await import('node:path')
  const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const src = readFileSync(path.join(raiz, 'scripts', 'migrar-contenido.mjs'), 'utf8')
  for (const fn of ['metadatosDePlantilla', 'modulosQueSePerderian', 'versionBloqueada']) {
    assert.match(src, new RegExp(fn), `el script debe usar ${fn}, no una copia que se desincronice`)
  }
  // Y ya no puede llevar los valores fijos que causaron el destrozo.
  assert.doesNotMatch(src, /tipoDestino: 'basico',\s*\r?\n\s*version: 1,/,
    'volvieron los valores fijos de tipoDestino y version')
})
