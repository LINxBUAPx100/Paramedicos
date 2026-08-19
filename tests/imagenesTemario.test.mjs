// ============================================================
//  Galería de Logros — cada imagen debe llevar a un tema que EXISTA
// ------------------------------------------------------------
//  Por qué existe esta prueba: las 21 tarjetas de la galería no llevaban a
//  ninguna parte. Siete apuntaban a temas del temario ANTERIOR
//  (`cardiovascular-profundo`, `renal-hidroelectrolitico`, …), que desapareció
//  al adoptar el plan oficial de 287 temas, y las otras catorce no declaraban
//  destino. La tarjeta pintaba su flecha, el alumno la pulsaba y no pasaba nada.
//
//  Nada lo detectaba: el id de un tema es una cadena, y una cadena que ya no
//  corresponde a nada sigue siendo una cadena válida. Esto lo comprueba.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import fs from 'node:fs'
import path from 'node:path'
import { ATLAS_TEMAS, IMAGENES_POR_TEMA, imagenesDeTema } from '../src/data/imagenes.js'
import { todosLosTemas } from '../src/data/index.js'
import { esImagenPropia } from '../src/lib/img.js'

const IDS = new Set(todosLosTemas.map((t) => t.id))
const PUBLICO = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

test('la galería no está vacía (guardia de la propia prueba)', () => {
  assert.ok(ATLAS_TEMAS.length >= 20, `solo hay ${ATLAS_TEMAS.length} imágenes`)
  assert.ok(IDS.size === 287, `el plan debería tener 287 temas, tiene ${IDS.size}`)
})

test('toda imagen declara el tema al que lleva', () => {
  const sinTema = ATLAS_TEMAS.filter((t) => !t.tema).map((t) => t.clave)
  assert.deepEqual(sinTema, [], `Imágenes sin destino: ${sinTema.join(', ')}`)
})

test('el tema de cada imagen existe en el plan vigente', () => {
  const rotas = ATLAS_TEMAS
    .filter((t) => t.tema && !IDS.has(t.tema))
    .map((t) => `${t.clave} → ${t.tema}`)
  assert.deepEqual(rotas, [], `Imágenes que apuntan a un tema inexistente:\n  ${rotas.join('\n  ')}`)
})

test('las claves de imagen no se repiten', () => {
  const claves = ATLAS_TEMAS.map((t) => t.clave)
  assert.equal(new Set(claves).size, claves.length, 'hay claves duplicadas en la galería')
})

test('toda imagen PROPIA existe como archivo en public/', () => {
  // Una ruta con una letra de más no da error en ninguna parte: el navegador
  // pide un archivo que no está y la lección se queda con el hueco.
  const faltan = ATLAS_TEMAS
    .filter((t) => esImagenPropia(t.src))
    .filter((t) => !fs.existsSync(path.join(PUBLICO, t.src)))
    .map((t) => `${t.clave} → public/${t.src}`)
  assert.deepEqual(faltan, [], `Archivos de imagen que no existen:\n  ${faltan.join('\n  ')}`)
})

test('las imágenes de referencia por tema apuntan a temas y claves reales', () => {
  // Este mapa llevaba los ids del temario anterior, así que la galería
  // «Imágenes de referencia» de cada lección no se pintaba nunca.
  const claves = new Set(ATLAS_TEMAS.map((t) => t.clave))
  const temasRotos = Object.keys(IMAGENES_POR_TEMA).filter((id) => !IDS.has(id))
  const clavesRotas = Object.entries(IMAGENES_POR_TEMA)
    .flatMap(([id, lista]) => lista.filter((c) => !claves.has(c)).map((c) => `${id} → ${c}`))

  assert.deepEqual(temasRotos, [], `Temas inexistentes en el mapa: ${temasRotos.join(', ')}`)
  assert.deepEqual(clavesRotas, [], `Claves de imagen inexistentes: ${clavesRotas.join(', ')}`)
  // Y que de verdad devuelva algo: si el mapa quedara vacío, lo de arriba
  // pasaría sin haber comprobado nada.
  assert.ok(imagenesDeTema('m2-afi-cardiovascular').length >= 3)
})
