// ============================================================
//  Pruebas de REGLAS — un módulo oculto no se descarga (R03)
// ------------------------------------------------------------
//  Auditoría de riesgos del 19-09-2026, hallazgo R03: ocultar un módulo a un
//  grupo era solo de pantalla. La lección y sus agregados se servían a
//  cualquier alumno del programa que los pidiera por id. Decisión del dueño
//  (25-09-2026): lo que un alumno no puede ver no lo puede descargar por
//  ningún camino.
//
//  Una prueba por PUERTA: la lección suelta, la consulta del curso completo y
//  cada agregado por módulo. Con su positivo al lado, porque una regla que lo
//  niega todo también pasaría los negativos.
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

const CURSO = 'ACA-A__tum'
const tema = (temaId, moduloId) => `temas/${CURSO}__${temaId}`
const agregado = (tipo, moduloId) => `agregados/${CURSO}__${tipo}__${moduloId}`

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-visibilidad`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    // alumA: su grupo tiene m2 y m3 ocultos.
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1' })
    // alumAbierto: mismo grupo, pero el profesor le abrió m2 a él.
    await pon('usuarios/alumAbierto', {
      rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1', modulosDesbloqueados: ['m2'],
    })
    // alumLibre: grupo sin nada oculto.
    await pon('usuarios/alumLibre', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A2' })
    await pon('grupos/G-A1', {
      academiaId: 'ACA-A', nombre: 'A1', estado: 'activo', programaId: CURSO, modulosOcultos: ['m2', 'm3'],
    })
    await pon('grupos/G-A2', { academiaId: 'ACA-A', nombre: 'A2', estado: 'activo', programaId: CURSO })

    await pon(`cursos/${CURSO}`, {
      academiaId: 'ACA-A', plantillaId: 'tum', titulo: 'TUM', estado: 'publicado', version: 1, creadoPor: 'seed',
      estructura: [],
    })
    const temaDoc = (temaId, moduloId) => ({
      academiaId: 'ACA-A', cursoId: CURSO, temaId, version: 1, creadoPor: 'seed',
      titulo: temaId, estado: 'publicado', quiz: [], flashcards: [], secciones: [],
      ...(moduloId ? { moduloId } : {}),
    })
    await pon(tema('t1'), temaDoc('t1', 'm1'))
    await pon(tema('t2'), temaDoc('t2', 'm2'))
    await pon(tema('t3'), temaDoc('t3', 'm3'))
    // Escrito antes del 25-09-2026: sin módulo.
    await pon(tema('tViejo'), temaDoc('tViejo', null))

    const agr = (tipo, moduloId) => ({
      academiaId: 'ACA-A', cursoId: CURSO, tipo, moduloId, estado: 'publicado', version: 1, datos: [],
    })
    for (const tipo of ['preguntas', 'fichas', 'flashcards', 'glosario', 'imagenes']) {
      for (const m of ['m1', 'm2', 'm3']) await pon(agregado(tipo, m), agr(tipo, m))
    }
    await pon(`agregados/${CURSO}__glosarioEnlaces`, agr('glosarioEnlaces', null))
    await pon(`agregados/${CURSO}__sello`, agr('sello', null))
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

test('R03: la lección de un módulo oculto no se descarga por su id', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), tema('t1'))))
  await assertFails(getDoc(doc(como('alumA'), tema('t2'))))
  await assertFails(getDoc(doc(como('alumA'), tema('t3'))))
})

test('R03: lo que el profesor le abre a un alumno, a ese alumno sí se le sirve', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumAbierto'), tema('t2'))))
  // Solo m2: m3 sigue oculto también para él.
  await assertFails(getDoc(doc(como('alumAbierto'), tema('t3'))))
})

test('R03: un grupo sin nada oculto lo lee todo; el profesor, también', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  for (const t of ['t1', 't2', 't3']) {
    await assertSucceeds(getDoc(doc(como('alumLibre'), tema(t))))
    await assertSucceeds(getDoc(doc(como('profA'), tema(t))))
  }
})

test('R03: un tema sin módulo queda cerrado al alumno (fallo seguro), no al staff', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertFails(getDoc(doc(como('alumLibre'), tema('tViejo'))))
  await assertSucceeds(getDoc(doc(como('profA'), tema('tViejo'))))
})

test('R03: la consulta del curso entero se niega si puede traer algo oculto', { skip }, async () => {
  await preparar()
  const { collection, query, where, getDocs } = fsmod
  const { assertSucceeds, assertFails } = rut
  const base = (db) => [
    collection(db, 'temas'),
    where('cursoId', '==', CURSO), where('academiaId', '==', 'ACA-A'), where('estado', '==', 'publicado'),
  ]
  // Sin filtro de módulo: incluiría m2 y m3.
  await assertFails(getDocs(query(...base(como('alumA')))))
  // Pidiendo solo los módulos abiertos (lo que hace temasDeCurso): sí.
  await assertSucceeds(getDocs(query(...base(como('alumA')), where('moduloId', 'in', ['m1']))))
  // Colando uno oculto en la lista: no.
  await assertFails(getDocs(query(...base(como('alumA')), where('moduloId', 'in', ['m1', 'm2']))))
})

test('R03: los agregados de un módulo oculto no se descargan', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  for (const tipo of ['preguntas', 'fichas', 'flashcards', 'glosario', 'imagenes']) {
    await assertSucceeds(getDoc(doc(como('alumA'), agregado(tipo, 'm1'))))
    await assertFails(getDoc(doc(como('alumA'), agregado(tipo, 'm2'))))
    await assertSucceeds(getDoc(doc(como('alumAbierto'), agregado(tipo, 'm2'))))
    await assertSucceeds(getDoc(doc(como('profA'), agregado(tipo, 'm3'))))
  }
})

test('R03: los agregados globales y el sello siguen abiertos (solo índice)', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), `agregados/${CURSO}__glosarioEnlaces`)))
  await assertSucceeds(getDoc(doc(como('alumA'), `agregados/${CURSO}__sello`)))
})

test('R03: el alumno no se abre un módulo escribiéndose el desbloqueo', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('alumA'), 'usuarios/alumA'), { modulosDesbloqueados: ['m2'] }))
  await assertFails(updateDoc(doc(como('alumA'), 'grupos/G-A1'), { modulosOcultos: [] }))
})
