// ============================================================
//  MÓDULO 6 — «INTRODUCCIÓN A GERIATRÍA» y «MANEJO GERIÁTRICO»
// ------------------------------------------------------------
//  Los 13 temas de las dos unidades geriátricas. Con este archivo el Módulo 6
//  queda completo en cobertura de lecciones.
//
//  IDEA QUE RECORRE LAS DOS UNIDADES: en la persona mayor la enfermedad grave
//  se presenta de forma atenuada e inespecífica. Un infarto sin dolor, una
//  infección sin fiebre, una hemorragia sin taquicardia y una fractura sin gran
//  mecanismo son la norma, no la excepción. Por eso el umbral de sospecha baja
//  y la referencia deja de ser la norma poblacional para ser la línea de base
//  de ese paciente concreto.
//
//  DEUDA EPIDEMIOLÓGICA DECLARADA: `m6-ig-causas-muerte` NO publica cifras ni
//  un orden numérico de mortalidad. CLAUDE.md exige fuente oficial mexicana
//  para todo dato epidemiológico cuantitativo, y esa fuente no se ha entregado.
//  Se enseñan los grupos de causas y su lógica clínica, y se registra la deuda.
//
//  LÍMITES: no se publican dosis, ajustes de dosis por edad ni cifras de
//  normalidad. Dependen de la Información para Prescribir, del formulario del
//  servicio y del protocolo.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const GEMS_3 = {
  nombre: 'NAEMT. Geriatric Education for Emergency Medical Services (GEMS), 3.ª edición.',
  url: 'https://naemt.org/education/medical-education/gems',
  nota: 'Programa formativo de referencia en atención prehospitalaria al paciente geriátrico; fuente '
    + 'asignada por el registro para estas unidades. PENDIENTE: capítulo y página exactos; no se '
    + 'dispone de copia licenciada para precisar el localizador.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Fuente de apoyo para el razonamiento clínico en urgencias médicas. PENDIENTE: capítulo y '
    + 'página exactos.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Incluye buenas prácticas específicas del paciente geriátrico traumatizado. PENDIENTE: guía y '
    + 'apartado exactos.',
}
const ACS_TRIAJE = {
  nombre: 'American College of Surgeons. National Guideline for the Field Triage of Injured Patients, '
    + 'revisión 2021.',
  url: 'https://www.facs.org/quality-programs/trauma/systems/field-triage-guidelines/',
  nota: 'Contempla criterios específicos para el paciente de edad avanzada. PENDIENTE: apartado exacto.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE y evaluación del paciente agudo. PENDIENTE: módulo y página '
    + 'exactos.',
}
const COFEPRIS = {
  nombre: 'COFEPRIS. Información para Prescribir y registro sanitario de medicamentos.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de la información autorizada de cada producto. PENDIENTE: fichas '
    + 'concretas de los medicamentos implicados.',
}
const EMPACT_HISTORICO = {
  nombre: 'Emergency Medical Patients: Assessment, Care, and Transport, 1.ª ed., 2012.',
  url: 'https://www.pearson.com/en-us/subject-catalog/p/emergency-medical-patients-assessment-care-and-transport/P200000000933?view=educator',
  nota: 'REFERENCIA HISTÓRICA declarada por el plan. No se usa para dosis, algoritmos ni '
    + 'recomendaciones actuales; se cita únicamente como antecedente curricular.',
}
const LEY_SALUD = {
  nombre: 'Ley General de Salud, texto vigente.',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf',
  nota: 'Marco jurídico mexicano de la atención médica. PENDIENTE: artículos concretos aplicables al '
    + 'consentimiento, a la capacidad y a la obligación de aviso; deben verificarse antes de citarse.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, formulario, equipamiento y dirección médica de la academia R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija el alcance autorizado, la medicación, '
    + 'los criterios de destino y el procedimiento de aviso. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const ATENUACION = 'PRINCIPIO DE LA UNIDAD: en la persona mayor la enfermedad grave se presenta de '
  + 'forma atenuada e inespecífica. El umbral de sospecha baja y la referencia es la línea de base del '
  + 'paciente, no la norma poblacional.'
const SIN_CIFRAS = 'No se publican dosis, ajustes por edad ni cifras de normalidad: dependen de la '
  + 'Información para Prescribir, del formulario del servicio y del protocolo.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: medicación, procedimientos, criterios de destino y aviso '
  + 'dependen del alcance autorizado, del equipamiento y del protocolo del servicio.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'NAEMT GEMS 3.ª ed.; NAEMT AMLS 4.ª ed.; ACS Best Practices; WHO/ICRC BEC 2018',
  observaciones: [
    'Redactado desde cero en el lote de Módulo 6; el tema estaba vacío.',
    ATENUACION,
    SIN_CIFRAS,
    PROTOCOLO,
    'DEUDA BIBLIOGRÁFICA: capítulo y página de GEMS 3.ª ed. y de AMLS 4.ª ed. pendientes; no se dispone de copia licenciada.',
    ...extra,
  ],
  fuentes,
})

const FU = [
  'NAEMT. GEMS, 3.ª ed. (capítulo y página pendientes).',
  'NAEMT. AMLS, 4.ª ed. (capítulo y página pendientes).',
  'WHO/ICRC. Basic Emergency Care, 2018.',
  'Protocolo local (pendiente de entrega).',
]

export default {
  // ---------- Introducción a geriatría ----------

  'm6-ig-definicion': {
    icono: '👴',
    duracion: '13 min',
    resumen: 'La geriatría es la disciplina que atiende la salud de las personas mayores, y su '
      + 'particularidad no es la edad en sí, sino lo que la acompaña: varias enfermedades a la vez, '
      + 'varios medicamentos, menos reserva funcional y una presentación atenuada de los cuadros '
      + 'graves. La lección introduce esos conceptos, distingue envejecimiento de enfermedad y explica '
      + 'por qué la edad cronológica dice mucho menos que la situación funcional del paciente.',
    objetivos: [
      'Definir la geriatría y distinguir envejecimiento normal de enfermedad.',
      'Explicar los conceptos de reserva funcional, fragilidad y comorbilidad.',
      'Justificar por qué la situación funcional informa más que la edad cronológica.',
    ],
    secciones: [
      {
        titulo: 'Envejecer no es enfermar',
        bloques: [
          { tipo: 'p', texto: 'El envejecimiento produce cambios previsibles en todos los sistemas: menos elasticidad, menos masa muscular, menos capacidad de respuesta ante el estrés. Esos cambios son normales y no son una enfermedad. Lo que sí ocurre es que reducen el margen disponible cuando aparece un problema agudo: la misma neumonía, la misma caída o la misma pérdida de sangre consumen una proporción mucho mayor de la reserva de la persona mayor.' },
          {
            tipo: 'lista',
            titulo: 'Tres conceptos que ordenan la unidad',
            items: [
              'Reserva funcional: capacidad de un sistema para responder por encima de sus necesidades habituales. Disminuye con la edad y explica por qué el deterioro es más rápido.',
              'Fragilidad: estado de vulnerabilidad en que un problema pequeño produce un deterioro desproporcionado. No es sinónimo de edad avanzada: hay personas mayores robustas y personas frágiles relativamente jóvenes.',
              'Comorbilidad: coexistencia de varias enfermedades crónicas, que interactúan entre sí y con los medicamentos que las tratan.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La edad cronológica es un dato pobre', texto: 'Dos personas de 82 años pueden ser un paciente autónomo que camina cinco kilómetros al día y otro dependiente para todo, encamado y con seis enfermedades. Los dos tienen la misma edad y no tienen nada más en común. Por eso la pregunta útil no es cuántos años tiene, sino qué hacía por sí mismo la semana pasada y qué ha cambiado.' },
        ],
      },
      {
        titulo: 'Lo que cambia en la atención',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cinco consecuencias prácticas',
            items: [
              'La presentación de la enfermedad grave es atenuada e inespecífica: confusión, caídas, debilidad o «no está como siempre» pueden ser la única manifestación.',
              'El deterioro, cuando llega, es más rápido, porque hay menos margen.',
              'La medicación modifica los signos: puede impedir la taquicardia, alterar la respuesta a la deshidratación o favorecer el sangrado.',
              'Hay que buscar la línea de base: qué podía hacer antes y qué ha cambiado, y esa información suele aportarla otra persona.',
              'El entorno importa tanto como la clínica: quién le cuida, cómo vive, si puede comer y moverse.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Una advertencia sobre el lenguaje', texto: 'Hablar del paciente en tercera persona delante de él, alzar la voz por defecto o asumir que no entiende son errores frecuentes y evitables. La pérdida auditiva no implica deterioro cognitivo, y el deterioro cognitivo no anula el derecho a ser informado ni a ser tratado con respeto. El tema de comunicación desarrolla esta cuestión.' },
          { tipo: 'p', texto: 'La atención geriátrica prehospitalaria tampoco consiste en hacer menos. Consiste en reconocer antes, buscar lo que no se manifiesta y ajustar la conducta a un paciente con menos margen, pero con el mismo derecho a una atención completa.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, EMPACT_HISTORICO]),
    ],
    conceptosClave: [
      { termino: 'Reserva funcional', definicion: 'Capacidad de un sistema para responder por encima de sus necesidades habituales; disminuye con la edad.' },
      { termino: 'Fragilidad', definicion: 'Estado de vulnerabilidad en que un problema pequeño produce un deterioro desproporcionado; no equivale a edad avanzada.' },
      { termino: 'Comorbilidad', definicion: 'Coexistencia de varias enfermedades crónicas que interactúan entre sí y con sus tratamientos.' },
      { termino: 'Línea de base funcional', definicion: 'Lo que el paciente podía hacer por sí mismo antes del episodio actual; referencia de comparación.' },
    ],
    flashcards: [
      { frente: '¿Es el envejecimiento una enfermedad?', reverso: 'No: produce cambios normales que reducen el margen disponible ante un problema agudo.' },
      { frente: '¿Qué es la fragilidad?', reverso: 'Estado de vulnerabilidad en que un problema pequeño produce un deterioro desproporcionado.' },
      { frente: '¿Qué pregunta sustituye a la edad cronológica?', reverso: 'Qué hacía por sí mismo antes y qué ha cambiado.' },
      { frente: '¿Cómo se presenta la enfermedad grave en el paciente mayor?', reverso: 'De forma atenuada e inespecífica: confusión, caídas, debilidad o «no está como siempre».' },
      { frente: '¿Implica la pérdida auditiva deterioro cognitivo?', reverso: 'No, y el deterioro cognitivo tampoco anula el derecho a ser informado ni tratado con respeto.' },
    ],
    quiz: [
      {
        pregunta: 'Dos pacientes de 82 años: uno camina cinco kilómetros diarios y otro está encamado con seis enfermedades. ¿Qué informa más?',
        opciones: [
          'La edad, que es la misma.',
          'La situación funcional y la línea de base de cada uno.',
          'El número de medicamentos exclusivamente.',
          'El lugar donde viven.',
        ],
        correcta: 1,
        explicacion: 'La edad cronológica es un dato pobre comparado con lo que el paciente podía hacer.',
      },
      {
        pregunta: '¿Por qué el deterioro es más rápido en la persona mayor?',
        opciones: [
          'Porque envejecer es una enfermedad.',
          'Porque la reserva funcional está disminuida y hay menos margen ante el mismo problema.',
          'Porque siempre toman medicación.',
          'Porque consultan más tarde.',
        ],
        correcta: 1,
        explicacion: 'El mismo problema consume una proporción mucho mayor de su reserva.',
      },
      {
        pregunta: 'Un compañero se dirige solo a la hija de una paciente consciente y orientada. ¿Qué corresponde?',
        opciones: [
          'Es lo adecuado por la edad.',
          'Dirigirse a la paciente, que es la interlocutora, y usar a la familia como fuente complementaria.',
          'Alzar la voz por defecto.',
          'Asumir que no entenderá la información.',
        ],
        correcta: 1,
        explicacion: 'Hablar del paciente en tercera persona delante de él es un error frecuente y evitable.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La ___ funcional es la capacidad de un sistema para responder por encima de sus necesidades habituales.',
          opciones: ['reserva', 'comorbilidad', 'fragilidad'],
          correcta: 0,
          explicacion: 'Su disminución explica por qué el deterioro es más rápido.',
        },
        {
          texto: 'La fragilidad ___ equivalente a edad avanzada.',
          opciones: ['es', 'no es', 'siempre es'],
          correcta: 1,
          explicacion: 'Hay personas mayores robustas y personas frágiles relativamente jóvenes.',
        },
        {
          texto: 'La atención geriátrica no consiste en hacer ___, sino en reconocer antes y ajustar la conducta.',
          opciones: ['más', 'menos', 'lo mismo'],
          correcta: 1,
          explicacion: 'El paciente tiene menos margen pero el mismo derecho a una atención completa.',
        },
      ],
    },
    revision: ficha({ fuentes: [...FU, 'EMPACT, 1.ª ed., 2012 (referencia histórica, no usada para recomendaciones actuales).'] }),
  },

  'm6-ig-comunicacion': {
    icono: '💬',
    duracion: '13 min',
    resumen: 'Comunicarse bien con una persona mayor no es una cortesía: es una técnica de obtención '
      + 'de información y una condición para que la valoración sea fiable. Las barreras habituales '
      + '—pérdida auditiva o visual, lentitud de procesamiento, deterioro cognitivo, miedo, prótesis '
      + 'retiradas— tienen soluciones concretas. La lección las enumera y advierte de los tres errores '
      + 'que más daño hacen: infantilizar, hablar por encima del paciente y confundir sordera con '
      + 'demencia.',
    objetivos: [
      'Identificar las barreras de comunicación más frecuentes y sus soluciones.',
      'Aplicar técnicas que mejoran la obtención de información y la colaboración.',
      'Evitar los errores de trato que deterioran la valoración y la dignidad del paciente.',
    ],
    secciones: [
      {
        titulo: 'Barreras y soluciones',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Barrera', 'Qué hacer'],
            filas: [
              ['Pérdida auditiva', 'Colocarse de frente y a su altura, con luz en la cara; hablar despacio y con tono grave, no gritando; reducir el ruido ambiental; comprobar si usa audífono y si lo tiene puesto y encendido'],
              ['Pérdida visual', 'Identificarse en voz alta, avisar antes de tocar, describir lo que se va a hacer y comprobar si tiene gafas y puede usarlas'],
              ['Procesamiento más lento', 'Una pregunta cada vez, esperar la respuesta sin interrumpir y sin completar sus frases'],
              ['Deterioro cognitivo', 'Frases cortas, información concreta, repetición tranquila, evitar discusiones y buscar un informante fiable sin excluir al paciente'],
              ['Prótesis dental retirada', 'Dificulta hablar y comer; si es posible y seguro, permitir que la use durante la entrevista'],
              ['Miedo o desconfianza', 'Explicar cada paso, no apresurar, respetar el pudor y no desvestir más de lo necesario'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Sordera no es demencia', texto: 'Un paciente que no responde a lo que se le pregunta puede simplemente no estar oyendo. Antes de anotar «desorientado» hay que comprobar que la comunicación es posible: acercarse, hablar de frente, bajar el tono y comprobar el audífono. Confundir una cosa con la otra genera un error que después se arrastra durante toda la atención hospitalaria.' },
        ],
      },
      {
        titulo: 'Cómo se obtiene la información',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Técnicas que funcionan',
            items: [
              'Empezar por preguntas abiertas y concretar después; dar tiempo.',
              'Preguntar por la línea de base: qué hacía la semana pasada y qué ha cambiado.',
              'Buscar el listado de medicación, los informes y la caja de pastillas: es más fiable que el recuerdo.',
              'Confirmar con un informante cuando sea necesario, sin dejar de dirigirse al paciente.',
              'Repetir lo entendido en voz alta para que el paciente lo corrija.',
              'Anotar quién aportó cada dato: no es lo mismo lo que refiere el paciente que lo que refiere un vecino.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Los tres errores que más daño hacen', texto: 'Infantilizar —hablarle como a un niño, usar diminutivos o tutearle sin permiso—, hablar por encima del paciente como si no estuviera, y asumir que la confusión es «normal a su edad». Los tres deterioran la información que se obtiene, y el tercero además puede hacer que se pase por alto un cuadro agudo tratable.' },
          { tipo: 'p', texto: 'Cuando el paciente no puede comunicarse, se busca información en su entorno: informes, medicación, indicaciones en la nevera o en la cabecera, dispositivos, y lo que refieran quienes conviven con él. Y se sigue hablando con él, explicándole lo que se hace: la comprensión puede estar más conservada de lo que aparenta.' },
        ],
      },
      F([GEMS_3, WHO_BEC, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Informante fiable', definicion: 'Persona que conoce la situación habitual del paciente y puede aportar la línea de base y los cambios recientes.' },
      { termino: 'Infantilización', definicion: 'Trato del paciente mayor como si fuera un niño; deteriora la información obtenida y su dignidad.' },
      { termino: 'Comprobación de la comunicación', definicion: 'Verificar que el paciente oye y comprende antes de concluir que está desorientado.' },
    ],
    flashcards: [
      { frente: '¿Cómo se habla a un paciente con pérdida auditiva?', reverso: 'De frente, a su altura, con luz en la cara, despacio y con tono grave; no gritando.' },
      { frente: '¿Qué se comprueba antes de anotar «desorientado»?', reverso: 'Que el paciente oye y que la comunicación es posible.' },
      { frente: '¿Qué es más fiable que el recuerdo del paciente sobre su medicación?', reverso: 'El listado, los informes y la propia caja de pastillas.' },
      { frente: 'Los tres errores de trato más dañinos', reverso: 'Infantilizar, hablar por encima del paciente y asumir que la confusión es normal a su edad.' },
      { frente: '¿Qué se anota junto a cada dato?', reverso: 'Quién lo aportó: no es lo mismo el paciente que un vecino.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente que no responde a tus preguntas y mira hacia otro lado. ¿Qué haces antes de considerarlo desorientado?',
        opciones: [
          'Anotar «desorientado» y continuar.',
          'Comprobar que te oye: colocarte de frente, bajar el tono, reducir el ruido y verificar si usa audífono.',
          'Alzar mucho la voz.',
          'Preguntar solo a la familia.',
        ],
        correcta: 1,
        explicacion: 'Confundir sordera con deterioro genera un error que se arrastra durante toda la atención.',
      },
      {
        pregunta: '¿Cuál es la fuente más fiable sobre la medicación de un paciente mayor?',
        opciones: [
          'Su recuerdo.',
          'El listado, los informes y la propia caja de pastillas.',
          'La suposición según sus enfermedades.',
          'Lo que diga un vecino.',
        ],
        correcta: 1,
        explicacion: 'La medicación real se comprueba, no se deduce.',
      },
      {
        pregunta: 'La familia responde por el paciente, que está consciente y orientado. ¿Qué corresponde?',
        opciones: [
          'Aceptarlo: es más rápido.',
          'Dirigirse al paciente como interlocutor y usar a la familia como fuente complementaria, anotando quién aporta cada dato.',
          'Pedir a la familia que salga siempre.',
          'Registrar solo lo que dice la familia.',
        ],
        correcta: 1,
        explicacion: 'Hablar por encima del paciente deteriora la información y su dignidad.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Ante pérdida auditiva se baja el ___ de la voz en lugar de gritar.',
          opciones: ['volumen', 'tono', 'ritmo'],
          correcta: 1,
          explicacion: 'Un tono más grave se percibe mejor que un volumen más alto.',
        },
        {
          texto: 'Asumir que la confusión es «normal a su edad» puede hacer que se pase por alto un cuadro ___.',
          opciones: ['crónico', 'agudo tratable', 'psiquiátrico previo'],
          correcta: 1,
          explicacion: 'Es uno de los tres errores que más daño hacen.',
        },
        {
          texto: 'Cuando el paciente no puede comunicarse, se sigue ___ mientras se busca información en su entorno.',
          opciones: ['hablándole', 'ignorándolo', 'sedándolo'],
          correcta: 0,
          explicacion: 'La comprensión puede estar más conservada de lo que aparenta.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ig-gems': {
    icono: '💎',
    duracion: '13 min',
    resumen: 'El diamante GEMS es una estructura para no olvidar lo que hace distinta la atención del '
      + 'paciente mayor. Sus cuatro vértices recuerdan que el paciente es geriátrico y por tanto '
      + 'atípico, que el entorno donde vive aporta información clínica, que la valoración médica debe '
      + 'contar con su medicación y su comorbilidad, y que lo social —quién le cuida, cómo vive, cómo '
      + 'se alimenta— condiciona el resultado tanto como lo clínico.',
    objetivos: [
      'Describir los cuatro vértices del diamante GEMS y su contenido.',
      'Aplicar la valoración del entorno como fuente de información clínica.',
      'Integrar la dimensión social en la decisión de traslado y en la entrega.',
    ],
    secciones: [
      {
        titulo: 'Los cuatro vértices',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Vértice', 'Qué recuerda'],
            filas: [
              ['G — Paciente geriátrico', 'Que la presentación será atípica, la reserva menor y la referencia su línea de base'],
              ['E — Evaluación del entorno', 'Que el domicilio informa: temperatura, higiene, alimentos, obstáculos, medicación a la vista, señales de caídas previas'],
              ['M — Evaluación médica', 'Que hay varias enfermedades y varios medicamentos, y que ambos modifican los signos'],
              ['S — Evaluación social', 'Que quién le cuida, cómo se alimenta, si sale de casa y si puede manejar su medicación condiciona el resultado'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El entorno es exploración física', texto: 'Una vivienda helada, una nevera vacía, la cama en el salón, una silla junto al baño, la medicación intacta en su envase o repartida en tres cajas distintas, marcas de una caída anterior: todo eso es información clínica que solo puede recoger quien entra en la casa. Nadie en el hospital podrá obtenerla después, y con frecuencia explica el motivo real de la llamada.' },
        ],
      },
      {
        titulo: 'Qué se busca en cada vértice',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Entorno',
            items: [
              'Temperatura de la vivienda y ropa que lleva puesta.',
              'Presencia y estado de alimentos, y si hay agua accesible.',
              'Obstáculos, alfombras sueltas, iluminación y escaleras.',
              'Adaptaciones: barras, andador, silla de ducha, cama articulada.',
              'Medicación a la vista, su estado y si hay envases duplicados o caducados.',
              'Higiene general, olor a orina, sábanas manchadas, cubos o recipientes usados como retrete.',
              'Signos de caídas previas: manchas, muebles desplazados, objetos rotos.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Social',
            items: [
              'Con quién vive y quién le atiende a diario.',
              'Si sale de casa, si recibe visitas y con qué frecuencia.',
              'Quién le prepara la comida y quién le administra la medicación.',
              'Si ha habido cambios recientes: pérdida de un familiar, cambio de domicilio, ingreso reciente.',
              'Si el cuidador está agotado o desbordado, dato que predice tanto ingresos como maltrato.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo social cambia decisiones clínicas', texto: 'Un paciente con un cuadro leve pero que vive solo, no puede prepararse comida y no tiene quien le vigile no está en la misma situación que el mismo paciente con apoyo continuo. Esa diferencia influye legítimamente en la decisión de traslado y debe comunicarse en la entrega, porque el centro receptor no puede verla.' },
          { tipo: 'p', texto: 'Todo lo observado se registra de forma objetiva y sin juicios, igual que en el resto del temario. «La vivienda estaba a temperatura muy baja y no había alimentos en la cocina» es un hallazgo; «vive en malas condiciones» es una valoración que no aporta nada comprobable.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Diamante GEMS', definicion: 'Estructura de valoración del paciente mayor con cuatro vértices: geriátrico, entorno, médico y social.' },
      { termino: 'Evaluación del entorno', definicion: 'Recogida de información clínica a partir del domicilio y de sus condiciones.' },
      { termino: 'Evaluación social', definicion: 'Valoración de los apoyos, la alimentación, la supervisión y los cambios recientes del paciente.' },
      { termino: 'Cuidador desbordado', definicion: 'Persona a cargo del paciente cuya sobrecarga predice ingresos repetidos y situaciones de maltrato.' },
    ],
    flashcards: [
      { frente: 'Los cuatro vértices del diamante GEMS', reverso: 'Paciente geriátrico, evaluación del entorno, evaluación médica y evaluación social.' },
      { frente: '¿Por qué el entorno es exploración física?', reverso: 'Porque aporta información clínica que solo puede recoger quien entra en la casa y que nadie obtendrá después.' },
      { frente: 'Tres hallazgos del entorno que importan', reverso: 'Temperatura de la vivienda, presencia de alimentos y estado de la medicación.' },
      { frente: '¿Puede lo social influir en la decisión de traslado?', reverso: 'Sí: la ausencia de apoyo y de supervisión cambia legítimamente la conducta.' },
      { frente: '¿Cómo se registra lo observado en el domicilio?', reverso: 'De forma objetiva y sin juicios, describiendo hallazgos comprobables.' },
    ],
    quiz: [
      {
        pregunta: 'Encuentras la vivienda muy fría, sin alimentos y con la medicación intacta en sus envases. ¿Qué haces con esa observación?',
        opciones: [
          'La omites por no ser clínica.',
          'La registras de forma objetiva y la comunicas: es información clínica que solo puede recogerse en el domicilio.',
          'La comentas solo entre compañeros.',
          'La usas para acusar a la familia en la escena.',
        ],
        correcta: 1,
        explicacion: 'El entorno forma parte de la valoración y explica con frecuencia el motivo real de la llamada.',
      },
      {
        pregunta: 'Dos pacientes con el mismo cuadro leve: uno vive solo sin apoyo y otro con supervisión continua. ¿Influye eso en la decisión?',
        opciones: [
          'No: la decisión es exclusivamente clínica.',
          'Sí: la ausencia de apoyo y de supervisión influye legítimamente en el traslado y debe comunicarse en la entrega.',
          'Solo si el paciente lo pide.',
          'Solo si hay deterioro cognitivo.',
        ],
        correcta: 1,
        explicacion: 'El centro receptor no puede ver esa diferencia y necesita conocerla.',
      },
      {
        pregunta: '¿Cuál de estas anotaciones es correcta?',
        opciones: [
          '«Vive en malas condiciones».',
          '«La vivienda estaba a temperatura muy baja; no había alimentos en la cocina; la medicación estaba intacta en sus envases».',
          '«Familia descuidada».',
          '«Paciente abandonado».',
        ],
        correcta: 1,
        explicacion: 'Se describen hallazgos comprobables; las valoraciones no aportan nada verificable.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La E del diamante GEMS corresponde a la evaluación del ___.',
          opciones: ['estado mental', 'entorno', 'esfuerzo respiratorio'],
          correcta: 1,
          explicacion: 'El domicilio aporta información clínica que nadie podrá recoger después.',
        },
        {
          texto: 'Un cuidador ___ es un dato que predice tanto ingresos repetidos como situaciones de maltrato.',
          opciones: ['joven', 'desbordado', 'ausente por trabajo'],
          correcta: 1,
          explicacion: 'La sobrecarga del cuidador es un hallazgo social con consecuencias clínicas.',
        },
        {
          texto: 'La M del diamante recuerda que hay varias enfermedades y varios ___ que modifican los signos.',
          opciones: ['cuidadores', 'medicamentos', 'domicilios'],
          correcta: 1,
          explicacion: 'La comorbilidad y la polifarmacia alteran la presentación de los cuadros agudos.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ig-cambios-fisiologicos': {
    icono: '⚙️',
    duracion: '16 min',
    resumen: 'Este tema recorre los cambios del envejecimiento sistema por sistema, siempre con la '
      + 'misma estructura: qué cambia y qué consecuencia tiene en la atención urgente. El hilo es '
      + 'constante: menos reserva, respuesta más lenta y signos atenuados. Al terminar debe quedar '
      + 'claro por qué una persona mayor puede estar gravemente enferma con unas constantes que en un '
      + 'joven parecerían aceptables.',
    objetivos: [
      'Relacionar los cambios de cada sistema con su consecuencia práctica.',
      'Explicar por qué los signos clásicos se atenúan en el paciente mayor.',
      'Anticipar los riesgos derivados de la menor reserva funcional.',
    ],
    secciones: [
      {
        titulo: 'Sistema por sistema',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Sistema', 'Qué cambia', 'Consecuencia en la atención'],
            filas: [
              ['Cardiovascular', 'Vasos menos elásticos, corazón menos capaz de acelerar, respuesta al estrés más lenta', 'Tolera mal tanto la falta como el exceso de volumen; la taquicardia compensatoria puede no aparecer'],
              ['Respiratorio', 'Menor elasticidad pulmonar, musculatura más débil, tos menos eficaz', 'Desatura antes, se fatiga antes y retiene secreciones con más facilidad'],
              ['Nervioso', 'Menor volumen cerebral con más espacio dentro del cráneo, reflejos más lentos', 'Un hematoma puede crecer mucho antes de dar síntomas; mayor riesgo de caídas'],
              ['Renal', 'Menor capacidad de concentrar orina y de eliminar fármacos', 'Se deshidrata antes y acumula medicamentos con más facilidad'],
              ['Musculoesquelético', 'Menos masa muscular, hueso más frágil, columna más rígida', 'Fracturas con mecanismos leves y peor tolerancia a la inmovilidad'],
              ['Piel y termorregulación', 'Piel fina y frágil, menos grasa, peor respuesta al frío y al calor', 'Lesiones cutáneas con mínima fricción; hipotermia e hipertermia con más facilidad'],
              ['Sensorial', 'Pérdida auditiva y visual, menor sensibilidad al dolor y a la sed', 'Consulta más tarde, refiere menos síntomas y bebe menos de lo que necesita'],
              ['Inmunitario', 'Respuesta más débil y menos fiebre ante la infección', 'Una infección grave puede cursar sin fiebre y manifestarse solo por confusión o caídas'],
            ],
          },
        ],
      },
      {
        titulo: 'Tres consecuencias que hay que tener siempre presentes',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Los signos vitales pueden mentir en las dos direcciones', texto: 'Una presión de 130 puede ser una hipotensión grave en alguien que vive habitualmente en 180. Una frecuencia cardiaca normal puede corresponder a un paciente en shock cuya medicación le impide acelerar el corazón. Y la ausencia de fiebre no descarta una infección grave. Por eso la referencia es la línea de base del paciente, y por eso se pregunta por sus cifras habituales.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El cerebro tiene más sitio para sangrar', texto: 'Con la edad, el volumen cerebral disminuye y queda más espacio dentro del cráneo. Una colección de sangre puede crecer durante bastante tiempo antes de producir síntomas, sobre todo si el paciente toma anticoagulantes. Por eso un traumatismo craneal aparentemente leve en una persona mayor anticoagulada exige valoración, aunque esté perfectamente al llegar el equipo.' },
          {
            tipo: 'lista',
            titulo: 'Riesgos derivados de la menor reserva',
            items: [
              'Deshidratación rápida, favorecida además por menor sensación de sed.',
              'Hipotermia con temperaturas ambientales que no serían un problema para otra persona.',
              'Lesiones cutáneas por adhesivos, correas o simple fricción durante la movilización.',
              'Deterioro rápido tras un problema aparentemente menor.',
              'Complicaciones derivadas de la inmovilidad, incluso en periodos cortos.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Una consecuencia práctica de la piel frágil', texto: 'Retirar un adhesivo con brusquedad o arrastrar al paciente durante la movilización puede producir un desgarro cutáneo extenso. Se levanta en vez de arrastrar, se acolcha, se usan superficies deslizantes y se retiran los adhesivos con cuidado. No cuesta tiempo y evita una lesión iatrogénica frecuente.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, EMPACT_HISTORICO]),
    ],
    conceptosClave: [
      { termino: 'Atenuación de los signos', definicion: 'Menor expresión de las respuestas fisiológicas clásicas —taquicardia, fiebre, dolor— en el paciente mayor.' },
      { termino: 'Espacio intracraneal aumentado', definicion: 'Mayor espacio disponible dentro del cráneo por reducción del volumen cerebral, que permite que una colección crezca antes de dar síntomas.' },
      { termino: 'Piel frágil', definicion: 'Piel fina y con poca grasa subcutánea, que se desgarra con adhesivos, correas o fricción.' },
      { termino: 'Cifras habituales', definicion: 'Valores de presión y frecuencia propios del paciente, que sustituyen a la norma poblacional como referencia.' },
    ],
    flashcards: [
      { frente: '¿Por qué puede faltar la taquicardia en un paciente mayor en shock?', reverso: 'Porque su corazón responde peor al estrés y su medicación puede impedirle acelerar.' },
      { frente: '¿Descarta la ausencia de fiebre una infección grave?', reverso: 'No: puede manifestarse solo por confusión o caídas.' },
      { frente: '¿Por qué un hematoma intracraneal tarda más en dar síntomas?', reverso: 'Porque hay más espacio dentro del cráneo al reducirse el volumen cerebral.' },
      { frente: '¿Cómo se moviliza a un paciente con piel frágil?', reverso: 'Levantando en vez de arrastrar, acolchando, usando superficies deslizantes y retirando adhesivos con cuidado.' },
      { frente: '¿Qué sustituye a la norma poblacional como referencia?', reverso: 'Las cifras habituales del propio paciente.' },
      { frente: '¿Por qué se deshidrata antes?', reverso: 'Por menor capacidad renal de concentrar orina y menor sensación de sed.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente que vive habitualmente con presiones de 180 y llega con 130. ¿Cómo lo interpretas?',
        opciones: [
          'Presión normal: no requiere atención.',
          'Puede ser una hipotensión grave para ese paciente: la referencia es su línea de base.',
          'Es una crisis hipertensiva.',
          'Es un error de medición seguro.',
        ],
        correcta: 1,
        explicacion: 'Los signos vitales pueden mentir en las dos direcciones si se comparan con la norma poblacional.',
      },
      {
        pregunta: 'Mujer de 85 años anticoagulada que se golpeó la cabeza y está perfectamente. ¿Qué corresponde?',
        opciones: [
          'Alta en el lugar: está asintomática.',
          'Valoración: hay más espacio intracraneal y la anticoagulación permite que una colección crezca antes de dar síntomas.',
          'Observación domiciliaria durante una semana.',
          'Descartar lesión por el mecanismo leve.',
        ],
        correcta: 1,
        explicacion: 'La normalidad inicial en este perfil de paciente no descarta nada.',
      },
      {
        pregunta: 'Paciente mayor con infección grave y sin fiebre. ¿Cómo puede manifestarse?',
        opciones: [
          'Siempre con fiebre alta.',
          'Solo por confusión, caídas o debilidad, sin fiebre.',
          'Con dolor localizado intenso siempre.',
          'No puede haber infección sin fiebre.',
        ],
        correcta: 1,
        explicacion: 'La respuesta inmunitaria atenuada hace que la presentación sea inespecífica.',
      },
      {
        pregunta: 'Vas a retirar un adhesivo del brazo de un paciente mayor. ¿Qué precaución tomas?',
        opciones: [
          'Retirarlo con rapidez de un tirón.',
          'Retirarlo con cuidado, porque su piel fina puede desgarrarse; además se levanta en vez de arrastrar al movilizar.',
          'Dejarlo puesto siempre.',
          'Frotar la zona para despegarlo.',
        ],
        correcta: 1,
        explicacion: 'El desgarro cutáneo iatrogénico es frecuente y evitable.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La medicación del paciente mayor puede impedir la ___ compensatoria en el shock.',
          opciones: ['vasoconstricción', 'taquicardia', 'sudoración'],
          correcta: 1,
          explicacion: 'Por eso una frecuencia normal no descarta una hipoperfusión establecida.',
        },
        {
          texto: 'La reducción del volumen cerebral deja más ___ dentro del cráneo.',
          opciones: ['presión', 'espacio', 'líquido'],
          correcta: 1,
          explicacion: 'Eso permite que una colección crezca durante más tiempo antes de dar síntomas.',
        },
        {
          texto: 'Al movilizar a un paciente con piel frágil se ___ en lugar de arrastrar.',
          opciones: ['empuja', 'levanta', 'gira'],
          correcta: 1,
          explicacion: 'La fricción produce desgarros cutáneos extensos con facilidad.',
        },
      ],
    },
    revision: ficha({ fuentes: [...FU, 'EMPACT, 1.ª ed., 2012 (referencia histórica).'] }),
  },

  'm6-ig-causas-muerte': {
    icono: '📉',
    duracion: '13 min',
    resumen: 'Conocer de qué enferman y mueren las personas mayores orienta la sospecha antes de '
      + 'llegar al domicilio. Los grandes grupos son las enfermedades cardiovasculares, las '
      + 'respiratorias, las cerebrovasculares, el cáncer, la diabetes y sus complicaciones, y las '
      + 'infecciones; entre las causas externas destacan las caídas. Esta lección enseña esos grupos y '
      + 'su lógica clínica, y declara expresamente que no publica cifras porque no se dispone de la '
      + 'fuente oficial mexicana.',
    objetivos: [
      'Enumerar los grandes grupos de causas de morbimortalidad en la persona mayor.',
      'Relacionar cada grupo con la sospecha clínica y con la prevención.',
      'Reconocer el papel de las caídas como causa externa principal.',
    ],
    secciones: [
      {
        titulo: 'Deuda declarada sobre las cifras',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Por qué esta lección no trae porcentajes ni un orden numérico', texto: 'El mandato editorial de PTEM exige que todo dato epidemiológico cuantitativo proceda de una fuente oficial mexicana identificable, y esa fuente no se ha entregado. Publicar un orden de causas o un porcentaje tomado de otro país o de una fuente sin identificar sería inventar un dato con apariencia de rigor. Se enseñan los grupos y su lógica clínica, que es lo que cambia la conducta, y la deuda queda registrada para que la academia aporte la referencia oficial.' },
        ],
      },
      {
        titulo: 'Los grandes grupos y su lógica',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Grupo', 'Por qué importa en la escena'],
            filas: [
              ['Enfermedad cardiovascular', 'El síndrome coronario puede cursar sin dolor torácico: disnea, debilidad, náusea o confusión pueden ser su única manifestación'],
              ['Enfermedad cerebrovascular', 'El déficit puede atribuirse erróneamente a la edad o a un deterioro previo; la hora de inicio es información crítica'],
              ['Enfermedad respiratoria', 'La agudización y la neumonía son frecuentes, y la neumonía puede cursar sin fiebre y manifestarse como confusión'],
              ['Cáncer', 'Aporta síntomas propios, complicaciones y tratamientos que modifican la respuesta del paciente'],
              ['Diabetes y complicaciones', 'La hipoglucemia imita cualquier cuadro neurológico y es tratable: se mide siempre que sea posible'],
              ['Infecciones', 'La urinaria y la respiratoria son causas frecuentísimas de confusión aguda y de caídas'],
              ['Caídas', 'Principal causa externa: producen fracturas y traumatismo craneal, y suelen ser el síntoma de otro problema'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La caída casi nunca es solo una caída', texto: 'Una persona mayor que se cae puede haberlo hecho por una infección, una arritmia, una hipotensión, una hipoglucemia, un efecto de su medicación o un problema neurológico. Por eso la pregunta no es solo qué se ha roto, sino por qué se cayó. Tratar la lesión sin buscar la causa deja al paciente expuesto a que vuelva a ocurrir, esta vez peor.' },
          { tipo: 'p', texto: 'A estos grupos se añaden dos situaciones que condicionan la atención sin ser causas de muerte en sí mismas: el deterioro cognitivo, que dificulta la valoración y aumenta el riesgo, y la fragilidad, que convierte un problema menor en un ingreso prolongado.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Presentación sin dolor', definicion: 'Manifestación de un síndrome coronario mediante disnea, debilidad, náusea o confusión, sin dolor torácico.' },
      { termino: 'Causa externa', definicion: 'Origen no derivado de enfermedad; en la persona mayor, las caídas son la principal.' },
      { termino: 'Caída como síntoma', definicion: 'Caída que es la manifestación de otro problema agudo —infección, arritmia, hipoglucemia o efecto de medicación— y no un simple accidente.' },
    ],
    flashcards: [
      { frente: '¿Por qué esta lección no publica porcentajes?', reverso: 'Porque el dato epidemiológico cuantitativo exige fuente oficial mexicana y no se ha entregado.' },
      { frente: '¿Cómo puede manifestarse un síndrome coronario en la persona mayor?', reverso: 'Sin dolor torácico: con disnea, debilidad, náusea o confusión.' },
      { frente: '¿Cuál es la principal causa externa?', reverso: 'Las caídas.' },
      { frente: '¿Qué pregunta añade una caída además de qué se ha roto?', reverso: 'Por qué se cayó.' },
      { frente: 'Dos infecciones que causan confusión aguda con frecuencia', reverso: 'La urinaria y la respiratoria.' },
    ],
    quiz: [
      {
        pregunta: 'Hombre de 80 años con disnea, debilidad y náusea, sin dolor torácico. ¿Qué debes considerar?',
        opciones: [
          'Que puede descartarse el origen cardiaco por la ausencia de dolor.',
          'Que un síndrome coronario puede cursar sin dolor torácico en la persona mayor.',
          'Que se trata con seguridad de una infección.',
          'Que es un cuadro ansioso.',
        ],
        correcta: 1,
        explicacion: 'La presentación atenuada es la norma, no la excepción.',
      },
      {
        pregunta: 'Mujer de 87 años que se ha caído en casa y se ha fracturado la muñeca. ¿Qué añades a la atención de la fractura?',
        opciones: [
          'Nada más: la lesión está identificada.',
          'Buscar por qué se cayó: infección, arritmia, hipotensión, hipoglucemia, medicación o problema neurológico.',
          'Preguntar solo por el mecanismo del golpe.',
          'Recomendar reposo y alta en el lugar.',
        ],
        correcta: 1,
        explicacion: 'Tratar la lesión sin buscar la causa deja al paciente expuesto a que se repita.',
      },
      {
        pregunta: 'Paciente mayor con confusión aguda de aparición reciente. ¿Qué causas frecuentes consideras?',
        opciones: [
          'Solo demencia.',
          'Infección urinaria o respiratoria, hipoglucemia, efecto de la medicación y otras causas agudas tratables.',
          'Solo un accidente cerebrovascular.',
          'Ninguna: es esperable a su edad.',
        ],
        correcta: 1,
        explicacion: 'Asumir que la confusión es normal a su edad es uno de los errores que la unidad prohíbe.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En la persona mayor, una caída suele ser el ___ de otro problema.',
          opciones: ['final', 'síntoma', 'origen único'],
          correcta: 1,
          explicacion: 'Por eso se pregunta por qué se cayó, no solo qué se ha roto.',
        },
        {
          texto: 'La ___ imita cualquier cuadro neurológico y es tratable, por lo que se mide siempre que sea posible.',
          opciones: ['hipotermia', 'hipoglucemia', 'hipertensión'],
          correcta: 1,
          explicacion: 'Es una de las causas reversibles que no deben pasarse por alto.',
        },
        {
          texto: 'Esta lección no publica un orden numérico de causas porque falta la fuente ___.',
          opciones: ['internacional', 'oficial mexicana', 'hospitalaria'],
          correcta: 1,
          explicacion: 'El mandato editorial exige fuente oficial identificable para todo dato cuantitativo.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'DEUDA EPIDEMIOLÓGICA DECLARADA: no se publican cifras ni orden numérico de causas de muerte. Requiere fuente oficial mexicana identificable —INEGI o Secretaría de Salud— que la academia debe aportar.',
        'Se enseñan los grupos de causas y su lógica clínica, que es lo que modifica la conducta prehospitalaria.',
      ],
    }),
  },

  'm6-ig-polifarmacia': {
    icono: '💊',
    duracion: '15 min',
    resumen: 'La polifarmacia es el uso simultáneo de varios medicamentos, situación habitual en el '
      + 'paciente mayor y una de las causas más frecuentes de urgencia evitable. Los fármacos '
      + 'interaccionan entre sí, se acumulan porque el organismo los elimina peor y enmascaran los '
      + 'signos que el equipo busca. La lección enseña a recoger la medicación real, a reconocer los '
      + 'cuadros que produce y a comunicarla, sin publicar ninguna dosis.',
    objetivos: [
      'Explicar por qué la polifarmacia produce urgencias y modifica los signos.',
      'Recoger la medicación real del paciente de forma fiable.',
      'Reconocer los cuadros clínicos atribuibles a la medicación.',
    ],
    secciones: [
      {
        titulo: 'Por qué produce urgencias',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuatro mecanismos',
            items: [
              'Interacción: dos medicamentos que por separado son seguros pueden potenciarse o anularse al combinarse.',
              'Acumulación: la eliminación renal y hepática es más lenta, de modo que una pauta correcta puede volverse excesiva con el tiempo.',
              'Cascada terapéutica: un efecto adverso se interpreta como una enfermedad nueva y se añade otro fármaco para tratarlo.',
              'Errores de administración: confusión entre envases, dosis duplicadas, olvidos o toma de medicación ajena.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La medicación enmascara lo que buscas', texto: 'Determinados fármacos impiden que el corazón acelere, de modo que un paciente en shock puede tener una frecuencia normal. Otros favorecen el sangrado, y una hemorragia intracraneal puede crecer con un traumatismo trivial. Otros producen hipotensión al incorporarse, y explican caídas repetidas. Preguntar por la medicación no es un trámite: cambia la interpretación de los signos vitales.' },
        ],
      },
      {
        titulo: 'Cómo se recoge y qué cuadros produce',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Recoger la medicación real',
            items: [
              'Llevarse los envases, el listado o el pastillero al hospital, o fotografiarlos si no pueden moverse.',
              'Preguntar qué toma realmente, no qué le han recetado: no siempre coincide.',
              'Preguntar por cambios recientes: un fármaco nuevo o una dosis modificada en los últimos días es una pista de primer orden.',
              'Preguntar por lo que no considera medicación: productos de herbolario, suplementos, analgésicos sin receta y remedios de otras personas.',
              'Comprobar quién administra la medicación y si el paciente puede manejarla por sí mismo.',
              'Registrar la hora de la última toma.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Cuadros que deben hacer pensar en la medicación',
            headers: ['Lo que se encuentra', 'Qué considerar'],
            filas: [
              ['Caídas repetidas o mareo al incorporarse', 'Fármacos que bajan la presión o que sedan'],
              ['Confusión de aparición reciente', 'Fármaco nuevo, dosis modificada o acumulación'],
              ['Sangrado desproporcionado o hematoma tras golpe leve', 'Medicación que altera la coagulación'],
              ['Frecuencia cardiaca que no sube pese al deterioro', 'Fármacos que limitan la respuesta cardiaca'],
              ['Deshidratación o alteración del equilibrio de líquidos', 'Diuréticos y su interacción con otros fármacos'],
              ['Somnolencia o depresión respiratoria', 'Sedantes, analgésicos potentes y sus combinaciones'],
            ],
          },
          { tipo: 'callout', variante: 'dosis', titulo: 'Esta lección no publica dosis ni ajustes', texto: 'No encontrarás dosis, ajustes por edad ni pautas de retirada. Esa información procede de la Información para Prescribir de cada producto registrado, del formulario del servicio y de la dirección médica. Lo que sí se enseña es a reconocer que la medicación puede ser la causa del cuadro, a recogerla con fiabilidad y a comunicarla. ALCANCE: el equipo no suspende, no modifica ni sustituye la medicación crónica de un paciente.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La aportación concreta del equipo', texto: 'Llegar al hospital con la medicación real del paciente, con la hora de la última toma y con los cambios recientes es una de las contribuciones más valiosas y menos costosas de toda la unidad. Sin eso, el centro receptor trabaja a ciegas durante horas.' },
        ],
      },
      F([GEMS_3, AMLS_4, COFEPRIS, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Polifarmacia', definicion: 'Uso simultáneo de varios medicamentos, habitual en el paciente mayor y causa frecuente de urgencia evitable.' },
      { termino: 'Cascada terapéutica', definicion: 'Situación en que un efecto adverso se interpreta como enfermedad nueva y se trata añadiendo otro fármaco.' },
      { termino: 'Acumulación', definicion: 'Aumento progresivo del efecto de un fármaco por eliminación renal o hepática más lenta.' },
      { termino: 'Medicación real', definicion: 'Lo que el paciente toma efectivamente, que no siempre coincide con lo prescrito.' },
    ],
    flashcards: [
      { frente: 'Los cuatro mecanismos de la polifarmacia', reverso: 'Interacción, acumulación, cascada terapéutica y errores de administración.' },
      { frente: '¿Qué se lleva al hospital?', reverso: 'Los envases, el listado o el pastillero, o sus fotografías, con la hora de la última toma.' },
      { frente: '¿Qué se pregunta además de lo recetado?', reverso: 'Qué toma realmente, qué ha cambiado hace poco y qué no considera medicación.' },
      { frente: '¿Puede un paciente en shock tener frecuencia normal?', reverso: 'Sí: determinados fármacos impiden que el corazón acelere.' },
      { frente: '¿Suspende el equipo la medicación crónica?', reverso: 'No: no la suspende, no la modifica y no la sustituye.' },
      { frente: '¿Qué explica caídas repetidas con mareo al incorporarse?', reverso: 'Fármacos que bajan la presión o que sedan.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente mayor con confusión de aparición reciente al que le cambiaron un medicamento hace tres días. ¿Qué consideras?',
        opciones: [
          'Que la confusión es normal a su edad.',
          'Que el cambio reciente de medicación es una pista de primer orden y debe recogerse y comunicarse.',
          'Que se trata de demencia establecida.',
          'Que no guarda relación con la medicación.',
        ],
        correcta: 1,
        explicacion: 'Un fármaco nuevo o una dosis modificada en los últimos días explica con frecuencia el cuadro.',
      },
      {
        pregunta: 'Paciente con signos de hipoperfusión y frecuencia cardiaca dentro de rango. ¿Qué puede explicarlo?',
        opciones: [
          'Que no está en shock.',
          'Que su medicación puede impedir la taquicardia compensatoria.',
          'Que el pulsioxímetro falla.',
          'Que la presión es siempre fiable.',
        ],
        correcta: 1,
        explicacion: 'La medicación cambia la interpretación de los signos vitales.',
      },
      {
        pregunta: '¿Qué se pregunta para obtener la medicación real?',
        opciones: [
          'Solo lo que aparece en el informe médico.',
          'Qué toma realmente, qué ha cambiado hace poco, qué no considera medicación y quién se la administra.',
          'Únicamente los fármacos para el corazón.',
          'Nada: se deduce de sus enfermedades.',
        ],
        correcta: 1,
        explicacion: 'Lo prescrito y lo tomado no siempre coinciden, y lo que el paciente no considera medicación también interactúa.',
      },
      {
        pregunta: 'Buscas en esta lección el ajuste de dosis por edad y no aparece. ¿Por qué?',
        opciones: [
          'Por un olvido de redacción.',
          'Porque procede de la Información para Prescribir, del formulario del servicio y de la dirección médica, y el equipo no modifica la medicación crónica.',
          'Porque no existen ajustes por edad.',
          'Porque la edad no influye en la eliminación de fármacos.',
        ],
        correcta: 1,
        explicacion: 'El bloqueo está declarado de forma expresa en la lección.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Atiendes a una paciente de 84 años con mareo y dos caídas esta semana. En la cocina hay tres pastilleros distintos y varios envases duplicados. ¿Qué haces con esa observación?',
          opciones: [
            'La ignoro: mi trabajo es la lesión de la caída.',
            'La trato como parte del cuadro: recojo o fotografío la medicación, pregunto qué toma realmente, qué ha cambiado y quién se la administra, registro la hora de la última toma y lo comunico en la entrega.',
            'Retiro los medicamentos duplicados y le indico cuáles debe dejar de tomar.',
            'Anoto «polifarmacia» sin más detalle.',
          ],
          correcta: 1,
          explicacion: 'La lección establece esa recogida como la aportación más valiosa del equipo, y prohíbe expresamente suspender o modificar la medicación crónica.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'COFEPRIS. Información para Prescribir (fichas pendientes).'],
      extra: [
        'BLOQUEO DECLARADO: no se publican dosis, ajustes por edad ni pautas de retirada. El equipo no suspende, no modifica y no sustituye la medicación crónica.',
        'No se nombran principios activos concretos: se describen los efectos que modifican la interpretación de los signos, y su identificación corresponde a la IPP y al protocolo.',
      ],
    }),
  },

  'm6-ig-envejecimiento-trauma': {
    icono: '🩹',
    duracion: '15 min',
    resumen: 'El trauma en la persona mayor tiene tres particularidades que cambian el pronóstico: se '
      + 'produce con mecanismos de baja energía, se tolera mucho peor y se infratria con frecuencia '
      + 'porque los signos de gravedad están atenuados. La lección desarrolla las tres, insiste en que '
      + 'la caída desde la propia altura es un mecanismo serio en este paciente y explica por qué la '
      + 'anticoagulación cambia la valoración de un traumatismo craneal leve.',
    objetivos: [
      'Explicar por qué mecanismos leves producen lesiones graves en la persona mayor.',
      'Reconocer el riesgo de infratriaje y sus causas.',
      'Aplicar las precauciones específicas de la inmovilización y del traslado.',
    ],
    secciones: [
      {
        titulo: 'Poca energía, mucho daño',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Por qué',
            items: [
              'El hueso es más frágil: una caída desde la propia altura puede fracturar cadera, vértebras, costillas o muñeca.',
              'La columna es más rígida y con menos capacidad de amortiguar, de modo que se lesiona con mecanismos que en un joven serían banales.',
              'La reserva cardiovascular y respiratoria es menor, así que la misma pérdida de sangre o el mismo dolor torácico se toleran peor.',
              'Las fracturas costales limitan la ventilación en un paciente que ya tiene menos margen, y su evolución es peor.',
              'Hay más espacio intracraneal, de modo que un hematoma puede crecer antes de manifestarse.',
              'La anticoagulación multiplica el riesgo de sangrado ante golpes triviales.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La caída desde la propia altura no es un mecanismo menor', texto: 'Es la frase que más veces hay que repetir en esta unidad. En una persona mayor, caerse de pie es un mecanismo capaz de producir fractura de cadera, fractura vertebral y hemorragia intracraneal. Clasificarlo como trauma banal por la escasa altura es el error de partida que después arrastra toda la atención.' },
        ],
      },
      {
        titulo: 'El infratriaje y cómo evitarlo',
        bloques: [
          { tipo: 'p', texto: 'Se llama infratriaje a clasificar como leve a un paciente que en realidad es grave. En la persona mayor traumatizada ocurre con frecuencia, y por una razón concreta: los criterios habituales se apoyan en signos —taquicardia, hipotensión, alteración clara del nivel de conciencia— que en este paciente están atenuados o modificados por su medicación.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se compensa',
            items: [
              'Bajar el umbral de sospecha y de traslado a centro con capacidad de trauma; las guías de triaje de campo contemplan criterios específicos por edad.',
              'Comparar las constantes con las cifras habituales del paciente, no con la norma poblacional.',
              'Preguntar siempre por anticoagulantes y antiagregantes, y comunicarlo de forma explícita.',
              'Buscar por qué se cayó, además de qué se ha lesionado.',
              'Explorar toda la superficie corporal: las lesiones se acumulan y el paciente puede no referirlas.',
              'Reevaluar con más frecuencia, porque el deterioro es más rápido.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Precauciones de manejo',
            items: [
              'Acolchar generosamente: las prominencias óseas y la piel frágil hacen que una tabla o una camilla rígida produzcan lesión en minutos.',
              'Respetar las deformidades preexistentes: una columna con cifosis marcada no se fuerza a la posición neutra; se rellenan los huecos.',
              'Un collarín que no ajusta a una columna rígida es contraproducente; se prefiere el acolchado y la estabilización adaptada.',
              'Levantar en vez de arrastrar y retirar los adhesivos con cuidado.',
              'Prevención activa de la hipotermia desde el primer minuto.',
              'Analgesia conforme al alcance y al protocolo: el dolor mal controlado empeora la ventilación y la evolución.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Traumatismo craneal leve con anticoagulación', texto: 'Un golpe en la cabeza aparentemente trivial en un paciente anticoagulado exige valoración aunque esté asintomático, porque el sangrado puede aparecer y crecer con retraso. Es probablemente la situación en que más veces se decide mal en el domicilio, y comunicarlo de forma explícita en la entrega es parte del trabajo.' },
        ],
      },
      F([ACS_BEST, ACS_TRIAJE, GEMS_3, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Infratriaje', definicion: 'Clasificación como leve de un paciente que en realidad es grave; frecuente en la persona mayor traumatizada.' },
      { termino: 'Mecanismo de baja energía', definicion: 'Aquel que en un adulto joven sería banal y que en la persona mayor produce lesiones significativas.' },
      { termino: 'Cifosis', definicion: 'Curvatura aumentada de la columna torácica que impide forzar la posición neutra y obliga a rellenar huecos.' },
      { termino: 'Sangrado diferido', definicion: 'Hemorragia que aparece o se hace evidente con retraso, favorecida por la anticoagulación.' },
    ],
    flashcards: [
      { frente: '¿Es banal una caída desde la propia altura en una persona mayor?', reverso: 'No: puede producir fractura de cadera, fractura vertebral y hemorragia intracraneal.' },
      { frente: '¿Qué es el infratriaje y por qué ocurre aquí?', reverso: 'Clasificar como leve a un paciente grave; ocurre porque los signos de gravedad están atenuados o modificados por la medicación.' },
      { frente: '¿Qué se hace con una columna con cifosis marcada?', reverso: 'No se fuerza a la posición neutra: se rellenan los huecos y se acolcha.' },
      { frente: '¿Por qué preocupa un traumatismo craneal leve en un anticoagulado?', reverso: 'Porque el sangrado puede aparecer y crecer con retraso, incluso si está asintomático.' },
      { frente: '¿Con qué se comparan las constantes?', reverso: 'Con las cifras habituales del paciente, no con la norma poblacional.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 86 años que se cayó de pie en casa y se queja de dolor en la cadera. ¿Cómo clasificas el mecanismo?',
        opciones: [
          'Trauma banal por la escasa altura.',
          'Mecanismo serio en este paciente: puede producir fractura de cadera, vertebral y hemorragia intracraneal.',
          'Mecanismo irrelevante si camina.',
          'Solo relevante si hay pérdida de conciencia.',
        ],
        correcta: 1,
        explicacion: 'Clasificarlo como banal es el error de partida que arrastra toda la atención.',
      },
      {
        pregunta: 'Paciente de 88 años anticoagulado que se golpeó la cabeza y está asintomático. ¿Qué corresponde?',
        opciones: [
          'Alta en el lugar.',
          'Valoración y comunicación explícita de la anticoagulación: el sangrado puede aparecer y crecer con retraso.',
          'Observación durante una hora en domicilio.',
          'Descartar lesión por el mecanismo leve.',
        ],
        correcta: 1,
        explicacion: 'Es la situación en que más veces se decide mal en el domicilio.',
      },
      {
        pregunta: 'Vas a inmovilizar a un paciente con cifosis marcada. ¿Qué haces?',
        opciones: [
          'Forzar la posición neutra con correas.',
          'Respetar la deformidad, rellenar los huecos y acolchar generosamente.',
          'Renunciar a toda medida.',
          'Colocar un collarín rígido que no ajusta.',
        ],
        correcta: 1,
        explicacion: 'Forzar una columna rígida puede lesionarla, y las prominencias óseas producen lesión cutánea en minutos.',
      },
      {
        pregunta: '¿Por qué se reevalúa con más frecuencia a este paciente?',
        opciones: [
          'Por protocolo administrativo.',
          'Porque su reserva es menor y el deterioro, más rápido.',
          'Porque las constantes son siempre inestables.',
          'Porque no colabora en la exploración.',
        ],
        correcta: 1,
        explicacion: 'La menor reserva funcional acorta el margen disponible.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Clasificar como leve a un paciente que en realidad es grave se denomina ___.',
          opciones: ['sobretriaje', 'infratriaje', 'triaje inverso'],
          correcta: 1,
          explicacion: 'En la persona mayor traumatizada ocurre porque los signos de gravedad están atenuados.',
        },
        {
          texto: 'Las fracturas costales en la persona mayor limitan la ___ en un paciente que ya tiene menos margen.',
          opciones: ['circulación', 'ventilación', 'movilidad del hombro'],
          correcta: 1,
          explicacion: 'Su evolución es peor que en el adulto joven.',
        },
        {
          texto: 'Además de qué se ha lesionado, en una caída se pregunta ___.',
          opciones: ['a qué hora come', 'por qué se cayó', 'quién le acompaña'],
          correcta: 1,
          explicacion: 'La caída suele ser el síntoma de otro problema agudo.',
        },
      ],
    },
    revision: ficha({ fuentes: [...FU, 'ACS. Field Triage Guidelines, 2021.', 'ACS. Best Practices Guidelines.'] }),
  },

  'm6-ig-envejecimiento-urgencias': {
    icono: '🩺',
    duracion: '15 min',
    resumen: 'En urgencias médicas, el envejecimiento produce un fenómeno constante: los cuadros '
      + 'graves se presentan sin sus signos característicos. El infarto sin dolor, la infección sin '
      + 'fiebre, el abdomen agudo sin defensa y la confusión como única manifestación de casi '
      + 'cualquier cosa. La lección recorre esas presentaciones atípicas y propone una estrategia '
      + 'práctica: partir del cambio referido y descartar primero lo tratable.',
    objetivos: [
      'Reconocer las presentaciones atípicas más frecuentes de los cuadros graves.',
      'Aplicar la estrategia de partir del cambio y descartar lo tratable.',
      'Evitar los sesgos que llevan a atribuir a la edad un cuadro agudo.',
    ],
    secciones: [
      {
        titulo: 'Los cuadros graves sin sus signos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Cuadro', 'Cómo puede presentarse en la persona mayor'],
            filas: [
              ['Síndrome coronario', 'Sin dolor torácico: disnea, debilidad, sudoración, náusea, síncope o confusión'],
              ['Infección grave', 'Sin fiebre: confusión, caídas, debilidad, rechazo del alimento o hipotermia'],
              ['Abdomen agudo', 'Sin defensa marcada ni dolor intenso, con la pared abdominal poco expresiva'],
              ['Insuficiencia cardiaca', 'Como debilidad progresiva, intolerancia al esfuerzo o confusión, sin la disnea clásica'],
              ['Accidente cerebrovascular', 'Atribuido a un deterioro previo o a la edad; la hora de inicio se pierde con frecuencia'],
              ['Hipoglucemia', 'Como confusión, agresividad, focalidad neurológica o coma, imitando otros cuadros'],
              ['Deshidratación', 'Como debilidad, caída o confusión, sin sed referida'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La confusión aguda es un signo, no un diagnóstico', texto: 'Un paciente mayor que empieza a estar confuso tiene, hasta que se demuestre lo contrario, un problema agudo tratable: una infección, un fármaco, una hipoglucemia, una alteración del equilibrio de líquidos, un dolor no controlado, una retención de orina o un cuadro neurológico. Atribuirla a la edad o a una demencia previa es el error más frecuente y más costoso de toda la unidad.' },
        ],
      },
      {
        titulo: 'Una estrategia práctica',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Cuatro pasos',
            items: [
              'Partir del cambio: qué hacía la semana pasada y qué ha cambiado, según quien le conoce.',
              'Descartar primero lo tratable y rápido: glucemia si está dentro del alcance, oxigenación, medicación reciente, dolor no controlado y retención de orina.',
              'Explorar entero: la persona mayor puede no referir el síntoma que orientaría, y las lesiones o los focos se encuentran mirando.',
              'Interpretar las constantes contra sus cifras habituales y contar con el efecto de su medicación.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta que más resuelve', texto: '«¿Desde cuándo está así?». Distingue un cuadro agudo de una situación crónica, sitúa la ventana de tiempo en los cuadros que dependen de ella y orienta toda la valoración. La responde el cuidador, y con frecuencia nadie se la ha preguntado.' },
          {
            tipo: 'lista',
            titulo: 'Sesgos que hay que vigilar',
            items: [
              'Atribuir a la edad lo que es una enfermedad aguda.',
              'Aceptar el diagnóstico previo del paciente sin comprobar si lo de hoy es distinto.',
              'Dar por explicada la confusión con una demencia conocida.',
              'Concluir que no hay dolor porque el paciente no se queja.',
              'Interpretar unas constantes normales como ausencia de gravedad.',
              'Asumir que el deterioro funcional era el habitual sin preguntarlo.',
            ],
          },
        ],
      },
      F([AMLS_4, GEMS_3, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Presentación atípica', definicion: 'Manifestación de un cuadro grave sin sus signos característicos, habitual en la persona mayor.' },
      { termino: 'Confusión aguda', definicion: 'Alteración del estado mental de aparición reciente; signo que obliga a buscar una causa aguda tratable.' },
      { termino: 'Ventana de tiempo', definicion: 'Periodo desde el inicio de los síntomas que condiciona determinadas conductas; su registro es prioritario.' },
      { termino: 'Sesgo de atribución a la edad', definicion: 'Error de asignar al envejecimiento un cuadro que corresponde a una enfermedad aguda.' },
    ],
    flashcards: [
      { frente: '¿Cómo puede presentarse un síndrome coronario en la persona mayor?', reverso: 'Sin dolor: con disnea, debilidad, náusea, sudoración, síncope o confusión.' },
      { frente: '¿Descarta la ausencia de fiebre una infección grave?', reverso: 'No: puede presentarse con confusión, caídas, debilidad o incluso hipotermia.' },
      { frente: '¿Qué es la confusión aguda?', reverso: 'Un signo de problema agudo tratable, no un diagnóstico ni algo esperable por la edad.' },
      { frente: 'La pregunta que más resuelve', reverso: '«¿Desde cuándo está así?».' },
      { frente: '¿Qué se descarta primero?', reverso: 'Lo tratable y rápido: glucemia, oxigenación, medicación reciente, dolor no controlado y retención de orina.' },
    ],
    quiz: [
      {
        pregunta: 'Hombre de 84 años con debilidad, náusea y sudoración, sin dolor torácico. ¿Qué consideras?',
        opciones: [
          'Un cuadro digestivo por descarte.',
          'Un posible síndrome coronario con presentación atípica, frecuente en la persona mayor.',
          'Ansiedad.',
          'Deshidratación exclusivamente.',
        ],
        correcta: 1,
        explicacion: 'La ausencia de dolor no descarta el origen cardiaco en este paciente.',
      },
      {
        pregunta: 'Paciente con demencia conocida que hoy está mucho más confuso que de costumbre. ¿Cómo lo interpretas?',
        opciones: [
          'Como parte esperable de su demencia.',
          'Como confusión aguda sobre una situación crónica: obliga a buscar una causa tratable.',
          'Como un problema de comunicación.',
          'Como efecto de la hora del día.',
        ],
        correcta: 1,
        explicacion: 'Dar por explicada la confusión con la demencia previa es el error más costoso de la unidad.',
      },
      {
        pregunta: '¿Qué se descarta primero ante un paciente mayor con confusión?',
        opciones: [
          'Un tumor cerebral.',
          'Lo tratable y rápido: glucemia, oxigenación, medicación reciente, dolor no controlado y retención de orina.',
          'Un trastorno psiquiátrico primario.',
          'Nada: se traslada sin valorar.',
        ],
        correcta: 1,
        explicacion: 'Son causas frecuentes, reversibles y comprobables en poco tiempo.',
      },
      {
        pregunta: 'La familia dice que «lleva raro un par de días». ¿Qué valor tiene ese dato?',
        opciones: [
          'Poco: es impreciso.',
          'Alto: sitúa el cuadro en el tiempo, lo distingue de una situación crónica y orienta toda la valoración.',
          'Solo sirve si hay fiebre.',
          'Ninguno sin exploración.',
        ],
        correcta: 1,
        explicacion: 'La pregunta por el «desde cuándo» es la que más resuelve en esta unidad.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La confusión aguda en la persona mayor es un ___, no un diagnóstico.',
          opciones: ['síntoma esperable', 'signo de problema agudo tratable', 'rasgo de personalidad'],
          correcta: 1,
          explicacion: 'Atribuirla a la edad es el error más frecuente de la unidad.',
        },
        {
          texto: 'Una infección grave en la persona mayor puede cursar ___ fiebre.',
          opciones: ['siempre con', 'sin', 'solo con'],
          correcta: 1,
          explicacion: 'Puede manifestarse por confusión, caídas, debilidad o hipotermia.',
        },
        {
          texto: 'Concluir que no hay dolor porque el paciente no se queja es un ___ que hay que vigilar.',
          opciones: ['hallazgo', 'sesgo', 'criterio'],
          correcta: 1,
          explicacion: 'La menor expresión del dolor no significa ausencia de dolor.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ig-envejecimiento-psiquiatria': {
    icono: '🧠',
    duracion: '15 min',
    resumen: 'Este tema aborda la salud mental de la persona mayor desde la única distinción que '
      + 'realmente cambia la conducta prehospitalaria: separar el cuadro confusional agudo, que es una '
      + 'urgencia médica con causa tratable, de la demencia, que es crónica y progresiva. Añade la '
      + 'depresión, con frecuencia infradiagnosticada y con riesgo real de suicidio, y las pautas de '
      + 'manejo de la agitación sin recurrir a la fuerza.',
    objetivos: [
      'Diferenciar cuadro confusional agudo, demencia y depresión por su curso y su significado.',
      'Reconocer el riesgo de suicidio en la persona mayor y preguntarlo de forma directa.',
      'Manejar la agitación con medidas no coercitivas y conforme al protocolo.',
    ],
    secciones: [
      {
        titulo: 'La distinción que decide la conducta',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Cuadro confusional agudo', 'Demencia', 'Depresión'],
            filas: [
              ['Inicio', 'Brusco, en horas o días', 'Lento, en meses o años', 'Progresivo, en semanas o meses'],
              ['Curso', 'Fluctúa a lo largo del día', 'Estable y progresivo', 'Persistente'],
              ['Atención', 'Muy alterada: no mantiene el hilo', 'Relativamente conservada al principio', 'Puede parecer alterada por desinterés'],
              ['Conciencia', 'Alterada, con somnolencia o agitación', 'Conservada hasta fases avanzadas', 'Conservada'],
              ['Qué significa', 'URGENCIA MÉDICA con causa tratable', 'Enfermedad crónica que condiciona la atención', 'Cuadro tratable con riesgo de suicidio'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que hay que llevarse de este tema', texto: 'Un cambio brusco del estado mental en una persona mayor es una urgencia médica hasta que se demuestre lo contrario, y su causa suele estar fuera del cerebro: infección, fármaco, hipoglucemia, deshidratación, dolor, retención de orina o falta de oxígeno. La demencia no aparece en dos días. Y las dos cosas pueden coexistir: un paciente con demencia que empeora bruscamente tiene un cuadro agudo encima.' },
        ],
      },
      {
        titulo: 'Depresión, suicidio y agitación',
        bloques: [
          { tipo: 'p', texto: 'La depresión en la persona mayor se manifiesta con frecuencia sin tristeza declarada: pérdida de interés, quejas físicas repetidas, dolor sin explicación, insomnio, pérdida de apetito, abandono del autocuidado y aislamiento. Se atribuye con facilidad a la edad, al duelo o a la enfermedad crónica, y por eso se detecta tarde.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El riesgo de suicidio es real y se pregunta', texto: 'La persona mayor comunica menos su intención y utiliza métodos más letales, de modo que hay menos avisos previos. Preguntar de forma directa y respetuosa si ha pensado en quitarse la vida no induce la idea: permite detectarla. Si la respuesta es afirmativa, o si hay señales —regalar pertenencias, despedirse, acumular medicación, abandono brusco del autocuidado—, se comunica de forma explícita, no se deja al paciente solo y se aplica el procedimiento del servicio.' },
          {
            tipo: 'lista',
            titulo: 'Manejo de la agitación',
            items: [
              'Buscar primero la causa: dolor, retención de orina, estreñimiento, hipoglucemia, falta de oxígeno, fármaco nuevo o entorno desconocido.',
              'Reducir estímulos: bajar el ruido, la luz y el número de personas hablando a la vez.',
              'Un solo interlocutor, de frente, con frases cortas y tono tranquilo.',
              'No discutir ni contradecir de forma frontal a un paciente con deterioro cognitivo: redirigir en vez de confrontar.',
              'Mantener cerca a la persona conocida y objetos familiares.',
              'Asegurar gafas y audífono: la privación sensorial agrava la agitación.',
              'La sujeción y la medicación son el último recurso y dependen del alcance autorizado, del protocolo y de la dirección médica; si se aplican, se vigila y se documenta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La capacidad de decidir no se presume ni se niega', texto: 'Una persona mayor puede rechazar una atención si comprende su situación y las consecuencias de su decisión. El deterioro cognitivo no anula automáticamente esa capacidad, ni su presencia autoriza a decidir por ella sin más. Cuando surge la duda, se explica en términos comprensibles, se documenta lo dicho y lo respondido y se aplica el procedimiento del servicio y el marco jurídico aplicable, que la academia debe entregar.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, LEY_SALUD, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Cuadro confusional agudo', definicion: 'Alteración del estado mental de inicio brusco y curso fluctuante, con atención muy alterada; urgencia médica con causa tratable.' },
      { termino: 'Demencia', definicion: 'Deterioro cognitivo crónico y progresivo, de instauración lenta y curso estable.' },
      { termino: 'Depresión enmascarada', definicion: 'Depresión que se manifiesta por quejas físicas, dolor sin explicación o abandono del autocuidado, sin tristeza declarada.' },
      { termino: 'Redirección', definicion: 'Técnica de manejo de la agitación consistente en desviar la atención en lugar de confrontar al paciente.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue el cuadro confusional agudo de la demencia?', reverso: 'El inicio brusco y el curso fluctuante, con atención muy alterada; la demencia se instaura lentamente.' },
      { frente: '¿Qué significa un cambio brusco del estado mental?', reverso: 'Urgencia médica con causa tratable hasta que se demuestre lo contrario.' },
      { frente: '¿Pueden coexistir demencia y cuadro agudo?', reverso: 'Sí: un paciente con demencia que empeora bruscamente tiene un cuadro agudo encima.' },
      { frente: '¿Induce la idea preguntar por el suicidio?', reverso: 'No: preguntarlo de forma directa y respetuosa permite detectarlo.' },
      { frente: '¿Cuál es el primer paso ante la agitación?', reverso: 'Buscar la causa: dolor, retención, hipoglucemia, falta de oxígeno, fármaco nuevo o entorno desconocido.' },
      { frente: '¿Anula el deterioro cognitivo la capacidad de decidir?', reverso: 'No de forma automática: se explica, se documenta y se aplica el procedimiento y el marco jurídico.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente de 79 años que en dos días ha pasado de estar normal a estar confuso y fluctuante. ¿Qué es?',
        opciones: [
          'Una demencia de inicio.',
          'Un cuadro confusional agudo: urgencia médica cuya causa suele estar fuera del cerebro.',
          'Un cuadro depresivo.',
          'Un rasgo esperable de su edad.',
        ],
        correcta: 1,
        explicacion: 'La demencia no aparece en dos días; el inicio brusco define el cuadro agudo.',
      },
      {
        pregunta: 'Sospechas riesgo de suicidio en un paciente mayor. ¿Qué haces?',
        opciones: [
          'Evitar el tema para no inducir la idea.',
          'Preguntarlo de forma directa y respetuosa, comunicarlo de forma explícita, no dejarle solo y aplicar el procedimiento del servicio.',
          'Comentarlo solo con la familia.',
          'Anotarlo sin comunicarlo.',
        ],
        correcta: 1,
        explicacion: 'Preguntar no induce la idea, y en esta población hay menos avisos previos.',
      },
      {
        pregunta: 'Paciente con demencia agitado en la ambulancia. ¿Cuál es la primera medida?',
        opciones: [
          'Sujeción física inmediata.',
          'Buscar la causa —dolor, retención, hipoglucemia, falta de oxígeno, fármaco nuevo— y reducir estímulos con un solo interlocutor.',
          'Discutir con él para hacerle entrar en razón.',
          'Retirarle las gafas y el audífono para que se calme.',
        ],
        correcta: 1,
        explicacion: 'La sujeción y la medicación son el último recurso; la privación sensorial agrava la agitación.',
      },
      {
        pregunta: 'Un paciente mayor con deterioro cognitivo leve rechaza el traslado. ¿Qué corresponde?',
        opciones: [
          'Decidir por él automáticamente por su deterioro.',
          'Explicar en términos comprensibles, documentar lo dicho y lo respondido, y aplicar el procedimiento del servicio y el marco jurídico aplicable.',
          'Trasladarlo por la fuerza sin más.',
          'Marcharse sin registrar nada.',
        ],
        correcta: 1,
        explicacion: 'El deterioro cognitivo no anula automáticamente la capacidad ni autoriza a decidir sin más.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El cuadro confusional agudo se caracteriza por un inicio ___ y un curso fluctuante.',
          opciones: ['lento', 'brusco', 'estable'],
          correcta: 1,
          explicacion: 'La demencia, en cambio, se instaura en meses o años.',
        },
        {
          texto: 'Ante un paciente con deterioro cognitivo agitado se ___ en lugar de confrontar.',
          opciones: ['discute', 'redirige', 'ignora'],
          correcta: 1,
          explicacion: 'La confrontación frontal aumenta la agitación.',
        },
        {
          texto: 'Asegurar gafas y audífono importa porque la privación ___ agrava la agitación.',
          opciones: ['de sueño', 'sensorial', 'de alimento'],
          correcta: 1,
          explicacion: 'Es una medida sencilla y con efecto inmediato.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'Ley General de Salud, texto vigente (artículos pendientes de verificar).'],
      extra: ['DECISIÓN PENDIENTE: la academia debe entregar su procedimiento sobre capacidad, negativa a la atención y manejo de la agitación, y el marco jurídico aplicable verificado.'],
    }),
  },

  'm6-ig-abuso-mayores': {
    icono: '🛡️',
    duracion: '14 min',
    resumen: 'El maltrato a personas mayores incluye el daño físico, el psicológico, el sexual, el '
      + 'abandono, la negligencia en los cuidados y el abuso económico, y ocurre casi siempre en el '
      + 'entorno de confianza del paciente. El papel del equipo es el mismo que en el maltrato '
      + 'infantil: atender, observar, documentar con objetividad y comunicar por el cauce establecido. '
      + 'La diferencia es que aquí el paciente puede ser plenamente capaz y decidir no denunciar.',
    objetivos: [
      'Reconocer las formas de maltrato a personas mayores y sus indicadores.',
      'Documentar y comunicar con objetividad, sin confrontar ni investigar.',
      'Manejar la situación cuando el paciente capaz rechaza que se actúe.',
    ],
    secciones: [
      {
        titulo: 'Formas e indicadores',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Forma', 'Indicadores'],
            filas: [
              ['Físico', 'Lesiones sin explicación coherente, de distinta antigüedad, en zonas protegidas o con forma de objeto; marcas de sujeción'],
              ['Negligencia', 'Higiene deficiente, deshidratación, desnutrición, lesiones por presión, medicación no administrada, ropa inadecuada'],
              ['Psicológico', 'Paciente temeroso, que evita hablar delante de alguien, apático o excesivamente sumiso'],
              ['Abandono', 'Persona dependiente dejada sola durante periodos prolongados sin medios'],
              ['Económico', 'Falta de dinero para lo básico pese a tener ingresos, o control total de sus recursos por otra persona'],
              ['Sexual', 'Lesiones o quejas en la zona genital, ropa manchada o desgarrada'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Señales en la relación, no solo en el cuerpo', texto: 'Un acompañante que responde por el paciente y no le deja hablar, que se muestra hostil o indiferente, que impide quedarse a solas con él, o un paciente que mira al acompañante antes de responder. También el retraso en solicitar atención y las versiones que cambian. Ninguna de esas señales prueba nada por sí sola, pero todas se documentan.' },
        ],
      },
      {
        titulo: 'Qué hace el equipo',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Conducta',
            items: [
              'Atender las necesidades clínicas como en cualquier otro paciente.',
              'Intentar valorar al paciente a solas si la situación clínica y la seguridad lo permiten.',
              'Observar el entorno y el estado del paciente, y describirlo con hallazgos concretos.',
              'Registrar textualmente lo que diga el paciente, entrecomillado, sin repreguntar ni conducir.',
              'No confrontar ni acusar a nadie en la escena: aumenta el riesgo del paciente y compromete la seguridad del equipo.',
              'Comunicar la sospecha de forma explícita al personal receptor, además de por escrito.',
              'Aplicar el procedimiento de aviso que establezca el servicio y la normativa aplicable.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Cuando el paciente capaz no quiere que se actúe', texto: 'Es la diferencia principal con el maltrato infantil. Una persona mayor con capacidad conservada puede negarse a denunciar, a ser trasladada o a que se informe a nadie, y esa decisión merece respeto aunque resulte frustrante. Lo que sí puede hacerse siempre es documentar lo observado, ofrecer información sobre los recursos disponibles, comunicar la situación por el cauce que establezca el procedimiento y asegurarse de que el paciente sabe cómo pedir ayuda. Cuando la capacidad está comprometida o hay riesgo inmediato, el procedimiento del servicio y el marco jurídico marcan la conducta.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'El cuidador desbordado no siempre es un agresor', texto: 'Muchas situaciones de negligencia proceden de una persona que cuida sola, sin apoyo, sin formación y agotada. Reconocerlo no justifica el daño, pero cambia la respuesta: la información sobre recursos de apoyo y la comunicación al sistema pueden resolver más que una acusación. La valoración de la intención no corresponde al equipo prehospitalario.' },
        ],
      },
      F([GEMS_3, WHO_BEC, LEY_SALUD, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Negligencia en los cuidados', definicion: 'Omisión de la atención necesaria: higiene, alimentación, hidratación, medicación o supervisión.' },
      { termino: 'Abuso económico', definicion: 'Uso indebido de los recursos de la persona mayor o privación del acceso a ellos.' },
      { termino: 'Señal relacional', definicion: 'Indicio observado en la interacción entre el paciente y su acompañante, como impedirle hablar o no dejar valorarlo a solas.' },
      { termino: 'Capacidad conservada', definicion: 'Situación en que el paciente comprende su situación y las consecuencias de su decisión, y puede rechazar que se actúe.' },
    ],
    flashcards: [
      { frente: 'Seis formas de maltrato a personas mayores', reverso: 'Físico, psicológico, sexual, abandono, negligencia y económico.' },
      { frente: 'Tres señales relacionales', reverso: 'Acompañante que responde por el paciente, que impide quedarse a solas con él, y paciente que le mira antes de responder.' },
      { frente: '¿Se confronta al presunto agresor en la escena?', reverso: 'No: aumenta el riesgo del paciente y compromete la seguridad del equipo.' },
      { frente: '¿Qué diferencia principal hay con el maltrato infantil?', reverso: 'Que el paciente puede tener capacidad conservada y negarse a que se actúe.' },
      { frente: '¿Qué puede hacerse siempre?', reverso: 'Documentar lo observado, informar sobre recursos, comunicar por el cauce establecido y asegurar que sabe cómo pedir ayuda.' },
    ],
    quiz: [
      {
        pregunta: 'El acompañante responde por la paciente, no la deja hablar y se niega a que te quedes a solas con ella. ¿Qué haces?',
        opciones: [
          'Le exiges que salga y le acusas.',
          'Intentas valorarla a solas si la situación y la seguridad lo permiten, documentas la observación con hechos y comunicas la sospecha por el cauce establecido.',
          'Ignoras la señal por no ser clínica.',
          'Trasladas sin registrar nada.',
        ],
        correcta: 1,
        explicacion: 'Las señales relacionales se documentan; la confrontación no corresponde al equipo.',
      },
      {
        pregunta: 'Paciente con capacidad conservada que reconoce la situación pero no quiere que se informe a nadie. ¿Qué corresponde?',
        opciones: [
          'Denunciar en su nombre sin decírselo.',
          'Respetar su decisión, documentar lo observado, informar sobre los recursos disponibles, comunicar por el cauce que establezca el procedimiento y asegurar que sabe cómo pedir ayuda.',
          'Marcharse sin hacer nada.',
          'Forzar el traslado.',
        ],
        correcta: 1,
        explicacion: 'Es la diferencia principal con el maltrato infantil y exige respetar la capacidad conservada.',
      },
      {
        pregunta: '¿Cuál de estas anotaciones es correcta?',
        opciones: [
          '«Paciente maltratada por su hijo».',
          '«Lesiones equimóticas de distinta antigüedad en cara interna de ambos brazos; higiene deficiente; la paciente mira al acompañante antes de responder; el acompañante impide la valoración a solas».',
          '«Familia negligente».',
          '«Situación sospechosa».',
        ],
        correcta: 1,
        explicacion: 'Se describen hallazgos comprobables; las conclusiones corresponden a otras instancias.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Encuentras a una paciente dependiente con higiene muy deficiente y medicación sin administrar, cuidada en solitario por su hija, que se muestra agotada y llorosa. ¿Cómo enfocas la situación?',
          opciones: [
            'La acuso de negligencia en la escena.',
            'Atiendo a la paciente, documento los hallazgos con hechos y sin calificativos, considero que la sobrecarga del cuidador puede estar detrás, informo sobre los recursos disponibles y comunico la situación por el cauce que establezca el procedimiento.',
            'Omito los hallazgos para no perjudicar a la familia.',
            'Traslado sin comunicar nada al personal receptor.',
          ],
          correcta: 1,
          explicacion: 'La lección señala que la valoración de la intención no corresponde al equipo y que la comunicación al sistema puede resolver más que una acusación, sin dejar de documentar los hallazgos.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'Ley General de Salud, texto vigente (artículos pendientes de verificar).'],
      extra: [
        'DECISIÓN PENDIENTE: la academia debe entregar su procedimiento de aviso y la normativa mexicana concreta sobre notificación en casos de maltrato a personas mayores.',
        'La lección no enuncia artículos jurídicos concretos porque no se han verificado en el texto vigente.',
      ],
    }),
  },

  // ---------- Manejo geriátrico ----------

  'm6-mg-evaluacion': {
    icono: '📋',
    duracion: '16 min',
    resumen: 'La evaluación del paciente geriátrico usa la misma secuencia que la de cualquier otro '
      + 'paciente, pero con tres añadidos que no son opcionales: comparar con su línea de base, '
      + 'recoger la medicación real y valorar el entorno y el apoyo. La lección integra el diamante '
      + 'GEMS en la práctica, ordena la exploración teniendo en cuenta la fragilidad y explica qué '
      + 'debe contener una entrega útil.',
    objetivos: [
      'Ejecutar la evaluación geriátrica integrando línea de base, medicación y entorno.',
      'Adaptar la exploración física a la fragilidad y a las limitaciones del paciente.',
      'Construir una entrega que aporte lo que el centro receptor no puede obtener.',
    ],
    secciones: [
      {
        titulo: 'La secuencia con tres añadidos',
        bloques: [
          { tipo: 'p', texto: 'La valoración inicial no cambia: seguridad, impresión general, vía aérea, ventilación, circulación, estado neurológico y exposición. Lo que se añade es el contexto sin el cual esos hallazgos no significan lo mismo.' },
          {
            tipo: 'lista',
            titulo: 'Los tres añadidos',
            items: [
              'Línea de base: qué hacía por sí mismo hace una semana, cómo caminaba, si salía de casa, cómo estaba de memoria, y qué ha cambiado. Sin ese dato, ninguna exploración es interpretable.',
              'Medicación real: envases, listado o pastillero, cambios recientes y hora de la última toma.',
              'Entorno y apoyo: cómo vive, quién le cuida, si come, si puede manejar su medicación y si ha habido cambios recientes en su situación.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta que estructura toda la entrevista', texto: '«¿Qué es distinto hoy respecto a la semana pasada?». Sirve para el paciente, para la familia y para el cuidador profesional, y convierte una lista de enfermedades crónicas en un cuadro agudo identificable. Si no se pregunta, el equipo se queda con la fotografía y sin la película.' },
        ],
      },
      {
        titulo: 'Explorar a un paciente frágil',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cómo se adapta',
            items: [
              'Exponer por partes y volver a cubrir: el paciente se enfría deprisa y el pudor importa.',
              'Explorar toda la superficie, incluida la espalda, los glúteos y los pies: las lesiones por presión y las heridas se encuentran mirando.',
              'Movilizar levantando, nunca arrastrando, y acolchar las prominencias óseas.',
              'Tener en cuenta las deformidades y las limitaciones articulares: no se fuerza ninguna posición.',
              'Valorar el dolor de forma activa, porque el paciente puede no referirlo.',
              'Interpretar las constantes contra sus cifras habituales y contar con el efecto de su medicación.',
              'Medir la glucemia si está dentro del alcance ante cualquier alteración del estado mental.',
              'Reevaluar con más frecuencia de lo habitual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que se busca y casi nadie mira', texto: 'Lesiones por presión en sacro y talones, deshidratación de mucosas, retención de orina —un globo vesical explica agitación, dolor y confusión y se palpa en segundos—, estreñimiento importante, y el estado de los pies. Son hallazgos frecuentes, con consecuencias clínicas y que el paciente rara vez menciona.' },
        ],
      },
      {
        titulo: 'La entrega',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué debe contener',
            items: [
              'La línea de base y qué ha cambiado, con el «desde cuándo».',
              'La medicación real, la hora de la última toma y los cambios recientes.',
              'Las cifras habituales del paciente, si se conocen, junto a las obtenidas.',
              'Los hallazgos del entorno y de la situación social, descritos con hechos.',
              'Quién aportó cada dato.',
              'Lo administrado y la respuesta.',
              'Si hay documento de voluntades anticipadas o indicaciones previas y dónde está, conforme al procedimiento del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La aportación que nadie más puede hacer', texto: 'El hospital podrá repetir la exploración, la analítica y la imagen. Lo que no podrá recuperar es cómo estaba la casa, qué medicación había, qué decía el paciente antes de que se deteriorara y qué es distinto hoy. Esa información se pierde para siempre si el equipo no la recoge, y con frecuencia es la que resuelve el caso.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Línea de base funcional', definicion: 'Lo que el paciente hacía por sí mismo antes del episodio; sin ella los hallazgos no son interpretables.' },
      { termino: 'Globo vesical', definicion: 'Retención de orina palpable; causa frecuente de agitación, dolor y confusión, y fácil de comprobar.' },
      { termino: 'Lesión por presión', definicion: 'Daño cutáneo por presión mantenida, habitual en sacro y talones; se encuentra explorando toda la superficie.' },
      { termino: 'Voluntades anticipadas', definicion: 'Documento con las indicaciones previas del paciente; su existencia y ubicación se comunican conforme al procedimiento del servicio.' },
    ],
    flashcards: [
      { frente: 'Los tres añadidos de la evaluación geriátrica', reverso: 'Línea de base, medicación real, y entorno y apoyo.' },
      { frente: 'La pregunta que estructura la entrevista', reverso: '«¿Qué es distinto hoy respecto a la semana pasada?».' },
      { frente: '¿Qué hallazgo explica agitación, dolor y confusión y se palpa en segundos?', reverso: 'La retención de orina, el globo vesical.' },
      { frente: '¿Dónde se buscan las lesiones por presión?', reverso: 'En sacro y talones, explorando toda la superficie corporal.' },
      { frente: '¿Qué información se pierde si el equipo no la recoge?', reverso: 'El estado de la casa, la medicación, cómo estaba antes y qué es distinto hoy.' },
      { frente: '¿Cómo se movilizará a un paciente frágil?', reverso: 'Levantando, nunca arrastrando, y acolchando las prominencias óseas.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente mayor con debilidad y confusión. ¿Qué dato hace interpretable el resto de la exploración?',
        opciones: [
          'La temperatura de la vivienda.',
          'Su línea de base: qué hacía por sí mismo hace una semana y qué ha cambiado.',
          'El número de hijos.',
          'Su peso exacto.',
        ],
        correcta: 1,
        explicacion: 'Sin la línea de base, los hallazgos no significan lo mismo.',
      },
      {
        pregunta: 'Paciente mayor agitado, con dolor abdominal bajo y sin orinar desde hace horas. ¿Qué compruebas en segundos?',
        opciones: [
          'La glucemia exclusivamente.',
          'Si hay retención de orina: un globo vesical explica agitación, dolor y confusión.',
          'La saturación de oxígeno únicamente.',
          'La temperatura axilar.',
        ],
        correcta: 1,
        explicacion: 'Es un hallazgo frecuente, con consecuencias clínicas y que el paciente rara vez menciona.',
      },
      {
        pregunta: '¿Qué debe contener la entrega de un paciente geriátrico además de lo clínico?',
        opciones: [
          'Solo las constantes obtenidas.',
          'La línea de base y el cambio con su «desde cuándo», la medicación real con la hora de la última toma, los hallazgos del entorno y quién aportó cada dato.',
          'El nombre del médico de cabecera únicamente.',
          'Nada más: el hospital lo obtendrá después.',
        ],
        correcta: 1,
        explicacion: 'Es precisamente la información que el centro receptor no podrá recuperar.',
      },
      {
        pregunta: 'Vas a movilizar a una paciente con piel muy frágil. ¿Qué haces?',
        opciones: [
          'La arrastras sobre la sábana para ir más rápido.',
          'La levantas, acolchas las prominencias óseas y evitas la fricción.',
          'La sujetas por las axilas y tiras.',
          'Retiras los adhesivos con un tirón seco.',
        ],
        correcta: 1,
        explicacion: 'El desgarro cutáneo iatrogénico es frecuente y evitable.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la evaluación de un paciente geriátrico en domicilio',
        pasos: [
          'Valorar la seguridad y formar la impresión general al entrar',
          'Aplicar la secuencia inicial: vía aérea, ventilación, circulación y estado neurológico',
          'Preguntar por la línea de base y por qué es distinto hoy',
          'Recoger la medicación real, los cambios recientes y la hora de la última toma',
          'Explorar toda la superficie, incluidas espalda, sacro, talones y pies',
          'Observar el entorno y la situación social, describiéndolos con hechos',
          'Reevaluar y preparar una entrega con lo que el centro no podrá obtener',
        ],
      },
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-mg-traumatismo': {
    icono: '🚑',
    duracion: '15 min',
    resumen: 'Este tema traslada a la práctica lo estudiado sobre el trauma geriátrico: cómo se maneja '
      + 'de principio a fin un paciente mayor lesionado. La secuencia es la habitual, pero con el '
      + 'umbral de alarma bajado, la inmovilización adaptada a una columna rígida y una piel frágil, '
      + 'la anticoagulación como dato prioritario y la búsqueda sistemática de la causa de la caída, '
      + 'que suele ser el verdadero motivo de la llamada.',
    objetivos: [
      'Manejar al paciente geriátrico traumatizado con el umbral de alarma ajustado.',
      'Adaptar inmovilización, movilización y traslado a la fragilidad.',
      'Investigar la causa de la caída como parte del manejo del trauma.',
    ],
    secciones: [
      {
        titulo: 'El manejo, paso a paso',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Prioridades',
            items: [
              'Control de la hemorragia visible y valoración de la vía aérea y de la ventilación como en cualquier traumatizado.',
              'Interpretar las constantes contra las cifras habituales del paciente y contar con su medicación.',
              'Preguntar de forma explícita por anticoagulantes y antiagregantes, y anotarlo en lugar visible del informe.',
              'Explorar toda la superficie: las lesiones se acumulan y el paciente puede no referirlas.',
              'Analgesia conforme al alcance y al protocolo: el dolor mal controlado empeora la ventilación, favorece la confusión y dificulta el traslado.',
              'Prevención activa de la hipotermia desde el primer minuto.',
              'Reevaluación frecuente y traslado con umbral bajo a centro con capacidad de trauma, conforme a la guía de triaje y al protocolo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que más se pasa por alto', texto: 'Las fracturas costales, que limitan la ventilación de un paciente sin margen y evolucionan peor; la hemorragia intracraneal de crecimiento lento en el anticoagulado; la fractura vertebral de una caída de escasa altura; y la lesión que el paciente no refiere porque tiene otra que le duele más. Todas se encuentran explorando y reevaluando, no deduciendo.' },
        ],
      },
      {
        titulo: 'Inmovilización, movilización y causa',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Adaptaciones',
            items: [
              'Acolchar generosamente: una superficie rígida produce lesión cutánea en minutos sobre una piel frágil.',
              'Respetar la cifosis y las limitaciones articulares: se rellenan los huecos en lugar de forzar la alineación.',
              'Preferir estabilización adaptada y acolchado a un collarín que no ajusta a una columna rígida.',
              'Levantar en vez de arrastrar y usar el material que reduzca la fricción.',
              'Retirar la tabla larga en cuanto haya cumplido su función de extracción, como en el resto del temario.',
              'Vigilar la ventilación tras inmovilizar: el dispositivo no debe limitar la expansión torácica.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Investigar la caída forma parte del manejo del trauma', texto: 'La lesión que se ve puede ser la consecuencia, no el problema. Se pregunta si notó algo antes de caer, si perdió el conocimiento, si se mareó al levantarse, si ha tenido caídas recientes, qué medicación toma y si hubo un cambio reciente. También se mide la glucemia si está dentro del alcance. Un paciente al que se le trata la muñeca y se le devuelve a una casa donde volverá a caerse no ha sido atendido del todo.' },
          {
            tipo: 'lista',
            titulo: 'Qué se comunica en la entrega',
            items: [
              'Mecanismo real y altura de la caída, con la referencia concreta.',
              'Anticoagulación o antiagregación, de forma explícita.',
              'Cifras habituales del paciente frente a las obtenidas.',
              'Tiempo que permaneció en el suelo, si lo hubo.',
              'Lo que se sospecha sobre la causa de la caída y en qué se apoya.',
              'Situación funcional previa y apoyo disponible en el domicilio.',
            ],
          },
        ],
      },
      F([ACS_BEST, ACS_TRIAJE, GEMS_3, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Umbral de alarma ajustado', definicion: 'Reducción del listón para considerar grave a un paciente mayor traumatizado, por la atenuación de los signos.' },
      { termino: 'Tiempo en el suelo', definicion: 'Periodo que el paciente permaneció caído; añade hipotermia, deshidratación y riesgo de lesión por presión y aplastamiento.' },
      { termino: 'Causa de la caída', definicion: 'Problema agudo que originó el episodio y cuya investigación forma parte del manejo del trauma.' },
    ],
    flashcards: [
      { frente: '¿Qué dato se anota en lugar visible del informe?', reverso: 'La anticoagulación o antiagregación del paciente.' },
      { frente: '¿Qué se hace con una columna rígida y con cifosis?', reverso: 'Se respeta la deformidad, se rellenan los huecos y se acolcha; no se fuerza la alineación.' },
      { frente: '¿Por qué preocupan las fracturas costales aquí?', reverso: 'Porque limitan la ventilación de un paciente sin margen y evolucionan peor.' },
      { frente: '¿Forma parte del manejo del trauma investigar la caída?', reverso: 'Sí: la lesión visible puede ser la consecuencia, no el problema.' },
      { frente: '¿Qué añade el tiempo en el suelo?', reverso: 'Hipotermia, deshidratación y riesgo de lesión por presión y por aplastamiento.' },
    ],
    quiz: [
      {
        pregunta: 'Hombre de 85 años anticoagulado que se cayó y tiene una herida en la ceja, consciente y orientado. ¿Qué priorizas comunicar?',
        opciones: [
          'El tamaño exacto de la herida.',
          'La anticoagulación y el traumatismo craneal, de forma explícita, además de investigar por qué se cayó.',
          'Solo las constantes.',
          'El tipo de suelo del domicilio.',
        ],
        correcta: 1,
        explicacion: 'El sangrado intracraneal puede aparecer y crecer con retraso en este perfil.',
      },
      {
        pregunta: 'Paciente con fractura costal única tras una caída. ¿Por qué no es banal?',
        opciones: [
          'Porque siempre requiere cirugía.',
          'Porque limita la ventilación de un paciente que ya tiene menos margen y su evolución es peor.',
          'Porque impide la inmovilización.',
          'Porque indica maltrato.',
        ],
        correcta: 1,
        explicacion: 'El dolor y la limitación ventilatoria pesan más en un paciente con poca reserva.',
      },
      {
        pregunta: 'Has tratado la fractura de muñeca de una paciente que se cayó. ¿Qué falta?',
        opciones: [
          'Nada: la lesión está atendida.',
          'Investigar por qué se cayó y comunicarlo: si no, volverá a caerse, probablemente peor.',
          'Recomendar reposo absoluto.',
          'Dar el alta con analgésicos.',
        ],
        correcta: 1,
        explicacion: 'La lesión visible puede ser la consecuencia y no el problema.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Mujer de 83 años encontrada en el suelo tras seis horas, con dolor en la cadera, fría y algo confusa, que toma un anticoagulante. ¿Cómo ordenas tu actuación y qué comunicas?',
          opciones: [
            'Solo inmovilizo la cadera y traslado.',
            'Manejo la lesión y a la vez el tiempo en el suelo —hipotermia, deshidratación y riesgo de lesión por presión y aplastamiento—, exploro toda la superficie, investigo por qué cayó, mido la glucemia si está dentro del alcance, y comunico de forma explícita la anticoagulación, el tiempo en el suelo y la sospecha sobre la causa.',
            'Espero a que entre en calor antes de trasladar.',
            'Atribuyo la confusión a su edad y no la comunico.',
          ],
          correcta: 1,
          explicacion: 'La lección integra los tres elementos —lesión, consecuencias del tiempo en el suelo y causa de la caída— y exige comunicar la anticoagulación de forma explícita.',
        },
      ],
    },
    revision: ficha({ fuentes: [...FU, 'ACS. Field Triage Guidelines, 2021.', 'ACS. Best Practices Guidelines.'] }),
  },

  'm6-mg-emergencias-medicas': {
    icono: '❤️‍🩹',
    duracion: '16 min',
    resumen: 'Cierre del módulo: cómo se maneja en la práctica una urgencia médica en la persona '
      + 'mayor. La lección integra todo lo anterior en una conducta —partir del cambio, descartar lo '
      + 'tratable, interpretar contra la línea de base y contar con la medicación— y añade dos '
      + 'cuestiones que el equipo encontrará y que no puede improvisar: las voluntades anticipadas y '
      + 'la decisión sobre el destino cuando lo social pesa tanto como lo clínico.',
    objetivos: [
      'Aplicar una conducta ordenada ante la urgencia médica del paciente mayor.',
      'Reconocer y respetar las voluntades anticipadas conforme al procedimiento.',
      'Integrar los factores sociales en la decisión de destino y en la entrega.',
    ],
    secciones: [
      {
        titulo: 'Una conducta que integra todo el módulo',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Cinco pasos',
            items: [
              'Impresión general y secuencia inicial, sin dar por buena ninguna constante hasta compararla con sus cifras habituales.',
              'Partir del cambio: qué es distinto hoy y desde cuándo, según quien le conoce.',
              'Descartar lo tratable y rápido: glucemia si está dentro del alcance, oxigenación, medicación reciente, dolor no controlado y retención de orina.',
              'Explorar entero y buscar el foco: la persona mayor puede no referir el síntoma que orientaría.',
              'Decidir destino integrando lo clínico y lo social, y preparar una entrega con lo que el hospital no podrá recuperar.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Las cuatro trampas del módulo, juntas', texto: 'Un infarto sin dolor. Una infección sin fiebre. Un shock sin taquicardia porque su medicación lo impide. Una confusión atribuida a la edad cuando es el único signo de un cuadro agudo. Si al terminar la unidad solo se recuerdan cuatro cosas, que sean estas.' },
        ],
      },
      {
        titulo: 'Voluntades anticipadas y destino',
        bloques: [
          { tipo: 'p', texto: 'Algunos pacientes han dejado por escrito qué atención desean recibir y cuál no, o han designado a alguien para decidir por ellos. Encontrarse con ese documento en una urgencia es cada vez más frecuente, y el equipo debe saber qué hacer: comprobar su existencia, leerlo si está disponible, aplicarlo conforme al procedimiento del servicio y al marco jurídico aplicable, y comunicarlo en la entrega junto con su ubicación.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que no significa un documento de voluntades', texto: 'No significa que el paciente no reciba atención. Un documento que limita determinadas medidas no limita el alivio del dolor, la disnea o el sufrimiento, ni el acompañamiento, ni el traslado si es lo indicado. Confundir «limitar unas medidas» con «no hacer nada» es un error grave que deja a un paciente sin el cuidado al que tiene derecho.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cuando no hay documento pero la familia refiere una voluntad', texto: 'La conducta la marca el procedimiento del servicio y la dirección médica. Lo que el equipo debe hacer siempre es documentar qué se refirió, quién lo refirió y en qué momento, y consultar conforme al protocolo en lugar de decidir por su cuenta. Esta lección no fija esa conducta porque depende del marco jurídico, que la academia debe entregar verificado.' },
          {
            tipo: 'lista',
            titulo: 'El destino integra lo clínico y lo social',
            items: [
              'La gravedad y la necesidad de recursos, como en cualquier paciente.',
              'La capacidad del entorno para vigilar y cuidar en las horas siguientes.',
              'Si el paciente puede alimentarse, hidratarse y tomar su medicación por sí mismo.',
              'Si hay riesgo de nueva caída o de deterioro sin supervisión.',
              'Los deseos del paciente y su capacidad de decidir.',
              'Los criterios y los recursos que fije el protocolo del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El cierre del módulo', texto: 'La atención a la persona mayor no consiste en hacer menos por su edad ni en aplicar sin más lo que sirve para un adulto joven. Consiste en reconocer antes, buscar lo que no se manifiesta, interpretar contra su propia normalidad, contar con su medicación y su entorno, y respetar sus decisiones. Todo eso cabe en el mismo tiempo de asistencia; lo que cambia no es la duración, sino qué se pregunta y qué se mira.' },
        ],
      },
      F([GEMS_3, AMLS_4, WHO_BEC, LEY_SALUD, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Voluntades anticipadas', definicion: 'Documento en que el paciente expresa qué atención desea recibir y cuál no, o designa a quien decida por él.' },
      { termino: 'Limitación de medidas', definicion: 'Restricción de determinadas intervenciones que nunca excluye el alivio del dolor, el acompañamiento ni el cuidado.' },
      { termino: 'Destino integrado', definicion: 'Decisión sobre el traslado que combina gravedad clínica, capacidad del entorno y deseos del paciente.' },
    ],
    flashcards: [
      { frente: 'Las cuatro trampas del módulo', reverso: 'Infarto sin dolor, infección sin fiebre, shock sin taquicardia por la medicación y confusión atribuida a la edad.' },
      { frente: '¿Significa un documento de voluntades que no se haga nada?', reverso: 'No: nunca limita el alivio del dolor, la disnea, el sufrimiento ni el acompañamiento.' },
      { frente: '¿Qué se hace si la familia refiere una voluntad sin documento?', reverso: 'Documentar qué se refirió, quién y cuándo, y consultar conforme al protocolo en lugar de decidir por cuenta propia.' },
      { frente: '¿Qué se descarta primero en la urgencia médica geriátrica?', reverso: 'Lo tratable y rápido: glucemia, oxigenación, medicación reciente, dolor no controlado y retención de orina.' },
      { frente: '¿Qué integra la decisión de destino?', reverso: 'La gravedad clínica, la capacidad del entorno, los deseos del paciente y los criterios del protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con documento de voluntades que limita determinadas medidas y presenta dolor intenso y disnea. ¿Qué corresponde?',
        opciones: [
          'No intervenir: el documento limita la atención.',
          'Aliviar el dolor y la disnea conforme al alcance y al protocolo, acompañar y trasladar si está indicado: la limitación de medidas nunca excluye el cuidado.',
          'Ignorar el documento.',
          'Aplicar todas las medidas posibles sin considerar el documento.',
        ],
        correcta: 1,
        explicacion: 'Confundir limitar medidas con no hacer nada deja al paciente sin el cuidado al que tiene derecho.',
      },
      {
        pregunta: 'La familia refiere una voluntad del paciente pero no hay documento. ¿Qué haces?',
        opciones: [
          'Aplicarla directamente.',
          'Documentar qué se refirió, quién lo refirió y cuándo, y consultar conforme al protocolo del servicio.',
          'Ignorarla por completo.',
          'Decidir según tu criterio personal.',
        ],
        correcta: 1,
        explicacion: 'La conducta depende del marco jurídico y del procedimiento, que la academia debe entregar verificado.',
      },
      {
        pregunta: 'Dos pacientes con el mismo cuadro leve: uno con supervisión continua y otro que vive solo sin poder cocinar ni manejar su medicación. ¿Cambia el destino?',
        opciones: [
          'No: la decisión es solo clínica.',
          'Sí: la capacidad del entorno para vigilar y cuidar forma parte legítima de la decisión, conforme al protocolo.',
          'Solo si el paciente lo solicita.',
          'Solo si hay deterioro cognitivo.',
        ],
        correcta: 1,
        explicacion: 'El destino integra lo clínico y lo social, y el centro receptor necesita conocer esa diferencia.',
      },
      {
        pregunta: '¿Qué resume la atención a la persona mayor según el cierre del módulo?',
        opciones: [
          'Hacer menos por su edad.',
          'Reconocer antes, buscar lo que no se manifiesta, interpretar contra su propia normalidad, contar con su medicación y su entorno, y respetar sus decisiones.',
          'Aplicar sin cambios lo que sirve para un adulto joven.',
          'Trasladar siempre sin valorar.',
        ],
        correcta: 1,
        explicacion: 'Lo que cambia no es la duración de la asistencia, sino qué se pregunta y qué se mira.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Un documento que limita determinadas medidas nunca limita el ___ del dolor y del sufrimiento.',
          opciones: ['registro', 'alivio', 'diagnóstico'],
          correcta: 1,
          explicacion: 'Tampoco limita el acompañamiento ni el traslado si está indicado.',
        },
        {
          texto: 'Ante una urgencia médica geriátrica, se parte del ___ referido por quien conoce al paciente.',
          opciones: ['diagnóstico previo', 'cambio', 'peso'],
          correcta: 1,
          explicacion: 'Convierte una lista de enfermedades crónicas en un cuadro agudo identificable.',
        },
        {
          texto: 'La decisión de destino integra lo clínico y lo ___.',
          opciones: ['económico', 'social', 'administrativo'],
          correcta: 1,
          explicacion: 'La capacidad del entorno para vigilar y cuidar forma parte legítima de la decisión.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'Ley General de Salud, texto vigente (artículos pendientes de verificar).'],
      extra: [
        'DECISIÓN PENDIENTE: la academia debe entregar el marco jurídico verificado y su procedimiento sobre voluntades anticipadas, limitación de medidas y criterios de destino.',
        'La lección no enuncia artículos concretos ni fija la conducta ante una voluntad referida sin documento: la remite al protocolo y a la dirección médica.',
      ],
    }),
  },
}
