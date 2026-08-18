// ============================================================
//  Temas DETENIDOS a la espera de una decisión de la academia
// ------------------------------------------------------------
//  No son temas olvidados: son temas que no se pueden redactar sin inventar el
//  alcance del programa. El PDF oficial deja la columna SUBTEMA de todo el
//  Módulo 7 completamente vacía —cuatro filas con título, semanas y horas, y
//  nada más—, y tres de esos cuatro títulos coinciden con cursos de
//  especialización que el mismo plan enumera aparte (módulos 9, 10 y 13).
//
//  Redactar aquí «rescate vertical, tático y espacios confinados» sería
//  fusionar cursos distintos y darle al alumno un temario que su academia
//  nunca aprobó. Cada entrada deja la PREGUNTA concreta que hay que
//  responder; en cuanto la academia conteste, el tema se redacta.
//
//  Estos temas NO llevan material. Llevan ficha de revisión.
// ============================================================

const HOY = '2026-08-16'

export default {
  'm7-operaciones-ambulancias-unico': {
    revision: {
      estado: 'bloqueado_por_decision',
      procedencia: 'sin_material',
      actualizado: HOY,
      pregunta: '¿Qué alcance tiene «Operaciones de ambulancias» dentro del Módulo 7 (1 semana, '
        + '5 horas) frente al Módulo 10, que el plan enumera como curso de especialización con el '
        + 'mismo nombre? ¿Se limita a la NOM-034 (tipos de unidad, equipamiento y verificación) o '
        + 'incluye conducción de emergencia, despacho y radiocomunicación?',
      observaciones: [
        'El PDF no desglosa subtemas para ninguna fila del Módulo 7.',
        'La NOM-034-SSA3-2013 permitiría redactar tipos de ambulancia y equipamiento mínimo sin '
          + 'inventar alcance, pero no cubre el resto de la unidad.',
      ],
    },
  },

  'm7-acceso-extraccion-unico': {
    revision: {
      estado: 'bloqueado_por_decision',
      procedencia: 'sin_material',
      actualizado: HOY,
      pregunta: '¿«Obtención de acceso y extracción» se enseña en el nivel de concientización '
        + '(reconocer riesgos, esperar al equipo de rescate, extracción rápida médica) o en el '
        + 'nivel operativo con herramienta hidráulica? El plan ofrece «Técnico en extracción '
        + 'vehicular» como módulo 20 de especialización, y el alcance del alumno cambia por '
        + 'completo según la respuesta.',
      observaciones: [
        'El material heredado que ocupaba este tema procedía del temario anterior y no se conserva.',
        'La respuesta condiciona el equipo de protección personal y las prácticas evaluables.',
      ],
    },
  },

  'm7-operaciones-especiales-unico': {
    revision: {
      estado: 'bloqueado_por_decision',
      procedencia: 'sin_material',
      actualizado: HOY,
      pregunta: '¿Qué contiene exactamente «Operaciones especiales» como unidad de 1 semana y 5 '
        + 'horas? El título es el del módulo completo y el PDF no lo desarrolla. ¿Se refiere a '
        + 'materiales peligrosos, rescate acuático, rescate vertical, operaciones tácticas o a una '
        + 'introducción general a todas ellas?',
      observaciones: [
        'La auditoría desaconseja expresamente redactar este tema sin alcance oficial: mezclaría '
          + 'cursos de especialización distintos (módulos 9, 13 y 18).',
      ],
    },
  },

  'm7-triage-unico': {
    revision: {
      estado: 'bloqueado_por_decision',
      procedencia: 'sin_material',
      actualizado: HOY,
      pregunta: '¿Qué sistema de triage adopta la academia como estándar de enseñanza (START/'
        + 'JumpSTART, SALT, u otro) y qué tarjeta o formato de registro se usa en la región donde '
        + 'operan los alumnos? Enseñar categorías y tiempos de un sistema y evaluarlos con otro '
        + 'produce errores de clasificación reales.',
      observaciones: [
        'El PDF nombra la unidad «MANEJO DE ESCENARIOS CON MÚLTIPLES VÍCTIMAS (TRIAGE)» sin '
          + 'especificar método.',
        'Una vez elegido el sistema, el tema es redactable con fuente primaria y no necesita más '
          + 'decisiones.',
      ],
    },
  },
}
