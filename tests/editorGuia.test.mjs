// ============================================================
//  Pruebas de la guía del editor
// ------------------------------------------------------------
//  Lo que se fija aquí es sobre todo CUÁNDO CALLARSE: una guía que sigue
//  hablando cuando ya hay contenido se convierte en ruido y se aprende a
//  ignorar, y entonces tampoco sirve para quien empieza.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { siguientePaso, temaSinContenido } from '../src/lib/editorGuia.js'

const tema = (extra = {}) => ({ titulo: 'T', secciones: [], ...extra })
const conTexto = { secciones: [{ titulo: 'Intro', bloques: [{ tipo: 'p', texto: 'algo' }] }] }

test('un temario sin modulos manda crear la primera', () => {
  const p = siguientePaso({ estructura: [] })
  assert.equal(p.clave, 'sin-modulos')
  assert.deepEqual(p.accion, { tipo: 'modulo' })
  // Explica la jerarquía, que es justo lo que no se adivina.
  assert.match(p.texto, /modulos/)
  assert.match(p.texto, /unidades/)
})

test('un módulo sin unidades manda crear la unidad DE ESA modulo', () => {
  const estructura = [{ id: 'f1', titulo: 'Fundamentos', estado: 'borrador', unidades: [] }]
  const p = siguientePaso({ estructura })
  assert.equal(p.clave, 'sin-unidades')
  assert.deepEqual(p.accion, { tipo: 'unidad', moduloId: 'f1' })
  assert.match(p.titulo, /Fundamentos/)
})

test('con varias modulos vacías, atiende la SELECCIONADA', () => {
  const estructura = [
    { id: 'f1', titulo: 'Uno', unidades: [] },
    { id: 'f2', titulo: 'Dos', unidades: [] },
  ]
  // Sin selección: la primera.
  assert.equal(siguientePaso({ estructura }).accion.moduloId, 'f1')
  // Mirando la segunda: la segunda. Sugerir otra seria mandar al usuario a un
  // sitio en el que no esta.
  assert.equal(siguientePaso({ estructura, seleccion: { moduloId: 'f2' } }).accion.moduloId, 'f2')
})

test('una unidad sin temas manda crear el tema, con su módulo y su unidad', () => {
  const estructura = [{
    id: 'f1', titulo: 'Uno',
    unidades: [{ id: 'm1', titulo: 'Anatomía', temas: [] }],
  }]
  const p = siguientePaso({ estructura })
  assert.equal(p.clave, 'sin-temas')
  assert.deepEqual(p.accion, { tipo: 'tema', moduloId: 'f1', unidadId: 'm1' })
})

test('un tema abierto y en blanco señala dónde se escribe', () => {
  const estructura = [{
    id: 'f1', titulo: 'Uno',
    unidades: [{ id: 'm1', titulo: 'M', temas: [{ id: 't1', titulo: 'T' }] }],
  }]
  const p = siguientePaso({ estructura, seleccion: { moduloId: 'f1', unidadId: 'm1', temaId: 't1' }, tema: tema() })
  assert.equal(p.clave, 'tema-vacio')
  // Sin acción: el panel donde se escribe ya está abierto a la derecha. Un
  // botón que no lleve a ningún sitio nuevo estorba más de lo que ayuda.
  assert.equal(p.accion, null)
  assert.match(p.texto, /Contenido del tema/)
})

test('SE CALLA cuando el temario ya tiene contenido', () => {
  const estructura = [{
    id: 'f1', titulo: 'Uno',
    unidades: [{ id: 'm1', titulo: 'M', temas: [{ id: 't1', titulo: 'T' }] }],
  }]
  // Tema con secciones escritas y seleccionado: no hay nada que sugerir.
  assert.equal(
    siguientePaso({ estructura, seleccion: { moduloId: 'f1', unidadId: 'm1', temaId: 't1' }, tema: tema(conTexto) }),
    null
  )
  // Y sin nada seleccionado, con la estructura completa, tampoco.
  assert.equal(siguientePaso({ estructura }), null)
})

test('no opina sobre un tema que todavía no ha cargado', () => {
  const estructura = [{
    id: 'f1', titulo: 'Uno',
    unidades: [{ id: 'm1', titulo: 'M', temas: [{ id: 't1', titulo: 'T' }] }],
  }]
  // tema = null es «aún no sé qué tiene dentro». Decir que está vacío sería
  // mentir y, peor, invitar a escribir encima de algo que sí existe.
  assert.equal(
    siguientePaso({ estructura, seleccion: { moduloId: 'f1', unidadId: 'm1', temaId: 't1' }, tema: null }),
    null
  )
})

test('lo ARCHIVADO no cuenta como contenido', () => {
  // Un módulo archivada no la ve nadie: el temario sigue vacío de hecho.
  const soloArchivada = [{ id: 'f1', titulo: 'Vieja', estado: 'archivado', unidades: [] }]
  assert.equal(siguientePaso({ estructura: soloArchivada }).clave, 'sin-modulos')

  // Y una unidad cuyo único tema está archivado sigue necesitando un tema.
  const temaArchivado = [{
    id: 'f1', titulo: 'Uno',
    unidades: [{ id: 'm1', titulo: 'M', temas: [{ id: 't1', titulo: 'T', estado: 'archivado' }] }],
  }]
  assert.equal(siguientePaso({ estructura: temaArchivado }).clave, 'sin-temas')
})

test('quien no puede crear no recibe instrucciones de crear', () => {
  // Un profesor sin permiso de alta: sugerirle crear un módulo es ofrecerle un
  // botón que le va a decir que no.
  assert.equal(siguientePaso({ estructura: [], puedeCrear: false }), null)
})

test('temaSinContenido mira los bloques, no los campos de apoyo', () => {
  assert.equal(temaSinContenido(tema()), true)
  // Secciones con título pero sin un solo bloque: el alumno ve una página en
  // blanco con encabezados.
  assert.equal(temaSinContenido(tema({ secciones: [{ titulo: 'Intro', bloques: [] }] })), true)
  // Objetivos escritos pero nada de contenido: sigue vacío para quien estudia.
  assert.equal(temaSinContenido(tema({ objetivos: ['aprender'] })), true)
  assert.equal(temaSinContenido(tema(conTexto)), false)
  // Sin cargar: no se opina (y no se dice que esté vacío).
  assert.equal(temaSinContenido(null), false)
})
