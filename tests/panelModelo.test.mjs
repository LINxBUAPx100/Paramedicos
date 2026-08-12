// ============================================================
//  Pruebas de lib/panelModelo.js — módulo puro (Bloque O)
// ------------------------------------------------------------
//  Dos cosas que antes no se podían comprobar sin montar React:
//   1. Qué secciones ve cada rol (un profesor NO debe ver Grupos ni Mi
//      academia; el editor depende del plan o de un permiso explícito).
//   2. La aritmética de las estadísticas, que vivía dentro del componente.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  APROBADO, SECCIONES_PANEL, seccionesPanel, agregarIntentos, pasaFiltroGrupo,
  resumenAcademia, totalTemas, contarTemasOcultos, estadoFase, focoBaraja, mensajeError,
} from '../src/lib/panelModelo.js'

const ids = (secciones) => secciones.map((s) => s.id)

test('el director ve todo su panel; el editor depende del plan', () => {
  const pro = seccionesPanel({ rol: 'admin_escuela', capacidades: { editorContenido: true } })
  assert.deepEqual(ids(pro), ['resumen', 'miembros', 'grupos', 'accesos', 'contenido', 'academia'])

  // Plan BASE: sin editor de contenido, la sección no existe (no un botón que
  // lleve a una pantalla que le va a decir que no puede).
  const base = seccionesPanel({ rol: 'admin_escuela', capacidades: { editorContenido: false } })
  assert.deepEqual(ids(base), ['resumen', 'miembros', 'grupos', 'accesos', 'academia'])
})

test('el profesor entra al mismo armazón con menos secciones', () => {
  const profe = seccionesPanel({ rol: 'instructor' })
  assert.deepEqual(ids(profe), ['resumen', 'miembros', 'accesos'])

  // Un permiso editorial explícito le abre Contenido, aunque no dirija nada.
  const conPermiso = seccionesPanel({
    rol: 'instructor',
    capacidades: { editorContenido: true }, // la capacidad del plan no le basta…
    permisosEditor: { editarContenido: true }, // …el permiso propio sí
  })
  assert.deepEqual(ids(conPermiso), ['resumen', 'miembros', 'accesos', 'contenido'])

  // Y la capacidad del plan por sí sola NO le abre el editor.
  const sinPermiso = seccionesPanel({ rol: 'instructor', capacidades: { editorContenido: true } })
  assert.equal(ids(sinPermiso).includes('contenido'), false)
})

test('sin datos de sesión no se inventan secciones', () => {
  assert.deepEqual(ids(seccionesPanel()), ['resumen', 'miembros', 'accesos'])
  assert.deepEqual(ids(seccionesPanel({ rol: null, capacidades: null, permisosEditor: null })),
    ['resumen', 'miembros', 'accesos'])
})

test('todas las secciones del catálogo cuelgan de /panel', () => {
  for (const s of SECCIONES_PANEL) {
    assert.ok(s.ruta === '/panel' || s.ruta.startsWith('/panel/'), `${s.id}: ${s.ruta}`)
    assert.ok(s.etiqueta && s.icono, `${s.id} necesita etiqueta e icono`)
  }
})

test('agregarIntentos conserva la MEJOR calificación y cuenta los intentos', () => {
  const map = agregarIntentos([
    { uid: 'a', faseId: 'f1', porcentaje: 40, fecha: { seconds: 100 } },
    { uid: 'a', faseId: 'f1', porcentaje: 90, fecha: { seconds: 300 } },
    { uid: 'a', faseId: 'f1', porcentaje: 60, fecha: { seconds: 200 } },
    { uid: 'b', faseId: 'f2', porcentaje: 70, fecha: { seconds: 50 } },
  ])
  assert.deepEqual(map.a.f1, { mejor: 90, n: 3, ultimo: 300 })
  assert.deepEqual(map.b.f2, { mejor: 70, n: 1, ultimo: 50 })
})

test('agregarIntentos aguanta datos incompletos', () => {
  assert.deepEqual(agregarIntentos(null), {})
  const map = agregarIntentos([null, {}, { uid: 'a' }, { uid: 'a', faseId: 'f1' }])
  assert.equal(map.a.f1.n, 1)
  assert.equal(map.a.f1.mejor, 0)
  assert.equal(map.a.f1.ultimo, 0) // sin fecha: 0, que la UI pinta como vacío
})

test('el filtro de grupo distingue "todos" de "sin grupo"', () => {
  const conGrupo = { grupoId: 'GRP-1' }
  const sinGrupo = { grupoId: null }
  assert.equal(pasaFiltroGrupo(conGrupo, ''), true)
  assert.equal(pasaFiltroGrupo(sinGrupo, ''), true)
  assert.equal(pasaFiltroGrupo(sinGrupo, 'sin'), true)
  assert.equal(pasaFiltroGrupo(conGrupo, 'sin'), false)
  assert.equal(pasaFiltroGrupo(conGrupo, 'GRP-1'), true)
  assert.equal(pasaFiltroGrupo(conGrupo, 'GRP-2'), false)
})

test('resumenAcademia: promedio, aprobación, activos y riesgo', () => {
  const alumnos = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
  const porAlumno = {
    a: { f1: { mejor: 90, n: 1, ultimo: 10 }, f2: { mejor: 80, n: 1, ultimo: 20 } },
    b: { f1: { mejor: 50, n: 2, ultimo: 30 } },
    // 'c' no presentó nada: no es "activo" y no ensucia el promedio.
  }
  const r = resumenAcademia({
    alumnos,
    staff: [{ id: 'd' }],
    intentos: [],
    porAlumno,
    fases: [{ id: 'f1' }, { id: 'f2' }],
  })
  assert.equal(r.promedio, 73) // (90+80+50)/3
  assert.equal(r.aprobacion, 67) // 2 de 3 mejores ≥ 70
  assert.equal(r.activos, 2)
  assert.equal(r.totalAlumnos, 3)
  assert.equal(r.totalStaff, 1)
  assert.deepEqual(r.enRiesgo.map((x) => [x.id, x.prom]), [['b', 50]])
  assert.deepEqual(r.porFase.map((x) => [x.prom, x.presentaron]), [[70, 2], [80, 1]])
})

test('resumenAcademia: academia vacía no rompe ni inventa ceros', () => {
  const r = resumenAcademia({ fases: [{ id: 'f1' }] })
  assert.equal(r.promedio, null)
  assert.equal(r.aprobacion, null)
  assert.equal(r.activos, 0)
  assert.equal(r.semana, 0)
  assert.deepEqual(r.porFase, [{ fase: { id: 'f1' }, prom: null, presentaron: 0 }])
  assert.deepEqual(r.recientes, [])
})

test('resumenAcademia: "esta semana" no cuenta intentos de otros alumnos', () => {
  const ahora = 1_000_000_000_000 // ms
  const seg = ahora / 1000
  const r = resumenAcademia({
    alumnos: [{ id: 'a' }],
    porAlumno: { a: { f1: { mejor: 80, n: 3, ultimo: seg } } },
    intentos: [
      { uid: 'a', fecha: { seconds: seg - 3600 } }, // dentro
      { uid: 'a', fecha: { seconds: seg - 30 * 24 * 3600 } }, // fuera por antiguo
      { uid: 'z', fecha: { seconds: seg } }, // fuera: no es un alumno visible
    ],
    fases: [],
    ahora,
  })
  assert.equal(r.semana, 1)
  assert.equal(r.recientes.length, 2) // solo los de 'a', ya sin filtro de fecha
})

test('el umbral de aprobación es uno solo', () => {
  assert.equal(APROBADO, 70)
  const r = resumenAcademia({
    alumnos: [{ id: 'a' }],
    porAlumno: { a: { f1: { mejor: APROBADO, n: 1, ultimo: 1 } } },
    fases: [],
  })
  // Exactamente 70 aprueba y por tanto NO está en riesgo.
  assert.equal(r.aprobacion, 100)
  assert.deepEqual(r.enRiesgo, [])
})

test('contarTemasOcultos: una fase oculta arrastra todos sus temas', () => {
  const fases = [
    { id: 'f1', temas: [{ id: 't1' }, { id: 't2' }, { id: 't3' }] },
    { id: 'f2', temas: [{ id: 't4' }, { id: 't5' }] },
  ]
  assert.equal(totalTemas(fases), 5)
  assert.equal(contarTemasOcultos(fases, { fases: [], temas: [] }), 0)
  assert.equal(contarTemasOcultos(fases, { fases: ['f1'], temas: [] }), 3)
  assert.equal(contarTemasOcultos(fases, { fases: [], temas: ['t4'] }), 1)
  // Un tema marcado dentro de una fase ya oculta no se cuenta dos veces.
  assert.equal(contarTemasOcultos(fases, { fases: ['f1'], temas: ['t1', 't4'] }), 4)
  assert.equal(contarTemasOcultos(fases, null), 0)
  assert.equal(totalTemas(null), 0)
})

test('estadoFase resume la fase de un vistazo', () => {
  const fase = { id: 'f1', temas: [{ id: 't1' }, { id: 't2' }, { id: 't3' }] }

  assert.deepEqual(estadoFase(fase, { fases: [], temas: [] }),
    { estado: 'visible', porModulo: false, visibles: 3, total: 3 })

  assert.deepEqual(estadoFase(fase, { fases: [], temas: ['t2'] }),
    { estado: 'parcial', porModulo: false, visibles: 2, total: 3 })

  // Oculta con el ojo del MÓDULO: se deshace de una vez.
  assert.deepEqual(estadoFase(fase, { fases: ['f1'], temas: [] }),
    { estado: 'oculta', porModulo: true, visibles: 0, total: 3 })

  // Oculta porque están tachados todos sus temas: se deshace tema a tema.
  assert.deepEqual(estadoFase(fase, { fases: [], temas: ['t1', 't2', 't3'] }),
    { estado: 'oculta', porModulo: false, visibles: 0, total: 3 })
})

test('estadoFase no llama "oculta" a una fase sin temas', () => {
  // Una fase vacía tiene 0 visibles de 0, que NO es lo mismo que estar oculta:
  // pintarla tachada sería mentirle al director.
  assert.deepEqual(estadoFase({ id: 'f9', temas: [] }, { fases: [], temas: [] }),
    { estado: 'visible', porModulo: false, visibles: 0, total: 0 })
  assert.equal(estadoFase(null, null).estado, 'visible')
})

test('focoBaraja: las flechas dan la vuelta y solo responde a sus teclas', () => {
  assert.equal(focoBaraja(0, 'ArrowDown', 8), 1)
  assert.equal(focoBaraja(7, 'ArrowDown', 8), 0) // vuelve al principio
  assert.equal(focoBaraja(0, 'ArrowUp', 8), 7) // y al final
  assert.equal(focoBaraja(3, 'ArrowRight', 8), 4)
  assert.equal(focoBaraja(3, 'ArrowLeft', 8), 2)
  assert.equal(focoBaraja(3, 'Home', 8), 0)
  assert.equal(focoBaraja(3, 'End', 8), 7)

  // Teclas ajenas: null, para NO tragarse el evento (Tab tiene que seguir
  // saliendo del acordeón, y Enter/Espacio los gestiona el propio botón).
  for (const tecla of ['Tab', 'Enter', ' ', 'a', 'Escape', 'PageDown']) {
    assert.equal(focoBaraja(3, tecla, 8), null, tecla)
  }
  // Sin fases no hay dónde poner el foco.
  assert.equal(focoBaraja(0, 'ArrowDown', 0), null)
})

test('mensajeError nombra la colección cuando faltan reglas', () => {
  const denegado = { code: 'permission-denied' }
  assert.match(mensajeError(denegado, 'No se pudo crear', 'grupos'), /colección "grupos"/)
  assert.match(mensajeError(denegado, 'No se pudo crear'), /colección "codigos"/)
  assert.equal(mensajeError(new Error('offline'), 'No se pudo crear'), 'No se pudo crear (revisa tu conexión).')
})
