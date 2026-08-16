// Compatibilidad con los documentos escritos ANTES del renombrado Fase→Módulo.
// Estas pruebas cubren el fallo más peligroso del renombrado: que un grupo con
// visibilidad configurada dejara de aplicarla en silencio.
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizarGrupo, normalizarGrupos, normalizarPerfil,
  normalizarIntento, normalizarIntentos,
} from '../src/lib/compatNombres.js'

test('un grupo viejo conserva su visibilidad con el nombre nuevo', () => {
  const g = normalizarGrupo({ id: 'GRP-1', fasesOcultas: ['fase-3', 'fase-7'] })
  assert.deepEqual(g.modulosOcultos, ['fase-3', 'fase-7'])
  // El campo viejo NO se borra: revertir la fase no debe perder datos.
  assert.deepEqual(g.fasesOcultas, ['fase-3', 'fase-7'])
})

test('el nombre NUEVO siempre gana al viejo', () => {
  const g = normalizarGrupo({ id: 'G', fasesOcultas: ['viejo'], modulosOcultos: ['nuevo'] })
  assert.deepEqual(g.modulosOcultos, ['nuevo'])
})

test('la lista vacía es una decisión, no una ausencia', () => {
  // «Este grupo no oculta nada» debe sobrevivir: si se tratara como ausente,
  // se caería al campo viejo y reaparecerían módulos ocultos ya retirados.
  const g = normalizarGrupo({ id: 'G', fasesOcultas: ['fase-3'], modulosOcultos: [] })
  assert.deepEqual(g.modulosOcultos, [])
})

test('un grupo sin ninguno de los dos campos se devuelve intacto', () => {
  const original = { id: 'G', nombre: 'Mañana' }
  assert.equal(normalizarGrupo(original), original)
  assert.equal(normalizarGrupo(null), null)
  assert.equal(normalizarGrupo(undefined), undefined)
})

test('el perfil traduce los módulos desbloqueados por el profesor', () => {
  const p = normalizarPerfil({ id: 'u1', fasesDesbloqueadas: ['fase-2'] })
  assert.deepEqual(p.modulosDesbloqueados, ['fase-2'])
  assert.equal(normalizarPerfil(null), null)
})

test('un intento viejo sigue sabiendo de qué módulo era', () => {
  // `intentos` es inmutable por regla (update:false): estos documentos
  // conservarán el nombre viejo para siempre.
  const i = normalizarIntento({
    id: 'i1', faseId: 'fase-4', faseNumero: 4, faseTitulo: 'TUM-Avanzado', porcentaje: 80,
  })
  assert.equal(i.moduloId, 'fase-4')
  assert.equal(i.moduloNumero, 4)
  assert.equal(i.moduloTitulo, 'TUM-Avanzado')
  assert.equal(i.porcentaje, 80)
})

test('un intento nuevo pasa sin tocarse', () => {
  const i = normalizarIntento({ id: 'i2', moduloId: 'm3-x', moduloNumero: 3, moduloTitulo: 'T' })
  assert.equal(i.moduloId, 'm3-x')
  assert.equal(i.moduloNumero, 3)
})

test('las variantes de lista toleran entradas vacías', () => {
  assert.deepEqual(normalizarIntentos(null), [])
  assert.deepEqual(normalizarGrupos(undefined), [])
  assert.equal(normalizarGrupos([{ fasesOcultas: ['a'] }])[0].modulosOcultos[0], 'a')
})
