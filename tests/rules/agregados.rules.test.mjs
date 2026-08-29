// ============================================================
//  Pruebas de REGLAS — agregados del curso (Fase 1: lectura por tema)
// ------------------------------------------------------------
//  Un agregado contiene TROZOS de las lecciones: definiciones del glosario,
//  preguntas del examen, resúmenes. Si fuera más accesible que el contenido del
//  que sale, el aislamiento entre academias y entre programas quedaría en nada:
//  bastaría leer el agregado para tener el temario ajeno.
//
//  Esta suite existe para fijar dos cosas que el código por sí solo no
//  garantiza:
//
//   1. Que leer un agregado exige lo mismo que leer el tema.
//   2. Que un PROFESOR puede marcarlos como caducados al guardar una lección.
//      Ese permiso es el que hace que un alumno nunca vea el examen anterior a
//      un cambio, y es también el motivo de que estas reglas NO apliquen
//      `edicionContenidoValida()`: esa función exige subir la `version` en
//      cada escritura, y marcar un sello no la sube.
//
//  Requieren el emulador de Firestore (Java): npm run test:rules
//  Sin emulador la suite se OMITE con el motivo; nunca da falso verde.
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

// Documento de agregado tal como lo escribe `docsAgregadosDeCurso`.
const agregado = (academiaId, cursoId, tipo, extra = {}) => ({
  academiaId, cursoId, tipo, moduloId: null, estado: 'publicado',
  version: 1, datos: '[]', ...extra,
})

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    // Proyecto propio: `node --test` corre los archivos en paralelo y los
    // fixtures se pisarían entre sí (misma lección que contenido.rules).
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-agregados`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)

    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })

    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/dirB', { rol: 'admin_escuela', academiaId: 'ACA-B', estado: 'activo' })
    // profA edita el curso TUM de su academia; profSin no edita nada.
    await pon('usuarios/profA', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      permisosEditor: { editarContenido: true, cursosPermitidos: ['ACA-A__tum'] },
    })
    await pon('usuarios/profSin', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    // alumA cursa TUM; alumEnf, Enfermería en la MISMA academia; alumB es de otra.
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1' })
    await pon('usuarios/alumEnf', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A3' })
    await pon('usuarios/alumSinGrupo', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/alumB', { rol: 'alumno', academiaId: 'ACA-B', estado: 'activo', grupoId: 'G-B1' })

    await pon('grupos/G-A1', { academiaId: 'ACA-A', nombre: 'TUM', estado: 'activo', programaId: 'ACA-A__tum' })
    await pon('grupos/G-A3', { academiaId: 'ACA-A', nombre: 'Enf', estado: 'activo', programaId: 'ACA-A__enfermeria' })
    await pon('grupos/G-B1', { academiaId: 'ACA-B', nombre: 'TUM B', estado: 'activo', programaId: 'ACA-B__tum' })

    for (const aca of ['ACA-A', 'ACA-B']) {
      await pon(`cursos/${aca}__tum`, {
        academiaId: aca, titulo: 'TUM', estado: 'publicado', version: 1, creadoPor: 'seed',
        estructura: [], clonacion: { completa: true },
      })
    }

    // Agregados sembrados: los de ACA-A (TUM y Enfermería) y los de ACA-B.
    await pon('agregados/ACA-A__tum__preguntas__m1', agregado('ACA-A', 'ACA-A__tum', 'preguntas', { moduloId: 'm1' }))
    await pon('agregados/ACA-A__tum__sello', agregado('ACA-A', 'ACA-A__tum', 'sello', { desactualizado: false }))
    await pon('agregados/ACA-A__enfermeria__preguntas__m1', agregado('ACA-A', 'ACA-A__enfermeria', 'preguntas', { moduloId: 'm1' }))
    await pon('agregados/ACA-B__tum__preguntas__m1', agregado('ACA-B', 'ACA-B__tum', 'preguntas', { moduloId: 'm1' }))
    // Borrador: no publicado, para comprobar que el alumno no lo alcanza.
    await pon('agregados/ACA-A__tum__fichas__m9', agregado('ACA-A', 'ACA-A__tum', 'fichas', { moduloId: 'm9', estado: 'borrador' }))
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

test('leer un agregado exige lo mismo que leer el tema del que sale', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut

  // Quien cursa el programa, sí.
  await assertSucceeds(getDoc(doc(como('alumA'), 'agregados/ACA-A__tum__preguntas__m1')))
  await assertSucceeds(getDoc(doc(como('alumA'), 'agregados/ACA-A__tum__sello')))
  // El staff de la academia, también.
  await assertSucceeds(getDoc(doc(como('dirA'), 'agregados/ACA-A__tum__preguntas__m1')))
  await assertSucceeds(getDoc(doc(como('profSin'), 'agregados/ACA-A__tum__preguntas__m1')))
  await assertSucceeds(getDoc(doc(como('super1'), 'agregados/ACA-B__tum__preguntas__m1')))
})

test('el aislamiento del contenido se mantiene en los agregados', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails } = rut

  // Otra ACADEMIA: es el caso obvio.
  await assertFails(getDoc(doc(como('alumB'), 'agregados/ACA-A__tum__preguntas__m1')))
  await assertFails(getDoc(doc(como('dirB'), 'agregados/ACA-A__tum__preguntas__m1')))

  // Otro PROGRAMA de la MISMA academia: el caso que se escapa si uno se
  // conforma con filtrar por academiaId. Quien cursa Enfermería no puede leer
  // el banco de preguntas de TUM.
  await assertFails(getDoc(doc(como('alumEnf'), 'agregados/ACA-A__tum__preguntas__m1')))

  // Sin grupo no hay programa, y sin programa no se lee nada.
  await assertFails(getDoc(doc(como('alumSinGrupo'), 'agregados/ACA-A__tum__preguntas__m1')))

  // Un agregado en borrador no llega al alumno ni siendo de su propio curso.
  await assertFails(getDoc(doc(como('alumA'), 'agregados/ACA-A__tum__fichas__m9')))
})

test('un alumno no escribe agregados aunque pueda leerlos', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut

  await assertFails(
    updateDoc(doc(como('alumA'), 'agregados/ACA-A__tum__preguntas__m1'), { datos: '[{"trampa":1}]' })
  )
  // Y tampoco puede fabricarse uno nuevo para inyectar preguntas en su examen.
  await assertFails(
    setDoc(doc(como('alumA'), 'agregados/ACA-A__tum__preguntas__m2'),
      agregado('ACA-A', 'ACA-A__tum', 'preguntas', { moduloId: 'm2' }))
  )
})

test('el profesor que edita el curso puede regenerar sus agregados', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut

  await assertSucceeds(
    updateDoc(doc(como('profA'), 'agregados/ACA-A__tum__preguntas__m1'), { datos: '[{"q":1}]' })
  )
  await assertSucceeds(
    setDoc(doc(como('profA'), 'agregados/ACA-A__tum__preguntas__m3'),
      agregado('ACA-A', 'ACA-A__tum', 'preguntas', { moduloId: 'm3' }))
  )
  // Un profesor SIN permiso sobre el curso, no.
  await assertFails(
    updateDoc(doc(como('profSin'), 'agregados/ACA-A__tum__preguntas__m1'), { datos: '[]' })
  )
  // Ni sobre un curso que no es el suyo.
  await assertFails(
    updateDoc(doc(como('profA'), 'agregados/ACA-A__enfermeria__preguntas__m1'), { datos: '[]' })
  )
})

test('marcar el sello caducado NO exige subir la versión', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut

  // Esta es la razón de que estas reglas no usen `edicionContenidoValida()`.
  // Al guardar una lección, el editor marca los agregados como caducados con
  // una escritura parcial que deja la `version` intacta. Si se exigiera
  // subirla, el aviso no se escribiría y los alumnos seguirían recibiendo el
  // examen anterior al cambio sin que nadie se enterara.
  await assertSucceeds(
    setDoc(
      doc(como('profA'), 'agregados/ACA-A__tum__sello'),
      { academiaId: 'ACA-A', cursoId: 'ACA-A__tum', tipo: 'sello', desactualizado: true },
      { merge: true }
    )
  )
  await assertSucceeds(
    setDoc(
      doc(como('dirA'), 'agregados/ACA-A__tum__sello'),
      { academiaId: 'ACA-A', cursoId: 'ACA-A__tum', tipo: 'sello', desactualizado: false },
      { merge: true }
    )
  )
})

test('un agregado no cambia de academia ni de curso', { skip }, async () => {
  await preparar()
  const { doc, updateDoc, deleteDoc } = fsmod
  const { assertFails } = rut

  // Sin esto, un director podría "adoptar" el agregado de otra academia y
  // servirle su temario a sus propios alumnos.
  await assertFails(
    updateDoc(doc(como('dirA'), 'agregados/ACA-A__tum__preguntas__m1'), { academiaId: 'ACA-B' })
  )
  await assertFails(
    updateDoc(doc(como('dirA'), 'agregados/ACA-A__tum__preguntas__m1'), { cursoId: 'ACA-A__enfermeria' })
  )
  // Borrar es solo del super-admin: un agregado perdido deja una pantalla vacía.
  await assertFails(deleteDoc(doc(como('dirA'), 'agregados/ACA-A__tum__preguntas__m1')))
  await assertFails(deleteDoc(doc(como('profA'), 'agregados/ACA-A__tum__preguntas__m1')))
})
