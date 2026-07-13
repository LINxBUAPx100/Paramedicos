// Pruebas de Fase 2: integridad de la migración, determinismo de ids y
// aislamiento por academia. PURAS (sin Firebase) → corren con `npm test`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fases, todosLosTemas, stats } from '../src/data/index.js'
import {
  SEP, cursoIdDe, temaDocIdEnCurso, temaDocIdEnPlantilla, lotes,
  estructuraDesdeFases, contenidoTema, plantillaDesdeData, docsClonadosParaAcademia,
} from '../src/lib/contenidoModelo.js'

const PLANTILLA = 'paramedico-tum'
const { plantilla, temas } = plantillaDesdeData({
  id: PLANTILLA, nombre: 'Programa Paramédico (TUM)', fases, todosLosTemas,
})

test('migración: la plantilla tiene todas las fases y temas del temario', () => {
  assert.equal(plantilla.estructura.length, stats.fases)
  assert.equal(temas.length, stats.temas)
})

test('migración: cada fase migra con un módulo implícito "principal"', () => {
  for (const f of plantilla.estructura) {
    assert.equal(f.modulos.length, 1)
    assert.equal(f.modulos[0].id, 'principal')
    assert.equal(f.modulos[0].implicito, true)
  }
  // La suma de temas de todos los módulos = total de temas.
  const enEstructura = plantilla.estructura.reduce(
    (n, f) => n + f.modulos.reduce((m, mod) => m + mod.temas.length, 0), 0
  )
  assert.equal(enEstructura, stats.temas)
})

test('migración: doc-id de tema únicos y con prefijo de la plantilla', () => {
  const ids = temas.map((t) => t.docId)
  assert.equal(new Set(ids).size, ids.length, 'hay doc-id duplicados')
  for (const t of temas) {
    assert.ok(t.docId.startsWith(`${PLANTILLA}${SEP}`))
    assert.equal(t.docId, temaDocIdEnPlantilla(PLANTILLA, t.temaId))
  }
})

test('migración: el contenido NO filtra campos derivados de fase/numero', () => {
  for (const t of temas) {
    for (const prohibido of ['numero', 'faseId', 'faseNumero', 'faseTitulo', 'faseColor']) {
      assert.equal(prohibido in t, false, `el tema ${t.temaId} filtró ${prohibido}`)
    }
    // Conserva lo esencial del contenido.
    assert.equal(typeof t.titulo, 'string')
    assert.ok(Array.isArray(t.secciones))
    assert.ok(Array.isArray(t.quiz))
  }
})

test('migración: preserva el conteo de preguntas y flashcards', () => {
  const preguntas = temas.reduce((n, t) => n + t.quiz.length, 0)
  const flashcards = temas.reduce((n, t) => n + t.flashcards.length, 0)
  assert.equal(preguntas, stats.preguntas)
  assert.equal(flashcards, stats.flashcards)
})

test('migración: ningún doc de tema supera el límite de Firestore (< 900 KB)', () => {
  for (const t of temas) {
    const bytes = Buffer.byteLength(JSON.stringify(t), 'utf8')
    assert.ok(bytes < 900 * 1024, `el tema ${t.temaId} pesa ${(bytes / 1024).toFixed(0)} KB`)
  }
})

test('ids: deterministas y aislados por academia', () => {
  assert.equal(cursoIdDe('AEP-2026', PLANTILLA), `AEP-2026${SEP}${PLANTILLA}`)
  assert.notEqual(cursoIdDe('A', PLANTILLA), cursoIdDe('B', PLANTILLA))
  const cursoA = cursoIdDe('A', PLANTILLA)
  assert.equal(temaDocIdEnCurso(cursoA, 'rcp'), `A${SEP}${PLANTILLA}${SEP}rcp`)
})

test('aislamiento: clonar la misma plantilla a A y B da doc-id disjuntos', () => {
  const a = docsClonadosParaAcademia({ academiaId: 'A', plantillaId: PLANTILLA, plantillaTemas: temas })
  const b = docsClonadosParaAcademia({ academiaId: 'B', plantillaId: PLANTILLA, plantillaTemas: temas })
  assert.notEqual(a.cursoId, b.cursoId)
  const idsA = new Set(a.temas.map((t) => t.docId))
  const idsB = new Set(b.temas.map((t) => t.docId))
  for (const id of idsA) assert.equal(idsB.has(id), false, `colisión de doc-id: ${id}`)
  // Cada doc clonado lleva SU academiaId y su cursoId (nunca el de la otra).
  for (const t of a.temas) {
    assert.equal(t.academiaId, 'A')
    assert.ok(t.docId.startsWith(`A${SEP}`))
  }
})

test('aislamiento: la clonación reproduce todos los temas de la plantilla', () => {
  const a = docsClonadosParaAcademia({ academiaId: 'A', plantillaId: PLANTILLA, plantillaTemas: temas })
  assert.equal(a.temas.length, temas.length)
})

test('lotes: divide correctamente (chunking de writeBatch)', () => {
  assert.deepEqual(lotes([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
  assert.deepEqual(lotes([], 20), [])
  assert.equal(lotes(new Array(68).fill(0), 20).length, 4)
  // tam inválido no cuelga.
  assert.equal(lotes([1, 2, 3], 0).length, 3)
})

test('estructuraDesdeFases / contenidoTema con entradas mínimas', () => {
  const e = estructuraDesdeFases([{ id: 'f1', titulo: 'F1', temas: [{ id: 't1', titulo: 'T1' }] }])
  assert.equal(e[0].modulos[0].temas[0].id, 't1')
  const c = contenidoTema({ id: 'x', titulo: 'X' })
  assert.deepEqual(c.objetivos, [])
  assert.equal(c.recursos, null)
  assert.equal('faseId' in c, false)
})
