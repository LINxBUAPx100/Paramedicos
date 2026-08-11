// ============================================================
//  Pruebas de REGLAS — capacidades de la academia (Firestore + Storage)
// ------------------------------------------------------------
//  Fija el bug que encontró la auditoría: `academiaEditaContenido()` estaba
//  escrita DOS veces con cuerpos distintos.
//
//    firestore.rules → tipo 'avanzado' fuerza plan 'pro'
//    storage.rules   → miraba planComercial a secas
//
//  Resultado: una academia de tipo 'avanzado' con planComercial 'base' podía
//  editar su contenido pero no subir un solo archivo. El director veía el
//  editor completo, arrastraba un PDF y recibía un error de permisos.
//
//  También cubre el mapa de EXCEPCIONES (academias/{id}.capacidades), que la
//  UI aplicaba (src/lib/capacidades.js) y las reglas ignoraban por completo.
//
//  Requieren los emuladores de Firestore y Storage: npm run test:rules
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
let fsmod = null
let st = null

const PDF = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]) // '%PDF-'
const META = { contentType: 'application/pdf' }

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  st = await import('firebase/storage')
  env = await rut.initializeTestEnvironment({
    projectId: process.env.GCLOUD_PROJECT || 'ptem-rules-test',
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
    storage: { rules: readFileSync(new URL('../../storage.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)

    // EL CASO DEL BUG: avanzado + base. El plan efectivo es 'pro' porque el
    // tipo lo fuerza, así que debe poder editar Y subir.
    await pon('academias/AVANZADA', { nombre: 'Av', estado: 'activo', tipo: 'avanzado', planComercial: 'base' })
    // Plan base de verdad: no edita ni sube.
    await pon('academias/BASICA', { nombre: 'Ba', estado: 'activo', tipo: 'basico', planComercial: 'base' })
    // Plan pro con una EXCEPCIÓN que le apaga el editor.
    await pon('academias/PROSIN', {
      nombre: 'Pro sin editor', estado: 'activo', tipo: 'basico', planComercial: 'pro',
      capacidades: { editorContenido: false },
    })
    // Plan base con una EXCEPCIÓN que le enciende el editor.
    await pon('academias/BASECON', {
      nombre: 'Base con editor', estado: 'activo', tipo: 'basico', planComercial: 'base',
      capacidades: { editorContenido: true },
    })

    for (const [uid, aca] of [
      ['dirAvanzada', 'AVANZADA'], ['dirBasica', 'BASICA'],
      ['dirProSin', 'PROSIN'], ['dirBaseCon', 'BASECON'],
    ]) {
      await pon(`usuarios/${uid}`, { rol: 'admin_escuela', academiaId: aca, estado: 'activo' })
      await pon(`cursos/${aca}__tum`, {
        academiaId: aca, plantillaId: 'tum', titulo: 'TUM', estado: 'publicado',
        version: 1, creadoPor: 'seed', estructura: [],
      })
    }
  })
  return env
}

const comoFs = (uid) => env.authenticatedContext(uid).firestore()
const comoSt = (uid) => env.authenticatedContext(uid).storage()

after(async () => {
  if (env) await env.cleanup()
})

// ---------- el bug de divergencia ----------

test('avanzado+base: el director edita contenido (Firestore)', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(comoFs('dirAvanzada'), 'cursos/AVANZADA__tum'), { titulo: 'TUM v2', version: 2 })
  )
})

test('avanzado+base: el director TAMBIÉN sube archivos (Storage)', { skip }, async () => {
  await preparar()
  const { ref, uploadBytes } = st
  const { assertSucceeds } = rut
  // Este es el caso que fallaba: mismo director, misma academia, editaba pero
  // no podía subir. Si esta prueba se pone en rojo, storage.rules volvió a
  // divergir de firestore.rules.
  await assertSucceeds(
    uploadBytes(ref(comoSt('dirAvanzada'), 'academias/AVANZADA/archivos/guia.pdf'), PDF, META)
  )
})

test('basico+base: ni edita ni sube', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { ref, uploadBytes } = st
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(comoFs('dirBasica'), 'cursos/BASICA__tum'), { titulo: 'no', version: 2 })
  )
  await assertFails(
    uploadBytes(ref(comoSt('dirBasica'), 'academias/BASICA/archivos/guia.pdf'), PDF, META)
  )
})

// ---------- excepciones por academia ----------

test('excepción que APAGA el editor gana al plan pro', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { ref, uploadBytes } = st
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(comoFs('dirProSin'), 'cursos/PROSIN__tum'), { titulo: 'no', version: 2 })
  )
  await assertFails(
    uploadBytes(ref(comoSt('dirProSin'), 'academias/PROSIN/archivos/guia.pdf'), PDF, META)
  )
})

test('excepción que ENCIENDE el editor gana al plan base', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { ref, uploadBytes } = st
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(comoFs('dirBaseCon'), 'cursos/BASECON__tum'), { titulo: 'TUM v2', version: 2 })
  )
  await assertSucceeds(
    uploadBytes(ref(comoSt('dirBaseCon'), 'academias/BASECON/archivos/guia.pdf'), PDF, META)
  )
})
