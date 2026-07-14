// Pruebas de Fase 3 (editor estructural PURO): creación, jerarquía, orden,
// mover, duplicar, archivar/restaurar, publicación y permisos.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ESTADOS_NODO, LIMITE_TITULO, validarTitulo, slugDe, idUnico, tipoDeRef,
  localizar, idsDeTemas, validarEstructura,
  crearFase, crearModulo, crearTema, actualizarNodo,
  reordenarNodo, moverNodo, duplicarNodo,
  archivarNodo, restaurarNodo, despublicarNodo, publicarNodo,
  contarDescendientesActivos, nuevoCurso, duplicadoDeCurso, permisoEdicion,
} from '../src/lib/editorModelo.js'
import { ensamblarFases } from '../src/lib/contenidoApi.js'

// Estructura de juego: 2 fases, la primera con 2 módulos y 3 temas.
function base() {
  return [
    {
      id: 'f1', titulo: 'Fase 1', estado: 'publicado',
      modulos: [
        {
          id: 'm1', titulo: 'Módulo 1', estado: 'publicado',
          temas: [
            { id: 't1', titulo: 'Tema 1', estado: 'publicado' },
            { id: 't2', titulo: 'Tema 2', estado: 'borrador' },
          ],
        },
        { id: 'm2', titulo: 'Módulo 2', estado: 'publicado', temas: [{ id: 't3', titulo: 'Tema 3', estado: 'publicado' }] },
      ],
    },
    { id: 'f2', titulo: 'Fase 2', estado: 'publicado', modulos: [] },
  ]
}

// ---------- creación y jerarquía ----------

test('crear: fase, módulo y tema nacen en borrador y con ids únicos', () => {
  let e = base()
  const rf = crearFase(e, { titulo: 'Fase nueva' })
  assert.equal(rf.nodo.estado, 'borrador')
  assert.equal(rf.nodo.id, 'fase-nueva')
  const rm = crearModulo(rf.estructura, { faseId: 'fase-nueva', titulo: 'Módulo nuevo' })
  assert.equal(rm.nodo.estado, 'borrador')
  const rt = crearTema(rm.estructura, { faseId: 'fase-nueva', moduloId: 'modulo-nuevo', titulo: 'Tema 1' })
  // 'tema-1' colisionaría con t1? no: los ids se calculan del TÍTULO y t1 se llama 't1'.
  assert.equal(rt.nodo.id, 'tema-1')
  assert.equal(validarEstructura(rt.estructura), null)
  // La original nunca se muta.
  assert.equal(e.length, 2)
})

test('crear: id de tema único a nivel CURSO (no solo por módulo)', () => {
  let e = base()
  const r1 = crearTema(e, { faseId: 'f1', moduloId: 'm1', titulo: 'RCP' })
  const r2 = crearTema(r1.estructura, { faseId: 'f1', moduloId: 'm2', titulo: 'RCP' })
  assert.equal(r1.nodo.id, 'rcp')
  assert.equal(r2.nodo.id, 'rcp-2')
  const ids = idsDeTemas(r2.estructura)
  assert.equal(new Set(ids).size, ids.length)
})

test('crear: título vacío o demasiado largo se rechaza', () => {
  assert.throws(() => crearFase(base(), { titulo: '   ' }), /título/i)
  assert.throws(() => crearTema(base(), { faseId: 'f1', moduloId: 'm1', titulo: 'x'.repeat(LIMITE_TITULO + 1) }), /largo/i)
  assert.equal(validarTitulo('Correcto'), null)
})

test('crear: padre inválido o archivado se rechaza', () => {
  assert.throws(() => crearModulo(base(), { faseId: 'no-existe', titulo: 'X' }), /No existe la fase/)
  assert.throws(() => crearTema(base(), { faseId: 'f1', moduloId: 'no-existe', titulo: 'X' }), /No existe el módulo/)
  const { estructura } = archivarNodo(base(), { faseId: 'f1' })
  assert.throws(() => crearModulo(estructura, { faseId: 'f1', titulo: 'X' }), /archivada/)
})

// ---------- edición ----------

test('actualizar: solo campos permitidos por tipo', () => {
  const r = actualizarNodo(base(), { faseId: 'f1' }, { titulo: 'Fase renombrada', descripcion: 'Desc' })
  assert.equal(r.nodo.titulo, 'Fase renombrada')
  assert.throws(() => actualizarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' }, { resumen: 'x' }), /no se puede editar/)
  assert.throws(() => actualizarNodo(base(), { faseId: 'f1' }, { estado: 'publicado' }), /no se puede editar/)
})

// ---------- orden ----------

test('reordenar: arriba/abajo/inicio/fin y límites', () => {
  let r = reordenarNodo(base(), { faseId: 'f2' }, 'arriba')
  assert.deepEqual(r.estructura.map((f) => f.id), ['f2', 'f1'])
  r = reordenarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' }, 'fin')
  assert.deepEqual(r.estructura[0].modulos[0].temas.map((t) => t.id), ['t2', 't1'])
  r = reordenarNodo(base(), { faseId: 'f1', moduloId: 'm2' }, 'inicio')
  assert.deepEqual(r.estructura[0].modulos.map((m) => m.id), ['m2', 'm1'])
  assert.throws(() => reordenarNodo(base(), { faseId: 'f1' }, 'arriba'), /extremo/)
  assert.throws(() => reordenarNodo(base(), { faseId: 'f1' }, 'diagonal'), /inválido/)
})

// ---------- mover entre padres ----------

test('mover: tema a otro módulo y módulo a otra fase del mismo curso', () => {
  let r = moverNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' }, { faseId: 'f1', moduloId: 'm2' })
  assert.deepEqual(r.estructura[0].modulos[0].temas.map((t) => t.id), ['t2'])
  assert.deepEqual(r.estructura[0].modulos[1].temas.map((t) => t.id), ['t3', 't1'])
  r = moverNodo(base(), { faseId: 'f1', moduloId: 'm2' }, { faseId: 'f2' })
  assert.deepEqual(r.estructura[0].modulos.map((m) => m.id), ['m1'])
  assert.deepEqual(r.estructura[1].modulos.map((m) => m.id), ['m2'])
})

test('mover: destino inválido, archivado o el mismo padre se rechaza', () => {
  assert.throws(() => moverNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' }, { faseId: 'f9', moduloId: 'm9' }), /No existe/)
  assert.throws(() => moverNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' }, { faseId: 'f1', moduloId: 'm1' }), /ya está/)
  const { estructura } = archivarNodo(base(), { faseId: 'f2' })
  assert.throws(() => moverNodo(estructura, { faseId: 'f1', moduloId: 'm1' }, { faseId: 'f2' }), /archivada/)
  assert.throws(() => moverNodo(base(), { faseId: 'f1' }, { faseId: 'f2' }), /no se mueven/)
})

// ---------- duplicación ----------

test('duplicar tema: copia independiente en borrador con id nuevo y mapeo', () => {
  const r = duplicarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' })
  const temas = r.estructura[0].modulos[0].temas
  assert.equal(temas.length, 3)
  assert.equal(temas[1].titulo, 'Copia de Tema 1')
  assert.equal(temas[1].estado, 'borrador')
  assert.notEqual(temas[1].id, 't1')
  assert.deepEqual(r.mapeoTemas, [{ origenId: 't1', nuevoId: temas[1].id }])
})

test('duplicar fase: nueva rama completa con temas re-identificados', () => {
  const r = duplicarNodo(base(), { faseId: 'f1' })
  assert.equal(r.estructura.length, 3)
  const copia = r.estructura[1]
  assert.equal(copia.titulo, 'Copia de Fase 1')
  assert.equal(copia.estado, 'borrador')
  assert.equal(r.mapeoTemas.length, 3) // t1, t2, t3
  const idsOriginales = new Set(idsDeTemas(base()))
  for (const m of r.mapeoTemas) assert.equal(idsOriginales.has(m.nuevoId), false)
  assert.equal(validarEstructura(r.estructura), null)
})

// ---------- archivado / restauración ----------

test('archivar/restaurar: reversible y sin borrar nada; cuenta descendientes activos', () => {
  assert.equal(contarDescendientesActivos(base(), { faseId: 'f1' }), 5) // 2 módulos + 3 temas
  const a = archivarNodo(base(), { faseId: 'f1', moduloId: 'm1' })
  assert.equal(a.estructura[0].modulos[0].estado, 'archivado')
  // Los hijos conservan su estado propio (política documentada).
  assert.equal(a.estructura[0].modulos[0].temas[0].estado, 'publicado')
  const rst = restaurarNodo(a.estructura, { faseId: 'f1', moduloId: 'm1' })
  assert.equal(rst.nodo.estado, 'borrador')
  assert.throws(() => restaurarNodo(base(), { faseId: 'f1' }), /no está archivado/)
})

test('archivar: la rama archivada desaparece de lo que recibe el alumno', () => {
  const { estructura } = archivarNodo(base(), { faseId: 'f1', moduloId: 'm1' })
  const docs = new Map([
    ['t1', { temaId: 't1', titulo: 'T1' }],
    ['t2', { temaId: 't2', titulo: 'T2' }],
    ['t3', { temaId: 't3', titulo: 'T3' }],
  ])
  const { fases } = ensamblarFases(estructura, docs)
  // m1 archivado → sus temas fuera; solo sobrevive t3 (m2).
  assert.deepEqual(fases[0].temas.map((t) => t.id), ['t3'])
})

// ---------- publicación ----------

test('publicar: valida título y bloquea ancestros archivados', () => {
  const ok = publicarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't2' })
  assert.equal(ok.nodo.estado, 'publicado')
  // Con el módulo archivado, su tema no se publica.
  const a = archivarNodo(base(), { faseId: 'f1', moduloId: 'm1' })
  assert.throws(
    () => publicarNodo(a.estructura, { faseId: 'f1', moduloId: 'm1', temaId: 't2' }),
    /módulo .* archivado/i
  )
  // Con la fase archivada, ni módulos ni temas.
  const af = archivarNodo(base(), { faseId: 'f1' })
  assert.throws(() => publicarNodo(af.estructura, { faseId: 'f1', moduloId: 'm1' }), /fase .* archivada/i)
  // Con el curso archivado, nada.
  assert.throws(() => publicarNodo(base(), { faseId: 'f1' }, { cursoEstado: 'archivado' }), /curso está archivado/)
  // Un nodo archivado primero se restaura.
  const at = archivarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' })
  assert.throws(() => publicarNodo(at.estructura, { faseId: 'f1', moduloId: 'm1', temaId: 't1' }), /restáuralo/)
})

test('despublicar: publicado → borrador; el resto se rechaza', () => {
  const r = despublicarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't1' })
  assert.equal(r.nodo.estado, 'borrador')
  assert.throws(() => despublicarNodo(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't2' }), /no está publicado/)
})

// ---------- cursos ----------

test('nuevoCurso: id con namespace de la academia, borrador, versión 1', () => {
  const c = nuevoCurso({ academiaId: 'ACA-A', titulo: 'Curso de RCP', uid: 'u1' })
  assert.equal(c.docId, 'ACA-A__curso-de-rcp')
  assert.equal(c.estado, 'borrador')
  assert.equal(c.version, 1)
  assert.equal(c.creadoPor, 'u1')
  assert.deepEqual(c.estructura, [])
})

test('nuevoCurso: el plan CURSO respeta su límite de un curso activo', () => {
  const existentes = [{ id: 'ACA-A__x', titulo: 'X', estado: 'publicado', orden: 1 }]
  assert.throws(
    () => nuevoCurso({ academiaId: 'ACA-A', titulo: 'Otro', cursosExistentes: existentes, maxCursos: 1 }),
    /un solo curso activo/
  )
  // Con el existente archivado sí se puede.
  const archivados = [{ ...existentes[0], estado: 'archivado' }]
  const c = nuevoCurso({ academiaId: 'ACA-A', titulo: 'Otro', cursosExistentes: archivados, maxCursos: 1 })
  assert.equal(c.docId, 'ACA-A__otro')
})

test('duplicadoDeCurso: copia estructura y temas al namespace nuevo, sin tocar el origen', () => {
  const curso = {
    id: 'ACA-A__tum', academiaId: 'ACA-A', titulo: 'TUM', estado: 'publicado', orden: 1,
    estructura: base(),
  }
  const temasDocs = [
    { docId: 'ACA-A__tum__t1', academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 't1', titulo: 'Tema 1', quiz: [{ p: 1 }] },
  ]
  const { curso: nuevo, temas } = duplicadoDeCurso({ curso, temasDocs, cursosExistentes: [curso], uid: 'u1' })
  assert.equal(nuevo.titulo, 'Copia de TUM')
  assert.equal(nuevo.estado, 'borrador')
  assert.equal(nuevo.duplicadoDe, 'ACA-A__tum')
  assert.equal(nuevo.academiaId, 'ACA-A')
  // Ids INTERNOS conservados (namespace nuevo → no colisionan, progreso intacto).
  assert.equal(temas[0].docId, `${nuevo.docId}__t1`)
  assert.equal(temas[0].temaId, 't1')
  assert.equal(temas[0].cursoId, nuevo.docId)
  // Independencia: mutar la copia no toca el origen.
  temas[0].quiz.push({ p: 2 })
  nuevo.estructura[0].titulo = 'MUTADA'
  assert.equal(temasDocs[0].quiz.length, 1)
  assert.equal(curso.estructura[0].titulo, 'Fase 1')
})

// ---------- permisos ----------

test('permisos: superadmin y director PRO sí; director BASE, alumno y ajenos no', () => {
  const casoBase = { academiaIdUsuario: 'A', academiaIdObjetivo: 'A' }
  assert.equal(permisoEdicion({ esSuperadmin: true }).permitido, true)
  assert.equal(permisoEdicion({ ...casoBase, rol: 'admin_escuela', capacidades: { editorContenido: true } }).permitido, true)
  const rBase = permisoEdicion({ ...casoBase, rol: 'admin_escuela', capacidades: { editorContenido: false } })
  assert.equal(rBase.permitido, false)
  assert.match(rBase.motivo, /plan/)
  assert.equal(permisoEdicion({ ...casoBase, rol: 'alumno' }).permitido, false)
  assert.equal(
    permisoEdicion({ rol: 'admin_escuela', academiaIdUsuario: 'A', academiaIdObjetivo: 'B', capacidades: { editorContenido: true } }).permitido,
    false
  )
})

test('permisos: profesor solo con permisos editoriales y curso permitido', () => {
  const casoBase = { academiaIdUsuario: 'A', academiaIdObjetivo: 'A', rol: 'instructor' }
  assert.equal(permisoEdicion({ ...casoBase, perfil: {} }).permitido, false)
  const conPermiso = { ...casoBase, perfil: { permisosEditor: { editarContenido: true, cursosPermitidos: ['A__tum'] } } }
  assert.equal(permisoEdicion(conPermiso).permitido, true)
  assert.equal(permisoEdicion({ ...conPermiso, cursoId: 'A__tum' }).permitido, true)
  assert.equal(permisoEdicion({ ...conPermiso, cursoId: 'A__otro' }).permitido, false)
})

// ---------- utilidades ----------

test('slug/idUnico: normaliza acentos y evita colisiones sin usar "__"', () => {
  assert.equal(slugDe('Atención médica pre-hospitalaria'), 'atencion-medica-pre-hospitalaria')
  assert.equal(idUnico('RCP', ['rcp', 'rcp-2']), 'rcp-3')
  assert.equal(idUnico('', []), 'elemento')
  assert.equal(slugDe('a__b').includes('__'), false)
})

test('tipoDeRef y localizar: refs bien tipadas y errores claros', () => {
  assert.equal(tipoDeRef({ faseId: 'f1' }), 'fase')
  assert.equal(tipoDeRef({ faseId: 'f1', moduloId: 'm1' }), 'modulo')
  assert.equal(tipoDeRef({ faseId: 'f1', moduloId: 'm1', temaId: 't1' }), 'tema')
  assert.equal(tipoDeRef(null), null)
  assert.equal(localizar(base(), { faseId: 'f1', moduloId: 'm1', temaId: 't2' }).tema.titulo, 'Tema 2')
})

test('validarEstructura: detecta duplicados y estados inválidos', () => {
  const dup = base()
  dup[1].id = 'f1'
  assert.match(validarEstructura(dup), /duplicado/)
  const mal = base()
  mal[0].modulos[0].temas[0].estado = 'visible'
  assert.match(validarEstructura(mal), /Estado inválido/)
  assert.equal(ESTADOS_NODO.length, 3)
})
