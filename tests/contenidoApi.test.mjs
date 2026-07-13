// Pruebas de Fase 2 (capa de acceso PURA): estados de migración, ensamblado
// desde docs de Firestore y equivalencia con la API legacy de src/data.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as legacy from '../src/data/index.js'
import {
  plantillaDesdeData, docsClonadosParaAcademia, cursoDesdePlantilla,
} from '../src/lib/contenidoModelo.js'
import {
  ESTADOS_CONTENIDO, estadoContenido, academiaMigrada,
  temaDesdeDoc, ensamblarFases, construirApi,
} from '../src/lib/contenidoApi.js'

const PLANTILLA = 'paramedico-tum'
const { plantilla, temas } = plantillaDesdeData({
  id: PLANTILLA, nombre: 'Programa Paramédico (TUM)',
  fases: legacy.fases, todosLosTemas: legacy.todosLosTemas,
})

// Reconstruye la API de una academia como lo hará el resolutor:
// clonación → mapa temaId→doc → ensamblar → construirApi.
function apiDeAcademia(academiaId) {
  const { temas: clonados } = docsClonadosParaAcademia({
    academiaId, plantillaId: PLANTILLA, plantillaTemas: temas,
  })
  const curso = cursoDesdePlantilla({ academiaId, plantilla })
  const temasPorId = new Map(clonados.map((t) => [t.temaId, t]))
  const { fases, faltantes } = ensamblarFases(curso.estructura, temasPorId)
  return { api: construirApi(fases), faltantes, curso, clonados }
}

// ---------- estados de migración ----------

test('estados: sin campo contenido → legacy (academias existentes intactas)', () => {
  assert.equal(estadoContenido(null), 'legacy')
  assert.equal(estadoContenido({}), 'legacy')
  assert.equal(estadoContenido({ contenido: {} }), 'legacy')
  assert.equal(estadoContenido({ contenido: { estado: 'basura' } }), 'legacy')
})

test('estados: migrando/migrado/error se reconocen; solo migrado habilita Firestore', () => {
  for (const e of ESTADOS_CONTENIDO) {
    assert.equal(estadoContenido({ contenido: { estado: e } }), e)
  }
  assert.equal(academiaMigrada({ contenido: { estado: 'migrado' } }), true)
  for (const e of ['legacy', 'migrando', 'error']) {
    assert.equal(academiaMigrada({ contenido: { estado: e } }), false, `estado ${e}`)
  }
})

// ---------- equivalencia con la API legacy ----------

test('resolutor: la API reconstruida de Firestore es equivalente a src/data', () => {
  const { api, faltantes } = apiDeAcademia('AEP-2026')
  assert.equal(faltantes.length, 0)

  // Mismas fases, mismo orden, misma numeración.
  assert.deepEqual(api.fases.map((f) => f.id), legacy.fases.map((f) => f.id))
  assert.deepEqual(api.fases.map((f) => f.numero), legacy.fases.map((f) => f.numero))
  // Mismos temas, mismo orden global y misma numeración '1.1'.
  assert.deepEqual(
    api.todosLosTemas.map((t) => t.id),
    legacy.todosLosTemas.map((t) => t.id)
  )
  assert.deepEqual(
    api.todosLosTemas.map((t) => t.numero),
    legacy.todosLosTemas.map((t) => t.numero)
  )
  // Mismas estadísticas globales.
  assert.deepEqual(api.stats, legacy.stats)
  // Mismos derivados clave.
  assert.equal(api.todasLasPreguntas.length, legacy.todasLasPreguntas.length)
  assert.equal(api.todasLasFlashcards.length, legacy.todasLasFlashcards.length)
  assert.deepEqual(api.temaPorClaveImagen, legacy.temaPorClaveImagen)
})

test('resolutor: getFase/getTema/vecinos/preguntas se comportan como los legacy', () => {
  const { api } = apiDeAcademia('AEP-2026')
  const temaRef = legacy.todosLosTemas[10]
  const faseRef = legacy.fases[2]

  assert.equal(api.getTema(temaRef.id).titulo, temaRef.titulo)
  assert.equal(api.getTema(temaRef.id).faseId, temaRef.faseId)
  assert.equal(api.getFase(faseRef.id).temas.length, faseRef.temas.length)
  assert.equal(api.getTema('no-existe'), undefined)

  const vec = api.getTemaVecinos(temaRef.id)
  const vecLegacy = legacy.getTemaVecinos(temaRef.id)
  assert.equal(vec.indice, vecLegacy.indice)
  assert.equal(vec.anterior?.id, vecLegacy.anterior?.id)
  assert.equal(vec.siguiente?.id, vecLegacy.siguiente?.id)

  assert.deepEqual(
    api.preguntasDeFase(faseRef.id).map((q) => q.id),
    legacy.preguntasDeFase(faseRef.id).map((q) => q.id)
  )
  // La búsqueda devuelve los mismos temas.
  assert.deepEqual(
    api.buscar('rcp').map((r) => r.tema.id),
    legacy.buscar('rcp').map((r) => r.tema.id)
  )
})

// ---------- ensamblado: borradores y parciales ----------

test('ensamblar: los borradores NO se sirven por defecto (lo que ve el alumno)', () => {
  const estructura = [{
    id: 'f1', titulo: 'F1',
    modulos: [{ id: 'principal', temas: [
      { id: 't1', titulo: 'T1', estado: 'publicado' },
      { id: 't2', titulo: 'T2', estado: 'borrador' },
    ] }],
  }]
  const docs = new Map([
    ['t1', { temaId: 't1', titulo: 'T1' }],
    ['t2', { temaId: 't2', titulo: 'T2' }],
  ])
  const { fases } = ensamblarFases(estructura, docs)
  assert.deepEqual(fases[0].temas.map((t) => t.id), ['t1'])
  const conBorradores = ensamblarFases(estructura, docs, { incluirBorradores: true })
  assert.deepEqual(conBorradores.fases[0].temas.map((t) => t.id), ['t1', 't2'])
})

test('ensamblar: una clonación parcial reporta los temas faltantes', () => {
  const estructura = [{
    id: 'f1', titulo: 'F1',
    modulos: [{ id: 'principal', temas: [
      { id: 't1', titulo: 'T1', estado: 'publicado' },
      { id: 't2', titulo: 'T2', estado: 'publicado' },
    ] }],
  }]
  const docs = new Map([['t1', { temaId: 't1', titulo: 'T1' }]])
  const { fases, faltantes } = ensamblarFases(estructura, docs)
  assert.deepEqual(faltantes, ['t2'])
  assert.deepEqual(fases[0].temas.map((t) => t.id), ['t1'])
})

test('temaDesdeDoc: recupera la forma que espera la UI (id, defaults)', () => {
  const t = temaDesdeDoc({ temaId: 'x', titulo: 'X' })
  assert.equal(t.id, 'x')
  assert.deepEqual(t.objetivos, [])
  assert.equal(t.recursos, null)
})

// ---------- independencia real de las copias ----------

test('aislamiento: modificar la copia de la academia A no toca la plantilla ni a B', () => {
  const a = apiDeAcademia('ACADEMIA-A')
  const b = apiDeAcademia('ACADEMIA-B')
  const temaId = temas[0].temaId
  const docA = a.clonados.find((t) => t.temaId === temaId)
  const docB = b.clonados.find((t) => t.temaId === temaId)
  const original = temas.find((t) => t.temaId === temaId)

  // A edita su copia en profundidad (título, secciones, quiz).
  docA.titulo = 'EDITADO POR A'
  if (docA.secciones[0]) docA.secciones[0].titulo = 'SECCIÓN HACKEADA'
  docA.quiz.push({ pregunta: 'inyectada', opciones: [], correcta: 0 })

  // Ni la plantilla ni la copia de B cambian.
  assert.notEqual(original.titulo, 'EDITADO POR A')
  assert.notEqual(docB.titulo, 'EDITADO POR A')
  if (original.secciones[0]) {
    assert.notEqual(original.secciones[0].titulo, 'SECCIÓN HACKEADA')
    assert.notEqual(docB.secciones[0].titulo, 'SECCIÓN HACKEADA')
  }
  assert.equal(original.quiz.length, docB.quiz.length)
  assert.equal(docA.quiz.length, docB.quiz.length + 1)
})

test('aislamiento: mutar la estructura del curso clonado no toca la plantilla', () => {
  const curso = cursoDesdePlantilla({ academiaId: 'ACADEMIA-A', plantilla })
  assert.equal(curso.plantillaOrigenId, PLANTILLA)
  assert.equal(curso.versionOrigen, plantilla.version)
  curso.estructura[0].titulo = 'FASE RENOMBRADA POR A'
  curso.estructura[0].modulos[0].temas.pop()
  assert.notEqual(plantilla.estructura[0].titulo, 'FASE RENOMBRADA POR A')
  assert.equal(
    plantilla.estructura[0].modulos[0].temas.length,
    legacy.fases[0].temas.length
  )
})

test('aislamiento: dos academias pueden divergir del mismo curso sin interferirse', () => {
  const a = apiDeAcademia('ACADEMIA-A')
  const b = apiDeAcademia('ACADEMIA-B')
  // A recorta un tema de su estructura; B lo conserva.
  a.curso.estructura[0].modulos[0].temas.shift()
  const apiA = construirApi(ensamblarFases(a.curso.estructura, new Map(a.clonados.map((t) => [t.temaId, t]))).fases)
  const apiB = construirApi(ensamblarFases(b.curso.estructura, new Map(b.clonados.map((t) => [t.temaId, t]))).fases)
  assert.equal(apiA.stats.temas, legacy.stats.temas - 1)
  assert.equal(apiB.stats.temas, legacy.stats.temas)
})
