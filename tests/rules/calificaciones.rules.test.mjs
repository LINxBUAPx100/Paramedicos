// ============================================================
//  Pruebas de REGLAS — libro de calificaciones
// ------------------------------------------------------------
//  Lo que se protege: que un alumno NO vea las notas de otro, que no se
//  califique a sí mismo, y que el staff no pueda escribir una nota fuera de
//  escala ni moverla de alumno. Sin emulador la suite se OMITE con el motivo.
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

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    // Cada archivo de reglas corre en su PROPIO proyecto del emulador. Sin
    // esto todos compartían dataset y `node --test` los ejecuta en paralelo:
    // el fixture de un archivo pisaba el de otro (p. ej. calificaciones sembraba
    // usuarios/alumA SIN grupoId y borraba el grupo que contenido necesitaba),
    // así que una prueba pasaba o fallaba según quién escribiera último.
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-calificaciones`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (r, d) => setDoc(doc(db, r), d)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('usuarios/superX', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/otroA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/alumB', { rol: 'alumno', academiaId: 'ACA-B', estado: 'activo' })
    await pon('evaluaciones/ev1', {
      academiaId: 'ACA-A', grupoId: 'G1', titulo: 'Parcial 1', ponderacion: 1,
      escala: 100, creadoPor: 'profA',
    })
    await pon('calificaciones/ev1__alumA', {
      evaluacionId: 'ev1', academiaId: 'ACA-A', grupoId: 'G1', uid: 'alumA',
      valor: 80, calificadoPor: 'profA',
    })
    await pon('calificaciones/ev1__otroA', {
      evaluacionId: 'ev1', academiaId: 'ACA-A', grupoId: 'G1', uid: 'otroA',
      valor: 45, calificadoPor: 'profA',
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()
after(async () => { if (env) await env.cleanup() })

test('el alumno lee SU nota y no la de otro', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'calificaciones/ev1__alumA')))
  // La línea que de verdad importa de todo el bloque.
  await assertFails(getDoc(doc(como('alumA'), 'calificaciones/ev1__otroA')))
})

test('el alumno NO se califica a sí mismo', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('alumA'), 'calificaciones/ev1__alumA'), { valor: 100 }))
  await assertFails(setDoc(doc(como('alumA'), 'calificaciones/ev1__nueva'), {
    evaluacionId: 'ev1', academiaId: 'ACA-A', uid: 'alumA', valor: 100, calificadoPor: 'alumA',
  }))
})

test('el profesor califica a su alumno', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(setDoc(doc(como('profA'), 'calificaciones/ev1__nuevo'), {
    evaluacionId: 'ev1', academiaId: 'ACA-A', grupoId: 'G1', uid: 'otroA',
    valor: 90, calificadoPor: 'profA',
  }))
  await assertSucceeds(updateDoc(doc(como('profA'), 'calificaciones/ev1__alumA'), { valor: 85 }))
})

test('una nota fuera de escala se rechaza en el SERVIDOR', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut
  const fuera = [101, -1, 70.5, '90', null]
  for (let i = 0; i < fuera.length; i++) {
    await assertFails(setDoc(doc(como('profA'), 'calificaciones/ev1__fuera' + i), {
      evaluacionId: 'ev1', academiaId: 'ACA-A', uid: 'otroA', valor: fuera[i], calificadoPor: 'profA',
    }))
  }
  await assertFails(updateDoc(doc(como('profA'), 'calificaciones/ev1__alumA'), { valor: 120 }))
})

test('corregir una nota no la mueve de alumno ni de evaluación', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('profA'), 'calificaciones/ev1__alumA'), { uid: 'otroA' }))
  await assertFails(updateDoc(doc(como('profA'), 'calificaciones/ev1__alumA'), { evaluacionId: 'ev2' }))
  await assertFails(updateDoc(doc(como('profA'), 'calificaciones/ev1__alumA'), { academiaId: 'ACA-B' }))
})

test('quien es de OTRA academia no ve ni escribe estas notas', { skip }, async () => {
  await preparar()
  const { doc, getDoc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(getDoc(doc(como('alumB'), 'calificaciones/ev1__alumA')))
  await assertFails(updateDoc(doc(como('alumB'), 'calificaciones/ev1__alumA'), { valor: 10 }))
})

test('el alumno ve la EVALUACIÓN (título y fecha) de su academia', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'evaluaciones/ev1')))
  await assertFails(getDoc(doc(como('alumB'), 'evaluaciones/ev1')))
})

test('el alumno no crea ni borra evaluaciones', { skip }, async () => {
  await preparar()
  const { doc, setDoc, deleteDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('alumA'), 'evaluaciones/mia'), {
    academiaId: 'ACA-A', titulo: 'Regalo', ponderacion: 1, creadoPor: 'alumA',
  }))
  await assertFails(deleteDoc(doc(como('alumA'), 'evaluaciones/ev1')))
})

test('borrar una evaluación es del DIRECTOR, no del profesor', { skip }, async () => {
  await preparar()
  const { doc, deleteDoc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  // Borrarla tira todas sus notas: no es una operación de rutina.
  await assertFails(deleteDoc(doc(como('profA'), 'evaluaciones/ev1')))
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'evaluaciones/ev-borrable'), {
      academiaId: 'ACA-A', titulo: 'Temporal', ponderacion: 1, creadoPor: 'profA',
    })
  })
  await assertSucceeds(deleteDoc(doc(como('dirA'), 'evaluaciones/ev-borrable')))
})

test('una evaluación sin título o con ponderación inválida no se crea', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('profA'), 'evaluaciones/malA'), {
    academiaId: 'ACA-A', titulo: '', ponderacion: 1, creadoPor: 'profA',
  }))
  await assertFails(setDoc(doc(como('profA'), 'evaluaciones/malB'), {
    academiaId: 'ACA-A', titulo: 'X', ponderacion: 0, creadoPor: 'profA',
  }))
  // Y no puede firmar como otro.
  await assertFails(setDoc(doc(como('profA'), 'evaluaciones/malC'), {
    academiaId: 'ACA-A', titulo: 'X', ponderacion: 1, creadoPor: 'dirA',
  }))
})
