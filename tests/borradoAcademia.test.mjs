import test from 'node:test'
import assert from 'node:assert/strict'

import {
  destinosDeUsuarios, reparto, describirDestino, puedeAvanzar,
  validarConfirmacion, exigeConfirmacionEscrita, ACCIONES_ACADEMIA,
  DESTINO_BORRAR, DESTINO_SIN_ACADEMIA,
} from '../src/lib/borradoAcademia.js'

const ACADEMIAS = [
  { id: 'AEP', nombre: 'Academia Estatal' },
  { id: 'RES', nombre: 'Rescate' },
  { id: 'PRUEBA', nombre: 'Prueba' },
]
const USUARIOS = [
  { id: 'u1', academiaId: 'PRUEBA', rol: 'alumno' },
  { id: 'u2', academiaId: 'PRUEBA', rol: 'alumno' },
  { id: 'u3', academiaId: 'PRUEBA', rol: 'instructor' },
  { id: 'u4', academiaId: 'PRUEBA', rol: 'admin_escuela' },
  { id: 'u5', academiaId: 'AEP', rol: 'alumno' },
  { id: 'u6', academiaId: 'PRUEBA', rol: 'alumno', estado: 'eliminado' },
]

test('los destinos no incluyen la academia que se está borrando', () => {
  const d = destinosDeUsuarios(ACADEMIAS, 'PRUEBA')
  assert.ok(!d.some((x) => x.id === 'PRUEBA'), 'mover a la que se borra no significa nada')
  assert.equal(d[0].id, DESTINO_SIN_ACADEMIA, '«sin academia» va primero')
  assert.deepEqual(d.slice(1).map((x) => x.id), ['AEP', 'RES'])
})

test('el reparto cuenta a quién afecta y no cuenta a los ya eliminados', () => {
  const r = reparto(USUARIOS, 'PRUEBA')
  assert.equal(r.total, 4)
  assert.equal(r.alumnos, 2)
  assert.equal(r.staff, 2)
  assert.ok(!r.uids.includes('u6'), 'un usuario ya dado de baja no se vuelve a tocar')
  assert.ok(!r.uids.includes('u5'), 'ni alguien de otra academia')
})

test('describirDestino dice exactamente qué va a pasar', () => {
  assert.match(describirDestino(DESTINO_BORRAR, 4), /4 personas/)
  assert.match(describirDestino(DESTINO_BORRAR, 4), /dejarán de funcionar/)
  assert.match(describirDestino(DESTINO_SIN_ACADEMIA, 4), /sin academia/)
  assert.match(describirDestino('AEP', 4, ACADEMIAS), /Academia Estatal/)
  // Singular cuando toca.
  assert.match(describirDestino(DESTINO_SIN_ACADEMIA, 1), /1 persona\b/)
  // Y sin personas se dice, en vez de una frase con un 0 dentro.
  assert.match(describirDestino(DESTINO_SIN_ACADEMIA, 0), /no tiene personas/)
})

test('no se avanza al paso 2 sin decidir el destino de las personas', () => {
  assert.equal(puedeAvanzar('', 4), false)
  assert.equal(puedeAvanzar(null, 4), false)
  assert.equal(puedeAvanzar(DESTINO_SIN_ACADEMIA, 4), true)
  assert.equal(puedeAvanzar(DESTINO_BORRAR, 4), true)
  // Sin personas, el paso 1 no decide nada y no debe bloquear.
  assert.equal(puedeAvanzar('', 0), true)
})

test('la confirmación es el CÓDIGO de la academia', () => {
  // Escribirlo obliga a mirar cuál se está borrando, que es el error que de
  // verdad se quiere evitar.
  assert.equal(validarConfirmacion('PRUEBA', 'PRUEBA'), true)
  assert.equal(validarConfirmacion('  prueba  ', 'PRUEBA'), true, 'sin distinguir mayúsculas ni espacios')
  assert.equal(validarConfirmacion('OTRA', 'PRUEBA'), false)
  assert.equal(validarConfirmacion('', 'PRUEBA'), false)
  assert.equal(validarConfirmacion('PRUEBA', ''), false)
})

test('solo lo irreversible pide escribir el código', () => {
  // Pedir una frase para algo que se deshace con un clic enseña a teclear sin
  // leer, y entonces tampoco protege el borrado.
  assert.equal(exigeConfirmacionEscrita('borrar'), true)
  assert.equal(exigeConfirmacionEscrita('archivar'), false)
  assert.equal(exigeConfirmacionEscrita('suspender'), false)
  assert.equal(exigeConfirmacionEscrita('loquesea'), false)
})

test('el catálogo de acciones marca qué es reversible', () => {
  assert.equal(ACCIONES_ACADEMIA.borrar.reversible, false)
  assert.equal(ACCIONES_ACADEMIA.archivar.reversible, true)
  assert.equal(ACCIONES_ACADEMIA.suspender.reversible, true)
  for (const a of Object.values(ACCIONES_ACADEMIA)) {
    assert.ok(a.etiqueta && a.descripcion, 'cada acción se explica antes de pulsarla')
  }
})
