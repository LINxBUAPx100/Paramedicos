// ============================================================
//  Pruebas de la galería de Logros derivada del contenido
// ------------------------------------------------------------
//  Lo que se protege: que una imagen añadida a una lección aparezca en Logros
//  SIN tener que anotarla en ninguna lista, que lo haga con su tema (para que
//  se bloquee y se descubra con él) y que nada salga duplicado.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { galeriaDeLogros } from '../src/lib/galeriaLogros.js'

const TEMAS = [
  {
    id: 'm1-t1', titulo: 'Introducción', moduloId: 'm1',
    secciones: [{
      titulo: 'Uno',
      bloques: [
        { tipo: 'p', texto: 'sin imagen' },
        { tipo: 'imagen', src: 'imagenes/m1/uno.webp', caption: 'Cadena de supervivencia' },
      ],
    }],
  },
  {
    id: 'm1-t2', titulo: 'AVDI', moduloId: 'm1',
    secciones: [{
      titulo: 'Dos',
      bloques: [
        { tipo: 'imagen', src: 'imagenes/m1/dos.webp', alt: 'Escala AVDI' },
        { tipo: 'imagen', src: '   ' }, // sin imagen de verdad: se descarta
        { tipo: 'diagrama', clave: 'ecg' }, // saca el src del catálogo
      ],
    }],
  },
  {
    id: 'm2-t1', titulo: 'Célula', moduloId: 'm2',
    secciones: [{
      titulo: 'Tres',
      // Repite una imagen que ya salió en el módulo 1.
      bloques: [{ tipo: 'imagen', src: 'imagenes/m1/uno.webp', caption: 'Otra vez' }],
    }],
  },
]

const CATALOGO = [
  { clave: 'ecg', titulo: 'Onda del ECG', tema: 'm1-t2', src: 'imagenes/m3/ecg.svg' },
  { clave: 'suelta', titulo: 'Imagen que no está en ninguna lección', tema: 'm2-t1', src: 'imagenes/m2/suelta.svg' },
  { clave: 'vacia', titulo: 'Sin archivo', tema: 'm1-t1', src: '' },
]

test('una imagen puesta en una lección entra sola en la galería', () => {
  const g = galeriaDeLogros(TEMAS, [])
  assert.deepEqual(g.map((x) => x.src), ['imagenes/m1/uno.webp', 'imagenes/m1/dos.webp'])
  assert.equal(g[0].origen, 'contenido')
})

test('cada imagen llega con SU tema: es lo que la bloquea y la descubre', () => {
  const g = galeriaDeLogros(TEMAS, CATALOGO)
  assert.equal(g.find((x) => x.src === 'imagenes/m1/uno.webp').tema, 'm1-t1')
  assert.equal(g.find((x) => x.src === 'imagenes/m1/dos.webp').tema, 'm1-t2')
})

test('el título sale del pie, del alt o del título del bloque, y si no, del tema', () => {
  const g = galeriaDeLogros(TEMAS, [])
  assert.equal(g[0].titulo, 'Cadena de supervivencia') // caption
  assert.equal(g[1].titulo, 'Escala AVDI') // alt
  const sinNada = galeriaDeLogros(
    [{ id: 't', titulo: 'Tema sin pie', secciones: [{ bloques: [{ tipo: 'imagen', src: 'a.webp' }] }] }],
    [],
  )
  assert.equal(sinNada[0].titulo, 'Tema sin pie')
})

test('la misma imagen no sale dos veces aunque se use en varias lecciones', () => {
  const g = galeriaDeLogros(TEMAS, CATALOGO)
  const repetida = g.filter((x) => x.src === 'imagenes/m1/uno.webp')
  assert.equal(repetida.length, 1)
  assert.equal(repetida[0].tema, 'm1-t1', 'se queda con la primera lección donde aparece')
})

test('un diagrama que solo trae la clave saca su imagen del catálogo', () => {
  const g = galeriaDeLogros(TEMAS, CATALOGO)
  const ecg = g.filter((x) => x.src === 'imagenes/m3/ecg.svg')
  assert.equal(ecg.length, 1, 'y no se duplica con la entrada del catálogo')
  assert.equal(ecg[0].clave, 'ecg')
  assert.equal(ecg[0].ancla, 'ecg', 'con ancla: se puede saltar a ese punto de la lección')
})

test('el catálogo aporta lo que no está incrustado en ninguna lección', () => {
  const g = galeriaDeLogros(TEMAS, CATALOGO)
  const suelta = g.find((x) => x.clave === 'suelta')
  assert.ok(suelta, 'la imagen suelta debe seguir en la galería')
  assert.equal(suelta.origen, 'catalogo')
  assert.ok(!g.some((x) => x.clave === 'vacia'), 'una entrada sin archivo no se pinta')
})

test('la galería sigue el orden del plan', () => {
  const g = galeriaDeLogros(TEMAS, CATALOGO)
  const temas = g.map((x) => x.tema)
  const posicion = { 'm1-t1': 0, 'm1-t2': 1, 'm2-t1': 2 }
  const orden = temas.map((t) => posicion[t])
  assert.deepEqual(orden, [...orden].sort((a, b) => a - b), `orden real: ${temas.join(', ')}`)
})

test('sin contenido o con basura no se rompe', () => {
  assert.deepEqual(galeriaDeLogros(null, null), [])
  assert.deepEqual(galeriaDeLogros([], []), [])
  assert.deepEqual(galeriaDeLogros([{ id: 'x', secciones: null }], []), [])
  assert.deepEqual(galeriaDeLogros([{ id: 'x', secciones: [{ bloques: [null, { tipo: 'p' }] }] }], []), [])
})
