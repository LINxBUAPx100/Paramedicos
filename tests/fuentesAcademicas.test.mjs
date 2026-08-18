import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const leerJson = (ruta) => JSON.parse(readFileSync(new URL(ruta, import.meta.url), 'utf8'))

const plan = leerJson('../scripts/seed/plan-rescate.json')
const registro = leerJson('../docs/REGISTRO-FUENTES-ACADEMICAS.json')
const programa = plan.programas.find((item) => item.id === 'tum-rescate')

const unidadesContenido = programa.modulos.flatMap((modulo) =>
  modulo.unidades.filter((unidad) => unidad.tipo === 'contenido'),
)

const camposDeFuentes = [
  'primarias',
  'apoyo',
  'actualizacion',
  'historicas',
  'requiere',
  'candidatas',
]

test('cada unidad de contenido del plan tiene una asignación académica', () => {
  const idsOficiales = unidadesContenido.map((unidad) => unidad.id).sort()
  const idsRegistrados = Object.keys(registro.asignacionPorUnidad).sort()

  assert.deepEqual(idsRegistrados, idsOficiales)
})

test('cada clave usada por una unidad existe en el catálogo de fuentes', () => {
  for (const [unidadId, asignacion] of Object.entries(registro.asignacionPorUnidad)) {
    for (const campo of camposDeFuentes) {
      for (const clave of asignacion[campo] ?? []) {
        assert.ok(
          registro.fuentes[clave],
          `${unidadId}.${campo} usa la fuente inexistente ${clave}`,
        )
      }
    }
  }
})

test('las cuatro unidades del Módulo 7 siguen bloqueadas por falta de alcance', () => {
  const modulo7 = unidadesContenido.filter((unidad) => unidad.id.startsWith('m7-'))

  assert.equal(modulo7.length, 4)
  for (const unidad of modulo7) {
    assert.equal(
      registro.asignacionPorUnidad[unidad.id].estado,
      'bloqueado_por_decision',
      unidad.id,
    )
  }
})

