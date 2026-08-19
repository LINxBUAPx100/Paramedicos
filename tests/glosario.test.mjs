// ============================================================
//  Pruebas del glosario — orden, unicidad, agrupación y marcado
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  normalizarTermino, slugTermino, construirGlosario, expresionDeTerminos,
  partirTexto, progresoGlosario,
} from '../src/lib/glosario.js'

const TEMAS = [
  {
    id: 'm1-t1', numero: '1.1', titulo: 'Célula', moduloId: 'm1', moduloNumero: 1, moduloTitulo: 'PROPEDÉUTICO',
    conceptosClave: [
      { termino: 'Homeostasis', definicion: 'Equilibrio del medio interno.' },
      { termino: 'Vía aérea', definicion: 'Conducto por el que entra el aire.' },
    ],
  },
  {
    id: 'm1-t2', numero: '1.2', titulo: 'Tejidos', moduloId: 'm1', moduloNumero: 1, moduloTitulo: 'PROPEDÉUTICO',
    conceptosClave: [
      { termino: 'HOMEOSTASIS', definicion: 'Repetido: no debe crear otra entrada.' },
      { termino: 'Paro', definicion: 'Detención de una función.' },
      { termino: 'Paro cardiorrespiratorio', definicion: 'Cese de circulación y ventilación.' },
    ],
  },
  {
    id: 'm2-t1', numero: '2.1', titulo: 'Shock', moduloId: 'm2', moduloNumero: 2, moduloTitulo: 'EL CUERPO HUMANO',
    conceptosClave: [
      { termino: 'Shock', definicion: 'Hipoperfusión tisular.' },
      { termino: 'Sin definición', definicion: '   ' }, // se descarta
    ],
  },
]

test('normalización y slug: acentos, mayúsculas y espacios no crean palabras distintas', () => {
  assert.equal(normalizarTermino('  VÍA   Aérea '), 'via aerea')
  assert.equal(normalizarTermino('Homeostasis'), normalizarTermino('HOMEOSTASIS'))
  assert.equal(slugTermino('Vía aérea'), 'via-aerea')
  assert.equal(slugTermino('Na⁺/K⁺ ATPasa'), 'na-k-atpasa')
})

test('el glosario sigue el ORDEN DE APARICIÓN del plan, no el alfabético', () => {
  const g = construirGlosario(TEMAS)
  assert.deepEqual(
    g.entradas.map((e) => e.termino),
    ['Homeostasis', 'Vía aérea', 'Paro', 'Paro cardiorrespiratorio', 'Shock'],
  )
})

test('no hay repetidos: la primera aparición manda y la segunda queda registrada', () => {
  const g = construirGlosario(TEMAS)
  const homeostasis = g.entradas.filter((e) => e.clave === 'homeostasis')
  assert.equal(homeostasis.length, 1)
  assert.equal(homeostasis[0].temaId, 'm1-t1', 'debe quedarse con el tema donde salió primero')
  assert.deepEqual(homeostasis[0].tambienEn, ['m1-t2'])
})

test('un concepto sin definición no entra al glosario', () => {
  const g = construirGlosario(TEMAS)
  assert.ok(!g.entradas.some((e) => e.termino === 'Sin definición'))
})

test('las entradas se agrupan en bloques POR MÓDULO, en orden de módulo', () => {
  const g = construirGlosario(TEMAS)
  assert.deepEqual(g.porModulo.map((b) => b.moduloId), ['m1', 'm2'])
  assert.deepEqual(g.porModulo[0].entradas.map((e) => e.termino), ['Homeostasis', 'Vía aérea', 'Paro', 'Paro cardiorrespiratorio'])
  assert.deepEqual(g.porModulo[1].entradas.map((e) => e.termino), ['Shock'])
})

test('cada entrada recuerda su tema: es lo que permite descubrirla al desbloquear', () => {
  const g = construirGlosario(TEMAS)
  const soloM1 = (temaId) => temaId.startsWith('m1')
  const p = progresoGlosario(g, soloM1)
  assert.deepEqual(p, { total: 5, descubiertas: 4, pct: 80 })
  assert.deepEqual(progresoGlosario(g, () => true).pct, 100)
  assert.deepEqual(progresoGlosario(g, () => false).descubiertas, 0)
})

test('el marcado respeta la palabra completa y prefiere el término más largo', () => {
  const g = construirGlosario(TEMAS)
  const re = expresionDeTerminos(g.entradas)

  // «Paro cardiorrespiratorio» gana a «Paro»: no se parte la frase.
  const largo = partirTexto('Un paro cardiorrespiratorio exige RCP.', g, { regex: re })
  const marcados = largo.filter((s) => s.entrada).map((s) => s.entrada.termino)
  assert.deepEqual(marcados, ['Paro cardiorrespiratorio'])

  // Dentro de otra palabra NO se marca: «shockeado» no es «shock».
  const dentro = partirTexto('El paciente quedó shockeado por la noticia.', g, { regex: re })
  assert.equal(dentro.filter((s) => s.entrada).length, 0)

  // Los acentos y las mayúsculas del texto no impiden reconocerlo.
  const acento = partirTexto('La VÍA AÉREA se abre primero.', g, { regex: re })
  assert.deepEqual(acento.filter((s) => s.entrada).map((s) => s.entrada.clave), ['via aerea'])

  // El texto se conserva entero al recomponer los segmentos.
  const original = 'Un paro cardiorrespiratorio exige RCP.'
  assert.equal(largo.map((s) => s.texto).join(''), original)
})

test('solo se marca la PRIMERA aparición de cada término en una misma lección', () => {
  const g = construirGlosario(TEMAS)
  const re = expresionDeTerminos(g.entradas)
  const yaMarcados = new Set()
  const uno = partirTexto('El shock mata. Reconoce el shock temprano.', g, { regex: re, yaMarcados })
  assert.equal(uno.filter((s) => s.entrada).length, 1, 'dos veces en el mismo párrafo: se marca una')

  const dos = partirTexto('Otro párrafo del mismo tema habla de shock.', g, { regex: re, yaMarcados })
  assert.equal(dos.filter((s) => s.entrada).length, 0, 'ya marcado antes en la misma lección')

  // Con un Set nuevo (otra lección) vuelve a marcarse.
  const otraLeccion = partirTexto('Otro tema habla de shock.', g, { regex: re, yaMarcados: new Set() })
  assert.equal(otraLeccion.filter((s) => s.entrada).length, 1)
})

test('sin glosario o sin texto no se rompe nada', () => {
  const vacio = construirGlosario([])
  assert.deepEqual(vacio.entradas, [])
  assert.equal(expresionDeTerminos([]), null)
  assert.deepEqual(partirTexto('texto', vacio), [{ texto: 'texto' }])
  assert.deepEqual(partirTexto('', construirGlosario(TEMAS)), [{ texto: '' }])
  assert.deepEqual(partirTexto(null, construirGlosario(TEMAS)), [{ texto: '' }])
  assert.deepEqual(progresoGlosario(vacio, () => true), { total: 0, descubiertas: 0, pct: 0 })
})

test('dos términos distintos nunca comparten ancla', () => {
  const g = construirGlosario([
    {
      id: 't', titulo: 'T', moduloId: 'm', moduloNumero: 1, moduloTitulo: 'M',
      conceptosClave: [
        { termino: 'Vía aérea', definicion: 'a' },
        { termino: 'Via aerea!', definicion: 'b' }, // slug idéntico tras normalizar
      ],
    },
  ])
  const slugs = g.entradas.map((e) => e.slug)
  assert.equal(new Set(slugs).size, slugs.length, `slugs repetidos: ${slugs.join(', ')}`)
})
