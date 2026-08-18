// ============================================================
//  Módulo 2 · Anatomía y fisiología esencial
// ------------------------------------------------------------
//  Primera de las tres unidades del Módulo 2 (5 semanas, 25 horas), en el
//  orden del PDF: célula, líquidos y electrolitos, electrofisiología,
//  equilibrio ácido-base, metabolismo y sistema tegumentario.
//
//  FUENTES REALMENTE ABIERTAS PARA ESTE ARCHIVO
//
//  Tortora NO está en la biblioteca de la academia. No se cita, no se le
//  atribuye ninguna página y no se sustituye por otra obra bajo su nombre.
//  Lo que sí se abrió y se verificó capítulo por capítulo el 17 de agosto de
//  2026 sobre las copias de la biblioteca:
//
//    · AAOS, «Anatomía y fisiología» enfocada a la atención prehospitalaria
//      (Elling, Elling y Rothenberg; Editorial Millas). Orientación
//      prehospitalaria del contenido.
//    · Guyton y Hall, Compendio de Fisiología Médica, 13.ª ed. Fisiología.
//
//  ALCANCE DEL MÓDULO: estructura y función. No hay tratamientos, dosis,
//  algoritmos, diagnósticos ni procedimientos: eso pertenece a los módulos 3,
//  4, 5 y 6. La única conexión prehospitalaria admitida es explicar por qué
//  conocer una estructura o una función ayuda a OBSERVAR, COMUNICAR o
//  COMPRENDER un hallazgo.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

// Citas con capítulo y página impresa verificados sobre la copia de la
// biblioteca de la academia el 17 de agosto de 2026.
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
  + 'páginas y no se sustituye por otra obra bajo su nombre. Las fuentes usadas son AAOS y Guyton, '
  + 'abiertas y verificadas con capítulo y página.'

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
  //  Célula: función y organelos
  // ============================================================
  'm2-afe-celula': {
    icono: '🔬',
    duracion: '20 min',
    resumen: 'Qué hace cada parte de la célula y por qué la membrana, que decide qué entra y qué sale, '
      + 'explica buena parte de la fisiología que se estudia después.',
    objetivos: [
      'Describir la función de la membrana celular y de los principales organelos.',
      'Relacionar cada organelo con la consecuencia de que deje de funcionar.',
      'Diferenciar los mecanismos de transporte que no gastan energía de los que sí.',
      'Explicar por qué la célula depende de un aporte continuo de oxígeno y de sustrato.',
    ],
    secciones: [
      {
        titulo: 'La célula como unidad funcional',
        bloques: [
          { tipo: 'p', texto: 'El cuerpo humano está formado por células que se especializan y se agrupan en tejidos, los tejidos en órganos y los órganos en sistemas. Esa jerarquía no es un adorno académico: explica por qué un problema que empieza en el nivel celular termina manifestándose como un signo que puede observarse desde fuera.' },
          { tipo: 'p', texto: 'Toda célula comparte tres elementos: una membrana que la separa del exterior, un citoplasma donde ocurren las reacciones y un núcleo que guarda la información. Alrededor de esos tres se organizan los organelos, cada uno con una tarea concreta.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué esto se estudia antes que nada', texto: 'Casi todo lo que se aprende después —cómo se contrae un músculo, cómo late el corazón, cómo se transmite un impulso nervioso, por qué la falta de oxígeno daña un órgano— se explica en el nivel de la célula. Empezar aquí evita memorizar más adelante lo que se podría entender.' },
        ],
      },
      {
        titulo: 'Los organelos y su tarea',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Estructura y función',
            headers: ['Estructura', 'Qué hace', 'Qué ocurre si falla'],
            filas: [
              ['Membrana celular', 'Separa el interior del exterior y controla qué entra y qué sale', 'La célula pierde su composición interna y se altera todo lo demás'],
              ['Núcleo', 'Contiene el material genético y dirige la síntesis de proteínas', 'La célula no puede fabricar ni renovar sus proteínas'],
              ['Mitocondria', 'Obtiene energía aprovechable a partir de nutrientes y oxígeno', 'La célula no dispone de energía y su funcionamiento se detiene'],
              ['Retículo endoplásmico', 'Fabrica proteínas y lípidos', 'Se interrumpe la producción de material propio'],
              ['Aparato de Golgi', 'Empaqueta y distribuye lo que la célula produce', 'Lo fabricado no llega a su destino'],
              ['Lisosomas', 'Degradan material de desecho y sustancias captadas', 'Se acumulan residuos dentro de la célula'],
              ['Citoesqueleto', 'Da forma, sostiene los organelos y permite el movimiento interno', 'La célula pierde forma y organización'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La mitocondria es la que conecta con la clínica', texto: 'Es el organelo que necesita oxígeno para producir energía de forma eficiente. Esa dependencia es la razón por la que la interrupción del aporte de oxígeno tiene consecuencias en minutos y no en días, y es el puente entre esta lección y todo lo que se estudia sobre respiración y circulación.' },
        ],
      },
      {
        titulo: 'La membrana decide',
        bloques: [
          { tipo: 'p', texto: 'La membrana celular está formada por una doble capa de lípidos con proteínas insertadas. Los lípidos hacen que las sustancias solubles en grasa la atraviesen con facilidad y que las solubles en agua no; las proteínas son las que abren paso a estas últimas, funcionando como canales o como transportadores.' },
          { tipo: 'p', texto: 'A esa propiedad se le llama permeabilidad selectiva: la membrana no es una barrera cerrada ni un colador, sino un filtro que elige. De ahí que el interior de la célula tenga una composición distinta de la del líquido que la rodea, diferencia que la propia célula mantiene activamente.' },
          {
            tipo: 'tabla',
            titulo: 'Cómo se atraviesa la membrana',
            headers: ['Mecanismo', 'Gasta energía', 'A favor o en contra del gradiente'],
            filas: [
              ['Difusión simple', 'No', 'A favor: de donde hay más a donde hay menos'],
              ['Difusión facilitada', 'No', 'A favor, pero necesita una proteína que abra paso'],
              ['Ósmosis', 'No', 'Movimiento de agua hacia donde hay más solutos'],
              ['Transporte activo', 'Sí', 'En contra del gradiente: acumula donde ya hay más'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Sin energía no hay gradiente', texto: 'El transporte activo es el único que puede mover sustancias en contra de su gradiente, y para eso consume energía. Cuando la célula deja de producirla, ese transporte se detiene, las diferencias de composición se desvanecen y la célula empieza a parecerse al líquido que la rodea. Es la explicación de por qué la falta de oxígeno acaba alterando la función de un tejido.' },
        ],
      },
      {
        titulo: 'De la célula al tejido',
        bloques: [
          { tipo: 'p', texto: 'Las células que comparten estructura y función forman tejidos. En el cuerpo humano se reconocen cuatro tipos fundamentales, y cada órgano combina varios de ellos.' },
          {
            tipo: 'lista',
            titulo: 'Los cuatro tejidos fundamentales',
            items: [
              'Epitelial: recubre superficies y cavidades, y forma glándulas. Protege y controla el intercambio.',
              'Conjuntivo: une, sostiene y rellena. Incluye desde el tejido que rodea un órgano hasta el hueso y la sangre.',
              'Muscular: se acorta y genera movimiento. Existe en variedad esquelética, cardíaca y lisa.',
              'Nervioso: genera y conduce señales eléctricas, y coordina al resto.',
            ],
          },
          { tipo: 'p', texto: 'Reconocer de qué tejido está hecha una estructura permite anticipar cómo se comporta. Un órgano con mucho tejido conjuntivo resiste mejor la tracción; uno formado sobre todo por epitelio y vasos sangra con facilidad al lesionarse. Esa lógica es la que se aplicará en los módulos siguientes al observar una lesión o un signo.' },
        ],
      },
      F([aaos(2, 'Células', 33), guyton(2, 'La célula y sus funciones', 9), guyton(4, 'Transporte de sustancias a través de las membranas celulares', 31)]),
    ],
    conceptosClave: [
      { termino: 'Permeabilidad selectiva', definicion: 'Propiedad de la membrana celular de dejar pasar unas sustancias y no otras; mantiene la diferencia de composición entre el interior y el exterior de la célula.' },
      { termino: 'Mitocondria', definicion: 'Organelo que obtiene energía aprovechable a partir de nutrientes y oxígeno; su dependencia del oxígeno explica que la interrupción del aporte tenga consecuencias en minutos.' },
      { termino: 'Transporte activo', definicion: 'Paso de sustancias en contra de su gradiente, único mecanismo que lo consigue y el único que consume energía.' },
      { termino: 'Ósmosis', definicion: 'Movimiento de agua a través de la membrana hacia el lado donde hay más solutos; no consume energía.' },
      { termino: 'Tejido', definicion: 'Agrupación de células con estructura y función comunes. Los cuatro fundamentales son epitelial, conjuntivo, muscular y nervioso.' },
      { termino: 'Jerarquía de organización', definicion: 'Secuencia célula, tejido, órgano y sistema, que explica por qué un problema celular termina manifestándose como un signo observable.' },
    ],
    flashcards: [
      { frente: '¿Qué organelo necesita oxígeno para producir energía?', reverso: 'La mitocondria; esa dependencia explica que la falta de oxígeno tenga consecuencias en minutos.' },
      { frente: '¿Qué significa que la membrana sea de permeabilidad selectiva?', reverso: 'Que no es ni barrera cerrada ni colador: elige qué pasa, y así mantiene distinta la composición interior y exterior.' },
      { frente: '¿Cuál es el único transporte que consume energía?', reverso: 'El transporte activo, que es también el único capaz de mover sustancias en contra de su gradiente.' },
      { frente: '¿Hacia dónde se mueve el agua en la ósmosis?', reverso: 'Hacia el lado donde hay más solutos.' },
      { frente: 'Nombra los cuatro tejidos fundamentales.', reverso: 'Epitelial, conjuntivo, muscular y nervioso.' },
      { frente: '¿Qué le pasa a la célula si deja de producir energía?', reverso: 'El transporte activo se detiene, los gradientes se desvanecen y su composición interna se parece cada vez más a la del líquido que la rodea.' },
    ],
    quiz: [
      {
        pregunta: 'Una célula deja de recibir oxígeno. ¿Cuál es la consecuencia que explica todas las demás?',
        opciones: [
          'El núcleo pierde su material genético.',
          'La mitocondria no puede producir energía aprovechable, y sin energía se detiene el transporte activo que mantiene los gradientes.',
          'La membrana se vuelve impermeable a todo.',
          'El aparato de Golgi deja de recibir proteínas del núcleo.',
        ],
        correcta: 1,
        explicacion: 'La mitocondria necesita oxígeno para producir energía; el transporte activo es el único mecanismo que consume energía y el único que mueve sustancias en contra de su gradiente.',
      },
      {
        pregunta: 'Una sustancia soluble en agua necesita entrar a la célula a favor de su gradiente. ¿Qué mecanismo lo permite sin gastar energía?',
        opciones: [
          'Transporte activo.',
          'Difusión facilitada, que usa una proteína de la membrana para abrir paso.',
          'Ósmosis.',
          'Ninguno: toda entrada de sustancias solubles en agua consume energía.',
        ],
        correcta: 1,
        explicacion: 'Los lípidos de la membrana frenan a las sustancias solubles en agua; las proteínas insertadas les abren paso, y a favor del gradiente eso no consume energía.',
      },
      {
        pregunta: 'Fallan los lisosomas de una célula. ¿Qué se observa dentro de ella?',
        opciones: [
          'Pierde su forma y sus organelos se desorganizan.',
          'Se acumula material de desecho que ya no puede degradarse.',
          'Deja de fabricar proteínas.',
          'Deja de producir energía.',
        ],
        correcta: 1,
        explicacion: 'Los lisosomas degradan material de desecho y sustancias captadas; si fallan, esos residuos se acumulan. La pérdida de forma corresponde al citoesqueleto y la falta de energía a la mitocondria.',
      },
      {
        pregunta: '¿Por qué se estudia la célula antes que los sistemas?',
        opciones: [
          'Porque es el tema más sencillo del módulo.',
          'Porque la jerarquía célula, tejido, órgano y sistema explica por qué un problema celular termina manifestándose como un signo observable.',
          'Porque los sistemas no dependen de las células.',
          'Porque permite anticipar el tratamiento de cada sistema.',
        ],
        correcta: 1,
        explicacion: 'Esa jerarquía es la razón de estudiarla primero; el tratamiento no pertenece a este módulo.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La ___ es el organelo que necesita oxígeno para producir energía aprovechable, y por eso su fallo se nota en minutos.',
          opciones: ['membrana celular', 'mitocondria', 'aparato de Golgi', 'lisosoma'],
          correcta: 1,
          explicacion: 'Es la conexión entre esta lección y todo lo que se estudia sobre respiración y circulación.',
        },
        {
          texto: 'Un organelo empaqueta y distribuye lo que la célula produce; si falla, lo fabricado no llega a su destino. Ese organelo es el ___.',
          opciones: ['retículo endoplásmico', 'aparato de Golgi', 'núcleo', 'citoesqueleto'],
          correcta: 1,
          explicacion: 'El retículo endoplásmico fabrica; el aparato de Golgi empaqueta y distribuye.',
        },
        {
          texto: 'El movimiento de agua hacia el lado donde hay más solutos se llama ___ y no consume energía.',
          opciones: ['transporte activo', 'ósmosis', 'difusión facilitada', 'fagocitosis'],
          correcta: 1,
          explicacion: 'Es uno de los mecanismos que atraviesan la membrana sin gasto energético.',
        },
        {
          texto: 'Un órgano formado sobre todo por tejido ___ resiste mejor la tracción, porque ese tejido une, sostiene y rellena.',
          opciones: ['epitelial', 'conjuntivo', 'nervioso', 'muscular'],
          correcta: 1,
          explicacion: 'Reconocer de qué tejido está hecha una estructura permite anticipar cómo se comporta.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 2; Guyton y Hall, 13.ª ed., caps. 2 y 4',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 2, p. 33.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 2, p. 9 y cap. 4, p. 31.',
      ],
      extra: [
        'Actividad de tipo «completar relación estructura-función»; no repite ninguna pregunta del quiz.',
      ],
    }),
  },

  // ============================================================
  //  Líquidos y electrolitos
  // ============================================================
  'm2-afe-liquidos-electrolitos': {
    icono: '💧',
    duracion: '20 min',
    resumen: 'Dónde está el agua del cuerpo, qué la mantiene en su sitio y qué papel cumplen los '
      + 'principales electrolitos.',
    objetivos: [
      'Distinguir los compartimientos de líquido corporal y su proporción relativa.',
      'Explicar qué fuerzas mantienen el agua repartida entre ellos.',
      'Relacionar cada electrolito principal con la función que sostiene.',
      'Justificar por qué el agua se desplaza entre compartimientos sin salir del cuerpo.',
    ],
    secciones: [
      {
        titulo: 'Dónde está el agua',
        bloques: [
          { tipo: 'p', texto: 'El agua corporal no está en un solo lugar. Se reparte en compartimientos separados por membranas, y cada uno tiene una composición distinta que el organismo mantiene de forma activa.' },
          {
            tipo: 'tabla',
            titulo: 'Los compartimientos',
            headers: ['Compartimiento', 'Dónde está', 'Rasgo que lo distingue'],
            filas: [
              ['Intracelular', 'Dentro de las células', 'Es el compartimiento con más agua del organismo'],
              ['Extracelular · intersticial', 'Entre las células, bañándolas', 'Es el medio por el que la célula intercambia con la sangre'],
              ['Extracelular · intravascular (plasma)', 'Dentro de los vasos sanguíneos', 'Es el que circula y el que transporta'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La proporción importa menos que la comunicación', texto: 'Lo decisivo no es memorizar porcentajes, sino entender que los tres compartimientos están comunicados. El agua pasa de uno a otro siguiendo reglas físicas, de modo que un problema en la sangre puede resolverse a costa del líquido que rodea a las células, y al revés.' },
        ],
      },
      {
        titulo: 'Qué mantiene el agua en su sitio',
        bloques: [
          { tipo: 'p', texto: 'Dos fuerzas opuestas gobiernan el reparto del agua a través de la pared de los capilares, y su equilibrio explica tanto la situación normal como su alteración.' },
          {
            tipo: 'lista',
            titulo: 'Las dos fuerzas',
            items: [
              'La presión hidrostática es la que empuja el líquido HACIA FUERA del vaso. Procede de la presión con que la sangre circula.',
              'La presión oncótica es la que retiene el líquido DENTRO del vaso. Procede de las proteínas del plasma, que por su tamaño no atraviesan con facilidad la pared del capilar y atraen agua hacia sí.',
            ],
          },
          { tipo: 'p', texto: 'Cuando ambas se equilibran, el líquido que sale al principio del capilar vuelve a entrar al final, y el volumen del intersticio se mantiene estable. Cuando ese equilibrio se rompe —porque sube la presión hidrostática o porque bajan las proteínas del plasma— se acumula líquido entre las células. A esa acumulación se le llama edema.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Edema no significa exceso de agua en el cuerpo', texto: 'Significa que el agua está en el compartimiento equivocado. Una persona puede tener edema evidente y, al mismo tiempo, poco líquido circulando dentro de los vasos. Distinguir «cuánta agua hay» de «dónde está» es una de las ideas más útiles de esta lección.' },
        ],
      },
      {
        titulo: 'Los electrolitos y lo que sostienen',
        bloques: [
          { tipo: 'p', texto: 'Los electrolitos son sustancias que al disolverse se separan en partículas con carga eléctrica, llamadas iones. Esa carga es la que les permite participar en la transmisión de señales, en la contracción muscular y en el reparto del agua.' },
          {
            tipo: 'tabla',
            titulo: 'Principales electrolitos y su papel',
            headers: ['Electrolito', 'Dónde predomina', 'Función que sostiene'],
            filas: [
              ['Sodio', 'Líquido extracelular', 'Determina en gran medida el reparto del agua entre compartimientos'],
              ['Potasio', 'Líquido intracelular', 'Es esencial para la excitabilidad de las células nerviosas y musculares'],
              ['Calcio', 'Hueso y líquido extracelular', 'Participa en la contracción muscular, en la coagulación y en la resistencia del hueso'],
              ['Cloro', 'Líquido extracelular', 'Acompaña al sodio y contribuye al equilibrio de cargas'],
              ['Bicarbonato', 'Líquido extracelular', 'Participa en el mantenimiento del equilibrio ácido-base'],
              ['Magnesio', 'Sobre todo intracelular', 'Interviene en reacciones que requieren energía y en la función muscular'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El sodio manda sobre el agua', texto: 'Como el agua se mueve hacia donde hay más solutos, y el sodio es el soluto más abundante fuera de las células, la cantidad de sodio de un compartimiento determina en buena medida cuánta agua lo acompaña. Es la razón por la que sodio y agua se estudian juntos y no por separado.' },
          { tipo: 'p', texto: 'Este módulo no entra en qué alteraciones producen sus desequilibrios ni en cómo se corrigen: eso corresponde a las unidades clínicas. Aquí basta con reconocer qué función sostiene cada uno, porque es lo que permitirá entender después por qué su alteración se manifiesta como se manifiesta.' },
        ],
      },
      F([guyton(25, 'Compartimientos del líquido corporal: líquidos extracelular e intracelular; edema', 175), aaos(5, 'Sistema circulatorio', 135)]),
    ],
    conceptosClave: [
      { termino: 'Compartimiento intracelular', definicion: 'Agua contenida dentro de las células; es el compartimiento con más agua del organismo.' },
      { termino: 'Compartimiento extracelular', definicion: 'Agua fuera de las células, dividida en intersticial —entre ellas— e intravascular o plasma —dentro de los vasos—.' },
      { termino: 'Presión hidrostática', definicion: 'Fuerza que empuja el líquido hacia fuera del vaso; procede de la presión con que circula la sangre.' },
      { termino: 'Presión oncótica', definicion: 'Fuerza que retiene el líquido dentro del vaso; procede de las proteínas del plasma, que atraen agua hacia sí.' },
      { termino: 'Edema', definicion: 'Acumulación de líquido en el intersticio por ruptura del equilibrio entre presión hidrostática y oncótica; indica que el agua está en el compartimiento equivocado.' },
      { termino: 'Electrolito', definicion: 'Sustancia que al disolverse se separa en iones con carga eléctrica, lo que le permite participar en señales, contracción y reparto del agua.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el compartimiento con más agua del organismo?', reverso: 'El intracelular, dentro de las células.' },
      { frente: '¿Qué fuerza empuja el líquido hacia fuera del capilar?', reverso: 'La presión hidrostática, procedente de la presión con que circula la sangre.' },
      { frente: '¿De dónde procede la presión oncótica?', reverso: 'De las proteínas del plasma, que por su tamaño no atraviesan con facilidad la pared del capilar y atraen agua hacia sí.' },
      { frente: '¿Significa el edema que sobra agua en el cuerpo?', reverso: 'No: significa que el agua está en el compartimiento equivocado. Puede haber edema y poco líquido circulando a la vez.' },
      { frente: '¿Qué electrolito predomina dentro de la célula y sostiene la excitabilidad?', reverso: 'El potasio.' },
      { frente: '¿Por qué se estudian juntos el sodio y el agua?', reverso: 'Porque el agua se mueve hacia donde hay más solutos y el sodio es el soluto más abundante fuera de las células.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente presenta edema evidente en las piernas. ¿Qué permite afirmar ese hallazgo sobre el agua de su cuerpo?',
        opciones: [
          'Que tiene un exceso total de agua.',
          'Que hay agua acumulada en el intersticio, sin que eso indique cuánta está circulando dentro de los vasos.',
          'Que su compartimiento intracelular está vacío.',
          'Que sus proteínas plasmáticas están aumentadas.',
        ],
        correcta: 1,
        explicacion: 'El edema indica que el agua está en el compartimiento equivocado; puede coexistir con poco líquido circulando dentro de los vasos.',
      },
      {
        pregunta: 'Si descienden las proteínas del plasma, ¿qué ocurre con el reparto del líquido?',
        opciones: [
          'Aumenta la presión hidrostática y el líquido entra al vaso.',
          'Disminuye la presión oncótica, se retiene menos líquido dentro del vaso y tiende a acumularse en el intersticio.',
          'El agua se desplaza al compartimiento intracelular exclusivamente.',
          'No hay cambio, porque el reparto solo depende del sodio.',
        ],
        correcta: 1,
        explicacion: 'La presión oncótica procede de las proteínas del plasma y es la que retiene el líquido dentro del vaso.',
      },
      {
        pregunta: '¿Qué función sostiene principalmente el potasio?',
        opciones: [
          'El reparto del agua entre compartimientos.',
          'La excitabilidad de las células nerviosas y musculares.',
          'La resistencia del hueso.',
          'El equilibrio de cargas acompañando al sodio.',
        ],
        correcta: 1,
        explicacion: 'El potasio predomina en el líquido intracelular y es esencial para la excitabilidad; el reparto del agua corresponde sobre todo al sodio.',
      },
      {
        pregunta: '¿Por qué el agua puede desplazarse entre compartimientos sin salir del cuerpo?',
        opciones: [
          'Porque los compartimientos están aislados entre sí.',
          'Porque están comunicados y el agua pasa de uno a otro siguiendo reglas físicas, como el movimiento hacia donde hay más solutos.',
          'Porque el riñón la traslada activamente de uno a otro.',
          'Porque el edema abre paso entre ellos.',
        ],
        correcta: 1,
        explicacion: 'Lo decisivo es que los tres compartimientos están comunicados: un problema en la sangre puede resolverse a costa del líquido que rodea a las células, y al revés.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La fuerza que retiene el líquido DENTRO del vaso y procede de las proteínas del plasma es la presión ___.',
          opciones: ['hidrostática', 'oncótica', 'atmosférica', 'osmótica intracelular'],
          correcta: 1,
          explicacion: 'La hidrostática empuja hacia fuera; la oncótica retiene hacia dentro.',
        },
        {
          texto: 'El electrolito que predomina en el líquido extracelular y determina en gran medida cuánta agua lo acompaña es el ___.',
          opciones: ['potasio', 'sodio', 'magnesio', 'bicarbonato'],
          correcta: 1,
          explicacion: 'Por eso sodio y agua se estudian juntos y no por separado.',
        },
        {
          texto: 'El compartimiento extracelular que baña a las células y sirve de medio de intercambio con la sangre es el ___.',
          opciones: ['intravascular', 'intersticial', 'intracelular', 'linfático'],
          correcta: 1,
          explicacion: 'El intravascular es el que circula; el intersticial es el que rodea a las células.',
        },
        {
          texto: 'Un aumento de la presión hidrostática dentro del capilar favorece que el líquido ___ del vaso, y si el desequilibrio se mantiene aparece edema.',
          opciones: ['entre al interior', 'salga hacia el intersticio', 'se detenga por completo', 'pase al compartimiento intracelular'],
          correcta: 1,
          explicacion: 'La presión hidrostática empuja hacia fuera; el edema es la acumulación resultante en el intersticio.',
        },
      ],
    },
    revision: ficha({
      version: 'Guyton y Hall, 13.ª ed., cap. 25; AAOS Anatomía y fisiología prehospitalaria, cap. 5',
      fuentes: [
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 25, p. 175.',
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 5, p. 135 (apartado de electrólitos).',
      ],
      extra: [
        'No se publican porcentajes de agua corporal ni valores de referencia de electrolitos: la '
          + 'lección enseña el reparto y la función, y esas cifras dependen de población y de fuente '
          + 'de laboratorio que este módulo no necesita.',
        'Las alteraciones de cada electrolito y su corrección pertenecen a los módulos clínicos y se '
          + 'declaran expresamente fuera de alcance.',
      ],
    }),
  },

  // ============================================================
  //  Electrofisiología
  // ============================================================
  'm2-afe-electrofisiologia': {
    icono: '⚡',
    duracion: '20 min',
    resumen: 'Cómo una célula mantiene una diferencia eléctrica a través de su membrana y cómo la '
      + 'invierte durante un instante para generar una señal.',
    objetivos: [
      'Explicar el origen del potencial de reposo de la membrana.',
      'Ordenar las fases del potencial de acción y el movimiento iónico de cada una.',
      'Relacionar el periodo refractario con la protección frente a estímulos sucesivos.',
      'Justificar por qué las células excitables dependen del aporte de energía.',
    ],
    secciones: [
      {
        titulo: 'La célula está cargada en reposo',
        bloques: [
          { tipo: 'p', texto: 'Una célula en reposo no está eléctricamente neutra respecto de su entorno: el interior es negativo en comparación con el exterior. Esa diferencia se llama potencial de reposo de la membrana y no es un accidente, sino una situación que la célula construye y mantiene gastando energía.' },
          {
            tipo: 'lista',
            titulo: 'De dónde sale esa diferencia',
            items: [
              'El potasio predomina dentro de la célula y el sodio fuera; esa distribución desigual es el punto de partida.',
              'La membrana en reposo deja salir potasio con más facilidad de la que deja entrar sodio.',
              'Una bomba de la membrana expulsa sodio e introduce potasio en contra de sus gradientes, y para ello consume energía.',
              'El resultado neto es un interior negativo respecto del exterior.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La energía sostiene la carga', texto: 'La bomba que mantiene esa distribución es un transporte activo, y por tanto depende del aporte energético de la célula. Es el mismo principio de la lección de la célula, aplicado ahora a la excitabilidad: sin energía no hay gradiente, y sin gradiente no hay señal.' },
        ],
      },
      {
        titulo: 'El potencial de acción',
        bloques: [
          { tipo: 'p', texto: 'Cuando un estímulo desplaza el potencial de la membrana hasta un valor crítico llamado umbral, se desencadena una respuesta rápida y estereotipada: el potencial de acción. Por debajo del umbral no ocurre nada; alcanzado el umbral, la respuesta se produce completa. A esa propiedad se le llama respuesta de todo o nada.' },
          {
            tipo: 'tabla',
            titulo: 'Las fases y su movimiento iónico',
            headers: ['Fase', 'Qué ocurre en la membrana', 'Resultado eléctrico'],
            filas: [
              ['Reposo', 'La membrana mantiene su permeabilidad habitual', 'Interior negativo respecto del exterior'],
              ['Despolarización', 'Se abren canales y entra sodio a favor de su gradiente', 'El interior se vuelve menos negativo y llega a positivo'],
              ['Repolarización', 'Se cierra la entrada de sodio y sale potasio', 'El interior vuelve a hacerse negativo'],
              ['Restablecimiento', 'La bomba reordena sodio y potasio consumiendo energía', 'Se recupera la situación de partida'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La señal viaja porque se contagia', texto: 'Un punto de la membrana que se despolariza altera el potencial del punto vecino y lo lleva a su umbral, que se despolariza a su vez. Así la señal se propaga a lo largo de la célula sin perder intensidad, en vez de apagarse con la distancia.' },
        ],
      },
      {
        titulo: 'El periodo refractario',
        bloques: [
          { tipo: 'p', texto: 'Inmediatamente después de un potencial de acción existe un intervalo durante el cual la célula no puede responder a un nuevo estímulo, por intenso que sea. Se llama periodo refractario y su existencia tiene dos consecuencias importantes.' },
          {
            tipo: 'lista',
            titulo: 'Para qué sirve',
            items: [
              'Impide que la célula se dispare de forma continua ante un estímulo mantenido, lo que fija un límite a la frecuencia con que puede responder.',
              'Obliga a que la señal avance en un solo sentido, porque la zona que acaba de despolarizarse no puede volver a hacerlo de inmediato.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué esto importa después', texto: 'La electrofisiología que se estudia aquí es la misma que gobierna la conducción del corazón y la transmisión del impulso nervioso. Los módulos clínicos usarán estos conceptos para explicar el trazado eléctrico cardíaco y la conducción nerviosa; este módulo se detiene en el mecanismo y no entra en su interpretación clínica.' },
        ],
      },
      F([guyton(5, 'Potenciales de membrana y potenciales de acción', 38), guyton(4, 'Transporte de sustancias a través de las membranas celulares', 31), aaos(8, 'Sistema nervioso', 207)]),
    ],
    conceptosClave: [
      { termino: 'Potencial de reposo', definicion: 'Diferencia eléctrica que mantiene una célula en reposo, con el interior negativo respecto del exterior; se construye y se mantiene gastando energía.' },
      { termino: 'Umbral', definicion: 'Valor crítico del potencial de membrana a partir del cual se desencadena el potencial de acción.' },
      { termino: 'Respuesta de todo o nada', definicion: 'Propiedad por la que, alcanzado el umbral, el potencial de acción se produce completo, y por debajo de él no se produce.' },
      { termino: 'Despolarización', definicion: 'Fase en la que entra sodio a la célula y el interior pasa de negativo a positivo.' },
      { termino: 'Repolarización', definicion: 'Fase en la que sale potasio y el interior vuelve a hacerse negativo.' },
      { termino: 'Periodo refractario', definicion: 'Intervalo posterior al potencial de acción durante el cual la célula no responde a un nuevo estímulo; limita la frecuencia y da sentido único a la señal.' },
    ],
    flashcards: [
      { frente: '¿Cómo es el interior de una célula en reposo?', reverso: 'Negativo respecto del exterior; esa diferencia es el potencial de reposo de la membrana.' },
      { frente: '¿Qué ion entra durante la despolarización?', reverso: 'El sodio, a favor de su gradiente, lo que vuelve positivo el interior.' },
      { frente: '¿Qué ion sale durante la repolarización?', reverso: 'El potasio, con lo que el interior vuelve a hacerse negativo.' },
      { frente: '¿Qué significa respuesta de todo o nada?', reverso: 'Que por debajo del umbral no ocurre nada y, alcanzado el umbral, el potencial de acción se produce completo.' },
      { frente: '¿Para qué sirve el periodo refractario?', reverso: 'Limita la frecuencia de disparo y obliga a que la señal avance en un solo sentido.' },
      { frente: '¿Por qué la excitabilidad depende de la energía?', reverso: 'Porque la bomba que mantiene la distribución de sodio y potasio es un transporte activo: sin energía no hay gradiente y sin gradiente no hay señal.' },
    ],
    quiz: [
      {
        pregunta: 'Un estímulo desplaza el potencial de membrana, pero no alcanza el umbral. ¿Qué ocurre?',
        opciones: [
          'Se produce un potencial de acción de menor intensidad.',
          'No se produce potencial de acción: por debajo del umbral no hay respuesta, y alcanzado el umbral la respuesta es completa.',
          'La célula queda en periodo refractario.',
          'Se invierte la polaridad de forma permanente.',
        ],
        correcta: 1,
        explicacion: 'Es la propiedad de todo o nada: la intensidad del estímulo decide si hay respuesta, no cuán grande es esa respuesta.',
      },
      {
        pregunta: '¿Por qué la señal avanza en un solo sentido a lo largo de la célula?',
        opciones: [
          'Porque el sodio solo puede entrar en una dirección.',
          'Porque la zona que acaba de despolarizarse está en periodo refractario y no puede volver a hacerlo de inmediato.',
          'Porque la bomba empuja la señal hacia adelante.',
          'Porque el potencial de reposo se pierde definitivamente.',
        ],
        correcta: 1,
        explicacion: 'El periodo refractario impide que la zona recién despolarizada responda otra vez, y así la propagación queda orientada.',
      },
      {
        pregunta: 'Una célula excitable deja de disponer de energía. ¿Qué le ocurre a su capacidad de generar señales?',
        opciones: [
          'Aumenta, porque no gasta energía en la bomba.',
          'Se pierde: sin la bomba que mantiene la distribución de sodio y potasio, el gradiente se desvanece y sin gradiente no hay señal.',
          'No cambia, porque el potencial de reposo es pasivo.',
          'Se vuelve permanente y continua.',
        ],
        correcta: 1,
        explicacion: 'La bomba es un transporte activo; es el mismo principio de la lección de la célula aplicado a la excitabilidad.',
      },
      {
        pregunta: 'Durante la despolarización, ¿cómo queda el interior de la célula?',
        opciones: [
          'Más negativo que en reposo.',
          'Menos negativo primero y positivo después, por la entrada de sodio.',
          'Igual que en reposo.',
          'Sin carga alguna.',
        ],
        correcta: 1,
        explicacion: 'La entrada de sodio a favor de su gradiente invierte la polaridad; la salida de potasio la restablece en la repolarización.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena las fases del potencial de acción con su movimiento iónico',
        pasos: [
          'Reposo: interior negativo, distribución desigual de sodio y potasio',
          'El estímulo lleva la membrana hasta el umbral',
          'Despolarización: entra sodio y el interior se vuelve positivo',
          'Repolarización: sale potasio y el interior vuelve a ser negativo',
          'Periodo refractario: la célula no responde a un nuevo estímulo',
          'Restablecimiento: la bomba reordena sodio y potasio gastando energía',
        ],
      },
    },
    revision: ficha({
      version: 'Guyton y Hall, 13.ª ed., caps. 4 y 5; AAOS Anatomía y fisiología prehospitalaria, cap. 8',
      fuentes: [
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 5, p. 38 y cap. 4, p. 31.',
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 8, p. 207.',
      ],
      extra: [
        'Se usa la actividad de ORDENAR porque el potencial de acción es una secuencia fisiológica '
          + 'real con orden obligado, no una lista arbitraria.',
        'No se publican valores en milivoltios ni duraciones: la lección enseña el mecanismo y la '
          + 'secuencia, y esas cifras varían según el tipo de célula.',
        'La interpretación del trazado eléctrico cardíaco pertenece al Módulo 4 y se declara fuera de '
          + 'alcance.',
      ],
    }),
  },

  // ============================================================
  //  Equilibrio ácido-base
  // ============================================================
  'm2-afe-acido-base': {
    icono: '⚖️',
    duracion: '18 min',
    resumen: 'Por qué el organismo mantiene su acidez dentro de un margen estrecho y con qué tres '
      + 'sistemas lo consigue.',
    objetivos: [
      'Explicar qué mide el pH y por qué su margen debe ser estrecho.',
      'Diferenciar los tres mecanismos que regulan el equilibrio ácido-base.',
      'Comparar la rapidez y la duración de cada mecanismo.',
      'Relacionar la ventilación y la función renal con el control de la acidez.',
    ],
    secciones: [
      {
        titulo: 'Qué se está regulando',
        bloques: [
          { tipo: 'p', texto: 'El pH expresa cuántos iones hidrógeno libres hay en una solución: cuantos más, más ácida. El organismo mantiene el pH de sus líquidos dentro de un margen muy estrecho, y lo hace de forma continua porque su propio metabolismo produce ácido sin parar.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué el margen es tan estrecho', texto: 'Las proteínas del cuerpo —incluidas las enzimas que llevan a cabo casi todas las reacciones— cambian de forma según la acidez del medio, y una proteína deformada deja de funcionar. Mantener el pH no es una preferencia del organismo: es la condición para que el resto de la fisiología ocurra.' },
          { tipo: 'p', texto: 'Conviene fijar la dirección desde el principio: si aumentan los hidrogeniones el medio se acidifica y el pH baja; si disminuyen, el medio se alcaliniza y el pH sube. Todo lo que sigue son maneras de retirar o de reponer esos hidrogeniones.' },
        ],
      },
      {
        titulo: 'Los tres mecanismos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Quién regula, cómo y en cuánto tiempo',
            headers: ['Mecanismo', 'Cómo actúa', 'Rapidez', 'Capacidad'],
            filas: [
              ['Amortiguadores químicos', 'Captan o liberan hidrogeniones para atenuar el cambio; el principal es el sistema del bicarbonato', 'Inmediata, en segundos', 'Limitada: amortiguan, no eliminan'],
              ['Respiratorio', 'Modifica la ventilación y con ella la eliminación de dióxido de carbono, que se comporta como un ácido', 'Rápida, en minutos', 'Intermedia y sostenible mientras la ventilación pueda ajustarse'],
              ['Renal', 'Elimina hidrogeniones y recupera bicarbonato', 'Lenta, en horas o días', 'La mayor: es el único que elimina de forma definitiva'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La división del trabajo', texto: 'Los amortiguadores ganan tiempo, el pulmón corrige rápido y el riñón resuelve. Ninguno sustituye a los otros: el orden en que actúan es lo que permite al organismo tolerar una alteración mientras el mecanismo más lento y más potente hace su trabajo.' },
        ],
      },
      {
        titulo: 'El pulmón y el riñón, en concreto',
        bloques: [
          { tipo: 'p', texto: 'El dióxido de carbono producido por el metabolismo se comporta en el organismo como un ácido, porque al disolverse en agua libera hidrogeniones. Como se elimina por la respiración, la ventilación es una vía directa para regular la acidez.' },
          {
            tipo: 'lista',
            titulo: 'La relación es intuitiva si se piensa en el dióxido de carbono como ácido',
            items: [
              'Ventilar más elimina más dióxido de carbono, con lo que queda menos ácido y el pH tiende a subir.',
              'Ventilar menos retiene dióxido de carbono, con lo que queda más ácido y el pH tiende a bajar.',
              'Por eso una alteración de la acidez modifica de forma refleja la profundidad y la frecuencia de la respiración.',
            ],
          },
          { tipo: 'p', texto: 'El riñón actúa por dos vías complementarias: elimina hidrogeniones en la orina y recupera bicarbonato para devolverlo a la sangre. Es más lento que el pulmón, pero es el único que retira ácido de forma definitiva en vez de limitarse a amortiguarlo o a exhalarlo.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que esta lección deja para después', texto: 'Los nombres de los trastornos ácido-base, sus valores de laboratorio y su interpretación pertenecen a los módulos clínicos. Aquí solo se establece el mecanismo: quién regula, en qué sentido y a qué velocidad. Con eso, la interpretación posterior deja de ser memorización.' },
        ],
      },
      F([guyton(31, 'Regulación acidobásica', 230), aaos(7, 'Sistema respiratorio', 193)]),
    ],
    conceptosClave: [
      { termino: 'pH', definicion: 'Expresión de la cantidad de iones hidrógeno libres de una solución: cuantos más, más ácida y menor el pH.' },
      { termino: 'Amortiguador químico', definicion: 'Sistema que capta o libera hidrogeniones para atenuar un cambio de pH; actúa en segundos pero no elimina el ácido.' },
      { termino: 'Regulación respiratoria', definicion: 'Control de la acidez modificando la ventilación y con ella la eliminación de dióxido de carbono; actúa en minutos.' },
      { termino: 'Regulación renal', definicion: 'Eliminación de hidrogeniones y recuperación de bicarbonato; es lenta pero la única que retira ácido de forma definitiva.' },
      { termino: 'Dióxido de carbono como ácido', definicion: 'El dióxido de carbono se comporta como ácido porque al disolverse en agua libera hidrogeniones; por eso la ventilación regula la acidez.' },
    ],
    flashcards: [
      { frente: '¿Por qué el margen de pH debe ser estrecho?', reverso: 'Porque las proteínas y enzimas cambian de forma según la acidez, y una proteína deformada deja de funcionar.' },
      { frente: '¿Cuál es el mecanismo más rápido y cuál el más potente?', reverso: 'El más rápido son los amortiguadores químicos, en segundos; el más potente es el renal, en horas o días.' },
      { frente: '¿Por qué el dióxido de carbono se comporta como un ácido?', reverso: 'Porque al disolverse en agua libera hidrogeniones.' },
      { frente: 'Si se ventila más, ¿en qué sentido tiende a moverse el pH?', reverso: 'A subir: se elimina más dióxido de carbono y queda menos ácido.' },
      { frente: '¿Cuál es el único mecanismo que elimina ácido de forma definitiva?', reverso: 'El renal, que elimina hidrogeniones y recupera bicarbonato.' },
      { frente: '¿Qué hacen los amortiguadores que los otros dos no hacen?', reverso: 'Ganar tiempo: atenúan el cambio de inmediato, aunque no eliminen el ácido.' },
    ],
    quiz: [
      {
        pregunta: 'Un aumento de la acidez del medio modifica de forma refleja la respiración. ¿En qué sentido y por qué?',
        opciones: [
          'Disminuye la ventilación, para retener dióxido de carbono.',
          'Aumenta la ventilación, porque eliminar más dióxido de carbono retira ácido y el pH tiende a subir.',
          'No la modifica: la respiración no interviene en el equilibrio ácido-base.',
          'La detiene, para dar tiempo al riñón.',
        ],
        correcta: 1,
        explicacion: 'El dióxido de carbono se comporta como ácido; ventilar más lo elimina y el pH tiende a subir.',
      },
      {
        pregunta: '¿Por qué se dice que los amortiguadores químicos «ganan tiempo» pero no resuelven?',
        opciones: [
          'Porque tardan horas en actuar.',
          'Porque atenúan el cambio de pH en segundos, pero amortiguan sin eliminar el ácido.',
          'Porque solo funcionan en el riñón.',
          'Porque dependen de la ventilación para activarse.',
        ],
        correcta: 1,
        explicacion: 'Su capacidad es limitada: actúan de inmediato pero no retiran el ácido del organismo.',
      },
      {
        pregunta: 'Ordena por velocidad de respuesta, de la más rápida a la más lenta.',
        opciones: [
          'Renal, respiratoria, amortiguadores.',
          'Amortiguadores, respiratoria, renal.',
          'Respiratoria, amortiguadores, renal.',
          'Amortiguadores, renal, respiratoria.',
        ],
        correcta: 1,
        explicacion: 'Los amortiguadores actúan en segundos, el pulmón en minutos y el riñón en horas o días.',
      },
      {
        pregunta: '¿Qué hace el riñón para regular la acidez?',
        opciones: [
          'Modificar la profundidad de la respiración.',
          'Eliminar hidrogeniones en la orina y recuperar bicarbonato para devolverlo a la sangre.',
          'Captar y liberar hidrogeniones sin eliminarlos.',
          'Producir dióxido de carbono adicional.',
        ],
        correcta: 1,
        explicacion: 'Son sus dos vías complementarias, y por eso es el único mecanismo que retira ácido de forma definitiva.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El mecanismo que actúa en segundos, atenúa el cambio de pH pero no elimina el ácido, es el de los ___.',
          opciones: ['riñones', 'amortiguadores químicos', 'pulmones', 'vasos sanguíneos'],
          correcta: 1,
          explicacion: 'Ganan tiempo mientras los otros dos actúan.',
        },
        {
          texto: 'Si un paciente retiene dióxido de carbono porque ventila menos, el medio tiende a ___ y el pH a bajar.',
          opciones: ['alcalinizarse', 'acidificarse', 'permanecer igual', 'perder bicarbonato'],
          correcta: 1,
          explicacion: 'El dióxido de carbono se comporta como ácido: retenerlo deja más ácido en el organismo.',
        },
        {
          texto: 'El único mecanismo capaz de eliminar ácido de forma definitiva, aunque tarde horas o días, es el ___.',
          opciones: ['respiratorio', 'renal', 'de los amortiguadores', 'hepático'],
          correcta: 1,
          explicacion: 'El pulmón corrige rápido y los amortiguadores ganan tiempo, pero el riñón resuelve.',
        },
      ],
    },
    revision: ficha({
      version: 'Guyton y Hall, 13.ª ed., cap. 31; AAOS Anatomía y fisiología prehospitalaria, cap. 7',
      fuentes: [
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 31, p. 230.',
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 7, p. 193.',
      ],
      extra: [
        'No se publica ningún valor numérico de pH, presión parcial ni bicarbonato: la lección enseña '
          + 'quién regula, en qué sentido y a qué velocidad.',
        'Los nombres de los trastornos ácido-base y su interpretación de laboratorio pertenecen al '
          + 'Módulo 4 y se declaran expresamente fuera de alcance.',
      ],
    }),
  },

  // ============================================================
  //  Metabolismo
  // ============================================================
  'm2-afe-metabolismo': {
    icono: '🔥',
    duracion: '18 min',
    resumen: 'Cómo obtiene el cuerpo la energía que gasta, qué diferencia hay entre hacerlo con oxígeno '
      + 'o sin él, y por qué esa diferencia se nota tan rápido.',
    objetivos: [
      'Diferenciar los procesos que construyen de los que degradan.',
      'Comparar la obtención de energía con oxígeno y sin oxígeno.',
      'Relacionar los tres principios inmediatos con su papel energético.',
      'Explicar por qué algunos tejidos toleran peor la falta de aporte que otros.',
    ],
    secciones: [
      {
        titulo: 'Construir y degradar',
        bloques: [
          { tipo: 'p', texto: 'Metabolismo es el conjunto de reacciones químicas que ocurren en el organismo. Se agrupan en dos direcciones opuestas y simultáneas: unas degradan moléculas grandes para liberar energía y otras construyen moléculas grandes a partir de pequeñas, consumiéndola.' },
          {
            tipo: 'tabla',
            titulo: 'Las dos direcciones',
            headers: ['Proceso', 'Qué hace', 'Con la energía'],
            filas: [
              ['Catabolismo', 'Degrada moléculas grandes en pequeñas', 'La libera'],
              ['Anabolismo', 'Construye moléculas grandes a partir de pequeñas', 'La consume'],
            ],
          },
          { tipo: 'p', texto: 'La energía liberada no se usa directamente: se almacena en una molécula intermediaria que la célula puede gastar donde y cuando la necesite. Esa molécula funciona como una moneda energética común, y es la forma en que la célula paga la contracción, el transporte activo y la síntesis de sus propios componentes.' },
        ],
      },
      {
        titulo: 'Con oxígeno y sin oxígeno',
        bloques: [
          { tipo: 'p', texto: 'La obtención de energía a partir de la glucosa empieza igual con oxígeno o sin él, pero a partir de cierto punto los caminos se separan, y la diferencia entre ambos es enorme.' },
          {
            tipo: 'tabla',
            titulo: 'Dos rutas, dos rendimientos',
            headers: ['', 'Con oxígeno (aerobia)', 'Sin oxígeno (anaerobia)'],
            filas: [
              ['Dónde ocurre sobre todo', 'En la mitocondria', 'En el citoplasma'],
              ['Rendimiento energético', 'Alto', 'Mucho menor'],
              ['Producto final característico', 'Dióxido de carbono y agua', 'Ácido láctico'],
              ['Puede sostenerse mucho tiempo', 'Sí', 'No'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué la falta de oxígeno se nota tan rápido', texto: 'La vía sin oxígeno permite seguir obteniendo energía, pero rinde mucho menos y acumula ácido láctico. Es un recurso de emergencia que sostiene a la célula un rato, no un sustituto. Esa es la razón fisiológica de que la interrupción del aporte de oxígeno tenga consecuencias en minutos, y el vínculo entre esta lección, la de la célula y la del equilibrio ácido-base.' },
        ],
      },
      {
        titulo: 'De qué se obtiene la energía',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Los tres principios inmediatos',
            headers: ['Principio', 'Papel principal', 'Rasgo que lo distingue'],
            filas: [
              ['Hidratos de carbono', 'Fuente de energía de uso inmediato', 'Es el combustible que la célula usa primero y el que puede aprovechar sin oxígeno'],
              ['Lípidos', 'Reserva de energía a largo plazo', 'Almacenan mucha energía por unidad de peso; su aprovechamiento requiere oxígeno'],
              ['Proteínas', 'Estructura, enzimas y transporte', 'Se usan como fuente de energía solo cuando faltan las otras dos'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'No todos los tejidos aguantan igual', texto: 'Un tejido que gasta mucha energía y almacena poca reserva depende del aporte continuo y sufre antes cuando ese aporte se interrumpe. Es el caso del tejido nervioso y del músculo cardíaco. Esta lección no entra en las consecuencias clínicas de esa vulnerabilidad, pero sí establece por qué existe.' },
          { tipo: 'p', texto: 'El organismo también mantiene un gasto energético mínimo para sostener las funciones que no se detienen nunca: respirar, mantener la temperatura, hacer circular la sangre y conservar los gradientes de las membranas. Ese gasto de base existe aunque la persona esté en reposo completo.' },
        ],
      },
      F([guyton(73, 'Energética y metabolismo', 526), aaos(10, 'Sistema urinario y metabolismo (apartado 10.1, Metabolismo básico)', 256)]),
    ],
    conceptosClave: [
      { termino: 'Catabolismo', definicion: 'Conjunto de reacciones que degradan moléculas grandes en pequeñas y liberan energía.' },
      { termino: 'Anabolismo', definicion: 'Conjunto de reacciones que construyen moléculas grandes a partir de pequeñas y consumen energía.' },
      { termino: 'Vía aerobia', definicion: 'Obtención de energía en presencia de oxígeno, sobre todo en la mitocondria; rendimiento alto y productos finales dióxido de carbono y agua.' },
      { termino: 'Vía anaerobia', definicion: 'Obtención de energía sin oxígeno, en el citoplasma; rendimiento mucho menor y acumulación de ácido láctico.' },
      { termino: 'Moneda energética', definicion: 'Molécula intermediaria donde se almacena la energía liberada para gastarla donde y cuando la célula la necesite.' },
      { termino: 'Gasto de base', definicion: 'Energía mínima que el organismo consume en reposo completo para sostener las funciones que no se detienen.' },
    ],
    flashcards: [
      { frente: 'Catabolismo frente a anabolismo', reverso: 'El catabolismo degrada y libera energía; el anabolismo construye y la consume.' },
      { frente: '¿Dónde ocurre sobre todo la obtención aerobia de energía?', reverso: 'En la mitocondria.' },
      { frente: '¿Qué producto característico deja la vía sin oxígeno?', reverso: 'Ácido láctico.' },
      { frente: '¿Por qué la vía anaerobia no sustituye a la aerobia?', reverso: 'Porque rinde mucho menos y acumula ácido láctico: sostiene a la célula un rato, no indefinidamente.' },
      { frente: '¿Qué principio inmediato es reserva a largo plazo?', reverso: 'Los lípidos: almacenan mucha energía por unidad de peso, pero su aprovechamiento requiere oxígeno.' },
      { frente: '¿Qué tejidos toleran peor la interrupción del aporte?', reverso: 'Los que gastan mucha energía y almacenan poca reserva, como el tejido nervioso y el músculo cardíaco.' },
    ],
    quiz: [
      {
        pregunta: 'Un tejido deja de recibir oxígeno pero sigue disponiendo de glucosa. ¿Qué ocurre?',
        opciones: [
          'Deja de obtener energía por completo de forma inmediata.',
          'Puede seguir obteniéndola por la vía anaerobia, con rendimiento mucho menor y acumulación de ácido láctico.',
          'Cambia a los lípidos como fuente principal.',
          'Aumenta su rendimiento energético.',
        ],
        correcta: 1,
        explicacion: 'La vía sin oxígeno es un recurso de emergencia: sostiene a la célula un rato, con menor rendimiento y produciendo ácido láctico.',
      },
      {
        pregunta: '¿Por qué las proteínas no son la fuente energética habitual?',
        opciones: [
          'Porque no contienen energía aprovechable.',
          'Porque su papel principal es estructural, enzimático y de transporte, y solo se usan como fuente cuando faltan las otras dos.',
          'Porque solo se aprovechan sin oxígeno.',
          'Porque se almacenan en cantidad ilimitada.',
        ],
        correcta: 1,
        explicacion: 'Cada principio inmediato tiene un papel: los hidratos son combustible inmediato, los lípidos reserva y las proteínas estructura y función.',
      },
      {
        pregunta: 'Una persona en reposo completo sigue gastando energía. ¿Por qué?',
        opciones: [
          'Por un error de medición del gasto.',
          'Porque existe un gasto de base para sostener funciones que no se detienen: respirar, mantener la temperatura, circular la sangre y conservar los gradientes de membrana.',
          'Porque el anabolismo se detiene en reposo.',
          'Porque la vía anaerobia se activa en reposo.',
        ],
        correcta: 1,
        explicacion: 'Ese gasto mínimo existe aunque la persona no realice ninguna actividad.',
      },
      {
        pregunta: '¿Qué relación tiene esta lección con la de la célula?',
        opciones: [
          'Ninguna: son temas independientes.',
          'La mitocondria es donde ocurre sobre todo la vía aerobia, y el transporte activo de la membrana es uno de los gastos que la energía obtenida paga.',
          'La célula no consume energía.',
          'El metabolismo ocurre fuera de las células.',
        ],
        correcta: 1,
        explicacion: 'La energía obtenida se gasta en contracción, transporte activo y síntesis de los propios componentes celulares.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Las reacciones que degradan moléculas grandes y liberan energía forman el ___.',
          opciones: ['anabolismo', 'catabolismo', 'gasto de base', 'transporte activo'],
          correcta: 1,
          explicacion: 'El anabolismo es la dirección opuesta: construye y consume energía.',
        },
        {
          texto: 'El producto final característico de la obtención de energía SIN oxígeno es el ___.',
          opciones: ['dióxido de carbono', 'ácido láctico', 'agua', 'glucógeno'],
          correcta: 1,
          explicacion: 'La vía aerobia deja dióxido de carbono y agua; la anaerobia acumula ácido láctico.',
        },
        {
          texto: 'El principio inmediato que sirve de reserva a largo plazo y necesita oxígeno para aprovecharse son los ___.',
          opciones: ['hidratos de carbono', 'lípidos', 'proteínas', 'electrolitos'],
          correcta: 1,
          explicacion: 'Almacenan mucha energía por unidad de peso, pero no pueden usarse por la vía anaerobia.',
        },
        {
          texto: 'Un tejido que gasta mucha energía y almacena poca reserva depende del aporte continuo; por eso el tejido ___ sufre antes cuando ese aporte se interrumpe.',
          opciones: ['adiposo', 'nervioso', 'óseo', 'conjuntivo'],
          correcta: 1,
          explicacion: 'Junto con el músculo cardíaco, es el ejemplo que da la lección de esa vulnerabilidad.',
        },
      ],
    },
    revision: ficha({
      version: 'Guyton y Hall, 13.ª ed., cap. 73; AAOS Anatomía y fisiología prehospitalaria, cap. 10.1',
      fuentes: [
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 73, p. 526.',
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 10, apartado 10.1, p. 256.',
      ],
      extra: [
        'No se publican rendimientos numéricos de moléculas de energía por glucosa ni valores de gasto '
          + 'metabólico: la lección enseña la comparación entre vías, no la contabilidad bioquímica.',
        'Las consecuencias clínicas de la vulnerabilidad de un tejido pertenecen a los módulos '
          + 'clínicos y se declaran fuera de alcance.',
      ],
    }),
  },

  // ============================================================
  //  Sistema tegumentario
  // ============================================================
  'm2-afe-tegumentario': {
    icono: '🧴',
    duracion: '18 min',
    resumen: 'Cómo está construida la piel, qué funciones cumple además de cubrir y por qué es el '
      + 'órgano que más información ofrece a simple vista.',
    objetivos: [
      'Describir las tres capas del tegumento y lo que contiene cada una.',
      'Relacionar cada capa con la función que sostiene.',
      'Explicar el papel de la piel en la regulación de la temperatura.',
      'Justificar por qué la piel es una fuente de información observable.',
    ],
    secciones: [
      {
        titulo: 'Tres capas, tres papeles',
        bloques: [
          { tipo: 'p', texto: 'El sistema tegumentario es el órgano más extenso del cuerpo. Está formado por la piel y sus anexos —pelo, uñas y glándulas—, y se organiza en tres capas superpuestas con composición y función distintas.' },
          {
            tipo: 'tabla',
            titulo: 'Estructura y función',
            headers: ['Capa', 'Qué contiene', 'Qué función sostiene'],
            filas: [
              ['Epidermis', 'Epitelio en capas, sin vasos sanguíneos; incluye las células del pigmento', 'Barrera frente al medio: microorganismos, sustancias y pérdida de agua'],
              ['Dermis', 'Tejido conjuntivo con vasos, terminaciones nerviosas, folículos y glándulas', 'Resistencia y elasticidad; sensibilidad; irrigación y sudoración'],
              ['Hipodermis (tejido subcutáneo)', 'Tejido conjuntivo laxo y grasa', 'Aislamiento térmico, reserva energética y amortiguación mecánica'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La epidermis no tiene vasos', texto: 'Se nutre por difusión desde la dermis, que sí está irrigada. Ese detalle estructural explica por qué las lesiones limitadas a la capa más superficial no sangran, y por qué al alcanzar la dermis aparecen sangrado y dolor: es donde están los vasos y las terminaciones nerviosas.' },
        ],
      },
      {
        titulo: 'Lo que hace la piel además de cubrir',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Funciones del tegumento',
            items: [
              'Protección: barrera física frente a microorganismos y agresiones, y frente a la pérdida de agua.',
              'Sensibilidad: contiene terminaciones nerviosas que informan de tacto, presión, temperatura y dolor.',
              'Regulación de la temperatura, mediante el ajuste del calibre de sus vasos y la sudoración.',
              'Participación en la síntesis de vitamina D por acción de la luz solar.',
              'Excreción de agua y sales a través del sudor.',
              'Reserva energética y amortiguación mecánica, sobre todo en la capa más profunda.',
            ],
          },
          { tipo: 'p', texto: 'La regulación térmica merece detenerse. Cuando el organismo necesita perder calor, los vasos de la dermis se dilatan y llega más sangre a la superficie, donde el calor se disipa; además, la sudoración retira calor al evaporarse. Cuando necesita conservarlo, esos mismos vasos se contraen y la sangre se aleja de la superficie.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El mismo mecanismo explica el aspecto', texto: 'Que la sangre se acerque o se aleje de la superficie no solo cambia la temperatura: cambia el color y la temperatura de la piel al tacto. Por eso el aspecto de la piel es una consecuencia visible de lo que está haciendo la circulación, y no un dato aislado.' },
        ],
      },
      {
        titulo: 'Por qué es el órgano más informativo a simple vista',
        bloques: [
          { tipo: 'p', texto: 'La piel es el único órgano que puede observarse por completo sin ningún instrumento. Su color, su temperatura, su humedad y su elasticidad reflejan lo que ocurre en la circulación, en la regulación térmica y en el estado del agua corporal.' },
          {
            tipo: 'tabla',
            titulo: 'De la estructura al dato observable',
            headers: ['Qué se observa', 'Qué estructura o función lo produce'],
            filas: [
              ['Color', 'Cantidad de sangre que llega a los vasos de la dermis, y pigmento de la epidermis'],
              ['Temperatura al tacto', 'Calibre de los vasos dérmicos y cantidad de sangre en la superficie'],
              ['Humedad', 'Actividad de las glándulas sudoríparas de la dermis'],
              ['Elasticidad y recuperación al pellizco', 'Estado del tejido conjuntivo de la dermis y contenido de agua'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Alcance de esta lección', texto: 'Aquí se establece qué estructura produce cada dato observable. Cómo se interpreta clínicamente cada hallazgo, en qué cuadros aparece y qué conducta exige pertenece a los módulos de evaluación y clínica. Entender el mecanismo primero es lo que evita memorizar después una lista de signos sin explicación.' },
        ],
      },
      F([aaos(13, 'Sistema tegumentario', 325), guyton(74, 'Regulación de la temperatura corporal y fiebre', 529)]),
    ],
    conceptosClave: [
      { termino: 'Epidermis', definicion: 'Capa más superficial, epitelial y sin vasos sanguíneos; actúa como barrera y contiene las células del pigmento.' },
      { termino: 'Dermis', definicion: 'Capa intermedia de tejido conjuntivo con vasos, terminaciones nerviosas, folículos y glándulas; aporta resistencia, sensibilidad e irrigación.' },
      { termino: 'Hipodermis', definicion: 'Capa más profunda, de tejido conjuntivo laxo y grasa; aísla térmicamente, almacena energía y amortigua.' },
      { termino: 'Vasodilatación y vasoconstricción cutáneas', definicion: 'Ajuste del calibre de los vasos dérmicos que acerca o aleja la sangre de la superficie para perder o conservar calor.' },
      { termino: 'Piel como dato observable', definicion: 'Conjunto de color, temperatura, humedad y elasticidad que refleja lo que ocurre en la circulación, la regulación térmica y el agua corporal.' },
    ],
    flashcards: [
      { frente: '¿Qué capa de la piel carece de vasos sanguíneos?', reverso: 'La epidermis; se nutre por difusión desde la dermis, que sí está irrigada.' },
      { frente: '¿Qué contiene la dermis?', reverso: 'Tejido conjuntivo con vasos, terminaciones nerviosas, folículos y glándulas.' },
      { frente: '¿Cómo pierde calor la piel?', reverso: 'Dilatando sus vasos para llevar sangre a la superficie y mediante la evaporación del sudor.' },
      { frente: '¿Qué produce la humedad de la piel?', reverso: 'La actividad de las glándulas sudoríparas de la dermis.' },
      { frente: '¿Por qué una lesión superficial no sangra?', reverso: 'Porque la epidermis no tiene vasos; el sangrado y el dolor aparecen al alcanzar la dermis.' },
      { frente: '¿Qué función cumple la hipodermis?', reverso: 'Aislamiento térmico, reserva energética y amortiguación mecánica.' },
    ],
    quiz: [
      {
        pregunta: 'Una lesión afecta solo a la capa más superficial de la piel y no sangra. ¿Cómo se explica?',
        opciones: [
          'Porque la epidermis no contiene vasos sanguíneos y se nutre por difusión desde la dermis.',
          'Porque la epidermis contiene un mecanismo de coagulación propio.',
          'Porque el sudor sella la herida.',
          'Porque la hipodermis retiene la sangre.',
        ],
        correcta: 0,
        explicacion: 'Es un detalle estructural con consecuencia directa: sangrado y dolor aparecen al alcanzar la dermis, donde están los vasos y las terminaciones nerviosas.',
      },
      {
        pregunta: 'El organismo necesita conservar calor. ¿Qué hacen los vasos de la dermis?',
        opciones: [
          'Se dilatan para llevar más sangre a la superficie.',
          'Se contraen y alejan la sangre de la superficie.',
          'No participan: la regulación es solo por sudoración.',
          'Aumentan la producción de sudor.',
        ],
        correcta: 1,
        explicacion: 'La vasoconstricción cutánea aleja la sangre de la superficie; la vasodilatación y la sudoración sirven para lo contrario.',
      },
      {
        pregunta: '¿Por qué el color y la temperatura de la piel no son datos aislados?',
        opciones: [
          'Porque dependen únicamente del pigmento de la epidermis.',
          'Porque son consecuencia visible de cuánta sangre llega a los vasos de la dermis, es decir, de lo que está haciendo la circulación.',
          'Porque los produce la hipodermis.',
          'Porque dependen solo de la temperatura ambiente.',
        ],
        correcta: 1,
        explicacion: 'El mismo mecanismo que regula la temperatura —acercar o alejar la sangre de la superficie— cambia el color y la temperatura al tacto.',
      },
      {
        pregunta: '¿Qué capa aporta resistencia y elasticidad al conjunto?',
        opciones: [
          'La epidermis, por sus capas de epitelio.',
          'La dermis, por su tejido conjuntivo.',
          'La hipodermis, por su contenido graso.',
          'Ninguna: la piel no aporta resistencia mecánica.',
        ],
        correcta: 1,
        explicacion: 'La dermis es la capa de tejido conjuntivo; la hipodermis aporta amortiguación y aislamiento, no resistencia a la tracción.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La capa que contiene los vasos, las terminaciones nerviosas y las glándulas sudoríparas es la ___.',
          opciones: ['epidermis', 'dermis', 'hipodermis', 'fascia'],
          correcta: 1,
          explicacion: 'Por eso el sangrado, el dolor y la sudoración se explican en esa capa.',
        },
        {
          texto: 'Para perder calor, los vasos de la dermis se ___ y llega más sangre a la superficie, donde el calor se disipa.',
          opciones: ['contraen', 'dilatan', 'obstruyen', 'endurecen'],
          correcta: 1,
          explicacion: 'La sudoración se suma retirando calor al evaporarse.',
        },
        {
          texto: 'La elasticidad de la piel y su recuperación al pellizco dependen del tejido conjuntivo de la dermis y del contenido de ___.',
          opciones: ['pigmento', 'agua', 'grasa subcutánea', 'queratina'],
          correcta: 1,
          explicacion: 'Es el vínculo entre esta lección y la de líquidos y electrolitos.',
        },
        {
          texto: 'La capa responsable del aislamiento térmico, la reserva energética y la amortiguación mecánica es la ___.',
          opciones: ['epidermis', 'hipodermis', 'dermis papilar', 'membrana basal'],
          correcta: 1,
          explicacion: 'Es la capa más profunda, de tejido conjuntivo laxo y grasa.',
        },
      ],
    },
    revision: ficha({
      version: 'AAOS Anatomía y fisiología prehospitalaria, cap. 13; Guyton y Hall, 13.ª ed., cap. 74',
      fuentes: [
        'AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 13, p. 325.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 74, p. 529.',
      ],
      extra: [
        'La lección establece qué estructura produce cada dato observable de la piel. La '
          + 'interpretación clínica de esos hallazgos pertenece a los módulos de evaluación y clínica '
          + 'y se declara expresamente fuera de alcance.',
        'No se describen quemaduras ni su clasificación: pertenecen al Módulo 5.',
      ],
    }),
  },
}
