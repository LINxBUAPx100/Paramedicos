// ============================================================
//  MÓDULO 5 — Unidad «LESIONES AMBIENTALES»
// ------------------------------------------------------------
//  Los 3 temas de la unidad: hipotermia, golpe de calor e insolación.
//
//  El plan separa «golpe de calor» e «insolación» como temas distintos. La
//  literatura clínica agrupa los trastornos por calor en un espectro cuyo
//  extremo grave es el GOLPE DE CALOR —con alteración del estado mental— y
//  cuyos grados previos se denominan habitualmente agotamiento por calor. En
//  español, «insolación» se usa con dos sentidos distintos según la fuente.
//  Se conservan los dos temas del plan y se declara expresamente esa relación,
//  sin inventar una separación clínica que las guías no sostienen.
//
//  LÍMITES: no se publican umbrales de temperatura corporal, tiempos de
//  enfriamiento ni pautas de fluidos. Dependen de la guía adoptada y del
//  protocolo del servicio.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const AHA_PA_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía primaria actual para emergencias por calor y por frío en el ámbito de primeros auxilios. '
    + 'PENDIENTE: apartado exacto dentro de la guía.',
}
const PHTLS = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4).',
  nota: 'Base curricular histórica declarada por el plan. Capítulo y página PENDIENTES para esta '
    + 'unidad: no se localizaron de forma reproducible en la copia licenciada. No se cita la 10.ª '
    + 'edición: la copia disponible declara traducción automática.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE, alteración del estado mental y estabilización inicial. '
    + 'PENDIENTE: módulo y página exactos.',
}
const AHA_BLS_2025 = {
  nombre: 'AHA 2025 Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Guía rectora de la reanimación en el adulto, incluidas las circunstancias especiales. '
    + 'PENDIENTE: apartado exacto.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, equipamiento y dirección médica de la academia R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija umbrales, método de enfriamiento o '
    + 'recalentamiento disponible, fluidos y destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publican umbrales de temperatura, tiempos de enfriamiento ni pautas de '
  + 'fluidos: dependen de la guía adoptada, del material disponible y del protocolo del servicio.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: método de enfriamiento o de recalentamiento, oxígeno, accesos, '
  + 'fluidos, medicación y destino dependen del alcance autorizado, del equipamiento y del protocolo.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA/ARC Primeros Auxilios 2024; WHO/ICRC BEC 2018; PHTLS 9.ª ed. (capítulo pendiente)',
  observaciones: [
    'Redactado desde cero en el lote B del Módulo 5; el tema estaba vacío.',
    SIN_CIFRAS,
    PROTOCOLO,
    ...extra,
  ],
  fuentes,
})

const FU = [
  'AHA / American Red Cross. Guidelines for First Aid, 2024.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
  'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
]

export default {
  'm5-la-hipotermia': {
    icono: 'cp-servier-frio',
    duracion: '15 min',
    resumen: 'La hipotermia aparece cuando el cuerpo pierde calor más deprisa de lo que lo produce, y '
      + 'no necesita un entorno de montaña: basta con estar mojado, inmóvil y expuesto. Su gravedad se '
      + 'reconoce por la clínica —si el paciente tirita, si está lúcido, si responde— más que por una '
      + 'cifra. Dos ideas gobiernan el manejo: manipular con extremo cuidado, porque el corazón frío '
      + 'es irritable, y detener la pérdida de calor antes que intentar devolverlo.',
    objetivos: [
      'Reconocer los grados de hipotermia por sus hallazgos clínicos.',
      'Aplicar las medidas que detienen la pérdida de calor y evitan el daño por manipulación.',
      'Explicar por qué las decisiones de reanimación en hipotermia son distintas.',
    ],
    secciones: [
      {
        titulo: 'Cómo se pierde el calor y quién está en riesgo',
        bloques: [
          { tipo: 'p', texto: 'El cuerpo pierde calor por cuatro vías: conducción al estar en contacto con una superficie fría, convección por el aire o el agua en movimiento, evaporación desde la piel mojada o la respiración, y radiación hacia el entorno. El agua y la ropa mojada aceleran mucho ese proceso, y el viento lo multiplica.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones y pacientes de riesgo',
            items: [
              'Inmersión o ropa mojada, incluso con temperatura ambiente moderada.',
              'Permanencia prolongada en el suelo tras una caída, sobre todo en personas mayores.',
              'Traumatizados: la hemorragia, la exposición durante la valoración y la inmovilidad enfrían con rapidez.',
              'Consumo de alcohol o de otras sustancias, que altera la percepción y favorece la vasodilatación.',
              'Personas mayores, lactantes y pacientes con enfermedades que limitan la respuesta al frío.',
              'Situaciones de calle o de vivienda sin calefacción, donde la exposición es continua.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La hipotermia del traumatizado no espera al invierno', texto: 'Un paciente de trauma se enfría dentro de una ambulancia templada: está expuesto, inmóvil, a veces mojado y con la piel vasoconstreñida. Como el frío empeora la coagulación, la hipotermia forma parte de la tríada que perpetúa la hemorragia. Cubrirlo desde el primer momento es una de las medidas más baratas y más eficaces del módulo.' },
        ],
      },
      {
        titulo: 'Reconocer la gravedad por la clínica',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Grado', 'Lo que se observa'],
            filas: [
              ['Leve', 'Tiritona intensa, piel fría y pálida, torpeza de movimientos, habla algo lenta; el paciente está consciente y colabora'],
              ['Moderada', 'La tiritona disminuye o desaparece, confusión, apatía, torpeza marcada, somnolencia, conducta inadecuada'],
              ['Grave', 'No tirita, disminución profunda de la conciencia, rigidez, respiración y pulso muy lentos y difíciles de detectar'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La desaparición de la tiritona no es una buena noticia', texto: 'Tiritar es el mecanismo con el que el cuerpo genera calor. Que un paciente frío deje de tiritar suele significar que ese mecanismo se ha agotado, no que esté mejorando. Es uno de los pocos signos que se interpretan al revés de lo que parece.' },
          { tipo: 'p', texto: 'Los rangos exactos de temperatura que definen cada grado varían según la fuente y requieren un termómetro adecuado, que no todas las unidades tienen. Por eso esta lección enseña el reconocimiento clínico y remite los umbrales numéricos a la guía adoptada y al protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Manejo',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Primero detener la pérdida',
            items: [
              'Retirar al paciente del ambiente frío y del contacto con el suelo o con superficies frías.',
              'Quitar la ropa mojada cortándola si es necesario, secar la piel y aislar con mantas, incluida la cabeza.',
              'Proteger del viento y cerrar el habitáculo; calentar el interior de la ambulancia.',
              'Manipular con extremo cuidado y en bloque, evitando movimientos bruscos.',
              'Mantener al paciente en horizontal y evitar que se incorpore o camine si la hipotermia es moderada o grave.',
              'No dar bebidas alcohólicas, y no administrar nada por vía oral a un paciente con alteración de la conciencia.',
              'Aplicar el método de recalentamiento que autorice el protocolo, con el material del que disponga la unidad.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El corazón frío es irritable', texto: 'En la hipotermia moderada y grave, los movimientos bruscos, la fricción de las extremidades o una movilización descuidada pueden desencadenar una arritmia. Por eso se manipula despacio, en bloque y lo menos posible, y no se frota al paciente para calentarlo.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Reanimación en hipotermia', texto: 'El pulso y la respiración pueden ser tan lentos y débiles que resulten difíciles de detectar, y por eso la valoración se hace durante más tiempo del habitual antes de concluir que están ausentes. Las decisiones sobre iniciar, mantener o suspender la reanimación en un paciente hipotérmico siguen las guías de reanimación vigentes y el protocolo del servicio, que contemplan de forma específica esta circunstancia.' },
        ],
      },
      F([AHA_PA_2024, AHA_BLS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Hipotermia', definicion: 'Descenso de la temperatura corporal por pérdida de calor superior a la producción.' },
      { termino: 'Tiritona', definicion: 'Contracción muscular involuntaria que genera calor; su desaparición en un paciente frío indica agotamiento del mecanismo.' },
      { termino: 'Vías de pérdida de calor', definicion: 'Conducción, convección, evaporación y radiación.' },
      { termino: 'Irritabilidad del corazón frío', definicion: 'Tendencia del miocardio hipotérmico a desarrollar arritmias ante movimientos bruscos o manipulación.' },
    ],
    flashcards: [
      { frente: 'Las cuatro vías de pérdida de calor', reverso: 'Conducción, convección, evaporación y radiación.' },
      { frente: '¿Qué significa que un paciente frío deje de tiritar?', reverso: 'Que el mecanismo de producción de calor se ha agotado: es un signo de empeoramiento.' },
      { frente: '¿Por qué se manipula con extremo cuidado?', reverso: 'Porque el corazón hipotérmico es irritable y los movimientos bruscos pueden desencadenar arritmias.' },
      { frente: '¿Se frota al paciente para calentarlo?', reverso: 'No.' },
      { frente: '¿Por qué la hipotermia importa en el traumatizado?', reverso: 'Porque empeora la coagulación y forma parte de la tríada que perpetúa la hemorragia.' },
      { frente: '¿Cómo se valora el pulso en hipotermia?', reverso: 'Durante más tiempo del habitual, porque puede ser muy lento y difícil de detectar.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente rescatado del agua, consciente pero confuso, con la piel fría y que ha dejado de tiritar. ¿Cómo lo interpretas?',
        opciones: [
          'Está mejorando: ya no tirita.',
          'Ha empeorado: la desaparición de la tiritona indica agotamiento del mecanismo de producción de calor.',
          'La tiritona nunca aparece en la inmersión.',
          'Puede caminar hasta la ambulancia sin riesgo.',
        ],
        correcta: 1,
        explicacion: 'Es uno de los signos que se interpretan al revés de lo que parece.',
      },
      {
        pregunta: '¿Cuál es la primera medida en un paciente hipotérmico?',
        opciones: [
          'Frotar enérgicamente las extremidades.',
          'Detener la pérdida de calor: retirarlo del ambiente frío, quitar la ropa mojada, secar y aislar.',
          'Darle una bebida alcohólica caliente.',
          'Hacerle caminar para que genere calor.',
        ],
        correcta: 1,
        explicacion: 'Antes de intentar devolver calor hay que dejar de perderlo; frotar y movilizar bruscamente están contraindicados.',
      },
      {
        pregunta: 'No detectas pulso en un paciente con hipotermia grave. ¿Qué corresponde?',
        opciones: [
          'Concluir de inmediato que está en paro y actuar sin más consideraciones.',
          'Valorar durante más tiempo del habitual, porque el pulso puede ser muy lento y débil, y seguir las guías de reanimación vigentes y el protocolo, que contemplan esta circunstancia.',
          'Descartar la reanimación por la temperatura.',
          'Frotar el tórax para estimular el corazón.',
        ],
        correcta: 1,
        explicacion: 'La hipotermia es una circunstancia especial contemplada de forma específica en las guías de reanimación.',
      },
      {
        pregunta: 'Persona mayor encontrada en el suelo de su domicilio tras varias horas, con temperatura ambiente moderada. ¿Es posible la hipotermia?',
        opciones: [
          'No: hace falta frío intenso.',
          'Sí: la inmovilidad, el contacto con el suelo y el tiempo bastan para perder calor de forma significativa.',
          'Solo si la ropa estaba mojada.',
          'Solo en invierno.',
        ],
        correcta: 1,
        explicacion: 'La conducción hacia el suelo y la inmovilidad prolongada son suficientes.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la actuación ante un paciente hipotérmico',
        pasos: [
          'Retirarlo del ambiente frío y del contacto con superficies frías',
          'Quitar la ropa mojada y secar la piel',
          'Aislar con mantas, incluida la cabeza, y proteger del viento',
          'Manipular despacio y en bloque, manteniéndolo horizontal',
          'Calentar el habitáculo y aplicar el recalentamiento que autorice el protocolo',
          'Reevaluar de forma continua y trasladar',
        ],
      },
      completar: [
        {
          texto: 'No se frota al paciente hipotérmico porque el corazón frío es ___.',
          opciones: ['insensible', 'irritable', 'más resistente'],
          correcta: 1,
          explicacion: 'La manipulación brusca puede desencadenar una arritmia.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['Los rangos numéricos de temperatura por grado se remiten a la guía adoptada y al protocolo; no se publican aquí.'],
    }),
  },

  'm5-la-golpe-calor': {
    icono: 'cp-servier-calor',
    duracion: '14 min',
    resumen: 'El golpe de calor es el extremo grave de los trastornos por calor y se reconoce por un '
      + 'dato que no admite discusión: la alteración del estado mental en un paciente que ha estado '
      + 'expuesto a calor o haciendo esfuerzo. Es una urgencia con riesgo vital en la que el '
      + 'tratamiento es el enfriamiento inmediato, y en la que cada minuto por encima de la '
      + 'temperatura crítica cuenta. Enfriar primero y trasladar enfriando es la regla del tema.',
    objetivos: [
      'Reconocer el golpe de calor por la alteración del estado mental en contexto de calor o esfuerzo.',
      'Diferenciarlo del agotamiento por calor y justificar la urgencia.',
      'Aplicar el enfriamiento inmediato conforme al método disponible y al protocolo.',
    ],
    secciones: [
      {
        titulo: 'Cuándo un cuadro por calor deja de ser leve',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Agotamiento por calor', 'Golpe de calor'],
            filas: [
              ['Estado mental', 'Conservado: el paciente está lúcido aunque se sienta mal', 'ALTERADO: confusión, conducta extraña, agitación, convulsión o inconsciencia'],
              ['Síntomas', 'Debilidad, mareo, cefalea, náusea, calambres, sudoración abundante', 'Los anteriores más el deterioro neurológico; la piel puede estar seca o sudorosa'],
              ['Temperatura', 'Elevada de forma moderada', 'Muy elevada'],
              ['Riesgo', 'Recuperación habitual con reposo, ambiente fresco e hidratación', 'Riesgo vital y de daño de órganos: urgencia'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El dato que decide', texto: 'Lo que separa un cuadro por calor manejable de una urgencia vital es la ALTERACIÓN DEL ESTADO MENTAL. Cualquier paciente expuesto a calor o tras un esfuerzo que esté confuso, agitado, con conducta extraña, con convulsión o inconsciente debe tratarse como golpe de calor hasta que se demuestre otra cosa, aunque no se pueda medir su temperatura.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La piel seca es un mito peligroso', texto: 'Se enseñó durante años que en el golpe de calor la piel está seca. Puede estarlo, pero en el golpe de calor por esfuerzo —el del trabajador, el deportista o el militar— con frecuencia el paciente sigue sudando de forma abundante. Descartar el diagnóstico porque el paciente suda es un error que retrasa el enfriamiento.' },
          {
            tipo: 'lista',
            titulo: 'Quién está en riesgo',
            items: [
              'Personas que realizan esfuerzo físico intenso con calor, con o sin aclimatación previa.',
              'Trabajadores expuestos, sobre todo con equipo de protección que impide disipar calor.',
              'Personas mayores, lactantes y niños pequeños.',
              'Pacientes con enfermedades crónicas o con medicación que limita la sudoración o la respuesta cardiovascular.',
              'Personas en viviendas sin ventilación durante olas de calor.',
              'Cualquier persona —sobre todo un niño— dejada dentro de un vehículo cerrado, donde la temperatura sube muy deprisa.',
            ],
          },
        ],
      },
      {
        titulo: 'El tratamiento es enfriar',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Enfriar primero, y enfriar durante el traslado', texto: 'En el golpe de calor, el enfriamiento es el tratamiento y su rapidez condiciona el resultado. No se retrasa para completar otras maniobras ni se interrumpe para trasladar: se traslada enfriando. Cuando el método más eficaz está disponible y es seguro, la inmersión en agua fría es el procedimiento que las guías señalan como preferente; qué método usa su servicio y con qué material lo determina el protocolo.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia',
            items: [
              'Retirar al paciente del ambiente caluroso y llevarlo a un lugar fresco o a la sombra.',
              'Quitar la ropa y el equipo que impidan disipar calor.',
              'Iniciar el enfriamiento con el método que autorice el protocolo y esté disponible: inmersión en agua fría cuando sea posible y seguro, o aplicación de agua fría sobre la piel con ventilación, o compresas frías en zonas de gran circulación.',
              'Vía aérea, ventilación y circulación conforme al alcance: el paciente con alteración de la conciencia puede no proteger su vía aérea.',
              'No administrar nada por vía oral a un paciente con la conciencia alterada.',
              'Accesos y fluidos según protocolo; medir la glucemia si está dentro del alcance, porque la hipoglucemia imita el deterioro neurológico.',
              'Monitorizar y vigilar la aparición de convulsiones y de arritmias.',
              'Traslado urgente con prealerta, manteniendo el enfriamiento en ruta.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace', texto: 'No se administran antitérmicos: el mecanismo del golpe de calor no es el de la fiebre y no responden a ellos. No se friccciona con alcohol. No se retrasa el enfriamiento para tomar una temperatura si no se dispone del termómetro adecuado. Y no se interrumpe el enfriamiento porque el paciente empiece a tiritar, salvo que el protocolo indique lo contrario.' },
        ],
      },
      F([AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Golpe de calor', definicion: 'Forma grave de los trastornos por calor, con temperatura muy elevada y alteración del estado mental; urgencia con riesgo vital.' },
      { termino: 'Agotamiento por calor', definicion: 'Cuadro por calor con estado mental conservado, que suele recuperarse con reposo, ambiente fresco e hidratación.' },
      { termino: 'Golpe de calor por esfuerzo', definicion: 'El que aparece durante actividad física intensa; el paciente puede seguir sudando de forma abundante.' },
      { termino: 'Enfriamiento activo', definicion: 'Conjunto de medidas para reducir la temperatura corporal, cuyo método concreto depende del material disponible y del protocolo.' },
    ],
    flashcards: [
      { frente: '¿Qué dato separa el golpe de calor del agotamiento por calor?', reverso: 'La alteración del estado mental.' },
      { frente: '¿La piel seca es imprescindible para el diagnóstico?', reverso: 'No: en el golpe de calor por esfuerzo el paciente suele seguir sudando.' },
      { frente: '¿Cuál es el tratamiento del golpe de calor?', reverso: 'El enfriamiento inmediato, que no se retrasa ni se interrumpe para trasladar.' },
      { frente: '¿Sirven los antitérmicos?', reverso: 'No: el mecanismo no es el de la fiebre y no responden a ellos.' },
      { frente: '¿Qué método señalan las guías como preferente cuando es posible y seguro?', reverso: 'La inmersión en agua fría, conforme al material y al protocolo del servicio.' },
      { frente: '¿Por qué se mide la glucemia?', reverso: 'Porque la hipoglucemia imita el deterioro neurológico.' },
    ],
    quiz: [
      {
        pregunta: 'Trabajador de la construcción en una ola de calor, confuso y con conducta extraña, sudoroso. ¿Qué es?',
        opciones: [
          'Agotamiento por calor: está sudando.',
          'Golpe de calor: la alteración del estado mental lo define, y la sudoración no lo descarta.',
          'Deshidratación simple.',
          'Insolación leve sin repercusión.',
        ],
        correcta: 1,
        explicacion: 'En el golpe de calor por esfuerzo la sudoración suele mantenerse; el dato que decide es el estado mental.',
      },
      {
        pregunta: 'Has iniciado el enfriamiento y llega el momento de trasladar. ¿Qué haces?',
        opciones: [
          'Interrumpes el enfriamiento para no mojar la camilla.',
          'Trasladas manteniendo el enfriamiento en ruta: su rapidez condiciona el resultado.',
          'Esperas a que la temperatura baje del todo antes de salir.',
          'Sustituyes el enfriamiento por un antitérmico.',
        ],
        correcta: 1,
        explicacion: 'El enfriamiento es el tratamiento y no se interrumpe para el traslado.',
      },
      {
        pregunta: 'Un compañero propone administrar un antitérmico a un paciente con golpe de calor. ¿Qué respondes?',
        opciones: [
          'Que es la medida prioritaria.',
          'Que no está indicado: el mecanismo no es el de la fiebre y el tratamiento es el enfriamiento.',
          'Que se administre solo si convulsiona.',
          'Que se administre por vía oral.',
        ],
        correcta: 1,
        explicacion: 'Los antitérmicos actúan sobre la fiebre, no sobre la hipertermia por calor ambiental o por esfuerzo.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Dos pacientes en la misma obra: uno está mareado, con náusea y calambres pero lúcido y orientado; el otro responde con frases incoherentes. ¿Cómo priorizas y qué haces con cada uno?',
          opciones: [
            'Ambos igual: los dos son cuadros por calor.',
            'El incoherente es un golpe de calor y tiene prioridad: enfriamiento inmediato y traslado urgente enfriando. El lúcido corresponde a agotamiento por calor: reposo en lugar fresco, retirada de ropa que impida disipar calor, hidratación conforme al protocolo y vigilancia, porque puede progresar.',
            'El que tiene calambres es más grave por el dolor.',
            'Ninguno requiere traslado si ambos están conscientes.',
          ],
          correcta: 1,
          explicacion: 'La lección establece la alteración del estado mental como el dato que separa ambos cuadros y determina la prioridad y el tratamiento.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'Se retira la enseñanza tradicional de que la piel seca es imprescindible para el diagnóstico.',
        'No se publican umbrales de temperatura ni tiempos objetivo de enfriamiento; el método concreto depende del material y del protocolo.',
      ],
    }),
  },

  'm5-la-insolacion': {
    icono: 'cp-servier-sol',
    duracion: '12 min',
    resumen: 'El plan dedica un tema propio a la insolación. El término se usa en español con dos '
      + 'sentidos —el cuadro por exposición directa al sol y, en algunas fuentes, el propio golpe de '
      + 'calor—, así que la lección aclara esa ambigüedad antes que nada. Después desarrolla lo que sí '
      + 'es específico de la exposición solar: el cuadro leve o moderado con estado mental conservado, '
      + 'la quemadura solar que lo acompaña y la prevención.',
    objetivos: [
      'Aclarar el uso ambiguo del término insolación y situarlo en el espectro de los trastornos por calor.',
      'Reconocer el cuadro por exposición solar con estado mental conservado y su manejo.',
      'Aplicar los criterios de vigilancia, derivación y prevención.',
    ],
    secciones: [
      {
        titulo: 'Una palabra con dos usos',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Aclaración terminológica necesaria', texto: 'En español, «insolación» se emplea con dos sentidos. En unos textos designa el cuadro producido por exposición directa y prolongada al sol —con cefalea, malestar, náusea y quemadura solar, y con el paciente lúcido—. En otros se usa como sinónimo de golpe de calor. Esta lección adopta el primer sentido, que es el que justifica un tema distinto del anterior, y lo declara expresamente. La academia debe confirmar qué acepción quiere que se enseñe, y la pregunta queda registrada en la ficha editorial.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La regla que resuelve la duda en la calle', texto: 'Sea cual sea el nombre que se le dé, lo único que hay que decidir en la escena es si el estado mental está alterado. Si lo está, se trata como golpe de calor: enfriamiento inmediato y traslado urgente. Si no lo está, es un cuadro por calor manejable que exige retirar la exposición, refrescar, hidratar conforme al protocolo y vigilar, porque puede progresar.' },
        ],
      },
      {
        titulo: 'Lo específico de la exposición solar',
        bloques: [
          { tipo: 'p', texto: 'La radiación solar directa suma dos agresiones a la del calor ambiental: el aporte de calor por radiación sobre la cabeza y el tronco, y la quemadura de la piel. Ambas se refuerzan, porque una piel quemada disipa peor el calor y pierde más líquido.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se encuentra',
            items: [
              'Cefalea, sensación de mareo y debilidad tras horas de exposición.',
              'Náusea y, a veces, vómito.',
              'Piel de la cara, el cuello y los hombros enrojecida y caliente, dolorosa al tacto.',
              'Sudoración abundante y sensación de sed intensa.',
              'Calambres musculares.',
              'Estado mental conservado: el paciente está orientado y colabora.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Retirar de la exposición: sombra o interior fresco.',
              'Aflojar o retirar la ropa que impida disipar calor.',
              'Refrescar con agua sobre la piel y ventilación.',
              'Hidratación por vía oral solo si el paciente está lúcido, no vomita y el protocolo lo contempla.',
              'Reposo en posición cómoda, con las piernas elevadas si hay sensación de mareo y no hay contraindicación.',
              'Cuidado de la quemadura solar: enfriar con agua, cubrir sin apretar y no aplicar sustancias que retengan calor.',
              'Reevaluar de forma repetida: la aparición de cualquier alteración del estado mental cambia el cuadro y la conducta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cuándo se traslada aunque parezca leve', texto: 'Cuando el paciente no mejora con las medidas iniciales, cuando vomita de forma repetida y no tolera la hidratación, cuando es una persona mayor, un lactante o un niño pequeño, cuando tiene enfermedades crónicas o toma medicación que limita la respuesta al calor, cuando la quemadura solar es extensa o con ampollas, y siempre que aparezca cualquier grado de confusión.' },
          { tipo: 'p', texto: 'La prevención es parte del contenido de este tema porque es donde el ámbito prehospitalario más puede aportar en un evento con muchos afectados: sombra, descansos, hidratación regular, ropa adecuada, protección solar y atención especial a niños, personas mayores y trabajadores con equipo de protección. Un paciente atendido por insolación es también una oportunidad para evitar el siguiente.' },
        ],
      },
      F([AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Insolación', definicion: 'Cuadro por exposición directa y prolongada al sol, con malestar general y quemadura solar, y con estado mental conservado en la acepción que adopta esta lección.' },
      { termino: 'Quemadura solar', definicion: 'Lesión de la piel por radiación ultravioleta; dificulta la disipación de calor y aumenta la pérdida de líquido.' },
      { termino: 'Progresión del cuadro por calor', definicion: 'Paso de un cuadro leve a golpe de calor, marcado por la aparición de alteración del estado mental.' },
    ],
    flashcards: [
      { frente: '¿Qué ambigüedad tiene el término insolación?', reverso: 'Se usa para el cuadro por exposición solar directa y, en algunas fuentes, como sinónimo de golpe de calor.' },
      { frente: '¿Qué se decide realmente en la escena?', reverso: 'Si el estado mental está alterado: si lo está, se trata como golpe de calor.' },
      { frente: '¿Por qué la quemadura solar empeora el cuadro?', reverso: 'Porque una piel quemada disipa peor el calor y pierde más líquido.' },
      { frente: '¿Cuándo se da hidratación por vía oral?', reverso: 'Solo si el paciente está lúcido, no vomita y el protocolo lo contempla.' },
      { frente: 'Tres criterios para trasladar aunque parezca leve', reverso: 'No mejorar con las medidas iniciales, vómito repetido, y ser persona mayor, lactante o niño pequeño.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente tras horas al sol, lúcido, con cefalea, náusea, piel enrojecida y sudoración abundante. ¿Qué corresponde?',
        opciones: [
          'Tratarlo como golpe de calor con enfriamiento por inmersión.',
          'Retirarlo de la exposición, refrescarlo, hidratarlo por vía oral si lo tolera y el protocolo lo contempla, y reevaluar por si progresa.',
          'Administrar un antitérmico y darle el alta.',
          'Aplicar una sustancia grasa sobre la quemadura solar.',
        ],
        correcta: 1,
        explicacion: 'Con el estado mental conservado el cuadro es manejable, pero requiere vigilancia porque puede progresar.',
      },
      {
        pregunta: 'Durante la reevaluación, el mismo paciente empieza a estar confuso. ¿Qué cambia?',
        opciones: [
          'Nada: sigue siendo una insolación.',
          'Todo: la alteración del estado mental lo convierte en golpe de calor, con enfriamiento inmediato y traslado urgente.',
          'Solo hay que darle más agua.',
          'Se le pide que descanse veinte minutos más.',
        ],
        correcta: 1,
        explicacion: 'La aparición de alteración mental es el punto que marca el paso al cuadro grave.',
      },
      {
        pregunta: 'En un evento multitudinario con muchos afectados leves por calor, ¿qué aporta más el equipo?',
        opciones: [
          'Trasladar a todos al hospital.',
          'Atender a los afectados y actuar sobre la prevención: sombra, descansos, hidratación regular y atención especial a niños, personas mayores y trabajadores con equipo de protección.',
          'Administrar antitérmicos de forma sistemática.',
          'Esperar a que aparezcan casos graves.',
        ],
        correcta: 1,
        explicacion: 'Un paciente atendido por insolación es también una oportunidad para evitar el siguiente.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La única decisión que realmente cambia la conducta en la escena es si el ___ está alterado.',
          opciones: ['color de la piel', 'estado mental', 'grado de sudoración'],
          correcta: 1,
          explicacion: 'Si lo está, el cuadro se trata como golpe de calor.',
        },
        {
          texto: 'La hidratación por vía oral solo se ofrece si el paciente está lúcido, ___ y el protocolo lo contempla.',
          opciones: ['tiene sed', 'no vomita', 'está de pie'],
          correcta: 1,
          explicacion: 'El vómito repetido, además, es un criterio para trasladar.',
        },
        {
          texto: 'Una piel con quemadura solar ___ el calor, lo que agrava el cuadro.',
          opciones: ['disipa mejor', 'disipa peor', 'no influye en'],
          correcta: 1,
          explicacion: 'Además pierde más líquido, de modo que ambas agresiones se refuerzan.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'DECISIÓN PENDIENTE: la academia debe confirmar qué acepción de «insolación» quiere que se enseñe. La lección adopta la de cuadro por exposición solar con estado mental conservado y lo declara expresamente.',
        'La lección remite el cuadro con alteración del estado mental al tema de golpe de calor, para no duplicar contenido ni contradecirlo.',
      ],
    }),
  },
}
