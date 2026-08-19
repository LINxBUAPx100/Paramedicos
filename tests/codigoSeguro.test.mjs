// ============================================================
//  Pruebas del generador de códigos de acceso
// ------------------------------------------------------------
//  Estas no son pruebas de formato: son de SEGURIDAD. Todo el reparto de
//  acceso de la plataforma —invitación con rol, grupo, prueba— cuelga de un
//  código, y las reglas permiten que cualquier usuario autenticado consulte uno
//  concreto (hace falta para canjearlo). O sea que la longitud y la calidad del
//  azar son lo único que separa a un extraño de una invitación de DIRECTOR.
//
//  Lo que se protege aquí:
//    · que el secreto no se acorte por descuido (cada carácter que se quita
//      divide el trabajo del atacante entre 31);
//    · que salga de un generador criptográfico y no de Math.random();
//    · que no haya sesgo en el alfabeto (un generador que favorece unas letras
//      reduce el espacio real de búsqueda);
//    · y que, si el navegador no puede generar azar seguro, FALLE en vez de
//      emitir un código adivinable en silencio.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ALFABETO, LARGO_SECRETO, bitsDeEntropia, secretoAleatorio,
} from '../src/lib/codigoSeguro.js'
import { generarCodigoInvitacion } from '../src/lib/invitacionesModelo.js'

test('el secreto tiene la longitud declarada y solo usa el alfabeto', () => {
  const s = secretoAleatorio()
  assert.equal(s.length, LARGO_SECRETO)
  for (const c of s) assert.ok(ALFABETO.includes(c), `carácter fuera del alfabeto: ${c}`)
})

test('la entropía no baja del umbral que hace inviable la fuerza bruta', () => {
  // 40 bits ≈ 8.5×10¹¹ combinaciones: a 10.000 intentos/s son ~2.700 años.
  // Con los 4 caracteres de antes eran 20 bits: ~9×10⁵, o sea minutos.
  assert.ok(LARGO_SECRETO >= 8, `el secreto se quedó en ${LARGO_SECRETO} caracteres`)
  assert.ok(bitsDeEntropia() >= 39, `solo ${bitsDeEntropia()} bits de entropía`)
  assert.equal(bitsDeEntropia(4), 20, 'referencia: lo que había antes')
})

test('no se repite: 500 secretos seguidos son 500 secretos distintos', () => {
  const vistos = new Set()
  for (let i = 0; i < 500; i++) vistos.add(secretoAleatorio())
  assert.equal(vistos.size, 500)
})

test('descarta los bytes que introducirían sesgo de módulo', () => {
  // 256 no es múltiplo de 31, así que `byte % 31` haría más probables las 8
  // primeras letras. Los bytes ≥ 248 se descartan y se vuelve a tirar.
  const cola = [248, 250, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let i = 0
  const fuente = (buf) => { for (let k = 0; k < buf.length; k++) buf[k] = cola[i++ % cola.length]; return buf }
  const s = secretoAleatorio(8, fuente)
  assert.equal(s.length, 8)
  // Los tres primeros bytes (248, 250, 255) se tiran: el secreto empieza por
  // los valores 0,1,2… del alfabeto, no por lo que darían esos bytes.
  assert.equal(s.slice(0, 3), ALFABETO[0] + ALFABETO[1] + ALFABETO[2])
})

test('sin generador criptográfico NO inventa un código: falla', () => {
  // Un código emitido con azar predecible es peor que un error, porque nadie
  // se entera hasta que alguien lo adivina.
  // `globalThis.crypto` es una propiedad de solo lectura en Node: para
  // simular un entorno sin ella hay que redefinirla.
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto')
  try {
    Object.defineProperty(globalThis, 'crypto', { value: undefined, configurable: true })
    assert.throws(() => secretoAleatorio(), /no puede generar códigos seguros/i)
  } finally {
    Object.defineProperty(globalThis, 'crypto', descriptor)
  }
})

test('la invitación conserva su prefijo legible y estrena secreto largo', () => {
  const cod = generarCodigoInvitacion({ academiaId: 'AEP-2026', rol: 'admin_escuela' })
  assert.match(cod, /^INV-AEP-D-[A-Z2-9]{8}$/, cod)
  // Y dos seguidas no coinciden (no es un contador ni una semilla fija).
  assert.notEqual(cod, generarCodigoInvitacion({ academiaId: 'AEP-2026', rol: 'admin_escuela' }))
})

test('el alfabeto sigue sin caracteres que se confunden al dictarlo', () => {
  for (const c of '01OIL') assert.ok(!ALFABETO.includes(c), `${c} vuelve a estar en el alfabeto`)
  assert.equal(ALFABETO.length, 31)
})
