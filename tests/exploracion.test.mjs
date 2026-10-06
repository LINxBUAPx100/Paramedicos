// ============================================================
//  Modo llamada — exploración activa (06-10-2026)
// ------------------------------------------------------------
//  El alumno obtiene los signos explorando y clasifica él la conciencia. Lo
//  que se protege: que cada estímulo describa la respuesta que la tabla de
//  Glasgow de la lección asigna a ese punto, que la corrección compare contra
//  el estado REAL del momento, que el lego no tenga acciones de TUM y que
//  ningún caso diga en su texto lo que se debe explorar.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  leerGlasgow, glasgowDe, incoherenciaConciencia, accionesDelCaso, explorar, calificarConciencia,
} from '../src/lib/exploracion.js'
import { CASOS } from '../src/data/casos/index.js'
import CONTENIDO from '../src/data/contenido/index.js'

test('Glasgow: se lee O#V#M# y, sin él, sale del AVDI', () => {
  assert.deepEqual(leerGlasgow('o3v4m6'), { o: 3, v: 4, m: 6 })
  assert.equal(leerGlasgow('O5V4M6'), null)
  assert.deepEqual(glasgowDe({ avdi: 'I' }), { o: 1, v: 1, m: 1 })
  assert.deepEqual(glasgowDe({ avdi: 'A', glasgow: 'O4V4M6' }), { o: 4, v: 4, m: 6 })
})

test('AVDI y Glasgow tienen que contar la misma historia', () => {
  assert.equal(incoherenciaConciencia({ avdi: 'A', glasgow: 'O4V4M6' }), null)
  assert.ok(incoherenciaConciencia({ avdi: 'A', glasgow: 'O3V5M6' }))
  assert.ok(incoherenciaConciencia({ avdi: 'V', glasgow: 'O2V2M4' }))
  assert.ok(incoherenciaConciencia({ avdi: 'D', glasgow: 'O1V1M1' }))
  assert.ok(incoherenciaConciencia({ avdi: 'I', glasgow: 'O1V1M4' }))
})

test('cada estímulo describe la respuesta de su punto en la tabla de la lección', () => {
  // La tabla que se enseña existe de verdad en m5-tcc-glasgow.
  assert.match(JSON.stringify(CONTENIDO['m5-tcc-glasgow']), /Localiza el dolor/)
  const s = { avdi: 'D', glasgow: 'O2V2M4' }
  assert.match(explorar('voz', s).texto, /No abre los ojos al oír tu voz/)
  assert.match(explorar('voz', s).texto, /quejidos/)
  assert.match(explorar('dolor', s).texto, /Abre los ojos con la presión/)
  assert.match(explorar('dolor', s).texto, /Retira el brazo/)
  assert.match(explorar('dolor', { avdi: 'D', glasgow: 'O1V1M3' }).texto, /Flexiona los brazos de forma anormal/)
  assert.match(explorar('voz', { avdi: 'A', glasgow: 'O4V4M6' }).texto, /confunde/)
  assert.match(explorar('voz', { avdi: 'A' }).texto, /apriete la mano y lo hace/)
})

test('medir deja el valor; observar, hablar o doler no dejan números', () => {
  const s = { avdi: 'A', fc: 112, fr: 22, spo2: 93, ta: '100/60', piel: 'pálida' }
  assert.deepEqual(explorar('pulso', s).medidos, { fc: 112 })
  assert.match(explorar('pulso', s).texto, /112/)
  assert.deepEqual(explorar('oximetro', s).medidos, { spo2: 93 })
  assert.deepEqual(explorar('voz', s).medidos, {})
  assert.deepEqual(explorar('observar', s).medidos, { piel: 'pálida' })
  assert.match(explorar('pulso', { fc: 'sin pulso' }).texto, /No encuentras pulso/)
})

test('preguntar: contesta quien puede hablar, y el confuso a medias', () => {
  const relato = { historia: 'Me duele el pecho.', testigos: 'Se cayó de golpe.' }
  assert.match(explorar('preguntar', { avdi: 'A' }, {}, relato).texto, /Te dice: «Me duele el pecho.»/)
  assert.match(explorar('preguntar', { avdi: 'A', glasgow: 'O4V4M6' }, {}, relato).texto, /se confunde/)
  assert.match(explorar('preguntar', { avdi: 'D' }, {}, relato).texto, /No puede contestarte/)
  assert.match(explorar('testigos', { avdi: 'I' }, {}, relato).texto, /Se cayó de golpe/)
})

test('el lego no toma pulso ni pupilas, y sin equipo no hay oxímetro', () => {
  const lego = { rol: 'lego', signos: { avdi: 'I', fc: 'sin pulso', spo2: null }, nodos: {} }
  const ids = accionesDelCaso(lego).map((a) => a.id)
  assert.ok(!ids.includes('pulso') && !ids.includes('pupilas') && !ids.includes('oximetro'))
  assert.ok(ids.includes('voz') && ids.includes('dolor') && ids.includes('respiracion'))
  const tum = { rol: 'tum', signos: { avdi: 'A', spo2: 95 }, nodos: {} }
  assert.ok(accionesDelCaso(tum).some((a) => a.id === 'oximetro'))
  assert.ok(accionesDelCaso(tum).some((a) => a.id === 'pulso'))
})

test('la corrección compara contra el estado real y avisa si no se exploró', () => {
  const real = { avdi: 'V', glasgow: 'O3V4M6' }
  const bien = calificarConciencia({ avdi: 'V', o: 3, v: 4, m: 6 }, real, {}, ['observar', 'voz'])
  assert.equal(bien.todoBien, true)
  assert.equal(bien.total, 13)
  const mal = calificarConciencia({ avdi: 'A', o: 4, v: 4, m: 6 }, real, {}, [])
  assert.equal(mal.todoBien, false)
  assert.equal(mal.avdi.real, 'V')
  assert.equal(mal.componentes.o.ok, false)
  assert.ok(mal.avisos.length >= 2, 'no observó ni le habló')
  // Pediátrico: solo AVDI.
  const nino = calificarConciencia({ avdi: 'V' }, { avdi: 'V' }, { paciente: 'nino' }, ['observar', 'voz'])
  assert.equal(nino.conGlasgow, false)
  assert.equal(nino.todoBien, true)
})

test('todo caso de PTEM declara quién atiende y a quién', () => {
  for (const c of CASOS) {
    assert.ok(['lego', 'tum'].includes(c.rol), `${c.id}: falta rol`)
    assert.ok(['adulto', 'nino', 'lactante'].includes(c.paciente), `${c.id}: falta paciente`)
  }
})

test('ningún momento de un caso regala lo que se debe explorar', () => {
  // Lo que se obtiene explorando no puede venir escrito en el texto del momento.
  const fuga = /\b(pulso|respira\w*|boque\w*|no responde|pálid\w*|sudoros\w*|cianót\w*|pupila\w*|spo2|saturaci\w*|mmhg|lpm|glucemia|mg\/dl)\b/i
  for (const c of CASOS) {
    for (const [id, n] of Object.entries(c.nodos)) {
      if (n.fin) continue // el desenlace sí puede contar cómo acabó
      assert.doesNotMatch(n.texto, fuga, `${c.id}/${id}: «${n.texto}»`)
    }
  }
})

test('el paciente sigue cambiando: cada momento de decisión mueve algún signo', () => {
  for (const c of CASOS) {
    const llega = new Map()
    for (const n of Object.values(c.nodos)) for (const o of n.opciones || []) {
      if (o.signos && Object.keys(o.signos).length) llega.set(o.va, true)
    }
    for (const [id, n] of Object.entries(c.nodos)) {
      // Un momento puede no cambiar nada si el caso dice por qué (p. ej., sigue en paro).
      if (id === c.inicio || n.fin || n.sinCambio) continue
      assert.ok((n.signos && Object.keys(n.signos).length) || llega.get(id),
        `${c.id}/${id}: llegar aquí no cambia ningún signo`)
    }
  }
})

// ---------- Instrumentos del monitor (07-10-2026) ----------

test('pulso: unos segundos dicen si hay pulso; contarlo pide 1 minuto', () => {
  const s = { avdi: 'A', fc: 112 }
  const corto = explorar('pulso', s, {}, {}, { segundos: 10 })
  assert.match(corto.texto, /Hay pulso/)
  assert.deepEqual(corto.medidos, { fc: 'presente' }, 'a los 10 s no se sabe la frecuencia')
  const minuto = explorar('pulso', s, {}, {}, { segundos: 60 })
  assert.deepEqual(minuto.medidos, { fc: 112 })
  assert.match(explorar('pulso', { fc: 'sin pulso' }, {}, {}, { segundos: 10 }).texto, /No encuentras pulso/)
})

test('respiración: unos segundos dicen si respira; contarla pide 30 s (el lego solo ve si respira)', () => {
  const s = { avdi: 'A', fr: 28 }
  assert.deepEqual(explorar('respiracion', s, { rol: 'tum' }, {}, { segundos: 8 }).medidos, { fr: 'respira' })
  assert.deepEqual(explorar('respiracion', s, { rol: 'tum' }, {}, { segundos: 30 }).medidos, { fr: 28 })
  assert.deepEqual(explorar('respiracion', s, { rol: 'lego' }, {}, { segundos: 10 }).medidos, { fr: 'respira' })
  assert.deepEqual(explorar('respiracion', { fr: 0 }, { rol: 'tum' }, {}, { segundos: 8 }).medidos, { fr: 'no respira' })
})

test('cada recuadro medible tiene su instrumento con un gesto válido', async () => {
  const { ACCIONES } = await import('../src/lib/exploracion.js')
  const modos = new Set(['clic', 'espera', 'sostener', 'inflar'])
  for (const a of ACCIONES.filter((x) => x.instrumento)) {
    const i = a.instrumento
    assert.ok(modos.has(i.modo), a.id)
    assert.ok(i.ayuda, `${a.id}: falta la ayuda`)
    assert.ok(a.revela.includes(i.clave), `${a.id}: su recuadro no es lo que mide`)
    if (i.modo === 'sostener') assert.ok(i.minimo > 0 && i.completo >= i.minimo, a.id)
    if (i.modo === 'espera' || i.modo === 'inflar') assert.ok(i.espera > 0, a.id)
  }
  const pulso = ACCIONES.find((a) => a.id === 'pulso').instrumento
  assert.equal(pulso.completo, 60, 'el pulso se cuenta durante 1 minuto')
  const pupilas = ACCIONES.find((a) => a.id === 'pupilas').instrumento
  assert.ok(pupilas.minimo >= 3 && pupilas.completo <= 5, 'pupilas: 3 a 5 s')
})

test('AVDI y Glasgow se valoran por separado desde su recuadro', () => {
  const real = { avdi: 'V', glasgow: 'O3V4M6' }
  const soloAvdi = calificarConciencia({ avdi: 'V' }, real, {}, ['observar', 'voz'], 'avdi')
  assert.equal(soloAvdi.todoBien, true)
  assert.equal(soloAvdi.conGlasgow, false)
  const soloGcs = calificarConciencia({ o: 3, v: 4, m: 5 }, real, {}, ['observar', 'voz', 'dolor'], 'glasgow')
  assert.equal(soloGcs.avdi, null)
  assert.equal(soloGcs.componentes.m.ok, false)
  assert.equal(soloGcs.todoBien, false)
})
