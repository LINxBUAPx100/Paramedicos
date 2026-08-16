// ============================================================
//  Pruebas de la semilla del plan oficial R.E.S.C.A.T.E.
// ------------------------------------------------------------
//  El temario ya no se inventa: se transcribe de un PDF con derechos
//  reservados. Lo que se protege aquí es la FIDELIDAD (los conteos y los
//  totales que declara el propio documento) y que la conversión a plantilla
//  no pierda ni duplique nada por el camino.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  plantillaDesdePrograma, normalizarEstructura, conteosDePrograma,
  alcanceDeExamen, temasEnOrden,
} from '../src/lib/programasModelo.js'

const SEMILLA = JSON.parse(
  readFileSync(new URL('../scripts/seed/plan-rescate.json', import.meta.url), 'utf8')
)
const TUM = SEMILLA.programas.find((p) => p.id === 'tum-rescate')

test('la semilla trae el programa oficial y las 15 especializaciones', () => {
  assert.equal(SEMILLA.programas.length, 16)
  assert.ok(TUM, 'falta el programa tum-rescate')
  assert.equal(TUM.tipoPrograma, 'tum')
  const esp = SEMILLA.programas.filter((p) => p.categoria === 'especializacion')
  assert.equal(esp.length, 15)
  // El PDF exige 2 especializaciones durante la carrera.
  assert.equal(TUM.reglas.especializacionesRequeridas, 2)
})

test('los conteos coinciden con el plan: 7 módulos, 56 unidades, 287 temas', () => {
  assert.equal(TUM.modulos.length, 7)
  const unidades = TUM.modulos.reduce((n, m) => n + m.unidades.length, 0)
  const temas = TUM.modulos.reduce(
    (n, m) => n + m.unidades.reduce((k, u) => k + u.temas.length, 0), 0)
  assert.equal(unidades, 56)
  assert.equal(temas, 287)
  // 270 salen literalmente del PDF; 17 son generados para las unidades que el
  // documento no desglosa (exámenes, prácticas y el Módulo 7).
  const generados = TUM.modulos.reduce(
    (n, m) => n + m.unidades.reduce(
      (k, u) => k + u.temas.filter((t) => t.generado).length, 0), 0)
  assert.equal(generados, 17)
  assert.equal(temas - generados, 270)
})

test('las horas y semanas cuadran con los totales que declara el PDF', () => {
  const semanas = TUM.modulos.reduce((n, m) => n + m.totales.semanas, 0)
  const horas = TUM.modulos.reduce((n, m) => n + m.totales.horas, 0)
  assert.equal(semanas, 88)
  assert.equal(horas, 440)
  assert.deepEqual(TUM.totales, { semanas: 88, horas: 440 })
})

test('cada módulo cuadra con la suma de sus unidades (salvo la errata marcada)', () => {
  for (const m of TUM.modulos) {
    const semanas = m.unidades.reduce((n, u) => n + (u.semanas || 0), 0)
    const horas = m.unidades.reduce((n, u) => n + (u.horas || 0), 0)
    assert.equal(semanas, m.totales.semanas, `semanas de ${m.id}`)
    if (m.id === 'm4-urgencias-medico-quirurgicas') {
      // ÚNICO descuadre del plan: «Urgencias del sistema nervioso» declara
      // 2 semanas y 5 horas; el total del módulo (115) exige 10. Se transcribe
      // el valor original y se marca `revisar` en vez de corregirlo.
      assert.equal(horas, 110)
      const u = m.unidades.find((x) => x.id === 'm4-urgencias-sistema-nervioso')
      assert.equal(u.revisar, true)
      assert.match(u.notaRevision, /115/)
    } else {
      assert.equal(horas, m.totales.horas, `horas de ${m.id}`)
    }
  }
})

test('todos los ids son únicos en el programa entero', () => {
  const ids = new Set()
  let n = 0
  for (const m of TUM.modulos) {
    for (const u of m.unidades) {
      ids.add(u.id); n++
      for (const t of u.temas) { ids.add(t.id); n++ }
    }
  }
  assert.equal(ids.size, n, 'hay ids repetidos entre unidades y temas')
  // Y ninguno usa el separador reservado de los doc-id.
  assert.ok(![...ids].some((id) => id.includes('__')), 'un id usa "__"')
})

test('AVDI y la Escala de Glasgow quedan en temas y MÓDULOS distintos', () => {
  const ubica = (temaId) => {
    for (const m of TUM.modulos) {
      for (const u of m.unidades) {
        if (u.temas.some((t) => t.id === temaId)) return { modulo: m.id, unidad: u.id }
      }
    }
    return null
  }
  const avdi = ubica('m3-ep-avdi')
  const glasgow = ubica('m5-tcc-glasgow')
  assert.ok(avdi && glasgow)
  assert.notEqual(avdi.modulo, glasgow.modulo)
  assert.notEqual(avdi.unidad, glasgow.unidad)
})

test('las erratas del PDF se transcriben literales y se marcan', () => {
  const marcados = []
  for (const m of TUM.modulos) {
    if (m.revisar) marcados.push(m.titulo)
    for (const u of m.unidades) {
      if (u.revisar) marcados.push(u.titulo)
      for (const t of u.temas) if (t.revisar) marcados.push(t.titulo)
    }
  }
  // Ninguna corrección aplicada: el título conserva la grafía original.
  assert.ok(marcados.includes('ANAT Y FISIO ESCENCIAL.'))
  assert.ok(marcados.includes('Tríada de Wadell.'))
  assert.ok(marcados.includes('Síndrome de causa equina.'))
  assert.ok(marcados.length >= 10, `solo ${marcados.length} marcados`)
})

// ---------- conversión a plantilla ----------

test('la conversión a plantilla no pierde ni duplica temas', () => {
  const { plantilla, temas } = plantillaDesdePrograma(TUM)
  assert.equal(plantilla.id, 'tum-rescate')
  assert.equal(plantilla.tipoPrograma, 'tum')
  assert.equal(plantilla.estado, 'publicada')
  assert.equal(plantilla.estructura.length, 7)
  assert.equal(temas.length, 287)
  assert.equal(new Set(temas.map((t) => t.docId)).size, 287)
  // Los temas de la estructura y los docs de contenido son EXACTAMENTE los mismos.
  const enEstructura = plantilla.estructura
    .flatMap((m) => m.unidades.flatMap((u) => u.temas.map((t) => t.id)))
  assert.deepEqual(new Set(enEstructura), new Set(temas.map((t) => t.temaId)))
})

test('cada tema sembrado sabe de qué módulo y unidad cuelga', () => {
  const { temas } = plantillaDesdePrograma(TUM)
  const avdi = temas.find((t) => t.temaId === 'm3-ep-avdi')
  assert.equal(avdi.moduloId, 'm3-evaluacion-soporte-vital')
  assert.equal(avdi.unidadId, 'm3-evaluacion-primaria')
  assert.equal(avdi.estado, 'publicado')
  // Nace vacío pero con la forma completa que espera el editor.
  assert.deepEqual(avdi.secciones, [])
  assert.deepEqual(avdi.quiz, [])
  assert.equal(avdi.recursos, null)
})

test('la granularidad por sesión sobrevive donde el PDF la declara', () => {
  const { plantilla } = plantillaDesdePrograma(TUM)
  const m4 = plantilla.estructura.find((m) => m.id === 'm4-urgencias-medico-quirurgicas')
  const farma = m4.unidades.find((u) => u.id === 'm4-farmacologia')
  assert.deepEqual(farma.sesiones, [
    { n: 1, semanas: 1, horas: 5 },
    { n: 2, semanas: 1, horas: 5 },
  ])
  assert.equal(farma.temas.find((t) => t.id === 'm4-far-generalidades').sesion, 1)
  assert.equal(farma.temas.find((t) => t.id === 'm4-far-dosis-urgencia').sesion, 2)
  // Donde el PDF NO lo dice, queda null: no se inventa el calendario.
  const gine = m4.unidades.find((u) => u.id === 'm4-urgencias-gineco-obstetricas')
  assert.equal(gine.temas[0].sesion, 1)
  const resp = m4.unidades.find((u) => u.id === 'm4-urgencias-respiratorias')
  assert.ok(resp.temas.every((t) => t.sesion === null))
})

test('los agrupadores del PDF se conservan en sus temas', () => {
  const { plantilla } = plantillaDesdePrograma(TUM)
  const m3 = plantilla.estructura.find((m) => m.id === 'm3-evaluacion-soporte-vital')
  const via = m3.unidades.find((u) => u.id === 'm3-manejo-via-aerea')
  assert.deepEqual(via.grupos, ['Métodos manuales', 'Métodos mecánicos', 'Métodos transtraqueales', 'Oxigenoterapia'])
  assert.equal(via.temas.find((t) => t.id === 'm3-va-canulas-orofaringeas').grupo, 'Métodos mecánicos')
  assert.equal(via.temas.find((t) => t.id === 'm3-va-repaso-anatomia').grupo, null)
})

test('la estructura generada pasa por normalizarEstructura sin perder nada', () => {
  const { plantilla } = plantillaDesdePrograma(TUM)
  const norm = normalizarEstructura(plantilla.estructura)
  assert.equal(norm.length, 7)
  const c = conteosDePrograma(plantilla.estructura)
  assert.deepEqual(c, { modulos: 7, unidades: 56, temas: 287, semanas: 88, horas: 435 })
  // 435 y no 440: es la errata del Módulo 4 arrastrada desde el PDF (arriba).
})

test('un programa con tipo inválido o id repetido se rechaza al sembrar', () => {
  assert.throws(() => plantillaDesdePrograma({ id: 'x', tipoPrograma: 'doctorado', modulos: [] }), /inválido/)
  assert.throws(() => plantillaDesdePrograma({ tipoPrograma: 'curso', modulos: [] }), /falta el id/)
  assert.throws(
    () => plantillaDesdePrograma({
      id: 'x', tipoPrograma: 'curso',
      modulos: [{ id: 'm', unidades: [{ id: 'u', temas: [{ id: 'dup' }, { id: 'dup' }] }] }],
    }),
    /duplicado/
  )
})

test('las especializaciones sin temario producen una plantilla vacía válida', () => {
  const acls = SEMILLA.programas.find((p) => p.id === 'esp-acls')
  const { plantilla, temas } = plantillaDesdePrograma(acls)
  assert.equal(plantilla.tipoPrograma, 'curso')
  assert.deepEqual(plantilla.estructura, [])
  assert.deepEqual(temas, [])
  // El PDF no publica su temario: se siembra el envase para que la academia
  // lo llene desde el editor, no un temario inventado.
  assert.equal(acls.candidatoCertificacion, true)
})

// ---------- fidelidad literal al documento impreso ----------

test('los encabezados de módulo son los IMPRESOS, erratas incluidas', () => {
  const enc = TUM.modulos.map((m) => m.encabezadoOficial)
  assert.deepEqual(enc, [
    'MÓDULO 1: PROPEDÉUTICO (PRIMEROS AUXILIOS BASICOS E INTERMEDIOS)',
    'MÓDULO 2: EL CUERPO HUMANO; (PRINCIPIOS DE ANATOMÍA Y FISIOLOGÍA.)',
    // El PDF imprime «MODULO» sin tilde y «INCIAL» por «INICIAL». Se respeta.
    'MODULO 3: EVALUACIÓN INCIAL Y SOPORTE VITAL.',
    'MÓDULO 4: MANEJO DE URGENCIAS MÉDICO QUIRÚRGICAS.',
    'MÓDULO 5: EMERGENCIAS TRAUMATOLÓGICAS',
    // «PEDIATRICAS» sin tilde, tal cual.
    'MÓDULO 6: POBLACIONES ESPECIALES (URGENCIAS PEDIATRICAS Y GERIÁTRICAS.)',
    'MÓDULO 7: OPERACIONES ESPECIALES.',
  ])
})

test('ningún título de módulo viene «corregido» respecto al encabezado', () => {
  // Esta es la prueba que faltaba: el Módulo 3 llegó a guardarse con el título
  // ya corregido («INICIAL») mientras la nota decía otra cosa.
  for (const m of TUM.modulos) {
    assert.ok(
      m.encabezadoOficial.includes(m.titulo),
      `el título de ${m.id} ("${m.titulo}") no aparece literal en su encabezado`
    )
    if (m.subtitulo) {
      assert.ok(
        m.encabezadoOficial.includes(m.subtitulo),
        `el subtítulo de ${m.id} no aparece literal en su encabezado`
      )
    }
  }
})

test('la numeración es la de la columna TEMA del PDF, con su salto', () => {
  const m4 = TUM.modulos.find((m) => m.id === 'm4-urgencias-medico-quirurgicas')
  assert.deepEqual(
    m4.unidades.map((u) => u.numeroOficial),
    [1, 2, null, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'la fila PRACTICA no lleva número en el PDF: la secuencia salta'
  )
  // El resto de módulos sí van correlativos desde 1.
  for (const m of TUM.modulos.filter((x) => x.id !== 'm4-urgencias-medico-quirurgicas')) {
    assert.deepEqual(
      m.unidades.map((u) => u.numeroOficial),
      m.unidades.map((_, i) => i + 1),
      `numeración de ${m.id}`
    )
  }
})

test('el orden del plan se conserva al convertir a plantilla', () => {
  const { plantilla } = plantillaDesdePrograma(TUM)
  // Módulos en el orden impreso.
  assert.deepEqual(
    plantilla.estructura.map((m) => m.numeroOficial),
    [1, 2, 3, 4, 5, 6, 7]
  )
  // Primera unidad del Módulo 1 y sus temas, en la secuencia del documento.
  const u1 = plantilla.estructura[0].unidades[0]
  assert.equal(u1.titulo, 'PRIMEROS AUXILIOS BÁSICOS.')
  assert.deepEqual(u1.temas.map((t) => t.titulo), [
    'Introducción.',
    'AVDI y activación del SMU.',
    'RCP legos en adulto.',
    'Uso del DEA.',
    'OVACE. En adultos',
    'Hemorragias.',
    'Fracturas.',
    'Quemaduras.',
    'Botiquín ideal.',
  ])
  // Y cada tema lleva su `orden` explícito, no depende del array.
  assert.deepEqual(u1.temas.map((t) => t.orden), [1, 2, 3, 4, 5, 6, 7, 8, 9])
})

test('los exámenes del plan cubren lo que les precede, no el módulo entero', () => {
  const { plantilla } = plantillaDesdePrograma(TUM)
  // Módulo 2: examina tres veces (tras la unidad 1, tras la 3, y al final).
  const p1 = alcanceDeExamen(plantilla.estructura, 'm2-examen-1')
  assert.equal(p1.esFinal, false)
  assert.deepEqual([...new Set(p1.temas.map((t) => t.unidadId))], ['m2-anat-fisio-esencial'])

  const p2 = alcanceDeExamen(plantilla.estructura, 'm2-examen-2')
  assert.deepEqual([...new Set(p2.temas.map((t) => t.unidadId))], ['m2-anat-fisio-intermedia'])

  const fin = alcanceDeExamen(plantilla.estructura, 'm2-examen-final')
  assert.equal(fin.esFinal, true)
  assert.deepEqual([...new Set(fin.temas.map((t) => t.unidadId))], [
    'm2-anat-fisio-esencial', 'm2-anat-fisio-intermedia', 'm2-anatomia-opcional',
  ])
})

test('el temario completo se recorre en el orden exacto del plan', () => {
  const { plantilla } = plantillaDesdePrograma(TUM)
  const orden = temasEnOrden(plantilla.estructura)
  assert.equal(orden.length, 287)
  assert.equal(orden[0].id, 'm1-pab-introduccion', 'el primero es la Introducción del Módulo 1')
  assert.equal(orden[orden.length - 1].moduloId, 'm7-operaciones-especiales')
  // Las posiciones son correlativas y sin huecos.
  assert.deepEqual(orden.map((t) => t.posicion), orden.map((_, i) => i + 1))
  // Y AVDI va antes que Glasgow, como en el documento.
  const pos = (id) => orden.find((t) => t.id === id).posicion
  assert.ok(pos('m3-ep-avdi') < pos('m5-tcc-glasgow'))
})
