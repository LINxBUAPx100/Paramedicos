// ============================================================
//  Estado editorial — modelo puro
// ------------------------------------------------------------
//  Lo que se protege aquí es una sola idea: NADA asciende a «validado» o
//  «publicado» por generación. El proyecto ya cometió el error de dejar que
//  una métrica mecánica («tiene una sección y dos preguntas») pasara por
//  garantía de calidad, y treinta y dos temas armados automáticamente
//  quedaron rotulados como COMPLETOS.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ESTADOS_EDITORIALES, esEstadoEditorial, tieneMaterial, validarRevision,
  estadoEditorialDe, muestraContenido, estaAvalado, avisoEditorial,
  semaforoDe, tituloSemaforo,
} from '../src/lib/estadoEditorial.js'
import { estadosEditoriales } from '../src/data/navIndice.js'
import { todosLosTemas } from '../src/data/index.js'

test('los seis estados del mandato existen y nada más se acepta', () => {
  for (const e of ['vacio', 'borrador', 'en_revision', 'validado', 'publicado', 'bloqueado_por_decision']) {
    assert.ok(ESTADOS_EDITORIALES.includes(e), `falta el estado ${e}`)
  }
  assert.equal(esEstadoEditorial('revisado'), false)
  assert.equal(esEstadoEditorial(''), false)
  assert.equal(esEstadoEditorial(undefined), false)
})

test('«tiene material» mira piezas estudiables, no rótulos', () => {
  assert.equal(tieneMaterial({ resumen: 'Algo', duracion: '10 min' }), false)
  assert.equal(tieneMaterial({ secciones: [] }), false)
  assert.equal(tieneMaterial({ flashcards: [{ frente: 'a', reverso: 'b' }] }), true)
  assert.equal(tieneMaterial(null), false)
})

test('validado y publicado exigen revisor, fuentes y fecha', () => {
  const base = { estado: 'validado', procedencia: 'redactado' }
  assert.match(validarRevision(base), /nombre o rol/)
  assert.match(
    validarRevision({ ...base, revisadoPor: 'Dra. X' }),
    /al menos una fuente/
  )
  assert.match(
    validarRevision({ ...base, revisadoPor: 'Dra. X', fuentes: ['AHA 2025'] }),
    /fecha de revisión/
  )
  assert.equal(
    validarRevision({ ...base, revisadoPor: 'Dra. X', fuentes: ['AHA 2025'], actualizado: '2026-08-16' }),
    null
  )
})

test('borrador y en_revision NO exigen revisor (aún no lo hay)', () => {
  assert.equal(validarRevision({ estado: 'borrador' }), null)
  assert.equal(validarRevision({ estado: 'en_revision', fuentes: ['AHA 2025'] }), null)
})

test('un tema bloqueado necesita la pregunta concreta para la academia', () => {
  assert.match(validarRevision({ estado: 'bloqueado_por_decision' }), /pregunta concreta/)
  assert.equal(
    validarRevision({ estado: 'bloqueado_por_decision', pregunta: '¿Qué sistema de triage se adopta?' }),
    null
  )
})

test('estados y fechas mal escritos se rechazan', () => {
  assert.match(validarRevision({ estado: 'listo' }), /Estado editorial desconocido/)
  assert.match(validarRevision({ estado: 'borrador', actualizado: '16/08/2026' }), /AAAA-MM-DD/)
  assert.match(validarRevision({ estado: 'borrador', procedencia: 'inventada' }), /Procedencia desconocida/)
})

test('un tema sin material es «vacio» aunque su ficha diga otra cosa', () => {
  assert.equal(estadoEditorialDe({ estadoEditorial: 'validado' }), 'vacio')
  assert.equal(estadoEditorialDe({ estadoEditorial: 'publicado', secciones: [] }), 'vacio')
})

test('un tema con material y sin ficha es borrador, nunca validado', () => {
  const tema = { quiz: [{ pregunta: 'p', opciones: ['a', 'b'], correcta: 0 }] }
  assert.equal(estadoEditorialDe(tema), 'borrador')
})

test('el bloqueo manda sobre la presencia de material', () => {
  assert.equal(
    estadoEditorialDe({ estadoEditorial: 'bloqueado_por_decision', secciones: [{ titulo: 't', bloques: [] }] }),
    'bloqueado_por_decision'
  )
})

test('solo se enseña material en borrador, revisión, validado o publicado', () => {
  assert.equal(muestraContenido('vacio'), false)
  assert.equal(muestraContenido('bloqueado_por_decision'), false)
  assert.equal(muestraContenido('borrador'), true)
  assert.equal(muestraContenido('en_revision'), true)
  assert.equal(muestraContenido('validado'), true)
})

test('solo validado y publicado se presentan sin advertencia', () => {
  assert.equal(estaAvalado('validado'), true)
  assert.equal(estaAvalado('publicado'), true)
  assert.equal(estaAvalado('en_revision'), false)
  assert.equal(estaAvalado('borrador'), false)
  assert.equal(avisoEditorial('validado'), null)
  assert.equal(avisoEditorial('publicado'), null)
})

// ---------- semáforo de gestión (solo superadmin) ----------

test('los seis estados caen en rojo, ámbar o verde, sin huecos', () => {
  for (const e of ESTADOS_EDITORIALES) {
    assert.ok(['rojo', 'ambar', 'verde'].includes(semaforoDe(e)), `${e} sin color asignado`)
  }
})

test('rojo = sin contenido, ámbar = en desarrollo, verde = aprobado', () => {
  assert.equal(semaforoDe('vacio'), 'rojo')
  // El bloqueado va en rojo a propósito: para la cobertura es un hueco, y
  // pintarlo de otro color lo escondería del trabajo pendiente.
  assert.equal(semaforoDe('bloqueado_por_decision'), 'rojo')
  assert.equal(semaforoDe('borrador'), 'ambar')
  assert.equal(semaforoDe('en_revision'), 'ambar')
  assert.equal(semaforoDe('validado'), 'verde')
  assert.equal(semaforoDe('publicado'), 'verde')
})

test('un estado desconocido no se pinta de verde por accidente', () => {
  assert.equal(semaforoDe('inventado'), 'rojo')
  assert.equal(semaforoDe(undefined), 'rojo')
})

test('el color no es el único portador: cada punto lleva su estado escrito', () => {
  for (const e of ESTADOS_EDITORIALES) {
    assert.ok(tituloSemaforo(e).length > 0)
  }
  assert.match(tituloSemaforo('validado'), /listo y aprobado/)
  assert.match(tituloSemaforo('borrador'), /en desarrollo/)
  assert.match(tituloSemaforo('vacio'), /sin contenido/)
  // El bloqueado comparte color con el vacío, así que su texto tiene que
  // distinguirlos: si no, el panel no sabría qué está esperando una decisión.
  assert.match(tituloSemaforo('bloqueado_por_decision'), /decisión de la academia/)
  assert.notEqual(tituloSemaforo('bloqueado_por_decision'), tituloSemaforo('vacio'))
})

test('el mapa del índice de navegación cubre los 287 temas y coincide con el plan', () => {
  assert.equal(Object.keys(estadosEditoriales).length, todosLosTemas.length)
  for (const tema of todosLosTemas) {
    assert.equal(
      estadosEditoriales[tema.id], tema.estadoEditorial,
      `${tema.id}: el índice de navegación quedó desincronizado del plan generado.`
    )
  }
})

test('el aviso dice la verdad de cada situación', () => {
  assert.match(avisoEditorial('vacio').titulo, /aún no disponible/i)
  assert.match(avisoEditorial('borrador').titulo, /en revisión/i)
  assert.match(avisoEditorial('en_revision').titulo, /en revisión/i)
  const bloq = avisoEditorial('bloqueado_por_decision', { pregunta: '¿Qué triage?' })
  assert.match(bloq.titulo, /decisión académica/i)
  assert.match(bloq.texto, /¿Qué triage\?/)
})
