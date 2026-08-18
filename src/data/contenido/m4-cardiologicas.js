// ============================================================
//  Módulo 4 · Urgencias cardiológicas
// ------------------------------------------------------------
//  Unidad completa (3 semanas, 15 horas), en el orden del PDF: exploración
//  cardiaca, electrocardiografía básica, síndrome coronario agudo, paro
//  cardiorrespiratorio y RCP avanzada, bradiarritmias y taquiarritmias,
//  insuficiencia cardiaca e hipertensión arterial.
//
//  Pauta temática: `docs/GUIA-REDACCION-M4-RESTANTE.md`. Fuentes primarias
//  asignadas por `docs/REGISTRO-FUENTES-ACADEMICAS.json` para
//  `m4-urgencias-cardiologicas`: AHA BLS/ALS 2025, ACS 2025, HF 2022 y HBP
//  2025; ACLS 2020 solo como correspondencia histórica; AMLS, Bibiano y
//  Zubirán como apoyo; requiere protocolo local.
//
//  QUÉ NO HAY EN ESTE ARCHIVO, Y POR QUÉ
//
//  Ni una dosis, ni una energía de desfibrilación, ni un objetivo numérico de
//  presión o de saturación. Las guías primarias son de acceso restringido y no
//  se abrió su texto: publicar una cifra recordada equivale a inventarla.
//  Además, la energía depende del manual del desfibrilador real y las dosis
//  del formulario del servicio, que la academia todavía no ha entregado. Cada
//  ficha declara la deuda concreta.
//
//  Bibiano 3.ª ed. se cita como APOYO HOSPITALARIO con capítulo y página
//  impresa verificados el 17 de agosto de 2026: sostiene definición,
//  fisiopatología y presentación, nunca conducta prehospitalaria ni dosis.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const AHA_ACS_2025 = {
  nombre: '2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute '
    + 'Coronary Syndromes.',
  url: 'https://professional.heart.org/en/guidelines-statements/2025-accahaacepnaemspscai-guideline-for-the-management-of-patients-with-acutecir0000000000001309',
  nota: 'Guía rectora del SÍNDROME CORONARIO AGUDO, elaborada con participación de NAEMSP y ACEP, lo '
    + 'que la hace directamente pertinente al ámbito prehospitalario. PENDIENTE: sección y tabla '
    + 'exactas; no se consultó el texto completo al redactar y no sostiene ninguna cifra.',
}
const AHA_ALS_2025 = {
  nombre: 'AHA 2025 Adult Advanced Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support',
  nota: 'Guía rectora del paro cardiorrespiratorio y de las arritmias del adulto. PENDIENTE: sección '
    + 'y algoritmo exactos; no se consultó el texto completo al redactar.',
}
const AHA_BLS_2025 = {
  nombre: 'AHA 2025 Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Guía rectora del reconocimiento del paro y de la reanimación básica. PENDIENTE: sección '
    + 'exacta; no se consultó el texto completo al redactar.',
}
const AHA_HF_2022 = {
  nombre: '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure.',
  url: 'https://professional.heart.org/en/guidelines-statements/2022-ahaacchfsa-guideline-for-the-management-of-heart-failure-a-report-of-thecir0000000000001063',
  nota: 'Guía rectora de la INSUFICIENCIA CARDIACA. PENDIENTE: sección sobre insuficiencia cardiaca '
    + 'aguda descompensada; no se consultó el texto completo al redactar.',
}
const AHA_HBP_2025 = {
  nombre: '2025 AHA/ACC Multisociety Guideline for the Prevention, Detection, Evaluation and '
    + 'Management of High Blood Pressure in Adults.',
  url: 'https://professional.heart.org/en/guidelines-statements/2025-ahaaccaanpaapaabcaccpacpmagsamaaspcnmapcnasgim-guideline-for-thehyp0000000000000249',
  nota: 'Guía rectora de la HIPERTENSIÓN ARTERIAL. Su condición registrada obliga a distinguir '
    + 'hipertensión crónica de presión severamente elevada con daño agudo de órgano diana y prohíbe '
    + 'enseñar descenso prehospitalario indiscriminado. PENDIENTE: tabla de categorías y cifras.',
}
const ACLS_2020 = {
  nombre: 'AHA. Manual ACLS 2020.',
  nota: 'CORRESPONDENCIA HISTÓRICA del plan de estudios, no autoridad vigente. Toda recomendación '
    + 'sustituida se actualiza con AHA 2025. No sostiene ninguna afirmación de esta unidad.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Apoyo curricular asignado por el registro. Capítulo y página PENDIENTES: solo puede '
    + 'precisarlos quien consulte la copia licenciada de la academia. No sostiene ninguna afirmación.',
}
const COFEPRIS_IPP = {
  nombre: 'COFEPRIS. Guía para estructurar y redactar la Información para Prescribir e instructivo, '
    + 'y registro sanitario de medicamentos. Consultada el 16 de agosto de 2026.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de composición, concentración, indicaciones aprobadas, vías y '
    + 'contraindicaciones de cada producto registrado que lleve la unidad.',
}

// Apoyo secundario HOSPITALARIO con página impresa verificada el 17 de agosto
// de 2026 sobre la copia de la biblioteca de la academia.
const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ninguna dosis, concentración, energía de desfibrilación ni '
  + 'objetivo numérico de presión o saturación. Las guías primarias son de acceso restringido y no se '
  + 'consultó su texto al redactar; además, la energía depende del manual del desfibrilador real y '
  + 'las dosis del formulario del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocimiento sindrómico, gravedad, estabilización, '
  + 'reevaluación, comunicación y destino. No se trasladan al campo pruebas ni tratamientos '
  + 'hospitalarios y la impresión de campo no se presenta como diagnóstico.'
const CONDICIONES = 'Toda intervención farmacológica o avanzada queda condicionada a seis requisitos '
  + 'simultáneos: guía vigente de la indicación, población, contraindicaciones, Información para '
  + 'Prescribir del producto registrado, equipo disponible y competencia autorizada por el protocolo '
  + 'y la dirección médica del servicio.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás una dosis, una energía ni un objetivo de presión. Una cifra clínica '
    + 'solo se publica cuando constan su población, su indicación, su vía, la edición de la guía que '
    + 'la sostiene y el protocolo que la autoriza. Mientras la guía asignada no se haya consultado en '
    + 'su texto y el servicio no entregue su formulario y el manual de su equipo, la cifra se pide al '
    + 'protocolo y no se memoriza de una lección. Lo que sí se enseña —y es lo que decide la conducta '
    + 'en la calle— es reconocer la gravedad, sostener al paciente, reevaluar y elegir el destino.',
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
  //  Exploración cardiaca
  // ============================================================
  'm4-card-exploracion': {
    icono: '🫀',
    duracion: '20 min',
    resumen: 'Cómo se explora a un paciente con motivo cardiovascular en la calle, conectando síntomas, '
      + 'perfusión y hallazgos cardiopulmonares sin pretender confirmar una causa.',
    objetivos: [
      'Estructurar la historia de un motivo cardiovascular con un esquema reproducible.',
      'Valorar la perfusión con datos observables antes que con cifras aisladas.',
      'Interpretar los hallazgos cardiopulmonares como conjunto y no como signos diagnósticos.',
      'Construir un informe de traslado que transmita la trayectoria del paciente.',
    ],
    secciones: [
      {
        titulo: 'El motivo y su cronología',
        bloques: [
          { tipo: 'p', texto: 'Los motivos cardiovasculares que llegan a una ambulancia son pocos y se repiten: dolor o presión torácica, disnea, palpitaciones, síncope o presíncope, fatiga de aparición reciente y edema. Ninguno pertenece en exclusiva al corazón, y por eso la exploración cardiaca empieza por acotar el síntoma antes de buscar signos.' },
          {
            tipo: 'lista',
            titulo: 'OPQRST aplicado al síntoma cardiovascular',
            items: [
              'Origen y momento de inicio: qué hacía el paciente y desde cuándo le ocurre.',
              'Provocación y alivio: qué lo empeora, qué lo mejora, si cambia con el esfuerzo o con la posición.',
              'Cualidad: presión, opresión, ardor, pinchazo; con qué lo compara el paciente.',
              'Radiación: hacia dónde se propaga, si es que lo hace.',
              'Severidad: intensidad y, sobre todo, cómo ha cambiado desde que empezó.',
              'Tiempo: continuo o intermitente, y si ya le había ocurrido antes.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Antecedentes que cambian la interpretación',
            items: [
              'Episodios cardiacos previos, procedimientos y dispositivos implantados.',
              'Tratamiento habitual y adherencia reciente, incluido si dejó de tomarlo.',
              'Factores de riesgo cardiovascular conocidos.',
              'Enfermedad renal, diabetes o enfermedad pulmonar crónica coexistentes.',
              'Consumo de sustancias, que puede explicar palpitaciones o dolor torácico.',
              'Embarazo, que modifica tanto el cuadro como las opciones de manejo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La cronología es el dato que no se recupera después', texto: 'El hospital podrá repetir la exploración y añadir estudios, pero no podrá reconstruir a qué hora empezó el síntoma ni cómo evolucionó camino del hospital. Esa información solo la tiene el equipo que atendió primero, y es la que más pesa en las decisiones tiempo-dependientes.' },
        ],
      },
      {
        titulo: 'La perfusión, antes que las cifras',
        bloques: [
          { tipo: 'p', texto: 'Un corazón cumple su función si logra que la sangre llegue a los tejidos. Por eso la primera pregunta de una exploración cardiaca no es cuánto marca el monitor, sino si este paciente está perfundiendo.' },
          {
            tipo: 'tabla',
            titulo: 'Qué se valora y qué informa',
            headers: ['Qué se valora', 'Qué informa'],
            filas: [
              ['Estado mental', 'Es un órgano diana: la confusión o la somnolencia nuevas pueden ser la primera manifestación de hipoperfusión'],
              ['Piel', 'Color, temperatura y humedad; la piel pálida, fría y húmeda traduce vasoconstricción compensadora'],
              ['Pulsos centrales y periféricos', 'Presencia, frecuencia, regularidad y amplitud; la comparación entre ambos añade información'],
              ['Llenado capilar', 'Dato complementario, condicionado por la temperatura ambiental'],
              ['Presión arterial', 'Útil sobre todo por su tendencia durante la atención, no por un valor aislado'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Una presión conservada no significa un paciente estable', texto: 'Los mecanismos de compensación mantienen la presión mientras pueden, y el descenso aparece tarde. Un paciente frío, pálido, con el sensorio alterado y presión todavía dentro de lo habitual está mal perfundido, y llamarlo estable retrasa lo que necesita.' },
          { tipo: 'p', texto: 'La comparación de la presión entre ambos brazos se realiza cuando el cuadro lo justifica y el protocolo lo indica, no de forma rutinaria. Su utilidad depende por completo del contexto en que se busque.' },
        ],
      },
      {
        titulo: 'La exploración cardiopulmonar como conjunto',
        bloques: [
          { tipo: 'p', texto: 'Corazón y pulmón se exploran juntos porque sus problemas se manifiestan cruzados: un fallo de bomba se presenta como dificultad respiratoria y un problema pulmonar altera la frecuencia y el ritmo cardiacos.' },
          {
            tipo: 'lista',
            titulo: 'Qué se recoge',
            items: [
              'Frecuencia cardiaca y regularidad del pulso, palpadas y no solo leídas en el monitor.',
              'Trabajo respiratorio: postura, longitud de las frases, uso de músculos accesorios.',
              'Ruidos respiratorios comparando ambos hemitórax, buscando en particular crepitantes.',
              'Ingurgitación yugular, valorada con el paciente semiincorporado cuando sea posible.',
              'Edema periférico: localización, simetría y si es nuevo o habitual en ese paciente.',
              'Peso o perímetro referidos por el paciente cuando conoce su evolución reciente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ningún signo aislado confirma nada', texto: 'La ingurgitación yugular no confirma taponamiento, el edema no confirma insuficiencia cardiaca y unos crepitantes no confirman origen cardiogénico. Lo que orienta es el conjunto —perfusión, congestión, ritmo y síntoma— y aun así se construye una impresión de campo, no un diagnóstico. Confirmar exige estudios que no viajan en la ambulancia.' },
        ],
      },
      {
        titulo: 'Monitorización y sus límites',
        bloques: [
          { tipo: 'p', texto: 'La monitorización se elige según el cuadro y el equipo disponible en la unidad, no se aplica en bloque por costumbre. Cada dispositivo responde a una pregunta distinta y ninguno responde por sí solo si el paciente está bien.' },
          {
            tipo: 'tabla',
            titulo: 'Qué responde cada dispositivo y qué no',
            headers: ['Dispositivo', 'Qué responde', 'Qué NO responde'],
            filas: [
              ['Monitor de ritmo', 'Qué actividad eléctrica hay', 'Si esa actividad produce contracción y pulso'],
              ['ECG de 12 derivaciones', 'Registro más completo en un instante concreto', 'La evolución: un trazo normal no excluye lo que puede aparecer después'],
              ['Oximetría de pulso', 'Saturación estimada de la hemoglobina', 'La ventilación, ni la calidad de la perfusión en un paciente frío'],
              ['Glucemia capilar', 'Una causa frecuente y reversible de alteración del estado mental', 'El resto de causas, que se siguen buscando'],
              ['Capnografía', 'Información sobre ventilación y perfusión cuando el equipo existe', 'Un diagnóstico; se interpreta con el cuadro'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El monitor eléctrico no demuestra perfusión', texto: 'Es el principio que ordena toda la unidad: la actividad eléctrica y la contracción mecánica son cosas distintas. Un trazo organizado en la pantalla no garantiza que haya pulso, y la comprobación de pulso se hace sobre el paciente. Un monitor informa; no sustituye a la exploración.' },
        ],
      },
      {
        titulo: 'Reevaluación y comunicación',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'lista',
            titulo: 'Qué debe contener el informe de traslado',
            items: [
              'Edad, motivo y hora de inicio del síntoma.',
              'Cómo estaba al llegar y cómo está ahora: la dirección del cambio.',
              'Estado de perfusión descrito con hallazgos, no etiquetado.',
              'Hallazgos cardiopulmonares relevantes, incluidos los negativos que importan.',
              'Qué se aplicó, a qué hora y con qué respuesta.',
              'Antecedentes, tratamiento habitual y adherencia reciente.',
              'Trazos obtenidos y si se transmitieron, conforme al protocolo.',
              'Tiempo estimado de llegada y necesidad prevista al ingreso.',
            ],
          },
          { tipo: 'p', texto: 'La cadencia de reevaluación en un paciente inestable la fija el protocolo del servicio. El principio que no cambia es que toda intervención se comprueba: una acción sin verificación de su efecto no está terminada, y el registro con hora es lo que permite demostrar un cambio.' },
        ],
      },
      F([AHA_ACS_2025, AHA_HF_2022, AHA_ALS_2025, bibiano(35, 'Síndrome coronario agudo', 320), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Impresión de campo', definicion: 'Hipótesis sindrómica construida con lo observable en la escena; orienta el soporte y el destino y no equivale a un diagnóstico.' },
      { termino: 'Perfusión', definicion: 'Llegada efectiva de sangre a los tejidos; se valora por estado mental, piel, pulsos y llenado capilar antes que por una cifra aislada.' },
      { termino: 'Presión conservada con hipoperfusión', definicion: 'Situación en que los mecanismos de compensación mantienen la presión mientras el paciente ya está mal perfundido; llamarlo estable retrasa la atención.' },
      { termino: 'Actividad eléctrica frente a contracción', definicion: 'Distinción central de la unidad: un trazo organizado no garantiza pulso, y la comprobación se hace sobre el paciente.' },
      { termino: 'Conjunto de hallazgos', definicion: 'Criterio de interpretación: perfusión, congestión, ritmo y síntoma valorados juntos; ningún signo aislado confirma una entidad.' },
      { termino: 'Cronología del síntoma', definicion: 'Hora de inicio y evolución; información que solo posee el equipo que atendió primero y que pesa en las decisiones tiempo-dependientes.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la primera pregunta de una exploración cardiaca?', reverso: 'Si el paciente está perfundiendo, no cuánto marca el monitor.' },
      { frente: '¿Qué significa una presión arterial conservada en un paciente frío y confuso?', reverso: 'Que está compensando: está mal perfundido aunque la cifra parezca normal, y llamarlo estable retrasa lo que necesita.' },
      { frente: '¿Confirma la ingurgitación yugular un taponamiento?', reverso: 'No. Ningún signo aislado confirma una entidad: orienta el conjunto de perfusión, congestión, ritmo y síntoma.' },
      { frente: '¿Qué NO responde un monitor de ritmo?', reverso: 'Si la actividad eléctrica produce contracción y pulso; eso se comprueba sobre el paciente.' },
      { frente: '¿Por qué la cronología del síntoma es tan valiosa?', reverso: 'Porque el hospital puede repetir la exploración y añadir estudios, pero no puede reconstruir la hora de inicio ni la evolución en camino.' },
      { frente: '¿Cuándo se compara la presión entre ambos brazos?', reverso: 'Cuando el cuadro lo justifica y el protocolo lo indica, no de forma rutinaria.' },
    ],
    quiz: [
      {
        pregunta: 'El monitor muestra un trazo organizado y regular. ¿Qué puedes concluir sobre la circulación del paciente?',
        opciones: [
          'Que tiene pulso y perfunde adecuadamente.',
          'Nada por sí solo: la actividad eléctrica y la contracción mecánica son cosas distintas, y el pulso se comprueba sobre el paciente.',
          'Que la presión arterial es normal.',
          'Que puede omitirse la valoración de la piel y del estado mental.',
        ],
        correcta: 1,
        explicacion: 'Es el principio que ordena la unidad: el monitor eléctrico no demuestra perfusión.',
      },
      {
        pregunta: 'Paciente con dolor torácico, piel fría y húmeda, confuso, con presión arterial dentro de lo habitual. ¿Cómo lo clasificas?',
        opciones: [
          'Estable, porque la presión está conservada.',
          'Mal perfundido: los mecanismos de compensación mantienen la presión y el estado mental y la piel ya indican hipoperfusión.',
          'Sin datos suficientes hasta obtener un ECG.',
          'Con un cuadro de origen respiratorio.',
        ],
        correcta: 1,
        explicacion: 'El descenso de la presión aparece tarde; el estado mental y la piel son órganos diana que informan antes.',
      },
      {
        pregunta: 'Encuentras edema en ambos tobillos. ¿Qué te permite afirmar ese hallazgo aislado?',
        opciones: [
          'Que el paciente tiene insuficiencia cardiaca.',
          'Poco por sí solo: se interpreta dentro del conjunto y conviene saber si es nuevo o habitual en ese paciente.',
          'Que la causa es renal.',
          'Que debe administrarse un diurético.',
        ],
        correcta: 1,
        explicacion: 'Ningún signo aislado confirma una entidad; además se recoge si el edema es nuevo o habitual y si es simétrico.',
      },
      {
        pregunta: '¿Qué información del informe de traslado no podrá reconstruir el hospital si el equipo prehospitalario no la aporta?',
        opciones: [
          'El resultado del ECG de 12 derivaciones.',
          'La hora de inicio del síntoma y cómo evolucionó el paciente camino del hospital.',
          'Los antecedentes del paciente.',
          'La saturación de oxígeno al ingreso.',
        ],
        correcta: 1,
        explicacion: 'La cronología y la trayectoria solo las posee el equipo que atendió primero, y son las que más pesan en decisiones tiempo-dependientes.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso: varón con presión torácica desde hace una hora. Está pálido y sudoroso, habla en frases completas, tiene crepitantes en ambas bases y pulso irregular. Clasifica el hallazgo «crepitantes en ambas bases» dentro del esquema de la lección.',
          opciones: [
            'Es un dato de ritmo.',
            'Es un dato de congestión, que se valora junto con la perfusión, el ritmo y el síntoma.',
            'Es un dato de perfusión.',
            'Es una bandera roja que confirma insuficiencia cardiaca.',
          ],
          correcta: 1,
          explicacion: 'La lección ordena los hallazgos en perfusión, congestión, ritmo y síntoma; los crepitantes son congestión y no confirman por sí solos una entidad.',
        },
        {
          pregunta: 'Mismo caso. ¿Qué dos hallazgos corresponden a la categoría de PERFUSIÓN?',
          opciones: [
            'Los crepitantes y el pulso irregular.',
            'La palidez y la sudoración, que traducen vasoconstricción compensadora.',
            'La presión torácica y su duración.',
            'Que hable en frases completas y la hora de inicio.',
          ],
          correcta: 1,
          explicacion: 'La piel pálida, fría y húmeda es uno de los datos con que se valora la perfusión, junto con el estado mental, los pulsos y el llenado capilar.',
        },
        {
          pregunta: 'Al construir el informe de traslado de ese paciente, ¿cuál de estos elementos es el que el hospital NO podrá obtener por su cuenta?',
          opciones: [
            'El trazo del ECG.',
            'Que el cuadro empezó hace una hora y que la palidez apareció durante el traslado.',
            'La auscultación pulmonar.',
            'Los antecedentes cardiacos del paciente.',
          ],
          correcta: 1,
          explicacion: 'La cronología y la dirección del cambio son la aportación insustituible del equipo prehospitalario.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA/ACC/ACEP/NAEMSP/SCAI 2025 (sección pendiente); AHA/ACC/HFSA 2022; AHA ALS 2025; Bibiano 3.ª ed., cap. 35',
      fuentes: [
        '2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Acute Coronary Syndromes (sección pendiente).',
        '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure (sección pendiente).',
        'AHA 2025 Adult Advanced Life Support (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 35, p. 320.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: las guías primarias son de acceso restringido y '
          + 'no se abrió su texto. La lección es de MÉTODO y no depende de ninguna cifra, pero la '
          + 'deuda se declara igual.',
        'La comparación de presión entre ambos brazos se enseña como maniobra condicionada al cuadro '
          + 'y al protocolo, no como rutina.',
        'No se describe ninguna maniobra hospitalaria ni se atribuye valor diagnóstico a un signo '
          + 'aislado.',
      ],
    }),
  },

  // ============================================================
  //  Electrocardiografía básica
  // ============================================================
  'm4-card-ecg-basica': {
    icono: '📈',
    duracion: '22 min',
    resumen: 'Un método ordenado para leer un trazo en la calle y, sobre todo, para reconocer cuándo un '
      + 'trazo no es interpretable y no debe asignársele un ritmo.',
    objetivos: [
      'Distinguir qué registra un electrocardiograma y qué no registra.',
      'Diferenciar la monitorización de ritmo del electrocardiograma de doce derivaciones.',
      'Aplicar en orden los pasos de una lectura inicial.',
      'Reconocer las causas de un trazo no interpretable antes de asignarle un ritmo.',
    ],
    secciones: [
      {
        titulo: 'Qué registra y qué no registra',
        bloques: [
          { tipo: 'p', texto: 'El electrocardiograma recoge desde la superficie del cuerpo la actividad eléctrica que recorre el corazón. Esa actividad precede a la contracción, pero no es la contracción: son dos fenómenos encadenados que pueden separarse.' },
          {
            tipo: 'tabla',
            titulo: 'La distinción que ordena toda la lección',
            headers: ['El ECG registra', 'El ECG NO registra'],
            filas: [
              ['La actividad eléctrica del corazón', 'Si esa actividad produce contracción'],
              ['Su frecuencia y su regularidad', 'Si hay pulso y si el paciente perfunde'],
              ['La secuencia de las ondas y su relación', 'La fuerza con que el corazón bombea'],
              ['Un instante concreto del paciente', 'Lo que ocurrirá minutos después'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un ritmo organizado no implica pulso', texto: 'Es el error más peligroso de este tema. Existen situaciones con actividad eléctrica ordenada en la pantalla y sin contracción eficaz. Por eso, ante un paciente que no responde, el trazo nunca sustituye a la comprobación del pulso: se mira al paciente y después al monitor.' },
        ],
      },
      {
        titulo: 'Monitorización de ritmo y ECG de doce derivaciones',
        bloques: [
          { tipo: 'p', texto: 'Se confunden con frecuencia porque ambos muestran un trazo, pero responden preguntas distintas y no son intercambiables.' },
          {
            tipo: 'tabla',
            titulo: 'Dos registros, dos usos',
            headers: ['', 'Monitorización de ritmo', 'ECG de doce derivaciones'],
            filas: [
              ['Para qué sirve', 'Vigilar frecuencia y ritmo de forma continua', 'Obtener un registro más completo en un momento concreto'],
              ['Cuándo se usa', 'Durante toda la atención del paciente inestable', 'Cuando el cuadro lo indica y el protocolo lo establece'],
              ['Qué permite', 'Detectar un cambio mientras ocurre', 'Documentar y transmitir un registro para su interpretación'],
              ['Qué no permite', 'Sustituir al registro completo', 'Vigilar la evolución: es una fotografía, no una película'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Preparación: donde se gana o se pierde la calidad',
            items: [
              'Explicar al paciente qué se va a hacer y por qué.',
              'Colocarlo en la posición que el protocolo indique, procurando que esté cómodo y quieto.',
              'Preparar la piel según la indicación del fabricante del equipo: la piel húmeda, con vello o con restos impide el contacto.',
              'Colocar los electrodos en las posiciones que establezca el manual del equipo real de la unidad.',
              'Comprobar que los cables no traccionan ni quedan sobre una fuente de vibración.',
              'Obtener el trazo y comprobar su calidad ANTES de intentar leerlo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La posición de los electrodos la fija el manual del equipo', texto: 'No se memoriza de una lección ni se copia de otro servicio: cada equipo tiene su manual y cada servicio su protocolo. Colocar mal un electrodo produce un trazo que parece anormal sin que el paciente lo esté, y esa apariencia puede arrastrar una decisión equivocada.' },
        ],
      },
      {
        titulo: 'La lectura, en orden',
        bloques: [
          { tipo: 'p', texto: 'Leer un trazo por reconocimiento visual —comparándolo mentalmente con imágenes memorizadas— es rápido y frágil. Un método ordenado tarda unos segundos más y falla mucho menos, sobre todo bajo presión.' },
          {
            tipo: 'pasos',
            titulo: 'Los seis pasos',
            items: [
              'CALIDAD: ¿el trazo es interpretable? Si no lo es, el método se detiene aquí.',
              'FRECUENCIA: ¿es rápida, lenta o está dentro de lo esperado para este paciente?',
              'REGULARIDAD: ¿los complejos se suceden con intervalos constantes o no?',
              'ONDAS P: ¿las hay?, ¿son iguales entre sí?',
              'RELACIÓN P-QRS: ¿cada onda P se sigue de un complejo, y cada complejo va precedido de una onda P?',
              'ANCHURA DEL QRS: ¿el complejo es estrecho o ancho? Y, dentro del nivel básico, ¿hay cambios evidentes del segmento ST o de la onda T?',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un solo trazo no diagnostica ni descarta un síndrome coronario', texto: 'Un registro normal en un paciente con síntomas no excluye nada: puede cambiar en minutos. Por eso el trazo se repite cuando cambia el cuadro o cuando el protocolo lo indica, y por eso la decisión clínica se toma con el paciente delante y no solo con el papel.' },
        ],
      },
      {
        titulo: 'Correlación, documentación y transmisión',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'Todo hallazgo del trazo se contrasta con tres cosas antes de significar algo: el pulso palpado, el estado de perfusión y el síntoma que motivó la llamada. Un trazo llamativo en un paciente asintomático y bien perfundido plantea una pregunta distinta que el mismo trazo en un paciente que se está deteriorando.' },
          {
            tipo: 'lista',
            titulo: 'Qué se registra de cada trazo',
            items: [
              'Hora exacta de obtención.',
              'Condiciones en que se obtuvo: en movimiento o detenidos, con el paciente colaborador o agitado.',
              'Qué se observó y qué se hizo a continuación.',
              'Si se repitió, por qué se repitió y qué cambió respecto del anterior.',
              'Si se transmitió y a quién, conforme al procedimiento del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que fija el protocolo', texto: 'A quién se transmite un trazo, con qué medio, en qué casos se obtiene un registro completo y qué hace el equipo receptor con él son cuestiones del protocolo del servicio y de su dirección médica. Esta lección enseña el método de lectura y de control de calidad, no la política de transmisión.' },
        ],
      },
      F([AHA_ALS_2025, AHA_ACS_2025, ACLS_2020, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Actividad eléctrica', definicion: 'Lo que el electrocardiograma registra; precede a la contracción pero no la demuestra.' },
      { termino: 'Monitorización de ritmo', definicion: 'Registro continuo para vigilar frecuencia y ritmo y detectar un cambio mientras ocurre.' },
      { termino: 'ECG de doce derivaciones', definicion: 'Registro más completo obtenido en un momento concreto; es una fotografía y no sustituye a la vigilancia continua.' },
      { termino: 'Trazo no interpretable', definicion: 'Registro cuya calidad impide asignarle un ritmo; el método de lectura se detiene en el primer paso.' },
      { termino: 'Lectura ordenada', definicion: 'Método de seis pasos —calidad, frecuencia, regularidad, ondas P, relación P-QRS y anchura del QRS— que sustituye al reconocimiento visual memorizado.' },
      { termino: 'Correlación clínica', definicion: 'Contraste obligado de todo hallazgo del trazo con el pulso palpado, la perfusión y el síntoma.' },
    ],
    flashcards: [
      { frente: '¿Qué registra el ECG y qué no registra?', reverso: 'Registra la actividad eléctrica, su frecuencia y su regularidad; no registra si hay contracción, pulso ni perfusión.' },
      { frente: '¿Cuál es el primer paso de la lectura ordenada?', reverso: 'Comprobar la calidad del trazo. Si no es interpretable, el método se detiene ahí y no se le asigna un ritmo.' },
      { frente: '¿De dónde sale la posición de los electrodos?', reverso: 'Del manual del equipo real de la unidad y del protocolo del servicio, no de una lección.' },
      { frente: '¿Descarta un ECG normal un síndrome coronario?', reverso: 'No: puede cambiar en minutos. Se repite cuando cambia el cuadro o cuando lo indica el protocolo.' },
      { frente: '¿Con qué tres cosas se contrasta un hallazgo del trazo?', reverso: 'Con el pulso palpado, el estado de perfusión y el síntoma que motivó la llamada.' },
      { frente: '¿Qué diferencia una fotografía de una película, aplicado al ECG?', reverso: 'El registro de doce derivaciones documenta un instante; la monitorización continua detecta el cambio mientras ocurre.' },
    ],
    quiz: [
      {
        pregunta: 'Obtienes un trazo con línea de base inestable y artefacto continuo durante el traslado. ¿Qué haces?',
        opciones: [
          'Asignarle el ritmo que más se parezca.',
          'Detener el método en el primer paso: un trazo no interpretable no recibe un ritmo; se corrigen las condiciones y se repite.',
          'Interpretar solo la frecuencia y omitir el resto.',
          'Registrar el trazo como normal por descarte.',
        ],
        correcta: 1,
        explicacion: 'La calidad es el primer paso de la lectura ordenada precisamente para impedir que se lea lo que no puede leerse.',
      },
      {
        pregunta: 'Un paciente no responde y el monitor muestra un trazo organizado. ¿Qué haces primero?',
        opciones: [
          'Confiar en el trazo y continuar la evaluación secundaria.',
          'Comprobar el pulso sobre el paciente: un ritmo organizado no implica contracción eficaz.',
          'Obtener un ECG de doce derivaciones antes de tocar al paciente.',
          'Aumentar la ganancia del monitor.',
        ],
        correcta: 1,
        explicacion: 'Existen situaciones con actividad eléctrica ordenada y sin contracción eficaz; el trazo nunca sustituye a la comprobación del pulso.',
      },
      {
        pregunta: '¿Para qué sirve la monitorización continua que no consigue un registro de doce derivaciones?',
        opciones: [
          'Para documentar y transmitir un registro completo.',
          'Para detectar un cambio mientras ocurre; el registro completo es una fotografía de un instante.',
          'Para determinar la anchura del QRS.',
          'Para sustituir la comprobación del pulso.',
        ],
        correcta: 1,
        explicacion: 'Son dos registros con usos distintos y no intercambiables.',
      },
      {
        pregunta: 'Colocas un electrodo en una posición distinta de la que indica el manual del equipo. ¿Qué consecuencia tiene?',
        opciones: [
          'Ninguna, si el trazo se ve limpio.',
          'Puede producir un trazo de apariencia anormal en un paciente que no lo está, y esa apariencia puede arrastrar una decisión equivocada.',
          'Mejora la calidad al reducir el artefacto.',
          'Solo afecta a la frecuencia calculada.',
        ],
        correcta: 1,
        explicacion: 'Por eso la posición se toma del manual del equipo real y del protocolo, y no se memoriza ni se copia de otro servicio.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el método de lectura inicial de un trazo',
        pasos: [
          'Comprobar la CALIDAD: ¿es interpretable?',
          'Determinar la FRECUENCIA',
          'Determinar la REGULARIDAD',
          'Buscar las ONDAS P y comprobar si son iguales entre sí',
          'Comprobar la RELACIÓN entre onda P y complejo QRS',
          'Valorar la ANCHURA del QRS y los cambios evidentes de ST o T',
          'Contrastar el hallazgo con el pulso, la perfusión y el síntoma',
        ],
      },
      completar: [
        {
          texto: 'Antes de asignar un ritmo hay que descartar tres causas de trazo no interpretable: artefacto por movimiento, mala preparación de la piel y ___.',
          opciones: ['frecuencia demasiado alta', 'electrodos mal colocados o cables traccionados', 'ausencia de ondas P', 'complejo QRS ancho'],
          correcta: 1,
          explicacion: 'Las tres son fallos de obtención, no hallazgos del paciente: se corrigen y se repite el trazo.',
        },
        {
          texto: 'Un trazo de doce derivaciones documenta un instante; para detectar un cambio mientras ocurre se necesita la ___.',
          opciones: ['repetición del trazo al llegar', 'monitorización continua de ritmo', 'capnografía', 'oximetría'],
          correcta: 1,
          explicacion: 'Es la diferencia entre una fotografía y una película que establece la lección.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA ALS 2025 y ACS 2025 (secciones pendientes); ACLS 2020 solo como correspondencia histórica',
      fuentes: [
        'AHA 2025 Adult Advanced Life Support (sección pendiente).',
        '2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Acute Coronary Syndromes (sección pendiente).',
        'AHA. Manual ACLS 2020 (correspondencia histórica del plan; no sostiene afirmaciones).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada. La lección es de MÉTODO y control de calidad y no '
          + 'publica ningún criterio numérico de frecuencia ni de intervalos.',
        'No se enseña interpretación electrocardiográfica especializada ni se nombran ritmos concretos '
          + 'con sus criterios: el plan sitúa este tema en el nivel básico y la unidad de arritmias lo '
          + 'continúa.',
        'DECISIÓN PENDIENTE: la academia debe declarar el modelo de monitor/desfibrilador de sus '
          + 'unidades, cuyo manual fija la posición de electrodos y la preparación de la piel, y su '
          + 'política de transmisión de trazos.',
      ],
    }),
  },

  // ============================================================
  //  Síndrome coronario agudo
  // ============================================================
  'm4-card-sca': {
    icono: '💔',
    duracion: '22 min',
    resumen: 'Cómo se sospecha un síndrome coronario agudo, por qué el registro eléctrico temprano cambia '
      + 'el desenlace y qué se hace mientras no hay confirmación posible.',
    objetivos: [
      'Explicar en lenguaje claro qué ocurre en un síndrome coronario agudo.',
      'Reconocer presentaciones típicas y no clásicas sin recurrir a estereotipos.',
      'Justificar por qué el registro eléctrico temprano y la prealerta son la aportación decisiva.',
      'Identificar los razonamientos que llevan a descartar un síndrome coronario por error.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'El músculo cardiaco recibe su propia irrigación a través de las arterias coronarias. Cuando el flujo por una de ellas se reduce de forma brusca, la zona que dependía de ese vaso deja de recibir el oxígeno que necesita para trabajar. A esa situación se le llama isquemia, y si se mantiene el tiempo suficiente el tejido empieza a lesionarse.' },
          { tipo: 'p', texto: 'Bajo el nombre de síndrome coronario agudo se agrupa ese espectro: desde la isquemia que aparece con el esfuerzo y cede, hasta la oclusión que produce lesión miocárdica establecida. Lo que separa un extremo del otro no siempre puede determinarse en la calle, y esa incertidumbre forma parte del cuadro.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La lógica del tiempo', texto: 'El músculo que deja de recibir flujo no se pierde de golpe: se pierde progresivamente mientras la obstrucción persiste. Esa es la razón por la que todo el manejo se organiza alrededor del reloj, y por la que la aportación del equipo prehospitalario —reconocer, registrar y avisar pronto— pesa tanto como lo que ocurra después.' },
        ],
      },
      {
        titulo: 'Cómo se presenta, y cómo no siempre se presenta',
        bloques: [
          { tipo: 'p', texto: 'La presentación más conocida es una molestia torácica central descrita como presión, opresión o peso, que puede irradiarse y acompañarse de sudoración, náusea o disnea. Pero una parte importante de los pacientes no consulta así.' },
          {
            tipo: 'lista',
            titulo: 'Presentaciones que también corresponden a este cuadro',
            items: [
              'Disnea como síntoma dominante, con molestia torácica escasa o ausente.',
              'Náusea, vómito o malestar epigástrico.',
              'Sudoración profusa sin causa aparente.',
              'Fatiga intensa y de aparición reciente.',
              'Síncope o presíncope.',
              'Sensación de gravedad o de muerte inminente referida por el paciente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El problema del estereotipo', texto: 'Es habitual oír que ciertos grupos «no dan el cuadro típico». Formulado así, el estereotipo hace daño en las dos direcciones: lleva a no considerar el cuadro en quien no encaja en la imagen esperada, y lleva a descartarlo con demasiada facilidad en quien sí encaja pero se presenta de otro modo. La regla útil es la contraria: la ausencia de la presentación clásica no reduce la sospecha, y el cuadro se considera en cualquier paciente cuyo motivo lo justifique.' },
          {
            tipo: 'lista',
            titulo: 'Historia dirigida',
            items: [
              'Hora exacta de inicio del síntoma y qué hacía el paciente entonces.',
              'Qué lo provoca y qué lo alivia; si guarda relación con el esfuerzo.',
              'Cualidad, localización e irradiación.',
              'Episodios previos y si este se parece a alguno.',
              'Tratamiento habitual y si tomó algo antes de llamar.',
              'Alergias y antecedentes de sangrado, que condicionan decisiones posteriores.',
              'Consumo reciente de sustancias.',
            ],
          },
        ],
      },
      {
        titulo: 'Evaluación',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Qué se hace y en qué orden',
            items: [
              'Valoración primaria: vía aérea, ventilación y circulación antes de centrarse en el síntoma.',
              'Estado de perfusión: estado mental, piel, pulsos y tendencia de la presión.',
              'Registro eléctrico de doce derivaciones lo antes posible, conforme al protocolo del servicio.',
              'Monitorización continua y desfibrilador disponible junto al paciente.',
              'Considerar otros cuadros tiempo-dependientes que se presentan con dolor torácico y exigen conductas distintas.',
              'Reevaluación con registro de la hora de cada cambio.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué el desfibrilador se acerca aunque el paciente esté hablando', texto: 'La complicación más temida de las primeras horas es una arritmia que puede aparecer sin aviso en un paciente que hasta ese momento estaba consciente y estable. Tener el equipo junto al paciente no expresa desconfianza en su estado actual: expresa que la ventana de riesgo está abierta.' },
          { tipo: 'p', texto: 'El dolor torácico no pertenece en exclusiva al corazón. Hay cuadros de la aorta, del pulmón, del esófago y de la pared torácica que se presentan de forma parecida y cuyo manejo difiere. Mantener abiertas esas posibilidades es parte de la evaluación, no una duda que reste eficacia.' },
        ],
      },
      {
        titulo: 'Qué se hace, qué se evita y qué se transmite',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'lista',
            titulo: 'Soporte prehospitalario',
            items: [
              'Reposo y posición cómoda; evitar el esfuerzo del propio paciente al movilizarlo.',
              'Oxígeno únicamente si existe indicación conforme al protocolo, no de forma sistemática.',
              'Monitorización y desfibrilador disponibles.',
              'Acceso vascular conforme al alcance profesional y al protocolo.',
              'Medicación exclusivamente según la guía de la indicación, la Información para Prescribir del producto registrado y el protocolo del servicio.',
              'Traslado con prealerta y transmisión del registro conforme al procedimiento local.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Tres razonamientos que hacen daño', texto: 'Primero: aplicar una secuencia memorizada de fármacos como si fuera universal; cada componente tiene su indicación y sus contraindicaciones, y no todos proceden en todos los pacientes. Segundo: administrar oxígeno de rutina; solo se administra ante indicación. Tercero: descartar el cuadro porque el dolor se reproduce a la palpación o porque el primer registro eléctrico es normal; ninguna de las dos cosas excluye un síndrome coronario.' },
          { tipo: 'p', texto: 'A qué establecimiento se traslada, con qué prealerta y bajo qué criterios lo determinan el protocolo del servicio, la regulación médica y la capacidad resolutiva disponible. Las decisiones sobre reperfusión y su tratamiento posterior pertenecen al ámbito hospitalario y esta lección no las describe.' },
        ],
      },
      F([AHA_ACS_2025, AHA_ALS_2025, bibiano(35, 'Síndrome coronario agudo', 320), COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Isquemia miocárdica', definicion: 'Reducción brusca del flujo por una arteria coronaria que deja a una zona del músculo cardiaco sin el oxígeno que necesita para trabajar.' },
      { termino: 'Espectro del síndrome coronario agudo', definicion: 'Conjunto que va de la isquemia que cede a la oclusión con lesión miocárdica establecida; sus extremos no siempre se separan en la calle.' },
      { termino: 'Presentación no clásica', definicion: 'Cuadro que se manifiesta con disnea, náusea, sudoración, fatiga o síncope y con molestia torácica escasa o ausente.' },
      { termino: 'Registro eléctrico temprano', definicion: 'Obtención precoz del trazo de doce derivaciones conforme al protocolo; junto con la prealerta es la aportación decisiva del equipo prehospitalario.' },
      { termino: 'Ventana de riesgo arrítmico', definicion: 'Periodo en que puede aparecer sin aviso una arritmia grave en un paciente consciente; justifica tener el desfibrilador junto al paciente.' },
      { termino: 'Diagnósticos alternativos tiempo-dependientes', definicion: 'Cuadros de aorta, pulmón, esófago o pared torácica que se presentan con dolor torácico y exigen conductas distintas.' },
    ],
    flashcards: [
      { frente: '¿Por qué todo el manejo del síndrome coronario se organiza alrededor del reloj?', reverso: 'Porque el músculo sin flujo se pierde progresivamente mientras la obstrucción persiste.' },
      { frente: '¿Reduce la sospecha que el paciente no tenga dolor torácico típico?', reverso: 'No: hay presentaciones con disnea, náusea, sudoración, fatiga o síncope dominantes.' },
      { frente: '¿Descarta el cuadro un primer ECG normal?', reverso: 'No. Tampoco lo descarta que el dolor se reproduzca a la palpación.' },
      { frente: '¿Cuándo se administra oxígeno en este cuadro?', reverso: 'Solo ante indicación conforme al protocolo, nunca de forma sistemática.' },
      { frente: '¿Por qué se acerca el desfibrilador a un paciente que está hablando?', reverso: 'Porque puede aparecer sin aviso una arritmia grave: la ventana de riesgo está abierta aunque ahora esté estable.' },
      { frente: '¿Cuál es la aportación decisiva del equipo prehospitalario?', reverso: 'Reconocer, obtener el registro eléctrico temprano y prealertar; el tiempo ganado ahí no se recupera después.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 62 años con disnea intensa, náusea y sudoración, sin dolor torácico. ¿Cómo procedes?',
        opciones: [
          'Descartar origen coronario por la ausencia de dolor torácico.',
          'Considerar el cuadro dentro del espectro coronario: hay presentaciones con disnea, náusea o sudoración dominantes, y obtener el registro eléctrico temprano.',
          'Atribuirlo a ansiedad por el perfil de la paciente.',
          'Esperar a que aparezca dolor torácico para activar la ruta.',
        ],
        correcta: 1,
        explicacion: 'La ausencia de la presentación clásica no reduce la sospecha; el estereotipo hace daño en las dos direcciones.',
      },
      {
        pregunta: 'El dolor del paciente se reproduce al presionar la pared torácica y el primer ECG es normal. ¿Qué concluyes?',
        opciones: [
          'Que puede descartarse un síndrome coronario agudo.',
          'Que ninguna de las dos cosas lo excluye: el registro puede cambiar en minutos y la reproducción a la palpación no descarta el cuadro.',
          'Que se trata con certeza de un dolor de pared.',
          'Que debe repetirse el ECG solo si el paciente empeora al llegar al hospital.',
        ],
        correcta: 1,
        explicacion: 'Es uno de los tres razonamientos que la lección señala como dañinos.',
      },
      {
        pregunta: 'Un compañero propone administrar oxígeno a todo paciente con dolor torácico «por si acaso». ¿Qué respondes?',
        opciones: [
          'Que es lo correcto en este cuadro.',
          'Que el oxígeno se administra únicamente si existe indicación conforme al protocolo, no de forma sistemática.',
          'Que solo se administra si hay disnea.',
          'Que está contraindicado en todos los casos.',
        ],
        correcta: 1,
        explicacion: 'La administración rutinaria de oxígeno es una de las prácticas que la lección desaconseja expresamente.',
      },
      {
        pregunta: '¿Qué justifica mantener abiertas otras posibilidades ante un dolor torácico?',
        opciones: [
          'Que retrasar la decisión mejora el pronóstico.',
          'Que hay cuadros de aorta, pulmón, esófago y pared torácica que se presentan de forma parecida y cuyo manejo difiere.',
          'Que el ECG no puede obtenerse en la ambulancia.',
          'Que el diagnóstico definitivo se hace en la escena.',
        ],
        correcta: 1,
        explicacion: 'Mantener abiertas esas posibilidades es parte de la evaluación, no una duda que reste eficacia.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso A: varón de 55 años, presión torácica de 40 minutos, sudoroso. Caso B: mujer de 70 años, disnea y náusea de una hora, sin dolor. Caso C: joven de 25 años, dolor punzante que aumenta al inspirar, sin sudoración ni antecedentes. ¿Cuáles exigen ruta de síndrome coronario con registro eléctrico temprano?',
          opciones: [
            'Solo el caso A.',
            'Los casos A y B: ambos entran en el espectro, porque la presentación no clásica no reduce la sospecha.',
            'Los tres por igual.',
            'Ninguno hasta obtener confirmación.',
          ],
          correcta: 1,
          explicacion: 'B corresponde a una presentación no clásica con disnea y náusea dominantes; C exige valorar otras causas, sin que eso signifique descartar sin evaluar.',
        },
        {
          pregunta: 'En el caso B, ¿qué información debe transmitirse en la prealerta que el hospital no podrá reconstruir?',
          opciones: [
            'El resultado de laboratorio esperado.',
            'La hora exacta de inicio de la disnea y cómo evolucionó la perfusión durante el traslado.',
            'El diagnóstico definitivo de la paciente.',
            'La dosis administrada de oxígeno.',
          ],
          correcta: 1,
          explicacion: 'La cronología y la trayectoria son la aportación insustituible del equipo prehospitalario en un cuadro organizado alrededor del reloj.',
        },
        {
          pregunta: 'En cualquiera de esos casos, ¿qué dato NO puede conocerse todavía en la ambulancia?',
          opciones: [
            'La hora de inicio del síntoma.',
            'En qué punto exacto del espectro se encuentra el paciente, porque separar sus extremos no siempre es posible en la calle.',
            'El estado de perfusión.',
            'Si el paciente tiene antecedentes cardiacos.',
          ],
          correcta: 1,
          explicacion: 'La incertidumbre sobre el punto del espectro forma parte del cuadro y no impide activar la ruta ni sostener al paciente.',
        },
      ],
    },
    revision: ficha({
      version: 'ACC/AHA/ACEP/NAEMSP/SCAI 2025 (sección pendiente); AHA ALS 2025; Bibiano 3.ª ed., cap. 35',
      fuentes: [
        '2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Acute Coronary Syndromes (sección pendiente).',
        'AHA 2025 Adult Advanced Life Support (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 35, p. 320.',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: falta la sección exacta de la guía ACS 2025, que '
          + 'es de acceso restringido. La lección no publica ninguna cifra ni pauta farmacológica.',
        'No se enseña ninguna secuencia memorizada de fármacos ni se nombra ningún medicamento con su '
          + 'indicación: se declara expresamente que cada componente exige guía, IPP y protocolo.',
        'Las decisiones de reperfusión y el manejo posterior se declaran hospitalarios y fuera de '
          + 'alcance.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué medicación autoriza su protocolo en la sospecha de síndrome '
          + 'coronario, con qué producto y presentación, y cuál es su política de transmisión de trazos '
          + 'y de selección de destino?',
      ],
    }),
  },

  // ============================================================
  //  Paro cardiorrespiratorio y RCP avanzada
  // ============================================================
  'm4-card-pcr-megacode': {
    icono: '🚨',
    duracion: '25 min',
    resumen: 'Cómo se organiza un equipo alrededor de un paro cardiorrespiratorio para que las '
      + 'compresiones no se interrumpan y las decisiones se tomen en voz alta.',
    objetivos: [
      'Reconocer un paro cardiorrespiratorio y activar el sistema sin demora.',
      'Describir el ciclo de reanimación y qué protege la continuidad de las compresiones.',
      'Distinguir ritmos desfibrilables de no desfibrilables y su relación con el pulso.',
      'Asignar las funciones del equipo y aplicar la comunicación de circuito cerrado.',
    ],
    secciones: [
      {
        titulo: 'Reconocer y activar',
        bloques: [
          { tipo: 'p', texto: 'Un paro cardiorrespiratorio se reconoce en segundos y con muy pocos datos: el paciente no responde y no respira con normalidad. La respiración agónica —lenta, ruidosa, entrecortada— no es respiración eficaz y no debe interpretarse como que el paciente respira.' },
          {
            tipo: 'pasos',
            titulo: 'Los primeros segundos',
            items: [
              'Comprobar la seguridad de la escena antes de acercarse.',
              'Comprobar la respuesta del paciente.',
              'Comprobar simultáneamente respiración y pulso durante un tiempo breve conforme al protocolo.',
              'Activar el sistema y solicitar el desfibrilador y los recursos adicionales.',
              'Iniciar compresiones sin demora si no hay respuesta ni respiración normal.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La duda no retrasa el inicio', texto: 'Ante un paciente que no responde y no respira con normalidad, la conducta es iniciar. Un paciente que no estaba en paro y recibe compresiones sufre un daño reparable; un paciente en paro que espera mientras alguien confirma pierde exactamente lo que el procedimiento pretende salvar.' },
        ],
      },
      {
        titulo: 'El ciclo y lo que lo protege',
        bloques: [
          { tipo: 'p', texto: 'La reanimación avanza por ciclos que combinan compresiones, ventilación y análisis del ritmo. Todo lo demás —el acceso vascular, la vía aérea, la medicación— se organiza para no interrumpirlos.' },
          {
            tipo: 'lista',
            titulo: 'Qué define una compresión de calidad',
            items: [
              'Profundidad y frecuencia conforme a la guía vigente y al protocolo del servicio.',
              'Permitir la reexpansión completa del tórax entre compresiones.',
              'Minimizar cualquier interrupción, incluidas las del análisis del ritmo y las del cambio de compresor.',
              'Relevar al compresor de forma programada para evitar la fatiga, que degrada la calidad antes de que quien comprime la perciba.',
              'Superficie firme bajo el paciente.',
              'Si hay dispositivo de retroalimentación en la unidad, usarlo conforme a su manual.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La métrica que importa es el tiempo sin comprimir', texto: 'Cada segundo de pausa reduce el flujo generado, y recuperarlo tras reanudar cuesta varios ciclos. Por eso las tareas se preparan mientras se comprime y las pausas se anuncian, se cronometran y se acortan. Un equipo puede hacerlo todo correctamente y aun así reanimar mal si acumula interrupciones.' },
        ],
      },
      {
        titulo: 'Ritmos y su relación con el pulso',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Dos grandes categorías',
            headers: ['Categoría', 'Qué significa', 'Qué se hace'],
            filas: [
              ['Desfibrilable', 'La actividad eléctrica es caótica o ineficaz y una descarga puede reorganizarla', 'Desfibrilar conforme al equipo y al protocolo, reanudando compresiones de inmediato'],
              ['No desfibrilable', 'Una descarga no aporta nada en esa situación eléctrica', 'Continuar compresiones y buscar causas reversibles'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La energía no se memoriza', texto: 'La energía de desfibrilación depende del modelo de desfibrilador que lleve la unidad y de lo que indique su manual, además del protocolo del servicio. Esta lección no publica ninguna cifra: aplicar la de otro equipo puede significar administrar una energía que ese aparato no está diseñado para entregar.' },
          { tipo: 'p', texto: 'La categoría del ritmo no dice si hay pulso. Existen ritmos organizados en la pantalla sin contracción eficaz, y por eso la comprobación de pulso se hace sobre el paciente en los momentos que el protocolo establece, sin interrumpir más de lo necesario.' },
          {
            tipo: 'lista',
            titulo: 'Causas reversibles: por qué se buscan mientras se reanima',
            items: [
              'Porque algunas se corrigen con medidas disponibles en el ámbito prehospitalario.',
              'Porque su búsqueda no compite con las compresiones: la hace otro miembro del equipo.',
              'Porque la información de la escena y de los acompañantes se pierde si nadie la recoge.',
              'Las categorías —oxigenación, volumen, temperatura, alteraciones metabólicas, tóxicos y causas mecánicas— se revisan de forma sistemática conforme al protocolo.',
            ],
          },
        ],
      },
      {
        titulo: 'El equipo: funciones y comunicación',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Funciones que se reparten en voz alta',
            headers: ['Función', 'De qué responde'],
            filas: [
              ['Líder', 'Dirige, no ejecuta; mantiene la visión del conjunto, asigna funciones y controla el tiempo'],
              ['Compresor', 'Compresiones de calidad; anuncia su fatiga y se releva de forma programada'],
              ['Vía aérea y ventilación', 'Permeabilidad y ventilación conforme al alcance y al equipo autorizados'],
              ['Monitor y desfibrilador', 'Manejo del equipo, análisis y descarga conforme al manual y al protocolo'],
              ['Acceso y medicación', 'Acceso vascular y administración conforme a alcance, formulario y dirección médica'],
              ['Registro', 'Hora de cada intervención, ritmo, descargas y respuesta; sostiene el informe posterior'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Comunicación de circuito cerrado', texto: 'Una orden se dirige a una persona concreta, esa persona la repite en voz alta, la ejecuta y avisa cuando está hecha. Ese ciclo de tres pasos evita las dos formas de fallo más frecuentes en una reanimación: que una tarea la hagan dos personas a la vez y que no la haga nadie porque cada uno supuso que la había asumido otro.' },
          { tipo: 'p', texto: 'Tras el retorno de la circulación espontánea el trabajo no termina: cambia. Se reevalúa la vía aérea, la ventilación y la perfusión, se vigila la posibilidad de un nuevo paro, se registra la hora exacta del retorno y se traslada con prealerta. Los objetivos y las medidas del cuidado posterior dependen de la guía vigente, del equipo disponible y del protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Lo que esta lección no puede darte',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'callout', variante: 'alerta', titulo: 'Un megacode no es una lección de memorizar fármacos', texto: 'La simulación integrada que el plan llama «megacode» evalúa reconocimiento, calidad de las compresiones, continuidad, decisiones y comunicación. Los medicamentos ocupan un lugar en el algoritmo, pero ninguno sustituye a las compresiones ni a la desfibrilación cuando está indicada. Convertir la práctica en un examen de dosis desplaza la atención de lo que realmente cambia el desenlace.' },
          {
            tipo: 'lista',
            titulo: 'Qué debe entregar la academia para completar este tema',
            items: [
              'Modelo de desfibrilador de sus unidades y su manual, del que procede la energía.',
              'Formulario aprobado, con presentaciones y concentraciones reales.',
              'Alcance profesional de sus alumnos en vía aérea, acceso vascular y administración.',
              'Protocolo de reanimación y de cuidados posteriores al retorno de la circulación.',
              'Criterios locales de inicio, suspensión y traslado durante la reanimación.',
            ],
          },
        ],
      },
      F([AHA_BLS_2025, AHA_ALS_2025, ACLS_2020, bibiano(29, 'Soporte vital avanzado en el adulto', 261)]),
    ],
    conceptosClave: [
      { termino: 'Respiración agónica', definicion: 'Respiración lenta, ruidosa y entrecortada que no es eficaz; no debe interpretarse como que el paciente respira.' },
      { termino: 'Fracción de compresión', definicion: 'Proporción del tiempo de reanimación en que efectivamente se comprime; el tiempo sin comprimir es la métrica que más pesa.' },
      { termino: 'Ritmo desfibrilable', definicion: 'Actividad eléctrica caótica o ineficaz que una descarga puede reorganizar; la categoría no informa sobre la presencia de pulso.' },
      { termino: 'Causas reversibles', definicion: 'Condiciones que pueden explicar y revertir el paro; se buscan mientras se reanima, por un miembro distinto del compresor.' },
      { termino: 'Comunicación de circuito cerrado', definicion: 'Orden dirigida a una persona concreta, repetida en voz alta, ejecutada y confirmada al terminar.' },
      { termino: 'Retorno de la circulación espontánea', definicion: 'Momento en que el paciente recupera circulación propia; el trabajo no termina sino que cambia a reevaluación, vigilancia y traslado.' },
    ],
    flashcards: [
      { frente: '¿Qué dos datos bastan para iniciar la reanimación?', reverso: 'Que el paciente no responda y no respire con normalidad.' },
      { frente: '¿Es la respiración agónica una respiración eficaz?', reverso: 'No: es lenta, ruidosa y entrecortada, y no debe interpretarse como que el paciente respira.' },
      { frente: '¿Cuál es la métrica de calidad que más pesa?', reverso: 'El tiempo sin comprimir: cada pausa reduce el flujo y recuperarlo cuesta varios ciclos.' },
      { frente: '¿De dónde sale la energía de desfibrilación?', reverso: 'Del manual del desfibrilador real de la unidad y del protocolo; no se memoriza ni se copia de otro equipo.' },
      { frente: '¿En qué consiste la comunicación de circuito cerrado?', reverso: 'Orden a una persona concreta, repetida en voz alta, ejecutada y confirmada al terminar.' },
      { frente: '¿Sustituye la medicación a las compresiones o a la desfibrilación?', reverso: 'No: ocupa un lugar en el algoritmo, pero no reemplaza lo que sostiene el flujo ni la descarga cuando está indicada.' },
    ],
    quiz: [
      {
        pregunta: 'Dudas de si el paciente respira: hace movimientos respiratorios lentos y ruidosos y no responde. ¿Qué haces?',
        opciones: [
          'Esperar y observar un minuto más para confirmar.',
          'Iniciar compresiones: la respiración agónica no es respiración eficaz y la duda no retrasa el inicio.',
          'Buscar primero un acceso vascular.',
          'Obtener un ECG de doce derivaciones antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'Un paciente que no estaba en paro sufre un daño reparable; uno en paro que espera pierde lo que el procedimiento pretende salvar.',
      },
      {
        pregunta: 'Un equipo ejecuta correctamente cada maniobra pero acumula pausas largas entre ellas. ¿Cómo se valora esa reanimación?',
        opciones: [
          'Correcta, porque cada maniobra se hizo bien.',
          'Deficiente: el tiempo sin comprimir es la métrica que más pesa, y recuperar el flujo tras cada pausa cuesta varios ciclos.',
          'Correcta si el ritmo era desfibrilable.',
          'No puede valorarse sin conocer las dosis administradas.',
        ],
        correcta: 1,
        explicacion: 'Un equipo puede hacerlo todo correctamente y aun así reanimar mal si acumula interrupciones.',
      },
      {
        pregunta: 'El monitor muestra un ritmo no desfibrilable. ¿Qué se sigue de esa categoría?',
        opciones: [
          'Que el paciente tiene pulso.',
          'Que una descarga no aporta nada en esa situación eléctrica; se continúa comprimiendo y se buscan causas reversibles.',
          'Que la reanimación debe suspenderse.',
          'Que debe administrarse medicación antes de continuar.',
        ],
        correcta: 1,
        explicacion: 'La categoría del ritmo tampoco informa sobre la presencia de pulso, que se comprueba sobre el paciente.',
      },
      {
        pregunta: 'Durante la reanimación, ¿quién busca las causas reversibles?',
        opciones: [
          'El compresor, entre ciclo y ciclo.',
          'Otro miembro del equipo, porque esa búsqueda no debe competir con las compresiones.',
          'Nadie: se buscan al llegar al hospital.',
          'El líder en exclusiva, deteniendo la reanimación.',
        ],
        correcta: 1,
        explicacion: 'Las tareas se organizan para no interrumpir el ciclo, y la información de la escena se pierde si nadie la recoge en su momento.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la respuesta del equipo desde el reconocimiento del paro',
        pasos: [
          'Comprobar la seguridad de la escena',
          'Comprobar la respuesta del paciente',
          'Comprobar respiración y pulso de forma breve',
          'Activar el sistema y pedir desfibrilador y recursos',
          'Iniciar compresiones sin demora',
          'Asignar funciones en voz alta: líder, compresor, vía aérea, monitor, acceso y registro',
          'Analizar el ritmo minimizando la pausa y actuar según su categoría',
          'Buscar causas reversibles mientras continúan las compresiones',
          'Ante retorno de la circulación, reevaluar, registrar la hora y trasladar con prealerta',
        ],
      },
      completar: [
        {
          texto: 'En la comunicación de circuito cerrado, después de dirigir la orden a una persona concreta esa persona la ___ en voz alta, la ejecuta y avisa al terminar.',
          opciones: ['anota', 'repite', 'delega', 'cuestiona'],
          correcta: 1,
          explicacion: 'Ese ciclo evita que una tarea la hagan dos personas a la vez o que no la haga nadie.',
        },
        {
          texto: 'El relevo del compresor se hace de forma ___ porque la fatiga degrada la calidad antes de que quien comprime la perciba.',
          opciones: ['voluntaria', 'programada', 'aleatoria', 'opcional'],
          correcta: 1,
          explicacion: 'Es uno de los elementos que definen una compresión de calidad.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA BLS y ALS 2025 (secciones pendientes); ACLS 2020 como correspondencia histórica; Bibiano 3.ª ed., cap. 29',
      fuentes: [
        'AHA 2025 Adult Basic Life Support (sección pendiente).',
        'AHA 2025 Adult Advanced Life Support (sección pendiente).',
        'AHA. Manual ACLS 2020 (correspondencia histórica; no sostiene afirmaciones).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 29, p. 261.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan la profundidad, la frecuencia y los tiempos exactos de '
          + 'la guía AHA 2025, y la energía de desfibrilación, que depende del manual del equipo real. '
          + 'La lección enseña el método, la organización del equipo y la continuidad, que es lo '
          + 'sustentable sin esas cifras.',
        'No se nombra ningún medicamento ni se describe ningún algoritmo farmacológico: se declara '
          + 'expresamente que la medicación no sustituye a las compresiones ni a la desfibrilación.',
        'PREGUNTA PARA LA ACADEMIA: modelo y manual del desfibrilador, formulario aprobado, alcance de '
          + 'sus alumnos en vía aérea y acceso vascular, y criterios locales de inicio, suspensión y '
          + 'traslado durante la reanimación.',
      ],
    }),
  },

  // ============================================================
  //  Bradiarritmias y taquiarritmias
  // ============================================================
  'm4-card-arritmias': {
    icono: '〰️',
    duracion: '20 min',
    resumen: 'Cómo se decide si una frecuencia anormal es un hallazgo tolerado o una arritmia que está '
      + 'causando inestabilidad, y qué se busca antes de tratar el número.',
    objetivos: [
      'Distinguir una frecuencia anormal tolerada de una arritmia con repercusión clínica.',
      'Aplicar un esquema sistemático de valoración del trazo.',
      'Identificar los signos que definen inestabilidad clínica.',
      'Buscar causas reversibles antes de asumir un problema eléctrico primario.',
    ],
    secciones: [
      {
        titulo: 'La frecuencia es un hallazgo, no un diagnóstico',
        bloques: [
          { tipo: 'p', texto: 'Que un paciente tenga el corazón lento o rápido no dice todavía si eso es un problema. Una frecuencia baja puede ser habitual en una persona entrenada, y una frecuencia alta puede ser la respuesta correcta del organismo a fiebre, dolor, ansiedad, deshidratación o hemorragia.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta correcta', texto: 'No es «¿qué frecuencia tiene?» sino «¿esta frecuencia está causando un problema, o es la respuesta a un problema que está en otra parte?». Tratar el número sin responderla lleva a corregir una compensación útil o a pasar por alto la causa que la produjo.' },
          {
            tipo: 'lista',
            titulo: 'Qué se recoge antes de mirar el trazo con detalle',
            items: [
              'Desde cuándo ocurre y si el paciente lo percibe.',
              'Qué hacía cuando empezó y si ya le había pasado antes.',
              'Síntomas acompañantes: dolor torácico, disnea, mareo, síncope.',
              'Tratamiento habitual, cambios recientes y posible omisión o exceso de dosis.',
              'Consumo de sustancias.',
              'Enfermedad renal, alteraciones conocidas de electrolitos y episodios de vómito o diarrea.',
            ],
          },
        ],
      },
      {
        titulo: 'Valoración sistemática del trazo',
        bloques: [
          { tipo: 'p', texto: 'Sobre el método de lectura ya enseñado, la valoración de una arritmia se apoya en tres preguntas que ordenan casi todo lo que puede observarse en el nivel prehospitalario.' },
          {
            tipo: 'tabla',
            titulo: 'Las tres preguntas',
            headers: ['Pregunta', 'Qué distingue'],
            filas: [
              ['¿Es regular o irregular?', 'Separa los ritmos con intervalos constantes de los que no los tienen'],
              ['¿Hay ondas P y qué relación guardan con los complejos?', 'Informa sobre el origen y la conducción de la señal'],
              ['¿El QRS es estrecho o ancho?', 'Orienta sobre por dónde se está conduciendo la señal por el corazón'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un trazo no interpretable no se fuerza', texto: 'Si la calidad impide responder esas preguntas, la conducta es corregir las condiciones y repetir, no asignar el ritmo que más se parezca. Esa disciplina, ya establecida en el tema de electrocardiografía, importa aquí más que en ningún otro lugar, porque de la categoría del ritmo cuelgan decisiones.' },
        ],
      },
      {
        titulo: 'Estable, inestable o en paro',
        bloques: [
          { tipo: 'p', texto: 'La decisión que ordena esta unidad no depende del nombre del ritmo, sino del estado del paciente que lo tiene. Un mismo trazo exige conductas distintas según cómo esté quien lo produce.' },
          {
            tipo: 'lista',
            titulo: 'Signos de inestabilidad clínica',
            items: [
              'Hipotensión o descenso de la presión durante la atención.',
              'Alteración del estado mental de aparición reciente.',
              'Signos de shock: piel fría, pálida o moteada, relleno capilar lento.',
              'Dolor torácico de características isquémicas.',
              'Signos de insuficiencia cardiaca aguda, como dificultad respiratoria con congestión.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La palabra «estable» se usa mal con frecuencia', texto: 'Un paciente con presión conservada pero frío, pálido y con el sensorio alterado no está estable: está compensando. Llamarlo estable porque la cifra de presión todavía aguanta es el error que más retrasa la atención en esta unidad.' },
          {
            tipo: 'tabla',
            titulo: 'Tres situaciones, tres conductas generales',
            headers: ['Situación', 'Qué significa', 'Hacia dónde va la conducta'],
            filas: [
              ['Frecuencia anormal sin repercusión', 'El paciente tolera el ritmo', 'Observación, monitorización continua y búsqueda de la causa'],
              ['Arritmia con inestabilidad', 'El ritmo está causando hipoperfusión', 'Soporte inmediato y ruta tiempo-dependiente conforme al protocolo'],
              ['Paro cardiorrespiratorio', 'No hay circulación eficaz', 'Reanimación conforme a lo estudiado en el tema de paro'],
            ],
          },
        ],
      },
      {
        titulo: 'Causas reversibles y límites del alcance',
        bloques: [
          { tipo: 'p', texto: 'Antes de asumir que el problema es eléctrico y primario conviene revisar las condiciones que producen arritmias y que pueden corregirse. Es una revisión rápida y rentable, y varias de esas causas se detectan con lo que ya lleva la unidad.' },
          {
            tipo: 'lista',
            titulo: 'Qué revisar',
            items: [
              'Oxigenación y ventilación: la hipoxia produce alteraciones del ritmo.',
              'Isquemia miocárdica en curso.',
              'Alteraciones de electrolitos, sospechadas por antecedentes de enfermedad renal, vómito, diarrea o tratamiento diurético.',
              'Fármacos y tóxicos, incluidas la omisión y la duplicación de dosis.',
              'Temperatura corporal, en ambos extremos.',
              'Dolor, ansiedad, fiebre, hemorragia o deshidratación como explicación de una taquicardia.',
            ],
          },
          BLOQUE_CIFRAS,
          { tipo: 'callout', variante: 'alerta', titulo: 'Qué depende del servicio y no de esta lección', texto: 'La cardioversión eléctrica, la estimulación transcutánea y cualquier medicación antiarrítmica exigen equipo a bordo, competencia acreditada del prestador, indicación respaldada por la guía vigente y protocolo con dirección médica. Esta lección no publica energías, dosis ni umbrales de frecuencia, y su ausencia no significa que estén contraindicadas: significa que la decisión no se toma con una lección.' },
        ],
      },
      F([AHA_ALS_2025, bibiano(38, 'Bradiarritmias', 348), bibiano(39, 'Taquiarritmias', 355), COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Frecuencia como hallazgo', definicion: 'Dato que no constituye por sí solo un diagnóstico: puede ser el problema o la respuesta a un problema situado en otra parte.' },
      { termino: 'Inestabilidad clínica', definicion: 'Repercusión del ritmo sobre el paciente: hipotensión, alteración mental reciente, signos de shock, dolor isquémico o insuficiencia cardiaca aguda.' },
      { termino: 'Compensación', definicion: 'Situación en que la presión se mantiene mientras el paciente ya está hipoperfundido; no equivale a estabilidad.' },
      { termino: 'QRS estrecho o ancho', definicion: 'Rasgo del trazo que orienta sobre por dónde se conduce la señal por el corazón.' },
      { termino: 'Causas reversibles de arritmia', definicion: 'Hipoxia, isquemia, alteraciones electrolíticas o metabólicas, fármacos y tóxicos, y temperatura; se revisan antes de asumir un problema eléctrico primario.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la pregunta correcta ante una frecuencia anormal?', reverso: 'Si esa frecuencia está causando un problema o es la respuesta a un problema situado en otra parte.' },
      { frente: 'Nombra tres signos de inestabilidad clínica.', reverso: 'Hipotensión, alteración mental reciente y signos de shock; también dolor isquémico e insuficiencia cardiaca aguda.' },
      { frente: '¿Está estable un paciente con presión conservada pero frío y confuso?', reverso: 'No: está compensando. Llamarlo estable es el error que más retrasa la atención en esta unidad.' },
      { frente: '¿Qué tres preguntas ordenan la valoración del trazo?', reverso: 'Si es regular o irregular, si hay ondas P y qué relación guardan con los complejos, y si el QRS es estrecho o ancho.' },
      { frente: 'Nombra tres causas reversibles de arritmia.', reverso: 'Hipoxia, isquemia y alteraciones electrolíticas; también fármacos y tóxicos, y alteraciones de la temperatura.' },
      { frente: '¿De qué dependen la cardioversión y la estimulación transcutánea?', reverso: 'De equipo a bordo, competencia acreditada, indicación respaldada por guía vigente y protocolo con dirección médica.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con fiebre alta, deshidratado, con taquicardia. ¿Cuál es la conducta coherente con la lección?',
        opciones: [
          'Tratar la taquicardia por su valor numérico.',
          'Considerar que la taquicardia puede ser la respuesta correcta a la fiebre y la deshidratación, y buscar y atender la causa.',
          'Asumir una arritmia primaria y prepararse para cardiovertir.',
          'Repetir el ECG hasta que la frecuencia baje.',
        ],
        correcta: 1,
        explicacion: 'Una frecuencia alta puede ser la respuesta del organismo a fiebre, dolor, ansiedad, deshidratación o hemorragia; corregirla sin más suprime una compensación útil.',
      },
      {
        pregunta: 'El trazo tiene tanto artefacto que no puedes responder si hay ondas P. ¿Qué haces?',
        opciones: [
          'Asignar el ritmo más probable según la frecuencia.',
          'Corregir las condiciones y repetir el trazo: no se fuerza una categoría de la que cuelgan decisiones.',
          'Interpretar solo la anchura del QRS.',
          'Registrar el ritmo como irregular por defecto.',
        ],
        correcta: 1,
        explicacion: 'La disciplina de no leer un trazo no interpretable importa especialmente aquí, porque de la categoría del ritmo cuelgan decisiones.',
      },
      {
        pregunta: 'Un paciente con bradicardia mantiene una presión arterial dentro de lo habitual, pero está pálido, frío y algo confuso. ¿Cómo lo clasificas?',
        opciones: [
          'Estable: la presión está conservada.',
          'Inestable: la alteración mental reciente y los signos de shock indican que el ritmo está causando hipoperfusión.',
          'En paro cardiorrespiratorio.',
          'Sin datos suficientes hasta obtener doce derivaciones.',
        ],
        correcta: 1,
        explicacion: 'Los signos de inestabilidad incluyen alteración mental reciente y signos de shock, no solo la hipotensión.',
      },
      {
        pregunta: '¿Por qué se revisan las causas reversibles antes de asumir un problema eléctrico primario?',
        opciones: [
          'Porque el protocolo lo exige para el registro.',
          'Porque varias de esas causas se detectan con lo que ya lleva la unidad y algunas pueden corregirse, lo que cambia la conducta.',
          'Porque sustituyen a la valoración del trazo.',
          'Porque determinan la energía de cardioversión.',
        ],
        correcta: 1,
        explicacion: 'Es una revisión rápida y rentable que puede cambiar por completo la orientación del cuadro.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Combinación 1: frecuencia baja, paciente alerta, bien perfundido, sin síntomas. Clasifícala según el esquema de la lección.',
          opciones: [
            'Arritmia con inestabilidad.',
            'Frecuencia anormal sin repercusión: observación, monitorización continua y búsqueda de la causa.',
            'Paro cardiorrespiratorio.',
            'Trazo no interpretable.',
          ],
          correcta: 1,
          explicacion: 'El paciente tolera el ritmo, de modo que la conducta va hacia la vigilancia y la búsqueda de la causa, no hacia una intervención inmediata.',
        },
        {
          pregunta: 'Combinación 2: frecuencia muy alta, paciente con dolor torácico isquémico e hipotensión. Clasifícala y señala el siguiente paso NO farmacológico.',
          opciones: [
            'Sin repercusión; continuar observando.',
            'Arritmia con inestabilidad: soporte inmediato y ruta tiempo-dependiente conforme al protocolo, con desfibrilador disponible junto al paciente.',
            'Paro cardiorrespiratorio: iniciar compresiones.',
            'Causa reversible confirmada: corregir la temperatura.',
          ],
          correcta: 1,
          explicacion: 'El dolor isquémico y la hipotensión figuran entre los signos de inestabilidad, que dirigen hacia el soporte inmediato conforme al protocolo.',
        },
        {
          pregunta: 'Combinación 3: paciente con enfermedad renal, vómitos de tres días y trazo con QRS ancho. ¿Qué debe revisarse antes de asumir un problema eléctrico primario?',
          opciones: [
            'La temperatura ambiental de la escena.',
            'Una posible alteración de electrolitos, sospechada por la enfermedad renal y los vómitos.',
            'La posición de los electrodos únicamente.',
            'El antecedente de entrenamiento deportivo.',
          ],
          correcta: 1,
          explicacion: 'Las alteraciones de electrolitos se sospechan por antecedentes de enfermedad renal, vómito, diarrea o tratamiento diurético, y figuran entre las causas reversibles.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA ALS 2025 (algoritmo pendiente); Bibiano 3.ª ed., caps. 38 y 39',
      fuentes: [
        'AHA 2025 Adult Advanced Life Support (algoritmo y sección pendientes).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 38, p. 348 y cap. 39, p. 355.',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan los umbrales de frecuencia y los algoritmos exactos de '
          + 'AHA 2025. La lección no publica ningún corte numérico y enseña la decisión por el estado '
          + 'del paciente, que es lo sustentable sin ellos.',
        'No se nombran ritmos concretos con sus criterios ni antiarrítmicos: cardioversión, '
          + 'estimulación transcutánea y medicación se declaran dependientes de equipo, competencia y '
          + 'protocolo.',
        'PREGUNTA PARA LA ACADEMIA: ¿autoriza su protocolo cardioversión o estimulación transcutánea, '
          + 'con qué equipo y competencia, y qué antiarrítmicos incluye su formulario?',
      ],
    }),
  },

  // ============================================================
  //  Insuficiencia cardiaca
  // ============================================================
  'm4-card-insuficiencia': {
    icono: '🫁',
    duracion: '20 min',
    resumen: 'Qué significa que el corazón falle como bomba, cómo se distingue la congestión del bajo '
      + 'gasto y qué reconoce el prestador cuando una insuficiencia crónica se descompensa.',
    objetivos: [
      'Explicar el concepto de insuficiencia cardiaca y su doble consecuencia.',
      'Diferenciar la condición crónica del episodio agudo de descompensación.',
      'Distinguir congestión de hipoperfusión y reconocer que pueden coexistir.',
      'Identificar las banderas rojas y los desencadenantes de una descompensación.',
    ],
    secciones: [
      {
        titulo: 'Fallo de bomba: dos consecuencias, no una',
        bloques: [
          { tipo: 'p', texto: 'La insuficiencia cardiaca es la situación en que el corazón no logra bombear la sangre que el organismo necesita, o solo lo consigue a costa de presiones de llenado elevadas. De esa definición salen dos consecuencias distintas que conviene no mezclar.' },
          {
            tipo: 'tabla',
            titulo: 'Las dos consecuencias del fallo de bomba',
            headers: ['Consecuencia', 'Qué ocurre', 'Cómo se manifiesta'],
            filas: [
              ['Congestión', 'La sangre se acumula por detrás del ventrículo que falla', 'Hacia el pulmón: disnea, ortopnea, crepitantes. Hacia el sistema: ingurgitación yugular, edema, aumento de peso'],
              ['Bajo gasto', 'Llega menos sangre a los tejidos por delante', 'Fatiga, intolerancia al esfuerzo, piel fría, y en los casos graves alteración del sensorio e hipotensión'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Congestión y bajo gasto no son lo mismo ni van siempre juntos', texto: 'Un paciente puede estar muy congestivo y perfundir bien, y otro puede tener congestión discreta y estar mal perfundido. Distinguirlo cambia la conducta y cambia el mensaje al hospital, y es la razón por la que la valoración de la perfusión no se sustituye por la auscultación.' },
          { tipo: 'p', texto: 'La insuficiencia cardiaca es además una condición crónica con la que muchas personas viven durante años. El paciente suele conocer su situación habitual: cuántas almohadas usa para dormir, cuánto camina antes de detenerse y cuál es su peso de referencia. Esa información convierte una exploración aislada en una comparación útil.' },
        ],
      },
      {
        titulo: 'Cuando lo crónico se descompensa',
        bloques: [
          { tipo: 'p', texto: 'Lo que motiva la llamada rara vez es la insuficiencia cardiaca en sí, sino un empeoramiento agudo sobre esa base. Reconocer qué cambió y por qué cambió es la tarea de la evaluación.' },
          {
            tipo: 'lista',
            titulo: 'Historia dirigida',
            items: [
              'Cuántas almohadas necesita para dormir y si eso ha cambiado en los últimos días.',
              'Si se despierta por la noche con sensación de ahogo.',
              'Si el edema ha aumentado y desde cuándo.',
              'Si ha ganado peso en poco tiempo.',
              'Cuánto podía caminar antes y cuánto puede ahora.',
              'Tratamiento habitual y adherencia: si dejó de tomarlo, si cambió la dosis o si se quedó sin medicación.',
              'Consumo de sal y de líquidos en los últimos días.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Desencadenantes frecuentes que conviene buscar',
            items: [
              'Abandono o cambio reciente del tratamiento.',
              'Exceso de sal o de líquidos.',
              'Infección intercurrente.',
              'Arritmia de aparición reciente.',
              'Isquemia miocárdica.',
              'Anemia o enfermedad renal descompensada.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La clasificación crónica no es un algoritmo de urgencia', texto: 'Los sistemas que gradúan la limitación funcional de un paciente con insuficiencia cardiaca sirven para el seguimiento clínico, no para decidir en la calle. En la ambulancia lo que ordena la conducta es cuánto se ha alejado el paciente de su situación habitual y qué banderas rojas presenta.' },
        ],
      },
      {
        titulo: 'Banderas rojas y soporte',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que convierte el cuadro en prioritario',
            items: [
              'Dificultad respiratoria intensa o que empeora con rapidez.',
              'Incapacidad de tolerar el decúbito.',
              'Alteración del estado mental.',
              'Signos de hipoperfusión: piel fría, moteada, relleno capilar lento.',
              'Hipotensión o descenso de la presión durante la atención.',
              'Dolor torácico de características isquémicas asociado.',
              'Arritmia percibida o detectada durante la atención.',
            ],
          },
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Soporte prehospitalario',
            items: [
              'Permitir la posición en que el paciente respira mejor; no forzar el decúbito.',
              'Oxigenoterapia únicamente conforme al protocolo del servicio, titulada a la respuesta.',
              'Monitorización conforme al equipo de la unidad y al alcance autorizado.',
              'Vigilancia de la perfusión además de la respiración: este cuadro puede evolucionar a compromiso circulatorio.',
              'Prudencia con los líquidos: aportar volumen a un paciente congestivo sin indicación puede agravarlo, y la decisión corresponde al protocolo.',
              'Ventilación con presión positiva no invasiva y medicación solo si constan equipo, competencia, indicación respaldada y protocolo.',
              'Traslado con prealerta transmitiendo la combinación de congestión y estado de perfusión.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Relación con el tema de edema agudo de pulmón', texto: 'El edema pulmonar cardiogénico es la manifestación más grave de la congestión y tiene su propia lección en la unidad de urgencias respiratorias, con la misma guía rectora. Aquí se estudia el marco: qué es el fallo de bomba, cómo se descompensa y qué reconoce el prestador. No se repiten allí los contenidos ni se duplican aquí los de allí.' },
        ],
      },
      F([AHA_HF_2022, bibiano(36, 'Insuficiencia cardíaca aguda. Edema agudo de pulmón', 332), COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Insuficiencia cardiaca', definicion: 'Situación en que el corazón no bombea la sangre que el organismo necesita, o solo lo consigue a costa de presiones de llenado elevadas.' },
      { termino: 'Congestión', definicion: 'Acumulación de sangre por detrás del ventrículo que falla; hacia el pulmón produce disnea y crepitantes, y hacia el sistema ingurgitación yugular y edema.' },
      { termino: 'Bajo gasto', definicion: 'Llegada insuficiente de sangre a los tejidos; produce fatiga, intolerancia al esfuerzo, piel fría y, en casos graves, alteración del sensorio e hipotensión.' },
      { termino: 'Descompensación aguda', definicion: 'Empeoramiento agudo sobre una insuficiencia cardiaca crónica; es lo que suele motivar la llamada.' },
      { termino: 'Situación habitual del paciente', definicion: 'Referencia de almohadas, distancia caminada y peso que convierte una exploración aislada en una comparación útil.' },
      { termino: 'Desencadenante', definicion: 'Causa que precipita la descompensación: abandono del tratamiento, exceso de sal o líquidos, infección, arritmia, isquemia, anemia o enfermedad renal.' },
    ],
    flashcards: [
      { frente: '¿Cuáles son las dos consecuencias del fallo de bomba?', reverso: 'La congestión, por acumulación de sangre por detrás, y el bajo gasto, por llegada insuficiente por delante.' },
      { frente: '¿Van siempre juntas la congestión y la hipoperfusión?', reverso: 'No: puede haber congestión importante con buena perfusión, y congestión discreta con mala perfusión.' },
      { frente: '¿Qué preguntas revelan la situación habitual del paciente?', reverso: 'Cuántas almohadas usa, cuánto camina antes de detenerse y cuál es su peso de referencia.' },
      { frente: 'Nombra tres desencadenantes de descompensación.', reverso: 'Abandono del tratamiento, exceso de sal o líquidos e infección intercurrente; también arritmia, isquemia y anemia.' },
      { frente: '¿Sirve la clasificación funcional crónica para decidir en la calle?', reverso: 'No: en la ambulancia ordenan la conducta el alejamiento de la situación habitual y las banderas rojas.' },
      { frente: '¿Qué precaución rige con los líquidos?', reverso: 'Aportar volumen a un paciente congestivo sin indicación puede agravarlo; la decisión corresponde al protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente refiere que pasó de dormir con una almohada a necesitar tres en la última semana y ha ganado peso. ¿Qué describe?',
        opciones: [
          'Un problema respiratorio primario.',
          'Un empeoramiento de la congestión sobre su situación habitual, que es lo que suele motivar la llamada.',
          'Un cuadro de bajo gasto aislado.',
          'Una arritmia de aparición reciente.',
        ],
        correcta: 1,
        explicacion: 'La comparación con la situación habitual —almohadas, distancia caminada y peso— es lo que convierte la exploración en información útil.',
      },
      {
        pregunta: 'Paciente con crepitantes bilaterales evidentes, alerta, con piel caliente y buen relleno capilar. ¿Cómo lo describes?',
        opciones: [
          'Congestivo y mal perfundido.',
          'Congestivo con perfusión conservada: las dos consecuencias del fallo de bomba no van siempre juntas.',
          'En bajo gasto sin congestión.',
          'Sin datos de insuficiencia cardiaca.',
        ],
        correcta: 1,
        explicacion: 'Distinguir congestión de perfusión cambia la conducta y el mensaje al hospital, y por eso la valoración de la perfusión no se sustituye por la auscultación.',
      },
      {
        pregunta: 'Un compañero propone administrar líquidos porque el paciente «está hipotenso». Tiene edema, ingurgitación yugular y crepitantes. ¿Qué respondes?',
        opciones: [
          'Que adelante, la hipotensión siempre exige volumen.',
          'Que aportar volumen a un paciente congestivo sin indicación puede agravarlo, y la decisión corresponde al protocolo y a la dirección médica.',
          'Que primero debe administrarse oxígeno a alto flujo.',
          'Que la hipotensión descarta insuficiencia cardiaca.',
        ],
        correcta: 1,
        explicacion: 'La prudencia con los líquidos en el paciente congestivo es uno de los puntos expresos del soporte prehospitalario.',
      },
      {
        pregunta: '¿Para qué sirve la clasificación funcional crónica de la insuficiencia cardiaca?',
        opciones: [
          'Para decidir la conducta en la ambulancia.',
          'Para el seguimiento clínico; en la calle ordenan la conducta el alejamiento de la situación habitual y las banderas rojas.',
          'Para determinar la dosis de diurético.',
          'Para clasificar la congestión pulmonar.',
        ],
        correcta: 1,
        explicacion: 'Usar la clasificación crónica como algoritmo de emergencia es uno de los errores que la lección señala.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso: paciente con disnea de tres días, edema en ambas piernas que ha aumentado, ingurgitación yugular, piel caliente, alerta, presión conservada y relleno capilar normal. Clasifica «edema que ha aumentado».',
          opciones: [
            'Bajo gasto.',
            'Congestión.',
            'Dato inespecífico.',
            'Bandera roja que exige prealerta inmediata.',
          ],
          correcta: 1,
          explicacion: 'El edema y la ingurgitación yugular son manifestaciones de congestión hacia el sistema; la piel caliente y el relleno normal indican perfusión conservada.',
        },
        {
          pregunta: 'Mismo caso. El paciente refiere además fatiga intensa desde hace semanas y que ya no puede subir un piso. ¿En qué categoría entra ese dato?',
          opciones: [
            'Congestión.',
            'Bajo gasto: la fatiga y la intolerancia al esfuerzo traducen llegada insuficiente de sangre a los tejidos.',
            'Dato inespecífico sin valor.',
            'Signo de arritmia.',
          ],
          correcta: 1,
          explicacion: 'La fatiga y la intolerancia al esfuerzo figuran entre las manifestaciones del bajo gasto.',
        },
        {
          pregunta: 'Mismo caso. Refiere también que hace diez días dejó de tomar su medicación porque se le acabó. ¿Cómo clasificas ese dato?',
          opciones: [
            'Congestión.',
            'Desencadenante de la descompensación, que debe buscarse y transmitirse.',
            'Bajo gasto.',
            'Dato inespecífico que no cambia nada.',
          ],
          correcta: 1,
          explicacion: 'El abandono del tratamiento figura entre los desencadenantes frecuentes que conviene buscar en la historia dirigida.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA/ACC/HFSA 2022 (sección pendiente); Bibiano 3.ª ed., cap. 36',
      fuentes: [
        '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 36, p. 332.',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de la guía AHA/ACC/HFSA 2022 sobre '
          + 'insuficiencia cardiaca aguda descompensada.',
        'El edema agudo de pulmón cardiogénico NO se desarrolla aquí: tiene lección propia en la '
          + 'unidad de urgencias respiratorias con la misma guía rectora. Se declara el vínculo para '
          + 'evitar duplicación.',
        'No se nombra ningún fármaco ni se describe la ventilación no invasiva: se declaran '
          + 'condicionadas a equipo, competencia, indicación y protocolo.',
      ],
    }),
  },

  // ============================================================
  //  Hipertensión arterial
  // ============================================================
  'm4-card-hipertension': {
    icono: '🩺',
    duracion: '20 min',
    resumen: 'Por qué una cifra alta de presión no es por sí sola una urgencia, y qué distingue una '
      + 'medición elevada de un daño agudo de órgano que sí lo es.',
    objetivos: [
      'Medir la presión arterial en condiciones que hagan interpretable el resultado.',
      'Distinguir enfermedad crónica, medición aislada y presión severamente elevada.',
      'Reconocer las manifestaciones que indican daño agudo de órgano diana.',
      'Justificar por qué la conducta prehospitalaria no persigue un número.',
    ],
    secciones: [
      {
        titulo: 'Medir bien antes de interpretar',
        bloques: [
          { tipo: 'p', texto: 'Una cifra de presión arterial solo significa algo si se obtuvo en condiciones que permitan interpretarla. En la calle esas condiciones rara vez son ideales, y reconocerlo forma parte de la lectura.' },
          {
            tipo: 'lista',
            titulo: 'Qué hace interpretable una medición',
            items: [
              'Manguito de tamaño adecuado al brazo del paciente: uno pequeño sobreestima y uno grande subestima.',
              'Brazo apoyado y a la altura del corazón.',
              'Paciente en reposo el tiempo que las circunstancias permitan, sentado o en la posición que tolere.',
              'Ausencia, en la medida de lo posible, de dolor, esfuerzo, frío o agitación inmediatamente previos.',
              'Repetición de la medición: una cifra aislada informa mucho menos que dos separadas por unos minutos.',
              'Registro de la posición, el brazo y la hora en que se tomó.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El contexto de la escena eleva la presión', texto: 'Dolor, miedo, esfuerzo reciente y la propia presencia de una ambulancia elevan la presión de forma transitoria. Una única cifra alta obtenida en ese contexto no permite concluir que el paciente sea hipertenso, y desde luego no permite concluir que tenga una urgencia.' },
        ],
      },
      {
        titulo: 'Tres cosas distintas que se confunden',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Qué es cada una',
            headers: ['Situación', 'Qué significa', 'Qué exige'],
            filas: [
              ['Hipertensión arterial crónica', 'Enfermedad diagnosticada con mediciones repetidas a lo largo del tiempo y en condiciones controladas', 'Seguimiento clínico; no se diagnostica en una atención de urgencia'],
              ['Medición elevada aislada', 'Una cifra alta en un contexto que puede explicarla', 'Repetir, contextualizar y no tratar el número'],
              ['Presión severamente elevada SIN daño agudo', 'Cifras muy altas en un paciente sin manifestaciones de órgano diana', 'Valoración y seguimiento; el descenso brusco no protocolizado puede ser dañino'],
              ['Emergencia hipertensiva', 'Presión muy elevada CON daño agudo de órgano diana en curso', 'Ruta tiempo-dependiente por el síndrome que presenta, no por la cifra'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que separa las dos últimas no es la cifra', texto: 'Es la presencia de daño de órgano en curso. Dos pacientes con la misma presión pueden estar en situaciones completamente distintas: uno necesita valoración y seguimiento, y el otro es un paciente tiempo-dependiente. Esa distinción es el contenido central de esta lección.' },
        ],
      },
      {
        titulo: 'Buscar el daño de órgano',
        bloques: [
          { tipo: 'p', texto: 'Como el número no distingue, lo que distingue es la exploración dirigida. Se busca activamente si algún órgano está sufriendo ahora.' },
          {
            tipo: 'tabla',
            titulo: 'Qué buscar y qué sugiere',
            headers: ['Sistema', 'Qué se busca'],
            filas: [
              ['Neurológico', 'Déficit focal, alteración del estado mental, cefalea intensa de instauración brusca, alteración visual, convulsión'],
              ['Cardiaco', 'Dolor torácico de características isquémicas, disnea, signos de congestión aguda'],
              ['Aórtico', 'Dolor torácico o de espalda de inicio brusco e intensidad máxima, asimetría de pulsos'],
              ['Renal', 'Reducción marcada de la diuresis referida por el paciente'],
              ['Obstétrico', 'Embarazo o puerperio con cefalea, alteración visual, dolor epigástrico o en hipocondrio derecho'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El embarazo cambia por completo el cuadro', texto: 'La presión elevada en una paciente embarazada o en puerperio no se maneja con este esquema: corresponde al bloque obstétrico, donde se estudia la preeclampsia y la eclampsia con sus propias fuentes. Detectar el embarazo es, por tanto, parte de la evaluación de toda paciente con presión elevada en edad fértil.' },
          {
            tipo: 'lista',
            titulo: 'Historia que orienta',
            items: [
              'Tratamiento antihipertensivo habitual y si lo ha tomado; el abandono es una causa frecuente.',
              'Consumo de sustancias estimulantes.',
              'Dolor no controlado, que eleva la presión y se resuelve tratando el dolor.',
              'Retención urinaria, que puede elevar la presión de forma llamativa.',
              'Ansiedad o crisis de angustia, que no se asumen sin descartar lo demás.',
            ],
          },
        ],
      },
      {
        titulo: 'Conducta: tratar al paciente, no al número',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Medir bien y repetir; registrar posición, brazo y hora.',
              'Buscar activamente manifestaciones de daño de órgano en los cinco sistemas anteriores.',
              'Descartar y tratar, dentro del alcance, causas que elevan la presión de forma reversible, como el dolor.',
              'En paciente embarazada o en puerperio, aplicar la ruta obstétrica.',
              'Si hay un síndrome tiempo-dependiente, trasladar por ese síndrome con prealerta.',
              'Si no lo hay, trasladar o derivar conforme al protocolo, sin perseguir un descenso de la cifra.',
              'Reevaluar y registrar la evolución de la presión y de los síntomas.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Por qué no se baja la presión de forma brusca', texto: 'Un organismo que lleva tiempo funcionando con presiones altas adapta el flujo de sus órganos a esa situación. Bajar la presión de golpe y sin indicación puede reducir el flujo por debajo de lo que esos órganos toleran, y producir daño en vez de evitarlo. Cualquier intervención sobre la presión exige indicación respaldada por la guía vigente, producto con Información para Prescribir, competencia y protocolo con dirección médica.' },
        ],
      },
      F([AHA_HBP_2025, bibiano(37, 'Urgencia y emergencia hipertensiva', 340), COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Medición interpretable', definicion: 'La obtenida con manguito adecuado, brazo apoyado a la altura del corazón, reposo posible y repetición, con registro de posición, brazo y hora.' },
      { termino: 'Hipertensión arterial crónica', definicion: 'Enfermedad diagnosticada con mediciones repetidas en el tiempo y en condiciones controladas; no se diagnostica en una atención de urgencia.' },
      { termino: 'Presión severamente elevada sin daño agudo', definicion: 'Cifras muy altas en un paciente sin manifestaciones de órgano diana; el descenso brusco no protocolizado puede ser dañino.' },
      { termino: 'Emergencia hipertensiva', definicion: 'Presión muy elevada con daño agudo de órgano diana en curso; el paciente es tiempo-dependiente por el síndrome que presenta, no por la cifra.' },
      { termino: 'Daño de órgano diana', definicion: 'Afectación aguda neurológica, cardiaca, aórtica, renal u obstétrica que se busca activamente en la exploración.' },
      { termino: 'Causas reversibles de elevación', definicion: 'Dolor, retención urinaria, consumo de estimulantes, abandono del tratamiento y ansiedad; algunas se resuelven tratando la causa.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue una presión severamente elevada de una emergencia hipertensiva?', reverso: 'La presencia de daño agudo de órgano diana en curso, no la cifra.' },
      { frente: '¿Puede diagnosticarse hipertensión crónica en una atención de urgencia?', reverso: 'No: exige mediciones repetidas en el tiempo y en condiciones controladas.' },
      { frente: '¿Qué error produce un manguito demasiado pequeño?', reverso: 'Sobreestima la presión; uno demasiado grande la subestima.' },
      { frente: '¿Por qué no se baja la presión de forma brusca?', reverso: 'Porque el organismo adaptado a presiones altas puede sufrir una caída del flujo por debajo de lo que sus órganos toleran.' },
      { frente: '¿Qué hacer ante presión elevada en una paciente embarazada?', reverso: 'Aplicar la ruta obstétrica: corresponde al bloque de preeclampsia y eclampsia, con sus propias fuentes.' },
      { frente: 'Nombra dos causas reversibles de presión elevada.', reverso: 'El dolor no controlado y la retención urinaria; también el abandono del tratamiento y los estimulantes.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con cifras muy elevadas, asintomático, exploración neurológica y cardiaca normales. ¿Cuál es la conducta?',
        opciones: [
          'Administrar un antihipertensivo para bajar la cifra antes de trasladar.',
          'Valorar, repetir la medición, buscar daño de órgano y trasladar o derivar conforme al protocolo, sin perseguir un descenso de la cifra.',
          'Dejarlo en domicilio sin más indicaciones.',
          'Considerarlo una emergencia hipertensiva por el valor obtenido.',
        ],
        correcta: 1,
        explicacion: 'Sin daño agudo de órgano, el descenso brusco no protocolizado puede ser dañino; la conducta trata al paciente, no al número.',
      },
      {
        pregunta: 'Mismo valor de presión, pero el paciente presenta déficit focal de aparición reciente. ¿Qué cambia?',
        opciones: [
          'Nada: la conducta depende de la cifra.',
          'Todo: hay daño agudo de órgano en curso, y el paciente es tiempo-dependiente por el síndrome neurológico que presenta.',
          'Solo la necesidad de repetir la medición.',
          'Que debe medirse en el otro brazo.',
        ],
        correcta: 1,
        explicacion: 'Lo que separa la presión severamente elevada de la emergencia hipertensiva es la presencia de daño de órgano, no la cifra.',
      },
      {
        pregunta: 'Mujer de 30 años, embarazada de 32 semanas, con presión elevada y cefalea. ¿Cómo procedes?',
        opciones: [
          'Aplicar el mismo esquema que en el paciente no embarazado.',
          'Aplicar la ruta obstétrica: el cuadro corresponde al bloque de preeclampsia y eclampsia, con sus propias fuentes.',
          'Descartar cualquier urgencia por su edad.',
          'Repetir la medición en tres ocasiones antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'El embarazo cambia por completo el cuadro, y por eso detectarlo es parte de la evaluación de toda paciente con presión elevada en edad fértil.',
      },
      {
        pregunta: 'Obtienes una sola cifra alta en un paciente con dolor intenso tras una caída. ¿Qué concluyes?',
        opciones: [
          'Que el paciente es hipertenso crónico.',
          'Que el contexto —dolor, miedo y esfuerzo— puede explicarla; se repite, se contextualiza y se trata el dolor dentro del alcance.',
          'Que se trata de una emergencia hipertensiva.',
          'Que debe administrarse un antihipertensivo de inmediato.',
        ],
        correcta: 1,
        explicacion: 'Una única cifra alta en ese contexto no permite concluir hipertensión crónica ni urgencia; el dolor es una causa reversible de elevación.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso 1: varón de 60 años, cifras muy altas, sin síntomas, exploración normal, refiere que se le acabó su medicación hace una semana. Clasifícalo.',
          opciones: [
            'Emergencia hipertensiva.',
            'Presión severamente elevada sin daño agudo, con una causa reversible identificada: el abandono del tratamiento.',
            'Medición elevada aislada por contexto de la escena.',
            'Hipertensión crónica recién diagnosticada.',
          ],
          correcta: 1,
          explicacion: 'No hay manifestaciones de órgano diana; el abandono del tratamiento figura entre las causas que conviene buscar y transmitir.',
        },
        {
          pregunta: 'Caso 2: mujer de 55 años con dolor torácico de inicio brusco irradiado a la espalda, presión muy elevada y pulsos asimétricos. ¿Qué prioridad de traslado establece?',
          opciones: [
            'Traslado ordinario para control de la presión.',
            'Ruta tiempo-dependiente por sospecha de daño aórtico agudo, con prealerta.',
            'Derivación a consulta para ajuste de tratamiento.',
            'Observación domiciliaria y repetición de la medición en una hora.',
          ],
          correcta: 1,
          explicacion: 'El dolor de inicio brusco irradiado a la espalda con asimetría de pulsos es lo que la lección enseña a buscar en el sistema aórtico.',
        },
        {
          pregunta: 'Caso 3: varón de 40 años que acaba de discutir, refiere ansiedad, presión elevada en una sola toma, sin síntomas ni hallazgos. ¿Cuál es el siguiente paso más correcto?',
          opciones: [
            'Registrar hipertensión arterial como diagnóstico.',
            'Repetir la medición tras unos minutos en mejores condiciones y buscar daño de órgano antes de interpretar la cifra.',
            'Administrar un antihipertensivo por precaución.',
            'Descartar cualquier problema por tratarse de ansiedad.',
          ],
          correcta: 1,
          explicacion: 'Una cifra aislada informa mucho menos que dos separadas por unos minutos, y la ansiedad no se asume sin descartar lo demás.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA/ACC 2025 High Blood Pressure (tabla de categorías pendiente); Bibiano 3.ª ed., cap. 37',
      fuentes: [
        '2025 AHA/ACC Multisociety Guideline for High Blood Pressure in Adults (tabla de categorías pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 37, p. 340.',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la tabla de categorías y las cifras de corte de la guía '
          + 'AHA/ACC 2025, de acceso restringido. La lección cumple la condición registrada de esa '
          + 'fuente —distinguir crónica de severamente elevada con daño agudo— sin publicar cifras.',
        'No se publica ningún umbral numérico ni objetivo de descenso, y se declara expresamente por '
          + 'qué el descenso brusco no protocolizado puede ser dañino.',
        'La hipertensión del embarazo se remite al bloque obstétrico y NO se maneja con este esquema.',
      ],
    }),
  },
}
