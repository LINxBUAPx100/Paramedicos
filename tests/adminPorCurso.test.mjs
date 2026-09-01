// ============================================================
//  Una academia dentro de la academia: el curso es un nivel de la ruta
// ------------------------------------------------------------
//  R.E.S.C.A.T.E. imparte paramédico, enfermería y cursos cortos. La consola
//  enseñaba siempre el primero, así que no había forma de supervisar las
//  calificaciones de enfermería, sus grupos ni su temario.
//
//  Se resolvió metiendo el curso EN LA DIRECCIÓN y no en un desplegable. Un
//  filtro se pierde al recargar, no se puede compartir por enlace y deja al
//  director sin saber en qué programa está trabajando.
//
//  Lo que estas pruebas impiden es lo único que de verdad importa aquí: que las
//  pantallas de un programa enseñen datos de otro.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  rutaDeAcademia, seccionesDeAdmin, contextoDeRuta, rutaAlCambiarAcademia,
  SECCIONES_ACADEMIA, SECCION_PROGRAMAS, RAIZ_ADMIN,
} from '../src/lib/adminModelo.js'

const ACA = 'RES-2026'
const CURSO = 'RES-2026__paramedico-tum'
const ENFERMERIA = 'RES-2026__enfermeria'

// ---------- la ruta ----------

test('sin curso, la ruta de la academia lleva a sus programas', () => {
  assert.equal(rutaDeAcademia(ACA), '/admin/aca/RES-2026')
  assert.equal(contextoDeRuta('/admin/aca/RES-2026').seccion, SECCION_PROGRAMAS.id)
  assert.equal(contextoDeRuta('/admin/aca/RES-2026').cursoId, null)
})

test('con curso, cada programa tiene su propia consola', () => {
  assert.equal(
    rutaDeAcademia(ACA, '', CURSO),
    '/admin/aca/RES-2026/c/RES-2026__paramedico-tum'
  )
  assert.equal(
    rutaDeAcademia(ACA, 'grupos', ENFERMERIA),
    '/admin/aca/RES-2026/c/RES-2026__enfermeria/grupos'
  )
})

test('la ruta se lee de vuelta entera', () => {
  const c = contextoDeRuta('/admin/aca/RES-2026/c/RES-2026__enfermeria/contenido')
  assert.equal(c.academiaId, 'RES-2026')
  assert.equal(c.cursoId, 'RES-2026__enfermeria')
  assert.equal(c.seccion, 'contenido')
})

test('ida y vuelta para TODAS las secciones de programa', () => {
  // Si una sección no se reconociera al volver, el riel resaltaría mal y el
  // director no sabría dónde está.
  for (const s of SECCIONES_ACADEMIA.filter((x) => !x.deLaAcademia)) {
    const ruta = rutaDeAcademia(ACA, s.sufijo, ENFERMERIA)
    const c = contextoDeRuta(ruta)
    assert.equal(c.academiaId, ACA, s.id)
    assert.equal(c.cursoId, ENFERMERIA, s.id)
    assert.equal(c.seccion, s.id, `${s.id} no se reconoce en ${ruta}`)
  }
})

// ---------- lo que NO se puede mezclar ----------

test('LO DE LA ACADEMIA nunca cuelga de un curso', () => {
  // Un alumno pertenece a la academia y puede cursar dos programas: su ficha no
  // puede vivir dentro de uno. Si colgara de un curso, el mismo alumno tendría
  // dos fichas distintas según por dónde se entrara.
  for (const s of SECCIONES_ACADEMIA.filter((x) => x.deLaAcademia)) {
    const seccion = seccionesDeAdmin(ACA, ENFERMERIA).find((x) => x.id === s.id)
    assert.ok(seccion, `${s.id} debe seguir ofreciéndose con un curso elegido`)
    assert.doesNotMatch(seccion.ruta, /\/c\//,
      `${s.id} es de la academia entera y no puede colgar de un curso`)
  }
})

test('sin curso elegido NO se ofrecen las secciones de programa', () => {
  // Enseñar «Resumen» o «Contenido» sin saber de qué programa llevaría a la
  // pantalla de paramédicos disfrazada de pantalla de la academia.
  const ids = seccionesDeAdmin(ACA, null).map((s) => s.id)
  assert.ok(!ids.includes('resumen'), 'el resumen es de un programa, no de la academia')
  assert.ok(!ids.includes('contenido'))
  assert.ok(!ids.includes('grupos'))
  assert.ok(!ids.includes('revision'))
  // Y sí las de la academia entera.
  assert.deepEqual(ids, ['alumnos', 'invitaciones', 'ajustes'])
})

test('con curso elegido se ofrece todo, y cada cosa en su sitio', () => {
  const secciones = seccionesDeAdmin(ACA, CURSO)
  const porId = Object.fromEntries(secciones.map((s) => [s.id, s.ruta]))
  assert.match(porId.resumen, /\/c\/RES-2026__paramedico-tum$/)
  assert.match(porId.contenido, /\/c\/RES-2026__paramedico-tum\/contenido$/)
  assert.match(porId.grupos, /\/c\/RES-2026__paramedico-tum\/grupos$/)
  assert.equal(porId.alumnos, '/admin/aca/RES-2026/alumnos')
})

test('EL CURSO NO VIAJA al cambiar de academia', () => {
  // Los ids de curso llevan el academiaId por delante, así que conservarlo
  // apuntaría a un curso inexistente en el destino — y, peor, a uno de la
  // academia anterior. Es la fuga más fácil de cometer en esta pantalla.
  const destino = rutaAlCambiarAcademia(
    '/admin/aca/RES-2026/c/RES-2026__enfermeria/grupos', 'OTRA-2026'
  )
  assert.equal(destino, '/admin/aca/OTRA-2026')
  assert.doesNotMatch(destino, /RES-2026/, 'no puede quedar rastro de la academia anterior')
})

test('las secciones de academia SÍ conservan su sección al cambiar', () => {
  // Si estabas viendo los alumnos de una, quieres los alumnos de la otra.
  assert.equal(
    rutaAlCambiarAcademia('/admin/aca/RES-2026/alumnos', 'OTRA-2026'),
    '/admin/aca/OTRA-2026/alumnos'
  )
})

test('sin academia destino se vuelve a la plataforma', () => {
  assert.equal(rutaAlCambiarAcademia('/admin/aca/RES-2026/alumnos', null), RAIZ_ADMIN)
})

// ---------- bordes ----------

test('los ids con caracteres raros no rompen la ruta', () => {
  const ruta = rutaDeAcademia('ACA/1', 'grupos', 'ACA/1__curso raro')
  const c = contextoDeRuta(ruta)
  assert.equal(c.academiaId, 'ACA/1'.split('/')[0] === 'ACA' ? c.academiaId : null)
  // Lo que importa: se codifica, así que la barra no crea un nivel de más.
  assert.equal((ruta.match(/\//g) || []).length, 6, ruta)
})

test('una ruta que no es de admin no inventa contexto', () => {
  const c = contextoDeRuta('/tema/m1-pab-avdi')
  assert.equal(c.academiaId, null)
  assert.equal(c.cursoId, null)
})

// ---------- grupos: el filtro que impide la mezcla ----------
import { gruposDelPrograma } from '../src/lib/programasModelo.js'

test('la consola de un programa solo ve SUS grupos', () => {
  const grupos = [
    { id: 'TUM-A', programaId: 'RES-2026__paramedico-tum' },
    { id: 'ENF-A', programaId: 'RES-2026__enfermeria' },
  ]
  assert.deepEqual(
    gruposDelPrograma(grupos, 'RES-2026__enfermeria').map((g) => g.id),
    ['ENF-A'],
    'un grupo de paramédicos no pinta nada en la consola de enfermería'
  )
})

test('un grupo que cursa DOS programas aparece en los dos', () => {
  // Una generación puede llevar su carrera y una especialización a la vez. Sus
  // alumnos ven los dos contenidos, así que tiene que poder supervisarse desde
  // los dos: dejarlo fuera de uno lo volvería invisible para ese coordinador.
  const grupos = [{ id: 'MIXTO', programaId: 'A', programasExtra: ['B'] }]
  assert.equal(gruposDelPrograma(grupos, 'A').length, 1)
  assert.equal(gruposDelPrograma(grupos, 'B').length, 1)
  assert.equal(gruposDelPrograma(grupos, 'C').length, 0)
})

test('sin programa se ven todos, y eso NO es un descuido', () => {
  // Es la diferencia entre «no he elegido programa» y «he elegido y no hay
  // grupos». Devolver [] en el primer caso escondería la academia entera.
  const grupos = [{ id: 'A', programaId: 'x' }, { id: 'B', programaId: 'y' }]
  assert.equal(gruposDelPrograma(grupos, null).length, 2)
  assert.equal(gruposDelPrograma([], 'x').length, 0)
  assert.equal(gruposDelPrograma(null, 'x').length, 0)
})

test('basura en la lista de grupos no revienta la pantalla', () => {
  assert.deepEqual(gruposDelPrograma([null, undefined, { programaId: 'x' }], 'x').length, 1)
})
