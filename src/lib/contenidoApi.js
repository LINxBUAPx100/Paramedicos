// ============================================================
//  Capa de acceso al contenido — lógica PURA
// ------------------------------------------------------------
//  Sin Firebase, sin React. Dos responsabilidades:
//
//  1. ESTADOS de migración de una academia (campo `academias/{id}.contenido`):
//       legacy   → sin migrar: la app sirve el bundle src/data (default).
//       migrando → clonación en curso: se sigue sirviendo legacy.
//       migrado  → copia propia completa: se sirve SU contenido de Firestore.
//       error    → clonación fallida: se sirve legacy hasta reintentar.
//
//  2. RECONSTRUCCIÓN de la API de contenido (la misma forma que exporta
//     src/data/index.js) a partir de los docs de Firestore de una academia:
//     estructura ligera del curso + un doc por tema. Así los componentes
//     consumen SIEMPRE la misma interfaz y nunca deciden entre fuentes:
//     eso lo hace el resolutor (src/lib/firebase/contenido.js).
//
//  El orden y la numeración (fase.numero, tema.numero '1.1') se calculan de
//  la posición en la estructura — mismo contrato que src/data/index.js.
// ============================================================

export const ESTADOS_CONTENIDO = ['legacy', 'migrando', 'migrado', 'error']

// Estado de migración de contenido de una academia. Cualquier valor ausente
// o basura se trata como 'legacy' (nunca rompe una academia existente).
export function estadoContenido(academia) {
  const e = academia?.contenido?.estado
  return ESTADOS_CONTENIDO.includes(e) ? e : 'legacy'
}

// Solo 'migrado' habilita leer la copia de Firestore de la academia.
export function academiaMigrada(academia) {
  return estadoContenido(academia) === 'migrado'
}

// Doc de tema de Firestore → tema con la forma que espera la UI (id, no temaId).
export function temaDesdeDoc(docTema) {
  return {
    id: docTema.temaId,
    titulo: docTema.titulo,
    icono: docTema.icono || '',
    duracion: docTema.duracion || '',
    resumen: docTema.resumen || '',
    objetivos: docTema.objetivos || [],
    secciones: docTema.secciones || [],
    conceptosClave: docTema.conceptosClave || [],
    flashcards: docTema.flashcards || [],
    quiz: docTema.quiz || [],
    recursos: docTema.recursos || null,
    actividades: docTema.actividades || null,
  }
}

// Ensambla las fases completas de un curso: estructura ligera (orden, títulos,
// módulos) + mapa temaId→doc de contenido. Aplana los módulos (implícitos en
// la migración) para conservar la UX actual Fase→Temas.
//  - Por defecto solo entra lo PUBLICADO (lo que ve el alumno).
//  - `faltantes` lista temas presentes en la estructura sin doc de contenido
//    (clonación parcial): el resolutor decide si sirve o cae a legacy.
export function ensamblarFases(estructura, temasPorId, { incluirBorradores = false } = {}) {
  const visible = (x) => incluirBorradores || (x.estado || 'publicado') === 'publicado'
  const buscar = (id) => (temasPorId instanceof Map ? temasPorId.get(id) : temasPorId?.[id])
  const faltantes = []
  const fases = (estructura || []).filter(visible).map((f) => ({
    id: f.id,
    titulo: f.titulo,
    subtitulo: f.subtitulo || '',
    descripcion: f.descripcion || '',
    color: f.color || '',
    icono: f.icono || '',
    temas: (f.modulos || [])
      .filter(visible) // un módulo en borrador/archivado oculta TODA su rama
      .flatMap((m) => m.temas || [])
      .filter(visible)
      .map((t) => {
        const docTema = buscar(t.id)
        if (!docTema) {
          faltantes.push(t.id)
          return null
        }
        return temaDesdeDoc(docTema)
      })
      .filter(Boolean),
  }))
  return { fases, faltantes }
}

// Construye la MISMA API derivada que src/data/index.js a partir de fases ya
// ensambladas y ordenadas. Los componentes no distinguen la fuente.
export function construirApi(fasesBase) {
  const fases = (fasesBase || []).map((f, i) => {
    const numero = i + 1
    return {
      ...f,
      numero,
      temas: (f.temas || []).map((t, j) => ({ ...t, numero: `${numero}.${j + 1}` })),
    }
  })

  const todosLosTemas = fases.flatMap((fase) =>
    fase.temas.map((tema) => ({
      ...tema,
      faseId: fase.id,
      faseNumero: fase.numero,
      faseTitulo: fase.titulo,
      faseColor: fase.color,
    }))
  )

  const temaPorClaveImagen = (() => {
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

  const getFase = (faseId) => fases.find((f) => f.id === faseId)
  const getTema = (temaId) => todosLosTemas.find((t) => t.id === temaId)

  const preguntasDeFase = (faseId) => {
    const fase = getFase(faseId)
    if (!fase) return []
    return fase.temas.flatMap((tema) =>
      (tema.quiz || []).map((q, i) => ({
        ...q,
        id: `${tema.id}-${i}`,
        temaId: tema.id,
        temaTitulo: tema.titulo,
      }))
    )
  }

  const getTemaVecinos = (temaId) => {
    const idx = todosLosTemas.findIndex((t) => t.id === temaId)
    return {
      anterior: idx > 0 ? todosLosTemas[idx - 1] : null,
      siguiente: idx < todosLosTemas.length - 1 ? todosLosTemas[idx + 1] : null,
      indice: idx,
      total: todosLosTemas.length,
    }
  }

  const stats = {
    fases: fases.length,
    temas: todosLosTemas.length,
    preguntas: todosLosTemas.reduce((acc, t) => acc + (t.quiz?.length || 0), 0),
    flashcards: todosLosTemas.reduce((acc, t) => acc + (t.flashcards?.length || 0), 0),
    conceptos: todosLosTemas.reduce((acc, t) => acc + (t.conceptosClave?.length || 0), 0),
  }

  const todasLasPreguntas = todosLosTemas.flatMap((tema) =>
    (tema.quiz || []).map((q, i) => ({
      ...q,
      id: `${tema.id}-${i}`,
      temaId: tema.id,
      temaTitulo: tema.titulo,
      faseColor: tema.faseColor,
    }))
  )

  const todasLasFlashcards = todosLosTemas.flatMap((tema) =>
    (tema.flashcards || []).map((f, i) => ({
      ...f,
      id: `${tema.id}-fc-${i}`,
      temaId: tema.id,
      temaTitulo: tema.titulo,
      faseColor: tema.faseColor,
    }))
  )

  const buscar = (query) => {
    const q = String(query || '').trim().toLowerCase()
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

  return {
    fases,
    todosLosTemas,
    temaPorClaveImagen,
    getFase,
    getTema,
    preguntasDeFase,
    getTemaVecinos,
    stats,
    todasLasPreguntas,
    todasLasFlashcards,
    buscar,
  }
}
