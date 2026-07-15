// Pruebas de Fase 6 (matriz de permisos editoriales, PURA): normalización,
// validación, capacidades por rol, permiso por acción y por campo de contenido.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  PERMISOS_EDITOR, PERMISOS_VACIO, ETIQUETA_PERMISO, DESCRIPCION_PERMISO,
  normalizarPermisos, validarPermisos, tienePermisoEditor, cursosPermitidosDe,
  capacidadesEditor, permisoDeAccion, permisoAccionEditor,
  permisosRequeridosPorContenido,
} from '../src/lib/permisosEditor.js'

// ---------- catálogo ----------

test('catálogo: 6 permisos booleanos con etiqueta y descripción', () => {
  assert.equal(PERMISOS_EDITOR.length, 6)
  for (const k of PERMISOS_EDITOR) {
    assert.ok(ETIQUETA_PERMISO[k], `falta etiqueta de ${k}`)
    assert.ok(DESCRIPCION_PERMISO[k], `falta descripción de ${k}`)
  }
  assert.deepEqual(PERMISOS_VACIO.cursosPermitidos, [])
  assert.equal(PERMISOS_VACIO.editarContenido, false)
})

// ---------- normalización ----------

test('normalizar: solo claves conocidas, booleanos estrictos, cursos sin duplicados', () => {
  const n = normalizarPermisos({
    editarContenido: 'sí',              // no booleano → false
    editarExamenes: true,
    inventado: true,                     // clave basura → descartada
    cursosPermitidos: ['A__x', 'A__x', 'A__y', 5, ''],
  })
  assert.equal(n.editarContenido, false)
  assert.equal(n.editarExamenes, true)
  assert.equal('inventado' in n, false)
  assert.deepEqual(n.cursosPermitidos, ['A__x', 'A__y'])
  // Entrada nula/rara → todo apagado.
  assert.deepEqual(normalizarPermisos(null), { ...PERMISOS_VACIO })
  assert.deepEqual(normalizarPermisos('x').cursosPermitidos, [])
})

// ---------- validación ----------

test('validar: claves y tipos', () => {
  assert.match(validarPermisos({ inventado: true }), /desconocido/)
  assert.match(validarPermisos({ editarContenido: 'x' }), /verdadero o falso/)
  assert.match(validarPermisos({ cursosPermitidos: [1, 2] }), /cursos permitidos/)
  assert.equal(validarPermisos(null), 'Permisos inválidos.')
  assert.equal(validarPermisos([]), 'Permisos inválidos.')
})

test('validar: revocar todo es válido; acción sin editarContenido no', () => {
  assert.equal(validarPermisos({ ...PERMISOS_VACIO }), null)
  assert.equal(validarPermisos({}), null)
  assert.match(
    validarPermisos({ editarExamenes: true }),
    /Editar contenido/
  )
  assert.equal(
    validarPermisos({ editarContenido: true, editarExamenes: true, cursosPermitidos: ['A__x'] }),
    null
  )
})

test('validar: cursosPermitidos debe ser subconjunto de los cursos reales', () => {
  const disp = ['A__tum', 'A__rcp']
  assert.equal(
    validarPermisos({ editarContenido: true, cursosPermitidos: ['A__tum'] }, disp),
    null
  )
  assert.match(
    validarPermisos({ editarContenido: true, cursosPermitidos: ['A__fantasma'] }, disp),
    /no pertenece a esta academia/
  )
})

// ---------- consultas ----------

test('tienePermisoEditor / cursosPermitidosDe leen del perfil normalizado', () => {
  const perfil = { permisosEditor: { editarContenido: true, cursosPermitidos: ['A__x'] } }
  assert.equal(tienePermisoEditor(perfil, 'editarContenido'), true)
  assert.equal(tienePermisoEditor(perfil, 'publicarContenido'), false)
  assert.equal(tienePermisoEditor({}, 'editarContenido'), false)
  assert.deepEqual(cursosPermitidosDe(perfil), ['A__x'])
  assert.deepEqual(cursosPermitidosDe({}), [])
})

// ---------- capacidades por rol ----------

test('capacidadesEditor: super y director todo; alumno nada', () => {
  const todo = capacidadesEditor({ esSuperadmin: true })
  assert.ok(PERMISOS_EDITOR.every((k) => todo[k] === true))
  const dir = capacidadesEditor({ rol: 'admin_escuela' })
  assert.ok(PERMISOS_EDITOR.every((k) => dir[k] === true))
  const alum = capacidadesEditor({ rol: 'alumno' })
  assert.ok(PERMISOS_EDITOR.every((k) => alum[k] === false))
})

test('capacidadesEditor: el instructor refleja EXACTAMENTE sus permisos', () => {
  const caps = capacidadesEditor({
    rol: 'instructor',
    perfil: { permisosEditor: { editarContenido: true, editarExamenes: true, cursosPermitidos: ['A__x'] } },
  })
  assert.equal(caps.editarContenido, true)
  assert.equal(caps.editarExamenes, true)
  assert.equal(caps.publicarContenido, false)
  assert.equal(caps.crearTemas, false)
  // Sin permisos concedidos: nada.
  const vacio = capacidadesEditor({ rol: 'instructor', perfil: {} })
  assert.ok(PERMISOS_EDITOR.every((k) => vacio[k] === false))
})

// ---------- permiso por acción ----------

test('permisoDeAccion: mapea crear/duplicar y publicar/archivar', () => {
  assert.equal(permisoDeAccion('crear-tema'), 'crearTemas')
  assert.equal(permisoDeAccion('crear-fase'), 'crearTemas')
  assert.equal(permisoDeAccion('duplicar-modulo'), 'crearTemas')
  assert.equal(permisoDeAccion('publicar-tema'), 'publicarContenido')
  assert.equal(permisoDeAccion('despublicar-curso'), 'publicarContenido')
  assert.equal(permisoDeAccion('archivar-fase'), 'publicarContenido')
  assert.equal(permisoDeAccion('restaurar-tema'), 'publicarContenido')
  // Editar campos / mover / reordenar → solo el permiso base (null).
  assert.equal(permisoDeAccion('editar-tema'), null)
  assert.equal(permisoDeAccion('mover-modulo'), null)
  assert.equal(permisoDeAccion('reordenar-fase'), null)
})

test('permisoAccionEditor: el instructor necesita el permiso fino; super/director no', () => {
  const perfil = { permisosEditor: { editarContenido: true, cursosPermitidos: ['A__x'] } }
  // super y director pasan cualquier acción.
  assert.equal(permisoAccionEditor({ esSuperadmin: true, accion: 'crear-tema' }).permitido, true)
  assert.equal(permisoAccionEditor({ rol: 'admin_escuela', accion: 'publicar-tema' }).permitido, true)
  // instructor sin crearTemas → bloqueado al crear; editar sí (acción base).
  assert.equal(permisoAccionEditor({ rol: 'instructor', perfil, accion: 'crear-tema' }).permitido, false)
  assert.equal(permisoAccionEditor({ rol: 'instructor', perfil, accion: 'editar-tema' }).permitido, true)
  assert.equal(permisoAccionEditor({ rol: 'instructor', perfil, accion: 'publicar-tema' }).permitido, false)
  // Con el permiso concedido, pasa.
  const conPub = { permisosEditor: { editarContenido: true, publicarContenido: true, cursosPermitidos: ['A__x'] } }
  assert.equal(permisoAccionEditor({ rol: 'instructor', perfil: conPub, accion: 'publicar-tema' }).permitido, true)
})

// ---------- permiso por campo de contenido ----------

test('permisosRequeridosPorContenido: detecta cambios de quiz/actividades/recursos', () => {
  const antes = {
    quiz: [{ pregunta: 'a', opciones: ['x', 'y'], correcta: 0 }],
    actividades: null,
    recursos: null,
  }
  // Cambiar el quiz → editarExamenes.
  assert.deepEqual(
    permisosRequeridosPorContenido(antes, { ...antes, quiz: [{ pregunta: 'b', opciones: ['x', 'y'], correcta: 1 }] }),
    ['editarExamenes']
  )
  // Añadir un recurso → administrarRecursos.
  assert.deepEqual(
    permisosRequeridosPorContenido(antes, { ...antes, recursos: { videos: [{ titulo: 'v', url: 'https://x' }] } }),
    ['administrarRecursos']
  )
  // Añadir actividad → editarActividades.
  assert.deepEqual(
    permisosRequeridosPorContenido(antes, { ...antes, actividades: { ordenar: { titulo: 't', pasos: ['1', '2'] } } }),
    ['editarActividades']
  )
})

test('permisosRequeridosPorContenido: vacío y nulo son equivalentes (sin falsos positivos)', () => {
  // null ↔ objeto totalmente vacío ↔ arreglos vacíos: no exigen permiso.
  assert.deepEqual(
    permisosRequeridosPorContenido(
      { quiz: [], actividades: null, recursos: null },
      { quiz: [], actividades: { ordenar: null, completar: [], preguntas: [] }, recursos: { videos: [], fuentes: [], imagenes: [], archivos: [] } }
    ),
    []
  )
  // Mismo contenido, distinto orden de claves → sin cambio.
  assert.deepEqual(
    permisosRequeridosPorContenido(
      { recursos: { videos: [{ titulo: 'v', url: 'u' }] } },
      { recursos: { videos: [{ url: 'u', titulo: 'v' }] } }
    ),
    []
  )
})
