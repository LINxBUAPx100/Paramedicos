// ============================================================
//  Pruebas de los agregados del curso (Fase 1: lectura por tema)
// ------------------------------------------------------------
//  Lo que se protege, y por qué importa:
//
//  Abrir una lección leía los 287 temas del curso porque seis vistas derivadas
//  —glosario, buscador, banco de exámenes, flashcards, galería y contadores—
//  necesitaban un pedacito de todos ellos. Los agregados las precalculan para
//  que cada pantalla lea solo lo suyo.
//
//  El riesgo de ese cambio no es que falle: es que funcione «casi igual» y
//  nadie lo note —un examen con menos preguntas, un término del glosario que
//  deja de subrayarse, una imagen que desaparece de Logros—. Por eso la prueba
//  central no inventa datos de juguete: construye los agregados desde el
//  TEMARIO REAL y exige que produzcan EXACTAMENTE lo mismo que la API actual.
//
//  La prueba de tamaño existe porque 107 de los 287 temas están todavía
//  vacíos: un agregado que hoy cabe puede rebasar el límite de 1 MiB por
//  documento de Firestore cuando el temario se complete.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'

import * as legacy from '../src/data/index.js'
import { galeriaDeLogros } from '../src/lib/galeriaLogros.js'
import { construirGlosario, partirTexto } from '../src/lib/glosario.js'
import {
  AGREGADOS_GLOBALES, AGREGADOS_POR_MODULO, TIPOS_AGREGADO, SELLO,
  idAgregado, docIdAgregado, construirAgregados, glosarioParaEnlazar, buscarEnFilas,
  galeriaDesdeAgregado, docsAgregadosDeCurso, datosDeDoc,
} from '../src/lib/agregadosModelo.js'

const AGREGADOS = construirAgregados(legacy.modulos)
const { porModulo, globales } = AGREGADOS

// Concatena un agregado de todos los módulos en orden de plan: es lo que hace
// una pantalla que necesita el curso entero (el examen general, por ejemplo).
const todos = (tipo) => porModulo.flatMap((m) => m[tipo])

const pesoKB = (valor) => Buffer.byteLength(JSON.stringify(valor), 'utf8') / 1024

// --- Identificadores --------------------------------------------------------

test('idAgregado: determinista y con el módulo en el id cuando corresponde', () => {
  assert.equal(idAgregado('preguntas', 'm4-urgencias'), 'preguntas__m4-urgencias')
  assert.equal(idAgregado('preguntas', 'm4-urgencias'), idAgregado('preguntas', 'm4-urgencias'))
  assert.equal(idAgregado('atlas'), 'atlas')
})

test('idAgregado: rechaza las combinaciones imposibles en vez de inventar un id', () => {
  assert.throws(() => idAgregado('inventado', 'm1'), /tipo desconocido/)
  // Un agregado por módulo SIN módulo escribiría todos los módulos en el mismo
  // documento y el último ganaría, borrando los demás en silencio.
  assert.throws(() => idAgregado('preguntas'), /necesita moduloId/)
  assert.throws(() => idAgregado('atlas', 'm1'), /es global/)
})

test('los catálogos de tipos no se solapan y el sello va aparte', () => {
  const cruce = AGREGADOS_POR_MODULO.filter((t) => AGREGADOS_GLOBALES.includes(t))
  assert.deepEqual(cruce, [])
  // El SELLO es metadato, no contenido derivado: tiene id propio pero no sale
  // de `construirAgregados`. Por eso suma uno y no se genera con los demás.
  assert.equal(TIPOS_AGREGADO.length, AGREGADOS_POR_MODULO.length + AGREGADOS_GLOBALES.length + 1)
  assert.ok(TIPOS_AGREGADO.includes(SELLO))
  assert.ok(!AGREGADOS_POR_MODULO.includes(SELLO) && !AGREGADOS_GLOBALES.includes(SELLO))
})

// --- Equivalencia con la API actual, sobre el temario REAL ------------------

test('cubre todos los módulos del plan, en orden', () => {
  assert.deepEqual(porModulo.map((m) => m.moduloId), legacy.modulos.map((m) => m.id))
})

test('preguntas: el banco reconstruido es idéntico al actual', () => {
  assert.deepEqual(todos('preguntas'), legacy.todasLasPreguntas)
  assert.ok(todos('preguntas').length > 0, 'el temario real debe aportar preguntas')
})

test('flashcards: el mazo reconstruido es idéntico al actual', () => {
  assert.deepEqual(todos('flashcards'), legacy.todasLasFlashcards)
  assert.ok(todos('flashcards').length > 0)
})

test('contadores: los mismos números que stats', () => {
  assert.deepEqual(globales.contadores, legacy.stats)
})

test('atlas: el mismo mapa clave→tema', () => {
  assert.deepEqual(globales.atlas, legacy.temaPorClaveImagen)
})

test('búsqueda: los mismos resultados y en el mismo orden que buscar()', () => {
  const filas = todos('fichas')
  // Consultas que tocan las tres vías del buscador (título, resumen, concepto)
  // y una que no existe, para comprobar que tampoco inventa resultados.
  for (const q of ['shock', 'vía aérea', 'hemorragia', 'oxígeno', 'quirófano robótico']) {
    const esperado = legacy.buscar(q).map((r) => ({
      id: r.tema.id,
      conceptos: r.conceptos.map((c) => c.termino),
    }))
    const obtenido = buscarEnFilas(filas, q).map((r) => ({
      id: r.tema.id,
      conceptos: r.conceptos.map((c) => c.termino),
    }))
    assert.deepEqual(obtenido, esperado, `la consulta «${q}» no coincide`)
  }
})

test('ficha: trae todo lo que pintan el buscador y el índice del módulo, y nada más', () => {
  const fila = todos('fichas').find((f) => f.resumen)
  assert.ok(fila, 'debe haber al menos un tema con resumen')
  // Un solo agregado sirve a las dos pantallas que listan lecciones sin
  // abrirlas; si falta un campo, una de ellas pinta un hueco.
  for (const campo of [
    'id', 'numero', 'titulo', 'icono', 'resumen', 'duracion', 'nQuiz', 'nFlashcards',
    'moduloNumero', 'moduloTitulo', 'moduloColor',
  ]) {
    assert.ok(campo in fila, `falta el campo «${campo}»`)
  }
  // Y NO trae el cuerpo de la lección, que es de donde sale el peso.
  assert.ok(!('secciones' in fila))

  // Los conteos deben cuadrar con las lecciones de verdad: la página del módulo
  // anuncia «N preguntas» y esa cifra sale de aquí, no del tema.
  const conFichas = todos('fichas')
  for (const f of conFichas.slice(0, 40)) {
    const real = legacy.todosLosTemas.find((t) => t.id === f.id)
    assert.equal(f.nQuiz, (real.quiz || []).length, f.id)
    assert.equal(f.nFlashcards, (real.flashcards || []).length, f.id)
    assert.equal(f.duracion, real.duracion || '', f.id)
  }
})

test('galería: la misma lista que galeriaDeLogros, con y sin catálogo', () => {
  const imagenes = todos('imagenes')
  assert.deepEqual(
    galeriaDesdeAgregado(imagenes, []),
    galeriaDeLogros(legacy.todosLosTemas, [])
  )

  // Con catálogo se ejercitan las dos ramas que el agregado podría perder: una
  // entrada que aporta el `src` de un bloque que solo tenía clave, y otra que
  // se coloca junto a su tema en vez de irse al final.
  const algunTema = legacy.todosLosTemas[10]
  const catalogo = [
    { clave: 'atlas-suelto', titulo: 'Pieza del Atlas', src: 'imagenes/atlas/suelto.webp', tema: null },
    { clave: 'atlas-ubicado', titulo: 'Pieza ubicada', src: 'imagenes/atlas/ubicada.webp', tema: algunTema.id },
  ]
  assert.deepEqual(
    galeriaDesdeAgregado(imagenes, catalogo),
    galeriaDeLogros(legacy.todosLosTemas, catalogo)
  )
})

// --- Glosario ---------------------------------------------------------------

test('glosario: partirlo por módulo no duplica ni pierde entradas', () => {
  const completo = construirGlosario(legacy.todosLosTemas)
  const repartido = todos('glosario')
  assert.equal(repartido.length, completo.entradas.length)
  // La dedup del glosario es global («la primera aparición manda»); si se
  // hubiera construido módulo a módulo, un término repetido saldría dos veces.
  const claves = repartido.map((e) => e.clave)
  assert.equal(new Set(claves).size, claves.length, 'hay términos duplicados entre módulos')
  assert.deepEqual(repartido.map((e) => e.slug), completo.entradas.map((e) => e.slug))
})

test('glosario de enlaces: subraya exactamente los mismos términos que el completo', () => {
  const completo = construirGlosario(legacy.todosLosTemas)
  const ligero = glosarioParaEnlazar(globales.glosarioEnlaces)
  assert.equal(ligero.total, completo.total)

  // Se comprueba sobre PROSA REAL del temario, no sobre una frase inventada:
  // es donde aparecen los términos con acentos, paréntesis y signos.
  const textos = []
  for (const tema of legacy.todosLosTemas) {
    for (const seccion of tema.secciones || []) {
      for (const bloque of seccion.bloques || []) {
        if (bloque.tipo === 'p' && bloque.texto) textos.push(bloque.texto)
      }
    }
  }
  assert.ok(textos.length > 100, 'debe haber prosa real que analizar')

  const marcados = (g) => (texto) =>
    partirTexto(texto, g).filter((s) => s.entrada).map((s) => [s.texto, s.entrada.slug])

  const conCompleto = textos.map(marcados(completo))
  const conLigero = textos.map(marcados(ligero))
  assert.deepEqual(conLigero, conCompleto)
})

test('glosario de enlaces: no arrastra las definiciones (es la ruta caliente)', () => {
  assert.ok(globales.glosarioEnlaces.every((e) => e.length === 3))
  const conDefinicion = todos('glosario').filter((e) => e.definicion)
  assert.ok(conDefinicion.length > 0, 'las definiciones sí viajan en el agregado por módulo')
})

// --- Tamaño: la razón de partir por módulo ----------------------------------

test('ningún agregado se acerca al límite de 1 MiB de un documento de Firestore', () => {
  // 400 KB deja margen para que el temario crezca hasta ~2,5× el actual sin
  // volver a tocar la partición. Si esta prueba falla, la respuesta no es subir
  // el número: es partir ese agregado en piezas más pequeñas.
  const TECHO_KB = 400
  const medidos = []
  for (const m of porModulo) {
    for (const tipo of AGREGADOS_POR_MODULO) medidos.push([`${tipo}__${m.moduloId}`, pesoKB(m[tipo])])
  }
  for (const tipo of AGREGADOS_GLOBALES) medidos.push([tipo, pesoKB(globales[tipo])])

  const excedidos = medidos.filter(([, kb]) => kb > TECHO_KB)
  assert.deepEqual(
    excedidos,
    [],
    `agregados por encima de ${TECHO_KB} KB: ${excedidos.map(([n, k]) => `${n} (${k.toFixed(0)} KB)`).join(', ')}`
  )
})

test('la ruta caliente de una lección pesa una fracción del curso entero', () => {
  // Esta es la métrica que justifica toda la fase: lo que un alumno descarga
  // para leer UNA lección frente a lo que descargaba antes.
  const cursoEntero = pesoKB(legacy.todosLosTemas)
  const unaLeccion = pesoKB(legacy.todosLosTemas.find((t) => (t.secciones || []).length > 3))
  const enlaces = pesoKB(globales.glosarioEnlaces)
  const rutaCaliente = unaLeccion + enlaces

  assert.ok(
    rutaCaliente < cursoEntero * 0.1,
    `la ruta caliente (${rutaCaliente.toFixed(0)} KB) debe ser <10% del curso (${cursoEntero.toFixed(0)} KB)`
  )
})

// --- Documentos de Firestore ------------------------------------------------

test('docIdAgregado: el curso va delante y el id es único por curso', () => {
  assert.equal(docIdAgregado('aca__plan', 'preguntas', 'm1'), 'aca__plan__preguntas__m1')
  assert.equal(docIdAgregado('aca__plan', SELLO), 'aca__plan__sello')
  // Dos academias con el mismo módulo no pueden pisarse el documento.
  assert.notEqual(
    docIdAgregado('acaA__plan', 'preguntas', 'm1'),
    docIdAgregado('acaB__plan', 'preguntas', 'm1')
  )
  assert.throws(() => docIdAgregado('', 'preguntas', 'm1'), /falta cursoId/)
})

test('los documentos se serializan porque Firestore no admite arreglos anidados', () => {
  const docs = docsAgregadosDeCurso({
    academiaId: 'aca', cursoId: 'aca__plan', modulos: legacy.modulos,
  })

  // Esta es LA razón de guardar `datos` como texto. Dos agregados llevan
  // arreglos dentro de arreglos —los enlaces del glosario son tuplas y cada
  // ficha lleva `conceptos: [[termino, definicion]]`— y Firestore los rechaza.
  // Si alguien "simplifica" esto guardando el objeto tal cual, la escritura
  // falla en producción y no aquí, así que la prueba lo fija.
  const anidados = (v) => Array.isArray(v)
    ? v.some((x) => Array.isArray(x) || (x && typeof x === 'object' && anidados(Object.values(x))))
    : false
  for (const d of docs) {
    assert.equal(typeof d.datos, 'string', `${d.docId} debe llevar los datos serializados`)
    for (const [campo, valor] of Object.entries(d)) {
      assert.ok(!anidados(valor), `${d.docId}.${campo} tiene arreglos anidados`)
      assert.notEqual(valor, undefined, `${d.docId}.${campo} es undefined y Firestore lo rechaza`)
    }
  }
})

test('lo escrito y lo leído son el mismo dato', () => {
  const docs = docsAgregadosDeCurso({
    academiaId: 'aca', cursoId: 'aca__plan', modulos: legacy.modulos,
  })
  const porTipo = new Map(docs.map((d) => [d.docId, d]))
  const preguntas = datosDeDoc(porTipo.get(docIdAgregado('aca__plan', 'preguntas', legacy.modulos[0].id)))
  assert.deepEqual(preguntas, AGREGADOS.porModulo[0].preguntas)
  const enlaces = datosDeDoc(porTipo.get(docIdAgregado('aca__plan', 'glosarioEnlaces')))
  assert.deepEqual(enlaces, globales.glosarioEnlaces)
})

test('un documento corrupto se trata como ausente, no tumba la pantalla', () => {
  assert.equal(datosDeDoc({ datos: '{roto' }), null)
  assert.equal(datosDeDoc(null), null)
  assert.equal(datosDeDoc({}), null)
})

test('cada academia y cada curso quedan marcados en el documento', () => {
  // Sin estos campos la regla de Firestore no puede autorizar la lectura sin
  // resolver el curso padre, que costaría una lectura facturada por documento.
  const docs = docsAgregadosDeCurso({
    academiaId: 'aca', cursoId: 'aca__plan', modulos: legacy.modulos,
  })
  for (const d of docs) {
    assert.equal(d.academiaId, 'aca')
    assert.equal(d.cursoId, 'aca__plan')
    assert.equal(d.estado, 'publicado')
    assert.ok(typeof d.tipo === 'string' && d.tipo.length > 0)
  }
})
