import test from 'node:test'
import assert from 'node:assert/strict'

import {
  estadoDeCuenta, estaDadaDeBaja, reactivarExigeAcademia, rolAlReactivar,
  accionesDeCuenta, avisoDeReactivacion,
} from '../src/lib/cuentaModelo.js'

test('el estado por defecto es activa, y uno desconocido no rompe', () => {
  assert.equal(estadoDeCuenta({}), 'activo')
  assert.equal(estadoDeCuenta(null), 'activo')
  assert.equal(estadoDeCuenta({ estado: 'inventado' }), 'activo')
  assert.equal(estadoDeCuenta({ estado: 'eliminado' }), 'eliminado')
  assert.equal(estaDadaDeBaja({ estado: 'eliminado' }), true)
  assert.equal(estaDadaDeBaja({ estado: 'suspendido' }), false)
})

test('reactivar exige academia porque la baja se la quitó', () => {
  // Sin academia volvería «activa» pero sin poder entrar a nada: activa por
  // dentro y rota por fuera, peor que seguir de baja.
  assert.equal(reactivarExigeAcademia({ estado: 'eliminado', academiaId: null }), true)
  assert.equal(reactivarExigeAcademia({ estado: 'eliminado', academiaId: 'AEP' }), false)
  assert.equal(reactivarExigeAcademia({ estado: 'activo' }), false)
})

test('nadie vuelve como superadmin', () => {
  // Ese rol se concede a mano; no se hereda de un documento antiguo.
  assert.equal(rolAlReactivar({ rol: 'superadmin' }), 'alumno')
  assert.equal(rolAlReactivar({ rol: 'instructor' }), 'instructor')
  assert.equal(rolAlReactivar({ rol: 'admin_escuela' }), 'admin_escuela')
  assert.equal(rolAlReactivar({}), 'alumno')
})

test('solo el super-admin puede reactivar', () => {
  const baja = { estado: 'eliminado' }
  assert.deepEqual(accionesDeCuenta(baja, { esSuperadmin: true }), ['reactivar'])
  // A un director no se le ofrece: la cuenta ya no pertenece a su academia y
  // las reglas no le dejan tocarla. Sería un botón que falla al pulsarlo.
  assert.deepEqual(accionesDeCuenta(baja, { esSuperadmin: false }), [])
})

test('una cuenta viva ofrece suspender o activar, y darla de baja', () => {
  assert.deepEqual(accionesDeCuenta({ estado: 'activo' }, { esSuperadmin: true }),
    ['suspender', 'dar-de-baja'])
  assert.deepEqual(accionesDeCuenta({ estado: 'suspendido' }, { esSuperadmin: true }),
    ['activar', 'dar-de-baja'])
})

test('el aviso dice lo que la reactivación NO devuelve', () => {
  assert.match(avisoDeReactivacion(), /permisos editoriales/)
})
