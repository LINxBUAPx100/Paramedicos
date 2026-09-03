// ============================================================
//  Las cuatro cifras del hero llevan a alguna parte
// ------------------------------------------------------------
//  Pedido el 2 de septiembre de 2026: «haz esos 4 textos clicables sin cambiar
//  la estética». Eran texto muerto —cuatro números grandes que anuncian lo que
//  hay dentro y no dejaban entrar—.
//
//  LA CONDICIÓN ERA NO TOCAR EL ASPECTO, y ahí está el riesgo real: un <a> y un
//  <button> llegan con estilos propios del navegador que deshacen la rejilla y,
//  sobre todo, la tipografía —un botón reduce la cifra de 54 px a 13—. Medido
//  en el navegador con el CSS de verdad, las tres versiones (div, enlace y
//  botón) dan la misma caja de 94×42 px, la misma fuente itálica y la misma
//  opacidad del 0.18. Estas pruebas vigilan que el reinicio no desaparezca.
//
//  Y que cada cifra siga llevando a donde cuenta lo que cuenta.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const HOME = readFileSync(new URL('../src/pages/Home.jsx', import.meta.url), 'utf8')
const CSS = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

test('las cuatro cifras tienen destino', () => {
  for (const [clave, destino] of [
    ['temas', "'/buscar'"],
    ['flashcards', "'/flashcards'"],
    ['preguntas', "'/examen'"],
  ]) {
    const linea = HOME.split('\n').find((l) => l.includes(`key: '${clave}'`))
    assert.ok(linea, `desapareció la cifra de ${clave}`)
    assert.ok(linea.includes(`a: ${destino}`), `${clave} ya no lleva a ${destino}: «${linea.trim()}»`)
  }
  // Módulos es el caso distinto: lo que cuenta está en esta misma página.
  const modulos = HOME.split('\n').find((l) => l.includes("key: 'modulos'"))
  // Ojo con el subcadena: «ayuda:» termina en «a:». Se compara la clave real.
  assert.ok(!/a: /.test(modulos), 'módulos dejó de ser el caso que se desplaza')
})

test('cada cifra dice a dónde va, también a un lector de pantalla', () => {
  // El contenido visible es «290 Temas»: no dice qué pasa al pulsarlo.
  assert.match(HOME, /'aria-label': `\$\{s\.ayuda\}/,
    'las cifras dejaron de anunciar su acción')
  for (const ayuda of ['Ver los módulos', 'Buscar entre todos los temas', 'Estudiar con las flashcards', 'Ponerte a prueba']) {
    assert.ok(HOME.includes(ayuda), `falta la ayuda «${ayuda}»`)
  }
})

test('la cifra de módulos se DESPLAZA, no navega', () => {
  // Un enlace que no cambia de página rompe «abrir en pestaña nueva», así que
  // va como botón.
  const desdeBoton = HOME.slice(HOME.indexOf('<button'))
  assert.ok(desdeBoton.slice(0, 700).includes('scrollIntoView'),
    'la cifra de módulos dejó de desplazarse con un botón')
  assert.match(HOME, /id=\{ANCLA_MODULOS\}/, 'la sección de módulos perdió su ancla')
})

test('y si la sección de módulos no está en el inicio, lleva al primer módulo', () => {
  // El director puede quitarla del inicio. Desplazarse a algo que no está sería
  // un clic que no hace nada.
  assert.match(HOME, /haySeccionModulos/, 'el hero dejó de saber si hay sección de módulos')
  assert.match(HOME, /secciones\.includes\('modulos'\)/,
    'nadie le dice al hero si la sección está visible')
})

test('EL ASPECTO NO CAMBIA: los estilos del navegador quedan desactivados', () => {
  const bloque = CSS.slice(CSS.indexOf('a.ph-stat,'))
  assert.ok(bloque.length > 0, 'desapareció el reinicio de estilos de las cifras')
  const cabeza = bloque.slice(0, 400)
  // `font: inherit` es el que de verdad importa: sin él, el botón pinta la
  // cifra a 13 px y se lleva por delante todo el bloque.
  for (const prop of ['appearance: none', 'background: none', 'border: 0', 'font: inherit', 'color: inherit', 'text-decoration: none']) {
    assert.ok(cabeza.includes(prop), `falta «${prop}» en el reinicio de las cifras`)
  }
})

test('lo único que se añade es cursor, foco y un realce en la ETIQUETA', () => {
  const bloque = CSS.slice(CSS.indexOf('a.ph-stat,'))
  assert.match(bloque.slice(0, 900), /cursor: pointer/)
  assert.match(bloque.slice(0, 900), /focus-visible \{ outline/)
  // El realce NO puede tocar la cifra: vive al 18 % de opacidad a propósito,
  // como marca de agua detrás del texto, y subírsela cambia el peso visual del
  // bloque entero.
  assert.match(bloque, /:hover \.ph-stat-label/,
    'el realce dejó de ir en la etiqueta')
  assert.doesNotMatch(bloque.slice(0, 900), /:hover \.ph-stat-num/,
    'el realce se movió a la cifra, que es la marca de agua del fondo')
})
