// ============================================================
//  Pruebas de la tarjeta de invitación (parte pura)
// ------------------------------------------------------------
//  Lo que se protege: que la página escriba SOLO el código sobre la imagen que
//  entrega el diseñador —nada de componer la tarjeta ella—, y que la posición
//  sea proporcional, para que la misma configuración valga con una imagen de
//  1080 px o de 2000.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  IMAGENES, POSICION_CODIGO, imagenDe, posicionEnPixeles, nombreArchivoTarjeta,
} from '../src/lib/tarjetaInvitacion.js'

test('cada tipo de invitación apunta a su archivo, y lo desconocido a la general', () => {
  assert.ok(imagenDe('alumno').endsWith('invitacion-alumno.png'))
  assert.ok(imagenDe('instructor').endsWith('invitacion-profesor.png'))
  assert.ok(imagenDe('admin_escuela').endsWith('invitacion-director.png'))
  assert.equal(imagenDe('brujo'), IMAGENES.general)
  assert.equal(imagenDe(''), IMAGENES.general)
  // Todas dentro de la carpeta que se documenta: si alguien mueve el archivo,
  // el cambio es una línea y no una búsqueda por el proyecto.
  for (const ruta of Object.values(IMAGENES)) {
    assert.match(ruta, /^imagenes\/invitaciones\//, ruta)
  }
})

// Geometría MEDIDA sobre el diseño real (invitacion-alumno.png, 1080×1350).
// Si alguien mueve `POSICION_CODIGO`, estas cifras son las que avisan de que el
// código se ha ido encima del sujeto o del rótulo de abajo.
const DISENO = {
  ancho: 1080,
  alto: 1350,
  sujetoHastaX: 568, // el brazo/hombro llega hasta aquí en la franja de interés
  rotuloDesdeY: 964, // arriba del texto «codigo de acceso»
  huecoDesdeY: 780,
}

test('el código cae en el hueco del diseño: ni sobre el sujeto ni sobre el rótulo', () => {
  const p = posicionEnPixeles({ ancho: DISENO.ancho, alto: DISENO.alto })
  const izquierda = p.x - p.maxAncho / 2
  const derecha = p.x + p.maxAncho / 2
  const arriba = p.y - p.tam * 0.62
  const abajo = p.y + p.tam * 0.62

  assert.ok(izquierda > DISENO.sujetoHastaX, `se mete en el sujeto: x1=${Math.round(izquierda)}`)
  assert.ok(derecha <= DISENO.ancho, `se sale por la derecha: x2=${Math.round(derecha)}`)
  assert.ok(arriba > DISENO.huecoDesdeY, `sube demasiado: y1=${Math.round(arriba)}`)
  assert.ok(abajo < DISENO.rotuloDesdeY, `pisa «codigo de acceso»: y2=${Math.round(abajo)}`)
})

test('la posición es PROPORCIONAL: la misma para cualquier tamaño de imagen', () => {
  const grande = posicionEnPixeles({ ancho: 1080, alto: 1350 })
  const doble = posicionEnPixeles({ ancho: 2160, alto: 2700 })
  // Tolerancia de un píxel: cada medida se redondea a entero por separado, así
  // que el doble de 820 puede ser 1639 y no 1640. Lo que importa es que escale.
  const casiElDoble = (a, b) => Math.abs(a - b * 2) <= 1
  assert.ok(casiElDoble(doble.x, grande.x), `${doble.x} vs ${grande.x}×2`)
  assert.ok(casiElDoble(doble.tam, grande.tam), `${doble.tam} vs ${grande.tam}×2`)
  assert.ok(casiElDoble(doble.maxAncho, grande.maxAncho), `${doble.maxAncho} vs ${grande.maxAncho}×2`)
  // Y el vertical cae donde dice la configuración, no en un sitio inventado.
  assert.equal(grande.y, Math.round(POSICION_CODIGO.y * 1350))
})

test('sin medidas no se divide por cero ni salen valores absurdos', () => {
  const nada = posicionEnPixeles({})
  assert.equal(nada.x, 0)
  assert.equal(nada.y, 0)
  assert.ok(nada.tam >= 1, 'un tamaño de letra 0 no dibujaría nada')
  assert.equal(posicionEnPixeles(null).x, 0)
})

test('la configuración no promete texto que la página ya no escribe', () => {
  // La versión anterior componía título, subtítulo, grupo, caducidad y pie: era
  // la web diseñando la tarjeta. Ahora la imagen es del diseñador y aquí solo
  // queda el código.
  assert.deepEqual(
    Object.keys(POSICION_CODIGO).sort(),
    ['color', 'familia', 'maxAncho', 'sombra', 'tam', 'x', 'y'],
  )
  assert.ok(POSICION_CODIGO.x >= 0 && POSICION_CODIGO.x <= 1)
  assert.ok(POSICION_CODIGO.y >= 0 && POSICION_CODIGO.y <= 1)
})

test('el nombre del archivo viaja por WhatsApp sin acentos ni espacios', () => {
  assert.equal(
    nombreArchivoTarjeta({ academia: 'R.E.S.C.A.T.E Formación', codigo: 'INV-PRUE-P-B6GG' }),
    'invitacion-r-e-s-c-a-t-e-formacion-inv-prue-p-b6gg.png',
  )
  assert.equal(nombreArchivoTarjeta({}), 'invitacion.png')
  assert.ok(nombreArchivoTarjeta({ academia: 'x'.repeat(200), codigo: 'y' }).length <= 84)
})
