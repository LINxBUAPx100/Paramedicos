// ============================================================
//  Pruebas de la API bajo demanda (Fase 1: lectura por tema)
// ------------------------------------------------------------
//  `construirApi` necesita los 287 temas en memoria; `construirApiBajoDemanda`
//  responde lo mismo pidiendo solo lo que hace falta. Esta suite exige que las
//  dos den la MISMA respuesta sobre el temario real, y además cuenta las
//  lecturas: de nada sirve que el resultado coincida si por dentro se sigue
//  bajando el curso entero.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'

import * as legacy from '../src/data/index.js'
import { construirApi, construirApiBajoDemanda, indiceDesdeModulos } from '../src/lib/contenidoApi.js'
import { construirAgregados, idAgregado, buscarEnFilas } from '../src/lib/agregadosModelo.js'

const completa = construirApi(legacy.modulos)
const { porModulo, globales } = construirAgregados(completa.modulos)

// Los documentos tal como quedarían en Firestore, indexados por su id real.
const DOCS_AGREGADO = new Map()
for (const m of porModulo) {
  for (const tipo of ['fichas', 'preguntas', 'flashcards', 'glosario', 'imagenes']) {
    DOCS_AGREGADO.set(idAgregado(tipo, m.moduloId), m[tipo])
  }
}
for (const tipo of ['glosarioEnlaces', 'atlas', 'contadores']) {
  DOCS_AGREGADO.set(idAgregado(tipo), globales[tipo])
}
const DOCS_TEMA = new Map(completa.todosLosTemas.map((t) => [t.id, t]))

// Fuente de mentira que CUENTA lo que se le pide: es la única forma de
// demostrar que la fase cumple su objetivo y no solo que no rompe nada.
function fuenteContada() {
  const lecturas = { temas: 0, agregados: 0 }
  const api = construirApiBajoDemanda({
    indice: { ...indiceDesdeModulos(completa.modulos), stats: completa.stats },
    cargarTema: async (temaId) => {
      lecturas.temas += 1
      return DOCS_TEMA.get(temaId) || null
    },
    cargarAgregado: async (tipo, moduloId) => {
      lecturas.agregados += 1
      return DOCS_AGREGADO.get(idAgregado(tipo, moduloId)) ?? null
    },
    cursoId: 'curso-de-prueba',
  })
  return { api, lecturas }
}

// --- Lo que se responde SIN lecturas ----------------------------------------

test('los contadores y el listado de módulos salen del índice, sin leer nada', () => {
  const { api, lecturas } = fuenteContada()
  assert.deepEqual(api.stats, legacy.stats)
  assert.deepEqual(api.modulos.map((m) => m.id), legacy.modulos.map((m) => m.id))
  assert.deepEqual(lecturas, { temas: 0, agregados: 0 })
})

test('los vecinos de un tema son los mismos que en la API completa, sin lecturas', () => {
  const { api, lecturas } = fuenteContada()
  // Se comprueban los tres casos frontera además de un tema cualquiera: el
  // primero no tiene anterior y el último no tiene siguiente.
  const ids = [
    legacy.todosLosTemas[0].id,
    legacy.todosLosTemas[42].id,
    legacy.todosLosTemas[legacy.todosLosTemas.length - 1].id,
  ]
  for (const id of ids) {
    const esperado = completa.getTemaVecinos(id)
    const obtenido = api.getTemaVecinos(id)
    assert.equal(obtenido.indice, esperado.indice, id)
    assert.equal(obtenido.total, esperado.total, id)
    // Los vecinos viajan LIGEROS (ficha del índice, no la lección entera): se
    // comparan por identidad y título, que es lo que pinta la navegación.
    assert.equal(obtenido.anterior?.id ?? null, esperado.anterior?.id ?? null, id)
    assert.equal(obtenido.siguiente?.id ?? null, esperado.siguiente?.id ?? null, id)
    assert.equal(obtenido.siguiente?.titulo ?? null, esperado.siguiente?.titulo ?? null, id)
  }
  assert.deepEqual(lecturas, { temas: 0, agregados: 0 })
})

test('un tema que no existe da vecinos vacíos en vez de devolver el último', () => {
  const { api } = fuenteContada()
  const v = api.getTemaVecinos('no-existe')
  assert.equal(v.indice, -1)
  assert.equal(v.anterior, null)
  assert.equal(v.siguiente, null)
})

// --- La ruta caliente: abrir una lección ------------------------------------

test('abrir una lección cuesta UNA lectura y devuelve lo mismo que la API completa', async () => {
  const { api, lecturas } = fuenteContada()
  const id = legacy.todosLosTemas.find((t) => (t.secciones || []).length > 2).id

  const obtenido = await api.getTemaAsync(id)
  assert.deepEqual(obtenido, completa.getTema(id))
  assert.deepEqual(lecturas, { temas: 1, agregados: 0 })
})

test('la lección trae los datos de su módulo (color y migas) y el número del plan', async () => {
  const { api } = fuenteContada()
  const referencia = completa.todosLosTemas[100]
  const tema = await api.getTemaAsync(referencia.id)
  assert.equal(tema.moduloId, referencia.moduloId)
  assert.equal(tema.moduloTitulo, referencia.moduloTitulo)
  assert.equal(tema.moduloColor, referencia.moduloColor)
  assert.equal(tema.numero, referencia.numero)
})

test('un tema inexistente devuelve null, no un objeto a medias', async () => {
  const { api } = fuenteContada()
  assert.equal(await api.getTemaAsync('no-existe'), null)
})

// --- Vistas derivadas -------------------------------------------------------

test('el examen de un módulo lee UN agregado y trae sus mismas preguntas', async () => {
  const { api, lecturas } = fuenteContada()
  const moduloId = legacy.modulos[3].id
  const obtenido = await api.preguntasDeModuloAsync(moduloId)
  assert.ok(obtenido.length > 0)
  assert.deepEqual(lecturas, { temas: 0, agregados: 1 })

  // El agregado es UNO solo y sirve a las dos pantallas, así que lleva el
  // `moduloColor` que `todasLasPreguntas` siempre puso. La `preguntasDeModulo`
  // de la API completa no lo llevaba —una diferencia que ya existía entre esas
  // dos funciones— y el examen de módulo nunca lo usó: es un campo de más, no
  // uno de menos. Se comprueba contra el banco general, que es el exacto.
  const delModulo = legacy.todasLasPreguntas.filter((q) => q.id.startsWith(`${moduloId}-`)
    || completa.getTema(q.temaId)?.moduloId === moduloId)
  assert.deepEqual(obtenido, delModulo)

  // Y que, quitando ese campo, es idéntico a lo que devolvía antes.
  const sinColor = obtenido.map(({ moduloColor, ...resto }) => resto)
  assert.deepEqual(sinColor, completa.preguntasDeModulo(moduloId))
})

test('el examen general reconstruye el banco entero con una lectura por módulo', async () => {
  const { api, lecturas } = fuenteContada()
  assert.deepEqual(await api.todasLasPreguntasAsync(), legacy.todasLasPreguntas)
  assert.equal(lecturas.agregados, legacy.modulos.length)
  assert.equal(lecturas.temas, 0)
})

test('el mazo completo de flashcards coincide', async () => {
  const { api } = fuenteContada()
  assert.deepEqual(await api.todasLasFlashcardsAsync(), legacy.todasLasFlashcards)
})

test('el buscador da los mismos resultados leyendo solo filas ligeras', async () => {
  const { api } = fuenteContada()
  const filas = await api.todasLasFichasAsync()
  for (const q of ['shock', 'trauma', 'glucosa']) {
    assert.deepEqual(
      buscarEnFilas(filas, q).map((r) => r.tema.id),
      legacy.buscar(q).map((r) => r.tema.id),
      `la consulta «${q}» no coincide`
    )
  }
})

test('el atlas de imágenes coincide y cuesta una sola lectura', async () => {
  const { api, lecturas } = fuenteContada()
  assert.deepEqual(await api.atlasAsync(), legacy.temaPorClaveImagen)
  assert.deepEqual(lecturas, { temas: 0, agregados: 1 })
})

// --- La métrica de la fase --------------------------------------------------

test('una sesión de estudio real no se acerca a las 287 lecturas de antes', async () => {
  const { api, lecturas } = fuenteContada()

  // Lo que hace un alumno cuando la maestra abre la clase: entra al temario
  // (índice, ya cargado), abre una lección, la lee con el glosario subrayado y
  // pasa a la siguiente.
  const primera = legacy.todosLosTemas[10].id
  await api.getTemaAsync(primera)
  await api.enlacesGlosarioAsync()
  const siguiente = api.getTemaVecinos(primera).siguiente
  await api.getTemaAsync(siguiente.id)

  const total = lecturas.temas + lecturas.agregados
  assert.equal(total, 3, `debían ser 3 lecturas y fueron ${total}`)
  assert.ok(total < 287 * 0.02)
})
