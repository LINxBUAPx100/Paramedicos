// ============================================================
//  Banco elegible de un examen del plan — lógica PURA
// ------------------------------------------------------------
//  La segunda auditoría encontró que la interfaz decía usar material aprobado
//  y en realidad admitía `borrador` y `en_revision`: el filtro era
//  `muestraContenido`, que responde «¿se le enseña esto al alumno?», no
//  «¿lo firmó un docente?». Son dos preguntas distintas y confundirlas
//  significaba calificar a alguien con preguntas que nadie había validado.
//
//  Aquí la regla es una sola y vive en un solo sitio:
//
//      solo aportan reactivos los temas `validado` o `publicado`.
//
//  Consecuencia buscada: hoy NINGÚN examen tiene banco, porque no hay ningún
//  tema validado. Eso no es un fallo, es el estado real del proyecto, y la
//  pantalla lo dice en voz alta en vez de examinar con borradores.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================
import { estadoEditorialDe, estaAvalado } from './estadoEditorial.js'

/**
 * Temas del alcance que SÍ pueden aportar preguntas.
 *
 * @param temas       temas del alcance, ya resueltos
 * @param temaVisible predicado de visibilidad por grupo (por defecto, todos)
 */
export function temasElegibles(temas, { temaVisible = () => true } = {}) {
  return (temas || [])
    .filter(Boolean)
    // Un tema oculto para el grupo no puede evaluarse: el alumno no ha podido
    // estudiarlo aunque el contenido exista.
    .filter((t) => temaVisible(t.id))
    // Y aunque sea visible, solo cuenta si un docente respondió por él.
    .filter((t) => estaAvalado(estadoEditorialDe(t)))
}

/** Preguntas elegibles, con los metadatos que espera `seleccionarPreguntas`. */
export function bancoDeExamen(temas, opciones = {}) {
  return temasElegibles(temas, opciones).flatMap((t) =>
    (t.quiz || []).map((q, i) => ({
      ...q,
      id: `${t.id}-${i}`,
      temaId: t.id,
      temaTitulo: t.tituloVisible || t.titulo,
    }))
  )
}

/**
 * Por qué un examen no puede presentarse todavía. Devuelve null si sí puede.
 *
 * Se distingue el caso «no hay nada escrito» del caso «hay material pero nadie
 * lo ha validado», porque para el alumno son situaciones distintas y para la
 * academia también: la segunda solo necesita una firma.
 */
export function motivoExamenInactivo(temasDelAlcance, opciones = {}) {
  const temas = (temasDelAlcance || []).filter(Boolean)
  const elegibles = temasElegibles(temas, opciones)
  if (elegibles.some((t) => (t.quiz || []).length > 0)) return null

  const conMaterial = temas.filter((t) => (t.quiz || []).length > 0)
  if (conMaterial.length === 0) {
    return {
      clave: 'sin-material',
      texto: 'Los temas de este examen todavía no tienen preguntas redactadas. El examen se '
        + 'activará cuando su alcance tenga material aprobado.',
    }
  }
  return {
    clave: 'sin-validar',
    texto: `Hay preguntas redactadas en ${conMaterial.length} de los temas de este examen, pero `
      + 'ninguna ha sido validada por el cuerpo docente. Un examen solo puede usar temas '
      + 'validados o publicados, así que permanece desactivado hasta esa revisión.',
  }
}

/** Cuántos temas del alcance tienen material esperando validación docente. */
export function temasEsperandoValidacion(temasDelAlcance, opciones = {}) {
  const { temaVisible = () => true } = opciones
  return (temasDelAlcance || [])
    .filter(Boolean)
    .filter((t) => temaVisible(t.id))
    .filter((t) => !estaAvalado(estadoEditorialDe(t)))
    .filter((t) => (t.quiz || []).length > 0)
}
