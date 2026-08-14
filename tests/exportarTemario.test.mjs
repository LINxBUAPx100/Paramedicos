// ============================================================
//  Pruebas de la composición del temario exportado
// ------------------------------------------------------------
//  El canvas no se puede probar aquí, pero tampoco hace falta: todo lo que
//  puede salir mal —qué entra, dónde cae cada cosa, dónde se corta el texto y
//  cuánto mide el lienzo— se decide en el módulo puro. `medir` se inyecta con
//  una regla determinista: 8px por carácter en cuerpo de tema, escalado por el
//  tamaño del estilo. Así los saltos de línea son comprobables y no dependen de
//  la tipografía que haya instalada.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  componerTemario, envolver, fasesVisibles, nombreArchivo, ESTILOS, LIENZO,
} from '../src/lib/exportarTemario.js'

// Regla falsa pero coherente: el ancho depende del texto Y del estilo, igual
// que en un motor de fuentes real.
const medir = (texto, estilo = 'tema') =>
  String(texto).length * (ESTILOS[estilo]?.tamano ?? 14) * 0.55

const FASES = [
  {
    id: 'f1', numero: 1, titulo: 'Fundamentos', subtitulo: 'Bases del oficio', color: '#0c5fc4',
    temas: [
      { id: 't1', numero: '1.1', titulo: 'Sistema de atención médica de urgencias' },
      { id: 't2', numero: '1.2', titulo: 'Bioseguridad' },
    ],
  },
  {
    id: 'f2', numero: 2, titulo: 'Anatomía', color: '#0f9d58',
    temas: [{ id: 't3', numero: '2.1', titulo: 'Aparato respiratorio' }],
  },
]

const texto = (r, estilo) => r.elementos.filter((e) => e.tipo === 'texto' && e.estilo === estilo)
const textos = (r) => r.elementos.filter((e) => e.tipo === 'texto').map((e) => e.texto)

test('envolver corta por palabras y respeta el ancho', () => {
  const lineas = envolver('uno dos tres cuatro cinco', 100, medir, 'tema')
  assert.ok(lineas.length > 1, 'debería partirse')
  // Ninguna línea pasa del ancho, salvo que sea una sola palabra.
  for (const l of lineas) {
    if (l.includes(' ')) assert.ok(medir(l, 'tema') <= 100, `se pasa: "${l}"`)
  }
  // Y no se pierde ni se duplica nada.
  assert.equal(lineas.join(' '), 'uno dos tres cuatro cinco')
})

test('envolver deja sola una palabra más larga que el ancho', () => {
  // Partirla por la mitad se lee peor que dejarla salir un poco.
  const lineas = envolver('esternocleidomastoideo', 10, medir, 'tema')
  assert.deepEqual(lineas, ['esternocleidomastoideo'])
})

test('envolver normaliza el espacio en blanco', () => {
  assert.deepEqual(envolver('  hola   mundo  ', 9999, medir), ['hola mundo'])
  assert.deepEqual(envolver('', 100, medir), [])
  assert.deepEqual(envolver(null, 100, medir), [])
})

test('fasesVisibles respeta lo que el grupo tiene oculto', () => {
  const v = fasesVisibles(FASES, { fases: ['f2'], temas: ['t1'] })
  assert.deepEqual(v.map((f) => f.id), ['f1'])
  assert.deepEqual(v[0].temas.map((t) => t.id), ['t2'])
})

test('una fase sin temas visibles NO se dibuja', () => {
  // Un círculo con título y nada debajo parece un error de la imagen.
  const v = fasesVisibles(FASES, { fases: [], temas: ['t3'] })
  assert.deepEqual(v.map((f) => f.id), ['f1'])
})

test('sin `ocultas` entra el temario completo', () => {
  const v = fasesVisibles(FASES)
  assert.equal(v.length, 2)
  assert.equal(v.reduce((s, f) => s + f.temas.length, 0), 3)
})

test('compone la cabecera con academia, grupo y recuento', () => {
  const r = componerTemario({ fases: FASES, academia: 'AEP', grupo: '2026-A', medir })
  assert.equal(texto(r, 'titulo')[0].texto, 'Temario')
  assert.ok(textos(r).includes('AEP · Grupo 2026-A'))
  assert.ok(textos(r).some((t) => t === '2 fases · 3 temas'))
})

test('el recuento usa singular cuando toca', () => {
  const una = { ...FASES[1] }
  const r = componerTemario({ fases: [una], medir })
  assert.ok(textos(r).some((t) => t === '1 fase · 1 tema'))
})

test('cada fase tiene su círculo, con su número y su color', () => {
  const r = componerTemario({ fases: FASES, medir })
  const circulos = r.elementos.filter((e) => e.tipo === 'circulo')
  assert.deepEqual(circulos.map((c) => c.texto), ['1', '2'])
  assert.deepEqual(circulos.map((c) => c.color), ['#0c5fc4', '#0f9d58'])
  // Todos sobre el eje.
  assert.ok(circulos.every((c) => c.x === LIENZO.ejeX))
})

test('nada se sale del lienzo y todo va en orden vertical', () => {
  const r = componerTemario({ fases: FASES, academia: 'AEP', medir })
  const conY = r.elementos.filter((e) => e.tipo === 'texto')
  for (const e of conY) {
    assert.ok(e.y > 0 && e.y < r.alto, `y fuera del lienzo: ${e.texto} (${e.y}/${r.alto})`)
    assert.ok(e.x >= 0 && e.x < r.ancho, `x fuera del lienzo: ${e.texto}`)
  }
  // El alto crece con el contenido, no es fijo.
  const corto = componerTemario({ fases: [FASES[1]], medir })
  assert.ok(r.alto > corto.alto, 'más temas debería dar más alto')
})

test('el eje llega desde la primera fase hasta el último tema', () => {
  const r = componerTemario({ fases: FASES, medir })
  const eje = r.elementos.find((e) => e.tipo === 'linea')
  const circulos = r.elementos.filter((e) => e.tipo === 'circulo')
  const temas = texto(r, 'tema')
  assert.ok(eje.y1 <= circulos[0].y, 'debe arrancar en la primera fase o antes')
  assert.ok(eje.y2 >= temas[temas.length - 1].y - ESTILOS.tema.alto, 'debe llegar al último tema')
  // Va ANTES que los círculos en la lista, para quedar pintado por debajo.
  assert.ok(r.elementos.indexOf(eje) < r.elementos.indexOf(circulos[0]))
})

test('el número del tema aparece UNA vez, aunque el título ocupe varias líneas', () => {
  const largo = {
    id: 'f9', numero: 9, titulo: 'F', color: '#000',
    temas: [{ id: 'tx', numero: '9.1', titulo: 'palabra '.repeat(40).trim() }],
  }
  const r = componerTemario({ fases: [largo], medir })
  assert.ok(texto(r, 'tema').length > 1, 'el título debería ocupar varias líneas')
  // Repetido en cada línea se leería como temas distintos.
  assert.equal(textos(r).filter((t) => t === '9.1').length, 1)
})

test('un temario sin nada visible lo DICE, no devuelve una imagen vacía', () => {
  const r = componerTemario({ fases: FASES, ocultas: { fases: ['f1', 'f2'], temas: [] }, medir })
  assert.ok(textos(r).some((t) => /no tiene ningún tema visible/.test(t)))
  assert.equal(r.elementos.filter((e) => e.tipo === 'circulo').length, 0)
  assert.ok(r.alto > 0)
})

test('exige la función de medir en vez de inventarse anchos', () => {
  assert.throws(() => componerTemario({ fases: FASES }), /medir/)
})

test('el nombre del archivo es predecible y válido en Windows', () => {
  assert.equal(
    nombreArchivo({ academia: 'Academia Estatal', grupo: '2026-A', fecha: '2026-08-14' }),
    'temario-academia-estatal-2026-a-2026-08-14.png'
  )
  // Sin acentos ni caracteres que Windows rechaza en un nombre de fichero.
  assert.equal(nombreArchivo({ academia: 'Atención: Médica/Básica' }), 'temario-atencion-medica-basica.png')
  assert.equal(nombreArchivo({}), 'temario.png')
})
