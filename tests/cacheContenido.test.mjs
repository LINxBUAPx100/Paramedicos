// ============================================================
//  La caché de contenido en IndexedDB
// ------------------------------------------------------------
//  Deuda que dejó la Fase 1: bajó abrir contenido de 287 lecturas a 3, pero
//  esas 3 se volvían a pagar en cada RECARGA de la pestaña, porque la caché
//  vivía en un `Map` en memoria. Y con ellas volvían a viajar los 71 kB del
//  agregado de enlaces del glosario, que pide cada lección.
//
//  LO QUE ESTAS PRUEBAS VIGILAN ES UNA SOLA COSA: que la caché no pueda servir
//  contenido viejo. Ahorrar lecturas no vale nada si el precio es que un alumno
//  estudie la versión anterior a una corrección clínica. Por eso casi todas
//  comprueban el camino en el que la caché se NIEGA a responder.
//
//  El resto vigila lo contrario: que un fallo de IndexedDB —bloqueado, ventana
//  privada, base corrupta, otra pestaña que la tiene tomada— no tumbe nada, sino
//  que devuelva `null` y mande a quien llama a la red, que es lo que hacía antes
//  de existir este módulo.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { claveAgregado, claveTema } from '../src/lib/cacheContenido.js'

// ---------- IndexedDB de mentira ----------
//
// Se monta sobre `globalThis` ANTES de importar el módulo, porque éste lee
// `globalThis.indexedDB` en cada apertura.
function montarIdb({ roto = false, colgado = false } = {}) {
  const datos = new Map()
  const pedido = (fn) => {
    const p = {}
    queueMicrotask(() => {
      if (roto) { p.onerror?.(); return }
      try { p.result = fn(); p.onsuccess?.() } catch { p.onerror?.() }
    })
    return p
  }
  const almacen = {
    get: (k) => pedido(() => datos.get(k)),
    put: (v, k) => pedido(() => { datos.set(k, v); return true }),
    delete: (k) => pedido(() => { datos.delete(k); return true }),
    clear: () => pedido(() => { datos.clear(); return true }),
    getAllKeys: () => pedido(() => [...datos.keys()]),
  }
  globalThis.indexedDB = {
    open: () => {
      const p = { result: null }
      if (colgado) return p // no dispara nunca: salta el plazo
      queueMicrotask(() => {
        p.result = {
          objectStoreNames: { contains: () => true },
          createObjectStore: () => almacen,
          transaction: () => ({ objectStore: () => almacen }),
          close: () => {},
        }
        p.onsuccess?.()
      })
      return p
    },
  }
  return datos
}

// Cada prueba necesita el módulo con su propio `indexedDB` y su propia base
// abierta, así que se importa con una marca distinta para saltarse la caché de
// módulos de Node.
let n = 0
async function moduloFresco(opciones) {
  const datos = montarIdb(opciones)
  n += 1
  const mod = await import(`../src/lib/cacheContenido.js?n=${n}`)
  return { mod, datos }
}

// ---------- lo que la caché NO puede hacer ----------

test('una entrada de otra versión NO se sirve', async () => {
  const { mod } = await moduloFresco()
  await mod.escribirCache('curso|agregado|glosarioEnlaces|*', 7, { hola: 'v7' })
  assert.deepEqual(await mod.leerCache('curso|agregado|glosarioEnlaces|*', 7), { hola: 'v7' })
  // El curso se regeneró: la entrada guardada describe el material anterior.
  assert.equal(await mod.leerCache('curso|agregado|glosarioEnlaces|*', 8), null)
})

test('sin versión no se lee ni se escribe', async () => {
  // `versionSelladaDe` devuelve null cuando el sello falta o está caducado. Ese
  // null tiene que significar «ve a la red», nunca «sirve lo que haya».
  const { mod, datos } = await moduloFresco()
  assert.equal(await mod.escribirCache('c|tema|x', null, { a: 1 }), false)
  assert.equal(await mod.leerCache('c|tema|x', null), null)
  assert.equal(datos.size, 0)
})

test('lo que nunca se guardó no aparece', async () => {
  const { mod } = await moduloFresco()
  assert.equal(await mod.leerCache('curso|tema|no-existe', 3), null)
})

// ---------- lo que sí hace ----------

test('guarda y devuelve el documento tal cual', async () => {
  const { mod } = await moduloFresco()
  const doc = { tipo: 'preguntas', datos: '[{"pregunta":"…"}]', version: 4 }
  await mod.escribirCache(claveAgregado('RES__tum', 'preguntas', 'm3'), 4, doc)
  assert.deepEqual(await mod.leerCache(claveAgregado('RES__tum', 'preguntas', 'm3'), 4), doc)
})

test('limpiar un curso no toca los demás', async () => {
  const { mod } = await moduloFresco()
  await mod.escribirCache(claveTema('A__tum', 't1'), 1, { de: 'A' })
  await mod.escribirCache(claveTema('B__tum', 't1'), 1, { de: 'B' })
  await mod.limpiarCache('A__tum')
  assert.equal(await mod.leerCache(claveTema('A__tum', 't1'), 1), null)
  assert.deepEqual(await mod.leerCache(claveTema('B__tum', 't1'), 1), { de: 'B' })
})

test('las claves llevan el curso delante, para poder borrar por prefijo', () => {
  assert.ok(claveAgregado('RES__tum', 'fichas', 'm3').startsWith('RES__tum|'))
  assert.ok(claveTema('RES__tum', 'm3-ep-sss').startsWith('RES__tum|'))
  // Y un agregado global no colisiona con el del mismo tipo de un módulo.
  assert.notEqual(claveAgregado('c', 'glosario'), claveAgregado('c', 'glosario', 'm1'))
})

// ---------- todo falla hacia la red ----------

test('sin IndexedDB no rompe: devuelve null y se va a la red', async () => {
  globalThis.indexedDB = undefined
  n += 1
  const mod = await import(`../src/lib/cacheContenido.js?n=${n}`)
  assert.equal(await mod.leerCache('c|tema|x', 1), null)
  assert.equal(await mod.escribirCache('c|tema|x', 1, { a: 1 }), false)
  assert.equal(await mod.limpiarCache('c'), false)
})

test('con IndexedDB rota tampoco rompe', async () => {
  const { mod } = await moduloFresco({ roto: true })
  assert.equal(await mod.leerCache('c|tema|x', 1), null)
  assert.equal(await mod.escribirCache('c|tema|x', 1, { a: 1 }), false)
})

test('si abrir la base se cuelga, se responde a tiempo y sin caché', async () => {
  // Otra pestaña con la base tomada no puede dejar la aplicación esperando.
  const { mod } = await moduloFresco({ colgado: true })
  const t0 = Date.now()
  assert.equal(await mod.leerCache('c|tema|x', 1), null)
  assert.ok(Date.now() - t0 < 2000, 'la caché se quedó esperando a IndexedDB')
})

// ---------- el cableado ----------

test('el SELLO no se guarda en la caché', async () => {
  // Es el documento que decide si lo demás vale. Cachearlo sería validar la
  // caché consigo misma.
  const fs = await import('node:fs')
  const fuente = fs.readFileSync(new URL('../src/lib/firebase/agregados.js', import.meta.url), 'utf8')
  assert.match(fuente, /tipo === SELLO \? null : versionSelladaDe\(cursoId\)/,
    'agregados.js dejó de excluir el sello de la caché en disco')
})

test('la lección se cachea con la versión del sello, no con la suya', async () => {
  const fs = await import('node:fs')
  const fuente = fs.readFileSync(new URL('../src/lib/firebase/contenido.js', import.meta.url), 'utf8')
  const cuerpo = fuente.slice(fuente.indexOf('export async function temaDeCurso'))
  assert.match(cuerpo.slice(0, 1200), /versionSelladaDe\(cursoId\)/,
    'temaDeCurso debe atarse a la versión del curso: al editar un tema el sello '
    + 'queda desactualizado y con él tiene que caer la lección guardada')
})
