// ============================================================
//  Pruebas de REGLAS — invitaciones POR ROL
// ------------------------------------------------------------
//  Esta colección abre la ÚNICA puerta por la que el propio usuario puede
//  cambiar su `rol`, así que es la que más vigilancia merece del fichero. Lo
//  que se protege:
//
//    · nadie se asciende sin una invitación válida (ni con una vencida,
//      desactivada, agotada, de otra academia o inventada),
//    · 'superadmin' no se reparte por invitación ni sembrando el documento,
//    · un profesor no EMITE invitaciones (se fabricaría la de director),
//    · el rol de una invitación ya repartida es inmutable,
//    · y lo que debe seguir funcionando: el director invita, el invitado canjea
//      y solo puede sumar UNO al contador de usos.
//
//  Sin emulador la suite se OMITE con el motivo: npm run test:rules
// ============================================================
import { test, after } from 'node:test'
import { readFileSync } from 'node:fs'

const HOST = process.env.FIRESTORE_EMULATOR_HOST
let rut = null
try { rut = await import('@firebase/rules-unit-testing') } catch { /* se reporta vía skip */ }

const skip = !HOST
  ? 'Requiere el emulador de Firestore: npm run test:rules'
  : !rut ? 'Falta @firebase/rules-unit-testing' : false

let env = null
let fsmod = null

const DIA = 24 * 60 * 60 * 1000
const dentroDe = (ms) => new Date(Date.now() + ms)

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: process.env.GCLOUD_PROJECT || 'ptem-rules-test',
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc, Timestamp } = fsmod
    const pon = (r, d) => setDoc(doc(db, r), d)
    const ts = (ms) => Timestamp.fromDate(dentroDe(ms))

    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('grupos/GRP-A', { academiaId: 'ACA-A', nombre: 'Gen 2026', estado: 'activo' })
    await pon('grupos/GRP-B', { academiaId: 'ACA-B', nombre: 'Otra', estado: 'activo' })

    await pon('usuarios/superX', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/dirB', { rol: 'admin_escuela', academiaId: 'ACA-B', estado: 'activo' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })

    // Un usuario por escenario: cada prueba escribe su propio perfil y no debe
    // pisar el de otra (node:test corre los ficheros en paralelo por defecto).
    for (const uid of [
      'invitadoOk', 'invitadoProfe', 'invitadoDir', 'invitadoVencida',
      'invitadoApagada', 'invitadoAgotada', 'invitadoAjena', 'invitadoSuper',
      'invitadoMiente', 'invitadoSinNada', 'invitadoGrupo', 'invitadoContador',
      'invitadoContador2',
    ]) {
      await pon(`usuarios/${uid}`, {
        rol: 'alumno', academiaId: null, grupoId: null, estado: 'activo',
        nombre: 'Invitado', esPrueba: false,
      })
    }

    const base = {
      academiaId: 'ACA-A', grupoId: null, creadoPor: 'dirA', nota: '',
      estado: 'activo', dias: 14, usos: 0, maxUsos: 0, expira: ts(7 * DIA),
    }
    await pon('invitaciones/INV-ACA-A-OK01', { ...base, rol: 'alumno' })
    await pon('invitaciones/INV-ACA-P-OK02', { ...base, rol: 'instructor' })
    await pon('invitaciones/INV-ACA-D-OK03', { ...base, rol: 'admin_escuela', maxUsos: 1 })
    await pon('invitaciones/INV-ACA-A-GRUP', { ...base, rol: 'alumno', grupoId: 'GRP-A' })
    await pon('invitaciones/INV-ACA-P-VIEJA', { ...base, rol: 'instructor', expira: ts(-DIA) })
    await pon('invitaciones/INV-ACA-P-OFF', { ...base, rol: 'instructor', estado: 'inactivo' })
    await pon('invitaciones/INV-ACA-D-USADA', {
      ...base, rol: 'admin_escuela', maxUsos: 1, usos: 1,
    })
    await pon('invitaciones/INV-ACB-P-OTRA', { ...base, academiaId: 'ACA-B', rol: 'instructor' })
    // Documento IMPOSIBLE de crear por reglas, sembrado a mano: si alguna vez
    // apareciera (migración, script), el canje debe seguir negándose.
    await pon('invitaciones/INV-ACA-X-SUPER', { ...base, rol: 'superadmin' })
    // Contador: una para cada prueba de incremento.
    await pon('invitaciones/INV-ACA-A-CNT1', { ...base, rol: 'alumno' })
    await pon('invitaciones/INV-ACA-A-CNT2', { ...base, rol: 'alumno' })
    await pon('invitaciones/INV-ACA-A-MIGRA', { ...base, rol: 'alumno' })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()
after(async () => { if (env) await env.cleanup() })

// Espeja invitaciones.js:canjearInvitacion — mismos campos, mismo orden.
const canje = ({ codigo, academiaId, grupoId = null, rol }) => ({
  academiaId, grupoId, rol, esPrueba: false, invitacionUsada: codigo,
})

// ---------- Lo que SÍ debe funcionar ----------

test('invitaciones: el invitado entra con el rol de la invitación', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('invitadoProfe'), 'usuarios/invitadoProfe'),
      canje({ codigo: 'INV-ACA-P-OK02', academiaId: 'ACA-A', rol: 'instructor' }))
  )
})

test('invitaciones: también la de DIRECTOR, que es la razón de todo esto', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('invitadoDir'), 'usuarios/invitadoDir'),
      canje({ codigo: 'INV-ACA-D-OK03', academiaId: 'ACA-A', rol: 'admin_escuela' }))
  )
})

test('invitaciones: con grupo, entra al grupo de esa academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('invitadoGrupo'), 'usuarios/invitadoGrupo'),
      canje({ codigo: 'INV-ACA-A-GRUP', academiaId: 'ACA-A', grupoId: 'GRP-A', rol: 'alumno' }))
  )
})

test('invitaciones: el director las crea para SU academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    setDoc(doc(como('dirA'), 'invitaciones/INV-ACA-P-NUEVA'), {
      academiaId: 'ACA-A', grupoId: null, rol: 'instructor', creadoPor: 'dirA',
      nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 0,
      expira: Timestamp.fromDate(dentroDe(14 * DIA)),
    })
  )
})

test('invitaciones: el invitado suma UNO al contador de usos', { skip }, async () => {
  await preparar()
  const { doc, updateDoc, increment, serverTimestamp } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('invitadoContador'), 'invitaciones/INV-ACA-A-CNT1'), {
      usos: increment(1), ultimoUso: serverTimestamp(),
    })
  )
})

// ---------- Escalada de privilegios: lo que NO puede pasar ----------

test('invitaciones: sin invitación, el rol sigue siendo intocable', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoSinNada'), 'usuarios/invitadoSinNada'), { rol: 'admin_escuela' })
  )
})

test('invitaciones: no se puede pedir un rol DISTINTO al de la invitación', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // La invitación es de alumno; el invitado escribe 'admin_escuela'.
  await assertFails(
    updateDoc(doc(como('invitadoMiente'), 'usuarios/invitadoMiente'),
      canje({ codigo: 'INV-ACA-A-OK01', academiaId: 'ACA-A', rol: 'admin_escuela' }))
  )
})

test('invitaciones: superadmin NO se reparte ni con el doc sembrado', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoSuper'), 'usuarios/invitadoSuper'),
      canje({ codigo: 'INV-ACA-X-SUPER', academiaId: 'ACA-A', rol: 'superadmin' }))
  )
})

test('invitaciones: vencida, desactivada o agotada no ascienden a nadie', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoVencida'), 'usuarios/invitadoVencida'),
      canje({ codigo: 'INV-ACA-P-VIEJA', academiaId: 'ACA-A', rol: 'instructor' }))
  )
  await assertFails(
    updateDoc(doc(como('invitadoApagada'), 'usuarios/invitadoApagada'),
      canje({ codigo: 'INV-ACA-P-OFF', academiaId: 'ACA-A', rol: 'instructor' }))
  )
  await assertFails(
    updateDoc(doc(como('invitadoAgotada'), 'usuarios/invitadoAgotada'),
      canje({ codigo: 'INV-ACA-D-USADA', academiaId: 'ACA-A', rol: 'admin_escuela' }))
  )
})

test('invitaciones: la de otra academia no sirve para entrar a esta', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // Invitación de ACA-B usada para meterse en ACA-A como profesor.
  await assertFails(
    updateDoc(doc(como('invitadoAjena'), 'usuarios/invitadoAjena'),
      canje({ codigo: 'INV-ACB-P-OTRA', academiaId: 'ACA-A', rol: 'instructor' }))
  )
})

test('invitaciones: un código inventado no vale', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoOk'), 'usuarios/invitadoOk'),
      canje({ codigo: 'INV-ACA-D-NOEXISTE', academiaId: 'ACA-A', rol: 'admin_escuela' }))
  )
})

// ---------- Quién EMITE ----------

test('invitaciones: un profesor NO emite invitaciones', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertFails } = rut
  // El caso que importa: se fabricaría la de director y ascendería solo.
  await assertFails(
    setDoc(doc(como('profA'), 'invitaciones/INV-ACA-D-PWN'), {
      academiaId: 'ACA-A', grupoId: null, rol: 'admin_escuela', creadoPor: 'profA',
      nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 1,
      expira: Timestamp.fromDate(dentroDe(14 * DIA)),
    })
  )
})

test('invitaciones: un director no emite para la academia de otro', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertFails } = rut
  await assertFails(
    setDoc(doc(como('dirB'), 'invitaciones/INV-ACA-P-INTRUSA'), {
      academiaId: 'ACA-A', grupoId: null, rol: 'instructor', creadoPor: 'dirB',
      nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 0,
      expira: Timestamp.fromDate(dentroDe(14 * DIA)),
    })
  )
})

test('invitaciones: no se crea una de superadmin, ni ya vencida, ni con usos', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertFails } = rut
  const base = {
    academiaId: 'ACA-A', grupoId: null, creadoPor: 'dirA', nota: '',
    estado: 'activo', dias: 14, usos: 0, maxUsos: 0,
    expira: Timestamp.fromDate(dentroDe(14 * DIA)),
  }
  await assertFails(setDoc(doc(como('dirA'), 'invitaciones/INV-A-X-1'), { ...base, rol: 'superadmin' }))
  await assertFails(setDoc(doc(como('dirA'), 'invitaciones/INV-A-X-2'), {
    ...base, rol: 'alumno', expira: Timestamp.fromDate(dentroDe(-DIA)),
  }))
  await assertFails(setDoc(doc(como('dirA'), 'invitaciones/INV-A-X-3'), {
    ...base, rol: 'alumno', usos: 99,
  }))
  // Grupo de OTRA academia.
  await assertFails(setDoc(doc(como('dirA'), 'invitaciones/INV-A-X-4'), {
    ...base, rol: 'alumno', grupoId: 'GRP-B',
  }))
})

// ---------- Lo que ya está emitido ----------

test('invitaciones: el rol de una ya repartida es INMUTABLE', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails, assertSucceeds } = rut
  // Si el rol se pudiera editar, un enlace que circula como "alumno" se
  // convertiría en uno de "director" en manos de quien ya lo tiene.
  await assertFails(
    updateDoc(doc(como('dirA'), 'invitaciones/INV-ACA-A-OK01'), { rol: 'admin_escuela' })
  )
  // Desactivarla sí, que es la vía correcta.
  await assertSucceeds(
    updateDoc(doc(como('dirA'), 'invitaciones/INV-ACA-A-OK01'), { estado: 'inactivo' })
  )
})

test('invitaciones: el super-admin SÍ migra academiaId (cambio de código)', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  // admin.js:cambiarCodigoAcademia reescribe academiaId en lotes. Si esta
  // escritura no cupiera, renombrar una academia dejaría sus invitaciones
  // apuntando a un código que ya no existe y nadie se enteraría hasta que un
  // invitado no pudiera entrar.
  await assertSucceeds(
    updateDoc(doc(como('superX'), 'invitaciones/INV-ACA-A-MIGRA'), { academiaId: 'ACA-B' })
  )
  // El director NO: para él la academia sigue siendo inmutable.
  await assertFails(
    updateDoc(doc(como('dirA'), 'invitaciones/INV-ACA-A-CNT1'), { academiaId: 'ACA-B' })
  )
})

test('invitaciones: el invitado no toca nada más que el contador', { skip }, async () => {
  await preparar()
  const { doc, updateDoc, increment } = fsmod
  const { assertFails } = rut
  // Reactivarla, alargarla o subir el tope: todo del director.
  await assertFails(
    updateDoc(doc(como('invitadoContador2'), 'invitaciones/INV-ACA-A-CNT2'), { estado: 'inactivo' })
  )
  await assertFails(
    updateDoc(doc(como('invitadoContador2'), 'invitaciones/INV-ACA-A-CNT2'), { maxUsos: 999 })
  )
  // Ni bajar el contador para "desgastar" menos la invitación.
  await assertFails(
    updateDoc(doc(como('invitadoContador2'), 'invitaciones/INV-ACA-A-CNT2'), { usos: increment(-1) })
  )
})
