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
//  El orden y la numeración (módulo.numero, tema.numero '1.1') se calculan de
//  la posición en la estructura — mismo contrato que src/data/index.js.
// ============================================================

import { seccionesDesdeFirestore } from './contenidoModelo.js'

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
    // Las filas de tabla viajan ENVUELTAS en un objeto porque Firestore no
    // admite arreglos dentro de arreglos (ver contenidoModelo.js). Aquí se
    // desenvuelven; un tema guardado antes de eso pasa sin tocarse.
    secciones: seccionesDesdeFirestore(docTema.secciones || []),
    conceptosClave: docTema.conceptosClave || [],
    flashcards: docTema.flashcards || [],
    quiz: docTema.quiz || [],
    recursos: docTema.recursos || null,
    actividades: docTema.actividades || null,
  }
}

// Ensambla los módulos completas de un curso: estructura ligera (orden, títulos,
// unidades) + mapa temaId→doc de contenido. Aplana las unidades (implícitos en
// la migración) para conservar la UX actual Modulo→Temas.
//  - Por defecto solo entra lo PUBLICADO (lo que ve el alumno).
//  - `faltantes` lista temas presentes en la estructura sin doc de contenido
//    (clonación parcial): el resolutor decide si sirve o cae a legacy.
export function ensamblarModulos(estructura, temasPorId, { incluirBorradores = false } = {}) {
  const visible = (x) => incluirBorradores || (x.estado || 'publicado') === 'publicado'
  const buscar = (id) => (temasPorId instanceof Map ? temasPorId.get(id) : temasPorId?.[id])
  const faltantes = []
  const modulos = (estructura || []).filter(visible).map((f) => ({
    id: f.id,
    titulo: f.titulo,
    subtitulo: f.subtitulo || '',
    descripcion: f.descripcion || '',
    color: f.color || '',
    icono: f.icono || '',
    temas: (f.unidades || [])
      .filter(visible) // una unidad en borrador/archivado oculta TODA su rama
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
  return { modulos, faltantes }
}

// Índice LIGERO de navegación (la MISMA forma que src/data/navIndice.js:
// módulo {id, numero, titulo, subtitulo, descripcion, color, temas:[{id, numero,
// titulo}]}) a partir de SOLO la estructura del curso (1 doc, sin bajar los
// temas). Filtra publicados con las mismas reglas que ensamblarModulos y numera
// con las mismas que construirApi, para que nav y contenido no se desalineen.
export function indiceDesdeEstructura(estructura, { incluirBorradores = false } = {}) {
  const visible = (x) => incluirBorradores || (x.estado || 'publicado') === 'publicado'
  const modulos = (estructura || []).filter(visible).map((f, i) => ({
    id: f.id,
    numero: i + 1,
    titulo: f.titulo,
    subtitulo: f.subtitulo || '',
    descripcion: f.descripcion || '',
    color: f.color || '',
    temas: (f.unidades || [])
      .filter(visible)
      .flatMap((m) => m.temas || [])
      .filter(visible)
      .map((t, j) => ({ id: t.id, numero: `${i + 1}.${j + 1}`, titulo: t.titulo })),
  }))
  return {
    modulos,
    stats: {
      modulos: modulos.length,
      temas: modulos.reduce((s, f) => s + f.temas.length, 0),
    },
  }
}

// El mismo índice ligero, desde los módulos YA ensambladas y numeradas por
// construirApi: cuando el contenido completo está cargado, el shell puede
// reflejarlo exactamente (misma numeración, mismos filtros).
export function indiceDesdeModulos(modulos) {
  return {
    modulos: (modulos || []).map((f) => ({
      id: f.id,
      numero: f.numero,
      titulo: f.titulo,
      subtitulo: f.subtitulo || '',
      descripcion: f.descripcion || '',
      color: f.color || '',
      temas: (f.temas || []).map((t) => ({ id: t.id, numero: t.numero, titulo: t.titulo })),
    })),
  }
}

// Construye la MISMA API derivada que src/data/index.js a partir de módulos ya
// ensambladas y ordenadas. Los componentes no distinguen la fuente.
export function construirApi(modulosBase) {
  const modulos = (modulosBase || []).map((f, i) => {
    const numero = i + 1
    return {
      ...f,
      numero,
      temas: (f.temas || []).map((t, j) => ({ ...t, numero: `${numero}.${j + 1}` })),
    }
  })

  const todosLosTemas = modulos.flatMap((modulo) =>
    modulo.temas.map((tema) => ({
      ...tema,
      moduloId: modulo.id,
      moduloNumero: modulo.numero,
      moduloTitulo: modulo.titulo,
      moduloColor: modulo.color,
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

  const getModulo = (moduloId) => modulos.find((f) => f.id === moduloId)
  const getTema = (temaId) => todosLosTemas.find((t) => t.id === temaId)

  const preguntasDeModulo = (moduloId) => {
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
    modulos: modulos.length,
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
      moduloColor: tema.moduloColor,
    }))
  )

  const todasLasFlashcards = todosLosTemas.flatMap((tema) =>
    (tema.flashcards || []).map((f, i) => ({
      ...f,
      id: `${tema.id}-fc-${i}`,
      temaId: tema.id,
      temaTitulo: tema.titulo,
      moduloColor: tema.moduloColor,
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
    modulos,
    todosLosTemas,
    temaPorClaveImagen,
    getModulo,
    getTema,
    preguntasDeModulo,
    getTemaVecinos,
    stats,
    todasLasPreguntas,
    todasLasFlashcards,
    buscar,
  }
}

// ============================================================
//  API BAJO DEMANDA (Fase 1) — la misma información, sin cargar el curso
// ------------------------------------------------------------
//  `construirApi` de arriba necesita los 287 temas COMPLETOS en memoria para
//  poder responder cualquier cosa. Esta variante responde lo mismo pidiendo
//  solo lo que cada pregunta necesita:
//
//    · lo que sale del ÍNDICE (títulos, numeración, vecinos, contadores) se
//      responde SIN NINGUNA lectura: ya está cargado por el shell;
//    · una lección concreta es una lectura;
//    · las vistas derivadas (glosario, buscador, banco, mazo, galería) leen su
//      AGREGADO, que se precalculó al publicar el curso (ver agregadosModelo).
//
//  Las funciones que antes eran sincrónicas y ahora cuestan una lectura pasan a
//  devolver promesa. Se distinguen a propósito por el nombre —`getTemaAsync`,
//  `preguntasDeModuloAsync`— en vez de reutilizar el nombre viejo con otro tipo
//  de retorno: si una pantalla sin migrar llamara a `getTema` y recibiera una
//  promesa, pintaría «[object Promise]» en lugar de fallar, y eso es un error
//  que llega a producción. Con nombres distintos, la que no se migró revienta
//  en la primera prueba.
//
//  Los loaders los pone la fuente (Firestore lee documentos; el bundle calcula
//  en memoria), así que los componentes siguen sin elegir de dónde viene nada.
// ============================================================

/**
 * @param {Object} opciones
 * @param {Object} opciones.indice        índice ligero ya cargado (modulos + stats).
 * @param {Function} opciones.cargarTema  (temaId) => Promise<tema|null>
 * @param {Function} opciones.cargarAgregado (tipo, moduloId|null) => Promise<any>
 */
export function construirApiBajoDemanda({
  indice, cargarTema, cargarAgregado,
  fuente = 'firestore', academiaId = null, cursoId = null, cursos = [],
}) {
  const modulos = indice?.modulos || []

  // Plano de navegación: id de tema → su ficha ligera y su módulo. Se arma una
  // vez sobre el índice (que ya está en memoria) y responde vecinos, número y
  // datos del módulo sin tocar la red.
  const fichas = []
  const porTemaId = new Map()
  for (const modulo of modulos) {
    for (const t of modulo.temas || []) {
      const ficha = {
        id: t.id,
        numero: t.numero,
        titulo: t.titulo,
        moduloId: modulo.id,
        moduloNumero: modulo.numero,
        moduloTitulo: modulo.titulo,
        moduloColor: modulo.color || '',
      }
      fichas.push(ficha)
      porTemaId.set(t.id, ficha)
    }
  }

  const getModulo = (moduloId) => modulos.find((m) => m.id === moduloId)
  const getTemaLigero = (temaId) => porTemaId.get(temaId) || null

  const getTemaVecinos = (temaId) => {
    const idx = fichas.findIndex((t) => t.id === temaId)
    return {
      anterior: idx > 0 ? fichas[idx - 1] : null,
      siguiente: idx >= 0 && idx < fichas.length - 1 ? fichas[idx + 1] : null,
      indice: idx,
      total: fichas.length,
    }
  }

  // La lección completa, enriquecida con los datos de su módulo igual que hacía
  // `todosLosTemas`: las pantallas los usan para el color y las migas de pan.
  //
  //  La precedencia replica la de `construirApi`, y no es arbitraria:
  //   · los datos del MÓDULO solo existen en el índice;
  //   · los campos del TEMA mandan sobre la ficha (el documento del tema es
  //     donde el editor escribe: si la estructura quedó con un título viejo,
  //     el bueno es el del tema, igual que hoy);
  //   · `numero` sale SIEMPRE del índice, porque es posicional: lo calcula el
  //     orden del plan, no el documento.
  const getTemaAsync = async (temaId) => {
    const tema = await cargarTema(temaId)
    if (!tema) return null
    const ficha = getTemaLigero(temaId)
    if (!ficha) return tema
    return { ...ficha, ...tema, numero: ficha.numero }
  }

  // Concatena un agregado de TODOS los módulos, en orden de plan. Son tantas
  // lecturas como módulos (7 en el plan actual) y solo lo piden las pantallas
  // que de verdad abarcan el curso entero: el examen general y el mazo completo.
  const deTodosLosModulos = async (tipo) => {
    const partes = await Promise.all(modulos.map((m) => cargarAgregado(tipo, m.id)))
    return partes.flatMap((p) => p || [])
  }

  return {
    fuente, academiaId, cursoId, cursos, indice,
    stats: indice?.stats || {},
    modulos,

    // Sin lecturas: sale del índice.
    getModulo,
    getTemaLigero,
    getTemaVecinos,
    // Lista plana de FICHAS de todos los temas, en orden de plan: id, número,
    // título y datos del módulo. Es lo que necesitan las pantallas que enumeran
    // el temario sin enseñarlo (progreso, navegación), y no cuesta ninguna
    // lectura porque ya viene en el índice.
    todosLosTemasLigeros: fichas,

    // Una lectura cada una.
    getTemaAsync,
    enlacesGlosarioAsync: () => cargarAgregado('glosarioEnlaces', null),
    atlasAsync: () => cargarAgregado('atlas', null),
    preguntasDeModuloAsync: (moduloId) => cargarAgregado('preguntas', moduloId),
    flashcardsDeModuloAsync: (moduloId) => cargarAgregado('flashcards', moduloId),
    glosarioDeModuloAsync: (moduloId) => cargarAgregado('glosario', moduloId),
    // Fichas de las lecciones de un módulo: lo que la página del módulo lista
    // (icono, resumen, duración, conteos) sin abrir ninguna lección.
    fichasDeModuloAsync: (moduloId) => cargarAgregado('fichas', moduloId),

    // Tantas lecturas como módulos.
    todasLasPreguntasAsync: () => deTodosLosModulos('preguntas'),
    todasLasFlashcardsAsync: () => deTodosLosModulos('flashcards'),
    todasLasFichasAsync: () => deTodosLosModulos('fichas'),
    glosarioCompletoAsync: () => deTodosLosModulos('glosario'),
    imagenesAsync: () => deTodosLosModulos('imagenes'),
  }
}
