// ============================================================
//  Módulo 5, lote A — controles editoriales del lote
// ------------------------------------------------------------
//  Los ocho controles que `docs/archivo/GUIA-REDACCION-M5-LOTE-A.md` exige para las 33
//  lecciones nuevas, más los del contrato de contenido:
//
//   1. existen exactamente los 33 ids y cada uno tiene actividad;
//   2. ninguna lección cita PHTLS 10 ni una copia no citable;
//   3. toda cita de PHTLS del lote declara edición, capítulo y página;
//   4. neumotórax abierto: nada de apósito de tres lados como regla universal,
//      y sí vigilancia con aflojamiento o retirada si empeora la respiración;
//   5. cinemática: el mecanismo no se convierte en diagnóstico;
//   6. torniquete: ni aflojamiento periódico ni tiempo máximo universal;
//   7. TCE y tórax: tríada de Beck, intervalo lúcido y signos de fractura no
//      son requisitos obligatorios;
//   8. no aparecen dosis, volúmenes, calibres ni competencias inventadas.
//
//  El corpus se compara NORMALIZADO: minúsculas y sin acentos. Los patrones se
//  escriben igual, o no disparan nunca.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { todosLosTemas } from '../src/data/index.js'
import { estadoEditorialDe, muestraContenido } from '../src/lib/estadoEditorial.js'
import { textoDeTema, normalizar } from '../src/lib/auditoriaClinica.js'

const conMaterial = todosLosTemas.filter((t) => muestraContenido(estadoEditorialDe(t)))
const temaDe = (id) => todosLosTemas.find((t) => t.id === id)
const texto = (id) => {
  const t = conMaterial.find((x) => x.id === id)
  return t ? normalizar(textoDeTema(t)) : null
}

// Lo que el tema AFIRMA: deja fuera los distractores del quiz, que existen para
// enunciar lo incorrecto.
function loQueAfirma(tema) {
  const correctas = (tema.quiz || []).flatMap((q) => {
    const idx = Array.isArray(q.correcta) ? q.correcta : [q.correcta]
    return [...idx.map((i) => q.opciones?.[i] || ''), q.explicacion || '']
  })
  return normalizar([textoDeTema(tema, { conQuiz: false }), ...correctas].join(' \n '))
}

const corpus = conMaterial.map((t) => ({ id: t.id, texto: loQueAfirma(t) }))
function ningunTemaDice(patron, mensaje) {
  const culpables = corpus.filter((t) => patron.test(t.texto)).map((t) => t.id)
  assert.deepEqual(culpables, [], `${mensaje} Aparece en: ${culpables.join(', ')}`)
}

const tieneActividad = (t) => {
  const a = t?.actividades
  return Boolean(a && (a.ordenar || (a.completar || []).length || (a.preguntas || []).length))
}
const fuentesDe = (tema) => (tema.secciones || [])
  .flatMap((s) => s.bloques || [])
  .filter((b) => b.tipo === 'fuentes')
  .flatMap((b) => b.items || [])

// Los 33 ids exigidos por la guía, en su orden curricular.
const LOTE_A = [
  'm5-cin-definicion', 'm5-cin-energia-cinetica', 'm5-cin-energia-potencial',
  'm5-cin-abierto-cerrado', 'm5-cin-cavitacion', 'm5-cin-arma-blanca-fuego',
  'm5-cin-triada-wadell', 'm5-cin-desaceleracion', 'm5-cin-vehiculo-automotor',
  'm5-cin-motocicleta', 'm5-cin-explosiones',
  'm5-hs-tipos-hemorragias', 'm5-hs-control-hemorragias', 'm5-hs-torniquete',
  'm5-hs-definicion-tipos-shock', 'm5-hs-fisiopatologia',
  'm5-tt-clasificacion', 'm5-tt-traquea-laringe', 'm5-tt-costilla',
  'm5-tt-torax-inestable', 'm5-tt-neumotorax-simple', 'm5-tt-neumotorax-abierto',
  'm5-tt-hemotorax', 'm5-tt-traqueo-bronquial', 'm5-tt-disrupcion-aortica',
  'm5-tt-taponamiento', 'm5-tt-contusion-miocardica',
  'm5-ta-abdomen-agudo',
  'm5-tcc-definicion', 'm5-tcc-kellie-monroe', 'm5-tcc-fractura-craneo',
  'm5-tcc-escalpe', 'm5-tcc-lesiones-focales',
]

// ---------- 1. los 33 ids, con actividad y con contrato de contenido ----------

test('lote A: los 33 temas están redactados y cada uno tiene actividad', () => {
  assert.equal(new Set(LOTE_A).size, 33, 'La lista del lote A dejó de tener 33 ids únicos.')
  const sinMaterial = LOTE_A.filter((id) => !texto(id))
  assert.deepEqual(sinMaterial, [], 'Estas lecciones del lote A no tienen material.')
  const sinActividad = LOTE_A.map(temaDe).filter((t) => t && !tieneActividad(t)).map((t) => t.id)
  assert.deepEqual(sinActividad, [], 'Estas lecciones del lote A nacieron sin actividad.')
})

test('lote A: cada lección cumple el contrato mínimo de contenido', () => {
  for (const id of LOTE_A) {
    const t = temaDe(id)
    assert.ok(t, `${id} no existe en el temario.`)
    assert.ok(t.resumen, `${id} no tiene resumen.`)
    assert.ok((t.objetivos || []).length >= 2, `${id} tiene menos de 2 objetivos.`)
    assert.ok((t.secciones || []).length >= 2, `${id} tiene menos de 2 secciones.`)
    assert.ok((t.conceptosClave || []).length >= 3, `${id} tiene menos de 3 conceptos clave.`)
    assert.ok((t.flashcards || []).length >= 3, `${id} tiene menos de 3 tarjetas.`)
    assert.ok((t.quiz || []).length >= 3, `${id} tiene menos de 3 preguntas de quiz.`)
    assert.ok(fuentesDe(t).length > 0, `${id} no declara bloque de fuentes.`)
  }
})

test('lote A: ninguna lección queda validada ni publicada', () => {
  const indebidos = LOTE_A
    .map(temaDe)
    .filter((t) => !['borrador', 'en_revision'].includes(t.revision?.estado))
    .map((t) => `${t.id}: ${t.revision?.estado}`)
  assert.deepEqual(indebidos, [], 'Una lección del lote A salió de borrador o en revisión.')
})

test('lote A: ninguna actividad repite literalmente una pregunta de su quiz', () => {
  const repetidas = []
  for (const id of LOTE_A) {
    const tema = temaDe(id)
    const enQuiz = new Set((tema.quiz || []).map((q) => normalizar(q.pregunta || '')))
    for (const q of tema.actividades?.preguntas || []) {
      if (enQuiz.has(normalizar(q.pregunta || ''))) repetidas.push(`${id}: ${q.pregunta}`)
    }
  }
  assert.deepEqual(repetidas, [])
})

// ---------- 2 y 3. bibliografía ----------

test('lote A: no se cita PHTLS 10 ni una copia de Drive como fuente', () => {
  // Nombrar la 10.ª edición en la NOTA para declarar que NO se cita es lo
  // contrario de citarla: el control mira el NOMBRE de la fuente y su enlace.
  const culpables = []
  for (const tema of todosLosTemas) {
    for (const f of fuentesDe(tema)) {
      const nombre = f.nombre || ''
      if (/PHTLS/i.test(nombre) && /10\.?[aª]?\s*(ed|edici)/i.test(nombre)) {
        culpables.push(`${tema.id}: ${nombre}`)
      }
      if (/drive\.google\.com/i.test(f.url || '')) culpables.push(`${tema.id}: copia de Drive`)
    }
  }
  assert.deepEqual(culpables, [], 'Hay una cita de PHTLS 10 o de una copia de Drive.')
})

test('lote A: toda cita de PHTLS declara edición, capítulo y página impresa', () => {
  for (const id of LOTE_A) {
    const items = fuentesDe(temaDe(id)).filter((f) => /PHTLS/i.test(f.nombre || ''))
    assert.ok(items.length > 0, `${id} no cita la base curricular PHTLS.`)
    for (const f of items) {
      assert.match(f.nombre, /9\.?[aª]\s*ed/i, `${id} cita PHTLS sin declarar la 9.ª edición.`)
      assert.match(f.nombre, /cap\.\s*\d+/i, `${id} cita PHTLS sin declarar el capítulo.`)
      assert.match(f.nombre, /pp?\.\s*\d+/i, `${id} cita PHTLS sin declarar la página impresa.`)
    }
  }
})

// ---------- 4. neumotórax abierto: AHA 2024 ----------

test('neumotórax abierto: el apósito de tres lados no es la regla universal', () => {
  const t = texto('m5-tt-neumotorax-abierto')
  assert.ok(t, 'El tema de neumotórax abierto debe estar redactado.')
  assert.match(t, /no oclusiv/, 'Falta contemplar el apósito limpio y seco NO oclusivo.')
  assert.match(t, /ventilad/, 'Falta contemplar el sello torácico ventilado.')
  assert.match(t, /aflojar|retirar/, 'Falta aflojar o retirar si empeora la respiración.')
  assert.match(t, /2024/, 'Falta atribuir la actualización a la guía de 2024.')
  // Si menciona la conducta histórica, tiene que marcarla como tal.
  if (/tres lados/.test(t)) {
    assert.match(
      t, /no se ensena|regla universal|antecedente|historic/,
      'El apósito de tres lados aparece sin declararse antecedente histórico.'
    )
  }
  ningunTemaDice(
    /sellar (siempre )?la herida toracica|apsito oclusivo en todos los casos/,
    'La oclusión sistemática de la herida torácica no puede enseñarse.'
  )
})

// ---------- 5. cinemática: mecanismo ≠ diagnóstico ----------

test('cinemática: el mecanismo orienta la sospecha y nunca diagnostica', () => {
  for (const id of LOTE_A.filter((x) => x.startsWith('m5-cin-'))) {
    assert.ok(texto(id), `${id} debe estar redactado.`)
  }
  const base = texto('m5-cin-definicion')
  assert.match(base, /no diagnostica/, 'Falta declarar que el mecanismo no diagnostica.')
  assert.match(base, /sospecha/, 'Falta el papel del mecanismo sobre la sospecha.')
  ningunTemaDice(
    /el mecanismo (confirma|diagnostica)/,
    'El mecanismo no confirma ni diagnostica una lesión.'
  )
  ningunTemaDice(
    /volante deformado,? (luego|significa|equivale)/,
    'Prohibida la equivalencia determinista entre hallazgo del vehículo y lesión.'
  )
})

test('tríada de Waddell: grafía corregida, epónimo sin atribuir y sin valor diagnóstico', () => {
  const tema = temaDe('m5-cin-triada-wadell')
  const t = texto('m5-cin-triada-wadell')
  assert.ok(t, 'El tema de la tríada debe estar redactado.')
  assert.match(tema.tituloVisible || '', /Waddell/, 'El título visible debe mostrar «Waddell».')
  assert.match(tema.tituloOficial || '', /Wadell/, 'El título oficial debe conservar la errata del plan.')
  assert.match(
    t, /no se le atribuye|denominacion de uso extendido|no se atribuye/,
    'Falta declarar que el epónimo no se atribuye a una fuente concreta.'
  )
  assert.match(t, /heuristica/, 'La tríada debe presentarse como heurística de búsqueda.')
  // Y la ficha editorial deja registrada la deuda del epónimo.
  const obs = (tema.revision?.observaciones || []).join(' ').toLowerCase()
  assert.match(obs, /deuda|pendiente|no se localiz/, 'La deuda del epónimo no está registrada en la ficha.')
})

// ---------- 6. torniquete ----------

test('torniquete: sin aflojamiento periódico, sin tiempo máximo universal', () => {
  const t = texto('m5-hs-torniquete')
  assert.ok(t, 'El tema del torniquete debe estar redactado.')
  assert.match(t, /no se afloja/, 'Falta declarar que no se afloja periódicamente.')
  assert.match(
    t, /no existe una cifra unica|tiempo maximo universal/,
    'Falta retirar el tiempo máximo universal.'
  )
  assert.match(t, /hora de colocacion/, 'Falta el registro de la hora de colocación.')
  assert.match(t, /mordedura de serpiente/, 'Falta declarar que no se usa en mordedura de serpiente.')
  ningunTemaDice(/aflojar el torniquete cada/, 'Prohibido el aflojamiento periódico del torniquete.')
  ningunTemaDice(/aflojarlo cada \d/, 'Prohibido el aflojamiento periódico del torniquete.')
})

// ---------- 7. signos clásicos que no son requisitos ----------

test('taponamiento: la tríada de Beck no se exige completa', () => {
  const t = texto('m5-tt-taponamiento')
  assert.ok(t, 'El tema de taponamiento debe estar redactado.')
  assert.match(
    t, /rara vez esta completa|no es un requisito/,
    'La tríada de Beck no puede exigirse como requisito.'
  )
  ningunTemaDice(
    /pericardiocentesis (de campo|en la escena) esta indicada/,
    'La pericardiocentesis de campo no es una conducta prehospitalaria universal.'
  )
})

test('TCE: intervalo lúcido y signos de fractura no son requisitos ni diagnósticos', () => {
  const focales = texto('m5-tcc-lesiones-focales')
  assert.ok(focales, 'El tema de lesiones focales debe estar redactado.')
  assert.match(focales, /intervalo lucido/, 'Falta tratar el intervalo lúcido.')
  assert.match(
    focales, /no es exclusivo|no esta presente en todos|no identifica/,
    'El intervalo lúcido no puede presentarse como marca segura del hematoma epidural.'
  )
  const fractura = texto('m5-tcc-fractura-craneo')
  assert.ok(fractura, 'El tema de fractura de cráneo debe estar redactado.')
  assert.match(
    fractura, /no descarta|pueden faltar|tardan horas/,
    'Los signos de fractura de base deben declararse posiblemente ausentes o tardíos.'
  )
  assert.match(fractura, /no se tapona|sin comprimir/, 'Falta la prohibición de ocluir el drenaje.')
  ningunTemaDice(
    /el intervalo lucido (indica|significa|confirma)/,
    'El intervalo lúcido no confirma un hematoma epidural.'
  )
})

test('Monro-Kellie: grafía corregida y errata documental conservada', () => {
  const tema = temaDe('m5-tcc-kellie-monroe')
  const t = texto('m5-tcc-kellie-monroe')
  assert.ok(t, 'El tema debe estar redactado.')
  assert.match(tema.tituloVisible || '', /Monro-Kellie/, 'El título visible debe mostrar «Monro-Kellie».')
  assert.match(tema.tituloOficial || '', /Kellie Monroe/, 'El título oficial debe conservar la errata.')
  assert.match(t, /encefalo/, 'Falta el encéfalo entre los tres componentes.')
  assert.match(t, /liquido cefalorraquideo/, 'Falta el LCR entre los tres componentes.')
})

// ---------- 8. sin cifras ni competencias inventadas ----------

test('lote A: no se publican dosis, volúmenes, calibres ni umbrales', () => {
  const CIFRA = /\b\d+([.,]\d+)?\s*(mg|mcg|µg|ml|l\/min|litros|joules?|fr|mmhg|mm hg)\b/i
  const culpables = LOTE_A.filter((id) => {
    const tema = conMaterial.find((x) => x.id === id)
    return tema && CIFRA.test(loQueAfirma(tema))
  })
  assert.deepEqual(culpables, [], 'Hay una cifra terapéutica publicada en el lote A.')
})

test('lote A: los procedimientos reglados quedan sujetos a alcance y protocolo', () => {
  const SUJETOS = {
    'm5-tt-taponamiento': /pericardiocentesis/,
    'm5-tt-neumotorax-simple': /no se descomprime|no aporta beneficio/,
    'm5-tt-traquea-laringe': /competencia|direccion medica|protocolo/,
    'm5-cin-motocicleta': /entrenamiento|protocolo/,
    'm5-hs-control-hemorragias': /protocolo/,
    'm5-hs-torniquete': /protocolo/,
    'm5-ta-abdomen-agudo': /protocolo/,
    'm5-tcc-definicion': /protocolo/,
  }
  for (const [id, patron] of Object.entries(SUJETOS)) {
    const t = texto(id)
    assert.ok(t, `${id} debe estar redactado.`)
    assert.match(t, patron, `${id} no declara la sujeción a alcance o protocolo.`)
  }
})

test('lote A: el empaquetamiento no se enseña en tórax, abdomen ni cuello', () => {
  const t = texto('m5-hs-control-hemorragias')
  assert.ok(t, 'El tema de control de hemorragias debe estar redactado.')
  assert.match(t, /no se empaquetan/, 'Falta la prohibición de empaquetar tórax, abdomen y cuello.')
  assert.match(t, /a ciegas/, 'Falta la prohibición de empaquetar a ciegas.')
})
