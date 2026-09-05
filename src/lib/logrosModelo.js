// ============================================================
//  LOGROS — desbloqueo principal, medallas y rachas (lógica PURA)
// ------------------------------------------------------------
//  Trabajo R1. Hasta ahora `/logros` era una galería de imágenes y un glosario:
//  el mecanismo de desbloqueo existía y funcionaba —lo decide el profesor
//  liberando temas—, pero lo que se destapaba al otro lado era una ilustración,
//  y una ilustración no es un logro.
//
//  Aquí está lo que se puede decidir SIN pintar nada ni leer Firestore: qué
//  medallas tiene alguien, cuánto le falta para la siguiente y cuántos días
//  seguidos lleva estudiando.
//
//  TRES REGLAS DEL CATÁLOGO, que son las que evitan que esto envejezca mal:
//
//   1. **Una medalla se concede, no se retira.** Por eso ninguna condición mira
//      un dato que pueda MENGUAR. `leidos` y `quizzes` solo crecen; la racha
//      guarda su mejor marca aparte precisamente para eso.
//   2. **Nada de medallas por rapidez.** Es material clínico: premiar «terminó
//      vía aérea en dos horas» premia exactamente la conducta que no se quiere.
//      Se premia constancia, cobertura y acierto.
//   3. **El catálogo es DATOS, no `if`s.** Una lista con su condición y una
//      función que la evalúa, como `SECCIONES_PANEL`. Añadir una medalla es
//      añadir una entrada, no tocar un componente.
//
//  Y una cuarta que se descubrió al escribirlo: **una medalla solo puede
//  depender de algo que el ALUMNO controla.** Ver el comentario de
//  «Lo que NO es una medalla», más abajo.
//
//  COSTE: cero lecturas nuevas. Todo sale de datos que la pantalla ya tiene en
//  memoria —el índice de módulos y el progreso—, que después de lo que costó
//  bajar el temario de 288 lecturas a 3 no es un detalle menor.
// ============================================================

// Cuántos días de actividad se conservan. El cliente escribe este documento con
// debounce y un documento de Firestore admite 1 MB: sin tope, el historial de
// días es un almacén arbitrario con otro nombre. 400 son un año y pico, que es
// más que cualquier racha que alguien vaya a tener en un curso de 88 semanas.
export const DIAS_GUARDADOS = 400

// Umbral de aprobación de la plataforma, el mismo que usa el panel.
const APROBADO = 70

// ------------------------------------------------------------
//  El día
// ------------------------------------------------------------

/**
 * El día de una fecha, en la zona horaria DEL DISPOSITIVO, como 'AAAA-MM-DD'.
 *
 * Local y no UTC a propósito. Una racha que se rompe a las 18:00 porque el
 * servidor está en otro huso es un error que el alumno vive como una
 * injusticia, y tiene razón. El precio es que alguien puede atrasar el reloj de
 * su teléfono para no perder la racha; que lo haga. Blindarlo costaría una
 * Cloud Function que sellara la fecha, y eso no lo vale un contador de
 * constancia.
 */
export function diaLocal(fecha = Date.now()) {
  const d = new Date(fecha)
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

/** El día anterior a uno dado, en el mismo formato. */
export function diaAnterior(iso) {
  const [a, m, d] = String(iso).split('-').map(Number)
  const fecha = new Date(a, (m || 1) - 1, d || 1)
  fecha.setDate(fecha.getDate() - 1)
  return diaLocal(fecha.getTime())
}

// ------------------------------------------------------------
//  La racha
// ------------------------------------------------------------

/**
 * Días seguidos hasta hoy.
 *
 * Si HOY todavía no hay actividad, se cuenta desde AYER en vez de devolver 0.
 * Es la diferencia entre «llevas 9 días» a las nueve de la mañana y «llevas 0»:
 * la racha no está rota hasta que se pierde un día entero, y enseñar un cero
 * al que aún puede estudiar esta tarde es mentirle y desanimarle a la vez.
 */
export function rachaActual(actividad = {}, hoy = diaLocal()) {
  const tiene = (dia) => Number(actividad?.[dia] || 0) > 0
  let cursor = tiene(hoy) ? hoy : diaAnterior(hoy)
  if (!tiene(cursor)) return 0
  let n = 0
  // El tope evita recorrer para siempre si llega un mapa con basura.
  while (tiene(cursor) && n <= DIAS_GUARDADOS) {
    n += 1
    cursor = diaAnterior(cursor)
  }
  return n
}

/** La racha más larga que contiene el historial guardado. */
export function mejorRachaEn(actividad = {}) {
  const dias = Object.keys(actividad || {}).filter((d) => Number(actividad[d]) > 0).sort()
  let mejor = 0
  let corrida = 0
  let previo = null
  for (const dia of dias) {
    corrida = previo && diaAnterior(dia) === previo ? corrida + 1 : 1
    if (corrida > mejor) mejor = corrida
    previo = dia
  }
  return mejor
}

/**
 * Apunta que hoy hubo actividad y devuelve el nuevo `{ actividad, racha }`.
 *
 * `racha.mejor` se conserva y NUNCA baja: es la única marca que no se puede
 * recalcular cuando el historial se recorta a `DIAS_GUARDADOS`, y una medalla
 * concedida no se retira. `actual` sí se recalcula al pintar (ver
 * `rachaActual`), para que expire sola sin necesidad de una escritura.
 */
export function sumarActividad(estado = {}, ahora = Date.now()) {
  const hoy = diaLocal(ahora)
  const previa = estado.actividad || {}
  const actividad = { ...previa, [hoy]: Number(previa[hoy] || 0) + 1 }

  // Recorte por fecha, no por número de claves: así el que estudia a diario y
  // el que estudia a rachas conservan la misma ventana de tiempo.
  const podadas = Object.keys(actividad).sort().slice(-DIAS_GUARDADOS)
  const recortada = {}
  for (const dia of podadas) recortada[dia] = actividad[dia]

  const actual = rachaActual(recortada, hoy)
  const mejorPrevia = Number(estado.racha?.mejor || 0)
  return {
    actividad: recortada,
    racha: {
      actual,
      mejor: Math.max(mejorPrevia, actual, mejorRachaEn(recortada)),
      ultimoDia: hoy,
    },
  }
}

// ------------------------------------------------------------
//  El catálogo
// ------------------------------------------------------------
//
//  LO QUE NO ES UNA MEDALLA, y por qué se cayó del plan al escribir esto:
//
//  · **«Destapar todas las imágenes de un módulo»** y **«completar su
//    glosario»** figuraban en el plan y no entran. Destapar no lo hace el
//    alumno: lo hace su profesor al liberar el tema. Una medalla que se
//    concede por una acción ajena no premia a nadie, y la versión que sí
//    depende del alumno —haber leído esos temas— es la medalla de lectura que
//    ya existe. Sería la misma medalla dos veces con distinto nombre.
//
//  · **Los exámenes de módulo** (colección `intentos`) tampoco. No por su
//    coste, sino porque **hoy no se pueden aprobar**: el banco solo admite
//    reactivos de temas `validado` o `publicado`, y hay CERO. Una medalla
//    permanentemente inalcanzable es una casilla gris que no se llena nunca.
//    Entra cuando entre el trabajo A, y entonces es añadir una entrada aquí.

/**
 * Una medalla es `{ id, titulo, pista, icono, familia, medir(datos) }`.
 *
 * `medir` devuelve `{ hecho, total }` y NUNCA lanza: recibe el progreso tal
 * como está, que en un usuario nuevo son objetos vacíos.
 */
const cuenta = (obj) => Object.keys(obj || {}).length

/** Los quizzes con su porcentaje, ya calculado y sin divisiones por cero. */
function porcentajesDeQuiz(quizzes = {}) {
  return Object.values(quizzes || {})
    .map((q) => (q && q.total ? (Number(q.aciertos) / Number(q.total)) * 100 : null))
    .filter((p) => p !== null && Number.isFinite(p))
}

const MEDALLAS_FIJAS = [
  {
    id: 'primer-paso',
    titulo: 'Primer paso',
    pista: 'Lee tu primera lección.',
    icono: 'chispa',
    familia: 'lectura',
    medir: ({ leidos }) => ({ hecho: Math.min(cuenta(leidos), 1), total: 1 }),
  },
  {
    id: 'temario-completo',
    titulo: 'Temario completo',
    pista: 'Lee todas las lecciones del plan.',
    icono: 'trofeo',
    familia: 'lectura',
    medir: ({ leidos, idsDeTemas }) => ({
      hecho: idsDeTemas.filter((id) => leidos?.[id]).length,
      total: idsDeTemas.length,
    }),
  },
  {
    id: 'quiz-perfecto',
    titulo: 'Sin un fallo',
    pista: 'Resuelve un quiz completo sin errores.',
    icono: 'diana',
    familia: 'acierto',
    medir: ({ quizzes }) => ({
      hecho: Math.min(porcentajesDeQuiz(quizzes).filter((p) => p >= 100).length, 1),
      total: 1,
    }),
  },
  {
    id: 'diez-quizzes-solventes',
    titulo: 'Diez de diez',
    pista: `Supera el ${APROBADO + 10} % en diez quizzes distintos.`,
    icono: 'verificado',
    familia: 'acierto',
    medir: ({ quizzes }) => ({
      hecho: Math.min(porcentajesDeQuiz(quizzes).filter((p) => p >= APROBADO + 10).length, 10),
      total: 10,
    }),
  },
  {
    id: 'examen-aprobado',
    titulo: 'Examen superado',
    pista: `Aprueba un examen general con ${APROBADO} % o más.`,
    icono: 'birrete',
    familia: 'acierto',
    medir: ({ examenes }) => ({
      hecho: Math.min(
        (examenes || []).filter((e) => e?.total && (e.aciertos / e.total) * 100 >= APROBADO).length,
        1
      ),
      total: 1,
    }),
  },
  {
    id: 'racha-7',
    titulo: 'Una semana seguida',
    pista: 'Estudia siete días consecutivos.',
    icono: 'reloj',
    familia: 'constancia',
    medir: ({ rachaMostrada }) => ({ hecho: Math.min(rachaMostrada, 7), total: 7 }),
  },
  {
    id: 'racha-30',
    titulo: 'Un mes sin faltar',
    pista: 'Estudia treinta días consecutivos.',
    icono: 'tendencia',
    familia: 'constancia',
    medir: ({ rachaMostrada }) => ({ hecho: Math.min(rachaMostrada, 30), total: 30 }),
  },
  {
    id: 'racha-100',
    titulo: 'Cien días',
    pista: 'Estudia cien días consecutivos.',
    icono: 'corazon',
    familia: 'constancia',
    medir: ({ rachaMostrada }) => ({ hecho: Math.min(rachaMostrada, 100), total: 100 }),
  },
]

/**
 * El catálogo completo para un temario concreto: las fijas más una medalla de
 * lectura por MÓDULO.
 *
 * Se genera desde el índice y no se escribe a mano porque el temario de cada
 * academia es el suyo: siete módulos en R.E.S.C.A.T.E. y los que sean en la
 * siguiente. Una lista fija se quedaría corta o sobrando el primer día.
 *
 * El denominador de una medalla de módulo son TODOS sus temas, no solo los que
 * el profesor ha liberado. Con los liberados, la meta crecería cada vez que el
 * profesor abre un tema y el alumno vería su «8 de 8» convertirse en «8 de 14»
 * sin haber hecho nada: una meta que se mueve no es una meta.
 */
export function catalogoDeMedallas(modulos = []) {
  const porModulo = (modulos || [])
    .filter((m) => (m?.temas || []).length > 0)
    .map((m) => ({
      id: `modulo-${m.id}`,
      titulo: `Módulo ${m.numero} completo`,
      // Concordancia: un módulo puede tener UNA lección —pasa en las academias
      // pequeñas y en los datos de prueba—, y «Lee las 1 lecciones» se leyó en
      // pantalla antes de estar esto.
      pista: m.temas.length === 1
        ? `Lee la lección de «${m.titulo}».`
        : `Lee las ${m.temas.length} lecciones de «${m.titulo}».`,
      icono: 'medalla',
      familia: 'lectura',
      moduloId: m.id,
      medir: ({ leidos }) => ({
        hecho: m.temas.filter((t) => leidos?.[t.id]).length,
        total: m.temas.length,
      }),
    }))
  return [...MEDALLAS_FIJAS, ...porModulo]
}

// ------------------------------------------------------------
//  La evaluación
// ------------------------------------------------------------

/**
 * Evalúa el catálogo contra el progreso. Devuelve cada medalla con
 * `{ hecho, total, conseguida, fraccion }`.
 *
 * Se calcula al pintar y no se persiste. Guardar una lista de «medallas
 * concedidas» sería un espejo del progreso que hay que mantener sincronizado, y
 * un espejo que hay que mantener sincronizado se desincroniza.
 */
export function evaluarMedallas({
  modulos = [], leidos = {}, quizzes = {}, examenes = [], actividad = {}, racha = null,
  hoy = diaLocal(),
} = {}) {
  const idsDeTemas = (modulos || []).flatMap((m) => (m.temas || []).map((t) => t.id))
  // La racha que se enseña se recalcula del historial: así expira sola cuando
  // alguien deja de entrar, sin depender de que haya habido una escritura.
  const rachaMostrada = rachaActual(actividad, hoy)
  const datos = { leidos, quizzes, examenes, idsDeTemas, rachaMostrada, racha }

  return catalogoDeMedallas(modulos)
    .map((medalla) => {
      const { hecho, total } = medalla.medir(datos)
      const seguro = Math.max(0, Math.min(Number(hecho) || 0, Number(total) || 0))
      return {
        ...medalla,
        hecho: seguro,
        total,
        conseguida: total > 0 && seguro >= total,
        fraccion: total > 0 ? seguro / total : 0,
      }
    })
    // Una medalla con meta CERO no es una medalla: es una casilla que dice
    // «0/0» y que nadie puede conseguir ni entender. Pasa de verdad —«Temario
    // completo» cuando el índice de la academia todavía no ha llegado, o cuando
    // su clonación quedó incompleta—, y se vio en pantalla antes de estar esto.
    .filter((m) => m.total > 0)
}

/**
 * La medalla que va en la cabecera: UNA sola, grande, con lo que falta.
 *
 * No una rejilla de cuarenta casillas grises, que es la forma más rápida de que
 * una sección de logros se lea como una lista de deberes.
 *
 * Se elige la más CERCA de conseguirse entre las que aún no están. A igualdad,
 * la que necesite menos pasos; y a igualdad de eso, la del módulo que el alumno
 * tiene abierto, para que la cabecera hable de lo que está estudiando hoy y no
 * de un módulo que verá en abril.
 */
export function desbloqueoPrincipal(medallas = [], { moduloAbiertoId = null } = {}) {
  const pendientes = (medallas || []).filter((m) => !m.conseguida && m.total > 0)
  if (pendientes.length === 0) return null

  const suyo = (m) => (m.moduloId && m.moduloId === moduloAbiertoId ? 1 : 0)
  return [...pendientes].sort((a, b) => {
    // Solo cuenta como «empezada» la que tiene algo hecho: una medalla a cero
    // no está más cerca por tener la meta pequeña.
    const empezada = (m) => (m.hecho > 0 ? 1 : 0)
    if (empezada(b) !== empezada(a)) return empezada(b) - empezada(a)
    if (b.fraccion !== a.fraccion) return b.fraccion - a.fraccion
    const faltan = (m) => m.total - m.hecho
    if (faltan(a) !== faltan(b)) return faltan(a) - faltan(b)
    if (suyo(b) !== suyo(a)) return suyo(b) - suyo(a)
    return a.id.localeCompare(b.id)
  })[0]
}

/** Resumen para la cabecera: cuántas medallas hay y cuántas se llevan. */
export function resumenDeLogros(medallas = []) {
  const conseguidas = (medallas || []).filter((m) => m.conseguida).length
  return { conseguidas, total: (medallas || []).length }
}
