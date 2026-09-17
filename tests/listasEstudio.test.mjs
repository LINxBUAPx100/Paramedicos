import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { filtrarTemasEstudio, paginarLista, resumenLectura } from '../src/lib/listasEstudio.js'

const temas = [
  { id: 'visible', moduloId: 'm1', titulo: 'Evaluación inicial', numero: '1.1' },
  { id: 'otro', moduloId: 'm2', titulo: 'Trauma', numero: '2.1' },
  { id: 'oculto', moduloId: 'm1', titulo: 'Evaluación oculta', numero: '1.2' },
]

test('los filtros y sus contadores parten del contenido autorizado', () => {
  const filas = filtrarTemasEstudio(temas, { temaVisible: (id) => id !== 'oculto', moduloId: 'm1', consulta: 'evaluacion', lectura: 'pendientes', leidos: {} })
  assert.deepEqual(filas.map((t) => t.id), ['visible'])
  assert.deepEqual(filtrarTemasEstudio(filas, { lectura: 'leidos', leidos: { oculto: true } }), [])
})

test('paginación de 200 temas, páginas fuera de rango y resultados vacíos', () => {
  const lista = Array.from({ length: 200 }, (_, i) => i)
  const ultima = paginarLista(lista, 999)
  assert.equal(ultima.paginas, 10)
  assert.deepEqual(ultima.filas, lista.slice(180))
  assert.equal(paginarLista(lista, 'no-es-numero').pagina, 1)
  assert.equal(paginarLista(lista, -4).pagina, 1)
  assert.deepEqual(paginarLista([], 8), { filas: [], pagina: 1, paginas: 1, total: 0, desde: 0, hasta: 0 })
  assert.equal(lista.length, 200)
})

test('progreso no cuenta registros ajenos ni inventa un cero sin quiz', () => {
  const estado = { leidos: { visible: true, ajeno: true }, quizzes: { ajeno: { aciertos: 3, total: 3 }, visible: { aciertos: 0, total: 0 } } }
  assert.deepEqual(resumenLectura(temas.slice(0, 2), estado), { total: 2, leidos: 1, porcentaje: 50, quizzes: 0, promedio: null })
  estado.quizzes.visible = { aciertos: 0, total: 5 }
  assert.equal(resumenLectura(temas, estado).promedio, 0)
  assert.equal(resumenLectura([], estado).porcentaje, 0)
})

test('las pantallas reales conservan sus rutas y recuperación de lectura', () => {
  const leer = (ruta) => readFileSync(new URL(`../src/${ruta}`, import.meta.url), 'utf8')
  const app = leer('App.jsx')
  for (const ruta of ['/buscar', '/progreso', '/flashcards']) assert.ok(app.includes(`path="${ruta}"`))
  assert.match(leer('pages/BuscarPage.jsx'), /filtrarTemasEstudio\(fichas, \{ temaVisible \}\)/)
  const cartas = leer('pages/FlashcardsPage.jsx')
  assert.match(cartas, /temaId \? reintentarTema : reintentarMazo/)
  assert.match(cartas, /<button type="button" className=\{`ui-tarjeta-repaso/)
  assert.match(cartas, /temaId && !tema/)
  assert.match(leer('pages/ProgresoPage.jsx'), /estadoHistorial === 'error'/)
})
