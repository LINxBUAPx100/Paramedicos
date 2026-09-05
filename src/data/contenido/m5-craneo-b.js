// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE CRÁNEO Y COLUMNA» (lote A)
// ------------------------------------------------------------
//  Los cinco temas de cabeza que faltaban: definición de TCE, doctrina de
//  Monro–Kellie, fractura de cráneo, escalpe y lesiones focales. Los ocho temas
//  ya redactados de la unidad NO se tocan, y los que siguen vacíos —Glasgow,
//  PIC por niveles, manitol, lesiones intracraneales, fracturas vertebrales,
//  medular anterior y cauda equina— corresponden al lote B.
//
//  Pauta editorial: `docs/archivo/GUIA-REDACCION-M5-LOTE-A.md`.
//
//  DOS ERRATAS DEL PLAN QUE SE MANEJAN AQUÍ:
//  el plan escribe «Doctrina de Kellie Monroe»; la grafía correcta y la que se
//  muestra al alumno es **doctrina de Monro–Kellie**. El título documental se
//  conserva sin alterar en el campo de trazabilidad.
//
//  LÍMITE CLÍNICO DE LA UNIDAD: ningún hallazgo aislado ni ningún mecanismo
//  diagnostican una lesión intracraneal concreta. El intervalo lúcido, la
//  equimosis periorbitaria o la anisocoria orientan y obligan a vigilar; no
//  identifican el tipo de hematoma, que solo la imagen distingue.
//
//  Fuentes asignadas por el registro para `m5-trauma-craneo-columna`: PHTLS
//  9.ª ed. (cap. 8, pp. 257–292), Brain Trauma Foundation prehospitalaria 3.ª
//  ed., ACS Best Practices TBI 2024 y ACS Best Practices. La copia de PHTLS 10
//  declara traducción automática: no se consulta ni se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS_CABEZA = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), '
    + 'cap. 8, «Trauma en cabeza», pp. 257–292.',
  nota: 'Base curricular histórica declarada por el plan de estudios. El intervalo de páginas '
    + 'corresponde al capítulo verificado en la copia licenciada; la página exacta de cada afirmación '
    + 'concreta queda PENDIENTE de confirmación docente. No se cita la 10.ª edición: la copia '
    + 'disponible declara traducción automática y no es citable.',
}
const BTF_PREHOSPITAL = {
  nombre: 'Brain Trauma Foundation. Guidelines for the Prehospital Management of Traumatic Brain '
    + 'Injury, 3.ª edición.',
  url: 'https://braintrauma.org/coma/guidelines/pre-hospital',
  nota: 'Guía primaria prehospitalaria del traumatismo craneoencefálico; rectora de la prevención de '
    + 'la lesión cerebral secundaria. PENDIENTE: recomendación y apartado exactos; los umbrales '
    + 'operativos se aplican conforme al protocolo del servicio.',
}
const ACS_TCE_2024 = {
  nombre: 'American College of Surgeons. Best Practices Guidelines: The Management of Traumatic Brain '
    + 'Injury, 2024.',
  url: 'https://www.facs.org/media/vgfgjpfk/best-practices-guidelines-traumatic-brain-injury.pdf',
  nota: 'Guía de buenas prácticas actual del ACS sobre manejo del TCE. PENDIENTE: apartado y página '
    + 'exactos del documento.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Colección de guías de buenas prácticas del ACS usada como contraste actual. PENDIENTE: guía y '
    + 'apartado exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE y valoración neurológica inicial. PENDIENTE: módulo y página '
    + 'exactos.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const AMBITO = 'ÁMBITO PREHOSPITALARIO: ningún hallazgo aislado diagnostica una lesión intracraneal '
  + 'concreta. Se sospecha, se previene la lesión secundaria, se reevalúa de forma documentada y se '
  + 'traslada; la imagen hospitalaria es la que distingue el tipo de lesión.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: oxígeno, ventilación, vía aérea avanzada, objetivos de '
  + 'presión y de oxigenación, analgesia, control de convulsiones, medicación y destino dependen del '
  + 'alcance autorizado, del equipamiento de la unidad y del protocolo del servicio. La lección no '
  + 'publica umbrales numéricos.'

const ficha = ({ estado = 'borrador', version, extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en el lote A del Módulo 5; el tema estaba vacío.',
    AMBITO,
    PROTOCOLO,
    ...extra,
  ],
  fuentes,
})

const VERSION = 'PHTLS 9.ª ed. (2020), cap. 8; BTF Prehospital TBI 3.ª ed.; ACS Best Practices TBI 2024'
const FUENTES_FICHA = [
  'NAEMT. PHTLS, 9.ª ed., 2020, cap. 8, pp. 257–292.',
  'Brain Trauma Foundation. Guidelines for the Prehospital Management of TBI, 3.ª ed.',
  'ACS. Best Practices Guidelines: The Management of Traumatic Brain Injury, 2024.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
]

export default {
  // ============================================================
  //  1. Definición de TCE
  // ============================================================
  'm5-tcc-definicion': {
    icono: 'cp-smart-craneo',
    duracion: '14 min',
    resumen: 'El traumatismo craneoencefálico es la alteración de la función cerebral producida por '
      + 'una fuerza externa. La distinción que organiza todo el tema es la de lesión primaria, '
      + 'ocurrida en el instante del impacto e irreversible, frente a lesión secundaria, que se añade '
      + 'después y sí puede evitarse. De ahí sale la aportación real del ámbito prehospitalario. La '
      + 'lección introduce además la valoración neurológica seriada y advierte de que un examen '
      + 'inicial normal no excluye lesión.',
    objetivos: [
      'Definir el TCE y diferenciar lesión primaria de lesión secundaria.',
      'Enumerar los agresores secundarios que el ámbito prehospitalario puede evitar.',
      'Estructurar una valoración neurológica seriada y documentada.',
    ],
    secciones: [
      {
        titulo: 'Definición y clasificación básica',
        bloques: [
          { tipo: 'p', texto: 'Se llama traumatismo craneoencefálico a la alteración de la función cerebral —o a la evidencia de una alteración estructural— producida por una fuerza externa: un golpe, una penetración o una aceleración y desaceleración bruscas. La alteración puede ser transitoria o permanente, y no exige pérdida de conciencia.' },
          {
            tipo: 'lista',
            titulo: 'Formas de clasificarlo',
            items: [
              'Por mecanismo: cerrado o penetrante.',
              'Por distribución del daño: difuso o focal, cada uno con su tema propio en esta unidad.',
              'Por gravedad clínica: se estima con escalas de nivel de conciencia, que se desarrollan en el tema específico de la escala de coma de Glasgow.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un examen inicial normal no excluye lesión', texto: 'Un paciente puede estar consciente, orientado y sin déficit y tener una lesión que se manifieste más tarde, sobre todo si hay una colección que crece. Por eso la valoración inicial no cierra el caso: lo que informa es la evolución entre valoraciones sucesivas.' },
        ],
      },
      {
        titulo: 'Primaria y secundaria',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Lesión primaria', 'Lesión secundaria'],
            filas: [
              ['Cuándo ocurre', 'En el instante del impacto', 'En los minutos, horas y días siguientes'],
              ['Qué la produce', 'La transferencia de energía sobre el encéfalo', 'Hipoxia, hipotensión, edema, hipoglucemia, hipertermia, convulsiones, aumento de la presión intracraneal'],
              ['¿Se puede modificar?', 'No: ya ocurrió antes de tu llegada', 'Sí: es donde actúa el ámbito prehospitalario'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Aquí está la aportación real', texto: 'No se puede deshacer el impacto, pero sí evitar que el cerebro reciba un segundo golpe fisiológico. La hipoxia y la hipotensión son los dos agresores secundarios mejor documentados, y evitarlos, mantener la ventilación adecuada, medir la glucemia y prevenir la hipotermia forman parte del tratamiento del TCE, no de los cuidados accesorios. Los objetivos numéricos concretos los fija el protocolo del servicio sobre la guía prehospitalaria vigente.' },
        ],
      },
      {
        titulo: 'La valoración neurológica seriada',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Qué se valora y en qué orden',
            items: [
              'Nivel de conciencia: primero de forma rápida y después con la escala que use el servicio.',
              'Pupilas: tamaño, simetría y reactividad a la luz.',
              'Función motora: fuerza y simetría en las cuatro extremidades.',
              'Constantes: la oxigenación y la presión arterial forman parte de la valoración neurológica, porque determinan la perfusión del encéfalo.',
              'Glucemia, si está dentro del alcance y del equipo disponible.',
              'Repetición con la hora anotada, para poder comparar.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El dato que más informa es el cambio', texto: 'Un valor aislado dice poco; una tendencia descendente dice mucho. Documentar cada valoración con su hora convierte una serie de observaciones sueltas en información utilizable por quien recibe al paciente.' },
          { tipo: 'p', texto: 'La escala de coma de Glasgow, los niveles de aumento de la presión intracraneal y el uso de medicación específica tienen temas propios en esta unidad y no se desarrollan aquí para no duplicar contenido.' },
        ],
      },
      F([PHTLS_CABEZA, BTF_PREHOSPITAL, ACS_TCE_2024, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Traumatismo craneoencefálico', definicion: 'Alteración de la función cerebral, o evidencia de alteración estructural, producida por una fuerza externa.' },
      { termino: 'Lesión primaria', definicion: 'Daño producido en el instante del impacto; irreversible y no modificable por el tratamiento.' },
      { termino: 'Lesión secundaria', definicion: 'Daño añadido después del impacto por hipoxia, hipotensión, edema, hipoglucemia u otros agresores; es evitable.' },
      { termino: 'Valoración neurológica seriada', definicion: 'Repetición documentada de conciencia, pupilas, motor y constantes, cuyo valor está en la comparación entre observaciones.' },
    ],
    flashcards: [
      { frente: 'Definición de TCE', reverso: 'Alteración de la función cerebral, o evidencia de alteración estructural, producida por una fuerza externa.' },
      { frente: '¿Exige pérdida de conciencia?', reverso: 'No: puede cursar sin ella.' },
      { frente: '¿Cuál de las dos lesiones puede modificar el ámbito prehospitalario?', reverso: 'La secundaria; la primaria ya ocurrió antes de la llegada del equipo.' },
      { frente: 'Los dos agresores secundarios mejor documentados', reverso: 'La hipoxia y la hipotensión.' },
      { frente: '¿Un examen neurológico inicial normal excluye lesión?', reverso: 'No: puede manifestarse más tarde, sobre todo si hay una colección que crece.' },
      { frente: '¿Por qué la presión arterial es parte de la valoración neurológica?', reverso: 'Porque determina la perfusión del encéfalo.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con TCE, consciente y orientado, con exploración neurológica normal al llegar. ¿Qué corresponde?',
        opciones: [
          'Cerrar la valoración: la exploración es normal.',
          'Repetir la valoración de forma documentada durante el traslado, porque un examen inicial normal no excluye lesión.',
          'Declarar ausencia de lesión intracraneal.',
          'Esperar en la escena a que aparezca focalidad.',
        ],
        correcta: 1,
        explicacion: 'La lesión puede manifestarse más tarde; la evolución entre valoraciones es lo que informa.',
      },
      {
        pregunta: '¿Qué es la lesión secundaria en el TCE?',
        opciones: [
          'La producida por un segundo golpe en la cabeza.',
          'El daño que se añade después del impacto por hipoxia, hipotensión, edema u otros agresores, y que puede evitarse.',
          'La fractura de cráneo asociada.',
          'La que aparece solo en trauma penetrante.',
        ],
        correcta: 1,
        explicacion: 'Es la que el ámbito prehospitalario puede prevenir, y por eso concentra el esfuerzo terapéutico.',
      },
      {
        pregunta: 'Paciente con TCE grave e hipotensión por hemorragia abdominal. ¿Qué prioridad tiene la hipotensión?',
        opciones: [
          'Secundaria: lo importante es la cabeza.',
          'Máxima, porque la hipotensión es uno de los agresores secundarios mejor documentados y sin perfusión no hay cerebro que proteger.',
          'Ninguna si el paciente está consciente.',
          'Se corrige solo tras la valoración neurológica completa.',
        ],
        correcta: 1,
        explicacion: 'Corregir la hipotensión es tratar la cabeza, no una tarea que compita con ella.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El daño producido en el instante del impacto se llama lesión ___ y no puede deshacerse.',
          opciones: ['secundaria', 'primaria', 'focal'],
          correcta: 1,
          explicacion: 'La secundaria es la que se añade después y sí puede evitarse.',
        },
        {
          texto: 'Hipoxia, hipotensión, hipoglucemia y convulsiones son agresores ___ del encéfalo lesionado.',
          opciones: ['primarios', 'secundarios', 'irrelevantes'],
          correcta: 1,
          explicacion: 'Prevenirlos es la parte del tratamiento que corresponde al ámbito prehospitalario.',
        },
        {
          texto: 'Para que una serie de valoraciones neurológicas sea utilizable por quien recibe al paciente, cada una debe registrarse con ___.',
          opciones: ['la firma del prestador', 'su hora', 'una conclusión diagnóstica'],
          correcta: 1,
          explicacion: 'Sin la hora no se puede establecer la tendencia, que es el dato de mayor valor.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La escala de Glasgow, los niveles de aumento de la PIC y la medicación específica se remiten a sus temas propios de la unidad, todavía vacíos y previstos para el lote B.'],
    }),
  },

  // ============================================================
  //  2. Doctrina de Monro–Kellie
  // ============================================================
  'm5-tcc-kellie-monroe': {
    icono: 'cp-smart-craneo',
    duracion: '13 min',
    resumen: 'La doctrina de Monro–Kellie explica por qué el cráneo tolera tan mal cualquier cosa que '
      + 'ocupe espacio: es una caja rígida que contiene encéfalo, sangre y líquido cefalorraquídeo, y '
      + 'la suma de los tres es prácticamente constante. Si uno aumenta, otro debe disminuir. Esa '
      + 'compensación funciona un tiempo y después se agota, momento en el que la presión intracraneal '
      + 'sube con rapidez. La lección explica también, de forma conceptual, qué es la perfusión '
      + 'cerebral.',
    objetivos: [
      'Enunciar la doctrina de Monro–Kellie y sus tres componentes.',
      'Explicar la fase de compensación y su agotamiento.',
      'Relacionar de forma conceptual presión intracraneal, presión arterial y perfusión cerebral.',
    ],
    secciones: [
      {
        titulo: 'Nota editorial sobre el nombre',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Monro–Kellie, no «Kellie Monroe»', texto: 'El plan de estudios oficial escribe «Doctrina de Kellie Monroe». La denominación correcta y la que el alumno encontrará en cualquier manual es **doctrina de Monro–Kellie**, por los dos autores que la formularon. Se muestra la forma correcta y se conserva el título documental del plan en el campo de trazabilidad, sin alterarlo.' },
        ],
      },
      {
        titulo: 'La caja y sus tres contenidos',
        bloques: [
          { tipo: 'p', texto: 'En el adulto, el cráneo es una estructura rígida de volumen fijo. Dentro caben tres cosas: el encéfalo, la sangre que circula por él y el líquido cefalorraquídeo. La doctrina de Monro–Kellie establece que la suma de esos tres volúmenes es prácticamente constante, de modo que si uno aumenta, otro tiene que disminuir para que la presión no se dispare.' },
          {
            tipo: 'tabla',
            headers: ['Componente', 'Qué es', 'Qué ocurre cuando algo ocupa espacio'],
            filas: [
              ['Encéfalo', 'El propio tejido nervioso', 'Puede aumentar de volumen por edema, agravando el problema'],
              ['Sangre', 'Volumen sanguíneo intracraneal, sobre todo venoso', 'Es de los primeros en desplazarse fuera del cráneo'],
              ['Líquido cefalorraquídeo', 'Líquido que rodea y amortigua el sistema nervioso central', 'Se desplaza hacia el espacio raquídeo como mecanismo de compensación'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se enseñan proporciones', texto: 'Los porcentajes que cada componente ocupa dentro del cráneo varían según la fuente y no aportan nada a la conducta prehospitalaria. Lo que hay que entender es la relación —volumen fijo, compensación limitada—, no una cifra.' },
        ],
      },
      {
        titulo: 'La compensación y su agotamiento',
        bloques: [
          { tipo: 'p', texto: 'Cuando aparece una colección de sangre o un edema, el organismo desplaza primero líquido cefalorraquídeo hacia el espacio raquídeo y reduce el volumen de sangre venosa intracraneal. Durante esa fase, la presión intracraneal sube poco y el paciente puede mantener un estado neurológico aceptable. Es la fase que explica por qué alguien con una lesión que crece puede parecer estable un tiempo.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Después, la curva se dispara', texto: 'Agotada la compensación, un aumento pequeño de volumen produce un aumento grande de presión. El deterioro deja de ser gradual y se vuelve rápido. Ese comportamiento explica por qué se vigila la tendencia neurológica de forma continua y por qué un cambio pequeño en poco tiempo tiene tanto valor.' },
          { tipo: 'p', texto: 'La perfusión cerebral depende de la relación entre la presión con que la sangre llega al encéfalo y la presión que hay dentro del cráneo: si la presión intracraneal sube o la presión arterial cae, la sangre que perfunde el tejido disminuye. Esta lección lo plantea de forma conceptual y no publica cifras: los objetivos numéricos y su manejo pertenecen al protocolo del servicio y a los temas específicos de aumento de la presión intracraneal y de tratamiento prehospitalario del TCE.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Consecuencia práctica inmediata', texto: 'Todo lo que dificulte el retorno venoso del cráneo empeora esa relación: un collarín demasiado apretado, la cabeza girada o una posición inadecuada. Son detalles mecánicos, gratuitos de corregir, que actúan directamente sobre la doctrina que explica esta lección.' },
        ],
      },
      F([PHTLS_CABEZA, BTF_PREHOSPITAL, ACS_TCE_2024]),
    ],
    conceptosClave: [
      { termino: 'Doctrina de Monro–Kellie', definicion: 'Principio según el cual el cráneo rígido contiene encéfalo, sangre y líquido cefalorraquídeo en un volumen prácticamente constante: si uno aumenta, otro debe disminuir.' },
      { termino: 'Presión intracraneal', definicion: 'Presión existente dentro de la cavidad craneal; se eleva cuando se agota la capacidad de compensación.' },
      { termino: 'Fase de compensación', definicion: 'Periodo en que el desplazamiento de líquido cefalorraquídeo y de sangre venosa mantiene la presión intracraneal casi estable pese al aumento de volumen.' },
      { termino: 'Perfusión cerebral', definicion: 'Flujo de sangre que llega efectivamente al tejido encefálico; depende de la relación entre la presión arterial y la presión intracraneal.' },
    ],
    flashcards: [
      { frente: 'Los tres componentes del contenido craneal', reverso: 'Encéfalo, sangre y líquido cefalorraquídeo.' },
      { frente: '¿Qué establece la doctrina de Monro–Kellie?', reverso: 'Que su suma es prácticamente constante en una caja rígida: si uno aumenta, otro debe disminuir.' },
      { frente: '¿Qué se desplaza primero al aparecer una colección?', reverso: 'Líquido cefalorraquídeo hacia el espacio raquídeo y sangre venosa fuera del cráneo.' },
      { frente: '¿Qué ocurre al agotarse la compensación?', reverso: 'Un aumento pequeño de volumen produce un aumento grande de presión, y el deterioro se vuelve rápido.' },
      { frente: '¿Cómo puede un collarín apretado empeorar la situación?', reverso: 'Dificulta el retorno venoso del cráneo y empeora la relación entre presión intracraneal y perfusión.' },
      { frente: '¿Cuál es la grafía correcta del epónimo?', reverso: 'Monro–Kellie; el plan escribe «Kellie Monroe», que se conserva solo como título documental.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con un hematoma intracraneal que crece y estado neurológico todavía aceptable. ¿Cómo lo explica la doctrina de Monro–Kellie?',
        opciones: [
          'El hematoma no está creciendo realmente.',
          'Está en fase de compensación: el desplazamiento de líquido cefalorraquídeo y de sangre venosa mantiene la presión casi estable durante un tiempo.',
          'La presión intracraneal ya está en su máximo.',
          'El cráneo se expande para acomodar el volumen.',
        ],
        correcta: 1,
        explicacion: 'Esa fase explica la aparente estabilidad inicial de una lesión que progresa.',
      },
      {
        pregunta: '¿Qué comportamiento tiene la presión intracraneal cuando se agota la compensación?',
        opciones: [
          'Sigue subiendo de forma lenta y gradual.',
          'Un aumento pequeño de volumen produce un aumento grande de presión, y el deterioro se acelera.',
          'Se estabiliza definitivamente.',
          'Disminuye por el desplazamiento del líquido cefalorraquídeo.',
        ],
        correcta: 1,
        explicacion: 'Por eso un cambio neurológico pequeño en poco tiempo tiene tanto valor de alarma.',
      },
      {
        pregunta: 'Durante el traslado observas que el collarín está muy apretado y la cabeza girada. ¿Por qué importa?',
        opciones: [
          'Solo por confort del paciente.',
          'Porque dificultan el retorno venoso del cráneo y empeoran la relación entre la presión intracraneal y la perfusión cerebral.',
          'Porque impiden valorar las pupilas.',
          'Porque aumentan el volumen de líquido cefalorraquídeo.',
        ],
        correcta: 1,
        explicacion: 'Es una consecuencia mecánica directa de la doctrina, y su corrección no cuesta nada.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Según la doctrina de Monro–Kellie, si el volumen de una colección aumenta dentro del cráneo, otro componente debe ___.',
          opciones: ['aumentar también', 'disminuir', 'permanecer igual'],
          correcta: 1,
          explicacion: 'El volumen total es prácticamente constante porque la caja es rígida.',
        },
        {
          texto: 'La perfusión cerebral empeora tanto si sube la presión ___ como si cae la presión arterial.',
          opciones: ['intracraneal', 'intratorácica', 'intraabdominal'],
          correcta: 0,
          explicacion: 'Depende de la relación entre ambas: por eso la hipotensión es tan lesiva en el TCE.',
        },
        {
          texto: 'La grafía que se muestra al alumno es doctrina de ___, aunque el plan escriba la variante invertida.',
          opciones: ['Kellie Monroe', 'Monro–Kellie', 'Monroe–Kelly'],
          correcta: 1,
          explicacion: 'Es la forma correcta y la que permitirá al alumno encontrar el concepto en la bibliografía.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'La errata documental «Kellie Monroe» se conserva en el título oficial y se corrige solo en el título visible.',
        'No se publican proporciones de los tres componentes ni cifras de presión intracraneal o de perfusión cerebral: dependen de la fuente y del protocolo, y sus temas específicos corresponden al lote B.',
      ],
    }),
  },

  // ============================================================
  //  3. Fractura de cráneo
  // ============================================================
  'm5-tcc-fractura-craneo': {
    icono: 'cp-smart-craneo',
    duracion: '14 min',
    resumen: 'Las fracturas de cráneo se describen como lineales, deprimidas, de la base y abiertas, y '
      + 'su importancia real está en lo que indican: energía elevada y posible lesión del encéfalo '
      + 'subyacente. Los signos clásicos de la fractura de la base —equimosis periorbitaria, equimosis '
      + 'retroauricular y salida de líquido por nariz u oído— pueden faltar o aparecer horas después. '
      + 'La lección fija tres prohibiciones: no palpar agresivamente, no explorar la herida y no '
      + 'ocluir el drenaje.',
    objetivos: [
      'Describir los cuatro tipos de fractura craneal y su significado.',
      'Reconocer los signos de fractura de base y aceptar que pueden faltar o ser tardíos.',
      'Aplicar las prohibiciones de palpación agresiva, exploración de la herida y oclusión del drenaje.',
    ],
    secciones: [
      {
        titulo: 'Cuatro tipos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Tipo', 'Qué es', 'Qué implica'],
            filas: [
              ['Lineal', 'Trazo de fractura sin desplazamiento', 'La más frecuente; su importancia está en lo que pueda haber debajo'],
              ['Deprimida', 'Fragmento óseo hundido hacia el interior', 'Puede comprimir o lesionar el tejido subyacente'],
              ['De la base', 'Afecta al suelo de la cavidad craneal', 'Puede comunicar el interior con oído, nariz o senos, con riesgo de fuga e infección'],
              ['Abierta', 'Existe una herida que comunica la fractura con el exterior', 'Riesgo de contaminación e infección del contenido craneal'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La fractura importa por lo que acompaña', texto: 'Una fractura craneal indica que la energía transferida fue considerable y obliga a buscar lesión del encéfalo, pero no la confirma: puede haber fractura sin lesión intracraneal y lesión intracraneal grave sin fractura. Lo que decide la conducta es la valoración neurológica y su evolución.' },
        ],
      },
      {
        titulo: 'Signos, y por qué pueden faltar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que puede encontrarse',
            items: [
              'Escalón, hundimiento o deformidad palpable en el cráneo.',
              'Herida en el cuero cabelludo con fractura visible en su fondo.',
              'Equimosis periorbitaria bilateral, conocida como «ojos de mapache».',
              'Equimosis retroauricular, conocida como signo de Battle.',
              'Salida de líquido claro o sanguinolento por nariz u oído.',
              'Sangre detrás del tímpano.',
              'Alteración de la audición o del equilibrio.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ausencia de estos signos no descarta nada', texto: 'La equimosis periorbitaria y la retroauricular tardan horas en desarrollarse: es normal que no estén presentes en la escena, y su ausencia no permite excluir una fractura de la base. Del mismo modo, su presencia orienta pero no diagnostica. La confirmación es por imagen hospitalaria.' },
        ],
      },
      {
        titulo: 'Tres prohibiciones y la conducta',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No palpar agresivamente ni explorar la herida', texto: 'La palpación se hace con suavidad. No se presiona sobre una zona hundida ni se introducen dedos ni instrumentos en una herida del cuero cabelludo para «ver el hueso»: puede desplazar fragmentos hacia el interior, aumentar el sangrado y contaminar. Se describe lo que se ve y se cubre.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No ocluir el drenaje', texto: 'Si sale líquido claro o sanguinolento por el oído o la nariz, no se tapona. Se cubre con gasa estéril sin comprimir y se deja drenar. Ocluirlo puede aumentar la presión dentro del cráneo y favorecer la infección. Por la misma razón se evita la vía nasal para sondas o dispositivos en un paciente con sospecha de fractura de la base.' },
          {
            tipo: 'lista',
            titulo: 'Qué sí se hace',
            items: [
              'Prevención de la lesión secundaria: oxigenación, ventilación adecuada y presión arterial conforme al protocolo.',
              'Valoración neurológica seriada y documentada con la hora.',
              'Control del sangrado del cuero cabelludo con presión, aplicada con cautela si se sospecha fractura abierta o deprimida.',
              'Cobertura de las heridas con material estéril.',
              'Restricción del movimiento espinal si el mecanismo o los hallazgos lo indican.',
              'Traslado a un centro con capacidad neuroquirúrgica y prealerta describiendo el mecanismo y los hallazgos.',
            ],
          },
        ],
      },
      F([PHTLS_CABEZA, BTF_PREHOSPITAL, ACS_TCE_2024, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Fractura lineal', definicion: 'Trazo de fractura craneal sin desplazamiento de fragmentos; la más frecuente.' },
      { termino: 'Fractura deprimida', definicion: 'Fractura con hundimiento de un fragmento óseo hacia el interior de la cavidad craneal.' },
      { termino: 'Fractura de la base de cráneo', definicion: 'Fractura del suelo de la cavidad craneal, que puede comunicar el interior con oído, nariz o senos.' },
      { termino: 'Signo de Battle', definicion: 'Equimosis retroauricular asociada a fractura de la base; tarda horas en aparecer.' },
      { termino: 'Otorrea o rinorrea de LCR', definicion: 'Salida de líquido cefalorraquídeo por oído o nariz; no se tapona, se cubre sin comprimir y se deja drenar.' },
    ],
    flashcards: [
      { frente: 'Los cuatro tipos de fractura craneal', reverso: 'Lineal, deprimida, de la base y abierta.' },
      { frente: '¿Qué significa encontrar una fractura de cráneo?', reverso: 'Que la energía fue considerable y obliga a buscar lesión del encéfalo; no la confirma.' },
      { frente: '¿Por qué pueden faltar los «ojos de mapache» y el signo de Battle?', reverso: 'Porque tardan horas en desarrollarse: su ausencia en la escena no descarta fractura de la base.' },
      { frente: '¿Qué se hace ante salida de líquido por el oído?', reverso: 'Gasa estéril sin comprimir, dejando drenar; nunca taponar.' },
      { frente: '¿Por qué se evita la vía nasal en la sospecha de fractura de base?', reverso: 'Por el riesgo de atravesar la fractura al introducir sondas o dispositivos.' },
      { frente: '¿Se explora una herida del cuero cabelludo para ver el hueso?', reverso: 'No: puede desplazar fragmentos, aumentar el sangrado y contaminar.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con TCE del que sale líquido claro por el conducto auditivo. ¿Qué haces?',
        opciones: [
          'Taponas el conducto con gasa para detener la salida.',
          'Cubres con gasa estéril sin comprimir y dejas drenar, y evitas la vía nasal para dispositivos.',
          'Aspiras el conducto.',
          'Aplicas presión firme sobre el pabellón auricular.',
        ],
        correcta: 1,
        explicacion: 'Ocluir el drenaje puede aumentar la presión intracraneal y favorecer la infección.',
      },
      {
        pregunta: 'No encuentras equimosis periorbitaria ni retroauricular en un paciente con mecanismo compatible. ¿Qué concluyes?',
        opciones: [
          'Que se descarta la fractura de la base.',
          'Que esos signos tardan horas en aparecer y su ausencia no permite descartarla.',
          'Que puede darse de alta en el lugar.',
          'Que el mecanismo fue de baja energía.',
        ],
        correcta: 1,
        explicacion: 'Son signos tardíos: es normal que no estén presentes en la escena.',
      },
      {
        pregunta: 'Herida en el cuero cabelludo con zona hundida palpable y sangrado. ¿Cuál es la conducta correcta?',
        opciones: [
          'Presionar con fuerza sobre la zona hundida para cohibir el sangrado.',
          'Aplicar presión con cautela alrededor sin presionar sobre el hundimiento, cubrir con material estéril y trasladar a centro con capacidad neuroquirúrgica.',
          'Explorar la herida con los dedos para valorar la profundidad.',
          'Retirar los fragmentos óseos visibles.',
        ],
        correcta: 1,
        explicacion: 'Presionar sobre una fractura deprimida o explorar la herida puede desplazar fragmentos hacia el interior.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Un compañero quiere colocar una sonda por vía nasal a un paciente con sospecha de fractura de la base de cráneo. ¿Qué argumentas?',
          opciones: [
            'Que es la vía de elección en el TCE.',
            'Que se evita la vía nasal en este paciente por el riesgo de atravesar la fractura, y que la alternativa depende del alcance autorizado y del protocolo.',
            'Que da igual la vía elegida.',
            'Que primero hay que taponar el oído.',
          ],
          correcta: 1,
          explicacion: 'La lección lo enuncia como consecuencia directa de la comunicación entre el interior del cráneo y las fosas nasales.',
        },
        {
          pregunta: 'En la entrega, ¿cómo formulas el hallazgo de una zona hundida en el cráneo?',
          opciones: [
            '«Fractura deprimida con lesión cerebral subyacente».',
            '«Zona de hundimiento palpable en región parietal derecha con herida asociada, cubierta con material estéril; valoración neurológica a las 18:05 y a las 18:20 con su resultado».',
            '«Traumatismo craneal leve».',
            '«Sin lesión intracraneal».',
          ],
          correcta: 1,
          explicacion: 'Se describe lo observado y la evolución con su hora; afirmar el tipo de fractura y la lesión subyacente requiere imagen hospitalaria.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['Prohibiciones explícitas recogidas en la lección: palpación agresiva sobre la zona hundida, exploración instrumental o digital de la herida y oclusión del drenaje de líquido por oído o nariz.'],
    }),
  },

  // ============================================================
  //  4. Escalpe o avulsión de cuero cabelludo
  // ============================================================
  'm5-tcc-escalpe': {
    icono: 'cp-smart-craneo',
    duracion: '12 min',
    resumen: 'El cuero cabelludo está muy vascularizado y sus vasos se retraen mal, de modo que una '
      + 'herida o una avulsión pueden sangrar de forma abundante y llegar a producir shock, sobre todo '
      + 'en niños y en pacientes anticoagulados. El control se hace con presión directa, aplicada con '
      + 'cautela si se sospecha fractura abierta o deprimida debajo. La lección insiste en buscar '
      + 'heridas ocultas entre el pelo y remite la conservación del tejido avulsionado al protocolo.',
    objetivos: [
      'Explicar por qué el cuero cabelludo sangra de forma abundante.',
      'Aplicar el control del sangrado con la cautela que impone una posible fractura subyacente.',
      'Buscar heridas ocultas y manejar el tejido avulsionado conforme al protocolo.',
    ],
    secciones: [
      {
        titulo: 'Por qué sangra tanto',
        bloques: [
          { tipo: 'p', texto: 'El cuero cabelludo tiene una vascularización muy rica y sus vasos están sujetos al tejido fibroso que lo forma. Cuando se seccionan, no se retraen ni se colapsan como lo harían en otras zonas del cuerpo, y por eso permanecen abiertos y sangran de forma continua.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Puede llegar a producir shock', texto: 'Es habitual subestimar una herida del cuero cabelludo porque «solo es la cabeza». Un sangrado sostenido puede producir una pérdida importante, y el riesgo es mayor en el paciente pediátrico, cuyo volumen circulante es menor, y en el paciente anticoagulado. Aun así, ante un adulto traumatizado en shock no se da la hipotensión por explicada solo con la herida del cuero cabelludo: se buscan las demás fuentes.' },
        ],
      },
      {
        titulo: 'Control del sangrado',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Protección personal: el sangrado del cuero cabelludo salpica.',
              'Exponer la zona y separar el pelo para localizar el punto que sangra; el pelo húmedo de sangre esconde con facilidad la herida.',
              'Aplicar presión directa con apósito sobre el punto sangrante.',
              'Si hay hundimiento palpable o fractura abierta, aplicar la presión con cautela alrededor de la zona, evitando presionar sobre el hundimiento o sobre fragmentos.',
              'Vendaje que mantenga la presión una vez controlado el sangrado.',
              'Recolocar un colgajo avulsionado sobre su lecho, si es posible, antes de cubrirlo, sin forzar.',
              'Reevaluar: los vendajes de la cabeza se aflojan con facilidad durante la movilización.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Buscar lo que no se ve', texto: 'La exploración de la cabeza incluye pasar las manos enguantadas por todo el cuero cabelludo, incluida la región occipital, y mirar los guantes. Una herida sangrante en la nuca de un paciente en decúbito supino puede pasar completamente desapercibida.' },
        ],
      },
      {
        titulo: 'Tejido avulsionado y traslado',
        bloques: [
          { tipo: 'p', texto: 'Cuando se ha desprendido un fragmento de cuero cabelludo, se recoge y se traslada con el paciente. Cómo se conserva —envuelto, en qué condiciones y a qué temperatura— lo determina el protocolo del servicio, que es quien fija el procedimiento y el material disponible. Lo que no se hace en la escena es intentar reimplantarlo o suturarlo.' },
          {
            tipo: 'lista',
            titulo: 'Además',
            items: [
              'Restricción del movimiento espinal si el mecanismo o los hallazgos lo indican.',
              'Valoración neurológica seriada: la herida visible no debe distraer de la posible lesión del encéfalo.',
              'Prevención de la hipotermia, especialmente relevante con una superficie amplia expuesta.',
              'Traslado con descripción del mecanismo, de la extensión de la lesión y del sangrado estimado.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La lesión llamativa no es necesariamente la grave', texto: 'Un escalpe extenso impresiona mucho y puede acaparar la atención del equipo. La prioridad sigue siendo la secuencia habitual: vía aérea, ventilación, circulación —incluido el control de ese sangrado— y estado neurológico, con reevaluación repetida.' },
        ],
      },
      F([PHTLS_CABEZA, ACS_BEST, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Escalpe', definicion: 'Avulsión total o parcial del cuero cabelludo, con desprendimiento del tejido de su lecho.' },
      { termino: 'Colgajo', definicion: 'Fragmento de cuero cabelludo parcialmente desprendido que conserva unión con el tejido vecino.' },
      { termino: 'Hemorragia del cuero cabelludo', definicion: 'Sangrado abundante y sostenido por la rica vascularización de la zona y por la escasa retracción de sus vasos.' },
    ],
    flashcards: [
      { frente: '¿Por qué sangra tanto el cuero cabelludo?', reverso: 'Por su rica vascularización y porque sus vasos, sujetos al tejido fibroso, no se retraen ni se colapsan al seccionarse.' },
      { frente: '¿En qué pacientes preocupa más este sangrado?', reverso: 'En el paciente pediátrico, con menor volumen circulante, y en el anticoagulado.' },
      { frente: '¿Cómo se aplica la presión si se palpa un hundimiento?', reverso: 'Con cautela alrededor de la zona, evitando presionar sobre el hundimiento o sobre fragmentos.' },
      { frente: '¿Dónde se buscan heridas fáciles de pasar por alto?', reverso: 'En toda la superficie del cuero cabelludo, incluida la región occipital, palpando con guantes y mirándolos después.' },
      { frente: '¿Se reimplanta en campo un fragmento avulsionado?', reverso: 'No: se recoge y se traslada con el paciente, conservado conforme al protocolo del servicio.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con herida amplia del cuero cabelludo que sangra de forma continua. ¿Qué corresponde?',
        opciones: [
          'Restar importancia: las heridas de la cabeza sangran mucho pero no repercuten.',
          'Controlar el sangrado con presión directa, vigilar los signos de shock por su menor volumen circulante y trasladar.',
          'Aplicar un torniquete alrededor de la cabeza.',
          'Esperar a que el sangrado ceda por sí solo.',
        ],
        correcta: 1,
        explicacion: 'El sangrado del cuero cabelludo puede ser importante, y en el paciente pediátrico el margen es menor.',
      },
      {
        pregunta: 'Adulto traumatizado en shock con una herida sangrante del cuero cabelludo ya controlada. ¿Qué haces con la hipotensión?',
        opciones: [
          'La atribuyes a la herida del cuero cabelludo y cierras la búsqueda.',
          'Sigues buscando otras fuentes de hemorragia, porque en el adulto no se da la hipotensión por explicada solo con esa herida.',
          'Retiras el vendaje para valorar de nuevo.',
          'Concluyes que se trata de un shock neurogénico.',
        ],
        correcta: 1,
        explicacion: 'La lección advierte expresamente de no dar por explicada la hipotensión del adulto con la herida del cuero cabelludo.',
      },
      {
        pregunta: 'Palpas un hundimiento óseo justo debajo de la herida que sangra. ¿Cómo aplicas la presión?',
        opciones: [
          'Firmemente sobre el hundimiento, que es donde está el vaso.',
          'Con cautela alrededor de la zona, evitando presionar sobre el hundimiento o sobre fragmentos, y cubriendo con material estéril.',
          'No se aplica presión en ningún caso.',
          'Se introduce gasa dentro de la herida hasta el hueso.',
        ],
        correcta: 1,
        explicacion: 'Presionar sobre una fractura deprimida puede desplazar fragmentos hacia el interior del cráneo.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Los vasos del cuero cabelludo sangran de forma sostenida porque, al estar sujetos al tejido fibroso, no se ___ al seccionarse.',
          opciones: ['dilatan', 'retraen', 'infectan'],
          correcta: 1,
          explicacion: 'En otras zonas del cuerpo la retracción y el colapso del vaso ayudan a contener el sangrado.',
        },
        {
          texto: 'Para no pasar por alto una herida sangrante en la nuca de un paciente en decúbito supino, se palpa todo el cuero cabelludo con guantes y después se ___.',
          opciones: ['lava la zona', 'miran los guantes', 'aplica frío local'],
          correcta: 1,
          explicacion: 'Es la comprobación más simple y la que evita el error más frecuente en esta lesión.',
        },
        {
          texto: 'El fragmento de cuero cabelludo avulsionado se recoge y se traslada con el paciente; su forma de conservación la determina ___.',
          opciones: ['el criterio del prestador', 'el protocolo del servicio', 'la familia del paciente'],
          correcta: 1,
          explicacion: 'El procedimiento y el material disponible pertenecen al protocolo, y la reimplantación no se hace en campo.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['DECISIÓN PENDIENTE: la academia debe declarar el procedimiento y el material de conservación de tejido avulsionado de su servicio; la lección remite a él sin inventarlo.'],
    }),
  },

  // ============================================================
  //  5. Lesiones focales
  // ============================================================
  'm5-tcc-lesiones-focales': {
    icono: 'cp-smart-evc-hemorragico',
    duracion: '15 min',
    resumen: 'Las lesiones focales del encéfalo son las que ocupan un lugar concreto: hematoma '
      + 'epidural, hematoma subdural, contusión cerebral y hematoma intraparenquimatoso. Pueden '
      + 'producir déficit neurológico focal y deterioro progresivo, pero no se distinguen entre sí con '
      + 'fiabilidad en el ámbito prehospitalario. La lección desmonta el uso del intervalo lúcido como '
      + 'marca segura del hematoma epidural y sitúa la prioridad donde corresponde: valoración seriada '
      + 'y prevención de hipoxia e hipotensión.',
    objetivos: [
      'Describir las cuatro lesiones focales principales y su comportamiento general.',
      'Explicar por qué no se distinguen con fiabilidad en el ámbito prehospitalario.',
      'Priorizar la valoración seriada y la prevención de la lesión secundaria.',
    ],
    secciones: [
      {
        titulo: 'Focal frente a difusa',
        bloques: [
          { tipo: 'p', texto: 'Una lesión focal ocupa un sitio concreto: una colección de sangre o una zona de tejido dañado que puede comprimir lo que tiene alrededor. Una lesión difusa afecta al tejido de forma extendida y no deja una masa que evacuar. Esa diferencia importa porque algunas lesiones focales pueden tratarse quirúrgicamente, y por eso el traslado a un centro con capacidad neuroquirúrgica forma parte de la decisión.' },
          {
            tipo: 'tabla',
            titulo: 'Las cuatro lesiones focales principales',
            headers: ['Lesión', 'Dónde se acumula o localiza', 'Comportamiento general'],
            filas: [
              ['Hematoma epidural', 'Entre el cráneo y la duramadre', 'Suele asociarse a sangrado arterial y puede crecer con rapidez'],
              ['Hematoma subdural', 'Entre la duramadre y el encéfalo', 'Suele asociarse a sangrado venoso; puede ser agudo o de instauración más lenta'],
              ['Contusión cerebral', 'En el propio tejido encefálico, en la zona golpeada o en la opuesta', 'Puede aumentar de tamaño y edematizarse en las horas siguientes'],
              ['Hematoma intraparenquimatoso', 'Dentro del tejido encefálico', 'Ocupa espacio y puede progresar'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Poblaciones donde el patrón cambia', texto: 'En personas mayores y en pacientes que toman anticoagulantes, una colección puede desarrollarse con un mecanismo aparentemente banal y manifestarse de forma más lenta o más tardía. En esos pacientes el umbral de sospecha y de traslado debe ser más bajo.' },
        ],
      },
      {
        titulo: 'Lo que se puede y lo que no se puede afirmar',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'El intervalo lúcido no identifica un hematoma epidural', texto: 'El patrón clásico —golpe, pérdida de conciencia, recuperación aparente y deterioro posterior— se asocia tradicionalmente al hematoma epidural, pero no es exclusivo de él, no está presente en todos los casos y también puede observarse en otras lesiones. Enseñarlo como marca segura lleva a dos errores: descartar lesión grave porque el paciente «está lúcido» y afirmar un tipo de hematoma que solo la imagen distingue.' },
          {
            tipo: 'lista',
            titulo: 'Lo que sí se puede observar y comunicar',
            items: [
              'Déficit neurológico focal: debilidad o parálisis de un lado, alteración del habla, asimetría facial.',
              'Asimetría pupilar o pupila que deja de reaccionar.',
              'Descenso del nivel de conciencia y su velocidad.',
              'Convulsiones.',
              'Vómito repetido, cefalea creciente y agitación o somnolencia progresivas.',
              'La tendencia entre valoraciones sucesivas, con la hora de cada una.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que decide no es el nombre de la lesión', texto: 'Para la conducta prehospitalaria da igual si la colección es epidural o subdural: en ambos casos lo que se hace es prevenir la lesión secundaria, reevaluar de forma documentada y trasladar a un centro con capacidad neuroquirúrgica. Nombrar la lesión en el informe no aporta nada y puede inducir a error a quien lo lea.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Prevención de la lesión secundaria: evitar la hipoxia y la hipotensión, mantener una ventilación adecuada y controlar la glucemia y la temperatura, todo conforme al protocolo del servicio.',
              'Valoración neurológica seriada y documentada con la hora: conciencia, pupilas y función motora.',
              'Posición y manejo que favorezcan el drenaje venoso del cráneo: cabeza en posición neutra, collarín no demasiado apretado, cabecera elevada si el protocolo y la situación del paciente lo permiten.',
              'Restricción del movimiento espinal si el mecanismo o los hallazgos lo indican.',
              'Control de las convulsiones según el alcance autorizado y el protocolo.',
              'Traslado a centro con capacidad neuroquirúrgica y prealerta describiendo hallazgos y evolución, no un diagnóstico.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El tiempo cuenta de forma distinta aquí', texto: 'Algunas colecciones focales tienen tratamiento quirúrgico y su resultado depende de la rapidez con que se evacúan. Por eso una tendencia neurológica descendente, aunque el paciente siga consciente, es motivo suficiente para acelerar el traslado y comunicar el cambio, sin esperar a que el cuadro se complete.' },
        ],
      },
      F([PHTLS_CABEZA, BTF_PREHOSPITAL, ACS_TCE_2024, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Lesión focal', definicion: 'Daño encefálico localizado en un punto concreto, como una colección de sangre o una contusión, que puede comprimir el tejido vecino.' },
      { termino: 'Hematoma epidural', definicion: 'Colección de sangre entre el cráneo y la duramadre; suele asociarse a sangrado arterial y puede crecer con rapidez.' },
      { termino: 'Hematoma subdural', definicion: 'Colección de sangre entre la duramadre y el encéfalo; suele asociarse a sangrado venoso y puede instaurarse de forma más lenta.' },
      { termino: 'Intervalo lúcido', definicion: 'Periodo de recuperación aparente de la conciencia entre el impacto y un deterioro posterior; no es exclusivo ni constante de ninguna lesión concreta.' },
      { termino: 'Déficit neurológico focal', definicion: 'Alteración neurológica limitada a una función o a un lado del cuerpo, como debilidad, alteración del habla o asimetría pupilar.' },
    ],
    flashcards: [
      { frente: 'Las cuatro lesiones focales principales', reverso: 'Hematoma epidural, hematoma subdural, contusión cerebral y hematoma intraparenquimatoso.' },
      { frente: '¿Se distinguen entre sí en el ámbito prehospitalario?', reverso: 'No con fiabilidad: la imagen hospitalaria es la que las diferencia.' },
      { frente: '¿Qué error induce enseñar el intervalo lúcido como marca segura?', reverso: 'Descartar lesión grave porque el paciente está lúcido, y afirmar un tipo de hematoma que solo la imagen distingue.' },
      { frente: '¿Qué cambia la conducta prehospitalaria: el nombre de la lesión o la tendencia?', reverso: 'La tendencia: la conducta es la misma en todas y depende de la evolución neurológica.' },
      { frente: '¿En qué pacientes baja el umbral de sospecha?', reverso: 'En personas mayores y en pacientes anticoagulados, donde un mecanismo banal puede producir una colección.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente que perdió la conciencia, la recuperó y ahora, veinte minutos después, está somnoliento y con una pupila dilatada. ¿Qué corresponde?',
        opciones: [
          'Diagnosticar hematoma epidural por el intervalo lúcido y comunicarlo así.',
          'Reconocer un deterioro neurológico, prevenir hipoxia e hipotensión según protocolo, documentar la evolución con la hora y acelerar el traslado a centro con capacidad neuroquirúrgica.',
          'Esperar a que el cuadro se complete antes de actuar.',
          'Descartar lesión grave porque hubo recuperación de la conciencia.',
        ],
        correcta: 1,
        explicacion: 'El patrón no identifica el tipo de lesión, pero el deterioro documentado sí obliga a actuar y a comunicar.',
      },
      {
        pregunta: '¿Por qué no se nombra el tipo de hematoma en el informe prehospitalario?',
        opciones: [
          'Por norma administrativa.',
          'Porque no se distinguen con fiabilidad sin imagen, la conducta es la misma en todos y nombrarlos puede inducir a error a quien lea el informe.',
          'Porque el tipo de hematoma no existe hasta que se opera.',
          'Porque no influye en el destino del paciente.',
        ],
        correcta: 1,
        explicacion: 'Se describen hallazgos y evolución; el diagnóstico corresponde a la imagen hospitalaria.',
      },
      {
        pregunta: 'Mujer de 79 años anticoagulada que se golpeó la cabeza al caer desde su propia altura y está asintomática. ¿Cómo procedes?',
        opciones: [
          'Alta en el lugar: mecanismo banal y sin síntomas.',
          'Umbral de sospecha bajo: se traslada y se comunica el antecedente, porque en esa población una colección puede desarrollarse con mecanismos leves y manifestarse tarde.',
          'Se declara hematoma subdural.',
          'Se observa en el domicilio durante una hora antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'La lección señala expresamente a personas mayores y pacientes anticoagulados como población de umbral más bajo.',
      },
      {
        pregunta: 'Además de la valoración neurológica, ¿qué medida actúa sobre la presión dentro del cráneo sin ningún coste?',
        opciones: [
          'Aplicar frío en la cabeza.',
          'Mantener la cabeza en posición neutra y evitar un collarín demasiado apretado, para no dificultar el drenaje venoso.',
          'Administrar líquidos de forma rápida y sistemática.',
          'Colocar al paciente en decúbito prono.',
        ],
        correcta: 1,
        explicacion: 'Es una corrección mecánica gratuita que se apoya directamente en la doctrina de Monro–Kellie.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Registras dos valoraciones: a las 22:10 el paciente está consciente y orientado; a las 22:25 responde con lentitud y no localiza bien el dolor. Sigue consciente. ¿Qué haces con esa información?',
          opciones: [
            'Esperar a que pierda la conciencia para considerarlo un deterioro.',
            'Tratarlo ya como deterioro: acelerar el traslado, reforzar la prevención de hipoxia e hipotensión según protocolo y comunicar el cambio con las dos horas registradas.',
            'Anotarlo sin comunicarlo, porque sigue consciente.',
            'Concluir que se trata de un hematoma epidural.',
          ],
          correcta: 1,
          explicacion: 'La lección establece que una tendencia descendente basta para actuar y comunicar, sin esperar a que el cuadro se complete, y sin nombrar la lesión.',
        },
        {
          pregunta: 'Un alumno afirma que «si hay intervalo lúcido, es epidural». ¿Cómo lo corriges con lo que enseña esta lección?',
          opciones: [
            'Confirmando la afirmación.',
            'Explicando que el patrón se asocia tradicionalmente a esa lesión pero no es exclusivo ni constante, que también puede observarse en otras, y que el tipo de colección solo lo distingue la imagen.',
            'Diciendo que el intervalo lúcido no existe.',
            'Indicando que en ese caso puede descartarse lesión grave.',
          ],
          correcta: 1,
          explicacion: 'La lección desmonta expresamente el uso del intervalo lúcido como marca segura, sin negar su existencia.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'CONTROL DE REGRESIÓN: la lección declara expresamente que el intervalo lúcido NO identifica el hematoma epidural y que las lesiones focales no se distinguen en campo.',
        'El tema `m5-tcc-lesiones-intracraneales` sigue vacío y corresponde al lote B; esta lección no lo suplanta.',
      ],
    }),
  },
}
