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
    // Los demás archivos de reglas corren cada uno en su PROPIO proyecto para
    // no pisarse los fixtures. Este NO puede: el emulador de Storage solo sirve
    // el bucket por defecto del proyecto que recibe `emulators:exec`, así que
    // con un projectId propio `ctx.storage()` apunta a un bucket inexistente.
    // Se queda en el proyecto base, que comparte solo con capacidades/storage;
    // sus fixtures son disjuntos a propósito (academias y uids distintos) y hay
    // que mantenerlos así al añadir casos.
    //
    // Y HAY UN SEGUNDO PELIGRO, que costó un rato encontrar: `test:rules` corre
    // con --test-concurrency=1. No es por lentitud ni por los fixtures.
    // `withSecurityRulesDisabled` NO abre una sesión privilegiada: sustituye
    // las reglas del proyecto por allow-all y las restaura al salir. Con dos
    // suites del MISMO proyecto en paralelo, una restaura las reglas mientras
    // la otra sigue dentro de su bloque, y el sembrado se cae con
    // `storage/unauthorized`. Se veía como tres pruebas rojas de Storage que
    // pasaban en verde al correr el archivo solo — el peor síntoma posible.
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

// ---------- activar la copia editable (director) ----------
//  El director no podía escribir `academias/{id}.contenido`, así que el editor
//  le enseñaba «pide al administrador de la plataforma» y ahí se acababa: no
//  había forma de encender su propia copia sin el super-admin. Estas pruebas
//  fijan que ahora puede, y que sigue sin poder colar nada más por esa puerta.

test('el director con editor ACTIVA la copia editable de su academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(comoFs('dirAvanzada'), 'academias/AVANZADA'), {
      contenido: { estado: 'migrando', plantillaId: 'tum', version: 1 },
    })
  )
  await assertSucceeds(
    updateDoc(doc(comoFs('dirAvanzada'), 'academias/AVANZADA'), {
      contenido: { estado: 'migrado', plantillaId: 'tum', version: 1 },
    })
  )
})

test('sin capacidad de editor, no puede activarla', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // Plan base de verdad...
  await assertFails(
    updateDoc(doc(comoFs('dirBasica'), 'academias/BASICA'), {
      contenido: { estado: 'migrando', plantillaId: 'tum', version: 1 },
    })
  )
  // ...y plan pro con el editor apagado por excepción.
  await assertFails(
    updateDoc(doc(comoFs('dirProSin'), 'academias/PROSIN'), {
      contenido: { estado: 'migrando', plantillaId: 'tum', version: 1 },
    })
  )
})

test('activar la copia no es una puerta para tocar otros campos', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // El plan y el estado comercial siguen siendo del super-admin: si `hasOnly`
  // se relajara, un director se ascendería de plan en la misma escritura.
  await assertFails(
    updateDoc(doc(comoFs('dirAvanzada'), 'academias/AVANZADA'), {
      contenido: { estado: 'migrado', plantillaId: 'tum', version: 1 },
      planComercial: 'pro',
    })
  )
  // Un estado inventado tampoco: los únicos que produce la clonación son
  // migrando | migrado | error.
  await assertFails(
    updateDoc(doc(comoFs('dirAvanzada'), 'academias/AVANZADA'), {
      contenido: { estado: 'lo-que-sea', plantillaId: 'tum', version: 1 },
    })
  )
})

test('un director no activa la copia de OTRA academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(comoFs('dirAvanzada'), 'academias/BASICA'), {
      contenido: { estado: 'migrando', plantillaId: 'tum', version: 1 },
    })
  )
})
