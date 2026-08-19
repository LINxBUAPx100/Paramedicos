// ============================================================
//  Resolución de imágenes — propias, Drive y externas
// ------------------------------------------------------------
//  Lo que se protege: que el contenido guarde RUTAS RELATIVAS y que el sitio
//  decida en un solo punto de dónde se sirven. Es lo que permitirá mover el
//  material a otro hosting sin tocar los 287 temas.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { rutaImagen, esImagenPropia, driveSrc, driveSrcSet, parseDriveId } from '../src/lib/img.js'

test('una ruta propia se sirve desde el propio sitio, sin proxy ni Drive', () => {
  // En Node no hay `import.meta.env`, así que cae al valor por defecto '/'.
  assert.equal(rutaImagen('imagenes/m2/nefrona.webp'), '/imagenes/m2/nefrona.webp')
  assert.equal(rutaImagen('/imagenes/m2/nefrona.webp'), '/imagenes/m2/nefrona.webp')
  assert.equal(driveSrc('imagenes/m2/nefrona.webp'), '/imagenes/m2/nefrona.webp')
  // Sin variantes que ofrecer: mejor sin srcset que con uno falso.
  assert.equal(driveSrcSet('imagenes/m2/nefrona.webp'), undefined)
})

test('una URL absoluta se respeta tal cual (material que aún vive fuera)', () => {
  assert.equal(rutaImagen('https://ejemplo.org/a.png'), 'https://ejemplo.org/a.png')
  assert.equal(rutaImagen('//ejemplo.org/a.png'), '//ejemplo.org/a.png')
  assert.ok(!esImagenPropia('https://ejemplo.org/a.png'))
})

test('esImagenPropia distingue ruta de archivo, id de Drive y URL', () => {
  assert.ok(esImagenPropia('imagenes/m1/celula.webp'))
  assert.ok(esImagenPropia('imagenes/m1/celula.PNG'))
  assert.ok(!esImagenPropia('imagenes/m1/celula.gif.exe'))
  assert.ok(!esImagenPropia(''))
  assert.ok(!esImagenPropia('1nFKl_QgYJ998yDPhEsxN4tPCKiMFIaJn')) // id pelado de Drive
})

test('Drive y las URL externas siguen funcionando como antes', () => {
  const id = '1nFKl_QgYJ998yDPhEsxN4tPCKiMFIaJn'
  assert.equal(parseDriveId(`https://drive.google.com/file/d/${id}/view?usp=sharing`), id)
  assert.ok(driveSrc(`https://drive.google.com/file/d/${id}/view`).includes(`/d/${id}=w`))
  assert.ok(driveSrc('https://ejemplo.org/a.png').includes('ejemplo.org'))
  assert.equal(driveSrc(''), '')
  assert.equal(driveSrcSet(''), undefined)
})

test('sin ruta no se inventa una URL', () => {
  assert.equal(rutaImagen(''), '')
  assert.equal(rutaImagen(null), '')
  assert.equal(rutaImagen(undefined), '')
})
