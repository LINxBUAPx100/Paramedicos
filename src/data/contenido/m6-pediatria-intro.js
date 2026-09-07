// ============================================================
//  MÓDULO 6 — «INTRODUCCIÓN A PEDIATRÍA» y «SITUACIONES ESPECIALES»
// ------------------------------------------------------------
//  Los 10 temas de las dos primeras unidades del módulo.
//
//  IDEA QUE RECORRE TODO EL MÓDULO: el niño no es un adulto pequeño. Sus
//  proporciones, su fisiología y su forma de compensar son distintas, y por eso
//  el deterioro pediátrico es engañoso: el niño mantiene la presión arterial
//  hasta muy tarde y después cae de golpe.
//
//  LÍMITES DE ESTA UNIDAD:
//   · No se publica ninguna dosis, ni cifras de frecuencia o de presión por
//     edad: dependen de la guía adoptada y del protocolo del servicio, que debe
//     además declarar qué cinta o tabla de referencia pediátrica utiliza.
//   · El abuso infantil se trata como sospecha que se documenta y se comunica,
//     nunca como acusación; el marco legal concreto lo fija el ordenamiento
//     mexicano y el procedimiento del servicio.
//
//  Fuentes asignadas por el registro: AHA PALS 2025, AHA/AAP PBLS 2025 y
//  WHO/ICRC BEC como primarias; la edición de PALS que apruebe la academia
//  queda pendiente de identificar.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

import {
  erroresFrecuentes, repasoRapido, preguntasOrales, mnemotecnia, masPreguntado,
} from './moldeV2.js'

const HOY = '2026-08-17'

const AHA_PALS_2025 = {
  nombre: 'AHA 2025 Pediatric Advanced Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support',
  nota: 'Guía primaria actual del soporte vital avanzado pediátrico. PENDIENTE: apartado y algoritmo '
    + 'exactos; no sostiene ninguna cifra concreta de esta lección.',
}
const AHA_PBLS_2025 = {
  nombre: 'AHA/AAP 2025 Pediatric Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',
  nota: 'Guía primaria actual del soporte vital básico pediátrico. PENDIENTE: apartado exacto.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE y evaluación del paciente pediátrico grave. PENDIENTE: módulo '
    + 'y página exactos.',
}
const LEY_SALUD = {
  nombre: 'Ley General de Salud, texto vigente.',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf',
  nota: 'Marco jurídico mexicano de la atención médica. PENDIENTE: artículos concretos aplicables al '
    + 'consentimiento del menor y a la obligación de aviso; deben verificarse en el texto vigente '
    + 'antes de citarlos como fundamento.',
}
const PALS_PENDIENTE = {
  nombre: 'PALS, edición que apruebe la academia.',
  nota: 'REFERENCIA NO RESUELTA: el plan nombra PALS sin declarar edición. Hasta que la academia la '
    + 'identifique, toda recomendación se contrasta con AHA 2025.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, equipamiento, cinta de referencia pediátrica y dirección médica de la academia '
    + 'R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija los rangos de normalidad por edad que '
    + 'usa el servicio, el material pediátrico disponible y el procedimiento de aviso. No puede '
    + 'inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publican dosis ni rangos numéricos de frecuencia, presión o peso por edad: '
  + 'dependen de la guía adoptada, de la cinta de referencia pediátrica que use el servicio y del '
  + 'protocolo local.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: material pediátrico, medicación, procedimientos, criterios de '
  + 'aviso y destino dependen del alcance autorizado, del equipamiento y del protocolo del servicio.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA PALS 2025; AHA/AAP PBLS 2025; WHO/ICRC BEC 2018',
  observaciones: [
    'Redactado desde cero en el lote de Módulo 6; el tema estaba vacío.',
    SIN_CIFRAS,
    PROTOCOLO,
    ...extra,
  ],
  fuentes,
})

const FU = [
  'AHA 2025 Pediatric Advanced Life Support.',
  'AHA/AAP 2025 Pediatric Basic Life Support.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
  'PALS, edición pendiente de identificar por la academia.',
]

export default {
  // ---------- Introducción a pediatría ----------

  'm6-ip-pediatria': {
    icono: 'ic-nino',
    duracion: '13 min',
    resumen: 'La atención pediátrica no es la atención del adulto en tamaño reducido. Cambian las '
      + 'proporciones del cuerpo, la forma de compensar, las causas más frecuentes de deterioro y la '
      + 'manera de comunicarse con el paciente y con su familia. Esta lección abre el módulo fijando '
      + 'esas diferencias y una idea que se repetirá en todas las siguientes: en el niño, el paro '
      + 'cardiaco casi nunca es el primer problema, sino el final de un deterioro respiratorio o '
      + 'circulatorio que pudo reconocerse antes.',
    objetivos: [
      'Justificar por qué la atención pediátrica requiere un abordaje propio.',
      'Reconocer las etapas de edad y su utilidad práctica en la atención.',
      'Explicar la secuencia habitual del deterioro pediátrico y su consecuencia para la vigilancia.',
    ],
    secciones: [
      {
        titulo: 'Por qué el niño no es un adulto pequeño',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuatro diferencias que cambian la atención',
            items: [
              'Anatómicas: cabeza proporcionalmente grande, vía aérea estrecha, tórax elástico, órganos abdominales menos protegidos y superficie corporal mayor en relación con su masa.',
              'Fisiológicas: el niño compensa con frecuencia cardiaca y con vasoconstricción, y mantiene la presión arterial hasta muy tarde.',
              'Epidemiológicas: predominan los problemas respiratorios, las infecciones y las lesiones no intencionales, y no la enfermedad coronaria del adulto.',
              'De comunicación: el paciente puede no poder explicar lo que le pasa, y la información llega a través de quien lo cuida.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La consecuencia práctica más importante', texto: 'En el adulto, el paro cardiaco suele ser un evento súbito de origen cardiaco. En el niño, casi siempre es el final de un deterioro progresivo, habitualmente respiratorio y a veces circulatorio. Eso significa dos cosas: que hay una ventana para reconocerlo antes, y que el esfuerzo del módulo se concentra en detectar el deterioro precoz, no en tratar el paro.' },
        ],
      },
      {
        titulo: 'Las etapas y para qué sirven',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Etapa', 'Qué la caracteriza para quien atiende'],
            filas: [
              ['Recién nacido', 'Depende por completo del cuidador; el control de la temperatura es crítico'],
              ['Lactante', 'No camina ni habla; explora con la boca; la separación del cuidador le angusta'],
              ['Preescolar', 'Habla pero interpreta literalmente; teme el daño corporal y las separaciones'],
              ['Escolar', 'Comprende explicaciones sencillas y puede colaborar si se le informa'],
              ['Adolescente', 'Requiere intimidad y ser tratado como interlocutor; puede ocultar información delante de su familia'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Los límites de edad exactos no son lo importante', texto: 'Cada guía y cada protocolo fija sus rangos, y los del material —cintas de referencia, dispositivos, algoritmos— pueden no coincidir con los conceptuales. Lo que sí es constante es la utilidad de la etapa: anticipa cómo va a reaccionar el paciente, cómo hay que hablarle y qué le da miedo. Los rangos numéricos y la cinta que use su servicio los declara el protocolo.' },
          {
            tipo: 'lista',
            titulo: 'Reglas de trato que funcionan a cualquier edad',
            items: [
              'Ponerse a su altura y hablar despacio, con frases cortas.',
              'Explorar de lo menos molesto a lo más molesto, dejando para el final lo que duele.',
              'Mantener al niño con su cuidador siempre que sea posible: separarlo empeora la valoración.',
              'No mentir sobre si algo va a doler; la confianza se pierde una sola vez.',
              'Dirigirse también al niño, aunque la información la aporte el adulto.',
            ],
          },
          mnemotecnia('EN EL NIÑO EL PARO ES EL FINAL, NO EL PRINCIPIO. En el adulto suele ser un evento súbito de origen cardiaco; en el niño casi siempre es el desenlace de un deterioro progresivo, habitualmente respiratorio. Eso significa que hay una ventana para reconocerlo antes.'),
          masPreguntado('Las cuatro diferencias que cambian la atención —anatómicas, fisiológicas, epidemiológicas y de comunicación— y las reglas de trato que funcionan a cualquier edad: ponerse a su altura, explorar de lo menos a lo más molesto, no separarlo de su cuidador y no mentir sobre si algo va a doler.'),
        ],
      },
      erroresFrecuentes([
        ['Tratar al niño como un adulto pequeño', 'Cambian las proporciones del cuerpo, la forma de compensar, las causas más frecuentes de deterioro y la manera de comunicarse.'],
        ['Separar al niño de su cuidador', 'Empeora la valoración. Se mantiene con él siempre que sea posible.'],
        ['Mentir sobre si algo va a doler', 'La confianza se pierde una sola vez, y con ella la colaboración del paciente.'],
        ['Aprenderse los límites de edad exactos', 'Cada guía y cada protocolo fija sus rangos, y los del material pueden no coincidir. Lo constante es la utilidad de la etapa: anticipa cómo va a reaccionar.'],
      ]),
      repasoRapido([
        'La atención pediátrica no es la del adulto en tamaño reducido.',
        'Anatómicas: cabeza proporcionalmente grande, vía aérea estrecha, tórax elástico, órganos abdominales menos protegidos.',
        'Fisiológicas: compensa con frecuencia cardiaca y vasoconstricción, y mantiene la presión hasta muy tarde.',
        'Epidemiológicas: predominan los problemas respiratorios, las infecciones y las lesiones no intencionales.',
        'De comunicación: el paciente puede no poder explicar lo que le pasa y la información llega por su cuidador.',
        'En el niño el paro casi siempre es el final de un deterioro progresivo, habitualmente respiratorio.',
        'Recién nacido: depende por completo del cuidador y el control de la temperatura es crítico.',
        'Lactante: no camina ni habla, explora con la boca y la separación del cuidador le angustia.',
        'Preescolar: habla pero interpreta literalmente; teme el daño corporal y las separaciones.',
        'Escolar: comprende explicaciones sencillas y colabora si se le informa.',
        'Adolescente: requiere intimidad y ser tratado como interlocutor; puede ocultar información delante de su familia.',
        'Reglas de trato: ponerse a su altura, explorar de lo menos a lo más molesto, no separarlo, no mentir y dirigirse también al niño.',
      ]),
      preguntasOrales([
        '¿Por qué la atención pediátrica requiere un abordaje propio?',
        'Enumera las cuatro diferencias que cambian la atención.',
        '¿En qué se diferencia el paro pediátrico del del adulto?',
        '¿Qué consecuencia práctica tiene eso?',
        'Recorre las etapas y qué caracteriza a cada una para quien atiende.',
        '¿Por qué los límites de edad exactos no son lo importante?',
        'Di las reglas de trato que funcionan a cualquier edad.',
        '¿Por qué no se separa al niño de su cuidador?',
      ]),
      F([AHA_PALS_2025, WHO_BEC, PALS_PENDIENTE, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Compensación pediátrica', definicion: 'Respuesta del niño al deterioro mediante aumento de la frecuencia cardiaca y vasoconstricción, que mantiene la presión arterial hasta fases tardías.' },
      { termino: 'Paro de origen respiratorio', definicion: 'Parada cardiaca precedida por un deterioro respiratorio progresivo; patrón habitual en pediatría.' },
      { termino: 'Etapa del desarrollo', definicion: 'Franja de edad que anticipa cómo reacciona el paciente y cómo debe abordarse, más allá de sus límites numéricos exactos.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el origen habitual del paro cardiaco pediátrico?', reverso: 'Un deterioro progresivo, casi siempre respiratorio, y no un evento cardiaco súbito.' },
      { frente: '¿Cómo compensa el niño el deterioro circulatorio?', reverso: 'Con taquicardia y vasoconstricción, manteniendo la presión arterial hasta muy tarde.' },
      { frente: '¿En qué orden se explora a un niño?', reverso: 'De lo menos molesto a lo más molesto, dejando para el final lo que duele.' },
      { frente: '¿Se separa al niño de su cuidador para valorarlo?', reverso: 'No siempre que sea posible evitarlo: la separación empeora la valoración.' },
      { frente: '¿Quién define los rangos de edad y la cinta de referencia?', reverso: 'El protocolo del servicio y la guía que haya adoptado.' },
    ],
    quiz: [
      {
        pregunta: '¿Por qué el esfuerzo del módulo se concentra en el reconocimiento precoz y no en el tratamiento del paro?',
        opciones: [
          'Porque el paro pediátrico no se trata.',
          'Porque en el niño el paro suele ser el final de un deterioro progresivo, y existe una ventana para reconocerlo antes.',
          'Porque el paro pediátrico es más frecuente que el del adulto.',
          'Porque el tratamiento es idéntico al del adulto.',
        ],
        correcta: 1,
        explicacion: 'Detectar el deterioro respiratorio o circulatorio antes del paro es donde más se puede cambiar el resultado.',
      },
      {
        pregunta: 'Un preescolar se resiste a que lo explores. ¿Qué estrategia se ajusta a su etapa?',
        opciones: [
          'Separarlo del cuidador para que colabore.',
          'Ponerse a su altura, hablarle con frases cortas, mantenerlo con su cuidador y explorar dejando lo molesto para el final.',
          'Explorar primero la zona dolorosa para terminar antes.',
          'Decirle que no va a dolerle nada aunque vaya a doler.',
        ],
        correcta: 1,
        explicacion: 'El preescolar interpreta literalmente y teme el daño corporal y la separación.',
      },
      {
        pregunta: 'Un niño con dificultad respiratoria mantiene la presión arterial normal. ¿Qué significa?',
        opciones: [
          'Que su estado es estable y puede esperar.',
          'Que la presión normal no descarta gravedad: el niño la mantiene compensando hasta fases tardías.',
          'Que el problema no es respiratorio.',
          'Que puede darse de alta en el lugar.',
        ],
        correcta: 1,
        explicacion: 'Esperar a que caiga la presión para actuar es esperar a la fase final de la compensación.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el niño, el paro cardiaco suele ser el final de un deterioro de origen ___.',
          opciones: ['coronario', 'respiratorio', 'traumático'],
          correcta: 1,
          explicacion: 'Por eso el reconocimiento precoz de la dificultad respiratoria es la prioridad del módulo.',
        },
        {
          texto: 'La etapa del desarrollo sirve sobre todo para anticipar cómo va a ___ el paciente.',
          opciones: ['medicarse', 'reaccionar', 'crecer'],
          correcta: 1,
          explicacion: 'Los límites de edad exactos varían entre guías; la utilidad práctica no.',
        },
        {
          texto: 'La presión arterial del niño cae ___ en el deterioro circulatorio.',
          opciones: ['muy pronto', 'muy tarde', 'de forma gradual desde el inicio'],
          correcta: 1,
          explicacion: 'Es la característica que hace engañoso el deterioro pediátrico.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['REFERENCIA NO RESUELTA: el plan nombra PALS sin declarar edición; toda recomendación se contrasta con AHA 2025 hasta que la academia la identifique.'],
    }),
  },

  'm6-ip-anatomia-fisiologia': {
    icono: 'cp-smart-esqueleto-nino',
    duracion: '15 min',
    resumen: 'Las diferencias anatómicas y fisiológicas del niño no son curiosidades académicas: cada '
      + 'una tiene una consecuencia práctica inmediata. La cabeza grande explica por qué hay que '
      + 'acolchar bajo los hombros al inmovilizarlo; la vía aérea estrecha, por qué un edema pequeño '
      + 'la obstruye; el tórax elástico, por qué puede haber lesión pulmonar sin costillas rotas; y la '
      + 'superficie corporal relativa, por qué se enfría tan deprisa.',
    objetivos: [
      'Relacionar cada diferencia anatómica pediátrica con su consecuencia en la atención.',
      'Explicar las particularidades fisiológicas de la ventilación y de la circulación del niño.',
      'Anticipar las implicaciones térmicas y metabólicas de su tamaño.',
    ],
    secciones: [
      {
        titulo: 'Anatomía y su consecuencia',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Diferencia', 'Consecuencia práctica'],
            filas: [
              ['Cabeza proporcionalmente grande, con occipucio prominente', 'En decúbito supino el cuello se flexiona: hay que acolchar bajo los hombros para mantener la alineación y la vía aérea'],
              ['Lengua grande respecto a la cavidad oral', 'Es la causa más frecuente de obstrucción en el niño inconsciente'],
              ['Vía aérea de menor calibre', 'Un edema pequeño reduce mucho la luz y multiplica la resistencia al paso del aire'],
              ['Laringe más alta y anterior, epiglotis más blanda', 'Cambia la técnica de manejo avanzado, que depende de competencia y protocolo'],
              ['Tórax elástico, con costillas más flexibles', 'La energía se transmite al pulmón sin romper costillas: puede haber contusión pulmonar sin fracturas'],
              ['Mediastino móvil', 'Tolera peor el neumotórax a tensión, que se instaura con más rapidez'],
              ['Hígado y bazo menos cubiertos por la parrilla costal', 'Más expuestos en el trauma abdominal cerrado'],
              ['Superficie corporal grande respecto a la masa', 'Pierde calor con mucha rapidez, incluso en ambientes templados'],
              ['Huesos con cartílago de crecimiento', 'Lesiones propias en las zonas de crecimiento y mayor deformidad sin fractura completa'],
            ],
          },
        ],
      },
      {
        titulo: 'Fisiología',
        bloques: [
          { tipo: 'p', texto: 'El niño consume más oxígeno por kilogramo que el adulto y tiene menos reserva pulmonar, de modo que ante una apnea o una ventilación insuficiente desatura mucho antes. Además, su musculatura respiratoria se fatiga con rapidez: un niño que lleva tiempo respirando con esfuerzo puede pasar de trabajar mucho a dejar de trabajar, y ese silencio no es mejoría.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El niño que se cansa', texto: 'La disminución del esfuerzo respiratorio en un niño que llevaba rato con dificultad, o la aparición de somnolencia, no significan que esté mejorando: suelen indicar agotamiento y anteceden al paro. Es probablemente el signo más importante de todo el módulo.' },
          {
            tipo: 'lista',
            titulo: 'Circulación',
            items: [
              'El gasto cardiaco del niño depende sobre todo de la frecuencia: por eso la bradicardia en un niño es una urgencia y casi siempre significa hipoxia.',
              'Su volumen circulante total es pequeño, de modo que una pérdida que parecería moderada en un adulto puede ser crítica.',
              'Compensa con taquicardia y vasoconstricción; la piel fría, moteada y el relleno capilar lento aparecen antes que la hipotensión.',
              'La hipotensión en el niño es un signo tardío y de alarma, no el criterio con el que se reconoce el shock.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Temperatura y glucosa', texto: 'Dos consecuencias del tamaño que se olvidan con facilidad: el niño se enfría muy deprisa —y el recién nacido, todavía más—, y sus reservas de glucosa son limitadas, así que la hipoglucemia aparece con rapidez en cualquier situación de estrés o de ayuno. Cubrir y medir la glucemia, cuando está dentro del alcance, son dos medidas baratas y de alto rendimiento.' },
          mnemotecnia('CADA DIFERENCIA TIENE UNA CONSECUENCIA. Cabeza grande: acolchar bajo los hombros. Vía aérea estrecha: un edema pequeño la obstruye. Tórax elástico: contusión pulmonar sin costillas rotas. Superficie relativa grande: se enfría deprisa.'),
          masPreguntado('El niño que se cansa: la disminución del esfuerzo respiratorio o la aparición de somnolencia en un niño que llevaba rato con dificultad no significan mejoría, sino agotamiento, y anteceden al paro. Y que la bradicardia en un niño es una urgencia y casi siempre significa hipoxia.'),
        ],
      },
      erroresFrecuentes([
        ['Leer el descenso del esfuerzo como mejoría', 'Suele indicar agotamiento y antecede al paro. Es probablemente el signo más importante del módulo.'],
        ['Tratar una bradicardia pediátrica como un hallazgo menor', 'El gasto cardiaco del niño depende sobre todo de la frecuencia: la bradicardia es una urgencia y casi siempre significa hipoxia.'],
        ['Esperar la hipotensión para reconocer el shock', 'Es un signo tardío y de alarma. La piel fría y moteada y el relleno capilar lento aparecen antes.'],
        ['No acolchar bajo los hombros', 'En decúbito supino el occipucio prominente flexiona el cuello y compromete la alineación y la vía aérea.'],
      ]),
      repasoRapido([
        'Cabeza grande con occipucio prominente: acolchar bajo los hombros para mantener alineación y vía aérea.',
        'Lengua grande respecto a la cavidad oral: es la causa más frecuente de obstrucción en el niño inconsciente.',
        'Vía aérea de menor calibre: un edema pequeño reduce mucho la luz y multiplica la resistencia.',
        'Tórax elástico con costillas flexibles: puede haber contusión pulmonar sin fracturas.',
        'Mediastino móvil: tolera peor el neumotórax a tensión, que se instaura con más rapidez.',
        'Hígado y bazo menos cubiertos: más expuestos en el trauma abdominal cerrado.',
        'Superficie corporal grande respecto a la masa: pierde calor con mucha rapidez.',
        'Huesos con cartílago de crecimiento: lesiones propias y mayor deformidad sin fractura completa.',
        'Consume más oxígeno por kilogramo y tiene menos reserva: desatura antes ante una apnea.',
        'Su musculatura respiratoria se fatiga con rapidez: el descenso del esfuerzo es alarma.',
        'El gasto cardiaco depende sobre todo de la frecuencia: la bradicardia es una urgencia.',
        'Su volumen circulante es pequeño, y sus reservas de glucosa limitadas: la hipoglucemia aparece con rapidez.',
      ]),
      preguntasOrales([
        'Relaciona cada diferencia anatómica con su consecuencia práctica.',
        '¿Por qué un edema pequeño obstruye más en el niño?',
        '¿Por qué puede haber contusión pulmonar sin costillas rotas?',
        'Explica por qué el niño desatura antes.',
        '¿Qué significa el niño que se cansa?',
        '¿Por qué la bradicardia pediátrica es una urgencia?',
        '¿Cuándo aparece la hipotensión en el niño?',
        'Di las dos consecuencias del tamaño que más se olvidan.',
      ]),
      F([AHA_PALS_2025, AHA_PBLS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Occipucio prominente', definicion: 'Prominencia posterior del cráneo del niño que flexiona el cuello en decúbito supino y obliga a acolchar bajo los hombros.' },
      { termino: 'Reserva pulmonar reducida', definicion: 'Menor volumen de oxígeno disponible en el pulmón respecto al consumo, que hace que el niño desature antes.' },
      { termino: 'Fatiga respiratoria', definicion: 'Agotamiento de la musculatura respiratoria tras un esfuerzo sostenido; el descenso del trabajo respiratorio precede al paro.' },
      { termino: 'Bradicardia pediátrica', definicion: 'Descenso de la frecuencia cardiaca en el niño; casi siempre indica hipoxia y constituye una urgencia.' },
    ],
    flashcards: [
      { frente: '¿Por qué se acolcha bajo los hombros del niño en decúbito supino?', reverso: 'Porque su occipucio prominente flexiona el cuello y compromete la vía aérea.' },
      { frente: '¿Puede haber contusión pulmonar sin fracturas costales en el niño?', reverso: 'Sí: su tórax elástico transmite la energía al pulmón sin romper las costillas.' },
      { frente: '¿Qué significa la bradicardia en un niño?', reverso: 'Casi siempre hipoxia; es una urgencia.' },
      { frente: '¿Qué indica que un niño con dificultad respiratoria empiece a esforzarse menos?', reverso: 'Agotamiento, no mejoría: suele preceder al paro.' },
      { frente: '¿Por qué el niño se enfría tan deprisa?', reverso: 'Por su gran superficie corporal en relación con su masa.' },
      { frente: '¿Es la hipotensión el criterio para reconocer el shock pediátrico?', reverso: 'No: es un signo tardío. Antes aparecen taquicardia, piel fría y moteada y relleno capilar lento.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante con dificultad respiratoria intensa desde hace una hora que ahora respira más despacio y está somnoliento. ¿Qué ocurre?',
        opciones: [
          'Está mejorando y se está durmiendo.',
          'Se está agotando: el descenso del esfuerzo respiratorio con somnolencia precede al paro.',
          'Tiene fiebre alta.',
          'Ha resuelto la obstrucción.',
        ],
        correcta: 1,
        explicacion: 'Es el signo más importante del módulo y el que con más frecuencia se interpreta al revés.',
      },
      {
        pregunta: 'Niño politraumatizado con tórax sin fracturas visibles y dificultad respiratoria creciente. ¿Qué explica esa combinación?',
        opciones: [
          'Que no hay lesión torácica.',
          'Que su tórax elástico puede transmitir la energía al pulmón sin romper costillas: cabe contusión pulmonar sin fracturas.',
          'Que el dolor es simulado.',
          'Que la lesión es exclusivamente abdominal.',
        ],
        correcta: 1,
        explicacion: 'La ausencia de fracturas costales en el niño no descarta lesión pulmonar; más bien obliga a buscarla.',
      },
      {
        pregunta: '¿Por qué la bradicardia es una urgencia en el niño?',
        opciones: [
          'Porque indica un problema del sistema de conducción.',
          'Porque su gasto cardiaco depende sobre todo de la frecuencia y la bradicardia casi siempre significa hipoxia.',
          'Porque precede a la fiebre.',
          'Porque es un hallazgo normal en el lactante.',
        ],
        correcta: 1,
        explicacion: 'Corregir la oxigenación y la ventilación es la primera respuesta ante un niño bradicárdico.',
      },
      {
        pregunta: '¿Por qué se mide la glucemia en un niño con alteración del estado general?',
        opciones: [
          'Por rutina administrativa.',
          'Porque sus reservas de glucosa son limitadas y la hipoglucemia aparece con rapidez ante el estrés o el ayuno.',
          'Porque la hipoglucemia solo ocurre en diabéticos.',
          'Porque sustituye a la valoración respiratoria.',
        ],
        correcta: 1,
        explicacion: 'Es una medida barata que explica cuadros neurológicos que de otro modo se atribuirían a otra causa.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La causa más frecuente de obstrucción de la vía aérea en el niño inconsciente es la ___.',
          opciones: ['epiglotis', 'lengua', 'tráquea'],
          correcta: 1,
          explicacion: 'Es grande respecto a la cavidad oral y cae hacia atrás al perder el tono.',
        },
        {
          texto: 'El gasto cardiaco del niño depende sobre todo de la ___.',
          opciones: ['presión arterial', 'frecuencia cardiaca', 'temperatura'],
          correcta: 1,
          explicacion: 'Por eso la bradicardia compromete tan rápidamente la perfusión.',
        },
        {
          texto: 'La hipotensión en el niño es un signo ___ del shock.',
          opciones: ['precoz', 'tardío', 'inespecífico'],
          correcta: 1,
          explicacion: 'Antes aparecen la taquicardia, la piel fría y moteada y el relleno capilar lento.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ip-crecimiento': {
    icono: 'cp-smart-esqueleto-nino',
    duracion: '13 min',
    resumen: 'Conocer el desarrollo sirve para dos cosas muy concretas en la atención de urgencia: '
      + 'saber cómo abordar a un paciente según su etapa, y detectar cuando algo no encaja. Un niño '
      + 'que ha perdido habilidades que ya tenía, o cuyo relato de lesión no corresponde a lo que a su '
      + 'edad puede hacer, plantea preguntas que un adulto no plantearía. La lección recorre las '
      + 'etapas desde ese punto de vista práctico.',
    objetivos: [
      'Reconocer los hitos generales del desarrollo y su utilidad en la valoración de urgencia.',
      'Adaptar la comunicación y la exploración a cada etapa.',
      'Detectar incongruencias entre el desarrollo del niño y el relato de lo ocurrido.',
    ],
    secciones: [
      {
        titulo: 'Etapas y abordaje',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Etapa', 'Qué puede hacer', 'Cómo se aborda'],
            filas: [
              ['Recién nacido y lactante pequeño', 'Sostiene la cabeza progresivamente; sonríe; sigue con la mirada', 'Mantener el calor, valorar con el cuidador cerca, minimizar la manipulación'],
              ['Lactante mayor', 'Se sienta, gatea, se lleva objetos a la boca, empieza a ponerse de pie', 'Angustia con extraños: explorar en brazos del cuidador siempre que se pueda'],
              ['Preescolar', 'Camina y corre, habla, empieza a razonar de forma concreta', 'Frases cortas y literales; permitir que toque el material; explicar antes de tocar'],
              ['Escolar', 'Comprende explicaciones y causas, colabora si se le informa', 'Hablarle directamente, darle opciones cuando sea posible, respetar su pudor'],
              ['Adolescente', 'Piensa de forma abstracta; le importan la autonomía y la imagen', 'Ofrecer intimidad, preguntar a solas cuando proceda y explicar la confidencialidad y sus límites'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El adolescente necesita un momento a solas', texto: 'Determinada información —consumo de sustancias, actividad sexual, ideación autolítica, violencia en el entorno— rara vez se comparte delante de la familia. Ofrecer un momento a solas, si la situación clínica y el procedimiento del servicio lo permiten, forma parte de la buena práctica. También lo es explicar con honestidad qué se puede mantener reservado y qué no.' },
        ],
      },
      {
        titulo: 'Cuando algo no encaja',
        bloques: [
          { tipo: 'p', texto: 'El desarrollo también sirve como referencia. Un lactante que aún no se da la vuelta no puede caer de un cambiador por sí solo; un niño que no camina no puede haberse golpeado corriendo. Cuando el relato de lo ocurrido exige una habilidad que el niño no tiene, la incongruencia se documenta con lo que se ve y se oye, sin juicios ni acusaciones, y se comunica en la entrega. El tema de abuso infantil desarrolla esa situación.' },
          {
            tipo: 'lista',
            titulo: 'Otras señales que conviene registrar',
            items: [
              'Pérdida de habilidades que el niño ya había adquirido, según refiere su cuidador.',
              'Comportamiento que no corresponde a su edad: apatía extrema, ausencia de reacción a la exploración o miedo desproporcionado.',
              'Diferencias llamativas entre lo que cuenta el niño y lo que cuenta el adulto.',
              'Retraso en solicitar atención sin una explicación razonable.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Un dato que vale para toda la atención', texto: 'Preguntar al cuidador «¿está como siempre?» es una de las preguntas más rentables de la pediatría de urgencia. Quien convive con el niño detecta cambios sutiles de conducta, de tono o de alimentación mucho antes que cualquier escala, y esa impresión merece registrarse.' },
          mnemotecnia('«¿ESTÁ COMO SIEMPRE?». Es una de las preguntas más rentables de la pediatría de urgencia: quien convive con el niño detecta cambios de conducta, de tono o de alimentación mucho antes que cualquier escala.'),
          masPreguntado('Que el desarrollo también sirve como referencia para detectar incongruencias: un lactante que aún no se da la vuelta no puede caer de un cambiador por sí solo, y un niño que no camina no puede haberse golpeado corriendo.'),
        ],
      },
      erroresFrecuentes([
        ['No preguntar si está como siempre', 'Es la pregunta que aporta la referencia de normalidad, y solo la tiene quien convive con el niño.'],
        ['Aceptar un relato que exige una habilidad que el niño no tiene', 'Cuando lo ocurrido requiere algo que el niño no puede hacer, hay una incongruencia que se registra.'],
        ['No ofrecer un momento a solas al adolescente', 'Consumo, actividad sexual, ideación autolítica o violencia en el entorno rara vez se comparten delante de la familia.'],
        ['No registrar la pérdida de habilidades', 'Que el niño haya perdido algo que ya había adquirido, según refiere su cuidador, es un dato que se documenta.'],
      ]),
      repasoRapido([
        'El desarrollo sirve para dos cosas: saber cómo abordar al paciente y detectar cuando algo no encaja.',
        'Recién nacido y lactante pequeño: mantener el calor, valorar con el cuidador cerca y minimizar la manipulación.',
        'Lactante mayor: angustia con extraños; se explora en brazos del cuidador siempre que se pueda.',
        'Preescolar: frases cortas y literales, permitir que toque el material y explicar antes de tocar.',
        'Escolar: hablarle directamente, darle opciones cuando sea posible y respetar su pudor.',
        'Adolescente: ofrecer intimidad, preguntar a solas cuando proceda y explicar la confidencialidad y sus límites.',
        'Un relato que exige una habilidad que el niño no tiene es una incongruencia.',
        'Se registra la pérdida de habilidades que el niño ya había adquirido.',
        'También el comportamiento que no corresponde a su edad: apatía extrema, ausencia de reacción o miedo desproporcionado.',
        'También las diferencias llamativas entre lo que cuenta el niño y lo que cuenta el adulto.',
        'También el retraso en solicitar atención sin una explicación razonable.',
        '«¿Está como siempre?» es una de las preguntas más rentables de la pediatría de urgencia.',
      ]),
      preguntasOrales([
        '¿Para qué sirve conocer el desarrollo en una urgencia?',
        'Recorre las etapas y cómo se aborda cada una.',
        '¿Por qué el adolescente necesita un momento a solas?',
        'Pon un ejemplo de incongruencia entre relato y desarrollo.',
        'Enumera las señales que conviene registrar.',
        '¿Qué es una regresión y por qué se documenta?',
        'Di la pregunta más rentable y explica por qué lo es.',
        '¿Cómo se explora a un lactante mayor?',
      ]),
      F([AHA_PALS_2025, WHO_BEC, PALS_PENDIENTE]),
    ],
    conceptosClave: [
      { termino: 'Hito del desarrollo', definicion: 'Habilidad que se adquiere de forma esperable a una edad determinada; sirve de referencia para valorar congruencia.' },
      { termino: 'Incongruencia entre relato y desarrollo', definicion: 'Situación en que la explicación de la lesión exige una capacidad que el niño no ha alcanzado.' },
      { termino: 'Regresión', definicion: 'Pérdida de habilidades ya adquiridas, referida por el cuidador; hallazgo que debe documentarse.' },
    ],
    flashcards: [
      { frente: '¿Para qué sirve el desarrollo en la urgencia pediátrica?', reverso: 'Para adaptar la comunicación y la exploración, y para detectar cuando el relato no encaja con lo que el niño puede hacer.' },
      { frente: '¿Cómo se explora a un lactante mayor?', reverso: 'En brazos de su cuidador siempre que sea posible, porque la angustia ante extraños dificulta la valoración.' },
      { frente: '¿Qué necesita el adolescente durante la atención?', reverso: 'Intimidad, ser tratado como interlocutor y una explicación honesta sobre la confidencialidad y sus límites.' },
      { frente: 'La pregunta más rentable al cuidador', reverso: '«¿Está como siempre?».' },
      { frente: '¿Qué se hace ante una incongruencia entre relato y desarrollo?', reverso: 'Se documenta lo que se ve y se oye, sin juicios, y se comunica en la entrega.' },
    ],
    quiz: [
      {
        pregunta: 'Traen a un lactante de dos meses por «caída al darse la vuelta en el sofá». ¿Qué observación cabe hacer?',
        opciones: [
          'Ninguna: es una caída doméstica frecuente.',
          'Que a esa edad el niño habitualmente no se da la vuelta solo: la incongruencia se documenta con lo observado, sin juicios, y se comunica.',
          'Que debe acusarse al cuidador en la escena.',
          'Que el relato confirma un mecanismo de baja energía.',
        ],
        correcta: 1,
        explicacion: 'El desarrollo sirve de referencia; la documentación objetiva es la aportación del equipo, no el juicio.',
      },
      {
        pregunta: 'Adolescente traído por sus padres tras un episodio de mareo. ¿Qué buena práctica se ajusta a su etapa?',
        opciones: [
          'Preguntar todo delante de la familia para no perder información.',
          'Ofrecer un momento a solas si la situación y el procedimiento lo permiten, y explicar qué se mantiene reservado y qué no.',
          'Dirigirse solo a los padres.',
          'Evitar cualquier pregunta sobre consumo o salud mental.',
        ],
        correcta: 1,
        explicacion: 'Determinada información rara vez se comparte delante de la familia.',
      },
      {
        pregunta: 'El cuidador refiere que el niño «no está como siempre», aunque los signos vitales sean normales. ¿Qué valor tiene?',
        opciones: [
          'Ninguno sin alteración objetiva.',
          'Alto: quien convive con el niño detecta cambios sutiles antes que cualquier escala, y esa impresión se registra.',
          'Solo si el niño tiene fiebre.',
          'Sustituye a la exploración física.',
        ],
        correcta: 1,
        explicacion: 'Es una de las observaciones más útiles de la pediatría de urgencia.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Al lactante mayor conviene explorarlo ___ siempre que sea posible.',
          opciones: ['separado del cuidador', 'en brazos de su cuidador', 'dormido'],
          correcta: 1,
          explicacion: 'La angustia ante extraños dificulta la valoración y falsea los hallazgos.',
        },
        {
          texto: 'La pérdida de habilidades que el niño ya había adquirido se denomina ___ y debe documentarse.',
          opciones: ['regresión', 'progresión', 'adaptación'],
          correcta: 0,
          explicacion: 'Es un dato que aporta el cuidador y que orienta la valoración posterior.',
        },
        {
          texto: 'Ante una incongruencia entre el relato y lo que el niño puede hacer, el equipo ___.',
          opciones: [
            'acusa en la escena',
            'documenta lo observado sin juicios y lo comunica',
            'omite el dato para no generar conflicto',
          ],
          correcta: 1,
          explicacion: 'La documentación objetiva es la aportación real; el juicio corresponde a otras instancias.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ip-impresion-general': {
    icono: 'cp-dbcls-examen-nino',
    duracion: '12 min',
    resumen: 'La impresión general es lo que se decide en los primeros segundos, desde la puerta y sin '
      + 'tocar al paciente: si este niño está bien, está enfermo o está crítico. No es una intuición: '
      + 'se apoya en lo que se ve y se oye —cómo se comporta, cómo respira, qué color tiene— y '
      + 'determina el ritmo de toda la atención. En pediatría vale especialmente, porque los signos '
      + 'vitales pueden ser normales en un niño que está a punto de deteriorarse.',
    objetivos: [
      'Formar una impresión general estructurada desde los primeros segundos.',
      'Clasificar al paciente en estable, inestable o crítico y actuar en consecuencia.',
      'Justificar por qué la impresión precede a la toma de signos vitales.',
    ],
    secciones: [
      {
        titulo: 'Qué se observa antes de tocar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Desde la puerta',
            items: [
              'Qué está haciendo el niño: juega, mira, llora con fuerza, o está quieto y ausente.',
              'Cómo respira: si se le oye, si usa músculos accesorios, si adopta una postura para respirar mejor.',
              'Qué color tiene: sonrosado, pálido, moteado o azulado.',
              'Cómo reacciona a la llegada de desconocidos: un niño que no reacciona ante extraños es un dato de alarma.',
              'Cómo interactúa con su cuidador: si busca consuelo o si está demasiado apático para hacerlo.',
              'Qué hay alrededor: medicación, dispositivos, condiciones de la vivienda, otros niños.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El niño que no protesta', texto: 'Un niño enfermo que no llora cuando se le explora, que no busca a su cuidador o que no reacciona ante desconocidos preocupa más que uno que grita. El llanto vigoroso es tranquilizador; la quietud, no. Es la inversión más útil de la intuición del adulto.' },
        ],
      },
      {
        titulo: 'La clasificación y lo que implica',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Impresión', 'Qué se observa', 'Qué implica'],
            filas: [
              ['Estable', 'Interactúa, respira sin esfuerzo, color normal', 'Valoración ordenada, sin prisa'],
              ['Inestable', 'Alterado en una de las tres áreas: comportamiento, respiración o color', 'Intervención dirigida, reevaluación frecuente y decisión de traslado'],
              ['Crítico', 'Alterado en varias áreas, o no responde', 'Intervención inmediata sobre lo que falla y traslado sin demoras'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los signos vitales normales no anulan una mala impresión', texto: 'Un niño puede tener frecuencia cardiaca y presión dentro de rango y estar gravemente enfermo, porque compensa. Si la impresión general es mala, la conducta la marca la impresión, no la cifra. Lo contrario también es cierto: una cifra alarmante en un niño que juega y protesta obliga a comprobar la medición antes de actuar.' },
          {
            tipo: 'lista',
            titulo: 'Qué se hace con la impresión',
            items: [
              'Decidir el ritmo: si hay que intervenir de inmediato o se puede completar la valoración.',
              'Decidir dónde se atiende: en el lugar o en la ambulancia.',
              'Decidir si se solicita apoyo antes de seguir.',
              'Registrarla con palabras concretas —qué hacía, cómo respiraba, qué color tenía— y con la hora, para poder compararla después.',
            ],
          },
          mnemotecnia('EL LLANTO VIGOROSO TRANQUILIZA; LA QUIETUD NO. Un niño enfermo que no llora cuando se le explora, que no busca a su cuidador o que no reacciona ante desconocidos preocupa más que uno que grita.'),
          masPreguntado('Que los signos vitales normales no anulan una mala impresión: un niño puede tener frecuencia y presión dentro de rango y estar gravemente enfermo, porque compensa. Si la impresión general es mala, la conducta la marca la impresión, no la cifra.'),
        ],
      },
      erroresFrecuentes([
        ['Tranquilizarse con signos vitales normales', 'El niño compensa. Si la impresión general es mala, la conducta la marca la impresión.'],
        ['Interpretar la quietud como calma', 'Un niño que no protesta, no busca a su cuidador ni reacciona ante extraños es un dato de alarma.'],
        ['Tomar los signos vitales antes de mirar', 'La impresión general se forma desde la puerta y sin tocar al paciente, y determina el ritmo de toda la atención.'],
        ['Registrar la impresión con una etiqueta', 'Se registra con palabras concretas —qué hacía, cómo respiraba, qué color tenía— y con la hora, para poder compararla.'],
      ]),
      repasoRapido([
        'La impresión general se decide en los primeros segundos, desde la puerta y sin tocar al paciente.',
        'No es una intuición: se apoya en cómo se comporta, cómo respira y qué color tiene.',
        'Se observa qué está haciendo el niño: juega, mira, llora con fuerza, o está quieto y ausente.',
        'Cómo respira: si se le oye, si usa músculos accesorios, si adopta una postura.',
        'Qué color tiene, cómo reacciona ante desconocidos y cómo interactúa con su cuidador.',
        'También qué hay alrededor: medicación, dispositivos, condiciones de la vivienda, otros niños.',
        'El niño que no protesta preocupa más que el que grita.',
        'Estable: interactúa, respira sin esfuerzo, color normal. Valoración ordenada.',
        'Inestable: alterado en una de las tres áreas. Intervención dirigida y reevaluación frecuente.',
        'Crítico: alterado en varias áreas o no responde. Intervención inmediata y traslado sin demoras.',
        'Los signos vitales normales no anulan una mala impresión.',
        'Con la impresión se decide el ritmo, dónde se atiende, si se solicita apoyo, y se registra con la hora.',
      ]),
      preguntasOrales([
        '¿Qué se observa antes de tocar al paciente?',
        '¿Por qué la impresión precede a los signos vitales?',
        '¿Qué significa un niño que no protesta?',
        'Clasifica al paciente en las tres categorías y di qué implica cada una.',
        '¿Anulan los signos vitales normales una mala impresión?',
        '¿Y una cifra alterada en un niño con buena impresión?',
        '¿Qué se hace con la impresión general?',
        '¿Cómo se registra para poder compararla?',
      ]),
      F([AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Impresión general', definicion: 'Valoración inmediata y sin contacto que clasifica al paciente en estable, inestable o crítico.' },
      { termino: 'Signo de alarma conductual', definicion: 'Ausencia de reacción del niño ante extraños, ante la exploración o ante su cuidador.' },
      { termino: 'Compensación enmascarada', definicion: 'Situación en que los signos vitales permanecen dentro de rango en un niño que ya está gravemente enfermo.' },
    ],
    flashcards: [
      { frente: '¿Cuándo se forma la impresión general?', reverso: 'En los primeros segundos, desde la puerta y sin tocar al paciente.' },
      { frente: '¿Qué preocupa más, un niño que grita o uno que está quieto?', reverso: 'El que está quieto: el llanto vigoroso es tranquilizador.' },
      { frente: '¿Qué manda si la impresión es mala y los signos vitales normales?', reverso: 'La impresión general.' },
      { frente: 'Las tres áreas que se observan sin tocar', reverso: 'Comportamiento, respiración y color.' },
      { frente: '¿Cómo se registra la impresión?', reverso: 'Con palabras concretas sobre lo observado y con la hora, para poder compararla.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante que no llora al explorarlo, no busca a su madre y está pálido, con frecuencia cardiaca dentro de rango. ¿Qué impresión tienes?',
        opciones: [
          'Estable: los signos vitales son normales.',
          'Crítica o al menos inestable: la ausencia de reacción y la palidez pesan más que una cifra normal.',
          'Estable si no tiene fiebre.',
          'Imposible de valorar sin analítica.',
        ],
        correcta: 1,
        explicacion: 'La compensación puede mantener las cifras mientras el niño está gravemente enfermo.',
      },
      {
        pregunta: 'Encuentras una frecuencia cardiaca alarmante en un niño que juega y protesta enérgicamente. ¿Qué haces?',
        opciones: [
          'Actúas de inmediato según la cifra.',
          'Compruebas la medición antes de actuar: la impresión general no cuadra con el dato.',
          'Ignoras la cifra definitivamente.',
          'Trasladas sin más valoración.',
        ],
        correcta: 1,
        explicacion: 'La discordancia entre impresión y cifra obliga a verificar antes de decidir.',
      },
      {
        pregunta: '¿Para qué sirve la impresión general además de clasificar?',
        opciones: [
          'Para calcular la dosis de medicación.',
          'Para decidir el ritmo de la atención, dónde se atiende y si se pide apoyo antes de seguir.',
          'Para sustituir la exploración física.',
          'Para establecer el diagnóstico.',
        ],
        correcta: 1,
        explicacion: 'Es una herramienta de decisión operativa, no un diagnóstico.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Un niño que no reacciona ante desconocidos es un dato de ___.',
          opciones: ['normalidad', 'alarma', 'timidez esperable'],
          correcta: 1,
          explicacion: 'La ausencia de reacción preocupa más que el llanto vigoroso.',
        },
        {
          texto: 'Si la impresión general es mala y los signos vitales son normales, manda la ___.',
          opciones: ['cifra', 'impresión general', 'edad del paciente'],
          correcta: 1,
          explicacion: 'El niño compensa y mantiene las cifras hasta fases tardías.',
        },
        {
          texto: 'La impresión general se forma ___ tocar al paciente.',
          opciones: ['después de', 'sin', 'mientras se termina de'],
          correcta: 1,
          explicacion: 'Se apoya en lo que se ve y se oye desde la puerta.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ip-triangulo': {
    icono: 'cp-dbcls-examen-nino',
    duracion: '14 min',
    resumen: 'El triángulo de evaluación pediátrica ordena la impresión general en tres lados '
      + 'observables sin tocar al paciente: apariencia, trabajo respiratorio y circulación cutánea. '
      + 'Su valor no está en cada lado por separado, sino en qué combinación aparece alterada, porque '
      + 'esa combinación orienta si el problema es respiratorio, circulatorio, neurológico o de varios '
      + 'sistemas a la vez. Es la herramienta más práctica del módulo y no requiere ningún material.',
    objetivos: [
      'Describir los tres lados del triángulo y lo que se observa en cada uno.',
      'Interpretar las combinaciones de lados alterados y su orientación.',
      'Aplicar el triángulo como herramienta de decisión inicial y de reevaluación.',
    ],
    secciones: [
      {
        titulo: 'Los tres lados',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Lado', 'Qué se observa'],
            filas: [
              ['Apariencia', 'Tono muscular, capacidad de interactuar, si se consuela, cómo mira y sigue con la mirada, y si el llanto es vigoroso o débil'],
              ['Trabajo respiratorio', 'Ruidos audibles sin fonendoscopio, postura para respirar, aleteo nasal, tiraje y retracciones, y balanceo de la cabeza en el lactante'],
              ['Circulación cutánea', 'Color de la piel y de las mucosas: palidez, moteado o cianosis'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La apariencia es el lado que más informa', texto: 'Refleja de forma indirecta si el cerebro está recibiendo oxígeno y glucosa suficientes. Un niño con apariencia alterada tiene un problema, aunque el resto parezca normal, y esa alteración obliga a buscar la causa: respiratoria, circulatoria, neurológica, metabólica o tóxica.' },
        ],
      },
      {
        titulo: 'Qué significa cada combinación',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Lados alterados', 'Orientación'],
            filas: [
              ['Ninguno', 'Estable: valoración ordenada'],
              ['Solo trabajo respiratorio', 'Dificultad respiratoria: el niño compensa y todavía mantiene el resto'],
              ['Trabajo respiratorio y apariencia', 'Fallo respiratorio: la compensación ya no basta'],
              ['Solo circulación cutánea', 'Compromiso circulatorio compensado'],
              ['Circulación cutánea y apariencia', 'Shock descompensado'],
              ['Solo apariencia', 'Disfunción del sistema nervioso central o problema metabólico: buscar causa neurológica, hipoglucemia, tóxico o sepsis incipiente'],
              ['Los tres', 'Fallo cardiopulmonar: intervención inmediata y traslado sin demoras'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La combinación que anuncia el paro', texto: 'Cuando los tres lados están alterados, el niño está en fallo cardiopulmonar y el paro puede ser inminente. En ese punto no se completa la valoración antes de intervenir: se actúa sobre lo que falla —oxigenación y ventilación en primer lugar— y se traslada.' },
          { tipo: 'p', texto: 'El triángulo se repite. No es una foto del primer contacto, sino un instrumento de comparación: se aplica al llegar, tras cada intervención y durante el traslado, y se documenta con la hora. Un lado que se altera entre dos valoraciones es un deterioro, aunque el niño siga hablando.' },
          mnemotecnia('APARIENCIA, RESPIRACIÓN Y PIEL. Tres lados observables sin tocar y sin material. Su valor no está en cada lado por separado, sino en qué COMBINACIÓN aparece alterada.'),
          masPreguntado('La combinación que anuncia el paro: cuando los tres lados están alterados el niño está en fallo cardiopulmonar y el paro puede ser inminente. En ese punto no se completa la valoración antes de intervenir. Y que la apariencia es el lado que más informa.'),
        ],
      },
      erroresFrecuentes([
        ['Leer los lados por separado', 'El valor está en la combinación: es la que orienta si el problema es respiratorio, circulatorio, neurológico o de varios sistemas.'],
        ['Restar importancia a una apariencia alterada', 'Refleja de forma indirecta si el cerebro recibe oxígeno y glucosa. Un niño con apariencia alterada tiene un problema aunque el resto parezca normal.'],
        ['Completar la valoración con los tres lados alterados', 'Ahí el niño está en fallo cardiopulmonar: se actúa sobre lo que falla, con prioridad para la oxigenación y la ventilación.'],
        ['Aplicar el triángulo una sola vez', 'No es una foto: se aplica al llegar, tras cada intervención y durante el traslado, y se documenta con la hora.'],
      ]),
      repasoRapido([
        'Apariencia: tono muscular, capacidad de interactuar, si se consuela, cómo mira y si el llanto es vigoroso o débil.',
        'Trabajo respiratorio: ruidos audibles sin fonendoscopio, postura, aleteo nasal, tiraje y balanceo de la cabeza en el lactante.',
        'Circulación cutánea: color de la piel y de las mucosas —palidez, moteado o cianosis—.',
        'La apariencia es el lado que más informa.',
        'Ningún lado alterado: estable, valoración ordenada.',
        'Solo trabajo respiratorio: dificultad respiratoria; el niño compensa y mantiene el resto.',
        'Trabajo respiratorio y apariencia: fallo respiratorio; la compensación ya no basta.',
        'Solo circulación cutánea: compromiso circulatorio compensado.',
        'Circulación cutánea y apariencia: shock descompensado.',
        'Solo apariencia: disfunción del sistema nervioso central o problema metabólico; buscar causa neurológica, hipoglucemia, tóxico o sepsis incipiente.',
        'Los tres lados: fallo cardiopulmonar; intervención inmediata y traslado sin demoras.',
        'El triángulo se repite y se documenta con la hora: un lado que se altera entre dos valoraciones es un dato.',
      ]),
      preguntasOrales([
        'Describe los tres lados del triángulo y qué se observa en cada uno.',
        '¿Cuál es el lado que más informa, y por qué?',
        '¿Qué orienta cada combinación de lados alterados?',
        '¿Qué significa que solo esté alterada la apariencia?',
        '¿Cuál es la combinación que anuncia el paro?',
        '¿Qué se hace en ese punto?',
        '¿Se aplica una sola vez? Justifícalo.',
        '¿Qué material requiere el triángulo?',
      ]),
      F([AHA_PALS_2025, WHO_BEC, PALS_PENDIENTE]),
    ],
    conceptosClave: [
      { termino: 'Triángulo de evaluación pediátrica', definicion: 'Herramienta de valoración inicial sin contacto basada en apariencia, trabajo respiratorio y circulación cutánea.' },
      { termino: 'Apariencia', definicion: 'Lado del triángulo que refleja el estado del sistema nervioso central: tono, interacción, consuelo, mirada y llanto.' },
      { termino: 'Fallo respiratorio', definicion: 'Situación en que la dificultad respiratoria ya afecta a la apariencia porque la compensación resulta insuficiente.' },
      { termino: 'Fallo cardiopulmonar', definicion: 'Alteración simultánea de los tres lados del triángulo; el paro puede ser inminente.' },
    ],
    flashcards: [
      { frente: 'Los tres lados del triángulo', reverso: 'Apariencia, trabajo respiratorio y circulación cutánea.' },
      { frente: '¿Qué refleja la apariencia?', reverso: 'Si el cerebro recibe oxígeno y glucosa suficientes.' },
      { frente: 'Trabajo respiratorio y apariencia alterados: ¿qué es?', reverso: 'Fallo respiratorio: la compensación ya no basta.' },
      { frente: 'Circulación cutánea y apariencia alteradas: ¿qué es?', reverso: 'Shock descompensado.' },
      { frente: 'Solo la apariencia alterada: ¿qué se busca?', reverso: 'Causa neurológica, hipoglucemia, tóxico o sepsis incipiente.' },
      { frente: '¿Se aplica el triángulo una sola vez?', reverso: 'No: se repite al llegar, tras cada intervención y durante el traslado, con la hora.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con tiraje y aleteo nasal, pero que interactúa con normalidad y tiene buen color. ¿Qué indica el triángulo?',
        opciones: [
          'Fallo cardiopulmonar.',
          'Dificultad respiratoria: solo está alterado el trabajo respiratorio y el niño todavía compensa.',
          'Shock descompensado.',
          'Problema neurológico primario.',
        ],
        correcta: 1,
        explicacion: 'Un solo lado alterado indica compensación en curso; la vigilancia debe ser estrecha.',
      },
      {
        pregunta: 'El mismo niño, veinte minutos después, está somnoliento y menos reactivo. ¿Qué ha cambiado?',
        opciones: [
          'Nada relevante: se ha dormido.',
          'Se ha alterado también la apariencia: ha pasado a fallo respiratorio y hay que intervenir sin esperar más.',
          'Ha mejorado el trabajo respiratorio.',
          'Ha entrado en shock descompensado.',
        ],
        correcta: 1,
        explicacion: 'La alteración de la apariencia indica que la compensación ya no basta.',
      },
      {
        pregunta: 'Lactante hipotónico, pálido y moteado, con respiración irregular. ¿Qué corresponde?',
        opciones: [
          'Completar toda la valoración antes de intervenir.',
          'Reconocer fallo cardiopulmonar: intervenir de inmediato sobre oxigenación y ventilación y trasladar sin demoras.',
          'Esperar a tomar la presión arterial.',
          'Tranquilizar a la familia y observar.',
        ],
        correcta: 1,
        explicacion: 'Con los tres lados alterados el paro puede ser inminente.',
      },
      {
        pregunta: 'Niño con buen color y sin trabajo respiratorio, pero apático y que no fija la mirada. ¿Qué buscas?',
        opciones: [
          'Solo un problema respiratorio.',
          'Causa neurológica, hipoglucemia, tóxico o sepsis incipiente: solo la apariencia está alterada.',
          'Una fractura.',
          'Nada: el color y la respiración son normales.',
        ],
        correcta: 1,
        explicacion: 'La apariencia alterada de forma aislada dirige la búsqueda fuera del aparato respiratorio.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Aplicas el triángulo a las 10:05 y encuentras solo trabajo respiratorio alterado. A las 10:20, tras una intervención, el trabajo respiratorio ha disminuido pero el niño está menos reactivo. ¿Cómo lo interpretas?',
          opciones: [
            'Como mejoría: el trabajo respiratorio ha bajado.',
            'Como deterioro: la apariencia se ha alterado y el descenso del esfuerzo respiratorio en un niño que llevaba rato compensando suele indicar agotamiento, no mejoría.',
            'Como efecto normal del traslado.',
            'Como necesidad de repetir el triángulo dentro de una hora.',
          ],
          correcta: 1,
          explicacion: 'El triángulo se usa para comparar, y esta combinación es la que el módulo señala como más engañosa.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm6-ip-xabcde': {
    icono: 'ic-nino',
    duracion: '15 min',
    resumen: 'Tras la impresión general viene la evaluación ordenada. La secuencia XABCDE antepone la '
      + 'X de hemorragia exanguinante, porque un sangrado masivo mata antes que una vía aérea '
      + 'comprometida, y después recorre vía aérea, ventilación, circulación, estado neurológico y '
      + 'exposición. La lección desarrolla cada letra con lo que cambia en el niño y mantiene la regla '
      + 'que la hace útil: no se avanza dejando atrás un problema sin resolver.',
    objetivos: [
      'Ejecutar la secuencia XABCDE adaptada al paciente pediátrico.',
      'Identificar en cada letra las particularidades del niño.',
      'Aplicar la regla de no avanzar con un problema sin resolver y reevaluar.',
    ],
    secciones: [
      {
        titulo: 'La secuencia',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Letra', 'Qué se valora', 'Qué cambia en el niño'],
            filas: [
              ['X — Hemorragia exanguinante', 'Sangrado masivo visible', 'Su volumen circulante es pequeño: una pérdida moderada para un adulto puede ser crítica'],
              ['A — Vía aérea', 'Permeabilidad, con control cervical si el mecanismo lo indica', 'Lengua grande, occipucio prominente: acolchar bajo los hombros y evitar la hiperextensión'],
              ['B — Ventilación', 'Frecuencia, esfuerzo, simetría, ruidos y oxigenación', 'Desatura antes y se fatiga antes; el descenso del esfuerzo es alarma'],
              ['C — Circulación', 'Frecuencia y calidad del pulso, piel, relleno capilar y presión', 'Mantiene la presión hasta muy tarde; la bradicardia suele ser hipoxia'],
              ['D — Estado neurológico', 'Nivel de conciencia, pupilas, movilidad y glucemia', 'Escala adaptada a su edad; la hipoglucemia aparece con rapidez'],
              ['E — Exposición', 'Descubrir para explorar y volver a cubrir', 'Se enfría muy deprisa: la exposición debe ser breve y con el habitáculo caliente'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué la X va primero', texto: 'La secuencia clásica empezaba por la vía aérea. Se antepuso la hemorragia exanguinante porque un sangrado masivo puede acabar con el paciente en menos tiempo del que se tarda en asegurar una vía aérea. En el niño ese argumento pesa aún más, porque su volumen total es pequeño y la reserva, mínima.' },
        ],
      },
      {
        titulo: 'La regla que hace útil la secuencia',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No se avanza con un problema sin resolver', texto: 'Si en la A hay una vía aérea comprometida, no se pasa a la B hasta haberla resuelto en la medida en que el alcance lo permita. El orden no es un formulario que se rellena: es una jerarquía de amenazas. Y cada vez que se interviene sobre una letra, se vuelve al principio para comprobar que lo anterior sigue en orden.' },
          {
            tipo: 'lista',
            titulo: 'Detalles pediátricos que se olvidan',
            items: [
              'Mantener la posición neutra: en el niño pequeño, acolchar bajo los hombros; en el lactante, evitar tanto la flexión como la hiperextensión del cuello.',
              'Contar la frecuencia respiratoria durante un tiempo suficiente: en el niño es irregular y una cuenta corta induce a error.',
              'Valorar el relleno capilar en un lugar cálido y comparar con la temperatura ambiente.',
              'Medir la glucemia en todo niño con alteración del estado de conciencia, si está dentro del alcance.',
              'Exponer poco y por partes, y cubrir de inmediato después.',
              'Pesar o estimar el peso con la cinta de referencia que use el servicio, porque de él dependen material y medicación.',
              'Reevaluar por completo tras cada intervención y antes de la entrega.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La familia forma parte de la evaluación', texto: 'Quien cuida al niño aporta el antecedente, la evolución, la medicación y —sobre todo— la referencia de la normalidad. Mantenerla presente y preguntarle de forma explícita no es una concesión: es una fuente de información que no existe en el paciente adulto autónomo.' },
          mnemotecnia('NO SE AVANZA CON UN PROBLEMA SIN RESOLVER. El orden no es un formulario que se rellena: es una jerarquía de amenazas. Si en la A hay una vía aérea comprometida, no se pasa a la B hasta haberla resuelto en la medida en que el alcance lo permita.'),
          masPreguntado('Por qué la X va primero: un sangrado masivo puede acabar con el paciente en menos tiempo del que se tarda en asegurar una vía aérea, y en el niño el argumento pesa más porque su volumen circulante es pequeño.'),
        ],
      },
      erroresFrecuentes([
        ['Pasar a la letra siguiente con un problema abierto', 'El orden es una jerarquía de amenazas, no un formulario.'],
        ['Contar la frecuencia respiratoria durante poco tiempo', 'En el niño es irregular y una cuenta corta induce a error.'],
        ['Exponer al niño por completo y dejarlo destapado', 'Se enfría muy deprisa: se expone poco, por partes, y se cubre de inmediato.'],
        ['No estimar el peso', 'De él dependen el material y la medicación. Se pesa o se estima con la cinta de referencia que use el servicio.'],
      ]),
      repasoRapido([
        'X, hemorragia exanguinante: el volumen circulante del niño es pequeño y una pérdida moderada puede ser crítica.',
        'A, vía aérea: lengua grande y occipucio prominente; acolchar bajo los hombros y evitar la hiperextensión.',
        'B, ventilación: desatura antes y se fatiga antes; el descenso del esfuerzo es alarma.',
        'C, circulación: mantiene la presión hasta muy tarde y la bradicardia suele ser hipoxia.',
        'D, estado neurológico: escala adaptada a su edad; la hipoglucemia aparece con rapidez.',
        'E, exposición: se enfría muy deprisa, así que la exposición debe ser breve y con el habitáculo caliente.',
        'La X va primero porque un sangrado masivo mata antes de que se asegure una vía aérea.',
        'No se avanza con un problema sin resolver.',
        'Se mantiene la posición neutra y se evita en el lactante tanto la flexión como la hiperextensión del cuello.',
        'Se cuenta la frecuencia respiratoria durante un tiempo suficiente y se valora el relleno capilar en un lugar cálido.',
        'Se mide la glucemia en todo niño con alteración del estado de conciencia si está dentro del alcance.',
        'La familia forma parte de la evaluación: aporta el antecedente, la evolución, la medicación y la referencia de normalidad.',
      ]),
      preguntasOrales([
        'Recorre la secuencia XABCDE y di qué cambia en el niño en cada letra.',
        '¿Por qué la X va primero?',
        '¿Por qué ese argumento pesa más en el niño?',
        'Explica la regla que hace útil la secuencia.',
        'Enumera los detalles pediátricos que se olvidan.',
        '¿Por qué se cuenta la frecuencia respiratoria durante más tiempo?',
        '¿Por qué hay que estimar el peso?',
        '¿Qué papel tiene la familia en la evaluación?',
      ]),
      F([AHA_PALS_2025, AHA_PBLS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Hemorragia exanguinante', definicion: 'Sangrado masivo que puede causar la muerte en muy poco tiempo; se atiende antes que la vía aérea.' },
      { termino: 'Posición neutra pediátrica', definicion: 'Alineación de la vía aérea del niño evitando flexión e hiperextensión, con acolchado bajo los hombros cuando procede.' },
      { termino: 'Reevaluación en bucle', definicion: 'Vuelta al principio de la secuencia tras cada intervención para comprobar que lo anterior sigue resuelto.' },
      { termino: 'Cinta de referencia pediátrica', definicion: 'Instrumento que estima peso y material adecuado según la longitud del niño; el modelo concreto lo define el protocolo.' },
    ],
    flashcards: [
      { frente: '¿Qué representa la X y por qué va primero?', reverso: 'La hemorragia exanguinante: puede matar en menos tiempo del que se tarda en asegurar una vía aérea.' },
      { frente: '¿Qué regla hace útil la secuencia?', reverso: 'No avanzar dejando atrás un problema sin resolver, y volver al principio tras cada intervención.' },
      { frente: '¿Cómo se posiciona la vía aérea del lactante?', reverso: 'En posición neutra, evitando la flexión y la hiperextensión, acolchando bajo los hombros.' },
      { frente: '¿Por qué la exposición debe ser breve?', reverso: 'Porque el niño se enfría muy deprisa por su gran superficie corporal relativa.' },
      { frente: '¿Para qué sirve la cinta de referencia pediátrica?', reverso: 'Para estimar el peso y el material adecuado según la longitud del niño.' },
      { frente: '¿Qué aporta la familia a la evaluación?', reverso: 'Antecedente, evolución, medicación y la referencia de lo que es normal en ese niño.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con sangrado masivo por una herida en el muslo y respiración ruidosa. ¿Por dónde empiezas?',
        opciones: [
          'Por la vía aérea, siempre primero.',
          'Por la X: control inmediato de la hemorragia exanguinante, y a continuación la vía aérea.',
          'Por la exposición para valorar todas las lesiones.',
          'Por la glucemia.',
        ],
        correcta: 1,
        explicacion: 'La hemorragia masiva se antepone porque puede acabar con el paciente en menos tiempo.',
      },
      {
        pregunta: 'Al colocar a un lactante en decúbito supino sobre una superficie plana, ¿qué precaución tomas?',
        opciones: [
          'Acolchar bajo la cabeza como en el adulto.',
          'Acolchar bajo los hombros, porque su occipucio prominente flexiona el cuello y compromete la vía aérea.',
          'Hiperextender el cuello para abrir la vía aérea.',
          'Colocarlo en decúbito prono.',
        ],
        correcta: 1,
        explicacion: 'La proporción craneal del niño flexiona el cuello si se apoya plano.',
      },
      {
        pregunta: 'Has resuelto un problema en la B. ¿Qué haces antes de pasar a la C?',
        opciones: [
          'Continuar directamente con la C.',
          'Volver al principio y comprobar que la X y la A siguen resueltas.',
          'Repetir solo la B.',
          'Terminar la exposición.',
        ],
        correcta: 1,
        explicacion: 'La reevaluación en bucle es lo que evita que un problema resuelto reaparezca sin que nadie lo note.',
      },
      {
        pregunta: '¿Por qué se estima el peso del niño con la cinta de referencia?',
        opciones: [
          'Por requisito estadístico.',
          'Porque de él dependen el material adecuado y la medicación, y el peso referido puede no ser fiable.',
          'Para calcular la superficie corporal quemada.',
          'Para decidir el centro de destino.',
        ],
        correcta: 1,
        explicacion: 'El modelo de cinta y su uso los define el protocolo del servicio.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia XABCDE en el paciente pediátrico',
        pasos: [
          'Controlar la hemorragia exanguinante visible',
          'Asegurar la vía aérea en posición neutra, con control cervical si procede',
          'Valorar la ventilación: frecuencia, esfuerzo, simetría y oxigenación',
          'Valorar la circulación: pulso, piel, relleno capilar y presión',
          'Valorar el estado neurológico y medir la glucemia si está dentro del alcance',
          'Exponer por partes para explorar y volver a cubrir de inmediato',
        ],
      },
      completar: [
        {
          texto: 'Tras intervenir sobre cualquier letra, la secuencia obliga a ___.',
          opciones: ['pasar a la siguiente', 'volver al principio y comprobar lo anterior', 'finalizar la valoración'],
          correcta: 1,
          explicacion: 'Es lo que evita que un problema resuelto reaparezca sin que nadie lo note.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  // ---------- Situaciones especiales ----------

  'm6-se-asuntos-familiares': {
    icono: 'cp-dbcls-examen-nino',
    duracion: '13 min',
    resumen: 'En pediatría se atiende a un paciente y, a la vez, a una familia. La forma en que el '
      + 'equipo trata a quien cuida al niño condiciona la calidad de la información, la colaboración '
      + 'durante los procedimientos y el recuerdo que quedará del episodio. Esta lección aborda la '
      + 'comunicación con la familia, su presencia durante la atención, el consentimiento cuando el '
      + 'paciente es menor y la situación en que la familia se convierte en un obstáculo.',
    objetivos: [
      'Comunicarse con la familia de forma que mejore la información y la colaboración.',
      'Aplicar criterios sobre la presencia familiar durante los procedimientos.',
      'Situar el consentimiento y la negativa a la atención de un menor en su marco.',
    ],
    secciones: [
      {
        titulo: 'La familia como fuente y como paciente secundario',
        bloques: [
          { tipo: 'p', texto: 'Quien cuida al niño aporta datos que nadie más tiene: cómo empezó todo, qué medicación toma, qué es normal en él y qué ha cambiado. Al mismo tiempo, esa persona está asustada, y el miedo dificulta escuchar y recordar. Ambas cosas se atienden a la vez.' },
          {
            tipo: 'lista',
            titulo: 'Lo que funciona',
            items: [
              'Presentarse, decir qué se va a hacer y por qué, en frases cortas.',
              'Preguntar de forma abierta al principio y concreta después.',
              'Dar una tarea sencilla a quien está muy angustiado: sostener la mano del niño, hablarle, buscar la cartilla o la medicación.',
              'Repetir la información importante y comprobar que se ha entendido.',
              'Evitar comentarios entre profesionales que la familia pueda malinterpretar.',
              'No prometer resultados; sí explicar qué se está haciendo en cada momento.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La presencia familiar durante los procedimientos', texto: 'Salvo que interfiera con la atención, mantener a la familia presente suele ser preferible: reduce la angustia del niño, facilita la valoración y permite que el adulto vea lo que se está haciendo. Cuando se decide que salga, se explica por qué y se le indica dónde estará y quién le informará. Si el servicio tiene un procedimiento sobre presencia familiar durante la reanimación, es el que se aplica.' },
        ],
      },
      {
        titulo: 'Consentimiento, negativa y conflicto',
        bloques: [
          { tipo: 'p', texto: 'La atención de un menor implica normalmente el consentimiento de quien ejerce su patria potestad o tutela. En una urgencia con riesgo para la vida, la atención no se demora por la ausencia de esa persona. Los requisitos concretos —quién puede consentir, cómo se documenta una negativa, qué margen de decisión tiene un adolescente y a quién debe avisarse— los fija el ordenamiento jurídico mexicano y el procedimiento del servicio, y esta lección remite a ellos sin sustituirlos.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones que conviene anticipar',
            items: [
              'Negativa del cuidador a un traslado que el equipo considera necesario: se explica el riesgo en términos comprensibles, se documenta lo dicho y la respuesta, y se sigue el procedimiento del servicio.',
              'Desacuerdo entre dos adultos sobre la conducta a seguir.',
              'Adulto que no está en condiciones de cuidar del niño en ese momento.',
              'Niño que se encuentra al cuidado de una persona sin capacidad legal para consentir.',
              'Familia que interfiere con la atención o cuya conducta compromete la seguridad del equipo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuando la familia interfiere', texto: 'Un adulto muy angustiado puede impedir físicamente la atención sin pretenderlo. La respuesta empieza por explicar con calma y asignar una tarea. Si aun así la atención no puede prestarse, o si hay riesgo para el equipo, se aplica el procedimiento del servicio y se solicita el apoyo que corresponda. Todo lo ocurrido se documenta con hechos, sin calificativos.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que la familia recuerda', texto: 'Las familias recuerdan durante años cómo se les habló y si sintieron que alguien se ocupaba de su hijo. Ese recuerdo no depende del desenlace clínico ni de los medios disponibles, sino del trato. Es una parte del trabajo que no cuesta material.' },
          mnemotecnia('DAR UNA TAREA CALMA MÁS QUE PEDIR CALMA. A quien está muy angustiado se le da algo concreto: sostener la mano del niño, hablarle, buscar la cartilla o la medicación. Es lo que convierte a un adulto bloqueado en un colaborador.'),
          masPreguntado('Que salvo que interfiera con la atención, mantener a la familia presente suele ser preferible: reduce la angustia del niño, facilita la valoración y permite que el adulto vea lo que se está haciendo. Y que en una urgencia con riesgo vital la atención no se demora por la ausencia de quien puede consentir.'),
        ],
      },
      erroresFrecuentes([
        ['Pedir calma sin dar una tarea', 'A quien está muy angustiado se le asigna algo concreto: sostener la mano del niño, hablarle o buscar la medicación.'],
        ['Hacer salir a la familia por rutina', 'Salvo que interfiera, mantenerla presente reduce la angustia del niño y facilita la valoración.'],
        ['Comentar entre profesionales delante de la familia', 'Se evitan comentarios que puedan malinterpretarse, y se repite la información importante comprobando que se entendió.'],
        ['Demorar la atención por la ausencia de quien consiente', 'En una urgencia con riesgo para la vida, la atención no se demora.'],
      ]),
      repasoRapido([
        'En pediatría se atiende a un paciente y a la vez a una familia.',
        'Quien cuida al niño aporta datos que nadie más tiene, y a la vez está asustado.',
        'Funciona presentarse, decir qué se va a hacer y por qué, en frases cortas.',
        'Preguntar de forma abierta al principio y concreta después.',
        'Dar una tarea sencilla a quien está muy angustiado.',
        'Repetir la información importante y comprobar que se ha entendido.',
        'Evitar comentarios entre profesionales que la familia pueda malinterpretar, y no prometer resultados.',
        'La presencia familiar durante los procedimientos suele ser preferible salvo que interfiera.',
        'La atención de un menor implica normalmente el consentimiento de quien ejerce la patria potestad o tutela.',
        'En una urgencia con riesgo para la vida la atención no se demora por su ausencia.',
        'Se anticipan la negativa al traslado, el desacuerdo entre adultos y el cuidador sin capacidad legal para consentir.',
        'Si la familia interfiere, se explica con calma y se asigna una tarea; si no es posible, se aplica el procedimiento del servicio.',
      ]),
      preguntasOrales([
        '¿Por qué la familia es a la vez fuente y paciente secundario?',
        'Enumera lo que funciona en la comunicación.',
        '¿Por qué dar una tarea calma más que pedir calma?',
        '¿Conviene mantener a la familia presente durante los procedimientos?',
        '¿Qué se hace si hay que pedirle que salga?',
        '¿Cómo se sitúa el consentimiento cuando el paciente es menor?',
        'Enumera las situaciones que conviene anticipar.',
        '¿Qué recuerdan las familias del episodio?',
      ]),
      F([WHO_BEC, LEY_SALUD, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Presencia familiar', definicion: 'Permanencia del cuidador junto al niño durante la atención, preferible salvo que interfiera, conforme al procedimiento del servicio.' },
      { termino: 'Consentimiento en el menor', definicion: 'Autorización que corresponde normalmente a quien ejerce la patria potestad o tutela; en urgencia vital la atención no se demora por su ausencia.' },
      { termino: 'Negativa documentada', definicion: 'Registro de la información dada, de los riesgos explicados y de la respuesta del cuidador cuando rechaza una conducta indicada.' },
    ],
    flashcards: [
      { frente: '¿Qué aporta la familia que nadie más tiene?', reverso: 'El inicio del cuadro, la medicación, y la referencia de lo que es normal en ese niño.' },
      { frente: '¿Se mantiene a la familia presente durante los procedimientos?', reverso: 'Sí salvo que interfiera; si sale, se explica por qué y quién le informará.' },
      { frente: '¿Qué se hace con un adulto muy angustiado?', reverso: 'Explicar con calma y asignarle una tarea sencilla y útil.' },
      { frente: '¿Se demora la atención de una urgencia vital por falta de consentimiento?', reverso: 'No.' },
      { frente: '¿Cómo se documenta una negativa al traslado?', reverso: 'Registrando la información dada, los riesgos explicados y la respuesta, conforme al procedimiento del servicio.' },
    ],
    quiz: [
      {
        pregunta: 'La madre de un lactante grave está tan angustiada que dificulta la valoración. ¿Cuál es la primera respuesta?',
        opciones: [
          'Pedirle que salga de inmediato.',
          'Explicarle con calma qué se está haciendo y darle una tarea sencilla y útil, manteniéndola presente si es posible.',
          'Ignorarla y continuar.',
          'Solicitar apoyo policial de entrada.',
        ],
        correcta: 1,
        explicacion: 'La presencia familiar suele ayudar; retirarla es el paso siguiente, no el primero.',
      },
      {
        pregunta: 'El padre rechaza un traslado que consideras necesario. ¿Qué corresponde?',
        opciones: [
          'Trasladar contra su voluntad sin más.',
          'Explicar el riesgo en términos comprensibles, documentar lo dicho y la respuesta, y seguir el procedimiento del servicio.',
          'Marcharse sin registrar nada.',
          'Pedirle que firme sin explicarle nada.',
        ],
        correcta: 1,
        explicacion: 'La información comprensible y su registro son la parte que corresponde al equipo; el marco jurídico lo fija el ordenamiento y el procedimiento.',
      },
      {
        pregunta: 'Niño con riesgo vital y sin ningún adulto responsable localizable. ¿Qué haces?',
        opciones: [
          'Esperar a localizar a un familiar antes de actuar.',
          'Atender sin demora: en una urgencia con riesgo para la vida la atención no se aplaza por la ausencia de consentimiento.',
          'Trasladar sin ninguna atención previa.',
          'Solicitar autorización por escrito antes de tocar al paciente.',
        ],
        correcta: 1,
        explicacion: 'La urgencia vital es la excepción que la lección declara de forma expresa.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Dos adultos discuten delante del niño sobre si debe trasladarse, y la discusión empieza a impedir la atención. ¿Cómo procedes?',
          opciones: [
            'Espero a que se pongan de acuerdo.',
            'Continúo la atención del niño, explico con calma qué necesita y por qué, asigno tareas concretas, y si la atención sigue sin poder prestarse aplico el procedimiento del servicio y solicito el apoyo que corresponda, documentando los hechos sin calificativos.',
            'Abandono la escena.',
            'Traslado sin informar a ninguno de los dos.',
          ],
          correcta: 1,
          explicacion: 'La lección establece esa escalera —explicar, asignar tarea, procedimiento y apoyo— y exige documentar hechos, no calificativos.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'Ley General de Salud, texto vigente (artículos pendientes de verificar).'],
      extra: [
        'DECISIÓN PENDIENTE: la academia debe entregar su procedimiento sobre consentimiento del menor, negativa a la atención, presencia familiar durante la reanimación y aviso a autoridades.',
        'DEUDA JURÍDICA: los artículos concretos aplicables deben verificarse en el texto vigente antes de citarse como fundamento; la lección no los enuncia.',
      ],
    }),
  },

  'm6-se-abuso-infantil': {
    icono: 'ic-nino',
    duracion: '15 min',
    resumen: 'El maltrato infantil incluye el daño físico, la agresión sexual, el daño emocional y la '
      + 'negligencia en los cuidados. El papel del equipo prehospitalario es concreto y limitado: '
      + 'atender al niño, garantizar su seguridad, observar y documentar con precisión lo que ve y lo '
      + 'que oye, y comunicarlo por el cauce que fije el procedimiento. No es investigar, no es '
      + 'confrontar y no es decidir si hubo maltrato: es dejar constancia de lo que solo el primer '
      + 'equipo puede ver.',
    objetivos: [
      'Reconocer las formas de maltrato y los indicadores que deben elevar la sospecha.',
      'Documentar hallazgos y declaraciones de forma objetiva y utilizable.',
      'Aplicar la conducta correcta en la escena, sin confrontar ni investigar.',
    ],
    secciones: [
      {
        titulo: 'Qué buscar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Indicadores en la historia',
            items: [
              'El relato no explica la lesión, o es incompatible con el desarrollo del niño.',
              'La versión cambia entre relatos o entre distintos adultos.',
              'Retraso en solicitar atención sin explicación razonable.',
              'Antecedentes de lesiones repetidas o de asistencias frecuentes en distintos centros.',
              'Se culpa de la lesión a un hermano pequeño o al propio niño.',
              'Reticencia a dar detalles o a permitir la exploración.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Indicadores en la exploración',
            items: [
              'Lesiones en zonas poco habituales en las caídas accidentales: orejas, cuello, tronco, cara interna de los brazos o de los muslos, glúteos y genitales.',
              'Lesiones con forma reconocible que reproduzca un objeto.',
              'Quemaduras de bordes netos, simétricas o con distribución que no corresponde a una salpicadura.',
              'Lesiones de distinta antigüedad aparente coexistiendo.',
              'Lesiones en un lactante que todavía no se desplaza por sí solo.',
              'Signos de negligencia: higiene, vestimenta inadecuada, desnutrición, falta de tratamiento de problemas conocidos.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ningún hallazgo aislado prueba nada', texto: 'Existen enfermedades y prácticas culturales que producen lesiones parecidas, y existen accidentes con distribuciones atípicas. Por eso el equipo no concluye: eleva la sospecha, documenta con precisión y comunica. La determinación corresponde a la valoración médica especializada y a las autoridades competentes.' },
        ],
      },
      {
        titulo: 'Qué hacer en la escena',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Atender la lesión y las necesidades clínicas del niño como en cualquier otro caso.',
              'Garantizar la seguridad: del niño, del equipo y del resto de menores presentes.',
              'Observar y recordar el entorno: estado de la vivienda, presencia de otros niños, actitud de los adultos.',
              'Documentar de forma objetiva, con descripciones y sin calificativos ni conclusiones.',
              'Recoger textualmente lo que diga el niño, entrecomillado, sin repreguntar ni conducir.',
              'No confrontar ni acusar a los adultos presentes: además de no corresponder al equipo, puede aumentar el riesgo del niño y comprometer la seguridad.',
              'Trasladar y comunicar la sospecha al personal receptor de forma explícita y verbal, además de por escrito.',
              'Activar el aviso que establezca el procedimiento del servicio y la normativa aplicable.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Cómo se documenta', texto: 'Se escribe lo que se ve y lo que se oye, no lo que se piensa. «Equimosis de 3 cm en cara interna del brazo derecho, de aspecto violáceo; otras dos en la espalda de tono amarillento» es útil. «Signos de maltrato» no lo es. Y si el niño dice algo, se transcribe entre comillas tal cual lo dijo, indicando quién estaba presente y a qué hora. Ese registro puede ser la única constancia de un momento irrepetible.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre el propio equipo', texto: 'Estas intervenciones dejan huella en quien las atiende. Hablarlo con el equipo después, y usar los canales de apoyo que ofrezca el servicio, forma parte del trabajo y no es una debilidad.' },
          mnemotecnia('SE ESCRIBE LO QUE SE VE Y LO QUE SE OYE, NO LO QUE SE PIENSA. Una descripción de la lesión con su localización y su aspecto es útil; «signos de maltrato» no lo es. Y lo que diga el niño se recoge textualmente, entrecomillado, sin repreguntar ni conducir.'),
          masPreguntado('Que ningún hallazgo aislado prueba nada: existen enfermedades y prácticas culturales que producen lesiones parecidas y accidentes con distribuciones atípicas. El equipo no concluye: eleva la sospecha, documenta con precisión y comunica.'),
        ],
      },
      erroresFrecuentes([
        ['Confrontar o acusar a los adultos presentes', 'No corresponde al equipo, puede aumentar el riesgo del niño y comprometer la seguridad.'],
        ['Escribir la conclusión en vez del hallazgo', '«Signos de maltrato» no es utilizable. La descripción con localización y aspecto sí lo es.'],
        ['Repreguntar o conducir al niño', 'Lo que diga se recoge textualmente, entrecomillado, sin repreguntar ni conducir.'],
        ['Concluir a partir de un hallazgo aislado', 'Hay enfermedades y prácticas que producen lesiones parecidas, y accidentes con distribuciones atípicas.'],
      ]),
      repasoRapido([
        'El maltrato incluye el daño físico, la agresión sexual, el daño emocional y la negligencia en los cuidados.',
        'El papel del equipo es atender, garantizar la seguridad, observar, documentar y comunicar.',
        'No es investigar, no es confrontar y no es decidir si hubo maltrato.',
        'En la historia alerta que el relato no explique la lesión o sea incompatible con el desarrollo del niño.',
        'También que la versión cambie, el retraso en solicitar atención y las lesiones repetidas en distintos centros.',
        'También que se culpe a un hermano pequeño o al propio niño, y la reticencia a permitir la exploración.',
        'En la exploración alertan las lesiones en zonas poco habituales en las caídas accidentales.',
        'También las lesiones con forma reconocible, las quemaduras de bordes netos y las de distinta antigüedad aparente.',
        'También las lesiones en un lactante que todavía no se desplaza y los signos de negligencia.',
        'Ningún hallazgo aislado prueba nada.',
        'Se documenta de forma objetiva, con descripciones y sin calificativos ni conclusiones.',
        'Se comunica la sospecha al personal receptor de forma explícita y verbal, además de por escrito.',
      ]),
      preguntasOrales([
        'Enumera las formas de maltrato y el papel del equipo prehospitalario.',
        'Di los indicadores en la historia.',
        'Di los indicadores en la exploración.',
        '¿Prueba algo un hallazgo aislado?',
        'Recorre la conducta en la escena.',
        '¿Por qué no se confronta a los adultos presentes?',
        'Explica cómo se documenta, con un ejemplo útil y otro inútil.',
        '¿Qué se hace con lo que dice el niño?',
      ]),
      F([WHO_BEC, LEY_SALUD, AHA_PALS_2025, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Maltrato infantil', definicion: 'Daño físico, sexual o emocional, o negligencia en los cuidados, ejercidos sobre un menor.' },
      { termino: 'Negligencia', definicion: 'Omisión de los cuidados necesarios: higiene, alimentación, supervisión o tratamiento de problemas conocidos.' },
      { termino: 'Documentación objetiva', definicion: 'Registro de lo observado y lo oído mediante descripciones concretas, sin calificativos ni conclusiones.' },
      { termino: 'Declaración espontánea', definicion: 'Lo que el niño dice por iniciativa propia; se transcribe entre comillas, sin repreguntar ni conducir.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el papel del equipo prehospitalario?', reverso: 'Atender, garantizar la seguridad, observar, documentar con precisión y comunicar por el cauce establecido.' },
      { frente: '¿Se confronta a los adultos presentes?', reverso: 'No: no corresponde al equipo, puede aumentar el riesgo del niño y comprometer la seguridad.' },
      { frente: 'Localizaciones poco habituales en caídas accidentales', reverso: 'Orejas, cuello, tronco, cara interna de brazos y muslos, glúteos y genitales.' },
      { frente: '¿Cómo se registra lo que dice el niño?', reverso: 'Textualmente, entre comillas, indicando quién estaba presente y la hora, sin repreguntar.' },
      { frente: '¿Prueba algo un hallazgo aislado?', reverso: 'No: existen enfermedades y accidentes que producen lesiones parecidas; el equipo eleva la sospecha, no concluye.' },
      { frente: 'Lesión en un lactante que aún no se desplaza: ¿qué implica?', reverso: 'Es uno de los indicadores que más elevan la sospecha y obliga a documentar con precisión.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante de tres meses con equimosis en la cara interna de ambos brazos, cuyo cuidador refiere que «se golpeó solo en la cuna». ¿Qué haces?',
        opciones: [
          'Confrontar al cuidador en la escena.',
          'Atender al niño, documentar las lesiones con descripciones objetivas, no confrontar, trasladar y comunicar la sospecha de forma explícita.',
          'Anotar «signos de maltrato» y trasladar.',
          'Descartar la sospecha porque el cuidador da una explicación.',
        ],
        correcta: 1,
        explicacion: 'La localización y la edad elevan la sospecha; la aportación del equipo es la documentación objetiva y la comunicación.',
      },
      {
        pregunta: 'El niño te dice algo relevante mientras lo trasladas. ¿Cómo procedes?',
        opciones: [
          'Le haces preguntas para aclarar los detalles.',
          'Transcribes textualmente lo que dijo entre comillas, indicando quién estaba presente y la hora, sin repreguntar ni conducir.',
          'Lo omites del informe para no perjudicar a la familia.',
          'Lo comentas solo verbalmente sin registrarlo.',
        ],
        correcta: 1,
        explicacion: 'Repreguntar puede contaminar el relato; el registro literal puede ser la única constancia de ese momento.',
      },
      {
        pregunta: '¿Cuál de estas anotaciones es correcta?',
        opciones: [
          '«Se aprecian signos evidentes de maltrato».',
          '«Equimosis de 3 cm en cara interna del brazo derecho, violácea; dos equimosis en espalda de tono amarillento; el cuidador refiere caída de la cuna a las 14:00».',
          '«Familia sospechosa».',
          '«Lesiones compatibles con agresión intencionada».',
        ],
        correcta: 1,
        explicacion: 'Se describe lo observado y lo referido; las conclusiones corresponden a otras instancias.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el informe se escribe lo que se ve y se oye, no lo que se ___.',
          opciones: ['sospecha', 'piensa', 'documenta'],
          correcta: 1,
          explicacion: 'La sospecha se comunica por el cauce establecido; el informe recoge hechos.',
        },
        {
          texto: 'Confrontar a los adultos en la escena puede aumentar el ___ del niño.',
          opciones: ['bienestar', 'riesgo', 'consentimiento'],
          correcta: 1,
          explicacion: 'Además compromete la seguridad del equipo y no corresponde a su función.',
        },
        {
          texto: 'Una quemadura de bordes netos y distribución que no corresponde a una salpicadura es un ___ que debe documentarse.',
          opciones: ['diagnóstico', 'indicador', 'antecedente irrelevante'],
          correcta: 1,
          explicacion: 'Ningún hallazgo aislado prueba nada, pero eleva la sospecha.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'Ley General de Salud, texto vigente (artículos pendientes de verificar).'],
      extra: [
        'DECISIÓN PENDIENTE: la academia debe entregar su procedimiento de aviso y la normativa mexicana concreta sobre obligación de notificación, para que la lección remita a disposiciones identificadas.',
        'La lección no enuncia artículos jurídicos concretos porque no se han verificado en el texto vigente.',
      ],
    }),
  },

  'm6-se-muerte-subita': {
    icono: 'ic-recien-nacido',
    duracion: '14 min',
    resumen: 'El síndrome de muerte súbita del lactante es la muerte inesperada de un lactante que no '
      + 'se explica tras una investigación completa. En la escena, el equipo se encuentra con dos '
      + 'tareas simultáneas y difíciles: aplicar el protocolo de reanimación que corresponda y '
      + 'acompañar a una familia en el peor momento de su vida. Esta lección trata ambas, y explica '
      + 'por qué documentar el entorno sin insinuar culpa es parte del cuidado.',
    objetivos: [
      'Definir el síndrome de muerte súbita del lactante y su carácter de diagnóstico de exclusión.',
      'Aplicar la conducta en la escena, incluida la documentación del entorno.',
      'Acompañar a la familia y reconocer el impacto sobre el propio equipo.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué no es',
        bloques: [
          { tipo: 'p', texto: 'Se denomina así a la muerte súbita e inesperada de un lactante que permanece sin explicación después de una investigación completa, que incluye el estudio del lugar, la revisión de la historia clínica y la autopsia. Es, por tanto, un diagnóstico de exclusión que nadie puede establecer en la escena.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El equipo no diagnostica ni descarta', texto: 'En el domicilio no puede saberse si se trata de este síndrome, de una enfermedad no conocida, de un accidente relacionado con el entorno del sueño o de otra causa. Por eso el informe describe lo encontrado y no nombra una causa. Escribir un diagnóstico en la escena puede condicionar toda la investigación posterior.' },
          {
            tipo: 'lista',
            titulo: 'Factores asociados al entorno del sueño que las recomendaciones de prevención señalan',
            items: [
              'Posición del lactante al dormir distinta de la recomendada por la guía de prevención vigente.',
              'Superficie blanda, presencia de almohadas, cojines, mantas sueltas o peluches en la cuna.',
              'Compartir superficie de sueño con adultos u otros niños.',
              'Exposición al humo de tabaco.',
              'Sobrecalentamiento del ambiente o exceso de ropa.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Estos factores se documentan, no se reprochan', texto: 'Anotar la posición en que se encontró al lactante, la superficie sobre la que dormía y qué había en la cuna es información esencial para la investigación posterior. Comunicárselo a la familia en ese momento como causa —o insinuarlo— no aporta nada clínico y añade un daño que durará años. La observación se registra; el juicio no existe.' },
        ],
      },
      {
        titulo: 'En la escena',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Conducta',
            items: [
              'Iniciar la reanimación conforme a las guías vigentes y al protocolo del servicio, salvo que existan criterios objetivos de no inicio contemplados en ese protocolo.',
              'Documentar con precisión: posición y lugar en que se encontró al lactante, aspecto, temperatura al tacto, quién lo encontró y a qué hora, y cuándo se le vio con vida por última vez.',
              'Registrar el entorno del sueño y lo que refieren los cuidadores, textualmente cuando sea relevante.',
              'No alterar la escena más de lo imprescindible para la atención, y recordar qué se movió.',
              'Aplicar el procedimiento del servicio respecto al traslado del lactante, la comunicación a la autoridad y la coordinación con el centro receptor.',
              'Explicar a la familia, en lenguaje claro y sin tecnicismos, qué se está haciendo en cada momento.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Acompañar también es atención', texto: 'Llamar al lactante por su nombre, permitir que la familia esté presente y lo sostenga cuando sea posible, no apresurar a nadie, ofrecer un espacio y avisar de quién se hará cargo después. Nada de eso requiere material ni cambia el desenlace clínico, y es lo que la familia recordará durante el resto de su vida.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El equipo también queda afectado', texto: 'La muerte de un lactante es una de las intervenciones que más impacto deja en el personal prehospitalario. Reconocerlo, hablarlo en equipo y usar los canales de apoyo que ofrezca el servicio forma parte del trabajo. Ignorarlo no lo hace desaparecer.' },
          mnemotecnia('SE DOCUMENTA, NO SE REPROCHA. Anotar la posición en que se encontró al lactante, la superficie sobre la que dormía y qué había en la cuna es esencial para la investigación posterior; decírselo a la familia en ese momento como causa no lo es.'),
          masPreguntado('Que es un diagnóstico de exclusión y el equipo no lo diagnostica ni lo descarta: en el domicilio no puede saberse si se trata de este síndrome, de una enfermedad no conocida, de un accidente del entorno del sueño o de otra causa. El informe describe lo encontrado y no nombra una causa.'),
        ],
      },
      erroresFrecuentes([
        ['Nombrar una causa en el informe', 'En el domicilio no puede saberse. El informe describe lo encontrado.'],
        ['Comunicar los factores del entorno como causa a la familia', 'Se documentan para la investigación posterior; señalarlos en ese momento no es atención.'],
        ['Alterar la escena más de lo imprescindible', 'Se altera solo lo necesario para la atención, y se recuerda qué se movió.'],
        ['Ignorar el impacto sobre el equipo', 'Es una de las intervenciones que más huella deja. Hablarlo y usar los canales de apoyo forma parte del trabajo.'],
      ]),
      repasoRapido([
        'Es la muerte súbita e inesperada de un lactante que permanece sin explicación tras una investigación completa.',
        'Es un diagnóstico de exclusión: el equipo no lo diagnostica ni lo descarta.',
        'Las recomendaciones de prevención señalan factores del entorno del sueño.',
        'Entre ellos la posición al dormir distinta de la recomendada y la superficie blanda con almohadas, mantas sueltas o peluches.',
        'También compartir superficie de sueño, la exposición al humo de tabaco y el sobrecalentamiento.',
        'Esos factores se documentan, no se reprochan.',
        'Se inicia la reanimación conforme a las guías vigentes y al protocolo, salvo criterios objetivos de no inicio.',
        'Se documenta posición y lugar en que se encontró, aspecto, temperatura al tacto, quién lo encontró y a qué hora.',
        'También cuándo se le vio con vida por última vez y lo que refieren los cuidadores, textualmente si es relevante.',
        'No se altera la escena más de lo imprescindible.',
        'Acompañar también es atención: llamarlo por su nombre, permitir que la familia lo sostenga y no apresurar a nadie.',
        'El equipo también queda afectado, y reconocerlo forma parte del trabajo.',
      ]),
      preguntasOrales([
        'Define el síndrome de muerte súbita del lactante.',
        '¿Por qué es un diagnóstico de exclusión?',
        '¿Qué puede y qué no puede afirmar el equipo?',
        'Enumera los factores del entorno del sueño que señalan las recomendaciones.',
        '¿Qué se hace con esos factores?',
        'Recorre la conducta en la escena.',
        '¿Qué significa que acompañar también es atención?',
        '¿Qué se hace con el impacto sobre el equipo?',
      ]),
      F([AHA_PBLS_2025, WHO_BEC, LEY_SALUD, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Síndrome de muerte súbita del lactante', definicion: 'Muerte súbita e inesperada de un lactante que permanece sin explicación tras una investigación completa; diagnóstico de exclusión.' },
      { termino: 'Diagnóstico de exclusión', definicion: 'Aquel que solo puede establecerse tras descartar otras causas; no puede formularse en la escena.' },
      { termino: 'Entorno del sueño', definicion: 'Conjunto de condiciones en que dormía el lactante; se documenta de forma objetiva por su valor para la investigación posterior.' },
    ],
    flashcards: [
      { frente: '¿Puede diagnosticarse este síndrome en la escena?', reverso: 'No: es un diagnóstico de exclusión que requiere investigación completa y autopsia.' },
      { frente: '¿Qué se documenta del entorno?', reverso: 'Posición y lugar en que se encontró al lactante, superficie, objetos en la cuna, y hora en que se le vio con vida por última vez.' },
      { frente: '¿Se comunican los factores del entorno a la familia como causa?', reverso: 'No: se registran, no se reprochan; insinuarlo añade un daño duradero sin aportar nada clínico.' },
      { frente: 'Tres gestos de acompañamiento', reverso: 'Llamar al lactante por su nombre, permitir la presencia y el contacto de la familia, y no apresurar a nadie.' },
      { frente: '¿Qué corresponde hacer respecto al propio equipo?', reverso: 'Reconocer el impacto, hablarlo y usar los canales de apoyo del servicio.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante de dos meses encontrado sin vida en su cuna. ¿Qué escribes como causa en el informe?',
        opciones: [
          'Síndrome de muerte súbita del lactante.',
          'Nada: se describe lo encontrado sin nombrar una causa, porque el diagnóstico es de exclusión y requiere investigación completa.',
          'Asfixia por la ropa de cama.',
          'Muerte natural.',
        ],
        correcta: 1,
        explicacion: 'Escribir un diagnóstico en la escena puede condicionar toda la investigación posterior.',
      },
      {
        pregunta: 'Observas que el lactante dormía sobre una superficie blanda con varios cojines. ¿Qué haces con esa observación?',
        opciones: [
          'Se lo explicas a los padres como la causa del fallecimiento.',
          'La documentas de forma objetiva por su valor para la investigación, sin comunicarla como causa ni insinuar culpa.',
          'La omites para no perjudicar a la familia.',
          'La comentas solo entre compañeros.',
        ],
        correcta: 1,
        explicacion: 'El registro es esencial; el reproche no aporta nada clínico y causa un daño duradero.',
      },
      {
        pregunta: '¿Qué dato temporal es especialmente importante recoger?',
        opciones: [
          'La hora de llegada de la ambulancia únicamente.',
          'Cuándo se vio al lactante con vida por última vez y quién lo encontró y a qué hora.',
          'La hora de la última toma de biberón exclusivamente.',
          'La duración del traslado.',
        ],
        correcta: 1,
        explicacion: 'Es información que solo puede obtenerse en ese momento y que la investigación posterior necesita.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Los padres te preguntan directamente, entre lágrimas, si su hijo ha muerto porque lo acostaron boca abajo. ¿Qué respondes según lo enseñado?',
          opciones: [
            'Confirmo que probablemente sea la causa.',
            'Explico con honestidad y en lenguaje claro que la causa no puede determinarse en ese momento y que requiere un estudio completo, sin atribuirles la responsabilidad, y les indico quién se hará cargo y qué va a ocurrir a continuación.',
            'Evito responder y cambio de tema.',
            'Les digo que no hicieron nada y que la causa fue una enfermedad.',
          ],
          correcta: 1,
          explicacion: 'La lección exige no nombrar una causa en la escena y acompañar con información clara sobre lo que ocurrirá, sin insinuar culpa ni afirmar lo que no se sabe.',
        },
      ],
    },
    revision: ficha({
      fuentes: [...FU, 'Ley General de Salud, texto vigente (artículos pendientes de verificar).'],
      extra: [
        'DECISIÓN PENDIENTE: la academia debe entregar su procedimiento sobre criterios de no inicio de reanimación, traslado del lactante fallecido y comunicación a la autoridad.',
        'La lección no enuncia la posición de sueño recomendada como cifra ni como pauta: remite a la guía de prevención vigente, que la academia debe declarar.',
      ],
    }),
  },

  'm6-se-necesidades-especiales': {
    icono: 'cp-servier-atomizador',
    duracion: '15 min',
    resumen: 'Cada vez más niños viven en casa con enfermedades crónicas complejas y con dispositivos '
      + 'que antes solo existían en el hospital: traqueostomías, sondas de alimentación, catéteres, '
      + 'derivaciones de líquido cefalorraquídeo o ventilación domiciliaria. Atenderlos exige dos '
      + 'cambios de método: preguntar a quien mejor los conoce, que casi siempre es su cuidador, y '
      + 'redefinir qué es «normal» para ese paciente concreto en lugar de compararlo con la media.',
    objetivos: [
      'Reconocer los dispositivos más frecuentes y los problemas que suelen presentar.',
      'Adaptar la valoración a la línea de base del paciente en lugar de a la norma poblacional.',
      'Integrar al cuidador como fuente experta y aplicar los límites de alcance.',
    ],
    secciones: [
      {
        titulo: 'El cambio de método',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Dos preguntas que lo ordenan todo', texto: '«¿Cómo está normalmente?» y «¿Qué es distinto hoy?». Un niño con una enfermedad neurológica grave puede tener de base un tono muscular alterado, una saturación por debajo de lo habitual o una forma peculiar de respirar. Compararlo con la media de su edad lleva a alarmarse por lo que es su normalidad y, peor aún, a pasar por alto el cambio real que motivó la llamada.' },
          { tipo: 'p', texto: 'El cuidador de estos niños suele ser un experto: conoce el dispositivo, ha manejado antes la misma complicación, sabe qué funciona y con frecuencia lleva un informe o un plan de acción escrito. Preguntarle no es delegar la responsabilidad; es usar la mejor fuente disponible. Y cuando el niño puede comunicarse, se le pregunta a él directamente, aunque necesite más tiempo o un sistema de apoyo.' },
        ],
      },
      {
        titulo: 'Dispositivos y problemas frecuentes',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Dispositivo', 'Para qué sirve', 'Problema habitual'],
            filas: [
              ['Traqueostomía', 'Vía aérea permanente a través del cuello', 'Obstrucción por secreciones o decanulación accidental'],
              ['Ventilación domiciliaria', 'Soporte respiratorio en casa', 'Fallo del equipo, desconexión o empeoramiento respiratorio de base'],
              ['Sonda de alimentación', 'Nutrición cuando la vía oral no es posible', 'Salida accidental, obstrucción o irritación del punto de entrada'],
              ['Catéter venoso central', 'Acceso vascular prolongado', 'Infección, obstrucción o desplazamiento'],
              ['Derivación de líquido cefalorraquídeo', 'Drenar el exceso de líquido intracraneal', 'Obstrucción o infección, con signos de aumento de la presión intracraneal'],
              ['Estoma digestivo o urinario', 'Derivación de contenido al exterior', 'Irritación, obstrucción o sangrado del estoma'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La traqueostomía obstruida es la urgencia más frecuente', texto: 'Un niño con traqueostomía que se deteriora tiene un problema de vía aérea hasta que se demuestre lo contrario, y la causa más habitual es la obstrucción por secreciones. La conducta —aspirar, cambiar la cánula o cualquier otra maniobra sobre el dispositivo— depende del alcance autorizado, del material disponible y del protocolo. Lo que sí puede hacerse siempre es preguntar al cuidador, que suele llevar cánulas de repuesto y haber resuelto la situación antes.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Signos de disfunción de una derivación', texto: 'Cefalea, vómito, somnolencia, irritabilidad, cambios en la mirada o en la marcha, y en el lactante, aumento del perímetro craneal o abombamiento de la fontanela. Como el cuadro se parece a una gastroenteritis o a un proceso banal, el antecedente del dispositivo es lo que cambia la interpretación, y por eso debe buscarse activamente.' },
        ],
      },
      {
        titulo: 'Conducta y traslado',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Valorar con la secuencia habitual, pero interpretando los hallazgos contra la línea de base de ese paciente.',
              'Preguntar al cuidador por el plan de acción escrito, el informe del especialista y el centro donde se le sigue.',
              'No manipular un dispositivo que no se conoce si no es imprescindible y no está dentro del alcance autorizado.',
              'Llevar al hospital el material propio del niño —cánulas de repuesto, adaptadores, equipo— cuando sea posible.',
              'Trasladar, si el protocolo lo permite, al centro que conoce al paciente: allí está su historia y su equipo de referencia.',
              'Comunicar en la entrega el dispositivo, la línea de base y qué es lo distinto de hoy.',
              'Tratar al niño como paciente: hablarle, explicarle y respetar su intimidad, aunque no pueda responder.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que no debe ocurrir', texto: 'Que el equipo se centre en el dispositivo y olvide que puede haber un problema completamente ajeno a él. Un niño con parálisis cerebral y sonda de alimentación también puede tener una apendicitis, una fractura o una infección urinaria. La enfermedad crónica no protege de nada, y con frecuencia dificulta que el paciente exprese el síntoma.' },
          mnemotecnia('«¿CÓMO ESTÁ NORMALMENTE?» Y «¿QUÉ ES DISTINTO HOY?». Dos preguntas que lo ordenan todo, porque en estos pacientes lo normal no es la media poblacional: es su propia línea de base.'),
          masPreguntado('Que la traqueostomía obstruida es la urgencia más frecuente: un niño con traqueostomía que se deteriora tiene un problema de vía aérea hasta que se demuestre lo contrario, y la causa más habitual es la obstrucción por secreciones.'),
        ],
      },
      erroresFrecuentes([
        ['Comparar al paciente con la media poblacional', 'Puede tener de base un tono alterado, una saturación por debajo de lo habitual o una forma peculiar de respirar. Lo que importa es su línea de base.'],
        ['No preguntar al cuidador', 'Suele ser un experto: conoce el dispositivo, ha manejado la misma complicación y a menudo lleva un plan de acción escrito.'],
        ['Manipular un dispositivo que no se conoce', 'No se manipula si no es imprescindible y no está dentro del alcance autorizado.'],
        ['Centrarse en el dispositivo y olvidar lo demás', 'Un niño con parálisis cerebral y sonda también puede tener una apendicitis, una fractura o una infección urinaria.'],
      ]),
      repasoRapido([
        'Cada vez más niños viven en casa con enfermedades crónicas complejas y dispositivos hospitalarios.',
        'Las dos preguntas que lo ordenan: cómo está normalmente y qué es distinto hoy.',
        'El cuidador suele ser un experto y con frecuencia lleva un plan de acción escrito.',
        'Traqueostomía: obstrucción por secreciones o decanulación accidental.',
        'Ventilación domiciliaria: fallo del equipo, desconexión o empeoramiento de base.',
        'Sonda de alimentación: salida accidental, obstrucción o irritación del punto de entrada.',
        'Catéter venoso central: infección, obstrucción o desplazamiento.',
        'Derivación de líquido cefalorraquídeo: obstrucción o infección, con signos de aumento de la presión intracraneal.',
        'Estoma digestivo o urinario: irritación, obstrucción o sangrado.',
        'La traqueostomía obstruida es la urgencia más frecuente.',
        'Disfunción de derivación: cefalea, vómito, somnolencia, irritabilidad, cambios en la mirada o la marcha, y fontanela abombada en el lactante.',
        'Se traslada, si el protocolo lo permite, al centro que conoce al paciente, y se comunica dispositivo, línea de base y qué es distinto hoy.',
      ]),
      preguntasOrales([
        'Di las dos preguntas que ordenan la atención de estos pacientes.',
        '¿Por qué el cuidador es una fuente experta?',
        'Enumera los dispositivos frecuentes y su problema habitual.',
        '¿Cuál es la urgencia más frecuente, y qué se asume?',
        'Di los signos de disfunción de una derivación.',
        '¿Qué se hace con un dispositivo que no se conoce?',
        '¿A qué centro se traslada, si es posible?',
        '¿Qué no debe ocurrir en la atención de estos niños?',
      ]),
      F([AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Línea de base', definicion: 'Estado habitual de un paciente concreto, que sustituye a la norma poblacional como referencia de comparación.' },
      { termino: 'Traqueostomía', definicion: 'Vía aérea permanente a través del cuello; su obstrucción por secreciones es la urgencia más frecuente en estos pacientes.' },
      { termino: 'Derivación de líquido cefalorraquídeo', definicion: 'Dispositivo que drena el exceso de líquido intracraneal; su disfunción produce signos de aumento de la presión intracraneal.' },
      { termino: 'Cuidador experto', definicion: 'Persona que convive con el paciente, conoce sus dispositivos y ha manejado antes sus complicaciones; fuente de información prioritaria.' },
    ],
    flashcards: [
      { frente: 'Las dos preguntas que ordenan la valoración', reverso: '«¿Cómo está normalmente?» y «¿Qué es distinto hoy?».' },
      { frente: '¿Cuál es la urgencia más frecuente en un niño con traqueostomía?', reverso: 'La obstrucción por secreciones; se aborda como problema de vía aérea.' },
      { frente: 'Signos de disfunción de una derivación de LCR', reverso: 'Cefalea, vómito, somnolencia, irritabilidad, cambios en mirada o marcha, y en el lactante, fontanela abombada.' },
      { frente: '¿Por qué no basta comparar con la media de su edad?', reverso: 'Porque su normalidad puede ser distinta, y compararlo con la media oculta el cambio real.' },
      { frente: '¿Qué material conviene llevar al hospital?', reverso: 'El material propio del niño: cánulas de repuesto, adaptadores y equipo.' },
      { frente: '¿Protege la enfermedad crónica de otros problemas?', reverso: 'No: puede haber una causa completamente ajena al dispositivo, y el paciente puede tener más dificultad para expresar el síntoma.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con traqueostomía que se deteriora con dificultad respiratoria. ¿Cómo lo enfocas?',
        opciones: [
          'Como un problema pulmonar de base sin relación con el dispositivo.',
          'Como un problema de vía aérea hasta demostrar lo contrario, siendo la obstrucción por secreciones la causa más frecuente, y preguntando al cuidador, que suele haberlo resuelto antes.',
          'Retirando el dispositivo de inmediato.',
          'Esperando a llegar al hospital sin intervenir ni preguntar.',
        ],
        correcta: 1,
        explicacion: 'La conducta concreta sobre el dispositivo depende del alcance y del protocolo, pero el enfoque es de vía aérea.',
      },
      {
        pregunta: 'La saturación de un niño con enfermedad neurológica grave es más baja que la esperable para su edad. ¿Qué haces?',
        opciones: [
          'Actúas de inmediato asumiendo hipoxia aguda.',
          'Preguntas al cuidador cuál es su saturación habitual, e interpretas el dato contra esa línea de base.',
          'Ignoras el dato.',
          'Comparas únicamente con la tabla de valores por edad.',
        ],
        correcta: 1,
        explicacion: 'Compararlo con la media puede llevar a alarmarse por lo que es su normalidad o a no ver el cambio real.',
      },
      {
        pregunta: 'Niño con derivación de líquido cefalorraquídeo que vomita y está somnoliento. ¿Qué consideras?',
        opciones: [
          'Una gastroenteritis, como en cualquier niño.',
          'Posible disfunción de la derivación: el antecedente del dispositivo cambia la interpretación de un cuadro aparentemente banal.',
          'Un problema del dispositivo de alimentación.',
          'Que no requiere traslado.',
        ],
        correcta: 1,
        explicacion: 'El cuadro se parece a un proceso común, y por eso el antecedente debe buscarse activamente.',
      },
      {
        pregunta: 'Niño con parálisis cerebral y sonda de alimentación, con fiebre e irritabilidad. ¿Qué error debes evitar?',
        opciones: [
          'Preguntar al cuidador.',
          'Centrarte solo en el dispositivo y olvidar que puede tener un problema ajeno a él, como una infección o una lesión.',
          'Interpretar los hallazgos contra su línea de base.',
          'Llevar su material al hospital.',
        ],
        correcta: 1,
        explicacion: 'La enfermedad crónica no protege de nada y dificulta que el paciente exprese el síntoma.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La referencia para interpretar los hallazgos de estos pacientes es su ___, no la media de su edad.',
          opciones: ['diagnóstico', 'línea de base', 'peso'],
          correcta: 1,
          explicacion: 'Su normalidad puede ser distinta de la poblacional.',
        },
        {
          texto: 'El cuidador de un niño con dispositivos es una fuente ___ de información.',
          opciones: ['secundaria', 'experta y prioritaria', 'poco fiable'],
          correcta: 1,
          explicacion: 'Conoce el dispositivo y suele haber resuelto antes la misma complicación.',
        },
        {
          texto: 'Un dispositivo desconocido ___ si no es imprescindible y no está dentro del alcance autorizado.',
          opciones: ['se manipula igualmente', 'no se manipula', 'se retira'],
          correcta: 1,
          explicacion: 'La actuación sobre el dispositivo depende del alcance, del material y del protocolo.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['La lección desarrolla el tema desde el manejo del paciente con enfermedad crónica compleja y sus dispositivos, y no desde una intervención farmacológica aislada.'],
    }),
  },
}
