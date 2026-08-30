// ============================================================
//  Términos y condiciones — aceptación y contenido del texto
// ------------------------------------------------------------
//  Lo que se protege aquí:
//   1. se guarda la VERSIÓN aceptada, no un booleano: al cambiar el texto hay
//      que volver a preguntar, o la gente queda vinculada a un acuerdo que
//      nunca leyó;
//   2. no se le pide aceptar a quien todavía no tiene perfil cargado (le
//      saldría el muro durante el parpadeo de carga) ni al super-admin;
//   3. la fecha de aceptación NO la pone el cliente;
//   4. el texto no promete cosas que el software no hace. El borrador original
//      afirmaba que «el sistema monitorea direcciones IP y conexiones
//      simultáneas», y no lo hace: no hay una sola línea de código que registre
//      una IP. Un contrato que declara una vigilancia inexistente es falso y
//      compromete a un tratamiento de datos que nadie implantó.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import {
  normalizarAceptacion, aceptoTerminos, debePedirTerminos, fichaAceptacion, fechaDeAceptacion,
} from '../src/lib/terminosModelo.js'
import { TERMINOS, VERSION_TERMINOS, TITULO_TERMINOS, JURISDICCION } from '../src/data/terminos.js'

const V = VERSION_TERMINOS
const ACEPTADO = { terminos: { version: V, aceptadoEn: { seconds: 1788000000 } } }

// ---------- 1. se guarda la versión, no un booleano ----------

test('aceptar vale solo para la versión que se aceptó', () => {
  assert.equal(aceptoTerminos(ACEPTADO), true)
  assert.equal(aceptoTerminos({ terminos: { version: '2020-01-01' } }), false, 'una versión vieja no vale')
  assert.equal(aceptoTerminos({ terminos: { version: '2099-01-01' } }), false, 'ni una futura')
  assert.equal(aceptoTerminos({}), false)
  assert.equal(aceptoTerminos(null), false)
})

test('un booleano heredado no cuela como aceptación', () => {
  // Si alguna versión anterior hubiera guardado `aceptoTerminos: true`, no
  // dice QUÉ se aceptó: hay que volver a preguntar.
  assert.equal(aceptoTerminos({ aceptoTerminos: true }), false)
  assert.equal(aceptoTerminos({ terminos: true }), false)
  assert.equal(aceptoTerminos({ terminos: { version: 'la ultima' } }), false)
})

test('normalizarAceptacion se queda solo con lo que reconoce', () => {
  const n = normalizarAceptacion({ version: V, aceptadoEn: 7, rol: 'superadmin' })
  assert.deepEqual(Object.keys(n).sort(), ['aceptadoEn', 'version'])
  assert.equal(normalizarAceptacion({ version: '30-08-2026' }).version, null)
  assert.equal(normalizarAceptacion(null).version, null)
  assert.equal(normalizarAceptacion('no soy un objeto').version, null)
})

// ---------- 2. a quién se le pide ----------

test('se le pide a quien no ha aceptado y tiene perfil', () => {
  assert.equal(debePedirTerminos({ perfil: {}, perfilListo: true, rol: 'alumno' }), true)
  assert.equal(debePedirTerminos({ perfil: ACEPTADO, perfilListo: true, rol: 'alumno' }), false)
})

test('no se le pide a quien aún está cargando: el muro no sale en el parpadeo', () => {
  assert.equal(debePedirTerminos({ perfil: null, perfilListo: false, rol: 'alumno' }), false)
  assert.equal(debePedirTerminos({ perfil: null, perfilListo: true, rol: 'alumno' }), false)
  assert.equal(debePedirTerminos({}), false)
})

test('el super-admin no pasa por la puerta: administra la plataforma', () => {
  assert.equal(debePedirTerminos({ perfil: {}, perfilListo: true, esSupremo: true }), false)
  assert.equal(debePedirTerminos({ perfil: {}, perfilListo: true, rol: 'superadmin' }), false)
})

test('el profesor y el director sí la cruzan', () => {
  for (const rol of ['alumno', 'instructor', 'admin_escuela']) {
    assert.equal(debePedirTerminos({ perfil: {}, perfilListo: true, rol }), true, `${rol} debería aceptarlos`)
  }
})

test('al cambiar la versión del texto, todo el mundo vuelve a aceptar', () => {
  assert.equal(debePedirTerminos({ perfil: ACEPTADO, perfilListo: true, rol: 'alumno' }, '2027-01-01'), true)
})

// ---------- 3. la fecha la pone el servidor ----------

test('fichaAceptacion guarda la versión y deja la fecha a quien la llama', () => {
  const marca = { _metodo: 'serverTimestamp' } // lo que devuelve Firestore
  const ficha = fichaAceptacion(marca)
  assert.deepEqual(Object.keys(ficha).sort(), ['aceptadoEn', 'version'])
  assert.equal(ficha.version, V)
  assert.equal(ficha.aceptadoEn, marca, 'no se inventa una fecha en el cliente')
})

test('fichaAceptacion rechaza una versión que no es una fecha', () => {
  assert.throws(() => fichaAceptacion(null, 'v2'), /invalida/i)
  assert.throws(() => fichaAceptacion(null, ''), /invalida/i)
})

test('fechaDeAceptacion lee la marca de Firestore, o null', () => {
  assert.match(fechaDeAceptacion(ACEPTADO), /^\d{4}-\d{2}-\d{2}$/)
  assert.equal(fechaDeAceptacion({}), null)
  assert.equal(fechaDeAceptacion({ terminos: { version: V } }), null)
})

// ---------- 4. el texto dice la verdad ----------

test('la versión del texto es una fecha', () => {
  assert.match(VERSION_TERMINOS, /^\d{4}-\d{2}-\d{2}$/)
})

test('el documento está completo y bien formado', () => {
  assert.ok(TERMINOS.length >= 8, `solo ${TERMINOS.length} apartados`)
  assert.ok(TITULO_TERMINOS.length > 0)
  assert.match(JURISDICCION, /Puebla/)
  TERMINOS.forEach((s, i) => {
    assert.equal(s.n, i + 1, 'los apartados van numerados y en orden: un contrato se cita por número')
    assert.ok(s.titulo && s.titulo.length > 3, `apartado ${s.n} sin título`)
    const cuerpo = [...(s.parrafos || []), ...(s.puntos || []).map((p) => p.texto)]
    assert.ok(cuerpo.length > 0, `apartado ${s.n} vacío`)
    for (const t of cuerpo) assert.ok(t && t.trim().length > 20, `texto demasiado corto en el apartado ${s.n}`)
    for (const p of s.puntos || []) assert.ok(p.titulo, `punto sin título en el apartado ${s.n}`)
  })
})

test('el texto NO afirma una vigilancia que la plataforma no hace', () => {
  const todo = JSON.stringify(TERMINOS).toLowerCase()
  for (const falso of ['direcciones ip', 'dirección ip', 'conexiones simultáneas', 'monitorea']) {
    assert.ok(!todo.includes(falso), `el texto declara «${falso}» y el software no lo hace`)
  }
})

test('y el código tampoco registra direcciones IP, que es lo que lo hace cierto', () => {
  // Guarda de los dos lados: si algún día se implanta ese registro, esta prueba
  // falla y obliga a decidir a conciencia —declararlo en el texto y en el aviso
  // de privacidad— en vez de dejar el contrato desactualizado en silencio.
  const sospechosas = /\b(remoteAddr|x-forwarded-for|ipAddress|clientIp)\b/i
  const revisar = (rel) => {
    const dir = fileURLToPath(new URL(rel, import.meta.url))
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const ruta = `${rel}/${e.name}`
      if (e.isDirectory()) { revisar(ruta); continue }
      if (!/\.(js|jsx)$/.test(e.name)) continue
      const src = readFileSync(new URL(ruta, import.meta.url), 'utf8')
      assert.ok(!sospechosas.test(src), `${ruta} parece registrar la IP del usuario`)
    }
  }
  revisar('../src/lib')
})

test('el descargo médico sigue estando, y sigue diciendo lo mismo que la app', () => {
  const medico = TERMINOS.find((s) => /responsabilidad|médico/i.test(s.titulo))
  assert.ok(medico, 'falta el apartado de limitación de responsabilidad')
  const texto = (medico.parrafos || []).join(' ').toLowerCase()
  assert.ok(texto.includes('protocolo'), 'no remite al protocolo del servicio')
  assert.ok(texto.includes('académico'), 'no aclara que el contenido es académico')
})

test('hay un apartado de datos personales: la plataforma guarda datos', () => {
  const datos = TERMINOS.find((s) => /datos personales/i.test(s.titulo))
  assert.ok(datos, 'el borrador original no lo traía y la plataforma sí guarda datos')
  const texto = (datos.parrafos || []).join(' ').toLowerCase()
  for (const dato of ['nombre', 'correo', 'avance']) {
    assert.ok(texto.includes(dato), `no declara que se guarda: ${dato}`)
  }
})
