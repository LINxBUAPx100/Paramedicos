// ============================================================
//  Modelo de contenido multiacademia — lógica PURA
// ------------------------------------------------------------
//  Sin Firebase, sin React: convierte el temario (módulos + temas) en los
//  DOCUMENTOS que viven en Firestore, y genera los IDs deterministas que
//  garantizan el aislamiento por academia.
//
//  Lo comparten el cliente (seed de plantillas + clonación por academia) y
//  las pruebas de Node (`npm test`), así que la migración es reproducible y
//  verificable sin tocar Firestore.
//
//  Jerarquía objetivo: Curso → Módulo → Unidad → Tema. El temario actual migra
//  como 1 curso cuyas módulos llevan un UNIDAD IMPLÍCITO ('principal'); así la
//  jerarquía queda lista para el editor (Fase 4) sin re-migrar, y el resolutor
//  (Fase 3) puede aplanar las unidades implícitos para conservar la UX actual.
// ============================================================

// Separador de segmentos en los IDs de documento. No aparece en los ids de
// modulo/tema del temario (son slugs con guion simple), así que es un separador
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
// de los módulos del temario. Es lo que se lee para pintar el sidebar/carrusel o
// para reordenar — sin arrastrar el contenido pesado de los temas.
export function estructuraDesdeModulos(modulos) {
  return modulos.map((f) => ({
    id: f.id,
    titulo: f.titulo,
    subtitulo: f.subtitulo || '',
    descripcion: f.descripcion || '',
    color: f.color || '',
    icono: f.icono || '',
    estado: 'publicado',
    unidades: [
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
// calcula (numero, moduloId/moduloNumero/moduloTitulo/moduloColor): el orden y el módulo
// los define la estructura del curso, no el doc del tema.
// ============================================================
//  Tablas: la única forma del contenido que Firestore no admite
// ------------------------------------------------------------
//  Firestore RECHAZA un arreglo que contenga otro arreglo, y un bloque de tabla
//  guarda sus filas justo así: `filas: [['a','b'], ['c','d']]`. Medido sobre el
//  temario actual son 1 026 filas repartidas en 170 de los 287 temas, es decir
//  el 59 % del contenido.
//
//  La consecuencia era que NINGUNA academia con tablas podía migrarse: tanto
//  `migrar-contenido.mjs --seed` como `clonarPlantillaAAcademia` fallaban con
//  «Property array contains an invalid nested entity», y como la clonación cae
//  al bundle cuando algo va mal, el síntoma visible era que la academia
//  «seguía en legacy» sin decir por qué.
//
//  Se envuelve cada fila en un objeto en vez de serializar la sección entera a
//  texto: el documento sigue siendo legible en la consola de Firestore y en el
//  editor, que es donde alguien va a mirar cuando algo no cuadre.
//
//  La LECTURA acepta las dos formas a propósito. Un tema escrito antes de esto
//  —los que no tenían tabla— sigue funcionando sin migrar nada.
// ============================================================

function filaEnvuelta(fila) {
  return Array.isArray(fila) ? { celdas: fila } : fila
}

function filaDesenvuelta(fila) {
  if (Array.isArray(fila)) return fila
  return Array.isArray(fila?.celdas) ? fila.celdas : []
}

function mapearBloques(secciones, mapaFila) {
  return (secciones || []).map((seccion) => {
    const bloques = seccion?.bloques
    if (!Array.isArray(bloques)) return seccion
    return {
      ...seccion,
      bloques: bloques.map((bloque) => (
        Array.isArray(bloque?.filas)
          ? { ...bloque, filas: bloque.filas.map(mapaFila) }
          : bloque
      )),
    }
  })
}

/** Secciones listas para escribir en Firestore (filas envueltas en objetos). */
export function seccionesParaFirestore(secciones) {
  return mapearBloques(secciones, filaEnvuelta)
}

/** Secciones tal como las pinta la aplicación (filas como arreglos). */
export function seccionesDesdeFirestore(secciones) {
  return mapearBloques(secciones, filaDesenvuelta)
}

export function contenidoTema(tema) {
  return {
    temaId: tema.id,
    titulo: tema.titulo,
    icono: tema.icono || '',
    duracion: tema.duracion || '',
    resumen: tema.resumen || '',
    objetivos: tema.objetivos || [],
    secciones: seccionesParaFirestore(tema.secciones || []),
    conceptosClave: tema.conceptosClave || [],
    flashcards: tema.flashcards || [],
    quiz: tema.quiz || [],
    recursos: tema.recursos || null,
    actividades: tema.actividades || null,
    // Por defecto PUBLICADO, que es lo que el temario oficial siempre fue. Un
    // tema puede pedir otro estado y entonces manda el suyo: lo necesitan los
    // programas de andamio (Fase 3), que nacen en `borrador` para que ningún
    // alumno los alcance —`alumnoLeeCurso` exige 'publicado'— mientras se
    // comprueba que un programa nuevo funciona de punta a punta.
    estado: tema.estado || 'publicado',
  }
}

// Documentos de una PLANTILLA global a partir del temario ya ensamblado
// (módulos + todosLosTemas de src/data/index.js). Devuelve el doc de plantilla y
// la lista de docs de tema (cada uno con su docId determinista).
export function plantillaDesdeData({ id, nombre, tipoDestino = 'basico', version = 1, modulos, todosLosTemas }) {
  if (!id) throw new Error('plantillaDesdeData: falta id de plantilla.')
  const estructura = estructuraDesdeModulos(modulos)
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
    // Clase de estudio (TUM, Enfermería, TSU, Licenciatura, Curso,
    // Certificación). La hereda de la plantilla; ausente ⇒ 'tum', que es lo
    // que las academias ya tenían clonado (ver programasModelo.js).
    tipoPrograma: plantilla.tipoPrograma || 'tum',
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
