import test from 'node:test'
import assert from 'node:assert/strict'
import { mensajeDeError } from '../src/lib/mensajeError.js'

test('el dominio no autorizado se distingue de credenciales incorrectas', () => {
  const mensaje = mensajeDeError({ code: 'auth/unauthorized-domain' })
  assert.match(mensaje, /dominios autorizados/)
  assert.doesNotMatch(mensaje, /contraseña incorrect/)
  assert.equal(mensajeDeError({ code: 'auth/invalid-credential' }), 'Correo o contraseña incorrectos.')
})

test('ventana bloqueada, almacenamiento y entorno ofrecen una salida concreta', () => {
  assert.match(mensajeDeError({ code: 'auth/popup-blocked' }), /ventanas emergentes/)
  assert.match(mensajeDeError({ code: 'auth/web-storage-unsupported' }), /almacenamiento/)
  assert.match(mensajeDeError({ code: 'auth/operation-not-supported-in-this-environment' }), /navegador habitual/)
  assert.match(mensajeDeError({ code: 'auth/operation-not-allowed' }), /no está habilitado/)
})

test('el cierre de Google no atribuye el fallo al usuario y los errores desconocidos se conservan', () => {
  assert.doesNotMatch(mensajeDeError({ code: 'auth/popup-closed-by-user' }), /Cerraste/)
  assert.equal(mensajeDeError({ code: 'auth/nuevo-error', message: 'Detalle del proveedor' }), 'Detalle del proveedor')
})
