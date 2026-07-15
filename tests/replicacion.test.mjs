// ============================================================
//  Fase 7 — replicación: comparación, estrategias, plan, respaldo, rollback
// ------------------------------------------------------------
//  Todas PURAS (sin Firebase): validan el modelo que ejecutan tanto el
//  navegador (operaciones acotadas) como scripts/replicar-contenido.mjs.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { fases, todosLosTemas } from '../src/data/index.js'
import {
  plantillaDesdeData, docsClonadosParaAcademia, estructuraDesdeFases,
} from '../src/lib/contenidoModelo.js'
import {
  jsonEstable, huella, huellaTema, contenidoComparableTema,
  clasificarTema, compararCurso, validarCompatibilidad,
  accionesPorEstrategia, ESTRATEGIA_DEFAULT, idDuplicado, fusionarEstructura,
  planParaAcademia, verificarRespaldo, planDeRollback,
  puedeTransicionar, fraseConfirmacion, requiereConfirmacionReforzada,
  resumenDeOperacion, COLECCIONES_PERMITIDAS, huellaEstructura,
} from '../src/lib/replicacionModelo.js'

// ---------- utilería: un mini-curso real clonado a una academia ----------

const { plantilla, temas: temasPlantilla } = plantillaDesdeData({
  id: 'tum', nombre: 'TUM', fases, todosLosTemas,
})
const temasOrigen = temasPlantilla.slice(0, 5).map((t) => ({ ...t, version: 1 }))
const estructuraOrigen = [{
  id: 'f1', titulo: 'Fase 1', estado: 'publicado',
  modulos: [{
    id: 'principal', titulo: 'Contenido', implicito: true,
    temas: temasOrigen.map((t) => ({ id: t.temaId, titulo: t.titulo, estado: 'publicado' })),
  }],
}]

// Copia de una academia con el SELLO de origen (como deja la clonación F7).
function copiaDeAcademia(academiaId) {
  const cursoId = `${academiaId}__tum`
  return {
    curso: {
      id: cursoId, academiaId, plantillaId: 'tum', estado: 'publicado',
      plantillaOrigenId: 'tum', versionOrigen: 1, version: 1,
      estructura: structuredClone(estructuraOrigen),
    },
    temas: temasOrigen.map((t) => ({
      docId: `${cursoId}__${t.temaId}`,
      academiaId, cursoId, temaId: t.temaId, version: 1,
      ...structuredClone(contenidoComparableTema(t)),
      estado: 'publicado',
      origen: { plantillaId: 'tum', version: 1, hash: huellaTema(t), replicacionId: 'clonacion' },
    })),
  }
}

// ---------- huella ----------

test('huella: estable ante el ORDEN de claves y sensible al contenido', () => {
  assert.equal(huella({ a: 1, b: [2, 3] }), huella({ b: [2, 3], a: 1 }))
  assert.notEqual(huella({ a: 1 }), huella({ a: 2 }))
  assert.equal(jsonEstable({ b: 1, a: null }), '{"a":null,"b":1}')
})

test('huella de tema: ignora metadatos administrativos (version, estado, sellos)', () => {
  const t = temasOrigen[0]
  const conMetadatos = { ...t, version: 99, estado: 'archivado', actualizadoPor: 'x', origen: { hash: 'y' } }
  assert.equal(huellaTema(t), huellaTema(conMetadatos))
  assert.notEqual(huellaTema(t), huellaTema({ ...t, titulo: 'Cambiado' }))
})

// ---------- clasificación ----------

test('clasificar: nuevo, sin cambios, cambio en origen, cambio local y conflicto', () => {
  const origen = temasOrigen[0]
  const sello = huellaTema(origen)
  const destinoIgual = { ...structuredClone(origen), origen: { hash: sello } }
  assert.equal(clasificarTema({ origen, destino: null }), 'nuevo')
  assert.equal(clasificarTema({ origen, destino: destinoIgual }), 'sin_cambios')
  // El origen evolucionó y la academia NO tocó su copia → actualizable.
  const origenV2 = { ...origen, resumen: 'Resumen nuevo del origen' }
  assert.equal(clasificarTema({ origen: origenV2, destino: destinoIgual }), 'modificado_en_origen')
  // La academia editó y el origen no cambió → modificado_local.
  const destinoEditado = { ...destinoIgual, titulo: 'Título de la academia' }
  assert.equal(clasificarTema({ origen, destino: destinoEditado }), 'modificado_local')
  // Ambos cambiaron → conflicto.
  assert.equal(clasificarTema({ origen: origenV2, destino: destinoEditado }), 'conflicto')
  // La academia lo archivó: decisión local que se respeta.
  assert.equal(clasificarTema({ origen, destino: { ...destinoIgual, estado: 'archivado' } }), 'archivado_local')
})

test('clasificar: sin sello (clon previo a F7) toda divergencia es CONFLICTO (conservador)', () => {
  const origen = temasOrigen[0]
  const destino = { ...structuredClone(origen), titulo: 'Distinto' } // sin campo origen
  assert.equal(clasificarTema({ origen, destino }), 'conflicto')
})

test('comparar: detecta lo creado por la academia y produce huella del destino', () => {
  const copia = copiaDeAcademia('ACA-A')
  copia.temas.push({
    docId: 'ACA-A__tum__propio', academiaId: 'ACA-A', cursoId: 'ACA-A__tum',
    temaId: 'propio', titulo: 'Tema propio', version: 1, estado: 'publicado',
  })
  const r = compararCurso({
    estructuraOrigen, temasOrigen, cursoDestino: copia.curso, temasDestino: copia.temas,
  })
  assert.equal(r.resumen.sin_cambios, temasOrigen.length)
  assert.equal(r.resumen.solo_local, 1)
  // La huella cambia si el destino cambia (vigencia del dry-run).
  const editada = structuredClone(copia)
  editada.temas[0].resumen = 'editado'
  const r2 = compararCurso({
    estructuraOrigen, temasOrigen, cursoDestino: editada.curso, temasDestino: editada.temas,
  })
  assert.notEqual(r.huellaDestino, r2.huellaDestino)
})

// ---------- compatibilidad (capacidades centralizadas) ----------

test('compatibilidad: plan CURSO respeta su límite de un curso activo', () => {
  const academia = { id: 'X', planComercial: 'curso', tipo: 'basico' }
  const ok = validarCompatibilidad({ plantilla, academia, cursosActivos: 0, esNuevoCurso: true })
  assert.equal(ok.length, 0)
  const tope = validarCompatibilidad({ plantilla, academia, cursosActivos: 1, esNuevoCurso: true })
  assert.ok(tope.some((e) => e.tipo === 'limite'))
  // Actualizar el curso que YA tiene no excede el límite.
  const actualiza = validarCompatibilidad({ plantilla, academia, cursosActivos: 1, esNuevoCurso: false })
  assert.equal(actualiza.filter((e) => e.tipo === 'limite').length, 0)
})

test('compatibilidad: tipo distinto = advertencia; capacidad plantillas apagada = bloqueo', () => {
  const distinta = validarCompatibilidad({
    plantilla: { ...plantilla, tipoDestino: 'medicina' },
    academia: { id: 'X', planComercial: 'pro', tipo: 'basico' },
  })
  assert.ok(distinta.some((e) => e.tipo === 'tipo' && e.advertencia))
  const sinPlantillas = validarCompatibilidad({
    plantilla,
    academia: { id: 'X', planComercial: 'base', tipo: 'basico', capacidades: { plantillas: false } },
  })
  assert.ok(sinPlantillas.some((e) => e.tipo === 'plan' && !e.advertencia))
})

// ---------- estrategias ----------

function elementosDePrueba() {
  return [
    { temaId: 'n1', clase: 'nuevo' },
    { temaId: 's1', clase: 'sin_cambios' },
    { temaId: 'o1', clase: 'modificado_en_origen', versionDestino: 3 },
    { temaId: 'l1', clase: 'modificado_local', versionDestino: 4 },
    { temaId: 'c1', clase: 'conflicto', versionDestino: 5 },
    { temaId: 'p1', clase: 'solo_local' },
    { temaId: 'a1', clase: 'archivado_local' },
  ]
}

test('estrategia default (conservar_local): jamás pisa cambios locales', () => {
  const acciones = accionesPorEstrategia({ elementos: elementosDePrueba() })
  const por = Object.fromEntries(acciones.map((a) => [a.temaId, a.accion]))
  assert.equal(ESTRATEGIA_DEFAULT, 'conservar_local')
  assert.deepEqual(por, {
    n1: 'crear', s1: 'omitir', o1: 'actualizar',
    l1: 'conservar', c1: 'conservar', p1: 'conservar', a1: 'conservar',
  })
})

test('reemplazar_con_origen: sobrescribe lo editado, pero NUNCA lo creado por la academia', () => {
  const por = Object.fromEntries(
    accionesPorEstrategia({ elementos: elementosDePrueba(), estrategia: 'reemplazar_con_origen' })
      .map((a) => [a.temaId, a.accion])
  )
  assert.equal(por.l1, 'actualizar')
  assert.equal(por.c1, 'actualizar')
  assert.equal(por.p1, 'conservar') // lo propio de la academia no se toca
  assert.equal(por.a1, 'conservar') // archivar fue decisión local
})

test('duplicar_como_nuevo y seleccion_manual (los conflictos exigen decisión)', () => {
  const dup = Object.fromEntries(
    accionesPorEstrategia({ elementos: elementosDePrueba(), estrategia: 'duplicar_como_nuevo' })
      .map((a) => [a.temaId, a.accion])
  )
  assert.equal(dup.l1, 'duplicar')
  assert.equal(dup.c1, 'duplicar')
  const manual = Object.fromEntries(
    accionesPorEstrategia({
      elementos: elementosDePrueba(), estrategia: 'seleccion_manual',
      selecciones: { c1: 'actualizar' },
    }).map((a) => [a.temaId, a.accion])
  )
  assert.equal(manual.c1, 'actualizar')
  const sinDecidir = accionesPorEstrategia({ elementos: elementosDePrueba(), estrategia: 'seleccion_manual' })
  assert.equal(sinDecidir.find((a) => a.temaId === 'c1').accion, 'requiere_decision')
})

test('idDuplicado: evita colisiones sin usar el separador reservado', () => {
  const usados = new Set(['tema-v2', 'tema-v2-2'])
  assert.equal(idDuplicado('tema', 2, new Set()), 'tema-v2')
  assert.equal(idDuplicado('tema', 2, usados), 'tema-v2-3')
  assert.ok(!idDuplicado('tema', 2).includes('__'))
})

// ---------- fusión de estructura ----------

test('fusionar: agrega lo nuevo sin tocar el orden ni lo propio del destino', () => {
  const destino = [{
    id: 'f1', titulo: 'Fase RENOMBRADA por la academia', estado: 'publicado',
    modulos: [{
      id: 'principal', titulo: 'Contenido', implicito: true,
      temas: [
        { id: 'propio', titulo: 'Tema propio', estado: 'publicado' },
        { id: temasOrigen[0].temaId, titulo: temasOrigen[0].titulo, estado: 'publicado' },
      ],
    }],
  }]
  const acciones = [
    { temaId: 'nuevo-1', accion: 'crear' },
    { temaId: temasOrigen[0].temaId, accion: 'omitir' },
  ]
  const origen = [{
    id: 'f1', titulo: 'Fase 1',
    modulos: [{ id: 'principal', titulo: 'Contenido', implicito: true, temas: [{ id: 'nuevo-1', titulo: 'Nuevo', estado: 'publicado' }] }],
  }]
  const fusion = fusionarEstructura({ estructuraOrigen: origen, estructuraDestino: destino, acciones })
  // El título local se respeta; el tema propio sigue primero; el nuevo se agrega.
  assert.equal(fusion[0].titulo, 'Fase RENOMBRADA por la academia')
  const ids = fusion[0].modulos[0].temas.map((t) => t.id)
  assert.deepEqual(ids, ['propio', temasOrigen[0].temaId, 'nuevo-1'])
})

test('fusionar: el duplicado entra JUNTO al original y nace en borrador', () => {
  const destino = structuredClone(estructuraOrigen)
  const temaId = temasOrigen[1].temaId
  const fusion = fusionarEstructura({
    estructuraOrigen, estructuraDestino: destino,
    acciones: [{ temaId, accion: 'duplicar' }],
    mapaDuplicados: { [temaId]: `${temaId}-v2` },
  })
  const temas = fusion[0].modulos[0].temas
  const idx = temas.findIndex((t) => t.id === temaId)
  assert.equal(temas[idx + 1].id, `${temaId}-v2`)
  assert.equal(temas[idx + 1].estado, 'borrador')
})

// ---------- plan de escrituras ----------

function planCompleto(estrategia = 'conservar_local', mutar = null) {
  const copia = copiaDeAcademia('ACA-A')
  if (mutar) mutar(copia)
  const comparacion = compararCurso({
    estructuraOrigen, temasOrigen, cursoDestino: copia.curso, temasDestino: copia.temas,
  })
  const conAccion = accionesPorEstrategia({ elementos: comparacion.elementos, estrategia })
  return planParaAcademia({
    academiaId: 'ACA-A', plantillaId: 'tum', versionOrigen: 2, replicacionId: 'rep-1',
    elementosConAccion: conAccion,
    temasOrigenPorId: new Map(temasOrigen.map((t) => [t.temaId, t])),
    estructuraOrigen,
    cursoDestino: copia.curso,
  })
}

test('plan: idempotente (mismos insumos → exactamente los mismos doc-id y datos)', () => {
  const a = planCompleto('reemplazar_con_origen', (c) => { c.temas[0].resumen = 'editado' })
  const b = planCompleto('reemplazar_con_origen', (c) => { c.temas[0].resumen = 'editado' })
  assert.deepEqual(a.docsTemas.map((d) => d.docId), b.docsTemas.map((d) => d.docId))
  assert.equal(jsonEstable(a.docsTemas), jsonEstable(b.docsTemas))
})

test('plan: todo actualizado se respalda antes, con el curso incluido', () => {
  const plan = planCompleto('reemplazar_con_origen', (c) => { c.temas[0].resumen = 'editado por A' })
  const actualizados = plan.docsTemas.filter((d) => d.accion === 'actualizar').map((d) => d.docId)
  const respaldados = plan.respaldar.map((r) => r.docId)
  for (const id of actualizados) assert.ok(respaldados.includes(id), `falta respaldo de ${id}`)
  assert.ok(plan.respaldar.some((r) => r.coleccion === 'cursos' && r.docId === 'ACA-A__tum'))
})

test('plan: cada doc lleva el sello de origen y respeta el namespace de la academia', () => {
  const plan = planCompleto('reemplazar_con_origen', (c) => { c.temas[1].titulo = 'X' })
  for (const d of plan.docsTemas) {
    assert.ok(d.docId.startsWith('ACA-A__tum__'))
    assert.equal(d.datos.academiaId, 'ACA-A')
    assert.equal(d.datos.origen.replicacionId, 'rep-1')
    assert.equal(d.datos.origen.version, 2)
  }
})

test('plan: conflictos sin decidir bloquean; solo colecciones permitidas; sin progreso/intentos', () => {
  assert.throws(() => planCompleto('seleccion_manual', (c) => {
    c.temas[0].resumen = 'local'
    // sin sello → conflicto sin decisión
    delete c.temas[0].origen
  }), /sin decisión/)
  const plan = planCompleto()
  const colecciones = new Set(['temas', 'cursos', ...plan.respaldar.map((r) => r.coleccion)])
  for (const c of colecciones) assert.ok(COLECCIONES_PERMITIDAS.includes(c))
  assert.ok(!COLECCIONES_PERMITIDAS.includes('progreso'))
  assert.ok(!COLECCIONES_PERMITIDAS.includes('intentos'))
})

test('plan de clonación: curso inexistente → doc nuevo completo con clonación marcada', () => {
  const comparacion = compararCurso({
    estructuraOrigen, temasOrigen, cursoDestino: null, temasDestino: [],
  })
  const conAccion = accionesPorEstrategia({ elementos: comparacion.elementos })
  const plan = planParaAcademia({
    academiaId: 'ACA-B', plantillaId: 'tum', versionOrigen: 1, replicacionId: 'rep-2',
    elementosConAccion: conAccion,
    temasOrigenPorId: new Map(temasOrigen.map((t) => [t.temaId, t])),
    estructuraOrigen,
    cursoDestino: null,
    plantillaMeta: { nombre: 'TUM', tipoDestino: 'basico' },
  })
  assert.equal(plan.docCurso.accion, 'crear')
  assert.equal(plan.docCurso.datos.academiaId, 'ACA-B')
  assert.equal(plan.docCurso.datos.clonacion.completa, true)
  assert.equal(plan.docsTemas.length, temasOrigen.length)
  assert.ok(plan.docsTemas.every((d) => d.accion === 'crear'))
})

test('aislamiento: los planes de A y B producen conjuntos de doc-id disjuntos', () => {
  const hacerPlan = (aca) => {
    const copia = copiaDeAcademia(aca)
    const comparacion = compararCurso({
      estructuraOrigen, temasOrigen, cursoDestino: copia.curso, temasDestino: copia.temas,
    })
    return planParaAcademia({
      academiaId: aca, plantillaId: 'tum', versionOrigen: 2, replicacionId: 'rep-3',
      elementosConAccion: accionesPorEstrategia({ elementos: comparacion.elementos, estrategia: 'reemplazar_con_origen' }),
      temasOrigenPorId: new Map(temasOrigen.map((t) => [t.temaId, t])),
      estructuraOrigen, cursoDestino: copia.curso,
    })
  }
  const a = new Set(hacerPlan('ACA-A').docsTemas.map((d) => d.docId))
  const b = new Set(hacerPlan('ACA-B').docsTemas.map((d) => d.docId))
  for (const id of a) assert.ok(!b.has(id))
})

// ---------- respaldo y rollback ----------

test('respaldo: la verificación detecta faltantes (y la aplicación debe negarse)', () => {
  const requeridos = [{ coleccion: 'temas', docId: 'x' }, { coleccion: 'cursos', docId: 'y' }]
  const parcial = verificarRespaldo({ requeridos, respaldados: [requeridos[0]] })
  assert.equal(parcial.completo, false)
  assert.equal(parcial.faltantes.length, 1)
  assert.ok(verificarRespaldo({ requeridos, respaldados: requeridos }).completo)
})

test('rollback: restaura respaldos, archiva creados y CONSERVA lo cambiado después', () => {
  const temaRespaldo = { ...contenidoComparableTema(temasOrigen[0]), titulo: 'Original de la academia' }
  const escrito = contenidoComparableTema(temasOrigen[0]) // lo que dejó la replicación
  const respaldos = [{
    coleccion: 'temas', docId: 'ACA-A__tum__t1', datos: temaRespaldo, hashEscrito: huella(escrito),
  }]
  const creados = [
    { coleccion: 'temas', docId: 'ACA-A__tum__nuevo', hashEscrito: huellaTema(temasOrigen[1]) },
    { coleccion: 'temas', docId: 'ACA-A__tum__editado-despues', hashEscrito: 'hash-original' },
  ]
  const docsActuales = [
    // Sigue tal como lo dejó la replicación → se restaura.
    { coleccion: 'temas', docId: 'ACA-A__tum__t1', datos: escrito },
    // Creado por la replicación, intacto → se archiva.
    { coleccion: 'temas', docId: 'ACA-A__tum__nuevo', datos: contenidoComparableTema(temasOrigen[1]) },
    // Creado y luego EDITADO por la academia → se conserva con advertencia.
    { coleccion: 'temas', docId: 'ACA-A__tum__editado-despues', datos: { ...contenidoComparableTema(temasOrigen[2]), titulo: 'Editado' } },
  ]
  const plan = planDeRollback({ respaldos, creados, docsActuales })
  assert.deepEqual(plan.restaurar.map((r) => r.docId), ['ACA-A__tum__t1'])
  assert.equal(plan.restaurar[0].datos.titulo, 'Original de la academia')
  assert.deepEqual(plan.archivar.map((a) => a.docId), ['ACA-A__tum__nuevo'])
  assert.ok(plan.advertencias.some((a) => a.docId === 'ACA-A__tum__editado-despues' && a.conservado))
})

test('rollback: lo modificado tras la replicación NO se pisa salvo forzar explícito', () => {
  const escrito = contenidoComparableTema(temasOrigen[0])
  const respaldos = [{
    coleccion: 'temas', docId: 'd1', datos: { titulo: 'respaldo' }, hashEscrito: huella(escrito),
  }]
  const docsActuales = [{ coleccion: 'temas', docId: 'd1', datos: { ...escrito, titulo: 'cambiado después' } }]
  const sinForzar = planDeRollback({ respaldos, creados: [], docsActuales })
  assert.equal(sinForzar.restaurar.length, 0)
  assert.ok(sinForzar.advertencias[0].conservado)
  const forzado = planDeRollback({ respaldos, creados: [], docsActuales, forzar: { d1: true } })
  assert.equal(forzado.restaurar.length, 1)
})

test('rollback: idempotente (el mismo estado produce el mismo plan)', () => {
  const escrito = contenidoComparableTema(temasOrigen[0])
  const entrada = {
    respaldos: [{ coleccion: 'temas', docId: 'd1', datos: { titulo: 'r' }, hashEscrito: huella(escrito) }],
    creados: [{ coleccion: 'temas', docId: 'd2', hashEscrito: huellaTema(temasOrigen[1]) }],
    docsActuales: [
      { coleccion: 'temas', docId: 'd1', datos: escrito },
      { coleccion: 'temas', docId: 'd2', datos: contenidoComparableTema(temasOrigen[1]) },
    ],
  }
  assert.equal(jsonEstable(planDeRollback(entrada)), jsonEstable(planDeRollback(entrada)))
})

// ---------- estados, confirmación, resumen ----------

test('estados: transiciones legales; aplicar exige confirmación; sin doble ejecución', () => {
  assert.ok(puedeTransicionar('borrador', 'analizando'))
  assert.ok(puedeTransicionar('lista', 'esperando_confirmacion'))
  assert.ok(puedeTransicionar('esperando_confirmacion', 'aplicando'))
  assert.ok(puedeTransicionar('fallida', 'aplicando')) // reanudación
  assert.ok(puedeTransicionar('completada', 'revirtiendo'))
  assert.ok(!puedeTransicionar('aplicando', 'aplicando')) // bloqueo anti duplicados
  assert.ok(!puedeTransicionar('borrador', 'aplicando')) // sin análisis no se aplica
  assert.ok(!puedeTransicionar('revertida', 'aplicando'))
})

test('confirmación reforzada: frase exacta y casos que la exigen', () => {
  assert.equal(fraseConfirmacion({ tipo: 'replicacion', numAcademias: 3 }), 'REPLICAR 3 ACADEMIAS')
  assert.equal(
    fraseConfirmacion({ estrategia: 'reemplazar_con_origen', numAcademias: 1 }),
    'REEMPLAZAR 1 ACADEMIA'
  )
  assert.equal(fraseConfirmacion({ tipo: 'rollback', numAcademias: 2 }), 'REVERTIR 2 ACADEMIAS')
  assert.ok(requiereConfirmacionReforzada({ tipo: 'rollback', numAcademias: 1 }))
  assert.ok(requiereConfirmacionReforzada({ estrategia: 'reemplazar_con_origen', numAcademias: 1 }))
  assert.ok(requiereConfirmacionReforzada({ tipo: 'replicacion', estrategia: 'conservar_local', numAcademias: 2 }))
})

test('resumen de operación: agrega escrituras y respaldos de todos los planes', () => {
  const plan = planCompleto('reemplazar_con_origen', (c) => { c.temas[0].resumen = 'x' })
  const r = resumenDeOperacion([plan, plan])
  assert.equal(r.academias, 2)
  assert.equal(r.escrituras, plan.estimacion.escrituras * 2)
  assert.ok(r.actualizados >= 2)
})

// ---------- integración con el corpus real ----------

test('integración: clonar con sello y comparar da "sin cambios" en todo el temario', () => {
  const { temas } = docsClonadosParaAcademia({
    academiaId: 'ACA-R', plantillaId: 'tum', plantillaTemas: temasPlantilla,
  })
  const estructura = estructuraDesdeFases(fases)
  const temasConSello = temas.map((t) => ({
    ...t, origen: { plantillaId: 'tum', version: 1, hash: huellaTema(t), replicacionId: 'clonacion' },
  }))
  const r = compararCurso({
    estructuraOrigen: estructura,
    temasOrigen: temasPlantilla,
    cursoDestino: { id: 'ACA-R__tum', estructura },
    temasDestino: temasConSello,
  })
  assert.equal(r.resumen.sin_cambios, temasPlantilla.length)
  assert.equal(r.resumen.conflicto, 0)
  assert.equal(huellaEstructura(estructura), huellaEstructura(structuredClone(estructura)))
})
