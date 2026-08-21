// ============================================================
//  MÓDULO 6 — Unidad «EMERGENCIAS EN PEDIATRÍA»
// ------------------------------------------------------------
//  Los 11 temas de la unidad.
//
//  CRITERIO ANTIDUPLICACIÓN (CLAUDE.md §10): varias de estas entidades ya
//  tienen tema canónico en el Módulo 4 —apendicitis, oclusión intestinal,
//  deshidratación, asma y sufrimiento fetal agudo—. Aquí NO se reescribe la
//  enfermedad: se desarrolla exclusivamente lo que cambia en el paciente
//  pediátrico y se remite al tema canónico para el resto.
//
//  UBICACIÓN CUESTIONADA: `m6-emp-sufrimiento-fetal` es un tema obstétrico
//  situado en la unidad de emergencias pediátricas. El registro de fuentes ya
//  señala que la academia debe revisar esa ubicación; la lección lo declara y
//  se limita a la parte que corresponde al equipo que atenderá al recién
//  nacido.
//
//  LÍMITES: ninguna dosis, ninguna concentración, ningún rango numérico por
//  edad. Todo ello depende de la guía adoptada, de la cinta de referencia
//  pediátrica y del protocolo del servicio.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const AHA_PALS_2025 = {
  nombre: 'AHA 2025 Pediatric Advanced Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support',
  nota: 'Guía primaria actual del soporte vital avanzado pediátrico. PENDIENTE: apartado exacto; no '
    + 'sostiene ninguna cifra concreta de esta unidad.',
}
const AHA_PBLS_2025 = {
  nombre: 'AHA/AAP 2025 Pediatric Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',
  nota: 'Guía primaria actual del soporte vital básico pediátrico. PENDIENTE: apartado exacto.',
}
const AHA_NEONATAL_2025 = {
  nombre: 'AHA/AAP 2025 Neonatal Resuscitation.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation',
  nota: 'Guía primaria actual de la reanimación y estabilización del recién nacido. PENDIENTE: '
    + 'apartado y algoritmo exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: reconocimiento y estabilización del niño gravemente enfermo. '
    + 'PENDIENTE: módulo y página exactos.',
}
const GINA_2026 = {
  nombre: 'Global Initiative for Asthma. GINA 2026 Strategy Report.',
  url: 'https://ginasthma.org/reports/',
  nota: 'Guía rectora del asma, incluida la población pediátrica; es la fuente asignada por el '
    + 'registro para esta entidad. PENDIENTE: capítulo y apartado pediátrico exactos; no sostiene '
    + 'ninguna dosis de esta lección.',
}
const WHO_MATERNAL_2025 = {
  nombre: 'World Health Organization. Recommendations on Maternal Health, 2.ª edición, 2025.',
  url: 'https://www.who.int/westernpacific/publications/i/item/9789240080591',
  nota: 'Guía primaria actual de salud materna. Se cita únicamente para el marco del bienestar fetal; '
    + 'el desarrollo obstétrico corresponde al Módulo 4. PENDIENTE: apartado exacto.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, formulario, equipamiento pediátrico y dirección médica de la academia '
    + 'R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija la medicación disponible, el material '
    + 'por edad, el alcance autorizado y el destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publican dosis, concentraciones ni rangos numéricos por edad: dependen de la '
  + 'guía adoptada, de la cinta de referencia pediátrica y del protocolo del servicio.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: oxígeno, medicación, accesos, fluidos, dispositivos y destino '
  + 'dependen del alcance autorizado, del equipamiento y del protocolo del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocer la gravedad, sostener, evitar el deterioro y '
  + 'trasladar. El diagnóstico es hospitalario y la impresión de campo no se presenta como tal.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA PALS 2025; AHA/AAP PBLS 2025; AHA/AAP Neonatal 2025; WHO/ICRC BEC 2018',
  observaciones: [
    'Redactado desde cero en el lote de Módulo 6; el tema estaba vacío.',
    AMBITO,
    SIN_CIFRAS,
    PROTOCOLO,
    ...extra,
  ],
  fuentes,
})

const FU = [
  'AHA 2025 Pediatric Advanced Life Support.',
  'AHA/AAP 2025 Pediatric Basic Life Support.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
  'Protocolo local (pendiente de entrega).',
]

export default {
  'm6-emp-ivr': {
    icono: 'cp-servier-cavidad-nasal',
    duracion: '15 min',
    resumen: 'Las infecciones respiratorias son el motivo más frecuente de consulta urgente en la '
      + 'infancia y la causa habitual del deterioro que acaba en paro. Lo que importa en la escena no '
      + 'es identificar el agente ni etiquetar el cuadro, sino responder a dos preguntas: dónde está '
      + 'la obstrucción —arriba o abajo— y cuánto está trabajando el niño para respirar. La lección '
      + 'organiza los cuadros por esa lógica y fija los signos de alarma.',
    objetivos: [
      'Distinguir la afectación de vía aérea superior de la inferior por sus signos.',
      'Graduar el trabajo respiratorio y reconocer los signos de agotamiento.',
      'Aplicar la conducta general y las precauciones que no dependen del diagnóstico.',
    ],
    secciones: [
      {
        titulo: 'Arriba o abajo',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Vía aérea superior', 'Vía aérea inferior'],
            filas: [
              ['Ruido característico', 'Estridor, sobre todo inspiratorio', 'Sibilancias espiratorias o crepitantes'],
              ['Voz y tos', 'Voz apagada, tos perruna o metálica', 'Tos habitualmente húmeda'],
              ['Postura', 'Busca posición para abrir la vía aérea; puede babear si le duele tragar', 'Prefiere estar incorporado'],
              ['Cuadros típicos', 'Laringitis, epiglotitis, cuerpo extraño, absceso', 'Bronquiolitis, neumonía, crisis asmática'],
              ['Prioridad', 'No irritar ni forzar: la agitación puede empeorar la obstrucción', 'Oxigenación, posición y vigilancia del agotamiento'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El niño que babea y no quiere tumbarse', texto: 'Un niño con fiebre, dificultad para tragar, babeo, voz apagada y que mantiene una postura concreta para respirar tiene una obstrucción alta que puede empeorar de forma brusca. En esa situación no se le tumba, no se le explora la boca, no se le fuerza y no se intenta ninguna maniobra que le haga llorar: se le deja en la posición que ha elegido, se administra oxígeno si lo tolera sin agitarse y se traslada avisando antes.' },
        ],
      },
      {
        titulo: 'Cuánto trabaja para respirar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos de trabajo respiratorio, de menor a mayor',
            items: [
              'Aumento de la frecuencia respiratoria.',
              'Aleteo nasal y uso de músculos accesorios del cuello.',
              'Retracciones: intercostales, subcostales y supraesternales.',
              'Quejido espiratorio, que indica que el niño intenta mantener el pulmón abierto.',
              'Balanceo de la cabeza en el lactante, que acompaña cada respiración.',
              'Incapacidad de completar frases, de alimentarse o de llorar con fuerza.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los signos que anuncian el paro', texto: 'Descenso del esfuerzo respiratorio en un niño que llevaba rato trabajando, somnolencia o agitación creciente, palidez o cianosis, bradicardia y silencio auscultatorio en un niño que antes tenía sibilancias. Ninguno de ellos significa mejoría: significan que la compensación se está agotando y que hay que intervenir sin esperar.' },
          {
            tipo: 'lista',
            titulo: 'Conducta general, sea cual sea el cuadro',
            items: [
              'Permitir la posición que el niño elija y mantenerlo con su cuidador.',
              'Evitar todo lo que le haga llorar mientras la obstrucción sea alta.',
              'Oxígeno conforme al protocolo, con el método que mejor tolere.',
              'No explorar la boca ni introducir nada en ella si se sospecha obstrucción alta.',
              'Vigilar de forma continua el trabajo respiratorio y el estado de conciencia.',
              'Medicación y dispositivos únicamente conforme al alcance autorizado y al protocolo.',
              'Traslado con prealerta si hay signos de agotamiento o de obstrucción alta grave.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El lactante y la nariz', texto: 'El lactante pequeño respira preferentemente por la nariz. Una obstrucción nasal por secreciones, que en un adulto sería una molestia menor, puede dificultarle de forma significativa la respiración y la alimentación. Es una causa frecuente de consulta y de aparente gravedad que mejora mucho con medidas sencillas conforme al protocolo.' },
        ],
      },
      F([AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Estridor', definicion: 'Ruido inspiratorio que indica obstrucción de la vía aérea superior.' },
      { termino: 'Quejido espiratorio', definicion: 'Sonido al espirar con el que el niño intenta mantener el pulmón abierto; signo de dificultad significativa.' },
      { termino: 'Retracciones', definicion: 'Hundimiento de los espacios intercostales, subcostales o supraesternales durante la inspiración por aumento del esfuerzo.' },
      { termino: 'Silencio auscultatorio', definicion: 'Desaparición de los ruidos respiratorios en un niño que antes los tenía; indica que apenas se moviliza aire.' },
    ],
    flashcards: [
      { frente: '¿Qué indica el estridor?', reverso: 'Obstrucción de la vía aérea superior.' },
      { frente: '¿Qué se hace ante un niño con babeo, voz apagada y postura elegida?', reverso: 'No tumbarlo, no explorar la boca, no agitarlo; oxígeno si lo tolera y traslado con prealerta.' },
      { frente: '¿Qué significa el silencio auscultatorio en un niño con sibilancias previas?', reverso: 'Que apenas moviliza aire: es un signo de alarma, no de mejoría.' },
      { frente: '¿Por qué preocupa la obstrucción nasal en el lactante?', reverso: 'Porque respira preferentemente por la nariz y eso dificulta su respiración y su alimentación.' },
      { frente: 'Cinco signos de trabajo respiratorio', reverso: 'Taquipnea, aleteo nasal, retracciones, quejido espiratorio y balanceo de la cabeza.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 3 años con fiebre, babeo, voz apagada y sentado inclinado hacia delante. ¿Qué NO debes hacer?',
        opciones: [
          'Administrarle oxígeno si lo tolera.',
          'Tumbarlo y explorarle la boca para ver la garganta.',
          'Mantenerlo con su cuidador.',
          'Trasladar con prealerta.',
        ],
        correcta: 1,
        explicacion: 'Tumbarlo, explorarle la boca o hacerle llorar pueden empeorar de forma brusca una obstrucción alta.',
      },
      {
        pregunta: 'Lactante con bronquiolitis que llevaba una hora con retracciones marcadas y ahora respira más despacio y está somnoliento. ¿Qué ocurre?',
        opciones: [
          'Ha mejorado y se está durmiendo.',
          'Se está agotando: el descenso del esfuerzo con somnolencia anuncia el paro.',
          'Ha resuelto la infección.',
          'Es el efecto normal del oxígeno.',
        ],
        correcta: 1,
        explicacion: 'Es el signo que la unidad repite como el más importante y el que más se malinterpreta.',
      },
      {
        pregunta: 'Auscultas a un niño con crisis respiratoria y encuentras un tórax casi silencioso. ¿Cómo lo interpretas?',
        opciones: [
          'Como resolución del cuadro.',
          'Como signo de alarma: apenas moviliza aire.',
          'Como error de auscultación.',
          'Como indicación de alta.',
        ],
        correcta: 1,
        explicacion: 'La desaparición de las sibilancias por falta de flujo es más grave que las sibilancias mismas.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Las sibilancias espiratorias orientan a afectación de la vía aérea ___.',
          opciones: ['superior', 'inferior', 'nasal exclusivamente'],
          correcta: 1,
          explicacion: 'El estridor, en cambio, orienta a la vía aérea superior.',
        },
        {
          texto: 'Ante una obstrucción alta, todo lo que haga ___ al niño puede empeorarla.',
          opciones: ['toser', 'llorar', 'dormir'],
          correcta: 1,
          explicacion: 'Por eso se evita explorarle la boca, tumbarlo o forzar cualquier maniobra.',
        },
        {
          texto: 'El quejido espiratorio indica que el niño intenta mantener el pulmón ___.',
          opciones: ['cerrado', 'abierto', 'seco'],
          correcta: 1,
          explicacion: 'Es un signo de dificultad respiratoria significativa.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-emp-sufrimiento-fetal': {
    icono: 'cp-smart-placenta',
    duracion: '12 min',
    resumen: 'Este es un tema obstétrico ubicado en la unidad de emergencias pediátricas, y la propia '
      + 'ubicación está pendiente de revisión por la academia. El desarrollo clínico del sufrimiento '
      + 'fetal agudo corresponde al tema del Módulo 4, que es su lugar canónico. Aquí se aborda solo '
      + 'lo que compete al equipo desde la perspectiva del recién nacido: qué significa para el niño '
      + 'que va a nacer, qué hay que preparar y qué información debe transmitirse.',
    objetivos: [
      'Situar el tema respecto a su desarrollo canónico y a la revisión de ubicación pendiente.',
      'Explicar qué implica el compromiso fetal para el recién nacido que se va a atender.',
      'Preparar la recepción del recién nacido y transmitir la información relevante.',
    ],
    secciones: [
      {
        titulo: 'Alcance de esta lección',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Ubicación pendiente de revisión', texto: 'El plan de estudios sitúa el sufrimiento fetal agudo en la unidad de emergencias pediátricas, cuando su contenido es obstétrico y ya se desarrolla en el Módulo 4. La academia debe decidir si el tema permanece aquí, se traslada o se convierte en un enlace. Mientras tanto, esta lección no duplica el desarrollo obstétrico: aborda la parte que corresponde a quien recibirá al recién nacido.' },
          { tipo: 'p', texto: 'El compromiso del bienestar fetal significa que el feto no está recibiendo el aporte de oxígeno que necesita. Sus causas, su reconocimiento durante el trabajo de parto y el manejo obstétrico se estudian en su tema propio del Módulo 4. Lo relevante aquí es la consecuencia: un recién nacido que ha sufrido una situación de aporte insuficiente tiene una probabilidad mayor de necesitar ayuda para completar la transición al nacer.' },
        ],
      },
      {
        titulo: 'Qué cambia para el equipo que recibirá al recién nacido',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué anticipar y preparar',
            items: [
              'Que puede hacer falta asistencia en la transición: material de vía aérea y de ventilación neonatal listo y comprobado.',
              'Que el control térmico será especialmente importante: paños secos, superficie caliente y ambiente sin corrientes.',
              'Que puede requerirse un segundo operador: uno atiende a la madre y otro al recién nacido.',
              'Que la prealerta debe avisar de la posibilidad de un parto con recién nacido comprometido, para que el centro prepare recursos.',
              'Que el reloj importa: se anota la hora del nacimiento y la evolución minuto a minuto.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Qué información hay que recoger y transmitir',
            items: [
              'Semanas de gestación referidas y si el embarazo tuvo seguimiento.',
              'Si hubo pérdida de líquido, su aspecto y desde cuándo.',
              'Si la madre refiere disminución de los movimientos fetales y desde cuándo.',
              'Antecedentes del embarazo y medicación materna.',
              'Qué se ha hecho hasta ese momento y a qué hora.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La atención a la madre no se interrumpe', texto: 'Anticipar la atención del recién nacido no significa desatender a la mujer. Son dos pacientes simultáneos, y por eso la solicitud precoz de un segundo recurso es una decisión clínica y no una comodidad. La atención obstétrica corresponde al Módulo 4 y al protocolo del servicio.' },
        ],
      },
      F([WHO_MATERNAL_2025, AHA_NEONATAL_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Bienestar fetal comprometido', definicion: 'Situación en que el feto no recibe el aporte de oxígeno que necesita; su desarrollo clínico corresponde al Módulo 4.' },
      { termino: 'Transición neonatal asistida', definicion: 'Necesidad de ayuda para que el recién nacido complete el paso a la respiración autónoma.' },
      { termino: 'Dos pacientes simultáneos', definicion: 'Situación en que madre y recién nacido requieren atención a la vez, y que justifica solicitar un segundo recurso de forma precoz.' },
    ],
    flashcards: [
      { frente: '¿Dónde se desarrolla clínicamente este tema?', reverso: 'En su tema canónico del Módulo 4; aquí solo se aborda la perspectiva del recién nacido.' },
      { frente: '¿Qué implica para el recién nacido?', reverso: 'Mayor probabilidad de necesitar ayuda para completar la transición al nacer.' },
      { frente: '¿Qué se prepara si se anticipa un recién nacido comprometido?', reverso: 'Material de vía aérea y ventilación neonatal, control térmico y, si es posible, un segundo operador.' },
      { frente: '¿Qué información materna se recoge y se transmite?', reverso: 'Semanas de gestación, seguimiento, pérdida y aspecto del líquido, movimientos fetales, antecedentes y medicación.' },
      { frente: '¿Por qué se solicita un segundo recurso de forma precoz?', reverso: 'Porque hay dos pacientes simultáneos y ambos requieren atención.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer en trabajo de parto que refiere disminución marcada de los movimientos fetales. ¿Qué anticipa el equipo?',
        opciones: [
          'Nada distinto de un parto normal.',
          'Que el recién nacido puede necesitar asistencia en la transición: se prepara material neonatal, control térmico y se prealerta.',
          'Que debe retrasarse el traslado.',
          'Que el recién nacido no requerirá control de temperatura.',
        ],
        correcta: 1,
        explicacion: 'La anticipación y la preparación del material son la aportación concreta de esta lección.',
      },
      {
        pregunta: '¿Por qué esta lección no desarrolla el manejo obstétrico?',
        opciones: [
          'Porque no es relevante.',
          'Porque su tema canónico está en el Módulo 4 y duplicarlo generaría dos versiones del mismo contenido.',
          'Porque no existe guía disponible.',
          'Porque el equipo prehospitalario no atiende partos.',
        ],
        correcta: 1,
        explicacion: 'El criterio antiduplicación exige elegir un tema canónico y enlazar desde el otro.',
      },
      {
        pregunta: 'Ante un parto inminente con sospecha de compromiso fetal y un solo equipo en la escena, ¿qué corresponde?',
        opciones: [
          'Atender solo a la madre.',
          'Solicitar de forma precoz un segundo recurso, porque habrá dos pacientes simultáneos.',
          'Atender solo al recién nacido cuando nazca.',
          'Esperar a que el parto se produzca antes de pedir apoyo.',
        ],
        correcta: 1,
        explicacion: 'La solicitud precoz es una decisión clínica, no una comodidad.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Vas a atender un parto en domicilio con antecedente de disminución de movimientos fetales. ¿Qué preparas antes de que nazca y qué comunicas al centro?',
          opciones: [
            'Nada especial; se improvisa según lo que ocurra.',
            'Material de vía aérea y ventilación neonatal comprobado, paños secos y superficie caliente, y prealerta avisando de la posibilidad de un recién nacido que requiera asistencia, con semanas de gestación y antecedentes.',
            'Solo material para la madre.',
            'Se traslada sin avisar para no saturar al centro.',
          ],
          correcta: 1,
          explicacion: 'La lección concreta exactamente esa preparación y esa transmisión de información como su aportación propia.',
        },
      ],
    },
    revision: ficha({
      fuentes: ['WHO. Recommendations on Maternal Health, 2.ª ed., 2025.', 'AHA/AAP 2025 Neonatal Resuscitation.', 'WHO/ICRC. Basic Emergency Care, 2018.', 'Protocolo local (pendiente de entrega).'],
      extra: [
        'DECISIÓN PENDIENTE: la academia debe revisar la ubicación de este tema, obstétrico por contenido y situado en la unidad de emergencias pediátricas. El registro de fuentes ya lo señalaba.',
        'CRITERIO ANTIDUPLICACIÓN: el desarrollo clínico permanece en el tema canónico del Módulo 4; esta lección solo cubre la perspectiva del recién nacido.',
      ],
    }),
  },

  'm6-emp-patologia-respiratoria-rn': {
    icono: 'ic-recien-nacido',
    duracion: '13 min',
    resumen: 'El recién nacido con dificultad respiratoria plantea un problema distinto al del lactante '
      + 'mayor: sus signos son pocos e inespecíficos, y las causas van desde la transición pulmonar '
      + 'incompleta hasta la infección, la cardiopatía o una malformación. La lección enseña a '
      + 'reconocer la dificultad respiratoria neonatal, a no quedarse con la primera explicación y a '
      + 'aplicar una conducta de soporte que es la misma sea cual sea la causa.',
    objetivos: [
      'Reconocer los signos de dificultad respiratoria en el recién nacido.',
      'Enumerar los grupos de causas posibles sin pretender diagnosticarlas.',
      'Aplicar la conducta de soporte común y las señales de alarma.',
    ],
    secciones: [
      {
        titulo: 'Cómo se manifiesta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos en el recién nacido',
            items: [
              'Aumento de la frecuencia respiratoria mantenido.',
              'Quejido espiratorio audible sin fonendoscopio.',
              'Aleteo nasal.',
              'Retracciones intercostales, subcostales y del esternón.',
              'Cianosis, que puede ser difícil de valorar según la iluminación y el color de piel.',
              'Pausas respiratorias o respiración irregular.',
              'Rechazo del alimento o incapacidad de mantener la succión, que en el recién nacido es un signo respiratorio.',
              'Hipotonía y escasa reactividad.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'En el recién nacido casi todo se parece a casi todo', texto: 'Una infección grave, una cardiopatía, una hipoglucemia y un problema pulmonar pueden presentarse igual: un recién nacido que respira mal, come poco y está decaído. Por eso la conducta no es identificar la causa, sino sostener al paciente, medir la glucemia si está dentro del alcance, mantener el calor y trasladar con rapidez a un centro con capacidad neonatal.' },
        ],
      },
      {
        titulo: 'Los grupos de causas y la conducta',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Grupo', 'Ejemplos de origen'],
            filas: [
              ['Transición pulmonar', 'Dificultad para completar el paso al pulmón ventilado tras el nacimiento'],
              ['Pulmonar', 'Aspiración de contenido, neumotórax, infección pulmonar'],
              ['Infeccioso general', 'Infección grave, que en el recién nacido puede manifestarse solo por decaimiento y mala alimentación'],
              ['Cardiaco', 'Cardiopatía congénita, con su tema propio en esta unidad'],
              ['Metabólico', 'Hipoglucemia y otras alteraciones que se manifiestan de forma inespecífica'],
              ['Obstructivo o malformativo', 'Obstrucción de la vía aérea superior o alteraciones anatómicas'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Conducta de soporte, igual sea cual sea la causa',
            items: [
              'Mantener la vía aérea en posición neutra, sin flexionar ni hiperextender.',
              'Oxígeno y apoyo ventilatorio conforme al alcance y al protocolo, comprobando que el tórax se mueve.',
              'Control térmico agresivo: secar, cubrir incluida la cabeza y calentar el habitáculo.',
              'Medir la glucemia si está dentro del alcance.',
              'Manipulación mínima: cada manipulación consume energía y empeora al paciente.',
              'Traslado a centro con capacidad neonatal, con prealerta y con la hora de nacimiento y de inicio de los síntomas.',
              'Recoger la información del parto: dónde y cuándo nació, semanas de gestación, aspecto del líquido y si necesitó ayuda al nacer.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El frío empeora todo', texto: 'La hipotermia en el recién nacido aumenta el consumo de oxígeno, favorece la hipoglucemia y agrava la dificultad respiratoria. Mantener la temperatura no es un cuidado añadido: forma parte del tratamiento de la dificultad respiratoria neonatal.' },
        ],
      },
      F([AHA_NEONATAL_2025, AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Quejido espiratorio neonatal', definicion: 'Sonido audible al espirar con el que el recién nacido intenta mantener el pulmón abierto; signo de dificultad significativa.' },
      { termino: 'Rechazo del alimento', definicion: 'Incapacidad de mantener la succión; en el recién nacido puede ser el primer signo de un problema respiratorio o infeccioso.' },
      { termino: 'Presentación inespecífica', definicion: 'Manifestación similar de causas muy distintas en el recién nacido, que impide diagnosticar en la escena.' },
    ],
    flashcards: [
      { frente: 'Cuatro signos de dificultad respiratoria neonatal', reverso: 'Taquipnea mantenida, quejido espiratorio, aleteo nasal y retracciones.' },
      { frente: '¿Por qué el rechazo del alimento es un signo respiratorio?', reverso: 'Porque el recién nacido con dificultad no puede mantener la succión.' },
      { frente: '¿Se puede identificar la causa en la escena?', reverso: 'No: infección, cardiopatía, hipoglucemia y problema pulmonar se presentan igual.' },
      { frente: '¿Por qué la manipulación debe ser mínima?', reverso: 'Porque consume energía y empeora al recién nacido.' },
      { frente: '¿Por qué el control térmico forma parte del tratamiento?', reverso: 'Porque la hipotermia aumenta el consumo de oxígeno, favorece la hipoglucemia y agrava la dificultad respiratoria.' },
    ],
    quiz: [
      {
        pregunta: 'Recién nacido de 5 días con quejido, aleteo nasal y que come mal. ¿Cuál es la conducta?',
        opciones: [
          'Identificar la causa antes de intervenir.',
          'Soporte: vía aérea neutra, oxígeno según protocolo, control térmico, glucemia si está dentro del alcance, manipulación mínima y traslado con prealerta.',
          'Estimularlo enérgicamente para que reaccione.',
          'Ofrecerle alimento para comprobar la tolerancia.',
        ],
        correcta: 1,
        explicacion: 'La causa no puede identificarse en la escena y la conducta de soporte es la misma sea cual sea.',
      },
      {
        pregunta: '¿Por qué se mide la glucemia en un recién nacido decaído?',
        opciones: [
          'Porque la hipoglucemia solo ocurre en hijos de madre diabética.',
          'Porque es una causa frecuente, tratable y que se presenta de forma inespecífica, igual que otras más graves.',
          'Para calcular la dosis de oxígeno.',
          'Para decidir el centro de destino.',
        ],
        correcta: 1,
        explicacion: 'En el recién nacido las manifestaciones inespecíficas obligan a descartar lo tratable.',
      },
      {
        pregunta: '¿Qué información del parto conviene recoger?',
        opciones: [
          'Solo el peso al nacer.',
          'Dónde y cuándo nació, semanas de gestación, aspecto del líquido y si necesitó ayuda al nacer.',
          'El nombre del centro donde se hizo el seguimiento únicamente.',
          'Ninguna: no influye en la atención.',
        ],
        correcta: 1,
        explicacion: 'Es información que el centro receptor necesita y que solo puede obtenerse en ese momento.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el recién nacido, la incapacidad de mantener la ___ puede ser el primer signo de dificultad respiratoria.',
          opciones: ['mirada', 'succión', 'postura'],
          correcta: 1,
          explicacion: 'Comer exige un esfuerzo respiratorio que el paciente comprometido no puede sostener.',
        },
        {
          texto: 'La hipotermia neonatal ___ el consumo de oxígeno.',
          opciones: ['reduce', 'aumenta', 'no modifica'],
          correcta: 1,
          explicacion: 'Además favorece la hipoglucemia y agrava la dificultad respiratoria.',
        },
        {
          texto: 'Ante un recién nacido comprometido, la manipulación debe ser ___.',
          opciones: ['frecuente', 'mínima', 'enérgica'],
          correcta: 1,
          explicacion: 'Cada manipulación consume energía que el paciente no tiene.',
        },
      ],
    },
    revision: ficha({ fuentes: [...FU, 'AHA/AAP 2025 Neonatal Resuscitation.'] }),
  },

  'm6-emp-rn-sano-asfixia': {
    icono: 'ic-recien-nacido',
    duracion: '15 min',
    resumen: 'Tras un parto extrahospitalario, el equipo debe decidir en segundos si el recién nacido '
      + 'necesita solo cuidados de rutina o si requiere asistencia. Esa decisión se apoya en muy pocos '
      + 'datos: si respira o llora, si tiene buen tono y si su frecuencia cardiaca es adecuada. La '
      + 'lección desarrolla la atención al recién nacido vigoroso y la secuencia cuando no lo está, '
      + 'con el calor y la ventilación como intervenciones centrales.',
    objetivos: [
      'Decidir si el recién nacido requiere cuidados de rutina o asistencia.',
      'Aplicar los cuidados del recién nacido vigoroso, incluido el control térmico.',
      'Ejecutar la secuencia inicial cuando el recién nacido no está vigoroso.',
    ],
    secciones: [
      {
        titulo: 'La decisión de los primeros segundos',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Tres preguntas',
            items: [
              '¿Respira o llora con fuerza?',
              '¿Tiene buen tono muscular?',
              '¿Su frecuencia cardiaca es adecuada, valorada como indique la guía y el protocolo?',
            ],
          },
          { tipo: 'p', texto: 'Si las respuestas son afirmativas, el recién nacido es vigoroso y solo necesita cuidados de rutina, que pueden hacerse en contacto con su madre. Si alguna no lo es, se inician los pasos de estabilización sin esperar.' },
          {
            tipo: 'lista',
            titulo: 'Cuidados del recién nacido vigoroso',
            items: [
              'Secarlo con energía moderada y retirar de inmediato los paños húmedos.',
              'Colocarlo piel con piel sobre su madre, si la situación de ambos lo permite, y cubrir a los dos, incluida la cabeza del recién nacido.',
              'Mantener la vía aérea libre sin aspiración sistemática.',
              'Vigilar respiración, tono y color de forma continua durante todo el traslado.',
              'Manejo del cordón conforme al protocolo del servicio.',
              'Anotar la hora exacta del nacimiento.',
              'Proteger del frío también durante el traslado: el habitáculo caliente y sin corrientes.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El contacto piel con piel es una intervención', texto: 'Mantiene la temperatura mejor que casi cualquier alternativa disponible en una ambulancia, favorece la estabilidad del recién nacido y no cuesta material. Cuando la situación de la madre y del niño lo permite, es la opción preferente, con ambos cubiertos y bajo vigilancia continua.' },
        ],
      },
      {
        titulo: 'Cuando no está vigoroso',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia inicial',
            items: [
              'Calor: secar, retirar los paños húmedos y colocarlo sobre una superficie caliente.',
              'Posición: cabeza en posición neutra, evitando flexión e hiperextensión.',
              'Despejar la vía aérea solo si hay obstrucción evidente.',
              'Estimular con suavidad: secado enérgico moderado, frotar la espalda o las plantas.',
              'Reevaluar respiración y frecuencia cardiaca.',
              'Si no respira o la frecuencia es insuficiente, iniciar ventilación con presión positiva conforme a la guía y al protocolo.',
              'Comprobar que la ventilación es eficaz: el tórax debe moverse. Si no mejora, revisar sellado, posición y permeabilidad antes que cualquier otra cosa.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Estimular no es zarandear', texto: 'La estimulación del recién nacido es suave: secarlo, frotarle la espalda o las plantas de los pies. No se le sacude, no se le sostiene boca abajo, no se le golpea y no se le sumerge en agua. Esas prácticas no funcionan y pueden causar daño, incluido daño cerebral por sacudida.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre el término «asfixia»', texto: 'El título del plan habla de recién nacido «con asfixia». Es un término que en la literatura tiene una definición precisa basada en datos que no están disponibles en la escena, y que el ámbito prehospitalario no puede aplicar. Lo que sí se puede describir es lo observado: si respiró o no, si tuvo tono, cuál era su frecuencia cardiaca, qué se hizo y cómo respondió, con las horas. Esa descripción vale más que una etiqueta.' },
          {
            tipo: 'lista',
            titulo: 'Además',
            items: [
              'Vigilar y prevenir la hipoglucemia; medir la glucemia si está dentro del alcance.',
              'Manipulación mínima una vez estabilizado.',
              'Traslado a centro con capacidad neonatal y prealerta.',
              'Documentar la hora de nacimiento, la de inicio de cada intervención y la respuesta.',
              'Atender también a la madre: son dos pacientes.',
            ],
          },
        ],
      },
      F([AHA_NEONATAL_2025, WHO_BEC, AHA_PBLS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Recién nacido vigoroso', definicion: 'El que respira o llora con fuerza, tiene buen tono y frecuencia cardiaca adecuada; solo requiere cuidados de rutina.' },
      { termino: 'Contacto piel con piel', definicion: 'Colocación del recién nacido sobre su madre, ambos cubiertos; medida eficaz de control térmico y de estabilidad.' },
      { termino: 'Estimulación suave', definicion: 'Secado y frotamiento de espalda o plantas; excluye sacudir, golpear o sostener boca abajo.' },
      { termino: 'Descripción frente a etiqueta', definicion: 'Registro de lo observado y de la respuesta en lugar de aplicar un término cuya definición exige datos no disponibles en la escena.' },
    ],
    flashcards: [
      { frente: 'Las tres preguntas de los primeros segundos', reverso: '¿Respira o llora con fuerza? ¿Tiene buen tono? ¿Su frecuencia cardiaca es adecuada?' },
      { frente: '¿Qué necesita un recién nacido vigoroso?', reverso: 'Solo cuidados de rutina: secado, calor, piel con piel si es posible y vigilancia.' },
      { frente: '¿Cómo se estimula a un recién nacido?', reverso: 'Secándolo y frotando su espalda o sus plantas; nunca sacudiéndolo ni golpeándolo.' },
      { frente: '¿Qué se revisa si la ventilación no mejora al recién nacido?', reverso: 'Sellado de la mascarilla, posición de la cabeza y permeabilidad de la vía aérea, comprobando que el tórax se mueve.' },
      { frente: '¿Por qué no se usa la etiqueta «asfixia» en el informe?', reverso: 'Porque su definición exige datos no disponibles en la escena; se describe lo observado con las horas.' },
      { frente: '¿Está indicada la aspiración sistemática?', reverso: 'No: solo si hay obstrucción evidente.' },
    ],
    quiz: [
      {
        pregunta: 'Recién nacido que llora con fuerza, con buen tono y frecuencia cardiaca adecuada. ¿Qué corresponde?',
        opciones: [
          'Iniciar ventilación con presión positiva.',
          'Cuidados de rutina: secar, retirar paños húmedos, piel con piel con su madre si es posible, cubrir y vigilar.',
          'Aspirar de forma sistemática.',
          'Separarlo de la madre para valorarlo mejor.',
        ],
        correcta: 1,
        explicacion: 'Es un recién nacido vigoroso y no requiere asistencia.',
      },
      {
        pregunta: 'Un familiar sugiere sostener boca abajo al recién nacido que no respira y darle unas palmadas. ¿Qué respondes?',
        opciones: [
          'Que es la técnica correcta.',
          'Que no: la estimulación es suave —secado y frotar espalda o plantas— y esas prácticas no funcionan y pueden causar daño.',
          'Que se haga solo con recién nacidos a término.',
          'Que se sumerja en agua fría para estimularlo.',
        ],
        correcta: 1,
        explicacion: 'La lección proscribe expresamente sacudir, golpear o sostener boca abajo.',
      },
      {
        pregunta: 'En el informe de un recién nacido que necesitó asistencia, ¿qué formulación es correcta?',
        opciones: [
          '«Recién nacido con asfixia perinatal».',
          '«No respiró de forma espontánea al nacer; tono disminuido; se aplicaron pasos iniciales a las 04:12 y ventilación con presión positiva a las 04:13; inició respiración espontánea a las 04:15».',
          '«Parto normal».',
          '«Recién nacido grave».',
        ],
        correcta: 1,
        explicacion: 'La descripción con horas vale más que una etiqueta cuya definición exige datos no disponibles en la escena.',
      },
      {
        pregunta: '¿Por qué el contacto piel con piel se considera una intervención?',
        opciones: [
          'Por razones afectivas exclusivamente.',
          'Porque mantiene la temperatura mejor que casi cualquier alternativa disponible en una ambulancia y favorece la estabilidad del recién nacido.',
          'Porque sustituye a la ventilación.',
          'Porque acelera la expulsión de la placenta.',
        ],
        correcta: 1,
        explicacion: 'Es eficaz, no cuesta material y se aplica cuando la situación de ambos lo permite.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la atención del recién nacido que NO está vigoroso',
        pasos: [
          'Secar, retirar los paños húmedos y colocarlo sobre superficie caliente',
          'Colocar la cabeza en posición neutra',
          'Despejar la vía aérea solo si hay obstrucción evidente',
          'Estimular con suavidad frotando espalda o plantas',
          'Reevaluar respiración y frecuencia cardiaca',
          'Iniciar ventilación con presión positiva si no respira o la frecuencia es insuficiente',
          'Comprobar que el tórax se mueve y revisar sellado y posición si no mejora',
        ],
      },
    },
    revision: ficha({
      fuentes: ['AHA/AAP 2025 Neonatal Resuscitation.', 'WHO/ICRC. Basic Emergency Care, 2018.', 'AHA/AAP 2025 Pediatric Basic Life Support.', 'Protocolo local (pendiente de entrega).'],
      extra: ['La lección evita la etiqueta «asfixia» en el registro prehospitalario por exigir datos no disponibles en la escena, y prescribe describir lo observado con las horas.'],
    }),
  },

  'm6-emp-asma': {
    icono: 'cp-servier-bronquio-inflamado',
    duracion: '14 min',
    resumen: 'La crisis asmática infantil se reconoce por el esfuerzo respiratorio y por la capacidad '
      + 'del niño de hablar, comer y moverse, más que por el ruido que hace. La lección se centra en '
      + 'lo que cambia en pediatría —la fatiga aparece antes, el silencio auscultatorio es una alarma '
      + 'y la agitación puede ser hipoxia— y remite la enfermedad y su tratamiento farmacológico al '
      + 'tema canónico del Módulo 4 y a la guía GINA vigente.',
    objetivos: [
      'Graduar la crisis asmática pediátrica por criterios funcionales.',
      'Reconocer los signos de gravedad y de agotamiento propios del niño.',
      'Aplicar la conducta de soporte dentro del alcance autorizado.',
    ],
    secciones: [
      {
        titulo: 'Graduar por función, no por ruido',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Crisis leve o moderada', 'Crisis grave'],
            filas: [
              ['Habla', 'Frases completas o entrecortadas', 'Palabras sueltas o no puede hablar'],
              ['Actividad', 'Juega o se mueve con dificultad', 'No juega, no come, no puede caminar'],
              ['Esfuerzo', 'Retracciones leves o moderadas', 'Retracciones marcadas, uso de músculos accesorios'],
              ['Estado mental', 'Alerta', 'Agitado, confuso o somnoliento'],
              ['Auscultación', 'Sibilancias audibles', 'Sibilancias o, peor aún, silencio auscultatorio'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Las tres señales que más se malinterpretan', texto: 'El silencio auscultatorio no es mejoría: significa que apenas entra aire. La agitación de un niño con crisis suele ser hipoxia, no mal comportamiento ni miedo. Y el descenso del esfuerzo respiratorio en un niño que llevaba rato trabajando indica agotamiento. Ante cualquiera de las tres, la conducta cambia de inmediato.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Permitir la posición en que el niño respira mejor, habitualmente sentado, y mantenerlo con su cuidador.',
              'Evitar todo lo que aumente su ansiedad o su consumo de oxígeno.',
              'Oxígeno conforme al protocolo, con el método que mejor tolere.',
              'Broncodilatador y resto de medicación exclusivamente conforme al alcance autorizado y al protocolo del servicio; si el niño tiene su propia medicación de rescate prescrita, su uso se ajusta al procedimiento del servicio.',
              'Preguntar por crisis previas, ingresos, uso de medicación en las últimas horas y si ha necesitado atención urgente antes: el antecedente de crisis graves es un factor de riesgo.',
              'Vigilar de forma continua el estado mental y el esfuerzo respiratorio.',
              'Traslado con prealerta ante cualquier signo de gravedad, sin esperar a que el cuadro se complete.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Dónde está el desarrollo completo', texto: 'La fisiopatología del asma, su clasificación y su tratamiento farmacológico se estudian en el tema canónico de las urgencias respiratorias del Módulo 4, con la guía GINA vigente como fuente rectora. Esta lección no los repite: desarrolla lo específicamente pediátrico y remite al tema canónico para el resto, de modo que no existan dos versiones del mismo contenido.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'No todo lo que silba es asma', texto: 'En el lactante, las sibilancias pueden deberse a una bronquiolitis, a un cuerpo extraño o a otras causas, y el manejo no es el mismo. Un primer episodio de sibilancias en un lactante, o unas sibilancias de inicio brusco en un niño que estaba jugando con objetos pequeños, obligan a considerar otras posibilidades y a comunicarlo.' },
        ],
      },
      F([GINA_2026, AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Silencio auscultatorio', definicion: 'Ausencia de ruidos respiratorios en una crisis; indica que apenas se moviliza aire y es signo de gravedad.' },
      { termino: 'Agitación por hipoxia', definicion: 'Inquietud del niño con crisis respiratoria debida a oxigenación insuficiente, y no a miedo o mal comportamiento.' },
      { termino: 'Criterio funcional', definicion: 'Graduación de la crisis según lo que el niño puede hacer —hablar, comer, moverse— en lugar de por el ruido que produce.' },
    ],
    flashcards: [
      { frente: '¿Cómo se gradúa la crisis en el niño?', reverso: 'Por lo que puede hacer: hablar, comer, moverse y su estado mental, más que por el ruido.' },
      { frente: '¿Qué significa el silencio auscultatorio?', reverso: 'Que apenas entra aire: es un signo de gravedad, no de mejoría.' },
      { frente: '¿Qué suele significar la agitación en una crisis?', reverso: 'Hipoxia.' },
      { frente: '¿Dónde se estudia el tratamiento farmacológico del asma?', reverso: 'En el tema canónico de urgencias respiratorias del Módulo 4, con la guía GINA vigente.' },
      { frente: '¿Todo lo que silba en un lactante es asma?', reverso: 'No: puede ser bronquiolitis, cuerpo extraño u otras causas con manejo distinto.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 6 años con crisis que solo puede decir palabras sueltas y está agitado. ¿Cómo lo clasificas?',
        opciones: [
          'Leve: sigue hablando.',
          'Grave: la limitación del habla y la agitación —probable hipoxia— son criterios de gravedad.',
          'Moderada, porque no está somnoliento.',
          'No clasificable sin auscultación.',
        ],
        correcta: 1,
        explicacion: 'Los criterios funcionales bastan para graduar la crisis.',
      },
      {
        pregunta: 'Durante el traslado, las sibilancias de un niño desaparecen y su esfuerzo respiratorio disminuye. ¿Qué haces?',
        opciones: [
          'Reduces el oxígeno: ha mejorado.',
          'Lo interpretas como agotamiento y silencio auscultatorio, intervienes sin esperar y comunicas el cambio.',
          'Suspendes la vigilancia.',
          'Esperas a que reaparezcan las sibilancias.',
        ],
        correcta: 1,
        explicacion: 'Es la combinación que la lección señala como la más malinterpretada.',
      },
      {
        pregunta: 'Lactante con primer episodio de sibilancias de inicio brusco mientras jugaba con piezas pequeñas. ¿Qué consideras?',
        opciones: [
          'Que es una crisis asmática típica.',
          'Que hay que considerar otras causas, entre ellas un cuerpo extraño, y comunicarlo.',
          'Que no requiere traslado.',
          'Que debe administrarse medicación de rescate de un familiar.',
        ],
        correcta: 1,
        explicacion: 'No todo lo que silba es asma, y el manejo de las otras causas no es el mismo.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En una crisis, la desaparición de las sibilancias con menor esfuerzo indica ___.',
          opciones: ['mejoría', 'agotamiento', 'error de auscultación'],
          correcta: 1,
          explicacion: 'Apenas se moviliza aire; la conducta cambia de inmediato.',
        },
        {
          texto: 'La agitación de un niño con crisis respiratoria suele ser ___.',
          opciones: ['miedo', 'hipoxia', 'dolor'],
          correcta: 1,
          explicacion: 'Interpretarla como mal comportamiento retrasa la intervención.',
        },
        {
          texto: 'La crisis se gradúa sobre todo por lo que el niño puede ___.',
          opciones: ['oír', 'hacer', 'recordar'],
          correcta: 1,
          explicacion: 'Hablar, comer y moverse son los criterios funcionales.',
        },
      ],
    },
    revision: ficha({
      fuentes: ['GINA 2026 Strategy Report.', 'AHA 2025 Pediatric Advanced Life Support.', 'WHO/ICRC. Basic Emergency Care, 2018.', 'Protocolo local (pendiente de entrega).'],
      extra: ['CRITERIO ANTIDUPLICACIÓN: la enfermedad y su tratamiento farmacológico permanecen en el tema canónico del Módulo 4; aquí solo se desarrolla lo pediátrico.'],
    }),
  },

  'm6-emp-deshidratacion': {
    icono: 'cp-servier-agua',
    duracion: '14 min',
    resumen: 'La deshidratación es una de las causas más frecuentes de deterioro evitable en la '
      + 'infancia, y el niño llega antes a ella que el adulto: tiene más agua corporal en proporción, '
      + 'la recambia más deprisa y depende de otra persona para beber. La lección enseña a estimar la '
      + 'gravedad con signos clínicos observables, a reconocer el shock hipovolémico pediátrico y a '
      + 'aplicar la conducta según el alcance autorizado.',
    objetivos: [
      'Explicar por qué el niño se deshidrata antes y con más facilidad.',
      'Estimar la gravedad de la deshidratación con signos clínicos.',
      'Reconocer el shock hipovolémico pediátrico y aplicar la conducta correspondiente.',
    ],
    secciones: [
      {
        titulo: 'Por qué el niño llega antes',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuatro razones',
            items: [
              'Su proporción de agua corporal es mayor y su recambio, más rápido.',
              'Su superficie corporal relativa es grande, de modo que pierde más por la piel y por la respiración.',
              'No puede procurarse líquido por sí mismo: depende de que alguien se lo ofrezca y de que él lo tolere.',
              'Las causas habituales —vómito, diarrea, fiebre, rechazo del alimento— aparecen con frecuencia y se combinan entre sí.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta que mejor estima la pérdida', texto: 'Cuántos pañales mojados ha tenido o cuántas veces ha orinado, y desde cuándo. Es más informativa que cualquier estimación visual, la responde el cuidador con precisión y permite comparar con lo habitual de ese niño. Se pregunta también cuántos vómitos y deposiciones ha tenido, desde cuándo, y si tolera líquidos.' },
        ],
      },
      {
        titulo: 'Estimar la gravedad y actuar',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Leve', 'Moderada', 'Grave'],
            filas: [
              ['Estado general', 'Alerta, activo', 'Irritable o decaído', 'Somnoliento o no reactivo'],
              ['Sed', 'Bebe con normalidad', 'Sediento, bebe con avidez', 'Bebe mal o es incapaz de beber'],
              ['Mucosas y lágrimas', 'Húmedas, llanto con lágrimas', 'Secas, llanto con pocas lágrimas', 'Muy secas, llanto sin lágrimas'],
              ['Ojos y fontanela', 'Normales', 'Algo hundidos', 'Hundidos; fontanela deprimida en el lactante'],
              ['Piel y relleno capilar', 'Normales', 'Pliegue que tarda en deshacerse', 'Pliegue muy lento, piel fría y moteada, relleno capilar lento'],
              ['Diuresis', 'Conservada', 'Disminuida', 'Muy escasa o ausente'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuándo deja de ser deshidratación y es shock', texto: 'Cuando aparecen taquicardia mantenida, pulso periférico débil, piel fría y moteada, relleno capilar lento y alteración del estado mental, el niño está en shock hipovolémico. La presión arterial puede seguir siendo normal: no se espera a que caiga. Es una situación de traslado urgente con prealerta.' },
          {
            tipo: 'lista',
            titulo: 'Conducta',
            items: [
              'Deshidratación leve o moderada con tolerancia oral: rehidratación por vía oral en pequeñas cantidades y de forma frecuente, conforme al protocolo del servicio.',
              'Vómito persistente, rechazo del líquido o deterioro: no insistir por vía oral y trasladar.',
              'Accesos y fluidos por vía vascular exclusivamente conforme al alcance autorizado y al protocolo.',
              'Medir la glucemia si está dentro del alcance: la hipoglucemia acompaña con frecuencia a estos cuadros.',
              'Prevenir la hipotermia, sobre todo en el lactante.',
              'Registrar el número de vómitos, deposiciones y pañales, y el peso si el cuidador lo conoce.',
              'Traslado con prealerta ante deshidratación grave o signos de shock.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dónde está el desarrollo general', texto: 'El cuadro de deshidratación en el adulto y su fisiopatología general se estudian en su tema canónico del Módulo 4. Aquí se desarrolla lo pediátrico, que es donde cambian la velocidad de instauración, los signos utilizables y el margen de tolerancia.' },
        ],
      },
      F([WHO_BEC, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Signo del pliegue', definicion: 'Persistencia del pliegue cutáneo tras pellizcar la piel; indica pérdida de líquido y su lentitud se correlaciona con la gravedad.' },
      { termino: 'Fontanela deprimida', definicion: 'Hundimiento de la zona blanda del cráneo del lactante; signo de deshidratación significativa.' },
      { termino: 'Shock hipovolémico pediátrico', definicion: 'Hipoperfusión por pérdida de volumen con taquicardia, piel fría, relleno capilar lento y alteración del estado mental, con presión aún normal.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la pregunta que mejor estima la pérdida?', reverso: 'Cuántos pañales mojados o micciones ha tenido y desde cuándo.' },
      { frente: 'Tres signos de deshidratación grave', reverso: 'Llanto sin lágrimas, ojos y fontanela hundidos, y pliegue cutáneo muy lento con piel fría y moteada.' },
      { frente: '¿Se espera a la hipotensión para reconocer el shock?', reverso: 'No: la presión puede seguir normal mientras el niño está en shock.' },
      { frente: '¿Cuándo no se insiste con la vía oral?', reverso: 'Ante vómito persistente, rechazo del líquido o deterioro del estado general.' },
      { frente: '¿Por qué se mide la glucemia?', reverso: 'Porque la hipoglucemia acompaña con frecuencia a estos cuadros.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante con diarrea de dos días, decaído, con llanto sin lágrimas, fontanela deprimida y relleno capilar lento. ¿Cómo lo clasificas y qué haces?',
        opciones: [
          'Leve; rehidratación oral en el domicilio.',
          'Grave, con signos de shock: traslado urgente con prealerta, glucemia si está dentro del alcance y prevención de la hipotermia.',
          'Moderada; se cita para el día siguiente.',
          'No valorable sin analítica.',
        ],
        correcta: 1,
        explicacion: 'La combinación de esos signos define la deshidratación grave con compromiso circulatorio.',
      },
      {
        pregunta: 'Niño con vómitos que rechaza el líquido y vomita todo lo que se le ofrece. ¿Qué corresponde?',
        opciones: [
          'Insistir con la vía oral hasta que tolere.',
          'No insistir por vía oral y trasladar; los accesos y fluidos dependen del alcance y del protocolo.',
          'Ofrecer alimentos sólidos.',
          'Esperar dos horas antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'La intolerancia oral es uno de los criterios que cambian la conducta.',
      },
      {
        pregunta: '¿Por qué el niño se deshidrata antes que el adulto?',
        opciones: [
          'Porque bebe menos por costumbre.',
          'Por su mayor proporción y recambio de agua, su superficie corporal relativa y su dependencia de otra persona para beber.',
          'Porque tiene menos sed.',
          'Porque su riñón no funciona.',
        ],
        correcta: 1,
        explicacion: 'Son las cuatro razones que la lección enumera.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El dato más informativo sobre la pérdida es el número de ___ y desde cuándo.',
          opciones: ['comidas', 'pañales mojados o micciones', 'horas de sueño'],
          correcta: 1,
          explicacion: 'Lo responde el cuidador con precisión y permite comparar con lo habitual.',
        },
        {
          texto: 'En el lactante deshidratado, la fontanela puede aparecer ___.',
          opciones: ['abombada', 'deprimida', 'caliente'],
          correcta: 1,
          explicacion: 'El abombamiento, en cambio, sugiere aumento de la presión intracraneal.',
        },
        {
          texto: 'La presión arterial ___ un criterio válido para reconocer el shock en el niño.',
          opciones: ['es', 'no es', 'es el único'],
          correcta: 1,
          explicacion: 'Se mantiene normal hasta fases tardías; antes cambian piel, pulso y comportamiento.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['CRITERIO ANTIDUPLICACIÓN: el cuadro general permanece en el tema canónico del Módulo 4; aquí se desarrolla lo pediátrico.'],
    }),
  },

  'm6-emp-apendicitis': {
    icono: 'cp-servier-colon',
    duracion: '13 min',
    resumen: 'La apendicitis del niño se comporta peor que la del adulto por dos motivos: se presenta '
      + 'de forma menos característica cuanto más pequeño es el paciente, y su apéndice se perfora '
      + 'antes. La lección se centra en el reconocimiento pediátrico —qué preguntar, qué observar, qué '
      + 'confunde— y remite la enfermedad y su manejo general al tema canónico del Módulo 4, sin '
      + 'duplicar contenido.',
    objetivos: [
      'Reconocer la presentación de la apendicitis según la edad del niño.',
      'Identificar los factores que retrasan su reconocimiento y aumentan el riesgo.',
      'Aplicar la conducta prehospitalaria y sus prohibiciones.',
    ],
    secciones: [
      {
        titulo: 'Por qué se reconoce tarde',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que dificulta el diagnóstico en el niño',
            items: [
              'Cuanto más pequeño, menos localiza el dolor y menos puede describirlo.',
              'La secuencia clásica —dolor que empieza alrededor del ombligo y se desplaza hacia la fosa ilíaca derecha— puede no cumplirse.',
              'El vómito, la diarrea y la fiebre hacen que el cuadro se confunda con una gastroenteritis, que es mucho más frecuente.',
              'El niño puede parecer mejor un rato y empeorar después.',
              'La exploración es difícil si el niño está asustado o no colabora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La perforación llega antes', texto: 'El apéndice del niño pequeño se perfora en menos tiempo, y su capacidad de contener la infección es menor. Por eso el retraso pesa más que en el adulto y por eso un dolor abdominal que persiste, empeora o se acompaña de fiebre y decaimiento merece valoración aunque la exploración inicial no sea concluyente.' },
        ],
      },
      {
        titulo: 'Qué observar y qué hacer',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Observaciones útiles',
            items: [
              'Cómo camina y cómo se sube a la camilla: un niño que anda encorvado, arrastra los pies o evita saltar sugiere irritación peritoneal.',
              'Si prefiere estar quieto y con las piernas flexionadas.',
              'Si el dolor le despierta por la noche o le impide jugar, dos preguntas muy discriminativas.',
              'Cuándo empezó exactamente y cómo ha cambiado.',
              'Si hubo vómito antes o después del dolor: el orden importa y lo recuerda el cuidador.',
              'Fiebre, aspecto general y grado de decaimiento.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Conducta prehospitalaria',
            items: [
              'Nada por vía oral, porque el paciente puede requerir cirugía.',
              'Posición cómoda; muchos niños toleran mejor las piernas flexionadas.',
              'Palpación suave, empezando por la zona más alejada del dolor, y sin repetirla de forma agresiva.',
              'Analgesia conforme al alcance y al protocolo: controlar el dolor no impide la valoración quirúrgica posterior.',
              'No administrar calor local ni laxantes ni ningún remedio doméstico.',
              'Traslado con descripción de la evolución y de las horas.',
              'Registrar la última ingesta, dato relevante si se plantea cirugía.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que aporta el equipo', texto: 'No es un diagnóstico, que corresponde al hospital y requiere valoración y estudios. Es la descripción de cómo empezó, cómo ha cambiado, cómo se mueve el niño y qué aspecto tiene, con las horas. Ese relato ordenado acelera la valoración y evita que el cuadro se archive como una gastroenteritis más.' },
        ],
      },
      F([WHO_BEC, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Presentación atípica', definicion: 'Forma de manifestarse que no sigue la secuencia clásica, más frecuente cuanto menor es el niño.' },
      { termino: 'Irritación peritoneal', definicion: 'Respuesta que hace que el niño evite moverse, camine encorvado y prefiera las piernas flexionadas.' },
      { termino: 'Riesgo de perforación precoz', definicion: 'Mayor rapidez con que el apéndice del niño pequeño se perfora, lo que hace que el retraso pese más.' },
    ],
    flashcards: [
      { frente: '¿Por qué se reconoce tarde en el niño pequeño?', reverso: 'Porque localiza mal el dolor, la secuencia clásica puede no cumplirse y el cuadro se confunde con una gastroenteritis.' },
      { frente: 'Dos preguntas muy discriminativas', reverso: 'Si el dolor le despierta por la noche y si le impide jugar.' },
      { frente: '¿Qué se observa en la forma de moverse?', reverso: 'Si camina encorvado, arrastra los pies, evita saltar o prefiere estar quieto con las piernas flexionadas.' },
      { frente: '¿Impide la analgesia la valoración quirúrgica posterior?', reverso: 'No: controlar el dolor forma parte del manejo, conforme al alcance y al protocolo.' },
      { frente: '¿Por qué nada por vía oral?', reverso: 'Porque el paciente puede requerir cirugía.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 4 años con dolor abdominal, vómitos y algo de diarrea, decaído, que camina encorvado. ¿Qué corresponde?',
        opciones: [
          'Diagnosticar gastroenteritis y dar consejos.',
          'Trasladar con una descripción ordenada de la evolución: la presentación atípica es frecuente y la perforación llega antes en el niño pequeño.',
          'Administrar líquidos por vía oral para probar tolerancia.',
          'Aplicar calor local en el abdomen.',
        ],
        correcta: 1,
        explicacion: 'La forma de moverse y el decaimiento pesan más que la coincidencia con un cuadro digestivo frecuente.',
      },
      {
        pregunta: '¿Cuál de estas preguntas resulta más discriminativa en un niño con dolor abdominal?',
        opciones: [
          '¿Cuántos años tiene?',
          '¿El dolor le despierta por la noche o le impide jugar?',
          '¿Qué ha comido esta semana?',
          '¿Cuánto pesa?',
        ],
        correcta: 1,
        explicacion: 'Un dolor que interrumpe el sueño o el juego rara vez es banal en un niño.',
      },
      {
        pregunta: 'El cuidador pregunta si puede darle agua durante el traslado. ¿Qué respondes?',
        opciones: [
          'Que sí, en pequeñas cantidades.',
          'Que no: nada por vía oral, porque el paciente puede requerir cirugía; además se registra la hora de la última ingesta.',
          'Que le dé un laxante.',
          'Que le aplique calor en el abdomen.',
        ],
        correcta: 1,
        explicacion: 'Las otras opciones están expresamente desaconsejadas en la lección.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El apéndice del niño pequeño se perfora ___ que el del adulto.',
          opciones: ['más tarde', 'antes', 'igual'],
          correcta: 1,
          explicacion: 'Por eso el retraso en el reconocimiento pesa más.',
        },
        {
          texto: 'Un niño con irritación peritoneal tiende a caminar ___.',
          opciones: ['saltando', 'encorvado y evitando moverse', 'de puntillas y deprisa'],
          correcta: 1,
          explicacion: 'Observar cómo se mueve aporta más que una palpación repetida.',
        },
        {
          texto: 'Lo que aporta el equipo prehospitalario es la ___ ordenada de la evolución con las horas, no un diagnóstico.',
          opciones: ['conclusión', 'descripción', 'clasificación'],
          correcta: 1,
          explicacion: 'Ese relato acelera la valoración hospitalaria.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['CRITERIO ANTIDUPLICACIÓN: la enfermedad permanece en el tema canónico del Módulo 4; aquí se desarrolla el reconocimiento pediátrico.'],
    }),
  },

  'm6-emp-oclusion-intestinal': {
    icono: 'cp-servier-intestino-delgado',
    duracion: '14 min',
    resumen: 'La oclusión intestinal del niño tiene causas propias de la edad que no existen en el '
      + 'adulto, y dos de ellas son tiempo-dependientes porque comprometen la irrigación del '
      + 'intestino. La lección enseña a reconocer el patrón general —dolor, vómito, distensión y falta '
      + 'de deposición— y a identificar dos cuadros que exigen traslado urgente: el lactante con '
      + 'episodios de dolor y decaimiento, y el recién nacido con vómito de contenido bilioso.',
    objetivos: [
      'Reconocer el patrón general de la oclusión intestinal en el niño.',
      'Identificar los cuadros pediátricos que comprometen la irrigación intestinal.',
      'Aplicar la conducta prehospitalaria y las señales que exigen urgencia.',
    ],
    secciones: [
      {
        titulo: 'El patrón general',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuatro elementos',
            items: [
              'Dolor abdominal, que en el niño pequeño se manifiesta como llanto inconsolable o irritabilidad.',
              'Vómito, cuyo aspecto importa: el contenido bilioso es un signo de alarma.',
              'Distensión abdominal, más evidente cuanto más distal sea la obstrucción.',
              'Ausencia de deposición y de gases, o cambio brusco del patrón habitual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Vómito bilioso en un recién nacido', texto: 'Es uno de los pocos signos de esta unidad que por sí solo obliga a actuar. En el recién nacido, un vómito de contenido bilioso debe hacer pensar en una obstrucción que puede comprometer la irrigación del intestino, y es un motivo de traslado urgente y de prealerta explícita, aunque el niño esté aparentemente bien en ese momento.' },
        ],
      },
      {
        titulo: 'Dos cuadros que no esperan',
        bloques: [
          { tipo: 'p', texto: 'El primero es el del **lactante con episodios repetidos de dolor**: llora de forma intensa y encoge las piernas durante unos minutos, después queda decaído o pálido y luego vuelve a la normalidad, repitiéndose el ciclo. Ese patrón intermitente con decaimiento entre episodios es característico y puede acompañarse de vómito y de deposiciones con sangre y moco. Puede haber una masa palpable en el abdomen, aunque su ausencia no descarta nada.' },
          { tipo: 'p', texto: 'El segundo es el del **niño con dolor abdominal e inguinal o escrotal**: una hernia que deja de reducirse puede atrapar intestino y comprometer su irrigación. La zona está dolorosa, indurada y puede estar enrojecida. No se intenta reducirla en la escena, y el cuadro se traslada con prioridad.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que tienen en común', texto: 'Ambos comprometen el aporte de sangre al intestino, y por eso el resultado depende del tiempo. En los dos casos, el niño puede parecer bien entre episodios o en el momento de la valoración; esa normalidad aparente es la trampa. Lo que decide es el patrón referido por el cuidador y la rapidez del traslado.' },
          {
            tipo: 'lista',
            titulo: 'Conducta prehospitalaria',
            items: [
              'Nada por vía oral.',
              'No intentar reducir una hernia ni manipular con fuerza el abdomen.',
              'Posición cómoda y palpación suave y única.',
              'Vigilar signos de shock: el intestino obstruido secuestra líquido y el niño puede deteriorarse.',
              'Prevenir la hipotermia y medir la glucemia si está dentro del alcance.',
              'Analgesia conforme al alcance y al protocolo.',
              'Traslado con prealerta y con la descripción del patrón: cuántos episodios, cuánto duran, cómo queda entre ellos y qué aspecto tienen el vómito y las deposiciones.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dónde está el desarrollo general', texto: 'La oclusión intestinal del adulto y su fisiopatología se estudian en su tema canónico del Módulo 4. Aquí se desarrollan las causas y los patrones propios de la edad pediátrica, que son los que cambian la conducta.' },
        ],
      },
      F([WHO_BEC, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Vómito bilioso', definicion: 'Vómito de contenido teñido de bilis; en el recién nacido obliga a descartar una obstrucción urgente.' },
      { termino: 'Dolor intermitente con decaimiento', definicion: 'Patrón de episodios de llanto intenso con encogimiento de piernas seguidos de apatía, característico de determinadas obstrucciones del lactante.' },
      { termino: 'Compromiso de la irrigación intestinal', definicion: 'Situación en que el intestino obstruido deja de recibir sangre; hace que el resultado dependa del tiempo.' },
      { termino: 'Secuestro de líquido intestinal', definicion: 'Acumulación de líquido en el intestino obstruido, que resta volumen circulante y puede llevar al shock.' },
    ],
    flashcards: [
      { frente: '¿Qué significa un vómito bilioso en un recién nacido?', reverso: 'Posible obstrucción con compromiso de la irrigación: traslado urgente y prealerta.' },
      { frente: 'Patrón característico del lactante', reverso: 'Episodios de llanto intenso con piernas encogidas, decaimiento o palidez entre ellos, y a veces deposiciones con sangre y moco.' },
      { frente: '¿Se intenta reducir una hernia que no se reduce?', reverso: 'No: se traslada con prioridad.' },
      { frente: '¿Por qué el niño con obstrucción puede llegar al shock?', reverso: 'Porque el intestino obstruido secuestra líquido y resta volumen circulante.' },
      { frente: '¿Qué se describe en la prealerta?', reverso: 'Cuántos episodios, cuánto duran, cómo queda entre ellos y qué aspecto tienen vómito y deposiciones.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante de 8 meses con episodios de llanto intenso y piernas encogidas, decaído entre episodios, con una deposición con sangre y moco. ¿Qué haces?',
        opciones: [
          'Observación domiciliaria: entre episodios está bien.',
          'Traslado urgente con prealerta describiendo el patrón: el cuadro puede comprometer la irrigación intestinal.',
          'Administrar líquidos por vía oral.',
          'Intentar reducir el abdomen con masaje.',
        ],
        correcta: 1,
        explicacion: 'La normalidad aparente entre episodios es la trampa del cuadro.',
      },
      {
        pregunta: 'Recién nacido con vómito de contenido bilioso y buen aspecto general. ¿Cómo procedes?',
        opciones: [
          'Observación, porque tiene buen aspecto.',
          'Traslado urgente con prealerta: el vómito bilioso en el recién nacido obliga a descartar una obstrucción que compromete la irrigación.',
          'Ofrecerle alimento para ver si tolera.',
          'Esperar a que repita el vómito.',
        ],
        correcta: 1,
        explicacion: 'Es uno de los pocos signos que por sí solos obligan a actuar.',
      },
      {
        pregunta: 'Niño con dolor abdominal y una tumoración inguinal dolorosa e indurada que no se reduce. ¿Qué haces?',
        opciones: [
          'Intentar reducirla con maniobras suaves.',
          'No manipularla, trasladar con prioridad y comunicarlo: puede haber intestino atrapado con la irrigación comprometida.',
          'Aplicar calor local.',
          'Citar para valoración en consulta.',
        ],
        correcta: 1,
        explicacion: 'La reducción no es una maniobra de esta lección y el tiempo condiciona el resultado.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El aspecto del vómito que constituye señal de alarma en el recién nacido es el ___.',
          opciones: ['lácteo', 'bilioso', 'espumoso'],
          correcta: 1,
          explicacion: 'Obliga a descartar una obstrucción urgente aunque el niño parezca estar bien.',
        },
        {
          texto: 'Entre los episodios de dolor, el lactante puede quedar ___, y esa normalidad aparente es la trampa.',
          opciones: ['eufórico', 'decaído o aparentemente normal', 'febril siempre'],
          correcta: 1,
          explicacion: 'Lo que decide es el patrón referido y la rapidez del traslado.',
        },
        {
          texto: 'El intestino obstruido ___ líquido, lo que puede llevar al shock.',
          opciones: ['absorbe', 'secuestra', 'elimina'],
          correcta: 1,
          explicacion: 'Ese volumen deja de estar disponible para la circulación.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['CRITERIO ANTIDUPLICACIÓN: el cuadro general permanece en el tema canónico del Módulo 4; aquí se desarrollan las causas y patrones propios de la edad pediátrica.'],
    }),
  },

  'm6-emp-sx-febril': {
    icono: 'cp-cc0-termometro',
    duracion: '15 min',
    resumen: 'La fiebre es el motivo de consulta más frecuente en pediatría y, casi siempre, la '
      + 'manifestación de una infección banal. Lo que importa en la escena no es la cifra del '
      + 'termómetro, sino el aspecto del niño y la existencia de signos de alarma. La lección aborda '
      + 'también la convulsión asociada a la fiebre, que asusta muchísimo a la familia y que exige del '
      + 'equipo dos cosas: proteger al niño durante el episodio y descartar lo que no es banal.',
    objetivos: [
      'Valorar al niño con fiebre por su aspecto y por los signos de alarma, no por la cifra.',
      'Actuar durante y después de una convulsión asociada a fiebre.',
      'Reconocer los datos que obligan a descartar una causa grave.',
    ],
    secciones: [
      {
        titulo: 'La cifra no es el problema',
        bloques: [
          { tipo: 'p', texto: 'La temperatura por sí sola no mide la gravedad: hay infecciones graves con poca fiebre y procesos banales con fiebre alta. Lo que orienta es cómo está el niño, y muy especialmente cómo está cuando la fiebre baja: un niño que al descender la temperatura vuelve a jugar y a interesarse por su entorno tranquiliza mucho más que una cifra concreta.' },
          {
            tipo: 'lista',
            titulo: 'Signos de alarma en el niño con fiebre',
            items: [
              'Aspecto general malo, apatía, irritabilidad que no cede o llanto inconsolable.',
              'Dificultad respiratoria o respiración rápida mantenida.',
              'Piel pálida, moteada o azulada, o relleno capilar lento.',
              'Manchas en la piel que no desaparecen al presionar.',
              'Rigidez de nuca, fontanela abombada en el lactante o convulsión.',
              'Vómito persistente o rechazo completo del líquido.',
              'Deshidratación establecida.',
              'Fiebre en un lactante muy pequeño, cuya valoración exige otro umbral y corresponde al centro.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Manchas que no desaparecen al presionar', texto: 'Si al presionar la piel con un cristal transparente o con el dedo las manchas no palidecen, el hallazgo obliga a considerar una infección grave y a trasladar sin demora, aunque el niño no parezca muy afectado. Es una comprobación que cuesta segundos y que puede cambiar el desenlace.' },
        ],
      },
      {
        titulo: 'La convulsión asociada a fiebre',
        bloques: [
          { tipo: 'p', texto: 'Es un episodio convulsivo que aparece en el contexto de un proceso febril en un niño de determinada edad, sin infección del sistema nervioso ni otra causa que lo explique. Suele ser breve, generalizado y de recuperación completa, y su pronóstico general es bueno, aunque para la familia sea una de las experiencias más aterradoras que puedan vivir.' },
          {
            tipo: 'pasos',
            titulo: 'Durante el episodio',
            items: [
              'Proteger al niño de golpes retirando objetos y acolchando el entorno.',
              'No sujetarlo ni intentar detener los movimientos.',
              'No introducir nada en la boca bajo ninguna circunstancia.',
              'Colocarlo de lado cuando sea posible para proteger la vía aérea.',
              'Mirar el reloj: la duración es el dato clínico más importante.',
              'Observar y recordar cómo fue: si afectó a todo el cuerpo o a una parte, si giró la cabeza o los ojos.',
              'Administrar oxígeno conforme al protocolo y preparar el material de vía aérea.',
              'Medicación anticonvulsivante exclusivamente conforme al alcance autorizado y al protocolo.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Después del episodio',
            items: [
              'Valorar la vía aérea, la ventilación y el estado de conciencia; la somnolencia posterior es esperable, pero debe ir mejorando.',
              'Medir la glucemia si está dentro del alcance: la hipoglucemia puede producir convulsiones y es tratable.',
              'Buscar los signos de alarma del apartado anterior, en especial rigidez de nuca y manchas que no palidecen.',
              'Acompañar a la familia, que suele estar convencida de que su hijo iba a morir; explicar lo ocurrido con calma.',
              'Trasladar y describir el episodio con precisión: hora de inicio, duración, características y estado posterior.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuándo no se asume que es una convulsión febril simple', texto: 'Cuando dura más de lo habitual o no cede, cuando afecta solo a una parte del cuerpo, cuando se repite en el mismo proceso, cuando el niño no recupera bien el nivel de conciencia, cuando hay rigidez de nuca, fontanela abombada o manchas que no palidecen, o cuando ocurre fuera del rango de edad habitual. En esas situaciones el cuadro se maneja como una convulsión de causa por determinar y se traslada con prealerta.' },
        ],
      },
      F([AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Signo de alarma', definicion: 'Hallazgo que obliga a considerar una causa grave en un niño con fiebre, con independencia de la cifra de temperatura.' },
      { termino: 'Manchas que no palidecen', definicion: 'Lesiones cutáneas que no desaparecen al presionar; obligan a considerar infección grave y traslado sin demora.' },
      { termino: 'Convulsión asociada a fiebre', definicion: 'Episodio convulsivo en el contexto de un proceso febril, sin infección del sistema nervioso ni otra causa que lo explique.' },
      { termino: 'Estado posterior a la convulsión', definicion: 'Somnolencia esperable tras el episodio, que debe mejorar progresivamente.' },
    ],
    flashcards: [
      { frente: '¿Mide la cifra de temperatura la gravedad?', reverso: 'No: orienta más cómo está el niño, sobre todo cuando la fiebre baja.' },
      { frente: '¿Qué se hace durante una convulsión?', reverso: 'Proteger de golpes, no sujetar, no meter nada en la boca, colocar de lado y mirar el reloj.' },
      { frente: '¿Cuál es el dato clínico más importante del episodio?', reverso: 'Su duración.' },
      { frente: '¿Qué obliga a no asumir una convulsión febril simple?', reverso: 'Duración prolongada, afectación de una sola parte, repetición, mala recuperación, rigidez de nuca o manchas que no palidecen.' },
      { frente: '¿Por qué se mide la glucemia tras una convulsión?', reverso: 'Porque la hipoglucemia puede producirlas y es tratable.' },
      { frente: '¿Qué significa que unas manchas no palidezcan al presionar?', reverso: 'Obliga a considerar una infección grave y a trasladar sin demora.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con fiebre alta que, cuando le baja la temperatura, juega y se interesa por su entorno. ¿Cómo lo valoras?',
        opciones: [
          'Grave por la cifra de temperatura.',
          'Tranquilizador: la respuesta al descenso de la fiebre orienta más que la cifra, aunque se buscan igualmente los signos de alarma.',
          'Requiere traslado urgente por la cifra.',
          'No necesita ninguna valoración.',
        ],
        correcta: 1,
        explicacion: 'La cifra no mide la gravedad; el aspecto y la respuesta sí orientan.',
      },
      {
        pregunta: 'Durante una convulsión, un familiar intenta abrirle la boca al niño. ¿Qué haces?',
        opciones: [
          'Le ayudas a colocar un objeto entre los dientes.',
          'Lo detienes: no se introduce nada en la boca; se protege de golpes, se coloca de lado cuando es posible y se cronometra el episodio.',
          'Sujetas al niño para frenar los movimientos.',
          'Esperas sin intervenir en nada.',
        ],
        correcta: 1,
        explicacion: 'Introducir objetos en la boca y sujetar al paciente son dos prácticas proscritas.',
      },
      {
        pregunta: 'Lactante con fiebre y manchas en la piel que no palidecen al presionar. ¿Qué corresponde?',
        opciones: [
          'Observación domiciliaria con antitérmico.',
          'Traslado sin demora con prealerta: el hallazgo obliga a considerar una infección grave aunque el niño no parezca muy afectado.',
          'Esperar a que la fiebre ceda.',
          'Aplicar frío local sobre las manchas.',
        ],
        correcta: 1,
        explicacion: 'Es una comprobación que cuesta segundos y puede cambiar el desenlace.',
      },
      {
        pregunta: 'Convulsión que afecta solo al brazo derecho y el niño no recupera bien la conciencia. ¿Cómo lo manejas?',
        opciones: [
          'Como convulsión febril simple.',
          'Como convulsión de causa por determinar: se traslada con prealerta y se describe el episodio con precisión.',
          'Se observa en el domicilio una hora.',
          'Se administra antitérmico y se da el alta.',
        ],
        correcta: 1,
        explicacion: 'La focalidad y la mala recuperación son dos de los criterios que impiden asumir el cuadro simple.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la actuación durante y tras una convulsión asociada a fiebre',
        pasos: [
          'Proteger al niño de golpes retirando objetos del entorno',
          'No sujetarlo ni introducir nada en su boca',
          'Colocarlo de lado cuando sea posible y mirar el reloj',
          'Administrar oxígeno según protocolo y preparar material de vía aérea',
          'Tras el episodio, valorar vía aérea, ventilación y conciencia',
          'Medir la glucemia si está dentro del alcance y buscar signos de alarma',
          'Trasladar describiendo hora de inicio, duración, características y estado posterior',
        ],
      },
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-emp-meningitis': {
    icono: 'cp-servier-cerebro',
    duracion: '14 min',
    resumen: 'La meningitis es poco frecuente y muy grave, y su reconocimiento precoz cambia el '
      + 'desenlace. El problema es que en el lactante no se parece a lo que se espera: no hay rigidez '
      + 'de nuca ni cefalea, y lo que hay es un niño que come mal, está irritable o apagado y no '
      + 'termina de estar bien. La lección enseña esa presentación por edades, la comprobación de las '
      + 'manchas que no palidecen y la conducta, incluida la protección del equipo.',
    objetivos: [
      'Reconocer la presentación de la meningitis según la edad del paciente.',
      'Aplicar la comprobación de las lesiones cutáneas y su significado.',
      'Ejecutar la conducta prehospitalaria, incluida la protección personal.',
    ],
    secciones: [
      {
        titulo: 'La presentación cambia con la edad',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Edad', 'Cómo se manifiesta'],
            filas: [
              ['Lactante', 'Fiebre o temperatura baja, rechazo del alimento, vómito, irritabilidad o apatía, llanto agudo, fontanela abombada; la rigidez de nuca suele faltar'],
              ['Niño pequeño', 'Fiebre, vómito, decaimiento, irritabilidad, rechazo a moverse; la rigidez puede aparecer o no'],
              ['Niño mayor y adolescente', 'Fiebre, cefalea intensa, rigidez de nuca, molestia con la luz, vómito y alteración del estado mental'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'En el lactante no busques lo que no va a estar', texto: 'Esperar rigidez de nuca en un lactante para sospechar meningitis lleva a diagnosticarla tarde. Lo que hay que valorar es su aspecto general: un lactante que come mal, está anormalmente irritable o apagado, tiene un llanto distinto y «no está como siempre» merece traslado, aunque no haya ningún signo clásico.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La comprobación del cristal', texto: 'Ante cualquier mancha cutánea en un niño con fiebre, se presiona con un cristal transparente o con el dedo. Si las lesiones no palidecen, la sospecha de infección grave se eleva de forma inmediata y el traslado no espera. Es una comprobación de segundos que debe hacerse siempre, y su ausencia no descarta nada: puede aparecer más tarde.' },
        ],
      },
      {
        titulo: 'Conducta y protección',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué se hace',
            items: [
              'Valorar y sostener según la secuencia habitual: vía aérea, ventilación y circulación.',
              'Oxígeno conforme al protocolo y vigilancia del estado mental.',
              'Medir la glucemia si está dentro del alcance.',
              'Buscar signos de shock: la infección grave puede evolucionar con rapidez a hipoperfusión.',
              'Accesos, fluidos y medicación exclusivamente conforme al alcance autorizado y al protocolo.',
              'Reducir estímulos: luz y ruido molestan al paciente y no aportan nada.',
              'Traslado con prealerta explícita, porque el centro receptor necesita preparar el aislamiento y el tratamiento.',
              'Registrar la hora de inicio de los síntomas y de aparición de las lesiones cutáneas si las hay.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Protección del equipo', texto: 'Algunas meningitis se transmiten por vía respiratoria a través de secreciones. El equipo aplica las precauciones que establezca el protocolo del servicio desde el primer contacto, no cuando se confirme el diagnóstico. Si posteriormente se confirma una infección transmisible, existe un procedimiento de notificación y de valoración del personal expuesto: conocerlo y activarlo forma parte del trabajo, y no es una reacción exagerada.' },
          { tipo: 'p', texto: 'La antibioterapia y el resto del tratamiento específico son hospitalarios o dependen del protocolo del servicio y de la dirección médica. Esta lección no publica ninguna pauta: lo que aporta el ámbito prehospitalario es el reconocimiento precoz, el soporte, la protección y la rapidez.' },
        ],
      },
      F([WHO_BEC, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Presentación inespecífica del lactante', definicion: 'Manifestación de la meningitis en el lactante mediante rechazo del alimento, irritabilidad o apatía, sin rigidez de nuca.' },
      { termino: 'Fontanela abombada', definicion: 'Abombamiento de la zona blanda del cráneo del lactante; hallazgo relevante en este contexto.' },
      { termino: 'Lesión que no palidece', definicion: 'Mancha cutánea que no desaparece al presionar; eleva de forma inmediata la sospecha de infección grave.' },
      { termino: 'Precauciones de transmisión', definicion: 'Medidas de protección del equipo aplicadas desde el primer contacto conforme al protocolo, sin esperar a la confirmación.' },
    ],
    flashcards: [
      { frente: '¿Hay rigidez de nuca en el lactante con meningitis?', reverso: 'Habitualmente no: esperarla lleva a diagnosticar tarde.' },
      { frente: '¿Qué se valora entonces en el lactante?', reverso: 'Su aspecto general: alimentación, irritabilidad o apatía, llanto distinto y que «no esté como siempre».' },
      { frente: '¿En qué consiste la comprobación del cristal?', reverso: 'Presionar las manchas: si no palidecen, la sospecha de infección grave se eleva y el traslado no espera.' },
      { frente: '¿Descarta algo la ausencia de manchas?', reverso: 'No: pueden aparecer más tarde.' },
      { frente: '¿Cuándo se aplican las precauciones de protección?', reverso: 'Desde el primer contacto, conforme al protocolo, no cuando se confirme el diagnóstico.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante de 4 meses con fiebre, que come mal, está apagado y cuya madre dice que «no está como siempre», sin rigidez de nuca. ¿Qué haces?',
        opciones: [
          'Descartar meningitis por la ausencia de rigidez.',
          'Trasladar: en el lactante la presentación es inespecífica y la rigidez suele faltar.',
          'Observar en domicilio con antitérmico.',
          'Esperar a que aparezcan manchas.',
        ],
        correcta: 1,
        explicacion: 'Buscar el signo clásico en el lactante retrasa el reconocimiento.',
      },
      {
        pregunta: 'Aparecen manchas en la piel de un niño con fiebre y no palidecen al presionar con un cristal. ¿Qué implica?',
        opciones: [
          'Es una reacción alérgica.',
          'Eleva de forma inmediata la sospecha de infección grave: traslado sin demora con prealerta.',
          'Es un hallazgo sin relevancia si el niño está consciente.',
          'Debe esperarse a que se extiendan.',
        ],
        correcta: 1,
        explicacion: 'La comprobación cuesta segundos y cambia la prioridad del caso.',
      },
      {
        pregunta: '¿Cuándo aplica el equipo las precauciones de protección respiratoria?',
        opciones: [
          'Cuando el hospital confirme el diagnóstico.',
          'Desde el primer contacto, conforme al protocolo del servicio.',
          'Solo si el paciente tose.',
          'Solo en pacientes adultos.',
        ],
        correcta: 1,
        explicacion: 'Esperar a la confirmación deja al equipo expuesto durante toda la asistencia.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el lactante con meningitis, la rigidez de nuca habitualmente ___.',
          opciones: ['está presente', 'falta', 'es el primer signo'],
          correcta: 1,
          explicacion: 'Lo que orienta es el aspecto general y el cambio referido por el cuidador.',
        },
        {
          texto: 'Si las manchas ___ al presionar con un cristal, la sospecha de infección grave se eleva.',
          opciones: ['palidecen', 'no palidecen', 'desaparecen'],
          correcta: 1,
          explicacion: 'Su ausencia no descarta nada: pueden aparecer más tarde.',
        },
        {
          texto: 'La pauta antibiótica ___ en esta lección: depende del protocolo y de la dirección médica.',
          opciones: ['se publica', 'no se publica', 'se calcula por peso'],
          correcta: 1,
          explicacion: 'Lo que aporta el ámbito prehospitalario es reconocimiento, soporte, protección y rapidez.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['DECISIÓN PENDIENTE: la academia debe entregar su procedimiento de precauciones de transmisión y de notificación de personal expuesto.'],
    }),
  },

  'm6-emp-cardiopatias': {
    icono: 'cp-servier-corazon-interior',
    duracion: '15 min',
    resumen: 'Las cardiopatías congénitas son alteraciones estructurales del corazón presentes desde el '
      + 'nacimiento. En el ámbito prehospitalario no se identifican ni se clasifican: lo que se hace '
      + 'es reconocer dos patrones —el niño que se pone azul y el niño que falla como una bomba— y '
      + 'saber que un lactante con mala alimentación, sudoración al comer y respiración rápida puede '
      + 'estar en insuficiencia cardiaca sin que nadie lo haya pensado.',
    objetivos: [
      'Distinguir los dos grandes patrones de presentación de la cardiopatía congénita.',
      'Reconocer los signos de insuficiencia cardiaca en el lactante.',
      'Aplicar la conducta de soporte y las precauciones propias de estos pacientes.',
    ],
    secciones: [
      {
        titulo: 'Dos patrones',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Patrón con cianosis', 'Patrón de fallo de bomba'],
            filas: [
              ['Qué predomina', 'Coloración azulada de labios, lengua y mucosas', 'Signos de insuficiencia cardiaca'],
              ['En el lactante', 'Cianosis que puede empeorar con el llanto o el esfuerzo', 'Come poco y se cansa al comer, suda al alimentarse, respira rápido, gana poco peso'],
              ['Respuesta al oxígeno', 'Puede mejorar poco o nada, a diferencia de la cianosis de origen respiratorio', 'Variable'],
              ['Otros hallazgos', 'Irritabilidad, postura en cuclillas en el niño mayor durante los episodios', 'Hígado aumentado, edema, sudoración, palidez'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La insuficiencia cardiaca del lactante se parece a otra cosa', texto: 'Un lactante que come mal, tarda mucho en cada toma, se cansa y suda mientras come, respira deprisa y no gana peso está describiendo una insuficiencia cardiaca, aunque la familia lo cuente como un problema de alimentación. Comer es el ejercicio más exigente de un lactante, y por eso el fallo aparece primero ahí. Preguntar por la alimentación con detalle es una de las herramientas más útiles de esta lección.' },
        ],
      },
      {
        titulo: 'Conducta y precauciones',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué hace el equipo',
            items: [
              'Reconocer el patrón y sostener: vía aérea, ventilación y circulación, con oxígeno conforme al protocolo.',
              'Permitir la posición en que el niño está mejor; en el niño mayor con episodios de cianosis, la posición en cuclillas o con las rodillas contra el pecho puede aliviarle y no debe impedirse.',
              'Manipulación mínima y evitar todo lo que le haga llorar: el llanto aumenta el consumo de oxígeno y puede empeorar la cianosis.',
              'Preguntar al cuidador por el diagnóstico conocido, las cirugías previas, la medicación y el centro donde se le sigue: casi siempre lo sabe con precisión.',
              'Buscar el informe o el plan de acción que muchas familias llevan consigo.',
              'Medicación, accesos y fluidos exclusivamente conforme al alcance autorizado y al protocolo.',
              'Trasladar, si el protocolo lo permite, al centro que conoce al paciente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dos precauciones que importan', texto: 'Primera: en determinadas cardiopatías, administrar oxígeno a altas concentraciones o cargar líquidos de forma rápida puede no ser inocuo, de modo que ambas conductas se ajustan al protocolo y, cuando exista, al plan de acción del paciente. Segunda: la cianosis que no mejora con oxígeno orienta a un origen cardiaco y es una información valiosa para el centro receptor; se documenta lo administrado y la respuesta.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'El cuidador sabe más que la escala', texto: 'Las familias de estos niños conocen su enfermedad, su medicación, sus cifras habituales y qué episodios han tenido antes. Preguntarles qué es normal en su hijo y qué es distinto hoy resuelve en un minuto lo que ninguna valoración estándar puede aportar. Es el mismo principio del tema de niños con necesidades especiales.' },
        ],
      },
      F([AHA_PALS_2025, WHO_BEC, AHA_NEONATAL_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Cardiopatía congénita', definicion: 'Alteración estructural del corazón presente desde el nacimiento; no se identifica ni se clasifica en el ámbito prehospitalario.' },
      { termino: 'Cianosis de origen cardiaco', definicion: 'Coloración azulada que responde poco o nada al oxígeno, a diferencia de la de origen respiratorio.' },
      { termino: 'Insuficiencia cardiaca del lactante', definicion: 'Cuadro que se manifiesta por mala alimentación, sudoración y cansancio al comer, respiración rápida y escasa ganancia de peso.' },
      { termino: 'Plan de acción', definicion: 'Documento que muchas familias llevan consigo con el diagnóstico, la medicación y las indicaciones específicas del paciente.' },
    ],
    flashcards: [
      { frente: 'Los dos patrones de presentación', reverso: 'El que cursa con cianosis y el de fallo de bomba con insuficiencia cardiaca.' },
      { frente: '¿Cómo se manifiesta la insuficiencia cardiaca en el lactante?', reverso: 'Come poco y se cansa al comer, suda al alimentarse, respira rápido y gana poco peso.' },
      { frente: '¿Por qué la alimentación es tan reveladora?', reverso: 'Porque comer es el ejercicio más exigente de un lactante y el fallo aparece primero ahí.' },
      { frente: '¿Qué orienta una cianosis que no mejora con oxígeno?', reverso: 'Un origen cardiaco; es información valiosa que se documenta y se comunica.' },
      { frente: '¿Se impide la posición en cuclillas en un niño con episodio de cianosis?', reverso: 'No: puede aliviarle y no debe impedirse.' },
      { frente: '¿Qué se pregunta siempre al cuidador?', reverso: 'Diagnóstico conocido, cirugías previas, medicación, centro de seguimiento y qué es distinto hoy.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante de 3 meses que tarda mucho en las tomas, suda al comer, respira deprisa y gana poco peso. ¿Qué consideras?',
        opciones: [
          'Un problema de alimentación sin más.',
          'Posible insuficiencia cardiaca: comer es el mayor esfuerzo del lactante y el fallo aparece primero ahí.',
          'Una infección respiratoria banal.',
          'Reflujo exclusivamente.',
        ],
        correcta: 1,
        explicacion: 'La familia suele contarlo como un problema de alimentación, y esa es la trampa del cuadro.',
      },
      {
        pregunta: 'Niño con cianosis que no mejora tras administrar oxígeno conforme al protocolo. ¿Qué haces con esa observación?',
        opciones: [
          'La descartas como error de medición.',
          'La documentas y la comunicas: orienta a un origen cardiaco y es información valiosa para el centro receptor.',
          'Aumentas indefinidamente la concentración de oxígeno.',
          'Interrumpes el traslado.',
        ],
        correcta: 1,
        explicacion: 'La respuesta al oxígeno distingue de forma orientativa la cianosis cardiaca de la respiratoria.',
      },
      {
        pregunta: 'Un niño con cardiopatía conocida adopta espontáneamente la posición en cuclillas durante un episodio. ¿Qué haces?',
        opciones: [
          'Lo tumbas para valorarlo mejor.',
          'Le permites mantener esa posición, que puede aliviarle, y evitas todo lo que le haga llorar.',
          'Lo obligas a caminar.',
          'Lo sientas erguido con las piernas estiradas.',
        ],
        correcta: 1,
        explicacion: 'La posición que el paciente elige suele ser la que mejor tolera, y el llanto aumenta su consumo de oxígeno.',
      },
      {
        pregunta: '¿Por qué el oxígeno a altas concentraciones y la carga rápida de líquidos se ajustan al protocolo en estos pacientes?',
        opciones: [
          'Por ahorro de material.',
          'Porque en determinadas cardiopatías pueden no ser inocuos, y existe además el plan de acción propio del paciente.',
          'Porque el oxígeno está contraindicado siempre.',
          'Porque los líquidos no se usan en pediatría.',
        ],
        correcta: 1,
        explicacion: 'La lección remite ambas conductas al protocolo y al plan de acción, sin prohibirlas ni generalizarlas.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Atiendes a un lactante con cardiopatía conocida cuya madre te dice que hoy come peor que nunca y respira más rápido. ¿Qué haces con esa información?',
          opciones: [
            'La anoto como dato secundario y valoro con los rangos estándar de su edad.',
            'La tomo como el dato principal: interpreto los hallazgos contra su línea de base, pregunto por diagnóstico, cirugías, medicación y plan de acción, sostengo según protocolo y traslado, si es posible, al centro que le conoce.',
            'Espero a que aparezca cianosis para actuar.',
            'Le ofrezco alimento para comprobar la tolerancia.',
          ],
          correcta: 1,
          explicacion: 'La lección establece que el cuidador conoce la línea de base y que el empeoramiento de la alimentación es el signo más revelador en el lactante.',
        },
      ],
    },
    revision: ficha({ fuentes: [...FU, 'AHA/AAP 2025 Neonatal Resuscitation.'] }),
  },
}
