// ============================================================
//  Pruebas de REGLAS — un profesor con varios grupos (Fase 2)
// ------------------------------------------------------------
//  `grupoIds` decide qué alumnos ve un profesor en su panel. La pregunta que
//  esta suite contesta es quién puede escribirlo, y la respuesta tiene que ser
//  «solo su director»: si un profesor pudiera tocarlo, se añadiría los grupos
//  de sus compañeros y vería el avance y las calificaciones de sus alumnos.
//
//  También fija lo contrario, que es fácil de romper sin darse cuenta: que el
//  director SÍ pueda, y que al hacerlo no pueda tocar de paso ningún otro
//  campo del perfil.
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

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-multigrupo`,
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
    await pon('usuarios/profA', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1',
    })
    await pon('usuarios/profA2', {
      rol: 'instructor', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A2',
      grupoIds: ['G-A2'],
    })
    await pon('usuarios/alumA', {
      rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1',
    })

    for (const id of ['G-A1', 'G-A2', 'G-A3']) {
      await pon(`grupos/${id}`, { academiaId: 'ACA-A', nombre: id, estado: 'activo', programaId: 'ACA-A__tum' })
    }
    await pon('grupos/G-B1', { academiaId: 'ACA-B', nombre: 'B1', estado: 'activo', programaId: 'ACA-B__tum' })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

test('el director asigna varios grupos a un profesor de su academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut

  // El caso que da nombre a la fase: una maestra con tres grupos.
  await assertSucceeds(
    updateDoc(doc(como('dirA'), 'usuarios/profA'), { grupoIds: ['G-A1', 'G-A2', 'G-A3'], grupoId: 'G-A1' })
  )
  // Y quitárselos todos también es válido: es cómo se le retira el acceso.
  await assertSucceeds(
    updateDoc(doc(como('dirA'), 'usuarios/profA'), { grupoIds: [], grupoId: null })
  )
})

test('un profesor NO puede asignarse grupos a sí mismo', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // Lo que impide que un profesor vea a los alumnos de sus compañeros.
  await assertFails(
    updateDoc(doc(como('profA2'), 'usuarios/profA2'), { grupoIds: ['G-A1', 'G-A2', 'G-A3'] })
  )
  // Ni siquiera escondiéndolo junto a un cambio que sí puede hacer.
  await assertFails(
    updateDoc(doc(como('profA2'), 'usuarios/profA2'), { nombre: 'Nuevo nombre', grupoIds: ['G-A1'] })
  )
})

test('un alumno tampoco se asigna grupos por esta vía', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // El grupo de un alumno lleva su plan de estudios: si pudiera darse otro, el
  // aislamiento entre Enfermería y TUM se abriría por una puerta lateral.
  await assertFails(
    updateDoc(doc(como('alumA'), 'usuarios/alumA'), { grupoIds: ['G-A1', 'G-A2'] })
  )
})

test('un director no toca a los profesores de OTRA academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  await assertFails(
    updateDoc(doc(como('dirB'), 'usuarios/profA2'), { grupoIds: ['G-B1'] })
  )
})

test('asignar grupos no sirve para colar otros cambios en el perfil', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // La lista blanca de campos del director sigue en pie: `grupoIds` se suma a
  // ella, no la abre. Un correo o unos permisos editoriales cambiados de paso
  // pasarían inadvertidos entre asignaciones de grupo.
  await assertFails(
    updateDoc(doc(como('dirA'), 'usuarios/profA2'), { grupoIds: ['G-A1'], email: 'otro@ejemplo.mx' })
  )
  await assertFails(
    updateDoc(doc(como('dirA'), 'usuarios/profA2'), {
      grupoIds: ['G-A1'], permisosEditor: { editarContenido: true },
    })
  )
  // Y nadie se toca a sí mismo desde la gestión de miembros.
  await assertFails(
    updateDoc(doc(como('dirA'), 'usuarios/dirA'), { grupoIds: ['G-A1'] })
  )
})

test('la forma de grupoIds se valida: lista, y con tope', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails, assertSucceeds } = rut

  // Un texto suelto en vez de una lista rompería a todo el que lo lea.
  await assertFails(
    updateDoc(doc(como('dirA'), 'usuarios/profA2'), { grupoIds: 'G-A1' })
  )
  // Sin tope, un documento de perfil podría crecer sin control.
  await assertFails(
    updateDoc(doc(como('dirA'), 'usuarios/profA2'), {
      grupoIds: Array.from({ length: 41 }, (_, i) => `G-${i}`),
    })
  )
  await assertSucceeds(
    updateDoc(doc(como('dirA'), 'usuarios/profA2'), {
      grupoIds: Array.from({ length: 40 }, (_, i) => `G-${i}`),
    })
  )
})

test('un id de otra academia en la lista no abre ninguna puerta', { skip }, async () => {
  await preparar()
  const { doc, getDocs, updateDoc, collection, query, where } = fsmod
  const { assertFails, assertSucceeds } = rut

  // La regla NO comprueba elemento por elemento —costaría un `get()` por grupo
  // y el tope son 10 por petición—, así que un id ajeno se ACEPTA en la lista…
  await assertSucceeds(
    updateDoc(doc(como('dirA'), 'usuarios/profA2'), { grupoIds: ['G-A2', 'G-B1'] })
  )

  // …y aun así no le sirve de nada, que es lo que hay que demostrar: `grupoIds`
  // es un filtro de pantalla, no una credencial. Todo lo que ese profesor
  // podría querer de la otra academia sigue pasando por `esStaffDe`, que mira
  // SU academia y no su lista de grupos.
  //
  // (El documento del grupo en sí sí se puede leer por id, y es deliberado del
  //  sistema: el id de un grupo ES su código de invitación, así que cualquiera
  //  con sesión debe poder consultarlo para unirse. Lo que revela es un nombre;
  //  lo que importa —alumnos, avance, calificaciones, contenido— está debajo.)

  // No puede LISTAR los grupos de la otra academia.
  await assertFails(getDocs(query(
    collection(como('profA2'), 'grupos'), where('academiaId', '==', 'ACA-B')
  )))

  // No puede leer a los USUARIOS de la otra academia: ni sus alumnos ni su avance.
  await assertFails(getDocs(query(
    collection(como('profA2'), 'usuarios'), where('academiaId', '==', 'ACA-B')
  )))

  // No puede tocar la visibilidad de contenido de ese grupo.
  await assertFails(
    updateDoc(doc(como('profA2'), 'grupos/G-B1'), { temasOcultos: ['t1'] })
  )

  // Sobre SU academia, en cambio, sigue pudiendo lo de siempre.
  await assertSucceeds(getDocs(query(
    collection(como('profA2'), 'grupos'), where('academiaId', '==', 'ACA-A')
  )))
  await assertSucceeds(
    updateDoc(doc(como('profA2'), 'grupos/G-A2'), { temasOcultos: ['t1'] })
  )
})
