// ============================================================
//  Regresión clínica — las correcciones que no pueden volver atrás
// ------------------------------------------------------------
//  Cada prueba de este archivo corresponde a un error CONFIRMADO por la
//  auditoría con potencial de daño. No comprueban que el tema sea bueno:
//  comprueban que el error concreto no ha vuelto.
//
//  Dos formas, según el caso:
//   · PROHIBICIÓN — la afirmación equivocada no aparece en NINGÚN tema que se
//     enseñe, esté escrito o no. Sobrevive a la reescritura del tema.
//   · EXIGENCIA — si el tema ya tiene material, tiene que decir lo correcto.
//     Mientras esté vacío la prueba no falla, pero en cuanto se redacte, sí.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { todosLosTemas } from '../src/data/index.js'
import { estadoEditorialDe, muestraContenido } from '../src/lib/estadoEditorial.js'
import { textoDeTema, normalizar, frases } from '../src/lib/auditoriaClinica.js'

const conMaterial = todosLosTemas.filter((t) => muestraContenido(estadoEditorialDe(t)))
const texto = (id) => {
  const t = conMaterial.find((x) => x.id === id)
  return t ? normalizar(textoDeTema(t)) : null
}

// Lo que el temario AFIRMA: lección, conceptos, tarjetas, respuestas correctas
// y explicaciones. Deja fuera los distractores del quiz, que existen
// precisamente para enunciar lo incorrecto — prohibirlos ahí impediría
// preguntar por el error que se quiere desterrar.
function loQueAfirma(tema) {
  const correctas = (tema.quiz || []).flatMap((q) => {
    const idx = Array.isArray(q.correcta) ? q.correcta : [q.correcta]
    return [...idx.map((i) => q.opciones?.[i] || ''), q.explicacion || '']
  })
  return normalizar([textoDeTema(tema, { conQuiz: false }), ...correctas].join(' \n '))
}

const corpus = conMaterial.map((t) => ({ id: t.id, texto: loQueAfirma(t) }))

function ningunTemaDice(patron, motivo) {
  const culpables = corpus.filter((t) => patron.test(t.texto)).map((t) => t.id)
  assert.deepEqual(culpables, [], motivo)
}

// ---------- 1. Atropina en bradicardia (AHA 2025: 1 mg) ----------

test('atropina: 0.5 mg NO se enseña para bradicardia sintomática del adulto', () => {
  // Se busca la cifra y la indicación en la misma frase: 0.5 mg es una dosis
  // legítima en otras indicaciones, y prohibirla en bloque sería falso.
  for (const { id, texto: t } of corpus) {
    for (const frase of frases(t)) {
      if (!frase.includes('atropina') || !frase.includes('bradicardia')) continue
      assert.doesNotMatch(
        frase, /0[.,]5\s*mg/,
        `${id} enseña atropina 0.5 mg en bradicardia; el algoritmo AHA 2025 usa 1 mg.`
      )
    }
  }
})

test('atropina: si un tema la enseña en bradicardia, usa 1 mg con su techo', () => {
  for (const { id, texto: t } of corpus) {
    if (!/atropina/.test(t) || !/bradicardia/.test(t)) continue
    assert.match(t, /1\s*mg/, `${id} habla de atropina en bradicardia sin declarar 1 mg.`)
    assert.match(t, /3\s*mg/, `${id} no declara la dosis máxima acumulada de 3 mg.`)
  }
})

// ---------- 2. OVACE (AHA 2025: 5 golpes dorsales + 5 compresiones) ----------

test('OVACE adulto: se enseña el ciclo de 5 golpes dorsales y 5 compresiones', () => {
  const t = texto('m1-pab-ovace-adultos')
  assert.ok(t, 'El tema de OVACE en adultos debe seguir teniendo material.')
  assert.match(t, /5 golpes/, 'Falta el ciclo de golpes dorsales del algoritmo AHA 2025.')
  assert.match(t, /5 compresiones abdominales/, 'Falta el bloque de compresiones abdominales.')
  assert.match(t, /torácicas|toracicas/, 'Falta la alternativa torácica (embarazo avanzado u obesidad).')
})

test('OVACE pediátrico: el lactante no recibe compresiones abdominales', () => {
  const t = texto('m1-pai-ovace-pediatrico')
  assert.ok(t)
  assert.match(t, /no se hacen compresiones abdominales en el lactante/i)
  assert.match(t, /5 golpes/, 'El niño mayor de un año también entra en ciclo de 5 y 5.')
})

test('OVACE pediátrico: la lección distingue las tres situaciones del algoritmo', () => {
  const t = texto('m1-pai-ovace-pediatrico')
  assert.match(t, /compresiones toracicas|compresiones torácicas/, 'Falta el ciclo del lactante.')
  assert.match(t, /compresiones abdominales/, 'Falta el ciclo del niño mayor de un año.')
  assert.match(t, /pierde la respuesta|deje de responder/, 'Falta la pérdida de respuesta.')
  assert.match(t, /solo si (se ve|es visible)|unicamente si se ve/, 'Falta la retirada del objeto solo si es visible.')
})

test('OVACE pediátrico: se respalda con la guía PEDIÁTRICA, no con la de adulto', () => {
  const tema = todosLosTemas.find((x) => x.id === 'm1-pai-ovace-pediatrico')
  const fuentes = (tema.secciones || [])
    .flatMap((s) => s.bloques || [])
    .filter((b) => b.tipo === 'fuentes')
    .flatMap((b) => b.items || [])
  assert.ok(fuentes.length > 0, 'El tema pediátrico debe declarar sus fuentes.')
  assert.ok(
    fuentes.some((f) => /Pediatric Basic Life Support/i.test(f.nombre)),
    'Falta la guía AHA/AAP Pediatric Basic Life Support 2025 como fuente primaria.'
  )
  assert.ok(
    fuentes.some((f) => /American Academy of Pediatrics/i.test(f.nombre)),
    'Falta la autoría de la Academia Americana de Pediatría.'
  )
  const adultoComoRespaldo = fuentes.filter((f) => /Adult (Basic Life Support|Foreign-Body)/i.test(f.nombre))
  assert.deepEqual(
    adultoComoRespaldo.map((f) => f.nombre), [],
    'La conducta pediátrica no puede respaldarse con el algoritmo de adulto.'
  )
  assert.match(
    tema.revision?.versionClinica || '', /Pediatric/i,
    'La ficha editorial debe declarar la versión clínica pediátrica.'
  )
})

// ---------- fundamentación médico-legal ----------

test('médico-legal: cada bloque se apoya en su instrumento, no solo en la NOM-034', () => {
  const tema = todosLosTemas.find((x) => x.id === 'm1-smu-medico-legales')
  const nombres = (tema.secciones || [])
    .flatMap((s) => s.bloques || [])
    .filter((b) => b.tipo === 'fuentes')
    .flatMap((b) => b.items || [])
    .map((f) => f.nombre)
  assert.ok(nombres.length >= 4, 'La NOM-034 sola no sostiene este tema.')
  for (const [etiqueta, patron] of [
    ['consentimiento', /Ley General de Salud/i],
    ['expediente clínico', /NOM-004-SSA3-2012/i],
    ['datos personales', /Protección de Datos Personales/i],
    ['cadena de custodia', /Código Nacional de Procedimientos Penales/i],
  ]) {
    assert.ok(nombres.some((n) => patron.test(n)), `Falta la fuente de ${etiqueta}.`)
  }
})

test('médico-legal: lo que depende de la entidad no se enuncia como regla nacional', () => {
  const t = texto('m1-smu-medico-legales')
  assert.ok(t)
  assert.match(t, /depende(n)? de la entidad|entidad federativa/, 'Falta la acotación territorial.')
  assert.match(t, /procedimiento (escrito )?de tu (academia|servicio)|procedimiento del servicio/,
    'Falta remitir al procedimiento del servicio.')
  // Y la ficha tiene que registrar el bloqueo parcial en vez de disimularlo.
  const obs = (todosLosTemas.find((x) => x.id === 'm1-smu-medico-legales').revision?.observaciones || []).join(' ')
  assert.match(obs, /BLOQUEO PARCIAL/, 'La deuda con la academia debe quedar registrada.')
})

test('OVACE: enseñar compresiones abdominales obliga a enseñar los golpes dorsales', () => {
  // Formulado como coherencia y no como prohibición de la frase: describir la
  // práctica anterior para contrastarla es legítimo (y útil); lo que no puede
  // pasar es que un tema explique la compresión abdominal como si fuera la
  // secuencia completa.
  const culpables = corpus
    .filter(({ texto: t }) => /compresiones abdominales/.test(t) && /ovace|obstrucci[oó]n|atragant/.test(t))
    .filter(({ texto: t }) => !/golpes (dorsales|en la espalda|interescapulares)/.test(t))
    .map((t) => t.id)
  assert.deepEqual(culpables, [], 'Falta el ciclo de golpes dorsales del algoritmo AHA 2025.')
})

// ---------- 3. Parkland vs ABA 2024 ----------

test('Parkland: si el tema está escrito, compara la fórmula clásica con ABA 2024', () => {
  const t = texto('m5-que-parkland')
  if (!t) return // aún vacío: la exigencia entra en vigor al redactarlo
  assert.match(t, /4\s*ml/, 'Falta la fórmula clásica que el plan oficial pide enseñar.')
  assert.match(t, /2\s*ml/, 'Falta la recomendación ABA 2024 de iniciar en 2 mL/kg/%SCQ.')
  assert.match(t, /american burn association|aba/, 'Falta la atribución de la recomendación actual.')
  assert.match(t, /titul|respuesta|diuresis/, 'Parkland no puede presentarse como dosis fija.')
})

test('Parkland: ningún tema mezcla la fórmula de Winter ni la brecha aniónica', () => {
  const t = texto('m5-que-parkland')
  if (!t) return
  assert.doesNotMatch(t, /winter/, 'La fórmula de Winter no pertenece a esta lección.')
  assert.doesNotMatch(t, /brecha ani[oó]nica|anion gap/, 'Lo ácido-base no pertenece a esta lección.')
})

// ---------- 4. Osteólisis → acceso intraóseo ----------

test('«osteólisis» no se enseña como procedimiento de acceso vascular', () => {
  for (const { id, texto: t } of corpus) {
    for (const frase of frases(t)) {
      if (!/osteolisis/.test(frase)) continue
      // La comprobación es «ninguna frase presenta la osteólisis COMO el
      // procedimiento». Se aceptan las que la niegan o la explican: incluidos
      // los títulos de recuadro, que `textoDeTema` aplana como frase suelta.
      assert.match(
        frase, /errata|documental|destrucci[oó]n|resorci[oó]n|no debe|no es|no designa|t[eé]rmino/,
        `${id} usa «osteólisis» como procedimiento; el término es osteoclisis o acceso intraóseo.`
      )
    }
  }
})

test('los temas de acceso vascular óseo se muestran con el nombre correcto', () => {
  for (const id of ['m3-vi-osteolisis', 'm6-tp-osteolisis']) {
    const tema = todosLosTemas.find((t) => t.id === id)
    assert.match(tema.tituloVisible || '', /intra[oó]seo/, `${id} sigue titulándose «Osteólisis».`)
    assert.equal(tema.tituloOficial, tema.titulo, 'El título documental debe conservarse.')
  }
})

// ---------- 5. Obturador esofágico ----------

test('obturador esofágico: si se enseña, se identifica como dispositivo histórico', () => {
  const t = texto('m3-va-obturador-esofagico')
  if (!t) return
  assert.match(
    t, /hist[oó]ric|en desuso|ya no|no se considera est[aá]ndar/,
    'El obturador esofágico no puede presentarse como dispositivo estándar actual.'
  )
})

// ---------- 6. dosis sin contexto ----------

test('ninguna dosis se presenta como universal sin población ni indicación', () => {
  const UNIVERSAL = /(la dosis es|se administran? siempre|dosis única para todos)/
  ningunTemaDice(UNIVERSAL, 'Hay una dosis presentada como regla universal.')
})

// ---------- 7. absolutos que la auditoría marcó ----------

// ---------- 8. fuentes: la portada de PHTLS no respalda nada ----------

test('ningún tema cita la portada de PHTLS como fuente, en ningún estado', () => {
  // Los 33 borradores del Módulo 5 compartían esta única referencia: la página
  // de inicio de PHTLS en NAEMT, sin edición, capítulo ni página. El control
  // §12.8 solo actúa desde «en revisión», así que un borrador podía
  // conservarla indefinidamente. Esta prueba la prohíbe en todo el temario.
  const culpables = []
  for (const tema of todosLosTemas) {
    for (const sec of tema.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b.tipo !== 'fuentes') continue
        for (const it of b.items || []) {
          if (/naemt\.org\/education\/phtls\/?$/i.test(it.url || '')) culpables.push(tema.id)
        }
      }
    }
  }
  assert.deepEqual([...new Set(culpables)], [])
})

test('donde se cita PHTLS se declara la edición y la deuda de página', () => {
  for (const tema of todosLosTemas) {
    const items = (tema.secciones || [])
      .flatMap((s) => s.bloques || [])
      .filter((b) => b.tipo === 'fuentes')
      .flatMap((b) => b.items || [])
      .filter((f) => /PHTLS/i.test(f.nombre || ''))
    for (const f of items) {
      assert.match(f.nombre, /\d\.?[ªa]\s*ed/i, `${tema.id} cita PHTLS sin declarar la edición.`)
      assert.match(
        `${f.nota || ''}`, /pendiente/i,
        `${tema.id} cita PHTLS sin declarar que capítulo y página siguen pendientes.`
      )
    }
  }
})

test('no reaparecen los absolutos que la auditoría pidió retirar', () => {
  // OJO: `corpus` está normalizado sin acentos. Escribir el patrón con tilde
  // —«lo único que sirve»— hacía que esta prueba no disparara nunca, y el
  // absoluto seguía vivo en la lección del DEA. Los patrones van sin acentos.
  ningunTemaDice(/lo unico que sirve/, 'Absoluto retirado por la auditoría.')
  ningunTemaDice(/lo unico que sostiene/, 'Absoluto retirado por la auditoría.')
  ningunTemaDice(/es lo que realmente mata/, 'Absoluto retirado por la auditoría.')
})

test('la prueba de absolutos compara contra texto sin acentos', () => {
  // Guarda del guarda: si alguien vuelve a escribir un patrón acentuado, esta
  // prueba lo delata en vez de dejar pasar la regresión en silencio.
  assert.match(normalizar('lo único que sirve'), /lo unico que sirve/)
  assert.doesNotMatch(normalizar('lo único que sirve'), /lo único que sirve/)
})

// ---------- 9. alcance jurídico: definir no es obligar ----------

test('urgencia: el artículo 72 no carga por sí solo con la obligación prehospitalaria', () => {
  // La versión anterior de la lección ponía en la misma celda «definición» y
  // «genera obligación de atención», y firmaba las dos con el artículo 72. La
  // definición está en el 72; el sujeto obligado prehospitalario lo declara el
  // campo de aplicación de la NOM-034. Son preguntas distintas.
  const t = texto('m4-epi-urgencia-emergencia')
  assert.ok(t, 'El tema de urgencia y emergencia debe estar redactado.')
  assert.match(t, /ambito de aplicacion/, 'Falta separar el ámbito de aplicación.')
  assert.match(t, /sujeto obligado/, 'Falta nombrar al sujeto obligado.')
  assert.match(t, /campo de aplicacion/, 'Falta el campo de aplicación de la NOM-034.')
  // Y la fuente tiene que traer los artículos que fijan ámbito y sujeto, no
  // solamente el que define.
  const nombres = (todosLosTemas.find((x) => x.id === 'm4-epi-urgencia-emergencia').secciones || [])
    .flatMap((s) => s.bloques || [])
    .filter((b) => b.tipo === 'fuentes')
    .flatMap((b) => b.items || [])
    .map((f) => `${f.nombre} ${f.nota || ''}`)
  assert.ok(
    nombres.some((n) => /art[íi]culos?\s+1o\./i.test(n) && /7o\./i.test(n)),
    'La fuente debe citar los artículos de ámbito, no solo el 72.'
  )
  assert.ok(
    nombres.some((n) => /NOM-034/i.test(n) && /numeral(es)? 2\b/i.test(n)),
    'Falta el numeral 2 de la NOM-034, que es el que nombra al sujeto obligado.'
  )
})

test('urgencia: «emergencia» y «urgencia sentida» no se presentan como conceptos formales', () => {
  const t = texto('m4-epi-urgencia-emergencia')
  assert.ok(t)
  assert.match(
    t, /ni la nom-034 las definen/,
    'La lección debe declarar que ninguna de las dos disposiciones las define.'
  )
  assert.match(
    t, /no tiene definicion normativa/,
    'La «urgencia sentida» debe declararse sin definición normativa.'
  )
})

// ---------- 10. farmacocinética: la vía IV no «se queda en el trayecto» ----------

test('la vía intravenosa no se enseña como una vía que falla por absorción', () => {
  ningunTemaDice(
    /se queda(n)? en el trayecto/,
    'Un fármaco intravenoso no se queda en el trayecto: esa vía omite la absorción.'
  )
  const t = texto('m4-far-generalidades')
  assert.ok(t, 'Generalidades de farmacología debe estar redactado.')
  assert.match(t, /omite la absorcion/, 'Falta decir que la vía intravenosa omite la absorción.')
  assert.match(
    t, /retrasar la distribucion|retrasar su distribucion|distribucion.{0,60}retras/,
    'Falta explicar que la hipoperfusión retrasa la distribución y el efecto.'
  )
})

test('margen terapéutico: se define como intervalo de concentraciones, no de dosis', () => {
  const t = texto('m4-far-generalidades')
  assert.ok(t)
  assert.match(t, /intervalo de concentraciones/, 'Falta definirlo como intervalo de concentraciones.')
  assert.match(t, /indice terapeutico/, 'Falta distinguirlo del índice terapéutico.')
  assert.match(
    t, /menos probable, no imposible/,
    'Debe declararse que dentro de la ventana el efecto adverso es menos probable, no imposible.'
  )
})

test('no reaparecen los dos absolutos del lote de farmacología', () => {
  ningunTemaDice(
    /no depende de la cantidad/,
    'La alergia se enseña como «una dosis pequeña no la descarta», no como independencia de la cantidad.'
  )
  ningunTemaDice(
    /es el unico control/,
    'La repetición de la orden es el primer eslabón de una cadena de controles, no el único.'
  )
})

// ---------- 11. NOM-034: el tema cumple su título curricular ----------

test('NOM-034: la lección presenta la dotación por tipo de unidad con su numeral', () => {
  // El plan titula el tema «Fármacos usados en el SMU según la NOM 034». Una
  // lección que solo explica que la norma no es un vademécum no cumple ese
  // título: la dotación es pública y verificable, y tiene que estar.
  const t = texto('m4-far-nom-034')
  assert.ok(t, 'El tema de la NOM-034 debe estar redactado.')
  for (const [etiqueta, patron] of [
    ['soluciones del apéndice A', /a\.4\.1/],
    ['medicamentos del apéndice B', /b\.4\.1\.1/],
    ['medicamentos del apéndice C', /c\.3\.1\.1/],
    ['medicamento del apéndice D', /d\.1\.1\.1/],
  ]) {
    assert.match(t, patron, `Falta la ${etiqueta}.`)
  }
  assert.match(t, /acumulativ/, 'Debe declararse que los apéndices son acumulativos.')
})

test('NOM-034: el proyecto de modificación no se presenta como reforma publicada', () => {
  const t = texto('m4-far-nom-034')
  assert.ok(t)
  assert.match(
    t, /un proyecto no es una reforma/,
    'La lección debe distinguir el proyecto normativo de una reforma publicada.'
  )
  ningunTemaDice(
    /(nueva|reformada|modificada) nom-034|nom-034 reformada/,
    'No hay ninguna modificación publicada de la NOM-034 al corte de agosto de 2026.'
  )
})

// ---------- 12. urgencias respiratorias ----------

const RESPIRATORIAS = [
  'm4-resp-exploracion-torax',
  'm4-resp-insuficiencia',
  'm4-resp-epoc',
  'm4-resp-edema-pulmon',
  'm4-resp-neumotorax-espontaneo',
  'm4-resp-tep',
  'm4-resp-neumonia-bronquitis',
  'm4-resp-asma',
]

test('la unidad de urgencias respiratorias está redactada completa', () => {
  const sinMaterial = RESPIRATORIAS.filter((id) => !texto(id))
  assert.deepEqual(sinMaterial, [], 'Estos temas respiratorios perdieron su material.')
})

test('respiratorias: ninguna lección publica un objetivo numérico de saturación', () => {
  // La deuda está DECLARADA en cada ficha: las guías asignadas no pudieron
  // consultarse en su texto. Mientras siga así, una cifra en la lección sería
  // recordada, no citada. Cuando la academia incorpore la cifra desde GOLD o
  // GINA con su sección, esta prueba se actualiza junto con la fuente.
  const CIFRA = /satura\w*[^.]{0,60}\d{2}\s*(%|por ciento)|\d{2}\s*(%|por ciento)[^.]{0,60}satura/
  const culpables = RESPIRATORIAS.filter((id) => CIFRA.test(texto(id) || ''))
  assert.deepEqual(culpables, [], 'Hay un objetivo de saturación sin fuente consultada.')
})

test('respiratorias: la guía de una entidad no respalda otra entidad', () => {
  // Nota expresa del registro académico para `m4-urgencias-respiratorias`:
  // «No usar una guía de una entidad para otra». Se comprueba sobre el bloque
  // de fuentes, que es donde la confusión tendría efecto.
  const GUIAS = {
    gina: /GINA/i,
    gold: /GOLD/i,
    insuficienciaCardiaca: /AHA\/ACC\/HFSA/i,
    pleural: /British Thoracic Society/i,
    tep: /ESC Guidelines/i,
    neumonia: /ATS\/IDSA/i,
  }
  const PERMITIDA = {
    'm4-resp-exploracion-torax': null,
    'm4-resp-insuficiencia': null,
    'm4-resp-epoc': 'gold',
    'm4-resp-edema-pulmon': 'insuficienciaCardiaca',
    'm4-resp-neumotorax-espontaneo': 'pleural',
    'm4-resp-tep': 'tep',
    'm4-resp-neumonia-bronquitis': 'neumonia',
    'm4-resp-asma': 'gina',
  }
  const invasiones = []
  for (const id of RESPIRATORIAS) {
    const tema = todosLosTemas.find((x) => x.id === id)
    const nombres = (tema.secciones || [])
      .flatMap((s) => s.bloques || [])
      .filter((b) => b.tipo === 'fuentes')
      .flatMap((b) => b.items || [])
      .map((f) => f.nombre || '')
    for (const [clave, patron] of Object.entries(GUIAS)) {
      if (clave === PERMITIDA[id]) continue
      if (nombres.some((n) => patron.test(n))) invasiones.push(`${id} cita ${clave}`)
    }
  }
  assert.deepEqual(invasiones, [])
})

test('respiratorias: cada tema con guía propia declara su deuda de sección', () => {
  // El control §12.8 de PHTLS tiene su equivalente aquí: si la guía rectora no
  // se ha podido abrir, la ficha lo dice y el tema no sube de borrador.
  const CON_GUIA = RESPIRATORIAS.filter((id) => id !== 'm4-resp-exploracion-torax' && id !== 'm4-resp-insuficiencia')
  for (const id of CON_GUIA) {
    const tema = todosLosTemas.find((x) => x.id === id)
    const obs = (tema.revision?.observaciones || []).join(' ')
    assert.match(obs, /deuda bibliogr[áa]fica declarada/i, `${id} no declara su deuda de sección.`)
    assert.equal(
      tema.revision?.estado, 'borrador',
      `${id} no puede pasar de borrador mientras su guía rectora no se haya consultado.`
    )
  }
})

// ---------- 14. Módulo 2: alcance, fuentes y actividades ----------

const MODULO_2 = [
  'm2-afe-celula', 'm2-afe-liquidos-electrolitos', 'm2-afe-electrofisiologia',
  'm2-afe-acido-base', 'm2-afe-metabolismo', 'm2-afe-tegumentario',
  'm2-afi-oseo', 'm2-afi-muscular', 'm2-afi-cardiovascular',
  'm2-afi-nervioso', 'm2-afi-digestivo', 'm2-afi-urinario',
  'm2-ao-hematopoyetico', 'm2-ao-linfatico-inmunitario', 'm2-ao-reproductor',
  'm2-ao-sentidos', 'm2-ao-endocrino',
]

const tieneActividad = (t) => {
  const a = t?.actividades
  return Boolean(a && (a.ordenar || (a.completar || []).length || (a.preguntas || []).length))
}

test('el Módulo 2 tiene sus 17 lecciones redactadas', () => {
  const sinMaterial = MODULO_2.filter((id) => !texto(id))
  assert.deepEqual(sinMaterial, [], 'Estas lecciones del Módulo 2 perdieron su material.')
})

test('ninguna lección cita Tortora, que no está en la biblioteca de la academia', () => {
  // El plan lo declara en su bibliografía, pero la carpeta de la academia NO lo
  // contiene. Citarlo —o atribuirle páginas de AAOS, Guyton o Moore— sería
  // fabricar una referencia. La prohibición vale para todo el temario.
  const culpables = []
  for (const tema of todosLosTemas) {
    for (const sec of tema.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b.tipo !== 'fuentes') continue
        for (const it of b.items || []) {
          if (/tortora/i.test(it.nombre || '')) culpables.push(tema.id)
        }
      }
    }
  }
  assert.deepEqual([...new Set(culpables)], [])
})

test('Módulo 2: donde se cita Moore, la página se declara PENDIENTE', () => {
  // La estructura por capítulos del archivo sí se verificó; la numeración
  // impresa no pudo comprobarse en la extracción. Mismo control que el de
  // PHTLS: una referencia sin localizador no puede fingir tenerlo.
  for (const tema of todosLosTemas) {
    const items = (tema.secciones || [])
      .flatMap((s) => s.bloques || [])
      .filter((b) => b.tipo === 'fuentes')
      .flatMap((b) => b.items || [])
      .filter((f) => /Moore/i.test(f.nombre || ''))
    for (const f of items) {
      assert.match(f.nombre, /7\.?[ªa]\s*ed/i, `${tema.id} cita Moore sin declarar la edición.`)
      assert.match(
        `${f.nota || ''}`, /pendiente/i,
        `${tema.id} cita Moore sin declarar que la página sigue pendiente.`
      )
    }
  }
})

test('Módulo 2: las lecciones enseñan estructura y función, no terapéutica', () => {
  // El mandato prohíbe adelantar aquí tratamientos, dosis y procedimientos.
  // Se comprueba sobre lo que la lección AFIRMA, no sobre los distractores.
  const PROHIBIDO = /\b(mg|mcg|ml\/h|dosis de|se administra|administrar el f[aá]rmaco)\b/
  const culpables = MODULO_2.filter((id) => {
    const tema = conMaterial.find((x) => x.id === id)
    return tema && PROHIBIDO.test(loQueAfirma(tema))
  })
  assert.deepEqual(culpables, [], 'Hay terapéutica en el Módulo 2, que solo enseña estructura y función.')
})

test('las 17 lecciones del Módulo 2 nacieron con actividad', () => {
  const sinActividad = MODULO_2
    .map((id) => todosLosTemas.find((t) => t.id === id))
    .filter((t) => t && !tieneActividad(t))
    .map((t) => t.id)
  assert.deepEqual(sinActividad, [])
})

test('la deuda de actividades del Módulo 3 quedó en cero', () => {
  // Los 17 ids que `docs/archivo/ESTADO-PRODUCCION-ACELERADA.md` enumeraba como deuda.
  const DEUDA_M3 = [
    'm3-ep-sss', 'm3-ep-avdi', 'm3-ep-respiracion', 'm3-ep-circulacion',
    'm3-ep-neurologica', 'm3-ep-exploracion-dirigida', 'm3-es-abcde',
    'm3-va-levantamiento-menton', 'm3-va-menton-inclinacion', 'm3-va-hojas-tubos',
    'm3-va-mascarilla-laringea', 'm3-va-obturador-esofagico', 'm3-va-dispositivos-o2',
    'm3-va-isr', 'm3-vi-ventajas-desventajas', 'm3-vi-cristaloides', 'm3-vi-osteolisis',
  ]
  const sinActividad = DEUDA_M3
    .map((id) => todosLosTemas.find((t) => t.id === id))
    .filter((t) => t && !tieneActividad(t))
    .map((t) => t.id)
  assert.deepEqual(sinActividad, [])
})

test('añadir la actividad no borró la lección que ya estaba redactada', () => {
  // `m3-actividades.js` aporta SOLO el campo `actividades`. Si la fusión por
  // campo se rompiera, estas lecciones perderían secciones, quiz o fuentes.
  for (const id of ['m3-va-mascarilla-laringea', 'm3-vi-cristaloides', 'm3-es-abcde']) {
    const tema = todosLosTemas.find((t) => t.id === id)
    assert.ok((tema.secciones || []).length >= 2, `${id} perdió sus secciones.`)
    assert.ok((tema.quiz || []).length >= 3, `${id} perdió su quiz.`)
    assert.ok((tema.secciones||[]).flatMap((x)=>x.bloques||[]).some((b)=>b.tipo==='fuentes'), `${id} perdió su bloque de fuentes.`)
    assert.equal(tema.revision?.estado, 'en_revision', `${id} perdió su estado editorial.`)
  }
})

test('ninguna actividad repite literalmente una pregunta del quiz de su lección', () => {
  const repetidas = []
  for (const tema of todosLosTemas) {
    const enQuiz = new Set((tema.quiz || []).map((q) => normalizar(q.pregunta || '')))
    for (const q of tema.actividades?.preguntas || []) {
      if (enQuiz.has(normalizar(q.pregunta || ''))) repetidas.push(`${tema.id}: ${q.pregunta}`)
    }
  }
  assert.deepEqual(repetidas, [])
})

// ---------- 13. urgencias gastrointestinales ----------

const GASTROINTESTINALES = [
  'm4-gi-exploracion-abdominal',
  'm4-gi-apendicitis',
  'm4-gi-pancreatitis',
  'm4-gi-gastritis-colitis',
  'm4-gi-colelitiasis',
  'm4-gi-deshidratacion',
  'm4-gi-oclusion-intestinal',
  'm4-gi-sangrado-tubo',
  'm4-gi-cirrosis-hepatitis',
]

test('la unidad gastrointestinal está redactada completa', () => {
  const sinMaterial = GASTROINTESTINALES.filter((id) => !texto(id))
  assert.deepEqual(sinMaterial, [], 'Estos temas gastrointestinales perdieron su material.')
})

test('ningún tema cita el «Manual de Urgencias Jiménez», que sigue sin identificar', () => {
  // Nota expresa del registro académico para la unidad gastrointestinal. La
  // biblioteca de la academia contiene el manual de Bibiano, que es OTRA obra:
  // renombrarlo «Jiménez» sería fabricar una referencia.
  const culpables = []
  for (const tema of todosLosTemas) {
    for (const sec of tema.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b.tipo !== 'fuentes') continue
        for (const it of b.items || []) {
          if (/urgencias\s+jim[ée]nez/i.test(it.nombre || '')) culpables.push(tema.id)
        }
      }
    }
  }
  assert.deepEqual([...new Set(culpables)], [])
})

test('donde se cita Bibiano se declara la edición, el capítulo y la página', () => {
  // Mismo control que el de PHTLS §12.8, aplicado al manual que sí pudo
  // abrirse: una referencia sin localizador no respalda nada, y aquí no hay
  // excusa porque la copia está disponible.
  for (const tema of todosLosTemas) {
    const items = (tema.secciones || [])
      .flatMap((s) => s.bloques || [])
      .filter((b) => b.tipo === 'fuentes')
      .flatMap((b) => b.items || [])
      .filter((f) => /Bibiano/i.test(f.nombre || ''))
    for (const f of items) {
      assert.match(f.nombre, /3\.?[ªa]\s*ed/i, `${tema.id} cita Bibiano sin declarar la edición.`)
      assert.match(f.nombre, /Cap[íi]tulo\s+\d+/i, `${tema.id} cita Bibiano sin capítulo.`)
      assert.match(f.nombre, /p\.\s*\d+/i, `${tema.id} cita Bibiano sin página impresa.`)
      assert.match(
        `${f.nota || ''}`, /HOSPITALARIO/,
        `${tema.id} debe declarar que Bibiano es apoyo hospitalario, no conducta prehospitalaria.`
      )
    }
  }
})

test('gastrointestinales: las tres decisiones dependientes del protocolo quedan remitidas', () => {
  // Analgesia, fluidos e ingesta oral son las que más varían entre servicios.
  // Ninguna lección de la unidad puede resolverlas por su cuenta.
  const sinRemitir = GASTROINTESTINALES.filter((id) => !/protocolo del servicio/.test(texto(id) || ''))
  assert.deepEqual(sinRemitir, [], 'Estos temas no remiten al protocolo del servicio.')
})

test('gastrointestinales: la exploración abdominal se enseña en su orden propio', () => {
  // El abdomen NO sigue el orden del tórax: se ausculta antes de palpar. Es el
  // error de método más repetido cuando se copia la secuencia torácica.
  const t = texto('m4-gi-exploracion-abdominal')
  assert.ok(t)
  assert.match(t, /inspeccion, auscultacion y palpacion/, 'Falta el orden propio del abdomen.')
  assert.match(
    t, /modifica los ruidos intestinales/,
    'Falta la razón por la que se ausculta antes de palpar.'
  )
})

test('respiratorias: la dotación de la NOM-034 no se convierte en autorización', () => {
  // Salbutamol aparece en dos lecciones (EPOC y asma) porque la NOM-034 lo
  // exige a bordo. Las dos tienen que decir que la dotación no basta.
  for (const id of ['m4-resp-epoc', 'm4-resp-asma']) {
    const t = texto(id)
    assert.match(t, /b\.4\.4\.1/, `${id} debe citar el numeral de la dotación.`)
    assert.match(
      t, /no dice a quien|no indica para que|no basta/,
      `${id} debe declarar que la dotación no autoriza la administración.`
    )
  }
})

// ---------- 15. Módulo 4: las 34 lecciones restantes ----------

const M4_RESTANTE = [
  'm4-card-exploracion', 'm4-card-ecg-basica', 'm4-card-sca', 'm4-card-pcr-megacode',
  'm4-card-arritmias', 'm4-card-insuficiencia', 'm4-card-hipertension',
  'm4-met-diabetes', 'm4-met-complicaciones', 'm4-met-acido-base',
  'm4-uri-ivu', 'm4-uri-urolitiasis', 'm4-uri-desequilibrio-electrolitico',
  'm4-uri-insuficiencia-renal',
  'm4-neu-exploracion', 'm4-neu-cefalea-migrana', 'm4-neu-evc',
  'm4-neu-crisis-convulsivas', 'm4-neu-sincope',
  'm4-gyn-exploracion', 'm4-gyn-cambios-embarazo', 'm4-gyn-trabajo-parto',
  'm4-gyn-parto-distocico', 'm4-gyn-sufrimiento-fetal', 'm4-gyn-hemorragia-2do-3er',
  'm4-gyn-aborto', 'm4-gyn-ectopico', 'm4-gyn-torsion-ovarica',
  'm4-gyn-hemorragia-postparto', 'm4-gyn-eclampsia',
  'm4-tox-toxindromes', 'm4-tox-abstinencia', 'm4-tox-picaduras', 'm4-tox-anafilaxia',
]

test('las 34 lecciones restantes del Módulo 4 existen y tienen actividad', () => {
  const sinMaterial = M4_RESTANTE.filter((id) => !texto(id))
  assert.deepEqual(sinMaterial, [], 'Estas lecciones del Módulo 4 perdieron su material.')
  const sinActividad = M4_RESTANTE
    .map((id) => todosLosTemas.find((t) => t.id === id))
    .filter((t) => t && !tieneActividad(t))
    .map((t) => t.id)
  assert.deepEqual(sinActividad, [])
})

test('la deuda de actividades del Módulo 4 quedó en cero', () => {
  const sin = todosLosTemas
    .filter((t) => t.id.startsWith('m4-'))
    .filter((t) => (t.secciones || []).length > 0)
    .filter((t) => !tieneActividad(t))
    .map((t) => t.id)
  assert.deepEqual(sin, [])
})

test('SCA cita la guía ACC/AHA/ACEP/NAEMSP/SCAI 2025', () => {
  const tema = todosLosTemas.find((x) => x.id === 'm4-card-sca')
  const nombres = (tema.secciones || [])
    .flatMap((s) => s.bloques || [])
    .filter((b) => b.tipo === 'fuentes')
    .flatMap((b) => b.items || [])
    .map((f) => f.nombre || '')
  assert.ok(
    nombres.some((n) => /ACC\/AHA\/ACEP\/NAEMSP\/SCAI/i.test(n) && /2025/.test(n)),
    'Falta la guía de síndromes coronarios agudos de 2025 como fuente rectora.'
  )
})

test('hipertensión distingue cifra severa de daño agudo de órgano', () => {
  const t = texto('m4-card-hipertension')
  assert.ok(t)
  assert.match(t, /dano agudo de organo/, 'Falta el concepto de daño agudo de órgano diana.')
  assert.match(
    t, /no es la cifra|no depende de la cifra|no persegu/,
    'Debe declararse que lo que separa ambas situaciones no es la cifra.'
  )
})

test('EVC no pretende diferenciar isquemia de hemorragia sin imagen', () => {
  const t = texto('m4-neu-evc')
  assert.ok(t)
  assert.match(t, /sin (una )?imagen/, 'Falta declarar que no se distinguen sin imagen.')
  assert.match(t, /ictus posible/, 'Debe transmitirse «ictus posible» y no un tipo.')
  // Y ningún tema puede afirmar el tipo antes de la imagen.
  ningunTemaDice(
    /se trata de un ictus isquemico|es un ictus isquemico/,
    'Ningún tema puede afirmar el tipo de ictus sin imagen.'
  )
})

test('el borrador KDIGO 2027 no aparece como guía publicada', () => {
  // Control normativo registrado: para lesión renal aguda se usa NICE NG148.
  for (const tema of todosLosTemas) {
    const items = (tema.secciones || [])
      .flatMap((s) => s.bloques || [])
      .filter((b) => b.tipo === 'fuentes')
      .flatMap((b) => b.items || [])
    for (const f of items) {
      assert.doesNotMatch(
        `${f.nombre || ''}`, /KDIGO\s*2027/i,
        `${tema.id} cita el borrador KDIGO 2027 como fuente.`
      )
    }
  }
  const obs = (todosLosTemas.find((x) => x.id === 'm4-uri-insuficiencia-renal')
    ?.revision?.observaciones || []).join(' ')
  assert.match(obs, /KDIGO 2027/, 'La ficha debe registrar el control sobre el borrador KDIGO 2027.')
  assert.match(obs, /BORRADOR al corte|permanece como BORRADOR/i)
})

test('hemorragia obstétrica no recomienda tacto vaginal', () => {
  for (const id of ['m4-gyn-hemorragia-2do-3er', 'm4-gyn-exploracion']) {
    const t = texto(id)
    assert.ok(t, `${id} debe estar redactado.`)
    assert.match(t, /no se realiza tacto vaginal|no se enseña tacto vaginal|no se hace.{0,40}tacto/,
      `${id} debe prohibir expresamente el tacto vaginal.`)
  }
  // Y ningún tema puede indicarlo como maniobra prehospitalaria.
  ningunTemaDice(
    /realizar (un )?tacto vaginal para|se realiza tacto vaginal para/,
    'Ningún tema puede indicar el tacto vaginal como maniobra prehospitalaria.'
  )
})

test('picaduras prohíbe incisión, succión y torniquete', () => {
  const t = texto('m4-tox-picaduras')
  assert.ok(t)
  for (const [etiqueta, patron] of [
    ['incisión', /incisi[oó]n/],
    ['succión', /succi/],
    ['torniquete', /torniquete/],
    ['hielo directo', /hielo/],
  ]) {
    assert.match(t, patron, `Falta desaconsejar ${etiqueta}.`)
  }
  assert.match(t, /no se hace|por que no/, 'Debe declararse expresamente que no se hacen.')
})

test('anafilaxia no depende de lesiones cutáneas para reconocerse', () => {
  const t = texto('m4-tox-anafilaxia')
  assert.ok(t)
  assert.match(
    t, /sin lesiones (en la piel|cutaneas)|sin urticaria/,
    'Debe declararse que la anafilaxia puede ocurrir sin manifestaciones cutáneas.'
  )
  assert.match(
    t, /primera linea/,
    'Debe declararse que la adrenalina intramuscular es la primera línea.'
  )
  assert.match(
    t, /no la sustituyen|no sustituyen a la adrenalina/,
    'Debe declararse que antihistamínicos y corticoides no sustituyen a la adrenalina.'
  )
})

test('Módulo 4 restante: ninguna lección publica una dosis', () => {
  const CIFRA = /\b\d+([.,]\d+)?\s*(mg|mcg|µg|g|ml|mL|joules?|J)\b/
  const culpables = M4_RESTANTE.filter((id) => {
    const tema = conMaterial.find((x) => x.id === id)
    return tema && CIFRA.test(loQueAfirma(tema))
  })
  assert.deepEqual(culpables, [], 'Hay una dosis o una energía publicada en el Módulo 4.')
})

// ---------- 16. Módulo 5: la deuda de actividades ----------

// Los 17 ids que `docs/archivo/RELEVO-CLAUDE-2026-08-17.md` y
// `docs/archivo/ESTADO-PRODUCCION-ACELERADA.md` enumeraban como deuda del Módulo 5.
const DEUDA_M5 = [
  'm5-tt-definicion', 'm5-tt-clavicula', 'm5-tt-escapula', 'm5-tt-esofago',
  'm5-tt-hemoneumotorax', 'm5-tt-quilotorax', 'm5-tt-asfixia-traumatica',
  'm5-tt-ruptura-diafragmatica',
  'm5-ta-definicion', 'm5-ta-estomago', 'm5-ta-pancreas', 'm5-ta-bazo', 'm5-ta-higado',
  'm5-tcc-lesiones-difusas', 'm5-tcc-medular-posterior', 'm5-tcc-exploracion-fisica',
  'm5-tcc-signos-tratamiento-columna',
]

test('las 17 lecciones en deuda del Módulo 5 existen y ya tienen actividad', () => {
  const sinMaterial = DEUDA_M5.filter((id) => !texto(id))
  assert.deepEqual(sinMaterial, [], 'Estas lecciones del Módulo 5 perdieron su material.')
  const sinActividad = DEUDA_M5
    .map((id) => todosLosTemas.find((t) => t.id === id))
    .filter((t) => t && !tieneActividad(t))
    .map((t) => t.id)
  assert.deepEqual(sinActividad, [])
})

test('todas las lecciones redactadas del Módulo 5 tienen actividad', () => {
  // Exigencia de cobertura completa, no solo de la lista en deuda: cualquier
  // lección nueva del módulo nace obligada a traer actividad.
  //
  // El suelo se actualiza al cerrar cada lote —33 tras saldar la deuda de
  // actividades, 66 tras integrar el lote A— y existe para que la prueba no
  // pueda pasar en vacío si alguien vaciara el módulo.
  const redactadas = conMaterial
    .filter((t) => t.id.startsWith('m5-'))
    .filter((t) => (t.secciones || []).length > 0)
  assert.ok(redactadas.length >= 66, `El Módulo 5 bajó a ${redactadas.length} lecciones redactadas.`)
  const sinActividad = redactadas.filter((t) => !tieneActividad(t)).map((t) => t.id)
  assert.deepEqual(sinActividad, [], 'Hay lecciones redactadas del Módulo 5 sin actividad.')
})

test('añadir la actividad no borró las lecciones que ya estaban redactadas en el Módulo 5', () => {
  // `m5-actividades.js` aporta SOLO el campo `actividades`. Si la fusión por
  // campo se rompiera, estas lecciones perderían prosa, quiz, tarjetas,
  // conceptos, fuentes o ficha editorial.
  for (const id of DEUDA_M5) {
    const tema = todosLosTemas.find((t) => t.id === id)
    assert.ok(tema, `${id} desapareció del contenido.`)
    assert.ok((tema.secciones || []).length >= 2, `${id} perdió sus secciones.`)
    assert.ok((tema.quiz || []).length >= 1, `${id} perdió su quiz.`)
    assert.ok((tema.conceptosClave || []).length >= 2, `${id} perdió sus conceptos clave.`)
    assert.ok((tema.flashcards || []).length >= 2, `${id} perdió sus tarjetas.`)
    assert.ok(
      (tema.secciones || []).flatMap((s) => s.bloques || []).some((b) => b.tipo === 'fuentes'),
      `${id} perdió su bloque de fuentes.`
    )
    assert.ok(tema.resumen, `${id} perdió su resumen.`)
    assert.equal(tema.revision?.estado, 'borrador', `${id} cambió de estado editorial.`)
  }
})

test('Módulo 5: ninguna actividad publica una dosis, un volumen ni un calibre', () => {
  // Todo el módulo remite esas cifras al protocolo del servicio; una actividad
  // no puede fijar lo que la lección deja abierto.
  const CIFRA = /\b\d+([.,]\d+)?\s*(mg|mcg|µg|g|ml|mL|l\/min|joules?|J|Fr|G)\b/
  const culpables = []
  for (const tema of conMaterial.filter((t) => t.id.startsWith('m5-'))) {
    const a = tema.actividades
    if (!a) continue
    const textos = [
      ...(a.ordenar?.pasos || []),
      ...(a.completar || []).flatMap((it) => [it.texto, ...(it.opciones || []), it.explicacion || '']),
      ...(a.preguntas || []).flatMap((q) => [q.pregunta, ...(q.opciones || []), q.explicacion || '']),
    ]
    if (textos.some((s) => CIFRA.test(String(s)))) culpables.push(tema.id)
  }
  assert.deepEqual(culpables, [], 'Hay una cifra terapéutica en una actividad del Módulo 5.')
})
