// ============================================================
//  Pruebas de lib/codigoInvitacion.js y lib/perfilMinimo.js
// ------------------------------------------------------------
//  Los dos módulos salen del mismo fallo real: se invitó a una persona con un
//  enlace, y al abrirlo (1) el código no llegaba al campo de todas las
//  pantallas y (2) al pulsar «Activar código» recibía «Missing or insufficient
//  permissions» porque su perfil de Firestore estaba incompleto.
//
//  Aquí se prueba la parte pura de las dos mitades: de dónde sale el código y
//  qué se considera un perfil utilizable.
// ============================================================
import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import {
  CLAVE_CODIGO, codigoDeUrl, codigoInvitacionActual, guardarCodigoInvitacion,
  leerCodigoInvitacion, limpiarCodigoInvitacion, normalizarCodigo,
} from '../src/lib/codigoInvitacion.js'
import {
  parcheDePerfil, perfilCompleto, perfilNuevo, ROL_POR_DEFECTO,
} from '../src/lib/perfilMinimo.js'

// sessionStorage de mentira: en Node no existe, y el módulo debe funcionar con
// y sin él (modo incógnito, cuota llena, storage deshabilitado por política).
function almacenFalso() {
  const datos = new Map()
  return {
    getItem: (k) => (datos.has(k) ? datos.get(k) : null),
    setItem: (k, v) => datos.set(k, String(v)),
    removeItem: (k) => datos.delete(k),
  }
}

beforeEach(() => { globalThis.sessionStorage = almacenFalso() })

// ---------- el código que viaja en el enlace ----------

test('normaliza como lo que es: mayúsculas y sin espacios', () => {
  assert.equal(normalizarCodigo(' inv-aep-a-k3m9 '), 'INV-AEP-A-K3M9')
  assert.equal(normalizarCodigo('AEP 2026'), 'AEP2026')
  assert.equal(normalizarCodigo(null), '')
  assert.equal(normalizarCodigo(undefined), '')
})

test('lee el código del enlace real, que lleva la query DENTRO del hash', () => {
  // Es el que produce enlaceInvitacion(): base + '#/cuenta?c=CODIGO'.
  assert.equal(
    codigoDeUrl('https://x.dev/Paramedicos/#/cuenta?c=INV-AEP-A-K3M9'),
    'INV-AEP-A-K3M9'
  )
})

test('también si la query va antes del hash (enlace recompuesto a mano)', () => {
  assert.equal(codigoDeUrl('https://x.dev/?c=aep-2026#/cuenta'), 'AEP-2026')
})

test('sin código en la URL devuelve cadena vacía, no basura', () => {
  assert.equal(codigoDeUrl('https://x.dev/#/cuenta'), '')
  assert.equal(codigoDeUrl('https://x.dev/#/cuenta?otra=1'), '')
  assert.equal(codigoDeUrl(''), '')
  assert.equal(codigoDeUrl(undefined), '')
})

test('el código del enlace se guarda y sobrevive al cambio de pantalla', () => {
  // Este es el caso completo: se abre el enlace SIN sesión, se crea la cuenta y
  // la pantalla siguiente (Bienvenida o Mi cuenta) tiene que encontrarlo ya.
  const desdeEnlace = codigoInvitacionActual('https://x.dev/#/cuenta?c=INV-AEP-A-K3M9')
  assert.equal(desdeEnlace, 'INV-AEP-A-K3M9')
  assert.equal(leerCodigoInvitacion(), 'INV-AEP-A-K3M9')
  // Otra pantalla, ya sin el parámetro en la URL: sigue estando.
  assert.equal(codigoInvitacionActual('https://x.dev/#/'), 'INV-AEP-A-K3M9')
})

test('un enlace nuevo pisa al anterior (te reinvitaron a otro sitio)', () => {
  codigoInvitacionActual('https://x.dev/#/cuenta?c=INV-AAA-A-1111')
  assert.equal(
    codigoInvitacionActual('https://x.dev/#/cuenta?c=INV-BBB-P-2222'),
    'INV-BBB-P-2222'
  )
})

test('al canjearlo se limpia: no se vuelve a proponer', () => {
  codigoInvitacionActual('https://x.dev/#/cuenta?c=INV-AEP-A-K3M9')
  limpiarCodigoInvitacion()
  assert.equal(leerCodigoInvitacion(), '')
  assert.equal(codigoInvitacionActual('https://x.dev/#/'), '')
})

test('sin sessionStorage no revienta: el enlace sigue sirviendo en esa pantalla', () => {
  delete globalThis.sessionStorage
  assert.equal(codigoInvitacionActual('https://x.dev/#/cuenta?c=INV-AEP-A-K3M9'), 'INV-AEP-A-K3M9')
  assert.equal(leerCodigoInvitacion(), '')
  assert.equal(guardarCodigoInvitacion('X'), 'X')
  assert.doesNotThrow(() => limpiarCodigoInvitacion())
})

test('la clave del almacén es de sesión y con nombre propio', () => {
  assert.equal(CLAVE_CODIGO, 'ptem-codigo-invitacion')
})

// ---------- perfil mínimo viable ----------

test('un perfil sin `rol` NO está completo (era el que no podía canjear)', () => {
  assert.equal(perfilCompleto(null), false)
  assert.equal(perfilCompleto({ nombre: 'Irene', academiaId: null }), false)
  assert.equal(perfilCompleto({ rol: 'alumno' }), false, 'sin academiaId tampoco')
  assert.equal(perfilCompleto({ rol: 'alumno', academiaId: null }), true)
  assert.equal(perfilCompleto({ rol: 'admin_escuela', academiaId: 'AEP-2026' }), true)
})

test('el parche rellena solo el hueco, y con el rol MÍNIMO', () => {
  const user = { email: 'irene@correo.com', displayName: 'Irene Soto' }
  assert.deepEqual(
    parcheDePerfil({ nombre: 'Irene', email: 'irene@correo.com' }, user),
    { rol: ROL_POR_DEFECTO, academiaId: null }
  )
  assert.equal(ROL_POR_DEFECTO, 'alumno')
})

test('el parche NO escribe `estado`: las reglas no dejan a su dueño tocarlo', () => {
  const parche = parcheDePerfil({ nombre: 'X', email: 'x@y.z', rol: 'alumno', academiaId: null },
    { email: 'x@y.z' })
  assert.deepEqual(parche, {}, 'un perfil completo no se toca')
  const conHueco = parcheDePerfil({ email: 'x@y.z' }, { email: 'x@y.z' })
  assert.ok(!('estado' in conHueco))
})

test('el parche jamás degrada a quien ya tiene rol alto', () => {
  const parche = parcheDePerfil(
    { rol: 'admin_escuela', academiaId: 'AEP-2026', nombre: 'Dire', email: 'd@x.mx' },
    { email: 'd@x.mx', displayName: 'Dire' }
  )
  assert.deepEqual(parche, {})
})

test('el correo de Auth manda sobre el del perfil (se cambió en Mi cuenta)', () => {
  const parche = parcheDePerfil(
    { rol: 'alumno', academiaId: null, nombre: 'N', email: 'viejo@x.mx' },
    { email: 'nuevo@x.mx' }
  )
  assert.deepEqual(parche, { email: 'nuevo@x.mx' })
})

test('el perfil nuevo nace completo (y como alumno)', () => {
  const doc = perfilNuevo({ email: 'a@b.c', displayName: 'Ana' })
  assert.equal(perfilCompleto(doc), true)
  assert.deepEqual(doc, {
    nombre: 'Ana', email: 'a@b.c', rol: 'alumno', academiaId: null, estado: 'activo',
  })
  // El nombre escrito en el formulario gana al de Auth.
  assert.equal(perfilNuevo({ email: 'a@b.c', displayName: 'Ana' }, 'Ana María').nombre, 'Ana María')
})

// ---------- mensajes de error ----------

test('el error de permisos deja de salir en inglés y dice qué hacer', async () => {
  const { mensajeDeError, GENERICO } = await import('../src/lib/mensajeError.js')
  const err = Object.assign(new Error('Missing or insufficient permissions.'), {
    code: 'permission-denied', name: 'FirebaseError',
  })
  const msg = mensajeDeError(err)
  assert.ok(!/permission/i.test(msg), `sigue en inglés: ${msg}`)
  assert.match(msg, /Cierra sesión/)
  // Un mensaje propio de la app (ya en español) se respeta tal cual.
  assert.equal(
    mensajeDeError(new Error('Esa invitación ya venció. Pide una nueva.')),
    'Esa invitación ya venció. Pide una nueva.'
  )
  // Sin nada útil, el genérico.
  assert.equal(mensajeDeError({}), GENERICO)
  assert.equal(mensajeDeError(null), GENERICO)
})

test('traduce los errores de Auth que ya se traducían (no se perdió ninguno)', async () => {
  const { mensajeDeError } = await import('../src/lib/mensajeError.js')
  const de = (code) => mensajeDeError({ code, message: 'en inglés' })
  assert.match(de('auth/invalid-credential'), /incorrectos/)
  assert.match(de('auth/email-already-in-use'), /ya está registrado/)
  assert.match(de('auth/weak-password'), /6 caracteres/)
  assert.match(de('auth/invalid-email'), /no es válido/)
  assert.match(de('auth/popup-closed-by-user'), /ventana de Google/)
  assert.match(de('auth/requires-recent-login'), /cierra sesión/i)
  assert.match(de('auth/network-request-failed'), /Sin conexión/)
})
