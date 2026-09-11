import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { filasSeguimiento } from '../src/lib/seguimientoModelo.js'
import { preguntasAvaladasDeAgregado } from '../src/lib/bancoExamen.js'
import { aplicarValidaciones } from '../src/lib/validacionesModelo.js'
import postcss from 'postcss'
import { alternarModuloConExcepciones } from '../src/lib/visibilidadEdicion.js'

test('seguimiento distingue ausencia de intentos de un cero evaluado', () => {
  const alumnos = [{ id: 'a', nombre: 'Ana' }, { id: 'b', nombre: 'Beto' }, { id: 'c', nombre: 'Celia' }]
  const filas = filasSeguimiento(alumnos, { b: { m: { mejor: 0 } }, c: { m: { mejor: 70 } } })
  assert.deepEqual(filas.map((f) => [f.categoria, f.promedio]), [['sin-evidencia', null], ['riesgo', 0], ['con-evidencia', 70]])
})
test('seguimiento busca sin acentos y no incluye alumnos ajenos al conjunto autorizado', () => {
  const filas = filasSeguimiento([{ id: 'a', nombre: 'María' }], { intruso: { m: { mejor: 45 } } }, { consulta: 'maria' })
  assert.deepEqual(filas.map((f) => f.alumno.id), ['a'])
})
test('200 alumnos sin evidencia no se convierten en reprobados', () => {
  const alumnos = Array.from({ length: 200 }, (_, i) => ({ id: String(i), nombre: `Alumno ${i}` }))
  assert.equal(filasSeguimiento(alumnos, {}, { categoria: 'sin-evidencia' }).length, 200)
  assert.equal(filasSeguimiento(alumnos, {}, { categoria: 'riesgo' }).length, 0)
})
test('agregado excluye todos los estados no avalados y preguntas huérfanas', () => {
  const estados = ['vacio', 'borrador', 'en_revision', 'bloqueado_por_decision', 'validado', 'publicado']
  const fichas = estados.map((estadoEditorial) => ({ id: estadoEditorial, estadoEditorial }))
  const preguntas = [...estados, 'sin-ficha'].map((temaId) => ({ temaId }))
  assert.deepEqual(preguntasAvaladasDeAgregado(preguntas, fichas).map((p) => p.temaId), ['validado', 'publicado'])
  assert.deepEqual(preguntasAvaladasDeAgregado(preguntas, []), [])
})
test('una validación no aplicable no habilita preguntas del borrador', () => {
  const fichas = aplicarValidaciones([{ id: 'a', estadoEditorial: 'borrador' }], { a: { estado: 'desconocido', fuentes: [], revisadoPor: 'Docente de prueba', fecha: '2026-09-09' } })
  assert.deepEqual(preguntasAvaladasDeAgregado([{ temaId: 'a' }], fichas), [])
})
test('nueva ruta docente está registrada y enlazada desde el panel protegido', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const panel = readFileSync(new URL('../src/components/panel/PanelShell.jsx', import.meta.url), 'utf8')
  assert.match(app, /path="revision" element={<PanelRevision/)
  assert.match(panel, /to="\/panel\/revision"/)
  assert.match(panel, /if \(!esStaff\)/)
})
test('todas las variables de la nueva capa CSS tienen definición', () => {
  const archivos = ['index.css', 'styles/marca.css', 'styles/tokens.css', 'styles/componentes.css', 'styles/pantallas.css']
  const css = archivos.map((p) => readFileSync(new URL(`../src/${p}`, import.meta.url), 'utf8')).join('\n')
  const definidos = new Set()
  const usados = new Set()
  postcss.parse(css).walkDecls((d) => {
    if (d.prop.startsWith('--')) definidos.add(d.prop)
    for (const m of d.value.matchAll(/var\((--[\w-]+)\)/g)) usados.add(m[1])
  })
  assert.deepEqual([...usados].filter((v) => !definidos.has(v)), [])
})

test('ocultar y volver a mostrar un módulo conserva las excepciones individuales', () => {
  const original = { modulos: ['otro'], temas: ['tema-oculto'] }
  const oculto = alternarModuloConExcepciones(original, 'm1')
  assert.deepEqual(oculto, { modulos: ['otro', 'm1'], temas: ['tema-oculto'] })
  assert.deepEqual(alternarModuloConExcepciones(oculto, 'm1'), original)
  assert.deepEqual(original, { modulos: ['otro'], temas: ['tema-oculto'] })
})

import { filtrarFilasCalificaciones } from '../src/lib/tablaCalificaciones.js'

test('libro real filtra y ordena sin convertir la falta de notas en cero', () => {
  const filas = [
    { alumno: { id: 'a', nombre: 'María' }, promedio: null, pendientes: 2 },
    { alumno: { id: 'b', nombre: 'Beto' }, promedio: 0, pendientes: 1 },
    { alumno: { id: 'c', nombre: 'Ana' }, promedio: 70, pendientes: 0 },
  ]
  assert.deepEqual(filtrarFilasCalificaciones(filas, { evidencia: 'riesgo' }).map((f) => f.alumno.id), ['b'])
  assert.deepEqual(filtrarFilasCalificaciones(filas, { evidencia: 'sin-evidencia', consulta: 'maria' }).map((f) => f.alumno.id), ['a'])
  assert.deepEqual(filtrarFilasCalificaciones(filas, { orden: 'promedio' }).map((f) => f.alumno.id), ['b', 'c', 'a'])
  assert.deepEqual(filas.map((f) => f.alumno.id), ['a', 'b', 'c'])
  assert.equal(filtrarFilasCalificaciones(filas, { consulta: 'ajeno' }).length, 0)
})

test('los catálogos rediseñados están conectados a la entrada principal', () => {
  const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8')
  assert.match(leer('src/pages/PortadaPTEM.jsx'), /<CarrerasCarrusel carreras=/)
  assert.match(leer('src/components/CarrerasCarrusel.jsx'), /className="ui-carreras"/)
  assert.match(leer('src/pages/Home.jsx'), /<ModulosCarrusel modulos=/)
  assert.match(leer('src/components/ModulosCarrusel.jsx'), /className="ui-modulos ph-wrap"/)
  assert.match(leer('src/main.jsx'), /styles\/pantallas\.css/)
  assert.match(leer('src/pages/panel/Calificaciones.jsx'), /filasPagina\.map/)
})
