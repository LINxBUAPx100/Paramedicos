// ============================================================
//  Módulo 4 · Urgencias gineco-obstétricas (segunda parte)
// ------------------------------------------------------------
//  Últimos cinco temas de la unidad, en el orden del PDF: aborto, embarazo
//  ectópico, torsión ovárica, hemorragia posparto y preeclampsia/eclampsia.
//
//  Continúa `m4-gineco-a.js` y comparte sus dos prohibiciones de unidad: no se
//  enseña tacto vaginal ni especuloscopia prehospitalarios, y no se inventa ni
//  se describe ninguna maniobra obstétrica.
//
//  Fuentes asignadas por el registro para `m4-urgencias-gineco-obstetricas`:
//  WHO aborto 2022, NICE NG126 (ectópico y pérdida gestacional temprana), ACOG
//  783 (torsión anexial), WHO HPP 2025 (hemorragia posparto) y WHO maternal
//  2025; requiere protocolo local.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const WHO_ABORTO_2022 = {
  nombre: 'World Health Organization. Abortion Care Guideline, 2022.',
  url: 'https://www.who.int/news/item/09-03-2022-access-to-safe-abortion-critical-for-health-of-women-and-girls',
  nota: 'Guía rectora de la atención relacionada con el aborto. Su condición registrada obliga a '
    + 'separar la atención clínica de los requisitos legales locales y prohíbe enseñar esquemas '
    + 'farmacológicos prehospitalarios sin protocolo. PENDIENTE: sección exacta.',
}
const NICE_ECTOPICO_2026 = {
  nombre: 'NICE NG126. Ectopic Pregnancy and Miscarriage: Diagnosis and Initial Management, '
    + 'actualizada en junio de 2026.',
  url: 'https://www.nice.org.uk/guidance/ng126',
  nota: 'Guía rectora del embarazo ectópico y de la pérdida gestacional temprana. PENDIENTE: sección '
    + 'exacta; no se consultó el texto completo al redactar y no sostiene ninguna cifra.',
}
const ACOG_TORSION_2019 = {
  nombre: 'American College of Obstetricians and Gynecologists. Committee Opinion 783: Adnexal '
    + 'Torsion in Adolescents, 2019.',
  url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2019/08/adnexal-torsion-in-adolescents',
  nota: 'Documento rector de la torsión anexial. Su alcance declarado es la adolescente; se usa por su '
    + 'descripción del cuadro y de la urgencia quirúrgica, no para extrapolar criterios a otras '
    + 'poblaciones. PENDIENTE: sección exacta.',
}
const WHO_HPP_2025 = {
  nombre: 'World Health Organization. Recommendations on Postpartum Haemorrhage, 2025.',
  url: 'https://www.who.int/publications/i/item/9789240115637',
  nota: 'Guía rectora de la HEMORRAGIA POSPARTO. PENDIENTE: sección exacta, umbrales de volumen y '
    + 'paquete farmacológico; no se consultó el texto completo al redactar.',
}
const WHO_MATERNAL_2025 = {
  nombre: 'World Health Organization. Recommendations on Maternal Health, 2.ª edición, 2025.',
  url: 'https://www.who.int/westernpacific/publications/i/item/9789240080591',
  nota: 'Compendio de recomendaciones de la OMS sobre salud materna, incluida la enfermedad '
    + 'hipertensiva del embarazo. PENDIENTE: sección exacta; no se consultó el texto completo.',
}
const WHO_OBSTETRICIA = {
  nombre: 'World Health Organization. Managing Complications in Pregnancy and Childbirth, 2.ª edición.',
  url: 'https://www.who.int/publications/i/item/9789241565493',
  nota: 'Manual de la OMS sobre complicaciones del embarazo y el parto. PENDIENTE: sección y página '
    + 'exactas; no se consultó el texto completo al redactar.',
}

const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ninguna dosis, cifra de presión, umbral de volumen de sangrado ni '
  + 'esquema farmacológico. Las guías rectoras no se consultaron en su texto y toda medicación '
  + 'obstétrica depende del protocolo obstétrico del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocimiento, gravedad, estabilización, reevaluación y '
  + 'destino. No se trasladan al campo pruebas ni tratamientos hospitalarios y la impresión de campo '
  + 'no se presenta como diagnóstico.'
const NO_TACTO = 'PROHIBICIÓN DE UNIDAD: no se enseña tacto vaginal ni especuloscopia '
  + 'prehospitalarios; la exploración se limita a lo externo y a lo necesario.'
const NO_MANIOBRAS = 'PROHIBICIÓN DE UNIDAD: no se inventa ni se describe ninguna maniobra '
  + 'obstétrica. Las que existen exigen formación específica, competencia acreditada y protocolo con '
  + 'dirección médica.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás cifras de presión, volúmenes de sangrado ni dosis. Una cifra clínica '
    + 'solo se publica cuando constan su población, su indicación, la edición de la guía que la '
    + 'sostiene y el protocolo que la autoriza. En obstetricia hay además una razón añadida: casi toda '
    + 'intervención depende de un protocolo obstétrico específico que la academia todavía no ha '
    + 'entregado. Lo que sí se enseña es reconocer la gravedad, sostener a la paciente y decidir el '
    + 'destino.',
}

const ficha = ({ estado = 'borrador', version, extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    AMBITO,
    SIN_CIFRAS,
    NO_TACTO,
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Aborto
  // ============================================================
  'm4-gyn-aborto': {
    icono: '🕊️',
    duracion: '20 min',
    resumen: 'Cómo se atiende clínicamente a una paciente con pérdida gestacional o tras un aborto, qué '
      + 'complicaciones se reconocen y por qué el trato y la confidencialidad forman parte de la '
      + 'atención.',
    objetivos: [
      'Distinguir las situaciones que el término aborto agrupa, sin emitir juicios.',
      'Reconocer las complicaciones que comprometen la vida: sangrado e infección.',
      'Conducir la entrevista preservando dignidad y confidencialidad.',
      'Delimitar qué corresponde al ámbito clínico y qué al marco jurídico local.',
    ],
    secciones: [
      {
        titulo: 'Qué agrupa el término',
        bloques: [
          { tipo: 'p', texto: 'En el lenguaje clínico, aborto designa la interrupción del embarazo antes de que el feto sea viable. Bajo ese término conviven situaciones muy distintas entre sí, y el prestador atiende a la paciente que tiene delante sin necesidad de establecer en cuál se encuentra.' },
          {
            tipo: 'tabla',
            titulo: 'Situaciones distintas, misma atención clínica',
            headers: ['Situación', 'Qué es'],
            filas: [
              ['Pérdida gestacional espontánea', 'Interrupción que ocurre sin intervención; es frecuente en las primeras semanas'],
              ['Interrupción inducida', 'Interrupción provocada, en condiciones que pueden ser seguras o no'],
              ['Atención posterior a un aborto', 'Situación de una paciente que consulta por complicaciones o por seguimiento tras cualquiera de las anteriores'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La atención clínica no depende de la categoría', texto: 'Sea cual sea la situación, lo que el prestador valora es lo mismo: si la paciente está sangrando de forma peligrosa, si hay signos de infección y cuál es su estado de perfusión. Nada de la conducta prehospitalaria cambia según cómo se haya producido la interrupción, y esa es una razón práctica —además de ética— para no convertir la entrevista en un interrogatorio.' },
        ],
      },
      {
        titulo: 'Lo que hay que reconocer',
        bloques: [
          { tipo: 'p', texto: 'Dos complicaciones concentran el riesgo vital: el sangrado y la infección. Ambas se reconocen con lo que ya se sabe valorar.' },
          {
            tipo: 'lista',
            titulo: 'Datos que se recogen',
            items: [
              'Semanas de gestación estimadas y fecha de la última menstruación.',
              'Desde cuándo sangra, cuánto y con qué lo compara: apósitos empapados por hora, coágulos, expulsión de tejido.',
              'Dolor: localización, intensidad y evolución.',
              'Fiebre, escalofríos o secreción de mal olor.',
              'Náusea, vómito o mareo.',
              'Si ha habido algún procedimiento o toma de medicación reciente, preguntado sin juicio y solo porque cambia el riesgo de complicación.',
              'Antecedentes, alergias y tratamiento habitual.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Banderas rojas',
            items: [
              'Sangrado abundante o que no cede.',
              'Signos de hipoperfusión: piel fría, pálida o moteada, relleno capilar lento, taquicardia mantenida.',
              'Hipotensión o descenso de la presión durante la atención.',
              'Síncope o mareo importante.',
              'Fiebre con afectación del estado general, que sugiere infección.',
              'Dolor abdominal intenso, sobre todo si se acompaña de dolor referido al hombro, porque obliga a considerar un embarazo ectópico.',
              'Alteración del estado mental.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un sangrado del primer trimestre obliga a pensar también en ectópico', texto: 'La pérdida gestacional temprana y el embarazo ectópico pueden presentarse de forma parecida, y el segundo compromete la vida. Por eso el dolor intenso, el dolor referido al hombro, el síncope o una hipoperfusión desproporcionada al sangrado visible obligan a considerarlo, como se estudia en la lección siguiente.' },
        ],
      },
      {
        titulo: 'Cómo se atiende',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria y del estado de perfusión antes que cualquier otra cosa.',
              'Estimar y registrar el sangrado con la referencia que la paciente aporte.',
              'Prevenir la hipotermia y cubrir a la paciente.',
              'Acceso vascular y aporte de líquidos únicamente conforme al alcance y al protocolo.',
              'Conservar el tejido expulsado si la paciente lo ha guardado y trasladarlo con ella, sin manipularlo ni examinarlo.',
              'Preguntar solo lo que cambia la conducta, y hacerlo a solas cuando sea posible.',
              'Traslado con prealerta ante cualquier bandera roja.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace', texto: 'No se intenta comprobar si la expulsión ha sido completa: exige valoración ginecológica y estudios que no existen en la calle, y el intento no cambia la conducta. No se introduce nada en el canal vaginal ni se retira tejido. No se propone ni se administra ningún esquema farmacológico. Y no se registra ninguna valoración sobre las decisiones de la paciente.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La dignidad y la confidencialidad son parte de la atención', texto: 'Esta es una situación en la que una paciente puede sentirse juzgada, expuesta o en riesgo. El prestador atiende sin emitir opiniones, preserva la privacidad, limita la información que comparte a la clínicamente necesaria y con quien tenga que recibirla, y evita comentarios delante de acompañantes o de terceros. Una paciente que teme el juicio oculta datos, y algunos de esos datos son los que permiten reconocer una complicación.' },
        ],
      },
      {
        titulo: 'Lo clínico y lo jurídico son planos distintos',
        bloques: [
          { tipo: 'p', texto: 'El marco legal aplicable a la interrupción del embarazo, y las obligaciones de notificación que puedan existir, varían según la jurisdicción y cambian con el tiempo. Este módulo no los enuncia porque hacerlo con precisión exige el marco vigente en el lugar donde opera el servicio.' },
          {
            tipo: 'lista',
            titulo: 'Qué sí puede afirmarse',
            items: [
              'La atención clínica de urgencia no se condiciona a la situación jurídica del caso.',
              'La confidencialidad de la información de salud es una obligación general, con las excepciones que fije la norma aplicable.',
              'Cualquier obligación de notificación, y ante quién, depende de la entidad federativa y del procedimiento del servicio.',
              'El prestador debe conocer el procedimiento escrito de su servicio antes de encontrarse en la situación, no durante ella.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Bloqueo declarado', texto: 'Este tema tiene un componente jurídico que no puede completarse sin el marco local. La academia debe entregar el procedimiento escrito de su servicio y el marco jurídico de su entidad federativa; hasta entonces, esta lección enseña la atención clínica y remite expresamente lo demás, sin inventar obligaciones ni autoridades competentes.' },
        ],
      },
      F([WHO_ABORTO_2022, NICE_ECTOPICO_2026, bibiano(118, 'Urgencias ginecológicas', 1050)]),
    ],
    conceptosClave: [
      { termino: 'Pérdida gestacional espontánea', definicion: 'Interrupción del embarazo que ocurre sin intervención; es frecuente en las primeras semanas.' },
      { termino: 'Atención posterior al aborto', definicion: 'Atención de complicaciones o seguimiento tras cualquier forma de interrupción; su manejo clínico no depende de cómo se produjo.' },
      { termino: 'Complicaciones con riesgo vital', definicion: 'El sangrado y la infección; concentran el riesgo y se reconocen con la valoración habitual.' },
      { termino: 'Sospecha de ectópico', definicion: 'Consideración obligada ante dolor intenso, dolor referido al hombro, síncope o hipoperfusión desproporcionada al sangrado visible.' },
      { termino: 'Confidencialidad como parte de la atención', definicion: 'Limitar la información a la clínicamente necesaria y a quien deba recibirla; una paciente que teme el juicio oculta datos que permiten reconocer una complicación.' },
    ],
    flashcards: [
      { frente: '¿Cambia la conducta prehospitalaria según cómo se produjo la interrupción?', reverso: 'No: se valora sangrado, infección y perfusión, y eso es igual en todas las situaciones.' },
      { frente: '¿Qué dos complicaciones concentran el riesgo vital?', reverso: 'El sangrado y la infección.' },
      { frente: '¿Qué obliga a considerar un embarazo ectópico ante un sangrado temprano?', reverso: 'Dolor intenso, dolor referido al hombro, síncope o hipoperfusión desproporcionada al sangrado visible.' },
      { frente: '¿Se comprueba si la expulsión fue completa?', reverso: 'No: exige valoración ginecológica y estudios que no existen en la calle, y no cambia la conducta.' },
      { frente: '¿Qué se hace con el tejido expulsado si la paciente lo guardó?', reverso: 'Se conserva y se traslada con ella, sin manipularlo ni examinarlo.' },
      { frente: '¿Por qué la confidencialidad es parte de la atención clínica?', reverso: 'Porque una paciente que teme el juicio oculta datos, y algunos permiten reconocer una complicación.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente de 26 años con sangrado del primer trimestre, dolor abdominal intenso, dolor en el hombro y presíncope. ¿Qué priorizas?',
        opciones: [
          'Confirmar si la expulsión ha sido completa.',
          'Considerar un embarazo ectópico: el dolor referido al hombro y el síncope obligan a plantearlo, y compromete la vida.',
          'Registrar el caso como pérdida gestacional y trasladar sin prioridad.',
          'Realizar un tacto vaginal para valorar el sangrado.',
        ],
        correcta: 1,
        explicacion: 'La pérdida temprana y el ectópico pueden presentarse de forma parecida, y el segundo compromete la vida.',
      },
      {
        pregunta: 'Un compañero pregunta a la paciente, delante de su familia, cómo se produjo la interrupción. ¿Qué falla?',
        opciones: [
          'Nada: es información necesaria.',
          'Que la conducta clínica no cambia según cómo se produjo, y preguntarlo delante de terceros compromete la confidencialidad y hace que la paciente oculte datos.',
          'Que debió preguntarlo antes de valorar el sangrado.',
          'Que debió registrarlo por escrito primero.',
        ],
        correcta: 1,
        explicacion: 'Se pregunta solo lo que cambia la conducta, y a solas cuando sea posible.',
      },
      {
        pregunta: 'La paciente ha guardado tejido expulsado. ¿Qué haces?',
        opciones: [
          'Examinarlo para comprobar si la expulsión fue completa.',
          'Conservarlo y trasladarlo con ella, sin manipularlo ni examinarlo.',
          'Desecharlo conforme al procedimiento de residuos.',
          'Fotografiarlo para el informe.',
        ],
        correcta: 1,
        explicacion: 'Comprobar la completitud exige valoración ginecológica y no cambia la conducta prehospitalaria.',
      },
      {
        pregunta: '¿Qué enseña esta lección sobre las obligaciones jurídicas de notificación?',
        opciones: [
          'Las enumera con detalle para todo el país.',
          'Que dependen de la entidad federativa y del procedimiento del servicio, y que el prestador debe conocer ese procedimiento antes de encontrarse en la situación.',
          'Que no existen en ningún caso.',
          'Que corresponden siempre al hospital receptor.',
        ],
        correcta: 1,
        explicacion: 'El componente jurídico no puede completarse sin el marco local, y la lección lo declara como bloqueo en vez de inventar obligaciones.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Llegas a un domicilio: paciente de 22 años, sangrado desde hace seis horas, pálida, taquicárdica, acompañada de su madre. ¿Cuál es la primera pregunta clínicamente indispensable?',
          opciones: [
            'Cómo se produjo la interrupción.',
            'Desde cuándo sangra y cuánto, con una referencia que ella pueda dar, además de valorar su perfusión.',
            'Si tiene pareja estable.',
            'Si ha informado a su familia.',
          ],
          correcta: 1,
          explicacion: 'Se pregunta solo lo que cambia la conducta: el sangrado y el estado de perfusión son lo que decide la prioridad.',
        },
        {
          pregunta: 'La paciente baja la voz y pide que su madre no escuche. ¿Cómo procedes?',
          opciones: [
            'Continuar la entrevista igual, ya que la madre es familiar directa.',
            'Ofrecer hablar a solas y limitar después la información compartida a la clínicamente necesaria y a quien deba recibirla.',
            'Pedirle que lo cuente todo delante de su madre para evitar malentendidos.',
            'Suspender la entrevista hasta llegar al hospital.',
          ],
          correcta: 1,
          explicacion: 'La confidencialidad forma parte de la atención, y una paciente que teme el juicio oculta datos que permiten reconocer complicaciones.',
        },
        {
          pregunta: 'Refiere además fiebre y escalofríos desde ayer. ¿Qué añade ese dato a la estabilización?',
          opciones: [
            'Nada: la fiebre es esperable tras un sangrado.',
            'Sugiere infección, que junto con el sangrado concentra el riesgo vital, y refuerza el traslado con prealerta.',
            'Obliga a comprobar si la expulsión fue completa.',
            'Indica administrar un antibiótico en la escena.',
          ],
          correcta: 1,
          explicacion: 'Sangrado e infección son las dos complicaciones con riesgo vital; la fiebre con afectación general es una bandera roja.',
        },
      ],
    },
    revision: ficha({
      version: 'WHO Abortion Care 2022 y NICE NG126 (secciones pendientes); Bibiano 3.ª ed., cap. 118',
      fuentes: [
        'WHO. Abortion Care Guideline, 2022 (sección pendiente).',
        'NICE NG126. Ectopic Pregnancy and Miscarriage, actualizada en junio de 2026 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 118, p. 1050.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las guías, y además existe un '
          + 'BLOQUEO JURÍDICO PARCIAL: el marco legal y las obligaciones de notificación dependen de la '
          + 'entidad federativa y del procedimiento del servicio, y no se enuncian.',
        'CONFORME A LA CONDICIÓN REGISTRADA de la guía de la OMS: se separa la atención clínica de los '
          + 'requisitos legales locales y no se enseña ningún esquema farmacológico.',
        'La lección se redacta sin juicio sobre las decisiones reproductivas y establece la '
          + 'confidencialidad como parte de la atención clínica, no como cortesía.',
        'PREGUNTA PARA LA ACADEMIA: ¿cuál es el procedimiento escrito de su servicio y el marco '
          + 'jurídico de su entidad federativa en esta materia?',
      ],
    }),
  },

  // ============================================================
  //  Embarazo ectópico
  // ============================================================
  'm4-gyn-ectopico': {
    icono: '🚑',
    duracion: '18 min',
    resumen: 'Por qué un embarazo implantado fuera del útero puede matar en poco tiempo, cómo se sospecha '
      + 'y por qué la ausencia de factores de riesgo no lo descarta.',
    objetivos: [
      'Explicar qué es un embarazo ectópico y por qué compromete la vida al romperse.',
      'Reconocer la tríada de sospecha y sus presentaciones atípicas.',
      'Justificar por qué los factores de riesgo apoyan pero no descartan.',
      'Priorizar la perfusión y el traslado sobre cualquier intento de confirmación.',
    ],
    secciones: [
      {
        titulo: 'Qué es y por qué es peligroso',
        bloques: [
          { tipo: 'p', texto: 'Un embarazo ectópico es el que se implanta fuera de la cavidad del útero, con mayor frecuencia en una trompa uterina. El problema no es la localización en sí, sino que ese lugar no puede acomodar el crecimiento: la estructura se distiende y puede romperse.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La rotura produce una hemorragia interna', texto: 'Cuando la estructura se rompe, la sangre pasa a la cavidad abdominal. Es un sangrado que no se ve desde fuera y que puede ser masivo, de modo que la paciente puede deteriorarse con rapidez sin haber presentado casi sangrado vaginal. Esa combinación —hemorragia importante sin sangrado visible— es lo que convierte a este cuadro en una de las urgencias que menos margen dan en toda la unidad.' },
          { tipo: 'p', texto: 'Conviene además situar el momento: ocurre en las primeras semanas de gestación, cuando muchas mujeres todavía no saben que están embarazadas. Por eso el cuadro se presenta con frecuencia como un dolor abdominal en una paciente que niega embarazo, y por eso la pregunta sobre la posibilidad de embarazo se hace siempre.' },
        ],
      },
      {
        titulo: 'Cómo se sospecha',
        bloques: [
          { tipo: 'p', texto: 'La sospecha se construye sobre una combinación sencilla que conviene memorizar por lo que descarta: embarazo posible más dolor abdominal o pélvico, con o sin sangrado.' },
          {
            tipo: 'lista',
            titulo: 'Manifestaciones',
            items: [
              'Dolor abdominal bajo o pélvico, con frecuencia de un solo lado, que puede ser intenso y de inicio brusco.',
              'Sangrado vaginal, que suele ser escaso o intermitente y a veces falta por completo.',
              'Retraso menstrual, que la paciente puede no haber notado.',
              'Dolor referido al hombro: aparece cuando la sangre en el abdomen irrita el diafragma, y es un dato de alarma.',
              'Mareo, presíncope o síncope.',
              'Signos de hipoperfusión desproporcionados al sangrado visible.',
              'Náusea y vómito.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El dolor en el hombro es el dato que más se pasa por alto', texto: 'Una paciente joven con dolor abdominal que además refiere dolor en el hombro sin haberse lesionado está describiendo, con frecuencia, irritación del diafragma por sangre libre en el abdomen. Es un hallazgo que no parece grave y que en este contexto lo es mucho.' },
          {
            tipo: 'lista',
            titulo: 'Factores que aumentan el riesgo',
            items: [
              'Embarazo ectópico previo.',
              'Cirugía tubárica o pélvica previa.',
              'Infección pélvica previa.',
              'Uso de dispositivo intrauterino.',
              'Tratamientos de reproducción asistida.',
              'Tabaquismo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ausencia de factores de riesgo no descarta nada', texto: 'Una proporción importante de los embarazos ectópicos ocurre en mujeres sin ningún factor de riesgo identificable. Los factores elevan la sospecha cuando están; su ausencia no la reduce. Usarlos para descartar es exactamente el razonamiento que produce los retrasos más graves en este cuadro.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'En la calle no se confirma ni se excluye un embarazo ectópico: su diagnóstico requiere pruebas y ecografía. La aportación del prestador es reconocer la sospecha, sostener la perfusión y trasladar sin demora comunicando exactamente lo que ha observado.' },
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria con atención prioritaria al estado de perfusión.',
              'Preguntar por posibilidad de embarazo, fecha de la última menstruación y factores de riesgo.',
              'Exploración abdominal externa, valorando dolor, defensa y su distribución.',
              'Buscar activamente el dolor referido al hombro y el presíncope.',
              'Prevenir la hipotermia y cubrir a la paciente.',
              'Acceso vascular y aporte de líquidos únicamente conforme al alcance y al protocolo.',
              'Traslado urgente a centro con capacidad quirúrgica y ginecológica, con prealerta.',
              'Reevaluación continua: la tendencia de la perfusión es el dato que más informa.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dos errores que cuestan tiempo', texto: 'El primero: descartar el cuadro porque la paciente dice que no está embarazada, cuando el ectópico se presenta con frecuencia antes de que lo sepa. El segundo: tranquilizarse porque el sangrado vaginal es escaso, cuando la hemorragia peligrosa de este cuadro es la que no se ve. Ninguno de los dos razonamientos es válido.' },
        ],
      },
      F([NICE_ECTOPICO_2026, bibiano(118, 'Urgencias ginecológicas', 1050), WHO_OBSTETRICIA]),
    ],
    conceptosClave: [
      { termino: 'Embarazo ectópico', definicion: 'Embarazo implantado fuera de la cavidad uterina, con mayor frecuencia en una trompa; el lugar no acomoda el crecimiento y puede romperse.' },
      { termino: 'Hemorragia interna', definicion: 'Sangrado a la cavidad abdominal tras la rotura; no se ve desde fuera y puede ser masivo.' },
      { termino: 'Tríada de sospecha', definicion: 'Embarazo posible, dolor abdominal o pélvico y sangrado, que puede ser escaso o faltar.' },
      { termino: 'Dolor referido al hombro', definicion: 'Dato de alarma producido por irritación del diafragma por sangre libre en el abdomen.' },
      { termino: 'Valor asimétrico de los factores de riesgo', definicion: 'Elevan la sospecha cuando están presentes, pero su ausencia no la reduce ni descarta el cuadro.' },
    ],
    flashcards: [
      { frente: '¿Por qué es peligroso un embarazo ectópico?', reverso: 'Porque el lugar donde se implanta no acomoda el crecimiento, la estructura se rompe y produce una hemorragia interna que no se ve desde fuera.' },
      { frente: '¿Cuál es la tríada de sospecha?', reverso: 'Embarazo posible más dolor abdominal o pélvico, con o sin sangrado.' },
      { frente: '¿Qué significa el dolor referido al hombro en este cuadro?', reverso: 'Irritación del diafragma por sangre libre en el abdomen; es un dato de alarma que suele pasarse por alto.' },
      { frente: '¿Descarta el cuadro la ausencia de factores de riesgo?', reverso: 'No: una proporción importante ocurre en mujeres sin ningún factor identificable.' },
      { frente: '¿Por qué una paciente puede negar el embarazo?', reverso: 'Porque el ectópico ocurre en las primeras semanas, cuando muchas mujeres todavía no saben que están embarazadas.' },
      { frente: '¿Tranquiliza un sangrado vaginal escaso?', reverso: 'No: la hemorragia peligrosa de este cuadro es la interna, que no se ve.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 27 años con dolor abdominal bajo de un lado, sangrado escaso y dolor en el hombro derecho sin traumatismo. Está pálida y taquicárdica. ¿Qué sospechas?',
        opciones: [
          'Una infección urinaria.',
          'Un embarazo ectópico posiblemente roto: el dolor referido al hombro sugiere sangre libre irritando el diafragma, y la hipoperfusión es desproporcionada al sangrado visible.',
          'Una pérdida gestacional temprana sin complicación.',
          'Un cólico renal.',
        ],
        correcta: 1,
        explicacion: 'Es exactamente la combinación que la lección enseña a reconocer, y compromete la vida.',
      },
      {
        pregunta: 'La paciente afirma con seguridad que no está embarazada. ¿Qué valor tiene esa afirmación?',
        opciones: [
          'Descarta el embarazo ectópico.',
          'No lo descarta: el ectópico ocurre en las primeras semanas, cuando muchas mujeres no saben que están embarazadas.',
          'Obliga a realizar un tacto vaginal.',
          'Permite trasladar sin prioridad.',
        ],
        correcta: 1,
        explicacion: 'Descartar el cuadro por esa afirmación es uno de los dos errores que cuestan tiempo.',
      },
      {
        pregunta: 'La paciente no tiene ningún factor de riesgo conocido. ¿Cómo afecta eso a tu sospecha?',
        opciones: [
          'La reduce de forma importante.',
          'No la reduce: los factores elevan la sospecha cuando están, pero su ausencia no descarta el cuadro.',
          'La elimina si además el sangrado es escaso.',
          'La confirma por descarte.',
        ],
        correcta: 1,
        explicacion: 'Usar la ausencia de factores para descartar produce los retrasos más graves en este cuadro.',
      },
      {
        pregunta: '¿Cuál es la aportación del prestador ante esta sospecha?',
        opciones: [
          'Confirmar el diagnóstico con la exploración.',
          'Reconocer la sospecha, sostener la perfusión y trasladar sin demora a un centro con capacidad quirúrgica y ginecológica, comunicando lo observado.',
          'Esperar a que el sangrado aumente para decidir.',
          'Administrar analgesia y derivar a consulta.',
        ],
        correcta: 1,
        explicacion: 'El diagnóstico requiere pruebas y ecografía; en la calle no se confirma ni se excluye.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Tres pacientes con dolor abdominal y síncope. A: varón de 70 años con masa pulsátil. B: mujer de 25 años con retraso menstrual y dolor en el hombro. C: mujer de 60 años con vómitos y diarrea de tres días. ¿En cuál sospechas embarazo ectópico roto?',
          opciones: [
            'En la paciente C.',
            'En la paciente B: embarazo posible, dolor abdominal y dolor referido al hombro con síncope.',
            'En el paciente A.',
            'En ninguna: el síncope descarta causa ginecológica.',
          ],
          correcta: 1,
          explicacion: 'Es la combinación de la tríada de sospecha con el dato de alarma del dolor referido al hombro.',
        },
        {
          pregunta: 'En la paciente B, ¿qué explica que esté hipoperfundida si apenas ha sangrado por vía vaginal?',
          opciones: [
            'Una deshidratación por vómitos.',
            'Una hemorragia interna: la sangre pasa a la cavidad abdominal y no se ve desde fuera.',
            'Una reacción vagal aislada.',
            'Un error en la medición de la presión.',
          ],
          correcta: 1,
          explicacion: 'La combinación de hemorragia importante sin sangrado visible es lo que hace peligroso a este cuadro.',
        },
        {
          pregunta: 'Si esa paciente no tuviera ningún factor de riesgo, ¿cambiaría tu conducta?',
          opciones: [
            'Sí: se descartaría el ectópico y se buscaría otra causa.',
            'No: la ausencia de factores no reduce la sospecha, y la conducta sigue siendo sostener la perfusión y trasladar con urgencia.',
            'Sí: se trasladaría sin prioridad.',
            'Sí: se realizaría un tacto vaginal para orientar.',
          ],
          correcta: 1,
          explicacion: 'El valor de los factores de riesgo es asimétrico: elevan la sospecha, no la descartan.',
        },
      ],
    },
    revision: ficha({
      version: 'NICE NG126 actualizada en junio de 2026 (sección pendiente); Bibiano 3.ª ed., cap. 118',
      fuentes: [
        'NICE NG126. Ectopic Pregnancy and Miscarriage, actualizada en junio de 2026 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 118, p. 1050.',
        'WHO. Managing Complications in Pregnancy and Childbirth, 2.ª ed. (sección pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de NICE NG126.',
        'CONTROL: la lección declara expresamente que el cuadro no se confirma ni se excluye en campo y '
          + 'que la ausencia de factores de riesgo no lo descarta.',
        NO_TACTO,
        'No se publica ninguna cifra de tiempo, volumen ni criterio: la conducta se enseña por '
          + 'reconocimiento y tendencia de la perfusión.',
      ],
    }),
  },

  // ============================================================
  //  Torsión ovárica
  // ============================================================
  'm4-gyn-torsion-ovarica': {
    icono: '🌀',
    duracion: '16 min',
    resumen: 'Qué ocurre cuando un ovario gira sobre su propio pedículo, por qué es una urgencia '
      + 'quirúrgica y por qué la mejoría transitoria del dolor no permite descartarla.',
    objetivos: [
      'Explicar el mecanismo de la torsión y su consecuencia sobre el ovario.',
      'Reconocer su presentación característica, incluida la intermitente.',
      'Justificar por qué la mejoría transitoria no descarta el cuadro.',
      'Diferenciarla de los otros cuadros de dolor pélvico agudo mediante preguntas discriminantes.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'El ovario está suspendido por estructuras que contienen los vasos que lo irrigan. Si el ovario gira sobre ese eje, esos vasos quedan comprimidos: primero se dificulta el retorno de la sangre, el ovario se congestiona y se hincha, y si la torsión persiste llega a interrumpirse el flujo arterial y el tejido deja de recibir oxígeno.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Es una urgencia quirúrgica y depende del tiempo', texto: 'La consecuencia de una torsión mantenida es la pérdida del ovario. Por eso el cuadro se comporta como cualquier otro problema de irrigación interrumpida: cuanto antes se resuelva, más tejido se conserva. El diagnóstico y el tratamiento son hospitalarios, y la aportación prehospitalaria es no retrasarlos.' },
          { tipo: 'p', texto: 'Ocurre con más frecuencia cuando existe una masa o un quiste que aumenta el peso y facilita el giro, y también en la infancia y la adolescencia. Puede ocurrir además durante el embarazo, de modo que el antecedente de gestación no lo excluye.' },
        ],
      },
      {
        titulo: 'Cómo se presenta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Presentación característica',
            items: [
              'Dolor pélvico de un solo lado, de inicio brusco y con frecuencia intenso.',
              'Náusea y vómito acompañantes, que pueden ser llamativos.',
              'Dolor que puede irradiarse hacia la ingle, el flanco o la espalda.',
              'A veces, episodios previos similares que cedieron solos.',
              'Con frecuencia sin fiebre al principio y sin síntomas urinarios.',
              'La exploración abdominal puede mostrar dolor localizado en ese lado.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La forma intermitente es la trampa del cuadro', texto: 'El ovario puede girar y desgirar de forma parcial, produciendo episodios de dolor intenso que ceden espontáneamente. Una paciente que llega ya sin dolor, o cuyo dolor ha mejorado durante el traslado, puede tener una torsión intermitente y volver a torsionarse. La mejoría transitoria no descarta el cuadro, y esa es la afirmación más importante de esta lección.' },
          { tipo: 'p', texto: 'Otro error frecuente es esperar a palpar una masa. La exploración abdominal externa rara vez la detecta, sobre todo si la paciente tiene dolor y contrae la pared. Buscar una masa para confirmar retrasa el traslado y no aporta: la confirmación exige ecografía.' },
        ],
      },
      {
        titulo: 'Diferenciar y trasladar',
        bloques: [
          { tipo: 'p', texto: 'El dolor pélvico agudo de un lado en una mujer en edad fértil admite varias explicaciones, y algunas comprometen la vida. Unas pocas preguntas separan bastante el terreno.' },
          {
            tipo: 'tabla',
            titulo: 'Preguntas discriminantes',
            headers: ['Pregunta', 'Qué orienta'],
            filas: [
              ['¿Hay embarazo posible o retraso menstrual?', 'Si lo hay, el embarazo ectópico pasa al primer plano por su riesgo vital'],
              ['¿Hay dolor referido al hombro, síncope o hipoperfusión?', 'Sugieren sangre libre en el abdomen y orientan al ectópico roto'],
              ['¿El dolor se irradia desde el flanco hacia la ingle, con inquietud motora?', 'Orienta hacia un cólico renal'],
              ['¿Hay fiebre, escalofríos y afectación general?', 'Orientan hacia un cuadro infeccioso'],
              ['¿Hubo episodios previos idénticos que cedieron solos?', 'Compatible con torsión intermitente'],
              ['¿Hay náusea y vómito muy llamativos con dolor unilateral brusco?', 'Compatible con torsión'],
            ],
          },
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria y del estado de perfusión.',
              'Preguntar siempre por la posibilidad de embarazo.',
              'Exploración abdominal externa, sin buscar masas ni realizar tacto vaginal.',
              'Posición cómoda; no forzar el decúbito.',
              'Analgesia y antiemético únicamente conforme al protocolo del servicio.',
              'Traslado a centro con capacidad quirúrgica y ginecológica, sin retrasar por la mejoría del dolor.',
              'Registrar la hora de inicio del dolor y su evolución, incluida cualquier mejoría transitoria.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué transmitir', texto: 'La hora de inicio, la lateralidad, si hubo episodios previos que cedieron y si el dolor mejoró durante el traslado. Ese último dato, que parece tranquilizador, es precisamente el que el equipo receptor necesita conocer para no subestimar el cuadro.' },
        ],
      },
      F([ACOG_TORSION_2019, bibiano(118, 'Urgencias ginecológicas', 1050)]),
    ],
    conceptosClave: [
      { termino: 'Torsión ovárica', definicion: 'Giro del ovario sobre su pedículo que comprime sus vasos: primero dificulta el retorno venoso y después puede interrumpir el flujo arterial.' },
      { termino: 'Urgencia quirúrgica tiempo-dependiente', definicion: 'Carácter del cuadro: la torsión mantenida lleva a la pérdida del ovario, y cuanto antes se resuelva más tejido se conserva.' },
      { termino: 'Torsión intermitente', definicion: 'Giro y desgiro parcial que produce episodios de dolor que ceden solos; la mejoría transitoria no descarta el cuadro.' },
      { termino: 'Búsqueda de masa', definicion: 'Maniobra poco útil en la exploración externa: rara vez la detecta, retrasa el traslado y la confirmación exige ecografía.' },
      { termino: 'Preguntas discriminantes', definicion: 'Conjunto breve de preguntas que separa torsión, ectópico, cólico renal y cuadro infeccioso en el dolor pélvico agudo.' },
    ],
    flashcards: [
      { frente: '¿Qué le ocurre al ovario en una torsión?', reverso: 'Gira sobre su pedículo y comprime sus vasos: primero se congestiona y después puede interrumpirse el flujo arterial.' },
      { frente: '¿Por qué es tiempo-dependiente?', reverso: 'Porque la torsión mantenida lleva a la pérdida del ovario; cuanto antes se resuelva, más tejido se conserva.' },
      { frente: '¿Descarta la torsión que el dolor haya mejorado?', reverso: 'No: puede tratarse de una torsión intermitente que vuelva a torsionarse. Es la afirmación más importante de la lección.' },
      { frente: '¿Conviene buscar una masa para confirmar?', reverso: 'No: la exploración externa rara vez la detecta, retrasa el traslado y la confirmación exige ecografía.' },
      { frente: '¿Qué pregunta separa la torsión del ectópico?', reverso: 'La posibilidad de embarazo o el retraso menstrual; si los hay, el ectópico pasa al primer plano por su riesgo vital.' },
      { frente: '¿Excluye el embarazo la torsión ovárica?', reverso: 'No: puede ocurrir durante la gestación.' },
    ],
    quiz: [
      {
        pregunta: 'Adolescente con dolor pélvico izquierdo de inicio brusco y vómitos. Durante el traslado el dolor cede casi por completo. ¿Qué haces?',
        opciones: [
          'Regresarla a su domicilio, ya que el dolor cedió.',
          'Continuar el traslado y registrar la mejoría: puede ser una torsión intermitente que vuelva a torsionarse, y la mejoría transitoria no descarta el cuadro.',
          'Considerar descartada la urgencia quirúrgica.',
          'Buscar una masa abdominal para confirmar antes de decidir.',
        ],
        correcta: 1,
        explicacion: 'La forma intermitente es la trampa del cuadro, y el dato de la mejoría es el que el equipo receptor necesita conocer.',
      },
      {
        pregunta: 'Un compañero palpa insistentemente buscando una masa para confirmar la torsión. ¿Qué respondes?',
        opciones: [
          'Que es la maniobra que confirma el diagnóstico.',
          'Que la exploración externa rara vez la detecta, retrasa el traslado y la confirmación exige ecografía.',
          'Que debe hacerlo con la paciente en decúbito lateral.',
          'Que solo sirve si no hay dolor.',
        ],
        correcta: 1,
        explicacion: 'Buscar una masa para confirmar es uno de los errores frecuentes que la lección señala.',
      },
      {
        pregunta: 'Mujer de 30 años con dolor pélvico derecho brusco. Refiere retraso menstrual de dos semanas y presíncope. ¿Qué pasa al primer plano?',
        opciones: [
          'La torsión ovárica, por el dolor unilateral.',
          'El embarazo ectópico, por su riesgo vital ante embarazo posible con síncope.',
          'Un cólico renal.',
          'Una infección pélvica.',
        ],
        correcta: 1,
        explicacion: 'La primera pregunta discriminante es la posibilidad de embarazo; si la hay, el ectópico pasa al primer plano.',
      },
      {
        pregunta: '¿Cuál es la consecuencia de una torsión que no se resuelve?',
        opciones: [
          'Una infección pélvica crónica.',
          'La pérdida del ovario por interrupción mantenida del flujo.',
          'Una hemorragia vaginal masiva.',
          'Ninguna: se resuelve siempre sola.',
        ],
        correcta: 1,
        explicacion: 'Por eso el cuadro se comporta como cualquier problema de irrigación interrumpida y es tiempo-dependiente.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente A: dolor en flanco que baja hacia la ingle, no encuentra postura, sin retraso menstrual. Paciente B: dolor pélvico brusco unilateral con vómitos intensos y episodios previos que cedieron solos. Paciente C: dolor pélvico con retraso menstrual, dolor en hombro y presíncope. ¿Cuál es compatible con torsión?',
          opciones: [
            'La paciente A.',
            'La paciente B: dolor unilateral brusco, vómitos llamativos y episodios previos que cedieron, compatibles con torsión intermitente.',
            'La paciente C.',
            'Ninguna.',
          ],
          correcta: 1,
          explicacion: 'Son exactamente los rasgos que las preguntas discriminantes asocian a la torsión.',
        },
        {
          pregunta: '¿Qué distingue a la paciente A?',
          opciones: [
            'Una torsión ovárica en fase inicial.',
            'Un patrón de cólico renal: dolor que se irradia desde el flanco hacia la ingle con inquietud motora.',
            'Un embarazo ectópico.',
            'Una infección pélvica.',
          ],
          correcta: 1,
          explicacion: 'La irradiación desde el flanco hacia la ingle con inquietud motora es la pregunta discriminante del cólico renal.',
        },
        {
          pregunta: 'La paciente C es la que más preocupa. ¿Por qué?',
          opciones: [
            'Porque el dolor es más intenso.',
            'Porque el embarazo posible con dolor referido al hombro y presíncope sugiere un ectópico roto con sangre libre, que compromete la vida.',
            'Porque tiene vómitos.',
            'Porque no tiene episodios previos.',
          ],
          correcta: 1,
          explicacion: 'Ante embarazo posible con síncope o hipoperfusión, el ectópico pasa al primer plano por su riesgo vital.',
        },
      ],
    },
    revision: ficha({
      version: 'ACOG Committee Opinion 783 (2019), sección pendiente; Bibiano 3.ª ed., cap. 118',
      fuentes: [
        'ACOG Committee Opinion 783: Adnexal Torsion in Adolescents, 2019 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 118, p. 1050.',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta del documento de ACOG, cuyo alcance '
          + 'declarado es además la adolescente; se usa por su descripción del cuadro y de la urgencia '
          + 'quirúrgica, sin extrapolar criterios a otras poblaciones.',
        'CONTROL: la lección declara expresamente que la mejoría transitoria del dolor no descarta el '
          + 'cuadro y que no debe buscarse una masa para confirmar.',
        NO_TACTO,
      ],
    }),
  },

  // ============================================================
  //  Hemorragia posparto
  // ============================================================
  'm4-gyn-hemorragia-postparto': {
    icono: '🚨',
    duracion: '20 min',
    resumen: 'Cómo se reconoce pronto una hemorragia posparto, qué cuatro causas la explican y qué puede '
      + 'hacer el prestador mientras llega el recurso que la resuelve.',
    objetivos: [
      'Reconocer una hemorragia posparto sin esperar a un volumen visual determinado.',
      'Aplicar el marco de las cuatro causas para orientar la búsqueda.',
      'Ordenar la secuencia de reconocimiento, ayuda, soporte y reevaluación.',
      'Delimitar qué medidas dependen de competencia y de protocolo.',
    ],
    secciones: [
      {
        titulo: 'Reconocer pronto, no medir tarde',
        bloques: [
          { tipo: 'p', texto: 'La hemorragia posparto es la principal causa de muerte materna evitable en el mundo, y su característica más peligrosa es que puede parecer manejable hasta que deja de serlo. Una parte de la sangre se acumula sin salir, otra parte se pierde entre las sábanas y el suelo, y la propia paciente compensa durante un tiempo.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se espera un volumen para actuar', texto: 'Los criterios que definen la hemorragia posparto por cantidad de sangre existen y son útiles en el hospital, donde puede medirse. En la calle, esperar a alcanzar un volumen visual determinado antes de actuar es exactamente lo que produce las muertes evitables. La conducta se activa por el conjunto: sangrado que continúa, útero que no se contrae, cambio en el estado de la paciente.' },
          {
            tipo: 'lista',
            titulo: 'Qué hace sospecharla',
            items: [
              'Sangrado que continúa después del nacimiento y no disminuye.',
              'Sangre que empapa apósitos o ropa con rapidez.',
              'Útero que se palpa blando en lugar de firme.',
              'Taquicardia mantenida o ascendente.',
              'Palidez, sudoración fría, mareo o sensación de desmayo.',
              'Ansiedad o inquietud nuevas, que pueden ser el primer signo de hipoperfusión.',
              'Descenso de la presión, que aparece tarde y no debe esperarse.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La paciente obstétrica compensa y luego cae de golpe', texto: 'Ya se estableció en la lección de cambios fisiológicos: el mayor volumen del embarazo permite mantener las cifras durante más tiempo. La consecuencia práctica en este cuadro es dura: cuando la presión desciende, la pérdida ya es muy importante. Por eso se actúa con los signos precoces y no con las cifras.' },
        ],
      },
      {
        titulo: 'El marco de las cuatro causas',
        bloques: [
          { tipo: 'p', texto: 'Las causas de hemorragia posparto se agrupan en cuatro categorías que sirven para no olvidar ninguna. En el ámbito prehospitalario el marco no se usa para diagnosticar, sino para orientar la búsqueda y para transmitir al equipo receptor lo observado.' },
          {
            tipo: 'tabla',
            titulo: 'Las cuatro categorías',
            headers: ['Categoría', 'Qué significa', 'Qué se observa'],
            filas: [
              ['Tono', 'El útero no se contrae como debería tras el nacimiento', 'Útero blando a la palpación; es la causa más frecuente'],
              ['Trauma', 'Desgarros del canal del parto u otras lesiones', 'Sangrado activo con útero firme'],
              ['Tejido', 'Retención de restos de placenta dentro del útero', 'Placenta que no sale, sale incompleta o sangrado persistente tras el alumbramiento'],
              ['Trombina', 'Alteración de la coagulación', 'Sangrado que no se detiene, sangrado por otros puntos como venopunciones'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué el tono va primero', texto: 'Es la causa más frecuente y también la única sobre la que el ámbito prehospitalario puede actuar dentro de ciertos alcances. Comprobar si el útero está firme o blando es, por tanto, la primera exploración tras el nacimiento y se repite de forma sistemática.' },
        ],
      },
      {
        titulo: 'Qué hace el prestador',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Secuencia',
            items: [
              'RECONOCER: sangrado que continúa, útero blando o cambio en el estado de la paciente.',
              'PEDIR AYUDA de inmediato conforme al protocolo: este cuadro necesita más manos y más recursos.',
              'Palpar el útero y comprobar si está firme o blando.',
              'Masaje uterino si está dentro de la competencia del prestador y el protocolo lo autoriza, con la técnica que ese protocolo describa.',
              'Vaciar la vejiga solo si el protocolo lo contempla y hay competencia para hacerlo.',
              'Colocar al recién nacido en contacto con la madre si el estado de ambos lo permite y el protocolo lo indica.',
              'Prevenir la hipotermia: cubrir a la paciente, retirar la ropa mojada y calentar el habitáculo.',
              'Acceso vascular y aporte de líquidos conforme al alcance y al protocolo.',
              'Cuantificar y registrar lo que se observa: apósitos, tiempo, evolución.',
              'Traslado urgente con prealerta a centro con capacidad obstétrica.',
              'REEVALUAR de forma continua: útero, sangrado, perfusión y estado mental.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que depende del protocolo y no de esta lección', texto: 'El paquete farmacológico de la hemorragia posparto —qué medicamento, en qué dosis, por qué vía y en qué orden— es una decisión que exige guía vigente, Información para Prescribir del producto registrado, formulario del servicio, competencia acreditada y dirección médica. Esta lección no publica ninguno de esos datos. Tampoco describe maniobras de compresión interna ni dispositivos, que exigen formación específica.' },
          { tipo: 'p', texto: 'Sí conviene subrayar dos medidas que a veces se descuidan y que no son menores. La primera, la prevención de la hipotermia: una paciente que sangra y se enfría coagula peor. La segunda, el registro: anotar la hora del nacimiento, la hora en que se identificó el sangrado y cómo ha evolucionado permite al equipo receptor entender la velocidad del cuadro, que es el dato que más orienta.' },
        ],
      },
      F([WHO_HPP_2025, WHO_MATERNAL_2025, bibiano(117, 'Asistencia al parto extrahospitalario', 1042)]),
    ],
    conceptosClave: [
      { termino: 'Hemorragia posparto', definicion: 'Sangrado excesivo tras el nacimiento; principal causa de muerte materna evitable, que puede parecer manejable hasta que deja de serlo.' },
      { termino: 'Reconocimiento temprano', definicion: 'Activación de la conducta por el conjunto —sangrado que continúa, útero blando, cambio en el estado— sin esperar a un volumen visual determinado.' },
      { termino: 'Marco de las cuatro causas', definicion: 'Tono, trauma, tejido y trombina; orienta la búsqueda y la comunicación, no el diagnóstico prehospitalario.' },
      { termino: 'Atonía uterina', definicion: 'Falta de contracción del útero tras el nacimiento; es la causa más frecuente y la única sobre la que el ámbito prehospitalario puede actuar dentro de ciertos alcances.' },
      { termino: 'Hipotermia y coagulación', definicion: 'Relación por la que una paciente que sangra y se enfría coagula peor; la prevención térmica no es una medida menor.' },
      { termino: 'Velocidad del cuadro', definicion: 'Información derivada de registrar horas y evolución; es el dato que más orienta al equipo receptor.' },
    ],
    flashcards: [
      { frente: '¿Se espera a un volumen determinado para actuar?', reverso: 'No: en la calle esperar es lo que produce muertes evitables. Se actúa por el conjunto del cuadro.' },
      { frente: '¿Cuáles son las cuatro causas?', reverso: 'Tono, trauma, tejido y trombina.' },
      { frente: '¿Cuál es la causa más frecuente y por qué va primero?', reverso: 'El tono: es la más frecuente y la única sobre la que el ámbito prehospitalario puede actuar dentro de ciertos alcances.' },
      { frente: '¿Qué se palpa tras el nacimiento y con qué frecuencia?', reverso: 'El útero, para comprobar si está firme o blando, de forma sistemática y repetida.' },
      { frente: '¿Por qué importa prevenir la hipotermia?', reverso: 'Porque una paciente que sangra y se enfría coagula peor.' },
      { frente: '¿Qué dato orienta más al equipo receptor?', reverso: 'La velocidad del cuadro, que se deduce de las horas registradas y de la evolución del sangrado.' },
    ],
    quiz: [
      {
        pregunta: 'Tras un nacimiento, la paciente sangra de forma continua, está inquieta y taquicárdica, con presión todavía conservada. ¿Qué haces?',
        opciones: [
          'Esperar a que la presión descienda para confirmar la gravedad.',
          'Actuar ya: la inquietud y la taquicardia son signos precoces, y la presión desciende tarde en la paciente obstétrica.',
          'Medir el volumen de sangre antes de decidir.',
          'Trasladar sin prealerta.',
        ],
        correcta: 1,
        explicacion: 'Cuando la presión desciende, la pérdida ya es muy importante; por eso se actúa con los signos precoces.',
      },
      {
        pregunta: 'Palpas el útero y lo encuentras blando. ¿A qué categoría corresponde y qué implica?',
        opciones: [
          'A trauma; implica buscar desgarros.',
          'A tono; es la causa más frecuente y la única sobre la que el ámbito prehospitalario puede actuar dentro de ciertos alcances.',
          'A tejido; implica extraer restos.',
          'A trombina; implica administrar factores de coagulación.',
        ],
        correcta: 1,
        explicacion: 'Por eso la comprobación del tono uterino es la primera exploración tras el nacimiento y se repite de forma sistemática.',
      },
      {
        pregunta: 'La paciente sangra de forma activa pero el útero está firme. ¿Qué categoría sube en la sospecha?',
        opciones: [
          'Tono.',
          'Trauma: un sangrado activo con útero firme orienta hacia desgarros del canal del parto u otras lesiones.',
          'Tejido.',
          'Ninguna: si el útero está firme no hay hemorragia.',
        ],
        correcta: 1,
        explicacion: 'El marco de las cuatro causas orienta la búsqueda; el útero firme con sangrado activo apunta al trauma.',
      },
      {
        pregunta: 'Un compañero propone administrar el paquete farmacológico que recuerda de un curso. ¿Qué respondes?',
        opciones: [
          'Que adelante, es lo estándar.',
          'Que exige guía vigente, Información para Prescribir del producto, formulario del servicio, competencia acreditada y dirección médica; esta lección no publica esos datos.',
          'Que lo administre solo si el útero está blando.',
          'Que primero cuantifique el sangrado exacto.',
        ],
        correcta: 1,
        explicacion: 'El paquete farmacológico depende del protocolo obstétrico del servicio, que la academia todavía no ha entregado.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia de reconocimiento, ayuda, soporte y reevaluación',
        pasos: [
          'Reconocer: sangrado que continúa, útero blando o cambio en el estado de la paciente',
          'Pedir ayuda y recursos de inmediato conforme al protocolo',
          'Palpar el útero y comprobar si está firme o blando',
          'Masaje uterino si está dentro de la competencia y el protocolo lo autoriza',
          'Prevenir la hipotermia: cubrir, retirar ropa mojada y calentar el habitáculo',
          'Acceso vascular y líquidos conforme al alcance y al protocolo',
          'Cuantificar y registrar apósitos, horas y evolución',
          'Trasladar con prealerta a centro con capacidad obstétrica',
          'Reevaluar de forma continua útero, sangrado, perfusión y estado mental',
        ],
      },
    },
    revision: ficha({
      version: 'WHO Postpartum Haemorrhage 2025 y WHO Maternal Health 2025 (secciones pendientes); Bibiano 3.ª ed., cap. 117',
      fuentes: [
        'WHO. Recommendations on Postpartum Haemorrhage, 2025 (sección, umbrales y paquete farmacológico pendientes).',
        'WHO. Recommendations on Maternal Health, 2.ª ed., 2025 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 117, p. 1042.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan los umbrales de volumen y el paquete farmacológico de la '
          + 'guía OMS 2025.',
        'CONTROL: la lección declara expresamente que NO se espera un volumen visual determinado para '
          + 'actuar, porque esa espera es la que produce muertes evitables.',
        'El masaje uterino se menciona condicionado a competencia y protocolo, con la técnica remitida '
          + 'a ese protocolo; no se describe. No se describen maniobras de compresión interna ni '
          + 'dispositivos.',
        NO_MANIOBRAS,
        'PREGUNTA PARA LA ACADEMIA: ¿qué paquete farmacológico, con qué productos y presentaciones, '
          + 'autoriza su protocolo obstétrico, y está el masaje uterino dentro del alcance de sus '
          + 'alumnos?',
      ],
    }),
  },

  // ============================================================
  //  Preeclampsia y eclampsia
  // ============================================================
  'm4-gyn-eclampsia': {
    icono: '⚡',
    duracion: '20 min',
    resumen: 'Qué es la preeclampsia, qué síntomas anuncian que se está agravando y cómo se sostiene a una '
      + 'paciente durante una convulsión obstétrica.',
    objetivos: [
      'Definir preeclampsia y situarla en el tiempo del embarazo y el puerperio.',
      'Reconocer los síntomas que indican gravedad.',
      'Actuar durante y después de una convulsión eclámptica.',
      'Delimitar qué tratamiento depende del protocolo obstétrico del servicio.',
    ],
    secciones: [
      {
        titulo: 'Qué es la preeclampsia',
        bloques: [
          { tipo: 'p', texto: 'La preeclampsia es un trastorno propio del embarazo que aparece habitualmente después de la vigésima semana de gestación y que combina elevación de la presión arterial con signos de que otros órganos están sufriendo. No es simplemente «tensión alta en el embarazo»: es una enfermedad que afecta a múltiples sistemas.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'También ocurre en el puerperio', texto: 'Es un error frecuente pensar que el riesgo termina con el nacimiento. La preeclampsia puede aparecer o agravarse en los días siguientes al parto, de modo que una paciente que dio a luz recientemente y consulta por cefalea, alteración visual o convulsión entra en este cuadro aunque ya no esté embarazada. Preguntar si ha dado a luz en las últimas semanas forma parte de la valoración.' },
          { tipo: 'p', texto: 'Cuando a ese cuadro se le añade una convulsión, se llama eclampsia. La convulsión puede aparecer sin que los síntomas previos hayan sido llamativos, y puede ocurrir antes, durante o después del parto.' },
        ],
      },
      {
        titulo: 'Los síntomas que anuncian gravedad',
        bloques: [
          { tipo: 'p', texto: 'Como esta lección no publica cifras de presión, lo que se enseña es lo que sí puede reconocerse sin ellas: los síntomas que indican que los órganos están sufriendo. En una embarazada o puérpera, cualquiera de ellos es una señal de alarma.' },
          {
            tipo: 'tabla',
            titulo: 'Síntoma y qué órgano señala',
            headers: ['Síntoma', 'Qué sugiere'],
            filas: [
              ['Cefalea intensa o persistente que no cede', 'Afectación del sistema nervioso'],
              ['Alteración visual: visión borrosa, luces, visión doble, pérdida de visión', 'Afectación del sistema nervioso y de la retina'],
              ['Dolor en el epigastrio o en el hipocondrio derecho', 'Afectación hepática; es un síntoma que a menudo se confunde con un problema digestivo'],
              ['Náusea y vómito de aparición tardía en el embarazo', 'Puede acompañar a la afectación hepática'],
              ['Dificultad respiratoria', 'Congestión pulmonar'],
              ['Alteración del estado mental, confusión o agitación', 'Afectación neurológica avanzada'],
              ['Reducción marcada de la diuresis', 'Afectación renal'],
              ['Edema de aparición brusca en cara y manos', 'Acompaña al cuadro, aunque por sí solo no lo define'],
              ['Convulsión', 'Define la eclampsia'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El dolor en el hipocondrio derecho engaña', texto: 'Una embarazada con dolor en la parte alta del abdomen y náusea puede ser atendida como si tuviera un problema digestivo. En una gestante de más de veinte semanas, ese dolor obliga a considerar la preeclampsia con datos de gravedad. Es uno de los errores de atribución más citados de esta unidad.' },
        ],
      },
      {
        titulo: 'La convulsión eclámptica',
        bloques: [
          { tipo: 'p', texto: 'Una convulsión en una embarazada o puérpera se maneja con las mismas medidas de protección que cualquier otra crisis, con dos particularidades: la posición y la conciencia de que hay dos pacientes.' },
          {
            tipo: 'pasos',
            titulo: 'Durante la convulsión',
            items: [
              'Mirar la hora.',
              'Proteger la cabeza y retirar objetos peligrosos del entorno.',
              'No sujetar las extremidades ni introducir nada en la boca.',
              'Reducir estímulos: bajar la luz y el ruido en la medida de lo posible.',
              'Cuando cesen los movimientos, colocar a la paciente en decúbito lateral izquierdo, que protege la vía aérea y evita la compresión aortocava.',
              'Comprobar vía aérea, ventilación y circulación; la protección de la vía aérea es prioritaria por el mayor riesgo de broncoaspiración.',
              'Administrar oxígeno conforme al protocolo del servicio.',
              'Pedir ayuda y activar la ruta obstétrica.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Después',
            items: [
              'Registrar duración, características y hora de la convulsión.',
              'Mantener la posición lateral izquierda durante el traslado.',
              'Glucemia capilar si hay equipo y el protocolo lo autoriza: la hipoglucemia también convulsiona.',
              'Vigilar la aparición de nuevas convulsiones, que son frecuentes.',
              'Vigilar el sangrado, porque el desprendimiento de placenta puede acompañar al cuadro.',
              'Traslado urgente a centro con capacidad obstétrica, con prealerta.',
              'Reevaluación continua del estado de conciencia y de la perfusión.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Sostener a la madre es sostener al feto', texto: 'Durante y después de una convulsión eclámptica no hay ninguna intervención dirigida al feto que pueda hacerse en la ambulancia. Oxigenar bien a la madre, proteger su vía aérea, colocarla en decúbito lateral izquierdo y trasladar sin demora es, literalmente, la atención al feto.' },
        ],
      },
      {
        titulo: 'Lo que depende del protocolo obstétrico',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'callout', variante: 'alerta', titulo: 'Bloqueo declarado de esta lección', texto: 'El tratamiento de la eclampsia y de la preeclampsia con datos de gravedad incluye medicación específica —tanto para prevenir y tratar la convulsión como para controlar la presión— cuya administración exige guía vigente, Información para Prescribir del producto registrado, formulario del servicio, competencia acreditada y un protocolo obstétrico con dirección médica. Esta lección no publica ningún fármaco, dosis, vía ni objetivo de presión. Su ausencia no significa que el tratamiento no exista: significa que la decisión no se toma con una lección, y que la academia debe entregar ese protocolo.' },
          {
            tipo: 'lista',
            titulo: 'Lo que sí puede hacerse siempre',
            items: [
              'Reconocer el cuadro y sus síntomas de gravedad.',
              'Proteger a la paciente durante la convulsión.',
              'Colocarla en decúbito lateral izquierdo.',
              'Proteger la vía aérea y oxigenar conforme al protocolo.',
              'Reducir estímulos.',
              'Comprobar la glucemia.',
              'Vigilar el sangrado y las nuevas convulsiones.',
              'Trasladar a un centro con capacidad obstétrica con prealerta y registro completo.',
            ],
          },
          { tipo: 'p', texto: 'Conviene además una precisión sobre la presión arterial. Aunque la elevación forma parte de la definición, la conducta prehospitalaria no consiste en perseguir un descenso: un descenso brusco puede reducir el flujo a la placenta y comprometer al feto. Cualquier intervención sobre la presión en este cuadro exige el protocolo obstétrico correspondiente.' },
        ],
      },
      F([WHO_MATERNAL_2025, WHO_OBSTETRICIA, bibiano(119, 'Urgencias en la mujer embarazada', 1060)]),
    ],
    conceptosClave: [
      { termino: 'Preeclampsia', definicion: 'Trastorno propio del embarazo, habitualmente después de la vigésima semana, que combina elevación de la presión con signos de sufrimiento de otros órganos.' },
      { termino: 'Eclampsia', definicion: 'Aparición de convulsión en el contexto de preeclampsia; puede ocurrir antes, durante o después del parto.' },
      { termino: 'Riesgo en el puerperio', definicion: 'La preeclampsia puede aparecer o agravarse tras el parto, de modo que se pregunta si la paciente ha dado a luz en las últimas semanas.' },
      { termino: 'Dolor en hipocondrio derecho', definicion: 'Síntoma de afectación hepática que suele confundirse con un problema digestivo; en una gestante obliga a considerar preeclampsia grave.' },
      { termino: 'Decúbito lateral izquierdo', definicion: 'Posición tras la convulsión que protege la vía aérea y evita la compresión aortocava.' },
      { termino: 'Prudencia con la presión', definicion: 'Principio por el que no se persigue un descenso brusco, que puede reducir el flujo a la placenta y comprometer al feto.' },
    ],
    flashcards: [
      { frente: '¿Qué combina la preeclampsia?', reverso: 'Elevación de la presión arterial con signos de que otros órganos están sufriendo, habitualmente después de la semana veinte.' },
      { frente: '¿Termina el riesgo con el nacimiento?', reverso: 'No: puede aparecer o agravarse en el puerperio, por lo que se pregunta si dio a luz en las últimas semanas.' },
      { frente: '¿Qué sugiere el dolor en el hipocondrio derecho en una gestante?', reverso: 'Afectación hepática por preeclampsia grave; se confunde a menudo con un problema digestivo.' },
      { frente: '¿En qué posición se coloca tras una convulsión eclámptica?', reverso: 'En decúbito lateral izquierdo: protege la vía aérea y evita la compresión aortocava.' },
      { frente: '¿Por qué no se persigue bajar la presión de forma brusca?', reverso: 'Porque puede reducir el flujo a la placenta y comprometer al feto.' },
      { frente: '¿Cuál es la atención al feto durante una eclampsia?', reverso: 'Oxigenar a la madre, proteger su vía aérea, colocarla en lateral izquierdo y trasladar sin demora.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer que dio a luz hace cinco días acude por cefalea intensa y visión borrosa. ¿Qué consideras?',
        opciones: [
          'Que el riesgo terminó con el parto y se trata de una cefalea común.',
          'Que la preeclampsia puede aparecer o agravarse en el puerperio, y esos síntomas son de gravedad.',
          'Que se trata de una migraña por falta de sueño.',
          'Que debe descartarse primero una causa oftalmológica.',
        ],
        correcta: 1,
        explicacion: 'Preguntar si ha dado a luz en las últimas semanas forma parte de la valoración por este motivo.',
      },
      {
        pregunta: 'Gestante de 33 semanas con dolor en el hipocondrio derecho y náusea. Un compañero lo atribuye a un problema digestivo. ¿Qué respondes?',
        opciones: [
          'Que es lo más probable por la localización.',
          'Que en una gestante de más de veinte semanas ese dolor obliga a considerar preeclampsia con datos de gravedad, por afectación hepática.',
          'Que debe descartarse una colecistitis antes de nada.',
          'Que el dolor abdominal no forma parte del cuadro.',
        ],
        correcta: 1,
        explicacion: 'Es uno de los errores de atribución más citados de esta unidad.',
      },
      {
        pregunta: 'Cesan los movimientos de una convulsión en una gestante de 36 semanas. ¿En qué posición la colocas?',
        opciones: [
          'En decúbito supino para valorar mejor.',
          'En decúbito lateral izquierdo: protege la vía aérea y evita la compresión aortocava.',
          'Sentada completamente erguida.',
          'En decúbito lateral derecho.',
        ],
        correcta: 1,
        explicacion: 'Es la particularidad postural que distingue el manejo de una convulsión obstétrica.',
      },
      {
        pregunta: 'Un compañero propone administrar el fármaco que recuerda para la eclampsia. ¿Qué respondes?',
        opciones: [
          'Que adelante, es el tratamiento estándar.',
          'Que exige guía vigente, Información para Prescribir, formulario, competencia acreditada y protocolo obstétrico con dirección médica; esta lección no publica fármaco, dosis ni vía.',
          'Que lo administre solo si la convulsión se repite.',
          'Que primero mida la presión arterial.',
        ],
        correcta: 1,
        explicacion: 'Es el bloqueo declarado de la lección: su ausencia no significa que el tratamiento no exista, sino que la decisión no se toma con una lección.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el soporte durante y después de una convulsión obstétrica',
        pasos: [
          'Mirar la hora',
          'Proteger la cabeza y retirar objetos peligrosos',
          'No sujetar las extremidades ni introducir nada en la boca',
          'Reducir estímulos: bajar luz y ruido',
          'Al cesar los movimientos, colocar en decúbito lateral izquierdo',
          'Comprobar y proteger la vía aérea, y oxigenar según protocolo',
          'Pedir ayuda y activar la ruta obstétrica',
          'Comprobar la glucemia si hay equipo y el protocolo lo autoriza',
          'Vigilar nuevas convulsiones y la aparición de sangrado',
          'Trasladar con prealerta a centro con capacidad obstétrica',
        ],
      },
    },
    revision: ficha({
      version: 'WHO Maternal Health 2025 y WHO Managing Complications (secciones pendientes); Bibiano 3.ª ed., cap. 119',
      fuentes: [
        'WHO. Recommendations on Maternal Health, 2.ª ed., 2025 (sección de trastornos hipertensivos pendiente).',
        'WHO. Managing Complications in Pregnancy and Childbirth, 2.ª ed. (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 119, p. 1060.',
      ],
      extra: [
        'BORRADOR por deuda declarada y BLOQUEO FARMACOLÓGICO PARCIAL: no se publica ningún fármaco, '
          + 'dosis, vía ni objetivo de presión para la preeclampsia grave ni para la eclampsia. Se '
          + 'declara expresamente que el tratamiento existe y que depende del protocolo obstétrico.',
        'No se publica ninguna cifra de presión arterial, ni de corte ni de objetivo, y se explica por '
          + 'qué el descenso brusco puede comprometer al feto.',
        'Se declara expresamente que el riesgo continúa en el puerperio.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué protocolo obstétrico tiene su servicio para la preeclampsia '
          + 'con datos de gravedad y para la eclampsia, con qué productos, presentaciones, vías y '
          + 'competencia exigida?',
      ],
    }),
  },
}
