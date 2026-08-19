// ============================================================
//  Pruebas de REGLAS de Firestore — CÓDIGOS DE PRUEBA VENCIDOS
// ------------------------------------------------------------
//  Un código de `codigos` no inscribe a nadie: da acceso HASTA una fecha. Al
//  canjearlo, el perfil queda `esPrueba: true` y el código puede integrarlo a
//  una academia y a un grupo para que vea el temario real. El bloqueo al
//  vencer estaba SOLO en la interfaz (AuthContext), así que quien conservara
//  la sesión seguía leyendo cursos y temas con el SDK: la pantalla decía «tu
//  periodo terminó» y la base de datos seguía sirviendo el contenido.
//
//  Estas pruebas fijan el requisito en el servidor: prueba vencida = no
//  pertenece a nada (`pruebaVencida()` en firestore.rules, espejo de
//  src/lib/accesoModelo.js). Lo único que conserva es su propia cuenta, para
//  poder canjear otro código o el código oficial de su academia.
//
//  Requieren el emulador de Firestore (Java) y @firebase/rules-unit-testing:
//    npm run test:rules
//  Sin emulador la suite se OMITE (skip) con el motivo; nunca da falso verde.
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

const HORA = 60 * 60 * 1000

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    // Proyecto propio: `node --test` corre los ficheros de reglas en paralelo
    // y compartir dataset hace que el fixture de uno pise el de otro.
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-prueba`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc, Timestamp } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)
    const enHoras = (h) => Timestamp.fromMillis(Date.now() + h * HORA)

    await pon('academias/ACA-P', { nombre: 'P', estado: 'activo', planComercial: 'pro' })
    await pon('grupos/G-P1', { academiaId: 'ACA-P', nombre: 'Mañana', estado: 'activo', programaId: 'ACA-P__tum' })
    await pon('cursos/ACA-P__tum', {
      academiaId: 'ACA-P', plantillaId: 'tum', titulo: 'TUM', estado: 'publicado',
      version: 1, creadoPor: 'seed',
      estructura: [{ id: 'f1', titulo: 'F1', estado: 'publicado', unidades: [{ id: 'principal', temas: [{ id: 't1', titulo: 'T1', estado: 'publicado' }] }] }],
    })
    await pon('temas/ACA-P__tum__t1', {
      academiaId: 'ACA-P', cursoId: 'ACA-P__tum', temaId: 't1', version: 1, creadoPor: 'seed',
      titulo: 'T1', estado: 'publicado', quiz: [], flashcards: [], secciones: [],
    })
    await pon('evaluaciones/ev1', {
      academiaId: 'ACA-P', titulo: 'Parcial 1', ponderacion: 30, creadoPor: 'dirP',
    })
    await pon('usuarios/dirP', { rol: 'admin_escuela', academiaId: 'ACA-P', estado: 'activo' })

    // Código vigente, para el canje de recuperación al final.
    await pon('codigos/PT-7DAA', {
      academiaId: null, grupoId: null, creadoPor: 'dirP', nota: '', estado: 'activo',
      dias: 7, expira: enHoras(24),
    })

    // --- Los tres perfiles que importan -----------------------------------
    // Prueba VIVA: el código lo integró a la academia y al grupo.
    await pon('usuarios/pruebaViva', {
      rol: 'alumno', academiaId: 'ACA-P', grupoId: 'G-P1', estado: 'activo',
      esPrueba: true, codigoPrueba: 'PT-7DAA', pruebaHasta: enHoras(24),
    })
    // Prueba VENCIDA: MISMO perfil, solo cambia la fecha. Es el escenario que
    // parecía un alumno inscrito y por eso seguía leyendo el temario.
    await pon('usuarios/pruebaMuerta', {
      rol: 'alumno', academiaId: 'ACA-P', grupoId: 'G-P1', estado: 'activo',
      esPrueba: true, codigoPrueba: 'PT-7DAA', pruebaHasta: enHoras(-1),
    })
    // Marcado como prueba pero SIN fecha: no puede valer como acceso perpetuo.
    await pon('usuarios/pruebaSinFecha', {
      rol: 'alumno', academiaId: 'ACA-P', grupoId: 'G-P1', estado: 'activo', esPrueba: true,
    })
    // Alumno inscrito de verdad: el control de que no se rompió nada.
    await pon('usuarios/alumnoReal', {
      rol: 'alumno', academiaId: 'ACA-P', grupoId: 'G-P1', estado: 'activo', esPrueba: false,
    })
    // Un DIRECTOR que además canjeó una prueba ya vencida: tampoco conserva el
    // panel (la regla no hace excepciones por rol).
    await pon('usuarios/dirConPrueba', {
      rol: 'admin_escuela', academiaId: 'ACA-P', estado: 'activo',
      esPrueba: true, codigoPrueba: 'PT-7DAA', pruebaHasta: enHoras(-1),
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

// ---------- CONTENIDO ----------

test('prueba viva: lee el curso y el tema de su grupo', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('pruebaViva'), 'cursos/ACA-P__tum')))
  await assertSucceeds(getDoc(doc(como('pruebaViva'), 'temas/ACA-P__tum__t1')))
})

test('prueba VENCIDA: el contenido se cierra en la base de datos, no solo en pantalla', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails } = rut
  await assertFails(getDoc(doc(como('pruebaMuerta'), 'cursos/ACA-P__tum')))
  await assertFails(getDoc(doc(como('pruebaMuerta'), 'temas/ACA-P__tum__t1')))
})

test('esPrueba sin fecha se trata como vencida', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails } = rut
  await assertFails(getDoc(doc(como('pruebaSinFecha'), 'temas/ACA-P__tum__t1')))
})

test('el alumno inscrito de verdad sigue entrando', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('alumnoReal'), 'temas/ACA-P__tum__t1')))
})

// ---------- ACADEMIA Y GRUPO ----------

test('prueba vencida: deja de pertenecer a la academia (evaluaciones)', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails, assertSucceeds } = rut
  // Las evaluaciones se leen por PERTENENCIA a la academia.
  await assertSucceeds(getDoc(doc(como('pruebaViva'), 'evaluaciones/ev1')))
  await assertFails(getDoc(doc(como('pruebaMuerta'), 'evaluaciones/ev1')))
})

test('prueba vencida: no registra intentos de examen en la academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails, assertSucceeds } = rut
  const intento = (uid) => ({
    uid, academiaId: 'ACA-P', total: 10, aciertos: 8, porcentaje: 80,
  })
  await assertSucceeds(setDoc(doc(como('pruebaViva'), 'intentos/i-viva'), intento('pruebaViva')))
  await assertFails(setDoc(doc(como('pruebaMuerta'), 'intentos/i-muerta'), intento('pruebaMuerta')))
})

test('prueba vencida: no abre solicitudes en la academia', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('pruebaMuerta'), 'solicitudes/s-muerta'), {
    uid: 'pruebaMuerta', academiaId: 'ACA-P', tipo: 'modulo', estado: 'pendiente',
  }))
})

test('prueba vencida: un director tampoco conserva su academia', { skip }, async () => {
  await preparar()
  const { doc, getDoc, updateDoc } = fsmod
  const { assertFails } = rut
  // Ni lee los perfiles de sus alumnos (esStaffDe) ni lista sus grupos.
  await assertFails(getDoc(doc(como('dirConPrueba'), 'usuarios/alumnoReal')))
  await assertFails(updateDoc(doc(como('dirConPrueba'), 'academias/ACA-P'), { lema: 'mío' }))
})

// ---------- LO QUE SÍ CONSERVA ----------

test('prueba vencida: conserva su cuenta y puede canjear otro código', { skip }, async () => {
  await preparar()
  const { doc, getDoc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  const db = como('pruebaMuerta')
  // Su propio perfil y su progreso siguen siendo suyos: sin esto no habría
  // forma de volver a entrar, ni siquiera pagando.
  await assertSucceeds(getDoc(doc(db, 'usuarios/pruebaMuerta')))
  await assertSucceeds(setProgreso(db, 'pruebaMuerta'))
  // Y el canje de un código nuevo, que es la única salida.
  const cod = await getDoc(doc(db, 'codigos/PT-7DAA'))
  await assertSucceeds(updateDoc(doc(db, 'usuarios/pruebaMuerta'), {
    codigoPrueba: 'PT-7DAA', pruebaHasta: cod.data().expira, esPrueba: true,
  }))
})

function setProgreso(db, uid) {
  const { doc, setDoc } = fsmod
  return setDoc(doc(db, `progreso/${uid}`), { leidos: {}, quizzes: {}, examenes: [], updatedAt: Date.now() })
}
