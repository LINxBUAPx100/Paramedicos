// ============================================================
//  Pruebas de los grupos de una persona (Fase 2: multi-grupo)
// ------------------------------------------------------------
//  Lo que se protege:
//
//  1. Que un profesor con varios grupos los tenga TODOS, y que uno que aún no
//     ha sido reasignado siga funcionando con el suyo de siempre (sin migrar
//     ningún documento).
//  2. Que un ALUMNO no gane grupos por esta vía. Su grupo lleva el programaId,
//     o sea el plan de estudios que decide qué temario lee: si `grupoIds`
//     valiera para él, el aislamiento entre Enfermería y TUM se abriría por
//     una puerta lateral.
//  3. Que la preferencia guardada en el navegador no conceda nada.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
  MAX_GRUPOS, esStaff, normalizarGrupoIds, gruposDeUsuario, grupoActivoDe,
  puedeElegirGrupo, gruposDelPanel, validarGrupoIds, camposDeAsignacion,
  filtroDeGrupoDelPanel,
} from '../src/lib/gruposDeUsuario.js'

const GRUPOS_ACADEMIA = [
  { id: 'G-1', nombre: 'TUM Mañana' },
  { id: 'G-2', nombre: 'TUM Tarde' },
  { id: 'G-3', nombre: 'Enfermería' },
]

// --- Compatibilidad: nada que migrar ----------------------------------------

test('un profesor sin grupoIds conserva su grupo de siempre', () => {
  // Es el estado de TODOS los profesores actuales. Si esto fallara, la fase
  // exigiría migrar la base de datos antes de desplegar.
  const perfil = { rol: 'instructor', grupoId: 'G-1' }
  assert.deepEqual(gruposDeUsuario(perfil), ['G-1'])
  assert.equal(grupoActivoDe({ perfil }), 'G-1')
})

test('un profesor con grupoIds los lleva todos', () => {
  const perfil = { rol: 'instructor', grupoId: 'G-1', grupoIds: ['G-1', 'G-2', 'G-3'] }
  assert.deepEqual(gruposDeUsuario(perfil), ['G-1', 'G-2', 'G-3'])
})

test('la lista manda sobre el campo viejo cuando existen los dos', () => {
  // Quitarle un grupo a un profesor debe QUITÁRSELO. Si el `grupoId` heredado
  // se colara de vuelta, una retirada de acceso no surtiría efecto.
  const perfil = { rol: 'instructor', grupoId: 'G-1', grupoIds: ['G-2'] }
  assert.deepEqual(gruposDeUsuario(perfil), ['G-2'])
})

test('sin ningún grupo la lista queda vacía, no con un hueco', () => {
  assert.deepEqual(gruposDeUsuario({ rol: 'instructor' }), [])
  assert.deepEqual(gruposDeUsuario({ rol: 'instructor', grupoId: '  ' }), [])
  assert.deepEqual(gruposDeUsuario({ rol: 'instructor', grupoIds: [] }), [])
  assert.equal(grupoActivoDe({ perfil: { rol: 'instructor' } }), null)
})

// --- El alumno no entra por aquí --------------------------------------------

test('un alumno NUNCA obtiene varios grupos, aunque el documento los traiga', () => {
  // El caso que importa: un documento manipulado o un arrastre de datos. El
  // grupo de un alumno decide su plan de estudios; dos planes a la vez no es
  // algo que el producto contemple y no puede colarse por este camino.
  const perfil = { rol: 'alumno', grupoId: 'G-1', grupoIds: ['G-1', 'G-2', 'G-3'] }
  assert.deepEqual(gruposDeUsuario(perfil), ['G-1'])
  assert.equal(grupoActivoDe({ perfil, elegido: 'G-3' }), 'G-1')
})

test('esStaff distingue quién puede llevar varios grupos', () => {
  assert.ok(esStaff('instructor'))
  assert.ok(esStaff('admin_escuela'))
  assert.ok(esStaff('superadmin'))
  assert.ok(!esStaff('alumno'))
  assert.ok(!esStaff(undefined))
})

// --- La elección guardada no concede nada -----------------------------------

test('elegir un grupo que no es tuyo no te lo da', () => {
  // `elegido` sale de localStorage, que el usuario puede editar. Debe poder
  // cambiar SU vista entre SUS grupos y nada más.
  const perfil = { rol: 'instructor', grupoIds: ['G-1', 'G-2'] }
  assert.equal(grupoActivoDe({ perfil, elegido: 'G-2' }), 'G-2')
  assert.equal(grupoActivoDe({ perfil, elegido: 'G-9' }), 'G-1', 'un id ajeno cae al primero suyo')
  assert.equal(grupoActivoDe({ perfil, elegido: '' }), 'G-1')
  assert.equal(grupoActivoDe({ perfil, elegido: null }), 'G-1')
})

test('el selector solo aparece cuando hay algo que elegir', () => {
  assert.ok(puedeElegirGrupo('instructor', ['G-1', 'G-2']))
  assert.ok(!puedeElegirGrupo('instructor', ['G-1']), 'un desplegable de una opción es ruido')
  assert.ok(!puedeElegirGrupo('instructor', []))
  // El director no elige aquí: su filtro del panel abarca la academia entera.
  assert.ok(!puedeElegirGrupo('admin_escuela', ['G-1', 'G-2']))
  assert.ok(!puedeElegirGrupo('alumno', ['G-1', 'G-2']))
})

// --- Qué ofrece el panel ----------------------------------------------------

test('el panel ofrece al director toda la academia y al profesor solo lo suyo', () => {
  assert.deepEqual(
    gruposDelPanel({ rol: 'admin_escuela', perfil: {}, gruposDeAcademia: GRUPOS_ACADEMIA }),
    GRUPOS_ACADEMIA
  )
  assert.deepEqual(
    gruposDelPanel({
      rol: 'instructor',
      perfil: { rol: 'instructor', grupoIds: ['G-3', 'G-1'] },
      gruposDeAcademia: GRUPOS_ACADEMIA,
    }).map((g) => g.id),
    ['G-1', 'G-3'],
    'se ordenan como los lista la academia, no como se los asignaron'
  )
  assert.deepEqual(gruposDelPanel({ rol: 'alumno', perfil: {}, gruposDeAcademia: GRUPOS_ACADEMIA }), [])
})

test('un grupo borrado desaparece del selector en vez de ofrecer un callejón', () => {
  const perfil = { rol: 'instructor', grupoIds: ['G-1', 'G-BORRADO'] }
  const ofrecidos = gruposDelPanel({ rol: 'instructor', perfil, gruposDeAcademia: GRUPOS_ACADEMIA })
  assert.deepEqual(ofrecidos.map((g) => g.id), ['G-1'])
})

// --- Normalización y validación ---------------------------------------------

test('normalizar: sin repetidos, sin vacíos, sin basura y en orden estable', () => {
  assert.deepEqual(
    normalizarGrupoIds(['G-2', ' G-1 ', 'G-2', '', null, 7, undefined, 'G-3']),
    ['G-2', 'G-1', 'G-3']
  )
  assert.deepEqual(normalizarGrupoIds(null), [])
  assert.deepEqual(normalizarGrupoIds('G-1'), [], 'una cadena suelta no es una lista')
})

test('validar: rechaza grupos de otra academia y listas desmedidas', () => {
  assert.equal(validarGrupoIds(['G-1', 'G-2'], GRUPOS_ACADEMIA), '')
  assert.equal(validarGrupoIds([], GRUPOS_ACADEMIA), '', 'quitarle todos los grupos es válido')
  assert.match(validarGrupoIds(['G-1', 'AJENO'], GRUPOS_ACADEMIA), /no son de tu academia/)
  assert.match(
    validarGrupoIds(Array.from({ length: MAX_GRUPOS + 1 }, (_, i) => `G${i}`), []),
    /no puede llevar más de/
  )
  assert.match(validarGrupoIds('G-1', GRUPOS_ACADEMIA), /no es válida/)
})

// --- Lo que se escribe ------------------------------------------------------

test('al asignar se escriben los DOS campos y quedan de acuerdo', () => {
  // El `grupoId` viejo se sigue leyendo en sitios que esta fase no toca
  // (invitaciones, códigos, la regla de Firestore). Dejarlos en desacuerdo es
  // la clase de incoherencia que reaparece meses después.
  assert.deepEqual(camposDeAsignacion(['G-2', 'G-1']), { grupoIds: ['G-2', 'G-1'], grupoId: 'G-2' })
  assert.deepEqual(camposDeAsignacion([]), { grupoIds: [], grupoId: null })
  assert.deepEqual(
    camposDeAsignacion(['G-1', 'G-1', ' G-2 ']),
    { grupoIds: ['G-1', 'G-2'], grupoId: 'G-1' }
  )
})

test('quitarle todos los grupos no le deja el último puesto', () => {
  const { grupoId, grupoIds } = camposDeAsignacion([])
  assert.equal(grupoId, null)
  assert.deepEqual(grupoIds, [])
  // Y con esos campos aplicados, no le queda ningún grupo.
  assert.deepEqual(gruposDeUsuario({ rol: 'instructor', grupoId, grupoIds }), [])
})

// --- Con qué grupo filtra el panel ------------------------------------------

test('el panel de un profesor SIN grupos no filtra: no enseña a nadie', () => {
  // La distinción que importa: `''` es «todos» y `null` es «ninguno». Si un
  // profesor sin grupos cayera en `''`, vería la academia entera justo debajo
  // del aviso de que no tiene ningún grupo asignado.
  assert.equal(filtroDeGrupoDelPanel({ rol: 'instructor', misGrupos: [] }), null)
  assert.notEqual(filtroDeGrupoDelPanel({ rol: 'instructor', misGrupos: [] }), '')
})

test('el panel de un profesor filtra por el grupo que tiene abierto', () => {
  const misGrupos = [{ id: 'G-1' }, { id: 'G-2' }]
  assert.equal(filtroDeGrupoDelPanel({ rol: 'instructor', misGrupos, grupoActivoId: 'G-2' }), 'G-2')
  // Un grupo activo que ya no es suyo (se lo retiraron) cae al primero suyo,
  // no a «todos»: retirarle un grupo no puede ampliarle la vista.
  assert.equal(filtroDeGrupoDelPanel({ rol: 'instructor', misGrupos, grupoActivoId: 'G-9' }), 'G-1')
  assert.equal(filtroDeGrupoDelPanel({ rol: 'instructor', misGrupos }), 'G-1')
})

test('el director conserva su filtro libre, incluido «todos»', () => {
  assert.equal(filtroDeGrupoDelPanel({ rol: 'admin_escuela', filtroDirector: '' }), '')
  assert.equal(filtroDeGrupoDelPanel({ rol: 'admin_escuela', filtroDirector: 'G-3' }), 'G-3')
  assert.equal(filtroDeGrupoDelPanel({ rol: 'admin_escuela', filtroDirector: 'sin' }), 'sin')
})

test('quien no es staff no filtra nada porque el panel no es suyo', () => {
  assert.equal(filtroDeGrupoDelPanel({ rol: 'alumno', misGrupos: [{ id: 'G-1' }] }), null)
})

test('el filtro acepta ids sueltos además de documentos de grupo', () => {
  assert.equal(filtroDeGrupoDelPanel({ rol: 'instructor', misGrupos: ['G-1', 'G-2'], grupoActivoId: 'G-2' }), 'G-2')
})
