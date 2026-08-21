// ============================================================
//  Módulo 2 · Anatomía y fisiología intermedia
// ------------------------------------------------------------
//  Segunda unidad del Módulo 2 (5 semanas, 25 horas), en el orden del PDF:
//  sistemas óseo, muscular, cardiovascular, nervioso, digestivo y urinario.
//
//  Mismas reglas que `m2-esencial.js`, que no se repiten aquí en detalle:
//  Tortora no está en la biblioteca y no se cita ni se sustituye por otra obra
//  bajo su nombre; se usan AAOS y Guyton, abiertos y verificados con capítulo
//  y página impresa el 17 de agosto de 2026.
//
//  ALCANCE: estructura y función. Ninguna lección de este archivo contiene
//  tratamiento, dosis, algoritmo, criterio diagnóstico ni procedimiento. La
//  conexión prehospitalaria se limita a explicar por qué conocer una
//  estructura ayuda a observar, comunicar o comprender un hallazgo.
//
//  Moore, Anatomía con orientación clínica, 7.ª ed., está en la biblioteca y
//  se abrió: su estructura por regiones quedó verificada (cap. 1 Tórax, 2
//  Abdomen, 3 Pelvis y periné, 4 Dorso, 5 Miembro inferior, 6 Miembro
//  superior, 7 Cabeza, 8 Cuello, 9 Nervios craneales). NO se le atribuye
//  ninguna página concreta porque la numeración impresa no pudo comprobarse en
//  la extracción; se cita por capítulo y la página queda declarada PENDIENTE.
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

const moore = (cap, region) => ({
  nombre: `Moore K. L. Anatomía con orientación clínica, 7.ª ed. Capítulo ${cap}, «${region}».`,
  nota: 'Anatomía regional. El archivo se abrió y su estructura por capítulos quedó verificada el 17 '
    + 'de agosto de 2026, pero la numeración impresa no pudo comprobarse en la extracción: la PÁGINA '
    + 'queda PENDIENTE y esta referencia no sostiene por sí sola ninguna afirmación puntual.',
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
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Sistema óseo
  // ============================================================
  'm2-afi-oseo': {
    icono: 'cp-smart-esqueleto',
    duracion: '20 min',
    resumen: 'Cómo está organizado el esqueleto, de qué está hecho el hueso y por qué es un tejido vivo '
      + 'que además cumple funciones que no tienen que ver con el soporte.',
    objetivos: [
      'Distinguir el esqueleto axial del apendicular y nombrar sus componentes.',
      'Relacionar la estructura del hueso con sus funciones no mecánicas.',
      'Clasificar las articulaciones según el movimiento que permiten.',
      'Explicar por qué el hueso se remodela a lo largo de la vida.',
    ],
    secciones: [
      {
        titulo: 'Dos esqueletos en uno',
        bloques: [
          { tipo: 'p', texto: 'El esqueleto se divide en dos conjuntos con lógicas distintas. El axial forma el eje del cuerpo y su tarea dominante es proteger; el apendicular forma los miembros y su tarea dominante es permitir el movimiento.' },
          {
            tipo: 'tabla',
            titulo: 'La división y su sentido',
            headers: ['Conjunto', 'Qué lo forma', 'Tarea dominante'],
            filas: [
              ['Axial', 'Cráneo, columna vertebral, costillas y esternón', 'Proteger encéfalo, médula espinal y vísceras torácicas'],
              ['Apendicular', 'Cinturas escapular y pélvica, y huesos de los miembros', 'Sostener y permitir el movimiento'],
            ],
          },
          { tipo: 'p', texto: 'La columna vertebral se organiza por regiones: cervical, torácica, lumbar, sacra y coccígea. Cada región tiene un número distinto de vértebras y una movilidad distinta, y esa diferencia de movilidad explica por qué unas regiones son más móviles y otras más estables.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Protección y movilidad se compensan', texto: 'Donde el esqueleto protege más, se mueve menos, y al revés. La caja torácica es rígida porque encierra órganos que no toleran el desplazamiento; el hombro es muy móvil porque su función es alcanzar, y esa movilidad se paga con menor estabilidad. Reconocer ese intercambio evita memorizar las regiones como una lista.' },
        ],
      },
      {
        titulo: 'De qué está hecho el hueso',
        bloques: [
          { tipo: 'p', texto: 'El hueso es tejido conjuntivo especializado. Combina una matriz orgánica que le da cierta flexibilidad y resistencia a la tracción, con depósitos minerales que le dan dureza y resistencia a la compresión. Las dos cosas juntas explican su comportamiento: un hueso resiste mucho, pero no es indeformable.' },
          {
            tipo: 'tabla',
            titulo: 'Componentes y lo que aportan',
            headers: ['Componente', 'Qué aporta'],
            filas: [
              ['Matriz orgánica', 'Flexibilidad y resistencia a la tracción'],
              ['Sales minerales, sobre todo de calcio', 'Dureza y resistencia a la compresión'],
              ['Células del hueso', 'Formación, mantenimiento y reabsorción continuos'],
              ['Periostio', 'Cubierta que aporta irrigación y participa en el crecimiento y la reparación'],
              ['Médula ósea', 'Contenido del interior de ciertos huesos; produce células sanguíneas'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Funciones del sistema óseo',
            items: [
              'Sostener el cuerpo y darle forma.',
              'Proteger órganos que no toleran el desplazamiento o el golpe.',
              'Servir de punto de anclaje a los músculos para que el movimiento sea posible.',
              'Almacenar minerales, sobre todo calcio, y liberarlos cuando el organismo los necesita.',
              'Producir células sanguíneas en la médula ósea.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El hueso es un tejido vivo', texto: 'Se está formando y reabsorbiendo de forma continua a lo largo de toda la vida. Ese recambio permanente es lo que le permite repararse tras una fractura, adaptarse a la carga que soporta y funcionar como reserva de calcio para el resto del organismo. Un hueso no es una pieza inerte de sostén.' },
        ],
      },
      {
        titulo: 'Las articulaciones',
        bloques: [
          { tipo: 'p', texto: 'Una articulación es la unión entre dos o más huesos. Se clasifican por cuánto movimiento permiten, y esa clasificación es directamente útil porque anticipa qué se puede esperar de cada una.' },
          {
            tipo: 'tabla',
            titulo: 'Clasificación por movilidad',
            headers: ['Tipo', 'Movimiento', 'Ejemplo'],
            filas: [
              ['Inmóvil', 'Prácticamente nulo', 'Las uniones entre los huesos del cráneo'],
              ['Semimóvil', 'Limitado', 'Las uniones entre cuerpos vertebrales'],
              ['Móvil', 'Amplio, con cavidad articular y líquido lubricante', 'Hombro, codo, cadera y rodilla'],
            ],
          },
          { tipo: 'p', texto: 'Las articulaciones móviles comparten elementos: superficies cubiertas de cartílago que reducen el rozamiento, una cápsula que las envuelve, líquido que las lubrica y ligamentos que limitan el recorrido. Los ligamentos unen hueso con hueso; los tendones, en cambio, unen músculo con hueso. Confundirlos es un error frecuente y fácil de evitar si se recuerda qué une cada uno.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Para qué sirve saber esto después', texto: 'Localizar y nombrar correctamente una estructura ósea o articular permite describir un hallazgo de forma que otro profesional entienda exactamente dónde está, sin ambigüedad. Este módulo se ocupa de esa precisión anatómica; la valoración de las lesiones corresponde al Módulo 5.' },
        ],
      },
      F([aaos(3, 'Tejido óseo', 67), moore(4, 'Dorso'), moore(6, 'Miembro superior')]),
    ],
    conceptosClave: [
      { termino: 'Esqueleto axial', definicion: 'Cráneo, columna vertebral, costillas y esternón; forma el eje del cuerpo y su tarea dominante es proteger.' },
      { termino: 'Esqueleto apendicular', definicion: 'Cinturas escapular y pélvica y huesos de los miembros; su tarea dominante es sostener y permitir el movimiento.' },
      { termino: 'Matriz ósea', definicion: 'Combinación de componente orgánico, que aporta flexibilidad y resistencia a la tracción, y sales minerales, que aportan dureza y resistencia a la compresión.' },
      { termino: 'Remodelación ósea', definicion: 'Formación y reabsorción continuas del hueso a lo largo de la vida; permite reparación, adaptación a la carga y reserva de calcio.' },
      { termino: 'Ligamento y tendón', definicion: 'El ligamento une hueso con hueso y limita el recorrido articular; el tendón une músculo con hueso y transmite la fuerza.' },
      { termino: 'Intercambio protección-movilidad', definicion: 'Principio por el que las regiones del esqueleto que más protegen se mueven menos, y las más móviles son menos estables.' },
    ],
    flashcards: [
      { frente: '¿Qué forma el esqueleto axial?', reverso: 'Cráneo, columna vertebral, costillas y esternón; su tarea dominante es proteger.' },
      { frente: '¿Qué aporta el componente mineral del hueso?', reverso: 'Dureza y resistencia a la compresión; la matriz orgánica aporta flexibilidad y resistencia a la tracción.' },
      { frente: '¿Qué une un ligamento y qué une un tendón?', reverso: 'El ligamento une hueso con hueso; el tendón une músculo con hueso.' },
      { frente: 'Nombra dos funciones del hueso que no sean mecánicas.', reverso: 'Almacenar minerales, sobre todo calcio, y producir células sanguíneas en la médula ósea.' },
      { frente: '¿Por qué el hombro es tan móvil y tan poco estable?', reverso: 'Porque protección y movilidad se compensan: su función es alcanzar, y esa movilidad se paga con menor estabilidad.' },
      { frente: '¿Qué permite que un hueso se repare tras una fractura?', reverso: 'Que es un tejido vivo en formación y reabsorción continuas a lo largo de toda la vida.' },
    ],
    quiz: [
      {
        pregunta: 'La caja torácica es rígida y el hombro muy móvil. ¿Qué principio explica esa diferencia?',
        opciones: [
          'Que unos huesos tienen más minerales que otros.',
          'Que protección y movilidad se compensan: donde el esqueleto protege más se mueve menos, y al revés.',
          'Que el esqueleto axial no tiene articulaciones.',
          'Que el hombro carece de ligamentos.',
        ],
        correcta: 1,
        explicacion: 'La caja torácica encierra órganos que no toleran el desplazamiento; el hombro está hecho para alcanzar y paga esa movilidad con menor estabilidad.',
      },
      {
        pregunta: 'Un hueso resiste mucho pero no es indeformable. ¿Por qué?',
        opciones: [
          'Porque está formado solo por sales minerales.',
          'Porque combina una matriz orgánica que aporta flexibilidad con depósitos minerales que aportan dureza.',
          'Porque el periostio lo mantiene blando.',
          'Porque la médula ósea ocupa todo su interior.',
        ],
        correcta: 1,
        explicacion: 'Las dos cosas juntas explican su comportamiento mecánico: resistencia a la tracción y a la compresión a la vez.',
      },
      {
        pregunta: '¿Qué tipo de articulación permite movimiento amplio y tiene cavidad articular con líquido lubricante?',
        opciones: [
          'Inmóvil, como las uniones del cráneo.',
          'Móvil, como el hombro o la rodilla.',
          'Semimóvil, como la unión entre cuerpos vertebrales.',
          'Ninguna: la lubricación no depende del tipo de articulación.',
        ],
        correcta: 1,
        explicacion: 'Las articulaciones móviles comparten cartílago, cápsula, líquido lubricante y ligamentos que limitan el recorrido.',
      },
      {
        pregunta: '¿Para qué sirve, en este módulo, aprender a nombrar correctamente una estructura ósea?',
        opciones: [
          'Para decidir el tratamiento de una fractura.',
          'Para describir un hallazgo de forma que otro profesional entienda exactamente dónde está, sin ambigüedad.',
          'Para clasificar la gravedad de una lesión.',
          'Para indicar la inmovilización adecuada.',
        ],
        correcta: 1,
        explicacion: 'Este módulo se ocupa de la precisión anatómica; la valoración y el manejo de las lesiones corresponden al Módulo 5.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El cráneo, la columna vertebral, las costillas y el esternón forman el esqueleto ___.',
          opciones: ['apendicular', 'axial', 'periférico', 'visceral'],
          correcta: 1,
          explicacion: 'Su tarea dominante es proteger; el apendicular sostiene y permite el movimiento.',
        },
        {
          texto: 'Una estructura que une músculo con hueso y transmite la fuerza del movimiento es un ___.',
          opciones: ['ligamento', 'tendón', 'cartílago articular', 'periostio'],
          correcta: 1,
          explicacion: 'El ligamento une hueso con hueso y limita el recorrido articular.',
        },
        {
          texto: 'La producción de células sanguíneas ocurre en la ___, contenida en el interior de ciertos huesos.',
          opciones: ['matriz mineral', 'médula ósea', 'cápsula articular', 'membrana sinovial'],
          correcta: 1,
          explicacion: 'Es una de las funciones del sistema óseo que no tienen que ver con el soporte.',
        },
        {
          texto: 'Las uniones entre los cuerpos vertebrales permiten un movimiento limitado, por lo que se clasifican como articulaciones ___.',
          opciones: ['inmóviles', 'semimóviles', 'móviles', 'sinoviales'],
          correcta: 1,
          explicacion: 'Las inmóviles son las del cráneo; las móviles tienen cavidad articular y líquido lubricante.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 3; Moore, 7.ª ed., caps. 4 y 6 (página pendiente)',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 3, p. 67.',
        'Moore K. L. Anatomía con orientación clínica, 7.ª ed., caps. 4 y 6 (página PENDIENTE).',
      ],
      extra: [
        'No se publica el número exacto de vértebras por región ni recuentos de huesos: la lección '
          + 'enseña la organización y el principio de intercambio entre protección y movilidad.',
        'DEUDA: precisar la página impresa de Moore. La numeración no pudo comprobarse en la '
          + 'extracción del archivo y la referencia no sostiene ninguna afirmación puntual.',
        'Fracturas, inmovilización y valoración de lesiones pertenecen al Módulo 5 y se declaran '
          + 'expresamente fuera de alcance.',
      ],
    }),
  },

  // ============================================================
  //  Sistema muscular
  // ============================================================
  'm2-afi-muscular': {
    icono: 'cp-servier-musculo',
    duracion: '20 min',
    resumen: 'Los tres tipos de músculo, en qué se diferencian por su control y su aspecto, y cómo se '
      + 'produce realmente una contracción.',
    objetivos: [
      'Diferenciar los tres tipos de tejido muscular por control, aspecto y localización.',
      'Ordenar los pasos por los que un estímulo produce una contracción.',
      'Relacionar la disposición de un músculo con el movimiento que genera.',
      'Explicar por qué la contracción depende del calcio y de la energía.',
    ],
    secciones: [
      {
        titulo: 'Tres músculos, no uno',
        bloques: [
          { tipo: 'p', texto: 'Hablar de «el músculo» en singular oculta que existen tres tejidos musculares con propiedades distintas. Se distinguen por tres rasgos: si su control es voluntario, si al microscopio presentan bandas transversales y dónde se encuentran.' },
          {
            tipo: 'tabla',
            titulo: 'Los tres tipos',
            headers: ['Tipo', 'Control', 'Aspecto', 'Dónde está'],
            filas: [
              ['Esquelético', 'Voluntario', 'Con bandas transversales', 'Unido a los huesos; produce el movimiento del cuerpo'],
              ['Cardíaco', 'Involuntario', 'Con bandas transversales', 'Exclusivamente en la pared del corazón'],
              ['Liso', 'Involuntario', 'Sin bandas transversales', 'Paredes de vasos, vía aérea, tubo digestivo, vejiga y útero'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El músculo cardíaco es un caso aparte', texto: 'Tiene el aspecto del esquelético pero el control del liso, y además sus células están conectadas entre sí de modo que la señal pasa de una a otra. Esa conexión hace que el corazón se contraiga como un conjunto y no fibra por fibra. Cómo se genera y conduce esa señal se estudia en el tema cardiovascular.' },
        ],
      },
      {
        titulo: 'Cómo se contrae un músculo',
        bloques: [
          { tipo: 'p', texto: 'La contracción no consiste en que las fibras se encojan como un elástico. Dentro de la célula muscular hay dos tipos de filamentos ordenados de forma regular, y la contracción se produce porque unos se deslizan sobre los otros, acortando el conjunto sin que ningún filamento cambie de longitud.' },
          {
            tipo: 'pasos',
            titulo: 'Del estímulo al acortamiento',
            items: [
              'El nervio libera un mensajero químico en la unión con la fibra muscular.',
              'Ese mensajero desencadena un potencial de acción que recorre la membrana de la fibra.',
              'La señal eléctrica provoca la liberación de calcio desde un depósito interno de la célula.',
              'El calcio deja libres los puntos de unión entre los dos tipos de filamento.',
              'Los filamentos se enganchan y se deslizan unos sobre otros, consumiendo energía: la fibra se acorta.',
              'Cesa el estímulo, el calcio vuelve a su depósito —lo que también consume energía— y la fibra se relaja.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos condiciones y no una', texto: 'Contraerse consume energía, pero relajarse también, porque devolver el calcio a su depósito es un transporte activo. Un músculo sin energía disponible no queda flácido: queda incapaz de completar el ciclo. Es la misma dependencia energética de la lección de la célula, aplicada al movimiento.' },
        ],
      },
      {
        titulo: 'De la fibra al movimiento',
        bloques: [
          { tipo: 'p', texto: 'Un músculo esquelético se une al hueso por sus tendones, y al acortarse acerca sus dos puntos de anclaje. Como el músculo solo puede tirar y nunca empujar, cualquier movimiento reversible necesita al menos dos músculos que actúen en sentidos opuestos.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se organizan',
            items: [
              'Agonista: el músculo que produce el movimiento que se está realizando.',
              'Antagonista: el que produce el movimiento contrario y debe relajarse para que el primero actúe.',
              'Sinergistas: los que colaboran estabilizando o afinando el movimiento.',
              'Fijadores: los que inmovilizan una parte para que otra pueda moverse con precisión.',
            ],
          },
          { tipo: 'p', texto: 'El músculo esquelético cumple además funciones que no son de movimiento. Mantiene la postura mediante contracciones sostenidas que no percibimos, protege estructuras profundas por su volumen y produce calor: la contracción genera calor como subproducto, y por eso el temblor muscular es un mecanismo para elevar la temperatura corporal.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Alcance de esta lección', texto: 'Aquí se establece cómo se produce el movimiento y qué necesita para producirse. Las lesiones musculares, su valoración y su manejo pertenecen al Módulo 5; los fármacos que actúan sobre la unión entre nervio y músculo pertenecen al Módulo 4. Ninguno de los dos se adelanta aquí.' },
        ],
      },
      F([aaos(4, 'Tejido muscular', 109), guyton(6, 'Contracción del músculo esquelético', 44), guyton(8, 'Excitación y contracción del músculo liso', 55)]),
    ],
    conceptosClave: [
      { termino: 'Músculo esquelético', definicion: 'Tejido muscular de control voluntario y con bandas transversales, unido a los huesos; produce el movimiento del cuerpo.' },
      { termino: 'Músculo liso', definicion: 'Tejido muscular involuntario y sin bandas transversales, presente en paredes de vasos, vía aérea, tubo digestivo, vejiga y útero.' },
      { termino: 'Deslizamiento de filamentos', definicion: 'Mecanismo de la contracción: dos tipos de filamento se deslizan uno sobre otro y acortan el conjunto sin cambiar su propia longitud.' },
      { termino: 'Papel del calcio', definicion: 'Su liberación desde un depósito interno deja libres los puntos de unión entre filamentos; su retirada permite la relajación.' },
      { termino: 'Agonista y antagonista', definicion: 'El agonista produce el movimiento en curso y el antagonista el contrario; como el músculo solo tira, todo movimiento reversible necesita ambos.' },
      { termino: 'Producción de calor', definicion: 'Función del músculo esquelético derivada de que la contracción genera calor como subproducto; el temblor la aprovecha para elevar la temperatura.' },
    ],
    flashcards: [
      { frente: '¿Qué tipo de músculo es involuntario y sin bandas transversales?', reverso: 'El liso, presente en paredes de vasos, vía aérea, tubo digestivo, vejiga y útero.' },
      { frente: '¿Qué tiene de particular el músculo cardíaco?', reverso: 'Aspecto del esquelético, control del liso, y células conectadas entre sí de modo que se contrae como un conjunto.' },
      { frente: '¿Cambian de longitud los filamentos al contraerse el músculo?', reverso: 'No: se deslizan unos sobre otros y acortan el conjunto sin cambiar su propia longitud.' },
      { frente: '¿Qué papel cumple el calcio en la contracción?', reverso: 'Al liberarse deja libres los puntos de unión entre filamentos; al retirarse permite la relajación.' },
      { frente: '¿Por qué relajarse también consume energía?', reverso: 'Porque devolver el calcio a su depósito es un transporte activo.' },
      { frente: '¿Por qué todo movimiento reversible necesita dos músculos?', reverso: 'Porque el músculo solo puede tirar y nunca empujar: hace falta un agonista y un antagonista.' },
    ],
    quiz: [
      {
        pregunta: 'Una fibra muscular se queda sin energía disponible. ¿Qué ocurre?',
        opciones: [
          'Queda completamente flácida de inmediato.',
          'Queda incapaz de completar el ciclo, porque tanto contraerse como devolver el calcio a su depósito consumen energía.',
          'Se contrae con más fuerza.',
          'Deja de necesitar calcio.',
        ],
        correcta: 1,
        explicacion: 'La relajación exige un transporte activo que devuelve el calcio a su depósito: sin energía no se completa ni la contracción ni la relajación.',
      },
      {
        pregunta: 'Un músculo de la pared de un vaso sanguíneo, ¿de qué tipo es y bajo qué control?',
        opciones: [
          'Esquelético y voluntario.',
          'Liso e involuntario.',
          'Cardíaco e involuntario.',
          'Esquelético e involuntario.',
        ],
        correcta: 1,
        explicacion: 'El músculo liso ocupa las paredes de vasos, vía aérea, tubo digestivo, vejiga y útero, y su control es involuntario.',
      },
      {
        pregunta: 'Durante un movimiento, ¿qué le ocurre al músculo antagonista?',
        opciones: [
          'Se contrae al mismo tiempo con la misma fuerza.',
          'Debe relajarse para que el agonista pueda producir el movimiento.',
          'Fija el hueso para que el agonista actúe.',
          'No participa en ningún caso.',
        ],
        correcta: 1,
        explicacion: 'El antagonista produce el movimiento contrario; los que estabilizan son los sinergistas y los que inmovilizan una parte son los fijadores.',
      },
      {
        pregunta: '¿Por qué el temblor eleva la temperatura corporal?',
        opciones: [
          'Porque aumenta la circulación en la piel.',
          'Porque la contracción muscular genera calor como subproducto.',
          'Porque reduce la sudoración.',
          'Porque consume el calcio de los depósitos.',
        ],
        correcta: 1,
        explicacion: 'La producción de calor es una de las funciones del músculo esquelético que no son de movimiento.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia real que va del estímulo nervioso al acortamiento',
        pasos: [
          'El nervio libera un mensajero químico en la unión con la fibra',
          'Un potencial de acción recorre la membrana de la fibra muscular',
          'Se libera calcio desde el depósito interno de la célula',
          'El calcio deja libres los puntos de unión entre filamentos',
          'Los filamentos se enganchan y se deslizan: la fibra se acorta',
          'El calcio vuelve a su depósito consumiendo energía y la fibra se relaja',
        ],
      },
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 4; Guyton y Hall, 13.ª ed., caps. 6 y 8',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 4, p. 109.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 6, p. 44 y cap. 8, p. 55.',
      ],
      extra: [
        'Se usa ORDENAR porque el acoplamiento entre excitación y contracción es una secuencia '
          + 'fisiológica real con orden obligado.',
        'No se nombran fármacos que actúen sobre la unión neuromuscular: pertenecen al Módulo 4 y se '
          + 'declaran fuera de alcance. Las lesiones musculares pertenecen al Módulo 5.',
      ],
    }),
  },

  // ============================================================
  //  Sistema cardiovascular
  // ============================================================
  'm2-afi-cardiovascular': {
    icono: 'il-corazon-vascularizacion',
    duracion: '22 min',
    resumen: 'Cómo está construido el corazón, por dónde circula la sangre y qué determina que llegue a '
      + 'los tejidos en cantidad suficiente.',
    objetivos: [
      'Describir las cavidades y las válvulas del corazón y el sentido del flujo.',
      'Distinguir la circulación pulmonar de la sistémica.',
      'Relacionar el tipo de vaso con la función que cumple.',
      'Explicar de qué factores depende el volumen de sangre que el corazón expulsa.',
    ],
    secciones: [
      {
        titulo: 'El corazón por dentro',
        bloques: [
          { tipo: 'p', texto: 'El corazón es una bomba doble alojada en el tórax, entre los pulmones y por detrás del esternón. Tiene cuatro cavidades: dos aurículas arriba, que reciben, y dos ventrículos abajo, que expulsan. Un tabique separa por completo el lado derecho del izquierdo, de modo que la sangre de uno no se mezcla con la del otro.' },
          {
            tipo: 'tabla',
            titulo: 'Cavidades, válvulas y sentido del flujo',
            headers: ['Cavidad', 'Recibe de', 'Expulsa hacia', 'Válvula de salida'],
            filas: [
              ['Aurícula derecha', 'Venas del organismo', 'Ventrículo derecho', 'Válvula auriculoventricular derecha'],
              ['Ventrículo derecho', 'Aurícula derecha', 'Arterias pulmonares', 'Válvula pulmonar'],
              ['Aurícula izquierda', 'Venas pulmonares', 'Ventrículo izquierdo', 'Válvula auriculoventricular izquierda'],
              ['Ventrículo izquierdo', 'Aurícula izquierda', 'Arteria aorta', 'Válvula aórtica'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Las válvulas solo dejan pasar en un sentido', texto: 'Se abren y se cierran de forma pasiva, por diferencia de presión: se abren cuando la presión detrás supera a la de delante y se cierran cuando ocurre lo contrario. Esa unidireccionalidad es la que convierte una contracción en un flujo con sentido, y no en un vaivén.' },
          { tipo: 'p', texto: 'La pared del ventrículo izquierdo es notablemente más gruesa que la del derecho. La razón es funcional: el derecho envía sangre a los pulmones, que están cerca y oponen poca resistencia, mientras que el izquierdo la envía a todo el organismo. Estructura y función se explican mutuamente.' },
        ],
      },
      {
        titulo: 'Dos circuitos, un mismo corazón',
        bloques: [
          { tipo: 'p', texto: 'La sangre recorre dos circuitos en serie, cada uno impulsado por un lado del corazón. Entender que están en serie —uno después del otro y no en paralelo— es lo que explica por qué el fallo de un lado repercute en el otro.' },
          {
            tipo: 'tabla',
            titulo: 'Los dos circuitos',
            headers: ['Circuito', 'Lo impulsa', 'Va hacia', 'Para qué'],
            filas: [
              ['Pulmonar', 'Ventrículo derecho', 'Los pulmones', 'Que la sangre se cargue de oxígeno y libere dióxido de carbono'],
              ['Sistémico', 'Ventrículo izquierdo', 'Todo el organismo', 'Que los tejidos reciban oxígeno y nutrientes y entreguen desechos'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Arteria no significa «con oxígeno»', texto: 'Arteria es el vaso que sale del corazón y vena el que llega a él, con independencia del contenido de oxígeno. Por eso las arterias pulmonares llevan sangre pobre en oxígeno y las venas pulmonares la llevan rica: la definición es por la dirección respecto del corazón, no por el gas que transportan. Es el error más repetido de este tema.' },
        ],
      },
      {
        titulo: 'Los vasos y su especialización',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cada vaso está hecho para su tarea',
            headers: ['Vaso', 'Pared', 'Función que cumple'],
            filas: [
              ['Arteria', 'Gruesa, elástica y muscular', 'Soportar presión alta y distribuir la sangre'],
              ['Arteriola', 'Sobre todo muscular', 'Regular cuánta sangre llega a cada territorio cambiando su calibre'],
              ['Capilar', 'De una sola capa de células', 'Permitir el intercambio de gases, nutrientes y desechos'],
              ['Vénula y vena', 'Delgada y distensible, con válvulas en las venas de los miembros', 'Devolver la sangre al corazón y actuar como reservorio'],
            ],
          },
          { tipo: 'p', texto: 'Los capilares son el único punto donde ocurre el intercambio, y todo lo demás existe para llevarlos y traerlos. Su pared de una sola capa de células es precisamente lo que permite que las sustancias la atraviesen; una pared más resistente sería más segura y completamente inútil.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Las arteriolas son el grifo del sistema', texto: 'Al cambiar su calibre deciden cuánta sangre recibe cada territorio, y en conjunto determinan la resistencia que el corazón debe vencer. Es la estructura que conecta este tema con la regulación de la presión, con la temperatura corporal de la lección del tegumento y con la distribución del flujo según lo que el cuerpo esté haciendo.' },
        ],
      },
      {
        titulo: 'Qué determina lo que llega a los tejidos',
        bloques: [
          { tipo: 'p', texto: 'El volumen de sangre que el corazón expulsa por minuto depende de dos factores que se multiplican: cuántas veces late y cuánto expulsa en cada latido. Si uno baja, el otro puede compensarlo hasta cierto punto; si ambos bajan, no hay compensación posible.' },
          {
            tipo: 'lista',
            titulo: 'De qué depende lo que expulsa cada latido',
            items: [
              'De cuánta sangre le llega al ventrículo antes de contraerse: cuanto más se llena, con más fuerza se contrae, dentro de ciertos límites.',
              'De la fuerza propia del músculo cardíaco.',
              'De la resistencia que debe vencer para expulsar, determinada sobre todo por el calibre de las arteriolas.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Alcance de esta lección', texto: 'Aquí se establece de qué depende el flujo. Los valores normales de presión y frecuencia, su medición, la interpretación del trazado eléctrico y el manejo de sus alteraciones pertenecen a los módulos 3 y 4. Este módulo se detiene en el mecanismo, que es lo que hace comprensible aquello.' },
        ],
      },
      F([aaos(5, 'Sistema circulatorio', 135), guyton(9, 'Músculo cardíaco: el corazón como bomba y la función de las válvulas', 63), guyton(14, 'Visión general de la circulación; biofísica de la presión, el flujo y la resistencia', 91)]),
    ],
    conceptosClave: [
      { termino: 'Bomba doble', definicion: 'Organización del corazón en dos mitades separadas por un tabique: la derecha impulsa la circulación pulmonar y la izquierda la sistémica.' },
      { termino: 'Arteria y vena', definicion: 'Arteria es el vaso que SALE del corazón y vena el que LLEGA a él, con independencia del contenido de oxígeno.' },
      { termino: 'Circulación pulmonar y sistémica', definicion: 'Dos circuitos en serie: el pulmonar carga la sangre de oxígeno y el sistémico la distribuye a los tejidos.' },
      { termino: 'Capilar', definicion: 'Vaso de una sola capa de células, único punto donde ocurre el intercambio de gases, nutrientes y desechos.' },
      { termino: 'Arteriola', definicion: 'Vaso de pared muscular que regula cuánta sangre llega a cada territorio cambiando su calibre y determina la resistencia del sistema.' },
      { termino: 'Volumen expulsado por minuto', definicion: 'Producto de la frecuencia de los latidos por lo que se expulsa en cada uno; depende del llenado previo, de la fuerza del músculo y de la resistencia a vencer.' },
    ],
    flashcards: [
      { frente: '¿Qué define a una arteria?', reverso: 'Que sale del corazón, no que lleve oxígeno: las arterias pulmonares llevan sangre pobre en oxígeno.' },
      { frente: '¿Por qué el ventrículo izquierdo tiene la pared más gruesa?', reverso: 'Porque envía sangre a todo el organismo, mientras el derecho la envía a los pulmones, que están cerca y oponen poca resistencia.' },
      { frente: '¿Cómo se abren y se cierran las válvulas cardíacas?', reverso: 'De forma pasiva, por diferencia de presión entre delante y detrás.' },
      { frente: '¿Dónde ocurre el intercambio de gases y nutrientes?', reverso: 'En los capilares, cuya pared de una sola capa de células es lo que lo permite.' },
      { frente: '¿Qué hacen las arteriolas?', reverso: 'Regulan cuánta sangre llega a cada territorio cambiando su calibre y determinan la resistencia que el corazón debe vencer.' },
      { frente: '¿De qué depende el volumen expulsado por minuto?', reverso: 'De cuántas veces late el corazón y de cuánto expulsa en cada latido.' },
    ],
    quiz: [
      {
        pregunta: 'Las arterias pulmonares llevan sangre pobre en oxígeno. ¿Contradice eso la definición de arteria?',
        opciones: [
          'Sí: toda arteria lleva sangre rica en oxígeno.',
          'No: arteria es el vaso que sale del corazón, con independencia del gas que transporte.',
          'Sí, y por eso se les llama venas pulmonares.',
          'No, porque las arterias pulmonares son en realidad capilares.',
        ],
        correcta: 1,
        explicacion: 'La definición es por la dirección respecto del corazón; es el error más repetido de este tema.',
      },
      {
        pregunta: 'Un capilar tiene una pared de una sola capa de células. ¿Es eso una debilidad de diseño?',
        opciones: [
          'Sí: debería ser más resistente.',
          'No: esa delgadez es exactamente lo que permite el intercambio; una pared más resistente sería inútil para su función.',
          'Sí, y por eso los capilares se rompen constantemente.',
          'No, porque los capilares no participan en el intercambio.',
        ],
        correcta: 1,
        explicacion: 'Los capilares son el único punto donde ocurre el intercambio, y todo lo demás del sistema existe para llevarlos y traerlos.',
      },
      {
        pregunta: 'Si el corazón late menos veces por minuto pero expulsa más en cada latido, ¿qué ocurre con el volumen expulsado por minuto?',
        opciones: [
          'Baja necesariamente.',
          'Puede mantenerse, porque el volumen por minuto es el producto de ambos factores y uno puede compensar al otro hasta cierto punto.',
          'Sube siempre al doble.',
          'No depende de esos dos factores.',
        ],
        correcta: 1,
        explicacion: 'Los dos factores se multiplican; si ambos bajan a la vez no hay compensación posible.',
      },
      {
        pregunta: '¿Qué estructura decide cuánta sangre recibe cada territorio del organismo?',
        opciones: [
          'Las válvulas cardíacas.',
          'Las arteriolas, cambiando su calibre.',
          'Los capilares, abriéndose y cerrándose.',
          'Las venas, por sus válvulas.',
        ],
        correcta: 1,
        explicacion: 'Las arteriolas son el grifo del sistema y en conjunto determinan la resistencia que el corazón debe vencer.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el recorrido real de una gota de sangre desde que vuelve del cuerpo',
        pasos: [
          'Llega a la aurícula derecha por las venas del organismo',
          'Pasa al ventrículo derecho',
          'Sale por las arterias pulmonares hacia los pulmones',
          'Se carga de oxígeno en los capilares pulmonares',
          'Vuelve a la aurícula izquierda por las venas pulmonares',
          'Pasa al ventrículo izquierdo',
          'Sale por la arteria aorta hacia todo el organismo',
        ],
      },
      completar: [
        {
          texto: 'El vaso cuya pared muscular regula cuánta sangre llega a cada territorio, y que en conjunto determina la resistencia del sistema, es la ___.',
          opciones: ['vena', 'arteriola', 'capilar', 'aurícula'],
          correcta: 1,
          explicacion: 'Es el grifo del sistema, y conecta este tema con la regulación de la presión y de la temperatura.',
        },
        {
          texto: 'Las válvulas cardíacas se abren y se cierran de forma ___, por diferencia de presión entre delante y detrás.',
          opciones: ['activa, gastando energía', 'pasiva', 'nerviosa', 'hormonal'],
          correcta: 1,
          explicacion: 'Esa unidireccionalidad convierte una contracción en flujo con sentido y no en un vaivén.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 5; Guyton y Hall, 13.ª ed., caps. 9 y 14',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 5, p. 135.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 9, p. 63 y cap. 14, p. 91.',
      ],
      extra: [
        'No se publican valores normales de presión arterial ni de frecuencia cardíaca: pertenecen a '
          + 'los módulos de evaluación y clínica, junto con su medición e interpretación.',
        'La conducción eléctrica del corazón y su trazado se declaran fuera de alcance: se estudian en '
          + 'los módulos 3 y 4.',
        'La actividad combina una secuencia real —el recorrido de la sangre— con dos relaciones '
          + 'estructura-función; ninguna repite una pregunta del quiz.',
      ],
    }),
  },

  // ============================================================
  //  Sistema nervioso
  // ============================================================
  'm2-afi-nervioso': {
    icono: 'cp-servier-cerebro',
    duracion: '22 min',
    resumen: 'Cómo se divide el sistema nervioso, qué hace cada parte y por qué una sola célula, la '
      + 'neurona, explica todo su funcionamiento.',
    objetivos: [
      'Distinguir las divisiones anatómicas y funcionales del sistema nervioso.',
      'Relacionar cada región del encéfalo con la función que sostiene.',
      'Describir cómo se transmite una señal entre dos neuronas.',
      'Comparar los efectos de las dos divisiones del sistema autónomo.',
    ],
    secciones: [
      {
        titulo: 'Dos formas de dividirlo',
        bloques: [
          { tipo: 'p', texto: 'El sistema nervioso admite dos divisiones que responden a preguntas distintas y que conviene no mezclar: una dice DÓNDE está cada parte y la otra dice QUÉ hace.' },
          {
            tipo: 'tabla',
            titulo: 'División anatómica: dónde está',
            headers: ['División', 'Qué la forma', 'Qué hace'],
            filas: [
              ['Central', 'Encéfalo y médula espinal', 'Recibe, integra y decide'],
              ['Periférico', 'Nervios que salen del encéfalo y de la médula', 'Lleva información hacia el centro y órdenes desde él'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'División funcional: qué hace',
            headers: ['División', 'Sobre qué actúa', 'Control'],
            filas: [
              ['Somático', 'Músculo esquelético y sensibilidad consciente', 'Voluntario'],
              ['Autónomo', 'Vísceras, vasos y glándulas', 'Involuntario'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Protección del sistema central', texto: 'El encéfalo y la médula están protegidos por hueso —cráneo y columna—, por membranas que los envuelven y por un líquido que los rodea y los amortigua. Ese líquido cumple además una función de sostén: el encéfalo pesa mucho menos flotando en él que apoyado directamente.' },
        ],
      },
      {
        titulo: 'Las regiones y lo que sostienen',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Estructura y función en el encéfalo',
            headers: ['Región', 'Función principal'],
            filas: [
              ['Cerebro', 'Movimiento voluntario, sensibilidad consciente, lenguaje, memoria y razonamiento'],
              ['Cerebelo', 'Coordinación, equilibrio y precisión del movimiento'],
              ['Tronco encefálico', 'Control de funciones que no se detienen: respiración, latido cardíaco y estado de alerta'],
              ['Médula espinal', 'Conducción de señales entre el encéfalo y el cuerpo, y respuestas reflejas propias'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué el tronco encefálico es distinto', texto: 'Concentra el control de funciones que no admiten interrupción. Es la razón anatómica de que una alteración en esa zona tenga consecuencias inmediatas sobre la respiración y el estado de alerta, mientras que otras regiones producen pérdidas más específicas. Este módulo establece la relación; sus manifestaciones clínicas corresponden a los módulos 4 y 5.' },
          { tipo: 'p', texto: 'La médula espinal no es solo un cable. Además de conducir señales en ambos sentidos, genera respuestas propias sin consultar al encéfalo: son los reflejos, y su existencia explica que una retirada ante un estímulo doloroso ocurra antes de que la persona sea consciente del dolor.' },
        ],
      },
      {
        titulo: 'La neurona y la sinapsis',
        bloques: [
          { tipo: 'p', texto: 'La neurona es la célula que genera y conduce las señales. Su forma se corresponde exactamente con su tarea: recibe por un extremo, integra en el cuerpo celular y transmite por una prolongación larga hacia el siguiente destino.' },
          {
            tipo: 'tabla',
            titulo: 'Partes de la neurona',
            headers: ['Parte', 'Qué hace'],
            filas: [
              ['Dendritas', 'Reciben la información de otras neuronas'],
              ['Cuerpo celular', 'Integra lo recibido y contiene el núcleo'],
              ['Axón', 'Conduce la señal hasta su destino'],
              ['Vaina de mielina', 'Envuelve el axón y hace la conducción más rápida'],
              ['Terminal', 'Libera el mensajero químico que transmite la señal a la siguiente célula'],
            ],
          },
          { tipo: 'p', texto: 'El punto de contacto entre dos neuronas se llama sinapsis, y en él la señal deja de ser eléctrica y pasa a ser química: la neurona que transmite libera un mensajero que cruza el espacio y actúa sobre la siguiente. Ese cambio de naturaleza permite que la transmisión sea regulable y que ocurra en un solo sentido.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Conexión con la electrofisiología', texto: 'La señal que viaja por el axón es el potencial de acción de la lección de electrofisiología: mismo mecanismo, misma dependencia del gradiente y de la energía. La mielina lo acelera porque la señal salta entre los tramos no cubiertos en vez de recorrer toda la membrana punto por punto.' },
        ],
      },
      {
        titulo: 'El sistema autónomo',
        bloques: [
          { tipo: 'p', texto: 'El sistema autónomo controla lo que no decidimos: el calibre de los vasos, la frecuencia del latido, la actividad del tubo digestivo, las glándulas y el músculo liso. Se organiza en dos divisiones con efectos generalmente opuestos sobre los mismos órganos.' },
          {
            tipo: 'tabla',
            titulo: 'Dos divisiones, efectos opuestos',
            headers: ['Órgano o función', 'Simpático', 'Parasimpático'],
            filas: [
              ['Frecuencia del latido', 'La aumenta', 'La disminuye'],
              ['Diámetro de la vía aérea', 'Lo aumenta', 'Lo reduce'],
              ['Actividad del tubo digestivo', 'La reduce', 'La aumenta'],
              ['Pupila', 'La dilata', 'La contrae'],
              ['Glándulas sudoríparas', 'Aumenta la sudoración', 'Efecto escaso'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Una lógica, no una tabla', texto: 'El simpático prepara al organismo para un esfuerzo inmediato: lleva recursos al músculo, al corazón y al pulmón, y aparta los que se dedicaban a digerir. El parasimpático hace lo contrario y favorece la recuperación y la digestión. Si se recuerda esa lógica, la tabla se deduce en lugar de memorizarse.' },
        ],
      },
      F([aaos(8, 'Sistema nervioso', 207), guyton(46, 'Organización del sistema nervioso, funciones básicas de las sinapsis y neurotransmisores', 333), guyton(62, 'Flujo sanguíneo cerebral, líquido cefalorraquídeo y metabolismo cerebral', 450)]),
    ],
    conceptosClave: [
      { termino: 'Sistema nervioso central y periférico', definicion: 'División anatómica: el central es encéfalo y médula espinal; el periférico son los nervios que llevan información hacia el centro y órdenes desde él.' },
      { termino: 'Sistema somático y autónomo', definicion: 'División funcional: el somático actúa sobre músculo esquelético y sensibilidad consciente de forma voluntaria; el autónomo sobre vísceras, vasos y glándulas de forma involuntaria.' },
      { termino: 'Tronco encefálico', definicion: 'Región que concentra el control de funciones que no se detienen: respiración, latido cardíaco y estado de alerta.' },
      { termino: 'Sinapsis', definicion: 'Punto de contacto entre neuronas donde la señal pasa de eléctrica a química, lo que la hace regulable y unidireccional.' },
      { termino: 'Vaina de mielina', definicion: 'Envoltura del axón que acelera la conducción porque la señal salta entre los tramos no cubiertos.' },
      { termino: 'Simpático y parasimpático', definicion: 'Divisiones del autónomo con efectos generalmente opuestos: el simpático prepara para el esfuerzo inmediato y el parasimpático favorece recuperación y digestión.' },
    ],
    flashcards: [
      { frente: '¿Qué forma el sistema nervioso central?', reverso: 'El encéfalo y la médula espinal.' },
      { frente: '¿Qué región controla respiración, latido y estado de alerta?', reverso: 'El tronco encefálico, que concentra funciones que no admiten interrupción.' },
      { frente: '¿Qué ocurre con la señal en la sinapsis?', reverso: 'Deja de ser eléctrica y pasa a ser química: se libera un mensajero que actúa sobre la siguiente célula.' },
      { frente: '¿Por qué la mielina acelera la conducción?', reverso: 'Porque la señal salta entre los tramos no cubiertos en vez de recorrer toda la membrana punto por punto.' },
      { frente: '¿Qué hace el simpático con la actividad digestiva?', reverso: 'La reduce: aparta recursos de la digestión para llevarlos al músculo, al corazón y al pulmón.' },
      { frente: '¿Por qué se retira la mano antes de sentir el dolor?', reverso: 'Porque la médula genera respuestas reflejas propias sin consultar al encéfalo.' },
    ],
    quiz: [
      {
        pregunta: 'Un compañero afirma que «sistema nervioso periférico» y «sistema nervioso autónomo» son lo mismo. ¿Qué falla?',
        opciones: [
          'Nada: son sinónimos.',
          'Que pertenecen a divisiones distintas: la anatómica dice dónde está cada parte y la funcional dice qué hace.',
          'Que el autónomo no existe.',
          'Que el periférico solo lleva órdenes y no información.',
        ],
        correcta: 1,
        explicacion: 'Son dos divisiones que responden a preguntas distintas y que conviene no mezclar.',
      },
      {
        pregunta: '¿Qué explica que el encéfalo pese mucho menos dentro del cráneo de lo que pesaría apoyado?',
        opciones: [
          'Las membranas que lo envuelven.',
          'El líquido que lo rodea, que además de amortiguar cumple una función de sostén al hacerlo flotar.',
          'La rigidez del hueso craneal.',
          'La vaina de mielina de sus axones.',
        ],
        correcta: 1,
        explicacion: 'El líquido que rodea al sistema nervioso central lo amortigua y lo sostiene a la vez.',
      },
      {
        pregunta: 'Si se recuerda que el simpático prepara para un esfuerzo inmediato, ¿qué efecto se deduce sobre el diámetro de la vía aérea?',
        opciones: [
          'Lo reduce, para ahorrar aire.',
          'Lo aumenta, porque el esfuerzo exige más entrada de aire.',
          'No lo modifica.',
          'Lo aumenta solo si el parasimpático está inactivo.',
        ],
        correcta: 1,
        explicacion: 'Con esa lógica la tabla de efectos se deduce en lugar de memorizarse.',
      },
      {
        pregunta: '¿Qué relación tiene la conducción por el axón con la lección de electrofisiología?',
        opciones: [
          'Ninguna: son mecanismos distintos.',
          'Es el mismo potencial de acción, con la misma dependencia del gradiente y de la energía.',
          'El axón conduce sin gradientes iónicos.',
          'La conducción del axón es puramente química.',
        ],
        correcta: 1,
        explicacion: 'La señal que viaja por el axón es el potencial de acción ya estudiado; la mielina solo cambia su velocidad.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La región que concentra el control de la respiración, el latido cardíaco y el estado de alerta es el ___.',
          opciones: ['cerebelo', 'tronco encefálico', 'cerebro', 'nervio periférico'],
          correcta: 1,
          explicacion: 'Por eso una alteración en esa zona tiene consecuencias inmediatas sobre funciones que no admiten interrupción.',
        },
        {
          texto: 'La parte de la neurona que recibe la información de otras neuronas son las ___.',
          opciones: ['terminales', 'dendritas', 'vainas de mielina', 'sinapsis'],
          correcta: 1,
          explicacion: 'La neurona recibe por un extremo, integra en el cuerpo celular y transmite por el axón.',
        },
        {
          texto: 'Sobre la pupila, el simpático la dilata y el parasimpático la ___.',
          opciones: ['dilata también', 'contrae', 'inmoviliza', 'oscurece'],
          correcta: 1,
          explicacion: 'Las dos divisiones tienen efectos generalmente opuestos sobre los mismos órganos.',
        },
        {
          texto: 'La coordinación, el equilibrio y la precisión del movimiento dependen del ___.',
          opciones: ['tronco encefálico', 'cerebelo', 'sistema autónomo', 'nervio periférico'],
          correcta: 1,
          explicacion: 'El cerebro se ocupa del movimiento voluntario, la sensibilidad consciente, el lenguaje y el razonamiento.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 8; Guyton y Hall, 13.ª ed., caps. 46 y 62',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 8, p. 207.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 46, p. 333 y cap. 62, p. 450.',
      ],
      extra: [
        'No se nombran neurotransmisores concretos ni fármacos que actúen sobre ellos: pertenecen al '
          + 'Módulo 4 y se declaran fuera de alcance.',
        'Las escalas de valoración neurológica y las manifestaciones clínicas de las lesiones del '
          + 'sistema nervioso pertenecen a los módulos 3, 4 y 5.',
      ],
    }),
  },

  // ============================================================
  //  Sistema digestivo
  // ============================================================
  'm2-afi-digestivo': {
    icono: 'cp-servier-estomago',
    duracion: '20 min',
    resumen: 'El recorrido del alimento por el tubo digestivo, qué aporta cada tramo y qué hacen los '
      + 'órganos que no forman parte del tubo pero trabajan para él.',
    objetivos: [
      'Ordenar los tramos del tubo digestivo y describir la aportación de cada uno.',
      'Diferenciar el tubo digestivo de las glándulas anexas.',
      'Relacionar la estructura del intestino delgado con la absorción.',
      'Describir las funciones del hígado que exceden la digestión.',
    ],
    secciones: [
      {
        titulo: 'Un tubo y unas glándulas que trabajan para él',
        bloques: [
          { tipo: 'p', texto: 'El sistema digestivo tiene dos componentes que conviene separar desde el principio. Por un lado el tubo digestivo, un conducto continuo desde la boca hasta el ano por el que pasa el alimento. Por otro las glándulas anexas, que no forman parte del tubo pero vierten en él lo que producen.' },
          {
            tipo: 'tabla',
            titulo: 'El recorrido y lo que aporta cada tramo',
            headers: ['Tramo', 'Qué ocurre allí'],
            filas: [
              ['Boca', 'Fragmentación mecánica del alimento y mezcla con saliva, que inicia la digestión'],
              ['Faringe y esófago', 'Transporte hacia el estómago mediante contracciones ordenadas de su pared'],
              ['Estómago', 'Almacenamiento, mezcla y digestión en medio ácido; entrega controlada al intestino'],
              ['Intestino delgado', 'Digestión final y ABSORCIÓN de la mayor parte de los nutrientes'],
              ['Intestino grueso', 'Absorción de agua y sales, y formación de las heces'],
              ['Recto y ano', 'Almacenamiento y expulsión'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El avance no es por gravedad', texto: 'El alimento avanza por contracciones ordenadas de la pared del tubo, que es músculo liso e involuntario. Por eso se puede tragar acostado o boca abajo. Ese detalle conecta con la lección del sistema muscular: es el mismo músculo liso, con el mismo control involuntario.' },
        ],
      },
      {
        titulo: 'Por qué el intestino delgado absorbe tanto',
        bloques: [
          { tipo: 'p', texto: 'La absorción depende de la superficie disponible, y el intestino delgado está construido para maximizarla mediante tres niveles de plegamiento superpuestos: pliegues de la pared, prolongaciones digitiformes de la mucosa y, sobre las células de esas prolongaciones, microprolongaciones aún más pequeñas.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Estructura y función, en su forma más clara', texto: 'Un tubo liso del mismo largo absorbería una fracción mínima de lo que absorbe el intestino delgado. La función —absorber— explica por completo la forma —plegarse tres veces—. Es el ejemplo más nítido del principio que recorre todo este módulo.' },
          { tipo: 'p', texto: 'Cada tipo de nutriente se absorbe de forma distinta, pero todos comparten el mismo destino: pasan a la circulación y desde ahí al resto del organismo. Los productos de la digestión de los hidratos de carbono y de las proteínas van hacia el hígado antes de repartirse; buena parte de las grasas sigue una vía inicial distinta a través del sistema linfático.' },
        ],
      },
      {
        titulo: 'Las glándulas anexas',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Qué aporta cada una',
            headers: ['Glándula', 'Qué produce', 'Para qué sirve'],
            filas: [
              ['Glándulas salivales', 'Saliva', 'Humedecer el alimento e iniciar la digestión en la boca'],
              ['Hígado', 'Bilis', 'Facilitar la digestión de las grasas dispersándolas'],
              ['Vesícula biliar', 'No produce: almacena y concentra la bilis', 'Liberarla cuando llega alimento al intestino'],
              ['Páncreas exocrino', 'Jugo pancreático con enzimas', 'Digerir hidratos de carbono, proteínas y grasas en el intestino'],
            ],
          },
          { tipo: 'p', texto: 'El hígado merece un apartado propio porque su papel excede con mucho la digestión. Recibe la sangre que viene del tubo digestivo antes de que llegue al resto del organismo, lo que le permite procesar lo absorbido antes de repartirlo.' },
          {
            tipo: 'lista',
            titulo: 'Funciones del hígado más allá de la bilis',
            items: [
              'Transformar sustancias, incluidos muchos medicamentos y productos de desecho, para que puedan eliminarse.',
              'Almacenar y liberar glucosa según lo que el organismo necesite en cada momento.',
              'Fabricar proteínas del plasma, entre ellas las que sostienen la presión oncótica y las que participan en la coagulación.',
              'Almacenar vitaminas y hierro.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Tres lecciones se cruzan aquí', texto: 'Que el hígado fabrique las proteínas del plasma explica su vínculo con la lección de líquidos y electrolitos, donde esas proteínas sostenían la presión oncótica. Que transforme medicamentos anticipa por qué la farmacología se estudia con la función hepática delante. Este módulo establece la relación; las consecuencias clínicas pertenecen al Módulo 4.' },
        ],
      },
      F([aaos(9, 'Sistema gastrointestinal', 235), guyton(66, 'Digestión y absorción en el tubo digestivo', 478), guyton(71, 'El hígado como órgano', 510)]),
    ],
    conceptosClave: [
      { termino: 'Tubo digestivo', definicion: 'Conducto continuo desde la boca hasta el ano por el que pasa el alimento.' },
      { termino: 'Glándulas anexas', definicion: 'Órganos que no forman parte del tubo pero vierten en él lo que producen: salivales, hígado, vesícula biliar y páncreas exocrino.' },
      { termino: 'Plegamiento intestinal', definicion: 'Tres niveles superpuestos de plegamiento del intestino delgado que multiplican la superficie disponible para absorber.' },
      { termino: 'Bilis', definicion: 'Producto del hígado que facilita la digestión de las grasas dispersándolas; la vesícula la almacena y la concentra.' },
      { termino: 'Función metabólica del hígado', definicion: 'Transformación de sustancias y medicamentos, almacenamiento y liberación de glucosa, y fabricación de proteínas del plasma.' },
      { termino: 'Avance del alimento', definicion: 'Progresión por contracciones ordenadas del músculo liso de la pared, no por gravedad.' },
    ],
    flashcards: [
      { frente: '¿Qué tramo absorbe la mayor parte de los nutrientes?', reverso: 'El intestino delgado; el grueso absorbe sobre todo agua y sales.' },
      { frente: '¿Por qué se puede tragar estando acostado?', reverso: 'Porque el alimento avanza por contracciones ordenadas de la pared, que es músculo liso involuntario, y no por gravedad.' },
      { frente: '¿Cómo consigue el intestino delgado tanta superficie?', reverso: 'Con tres niveles superpuestos de plegamiento: pliegues de la pared, prolongaciones de la mucosa y microprolongaciones sobre sus células.' },
      { frente: '¿Produce bilis la vesícula biliar?', reverso: 'No: la produce el hígado. La vesícula la almacena, la concentra y la libera cuando llega alimento al intestino.' },
      { frente: 'Nombra dos funciones del hígado que no sean digestivas.', reverso: 'Transformar medicamentos y desechos para su eliminación, y fabricar proteínas del plasma como las de la coagulación.' },
      { frente: '¿Qué conecta al hígado con la lección de líquidos y electrolitos?', reverso: 'Que fabrica las proteínas del plasma, que son las que sostienen la presión oncótica.' },
    ],
    quiz: [
      {
        pregunta: 'El intestino delgado presenta tres niveles superpuestos de plegamiento. ¿Qué función explica esa forma?',
        opciones: [
          'Hacerlo más resistente a la presión.',
          'Maximizar la superficie disponible para absorber: un tubo liso del mismo largo absorbería una fracción mínima.',
          'Permitir que el alimento avance más rápido.',
          'Producir bilis en mayor cantidad.',
        ],
        correcta: 1,
        explicacion: 'Es el ejemplo más nítido del principio estructura-función que recorre el módulo.',
      },
      {
        pregunta: '¿Qué distingue a la vesícula biliar del hígado en cuanto a la bilis?',
        opciones: [
          'La vesícula la produce y el hígado la almacena.',
          'El hígado la produce; la vesícula la almacena, la concentra y la libera cuando llega alimento al intestino.',
          'Ambos la producen en la misma proporción.',
          'Ninguno de los dos interviene: la produce el páncreas.',
        ],
        correcta: 1,
        explicacion: 'La vesícula no produce nada: su papel es de almacenamiento y concentración.',
      },
      {
        pregunta: '¿Por qué el hígado puede procesar lo absorbido antes de que llegue al resto del organismo?',
        opciones: [
          'Porque forma parte del tubo digestivo.',
          'Porque recibe la sangre que viene del tubo digestivo antes de que se reparta al resto del cuerpo.',
          'Porque produce las enzimas del intestino.',
          'Porque almacena la bilis.',
        ],
        correcta: 1,
        explicacion: 'Esa posición en el recorrido de la sangre es lo que le permite transformar lo absorbido antes de repartirlo.',
      },
      {
        pregunta: 'Un paciente ha perdido función hepática. Según lo enseñado en esta lección, ¿qué proteínas del plasma se ven comprometidas?',
        opciones: [
          'Ninguna: las produce el intestino.',
          'Las que sostienen la presión oncótica y las que participan en la coagulación, porque el hígado las fabrica.',
          'Solo las enzimas digestivas.',
          'Solo las que transportan vitaminas.',
        ],
        correcta: 1,
        explicacion: 'Entre las funciones del hígado más allá de la bilis figura fabricar proteínas del plasma, incluidas esas dos.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el recorrido real del alimento por el tubo digestivo',
        pasos: [
          'Boca: fragmentación y mezcla con saliva',
          'Faringe y esófago: transporte por contracciones de la pared',
          'Estómago: almacenamiento, mezcla y digestión en medio ácido',
          'Intestino delgado: digestión final y absorción de nutrientes',
          'Intestino grueso: absorción de agua y sales, formación de heces',
          'Recto y ano: almacenamiento y expulsión',
        ],
      },
      completar: [
        {
          texto: 'El órgano que produce la bilis es el ___, mientras que la vesícula solo la almacena y la concentra.',
          opciones: ['páncreas', 'hígado', 'estómago', 'duodeno'],
          correcta: 1,
          explicacion: 'La bilis facilita la digestión de las grasas dispersándolas.',
        },
        {
          texto: 'La glándula anexa que produce jugo con enzimas para digerir hidratos de carbono, proteínas y grasas es el ___.',
          opciones: ['hígado', 'páncreas exocrino', 'glándula salival', 'intestino grueso'],
          correcta: 1,
          explicacion: 'Las glándulas anexas no forman parte del tubo, pero vierten en él lo que producen.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 9; Guyton y Hall, 13.ª ed., caps. 66 y 71',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 9, p. 235.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 66, p. 478 y cap. 71, p. 510.',
      ],
      extra: [
        'No se describen enfermedades digestivas ni su valoración: pertenecen al Módulo 4, donde ya '
          + 'está redactada la unidad gastrointestinal, y se declaran fuera de alcance.',
        'No se nombran enzimas concretas ni tiempos de vaciamiento: la lección enseña la aportación de '
          + 'cada tramo y la relación entre estructura y absorción.',
      ],
    }),
  },

  // ============================================================
  //  Sistema urinario
  // ============================================================
  'm2-afi-urinario': {
    icono: 'dg-nefrona',
    duracion: '20 min',
    resumen: 'Cómo el riñón fabrica la orina en tres pasos y por qué ese proceso regula mucho más que la '
      + 'eliminación de desechos.',
    objetivos: [
      'Describir los órganos del sistema urinario y su función.',
      'Ordenar los tres procesos por los que se forma la orina.',
      'Explicar por qué filtrar y luego recuperar es más eficaz que filtrar solo lo sobrante.',
      'Relacionar la función renal con el agua, los electrolitos y el equilibrio ácido-base.',
    ],
    secciones: [
      {
        titulo: 'Los órganos y su papel',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Quién hace qué',
            headers: ['Órgano', 'Función'],
            filas: [
              ['Riñones', 'Filtran la sangre y forman la orina; regulan agua, electrolitos y acidez'],
              ['Uréteres', 'Conducen la orina desde cada riñón hasta la vejiga'],
              ['Vejiga', 'Almacena la orina hasta su expulsión'],
              ['Uretra', 'Conduce la orina al exterior'],
            ],
          },
          { tipo: 'p', texto: 'Los riñones se sitúan en la parte posterior del abdomen, por detrás del peritoneo y a ambos lados de la columna. Reciben una proporción muy alta del flujo sanguíneo del organismo, y no porque necesiten mucho oxígeno, sino porque su tarea consiste precisamente en procesar sangre.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La unidad funcional es la nefrona', texto: 'Cada riñón contiene un número enorme de unidades microscópicas llamadas nefronas, y cada una realiza el proceso completo. El riñón no funciona como un órgano único que filtra, sino como la suma de muchísimas unidades que hacen lo mismo en paralelo: por eso puede perder una parte de su capacidad sin que la función se detenga.' },
        ],
      },
      {
        titulo: 'Los tres pasos de la formación de orina',
        bloques: [
          { tipo: 'p', texto: 'La orina no se produce recogiendo lo que sobra. Se produce filtrando de forma masiva y recuperando después casi todo lo aprovechable, con un ajuste final. Son tres procesos que ocurren en este orden.' },
          {
            tipo: 'tabla',
            titulo: 'Qué ocurre en cada paso',
            headers: ['Paso', 'Qué hace', 'Dónde ocurre'],
            filas: [
              ['Filtración', 'La presión de la sangre empuja agua y sustancias pequeñas fuera del capillar; las células y las proteínas grandes no pasan', 'En el ovillo de capilares de la nefrona'],
              ['Reabsorción', 'Se recupera hacia la sangre casi toda el agua y las sustancias útiles filtradas', 'A lo largo del túbulo de la nefrona'],
              ['Secreción', 'Se añaden al túbulo sustancias que conviene eliminar y que no se filtraron', 'A lo largo del túbulo de la nefrona'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué filtrar todo y recuperar después', texto: 'Podría parecer un derroche, pero es lo que da precisión al sistema. Al filtrar de forma masiva y decidir después qué se recupera, el riñón puede ajustar con exactitud cuánta agua, cuánto sodio y cuánto de cada sustancia se queda en el organismo, momento a momento. Un sistema que filtrara solo lo sobrante no podría corregir un desequilibrio.' },
          { tipo: 'p', texto: 'Lo que queda al final del recorrido es la orina, que sale de la nefrona, se recoge y se conduce hacia el uréter. Su composición y su volumen varían continuamente según lo que el organismo necesite conservar o eliminar en ese momento.' },
        ],
      },
      {
        titulo: 'El riñón regula mucho más que los desechos',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Funciones renales',
            items: [
              'Eliminar productos de desecho del metabolismo.',
              'Regular el volumen de agua del organismo decidiendo cuánta se recupera.',
              'Regular la concentración de los electrolitos, entre ellos el sodio y el potasio.',
              'Participar en el equilibrio ácido-base eliminando hidrogeniones y recuperando bicarbonato.',
              'Participar en la regulación de la presión arterial a largo plazo, a través del control del volumen.',
              'Producir sustancias que intervienen en la formación de células sanguíneas y en el metabolismo del calcio.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Aquí convergen tres lecciones anteriores', texto: 'El riñón es el mecanismo lento y definitivo del equilibrio ácido-base; es quien decide cuánta agua se conserva, lo que enlaza con la lección de líquidos y electrolitos; y regula el sodio, que a su vez determina el reparto del agua entre compartimientos. No es un órgano de eliminación: es el regulador del medio interno.' },
          { tipo: 'p', texto: 'Esa convergencia explica por qué la pérdida de función renal repercute en tantos sistemas a la vez. Este módulo se detiene aquí: qué manifestaciones produce esa pérdida y cómo se valoran pertenece al Módulo 4, donde el plan sitúa las urgencias urinarias.' },
        ],
      },
      F([aaos(10, 'Sistema urinario y metabolismo (apartado 10.2, Sistema urinario)', 259), guyton(26, 'El sistema urinario: anatomía funcional y formación de orina en los riñones', 185), guyton(31, 'Regulación acidobásica', 230)]),
    ],
    conceptosClave: [
      { termino: 'Nefrona', definicion: 'Unidad funcional microscópica del riñón; cada una realiza el proceso completo y trabajan en paralelo.' },
      { termino: 'Filtración', definicion: 'Paso en que la presión de la sangre empuja agua y sustancias pequeñas fuera del capilar, sin dejar pasar células ni proteínas grandes.' },
      { termino: 'Reabsorción', definicion: 'Recuperación hacia la sangre de casi toda el agua y las sustancias útiles que se habían filtrado.' },
      { termino: 'Secreción tubular', definicion: 'Adición al túbulo de sustancias que conviene eliminar y que no se filtraron.' },
      { termino: 'Precisión por filtrado masivo', definicion: 'Principio por el que filtrar todo y recuperar después permite ajustar con exactitud lo que se conserva, algo imposible si solo se filtrara lo sobrante.' },
      { termino: 'Regulador del medio interno', definicion: 'Papel del riñón en agua, electrolitos, acidez, presión a largo plazo y producción de sustancias reguladoras.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la unidad funcional del riñón?', reverso: 'La nefrona; cada riñón tiene muchísimas y todas hacen el proceso completo en paralelo.' },
      { frente: '¿En qué orden se forma la orina?', reverso: 'Filtración, reabsorción y secreción.' },
      { frente: '¿Qué NO pasa el filtro renal?', reverso: 'Las células de la sangre y las proteínas grandes.' },
      { frente: '¿Por qué el riñón filtra todo y recupera después?', reverso: 'Porque así puede ajustar con exactitud cuánta agua y cuánto de cada sustancia se conserva; filtrar solo lo sobrante no permitiría corregir un desequilibrio.' },
      { frente: '¿Qué papel tiene el riñón en el equilibrio ácido-base?', reverso: 'Es el mecanismo lento y definitivo: elimina hidrogeniones y recupera bicarbonato.' },
      { frente: '¿Por qué el riñón puede perder parte de su capacidad sin detener su función?', reverso: 'Porque funciona como la suma de muchísimas nefronas que trabajan en paralelo, no como una unidad única.' },
    ],
    quiz: [
      {
        pregunta: '¿Por qué los riñones reciben una proporción tan alta del flujo sanguíneo?',
        opciones: [
          'Porque consumen mucho oxígeno.',
          'Porque su tarea consiste precisamente en procesar sangre.',
          'Porque almacenan sangre como reservorio.',
          'Porque producen células sanguíneas.',
        ],
        correcta: 1,
        explicacion: 'No es una cuestión de demanda de oxígeno, sino de que la sangre es el material sobre el que trabajan.',
      },
      {
        pregunta: 'Un sistema que filtrara únicamente lo sobrante, ¿qué no podría hacer?',
        opciones: [
          'Eliminar desechos.',
          'Corregir un desequilibrio, porque no podría ajustar con exactitud cuánta agua y cuánto de cada sustancia se conserva.',
          'Producir orina.',
          'Conducir la orina a la vejiga.',
        ],
        correcta: 1,
        explicacion: 'La precisión del riñón viene de filtrar de forma masiva y decidir después qué se recupera.',
      },
      {
        pregunta: '¿Qué proceso añade al túbulo sustancias que no se habían filtrado?',
        opciones: [
          'La filtración.',
          'La secreción tubular.',
          'La reabsorción.',
          'La excreción por el uréter.',
        ],
        correcta: 1,
        explicacion: 'La reabsorción recupera hacia la sangre; la secreción hace el movimiento contrario, hacia el túbulo.',
      },
      {
        pregunta: '¿Por qué se dice que el riñón es el regulador del medio interno y no solo un órgano de eliminación?',
        opciones: [
          'Porque produce orina de forma continua.',
          'Porque decide cuánta agua se conserva, regula los electrolitos, participa en el equilibrio ácido-base y en la presión a largo plazo.',
          'Porque recibe mucha sangre.',
          'Porque está formado por nefronas.',
        ],
        correcta: 1,
        explicacion: 'En esa convergencia se cruzan las lecciones de líquidos y electrolitos, de equilibrio ácido-base y esta.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia real de formación de la orina',
        pasos: [
          'La sangre llega al ovillo de capilares de la nefrona',
          'Filtración: pasan agua y sustancias pequeñas; no pasan células ni proteínas grandes',
          'Reabsorción: se recupera hacia la sangre casi toda el agua y lo útil',
          'Secreción: se añaden al túbulo sustancias que conviene eliminar',
          'Lo que queda es la orina y sale de la nefrona',
          'El uréter la conduce hasta la vejiga, donde se almacena',
        ],
      },
      completar: [
        {
          texto: 'La unidad microscópica que realiza el proceso completo de formación de orina es la ___.',
          opciones: ['vejiga', 'nefrona', 'uretra', 'cápsula renal'],
          correcta: 1,
          explicacion: 'Trabajan en paralelo, y por eso el riñón puede perder parte de su capacidad sin detener su función.',
        },
        {
          texto: 'En el equilibrio ácido-base, el riñón es el mecanismo ___ y definitivo, porque elimina hidrogeniones y recupera bicarbonato.',
          opciones: ['inmediato', 'lento', 'químico', 'respiratorio'],
          correcta: 1,
          explicacion: 'Los amortiguadores actúan en segundos y el pulmón en minutos; el riñón tarda horas o días pero resuelve.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 10.2; Guyton y Hall, 13.ª ed., caps. 26 y 31',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 10, apartado 10.2, p. 259.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 26, p. 185 y cap. 31, p. 230.',
      ],
      extra: [
        'No se publican volúmenes de filtrado, diuresis normal ni valores de función renal: son cifras '
          + 'que dependen de población y de laboratorio, y este módulo enseña el mecanismo.',
        'Las urgencias urinarias y la valoración del deterioro renal pertenecen al Módulo 4 y se '
          + 'declaran expresamente fuera de alcance.',
      ],
    }),
  },
}
