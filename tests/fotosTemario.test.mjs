// ============================================================
//  Las fotografías de contexto llegan donde deben, y no en silencio
// ------------------------------------------------------------
//  Lo que estas pruebas impiden, en una frase: que una foto apunte a un tema
//  que no existe y nadie se entere. `aplicarFotos` no revienta cuando eso
//  pasa —no debe: una foto mal dirigida no puede tumbar el temario— así que
//  hace falta que alguien mire la lista de omitidas. Ese alguien es esto.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  FOTOS, RESERVADAS, ANCHOS, CARPETA, bloqueDeFoto, aplicarFotos,
} from '../src/data/fotosTemario.js'
import CONTENIDO, { FOTOS_OMITIDAS } from '../src/data/contenido/index.js'
import { validarContenidoTema } from '../src/lib/temaContenidoModelo.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

test('NINGUNA foto se queda fuera sin que se sepa', () => {
  assert.deepEqual(FOTOS_OMITIDAS, [],
    'Hay fotos declaradas que no llegaron a su tema:\n'
    + FOTOS_OMITIDAS.map((o) => `  ${o.clave} → ${o.temaId}: ${o.motivo}`).join('\n'))
})

test('cada foto apunta a un tema que existe y tiene secciones', () => {
  for (const f of FOTOS) {
    const tema = CONTENIDO[f.temaId]
    assert.ok(tema, `${f.clave} apunta a ${f.temaId}, que no existe`)
    assert.ok(tema.secciones?.length > 0,
      `${f.clave} apunta a ${f.temaId}, que no tiene secciones: sería una lección que es solo una foto`)
  }
})

test('los archivos existen en TODOS los anchos declarados', () => {
  // Un `srcset` que promete un ancho inexistente sirve un 404 justo en las
  // pantallas grandes, que son las que lo piden.
  for (const f of [...FOTOS, ...RESERVADAS]) {
    for (const w of ANCHOS) {
      for (const ext of ['webp', 'avif']) {
        const rel = path.join('public', 'imagenes', CARPETA, `${f.clave}-${w}.${ext}`)
        // El ancho mayor puede faltar si el original era más pequeño; el
        // script lo omite a propósito en vez de agrandar. Los dos primeros no.
        if (w === ANCHOS[ANCHOS.length - 1]) continue
        assert.ok(existsSync(path.join(RAIZ, rel)),
          `falta ${rel} — regenera con npm run optimizar:fotos`)
      }
    }
  }
})

test('el src del bloque apunta a un archivo que existe', () => {
  for (const f of FOTOS) {
    const src = bloqueDeFoto(f).src
    assert.ok(existsSync(path.join(RAIZ, 'public', src)), `${src} no existe`)
  }
})

test('el bloque que se inserta pasa el validador del modelo', () => {
  // Si no, el editor y las reglas rechazarían el tema al guardarlo.
  // `validarContenidoTema` devuelve el PRIMER problema como texto, o null si
  // no hay ninguno: por eso se compara contra null y no contra un arreglo.
  for (const f of FOTOS) {
    const tema = { secciones: [{ titulo: 'X', bloques: [bloqueDeFoto(f)] }] }
    assert.equal(validarContenidoTema(tema), null, `${f.clave}: ${validarContenidoTema(tema)}`)
  }
})

test('ninguna foto cae en un examen ni en una práctica', () => {
  for (const f of FOTOS) {
    assert.doesNotMatch(f.temaId, /examen|practica|parcial/,
      `${f.clave} cae en ${f.temaId}: los nodos de evaluación no llevan prosa ni figuras`)
  }
})

test('toda foto trae alt y pie, y el alt no repite el pie', () => {
  for (const f of FOTOS) {
    assert.ok(f.alt && f.alt.length > 25, `${f.clave} necesita un alt que describa la escena`)
    assert.ok(f.caption && f.caption.length > 10, `${f.clave} necesita pie`)
    assert.notEqual(f.alt, f.caption,
      `${f.clave}: el alt es para quien NO ve la imagen y el pie para quien sí. Repetirlos hace que un lector de pantalla lo lea dos veces`)
  }
})

test('ninguna clave se repite y ninguna reservada está también colocada', () => {
  const claves = FOTOS.map((f) => f.clave)
  assert.equal(new Set(claves).size, claves.length, 'hay claves de foto repetidas')
  const colocadas = new Set(claves)
  for (const r of RESERVADAS) {
    assert.equal(colocadas.has(r.clave), false,
      `${r.clave} figura como reservada Y como colocada`)
  }
})

test('un tema que ya tiene imagen no recibe una segunda', () => {
  // Es la regla que hace posible reemplazar una foto por una figura real más
  // adelante: en cuanto la lección tenga su propia imagen, ésta se aparta.
  const base = {
    't1': { secciones: [{ titulo: 'A', bloques: [{ tipo: 'imagen', src: 'imagenes/m1/x.webp' }] }] },
  }
  const { contenido, omitidas } = aplicarFotos(base, [
    { clave: 'k', temaId: 't1', alt: 'a'.repeat(30), caption: 'pie' },
  ])
  assert.equal(contenido.t1.secciones[0].bloques.length, 1, 'no debe añadirse una segunda imagen')
  assert.equal(omitidas.length, 1)
  assert.match(omitidas[0].motivo, /ya tiene una imagen/)
})

test('la foto se coloca al FINAL de la primera sección, no al principio', () => {
  // Al principio empujaría fuera de pantalla la definición, que es lo que el
  // alumno vino a leer.
  const base = {
    't1': { secciones: [{ titulo: 'A', bloques: [{ tipo: 'p', texto: 'definición' }] }] },
  }
  const { contenido } = aplicarFotos(base, [
    { clave: 'k', temaId: 't1', alt: 'a'.repeat(30), caption: 'pie' },
  ])
  const bloques = contenido.t1.secciones[0].bloques
  assert.equal(bloques[0].tipo, 'p')
  assert.equal(bloques[1].tipo, 'imagen')
})

test('aplicarFotos no muta el contenido que recibe', () => {
  const base = { 't1': { secciones: [{ titulo: 'A', bloques: [{ tipo: 'p', texto: 'x' }] }] } }
  const antes = JSON.stringify(base)
  aplicarFotos(base, [{ clave: 'k', temaId: 't1', alt: 'a'.repeat(30), caption: 'pie' }])
  assert.equal(JSON.stringify(base), antes, 'el contenido de entrada quedó modificado')
})

test('las reservadas dicen POR QUÉ no se colocaron', () => {
  for (const r of RESERVADAS) {
    assert.ok(r.motivo && r.motivo.length > 15,
      `${r.clave} está reservada sin explicar por qué; dentro de tres meses nadie lo sabrá`)
  }
})
