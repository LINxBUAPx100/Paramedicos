// ============================================================
//  Pruebas de REGLAS — errores de cálculo del entrenador (PTEM Pulso)
// ------------------------------------------------------------
//  Lo que se protege: que cada alumno escriba SOLO su documento, con su
//  academia y su grupo reales y sin datos de más; que el staff de su academia
//  pueda leerlo y nadie más. Sin emulador la suite se OMITE con el motivo.
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
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-errores-calculo`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (r, d) => setDoc(doc(db, r), d)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('usuarios/superX', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profB', { rol: 'instructor', academiaId: 'ACA-B', estado: 'activo' })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', grupoId: 'G1', estado: 'activo' })
    await pon('usuarios/otroA', { rol: 'alumno', academiaId: 'ACA-A', grupoId: 'G1', estado: 'activo' })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()
after(async () => { if (env) await env.cleanup() })

const valido = (fs, extra = {}) => ({
  uid: 'alumA', academiaId: 'ACA-A', grupoId: 'G1', errores: { unidades: 3, tiempo: 1 },
  actualizado: fs.serverTimestamp(), ...extra,
})

test('el alumno escribe SU documento con su academia y su grupo', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod)))
  // Y lo actualiza.
  await assertSucceeds(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { errores: { unidades: 4, tiempo: 1, peso: 2 } })))
})

test('nadie escribe el documento de otro ni se cuelga de otro grupo o academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('otroA'), 'erroresCalculo/alumA'), valido(fsmod)))
  await assertFails(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { grupoId: 'G2' })))
  await assertFails(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { academiaId: 'ACA-B' })))
})

test('solo cuentas de errores conocidos, enteras y sin campos de más', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { errores: { inventado: 1 } })))
  await assertFails(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { errores: { unidades: 'mucho' } })))
  await assertFails(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { errores: { unidades: -1 } })))
  await assertFails(setDoc(doc(como('alumA'), 'erroresCalculo/alumA'), valido(fsmod, { respuestas: ['0.5 mL'] })))
})

test('lo lee el staff de su academia; no el alumno de al lado ni otra academia', { skip }, async () => {
  await preparar()
  await env.withSecurityRulesDisabled(async (ctx) => {
    const { doc, setDoc } = fsmod
    await setDoc(doc(ctx.firestore(), 'erroresCalculo/alumA'), { uid: 'alumA', academiaId: 'ACA-A', grupoId: 'G1', errores: { unidades: 2 } })
  })
  const { doc, getDoc, collection, query, where, getDocs } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'erroresCalculo/alumA')))
  await assertSucceeds(getDoc(doc(como('profA'), 'erroresCalculo/alumA')))
  await assertSucceeds(getDocs(query(collection(como('profA'), 'erroresCalculo'), where('academiaId', '==', 'ACA-A'), where('grupoId', '==', 'G1'))))
  await assertSucceeds(getDoc(doc(como('superX'), 'erroresCalculo/alumA')))
  await assertFails(getDoc(doc(como('otroA'), 'erroresCalculo/alumA')))
  await assertFails(getDoc(doc(como('profB'), 'erroresCalculo/alumA')))
  await assertFails(getDocs(query(collection(como('profB'), 'erroresCalculo'), where('academiaId', '==', 'ACA-A'))))
})
