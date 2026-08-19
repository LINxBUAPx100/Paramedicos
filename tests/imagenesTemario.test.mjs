// ============================================================
//  Galería de Logros — cada imagen debe llevar a un tema que EXISTA
// ------------------------------------------------------------
//  Por qué existe esta prueba: las 21 tarjetas de la galería no llevaban a
//  ninguna parte. Siete apuntaban a temas del temario ANTERIOR
//  (`cardiovascular-profundo`, `renal-hidroelectrolitico`, …), que desapareció
//  al adoptar el plan oficial de 287 temas, y las otras catorce no declaraban
//  destino. La tarjeta pintaba su flecha, el alumno la pulsaba y no pasaba nada.
//
//  Nada lo detectaba: el id de un tema es una cadena, y una cadena que ya no
//  corresponde a nada sigue siendo una cadena válida. Esto lo comprueba.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import fs from 'node:fs'
import path from 'node:path'
import { ATLAS_TEMAS, IMAGENES_POR_TEMA, imagenesDeTema } from '../src/data/imagenes.js'
import { todosLosTemas } from '../src/data/index.js'
import { esImagenPropia } from '../src/lib/img.js'

const IDS = new Set(todosLosTemas.map((t) => t.id))
const PUBLICO = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

test('la galería no está vacía (guardia de la propia prueba)', () => {
  assert.ok(ATLAS_TEMAS.length >= 20, `solo hay ${ATLAS_TEMAS.length} imágenes`)
  assert.ok(IDS.size === 287, `el plan debería tener 287 temas, tiene ${IDS.size}`)
})

test('toda imagen declara el tema al que lleva', () => {
  const sinTema = ATLAS_TEMAS.filter((t) => !t.tema).map((t) => t.clave)
  assert.deepEqual(sinTema, [], `Imágenes sin destino: ${sinTema.join(', ')}`)
})

test('el tema de cada imagen existe en el plan vigente', () => {
  const rotas = ATLAS_TEMAS
    .filter((t) => t.tema && !IDS.has(t.tema))
    .map((t) => `${t.clave} → ${t.tema}`)
  assert.deepEqual(rotas, [], `Imágenes que apuntan a un tema inexistente:\n  ${rotas.join('\n  ')}`)
})

test('las claves de imagen no se repiten', () => {
  const claves = ATLAS_TEMAS.map((t) => t.clave)
  assert.equal(new Set(claves).size, claves.length, 'hay claves duplicadas en la galería')
})

test('toda imagen PROPIA existe como archivo en public/', () => {
  // Una ruta con una letra de más no da error en ninguna parte: el navegador
  // pide un archivo que no está y la lección se queda con el hueco.
  const faltan = ATLAS_TEMAS
    .filter((t) => esImagenPropia(t.src))
    .filter((t) => !fs.existsSync(path.join(PUBLICO, t.src)))
    .map((t) => `${t.clave} → public/${t.src}`)
  assert.deepEqual(faltan, [], `Archivos de imagen que no existen:\n  ${faltan.join('\n  ')}`)
})

test('las imágenes de referencia por tema apuntan a temas y claves reales', () => {
  // Este mapa llevaba los ids del temario anterior, así que la galería
  // «Imágenes de referencia» de cada lección no se pintaba nunca.
  const claves = new Set(ATLAS_TEMAS.map((t) => t.clave))
  const temasRotos = Object.keys(IMAGENES_POR_TEMA).filter((id) => !IDS.has(id))
  const clavesRotas = Object.entries(IMAGENES_POR_TEMA)
    .flatMap(([id, lista]) => lista.filter((c) => !claves.has(c)).map((c) => `${id} → ${c}`))

  assert.deepEqual(temasRotos, [], `Temas inexistentes en el mapa: ${temasRotos.join(', ')}`)
  assert.deepEqual(clavesRotas, [], `Claves de imagen inexistentes: ${clavesRotas.join(', ')}`)
  // Y que de verdad devuelva algo: si el mapa quedara vacío, lo de arriba
  // pasaría sin haber comprobado nada.
  assert.ok(imagenesDeTema('m2-afi-cardiovascular').length >= 3)
})

// ============================================================
//  Imágenes del HOME servidas por el propio sitio
// ------------------------------------------------------------
//  Las tres bandas del Home (Ponte a Prueba, Logros, FlashCards) estaban en
//  Google Drive: no se podían recortar ni recolocar, y su CDN no garantiza el
//  hotlink. Ahora son archivos del repositorio en WebP y AVIF a varios anchos,
//  generados por `npm run optimizar:imagenes`, y RECORTADOS al dibujo.
//
//  Lo que protege esta prueba:
//    · que cada ancho DECLARADO exista como archivo (un `srcset` que promete un
//      ancho inexistente no da error en ninguna parte: el navegador pide el
//      archivo, recibe un 404 y el Home se queda con el hueco);
//    · que el `aspecto` declarado sea el del archivo DE VERDAD. Es lo que hace
//      que la caja se llene sin franjas ni recorte, y una cifra copiada a mano
//      que no cuadre volvería a dejar el dibujo pequeño dentro de aire vacío.
// ============================================================
import { BANDAS_HOME, IMG } from '../src/data/imagenes.js'
import { archivosDelJuego, juegoResponsivo } from '../src/lib/imagenLocal.js'

test('las tres bandas del Home existen en WebP y AVIF, ancho por ancho', () => {
  assert.deepEqual(BANDAS_HOME.map((b) => b.nombre), ['ponte-a-prueba', 'logros', 'flashcards'])
  const faltan = BANDAS_HOME.flatMap(({ nombre, anchos }) =>
    archivosDelJuego(nombre, { carpeta: 'home', anchos })
      .filter((rel) => !fs.existsSync(path.join(PUBLICO, rel)))
  )
  assert.deepEqual(faltan, [], `Archivos que no existen:\n  public/${faltan.join('\n  public/')}`)
})

test('el aspecto declarado es el real del archivo (si no, la caja no se llena)', async () => {
  // Se lee la cabecera del WebP más grande de cada banda y se compara con el
  // aspecto declarado. Tolerancia del 1 %: el redimensionado redondea píxeles.
  const dimensionesWebp = (buf) => {
    // WebP en formato VP8X/VP8L/VP8 ; basta con el trozo del contenedor RIFF.
    if (buf.toString('ascii', 0, 4) !== 'RIFF') return null
    const tipo = buf.toString('ascii', 12, 16)
    if (tipo === 'VP8X') return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1, h: (buf.readUIntLE(27, 3) & 0xffffff) + 1 }
    if (tipo === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff }
    if (tipo === 'VP8L') {
      const b = buf.readUInt32LE(21)
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 }
    }
    return null
  }
  for (const { clave, nombre, anchos, aspecto } of BANDAS_HOME) {
    const mayor = Math.max(...anchos)
    const buf = fs.readFileSync(path.join(PUBLICO, `home/${nombre}-${mayor}.webp`))
    const d = dimensionesWebp(buf)
    assert.ok(d, `no se pudo leer el tamaño de ${nombre}-${mayor}.webp`)
    const [an, al] = aspecto.split('/').map((n) => Number(n.trim()))
    const declarado = an / al
    const real = d.w / d.h
    assert.ok(
      Math.abs(declarado - real) / real < 0.01,
      `${clave}: aspecto declarado ${declarado.toFixed(3)} pero el archivo es ${d.w}x${d.h} (${real.toFixed(3)})`
    )
    // Y el ancho mayor declarado tiene que ser el del archivo, no uno inventado.
    assert.equal(d.w, mayor, `${clave}: el archivo -${mayor} mide ${d.w} px de ancho`)
  }
})

test('el Home ya no pide sus imágenes a Google Drive', () => {
  // La regresión que hay que impedir: volver a pegar un enlace de Drive aquí.
  const json = JSON.stringify(IMG)
  assert.ok(!/drive\.google|googleusercontent/.test(json), `IMG vuelve a apuntar fuera: ${json}`)
  for (const { clave, anchos, aspecto } of BANDAS_HOME) {
    const j = IMG[clave]
    assert.ok(j.src && j.srcSet && j.srcSetAvif, `${clave} no trae juego responsivo completo`)
    assert.equal(j.srcSet.split(',').length, anchos.length)
    assert.equal(j.srcSetAvif.split(',').length, anchos.length)
    assert.equal(j.ratio, aspecto, `${clave} debe llevar su proporción para que la caja la use`)
  }
})

test('el juego responsivo se arma con el formato que espera el navegador', () => {
  const j = juegoResponsivo('logros', { carpeta: 'home', anchos: [480, 800], sizes: '100vw' })
  assert.match(j.srcSet, /home\/logros-480\.webp 480w, .*home\/logros-800\.webp 800w$/)
  assert.match(j.srcSetAvif, /home\/logros-480\.avif 480w, .*home\/logros-800\.avif 800w$/)
  assert.equal(j.sizes, '100vw')
  // La reserva sin `srcset` es un ancho intermedio, no el más grande: si el
  // navegador no entiende srcset, tampoco debería tragarse la imagen mayor.
  assert.match(j.src, /home\/logros-800\.webp$/)
  assert.match(juegoResponsivo('x', { anchos: [480] }).src, /x-480\.webp$/)
})
