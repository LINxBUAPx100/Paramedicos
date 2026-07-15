// ============================================================
//  Plantillas globales: metadatos, versionado e inmutabilidad — lógica PURA
// ------------------------------------------------------------
//  Sin Firebase, sin React (se prueba con `npm test`).
//
//  Ciclo de vida:  borrador → publicada → archivada (reversible a publicada).
//  Una versión PUBLICADA es INMUTABLE: modificar una plantilla publicada
//  significa editar su borrador de trabajo y PUBLICAR UNA VERSIÓN NUEVA.
//  Cada publicación deja un snapshot completo (estructura + temas + huella)
//  en `plantillasVersiones` / `plantillasVersionesTemas`, que es lo que las
//  replicaciones usan como ORIGEN (el borrador de trabajo nunca se replica).
// ============================================================
import { clonProfundo, SEP } from './contenidoModelo.js'
import {
  huella, huellaTema, huellaEstructura, contenidoComparableTema,
} from './replicacionModelo.js'
import { rutaDesdeUrlStorage } from './archivosModelo.js'

export const ESTADOS_PLANTILLA = ['borrador', 'publicada', 'archivada']

export const ETIQUETA_ESTADO_PLANTILLA = {
  borrador: 'Borrador',
  publicada: 'Publicada',
  archivada: 'Archivada',
}

// ---------- Identificadores ----------

// Slug seguro para ids de plantilla (sin '__', que es el separador reservado).
export function slugPlantilla(texto) {
  const s = String(texto || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return s || 'plantilla'
}

// Doc-id del snapshot de UNA versión publicada.
export function versionDocId(plantillaId, version) {
  return `${plantillaId}${SEP}v${version}`
}

// Doc-id del contenido de un tema DENTRO de una versión publicada. Cada doc
// lleva además el campo `versionId` (= versionDocId) para consultar la
// versión completa con UN where de un solo campo (sin índice compuesto).
export function temaVersionDocId(plantillaId, version, temaId) {
  return `${versionDocId(plantillaId, version)}${SEP}${temaId}`
}

// ---------- Metadatos ----------

export function conteosDeEstructura(estructura) {
  const fases = (estructura || []).length
  let modulos = 0
  let temas = 0
  for (const f of estructura || []) {
    modulos += (f.modulos || []).length
    for (const m of f.modulos || []) temas += (m.temas || []).length
  }
  return { cursos: 1, fases, modulos, temas }
}

// Normaliza los metadatos editables de una plantilla (solo claves conocidas).
export function normalizarMetadatosPlantilla(meta = {}) {
  return {
    nombre: String(meta.nombre || '').trim().slice(0, 120),
    descripcion: String(meta.descripcion || '').trim().slice(0, 600),
    categoria: String(meta.categoria || '').trim().slice(0, 60),
    tipoDestino: ['basico', 'avanzado', 'medicina'].includes(meta.tipoDestino) ? meta.tipoDestino : 'basico',
    planesCompatibles: Array.isArray(meta.planesCompatibles)
      ? meta.planesCompatibles.filter((p) => ['base', 'pro', 'curso'].includes(p))
      : ['base', 'pro', 'curso'],
  }
}

export function validarMetadatosPlantilla(meta) {
  const m = normalizarMetadatosPlantilla(meta)
  if (!m.nombre) return 'La plantilla necesita un nombre.'
  if (!m.planesCompatibles.length) return 'Selecciona al menos un plan compatible.'
  return null
}

// ---------- Inmutabilidad ----------

// ¿Se puede editar el CONTENIDO de trabajo de la plantilla? Solo en borrador.
// (El editor en modo plantilla debe consultar esto: una plantilla publicada
// exige crear el siguiente borrador con `prepararNuevaVersion`.)
export function puedeEditarPlantilla(plantilla) {
  return (plantilla?.estado || 'borrador') === 'borrador'
}

// ¿Se puede publicar? Borrador con contenido. Una versión publicada jamás se
// re-publica con el mismo número.
export function puedePublicarPlantilla(plantilla) {
  if (!plantilla) return { permitido: false, motivo: 'No hay plantilla.' }
  if ((plantilla.estado || 'borrador') !== 'borrador') {
    return { permitido: false, motivo: 'Solo un borrador se puede publicar; crea una versión nueva para modificar una publicada.' }
  }
  const conteos = conteosDeEstructura(plantilla.estructura)
  if (!conteos.temas) return { permitido: false, motivo: 'La plantilla no tiene temas.' }
  return { permitido: true, motivo: null }
}

// Prepara el borrador de la SIGUIENTE versión de una plantilla publicada
// (el contenido de trabajo se conserva; solo cambia el estado y el número).
export function prepararNuevaVersion(plantilla) {
  if ((plantilla?.estado || '') !== 'publicada' && (plantilla?.estado || '') !== 'archivada') {
    throw new Error('Solo una plantilla publicada (o archivada) genera una versión nueva.')
  }
  return {
    estado: 'borrador',
    version: (plantilla.version ?? 1) + 1,
  }
}

// ---------- Snapshot de publicación ----------

// Snapshot completo e INMUTABLE de la versión que se publica. Devuelve el doc
// de la versión y los docs de tema del snapshot (ids deterministas).
export function snapshotDeVersion({ plantilla, temas, autor = null, notas = '' }) {
  if (!plantilla?.id) throw new Error('snapshotDeVersion: falta la plantilla.')
  const version = plantilla.version ?? 1
  const vId = versionDocId(plantilla.id, version)
  const docsTemas = (temas || []).map((t) => ({
    docId: temaVersionDocId(plantilla.id, version, t.temaId),
    versionId: vId,
    plantillaId: plantilla.id,
    version,
    temaId: t.temaId,
    ...clonProfundo(contenidoComparableTema(t)),
    estado: t.estado || 'publicado',
    hash: huellaTema(t),
  }))
  const docVersion = {
    docId: vId,
    plantillaId: plantilla.id,
    version,
    nombre: plantilla.nombre || plantilla.id,
    notas: String(notas || '').slice(0, 1000),
    estructura: clonProfundo(plantilla.estructura || []),
    hashEstructura: huellaEstructura(plantilla.estructura),
    hash: huella({
      estructura: plantilla.estructura || [],
      temas: docsTemas.map((d) => ({ id: d.temaId, h: d.hash })).sort((a, b) => (a.id < b.id ? -1 : 1)),
    }),
    conteos: conteosDeEstructura(plantilla.estructura),
    autor,
    origen: plantilla.origen || 'manual',
    academiaOrigenId: plantilla.academiaOrigenId || null,
    cursoOrigenId: plantilla.cursoOrigenId || null,
  }
  return { docVersion, docsTemas }
}

// Diferencias entre dos versiones (por huella de tema): qué se agregó, quitó
// o modificó. Suficiente para las notas de versión y la vista de historial.
export function cambiosEntreVersiones({ temasAnterior, temasNueva }) {
  const antes = new Map((temasAnterior || []).map((t) => [t.temaId, t.hash || huellaTema(t)]))
  const ahora = new Map((temasNueva || []).map((t) => [t.temaId, t.hash || huellaTema(t)]))
  const agregados = []
  const quitados = []
  const modificados = []
  for (const [id, h] of ahora) {
    if (!antes.has(id)) agregados.push(id)
    else if (antes.get(id) !== h) modificados.push(id)
  }
  for (const id of antes.keys()) if (!ahora.has(id)) quitados.push(id)
  return { agregados, quitados, modificados }
}

// ---------- Plantilla a partir de un curso de academia ----------

// Referencias PRIVADAS de Storage dentro del contenido de un tema: cualquier
// path o URL que apunte a `academias/…`. Una plantilla global no puede
// referenciarlas (quedarían apuntando al almacenamiento de una academia y,
// al clonar, otras academias leerían/romperían recursos ajenos).
export function referenciasPrivadasEnTema(contenido) {
  const privadas = []
  for (const a of contenido?.recursos?.archivos || []) {
    if (String(a.path || '').startsWith('academias/')) {
      privadas.push(`archivo "${a.titulo || a.path}"`)
    } else {
      const ruta = rutaDesdeUrlStorage(a.url)
      if (ruta && ruta.startsWith('academias/')) privadas.push(`archivo "${a.titulo || a.url}"`)
    }
  }
  const urls = []
  for (const img of contenido?.recursos?.imagenes || []) urls.push(img?.src)
  for (const sec of contenido?.secciones || []) {
    for (const b of sec.bloques || []) {
      if (b.tipo === 'imagen' || b.tipo === 'diagrama') urls.push(b.src)
    }
  }
  for (const u of urls) {
    const ruta = rutaDesdeUrlStorage(u)
    if (ruta && ruta.startsWith('academias/')) privadas.push('una imagen del contenido')
  }
  return privadas
}

// Convierte el CURSO de una academia en una plantilla global nueva (borrador).
// Limpia todo rastro de la academia (ids, sellos, autores) y BLOQUEA el
// contenido con referencias privadas de Storage: el super-admin debe
// sustituirlas por URLs públicas antes de convertir.
export function plantillaDesdeCurso({ plantillaId, meta, curso, temas, autor = null }) {
  if (!curso) throw new Error('plantillaDesdeCurso: falta el curso origen.')
  const id = slugPlantilla(plantillaId || meta?.nombre || curso.titulo)
  const errorMeta = validarMetadatosPlantilla({ nombre: curso.titulo, ...meta })
  if (errorMeta) throw new Error(errorMeta)

  const bloqueos = []
  for (const t of temas || []) {
    const privadas = referenciasPrivadasEnTema(t)
    if (privadas.length) bloqueos.push({ temaId: t.temaId, titulo: t.titulo, referencias: privadas })
  }
  if (bloqueos.length) {
    const detalle = bloqueos.map((b) => `"${b.titulo || b.temaId}"`).join(', ')
    const err = new Error(
      `No se puede convertir: ${bloqueos.length} tema(s) referencian archivos privados de la academia (${detalle}). ` +
      'Sustituye esos recursos por URLs públicas y vuelve a intentarlo.'
    )
    err.bloqueos = bloqueos
    throw err
  }

  const plantilla = {
    id,
    ...normalizarMetadatosPlantilla({ nombre: curso.titulo, ...meta }),
    version: 1,
    estado: 'borrador',
    origen: 'curso-academia',
    academiaOrigenId: curso.academiaId || null,
    cursoOrigenId: curso.id || curso.docId || null,
    estructura: clonProfundo(curso.estructura || []),
    creadaPor: autor,
  }
  const temasPlantilla = (temas || []).map((t) => ({
    docId: `${id}${SEP}${t.temaId}`,
    plantillaId: id,
    temaId: t.temaId,
    ...clonProfundo(contenidoComparableTema(t)),
    estado: t.estado || 'publicado',
  }))
  return { plantilla, temas: temasPlantilla }
}
