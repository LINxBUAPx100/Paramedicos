import test from 'node:test'
import assert from 'node:assert/strict'

import {
  estadoDeCuenta, estaDadaDeBaja, reactivarExigeAcademia, rolAlReactivar,
  accionesDeCuenta, avisoDeReactivacion, estaActiva, separarInactivas, soloActivas,
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

// ============================================================
//  Listados: una cuenta inactiva no se enseña con las activas
// ------------------------------------------------------------
//  Fijado por el dueño del producto el 30 de agosto de 2026, en dos pasos:
//  primero «si elimino un usuario esperaría no verlo más listado», y después
//  «hay usuarios que no están activos, deberían estar ocultos, y si están
//  desactivados no deben salir en la sección de permisos».
//
//  La frontera es ACTIVA o no. Suspendida y dada de baja se esconden las dos.
// ============================================================

test('la frontera de los listados es «activa», no «dada de baja»', () => {
  assert.equal(estaActiva({}), true)
  assert.equal(estaActiva({ estado: 'activo' }), true)
  assert.equal(estaActiva({ estado: 'suspendido' }), false)
  assert.equal(estaActiva({ estado: 'eliminado' }), false)
})

test('separarInactivas esconde suspendidas Y dadas de baja', () => {
  const lista = [
    { id: 'a' },
    { id: 'b', estado: 'activo' },
    { id: 'c', estado: 'suspendido' },
    { id: 'd', estado: 'eliminado' },
  ]
  const { activos, inactivos } = separarInactivas(lista)
  assert.deepEqual(activos.map((u) => u.id), ['a', 'b'])
  assert.deepEqual(inactivos.map((u) => u.id), ['c', 'd'])
})

// El fallo concreto que se reportó: «permisos de edición de profesores» sacaba
// la lista de `miembros`, que traía a los suspendidos. Se le ofrecían permisos
// de edición a un profesor que ni siquiera puede iniciar sesión.
test('un profesor suspendido no llega a la lista de permisos de edición', () => {
  const miembros = [
    { id: 'p1', rol: 'instructor' },
    { id: 'p2', rol: 'instructor', estado: 'suspendido' },
    { id: 'p3', rol: 'instructor', estado: 'eliminado' },
    { id: 'a1', rol: 'alumno' },
  ]
  const { activos } = separarInactivas(miembros)
  const instructores = activos.filter((m) => m.rol === 'instructor')
  assert.deepEqual(instructores.map((m) => m.id), ['p1'])
})

test('separarInactivas aguanta basura sin reventar el panel entero', () => {
  assert.deepEqual(separarInactivas(null), { activos: [], inactivos: [] })
  assert.deepEqual(separarInactivas(undefined), { activos: [], inactivos: [] })
  const { activos } = separarInactivas([null, undefined, { id: 'ok' }])
  assert.deepEqual(activos.map((u) => u.id), ['ok'])
})

test('soloActivas es el atajo para los listados sin casilla', () => {
  const lista = [{ id: 'a' }, { id: 'b', estado: 'suspendido' }, { id: 'c', estado: 'eliminado' }]
  assert.deepEqual(soloActivas(lista).map((u) => u.id), ['a'])
})

// Esconderlas juntas no las vuelve lo mismo: cambia qué se puede hacer con
// cada una, y confundirlas reactivaba una baja SIN devolverle su academia.
test('suspendida y dada de baja siguen siendo estados distintos', () => {
  assert.equal(estaDadaDeBaja({ estado: 'eliminado' }), true)
  assert.equal(estaDadaDeBaja({ estado: 'suspendido' }), false)
  assert.equal(reactivarExigeAcademia({ estado: 'eliminado' }), true)
  assert.equal(reactivarExigeAcademia({ estado: 'suspendido' }), false)
  // Levantar una suspensión lo hace el director; reactivar una baja, no.
  assert.deepEqual(accionesDeCuenta({ estado: 'suspendido' }), ['activar', 'dar-de-baja'])
  assert.deepEqual(accionesDeCuenta({ estado: 'eliminado' }, { esSuperadmin: false }), [])
  assert.deepEqual(accionesDeCuenta({ estado: 'eliminado' }, { esSuperadmin: true }), ['reactivar'])
})
