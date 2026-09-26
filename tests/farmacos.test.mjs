// Entrenador de farmacología (trabajo D · PLAN-LMS §23.1, §27 y §29.2).
// Guardarraíles del catálogo: ninguna dosis sin fuente completa, ninguna ficha
// sin su página y sus referencias, y ningún enlace a una lección que no nombre
// el fármaco. Puro: corre con `npm test`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { todosLosTemas } from '../src/data/index.js'
import {
  FARMACOS, REFERENCIAS, SECCIONES, UNIDADES_NOM, MARCO,
} from '../src/data/farmacos/catalogo.js'
import {
  problemasDeFicha, problemasDeDosis, indiceInverso, preguntasDe, tarjetasDe,
  filtrarFarmacos, casillaDe, tandaClasificacion,
} from '../src/lib/farmacosModelo.js'
import { capacidadesDe } from '../src/lib/capacidades.js'
import { DOSIS, PRESENTACIONES } from '../src/data/farmacos/dosis.js'
import { casosDisponibles, construirCaso } from '../src/lib/casosFarmacologia.js'
import { diagnosticar } from '../src/lib/calculoDosis.js'
import { TEMAS_FUNDAMENTOS, PREGUNTAS_FUNDAMENTOS } from '../src/data/farmacos/fundamentos.js'

const TEMAS = new Map(todosLosTemas.map((t) => [t.id, t]))
const SECC = SECCIONES.map((s) => s.id)

test('catálogo: 46 fichas (43 de la academia + 3 complementarias) con ids únicos', () => {
  assert.equal(FARMACOS.length, 46)
  assert.equal(new Set(FARMACOS.map((f) => f.id)).size, FARMACOS.length)
})

test('catálogo: toda ficha es válida', () => {
  for (const f of FARMACOS) {
    const p = problemasDeFicha(f, { secciones: SECC, referencias: REFERENCIAS, temasExistentes: new Set(TEMAS.keys()) })
    assert.deepEqual(p, [], `${f.id}: ${p.join('; ')}`)
  }
})

test('catálogo: el mínimo NOM-034 tiene los 23 elementos de los apéndices A-D de la guía', () => {
  const nom = FARMACOS.filter((f) => f.apendice)
  assert.equal(nom.length, 23)
  const porApendice = Object.groupBy(nom, (f) => f.apendice)
  assert.deepEqual(
    Object.fromEntries(Object.entries(porApendice).map(([k, v]) => [k, v.length])),
    { A: 5, B: 6, C: 11, D: 1 },
  )
})

test('catálogo: todo en borrador; las dosis investigadas están adjuntas', () => {
  for (const f of FARMACOS) assert.equal(f.estadoEditorial, 'borrador', f.id)
  const con = FARMACOS.filter((f) => f.dosis.length)
  assert.ok(con.length >= 28, `solo ${con.length} fichas con dosis`)
  // Ninguna clave de dosis.js apunta a una ficha que no existe.
  const ids = new Set(FARMACOS.map((f) => f.id))
  for (const k of Object.keys(DOSIS)) assert.ok(ids.has(k), `dosis de ficha inexistente «${k}»`)
  for (const k of Object.keys(PRESENTACIONES)) assert.ok(ids.has(k), `presentación de ficha inexistente «${k}»`)
})

test('mandato CLAUDE.md §9.2: atropina en bradicardia adulta = 1 mg, máximo 3 mg', () => {
  const d = FARMACOS.find((f) => f.id === 'atropina').dosis.find((x) => x.id === 'bradicardia-adulto')
  assert.equal(d.calculo.valor, 1)
  assert.match(d.dosisTexto, /máxima 3 mg/)
  assert.doesNotMatch(d.dosisTexto, /0\.5 mg/)
})

test('dosis: la adrenalina de anafilaxia (IM 0.5 mg) y la de paro (IV 1 mg) no se confunden', () => {
  const ad = FARMACOS.find((f) => f.id === 'adrenalina').dosis
  const paro = ad.find((d) => d.id === 'paro-adulto')
  const anaf = ad.find((d) => d.id === 'anafilaxia-adulto')
  assert.equal(paro.via, 'IV'); assert.equal(paro.calculo.valor, 1)
  assert.equal(anaf.via, 'IM'); assert.equal(anaf.calculo.valor, 0.5)
})

test('guardarraíl §23.1: una dosis sin fuente completa se rechaza', () => {
  const base = { id: 'x', indicacion: 'x', poblacion: 'adulto', via: 'IV', dosisTexto: '1 mg', cita: 'literal' }
  const completa = { documento: 'AHA', edicion: '2025', anio: 2025, url: 'https://x.org', seccion: 'Fig. 2' }
  assert.ok(problemasDeDosis(base).includes('dosis sin fuente'))
  const { edicion, ...sinEdicion } = completa
  assert.ok(problemasDeDosis({ ...base, fuente: sinEdicion }).some((p) => p.includes('edicion')))
  const { seccion, ...sinLugar } = completa
  assert.ok(problemasDeDosis({ ...base, fuente: sinLugar }).includes('fuente de dosis sin capítulo, sección ni página'))
  const { cita, ...sinCita } = base
  assert.ok(problemasDeDosis({ ...sinCita, fuente: completa }).includes('dosis sin cita literal de la fuente'))
  assert.deepEqual(problemasDeDosis({ ...base, fuente: completa }), [])
  // Un cálculo que apunta a una presentación inexistente también se rechaza.
  assert.ok(problemasDeDosis({ ...base, fuente: completa, calculo: { tipo: 'fija', valor: 1, unidadMasa: 'mg', presentacion: 'no' } }, [])
    .includes('presentación inexistente «no»'))
  // Y la ficha que la trae hereda el problema.
  const f = { ...FARMACOS[0], dosis: [base] }
  assert.ok(problemasDeFicha(f, { referencias: REFERENCIAS }).includes('x: dosis sin fuente'))
})

test('guardarraíl: una ficha no se autovalida sin revisor', () => {
  const f = { ...FARMACOS[0], estadoEditorial: 'validado' }
  assert.ok(problemasDeFicha(f, { referencias: REFERENCIAS }).includes('estado validado sin revisor'))
})

test('enlaces: cada lección enlazada nombra el fármaco en su texto', () => {
  for (const f of FARMACOS) {
    if (!f.temasRelacionados.length) continue
    const re = new RegExp(f.patron, 'i')
    for (const id of f.temasRelacionados) {
      const texto = JSON.stringify(TEMAS.get(id)?.secciones || [])
      assert.ok(re.test(texto), `${f.id} → ${id}: la lección no contiene /${f.patron}/`)
    }
  }
})

test('enlaces: el índice inverso pone todo el mínimo NOM en la lección de la NOM-034', () => {
  const idx = indiceInverso(FARMACOS)
  const enNom = new Set((idx['m4-far-nom-034'] || []).map((f) => f.id))
  const oxigeno = 'oxigeno' // la lección lo trata como equipo, no como medicamento
  for (const f of FARMACOS.filter((x) => x.apendice && x.id !== oxigeno)) {
    assert.ok(enNom.has(f.id), f.id)
  }
  assert.ok(idx['m4-tox-anafilaxia'].some((f) => f.id === 'adrenalina'))
})

test('práctica: las preguntas salen de la ficha y los distractores de otras fichas', () => {
  const ps = preguntasDe(FARMACOS, { semilla: 'prueba' })
  assert.ok(ps.length >= FARMACOS.length * 4, `solo ${ps.length} preguntas`)
  const usos = new Set(FARMACOS.map((f) => f.uso))
  for (const p of ps) {
    assert.equal(p.opciones.length, 4, p.id)
    assert.equal(new Set(p.opciones).size, 4, `${p.id}: opciones repetidas`)
    assert.equal(p.correcta, 0)
    assert.ok(/Catálogo de la academia, p\.|Fuente: \[/.test(p.explicacion), p.id)
    const f = FARMACOS.find((x) => x.id === p.farmacoId)
    if (p.id.endsWith('-uso')) {
      assert.equal(p.opciones[0], f.uso)
      for (const o of p.opciones) assert.ok(usos.has(o), `${p.id}: «${o}» no está en el catálogo`)
    }
  }
  // Misma semilla, misma tanda.
  assert.deepEqual(preguntasDe(FARMACOS, { semilla: 's' }).map((p) => p.id), preguntasDe(FARMACOS, { semilla: 's' }).map((p) => p.id))
})

test('práctica: tarjetas, filtro y clasificación', () => {
  assert.equal(tarjetasDe(FARMACOS).length, FARMACOS.length * 2)
  assert.deepEqual(filtrarFarmacos(FARMACOS, { consulta: 'naloxona' }).map((f) => f.id), ['naloxona'])
  assert.ok(filtrarFarmacos(FARMACOS, { consulta: 'OXIGENO' }).some((f) => f.id === 'oxigeno'))
  assert.equal(filtrarFarmacos(FARMACOS, { origen: 'ampliado' }).length, 23)
  assert.equal(casillaDe(FARMACOS.find((f) => f.id === 'haloperidol')), 'D')
  assert.equal(casillaDe(FARMACOS.find((f) => f.id === 'propofol')), 'ampliado')
  assert.equal(tandaClasificacion(FARMACOS, 15, 'x').length, 15)
})

test('marco: referencias y unidades coherentes', () => {
  for (const m of MARCO) for (const r of m.fuentes) assert.ok(REFERENCIAS[r], `${m.titulo} [${r}]`)
  for (const r of Object.values(REFERENCIAS)) assert.match(r.url, /^https:\/\//)
  assert.deepEqual(UNIDADES_NOM.at(-1).apendices, ['A', 'B', 'C', 'D'])
})

test('capacidad: el entrenador es de plan Pro (decisión 15)', () => {
  assert.equal(capacidadesDe({ planComercial: 'base' }).entrenadorFarmacologia, false)
  assert.equal(capacidadesDe({ planComercial: 'pro' }).entrenadorFarmacologia, true)
  assert.equal(capacidadesDe({ planComercial: 'curso' }).entrenadorFarmacologia, false)
  assert.equal(capacidadesDe({}).entrenadorFarmacologia, true) // academia legacy = pro
  assert.equal(capacidadesDe(null).entrenadorFarmacologia, false)
})

test('casos: cada dosis calculable produce un caso coherente para muchos pacientes', () => {
  const casos = casosDisponibles(FARMACOS)
  assert.ok(casos.length >= 25, `solo ${casos.length} casos`)
  for (const { f, d } of casos) {
    for (let i = 0; i < 25; i++) {
      const c = construirCaso(f, d, { farmacos: FARMACOS, semilla: `${f.id}-${d.id}-${i}` })
      assert.ok(c.fuente?.url && c.enunciado, c.id)
      for (const p of c.pasos) {
        if (p.tipo === 'opcion') {
          assert.equal(p.opciones.filter((o) => o.correcta).length, 1, `${c.id}: ${p.id}`)
          assert.equal(new Set(p.opciones.map((o) => o.texto)).size, p.opciones.length, `${c.id}: opciones repetidas en ${p.id}`)
          continue
        }
        assert.ok(Number.isFinite(p.respuesta) && p.respuesta > 0, `${c.id}: ${p.id} = ${p.respuesta}`)
        assert.equal(diagnosticar(p.respuesta, p.respuesta, p.ctx), null, `${c.id}: ${p.id}`)
        // Magnitudes que se pueden cargar o programar de verdad.
        // Hasta 120 mL: el bicarbonato a 1 mEq/kg en 90 kg son dos frascos de 50 mL.
        if (p.id === 'ml') assert.ok(p.respuesta <= 120, `${c.id}: ${p.respuesta} mL`)
        if (p.id === 'tabletas') assert.ok(Number.isInteger(p.respuesta), `${c.id}: ${p.respuesta} tabletas`)
        // Hasta 2000 mL/h: el plan C de la OMS pasa 30 mL/kg en 30 minutos.
        if (p.id === 'mlh') assert.ok(p.respuesta >= 1 && p.respuesta <= 2000, `${c.id}: ${p.respuesta} mL/h`)
      }
    }
  }
})

test('casos: el tope de dosis se aplica (anafilaxia pediátrica nunca pasa de 0.5 mg)', () => {
  const f = FARMACOS.find((x) => x.id === 'adrenalina')
  const d = f.dosis.find((x) => x.id === 'anafilaxia-pediatrica')
  for (let i = 0; i < 40; i++) {
    const c = construirCaso(f, d, { farmacos: FARMACOS, semilla: `tope-${i}` })
    assert.ok(c.pasos.find((p) => p.id === 'dosis').respuesta <= 0.5)
  }
})

test('fundamentos: cada pregunta pregunta un hecho citado', () => {
  const hechos = new Set(TEMAS_FUNDAMENTOS.flatMap((t) => t.hechos.map((h) => h.id)))
  assert.ok(PREGUNTAS_FUNDAMENTOS.length >= 25)
  for (const t of TEMAS_FUNDAMENTOS) for (const h of t.hechos) {
    assert.match(h.fuente.url, /^https:\/\//, h.id)
    assert.ok(h.fuente.documento && h.fuente.seccion, h.id)
  }
  for (const q of PREGUNTAS_FUNDAMENTOS) {
    assert.ok(hechos.has(q.hecho), q.id)
    assert.equal(new Set(q.opciones).size, q.opciones.length, q.id)
    assert.ok(q.explicacion.includes('Fuente:'), q.id)
  }
  // Lo que se excluyó por falta de fuente no se coló.
  const texto = JSON.stringify(TEMAS_FUNDAMENTOS)
  assert.doesNotMatch(texto, /LADME|15-30°|paliativ/i)
})

test('casos: ningún distractor es también correcto', async () => {
  const { compartenCondicion, viaMencionada } = await import('../src/lib/casosFarmacologia.js')
  const F = (id) => FARMACOS.find((f) => f.id === id)
  const D = (id, d) => F(id).dosis.find((x) => x.id === d)
  // Bradicardia refractaria: adrenalina y atropina también sirven.
  assert.ok(compartenCondicion(D('dopamina', 'bradicardia-infusion'), F('adrenalina')))
  assert.ok(compartenCondicion(D('dopamina', 'bradicardia-infusion'), F('atropina')))
  // Dolor: ketorolaco, nalbufina y ketamina también sirven.
  for (const x of ['ketorolaco', 'nalbufina', 'ketamina', 'metamizol']) {
    assert.ok(compartenCondicion(D('fentanilo', 'analgesia'), F(x)), x)
  }
  // Paro: amiodarona también se usa en reanimación.
  assert.ok(compartenCondicion(D('adrenalina', 'paro-adulto'), F('amiodarona')))
  // Y lo que no tiene que ver no se excluye.
  assert.ok(!compartenCondicion(D('fentanilo', 'analgesia'), F('oxitocina')))
  // Vías que la fuente admite.
  for (const v of ['IN', 'IM', 'IO']) assert.ok(viaMencionada(D('fentanilo', 'analgesia'), v), v)
  assert.ok(!viaMencionada(D('fentanilo', 'analgesia'), 'VO'))
  // Siempre quedan cuatro opciones de fármaco y de vía.
  for (const { f, d } of casosDisponibles(FARMACOS)) {
    const c = construirCaso(f, d, { farmacos: FARMACOS, semilla: 'n' })
    assert.equal(c.pasos.find((p) => p.id === 'farmaco').opciones.length, 4, c.id)
    assert.equal(c.pasos.find((p) => p.id === 'via').opciones.length, 4, c.id)
    for (const o of c.pasos.find((p) => p.id === 'farmaco').opciones.filter((x) => !x.correcta)) {
      assert.ok(!compartenCondicion(d, FARMACOS.find((x) => x.nombre === o.texto)), `${c.id}: ${o.texto}`)
    }
  }
})

test('dosis: ninguna clave repetida se come las entradas de otra ronda', async () => {
  const { readFileSync } = await import('node:fs')
  for (const archivo of ['dosis.js', 'dosisUrgencias.js', 'dosisAmpliacion.js']) {
    const texto = readFileSync(new URL(`../src/data/farmacos/${archivo}`, import.meta.url), 'utf8')
    // Claves de primer nivel de cada objeto exportado de dosis.
    for (const bloque of texto.split(/\n(?=(?:export )?const [A-Z_]+ = \{)/)) {
      const claves = [...bloque.matchAll(/^ {2}('?[a-z0-9#.-]+'?): \[/gm)].map((m) => m[1].replace(/'/g, ''))
      const dup = claves.filter((c, i) => claves.indexOf(c) !== i)
      assert.deepEqual(dup, [], `${archivo}: claves repetidas ${dup.join(', ')}`)
    }
  }
  // Y los ids de dosis son únicos dentro de cada ficha.
  for (const f of FARMACOS) {
    const ids = f.dosis.map((d) => d.id)
    assert.equal(new Set(ids).size, ids.length, `${f.id}: ids de dosis repetidos`)
  }
})
