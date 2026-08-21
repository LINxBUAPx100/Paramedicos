// ============================================================
//  MÓDULO 5 — Unidad «QUEMADURAS»
// ------------------------------------------------------------
//  Los 7 temas de la unidad. Con este archivo el Módulo 5 queda completo en
//  cobertura de lecciones.
//
//  CONTROL CLÍNICO OBLIGATORIO (CLAUDE.md §9.2): en `m5-que-parkland` se
//  enseña la fórmula clásica que el plan pide —4 mL/kg/%SCQ— identificada como
//  ANTECEDENTE, y se compara con la recomendación de la American Burn
//  Association de 2024 de iniciar en 2 mL/kg/%SCQ en el adulto con SCQ extensa,
//  TITULANDO después según la respuesta. La fórmula no se presenta como una
//  dosis fija ni como una pauta que el ámbito prehospitalario decida por su
//  cuenta: el volumen real, la solución y el ritmo dependen del protocolo.
//
//  Las cifras de la regla de los nueve y de las fórmulas se publican porque el
//  plan las exige como INSTRUMENTOS DE ESTIMACIÓN Y DE CÁLCULO, con su fuente
//  declarada. No se publica ninguna dosis de analgésico ni de otro fármaco.
//
//  DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 para esta unidad quedan
//  PENDIENTES. La copia de PHTLS 10 declara traducción automática y no se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const ABA_2024 = {
  nombre: 'American Burn Association. Clinical Practice Guideline on Burn Shock Resuscitation, 2024.',
  url: 'https://pubmed.ncbi.nlm.nih.gov/38051821/',
  nota: 'Guía primaria actual de la reanimación con líquidos del paciente quemado. Sostiene el inicio '
    + 'en 2 mL/kg/%SCQ en el adulto y la titulación según respuesta. PENDIENTE: apartado y página '
    + 'exactos del documento completo.',
}
const PHTLS = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4).',
  nota: 'Base curricular histórica declarada por el plan; es la edición de la que procede la fórmula '
    + 'clásica que el temario pide enseñar. Capítulo y página PENDIENTES para esta unidad. No se cita '
    + 'la 10.ª edición: la copia disponible declara traducción automática.',
}
const AHA_PA_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía primaria actual para el cuidado inicial de la quemadura en el ámbito de primeros '
    + 'auxilios. PENDIENTE: apartado exacto.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE, vía aérea y estabilización del paciente quemado. PENDIENTE: '
    + 'módulo y página exactos.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Buenas prácticas del ACS, incluidos los criterios de derivación a centro especializado. '
    + 'PENDIENTE: guía y apartado exactos.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, formulario, soluciones, equipamiento y dirección médica de la academia '
    + 'R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija la solución disponible, el ritmo de '
    + 'infusión, la analgesia, el material de curación y el centro de destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const AMBITO = 'ÁMBITO PREHOSPITALARIO: detener la lesión, valorar la vía aérea, estimar la extensión, '
  + 'prevenir la hipotermia, tratar el dolor conforme al alcance y derivar. El tratamiento definitivo '
  + 'de la quemadura es hospitalario y especializado.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: solución, ritmo de infusión, analgesia, apósitos, oxígeno y '
  + 'destino dependen del alcance autorizado, del material disponible y del protocolo del servicio. '
  + 'No se publica ninguna dosis de fármaco en esta unidad.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'ABA Burn Shock Resuscitation 2024; PHTLS 9.ª ed. (capítulo pendiente); AHA/ARC Primeros Auxilios 2024',
  observaciones: [
    'Redactado desde cero en el lote B del Módulo 5; el tema estaba vacío.',
    AMBITO,
    PROTOCOLO,
    'DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 pendientes de localizar para esta unidad.',
    ...extra,
  ],
  fuentes,
})

const FU = [
  'American Burn Association. Burn Shock Resuscitation, 2024.',
  'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
  'AHA / American Red Cross. Guidelines for First Aid, 2024.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
]

export default {
  'm5-que-definicion': {
    icono: 'cp-servier-piel',
    duracion: '13 min',
    resumen: 'Una quemadura es la destrucción de tejido por transferencia de energía térmica, química, '
      + 'eléctrica o por radiación. Su gravedad no depende solo del aspecto de la piel: depende de la '
      + 'extensión, de la profundidad, de la localización, de la edad del paciente y, sobre todo, de '
      + 'si hay compromiso de la vía aérea. La lección explica por qué la piel quemada deja de cumplir '
      + 'sus funciones y por qué un paciente quemado se enfría con tanta facilidad.',
    objetivos: [
      'Definir la quemadura y enumerar los agentes que la producen.',
      'Relacionar la pérdida de las funciones de la piel con las consecuencias sistémicas.',
      'Identificar los factores que determinan la gravedad más allá del aspecto de la lesión.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué deja de funcionar',
        bloques: [
          { tipo: 'p', texto: 'La piel es una barrera que impide la entrada de microorganismos, retiene el líquido corporal, regula la temperatura y proporciona sensibilidad. Una quemadura destruye esa barrera en la superficie afectada, y las consecuencias no se limitan a la zona lesionada: el paciente pierde líquido, pierde calor y queda expuesto a la infección.' },
          {
            tipo: 'lista',
            titulo: 'Las cuatro funciones que se pierden',
            items: [
              'Barrera frente a la infección: la superficie quemada es una puerta abierta.',
              'Retención de líquido: se pierde plasma hacia el tejido y hacia el exterior, y esa pérdida sostiene el shock del quemado.',
              'Regulación de la temperatura: el paciente quemado se enfría con mucha rapidez, incluso en ambientes templados.',
              'Sensibilidad: en las quemaduras profundas la zona deja de doler, lo que es un signo de gravedad, no de mejoría.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La quemadura enfría', texto: 'Es una de las confusiones más frecuentes de esta unidad: el paciente quemado tiene un problema de hipotermia, no de exceso de calor. Ha perdido la capacidad de conservar temperatura en la zona lesionada y, además, el enfriamiento inicial de la quemadura y la humedad lo agravan. Cubrirlo y mantener el habitáculo caliente forma parte del tratamiento desde el primer minuto.' },
        ],
      },
      {
        titulo: 'Qué determina la gravedad',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Seis factores',
            items: [
              'Extensión: qué porcentaje de la superficie corporal está afectada.',
              'Profundidad: hasta qué capa llega la lesión.',
              'Localización: cara, cuello, manos, pies, genitales, periné y articulaciones tienen una repercusión funcional mayor; las circunferenciales pueden comprometer la circulación o la ventilación.',
              'Edad y estado previo: los extremos de edad y las enfermedades crónicas empeoran la tolerancia.',
              'Lesión por inhalación: es la que más cambia el pronóstico y puede existir sin quemadura visible en la cara.',
              'Lesiones asociadas: explosiones, caídas y accidentes de tráfico añaden trauma al problema térmico.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo primero no es la piel', texto: 'En un paciente quemado, la primera pregunta no es cuánta superficie está afectada, sino si la vía aérea está o va a estar comprometida. El edema de la vía aérea tras una exposición al humo o al calor progresa con los minutos y puede cerrarla. Una quemadura extensa impresiona; una vía aérea que se cierra mata antes.' },
          { tipo: 'p', texto: 'Los agentes que producen quemaduras —térmicos, químicos, eléctricos y por radiación— tienen su tema propio en esta unidad y cada uno impone precauciones distintas para el equipo y para el paciente.' },
        ],
      },
      F([ABA_2024, PHTLS, AHA_PA_2024, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Quemadura', definicion: 'Destrucción de tejido por transferencia de energía térmica, química, eléctrica o por radiación.' },
      { termino: 'Superficie corporal quemada', definicion: 'Porcentaje del cuerpo afectado por la quemadura; base de la estimación de gravedad y del cálculo de líquidos.' },
      { termino: 'Lesión por inhalación', definicion: 'Afectación de la vía aérea y del pulmón por humo, gases o calor; es el factor que más cambia el pronóstico.' },
      { termino: 'Quemadura circunferencial', definicion: 'La que rodea por completo un segmento; puede comprometer la circulación distal o la expansión del tórax.' },
    ],
    flashcards: [
      { frente: 'Las cuatro funciones de la piel que se pierden', reverso: 'Barrera frente a la infección, retención de líquido, regulación de la temperatura y sensibilidad.' },
      { frente: '¿El paciente quemado tiene exceso o defecto de temperatura?', reverso: 'Defecto: se enfría con rapidez y la hipotermia es un problema desde el primer minuto.' },
      { frente: '¿Qué significa que una zona quemada no duela?', reverso: 'Que la lesión es profunda: es un signo de gravedad, no de mejoría.' },
      { frente: '¿Cuál es la primera pregunta ante un quemado?', reverso: 'Si la vía aérea está o va a estar comprometida.' },
      { frente: 'Localizaciones de especial repercusión', reverso: 'Cara, cuello, manos, pies, genitales, periné y articulaciones, y las quemaduras circunferenciales.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente rescatado de un incendio en un espacio cerrado, con quemaduras leves en un brazo, tos y hollín en la boca. ¿Qué priorizas?',
        opciones: [
          'La curación de la quemadura del brazo.',
          'La vía aérea: la sospecha de lesión por inhalación cambia el pronóstico y el edema progresa con los minutos.',
          'El cálculo exacto de la superficie quemada.',
          'La administración de analgesia antes que cualquier otra cosa.',
        ],
        correcta: 1,
        explicacion: 'La extensión impresiona, pero es la vía aérea la que decide el desenlace inmediato.',
      },
      {
        pregunta: '¿Por qué un paciente quemado se enfría con facilidad?',
        opciones: [
          'Porque el calor de la quemadura se disipa lentamente.',
          'Porque ha perdido la capacidad de regular la temperatura en la zona lesionada, y el enfriamiento inicial y la humedad lo agravan.',
          'Porque siempre está en ambientes fríos.',
          'Porque la piel quemada produce sudor en exceso.',
        ],
        correcta: 1,
        explicacion: 'De ahí que cubrirlo y mantener el habitáculo caliente forme parte del tratamiento.',
      },
      {
        pregunta: 'Una zona quemada del muslo no duele al tocarla. ¿Cómo lo interpretas?',
        opciones: [
          'Como signo de que la quemadura es superficial.',
          'Como signo de profundidad: se han destruido las terminaciones sensitivas.',
          'Como respuesta normal al frío aplicado.',
          'Como indicación de alta en el lugar.',
        ],
        correcta: 1,
        explicacion: 'La pérdida de sensibilidad indica que la lesión ha alcanzado capas profundas.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La pérdida de plasma a través de la superficie quemada es lo que sostiene el ___ del paciente quemado.',
          opciones: ['dolor', 'shock', 'edema pulmonar'],
          correcta: 1,
          explicacion: 'Por eso la reposición de líquidos es uno de los pilares del tratamiento.',
        },
        {
          texto: 'El factor que más cambia el pronóstico de un quemado es la lesión por ___.',
          opciones: ['contacto', 'inhalación', 'radiación'],
          correcta: 1,
          explicacion: 'Puede existir sin quemadura visible en la cara y progresa con los minutos.',
        },
        {
          texto: 'Una quemadura ___ puede comprometer la circulación distal o la expansión del tórax.',
          opciones: ['superficial', 'circunferencial', 'química'],
          correcta: 1,
          explicacion: 'Al rodear por completo un segmento, actúa como un anillo que aprieta.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-que-agentes-termicos': {
    icono: 'dg-agentes-quemadura',
    duracion: '14 min',
    resumen: 'El plan pide estudiar los tipos de agentes. La lección desarrolla los térmicos —llama, '
      + 'líquido caliente, contacto con superficie caliente, vapor y frío— y añade los tres grupos '
      + 'restantes que el equipo va a encontrar: químicos, eléctricos y por radiación. Cada agente '
      + 'impone una forma distinta de detener la lesión y, en varios de ellos, una precaución para el '
      + 'propio equipo que precede a cualquier atención.',
    objetivos: [
      'Diferenciar los agentes térmicos y la lesión característica de cada uno.',
      'Aplicar la medida que detiene la lesión según el agente.',
      'Reconocer los riesgos para el equipo antes de acercarse al paciente.',
    ],
    secciones: [
      {
        titulo: 'Agentes térmicos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Agente', 'Lesión característica', 'Cómo se detiene'],
            filas: [
              ['Llama', 'Profunda, con ropa adherida y frecuente lesión por inhalación si hubo espacio cerrado', 'Apagar la llama, retirar la ropa que arda o esté impregnada y enfriar'],
              ['Líquido caliente (escaldadura)', 'Extensa y de profundidad irregular; muy frecuente en niños pequeños', 'Retirar la ropa empapada, que retiene el calor, y enfriar'],
              ['Contacto con superficie caliente', 'Bien delimitada, con la forma del objeto; profunda si el contacto fue prolongado', 'Separar del objeto y enfriar'],
              ['Vapor', 'Puede afectar a la vía aérea con mayor facilidad que la llama, porque el vapor transporta mucho calor y penetra', 'Retirar del ambiente y vigilar la vía aérea de forma estrecha'],
              ['Frío (congelación)', 'Zonas distales pálidas, duras e insensibles', 'Retirar de la exposición y recalentar conforme al protocolo, sin frotar'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La ropa sigue quemando', texto: 'En la escaldadura, la ropa empapada mantiene el líquido caliente en contacto con la piel y prolonga la lesión. En la quemadura por llama ocurre lo mismo con los tejidos que arden o quedan impregnados. Retirar esa ropa —cortándola y sin arrancar lo que esté adherido— es la primera medida que detiene el daño.' },
        ],
      },
      {
        titulo: 'Los otros tres agentes',
        bloques: [
          { tipo: 'p', texto: '**Químicos.** La lesión continúa mientras el producto siga en contacto con la piel, así que la medida que la detiene es retirar el agente: cepillar en seco el producto en polvo antes de nada, quitar la ropa contaminada y después irrigar de forma abundante y prolongada con agua. Los álcalis penetran más y durante más tiempo que los ácidos, de modo que un aspecto poco llamativo no autoriza a irrigar menos. No se intenta neutralizar el producto con otra sustancia: la reacción genera calor y añade daño.' },
          { tipo: 'p', texto: '**Eléctricos.** Lo visible engaña: las lesiones de entrada y salida pueden ser pequeñas mientras el trayecto de la corriente ha dañado músculo, vasos y nervios en profundidad. Añaden riesgo de arritmia, de lesión por aplastamiento del músculo dañado y de traumatismo por la caída o por la contracción muscular violenta. La seguridad del equipo es absoluta: no se toca al paciente hasta que la fuente esté desconectada por quien tiene competencia para hacerlo.' },
          { tipo: 'p', texto: '**Por radiación.** Incluye la quemadura solar, la más frecuente y la más banal, y las exposiciones a fuentes ionizantes, que son excepcionales y exigen respuesta especializada. En este segundo caso el equipo actúa conforme al procedimiento de material peligroso del servicio, y la atención al paciente se subordina a la seguridad de la escena.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Antes de tocar al paciente', texto: 'En el agente químico se necesita protección personal adecuada y saber qué producto es; en el eléctrico, que la fuente esté desconectada; en el incendio en espacio cerrado, que la escena esté controlada y ventilada. Un rescatador lesionado añade un paciente y resta un recurso.' },
        ],
      },
      F([AHA_PA_2024, PHTLS, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Escaldadura', definicion: 'Quemadura por líquido caliente; extensa, de profundidad irregular y muy frecuente en niños pequeños.' },
      { termino: 'Quemadura química', definicion: 'La producida por un agente que sigue lesionando mientras permanece en contacto; se detiene retirando el producto e irrigando.' },
      { termino: 'Quemadura eléctrica', definicion: 'La producida por el paso de corriente; el daño profundo suele ser mucho mayor que las lesiones visibles.' },
      { termino: 'Neutralización', definicion: 'Intento de contrarrestar un producto químico con otro; no se hace, porque la reacción genera calor y añade daño.' },
    ],
    flashcards: [
      { frente: '¿Por qué se retira la ropa empapada en una escaldadura?', reverso: 'Porque retiene el líquido caliente contra la piel y prolonga la lesión.' },
      { frente: '¿Qué se hace primero con un químico en polvo?', reverso: 'Cepillarlo en seco antes de irrigar.' },
      { frente: '¿Se neutraliza un químico con otra sustancia?', reverso: 'No: la reacción genera calor y añade daño.' },
      { frente: '¿Por qué engaña la quemadura eléctrica?', reverso: 'Porque las lesiones visibles pueden ser pequeñas mientras el trayecto ha dañado músculo, vasos y nervios en profundidad.' },
      { frente: '¿Qué agente térmico compromete la vía aérea con especial facilidad?', reverso: 'El vapor, porque transporta mucho calor y penetra.' },
      { frente: '¿Qué precede a tocar a un paciente electrocutado?', reverso: 'Que la fuente esté desconectada por quien tiene competencia para hacerlo.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con escaldadura por agua hirviendo, con la camiseta empapada pegada al tronco. ¿Qué haces primero?',
        opciones: [
          'Aplicar un apósito sobre la camiseta.',
          'Retirar la ropa empapada cortándola, sin arrancar lo adherido, porque mantiene el calor contra la piel.',
          'Aplicar hielo directamente.',
          'Esperar a la llegada al hospital para desvestirlo.',
        ],
        correcta: 1,
        explicacion: 'Mientras la ropa caliente siga en contacto, la lesión continúa profundizando.',
      },
      {
        pregunta: 'Trabajador con un producto químico en polvo sobre el antebrazo. ¿Cuál es la secuencia?',
        opciones: [
          'Irrigar de inmediato con abundante agua.',
          'Cepillar en seco el polvo, retirar la ropa contaminada y después irrigar de forma abundante y prolongada.',
          'Neutralizar con una sustancia de pH contrario.',
          'Cubrir con apósito seco sin tocar el producto.',
        ],
        correcta: 1,
        explicacion: 'Irrigar sobre un producto en polvo puede activarlo o extenderlo; primero se cepilla en seco.',
      },
      {
        pregunta: 'Paciente electrocutado con dos pequeñas lesiones en la mano y en el pie. ¿Cómo lo interpretas?',
        opciones: [
          'Como lesiones menores por su tamaño.',
          'Como marcas de un trayecto que puede haber dañado músculo, vasos y nervios en profundidad, con riesgo de arritmia y de lesión por aplastamiento del músculo.',
          'Como quemadura química.',
          'Como lesión exclusivamente cutánea.',
        ],
        correcta: 1,
        explicacion: 'En la quemadura eléctrica lo visible es la parte más pequeña del problema.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Los ___ penetran más y durante más tiempo que los ácidos, así que un aspecto poco llamativo no autoriza a irrigar menos.',
          opciones: ['disolventes', 'álcalis', 'aceites'],
          correcta: 1,
          explicacion: 'Es la razón por la que la irrigación debe ser abundante y prolongada.',
        },
        {
          texto: 'La quemadura por contacto con una superficie caliente se reconoce porque está bien ___ y reproduce la forma del objeto.',
          opciones: ['coloreada', 'delimitada', 'ampollada'],
          correcta: 1,
          explicacion: 'Su profundidad depende sobre todo del tiempo de contacto.',
        },
        {
          texto: 'Ante un incendio en espacio cerrado, además de la quemadura hay que sospechar lesión por ___.',
          opciones: ['radiación', 'inhalación', 'congelación'],
          correcta: 1,
          explicacion: 'Es el factor que más cambia el pronóstico del paciente quemado.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-que-grados': {
    icono: 'cp-servier-quemadura-2do',
    duracion: '14 min',
    resumen: 'La profundidad de una quemadura se clasifica por la capa de piel que alcanza, y de ella '
      + 'dependen el aspecto, el dolor y la evolución. La terminología tradicional habla de primer, '
      + 'segundo y tercer grado; la actual prefiere describir la profundidad —superficial, de espesor '
      + 'parcial y de espesor total—, porque es más precisa. La lección enseña ambas, explica cómo se '
      + 'reconoce cada una y advierte de que la profundidad definitiva no se establece en la escena.',
    objetivos: [
      'Clasificar la quemadura por profundidad y correlacionar ambas terminologías.',
      'Reconocer el aspecto, el dolor y el llenado capilar característicos de cada grado.',
      'Explicar por qué la profundidad definitiva no se determina en el ámbito prehospitalario.',
    ],
    secciones: [
      {
        titulo: 'Las capas y los grados',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Terminología tradicional', 'Terminología actual', 'Hasta dónde llega'],
            filas: [
              ['Primer grado', 'Superficial', 'Solo la epidermis'],
              ['Segundo grado superficial', 'Espesor parcial superficial', 'Epidermis y parte superficial de la dermis'],
              ['Segundo grado profundo', 'Espesor parcial profundo', 'Epidermis y parte profunda de la dermis'],
              ['Tercer grado', 'Espesor total', 'Toda la dermis y el tejido subcutáneo'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Cómo se reconoce cada una',
            headers: ['Profundidad', 'Aspecto', 'Dolor', 'Ampollas y llenado capilar'],
            filas: [
              ['Superficial', 'Enrojecida, seca', 'Dolorosa', 'Sin ampollas; enrojece y palidece al presionar'],
              ['Espesor parcial superficial', 'Roja o rosada, húmeda y brillante', 'Muy dolorosa', 'Ampollas; llenado capilar presente'],
              ['Espesor parcial profundo', 'Rosada pálida o blanquecina, algo menos húmeda', 'Dolor menor o alterado', 'Ampollas rotas; llenado capilar lento o ausente'],
              ['Espesor total', 'Blanca nacarada, cérea, marrón o carbonizada; seca y rígida', 'Indolora en la zona quemada', 'Sin ampollas; sin llenado capilar'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La quemadura que no duele es la peor', texto: 'Es la paradoja de esta unidad. La ausencia de dolor en una zona quemada significa que se han destruido las terminaciones sensitivas, es decir, que la lesión es de espesor total. Además, esas zonas están casi siempre rodeadas de áreas menos profundas que sí duelen mucho, de modo que el paciente refiere dolor intenso aunque tenga zonas profundas insensibles.' },
        ],
      },
      {
        titulo: 'Lo que la escena no puede decidir',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'La profundidad evoluciona', texto: 'Una quemadura no tiene una profundidad fija desde el primer minuto: puede profundizar en las horas siguientes, sobre todo si el enfriamiento fue insuficiente, si el paciente está mal perfundido o si hay infección. Por eso la clasificación de la escena es una estimación inicial que se documenta, no un diagnóstico definitivo, y el centro receptor la reevaluará.' },
          {
            tipo: 'lista',
            titulo: 'Qué se documenta',
            items: [
              'Localización precisa de cada zona quemada.',
              'Aspecto, presencia de ampollas y respuesta al dolor de cada área.',
              'Estimación de la profundidad predominante, declarada como estimación.',
              'Si hay áreas circunferenciales y en qué segmento.',
              'La hora del accidente y la hora de la valoración.',
              'Qué medidas se aplicaron y cuándo, incluido el enfriamiento.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La quemadura superficial no cuenta para la extensión', texto: 'La quemadura de primer grado o superficial —la típica quemadura solar— no se incluye en el cálculo del porcentaje de superficie corporal quemada que se usa para estimar la gravedad y los líquidos. Incluirla infla la cifra y puede llevar a decisiones equivocadas. Se documenta, pero no se suma.' },
        ],
      },
      F([ABA_2024, PHTLS, AHA_PA_2024, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Quemadura superficial', definicion: 'La que afecta solo a la epidermis; enrojecida, seca, dolorosa y sin ampollas.' },
      { termino: 'Espesor parcial', definicion: 'La que alcanza la dermis; cursa con ampollas y dolor, y se subdivide en superficial y profunda.' },
      { termino: 'Espesor total', definicion: 'La que destruye toda la dermis y alcanza el tejido subcutáneo; blanca, cérea o carbonizada, seca e indolora.' },
      { termino: 'Profundización', definicion: 'Aumento de la profundidad de la quemadura en las horas siguientes, favorecido por el enfriamiento insuficiente, la mala perfusión y la infección.' },
    ],
    flashcards: [
      { frente: 'Equivalencia de tercer grado en terminología actual', reverso: 'Quemadura de espesor total.' },
      { frente: '¿Qué aspecto tiene una quemadura de espesor total?', reverso: 'Blanca nacarada, cérea, marrón o carbonizada; seca, rígida, sin ampollas y sin llenado capilar.' },
      { frente: '¿Qué significa que una zona quemada no duela?', reverso: 'Que es de espesor total: se han destruido las terminaciones sensitivas.' },
      { frente: '¿Se incluye la quemadura superficial en el porcentaje de superficie quemada?', reverso: 'No: se documenta pero no se suma.' },
      { frente: '¿Es definitiva la profundidad valorada en la escena?', reverso: 'No: la quemadura puede profundizar en las horas siguientes.' },
    ],
    quiz: [
      {
        pregunta: 'Zona quemada de aspecto blanco nacarado, seca, rígida y que no duele al tocarla. ¿Qué profundidad tiene?',
        opciones: ['Superficial', 'Espesor parcial superficial', 'Espesor total', 'No puede estimarse'],
        correcta: 2,
        explicacion: 'El aspecto céreo, la sequedad y la ausencia de dolor definen la quemadura de espesor total.',
      },
      {
        pregunta: 'Quemadura roja, húmeda, con ampollas y muy dolorosa. ¿Cómo la clasificas?',
        opciones: [
          'Espesor total.',
          'Espesor parcial superficial, equivalente al segundo grado superficial.',
          'Superficial de primer grado.',
          'Quemadura química por definición.',
        ],
        correcta: 1,
        explicacion: 'Las ampollas, la humedad y el dolor intenso son característicos del espesor parcial superficial.',
      },
      {
        pregunta: 'El paciente tiene la espalda enrojecida por el sol y una zona del antebrazo con ampollas. ¿Qué incluyes en el porcentaje de superficie quemada?',
        opciones: [
          'Ambas zonas.',
          'Solo el antebrazo: la quemadura superficial no se suma.',
          'Solo la espalda, por ser más extensa.',
          'Ninguna hasta la valoración hospitalaria.',
        ],
        correcta: 1,
        explicacion: 'Incluir la quemadura superficial infla la cifra y puede llevar a decisiones equivocadas.',
      },
      {
        pregunta: '¿Por qué la clasificación de la escena es una estimación?',
        opciones: [
          'Porque no hay iluminación suficiente.',
          'Porque la quemadura puede profundizar en las horas siguientes y el centro receptor la reevaluará.',
          'Porque la terminología no está establecida.',
          'Porque el paciente no colabora.',
        ],
        correcta: 1,
        explicacion: 'La profundidad no es fija desde el primer minuto.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La quemadura de espesor parcial ___ presenta ampollas rotas y llenado capilar lento o ausente.',
          opciones: ['superficial', 'profundo', 'total'],
          correcta: 1,
          explicacion: 'Es el escalón intermedio entre la que conserva llenado capilar y la que no tiene ninguno.',
        },
        {
          texto: 'La ausencia de dolor en una zona quemada indica que la lesión es de espesor ___.',
          opciones: ['parcial superficial', 'total', 'superficial'],
          correcta: 1,
          explicacion: 'Se han destruido las terminaciones sensitivas de esa zona.',
        },
        {
          texto: 'Un enfriamiento insuficiente y una mala perfusión favorecen que la quemadura ___ en las horas siguientes.',
          opciones: ['cicatrice', 'profundice', 'se infecte de inmediato'],
          correcta: 1,
          explicacion: 'Por eso la estimación inicial se documenta como tal y se reevalúa.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-que-regla-9s': {
    icono: 'cp-servier-mano',
    duracion: '13 min',
    resumen: 'La regla de los nueve divide la superficie corporal en zonas cuyo valor es un múltiplo de '
      + 'nueve, y permite estimar deprisa qué porcentaje del cuerpo está quemado. Es una estimación, no '
      + 'una medición: sirve para orientar la gravedad, la derivación y el cálculo inicial de líquidos. '
      + 'En el niño las proporciones cambian, porque la cabeza es proporcionalmente mucho mayor, y para '
      + 'superficies pequeñas o dispersas resulta más útil la regla de la palma.',
    objetivos: [
      'Aplicar la regla de los nueve en el adulto y reconocer su variación en el niño.',
      'Usar la regla de la palma para superficies pequeñas o irregulares.',
      'Interpretar el resultado como estimación orientadora y no como medición exacta.',
    ],
    secciones: [
      {
        titulo: 'La regla en el adulto',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Regla de los nueve, adulto',
            headers: ['Región', 'Porcentaje'],
            filas: [
              ['Cabeza y cuello', '9 %'],
              ['Cada miembro superior completo', '9 % (18 % los dos)'],
              ['Cara anterior del tronco', '18 %'],
              ['Cara posterior del tronco', '18 %'],
              ['Cada miembro inferior completo', '18 % (36 % los dos)'],
              ['Periné y genitales', '1 %'],
            ],
          },
          { tipo: 'p', texto: 'Sumadas, esas regiones dan el 100 % de la superficie corporal. Cuando una región está quemada solo en parte, se estima qué fracción de ella está afectada y se aplica esa proporción: media cara anterior del tronco cuenta como 9 %, y la mitad de un brazo, como 4,5 %.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Solo se suma lo que cuenta', texto: 'En el cálculo se incluyen las quemaduras de espesor parcial y total. Las superficiales —el enrojecimiento sin ampollas— no se suman, porque no producen la pérdida de líquido que la estimación pretende cuantificar.' },
        ],
      },
      {
        titulo: 'El niño y la regla de la palma',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'En el niño la cabeza pesa mucho más', texto: 'La regla del adulto no sirve en el paciente pediátrico. La cabeza del niño representa una proporción de superficie corporal mucho mayor —cerca del 18 % en el lactante—, y los miembros inferiores, una proporción menor —alrededor del 13,5 % cada uno—. Esas proporciones se van aproximando a las del adulto con el crecimiento. Los porcentajes exactos por edad los define la tabla que adopte el servicio; el diagrama de Lund y Browder es el instrumento más preciso y el que usan los centros de quemados.' },
          { tipo: 'p', texto: 'Para quemaduras pequeñas, dispersas o de bordes irregulares, la regla de los nueve es poco práctica. En esos casos se usa la **regla de la palma**: la palma de la mano del propio paciente, incluidos los dedos, equivale aproximadamente al 1 % de su superficie corporal. Se cuenta cuántas «palmas» ocupa la quemadura. Es especialmente útil en el niño, donde la mano del paciente escala automáticamente con su tamaño.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Es una estimación y así se comunica', texto: 'Ninguno de estos métodos mide con exactitud. Sobrestimar lleva a administrar líquido de más y a complicaciones; subestimar, a lo contrario. Por eso el porcentaje se comunica como estimación, se acompaña de la descripción de las zonas afectadas y se acepta que el centro receptor lo corrija con un instrumento más preciso.' },
          {
            tipo: 'lista',
            titulo: 'Errores frecuentes',
            items: [
              'Sumar las zonas de enrojecimiento superficial.',
              'Aplicar la regla del adulto a un niño pequeño.',
              'Calcular sobre el paciente vestido, sin haber expuesto toda la superficie.',
              'Olvidar la espalda, los glúteos y las zonas de pliegue.',
              'Redondear al alza «por seguridad», que no es una medida segura sino una fuente de error.',
            ],
          },
        ],
      },
      F([ABA_2024, PHTLS, ACS_BEST, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Regla de los nueve', definicion: 'Método de estimación rápida de la superficie corporal quemada mediante zonas cuyo valor es múltiplo de nueve.' },
      { termino: 'Regla de la palma', definicion: 'Estimación en que la palma de la mano del paciente, con los dedos, equivale aproximadamente al 1 % de su superficie corporal.' },
      { termino: 'Diagrama de Lund y Browder', definicion: 'Instrumento de estimación por edad, más preciso que la regla de los nueve, usado en centros de quemados.' },
      { termino: 'Superficie corporal quemada', definicion: 'Porcentaje del cuerpo con quemadura de espesor parcial o total, base de la estimación de gravedad y de líquidos.' },
    ],
    flashcards: [
      { frente: 'Porcentaje de cada miembro inferior en el adulto', reverso: '18 %.' },
      { frente: 'Porcentaje de la cabeza y el cuello en el adulto', reverso: '9 %.' },
      { frente: '¿Cuánto representa la cara anterior del tronco?', reverso: '18 %.' },
      { frente: '¿Qué equivale al 1 % en la regla de la palma?', reverso: 'La palma de la mano del propio paciente, incluidos los dedos.' },
      { frente: '¿Por qué no sirve la regla del adulto en el niño?', reverso: 'Porque su cabeza representa una proporción mucho mayor y sus miembros inferiores, menor.' },
      { frente: '¿Se suman las quemaduras superficiales?', reverso: 'No: solo las de espesor parcial y total.' },
    ],
    quiz: [
      {
        pregunta: 'Adulto con quemadura de espesor parcial en todo el miembro superior derecho y en toda la cara anterior del tronco. ¿Qué porcentaje estimas?',
        opciones: ['18 %', '27 %', '36 %', '9 %'],
        correcta: 1,
        explicacion: 'El miembro superior completo aporta 9 % y la cara anterior del tronco 18 %: 27 % en total.',
      },
      {
        pregunta: 'Lactante con quemadura en toda la cabeza. ¿Qué error cometerías aplicando la regla del adulto?',
        opciones: [
          'Ninguno: la proporción es la misma.',
          'Subestimarías la superficie: en el lactante la cabeza representa una proporción mucho mayor que el 9 % del adulto.',
          'Sobrestimarías la superficie.',
          'La regla no se aplica nunca a la cabeza.',
        ],
        correcta: 1,
        explicacion: 'Por eso en pediatría se usan tablas por edad o el diagrama de Lund y Browder.',
      },
      {
        pregunta: 'Quemaduras pequeñas y dispersas por salpicaduras en el antebrazo. ¿Qué método usas?',
        opciones: [
          'La regla de los nueve aplicada a todo el miembro.',
          'La regla de la palma, contando cuántas palmas del propio paciente ocupa la superficie afectada.',
          'Se estima al alza por seguridad.',
          'No se estima en el ámbito prehospitalario.',
        ],
        correcta: 1,
        explicacion: 'La regla de los nueve es poco práctica en superficies irregulares o dispersas.',
      },
      {
        pregunta: 'Un compañero propone redondear al alza el porcentaje «para ir sobrados de líquido». ¿Qué respondes?',
        opciones: [
          'Que es lo prudente.',
          'Que no: sobrestimar lleva a administrar líquido de más y a complicaciones; el porcentaje se comunica como estimación.',
          'Que redondee a la baja.',
          'Que el porcentaje no influye en el tratamiento.',
        ],
        correcta: 1,
        explicacion: 'Redondear al alza es una fuente de error, no una medida de seguridad.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el adulto, ambos miembros inferiores completos suman ___ % de la superficie corporal.',
          opciones: ['18', '27', '36'],
          correcta: 2,
          explicacion: 'Cada uno aporta 18 %.',
        },
        {
          texto: 'La palma de la mano del propio paciente, con los dedos, equivale aproximadamente al ___ % de su superficie corporal.',
          opciones: ['1', '5', '9'],
          correcta: 0,
          explicacion: 'Es especialmente útil en el niño, porque escala con su tamaño.',
        },
        {
          texto: 'El instrumento más preciso, usado en los centros de quemados, es el diagrama de ___.',
          opciones: ['Parkland', 'Lund y Browder', 'Le Fort'],
          correcta: 1,
          explicacion: 'Ajusta las proporciones por edad.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'Las cifras de la regla de los nueve se publican porque el plan las exige como instrumento de estimación, con fuente declarada; no son una dosis.',
        'Los porcentajes pediátricos exactos por edad se remiten a la tabla que adopte el servicio y al diagrama de Lund y Browder.',
      ],
    }),
  },

  'm5-que-parkland': {
    icono: 'cp-servier-bolsa-infusion',
    duracion: '16 min',
    resumen: 'El plan pide enseñar la fórmula de Parkland. Esta lección la presenta completa y '
      + 'después la contrasta con la recomendación vigente. La fórmula clásica calcula 4 mL de '
      + 'cristaloide por kilogramo y por porcentaje de superficie quemada en 24 horas; la American '
      + 'Burn Association recomienda desde 2024 iniciar en 2 mL/kg/%SCQ en el adulto y ajustar después '
      + 'según la respuesta del paciente. La idea central es que ninguna fórmula es una dosis fija: '
      + 'son un punto de partida que se titula.',
    objetivos: [
      'Aplicar el cálculo de la fórmula clásica y describir su distribución horaria.',
      'Contrastar la fórmula clásica con la recomendación de la American Burn Association de 2024.',
      'Justificar por qué el volumen se titula según la respuesta y no se administra como dosis fija.',
    ],
    secciones: [
      {
        titulo: 'La fórmula clásica, como antecedente',
        bloques: [
          { tipo: 'p', texto: 'La quemadura extensa hace que el plasma escape de los vasos hacia el tejido, y esa pérdida produce el shock del paciente quemado. Para reponerla se desarrollaron fórmulas que estiman el volumen a partir del peso del paciente y de la superficie quemada.' },
          { tipo: 'formula', texto: 'Volumen en 24 h = 4 mL × peso (kg) × % SCQ', nota: 'Fórmula de Parkland en su formulación clásica, que es la que el plan de estudios oficial pide enseñar. SCQ es la superficie corporal quemada de espesor parcial y total; no se suman las quemaduras superficiales.' },
          { tipo: 'p', texto: 'La distribución clásica reparte ese volumen así: la mitad en las primeras 8 horas contadas **desde el momento de la quemadura**, no desde la llegada del equipo, y la otra mitad en las 16 horas siguientes. Ese detalle importa en el ámbito prehospitalario: si han pasado dos horas hasta el contacto, el tiempo disponible para la primera mitad ya se ha reducido.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Ejemplo de cálculo', texto: 'Paciente de 70 kg con 30 % de superficie quemada de espesor parcial y total. Con la formulación clásica: 4 × 70 × 30 = 8 400 mL en 24 horas, de los cuales la mitad correspondería a las primeras 8 horas desde la quemadura. El ejercicio sirve para entender la relación entre peso, superficie y volumen; NO para decidir por cuenta propia qué se infunde en la ambulancia.' },
        ],
      },
      {
        titulo: 'Lo que recomienda la guía vigente',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Actualización: American Burn Association, 2024', texto: 'La guía de práctica clínica de la American Burn Association sobre reanimación del shock del quemado recomienda INICIAR la reposición en el adulto con quemadura extensa a razón de 2 mL/kg/%SCQ, y ajustar el ritmo a partir de ahí según la respuesta del paciente. El motivo del cambio es conocido: administrar de entrada el volumen calculado con 4 mL/kg/%SCQ se asoció con frecuencia a una administración excesiva de líquido y a sus complicaciones. La fórmula clásica se conserva en el temario como antecedente y como referencia de cálculo, no como la pauta vigente.' },
          {
            tipo: 'tabla',
            headers: ['', 'Formulación clásica', 'Recomendación ABA 2024'],
            filas: [
              ['Punto de partida en el adulto', '4 mL × kg × % SCQ en 24 h', 'Iniciar en 2 mL × kg × % SCQ'],
              ['Naturaleza del número', 'Volumen calculado a administrar', 'Punto de partida que se ajusta'],
              ['Cómo se ajusta', 'Reparto fijo por horas', 'Titulación según la respuesta del paciente'],
              ['Riesgo asociado', 'Administración excesiva de líquido', 'Requiere reevaluación continua'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Titular quiere decir esto', texto: 'La cifra calculada marca por dónde empezar. A partir de ahí, el ritmo sube o baja según cómo responde el paciente: el estado mental, la perfusión periférica, la frecuencia cardiaca, la presión arterial y, en el medio hospitalario, la diuresis horaria, que es el parámetro de referencia de la titulación. Ninguna fórmula sustituye a esa reevaluación.' },
        ],
      },
      {
        titulo: 'Qué corresponde al ámbito prehospitalario',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Estimar la superficie quemada de espesor parcial y total, y anotar el peso aproximado del paciente.',
              'Registrar la HORA DE LA QUEMADURA: es el punto de partida del cálculo y con frecuencia se pierde.',
              'Establecer accesos y administrar la solución que indique el protocolo, al ritmo que ese protocolo fije para el tiempo de traslado.',
              'Reevaluar de forma continua y documentar la respuesta.',
              'Comunicar en la entrega la estimación de superficie, el peso, la hora de la quemadura, la solución administrada, el volumen y el ritmo.',
              'Prevenir la hipotermia, que en el quemado empeora todo lo anterior.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que esta lección no autoriza', texto: 'Qué solución se usa, a qué ritmo se infunde y con qué material lo determina el protocolo del servicio y la dirección médica. Esta lección enseña la relación entre peso, superficie y volumen y la diferencia entre la formulación clásica y la recomendación vigente; no autoriza a fijar una pauta por cuenta propia, y en el paciente pediátrico la reposición sigue criterios distintos que corresponden al Módulo 6 y al protocolo.' },
        ],
      },
      F([ABA_2024, PHTLS, ACS_BEST, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Fórmula de Parkland', definicion: 'Cálculo clásico del volumen de cristaloide en 24 horas a razón de 4 mL por kilogramo y por porcentaje de superficie quemada.' },
      { termino: 'Titulación', definicion: 'Ajuste del ritmo de infusión según la respuesta del paciente, en lugar de administrar un volumen fijo calculado.' },
      { termino: 'Hora de la quemadura', definicion: 'Momento en que se produjo la lesión; punto de partida del cálculo, no la hora de llegada del equipo.' },
      { termino: 'Shock del quemado', definicion: 'Hipoperfusión por escape de plasma desde los vasos hacia el tejido en la quemadura extensa.' },
    ],
    flashcards: [
      { frente: 'Enunciado de la fórmula clásica', reverso: '4 mL × peso en kilogramos × porcentaje de superficie corporal quemada, en 24 horas.' },
      { frente: '¿Desde cuándo se cuentan las primeras 8 horas?', reverso: 'Desde el momento de la quemadura, no desde la llegada del equipo.' },
      { frente: '¿Qué recomienda la American Burn Association desde 2024?', reverso: 'Iniciar en el adulto a 2 mL/kg/%SCQ y ajustar después según la respuesta.' },
      { frente: '¿Por qué cambió la recomendación?', reverso: 'Porque partir del volumen calculado con 4 mL/kg/%SCQ se asoció con frecuencia a administración excesiva de líquido y a sus complicaciones.' },
      { frente: '¿Qué significa titular?', reverso: 'Ajustar el ritmo según la respuesta: estado mental, perfusión, frecuencia, presión y, en el hospital, la diuresis horaria.' },
      { frente: '¿Se suman las quemaduras superficiales al %SCQ?', reverso: 'No: solo las de espesor parcial y total.' },
    ],
    quiz: [
      {
        pregunta: 'Adulto de 80 kg con 25 % de superficie quemada de espesor parcial. ¿Qué volumen resulta con la formulación clásica en 24 horas?',
        opciones: ['4 000 mL', '8 000 mL', '2 000 mL', '16 000 mL'],
        correcta: 1,
        explicacion: '4 × 80 × 25 = 8 000 mL. El cálculo enseña la relación; la pauta real la fija el protocolo.',
      },
      {
        pregunta: '¿Qué recomienda la guía de la American Burn Association de 2024 respecto al punto de partida en el adulto?',
        opciones: [
          'Mantener 4 mL/kg/%SCQ sin ajustes.',
          'Iniciar en 2 mL/kg/%SCQ y titular después según la respuesta del paciente.',
          'No administrar líquidos en el ámbito prehospitalario.',
          'Calcular el volumen solo con el peso, sin la superficie.',
        ],
        correcta: 1,
        explicacion: 'El cambio busca evitar la administración excesiva de líquido asociada al punto de partida clásico.',
      },
      {
        pregunta: 'La quemadura ocurrió dos horas antes de tu llegada. ¿Por qué importa esa hora?',
        opciones: [
          'No importa: el cálculo empieza al llegar el equipo.',
          'Porque el reparto horario se cuenta desde el momento de la quemadura, y ya se han consumido dos de las primeras ocho horas.',
          'Porque modifica el porcentaje de superficie quemada.',
          'Porque determina la profundidad de la lesión.',
        ],
        correcta: 1,
        explicacion: 'Es un dato que se pierde con frecuencia y que condiciona toda la reposición.',
      },
      {
        pregunta: 'Un compañero afirma que el volumen calculado debe administrarse íntegro sin modificarlo. ¿Qué respondes?',
        opciones: [
          'Que tiene razón: la fórmula es una dosis fija.',
          'Que el número es un punto de partida y el ritmo se titula según la respuesta del paciente; ninguna fórmula sustituye la reevaluación.',
          'Que debe duplicarse por seguridad.',
          'Que el volumen no guarda relación con el peso.',
        ],
        correcta: 1,
        explicacion: 'Es la idea central de la lección y el fundamento del cambio de recomendación.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La formulación clásica reparte la mitad del volumen en las primeras ___ horas contadas desde la quemadura.',
          opciones: ['cuatro', 'ocho', 'doce'],
          correcta: 1,
          explicacion: 'La otra mitad corresponde a las dieciséis horas siguientes.',
        },
        {
          texto: 'La American Burn Association recomienda iniciar en el adulto a ___ mL por kilogramo y por porcentaje de superficie quemada.',
          opciones: ['2', '4', '6'],
          correcta: 0,
          explicacion: 'A partir de ahí se ajusta según la respuesta del paciente.',
        },
        {
          texto: 'En el hospital, el parámetro de referencia para titular la reposición es la ___ horaria.',
          opciones: ['temperatura', 'diuresis', 'saturación'],
          correcta: 1,
          explicacion: 'En la ambulancia se usan el estado mental, la perfusión, la frecuencia y la presión.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'CONTROL CLÍNICO APLICADO: la fórmula clásica de 4 mL/kg/%SCQ se enseña como ANTECEDENTE que pide el plan y se contrasta con la recomendación de la American Burn Association de 2024 de iniciar en 2 mL/kg/%SCQ y titular. No se presenta como dosis fija.',
        'La solución concreta, el ritmo de infusión y la pauta pediátrica se remiten al protocolo del servicio y al Módulo 6; la lección no los fija.',
      ],
    }),
  },

  'm5-que-tratamiento': {
    icono: 'cp-servier-bolsa-infusion',
    duracion: '16 min',
    resumen: 'El tratamiento prehospitalario del quemado se ordena en cuatro bloques: detener la '
      + 'lesión, asegurar la vía aérea y la ventilación, sostener la circulación con la reposición que '
      + 'indique el protocolo, y proteger al paciente del frío y del dolor. La lección desarrolla cada '
      + 'uno, explica por qué la hipotermia es el enemigo silencioso de esta unidad y sitúa la sonda '
      + 'vesical —que el plan menciona— en el ámbito que le corresponde.',
    objetivos: [
      'Ordenar el tratamiento prehospitalario del paciente quemado en sus cuatro bloques.',
      'Reconocer los signos de sospecha de lesión por inhalación y anticipar la vía aérea.',
      'Aplicar la prevención de la hipotermia y situar la sonda vesical en su ámbito.',
    ],
    secciones: [
      {
        titulo: 'Detener la lesión y valorar la vía aérea',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Los primeros minutos',
            items: [
              'Seguridad de la escena y del equipo antes de cualquier contacto.',
              'Detener el proceso: apagar, separar de la fuente, retirar la ropa caliente o empapada y las joyas, y cepillar en seco un producto químico en polvo antes de irrigar.',
              'Enfriar la quemadura con agua a temperatura ambiente durante el tiempo que indique el protocolo, y detener el enfriamiento después: enfriar de más produce hipotermia.',
              'No aplicar hielo ni agua helada directamente sobre la quemadura.',
              'Valorar la vía aérea antes de entretenerse con la piel.',
              'Oxígeno conforme al protocolo, teniendo en cuenta la posible exposición a gases en incendios en espacio cerrado.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Signos que hacen sospechar lesión por inhalación',
            items: [
              'Incendio en espacio cerrado o exposición prolongada al humo.',
              'Quemaduras en cara y cuello, cejas o vibrisas nasales chamuscadas.',
              'Hollín en la boca, en la nariz o en el esputo.',
              'Ronquera, cambio de voz, estridor o tos persistente.',
              'Dificultad para tragar o babeo.',
              'Alteración del estado mental sin traumatismo craneal que la explique.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La vía aérea del quemado se cierra progresivamente', texto: 'El edema tras una exposición al calor o al humo no aparece de golpe: crece durante los minutos y las horas siguientes. Un paciente que habla con normalidad al llegar el equipo puede tener una vía aérea muy comprometida más tarde. Por eso la sospecha se comunica temprano al centro receptor y la reevaluación es continua; la decisión de asegurar la vía aérea y quién puede hacerlo dependen de la competencia y del protocolo.' },
        ],
      },
      {
        titulo: 'Circulación, temperatura y dolor',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Circulación',
            items: [
              'Accesos vasculares conforme al alcance autorizado; si es posible, en piel no quemada, aunque una zona quemada no es una contraindicación absoluta si no hay alternativa y el protocolo lo contempla.',
              'Reposición con la solución y el ritmo que fije el protocolo, partiendo de la estimación de superficie y peso y titulando según la respuesta.',
              'Vigilar la perfusión distal en las quemaduras circunferenciales de un miembro: el edema bajo una escara rígida puede comprometer la circulación.',
              'Recordar que el shock inmediato tras una quemadura puede deberse a una hemorragia asociada, no a la quemadura: se busca antes de atribuirlo a la piel.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La hipotermia es el enemigo silencioso', texto: 'El paciente quemado pierde calor por la superficie lesionada, por el enfriamiento inicial y por la exposición durante la valoración. Un quemado frío coagula peor, tolera peor la reposición y evoluciona peor. Se enfría la quemadura el tiempo indicado, se seca, se cubre con material limpio y seco, se abriga por encima y se calienta el habitáculo. Cubrir no es un detalle estético: es tratamiento.' },
          {
            tipo: 'lista',
            titulo: 'Dolor y cobertura',
            items: [
              'La analgesia se administra conforme al alcance autorizado y al protocolo; el dolor del quemado suele ser intenso y su control forma parte del tratamiento.',
              'Cubrir con apósitos limpios y secos, sin apretar. No se aplican cremas, pomadas, aceites, pasta dentífrica ni remedios caseros.',
              'No se rompen las ampollas.',
              'No se retira la ropa adherida a la quemadura: se recorta alrededor.',
              'Separar los dedos quemados con material limpio si el protocolo lo contempla, para que no queden en contacto.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre la sonda vesical', texto: 'El plan menciona la sonda Foley dentro del tratamiento del quemado. Su función es medir la diuresis horaria, que es el parámetro de referencia para titular la reposición en el paciente con quemadura extensa. Es una medida del ámbito hospitalario y de traslados prolongados, no una maniobra rutinaria de la atención inicial, y su colocación depende del alcance autorizado y del protocolo. Además, ante signos de lesión uretral no se sonda, como se estudia en el trauma genitourinario.' },
        ],
      },
      {
        titulo: 'Derivación',
        bloques: [
          { tipo: 'p', texto: 'Determinadas quemaduras se benefician de un centro especializado: las extensas, las de espesor total, las que afectan a cara, manos, pies, genitales, periné o articulaciones, las circunferenciales, las eléctricas, las químicas, las que se acompañan de lesión por inhalación o de trauma asociado, y las de pacientes en los extremos de la edad o con enfermedades que empeoren la tolerancia. Los criterios exactos y el centro concreto los fija el protocolo de derivación del servicio.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que el hospital agradecerá saber', texto: 'La hora de la quemadura, el mecanismo, si el espacio era cerrado, la estimación de superficie y profundidad, el peso aproximado, qué se administró y desde cuándo, y la evolución de la vía aérea. Es información que solo tiene el primer equipo.' },
        ],
      },
      F([ABA_2024, AHA_PA_2024, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Lesión por inhalación', definicion: 'Afectación de la vía aérea y del pulmón por humo, gases o calor, con edema que progresa en minutos y horas.' },
      { termino: 'Escara', definicion: 'Tejido rígido resultante de una quemadura profunda; en las circunferenciales puede comprometer la circulación o la ventilación.' },
      { termino: 'Diuresis horaria', definicion: 'Volumen de orina por hora; parámetro de referencia hospitalario para titular la reposición del quemado.' },
      { termino: 'Criterios de derivación', definicion: 'Condiciones que indican traslado a centro especializado en quemados; los concretos los fija el protocolo.' },
    ],
    flashcards: [
      { frente: 'Los cuatro bloques del tratamiento prehospitalario', reverso: 'Detener la lesión, vía aérea y ventilación, circulación y reposición, y protección frente al frío y el dolor.' },
      { frente: '¿Se aplica hielo sobre la quemadura?', reverso: 'No: ni hielo ni agua helada directamente.' },
      { frente: '¿Por qué se detiene el enfriamiento tras el tiempo indicado?', reverso: 'Porque enfriar de más produce hipotermia, que empeora la evolución.' },
      { frente: 'Cuatro signos de sospecha de inhalación', reverso: 'Espacio cerrado, quemadura facial con vibrisas chamuscadas, hollín en boca o esputo, y ronquera o estridor.' },
      { frente: '¿Se rompen las ampollas?', reverso: 'No.' },
      { frente: '¿Para qué sirve la sonda vesical en el quemado?', reverso: 'Para medir la diuresis horaria y titular la reposición; es medida hospitalaria o de traslado prolongado, según alcance y protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente rescatado de un incendio en un sótano, con quemaduras en la cara, vibrisas chamuscadas y voz ronca. ¿Qué anticipas?',
        opciones: [
          'Que la ronquera se resolverá sola.',
          'Lesión por inhalación con edema que progresa: se comunica temprano al centro receptor y se reevalúa de forma continua.',
          'Que la prioridad es cubrir las quemaduras faciales.',
          'Que no hay riesgo si el paciente habla.',
        ],
        correcta: 1,
        explicacion: 'El edema crece en minutos y horas: un paciente que habla ahora puede no hacerlo después.',
      },
      {
        pregunta: 'Has enfriado la quemadura el tiempo que indica tu protocolo. ¿Qué haces a continuación?',
        opciones: [
          'Seguir enfriando durante todo el traslado.',
          'Detener el enfriamiento, secar, cubrir con material limpio y seco, abrigar y calentar el habitáculo.',
          'Aplicar hielo para consolidar el efecto.',
          'Aplicar una crema sobre la quemadura.',
        ],
        correcta: 1,
        explicacion: 'Enfriar de más produce hipotermia, que empeora la coagulación y la evolución.',
      },
      {
        pregunta: 'Paciente con quemadura del 20 % que llega hipotenso a los pocos minutos del accidente. ¿Qué consideras?',
        opciones: [
          'Que es el shock del quemado y no hay que buscar más.',
          'Que el shock inmediato puede deberse a una hemorragia asociada: se busca antes de atribuirlo a la quemadura.',
          'Que hay que duplicar el volumen calculado.',
          'Que es un shock neurogénico.',
        ],
        correcta: 1,
        explicacion: 'El shock del quemado se instaura de forma progresiva; una hipotensión inmediata obliga a buscar otra causa.',
      },
      {
        pregunta: 'Un familiar ha aplicado pasta dentífrica sobre la quemadura. ¿Qué haces?',
        opciones: [
          'Lo dejas: puede ayudar a calmar el dolor.',
          'Retiras con cuidado lo que se desprenda con la irrigación, no frotas, cubres con material limpio y seco y lo comunicas en la entrega.',
          'Añades una crema encima.',
          'Frotas enérgicamente hasta limpiar la zona.',
        ],
        correcta: 1,
        explicacion: 'No se aplican cremas ni remedios caseros, y frotar añade daño a la zona lesionada.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la atención inicial de un paciente quemado',
        pasos: [
          'Asegurar la escena y la protección del equipo',
          'Detener el proceso: apagar, separar de la fuente y retirar ropa caliente o empapada y joyas',
          'Enfriar la quemadura el tiempo que indique el protocolo',
          'Valorar y anticipar la vía aérea y la ventilación',
          'Establecer accesos y reponer según protocolo, titulando la respuesta',
          'Secar, cubrir con material limpio y seco y prevenir activamente la hipotermia',
          'Analgesia según alcance y traslado con derivación y prealerta',
        ],
      },
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'La sonda vesical se sitúa expresamente como medida hospitalaria o de traslado prolongado, dependiente del alcance y del protocolo, y se recuerda su contraindicación ante signos de lesión uretral.',
        'No se publica ninguna dosis de analgésico ni tiempo exacto de enfriamiento: dependen del protocolo del servicio.',
      ],
    }),
  },

  'm5-que-curacion': {
    icono: 'cp-cc0-guantes',
    duracion: '13 min',
    resumen: 'El plan pide una lección sobre la curación de una quemadura limitada a una sola '
      + 'extremidad, que es el escenario más frecuente y el que más se maneja mal. La conducta '
      + 'prehospitalaria es deliberadamente sencilla: enfriar lo justo, limpiar con suavidad, no '
      + 'aplicar nada que no esté indicado, cubrir sin apretar y comprobar la circulación. Todo lo que '
      + 'se añada de más complica la valoración posterior sin beneficio.',
    objetivos: [
      'Ejecutar la cobertura de una quemadura limitada a una extremidad.',
      'Enumerar lo que no debe aplicarse sobre una quemadura y por qué.',
      'Reconocer los criterios de derivación y las señales de alarma en el seguimiento.',
    ],
    secciones: [
      {
        titulo: 'La secuencia',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Curación de una quemadura de extremidad',
            items: [
              'Retirar anillos, pulseras y reloj de esa extremidad antes de que el edema lo impida.',
              'Enfriar con agua a temperatura ambiente el tiempo que indique el protocolo, y después detener el enfriamiento.',
              'Limpiar con suavidad con solución salina o agua limpia, sin frotar y sin arrastrar tejido adherido.',
              'Secar la piel sana de alrededor.',
              'No romper las ampollas intactas; si están rotas, retirar solo el tejido que se desprenda sin resistencia, si el protocolo lo contempla.',
              'Cubrir con apósito limpio y seco, o con el material estéril no adherente que use el servicio, sin apretar.',
              'Separar los dedos quemados con material limpio para que no queden en contacto entre sí.',
              'Comprobar pulso, sensibilidad y movilidad distales después de cubrir, y anotarlo.',
              'Elevar la extremidad si no hay contraindicación, para limitar el edema.',
              'Abrigar al paciente por encima del apósito y mantener el habitáculo caliente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El apósito no se aprieta', texto: 'El edema de una quemadura aumenta durante las horas siguientes. Un vendaje que estaba cómodo al colocarlo puede comprimir la circulación más tarde, sobre todo si la quemadura rodea el segmento. Se cubre sin tensión, se comprueba la circulación distal después y se reevalúa durante el traslado.' },
        ],
      },
      {
        titulo: 'Lo que no se pone y por qué',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Prohibiciones',
            items: [
              'Cremas, pomadas, aceites, mantequilla, pasta dentífrica y remedios caseros: retienen calor, favorecen la infección y dificultan la valoración de la profundidad en el hospital.',
              'Hielo o agua helada directamente sobre la quemadura: pueden añadir lesión por frío y agravan la hipotermia.',
              'Algodón u otros materiales que dejen fibras adheridas a la superficie.',
              'Antisépticos coloreados que enmascaren el aspecto de la lesión.',
              'Romper ampollas o retirar tejido adherido a la fuerza.',
              'Vendajes circulares apretados o esparadrapo sobre la piel quemada.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La regla que resume el tema', texto: 'Sobre una quemadura, cuanto menos se ponga, mejor. El objetivo del ámbito prehospitalario no es curarla —eso corresponde a la valoración especializada— sino protegerla, evitar que empeore y entregarla en condiciones que permitan valorarla bien.' },
        ],
      },
      {
        titulo: 'Derivación y señales de alarma',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuándo una quemadura de extremidad requiere valoración especializada',
            items: [
              'Cuando es circunferencial o afecta a una articulación.',
              'Cuando afecta a la mano, al pie o a una zona de pliegue.',
              'Cuando es de espesor total, o su profundidad no puede determinarse.',
              'Cuando el agente fue eléctrico o químico.',
              'Cuando el paciente está en los extremos de la edad o tiene enfermedades que empeoren la evolución.',
              'Cuando el mecanismo no encaja con la lesión, en cuyo caso además se documenta con precisión lo observado.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que se explica al paciente que no se traslada', texto: 'Si la quemadura es pequeña y el protocolo del servicio contempla no trasladar, el paciente debe irse sabiendo qué vigilar: aumento del dolor, enrojecimiento que se extiende, hinchazón creciente, secreción, fiebre, y pérdida de sensibilidad o de color en los dedos. Esa información se entrega también por escrito cuando el procedimiento del servicio lo prevea, y la decisión de no trasladar se documenta.' },
        ],
      },
      F([AHA_PA_2024, ABA_2024, ACS_BEST, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Apósito no adherente', definicion: 'Material de cobertura que no se pega a la superficie quemada y permite retirarlo sin arrastrar tejido.' },
      { termino: 'Edema progresivo', definicion: 'Aumento de volumen que continúa en las horas siguientes a la quemadura y puede comprimir bajo un vendaje ajustado.' },
      { termino: 'Quemadura circunferencial de extremidad', definicion: 'La que rodea por completo el segmento; puede comprometer la circulación distal.' },
    ],
    flashcards: [
      { frente: '¿Qué se retira antes de que aparezca el edema?', reverso: 'Anillos, pulseras y reloj de esa extremidad.' },
      { frente: '¿Se rompen las ampollas intactas?', reverso: 'No.' },
      { frente: '¿Por qué no se aplican cremas ni remedios caseros?', reverso: 'Retienen calor, favorecen la infección y dificultan la valoración de la profundidad en el hospital.' },
      { frente: '¿Por qué se separan los dedos quemados?', reverso: 'Para que no queden en contacto entre sí.' },
      { frente: '¿Qué se comprueba después de cubrir?', reverso: 'Pulso, sensibilidad y movilidad distales, anotándolo.' },
      { frente: 'Regla que resume la curación prehospitalaria', reverso: 'Cuanto menos se ponga sobre la quemadura, mejor: proteger, no curar.' },
    ],
    quiz: [
      {
        pregunta: 'Quemadura de espesor parcial en el antebrazo con ampollas intactas. ¿Cómo la cubres?',
        opciones: [
          'Rompiendo las ampollas y aplicando pomada antibiótica.',
          'Sin romper las ampollas, con apósito limpio y seco sin apretar, comprobando la circulación distal después.',
          'Con un vendaje circular firme para reducir el edema.',
          'Con algodón y esparadrapo sobre la piel quemada.',
        ],
        correcta: 1,
        explicacion: 'Las otras tres opciones añaden daño o dificultan la valoración posterior.',
      },
      {
        pregunta: '¿Por qué no se aprieta el apósito de una quemadura?',
        opciones: [
          'Por comodidad del paciente exclusivamente.',
          'Porque el edema aumenta durante las horas siguientes y un vendaje ajustado puede comprimir la circulación.',
          'Porque impide administrar analgesia.',
          'Porque favorece la profundización de la quemadura.',
        ],
        correcta: 1,
        explicacion: 'Por eso se comprueba la circulación distal tras cubrir y se reevalúa durante el traslado.',
      },
      {
        pregunta: 'Quemadura pequeña en la mano que rodea completamente un dedo. ¿Requiere valoración especializada?',
        opciones: [
          'No: es de pequeño tamaño.',
          'Sí: es circunferencial y afecta a la mano, dos criterios de derivación.',
          'Solo si duele mucho.',
          'Solo si es de origen químico.',
        ],
        correcta: 1,
        explicacion: 'La localización y el carácter circunferencial pesan más que el tamaño.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'El protocolo de tu servicio contempla no trasladar una quemadura pequeña y superficial de antebrazo. ¿Qué debe llevarse el paciente además del apósito?',
          opciones: [
            'Nada más: la quemadura está cubierta.',
            'Información concreta de qué vigilar —aumento del dolor, enrojecimiento que se extiende, hinchazón creciente, secreción, fiebre y pérdida de sensibilidad o color en los dedos— y la constancia documentada de la decisión de no trasladar.',
            'Una crema para aplicar en casa.',
            'La indicación de romper las ampollas al día siguiente.',
          ],
          correcta: 1,
          explicacion: 'La lección enumera exactamente esas señales de alarma y exige documentar la decisión de no trasladar.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['La decisión de no trasladar y el material de curación concreto dependen del protocolo del servicio; la lección no los fija.'],
    }),
  },
}
