// ============================================================
//  Editor de escenarios y monitor de signos del Modo llamada (05-10-2026)
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  casoNuevo, normalizarCaso, normalizarSignos, eliminarNodo, siguienteIdNodo, idDeCaso,
  avisosDeAutor, borradorDesde,
} from '../src/lib/casosEditor.js'
import { validarCaso, signosDelRecorrido, tendencia } from '../src/lib/casosModelo.js'
import { CASOS } from '../src/data/casos/index.js'

test('los signos tecleados se normalizan: vacío se omite, «—» es no medible, números son números', () => {
  assert.deepEqual(
    normalizarSignos({ fc: '110', spo2: ' 94 ', ta: '120/80', fr: '', avdi: 'v', piel: '—', temp: '38,5' }),
    { avdi: 'V', fc: 110, spo2: 94, ta: '120/80', temp: 38.5, piel: null },
  )
  assert.deepEqual(normalizarSignos({ fc: 'sin pulso' }), { fc: 'sin pulso' })
})

test('un caso nuevo arranca incompleto y el validador dice qué falta', () => {
  const errores = validarCaso(normalizarCaso({ ...casoNuevo(), id: 'x' }))
  assert.ok(errores.length > 0)
  assert.ok(errores.some((e) => /título/.test(e)))
})

test('un caso completo hecho en el editor pasa el validador', () => {
  const b = casoNuevo()
  b.id = 'caso-x'
  b.titulo = 'Prueba'
  b.temas = ['m1-pab-dea']
  b.fuentes = [{ nombre: 'Fuente', nota: '' }]
  b.signos = { avdi: 'A', fc: '100', fr: '', spo2: '—', ta: '' }
  b.nodos.n1 = {
    texto: 'Inicio',
    opciones: [
      { texto: 'Bien', tipo: 'correcta', va: 'fin1', retro: 'Porque sí.', tema: 'm1-pab-dea', signos: { fc: '90' } },
      { texto: 'Mal', tipo: 'riesgo', va: 'fin2', retro: 'Porque no.', tema: 'm1-pab-dea', signos: {} },
    ],
  }
  b.nodos.fin1.texto = 'Fin bueno'
  b.nodos.fin2.texto = 'Fin malo'
  const c = normalizarCaso(b)
  assert.deepEqual(validarCaso(c), [])
  assert.deepEqual(avisosDeAutor(c), [])
  assert.deepEqual(c.signos, { avdi: 'A', fc: 100, spo2: null })
  assert.equal(c.nodos.n1.opciones[1].signos, undefined, 'una decisión que no mueve signos no lleva el campo')
})

test('eliminar un momento deja sin destino las opciones que llevaban a él, y no borra el inicio', () => {
  const b = casoNuevo()
  b.nodos.n1.opciones[0].va = 'fin1'
  const sin = eliminarNodo(b, 'fin1')
  assert.equal(sin.nodos.fin1, undefined)
  assert.equal(sin.nodos.n1.opciones[0].va, '')
  assert.equal(eliminarNodo(b, 'n1'), b)
})

test('ids: siguiente momento libre y id de caso legible', () => {
  assert.equal(siguienteIdNodo({ n1: {}, n2: {} }, 'n'), 'n3')
  assert.equal(siguienteIdNodo({ fin1: {} }, 'fin'), 'fin2')
  assert.match(idDeCaso('Se desploma en la parada', 'RES-2026', () => 0.5), /^caso-res2026-se-desploma-en-la-parada-[0-9a-z]{4}$/)
})

test('adaptar un caso de PTEM produce un borrador que vuelve a dar el mismo caso', () => {
  for (const original of CASOS) {
    const vuelta = normalizarCaso({ ...borradorDesde(original), id: original.id, estado: original.estado })
    assert.deepEqual(validarCaso(vuelta), [], original.id)
    assert.deepEqual(vuelta.nodos, JSON.parse(JSON.stringify(original.nodos)), original.id)
  }
})

test('todo caso de PTEM tiene signos que reaccionan a las decisiones', () => {
  for (const caso of CASOS) {
    assert.ok(caso.signos, `${caso.id}: arranca sin signos`)
    const mueve = Object.values(caso.nodos).some((n) => n.signos || (n.opciones || []).some((o) => o.signos))
    assert.ok(mueve, `${caso.id}: ninguna decisión cambia los signos`)
  }
})

test('dos caminos, dos monitores: torniquete frente a esperar', () => {
  const caso = CASOS.find((c) => c.id === 'caso-m1-hemorragia-pierna')
  const camino = (ultima) => [
    { nodo: 'n1', opcion: 0 }, { nodo: 'n2', opcion: 0 }, { nodo: 'n3', opcion: 0 }, { nodo: 'n4', opcion: ultima },
  ]
  const torniquete = signosDelRecorrido(caso, camino(0)).actual
  const esperar = signosDelRecorrido(caso, camino(2)).actual
  assert.notDeepEqual(torniquete, esperar)
  assert.equal(tendencia(esperar.fc, torniquete.fc), 1, 'esperar deja más taquicardia')
  assert.equal(tendencia('78/48', '100/66'), -1, 'la TA compara la sistólica')
})

test('ningún caso de PTEM dice una dosis', () => {
  // Las dosis están bloqueadas hasta tener protocolo local (CLAUDE.md §9.1).
  const dosis = /\b\d+([.,]\d+)?\s?(mg|mcg|µg|ml|mL|UI|mg\/kg)\b/
  for (const caso of CASOS) {
    for (const [id, n] of Object.entries(caso.nodos)) {
      for (const t of [n.texto, ...(n.opciones || []).flatMap((o) => [o.texto, o.retro])]) {
        assert.doesNotMatch(t, dosis, `${caso.id}/${id}: «${t}»`)
      }
    }
  }
})
