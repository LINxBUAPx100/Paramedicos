// ============================================================
//  Controles automáticos sobre el temario REAL (§12 del mandato)
// ------------------------------------------------------------
//  Estas pruebas no se ejecutan sobre datos de laboratorio: recorren el plan
//  generado, que es exactamente lo que ve el alumno. La regla que las une es
//  una escalera, no una lista blanca:
//
//    · `borrador`   → puede tener deudas (fuentes genéricas, preguntas que se
//                     apoyan en material que aún no está escrito). Por eso
//                     lleva aviso visible y NO se presenta como validado.
//    · `en_revision` y superiores → ya no. Fuentes trazables, preguntas
//                     respondibles con el propio tema, sin contradicciones.
//
//  Así el control avanza solo: cada tema que se promueve tiene que pagar sus
//  deudas para poder subir de estado, y ningún tema puede subir en silencio.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { todosLosTemas, modulos } from '../src/data/index.js'
import {
  estadoEditorialDe, muestraContenido, estaAvalado, validarRevision, esNodoDeEvaluacion,
} from '../src/lib/estadoEditorial.js'
import {
  contradiccionesDeDosis, preguntasFueraDeTema, fuentesNoTrazables, enlacesInvalidos,
} from '../src/lib/auditoriaClinica.js'
import { tieneMaterial } from '../src/lib/estadoEditorial.js'
import contenidoRedactado, {
  BORRADORES_LEGADO, TEMAS_REDACTADOS, TEMAS_BLOQUEADOS, TEMAS_EVALUACION,
} from '../src/data/contenido/index.js'
import {
  TITULOS_VISIBLES_TEMA, TITULOS_VISIBLES_UNIDAD, TITULOS_VISIBLES_MODULO,
} from '../src/data/contenido/titulosVisibles.js'

const conMaterial = todosLosTemas.filter((t) => muestraContenido(estadoEditorialDe(t)))
const desdeRevision = conMaterial.filter((t) => estadoEditorialDe(t) !== 'borrador')

const tieneFuentes = (t) =>
  (t.secciones || []).some((s) => (s.bloques || []).some((b) => b.tipo === 'fuentes'))

// ---------- 5. contenido heredado sin aprobar ----------

test('§12.5 — ninguna pieza del corpus heredado llega al alumno sin aprobarse', () => {
  const heredadosVisibles = conMaterial
    .filter((t) => !esNodoDeEvaluacion(t))
    .filter((t) => !TEMAS_REDACTADOS.includes(t.id))
  assert.deepEqual(
    heredadosVisibles.map((t) => t.id), [],
    'Hay temas con material que NO proceden de un archivo redactado explícitamente.'
  )
})

test('§12.5 — reutilizado.js sigue archivado y fuera del contenido publicable', () => {
  assert.ok(Object.keys(BORRADORES_LEGADO).length > 0, 'el legado no debe borrarse: es trazabilidad')
  const publicables = new Set(Object.keys(contenidoRedactado))
  const filtrados = Object.keys(BORRADORES_LEGADO).filter((id) => publicables.has(id))
  // Un id puede coincidir (el legado cubría temas que después se redactaron);
  // lo que no puede es que su MATERIAL sea el que se publica.
  for (const id of filtrados) {
    assert.notDeepEqual(
      contenidoRedactado[id], BORRADORES_LEGADO[id],
      `El tema ${id} publica el objeto heredado tal cual.`
    )
  }
})

// ---------- métrica de cobertura ----------

test('la cobertura cuenta LECCIONES, no ids declarados', () => {
  // El generador informaba 64 «temas redactados» porque contaba los ids de los
  // archivos de contenido, y ahí vive también `m1-examen-aplicacion`, que es un
  // nodo de examen. Un examen no es una lección y no puede inflar la cobertura.
  const lecciones = todosLosTemas.filter((t) => !esNodoDeEvaluacion(t) && tieneMaterial(t))
  const declaradosSinMaterial = TEMAS_REDACTADOS.filter(
    (id) => !lecciones.some((t) => t.id === id)
  )
  for (const id of declaradosSinMaterial) {
    const tema = todosLosTemas.find((t) => t.id === id)
    assert.ok(
      esNodoDeEvaluacion(tema),
      `${id} se declara en un archivo de contenido, no tiene material y no es un nodo de evaluación.`
    )
  }
  assert.equal(lecciones.length, TEMAS_REDACTADOS.length - declaradosSinMaterial.length)
})

test('inventario, generador y contenido servido cuentan lo mismo', () => {
  // Las tres cifras se derivan de la MISMA definición (`tieneMaterial` sobre el
  // tema ensamblado). Esta prueba impide que alguna vuelva a calcularse aparte.
  const conMaterialReal = todosLosTemas.filter((t) => tieneMaterial(t))
  const segunEstado = todosLosTemas.filter(
    (t) => muestraContenido(estadoEditorialDe(t)) && !esNodoDeEvaluacion(t)
  )
  assert.deepEqual(
    conMaterialReal.map((t) => t.id).sort(),
    segunEstado.map((t) => t.id).sort(),
    'Hay temas con material que el estado editorial no muestra, o al revés.'
  )
  // Y todo nodo de evaluación declarado tiene su configuración en el plan.
  for (const id of TEMAS_EVALUACION) {
    const tema = todosLosTemas.find((t) => t.id === id)
    assert.ok(tema?.evaluacion, `${id} declara evaluación y no llegó al plan generado.`)
  }
})

// ---------- 4 y 10. estado editorial explícito y coherente ----------

test('§16 — los 287 nodos del plan tienen un estado editorial explícito', () => {
  const sinEstado = todosLosTemas.filter((t) => !t.estadoEditorial)
  assert.deepEqual(sinEstado.map((t) => t.id), [])
  assert.equal(todosLosTemas.length, 287)
})

test('§12.4 — ningún tema está validado o publicado sin fuentes y sin revisor', () => {
  for (const tema of todosLosTemas) {
    if (!estaAvalado(estadoEditorialDe(tema))) continue
    assert.ok(tieneFuentes(tema), `${tema.id} está avalado y no tiene bloque de fuentes.`)
    assert.ok(tema.revision?.revisadoPor, `${tema.id} está avalado y nadie lo firma.`)
  }
})

test('las fichas de revisión del temario son válidas', () => {
  for (const tema of todosLosTemas) {
    if (!tema.revision) continue
    assert.equal(validarRevision(tema.revision), null, `Ficha inválida en ${tema.id}`)
  }
})

test('§12.10 — un tema sin material se declara vacío, no se disfraza de lección', () => {
  for (const tema of todosLosTemas) {
    const estado = estadoEditorialDe(tema)
    if (estado !== 'vacio') continue
    assert.equal((tema.secciones || []).length, 0)
    assert.equal((tema.quiz || []).length, 0)
    assert.equal((tema.flashcards || []).length, 0)
  }
})

test('los temas bloqueados dejan una pregunta concreta para la academia', () => {
  const bloqueados = todosLosTemas.filter((t) => estadoEditorialDe(t) === 'bloqueado_por_decision')
  assert.ok(bloqueados.length > 0)
  assert.deepEqual(bloqueados.map((t) => t.id).sort(), [...TEMAS_BLOQUEADOS].sort())
  for (const t of bloqueados) {
    assert.ok(t.revision?.pregunta, `${t.id} está bloqueado sin decir qué hay que decidir.`)
  }
})

// ---------- 1. dosis contradictorias ----------

test('§12.1 — la misma indicación no lleva dos dosis distintas', () => {
  const { contradicciones } = contradiccionesDeDosis(conMaterial)
  assert.deepEqual(contradicciones, [])
})

test('§9.1 — desde «en revisión», ninguna cifra queda sin indicación declarada', () => {
  const { sinIndicacion } = contradiccionesDeDosis(desdeRevision)
  assert.deepEqual(
    sinIndicacion.map((m) => `${m.temaId}: ${m.cifra} ${m.unidad} (${m.farmaco})`), []
  )
})

// ---------- 2. preguntas fuera de tema ----------

test('§12.2 — desde «en revisión», cada pregunta se responde con su propio tema', () => {
  const fuera = preguntasFueraDeTema(desdeRevision)
  assert.deepEqual(
    fuera.map((f) => `${f.temaId}#${f.indice} (cobertura ${f.cobertura})`), []
  )
})

// ---------- 3 y 8. fuentes ----------

test('§12.8 — desde «en revisión», toda fuente identifica documento y edición', () => {
  const malas = fuentesNoTrazables(desdeRevision)
  assert.deepEqual(
    malas.map((f) => `${f.temaId}: ${f.nombre} — ${f.motivo}`), []
  )
})

test('§12.8 — no hay enlaces que no sean http(s) en ningún tema', () => {
  assert.deepEqual(enlacesInvalidos(todosLosTemas), [])
})

test('desde «en revisión», el tema declara su bloque de fuentes', () => {
  // Los nodos de evaluación no llevan prosa y por tanto no llevan bloque de
  // fuentes: su trazabilidad es el plan (la posición de la unidad) y va en la
  // ficha de revisión, que se comprueba en la prueba siguiente.
  const sin = desdeRevision.filter((t) => !esNodoDeEvaluacion(t)).filter((t) => !tieneFuentes(t))
  assert.deepEqual(sin.map((t) => t.id), [])
})

// ---------- 6. exámenes y prácticas ----------

test('§5.4 — un examen solo alcanza temas ANTERIORES dentro de su módulo', () => {
  for (const modulo of modulos) {
    const orden = new Map(modulo.unidades.map((u, i) => [u.id, i]))
    for (const tema of modulo.temas) {
      const alcance = tema.alcanceExamen
      if (!alcance) continue
      const iExamen = orden.get(alcance.unidadId)
      for (const uid of alcance.unidades) {
        assert.ok(
          orden.get(uid) < iExamen,
          `${tema.id} incluye la unidad ${uid}, que va DESPUÉS del examen.`
        )
        assert.equal(
          modulo.unidades[orden.get(uid)].tipo, 'contenido',
          `${tema.id} incluye una unidad que no es de contenido (${uid}).`
        )
      }
    }
  }
})

test('§5.4 — un parcial no cubre lo que ya evaluó el examen anterior', () => {
  for (const modulo of modulos) {
    const examenes = modulo.temas.filter((t) => t.alcanceExamen && !t.alcanceExamen.esFinal)
    const orden = new Map(modulo.unidades.map((u, i) => [u.id, i]))
    const porPosicion = [...examenes].sort(
      (a, b) => orden.get(a.alcanceExamen.unidadId) - orden.get(b.alcanceExamen.unidadId)
    )
    for (let i = 1; i < porPosicion.length; i++) {
      const previo = new Set(porPosicion[i - 1].alcanceExamen.unidades)
      const repetidas = porPosicion[i].alcanceExamen.unidades.filter((u) => previo.has(u))
      assert.deepEqual(
        repetidas, [],
        `${porPosicion[i].id} repite unidades del parcial anterior.`
      )
    }
  }
})

test('§5.4 — el examen final de cada módulo cubre todas sus unidades de contenido', () => {
  for (const modulo of modulos) {
    const final = modulo.temas.find((t) => t.alcanceExamen?.esFinal)
    if (!final) continue
    const contenido = modulo.unidades.filter((u) => u.tipo === 'contenido').map((u) => u.id)
    assert.deepEqual(final.alcanceExamen.unidades, contenido, `${final.id} deja unidades fuera.`)
  }
})

test('§5.4 — los nodos de evaluación no llevan lección de relleno', () => {
  for (const tema of todosLosTemas) {
    if (!esNodoDeEvaluacion(tema)) continue
    assert.equal(
      (tema.quiz || []).length, 0,
      `${tema.id} tiene preguntas propias; sus reactivos deben salir del alcance.`
    )
    assert.equal((tema.flashcards || []).length, 0, `${tema.id} no debería llevar flashcards.`)
  }
})

test('§9.1 — ningún examen o práctica inventa la nota de corte', () => {
  for (const tema of todosLosTemas) {
    const ev = tema.evaluacion
    if (!ev) continue
    const corte = ev.tipo === 'practica' ? ev.criterioAprobacion : ev.aprobacion
    assert.equal(corte, null, `${tema.id} fija una calificación mínima que el plan no define.`)
    assert.ok(
      (ev.pendientes || []).length > 0,
      `${tema.id} no registra la decisión académica que le falta.`
    )
  }
})

test('las prácticas se evalúan con lista de cotejo, no con prosa', () => {
  const practicas = todosLosTemas.filter((t) => t.evaluacion?.tipo === 'practica')
  assert.ok(practicas.length > 0)
  for (const t of practicas) {
    const ev = t.evaluacion
    assert.ok(ev.competencia, `${t.id} no declara la competencia observable.`)
    assert.ok((ev.cotejo || []).length >= 3, `${t.id} necesita una lista de cotejo real.`)
    assert.ok(ev.cotejo.some((c) => c.critico), `${t.id} no marca ningún paso crítico.`)
    assert.ok((ev.seguridad || []).length > 0, `${t.id} no declara medidas de seguridad.`)
    assert.ok((ev.erroresCriticos || []).length > 0, `${t.id} no declara errores críticos.`)
  }
})

// ---------- 7. ids y huérfanos ----------

test('§12.7 — no hay contenido redactado apuntando a temas inexistentes', () => {
  const ids = new Set(todosLosTemas.map((t) => t.id))
  const huerfanos = [...TEMAS_REDACTADOS, ...TEMAS_BLOQUEADOS].filter((id) => !ids.has(id))
  assert.deepEqual(huerfanos, [])
})

test('§12.7 — los ids del temario son únicos', () => {
  const vistos = new Set()
  const repetidos = []
  for (const t of todosLosTemas) {
    if (vistos.has(t.id)) repetidos.push(t.id)
    vistos.add(t.id)
  }
  assert.deepEqual(repetidos, [])
})

// ---------- 9. títulos visibles ----------

test('§12.9 — corregir el título visible nunca borra el oficial', () => {
  for (const modulo of modulos) {
    assert.ok(modulo.tituloOficial, `${modulo.id} perdió su título oficial.`)
    for (const u of modulo.unidades || []) {
      assert.ok(u.tituloOficial, `${u.id} perdió su título oficial.`)
    }
    for (const t of modulo.temas) {
      assert.ok(t.tituloOficial, `${t.id} perdió su título oficial.`)
      assert.equal(t.titulo, t.tituloOficial, `${t.id}: el campo documental fue sobrescrito.`)
    }
  }
})

test('§12.9 — cada corrección declarada apunta a un nodo que existe y cambia algo', () => {
  const temas = new Map(todosLosTemas.map((t) => [t.id, t]))
  for (const [id, visible] of Object.entries(TITULOS_VISIBLES_TEMA)) {
    const t = temas.get(id)
    assert.ok(t, `Corrección de título para un tema inexistente: ${id}`)
    assert.equal(t.tituloVisible, visible)
    assert.notEqual(t.tituloVisible, t.tituloOficial, `La corrección de ${id} no corrige nada.`)
  }
  const unidades = new Map(modulos.flatMap((m) => (m.unidades || []).map((u) => [u.id, u])))
  for (const id of Object.keys(TITULOS_VISIBLES_UNIDAD)) {
    assert.ok(unidades.get(id), `Corrección de título para una unidad inexistente: ${id}`)
  }
  const mods = new Map(modulos.map((m) => [m.id, m]))
  for (const id of Object.keys(TITULOS_VISIBLES_MODULO)) {
    assert.ok(mods.get(id), `Corrección de título para un módulo inexistente: ${id}`)
  }
})

test('las erratas confirmadas por la auditoría están corregidas para el alumno', () => {
  const temas = new Map(todosLosTemas.map((t) => [t.id, t]))
  const esperado = {
    'm5-cin-triada-wadell': /Waddell/,
    'm5-tcc-kellie-monroe': /Monro-Kellie/,
    'm5-tcc-cauda-equina': /cauda equina/,
    'm5-tcc-brown-sequard': /Brown-Séquard/,
    'm5-tocc-lefort': /Le Fort I, II y III/,
    'm5-tme-esguinces-luxaciones': /desgarros/,
    'm3-vi-osteolisis': /intraóseo/,
    'm6-tp-osteolisis': /intraóseo/,
  }
  for (const [id, patron] of Object.entries(esperado)) {
    assert.match(temas.get(id).tituloVisible || '', patron, `${id} sigue mostrando la errata.`)
  }
})
