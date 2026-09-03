// ============================================================
//  Las portadas públicas se pintan a sangre
// ------------------------------------------------------------
//  EL FALLO, visto el 2 de septiembre de 2026 en `/paramedicos`: la portada
//  salía metida en la caja de 1100 px del contenido normal. Sus franjas de
//  color —pensadas para ir de borde a borde— quedaban recortadas a media
//  pantalla con el pie a todo lo ancho justo debajo, y la página parecía rota
//  por la mitad.
//
//  La causa era una condición que se quedó atrás: el ancho completo se aplicaba
//  solo si la ruta era EXACTAMENTE `/`. Cuando la portada general se mudó a la
//  raíz y la de paramédicos a `/paramedicos`, esta última dejó de cumplirla.
//
//  Se arregla desde el CATÁLOGO de carreras, y por eso hay prueba: una lista
//  escrita a mano en el Layout volvería a quedarse atrás con la carrera
//  siguiente, que es exactamente lo que acaba de pasar.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { carrerasPublicas } from '../src/lib/carrerasModelo.js'

const LAYOUT = readFileSync(new URL('../src/components/Layout.jsx', import.meta.url), 'utf8')
const CSS = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

test('el ancho completo NO se decide comparando con una sola ruta', () => {
  assert.doesNotMatch(LAYOUT, /const esHome = location\.pathname === '\/'/,
    'volvió la condición que dejaba fuera a todas las portadas menos la raíz')
})

test('sale del catálogo, así que una carrera nueva no exige tocar el Layout', () => {
  assert.match(LAYOUT, /carrerasPublicas\(\)\.map\(\(c\) => `\/\$\{c\.slug\}`\)/,
    'el Layout dejó de derivar las portadas del catálogo de carreras')
  // Y hay carreras que cubrir: si el catálogo se vaciara, la prueba de arriba
  // pasaría sin demostrar nada.
  assert.ok(carrerasPublicas().length >= 2,
    `solo hay ${carrerasPublicas().length} carrera(s) pública(s) en el catálogo`)
})

test('la raíz sigue incluida', () => {
  assert.match(LAYOUT, /new Set\(\['\/', \.\.\.carrerasPublicas/,
    'la portada general se quedó fuera del ancho completo')
})

test('EL BOTÓN DEL CIERRE NO PUEDE SER CARBÓN SOBRE CARBÓN', () => {
  // La sección tiene fondo `--carbon` y su llamada principal usaba
  // `.btn--carbon`: un botón invisible con un texto blanco flotando encima.
  // Parecía una decisión de diseño.
  assert.match(CSS, /\.lp-cierre \.btn--carbon \{[^}]*background: var\(--carbon-texto\)/,
    'la llamada principal del cierre volvió a pintarse del color del fondo')
})

test('el recorte de la foto termina en degradado, no en un filo', () => {
  const bloque = CSS.slice(CSS.indexOf('.lp-portada-foto img'))
  assert.match(bloque.slice(0, 600), /mask-image: linear-gradient\(to bottom/,
    'la foto del hero volvió a cortarse en seco por abajo, con los flecos del recorte a la vista')
})
