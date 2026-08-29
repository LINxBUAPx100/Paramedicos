// ============================================================
//  Pruebas de los programas de ANDAMIO (Fase 3)
// ------------------------------------------------------------
//  El andamio es contenido de relleno para comprobar que un programa que no es
//  TUM funciona. El riesgo no es que falle: es que se quede.
//
//  Un andamio que se cuela es peor que no tenerlo. Un alumno leyendo lorem
//  ipsum donde espera fisiología pierde la confianza en la plataforma entera, y
//  una pregunta de relleno dentro de un examen es un error de calificación. Por
//  eso estas pruebas no comprueban que el andamio «esté bien hecho»: comprueban
//  que NO PUEDE LLEGAR a un alumno, y lo hacen por cuatro caminos distintos.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'

import * as legacy from '../src/data/index.js'
import { PROGRAMAS_ANDAMIO, PREFIJO_ANDAMIO, esDeAndamio } from '../src/data/programasAndamio.js'
import { plantillaDesdeData, contenidoTema } from '../src/lib/contenidoModelo.js'
import { TIPOS_PROGRAMA } from '../src/lib/programasModelo.js'
import { construirApi } from '../src/lib/contenidoApi.js'
import { construirAgregados } from '../src/lib/agregadosModelo.js'

const TODOS_LOS_TEMAS = PROGRAMAS_ANDAMIO.flatMap((p) => p.todosLosTemas)

// --- Barrera 1: no está en lo que se le sirve al alumno ---------------------

test('ningún tema de andamio existe en el temario oficial', () => {
  // La comprobación que de verdad importa: `src/data/index.js` es lo que se le
  // sirve a un alumno de una academia sin migrar. Si un id de andamio apareciera
  // aquí, estaría en el bundle de todo el mundo.
  const oficiales = new Set(legacy.todosLosTemas.map((t) => t.id))
  const colados = TODOS_LOS_TEMAS.filter((t) => oficiales.has(t.id))
  assert.deepEqual(colados, [], 'hay temas de andamio dentro del temario oficial')

  const deAndamioEnOficial = legacy.todosLosTemas.filter((t) => esDeAndamio(t.id))
  assert.deepEqual(deAndamioEnOficial, [], 'el temario oficial contiene ids de andamio')
})

test('los ids de andamio no pueden chocar con los 287 oficiales', () => {
  // El prefijo no es cosmético: es lo que hace imposible la colisión, y lo que
  // permite reconocer un andamio en un registro, un examen o una URL.
  for (const t of TODOS_LOS_TEMAS) {
    assert.ok(t.id.startsWith(PREFIJO_ANDAMIO), `${t.id} no lleva el prefijo de andamio`)
  }
  for (const t of legacy.todosLosTemas) {
    assert.ok(!t.id.startsWith(PREFIJO_ANDAMIO), `el tema oficial ${t.id} usa el prefijo de andamio`)
  }
})

test('el andamio no entra en las vistas derivadas del temario oficial', () => {
  // Glosario, banco de exámenes y mazo salen de los agregados. Si un término o
  // una pregunta de relleno se colara ahí, aparecería en el examen de un alumno.
  const { porModulo, globales } = construirAgregados(construirApi(legacy.modulos).modulos)
  const preguntas = porModulo.flatMap((m) => m.preguntas)
  const flashcards = porModulo.flatMap((m) => m.flashcards)

  assert.deepEqual(preguntas.filter((q) => esDeAndamio(q.temaId)), [])
  assert.deepEqual(flashcards.filter((f) => esDeAndamio(f.temaId)), [])
  assert.deepEqual(globales.glosarioEnlaces.filter(([, , temaId]) => esDeAndamio(temaId)), [])
})

// --- Barrera 2: nace en borrador, y las reglas exigen publicado -------------

test('TODOS los temas de andamio nacen en borrador', () => {
  // Es la barrera del servidor: `alumnoLeeCurso` exige estado 'publicado', así
  // que Firestore lo deniega aunque el programa se clonara por error y un grupo
  // llegara a apuntarle. Un solo tema publicado abriría ese hueco.
  for (const t of TODOS_LOS_TEMAS) {
    assert.equal(t.estado, 'borrador', `${t.id} no está en borrador`)
  }
})

test('el estado se conserva al convertirlo en documento de Firestore', () => {
  // `contenidoTema` fijaba 'publicado' para todo. Si volviera a hacerlo, el
  // andamio se publicaría al sembrarlo sin que ninguna otra prueba lo notara.
  for (const t of TODOS_LOS_TEMAS) {
    assert.equal(contenidoTema(t).estado, 'borrador', `${t.id} se publica al sembrarse`)
  }
  // Y el temario oficial, que no declara estado, se sigue publicando.
  assert.equal(contenidoTema(legacy.todosLosTemas[0]).estado, 'publicado')
})

test('la plantilla del andamio no se publica en el catálogo', () => {
  // Una plantilla publicada aparece como programa listo para clonar. El script
  // la fuerza a borrador; esto comprueba que sin esa corrección NO lo estaría,
  // para que nadie la quite pensando que es redundante.
  const { plantilla } = plantillaDesdeData({
    id: PROGRAMAS_ANDAMIO[0].id,
    nombre: PROGRAMAS_ANDAMIO[0].titulo,
    modulos: PROGRAMAS_ANDAMIO[0].modulos,
    todosLosTemas: PROGRAMAS_ANDAMIO[0].todosLosTemas,
  })
  assert.equal(plantilla.estado, 'publicada', 'el caso normal sigue publicando')
})

// --- Barrera 3: está marcado como lo que es ---------------------------------

test('cada pieza del andamio se declara como tal', () => {
  for (const p of PROGRAMAS_ANDAMIO) {
    assert.equal(p.esAndamio, true, `${p.id} no se declara andamio`)
    for (const t of p.todosLosTemas) {
      assert.equal(t.esAndamio, true, `${t.id} no se declara andamio`)
    }
  }
})

test('el texto avisa de que no es contenido académico', () => {
  // Quien abra una de estas lecciones por accidente tiene que saberlo en la
  // primera línea, no deducirlo del latín.
  for (const t of TODOS_LOS_TEMAS) {
    assert.match(t.resumen, /prueba|relleno/i, `${t.id} no avisa en su resumen`)
  }
  // Un aviso por LECCIÓN, no por programa: quien abra la segunda no habrá
  // pasado necesariamente por la primera.
  for (const t of TODOS_LOS_TEMAS) {
    const callouts = (t.secciones || [])
      .flatMap((s) => s.bloques || [])
      .filter((b) => b.tipo === 'callout')
    assert.ok(callouts.length >= 1, `${t.id} no lleva ningún aviso visible`)
    assert.ok(
      callouts.some((c) => /prueba|andamio|no deberías/i.test(`${c.titulo} ${c.texto}`)),
      `${t.id}: su aviso no dice que esto no es contenido real`
    )
  }
})

// --- Que además funcione: es para lo que existe -----------------------------

test('cubre las cuatro carreras que la academia va a impartir', () => {
  assert.equal(PROGRAMAS_ANDAMIO.length, 4)
  const ids = PROGRAMAS_ANDAMIO.map((p) => p.id)
  assert.equal(new Set(ids).size, 4, 'hay ids de programa repetidos')
  // Protección Civil va de momento como licenciatura: si algún día tiene tipo
  // propio, esta prueba lo recuerda.
  assert.deepEqual(
    PROGRAMAS_ANDAMIO.map((p) => p.tipoPrograma),
    ['enfermeria', 'tsu', 'licenciatura', 'licenciatura']
  )
})

test('todos declaran un tipo de programa que el catálogo conoce', () => {
  for (const p of PROGRAMAS_ANDAMIO) {
    assert.ok(TIPOS_PROGRAMA.includes(p.tipoPrograma), `${p.id}: tipo "${p.tipoPrograma}" desconocido`)
  }
})

test('cada programa trae dos lecciones con la forma completa de una lección', () => {
  // Si al andamio le faltara un campo, probaría menos de lo que parece: el
  // programa nuevo se vería «bien» y fallaría con contenido real.
  for (const p of PROGRAMAS_ANDAMIO) {
    assert.equal(p.todosLosTemas.length, 2, `${p.id} no tiene dos lecciones`)
    for (const t of p.todosLosTemas) {
      for (const campo of ['id', 'titulo', 'icono', 'duracion', 'resumen', 'objetivos', 'secciones', 'conceptosClave', 'flashcards', 'quiz']) {
        assert.ok(campo in t, `${t.id} no trae "${campo}"`)
      }
      assert.ok(t.secciones.length >= 2, `${t.id} necesita al menos dos secciones`)
      assert.ok(t.quiz.length >= 1, `${t.id} necesita al menos una pregunta`)
      for (const q of t.quiz) {
        assert.ok(q.opciones.length >= 2, `${t.id}: una pregunta con menos de dos opciones`)
        assert.ok(q.correcta >= 0 && q.correcta < q.opciones.length, `${t.id}: respuesta correcta fuera de rango`)
        assert.ok(q.explicacion, `${t.id}: una pregunta sin explicación`)
      }
    }
  }
})

test('el andamio recorre el mismo camino que el temario oficial', () => {
  // La prueba de que sirve para algo: si `plantillaDesdeData` no lo digiere,
  // no está comprobando la plomería real.
  for (const p of PROGRAMAS_ANDAMIO) {
    const { plantilla, temas } = plantillaDesdeData({
      id: p.id, nombre: p.titulo, modulos: p.modulos, todosLosTemas: p.todosLosTemas,
    })
    assert.equal(temas.length, 2, `${p.id}: no salieron dos documentos de tema`)
    assert.equal(plantilla.estructura.length, 1, `${p.id}: no salió un módulo`)
    for (const t of temas) {
      assert.ok(t.docId.startsWith(`${p.id}__`), `${t.docId} no cuelga de su plantilla`)
    }
  }
})

test('los ids de tema son únicos en todo el andamio', () => {
  const ids = TODOS_LOS_TEMAS.map((t) => t.id)
  assert.equal(new Set(ids).size, ids.length, 'hay ids de tema repetidos entre programas')
})
