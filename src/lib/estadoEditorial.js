// ============================================================
//  Estado EDITORIAL de un tema — lógica PURA
// ------------------------------------------------------------
//  No confundir con el `estado` de la ESTRUCTURA (`publicado` | `borrador` |
//  `archivado` en contenidoModelo.js), que decide si un nodo se ve o no.
//  Aquí se responde otra pregunta, la que el inventario no sabía contestar:
//
//      ¿de dónde salió este material y quién respondió por él?
//
//  El inventario llamaba COMPLETO a un tema por tener «al menos una sección,
//  dos preguntas y dos tarjetas». Treinta y dos de esos temas se habían armado
//  automáticamente mezclando tres o más temas de origen. Contar campos no
//  distingue un tema redactado de un montón de piezas que comparten palabras,
//  así que el estado editorial se DECLARA, no se deduce del tamaño.
//
//  Regla dura: `validado` y `publicado` NO se alcanzan por generación. Exigen
//  una persona con nombre y fuentes; eso lo comprueba `validarRevision`.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

// Orden de madurez editorial. `bloqueado_por_decision` va aparte al final: no
// es «menos maduro», es trabajo detenido a la espera de la academia.
export const ESTADOS_EDITORIALES = [
  'vacio',
  'borrador',
  'en_revision',
  'validado',
  'publicado',
  'bloqueado_por_decision',
]

// De dónde salió el material. `legado_automatico` es el corpus del temario
// anterior redistribuido por coincidencia de palabras: sirve como borrador,
// nunca como evidencia de que el contenido sea correcto.
export const PROCEDENCIAS = ['sin_material', 'redactado', 'legado_automatico', 'mixto']

// Estados que un docente autorizado tiene que otorgar a mano.
export const ESTADOS_QUE_EXIGEN_REVISOR = ['validado', 'publicado']

export function esEstadoEditorial(v) {
  return ESTADOS_EDITORIALES.includes(v)
}

// ---------- ¿tiene material? ----------

const LISTAS = ['secciones', 'conceptosClave', 'flashcards', 'quiz', 'objetivos']

// Un tema «tiene material» si trae alguna pieza estudiable. El resumen y la
// duración solos no cuentan: un rótulo no es una lección.
export function tieneMaterial(tema) {
  if (!tema || typeof tema !== 'object') return false
  return LISTAS.some((c) => Array.isArray(tema[c]) && tema[c].length > 0)
}

// Un nodo de EXAMEN o de PRÁCTICA no se mide por material de estudio: se mide
// por su configuración (alcance, banco, cotejo, criterio de aprobación). Un
// examen sin prosa no está vacío; un examen sin alcance sí.
export function esNodoDeEvaluacion(tema) {
  return Boolean(tema?.evaluacion) || Boolean(tema?.alcanceExamen)
}

export function evaluacionConfigurada(tema) {
  return Boolean(tema?.evaluacion)
}

// ---------- validación de la ficha de revisión ----------

const FECHA = /^\d{4}-\d{2}-\d{2}$/

const texto = (v, max = 400) => typeof v === 'string' && v.trim().length > 0 && v.length <= max
const listaDeTextos = (v) => v == null || (Array.isArray(v) && v.every((x) => texto(x, 600)))

/**
 * Valida la ficha editorial de un tema. Devuelve un mensaje o null.
 *
 * Forma:
 *   { estado, procedencia, actualizado, versionClinica, revisadoPor,
 *     observaciones[], fuentes[], pregunta }
 *
 * `fuentes` aquí es la traza corta para auditoría (qué guía y de qué año se
 * usó). Las referencias que lee el alumno viven en el bloque `fuentes` del
 * propio texto; una cosa no sustituye a la otra.
 */
export function validarRevision(rev) {
  if (rev == null) return null
  if (typeof rev !== 'object' || Array.isArray(rev)) return 'La ficha de revisión es inválida.'
  if (!esEstadoEditorial(rev.estado)) {
    return `Estado editorial desconocido: "${rev.estado}" (usa ${ESTADOS_EDITORIALES.join(', ')}).`
  }
  if (rev.procedencia != null && !PROCEDENCIAS.includes(rev.procedencia)) {
    return `Procedencia desconocida: "${rev.procedencia}".`
  }
  if (rev.actualizado != null && !FECHA.test(String(rev.actualizado))) {
    return 'La fecha de actualización debe ser AAAA-MM-DD.'
  }
  if (rev.versionClinica != null && !texto(rev.versionClinica, 300)) {
    return 'La versión clínica (edición y año de corte) es inválida.'
  }
  if (!listaDeTextos(rev.observaciones)) return 'Las observaciones pendientes son inválidas.'
  if (!listaDeTextos(rev.fuentes)) return 'La traza de fuentes es inválida.'

  if (ESTADOS_QUE_EXIGEN_REVISOR.includes(rev.estado)) {
    if (!texto(rev.revisadoPor, 200)) {
      return `Un tema "${rev.estado}" necesita el nombre o rol de quien lo revisó.`
    }
    if (!Array.isArray(rev.fuentes) || rev.fuentes.length === 0) {
      return `Un tema "${rev.estado}" necesita al menos una fuente trazable.`
    }
    if (!FECHA.test(String(rev.actualizado || ''))) {
      return `Un tema "${rev.estado}" necesita fecha de revisión (AAAA-MM-DD).`
    }
  }
  if (rev.estado === 'bloqueado_por_decision' && !texto(rev.pregunta, 600)) {
    return 'Un tema bloqueado necesita la pregunta concreta que debe responder la academia.'
  }
  return null
}

// ---------- estado efectivo ----------

/**
 * Estado editorial REAL de un tema ya ensamblado (bundle o Firestore).
 *
 * Se respeta lo declarado salvo en un caso: un tema declarado con material que
 * llega sin una sola pieza es `vacio`, dígalo quien lo diga. Al revés no: un
 * tema con material NO asciende solo a `borrador` si alguien lo bloqueó.
 */
export function estadoEditorialDe(tema) {
  const declarado = tema?.estadoEditorial
  const hay = tieneMaterial(tema) || evaluacionConfigurada(tema)
  if (declarado === 'bloqueado_por_decision') return declarado
  if (!hay) return 'vacio'
  if (esEstadoEditorial(declarado) && declarado !== 'vacio') return declarado
  // Sin declaración: hay material pero nadie respondió por él. Es un borrador,
  // no un tema listo. Cubre las academias clonadas antes de esta fase.
  return 'borrador'
}

// ¿Se le enseña el material al alumno? Un tema bloqueado o vacío no muestra
// prosa: muestra por qué no la hay.
export function muestraContenido(estado) {
  return estado === 'borrador' || estado === 'en_revision'
    || estado === 'validado' || estado === 'publicado'
}

// ¿El material ya pasó por un docente? Es lo único que permite presentarlo sin
// advertencia.
export function estaAvalado(estado) {
  return estado === 'validado' || estado === 'publicado'
}

// ---------- aviso para el alumno ----------

// Texto exacto que ve el alumno. Vive aquí y no en el componente porque es la
// única señal de que lo que está leyendo aún no lo aprobó nadie: equivocarla
// es peor que no ponerla.
export function avisoEditorial(estado, revision = null) {
  switch (estado) {
    case 'vacio':
      return {
        variante: 'vacio',
        titulo: 'Contenido aún no disponible',
        texto: 'Este tema del plan oficial todavía no tiene material redactado. '
          + 'Aparece en el temario para que sepas que forma parte del programa.',
      }
    case 'bloqueado_por_decision':
      return {
        variante: 'bloqueado',
        titulo: 'Contenido pendiente de decisión académica',
        texto: revision?.pregunta
          ? `El plan oficial no define el alcance de este tema. La academia debe resolver: ${revision.pregunta}`
          : 'El plan oficial no define el alcance de este tema. La academia debe definirlo antes de redactarlo.',
      }
    case 'borrador':
      return {
        variante: 'revision',
        titulo: 'Contenido en revisión',
        texto: 'Este material es un borrador de trabajo. Todavía no lo revisó el cuerpo '
          + 'docente: estúdialo como apoyo, no como referencia definitiva.',
      }
    case 'en_revision':
      return {
        variante: 'revision',
        titulo: 'Contenido en revisión',
        texto: 'Este material está redactado y con fuentes, pero espera la validación del '
          + 'cuerpo docente. Cualquier dosis o procedimiento debe confirmarse con el '
          + 'protocolo de tu servicio.',
      }
    default:
      return null // validado / publicado: no se advierte de nada
  }
}

// ---------- semáforo de avance editorial ----------
//
// Vista de GESTIÓN, no del alumno: sirve para que quien coordina el temario vea
// de un golpe cuánto falta. Reduce los seis estados a tres colores porque la
// pregunta que responde es una sola: ¿este tema está sin empezar, en marcha o
// terminado?
//
//   rojo  → no hay material que estudiar (vacío o detenido por la academia)
//   ámbar → hay material, pero nadie ha respondido todavía por él
//   verde → un docente lo firmó
//
// El bloqueado por decisión va en ROJO a propósito: para la cobertura del
// temario cuenta como hueco, y pintarlo de otro color lo escondería del recuento
// de trabajo pendiente. Su etiqueta lo distingue del vacío por omisión.
export const SEMAFORO = {
  vacio: 'rojo',
  bloqueado_por_decision: 'rojo',
  borrador: 'ambar',
  en_revision: 'ambar',
  validado: 'verde',
  publicado: 'verde',
}

export function semaforoDe(estado) {
  return SEMAFORO[estado] || 'rojo'
}

// Texto del `title` y de la etiqueta accesible del indicador.
export function tituloSemaforo(estado) {
  const etiqueta = ETIQUETA_ESTADO[estado] || estado
  switch (semaforoDe(estado)) {
    case 'verde': return `${etiqueta} — listo y aprobado`
    case 'ambar': return `${etiqueta} — en desarrollo, sin validar`
    default: return estado === 'bloqueado_por_decision'
      ? `${etiqueta} — sin contenido, esperando decisión de la academia`
      : `${etiqueta} — sin contenido`
  }
}

// Etiqueta corta para listados, inventarios y panel docente.
export const ETIQUETA_ESTADO = {
  vacio: 'Sin contenido',
  borrador: 'Borrador',
  en_revision: 'En revisión',
  validado: 'Validado',
  publicado: 'Publicado',
  bloqueado_por_decision: 'Bloqueado por decisión',
}
