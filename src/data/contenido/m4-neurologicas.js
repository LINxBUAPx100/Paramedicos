// ============================================================
//  Módulo 4 · Urgencias del sistema nervioso
// ------------------------------------------------------------
//  Unidad completa (2 semanas, 5 horas según el PDF), en su orden: exploración
//  neurológica dirigida, cefalea y migraña, accidente cerebrovascular, crisis
//  convulsivas y estado epiléptico, y síncope.
//
//  Pauta temática: `docs/archivo/GUIA-REDACCION-M4-RESTANTE.md`. Fuentes asignadas por
//  el registro para `m4-urgencias-sistema-nervioso`: AHA/ASA 2026 para ictus
//  isquémico, AHA/ASA 2022 para hemorragia intracerebral, ACEP 2019 para
//  cefalea, ACC/AHA/HRS 2017 para síncope, WHO mhGAP 2023 y AES 2016 para
//  crisis convulsivas; AMLS como apoyo; requiere protocolo local.
//
//  NOTA SOBRE LAS HORAS: el PDF asigna a esta unidad 2 semanas y 5 horas, una
//  inconsistencia documental ya registrada en CLAUDE.md que no se corrige aquí.
//
//  Ninguna lección publica dosis, tiempos de ventana terapéutica, puntuaciones
//  de escalas ni objetivos de presión: las guías son de acceso restringido y no
//  se abrió su texto, y varias de esas cifras dependen además del sistema local
//  de atención. Cada ficha declara la deuda.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const AHA_STROKE_2026 = {
  nombre: 'AHA/ASA 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke.',
  url: 'https://professional.heart.org/en/guidelines-statements/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-strokestr0000000000000513',
  nota: 'Guía rectora del ICTUS ISQUÉMICO agudo. PENDIENTE: sección exacta, ventanas de tiempo y '
    + 'objetivos de presión; no se consultó el texto completo al redactar y no sostiene ninguna cifra.',
}
const AHA_ICH_2022 = {
  nombre: 'AHA/ASA 2022 Guideline for the Management of Patients With Spontaneous Intracerebral '
    + 'Hemorrhage.',
  url: 'https://professional.heart.org/en/guidelines-statements/2022-guideline-for-the-management-of-patients-with-spontaneous-intracerebralstr0000000000000407',
  nota: 'Guía rectora de la HEMORRAGIA INTRACEREBRAL espontánea. Se cita porque el ictus hemorrágico '
    + 'y el isquémico no se distinguen sin imagen. PENDIENTE: sección exacta.',
}
const ACEP_CEFALEA_2019 = {
  nombre: 'American College of Emergency Physicians. Clinical Policy: Critical Issues in the '
    + 'Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute '
    + 'Headache, 2019.',
  url: 'https://www.acep.org/siteassets/sites/acep/media/clinical-policies/cp-headache.pdf',
  nota: 'Marco de estratificación de riesgo de la cefalea aguda. Documento de ámbito de urgencias '
    + 'hospitalarias: sus pruebas complementarias no se trasladan a la ambulancia. PENDIENTE: sección '
    + 'exacta; no se consultó el texto completo.',
}
const AHA_SINCOPE_2017 = {
  nombre: '2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope.',
  url: 'https://professional.heart.org/en/science-news/2017-acc-aha-hrs-guideline-for-the-evaluation-and-management-of-patients-with-syncope',
  nota: 'Guía rectora del SÍNCOPE. PENDIENTE: sección exacta de estratificación de riesgo; no se '
    + 'consultó el texto completo al redactar.',
}
const WHO_MHGAP_2023 = {
  nombre: 'World Health Organization. mhGAP Guideline for Mental, Neurological and Substance Use '
    + 'Disorders, 3.ª edición, 2023.',
  url: 'https://www.who.int/publications/i/item/9789240084278',
  nota: 'Guía de la OMS que cubre epilepsia y crisis convulsivas en entornos con recursos variables. '
    + 'PENDIENTE: sección exacta; no se consultó el texto completo al redactar.',
}
const AES_STATUS_2016 = {
  nombre: 'American Epilepsy Society. Evidence-Based Guideline: Treatment of Convulsive Status '
    + 'Epilepticus in Children and Adults, 2016.',
  url: 'https://aesnet.org/clinical-care/clinical-guidance',
  nota: 'Origen de la DEFINICIÓN OPERACIONAL del estado convulsivo y del principio de tratamiento '
    + 'temprano. Su condición registrada advierte que dosis y vías dependen de la guía farmacológica '
    + 'vigente y del protocolo local. PENDIENTE: sección exacta.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Apoyo curricular asignado por el registro. Capítulo y página PENDIENTES. No sostiene ninguna '
    + 'afirmación.',
}

const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ninguna dosis, ventana de tiempo, puntuación de escala ni objetivo '
  + 'de presión. Las guías rectoras son de acceso restringido y no se abrió su texto; varias de esas '
  + 'cifras dependen además del sistema local de atención y del protocolo del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocimiento, gravedad, estabilización, reevaluación y '
  + 'destino. No se trasladan al campo pruebas ni tratamientos hospitalarios y la impresión de campo '
  + 'no se presenta como diagnóstico.'
const CONDICIONES = 'Toda intervención farmacológica o avanzada queda condicionada a guía vigente de '
  + 'la indicación, población, contraindicaciones, Información para Prescribir, equipo disponible y '
  + 'competencia autorizada por el protocolo y la dirección médica.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás una ventana de tiempo, una puntuación de corte ni una dosis. Una cifra '
    + 'clínica solo se publica cuando constan su población, su indicación, la edición de la guía que '
    + 'la sostiene y el protocolo que la autoriza. En esta unidad hay además una razón añadida: qué '
    + 'escala se usa, a qué centro se traslada y con qué tiempos lo define el sistema local de '
    + 'atención, que la academia todavía no ha declarado.',
}

const ficha = ({ estado = 'borrador', version, extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    AMBITO,
    SIN_CIFRAS,
    CONDICIONES,
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Exploración neurológica dirigida
  // ============================================================
  'm4-neu-exploracion': {
    icono: 'cp-servier-cerebro',
    duracion: '20 min',
    resumen: 'Un examen neurológico breve, reproducible y comparable, pensado para detectar un deterioro '
      + 'y transmitirlo, no para localizar una lesión.',
    objetivos: [
      'Determinar y registrar la última vez que el paciente fue visto normal.',
      'Ejecutar en orden los componentes de un examen neurológico dirigido.',
      'Comparar de forma sistemática ambos lados y describir la lateralidad.',
      'Reconocer las causas no neurológicas que obligan a comprobarse antes.',
    ],
    secciones: [
      {
        titulo: 'El dato que gobierna todo lo demás',
        bloques: [
          { tipo: 'p', texto: 'Antes de explorar nada conviene fijar un dato del que dependen las decisiones posteriores: la última vez que alguien vio al paciente en su estado normal. No es lo mismo que «cuándo empezaron los síntomas», porque muchos pacientes no pueden precisarlo y muchos cuadros comienzan durante el sueño.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se establece',
            items: [
              'Se pregunta a quien estuvo con el paciente, no solo al paciente.',
              'Se busca una referencia concreta: una llamada telefónica, una comida, un programa de televisión.',
              'Si el cuadro se descubrió al despertar, la referencia es el momento en que se acostó o la última vez que se le vio despierto y normal.',
              'Se registra como una hora, no como «hace un rato».',
              'Se anota también el nombre y el contacto de quien aporta el dato.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Un dato que solo puede recogerse allí', texto: 'El testigo suele estar en la escena y rara vez acompaña al paciente hasta el final del proceso. Si el equipo prehospitalario no recoge la hora y el contacto de quien la aporta, esa información desaparece, y con ella una parte de las decisiones que dependen del tiempo.' },
        ],
      },
      {
        titulo: 'Antes de atribuirlo al cerebro',
        bloques: [
          { tipo: 'p', texto: 'Un déficit neurológico o una alteración del estado mental no siempre tienen origen neurológico. Comprobar primero unas pocas causas frecuentes y reversibles evita orientar mal todo el proceso.' },
          {
            tipo: 'lista',
            titulo: 'Qué se comprueba primero',
            items: [
              'Glucemia capilar, si hay equipo y el protocolo lo autoriza: la hipoglucemia imita a un ictus, a una intoxicación y a una crisis convulsiva.',
              'Oxigenación y ventilación: la hipoxia y la retención de dióxido de carbono alteran el estado mental.',
              'Perfusión: una hipoperfusión mantenida se manifiesta como confusión o somnolencia.',
              'Temperatura, en ambos extremos.',
              'Tóxicos y fármacos, incluidos los propios del paciente y sus cambios recientes.',
              'Antecedente de traumatismo, que puede ser la causa o la consecuencia del cuadro.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La glucemia no es opcional', texto: 'Es la comprobación más rentable de toda la evaluación neurológica: una causa frecuente, reversible en minutos y que se descarta con una medición. Omitirla y trasladar a un paciente hipoglucémico como si tuviera un ictus es un error evitable y documentado.' },
        ],
      },
      {
        titulo: 'El examen, en orden',
        bloques: [
          { tipo: 'p', texto: 'El examen prehospitalario es dirigido: busca detectar un déficit, describirlo con precisión y poder repetirlo igual dentro de diez minutos. No pretende localizar la lesión, que es una tarea hospitalaria y requiere imagen.' },
          {
            tipo: 'pasos',
            titulo: 'Componentes',
            items: [
              'Estado mental: nivel de respuesta con la escala que use el servicio, y orientación explorada y registrada aparte.',
              'Habla y lenguaje: si articula con dificultad, si encuentra las palabras y si comprende lo que se le dice; son tres alteraciones distintas.',
              'Cara: simetría al hablar, al sonreír y al cerrar los ojos.',
              'Fuerza: comparación de ambos lados en extremidades superiores e inferiores, con la maniobra que el protocolo indique.',
              'Sensibilidad: comparación de ambos lados, preguntando si se siente igual y no si se siente.',
              'Pupilas: tamaño, simetría y respuesta a la luz.',
              'Coordinación y marcha: solo si es seguro hacerlo y el paciente puede colaborar.',
              'Signos vitales y glucemia como parte del examen, no como un añadido.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Comparar es la maniobra', texto: 'Casi toda la información útil es comparativa: un lado contra el otro, y este momento contra el anterior. Un hallazgo descrito como «debilidad» vale mucho menos que «no puede sostener el brazo derecho mientras el izquierdo se mantiene», y esa segunda forma es la que permite a otro comprobar si el paciente ha cambiado.' },
        ],
      },
      {
        titulo: 'Repetir, describir y transmitir',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'Una puntuación no sustituye al examen. Un número resume, y al resumir pierde precisamente lo que importa: qué lado, qué función y en qué dirección está cambiando. Las escalas se usan cuando el protocolo las indica, y siempre acompañadas de la descripción.' },
          {
            tipo: 'lista',
            titulo: 'Qué debe contener el informe neurológico',
            items: [
              'Hora en que el paciente fue visto normal por última vez, y quién lo aporta.',
              'Qué déficit se encontró, en qué lado y con qué función.',
              'Cómo estaba al llegar y cómo está ahora: la dirección del cambio.',
              'Glucemia obtenida y hora.',
              'Antecedentes relevantes, tratamiento habitual y anticoagulación si la hubiera.',
              'Escala aplicada, si el protocolo la usa, con su resultado y su hora.',
              'Convulsión presenciada, si la hubo, con su duración y su descripción.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La reevaluación seriada es el examen', texto: 'Un examen neurológico aislado describe un instante. Lo que orienta al equipo receptor es la serie: si el déficit progresa, se mantiene o mejora. Por eso se repite con la cadencia que fije el protocolo y se registra cada repetición con su hora.' },
        ],
      },
      F([AHA_STROKE_2026, bibiano(31, 'Coma', 278), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Última vez visto normal', definicion: 'Hora concreta en que alguien vio al paciente en su estado habitual; no equivale al inicio de los síntomas y solo puede recogerse en la escena.' },
      { termino: 'Causa no neurológica', definicion: 'Hipoglucemia, hipoxia, hipoperfusión, alteración térmica, tóxicos o traumatismo que explican un déficit o una alteración mental y se comprueban antes.' },
      { termino: 'Examen dirigido', definicion: 'Examen breve orientado a detectar un déficit, describirlo con precisión y poder repetirlo igual; no pretende localizar la lesión.' },
      { termino: 'Descripción lateralizada', definicion: 'Registro del hallazgo indicando lado y función, que permite a otro comprobar si el paciente ha cambiado.' },
      { termino: 'Reevaluación seriada', definicion: 'Repetición del examen con la cadencia del protocolo; la serie orienta más que un examen aislado.' },
      { termino: 'Límite de la puntuación', definicion: 'Un número resume y pierde el lado, la función y la dirección del cambio; no sustituye al examen ni a la descripción.' },
    ],
    flashcards: [
      { frente: '¿Qué es la «última vez visto normal» y en qué se diferencia del inicio de síntomas?', reverso: 'La hora concreta en que alguien vio al paciente en su estado habitual; muchos pacientes no pueden precisar el inicio y muchos cuadros empiezan durmiendo.' },
      { frente: '¿Cuál es la comprobación más rentable de la evaluación neurológica?', reverso: 'La glucemia capilar: causa frecuente, reversible en minutos y que se descarta con una medición.' },
      { frente: '¿Qué tres alteraciones del habla se distinguen?', reverso: 'Dificultad para articular, dificultad para encontrar las palabras y dificultad para comprender.' },
      { frente: '¿Cómo se explora la sensibilidad?', reverso: 'Comparando ambos lados y preguntando si se siente IGUAL, no si se siente.' },
      { frente: '¿Sustituye una puntuación al examen neurológico?', reverso: 'No: resume y pierde el lado, la función y la dirección del cambio.' },
      { frente: '¿Por qué es la serie más útil que un examen aislado?', reverso: 'Porque lo que orienta al equipo receptor es si el déficit progresa, se mantiene o mejora.' },
    ],
    quiz: [
      {
        pregunta: 'La familia dice que el paciente amaneció con dificultad para hablar. ¿Qué hora se registra como referencia?',
        opciones: [
          'La hora en que despertó.',
          'La última vez que se le vio despierto y normal, habitualmente el momento en que se acostó.',
          'La hora de la llamada al servicio.',
          'No puede registrarse ninguna hora.',
        ],
        correcta: 1,
        explicacion: 'Cuando el cuadro se descubre al despertar, la referencia es el momento en que se acostó o la última vez que se le vio despierto y normal.',
      },
      {
        pregunta: 'Paciente con déficit focal de aparición brusca. ¿Qué comprobación no puede omitirse antes de atribuirlo al cerebro?',
        opciones: [
          'La temperatura timpánica.',
          'La glucemia capilar, si hay equipo y el protocolo lo autoriza: la hipoglucemia imita a un ictus.',
          'La auscultación cardiaca.',
          'La medición de la presión en ambos brazos.',
        ],
        correcta: 1,
        explicacion: 'Omitirla y trasladar a un paciente hipoglucémico como si tuviera un ictus es un error evitable y documentado.',
      },
      {
        pregunta: 'Registras «debilidad en el brazo». ¿Qué le falta a esa descripción?',
        opciones: [
          'Nada: es suficiente.',
          'El lado y la comparación: «no puede sostener el brazo derecho mientras el izquierdo se mantiene» permite a otro comprobar si ha cambiado.',
          'La puntuación de la escala.',
          'La hora de la llamada.',
        ],
        correcta: 1,
        explicacion: 'Casi toda la información útil de este examen es comparativa: un lado contra el otro y un momento contra el anterior.',
      },
      {
        pregunta: '¿Qué pretende el examen neurológico prehospitalario?',
        opciones: [
          'Localizar la lesión en el sistema nervioso.',
          'Detectar un déficit, describirlo con precisión y poder repetirlo igual para comparar.',
          'Sustituir la exploración hospitalaria.',
          'Determinar si el ictus es isquémico o hemorrágico.',
        ],
        correcta: 1,
        explicacion: 'Localizar la lesión es tarea hospitalaria y requiere imagen; el examen dirigido busca detectar, describir y comparar.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La hora concreta en que alguien vio al paciente en su estado habitual se llama ___ y se registra junto con quién la aporta.',
          opciones: ['inicio de síntomas', 'última vez visto normal', 'hora de llamada', 'tiempo de evolución estimado'],
          correcta: 1,
          explicacion: 'No equivale al inicio de los síntomas y solo puede recogerse en la escena.',
        },
        {
          texto: 'La sensibilidad se explora comparando ambos lados y preguntando si se siente ___.',
          opciones: ['algo', 'igual', 'dolor', 'frío'],
          correcta: 1,
          explicacion: 'Preguntar solo si se siente pierde la comparación, que es lo que aporta información.',
        },
        {
          texto: 'Un paciente con confusión, mala perfusión mantenida y sin déficit focal obliga a considerar una causa ___ antes de atribuirlo al cerebro.',
          opciones: ['neurológica primaria', 'no neurológica', 'traumática exclusiva', 'psiquiátrica'],
          correcta: 1,
          explicacion: 'La hipoperfusión mantenida figura entre las causas que se comprueban primero.',
        },
        {
          texto: 'Lo que más orienta al equipo receptor no es un examen aislado sino la ___ de exámenes repetidos con su hora.',
          opciones: ['puntuación', 'serie', 'descripción única', 'escala validada'],
          correcta: 1,
          explicacion: 'La serie muestra si el déficit progresa, se mantiene o mejora.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA/ASA 2026 (sección pendiente); Bibiano 3.ª ed., cap. 31',
      fuentes: [
        'AHA/ASA 2026 Acute Ischemic Stroke Guideline (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 31, p. 278.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de la guía AHA/ASA 2026.',
        'No se nombra ninguna escala concreta ni se publica ninguna puntuación: se declara que la '
          + 'escala la elige el protocolo y que un número no sustituye al examen.',
        'La evaluación del traumatismo craneal NO se mezcla aquí: pertenece al Módulo 5 con sus '
          + 'propias fuentes.',
      ],
    }),
  },

  // ============================================================
  //  Cefalea y migraña
  // ============================================================
  'm4-neu-cefalea-migrana': {
    icono: 'cp-servier-senos-paranasales',
    duracion: '18 min',
    resumen: 'Cómo se distingue una cefalea que probablemente sea primaria de las banderas rojas que '
      + 'obligan a pensar en una causa secundaria grave.',
    objetivos: [
      'Diferenciar cefalea primaria de cefalea secundaria como categorías.',
      'Caracterizar una cefalea con un esquema reproducible.',
      'Reconocer las banderas rojas que cambian la prioridad del traslado.',
      'Justificar por qué un antecedente de migraña no tranquiliza si el patrón cambió.',
    ],
    secciones: [
      {
        titulo: 'Primaria y secundaria',
        bloques: [
          { tipo: 'p', texto: 'Las cefaleas se agrupan en dos categorías. La primaria es la que constituye la enfermedad en sí misma, sin que exista otra condición que la produzca; la migraña y la cefalea tensional son los ejemplos habituales. La secundaria es un síntoma de otra cosa: una hemorragia, una infección, una elevación de la presión dentro del cráneo, un tóxico o un problema vascular.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La tarea prehospitalaria no es clasificar, sino detectar', texto: 'En la calle no se diagnostica una migraña: el diagnóstico de una cefalea primaria exige, entre otras cosas, haber descartado las causas secundarias, y ese descarte requiere estudios que no viajan en la ambulancia. Lo que sí puede hacerse —y es lo que cambia desenlaces— es reconocer las señales de que esta cefalea puede no ser la de siempre.' },
          {
            tipo: 'lista',
            titulo: 'Caracterizar el dolor',
            items: [
              'Cuándo empezó exactamente y qué hacía el paciente en ese momento.',
              'Cómo empezó: de forma progresiva o alcanzando su máxima intensidad de golpe.',
              'Dónde duele y hacia dónde se extiende.',
              'Cómo es el dolor y con qué lo compara el paciente.',
              'Qué lo empeora y qué lo alivia; si cambia con la postura o con el esfuerzo.',
              'Qué lo acompaña: náusea, vómito, fotofobia, fiebre, alteración visual, debilidad.',
              'Si ha tenido cefaleas antes y, sobre todo, si esta se parece a las anteriores.',
            ],
          },
        ],
      },
      {
        titulo: 'Las banderas rojas',
        bloques: [
          { tipo: 'p', texto: 'Son los datos que obligan a considerar una causa secundaria grave y a modificar la prioridad del traslado. Ninguna de ellas confirma nada por sí sola; su valor está en que su presencia cambia la conducta.' },
          {
            tipo: 'tabla',
            titulo: 'Qué buscar y por qué',
            headers: ['Bandera roja', 'Qué obliga a considerar'],
            filas: [
              ['Inicio súbito que alcanza su máxima intensidad de inmediato', 'Un evento vascular agudo; es la bandera roja más citada'],
              ['Déficit neurológico o alteración del estado mental', 'Una lesión estructural en curso'],
              ['Fiebre con rigidez de nuca', 'Una infección del sistema nervioso'],
              ['Traumatismo craneal reciente', 'Una lesión intracraneal, incluso si el golpe pareció menor'],
              ['Tratamiento anticoagulante', 'Un sangrado, que puede producirse con traumatismos mínimos'],
              ['Embarazo o puerperio', 'Un cuadro obstétrico como la preeclampsia'],
              ['Edad avanzada con una cefalea de patrón nuevo', 'Causas que no aparecían antes en ese paciente'],
              ['Inmunosupresión o cáncer conocido', 'Infecciones y lesiones que en otro paciente serían improbables'],
              ['Alteración visual, dolor ocular o pupila anormal', 'Cuadros oculares y neurológicos que comprometen la visión'],
              ['Cefalea que despierta al paciente o empeora al acostarse o con el esfuerzo', 'Elevación de la presión dentro del cráneo'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Tener migraña no protege de tener otra cosa', texto: 'El error más frecuente de este tema es tranquilizarse ante un paciente con antecedente de migraña. La pregunta que desactiva ese error es sencilla y siempre debe hacerse: «¿esta cefalea se parece a las que suele tener?». Si el paciente responde que no —que es distinta, más intensa, de otro tipo o que empezó de otra manera— el antecedente deja de tranquilizar y pasa a ser irrelevante.' },
          { tipo: 'p', texto: 'Conviene añadir dos precisiones. La fotofobia y la náusea acompañan a muchas cefaleas, incluidas las secundarias graves: su presencia no confirma una migraña. Y ninguna escala ni combinación de síntomas permite excluir con seguridad una hemorragia en el ámbito prehospitalario; esa exclusión requiere estudios hospitalarios.' },
        ],
      },
      {
        titulo: 'Evaluación y conducta',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria y de los signos vitales, incluida la presión arterial.',
              'Glucemia capilar si hay equipo y el protocolo lo autoriza.',
              'Examen neurológico dirigido, con descripción lateralizada.',
              'Caracterización del dolor y búsqueda expresa de las banderas rojas.',
              'Preguntar siempre si esta cefalea se parece a las anteriores.',
              'En mujer en edad fértil, considerar embarazo y, si lo hay, aplicar la ruta obstétrica.',
              'Ambiente tranquilo y con poca luz si eso alivia al paciente.',
              'Analgesia únicamente conforme al protocolo del servicio, con el producto y la vía autorizados.',
              'Traslado con prioridad ajustada a las banderas rojas encontradas, y reevaluación seriada.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que no se traslada a la ambulancia', texto: 'Los documentos que orientan el estudio de la cefalea aguda están escritos para un servicio de urgencias hospitalario y giran alrededor de decisiones sobre imagen y punción lumbar. Nada de eso corresponde al ámbito prehospitalario. De ese marco se toma únicamente lo que sí es aplicable: qué datos elevan el riesgo de una causa secundaria grave.' },
        ],
      },
      F([ACEP_CEFALEA_2019, bibiano(83, 'Cefaleas y algias craneales', 733), bibiano(80, 'Hemorragia subaracnoidea', 707), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Cefalea primaria', definicion: 'La que constituye la enfermedad en sí misma, sin otra condición que la produzca; su diagnóstico exige haber descartado causas secundarias.' },
      { termino: 'Cefalea secundaria', definicion: 'Síntoma de otra condición: hemorragia, infección, elevación de la presión intracraneal, tóxico o problema vascular.' },
      { termino: 'Bandera roja', definicion: 'Dato que obliga a considerar una causa secundaria grave y modifica la prioridad; ninguna confirma por sí sola.' },
      { termino: 'Inicio súbito de máxima intensidad', definicion: 'Cefalea que alcanza su intensidad máxima de inmediato; es la bandera roja más citada y obliga a considerar un evento vascular agudo.' },
      { termino: 'Cambio de patrón', definicion: 'Cefalea distinta de las habituales en un paciente con antecedente; desactiva el valor tranquilizador de ese antecedente.' },
    ],
    flashcards: [
      { frente: '¿Puede diagnosticarse una migraña en la calle?', reverso: 'No: su diagnóstico exige descartar causas secundarias, y ese descarte requiere estudios que no viajan en la ambulancia.' },
      { frente: '¿Cuál es la bandera roja más citada?', reverso: 'El inicio súbito que alcanza la máxima intensidad de inmediato.' },
      { frente: '¿Qué pregunta desactiva el error de tranquilizarse por el antecedente de migraña?', reverso: '«¿Esta cefalea se parece a las que suele tener?». Si es distinta, el antecedente deja de tranquilizar.' },
      { frente: '¿Confirma la fotofobia una migraña?', reverso: 'No: acompaña a muchas cefaleas, incluidas las secundarias graves.' },
      { frente: '¿Puede excluirse una hemorragia con una escala en la ambulancia?', reverso: 'No: esa exclusión requiere estudios hospitalarios.' },
      { frente: '¿Qué banderas rojas aportan el embarazo y la anticoagulación?', reverso: 'El embarazo obliga a considerar un cuadro obstétrico como la preeclampsia; la anticoagulación, un sangrado incluso con traumatismos mínimos.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con antecedente de migraña refiere una cefalea de inicio brusco, la peor de su vida, distinta de las habituales. ¿Cómo procedes?',
        opciones: [
          'Tranquilizarse por el antecedente y trasladar sin prioridad.',
          'Considerar una causa secundaria grave: el cambio de patrón desactiva el valor del antecedente y el inicio súbito es la bandera roja más citada.',
          'Administrar el tratamiento habitual de su migraña.',
          'Descartar hemorragia aplicando una escala.',
        ],
        correcta: 1,
        explicacion: 'Tener migraña no protege de tener otra cosa, y ninguna escala permite excluir una hemorragia en el ámbito prehospitalario.',
      },
      {
        pregunta: 'Paciente con cefalea, fotofobia y náusea. ¿Qué permite concluir esa combinación?',
        opciones: [
          'Que se trata de una migraña.',
          'Poco: fotofobia y náusea acompañan a muchas cefaleas, incluidas las secundarias graves.',
          'Que hay elevación de la presión intracraneal.',
          'Que puede darse de alta en el domicilio.',
        ],
        correcta: 1,
        explicacion: 'Su presencia no confirma una migraña; lo que orienta es la búsqueda expresa de banderas rojas.',
      },
      {
        pregunta: 'Mujer de 33 años embarazada de 30 semanas con cefalea intensa y alteración visual. ¿Qué ruta aplicas?',
        opciones: [
          'La de cefalea primaria con analgesia.',
          'La obstétrica: el embarazo es una bandera roja que obliga a considerar un cuadro como la preeclampsia.',
          'La de traumatismo craneal.',
          'Observación domiciliaria.',
        ],
        correcta: 1,
        explicacion: 'En mujer en edad fértil se considera el embarazo y, si lo hay, se aplica la ruta obstétrica.',
      },
      {
        pregunta: '¿Qué se toma del marco de estratificación de riesgo de la cefalea aguda y qué no?',
        opciones: [
          'Se toman sus decisiones sobre imagen y punción lumbar.',
          'Se toma únicamente qué datos elevan el riesgo de causa secundaria grave; las decisiones sobre imagen y punción lumbar son hospitalarias.',
          'Se toma su esquema de analgesia completo.',
          'No se toma nada: es un documento inaplicable.',
        ],
        correcta: 1,
        explicacion: 'Esos documentos están escritos para urgencias hospitalarias; de ellos se toma lo aplicable al ámbito prehospitalario.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Minicaso 1: varón de 68 años, anticoagulado, con cefalea nueva tras un golpe leve en la cabeza hace dos días. ¿Cuántas banderas rojas identificas y cuál es la pregunta faltante más importante?',
          opciones: [
            'Ninguna bandera roja; preguntar por el tipo de dolor.',
            'Tres —edad con patrón nuevo, anticoagulación y traumatismo craneal reciente—; la pregunta faltante es si ha habido alteración del estado mental o déficit desde entonces.',
            'Una sola, la edad; preguntar por antecedentes familiares.',
            'Dos, anticoagulación y fiebre; preguntar por rigidez de nuca.',
          ],
          correcta: 1,
          explicacion: 'La anticoagulación obliga a considerar sangrado con traumatismos mínimos, y el déficit o la alteración mental es la bandera roja que faltaría por explorar.',
        },
        {
          pregunta: 'Minicaso 2: mujer de 24 años con cefalea, fiebre y rigidez de nuca desde ayer. ¿Qué obliga a considerar y qué prioridad establece?',
          opciones: [
            'Una migraña con fiebre coincidente; prioridad baja.',
            'Una infección del sistema nervioso; traslado con prioridad y protección personal conforme al protocolo.',
            'Una cefalea tensional; observación domiciliaria.',
            'Una causa ocular; derivación a oftalmología.',
          ],
          correcta: 1,
          explicacion: 'Fiebre con rigidez de nuca es la bandera roja que obliga a considerar una infección del sistema nervioso.',
        },
        {
          pregunta: 'Minicaso 3: varón de 40 años con cefalea que lo despierta por la noche y empeora al acostarse, de semanas de evolución. ¿Qué sugiere ese patrón?',
          opciones: [
            'Una cefalea tensional típica.',
            'Elevación de la presión dentro del cráneo, que es lo que ese patrón obliga a considerar.',
            'Un cuadro obstétrico.',
            'Una causa tóxica aguda.',
          ],
          correcta: 1,
          explicacion: 'La cefalea que despierta al paciente o empeora al acostarse o con el esfuerzo figura entre las banderas rojas por ese motivo.',
        },
      ],
    },
    revision: ficha({
      version: 'ACEP Clinical Policy Acute Headache 2019 (sección pendiente); Bibiano 3.ª ed., caps. 83 y 80',
      fuentes: [
        'ACEP Clinical Policy: Acute Headache, 2019 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 83, p. 733 y cap. 80, p. 707.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta del documento ACEP 2019, que además es '
          + 'de ámbito hospitalario y del que solo se toma la estratificación de riesgo.',
        'No se propone ningún analgésico concreto ni se describe ninguna prueba complementaria.',
        'Se declara expresamente que ninguna escala permite excluir una hemorragia subaracnoidea en el '
          + 'ámbito prehospitalario.',
      ],
    }),
  },

  // ============================================================
  //  Accidente cerebrovascular
  // ============================================================
  'm4-neu-evc': {
    icono: 'cp-smart-evc-isquemico',
    duracion: '22 min',
    resumen: 'Cómo se reconoce un ictus, por qué no puede saberse en la calle si es isquémico o '
      + 'hemorrágico y qué convierte al equipo prehospitalario en parte del tratamiento.',
    objetivos: [
      'Explicar los dos mecanismos del ictus y por qué no se distinguen sin imagen.',
      'Reconocer un déficit neurológico focal de aparición brusca.',
      'Identificar los cuadros que imitan un ictus y descartarlos.',
      'Justificar la prenotificación y la selección de destino según el sistema local.',
    ],
    secciones: [
      {
        titulo: 'Dos mecanismos, un mismo cuadro',
        bloques: [
          { tipo: 'p', texto: 'El ictus se produce cuando una zona del encéfalo deja de recibir el flujo que necesita. Eso puede ocurrir por dos mecanismos opuestos: porque un vaso se obstruye y la zona que dependía de él se queda sin sangre, o porque un vaso se rompe y la sangre sale al tejido, dañándolo y comprimiendo lo que tiene alrededor.' },
          {
            tipo: 'tabla',
            titulo: 'Los dos mecanismos',
            headers: ['Tipo', 'Qué ocurre', 'Consecuencia'],
            filas: [
              ['Isquémico', 'Un vaso se obstruye', 'La zona irrigada por ese vaso deja de recibir sangre'],
              ['Hemorrágico', 'Un vaso se rompe', 'La sangre daña el tejido y comprime las estructuras vecinas'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se distinguen en la calle, y eso no es una limitación menor', texto: 'Los dos mecanismos producen el mismo tipo de déficit y ninguna combinación de síntomas, ninguna escala y ninguna exploración permite separarlos con seguridad sin una imagen. Llamar «isquémico» a un ictus antes de la imagen es un error con consecuencias: los tratamientos de uno están contraindicados en el otro. Lo que el prestador transmite es «ictus posible», no un tipo.' },
          { tipo: 'p', texto: 'La razón por la que el tiempo importa tanto es la misma que en el síndrome coronario: el tejido nervioso privado de flujo no se pierde de golpe, sino progresivamente. Cuanto antes se restablezca el flujo en el ictus isquémico —o se controle el sangrado en el hemorrágico—, más tejido se conserva.' },
        ],
      },
      {
        titulo: 'Reconocer',
        bloques: [
          { tipo: 'p', texto: 'El ictus se sospecha ante un déficit neurológico focal de aparición brusca. «Focal» significa que afecta a una función o a un lado concretos, no a todo el paciente por igual; «brusca» significa que apareció en minutos y no a lo largo de días.' },
          {
            tipo: 'lista',
            titulo: 'Manifestaciones frecuentes',
            items: [
              'Asimetría de la cara al hablar o al sonreír.',
              'Debilidad o pérdida de fuerza en un lado del cuerpo.',
              'Alteración del habla: dificultad para articular, para encontrar palabras o para comprender.',
              'Pérdida de sensibilidad en un lado.',
              'Alteración visual: pérdida de campo, visión doble.',
              'Pérdida súbita del equilibrio o de la coordinación.',
              'Cefalea intensa de inicio brusco, que aparece con más frecuencia en el hemorrágico pero no lo distingue.',
              'Alteración del estado de alerta, que sugiere un cuadro extenso o con compromiso del tronco.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Una escala no diagnostica: estandariza', texto: 'Las escalas prehospitalarias de ictus sirven para que profesionales distintos exploren lo mismo y describan igual lo que encuentran, y para activar una ruta. No confirman el ictus ni lo excluyen. Cuál se usa en cada servicio, y qué se hace con su resultado, lo declara el protocolo: esta lección no impone ninguna.' },
        ],
      },
      {
        titulo: 'Lo que imita a un ictus',
        bloques: [
          { tipo: 'p', texto: 'Varios cuadros producen déficits que parecen un ictus y tienen un manejo completamente distinto. Descartarlos no retrasa la ruta: forma parte de ella.' },
          {
            tipo: 'tabla',
            titulo: 'Principales imitadores',
            headers: ['Cuadro', 'Qué lo sugiere'],
            filas: [
              ['Hipoglucemia', 'Diabetes conocida, tratamiento hipoglucemiante, sudoración; se descarta midiendo la glucemia'],
              ['Estado posterior a una crisis convulsiva', 'Convulsión presenciada, mordedura lateral de lengua, relajación de esfínteres, confusión que mejora progresivamente'],
              ['Intoxicación', 'Contexto, sustancias en la escena, pupilas y olor'],
              ['Migraña con aura', 'Antecedente del mismo patrón, instauración más progresiva'],
              ['Infección con repercusión general', 'Fiebre, foco infeccioso, deterioro de días'],
              ['Traumatismo craneal', 'Antecedente o lesiones visibles; puede ser causa o consecuencia'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La glucemia, otra vez', texto: 'De todos los imitadores, la hipoglucemia es el que se descarta más rápido y el que más se lamenta cuando se omite. Se mide en toda sospecha de ictus, si hay equipo y el protocolo lo autoriza.' },
        ],
      },
      {
        titulo: 'Qué hace el equipo prehospitalario',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria: vía aérea, ventilación y circulación, con atención a la protección de la vía aérea si el estado de alerta está alterado.',
              'Establecer y registrar la última vez que el paciente fue visto normal, con el contacto de quien lo aporta.',
              'Glucemia capilar y descarte de los demás imitadores.',
              'Examen neurológico dirigido con descripción lateralizada, y escala si el protocolo la usa.',
              'Monitorización y signos vitales; registrar la presión sin intentar corregirla salvo indicación del protocolo.',
              'Recoger tratamiento habitual, en especial anticoagulantes y antiagregantes, y antecedentes relevantes.',
              'Evitar retrasos: la exploración se completa en camino cuando es posible.',
              'Prenotificación al centro receptor conforme al procedimiento local.',
              'Reevaluación seriada, registrando cada cambio con su hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Tres conductas que hacen daño', texto: 'Bajar la presión arterial de forma intensiva sin indicación: la elevación puede ser un mecanismo de mantenimiento del flujo en la zona afectada, y reducirla sin criterio puede ampliar el daño. Administrar antiagregantes o anticoagulantes en campo sin protocolo: si el ictus es hemorrágico, se agrava. Y retrasar la salida para completar una exploración extensa: el tiempo perdido es tejido perdido.' },
          { tipo: 'p', texto: 'La selección del destino es el punto donde esta lección depende por completo del sistema local. Existen centros con distintas capacidades para tratar un ictus, y el criterio para llevar a un paciente a uno u otro —incluidas las ventanas de tiempo aplicables— lo fija la organización territorial del servicio y su protocolo. Un ejemplo hipotético ayuda a entender la lógica: si el sistema declara que los pacientes con déficit dentro de una ventana determinada van a un centro con capacidad de tratamiento específico y el resto al hospital general más cercano, la decisión del prestador consiste en aplicar ese criterio con la hora que él mismo estableció. Este ejemplo es ilustrativo y NO sustituye al protocolo real.' },
        ],
      },
      F([AHA_STROKE_2026, AHA_ICH_2022, bibiano(79, 'Patología cerebrovascular aguda', 696), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Ictus isquémico', definicion: 'Obstrucción de un vaso que deja sin sangre a la zona que dependía de él.' },
      { termino: 'Ictus hemorrágico', definicion: 'Rotura de un vaso con salida de sangre al tejido, que lo daña y comprime las estructuras vecinas.' },
      { termino: 'Indistinguibles sin imagen', definicion: 'Principio central: ninguna combinación de síntomas, escala o exploración separa ambos tipos en la calle, y los tratamientos de uno están contraindicados en el otro.' },
      { termino: 'Déficit focal de aparición brusca', definicion: 'Alteración de una función o de un lado concretos instaurada en minutos; es la sospecha que activa la ruta.' },
      { termino: 'Imitador de ictus', definicion: 'Cuadro que produce un déficit parecido con manejo distinto: hipoglucemia, estado posconvulsivo, intoxicación, migraña con aura, infección o traumatismo.' },
      { termino: 'Prenotificación', definicion: 'Aviso anticipado al centro receptor conforme al procedimiento local, que permite preparar la atención antes de la llegada.' },
    ],
    flashcards: [
      { frente: '¿Puede saberse en la calle si un ictus es isquémico o hemorrágico?', reverso: 'No: producen el mismo tipo de déficit y ninguna escala los separa sin imagen. Se transmite «ictus posible», no un tipo.' },
      { frente: '¿Qué significa que el déficit sea «focal»?', reverso: 'Que afecta a una función o a un lado concretos, no a todo el paciente por igual.' },
      { frente: '¿Para qué sirve una escala prehospitalaria de ictus?', reverso: 'Para estandarizar la exploración y activar una ruta; no confirma ni excluye el ictus.' },
      { frente: '¿Cuál es el imitador que más se lamenta cuando se omite?', reverso: 'La hipoglucemia: se descarta midiendo la glucemia en toda sospecha de ictus.' },
      { frente: '¿Por qué no se baja la presión de forma intensiva sin indicación?', reverso: 'Porque la elevación puede ser un mecanismo de mantenimiento del flujo en la zona afectada, y reducirla sin criterio puede ampliar el daño.' },
      { frente: '¿Por qué no se administran antiagregantes ni anticoagulantes en campo sin protocolo?', reverso: 'Porque si el ictus es hemorrágico se agrava, y en la calle no puede saberse de qué tipo es.' },
    ],
    quiz: [
      {
        pregunta: 'Un compañero registra «ictus isquémico» en el informe porque el paciente no tiene cefalea. ¿Qué falla?',
        opciones: [
          'Nada: la ausencia de cefalea lo confirma.',
          'Que ninguna combinación de síntomas separa ambos tipos sin imagen; se transmite «ictus posible» y no un tipo.',
          'Que debió aplicar primero una escala.',
          'Que la cefalea aparece solo en el isquémico.',
        ],
        correcta: 1,
        explicacion: 'Los tratamientos de un tipo están contraindicados en el otro, y por eso la distinción prematura es un error con consecuencias.',
      },
      {
        pregunta: 'Paciente con hemiparesia derecha y diabetes en tratamiento. ¿Qué haces antes de asumir un ictus?',
        opciones: [
          'Aplicar la escala y trasladar directamente.',
          'Medir la glucemia capilar, si hay equipo y el protocolo lo autoriza: la hipoglucemia es el imitador que se descarta más rápido.',
          'Administrar glucosa de forma empírica.',
          'Esperar a que el déficit progrese para confirmarlo.',
        ],
        correcta: 1,
        explicacion: 'Descartar los imitadores no retrasa la ruta: forma parte de ella.',
      },
      {
        pregunta: 'El paciente tiene la presión arterial muy elevada. ¿Qué haces con esa cifra?',
        opciones: [
          'Bajarla de inmediato para proteger el cerebro.',
          'Registrarla y no intentar corregirla salvo indicación del protocolo: la elevación puede mantener el flujo en la zona afectada.',
          'Repetirla hasta que descienda espontáneamente.',
          'Administrar un antihipertensivo por vía oral.',
        ],
        correcta: 1,
        explicacion: 'Bajar la presión de forma intensiva sin indicación es una de las tres conductas que la lección señala como dañinas.',
      },
      {
        pregunta: 'La familia insiste en completar una exploración detallada antes de salir. ¿Qué priorizas?',
        opciones: [
          'Completar toda la exploración en la escena.',
          'Evitar retrasos: la exploración se completa en camino cuando es posible, porque el tiempo perdido es tejido perdido.',
          'Esperar a que llegue un segundo equipo.',
          'Repetir la escala tres veces antes de trasladar.',
        ],
        correcta: 1,
        explicacion: 'Retrasar la salida para una exploración extensa figura entre las conductas que hacen daño.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso: mujer de 71 años. Su hijo habló con ella por teléfono a las 19:00 y estaba normal; a las 21:30 la encontró con la boca torcida y sin poder mover el brazo derecho. Son las 22:10. ¿Qué hora se registra como última vez vista normal?',
          opciones: [
            'Las 21:30, cuando se descubrió el cuadro.',
            'Las 19:00, que es la última referencia concreta de normalidad.',
            'Las 22:10, hora de la atención.',
            'No puede establecerse.',
          ],
          correcta: 1,
          explicacion: 'Se busca una referencia concreta de normalidad —una llamada telefónica sirve— y se registra como hora, no como «hace un rato».',
        },
        {
          pregunta: 'Mismo caso. Aplicas la escala que usa tu servicio y resulta positiva. ¿Qué puedes concluir?',
          opciones: [
            'Que el ictus es isquémico.',
            'Que la sospecha queda estandarizada y activa la ruta; la escala no confirma ni excluye, ni distingue el tipo.',
            'Que puede descartarse una hipoglucemia.',
            'Que el déficit no progresará.',
          ],
          correcta: 1,
          explicacion: 'Las escalas sirven para que profesionales distintos exploren lo mismo y activen una ruta.',
        },
        {
          pregunta: 'Mismo caso, en un sistema local hipotético que envía a los pacientes con déficit dentro de su ventana declarada a un centro con capacidad de tratamiento específico. ¿Qué justifica la decisión del prestador?',
          opciones: [
            'Su criterio personal sobre qué hospital es mejor.',
            'Aplicar el criterio que fija su protocolo usando la hora de última vez vista normal que él mismo estableció, y prenotificar.',
            'Trasladar siempre al hospital más cercano.',
            'Esperar la confirmación por imagen antes de elegir destino.',
          ],
          correcta: 1,
          explicacion: 'El criterio de destino lo fija la organización territorial del servicio; el ejemplo de la lección es ilustrativo y no sustituye al protocolo real.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA/ASA 2026 (isquémico) y AHA/ASA 2022 (hemorragia intracerebral), secciones pendientes; Bibiano 3.ª ed., cap. 79',
      fuentes: [
        'AHA/ASA 2026 Acute Ischemic Stroke Guideline (sección y ventanas pendientes).',
        'AHA/ASA 2022 Guideline for Spontaneous Intracerebral Hemorrhage (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 79, p. 696.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas y las ventanas de tiempo de las '
          + 'guías AHA/ASA, de acceso restringido.',
        'CONTROL: la lección declara expresamente que isquémico y hemorrágico NO se distinguen sin '
          + 'imagen y que se transmite «ictus posible», no un tipo.',
        'No se nombra ninguna escala concreta ni se publica ninguna ventana de tiempo. El ejemplo de '
          + 'sistema local está rotulado como hipotético e ilustrativo.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué escala prehospitalaria de ictus usa su servicio, qué red de '
          + 'centros tiene disponible y qué criterios y ventanas fija su protocolo para el destino?',
      ],
    }),
  },

  // ============================================================
  //  Crisis convulsivas y estado epiléptico
  // ============================================================
  'm4-neu-crisis-convulsivas': {
    icono: 'cp-servier-cerebro',
    duracion: '20 min',
    resumen: 'Cómo se protege a una persona durante una convulsión, cuándo una crisis deja de ser '
      + 'autolimitada y qué causas reversibles conviene buscar siempre.',
    objetivos: [
      'Distinguir crisis convulsiva de epilepsia y describir sus fases.',
      'Aplicar la definición operacional de estado convulsivo.',
      'Ejecutar las medidas de protección durante y después de una crisis.',
      'Buscar las causas agudas que explican una primera crisis.',
    ],
    secciones: [
      {
        titulo: 'Crisis no es lo mismo que epilepsia',
        bloques: [
          { tipo: 'p', texto: 'Una crisis convulsiva es un episodio producido por una actividad eléctrica anormal y excesiva en el encéfalo. Es un síntoma, no una enfermedad: puede ocurrirle a cualquier persona si la causa es suficiente. La epilepsia, en cambio, es la condición crónica de tener crisis recurrentes sin un desencadenante agudo que las explique.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La consecuencia práctica de esa diferencia', texto: 'Ante una primera crisis en una persona sin epilepsia conocida, la pregunta no es qué tipo de epilepsia tiene, sino qué la ha provocado. Muchas de esas causas son agudas, reversibles y detectables en la escena, y buscarlas es la aportación principal del equipo prehospitalario.' },
          {
            tipo: 'tabla',
            titulo: 'Las dos fases que se observan',
            headers: ['Fase', 'Qué ocurre', 'Cuánto dura habitualmente'],
            filas: [
              ['Ictal', 'La crisis en sí: puede haber pérdida de la respuesta, rigidez, sacudidas, mordedura lateral de la lengua y relajación de esfínteres', 'Breve y autolimitada en la mayoría de los casos'],
              ['Posictal', 'Recuperación progresiva: confusión, somnolencia, agitación, cefalea y a veces debilidad transitoria de un lado', 'Variable, de minutos a un tiempo mayor'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No toda confusión posterior es un periodo posictal', texto: 'El estado posictal mejora progresivamente. Si la confusión no mejora, empeora o se acompaña de un déficit que persiste, hay que buscar otra explicación: un traumatismo durante la caída, una hipoglucemia, una intoxicación, una infección o un ictus. Atribuir toda alteración a lo posictal cierra la valoración antes de tiempo.' },
        ],
      },
      {
        titulo: 'Cuándo deja de ser autolimitada',
        bloques: [
          { tipo: 'p', texto: 'La mayoría de las crisis ceden solas en poco tiempo. El problema aparece cuando no ceden o se repiten sin que el paciente recupere la conciencia entre ellas, porque la actividad prolongada daña el tejido nervioso y compromete la ventilación y la circulación.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La definición operacional que se usa en la práctica', texto: 'Se considera estado convulsivo la crisis que se prolonga más allá de cinco minutos, o las crisis que se repiten sin recuperación de la conciencia entre una y otra. El valor de esa definición no es teórico: fija un momento concreto en el que la conducta cambia de observar y proteger a escalar conforme al protocolo. Y por eso lo primero que se hace al presenciar una crisis es mirar la hora.' },
          {
            tipo: 'lista',
            titulo: 'Qué se registra de la crisis',
            items: [
              'Hora de inicio y hora de finalización.',
              'Si fue presenciada o el paciente fue encontrado ya en esa situación.',
              'Qué se observó: rigidez, sacudidas, si afectaron a todo el cuerpo o a una parte.',
              'Si hubo desviación de la mirada hacia un lado.',
              'Si hubo mordedura de lengua o relajación de esfínteres.',
              'Cuánto tardó en empezar a responder y cómo evolucionó después.',
              'Si hubo más de una crisis y si recuperó la conciencia entre ellas.',
            ],
          },
        ],
      },
      {
        titulo: 'Qué se hace durante y después',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Durante la crisis',
            items: [
              'Mirar la hora.',
              'Proteger la cabeza y retirar del entorno los objetos con los que pueda golpearse.',
              'Aflojar la ropa que comprima el cuello, si es posible hacerlo con seguridad.',
              'No sujetar las extremidades ni intentar detener los movimientos.',
              'No introducir nada en la boca.',
              'Cuando los movimientos cesen, colocar al paciente en posición de seguridad conforme al protocolo.',
              'Comprobar vía aérea, ventilación y circulación en cuanto sea posible.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Las dos maniobras que hay que desaprender', texto: 'Introducir un objeto en la boca no evita que el paciente se muerda la lengua —la mordedura ocurre al principio, antes de que nadie llegue— y sí produce lesiones dentales, de la vía aérea y del propio reanimador. Sujetar las extremidades no acorta la crisis y produce lesiones musculares y articulares. Ninguna de las dos se hace.' },
          {
            tipo: 'pasos',
            titulo: 'Después de la crisis',
            items: [
              'Vía aérea y ventilación: es donde más se compromete el paciente en el periodo posterior.',
              'Glucemia capilar si hay equipo y el protocolo lo autoriza.',
              'Temperatura, sobre todo si hay fiebre o el ambiente es extremo.',
              'Exploración buscando lesiones producidas durante la crisis, incluida la columna cervical si hubo caída.',
              'Examen neurológico dirigido y reevaluación seriada, comprobando que la recuperación progresa.',
              'Historia: crisis previas, tratamiento antiepiléptico y adherencia, consumo de alcohol o sustancias, embarazo, traumatismo, infección.',
              'Traslado y prealerta conforme al protocolo, con el registro completo de la crisis.',
            ],
          },
        ],
      },
      {
        titulo: 'Causas agudas y límites del alcance',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué buscar, sobre todo ante una primera crisis',
            items: [
              'Hipoglucemia.',
              'Falta de oxígeno.',
              'Alteraciones de electrolitos, en particular del sodio.',
              'Intoxicación por sustancias o por fármacos, y también su retirada brusca.',
              'Abstinencia de alcohol o de sedantes.',
              'Traumatismo craneal reciente.',
              'Infección del sistema nervioso, con fiebre y rigidez de nuca.',
              'Embarazo o puerperio: una convulsión en ese contexto obliga a considerar eclampsia y aplicar la ruta obstétrica.',
              'Abandono del tratamiento antiepiléptico en un paciente con epilepsia conocida.',
            ],
          },
          BLOQUE_CIFRAS,
          { tipo: 'callout', variante: 'alerta', titulo: 'La medicación anticonvulsiva depende por completo del protocolo', texto: 'El principio que sí puede enseñarse es que en un estado convulsivo el tratamiento temprano importa. Pero qué fármaco, a qué dosis, por qué vía y quién está autorizado a administrarlo dependen de la guía farmacológica vigente, de la Información para Prescribir del producto registrado, del formulario del servicio y de su dirección médica. Esta lección no publica ninguno de esos datos, y su ausencia no significa que el tratamiento no exista: significa que la decisión no se toma con una lección.' },
          { tipo: 'p', texto: 'Conviene además no asumir epilepsia ante una primera crisis. Ese diagnóstico exige un estudio que no se hace en urgencias ni en la calle, y etiquetar al paciente prematuramente puede desviar la búsqueda de la causa aguda que sí explica el episodio.' },
        ],
      },
      F([AES_STATUS_2016, WHO_MHGAP_2023, bibiano(82, 'Crisis comiciales. Estatus epiléptico', 722), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Crisis convulsiva', definicion: 'Episodio producido por actividad eléctrica anormal y excesiva en el encéfalo; es un síntoma y puede ocurrirle a cualquier persona si la causa es suficiente.' },
      { termino: 'Epilepsia', definicion: 'Condición crónica de crisis recurrentes sin un desencadenante agudo que las explique; no se diagnostica ante una primera crisis.' },
      { termino: 'Fase posictal', definicion: 'Periodo de recuperación progresiva tras la crisis; si no mejora o empeora, hay que buscar otra explicación.' },
      { termino: 'Estado convulsivo', definicion: 'Crisis que se prolonga más allá de cinco minutos, o crisis repetidas sin recuperación de la conciencia entre ellas.' },
      { termino: 'Mirar la hora', definicion: 'Primera acción al presenciar una crisis, porque la definición operacional depende del tiempo transcurrido.' },
      { termino: 'Causa aguda', definicion: 'Condición reversible que explica una crisis: hipoglucemia, hipoxia, electrolitos, tóxicos, abstinencia, traumatismo, infección o eclampsia.' },
    ],
    flashcards: [
      { frente: 'Crisis convulsiva frente a epilepsia', reverso: 'La crisis es un síntoma que puede ocurrirle a cualquiera; la epilepsia es la condición crónica de crisis recurrentes sin desencadenante agudo.' },
      { frente: '¿Cuál es la definición operacional de estado convulsivo?', reverso: 'Crisis de más de cinco minutos, o crisis repetidas sin recuperación de la conciencia entre ellas.' },
      { frente: '¿Qué es lo primero que se hace al presenciar una crisis?', reverso: 'Mirar la hora, porque la definición operacional y la decisión de escalar dependen del tiempo.' },
      { frente: '¿Por qué no se introduce nada en la boca?', reverso: 'Porque la mordedura ocurre al principio, antes de que nadie llegue, y el objeto produce lesiones dentales, de la vía aérea y del reanimador.' },
      { frente: '¿Qué significa una confusión que no mejora tras una crisis?', reverso: 'Que no debe atribuirse sin más a lo posictal: hay que buscar traumatismo, hipoglucemia, intoxicación, infección o ictus.' },
      { frente: '¿Qué obliga a considerar una convulsión en el embarazo o puerperio?', reverso: 'Eclampsia: se aplica la ruta obstétrica.' },
    ],
    quiz: [
      {
        pregunta: 'Presencias una crisis que lleva seis minutos sin ceder. ¿Cómo la categorizas?',
        opciones: [
          'Como una crisis autolimitada que cederá sola.',
          'Como un estado convulsivo, según la definición operacional de más de cinco minutos, y se escala conforme al protocolo.',
          'Como un periodo posictal prolongado.',
          'Como epilepsia de nuevo diagnóstico.',
        ],
        correcta: 1,
        explicacion: 'Esa definición fija el momento concreto en que la conducta cambia de observar y proteger a escalar.',
      },
      {
        pregunta: 'Un familiar intenta meter una cuchara en la boca del paciente durante la crisis. ¿Qué haces?',
        opciones: [
          'Ayudarle a colocarla correctamente.',
          'Impedirlo: la mordedura ocurre al principio y el objeto produce lesiones dentales, de la vía aérea y del reanimador.',
          'Sustituirla por una cánula orofaríngea durante las sacudidas.',
          'Sujetar además las extremidades para que no se lesione.',
        ],
        correcta: 1,
        explicacion: 'Introducir objetos en la boca y sujetar las extremidades son las dos maniobras que hay que desaprender.',
      },
      {
        pregunta: 'Treinta minutos después de la crisis el paciente sigue confuso y con debilidad del lado derecho que no mejora. ¿Qué haces?',
        opciones: [
          'Atribuirlo al periodo posictal y esperar.',
          'Buscar otra explicación: traumatismo durante la caída, hipoglucemia, intoxicación, infección o ictus.',
          'Repetir la glucemia y nada más.',
          'Considerar que se trata de una segunda crisis en curso.',
        ],
        correcta: 1,
        explicacion: 'El estado posictal mejora progresivamente; si no mejora o persiste un déficit, hay que buscar otra causa.',
      },
      {
        pregunta: 'Primera crisis en una mujer de 32 semanas de gestación. ¿Qué obliga a considerar?',
        opciones: [
          'Una epilepsia de inicio tardío.',
          'Eclampsia: una convulsión en el embarazo o puerperio obliga a aplicar la ruta obstétrica.',
          'Una intoxicación por sustancias.',
          'Una infección del sistema nervioso exclusivamente.',
        ],
        correcta: 1,
        explicacion: 'Figura expresamente entre las causas agudas que deben buscarse ante una primera crisis.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la respuesta segura desde el inicio de una convulsión presenciada',
        pasos: [
          'Mirar la hora',
          'Proteger la cabeza y retirar objetos peligrosos del entorno',
          'Aflojar la ropa que comprima el cuello si es seguro hacerlo',
          'No sujetar las extremidades ni introducir nada en la boca',
          'Al cesar los movimientos, colocar en posición de seguridad según el protocolo',
          'Comprobar vía aérea, ventilación y circulación',
          'Medir la glucemia si hay equipo y el protocolo lo autoriza',
          'Si la crisis supera los cinco minutos o se repite sin recuperación, escalar conforme al protocolo',
        ],
      },
    },
    revision: ficha({
      version: 'AES 2016 (definición operacional) y WHO mhGAP 2023, secciones pendientes; Bibiano 3.ª ed., cap. 82',
      fuentes: [
        'American Epilepsy Society. Treatment of Convulsive Status Epilepticus, 2016 (sección pendiente).',
        'WHO mhGAP Guideline, 3.ª ed., 2023 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 82, p. 722.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de AES 2016 y de mhGAP 2023. La '
          + 'definición operacional de cinco minutos se enseña como umbral de conducta, no como dosis '
          + 'ni como criterio diagnóstico.',
        'CONFORME A LA CONDICIÓN REGISTRADA de AES 2016: se usa para la definición y el principio de '
          + 'tratamiento temprano; dosis y vías se declaran dependientes de la guía farmacológica '
          + 'vigente y del protocolo local, y no se publican.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué fármaco, presentación y vía autoriza su protocolo para el '
          + 'estado convulsivo, y qué competencia exige?',
      ],
    }),
  },

  // ============================================================
  //  Síncope
  // ============================================================
  'm4-neu-sincope': {
    icono: 'cp-servier-cerebro',
    duracion: '18 min',
    resumen: 'Qué es exactamente un síncope, cómo se diferencia de otras pérdidas de conciencia y qué '
      + 'datos separan al paciente que puede esperar del que no.',
    objetivos: [
      'Definir el síncope por su mecanismo y sus cuatro rasgos.',
      'Diferenciarlo de la crisis convulsiva, la hipoglucemia y la intoxicación.',
      'Recoger la información del testigo, que suele ser decisiva.',
      'Reconocer las banderas rojas de síncope de origen cardiaco.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué no es',
        bloques: [
          { tipo: 'p', texto: 'El síncope es una pérdida transitoria de la conciencia debida a una reducción breve del flujo de sangre al encéfalo. Esa definición contiene cuatro rasgos que deben cumplirse a la vez, y comprobarlos evita llamar síncope a cualquier caída.' },
          {
            tipo: 'lista',
            titulo: 'Los cuatro rasgos',
            items: [
              'La pérdida de conciencia es completa.',
              'Es de comienzo relativamente rápido.',
              'Es de duración breve.',
              'La recuperación es espontánea y completa, sin necesidad de intervención.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No toda pérdida de conciencia es un síncope', texto: 'Si el paciente no recuperó por completo, si la recuperación fue lenta o si necesitó una intervención para recuperarse, el mecanismo no fue una reducción breve del flujo cerebral y hay que buscar otra explicación. Llamar síncope a todo lo que implica caerse es la vía más rápida para pasar por alto un cuadro grave.' },
          {
            tipo: 'tabla',
            titulo: 'Qué lo diferencia de otros cuadros',
            headers: ['Cuadro', 'Qué lo distingue del síncope'],
            filas: [
              ['Crisis convulsiva', 'Movimientos que preceden a la caída, mordedura lateral de lengua, y sobre todo un periodo posictal de confusión que tarda en resolverse'],
              ['Hipoglucemia', 'La recuperación no es espontánea: mejora al corregir la glucosa'],
              ['Intoxicación', 'El deterioro no es breve ni la recuperación completa e inmediata'],
              ['Caída sin pérdida de conciencia', 'El paciente recuerda todo el episodio y no hubo pérdida real'],
              ['Traumatismo craneal', 'La pérdida de conciencia siguió al golpe, no lo precedió'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta que ordena la diferencia', texto: '«¿Se cayó porque perdió el conocimiento, o perdió el conocimiento porque se cayó?». Es la distinción que separa un síncope con caída secundaria de un traumatismo craneal con pérdida de conciencia posterior, y cambia por completo la orientación del cuadro.' },
        ],
      },
      {
        titulo: 'El testigo vale más que la exploración',
        bloques: [
          { tipo: 'p', texto: 'Cuando el equipo llega, el paciente suele estar recuperado y su exploración puede ser normal. Toda la información útil está en lo que ocurrió antes, y buena parte solo la tiene quien lo presenció.' },
          {
            tipo: 'lista',
            titulo: 'Qué preguntar al paciente y al testigo',
            items: [
              'Qué estaba haciendo justo antes: de pie mucho tiempo, al levantarse, durante un esfuerzo, tras un dolor o una emoción intensa, al orinar o al toser.',
              'Si notó algo antes de perder el conocimiento: mareo, visión borrosa o en túnel, sudoración, náusea, calor, palpitaciones o dolor torácico.',
              'Cuánto tiempo estuvo inconsciente, según el testigo.',
              'Si hubo movimientos y, en tal caso, si empezaron antes o después de caer.',
              'Cómo recuperó: de golpe y orientado, o lentamente y confuso.',
              'Si se lesionó al caer y si no hizo nada por protegerse.',
              'Antecedentes cardiacos, muerte súbita en la familia, tratamiento habitual y cambios recientes.',
              'En mujer en edad fértil, posibilidad de embarazo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos detalles que orientan mucho', texto: 'El primero: un pródromo largo y típico —calor, sudoración, visión en túnel, náusea— apunta a un mecanismo reflejo y de mejor pronóstico. El segundo: la ausencia total de pródromo, sobre todo si el paciente cayó sin protegerse y se lesionó la cara, apunta en la dirección contraria y obliga a considerar un origen cardiaco.' },
        ],
      },
      {
        titulo: 'Banderas rojas',
        bloques: [
          { tipo: 'p', texto: 'La mayoría de los síncopes son de mecanismo reflejo y no comprometen la vida. La tarea prehospitalaria consiste en identificar al grupo que sí puede estar en riesgo, sobre todo por un origen cardiaco.' },
          {
            tipo: 'lista',
            titulo: 'Datos que elevan el riesgo',
            items: [
              'Síncope durante el esfuerzo o inmediatamente después.',
              'Síncope estando acostado o sentado.',
              'Ausencia de pródromo, con caída sin protegerse.',
              'Palpitaciones o dolor torácico previos al episodio.',
              'Antecedente de enfermedad cardiaca conocida.',
              'Antecedente familiar de muerte súbita en edad temprana.',
              'Signos de sangrado: palidez, taquicardia, hipotensión, sangre en las heces o en el vómito.',
              'Cefalea intensa o déficit neurológico asociados.',
              'Edad avanzada con episodio nuevo.',
              'Embarazo, que obliga a considerar causas obstétricas.',
              'Persistencia de hipotensión o de mala perfusión al llegar el equipo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Estar asintomático ahora no descarta nada', texto: 'Es el error más frecuente de este tema. Un paciente recuperado, hablando con normalidad y con exploración normal puede haber tenido un síncope de origen cardiaco. Lo que decide el riesgo no es cómo está ahora, sino cómo ocurrió y qué antecedentes tiene.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria y de los signos vitales, con atención a la perfusión.',
              'Glucemia capilar si hay equipo y el protocolo lo autoriza.',
              'Historia completa del episodio, con el testigo, y registro de quién la aporta.',
              'Registro eléctrico conforme al protocolo del servicio: es la exploración que más puede aportar en un paciente ya recuperado.',
              'Exploración buscando lesiones producidas por la caída, incluida la cabeza y la columna cervical.',
              'Buscar signos de sangrado: es una causa de síncope que puede pasar inadvertida.',
              'Traslado con la prioridad que marquen las banderas rojas, y reevaluación seriada.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre provocar el ortostatismo', texto: 'Poner de pie a un paciente para comprobar si se marea puede ser útil en una consulta y peligroso en la calle: un paciente que acaba de perder el conocimiento puede volver a hacerlo y lesionarse. Si el protocolo del servicio contempla esa comprobación, establecerá también en qué condiciones y con qué seguridad. Esta lección no la indica.' },
        ],
      },
      F([AHA_SINCOPE_2017, bibiano(12, 'Síncope', 128), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Síncope', definicion: 'Pérdida transitoria de conciencia por reducción breve del flujo cerebral, completa, de comienzo rápido, breve y con recuperación espontánea y completa.' },
      { termino: 'Pródromo', definicion: 'Síntomas previos —mareo, visión en túnel, sudoración, náusea, calor—; su presencia típica apunta a mecanismo reflejo y su ausencia eleva la sospecha de origen cardiaco.' },
      { termino: 'Síncope de esfuerzo', definicion: 'El que ocurre durante o inmediatamente después del esfuerzo; es una de las banderas rojas de origen cardiaco.' },
      { termino: 'Caída sin protegerse', definicion: 'Patrón que sugiere pérdida de conciencia sin aviso, con lesiones faciales frecuentes; eleva el riesgo.' },
      { termino: 'Valor del testigo', definicion: 'Información sobre duración, movimientos y forma de recuperación que el paciente no puede aportar y que suele decidir la orientación.' },
    ],
    flashcards: [
      { frente: '¿Cuáles son los cuatro rasgos del síncope?', reverso: 'Pérdida completa de conciencia, comienzo rápido, duración breve y recuperación espontánea y completa.' },
      { frente: '¿Qué distingue una crisis convulsiva de un síncope?', reverso: 'Los movimientos preceden a la caída y existe un periodo posictal de confusión que tarda en resolverse.' },
      { frente: '¿Cuál es la pregunta que ordena la diferencia con un traumatismo craneal?', reverso: '¿Se cayó porque perdió el conocimiento, o perdió el conocimiento porque se cayó?' },
      { frente: '¿Qué sugiere un pródromo largo y típico?', reverso: 'Un mecanismo reflejo y de mejor pronóstico.' },
      { frente: '¿Qué sugiere la ausencia de pródromo con caída sin protegerse?', reverso: 'Un posible origen cardiaco; es una de las banderas rojas.' },
      { frente: '¿Descarta el riesgo que el paciente esté ya asintomático?', reverso: 'No: lo que decide el riesgo es cómo ocurrió el episodio y qué antecedentes tiene, no cómo está ahora.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente que perdió el conocimiento durante una carrera, sin aviso previo, y se golpeó la cara al caer. Ahora está recuperado y su exploración es normal. ¿Cómo lo valoras?',
        opciones: [
          'Riesgo bajo, porque está asintomático.',
          'Riesgo elevado: síncope de esfuerzo, sin pródromo y con caída sin protegerse son banderas rojas de posible origen cardiaco.',
          'Se trata con seguridad de un síncope reflejo.',
          'Debe considerarse una crisis convulsiva.',
        ],
        correcta: 1,
        explicacion: 'Lo que decide el riesgo no es cómo está ahora sino cómo ocurrió el episodio y qué antecedentes tiene.',
      },
      {
        pregunta: 'El paciente refiere haber perdido el conocimiento, pero tardó veinte minutos en orientarse y sigue confuso. ¿Se ajusta a la definición de síncope?',
        opciones: [
          'Sí, cumple los cuatro rasgos.',
          'No: la recuperación no fue espontánea, rápida ni completa, de modo que hay que buscar otra explicación.',
          'Sí, si hubo pródromo.',
          'Sí, siempre que no se haya lesionado.',
        ],
        correcta: 1,
        explicacion: 'Si la recuperación fue lenta o incompleta, el mecanismo no fue una reducción breve del flujo cerebral.',
      },
      {
        pregunta: '¿Por qué el testigo es tan importante en este cuadro?',
        opciones: [
          'Porque puede llevar al paciente al hospital.',
          'Porque el paciente suele estar recuperado y con exploración normal, y solo el testigo conoce la duración, los movimientos y la forma de recuperación.',
          'Porque sustituye al registro eléctrico.',
          'Porque permite descartar hipoglucemia.',
        ],
        correcta: 1,
        explicacion: 'Toda la información útil está en lo que ocurrió antes, y buena parte solo la tiene quien lo presenció.',
      },
      {
        pregunta: 'Un compañero quiere poner de pie al paciente para comprobar si se marea. ¿Qué respondes?',
        opciones: [
          'Que es la maniobra indicada en todos los casos.',
          'Que puede ser peligrosa en la calle: un paciente que acaba de perder el conocimiento puede repetirlo y lesionarse; si el protocolo la contempla, fijará sus condiciones.',
          'Que debe hacerse solo si hubo pródromo.',
          'Que sustituye al registro eléctrico.',
        ],
        correcta: 1,
        explicacion: 'La lección no indica esa comprobación y remite sus condiciones al protocolo del servicio.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso A: mujer de 22 años que llevaba media hora de pie al sol, notó calor, náusea y visión en túnel, se desvaneció durante unos segundos y despertó orientada. ¿Qué mecanismo sugiere?',
          opciones: [
            'Origen cardiaco de alto riesgo.',
            'Mecanismo reflejo probable: pródromo largo y típico con recuperación rápida y completa.',
            'Crisis convulsiva.',
            'Hipoglucemia.',
          ],
          correcta: 1,
          explicacion: 'Un pródromo largo y típico —calor, sudoración, visión en túnel, náusea— apunta a mecanismo reflejo y de mejor pronóstico.',
        },
        {
          pregunta: 'Caso B: varón de 66 años con antecedente de infarto que perdió el conocimiento sentado, sin aviso, tras notar palpitaciones. ¿Qué categoría le corresponde?',
          opciones: [
            'Síncope reflejo de bajo riesgo.',
            'Síncope de posible origen cardiaco: episodio sentado, sin pródromo, con palpitaciones previas y cardiopatía conocida.',
            'Caída sin pérdida de conciencia.',
            'Traumatismo craneal primario.',
          ],
          correcta: 1,
          explicacion: 'Síncope estando sentado, ausencia de pródromo, palpitaciones previas y enfermedad cardiaca conocida figuran entre las banderas rojas.',
        },
        {
          pregunta: 'Caso C: varón de 40 años que, según su esposa, primero tuvo sacudidas de todo el cuerpo y después cayó; tardó diez minutos en responder con normalidad y se mordió el borde de la lengua. ¿Qué es?',
          opciones: [
            'Un síncope con movimientos secundarios.',
            'Una crisis convulsiva: los movimientos precedieron a la caída, hubo mordedura lateral de la lengua y un periodo posictal que tardó en resolverse.',
            'Una intoxicación.',
            'Una caída sin pérdida de conciencia.',
          ],
          correcta: 1,
          explicacion: 'Son exactamente los rasgos que la lección enumera para distinguir la crisis convulsiva del síncope.',
        },
      ],
    },
    revision: ficha({
      version: 'ACC/AHA/HRS 2017 (estratificación pendiente); Bibiano 3.ª ed., cap. 12',
      fuentes: [
        '2017 ACC/AHA/HRS Guideline for Syncope (sección de estratificación pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 12, p. 128.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de estratificación de riesgo de la guía '
          + 'ACC/AHA/HRS 2017.',
        'No se publica ninguna escala de riesgo ni criterio numérico: la lección enseña las banderas '
          + 'rojas descritas, que es lo sustentable sin la guía delante.',
        'La comprobación de hipotensión ortostática provocada NO se indica y se remite al protocolo por '
          + 'seguridad del paciente.',
      ],
    }),
  },
}
