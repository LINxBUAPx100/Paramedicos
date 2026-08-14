// ============================================================
//  Pruebas del alcance del contenido nuevo
// ------------------------------------------------------------
//  Lo que se protege aquí es que el contenido del profesor NO se filtre a los
//  demás grupos, y —igual de importante— que no se oculte de más y acabe sin
//  nadie que lo vea.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ocultarParaOtrosGrupos, creaSoloParaSuGrupo, avisoDeAlcance, esAcotable,
} from '../src/lib/alcanceContenido.js'

const GRUPOS = [
  { id: 'G1', nombre: 'Mañana', temasOcultos: [], fasesOcultas: [] },
  { id: 'G2', nombre: 'Tarde', temasOcultos: ['viejo'], fasesOcultas: [] },
  { id: 'G3', nombre: 'Sábados' }, // sin campos: academia con reglas viejas
]

test('oculta el tema en los OTROS grupos, nunca en el propio', () => {
  const c = ocultarParaOtrosGrupos({ grupos: GRUPOS, grupoPropio: 'G1', tipo: 'tema', id: 't9' })
  assert.deepEqual(c.map((x) => x.grupoId), ['G2', 'G3'])
  assert.ok(!c.some((x) => x.grupoId === 'G1'), 'el grupo del profesor debe seguir viéndolo')
})

test('conserva lo que cada grupo ya tenía oculto', () => {
  const c = ocultarParaOtrosGrupos({ grupos: GRUPOS, grupoPropio: 'G1', tipo: 'tema', id: 't9' })
  const g2 = c.find((x) => x.grupoId === 'G2')
  // Si se sobrescribiera la lista, G2 recuperaría de golpe un tema que su
  // director le había ocultado.
  assert.deepEqual(g2.valores, ['viejo', 't9'])
  // Y un grupo sin el campo arranca la lista sin romperse.
  assert.deepEqual(c.find((x) => x.grupoId === 'G3').valores, ['t9'])
})

test('es idempotente: no reescribe lo que ya está oculto', () => {
  const grupos = [
    { id: 'G1', temasOcultos: [] },
    { id: 'G2', temasOcultos: ['t9'] },
  ]
  const c = ocultarParaOtrosGrupos({ grupos, grupoPropio: 'G1', tipo: 'tema', id: 't9' })
  assert.equal(c.length, 0, 'G2 ya lo oculta: no hay nada que escribir')
})

test('una fase usa fasesOcultas, no temasOcultos', () => {
  const c = ocultarParaOtrosGrupos({ grupos: GRUPOS, grupoPropio: 'G1', tipo: 'fase', id: 'f5' })
  assert.ok(c.every((x) => x.campo === 'fasesOcultas'))
  assert.deepEqual(c.find((x) => x.grupoId === 'G2').valores, ['f5'])
})

test('sin grupo propio NO se oculta nada', () => {
  // Un profesor sin grupo: «solo mi grupo» no significa nada, y ocultarlo en
  // todos dejaría el tema sin nadie que lo vea.
  assert.deepEqual(ocultarParaOtrosGrupos({ grupos: GRUPOS, grupoPropio: null, tipo: 'tema', id: 't9' }), [])
})

test('con un solo grupo (el suyo) no hay nada que ocultar', () => {
  const c = ocultarParaOtrosGrupos({ grupos: [GRUPOS[0]], grupoPropio: 'G1', tipo: 'tema', id: 't9' })
  assert.deepEqual(c, [])
})

test('un tipo o un id que no valen no producen escrituras', () => {
  assert.deepEqual(ocultarParaOtrosGrupos({ grupos: GRUPOS, grupoPropio: 'G1', tipo: 'modulo', id: 'm1' }), [])
  assert.deepEqual(ocultarParaOtrosGrupos({ grupos: GRUPOS, grupoPropio: 'G1', tipo: 'tema', id: null }), [])
  assert.deepEqual(ocultarParaOtrosGrupos({}), [])
})

test('solo el profesor con grupo crea acotado', () => {
  assert.equal(creaSoloParaSuGrupo({ rol: 'instructor', grupoId: 'G1' }), true)
  // El director da clase y tiene grupo, pero su ámbito es la academia entera:
  // su contenido no debe nacer restringido.
  assert.equal(creaSoloParaSuGrupo({ rol: 'admin_escuela', grupoId: 'G1' }), false)
  assert.equal(creaSoloParaSuGrupo({ esSuperadmin: true, rol: 'instructor', grupoId: 'G1' }), false)
  // Profesor sin grupo: no hay a qué acotar.
  assert.equal(creaSoloParaSuGrupo({ rol: 'instructor', grupoId: null }), false)
  assert.equal(creaSoloParaSuGrupo({}), false)
})

test('el aviso dice la verdad en cada caso', () => {
  assert.equal(avisoDeAlcance({ restringido: false }), '')
  assert.match(avisoDeAlcance({ restringido: true, nombreGrupo: 'Mañana', otrosGrupos: 2 }), /solo lo ve tu grupo \(Mañana\)/)
  assert.match(avisoDeAlcance({ restringido: true, otrosGrupos: 2 }), /solo lo ve tu grupo/)
  // Sin otros grupos NO se puede decir «solo tu grupo»: lo ve toda la academia,
  // porque el suyo es el único que hay.
  assert.match(avisoDeAlcance({ restringido: true, nombreGrupo: 'Mañana', otrosGrupos: 0 }), /tu academia/)
})

test('un módulo NO es acotable: su visibilidad no existe por grupo', () => {
  // Prometerle al profesor que «su módulo solo lo ve su grupo» seria falso: lo
  // que se acota son los temas que cuelgue dentro.
  assert.equal(esAcotable('tema'), true)
  assert.equal(esAcotable('fase'), true)
  assert.equal(esAcotable('modulo'), false)
  assert.equal(esAcotable('curso'), false)
  assert.equal(esAcotable(undefined), false)
  // Y nada heredado de Object cuenta como tipo.
  assert.equal(esAcotable('toString'), false)
})
