// ============================================================
//  Pruebas de REGLAS — directorio público y solicitudes de acceso
// ------------------------------------------------------------
//  La propiedad de seguridad que se fija aquí:
//
//    El ID del doc de una academia ES su código de acceso. Publicarla en un
//    directorio lo revela, así que estar EN EL DIRECTORIO desactiva la entrada
//    por código y obliga a pasar por aprobación del director. Sin esa regla, el
//    directorio sería una puerta abierta al contenido de pago.
//
//  Requieren el emulador de Firestore: npm run test:rules
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

// Ids propios de este fichero: el emulador es COMPARTIDO entre las suites.
const ACA_DIR = 'DIR-ABIERTA'   // publicada en el directorio
const ACA_COD = 'DIR-CERRADA'   // fuera del directorio (acceso por código)

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    // Cada archivo de reglas corre en su PROPIO proyecto del emulador. Sin
    // esto todos compartían dataset y `node --test` los ejecuta en paralelo:
    // el fixture de un archivo pisaba el de otro (p. ej. calificaciones sembraba
    // usuarios/alumA SIN grupoId y borraba el grupo que contenido necesitaba),
    // así que una prueba pasaba o fallaba según quién escribiera último.
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-directorio`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)

    await pon(`academias/${ACA_DIR}`, { nombre: 'Abierta', estado: 'activo', planComercial: 'pro' })
    await pon(`academias/${ACA_COD}`, { nombre: 'Cerrada', estado: 'activo', planComercial: 'pro' })
    // Solo la primera está en el directorio.
    await pon(`directorio/${ACA_DIR}`, { nombre: 'Abierta', descripcion: 'Acepta solicitudes', logo: '' })

    await pon(`usuarios/dirDeAbierta`, { rol: 'admin_escuela', academiaId: ACA_DIR, estado: 'activo' })
    await pon(`usuarios/dirDeCerrada`, { rol: 'admin_escuela', academiaId: ACA_COD, estado: 'activo' })
    // Aspirantes sin academia, uno por escenario.
    for (const uid of ['aspiraCod', 'aspiraDir', 'aspiraAceptado', 'aspiraFisgon', 'aspiraForma']) {
      await pon(`usuarios/${uid}`, { rol: 'alumno', academiaId: null, grupoId: null, estado: 'activo', nombre: 'Aspirante', esPrueba: false })
    }
    // Solicitud YA aceptada, para probar el alta por aprobación.
    await pon(`solicitudesAcceso/aspiraAceptado__${ACA_DIR}`, {
      uid: 'aspiraAceptado', nombre: 'Ana', email: 'a@x.com', academiaId: ACA_DIR,
      mensaje: '', estado: 'aceptada',
    })
    // Solicitud pendiente ajena, para probar que no la lee cualquiera.
    await pon(`solicitudesAcceso/aspiraDir__${ACA_DIR}`, {
      uid: 'aspiraDir', nombre: 'Beto', email: 'b@x.com', academiaId: ACA_DIR,
      mensaje: 'Soy alumno de segundo', estado: 'pendiente',
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

after(async () => {
  if (env) await env.cleanup()
})

// ---------- El interruptor: directorio ⇒ no se entra por código ----------

test('directorio: publicada ⇒ NO se puede entrar con el código', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // Este es el ataque que la regla existe para impedir: leo el código en el
  // directorio (es el id del doc) y me uno sin que nadie me apruebe.
  await assertFails(
    updateDoc(doc(como('aspiraCod'), 'usuarios/aspiraCod'), {
      academiaId: ACA_DIR, grupoId: null, esPrueba: false,
    })
  )
})

test('directorio: fuera del directorio, el código sigue funcionando', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  // No regresión: las academias de siempre no cambian de comportamiento.
  await assertSucceeds(
    updateDoc(doc(como('aspiraCod'), 'usuarios/aspiraCod'), {
      academiaId: ACA_COD, grupoId: null, esPrueba: false,
    })
  )
})

test('directorio: con la solicitud ACEPTADA sí se completa el alta', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(
    updateDoc(doc(como('aspiraAceptado'), 'usuarios/aspiraAceptado'), {
      academiaId: ACA_DIR, grupoId: null, esPrueba: false,
    })
  )
})

// ---------- Ficha del directorio ----------

test('directorio: cualquiera con sesión lo consulta', { skip }, async () => {
  await preparar()
  const { doc, getDoc, collection, getDocs } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('aspiraFisgon'), `directorio/${ACA_DIR}`)))
  await assertSucceeds(getDocs(collection(como('aspiraFisgon'), 'directorio')))
})

test('directorio: solo el director de ESA academia publica o retira', { skip }, async () => {
  await preparar()
  const { doc, setDoc, deleteDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const ficha = { nombre: 'Cerrada', descripcion: 'Hola', logo: '' }
  // El director de otra academia no puede publicarla.
  await assertFails(setDoc(doc(como('dirDeAbierta'), `directorio/${ACA_COD}`), ficha))
  // Un aspirante tampoco.
  await assertFails(setDoc(doc(como('aspiraFisgon'), `directorio/${ACA_COD}`), ficha))
  // Su propio director sí, y también puede retirarse.
  await assertSucceeds(setDoc(doc(como('dirDeCerrada'), `directorio/${ACA_COD}`), ficha))
  await assertSucceeds(deleteDoc(doc(como('dirDeCerrada'), `directorio/${ACA_COD}`)))
})

test('directorio: la ficha no admite campos fuera de la lista', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  // Nada de colar datos comerciales ni banderas inventadas en un doc público.
  await assertFails(
    setDoc(doc(como('dirDeAbierta'), `directorio/${ACA_DIR}`), {
      nombre: 'Abierta', descripcion: '', logo: '', planComercial: 'pro',
    })
  )
})

// ---------- Solicitudes de acceso ----------

test('solicitud: se crea sobre una academia del directorio, y solo sobre uno mismo', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const base = (uid, aca) => ({ uid, nombre: 'X', email: 'x@x.com', academiaId: aca, mensaje: '', estado: 'pendiente' })

  await assertSucceeds(
    setDoc(doc(como('aspiraForma'), `solicitudesAcceso/aspiraForma__${ACA_DIR}`), base('aspiraForma', ACA_DIR))
  )
  // Id que no corresponde a quien escribe: cerraría la puerta a suplantar.
  await assertFails(
    setDoc(doc(como('aspiraFisgon'), `solicitudesAcceso/aspiraForma__${ACA_DIR}`), base('aspiraForma', ACA_DIR))
  )
  // Academia que NO está en el directorio: no admite solicitudes.
  await assertFails(
    setDoc(doc(como('aspiraFisgon'), `solicitudesAcceso/aspiraFisgon__${ACA_COD}`), base('aspiraFisgon', ACA_COD))
  )
  // Nacer ya aceptada sería el atajo obvio.
  await assertFails(
    setDoc(doc(como('aspiraFisgon'), `solicitudesAcceso/aspiraFisgon__${ACA_DIR}`), {
      ...base('aspiraFisgon', ACA_DIR), estado: 'aceptada',
    })
  )
})

test('solicitud: la lee su dueño y el staff de esa academia, nadie más', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const ruta = `solicitudesAcceso/aspiraDir__${ACA_DIR}`
  await assertSucceeds(getDoc(doc(como('aspiraDir'), ruta)))      // su dueño
  await assertSucceeds(getDoc(doc(como('dirDeAbierta'), ruta)))   // su director
  await assertFails(getDoc(doc(como('aspiraFisgon'), ruta)))      // un extraño
  await assertFails(getDoc(doc(como('dirDeCerrada'), ruta)))      // otra academia
})

test('solicitud: resuelve el director; el solicitante NO se auto-acepta', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  const ruta = `solicitudesAcceso/aspiraDir__${ACA_DIR}`
  // El atajo evidente: aceptarme yo mismo.
  await assertFails(updateDoc(doc(como('aspiraDir'), ruta), { estado: 'aceptada' }))
  // El director de otra academia tampoco.
  await assertFails(updateDoc(doc(como('dirDeCerrada'), ruta), { estado: 'aceptada' }))
  // El suyo sí.
  await assertSucceeds(
    updateDoc(doc(como('dirDeAbierta'), ruta), { estado: 'aceptada', resueltoPor: 'dirDeAbierta', motivo: '' })
  )
})
