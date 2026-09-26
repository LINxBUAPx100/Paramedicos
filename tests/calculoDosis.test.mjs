// Motor de cálculo del entrenador de farmacología. Puro: `npm test`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  convertirMasa, porcentajeAMgMl, proporcionAMgMl, dosisPorPeso, volumenAExtraer,
  mlHoraPorPeso, mlHoraFija, mlHoraPorTiempo, gotasPorMinuto, leerNumero, diagnosticar, coincide,
} from '../src/lib/calculoDosis.js'
import { HABILIDADES } from '../src/lib/ejerciciosCalculo.js'
import { generador } from '../src/lib/azar.js'
import { actualizarDominio, RACHA_PARA_DOMINAR } from '../src/lib/dominioFarmacos.js'

test('conversiones y concentraciones', () => {
  assert.equal(convertirMasa(0.3, 'mg', 'mcg'), 300)
  assert.equal(convertirMasa(2, 'g', 'mg'), 2000)
  assert.equal(convertirMasa(250, 'mcg', 'mg'), 0.25)
  assert.throws(() => convertirMasa(1, 'mg', 'mL'))
  assert.equal(porcentajeAMgMl(2), 20) // lidocaína al 2 % = 20 mg/mL
  assert.equal(porcentajeAMgMl(50), 500) // dextrosa al 50 % = 0.5 g/mL
  assert.equal(proporcionAMgMl(1000), 1) // 1:1000 = 1 mg/mL
  assert.equal(proporcionAMgMl(10000), 0.1)
})

test('dosis, volumen, infusión y goteo', () => {
  assert.deepEqual(dosisPorPeso(0.01, 20, 0.5), { dosis: 0.2, bruta: 0.2, topada: false })
  assert.equal(dosisPorPeso(0.01, 60, 0.5).dosis, 0.5)
  assert.equal(dosisPorPeso(0.01, 60, 0.5).topada, true)
  assert.equal(volumenAExtraer(75, 50), 1.5)
  assert.equal(mlHoraPorPeso(0.1, 70, 16), 26.25)
  assert.equal(mlHoraFija(10, 16), 37.5)
  assert.equal(mlHoraPorTiempo(100, 10), 600)
  assert.ok(coincide(gotasPorMinuto(500, 20, 240), 41.67))
})

test('leerNumero acepta coma o punto y unidades pegadas', () => {
  assert.equal(leerNumero('1,5'), 1.5)
  assert.equal(leerNumero(' 2.25 mL'), 2.25)
  assert.equal(leerNumero('1,000.5'), 1000.5)
  assert.ok(Number.isNaN(leerNumero('')))
  assert.ok(Number.isNaN(leerNumero('dos')))
})

test('diagnóstico: nombra el error', () => {
  assert.equal(diagnosticar(26.25, 26.25), null)
  assert.equal(diagnosticar(26.3, 26.25), null) // redondeo tolerado
  assert.equal(diagnosticar(NaN, 1).tipo, 'formato')
  assert.equal(diagnosticar(26250, 26.25).tipo, 'unidades')
  assert.equal(diagnosticar(0.4375, 26.25).tipo, 'tiempo') // olvidó × 60
  assert.equal(diagnosticar(0.375, 26.25, { peso: 70 }).tipo, 'peso')
  assert.equal(diagnosticar(2500, 41.67, { factor: 60 }).tipo, 'factor')
  assert.equal(diagnosticar(0.6667, 1.5, { invertido: 50 / 75 }).tipo, 'invertido')
  assert.equal(diagnosticar(0.6, 0.5, { sinTope: 0.6 }).tipo, 'tope')
  assert.equal(diagnosticar(0.0003, 300, { invertido: 0.0003 }).tipo, 'invertido')
  assert.equal(diagnosticar(7, 3).tipo, 'otro')
})

test('habilidades: cada generador produce ejercicios coherentes', () => {
  assert.equal(HABILIDADES.length, 8)
  for (const h of HABILIDADES) {
    assert.ok(h.explicacion.length >= 2 && h.formula && h.ejemplo?.solucion, h.id)
    for (let s = 0; s < 60; s++) {
      const ej = h.generar(generador(`${h.id}-${s}`))
      assert.ok(ej.enunciado, h.id)
      assert.ok(ej.pasos.length >= 1, h.id)
      for (const p of ej.pasos) {
        assert.ok(Number.isFinite(p.respuesta) && p.respuesta > 0, `${h.id}: ${p.id} = ${p.respuesta}`)
        assert.ok(p.unidad && p.pregunta && p.resolucion, `${h.id}: ${p.id}`)
        // La respuesta correcta se acepta, y su pista invertida no la tapa.
        assert.equal(diagnosticar(p.respuesta, p.respuesta, p.ctx), null)
      }
    }
  }
})

test('habilidades: la velocidad de infusión es de magnitud clínica plausible', () => {
  const h = HABILIDADES.find((x) => x.id === 'infusion')
  for (let s = 0; s < 200; s++) {
    const ej = h.generar(generador(`inf-${s}`))
    const mlh = ej.pasos.at(-1).respuesta
    assert.ok(mlh >= 1 && mlh <= 100, `${ej.enunciado} → ${mlh} mL/h`)
  }
})

test('dominio: racha, reinicio y marca permanente', () => {
  let d = {}
  for (let i = 0; i < RACHA_PARA_DOMINAR; i++) d = actualizarDominio(d, 'x', true, 0)
  assert.equal(d.x.dominada, true)
  d = actualizarDominio(d, 'x', false, 0)
  assert.equal(d.x.racha, 0)
  assert.equal(d.x.dominada, true)
})
