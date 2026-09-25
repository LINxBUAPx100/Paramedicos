// ============================================================
//  Pruebas de REGLAS — validaciones docentes del temario
// ------------------------------------------------------------
//  `validaciones/{academiaId}` es la capa que decide qué lecciones están
//  avaladas. Escribir ahí quita el aviso de «contenido en revisión» y abre el
//  banco de examen, así que la frontera importa.
//
//  Hasta el 19-09-2026 bastaba ser staff de la academia: el pase de revisor
//  solo lo miraba la aplicación, y cualquier profesor podía firmar —o borrar
//  todas las firmas— con el SDK (auditoría de riesgos, hallazgo R04). Ahora
//  firma el director, el profesor con pase vigente o con permiso de publicar,
//  y el super-admin; cada escritura toca un tema y lleva el uid de quien firma.
//
//  Leer es abierto a propósito: el estado editorial es una etiqueta dirigida a
//  quien lee la lección, y el temario se sirve también sin sesión.
//
//  Requieren el emulador de Firestore (Java):  npm run test:rules
//  Sin emulador la suite se OMITE (skip); nunca da falso verde.
// ============================================================
import { test, after } from 'node:test'
import { readFileSync } from 'node:fs'

const HOST = process.env.FIRESTORE_EMULATOR_HOST
let rut = null
try {
  rut = await import('@firebase/rules-unit-testing')
} catch {
  /* dependencia ausente: se reporta vía skip */
}

const skip = !HOST
  ? 'Requiere el emulador de Firestore: npm run test:rules'
  : !rut
    ? 'Falta @firebase/rules-unit-testing: npm i -D @firebase/rules-unit-testing firebase-tools'
    : false

let env = null
let fsmod = null

const dia = (desplazamiento) =>
  new Date(Date.now() + desplazamiento * 86400000).toISOString().slice(0, 10)

// Firma ya aplicada por dirA en la semilla, para probar quién la retira.
const SEMILLA = {
  academiaId: 'ACA-A',
  temas: {
    t1: { estado: 'validado', revisadoPor: 'Dra. Ana Ruiz', fecha: '2026-08-30', fuentes: ['AHA 2025.'], uid: 'dirA' },
    tProf: { estado: 'validado', revisadoPor: 'Prof. Pase', fecha: '2026-09-01', fuentes: ['x'], uid: 'profPase' },
  },
}

// Lo que escribe validarTema() en lib/firebase/validaciones.js.
function firma(uid, temaId, academiaId = 'ACA-A') {
  return {
    academiaId,
    temas: {
      [temaId]: {
        estado: 'validado', revisadoPor: `Firma de ${uid}`, comentario: '',
        fuentes: ['AHA 2025.'], fecha: '2026-09-25', uid, nombre: uid,
      },
    },
    actualizado: fsmod.serverTimestamp(),
    ultimoTema: temaId,
    ultimoUid: uid,
  }
}
// Lo que escribe retirarValidacionTema().
function retiro(uid, temaId, academiaId = 'ACA-A') {
  return {
    academiaId,
    temas: { [temaId]: fsmod.deleteField() },
    actualizado: fsmod.serverTimestamp(),
    ultimoTema: temaId,
    ultimoUid: uid,
  }
}

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-validaciones`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'base' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'base' })
    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    // Profesor SIN pase: es staff, pero no firma.
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profPase', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      revisorTemporal: { hasta: dia(10), otorgadoPor: 'dirA', otorgadoEn: dia(-5), nota: '' },
    })
    // El pase vence HOY: la aplicación lo da por vigente todo el día.
    await pon('usuarios/profHoy', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      revisorTemporal: { hasta: dia(0), otorgadoPor: 'dirA', otorgadoEn: dia(-5), nota: '' },
    })
    await pon('usuarios/profVencido', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      revisorTemporal: { hasta: dia(-3), otorgadoPor: 'dirA', otorgadoEn: dia(-30), nota: '' },
    })
    // Quien puede publicar, con más razón puede firmar (puedeRevisar()).
    await pon('usuarios/profPub', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      permisosEditor: { publicarContenido: true },
    })
    await pon('usuarios/profB', {
      rol: 'instructor', academiaId: 'ACA-B', estado: 'activo',
      revisorTemporal: { hasta: dia(10), otorgadoPor: 'dirB', otorgadoEn: dia(-5), nota: '' },
    })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1' })
    await pon('validaciones/ACA-A', SEMILLA)
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()
const sinSesion = () => env.unauthenticatedContext().firestore()
const ref = (db, id = 'ACA-A') => fsmod.doc(db, `validaciones/${id}`)

after(async () => {
  if (env) await env.cleanup()
})

test('el estado validado se lee sin sesión: es la etiqueta del lector', { skip }, async () => {
  await preparar()
  const { getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(ref(sinSesion())))
  await assertSucceeds(getDoc(ref(como('alumA'))))
})

test('firman el director y el profesor con pase vigente o permiso de publicar', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(setDoc(ref(como('dirA')), firma('dirA', 'tDir'), { merge: true }))
  await assertSucceeds(setDoc(ref(como('profPase')), firma('profPase', 'tPase'), { merge: true }))
  await assertSucceeds(setDoc(ref(como('profHoy')), firma('profHoy', 'tHoy'), { merge: true }))
  await assertSucceeds(setDoc(ref(como('profPub')), firma('profPub', 'tPub'), { merge: true }))
})

test('R04: un profesor SIN pase no firma, aunque sea staff de la academia', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(ref(como('profA')), firma('profA', 'tX'), { merge: true }))
})

test('R04: un pase vencido no firma', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(ref(como('profVencido')), firma('profVencido', 'tX'), { merge: true }))
})

test('R04: nadie firma en nombre de otro', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  // La entrada dice que firmó el director, pero escribe el profesor.
  const ajena = firma('dirA', 'tX')
  ajena.ultimoUid = 'profPase'
  await assertFails(setDoc(ref(como('profPase')), ajena, { merge: true }))
  // Y al revés: declara ser él, pero la entrada lleva el uid de otro.
  const mezclada = firma('profPase', 'tX')
  mezclada.temas.tX.uid = 'dirA'
  await assertFails(setDoc(ref(como('profPase')), mezclada, { merge: true }))
})

test('R04: una escritura toca UN tema, el que declara', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  const dos = firma('profPase', 'tA')
  dos.temas.tB = { ...dos.temas.tA }
  await assertFails(setDoc(ref(como('profPase')), dos, { merge: true }))
  // Declara uno y escribe otro.
  const cambiado = firma('profPase', 'tA')
  cambiado.ultimoTema = 'tOtro'
  await assertFails(setDoc(ref(como('profPase')), cambiado, { merge: true }))
})

test('R04: el estado firmado es del catálogo y la fecha del servidor', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  const raro = firma('profPase', 'tX')
  raro.temas.tX.estado = 'aprobadisimo'
  await assertFails(setDoc(ref(como('profPase')), raro, { merge: true }))
  const fechado = firma('profPase', 'tX')
  fechado.actualizado = new Date('2020-01-01')
  await assertFails(setDoc(ref(como('profPase')), fechado, { merge: true }))
  const extra = firma('profPase', 'tX')
  extra.bancoAbierto = true
  await assertFails(setDoc(ref(como('profPase')), extra, { merge: true }))
})

test('R04: el profesor retira SU firma, no la de otro; el director retira cualquiera', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  // t1 lo firmó el director: el profesor con pase no lo tumba.
  await assertFails(setDoc(ref(como('profPase')), retiro('profPase', 't1'), { merge: true }))
  // tProf lo firmó él mismo: sí.
  await assertSucceeds(setDoc(ref(como('profPase')), retiro('profPase', 'tProf'), { merge: true }))
  // El director responde por el temario de su academia entero.
  await assertSucceeds(setDoc(ref(como('dirA')), retiro('dirA', 't1'), { merge: true }))
})

test('R04: borrar el documento entero de firmas es solo del super-admin', { skip }, async () => {
  await preparar()
  const { deleteDoc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertFails(deleteDoc(ref(como('profPase'))))
  await assertFails(deleteDoc(ref(como('dirA'))))
  // Tampoco sobrescribiéndolo sin merge: cambiaría todos los temas a la vez.
  await assertFails(setDoc(ref(como('dirA')), firma('dirA', 'tSolo')))
  await assertSucceeds(deleteDoc(ref(como('super1'))))
})

test('nadie valida el temario de OTRA academia', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(ref(como('profB')), firma('profB', 'tX'), { merge: true }))
  await assertFails(setDoc(ref(como('dirA'), 'ACA-B'), firma('dirA', 'tX', 'ACA-B'), { merge: true }))
  // Ni colando otra academia en el campo de su propio documento.
  await assertFails(setDoc(ref(como('dirA')), firma('dirA', 'tX', 'ACA-B'), { merge: true }))
})

test('un alumno no se valida a sí mismo el contenido ni el examen', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertFails } = rut
  // La escalación evidente: validar abre el banco de examen, así que un alumno
  // que pudiera escribir aquí se abriría solo los exámenes que quisiera.
  await assertFails(setDoc(ref(como('alumA')), firma('alumA', 'tX'), { merge: true }))
  await assertFails(setDoc(ref(sinSesion()), firma('anon', 'tX'), { merge: true }))
})

test('la plantilla global solo la firma el super-admin', { skip }, async () => {
  await preparar()
  const { setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const global = (uid) => ({ ...firma(uid, 'tG', null) })
  await assertSucceeds(setDoc(ref(como('super1'), '_plataforma'), global('super1'), { merge: true }))
  await assertFails(setDoc(ref(como('dirA'), '_plataforma'), global('dirA'), { merge: true }))
  await assertFails(setDoc(ref(como('profPase'), '_plataforma'), global('profPase'), { merge: true }))
  // Y el super-admin entra en cualquier academia, como en el resto de la app.
  await assertSucceeds(setDoc(ref(como('super1'), 'ACA-B'), firma('super1', 'tG', 'ACA-B'), { merge: true }))
})
