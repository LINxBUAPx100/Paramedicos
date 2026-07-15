// ============================================================
//  Fase 7 — plantillas: metadatos, ciclo de vida, versionado inmutable
// ------------------------------------------------------------
//  Pruebas PURAS de src/lib/plantillasModelo.js.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ESTADOS_PLANTILLA, slugPlantilla, versionDocId, temaVersionDocId,
  normalizarMetadatosPlantilla, validarMetadatosPlantilla, conteosDeEstructura,
  puedeEditarPlantilla, puedePublicarPlantilla, prepararNuevaVersion,
  snapshotDeVersion, cambiosEntreVersiones,
  referenciasPrivadasEnTema, plantillaDesdeCurso,
} from '../src/lib/plantillasModelo.js'
import { huellaTema } from '../src/lib/replicacionModelo.js'

const ESTRUCTURA = [{
  id: 'f1', titulo: 'F1', estado: 'publicado',
  modulos: [{ id: 'principal', titulo: 'C', temas: [{ id: 't1', titulo: 'T1' }, { id: 't2', titulo: 'T2' }] }],
}]
const TEMAS = [
  { temaId: 't1', titulo: 'T1', resumen: 'r1', secciones: [], quiz: [], flashcards: [], estado: 'publicado' },
  { temaId: 't2', titulo: 'T2', resumen: 'r2', secciones: [], quiz: [], flashcards: [], estado: 'publicado' },
]

test('metadatos: slug seguro, normalización a claves conocidas y validación', () => {
  assert.equal(slugPlantilla('Programa Médico Avanzado (v2)'), 'programa-medico-avanzado-v2')
  assert.ok(!slugPlantilla('a__b').includes('__')) // separador reservado
  const m = normalizarMetadatosPlantilla({
    nombre: '  Plan ', tipoDestino: 'inventado', planesCompatibles: ['pro', 'falso'], basura: 1,
  })
  assert.deepEqual(m, {
    nombre: 'Plan', descripcion: '', categoria: '',
    tipoDestino: 'basico', planesCompatibles: ['pro'],
  })
  assert.equal(validarMetadatosPlantilla({ nombre: '' }), 'La plantilla necesita un nombre.')
  assert.equal(validarMetadatosPlantilla({ nombre: 'X' }), null)
})

test('conteos: cursos/fases/módulos/temas de la estructura', () => {
  assert.deepEqual(conteosDeEstructura(ESTRUCTURA), { cursos: 1, fases: 1, modulos: 1, temas: 2 })
  assert.deepEqual(conteosDeEstructura(null), { cursos: 1, fases: 0, modulos: 0, temas: 0 })
})

test('ciclo de vida: solo el borrador se edita; publicada exige versión nueva', () => {
  assert.deepEqual(ESTADOS_PLANTILLA, ['borrador', 'publicada', 'archivada'])
  assert.ok(puedeEditarPlantilla({ estado: 'borrador' }))
  assert.ok(!puedeEditarPlantilla({ estado: 'publicada' }))
  assert.ok(!puedeEditarPlantilla({ estado: 'archivada' }))
  // Publicar: borrador con temas sí; publicada no; borrador vacío no.
  assert.ok(puedePublicarPlantilla({ estado: 'borrador', estructura: ESTRUCTURA }).permitido)
  assert.ok(!puedePublicarPlantilla({ estado: 'publicada', estructura: ESTRUCTURA }).permitido)
  assert.ok(!puedePublicarPlantilla({ estado: 'borrador', estructura: [] }).permitido)
})

test('versión nueva: publicada v1 → borrador v2; un borrador no abre otra versión', () => {
  assert.deepEqual(prepararNuevaVersion({ estado: 'publicada', version: 1 }), { estado: 'borrador', version: 2 })
  assert.deepEqual(prepararNuevaVersion({ estado: 'archivada', version: 3 }), { estado: 'borrador', version: 4 })
  assert.throws(() => prepararNuevaVersion({ estado: 'borrador', version: 1 }), /publicada/)
})

test('snapshot: ids deterministas, versionId de un solo campo, hash y conteos', () => {
  const { docVersion, docsTemas } = snapshotDeVersion({
    plantilla: { id: 'tum', nombre: 'TUM', version: 2, estructura: ESTRUCTURA },
    temas: TEMAS, autor: 'super1', notas: 'segunda',
  })
  assert.equal(docVersion.docId, versionDocId('tum', 2))
  assert.equal(docVersion.docId, 'tum__v2')
  assert.equal(docVersion.conteos.temas, 2)
  assert.ok(docVersion.hash)
  assert.deepEqual(docsTemas.map((d) => d.docId), [
    temaVersionDocId('tum', 2, 't1'), temaVersionDocId('tum', 2, 't2'),
  ])
  for (const d of docsTemas) {
    assert.equal(d.versionId, 'tum__v2') // consulta por UN campo, sin índice compuesto
    assert.equal(d.hash, huellaTema(d))
  }
  // El snapshot es una COPIA profunda: mutarlo no toca la plantilla.
  docsTemas[0].titulo = 'mutado'
  assert.equal(TEMAS[0].titulo, 'T1')
})

test('snapshot: el MISMO contenido produce el MISMO hash (verificable entre versiones)', () => {
  const uno = snapshotDeVersion({ plantilla: { id: 'p', version: 1, nombre: 'P', estructura: ESTRUCTURA }, temas: TEMAS })
  const dos = snapshotDeVersion({ plantilla: { id: 'p', version: 1, nombre: 'P', estructura: ESTRUCTURA }, temas: TEMAS })
  assert.equal(uno.docVersion.hash, dos.docVersion.hash)
  const cambiado = snapshotDeVersion({
    plantilla: { id: 'p', version: 1, nombre: 'P', estructura: ESTRUCTURA },
    temas: [{ ...TEMAS[0], resumen: 'distinto' }, TEMAS[1]],
  })
  assert.notEqual(uno.docVersion.hash, cambiado.docVersion.hash)
})

test('cambios entre versiones: agregados, quitados y modificados por huella', () => {
  const v1 = snapshotDeVersion({ plantilla: { id: 'p', version: 1, nombre: 'P', estructura: ESTRUCTURA }, temas: TEMAS }).docsTemas
  const v2 = snapshotDeVersion({
    plantilla: { id: 'p', version: 2, nombre: 'P', estructura: ESTRUCTURA },
    temas: [
      { ...TEMAS[0], resumen: 'editado' }, // modificado
      { temaId: 't3', titulo: 'T3', resumen: '', secciones: [], quiz: [], flashcards: [] }, // agregado (t2 quitado)
    ],
  }).docsTemas
  const c = cambiosEntreVersiones({ temasAnterior: v1, temasNueva: v2 })
  assert.deepEqual(c.agregados, ['t3'])
  assert.deepEqual(c.quitados, ['t2'])
  assert.deepEqual(c.modificados, ['t1'])
})

test('referencias privadas: detecta paths y URLs de Storage de academias', () => {
  const limpio = { recursos: { archivos: [{ titulo: 'Guía', url: 'https://ejemplo.org/g.pdf', path: 'x' }] } }
  // path fuera de academias/ y URL externa → sin referencias privadas.
  assert.equal(referenciasPrivadasEnTema(limpio).length, 0)
  const conPath = { recursos: { archivos: [{ titulo: 'Privado', url: 'https://x', path: 'academias/ACA-A/archivos/a.pdf' }] } }
  assert.equal(referenciasPrivadasEnTema(conPath).length, 1)
  const conUrl = {
    secciones: [{
      titulo: 'S', bloques: [{
        tipo: 'imagen',
        src: 'https://firebasestorage.googleapis.com/v0/b/x/o/academias%2FACA-A%2Fimagenes%2Ff.png?alt=media',
      }],
    }],
  }
  assert.equal(referenciasPrivadasEnTema(conUrl).length, 1)
})

test('plantilla desde curso: limpia rastros de la academia y registra su origen', () => {
  const curso = {
    id: 'ACA-A__tum', academiaId: 'ACA-A', titulo: 'Curso de A',
    estructura: ESTRUCTURA, version: 7,
  }
  const temasCurso = TEMAS.map((t) => ({
    ...t, academiaId: 'ACA-A', cursoId: 'ACA-A__tum', version: 5,
    origen: { plantillaId: 'tum', version: 1, hash: 'sello' },
    actualizadoPor: 'dirA',
  }))
  const { plantilla, temas } = plantillaDesdeCurso({
    meta: { nombre: 'Nueva plantilla' }, curso, temas: temasCurso, autor: 'super1',
  })
  assert.equal(plantilla.estado, 'borrador')
  assert.equal(plantilla.version, 1)
  assert.equal(plantilla.origen, 'curso-academia')
  assert.equal(plantilla.academiaOrigenId, 'ACA-A')
  assert.equal(plantilla.cursoOrigenId, 'ACA-A__tum')
  for (const t of temas) {
    assert.equal(t.plantillaId, plantilla.id)
    assert.ok(!('academiaId' in t))
    assert.ok(!('origen' in t))
    assert.ok(!('actualizadoPor' in t))
    assert.ok(t.docId.startsWith(`${plantilla.id}__`))
  }
  // Independencia real: mutar la plantilla no toca el curso origen.
  temas[0].titulo = 'mutado'
  assert.equal(temasCurso[0].titulo, 'T1')
})

test('plantilla desde curso: se BLOQUEA si hay referencias privadas de Storage', () => {
  const curso = { id: 'ACA-A__tum', academiaId: 'ACA-A', titulo: 'Curso', estructura: ESTRUCTURA }
  const temasCurso = [{
    temaId: 't1', titulo: 'Con archivo privado',
    recursos: { archivos: [{ titulo: 'PDF', url: 'https://x', path: 'academias/ACA-A/archivos/a.pdf' }] },
  }]
  assert.throws(
    () => plantillaDesdeCurso({ meta: { nombre: 'X' }, curso, temas: temasCurso }),
    /archivos privados/
  )
})
