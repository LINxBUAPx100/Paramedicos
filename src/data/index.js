import { fase1 } from './fase1.js'
import { fase2 } from './fase2.js'
import { fase3 } from './fase3.js'
import { fase4 } from './fase4.js'
import { fase5 } from './fase5.js'
import { extraFase1 } from './extraFase1.js'
import { extraFase2 } from './extraFase2.js'
import { extraFase3 } from './extraFase3.js'
import { extraFase4 } from './extraFase4.js'
import { extraFase5 } from './extraFase5.js'

// Une los temas base de cada fase con los temas ampliados (sin mutar los originales).
const extrasPorFase = {
  'fase-1': extraFase1,
  'fase-2': extraFase2,
  'fase-3': extraFase3,
  'fase-4': extraFase4,
  'fase-5': extraFase5,
}

export const fases = [fase1, fase2, fase3, fase4, fase5].map((f) => ({
  ...f,
  temas: [...f.temas, ...(extrasPorFase[f.id] || [])],
}))

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
