// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA MUSCULOESQUELÉTICO»
// ------------------------------------------------------------
//  Los 7 temas de la unidad. Hilo conductor: la lesión de una extremidad rara
//  vez mata, pero determina la función futura del paciente y puede esconder
//  dos problemas que sí matan —la hemorragia y el síndrome de aplastamiento—.
//  La secuencia no se altera por una deformidad llamativa.
//
//  BLOQUEO PARCIAL DECLARADO en `m5-tme-farmacos`: el plan pide enseñar
//  fármacos concretos en trauma de extremidades. Se enseña el razonamiento —qué
//  hace cada grupo, qué limita su uso, qué hay que vigilar— y NO se publica
//  ninguna dosis, concentración ni pauta: dependen de la Información para
//  Prescribir del producto registrado, del formulario del servicio y de la
//  dirección médica, que no se han entregado.
//
//  DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 para esta unidad quedan
//  PENDIENTES. La copia de PHTLS 10 declara traducción automática y no se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4).',
  nota: 'Base curricular histórica declarada por el plan. Capítulo y página PENDIENTES: no se '
    + 'localizaron de forma reproducible en la copia licenciada para esta unidad. No se cita la 10.ª '
    + 'edición: la copia disponible declara traducción automática.',
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
  nota: 'Manual público de la OMS: ABCDE, control de hemorragia y manejo de lesiones de extremidades. '
    + 'PENDIENTE: módulo y página exactos.',
}
const AHA_PA_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía primaria actual para control de hemorragia externa, inmovilización y cuidado de heridas. '
    + 'PENDIENTE: apartado exacto.',
}
const COFEPRIS = {
  nombre: 'COFEPRIS. Información para Prescribir y registro sanitario de medicamentos.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de la que procede la información autorizada de cada producto: '
    + 'indicación, vía, concentración y advertencias. PENDIENTE: fichas concretas de los productos que '
    + 'tenga el servicio.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, formulario, presentaciones, equipamiento y dirección médica de la academia '
    + 'R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija qué fármacos hay, en qué presentación, '
    + 'quién puede administrarlos y con qué autorización. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const PRIORIDAD = 'PRIORIDAD DE LA UNIDAD: una deformidad llamativa no altera la secuencia. Primero '
  + 'vía aérea, ventilación y circulación —incluido el control de la hemorragia—; después la '
  + 'extremidad. La excepción es la hemorragia de esa misma extremidad, que se controla de inmediato.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: analgesia, medicación, material de inmovilización, tracción, '
  + 'fluidos y destino dependen del alcance autorizado, del equipamiento y del protocolo del servicio.'
const NEUROVASCULAR = 'REGLA CONSTANTE: se valora pulso, sensibilidad y movilidad distales ANTES y '
  + 'DESPUÉS de cualquier maniobra sobre la extremidad, y se anota con la hora.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'PHTLS 9.ª ed. (2020), capítulo pendiente; AHA/ARC Primeros Auxilios 2024; ACS Best Practices',
  observaciones: [
    'Redactado desde cero en el lote B del Módulo 5; el tema estaba vacío.',
    PRIORIDAD,
    NEUROVASCULAR,
    PROTOCOLO,
    'DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 pendientes de localizar para esta unidad.',
    ...extra,
  ],
  fuentes,
})

const FU = [
  'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
  'AHA / American Red Cross. Guidelines for First Aid, 2024.',
  'ACS. Trauma Quality Programs, Best Practices Guidelines.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
]

export default {
  'm5-tme-fracturas-inmovilizacion': {
    icono: 'ic-fractura',
    duracion: '15 min',
    resumen: 'Una fractura es una solución de continuidad del hueso, y se llama abierta cuando existe '
      + 'una herida que comunica el foco con el exterior. En la escena no se clasifica ni se '
      + 'diagnostica: se reconoce, se inmoviliza y se comprueba el estado neurovascular antes y '
      + 'después. La lección repasa los tipos de férula, la regla de inmovilizar la articulación de '
      + 'arriba y la de abajo, y las tres situaciones en que sí se alinea una extremidad deformada.',
    objetivos: [
      'Reconocer una fractura y distinguir la cerrada de la abierta.',
      'Seleccionar el tipo de inmovilización según la región lesionada.',
      'Aplicar la comprobación neurovascular y los criterios de alineación.',
    ],
    secciones: [
      {
        titulo: 'Reconocer sin diagnosticar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que hace sospechar una fractura',
            items: [
              'Dolor localizado que aumenta al mover o al cargar peso.',
              'Deformidad, angulación o acortamiento respecto al lado contrario.',
              'Edema y equimosis sobre el foco.',
              'Impotencia funcional: el paciente no usa la extremidad.',
              'Crepitación, que no se busca de forma deliberada porque duele y puede añadir daño.',
              'Movilidad anormal del segmento.',
              'Mecanismo compatible, incluso sin deformidad evidente.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Abierta y cerrada', texto: 'La fractura es abierta cuando hay una herida que comunica el foco con el exterior, aunque el hueso no se vea: una herida pequeña sobre el foco basta para tratarla como abierta. Cambia el pronóstico por el riesgo de infección y cambia la conducta: se cubre con material estéril, se controla el sangrado y se comunica en la entrega, porque el tiempo hasta el tratamiento importa.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se empuja el hueso hacia dentro', texto: 'Si un extremo óseo asoma, no se intenta reintroducirlo. Si al alinear la extremidad por una indicación correcta el hueso se retrae solo, se anota que ha ocurrido y se comunica, porque el foco pasa a estar contaminado aunque ya no se vea.' },
        ],
      },
      {
        titulo: 'Cómo se inmoviliza',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Tipo de férula', 'Para qué sirve'],
            filas: [
              ['Rígida', 'Segmentos largos; se acolcha y se adapta a la extremidad'],
              ['Maleable o moldeable', 'Se adapta a la forma en que se encuentra la extremidad'],
              ['De vacío', 'Se ajusta al contorno y mantiene la posición sin presión desigual'],
              ['Neumática o hinchable', 'Inmoviliza y comprime de forma uniforme; su presión cambia con la temperatura y la altitud, y se revisa'],
              ['De tracción', 'Solo para fractura de la diáfisis del fémur; tema propio en esta unidad'],
              ['Improvisada o anatómica', 'Cuando no hay material: la propia extremidad sana, un cabestrillo o material rígido acolchado'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Secuencia de inmovilización',
            items: [
              'Exponer la zona y retirar anillos, pulseras o relojes antes de que el edema lo impida.',
              'Valorar pulso, sensibilidad y movilidad distales, y anotarlo con la hora.',
              'Cubrir las heridas con material estéril y controlar el sangrado.',
              'Inmovilizar incluyendo la articulación proximal y la distal al foco.',
              'Acolchar los huecos y las prominencias óseas, y sujetar sin comprimir en exceso.',
              'Volver a valorar pulso, sensibilidad y movilidad, y anotarlo.',
              'Elevar la extremidad y aplicar frío si el protocolo lo contempla; analgesia según alcance y protocolo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuándo sí se alinea una extremidad deformada', texto: 'La norma general es inmovilizar en la posición encontrada. Se alinea con tracción suave en tres situaciones: cuando no hay pulso distal o el compromiso neurovascular es evidente, cuando la deformidad impide inmovilizar o trasladar con seguridad, y cuando el traslado será prolongado y el protocolo lo contempla. Se hace con tracción suave y sostenida, deteniéndose si aparece resistencia importante o un aumento marcado del dolor, y se reevalúa el estado neurovascular inmediatamente después.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Fractura abierta', definicion: 'Aquella en que una herida comunica el foco de fractura con el exterior, aunque el hueso no sea visible.' },
      { termino: 'Impotencia funcional', definicion: 'Incapacidad o rechazo a usar la extremidad lesionada.' },
      { termino: 'Regla de las dos articulaciones', definicion: 'Inmovilizar incluyendo la articulación proximal y la distal al foco de fractura.' },
      { termino: 'Valoración neurovascular distal', definicion: 'Comprobación de pulso, sensibilidad y movilidad más allá de la lesión, antes y después de cada maniobra.' },
    ],
    flashcards: [
      { frente: '¿Cuándo una fractura es abierta?', reverso: 'Cuando una herida comunica el foco con el exterior, aunque el hueso no se vea.' },
      { frente: '¿Qué articulaciones se incluyen al inmovilizar?', reverso: 'La proximal y la distal al foco.' },
      { frente: '¿Cuándo se valora el estado neurovascular distal?', reverso: 'Antes y después de cualquier maniobra, anotándolo con la hora.' },
      { frente: 'Tres situaciones en que se alinea una extremidad deformada', reverso: 'Ausencia de pulso distal o compromiso neurovascular, deformidad que impide inmovilizar o trasladar, y traslado prolongado si el protocolo lo contempla.' },
      { frente: '¿Se reintroduce un extremo óseo que asoma?', reverso: 'No; si se retrae solo al alinear, se anota y se comunica.' },
      { frente: '¿Qué se retira antes de que aparezca el edema?', reverso: 'Anillos, pulseras y relojes.' },
    ],
    quiz: [
      {
        pregunta: 'Fractura de antebrazo con deformidad evidente, pulso radial presente y sensibilidad normal. ¿Qué corresponde?',
        opciones: [
          'Alinear siempre antes de inmovilizar.',
          'Inmovilizar en la posición encontrada incluyendo codo y muñeca, y reevaluar el estado neurovascular.',
          'Reducir la fractura hasta recuperar la forma normal.',
          'Trasladar sin inmovilizar para no perder tiempo.',
        ],
        correcta: 1,
        explicacion: 'Sin compromiso neurovascular ni impedimento para el traslado, la norma es inmovilizar como se encuentra.',
      },
      {
        pregunta: 'Tras colocar la férula, el paciente refiere hormigueo y no encuentras el pulso distal. ¿Qué haces?',
        opciones: [
          'Continúas el traslado y lo comunicas al llegar.',
          'Aflojas o retiras la sujeción, reevalúas, y si persiste consideras la alineación con tracción suave conforme al protocolo.',
          'Aprietas más la férula para estabilizar mejor.',
          'Elevas la extremidad y esperas quince minutos.',
        ],
        correcta: 1,
        explicacion: 'La comprobación posterior existe precisamente para detectar esto; el compromiso neurovascular cambia la conducta.',
      },
      {
        pregunta: 'Herida pequeña sobre el foco de una fractura de tibia, sin hueso visible. ¿Cómo la tratas?',
        opciones: [
          'Como fractura cerrada: no se ve el hueso.',
          'Como fractura abierta: se cubre con material estéril, se controla el sangrado y se comunica en la entrega.',
          'Se lava la herida a presión y se sutura.',
          'Se ignora la herida y se inmoviliza.',
        ],
        correcta: 1,
        explicacion: 'Una herida sobre el foco basta para tratarla como abierta por el riesgo de infección.',
      },
      {
        pregunta: '¿Por qué se revisa una férula neumática durante el traslado?',
        opciones: [
          'Porque pierde aire siempre.',
          'Porque su presión cambia con la temperatura y la altitud.',
          'Porque debe retirarse cada diez minutos.',
          'Porque sustituye al control neurovascular.',
        ],
        correcta: 1,
        explicacion: 'Un cambio de presión puede convertir una inmovilización correcta en una compresión excesiva.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la inmovilización de una fractura de extremidad',
        pasos: [
          'Exponer la zona y retirar anillos, pulseras y relojes',
          'Valorar pulso, sensibilidad y movilidad distales y anotarlo con la hora',
          'Cubrir las heridas con material estéril y controlar el sangrado',
          'Inmovilizar incluyendo la articulación proximal y la distal',
          'Acolchar huecos y prominencias y sujetar sin comprimir en exceso',
          'Volver a valorar pulso, sensibilidad y movilidad y anotarlo',
        ],
      },
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-tme-esguinces-luxaciones': {
    icono: 'ic-esguince',
    duracion: '13 min',
    resumen: 'Tres lesiones de partes blandas que se confunden entre sí y con la fractura. El esguince '
      + 'daña un ligamento, la luxación saca el hueso de la articulación y el desgarro rompe fibras '
      + 'musculares o tendinosas. En la escena no se distingue con seguridad un esguince de una '
      + 'fractura sin imagen, así que se tratan igual: inmovilizar como se encuentra y comprobar el '
      + 'estado neurovascular. La luxación tiene además una urgencia propia cuando compromete el '
      + 'pulso.',
    objetivos: [
      'Diferenciar esguince, luxación y desgarro por la estructura lesionada.',
      'Aplicar el manejo común de las lesiones de partes blandas.',
      'Reconocer la luxación con compromiso neurovascular como situación urgente.',
    ],
    secciones: [
      {
        titulo: 'Tres lesiones distintas',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Qué se lesiona', 'Qué se encuentra'],
            filas: [
              ['Esguince', 'Un ligamento, por un movimiento que fuerza la articulación más allá de su recorrido', 'Dolor, edema, equimosis y dificultad para apoyar o mover; la articulación conserva su forma'],
              ['Luxación', 'La articulación pierde la relación entre sus superficies: el hueso sale de su sitio', 'Deformidad evidente, posición fija, pérdida completa del movimiento y dolor intenso'],
              ['Desgarro', 'Fibras musculares o tendinosas', 'Dolor brusco durante un esfuerzo, pérdida de fuerza, a veces un hueco palpable y equimosis tardía'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El esguince y la fractura no se separan en la calle', texto: 'Un esguince importante y una fractura sin desplazamiento pueden dar exactamente los mismos hallazgos: dolor, edema e imposibilidad de apoyar. Sin imagen no se distinguen, y por eso ambos se inmovilizan y se derivan. Decirle a un paciente que «solo es un esguince» es una conclusión que la escena no permite.' },
        ],
      },
      {
        titulo: 'Manejo común y la excepción de la luxación',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que se hace en las tres',
            items: [
              'Valorar pulso, sensibilidad y movilidad distales y anotarlo.',
              'Inmovilizar en la posición encontrada, sin intentar corregir la deformidad.',
              'Reposo de la zona, elevación y frío conforme al protocolo, evitando el contacto directo del frío con la piel.',
              'Compresión suave si el protocolo lo contempla, comprobando que no compromete la circulación.',
              'Analgesia según alcance y protocolo.',
              'Reevaluar el estado neurovascular después de cualquier maniobra.',
              'Traslado y derivación: la valoración con imagen es la que separa unas lesiones de otras.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La luxación que no espera', texto: 'Una luxación puede comprimir o estirar los vasos y nervios que cruzan la articulación. Si el pulso distal está ausente, la extremidad está fría o pálida o hay pérdida de sensibilidad, deja de ser una lesión ortopédica que puede esperar y pasa a ser una urgencia: traslado rápido y prealerta, porque el tiempo hasta la reducción condiciona el resultado.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La reducción no es una maniobra de esta lección', texto: 'Recolocar una articulación luxada exige formación específica, conocer la técnica de esa articulación concreta y una indicación respaldada. Si el protocolo de su servicio contempla la reducción de alguna luxación en el ámbito prehospitalario, se aplica conforme a ese protocolo y a la dirección médica. Esta lección no la enseña ni la autoriza, y en ningún caso se intenta por primera vez sobre un paciente real.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Esguince', definicion: 'Lesión de un ligamento por un movimiento que fuerza la articulación más allá de su recorrido normal.' },
      { termino: 'Luxación', definicion: 'Pérdida de la relación normal entre las superficies de una articulación, con deformidad y bloqueo del movimiento.' },
      { termino: 'Desgarro', definicion: 'Rotura de fibras musculares o tendinosas, habitualmente durante un esfuerzo.' },
      { termino: 'Compromiso neurovascular', definicion: 'Afectación del pulso, la sensibilidad o la movilidad distales que convierte una lesión ortopédica en una urgencia.' },
    ],
    flashcards: [
      { frente: '¿Qué se lesiona en un esguince?', reverso: 'Un ligamento.' },
      { frente: '¿Se distinguen esguince y fractura en la escena?', reverso: 'No con seguridad: sin imagen dan los mismos hallazgos, y por eso se tratan igual.' },
      { frente: '¿Qué convierte una luxación en urgencia?', reverso: 'La ausencia de pulso distal, la palidez o el frío de la extremidad y la pérdida de sensibilidad.' },
      { frente: '¿Se reduce una luxación en la escena?', reverso: 'Solo si el protocolo del servicio lo contempla, con formación específica y dirección médica; esta lección no lo autoriza.' },
      { frente: '¿En qué posición se inmoviliza?', reverso: 'En la posición encontrada, sin intentar corregir la deformidad.' },
    ],
    quiz: [
      {
        pregunta: 'Luxación de hombro con deformidad evidente, pulso radial presente y sensibilidad conservada. ¿Qué corresponde?',
        opciones: [
          'Reducirla en la escena para aliviar el dolor.',
          'Inmovilizar en la posición encontrada, analgesia según protocolo y traslado, reevaluando el estado neurovascular.',
          'Traccionar el brazo hasta recolocarlo.',
          'Aplicar un vendaje compresivo circular.',
        ],
        correcta: 1,
        explicacion: 'Sin compromiso neurovascular no hay urgencia añadida, y la reducción no es una maniobra de esta lección.',
      },
      {
        pregunta: 'Luxación de rodilla con extremidad fría, pálida y sin pulso pedio. ¿Cómo cambia la situación?',
        opciones: [
          'No cambia: sigue siendo una lesión ortopédica.',
          'Se convierte en urgencia: traslado rápido con prealerta, porque el tiempo hasta la reducción condiciona el resultado.',
          'Se resuelve elevando la extremidad.',
          'Se aplica frío y se observa treinta minutos.',
        ],
        correcta: 1,
        explicacion: 'La luxación puede comprimir o estirar los vasos que cruzan la articulación.',
      },
      {
        pregunta: 'Paciente con dolor y edema en el tobillo tras una torcedura, que no puede apoyar. ¿Qué le comunicas?',
        opciones: [
          'Que solo es un esguince y puede irse a casa.',
          'Que sin imagen no se puede separar un esguince de una fractura, que se inmoviliza y que necesita valoración.',
          'Que se trata de una luxación.',
          'Que puede apoyar progresivamente durante el día.',
        ],
        correcta: 1,
        explicacion: 'Ambas lesiones dan los mismos hallazgos en la escena y por eso reciben el mismo trato inicial.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La lesión en la que el hueso pierde su relación con la articulación y queda en posición fija es la ___.',
          opciones: ['esguince', 'luxación', 'desgarro'],
          correcta: 1,
          explicacion: 'De ahí la deformidad evidente y el bloqueo completo del movimiento.',
        },
        {
          texto: 'Un dolor brusco durante un esfuerzo con pérdida de fuerza y a veces un hueco palpable corresponde a un ___.',
          opciones: ['esguince', 'desgarro', 'luxación'],
          correcta: 1,
          explicacion: 'Se rompen fibras musculares o tendinosas.',
        },
        {
          texto: 'Ante una luxación, la extremidad fría y sin pulso distal convierte el cuadro en una ___.',
          opciones: ['lesión banal', 'urgencia', 'indicación de reducción por el TUM'],
          correcta: 1,
          explicacion: 'El traslado se acelera y se prealerta; la reducción sigue dependiendo del protocolo.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['La reducción de luxaciones se remite expresamente al protocolo del servicio y a la dirección médica; la lección no la enseña ni la autoriza.'],
    }),
  },

  'm5-tme-cadera': {
    icono: 'cp-smart-pelvis',
    duracion: '14 min',
    resumen: 'Bajo el título de «lesión de cadera» conviven dos situaciones muy distintas: la fractura '
      + 'de la persona mayor tras una caída banal, con la pierna acortada y rotada hacia fuera, y la '
      + 'luxación del adulto joven en una colisión, con la cadera flexionada y la rodilla girada hacia '
      + 'dentro. La primera es un problema de fragilidad con alto riesgo de complicaciones; la '
      + 'segunda, una urgencia que amenaza la irrigación de la cabeza del fémur.',
    objetivos: [
      'Distinguir la fractura proximal de fémur de la luxación de cadera por posición y contexto.',
      'Reconocer el riesgo hemorrágico y sistémico de la fractura de cadera en la persona mayor.',
      'Aplicar el manejo prehospitalario de cada una.',
    ],
    secciones: [
      {
        titulo: 'Dos cuadros con el mismo título',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Fractura proximal de fémur', 'Luxación de cadera'],
            filas: [
              ['Paciente típico', 'Persona mayor tras caída desde su propia altura', 'Adulto joven en colisión de alta energía, con el impacto de la rodilla contra el salpicadero'],
              ['Posición de la pierna', 'Acortada y rotada hacia fuera', 'Cadera y rodilla flexionadas, con la pierna girada hacia dentro'],
              ['Dolor', 'En ingle o cara lateral, al mover o al intentar cargar', 'Intenso y constante, con bloqueo del movimiento'],
              ['Riesgo principal', 'Sangrado en el muslo, dolor, complicaciones por inmovilidad y descompensación de enfermedades previas', 'Compromiso de la irrigación de la cabeza del fémur y lesión del nervio ciático'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La luxación de cadera es sensible al tiempo', texto: 'La irrigación de la cabeza del fémur puede quedar comprometida mientras la articulación esté luxada, y el retraso en la reducción se asocia a complicaciones. Se traslada con prioridad y se comunica la posición de la extremidad en la prealerta. La reducción es hospitalaria.' },
        ],
      },
      {
        titulo: 'Lo que no se ve en la persona mayor',
        bloques: [
          { tipo: 'p', texto: 'Una fractura de cadera parece una lesión localizada y no lo es. El foco sangra hacia el muslo y hacia la región de la cadera sin manifestación externa, y en un paciente con poca reserva ese volumen cuenta. Además, el dolor, la inmovilidad y el frío del suelo si ha permanecido caído mucho tiempo desencadenan otros problemas.' },
          {
            tipo: 'lista',
            titulo: 'Lo que hay que preguntar y buscar',
            items: [
              'Cuánto tiempo lleva en el suelo: una permanencia prolongada añade hipotermia, deshidratación y riesgo de lesión por presión y por aplastamiento.',
              'Por qué cayó: un síncope, una arritmia, una infección o una hipoglucemia previos cambian por completo la atención.',
              'Qué medicación toma, en especial anticoagulantes y antiagregantes.',
              'Si hay otros puntos dolorosos: en el paciente mayor las lesiones múltiples pasan desapercibidas con facilidad.',
              'Signos de shock, recordando que la respuesta compensatoria en esta población puede estar limitada.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Movilización cuidadosa y con el número de personas necesario, usando camilla de cuchara o colchón de vacío según el material disponible.',
              'Acolchar y sostener la extremidad en la posición en que resulta menos dolorosa, sin forzar la alineación.',
              'No usar férula de tracción en la fractura de cadera ni en la luxación: está indicada solo en la fractura de la diáfisis del fémur.',
              'Analgesia según alcance y protocolo: el dolor mal controlado empeora la tolerancia del traslado y la evolución.',
              'Prevención activa de la hipotermia.',
              'Valoración neurovascular distal antes y después de mover al paciente.',
              'Traslado y comunicación del mecanismo, del tiempo en el suelo y de la medicación.',
            ],
          },
        ],
      },
      F([PHTLS, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Fractura proximal de fémur', definicion: 'Fractura en la región de la cadera, típica de la persona mayor tras una caída de baja energía; cursa con pierna acortada y rotada hacia fuera.' },
      { termino: 'Luxación de cadera', definicion: 'Salida de la cabeza del fémur de su cavidad, habitualmente por impacto de alta energía; amenaza la irrigación de la cabeza femoral.' },
      { termino: 'Tiempo en el suelo', definicion: 'Periodo que el paciente ha permanecido caído; añade hipotermia, deshidratación y riesgo de lesión por presión.' },
    ],
    flashcards: [
      { frente: 'Posición de la pierna en la fractura proximal de fémur', reverso: 'Acortada y rotada hacia fuera.' },
      { frente: 'Posición en la luxación de cadera típica', reverso: 'Cadera y rodilla flexionadas, con la pierna girada hacia dentro.' },
      { frente: '¿Se usa férula de tracción en la cadera?', reverso: 'No: está indicada solo en la fractura de la diáfisis del fémur.' },
      { frente: '¿Por qué preocupa el tiempo en el suelo?', reverso: 'Añade hipotermia, deshidratación y riesgo de lesión por presión y por aplastamiento.' },
      { frente: '¿Por qué la luxación de cadera es sensible al tiempo?', reverso: 'Porque la irrigación de la cabeza femoral puede quedar comprometida mientras dure la luxación.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 84 años que cayó en casa; su pierna derecha está acortada y rotada hacia fuera. ¿Qué sospechas y qué preguntas añades?',
        opciones: [
          'Luxación de cadera; pregunto por el vehículo implicado.',
          'Fractura proximal de fémur; pregunto cuánto tiempo lleva en el suelo, por qué cayó y qué medicación toma.',
          'Esguince de rodilla; pregunto por deportes previos.',
          'Fractura de tibia; no añado preguntas.',
        ],
        correcta: 1,
        explicacion: 'Esa posición y ese contexto son característicos, y las tres preguntas cambian la atención.',
      },
      {
        pregunta: 'Adulto joven en colisión frontal con la rodilla marcada en el salpicadero; su cadera está flexionada y la pierna girada hacia dentro. ¿Qué priorizas?',
        opciones: [
          'Alinear la extremidad antes de moverlo.',
          'Reconocer la posible luxación de cadera, inmovilizar en la posición encontrada y trasladar con prioridad y prealerta.',
          'Colocar una férula de tracción.',
          'Descartar lesión por la ausencia de heridas.',
        ],
        correcta: 1,
        explicacion: 'La luxación amenaza la irrigación de la cabeza femoral y el tiempo hasta la reducción cuenta.',
      },
      {
        pregunta: '¿Por qué una fractura de cadera no es una lesión «localizada» en la persona mayor?',
        opciones: [
          'Porque siempre se acompaña de fractura de pelvis.',
          'Porque el foco sangra hacia el muslo sin manifestación externa y el paciente puede tener poca reserva.',
          'Porque impide caminar.',
          'Porque exige cirugía.',
        ],
        correcta: 1,
        explicacion: 'A eso se suman el dolor, la inmovilidad, el frío y la descompensación de enfermedades previas.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'La paciente de 84 años lleva ocho horas en el suelo, está fría y ligeramente confusa. ¿Cómo cambia eso tu atención respecto a la fractura?',
          opciones: [
            'No cambia: la fractura es el problema.',
            'Añade hipotermia, deshidratación y riesgo de lesión por presión y por aplastamiento; obliga a prevenir activamente la pérdida de calor, a buscar la causa de la caída y a comunicar el tiempo en el suelo.',
            'Obliga a colocar una férula de tracción.',
            'Permite retrasar el traslado hasta que entre en calor.',
          ],
          correcta: 1,
          explicacion: 'La lección señala expresamente el tiempo en el suelo como dato que añade problemas al de la fractura.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-tme-compartimental': {
    icono: 'cp-servier-fibra-muscular',
    duracion: '14 min',
    resumen: 'Los músculos de una extremidad están agrupados en compartimentos rodeados por una '
      + 'envoltura que no cede. Si el contenido aumenta —por sangrado o por edema—, la presión sube y '
      + 'llega un punto en que la sangre deja de perfundir el músculo dentro de esa envoltura. El '
      + 'dolor desproporcionado y el dolor al estirar pasivamente los dedos son los signos precoces; '
      + 'la ausencia de pulso es tardía. Esperar a que falte el pulso es esperar demasiado.',
    objetivos: [
      'Explicar el mecanismo del síndrome compartimental.',
      'Reconocer sus signos precoces y distinguirlos de los tardíos.',
      'Aplicar las medidas que no agravan la presión dentro del compartimento.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre dentro',
        bloques: [
          { tipo: 'p', texto: 'Cada compartimento contiene músculos, vasos y nervios envueltos por una capa fibrosa que apenas se deja distender. Cuando una fractura sangra, un músculo contundido se inflama o una quemadura circular retrae la piel, el volumen dentro de esa envoltura aumenta. Como el continente no cede, la presión sube hasta superar la presión con la que la sangre entra en los capilares: el músculo deja de recibir oxígeno aunque siga habiendo pulso en la muñeca o en el pie.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La trampa del pulso presente', texto: 'La arteria principal atraviesa el compartimento y puede seguir latiendo mientras el músculo que la rodea ya está isquémico, porque la presión necesaria para colapsar el capilar es mucho menor que la necesaria para colapsar la arteria. Por eso el pulso conservado no descarta nada y su desaparición es un signo tardío.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones que lo producen',
            items: [
              'Fractura, especialmente de tibia y de antebrazo.',
              'Lesión por aplastamiento y liberación tras un atrapamiento.',
              'Contusión muscular importante o hematoma en expansión.',
              'Vendaje, férula o yeso demasiado apretados.',
              'Quemadura circunferencial de una extremidad.',
              'Reperfusión de una extremidad tras un periodo de isquemia.',
            ],
          },
        ],
      },
      {
        titulo: 'Signos y conducta',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Momento', 'Signo'],
            filas: [
              ['PRECOZ', 'Dolor desproporcionado a la lesión y que no cede con lo habitual'],
              ['PRECOZ', 'Dolor intenso al estirar pasivamente los dedos de la extremidad'],
              ['PRECOZ', 'Compartimento tenso y duro a la palpación, con edema que no deja fóvea'],
              ['Intermedio', 'Parestesias: hormigueo o acorchamiento en el territorio de los nervios del compartimento'],
              ['TARDÍO', 'Pérdida de fuerza y parálisis'],
              ['TARDÍO', 'Palidez y ausencia de pulso distal'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Los dos que hay que buscar activamente', texto: 'El dolor desproporcionado y el dolor al estirar pasivamente los dedos. El segundo se comprueba en segundos: se extienden con suavidad los dedos de la mano o del pie y se observa la reacción. Si duele mucho más de lo esperable, el hallazgo se documenta con la hora y se comunica.' },
          {
            tipo: 'lista',
            titulo: 'Qué se hace y qué no',
            items: [
              'Retirar o aflojar vendajes, férulas y ropa que compriman; comprobar y reajustar cualquier inmovilización propia.',
              'Mantener la extremidad al nivel del corazón: elevarla por encima reduce la presión con la que llega la sangre y puede empeorar la perfusión.',
              'No aplicar frío directo sobre el compartimento afectado: la vasoconstricción reduce aún más el aporte.',
              'Analgesia según alcance y protocolo, sabiendo que un alivio insuficiente es en sí mismo un dato.',
              'Reevaluar de forma repetida y documentar la evolución del dolor y de la tensión del compartimento.',
              'Traslado con prealerta: el tratamiento es quirúrgico y depende del tiempo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El paciente que no puede referir dolor', texto: 'En un paciente inconsciente, intoxicado o con lesión medular, los signos precoces —que son subjetivos— no existen. Ahí solo quedan la tensión del compartimento y el mecanismo. Es la situación en que el síndrome se diagnostica tarde con más frecuencia, y por eso se documenta la sospecha en la entrega.' },
        ],
      },
      F([PHTLS, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Síndrome compartimental', definicion: 'Aumento de la presión dentro de un compartimento muscular que impide la perfusión del tejido que contiene.' },
      { termino: 'Dolor al estiramiento pasivo', definicion: 'Dolor intenso al extender pasivamente los dedos de la extremidad; signo precoz que se busca activamente.' },
      { termino: 'Signo tardío', definicion: 'Hallazgo que aparece cuando el daño ya está avanzado, como la parálisis o la ausencia de pulso.' },
    ],
    flashcards: [
      { frente: '¿Por qué el pulso puede estar presente en un síndrome compartimental?', reverso: 'Porque colapsar el capilar exige mucha menos presión que colapsar la arteria principal.' },
      { frente: 'Los dos signos precoces que se buscan activamente', reverso: 'Dolor desproporcionado y dolor al estirar pasivamente los dedos.' },
      { frente: '¿Se eleva la extremidad por encima del corazón?', reverso: 'No: se mantiene al nivel del corazón, porque elevarla reduce la presión de llegada de la sangre.' },
      { frente: '¿Se aplica frío sobre el compartimento afectado?', reverso: 'No: la vasoconstricción reduce aún más el aporte.' },
      { frente: '¿En qué paciente se diagnostica tarde con más frecuencia?', reverso: 'En el inconsciente, intoxicado o con lesión medular, que no puede referir dolor.' },
    ],
    quiz: [
      {
        pregunta: 'Fractura de tibia inmovilizada. Dos horas después el dolor es desproporcionado, el compartimento está tenso y duele mucho al estirar los dedos del pie, pero el pulso pedio está presente. ¿Qué haces?',
        opciones: [
          'Descartas síndrome compartimental porque hay pulso.',
          'Sospechas síndrome compartimental, aflojas la inmovilización, mantienes la extremidad al nivel del corazón y trasladas con prealerta.',
          'Elevas la extremidad por encima del corazón y aplicas frío.',
          'Aprietas la férula para estabilizar mejor.',
        ],
        correcta: 1,
        explicacion: 'El pulso presente no descarta nada: su ausencia es un signo tardío.',
      },
      {
        pregunta: '¿Por qué no se eleva la extremidad por encima del corazón en este cuadro?',
        opciones: [
          'Porque aumenta el edema.',
          'Porque reduce la presión con la que la sangre llega al compartimento y puede empeorar la perfusión.',
          'Porque impide inmovilizar.',
          'Porque provoca dolor.',
        ],
        correcta: 1,
        explicacion: 'El objetivo es mantener el aporte, no reducirlo.',
      },
      {
        pregunta: 'Paciente inconsciente con fractura de antebrazo. ¿Qué te queda para sospechar el síndrome?',
        opciones: [
          'Nada: sin dolor no puede sospecharse.',
          'La tensión del compartimento a la palpación y el mecanismo, documentando la sospecha en la entrega.',
          'La ausencia de pulso exclusivamente.',
          'La coloración de la piel del tronco.',
        ],
        correcta: 1,
        explicacion: 'Los signos precoces son subjetivos, y por eso en estos pacientes el diagnóstico se retrasa con frecuencia.',
      },
      {
        pregunta: '¿Cuál de estas situaciones puede provocarlo sin fractura?',
        opciones: [
          'Una contusión muscular importante, una quemadura circunferencial o una férula demasiado apretada.',
          'Una herida superficial.',
          'Un esguince leve de tobillo.',
          'Una luxación de hombro reducida.',
        ],
        correcta: 0,
        explicacion: 'Cualquier cosa que aumente el contenido o reduzca el continente puede desencadenarlo.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La ausencia de pulso distal en el síndrome compartimental es un signo ___.',
          opciones: ['precoz', 'tardío', 'inespecífico'],
          correcta: 1,
          explicacion: 'Esperar a que falte el pulso es esperar demasiado.',
        },
        {
          texto: 'El dolor al ___ pasivamente los dedos es uno de los dos signos precoces que se buscan de forma activa.',
          opciones: ['flexionar contra resistencia', 'estirar', 'percutir'],
          correcta: 1,
          explicacion: 'Se comprueba en segundos y aporta mucha información.',
        },
        {
          texto: 'Ante la sospecha, lo primero que se revisa es cualquier ___ propia que pueda estar comprimiendo.',
          opciones: ['analgesia', 'inmovilización', 'vía venosa'],
          correcta: 1,
          explicacion: 'Vendajes y férulas demasiado apretados son una causa evitable y frecuente.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-tme-aplastamiento': {
    icono: 'cp-servier-fibra-muscular',
    duracion: '15 min',
    resumen: 'Cuando una masa muscular permanece comprimida durante un tiempo prolongado, las células '
      + 'se destruyen y liberan su contenido. Mientras la compresión se mantiene, ese contenido queda '
      + 'confinado; al liberar al paciente, entra de golpe en la circulación. Por eso el momento más '
      + 'peligroso de un atrapamiento no es cuando se encuentra a la víctima, sino cuando se la '
      + 'libera. La preparación antes de retirar el peso es la esencia de este tema.',
    objetivos: [
      'Explicar la fisiopatología del síndrome de aplastamiento y el riesgo de la liberación.',
      'Reconocer las situaciones de riesgo y anticipar el deterioro.',
      'Coordinar la preparación previa a la liberación conforme al protocolo.',
    ],
    secciones: [
      {
        titulo: 'Qué pasa en el músculo comprimido',
        bloques: [
          { tipo: 'p', texto: 'La compresión sostenida corta el aporte de sangre al músculo. Sin oxígeno, la célula muscular se rompe y libera su contenido: potasio, mioglobina, ácidos y otras sustancias. Mientras el peso sigue encima, ese contenido permanece confinado en el territorio comprimido, porque no hay circulación que lo arrastre. Al mismo tiempo, el músculo dañado atrae líquido desde la sangre y lo secuestra.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El peligro está en la liberación', texto: 'Al retirar la compresión se restablece la circulación y todo lo acumulado entra de golpe al torrente. El potasio liberado puede alterar el ritmo cardiaco, la mioglobina puede dañar el riñón y la salida masiva de líquido hacia el músculo puede producir hipotensión. Un paciente que hablaba tranquilamente bajo los escombros puede deteriorarse en minutos justo después de ser liberado.' },
          {
            tipo: 'lista',
            titulo: 'Cuándo se sospecha',
            items: [
              'Atrapamiento de una masa muscular importante —muslo, pierna, glúteo, tronco— durante un tiempo prolongado.',
              'Derrumbes, accidentes industriales, agrícolas y de tráfico con atrapamiento.',
              'Personas encontradas caídas e inmóviles durante horas, apoyadas sobre una extremidad, aunque no haya ningún peso encima.',
              'Compresión por el propio cuerpo en pacientes inconscientes o intoxicados.',
              'Cualquier extremidad que, tras la liberación, aparezca fría, dura, edematosa e insensible.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'No hace falta un derrumbe', texto: 'La imagen clásica es la de la víctima bajo un edificio, pero la situación más frecuente es mucho más doméstica: una persona mayor que cae, no puede levantarse y permanece horas sobre su propio brazo o cadera. El músculo comprimido por el peso del propio cuerpo sufre el mismo proceso.' },
        ],
      },
      {
        titulo: 'Antes, durante y después de liberar',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'La regla que ordena todo el tema', texto: 'Si el paciente lleva atrapado un tiempo prolongado y su situación lo permite, el tratamiento empieza ANTES de retirar el peso, no después. Qué se administra, en qué cantidad y con qué monitorización lo determina el protocolo del servicio y la dirección médica; esta lección no publica pautas. Lo que sí establece es que la liberación se coordina y no se improvisa.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia de trabajo',
            items: [
              'Seguridad de la escena y coordinación con el servicio de rescate: nadie libera nada por su cuenta en una estructura inestable.',
              'Contacto con el paciente y valoración inicial mientras sigue atrapado, con protección térmica desde el primer momento.',
              'Averiguar y anotar cuánto tiempo lleva atrapado y qué masa muscular está comprimida.',
              'Preparar antes de liberar: accesos, fluidos, monitorización y el resto de medidas que autorice el protocolo, con la dirección médica informada.',
              'Avisar a todo el equipo del momento exacto de la liberación, para que la vigilancia se concentre ahí.',
              'Tras liberar: reevaluación inmediata y continua, con especial atención al ritmo cardiaco y a la presión arterial.',
              'No colocar torniquete de rutina sobre la extremidad liberada: su uso responde a la indicación de hemorragia y a lo que fije el protocolo, no a la contención del síndrome.',
              'Traslado a un centro con capacidad para tratar sus complicaciones, con prealerta explícita del tiempo de atrapamiento.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La extremidad liberada también sufre', texto: 'Tras la liberación es frecuente que la extremidad se hinche de forma llamativa y desarrolle un síndrome compartimental. Se vigila igual que en el tema anterior, sin apretar vendajes, sin elevar por encima del corazón y sin aplicar frío directo, y se comunica la evolución.' },
        ],
      },
      F([PHTLS, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Síndrome de aplastamiento', definicion: 'Conjunto de alteraciones sistémicas por liberación del contenido de células musculares destruidas tras una compresión prolongada.' },
      { termino: 'Mioglobina', definicion: 'Proteína del músculo que, liberada en gran cantidad, puede dañar el riñón.' },
      { termino: 'Síndrome de liberación', definicion: 'Deterioro brusco que aparece al retirar la compresión y restablecerse la circulación del territorio afectado.' },
      { termino: 'Secuestro de líquido', definicion: 'Paso de líquido desde la sangre hacia el músculo dañado, que contribuye a la hipotensión.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el momento más peligroso del atrapamiento?', reverso: 'La liberación: el contenido acumulado entra de golpe en la circulación.' },
      { frente: 'Tres consecuencias de esa entrada', reverso: 'Alteración del ritmo cardiaco por el potasio, daño renal por la mioglobina e hipotensión por el secuestro de líquido.' },
      { frente: '¿Hace falta un derrumbe?', reverso: 'No: una persona caída durante horas sobre su propio brazo o cadera sufre el mismo proceso.' },
      { frente: '¿Cuándo empieza el tratamiento?', reverso: 'Antes de retirar el peso, si la situación lo permite y conforme al protocolo.' },
      { frente: '¿Se coloca torniquete de rutina en la extremidad liberada?', reverso: 'No: el torniquete responde a la indicación de hemorragia y a lo que fije el protocolo.' },
      { frente: '¿Qué dato se anota siempre y se comunica?', reverso: 'El tiempo de atrapamiento y qué masa muscular estaba comprimida.' },
    ],
    quiz: [
      {
        pregunta: 'Trabajador atrapado bajo una carga desde hace tres horas, consciente y hablando con normalidad. ¿Qué anticipas?',
        opciones: [
          'Que si habla bien no habrá complicaciones.',
          'Que el deterioro puede aparecer justo al liberarlo, y que la preparación debe hacerse antes de retirar el peso conforme al protocolo.',
          'Que hay que liberarlo cuanto antes sin más preparación.',
          'Que el problema principal será la fractura de la extremidad.',
        ],
        correcta: 1,
        explicacion: 'La entrada brusca de lo acumulado a la circulación es lo que define el riesgo de este cuadro.',
      },
      {
        pregunta: 'Mujer de 88 años encontrada en el suelo tras doce horas, apoyada sobre la cadera derecha. ¿Es aplicable este tema?',
        opciones: [
          'No: no hubo ningún peso encima.',
          'Sí: el músculo comprimido por el peso del propio cuerpo sufre el mismo proceso.',
          'Solo si hay fractura asociada.',
          'Solo en pacientes jóvenes.',
        ],
        correcta: 1,
        explicacion: 'Es la presentación más frecuente y la que con más facilidad se pasa por alto.',
      },
      {
        pregunta: 'Tras la liberación, la extremidad se hincha, está dura e insensible. ¿Qué haces?',
        opciones: [
          'Aprietas un vendaje para contener el edema.',
          'Vigilas el síndrome compartimental: no aprietas, no elevas por encima del corazón, no aplicas frío directo, y comunicas la evolución.',
          'Elevas la extremidad todo lo posible.',
          'Aplicas frío directo sobre la piel.',
        ],
        correcta: 1,
        explicacion: 'Las tres medidas incorrectas reducen aún más la perfusión del compartimento.',
      },
      {
        pregunta: '¿Por qué se avisa a todo el equipo del momento exacto de la liberación?',
        opciones: [
          'Por coordinación administrativa.',
          'Para que la vigilancia se concentre justo cuando puede producirse el deterioro brusco.',
          'Para retirar el material de rescate.',
          'Para iniciar el traslado sin más valoraciones.',
        ],
        correcta: 1,
        explicacion: 'El momento de la liberación es el punto crítico de todo el rescate.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la atención de un paciente atrapado con riesgo de síndrome de aplastamiento',
        pasos: [
          'Asegurar la escena y coordinarse con el servicio de rescate',
          'Contactar con el paciente, valorarlo y protegerlo térmicamente mientras sigue atrapado',
          'Anotar el tiempo de atrapamiento y la masa muscular comprimida',
          'Preparar accesos, fluidos y monitorización conforme al protocolo ANTES de retirar el peso',
          'Avisar al equipo del momento exacto de la liberación',
          'Reevaluar de forma inmediata y continua tras liberar, vigilando ritmo y presión',
          'Trasladar con prealerta explícita del tiempo de atrapamiento',
        ],
      },
    },
    revision: ficha({
      fuentes: FU,
      extra: ['BLOQUEO PARCIAL: no se publican pautas de fluidos, de alcalinización ni de manejo del potasio. Dependen del protocolo del servicio, del material disponible y de la dirección médica.'],
    }),
  },

  'm5-tme-ferulas-sager-hare': {
    icono: 'ic-fractura',
    duracion: '14 min',
    resumen: 'La férula de tracción tiene una indicación estrecha y muy concreta: la fractura de la '
      + 'diáfisis del fémur, aislada y cerrada. Aplica una tracción sostenida que alinea el hueso, '
      + 'reduce el espasmo muscular y disminuye el espacio donde se acumula la sangre. La Hare tracciona '
      + 'apoyándose en el isquion con un anillo, y la Sager lo hace desde la cara interna del muslo. '
      + 'Las contraindicaciones son tan importantes como la técnica.',
    objetivos: [
      'Indicar correctamente la férula de tracción y enumerar sus contraindicaciones.',
      'Distinguir el fundamento de los modelos Sager y Hare.',
      'Aplicar la secuencia general y la comprobación neurovascular asociada.',
    ],
    secciones: [
      {
        titulo: 'Para qué sirve y cuándo no se usa',
        bloques: [
          { tipo: 'p', texto: 'Cuando se fractura la diáfisis del fémur, los músculos del muslo —que son potentes— se contraen y los extremos óseos cabalgan. Ese acortamiento aumenta el dolor, puede lesionar tejidos con los extremos y amplía el espacio donde se acumula la sangre. La tracción sostenida contrarresta ese espasmo: alinea, alivia y reduce el volumen disponible para el sangrado.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Contraindicaciones', texto: 'No se usa férula de tracción si hay sospecha de fractura de pelvis, si la lesión afecta a la cadera o hay sospecha de luxación de cadera, si hay lesión de rodilla o del propio extremo distal del fémur, si hay fractura de la pierna, del tobillo o del pie en esa extremidad, si hay amputación parcial o avulsión con el segmento distal comprometido, ni cuando la extremidad presenta lesiones que impidan apoyar los puntos de tracción. Ante la duda, se inmoviliza con otro método.' },
          {
            tipo: 'tabla',
            headers: ['Modelo', 'Dónde apoya la contratracción', 'Particularidad'],
            filas: [
              ['Hare', 'Anillo acolchado apoyado contra el isquion, en la raíz del muslo', 'Se extiende más allá del pie; requiere espacio y sujeción del tobillo'],
              ['Sager', 'Barra apoyada en la cara interna del muslo, contra la región perineal', 'Se coloca entre las piernas, es más compacta y permite traccionar ambos fémures'],
            ],
          },
        ],
      },
      {
        titulo: 'Cómo se aplica y qué se vigila',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia general, con dos operadores',
            items: [
              'Confirmar la indicación y descartar las contraindicaciones.',
              'Exponer la extremidad y retirar lo que pueda comprimir.',
              'Valorar pulso, sensibilidad y movilidad distales y anotarlo con la hora.',
              'Un operador mantiene una tracción manual suave y sostenida mientras el otro prepara y coloca el dispositivo.',
              'Medir el dispositivo sobre la extremidad sana antes de aplicarlo, conforme a las instrucciones del fabricante.',
              'Colocar el apoyo de contratracción y las sujeciones, acolchando los puntos de presión.',
              'Aplicar la tracción de forma progresiva hasta que el dolor y el espasmo cedan y la longitud se aproxime a la del lado sano, sin perseguir una cifra.',
              'Volver a valorar pulso, sensibilidad y movilidad y anotarlo.',
              'Reevaluar durante todo el traslado: la tracción puede aflojarse o excederse con el movimiento.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La cantidad de tracción no es una cifra de esta lección', texto: 'Cada dispositivo tiene su sistema de aplicación y su indicador, y las instrucciones del fabricante y el protocolo del servicio son los que fijan cómo se ajusta. El criterio clínico es el alivio del dolor y del espasmo con recuperación aproximada de la longitud, no un número. Esta lección no publica ningún valor de fuerza ni de peso.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los puntos de apoyo también lesionan', texto: 'La contratracción se ejerce sobre la región perineal o el isquion, zonas sensibles y con estructuras vulnerables. Un apoyo mal colocado o una tracción excesiva y prolongada pueden producir lesión local. Se acolcha, se comprueba la posición tras cada movilización y se documenta la hora de colocación.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Férula de tracción', definicion: 'Dispositivo que aplica tracción sostenida sobre la extremidad para contrarrestar el espasmo muscular en la fractura de la diáfisis del fémur.' },
      { termino: 'Contratracción', definicion: 'Apoyo proximal contra el que el dispositivo ejerce la fuerza: el isquion en la Hare y la cara interna del muslo en la Sager.' },
      { termino: 'Diáfisis femoral', definicion: 'Porción media y alargada del fémur; única localización en que está indicada la férula de tracción.' },
    ],
    flashcards: [
      { frente: 'Indicación de la férula de tracción', reverso: 'Fractura de la diáfisis del fémur, aislada y cerrada.' },
      { frente: 'Cuatro contraindicaciones', reverso: 'Sospecha de fractura de pelvis, lesión o luxación de cadera, lesión de rodilla, y fractura de pierna, tobillo o pie de esa extremidad.' },
      { frente: '¿Dónde apoya la contratracción la Hare?', reverso: 'En un anillo acolchado contra el isquion.' },
      { frente: '¿Y la Sager?', reverso: 'En una barra apoyada en la cara interna del muslo, contra la región perineal.' },
      { frente: '¿Cuál es el criterio para dejar de traccionar?', reverso: 'El alivio del dolor y del espasmo con recuperación aproximada de la longitud, no una cifra.' },
      { frente: '¿Cuántos operadores se necesitan?', reverso: 'Dos: uno mantiene la tracción manual mientras el otro coloca el dispositivo.' },
    ],
    quiz: [
      {
        pregunta: 'Fractura cerrada de la diáfisis femoral aislada, con pelvis y rodilla sin hallazgos. ¿Está indicada la férula de tracción?',
        opciones: [
          'No: nunca se usa en el ámbito prehospitalario.',
          'Sí: es su indicación exacta, aplicada con dos operadores y con comprobación neurovascular antes y después.',
          'Solo si el paciente está inconsciente.',
          'Solo si hay amputación parcial asociada.',
        ],
        correcta: 1,
        explicacion: 'La indicación es estrecha y este caso la cumple.',
      },
      {
        pregunta: 'El mismo paciente presenta además dolor e inestabilidad en la pelvis. ¿Qué cambia?',
        opciones: [
          'Nada: la fractura de fémur manda.',
          'La férula de tracción queda contraindicada: se inmoviliza con otro método y se estabiliza la pelvis conforme al protocolo.',
          'Se aplica más tracción para compensar.',
          'Se aplica la férula solo durante el traslado.',
        ],
        correcta: 1,
        explicacion: 'La sospecha de fractura de pelvis es una de las contraindicaciones explícitas.',
      },
      {
        pregunta: '¿Cómo se decide cuánta tracción aplicar?',
        opciones: [
          'Con una cifra fija de fuerza igual para todos los pacientes.',
          'Progresivamente, hasta que ceden el dolor y el espasmo y la longitud se aproxima a la del lado sano, conforme al dispositivo y al protocolo.',
          'Hasta que la extremidad supere la longitud del lado sano.',
          'Hasta que desaparezca el pulso distal.',
        ],
        correcta: 1,
        explicacion: 'El criterio es clínico; el ajuste concreto lo fijan el fabricante y el protocolo.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente motociclista con deformidad en el muslo derecho y, además, dolor intenso en la rodilla de esa misma pierna con imposibilidad de movilizarla. ¿Colocas férula de tracción?',
          opciones: [
            'Sí: la deformidad del muslo indica fractura de diáfisis femoral.',
            'No: la lesión de rodilla en esa extremidad es una contraindicación; inmovilizo con otro método y comprueba el estado neurovascular antes y después.',
            'Sí, pero aplicando menos tracción de lo habitual.',
            'Sí, siempre que el paciente lo tolere.',
          ],
          correcta: 1,
          explicacion: 'La lección enumera la lesión de rodilla entre las contraindicaciones y establece que ante la duda se inmoviliza con otro método.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'No se publica ninguna cifra de fuerza, peso o porcentaje de tracción: dependen del dispositivo real y de las instrucciones del fabricante.',
        'DECISIÓN PENDIENTE: la academia debe declarar qué modelo de férula de tracción usa el servicio para que la lección pueda remitir a sus instrucciones concretas.',
      ],
    }),
  },

  'm5-tme-farmacos': {
    icono: 'cp-servier-tableta',
    duracion: '14 min',
    resumen: 'El plan pide estudiar los fármacos usados en el trauma aislado de extremidades en un '
      + 'paciente estable: antiinflamatorios no esteroideos, opioides y cloruro de etilo. Esta lección '
      + 'enseña para qué sirve cada grupo, qué lo limita y qué hay que vigilar, y declara un bloqueo '
      + 'explícito sobre las cifras. Ninguna dosis, concentración ni pauta se publica aquí: dependen '
      + 'del producto registrado, del formulario del servicio y de la dirección médica.',
    objetivos: [
      'Diferenciar el papel de los AINE, de los opioides y del cloruro de etilo en el trauma de extremidades.',
      'Reconocer las limitaciones y los efectos que obligan a vigilar en cada grupo.',
      'Aplicar el marco de autorización que condiciona cualquier administración.',
    ],
    secciones: [
      {
        titulo: 'Bloqueo declarado',
        bloques: [
          { tipo: 'callout', variante: 'dosis', titulo: 'Por qué esta lección no trae números', texto: 'No encontrarás dosis, concentraciones, intervalos ni vías preferentes. Una cifra solo se publica cuando constan la población, la indicación, la vía, la Información para Prescribir del producto registrado en México y el protocolo que autoriza su administración, y ninguno de esos datos se ha entregado a la academia. Lo que sí se enseña es el razonamiento farmacológico: para qué sirve cada grupo, qué lo limita, qué efectos obligan a vigilar y qué hay que preguntar antes. ALCANCE: estudiar esta lección no autoriza a administrar nada.' },
          { tipo: 'p', texto: 'Antes de cualquier administración se comprueban tres cosas: que el fármaco esté en el formulario del servicio y disponible en la unidad, que el prestador tenga el alcance autorizado para administrarlo, y que exista una indicación respaldada por el protocolo o por la dirección médica. Si falta cualquiera de las tres, no se administra.' },
        ],
      },
      {
        titulo: 'Los tres grupos',
        bloques: [
          { tipo: 'p', texto: '**Antiinflamatorios no esteroideos.** Alivian el dolor de origen inflamatorio y musculoesquelético, que es justo el de esta unidad, y no deprimen la conciencia ni la respiración. Sus límites vienen de sus efectos: pueden dañar la mucosa digestiva, comprometer la función renal en un paciente hipovolémico o deshidratado, y afectar a la coagulación en el caso de algunos de ellos. En un traumatizado con sangrado, con shock o con enfermedad renal previa, esas propiedades dejan de ser secundarias. Además, la alergia a estos fármacos es frecuente y hay que preguntarla siempre.' },
          { tipo: 'p', texto: '**Opioides.** Actúan sobre el sistema nervioso central y controlan un dolor intenso que los anteriores no alcanzan, lo que en el trauma de extremidades permite inmovilizar y trasladar a un paciente que de otro modo no lo toleraría. Su precio es conocido: depresión respiratoria, descenso del nivel de conciencia, hipotensión, náusea y vómito, y picor. Por eso su administración exige poder vigilar la respiración y la conciencia, tener el material de soporte a mano y una autorización explícita. Preguntar por consumo previo de otros depresores, incluido el alcohol, forma parte de la comprobación.' },
          { tipo: 'p', texto: '**Cloruro de etilo.** Es un anestésico local por evaporación: al pulverizarse sobre la piel se evapora muy deprisa, enfría la zona y reduce de forma breve la sensibilidad superficial. Su efecto es superficial y de muy corta duración, así que no sirve para el dolor de una fractura ni sustituye a una analgesia sistémica. Es inflamable, no se aplica sobre heridas abiertas ni sobre mucosas, no se usa cerca de los ojos, y su aplicación prolongada sobre el mismo punto puede producir lesión por frío. Su uso, si el servicio lo contempla, está limitado a procedimientos superficiales muy concretos.' },
          {
            tipo: 'tabla',
            titulo: 'Comparación',
            headers: ['Grupo', 'Alcance del alivio', 'Qué obliga a vigilar'],
            filas: [
              ['AINE', 'Dolor leve a moderado de origen musculoesquelético', 'Mucosa digestiva, función renal en el hipovolémico, coagulación y alergia'],
              ['Opioide', 'Dolor intenso', 'Respiración, nivel de conciencia, presión arterial y vómito'],
              ['Cloruro de etilo', 'Sensibilidad superficial, muy breve', 'Inflamabilidad, lesión por frío, contacto con heridas, mucosas y ojos'],
            ],
          },
        ],
      },
      {
        titulo: 'Lo que siempre se hace',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Antes, durante y después',
            items: [
              'Medir el dolor de forma reproducible antes de tratar, con la escala que use el servicio, y volver a medirlo después.',
              'Preguntar por alergias, por medicación habitual, por consumo de alcohol u otras sustancias, y por embarazo cuando corresponda.',
              'Recordar que la inmovilización correcta, la posición cómoda, la elevación y el frío conforme al protocolo son analgesia también, y que no requieren autorización farmacológica.',
              'Registrar qué se administró, cuánto, por qué vía, a qué hora, quién lo autorizó y cómo respondió el paciente.',
              'Vigilar y documentar los efectos, no solo el alivio.',
              'Comunicar en la entrega todo lo administrado, aunque el paciente parezca cómodo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El dolor mal tratado no es un asunto menor', texto: 'Un dolor intenso no controlado dificulta la inmovilización, empeora la tolerancia del traslado y deja al paciente sin capacidad de colaborar en su propia valoración. Tratarlo dentro del alcance autorizado forma parte del tratamiento del trauma, no de la cortesía.' },
        ],
      },
      F([COFEPRIS, PROTOCOLO_LOCAL, PHTLS, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Antiinflamatorio no esteroideo', definicion: 'Grupo de fármacos que alivian el dolor de origen inflamatorio sin deprimir la conciencia ni la respiración.' },
      { termino: 'Opioide', definicion: 'Analgésico de acción central para dolor intenso, con riesgo de depresión respiratoria, sedación e hipotensión.' },
      { termino: 'Cloruro de etilo', definicion: 'Anestésico local por evaporación, de efecto superficial y muy breve; inflamable y no aplicable sobre heridas ni mucosas.' },
      { termino: 'Formulario del servicio', definicion: 'Relación de fármacos que el servicio tiene autorizados y disponibles, con sus presentaciones.' },
      { termino: 'Analgesia no farmacológica', definicion: 'Inmovilización correcta, posición, elevación y frío conforme al protocolo; alivian sin requerir autorización farmacológica.' },
    ],
    flashcards: [
      { frente: '¿Qué tres condiciones se comprueban antes de administrar?', reverso: 'Que el fármaco esté en el formulario y disponible, que el prestador tenga alcance autorizado y que exista indicación respaldada.' },
      { frente: 'Límites de los AINE en un traumatizado', reverso: 'Mucosa digestiva, función renal en el hipovolémico, efecto sobre la coagulación y alergia frecuente.' },
      { frente: 'Efectos que obligan a vigilar tras un opioide', reverso: 'Depresión respiratoria, descenso de la conciencia, hipotensión y vómito.' },
      { frente: '¿Sirve el cloruro de etilo para el dolor de una fractura?', reverso: 'No: su efecto es superficial y muy breve, y no sustituye a una analgesia sistémica.' },
      { frente: 'Tres precauciones del cloruro de etilo', reverso: 'Es inflamable, no se aplica sobre heridas ni mucosas ni cerca de los ojos, y puede producir lesión por frío.' },
      { frente: '¿Qué analgesia no requiere autorización farmacológica?', reverso: 'La inmovilización correcta, la posición cómoda, la elevación y el frío conforme al protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con fractura de tobillo aislada, estable, con dolor moderado y antecedente de enfermedad renal. ¿Qué consideración añade ese antecedente?',
        opciones: [
          'Ninguna: el dolor es moderado.',
          'Que los AINE pueden comprometer la función renal, sobre todo si además hay hipovolemia; la elección corresponde al protocolo y a la dirección médica.',
          'Que debe recibir un opioide sin más valoración.',
          'Que no se puede administrar ninguna analgesia.',
        ],
        correcta: 1,
        explicacion: 'El antecedente cambia el perfil de riesgo del grupo, y la decisión no la toma esta lección.',
      },
      {
        pregunta: 'Se administra un opioide dentro del alcance autorizado. ¿Qué se vigila de forma específica?',
        opciones: [
          'Solo el alivio del dolor.',
          'La respiración, el nivel de conciencia, la presión arterial y la aparición de vómito, además del alivio.',
          'La temperatura corporal exclusivamente.',
          'La coloración de la extremidad lesionada.',
        ],
        correcta: 1,
        explicacion: 'Son los efectos que definen el margen de seguridad de este grupo.',
      },
      {
        pregunta: 'Un compañero propone usar cloruro de etilo sobre una herida abierta del antebrazo para «dormir la zona». ¿Qué respondes?',
        opciones: [
          'Que es correcto y de efecto prolongado.',
          'Que no se aplica sobre heridas abiertas ni mucosas, que su efecto es superficial y muy breve, y que además es inflamable.',
          'Que debe aplicarse durante varios minutos seguidos.',
          'Que sustituye a la analgesia sistémica en fracturas.',
        ],
        correcta: 1,
        explicacion: 'La lección enumera exactamente esas limitaciones.',
      },
      {
        pregunta: 'Buscas en esta lección la dosis del analgésico y no aparece. ¿Por qué?',
        opciones: [
          'Por un olvido de redacción.',
          'Porque una cifra requiere población, indicación, vía, Información para Prescribir del producto registrado y protocolo que la autorice, y esos datos no se han entregado.',
          'Porque estos fármacos no se usan en trauma.',
          'Porque la dosis es la misma para todos los pacientes.',
        ],
        correcta: 1,
        explicacion: 'El bloqueo está declarado en la propia lección y en su ficha editorial.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente con fractura de fémur, dolor muy intenso, presión arterial en el límite bajo y tendencia a la somnolencia. Tu protocolo autoriza analgesia. ¿Qué razonamiento aplicas antes de nada?',
          opciones: [
            'Administro el analgésico más potente disponible sin más comprobaciones.',
            'Considero que la hipotensión y el descenso de conciencia son efectos que este tipo de analgesia puede agravar, verifico alcance, disponibilidad e indicación respaldada, priorizo la analgesia no farmacológica —inmovilización y posición— y consulto conforme al protocolo.',
            'Descarto toda analgesia por la presión arterial.',
            'Aplico cloruro de etilo sobre el muslo.',
          ],
          correcta: 1,
          explicacion: 'La lección enseña a cruzar el perfil de efectos del grupo con el estado del paciente, a comprobar las tres condiciones de autorización y a recordar que la inmovilización correcta también es analgesia.',
        },
      ],
    },
    revision: ficha({
      fuentes: [
        'COFEPRIS. Información para Prescribir (fichas de producto pendientes).',
        'Protocolo, formulario y dirección médica del servicio (pendiente de entrega).',
        'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
      ],
      extra: [
        'BLOQUEO PARCIAL DECLARADO: no se publica ninguna dosis, concentración, intervalo ni vía preferente. Requiere formulario, presentaciones, IPP de los productos registrados y dirección médica.',
        'DECISIÓN PENDIENTE: la academia debe declarar qué analgésicos tiene el servicio, en qué presentación y con qué alcance autorizado para cada nivel de prestador.',
      ],
    }),
  },
}
