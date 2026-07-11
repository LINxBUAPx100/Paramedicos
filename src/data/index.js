import { REGISTRO } from './registro.js'

// Ensambla las fases en ORDEN y con NUMERACIÓN AUTOMÁTICA (ver registro.js).
//  · El orden lo define el campo `orden` del registro.
//  · `fase.numero` (1, 2, 3…) y `tema.numero` ('1.1', '1.2'…) se CALCULAN desde
//    la posición → reordenar el registro renumera todo, sin tocar el contenido.
//  · El `id` de cada fase/tema es identidad estable (URLs + progreso) y no se toca.
//  · Cualquier `numero` escrito a mano en los archivos de datos se ignora aquí.
export const fases = [...REGISTRO]
  .sort((a, b) => a.orden - b.orden)
  .map(({ fase, extra }, i) => {
    const numero = i + 1
    const temas = [...fase.temas, ...(extra || [])].map((tema, j) => ({
      ...tema,
      numero: `${numero}.${j + 1}`,
    }))
    return { ...fase, numero, temas }
  })

// Lista plana de todos los temas, enriquecida con datos de su fase.
export const todosLosTemas = fases.flatMap((fase) =>
  fase.temas.map((tema) => ({
    ...tema,
    faseId: fase.id,
    faseNumero: fase.numero,
    faseTitulo: fase.titulo,
    faseColor: fase.color,
  }))
)

// Mapa: clave de imagen del Atlas (diagrama/imagen) → id del tema donde aparece
// (el primero encontrado). Permite saltar del Atlas al tema correspondiente.
export const temaPorClaveImagen = (() => {
  const map = {}
  for (const tema of todosLosTemas) {
    for (const sec of tema.secciones || []) {
      for (const bloque of sec.bloques || []) {
        if ((bloque.tipo === 'diagrama' || bloque.tipo === 'imagen') && bloque.clave && !map[bloque.clave]) {
          map[bloque.clave] = tema.id
        }
      }
    }
  }
  return map
})()

export function getFase(faseId) {
  return fases.find((f) => f.id === faseId)
}

export function getTema(temaId) {
  return todosLosTemas.find((t) => t.id === temaId)
}

// Navegación anterior/siguiente entre temas (orden global).
export function getTemaVecinos(temaId) {
  const idx = todosLosTemas.findIndex((t) => t.id === temaId)
  return {
    anterior: idx > 0 ? todosLosTemas[idx - 1] : null,
    siguiente: idx < todosLosTemas.length - 1 ? todosLosTemas[idx + 1] : null,
    indice: idx,
    total: todosLosTemas.length,
  }
}

// Estadísticas globales del temario.
export const stats = {
  fases: fases.length,
  temas: todosLosTemas.length,
  preguntas: todosLosTemas.reduce((acc, t) => acc + (t.quiz?.length || 0), 0),
  flashcards: todosLosTemas.reduce((acc, t) => acc + (t.flashcards?.length || 0), 0),
  conceptos: todosLosTemas.reduce((acc, t) => acc + (t.conceptosClave?.length || 0), 0),
}

// Todas las preguntas con metadatos de su tema (para el examen general).
export const todasLasPreguntas = todosLosTemas.flatMap((tema) =>
  (tema.quiz || []).map((q, i) => ({
    ...q,
    id: `${tema.id}-${i}`,
    temaId: tema.id,
    temaTitulo: tema.titulo,
    faseColor: tema.faseColor,
  }))
)

// Todas las flashcards con metadatos.
export const todasLasFlashcards = todosLosTemas.flatMap((tema) =>
  (tema.flashcards || []).map((f, i) => ({
    ...f,
    id: `${tema.id}-fc-${i}`,
    temaId: tema.id,
    temaTitulo: tema.titulo,
    faseColor: tema.faseColor,
  }))
)

// Búsqueda simple de texto sobre temas y conceptos.
export function buscar(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const resultados = []
  for (const tema of todosLosTemas) {
    const enTitulo = tema.titulo.toLowerCase().includes(q)
    const enResumen = (tema.resumen || '').toLowerCase().includes(q)
    const conceptos = (tema.conceptosClave || []).filter(
      (c) =>
        c.termino.toLowerCase().includes(q) ||
        c.definicion.toLowerCase().includes(q)
    )
    if (enTitulo || enResumen || conceptos.length > 0) {
      resultados.push({ tema, conceptos })
    }
  }
  return resultados
}
