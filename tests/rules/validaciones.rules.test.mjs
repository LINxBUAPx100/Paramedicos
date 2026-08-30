// ============================================================
//  Pruebas de REGLAS — validaciones docentes del temario
// ------------------------------------------------------------
//  `validaciones/{academiaId}` es la capa que decide qué lecciones están
//  avaladas. Escribir ahí quita el aviso de «contenido en revisión» y abre el
//  banco de examen, así que la frontera importa: solo el staff de ESA academia,
//  y el super-admin para la plantilla global.
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

const FIRMA = {
  temas: {
    't1': { estado: 'validado', revisadoPor: 'Dra. Ana Ruiz', fecha: '2026-08-30', fuentes: ['AHA 2025.'] },
  },
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
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profB', { rol: 'instructor', academiaId: 'ACA-B', estado: 'activo' })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1' })
    await pon('validaciones/ACA-A', FIRMA)
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()
const sinSesion = () => env.unauthenticatedContext().firestore()

after(async () => {
  if (env) await env.cleanup()
})

test('el estado validado se lee sin sesión: es la etiqueta del lector', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(sinSesion(), 'validaciones/ACA-A')))
  await assertSucceeds(getDoc(doc(como('alumA'), 'validaciones/ACA-A')))
})

test('el staff de la academia valida su propio temario', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut
  // El profesor con pase y el director: los dos firman. Que el pase esté
  // vigente lo comprueba la aplicación; aquí la frontera es la academia.
  await assertSucceeds(setDoc(doc(como('profA'), 'validaciones/ACA-A'), FIRMA, { merge: true }))
  await assertSucceeds(setDoc(doc(como('dirA'), 'validaciones/ACA-A'), FIRMA, { merge: true }))
})

test('nadie valida el temario de OTRA academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('profB'), 'validaciones/ACA-A'), FIRMA, { merge: true }))
  await assertFails(setDoc(doc(como('dirA'), 'validaciones/ACA-B'), FIRMA, { merge: true }))
})

test('un alumno no se valida a sí mismo el contenido ni el examen', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  // La escalación evidente: validar abre el banco de examen, así que un alumno
  // que pudiera escribir aquí se abriría solo los exámenes que quisiera.
  await assertFails(setDoc(doc(como('alumA'), 'validaciones/ACA-A'), FIRMA, { merge: true }))
  await assertFails(setDoc(doc(sinSesion(), 'validaciones/ACA-A'), FIRMA, { merge: true }))
})

test('la plantilla global solo la firma el super-admin', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(setDoc(doc(como('super1'), 'validaciones/_plataforma'), FIRMA, { merge: true }))
  await assertFails(setDoc(doc(como('dirA'), 'validaciones/_plataforma'), FIRMA, { merge: true }))
  await assertFails(setDoc(doc(como('profA'), 'validaciones/_plataforma'), FIRMA, { merge: true }))
  // Y el super-admin entra en cualquier academia, como en el resto de la app.
  await assertSucceeds(setDoc(doc(como('super1'), 'validaciones/ACA-B'), FIRMA, { merge: true }))
})
