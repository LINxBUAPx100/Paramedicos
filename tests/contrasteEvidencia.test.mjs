// ============================================================
//  Contraste contra evidencia externa — controles
// ------------------------------------------------------------
//  Dos cosas pueden salir mal al contrastar el temario con un buscador que
//  sintetiza literatura, y las dos dejarían el material PEOR que antes:
//
//    1. Que el buscador acabe citado como si fuera la guía. Sería sustituir
//       una fuente trazable por la respuesta de una máquina.
//    2. Que el libro de veredictos se llene de entradas sin cita, sin acción
//       o apuntando a temas que no existen, y que eso pase por comprobación.
//
//  Estos controles impiden las dos. No comprueban clínica: comprueban que el
//  procedimiento no mienta sobre sí mismo.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import CONTENIDO from '../src/data/contenido/index.js'
import {
  afirmacionesDe, agrupar, ambitoDe, riesgoDe, idDe, fuentesDeBuscador, prosaDe,
} from '../src/lib/contrasteEvidencia.js'

const temas = Object.entries(CONTENIDO).map(([id, t]) => ({ id, ...t }))
const LIBRO = JSON.parse(readFileSync(new URL('../docs/CONTRASTE-EVIDENCIA.json', import.meta.url), 'utf8'))

// ---------- el buscador no es la fuente ----------

test('ninguna lección cita un buscador de IA como fuente', () => {
  const malas = fuentesDeBuscador(temas)
  assert.deepEqual(
    malas.map((m) => `${m.temaId}: ${m.nombre} ${m.url}`), [],
    'Una respuesta sintetizada no respalda una cifra: se cita el documento primario que señala.'
  )
})

test('el detector reconoce el buscador por url, por nombre y por nota', () => {
  const con = (item) => ([{
    id: 't', secciones: [{ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [item] }] }],
  }])
  assert.equal(fuentesDeBuscador(con({ nombre: 'Guía X, 2025.', url: 'https://www.openevidence.com/answers/abc' })).length, 1)
  assert.equal(fuentesDeBuscador(con({ nombre: 'OpenEvidence, consulta del 17 de septiembre de 2026.' })).length, 1)
  assert.equal(fuentesDeBuscador(con({ nombre: 'Guía X, 2025.', url: 'https://x.org', nota: 'Localizada con Open Evidence.' })).length, 1)
  assert.equal(fuentesDeBuscador(con({ nombre: 'AHA 2025 Adult BLS.', url: 'https://cpr.heart.org/x' })).length, 0)
})

// ---------- el reparto por ámbito ----------

test('una afirmación normativa, local o curricular no entra en la cola clínica', () => {
  assert.equal(ambitoDe('La NOM-034-SSA3-2013 establece la dotación mínima de la ambulancia de urgencias básicas.'), 'normativo')
  assert.equal(ambitoDe('La dosis se administra según el protocolo del servicio y su formulario.'), 'local')
  assert.equal(ambitoDe('El plan asigna 2 semanas a esta unidad.'), 'curricular')
  assert.equal(ambitoDe('La frecuencia de compresión en el adulto es de 100 a 120 por minuto.'), 'evidencia')
})

test('el riesgo separa lo que cambia una acción de lo que cambia una clasificación', () => {
  assert.equal(riesgoDe('Profundidad de compresión en el adulto: al menos 5 cm, sin pasar de 6 cm.'), 'alto')
  assert.equal(riesgoDe('Un Glasgow de 8 puntos o menos marca deterioro grave.'), 'medio')
  assert.equal(riesgoDe('El cuadro suele resolverse en 2 días sin secuelas.'), 'bajo')
})

// ---------- estabilidad del identificador ----------

test('el id no cambia con acentos, mayúsculas ni espacios, y sí con la cifra', () => {
  assert.equal(idDe('Compresión a 100 por minuto'), idDe('COMPRESION   a 100 por minuto'))
  assert.notEqual(idDe('Compresión a 100 por minuto'), idDe('Compresión a 110 por minuto'))
})

// ---------- la extracción mira lo que el alumno lee ----------

test('la prosa excluye el bloque de fuentes y conserva tablas, conceptos y explicaciones', () => {
  const tema = {
    id: 't',
    secciones: [
      { titulo: 'Manejo', bloques: [{ tipo: 'tabla', headers: ['Dato'], filas: [['Frecuencia', '100-120/min']] }] },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [{ nombre: 'PHTLS, 9.ª ed., 2020.' }] }] },
    ],
    conceptosClave: [{ termino: 'Profundidad', definicion: 'Al menos 5 cm en el adulto.' }],
    quiz: [{ pregunta: '¿Cuál?', explicacion: 'Porque la guía fija 100-120 por minuto.' }],
  }
  const texto = prosaDe(tema)
  assert.match(texto, /100-120/)
  assert.match(texto, /Al menos 5 cm/)
  assert.match(texto, /Porque la guía fija/)
  assert.doesNotMatch(texto, /PHTLS/, 'El bloque de fuentes no es una afirmación clínica del curso.')
})

test('una misma frase en dos lecciones se consulta una sola vez', () => {
  const frase = 'La frecuencia objetivo en el adulto es de 100 a 120 compresiones por minuto.'
  const dos = [
    { id: 'a', titulo: 'A', secciones: [{ titulo: 'x', bloques: [{ tipo: 'p', texto: frase }] }] },
    { id: 'b', titulo: 'B', secciones: [{ titulo: 'x', bloques: [{ tipo: 'p', texto: frase }] }] },
  ]
  const salida = afirmacionesDe(dos)
  assert.equal(salida.size, 1)
  assert.deepEqual([...salida.values()][0].temas.map((t) => t.id), ['a', 'b'])
})

// ---------- una cifra, una consulta ----------

test('la misma cifra dicha en tabla, prosa y tarjeta se consulta una sola vez', () => {
  const tema = {
    id: 'm1-rcp', titulo: 'RCP',
    secciones: [{
      titulo: 'Parámetros',
      bloques: [
        { tipo: 'p', texto: 'La profundidad en el adulto es de al menos 5 cm, sin superar los 6 cm.' },
        { tipo: 'tabla', headers: ['Dato'], filas: [['Profundidad', 'Al menos 5 cm, sin pasar de 6 cm']] },
      ],
    }],
    flashcards: [{ frente: 'Profundidad de compresión en el adulto', reverso: 'Al menos 5 cm y no más de 6 cm.' }],
  }
  const grupos = agrupar(afirmacionesDe([tema]))
  assert.equal(grupos.length, 1, 'Tres formulaciones de 5–6 cm son un solo hecho clínico.')
  assert.equal(grupos[0].variantes.length, 2, 'Las otras dos quedan listadas como sitios a tocar.')
  assert.equal(grupos[0].riesgo, 'alto')
})

test('dos cifras distintas de la misma lección no se funden', () => {
  const tema = {
    id: 'm1-rcp', titulo: 'RCP',
    secciones: [{
      titulo: 'Parámetros',
      bloques: [
        { tipo: 'p', texto: 'La profundidad en el adulto es de al menos 5 cm, sin superar los 6 cm.' },
        { tipo: 'p', texto: 'La frecuencia objetivo en el adulto es de 100 a 120 compresiones por minuto.' },
      ],
    }],
  }
  assert.equal(agrupar(afirmacionesDe([tema])).length, 2)
})

test('el año de la guía no separa dos formas de decir la misma cifra', () => {
  const tema = {
    id: 'm1-ovace', titulo: 'OVACE',
    secciones: [{
      titulo: 'Secuencia',
      bloques: [
        { tipo: 'p', texto: 'Se aplican 5 golpes dorsales seguidos de 5 compresiones abdominales.' },
        { tipo: 'p', texto: 'La guía de 2025 indica 5 golpes dorsales y 5 compresiones abdominales.' },
      ],
    }],
  }
  assert.equal(agrupar(afirmacionesDe([tema])).length, 1)
})

// ---------- integridad del libro de veredictos ----------

test('el libro declara su vocabulario cerrado de veredictos y acciones', () => {
  for (const v of ['confirma', 'matiza', 'contradice', 'no_concluyente', 'fuera_de_alcance']) {
    assert.ok(LIBRO.veredictos[v], `Falta el veredicto ${v}`)
  }
  for (const a of ['ninguna', 'precisar', 'corregir', 'citar', 'bloquear', 'abrir_hallazgo']) {
    assert.ok(LIBRO.acciones[a], `Falta la acción ${a}`)
  }
})

test('cada veredicto registrado apunta a un tema real y usa el vocabulario declarado', () => {
  for (const e of LIBRO.entradas || []) {
    assert.ok(CONTENIDO[e.temaId], `${e.id}: el tema ${e.temaId} no existe en el contenido.`)
    assert.ok(LIBRO.veredictos[e.veredicto], `${e.id}: veredicto desconocido «${e.veredicto}».`)
    assert.ok(LIBRO.acciones[e.accion], `${e.id}: acción desconocida «${e.accion}».`)
    assert.match(e.consultadoEl || '', /^\d{4}-\d{2}-\d{2}$/, `${e.id}: falta la fecha de consulta.`)
    assert.ok(String(e.consultadoPor || '').trim(), `${e.id}: falta quién consultó.`)
  }
})

test('un veredicto que confirma o contradice tiene que traer la cita primaria', () => {
  for (const e of LIBRO.entradas || []) {
    if (!['confirma', 'matiza', 'contradice'].includes(e.veredicto)) continue
    const citas = e.fuentesPrimarias || []
    assert.ok(citas.length > 0,
      `${e.id}: un veredicto «${e.veredicto}» sin cita primaria es la palabra del buscador, no evidencia.`)
    for (const c of citas) {
      assert.ok(String(c.cita || '').trim(), `${e.id}: una fuente primaria sin nombre no es trazable.`)
      assert.ok(c.url || c.doi || c.pmid, `${e.id}: la fuente «${c.cita}» no declara url, DOI ni PMID.`)
    }
  }
})

test('una contradicción no puede cerrarse sin acción', () => {
  for (const e of LIBRO.entradas || []) {
    if (e.veredicto !== 'contradice') continue
    assert.notEqual(e.accion, 'ninguna',
      `${e.id}: se registró que la evidencia contradice la lección y no se decidió qué hacer.`)
    assert.ok(String(e.nota || '').trim(), `${e.id}: una contradicción exige decir qué cambia en la lección.`)
  }
})

test('ningún veredicto puede elevar por sí mismo el estado editorial', () => {
  for (const e of LIBRO.entradas || []) {
    assert.ok(!('estado' in e),
      `${e.id}: el libro de contraste no fija estados editoriales. Validar exige firma docente.`)
  }
})
