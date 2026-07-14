// ============================================================
//  Pruebas de REGLAS de Storage — aislamiento de archivos (Fase 4)
// ------------------------------------------------------------
//  Requieren los emuladores de Firestore Y Storage (Java + firebase-tools):
//
//    npm run test:rules
//    (equivale a: firebase emulators:exec --only firestore,storage
//                 --project ptem-rules-test "node --test tests/rules/*.test.mjs")
//
//  Las reglas de Storage consultan Firestore (roles/planes), por eso ambos
//  emuladores. Sin emulador la suite se OMITE con el motivo (nunca falso verde).
// ============================================================
import { test, after } from 'node:test'
import { readFileSync } from 'node:fs'

const FS_HOST = process.env.FIRESTORE_EMULATOR_HOST
const ST_HOST = process.env.FIREBASE_STORAGE_EMULATOR_HOST || process.env.STORAGE_EMULATOR_HOST
let rut = null
try {
  rut = await import('@firebase/rules-unit-testing')
} catch {
  /* dependencia ausente: se reporta vía skip */
}

const skip = !FS_HOST || !ST_HOST
  ? 'Requiere los emuladores de Firestore y Storage: npm run test:rules'
  : !rut
    ? 'Falta @firebase/rules-unit-testing: npm i -D @firebase/rules-unit-testing firebase-tools'
    : false

let env = null
let st = null

const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]) // '%PDF-'

async function preparar() {
  if (env) return env
  st = await import('firebase/storage')
  const fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: process.env.GCLOUD_PROJECT || 'ptem-rules-test',
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
    storage: { rules: readFileSync(new URL('../../storage.rules', import.meta.url), 'utf8') },
  })
  // Roles y academias en Firestore (las reglas de Storage los consultan).
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    await setDoc(doc(db, 'academias/ACA-A'), { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await setDoc(doc(db, 'academias/ACA-B'), { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await setDoc(doc(db, 'academias/ACA-C'), { nombre: 'C', estado: 'activo', planComercial: 'base' })
    await setDoc(doc(db, 'usuarios/super1'), { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await setDoc(doc(db, 'usuarios/dirA'), { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await setDoc(doc(db, 'usuarios/dirC'), { rol: 'admin_escuela', academiaId: 'ACA-C', estado: 'activo' })
    await setDoc(doc(db, 'usuarios/profA'), {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      permisosEditor: { editarContenido: true, cursosPermitidos: ['ACA-A__tum'] },
    })
    await setDoc(doc(db, 'usuarios/profA2'), { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await setDoc(doc(db, 'usuarios/alumA'), { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo' })
    await setDoc(doc(db, 'usuarios/alumB'), { rol: 'alumno', academiaId: 'ACA-B', estado: 'activo' })
  })
  // Un archivo ya existente en A (sembrado SIN reglas) para probar lecturas.
  await env.withSecurityRulesDisabled(async (ctx) => {
    const { ref, uploadBytes } = st
    await uploadBytes(ref(ctx.storage(), 'academias/ACA-A/archivos/existente.pdf'), PDF, {
      contentType: 'application/pdf',
    })
  })
  return env
}

const almacenDe = (uid) => env.authenticatedContext(uid).storage()

after(async () => {
  if (env) await env.cleanup()
})

test('storage: el editor sube a SU academia; nunca a otra', { skip }, async () => {
  await preparar()
  const { ref, uploadBytes } = st
  const { assertSucceeds, assertFails } = rut
  const meta = { contentType: 'application/pdf' }
  await assertSucceeds(uploadBytes(ref(almacenDe('dirA'), 'academias/ACA-A/archivos/guia.pdf'), PDF, meta))
  await assertSucceeds(uploadBytes(ref(almacenDe('profA'), 'academias/ACA-A/imagenes/foto.png'), PDF, { contentType: 'image/png' }))
  await assertFails(uploadBytes(ref(almacenDe('dirA'), 'academias/ACA-B/archivos/intruso.pdf'), PDF, meta))
  // El super-admin sí puede operar cualquier academia.
  await assertSucceeds(uploadBytes(ref(almacenDe('super1'), 'academias/ACA-B/archivos/ok-super.pdf'), PDF, meta))
})

test('storage: director BASE, profesor sin permisos y alumnos no suben', { skip }, async () => {
  await preparar()
  const { ref, uploadBytes } = st
  const { assertFails } = rut
  const meta = { contentType: 'application/pdf' }
  await assertFails(uploadBytes(ref(almacenDe('dirC'), 'academias/ACA-C/archivos/base.pdf'), PDF, meta))
  await assertFails(uploadBytes(ref(almacenDe('profA2'), 'academias/ACA-A/archivos/sinpermiso.pdf'), PDF, meta))
  await assertFails(uploadBytes(ref(almacenDe('alumA'), 'academias/ACA-A/archivos/alumno.pdf'), PDF, meta))
})

test('storage: tipos fuera de la allowlist (ejecutables) se rechazan', { skip }, async () => {
  await preparar()
  const { ref, uploadBytes } = st
  const { assertFails } = rut
  await assertFails(uploadBytes(ref(almacenDe('dirA'), 'academias/ACA-A/archivos/virus.exe'), PDF, {
    contentType: 'application/x-msdownload',
  }))
  await assertFails(uploadBytes(ref(almacenDe('dirA'), 'academias/ACA-A/archivos/pagina.html'), PDF, {
    contentType: 'text/html',
  }))
  // Carpeta desconocida → rechazada aunque el tipo sea válido.
  await assertFails(uploadBytes(ref(almacenDe('dirA'), 'academias/ACA-A/otra/x.pdf'), PDF, {
    contentType: 'application/pdf',
  }))
})

test('storage: leer solo lo de TU academia (alumno A sí; alumno B no)', { skip }, async () => {
  await preparar()
  const { ref, getBytes } = st
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getBytes(ref(almacenDe('alumA'), 'academias/ACA-A/archivos/existente.pdf')))
  await assertSucceeds(getBytes(ref(almacenDe('super1'), 'academias/ACA-A/archivos/existente.pdf')))
  await assertFails(getBytes(ref(almacenDe('alumB'), 'academias/ACA-A/archivos/existente.pdf')))
  await assertFails(getBytes(ref(env.unauthenticatedContext().storage(), 'academias/ACA-A/archivos/existente.pdf')))
})

test('storage: fuera de academias/** todo está cerrado', { skip }, async () => {
  await preparar()
  const { ref, uploadBytes, getBytes } = st
  const { assertFails } = rut
  await assertFails(uploadBytes(ref(almacenDe('super1'), 'publico/x.pdf'), PDF, { contentType: 'application/pdf' }))
  await assertFails(getBytes(ref(almacenDe('dirA'), 'publico/x.pdf')))
})

test('storage: el editor puede borrar adjuntos de SU academia; otros no', { skip }, async () => {
  await preparar()
  const { ref, uploadBytes, deleteObject } = st
  const { assertSucceeds, assertFails } = rut
  await uploadBytes(ref(almacenDe('dirA'), 'academias/ACA-A/archivos/borrable.pdf'), PDF, { contentType: 'application/pdf' })
  await assertFails(deleteObject(ref(almacenDe('alumA'), 'academias/ACA-A/archivos/borrable.pdf')))
  await assertSucceeds(deleteObject(ref(almacenDe('dirA'), 'academias/ACA-A/archivos/borrable.pdf')))
})
