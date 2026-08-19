// ============================================================
//  Acceso al contenido y VENCIMIENTO de la prueba temporal
// ------------------------------------------------------------
//  El requisito que fija esta suite: cuando termina el periodo de un código de
//  prueba, la persona queda bloqueada por completo —contenido, grupo y
//  academia— como si no tuviera cuenta en ninguna parte. La cuenta sigue
//  existiendo solo para poder canjear otro código.
//
//  El espejo en el servidor está en firestore.rules (`pruebaVencida()`) y se
//  prueba en tests/rules/prueba.rules.test.mjs con el emulador.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calcularAcceso, etiquetaPrueba, finDePrueba, msHastaFinDePrueba,
  pertenenciaEfectiva, pruebaVencida, pruebaVigente,
} from '../src/lib/accesoModelo.js'

const AHORA = Date.UTC(2026, 7, 19, 12, 0, 0) // 19 ago 2026, 12:00 UTC
const ts = (ms) => ({ seconds: Math.floor(ms / 1000), nanoseconds: 0 })
const DIA = 24 * 60 * 60 * 1000

// Perfil tal y como lo deja canjearCodigo(): marcado como prueba y ADEMÁS
// integrado a la academia y al grupo del código.
const enPrueba = (finMs) => ({
  rol: 'alumno', estado: 'activo', esPrueba: true,
  codigoPrueba: 'RES-SM-7D4K', pruebaHasta: ts(finMs),
  academiaId: 'RES-2026', grupoId: 'GRP-SCZD',
})
const ACADEMIA = { id: 'RES-2026', estado: 'activo' }
const base = { user: { uid: 'u1' }, perfilListo: true, academia: ACADEMIA, rol: 'alumno', esSupremo: false }

test('la prueba vigente da acceso; al vencer lo pierde', () => {
  const vigente = enPrueba(AHORA + DIA)
  assert.equal(pruebaVigente(vigente, AHORA), true)
  assert.equal(pruebaVencida(vigente, AHORA), false)
  assert.deepEqual(
    calcularAcceso({ ...base, perfil: vigente, ahora: AHORA }),
    { puede: true, motivo: null }
  )

  const vencida = enPrueba(AHORA - 1000)
  assert.equal(pruebaVigente(vencida, AHORA), false)
  assert.equal(pruebaVencida(vencida, AHORA), true)
  assert.deepEqual(
    calcularAcceso({ ...base, perfil: vencida, ahora: AHORA }),
    { puede: false, motivo: 'prueba-expirada' }
  )
})

test('una academia y un grupo activos NO rescatan una prueba vencida', () => {
  // El caso que motiva todo esto: el código integra a la persona en la
  // academia y en el grupo, así que al vencer su perfil sigue pareciendo el de
  // un alumno inscrito. Si el acceso se resolviera por academiaId, entraría.
  const perfil = enPrueba(AHORA - 1)
  assert.deepEqual(
    calcularAcceso({ ...base, perfil, academia: ACADEMIA, ahora: AHORA }),
    { puede: false, motivo: 'prueba-expirada' }
  )
  // Y deja de pertenecer: ni academia ni grupo.
  assert.deepEqual(
    pertenenciaEfectiva(perfil, AHORA),
    { academiaId: null, grupoId: null, vencida: true }
  )
})

test('mientras la prueba vive, la pertenencia del código sí cuenta', () => {
  assert.deepEqual(
    pertenenciaEfectiva(enPrueba(AHORA + DIA), AHORA),
    { academiaId: 'RES-2026', grupoId: 'GRP-SCZD', vencida: false }
  )
})

test('un alumno inscrito de verdad no se ve afectado por nada de esto', () => {
  // esPrueba: false lo escriben unirseAcademia, unirseAGrupo y canjearInvitacion.
  const inscrito = { rol: 'alumno', estado: 'activo', esPrueba: false, academiaId: 'RES-2026', grupoId: 'GRP-SCZD' }
  assert.equal(pruebaVencida(inscrito, AHORA), false)
  assert.deepEqual(calcularAcceso({ ...base, perfil: inscrito, ahora: AHORA }), { puede: true, motivo: null })
  assert.deepEqual(
    pertenenciaEfectiva(inscrito, AHORA),
    { academiaId: 'RES-2026', grupoId: 'GRP-SCZD', vencida: false }
  )
})

test('esPrueba sin fecha se considera VENCIDA, no indefinida', () => {
  // Un documento a medio escribir no puede convertirse en acceso perpetuo.
  const raro = { rol: 'alumno', estado: 'activo', esPrueba: true, academiaId: 'RES-2026' }
  assert.equal(pruebaVencida(raro, AHORA), true)
  assert.equal(finDePrueba(raro), 0)
  assert.deepEqual(
    calcularAcceso({ ...base, perfil: raro, ahora: AHORA }),
    { puede: false, motivo: 'prueba-expirada' }
  )
})

test('quien canjeó un código SIN academia también pierde el acceso al vencer', () => {
  const suelto = { rol: 'alumno', estado: 'activo', esPrueba: true, pruebaHasta: ts(AHORA - 1), academiaId: null }
  assert.deepEqual(
    calcularAcceso({ ...base, perfil: suelto, academia: null, ahora: AHORA }),
    { puede: false, motivo: 'prueba-expirada' }
  )
})

test('el resto de motivos de bloqueo sigue igual', () => {
  const perfil = { rol: 'alumno', estado: 'activo', esPrueba: false, academiaId: 'RES-2026' }
  assert.equal(calcularAcceso({ ...base, user: null, perfil, ahora: AHORA }).motivo, 'no-sesion')
  assert.equal(calcularAcceso({ ...base, perfil, perfilListo: false, ahora: AHORA }).motivo, 'cargando')
  assert.equal(calcularAcceso({ ...base, perfil: null, ahora: AHORA }).motivo, 'sin-perfil')
  assert.equal(
    calcularAcceso({ ...base, perfil: { ...perfil, estado: 'suspendido' }, ahora: AHORA }).motivo,
    'usuario-bloqueado'
  )
  assert.equal(
    calcularAcceso({ ...base, perfil: { ...perfil, academiaId: null }, ahora: AHORA }).motivo,
    'sin-academia'
  )
  assert.equal(
    calcularAcceso({ ...base, perfil, academia: { estado: 'suspendida' }, ahora: AHORA }).motivo,
    'academia-inactiva'
  )
  assert.equal(calcularAcceso({ ...base, perfil, academia: undefined, ahora: AHORA }).motivo, 'cargando')
  // El super-admin nunca se queda fuera, ni siquiera con una prueba vencida.
  assert.equal(calcularAcceso({ ...base, perfil: enPrueba(AHORA - 1), esSupremo: true, ahora: AHORA }).puede, true)
})

test('el temporizador de vencimiento existe, y no desborda setTimeout', () => {
  // Sin esto, quien tuviera la app abierta seguía estudiando hasta recargar:
  // el fin de la prueba no cambia ningún documento y no llega ningún snapshot.
  assert.equal(msHastaFinDePrueba(enPrueba(AHORA + 60_000), AHORA), 60_000)
  // A 30 días vista se acota (los setTimeout de más de ~24.8 días desbordan).
  assert.equal(msHastaFinDePrueba(enPrueba(AHORA + 30 * DIA), AHORA), 6 * 60 * 60 * 1000)
  // Ya vencida o sin prueba: no hay nada que esperar.
  assert.equal(msHastaFinDePrueba(enPrueba(AHORA - 1), AHORA), null)
  assert.equal(msHastaFinDePrueba({ esPrueba: false }, AHORA), null)
})

test('la etiqueta del panel distingue prueba viva de prueba vencida', () => {
  assert.equal(etiquetaPrueba({ esPrueba: false }, AHORA), null)
  assert.equal(etiquetaPrueba(enPrueba(AHORA + DIA), AHORA).vigente, true)
  const muerta = etiquetaPrueba(enPrueba(AHORA - DIA), AHORA)
  assert.equal(muerta.vigente, false)
  assert.match(muerta.texto, /vencida/)
})
