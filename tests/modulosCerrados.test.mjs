// ============================================================
//  Módulos cerrados (R03) — lógica pura del cliente
// ------------------------------------------------------------
//  Las reglas (tests/rules/visibilidad.rules.test.mjs) son la protección. Esto
//  prueba que el cliente no pida lo que se le va a negar, que ningún tema se
//  escriba sin módulo y que abrir un módulo renueve la caché.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  modulosCerrados, firmaDeCierre, trozosParaIn, leePorRamaDeAlumno, MAX_IN,
} from '../src/lib/modulosCerrados.js'
import {
  modulosPorTema, temasPorSellar, docsClonadosParaAcademia,
} from '../src/lib/contenidoModelo.js'
import { ensamblarModulos, construirApiBajoDemanda } from '../src/lib/contenidoApi.js'

const ESTRUCTURA = [
  { id: 'm1', titulo: 'M1', unidades: [{ id: 'u1', temas: [{ id: 't1', titulo: 'T1' }, { id: 't2', titulo: 'T2' }] }] },
  { id: 'm2', titulo: 'M2', unidades: [{ id: 'u2', temas: [{ id: 't3', titulo: 'T3' }] }, { id: 'u3', temas: [{ id: 't4', titulo: 'T4' }] }] },
  { id: 'm3', titulo: 'M3', unidades: [{ id: 'u4', temas: [{ id: 't5', titulo: 'T5' }] }] },
]
const GRUPO = { id: 'G1', modulosOcultos: ['m2', 'm3'] }

test('modulosPorTema: cada tema con el módulo que lo contiene, recorriendo unidades', () => {
  const m = modulosPorTema(ESTRUCTURA)
  assert.equal(m.get('t1'), 'm1')
  assert.equal(m.get('t3'), 'm2')
  assert.equal(m.get('t4'), 'm2')
  assert.equal(m.get('t5'), 'm3')
  assert.equal(m.size, 5)
  assert.equal(modulosPorTema(null).size, 0)
})

test('clonación: todo tema clonado nace con su módulo', () => {
  const plantillaTemas = ['t1', 't3', 't5'].map((temaId) => ({ temaId, titulo: temaId }))
  const { temas } = docsClonadosParaAcademia({
    academiaId: 'ACA', plantillaId: 'tum', plantillaTemas, estructura: ESTRUCTURA,
  })
  assert.deepEqual(temas.map((t) => t.moduloId), ['m1', 'm2', 'm3'])
})

test('sellado: solo lo que falta o está desalineado, con la versión siguiente', () => {
  const docs = [
    { docId: 'c__t1', temaId: 't1', moduloId: 'm1', version: 3 }, // ya bien
    { docId: 'c__t3', temaId: 't3', version: 1 }, // sin módulo
    { docId: 'c__t5', temaId: 't5', moduloId: 'm1', version: 2 }, // movido
    { docId: 'c__tX', temaId: 'tX', version: 1 }, // fuera de la estructura
  ]
  assert.deepEqual(temasPorSellar(ESTRUCTURA, docs), [
    { docId: 'c__t3', temaId: 't3', moduloId: 'm2', version: 1 },
    { docId: 'c__t5', temaId: 't5', moduloId: 'm3', version: 2 },
  ])
})

test('cerrados: ocultos del grupo menos lo desbloqueado a esta persona', () => {
  const alumno = { rol: 'alumno', grupo: GRUPO, desbloqueados: ['m2'] }
  assert.deepEqual([...modulosCerrados(alumno)], ['m3'])
  assert.deepEqual([...modulosCerrados({ rol: 'alumno', grupo: GRUPO })].sort(), ['m2', 'm3'])
})

test('cerrados: el staff y el super-admin no tienen nada cerrado', () => {
  for (const acceso of [
    { rol: 'instructor', grupo: GRUPO },
    { rol: 'admin_escuela', grupo: GRUPO },
    { esSuperadmin: true, grupo: GRUPO },
  ]) {
    assert.equal(modulosCerrados(acceso).size, 0)
    assert.equal(leePorRamaDeAlumno(acceso), false)
  }
  // Recepción u otro rol con grupo lee por la rama del alumno, como en las reglas.
  assert.equal(leePorRamaDeAlumno({ rol: 'recepcion' }), true)
  assert.equal(modulosCerrados({ rol: 'recepcion', grupo: GRUPO }).size, 2)
})

test('firma de cierre: estable, y cambia cuando se abre un módulo', () => {
  const antes = firmaDeCierre({ rol: 'alumno', grupo: { modulosOcultos: ['m3', 'm2'] } })
  assert.equal(antes, 'm2,m3')
  const despues = firmaDeCierre({ rol: 'alumno', grupo: { modulosOcultos: ['m3', 'm2'] }, desbloqueados: ['m2'] })
  assert.notEqual(antes, despues)
})

test('trozos para `in`: respetan el tope de Firestore', () => {
  const ids = Array.from({ length: 65 }, (_, i) => `m${i}`)
  const trozos = trozosParaIn(ids)
  assert.deepEqual(trozos.map((t) => t.length), [MAX_IN, MAX_IN, 5])
  assert.deepEqual(trozos.flat(), ids)
})

test('ensamblar: un módulo cerrado entra como fichas SIN contenido y no cuenta como faltante', () => {
  const docs = new Map([
    ['t1', { temaId: 't1', titulo: 'T1', secciones: [{ titulo: 'x', bloques: [] }], quiz: [{ pregunta: 'q' }] }],
    ['t2', { temaId: 't2', titulo: 'T2' }],
  ])
  const { modulos, faltantes } = ensamblarModulos(ESTRUCTURA, docs, { modulosCerrados: new Set(['m2', 'm3']) })
  assert.deepEqual(faltantes, [])
  assert.equal(modulos.length, 3)
  const t3 = modulos[1].temas.find((t) => t.id === 't3')
  assert.equal(t3.cerrado, true)
  assert.equal(t3.titulo, 'T3')
  assert.deepEqual(t3.secciones, [])
  assert.deepEqual(t3.quiz, [])
  assert.equal(modulos[0].temas[0].quiz.length, 1)
})

test('bajo demanda: lo cerrado no se pide a la red', async () => {
  const pedidos = []
  const indice = {
    modulos: ESTRUCTURA.map((m) => ({
      id: m.id, titulo: m.titulo,
      temas: m.unidades.flatMap((u) => u.temas).map((t) => ({ id: t.id, titulo: t.titulo })),
    })),
  }
  const api = construirApiBajoDemanda({
    indice,
    modulosCerrados: new Set(['m2']),
    cargarTema: async (id) => { pedidos.push(`tema:${id}`); return { id } },
    cargarAgregado: async (tipo, moduloId) => { pedidos.push(`${tipo}:${moduloId}`); return [moduloId] },
  })
  assert.equal(await api.getTemaAsync('t3'), null)
  assert.equal(await api.preguntasDeModuloAsync('m2'), null)
  assert.deepEqual(await api.todasLasPreguntasAsync(), ['m1', 'm3'])
  assert.ok(await api.getTemaAsync('t1'))
  // Los globales siguen pidiéndose: solo llevan índice.
  await api.enlacesGlosarioAsync()
  assert.ok(!pedidos.some((p) => p.endsWith(':m2') || p === 'tema:t3'), pedidos.join(' '))
  assert.ok(pedidos.includes('glosarioEnlaces:null'))
  // El índice sigue listando el módulo cerrado: se ve bloqueado, no desaparece.
  assert.ok(api.getModulo('m2'))
})
