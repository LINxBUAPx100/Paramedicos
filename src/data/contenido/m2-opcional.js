// ============================================================
//  Módulo 2 · Anatomía opcional
// ------------------------------------------------------------
//  Tercera unidad del Módulo 2 (5 semanas, 25 horas), en el orden del PDF:
//  sistemas hematopoyético, linfático e inmunitario, reproductor masculino y
//  femenino, órganos de los sentidos y sistema endocrino.
//
//  «Opcional» es el rótulo del plan para esta unidad y describe su posición
//  curricular, no su exigencia: las cinco lecciones se redactan con el mismo
//  contrato que las doce anteriores.
//
//  Mismas reglas del resto del módulo: Tortora no está en la biblioteca y no
//  se cita ni se sustituye por otra obra bajo su nombre. Se usan AAOS y
//  Guyton, abiertos y verificados con capítulo y página impresa el 17 de
//  agosto de 2026.
//
//  ALCANCE: estructura y función. Sin tratamientos, dosis, algoritmos,
//  criterios diagnósticos ni procedimientos.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const aaos = (cap, titulo, pagina) => ({
  nombre: `American Academy of Orthopaedic Surgeons (Elling B., Elling K. M. y Rothenberg M. A.). `
    + `Anatomía y fisiología enfocada a la atención prehospitalaria y urgencias médicas, Editorial `
    + `Millas. Capítulo ${cap}, «${titulo}», p. ${pagina}.`,
  nota: 'Obra de orientación prehospitalaria de la biblioteca de la academia. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026. NO es el Tortora que cita el plan, que no está '
    + 'en la carpeta y no se cita en ninguna parte de este módulo.',
})

const guyton = (cap, titulo, pagina) => ({
  nombre: `Guyton A. C. y Hall J. E. Compendio de Fisiología Médica, 13.ª ed. Capítulo ${cap}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Fuente de fisiología. Capítulo y página impresa verificados el 17 de agosto de 2026 sobre la '
    + 'copia de la biblioteca de la academia. Se usa para el mecanismo, no para conducta clínica.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_TERAPEUTICA = 'ALCANCE DEL MÓDULO 2: la lección enseña estructura y función. No contiene '
  + 'tratamientos, dosis, algoritmos, criterios diagnósticos ni procedimientos; esos contenidos '
  + 'pertenecen a los módulos clínicos y no se adelantan aquí.'
const SIN_TORTORA = 'Tortora no está en la biblioteca de la academia: no se cita, no se le atribuyen '
  + 'páginas y no se sustituye por otra obra bajo su nombre.'

const ficha = ({ version, extra = [], fuentes }) => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    SIN_TERAPEUTICA,
    SIN_TORTORA,
    '«Anatomía opcional» es el rótulo curricular del plan para esta unidad y describe su posición, '
      + 'no una menor exigencia: la lección cumple el mismo contrato que las del resto del módulo.',
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Sistema hematopoyético
  // ============================================================
  'm2-ao-hematopoyetico': {
    icono: '🩸',
    duracion: '20 min',
    resumen: 'De qué está hecha la sangre, qué hace cada uno de sus componentes y dónde se producen.',
    objetivos: [
      'Distinguir el plasma de los elementos formes y describir su composición.',
      'Relacionar cada tipo de célula sanguínea con su función.',
      'Explicar dónde y a partir de qué se producen las células de la sangre.',
      'Describir en orden lo que ocurre cuando se lesiona un vaso.',
    ],
    secciones: [
      {
        titulo: 'Sangre: un tejido líquido',
        bloques: [
          { tipo: 'p', texto: 'La sangre se clasifica como tejido conjuntivo, aunque su matriz sea líquida. Tiene dos grandes componentes: el plasma, que es la parte líquida, y los elementos formes, que son las células y fragmentos celulares que circulan suspendidos en él.' },
          {
            tipo: 'tabla',
            titulo: 'Componentes y lo que aportan',
            headers: ['Componente', 'Qué es', 'Función'],
            filas: [
              ['Plasma', 'Agua con proteínas, electrolitos, nutrientes, gases y desechos disueltos', 'Medio de transporte; sus proteínas sostienen la presión oncótica y participan en la coagulación y la defensa'],
              ['Eritrocitos', 'Células sin núcleo, cargadas de un pigmento que se une al oxígeno', 'Transportar oxígeno hacia los tejidos y participar en el transporte de dióxido de carbono'],
              ['Leucocitos', 'Células con núcleo, de varios tipos', 'Defensa frente a microorganismos y participación en la inflamación'],
              ['Plaquetas', 'Fragmentos celulares sin núcleo', 'Iniciar la detención de una hemorragia formando un tapón inicial'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El eritrocito está optimizado para una sola tarea', texto: 'Pierde el núcleo al madurar y su interior queda casi por completo ocupado por el pigmento que transporta oxígeno. Es un caso extremo del principio estructura-función: ha sacrificado la capacidad de dividirse y de renovarse a cambio de máxima capacidad de carga.' },
          { tipo: 'p', texto: 'Conviene recordar de la lección de líquidos y electrolitos que el plasma es el compartimiento intravascular: la misma agua, mirada ahora desde la sangre en vez de desde su reparto entre compartimientos.' },
        ],
      },
      {
        titulo: 'Dónde se fabrican',
        bloques: [
          { tipo: 'p', texto: 'La producción de células sanguíneas ocurre en la médula ósea, contenida en el interior de determinados huesos. Todas proceden de una célula precursora común, capaz de originar cualquiera de las líneas: eritrocitos, los distintos leucocitos y plaquetas.' },
          {
            tipo: 'lista',
            titulo: 'Consecuencias de esa organización',
            items: [
              'Una alteración de la médula ósea puede afectar a varias líneas a la vez, porque comparten origen.',
              'La producción se ajusta a la demanda: si hace falta más transporte de oxígeno, se estimula la línea correspondiente.',
              'El riñón participa en ese ajuste produciendo una sustancia que estimula la formación de eritrocitos, lo que enlaza con la lección del sistema urinario.',
              'Como las células sanguíneas tienen vida limitada, la producción es continua y no ocasional.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos lecciones se cruzan aquí', texto: 'Que la médula ósea produzca la sangre es una de las funciones no mecánicas del hueso que se enunciaron en la lección del sistema óseo. Y que el riñón intervenga en el estímulo de la producción es una de las funciones reguladoras que se enunciaron en la del sistema urinario. Este módulo va cerrando esos vínculos a propósito.' },
        ],
      },
      {
        titulo: 'Qué ocurre cuando se lesiona un vaso',
        bloques: [
          { tipo: 'p', texto: 'La detención de una hemorragia es un proceso ordenado en el que participan el propio vaso, las plaquetas y las proteínas del plasma. Ocurre en pasos sucesivos, cada uno de los cuales prepara el siguiente.' },
          {
            tipo: 'pasos',
            titulo: 'La secuencia',
            items: [
              'El vaso lesionado reduce su calibre, con lo que disminuye el flujo por la zona.',
              'Las plaquetas se adhieren al sitio de la lesión y se agregan entre sí, formando un tapón inicial.',
              'Se activa una cadena de proteínas del plasma que termina formando una red de fibras.',
              'Esa red atrapa células y consolida el tapón, que pasa de ser frágil a ser estable.',
              'Más tarde, cuando el vaso se ha reparado, el organismo disuelve la red y restablece el flujo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos etapas con requisitos distintos', texto: 'El tapón inicial depende de las plaquetas; su consolidación depende de las proteínas del plasma, que fabrica el hígado. Por eso un problema en las plaquetas y un problema en la coagulación no son lo mismo, aunque los dos se manifiesten como tendencia al sangrado. Esta lección establece la diferencia; su valoración clínica pertenece a los módulos 4 y 5.' },
        ],
      },
      F([aaos(5, 'Sistema circulatorio (apartado 5.7, La sangre y sus componentes)', 163), guyton(33, 'Eritrocitos, anemia y policitemia', 251), guyton(37, 'Hemostasia y coagulación sanguínea', 273)]),
    ],
    conceptosClave: [
      { termino: 'Plasma', definicion: 'Parte líquida de la sangre: agua con proteínas, electrolitos, nutrientes, gases y desechos disueltos. Es el compartimiento intravascular.' },
      { termino: 'Eritrocito', definicion: 'Célula sin núcleo, ocupada casi por completo por el pigmento que transporta oxígeno; ha sacrificado la capacidad de dividirse por capacidad de carga.' },
      { termino: 'Leucocito', definicion: 'Célula sanguínea con núcleo, de varios tipos, encargada de la defensa y de la inflamación.' },
      { termino: 'Plaqueta', definicion: 'Fragmento celular sin núcleo que forma el tapón inicial en la detención de una hemorragia.' },
      { termino: 'Célula precursora común', definicion: 'Célula de la médula ósea capaz de originar cualquiera de las líneas sanguíneas; explica que una alteración medular afecte a varias a la vez.' },
      { termino: 'Dos etapas de la hemostasia', definicion: 'Tapón inicial dependiente de las plaquetas y consolidación dependiente de las proteínas del plasma que fabrica el hígado.' },
    ],
    flashcards: [
      { frente: '¿Qué dos grandes componentes tiene la sangre?', reverso: 'El plasma, que es la parte líquida, y los elementos formes: eritrocitos, leucocitos y plaquetas.' },
      { frente: '¿Por qué el eritrocito no tiene núcleo?', reverso: 'Lo pierde al madurar para que su interior lo ocupe el pigmento transportador de oxígeno: sacrifica división por capacidad de carga.' },
      { frente: '¿Dónde se producen las células de la sangre?', reverso: 'En la médula ósea, a partir de una célula precursora común a todas las líneas.' },
      { frente: '¿Qué forma el tapón inicial de una hemorragia?', reverso: 'Las plaquetas, adhiriéndose a la lesión y agregándose entre sí.' },
      { frente: '¿Qué consolida ese tapón?', reverso: 'Una red de fibras formada por una cadena de proteínas del plasma, que fabrica el hígado.' },
      { frente: '¿Cómo enlaza esta lección con la del sistema urinario?', reverso: 'El riñón produce una sustancia que estimula la formación de eritrocitos.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente presenta tendencia al sangrado. Según esta lección, ¿por qué no basta con decir «tiene un problema de coagulación»?',
        opciones: [
          'Porque el sangrado nunca depende de la sangre.',
          'Porque el tapón inicial depende de las plaquetas y su consolidación de las proteínas del plasma: son dos etapas con requisitos distintos.',
          'Porque la coagulación depende solo del calibre del vaso.',
          'Porque las plaquetas fabrican las proteínas del plasma.',
        ],
        correcta: 1,
        explicacion: 'Un problema plaquetario y un problema de las proteínas de la coagulación se manifiestan igual pero no son lo mismo.',
      },
      {
        pregunta: '¿Por qué una alteración de la médula ósea puede afectar a eritrocitos, leucocitos y plaquetas a la vez?',
        opciones: [
          'Porque las tres líneas circulan juntas.',
          'Porque todas proceden de una célula precursora común en la médula.',
          'Porque el plasma las transporta.',
          'Porque comparten el mismo tiempo de vida.',
        ],
        correcta: 1,
        explicacion: 'Comparten origen, y esa organización explica que una alteración medular repercuta en varias líneas.',
      },
      {
        pregunta: '¿Qué componente de la sangre sostiene la presión oncótica?',
        opciones: [
          'Los eritrocitos.',
          'Las proteínas del plasma.',
          'Las plaquetas.',
          'Los electrolitos disueltos.',
        ],
        correcta: 1,
        explicacion: 'Es la misma idea de la lección de líquidos y electrolitos, ahora mirada desde la composición de la sangre.',
      },
      {
        pregunta: 'Tras repararse el vaso, ¿qué ocurre con la red de fibras que consolidó el tapón?',
        opciones: [
          'Permanece de forma definitiva.',
          'El organismo la disuelve y restablece el flujo.',
          'Se convierte en plaquetas.',
          'Se acumula en la médula ósea.',
        ],
        correcta: 1,
        explicacion: 'Es el último paso de la secuencia: la disolución de la red y el restablecimiento del flujo.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia real de detención de una hemorragia',
        pasos: [
          'El vaso lesionado reduce su calibre y disminuye el flujo',
          'Las plaquetas se adhieren a la lesión y se agregan formando un tapón inicial',
          'Se activa la cadena de proteínas del plasma',
          'Se forma una red de fibras que atrapa células',
          'El tapón pasa de frágil a estable',
          'Reparado el vaso, el organismo disuelve la red y restablece el flujo',
        ],
      },
      completar: [
        {
          texto: 'El fragmento celular sin núcleo que forma el tapón inicial de una hemorragia es la ___.',
          opciones: ['eritrocito', 'plaqueta', 'leucocito', 'proteína plasmática'],
          correcta: 1,
          explicacion: 'La consolidación posterior depende de las proteínas del plasma.',
        },
        {
          texto: 'Todas las células de la sangre se producen en la ___ a partir de una célula precursora común.',
          opciones: ['sangre circulante', 'médula ósea', 'vesícula biliar', 'corteza renal'],
          correcta: 1,
          explicacion: 'Es una de las funciones no mecánicas del hueso enunciadas en la lección del sistema óseo.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 5.7; Guyton y Hall, 13.ª ed., caps. 33 y 37',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 5, apartado 5.7, p. 163.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 33, p. 251 y cap. 37, p. 273.',
      ],
      extra: [
        'No se publican recuentos celulares, valores de hemoglobina ni tiempos de coagulación: son '
          + 'cifras de laboratorio que dependen de población y método.',
        'Los grupos sanguíneos y la transfusión no se desarrollan: el PDF no los sitúa en esta unidad.',
        'La valoración clínica de la tendencia al sangrado pertenece a los módulos 4 y 5.',
      ],
    }),
  },

  // ============================================================
  //  Sistema linfático e inmunitario
  // ============================================================
  'm2-ao-linfatico-inmunitario': {
    icono: '🛡️',
    duracion: '20 min',
    resumen: 'Por qué existe una segunda red de vasos además de la sanguínea, y en qué se diferencian las '
      + 'dos formas que tiene el cuerpo de defenderse.',
    objetivos: [
      'Explicar el origen de la linfa y el recorrido del sistema linfático.',
      'Relacionar los órganos linfáticos con su función.',
      'Diferenciar la defensa innata de la adaptativa.',
      'Justificar por qué la respuesta adaptativa mejora con la exposición previa.',
    ],
    secciones: [
      {
        titulo: 'Por qué hace falta una segunda red',
        bloques: [
          { tipo: 'p', texto: 'En la lección de líquidos y electrolitos quedó establecido que en el capilar salen y entran líquidos según el equilibrio entre la presión hidrostática y la oncótica. Ese equilibrio no es exacto: sale algo más líquido del que vuelve a entrar, y ese excedente quedaría acumulado en el intersticio si nada lo retirara.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El sistema linfático es el desagüe del intersticio', texto: 'Recoge ese excedente, lo llama linfa y lo devuelve a la circulación sanguínea. No es un circuito cerrado como el sanguíneo: es un sistema de drenaje que empieza en los tejidos y termina desembocando en las venas grandes del tórax.' },
          {
            tipo: 'lista',
            titulo: 'Cómo avanza la linfa sin una bomba propia',
            items: [
              'Por la contracción de los músculos que rodean los vasos linfáticos, que los comprimen al moverse.',
              'Por los cambios de presión que produce la respiración en el tórax.',
              'Por válvulas dentro de los vasos, que impiden el retroceso y dan un solo sentido al flujo.',
            ],
          },
          { tipo: 'p', texto: 'El sistema linfático cumple además otras dos tareas: transporta parte de las grasas absorbidas en el intestino —lo que enlaza con la lección del sistema digestivo— y aloja a las células de la defensa, que es su función más conocida.' },
        ],
      },
      {
        titulo: 'Los órganos linfáticos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Estructura y función',
            headers: ['Órgano', 'Función'],
            filas: [
              ['Ganglios linfáticos', 'Filtran la linfa y albergan células de defensa; se distribuyen a lo largo de los vasos linfáticos'],
              ['Bazo', 'Filtra la sangre, retira eritrocitos envejecidos y participa en la respuesta inmunitaria'],
              ['Timo', 'Madura una de las líneas de células de defensa; es prominente en la infancia'],
              ['Amígdalas y tejido linfoide de las mucosas', 'Vigilan las puertas de entrada del organismo'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué un ganglio se agranda', texto: 'Un ganglio aumenta de tamaño cuando la actividad de defensa en su territorio de drenaje aumenta. Como cada ganglio drena una región concreta, su localización orienta sobre dónde está ocurriendo esa actividad. Este módulo establece la relación anatómica; qué significa clínicamente cada hallazgo pertenece a los módulos de valoración.' },
        ],
      },
      {
        titulo: 'Dos formas de defenderse',
        bloques: [
          { tipo: 'p', texto: 'El organismo se defiende de dos maneras que actúan a la vez y con lógicas distintas. La primera responde igual ante cualquier agresor y actúa de inmediato; la segunda reconoce agresores concretos, tarda más la primera vez y guarda memoria de lo ocurrido.' },
          {
            tipo: 'tabla',
            titulo: 'Innata frente a adaptativa',
            headers: ['', 'Innata', 'Adaptativa'],
            filas: [
              ['Especificidad', 'Responde igual ante cualquier agresor', 'Reconoce agresores concretos'],
              ['Rapidez', 'Inmediata', 'Más lenta la primera vez'],
              ['Memoria', 'No guarda memoria', 'Guarda memoria: la segunda respuesta es más rápida e intensa'],
              ['Componentes', 'Barreras como la piel y las mucosas, la inflamación y células que engloban microorganismos', 'Células que reconocen agresores concretos y proteínas dirigidas contra ellos'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La memoria es lo que cambia todo', texto: 'Que la respuesta adaptativa guarde memoria significa que un segundo encuentro con el mismo agresor se resuelve más rápido y con menos daño. Es el fundamento de la inmunidad adquirida tras haber pasado una enfermedad y el principio en que se basa la vacunación. Este módulo se detiene en el mecanismo; los calendarios y las indicaciones de vacunación no pertenecen a esta unidad.' },
          { tipo: 'p', texto: 'Conviene notar que la piel y las mucosas, estudiadas en la lección del tegumento como barrera, son parte de la defensa innata. La primera línea de defensa del organismo no es inmunológica en sentido estricto: es anatómica.' },
        ],
      },
      F([aaos(6, 'Sistemas linfático e inmunológico', 177), guyton(16, 'La microcirculación y el sistema linfático: intercambio de líquido capilar, líquido intersticial y flujo linfático', 103), guyton(35, 'Resistencia del organismo a la infección: inmunidad y alergia', 262)]),
    ],
    conceptosClave: [
      { termino: 'Linfa', definicion: 'Excedente de líquido que sale del capilar y no vuelve a entrar; el sistema linfático lo recoge y lo devuelve a la circulación sanguínea.' },
      { termino: 'Sistema de drenaje, no circuito cerrado', definicion: 'Organización del sistema linfático: empieza en los tejidos y desemboca en las venas grandes del tórax, sin bomba propia.' },
      { termino: 'Ganglio linfático', definicion: 'Estructura que filtra la linfa y alberga células de defensa; drena una región concreta, de modo que su localización orienta sobre dónde hay actividad.' },
      { termino: 'Defensa innata', definicion: 'Responde igual ante cualquier agresor, actúa de inmediato y no guarda memoria; incluye la piel y las mucosas como barrera.' },
      { termino: 'Defensa adaptativa', definicion: 'Reconoce agresores concretos, es más lenta la primera vez y guarda memoria, de modo que el segundo encuentro se resuelve mejor.' },
      { termino: 'Memoria inmunitaria', definicion: 'Capacidad de la respuesta adaptativa de responder más rápido e intensamente ante un agresor ya conocido.' },
    ],
    flashcards: [
      { frente: '¿De dónde sale la linfa?', reverso: 'Del excedente de líquido que sale del capilar y no vuelve a entrar en él.' },
      { frente: '¿Cómo avanza la linfa si no hay bomba?', reverso: 'Por la contracción de los músculos que rodean sus vasos, por los cambios de presión de la respiración y por válvulas que impiden el retroceso.' },
      { frente: '¿Qué filtra el bazo y qué filtran los ganglios?', reverso: 'El bazo filtra la sangre; los ganglios filtran la linfa.' },
      { frente: '¿Qué distingue a la defensa innata de la adaptativa?', reverso: 'La innata responde igual ante cualquier agresor, es inmediata y no guarda memoria; la adaptativa reconoce agresores concretos y sí la guarda.' },
      { frente: '¿Cuál es la primera línea de defensa del organismo?', reverso: 'La piel y las mucosas: anatómica antes que inmunológica, y parte de la defensa innata.' },
      { frente: '¿Qué otra función tiene el sistema linfático además de la defensa y el drenaje?', reverso: 'Transportar parte de las grasas absorbidas en el intestino.' },
    ],
    quiz: [
      {
        pregunta: '¿Por qué el organismo necesita un sistema linfático además del sanguíneo?',
        opciones: [
          'Porque el sistema sanguíneo no llega a todos los tejidos.',
          'Porque en el capilar sale algo más líquido del que vuelve a entrar, y ese excedente debe retirarse del intersticio.',
          'Porque transporta oxígeno de forma alternativa.',
          'Porque produce las células sanguíneas.',
        ],
        correcta: 1,
        explicacion: 'El equilibrio entre presión hidrostática y oncótica no es exacto; el sistema linfático es el desagüe del intersticio.',
      },
      {
        pregunta: 'Un ganglio linfático de una región aumenta de tamaño. ¿Qué orienta ese hallazgo?',
        opciones: [
          'Que el sistema linfático ha perdido sus válvulas.',
          'Que la actividad de defensa ha aumentado en el territorio que ese ganglio drena.',
          'Que el bazo ha dejado de filtrar la sangre.',
          'Que la respuesta adaptativa ha perdido su memoria.',
        ],
        correcta: 1,
        explicacion: 'Cada ganglio drena una región concreta, y por eso su localización orienta sobre dónde ocurre la actividad.',
      },
      {
        pregunta: '¿Por qué la respuesta adaptativa es más eficaz en un segundo encuentro con el mismo agresor?',
        opciones: [
          'Porque el agresor se debilita con el tiempo.',
          'Porque guarda memoria del primer encuentro y responde más rápido e intensamente.',
          'Porque la defensa innata la sustituye.',
          'Porque las barreras anatómicas se refuerzan.',
        ],
        correcta: 1,
        explicacion: 'La memoria es lo que distingue a la respuesta adaptativa y el fundamento de la inmunidad adquirida.',
      },
      {
        pregunta: 'La piel actúa como barrera frente a microorganismos. ¿A qué tipo de defensa pertenece?',
        opciones: [
          'A la adaptativa, porque reconoce agresores concretos.',
          'A la innata: responde igual ante cualquier agresor y actúa de inmediato.',
          'A ninguna: la piel no participa en la defensa.',
          'A la adaptativa, porque guarda memoria.',
        ],
        correcta: 1,
        explicacion: 'La primera línea de defensa no es inmunológica en sentido estricto, sino anatómica, y forma parte de la innata.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El excedente de líquido que sale del capilar y no vuelve a entrar en él se llama ___.',
          opciones: ['plasma', 'linfa', 'suero', 'líquido intracelular'],
          correcta: 1,
          explicacion: 'El sistema linfático lo recoge y lo devuelve a la circulación sanguínea.',
        },
        {
          texto: 'El órgano linfático que filtra la SANGRE y retira eritrocitos envejecidos es el ___.',
          opciones: ['ganglio linfático', 'bazo', 'timo', 'amígdala'],
          correcta: 1,
          explicacion: 'Los ganglios filtran la linfa; el bazo filtra la sangre.',
        },
        {
          texto: 'La defensa que reconoce agresores concretos, tarda más la primera vez y guarda memoria es la ___.',
          opciones: ['innata', 'adaptativa', 'barrera cutánea', 'inflamatoria'],
          correcta: 1,
          explicacion: 'La innata responde igual ante cualquier agresor, es inmediata y no guarda memoria.',
        },
        {
          texto: 'Además de drenar y defender, el sistema linfático transporta parte de las ___ absorbidas en el intestino.',
          opciones: ['proteínas', 'grasas', 'sales minerales', 'vitaminas hidrosolubles'],
          correcta: 1,
          explicacion: 'Es el vínculo con la lección del sistema digestivo.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 6; Guyton y Hall, 13.ª ed., caps. 16 y 35',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 6, p. 177.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 16, p. 103 y cap. 35, p. 262.',
      ],
      extra: [
        'No se nombran tipos celulares concretos de la respuesta adaptativa ni clases de anticuerpos: '
          + 'la lección enseña la diferencia entre las dos formas de defensa y el papel de la memoria.',
        'No se incluyen calendarios ni indicaciones de vacunación: no pertenecen a esta unidad.',
        'La anafilaxia y las reacciones alérgicas pertenecen al Módulo 4 y se declaran fuera de alcance.',
      ],
    }),
  },

  // ============================================================
  //  Sistema reproductor masculino y femenino
  // ============================================================
  'm2-ao-reproductor': {
    icono: '⚕️',
    duracion: '20 min',
    resumen: 'Los órganos reproductores masculinos y femeninos, la función de cada uno y el ciclo que '
      + 'prepara al organismo femenino para un posible embarazo.',
    objetivos: [
      'Identificar los órganos reproductores masculinos y su función.',
      'Identificar los órganos reproductores femeninos y su función.',
      'Diferenciar las gónadas de las vías y de las glándulas accesorias.',
      'Describir en orden las fases del ciclo reproductor femenino.',
    ],
    secciones: [
      {
        titulo: 'Una organización común',
        bloques: [
          { tipo: 'p', texto: 'Aunque los órganos son distintos, ambos sistemas reproductores comparten la misma organización en tres tipos de elementos. Reconocerla evita estudiarlos como dos listas independientes.' },
          {
            tipo: 'tabla',
            titulo: 'Los tres tipos de elemento',
            headers: ['Elemento', 'Qué hace', 'En el varón', 'En la mujer'],
            filas: [
              ['Gónadas', 'Producen las células reproductoras y hormonas sexuales', 'Testículos', 'Ovarios'],
              ['Vías', 'Conducen las células reproductoras', 'Epidídimo, conducto deferente y uretra', 'Trompas uterinas, útero y vagina'],
              ['Glándulas accesorias y estructuras asociadas', 'Aportan secreciones o cumplen funciones complementarias', 'Vesículas seminales y próstata', 'Glándulas vestibulares; el útero además aloja el desarrollo'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Las gónadas hacen dos cosas', texto: 'Producen células reproductoras y además producen hormonas. Esa doble función explica por qué el sistema reproductor aparece también en la lección del sistema endocrino: es un sistema reproductor y una glándula a la vez.' },
        ],
      },
      {
        titulo: 'Sistema reproductor masculino',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Órganos y función',
            headers: ['Órgano', 'Función'],
            filas: [
              ['Testículos', 'Producen las células reproductoras masculinas y la hormona sexual masculina'],
              ['Escroto', 'Aloja los testículos fuera de la cavidad corporal, lo que mantiene una temperatura menor que la interna'],
              ['Epidídimo', 'Almacena y madura las células reproductoras'],
              ['Conducto deferente', 'Las conduce desde el epidídimo hacia la uretra'],
              ['Vesículas seminales y próstata', 'Aportan secreciones que forman parte del semen'],
              ['Pene y uretra', 'Vía común de salida de orina y semen'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Estructura y función en el escroto', texto: 'Que los testículos estén fuera de la cavidad corporal no es un detalle anatómico curioso: la producción de células reproductoras requiere una temperatura menor que la interna, y el escroto la proporciona. Es un ejemplo de que la posición de un órgano puede ser en sí misma una función.' },
        ],
      },
      {
        titulo: 'Sistema reproductor femenino',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Órganos y función',
            headers: ['Órgano', 'Función'],
            filas: [
              ['Ovarios', 'Producen las células reproductoras femeninas y las hormonas sexuales femeninas'],
              ['Trompas uterinas', 'Recogen la célula liberada por el ovario y la conducen hacia el útero; es donde suele ocurrir la fecundación'],
              ['Útero', 'Aloja y sostiene el desarrollo; su capa muscular es la que se contrae en el parto'],
              ['Vagina', 'Vía de salida y de comunicación con el exterior'],
              ['Vulva y glándulas vestibulares', 'Estructuras externas y secreciones asociadas'],
            ],
          },
          { tipo: 'p', texto: 'La pared del útero tiene una capa interna que se prepara cada ciclo para recibir un posible embarazo y una capa muscular gruesa. Esa capa muscular es músculo liso, el mismo tipo estudiado en la lección del sistema muscular, y es la que produce las contracciones del parto.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Alcance de esta lección', texto: 'Aquí se establece la estructura y la función. El embarazo, sus cambios fisiológicos, la atención al parto y sus complicaciones pertenecen al Módulo 4, donde el plan sitúa las urgencias gineco-obstétricas, y al Módulo 6. Nada de eso se adelanta.' },
        ],
      },
      {
        titulo: 'El ciclo reproductor femenino',
        bloques: [
          { tipo: 'p', texto: 'De forma cíclica, el organismo femenino prepara la liberación de una célula reproductora y acondiciona el útero para un posible embarazo. Si no se produce, la capa interna preparada se desprende y el ciclo vuelve a empezar. El proceso está gobernado por hormonas y tiene un orden constante.' },
          {
            tipo: 'pasos',
            titulo: 'Las fases, en orden',
            items: [
              'Menstruación: se desprende la capa interna del útero preparada en el ciclo anterior.',
              'Fase de maduración: en el ovario madura una célula reproductora y la capa interna del útero comienza a engrosarse.',
              'Ovulación: el ovario libera la célula reproductora, que es recogida por la trompa uterina.',
              'Fase posterior a la ovulación: la capa interna del útero completa su preparación para recibir un posible embarazo.',
              'Si no hay embarazo, la preparación se interrumpe y comienza de nuevo la menstruación.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué la fecundación ocurre en la trompa', texto: 'La célula liberada por el ovario es recogida por la trompa uterina y avanza por ella hacia el útero. Ese trayecto es donde suele encontrarse con la célula masculina, y por eso la trompa —y no el útero— es el lugar habitual de la fecundación. Es una consecuencia directa de la anatomía del recorrido.' },
        ],
      },
      F([aaos(11, 'Sistema reproductor y genética (apartados 11.2 y 11.3)', 276), guyton(81, 'Funciones reproductoras y hormonales masculinas', 588), guyton(82, 'Fisiología femenina antes del embarazo y hormonas femeninas', 593)]),
    ],
    conceptosClave: [
      { termino: 'Gónadas', definicion: 'Órganos que producen las células reproductoras y las hormonas sexuales: testículos en el varón y ovarios en la mujer.' },
      { termino: 'Doble función gonadal', definicion: 'Las gónadas producen células reproductoras y hormonas, por lo que el sistema reproductor es también una glándula endocrina.' },
      { termino: 'Escroto', definicion: 'Estructura que aloja los testículos fuera de la cavidad corporal para mantener una temperatura menor que la interna, condición de la producción de células reproductoras.' },
      { termino: 'Trompa uterina', definicion: 'Vía que recoge la célula liberada por el ovario y la conduce al útero; es el lugar habitual de la fecundación por la anatomía del recorrido.' },
      { termino: 'Capa muscular del útero', definicion: 'Músculo liso de la pared uterina, responsable de las contracciones del parto.' },
      { termino: 'Ciclo reproductor femenino', definicion: 'Secuencia hormonal constante de menstruación, maduración, ovulación y preparación posterior del útero.' },
    ],
    flashcards: [
      { frente: '¿Qué dos cosas producen las gónadas?', reverso: 'Las células reproductoras y las hormonas sexuales; por eso el sistema reproductor es también una glándula endocrina.' },
      { frente: '¿Por qué los testículos están fuera de la cavidad corporal?', reverso: 'Porque la producción de células reproductoras requiere una temperatura menor que la interna, y el escroto la proporciona.' },
      { frente: '¿Dónde suele ocurrir la fecundación y por qué?', reverso: 'En la trompa uterina, porque es el trayecto que recorre la célula liberada por el ovario hacia el útero.' },
      { frente: '¿Qué tipo de músculo forma la capa que se contrae en el parto?', reverso: 'Músculo liso, el mismo tipo estudiado en la lección del sistema muscular.' },
      { frente: '¿Qué ocurre si no hay embarazo tras la ovulación?', reverso: 'La preparación de la capa interna del útero se interrumpe y comienza de nuevo la menstruación.' },
      { frente: '¿Cuál es la organización común a ambos sistemas?', reverso: 'Gónadas que producen, vías que conducen y glándulas accesorias o estructuras asociadas.' },
    ],
    quiz: [
      {
        pregunta: '¿Por qué el sistema reproductor aparece también en la lección del sistema endocrino?',
        opciones: [
          'Por un solapamiento del temario.',
          'Porque las gónadas producen hormonas además de células reproductoras: son un sistema reproductor y una glándula a la vez.',
          'Porque el útero produce hormonas hipofisarias.',
          'Porque las vías conducen hormonas en vez de células.',
        ],
        correcta: 1,
        explicacion: 'Esa doble función gonadal es lo que conecta ambos temas.',
      },
      {
        pregunta: 'La posición del escroto fuera de la cavidad corporal, ¿qué función cumple?',
        opciones: [
          'Facilitar el paso de la orina.',
          'Mantener una temperatura menor que la interna, condición de la producción de células reproductoras.',
          'Almacenar las secreciones de la próstata.',
          'Ninguna: es solo una disposición anatómica.',
        ],
        correcta: 1,
        explicacion: 'Es un ejemplo de que la posición de un órgano puede ser en sí misma una función.',
      },
      {
        pregunta: '¿Por qué la fecundación ocurre habitualmente en la trompa uterina y no en el útero?',
        opciones: [
          'Porque el útero no permite el paso de células reproductoras.',
          'Porque la trompa es el trayecto que recorre la célula liberada por el ovario hacia el útero, y allí suele encontrarse con la célula masculina.',
          'Porque el ovario libera la célula directamente en la trompa y allí se detiene.',
          'Porque el útero está ocupado por su capa muscular.',
        ],
        correcta: 1,
        explicacion: 'Es una consecuencia directa de la anatomía del recorrido.',
      },
      {
        pregunta: 'En la organización común a ambos sistemas, ¿qué elemento corresponde al epidídimo y a la trompa uterina?',
        opciones: [
          'Las gónadas.',
          'Las vías que conducen las células reproductoras.',
          'Las glándulas accesorias.',
          'Las estructuras externas.',
        ],
        correcta: 1,
        explicacion: 'Las gónadas son testículos y ovarios; las glándulas accesorias son las vesículas seminales, la próstata y las vestibulares.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena las fases del ciclo reproductor femenino',
        pasos: [
          'Menstruación: se desprende la capa interna preparada en el ciclo anterior',
          'Maduración de la célula reproductora en el ovario y engrosamiento de la capa interna',
          'Ovulación: el ovario libera la célula y la trompa la recoge',
          'La capa interna del útero completa su preparación',
          'Sin embarazo, la preparación se interrumpe y comienza de nuevo la menstruación',
        ],
      },
      completar: [
        {
          texto: 'En la organización común de ambos sistemas, los testículos y los ovarios son las ___.',
          opciones: ['vías', 'gónadas', 'glándulas accesorias', 'estructuras externas'],
          correcta: 1,
          explicacion: 'Producen las células reproductoras y las hormonas sexuales.',
        },
        {
          texto: 'La estructura que aloja y sostiene el desarrollo y cuya capa muscular se contrae en el parto es el ___.',
          opciones: ['ovario', 'útero', 'epidídimo', 'conducto deferente'],
          correcta: 1,
          explicacion: 'Su capa muscular es músculo liso, el mismo tipo de la lección del sistema muscular.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 11; Guyton y Hall, 13.ª ed., caps. 81 y 82',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 11, apartados 11.2 (p. 276) y 11.3 (p. 282).',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 81, p. 588 y cap. 82, p. 593.',
      ],
      extra: [
        'No se publica la duración del ciclo ni el día de la ovulación: son cifras con variabilidad '
          + 'individual amplia y la lección enseña la secuencia, que es constante.',
        'No se nombran hormonas concretas del ciclo: se enseña que el proceso es hormonal y con orden '
          + 'constante. Su detalle pertenece al tema endocrino y a los módulos clínicos.',
        'El embarazo, el parto y las urgencias gineco-obstétricas pertenecen a los módulos 4 y 6 y se '
          + 'declaran expresamente fuera de alcance.',
      ],
    }),
  },

  // ============================================================
  //  Órganos de los sentidos
  // ============================================================
  'm2-ao-sentidos': {
    icono: '👁️',
    duracion: '20 min',
    resumen: 'Cómo convierten los órganos de los sentidos un estímulo físico en una señal nerviosa, y qué '
      + 'estructura se encarga de cada tipo de estímulo.',
    objetivos: [
      'Explicar qué hace un receptor sensorial y por qué todos comparten un mismo principio.',
      'Relacionar cada órgano de los sentidos con el estímulo que detecta.',
      'Describir el recorrido de la luz y del sonido hasta su receptor.',
      'Diferenciar la audición del equilibrio dentro del mismo órgano.',
    ],
    secciones: [
      {
        titulo: 'Un principio común',
        bloques: [
          { tipo: 'p', texto: 'Los órganos de los sentidos son muy distintos entre sí, pero todos hacen lo mismo: convertir una forma de energía del entorno en una señal nerviosa que el sistema nervioso pueda interpretar. Las células que realizan esa conversión se llaman receptores, y cada tipo responde a una forma de energía concreta.' },
          {
            tipo: 'tabla',
            titulo: 'Qué detecta cada uno',
            headers: ['Órgano o receptor', 'Forma de energía que detecta', 'Sensación que produce'],
            filas: [
              ['Ojo', 'Luz', 'Visión'],
              ['Oído: parte auditiva', 'Vibraciones del aire', 'Audición'],
              ['Oído: parte vestibular', 'Posición y movimiento de la cabeza', 'Equilibrio'],
              ['Lengua', 'Sustancias químicas disueltas', 'Gusto'],
              ['Mucosa olfatoria', 'Sustancias químicas volátiles', 'Olfato'],
              ['Piel', 'Contacto, presión, temperatura y estímulos que dañan el tejido', 'Tacto, presión, temperatura y dolor'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La señal es siempre la misma; lo que cambia es la vía', texto: 'Todos los receptores producen potenciales de acción, y un potencial de acción es igual venga de donde venga. Que una señal se interprete como luz y otra como sonido no depende de la señal, sino de la vía por la que llega y de la región del cerebro que la recibe. Es una idea potente y contraintuitiva.' },
        ],
      },
      {
        titulo: 'El ojo y el recorrido de la luz',
        bloques: [
          { tipo: 'p', texto: 'La luz debe atravesar varias estructuras transparentes antes de llegar a los receptores, y cada una cumple una función en ese recorrido.' },
          {
            tipo: 'tabla',
            titulo: 'Estructura y función en el ojo',
            headers: ['Estructura', 'Función'],
            filas: [
              ['Córnea', 'Cubierta anterior transparente; empieza a desviar la luz para enfocarla'],
              ['Iris y pupila', 'El iris regula el tamaño de la pupila y con ello cuánta luz entra'],
              ['Cristalino', 'Ajusta el enfoque según la distancia del objeto'],
              ['Retina', 'Contiene los receptores que convierten la luz en señal nerviosa'],
              ['Nervio óptico', 'Conduce la señal desde la retina hacia el cerebro'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La pupila es un dato observable', texto: 'Su tamaño depende del iris, que está controlado por el sistema autónomo: el simpático la dilata y el parasimpático la contrae, como se estableció en la lección del sistema nervioso. Por eso la pupila es una ventana visible al estado de ese control. Cómo se explora y qué significa cada hallazgo pertenece a los módulos de valoración; aquí se establece por qué es observable.' },
        ],
      },
      {
        titulo: 'El oído: dos funciones en un órgano',
        bloques: [
          { tipo: 'p', texto: 'El oído aloja dos sistemas distintos que comparten localización pero no función: uno detecta sonido y otro detecta la posición y el movimiento de la cabeza.' },
          {
            tipo: 'pasos',
            titulo: 'Recorrido del sonido',
            items: [
              'La oreja recoge las vibraciones del aire y las conduce por el conducto auditivo.',
              'Las vibraciones hacen vibrar una membrana tensada al final del conducto.',
              'Esa vibración se transmite y se amplifica a través de una cadena de huesecillos del oído medio.',
              'La vibración llega a una estructura llena de líquido en el oído interno y lo pone en movimiento.',
              'El movimiento del líquido estimula los receptores, que generan la señal nerviosa.',
              'El nervio correspondiente conduce esa señal hacia el cerebro.',
            ],
          },
          { tipo: 'p', texto: 'La parte vestibular, alojada junto a la auditiva, contiene estructuras con líquido y receptores que detectan la posición de la cabeza y sus cambios de movimiento. Es el órgano del equilibrio, e informa al sistema nervioso de la orientación del cuerpo en el espacio.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Compartir sede explica una relación frecuente', texto: 'Que audición y equilibrio ocupen el mismo órgano explica que puedan alterarse a la vez. Este módulo se limita a establecer la vecindad anatómica y la diferencia funcional; la interpretación de los síntomas pertenece a los módulos clínicos.' },
        ],
      },
      {
        titulo: 'Gusto, olfato y sensibilidad de la piel',
        bloques: [
          { tipo: 'p', texto: 'El gusto y el olfato detectan sustancias químicas: el gusto las detecta disueltas y en contacto con la lengua, y el olfato las detecta volátiles en el aire inspirado. Ambos están estrechamente relacionados, y por eso la percepción del sabor se altera cuando el olfato está bloqueado.' },
          { tipo: 'p', texto: 'La piel contiene receptores para varias formas de estímulo, estudiados ya en la lección del tegumento como parte de la dermis. Entre ellos están los que detectan estímulos capaces de dañar el tejido, que producen la sensación de dolor.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El dolor es información, no solo molestia', texto: 'Los receptores que producen dolor informan de que un tejido está siendo dañado o está en riesgo. Desde el punto de vista funcional es un sistema de aviso: su localización y su carácter señalan de dónde procede el problema. Cómo se valora e interpreta esa información pertenece a los módulos de valoración y clínica.' },
        ],
      },
      F([aaos(14, 'Sistemas sensoriales especiales', 339), guyton(50, 'El ojo: óptica de la visión', 361), guyton(53, 'El sentido de la audición', 381), guyton(49, 'Sensibilidades somáticas: dolor, cefalea y sensibilidad térmica', 352)]),
    ],
    conceptosClave: [
      { termino: 'Receptor sensorial', definicion: 'Célula que convierte una forma de energía del entorno en una señal nerviosa; cada tipo responde a una forma concreta.' },
      { termino: 'Especificidad por la vía', definicion: 'Principio por el que la interpretación de una señal no depende de la señal misma, sino de la vía que la conduce y de la región del cerebro que la recibe.' },
      { termino: 'Retina', definicion: 'Capa del ojo que contiene los receptores que convierten la luz en señal nerviosa.' },
      { termino: 'Iris y pupila', definicion: 'El iris regula el tamaño de la pupila y con ello la entrada de luz; está controlado por el sistema autónomo, lo que hace de la pupila un dato observable.' },
      { termino: 'Parte vestibular del oído', definicion: 'Estructuras con líquido y receptores que detectan la posición y el movimiento de la cabeza; es el órgano del equilibrio.' },
      { termino: 'Receptores del dolor', definicion: 'Receptores que informan de que un tejido está siendo dañado o está en riesgo; funcionan como sistema de aviso.' },
    ],
    flashcards: [
      { frente: '¿Qué hacen todos los receptores sensoriales, sean del sentido que sean?', reverso: 'Convertir una forma de energía del entorno en una señal nerviosa.' },
      { frente: '¿Por qué una señal se interpreta como luz y otra como sonido?', reverso: 'No por la señal, que es igual, sino por la vía que la conduce y la región del cerebro que la recibe.' },
      { frente: '¿Qué estructura del ojo contiene los receptores?', reverso: 'La retina.' },
      { frente: '¿Qué controla el tamaño de la pupila?', reverso: 'El iris, gobernado por el sistema autónomo: el simpático la dilata y el parasimpático la contrae.' },
      { frente: '¿Qué dos funciones distintas aloja el oído?', reverso: 'La audición, en su parte auditiva, y el equilibrio, en su parte vestibular.' },
      { frente: '¿Por qué el sabor se altera cuando el olfato está bloqueado?', reverso: 'Porque gusto y olfato detectan sustancias químicas y están estrechamente relacionados.' },
    ],
    quiz: [
      {
        pregunta: 'Todos los receptores producen potenciales de acción iguales. ¿Cómo distingue entonces el cerebro la luz del sonido?',
        opciones: [
          'Por la intensidad de la señal.',
          'Por la vía que conduce la señal y la región del cerebro que la recibe.',
          'Porque los receptores del ojo producen una señal distinta.',
          'Por la velocidad de conducción del nervio.',
        ],
        correcta: 1,
        explicacion: 'Es el principio de especificidad por la vía: la señal es la misma y lo que cambia es su recorrido y su destino.',
      },
      {
        pregunta: '¿Qué estructura del ojo ajusta el enfoque según la distancia del objeto?',
        opciones: [
          'La córnea.',
          'El cristalino.',
          'La retina.',
          'El iris.',
        ],
        correcta: 1,
        explicacion: 'La córnea empieza a desviar la luz, el iris regula cuánta entra y la retina contiene los receptores.',
      },
      {
        pregunta: '¿Qué convierte la vibración del aire en señal nerviosa en el oído?',
        opciones: [
          'La cadena de huesecillos del oído medio.',
          'Los receptores del oído interno, estimulados por el movimiento del líquido.',
          'La membrana tensada al final del conducto auditivo.',
          'La oreja, al recoger las vibraciones.',
        ],
        correcta: 1,
        explicacion: 'Los huesecillos transmiten y amplifican; la conversión ocurre en los receptores del oído interno.',
      },
      {
        pregunta: 'Desde el punto de vista funcional, ¿qué es el dolor?',
        opciones: [
          'Una molestia sin utilidad.',
          'Un sistema de aviso: informa de que un tejido está siendo dañado o está en riesgo, y su localización y carácter señalan de dónde procede.',
          'Una alteración del receptor de temperatura.',
          'Una consecuencia de la especificidad por la vía.',
        ],
        correcta: 1,
        explicacion: 'Los receptores del dolor informan de daño o riesgo tisular; su valoración clínica pertenece a otros módulos.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La capa del ojo que contiene los receptores que convierten la luz en señal nerviosa es la ___.',
          opciones: ['córnea', 'retina', 'pupila', 'esclerótica'],
          correcta: 1,
          explicacion: 'La córnea y el cristalino participan en el enfoque; el iris regula la entrada de luz.',
        },
        {
          texto: 'La parte del oído que detecta la posición y el movimiento de la cabeza es la parte ___.',
          opciones: ['auditiva', 'vestibular', 'media', 'externa'],
          correcta: 1,
          explicacion: 'Comparte localización con la auditiva pero no su función.',
        },
        {
          texto: 'El olfato detecta sustancias químicas ___ presentes en el aire inspirado, mientras el gusto las detecta disueltas.',
          opciones: ['disueltas', 'volátiles', 'sólidas', 'luminosas'],
          correcta: 1,
          explicacion: 'La estrecha relación entre ambos explica que el sabor se altere cuando el olfato está bloqueado.',
        },
        {
          texto: 'El iris está controlado por el sistema ___, y por eso el tamaño de la pupila es un dato observable de ese control.',
          opciones: ['somático', 'autónomo', 'linfático', 'endocrino'],
          correcta: 1,
          explicacion: 'El simpático la dilata y el parasimpático la contrae, como se vio en la lección del sistema nervioso.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 14; Guyton y Hall, 13.ª ed., caps. 49, 50 y 53',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 14, p. 339.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 50, p. 361; cap. 53, p. 381; cap. 49, p. 352.',
      ],
      extra: [
        'No se describe la exploración de las pupilas ni la interpretación de sus hallazgos: pertenecen '
          + 'a los módulos de valoración y clínica. Aquí solo se establece por qué la pupila es un dato '
          + 'observable.',
        'No se nombran tipos de receptores retinianos ni rangos de frecuencia audible: la lección '
          + 'enseña el principio de conversión y el recorrido.',
      ],
    }),
  },

  // ============================================================
  //  Sistema endocrino
  // ============================================================
  'm2-ao-endocrino': {
    icono: '🧪',
    duracion: '20 min',
    resumen: 'Cómo el cuerpo se comunica por mensajeros químicos, en qué se diferencia esa comunicación '
      + 'de la nerviosa y cómo se autorregula.',
    objetivos: [
      'Diferenciar la comunicación endocrina de la nerviosa.',
      'Relacionar las principales glándulas con la función que regulan.',
      'Explicar cómo funciona un mecanismo de retroalimentación negativa.',
      'Justificar por qué una hormona actúa solo sobre determinadas células.',
    ],
    secciones: [
      {
        titulo: 'Dos sistemas de comunicación',
        bloques: [
          { tipo: 'p', texto: 'El organismo dispone de dos sistemas para coordinar sus partes. El nervioso envía señales eléctricas por vías definidas y produce efectos rápidos y localizados. El endocrino libera mensajeros químicos —las hormonas— a la sangre, que los reparte por todo el cuerpo, con efectos más lentos pero más duraderos y generales.' },
          {
            tipo: 'tabla',
            titulo: 'Comparación',
            headers: ['', 'Sistema nervioso', 'Sistema endocrino'],
            filas: [
              ['Qué envía', 'Señales eléctricas y mensajeros en la sinapsis', 'Hormonas liberadas a la sangre'],
              ['Por dónde', 'Vías nerviosas definidas', 'La circulación sanguínea, hacia todo el cuerpo'],
              ['Rapidez', 'Inmediata', 'Más lenta'],
              ['Duración del efecto', 'Breve', 'Prolongada'],
              ['Alcance', 'Localizado y preciso', 'General, pero selectivo por el receptor'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué una hormona no afecta a todo el cuerpo', texto: 'La sangre la lleva a todas partes, pero solo actúa donde hay células con el receptor capaz de reconocerla. Esa es la clave de la selectividad: el mensaje llega a todos y solo lo entiende quien tiene el lector adecuado. Sin receptor no hay efecto, aunque la hormona esté presente.' },
        ],
      },
      {
        titulo: 'Las glándulas y lo que regulan',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Estructura y función',
            headers: ['Glándula', 'Qué regula'],
            filas: [
              ['Hipotálamo', 'Enlaza el sistema nervioso con el endocrino y controla la hipófisis'],
              ['Hipófisis', 'Coordina a otras glándulas mediante hormonas que las estimulan; regula además crecimiento y balance de agua'],
              ['Tiroides', 'Ritmo del metabolismo del organismo'],
              ['Paratiroides', 'Concentración de calcio'],
              ['Glándulas suprarrenales', 'Respuesta al estrés, balance de agua y sales, y respuesta rápida de alerta'],
              ['Páncreas endocrino', 'Concentración de glucosa en la sangre'],
              ['Gónadas', 'Funciones reproductoras y caracteres sexuales'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El hipotálamo es la bisagra', texto: 'Pertenece al sistema nervioso y gobierna al endocrino a través de la hipófisis. Esa conexión explica que una situación percibida por el sistema nervioso —un esfuerzo, una amenaza, un cambio de temperatura— pueda producir una respuesta hormonal sostenida. Los dos sistemas de comunicación no son independientes: están acoplados en ese punto.' },
          { tipo: 'p', texto: 'Conviene notar que las glándulas suprarrenales producen tanto mensajeros de acción rápida, que colaboran con el sistema nervioso simpático de la lección del sistema nervioso, como hormonas de acción sostenida. Un mismo órgano participa así en los dos ritmos de respuesta del organismo.' },
        ],
      },
      {
        titulo: 'Cómo se autorregula',
        bloques: [
          { tipo: 'p', texto: 'El sistema endocrino no funciona por órdenes sueltas, sino en circuitos que se corrigen a sí mismos. El mecanismo dominante se llama retroalimentación negativa, y su lógica es sencilla: el resultado de una acción frena la señal que la produjo.' },
          {
            tipo: 'pasos',
            titulo: 'La secuencia de un circuito de retroalimentación negativa',
            items: [
              'Una variable del organismo se aleja de su valor habitual.',
              'Una glándula lo detecta y libera la hormona correspondiente.',
              'La hormona actúa sobre las células que tienen su receptor y corrige la variable.',
              'La corrección de la variable es detectada por la propia glándula.',
              'La glándula reduce la liberación de la hormona y el sistema se estabiliza.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Es el mismo principio de todo el módulo', texto: 'Mantener una variable dentro de un margen —el pH en la lección de ácido-base, el agua en la de líquidos, la temperatura en la del tegumento, la glucosa aquí— es la tarea de fondo de casi toda la fisiología. La retroalimentación negativa es el mecanismo general que lo hace posible, y por eso reaparece en todas esas lecciones.' },
          { tipo: 'p', texto: 'Este módulo se detiene en el mecanismo. Las enfermedades endocrinas, sus manifestaciones y su tratamiento pertenecen al Módulo 4, donde el plan sitúa las urgencias metabólicas. Aquí importa entender por qué existe el circuito, no qué ocurre cuando falla.' },
        ],
      },
      F([aaos(12, 'Sistema endocrino', 305), guyton(75, 'Introducción a la endocrinología', 537), guyton(80, 'Hormona paratiroidea, calcitonina, metabolismo del calcio y el fosfato, vitamina D, huesos y dientes', 579)]),
    ],
    conceptosClave: [
      { termino: 'Hormona', definicion: 'Mensajero químico liberado a la sangre por una glándula endocrina; llega a todo el cuerpo pero actúa solo donde hay receptor.' },
      { termino: 'Selectividad por el receptor', definicion: 'Principio por el que una hormona solo produce efecto en células que poseen el receptor capaz de reconocerla.' },
      { termino: 'Eje hipotálamo-hipófisis', definicion: 'Conexión entre el sistema nervioso y el endocrino: el hipotálamo controla la hipófisis y esta coordina a otras glándulas.' },
      { termino: 'Retroalimentación negativa', definicion: 'Circuito en el que el resultado de una acción frena la señal que la produjo, con lo que la variable regulada se estabiliza.' },
      { termino: 'Doble ritmo suprarrenal', definicion: 'Producción de mensajeros de acción rápida, que colaboran con el simpático, y de hormonas de acción sostenida por un mismo órgano.' },
      { termino: 'Homeostasis', definicion: 'Mantenimiento de las variables del organismo dentro de un margen; tarea de fondo de casi toda la fisiología del módulo.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la diferencia principal entre comunicación nerviosa y endocrina?', reverso: 'La nerviosa es eléctrica, rápida, breve y localizada; la endocrina es química, más lenta, prolongada y general.' },
      { frente: '¿Por qué una hormona no afecta a todas las células?', reverso: 'Porque solo actúa donde hay receptor capaz de reconocerla: sin receptor no hay efecto.' },
      { frente: '¿Qué papel cumple el hipotálamo?', reverso: 'Es la bisagra entre el sistema nervioso y el endocrino: controla la hipófisis, que coordina a otras glándulas.' },
      { frente: '¿Qué regula la tiroides?', reverso: 'El ritmo del metabolismo del organismo.' },
      { frente: '¿Qué es la retroalimentación negativa?', reverso: 'Un circuito en el que el resultado de una acción frena la señal que la produjo, estabilizando la variable regulada.' },
      { frente: '¿Qué regula el páncreas endocrino?', reverso: 'La concentración de glucosa en la sangre.' },
    ],
    quiz: [
      {
        pregunta: 'Una hormona circula por toda la sangre pero solo produce efecto en unos tejidos. ¿Por qué?',
        opciones: [
          'Porque se degrada antes de llegar al resto.',
          'Porque solo actúa donde hay células con el receptor capaz de reconocerla.',
          'Porque la sangre no llega a todos los tejidos.',
          'Porque el hipotálamo dirige su recorrido.',
        ],
        correcta: 1,
        explicacion: 'El mensaje llega a todos y solo lo entiende quien tiene el lector adecuado; sin receptor no hay efecto.',
      },
      {
        pregunta: 'Una situación percibida por el sistema nervioso produce una respuesta hormonal sostenida. ¿Qué estructura lo explica?',
        opciones: [
          'La tiroides, que responde al estímulo nervioso.',
          'El hipotálamo, que pertenece al sistema nervioso y gobierna al endocrino a través de la hipófisis.',
          'Las gónadas, por su doble función.',
          'El páncreas endocrino.',
        ],
        correcta: 1,
        explicacion: 'Los dos sistemas de comunicación están acoplados en ese punto: el hipotálamo es la bisagra.',
      },
      {
        pregunta: 'En un circuito de retroalimentación negativa, ¿qué ocurre cuando la variable se corrige?',
        opciones: [
          'La glándula aumenta la liberación de la hormona.',
          'La glándula detecta la corrección y reduce la liberación, con lo que el sistema se estabiliza.',
          'El receptor desaparece de las células.',
          'La hormona se transforma en su contraria.',
        ],
        correcta: 1,
        explicacion: 'El resultado de la acción frena la señal que la produjo: esa es la lógica del circuito.',
      },
      {
        pregunta: '¿Qué tienen en común las lecciones de ácido-base, líquidos, tegumento y esta?',
        opciones: [
          'Que todas tratan del sistema endocrino.',
          'Que todas describen el mantenimiento de una variable dentro de un margen, y la retroalimentación negativa es el mecanismo general que lo hace posible.',
          'Que todas dependen de la hipófisis.',
          'Que todas tratan del transporte por la sangre.',
        ],
        correcta: 1,
        explicacion: 'El pH, el agua, la temperatura y la glucosa son variables reguladas; ese es el principio de fondo del módulo.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La glándula que enlaza el sistema nervioso con el endocrino y controla la hipófisis es el ___.',
          opciones: ['tiroides', 'hipotálamo', 'páncreas endocrino', 'suprarrenal'],
          correcta: 1,
          explicacion: 'Es la bisagra entre los dos sistemas de comunicación.',
        },
        {
          texto: 'La concentración de calcio del organismo está regulada por las glándulas ___.',
          opciones: ['suprarrenales', 'paratiroides', 'gónadas', 'salivales'],
          correcta: 1,
          explicacion: 'La tiroides regula el ritmo del metabolismo; las paratiroides, el calcio.',
        },
        {
          texto: 'Una hormona no produce efecto en una célula que carece del ___ capaz de reconocerla.',
          opciones: ['núcleo', 'receptor', 'capilar', 'canal de sodio'],
          correcta: 1,
          explicacion: 'Es la clave de la selectividad del sistema endocrino.',
        },
        {
          texto: 'Un circuito en el que el resultado de una acción frena la señal que la produjo se llama retroalimentación ___.',
          opciones: ['positiva', 'negativa', 'cruzada', 'hormonal directa'],
          correcta: 1,
          explicacion: 'Es el mecanismo dominante de autorregulación del sistema endocrino.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 12; Guyton y Hall, 13.ª ed., caps. 75 y 80',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 12, p. 305.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 75, p. 537 y cap. 80, p. 579.',
      ],
      extra: [
        'No se nombran hormonas concretas por su nombre propio salvo lo imprescindible, ni se publican '
          + 'valores de referencia: la lección enseña el modo de comunicación y el circuito de '
          + 'autorregulación.',
        'La diabetes y las urgencias metabólicas pertenecen al Módulo 4 y se declaran expresamente '
          + 'fuera de alcance: aquí importa por qué existe el circuito, no qué ocurre cuando falla.',
      ],
    }),
  },
}
