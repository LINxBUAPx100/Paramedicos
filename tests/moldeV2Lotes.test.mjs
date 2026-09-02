// ============================================================
//  Trabajo A · lote M3 — evaluación primaria y secundaria
// ------------------------------------------------------------
//  El 2 de septiembre de 2026 las diez lecciones de la unidad de evaluación
//  recibieron el molde v2: errores frecuentes, repaso rápido y preguntas de
//  repaso oral, más las mnemotecnias y los «lo que más se pregunta» que caben
//  dentro de las secciones que ya tenían.
//
//  LO QUE ESTAS PRUEBAS PROTEGEN, Y POR QUÉ CADA COSA:
//
//   · Que las piezas sigan ahí. Una regeneración del plan que se coma una
//     sección no da error: la lección sigue abriendo, solo que más pobre.
//   · Que «Fuentes» siga siendo la última sección. Es la convención de todo el
//     temario y lo que hace que la cita se lea al final, no en medio.
//   · Que los topes del molde se respeten. Un «repaso rápido» de treinta
//     viñetas deja de ser un repaso y vuelve a ser la lección.
//   · **Que el enriquecimiento no cuele datos clínicos nuevos.** Es el riesgo
//     real de esta pasada: un repaso o una mnemotecnia son un sitio comodísimo
//     para colar una dosis o un tiempo que nadie citó. La regla del lote fue
//     que todo se DERIVA de la prosa que la lección ya tiene, y esta prueba la
//     hace cumplir comprobando que ninguna cifra aparece por primera vez en las
//     secciones nuevas.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { getTema } from '../src/data/index.js'

// Los lotes entregados, por unidad. Cada uno nuevo se añade aquí y hereda las
// mismas comprobaciones: es la forma de que el molde no se relaje al tercer
// lote, que es cuando se relajan las cosas.
const LOTES = {
  'M3 · evaluación primaria y secundaria': [
    'm3-ep-sss', 'm3-ep-avdi', 'm3-ep-via-aerea-cervicales', 'm3-ep-respiracion',
    'm3-ep-circulacion', 'm3-ep-neurologica', 'm3-ep-exploracion-dirigida',
    'm3-es-abcde', 'm3-es-sample', 'm3-es-exploracion-detallada',
  ],
  'M3 · manejo de la vía aérea': [
    'm3-va-repaso-anatomia', 'm3-va-levantamiento-menton', 'm3-va-triple-maniobra',
    'm3-va-menton-inclinacion', 'm3-va-canulas-orofaringeas', 'm3-va-canulas-nasofaringeas',
    'm3-va-tecnica-intubacion', 'm3-va-hojas-tubos', 'm3-va-mascarilla-laringea',
    'm3-va-obturador-esofagico', 'm3-va-cricotirotomia', 'm3-va-dispositivos-o2',
    'm3-va-tanques-o2', 'm3-va-isr',
  ],
}

const LECCIONES = Object.values(LOTES).flat()

// `m3-ep-via-aerea-cervicales` ya traía su propia lista de errores dentro de
// «Control de la columna cervical», así que NO se le añadió una sección que
// habría dicho lo mismo con otro formato. La excepción se declara aquí para que
// se vea que fue una decisión y no un olvido.
const SIN_SECCION_DE_ERRORES = new Set(['m3-ep-via-aerea-cervicales'])

const NUEVAS = ['Errores frecuentes', 'Repaso rápido', 'Preguntas de repaso oral']

// CANTIDADES CON UNIDAD, en dígitos o escritas con letra: «diez segundos»,
// «0.5 mg», «tres minutos». Es lo que hay que vigilar.
//
// La primera versión de esta prueba miraba cualquier número escrito con letra y
// saltó con «falla en las dos direcciones»: prosa corriente, no una cifra
// clínica. Vigilar todo es no vigilar nada, porque obliga a relajar la prueba
// hasta que deja de servir. Lo que no puede aparecer por primera vez en un
// repaso es una CANTIDAD —una dosis, un tiempo, una presión—, y una cantidad
// clínica siempre lleva unidad detrás.
const NUM = '\\d+(?:[.,]\\d+)?|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|quince|veinte|treinta|cuarenta|cincuenta|cien|ciento'
// Unidades CLÍNICAS y nada más. «puntos» y «veces» estaban aquí y volvieron a
// saltar con prosa corriente («tres puntos concentran las preguntas»): una
// unidad que también es una palabra común no sirve para detectar una dosis.
const UNIDAD = 'segundos?|minutos?|horas?|d[ií]as?|semanas?|mg|ml|mcg|litros?|mmHg|joules?|julios?|latidos|respiraciones|%'
const CANTIDADES = new RegExp(`\\b(?:${NUM})\\s*(?:${UNIDAD})\\b`, 'gi')

// Y por separado, cualquier número en dígitos: en un temario que escribe las
// cantidades con letra, un dígito suelto en una sección nueva casi siempre es
// un dato que se coló.
const DIGITOS = /\d+(?:[.,]\d+)?/g

const seccion = (tema, titulo) => (tema.secciones || []).find((s) => s.titulo === titulo)
const textoDe = (bloques) => (bloques || [])
  .map((b) => [b.texto, b.titulo, ...(b.items || []), ...(b.headers || []), ...(b.filas || []).flat()]
    .filter(Boolean).join(' '))
  .join(' ')

test('las lecciones de los lotes conservan sus piezas nuevas', () => {
  for (const id of LECCIONES) {
    const t = getTema(id)
    assert.ok(t, `no existe la lección ${id}`)
    for (const titulo of NUEVAS) {
      if (titulo === 'Errores frecuentes' && SIN_SECCION_DE_ERRORES.has(id)) continue
      assert.ok(seccion(t, titulo), `${id} perdió la sección «${titulo}»`)
    }
  }
})

test('«Fuentes» sigue siendo la última sección de cada lección', () => {
  for (const id of LECCIONES) {
    const secciones = getTema(id).secciones
    assert.equal(secciones[secciones.length - 1].titulo, 'Fuentes',
      `${id} dejó de terminar en «Fuentes»: las secciones nuevas se insertan ANTES`)
  }
})

test('los topes del molde v2 se respetan', () => {
  for (const id of LECCIONES) {
    const t = getTema(id)
    const repaso = seccion(t, 'Repaso rápido').bloques.find((b) => b.tipo === 'lista')
    assert.ok(repaso.items.length >= 8 && repaso.items.length <= 12,
      `${id}: el repaso rápido tiene ${repaso.items.length} viñetas (el molde admite hasta 12)`)

    const orales = seccion(t, 'Preguntas de repaso oral').bloques.find((b) => b.tipo === 'lista')
    assert.ok(orales.items.length >= 6 && orales.items.length <= 10,
      `${id}: ${orales.items.length} preguntas orales (el molde admite hasta 10)`)

    const errores = seccion(t, 'Errores frecuentes')
    if (errores) {
      assert.ok(errores.bloques.every((b) => b.tipo === 'callout' && b.variante === 'alerta'),
        `${id}: los errores frecuentes van como callout de alerta`)
    }

    const kb = JSON.stringify(t).length / 1024
    assert.ok(kb < 35, `${id} pesa ${kb.toFixed(1)} kB; el tope por lección son 35 kB`)
  }
})

test('las preguntas orales son preguntas, no afirmaciones con la respuesta dentro', () => {
  for (const id of LECCIONES) {
    const orales = seccion(getTema(id), 'Preguntas de repaso oral').bloques.find((b) => b.tipo === 'lista')
    for (const q of orales.items) {
      const esPregunta = q.includes('?')
      // Verbos en imperativo con los que se pide algo en voz alta. La lista
      // crece con los lotes: es preferible ampliarla a relajar la comprobación,
      // porque lo que vigila es que no se cuele una AFIRMACIÓN con la respuesta
      // dentro disfrazada de pregunta.
      const esConsigna = /^(Enumera|Describe|Di |Recita|Recorre|Menciona|Explica|Nombra|Diferencia|Sitúa|Define)/.test(q)
      assert.ok(esPregunta || esConsigna,
        `${id}: «${q}» no se lee como pregunta ni como consigna para responder en voz alta`)
    }
  }
})

test('NINGUNA cifra aparece por primera vez en las secciones nuevas', () => {
  // La regla del lote: el molde v2 reorganiza lo que la lección ya enseña y ya
  // cita; no añade datos clínicos. Una cifra que solo exista en el repaso o en
  // la mnemotecnia sería exactamente el dato inventado que este proyecto no
  // puede permitirse, y no daría ningún error visible.
  let revisadas = 0
  let halladas = 0
  for (const id of LECCIONES) {
    const t = getTema(id)
    // Las mnemotecnias y los «lo que más se pregunta» se insertaron DENTRO de
    // las secciones que ya existían, así que también son texto nuevo y también
    // se revisan. Sin esto, la mnemotecnia sería el hueco por el que entraría
    // una cifra sin citar, que es precisamente donde mejor se disfraza.
    const esNuevo = (b) => b.titulo === 'Regla mnemotécnica' || b.titulo === 'Lo que más se pregunta'
    const nuevas = [
      ...(t.secciones || []).filter((s) => NUEVAS.includes(s.titulo)),
      ...(t.secciones || [])
        .filter((s) => !NUEVAS.includes(s.titulo))
        .map((s) => ({ titulo: s.titulo, bloques: (s.bloques || []).filter(esNuevo) }))
        .filter((s) => s.bloques.length > 0),
    ]
    const viejas = (t.secciones || [])
      .filter((s) => !NUEVAS.includes(s.titulo))
      .map((s) => ({ ...s, bloques: (s.bloques || []).filter((b) => !esNuevo(b)) }))
    const original = `${t.resumen} ${(t.objetivos || []).join(' ')} ${textoDe(viejas.flatMap((s) => s.bloques))} `
      + `${(t.conceptosClave || []).map((c) => `${c.termino} ${c.definicion}`).join(' ')} `
      + `${(t.flashcards || []).map((f) => `${f.frente} ${f.reverso}`).join(' ')} `
      + `${(t.quiz || []).map((q) => `${q.pregunta} ${q.opciones.join(' ')} ${q.explicacion}`).join(' ')}`

    for (const s of nuevas) {
      revisadas += 1
      const enSeccion = textoDe(s.bloques)
      const cifras = [
        ...(enSeccion.match(DIGITOS) || []),
        ...(enSeccion.match(CANTIDADES) || []),
      ]
      halladas += cifras.length
      for (const cifra of cifras) {
        assert.ok(original.toLowerCase().includes(cifra.toLowerCase()),
          `${id} · «${s.titulo}»: la cifra ${cifra} no aparece en ninguna otra parte de la lección. `
          + 'El molde v2 reorganiza lo que ya se enseña; no introduce datos nuevos.')
      }
    }
  }
  // Sin esto la prueba pasaría en verde si un cambio de títulos dejara el
  // recorrido a cero secciones y no hubiera nada que revisar.
  assert.ok(revisadas >= 70, `solo se revisaron ${revisadas} secciones nuevas`)

  // QUÉ DEMUESTRA ESTA PRUEBA HOY, DICHO SIN ADORNOS.
  //
  // En el lote del 02-09-2026 encontró 4 cifras, todas en dígitos y todas en
  // `m3-ep-neurologica`, y ninguna cantidad con unidad: el lote no introdujo ni
  // una sola. Así que hoy verifica poco, y decirlo es parte de la prueba —una
  // suite que presume de vigilar dosis cuando no hay dosis que vigilar da una
  // garantía falsa, que es peor que no tenerla—.
  //
  // Se conserva porque el riesgo es de los lotes que vienen: M3 vía aérea, M4
  // farmacología y M5 trauma sí llevan dosis, tiempos y volúmenes, y ahí un
  // «repaso rápido» es el sitio perfecto para que se cuele una cifra sin citar.
  // Este es el guardarraíl esperándolos, no un certificado de lo ya hecho.
  assert.ok(halladas >= 0)
})
