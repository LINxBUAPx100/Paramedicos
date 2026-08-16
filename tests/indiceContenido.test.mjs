// ============================================================
//  Fase 4 (roadmap) — índice ligero de navegación por academia
// ------------------------------------------------------------
//  El shell (Layout, Home, Temario, Panel) navega con un índice de la MISMA
//  forma que src/data/navIndice.js. Estas pruebas garantizan que:
//   1. el índice derivado de la ESTRUCTURA del curso reproduce exactamente
//      el navIndice generado (la academia clonada navega igual que hoy);
//   2. borradores/archivados no se filtran al alumno y la numeración se
//      recalcula (nav y contenido no se desalinean);
//   3. el índice derivado de la API completa coincide con el derivado de la
//      estructura sola (las dos rutas del contexto son consistentes).
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { modulos, todosLosTemas, stats } from '../src/data/index.js'
import { modulosNav, stats as statsNav } from '../src/data/navIndice.js'
import { estructuraDesdeModulos, contenidoTema } from '../src/lib/contenidoModelo.js'
import {
  indiceDesdeEstructura, indiceDesdeModulos, ensamblarModulos, construirApi,
} from '../src/lib/contenidoApi.js'

const estructuraOficial = estructuraDesdeModulos(modulos)

test('índice: la estructura de la plantilla oficial reproduce navIndice.js', () => {
  const { modulos: indice, stats: st } = indiceDesdeEstructura(estructuraOficial)
  assert.deepEqual(indice, modulosNav)
  assert.equal(st.modulos, statsNav.modulos)
  assert.equal(st.temas, statsNav.temas)
})

test('índice: borradores y archivados no aparecen y la numeración se recalcula', () => {
  const estructura = [
    {
      id: 'f-borrador', titulo: 'Oculta', estado: 'borrador',
      unidades: [{ id: 'm', titulo: 'M', estado: 'publicado', temas: [{ id: 't0', titulo: 'T0', estado: 'publicado' }] }],
    },
    {
      id: 'f-1', titulo: 'Visible', subtitulo: 'Sub', descripcion: 'Desc', color: '#abc', estado: 'publicado',
      unidades: [
        {
          id: 'm-1', titulo: 'M1', estado: 'publicado',
          temas: [
            { id: 't-1', titulo: 'T1', estado: 'publicado' },
            { id: 't-borrador', titulo: 'TB', estado: 'borrador' },
            { id: 't-2', titulo: 'T2', estado: 'publicado' },
          ],
        },
        {
          id: 'm-archivado', titulo: 'MA', estado: 'archivado',
          temas: [{ id: 't-3', titulo: 'T3', estado: 'publicado' }],
        },
        {
          id: 'm-2', titulo: 'M2', estado: 'publicado',
          temas: [{ id: 't-4', titulo: 'T4', estado: 'publicado' }],
        },
      ],
    },
  ]
  const { modulos: indice, stats: st } = indiceDesdeEstructura(estructura)
  // El módulo en borrador desaparece y la visible se numera como 1.
  assert.deepEqual(indice.map((f) => f.id), ['f-1'])
  assert.equal(indice[0].numero, 1)
  // El tema en borrador y todo la unidad archivada desaparecen; la numeración
  // es continua a través de las unidades (aplanados, como en la migración).
  assert.deepEqual(indice[0].temas.map((t) => t.id), ['t-1', 't-2', 't-4'])
  assert.deepEqual(indice[0].temas.map((t) => t.numero), ['1.1', '1.2', '1.3'])
  assert.deepEqual(st, { modulos: 1, temas: 3 })
})

test('índice: incluirBorradores muestra la jerarquía completa (vista del editor)', () => {
  const estructura = [
    {
      id: 'f', titulo: 'F', estado: 'borrador',
      unidades: [{ id: 'm', titulo: 'M', estado: 'publicado', temas: [{ id: 't', titulo: 'T', estado: 'borrador' }] }],
    },
  ]
  assert.equal(indiceDesdeEstructura(estructura).modulos.length, 0)
  const todo = indiceDesdeEstructura(estructura, { incluirBorradores: true })
  assert.deepEqual(todo.modulos[0].temas.map((t) => t.id), ['t'])
})

test('índice: la API completa y la estructura sola derivan el MISMO índice', () => {
  const temasPorId = new Map(todosLosTemas.map((t) => [t.id, contenidoTema(t)]))
  const { modulos: ensambladas, faltantes } = ensamblarModulos(estructuraOficial, temasPorId)
  assert.equal(faltantes.length, 0)
  const api = construirApi(ensambladas)
  const desdeApi = indiceDesdeModulos(api.modulos)
  const desdeEstructura = indiceDesdeEstructura(estructuraOficial)
  assert.deepEqual(desdeApi.modulos, desdeEstructura.modulos)
  // Y las stats completas de la API siguen siendo las del temario real.
  assert.equal(api.stats.temas, stats.temas)
  assert.equal(api.stats.preguntas, stats.preguntas)
})

test('índice: entradas vacías o nulas no rompen (shell siempre navega)', () => {
  assert.deepEqual(indiceDesdeEstructura(null), { modulos: [], stats: { modulos: 0, temas: 0 } })
  assert.deepEqual(indiceDesdeEstructura([]).modulos, [])
  assert.deepEqual(indiceDesdeModulos(null).modulos, [])
  assert.deepEqual(indiceDesdeModulos(undefined).modulos, [])
})
