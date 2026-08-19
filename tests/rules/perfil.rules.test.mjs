// ============================================================
//  Pruebas de REGLAS de Firestore — perfil propio y progreso
// ------------------------------------------------------------
//  Cubre las dos escaladas de privilegios que la auditoría encontró en la
//  regla de auto-edición de usuarios/{uid} (no tenía lista blanca de campos):
//
//    · un ALUMNO se escribía `modulosDesbloqueados` y se saltaba la
//      visibilidad por grupo (src/lib/useVisibilidad.js la lee del perfil),
//    · un PROFESOR se escribía `puedeVerCodigos` y se saltaba la aprobación
//      del director (el flujo de solicitudes tipo 'codigos').
//
//  Y la validación de forma de progreso/{uid}, que antes era un `write` libre.
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

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    // Cada archivo de reglas corre en su PROPIO proyecto del emulador. Sin
    // esto todos compartían dataset y `node --test` los ejecuta en paralelo:
    // el fixture de un archivo pisaba el de otro (p. ej. calificaciones sembraba
    // usuarios/alumA SIN grupoId y borraba el grupo que contenido necesitaba),
    // así que una prueba pasaba o fallaba según quién escribiera último.
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-perfil`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  // Datos base (escritos SIN reglas). Un usuario por escenario: así una
  // escritura que SÍ debe pasar no contamina el escenario siguiente.
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('grupos/GRP-A', { academiaId: 'ACA-A', estado: 'activo', nombre: 'G1' })

    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    // Alumnos de ACA-A, uno por escenario.
    for (const uid of ['alumEscala', 'alumBasura', 'alumNombre', 'alumStaff', 'alumProgreso']) {
      await pon(`usuarios/${uid}`, {
        rol: 'alumno', academiaId: 'ACA-A', grupoId: 'GRP-A', estado: 'activo',
        nombre: 'Alumno', esPrueba: false,
      })
    }
    // Alumno todavía SIN academia (prueba de unión por código).
    await pon('usuarios/alumSuelto', {
      rol: 'alumno', academiaId: null, grupoId: null, estado: 'activo',
      nombre: 'Suelto', esPrueba: false,
    })
    // Profesores de ACA-A, uno por escenario.
    for (const uid of ['profEscala', 'profDirector']) {
      await pon(`usuarios/${uid}`, {
        rol: 'instructor', academiaId: 'ACA-A', estado: 'activo', nombre: 'Profe',
      })
    }
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

// ---------- usuarios/{uid}: escalada de privilegios (C1) ----------

test('perfil: un alumno NO se desbloquea módulos escribiendo modulosDesbloqueados', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('alumEscala'), 'usuarios/alumEscala'), {
      modulosDesbloqueados: ['modulo-1', 'modulo-2', 'modulo-3'],
    })
  )
})

test('perfil: un profesor NO se auto-concede puedeVerCodigos', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(
    updateDoc(doc(como('profEscala'), 'usuarios/profEscala'), { puedeVerCodigos: true })
  )
})

test('perfil: no se pueden inyectar campos desconocidos en el propio perfil', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('alumBasura'), 'usuarios/alumBasura'), { apodo: 'pwn' }))
  await assertFails(
    updateDoc(doc(como('alumBasura'), 'usuarios/alumBasura'), { permisosEditor: { editarContenido: true } })
  )
})

// ---------- usuarios/{uid}: lo que SÍ debe seguir funcionando ----------

test('perfil: el usuario sigue pudiendo cambiar su nombre', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('alumNombre'), 'usuarios/alumNombre'), { nombre: 'Nombre Nuevo' })
  )
})

test('perfil: unirse a una academia activa por código sigue funcionando', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  // Espeja usuarios.js:unirseAcademia — mismos campos, mismo orden.
  await assertSucceeds(
    updateDoc(doc(como('alumSuelto'), 'usuarios/alumSuelto'), {
      academiaId: 'ACA-B', grupoId: null, esPrueba: false,
    })
  )
})

test('perfil: el staff SÍ habilita módulos a un alumno de su academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  // La regla legítima (solo staff, solo ese campo) no se ve afectada por la
  // lista blanca de auto-edición: es otra `allow update` distinta.
  await assertSucceeds(
    updateDoc(doc(como('profEscala'), 'usuarios/alumStaff'), { modulosDesbloqueados: ['modulo-2'] })
  )
})

test('perfil: el director SÍ concede puedeVerCodigos a su profesor', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('dirA'), 'usuarios/profDirector'), { puedeVerCodigos: true })
  )
})

// ---------- progreso/{uid}: forma y tamaño (C3) ----------

const progresoValido = () => ({
  leidos: { 't-1': true, 't-2': true },
  quizzes: { 't-1': { aciertos: 8, total: 10, fecha: 1 } },
  examenes: [{ aciertos: 40, total: 50, fecha: 1 }],
  updatedAt: new Date(),
})

test('progreso: el dueño escribe su progreso con la forma de la app', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    setDoc(doc(como('alumProgreso'), 'progreso/alumProgreso'), progresoValido(), { merge: true })
  )
})

test('progreso: se rechaza cualquier clave fuera de la lista', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  // `tema` es preferencia del dispositivo y NUNCA se sincroniza.
  await assertFails(
    setDoc(doc(como('alumProgreso'), 'progreso/alumProgreso'), { ...progresoValido(), tema: 'oscuro' })
  )
  await assertFails(
    setDoc(doc(como('alumProgreso'), 'progreso/alumProgreso'), { ...progresoValido(), relleno: 'x'.repeat(1000) })
  )
})

test('progreso: se rechaza un historial de exámenes por encima del tope', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  const examenes = Array.from({ length: 21 }, (_, i) => ({ aciertos: i, total: 50, fecha: 1 }))
  await assertFails(
    setDoc(doc(como('alumProgreso'), 'progreso/alumProgreso'), { ...progresoValido(), examenes })
  )
})

test('progreso: nadie lee ni escribe el progreso de otro', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(getDoc(doc(como('alumBasura'), 'progreso/alumProgreso')))
  await assertFails(
    setDoc(doc(como('alumBasura'), 'progreso/alumProgreso'), progresoValido(), { merge: true })
  )
})
