// ============================================================
//  MÓDULO 5 — «TRAUMA DE CRÁNEO Y COLUMNA», cierre de la unidad
// ------------------------------------------------------------
//  Los 7 temas que quedaban vacíos: lesiones intracraneales, escala de coma de
//  Glasgow, aumentos de la PIC, manitol/anticonvulsivantes/intubación,
//  fracturas de cuerpo vertebral, lesión medular anterior y cauda equina.
//  Con este archivo la unidad queda completa.
//
//  DEUDA BIBLIOGRÁFICA DECLARADA: para los temas de CABEZA se cita el capítulo
//  8 de PHTLS 9 con su intervalo de páginas verificado. Para los de COLUMNA no
//  se dispone de capítulo y página comprobados en la copia licenciada, así que
//  la cita declara la edición y deja capítulo y página como PENDIENTES. No se
//  inventa un localizador.
//
//  LÍMITES CLÍNICOS:
//   · No se publica ninguna dosis de manitol, de suero salino hipertónico ni de
//     anticonvulsivante, ni cifras objetivo de presión o de capnografía.
//   · Los escalones de tratamiento de la hipertensión intracraneal se
//     identifican como ámbito hospitalario o de cuidados críticos; lo
//     prehospitalario se enuncia por separado.
//   · Ningún hallazgo aislado diagnostica una lesión intracraneal concreta.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS_CABEZA = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), '
    + 'cap. 8, «Trauma en cabeza», pp. 257–292.',
  nota: 'Base curricular histórica declarada por el plan. El intervalo de páginas corresponde al '
    + 'capítulo verificado en la copia licenciada; la página exacta de cada afirmación concreta queda '
    + 'PENDIENTE de confirmación docente. No se cita la 10.ª edición: la copia disponible declara '
    + 'traducción automática.',
}
const PHTLS_COLUMNA = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4).',
  nota: 'Base curricular histórica declarada por el plan para el trauma vertebromedular. Capítulo y '
    + 'página PENDIENTES: no se localizaron de forma reproducible en la copia licenciada y no se '
    + 'inventa un localizador. No se cita la 10.ª edición: la copia disponible declara traducción '
    + 'automática.',
}
const BTF_PREHOSPITAL = {
  nombre: 'Brain Trauma Foundation. Guidelines for the Prehospital Management of Traumatic Brain '
    + 'Injury, 3.ª edición.',
  url: 'https://braintrauma.org/coma/guidelines/pre-hospital',
  nota: 'Guía primaria prehospitalaria del TCE; rectora de la prevención de la lesión secundaria. '
    + 'PENDIENTE: recomendación y apartado exactos. Los umbrales operativos se aplican conforme al '
    + 'protocolo del servicio.',
}
const BTF_GRAVE = {
  nombre: 'Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, '
    + '4.ª edición.',
  url: 'https://braintrauma.org/coma/guidelines/severe-tbi',
  nota: 'Guía del manejo hospitalario y de cuidados críticos del TCE grave. Se cita para identificar '
    + 'qué medidas pertenecen a ese ámbito, no para trasladarlas a la ambulancia. PENDIENTE: apartado '
    + 'exacto.',
}
const ACS_TCE_2024 = {
  nombre: 'American College of Surgeons. Best Practices Guidelines: The Management of Traumatic Brain '
    + 'Injury, 2024.',
  url: 'https://www.facs.org/media/vgfgjpfk/best-practices-guidelines-traumatic-brain-injury.pdf',
  nota: 'Guía de buenas prácticas actual del ACS sobre manejo del TCE. PENDIENTE: apartado y página '
    + 'exactos.',
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
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, formulario, equipamiento y dirección médica de la academia R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija los umbrales, la medicación disponible, '
    + 'el alcance autorizado y el destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const AMBITO = 'ÁMBITO PREHOSPITALARIO: ningún hallazgo aislado diagnostica una lesión intracraneal o '
  + 'medular concreta. Se sospecha, se previene la lesión secundaria, se reevalúa de forma documentada '
  + 'y se traslada; la imagen hospitalaria distingue el tipo de lesión.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: oxígeno, ventilación, vía aérea avanzada, medicación, '
  + 'objetivos de presión y de oxigenación, restricción del movimiento espinal y destino dependen del '
  + 'alcance autorizado, del equipamiento y del protocolo del servicio.'

const ficha = ({ estado = 'borrador', version, extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en el lote B del Módulo 5; el tema estaba vacío.',
    AMBITO,
    PROTOCOLO,
    ...extra,
  ],
  fuentes,
})

const V_CABEZA = 'PHTLS 9.ª ed. (2020), cap. 8; BTF Prehospital TBI 3.ª ed.; ACS Best Practices TBI 2024'
const V_COLUMNA = 'PHTLS 9.ª ed. (2020), capítulo pendiente; ACS Best Practices'
const FU_CABEZA = [
  'NAEMT. PHTLS, 9.ª ed., 2020, cap. 8, pp. 257–292.',
  'Brain Trauma Foundation. Prehospital Management of TBI, 3.ª ed.',
  'ACS. Best Practices Guidelines: The Management of TBI, 2024.',
]
const FU_COLUMNA = [
  'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
  'ACS. Trauma Quality Programs, Best Practices Guidelines.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
]

export default {
  // ============================================================
  //  Lesiones intracraneales
  // ============================================================
  'm5-tcc-lesiones-intracraneales': {
    icono: '🧩',
    duracion: '13 min',
    resumen: 'Este tema ordena el conjunto: qué lesiones pueden producirse dentro del cráneo y cómo se '
      + 'agrupan. Por un lado, las difusas y las focales, que tienen tema propio en esta unidad. Por '
      + 'otro, dos procesos que las acompañan y que explican buena parte del deterioro: la hemorragia '
      + 'subaracnoidea traumática y el edema cerebral. El hilo común es que ninguna se distingue en la '
      + 'calle y que todas comparten el mismo objetivo prehospitalario: evitar la lesión secundaria.',
    objetivos: [
      'Ordenar las lesiones intracraneales en difusas, focales y procesos acompañantes.',
      'Describir la hemorragia subaracnoidea traumática y el edema cerebral.',
      'Justificar por qué el manejo prehospitalario es común a todas ellas.',
    ],
    secciones: [
      {
        titulo: 'El mapa de la unidad',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Grupo', 'Qué incluye', 'Dónde se estudia'],
            filas: [
              ['Difusas', 'Concusión y lesión axonal difusa', 'Tema «Lesiones difusas»'],
              ['Focales', 'Hematoma epidural, subdural, contusión y hematoma intraparenquimatoso', 'Tema «Lesiones focales»'],
              ['Acompañantes', 'Hemorragia subaracnoidea traumática y edema cerebral', 'Este tema'],
            ],
          },
          { tipo: 'p', texto: 'La división no es académica: separa lo que puede tener una solución quirúrgica —una colección que se evacúa— de lo que solo puede tratarse sosteniendo al paciente. Aun así, en el ámbito prehospitalario la conducta es la misma para todas, porque no se pueden distinguir sin imagen.' },
        ],
      },
      {
        titulo: 'Dos procesos que agravan a los demás',
        bloques: [
          { tipo: 'p', texto: 'La **hemorragia subaracnoidea traumática** es la presencia de sangre en el espacio que rodea al encéfalo, bajo la aracnoides. Es un hallazgo frecuente en el traumatismo craneal y suele acompañar a otras lesiones. Puede producir cefalea intensa, náusea, rigidez de nuca y deterioro del estado de conciencia, aunque ninguno de esos hallazgos es exclusivo suyo.' },
          { tipo: 'p', texto: 'El **edema cerebral** es el aumento de volumen del propio tejido. No es una colección que se pueda evacuar: ocupa espacio dentro de una caja rígida y, por la doctrina de Monro–Kellie, empuja la presión intracraneal hacia arriba cuando la compensación se agota. Se instaura y progresa en las horas siguientes al impacto, lo que explica que un paciente empeore mucho después del accidente.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No confundir la traumática con la espontánea', texto: 'La hemorragia subaracnoidea espontánea —la que aparece sin traumatismo, típicamente por rotura de un aneurisma— es una urgencia médica distinta y se estudia en el Módulo 4. Aquí solo se trata la de origen traumático. Ante un paciente encontrado inconsciente junto a signos de golpe, conviene recordar que a veces la pregunta correcta es si se golpeó por haber sangrado, y no al revés.' },
        ],
      },
      {
        titulo: 'Lo que comparte todo el grupo',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Conducta común, sea cual sea la lesión',
            items: [
              'Evitar la hipoxia y la hipotensión, que son los agresores secundarios mejor documentados.',
              'Ventilación adecuada, sin hiperventilar de rutina.',
              'Cabeza en posición neutra y collarín no compresivo, para no dificultar el drenaje venoso.',
              'Valoración neurológica seriada y documentada con la hora.',
              'Glucemia y temperatura conforme al alcance y al protocolo.',
              'Traslado a centro con capacidad neuroquirúrgica y prealerta con hallazgos y evolución.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué no hace falta nombrar la lesión', texto: 'Como el manejo no cambia según el tipo, poner un nombre en el informe no mejora la atención y sí puede inducir a error a quien lo lea. Lo que sí cambia el resultado es la calidad de la descripción y de la serie de valoraciones.' },
        ],
      },
      F([PHTLS_CABEZA, BTF_PREHOSPITAL, ACS_TCE_2024]),
    ],
    conceptosClave: [
      { termino: 'Hemorragia subaracnoidea traumática', definicion: 'Sangre en el espacio subaracnoideo por traumatismo; acompaña con frecuencia a otras lesiones intracraneales.' },
      { termino: 'Edema cerebral', definicion: 'Aumento de volumen del tejido encefálico que ocupa espacio dentro del cráneo y eleva la presión intracraneal; progresa en horas.' },
      { termino: 'Lesión evacuable', definicion: 'Colección que puede retirarse quirúrgicamente, frente a los procesos difusos o de edema, que solo admiten tratamiento de soporte.' },
    ],
    flashcards: [
      { frente: '¿Cómo se agrupan las lesiones intracraneales?', reverso: 'Difusas, focales y procesos acompañantes: hemorragia subaracnoidea traumática y edema cerebral.' },
      { frente: '¿Por qué el edema no se «evacúa»?', reverso: 'Porque es aumento de volumen del propio tejido, no una colección de sangre.' },
      { frente: '¿Cuándo progresa el edema cerebral?', reverso: 'En las horas siguientes al impacto, lo que explica el deterioro tardío.' },
      { frente: '¿Cambia el manejo prehospitalario según el tipo de lesión?', reverso: 'No: es común a todas, porque no se distinguen sin imagen.' },
      { frente: 'Hemorragia subaracnoidea traumática y espontánea, ¿son lo mismo?', reverso: 'No: la espontánea es una urgencia médica distinta, estudiada en el Módulo 4.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con TCE que empeora seis horas después del accidente, con tomografía inicial sin colección evacuable. ¿Qué proceso lo explica con más frecuencia?',
        opciones: [
          'Un hematoma epidural que ya se evacuó.',
          'El edema cerebral, que se instaura y progresa en las horas siguientes al impacto.',
          'Una hemorragia subaracnoidea espontánea.',
          'Una fractura lineal de cráneo.',
        ],
        correcta: 1,
        explicacion: 'El edema ocupa espacio en una caja rígida y eleva la presión cuando la compensación se agota.',
      },
      {
        pregunta: '¿Por qué el ámbito prehospitalario no necesita nombrar el tipo de lesión intracraneal?',
        opciones: [
          'Porque no influye en el pronóstico.',
          'Porque el manejo es común a todas y nombrarla puede inducir a error a quien lea el informe.',
          'Porque las lesiones intracraneales no existen sin fractura.',
          'Porque el nombre lo asigna el servicio de traslado.',
        ],
        correcta: 1,
        explicacion: 'Lo que cambia el resultado es la descripción y la serie de valoraciones, no la etiqueta.',
      },
      {
        pregunta: 'Encuentras a una persona inconsciente en el suelo con una herida en la cabeza. ¿Qué posibilidad conviene no descartar de entrada?',
        opciones: [
          'Que la herida sea la única explicación posible.',
          'Que haya sufrido un evento médico —por ejemplo una hemorragia espontánea— y se golpeara al caer.',
          'Que la lesión sea necesariamente axonal difusa.',
          'Que la fractura de cráneo explique todo el cuadro.',
        ],
        correcta: 1,
        explicacion: 'Preguntar si se golpeó por haber sangrado, y no al revés, cambia la búsqueda y el destino.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La concusión y la lesión axonal difusa pertenecen al grupo de las lesiones ___.',
          opciones: ['focales', 'difusas', 'evacuables'],
          correcta: 1,
          explicacion: 'Afectan al tejido de forma extendida y no dejan una masa que retirar.',
        },
        {
          texto: 'El edema cerebral eleva la presión intracraneal porque ocupa espacio dentro de una caja ___.',
          opciones: ['elástica', 'rígida', 'ventilada'],
          correcta: 1,
          explicacion: 'Es la consecuencia directa de la doctrina de Monro–Kellie.',
        },
        {
          texto: 'La hemorragia subaracnoidea de origen ___ se estudia en el Módulo 4 y no en esta unidad.',
          opciones: ['traumático', 'espontáneo', 'quirúrgico'],
          correcta: 1,
          explicacion: 'Es una urgencia médica distinta, típicamente por rotura de un aneurisma.',
        },
      ],
    },
    revision: ficha({
      version: V_CABEZA,
      fuentes: FU_CABEZA,
      extra: ['Este tema ordena la unidad y remite a «Lesiones difusas» y «Lesiones focales» sin duplicar su contenido.'],
    }),
  },

  // ============================================================
  //  Escala de coma de Glasgow
  // ============================================================
  'm5-tcc-glasgow': {
    icono: '🔢',
    duracion: '15 min',
    resumen: 'La escala de coma de Glasgow puntúa tres respuestas —apertura ocular, respuesta verbal y '
      + 'respuesta motora— y las suma en un valor de 3 a 15. Su utilidad real no está en el número '
      + 'total, sino en desglosar los tres componentes y en repetir la valoración para ver hacia dónde '
      + 'va el paciente. La lección enseña a puntuarla, a registrar lo que la invalida —sedación, '
      + 'intubación, intoxicación, barrera idiomática— y a comunicarla de forma que sirva.',
    objetivos: [
      'Puntuar los tres componentes de la escala y su rango.',
      'Interpretar la escala por componentes y por tendencia, no solo por el total.',
      'Registrar las circunstancias que limitan su validez.',
    ],
    secciones: [
      {
        titulo: 'Los tres componentes',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Apertura ocular (máximo 4)',
            headers: ['Puntos', 'Respuesta'],
            filas: [['4', 'Espontánea'], ['3', 'A la orden verbal'], ['2', 'Al estímulo doloroso'], ['1', 'Ninguna']],
          },
          {
            tipo: 'tabla',
            titulo: 'Respuesta verbal (máximo 5)',
            headers: ['Puntos', 'Respuesta'],
            filas: [['5', 'Orientada'], ['4', 'Confusa'], ['3', 'Palabras inapropiadas'], ['2', 'Sonidos incomprensibles'], ['1', 'Ninguna']],
          },
          {
            tipo: 'tabla',
            titulo: 'Respuesta motora (máximo 6)',
            headers: ['Puntos', 'Respuesta'],
            filas: [['6', 'Obedece órdenes'], ['5', 'Localiza el dolor'], ['4', 'Retirada al dolor'], ['3', 'Flexión anormal (decorticación)'], ['2', 'Extensión anormal (descerebración)'], ['1', 'Ninguna']],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El mínimo es 3, no 0', texto: 'Cada componente puntúa al menos 1, así que el valor más bajo posible es 3 y el más alto 15. Un «Glasgow 0» no existe, y verlo escrito en un informe indica que quien lo anotó no puntuó la escala.' },
        ],
      },
      {
        titulo: 'Cómo se usa bien',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuatro reglas prácticas',
            items: [
              'Se puntúa la MEJOR respuesta obtenida en cada componente, no la peor.',
              'Se comunica desglosada —ocular, verbal y motora— además del total: un mismo total puede corresponder a situaciones muy distintas.',
              'De los tres componentes, la respuesta motora es la que más información aporta sobre la gravedad.',
              'Se repite y se anota con la hora: la tendencia informa más que cualquier valor aislado.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuándo la escala deja de ser fiable', texto: 'La puntuación pierde valor —y hay que declararlo— si el paciente está sedado o relajado farmacológicamente, si está intubado y no puede emitir respuesta verbal, si está intoxicado, si no comparte idioma con quien explora, si tiene un déficit auditivo o visual previo, o si una lesión facial o de extremidades le impide responder. En esos casos se anota el componente que sí puede valorarse y se declara el motivo.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Una cifra no clasifica al paciente por sí sola', texto: 'La escala describe el nivel de conciencia en un momento dado. No mide el daño estructural, no predice el desenlace por sí misma y no sustituye a la exploración de pupilas y de función motora. Los umbrales que su servicio use para decidir vía aérea o destino proceden de su protocolo, no de esta lección.' },
          { tipo: 'p', texto: 'La adaptación pediátrica de la escala, necesaria porque un lactante no obedece órdenes ni se orienta, se estudia en el Módulo 6 dentro de la evaluación del paciente pediátrico.' },
        ],
      },
      F([PHTLS_CABEZA, BTF_PREHOSPITAL, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Escala de coma de Glasgow', definicion: 'Instrumento que puntúa apertura ocular, respuesta verbal y respuesta motora, con un total de 3 a 15.' },
      { termino: 'Respuesta motora', definicion: 'Componente de mayor rango de la escala y el que más información aporta sobre la gravedad.' },
      { termino: 'Decorticación', definicion: 'Flexión anormal en respuesta al estímulo doloroso; puntúa 3 en el componente motor.' },
      { termino: 'Descerebración', definicion: 'Extensión anormal en respuesta al estímulo doloroso; puntúa 2 en el componente motor.' },
      { termino: 'Puntuación no valorable', definicion: 'Componente que no puede evaluarse por sedación, intubación, idioma o lesión; se declara el motivo en vez de inventar un valor.' },
    ],
    flashcards: [
      { frente: 'Rango de la escala de coma de Glasgow', reverso: 'De 3 a 15: cada componente puntúa al menos 1.' },
      { frente: 'Puntuación máxima de cada componente', reverso: 'Ocular 4, verbal 5, motora 6.' },
      { frente: '¿Se puntúa la mejor o la peor respuesta?', reverso: 'La mejor respuesta obtenida en cada componente.' },
      { frente: '¿Qué componente aporta más información sobre la gravedad?', reverso: 'La respuesta motora.' },
      { frente: 'Flexión anormal y extensión anormal, ¿cuántos puntos?', reverso: 'Flexión (decorticación) 3; extensión (descerebración) 2.' },
      { frente: '¿Qué se hace si el paciente está intubado?', reverso: 'Se anota lo valorable y se declara que el componente verbal no puede evaluarse.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente que abre los ojos al llamarlo, dice palabras sueltas sin sentido y localiza el dolor. ¿Qué puntuación tiene?',
        opciones: ['3 + 3 + 5 = 11', '2 + 3 + 5 = 10', '3 + 2 + 4 = 9', '4 + 3 + 6 = 13'],
        correcta: 0,
        explicacion: 'Apertura a la orden verbal 3, palabras inapropiadas 3 y localiza el dolor 5.',
      },
      {
        pregunta: 'Dos pacientes tienen un total de 9. ¿Por qué conviene comunicar la escala desglosada?',
        opciones: [
          'Por exigencia administrativa.',
          'Porque un mismo total puede corresponder a situaciones muy distintas, y la respuesta motora es la que más informa.',
          'Porque el total no se calcula igual en todos los servicios.',
          'Porque desglosarla eleva la puntuación.',
        ],
        correcta: 1,
        explicacion: 'El desglose distingue a un paciente que no habla de otro que no se mueve, que no están igual de graves.',
      },
      {
        pregunta: 'El paciente está intubado y sedado. ¿Cómo se registra la escala?',
        opciones: [
          'Se asigna 1 al componente verbal y se suma.',
          'Se anota lo que sí puede valorarse y se declara expresamente que la sedación y la intubación limitan la puntuación.',
          'Se anota «Glasgow 0».',
          'Se omite la valoración neurológica.',
        ],
        correcta: 1,
        explicacion: 'Inventar un valor produce una cifra falsa que después nadie puede comparar.',
      },
      {
        pregunta: 'Registras 14 a las 09:10 y 10 a las 09:25. ¿Qué es lo más relevante?',
        opciones: [
          'Que 10 sigue siendo una puntuación aceptable.',
          'La tendencia descendente en quince minutos, que obliga a reevaluar, comunicar y acelerar el traslado.',
          'Que la primera medición fue errónea.',
          'Que hay que esperar a que baje de 8.',
        ],
        correcta: 1,
        explicacion: 'El cambio entre valoraciones informa más que cualquier valor aislado.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente que no abre los ojos ni con estímulo doloroso, emite sonidos incomprensibles y presenta extensión anormal de las extremidades al dolor. ¿Cuál es su puntuación y qué componente comunicas primero?',
          opciones: [
            'Total 6; comunico solo el total.',
            'Ocular 1, verbal 2, motora 2: total 5; comunico el desglose y destaco la respuesta motora, que es la que más informa de la gravedad.',
            'Total 8, con respuesta motora de retirada.',
            'No es valorable por tratarse de un traumatizado.',
          ],
          correcta: 1,
          explicacion: 'La extensión anormal puntúa 2, los sonidos incomprensibles 2 y la ausencia de apertura 1; la lección exige comunicar el desglose y señala la respuesta motora como la más informativa.',
        },
        {
          pregunta: 'El paciente es hipoacúsico y no comparte idioma contigo. ¿Cómo procedes con la escala?',
          opciones: [
            'Le asignas la puntuación mínima en los tres componentes.',
            'Puntúas lo valorable, declaras que la barrera idiomática y el déficit auditivo limitan la validez y lo comunicas en la entrega.',
            'Omites la valoración neurológica.',
            'Anotas un total estimado sin desglose.',
          ],
          correcta: 1,
          explicacion: 'La lección enumera idioma y déficit sensorial entre las circunstancias que restan validez y exige declarar el motivo en lugar de inventar un valor.',
        },
      ],
    },
    revision: ficha({
      version: V_CABEZA,
      fuentes: [...FU_CABEZA, 'Protocolo local (pendiente de entrega) para umbrales de decisión.'],
      extra: [
        'La escala se enseña completa porque es un instrumento de medición, no una dosis. No se publican umbrales de decisión de vía aérea ni de destino: proceden del protocolo del servicio.',
        'La adaptación pediátrica se remite al Módulo 6 y no se duplica aquí.',
      ],
    }),
  },

  // ============================================================
  //  Aumentos de la PIC
  // ============================================================
  'm5-tcc-pic': {
    icono: '📈',
    duracion: '14 min',
    resumen: 'La presión intracraneal sube cuando algo ocupa espacio dentro del cráneo y la '
      + 'compensación se agota. Esta lección describe cómo progresa ese aumento, qué signos aparecen '
      + 'en cada momento y cómo se organiza su tratamiento en escalones sucesivos. La distinción '
      + 'importante es de ámbito: el primer escalón incluye medidas que sí pertenecen al terreno '
      + 'prehospitalario, mientras que los siguientes son hospitalarios y de cuidados críticos, y aquí '
      + 'se identifican como tales.',
    objetivos: [
      'Describir la progresión de la hipertensión intracraneal y sus signos.',
      'Distinguir los escalones de tratamiento y el ámbito que corresponde a cada uno.',
      'Aplicar las medidas del primer escalón que sí son prehospitalarias.',
    ],
    secciones: [
      {
        titulo: 'Nota sobre el título del plan',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Qué significan aquí «nivel 1, 2 y 3»', texto: 'El plan titula este tema «Aumentos de la PIC (nivel 1, 2 y 3)» sin definir a qué se refiere la numeración. La lectura que se adopta —y que la academia debe confirmar— es la de los ESCALONES DE TRATAMIENTO de la hipertensión intracraneal, que la literatura organiza en niveles sucesivos de intensidad. No se ha encontrado en el plan una definición alternativa, y la interpretación queda registrada como decisión pendiente en la ficha editorial.' },
        ],
      },
      {
        titulo: 'Cómo progresa',
        bloques: [
          { tipo: 'p', texto: 'Mientras la compensación funciona —desplazamiento de líquido cefalorraquídeo y de sangre venosa—, la presión sube poco y el paciente puede parecer estable. Al agotarse, un aumento pequeño de volumen produce un aumento grande de presión, y ahí empieza el deterioro rápido.' },
          {
            tipo: 'tabla',
            titulo: 'Signos, del más precoz al más tardío',
            headers: ['Momento', 'Qué se observa'],
            filas: [
              ['Precoz', 'Cefalea, náusea y vómito, inquietud o irritabilidad, descenso leve del nivel de conciencia'],
              ['Intermedio', 'Descenso progresivo de la conciencia, lentitud de respuesta, asimetría pupilar incipiente, déficit motor'],
              ['Tardío', 'Tríada de Cushing —hipertensión, bradicardia y respiración irregular—, pupila dilatada arreactiva, postura de decorticación o descerebración'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La tríada de Cushing es alarma, no vigilancia', texto: 'Cuando aparece, la herniación ya está en curso. Y su patrón es el inverso del shock hipovolémico: aquí la presión sube y el pulso baja. Confundirlos lleva a tratamientos opuestos, y por eso el patrón se comprueba antes de interpretarlo.' },
        ],
      },
      {
        titulo: 'Los escalones y su ámbito',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Escalón', 'Qué agrupa', 'Ámbito'],
            filas: [
              ['Primero', 'Medidas generales: oxigenación y ventilación adecuadas, presión arterial dentro de objetivos, cabeza neutra y cabecera elevada, evitar compresión yugular, control del dolor, de la agitación, de las convulsiones, de la glucemia y de la temperatura', 'Parte es PREHOSPITALARIA y parte hospitalaria'],
              ['Segundo', 'Terapia osmótica, drenaje de líquido cefalorraquídeo, sedación profunda y control estricto de la ventilación con monitorización', 'HOSPITALARIO / cuidados críticos'],
              ['Tercero', 'Medidas de rescate: hipotermia terapéutica, coma barbitúrico, cirugía descompresiva', 'CUIDADOS CRÍTICOS y quirófano'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que de verdad hace la ambulancia', texto: 'Todo lo del primer escalón que esté dentro del alcance autorizado: evitar la hipoxia y la hipotensión, ventilar sin hiperventilar de rutina, mantener la cabeza neutra y el collarín sin comprimir las yugulares, elevar la cabecera si el protocolo y el estado del paciente lo permiten, medir la glucemia, prevenir la hipotermia, controlar convulsiones según protocolo y trasladar a un centro con capacidad neuroquirúrgica avisando antes.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Hiperventilación: excepción, no escalón', texto: 'La hiperventilación de rutina en el TCE está proscrita porque la vasoconstricción que produce reduce el flujo cerebral. Se reserva, de forma transitoria y controlada, para signos de herniación, y siempre conforme al protocolo del servicio, que es quien define la frecuencia objetivo. Los agentes osmóticos se tratan en el tema siguiente.' },
        ],
      },
      F([BTF_PREHOSPITAL, BTF_GRAVE, ACS_TCE_2024, PHTLS_CABEZA, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Hipertensión intracraneal', definicion: 'Elevación de la presión dentro del cráneo por ocupación de espacio, una vez agotada la compensación.' },
      { termino: 'Escalones de tratamiento', definicion: 'Organización del manejo de la hipertensión intracraneal en niveles sucesivos de intensidad, con ámbitos distintos.' },
      { termino: 'Tríada de Cushing', definicion: 'Hipertensión, bradicardia y respiración irregular; respuesta tardía que indica herniación en curso.' },
      { termino: 'Terapia osmótica', definicion: 'Uso de agentes que desplazan agua del tejido cerebral; pertenece al segundo escalón y al ámbito hospitalario.' },
    ],
    flashcards: [
      { frente: '¿Qué signos son precoces en el aumento de la PIC?', reverso: 'Cefalea, náusea y vómito, inquietud y descenso leve del nivel de conciencia.' },
      { frente: '¿Es la tríada de Cushing un signo precoz?', reverso: 'No: es tardía e indica herniación en curso.' },
      { frente: '¿Qué diferencia el patrón de Cushing del shock hipovolémico?', reverso: 'Cushing: presión alta y pulso bajo. Shock: presión baja y pulso alto.' },
      { frente: '¿Qué escalón corresponde al ámbito prehospitalario?', reverso: 'Parte del primero: medidas generales dentro del alcance autorizado.' },
      { frente: '¿Está indicada la hiperventilación de rutina?', reverso: 'No: solo ante signos de herniación, transitoria y según protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'TCE con presión arterial elevada, bradicardia y respiración irregular. ¿Qué significa?',
        opciones: [
          'Shock hipovolémico establecido.',
          'Tríada de Cushing: hipertensión intracraneal con herniación en curso; es un signo tardío.',
          'Crisis hipertensiva sin relación con el trauma.',
          'Respuesta esperable al dolor.',
        ],
        correcta: 1,
        explicacion: 'Es la respuesta del organismo para mantener la perfusión cerebral frente a una presión muy elevada.',
      },
      {
        pregunta: '¿Cuál de estas medidas del primer escalón puede aplicarse en la ambulancia?',
        opciones: [
          'Drenaje de líquido cefalorraquídeo.',
          'Mantener la cabeza neutra y el collarín sin comprimir las yugulares, evitando la hipoxia y la hipotensión.',
          'Coma barbitúrico.',
          'Cirugía descompresiva.',
        ],
        correcta: 1,
        explicacion: 'Las otras tres pertenecen a escalones hospitalarios o de cuidados críticos.',
      },
      {
        pregunta: 'Un compañero propone hiperventilar a todo paciente con TCE grave. ¿Qué respondes?',
        opciones: [
          'Que es lo correcto en todos los casos.',
          'Que la hiperventilación de rutina está proscrita porque reduce el flujo cerebral, y se reserva de forma transitoria para signos de herniación según protocolo.',
          'Que solo se hiperventila a los pacientes conscientes.',
          'Que debe sustituirse por ventilación lenta y superficial.',
        ],
        correcta: 1,
        explicacion: 'La vasoconstricción que produce añade isquemia a un cerebro ya comprometido.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La terapia osmótica y el drenaje de líquido cefalorraquídeo pertenecen al ___ escalón, de ámbito hospitalario.',
          opciones: ['primer', 'segundo', 'tercer'],
          correcta: 1,
          explicacion: 'El primero agrupa medidas generales y el tercero, las de rescate en cuidados críticos.',
        },
        {
          texto: 'La aparición de la tríada de Cushing indica que la herniación ___.',
          opciones: ['aún no ha comenzado', 'ya está en curso', 'se ha resuelto'],
          correcta: 1,
          explicacion: 'Por eso es una alarma y no un signo de vigilancia.',
        },
        {
          texto: 'Elevar la cabecera y mantener la cabeza neutra buscan favorecer el ___ del cráneo.',
          opciones: ['drenaje venoso', 'flujo arterial', 'intercambio gaseoso'],
          correcta: 0,
          explicacion: 'Dificultar el retorno venoso eleva la presión intracraneal por un detalle mecánico evitable.',
        },
      ],
    },
    revision: ficha({
      version: 'BTF Prehospital TBI 3.ª ed.; BTF Severe TBI 4.ª ed.; ACS Best Practices TBI 2024; PHTLS 9.ª ed. cap. 8',
      fuentes: [...FU_CABEZA, 'Brain Trauma Foundation. Severe TBI, 4.ª ed.', 'Protocolo local (pendiente de entrega).'],
      extra: [
        'DECISIÓN PENDIENTE: el plan no define a qué se refiere «nivel 1, 2 y 3». La lección adopta la lectura de escalones de tratamiento y lo declara expresamente; la academia debe confirmarlo.',
        'Los escalones segundo y tercero se identifican como ámbito hospitalario y de cuidados críticos, conforme a la prohibición de mezclar niveles asistenciales sin declararlo.',
        'No se publican cifras de presión intracraneal, de presión de perfusión ni de capnografía objetivo.',
      ],
    }),
  },

  // ============================================================
  //  Manitol, anticonvulsivantes e intubación endotraqueal
  // ============================================================
  'm5-tcc-manitol': {
    icono: '💉',
    duracion: '15 min',
    resumen: 'Tres intervenciones que el plan agrupa y que comparten una característica: ninguna es '
      + 'automática y todas dependen del alcance autorizado y del protocolo. El manitol y los agentes '
      + 'osmóticos actúan sobre el edema pero pueden empeorar a un paciente hipotenso; los '
      + 'anticonvulsivantes tratan la convulsión, que es un agresor secundario; y la intubación puede '
      + 'proteger o dañar según cómo se haga. La lección explica el razonamiento y bloquea las cifras.',
    objetivos: [
      'Explicar el fundamento y los límites de la terapia osmótica en el TCE.',
      'Justificar el control de las convulsiones como prevención de lesión secundaria.',
      'Reconocer los riesgos de la intubación prehospitalaria en el paciente con TCE.',
    ],
    secciones: [
      {
        titulo: 'Bloqueo declarado de esta lección',
        bloques: [
          { tipo: 'callout', variante: 'dosis', titulo: 'Por qué aquí no hay números', texto: 'No encontrarás dosis de manitol, de suero salino hipertónico ni de ningún anticonvulsivante, ni tamaños de tubo, ni frecuencias objetivo de ventilación. Una cifra solo se publica cuando constan su población, su indicación, su vía, la concentración del producto disponible y el protocolo que la autoriza, y ninguno de esos datos se ha entregado todavía. Lo que sí se enseña es para qué sirve cada intervención, qué la limita y qué hay que vigilar. ALCANCE: estudiar esta lección no autoriza a administrar ni a ejecutar nada.' },
        ],
      },
      {
        titulo: 'Manitol y terapia osmótica',
        bloques: [
          { tipo: 'p', texto: 'El manitol es un agente osmótico: aumenta la concentración de solutos en la sangre y arrastra agua desde el tejido cerebral hacia el compartimento vascular. Al reducir el volumen del tejido, baja la presión intracraneal. El suero salino hipertónico actúa por un principio parecido. Ambos pertenecen al segundo escalón del tratamiento de la hipertensión intracraneal.' },
          {
            tipo: 'lista',
            titulo: 'Lo que hay que entender antes que la dosis',
            items: [
              'No es un tratamiento de la lesión: gana tiempo hasta que el problema se resuelve, habitualmente en quirófano.',
              'El manitol produce diuresis. En un paciente que ya está hipovolémico o hipotenso, esa pérdida de volumen puede empeorar la perfusión cerebral, que es justo lo que se quiere proteger.',
              'Por eso la hipotensión limita su uso, y por eso corregir la presión arterial precede a cualquier consideración osmótica.',
              'Su administración prehospitalaria no es una conducta universal: depende del alcance autorizado, de que el producto esté disponible y de una indicación respaldada por la dirección médica.',
              'Si se administra, se documenta qué, cuándo y con qué indicación, y se vigila la respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Primero la presión, después la osmolaridad', texto: 'Un paciente con TCE grave e hipotensión tiene un problema de perfusión antes que de presión intracraneal. Administrar un agente que provoca diuresis en esa situación puede agravar el cuadro. La secuencia de prioridades no se invierte.' },
        ],
      },
      {
        titulo: 'Anticonvulsivantes e intubación',
        bloques: [
          { tipo: 'p', texto: 'Una convulsión en un paciente con TCE es un agresor secundario: aumenta el consumo cerebral de oxígeno, compromete la ventilación y eleva la presión intracraneal. Por eso su control forma parte del tratamiento del traumatismo y no es un asunto aparte. Qué fármaco, por qué vía y con qué pauta lo determina el protocolo del servicio.' },
          {
            tipo: 'lista',
            titulo: 'La intubación en el TCE: no es la maniobra, es cómo se hace',
            items: [
              'La indicación se establece por incapacidad de proteger la vía aérea, por ventilación inadecuada o por deterioro neurológico, en los términos que fije el protocolo.',
              'El riesgo no está solo en el procedimiento: la desaturación durante los intentos y la hipotensión asociada a la sedación son dos agresores secundarios conocidos.',
              'Una vez asegurada, hiperventilar sin control es un riesgo frecuente y evitable; la frecuencia se ajusta conforme al protocolo y a la monitorización disponible.',
              'La preparación, la preoxigenación y la vigilancia posterior pesan tanto como la técnica.',
              'La secuencia rápida de intubación, su medicación y su autorización están bloqueadas en el temario hasta que la academia defina alcance y dirección médica.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que sí depende siempre de ti', texto: 'Sea cual sea el alcance de tu servicio, evitar la hipoxia y la hipotensión, ventilar sin hiperventilar, medir la glucemia, mantener la cabeza neutra, documentar la serie neurológica y acortar el tiempo hasta el centro con neurocirugía son medidas que no requieren un fármaco ni un dispositivo avanzado, y son las que mejor evidencia tienen.' },
        ],
      },
      F([BTF_PREHOSPITAL, BTF_GRAVE, ACS_TCE_2024, PHTLS_CABEZA, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Agente osmótico', definicion: 'Sustancia que aumenta la concentración de solutos en sangre y arrastra agua desde el tejido cerebral, reduciendo la presión intracraneal.' },
      { termino: 'Diuresis osmótica', definicion: 'Aumento de la eliminación de orina provocado por el agente osmótico; puede agravar la hipovolemia.' },
      { termino: 'Agresor secundario', definicion: 'Factor que añade daño al encéfalo ya lesionado, como la hipoxia, la hipotensión o una convulsión.' },
      { termino: 'Bloqueo parcial', definicion: 'Situación editorial en que un tema se redacta sin publicar los datos que dependen de un protocolo aún no entregado.' },
    ],
    flashcards: [
      { frente: '¿Cómo actúa el manitol sobre la presión intracraneal?', reverso: 'Arrastra agua desde el tejido cerebral hacia la sangre y reduce el volumen del tejido.' },
      { frente: '¿Por qué la hipotensión limita el uso del manitol?', reverso: 'Porque produce diuresis, y perder más volumen empeora la perfusión cerebral que se quiere proteger.' },
      { frente: '¿Por qué una convulsión empeora el TCE?', reverso: 'Aumenta el consumo cerebral de oxígeno, compromete la ventilación y eleva la presión intracraneal.' },
      { frente: 'Dos riesgos de la intubación prehospitalaria en el TCE', reverso: 'La desaturación durante los intentos y la hipotensión asociada a la sedación.' },
      { frente: '¿Qué medidas no requieren fármaco ni dispositivo avanzado?', reverso: 'Evitar hipoxia e hipotensión, ventilar sin hiperventilar, glucemia, cabeza neutra, serie neurológica y traslado rápido.' },
    ],
    quiz: [
      {
        pregunta: 'TCE grave con presión arterial baja y sospecha de hipertensión intracraneal. ¿Qué precede a cualquier consideración osmótica?',
        opciones: [
          'Administrar el agente osmótico cuanto antes.',
          'Corregir la presión arterial, porque el manitol produce diuresis y puede empeorar la perfusión cerebral.',
          'Hiperventilar de forma sostenida.',
          'Esperar a la llegada al hospital sin intervenir.',
        ],
        correcta: 1,
        explicacion: 'La perfusión es el problema prioritario; añadir pérdida de volumen agrava el cuadro.',
      },
      {
        pregunta: '¿Por qué el control de una convulsión forma parte del tratamiento del TCE?',
        opciones: [
          'Porque tranquiliza a los acompañantes.',
          'Porque la convulsión es un agresor secundario: eleva el consumo de oxígeno, compromete la ventilación y sube la presión intracraneal.',
          'Porque confirma el diagnóstico de lesión focal.',
          'Porque permite retirar el collarín.',
        ],
        correcta: 1,
        explicacion: 'Prevenir la lesión secundaria es el objetivo del manejo prehospitalario del TCE.',
      },
      {
        pregunta: '¿Cuál es el riesgo más frecuente y evitable tras asegurar la vía aérea en un paciente con TCE?',
        opciones: [
          'La extubación accidental por el movimiento.',
          'Hiperventilarlo sin control, cuando la hiperventilación de rutina está proscrita.',
          'La hipertermia por el dispositivo.',
          'La pérdida del acceso vascular.',
        ],
        correcta: 1,
        explicacion: 'La frecuencia se ajusta conforme al protocolo y a la monitorización disponible.',
      },
      {
        pregunta: 'Buscas en esta lección la dosis de manitol y no aparece. ¿Por qué?',
        opciones: [
          'Por un olvido de redacción.',
          'Porque una cifra solo se publica con población, indicación, vía, concentración del producto disponible y protocolo que la autorice, y esos datos no se han entregado.',
          'Porque el manitol ya no se usa en ningún ámbito.',
          'Porque la dosis es igual para todos los pacientes.',
        ],
        correcta: 1,
        explicacion: 'El bloqueo está declarado de forma expresa en la propia lección y en su ficha editorial.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Tu compañero propone administrar un agente osmótico a un paciente con TCE grave, pupila dilatada e hipotensión. ¿Qué argumentas con lo enseñado?',
          opciones: [
            'Que adelante: la pupila dilatada lo indica por sí sola.',
            'Que primero hay que corregir la presión arterial, porque la diuresis osmótica puede empeorar la perfusión cerebral, y que la administración depende del alcance, del producto disponible y de la dirección médica.',
            'Que nunca debe usarse un agente osmótico en ningún ámbito.',
            'Que se administre a la mitad de la dosis habitual.',
          ],
          correcta: 1,
          explicacion: 'La lección invierte expresamente esa prioridad y remite la administración al alcance y al protocolo, sin publicar dosis.',
        },
        {
          pregunta: 'Un paciente con TCE convulsiona durante el traslado. ¿Cómo encuadras tu actuación?',
          opciones: [
            'Como un problema distinto del traumatismo, que se atiende después.',
            'Como parte del tratamiento del TCE, porque la convulsión es un agresor secundario; el fármaco, la vía y la pauta los fija el protocolo del servicio.',
            'Como indicación automática de hiperventilación sostenida.',
            'Como criterio para retirar el collarín y sentar al paciente.',
          ],
          correcta: 1,
          explicacion: 'La lección presenta el control de la convulsión como prevención de lesión secundaria y remite la pauta al protocolo.',
        },
      ],
    },
    revision: ficha({
      version: 'BTF Prehospital TBI 3.ª ed.; BTF Severe TBI 4.ª ed.; ACS Best Practices TBI 2024',
      fuentes: [...FU_CABEZA, 'Brain Trauma Foundation. Severe TBI, 4.ª ed.', 'Protocolo local (pendiente de entrega).'],
      extra: [
        'BLOQUEO PARCIAL DECLARADO: no se publica ninguna dosis de manitol, de suero salino hipertónico ni de anticonvulsivante, ni tamaño de tubo ni frecuencia objetivo. Requiere formulario, presentaciones, concentraciones, equipo y protocolo local.',
        'La secuencia rápida de intubación permanece bloqueada en el temario hasta que la academia defina alcance y dirección médica; esta lección no la desarrolla.',
      ],
    }),
  },

  // ============================================================
  //  Fracturas de cuerpo vertebral
  // ============================================================
  'm5-tcc-fracturas-vertebrales': {
    icono: '🦴',
    duracion: '13 min',
    resumen: 'Una vértebra puede fracturarse por compresión axial, por flexión, por extensión, por '
      + 'rotación o por distracción, y cada mecanismo produce un patrón distinto. Lo que interesa en '
      + 'la calle no es clasificar la fractura —eso lo hace la imagen— sino reconocer que existe y '
      + 'evitar que se convierta en una lesión medular. La lección insiste en que una fractura puede '
      + 'no dar déficit neurológico y en que el paciente mayor se fractura con mecanismos leves.',
    objetivos: [
      'Relacionar los mecanismos de lesión con los patrones de fractura vertebral.',
      'Reconocer los signos que obligan a asumir fractura vertebral.',
      'Distinguir fractura vertebral de lesión medular y actuar en consecuencia.',
    ],
    secciones: [
      {
        titulo: 'Mecanismos y patrones',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Mecanismo', 'Cómo actúa', 'Ejemplo típico'],
            filas: [
              ['Compresión axial', 'La carga se transmite por el eje del cuerpo y aplasta el cuerpo vertebral', 'Caída de pie o sobre los glúteos; zambullida'],
              ['Flexión', 'La columna se dobla hacia delante y comprime la parte anterior', 'Desaceleración frontal'],
              ['Extensión', 'La columna se dobla hacia atrás', 'Impacto posterior con reposacabezas mal ajustado'],
              ['Rotación', 'Giro del tronco respecto a la pelvis', 'Vuelco o impacto rotacional'],
              ['Flexión-distracción', 'La parte anterior se comprime y la posterior se separa', 'Cinturón colocado sobre el abdomen'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué importa el mecanismo aquí', texto: 'No para nombrar la fractura, sino para saber dónde mirar y con qué prioridad. Una caída de pie dirige la atención a la columna toracolumbar y al calcáneo; una marca de cinturón sobre el abdomen obliga a buscar además lesión intestinal. Igual que en el resto del módulo, el mecanismo orienta y no diagnostica.' },
        ],
      },
      {
        titulo: 'Reconocimiento y conducta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que hace sospechar una fractura vertebral',
            items: [
              'Dolor o hipersensibilidad en la línea media de la columna.',
              'Escalón, separación entre apófisis o deformidad palpable.',
              'Contractura muscular paravertebral intensa.',
              'Mecanismo de alto riesgo, aunque el paciente no refiera dolor.',
              'Cualquier traumatismo en paciente con osteoporosis, artritis avanzada o columna rígida, incluso de baja energía.',
              'Imposibilidad de valorar con fiabilidad por conciencia alterada, intoxicación o dolor distractor.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Fractura no es igual a lesión medular', texto: 'Se puede tener una vértebra rota con exploración neurológica normal, y se puede tener una lesión medular sin fractura evidente. Una exploración neurológica normal no descarta la fractura, y por eso no autoriza a movilizar al paciente sin precauciones: parte del daño medular se produce después del accidente, al mover mal a alguien cuya columna está rota.' },
          {
            tipo: 'lista',
            titulo: 'Qué se hace',
            items: [
              'Restricción del movimiento espinal cuando esté indicada, manteniendo la alineación neutra.',
              'Movilización en bloque, con el número de personas necesario.',
              'Exploración neurológica documentada con la hora, y repetida.',
              'Analgesia según alcance y protocolo: el dolor intenso también impide colaborar.',
              'Prevención de la hipotermia y manejo del resto de lesiones.',
              'Traslado a centro con capacidad neuroquirúrgica; la clasificación de la fractura y la decisión quirúrgica dependen de la imagen.',
            ],
          },
        ],
      },
      F([PHTLS_COLUMNA, ACS_BEST, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Compresión axial', definicion: 'Mecanismo en que la carga se transmite por el eje del cuerpo y aplasta el cuerpo vertebral.' },
      { termino: 'Lesión por flexión-distracción', definicion: 'Patrón en que la parte anterior de la vértebra se comprime y la posterior se separa; asociado al cinturón colocado sobre el abdomen.' },
      { termino: 'Dolor en la línea media', definicion: 'Hipersensibilidad sobre las apófisis espinosas; uno de los criterios que indican restricción del movimiento espinal.' },
      { termino: 'Columna rígida', definicion: 'Columna con osteoporosis o artritis avanzada, que se fractura con mecanismos de baja energía.' },
    ],
    flashcards: [
      { frente: 'Mecanismo típico de la fractura por compresión axial', reverso: 'Caída de pie o sobre los glúteos, y la zambullida en agua poco profunda.' },
      { frente: '¿Una exploración neurológica normal descarta fractura vertebral?', reverso: 'No: puede haber vértebra rota sin déficit, y por eso no autoriza a movilizar sin precauciones.' },
      { frente: '¿Qué patrón se asocia al cinturón sobre el abdomen?', reverso: 'La lesión por flexión-distracción, junto con lesión intestinal.' },
      { frente: '¿Por qué el anciano tiene umbral de sospecha más bajo?', reverso: 'Porque una columna rígida y osteoporótica se fractura con mecanismos leves.' },
      { frente: '¿Quién clasifica la fractura?', reverso: 'La imagen hospitalaria; en la escena se reconoce el riesgo y se protege la columna.' },
    ],
    quiz: [
      {
        pregunta: 'Trabajador que cae de pie desde una altura y refiere dolor en la línea media lumbar, con fuerza y sensibilidad normales. ¿Qué corresponde?',
        opciones: [
          'Descartar lesión espinal por la exploración neurológica normal.',
          'Asumir posible fractura vertebral, aplicar restricción del movimiento espinal, movilizar en bloque y trasladar.',
          'Sentarlo para valorar mejor la columna.',
          'Clasificar la fractura como compresión y comunicarlo así.',
        ],
        correcta: 1,
        explicacion: 'La exploración normal no descarta la fractura, y parte del daño medular se produce al movilizar mal después del accidente.',
      },
      {
        pregunta: '¿Qué diferencia hay entre fractura vertebral y lesión medular?',
        opciones: [
          'Son lo mismo con distinto nombre.',
          'Puede haber fractura sin lesión medular y lesión medular sin fractura evidente.',
          'La fractura siempre produce parálisis.',
          'La lesión medular solo ocurre en trauma penetrante.',
        ],
        correcta: 1,
        explicacion: 'Por eso la conducta se decide por mecanismo y hallazgos, no por la presencia de déficit.',
      },
      {
        pregunta: 'Paciente de 80 años con artritis avanzada que se cayó desde su propia altura y refiere dolor cervical. ¿Cómo se interpreta?',
        opciones: [
          'Mecanismo banal: no requiere precauciones.',
          'Riesgo elevado: una columna rígida y osteoporótica se fractura con mecanismos leves, y el umbral de sospecha baja.',
          'Indicación de sentarlo para explorarlo.',
          'Criterio automático de alta en el lugar.',
        ],
        correcta: 1,
        explicacion: 'La edad y la rigidez de la columna cambian la energía necesaria para producir una fractura.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La zambullida en agua poco profunda produce una fractura por ___ .',
          opciones: ['extensión', 'compresión axial', 'rotación'],
          correcta: 1,
          explicacion: 'La carga se transmite por el eje del cuerpo desde la cabeza.',
        },
        {
          texto: 'Un impacto posterior con el reposacabezas mal ajustado favorece el mecanismo de ___ .',
          opciones: ['flexión', 'extensión', 'distracción'],
          correcta: 1,
          explicacion: 'La cabeza queda atrás mientras el tronco es empujado hacia delante.',
        },
        {
          texto: 'Encontrar dolor en la línea media de la columna es uno de los criterios que indican ___ .',
          opciones: [
            'alta en el lugar',
            'restricción del movimiento espinal',
            'clasificación radiológica en la escena',
          ],
          correcta: 1,
          explicacion: 'Es uno de los elementos que aparecen en casi todos los criterios de decisión.',
        },
      ],
    },
    revision: ficha({
      version: V_COLUMNA,
      fuentes: FU_COLUMNA,
      extra: ['DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 para el trauma vertebromedular quedan pendientes de localizar en la copia licenciada.'],
    }),
  },

  // ============================================================
  //  Lesión medular anterior
  // ============================================================
  'm5-tcc-medular-anterior': {
    icono: '⬆️',
    duracion: '11 min',
    resumen: 'El síndrome medular anterior afecta a los dos tercios anteriores de la médula y produce '
      + 'el patrón inverso al posterior: se pierden la fuerza, el dolor y la temperatura por debajo de '
      + 'la lesión, mientras se conservan la propiocepción, la vibración y el tacto fino. Suele '
      + 'deberse a compresión anterior o a compromiso del flujo sanguíneo de esa zona, y es el '
      + 'síndrome medular incompleto de peor pronóstico funcional.',
    objetivos: [
      'Describir qué funciones se pierden y cuáles se conservan en el síndrome anterior.',
      'Explicar su mecanismo y su relación con la irrigación medular.',
      'Diferenciarlo del síndrome posterior y del de Brown-Séquard.',
    ],
    secciones: [
      {
        titulo: 'Qué se pierde y qué se conserva',
        bloques: [
          { tipo: 'p', texto: 'Por la parte anterior de la médula viajan las vías motoras y las que llevan el dolor y la temperatura. Por la posterior viajan la propiocepción, la vibración y el tacto fino. Si se lesiona la porción anterior, el paciente pierde lo primero y conserva lo segundo.' },
          {
            tipo: 'tabla',
            headers: ['Función', 'Estado por debajo de la lesión'],
            filas: [
              ['Fuerza muscular', 'PERDIDA'],
              ['Dolor y temperatura', 'PERDIDOS'],
              ['Propiocepción y vibración', 'Conservadas'],
              ['Tacto fino', 'Conservado'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El hallazgo que lo delata', texto: 'Un paciente que no mueve las piernas y no siente el pinchazo, pero sabe con los ojos cerrados en qué posición le has colocado el dedo del pie, tiene conservada la vía posterior. Esa disociación es lo que define el síndrome, y solo aparece si se explora la sensibilidad profunda además de la fuerza.' },
        ],
      },
      {
        titulo: 'Mecanismo, comparación y conducta',
        bloques: [
          { tipo: 'p', texto: 'Se produce por compresión directa de la parte anterior de la médula —un fragmento óseo, un fragmento discal, una luxación— o por compromiso del flujo sanguíneo que irriga ese territorio. Los mecanismos típicos son la flexión con carga axial y las lesiones por hiperflexión.' },
          {
            tipo: 'tabla',
            titulo: 'Los tres síndromes medulares incompletos',
            headers: ['Síndrome', 'Motor', 'Dolor/temperatura', 'Propiocepción'],
            filas: [
              ['Anterior', 'Perdido', 'Perdidos', 'Conservada'],
              ['Posterior', 'Conservado', 'Conservados', 'PERDIDA'],
              ['Brown-Séquard', 'Perdido del mismo lado', 'Perdidos del lado contrario', 'Perdida del mismo lado'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El de peor pronóstico', texto: 'Dentro de los síndromes medulares incompletos, el anterior es el que menos recuperación funcional suele alcanzar. Eso no cambia la conducta prehospitalaria, pero sí refuerza el valor de documentar con precisión el déficit inicial: es la referencia con la que se medirá cualquier evolución.' },
          {
            tipo: 'lista',
            titulo: 'Manejo prehospitalario',
            items: [
              'Restricción del movimiento espinal y movilización en bloque.',
              'Exploración documentada por función y por nivel, con la hora.',
              'Vigilancia de la ventilación si la lesión es cervical o torácica alta.',
              'Búsqueda de shock neurogénico, sin dar por explicada la hipotensión antes de descartar hemorragia.',
              'Prevención activa de la hipotermia.',
              'Traslado a centro con capacidad neuroquirúrgica.',
            ],
          },
        ],
      },
      F([PHTLS_COLUMNA, ACS_BEST, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Síndrome medular anterior', definicion: 'Lesión de los dos tercios anteriores de la médula con pérdida de fuerza, dolor y temperatura, y conservación de propiocepción, vibración y tacto fino.' },
      { termino: 'Disociación sensitiva', definicion: 'Pérdida de una modalidad sensitiva con conservación de otra, característica de los síndromes medulares incompletos.' },
      { termino: 'Hiperflexión', definicion: 'Mecanismo de flexión forzada de la columna, típico del síndrome medular anterior.' },
    ],
    flashcards: [
      { frente: '¿Qué se pierde en el síndrome medular anterior?', reverso: 'La fuerza, el dolor y la temperatura por debajo de la lesión.' },
      { frente: '¿Qué se conserva?', reverso: 'La propiocepción, la vibración y el tacto fino.' },
      { frente: '¿Cuál es el síndrome incompleto de peor pronóstico funcional?', reverso: 'El anterior.' },
      { frente: 'Mecanismo típico', reverso: 'Compresión anterior por fragmento óseo o discal, o compromiso del flujo sanguíneo de ese territorio; flexión con carga axial.' },
      { frente: '¿Por qué se documenta el déficit inicial con detalle?', reverso: 'Porque es la referencia con la que se medirá la evolución posterior.' },
    ],
    quiz: [
      {
        pregunta: 'Tras un traumatismo cervical, el paciente no mueve las piernas ni siente el pinchazo, pero identifica la posición de sus dedos con los ojos cerrados. ¿Qué síndrome es?',
        opciones: ['Posterior', 'Anterior', 'Brown-Séquard', 'Sección completa'],
        correcta: 1,
        explicacion: 'Pérdida motora y de dolor con propiocepción conservada define el síndrome anterior.',
      },
      {
        pregunta: '¿Qué hallazgo distingue el síndrome anterior del posterior?',
        opciones: [
          'La presencia de dolor en el cuello.',
          'Qué se conserva: en el anterior la propiocepción; en el posterior, la fuerza, el dolor y la temperatura.',
          'El lado del cuerpo afectado.',
          'La edad del paciente.',
        ],
        correcta: 1,
        explicacion: 'Lo que va por delante de la médula se pierde en el anterior; lo que va por detrás, en el posterior.',
      },
      {
        pregunta: 'Paciente con síndrome medular anterior cervical e hipotensión. ¿Qué conducta corresponde?',
        opciones: [
          'Atribuir la hipotensión al shock neurogénico y no buscar más.',
          'Descartar activamente hemorragia y tratar el shock mientras se investiga.',
          'Sentar al paciente para mejorar la presión.',
          'Retirar la restricción del movimiento espinal.',
        ],
        correcta: 1,
        explicacion: 'La hemorragia es la causa más frecuente y más letal de hipotensión en trauma.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el síndrome medular anterior, la propiocepción está ___ .',
          opciones: ['perdida', 'conservada', 'aumentada'],
          correcta: 1,
          explicacion: 'Viaja por los cordones posteriores, que no resultan afectados.',
        },
        {
          texto: 'La disociación entre fuerza perdida y sensibilidad profunda conservada solo se detecta si además de la fuerza se explora la ___ .',
          opciones: ['temperatura corporal', 'sensibilidad profunda', 'frecuencia cardiaca'],
          correcta: 1,
          explicacion: 'Explorar solo la movilidad hace que el patrón pase desapercibido.',
        },
        {
          texto: 'Dentro de los síndromes incompletos, el anterior es el de ___ pronóstico funcional.',
          opciones: ['mejor', 'peor', 'idéntico'],
          correcta: 1,
          explicacion: 'Brown-Séquard es el que suele alcanzar más recuperación.',
        },
      ],
    },
    revision: ficha({
      version: V_COLUMNA,
      fuentes: FU_COLUMNA,
      extra: ['Completa la serie de síndromes medulares incompletos junto con los temas ya redactados de síndrome posterior y de Brown-Séquard.'],
    }),
  },

  // ============================================================
  //  Síndrome de cauda equina
  // ============================================================
  'm5-tcc-cauda-equina': {
    icono: '🐴',
    duracion: '12 min',
    resumen: 'Por debajo del final de la médula, el canal contiene un haz de raíces nerviosas que '
      + 'recibe el nombre de cola de caballo o cauda equina. Su compresión produce un cuadro '
      + 'reconocible: dolor lumbar, debilidad de las piernas, alteración de la sensibilidad en la zona '
      + 'que contacta con una silla de montar y pérdida del control de esfínteres. Es una urgencia '
      + 'quirúrgica dependiente del tiempo, y el plan la registra con la errata «causa equina».',
    objetivos: [
      'Explicar qué es la cauda equina y por qué su lesión no es medular.',
      'Reconocer el cuadro clínico y su carácter de urgencia quirúrgica.',
      'Documentar y comunicar los hallazgos que determinan la prioridad.',
    ],
    secciones: [
      {
        titulo: 'Nota editorial y anatomía',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: '«Cauda equina», no «causa equina»', texto: 'El plan de estudios escribe «Síndrome de causa equina». El término correcto es **cauda equina** —cola de caballo—, por el aspecto del haz de raíces nerviosas. Se muestra la forma correcta y se conserva la errata en el título documental.' },
          { tipo: 'p', texto: 'La médula espinal no llega hasta el final de la columna: termina en la región lumbar alta y, a partir de ahí, el canal contiene únicamente raíces nerviosas que descienden hasta salir por sus agujeros. Ese haz es la cauda equina. Por eso su lesión no es una lesión medular en sentido estricto, sino una lesión de raíces, y su comportamiento clínico es distinto.' },
        ],
      },
      {
        titulo: 'El cuadro',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que se busca',
            items: [
              'Dolor lumbar, con frecuencia intenso, que puede irradiar a una o ambas piernas.',
              'Debilidad de los miembros inferiores, a menudo asimétrica.',
              'Alteración de la sensibilidad «en silla de montar»: periné, región genital, cara interna de los muslos y zona perianal.',
              'Retención urinaria o incapacidad de iniciar la micción, y después incontinencia por rebosamiento.',
              'Pérdida del control del esfínter anal.',
              'Disfunción sexual de aparición reciente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La pregunta que no se hace y debería hacerse', texto: 'Un paciente con dolor lumbar rara vez cuenta por iniciativa propia que no puede orinar o que no nota el papel al limpiarse. Preguntarlo de forma directa y respetuosa —control de esfínteres y sensibilidad en la zona de contacto con una silla— es lo que separa un lumbago de una urgencia quirúrgica. Se pregunta con cuidado, se documenta lo que responde y se preserva su intimidad.' },
          { tipo: 'p', texto: 'En el contexto traumático se produce por fractura o luxación lumbar, por desplazamiento de un fragmento o por hematoma dentro del canal. También existen causas no traumáticas —hernia discal masiva, tumor, infección— que producen el mismo cuadro y que el paciente puede presentar sin ningún antecedente de golpe.' },
        ],
      },
      {
        titulo: 'Por qué corre prisa',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Urgencia dependiente del tiempo', texto: 'La recuperación de la función de esfínteres y de la sensibilidad perineal depende de lo pronto que se descomprimen las raíces. Un retraso puede dejar secuelas permanentes en funciones que condicionan por completo la vida del paciente. Por eso este cuadro se comunica de forma explícita en la prealerta, no como «dolor lumbar».' },
          {
            tipo: 'lista',
            titulo: 'Conducta prehospitalaria',
            items: [
              'Restricción del movimiento espinal si el mecanismo o los hallazgos lo indican, y movilización en bloque.',
              'Exploración documentada de fuerza y sensibilidad en ambas piernas, con la hora.',
              'Registro explícito de lo que refiera sobre micción, esfínteres y sensibilidad perineal.',
              'Analgesia según alcance y protocolo.',
              'No sondar: la valoración urológica corresponde al hospital y el sondaje no es una conducta de esta lección.',
              'Traslado a centro con capacidad neuroquirúrgica y prealerta nombrando la sospecha.',
            ],
          },
        ],
      },
      F([PHTLS_COLUMNA, ACS_BEST, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Cauda equina', definicion: 'Haz de raíces nerviosas que ocupa el canal vertebral por debajo del final de la médula espinal.' },
      { termino: 'Anestesia en silla de montar', definicion: 'Pérdida de sensibilidad en periné, región genital, cara interna de los muslos y zona perianal.' },
      { termino: 'Retención urinaria', definicion: 'Incapacidad de iniciar la micción pese al deseo; signo de alarma en el síndrome de cauda equina.' },
      { termino: 'Urgencia dependiente del tiempo', definicion: 'Situación en que el resultado funcional depende directamente de la rapidez del tratamiento definitivo.' },
    ],
    flashcards: [
      { frente: '¿Qué es la cauda equina?', reverso: 'El haz de raíces nerviosas del canal vertebral por debajo del final de la médula.' },
      { frente: 'Cuatro elementos del cuadro', reverso: 'Dolor lumbar, debilidad de piernas, anestesia en silla de montar y pérdida del control de esfínteres.' },
      { frente: '¿Por qué es una urgencia dependiente del tiempo?', reverso: 'Porque la recuperación de esfínteres y sensibilidad perineal depende de lo pronto que se descomprimen las raíces.' },
      { frente: '¿Qué se pregunta activamente a un paciente con dolor lumbar?', reverso: 'Si puede orinar, si controla los esfínteres y si nota la zona de contacto con una silla de montar.' },
      { frente: '¿Cuál es la grafía correcta?', reverso: 'Cauda equina; el plan escribe «causa equina», que se conserva solo como título documental.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con dolor lumbar tras una caída que además no puede orinar y no nota la zona perineal. ¿Qué sospechas?',
        opciones: [
          'Lumbalgia mecánica simple.',
          'Síndrome de cauda equina: es una urgencia quirúrgica dependiente del tiempo.',
          'Fractura de cadera.',
          'Lesión medular cervical.',
        ],
        correcta: 1,
        explicacion: 'La combinación de dolor lumbar, retención urinaria y anestesia en silla de montar es característica.',
      },
      {
        pregunta: '¿Por qué la lesión de la cauda equina no es estrictamente una lesión medular?',
        opciones: [
          'Porque no produce déficit neurológico.',
          'Porque a esa altura el canal ya no contiene médula, sino raíces nerviosas.',
          'Porque solo ocurre sin traumatismo.',
          'Porque afecta únicamente a los esfínteres.',
        ],
        correcta: 1,
        explicacion: 'La médula termina en la región lumbar alta; por debajo descienden las raíces.',
      },
      {
        pregunta: 'En la prealerta, ¿cómo comunicas este caso?',
        opciones: [
          'Como «dolor lumbar tras caída».',
          'Nombrando la sospecha de síndrome de cauda equina y detallando retención urinaria, alteración perineal y déficit de fuerza con sus horas.',
          'Como lesión medular completa.',
          'Sin mencionar los esfínteres, por respeto a la intimidad.',
        ],
        correcta: 1,
        explicacion: 'Comunicarlo como dolor lumbar retrasa una descompresión cuyo resultado depende del tiempo; la intimidad se preserva en la exploración, no ocultando el dato clínico.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Atiendes a un paciente con dolor lumbar intenso tras un accidente. Camina con dificultad y no refiere nada más. ¿Qué añades a tu valoración según esta lección?',
          opciones: [
            'Nada: el dolor lumbar explica el cuadro.',
            'Preguntar de forma directa y respetuosa por micción, control de esfínteres y sensibilidad en la zona de contacto con una silla, y documentar la respuesta.',
            'Sondarlo para comprobar la retención urinaria.',
            'Sentarlo y pedirle que camine sin ayuda.',
          ],
          correcta: 1,
          explicacion: 'La lección señala que el paciente rara vez lo cuenta por iniciativa propia y que esa pregunta separa un lumbago de una urgencia quirúrgica; el sondaje no es conducta de esta lección.',
        },
      ],
    },
    revision: ficha({
      version: V_COLUMNA,
      fuentes: FU_COLUMNA,
      extra: [
        'La errata documental «causa equina» se conserva en el título oficial y se corrige solo en el título visible.',
        'Se declara la existencia de causas no traumáticas del mismo cuadro sin desarrollarlas, para no invadir el ámbito médico de otro módulo.',
      ],
    }),
  },
}
