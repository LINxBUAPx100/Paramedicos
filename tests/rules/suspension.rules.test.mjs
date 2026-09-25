// ============================================================
//  Pruebas de REGLAS — suspensión real en el servidor (R02)
// ------------------------------------------------------------
//  Auditoría de riesgos del 19-09-2026, hallazgo R02: suspender a alguien
//  era solo de pantalla. calcularAcceso() lo sacaba de la aplicación, pero las
//  reglas autorizaban por rol, pertenencia, prueba y programa sin mirar
//  `estado`, así que un alumno o un profesor suspendido que conservara la
//  sesión seguía leyendo los temas con el SDK. Lo mismo con una academia
//  suspendida por falta de pago.
//
//  Cada caso NEGATIVO va acompañado de su POSITIVO: una regla que lo niega
//  todo también pasaría la mitad de estas pruebas.
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

const EN_UN_MES = new Date(Date.now() + 30 * 86400000)

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-suspension`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc, Timestamp } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    // ACA-S: academia suspendida (sin pago). Su gente está activa.
    await pon('academias/ACA-S', { nombre: 'S', estado: 'suspendida', planComercial: 'pro' })

    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/superSusp', { rol: 'superadmin', academiaId: '', estado: 'suspendido' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/dirSusp', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'suspendido' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profSusp', { rol: 'instructor', academiaId: 'ACA-A', estado: 'suspendido' })
    await pon('usuarios/recepA', { rol: 'recepcion', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/recepSusp', { rol: 'recepcion', academiaId: 'ACA-A', estado: 'suspendido' })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1' })
    // Perfil de un esquema anterior, sin `estado`: el alta lo trata como activo.
    await pon('usuarios/alumSinEstado', { rol: 'alumno', academiaId: 'ACA-A', grupoId: 'G-A1' })
    await pon('usuarios/alumSusp', { rol: 'alumno', academiaId: 'ACA-A', estado: 'suspendido', grupoId: 'G-A1' })
    await pon('usuarios/alumBaja', { rol: 'alumno', academiaId: 'ACA-A', estado: 'inactivo', grupoId: 'G-A1' })
    // Gente activa de la academia SUSPENDIDA.
    await pon('usuarios/alumS', { rol: 'alumno', academiaId: 'ACA-S', estado: 'activo', grupoId: 'G-S1' })
    await pon('usuarios/dirS', { rol: 'admin_escuela', academiaId: 'ACA-S', estado: 'activo' })
    // Prueba VIGENTE en la academia suspendida: calcularAcceso() la deja
    // pasar, y las reglas tienen que decir lo mismo.
    await pon('usuarios/pruebaS', {
      rol: 'alumno', academiaId: 'ACA-S', estado: 'activo', grupoId: 'G-S1',
      esPrueba: true, pruebaHasta: Timestamp.fromDate(EN_UN_MES),
    })

    await pon('grupos/G-A1', { academiaId: 'ACA-A', nombre: 'A1', estado: 'activo', programaId: 'ACA-A__tum' })
    await pon('grupos/G-S1', { academiaId: 'ACA-S', nombre: 'S1', estado: 'activo', programaId: 'ACA-S__tum' })

    for (const aca of ['ACA-A', 'ACA-S']) {
      await pon(`cursos/${aca}__tum`, {
        academiaId: aca, plantillaId: 'tum', titulo: 'TUM', estado: 'publicado',
        plantillaOrigenId: 'tum', versionOrigen: 1, version: 1, creadoPor: 'seed', estructura: [],
      })
      await pon(`temas/${aca}__tum__t1`, {
        academiaId: aca, cursoId: `${aca}__tum`, temaId: 't1', version: 1, creadoPor: 'seed',
        titulo: 'T1', estado: 'publicado', quiz: [], flashcards: [], secciones: [],
      })
    }
    await pon('dictamenes/d1', {
      academiaId: 'ACA-A', temaId: 't1', uid: 'profA', estado: 'abierto', accion: 'corregir',
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

test('R02: un alumno suspendido deja de leer los temas de su programa', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('alumSusp'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('alumBaja'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('alumSusp'), 'cursos/ACA-A__tum')))
})

test('R02: un perfil sin campo `estado` sigue entrando (el alta lo da por activo)', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('alumSinEstado'), 'temas/ACA-A__tum__t1')))
})

test('R02: un profesor suspendido pierde el temario completo y la cola de dictámenes', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('profA'), 'temas/ACA-A__tum__t1')))
  await assertSucceeds(getDoc(doc(como('profA'), 'dictamenes/d1')))
  await assertFails(getDoc(doc(como('profSusp'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('profSusp'), 'dictamenes/d1')))
})

test('R02: un director suspendido no administra a su gente', { skip }, async () => {
  await preparar()
  const { doc, getDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertFails(getDoc(doc(como('dirSusp'), 'usuarios/alumA')))
  await assertFails(updateDoc(doc(como('dirSusp'), 'usuarios/alumA'), { estado: 'suspendido' }))
  // El director activo sí: suspender es justamente su trabajo.
  await assertSucceeds(getDoc(doc(como('dirA'), 'usuarios/alumA')))
})

test('R02: recepción suspendida no abre la ficha de nadie', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('recepA'), 'usuarios/alumA')))
  await assertFails(getDoc(doc(como('recepSusp'), 'usuarios/alumA')))
})

test('R02: una academia suspendida deja sin temario a su gente activa', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails } = rut
  await assertFails(getDoc(doc(como('alumS'), 'temas/ACA-S__tum__t1')))
  await assertFails(getDoc(doc(como('dirS'), 'temas/ACA-S__tum__t1')))
})

test('R02: una prueba vigente no depende del estado de la academia (espejo de calcularAcceso)', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('pruebaS'), 'temas/ACA-S__tum__t1')))
})

test('R02: un super-admin por rol también se suspende', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('super1'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('superSusp'), 'temas/ACA-A__tum__t1')))
})

test('R02: reactivar devuelve el acceso sin tocar nada más', { skip }, async () => {
  await preparar()
  const { doc, getDoc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await env.withSecurityRulesDisabled(async (ctx) => {
    await fsmod.setDoc(doc(ctx.firestore(), 'usuarios/alumVuelve'), {
      rol: 'alumno', academiaId: 'ACA-A', estado: 'suspendido', grupoId: 'G-A1',
    })
  })
  await assertFails(getDoc(doc(como('alumVuelve'), 'temas/ACA-A__tum__t1')))
  // El director lo reactiva desde su panel…
  await assertSucceeds(updateDoc(doc(como('dirA'), 'usuarios/alumVuelve'), { estado: 'activo' }))
  // …y la sesión que ya estaba abierta vuelve a leer en la petición siguiente.
  await assertSucceeds(getDoc(doc(como('alumVuelve'), 'temas/ACA-A__tum__t1')))
})

test('R02: el propio suspendido no se reactiva', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('alumSusp'), 'usuarios/alumSusp'), { estado: 'activo' }))
})
