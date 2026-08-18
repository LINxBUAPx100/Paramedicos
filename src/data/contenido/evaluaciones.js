// ============================================================
//  Exámenes y prácticas — se CONFIGURAN, no se redactan
// ------------------------------------------------------------
//  El inventario contaba 9 exámenes y 2 prácticas entre los «temas vacíos»,
//  como si les faltara prosa. No les falta prosa: son nodos de evaluación y lo
//  que necesitan es alcance, banco, ponderación, criterio de aprobación y
//  retroalimentación. Llenarlos de artículos habría mejorado una métrica y
//  empeorado el curso.
//
//  El ALCANCE no se declara aquí: lo calcula el generador desde la posición de
//  la unidad en el plan (un parcial cubre desde el examen anterior; el final,
//  el módulo entero) y viaja en `tema.alcanceExamen`. Así no puede
//  desincronizarse del temario ni preguntar temas que el grupo no ha visto.
//
//  Lo que SÍ falta y no puede inventarse —calificación mínima, número fijo de
//  reactivos, número de intentos— queda declarado como pendiente de la
//  academia. Un examen con una nota de corte inventada es una decisión
//  académica tomada por software.
// ============================================================

const HOY = '2026-08-16'

// Pendientes comunes a todos los exámenes del plan.
const PENDIENTES_DE_ACADEMIA = [
  'La calificación mínima de aprobación no está en el PDF: debe fijarla la academia.',
  'El número de reactivos y de intentos permitidos también es decisión académica; '
    + 'mientras tanto la plataforma dimensiona el examen según el tamaño del banco.',
]

function examen({ titulo, notas = [] }) {
  return {
    tipo: 'examen',
    titulo,
    // El banco elegible son las preguntas de los temas de `alcanceExamen`,
    // repartidas por tema para que ninguno quede sin evaluar por azar.
    banco: 'preguntas de los temas incluidos en el alcance',
    reparto: 'por tema, proporcional al tamaño del banco de cada uno',
    reactivos: null,
    aprobacion: null,
    intentos: null,
    retroalimentacion: 'resultado global y desglose por tema al terminar el intento',
    reglas: [
      'Solo entran preguntas de temas anteriores a este examen dentro del mismo módulo.',
      'Ningún reactivo puede evaluar un dato que no esté enseñado y citado en los temas de su alcance.',
      'Los temas sin material aprobado no aportan preguntas.',
    ],
    pendientes: [...PENDIENTES_DE_ACADEMIA, ...notas],
  }
}

function fichaExamen(observacionesExtra = []) {
  return {
    estado: 'en_revision',
    procedencia: 'redactado',
    actualizado: HOY,
    observaciones: [
      'Nodo de evaluación configurado (alcance, banco, reparto y retroalimentación). '
        + 'No lleva material de estudio propio.',
      ...observacionesExtra,
    ],
    fuentes: ['Plan de estudios R.E.S.C.A.T.E. (PDF oficial, 2024) — posición de la unidad de examen'],
  }
}

const EXAMENES = {
  'm1-examen-aplicacion': {
    titulo: 'Examen del Módulo 1',
    notas: [
      'Este nodo tenía prosa y dos preguntas sobre el funcionamiento de la plataforma; '
        + 'se retiraron por no pertenecer al plan de estudios.',
    ],
  },
  'm2-examen-1-unico': { titulo: '1er examen del Módulo 2' },
  'm2-examen-2-unico': { titulo: '2do examen del Módulo 2' },
  'm2-examen-final-unico': { titulo: 'Examen final del Módulo 2' },
  'm3-examen-1-unico': { titulo: '1er examen del Módulo 3' },
  'm3-examen-final-unico': { titulo: 'Examen final del Módulo 3' },
  'm4-examen-1-unico': { titulo: '1er examen del Módulo 4' },
  'm4-examen-final-unico': { titulo: 'Examen final del Módulo 4' },
  'm5-examen-1-unico': { titulo: '1er examen del Módulo 5' },
  'm5-examen-final-unico': { titulo: 'Examen final del Módulo 5' },
  'm6-parcial-1-unico': { titulo: '1er parcial del Módulo 6' },
  'm6-examen-final-unico': { titulo: 'Examen final del Módulo 6' },
}

const salida = {}
for (const [id, cfg] of Object.entries(EXAMENES)) {
  salida[id] = { evaluacion: examen(cfg), revision: fichaExamen() }
}

// ---------- prácticas ----------
//
// Una práctica se evalúa observando a la persona hacer algo. Su ficha son
// competencia, equipo, seguridad, lista de cotejo, errores críticos y criterio
// de aprobación. El PDF no detalla el contenido de estas prácticas, así que se
// declara únicamente lo que la unidad permite sostener y se deja la selección
// de estaciones a la academia.

salida['m2-practica-unico'] = {
  evaluacion: {
    tipo: 'practica',
    titulo: 'Práctica del Módulo 2 — El cuerpo humano',
    competencia: 'Localizar y nombrar estructuras anatómicas sobre modelo o compañero y EXPLICAR la '
      + 'función que cada una sostiene, usando terminología precisa y sin recurrir a expresiones '
      + 'ambiguas. El producto observable es la explicación razonada de la relación entre estructura '
      + 'y función, no el recitado de una lista de nombres.',
    equipo: [
      'Modelo anatómico, láminas o compañero voluntario.',
      'Tarjetas con las estructuras y las funciones de la unidad, para emparejar.',
      'Lista de cotejo impresa por alumno.',
    ],
    seguridad: [
      'Consentimiento verbal del compañero antes de cualquier contacto.',
      'Contacto respetuoso y limitado a las regiones que la estación requiera.',
      'Higiene de manos antes y después de cada estación.',
      'Ningún procedimiento, punción ni maniobra clínica: esta práctica es de identificación y '
        + 'explicación, y el módulo no enseña técnicas.',
    ],
    cotejo: [
      { paso: 'Coloca al modelo en posición anatómica de referencia y la describe.', critico: false },
      { paso: 'Usa términos de relación (proximal/distal, medial/lateral) sin errores de sentido.', critico: true },
      { paso: 'Localiza sobre el modelo una estructura de cada sistema estudiado y la nombra correctamente.', critico: true },
      { paso: 'Explica, para tres estructuras localizadas, qué función sostienen y qué se alteraría si fallaran.', critico: true },
      { paso: 'Distingue los dos circuitos de la circulación señalando por dónde sale y por dónde vuelve la sangre en cada uno.', critico: false },
      { paso: 'Ordena en voz alta una secuencia fisiológica de la unidad (potencial de acción, contracción muscular, formación de orina o tránsito digestivo) sin invertir pasos.', critico: true },
      { paso: 'Describe la localización de un hallazgo con términos anatómicos, no coloquiales.', critico: true },
      { paso: 'Se abstiene de proponer tratamientos, dosis o diagnósticos, que no pertenecen a este módulo.', critico: false },
    ],
    erroresCriticos: [
      'Invertir el sentido de un término de relación (llamar «distal» a lo proximal).',
      'Describir una localización solo con «arriba», «abajo» o «a un lado».',
      'Llamar arteria al vaso que llega al corazón o vena al que sale de él.',
      'Invertir el orden de una secuencia fisiológica (por ejemplo, situar la reabsorción antes de la filtración).',
    ],
    criterioAprobacion: null,
    pendientes: [
      'La academia debe definir qué estaciones incluye esta práctica y la calificación mínima; '
        + 'el PDF solo declara «PRÁCTICA», 1 semana y 5 horas.',
      'Debe confirmarse de qué material anatómico dispone el aula: la lista de cotejo asume modelo, '
        + 'láminas o compañero voluntario, y las estaciones cambian según lo disponible.',
    ],
  },
  revision: {
    estado: 'en_revision',
    procedencia: 'redactado',
    actualizado: '2026-08-17',
    observaciones: [
      'Lista de cotejo propuesta a partir del contenido de la unidad; requiere aprobación docente '
        + 'y definición de estaciones.',
      'ACTUALIZADA el 17 de agosto de 2026, al integrarse las 17 lecciones del módulo: el cotejo '
        + 'anterior solo evaluaba terminología de posición, planos y cuadrantes, que corresponde al '
        + 'Módulo 1. Ahora evalúa lo que este módulo enseña —relación estructura-función y secuencias '
        + 'fisiológicas—, que es su competencia declarada.',
      'Se añadió como paso de cotejo la abstención de proponer tratamientos, dosis o diagnósticos: es '
        + 'el límite de alcance del módulo y conviene evaluarlo expresamente.',
      'No se inventa calificación mínima ni número de estaciones: siguen siendo decisión académica.',
    ],
    fuentes: [
      'Plan de estudios R.E.S.C.A.T.E. (PDF oficial, 2024) — Módulo 2, fila PRÁCTICA',
      'Contenido de las 17 lecciones del Módulo 2 integradas el 17 de agosto de 2026',
    ],
  },
}

salida['m5-practica-unico'] = {
  evaluacion: {
    tipo: 'practica',
    titulo: 'Práctica del Módulo 5 — Emergencias traumatológicas',
    competencia: 'Ejecutar la valoración y el manejo inicial de un paciente traumatizado '
      + 'simulado, respetando prioridades, seguridad de la escena y protección personal.',
    equipo: [
      'Maniquí o paciente simulado y moulage básico.',
      'Equipo de protección personal completo por alumno.',
      'Material de control de hemorragia, inmovilización y oxigenoterapia disponible en el aula.',
      'Lista de cotejo impresa y cronómetro.',
    ],
    seguridad: [
      'Verificación de la escena y del equipo de protección personal antes de tocar al paciente.',
      'Ningún procedimiento invasivo real sobre compañeros.',
      'Interrupción inmediata de la estación si un participante refiere dolor o mareo.',
    ],
    cotejo: [
      { paso: 'Evalúa la seguridad de la escena y se coloca el equipo de protección personal.', critico: true },
      { paso: 'Controla la hemorragia exanguinante antes de continuar la evaluación.', critico: true },
      { paso: 'Comprueba y mantiene la vía aérea con la técnica adecuada al mecanismo.', critico: true },
      { paso: 'Valora ventilación y circulación con hallazgos objetivos, no impresiones.', critico: false },
      { paso: 'Explora en el orden establecido y expone lo necesario previniendo hipotermia.', critico: false },
      { paso: 'Reevalúa después de cada intervención y verbaliza los cambios.', critico: true },
      { paso: 'Entrega el caso con un informe estructurado y completo.', critico: false },
    ],
    erroresCriticos: [
      'Iniciar la atención sin evaluar la seguridad de la escena.',
      'Dejar sin controlar una hemorragia exanguinante visible.',
      'Realizar o simular un procedimiento fuera del alcance autorizado del alumno.',
    ],
    criterioAprobacion: null,
    pendientes: [
      'La academia debe definir las estaciones, el tiempo por estación y la calificación mínima.',
      'Debe confirmarse qué procedimientos entran en el alcance del alumno en esta etapa del plan.',
    ],
  },
  revision: {
    estado: 'en_revision',
    procedencia: 'redactado',
    actualizado: HOY,
    observaciones: [
      'Lista de cotejo derivada de los temas del propio módulo; requiere aprobación docente.',
    ],
    fuentes: ['Plan de estudios R.E.S.C.A.T.E. (PDF oficial, 2024) — Módulo 5, fila PRÁCTICA'],
  },
}

// El taller de aminas del Módulo 4 es una práctica de CÁLCULO, no de destreza
// manual, y depende por completo de los fármacos y las diluciones que autorice
// la academia. Se bloquea con la pregunta concreta.
salida['m4-pra-taller-aminas'] = {
  revision: {
    estado: 'bloqueado_por_decision',
    procedencia: 'sin_material',
    actualizado: HOY,
    pregunta: '¿Qué aminas, presentaciones, diluciones y rangos de infusión autoriza la academia '
      + 'para este taller, y con qué dirección médica? Un ejercicio de cálculo con concentraciones '
      + 'inventadas enseña un procedimiento que después no coincide con el equipo real.',
    observaciones: [
      'El material heredado que ocupaba este nodo procedía del temario anterior y no se conserva.',
      'En cuanto la academia entregue su protocolo, el taller es redactable como práctica de '
        + 'cálculo con lista de cotejo y verificación por pares.',
    ],
  },
}

export default salida
