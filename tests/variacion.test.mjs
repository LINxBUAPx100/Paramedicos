// ============================================================
//  Modo llamada — cada partida es distinta (07-10-2026)
// ------------------------------------------------------------
//  Lo que se protege: que la variedad salga de una semilla (reproducible),
//  que ninguna partida generada sea un caso inválido o regale lo que se
//  explora, que las opciones sean siempre las mismas (solo cambia el orden) y
//  que el desplazamiento de las cifras conserve las tendencias.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { variarCaso, aplicarVariante, azar } from '../src/lib/variacion.js'
import { validarCaso } from '../src/lib/casosModelo.js'
import { CASOS } from '../src/data/casos/index.js'

const SEMILLAS = Array.from({ length: 40 }, (_, i) => 1000 + i * 7919)

test('la misma semilla da la misma partida; otra semilla, otra', () => {
  const c = CASOS[0]
  assert.deepEqual(variarCaso(c, 42), variarCaso(c, 42))
  const distintas = new Set(SEMILLAS.map((s) => JSON.stringify(variarCaso(c, s).nodos)))
  assert.ok(distintas.size > 1, 'cuarenta partidas no pueden ser todas iguales')
  const r = azar(7)
  assert.ok(r() >= 0 && r() < 1)
})

test('ninguna partida generada es un caso inválido', () => {
  for (const c of CASOS) {
    for (const s of SEMILLAS) {
      assert.deepEqual(validarCaso(variarCaso(c, s)), [], `${c.id} con semilla ${s}`)
    }
  }
})

test('las opciones son siempre las mismas: solo cambia su orden', () => {
  for (const c of CASOS) {
    const p = variarCaso(c, 99)
    for (const [id, n] of Object.entries(c.nodos)) {
      if (!n.opciones) continue
      const antes = n.opciones.map((o) => `${o.texto}→${o.va}:${o.tipo}`).sort()
      const ahora = p.nodos[id].opciones.map((o) => `${o.texto}→${o.va}:${o.tipo}`).sort()
      assert.deepEqual(ahora, antes, `${c.id}/${id}`)
    }
  }
})

test('desplazar las cifras conserva las tendencias y no mueve un cero', () => {
  const caso = {
    id: 'x', titulo: 'x', estado: 'borrador', temas: ['m1-pab-dea'], fuentes: [{ nombre: 'F' }], inicio: 'n1',
    signos: { fc: 120, fr: 0, spo2: 90, ta: '110/70', glucosa: 40 },
    nodos: {
      n1: { texto: 'a', opciones: [
        { texto: 'peor', tipo: 'riesgo', retro: 'r', va: 'f', signos: { fc: 140, spo2: 84, ta: '90/60', glucosa: 32 } },
        { texto: 'igual', tipo: 'correcta', retro: 'r', va: 'f' },
      ] },
      f: { texto: 'fin', fin: true, desenlace: 'favorable' },
    },
  }
  for (const s of SEMILLAS) {
    const p = variarCaso(caso, s)
    const peor = p.nodos.n1.opciones.find((o) => o.texto === 'peor').signos
    assert.equal(peor.fc - p.signos.fc, 20, 'la FC sube lo mismo')
    assert.equal(peor.spo2 - p.signos.spo2, -6, 'la SpO₂ baja lo mismo')
    assert.equal(p.signos.fr, 0, 'una apnea sigue siendo apnea')
    assert.ok(p.signos.glucosa < 70 && peor.glucosa < p.signos.glucosa, 'la hipoglucemia sigue siéndolo y sigue bajando')
  }
})

test('las versiones de los casos de PTEM son válidas y no regalan lo que se explora', () => {
  const fuga = /\b(pulso|respira\w*|boque\w*|no responde|pálid\w*|sudoros\w*|cianót\w*|pupila\w*|spo2|saturaci\w*|mmhg|lpm|glucemia|mg\/dl)\b/i
  for (const c of CASOS) {
    for (let i = 0; i < (c.variantes?.length || 0); i++) {
      const v = aplicarVariante(c, i)
      assert.deepEqual(validarCaso(v), [], `${c.id} · ${v.version}`)
      for (const [id, n] of Object.entries(v.nodos)) {
        if (n.fin) continue
        assert.doesNotMatch(n.texto, fuga, `${c.id} · ${v.version} / ${id}: «${n.texto}»`)
      }
    }
  }
})
