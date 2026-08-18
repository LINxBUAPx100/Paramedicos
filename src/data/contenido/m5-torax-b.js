// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE TÓRAX» (lote A)
// ------------------------------------------------------------
//  Los 11 temas que faltaban de la unidad. Los 10 ya redactados —definición,
//  clavícula, escápula, esófago, neumotórax a tensión, hemoneumotórax,
//  quilotórax, contusión pulmonar, asfixia traumática y ruptura diafragmática—
//  NO se tocan: este archivo aporta temas nuevos, y la fusión por campo del
//  punto de unión respeta lo anterior.
//
//  Pauta editorial: `docs/GUIA-REDACCION-M5-LOTE-A.md`.
//
//  ACTUALIZACIÓN CLÍNICA QUE ESTE ARCHIVO INTRODUCE:
//  en `m5-tt-neumotorax-abierto` NO se enseña el apósito oclusivo de tres
//  lados como regla universal. Se sigue la guía AHA/Cruz Roja Americana de
//  Primeros Auxilios 2024: es razonable dejar la herida expuesta, o usar un
//  apósito limpio y seco no oclusivo, o un sello torácico ventilado si se
//  dispone de él; y si cualquier apósito o sello empeora la respiración, se
//  afloja o se retira. La conducta histórica se explica como antecedente y se
//  identifica como tal.
//
//  Fuentes asignadas por el registro para `m5-trauma-torax`: PHTLS 9.ª ed.
//  (cap. 10, pp. 345–376), AHA Primeros Auxilios 2024, WHO/ICRC BEC y ACS Best
//  Practices; requiere protocolo local. La copia de PHTLS 10 declara traducción
//  automática: no se consulta ni se cita.
//
//  Sin dosis, calibres, sitios de punción ni umbrales: dependen del alcance
//  autorizado, del equipo real y del protocolo del servicio.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS_TORAX = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), '
    + 'cap. 10, «Trauma torácico», pp. 345–376.',
  nota: 'Base curricular histórica declarada por el plan de estudios. El intervalo de páginas '
    + 'corresponde al capítulo verificado en la copia licenciada; la página exacta de cada afirmación '
    + 'concreta queda PENDIENTE de confirmación docente. No se cita la 10.ª edición: la copia '
    + 'disponible declara traducción automática y no es citable.',
}
const AHA_PRIMEROS_AUXILIOS_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía primaria actual. Sostiene la actualización sobre la herida torácica abierta: dejar '
    + 'expuesta, apósito limpio no oclusivo o sello ventilado, y aflojar o retirar si empeora la '
    + 'respiración. PENDIENTE: apartado exacto dentro de la guía.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE, reconocimiento del compromiso respiratorio y del shock. '
    + 'PENDIENTE: módulo y página exactos.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Colección de guías de buenas prácticas del ACS usada como contraste actual. PENDIENTE: guía y '
    + 'apartado exactos.',
}
const ACS_TRIAJE = {
  nombre: 'American College of Surgeons. National Guideline for the Field Triage of Injured Patients, '
    + 'revisión 2021.',
  url: 'https://www.facs.org/quality-programs/trauma/systems/field-triage-guidelines/',
  nota: 'El mecanismo estima riesgo y decide destino; no diagnostica una lesión. PENDIENTE: apartado '
    + 'exacto.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const PROTOCOLO = 'ALCANCE Y PROTOCOLO: oxígeno, apoyo ventilatorio, vía aérea avanzada, '
  + 'descompresión torácica, accesos, fluidos, hemoderivados, analgesia, monitorización y destino '
  + 'dependen del alcance autorizado del prestador, del equipamiento de la unidad y del protocolo del '
  + 'servicio. La lección enseña el reconocimiento y la conducta general; no autoriza el procedimiento.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: se sospecha, se sostiene y se traslada. El diagnóstico de '
  + 'estas lesiones es hospitalario y depende de imagen; la impresión de campo no se presenta como '
  + 'diagnóstico ni en la lección ni en el informe.'

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

const VERSION = 'PHTLS 9.ª ed. (2020), cap. 10; AHA/ARC Primeros Auxilios 2024; WHO/ICRC BEC 2018'
const FUENTES_FICHA = [
  'NAEMT. PHTLS, 9.ª ed., 2020, cap. 10, pp. 345–376.',
  'AHA / American Red Cross. Guidelines for First Aid, 2024.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
  'ACS. Trauma Quality Programs, Best Practices Guidelines.',
]

export default {
  // ============================================================
  //  1. Clasificación de abierto o cerrado
  // ============================================================
  'm5-tt-clasificacion': {
    icono: '🗂️',
    duracion: '13 min',
    resumen: 'El trauma torácico se clasifica primero por la integridad de la pared —abierto o '
      + 'cerrado— y después por el problema fisiológico que produce: fallo de la ventilación, fallo '
      + 'de la oxigenación o fallo de la perfusión. La segunda clasificación es la que organiza la '
      + 'atención dentro del ABCDE, porque dice qué corregir primero. Varias lesiones pueden coexistir '
      + 'en el mismo paciente, y la clasificación mecánica nunca sustituye a la evaluación fisiológica.',
    objetivos: [
      'Clasificar el trauma torácico por integridad de la pared y por problema fisiológico.',
      'Situar las amenazas torácicas dentro de la secuencia ABCDE.',
      'Reconocer que varias lesiones pueden coexistir en el mismo paciente.',
    ],
    secciones: [
      {
        titulo: 'Dos clasificaciones que se usan a la vez',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Cerrado', 'Abierto'],
            filas: [
              ['Pared torácica', 'Íntegra o con lesión superficial', 'Atravesada: hay comunicación con el exterior'],
              ['Mecanismos típicos', 'Colisión, caída, aplastamiento, onda expansiva', 'Arma blanca, proyectil, empalamiento'],
              ['Lo que complica el reconocimiento', 'Lesión interna sin señal externa', 'La herida visible no mide el daño profundo'],
            ],
          },
          { tipo: 'p', texto: 'Esta primera clasificación orienta qué buscar. Pero la que decide el orden de la atención es la segunda: qué está fallando ahora mismo.' },
          {
            tipo: 'tabla',
            titulo: 'El problema fisiológico y dónde se detecta en el ABCDE',
            headers: ['Problema', 'Qué ocurre', 'Dónde se detecta'],
            filas: [
              ['Ventilación', 'El aire no entra ni sale bien: dolor, segmento inestable, herida abierta, obstrucción', 'B'],
              ['Oxigenación', 'El aire llega pero no se intercambia: contusión, colapso pulmonar, ocupación del espacio pleural', 'B'],
              ['Perfusión', 'La sangre no circula: hemorragia u obstrucción al llenado cardiaco', 'C'],
            ],
          },
        ],
      },
      {
        titulo: 'Cómo se ordena la atención',
        bloques: [
          { tipo: 'p', texto: 'El ABCDE no es un formulario: es un orden de prioridad. En el tórax significa que primero se asegura que el aire entre y salga, después que se intercambie, y después que la sangre circule; y que un hallazgo que compromete un escalón anterior se atiende antes de pasar al siguiente.' },
          {
            tipo: 'lista',
            titulo: 'Hallazgos que obligan a detenerse donde se encuentran',
            items: [
              'Vía aérea comprometida por lesión de cuello o por sangre y secreciones.',
              'Respiración inadecuada: frecuencia muy alta o muy baja, esfuerzo evidente, movimiento asimétrico del tórax.',
              'Ruidos respiratorios ausentes o muy disminuidos en un hemitórax.',
              'Herida torácica abierta con paso de aire.',
              'Signos de shock con o sin hemorragia externa visible.',
              'Ingurgitación yugular con deterioro respiratorio y circulatorio.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La clasificación no sustituye a la evaluación', texto: 'Saber que un trauma es cerrado no dice cómo está el paciente, y una herida penetrante pequeña puede convivir con un cuadro grave. Lo que decide la conducta es lo que el paciente hace: cómo respira, cómo perfunde y cómo cambia entre valoraciones.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Las lesiones coexisten', texto: 'Un mismo paciente puede tener fracturas costales, contusión pulmonar y un hemotórax al mismo tiempo. Encontrar una explicación plausible no autoriza a dejar de buscar: la reevaluación periódica es lo que detecta la segunda lesión.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_TRIAJE]),
    ],
    conceptosClave: [
      { termino: 'Trauma torácico cerrado', definicion: 'Aquel en que la pared del tórax se mantiene íntegra y la energía se transfiere por compresión, desaceleración o estallido.' },
      { termino: 'Trauma torácico abierto', definicion: 'Aquel en que la pared es atravesada y existe comunicación entre el exterior y el interior del tórax.' },
      { termino: 'Fallo de ventilación', definicion: 'Incapacidad de mover aire adecuadamente dentro y fuera del pulmón; se detecta en la B del ABCDE.' },
      { termino: 'Fallo de oxigenación', definicion: 'Incapacidad de intercambiar gases pese a que el aire llegue al pulmón.' },
    ],
    flashcards: [
      { frente: 'Las dos clasificaciones del trauma torácico', reverso: 'Por integridad de la pared —abierto o cerrado— y por problema fisiológico: ventilación, oxigenación o perfusión.' },
      { frente: '¿Cuál de las dos organiza la atención?', reverso: 'La fisiológica, porque dice qué corregir primero dentro del ABCDE.' },
      { frente: '¿Dónde se detecta el fallo de perfusión?', reverso: 'En la C del ABCDE.' },
      { frente: '¿Puede un paciente tener varias lesiones torácicas a la vez?', reverso: 'Sí: encontrar una explicación no autoriza a dejar de buscar las demás.' },
      { frente: '¿Qué decide la conducta, la clasificación o el paciente?', reverso: 'El paciente: cómo respira, cómo perfunde y cómo cambia entre valoraciones.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con trauma torácico cerrado, taquipneico, con movimiento asimétrico del tórax y ruidos disminuidos en un lado. ¿Qué escalón del ABCDE reclama tu atención?',
        opciones: ['A, por la vía aérea', 'B, por el compromiso ventilatorio y de oxigenación', 'C, exclusivamente', 'D, por el estado neurológico'],
        correcta: 1,
        explicacion: 'La asimetría del movimiento y la disminución de ruidos apuntan al escalón respiratorio, que se resuelve antes de avanzar.',
      },
      {
        pregunta: '¿Qué añade clasificar el trauma torácico como abierto o cerrado?',
        opciones: [
          'Determina el pronóstico del paciente.',
          'Orienta qué buscar según la forma de transferencia de energía, sin decir cómo está el paciente.',
          'Sustituye la valoración fisiológica.',
          'Define el tratamiento definitivo.',
        ],
        correcta: 1,
        explicacion: 'Es una clasificación de mecanismo: útil para dirigir la búsqueda, insuficiente para decidir la conducta.',
      },
      {
        pregunta: 'Encuentras fracturas costales que explican el dolor y la ventilación superficial. ¿Qué corresponde?',
        opciones: [
          'Cerrar la valoración: ya hay una explicación.',
          'Seguir buscando y reevaluando, porque contusión pulmonar, neumotórax o hemotórax pueden coexistir con esas fracturas.',
          'Vendar el tórax de forma circular.',
          'Descartar lesión pulmonar por la ausencia de herida.',
        ],
        correcta: 1,
        explicacion: 'Las lesiones torácicas coexisten con frecuencia y algunas se manifiestan más tarde.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Una herida torácica abierta con paso de aire compromete principalmente la ___.',
          opciones: ['perfusión', 'ventilación', 'función neurológica'],
          correcta: 1,
          explicacion: 'El aire entra por donde no debe y el fuelle deja de funcionar correctamente.',
        },
        {
          texto: 'Un hemotórax importante compromete la ventilación y, además, la ___.',
          opciones: ['perfusión', 'temperatura', 'conciencia por sí sola'],
          correcta: 0,
          explicacion: 'Ocupa espacio en el hemitórax y, al mismo tiempo, resta volumen circulante.',
        },
        {
          texto: 'La clasificación mecánica del trauma torácico no sustituye a la ___.',
          opciones: ['historia del paciente', 'evaluación fisiológica repetida', 'imagen hospitalaria'],
          correcta: 1,
          explicacion: 'Lo que decide la conducta prehospitalaria es cómo está el paciente y cómo cambia.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['Sirve de entrada a la unidad: organiza los diez temas siguientes por el problema fisiológico que producen.'],
    }),
  },

  // ============================================================
  //  2. Lesión de tráquea y laringe
  // ============================================================
  'm5-tt-traquea-laringe': {
    icono: '🗣️',
    duracion: '13 min',
    resumen: 'La lesión de la vía aérea superior es poco frecuente y muy peligrosa, porque la vía por '
      + 'la que respira el paciente es la que está dañada. Se sospecha por disfonía, estridor, '
      + 'enfisema subcutáneo cervical, herida en el cuello, hemoptisis y por un deterioro que progresa '
      + 'con el tiempo. La conducta prehospitalaria es reconocer pronto, manipular lo mínimo '
      + 'imprescindible, apoyar la oxigenación y avisar temprano al centro receptor.',
    objetivos: [
      'Reconocer los signos de lesión traqueal o laríngea en un traumatizado.',
      'Aplicar el principio de mínima manipulación de la vía aérea comprometida.',
      'Justificar el aviso temprano al centro receptor.',
    ],
    secciones: [
      {
        titulo: 'Cuándo sospecharla',
        bloques: [
          { tipo: 'p', texto: 'El mecanismo típico es un golpe directo en la cara anterior del cuello —el borde de un volante, un cable, el manillar, una agresión— o una herida penetrante cervical. También puede acompañar a una lesión por desaceleración importante.' },
          {
            tipo: 'lista',
            titulo: 'Signos que deben alertar',
            items: [
              'Cambio de la voz: disfonía, voz apagada o afonía.',
              'Estridor: ruido inspiratorio que indica estrechamiento de la vía aérea superior.',
              'Enfisema subcutáneo en el cuello: crepitación al palpar, con aire donde no debería haberlo.',
              'Herida penetrante cervical, hematoma cervical en expansión o deformidad del contorno del cuello.',
              'Hemoptisis o sangre en la boca sin origen bucal evidente.',
              'Dolor a la palpación de la laringe y dificultad o dolor al tragar.',
              'Dificultad respiratoria que aumenta con el paso de los minutos.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El deterioro progresivo es la señal más importante', texto: 'Un hematoma o un edema en el cuello crecen. Un paciente que llegaba hablando puede empeorar durante el traslado. Por eso la reevaluación es continua y la decisión de trasladar no espera a que el cuadro se complete.' },
        ],
      },
      {
        titulo: 'Qué hace el equipo prehospitalario',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Conducta general',
            items: [
              'Mínima manipulación del cuello y de la vía aérea: cada intento innecesario puede aumentar el edema o el sangrado.',
              'Permitir al paciente consciente la posición en que respira mejor, si no hay contraindicación por sospecha espinal.',
              'Oxígeno y apoyo ventilatorio conforme al alcance autorizado y al protocolo del servicio.',
              'Aspiración de secreciones o sangre si es necesaria y está dentro del alcance, con la técnica y el equipo autorizados.',
              'No comprimir de forma circular el cuello ni aplicar vendajes que lo rodeen.',
              'Traslado con prealerta explícita: el centro receptor debe poder preparar una vía aérea difícil antes de que llegue el paciente.',
              'Vigilar el enfisema subcutáneo: si progresa, se documenta y se comunica.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La instrumentación avanzada no es una decisión de esta lección', texto: 'Intentar una vía aérea avanzada en una laringe o una tráquea lesionadas puede empeorar la lesión o cerrar definitivamente el paso del aire. Si está indicada, quién puede intentarlo, con qué dispositivo y en qué condiciones lo determinan la competencia del prestador, el equipo disponible y la dirección médica. Aquí se enseña a reconocer el problema y a avisar, no a resolverlo con un procedimiento.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Estridor', definicion: 'Ruido respiratorio, habitualmente inspiratorio, que indica estrechamiento de la vía aérea superior.' },
      { termino: 'Disfonía', definicion: 'Alteración de la voz; en trauma cervical sugiere afectación laríngea.' },
      { termino: 'Enfisema subcutáneo cervical', definicion: 'Aire atrapado bajo la piel del cuello, que se palpa como crepitación y señala fuga desde la vía aérea o el tubo digestivo.' },
      { termino: 'Hemoptisis', definicion: 'Expulsión de sangre procedente de la vía aérea.' },
    ],
    flashcards: [
      { frente: 'Tres signos de lesión laringotraqueal', reverso: 'Disfonía o afonía, estridor y enfisema subcutáneo cervical.' },
      { frente: '¿Por qué se manipula lo mínimo posible?', reverso: 'Porque cada intento innecesario puede aumentar el edema o el sangrado y cerrar el paso del aire.' },
      { frente: '¿Qué señal indica que el cuadro está progresando?', reverso: 'El aumento de la dificultad respiratoria, del hematoma o del enfisema con el paso de los minutos.' },
      { frente: '¿Por qué la prealerta es especialmente útil aquí?', reverso: 'Porque permite al centro receptor preparar el manejo de una vía aérea difícil antes de que llegue el paciente.' },
      { frente: '¿Se vendan de forma circular las heridas del cuello?', reverso: 'No: no se comprime el cuello de forma circular.' },
    ],
    quiz: [
      {
        pregunta: 'Golpe directo en la cara anterior del cuello. El paciente habla con voz apagada, tiene estridor leve y notas crepitación cervical. ¿Qué haces?',
        opciones: [
          'Aseguras la vía aérea con un dispositivo avanzado de inmediato, sea cual sea tu alcance.',
          'Reconoces la sospecha, manipulas lo mínimo, apoyas la oxigenación según protocolo, permites la posición en que respira mejor y trasladas con prealerta.',
          'Aplicas un vendaje circular en el cuello.',
          'Esperas en la escena a ver si mejora.',
        ],
        correcta: 1,
        explicacion: 'El reconocimiento, la mínima manipulación y el aviso temprano son la aportación prehospitalaria; la instrumentación depende de competencia y protocolo.',
      },
      {
        pregunta: '¿Qué significa el estridor en este contexto?',
        opciones: [
          'Que hay líquido en el espacio pleural.',
          'Que la vía aérea superior está estrechada.',
          'Que existe una fractura costal.',
          'Que el paciente hiperventila por ansiedad.',
        ],
        correcta: 1,
        explicacion: 'Es un ruido de paso de aire por una vía estrechada, y en trauma cervical orienta a lesión laríngea o traqueal.',
      },
      {
        pregunta: 'Durante el traslado, el enfisema subcutáneo cervical del paciente ha aumentado de extensión. ¿Cómo lo interpretas?',
        opciones: [
          'Como un hallazgo estable sin valor.',
          'Como progresión del cuadro: se documenta, se comunica y se refuerza la vigilancia de la vía aérea.',
          'Como signo de mejoría.',
          'Como indicación de retirar el oxígeno.',
        ],
        correcta: 1,
        explicacion: 'El enfisema que progresa indica que la fuga continúa y anticipa un posible deterioro respiratorio.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente con herida penetrante cervical, hablando con normalidad al llegar. Diez minutos después su voz es apagada y aparece un hematoma cervical mayor que al principio. ¿Qué representa ese cambio para tu conducta?',
          opciones: [
            'Nada relevante: sigue hablando.',
            'Un deterioro progresivo que refuerza la sospecha, acelera el traslado y obliga a comunicar la evolución al centro receptor.',
            'Una indicación de vendaje compresivo circular del cuello.',
            'Una razón para retrasar el traslado y observar en la escena.',
          ],
          correcta: 1,
          explicacion: 'La lección señala el deterioro progresivo como la señal más importante: el hematoma y el edema crecen y la vía aérea puede cerrarse.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La lección NO autoriza ni describe una técnica de vía aérea avanzada: la remite expresamente a competencia, equipo y dirección médica.'],
    }),
  },

  // ============================================================
  //  3. Lesión de costilla
  // ============================================================
  'm5-tt-costilla': {
    icono: '🦴',
    duracion: '13 min',
    resumen: 'La fractura costal es la lesión torácica más común y su importancia real está en dos '
      + 'cosas: el dolor limita la ventilación y favorece complicaciones respiratorias, y la fractura '
      + 'avisa de lo que puede haber debajo. En personas mayores o frágiles, una fractura costal tiene '
      + 'más peso del que aparenta. La lección retira el vendaje circunferencial del tórax y remite la '
      + 'analgesia, el oxígeno y el apoyo ventilatorio al protocolo del servicio.',
    objetivos: [
      'Reconocer la fractura costal por clínica y exploración.',
      'Explicar por qué el dolor compromete la ventilación y qué complicaciones favorece.',
      'Rechazar el vendaje circunferencial y justificar el motivo.',
    ],
    secciones: [
      {
        titulo: 'Reconocimiento',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que se encuentra',
            items: [
              'Dolor localizado que aumenta con la inspiración profunda, con la tos y con el movimiento.',
              'Sensibilidad puntual a la palpación sobre el arco costal afectado.',
              'Crepitación ósea a la palpación en algunos casos.',
              'Respiración superficial y rápida: el paciente evita respirar hondo porque duele.',
              'El paciente sujeta o protege la zona con la mano o con el brazo.',
              'Equimosis o marca del mecanismo sobre la pared torácica.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La localización orienta la búsqueda', texto: 'Las fracturas de las costillas superiores requieren mucha energía por su protección; las de las costillas inferiores dirigen la atención al abdomen superior, donde están hígado y bazo. En ambos casos se trata de dirigir la exploración, no de declarar una lesión de esos órganos.' },
        ],
      },
      {
        titulo: 'Por qué importa más de lo que parece',
        bloques: [
          { tipo: 'p', texto: 'El problema no es el hueso, sino lo que el dolor provoca. Un paciente que no respira hondo ni tose eficazmente ventila peor zonas del pulmón y acumula secreciones, y esa cadena favorece complicaciones respiratorias en los días siguientes. Por eso el control del dolor, cuando el protocolo lo autoriza, no es una comodidad: es parte del tratamiento respiratorio.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La persona mayor o frágil es un caso aparte', texto: 'Con una caja torácica rígida y hueso frágil, una fractura costal puede producirse con mecanismos de baja energía y tolerarse mucho peor. En pacientes de edad avanzada o con enfermedad respiratoria previa, una fractura aparentemente simple justifica un umbral de traslado y de vigilancia más bajo.' },
          {
            tipo: 'lista',
            titulo: 'Lo que hay que seguir buscando debajo',
            items: [
              'Contusión pulmonar, que evoluciona en horas.',
              'Neumotórax o hemotórax por lesión de la pleura o de vasos de la pared.',
              'Lesión de órganos abdominales superiores cuando las costillas afectadas son las inferiores.',
              'Segmento con movimiento paradójico, si hay varias costillas rotas en más de un punto.',
            ],
          },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No se venda el tórax de forma circunferencial', texto: 'El vendaje circular o las cintas que rodean el tórax limitan la expansión torácica y empeoran la ventilación del paciente, que es justo lo que ya está comprometido. Es una práctica que se retira del temario: inmovilizar el tórax no es tratar una fractura costal.' },
          {
            tipo: 'lista',
            titulo: 'Qué sí se hace',
            items: [
              'Posición cómoda; muchos pacientes ventilan mejor semisentados si no hay contraindicación.',
              'Oxígeno y apoyo ventilatorio si el trabajo respiratorio aumenta, conforme al protocolo del servicio.',
              'Analgesia según el alcance autorizado y el protocolo: reduce el dolor y permite ventilar y toser.',
              'Animar a respirar de forma profunda y a toser dentro de lo tolerable.',
              'Reevaluación respiratoria durante el traslado, porque una lesión subyacente puede manifestarse en ese intervalo.',
              'Traslado y comunicación del mecanismo, del número aproximado de arcos afectados y de la evolución.',
            ],
          },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Fractura costal', definicion: 'Solución de continuidad de uno o varios arcos costales; lesión torácica más frecuente y limitante de la ventilación por dolor.' },
      { termino: 'Ventilación superficial antálgica', definicion: 'Respiración poco profunda que el paciente adopta para evitar el dolor, y que reduce la ventilación de algunas zonas del pulmón.' },
      { termino: 'Vendaje circunferencial', definicion: 'Vendaje que rodea el tórax; práctica retirada porque limita la expansión torácica y empeora la ventilación.' },
    ],
    flashcards: [
      { frente: '¿Por qué la fractura costal compromete la ventilación?', reverso: 'Porque el dolor lleva a respirar de forma superficial y a no toser eficazmente.' },
      { frente: '¿Se venda el tórax en una fractura costal?', reverso: 'No: el vendaje circunferencial limita la expansión y empeora la ventilación.' },
      { frente: '¿Qué añade una fractura de costillas inferiores?', reverso: 'Dirigir la exploración al abdomen superior, donde están hígado y bazo.' },
      { frente: '¿Por qué preocupa la fractura costal en la persona mayor?', reverso: 'Porque ocurre con menos energía y se tolera peor: justifica un umbral de traslado y vigilancia más bajo.' },
      { frente: '¿Qué papel tiene la analgesia aquí?', reverso: 'Permite ventilar y toser; es parte del tratamiento respiratorio, según alcance y protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con dos fracturas costales, dolor intenso y respiración superficial. ¿Cuál es la conducta correcta?',
        opciones: [
          'Vendaje circular del tórax para inmovilizar los arcos.',
          'Posición cómoda, oxígeno y apoyo ventilatorio si lo precisa, analgesia según protocolo y estímulo de la respiración profunda.',
          'Reposo absoluto sin analgesia para valorar la evolución del dolor.',
          'Compresión manual sostenida sobre la zona dolorosa.',
        ],
        correcta: 1,
        explicacion: 'El objetivo es que el paciente pueda ventilar; todo lo que limite la expansión torácica va en contra.',
      },
      {
        pregunta: 'Mujer de 82 años con una fractura costal tras una caída desde su propia altura. ¿Cómo se interpreta?',
        opciones: [
          'Como lesión banal por el mecanismo de baja energía.',
          'Como situación de mayor riesgo: hueso frágil, peor tolerancia y umbral más bajo de traslado y vigilancia.',
          'Como indicación de vendaje torácico.',
          'Como criterio para descartar lesión pulmonar.',
        ],
        correcta: 1,
        explicacion: 'La lección señala expresamente a la persona mayor o frágil como caso aparte.',
      },
      {
        pregunta: 'Encuentras fracturas en las costillas inferiores izquierdas. ¿Qué añade a tu exploración?',
        opciones: [
          'Confirma lesión esplénica.',
          'Dirige la atención al abdomen superior, donde se sitúan hígado y bazo, sin declarar lesión de esos órganos.',
          'Descarta lesión abdominal.',
          'Indica vendaje abdominal.',
        ],
        correcta: 1,
        explicacion: 'La localización orienta la búsqueda; la confirmación es hospitalaria.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El vendaje circunferencial del tórax se retira del temario porque ___ la expansión torácica.',
          opciones: ['favorece', 'limita', 'no modifica'],
          correcta: 1,
          explicacion: 'Empeora exactamente lo que la fractura costal ya compromete: la ventilación.',
        },
        {
          texto: 'La cadena que hace peligrosa la fractura costal es dolor → respiración superficial → peor ventilación de zonas del pulmón → acumulación de ___.',
          opciones: ['aire pleural', 'secreciones', 'sangre en el mediastino'],
          correcta: 1,
          explicacion: 'Esa cadena es la que favorece complicaciones respiratorias en los días siguientes.',
        },
        {
          texto: 'Fracturas de las costillas ___ requieren mucha energía por su protección, lo que eleva la sospecha de lesiones asociadas.',
          opciones: ['inferiores', 'superiores', 'flotantes'],
          correcta: 1,
          explicacion: 'Su posición protegida hace que su fractura sea un marcador de energía elevada.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['CONTROL DE REGRESIÓN: la lección prohíbe expresamente el vendaje circunferencial del tórax, práctica que el temario anterior podía sugerir.'],
    }),
  },

  // ============================================================
  //  4. Tórax inestable o batiente
  // ============================================================
  'm5-tt-torax-inestable': {
    icono: '↕️',
    duracion: '14 min',
    resumen: 'El tórax inestable es un segmento de la pared que ha perdido continuidad con el resto '
      + 'porque varias costillas contiguas están fracturadas en más de un punto. Ese segmento se mueve '
      + 'al revés que el resto del tórax, aunque el movimiento paradójico puede ser sutil o quedar '
      + 'oculto por la contractura muscular. Lo que más deteriora al paciente no es el movimiento en '
      + 'sí, sino la contusión pulmonar que suele acompañarlo. No se inmoviliza con cinta ni con sacos.',
    objetivos: [
      'Definir el segmento inestable y describir el movimiento paradójico.',
      'Explicar el papel de la contusión pulmonar acompañante en el deterioro.',
      'Rechazar la estabilización con cinta o pesos y priorizar la ventilación.',
    ],
    secciones: [
      {
        titulo: 'Qué es y cómo se ve',
        bloques: [
          { tipo: 'p', texto: 'Cuando varias costillas contiguas se fracturan en dos puntos cada una, el fragmento intermedio queda separado funcionalmente del resto de la caja. Deja de seguir el movimiento del conjunto y pasa a responder a la presión dentro del tórax: se hunde cuando el resto se expande y se abomba cuando el resto se retrae. Eso es el movimiento paradójico.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Puede ser difícil de ver', texto: 'La contractura de la musculatura de la pared puede ferulizar el segmento durante las primeras horas y ocultar el movimiento, sobre todo si el paciente respira de forma superficial por el dolor. Un movimiento paradójico ausente no descarta el segmento inestable, y su aparición tardía tampoco es una sorpresa: por eso se reevalúa.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se observa',
            items: [
              'Movimiento asimétrico de la pared torácica, mejor visible desde un lateral y con luz rasante.',
              'Dolor intenso y crepitación en una zona amplia de la pared.',
              'Respiración superficial y rápida, con esfuerzo evidente.',
              'Deterioro de la oxigenación que progresa con el tiempo.',
            ],
          },
        ],
      },
      {
        titulo: 'Lo que empeora al paciente',
        bloques: [
          { tipo: 'p', texto: 'La pared inestable reduce la eficacia de la ventilación, pero la energía necesaria para producir ese segmento también ha golpeado el pulmón que hay debajo. La contusión pulmonar acompañante altera el intercambio de gases y empeora en las horas siguientes, y esa combinación explica buena parte del deterioro que se observa durante el traslado y después.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos problemas superpuestos', texto: 'Pared que no ventila bien y pulmón que no intercambia bien. Tratar solo el dolor sin vigilar la oxigenación deja fuera la mitad del problema; vigilar la oxigenación sin controlar el dolor deja al paciente sin poder ventilar. Ambas cosas se atienden a la vez, dentro del alcance autorizado.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No se estabiliza con cinta, sacos ni pesos', texto: 'Fijar el segmento con esparadrapo ancho, con bolsas de arena o con un peso encima limita la expansión de todo el hemitórax y empeora la ventilación y la oxigenación. Es una práctica que se retira: el objetivo no es inmovilizar la pared, es conseguir que el paciente ventile.' },
          {
            tipo: 'lista',
            titulo: 'Qué sí se hace',
            items: [
              'Oxígeno y vigilancia estrecha de la oxigenación conforme al protocolo.',
              'Apoyo ventilatorio si el trabajo respiratorio aumenta o la oxigenación cae, con el dispositivo y el alcance autorizados.',
              'Analgesia según el alcance y el protocolo, porque el dolor impide ventilar.',
              'Posición cómoda que facilite la ventilación, si no hay contraindicación.',
              'Prudencia con los líquidos, en los términos que fije el protocolo, por la contusión pulmonar acompañante.',
              'Reevaluación frecuente durante el traslado: es donde se detecta el deterioro.',
              'Traslado a centro con capacidad para trauma y prealerta.',
            ],
          },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Tórax inestable', definicion: 'Segmento de la pared torácica que ha perdido continuidad con el resto por fractura de varias costillas contiguas en más de un punto.' },
      { termino: 'Movimiento paradójico', definicion: 'Desplazamiento del segmento inestable en sentido contrario al del resto del tórax durante la respiración.' },
      { termino: 'Ferulización muscular', definicion: 'Contractura de la musculatura de la pared que puede sostener el segmento y ocultar el movimiento paradójico en las primeras horas.' },
    ],
    flashcards: [
      { frente: '¿Qué define al tórax inestable?', reverso: 'Varias costillas contiguas fracturadas en más de un punto, con un segmento que pierde continuidad con el resto de la pared.' },
      { frente: '¿Un movimiento paradójico ausente descarta el segmento inestable?', reverso: 'No: la contractura muscular puede ocultarlo, sobre todo al principio.' },
      { frente: '¿Qué lesión acompañante explica buena parte del deterioro?', reverso: 'La contusión pulmonar subyacente, que empeora en las horas siguientes.' },
      { frente: '¿Se fija el segmento con cinta o con sacos?', reverso: 'No: limita la expansión del hemitórax y empeora ventilación y oxigenación.' },
      { frente: '¿Cómo se observa mejor el movimiento paradójico?', reverso: 'Desde un lateral y con luz rasante sobre la pared torácica.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con múltiples fracturas costales contiguas y una zona de la pared que se hunde en la inspiración. ¿Qué es y qué priorizas?',
        opciones: [
          'Neumotórax a tensión; descompresión inmediata.',
          'Tórax inestable; se prioriza la ventilación y la oxigenación, con analgesia según protocolo y reevaluación frecuente.',
          'Fractura esternal aislada; reposo.',
          'Contusión de pared; alta en el lugar.',
        ],
        correcta: 1,
        explicacion: 'El movimiento paradójico define el segmento inestable, y la conducta se dirige a que el paciente ventile.',
      },
      {
        pregunta: 'Un compañero propone fijar el segmento con esparadrapo ancho y una bolsa de arena. ¿Qué respondes?',
        opciones: [
          'Que es la técnica correcta.',
          'Que no: limita la expansión del hemitórax y empeora la ventilación y la oxigenación.',
          'Que solo debe hacerse en pacientes conscientes.',
          'Que se haga únicamente durante el traslado.',
        ],
        correcta: 1,
        explicacion: 'Estabilizar la pared con pesos o cintas es una práctica retirada por su efecto sobre la ventilación.',
      },
      {
        pregunta: 'El paciente llega con oxigenación aceptable y a los treinta minutos ha empeorado de forma clara. ¿Qué lo explica con más frecuencia?',
        opciones: [
          'Que el segmento inestable se ha reducido.',
          'La contusión pulmonar acompañante, que altera el intercambio y progresa con las horas.',
          'Un error de medición.',
          'La analgesia administrada.',
        ],
        correcta: 1,
        explicacion: 'La energía que produjo el segmento también golpeó el pulmón subyacente, y esa lesión evoluciona.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Sospechas tórax inestable por el mecanismo y por la crepitación amplia, pero no ves movimiento paradójico. ¿Qué haces con esa observación?',
          opciones: [
            'Descartar el segmento inestable: sin movimiento paradójico no existe.',
            'Mantener la sospecha y reevaluar, porque la contractura muscular puede ocultar el movimiento en las primeras horas.',
            'Fijar la pared con cinta hasta que aparezca.',
            'Comunicar el diagnóstico de tórax inestable como confirmado.',
          ],
          correcta: 1,
          explicacion: 'La lección advierte de forma expresa de que el movimiento puede estar ferulizado y aparecer más tarde.',
        },
        {
          pregunta: 'Tienes un paciente con tórax inestable y dolor intenso. Tu protocolo autoriza analgesia. ¿Cómo justificas administrarla, en términos respiratorios?',
          opciones: [
            'Como medida de confort, sin efecto sobre la respiración.',
            'Porque el dolor impide ventilar: controlarlo permite una respiración más eficaz, y forma parte del manejo respiratorio junto con la oxigenación.',
            'Porque sustituye al apoyo ventilatorio.',
            'Porque reduce la contusión pulmonar.',
          ],
          correcta: 1,
          explicacion: 'La lección presenta dolor y oxigenación como dos problemas superpuestos que se atienden a la vez, dentro del alcance autorizado.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['CONTROL DE REGRESIÓN: prohibición expresa de estabilizar el segmento con cinta, sacos o pesos.'],
    }),
  },

  // ============================================================
  //  5. Neumotórax simple
  // ============================================================
  'm5-tt-neumotorax-simple': {
    icono: '🫧',
    duracion: '13 min',
    resumen: 'En el neumotórax simple entra aire al espacio pleural sin comunicación abierta con el '
      + 'exterior y sin mecanismo de válvula: el pulmón pierde parte de su expansión, pero la presión '
      + 'no se acumula de forma progresiva. Cursa con dolor, disnea y posible disminución unilateral de '
      + 'los ruidos respiratorios, aunque los hallazgos rara vez están completos. Lo que exige es '
      + 'vigilancia, porque puede progresar; el neumotórax simple no se descomprime.',
    objetivos: [
      'Definir el neumotórax simple y diferenciarlo del abierto y del que está a tensión.',
      'Reconocer sus hallazgos y asumir que pueden ser incompletos.',
      'Justificar por qué no se descomprime y qué exige la vigilancia.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'Entre el pulmón y la pared hay un espacio virtual con presión negativa que mantiene el pulmón expandido. Si entra aire en ese espacio —por una costilla que perfora la pleura, por un desgarro del propio pulmón o por una herida que ya se ha cerrado—, el pulmón se retrae y pierde parte de su superficie útil.' },
          {
            tipo: 'tabla',
            titulo: 'Tres situaciones distintas',
            headers: ['', 'Simple', 'Abierto', 'A tensión'],
            filas: [
              ['Comunicación con el exterior', 'No', 'Sí, por la herida de la pared', 'Puede o no existir'],
              ['Acumulación progresiva de presión', 'No', 'No necesariamente', 'Sí, por mecanismo de válvula'],
              ['Compromiso circulatorio', 'No característico', 'Variable', 'Sí: obstrucción del retorno venoso'],
              ['Conducta prehospitalaria', 'Vigilancia, oxígeno y traslado según protocolo', 'Manejo de la herida y vigilancia', 'Descompresión según protocolo, sin esperar imagen'],
            ],
          },
        ],
      },
      {
        titulo: 'Hallazgos y sus límites',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que puede encontrarse',
            items: [
              'Dolor torácico, con frecuencia de tipo punzante y que aumenta con la inspiración.',
              'Disnea de intensidad variable, a veces mínima.',
              'Disminución de los ruidos respiratorios en el hemitórax afectado.',
              'Hipertimpanismo a la percusión, difícil de valorar en un entorno ruidoso.',
              'Taquipnea y ansiedad.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los hallazgos rara vez están completos', texto: 'Un neumotórax pequeño puede cursar con ruidos respiratorios aparentemente normales, y la auscultación en una ambulancia en movimiento o en una vía pública ruidosa es poco fiable. La ausencia del cuadro completo no descarta el neumotórax: la sospecha se sostiene por mecanismo y por la evolución del paciente.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Puede progresar', texto: 'Un neumotórax simple puede aumentar de tamaño y, si se establece un mecanismo de válvula, evolucionar a un neumotórax a tensión. El riesgo aumenta cuando se ventila con presión positiva. Por eso la conducta principal es la vigilancia repetida y la reevaluación de la respiración y de la circulación durante todo el traslado.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Oxígeno conforme al protocolo del servicio.',
              'Posición cómoda que facilite la ventilación, si no hay contraindicación.',
              'Vigilancia respiratoria y circulatoria repetida, con registro de la hora.',
              'Atención especial si se ventila con presión positiva, porque puede favorecer la progresión.',
              'Traslado con comunicación del mecanismo y de la sospecha; el diagnóstico y el tratamiento definitivo son hospitalarios.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El neumotórax simple no se descomprime', texto: 'La descompresión torácica está reservada al cuadro clínico de neumotórax a tensión, en los términos que fije el protocolo del servicio. Puncionar un neumotórax simple no aporta beneficio y añade el riesgo de un procedimiento invasivo innecesario. Lo que se hace es vigilar y trasladar.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Neumotórax simple', definicion: 'Presencia de aire en el espacio pleural sin comunicación abierta con el exterior ni acumulación progresiva de presión.' },
      { termino: 'Espacio pleural', definicion: 'Espacio virtual entre pulmón y pared torácica, con presión negativa que mantiene el pulmón expandido.' },
      { termino: 'Hipertimpanismo', definicion: 'Sonido resonante a la percusión que sugiere aire; difícil de valorar en entornos ruidosos.' },
    ],
    flashcards: [
      { frente: '¿Qué diferencia el neumotórax simple del que está a tensión?', reverso: 'El simple no acumula presión de forma progresiva ni produce compromiso circulatorio característico.' },
      { frente: '¿Los ruidos respiratorios normales descartan un neumotórax?', reverso: 'No: uno pequeño puede cursar con ruidos aparentemente normales, y la auscultación en la calle es poco fiable.' },
      { frente: '¿Se descomprime un neumotórax simple?', reverso: 'No: la descompresión se reserva al cuadro de neumotórax a tensión, según protocolo.' },
      { frente: '¿Qué situación favorece que un neumotórax simple progrese?', reverso: 'La ventilación con presión positiva.' },
      { frente: 'Conducta prehospitalaria del neumotórax simple', reverso: 'Oxígeno según protocolo, posición cómoda, vigilancia repetida y traslado.' },
    ],
    quiz: [
      {
        pregunta: 'Trauma torácico cerrado con dolor punzante y disnea leve, ruidos ligeramente disminuidos en un hemitórax, presión y pulso normales. ¿Cuál es la conducta?',
        opciones: [
          'Descompresión con aguja inmediata.',
          'Oxígeno según protocolo, posición cómoda, vigilancia repetida y traslado, sin descomprimir.',
          'Vendaje compresivo del hemitórax.',
          'Alta en el lugar si el dolor mejora.',
        ],
        correcta: 1,
        explicacion: 'Sin compromiso circulatorio ni cuadro de tensión, la conducta es vigilar y trasladar.',
      },
      {
        pregunta: 'El paciente con sospecha de neumotórax simple necesita ventilación con presión positiva. ¿Qué precaución añade eso?',
        opciones: [
          'Ninguna: la ventilación no influye.',
          'Vigilar estrechamente, porque la presión positiva puede favorecer la progresión hacia un neumotórax a tensión.',
          'Descomprimir de forma preventiva.',
          'Suspender el oxígeno.',
        ],
        correcta: 1,
        explicacion: 'La presión positiva es el factor que la lección señala como favorecedor de la progresión.',
      },
      {
        pregunta: 'Auscultas en una vía pública ruidosa y no aprecias diferencias entre ambos hemitórax. ¿Qué concluyes?',
        opciones: [
          'Que se descarta el neumotórax.',
          'Que la auscultación en ese entorno es poco fiable: la sospecha se mantiene por mecanismo y por la evolución del paciente.',
          'Que hay que descomprimir por precaución.',
          'Que el paciente no necesita traslado.',
        ],
        correcta: 1,
        explicacion: 'La lección advierte expresamente de las limitaciones de la auscultación en la escena.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El neumotórax simple se diferencia del abierto en que no existe ___ con el exterior.',
          opciones: ['dolor', 'comunicación', 'aire pleural'],
          correcta: 1,
          explicacion: 'En el abierto la pared está atravesada y el aire entra y sale por la herida.',
        },
        {
          texto: 'La descompresión torácica se reserva al cuadro clínico de neumotórax ___, según protocolo.',
          opciones: ['simple', 'a tensión', 'abierto'],
          correcta: 1,
          explicacion: 'Puncionar un neumotórax simple no aporta beneficio y añade riesgo.',
        },
        {
          texto: 'Ante un neumotórax simple, la medida principal del ámbito prehospitalario es ___.',
          opciones: [
            'la punción torácica precoz',
            'la vigilancia repetida con oxígeno y traslado',
            'el vendaje compresivo del hemitórax',
          ],
          correcta: 1,
          explicacion: 'El tratamiento definitivo es hospitalario; lo que aporta la escena es vigilancia y traslado seguro.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La lección declara expresamente que el neumotórax simple NO se descomprime, y remite la descompresión al cuadro de tensión y al protocolo.'],
    }),
  },

  // ============================================================
  //  6. Neumotórax abierto
  // ============================================================
  'm5-tt-neumotorax-abierto': {
    icono: '🌬️',
    duracion: '16 min',
    resumen: 'En el neumotórax abierto una herida comunica el espacio pleural con el exterior y el aire '
      + 'entra por la pared en lugar de por la vía aérea. La conducta ha cambiado: la guía de primeros '
      + 'auxilios AHA/Cruz Roja Americana de 2024 considera razonable dejar la herida expuesta, usar un '
      + 'apósito limpio y seco no oclusivo, o un sello torácico ventilado si se dispone de él, y '
      + 'aflojar o retirar cualquier apósito que empeore la respiración. El apósito de tres lados deja '
      + 'de enseñarse como regla universal.',
    objetivos: [
      'Explicar por qué una herida torácica abierta compromete la ventilación.',
      'Aplicar la conducta actualizada sobre el manejo de la herida y su vigilancia.',
      'Distinguir la práctica histórica de la recomendación vigente.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'La respiración funciona porque la caja torácica genera una presión negativa que arrastra aire por la vía aérea. Si la pared tiene una comunicación abierta con el espacio pleural, parte de ese aire entra por la herida: el pulmón de ese lado pierde expansión y la ventilación se vuelve ineficaz. En algunas heridas se oye el paso del aire, y de ahí el nombre tradicional de «herida torácica aspirante».' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Puede evolucionar a tensión', texto: 'Si el aire encuentra un camino de entrada y no de salida —porque la herida se ocluye, porque un apósito la sella o porque hay lesión pulmonar asociada—, la presión puede acumularse y aparecer el cuadro de neumotórax a tensión. Ese riesgo es precisamente el que gobierna la conducta actual sobre los apósitos.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se encuentra',
            items: [
              'Herida en la pared torácica, de cualquier tamaño.',
              'Paso audible de aire por la herida en algunos casos, o burbujeo con la sangre.',
              'Disnea y taquipnea.',
              'Disminución de los ruidos respiratorios en ese hemitórax.',
              'Signos de shock si se acompaña de hemorragia.',
              'Deterioro respiratorio que puede aparecer o agravarse tras colocar un apósito.',
            ],
          },
        ],
      },
      {
        titulo: 'Conducta actualizada',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que recomienda la guía vigente', texto: 'Según la guía AHA/Cruz Roja Americana de Primeros Auxilios 2024, ante una herida torácica abierta es razonable dejar la herida expuesta, o cubrirla con un apósito limpio y seco NO oclusivo, o utilizar un sello torácico ventilado si se dispone de él y está autorizado. Si tras colocar cualquier apósito o sello la respiración empeora, se afloja o se retira. Lo prioritario es activar la respuesta y trasladar sin demora.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia práctica',
            items: [
              'Seguridad de la escena y protección personal.',
              'Exponer el tórax y buscar heridas en toda la superficie, incluida la espalda y las axilas.',
              'Manejar la herida conforme a lo anterior: expuesta, apósito limpio seco no oclusivo o sello ventilado según disponibilidad y protocolo.',
              'Controlar la hemorragia asociada con los medios adecuados, sin empaquetar el tórax.',
              'Oxígeno y apoyo ventilatorio conforme al alcance y al protocolo.',
              'Reevaluar de forma inmediata y repetida: si la respiración empeora tras el apósito, aflojarlo o retirarlo.',
              'Trasladar con prealerta; el tratamiento definitivo es hospitalario.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que ya no se enseña como regla universal', texto: 'El apósito oclusivo fijado por tres lados fue durante años la conducta estándar y aparece así en bibliografía histórica. Se explica aquí como antecedente para que el alumno lo reconozca, pero NO se enseña como regla universal actual: sellar la herida puede favorecer la acumulación de presión, y la guía vigente prioriza no ocluir y vigilar la respuesta. Si el protocolo de un servicio mantiene una conducta concreta, se aplica citándola como protocolo local.' },
        ],
      },
      {
        titulo: 'Errores frecuentes',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Sellar la herida por completo y no volver a mirarla: el deterioro tras el apósito es precisamente lo que hay que buscar.',
              'Empaquetar la herida torácica con gasa, algo que no se hace en el tórax.',
              'Buscar solo la herida evidente y no explorar la espalda ni las axilas.',
              'Retrasar el traslado para perfeccionar el apósito.',
              'Considerar resuelto el problema porque la herida esté cubierta.',
            ],
          },
        ],
      },
      F([AHA_PRIMEROS_AUXILIOS_2024, PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Neumotórax abierto', definicion: 'Comunicación entre el espacio pleural y el exterior a través de una herida de la pared torácica, con entrada de aire por ella.' },
      { termino: 'Herida torácica aspirante', definicion: 'Denominación tradicional de la herida por la que se oye entrar aire hacia el espacio pleural.' },
      { termino: 'Apósito no oclusivo', definicion: 'Apósito limpio y seco que cubre la herida sin sellarla, de modo que no favorece la acumulación de presión.' },
      { termino: 'Sello torácico ventilado', definicion: 'Dispositivo comercial que cubre la herida permitiendo la salida de aire; su disponibilidad y uso dependen del equipo y del protocolo.' },
    ],
    flashcards: [
      { frente: '¿Por qué una herida torácica abierta compromete la ventilación?', reverso: 'Porque el aire entra por la pared en vez de por la vía aérea y el pulmón de ese lado pierde expansión.' },
      { frente: '¿Qué recomienda la guía AHA/ARC 2024 ante una herida torácica abierta?', reverso: 'Dejarla expuesta, o apósito limpio y seco no oclusivo, o sello ventilado si se dispone; y aflojar o retirar si la respiración empeora.' },
      { frente: '¿Se enseña el apósito de tres lados como regla universal?', reverso: 'No: se explica como antecedente histórico, no como conducta universal actual.' },
      { frente: '¿Qué hay que buscar justo después de colocar un apósito?', reverso: 'Si la respiración empeora: en ese caso se afloja o se retira.' },
      { frente: '¿Se empaqueta una herida torácica?', reverso: 'No: el tórax no se empaqueta.' },
    ],
    quiz: [
      {
        pregunta: 'Herida penetrante en la pared torácica por la que se oye entrar aire. ¿Qué conducta corresponde según la guía vigente?',
        opciones: [
          'Sellar la herida con apósito oclusivo fijado por tres lados en todos los casos.',
          'Dejarla expuesta, o cubrirla con apósito limpio y seco no oclusivo, o usar sello ventilado si se dispone; oxígeno según protocolo y traslado, vigilando la respuesta.',
          'Empaquetar la herida con gasa hemostática.',
          'Cerrarla herméticamente con material impermeable y fijarla por los cuatro lados.',
        ],
        correcta: 1,
        explicacion: 'Es la conducta que recoge la guía AHA/Cruz Roja Americana de Primeros Auxilios 2024, que prioriza no ocluir y vigilar.',
      },
      {
        pregunta: 'Colocaste un apósito sobre la herida y el paciente respira peor que antes. ¿Qué haces?',
        opciones: [
          'Refuerzas la fijación del apósito.',
          'Aflojas o retiras el apósito y reevalúas de inmediato.',
          'Añades un segundo apósito encima.',
          'Aumentas el oxígeno y mantienes el apósito sellado.',
        ],
        correcta: 1,
        explicacion: 'El empeoramiento tras el apósito es exactamente la situación en que la guía indica aflojarlo o retirarlo.',
      },
      {
        pregunta: '¿Por qué el sellado completo de la herida puede ser perjudicial?',
        opciones: [
          'Porque impide valorar el tamaño de la herida.',
          'Porque el aire puede entrar sin poder salir y favorecer la acumulación de presión en el espacio pleural.',
          'Porque aumenta el sangrado externo.',
          'Porque impide administrar oxígeno.',
        ],
        correcta: 1,
        explicacion: 'Ese riesgo es el fundamento del cambio de conducta respecto a la práctica histórica.',
      },
      {
        pregunta: 'Encuentras una herida torácica anterior evidente. ¿Qué más corresponde hacer antes de dar por completada la exploración?',
        opciones: [
          'Nada más: la herida está identificada.',
          'Explorar el resto de la superficie torácica, incluidas espalda y axilas, porque puede haber más de una herida.',
          'Radiografiar el tórax en la escena.',
          'Sondar la herida para medir su profundidad.',
        ],
        correcta: 1,
        explicacion: 'Buscar solo la herida evidente es uno de los errores frecuentes que la lección enumera.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Tu unidad no dispone de sello torácico ventilado y tienes un paciente con herida torácica abierta y respiración eficaz. ¿Qué haces con la herida según lo enseñado?',
          opciones: [
            'Sellarla con plástico y esparadrapo por tres lados, que es la técnica clásica.',
            'Dejarla expuesta o cubrirla con un apósito limpio y seco no oclusivo, sin sellarla, y reevaluar la respiración de forma repetida.',
            'Empaquetarla con gasa hasta el fondo.',
            'Cubrirla herméticamente y no volver a manipularla durante el traslado.',
          ],
          correcta: 1,
          explicacion: 'La guía vigente contempla precisamente esas dos opciones cuando no se dispone de sello ventilado, y exige vigilar la respuesta.',
        },
        {
          pregunta: 'Un alumno afirma que «lo correcto de toda la vida es el apósito de tres lados». ¿Cómo lo corriges con lo que enseña esta lección?',
          opciones: [
            'Confirmando que sigue siendo la regla universal.',
            'Explicando que fue la conducta estándar durante años y se conserva como antecedente, pero que la guía vigente prioriza no ocluir, contempla dejar expuesta o usar apósito no oclusivo o sello ventilado, y exige aflojar o retirar si la respiración empeora.',
            'Diciendo que las heridas torácicas no requieren ninguna conducta.',
            'Indicando que se empaquete la herida en su lugar.',
          ],
          correcta: 1,
          explicacion: 'La lección distingue expresamente la práctica histórica de la recomendación vigente sin borrar la primera.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'ACTUALIZACIÓN CLÍNICA REGISTRADA: se aplica la guía AHA/Cruz Roja Americana de Primeros Auxilios 2024 sobre herida torácica abierta. El apósito oclusivo de tres lados NO se enseña como regla universal actual; se conserva identificado como antecedente histórico.',
        'Si el protocolo del servicio mantiene una conducta concreta, se aplica citándola como protocolo local; la lección no la sustituye.',
      ],
    }),
  },

  // ============================================================
  //  7. Hemotórax
  // ============================================================
  'm5-tt-hemotorax': {
    icono: '🩸',
    duracion: '14 min',
    resumen: 'El hemotórax es sangre acumulada en el espacio pleural, y produce dos problemas a la vez: '
      + 'ocupa el espacio del pulmón y resta volumen circulante. Por eso puede presentarse como '
      + 'insuficiencia respiratoria, como shock hemorrágico o como ambas cosas. Los hallazgos clásicos '
      + '—ruidos disminuidos y matidez a la percusión— pueden faltar o ser difíciles de apreciar en la '
      + 'escena. El ámbito prehospitalario sospecha, sostiene y traslada; no confirma ni trata de forma '
      + 'definitiva.',
    objetivos: [
      'Explicar el doble efecto ventilatorio y hemorrágico del hemotórax.',
      'Reconocer sus hallazgos y asumir sus limitaciones en la escena.',
      'Delimitar la aportación prehospitalaria frente al tratamiento definitivo.',
    ],
    secciones: [
      {
        titulo: 'Dos problemas en uno',
        bloques: [
          { tipo: 'p', texto: 'La sangre puede proceder de los vasos de la pared torácica, del propio pulmón o de estructuras mayores del mediastino. Al acumularse en el espacio pleural comprime el pulmón de ese lado y reduce la superficie disponible para el intercambio de gases. Al mismo tiempo, esa sangre ha salido del sistema circulatorio: el paciente pierde volumen sin que se vea nada por fuera.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Un reservorio de hemorragia oculta', texto: 'El tórax es uno de los sitios donde se acumula una hemorragia importante sin manifestación externa. Ante un paciente traumatizado en shock sin sangrado visible, el tórax se explora precisamente por esta razón, junto con abdomen, pelvis y huesos largos.' },
        ],
      },
      {
        titulo: 'Hallazgos, y por qué pueden faltar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que puede encontrarse',
            items: [
              'Disnea y taquipnea.',
              'Disminución o ausencia de ruidos respiratorios en el hemitórax afectado.',
              'Matidez a la percusión en las zonas declives, por el líquido acumulado.',
              'Signos de shock: alteración del estado mental, piel fría, taquicardia y, más tarde, hipotensión.',
              'Dolor torácico y, en el trauma penetrante, herida en la pared.',
              'Yugulares planas si predomina la pérdida de volumen.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los signos clásicos son poco fiables en la calle', texto: 'La percusión es difícil de interpretar con ruido ambiental, con el paciente vestido o en una camilla en movimiento, y una acumulación moderada puede no alterar de forma clara los ruidos respiratorios. Que la matidez o la asimetría no se aprecien no descarta el hemotórax; la sospecha se apoya en el mecanismo, en la región comprometida y en la respuesta fisiológica.' },
        ],
      },
      {
        titulo: 'Qué corresponde al ámbito prehospitalario',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Conducta general',
            items: [
              'Oxígeno y apoyo ventilatorio conforme al alcance y al protocolo.',
              'Tratamiento del shock según protocolo: accesos, fluidos o hemoderivados cuando estén autorizados y disponibles.',
              'Prevención activa de la hipotermia, que en un sangrado no compresible tiene efecto directo sobre la coagulación.',
              'Manejo de la herida de la pared si el trauma es penetrante, sin empaquetar el tórax.',
              'Traslado sin demoras evitables y prealerta explícita al centro receptor.',
              'Reevaluación repetida y documentada: el cuadro puede evolucionar en minutos.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que NO se hace en la escena', texto: 'El hemotórax no se drena en la calle: el tratamiento definitivo es el drenaje torácico y, si el sangrado es importante, la cirugía. La confirmación es por imagen hospitalaria. Puncionar el tórax buscando sangre no forma parte de la conducta prehospitalaria de este cuadro.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cuando conviven aire y sangre', texto: 'Si en el mismo hemitórax hay aire y sangre, el cuadro se aborda como hemoneumotórax, tema propio de esta unidad. La percusión puede ser timpánica en los campos superiores y mate en los inferiores, y el manejo prioriza el componente que domine la situación del paciente.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Hemotórax', definicion: 'Acumulación de sangre en el espacio pleural, con compromiso ventilatorio y pérdida de volumen circulante.' },
      { termino: 'Matidez a la percusión', definicion: 'Sonido apagado que sugiere líquido; en trauma torácico orienta a sangre acumulada.' },
      { termino: 'Hemorragia no compresible', definicion: 'Sangrado que no puede controlarse con presión externa; en el tórax exige control hospitalario.' },
    ],
    flashcards: [
      { frente: '¿Qué dos problemas produce el hemotórax?', reverso: 'Compromiso ventilatorio por ocupación del espacio pleural y pérdida de volumen circulante.' },
      { frente: '¿Qué sugiere la matidez en las zonas declives del tórax?', reverso: 'Líquido acumulado; en trauma, sangre.' },
      { frente: '¿La ausencia de matidez descarta el hemotórax?', reverso: 'No: la percusión es poco fiable en la escena y la acumulación moderada puede no alterar los hallazgos.' },
      { frente: '¿Cuál es el tratamiento definitivo del hemotórax?', reverso: 'El drenaje torácico y, si el sangrado es importante, la cirugía; ambos hospitalarios.' },
      { frente: '¿Por qué se busca el tórax ante un shock sin sangrado visible?', reverso: 'Porque es uno de los reservorios de hemorragia oculta, junto con abdomen, pelvis y huesos largos.' },
    ],
    quiz: [
      {
        pregunta: 'Trauma torácico cerrado, ruidos disminuidos en un hemitórax, piel fría, taquicardia y presión en descenso. ¿Qué priorizas?',
        opciones: [
          'Descompresión con aguja de ese hemitórax.',
          'Sospechar hemotórax con shock, tratar según protocolo, prevenir la hipotermia y trasladar sin demora con prealerta.',
          'Vendaje compresivo del tórax.',
          'Esperar a la radiografía antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'El cuadro combina compromiso ventilatorio y pérdida de volumen; el tratamiento definitivo es hospitalario y lo que cuenta es acortar el tiempo.',
      },
      {
        pregunta: 'No consigues valorar la percusión por el ruido de la vía pública. ¿Cómo procedes?',
        opciones: [
          'Descartas hemotórax por no encontrar matidez.',
          'Mantienes la sospecha apoyándote en el mecanismo, la región comprometida y la respuesta fisiológica, y reevalúas.',
          'Repites la percusión hasta obtener un resultado.',
          'Trasladas sin comunicar la sospecha.',
        ],
        correcta: 1,
        explicacion: 'La lección advierte de la baja fiabilidad de los signos clásicos en la escena.',
      },
      {
        pregunta: '¿Por qué la prevención de la hipotermia tiene especial peso en el hemotórax?',
        opciones: [
          'Porque mejora la percusión.',
          'Porque se trata de un sangrado que no se puede comprimir, y el paciente frío coagula peor.',
          'Porque reduce la disnea.',
          'Porque sustituye a la reposición de volumen.',
        ],
        correcta: 1,
        explicacion: 'La coagulación es una de las pocas defensas que le quedan a un sangrado no compresible.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El hemotórax compromete la ventilación porque la sangre ___ el espacio que necesita el pulmón.',
          opciones: ['calienta', 'ocupa', 'oxigena'],
          correcta: 1,
          explicacion: 'A esa ocupación se suma la pérdida de volumen circulante.',
        },
        {
          texto: 'En el hemitórax con aire y sangre a la vez, la percusión puede ser timpánica en los campos superiores y ___ en los inferiores.',
          opciones: ['timpánica', 'mate', 'ausente'],
          correcta: 1,
          explicacion: 'El aire se acumula arriba y la sangre abajo; ese cuadro es el hemoneumotórax.',
        },
        {
          texto: 'El drenaje del hemotórax ___ una conducta prehospitalaria.',
          opciones: ['es', 'no es', 'es siempre'],
          correcta: 1,
          explicacion: 'El drenaje torácico y la cirugía son hospitalarios; en la escena se sospecha, se sostiene y se traslada.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La lección remite al tema ya redactado de hemoneumotórax para el cuadro combinado, sin duplicar su contenido.'],
    }),
  },

  // ============================================================
  //  8. Trauma traqueobronquial
  // ============================================================
  'm5-tt-traqueo-bronquial': {
    icono: '🌲',
    duracion: '12 min',
    resumen: 'La lesión del árbol traqueobronquial intratorácico es rara y grave: hay una fuga de aire '
      + 'desde una vía aérea grande hacia el mediastino o hacia el espacio pleural. Se sospecha por '
      + 'enfisema subcutáneo extenso, hemoptisis y dificultad respiratoria en un mecanismo de alta '
      + 'energía o penetrante, y sobre todo por una fuga aérea que persiste. El diagnóstico es '
      + 'hospitalario; el manejo prehospitalario es de soporte, vigilancia y traslado con prealerta.',
    objetivos: [
      'Reconocer los signos que hacen sospechar una lesión traqueobronquial.',
      'Explicar el significado de una fuga aérea persistente.',
      'Delimitar el manejo prehospitalario de soporte frente al diagnóstico hospitalario.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre y cuándo sospecharlo',
        bloques: [
          { tipo: 'p', texto: 'Cuando se desgarra la tráquea intratorácica o un bronquio principal, el aire que debería circular por la vía aérea escapa hacia los tejidos vecinos. Ese aire se difunde por el mediastino y por el tejido subcutáneo, y puede pasar al espacio pleural. El mecanismo suele ser una desaceleración o una compresión torácica importantes, o un trauma penetrante.' },
          {
            tipo: 'lista',
            titulo: 'Signos que deben alertar',
            items: [
              'Enfisema subcutáneo extenso y que progresa: cuello, cara, tórax e incluso más allá.',
              'Hemoptisis.',
              'Dificultad respiratoria que no mejora con las medidas habituales.',
              'Disnea con ruidos respiratorios disminuidos en un hemitórax.',
              'Dolor torácico o cervical y, a veces, cambio de la voz.',
              'Mecanismo de alta energía o herida penetrante torácica o cervical baja.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La fuga que no cede', texto: 'El dato más característico es una fuga de aire que persiste: un paciente al que se ha tratado un neumotórax y que sigue con enfisema en aumento o sin mejoría respiratoria. En el ámbito prehospitalario ese comportamiento se traduce en una advertencia concreta que se comunica al centro receptor, no en un diagnóstico.' },
        ],
      },
      {
        titulo: 'Conducta prehospitalaria',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Oxígeno y apoyo ventilatorio conforme al alcance autorizado y al protocolo.',
              'Precaución con la ventilación a presión positiva: puede aumentar la fuga aérea. No significa negar la ventilación a quien la necesita, sino aplicarla vigilando la respuesta.',
              'Vigilar el enfisema subcutáneo: extensión, progresión y hora de cada observación.',
              'Reevaluar la respiración y la circulación de forma repetida, porque el cuadro puede deteriorarse.',
              'Traslado a centro con capacidad quirúrgica y prealerta con la sospecha explícita.',
              'Documentar el mecanismo con precisión: es lo que orienta la búsqueda posterior.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El diagnóstico no se hace en la calle', texto: 'La confirmación requiere estudios y exploración instrumental hospitalarios. Lo que aporta el ámbito prehospitalario es sospechar ante el patrón, sostener la oxigenación, evitar empeorar la fuga y avisar antes de llegar. La instrumentación avanzada de la vía aérea en este contexto depende de la competencia del prestador y de la dirección médica.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Lesión traqueobronquial', definicion: 'Desgarro de la tráquea intratorácica o de un bronquio principal, con fuga de aire hacia mediastino y espacio pleural.' },
      { termino: 'Fuga aérea persistente', definicion: 'Escape continuo de aire que no cede con las medidas habituales; comportamiento que hace sospechar lesión de una vía aérea grande.' },
      { termino: 'Enfisema subcutáneo extenso', definicion: 'Acumulación amplia y progresiva de aire bajo la piel de cuello, cara y tórax.' },
    ],
    flashcards: [
      { frente: 'Tres signos de sospecha de lesión traqueobronquial', reverso: 'Enfisema subcutáneo extenso y progresivo, hemoptisis y dificultad respiratoria que no mejora.' },
      { frente: '¿Cuál es el comportamiento más característico?', reverso: 'Una fuga de aire que persiste pese a las medidas habituales.' },
      { frente: '¿Qué precaución exige la ventilación a presión positiva aquí?', reverso: 'Puede aumentar la fuga: se aplica a quien la necesita, vigilando la respuesta.' },
      { frente: '¿Dónde se confirma el diagnóstico?', reverso: 'En el hospital, con estudios y exploración instrumental.' },
      { frente: '¿Qué se documenta especialmente en la escena?', reverso: 'El mecanismo con precisión y la extensión y progresión del enfisema con su hora.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con desaceleración de alta energía, enfisema subcutáneo que se extiende del cuello al tórax y hemoptisis. ¿Qué haces?',
        opciones: [
          'Diagnosticas rotura bronquial y lo comunicas como tal.',
          'Sospechas lesión traqueobronquial, aplicas soporte según protocolo, vigilas la progresión del enfisema y trasladas con prealerta.',
          'Aplicas un vendaje compresivo cervical.',
          'Descartas lesión torácica por ausencia de heridas.',
        ],
        correcta: 1,
        explicacion: 'El patrón sostiene una sospecha que se comunica; el diagnóstico es hospitalario.',
      },
      {
        pregunta: '¿Qué significa que la fuga aérea persista pese a las medidas habituales?',
        opciones: [
          'Que el paciente está mejorando.',
          'Que puede haber una lesión de una vía aérea grande, y es una advertencia concreta para el centro receptor.',
          'Que hay que retirar el oxígeno.',
          'Que el enfisema se reabsorberá solo.',
        ],
        correcta: 1,
        explicacion: 'Es el comportamiento más característico de esta lesión en el ámbito prehospitalario.',
      },
      {
        pregunta: 'El paciente necesita ventilación con presión positiva. ¿Cómo procedes?',
        opciones: [
          'No se ventila en ningún caso.',
          'Se ventila con precaución y vigilando la respuesta, porque la presión positiva puede aumentar la fuga aérea.',
          'Se ventila con la máxima presión disponible.',
          'Se sustituye por oxígeno a bajo flujo únicamente.',
        ],
        correcta: 1,
        explicacion: 'No se le niega la ventilación que necesita, pero se aplica vigilando si el cuadro empeora.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En la lesión traqueobronquial, el aire escapa desde la vía aérea hacia el mediastino y el ___.',
          opciones: ['pericardio', 'espacio pleural', 'peritoneo'],
          correcta: 1,
          explicacion: 'De ahí el enfisema subcutáneo extenso y la posible afectación pleural.',
        },
        {
          texto: 'El enfisema subcutáneo que ___ es un dato que debe registrarse con su hora y comunicarse.',
          opciones: ['permanece igual', 'progresa', 'desaparece'],
          correcta: 1,
          explicacion: 'La progresión indica que la fuga continúa.',
        },
        {
          texto: 'La aportación del ámbito prehospitalario en esta lesión es sospechar, sostener la oxigenación, evitar empeorar la fuga y ___.',
          opciones: [
            'confirmar el diagnóstico',
            'prealertar al centro receptor documentando el mecanismo',
            'realizar exploración instrumental de la vía aérea',
          ],
          correcta: 1,
          explicacion: 'La confirmación y la instrumentación no corresponden a la escena.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La lección no describe ni autoriza instrumentación avanzada de la vía aérea; la remite a competencia y dirección médica.'],
    }),
  },

  // ============================================================
  //  9. Desgarro o disrupción aórtica
  // ============================================================
  'm5-tt-disrupcion-aortica': {
    icono: '⚡',
    duracion: '13 min',
    resumen: 'La disrupción traumática de la aorta se asocia a desaceleraciones de alta energía: la '
      + 'aorta tiene porciones fijas y porciones móviles, y el cizallamiento se concentra en la '
      + 'transición. Los pacientes que llegan vivos suelen tener el sangrado contenido por estructuras '
      + 'vecinas, y por eso pueden presentarse sin un cuadro llamativo. Ningún signo prehospitalario la '
      + 'confirma ni la descarta: el mecanismo eleva la sospecha y la prioridad de destino, y la imagen '
      + 'la diagnostica.',
    objetivos: [
      'Relacionar el mecanismo de desaceleración con el riesgo de disrupción aórtica.',
      'Reconocer los hallazgos posibles y aceptar que pueden faltar.',
      'Traducir la sospecha en prioridad de traslado y prealerta, no en diagnóstico.',
    ],
    secciones: [
      {
        titulo: 'Por qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'La aorta no está suelta dentro del tórax: hay zonas ancladas a estructuras vecinas y zonas relativamente móviles. En una desaceleración brusca, las porciones móviles siguen desplazándose mientras las fijas ya se han detenido, y en la transición entre unas y otras aparece cizallamiento. Si la pared cede en ese punto, se produce el desgarro.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Los que llegan vivos', texto: 'Cuando la rotura es completa, el desenlace suele producirse antes de la llegada del equipo. Los pacientes que llegan vivos son, con frecuencia, aquellos en los que el sangrado ha quedado contenido de forma precaria por estructuras vecinas. Esa contención puede fallar en cualquier momento, y por eso el traslado tiene prioridad aunque el paciente parezca estable.' },
          {
            tipo: 'lista',
            titulo: 'Mecanismos que elevan la sospecha',
            items: [
              'Colisión frontal o lateral de alta energía.',
              'Caída desde altura importante.',
              'Atropello por vehículo a velocidad elevada.',
              'Vuelco o eyección.',
              'Cualquier desaceleración brusca de magnitud comparable.',
            ],
          },
        ],
      },
      {
        titulo: 'Hallazgos: pocos, tardíos y poco específicos',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que puede aparecer, o no',
            items: [
              'Dolor torácico o interescapular, que se describe como intenso y de aparición brusca.',
              'Diferencias de pulso o de presión entre extremidades.',
              'Disnea, disfagia o ronquera por compresión de estructuras vecinas.',
              'Signos externos de impacto torácico, que pueden faltar por completo.',
              'Shock, en general tardío y de mal pronóstico.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ausencia de estos hallazgos no descarta nada', texto: 'Un paciente puede tener una disrupción aórtica contenida con exploración prácticamente normal y sin diferencias de pulsos. Ni la ausencia de signos permite descartarla, ni su presencia permite afirmarla: son datos que se documentan y se comunican, no criterios diagnósticos de campo.' },
        ],
      },
      {
        titulo: 'Qué se hace con la sospecha',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Traducirla en prioridad: traslado a un centro con capacidad para trauma, conforme a la guía de triaje adoptada y al protocolo del servicio.',
              'Prealerta explícita con el mecanismo descrito: es lo que permite preparar la imagen y el equipo antes de la llegada.',
              'Movilización cuidadosa y evitación de maniobras bruscas innecesarias.',
              'Oxígeno, accesos y manejo de la presión conforme al alcance autorizado y al protocolo, sin fijar cifras en esta lección.',
              'Analgesia según protocolo.',
              'Reevaluación repetida y documentada, incluida la comparación de pulsos entre extremidades cuando sea posible.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La imagen es la que diagnostica', texto: 'La confirmación se realiza con estudios de imagen en el hospital, y el tratamiento es quirúrgico o endovascular. Todo lo que se hace en la escena está orientado a que el paciente llegue en condiciones de recibirlo y a que el centro lo espere sabiendo lo que puede encontrar.' },
        ],
      },
      F([PHTLS_TORAX, ACS_TRIAJE, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Disrupción aórtica traumática', definicion: 'Desgarro de la pared de la aorta por cizallamiento en la transición entre sus porciones fijas y móviles, típicamente por desaceleración de alta energía.' },
      { termino: 'Sangrado contenido', definicion: 'Hemorragia limitada de forma precaria por estructuras vecinas, que puede fallar en cualquier momento.' },
      { termino: 'Dolor interescapular', definicion: 'Dolor localizado entre las escápulas; hallazgo posible en la disrupción aórtica, aunque inespecífico y no constante.' },
    ],
    flashcards: [
      { frente: '¿Qué mecanismo se asocia a la disrupción aórtica?', reverso: 'La desaceleración de alta energía: colisión importante, caída desde altura, atropello a velocidad elevada, vuelco o eyección.' },
      { frente: '¿Por qué se desgarra en un punto concreto?', reverso: 'Porque el cizallamiento se concentra en la transición entre las porciones fijas y las móviles de la aorta.' },
      { frente: '¿La ausencia de diferencias de pulsos descarta la lesión?', reverso: 'No: puede cursar con exploración prácticamente normal.' },
      { frente: '¿En qué se traduce la sospecha en la escena?', reverso: 'En prioridad de traslado a centro de trauma y prealerta con el mecanismo descrito.' },
      { frente: '¿Qué confirma el diagnóstico?', reverso: 'La imagen hospitalaria; el tratamiento es quirúrgico o endovascular.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión frontal de alta energía. El paciente refiere dolor interescapular intenso y su exploración es por lo demás normal. ¿Qué corresponde?',
        opciones: [
          'Descartar lesión mayor por la exploración normal.',
          'Mantener alta la sospecha por el mecanismo, priorizar el traslado a centro de trauma y prealertar describiendo el mecanismo.',
          'Diagnosticar disrupción aórtica y comunicarlo como confirmado.',
          'Esperar a que aparezcan diferencias de pulsos antes de trasladar.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo eleva la sospecha y la prioridad; la confirmación es por imagen.',
      },
      {
        pregunta: '¿Por qué muchos pacientes con esta lesión que llegan vivos parecen estables al principio?',
        opciones: [
          'Porque la lesión es leve.',
          'Porque el sangrado suele estar contenido de forma precaria por estructuras vecinas, y esa contención puede fallar en cualquier momento.',
          'Porque la aorta se cierra sola.',
          'Porque el dolor enmascara los signos.',
        ],
        correcta: 1,
        explicacion: 'Esa contención precaria explica tanto la aparente estabilidad como la urgencia del traslado.',
      },
      {
        pregunta: 'Encuentras una diferencia de presión entre ambos brazos en un paciente con este mecanismo. ¿Cómo lo manejas?',
        opciones: [
          'Como hallazgo diagnóstico de disrupción aórtica.',
          'Como dato que se documenta y se comunica, que refuerza la sospecha sin confirmarla.',
          'Como error de medición que se descarta.',
          'Como indicación de descompresión torácica.',
        ],
        correcta: 1,
        explicacion: 'Ni la presencia confirma ni la ausencia descarta: son datos que se registran y se transmiten.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente eyectado en un vuelco, consciente, con constantes dentro de lo normal y sin dolor torácico. Tu compañero propone trasladarlo al hospital más cercano sin prealerta. ¿Qué argumentas con lo enseñado?',
          opciones: [
            'Que tiene razón: sin síntomas no hay riesgo.',
            'Que el mecanismo de desaceleración de alta energía sostiene la sospecha aunque la exploración sea normal, y que corresponde priorizar un centro con capacidad para trauma y prealertar describiendo el mecanismo.',
            'Que debe declararse disrupción aórtica en el informe.',
            'Que hay que esperar en la escena a que aparezcan síntomas.',
          ],
          correcta: 1,
          explicacion: 'La lección insiste en que la exploración normal no descarta y en que la sospecha se traduce en destino y prealerta, no en diagnóstico.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['No se publican cifras de presión objetivo ni conductas hemodinámicas concretas: dependen del protocolo del servicio y del alcance autorizado.'],
    }),
  },

  // ============================================================
  //  10. Taponamiento cardiaco
  // ============================================================
  'm5-tt-taponamiento': {
    icono: '💔',
    duracion: '14 min',
    resumen: 'En el taponamiento cardiaco se acumula sangre dentro del pericardio, que es poco '
      + 'distensible: la presión sube y el corazón no puede llenarse. El resultado es un shock '
      + 'obstructivo. La tríada de Beck —hipotensión, ingurgitación yugular y ruidos cardiacos '
      + 'apagados— se enseña como referencia clásica, no como requisito: rara vez está completa y sus '
      + 'tres componentes son difíciles de valorar en la escena. La conducta prehospitalaria es '
      + 'sospechar y trasladar rápido.',
    objetivos: [
      'Explicar el taponamiento como shock obstructivo por presión pericárdica.',
      'Situar la tríada de Beck como referencia incompleta y poco fiable en campo.',
      'Aplicar la conducta de sospecha, soporte y traslado rápido.',
    ],
    secciones: [
      {
        titulo: 'El mecanismo',
        bloques: [
          { tipo: 'p', texto: 'El pericardio es una envoltura fibrosa que tolera mal el aumento rápido de volumen. Si entra sangre por una herida cardiaca o por una lesión contusa, la presión dentro del saco sube deprisa y comprime las cavidades del corazón desde fuera. El corazón deja de llenarse bien, y si no se llena, no puede expulsar: cae el gasto cardiaco aunque el músculo esté intacto.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por eso es un shock obstructivo', texto: 'No falta volumen ni falla la bomba: hay un obstáculo mecánico al llenado. Comparte esa categoría con el neumotórax a tensión, y por eso ambos pueden presentarse con hipotensión y yugulares ingurgitadas. La diferencia práctica está en los hallazgos respiratorios: en el neumotórax a tensión hay un hemitórax con ruidos ausentes e hipertimpanismo, y en el taponamiento no.' },
        ],
      },
      {
        titulo: 'La tríada de Beck y su límite',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Tríada de Beck',
            headers: ['Componente', 'Por qué ocurre', 'Por qué puede faltar o no apreciarse'],
            filas: [
              ['Hipotensión', 'El corazón no se llena y cae el gasto', 'Puede aparecer tarde, y en pacientes jóvenes la compensación la retrasa'],
              ['Ingurgitación yugular', 'La sangre no puede entrar al corazón y se remansa', 'Puede faltar si el paciente además está hipovolémico por hemorragia'],
              ['Ruidos cardiacos apagados', 'La sangre del pericardio amortigua el sonido', 'Muy difícil de valorar con ruido ambiental, en movimiento o con ropa'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La tríada no es un requisito', texto: 'Exigir los tres componentes para sospechar un taponamiento lleva a reconocerlo tarde o a no reconocerlo. Se enseña porque explica bien la fisiología y porque el alumno la encontrará citada, pero la sospecha se sostiene por el mecanismo compatible —sobre todo una herida penetrante en la región precordial— junto a un shock que no se explica de otro modo.' },
          {
            tipo: 'lista',
            titulo: 'Otros hallazgos posibles',
            items: [
              'Taquicardia y piel fría, como en cualquier shock.',
              'Alteración del estado mental por hipoperfusión.',
              'Pulso periférico débil que se debilita aún más con la inspiración.',
              'Ausencia de mejoría clara pese a las medidas de soporte aplicadas.',
              'Deterioro rápido en un paciente que hasta entonces estaba consciente.',
            ],
          },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Oxígeno y soporte conforme al alcance autorizado y al protocolo.',
              'Accesos y fluidos según protocolo, entendiendo que sostienen temporalmente sin resolver la obstrucción.',
              'Manejo de la herida de la pared si el trauma es penetrante.',
              'Traslado urgente a centro con capacidad quirúrgica y prealerta explícita: el tratamiento definitivo es la evacuación del pericardio y la reparación.',
              'Reevaluación continua, con especial atención a los hallazgos respiratorios que separan este cuadro del neumotórax a tensión.',
              'Documentar la evolución con la hora: el deterioro rápido es en sí mismo información.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La pericardiocentesis de campo no es una conducta universal', texto: 'La punción del pericardio en el ámbito prehospitalario no forma parte del manejo estándar de este cuadro. Es un procedimiento con riesgo propio, que exige competencia, equipo y una indicación respaldada, y su realización —si el servicio la contempla— depende del protocolo y de la dirección médica. Esta lección no la enseña ni la autoriza.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Taponamiento cardiaco', definicion: 'Acumulación de sangre en el pericardio que aumenta la presión y impide el llenado del corazón.' },
      { termino: 'Tríada de Beck', definicion: 'Conjunto clásico de hipotensión, ingurgitación yugular y ruidos cardiacos apagados; referencia fisiológica que rara vez está completa en la escena.' },
      { termino: 'Shock obstructivo', definicion: 'Hipoperfusión por obstáculo mecánico al llenado o a la eyección cardiaca.' },
    ],
    flashcards: [
      { frente: '¿Por qué el taponamiento produce shock?', reverso: 'Porque la presión dentro del pericardio impide el llenado del corazón: es un obstáculo mecánico.' },
      { frente: 'Componentes de la tríada de Beck', reverso: 'Hipotensión, ingurgitación yugular y ruidos cardiacos apagados.' },
      { frente: '¿Hay que exigir la tríada completa para sospechar?', reverso: 'No: rara vez está completa y sus componentes son difíciles de valorar en la escena.' },
      { frente: '¿Qué diferencia el taponamiento del neumotórax a tensión en la exploración?', reverso: 'En el neumotórax a tensión hay un hemitórax con ruidos ausentes e hipertimpanismo; en el taponamiento no.' },
      { frente: '¿Es la pericardiocentesis de campo una conducta universal?', reverso: 'No: exige competencia, equipo, indicación respaldada y protocolo con dirección médica.' },
    ],
    quiz: [
      {
        pregunta: 'Herida penetrante en región precordial con shock, yugulares ingurgitadas y ruidos respiratorios simétricos y presentes. ¿Qué sospechas?',
        opciones: [
          'Neumotórax a tensión.',
          'Taponamiento cardiaco: shock obstructivo con hallazgos respiratorios conservados.',
          'Hemotórax masivo.',
          'Shock neurogénico.',
        ],
        correcta: 1,
        explicacion: 'Los ruidos respiratorios simétricos y presentes orientan al taponamiento frente al neumotórax a tensión.',
      },
      {
        pregunta: 'Paciente con sospecha de taponamiento que además ha sangrado de forma importante. ¿Qué componente de la tríada puede faltar?',
        opciones: [
          'La hipotensión.',
          'La ingurgitación yugular, porque el paciente puede no tener volumen suficiente para producirla.',
          'La taquicardia.',
          'El deterioro del estado mental.',
        ],
        correcta: 1,
        explicacion: 'La hipovolemia concurrente puede impedir la ingurgitación; su ausencia no descarta el cuadro.',
      },
      {
        pregunta: '¿Cuál es la conducta prehospitalaria correcta ante esta sospecha?',
        opciones: [
          'Pericardiocentesis en la escena en todos los casos.',
          'Soporte conforme al protocolo y traslado urgente a centro quirúrgico con prealerta, reevaluando de forma continua.',
          'Esperar a que la tríada esté completa antes de trasladar.',
          'Vendaje compresivo del tórax anterior.',
        ],
        correcta: 1,
        explicacion: 'El tratamiento definitivo es hospitalario y lo que cambia el resultado es el tiempo hasta él.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El taponamiento es un shock ___ porque un obstáculo mecánico impide el llenado del corazón.',
          opciones: ['hipovolémico', 'obstructivo', 'distributivo'],
          correcta: 1,
          explicacion: 'Comparte categoría con el neumotórax a tensión.',
        },
        {
          texto: 'Los ruidos cardiacos apagados son difíciles de valorar en la escena por el ___.',
          opciones: ['tamaño del paciente', 'ruido ambiental y el movimiento', 'tipo de fonendoscopio únicamente'],
          correcta: 1,
          explicacion: 'Por eso la tríada no puede exigirse como requisito para sospechar.',
        },
        {
          texto: 'Ante un shock obstructivo con ruidos respiratorios ausentes e hipertimpanismo en un hemitórax, el cuadro que corresponde es ___.',
          opciones: ['taponamiento cardiaco', 'neumotórax a tensión', 'contusión pulmonar'],
          correcta: 1,
          explicacion: 'Son los hallazgos respiratorios los que separan ambos cuadros en la escena.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'La tríada de Beck se enseña como referencia fisiológica y se declara expresamente que NO es un requisito diagnóstico.',
        'La lección no enseña ni autoriza la pericardiocentesis de campo.',
      ],
    }),
  },

  // ============================================================
  //  11. Contusión miocárdica
  // ============================================================
  'm5-tt-contusion-miocardica': {
    icono: '🫀',
    duracion: '13 min',
    resumen: 'El término contemporáneo es lesión cardiaca contusa, y describe el daño del músculo '
      + 'cardiaco tras un impacto sobre la pared torácica anterior. Sus manifestaciones —dolor '
      + 'torácico, alteraciones del ritmo, hipotensión— son inespecíficas y se confunden con las de '
      + 'otras lesiones del tórax. No se diagnostica por una equimosis esternal ni por el aspecto del '
      + 'volante: se sospecha por el mecanismo, se monitoriza si el equipo y el protocolo lo permiten '
      + 'y se evalúa en el hospital.',
    objetivos: [
      'Usar el término «lesión cardiaca contusa» y explicar su alcance.',
      'Reconocer el carácter inespecífico de sus manifestaciones.',
      'Distinguirla conceptualmente de la commotio cordis.',
    ],
    secciones: [
      {
        titulo: 'De «contusión miocárdica» a «lesión cardiaca contusa»',
        bloques: [
          { tipo: 'p', texto: 'El título del plan usa «contusión miocárdica». La denominación que emplea hoy la literatura es **lesión cardiaca contusa**, más amplia porque el impacto puede afectar al músculo, al sistema de conducción, a las válvulas o al pericardio, y no solo producir una contusión del miocardio. Se conserva el término del plan como título documental y se enseña el actual.' },
          { tipo: 'p', texto: 'El mecanismo habitual es un impacto directo sobre la pared torácica anterior: volante, manillar, caída, golpe o compresión. El corazón queda entre el esternón y la columna, y la energía transmitida puede dañar el tejido cardiaco sin que la pared se abra.' },
        ],
      },
      {
        titulo: 'Manifestaciones inespecíficas',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que puede encontrarse',
            items: [
              'Dolor torácico, difícil de separar del dolor de la pared o de las fracturas costales.',
              'Alteraciones del ritmo cardiaco, desde taquicardia hasta ritmos irregulares.',
              'Hipotensión sin otra causa aparente.',
              'Signos externos de impacto anterior: equimosis, marca del cinturón o del volante.',
              'En casos graves, signos de fallo de bomba.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ninguno de esos hallazgos es propio de esta lesión', texto: 'El dolor puede venir de las costillas, la taquicardia del dolor o de la hemorragia, y la hipotensión de un sangrado en otro sitio. Por eso no se diagnostica en la calle: se sospecha por el mecanismo y se sostiene al paciente mientras se descartan las causas más frecuentes, empezando por la hemorragia.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La equimosis esternal no diagnostica nada', texto: 'Ni su presencia confirma la lesión cardiaca ni su ausencia la descarta. Es una marca de dónde se transfirió la energía, y como tal se documenta y dirige la exploración.' },
        ],
      },
      {
        titulo: 'Conducta y una distinción conceptual',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué se hace',
            items: [
              'Monitorización del ritmo si la unidad dispone de equipo y está dentro del alcance autorizado.',
              'Oxígeno y soporte conforme al protocolo.',
              'Búsqueda activa de otras causas de hipotensión, en especial la hemorragia.',
              'Analgesia según alcance y protocolo.',
              'Traslado con comunicación del mecanismo y de los hallazgos, incluidos los cambios del ritmo observados.',
              'Reevaluación repetida: las alteraciones del ritmo pueden aparecer durante el traslado.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'No confundir con commotio cordis', texto: 'La **commotio cordis** es otra entidad: un golpe en la región precordial en un momento vulnerable del ciclo cardiaco desencadena una arritmia potencialmente mortal en un corazón estructuralmente sano, sin que haya daño del músculo. Es característica de impactos deportivos. Su manejo es el del paro cardiaco según las guías de reanimación vigentes y el protocolo del servicio. La lesión cardiaca contusa, en cambio, implica daño del tejido.' },
        ],
      },
      F([PHTLS_TORAX, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Lesión cardiaca contusa', definicion: 'Daño del corazón por impacto sobre la pared torácica anterior, que puede afectar músculo, conducción, válvulas o pericardio.' },
      { termino: 'Commotio cordis', definicion: 'Arritmia potencialmente mortal desencadenada por un golpe precordial en un momento vulnerable del ciclo cardiaco, en un corazón estructuralmente sano.' },
      { termino: 'Hallazgo inespecífico', definicion: 'Signo o síntoma que puede deberse a varias causas distintas y que por sí solo no identifica una lesión.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el término contemporáneo de «contusión miocárdica»?', reverso: 'Lesión cardiaca contusa, más amplia porque el daño puede afectar músculo, conducción, válvulas o pericardio.' },
      { frente: '¿Diagnostica algo la equimosis esternal?', reverso: 'No: marca dónde se transfirió la energía y dirige la exploración.' },
      { frente: '¿Qué causa de hipotensión se descarta primero en este paciente?', reverso: 'La hemorragia, que es la más frecuente en trauma.' },
      { frente: '¿Qué es la commotio cordis?', reverso: 'Una arritmia por golpe precordial en un momento vulnerable, sin daño estructural del corazón.' },
      { frente: 'Mecanismo típico de la lesión cardiaca contusa', reverso: 'Impacto directo sobre la pared torácica anterior, con el corazón entre esternón y columna.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión frontal con marca del volante en el tórax; el paciente refiere dolor torácico y presenta taquicardia. ¿Qué corresponde?',
        opciones: [
          'Diagnosticar contusión miocárdica por la marca del volante.',
          'Sospechar lesión cardiaca contusa por el mecanismo, monitorizar si el equipo y el protocolo lo permiten, buscar otras causas de los hallazgos y trasladar.',
          'Descartar lesión cardiaca porque no hay herida.',
          'Administrar tratamiento antiarrítmico en la escena.',
        ],
        correcta: 1,
        explicacion: 'Los hallazgos son inespecíficos y el diagnóstico es hospitalario; el mecanismo sostiene la sospecha.',
      },
      {
        pregunta: '¿Qué diferencia la commotio cordis de la lesión cardiaca contusa?',
        opciones: [
          'Que la commotio cordis produce más daño del músculo.',
          'Que en la commotio cordis el corazón es estructuralmente sano y el problema es una arritmia desencadenada por el golpe en un momento vulnerable.',
          'Que la commotio cordis solo ocurre en adultos mayores.',
          'Que son sinónimos.',
        ],
        correcta: 1,
        explicacion: 'Una implica daño del tejido; la otra, un trastorno del ritmo sin lesión estructural.',
      },
      {
        pregunta: 'Paciente con impacto torácico anterior e hipotensión. ¿Cuál es la conducta prioritaria?',
        opciones: [
          'Atribuir la hipotensión al corazón y no buscar más.',
          'Buscar activamente hemorragia y otras causas antes de dar la hipotensión por explicada, sosteniendo al paciente según protocolo.',
          'Esperar a la monitorización para decidir.',
          'Administrar analgesia y observar sin trasladar.',
        ],
        correcta: 1,
        explicacion: 'Dar la hipotensión por explicada con una sola causa es el error que la unidad advierte de forma repetida.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Durante el traslado de un paciente con impacto esternal aparece un ritmo irregular en el monitor. ¿Qué haces con ese hallazgo, según lo enseñado?',
          opciones: [
            'Lo interpretas como confirmación de contusión miocárdica y lo comunicas como diagnóstico.',
            'Lo documentas con la hora, lo comunicas en la entrega, mantienes el soporte según protocolo y sigues buscando otras causas de deterioro.',
            'Lo ignoras porque los hallazgos son inespecíficos.',
            'Suspendes la monitorización para no alarmar al paciente.',
          ],
          correcta: 1,
          explicacion: 'La lección enseña a registrar y comunicar los cambios de ritmo observados sin convertirlos en un diagnóstico de campo.',
        },
        {
          pregunta: 'Un compañero dice que un jugador que cayó fulminado tras recibir un pelotazo en el pecho «tiene una contusión miocárdica». ¿Cómo lo precisas?',
          opciones: [
            'Confirmando su afirmación.',
            'Señalando que ese cuadro corresponde conceptualmente a la commotio cordis —arritmia por golpe precordial en un corazón sano— y que su manejo es el del paro cardiaco según las guías vigentes y el protocolo.',
            'Diciendo que ambas entidades son la misma cosa.',
            'Afirmando que no existe relación entre golpes torácicos y arritmias.',
          ],
          correcta: 1,
          explicacion: 'La lección distingue expresamente ambas entidades y remite el manejo del paro a las guías de reanimación y al protocolo.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'Se conserva «contusión miocárdica» como título documental y se enseña «lesión cardiaca contusa» como término contemporáneo.',
        'No se publican pautas antiarrítmicas ni dosis: dependen de las guías de reanimación vigentes, del alcance autorizado y del protocolo.',
      ],
    }),
  },
}
