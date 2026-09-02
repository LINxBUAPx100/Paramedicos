// ============================================================
//  Clonar sin agregados: el fallo que nunca dio error
// ------------------------------------------------------------
//  R.E.S.C.A.T.E. se migró el 31-08-2026 con `scripts/migrar-contenido.mjs`:
//  288 documentos escritos, 287/287 verificados, y la colección `agregados` en
//  cero. No falló al generarlos —el script no los mencionaba una sola vez—, así
//  que no hubo error, ni aviso, ni síntoma visible: el resolutor cae al camino
//  completo, que es correcto. Lo único que se perdió fue el objetivo de la
//  Fase 1, y con él la cuota diaria del plan gratuito: cada carga de contenido
//  volvió a costar 288 lecturas en vez de 3 (~173 sesiones al día en vez de
//  ~16 600).
//
//  Estas pruebas fijan las dos mitades del arreglo:
//
//   1. Que de los datos de una clonación SE PUEDAN construir los agregados
//      completos —un juego por módulo, más los tres globales—. Es puro y no
//      necesita red: si algún día la forma del tema clonado deja de servir para
//      generarlos, se sabe aquí y no semanas después.
//   2. Que el script los ESCRIBA al clonar, y que el sello vaya al final. El
//      sello es lo que activa el camino barato: escribirlo antes que los
//      documentos dejaría agregados incompletos marcados como buenos, y el
//      examen saldría corto sin que nadie se enterara.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { modulos, todosLosTemas } from '../src/data/index.js'
import { plantillaDesdeData, docsClonadosParaAcademia, cursoDesdePlantilla } from '../src/lib/contenidoModelo.js'
import { ensamblarModulos, construirApi } from '../src/lib/contenidoApi.js'
import {
  AGREGADOS_POR_MODULO, AGREGADOS_GLOBALES, SELLO,
  docIdAgregado, docsAgregadosDeCurso,
} from '../src/lib/agregadosModelo.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SCRIPT = readFileSync(path.join(RAIZ, 'scripts', 'migrar-contenido.mjs'), 'utf8')

const ACADEMIA = 'ACA-PRUEBA'

// Reproduce EXACTAMENTE la cadena del script: plantilla desde el repositorio,
// documentos clonados para la academia y agregados desde esos documentos.
function planDeClonacion() {
  const { plantilla, temas: temasPlantilla } = plantillaDesdeData({
    id: 'paramedico-tum', nombre: 'Programa Paramédico (TUM)', modulos, todosLosTemas,
  })
  const curso = cursoDesdePlantilla({ academiaId: ACADEMIA, plantilla })
  const { cursoId, temas } = docsClonadosParaAcademia({
    academiaId: ACADEMIA, plantillaId: plantilla.id, plantillaTemas: temasPlantilla,
  })
  const temasPorId = new Map(temas.map((t) => [t.temaId, t]))
  const { modulos: ensamblados, faltantes } = ensamblarModulos(curso.estructura, temasPorId, {
    incluirBorradores: true,
  })
  const docs = docsAgregadosDeCurso({
    academiaId: ACADEMIA, cursoId, modulos: construirApi(ensamblados).modulos, version: 1,
  })
  return { cursoId, curso, temas, ensamblados, faltantes, docs }
}

// ---------- 1. los datos de la clonación bastan para generar los agregados ----------

test('la estructura clonada encuentra TODOS sus temas (sin esto los agregados salen cojos)', () => {
  const { faltantes, temas } = planDeClonacion()
  assert.deepEqual(faltantes, [])
  assert.equal(temas.length, 287)
})

test('sale un juego de agregados por módulo, más los tres globales y el sello', () => {
  const { cursoId, ensamblados, docs } = planDeClonacion()
  const esperados = ensamblados.length * AGREGADOS_POR_MODULO.length + AGREGADOS_GLOBALES.length
  assert.equal(docs.length, esperados)

  // Cada módulo tiene sus cinco: si faltara el de preguntas, el banco de
  // exámenes de ese módulo quedaría vacío sin que nada avisara.
  for (const modulo of ensamblados) {
    for (const tipo of AGREGADOS_POR_MODULO) {
      const id = docIdAgregado(cursoId, tipo, modulo.id)
      assert.ok(docs.some((d) => d.docId === id), `falta el agregado ${tipo} de ${modulo.id}`)
    }
  }
  for (const tipo of AGREGADOS_GLOBALES) {
    assert.ok(docs.some((d) => d.docId === docIdAgregado(cursoId, tipo)), `falta el global ${tipo}`)
  }
  // El sello NO sale de `docsAgregadosDeCurso`: se escribe aparte y al final.
  assert.ok(!docs.some((d) => d.docId === docIdAgregado(cursoId, SELLO)))
})

test('los ids son deterministas y no se repiten: reejecutar sobrescribe, nunca duplica', () => {
  const a = planDeClonacion().docs.map((d) => d.docId)
  const b = planDeClonacion().docs.map((d) => d.docId)
  assert.deepEqual(a, b)
  assert.equal(new Set(a).size, a.length)
  for (const id of a) assert.ok(id.startsWith(`${ACADEMIA}__paramedico-tum__`), id)
})

test('el agregado de preguntas del curso clonado no viene vacío', () => {
  // La comprobación que de verdad importa del lado del alumno: si los agregados
  // se generan pero sin reactivos, el examen sale corto y el sello dice que
  // todo está bien.
  const { docs } = planDeClonacion()
  const preguntas = docs
    .filter((d) => d.tipo === 'preguntas')
    .flatMap((d) => JSON.parse(d.datos) || [])
  assert.ok(preguntas.length > 500, `solo ${preguntas.length} preguntas en los agregados`)
  assert.ok(preguntas.every((p) => p.temaId && Array.isArray(p.opciones)))
})

// ---------- 2. el script los escribe, y sella al final ----------

test('el script de migración escribe los agregados al clonar', () => {
  assert.ok(SCRIPT.includes('docsAgregadosDeCurso'), 'el script no construye los agregados')
  assert.ok(/collection\('agregados'\)/.test(SCRIPT), 'el script no escribe en la colección agregados')
  assert.ok(SCRIPT.includes('escribirAgregados({'), 'el script no llama a escribirAgregados')
})

test('la clonación genera los agregados ANTES de darse por completa', () => {
  // El orden es la garantía: si `clonacion.completa` se pusiera antes, una
  // clonación con agregados fallidos quedaría indistinguible de una buena.
  const llamada = SCRIPT.indexOf('await escribirAgregados({')
  const completa = SCRIPT.indexOf("'clonacion.completa': true")
  assert.ok(llamada > 0 && completa > 0)
  assert.ok(llamada < completa, 'el script marca la clonación completa antes de generar los agregados')
})

test('el resultado de los agregados queda ESCRITO en el curso, no solo en la consola', () => {
  // Lo que convirtió este fallo en semanas de silencio: el único registro vivía
  // en la consola de quien clonó, que se cerró.
  assert.ok(SCRIPT.includes("'clonacion.agregados'"))
  assert.ok(SCRIPT.includes("'clonacion.agregadosMotivo'"))
})

test('el SELLO se escribe después de los documentos', () => {
  const cuerpo = SCRIPT.slice(SCRIPT.indexOf('async function escribirAgregados'))
  const fin = cuerpo.indexOf('\n}\n')
  const funcion = cuerpo.slice(0, fin > 0 ? fin : cuerpo.length)
  const lote = funcion.indexOf('batch.commit()')
  const sello = funcion.indexOf('docIdAgregado(cursoId, SELLO)')
  assert.ok(lote > 0, 'escribirAgregados no escribe los documentos por lotes')
  assert.ok(sello > 0, 'escribirAgregados no escribe el sello')
  assert.ok(lote < sello, 'el sello se escribe antes que los documentos que avala')
})

test('un fallo de agregados no aborta la clonación, pero deja aviso', () => {
  const cuerpo = SCRIPT.slice(SCRIPT.indexOf('async function clonar'))
  assert.ok(/try \{\s*\n\s*await escribirAgregados\(\{/.test(cuerpo), 'la llamada no está protegida')
  assert.ok(cuerpo.includes('Agregados NO generados para'), 'el fallo no deja aviso en el resumen')
})
