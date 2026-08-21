// ============================================================
//  Módulo 4 · Urgencias gineco-obstétricas (primera parte)
// ------------------------------------------------------------
//  Primeros seis temas de la unidad, en el orden del PDF: exploración
//  ginecológica dirigida, cambios fisiológicos en el embarazo, atención al
//  trabajo de parto, atención a parto distócico, sufrimiento fetal agudo y
//  hemorragia del segundo y tercer trimestre.
//
//  El título oficial de la unidad en el PDF es «URGNCIAS GINECO-OBSTÉTRICAS»,
//  errata documental que se conserva en la transcripción oficial y se corrige
//  únicamente en el título visible.
//
//  Pauta temática: `docs/GUIA-REDACCION-M4-RESTANTE.md`. Fuentes asignadas por
//  el registro para `m4-urgencias-gineco-obstetricas`: WHO maternal 2025, WHO
//  obstetricia, WHO intraparto 2018, WHO HPP 2025, WHO aborto 2022, NICE NG126
//  y ACOG 783; AHA/AAP neonatal 2025; requiere protocolo local.
//
//  DOS PROHIBICIONES QUE GOBIERNAN TODA LA UNIDAD
//
//  1. No se enseña tacto vaginal ni especuloscopia prehospitalarios. En una
//     hemorragia del segundo o tercer trimestre el tacto puede agravar el
//     sangrado, y en el resto de los cuadros no cambia la conducta de campo.
//  2. No se inventa ninguna maniobra obstétrica. Las maniobras para las
//     complicaciones del parto exigen formación específica, competencia
//     acreditada y protocolo con dirección médica; describirlas aquí sería
//     autorizar de hecho lo que la lección no puede autorizar.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const WHO_MATERNAL_2025 = {
  nombre: 'World Health Organization. Recommendations on Maternal Health, 2.ª edición, 2025.',
  url: 'https://www.who.int/westernpacific/publications/i/item/9789240080591',
  nota: 'Compendio de recomendaciones de la OMS sobre salud materna. PENDIENTE: sección exacta; no se '
    + 'consultó el texto completo al redactar y no sostiene ninguna cifra de esta unidad.',
}
const WHO_OBSTETRICIA = {
  nombre: 'World Health Organization. Managing Complications in Pregnancy and Childbirth, 2.ª edición.',
  url: 'https://www.who.int/publications/i/item/9789241565493',
  nota: 'Manual de la OMS sobre complicaciones del embarazo y el parto. PENDIENTE: sección y página '
    + 'exactas; no se consultó el texto completo al redactar.',
}
const WHO_INTRAPARTO_2018 = {
  nombre: 'World Health Organization. Recommendations: Intrapartum Care for a Positive Childbirth '
    + 'Experience, 2018.',
  url: 'https://www.who.int/publications/i/item/WHO-RHR-18.12',
  nota: 'Guía rectora de la atención durante el parto, incluida la atención respetuosa. PENDIENTE: '
    + 'sección exacta; no se consultó el texto completo al redactar.',
}
const AHA_NEONATAL_2025 = {
  nombre: 'AHA/AAP 2025 Neonatal Resuscitation.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation',
  nota: 'Guía rectora de la atención del recién nacido. Se cita solo por los primeros minutos tras el '
    + 'nacimiento. PENDIENTE: sección exacta; la reanimación neonatal se desarrolla en el Módulo 6.',
}

const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})
const aaos = (cap, titulo, pagina) => ({
  nombre: `American Academy of Orthopaedic Surgeons (Elling B., Elling K. M. y Rothenberg M. A.). `
    + `Anatomía y fisiología enfocada a la atención prehospitalaria y urgencias médicas, Editorial `
    + `Millas. Capítulo ${cap}, «${titulo}», p. ${pagina}.`,
  nota: 'Obra de orientación prehospitalaria de la biblioteca de la academia. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026. Sostiene la estructura y la función, no la '
    + 'conducta clínica.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ninguna dosis, cifra de presión, frecuencia fetal ni volumen de '
  + 'sangrado. Las guías rectoras no se consultaron en su texto y toda medicación obstétrica depende '
  + 'del protocolo obstétrico del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocimiento, gravedad, estabilización, reevaluación y '
  + 'destino. No se trasladan al campo pruebas ni tratamientos hospitalarios y la impresión de campo '
  + 'no se presenta como diagnóstico.'
const NO_TACTO = 'PROHIBICIÓN DE UNIDAD: no se enseña tacto vaginal ni especuloscopia '
  + 'prehospitalarios. En la hemorragia del segundo y tercer trimestre el tacto puede agravar el '
  + 'sangrado, y en el resto de los cuadros no cambia la conducta de campo.'
const NO_MANIOBRAS = 'PROHIBICIÓN DE UNIDAD: no se inventa ni se describe ninguna maniobra '
  + 'obstétrica. Las maniobras para las complicaciones del parto exigen formación específica, '
  + 'competencia acreditada y protocolo con dirección médica.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás cifras de presión, frecuencias fetales, volúmenes de sangrado ni dosis. '
    + 'Una cifra clínica solo se publica cuando constan su población, su indicación, la edición de la '
    + 'guía que la sostiene y el protocolo que la autoriza. En obstetricia hay además una razón '
    + 'añadida: casi toda intervención depende de un protocolo obstétrico específico que la academia '
    + 'todavía no ha entregado. Lo que sí se enseña es reconocer la gravedad, sostener a la paciente y '
    + 'decidir el destino.',
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
    NO_TACTO,
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Exploración ginecológica dirigida
  // ============================================================
  'm4-gyn-exploracion': {
    icono: 'cp-smart-utero',
    duracion: '20 min',
    resumen: 'Cómo se entrevista y se explora a una paciente con un motivo ginecológico u obstétrico de '
      + 'forma respetuosa, y qué banderas rojas hay que detectar sin recurrir a maniobras invasivas.',
    objetivos: [
      'Conducir una entrevista respetuosa que preserve la privacidad y el consentimiento.',
      'Recoger la historia obstétrica y ginecológica esencial.',
      'Realizar la exploración pertinente sin maniobras invasivas.',
      'Priorizar las banderas rojas que cambian el destino y la prioridad.',
    ],
    secciones: [
      {
        titulo: 'Antes de preguntar nada',
        bloques: [
          { tipo: 'p', texto: 'Este es el bloque del temario donde las condiciones de la entrevista influyen más en la calidad de la información. Una paciente que no se siente segura omite datos, y los datos que omite suelen ser precisamente los que deciden la conducta: un embarazo que no ha contado a nadie, un sangrado que atribuye a otra cosa, una agresión.' },
          {
            tipo: 'lista',
            titulo: 'Condiciones que hacen posible una entrevista útil',
            items: [
              'Presentarse, explicar qué se va a preguntar y por qué es necesario.',
              'Pedir consentimiento antes de cualquier exploración y respetar la negativa.',
              'Buscar la mayor privacidad que la escena permita: retirar a los curiosos y cubrir a la paciente.',
              'Ofrecer la presencia de un acompañante de su elección, y también la posibilidad de hablar a solas.',
              'Preguntar a solas al menos una vez cuando haya acompañantes: hay información que no se dice delante de terceros.',
              'Usar lenguaje neutro y no estigmatizante, sin juicios sobre decisiones reproductivas ni sobre la vida sexual.',
              'Explicar cada paso antes de hacerlo y detenerse si la paciente lo pide.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Atención informada por el trauma', texto: 'Una proporción de las pacientes ha sufrido violencia sexual o experiencias médicas traumáticas previas. Anunciar lo que se va a hacer, pedir permiso, evitar exposiciones innecesarias y aceptar una negativa sin insistir no son gestos de cortesía: son medidas que evitan revictimizar y que, en la práctica, consiguen más información clínica que la insistencia.' },
        ],
      },
      {
        titulo: 'La historia que hay que recoger',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Historia obstétrica y ginecológica',
            items: [
              'Fecha de la última menstruación y si fue normal en cantidad y duración.',
              'Posibilidad de embarazo: se pregunta siempre a toda paciente en edad fértil, sea cual sea el motivo.',
              'Si está embarazada: semanas de gestación estimadas, controles realizados y problemas conocidos en este embarazo.',
              'Embarazos y partos previos, y cómo terminaron.',
              'Cesáreas o cirugías uterinas anteriores.',
              'Uso de método anticonceptivo y cuál.',
              'Tratamientos habituales y alergias.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'El motivo actual',
            items: [
              'Dolor: dónde, desde cuándo, cómo empezó, qué lo cambia y hacia dónde se irradia.',
              'Sangrado: desde cuándo, cuánto, con qué lo compara, si hay coágulos o tejido.',
              'Salida de líquido: cuándo, cuánto, de qué color y con qué olor.',
              'Contracciones: desde cuándo, cada cuánto y cuánto duran.',
              'Movimientos fetales: si los percibe como habitualmente, si han disminuido y desde cuándo.',
              'Fiebre, vómito, mareo o desmayo asociados.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La pregunta que no puede omitirse', texto: 'La posibilidad de embarazo se pregunta a toda paciente en edad fértil, aunque el motivo de la llamada parezca ajeno. Un embarazo desconocido cambia el significado de un dolor abdominal, de un síncope y de un cuadro de shock, y no preguntarlo es una de las omisiones que más veces se lamentan en esta unidad.' },
        ],
      },
      {
        titulo: 'Qué se explora y qué no',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Exploración pertinente',
            items: [
              'Estado general, nivel de respuesta y estado de perfusión.',
              'Signos vitales, con atención a la tendencia más que a un valor aislado.',
              'Exploración abdominal en su orden, valorando dolor, defensa y, en la embarazada, el tono uterino y la altura del útero.',
              'Inspección externa únicamente cuando sea necesaria para valorar un sangrado o un nacimiento inminente, con la privacidad máxima posible.',
              'Cantidad de sangrado estimada por lo que se observa: apósitos, ropa, superficie.',
              'Búsqueda de lesiones si hay antecedente traumático o sospecha de agresión.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que NO se hace en la ambulancia', texto: 'No se realiza tacto vaginal ni exploración con espéculo. En una hemorragia del segundo o tercer trimestre el tacto puede agravar el sangrado, y en los demás cuadros no aporta información que cambie la conducta prehospitalaria. La exploración se limita a lo externo y a lo necesario.' },
          { tipo: 'p', texto: 'Si la paciente refiere una agresión sexual, la conducta cambia: además de la atención clínica hay implicaciones de preservación de indicios y de acompañamiento que dependen del procedimiento del servicio y del marco jurídico aplicable. Esta lección no los detalla y remite al bloque médico-legal y al protocolo, pero sí establece el principio: no se retira ropa ni se limpia a la paciente más allá de lo que exija su atención.' },
        ],
      },
      {
        titulo: 'Banderas rojas y prioridad',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'lista',
            titulo: 'Lo que convierte el cuadro en prioritario',
            items: [
              'Signos de hipoperfusión: piel fría, pálida o moteada, relleno capilar lento, taquicardia mantenida.',
              'Sangrado abundante o que continúa.',
              'Dolor abdominal intenso en una paciente con embarazo posible.',
              'Síncope o mareo importante.',
              'Alteración del estado mental.',
              'Cefalea intensa, alteración visual o dolor en el hipocondrio derecho en una embarazada.',
              'Convulsión en una embarazada o en el puerperio.',
              'Disminución o ausencia de movimientos fetales referida por la paciente.',
              'Nacimiento inminente o cualquier complicación durante el parto.',
              'Fiebre con afectación del estado general.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La embarazada compensa y luego cae', texto: 'Como se estudia en la lección de cambios fisiológicos, una embarazada puede mantener sus signos vitales aparentemente normales pese a una pérdida importante, porque su organismo dispone de más volumen y compensa mejor. Cuando esos signos se alteran, la situación ya está avanzada. Por eso en esta unidad se actúa por el conjunto del cuadro y no se espera a que las cifras cambien.' },
        ],
      },
      F([WHO_MATERNAL_2025, WHO_OBSTETRICIA, bibiano(118, 'Urgencias ginecológicas', 1050)]),
    ],
    conceptosClave: [
      { termino: 'Atención informada por el trauma', definicion: 'Forma de atender que anuncia cada paso, pide permiso, evita exposiciones innecesarias y acepta la negativa; evita revictimizar y obtiene más información.' },
      { termino: 'Entrevista a solas', definicion: 'Momento sin acompañantes que se ofrece al menos una vez, porque hay información que no se dice delante de terceros.' },
      { termino: 'Embarazo posible', definicion: 'Pregunta obligada a toda paciente en edad fértil, sea cual sea el motivo, porque cambia el significado del dolor, el síncope y el shock.' },
      { termino: 'Exploración externa', definicion: 'Límite de la exploración prehospitalaria en esta unidad: no incluye tacto vaginal ni especuloscopia.' },
      { termino: 'Compensación de la embarazada', definicion: 'Capacidad de mantener signos vitales aparentemente normales pese a una pérdida importante; cuando se alteran, la situación ya está avanzada.' },
    ],
    flashcards: [
      { frente: '¿Por qué se ofrece hablar a solas con la paciente?', reverso: 'Porque hay información —embarazos no comunicados, agresiones, sangrados atribuidos a otra cosa— que no se dice delante de terceros.' },
      { frente: '¿A quién se le pregunta por la posibilidad de embarazo?', reverso: 'A toda paciente en edad fértil, sea cual sea el motivo de la llamada.' },
      { frente: '¿Se realiza tacto vaginal en la ambulancia?', reverso: 'No: en la hemorragia del segundo y tercer trimestre puede agravar el sangrado y en los demás cuadros no cambia la conducta.' },
      { frente: '¿Qué es la atención informada por el trauma?', reverso: 'Anunciar cada paso, pedir permiso, evitar exposiciones innecesarias y aceptar la negativa sin insistir.' },
      { frente: '¿Por qué no se espera a que cambien las cifras en una embarazada?', reverso: 'Porque compensa mejor: cuando sus signos vitales se alteran, la situación ya está avanzada.' },
      { frente: 'Nombra tres banderas rojas de esta unidad.', reverso: 'Sangrado abundante, dolor abdominal intenso con embarazo posible y convulsión en embarazada o puerperio.' },
    ],
    quiz: [
      {
        pregunta: 'Una paciente de 24 años consulta por dolor abdominal. Su pareja está presente y responde por ella. ¿Qué haces?',
        opciones: [
          'Aceptar la información de la pareja para agilizar.',
          'Ofrecer al menos una vez hablar a solas con la paciente: hay información que no se dice delante de terceros.',
          'Pedir a la pareja que se retire de forma tajante.',
          'Posponer la entrevista hasta llegar al hospital.',
        ],
        correcta: 1,
        explicacion: 'La entrevista a solas es una de las condiciones que hacen posible una entrevista útil.',
      },
      {
        pregunta: 'Paciente de 30 años con síncope y dolor abdominal. Dice que no cree estar embarazada. ¿Qué valor tiene esa respuesta?',
        opciones: [
          'Descarta el embarazo y permite orientar a otra causa.',
          'No lo descarta: la posibilidad de embarazo se considera en toda paciente en edad fértil, porque cambia el significado del dolor y del síncope.',
          'Obliga a realizar un tacto vaginal para comprobarlo.',
          'Solo importa si refiere retraso menstrual.',
        ],
        correcta: 1,
        explicacion: 'Un embarazo desconocido cambia el significado de un dolor abdominal, de un síncope y de un cuadro de shock.',
      },
      {
        pregunta: 'Embarazada de 30 semanas con sangrado. Un compañero propone un tacto vaginal para valorar el origen. ¿Qué respondes?',
        opciones: [
          'Que adelante, con guantes estériles.',
          'Que no se realiza: en la hemorragia del segundo y tercer trimestre el tacto puede agravar el sangrado.',
          'Que se haga solo si el sangrado es escaso.',
          'Que lo realice el compañero con más experiencia.',
        ],
        correcta: 1,
        explicacion: 'Es una de las dos prohibiciones que gobiernan toda la unidad.',
      },
      {
        pregunta: 'Una embarazada con sangrado importante mantiene signos vitales aparentemente normales. ¿Qué significa?',
        opciones: [
          'Que la pérdida ha sido pequeña.',
          'Que puede estar compensando: cuando sus signos se alteran la situación ya está avanzada, por lo que se actúa por el conjunto del cuadro.',
          'Que debe repetirse la medición en veinte minutos.',
          'Que puede trasladarse sin prioridad.',
        ],
        correcta: 1,
        explicacion: 'La embarazada dispone de más volumen y compensa mejor; esperar a que cambien las cifras retrasa la atención.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Estás con una paciente de 19 años que refiere dolor abdominal y sangrado, acompañada de su madre. ¿Cuál es la primera acción que construye una entrevista respetuosa?',
          opciones: [
            'Preguntar directamente por su actividad sexual delante de la madre.',
            'Presentarse, explicar qué se va a preguntar y por qué, y buscar la mayor privacidad que la escena permita.',
            'Pedir a la madre que abandone la casa.',
            'Iniciar la exploración externa sin preguntar.',
          ],
          correcta: 1,
          explicacion: 'Presentarse, explicar y preservar la privacidad son las condiciones iniciales que hacen posible una entrevista útil.',
        },
        {
          pregunta: 'La paciente accede a hablar a solas y refiere un embarazo que no ha comunicado a su familia, con dolor intenso desde hace dos horas. ¿Qué bandera roja prioriza?',
          opciones: [
            'La fecha de la última menstruación.',
            'El dolor abdominal intenso en una paciente con embarazo posible, que figura entre las banderas rojas de la unidad.',
            'El uso de método anticonceptivo.',
            'El antecedente de cesárea.',
          ],
          correcta: 1,
          explicacion: 'El dolor abdominal intenso con embarazo posible es una de las banderas rojas que cambian la prioridad.',
        },
        {
          pregunta: 'La paciente pide que no la exploren delante de su madre y rechaza descubrirse. ¿Cómo procedes?',
          opciones: [
            'Insistir, porque la exploración es necesaria.',
            'Aceptar la negativa sin insistir, preservar la privacidad y limitar la exploración a lo externo y necesario, explicando cada paso.',
            'Realizar la exploración de todos modos por seguridad clínica.',
            'Suspender toda la atención hasta llegar al hospital.',
          ],
          correcta: 1,
          explicacion: 'Aceptar una negativa sin insistir forma parte de la atención informada por el trauma y, en la práctica, obtiene más información que la insistencia.',
        },
      ],
    },
    revision: ficha({
      version: 'WHO Maternal Health 2025 y WHO Managing Complications (secciones pendientes); Bibiano 3.ª ed., cap. 118',
      fuentes: [
        'WHO. Recommendations on Maternal Health, 2.ª ed., 2025 (sección pendiente).',
        'WHO. Managing Complications in Pregnancy and Childbirth, 2.ª ed. (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 118, p. 1050.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las guías de la OMS.',
        'La conducta ante agresión sexual se enuncia como principio y se remite al bloque médico-legal '
          + 'del Módulo 1 y al procedimiento del servicio; no se detalla aquí.',
        'DECISIÓN PENDIENTE: la academia debe declarar su procedimiento ante sospecha de agresión '
          + 'sexual y su política de acompañamiento y privacidad en la atención.',
      ],
    }),
  },

  // ============================================================
  //  Cambios fisiológicos en el embarazo
  // ============================================================
  'm4-gyn-cambios-embarazo': {
    icono: 'ic-feto-utero',
    duracion: '20 min',
    resumen: 'Qué cambia en el organismo durante el embarazo y qué consecuencia tiene cada uno de esos '
      + 'cambios sobre la forma de evaluar y de trasladar a una paciente.',
    objetivos: [
      'Describir los cambios cardiovasculares, respiratorios, hematológicos y digestivos del embarazo.',
      'Relacionar cada cambio con su implicación en la evaluación prehospitalaria.',
      'Explicar la compresión aortocava y su corrección postural.',
      'Justificar por qué los valores de referencia habituales se interpretan de otra manera.',
    ],
    secciones: [
      {
        titulo: 'El embarazo cambia el punto de partida',
        bloques: [
          { tipo: 'p', texto: 'Durante el embarazo el organismo se adapta para sostener a dos. Esas adaptaciones son normales, pero desplazan el punto de partida de casi todo lo que se valora, de modo que un hallazgo que sería anormal en otra persona puede ser esperable aquí, y al revés.' },
          {
            tipo: 'tabla',
            titulo: 'Cambio y consecuencia para el prestador',
            headers: ['Sistema', 'Qué cambia', 'Qué implica al evaluar'],
            filas: [
              ['Cardiovascular', 'Aumentan el volumen de sangre y el gasto cardiaco; la frecuencia cardiaca tiende a subir y la presión arterial tiende a descender en la parte media del embarazo', 'Los signos vitales habituales se interpretan de otro modo; una cifra «normal» puede ser anormal para esa paciente'],
              ['Hematológico', 'El volumen de plasma aumenta más que los glóbulos rojos, y hay mayor tendencia a la coagulación', 'La paciente tolera mejor una pérdida inicial, pero el riesgo de trombosis es mayor'],
              ['Respiratorio', 'Aumenta el volumen movilizado y disminuye la reserva de aire en el pulmón; el útero eleva el diafragma', 'La reserva de oxígeno es menor: la paciente se dessatura antes ante cualquier problema respiratorio'],
              ['Digestivo', 'El vaciamiento gástrico se enlentece y el esfínter esofágico es menos competente', 'Mayor riesgo de vómito y de broncoaspiración'],
              ['Anatómico', 'El útero crece y desplaza las vísceras abdominales hacia arriba', 'La exploración abdominal se interpreta distinto y las referencias habituales se desplazan'],
              ['Urinario', 'Aumenta la filtración y hay mayor riesgo de infección urinaria', 'Una infección urinaria en el embarazo se considera complicada'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se publican valores «normales del embarazo»', texto: 'Las cifras de referencia varían con las semanas de gestación, con la paciente y con la fuente. Enseñar un número como si fuera universal produce el error contrario al que se pretende evitar. Lo que sí se enseña es la DIRECCIÓN del cambio —qué tiende a subir y qué tiende a bajar— y la obligación de comparar con la propia paciente y con su tendencia.' },
        ],
      },
      {
        titulo: 'Dos consecuencias que cambian la conducta',
        bloques: [
          { tipo: 'p', texto: 'De todos los cambios anteriores, dos tienen una traducción práctica inmediata y conviene tratarlos aparte.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Primera: la reserva de oxígeno es menor', texto: 'El útero eleva el diafragma y reduce el volumen de aire que queda en el pulmón al final de una espiración normal, que es la reserva de la que dispone el organismo cuando algo interrumpe la ventilación. Al mismo tiempo, el consumo de oxígeno es mayor. La consecuencia es directa: una embarazada se desatura antes que otra persona ante el mismo problema, y cualquier situación que comprometa su vía aérea o su ventilación es más urgente.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Segunda: la compresión aortocava', texto: 'En el embarazo avanzado, con la paciente acostada boca arriba, el peso del útero comprime los grandes vasos que discurren por detrás. Eso reduce el retorno de sangre al corazón y puede producir hipotensión, palidez y malestar que se corrigen simplemente cambiando la posición. Es una causa de deterioro que se produce por cómo colocamos a la paciente, y por eso se previene de forma sistemática.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se previene',
            items: [
              'Evitar el decúbito supino prolongado en el embarazo avanzado.',
              'Inclinar a la paciente hacia su lado izquierdo, o desplazar el útero manualmente hacia ese lado si no puede inclinarse.',
              'Mantener esa precaución también sobre la camilla y durante el traslado.',
              'Si hay sospecha de lesión de columna, la inclinación se consigue con la técnica que autorice el protocolo, sin comprometer la inmovilización.',
            ],
          },
          { tipo: 'p', texto: 'Conviene notar que la hipotensión por compresión aortocava puede confundirse con un shock por otra causa. La diferencia es que mejora al cambiar la posición, y comprobarlo forma parte de la evaluación.' },
        ],
      },
      {
        titulo: 'Consecuencias en la evaluación',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'lista',
            titulo: 'Cómo se traduce todo lo anterior',
            items: [
              'Se prioriza la oxigenación y la protección de la vía aérea, por la menor reserva y el mayor riesgo de broncoaspiración.',
              'Se evita el decúbito supino prolongado y se corrige la posición de forma sistemática.',
              'Se interpreta la tendencia de los signos vitales, no un valor aislado.',
              'Se recuerda que la paciente compensa mejor una pérdida inicial y se descompensa después de forma más brusca.',
              'Se considera la trombosis entre las causas posibles de disnea o dolor torácico.',
              'Se valora que hay dos pacientes, y que la mejor forma de atender al feto es estabilizar a la madre.',
              'Se registran las semanas de gestación estimadas, porque casi todo lo anterior depende de ellas.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Estabilizar a la madre es atender al feto', texto: 'Es el principio que ordena toda la atención obstétrica de urgencia. El feto depende por completo de la circulación y la oxigenación maternas: no existe una intervención prehospitalaria que lo beneficie por encima de mantener a la madre bien oxigenada y bien perfundida. Por eso la evaluación se organiza como en cualquier otro paciente, con las adaptaciones de esta lección.' },
        ],
      },
      F([WHO_MATERNAL_2025, aaos(11, 'Sistema reproductor y genética', 276), bibiano(119, 'Urgencias en la mujer embarazada', 1060)]),
    ],
    conceptosClave: [
      { termino: 'Desplazamiento del punto de partida', definicion: 'Efecto de las adaptaciones del embarazo: un hallazgo anormal en otra persona puede ser esperable aquí, y al revés.' },
      { termino: 'Reserva de oxígeno reducida', definicion: 'Consecuencia de la elevación del diafragma y del mayor consumo; la embarazada se desatura antes ante el mismo problema.' },
      { termino: 'Compresión aortocava', definicion: 'Compresión de los grandes vasos por el útero en decúbito supino avanzado, que reduce el retorno venoso y puede producir hipotensión corregible con la postura.' },
      { termino: 'Riesgo de broncoaspiración', definicion: 'Consecuencia del vaciamiento gástrico enlentecido y del esfínter esofágico menos competente.' },
      { termino: 'Tendencia trombótica', definicion: 'Mayor propensión a la coagulación durante el embarazo; obliga a considerar la trombosis ante disnea o dolor torácico.' },
      { termino: 'Estabilizar a la madre', definicion: 'Principio rector: el feto depende de la circulación y oxigenación maternas, y no hay intervención prehospitalaria que lo beneficie por encima de eso.' },
    ],
    flashcards: [
      { frente: '¿Por qué una embarazada se desatura antes?', reverso: 'Porque el útero eleva el diafragma y reduce la reserva de aire del pulmón, mientras el consumo de oxígeno es mayor.' },
      { frente: '¿Qué es la compresión aortocava y cómo se corrige?', reverso: 'La compresión de los grandes vasos por el útero en decúbito supino avanzado; se corrige inclinando a la paciente hacia su lado izquierdo o desplazando el útero.' },
      { frente: '¿Por qué hay mayor riesgo de broncoaspiración?', reverso: 'Porque el vaciamiento gástrico se enlentece y el esfínter esofágico es menos competente.' },
      { frente: '¿Por qué la embarazada se descompensa de forma brusca?', reverso: 'Porque su mayor volumen le permite compensar mejor una pérdida inicial; cuando falla la compensación, la caída es rápida.' },
      { frente: '¿Se publican en esta lección los valores normales del embarazo?', reverso: 'No: varían con las semanas, la paciente y la fuente. Se enseña la dirección del cambio y la comparación con la propia paciente.' },
      { frente: '¿Cuál es el principio rector de la atención obstétrica de urgencia?', reverso: 'Estabilizar a la madre es atender al feto: depende por completo de su circulación y oxigenación.' },
    ],
    quiz: [
      {
        pregunta: 'Colocas a una embarazada de 34 semanas boca arriba sobre la camilla y se pone pálida e hipotensa. ¿Qué haces primero?',
        opciones: [
          'Iniciar aporte de volumen por sospecha de shock.',
          'Corregir la posición inclinándola hacia su lado izquierdo o desplazando el útero: la compresión aortocava mejora al cambiar la postura.',
          'Sentarla completamente erguida.',
          'Administrar oxígeno a alto flujo y esperar.',
        ],
        correcta: 1,
        explicacion: 'Es una causa de deterioro producida por cómo se coloca a la paciente, y comprobar que mejora con la posición forma parte de la evaluación.',
      },
      {
        pregunta: 'Una embarazada con dificultad respiratoria se deteriora más rápido de lo esperado. ¿Qué lo explica?',
        opciones: [
          'Un error en la medición de la saturación.',
          'La menor reserva de oxígeno por elevación del diafragma junto con un mayor consumo.',
          'La tendencia trombótica del embarazo.',
          'El enlentecimiento del vaciamiento gástrico.',
        ],
        correcta: 1,
        explicacion: 'Es la primera de las dos consecuencias que cambian la conducta, y hace más urgente cualquier compromiso de la ventilación.',
      },
      {
        pregunta: 'Embarazada de 28 semanas con disnea súbita y dolor torácico. ¿Qué causa debe figurar entre las consideradas?',
        opciones: [
          'Solo causas respiratorias infecciosas.',
          'La trombosis, porque el embarazo aumenta la tendencia a la coagulación.',
          'Únicamente la compresión aortocava.',
          'Ninguna distinta de las de cualquier paciente.',
        ],
        correcta: 1,
        explicacion: 'La tendencia trombótica es uno de los cambios hematológicos con consecuencia directa en la evaluación.',
      },
      {
        pregunta: '¿Cuál es la mejor forma de atender al feto en el ámbito prehospitalario?',
        opciones: [
          'Monitorizar su frecuencia cardiaca de forma continua.',
          'Estabilizar a la madre: el feto depende por completo de su circulación y oxigenación.',
          'Trasladar siempre en decúbito supino.',
          'Administrar oxígeno a la madre en todos los casos.',
        ],
        correcta: 1,
        explicacion: 'Es el principio que ordena toda la atención obstétrica de urgencia.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La elevación del diafragma por el útero reduce la reserva pulmonar, de modo que la embarazada se ___ antes ante un problema respiratorio.',
          opciones: ['recupera', 'desatura', 'estabiliza', 'compensa'],
          correcta: 1,
          explicacion: 'A la menor reserva se suma un consumo de oxígeno mayor.',
        },
        {
          texto: 'La compresión de los grandes vasos por el útero en decúbito supino se corrige inclinando a la paciente hacia su lado ___.',
          opciones: ['derecho', 'izquierdo', 'ventral', 'dorsal'],
          correcta: 1,
          explicacion: 'También puede desplazarse el útero manualmente hacia ese lado si la paciente no puede inclinarse.',
        },
        {
          texto: 'El vaciamiento gástrico enlentecido y el esfínter esofágico menos competente aumentan el riesgo de ___.',
          opciones: ['trombosis', 'broncoaspiración', 'hipoglucemia', 'hipotermia'],
          correcta: 1,
          explicacion: 'Por eso se prioriza la protección de la vía aérea en esta paciente.',
        },
        {
          texto: 'Como el volumen de plasma aumenta más que los glóbulos rojos, la embarazada tolera mejor una pérdida inicial y se descompensa de forma más ___.',
          opciones: ['lenta', 'brusca', 'previsible', 'gradual'],
          correcta: 1,
          explicacion: 'Por eso se actúa por el conjunto del cuadro sin esperar a que cambien las cifras.',
        },
      ],
    },
    revision: ficha({
      estado: 'en_revision',
      version: 'WHO Maternal Health 2025 (sección pendiente); AAOS cap. 11 verificado; Bibiano 3.ª ed., cap. 119',
      fuentes: [
        'WHO. Recommendations on Maternal Health, 2.ª ed., 2025 (sección pendiente).',
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 11, p. 276.',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 119, p. 1060.',
      ],
      extra: [
        'EN REVISIÓN: es un tema de FISIOLOGÍA, y sus fuentes de estructura y función (AAOS y Bibiano) '
          + 'sí se abrieron y se citan con capítulo y página verificados. No depende de ninguna cifra '
          + 'de guía restringida.',
        'Se declara expresamente que NO se publican valores de referencia del embarazo, porque varían '
          + 'con las semanas, la paciente y la fuente; se enseña la dirección del cambio.',
        NO_MANIOBRAS,
      ],
    }),
  },

  // ============================================================
  //  Atención al trabajo de parto
  // ============================================================
  'm4-gyn-trabajo-parto': {
    icono: 'ic-feto-utero',
    duracion: '22 min',
    resumen: 'Cómo se reconoce que un nacimiento es inminente, qué se prepara, cómo se acompaña el '
      + 'nacimiento sin intervenir de más y qué necesitan la madre y el recién nacido en los primeros '
      + 'minutos.',
    objetivos: [
      'Describir las fases del trabajo de parto en el nivel que exige la decisión prehospitalaria.',
      'Distinguir un nacimiento inminente de una situación que permite el traslado.',
      'Preparar el entorno y el material para un nacimiento fuera del hospital.',
      'Acompañar el nacimiento y atender los primeros minutos de la madre y del recién nacido.',
    ],
    secciones: [
      {
        titulo: 'Las fases, en el nivel que hace falta',
        bloques: [
          { tipo: 'p', texto: 'El trabajo de parto es el proceso por el que el útero se contrae de forma progresiva hasta expulsar al feto y después la placenta. Para el ámbito prehospitalario no hace falta el detalle obstétrico completo: basta con reconocer en qué momento del proceso está la paciente, porque de eso depende una sola decisión práctica.' },
          {
            tipo: 'tabla',
            titulo: 'Las tres fases',
            headers: ['Fase', 'Qué ocurre', 'Qué significa para el prestador'],
            filas: [
              ['Primera: dilatación', 'Las contracciones se hacen más frecuentes, intensas y regulares mientras el cuello del útero se abre', 'Habitualmente hay tiempo para trasladar'],
              ['Segunda: expulsivo', 'La paciente siente necesidad de pujar y el feto desciende hasta nacer', 'Si ya empezó, el nacimiento se atiende donde se está'],
              ['Tercera: alumbramiento', 'Sale la placenta, habitualmente en los minutos siguientes al nacimiento', 'Se acompaña y se vigila el sangrado'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La única decisión que hay que tomar', texto: 'Trasladar o atender el nacimiento en el sitio. Todo lo demás —material, posición, acompañamiento— se organiza en torno a esa decisión, y equivocarla en cualquiera de las dos direcciones tiene consecuencias: trasladar a una paciente que va a dar a luz en el trayecto, o quedarse a atender un nacimiento que aún tardará horas.' },
        ],
      },
      {
        titulo: 'Reconocer un nacimiento inminente',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Datos que indican que el nacimiento es inminente',
            items: [
              'La paciente refiere una necesidad intensa e incontrolable de pujar.',
              'Refiere sensación de que «va a salir» o ganas de defecar por la presión.',
              'Se observa la cabeza del feto en el introito, o el periné abombado.',
              'Las contracciones son muy frecuentes, intensas y con poco descanso entre ellas.',
              'Es un parto no primerizo, en el que el proceso suele ser más rápido.',
              'La paciente refiere que sus partos anteriores fueron muy rápidos.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Qué preguntar en cuanto se llega',
            items: [
              'Semanas de gestación y si el embarazo ha tenido controles.',
              'Cuántos embarazos y partos previos ha tenido y cómo terminaron.',
              'Desde cuándo tiene contracciones y cada cuánto son ahora.',
              'Si rompió aguas, cuándo y de qué color era el líquido.',
              'Si percibe movimientos fetales como habitualmente.',
              'Si hay sangrado, y si sabe si son uno o más fetos.',
              'Problemas conocidos de este embarazo y cesáreas previas.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un líquido de color oscuro o verdoso es un dato que se transmite', texto: 'Se llama meconio a las primeras deposiciones del feto, y su presencia en el líquido amniótico se asocia a situaciones que conviene que el equipo receptor conozca de antemano. No es por sí solo un diagnóstico ni obliga a ninguna maniobra en la escena, pero sí es información que se recoge, se registra y se prealerta.' },
        ],
      },
      {
        titulo: 'Preparar y acompañar',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Preparación cuando el nacimiento es inminente',
            items: [
              'Pedir apoyo conforme al protocolo: un nacimiento genera dos pacientes.',
              'Protección personal completa: hay contacto con sangre y fluidos.',
              'Buscar el lugar más íntimo, limpio y templado disponible, y controlar la temperatura del ambiente.',
              'Preparar el material del equipo de parto de la unidad y el material para el recién nacido: paños secos y una superficie donde recibirlo.',
              'Colocar a la paciente en la posición que ella tolere y que permita el acceso, explicándole lo que va a ocurrir.',
              'Preparar material para secar y cubrir al recién nacido de inmediato.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Durante el nacimiento',
            items: [
              'Acompañar sin apresurar: el prestador sostiene y protege, no extrae.',
              'Permitir que la cabeza salga de forma progresiva, apoyándola con suavidad para que no lo haga bruscamente.',
              'No traccionar de la cabeza ni del cuerpo del recién nacido en ningún momento.',
              'Sostener al recién nacido, que estará resbaladizo, y colocarlo a la altura que indique el protocolo.',
              'Secar, retirar los paños húmedos y cubrir de inmediato, incluida la cabeza.',
              'Anotar la hora exacta del nacimiento.',
              'Colocar al recién nacido en contacto con su madre y cubrirlos juntos si el estado de ambos lo permite.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El principio que evita casi todos los daños', texto: 'No se tracciona. La tracción sobre la cabeza, el cuello o el cuerpo del recién nacido puede producir lesiones graves y no acelera el nacimiento. El papel del prestador es sostener, proteger y recibir. Cualquier situación en la que el nacimiento no progresa es una complicación que se aborda en la lección de parto distócico, y su manejo depende de formación específica y de protocolo.' },
        ],
      },
      {
        titulo: 'Los primeros minutos',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'Tras el nacimiento hay dos pacientes y ambos requieren atención simultánea. El recién nacido necesita sobre todo tres cosas —estar seco, estar caliente y respirar— y la madre necesita vigilancia del sangrado.' },
          {
            tipo: 'lista',
            titulo: 'Recién nacido',
            items: [
              'Secarlo por completo y retirar los paños mojados: el enfriamiento es rápido y evitable.',
              'Cubrirlo, incluida la cabeza, y mantenerlo en contacto con la madre si el estado de ambos lo permite.',
              'Valorar si respira y si tiene buen tono; anotar la hora.',
              'Si no respira o no responde, aplicar la atención neonatal conforme al protocolo y al alcance autorizado; la reanimación neonatal se estudia en el Módulo 6.',
              'El pinzamiento y el corte del cordón se realizan según el momento, la técnica y el material que indique el protocolo del servicio.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Madre',
            items: [
              'Vigilar el sangrado de forma continua: es la complicación más frecuente y grave de este momento.',
              'Vigilar el estado de perfusión y el nivel de respuesta.',
              'Esperar la salida de la placenta sin traccionar del cordón; si sale, conservarla y trasladarla con la paciente.',
              'Mantener la temperatura de la madre, que también se enfría.',
              'Si el sangrado es abundante, aplicar lo estudiado en la lección de hemorragia posparto conforme al protocolo.',
              'Traslado de ambos, con prealerta y con la hora del nacimiento registrada.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La atención respetuosa no es un añadido', texto: 'Un nacimiento fuera del hospital suele ocurrir en un contexto de miedo. Explicar lo que ocurre, pedir permiso, preservar la intimidad, permitir el acompañamiento que la mujer desee y no hacer comentarios sobre su comportamiento forman parte de la atención, no de la cortesía. Una atención respetuosa mejora la experiencia y también la colaboración de la paciente en un momento en que esa colaboración importa.' },
        ],
      },
      F([WHO_INTRAPARTO_2018, AHA_NEONATAL_2025, bibiano(117, 'Asistencia al parto extrahospitalario', 1042)]),
    ],
    conceptosClave: [
      { termino: 'Fases del trabajo de parto', definicion: 'Dilatación, expulsivo y alumbramiento; para el prestador determinan una sola decisión: trasladar o atender el nacimiento en el sitio.' },
      { termino: 'Nacimiento inminente', definicion: 'Situación indicada por necesidad incontrolable de pujar, visualización de la cabeza, periné abombado y contracciones muy frecuentes.' },
      { termino: 'No traccionar', definicion: 'Principio central de la atención al nacimiento: el prestador sostiene, protege y recibe; traccionar puede producir lesiones graves y no acelera nada.' },
      { termino: 'Meconio', definicion: 'Primeras deposiciones del feto; su presencia en el líquido es información que se registra y se prealerta, sin ser por sí sola un diagnóstico.' },
      { termino: 'Tres necesidades del recién nacido', definicion: 'Estar seco, estar caliente y respirar; el enfriamiento es rápido y evitable.' },
      { termino: 'Atención respetuosa', definicion: 'Explicar, pedir permiso, preservar la intimidad y permitir el acompañamiento; forma parte de la atención y mejora la colaboración.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la única decisión práctica que exige el trabajo de parto en la calle?', reverso: 'Trasladar o atender el nacimiento en el sitio.' },
      { frente: 'Nombra tres datos de nacimiento inminente.', reverso: 'Necesidad incontrolable de pujar, visualización de la cabeza en el introito y contracciones muy frecuentes con poco descanso.' },
      { frente: '¿Qué principio evita casi todos los daños durante el nacimiento?', reverso: 'No traccionar: el prestador sostiene, protege y recibe.' },
      { frente: '¿Qué necesita un recién nacido en los primeros minutos?', reverso: 'Estar seco, estar caliente y respirar; se seca, se retiran los paños mojados y se cubre incluida la cabeza.' },
      { frente: '¿Qué se vigila en la madre tras el nacimiento?', reverso: 'El sangrado de forma continua, además de la perfusión y el nivel de respuesta.' },
      { frente: '¿Se tracciona del cordón para extraer la placenta?', reverso: 'No: se espera su salida sin traccionar, y si sale se conserva y se traslada con la paciente.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con contracciones cada dos minutos, necesidad incontrolable de pujar y cabeza fetal visible. ¿Qué decides?',
        opciones: [
          'Trasladar de inmediato con la paciente acostada.',
          'Atender el nacimiento en el sitio: son datos de nacimiento inminente.',
          'Esperar a que rompa aguas antes de decidir.',
          'Pedir a la paciente que no puje hasta llegar al hospital.',
        ],
        correcta: 1,
        explicacion: 'La necesidad incontrolable de pujar y la visualización de la cabeza indican que el expulsivo ya empezó.',
      },
      {
        pregunta: 'La cabeza está saliendo y el proceso parece lento. Un compañero propone traccionar suavemente. ¿Qué respondes?',
        opciones: [
          'Que puede hacerlo si es con suavidad.',
          'Que no se tracciona nunca: puede producir lesiones graves y no acelera el nacimiento.',
          'Que traccione solo del cuerpo, no de la cabeza.',
          'Que espere a que la madre deje de pujar.',
        ],
        correcta: 1,
        explicacion: 'El papel del prestador es sostener, proteger y recibir; cualquier falta de progreso es una complicación con su propio abordaje.',
      },
      {
        pregunta: 'Acaba de nacer el bebé. ¿Cuál es la primera medida sobre él?',
        opciones: [
          'Pinzar y cortar el cordón de inmediato.',
          'Secarlo por completo, retirar los paños mojados y cubrirlo incluida la cabeza: el enfriamiento es rápido y evitable.',
          'Aspirar sistemáticamente la boca y la nariz.',
          'Pesarlo y medirlo.',
        ],
        correcta: 1,
        explicacion: 'Las tres necesidades del recién nacido son estar seco, estar caliente y respirar; el pinzamiento del cordón se hace según el protocolo.',
      },
      {
        pregunta: 'La paciente refiere que rompió aguas y el líquido era verdoso. ¿Qué haces con ese dato?',
        opciones: [
          'Realizar una maniobra específica antes del nacimiento.',
          'Registrarlo y transmitirlo en la prealerta: es información relevante para el equipo receptor, aunque no sea por sí sola un diagnóstico.',
          'Descartarlo por irrelevante.',
          'Retrasar el traslado hasta que el líquido se aclare.',
        ],
        correcta: 1,
        explicacion: 'La presencia de meconio se recoge, se registra y se prealerta, sin obligar a ninguna maniobra en la escena.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia de preparación, nacimiento y primeros minutos',
        pasos: [
          'Reconocer los datos de nacimiento inminente y decidir atender en el sitio',
          'Pedir apoyo y colocarse la protección personal completa',
          'Preparar el lugar más íntimo, limpio y templado disponible y el material',
          'Colocar a la paciente en la posición que tolere y explicarle lo que ocurrirá',
          'Acompañar la salida de la cabeza sin traccionar',
          'Sostener al recién nacido y anotar la hora del nacimiento',
          'Secar, retirar los paños mojados y cubrir incluida la cabeza',
          'Colocar al recién nacido en contacto con su madre si el estado de ambos lo permite',
          'Vigilar el sangrado materno y esperar la placenta sin traccionar del cordón',
          'Trasladar a ambos con prealerta y con la hora registrada',
        ],
      },
    },
    revision: ficha({
      version: 'WHO Intrapartum Care 2018 y AHA/AAP Neonatal 2025 (secciones pendientes); Bibiano 3.ª ed., cap. 117',
      fuentes: [
        'WHO. Intrapartum Care for a Positive Childbirth Experience, 2018 (sección pendiente).',
        'AHA/AAP 2025 Neonatal Resuscitation (sección pendiente; se desarrolla en el Módulo 6).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 117, p. 1042.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las guías de la OMS y de AHA/AAP.',
        NO_MANIOBRAS,
        'La reanimación neonatal NO se desarrolla aquí: se remite al Módulo 6 con sus propias fuentes. '
          + 'Solo se enseñan los primeros minutos de cuidado térmico y valoración.',
        'El momento y la técnica de pinzamiento del cordón se remiten al protocolo del servicio y no se '
          + 'publican.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué contiene el equipo de parto de sus unidades y qué indica su '
          + 'protocolo sobre pinzamiento del cordón y sobre el destino de la madre y el recién nacido?',
      ],
    }),
  },

  // ============================================================
  //  Atención a parto distócico
  // ============================================================
  'm4-gyn-parto-distocico': {
    icono: 'ic-feto-utero',
    duracion: '20 min',
    resumen: 'Qué significa que un parto no progrese con normalidad, cómo se reconocen las cuatro '
      + 'situaciones que el prestador debe identificar y por qué la conducta es pedir ayuda y minimizar '
      + 'la manipulación.',
    objetivos: [
      'Definir distocia como falta de progresión normal del nacimiento.',
      'Reconocer las cuatro situaciones que exigen identificación inmediata.',
      'Justificar por qué la prioridad es pedir recursos y minimizar la manipulación.',
      'Delimitar qué conductas están prohibidas sin formación y protocolo específicos.',
    ],
    secciones: [
      {
        titulo: 'Qué es una distocia',
        bloques: [
          { tipo: 'p', texto: 'Se llama distocia al parto que no progresa con normalidad. El término agrupa situaciones muy distintas cuyo denominador común es que el nacimiento se detiene o sigue un curso que no es el esperado, y que su resolución exige recursos que rara vez existen fuera de un hospital.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La expectativa correcta de esta lección', texto: 'No enseña a resolver una distocia. Enseña a reconocerla, a pedir lo que hace falta, a no empeorarla y a trasladar. Esa es la aportación real del ámbito prehospitalario en estas situaciones, y presentarla de otro modo generaría una confianza peligrosa: las maniobras obstétricas exigen formación específica, práctica supervisada, competencia acreditada y un protocolo que las autorice.' },
          {
            tipo: 'lista',
            titulo: 'Lo primero, siempre',
            items: [
              'Pedir apoyo y recursos conforme al protocolo, en cuanto se identifique la situación.',
              'Contactar con la dirección médica o con la regulación si el procedimiento del servicio lo contempla.',
              'Preparar el traslado sin demora, salvo que el protocolo indique lo contrario.',
              'Registrar la hora en que se identificó la situación.',
              'Explicar a la paciente lo que ocurre y lo que se va a hacer.',
            ],
          },
        ],
      },
      {
        titulo: 'Las cuatro situaciones que hay que reconocer',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Qué se observa y qué significa',
            headers: ['Situación', 'Qué se observa', 'Por qué importa'],
            filas: [
              ['Presentación podálica', 'Se presentan primero las nalgas o los pies en lugar de la cabeza', 'El nacimiento no sigue el curso habitual y la parte más voluminosa sale al final'],
              ['Distocia de hombros', 'La cabeza nace y el resto del cuerpo no progresa con la contracción siguiente', 'Es una situación tiempo-dependiente que exige maniobras específicas'],
              ['Prolapso del cordón', 'Se observa el cordón umbilical fuera del introito, antes de que nazca el feto', 'El cordón puede comprimirse e interrumpir la circulación fetal'],
              ['Parto múltiple', 'Más de un feto, conocido o descubierto en la escena', 'Multiplica la complejidad, los recursos necesarios y el riesgo de complicaciones'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El prolapso de cordón es la que menos espera', texto: 'Si el cordón queda comprimido entre el feto y el canal del parto, la circulación fetal se interrumpe. Es la situación de esta lección en la que el tiempo cuenta de forma más inmediata, y en la que la posición de la madre y el traslado urgente forman parte de la conducta. Qué posición exacta y qué medidas adicionales se aplican dependen del protocolo del servicio, que debe declararlo.' },
          { tipo: 'p', texto: 'Conviene tener presente que estas situaciones no siempre se conocen de antemano. Una presentación podálica o un parto múltiple pueden descubrirse en la escena en una paciente sin controles del embarazo, y por eso la anamnesis inicial pregunta expresamente por el número de fetos y por los problemas conocidos.' },
        ],
      },
      {
        titulo: 'Qué se hace y qué está prohibido',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'lista',
            titulo: 'Conducta general',
            items: [
              'Pedir ayuda de inmediato y activar el recurso que corresponda.',
              'Colocar a la paciente en la posición que indique el protocolo para la situación identificada.',
              'Minimizar la manipulación: cada maniobra no autorizada añade riesgo sin resolver el problema.',
              'Oxigenación materna y vigilancia del estado de la madre, aplicando el principio de que estabilizarla es atender al feto.',
              'Prevenir la hipotermia de la madre y, si ya nació parte del feto, también la suya.',
              'Traslado urgente con prealerta que describa exactamente lo que se observa.',
              'Registro de horas: identificación de la situación, cambios y llegada.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Conductas prohibidas sin formación y protocolo específicos', texto: 'No se tracciona del feto en ninguna circunstancia. No se intenta reintroducir un cordón prolapsado. No se aplica presión sobre el fondo del útero para empujar al feto hacia abajo. No se intenta rotar al feto ni extraer una parte que no progresa. No se retrasa el traslado para intentar resolver la situación en la escena. Ninguna de estas conductas se describe en esta lección porque describirlas equivaldría a autorizarlas.' },
          { tipo: 'p', texto: 'Qué maniobras están dentro del alcance de los alumnos de esta academia, con qué formación y bajo qué dirección médica, es una decisión que la academia debe declarar. Mientras no lo haga, la conducta que esta lección enseña es la que puede sostenerse con seguridad: reconocer, pedir, sostener, no empeorar y trasladar.' },
        ],
      },
      F([WHO_OBSTETRICIA, WHO_INTRAPARTO_2018, bibiano(117, 'Asistencia al parto extrahospitalario', 1042)]),
    ],
    conceptosClave: [
      { termino: 'Distocia', definicion: 'Parto que no progresa con normalidad; agrupa situaciones distintas cuya resolución exige recursos que rara vez existen fuera del hospital.' },
      { termino: 'Presentación podálica', definicion: 'Situación en que se presentan primero las nalgas o los pies en lugar de la cabeza.' },
      { termino: 'Distocia de hombros', definicion: 'La cabeza nace y el cuerpo no progresa con la contracción siguiente; es tiempo-dependiente y exige maniobras específicas.' },
      { termino: 'Prolapso de cordón', definicion: 'Salida del cordón antes que el feto, con riesgo de compresión e interrupción de la circulación fetal; es la situación en que el tiempo cuenta de forma más inmediata.' },
      { termino: 'Minimizar la manipulación', definicion: 'Principio de conducta: cada maniobra no autorizada añade riesgo sin resolver el problema.' },
    ],
    flashcards: [
      { frente: '¿Qué es una distocia?', reverso: 'Un parto que no progresa con normalidad; su resolución exige recursos que rara vez existen fuera del hospital.' },
      { frente: '¿Qué enseña esta lección y qué no?', reverso: 'Enseña a reconocer, pedir ayuda, no empeorar y trasladar; no enseña a resolver una distocia.' },
      { frente: '¿Cuál es la situación en que el tiempo cuenta de forma más inmediata?', reverso: 'El prolapso de cordón: si se comprime, la circulación fetal se interrumpe.' },
      { frente: '¿Qué es una distocia de hombros?', reverso: 'Que la cabeza nazca y el cuerpo no progrese con la contracción siguiente.' },
      { frente: 'Nombra tres conductas prohibidas sin formación y protocolo.', reverso: 'Traccionar del feto, reintroducir un cordón prolapsado y presionar el fondo del útero para empujar al feto.' },
      { frente: '¿Por qué esta lección no describe las maniobras obstétricas?', reverso: 'Porque describirlas equivaldría a autorizarlas, y exigen formación específica, competencia acreditada y protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Durante un nacimiento observas el cordón umbilical fuera del introito antes de que nazca el feto. ¿Qué priorizas?',
        opciones: [
          'Reintroducir el cordón con cuidado.',
          'Pedir ayuda de inmediato, colocar a la paciente en la posición que indique el protocolo y trasladar con urgencia: la compresión del cordón interrumpe la circulación fetal.',
          'Esperar a la siguiente contracción para valorar.',
          'Traccionar suavemente del feto para acelerar el nacimiento.',
        ],
        correcta: 1,
        explicacion: 'Reintroducir el cordón y traccionar figuran entre las conductas prohibidas; el prolapso es la situación en que el tiempo cuenta de forma más inmediata.',
      },
      {
        pregunta: 'Nace la cabeza y el cuerpo no progresa con la contracción siguiente. ¿Qué situación es y qué haces?',
        opciones: [
          'Una presentación podálica; se tracciona del cuerpo.',
          'Una distocia de hombros; se pide ayuda de inmediato, se minimiza la manipulación y se traslada, porque su resolución exige maniobras específicas que requieren formación y protocolo.',
          'Un parto múltiple; se espera al segundo feto.',
          'Un alumbramiento retenido; se tracciona del cordón.',
        ],
        correcta: 1,
        explicacion: 'Es una situación tiempo-dependiente cuya resolución exige maniobras que esta lección no describe ni autoriza.',
      },
      {
        pregunta: 'Un compañero propone presionar el fondo del útero para ayudar a que salga el feto. ¿Qué respondes?',
        opciones: [
          'Que es una maniobra útil si el parto se detiene.',
          'Que figura entre las conductas prohibidas sin formación y protocolo específicos.',
          'Que debe hacerse solo entre contracciones.',
          'Que puede hacerlo si la paciente lo autoriza.',
        ],
        correcta: 1,
        explicacion: 'Aplicar presión sobre el fondo del útero para empujar al feto está expresamente prohibido en esta lección.',
      },
      {
        pregunta: 'Paciente sin controles del embarazo. Durante la atención descubres que se presentan primero los pies. ¿Qué demuestra ese hallazgo sobre la anamnesis?',
        opciones: [
          'Que la anamnesis es innecesaria en el parto.',
          'Que estas situaciones no siempre se conocen de antemano, y por eso se pregunta expresamente por el número de fetos y por los problemas conocidos.',
          'Que la paciente ocultó información.',
          'Que debe repetirse toda la exploración.',
        ],
        correcta: 1,
        explicacion: 'Una presentación podálica o un parto múltiple pueden descubrirse en la escena en una paciente sin controles.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Escenario 1: prolapso de cordón identificado. ¿Cuál es la conducta correcta y cuál la prohibida?',
          opciones: [
            'Correcta: reintroducir el cordón. Prohibida: trasladar.',
            'Correcta: pedir ayuda, posición según protocolo y traslado urgente. Prohibida: intentar reintroducir el cordón.',
            'Correcta: traccionar del feto. Prohibida: pedir ayuda.',
            'Correcta: esperar en la escena. Prohibida: prealertar.',
          ],
          correcta: 1,
          explicacion: 'Reintroducir un cordón prolapsado figura entre las conductas prohibidas sin formación y protocolo específicos.',
        },
        {
          pregunta: 'Escenario 2: presentación podálica en curso. ¿Qué solicitud de ayuda corresponde?',
          opciones: [
            'Ninguna: se resuelve en la escena.',
            'Apoyo y recursos conforme al protocolo en cuanto se identifica, y contacto con dirección médica o regulación si el procedimiento lo contempla.',
            'Solicitar únicamente material adicional de parto.',
            'Pedir ayuda solo si el feto no nace en diez minutos.',
          ],
          correcta: 1,
          explicacion: 'Pedir apoyo y recursos es lo primero, siempre, en cuanto se identifica la situación.',
        },
        {
          pregunta: 'Escenario 3: parto múltiple descubierto en la escena. ¿Qué conducta general aplica?',
          opciones: [
            'Atender ambos nacimientos en el domicilio sin apoyo.',
            'Pedir recursos, minimizar la manipulación, oxigenar y vigilar a la madre, prevenir la hipotermia y trasladar con prealerta describiendo lo que se observa.',
            'Traccionar del segundo feto para acelerar.',
            'Retrasar el traslado hasta que nazcan los dos.',
          ],
          correcta: 1,
          explicacion: 'La conducta general de la lección se aplica a las cuatro situaciones; retrasar el traslado para resolver en la escena está prohibido.',
        },
      ],
    },
    revision: ficha({
      version: 'WHO Managing Complications y WHO Intrapartum Care 2018 (secciones pendientes); Bibiano 3.ª ed., cap. 117',
      fuentes: [
        'WHO. Managing Complications in Pregnancy and Childbirth, 2.ª ed. (sección pendiente).',
        'WHO. Intrapartum Care for a Positive Childbirth Experience, 2018 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 117, p. 1042.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las guías de la OMS.',
        NO_MANIOBRAS,
        'La lección declara expresamente que NO describe las maniobras obstétricas porque describirlas '
          + 'equivaldría a autorizarlas. Enumera en cambio las conductas prohibidas.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué maniobras obstétricas están dentro del alcance de sus '
          + 'alumnos, con qué formación, con qué práctica supervisada y bajo qué dirección médica? Y '
          + '¿qué posición indica su protocolo ante un prolapso de cordón?',
      ],
    }),
  },

  // ============================================================
  //  Sufrimiento fetal agudo
  // ============================================================
  'm4-gyn-sufrimiento-fetal': {
    icono: 'cp-smart-placenta',
    duracion: '18 min',
    resumen: 'Por qué se prefiere hablar de estado fetal no tranquilizador, qué puede observar realmente '
      + 'el prestador y qué causas maternas reversibles conviene buscar.',
    objetivos: [
      'Justificar por qué se prefiere el término estado fetal no tranquilizador.',
      'Identificar los datos que el prestador puede recoger sobre el bienestar fetal.',
      'Buscar las causas maternas reversibles que comprometen al feto.',
      'Ordenar la conducta de estabilización, comunicación y traslado.',
    ],
    secciones: [
      {
        titulo: 'Un nombre que conviene precisar',
        bloques: [
          { tipo: 'p', texto: 'El plan de estudios titula este tema «sufrimiento fetal agudo». El término se sigue usando, pero la práctica obstétrica actual prefiere expresiones como estado fetal no tranquilizador o sospecha de compromiso fetal, y la razón no es de estilo.' },
          {
            tipo: 'lista',
            titulo: 'Por qué el cambio de término importa',
            items: [
              'Porque «sufrimiento fetal» afirma que el feto está sufriendo, y eso es una conclusión que requiere evaluación obstétrica que no existe en la calle.',
              'Porque los datos disponibles no confirman un compromiso: indican que no puede descartarse.',
              'Porque un término que expresa sospecha comunica mejor la incertidumbre real al equipo receptor.',
              'Porque etiquetar prematuramente puede orientar decisiones que no corresponden al ámbito prehospitalario.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Qué se transmite entonces', texto: 'Lo que el prestador comunica no es un diagnóstico sino una observación: «paciente de tantas semanas que refiere disminución de movimientos fetales desde hace tantas horas», o «líquido de color verdoso». Esa formulación es más útil que una etiqueta, porque el equipo receptor sabe exactamente qué se observó y qué no.' },
        ],
      },
      {
        titulo: 'Qué puede observar el prestador',
        bloques: [
          { tipo: 'p', texto: 'La evaluación del bienestar fetal en el hospital se apoya en registros y estudios que no viajan en una ambulancia. Lo que sí puede recogerse es limitado, pero no es poco.' },
          {
            tipo: 'tabla',
            titulo: 'Datos disponibles y su valor',
            headers: ['Dato', 'Cómo se obtiene', 'Qué valor tiene'],
            filas: [
              ['Movimientos fetales', 'Preguntando a la paciente si los percibe como habitualmente', 'Es el dato más accesible; una disminución referida por la madre se toma en serio'],
              ['Frecuencia cardiaca fetal', 'Solo si la unidad tiene el equipo y el prestador la competencia', 'Aporta información, pero su interpretación completa exige contexto obstétrico'],
              ['Color del líquido amniótico', 'Por observación si hay rotura de membranas', 'El líquido verdoso u oscuro es información que se transmite; no es diagnóstico por sí solo'],
              ['Estado de la madre', 'Con la evaluación habitual', 'Es lo que más determina el bienestar fetal y lo que sí puede corregirse'],
              ['Sangrado y dolor uterino', 'Exploración externa y anamnesis', 'Orientan hacia causas obstétricas que comprometen al feto'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La disminución de movimientos no se minimiza', texto: 'Es frecuente atribuirla a que el feto «está durmiendo» o a que la madre está distraída. Una madre suele conocer el patrón habitual de su embarazo, y una reducción que ella percibe como distinta es un dato que se recoge, se registra con la hora y se transmite. No confirma nada, y precisamente por eso no se descarta en la escena.' },
        ],
      },
      {
        titulo: 'Causas maternas que sí pueden corregirse',
        bloques: [
          { tipo: 'p', texto: 'El feto depende por completo de la circulación y la oxigenación maternas. Por eso, ante la sospecha de compromiso fetal, la búsqueda se dirige a lo que le está ocurriendo a la madre, que es lo que puede modificarse.' },
          {
            tipo: 'lista',
            titulo: 'Qué buscar',
            items: [
              'Compresión aortocava por la posición: se corrige inclinando a la paciente hacia su lado izquierdo.',
              'Hipotensión de cualquier origen.',
              'Hipoxia materna por un problema respiratorio.',
              'Hemorragia, visible u oculta.',
              'Convulsión o alteración del estado de conciencia.',
              'Fiebre o infección.',
              'Deshidratación importante.',
              'Consumo de sustancias o intoxicación.',
              'Traumatismo reciente, incluso aparentemente leve.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La intervención más eficaz sobre el feto es sobre la madre', texto: 'Corregir la posición, mantener la oxigenación, sostener la circulación y tratar la causa materna dentro del alcance es lo que efectivamente mejora la situación fetal en el ámbito prehospitalario. No existe una intervención dirigida al feto que pueda hacerse en la ambulancia y que sustituya a esto.' },
        ],
      },
      {
        titulo: 'Conducta y comunicación',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración de la madre: vía aérea, ventilación, circulación y estado de conciencia.',
              'Corregir la posición evitando el decúbito supino en el embarazo avanzado.',
              'Oxigenación conforme al protocolo del servicio.',
              'Buscar y tratar dentro del alcance las causas maternas reversibles.',
              'Recoger semanas de gestación, movimientos fetales, rotura de membranas y color del líquido, sangrado y contracciones.',
              'Registrar con hora cada dato y cada cambio.',
              'Prenotificar describiendo lo observado, sin etiquetar.',
              'Traslado a un centro con capacidad obstétrica conforme al protocolo, sin demora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué debe contener la prealerta', texto: 'Semanas de gestación estimadas, qué observó el prestador y desde cuándo, estado de la madre y su tendencia, y qué se aplicó. Ese mensaje permite al equipo receptor preparar la valoración obstétrica antes de que llegue la paciente, que es exactamente lo que puede cambiar el desenlace.' },
        ],
      },
      F([WHO_INTRAPARTO_2018, WHO_OBSTETRICIA, WHO_MATERNAL_2025]),
    ],
    conceptosClave: [
      { termino: 'Estado fetal no tranquilizador', definicion: 'Expresión preferida frente a «sufrimiento fetal»: comunica sospecha y no una conclusión que exige evaluación obstétrica.' },
      { termino: 'Movimientos fetales', definicion: 'Dato más accesible del bienestar fetal; una disminución percibida por la madre se recoge, se registra y se transmite.' },
      { termino: 'Líquido meconial', definicion: 'Líquido amniótico de color verdoso u oscuro; es información que se transmite y no un diagnóstico por sí solo.' },
      { termino: 'Causa materna reversible', definicion: 'Condición de la madre que compromete al feto y puede corregirse: posición, hipotensión, hipoxia, hemorragia, convulsión, fiebre, deshidratación, tóxicos o traumatismo.' },
      { termino: 'Intervención indirecta', definicion: 'Principio de que la actuación más eficaz sobre el feto en el ámbito prehospitalario es la que se dirige a la madre.' },
    ],
    flashcards: [
      { frente: '¿Por qué se prefiere «estado fetal no tranquilizador»?', reverso: 'Porque «sufrimiento fetal» afirma una conclusión que exige evaluación obstétrica inexistente en la calle; los datos disponibles indican que no puede descartarse el compromiso.' },
      { frente: '¿Cuál es el dato más accesible del bienestar fetal?', reverso: 'Los movimientos fetales referidos por la madre, que conoce el patrón habitual de su embarazo.' },
      { frente: '¿Qué se hace con un líquido amniótico verdoso?', reverso: 'Se registra y se transmite; no es diagnóstico por sí solo ni obliga a maniobras en la escena.' },
      { frente: '¿Cuál es la intervención más eficaz sobre el feto en la ambulancia?', reverso: 'La dirigida a la madre: corregir la posición, mantener oxigenación y circulación y tratar la causa dentro del alcance.' },
      { frente: 'Nombra tres causas maternas reversibles.', reverso: 'Compresión aortocava por la posición, hipotensión e hipoxia materna; también hemorragia, convulsión, fiebre y tóxicos.' },
      { frente: '¿Qué se transmite en la prealerta?', reverso: 'Semanas estimadas, qué se observó y desde cuándo, estado de la madre y su tendencia, y qué se aplicó; no una etiqueta.' },
    ],
    quiz: [
      {
        pregunta: 'Una embarazada de 34 semanas refiere que el bebé se mueve mucho menos desde ayer. ¿Cómo lo manejas?',
        opciones: [
          'Tranquilizarla explicando que los fetos duermen.',
          'Recogerlo como dato relevante, registrarlo con la hora, buscar causas maternas y trasladar con prealerta describiendo lo observado.',
          'Confirmar el sufrimiento fetal y registrarlo como diagnóstico.',
          'Esperar a comprobar la frecuencia cardiaca fetal antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'La disminución de movimientos no se minimiza y no confirma nada; por eso se recoge y se transmite sin etiquetar.',
      },
      {
        pregunta: '¿Por qué la lección prefiere no usar el término «sufrimiento fetal agudo»?',
        opciones: [
          'Porque es un término obsoleto sin ningún uso.',
          'Porque afirma que el feto está sufriendo, y esa conclusión requiere una evaluación obstétrica que no existe en el ámbito prehospitalario.',
          'Porque el plan de estudios no lo contempla.',
          'Porque solo se aplica al parto.',
        ],
        correcta: 1,
        explicacion: 'Los datos disponibles en la calle no confirman el compromiso: indican que no puede descartarse.',
      },
      {
        pregunta: 'Sospechas compromiso fetal en una paciente de 36 semanas acostada boca arriba e hipotensa. ¿Cuál es la primera medida?',
        opciones: [
          'Auscultar la frecuencia cardiaca fetal.',
          'Corregir la posición inclinándola hacia su lado izquierdo, porque la compresión aortocava es una causa materna reversible.',
          'Administrar líquidos de inmediato.',
          'Trasladar sin modificar la posición.',
        ],
        correcta: 1,
        explicacion: 'La intervención más eficaz sobre el feto es la dirigida a la madre, y la posición es la causa reversible más inmediata.',
      },
      {
        pregunta: '¿Qué aporta al equipo receptor una prealerta bien formulada en este cuadro?',
        opciones: [
          'Un diagnóstico obstétrico establecido.',
          'Saber exactamente qué se observó y qué no, para preparar la valoración obstétrica antes de que llegue la paciente.',
          'La frecuencia cardiaca fetal interpretada.',
          'La confirmación de que hay meconio.',
        ],
        correcta: 1,
        explicacion: 'Describir lo observado es más útil que una etiqueta, porque comunica la incertidumbre real.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente de 38 semanas, acostada boca arriba, pálida, con presión baja y refiriendo menos movimientos fetales desde hace tres horas. ¿Qué dato MATERNO exige prenotificación y corrección inmediata?',
          opciones: [
            'La disminución de movimientos fetales.',
            'La hipotensión con posible compresión aortocava por la posición, que es una causa materna reversible.',
            'Las semanas de gestación.',
            'El antecedente de embarazos previos.',
          ],
          correcta: 1,
          explicacion: 'La hipotensión y la compresión aortocava figuran entre las causas maternas reversibles que se buscan y se corrigen.',
        },
        {
          pregunta: 'En esa misma paciente, ¿qué dato FETAL se registra y se transmite aunque no confirme nada?',
          opciones: [
            'La posición del feto.',
            'La disminución de movimientos referida por la madre, con la hora desde la que la percibe.',
            'El peso fetal estimado.',
            'La presentación cefálica o podálica.',
          ],
          correcta: 1,
          explicacion: 'Es el dato más accesible del bienestar fetal y se toma en serio precisamente porque no puede descartarse el compromiso.',
        },
        {
          pregunta: 'Al llegar refiere además rotura de membranas con líquido verdoso. ¿Cómo se incorpora ese dato a la prealerta?',
          opciones: [
            'Como confirmación de sufrimiento fetal.',
            'Como observación que se describe y se transmite, sin etiquetar y sin que obligue a maniobras en la escena.',
            'Como indicación de retrasar el traslado.',
            'Como dato irrelevante si la madre está estable.',
          ],
          correcta: 1,
          explicacion: 'El líquido meconial es información que se transmite y no un diagnóstico por sí solo.',
        },
      ],
    },
    revision: ficha({
      version: 'WHO Intrapartum Care 2018, WHO Managing Complications y WHO Maternal Health 2025 (secciones pendientes)',
      fuentes: [
        'WHO. Intrapartum Care for a Positive Childbirth Experience, 2018 (sección pendiente).',
        'WHO. Managing Complications in Pregnancy and Childbirth, 2.ª ed. (sección pendiente).',
        'WHO. Recommendations on Maternal Health, 2.ª ed., 2025 (sección pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las guías de la OMS.',
        'TERMINOLOGÍA: la lección conserva el título oficial del plan pero enseña y justifica el uso '
          + 'preferente de «estado fetal no tranquilizador» o «sospecha de compromiso fetal».',
        'No se publica ninguna cifra de frecuencia cardiaca fetal ni criterio de interpretación: se '
          + 'declara que su valoración completa exige contexto obstétrico y competencia.',
        'DECISIÓN PENDIENTE: la academia debe declarar si sus unidades disponen de equipo para '
          + 'auscultar la frecuencia cardiaca fetal y qué competencia exige para su uso e '
          + 'interpretación.',
      ],
    }),
  },

  // ============================================================
  //  Hemorragia del segundo y tercer trimestre
  // ============================================================
  'm4-gyn-hemorragia-2do-3er': {
    icono: 'ic-feto-utero',
    duracion: '20 min',
    resumen: 'Cómo se reconoce una hemorragia obstétrica avanzada, en qué se diferencian los dos patrones '
      + 'clásicos y por qué lo que se ve nunca mide toda la pérdida.',
    objetivos: [
      'Comparar los patrones de placenta previa y de desprendimiento sin diagnosticarlos en campo.',
      'Reconocer que el sangrado visible no mide la pérdida total.',
      'Valorar el estado de la madre y del feto con lo disponible.',
      'Aplicar la prohibición del tacto vaginal y justificarla.',
    ],
    secciones: [
      {
        titulo: 'Dos patrones que conviene conocer',
        bloques: [
          { tipo: 'p', texto: 'Un sangrado en la segunda mitad del embarazo es siempre una situación seria. Dos causas explican la mayoría de los casos graves y presentan patrones distintos que conviene reconocer, con una advertencia previa: en la calle no se diagnostican, y la conducta inmediata es la misma para ambos.' },
          {
            tipo: 'tabla',
            titulo: 'Los dos patrones clásicos',
            headers: ['', 'Placenta previa', 'Desprendimiento de placenta'],
            filas: [
              ['Dónde está el problema', 'La placenta se sitúa cubriendo total o parcialmente la salida del útero', 'La placenta se separa de la pared del útero antes del nacimiento'],
              ['Dolor', 'Habitualmente indoloro', 'Habitualmente doloroso, con dolor abdominal continuo'],
              ['Sangrado', 'Rojo, visible, de aparición súbita', 'Puede ser escaso o no visible: la sangre queda retenida'],
              ['Útero', 'Habitualmente blando y no doloroso', 'Con frecuencia duro, tenso y doloroso a la palpación'],
              ['Estado de la madre', 'Proporcional a lo que se ve', 'Puede ser mucho peor de lo que el sangrado visible sugiere'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ninguno de estos rasgos es absoluto', texto: 'Existen desprendimientos con sangrado abundante y placentas previas con dolor. La tabla sirve para reconocer patrones y para entender por qué el sangrado visible puede engañar, no para etiquetar a la paciente. El diagnóstico exige estudios que no viajan en la ambulancia.' },
        ],
      },
      {
        titulo: 'Lo que se ve no mide lo que se ha perdido',
        bloques: [
          { tipo: 'p', texto: 'Es la idea central de esta lección. En un desprendimiento, la sangre puede quedar retenida entre la placenta y la pared del útero sin salir al exterior. La paciente puede estar perdiendo una cantidad importante con un sangrado externo escaso o nulo.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se valora entonces la pérdida',
            items: [
              'Por el estado de perfusión: piel, estado mental, pulsos y relleno capilar.',
              'Por la tendencia de la frecuencia y de la presión durante la atención, no por un valor aislado.',
              'Por la intensidad del dolor y por el tono del útero a la palpación.',
              'Por lo que la paciente refiere sobre cuánto ha manchado y en cuánto tiempo.',
              'Por la evolución: lo que cambia en diez minutos informa más que lo que se ve al llegar.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Y la embarazada compensa', texto: 'A la sangre oculta se suma que una embarazada dispone de más volumen y mantiene sus signos vitales aparentemente normales durante más tiempo. La combinación de ambas cosas explica por qué en esta unidad se actúa por el conjunto del cuadro sin esperar a que las cifras se alteren: cuando lo hacen, la pérdida ya es grande.' },
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
              'Valoración primaria de la madre y del estado de perfusión.',
              'Oxigenación conforme al protocolo del servicio.',
              'Posición que evite el decúbito supino en el embarazo avanzado, inclinando hacia el lado izquierdo.',
              'Estimar y registrar el sangrado externo, sabiendo que puede no reflejar la pérdida total.',
              'Palpar el abdomen valorando dolor y tono uterino.',
              'Preguntar por movimientos fetales, semanas de gestación, controles y antecedentes, incluidas cesáreas previas.',
              'Prevenir la hipotermia y cubrir a la paciente.',
              'Acceso vascular y aporte de líquidos únicamente conforme al alcance y al protocolo.',
              'Traslado urgente a centro con capacidad obstétrica, con prealerta que describa el patrón observado y la tendencia.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se realiza tacto vaginal', texto: 'Es la prohibición más importante de esta lección y tiene una razón concreta: si la placenta cubre la salida del útero, el tacto puede desencadenar o agravar un sangrado masivo. Además, la información que aportaría no cambiaría la conducta prehospitalaria, que es la misma en ambos patrones. La exploración se limita a lo externo.' },
          { tipo: 'p', texto: 'Conviene recordar que hay dos pacientes y que el mejor cuidado del feto es la estabilización de la madre. También que un traumatismo, incluso aparentemente leve, puede provocar un desprendimiento, de modo que el antecedente traumático se pregunta expresamente aunque el motivo de la llamada sea el sangrado.' },
        ],
      },
      F([WHO_OBSTETRICIA, WHO_MATERNAL_2025, bibiano(119, 'Urgencias en la mujer embarazada', 1060)]),
    ],
    conceptosClave: [
      { termino: 'Placenta previa', definicion: 'Placenta situada cubriendo total o parcialmente la salida del útero; su patrón clásico es sangrado rojo, súbito y habitualmente indoloro.' },
      { termino: 'Desprendimiento de placenta', definicion: 'Separación de la placenta de la pared uterina antes del nacimiento; su patrón clásico es dolor con útero duro y sangrado que puede ser escaso u oculto.' },
      { termino: 'Sangrado oculto', definicion: 'Sangre retenida entre la placenta y la pared del útero que no sale al exterior; explica que lo visible no mida la pérdida.' },
      { termino: 'Valoración por perfusión y tendencia', definicion: 'Método para estimar la pérdida cuando el sangrado visible engaña: piel, estado mental, pulsos, relleno capilar y evolución.' },
      { termino: 'Prohibición del tacto vaginal', definicion: 'Si la placenta cubre la salida del útero, el tacto puede desencadenar o agravar un sangrado masivo, y no cambiaría la conducta.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el patrón clásico de la placenta previa?', reverso: 'Sangrado rojo, visible y de aparición súbita, habitualmente indoloro y con útero blando.' },
      { frente: '¿Cuál es el patrón clásico del desprendimiento?', reverso: 'Dolor abdominal continuo con útero duro y tenso, y sangrado que puede ser escaso o no visible.' },
      { frente: '¿Por qué el sangrado visible no mide la pérdida?', reverso: 'Porque en el desprendimiento la sangre puede quedar retenida entre la placenta y la pared del útero.' },
      { frente: '¿Cómo se estima entonces la pérdida?', reverso: 'Por el estado de perfusión, la tendencia de los signos vitales, el dolor, el tono uterino y la evolución en el tiempo.' },
      { frente: '¿Por qué no se realiza tacto vaginal?', reverso: 'Porque si la placenta cubre la salida del útero puede desencadenar o agravar un sangrado masivo, y no cambiaría la conducta.' },
      { frente: '¿Por qué se pregunta por traumatismos aunque el motivo sea el sangrado?', reverso: 'Porque un traumatismo, incluso aparentemente leve, puede provocar un desprendimiento.' },
    ],
    quiz: [
      {
        pregunta: 'Embarazada de 32 semanas con dolor abdominal continuo, útero duro y sangrado externo escaso. Está pálida y taquicárdica. ¿Cómo lo interpretas?',
        opciones: [
          'Como un cuadro leve, por el escaso sangrado visible.',
          'Como un patrón compatible con desprendimiento: la sangre puede estar retenida y el estado de la madre es peor de lo que el sangrado visible sugiere.',
          'Como una placenta previa típica.',
          'Como un trabajo de parto normal.',
        ],
        correcta: 1,
        explicacion: 'Dolor con útero duro y sangrado escaso con mal estado general es el patrón que la lección enseña a reconocer, sin etiquetarlo como diagnóstico.',
      },
      {
        pregunta: 'Un compañero propone un tacto vaginal para valorar el origen del sangrado. ¿Qué respondes?',
        opciones: [
          'Que lo haga con técnica estéril.',
          'Que no se realiza: si la placenta cubre la salida del útero puede desencadenar un sangrado masivo, y además no cambiaría la conducta.',
          'Que lo haga solo si el sangrado es abundante.',
          'Que primero se realice una ecografía.',
        ],
        correcta: 1,
        explicacion: 'Es la prohibición más importante de la lección y tiene una razón concreta.',
      },
      {
        pregunta: 'La paciente tiene signos vitales aparentemente normales pese a un sangrado que ha manchado varias toallas. ¿Qué concluyes?',
        opciones: [
          'Que la pérdida es pequeña.',
          'Que puede estar compensando: la embarazada mantiene sus cifras más tiempo, y cuando se alteran la pérdida ya es grande.',
          'Que el sangrado no es de origen obstétrico.',
          'Que puede trasladarse sin prioridad.',
        ],
        correcta: 1,
        explicacion: 'A la posible sangre oculta se suma la capacidad de compensación de la embarazada.',
      },
      {
        pregunta: '¿Qué antecedente se pregunta expresamente aunque el motivo de la llamada sea el sangrado?',
        opciones: [
          'El número de controles del embarazo.',
          'Un traumatismo reciente, incluso aparentemente leve, porque puede provocar un desprendimiento.',
          'El tipo de anticonceptivo usado antes del embarazo.',
          'La fecha de la última menstruación.',
        ],
        correcta: 1,
        explicacion: 'Es un dato que la lección señala expresamente por su relación con el desprendimiento.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso A: sangrado rojo abundante y súbito, sin dolor, útero blando, paciente estable. Caso B: sangrado escaso, dolor continuo, útero duro, paciente pálida y taquicárdica. ¿Qué patrón sugiere cada uno?',
          opciones: [
            'A desprendimiento y B placenta previa.',
            'A placenta previa y B desprendimiento, entendiendo que son patrones y no diagnósticos de campo.',
            'Ambos placenta previa.',
            'No pueden distinguirse en absoluto.',
          ],
          correcta: 1,
          explicacion: 'La tabla sirve para reconocer patrones; ninguno de sus rasgos es absoluto y el diagnóstico exige estudios hospitalarios.',
        },
        {
          pregunta: 'En el caso B, ¿por qué el sangrado visible NO mide la pérdida total?',
          opciones: [
            'Porque la paciente lo ha limpiado.',
            'Porque la sangre puede quedar retenida entre la placenta y la pared del útero sin salir al exterior.',
            'Porque el útero absorbe la sangre.',
            'Porque el sangrado es de origen urinario.',
          ],
          correcta: 1,
          explicacion: 'Es la idea central de la lección y la razón por la que se valora por perfusión y tendencia.',
        },
        {
          pregunta: '¿Qué conducta inmediata comparten ambos casos?',
          opciones: [
            'Tacto vaginal para diferenciarlos.',
            'La misma: valoración de la madre, oxigenación según protocolo, posición evitando el decúbito supino, prevención de hipotermia y traslado urgente con prealerta.',
            'Observación domiciliaria en el caso A.',
            'Esperar a que el sangrado ceda antes de trasladar.',
          ],
          correcta: 1,
          explicacion: 'En la calle no se diagnostican y la conducta inmediata es la misma para ambos patrones.',
        },
      ],
    },
    revision: ficha({
      version: 'WHO Managing Complications y WHO Maternal Health 2025 (secciones pendientes); Bibiano 3.ª ed., cap. 119',
      fuentes: [
        'WHO. Managing Complications in Pregnancy and Childbirth, 2.ª ed. (sección pendiente).',
        'WHO. Recommendations on Maternal Health, 2.ª ed., 2025 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 119, p. 1060.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las guías de la OMS.',
        'CONTROL: la lección prohíbe expresamente el tacto vaginal y explica la razón concreta.',
        'No se publica ninguna estimación de volumen de sangrado ni criterio numérico: se enseña a '
          + 'valorar por perfusión y tendencia.',
        'Los patrones se presentan como orientación con la advertencia expresa de que ninguno de sus '
          + 'rasgos es absoluto y de que no se diagnostican en campo.',
      ],
    }),
  },
}
