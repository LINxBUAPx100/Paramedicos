import test from 'node:test'
import assert from 'node:assert/strict'

import {
  leerAccion, familiaDe, filtrarHistorial, camposCambiados, contarPorFamilia,
} from '../src/lib/historialModelo.js'

const ENTRADAS = [
  { accion: 'borrar-grupo', academiaId: 'A', coleccion: 'grupos', docId: 'G1', usuario: 'u1' },
  { accion: 'crear-tema', academiaId: 'A', coleccion: 'temas', docId: 'T1', usuario: 'u2' },
  { accion: 'baja-usuario', academiaId: 'B', coleccion: 'usuarios', docId: 'U9', usuario: 'u1' },
  { accion: 'cambiar-codigo', academiaId: 'B', coleccion: 'academias', docId: 'B', usuario: 'u3' },
]

test('una acción conocida se lee en castellano y con su tono', () => {
  assert.equal(leerAccion('borrar-grupo').texto, 'Borró un grupo')
  assert.equal(leerAccion('borrar-grupo').tono, 'peligro')
})

test('una acción SIN traducir se enseña legible, no se esconde', () => {
  // Una acción nueva debe verse aunque nadie haya actualizado la tabla: si se
  // ocultara, el registro mentiría por omisión.
  const r = leerAccion('inventar-algo-nuevo')
  assert.equal(r.texto, 'Inventar algo nuevo')
  assert.equal(r.tono, 'neutro')
  assert.equal(leerAccion(null).texto, 'Acción desconocida')
})

test('la familia se deduce del nombre, así una acción nueva cae sola en su sitio', () => {
  assert.equal(familiaDe('borrar-academia'), 'borrado')
  assert.equal(familiaDe('eliminar-loquesea'), 'borrado')
  assert.equal(familiaDe('baja-usuario'), 'baja')
  assert.equal(familiaDe('archivar-nodo'), 'baja')
  assert.equal(familiaDe('crear-grupo'), 'alta')
  assert.equal(familiaDe('conceder-permisos'), 'alta')
  assert.equal(familiaDe('cambiar-codigo'), 'otro')
  assert.equal(familiaDe(undefined), 'otro')
})

test('filtra por academia, por familia y por texto', () => {
  assert.equal(filtrarHistorial(ENTRADAS, { academiaId: 'A' }).length, 2)
  assert.equal(filtrarHistorial(ENTRADAS, { familia: 'borrado' }).length, 1)
  assert.equal(filtrarHistorial(ENTRADAS, { busca: 'usuarios' }).length, 1)
  // El texto busca en varios campos, no solo en la acción.
  assert.equal(filtrarHistorial(ENTRADAS, { busca: 'u1' }).length, 2)
  // Y los filtros se combinan.
  assert.equal(filtrarHistorial(ENTRADAS, { academiaId: 'B', familia: 'baja' }).length, 1)
  assert.equal(filtrarHistorial(ENTRADAS, {}).length, 4)
  assert.deepEqual(filtrarHistorial(null, {}), [])
})

test('camposCambiados dice QUÉ cambió, que es lo único que responde «y qué pasó»', () => {
  const c = camposCambiados({ rol: 'alumno', nombre: 'Ana' }, { rol: 'instructor', nombre: 'Ana' })
  assert.deepEqual(c, [{ clave: 'rol', antes: 'alumno', despues: 'instructor' }])
})

test('camposCambiados detecta altas y bajas de campo', () => {
  assert.deepEqual(camposCambiados(null, { rol: 'alumno' }),
    [{ clave: 'rol', antes: undefined, despues: 'alumno' }])
  assert.deepEqual(camposCambiados({ rol: 'alumno' }, null),
    [{ clave: 'rol', antes: 'alumno', despues: undefined }])
  assert.deepEqual(camposCambiados(null, null), [])
  // Sin cambios reales, no inventa ninguno.
  assert.deepEqual(camposCambiados({ a: 1 }, { a: 1 }), [])
  // Y compara en profundidad, no por referencia.
  assert.deepEqual(camposCambiados({ a: { b: 1 } }, { a: { b: 1 } }), [])
  assert.equal(camposCambiados({ a: { b: 1 } }, { a: { b: 2 } }).length, 1)
})

test('contarPorFamilia resume el periodo', () => {
  assert.deepEqual(contarPorFamilia(ENTRADAS), { borrado: 1, baja: 1, alta: 1, otro: 1 })
  assert.deepEqual(contarPorFamilia([]), { borrado: 0, baja: 0, alta: 0, otro: 0 })
})
