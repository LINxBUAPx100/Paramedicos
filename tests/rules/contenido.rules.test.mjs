// ============================================================
//  Pruebas de REGLAS de Firestore — aislamiento de contenido (Fase 2)
// ------------------------------------------------------------
//  Requieren el emulador de Firestore (Java) y @firebase/rules-unit-testing:
//
//    npm i -D @firebase/rules-unit-testing firebase-tools
//    npm run test:rules
//    (equivale a: firebase emulators:exec --only firestore
//                 --project ptem-rules-test "node --test tests/rules/")
//
//  Sin emulador la suite se OMITE (skip) con el motivo; nunca da falso verde.
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
    projectId: process.env.GCLOUD_PROJECT || 'ptem-rules-test',
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  // Datos base (escritos SIN reglas): 3 academias, roles y contenido A/B/C.
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-C', { nombre: 'C', estado: 'activo', planComercial: 'base' })
    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/dirB', { rol: 'admin_escuela', academiaId: 'ACA-B', estado: 'activo' })
    await pon('usuarios/dirC', { rol: 'admin_escuela', academiaId: 'ACA-C', estado: 'activo' })
    await pon('usuarios/profA', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      permisosEditor: { editarContenido: true, cursosPermitidos: ['ACA-A__tum'] },
    })
    await pon('usuarios/profA2', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/alumB', { rol: 'alumno', academiaId: 'ACA-B', estado: 'activo' })
    await pon('plantillas/tum', { nombre: 'TUM', version: 1, estado: 'publicada', estructura: [] })
    await pon('plantillasTemas/tum__t1', { plantillaId: 'tum', temaId: 't1', titulo: 'T1' })
    for (const aca of ['ACA-A', 'ACA-B', 'ACA-C']) {
      await pon(`cursos/${aca}__tum`, {
        academiaId: aca, plantillaId: 'tum', titulo: 'TUM', estado: 'publicado',
        plantillaOrigenId: 'tum', versionOrigen: 1, version: 1, creadoPor: 'seed',
        estructura: [{ id: 'f1', titulo: 'F1', estado: 'publicado', modulos: [{ id: 'principal', temas: [{ id: 't1', titulo: 'T1', estado: 'publicado' }] }] }],
        clonacion: { plantillaId: 'tum', version: 1, completa: true },
      })
      await pon(`temas/${aca}__tum__t1`, {
        academiaId: aca, cursoId: `${aca}__tum`, temaId: 't1', version: 1, creadoPor: 'seed',
        titulo: 'T1', estado: 'publicado', quiz: [], flashcards: [], secciones: [],
      })
    }
    await pon('temas/ACA-A__tum__t2', {
      academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 't2', version: 1, creadoPor: 'seed',
      titulo: 'Borrador', estado: 'borrador', quiz: [], flashcards: [], secciones: [],
    })
    // t3: reservado para las pruebas de versión/metadatos (Fase 3).
    await pon('temas/ACA-A__tum__t3', {
      academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 't3', version: 1, creadoPor: 'seed',
      titulo: 'T3', estado: 'publicado', quiz: [], flashcards: [], secciones: [],
    })
    await pon('historial/h1', {
      academiaId: 'ACA-A', usuario: 'dirA', accion: 'x', coleccion: 'temas',
      docId: 'ACA-A__tum__t1', antes: null, despues: null, origen: 'test',
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

test('plantillas: solo el super-admin las lee y administra', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('super1'), 'plantillas/tum')))
  await assertSucceeds(setDoc(doc(como('super1'), 'plantillas/otra'), { nombre: 'Otra', version: 1 }))
  await assertFails(getDoc(doc(como('dirA'), 'plantillas/tum')))
  await assertFails(setDoc(doc(como('dirA'), 'plantillas/tum'), { nombre: 'pwn' }))
  await assertFails(getDoc(doc(como('alumA'), 'plantillasTemas/tum__t1')))
})

test('cursos: la academia A no lee los cursos de B; el super-admin sí', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('dirA'), 'cursos/ACA-A__tum')))
  await assertFails(getDoc(doc(como('dirA'), 'cursos/ACA-B__tum')))
  await assertFails(getDoc(doc(como('alumB'), 'cursos/ACA-A__tum')))
  await assertSucceeds(getDoc(doc(como('super1'), 'cursos/ACA-B__tum')))
})

test('cursos: director PRO edita SU curso; director BASE no edita; nadie edita el ajeno', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  // La edición válida sube la versión exactamente +1 (contrato de la Fase 3).
  await assertSucceeds(updateDoc(doc(como('dirA'), 'cursos/ACA-A__tum'), { titulo: 'TUM editado por A', version: 2 }))
  await assertFails(updateDoc(doc(como('dirC'), 'cursos/ACA-C__tum'), { titulo: 'BASE no edita', version: 2 }))
  await assertFails(updateDoc(doc(como('dirA'), 'cursos/ACA-B__tum'), { titulo: 'ataque cruzado', version: 2 }))
  await assertFails(updateDoc(doc(como('alumA'), 'cursos/ACA-A__tum'), { titulo: 'alumno no', version: 2 }))
  // El super-admin no está sujeto al contrato de versión (scripts/migración).
  await assertSucceeds(updateDoc(doc(como('super1'), 'cursos/ACA-B__tum'), { titulo: 'ajuste super' }))
})

test('temas: alumno lee SOLO lo publicado de SU academia y nunca escribe', { skip }, async () => {
  await preparar()
  const { doc, getDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('alumA'), 'temas/ACA-A__tum__t2'))) // borrador propio
  await assertFails(getDoc(doc(como('alumA'), 'temas/ACA-B__tum__t1'))) // otra academia
  await assertFails(updateDoc(doc(como('alumA'), 'temas/ACA-A__tum__t1'), { titulo: 'no' }))
})

test('temas: consultas del alumno acotadas a su curso y a lo publicado', { skip }, async () => {
  await preparar()
  const { collection, query, where, getDocs } = fsmod
  const { assertSucceeds, assertFails } = rut
  const db = como('alumA')
  await assertSucceeds(getDocs(query(
    collection(db, 'temas'),
    where('cursoId', '==', 'ACA-A__tum'), where('estado', '==', 'publicado')
  )))
  // Sin el filtro de publicado, la consulta podría devolver borradores → se niega.
  await assertFails(getDocs(query(collection(db, 'temas'), where('cursoId', '==', 'ACA-A__tum'))))
  // Consultar el contenido de otra academia se niega.
  await assertFails(getDocs(query(
    collection(db, 'temas'),
    where('cursoId', '==', 'ACA-B__tum'), where('estado', '==', 'publicado')
  )))
})

test('temas: profesor autorizado edita SOLO sus cursos permitidos', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(updateDoc(doc(como('profA'), 'temas/ACA-A__tum__t1'), { titulo: 'editado por profA', version: 2 }))
  await assertFails(updateDoc(doc(como('profA2'), 'temas/ACA-A__tum__t1'), { titulo: 'sin permisos', version: 3 }))
  await assertFails(updateDoc(doc(como('profA'), 'temas/ACA-B__tum__t1'), { titulo: 'otra academia', version: 2 }))
})

test('temas: cambiar academiaId/cursoId desde el cliente no apropia documentos', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // El director de A no puede "regalar" ni "adoptar" contenido cambiando llaves.
  await assertFails(updateDoc(doc(como('dirA'), 'temas/ACA-A__tum__t1'), { academiaId: 'ACA-B' }))
  await assertFails(updateDoc(doc(como('dirA'), 'temas/ACA-A__tum__t1'), { cursoId: 'ACA-B__tum' }))
  await assertFails(updateDoc(doc(como('dirA'), 'temas/ACA-A__tum__t1'), { temaId: 'otro' }))
  await assertFails(updateDoc(doc(como('dirB'), 'temas/ACA-A__tum__t1'), { academiaId: 'ACA-B' }))
  await assertFails(updateDoc(doc(como('dirA'), 'cursos/ACA-A__tum'), { academiaId: 'ACA-B' }))
})

test('temas: el director PRO crea temas en SU academia; BASE y ajenos no', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(setDoc(doc(como('dirA'), 'temas/ACA-A__tum__nuevo'), {
    academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 'nuevo', titulo: 'Nuevo',
    estado: 'borrador', version: 1, creadoPor: 'dirA',
  }))
  await assertFails(setDoc(doc(como('dirC'), 'temas/ACA-C__tum__nuevo'), {
    academiaId: 'ACA-C', cursoId: 'ACA-C__tum', temaId: 'nuevo', titulo: 'Nuevo',
    estado: 'borrador', version: 1, creadoPor: 'dirC',
  }))
  // Crear un doc firmado con la academia de OTRO se niega (esAdminDe falla).
  await assertFails(setDoc(doc(como('dirA'), 'temas/ACA-B__tum__nuevo'), {
    academiaId: 'ACA-B', cursoId: 'ACA-B__tum', temaId: 'nuevo', titulo: 'Nuevo',
    estado: 'borrador', version: 1, creadoPor: 'dirA',
  }))
})

test('contenido: versión estricta, autoría y metadatos protegidos (Fase 3)', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const t3 = 'temas/ACA-A__tum__t3' // versión 1 reservada para esta prueba
  // Sin subir versión, saltándola o reduciéndola: rechazado.
  await assertFails(updateDoc(doc(como('dirA'), t3), { titulo: 'sin versión' }))
  await assertFails(updateDoc(doc(como('dirA'), t3), { titulo: 'salto', version: 5 }))
  await assertFails(updateDoc(doc(como('dirA'), t3), { titulo: 'retrocede', version: 0 }))
  // creadoPor/creadoEn y metadatos de origen intocables para el editor.
  await assertFails(updateDoc(doc(como('dirA'), t3), { creadoPor: 'dirA', version: 2 }))
  await assertFails(updateDoc(doc(como('dirA'), 'cursos/ACA-A__tum'), { plantillaOrigenId: 'hack', version: 3 }))
  await assertFails(updateDoc(doc(como('dirA'), 'cursos/ACA-A__tum'), { clonacion: { completa: false }, version: 3 }))
  // Estados fuera del catálogo: rechazados.
  await assertFails(updateDoc(doc(como('dirA'), t3), { estado: 'oculto', version: 2 }))
  // Crear sin firma propia o con versión distinta de 1: rechazado.
  await assertFails(setDoc(doc(como('dirA'), 'temas/ACA-A__tum__n2'), {
    academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 'n2', titulo: 'N2',
    estado: 'borrador', version: 1, creadoPor: 'otro',
  }))
  await assertFails(setDoc(doc(como('dirA'), 'temas/ACA-A__tum__n3'), {
    academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 'n3', titulo: 'N3',
    estado: 'borrador', version: 7, creadoPor: 'dirA',
  }))
  // La edición correcta (versión exactamente +1) sí pasa.
  await assertSucceeds(updateDoc(doc(como('dirA'), t3), { titulo: 'edición válida', version: 2 }))
})

test('historial: append-only firmado; solo director/super lo leen', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(setDoc(doc(como('profA'), 'historial/h2'), {
    academiaId: 'ACA-A', usuario: 'profA', accion: 'editar', coleccion: 'temas',
    docId: 'ACA-A__tum__t1', antes: null, despues: null, origen: 'test',
  }))
  // Firmar con otro uid, o desde otra academia, se niega.
  await assertFails(setDoc(doc(como('profA'), 'historial/h3'), {
    academiaId: 'ACA-A', usuario: 'dirA', accion: 'suplantar', coleccion: 'temas',
    docId: 'x', antes: null, despues: null, origen: 'test',
  }))
  await assertFails(setDoc(doc(como('dirB'), 'historial/h4'), {
    academiaId: 'ACA-A', usuario: 'dirB', accion: 'x', coleccion: 'temas',
    docId: 'x', antes: null, despues: null, origen: 'test',
  }))
  await assertSucceeds(getDoc(doc(como('dirA'), 'historial/h1')))
  await assertFails(getDoc(doc(como('dirB'), 'historial/h1')))
  // Append-only: ni siquiera el super-admin edita una entrada.
  await assertFails(updateDoc(doc(como('super1'), 'historial/h1'), { accion: 'reescrita' }))
})

test('respaldos: exclusivos del super-admin', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(setDoc(doc(como('super1'), 'respaldos/r1'), { academiaId: 'ACA-A', datos: {} }))
  await assertFails(getDoc(doc(como('dirA'), 'respaldos/r1')))
})
