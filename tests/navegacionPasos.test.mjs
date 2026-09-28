// ============================================================
//  Las conexiones entre pantallas no se pierden (27-09-2026)
// ------------------------------------------------------------
//  Tras la auditoría de navegación: la elección del staff se recuerda entre
//  pantallas, los pasos viven en la URL para que «atrás» vuelva un paso, y los
//  enlaces rotos o que saltaban al inicio apuntan a su pantalla real.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { claveDeTrabajo, leerDeTrabajo, recordarDeTrabajo, filtroValido } from '../src/lib/grupoDeTrabajo.js'

const leer = (ruta) => readFileSync(new URL(`../src/${ruta}`, import.meta.url), 'utf8')

test('la memoria de trabajo es por academia y separa grupo de filtro', () => {
  const almacen = new Map()
  globalThis.localStorage = {
    getItem: (k) => (almacen.has(k) ? almacen.get(k) : null),
    setItem: (k, v) => almacen.set(k, String(v)),
    removeItem: (k) => almacen.delete(k),
  }
  try {
    recordarDeTrabajo('grupo', 'RES', 'g1')
    recordarDeTrabajo('filtro', 'RES', 'sin')
    assert.equal(leerDeTrabajo('grupo', 'RES'), 'g1')
    assert.equal(leerDeTrabajo('grupo', 'OTRA'), '')
    assert.notEqual(claveDeTrabajo('grupo', 'RES'), claveDeTrabajo('filtro', 'RES'))
    // Elegir «todos» en un filtro no borra el grupo de trabajo.
    recordarDeTrabajo('filtro', 'RES', '')
    assert.equal(leerDeTrabajo('grupo', 'RES'), 'g1')
  } finally {
    delete globalThis.localStorage
  }
  // Sin localStorage (bloqueado): no revienta.
  assert.equal(leerDeTrabajo('grupo', 'RES'), '')
})

test('un filtro recordado solo vale si su grupo sigue existiendo', () => {
  const grupos = [{ id: 'a' }, { id: 'b' }]
  assert.equal(filtroValido('a', grupos), 'a')
  assert.equal(filtroValido('borrado', grupos), '')
  assert.equal(filtroValido('sin', grupos), 'sin')
  assert.equal(filtroValido('', grupos), '')
})

test('Temario: los pasos viven en la URL y el grupo no se borra al entrar', () => {
  const src = leer('pages/TemarioPage.jsx')
  assert.doesNotMatch(src, /useEffect\(\(\) => \{ setGrupoSel\(''\) \}/)
  assert.match(src, /params\.get\('grupo'\)/)
  assert.match(src, /setParams\(\{ \.\.\.conAcademia, grupo: id \}\)/)
  assert.match(src, /leerDeTrabajo\('grupo'/)
})

test('Editor: cambiar de curso no borra la selección recién hecha', () => {
  assert.doesNotMatch(leer('pages/EditorPage.jsx'), /setTemasCache\(\{\}\); setSeleccion\(null\) \}, \[cursoSelId\]/)
})

test('enlaces que llevaban a una pantalla inexistente o bloqueada', () => {
  assert.doesNotMatch(leer('pages/admin/academia/Accesos.jsx'), /\/admin\/academia\/\$\{academiaId\}\/invitaciones/)
  assert.doesNotMatch(leer('pages/admin/academia/Programas.jsx'), /to="\/admin\/replicacion"/)
  // Un alumno no puede abrir /temario (es del personal).
  assert.match(leer('components/CursosDisponibles.jsx'), /if \(esStaff\) navigate\('\/temario'\)/)
})

test('Modo llamada: el caso abierto va en la URL', () => {
  assert.match(leer('pages/CasosPage.jsx'), /params\.get\('caso'\)/)
})
