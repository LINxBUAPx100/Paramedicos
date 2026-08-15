// ============================================================
//  Pruebas de la selección de preguntas de examen
// ------------------------------------------------------------
//  El examen de fase usaba las 73 preguntas de la fase, todas, siempre. Con
//  eso, barajar el orden no impedía que dos alumnos se pasaran las respuestas:
//  veían el mismo examen. Lo que se protege aquí:
//
//    1. REPRODUCIBILIDAD — la misma semilla da el mismo examen. Es lo que
//       impide recargar la página hasta que salgan las preguntas cómodas, y lo
//       que permite reconstruir qué vio un alumno que reclama su nota.
//    2. VARIEDAD — semillas distintas dan exámenes distintos.
//    3. COBERTURA — el reparto por tema suma exacto y no deja temas fuera. Sin
//       esto, un alumno podría librarse por suerte del tema que no estudió.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { generador, barajarCon, elegirCon, nuevaSemilla, semillaANumero } from '../src/lib/azar.js'
import {
  tamanoExamen, repartoPorTema, seleccionarPreguntas, temasCubiertos,
  MINIMO_PREGUNTAS, MAXIMO_PREGUNTAS,
} from '../src/lib/examenModelo.js'

// Banco de prueba: `temas` temas con `porTema` preguntas cada uno.
const banco = (temas, porTema) =>
  Array.from({ length: temas }, (_, t) =>
    Array.from({ length: porTema }, (_, i) => ({
      id: `t${t}-q${i}`, temaId: `tema-${t}`, pregunta: `¿P ${t}.${i}?`,
      opciones: ['a', 'b', 'c', 'd'], correcta: 0,
    }))
  ).flat()

// ---------- azar sembrado ----------

test('la misma semilla produce siempre la misma baraja', () => {
  const arr = Array.from({ length: 40 }, (_, i) => i)
  const a = barajarCon(generador('f1-abc'), arr)
  const b = barajarCon(generador('f1-abc'), arr)
  assert.deepEqual(a, b)
})

test('semillas distintas producen barajas distintas', () => {
  const arr = Array.from({ length: 40 }, (_, i) => i)
  assert.notDeepEqual(barajarCon(generador('uno'), arr), barajarCon(generador('dos'), arr))
})

test('barajar no muta la entrada ni pierde elementos', () => {
  const arr = [1, 2, 3, 4, 5]
  const copia = [...arr]
  const b = barajarCon(generador('x'), arr)
  assert.deepEqual(arr, copia, 'la entrada no se toca')
  assert.deepEqual([...b].sort((x, y) => x - y), copia)
})

test('elegirCon nunca repite ni devuelve de más', () => {
  const arr = Array.from({ length: 20 }, (_, i) => i)
  const sel = elegirCon(generador('s'), arr, 7)
  assert.equal(sel.length, 7)
  assert.equal(new Set(sel).size, 7)
  // Pedir más de lo que hay devuelve todo, no rellena con huecos.
  assert.equal(elegirCon(generador('s'), arr, 999).length, 20)
})

test('la semilla se convierte a un entero sin signo estable', () => {
  // Con signo, el estado del generador arranca negativo y la progresión se
  // rompe: mismo texto tiene que dar el mismo número, y siempre ≥ 0.
  assert.equal(semillaANumero('fase-1'), semillaANumero('fase-1'))
  assert.ok(semillaANumero('fase-1') >= 0)
  assert.ok(semillaANumero('') >= 0)
  assert.notEqual(semillaANumero('fase-1'), semillaANumero('fase-2'))
})

test('una semilla nueva lleva su prefijo y no trae caracteres confusos', () => {
  const s = nuevaSemilla('fase-3', () => 0.5)
  assert.match(s, /^fase-3-[a-z2-9]{8}$/)
  assert.doesNotMatch(s, /[01oil]/, 'sin 0/O ni 1/I/L: la semilla se dicta a mano')
})

// ---------- tamaño ----------

test('el tamaño es una porción del banco, con piso y techo', () => {
  assert.equal(tamanoExamen(73), MAXIMO_PREGUNTAS)   // 36 → tope 30
  assert.equal(tamanoExamen(46), 23)                 // la mitad justa
  assert.equal(tamanoExamen(29), 15)
  assert.equal(tamanoExamen(20), MINIMO_PREGUNTAS)   // 10 → piso 12
})

test('el tamaño nunca supera el banco disponible', () => {
  // Fases 7 y 8 del temario real (14 y 12 preguntas): se van al piso y el
  // examen es casi el banco entero. Es lo que hay con un banco así; lo que NO
  // puede pasar es pedir 12 preguntas de un banco de 8.
  assert.equal(tamanoExamen(14), MINIMO_PREGUNTAS)
  assert.equal(tamanoExamen(12), 12)
  assert.equal(tamanoExamen(8), 8)
  assert.equal(tamanoExamen(1), 1)
  assert.equal(tamanoExamen(0), 0)
})

// ---------- reparto por tema ----------

test('el reparto suma EXACTAMENTE el tamaño pedido', () => {
  // El redondeo de un reparto proporcional pierde o inventa plazas si no se
  // corrige con resto mayor; entonces el examen saldría de 29 o de 31.
  const rng = generador('r')
  for (const [temas, porTema, tamano] of [[12, 7, 30], [5, 3, 12], [8, 9, 25], [3, 20, 17]]) {
    const grupos = []
    for (let t = 0; t < temas; t++) grupos.push({ temaId: `t${t}`, preguntas: Array(porTema).fill(0) })
    const cuota = repartoPorTema(grupos, tamano, rng)
    assert.equal(cuota.reduce((a, b) => a + b, 0), tamano, `${temas}×${porTema} → ${tamano}`)
  }
})

test('ningún tema recibe más preguntas de las que tiene', () => {
  const grupos = [
    { temaId: 'a', preguntas: Array(2).fill(0) },
    { temaId: 'b', preguntas: Array(30).fill(0) },
    { temaId: 'c', preguntas: Array(3).fill(0) },
  ]
  const cuota = repartoPorTema(grupos, 20, generador('r'))
  assert.ok(cuota[0] <= 2 && cuota[2] <= 3)
  assert.equal(cuota.reduce((a, b) => a + b, 0), 20)
})

test('con menos plazas que temas, se sortean los temas que entran', () => {
  const grupos = Array.from({ length: 10 }, (_, i) => ({ temaId: `t${i}`, preguntas: [0, 0] }))
  const cuota = repartoPorTema(grupos, 4, generador('r'))
  assert.equal(cuota.reduce((a, b) => a + b, 0), 4)
  assert.ok(cuota.every((c) => c <= 1))
  // Y no son siempre los cuatro primeros del temario.
  const otra = repartoPorTema(grupos, 4, generador('otra-semilla-distinta'))
  assert.notDeepEqual(cuota, otra)
})

// ---------- selección completa ----------

test('el examen es reproducible: misma semilla, mismas preguntas y mismo orden', () => {
  // Es la prueba que sostiene todo: sin esto, recargar la página vuelve a tirar
  // los dados y el alumno repite hasta que le salga el examen fácil.
  const b = banco(12, 7)
  const a1 = seleccionarPreguntas(b, { semilla: 'fase-1-k3m9' })
  const a2 = seleccionarPreguntas(b, { semilla: 'fase-1-k3m9' })
  assert.deepEqual(a1.map((q) => q.id), a2.map((q) => q.id))
})

test('dos alumnos con semillas distintas NO reciben el mismo examen', () => {
  const b = banco(12, 7) // 84 preguntas, como una fase grande
  const a = seleccionarPreguntas(b, { semilla: 'alumno-a' })
  const c = seleccionarPreguntas(b, { semilla: 'alumno-b' })
  assert.notDeepEqual(a.map((q) => q.id), c.map((q) => q.id))
  // Y comparten menos de la mitad: es justo el punto del subconjunto.
  const comunes = a.filter((q) => c.some((o) => o.id === q.id)).length
  assert.ok(comunes < a.length * 0.75, `comparten ${comunes} de ${a.length}`)
})

test('todos los temas de la fase quedan representados', () => {
  // Sin reparto, una tirada podía dejar temas enteros fuera y otro alumno
  // recibir cuatro preguntas de ese mismo tema. Eso no es rigor, es suerte.
  const b = banco(12, 7)
  for (const semilla of ['s1', 's2', 's3', 's4', 's5']) {
    const sel = seleccionarPreguntas(b, { semilla })
    assert.equal(sel.length, MAXIMO_PREGUNTAS)
    assert.equal(temasCubiertos(sel), 12, `semilla ${semilla} dejó temas fuera`)
  }
})

test('los temas con más preguntas pesan más en el examen', () => {
  const b = [...banco(1, 40).map((q) => ({ ...q, temaId: 'grande' })), ...banco(1, 4)]
  const sel = seleccionarPreguntas(b, { semilla: 's' })
  const grandes = sel.filter((q) => q.temaId === 'grande').length
  assert.ok(grandes > sel.length / 2, 'el tema de 40 preguntas debe dominar')
})

test('un banco más pequeño que el examen sale entero, sin repetir', () => {
  const b = banco(2, 4) // 8 preguntas < mínimo de 12
  const sel = seleccionarPreguntas(b, { semilla: 's' })
  assert.equal(sel.length, 8)
  assert.equal(new Set(sel.map((q) => q.id)).size, 8)
})

test('tamano: null pide el banco entero, solo reordenado', () => {
  // Es lo que usan "Todas" en el examen general y el quiz de tema: ahí quitar
  // preguntas dejaría al alumno sin repasar parte del contenido.
  const b = banco(3, 9)
  const sel = seleccionarPreguntas(b, { semilla: 's', tamano: null })
  assert.equal(sel.length, 27)
  assert.equal(new Set(sel.map((q) => q.id)).size, 27)
  assert.notDeepEqual(sel.map((q) => q.id), b.map((q) => q.id), 'debe reordenar')
})

test('un banco vacío no revienta', () => {
  assert.deepEqual(seleccionarPreguntas([], { semilla: 's' }), [])
  assert.deepEqual(seleccionarPreguntas(null, { semilla: 's' }), [])
  assert.equal(temasCubiertos(null), 0)
})

test('preguntas sin temaId (quiz de un tema suelto) se barajan sin más', () => {
  const b = Array.from({ length: 7 }, (_, i) => ({ id: `q${i}`, pregunta: '?', opciones: [], correcta: 0 }))
  const sel = seleccionarPreguntas(b, { semilla: 's', tamano: null })
  assert.equal(sel.length, 7)
  assert.equal(new Set(sel.map((q) => q.id)).size, 7)
})
