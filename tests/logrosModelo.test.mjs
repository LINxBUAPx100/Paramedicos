// ============================================================
//  Pruebas de lib/logrosModelo.js — medallas, rachas y desbloqueo (R1)
// ------------------------------------------------------------
//  Lo que se protege aquí no es «que la función devuelva un número»: son las
//  cuatro decisiones que hacen que una sección de logros sea creíble o no.
//
//   1. La racha NO se rompe por consultar a las nueve de la mañana.
//   2. La mejor marca NUNCA baja, aunque se recorte el historial.
//   3. El denominador de una medalla de módulo NO se mueve cuando el profesor
//      libera un tema nuevo.
//   4. El desbloqueo principal es UNO y es el que de verdad está más cerca.
//
//  Módulo puro: sin React, sin Firebase.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DIAS_GUARDADOS, diaLocal, diaAnterior, rachaActual, mejorRachaEn, sumarActividad,
  catalogoDeMedallas, evaluarMedallas, desbloqueoPrincipal, resumenDeLogros,
} from '../src/lib/logrosModelo.js'

const MODULOS = [
  { id: 'm1', numero: 1, titulo: 'Propedéutico', temas: [{ id: 'a' }, { id: 'b' }] },
  { id: 'm2', numero: 2, titulo: 'El cuerpo humano', temas: [{ id: 'c' }, { id: 'd' }, { id: 'e' }] },
]

// ------------------------------------------------------------
//  El día
// ------------------------------------------------------------

test('el día se calcula en la zona del dispositivo, no en UTC', () => {
  // Las 23:30 del 5 de septiembre en la zona local son el día 5, aunque en UTC
  // ya sea el 6. Si esto se calculara en UTC, media España y todo México verían
  // su racha romperse a media tarde.
  const local = new Date(2026, 8, 5, 23, 30, 0)
  assert.equal(diaLocal(local.getTime()), '2026-09-05')
})

test('el día anterior cruza meses y años', () => {
  assert.equal(diaAnterior('2026-09-01'), '2026-08-31')
  assert.equal(diaAnterior('2026-01-01'), '2025-12-31')
  assert.equal(diaAnterior('2024-03-01'), '2024-02-29') // bisiesto
})

// ------------------------------------------------------------
//  La racha
// ------------------------------------------------------------

test('la racha cuenta los días seguidos hasta hoy', () => {
  const actividad = { '2026-09-03': 1, '2026-09-04': 2, '2026-09-05': 1 }
  assert.equal(rachaActual(actividad, '2026-09-05'), 3)
})

test('sin actividad HOY la racha sigue viva: se cuenta desde ayer', () => {
  // Es la diferencia entre «llevas 3 días» a las nueve de la mañana y «llevas
  // 0». La racha no está rota hasta que se pierde un día ENTERO, y enseñar un
  // cero a quien aún puede estudiar esta tarde es mentirle y desanimarle a la
  // vez.
  const actividad = { '2026-09-03': 1, '2026-09-04': 2, '2026-09-05': 1 }
  assert.equal(rachaActual(actividad, '2026-09-06'), 3)
})

test('al perder un día entero la racha sí se rompe', () => {
  const actividad = { '2026-09-03': 1, '2026-09-04': 2, '2026-09-05': 1 }
  assert.equal(rachaActual(actividad, '2026-09-07'), 0)
})

test('un hueco en medio no se salta', () => {
  const actividad = { '2026-09-01': 1, '2026-09-02': 1, '2026-09-04': 1, '2026-09-05': 1 }
  assert.equal(rachaActual(actividad, '2026-09-05'), 2)
  assert.equal(mejorRachaEn(actividad), 2)
})

test('un día apuntado con cero no cuenta como día', () => {
  assert.equal(rachaActual({ '2026-09-05': 0, '2026-09-04': 1 }, '2026-09-05'), 1)
})

test('sin historial, la racha es cero y no revienta', () => {
  assert.equal(rachaActual(undefined, '2026-09-05'), 0)
  assert.equal(rachaActual({}, '2026-09-05'), 0)
  assert.equal(mejorRachaEn({}), 0)
})

test('sumarActividad apunta el día y actualiza la racha', () => {
  const ayer = { actividad: { '2026-09-04': 1 }, racha: { actual: 1, mejor: 1, ultimoDia: '2026-09-04' } }
  const hoy = sumarActividad(ayer, new Date(2026, 8, 5, 10, 0, 0).getTime())
  assert.equal(hoy.actividad['2026-09-05'], 1)
  assert.equal(hoy.racha.actual, 2)
  assert.equal(hoy.racha.ultimoDia, '2026-09-05')
})

test('dos acciones el mismo día suman al contador pero no a la racha', () => {
  const t = new Date(2026, 8, 5, 10, 0, 0).getTime()
  const una = sumarActividad({}, t)
  const dos = sumarActividad(una, t)
  assert.equal(dos.actividad['2026-09-05'], 2)
  assert.equal(dos.racha.actual, 1, 'estudiar dos veces el martes no son dos días seguidos')
})

test('LA MEJOR MARCA NUNCA BAJA, aunque se pierda la racha o se pode el historial', () => {
  // Es la única cifra que no se puede recalcular cuando el historial se recorta
  // a DIAS_GUARDADOS, y una medalla concedida no se retira.
  const previo = { actividad: {}, racha: { actual: 0, mejor: 40, ultimoDia: '2026-01-01' } }
  const ahora = sumarActividad(previo, new Date(2026, 8, 5).getTime())
  assert.equal(ahora.racha.actual, 1)
  assert.equal(ahora.racha.mejor, 40, 'la mejor marca se perdió al romperse la racha')
})

test('el historial se poda a DIAS_GUARDADOS y conserva los días MÁS RECIENTES', () => {
  // Sin tope, este mapa es un almacén arbitrario dentro de un documento que el
  // cliente escribe con debounce y que Firestore corta en 1 MB.
  const actividad = {}
  const base = new Date(2024, 0, 1)
  for (let i = 0; i < DIAS_GUARDADOS + 50; i += 1) {
    const d = new Date(base.getTime())
    d.setDate(d.getDate() + i)
    actividad[diaLocal(d.getTime())] = 1
  }
  const { actividad: podada } = sumarActividad({ actividad }, new Date(2026, 8, 5).getTime())
  assert.ok(Object.keys(podada).length <= DIAS_GUARDADOS + 1)
  const dias = Object.keys(podada).sort()
  assert.equal(dias[dias.length - 1], '2026-09-05', 'se podó por el lado equivocado')
})

// ------------------------------------------------------------
//  El catálogo
// ------------------------------------------------------------

test('el catálogo trae una medalla de lectura por cada módulo del temario', () => {
  // Se genera desde el índice y no se escribe a mano: el temario de cada
  // academia es el suyo, y una lista fija se quedaría corta el primer día.
  const ids = catalogoDeMedallas(MODULOS).map((m) => m.id)
  assert.ok(ids.includes('modulo-m1'))
  assert.ok(ids.includes('modulo-m2'))
})

test('un módulo sin temas no genera medalla', () => {
  // Una medalla con meta cero se conseguiría sola, nada más entrar.
  const ids = catalogoDeMedallas([{ id: 'vacio', numero: 9, titulo: 'X', temas: [] }]).map((m) => m.id)
  assert.equal(ids.includes('modulo-vacio'), false)
})

test('sin progreso, ninguna medalla está conseguida y ninguna función revienta', () => {
  const medallas = evaluarMedallas({ modulos: MODULOS })
  assert.ok(medallas.length > 0)
  assert.equal(medallas.filter((m) => m.conseguida).length, 0)
  assert.deepEqual(resumenDeLogros(medallas), { conseguidas: 0, total: medallas.length })
})

test('LA META DE UN MÓDULO NO SE MUEVE cuando el profesor libera otro tema', () => {
  // El denominador son TODOS los temas del módulo, no los liberados. Con los
  // liberados, el alumno vería su «2 de 2» convertirse en «2 de 3» sin haber
  // hecho nada, y una meta que se mueve no es una meta.
  const medallas = evaluarMedallas({ modulos: MODULOS, leidos: { a: true, b: true } })
  const m2 = medallas.find((m) => m.id === 'modulo-m2')
  assert.equal(m2.total, 3, 'el total de un módulo depende de lo liberado')
  assert.equal(m2.hecho, 0)
})

test('leer todo un módulo concede su medalla', () => {
  const medallas = evaluarMedallas({ modulos: MODULOS, leidos: { a: true, b: true } })
  const m1 = medallas.find((m) => m.id === 'modulo-m1')
  assert.equal(m1.conseguida, true)
  assert.equal(m1.hecho, 2)
})

test('la primera lección concede «Primer paso», y solo cuenta una vez', () => {
  const uno = evaluarMedallas({ modulos: MODULOS, leidos: { a: true } })
  assert.equal(uno.find((m) => m.id === 'primer-paso').conseguida, true)
  const dos = evaluarMedallas({ modulos: MODULOS, leidos: { a: true, b: true } })
  const paso = dos.find((m) => m.id === 'primer-paso')
  assert.equal(paso.hecho, 1, 'el contador se pasó de su propia meta')
  assert.equal(paso.total, 1)
})

test('un quiz perfecto concede su medalla; uno del 90 % no', () => {
  const casi = evaluarMedallas({ modulos: MODULOS, quizzes: { a: { aciertos: 9, total: 10 } } })
  assert.equal(casi.find((m) => m.id === 'quiz-perfecto').conseguida, false)
  const pleno = evaluarMedallas({ modulos: MODULOS, quizzes: { a: { aciertos: 10, total: 10 } } })
  assert.equal(pleno.find((m) => m.id === 'quiz-perfecto').conseguida, true)
})

test('un quiz con total 0 no cuenta ni divide por cero', () => {
  const medallas = evaluarMedallas({ modulos: MODULOS, quizzes: { a: { aciertos: 0, total: 0 } } })
  const m = medallas.find((x) => x.id === 'quiz-perfecto')
  assert.equal(m.hecho, 0)
  assert.ok(Number.isFinite(m.fraccion))
})

test('un examen general aprobado concede su medalla; uno suspendido no', () => {
  const no = evaluarMedallas({ modulos: MODULOS, examenes: [{ aciertos: 6, total: 10 }] })
  assert.equal(no.find((m) => m.id === 'examen-aprobado').conseguida, false)
  const si = evaluarMedallas({ modulos: MODULOS, examenes: [{ aciertos: 7, total: 10 }] })
  assert.equal(si.find((m) => m.id === 'examen-aprobado').conseguida, true)
})

test('la racha alimenta sus medallas y se recalcula del historial, no del campo', () => {
  // `racha.actual` guardado puede estar viejo: si alguien no entra en un mes,
  // nadie escribió nada y el campo seguiría diciendo 9. Lo que vale es el
  // historial.
  const actividad = {}
  for (let i = 0; i < 7; i += 1) actividad[`2026-09-0${i + 1}`] = 1
  const medallas = evaluarMedallas({
    modulos: MODULOS,
    actividad,
    racha: { actual: 99, mejor: 99, ultimoDia: '2026-09-07' },
    hoy: '2026-09-07',
  })
  assert.equal(medallas.find((m) => m.id === 'racha-7').conseguida, true)
  assert.equal(medallas.find((m) => m.id === 'racha-30').hecho, 7,
    'la medalla se fio del campo guardado en vez del historial')
})

test('NINGUNA medalla premia la rapidez', () => {
  // Es material clínico: premiar «terminó vía aérea en dos horas» premia
  // exactamente la conducta que no se quiere. Si alguien añade una, esto falla.
  const sospechosas = /r[áa]pid|veloz|minuto|en menos de|contrarreloj|tiempo r[ée]cord/i
  for (const m of catalogoDeMedallas(MODULOS)) {
    assert.doesNotMatch(`${m.titulo} ${m.pista}`, sospechosas, `«${m.titulo}» premia la rapidez`)
  }
})

test('el catálogo no tiene ids repetidos', () => {
  const ids = catalogoDeMedallas(MODULOS).map((m) => m.id)
  assert.equal(new Set(ids).size, ids.length)
})

// ------------------------------------------------------------
//  El desbloqueo principal
// ------------------------------------------------------------

test('el desbloqueo principal es UNO y nunca una ya conseguida', () => {
  const medallas = evaluarMedallas({ modulos: MODULOS, leidos: { a: true, b: true } })
  const uno = desbloqueoPrincipal(medallas)
  assert.ok(uno)
  assert.equal(uno.conseguida, false)
})

test('prefiere la que está EMPEZADA antes que una a cero con meta pequeña', () => {
  // Una medalla a cero no está más cerca por tener la meta pequeña: quien lleva
  // 2 de 3 de un módulo está más cerca que quien no ha tocado un objetivo de 1.
  const medallas = [
    { id: 'sin-empezar', hecho: 0, total: 1, fraccion: 0, conseguida: false },
    { id: 'empezada', hecho: 2, total: 3, fraccion: 2 / 3, conseguida: false },
  ]
  assert.equal(desbloqueoPrincipal(medallas).id, 'empezada')
})

test('a igual avance, la que necesita menos pasos', () => {
  const medallas = [
    { id: 'larga', hecho: 50, total: 100, fraccion: 0.5, conseguida: false },
    { id: 'corta', hecho: 5, total: 10, fraccion: 0.5, conseguida: false },
  ]
  assert.equal(desbloqueoPrincipal(medallas).id, 'corta')
})

test('a igualdad de todo, gana la del módulo que el alumno tiene abierto', () => {
  const medallas = [
    { id: 'otro', hecho: 1, total: 2, fraccion: 0.5, conseguida: false, moduloId: 'm9' },
    { id: 'suyo', hecho: 1, total: 2, fraccion: 0.5, conseguida: false, moduloId: 'm2' },
  ]
  assert.equal(desbloqueoPrincipal(medallas, { moduloAbiertoId: 'm2' }).id, 'suyo')
})

test('con todo conseguido no hay siguiente, y la pantalla lo puede decir', () => {
  const medallas = [{ id: 'x', hecho: 1, total: 1, fraccion: 1, conseguida: true }]
  assert.equal(desbloqueoPrincipal(medallas), null)
  assert.equal(desbloqueoPrincipal([]), null)
})

// ------------------------------------------------------------
//  El cableado, y la trampa que tiene
// ------------------------------------------------------------
//
//  `progreso/{uid}` valida su forma con `hasOnly(...)`. Si la aplicación empieza
//  a mandar una clave que la regla no lista, la escritura se RECHAZA, el
//  progreso deja de sincronizarse y el alumno no nota nada: el local sigue
//  funcionando y el único rastro queda en `registrar('progreso:guardar')`.
//
//  Es exactamente el fallo que R1 podía provocar al añadir `actividad` y
//  `racha`. Esta prueba compara las dos listas.

import { readFileSync } from 'node:fs'

const CONTEXTO = readFileSync(new URL('../src/context/ProgressContext.jsx', import.meta.url), 'utf8')
const REGLAS = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')

// Los campos del objeto que se pasa al `setDoc` del progreso.
function camposQueEscribe() {
  const desde = CONTEXTO.indexOf('fs.setDoc(')
  const cuerpo = CONTEXTO.slice(desde, CONTEXTO.indexOf('{ merge: true }', desde))
  return [...cuerpo.matchAll(/^\s{12}(\w+):/gm)].map((m) => m[1]).sort()
}

test('lo que la app escribe en `progreso` es exactamente lo que la regla admite', () => {
  const escribe = camposQueEscribe()

  // Lo que admite: el `hasOnly` de la regla.
  const trozo = REGLAS.slice(REGLAS.indexOf('match /progreso/{uid}'))
  const abre = trozo.indexOf('hasOnly(')
  const admite = [...trozo.slice(abre, trozo.indexOf(')', abre) + 1)
    .matchAll(/'([a-zA-Z]+)'/g)].map((m) => m[1]).sort()

  assert.ok(escribe.length >= 6, `no se leyó el setDoc del progreso (salió ${escribe})`)
  assert.deepEqual(escribe, admite,
    'ProgressContext y firestore.rules dejaron de coincidir. Un campo que la regla '
    + 'no lista NO da error visible: el progreso deja de sincronizarse en silencio.')
})

test('lo que se escribe también se vuelve a LEER al iniciar sesión', () => {
  // La otra mitad del mismo fallo, y es peor porque sí borra datos: si la
  // hidratación no recoge un campo, al entrar en otro dispositivo el estado
  // local nace sin él y la siguiente escritura lo machaca en el servidor.
  const desde = CONTEXTO.indexOf('snap.exists()')
  const hidrata = CONTEXTO.slice(desde, CONTEXTO.indexOf('} catch', desde))
  for (const campo of camposQueEscribe()) {
    if (campo === 'updatedAt') continue // lo pone el servidor, no se lee
    assert.match(hidrata, new RegExp(`\\b${campo}:`),
      `«${campo}» se escribe pero no se recupera al iniciar sesión: se perderá`)
  }
})

test('la actividad se apunta al leer, al resolver un quiz y al terminar un examen', () => {
  // Y en ningún otro sitio: abrir la aplicación y cerrarla no es estudiar, y
  // una racha que se mantiene sola no significa nada.
  const usos = (CONTEXTO.match(/conActividad\(/g) || []).length
  assert.equal(usos, 3, 'cambió dónde se apunta la actividad: son tres sitios, ni uno más')
  assert.match(CONTEXTO, /valor \? conActividad\(siguiente\) : siguiente/,
    'desmarcar un tema volvió a contar como actividad')
})

test('una medalla con meta CERO no se enseña', () => {
  // «Temario completo 0/0» llegó a verse en pantalla: pasa mientras el índice
  // de la academia viaja, y con una academia cuya clonación quedó incompleta.
  // Una casilla que dice 0/0 no se puede conseguir ni entender.
  const medallas = evaluarMedallas({ modulos: [] })
  assert.equal(medallas.filter((m) => m.total <= 0).length, 0)
  assert.equal(medallas.some((m) => m.id === 'temario-completo'), false,
    'sin temario, «Temario completo» no tiene meta y no debe salir')
})

test('sin temario siguen valiendo las medallas que solo dependen del alumno', () => {
  // La racha es suya, no de su academia: no desaparece porque el índice no
  // haya llegado.
  const medallas = evaluarMedallas({ modulos: [] })
  assert.ok(medallas.some((m) => m.id === 'racha-7'))
  assert.ok(medallas.some((m) => m.id === 'primer-paso'))
})

test('los textos concuerdan en número (un módulo de una sola lección)', () => {
  // «Lee las 1 lecciones de …» se leyó en pantalla. Pasa en las academias
  // pequeñas y en los datos de prueba.
  const [medalla] = catalogoDeMedallas([
    { id: 'uno', numero: 1, titulo: 'Único', temas: [{ id: 'x' }] },
  ]).filter((m) => m.moduloId === 'uno')
  assert.equal(medalla.pista, 'Lee la lección de «Único».')

  const [varias] = catalogoDeMedallas(MODULOS).filter((m) => m.moduloId === 'm2')
  assert.match(varias.pista, /Lee las 3 lecciones/)
})
