import { planRescate } from './planRescate.js'

// TEMARIO OFICIAL de la academia R.E.S.C.A.T.E. (generado desde
// scripts/seed/plan-rescate.json — ver scripts/gen-plan-rescate.mjs).
//
// Sustituye al temario ficticio que vivía en registro.js + faseN.js. Esos
// archivos SIGUEN en el repo pero ya no se importan: se conservan porque
// contienen el material redactado (374 preguntas, 457 flashcards) que puede
// reaprovecharse al llenar los temas oficiales, y porque revertir esta fase es
// cambiar esta línea por `import { REGISTRO } from './registro.js'`.
const REGISTRO = planRescate.map((modulo, i) => ({ orden: i + 1, fase: modulo }))

// Ensambla los MÓDULOS en ORDEN y con NUMERACIÓN AUTOMÁTICA (ver registro.js).
//  · El orden lo define el campo `orden` del registro.
//  · `modulo.numero` (1, 2, 3…) y `tema.numero` ('1.1', '1.2'…) se CALCULAN desde
//    la posición → reordenar el registro renumera todo, sin tocar el contenido.
//  · El `id` de cada módulo/tema es identidad estable (URLs + progreso) y no se toca.
//  · Cualquier `numero` escrito a mano en los archivos de datos se ignora aquí.
//
//  FRONTERA CON EL BUNDLE LEGACY: los archivos de `src/data/` (registro.js,
//  faseN.js, extraFaseN.js) conservan a propósito la nomenclatura vieja —son el
//  temario ficticio que el temario oficial R.E.S.C.A.T.E. va a reemplazar, y
//  contienen la palabra "fase" dentro de TEXTO MÉDICO ("fase de shock"), así que
//  renombrarlos sería a la vez inútil y peligroso. La traducción se hace aquí,
//  en el único punto de entrada: `{ fase }` del registro → `modulo` de la API.
export const modulos = [...REGISTRO]
  .sort((a, b) => a.orden - b.orden)
  .map(({ fase: modulo, extra }, i) => {
    const numero = i + 1
    // Los temas se ordenan por su campo `orden` opcional (para reordenar sin mover
    // contenido). Los que no lo tienen conservan su posición (sort estable).
    const temas = [...modulo.temas, ...(extra || [])]
      .sort((a, b) => (a.orden ?? 1e9) - (b.orden ?? 1e9))
      .map((tema, j) => ({ ...tema, numero: `${numero}.${j + 1}` }))
    return { ...modulo, numero, temas }
  })

// Lista plana de todos los temas, enriquecida con datos de su módulo.
export const todosLosTemas = modulos.flatMap((modulo) =>
  modulo.temas.map((tema) => ({
    ...tema,
    moduloId: modulo.id,
    moduloNumero: modulo.numero,
    moduloTitulo: modulo.titulo,
    moduloColor: modulo.color,
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

export function getModulo(moduloId) {
  return modulos.find((f) => f.id === moduloId)
}

export function getTema(temaId) {
  return todosLosTemas.find((t) => t.id === temaId)
}

// Todas las preguntas de un módulo (de todos sus temas) — para el examen de módulo.
export function preguntasDeModulo(moduloId) {
  const modulo = getModulo(moduloId)
  if (!modulo) return []
  return modulo.temas.flatMap((tema) =>
    (tema.quiz || []).map((q, i) => ({
      ...q,
      id: `${tema.id}-${i}`,
      temaId: tema.id,
      temaTitulo: tema.titulo,
    }))
  )
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
  modulos: modulos.length,
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
    moduloColor: tema.moduloColor,
  }))
)

// Todas las flashcards con metadatos.
export const todasLasFlashcards = todosLosTemas.flatMap((tema) =>
  (tema.flashcards || []).map((f, i) => ({
    ...f,
    id: `${tema.id}-fc-${i}`,
    temaId: tema.id,
    temaTitulo: tema.titulo,
    moduloColor: tema.moduloColor,
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
