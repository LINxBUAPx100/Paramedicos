// ============================================================
//  Pruebas del modelo de INVITACIONES POR ROL
// ------------------------------------------------------------
//  Lo que se protege aquí es el criterio que faltaba: una invitación dice ahora
//  COMO QUÉ entra la persona (alumno / profesor / director), y de ese dato
//  cuelgan tres cosas que no pueden fallar en silencio:
//
//    1. que 'superadmin' NUNCA sea un rol invitable,
//    2. que una invitación vencida o agotada no se muestre como activa,
//    3. que el código lleve el rol dentro y sea legible.
//
//  Las reglas del servidor vuelven a comprobar (1) por su cuenta: esta lista
//  vive en el cliente y el cliente no decide. Ver tests/rules/.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ROLES_INVITACION, esRolInvitable, etiquetaRol, letraRol, maxUsosPorDefecto,
  generarCodigoInvitacion, estadoInvitacion, motivoNoCanjeable, resumenInvitacion,
} from '../src/lib/invitacionesModelo.js'

const DIA = 24 * 60 * 60 * 1000
const AHORA = 1_700_000_000_000
const activa = (extra = {}) => ({
  academiaId: 'AEP-2026', rol: 'alumno', estado: 'activo',
  expira: { seconds: (AHORA + 7 * DIA) / 1000 }, usos: 0, maxUsos: 0, ...extra,
})

test('el catálogo son exactamente los tres roles de una academia', () => {
  assert.deepEqual(ROLES_INVITACION.map((r) => r.rol), ['alumno', 'instructor', 'admin_escuela'])
  assert.deepEqual(ROLES_INVITACION.map((r) => r.etiqueta), ['Alumno', 'Profesor', 'Director'])
})

test('superadmin NO es invitable por ninguna vía', () => {
  // Un enlace de invitación circula por WhatsApp. El rol que manda en toda la
  // plataforma no se reparte así, y por eso no está en el catálogo.
  assert.equal(esRolInvitable('superadmin'), false)
  assert.equal(esRolInvitable(''), false)
  assert.equal(esRolInvitable(undefined), false)
  assert.equal(esRolInvitable('admin_escuela'), true)
})

test('el código lleva la academia y el rol dentro', () => {
  const azar = () => 'K'
  assert.equal(
    generarCodigoInvitacion({ academiaId: 'AEP-2026', rol: 'instructor', azar }),
    'INV-AEP-P-KKKK'
  )
  assert.equal(
    generarCodigoInvitacion({ academiaId: 'AEP-2026', rol: 'admin_escuela', azar }),
    'INV-AEP-D-KKKK'
  )
  assert.equal(
    generarCodigoInvitacion({ academiaId: 'AEP-2026', rol: 'alumno', azar }),
    'INV-AEP-A-KKKK'
  )
})

test('el código tolera una academia con nombre raro o ausente', () => {
  const azar = () => '7'
  // Sin academia no se queda en 'INV--A-...': cae al prefijo genérico, igual
  // que hace generarCodigo() en codigos.js.
  assert.equal(generarCodigoInvitacion({ rol: 'alumno', azar }), 'INV-PT-A-7777')
  assert.equal(
    generarCodigoInvitacion({ academiaId: 'esc.uela ñ-2026', rol: 'alumno', azar }),
    'INV-ESCU-A-7777'
  )
})

test('el rol de director se propone de UN SOLO uso', () => {
  // Un enlace que reparte la dirección de la academia no puede quedarse abierto.
  assert.equal(maxUsosPorDefecto('admin_escuela'), 1)
  assert.equal(maxUsosPorDefecto('instructor'), 0)
  assert.equal(maxUsosPorDefecto('alumno'), 0)
})

test('una invitación vigente está activa', () => {
  assert.equal(estadoInvitacion(activa(), AHORA), 'activa')
  assert.equal(motivoNoCanjeable(activa(), AHORA), null)
})

test('vencida, desactivada o agotada NO se canjea', () => {
  const vencida = activa({ expira: { seconds: (AHORA - DIA) / 1000 } })
  assert.equal(estadoInvitacion(vencida, AHORA), 'expirada')
  assert.match(motivoNoCanjeable(vencida, AHORA), /venció/)

  const apagada = activa({ estado: 'inactivo' })
  assert.equal(estadoInvitacion(apagada, AHORA), 'inactiva')
  assert.match(motivoNoCanjeable(apagada, AHORA), /desactivada/)

  const agotada = activa({ maxUsos: 1, usos: 1 })
  assert.equal(estadoInvitacion(agotada, AHORA), 'agotada')
  assert.match(motivoNoCanjeable(agotada, AHORA), /número de veces/)
})

test('sin límite de usos (maxUsos 0) no se agota nunca', () => {
  assert.equal(estadoInvitacion(activa({ maxUsos: 0, usos: 99 }), AHORA), 'activa')
})

test('un rol desconocido en el documento no se canjea', () => {
  // Si alguien lograra sembrar un doc con rol 'superadmin', el canje se planta
  // aquí antes de escribir nada — y las reglas lo niegan igualmente.
  assert.match(motivoNoCanjeable(activa({ rol: 'superadmin' }), AHORA), /mal formada/)
  assert.match(motivoNoCanjeable(activa({ rol: 'jefe' }), AHORA), /mal formada/)
})

test('ningún motivo de rechazo dice «no existe una invitación»', () => {
  // Esa frase la reserva canjearInvitacion() para «este código no es de este
  // tipo», que es lo ÚNICO que hace avanzar la cascada de canjear.js. Si un
  // motivo real la usara, un código caducado se probaría como si fuera de
  // academia y el usuario acabaría viendo un mensaje que no le corresponde.
  const casos = [
    null,
    activa({ estado: 'inactivo' }),
    activa({ expira: { seconds: (AHORA - DIA) / 1000 } }),
    activa({ maxUsos: 1, usos: 3 }),
    activa({ rol: 'superadmin' }),
  ]
  for (const c of casos) {
    const motivo = motivoNoCanjeable(c, AHORA)
    assert.ok(motivo, 'este caso debería tener motivo')
    assert.doesNotMatch(motivo, /No existe una invitación/)
  }
})

test('la fecha de expiración se lee venga como venga', () => {
  const vence = AHORA + DIA
  for (const expira of [
    { seconds: vence / 1000 },                       // Timestamp de Firestore
    { toMillis: () => vence },                       // Timestamp con método
    new Date(vence),                                 // Date
    vence,                                           // milisegundos a secas
  ]) {
    assert.equal(estadoInvitacion(activa({ expira }), AHORA), 'activa')
  }
})

test('etiquetas y resumen legibles', () => {
  assert.equal(etiquetaRol('instructor'), 'Profesor')
  assert.equal(etiquetaRol('admin_escuela'), 'Director')
  assert.equal(letraRol('admin_escuela'), 'D')
  // Rol desconocido: se muestra tal cual en vez de romper la lista.
  assert.equal(etiquetaRol('jefe'), 'jefe')
  assert.equal(resumenInvitacion({ rol: 'instructor' }), 'Profesor')
  assert.equal(
    resumenInvitacion({ rol: 'alumno' }, { nombreGrupo: 'Generación 2026-A' }),
    'Alumno · Generación 2026-A'
  )
})
