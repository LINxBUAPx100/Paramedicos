// ============================================================
//  Pruebas de lib/registro.js — módulo puro (sin React ni Firebase)
// ------------------------------------------------------------
//  Se ejecuta en Node, donde no hay sessionStorage: eso es parte de lo que se
//  prueba. El registro tiene que funcionar igual sin almacenamiento (modo
//  incógnito, cuota llena, storage deshabilitado por política).
// ============================================================
import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { registrar, errores, hayErrores, limpiar, diagnostico } from '../src/lib/registro.js'

beforeEach(() => limpiar())

test('sin sessionStorage sigue registrando en memoria', () => {
  assert.equal(globalThis.sessionStorage, undefined, 'este test asume Node sin storage')
  registrar('prueba', new Error('algo falló'))
  assert.equal(hayErrores(), true)
  assert.equal(errores().length, 1)
})

test('conserva el código de error, que es lo accionable en Firebase', () => {
  const err = Object.assign(new Error('Missing or insufficient permissions.'), {
    code: 'permission-denied',
    name: 'FirebaseError',
  })
  registrar('progreso:guardar', err, { uid: 'u1' })
  const [e] = errores()
  assert.equal(e.ambito, 'progreso:guardar')
  assert.equal(e.codigo, 'permission-denied')
  assert.equal(e.tipo, 'FirebaseError')
  assert.match(e.mensaje, /insufficient permissions/)
  assert.deepEqual(e.datos, { uid: 'u1' })
})

test('acepta cualquier cosa que alguien haya lanzado', () => {
  registrar('a', 'texto pelado')
  registrar('b', null)
  registrar('c', { message: 'objeto suelto' })
  const [a, b, c] = errores()
  assert.equal(a.mensaje, 'texto pelado')
  assert.equal(b.mensaje, 'sin detalle')
  assert.equal(c.mensaje, 'objeto suelto')
})

test('recorta el historial para no comerse el almacenamiento', () => {
  for (let i = 0; i < 50; i++) registrar('bucle', new Error(`fallo ${i}`))
  const lista = errores()
  assert.equal(lista.length, 30, 'se queda con los 30 últimos')
  // Se conservan los ÚLTIMOS: al depurar interesa lo que acaba de pasar.
  assert.match(lista.at(-1).mensaje, /fallo 49/)
  assert.match(lista[0].mensaje, /fallo 20/)
})

test('trunca mensajes largos y limita los extras', () => {
  registrar('largo', new Error('x'.repeat(5000)), Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => [`k${i}`, 'v'.repeat(500)])
  ))
  const [e] = errores()
  assert.equal(e.mensaje.length, 300)
  assert.equal(Object.keys(e.datos).length, 8)
  assert.equal(Object.values(e.datos)[0].length, 120)
})

test('el ámbito identifica QUÉ falló y siempre existe', () => {
  registrar(null, new Error('x'))
  assert.equal(errores()[0].ambito, 'desconocido')
})

test('limpiar deja el registro vacío', () => {
  registrar('x', new Error('y'))
  limpiar()
  assert.equal(hayErrores(), false)
  assert.deepEqual(errores(), [])
})

test('errores() devuelve una copia: nadie muta el registro desde fuera', () => {
  registrar('x', new Error('y'))
  const lista = errores()
  lista.push({ falso: true })
  assert.equal(errores().length, 1)
})

test('diagnostico empaqueta errores y entorno sin datos personales', () => {
  registrar('x', new Error('y'))
  const d = diagnostico({ nota: 'iba a guardar' })
  assert.equal(d.errores.length, 1)
  assert.equal(d.nota, 'iba a guardar')
  assert.equal(typeof d.entorno, 'object')
  // Ni uid ni correo: los pone la capa de Firestore, que ya los conoce.
  assert.equal('uid' in d, false)
  assert.equal('email' in d, false)
})
