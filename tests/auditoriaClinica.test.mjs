// ============================================================
//  Detectores de auditoría — que la herramienta no mienta
// ------------------------------------------------------------
//  Estos controles deciden si un tema puede subir de estado editorial, así que
//  un fallo suyo se traduce en material aprobado por error o en trabajo
//  rechazado sin motivo. Ya ocurrió una vez: un `\b` delante de la alternancia
//  hacía que «7.ª ed.» contara como referencia trazable y «13.ª ed.» no.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  fuentesNoTrazables, contradiccionesDeDosis, preguntasFueraDeTema, enlacesInvalidos, textoDeTema,
} from '../src/lib/auditoriaClinica.js'

const conFuentes = (items) => ({
  id: 't',
  secciones: [{ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] }],
})

// ---------- fuentes trazables ----------

test('una edición se acepta con uno o con dos dígitos', () => {
  for (const nombre of [
    'Moore KL. Anatomía con orientación clínica, 7.ª ed.',
    'Guyton AC, Hall JE. Compendio de Fisiología Médica, 13.ª ed.',
    'Manual de urgencias, 3.a ed.',
    'NAEMT. PHTLS, edición 10.',
  ]) {
    assert.deepEqual(
      fuentesNoTrazables([conFuentes([{ nombre }])]), [],
      `Rechazó una referencia con edición declarada: ${nombre}`
    )
  }
})

test('un año, un capítulo o una página también sitúan la referencia', () => {
  for (const nombre of [
    'Conde C. Semiología y fisiopatología, 2015.',
    'Manual X, capítulo de vía aérea.',
    'Manual X, pág. 210.',
  ]) {
    assert.deepEqual(fuentesNoTrazables([conFuentes([{ nombre }])]), [], nombre)
  }
})

test('un texto normativo se sitúa por su artículo o por la fecha de consulta', () => {
  for (const nombre of [
    'Ley General de Salud, artículo 51 Bis 2.',
    'Código Nacional de Procedimientos Penales, art. 227.',
    'Ley Federal de Protección de Datos Personales, texto vigente consultado el 16 de agosto de 2026.',
  ]) {
    assert.deepEqual(fuentesNoTrazables([conFuentes([{ nombre }])]), [], nombre)
  }
})

test('una referencia sin ningún localizador se rechaza', () => {
  const malas = fuentesNoTrazables([conFuentes([{ nombre: 'Manual de Formación del Paramédico.' }])])
  assert.equal(malas.length, 1)
  assert.match(malas[0].motivo, /No declara edición/)
})

test('una portada institucional no respalda una cifra', () => {
  const malas = fuentesNoTrazables([conFuentes([
    { nombre: 'PHTLS, 9.ª ed.', url: 'https://www.naemt.org/education/phtls' },
  ])])
  assert.equal(malas.length, 1)
  assert.match(malas[0].motivo, /portada o dominio/)
})

test('un enlace que no es http(s) se detecta como tal', () => {
  const malas = fuentesNoTrazables([conFuentes([
    { nombre: 'Guía X, 2025.', url: 'javascript:alert(1)' },
  ])])
  assert.equal(malas.length, 1)
  assert.match(malas[0].motivo, /no es http/)
})

test('enlacesInvalidos revisa también bloques de imagen y recursos', () => {
  const tema = {
    id: 't',
    secciones: [{ titulo: 's', bloques: [{ tipo: 'imagen', src: 'file:///c/x.png' }] }],
    recursos: { videos: [{ titulo: 'v', url: 'ftp://x' }] },
  }
  assert.equal(enlacesInvalidos([tema]).length, 2)
})

// ---------- dosis ----------

test('dos dosis distintas de un fármaco para la misma indicación se detectan', () => {
  const temas = [
    { id: 'a', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'En bradicardia sintomática se administra atropina 1 mg.' }] }] },
    { id: 'b', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'En bradicardia, la atropina se usa a 0.5 mg.' }] }] },
  ]
  const { contradicciones } = contradiccionesDeDosis(temas)
  assert.equal(contradicciones.length, 1)
  assert.equal(contradicciones[0].farmaco, 'atropina')
  assert.deepEqual(contradicciones[0].valores, ['0.5', '1'])
  assert.deepEqual(contradicciones[0].donde.sort(), ['a', 'b'])
})

test('la misma cifra en dos temas no es una contradicción', () => {
  const temas = [
    { id: 'a', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'Atropina 1 mg en bradicardia.' }] }] },
    { id: 'b', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'Bradicardia: atropina 1 mg.' }] }] },
  ]
  assert.deepEqual(contradiccionesDeDosis(temas).contradicciones, [])
})

test('la misma dosis para indicaciones distintas no es una contradicción', () => {
  const temas = [
    { id: 'a', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'Atropina 1 mg en bradicardia.' }] }] },
    { id: 'b', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'En intoxicación por organofosforado la atropina se titula desde 2 mg.' }] }] },
  ]
  assert.deepEqual(contradiccionesDeDosis(temas).contradicciones, [])
})

test('una cifra sin indicación en la misma frase se reporta aparte', () => {
  const temas = [{ id: 'a', secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'Se administra atropina 1 mg.' }] }] }]
  const { contradicciones, sinIndicacion } = contradiccionesDeDosis(temas)
  assert.deepEqual(contradicciones, [])
  assert.equal(sinIndicacion.length, 1)
  assert.equal(sinIndicacion[0].cifra, '1')
})

// ---------- preguntas fuera de tema ----------

test('una pregunta respondible con la lección no se marca', () => {
  const tema = {
    id: 't',
    secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'La cánula orofaríngea mantiene la lengua separada de la pared faríngea y está contraindicada con reflejo nauseoso conservado.' }] }],
    quiz: [{
      pregunta: 'Un paciente tiene arcadas al colocarla. ¿Qué haces?',
      opciones: ['Insistir', 'Retirarla: conserva el reflejo nauseoso y la cánula está contraindicada'],
      correcta: 1,
      explicacion: 'El reflejo nauseoso conservado contraindica la cánula orofaríngea.',
    }],
  }
  assert.deepEqual(preguntasFueraDeTema([tema]), [])
})

test('una pregunta cuyo contenido no está en la lección se marca', () => {
  const tema = {
    id: 't',
    secciones: [{ titulo: 's', bloques: [{ tipo: 'p', texto: 'La posición anatómica sitúa a la persona de pie con las palmas hacia delante.' }] }],
    quiz: [{
      pregunta: '¿Qué dosis de midazolam intranasal corresponde?',
      opciones: ['Otra cosa', 'La titulada según protocolo de sedación farmacológica del servicio'],
      correcta: 1,
      explicacion: 'La sedación farmacológica depende del protocolo autorizado del servicio.',
    }],
  }
  const fuera = preguntasFueraDeTema([tema])
  assert.equal(fuera.length, 1)
  assert.equal(fuera[0].temaId, 't')
})

test('el texto del tema se aplana con tablas, listas y tarjetas', () => {
  const tema = {
    resumen: 'resumen',
    secciones: [{
      titulo: 'sec',
      bloques: [
        { tipo: 'lista', items: ['uno', 'dos'] },
        { tipo: 'tabla', headers: ['h1'], filas: [['celda']] },
      ],
    }],
    flashcards: [{ frente: 'f', reverso: 'r' }],
  }
  const t = textoDeTema(tema)
  for (const trozo of ['resumen', 'sec', 'uno', 'dos', 'h1', 'celda', 'f', 'r']) {
    assert.ok(t.includes(trozo), `falta "${trozo}" en el texto aplanado`)
  }
})
