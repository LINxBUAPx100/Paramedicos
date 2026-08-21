// ============================================================
//  MÓDULO 6 — Unidad «TRAUMA PEDIÁTRICO»
// ------------------------------------------------------------
//  Los 5 temas de la unidad.
//
//  ERRATA DEL PLAN: el título oficial del último tema escribe «Osteólisis»
//  para designar el acceso vascular óseo. Se conserva como título documental y
//  el alumno ve «Acceso intraóseo en pediatría (osteoclisis)». La lección
//  explica la errata una sola vez y no vuelve a usar el término incorrecto.
//
//  LÍMITES: no se publican dosis, calibres, sitios exactos de punción ni
//  tamaños de dispositivo. El acceso intraóseo se enseña en su fundamento y en
//  su indicación; su ejecución depende del alcance autorizado, del dispositivo
//  real de la unidad y de la dirección médica.
//
//  Fuentes asignadas por el registro para `m6-trauma-pediatrico`: PHTLS 9.ª ed.
//  (capítulo pendiente), AHA/AAP PBLS 2025 y AHA PALS 2025; requiere protocolo
//  local. La copia de PHTLS 10 declara traducción automática y no se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4).',
  nota: 'Base curricular histórica declarada por el plan. Capítulo y página PENDIENTES para el trauma '
    + 'pediátrico: no se localizaron de forma reproducible en la copia licenciada. No se cita la 10.ª '
    + 'edición: la copia disponible declara traducción automática.',
}
const AHA_PALS_2025 = {
  nombre: 'AHA 2025 Pediatric Advanced Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support',
  nota: 'Guía primaria actual del soporte vital avanzado pediátrico, incluidos los accesos vasculares. '
    + 'PENDIENTE: apartado exacto; no sostiene ninguna cifra concreta de esta unidad.',
}
const AHA_PBLS_2025 = {
  nombre: 'AHA/AAP 2025 Pediatric Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',
  nota: 'Guía primaria actual del soporte vital básico pediátrico. PENDIENTE: apartado exacto.',
}
const ACS_TRIAJE = {
  nombre: 'American College of Surgeons. National Guideline for the Field Triage of Injured Patients, '
    + 'revisión 2021.',
  url: 'https://www.facs.org/quality-programs/trauma/systems/field-triage-guidelines/',
  nota: 'Actualización rectora del uso del mecanismo para estimar riesgo y decidir destino, incluidos '
    + 'los criterios pediátricos. PENDIENTE: apartado exacto.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Buenas prácticas del ACS, incluidos los criterios de derivación a centro con capacidad '
    + 'pediátrica. PENDIENTE: guía y apartado exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE y manejo inicial del traumatizado. PENDIENTE: módulo y página '
    + 'exactos.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, equipamiento pediátrico, dispositivo intraóseo y dirección médica de la academia '
    + 'R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija el material por edad, el dispositivo '
    + 'disponible, el alcance autorizado y el destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publican dosis, volúmenes, calibres, tamaños de dispositivo ni rangos de '
  + 'normalidad por edad: dependen de la guía adoptada, de la cinta de referencia pediátrica y del '
  + 'protocolo del servicio.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: accesos vasculares, medicación, inmovilización, analgesia y '
  + 'destino dependen del alcance autorizado, del equipamiento y del protocolo del servicio.'
const MECANISMO = 'El mecanismo estima riesgo y orienta el triaje y el destino; no diagnostica una '
  + 'lesión concreta.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'PHTLS 9.ª ed. (capítulo pendiente); AHA PALS 2025; AHA/AAP PBLS 2025; ACS Field Triage 2021',
  observaciones: [
    'Redactado desde cero en el lote de Módulo 6; el tema estaba vacío.',
    MECANISMO,
    SIN_CIFRAS,
    PROTOCOLO,
    'DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 pendientes de localizar para el trauma pediátrico.',
    ...extra,
  ],
  fuentes,
})

const FU = [
  'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
  'AHA 2025 Pediatric Advanced Life Support.',
  'AHA/AAP 2025 Pediatric Basic Life Support.',
  'ACS. Guidelines for the Field Triage of Injured Patients, 2021.',
  'Protocolo local (pendiente de entrega).',
]

export default {
  'm6-tp-introduccion': {
    icono: 'ic-nino',
    duracion: '14 min',
    resumen: 'El trauma es la principal causa de muerte y de discapacidad en la infancia, y el niño '
      + 'traumatizado se comporta de forma distinta al adulto por tres razones: recibe la energía '
      + 'concentrada en un cuerpo pequeño, tiene los órganos menos protegidos y compensa el shock '
      + 'hasta muy tarde. La lección fija esas diferencias, sitúa el mecanismo como estimador de '
      + 'riesgo y recuerda dos enemigos que en pediatría pesan más: la hipotermia y la hipoglucemia.',
    objetivos: [
      'Explicar por qué la misma energía produce lesiones distintas en el niño.',
      'Aplicar el mecanismo como estimador de riesgo y criterio de destino.',
      'Anticipar la hipotermia y la hipoglucemia como agravantes propios de la edad.',
    ],
    secciones: [
      {
        titulo: 'La misma energía, un cuerpo distinto',
        bloques: [
          { tipo: 'p', texto: 'Cuando una energía determinada impacta sobre un cuerpo pequeño, se distribuye en menos masa y en menos superficie: la transferencia por unidad de tejido es mayor. A eso se suma que los órganos del niño están menos protegidos —el tórax es elástico, el abdomen tiene menos musculatura y la parrilla costal cubre menos el hígado y el bazo— y que su cabeza es proporcionalmente grande y pesada.' },
          {
            tipo: 'lista',
            titulo: 'Consecuencias prácticas',
            items: [
              'Es frecuente la lesión multisistémica: en el niño hay que asumir que hay más de una lesión hasta demostrar lo contrario.',
              'La cabeza se lesiona con más frecuencia, y el traumatismo craneal es la principal causa de muerte por trauma en esta edad.',
              'Puede haber lesión pulmonar sin fracturas costales, por la elasticidad del tórax.',
              'Hígado y bazo están más expuestos en el trauma abdominal cerrado.',
              'La lesión medular sin alteración radiológica evidente es más propia del niño que del adulto: la exploración y el mecanismo mandan sobre la imagen.',
              'El esqueleto en crecimiento tiene lesiones propias en las zonas de crecimiento.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El shock pediátrico engaña', texto: 'El niño mantiene la presión arterial a costa de taquicardia y vasoconstricción hasta que la compensación se agota, y entonces cae con rapidez. Reconocer el shock por la hipotensión es reconocerlo tarde: los datos que hay que buscar son la taquicardia mantenida, la piel fría y moteada, el relleno capilar lento, la debilidad del pulso periférico y la alteración del comportamiento.' },
        ],
      },
      {
        titulo: 'Mecanismo, destino y dos agravantes',
        bloques: [
          { tipo: 'p', texto: 'Como en el resto del temario, el mecanismo eleva o reduce la sospecha y pesa en la decisión de destino, pero no diagnostica una lesión. En pediatría añade además una comprobación propia: que el relato encaje con lo que ese niño puede hacer por su edad y su desarrollo. Cuando no encaja, se documenta con objetividad, como se estudia en el tema de abuso infantil.' },
          {
            tipo: 'lista',
            titulo: 'Mecanismos de especial atención',
            items: [
              'Atropello: la altura del frontal del vehículo determina qué región recibe el primer impacto en un peatón de baja estatura.',
              'Caída desde altura, valorada en relación con la propia estatura del niño.',
              'Colisión con sistema de retención inadecuado para su edad o peso, o mal colocado.',
              'Ahogamiento y lesiones en el agua.',
              'Quemaduras, cuya distribución debe ser congruente con el relato.',
              'Lesiones por objetos o mobiliario que caen sobre el niño.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Hipotermia e hipoglucemia', texto: 'Dos agravantes que en el niño aparecen antes y pesan más. Se enfría muy deprisa por su superficie corporal relativa, y el frío empeora la coagulación en un paciente que puede estar sangrando. Y sus reservas de glucosa son limitadas, de modo que un niño estresado, en ayunas o gravemente enfermo puede estar hipoglucémico, lo que agrava el estado neurológico y confunde la valoración. Cubrir y medir la glucemia, cuando está dentro del alcance, son dos medidas de bajo coste y alto rendimiento.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dónde se traslada', texto: 'Los criterios de traslado a un centro con capacidad pediátrica proceden de la guía de triaje de campo adoptada y del protocolo del servicio. La decisión combina mecanismo, fisiología, anatomía y factores propios del paciente, y no la fija esta lección.' },
        ],
      },
      F([PHTLS, ACS_TRIAJE, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Lesión multisistémica', definicion: 'Afectación simultánea de varios sistemas, frecuente en el niño por la distribución de la energía en un cuerpo pequeño.' },
      { termino: 'Shock compensado pediátrico', definicion: 'Situación en que el niño mantiene la presión arterial mediante taquicardia y vasoconstricción pese a una hipoperfusión establecida.' },
      { termino: 'Lesión medular sin alteración radiológica evidente', definicion: 'Déficit neurológico de origen medular sin hallazgos claros en la imagen inicial; más propio del niño que del adulto.' },
      { termino: 'Congruencia del relato', definicion: 'Correspondencia entre la explicación de la lesión y lo que el niño puede hacer según su edad y desarrollo.' },
    ],
    flashcards: [
      { frente: '¿Por qué la misma energía lesiona más al niño?', reverso: 'Porque se distribuye en menos masa y menos superficie, y sus órganos están menos protegidos.' },
      { frente: '¿Cuál es la principal causa de muerte por trauma en la infancia?', reverso: 'El traumatismo craneal.' },
      { frente: '¿Cómo se reconoce el shock pediátrico?', reverso: 'Por taquicardia mantenida, piel fría y moteada, relleno capilar lento, pulso periférico débil y cambio de comportamiento; no por la hipotensión.' },
      { frente: 'Dos agravantes propios de la edad', reverso: 'La hipotermia y la hipoglucemia.' },
      { frente: '¿Puede haber lesión pulmonar sin fracturas costales?', reverso: 'Sí: el tórax elástico del niño transmite la energía sin romper las costillas.' },
      { frente: '¿Qué comprobación añade el mecanismo en pediatría?', reverso: 'Que el relato encaje con lo que ese niño puede hacer por su edad y desarrollo.' },
    ],
    quiz: [
      {
        pregunta: 'Niño atropellado, consciente, con frecuencia cardiaca elevada, piel fría y moteada y presión arterial normal. ¿Cómo lo interpretas?',
        opciones: [
          'Estable: la presión es normal.',
          'Shock compensado: la presión se mantiene a costa de taquicardia y vasoconstricción, y caerá con rapidez si no se corrige.',
          'Ansiedad por el accidente.',
          'Hipotermia aislada.',
        ],
        correcta: 1,
        explicacion: 'Esperar a la hipotensión para reconocer el shock pediátrico es reconocerlo tarde.',
      },
      {
        pregunta: 'Niño politraumatizado con exploración torácica sin fracturas palpables y dificultad respiratoria creciente. ¿Qué consideras?',
        opciones: [
          'Que no hay lesión torácica.',
          'Que su tórax elástico puede haber transmitido la energía al pulmón sin romper costillas: cabe contusión pulmonar.',
          'Que el problema es exclusivamente abdominal.',
          'Que la dificultad es psicógena.',
        ],
        correcta: 1,
        explicacion: 'La ausencia de fracturas no descarta lesión pulmonar en el niño.',
      },
      {
        pregunta: '¿Por qué se mide la glucemia en un niño traumatizado con alteración del estado de conciencia?',
        opciones: [
          'Porque la hipoglucemia solo ocurre en diabéticos.',
          'Porque sus reservas de glucosa son limitadas y la hipoglucemia agrava el estado neurológico y confunde la valoración.',
          'Para calcular la dosis de analgesia.',
          'Para decidir el centro de destino.',
        ],
        correcta: 1,
        explicacion: 'Es una causa tratable que de otro modo se atribuiría al traumatismo craneal.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el niño traumatizado hay que asumir lesión ___ hasta demostrar lo contrario.',
          opciones: ['única', 'multisistémica', 'exclusivamente craneal'],
          correcta: 1,
          explicacion: 'La energía se distribuye en un cuerpo pequeño y afecta a varios sistemas a la vez.',
        },
        {
          texto: 'La hipotermia agrava al niño traumatizado porque empeora la ___.',
          opciones: ['ventilación', 'coagulación', 'glucemia únicamente'],
          correcta: 1,
          explicacion: 'En un paciente que puede estar sangrando, esa pérdida de capacidad es directa.',
        },
        {
          texto: 'Los criterios de traslado a centro con capacidad pediátrica proceden de la guía de triaje adoptada y del ___.',
          opciones: ['criterio del prestador', 'protocolo del servicio', 'relato de la familia'],
          correcta: 1,
          explicacion: 'La lección no fija umbrales propios de destino.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-tp-sistemas-corporales': {
    icono: 'cp-smart-esqueleto-nino',
    duracion: '15 min',
    resumen: 'Este tema recorre, sistema por sistema, qué cambia en el niño respecto al adulto ya '
      + 'estudiado en el Módulo 5. La cabeza domina el pronóstico; el cuello se lesiona en niveles más '
      + 'altos; el tórax transmite energía sin romperse; el abdomen deja hígado y bazo más expuestos; '
      + 'la pelvis y las extremidades tienen lesiones propias del hueso en crecimiento. No se '
      + 'reescriben aquí las lesiones del adulto: se señala lo que es distinto.',
    objetivos: [
      'Identificar las particularidades pediátricas de cada región traumatizada.',
      'Anticipar las lesiones más probables según la región y la edad.',
      'Relacionar cada particularidad con una decisión concreta de manejo.',
    ],
    secciones: [
      {
        titulo: 'Cabeza, cuello y columna',
        bloques: [
          { tipo: 'p', texto: 'La cabeza del niño es proporcionalmente grande y pesada, y su cuello, relativamente débil. Eso hace que en una desaceleración la cabeza actúe como una masa que arrastra al cuello, y explica que el traumatismo craneal sea tan frecuente y que las lesiones cervicales se produzcan en niveles más altos que en el adulto.' },
          {
            tipo: 'lista',
            titulo: 'Lo que cambia el manejo',
            items: [
              'Al inmovilizar en decúbito supino se acolcha bajo los hombros, porque el occipucio prominente flexiona el cuello.',
              'La fontanela abierta del lactante puede absorber durante un tiempo el aumento de volumen intracraneal: un abombamiento es un signo tardío y de alarma.',
              'El niño puede perder un volumen de sangre significativo en una herida del cuero cabelludo, algo poco habitual en el adulto.',
              'La lesión medular sin hallazgos claros en la imagen inicial obliga a decidir por exploración y mecanismo, no por la ausencia de imagen.',
              'El vómito tras un traumatismo craneal es frecuente en el niño y no equivale por sí solo a lesión intracraneal, pero el vómito repetido sí es un dato de alarma.',
            ],
          },
        ],
      },
      {
        titulo: 'Tórax, abdomen y pelvis',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Región', 'Particularidad pediátrica', 'Consecuencia'],
            filas: [
              ['Tórax', 'Costillas flexibles y mediastino móvil', 'Contusión pulmonar sin fracturas; peor tolerancia del neumotórax a tensión'],
              ['Abdomen', 'Pared con menos musculatura y parrilla costal que cubre menos', 'Hígado y bazo más expuestos; el manillar de bicicleta es un mecanismo clásico'],
              ['Abdomen', 'La distensión gástrica por llanto o por ventilación es frecuente', 'Puede simular distensión abdominal y dificultar la ventilación'],
              ['Pelvis', 'Fractura menos frecuente pero de alta energía cuando ocurre', 'Obliga a buscar lesión asociada y sangrado'],
              ['Extremidades', 'Hueso en crecimiento, con zonas de crecimiento vulnerables', 'Deformidad sin fractura completa y lesiones propias que la imagen define'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El cinturón mal colocado', texto: 'Un cinturón de adulto sobre un niño pequeño queda alto, sobre el abdomen en lugar de sobre la pelvis. En una desaceleración comprime las vísceras contra la columna y produce el patrón de lesión intestinal y de fractura lumbar por flexión-distracción. Encontrar la marca del cinturón en el abdomen de un niño obliga a buscar ambas cosas, aunque esté cómodo.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Buscar la lesión que no se ve', texto: 'Un niño puede tener una lesión abdominal significativa con un abdomen poco expresivo, y su capacidad de referir dolor es limitada. Como en el adulto, el shock sin hemorragia externa dirige la búsqueda al abdomen, al tórax, a la pelvis y a los huesos largos; en el niño se añade la posibilidad de una pérdida importante por el cuero cabelludo.' },
        ],
      },
      F([PHTLS, ACS_BEST, AHA_PALS_2025, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Fontanela abombada', definicion: 'Abombamiento de la zona blanda del cráneo del lactante; signo tardío de aumento de la presión intracraneal.' },
      { termino: 'Zona de crecimiento', definicion: 'Región del hueso en desarrollo, vulnerable a lesiones propias de la edad pediátrica.' },
      { termino: 'Distensión gástrica', definicion: 'Acumulación de aire en el estómago por llanto o ventilación; puede simular distensión abdominal y dificultar la ventilación.' },
      { termino: 'Marca del cinturón', definicion: 'Equimosis lineal abdominal que predice lesión intestinal y fractura lumbar por flexión-distracción.' },
    ],
    flashcards: [
      { frente: '¿Por qué el cuello del niño se lesiona en niveles más altos?', reverso: 'Porque su cabeza, grande y pesada, arrastra un cuello relativamente débil.' },
      { frente: '¿Qué significa una fontanela abombada?', reverso: 'Aumento de la presión intracraneal; es un signo tardío y de alarma.' },
      { frente: '¿Puede un niño perder volumen significativo por el cuero cabelludo?', reverso: 'Sí, a diferencia del adulto: se añade a los reservorios habituales de hemorragia.' },
      { frente: '¿Qué predice la marca del cinturón en el abdomen de un niño?', reverso: 'Lesión intestinal y fractura lumbar por flexión-distracción.' },
      { frente: '¿Qué órganos están más expuestos en el abdomen del niño?', reverso: 'El hígado y el bazo, por la menor cobertura de la parrilla costal y la menor musculatura.' },
      { frente: '¿Equivale el vómito tras un traumatismo craneal a lesión intracraneal?', reverso: 'No por sí solo; el vómito repetido sí es un dato de alarma.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 6 años con marca lineal en el abdomen tras una colisión, cómodo y sin dolor importante. ¿Qué haces?',
        opciones: [
          'Alta en el lugar: está cómodo.',
          'Trasladas y buscas activamente lesión intestinal y fractura lumbar, que pueden manifestarse más tarde.',
          'Solo inmovilizas la columna.',
          'Descartas lesión abdominal por la ausencia de dolor.',
        ],
        correcta: 1,
        explicacion: 'La marca del cinturón predice ambas lesiones y su clínica puede ser diferida.',
      },
      {
        pregunta: 'Lactante con traumatismo craneal cuya fontanela está abombada. ¿Cómo lo interpretas?',
        opciones: [
          'Como un hallazgo normal del lactante.',
          'Como signo tardío de aumento de la presión intracraneal: obliga a acelerar el traslado y comunicarlo.',
          'Como signo de deshidratación.',
          'Como consecuencia del llanto exclusivamente.',
        ],
        correcta: 1,
        explicacion: 'La fontanela puede absorber el aumento de volumen durante un tiempo; cuando se abomba, ese margen se ha agotado.',
      },
      {
        pregunta: 'Niño con abdomen distendido tras ventilación con bolsa-mascarilla prolongada. ¿Qué consideras primero?',
        opciones: [
          'Hemorragia intraabdominal masiva confirmada.',
          'Que la distensión gástrica por la ventilación puede explicarla, sin descartar por ello la lesión abdominal.',
          'Que se trata de una fractura pélvica.',
          'Que hay que comprimir el abdomen.',
        ],
        correcta: 1,
        explicacion: 'Es un fenómeno frecuente en el niño que puede simular distensión y dificultar la ventilación; no autoriza a descartar lesión.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Al inmovilizar a un niño pequeño en decúbito supino se acolcha bajo los ___.',
          opciones: ['pies', 'hombros', 'glúteos'],
          correcta: 1,
          explicacion: 'Su occipucio prominente flexionaría el cuello si se apoyara plano.',
        },
        {
          texto: 'En el niño, el reservorio de hemorragia que se añade a los del adulto es el ___.',
          opciones: ['mediastino', 'cuero cabelludo', 'espacio pleural'],
          correcta: 1,
          explicacion: 'Puede perder un volumen significativo por una herida de esa zona.',
        },
        {
          texto: 'El mediastino móvil del niño hace que tolere ___ el neumotórax a tensión.',
          opciones: ['mejor', 'peor', 'igual que el adulto'],
          correcta: 1,
          explicacion: 'El desplazamiento se produce con más facilidad y más rapidez.',
        },
      ],
    },
    revision: ficha({ fuentes: FU, extra: ['El tema señala lo que es distinto en el niño y remite al Módulo 5 para el desarrollo de cada lesión, sin duplicarlo.'] }),
  },

  'm6-tp-inmovilizacion': {
    icono: 'ic-collarin',
    duracion: '14 min',
    resumen: 'La restricción del movimiento espinal en el niño sigue los mismos principios que en el '
      + 'adulto, con tres diferencias que cambian la técnica: el occipucio prominente obliga a '
      + 'acolchar bajo los hombros, el material adulto casi nunca ajusta bien, y la lucha del niño '
      + 'asustado puede producir más movimiento que la ausencia de dispositivo. La lección explica '
      + 'cómo decidir, cómo ajustar y cuándo el mejor dispositivo es el que el niño tolera.',
    objetivos: [
      'Aplicar los criterios de restricción del movimiento espinal en el paciente pediátrico.',
      'Adaptar la técnica a la proporción craneal y al material disponible.',
      'Reconocer cuándo la agitación del niño hace contraproducente un dispositivo.',
    ],
    secciones: [
      {
        titulo: 'Decidir y ajustar',
        bloques: [
          { tipo: 'p', texto: 'Los criterios son los mismos que en el adulto: alteración del estado de conciencia o intoxicación, dolor o hipersensibilidad en la línea media, déficit neurológico, deformidad de la columna, dolor distractor y mecanismo de alto riesgo. La dificultad pediátrica no está en los criterios, sino en aplicarlos: un niño pequeño puede no localizar el dolor ni colaborar en la exploración, de modo que el mecanismo pesa más.' },
          {
            tipo: 'pasos',
            titulo: 'Cómo se ajusta la técnica',
            items: [
              'Acolchar bajo los hombros y el tronco para compensar el occipucio prominente y mantener la alineación neutra.',
              'Usar collarín de la talla correcta: uno grande extiende el cuello y uno pequeño lo flexiona. Si no hay talla adecuada, es preferible la estabilización manual y el acolchado lateral a un collarín que no ajusta.',
              'Rellenar los huecos entre el cuerpo y el dispositivo, que en el niño son muchos, para que no se desplace.',
              'Movilizar en bloque con el número de personas necesario, sosteniendo cabeza y tronco como una unidad.',
              'Comprobar que el dispositivo no comprime el abdomen ni limita la expansión torácica, porque el niño ventila sobre todo con el diafragma.',
              'Reevaluar la ventilación y el estado neurológico después de inmovilizar.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ni el collarín ni el material de adulto valen por defecto', texto: 'Un collarín de talla incorrecta no inmoviliza y sí puede empeorar la posición de la vía aérea o comprimir el cuello. Lo mismo ocurre con sistemas de sujeción pensados para el cuerpo de un adulto. Cuando el material no ajusta, la solución no es forzarlo, sino combinar estabilización manual, acolchado y sujeciones adaptadas, y documentar lo que se hizo y por qué.' },
        ],
      },
      {
        titulo: 'El niño que se resiste',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Un dispositivo que provoca lucha puede mover más de lo que sujeta', texto: 'Un niño asustado que se retuerce contra las correas genera más movimiento espinal que el mismo niño tranquilo en brazos de su cuidador con estabilización manual. La decisión debe ponderar el beneficio teórico de la sujeción frente al movimiento real que provoca. Cuando la agitación es intensa, se prioriza calmarlo —presencia del cuidador, explicación, distracción— antes que apretar más.' },
          {
            tipo: 'lista',
            titulo: 'Medidas que ayudan',
            items: [
              'Mantener al cuidador visible y, si es posible, en contacto con el niño.',
              'Explicar cada paso antes de hacerlo, incluso a los más pequeños.',
              'Dejar que toque el material antes de aplicarlo.',
              'Trabajar deprisa pero sin brusquedad, y no dejar al niño solo en ningún momento.',
              'Analgesia conforme al alcance y al protocolo: el dolor no controlado alimenta la agitación.',
              'Documentar la decisión adoptada, incluida la de no aplicar un dispositivo concreto y por qué.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La silla del vehículo', texto: 'Si el niño viajaba en un sistema de retención infantil y este permanece íntegro, puede ser una superficie de inmovilización útil en determinadas circunstancias, siempre que permita valorar y acceder al paciente y que el protocolo del servicio lo contemple. La decisión depende del estado del niño, de la integridad del dispositivo y del procedimiento del servicio; esta lección no la autoriza por sí sola.' },
        ],
      },
      F([PHTLS, ACS_BEST, AHA_PBLS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Acolchado escapular', definicion: 'Relleno bajo los hombros que compensa el occipucio prominente del niño y mantiene la alineación neutra.' },
      { termino: 'Talla del collarín', definicion: 'Ajuste correcto del dispositivo cervical; uno grande extiende el cuello y uno pequeño lo flexiona.' },
      { termino: 'Movimiento por agitación', definicion: 'Desplazamiento espinal generado por la lucha del niño contra las sujeciones, que puede superar al que se pretende evitar.' },
    ],
    flashcards: [
      { frente: '¿Dónde se acolcha al inmovilizar a un niño pequeño?', reverso: 'Bajo los hombros y el tronco, para compensar el occipucio prominente.' },
      { frente: '¿Qué hacer si no hay collarín de la talla adecuada?', reverso: 'Preferir estabilización manual y acolchado lateral antes que un collarín que no ajusta.' },
      { frente: '¿Por qué el dispositivo no debe comprimir el abdomen?', reverso: 'Porque el niño ventila sobre todo con el diafragma.' },
      { frente: '¿Qué se pondera ante un niño que lucha contra las sujeciones?', reverso: 'El beneficio de la sujeción frente al movimiento real que provoca la agitación.' },
      { frente: '¿Qué se documenta además de lo aplicado?', reverso: 'La decisión de no aplicar un dispositivo concreto y su motivo.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 3 años que se retuerce y grita contra las correas del sistema de inmovilización. ¿Qué corresponde?',
        opciones: [
          'Apretar más las sujeciones.',
          'Priorizar calmarlo con la presencia del cuidador, explicación y analgesia según protocolo, ponderando que la lucha puede generar más movimiento del que se evita.',
          'Retirar toda medida y trasladar sin precauciones.',
          'Sedarlo en todos los casos.',
        ],
        correcta: 1,
        explicacion: 'Un dispositivo que provoca lucha puede mover más de lo que sujeta.',
      },
      {
        pregunta: 'Solo dispones de collarines de adulto para un niño de 4 años. ¿Qué haces?',
        opciones: [
          'Colocar el más pequeño aunque no ajuste.',
          'Recurrir a estabilización manual y acolchado lateral, y documentar lo hecho y por qué.',
          'Renunciar a toda medida de restricción.',
          'Improvisar un collarín con material rígido.',
        ],
        correcta: 1,
        explicacion: 'Un collarín que no ajusta no inmoviliza y puede empeorar la posición de la vía aérea.',
      },
      {
        pregunta: 'Tras inmovilizar a un lactante, notas que ventila peor. ¿Qué revisas?',
        opciones: [
          'La talla del pañal.',
          'Que el dispositivo o las sujeciones no compriman el abdomen ni limiten la expansión torácica.',
          'La temperatura ambiente exclusivamente.',
          'La posición de las extremidades.',
        ],
        correcta: 1,
        explicacion: 'El niño ventila sobre todo con el diafragma y tolera mal la compresión abdominal.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Un collarín demasiado grande ___ el cuello del niño.',
          opciones: ['flexiona', 'extiende', 'alinea'],
          correcta: 1,
          explicacion: 'Y uno demasiado pequeño lo flexiona: ambas posiciones comprometen la vía aérea.',
        },
        {
          texto: 'Los huecos entre el cuerpo del niño y el dispositivo se ___ para que no se desplace.',
          opciones: ['ignoran', 'rellenan', 'amplían'],
          correcta: 1,
          explicacion: 'En el niño son muchos, y sin relleno la inmovilización es aparente.',
        },
        {
          texto: 'El uso del sistema de retención infantil como superficie de inmovilización depende del estado del niño, de la integridad del dispositivo y del ___.',
          opciones: ['criterio del cuidador', 'protocolo del servicio', 'tipo de vehículo'],
          correcta: 1,
          explicacion: 'La lección no autoriza esa decisión por sí sola.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-tp-manejo-lesiones': {
    icono: 'ic-fractura',
    duracion: '15 min',
    resumen: 'El manejo del niño traumatizado sigue la secuencia XABCDE, pero cada letra tiene un '
      + 'matiz pediátrico que decide el resultado: la vía aérea se abre en posición neutra, la '
      + 'ventilación se vigila por el esfuerzo más que por la cifra, el shock se reconoce antes de la '
      + 'hipotensión, la glucemia forma parte de la valoración neurológica y la exposición se hace '
      + 'contra reloj para no enfriar al paciente. La lección ordena todo eso en una conducta '
      + 'aplicable.',
    objetivos: [
      'Aplicar la secuencia de manejo del trauma pediátrico con sus matices por letra.',
      'Priorizar el reconocimiento precoz del shock y la prevención de la hipotermia.',
      'Integrar el control del dolor y el acompañamiento familiar en el manejo.',
    ],
    secciones: [
      {
        titulo: 'Letra por letra',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Letra', 'Matiz pediátrico'],
            filas: [
              ['X', 'Control inmediato del sangrado masivo: el volumen circulante del niño es pequeño y la reserva, mínima'],
              ['A', 'Posición neutra con acolchado bajo los hombros; evitar la hiperextensión; la lengua es la causa más frecuente de obstrucción'],
              ['B', 'Vigilar el esfuerzo respiratorio; el descenso del trabajo o la somnolencia indican agotamiento y preceden al paro'],
              ['C', 'Reconocer el shock por piel, pulso periférico, relleno capilar y comportamiento, no por la presión'],
              ['D', 'Valorar conciencia con la escala adaptada a su edad y medir la glucemia si está dentro del alcance'],
              ['E', 'Exponer por partes, explorar deprisa y cubrir de inmediato: el niño se enfría muy rápido'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La bradicardia en el niño traumatizado', texto: 'Es un signo grave y casi siempre significa hipoxia. Ante un niño traumatizado que se vuelve bradicárdico, la primera respuesta es asegurar la vía aérea y la oxigenación, no buscar una causa cardiaca. Es una de las asociaciones más útiles de todo el módulo.' },
        ],
      },
      {
        titulo: 'Lo que más cambia el resultado',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cinco medidas de alto rendimiento',
            items: [
              'Detener la hemorragia externa que sea controlable, de inmediato.',
              'Ventilar bien y comprobar que el tórax se mueve, sin hiperventilar.',
              'Prevenir activamente la hipotermia desde el primer minuto: retirar ropa mojada, cubrir, calentar el habitáculo y limitar el tiempo de exposición.',
              'Medir la glucemia en todo niño con alteración de la conciencia, si está dentro del alcance.',
              'Acortar el tiempo hasta el centro adecuado, con prealerta que incluya peso estimado y hallazgos.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El peso estimado es información clínica', texto: 'Del peso dependen el material y la medicación que preparará el centro receptor. Estimarlo con la cinta de referencia que use el servicio y comunicarlo en la prealerta ahorra minutos en la recepción. Es un dato que se olvida con frecuencia y que casi nadie más puede aportar.' },
          {
            tipo: 'lista',
            titulo: 'Dolor y familia',
            items: [
              'El dolor del niño se infravalora de forma sistemática, sobre todo en el que no habla; se valora con la escala que use el servicio y se trata conforme al alcance y al protocolo.',
              'La inmovilización correcta, la posición cómoda y el acompañamiento son también analgesia y no requieren autorización farmacológica.',
              'Mantener al cuidador presente reduce la angustia del niño y mejora la valoración.',
              'Explicar lo que se va a hacer, incluso a los más pequeños, y no mentir sobre si algo va a doler.',
              'Documentar todo lo administrado y la respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Reevaluar es la parte más importante', texto: 'El niño compensa hasta que deja de hacerlo, y ese cambio puede ocurrir durante el traslado. Repetir la valoración completa a intervalos y documentarla con la hora es lo que permite detectar el deterioro antes de que se convierta en un paro.' },
        ],
      },
      F([PHTLS, AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Matiz pediátrico', definicion: 'Particularidad de cada paso de la secuencia de manejo que cambia por la edad del paciente.' },
      { termino: 'Bradicardia por hipoxia', definicion: 'Descenso de la frecuencia cardiaca del niño secundario a oxigenación insuficiente; se corrige asegurando vía aérea y ventilación.' },
      { termino: 'Peso estimado', definicion: 'Valor obtenido con la cinta de referencia pediátrica, del que dependen material y medicación en el centro receptor.' },
      { termino: 'Reevaluación seriada', definicion: 'Repetición completa y documentada de la valoración, que permite detectar el momento en que la compensación se agota.' },
    ],
    flashcards: [
      { frente: '¿Qué indica la bradicardia en un niño traumatizado?', reverso: 'Casi siempre hipoxia: la primera respuesta es vía aérea y oxigenación.' },
      { frente: '¿Cómo se reconoce el shock en la C pediátrica?', reverso: 'Por piel, pulso periférico, relleno capilar y comportamiento, no por la presión arterial.' },
      { frente: '¿Por qué se comunica el peso estimado en la prealerta?', reverso: 'Porque de él dependen el material y la medicación que preparará el centro receptor.' },
      { frente: '¿Qué señal en la B indica agotamiento?', reverso: 'El descenso del trabajo respiratorio o la aparición de somnolencia.' },
      { frente: '¿Qué analgesia no requiere autorización farmacológica?', reverso: 'La inmovilización correcta, la posición cómoda y el acompañamiento.' },
      { frente: '¿Por qué la exposición debe ser breve?', reverso: 'Porque el niño se enfría muy rápido y la hipotermia empeora la coagulación.' },
    ],
    quiz: [
      {
        pregunta: 'Niño traumatizado que se vuelve bradicárdico durante el traslado. ¿Cuál es tu primera respuesta?',
        opciones: [
          'Buscar una causa cardiaca primaria.',
          'Asegurar la vía aérea y la oxigenación: en el niño la bradicardia casi siempre significa hipoxia.',
          'Administrar líquidos rápidamente.',
          'Retirar la inmovilización.',
        ],
        correcta: 1,
        explicacion: 'Es una de las asociaciones más útiles del módulo y evita perder tiempo buscando otra causa.',
      },
      {
        pregunta: 'En la prealerta de un niño politraumatizado, ¿qué dato se olvida con frecuencia y conviene incluir?',
        opciones: [
          'El color del vehículo implicado.',
          'El peso estimado con la cinta de referencia, del que dependen material y medicación en destino.',
          'El nombre del cuidador.',
          'La hora exacta de salida de la base.',
        ],
        correcta: 1,
        explicacion: 'Es información clínica que casi nadie más puede aportar y que ahorra minutos en la recepción.',
      },
      {
        pregunta: 'Un niño pequeño traumatizado no verbaliza dolor. ¿Qué corresponde?',
        opciones: [
          'Asumir que no le duele.',
          'Valorar el dolor con la escala que use el servicio y tratarlo conforme al alcance, recordando que en el niño que no habla se infravalora de forma sistemática.',
          'Administrar analgesia sin valorar.',
          'Esperar a la valoración hospitalaria.',
        ],
        correcta: 1,
        explicacion: 'La infravaloración del dolor pediátrico es un problema documentado, sobre todo en quien no puede expresarlo.',
      },
      {
        pregunta: '¿Cuál de estas medidas es de alto rendimiento en el trauma pediátrico?',
        opciones: [
          'Completar toda la exploración detallada en la escena.',
          'Prevenir activamente la hipotermia desde el primer minuto.',
          'Retrasar el traslado hasta estabilizar por completo.',
          'Exponer al paciente durante todo el traslado para vigilar las lesiones.',
        ],
        correcta: 1,
        explicacion: 'Es barata, no requiere alcance avanzado y actúa sobre la coagulación de un paciente que puede estar sangrando.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el manejo inicial del niño politraumatizado',
        pasos: [
          'Controlar la hemorragia exanguinante visible',
          'Abrir la vía aérea en posición neutra con acolchado bajo los hombros',
          'Valorar la ventilación por el esfuerzo respiratorio y ventilar sin hiperventilar',
          'Reconocer el shock por piel, pulso periférico y relleno capilar, antes de la hipotensión',
          'Valorar la conciencia y medir la glucemia si está dentro del alcance',
          'Exponer por partes, cubrir de inmediato y prevenir la hipotermia',
          'Reevaluar de forma seriada y prealertar con el peso estimado',
        ],
      },
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-tp-osteolisis': {
    icono: 'ic-hueso',
    duracion: '14 min',
    resumen: 'Cuando un niño grave necesita acceso vascular y las venas no se consiguen, la vía '
      + 'intraósea permite llegar a la circulación a través de la cavidad medular del hueso. Esta '
      + 'lección explica el fundamento —la médula ósea es una red vascular que no se colapsa—, cuándo '
      + 'se plantea, qué la contraindica y cómo se confirma y se vigila. No enseña la técnica ni '
      + 'autoriza el procedimiento: eso depende del alcance, del dispositivo real y de la dirección '
      + 'médica.',
    objetivos: [
      'Explicar el fundamento de la vía intraósea y su papel en el paciente pediátrico grave.',
      'Enumerar sus indicaciones generales y sus contraindicaciones.',
      'Reconocer los signos de mala posición y las complicaciones que obligan a vigilar.',
    ],
    secciones: [
      {
        titulo: 'Nota editorial y fundamento',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'El nombre correcto del procedimiento', texto: 'El título oficial del plan de estudios escribe «Osteólisis», errata documental que se conserva solo para trazabilidad y que designa en realidad otra cosa. El término correcto para este acceso vascular es acceso intraóseo, también llamado osteoclisis, y es el que se muestra al alumno y el que debe usarse al comunicarse con el hospital.' },
          { tipo: 'p', texto: 'El interior del hueso contiene una red de vasos que drenan a la circulación central y que están sostenidos por la estructura ósea. Esa característica es la clave: a diferencia de una vena periférica, esos vasos no se colapsan cuando el paciente está en shock. Por eso el acceso intraóseo funciona precisamente en la situación en que las venas resultan más difíciles de conseguir.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué importa tanto en pediatría', texto: 'Conseguir una vía venosa en un lactante en shock puede llevar varios intentos y varios minutos, tiempo que ese paciente no siempre tiene. La vía intraósea se estableció como alternativa precoz en el niño grave justamente por eso, y hoy se usa también en el adulto con el mismo fundamento.' },
        ],
      },
      {
        titulo: 'Cuándo sí y cuándo no',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Situaciones en que se plantea',
            items: [
              'Paciente pediátrico crítico —paro, shock, estado convulsivo prolongado— en el que se necesita acceso de forma inmediata.',
              'Fracaso o previsión de fracaso del acceso venoso periférico en un paciente que no puede esperar.',
              'Necesidad de administrar líquidos o medicación cuando el protocolo lo contempla y el alcance lo autoriza.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Lo que lo contraindica',
            items: [
              'Fractura del hueso elegido o del hueso proximal a él.',
              'Intento previo de acceso intraóseo en ese mismo hueso, aunque haya fracasado.',
              'Infección, quemadura o herida en el punto de inserción.',
              'Prótesis o material de osteosíntesis en esa localización.',
              'Enfermedades óseas que comprometan la resistencia del hueso.',
              'Imposibilidad de identificar con seguridad las referencias anatómicas.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Qué NO enseña esta lección', texto: 'No se publican sitios exactos de punción, calibres, longitudes de aguja ni profundidades. El dispositivo disponible en la unidad, sus tamaños, los puntos autorizados por el protocolo y quién puede realizar el procedimiento son datos que la academia debe entregar. Estudiar esta lección no autoriza a colocar un acceso intraóseo: es un procedimiento invasivo que exige formación específica, dispositivo adecuado, indicación respaldada y dirección médica.' },
        ],
      },
      {
        titulo: 'Confirmación, vigilancia y comunicación',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cómo se comprueba y qué se vigila',
            items: [
              'La aguja debe quedar firme por sí sola, sin necesidad de sujetarla.',
              'Debe poder infundirse sin resistencia excesiva y sin que el tejido de alrededor se hinche.',
              'La aparición de tumefacción alrededor del punto, o un aumento del perímetro del miembro, indica extravasación: se detiene la infusión y se comunica.',
              'La infusión intraósea es dolorosa en el paciente consciente; el control del dolor se hace conforme al alcance y al protocolo.',
              'El acceso se fija y se protege para que no se desplace durante la movilización.',
              'Se documenta el hueso utilizado, la hora de colocación, quién lo realizó y qué se administró por esa vía.',
              'Se comunica de forma explícita en la entrega: el equipo receptor necesita saber que existe y dónde está.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La complicación más frecuente y la más grave', texto: 'La más frecuente es la extravasación por mala posición o por desplazamiento, que puede producir daño en los tejidos y, en casos extremos, un síndrome compartimental de la extremidad. La más grave, aunque poco común, es la infección ósea. Ambas obligan a vigilar el punto durante todo el traslado y a comunicar cualquier cambio.' },
          { tipo: 'p', texto: 'El acceso intraóseo es una medida temporal: se mantiene el tiempo que indique el protocolo y se sustituye por un acceso definitivo cuando las condiciones lo permitan, ya en el ámbito hospitalario.' },
        ],
      },
      F([AHA_PALS_2025, PHTLS, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Acceso intraóseo', definicion: 'Vía de administración que alcanza la circulación a través de la cavidad medular del hueso; también llamado osteoclisis.' },
      { termino: 'Red vascular medular', definicion: 'Conjunto de vasos del interior del hueso sostenidos por su estructura, que no se colapsan en el shock.' },
      { termino: 'Extravasación', definicion: 'Salida del líquido infundido a los tejidos por mala posición o desplazamiento; complicación más frecuente de esta vía.' },
      { termino: 'Medida temporal', definicion: 'Acceso que se mantiene el tiempo que indique el protocolo y se sustituye por uno definitivo en el hospital.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el término correcto y cuál la errata del plan?', reverso: 'Acceso intraóseo u osteoclisis; el plan escribe una errata documental que se conserva solo para trazabilidad.' },
      { frente: '¿Por qué funciona esta vía en el shock?', reverso: 'Porque los vasos de la cavidad medular están sostenidos por el hueso y no se colapsan.' },
      { frente: 'Tres contraindicaciones', reverso: 'Fractura del hueso elegido, intento previo en ese mismo hueso, e infección o quemadura en el punto de inserción.' },
      { frente: '¿Cómo se sospecha una extravasación?', reverso: 'Por tumefacción alrededor del punto o aumento del perímetro del miembro; se detiene la infusión y se comunica.' },
      { frente: '¿Qué se documenta y se comunica?', reverso: 'Hueso utilizado, hora de colocación, quién lo realizó y qué se administró por esa vía.' },
      { frente: '¿Autoriza esta lección a colocar un acceso intraóseo?', reverso: 'No: exige formación específica, dispositivo adecuado, indicación respaldada y dirección médica.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante en shock en el que han fracasado dos intentos de vía venosa periférica. ¿Qué se plantea?',
        opciones: [
          'Seguir intentando la vía periférica indefinidamente.',
          'El acceso intraóseo como alternativa precoz, conforme al alcance autorizado y al protocolo, porque los vasos medulares no se colapsan en el shock.',
          'Administrar la medicación por vía oral.',
          'Trasladar sin ningún acceso y sin comunicarlo.',
        ],
        correcta: 1,
        explicacion: 'Es la situación para la que esta vía se estableció en pediatría; la ejecución depende del alcance y del protocolo.',
      },
      {
        pregunta: 'Se ha intentado un acceso intraóseo en la tibia derecha y ha fracasado. ¿Puede repetirse en ese mismo hueso?',
        opciones: [
          'Sí, en el punto contiguo.',
          'No: el intento previo en ese hueso es una contraindicación, porque el líquido se extravasará por la perforación anterior.',
          'Sí, si se usa una aguja de mayor calibre.',
          'Sí, siempre que hayan pasado cinco minutos.',
        ],
        correcta: 1,
        explicacion: 'La perforación previa impide que el hueso contenga la infusión.',
      },
      {
        pregunta: 'Durante el traslado, la pantorrilla del niño aumenta de volumen alrededor del punto de inserción. ¿Qué ocurre y qué haces?',
        opciones: [
          'Es normal: se continúa la infusión.',
          'Es una extravasación: se detiene la infusión, se comunica y se vigila la extremidad por el riesgo de daño tisular y de síndrome compartimental.',
          'Es una reacción alérgica al líquido.',
          'Indica que hay que aumentar el ritmo.',
        ],
        correcta: 1,
        explicacion: 'Es la complicación más frecuente de esta vía y requiere detener la infusión de inmediato.',
      },
      {
        pregunta: 'Buscas en esta lección el punto exacto de punción y el calibre y no aparecen. ¿Por qué?',
        opciones: [
          'Por un olvido de redacción.',
          'Porque dependen del dispositivo real de la unidad y de los puntos autorizados por el protocolo, datos que la academia no ha entregado.',
          'Porque el procedimiento ya no se usa.',
          'Porque son iguales a cualquier edad.',
        ],
        correcta: 1,
        explicacion: 'El bloqueo está declarado de forma expresa en la lección y en su ficha editorial.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Los vasos de la cavidad medular no se ___ cuando el paciente está en shock.',
          opciones: ['dilatan', 'colapsan', 'contraen'],
          correcta: 1,
          explicacion: 'Es lo que hace útil esta vía justo cuando las venas periféricas fallan.',
        },
        {
          texto: 'El término correcto para este acceso vascular es intraóseo u ___.',
          opciones: ['osteotomía', 'osteoclisis', 'osteosíntesis'],
          correcta: 1,
          explicacion: 'La grafía del título oficial es una errata que se conserva solo para trazabilidad.',
        },
        {
          texto: 'La complicación más frecuente de esta vía es la ___.',
          opciones: ['infección ósea', 'extravasación', 'embolia gaseosa'],
          correcta: 1,
          explicacion: 'Obliga a vigilar el punto durante todo el traslado.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: [
        'BLOQUEO PARCIAL DECLARADO: no se publican sitios de punción, calibres, longitudes ni profundidades. Requiere dispositivo real, puntos autorizados y dirección médica.',
        'La errata documental del título oficial se conserva y se corrige solo en el título visible; la lección la explica una vez y no vuelve a usar el término incorrecto.',
      ],
    }),
  },
}
