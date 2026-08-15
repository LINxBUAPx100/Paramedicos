// ============================================================
//  Registro de actividad (historial) — lógica PURA
// ------------------------------------------------------------
//  La colección `historial` lleva tiempo escribiéndose desde media aplicación
//  —altas, bajas, permisos, clonaciones, cambios de código— y NADIE podía
//  leerla: no existía ninguna pantalla. Un registro que no se mira es un
//  registro que no sirve, y encima da la falsa sensación de que hay rastro.
//
//  Aquí está lo que se puede decidir sin pintar: cómo se lee una acción, cómo
//  se filtra y qué cambió en cada entrada. Sin React y sin Firebase.
// ============================================================

// Acciones conocidas → cómo se leen y de qué familia son. Lo que no esté aquí
// se enseña tal cual (en kebab), que es mejor que esconderlo: una acción nueva
// debe verse aunque nadie haya actualizado esta tabla.
export const ACCIONES = {
  'crear-academia': { texto: 'Creó una academia', tono: 'alta' },
  'suspender-academia': { texto: 'Suspendió una academia', tono: 'baja' },
  'archivar-academia': { texto: 'Archivó una academia', tono: 'baja' },
  'borrar-academia': { texto: 'Borró una academia', tono: 'peligro' },
  'cambiar-codigo': { texto: 'Cambió el código de la academia', tono: 'aviso' },
  'crear-usuario': { texto: 'Dio de alta a una persona', tono: 'alta' },
  'baja-usuario': { texto: 'Dio de baja a una persona', tono: 'baja' },
  'reactivar-usuario': { texto: 'Reactivó una cuenta', tono: 'alta' },
  'borrar-usuario': { texto: 'Borró a una persona', tono: 'peligro' },
  'cambiar-rol': { texto: 'Cambió un rol', tono: 'aviso' },
  'conceder-permisos': { texto: 'Concedió permisos editoriales', tono: 'alta' },
  'retirar-permisos': { texto: 'Retiró permisos editoriales', tono: 'baja' },
  'crear-grupo': { texto: 'Creó un grupo', tono: 'alta' },
  'borrar-grupo': { texto: 'Borró un grupo', tono: 'peligro' },
  'activar-copia-editable': { texto: 'Activó la copia editable del temario', tono: 'alta' },
  'crear-plantilla': { texto: 'Creó una plantilla', tono: 'alta' },
  'crear-fase': { texto: 'Creó una fase', tono: 'alta' },
  'crear-modulo': { texto: 'Creó un módulo', tono: 'alta' },
  'crear-tema': { texto: 'Creó un tema', tono: 'alta' },
  'archivar-nodo': { texto: 'Archivó contenido', tono: 'baja' },
  'publicar-nodo': { texto: 'Publicó contenido', tono: 'alta' },
  'borrar-evaluacion': { texto: 'Borró una evaluación', tono: 'peligro' },
}

export function leerAccion(accion) {
  const conocida = ACCIONES[accion]
  if (conocida) return conocida
  // Una acción sin traducir se enseña legible en vez de en bruto.
  const texto = String(accion || 'acción desconocida').replace(/-/g, ' ')
  return { texto: texto.charAt(0).toUpperCase() + texto.slice(1), tono: 'neutro' }
}

// Familias para el filtro. Se derivan del NOMBRE de la acción y no de una lista
// aparte, para que una acción nueva caiga sola en su sitio.
export function familiaDe(accion) {
  const a = String(accion || '')
  if (/borrar|eliminar/.test(a)) return 'borrado'
  if (/baja|suspender|archivar|retirar|despublicar/.test(a)) return 'baja'
  if (/crear|alta|conceder|publicar|activar/.test(a)) return 'alta'
  return 'otro'
}

export const FAMILIAS = [
  { id: '', etiqueta: 'Todo' },
  { id: 'borrado', etiqueta: 'Borrados' },
  { id: 'baja', etiqueta: 'Bajas y archivados' },
  { id: 'alta', etiqueta: 'Altas y permisos' },
  { id: 'otro', etiqueta: 'Otros' },
]

// Filtra por academia, familia y texto libre (acción, colección, doc, usuario).
export function filtrarHistorial(entradas, { academiaId = '', familia = '', busca = '' } = {}) {
  const q = String(busca || '').trim().toLowerCase()
  return (entradas || []).filter((e) => {
    if (!e) return false
    if (academiaId && e.academiaId !== academiaId) return false
    if (familia && familiaDe(e.accion) !== familia) return false
    if (!q) return true
    const heno = [e.accion, e.coleccion, e.docId, e.usuario, e.academiaId, e.origen]
      .filter(Boolean).join(' ').toLowerCase()
    return heno.includes(q)
  })
}

// Qué campos cambiaron entre `antes` y `despues`. Se calcula aquí para poder
// probarlo: es lo único del registro que responde «¿y qué pasó exactamente?».
export function camposCambiados(antes, despues) {
  const a = antes && typeof antes === 'object' ? antes : {}
  const d = despues && typeof despues === 'object' ? despues : {}
  const claves = [...new Set([...Object.keys(a), ...Object.keys(d)])].sort()
  const cambios = []
  for (const clave of claves) {
    const va = JSON.stringify(a[clave])
    const vd = JSON.stringify(d[clave])
    if (va !== vd) cambios.push({ clave, antes: a[clave], despues: d[clave] })
  }
  return cambios
}

// Cuántas entradas hay de cada familia, para el resumen de arriba.
export function contarPorFamilia(entradas) {
  const cuenta = { borrado: 0, baja: 0, alta: 0, otro: 0 }
  for (const e of entradas || []) cuenta[familiaDe(e?.accion)] += 1
  return cuenta
}
