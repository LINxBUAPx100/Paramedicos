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

import { fases, todosLosTemas, stats } from '../src/data/index.js'
import { fasesNav, stats as statsNav } from '../src/data/navIndice.js'
import { estructuraDesdeFases, contenidoTema } from '../src/lib/contenidoModelo.js'
import {
  indiceDesdeEstructura, indiceDesdeFases, ensamblarFases, construirApi,
} from '../src/lib/contenidoApi.js'

const estructuraOficial = estructuraDesdeFases(fases)

test('índice: la estructura de la plantilla oficial reproduce navIndice.js', () => {
  const { fases: indice, stats: st } = indiceDesdeEstructura(estructuraOficial)
  assert.deepEqual(indice, fasesNav)
  assert.equal(st.fases, statsNav.fases)
  assert.equal(st.temas, statsNav.temas)
})

test('índice: borradores y archivados no aparecen y la numeración se recalcula', () => {
  const estructura = [
    {
      id: 'f-borrador', titulo: 'Oculta', estado: 'borrador',
      modulos: [{ id: 'm', titulo: 'M', estado: 'publicado', temas: [{ id: 't0', titulo: 'T0', estado: 'publicado' }] }],
    },
    {
      id: 'f-1', titulo: 'Visible', subtitulo: 'Sub', descripcion: 'Desc', color: '#abc', estado: 'publicado',
      modulos: [
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
  const { fases: indice, stats: st } = indiceDesdeEstructura(estructura)
  // La fase en borrador desaparece y la visible se numera como 1.
  assert.deepEqual(indice.map((f) => f.id), ['f-1'])
  assert.equal(indice[0].numero, 1)
  // El tema en borrador y todo el módulo archivado desaparecen; la numeración
  // es continua a través de los módulos (aplanados, como en la migración).
  assert.deepEqual(indice[0].temas.map((t) => t.id), ['t-1', 't-2', 't-4'])
  assert.deepEqual(indice[0].temas.map((t) => t.numero), ['1.1', '1.2', '1.3'])
  assert.deepEqual(st, { fases: 1, temas: 3 })
})

test('índice: incluirBorradores muestra la jerarquía completa (vista del editor)', () => {
  const estructura = [
    {
      id: 'f', titulo: 'F', estado: 'borrador',
      modulos: [{ id: 'm', titulo: 'M', estado: 'publicado', temas: [{ id: 't', titulo: 'T', estado: 'borrador' }] }],
    },
  ]
  assert.equal(indiceDesdeEstructura(estructura).fases.length, 0)
  const todo = indiceDesdeEstructura(estructura, { incluirBorradores: true })
  assert.deepEqual(todo.fases[0].temas.map((t) => t.id), ['t'])
})

test('índice: la API completa y la estructura sola derivan el MISMO índice', () => {
  const temasPorId = new Map(todosLosTemas.map((t) => [t.id, contenidoTema(t)]))
  const { fases: ensambladas, faltantes } = ensamblarFases(estructuraOficial, temasPorId)
  assert.equal(faltantes.length, 0)
  const api = construirApi(ensambladas)
  const desdeApi = indiceDesdeFases(api.fases)
  const desdeEstructura = indiceDesdeEstructura(estructuraOficial)
  assert.deepEqual(desdeApi.fases, desdeEstructura.fases)
  // Y las stats completas de la API siguen siendo las del temario real.
  assert.equal(api.stats.temas, stats.temas)
  assert.equal(api.stats.preguntas, stats.preguntas)
})

test('índice: entradas vacías o nulas no rompen (shell siempre navega)', () => {
  assert.deepEqual(indiceDesdeEstructura(null), { fases: [], stats: { fases: 0, temas: 0 } })
  assert.deepEqual(indiceDesdeEstructura([]).fases, [])
  assert.deepEqual(indiceDesdeFases(null).fases, [])
  assert.deepEqual(indiceDesdeFases(undefined).fases, [])
})
