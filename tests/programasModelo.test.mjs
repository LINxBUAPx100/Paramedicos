// ============================================================
//  Pruebas del modelo de programas
// ------------------------------------------------------------
//  Dos cosas se protegen aquí:
//   1. Que la estructura VIEJA (`modulos[]` implícito de la migración) se siga
//      leyendo sin migrar un solo documento.
//   2. Que el aislamiento por programa no se abra por accidente: un alumno de
//      Enfermería no puede ver TUM, y uno sin grupo no ve NADA.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  TIPOS_PROGRAMA, META_PROGRAMA, tipoProgramaDe, metaDePrograma,
  etiquetaTipoPrograma, validarTipoPrograma, normalizarEstructura,
  tieneUnidadesReales, conteosDePrograma, programasDeGrupo,
  puedeVerPrograma, programasVisibles, motivoSinPrograma,
} from '../src/lib/programasModelo.js'

// ---------- catálogo ----------

test('el catálogo cubre exactamente los seis tipos pedidos', () => {
  assert.deepEqual(TIPOS_PROGRAMA,
    ['tum', 'enfermeria', 'tsu', 'licenciatura', 'curso', 'certificacion'])
  for (const t of TIPOS_PROGRAMA) {
    assert.ok(META_PROGRAMA[t], `falta metadata de ${t}`)
    assert.equal(META_PROGRAMA[t].id, t)
    assert.ok(META_PROGRAMA[t].etiqueta.length > 0)
  }
  // Las cuatro carreras y los dos formatos cortos.
  assert.deepEqual(TIPOS_PROGRAMA.filter((t) => META_PROGRAMA[t].esCarrera),
    ['tum', 'enfermeria', 'tsu', 'licenciatura'])
})

test('un programa sin tipo se comporta como TUM (lo que la academia ya tenía)', () => {
  assert.equal(tipoProgramaDe(undefined), 'tum')
  assert.equal(tipoProgramaDe({}), 'tum')
  assert.equal(tipoProgramaDe({ tipoPrograma: 'basura' }), 'tum')
  assert.equal(tipoProgramaDe({ tipoPrograma: 'enfermeria' }), 'enfermeria')
  assert.equal(metaDePrograma({}).etiquetaCorta, 'TUM/TEM')
  assert.match(etiquetaTipoPrograma('tsu'), /Técnico Superior/)
  assert.match(etiquetaTipoPrograma('inventado'), /Técnico en Urgencias/)
})

test('validarTipoPrograma rechaza lo que no está en el catálogo', () => {
  assert.equal(validarTipoPrograma('certificacion'), null)
  assert.match(validarTipoPrograma('doctorado'), /inválido/)
  assert.match(validarTipoPrograma(undefined), /inválido/)
})

// ---------- normalización de la estructura ----------

const ESTR_NUEVA = [{
  id: 'm1', titulo: 'Propedéutico', estado: 'publicado',
  totales: { semanas: 4, horas: 20 },
  unidades: [{
    id: 'u1', titulo: 'Primeros auxilios básicos', estado: 'publicado',
    tipo: 'contenido', semanas: 1, horas: 5, grupos: ['Métodos manuales'],
    temas: [
      { id: 't-avdi', titulo: 'AVDI', estado: 'publicado', sesion: 1 },
      { id: 't-dea', titulo: 'Uso del DEA', estado: 'borrador' },
    ],
  }],
}]

// La forma que produce contenidoModelo.js al migrar: `modulos[]` implícito.
const ESTR_MIGRADA = [{
  id: 'm1', titulo: 'Propedéutico', estado: 'publicado',
  modulos: [{
    id: 'principal', titulo: 'Contenido', implicito: true, estado: 'publicado',
    temas: [{ id: 't-avdi', titulo: 'AVDI', estado: 'publicado' }],
  }],
}]

test('la estructura NUEVA se conserva entera', () => {
  const [m] = normalizarEstructura(ESTR_NUEVA)
  assert.equal(m.unidades.length, 1)
  assert.equal(m.unidades[0].semanas, 1)
  assert.deepEqual(m.unidades[0].grupos, ['Métodos manuales'])
  assert.equal(m.unidades[0].temas[0].sesion, 1)
  assert.equal(m.unidades[0].temas[1].estado, 'borrador')
  assert.deepEqual(m.totales, { semanas: 4, horas: 20 })
})

test('la estructura MIGRADA (`modulos[]`) se lee sin migrar el documento', () => {
  const [m] = normalizarEstructura(ESTR_MIGRADA)
  assert.equal(m.unidades.length, 1)
  assert.equal(m.unidades[0].id, 'principal')
  assert.equal(m.unidades[0].implicito, true)
  assert.equal(m.unidades[0].temas[0].id, 't-avdi')
})

test('los temas colgados del módulo se envuelven en una unidad implícita', () => {
  const [m] = normalizarEstructura([
    { id: 'm1', titulo: 'M', temas: [{ id: 't1', titulo: 'T' }] },
  ])
  assert.equal(m.unidades.length, 1)
  assert.equal(m.unidades[0].implicito, true)
  assert.equal(m.unidades[0].temas[0].id, 't1')
})

test('fail-open: una estructura corrupta no revienta la página del alumno', () => {
  assert.deepEqual(normalizarEstructura(null), [])
  assert.deepEqual(normalizarEstructura('no soy un array'), [])
  assert.deepEqual(normalizarEstructura([null, {}, { titulo: 'sin id' }]), [])
  // Un módulo válido entre basura sobrevive.
  assert.equal(normalizarEstructura([null, { id: 'm1' }]).length, 1)
  // Nodo sin estado = publicado (es lo que clona la migración).
  assert.equal(normalizarEstructura([{ id: 'm1' }])[0].estado, 'publicado')
})

test('tieneUnidadesReales distingue el temario migrado del estructurado', () => {
  assert.equal(tieneUnidadesReales(ESTR_NUEVA), true)
  assert.equal(tieneUnidadesReales(ESTR_MIGRADA), false, 'solo hay envoltorios')
  assert.equal(tieneUnidadesReales(null), false)
})

test('los conteos ignoran borradores salvo que se pidan', () => {
  const pub = conteosDePrograma(ESTR_NUEVA)
  assert.deepEqual(pub, { modulos: 1, unidades: 1, temas: 1, semanas: 1, horas: 5 })
  const todo = conteosDePrograma(ESTR_NUEVA, { incluirBorradores: true })
  assert.equal(todo.temas, 2)
  // Las unidades implícitas NO se cuentan: no son contenido, son envoltorio.
  assert.equal(conteosDePrograma(ESTR_MIGRADA).unidades, 0)
  assert.equal(conteosDePrograma(ESTR_MIGRADA).temas, 1)
})

// ---------- aislamiento por programa ----------

const GRUPO_ENF = { id: 'GRP-1', programaId: 'ACA__enfermeria' }
const GRUPO_TUM_MAS = { id: 'GRP-2', programaId: 'ACA__tum', programasExtra: ['ACA__acls', 'ACA__phtls'] }
const PROGRAMAS = [{ id: 'ACA__tum' }, { id: 'ACA__enfermeria' }, { id: 'ACA__acls' }]

test('programasDeGrupo suma los extras y limpia duplicados y vacíos', () => {
  assert.deepEqual(programasDeGrupo(GRUPO_ENF), ['ACA__enfermeria'])
  assert.deepEqual(programasDeGrupo(GRUPO_TUM_MAS), ['ACA__tum', 'ACA__acls', 'ACA__phtls'])
  assert.deepEqual(programasDeGrupo({ programaId: 'a', programasExtra: ['a', '', null] }), ['a'])
  assert.deepEqual(programasDeGrupo(null), [])
  assert.deepEqual(programasDeGrupo({}), [])
})

test('un alumno SOLO ve el programa de su grupo', () => {
  const alumno = { rol: 'alumno', grupo: GRUPO_ENF }
  assert.equal(puedeVerPrograma({ ...alumno, programaId: 'ACA__enfermeria' }), true)
  // El corazón del requisito: nada de TUM para quien estudia Enfermería.
  assert.equal(puedeVerPrograma({ ...alumno, programaId: 'ACA__tum' }), false)
  assert.deepEqual(
    programasVisibles(PROGRAMAS, alumno).map((p) => p.id),
    ['ACA__enfermeria']
  )
})

test('las especializaciones extra del grupo sí se ven', () => {
  const alumno = { rol: 'alumno', grupo: GRUPO_TUM_MAS }
  assert.deepEqual(
    programasVisibles(PROGRAMAS, alumno).map((p) => p.id),
    ['ACA__tum', 'ACA__acls']
  )
})

test('un alumno SIN grupo no ve NADA', () => {
  const alumno = { rol: 'alumno', grupo: null }
  assert.equal(puedeVerPrograma({ ...alumno, programaId: 'ACA__tum' }), false)
  assert.deepEqual(programasVisibles(PROGRAMAS, alumno), [])
})

test('staff y superadmin ven todos los programas de la academia que gestionan', () => {
  for (const rol of ['instructor', 'admin_escuela']) {
    assert.equal(programasVisibles(PROGRAMAS, { rol, grupo: null }).length, 3, rol)
  }
  assert.equal(programasVisibles(PROGRAMAS, { rol: 'alumno', esSuperadmin: true }).length, 3)
})

test('un programa sin id nunca es visible (ni para el superadmin)', () => {
  assert.equal(puedeVerPrograma({ esSuperadmin: true, programaId: null }), false)
  assert.equal(puedeVerPrograma({ esSuperadmin: true, programaId: '' }), false)
})

// ---------- motivo de bloqueo ----------

test('sin grupo, el motivo manda a canjear un código (no a un 403 seco)', () => {
  const m = motivoSinPrograma({ rol: 'alumno', grupo: null, programasDeAcademia: PROGRAMAS })
  assert.equal(m.codigo, 'sin-grupo')
  assert.equal(m.destino, '/cuenta')
  assert.match(m.texto, /código de tu grupo/i)
})

test('grupo sin programa asignado se distingue de grupo sin programa publicado', () => {
  const a = motivoSinPrograma({ rol: 'alumno', grupo: { id: 'G' }, programasDeAcademia: PROGRAMAS })
  assert.equal(a.codigo, 'grupo-sin-programa')
  const b = motivoSinPrograma({
    rol: 'alumno',
    grupo: { id: 'G', programaId: 'ACA__todavia-no' },
    programasDeAcademia: PROGRAMAS,
  })
  assert.equal(b.codigo, 'programa-no-publicado')
})

test('con grupo y programa visible no hay motivo de bloqueo', () => {
  assert.equal(
    motivoSinPrograma({ rol: 'alumno', grupo: GRUPO_ENF, programasDeAcademia: PROGRAMAS }),
    null
  )
  // El staff nunca se bloquea por programa.
  assert.equal(motivoSinPrograma({ rol: 'instructor', grupo: null }), null)
  assert.equal(motivoSinPrograma({ rol: 'alumno', esSuperadmin: true, grupo: null }), null)
})
