// ============================================================
//  El grupo que existe y no aparece en ninguna pantalla
// ------------------------------------------------------------
//  EL FALLO, tal como se vio el 2 de septiembre de 2026. R.E.S.C.A.T.E. tenía
//  UN grupo, con alumnos dentro y su código repartido, y la consola de su
//  academia decía «Aún no hay grupos en esta academia».
//
//  No era un error de lectura: la administración se partió por programa, y
//  cada pestaña filtra por `programaId`. Un grupo sin plan de estudios no cae
//  en ninguna pestaña, así que para quien administra no está — pero sigue
//  existiendo, sus alumnos siguen dentro, y no ven contenido porque el plan lo
//  define el grupo.
//
//  Dos arreglos, y estas pruebas cubren los dos:
//
//   1. Que un grupo creado DESDE un programa nazca con ese programa. La trampa
//      se cerraba sola en cuanto dejaran de aparecer huérfanos nuevos.
//   2. Que los huérfanos que ya existen se puedan ver, para darles un plan o
//      borrarlos. Son las dos únicas salidas de ese estado.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { gruposDelPrograma, gruposSinPrograma } from '../src/lib/programasModelo.js'

const GRUPOS = [
  { id: 'A', nombre: 'A', programaId: 'tum' },
  { id: 'B', nombre: 'B', programaId: 'enfermeria' },
  { id: 'C', nombre: 'C' },                      // sin plan
  { id: 'D', nombre: 'D', programaId: null },    // sin plan, explícito
  { id: 'E', nombre: 'E', programaId: 'otro', programasExtra: ['tum'] },
]

test('EL GRUPO SIN PLAN NO CAE EN NINGUNA PESTAÑA DE PROGRAMA', () => {
  // La demostración del punto ciego: se recorren TODOS los programas que
  // existen y el grupo C no aparece en ninguno.
  const programas = ['tum', 'enfermeria', 'otro']
  const vistos = new Set(programas.flatMap((p) => gruposDelPrograma(GRUPOS, p).map((g) => g.id)))
  assert.equal(vistos.has('C'), false)
  assert.equal(vistos.has('D'), false)
  // Y los que sí tienen plan aparecen, para que no se confunda con un filtro roto.
  assert.equal(vistos.has('A'), true)
  assert.equal(vistos.has('B'), true)
})

test('por eso se listan aparte', () => {
  assert.deepEqual(gruposSinPrograma(GRUPOS).map((g) => g.id), ['C', 'D'])
})

test('un grupo con programa EXTRA no es huérfano', () => {
  // Cursa uno principal y aparece además en otro: tiene plan, no le falta.
  assert.equal(gruposSinPrograma(GRUPOS).some((g) => g.id === 'E'), false)
  assert.equal(gruposDelPrograma(GRUPOS, 'tum').some((g) => g.id === 'E'), true)
})

test('aguanta la lista vacía y los huecos', () => {
  assert.deepEqual(gruposSinPrograma(null), [])
  assert.deepEqual(gruposSinPrograma([]), [])
  assert.deepEqual(gruposSinPrograma([null, undefined]), [])
})

// ---------- el cableado ----------

const GRUPOS_ACADEMIA = readFileSync(
  new URL('../src/components/panel/GruposAcademia.jsx', import.meta.url), 'utf8')
const CONSOLA = readFileSync(
  new URL('../src/pages/admin/academia/Grupos.jsx', import.meta.url), 'utf8')

test('crear un grupo desde un programa le asigna ESE programa', () => {
  // Sin esto, cada grupo nuevo creado desde la pestaña de un curso nacía
  // huérfano y desaparecía de la pantalla en la que se acababa de crear.
  assert.match(GRUPOS_ACADEMIA, /cursoPorDefecto/,
    'GruposAcademia dejó de recibir el programa del contexto')
  assert.match(GRUPOS_ACADEMIA, /programaId: curso\?\.id \|\| null/,
    'el alta de grupo ya no asigna el programa del contexto')
  assert.match(CONSOLA, /cursoPorDefecto=\{cursoId\}/,
    'la consola dejó de decirle a la lista en qué programa está')
})

test('los huérfanos llegan a la pantalla, y el vacío deja de mentir', () => {
  assert.match(CONSOLA, /huerfanos=\{huerfanos\}/, 'la consola no pasa los huérfanos')
  assert.match(GRUPOS_ACADEMIA, /Grupos sin plan de estudios/,
    'desapareció el bloque que los enseña')
  // El cartel que mintió: no puede volver a decirse cuando la lista está
  // filtrada por curso.
  assert.match(GRUPOS_ACADEMIA, /Ningún grupo cursa este plan de estudios todavía/,
    'el vacío volvió a decir «no hay grupos» en una pantalla filtrada por programa')
})
