// ============================================================
//  Alta de recepción y primer pago
// ------------------------------------------------------------
//  Pedido el 2 de septiembre de 2026: que recepción dé de alta a alguien de
//  principio a fin —ficha, teléfono, correo, grupo, matrícula y primer pago— y
//  le mande el enlace con su cuenta lista.
//
//  LO QUE ESTAS PRUEBAS PROTEGEN:
//
//   1. Que un alta NO pueda guardarse sin grupo. Es el mismo agujero que se
//      cerró ese mismo día en las altas por directorio: alguien dentro de la
//      academia, sin plan de estudios y sin ver contenido, y sin salida.
//   2. Que no pueda guardarse sin teléfono NI correo: son las dos vías por las
//      que le llega su enlace. Sin ninguna, no hay bienvenida que dar.
//   3. Que el importe de un pago se compruebe. Un dedo de más en el teclado
//      tiene que saltar en el mostrador, no en el corte de caja.
//   4. Que el mensaje de bienvenida NO prometa una contraseña. Sin Blaze el
//      enlace lleva a crearla; decir otra cosa deja a la persona esperando algo
//      que no va a llegar.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  METODOS_PAGO, CONCEPTOS_PAGO, normalizarTelefono, telefonoValido, correoValido,
  problemasDelAlta, problemasDelPago, altaParaGuardar, pagoParaGuardar,
  textoDeBienvenida, enlaceWhatsApp,
} from '../src/lib/recepcionModelo.js'

const ALTA_OK = {
  nombre: '  Ana Ruiz  ', email: 'ANA@Ejemplo.MX ', telefono: '(222) 225-6586', grupoId: 'GRP-1',
}

// ---------- teléfono ----------

test('el teléfono se guarda limpio, porque de ahí sale el mensaje', () => {
  // Una API de mensajería no acepta «(222) 225-6586».
  assert.equal(normalizarTelefono('(222) 225-6586'), '2222256586')
  assert.equal(normalizarTelefono('+52 222 225 65 86'), '+522222256586')
  assert.equal(normalizarTelefono(''), '')
})

test('no se inventa la lada de país', () => {
  // Un número al que no se sabe llamar es mejor que uno al que se llama mal.
  assert.equal(normalizarTelefono('2222256586'), '2222256586')
})

test('el teléfono tiene que poder ser un teléfono', () => {
  assert.equal(telefonoValido('2222256586'), true)
  assert.equal(telefonoValido('+522222256586'), true)
  assert.equal(telefonoValido('222225'), false)
  assert.equal(telefonoValido(''), false)
  assert.equal(telefonoValido('1234567890123456789'), false)
})

test('el correo se comprueba sin inventar reglas raras', () => {
  assert.equal(correoValido('ana@ejemplo.mx'), true)
  for (const malo of ['', 'ana', 'ana@', '@ejemplo.mx', 'ana@ejemplo', 'a n@a.mx']) {
    assert.equal(correoValido(malo), false, `«${malo}» no es un correo`)
  }
})

// ---------- el alta ----------

test('un alta completa no tiene problemas', () => {
  assert.deepEqual(problemasDelAlta(ALTA_OK), [])
})

test('UN ALTA SIN GRUPO NO SE GUARDA', () => {
  // El agujero que se cerró el mismo día en las altas por directorio: dentro de
  // la academia, sin plan de estudios, sin contenido y sin salida.
  const p = problemasDelAlta({ ...ALTA_OK, grupoId: '' })
  assert.equal(p.length, 1)
  assert.match(p[0], /grupo/i)
})

test('sin teléfono o sin correo tampoco: son las vías de la bienvenida', () => {
  assert.match(problemasDelAlta({ ...ALTA_OK, email: '' })[0], /correo/i)
  assert.match(problemasDelAlta({ ...ALTA_OK, telefono: '' })[0], /teléfono/i)
})

test('los problemas se dicen en frases, no en un booleano', () => {
  // Quien está en un mostrador con alguien delante necesita saber QUÉ falta.
  const p = problemasDelAlta({})
  assert.equal(p.length, 4)
  for (const frase of p) assert.match(frase, /[a-z]{4}/)
})

test('el alta guardada viene limpia y con lo que pone el contexto', () => {
  const d = altaParaGuardar(ALTA_OK, { academiaId: 'RES-2026', matricula: 'RE0000007', creadoPor: 'u1' })
  assert.equal(d.nombre, 'Ana Ruiz')
  assert.equal(d.email, 'ana@ejemplo.mx')       // en minúsculas y sin espacios
  assert.equal(d.telefono, '2222256586')
  assert.equal(d.academiaId, 'RES-2026')
  assert.equal(d.matricula, 'RE0000007')
  // Ni la academia ni la matrícula salen del formulario: recepción no las teclea.
  assert.equal('academiaId' in ALTA_OK, false)
  assert.equal('matricula' in ALTA_OK, false)
})

// ---------- el pago ----------

const PAGO_OK = { monto: 1500, concepto: 'inscripcion', metodo: 'efectivo' }

test('un pago completo no tiene problemas, y sin pago tampoco', () => {
  assert.deepEqual(problemasDelPago(PAGO_OK), [])
  // Dar de alta sin cobrar es válido: no todo el mundo paga el mismo día.
  assert.deepEqual(problemasDelPago({ sinPago: true }), [])
  assert.deepEqual(problemasDelPago(null), [])
})

test('EL IMPORTE SE COMPRUEBA EN EL MOSTRADOR, no en el corte de caja', () => {
  assert.match(problemasDelPago({ ...PAGO_OK, monto: 0 })[0], /mayor que cero/)
  assert.match(problemasDelPago({ ...PAGO_OK, monto: -50 })[0], /mayor que cero/)
  assert.match(problemasDelPago({ ...PAGO_OK, monto: 'mil' })[0], /mayor que cero/)
  // Un dedo de más: 15000 → 150000.
  assert.match(problemasDelPago({ ...PAGO_OK, monto: 150000 })[0], /parece equivocado/)
})

test('el concepto y el método salen de la lista, no de texto libre', () => {
  assert.match(problemasDelPago({ ...PAGO_OK, concepto: 'lo que sea' })[0], /concepto/i)
  assert.match(problemasDelPago({ ...PAGO_OK, metodo: 'bitcoin' })[0], /cómo se pagó/i)
  assert.ok(METODOS_PAGO.length >= 3 && CONCEPTOS_PAGO.length >= 3)
})

test('el importe se guarda con dos decimales, sin arrastrar coma flotante', () => {
  const d = pagoParaGuardar({ ...PAGO_OK, monto: 1500.005 }, { academiaId: 'RES-2026', matricula: 'RE0000007' })
  assert.equal(d.monto, 1500.01)
  assert.equal(pagoParaGuardar({ ...PAGO_OK, monto: '1500.50' }, {}).monto, 1500.5)
})

// ---------- la bienvenida ----------

test('EL MENSAJE NO PROMETE UNA CONTRASEÑA QUE NO EXISTE', () => {
  // Sin Blaze el enlace lleva a CREARLA. Decir que va dentro deja a la persona
  // esperando algo que no llega, y a recepción respondiendo por ello.
  const t = textoDeBienvenida({
    nombre: 'Ana Ruiz', academiaNombre: 'R.E.S.C.A.T.E.',
    enlace: 'https://ptem.mx/#/cuenta?c=ABC', matricula: 'RE0000007',
  })
  assert.doesNotMatch(t, /contraseña temporal|tu contraseña es/i)
  assert.match(t, /crear tu contraseña/i)
  assert.match(t, /RE0000007/)
  assert.match(t, /https:\/\/ptem\.mx/)
  // Tutea por el nombre de pila: lo lee una persona, no un sistema.
  assert.match(t, /^Ana,/)
})

test('el enlace de WhatsApp lleva el mensaje dentro y el número limpio', () => {
  const url = enlaceWhatsApp('(222) 225-6586', 'Hola Ana')
  assert.match(url, /^https:\/\/wa\.me\/2222256586\?text=/)
  assert.match(url, /Hola%20Ana/)
  // Sin teléfono no hay enlace, en vez de uno roto que abre WhatsApp en blanco.
  assert.equal(enlaceWhatsApp('', 'Hola'), '')
})

// ---------- el cableado ----------

import { readFileSync } from 'node:fs'
const CAPA = readFileSync(new URL('../src/lib/firebase/recepcion.js', import.meta.url), 'utf8')
const CANJE = readFileSync(new URL('../src/lib/firebase/invitaciones.js', import.meta.url), 'utf8')
const REGLAS = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')

test('se valida ANTES de reservar la matrícula', () => {
  // Un número gastado por un formulario incompleto es un hueco en la
  // numeración que ya no se recupera.
  const iValida = CAPA.indexOf('problemasDelAlta(alta)')
  const iReserva = CAPA.indexOf('await reservarMatricula')
  assert.ok(iValida > 0 && iReserva > 0)
  assert.ok(iValida < iReserva, 'la matrícula se reserva antes de comprobar el formulario')
})

test('la invitación del alta es de UN SOLO USO', () => {
  // Un enlace reutilizable repartiría la misma matrícula a quien lo recibiera.
  assert.match(CAPA, /maxUsos: 1/, 'la invitación de un alta dejó de agotarse')
  assert.match(CAPA, /origen: 'recepcion'/)
})

test('al canjearla, el perfil recoge la ficha, y solo si viene', () => {
  // Una invitación normal no trae ficha: sobrescribir con vacío borraría el
  // nombre que la persona acababa de poner al registrarse.
  assert.match(CANJE, /if \(inv\.matricula\) deRecepcion\.matricula = inv\.matricula/)
  assert.match(CANJE, /if \(inv\.nombre\) deRecepcion\.nombre = inv\.nombre/)
})

test('el perfil solo puede copiar la matrícula que dice SU invitación', () => {
  // Sin esa atadura, cualquiera con una invitación válida se escribiría la
  // matrícula que quisiera —incluida la de otro— y el contador dejaría de ser
  // la única fuente de números.
  assert.match(REGLAS, /request\.resource\.data\.matricula\s*\n\s*== invitacionDoc\(request\.resource\.data\.invitacionUsada\)\.get\('matricula', ''\)/,
    'la matrícula del perfil dejó de estar atada a la de su invitación')
})

test('UN PAGO NO SE EDITA', () => {
  // Es un asiento: describe algo que ocurrió. Reescribir un importe borra la
  // única prueba de lo que se apuntó primero.
  const bloque = REGLAS.slice(REGLAS.indexOf('match /pagos/'))
  const hasta = bloque.slice(0, bloque.indexOf('match /contadores/'))
  assert.match(hasta, /allow update: if false/, 'los pagos volvieron a ser editables')
  assert.match(hasta, /allow delete: if esSuper\(\)/, 'borrar un pago dejó de ser del super-admin')
  assert.match(hasta, /monto > 0/, 'la regla dejó de comprobar el importe')
})

// ---------- la PANTALLA (O4a, 05-09-2026) ----------
//
//  El modelo, la escritura y las reglas de arriba se entregaron el 2 de
//  septiembre y se quedaron sin pantalla: existían, tenían pruebas, y no los
//  llamaba nadie. Una capa de datos que no invoca ninguna interfaz es código
//  muerto con buena letra, y `tests/limpieza.test.mjs` la habría marcado.
//  Estas pruebas comprueban que la pantalla sigue enchufada.

const PANTALLA = readFileSync(new URL('../src/components/panel/AltaDeRecepcion.jsx', import.meta.url), 'utf8')
const PUERTA = readFileSync(new URL('../src/pages/panel/Recepcion.jsx', import.meta.url), 'utf8')
const APP = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')

test('la pantalla de recepción llama a la capa real, no a Firestore por su cuenta', () => {
  // Toda escritura del proyecto pasa por src/lib/firebase/: es donde vive el
  // orden de las tres escrituras del alta, y saltárselo desde un componente
  // sería reimplementarlo mal.
  assert.match(PANTALLA, /import\('\.\.\/\.\.\/lib\/firebase\/recepcion\.js'\)/)
  assert.match(PANTALLA, /altaDeRecepcion\(/)
  assert.doesNotMatch(PANTALLA, /from 'firebase\/firestore'/,
    'la pantalla escribe en Firestore directamente, saltándose la capa')
})

test('la pantalla no inventa validaciones propias', () => {
  // Si el formulario decidiera por su cuenta qué es un teléfono válido, habría
  // dos reglas distintas para el mismo dato: la del navegador y la de la capa.
  assert.match(PANTALLA, /problemasDelAlta/)
  assert.match(PANTALLA, /problemasDelPago/)
})

test('el mensaje de bienvenida sale del modelo, no del componente', () => {
  // El día que lo mande una API en vez de una persona, el texto tiene que ser
  // el mismo.
  assert.match(PANTALLA, /textoDeBienvenida/)
  assert.match(PANTALLA, /enlaceWhatsApp/)
})

test('recepción está enrutada bajo el panel', () => {
  assert.match(APP, /path="recepcion" element=\{<PanelRecepcion \/>\}/)
  assert.match(APP, /const PanelRecepcion = lazy\(/, 'la pantalla dejó de cargarse bajo demanda')
})

test('recepción es del director: un profesor no la ve ni tecleando la ruta', () => {
  // Reserva matrícula y emite invitación; las dos cosas son de dirección. En el
  // menú lo decide `seccionesPanel`, y la propia pantalla lo vuelve a mirar
  // porque la ruta se puede escribir a mano.
  assert.match(PUERTA, /gestion !== 'director'/)
})
