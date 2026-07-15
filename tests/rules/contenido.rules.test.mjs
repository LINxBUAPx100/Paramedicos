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
    // profAcrea: profesor con permiso de crear temas (Fase 6).
    await pon('usuarios/profAcrea', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo',
      permisosEditor: { editarContenido: true, crearTemas: true, cursosPermitidos: ['ACA-A__tum'] },
    })
    // profC: profesor de la academia BASE (para "director BASE concede").
    await pon('usuarios/profC', { rol: 'instructor', academiaId: 'ACA-C', estado: 'activo' })
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
    // t4: reservado para las pruebas de permisos FINOS por campo (Fase 6).
    await pon('temas/ACA-A__tum__t4', {
      academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 't4', version: 1, creadoPor: 'seed',
      titulo: 'T4', estado: 'publicado', quiz: [], flashcards: [], secciones: [], recursos: null, actividades: null,
    })
    await pon('historial/h1', {
      academiaId: 'ACA-A', usuario: 'dirA', accion: 'x', coleccion: 'temas',
      docId: 'ACA-A__tum__t1', antes: null, despues: null, origen: 'test',
    })
    // --- Fase 7: plantilla publicada, snapshot de versión, operación y sello ---
    await pon('plantillas/pub', {
      nombre: 'Publicada', version: 1, estado: 'publicada',
      estructura: [{ id: 'f1', titulo: 'F1' }],
    })
    await pon('plantillasVersiones/pub__v1', {
      plantillaId: 'pub', version: 1, estructura: [], hash: 'h1', conteos: { temas: 1 },
    })
    await pon('plantillasVersionesTemas/pub__v1__t1', {
      versionId: 'pub__v1', plantillaId: 'pub', version: 1, temaId: 't1', titulo: 'T1',
    })
    await pon('replicaciones/rep1', {
      plantillaId: 'pub', version: 1, destinos: ['ACA-A'],
      estrategia: 'conservar_local', estado: 'completada', creadoPor: 'super1',
    })
    await pon('respaldos/bk-rep1__temas__ACA-A__tum__t1', {
      backupId: 'bk-rep1', replicacionId: 'rep1', academiaId: 'ACA-A',
      coleccion: 'temas', docId: 'ACA-A__tum__t1', datos: { titulo: 'T1' },
    })
    // t7: tema con SELLO de origen (para probar que un editor no lo toca).
    await pon('temas/ACA-A__tum__t7', {
      academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 't7', version: 1, creadoPor: 'seed',
      titulo: 'T7', estado: 'publicado', quiz: [], flashcards: [], secciones: [],
      origen: { plantillaId: 'tum', version: 1, hash: 'sello', replicacionId: 'clonacion' },
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

// ---------- Fase 6: permisos editoriales granulares del profesor ----------

test('permisos: el director PRO concede/retira permisos a profesores de SU academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const perms = { editarContenido: true, editarExamenes: true, cursosPermitidos: ['ACA-A__tum'] }
  // Director PRO concede a un profesor de su academia.
  await assertSucceeds(updateDoc(doc(como('dirA'), 'usuarios/profA2'), { permisosEditor: perms }))
  // Y puede retirarlos (todo en falso, sin cursos).
  await assertSucceeds(updateDoc(doc(como('dirA'), 'usuarios/profA2'), {
    permisosEditor: { editarContenido: false, cursosPermitidos: [] },
  }))
  // Forma inválida (clave desconocida en el mapa): rechazada.
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/profA2'), {
    permisosEditor: { editarContenido: true, inventado: true, cursosPermitidos: [] },
  }))
  // No a sí mismo, no a un director, no a otra academia.
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/dirA'), { permisosEditor: perms }))
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/dirB'), { permisosEditor: perms }))
  await assertFails(updateDoc(doc(como('dirB'), 'usuarios/profA'), { permisosEditor: perms }))
  // Cambiar OTRO campo junto a permisosEditor (colarse un rol) se niega.
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/profA2'), { permisosEditor: perms, rol: 'admin_escuela' }))
})

test('permisos: un director BASE no puede conceder permisos (plan)', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('dirC'), 'usuarios/profC'), {
    permisosEditor: { editarContenido: true, cursosPermitidos: ['ACA-C__tum'] },
  }))
})

test('permisos: el profesor NO puede modificar sus propios permisos (escalación)', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('profA'), 'usuarios/profA'), {
    permisosEditor: { editarContenido: true, editarExamenes: true, publicarContenido: true, cursosPermitidos: ['ACA-A__tum'] },
  }))
  // Tampoco puede concedérselos a otro profesor (no es director).
  await assertFails(updateDoc(doc(como('profA'), 'usuarios/profA2'), {
    permisosEditor: { editarContenido: true, cursosPermitidos: ['ACA-A__tum'] },
  }))
})

test('permisos finos: el profesor sin editarExamenes/publicar no cambia quiz ni estado', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  // profA tiene editarContenido pero NO editarExamenes ni publicarContenido.
  const t4 = 'temas/ACA-A__tum__t4' // versión 1
  await assertFails(updateDoc(doc(como('profA'), t4), {
    quiz: [{ pregunta: 'nueva', opciones: ['a', 'b'], correcta: 0 }], version: 2,
  }))
  await assertFails(updateDoc(doc(como('profA'), t4), { estado: 'archivado', version: 2 }))
  // Editar solo el título (campo base) sí pasa (deja t4 en versión 2).
  await assertSucceeds(updateDoc(doc(como('profA'), t4), { titulo: 'T4 editado', version: 2 }))
})

test('permisos finos: crear un tema exige el permiso crearTemas', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const base = (temaId) => ({
    academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId, titulo: 'Nuevo',
    estado: 'borrador', version: 1, creadoPor: null,
  })
  // profAcrea tiene crearTemas → puede crear (firma con su uid).
  await assertSucceeds(setDoc(doc(como('profAcrea'), 'temas/ACA-A__tum__np1'),
    { ...base('np1'), creadoPor: 'profAcrea' }))
  // profA NO tiene crearTemas → no puede crear aunque conozca el curso.
  await assertFails(setDoc(doc(como('profA'), 'temas/ACA-A__tum__np2'),
    { ...base('np2'), creadoPor: 'profA' }))
})

// ---------- Fase 4: el resultado de un examen no se falsea desde el cliente ----------

test('intentos: resultado consistente obligatorio (aciertos/total/porcentaje)', { skip }, async () => {
  await preparar()
  const { collection, addDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const db = como('alumA')
  const base = { uid: 'alumA', academiaId: 'ACA-A', faseId: 'f1', numero: 1, titulo: 'F1', fecha: new Date() }
  // Resultados reales (porcentaje = round(aciertos/total*100)) → aceptados.
  await assertSucceeds(addDoc(collection(db, 'intentos'), { ...base, aciertos: 7, total: 10, porcentaje: 70 }))
  await assertSucceeds(addDoc(collection(db, 'intentos'), { ...base, aciertos: 1, total: 3, porcentaje: 33 }))
  await assertSucceeds(addDoc(collection(db, 'intentos'), { ...base, aciertos: 0, total: 10, porcentaje: 0 }))
  // Porcentaje inflado, aciertos imposibles o totales absurdos → rechazados.
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, aciertos: 1, total: 10, porcentaje: 100 }))
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, aciertos: 11, total: 10, porcentaje: 100 }))
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, aciertos: 0, total: 0, porcentaje: 0 }))
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, aciertos: 10, total: 10, porcentaje: 101 }))
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, aciertos: -1, total: 10, porcentaje: 0 }))
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, aciertos: 5, total: 501, porcentaje: 1 }))
  // Y sigue siendo imposible firmar como otro o en otra academia.
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, uid: 'alumB', aciertos: 5, total: 10, porcentaje: 50 }))
  await assertFails(addDoc(collection(db, 'intentos'), { ...base, academiaId: 'ACA-B', aciertos: 5, total: 10, porcentaje: 50 }))
})

// ---------- Fase 7: plantillas versionadas, replicaciones y sello de origen ----------

test('F7 versiones: snapshots INMUTABLES (ni el super-admin los actualiza)', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('super1'), 'plantillasVersiones/pub__v1')))
  await assertSucceeds(setDoc(doc(como('super1'), 'plantillasVersiones/pub__v2'),
    { plantillaId: 'pub', version: 2, estructura: [] }))
  // Actualizar un snapshot publicado: prohibido para TODOS.
  await assertFails(updateDoc(doc(como('super1'), 'plantillasVersiones/pub__v1'), { hash: 'otro' }))
  await assertFails(updateDoc(doc(como('super1'), 'plantillasVersionesTemas/pub__v1__t1'), { titulo: 'x' }))
  // Director/alumno: ni leerlos (catálogo privado).
  await assertFails(getDoc(doc(como('dirA'), 'plantillasVersiones/pub__v1')))
  await assertFails(getDoc(doc(como('alumA'), 'plantillasVersionesTemas/pub__v1__t1')))
})

test('F7 plantilla publicada: estructura inmutable; metadatos y estado sí cambian', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertFails(updateDoc(doc(como('super1'), 'plantillas/pub'),
    { estructura: [{ id: 'hackeada' }] }))
  await assertSucceeds(updateDoc(doc(como('super1'), 'plantillas/pub'),
    { descripcion: 'metadatos ok' }))
  // Abrir la versión siguiente (estado+version) sí se permite.
  await assertSucceeds(updateDoc(doc(como('super1'), 'plantillas/pub'),
    { estado: 'borrador', version: 2 }))
})

test('F7 replicaciones y respaldos: solo super-admin; las academias ni los leen', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('super1'), 'replicaciones/rep1')))
  await assertSucceeds(updateDoc(doc(como('super1'), 'replicaciones/rep1'), { estado: 'revirtiendo' }))
  await assertFails(getDoc(doc(como('dirA'), 'replicaciones/rep1')))
  await assertFails(updateDoc(doc(como('dirA'), 'replicaciones/rep1'), { estado: 'cancelada' }))
  await assertFails(setDoc(doc(como('profA'), 'replicaciones/rep2'), { estado: 'borrador' }))
  await assertFails(getDoc(doc(como('dirA'), 'respaldos/bk-rep1__temas__ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('alumA'), 'respaldos/bk-rep1__temas__ACA-A__tum__t1')))
})

test('home por secciones: director PRO configura la SUYA; BASE y campos ajenos no', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const config = [{ id: 'hero', visible: false }, { id: 'fases', visible: true }]
  // Director PRO: puede guardar la configuración (y volver al default con null).
  await assertSucceeds(updateDoc(doc(como('dirA'), 'academias/ACA-A'), { homeSecciones: config }))
  await assertSucceeds(updateDoc(doc(como('dirA'), 'academias/ACA-A'), { homeSecciones: null }))
  // La forma debe ser lista (o null): un mapa/valor suelto se rechaza.
  await assertFails(updateDoc(doc(como('dirA'), 'academias/ACA-A'), { homeSecciones: 'hero' }))
  // Director BASE: su plan no personaliza; academia ajena: jamás.
  await assertFails(updateDoc(doc(como('dirC'), 'academias/ACA-C'), { homeSecciones: config }))
  await assertFails(updateDoc(doc(como('dirA'), 'academias/ACA-B'), { homeSecciones: config }))
  // No abre la puerta a otros campos del doc de academia.
  await assertFails(updateDoc(doc(como('dirA'), 'academias/ACA-A'), { homeSecciones: config, estado: 'activo', nombre: 'pwn' }))
})

test('F7 sello de origen: ningún editor de academia puede tocarlo', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const t7 = 'temas/ACA-A__tum__t7'
  // El director NO puede modificar ni borrar el sello origen (ocultaría sus
  // cambios locales a la replicación).
  await assertFails(updateDoc(doc(como('dirA'), t7),
    { titulo: 'X', version: 2, origen: { plantillaId: 'tum', version: 1, hash: 'falso' } }))
  // Editar contenido SIN tocar el sello: flujo normal del editor.
  await assertSucceeds(updateDoc(doc(como('dirA'), t7), { titulo: 'T7 editado', version: 2 }))
})
