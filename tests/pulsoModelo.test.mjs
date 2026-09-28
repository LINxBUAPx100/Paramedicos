import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  esEvaluacionPorId, trazoEcg, anotarLectura, LECTURAS_GUARDADAS,
  aReanudar, triageDeHoy, seccionLoQueMasSePregunta, REFERENCIA_QUIZ,
} from '../src/lib/pulsoModelo.js'

const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8')
const semilla = JSON.parse(leer('scripts/seed/plan-rescate.json'))

// ---------- Nodos de evaluación ----------

test('el patrón de evaluación coincide EXACTAMENTE con los exámenes y prácticas de la semilla', () => {
  const evaluacion = new Set()
  const todos = []
  for (const m of semilla.programas[0].modulos) {
    for (const u of m.unidades) {
      for (const t of u.temas) {
        todos.push(t.id)
        if (u.tipo === 'examen' || u.tipo === 'practica') evaluacion.add(t.id)
      }
    }
  }
  // 12 exámenes y 3 prácticas. El inventario cuenta 14 nodos de evaluación
  // porque el taller de aminas (práctica de M4) figura como bloqueado.
  assert.equal(evaluacion.size, 15)
  for (const id of todos) {
    assert.equal(esEvaluacionPorId(id), evaluacion.has(id), `el patrón clasifica mal «${id}»`)
  }
})

// ---------- Trazo ----------

test('el trazo dibuja un complejo por sección', () => {
  const d = trazoEcg(6, 44)
  assert.ok(d.startsWith('M0 '))
  // 11 segmentos por complejo
  assert.equal((d.match(/ L/g) || []).length, 6 * 11)
  assert.equal((trazoEcg(0).match(/ L/g) || []).length, 11, 'con 0 secciones dibuja uno')
})

// ---------- Posición de lectura ----------

test('anotarLectura acumula las secciones vistas y devuelve el mismo objeto si nada cambia', () => {
  let l = anotarLectura({}, 't1', 0, 5, 1)
  l = anotarLectura(l, 't1', 2, 5, 2)
  assert.deepEqual(l.t1.vistas, [0, 2])
  assert.equal(l.t1.seccion, 2)
  assert.equal(anotarLectura(l, 't1', 2, 5, 3), l, 'repetir la misma sección no debe re-renderizar')
  const vuelta = anotarLectura(l, 't1', 0, 5, 4)
  assert.notEqual(vuelta, l, 'volver a una sección ya vista cambia la posición')
  assert.equal(vuelta.t1.seccion, 0)
  assert.deepEqual(vuelta.t1.vistas, [0, 2])
})

test('si la lección cambió de número de secciones, las vistas viejas se descartan', () => {
  const l = anotarLectura(anotarLectura({}, 't1', 3, 5, 1), 't1', 1, 7, 2)
  assert.deepEqual(l.t1.vistas, [1])
  assert.equal(l.t1.total, 7)
})

test('anotarLectura rechaza datos inválidos y recorta a las más recientes', () => {
  const base = {}
  assert.equal(anotarLectura(base, '', 0, 3), base)
  assert.equal(anotarLectura(base, 't', 1.5, 3), base)
  assert.equal(anotarLectura(base, 't', 0, 0), base)
  assert.equal(anotarLectura(base, 't', 9, 3).t.seccion, 2, 'se acota al total')
  let l = {}
  for (let i = 0; i < LECTURAS_GUARDADAS + 5; i++) l = anotarLectura(l, `t${i}`, 0, 3, i)
  assert.equal(Object.keys(l).length, LECTURAS_GUARDADAS)
  assert.ok(!('t0' in l) && `t${LECTURAS_GUARDADAS + 4}` in l, 'se quedan las más recientes')
})

// ---------- Reanudar y triage ----------

const MODULOS = [
  { id: 'm1', numero: 1, titulo: 'Uno', color: '#123', temas: [
    { id: 'm1-a-uno', numero: '1.1', titulo: 'A' },
    { id: 'm1-a-dos', numero: '1.2', titulo: 'B' },
    { id: 'm1-examen-aplicacion', numero: '1.3', titulo: 'EXAMEN' },
  ] },
  { id: 'm2', numero: 2, titulo: 'Dos', temas: [
    { id: 'm2-b-uno', numero: '2.1', titulo: 'C' },
    { id: 'm2-b-bloq', numero: '2.2', titulo: 'D' },
  ] },
]

test('reanudar prefiere la lección a medias más reciente', () => {
  const r = aReanudar({
    modulos: MODULOS,
    leidos: {},
    lecturas: { 'm1-a-uno': { seccion: 1, total: 4, fecha: 1 }, 'm2-b-uno': { seccion: 2, total: 5, fecha: 9 } },
  })
  assert.equal(r.modo, 'reanudar')
  assert.equal(r.tema.id, 'm2-b-uno')
  assert.equal(r.tema.moduloNumero, 2)
})

test('una lección ya marcada como leída, oculta o de evaluación no se reanuda', () => {
  const r = aReanudar({
    modulos: [MODULOS[0]],
    leidos: { 'm1-a-uno': true },
    lecturas: {
      'm1-a-uno': { seccion: 1, total: 4, fecha: 9 },
      'm1-examen-aplicacion': { seccion: 0, total: 1, fecha: 10 },
      'm2-b-uno': { seccion: 2, total: 5, fecha: 11 }, // módulo no visible
    },
  })
  assert.equal(r.modo, 'empezar')
  assert.equal(r.tema.id, 'm1-a-dos')
})

test('sin nada pendiente, el tablero dice que terminó; los bloqueados y las evaluaciones no cuentan', () => {
  const r = aReanudar({
    modulos: MODULOS,
    leidos: { 'm1-a-uno': true, 'm1-a-dos': true, 'm2-b-uno': true },
    bloqueados: { 'm2-b-bloq': 'bloqueado_por_decision' },
  })
  assert.equal(r.modo, 'terminado')
})

test('el triage cuenta refuerzo, pendientes del módulo en curso y listos', () => {
  const t = triageDeHoy({
    modulos: MODULOS,
    leidos: { 'm1-a-uno': true },
    quizzes: {
      'm1-a-uno': { aciertos: 4, total: 5 },
      'm1-a-dos': { aciertos: 1, total: 5 },
      'm1-examen-aplicacion': { aciertos: 0, total: 5 }, // evaluación: no cuenta
    },
    moduloEnCurso: 'm1',
  })
  assert.equal(t.reforzar.total, 1)
  assert.equal(t.reforzar.primero.id, 'm1-a-dos')
  assert.equal(t.pendientes.total, 1, 'el examen no es un tema pendiente')
  assert.equal(t.pendientes.modulo.id, 'm1')
  assert.equal(t.listos.total, 1)
  assert.equal(REFERENCIA_QUIZ, 0.7, 'la referencia es la misma que anuncia el Quiz')
  assert.match(leer('src/components/Quiz.jsx'), /pct >= 70/)
})

// ---------- Atajo a «Lo que más se pregunta» ----------

test('el atajo encuentra la sección con el aviso del molde v2 en una lección real', async () => {
  const mod = await import('../src/data/contenido/m3-evaluacion.js')
  const temas = Object.values(mod).find((v) => v && v['m3-ep-avdi'])
  const avdi = temas['m3-ep-avdi']
  assert.equal(seccionLoQueMasSePregunta(avdi.secciones), 0)
  assert.equal(seccionLoQueMasSePregunta([{ titulo: 'Otra', bloques: [{ tipo: 'p', texto: 'x' }] }]), -1)
})

// ---------- Garantías de integración ----------

test('las lecturas NO se suben a Firestore y se atan a la cuenta', () => {
  const ctx = leer('src/context/ProgressContext.jsx')
  const escritura = ctx.slice(ctx.indexOf('fs.setDoc('), ctx.indexOf('{ merge: true }'))
  assert.ok(escritura.length > 0)
  assert.ok(!/lecturas/.test(escritura), 'subir lecturas exigiría cambiar reglas y presupuesto de escrituras')
  assert.match(ctx, /lecturasUid === user\.uid/, 'en un equipo compartido se verían las lecturas de otro')
})

test('el tablero ocupa la sección configurable de progreso y la lección usa el monitor', () => {
  const home = leer('src/pages/Home.jsx')
  assert.match(home, /progreso: <TableroTurno modulos=\{modulosVisibles\}/,
    'el tablero debe recibir SOLO los módulos visibles para el grupo')
  const tema = leer('src/pages/TemaPage.jsx')
  assert.match(tema, /<MonitorLeccion temaId=\{temaId\}/)
  assert.match(leer('src/main.jsx'), /import '\.\/styles\/pulso\.css'/)
})

test('el monitor no marca la lección como leída por desplazarse', () => {
  const monitor = leer('src/components/pulso/MonitorLeccion.jsx')
  assert.ok(!/marcarLeido/.test(monitor), 'pasar por pantalla no demuestra lectura')
})
