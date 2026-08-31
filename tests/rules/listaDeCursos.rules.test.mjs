// ============================================================
//  Pruebas de REGLAS — por qué un alumno NO puede listar los cursos
// ------------------------------------------------------------
//  Esta suite documenta, con el emulador delante, la razón de que
//  `src/lib/firebase/contenido.js` pida los cursos del alumno UNO A UNO por id
//  en vez de listarlos.
//
//  En Firestore la regla de un `list` se evalúa contra CADA documento del
//  resultado, y si UNO falla se deniega la consulta ENTERA. Como
//  `alumnoLeeCurso` exige que el curso esté en el programa del alumno, basta
//  con que la academia tenga publicado un curso ajeno —el caso normal en cuanto
//  imparta más de una carrera— para que el alumno no pueda leer NINGUNO.
//
//  Lo que hacía eso especialmente malo es que fallaba EN SILENCIO: el resolutor
//  caía a legacy, o sea al bundle, o sea al temario de R.E.S.C.A.T.E. Medido el
//  31-08-2026 en el emulador con una academia migrada y verificada: el alumno
//  seguía viendo el temario del paquete creyendo que era el suyo.
//
//  Si alguien vuelve a cambiar el cliente por una consulta de lista, estas
//  pruebas seguirán pasando (describen las reglas, que no cambian) pero la
//  aplicación volverá a caer al bundle. Por eso la cabecera dice el porqué.
//
//  Requieren el emulador de Firestore (Java): npm run test:rules
//  Sin emulador la suite se OMITE con el motivo; nunca da falso verde.
// ============================================================
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
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

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-listacursos`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)

    await pon('academias/ACA', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    // Una alumna de TUM. Su grupo apunta SOLO a TUM.
    await pon('usuarios/alum', { rol: 'alumno', academiaId: 'ACA', estado: 'activo', grupoId: 'G1' })
    await pon('grupos/G1', { academiaId: 'ACA', nombre: 'TUM', estado: 'activo', programaId: 'ACA__tum' })

    // La academia imparte DOS carreras y las dos están publicadas. Es el caso
    // normal en cuanto haya enfermería además de paramédicos.
    for (const id of ['ACA__tum', 'ACA__enfermeria']) {
      await pon(`cursos/${id}`, {
        academiaId: 'ACA', titulo: id, estado: 'publicado', version: 1,
        creadoPor: 'seed', estructura: [], clonacion: { completa: true },
      })
    }
  })
  return env
}

after(async () => { if (env) await env.cleanup() })

test('el alumno SÍ puede leer su curso pidiéndolo por id', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const db = env.authenticatedContext('alum').firestore()
  await rut.assertSucceeds(getDoc(doc(db, 'cursos/ACA__tum')))
})

test('el alumno NO puede leer el curso de la carrera que no cursa', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const db = env.authenticatedContext('alum').firestore()
  await rut.assertFails(getDoc(doc(db, 'cursos/ACA__enfermeria')))
})

// ÉSTE es el que explica el arreglo del cliente.
test('LISTAR los cursos de su academia se DENIEGA: hay uno que no es suyo', { skip }, async () => {
  await preparar()
  const { collection, query, where, getDocs } = fsmod
  const db = env.authenticatedContext('alum').firestore()
  // Exactamente la consulta que hacía `cursosDeAcademia`.
  const q = query(
    collection(db, 'cursos'),
    where('academiaId', '==', 'ACA'),
    where('estado', '==', 'publicado')
  )
  await rut.assertFails(getDocs(q))
})

test('acotar la lista a SU programa también funciona, si alguien prefiere listar', { skip }, async () => {
  await preparar()
  const { collection, query, where, getDocs, documentId } = fsmod
  const db = env.authenticatedContext('alum').firestore()
  // Alternativa válida al `get` por id: acotar por nombre de documento. Se deja
  // probada por si algún día hacen falta varios programas en una sola consulta.
  const q = query(collection(db, 'cursos'), where(documentId(), 'in', ['ACA__tum']))
  await rut.assertSucceeds(getDocs(q))
})

test('el staff SÍ puede listar: su regla es cierta para todos los de su academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc, collection, query, where, getDocs } = fsmod
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'usuarios/dir'), {
      rol: 'admin_escuela', academiaId: 'ACA', estado: 'activo',
    })
  })
  const db = env.authenticatedContext('dir').firestore()
  const q = query(collection(db, 'cursos'), where('academiaId', '==', 'ACA'))
  await rut.assertSucceeds(getDocs(q))
  assert.ok(true)
})
