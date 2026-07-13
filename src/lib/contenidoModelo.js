// ============================================================
//  Modelo de contenido multiacademia — lógica PURA
// ------------------------------------------------------------
//  Sin Firebase, sin React: convierte el temario (fases + temas) en los
//  DOCUMENTOS que viven en Firestore, y genera los IDs deterministas que
//  garantizan el aislamiento por academia.
//
//  Lo comparten el cliente (seed de plantillas + clonación por academia) y
//  las pruebas de Node (`npm test`), así que la migración es reproducible y
//  verificable sin tocar Firestore.
//
//  Jerarquía objetivo: Curso → Fase → Módulo → Tema. El temario actual migra
//  como 1 curso cuyas fases llevan un MÓDULO IMPLÍCITO ('principal'); así la
//  jerarquía queda lista para el editor (Fase 4) sin re-migrar, y el resolutor
//  (Fase 3) puede aplanar los módulos implícitos para conservar la UX actual.
// ============================================================

// Separador de segmentos en los IDs de documento. No aparece en los ids de
// fase/tema del temario (son slugs con guion simple), así que es un separador
// inequívoco: academiaId__plantillaId__temaId.
export const SEP = '__'

// Clon PROFUNDO de un valor (los datos de contenido son JSON-serializables).
// La clonación plantilla→academia debe producir documentos totalmente
// independientes: sin referencias compartidas, para que mutar la copia de una
// academia jamás toque la plantilla ni la copia de otra academia.
export function clonProfundo(valor) {
  if (valor === null || valor === undefined) return valor
  return structuredClone(valor)
}

// ID determinista del curso de una academia para una plantilla dada.
// Determinista ⇒ clonar es idempotente (reejecutar reescribe, nunca duplica).
export function cursoIdDe(academiaId, plantillaId) {
  return `${academiaId}${SEP}${plantillaId}`
}

// ID del doc de contenido de un tema dentro del curso de una academia.
export function temaDocIdEnCurso(cursoId, temaId) {
  return `${cursoId}${SEP}${temaId}`
}

// ID del doc de contenido de un tema dentro de una plantilla global.
export function temaDocIdEnPlantilla(plantillaId, temaId) {
  return `${plantillaId}${SEP}${temaId}`
}

// Divide una lista en lotes de `tam` elementos (para writeBatch: límite de
// Firestore de 500 operaciones y ~10 MB por lote). 20 deja holgura de payload
// aunque algún tema pese decenas de KB.
export function lotes(items, tam = 20) {
  const out = []
  const n = Math.max(1, tam)
  for (let i = 0; i < items.length; i += n) out.push(items.slice(i, i + n))
  return out
}

// Estructura LIGERA de un curso (solo metadatos: ids, títulos, estado) a partir
// de las fases del temario. Es lo que se lee para pintar el sidebar/carrusel o
// para reordenar — sin arrastrar el contenido pesado de los temas.
export function estructuraDesdeFases(fases) {
  return fases.map((f) => ({
    id: f.id,
    titulo: f.titulo,
    subtitulo: f.subtitulo || '',
    descripcion: f.descripcion || '',
    color: f.color || '',
    icono: f.icono || '',
    estado: 'publicado',
    modulos: [
      {
        id: 'principal',
        titulo: 'Contenido',
        implicito: true,
        temas: (f.temas || []).map((t) => ({
          id: t.id,
          titulo: t.titulo,
          estado: 'publicado',
        })),
      },
    ],
  }))
}

// Contenido de UN tema como documento, SIN los campos derivados que index.js
// calcula (numero, faseId/faseNumero/faseTitulo/faseColor): el orden y la fase
// los define la estructura del curso, no el doc del tema.
export function contenidoTema(tema) {
  return {
    temaId: tema.id,
    titulo: tema.titulo,
    icono: tema.icono || '',
    duracion: tema.duracion || '',
    resumen: tema.resumen || '',
    objetivos: tema.objetivos || [],
    secciones: tema.secciones || [],
    conceptosClave: tema.conceptosClave || [],
    flashcards: tema.flashcards || [],
    quiz: tema.quiz || [],
    recursos: tema.recursos || null,
    actividades: tema.actividades || null,
    estado: 'publicado',
  }
}

// Documentos de una PLANTILLA global a partir del temario ya ensamblado
// (fases + todosLosTemas de src/data/index.js). Devuelve el doc de plantilla y
// la lista de docs de tema (cada uno con su docId determinista).
export function plantillaDesdeData({ id, nombre, tipoDestino = 'basico', version = 1, fases, todosLosTemas }) {
  if (!id) throw new Error('plantillaDesdeData: falta id de plantilla.')
  const estructura = estructuraDesdeFases(fases)
  const temas = (todosLosTemas || []).map((t) => ({
    docId: temaDocIdEnPlantilla(id, t.id),
    plantillaId: id,
    ...contenidoTema(t),
  }))
  const plantilla = {
    id,
    nombre: nombre || id,
    tipoDestino,
    version,
    estado: 'publicada',
    estructura,
  }
  return { plantilla, temas }
}

// Doc de CURSO de una academia a partir de una plantilla. La copia registra
// su origen (`plantillaOrigenId` + `versionOrigen`): los cambios posteriores
// de la plantilla NO se propagan solos (la replicación llega en la Fase 9).
export function cursoDesdePlantilla({ academiaId, plantilla }) {
  if (!academiaId) throw new Error('cursoDesdePlantilla: falta academiaId.')
  if (!plantilla?.id) throw new Error('cursoDesdePlantilla: falta la plantilla.')
  return {
    docId: cursoIdDe(academiaId, plantilla.id),
    academiaId,
    plantillaId: plantilla.id,
    titulo: plantilla.nombre || plantilla.id,
    tipoDestino: plantilla.tipoDestino || 'basico',
    estado: 'publicado',
    orden: 1,
    plantillaOrigenId: plantilla.id,
    versionOrigen: plantilla.version ?? 1,
    estructura: clonProfundo(plantilla.estructura || []),
  }
}

// A partir de los docs de una plantilla, calcula los docs de contenido que le
// tocan a UNA academia al clonar (namespace de la academia). No escribe nada;
// solo mapea (lo usan la clonación real y las pruebas de aislamiento).
// Cada campo anidado se CLONA en profundidad: la copia de la academia no
// comparte ninguna referencia con la plantilla ni con otras copias.
export function docsClonadosParaAcademia({ academiaId, plantillaId, plantillaTemas }) {
  const cursoId = cursoIdDe(academiaId, plantillaId)
  return {
    cursoId,
    temas: (plantillaTemas || []).map((t) => ({
      docId: temaDocIdEnCurso(cursoId, t.temaId),
      academiaId,
      cursoId,
      temaId: t.temaId,
      titulo: t.titulo,
      icono: t.icono || '',
      duracion: t.duracion || '',
      resumen: t.resumen || '',
      objetivos: clonProfundo(t.objetivos || []),
      secciones: clonProfundo(t.secciones || []),
      conceptosClave: clonProfundo(t.conceptosClave || []),
      flashcards: clonProfundo(t.flashcards || []),
      quiz: clonProfundo(t.quiz || []),
      recursos: clonProfundo(t.recursos ?? null),
      actividades: clonProfundo(t.actividades ?? null),
      estado: t.estado || 'publicado',
    })),
  }
}
