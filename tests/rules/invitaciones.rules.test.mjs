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
//
//  OJO CON LOS IDS DE LOS FIXTURES. `node --test` corre los ficheros de prueba
//  en PARALELO, y todos apuntan al MISMO proyecto del emulador
//  (`ptem-rules-test`, con singleProjectMode). O sea que comparten base de
//  datos: si dos ficheros siembran `usuarios/profA`, el último `setDoc` gana y
//  le borra los campos al otro —setDoc REEMPLAZA el documento entero— mientras
//  sus pruebas están corriendo.
//
//  Pasó de verdad: este fichero sembraba `usuarios/profA` sin `permisosEditor`
//  y tumbó un test de contenido.rules.test.mjs que llevaba meses en verde
//  («el profesor sin editarExamenes no cambia quiz ni estado»). El síntoma era
//  un `evaluation error` en la regla de `temas`, que no invita precisamente a
//  buscar la causa en otro fichero.
//
//  Por eso todo lo que se siembra aquí lleva prefijo propio (INVACA-A,
//  INVGRP-A, invDirA, invProf…): no colisiona con nadie. Si añades un fixture,
//  mantén el prefijo.
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
    // Cada archivo de reglas corre en su PROPIO proyecto del emulador. Sin
    // esto todos compartían dataset y `node --test` los ejecuta en paralelo:
    // el fixture de un archivo pisaba el de otro (p. ej. calificaciones sembraba
    // usuarios/alumA SIN grupoId y borraba el grupo que contenido necesitaba),
    // así que una prueba pasaba o fallaba según quién escribiera último.
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-invitaciones`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc, Timestamp } = fsmod
    const pon = (r, d) => setDoc(doc(db, r), d)
    const ts = (ms) => Timestamp.fromDate(dentroDe(ms))

    await pon('academias/INVACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/INVACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('grupos/INVGRP-A', { academiaId: 'INVACA-A', nombre: 'Gen 2026', estado: 'activo' })
    await pon('grupos/INVGRP-B', { academiaId: 'INVACA-B', nombre: 'Otra', estado: 'activo' })

    await pon('usuarios/invSuper', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/invDirA', { rol: 'admin_escuela', academiaId: 'INVACA-A', estado: 'activo' })
    await pon('usuarios/invDirB', { rol: 'admin_escuela', academiaId: 'INVACA-B', estado: 'activo' })
    await pon('usuarios/invProf', { rol: 'instructor', academiaId: 'INVACA-A', estado: 'activo' })
    // Profesor CON el acceso a códigos aprobado: el caso que hay que negar
    // explícitamente, porque ese permiso sí le abre los códigos de grupo.
    await pon('usuarios/invProfCodigos', {
      rol: 'instructor', academiaId: 'INVACA-A', estado: 'activo', puedeVerCodigos: true,
    })

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
      academiaId: 'INVACA-A', grupoId: null, creadoPor: 'invDirA', nota: '',
      estado: 'activo', dias: 14, usos: 0, maxUsos: 0, expira: ts(7 * DIA),
    }
    await pon('invitaciones/INV-ACA-A-OK01', { ...base, rol: 'alumno' })
    await pon('invitaciones/INV-ACA-P-OK02', { ...base, rol: 'instructor' })
    await pon('invitaciones/INV-ACA-D-OK03', { ...base, rol: 'admin_escuela', maxUsos: 1 })
    await pon('invitaciones/INV-ACA-A-GRUP', { ...base, rol: 'alumno', grupoId: 'INVGRP-A' })
    await pon('invitaciones/INV-ACA-P-VIEJA', { ...base, rol: 'instructor', expira: ts(-DIA) })
    await pon('invitaciones/INV-ACA-P-OFF', { ...base, rol: 'instructor', estado: 'inactivo' })
    await pon('invitaciones/INV-ACA-D-USADA', {
      ...base, rol: 'admin_escuela', maxUsos: 1, usos: 1,
    })
    await pon('invitaciones/INV-ACB-P-OTRA', { ...base, academiaId: 'INVACA-B', rol: 'instructor' })
    // Documento IMPOSIBLE de crear por reglas, sembrado a mano: si alguna vez
    // apareciera (migración, script), el canje debe seguir negándose.
    await pon('invitaciones/INV-ACA-X-SUPER', { ...base, rol: 'superadmin' })
    // Contador: una para cada prueba de incremento.
    await pon('invitaciones/INV-ACA-A-CNT1', { ...base, rol: 'alumno' })
    await pon('invitaciones/INV-ACA-A-CNT2', { ...base, rol: 'alumno' })
    await pon('invitaciones/INV-ACA-A-MIGRA', { ...base, rol: 'alumno' })
    // Emitida POR EL PROFESOR con permiso: es la única que él puede ver y tocar.
    await pon('invitaciones/INV-ACA-A-PROFE', { ...base, rol: 'alumno', creadoPor: 'invProfCodigos' })
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
      canje({ codigo: 'INV-ACA-P-OK02', academiaId: 'INVACA-A', rol: 'instructor' }))
  )
})

test('invitaciones: también la de DIRECTOR, que es la razón de todo esto', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('invitadoDir'), 'usuarios/invitadoDir'),
      canje({ codigo: 'INV-ACA-D-OK03', academiaId: 'INVACA-A', rol: 'admin_escuela' }))
  )
})

test('invitaciones: con grupo, entra al grupo de esa academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('invitadoGrupo'), 'usuarios/invitadoGrupo'),
      canje({ codigo: 'INV-ACA-A-GRUP', academiaId: 'INVACA-A', grupoId: 'INVGRP-A', rol: 'alumno' }))
  )
})

test('invitaciones: el director las crea para SU academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    setDoc(doc(como('invDirA'), 'invitaciones/INV-ACA-P-NUEVA'), {
      academiaId: 'INVACA-A', grupoId: null, rol: 'instructor', creadoPor: 'invDirA',
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
      canje({ codigo: 'INV-ACA-A-OK01', academiaId: 'INVACA-A', rol: 'admin_escuela' }))
  )
})

test('invitaciones: superadmin NO se reparte ni con el doc sembrado', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoSuper'), 'usuarios/invitadoSuper'),
      canje({ codigo: 'INV-ACA-X-SUPER', academiaId: 'INVACA-A', rol: 'superadmin' }))
  )
})

test('invitaciones: vencida, desactivada o agotada no ascienden a nadie', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoVencida'), 'usuarios/invitadoVencida'),
      canje({ codigo: 'INV-ACA-P-VIEJA', academiaId: 'INVACA-A', rol: 'instructor' }))
  )
  await assertFails(
    updateDoc(doc(como('invitadoApagada'), 'usuarios/invitadoApagada'),
      canje({ codigo: 'INV-ACA-P-OFF', academiaId: 'INVACA-A', rol: 'instructor' }))
  )
  await assertFails(
    updateDoc(doc(como('invitadoAgotada'), 'usuarios/invitadoAgotada'),
      canje({ codigo: 'INV-ACA-D-USADA', academiaId: 'INVACA-A', rol: 'admin_escuela' }))
  )
})

test('invitaciones: la de otra academia no sirve para entrar a esta', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // Invitación de ACA-B usada para meterse en ACA-A como profesor.
  await assertFails(
    updateDoc(doc(como('invitadoAjena'), 'usuarios/invitadoAjena'),
      canje({ codigo: 'INV-ACB-P-OTRA', academiaId: 'INVACA-A', rol: 'instructor' }))
  )
})

test('invitaciones: un código inventado no vale', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('invitadoOk'), 'usuarios/invitadoOk'),
      canje({ codigo: 'INV-ACA-D-NOEXISTE', academiaId: 'INVACA-A', rol: 'admin_escuela' }))
  )
})

// ---------- Quién EMITE ----------

test('invitaciones: un profesor jamás emite un ROL, ni con permiso', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertFails } = rut
  const invitacion = (rol, creadoPor) => ({
    academiaId: 'INVACA-A', grupoId: null, rol, creadoPor,
    nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 1,
    expira: Timestamp.fromDate(dentroDe(14 * DIA)),
  })
  // El caso que importa: se fabricaría la de director y ascendería solo.
  // Ni el profesor con el permiso de códigos aprobado puede repartir roles.
  await assertFails(
    setDoc(doc(como('invProfCodigos'), 'invitaciones/INV-ACA-D-PWN'), invitacion('admin_escuela', 'invProfCodigos'))
  )
  await assertFails(
    setDoc(doc(como('invProfCodigos'), 'invitaciones/INV-ACA-P-PWN'), invitacion('instructor', 'invProfCodigos'))
  )
  // Y sin el permiso no emite NADA, tampoco de alumno.
  await assertFails(
    setDoc(doc(como('invProf'), 'invitaciones/INV-ACA-A-PWN'), invitacion('alumno', 'invProf'))
  )
})

test('invitaciones: el profesor CON permiso sí invita alumnos', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertSucceeds, assertFails } = rut
  // Por qué se le deja: con `puedeVerCodigos` ya reparte el código de su
  // grupo, que mete a quien sea como alumno para siempre y sin tope. Una
  // invitación de alumno es lo mismo pero caduca y se agota.
  await assertSucceeds(
    setDoc(doc(como('invProfCodigos'), 'invitaciones/INV-ACA-A-NUEVA'), {
      academiaId: 'INVACA-A', grupoId: 'INVGRP-A', rol: 'alumno', creadoPor: 'invProfCodigos',
      nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 5,
      expira: Timestamp.fromDate(dentroDe(14 * DIA)),
    })
  )
  // Firmando con el uid de otro, no: la autoría es lo que acota su lista.
  await assertFails(
    setDoc(doc(como('invProfCodigos'), 'invitaciones/INV-ACA-A-FIRMA'), {
      academiaId: 'INVACA-A', grupoId: null, rol: 'alumno', creadoPor: 'invDirA',
      nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 1,
      expira: Timestamp.fromDate(dentroDe(14 * DIA)),
    })
  )
  // Ni para la academia de otro.
  await assertFails(
    setDoc(doc(como('invProfCodigos'), 'invitaciones/INV-ACB-A-AJENA'), {
      academiaId: 'INVACA-B', grupoId: null, rol: 'alumno', creadoPor: 'invProfCodigos',
      nota: '', estado: 'activo', dias: 14, usos: 0, maxUsos: 1,
      expira: Timestamp.fromDate(dentroDe(14 * DIA)),
    })
  )
})

test('invitaciones: el profesor solo LISTA las que él emitió', { skip }, async () => {
  await preparar()
  const { collection, query, where, getDocs } = fsmod
  const { assertFails, assertSucceeds } = rut
  const suyas = (db) => query(collection(db, 'invitaciones'), where('academiaId', '==', 'INVACA-A'))
  // La lista COMPLETA de la academia, no: incluye el enlace de DIRECTOR, y
  // poder copiarlo equivale a poder crearlo.
  await assertFails(getDocs(suyas(como('invProf'))))
  await assertFails(getDocs(suyas(como('invProfCodigos'))))
  // Filtrando por su autoría y por rol de alumno, sí: son las que emitió él.
  const mias = (db, uid) => query(
    collection(db, 'invitaciones'),
    where('academiaId', '==', 'INVACA-A'),
    where('rol', '==', 'alumno'),
    where('creadoPor', '==', uid),
  )
  await assertSucceeds(getDocs(mias(como('invProfCodigos'), 'invProfCodigos')))
  // Y no puede asomarse a las de su director cambiando el filtro.
  await assertFails(getDocs(mias(como('invProfCodigos'), 'invDirA')))
  // El profesor SIN permiso no lista ni las suyas.
  await assertFails(getDocs(mias(como('invProf'), 'invProf')))
  // El director de su academia sí.
  await assertSucceeds(getDocs(suyas(como('invDirA'))))
  // Y el de otra academia no ve las ajenas.
  await assertFails(getDocs(suyas(como('invDirB'))))
})

test('invitaciones: un director no emite para la academia de otro', { skip }, async () => {
  await preparar()
  const { doc, setDoc, Timestamp } = fsmod
  const { assertFails } = rut
  await assertFails(
    setDoc(doc(como('invDirB'), 'invitaciones/INV-ACA-P-INTRUSA'), {
      academiaId: 'INVACA-A', grupoId: null, rol: 'instructor', creadoPor: 'invDirB',
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
    academiaId: 'INVACA-A', grupoId: null, creadoPor: 'invDirA', nota: '',
    estado: 'activo', dias: 14, usos: 0, maxUsos: 0,
    expira: Timestamp.fromDate(dentroDe(14 * DIA)),
  }
  await assertFails(setDoc(doc(como('invDirA'), 'invitaciones/INV-A-X-1'), { ...base, rol: 'superadmin' }))
  await assertFails(setDoc(doc(como('invDirA'), 'invitaciones/INV-A-X-2'), {
    ...base, rol: 'alumno', expira: Timestamp.fromDate(dentroDe(-DIA)),
  }))
  await assertFails(setDoc(doc(como('invDirA'), 'invitaciones/INV-A-X-3'), {
    ...base, rol: 'alumno', usos: 99,
  }))
  // Grupo de OTRA academia.
  await assertFails(setDoc(doc(como('invDirA'), 'invitaciones/INV-A-X-4'), {
    ...base, rol: 'alumno', grupoId: 'INVGRP-B',
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
    updateDoc(doc(como('invDirA'), 'invitaciones/INV-ACA-A-OK01'), { rol: 'admin_escuela' })
  )
  // Desactivarla sí, que es la vía correcta.
  await assertSucceeds(
    updateDoc(doc(como('invDirA'), 'invitaciones/INV-ACA-A-OK01'), { estado: 'inactivo' })
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
    updateDoc(doc(como('invSuper'), 'invitaciones/INV-ACA-A-MIGRA'), { academiaId: 'INVACA-B' })
  )
  // El director NO: para él la academia sigue siendo inmutable.
  await assertFails(
    updateDoc(doc(como('invDirA'), 'invitaciones/INV-ACA-A-CNT1'), { academiaId: 'INVACA-B' })
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
