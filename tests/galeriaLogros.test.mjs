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

// ============================================================
//  COBERTURA TOTAL: nada que se vea en el temario falta en Logros
// ------------------------------------------------------------
//  Esta es la garantía que pidió el usuario: «que en Logros estén el 100 % de
//  las imágenes que se vean en el temario, módulos y subtemas».
//
//  El recuento de la derecha se hace APARTE de galeriaDeLogros: recorre el
//  contenido real y anota toda imagen que el alumno puede llegar a ver, sea de
//  donde sea (bloque del cuerpo, «Imágenes del tema» de recursos, o galería de
//  referencia del tema). Si mañana aparece un cuarto sitio con imágenes y nadie
//  lo añade a la galería, esta prueba lo dice.
// ============================================================
import { todosLosTemas } from '../src/data/index.js'
import { ATLAS_TEMAS, imagenesDeTema } from '../src/data/imagenes.js'

// Toda imagen visible en el temario, contada sin usar galeriaDeLogros.
function imagenesQueElAlumnoVe() {
  const catalogo = new Map(ATLAS_TEMAS.map((c) => [c.clave, c]))
  const srcs = new Set()
  const apunta = (v) => { const s = String(v || '').trim(); if (s) srcs.add(s) }
  for (const tema of todosLosTemas) {
    // 1. cuerpo de la lección (Contenido.jsx)
    for (const sec of tema.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b?.tipo !== 'imagen' && b?.tipo !== 'diagrama') continue
        apunta(b.src || catalogo.get(b.clave)?.src)
      }
    }
    // 2. «Imágenes del tema» (Recursos.jsx)
    for (const img of tema.recursos?.imagenes || []) apunta(img?.src)
    // 3. «Imágenes de referencia» (TemaPage, desde IMAGENES_POR_TEMA)
    for (const img of imagenesDeTema(tema.id)) apunta(img.src)
  }
  return srcs
}

test('Logros contiene el 100 % de las imágenes visibles del temario', () => {
  const galeria = galeriaDeLogros(todosLosTemas, ATLAS_TEMAS)
  const enGaleria = new Set(galeria.map((g) => g.src))
  const visibles = imagenesQueElAlumnoVe()

  // Guardia de la propia prueba: si el recuento se quedara en cero, todo lo de
  // abajo pasaría sin comprobar nada (el falso verde clásico).
  assert.ok(visibles.size >= 20, `solo se contaron ${visibles.size} imágenes visibles`)

  const faltan = [...visibles].filter((s) => !enGaleria.has(s))
  assert.deepEqual(
    faltan, [],
    'Estas imágenes se ven en el temario pero NO aparecen en Logros:\n  ' + faltan.join('\n  ')
  )
})

test('y toda tarjeta de Logros lleva a un tema que existe', () => {
  const galeria = galeriaDeLogros(todosLosTemas, ATLAS_TEMAS)
  const ids = new Set(todosLosTemas.map((t) => t.id))
  const rotas = galeria.filter((g) => g.tema && !ids.has(g.tema)).map((g) => `${g.clave} → ${g.tema}`)
  assert.deepEqual(rotas, [], `Tarjetas con destino inexistente:\n  ${rotas.join('\n  ')}`)
  // Y ninguna se queda sin imagen ni sin título: una tarjeta vacía no es un logro.
  assert.deepEqual(galeria.filter((g) => !g.src || !g.titulo), [])
})

test('las imágenes de `recursos.imagenes` también entran (las sube un editor)', () => {
  // Este era el hueco real: el panel permite añadir imágenes a un tema por esa
  // vía, la lección las pinta bajo «Imágenes del tema», y Logros no las veía.
  const conRecursos = [{
    id: 'm1-t1', titulo: 'Tema con recursos',
    secciones: [{ bloques: [{ tipo: 'imagen', src: 'imagenes/cuerpo.webp', caption: 'En el cuerpo' }] }],
    recursos: {
      imagenes: [
        { src: 'imagenes/subida.webp', caption: 'Subida por el profesor' },
        { src: '  ' },
        { src: 'imagenes/cuerpo.webp', caption: 'repetida: no duplica' },
      ],
    },
  }]
  const g = galeriaDeLogros(conRecursos, [])
  assert.deepEqual(g.map((x) => x.src), ['imagenes/cuerpo.webp', 'imagenes/subida.webp'])
  const subida = g[1]
  assert.equal(subida.titulo, 'Subida por el profesor')
  assert.equal(subida.tema, 'm1-t1', 'con su tema: se bloquea y se descubre con él')
  assert.equal(subida.ancla, null, 'no vive en una sección, así que no hay punto al que saltar')
})
