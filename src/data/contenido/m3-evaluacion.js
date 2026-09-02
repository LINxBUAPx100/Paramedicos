// El molde v2 vive en un módulo aparte desde que lo usa un segundo archivo
// (la unidad de vía aérea): duplicar los helpers habría garantizado que las
// secciones se pintaran distinto en cada unidad.
import {
  erroresFrecuentes, repasoRapido, preguntasOrales, mnemotecnia, masPreguntado,
} from './moldeV2.js'

// ============================================================
//  Módulo 3 · Evaluación primaria y secundaria
// ------------------------------------------------------------
//  Es la unidad de mayor impacto formativo del plan: todo lo demás se apoya en
//  saber mirar a un paciente en orden. Y era también una de las peor servidas
//  por el reparto automático — «Apertura de vía aérea y control de cervicales»
//  había acumulado material de 22 temas de origen, incluida la farmacología de
//  la secuencia rápida de intubación, que pertenece a otra unidad y a otro
//  nivel de alcance.
//
//  Se redacta entera desde cero. Cada tema responde a su propio objetivo y su
//  quiz se contesta con su propia página; lo que pertenece a un tema vecino se
//  nombra y se enlaza, no se duplica.
// ============================================================

const HOY = '2026-08-16'

const AHA_BLS = {
  nombre: 'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Comprobación de respuesta y respiración, y activación del sistema de emergencias.',
}
const PHTLS9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición declarada por el plan oficial. Secuencia XABCDE, estabilización manual cervical '
    + 'y evaluación secundaria; página PENDIENTE de precisar con el ejemplar de la academia.',
}
const SEMIOLOGIA = {
  nombre: 'Conde C. Semiología y fisiopatología, 2015.',
  nota: 'Técnica de inspección, palpación, percusión y auscultación; exploración neurológica básica.',
}
const NOM034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención prehospitalaria de las '
    + 'urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Marco del alcance del prestador y del equipamiento disponible según el tipo de ambulancia.',
}

// Observación que comparten todos los temas del lote.
const PENDIENTE_EDICION = 'Precisar capítulo y página de PHTLS cuando se revise con el ejemplar '
  + 'de la academia; confirmar además qué edición adopta oficialmente (el plan declara la 9.ª y la '
  + 'biblioteca contiene una traducción automática de la 10.ª que no es citable).'

const ficha = (extra = [], versionClinica = 'PHTLS 9.ª ed.; AHA 2025 para paro y respiración') => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica,
  observaciones: ['Redactado desde cero en la remediación de 2026.', ...extra, PENDIENTE_EDICION],
  fuentes: [
    'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
    'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  ],
})

export default {
  // ============================================================
  //  SSS — Seguridad, Escena, Situación
  // ============================================================
  'm3-ep-sss': {
    icono: 'cp-cc0-riesgo-biologico',
    duracion: '14 min',
    resumen: 'Lo que se hace ANTES de tocar al paciente: comprobar que la escena no va a producir una '
      + 'víctima más, entender qué pasó y calcular qué recursos harán falta.',
    objetivos: [
      'Evaluar la seguridad de la escena antes de acceder al paciente.',
      'Extraer del entorno la información que la escena aporta sobre el mecanismo.',
      'Estimar el número de pacientes y los recursos adicionales necesarios.',
    ],
    secciones: [
      {
        titulo: 'Las tres eses',
        bloques: [
          { tipo: 'p', texto: 'La valoración de la escena precede a toda evaluación del paciente y se organiza en tres preguntas encadenadas. No es un trámite: la mayoría de las lesiones que sufre el personal prehospitalario se producen por entrar antes de comprobar.' },
          {
            tipo: 'lista',
            titulo: 'Qué responde cada ese',
            items: [
              'Seguridad: ¿puedo acercarme sin convertirme en la siguiente víctima? Tránsito, electricidad, fuego, humo, materiales peligrosos, estructuras inestables, animales, agresores, multitud.',
              'Escena: ¿qué ocurrió aquí? Mecanismo de lesión, deformidad del vehículo, altura de una caída, envases, olores, temperatura ambiental, posición en que se encontró al paciente.',
              'Situación: ¿cuántos pacientes hay y qué necesito? Recursos adicionales, apoyo de otra unidad, autoridad, rescate, y decisión de activar triage si hay múltiples víctimas.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La escena se reevalúa, no se comprueba una vez', texto: 'Una escena segura puede dejar de serlo: un incendio se propaga, un familiar se altera, un vehículo se desplaza. La comprobación se repite durante toda la atención, y si la escena deja de ser segura, la conducta es retirarse y volver cuando lo sea.' },
        ],
      },
      {
        titulo: 'Protección personal',
        bloques: [
          { tipo: 'p', texto: 'El equipo de protección personal se selecciona por el riesgo previsible, no por costumbre. Guantes en toda atención; protección ocular ante salpicaduras, hemorragia, vía aérea o aspiración; mascarilla y bata cuando el cuadro o el procedimiento lo indiquen; casco, guantes de rescate y prenda reflejante en escenas de tránsito, rescate o vía pública.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Ponérselo después no sirve', texto: 'La protección se coloca antes de acceder, porque el momento de mayor exposición es precisamente el primer contacto. Interrumpir una atención para buscar guantes es haber llegado tarde.' },
          masPreguntado('Tres puntos concentran casi todas las preguntas de esta lección: que la comprobación de seguridad se REPITE durante toda la atención, que entrar antes de comprobar es la causa más frecuente de lesión del personal, y que la tercera ese —Situación— es la que cuenta pacientes y pide recursos.'),
        ],
      },
      {
        titulo: 'Lo que la escena cuenta y nadie más va a contar',
        bloques: [
          { tipo: 'p', texto: 'El prestador prehospitalario es la única persona del sistema de salud que ve la escena. La deformación del volante, la ausencia de marcas de frenado, la altura desde la que cayó el paciente, el frasco vacío junto a la cama o la temperatura de la habitación son datos que desaparecen en cuanto la ambulancia se marcha.' },
          { tipo: 'p', texto: 'Por eso lo observado se registra y se transmite en la entrega. Un mecanismo de alta energía puede justificar un traslado a un centro de mayor capacidad aunque el paciente parezca estable, y esa decisión solo puede tomarse si alguien anotó lo que vio.' },
        ],
      },
      erroresFrecuentes([
        ['«No entrar» no es «no hacer nada»', 'Comprobar la escena y pedir recursos no equivale a quedarse quieto mirando. Mientras la escena no sea accesible se solicita apoyo, se organiza el acceso y se prepara el material: la espera es activa.'],
        ['Elegir la protección por costumbre y no por riesgo', 'Ponerse siempre lo mismo falla en las dos direcciones: deja sin protección ocular una vía aérea con salpicaduras y hace perder tiempo con equipo innecesario en una consulta domiciliaria.'],
        ['No registrar lo que solo se ve una vez', 'La deformidad del vehículo, la altura de la caída o el frasco junto a la cama desaparecen cuando la ambulancia se marcha. Si no se anotan en la escena, no existen para el resto del sistema de salud.'],
      ]),
      repasoRapido([
        'La valoración de la escena precede a todo contacto con el paciente.',
        'Seguridad: ¿puedo acercarme sin ser la siguiente víctima?',
        'Escena: ¿qué ocurrió aquí? Es la pregunta del mecanismo de lesión.',
        'Situación: ¿cuántos pacientes hay y qué recursos necesito?',
        'La seguridad se reevalúa durante toda la atención, no una sola vez.',
        'Si la escena deja de ser segura, la conducta es retirarse.',
        'El equipo de protección se coloca ANTES de acceder: el primer contacto es la mayor exposición.',
        'Guantes siempre; ojos, mascarilla, bata, casco y reflejante según el riesgo previsible.',
        'El prestador es el único del sistema que ve la escena: lo observado se registra y se entrega.',
        'Un mecanismo de alta energía puede cambiar el destino del paciente aunque parezca estable.',
      ]),
      preguntasOrales([
        'Enumera las tres eses y di qué pregunta responde cada una.',
        '¿Por qué la seguridad no se comprueba una sola vez? Da un ejemplo.',
        'La escena deja de ser segura a mitad de la atención. ¿Qué haces?',
        '¿En qué momento exacto se coloca el equipo de protección y por qué?',
        'Menciona cuatro datos que solo puede aportar quien estuvo en la escena.',
        '¿Qué diferencia hay entre no acceder a una escena y no hacer nada?',
        '¿Qué desencadena la solicitud de apoyo o la clasificación por múltiples víctimas?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Valoración de la escena', definicion: 'Comprobación de seguridad, mecanismo y recursos que precede a todo contacto con el paciente y se repite durante la atención.' },
      { termino: 'Mecanismo de lesión', definicion: 'Forma en que la energía se transfirió al paciente; orienta qué lesiones buscar aunque no sean visibles.' },
      { termino: 'Equipo de protección personal', definicion: 'Conjunto de barreras seleccionadas según el riesgo previsible, colocadas antes de acceder al paciente.' },
      { termino: 'Múltiples víctimas', definicion: 'Situación en la que el número de pacientes supera los recursos inmediatos y obliga a solicitar apoyo y a clasificar.' },
    ],
    flashcards: [
      { frente: '¿Qué responde la primera «ese» de SSS?', reverso: 'Si puedo acercarme sin convertirme en la siguiente víctima.' },
      { frente: '¿Cuándo se comprueba la seguridad de la escena?', reverso: 'Antes de acceder y de forma repetida durante toda la atención: una escena segura puede dejar de serlo.' },
      { frente: '¿Cuándo se coloca el equipo de protección personal?', reverso: 'Antes de acceder al paciente, porque el primer contacto es el momento de mayor exposición.' },
      { frente: '¿Por qué se registra lo observado en la escena?', reverso: 'Porque el prestador es el único del sistema que la ve, y esos datos desaparecen cuando la ambulancia se marcha.' },
      { frente: 'La escena deja de ser segura durante la atención. ¿Qué se hace?', reverso: 'Retirarse y volver cuando vuelva a serlo.' },
    ],
    quiz: [
      {
        pregunta: 'Llegas a un choque con derrame de combustible y una persona atrapada que pide ayuda. ¿Cuál es tu primera acción?',
        opciones: [
          'Acceder de inmediato: hay una amenaza vital declarada.',
          'Comprobar la seguridad de la escena y solicitar los recursos que hagan falta antes de acceder.',
          'Tomar los signos vitales desde fuera del vehículo.',
          'Esperar a que llegue otra unidad sin hacer nada.',
        ],
        correcta: 1,
        explicacion: 'Entrar antes de comprobar es la causa más frecuente de lesión del personal. La valoración de la escena y la solicitud de recursos preceden al acceso; no equivalen a quedarse inactivo.',
      },
      {
        pregunta: 'Durante la atención, un familiar se torna agresivo y bloquea la salida. ¿Qué procede?',
        opciones: [
          'Continuar la atención: la escena ya se declaró segura al llegar.',
          'Retirarse y reanudar cuando la escena vuelva a ser segura.',
          'Acelerar los procedimientos para terminar antes.',
          'Delegar la seguridad en el familiar más tranquilo.',
        ],
        correcta: 1,
        explicacion: 'La seguridad no es una comprobación única. Si la escena deja de ser segura, la conducta es retirarse; un prestador lesionado deja de poder ayudar a nadie.',
      },
      {
        pregunta: 'Paciente que parece estable tras una caída de altura considerable. ¿Qué aporta la escena?',
        opciones: [
          'Nada relevante si los signos vitales son normales.',
          'El mecanismo de alta energía, que puede justificar traslado a un centro de mayor capacidad.',
          'Solo información de interés para la autoridad.',
          'La confirmación de que no hay lesión interna.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo orienta qué lesiones buscar y puede modificar el destino del paciente aunque su presentación inicial sea tranquilizadora.',
      },
      {
        pregunta: '¿Qué responde la tercera «ese» de la valoración de la escena?',
        opciones: [
          'Qué protección personal usar.',
          'Cuántos pacientes hay y qué recursos adicionales se necesitan.',
          'Qué lesiones tiene el paciente.',
          'Qué hospital está más cerca.',
        ],
        correcta: 1,
        explicacion: 'La situación cuantifica pacientes y recursos, y es la que decide si hay que solicitar apoyo o activar la clasificación por múltiples víctimas.',
      },
    ],
    actividades: null,
    revision: ficha(['Sustituye material heredado que mezclaba varios temas de origen.'], 'PHTLS 9.ª ed.; NOM-034-SSA3-2013'),
  },

  // ============================================================
  //  AVDI
  // ============================================================
  'm3-ep-avdi': {
    icono: 'cp-servier-cerebro',
    duracion: '12 min',
    resumen: 'La escala más rápida del arsenal prehospitalario: cuatro categorías que sitúan el estado de '
      + 'conciencia en segundos y sirven para detectar deterioro antes de que sea evidente.',
    objetivos: [
      'Clasificar el estado de conciencia con la escala AVDI.',
      'Distinguir la utilidad de AVDI de la de la escala de coma de Glasgow.',
      'Reconocer el deterioro comparando valoraciones sucesivas.',
    ],
    secciones: [
      {
        titulo: 'Las cuatro categorías',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'AVDI',
            headers: ['Letra', 'Categoría', 'Qué significa'],
            filas: [
              ['A', 'Alerta', 'Ojos abiertos espontáneamente e interacción con el entorno'],
              ['V', 'Verbal', 'Responde solo cuando se le habla o se le llama'],
              ['D', 'Dolor', 'Responde solo a un estímulo doloroso aplicado de forma controlada'],
              ['I', 'Inconsciente', 'No responde a ningún estímulo'],
            ],
          },
          { tipo: 'p', texto: 'Estar alerta no implica estar orientado. Un paciente puede tener los ojos abiertos e interactuar y a la vez no saber dónde está ni qué día es; por eso, además de la categoría, se explora la orientación en persona, lugar y tiempo y se registra por separado.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'El estímulo doloroso se aplica con criterio', texto: 'Se emplea una presión firme y controlada —por ejemplo, sobre el lecho ungueal o el borde del trapecio— y se retira en cuanto hay respuesta. No se pellizca la piel, no se aplica sobre zonas lesionadas y no se repite por costumbre: es una exploración, no un castigo.' },
          masPreguntado('Lo que más se pregunta de AVDI no son las cuatro letras, sino sus dos límites: que estar alerta no implica estar orientado, y que la escala describe el NIVEL de respuesta sin explicar nunca la causa.'),
        ],
      },
      {
        titulo: 'Para qué sirve y para qué no',
        bloques: [
          { tipo: 'p', texto: 'AVDI se aplica dentro de la evaluación primaria, donde lo que se necesita es una categoría inmediata y reproducible por cualquier miembro del equipo. Su valor está en la rapidez y en la comparación entre tomas: un paciente que pasa de A a V en diez minutos se está deteriorando, y esa tendencia es una indicación clara de reevaluar la vía aérea, la ventilación y la perfusión.' },
          { tipo: 'p', texto: 'La escala de coma de Glasgow aporta un detalle mayor —apertura ocular, respuesta verbal y respuesta motora por separado— y pertenece a la valoración neurológica del apartado D y a la evaluación del traumatismo craneoencefálico. Una escala no sustituye a la otra: AVDI clasifica en segundos, Glasgow cuantifica y permite seguir la evolución con más resolución.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Una categoría baja obliga a buscar la causa', texto: 'Un paciente que solo responde al dolor o que no responde tiene la vía aérea en riesgo y necesita que se busquen causas corregibles: hipoxia, hipoglucemia, hipoperfusión, intoxicación, traumatismo craneal o hipotermia. AVDI describe el nivel; no explica por qué.' },
        ],
      },
      erroresFrecuentes([
        ['Pedirle a la escala que explique la causa', 'AVDI dice en qué nivel está el paciente, no por qué. Una I no es un diagnóstico: obliga a buscar hipoxia, hipoglucemia, hipoperfusión, intoxicación, traumatismo craneal o hipotermia.'],
        ['Confundir alerta con orientado', 'Se puede estar alerta y no saber dónde se está. La categoría describe el nivel de respuesta; la orientación en persona, lugar y tiempo se explora y se registra aparte.'],
        ['Repetir el estímulo doloroso por costumbre', 'Es una exploración, no un castigo. Se aplica una presión firme y breve sobre zona no lesionada y se retira en cuanto hay respuesta; repetirla sin necesidad no aporta información.'],
        ['Registrar una sola toma', 'El valor de AVDI está en la comparación. Una letra suelta describe un instante; la tendencia entre dos tomas es la que avisa del deterioro.'],
      ]),
      repasoRapido([
        'A: ojos abiertos espontáneamente e interacción con el entorno.',
        'V: responde solo cuando se le habla o se le llama.',
        'D: responde solo a estímulo doloroso controlado.',
        'I: no responde a ningún estímulo.',
        'Alerta no es orientado; la orientación se registra por separado.',
        'El estímulo doloroso: presión firme y breve, zona no lesionada, se retira al obtener respuesta.',
        'Pasar de A a V es deterioro: reevaluar vía aérea, ventilación y perfusión.',
        'Un nivel bajo compromete la protección de la vía aérea.',
        'AVDI clasifica en segundos; Glasgow cuantifica por componentes y sigue la evolución con más resolución.',
        'AVDI describe el nivel; nunca explica la causa.',
      ]),
      preguntasOrales([
        'Di las cuatro letras de AVDI y qué significa cada una.',
        'Un paciente conversa pero cree estar en su casa. ¿Cómo lo clasificas y qué anotas?',
        '¿Dónde y cómo se aplica un estímulo doloroso? ¿Cuándo se retira?',
        '¿Por qué en la evaluación primaria se prefiere AVDI a Glasgow?',
        '¿Qué aporta Glasgow que AVDI no da?',
        'Un paciente pasa de A a V en diez minutos. ¿Qué significa y qué haces?',
        'Enumera las causas corregibles que hay que buscar ante una categoría baja.',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, AHA_BLS] }] },
    ],
    conceptosClave: [
      { termino: 'AVDI', definicion: 'Escala de cuatro categorías —Alerta, Verbal, Dolor, Inconsciente— para clasificar el estado de conciencia en la evaluación primaria.' },
      { termino: 'Alerta', definicion: 'Categoría en la que el paciente abre los ojos espontáneamente e interactúa; no implica que esté orientado.' },
      { termino: 'Orientación', definicion: 'Conocimiento de persona, lugar y tiempo; se explora y se registra aparte de la categoría AVDI.' },
      { termino: 'Estímulo doloroso controlado', definicion: 'Presión firme y breve en un punto no lesionado, retirada en cuanto aparece respuesta.' },
    ],
    flashcards: [
      { frente: '¿Qué significan las cuatro letras de AVDI?', reverso: 'Alerta, Verbal, Dolor, Inconsciente.' },
      { frente: '¿Alerta equivale a orientado?', reverso: 'No. Se puede estar alerta y desorientado; la orientación se explora y se registra por separado.' },
      { frente: '¿Dónde se aplica un estímulo doloroso y cómo?', reverso: 'Presión firme y breve en lecho ungueal o borde del trapecio, sobre zona no lesionada, retirándola al obtener respuesta.' },
      { frente: 'Un paciente pasa de A a V en diez minutos. ¿Qué significa?', reverso: 'Se está deteriorando: obliga a reevaluar vía aérea, ventilación y perfusión y a buscar la causa.' },
      { frente: '¿Qué aporta Glasgow que AVDI no da?', reverso: 'Detalle por componentes —ocular, verbal y motor— con mayor resolución para seguir la evolución.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente abre los ojos cuando lo llamas por su nombre y no antes. ¿Cómo lo clasificas?',
        opciones: ['Alerta', 'Verbal', 'Dolor', 'Inconsciente'],
        correcta: 1,
        explicacion: 'Responde solo al estímulo verbal; si abriera los ojos espontáneamente sería Alerta.',
      },
      {
        pregunta: 'Paciente con ojos abiertos que conversa pero cree estar en su casa y no en la calle. ¿Cómo se registra?',
        opciones: [
          'Verbal, porque está desorientado.',
          'Alerta, y se anota aparte la desorientación en lugar.',
          'Dolor, por la alteración cognitiva.',
          'No es clasificable con AVDI.',
        ],
        correcta: 1,
        explicacion: 'La categoría describe el nivel de respuesta, no el contenido de la conciencia; la desorientación se registra por separado.',
      },
      {
        pregunta: 'En la evaluación primaria, ¿por qué se prefiere AVDI a la escala de coma de Glasgow?',
        opciones: [
          'Porque es más precisa.',
          'Porque da una categoría inmediata y reproducible por cualquier miembro del equipo.',
          'Porque Glasgow no sirve en trauma.',
          'Porque AVDI explica la causa del deterioro.',
        ],
        correcta: 1,
        explicacion: 'En la evaluación primaria se busca rapidez y reproducibilidad; Glasgow aporta más detalle y se aplica en la valoración neurológica posterior.',
      },
      {
        pregunta: 'Paciente que solo responde al dolor. ¿Qué implica de inmediato?',
        opciones: [
          'Que puede esperar a la evaluación secundaria.',
          'Que su vía aérea está en riesgo y hay que buscar causas corregibles.',
          'Que el diagnóstico es traumatismo craneoencefálico.',
          'Que debe repetirse el estímulo cada minuto.',
        ],
        correcta: 1,
        explicacion: 'La escala describe el nivel, no la causa. Un nivel bajo compromete la protección de la vía aérea y obliga a descartar hipoxia, hipoglucemia, hipoperfusión, intoxicación o hipotermia.',
      },
    ],
    actividades: null,
    revision: ficha(),
  },

  // ============================================================
  //  Apertura de vía aérea y control de cervicales
  // ============================================================
  'm3-ep-via-aerea-cervicales': {
    icono: 'cp-servier-via-aerea-superior',
    duracion: '16 min',
    resumen: 'Cómo se abre una vía aérea con las manos y cómo se protege la columna cervical al hacerlo, '
      + 'sin recurrir a ningún dispositivo ni fármaco.',
    objetivos: [
      'Seleccionar la maniobra manual adecuada según haya o no sospecha de lesión cervical.',
      'Aplicar la estabilización manual de la columna cervical durante la apertura.',
      'Reconocer los signos de obstrucción y actuar sin recurrir al barrido digital a ciegas.',
    ],
    secciones: [
      {
        titulo: 'Qué se comprueba en la A',
        bloques: [
          { tipo: 'p', texto: 'En la evaluación primaria la letra A responde a una sola pregunta: ¿la vía aérea está permeable y se mantendrá permeable? Un paciente que habla con frase completa y voz normal tiene, en ese momento, la vía aérea permeable. En el que no habla se buscan estridor, ronquido, gorgoteo, movimiento torácico sin entrada de aire, cianosis y cuerpos extraños visibles.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La causa más frecuente es la propia lengua', texto: 'En el paciente con estado de conciencia deprimido, la relajación de la musculatura hace que la lengua caiga contra la pared posterior de la faringe. Es la obstrucción más frecuente y la que se resuelve con una maniobra manual, sin material alguno.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El barrido digital a ciegas no se hace', texto: 'Introducir el dedo en la boca para buscar un cuerpo extraño que no se ve puede empujarlo más adentro, impactarlo o provocar una lesión y sangrado que empeoren la obstrucción. Solo se retira lo que se ve y se puede alcanzar; lo demás se maneja con aspiración y con las maniobras que correspondan.' },
          masPreguntado('Dos decisiones concentran las preguntas: QUÉ maniobra corresponde según haya o no sospecha de lesión cervical, y qué hacer cuando la tracción mandibular no abre la vía aérea. La respuesta a la segunda es siempre la misma: prima la oxigenación.'),
        ],
      },
      {
        titulo: 'Las maniobras manuales',
        bloques: [
          { tipo: 'p', texto: 'Sin sospecha de lesión cervical se emplea la maniobra frente-mentón: una mano sobre la frente inclina la cabeza hacia atrás mientras los dedos de la otra elevan el mentón por su porción ósea, sin comprimir los tejidos blandos submandibulares.' },
          { tipo: 'p', texto: 'Cuando el mecanismo es compatible con lesión de columna cervical se prefiere la tracción mandibular: desde la cabecera del paciente, se desplazan hacia delante los ángulos de la mandíbula sin extender el cuello, mientras un segundo reanimador mantiene la cabeza en posición neutra alineada.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La oxigenación tiene prioridad', texto: 'Si la tracción mandibular no consigue abrir la vía aérea, no se insiste indefinidamente. Se emplea la técnica que logre permeabilidad con el menor movimiento posible: una vía aérea cerrada mata antes de lo que puede empeorar una lesión cervical por un movimiento mínimo y controlado.' },
        ],
      },
      {
        titulo: 'Control de la columna cervical',
        bloques: [
          { tipo: 'p', texto: 'La estabilización manual se aplica desde el primer contacto en todo paciente con mecanismo compatible: se sostiene la cabeza con ambas manos en posición neutra alineada, sin traccionar, y se mantiene hasta que el paciente quede inmovilizado o hasta que se descarte la indicación según el protocolo del servicio.' },
          {
            tipo: 'lista',
            titulo: 'Errores frecuentes',
            items: [
              'Sustituir la estabilización manual por el collarín: el collarín limita, no inmoviliza, y no releva las manos hasta completar el conjunto.',
              'Traccionar la cabeza en lugar de sostenerla.',
              'Forzar la posición neutra en un paciente que refiere dolor o resistencia al movimiento: se inmoviliza en la posición encontrada.',
              'Mantener una vía aérea comprometida por miedo a mover el cuello.',
            ],
          },
          { tipo: 'p', texto: 'Los criterios para indicar o retirar la restricción de movimiento espinal, el uso del collarín y la tabla rígida se estudian en el Módulo 5, dentro de trauma de cráneo y columna, y dependen del protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Lo que NO pertenece a esta página',
        bloques: [
          { tipo: 'p', texto: 'Este tema cubre la apertura manual. Las cánulas orofaríngeas y nasofaríngeas, la ventilación con bolsa-válvula-mascarilla, la intubación endotraqueal, los dispositivos supraglóticos y la intubación de secuencia rápida —con toda su farmacología— tienen sus propios temas dentro de la unidad de manejo de vía aérea de este mismo módulo.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué se dice esto expresamente', texto: 'El material heredado había depositado aquí sedantes, bloqueadores neuromusculares y fuentes de farmacología avanzada. No es que fueran datos falsos: es que no correspondían al objetivo de esta lección ni al alcance que se enseña en este punto del plan.' },
        ],
      },
      repasoRapido([
        'La A responde a una sola pregunta: ¿la vía aérea está permeable y se mantendrá permeable?',
        'Quien habla con frase completa y voz normal tiene, en ese momento, la vía aérea permeable.',
        'En quien no habla: estridor, ronquido, gorgoteo, tórax que se mueve sin entrada de aire, cianosis, cuerpo extraño visible.',
        'La obstrucción más frecuente es la lengua, y se resuelve con las manos.',
        'Sin sospecha cervical: frente-mentón, elevando el mentón por su porción ósea.',
        'Con sospecha cervical: tracción mandibular desde la cabecera, sin extender el cuello.',
        'Si la tracción mandibular no abre la vía aérea, prima la oxigenación.',
        'La estabilización manual se aplica desde el primer contacto y no la releva el collarín.',
        'Se inmoviliza en la posición encontrada si hay dolor o resistencia al movimiento.',
        'No se hace barrido digital a ciegas: solo se retira lo que se ve y se alcanza.',
        'Dispositivos, ventilación con bolsa-válvula-mascarilla e intubación son otros temas de este módulo.',
      ]),
      preguntasOrales([
        '¿Qué pregunta responde la A y con qué signos se contesta en un paciente que no habla?',
        '¿Por qué la lengua es la causa más frecuente de obstrucción y qué la resuelve?',
        'Describe la maniobra frente-mentón. ¿Dónde se apoyan los dedos y por qué ahí?',
        '¿Cuándo eliges tracción mandibular en vez de frente-mentón?',
        'La tracción mandibular no abre la vía aérea. ¿Qué haces y con qué argumento?',
        '¿Qué diferencia hay entre estabilización manual y collarín?',
        '¿Por qué no se hace barrido digital a ciegas?',
        'Un paciente refiere dolor al intentar la posición neutra. ¿Qué haces?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, AHA_BLS] }] },
    ],
    conceptosClave: [
      { termino: 'Maniobra frente-mentón', definicion: 'Apertura de la vía aérea inclinando la cabeza y elevando el mentón por su porción ósea; se emplea sin sospecha de lesión cervical.' },
      { termino: 'Tracción mandibular', definicion: 'Desplazamiento anterior de los ángulos mandibulares sin extender el cuello; maniobra de elección ante sospecha de lesión cervical.' },
      { termino: 'Estabilización manual', definicion: 'Sostén de la cabeza en posición neutra alineada, sin tracción, mantenido hasta completar la inmovilización o descartar su indicación.' },
      { termino: 'Posición neutra alineada', definicion: 'Alineación de cabeza, cuello y tronco sin flexión, extensión ni rotación.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la causa más frecuente de obstrucción en el paciente con conciencia deprimida?', reverso: 'La caída de la lengua contra la pared posterior de la faringe.' },
      { frente: '¿Qué maniobra se usa ante sospecha de lesión cervical?', reverso: 'La tracción mandibular, con estabilización manual de la cabeza en posición neutra.' },
      { frente: 'La tracción mandibular no abre la vía aérea. ¿Qué se hace?', reverso: 'Se usa la técnica que logre permeabilidad con el menor movimiento posible: la oxigenación tiene prioridad.' },
      { frente: '¿El collarín releva la estabilización manual?', reverso: 'No. El collarín limita el movimiento, no inmoviliza; las manos se mantienen hasta completar el conjunto.' },
      { frente: '¿Se retira un cuerpo extraño con barrido digital a ciegas?', reverso: 'No. Solo se retira lo que es visible y alcanzable.' },
      { frente: '¿Dónde se estudia la farmacología de la secuencia rápida de intubación?', reverso: 'En su propio tema, dentro de la unidad de manejo de vía aérea; no en la apertura manual.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente inconsciente tras colisión vehicular, con ronquido audible. ¿Qué maniobra eliges?',
        opciones: [
          'Frente-mentón, por ser la más eficaz.',
          'Tracción mandibular con estabilización manual de la cabeza en posición neutra.',
          'Barrido digital para retirar la lengua.',
          'Ninguna: esperar al collarín antes de tocar la vía aérea.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo es compatible con lesión cervical, de modo que la apertura se hace sin extender el cuello. Esperar al collarín deja al paciente con la vía aérea obstruida.',
      },
      {
        pregunta: 'La tracción mandibular no consigue permeabilizar la vía aérea. ¿Cuál es la conducta correcta?',
        opciones: [
          'Insistir con la misma maniobra hasta lograrlo.',
          'Emplear la técnica que consiga permeabilidad con el menor movimiento posible.',
          'Suspender el manejo de la vía aérea hasta inmovilizar la columna.',
          'Administrar un sedante para relajar la musculatura.',
        ],
        correcta: 1,
        explicacion: 'La oxigenación tiene prioridad sobre el movimiento mínimo del cuello. La sedación no pertenece a la apertura manual ni al alcance de esta lección.',
      },
      {
        pregunta: 'Al elevar el mentón en la maniobra frente-mentón, ¿dónde se apoyan los dedos?',
        opciones: [
          'Sobre los tejidos blandos submandibulares.',
          'Sobre la porción ósea del mentón.',
          'Sobre el cartílago tiroides.',
          'Sobre los ángulos de la mandíbula.',
        ],
        correcta: 1,
        explicacion: 'La presión sobre los tejidos blandos submandibulares puede empujar la lengua hacia atrás y agravar la obstrucción.',
      },
      {
        pregunta: 'Un paciente traumatizado refiere dolor al intentar alinear la cabeza. ¿Qué haces?',
        opciones: [
          'Forzar la posición neutra: es la única correcta.',
          'Inmovilizar en la posición encontrada.',
          'Retirar la estabilización manual.',
          'Colocar el collarín para vencer la resistencia.',
        ],
        correcta: 1,
        explicacion: 'La resistencia o el dolor al movimiento contraindican forzar la alineación; se inmoviliza en la posición en que se encontró al paciente.',
      },
      {
        pregunta: 'Ves un fragmento de alimento en la orofaringe de un paciente inconsciente. ¿Qué haces?',
        opciones: [
          'Barrido digital sistemático para asegurarte de que no queda nada.',
          'Retirarlo, porque es visible y alcanzable.',
          'Dejarlo y ventilar con más presión.',
          'Girar al paciente y golpearle la espalda.',
        ],
        correcta: 1,
        explicacion: 'Se retira únicamente lo visible y alcanzable; el barrido a ciegas puede impactar el objeto más adentro y lesionar la vía aérea.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la apertura de vía aérea en un paciente con mecanismo de trauma',
        pasos: [
          'Comprobar que la escena es segura',
          'Aplicar estabilización manual de la cabeza en posición neutra',
          'Buscar signos de obstrucción y cuerpos extraños visibles',
          'Realizar tracción mandibular sin extender el cuello',
          'Reevaluar la permeabilidad y la entrada de aire',
        ],
      },
    },
    revision: ficha([
      'Sustituye por completo el material heredado, que mezclaba piezas de 22 temas de origen, '
        + 'incluida la farmacología de la secuencia rápida de intubación (movida a su tema oficial).',
      'Los criterios de restricción de movimiento espinal se remiten al Módulo 5 y al protocolo del '
        + 'servicio; no se fijan aquí.',
    ]),
  },

  // ============================================================
  //  Evaluación de la respiración
  // ============================================================
  'm3-ep-respiracion': {
    icono: 'cp-servier-pulmon',
    duracion: '14 min',
    resumen: 'La B de la evaluación primaria: comprobar que además de una vía aérea abierta hay ventilación '
      + 'eficaz, y reconocer cuándo hay que asistirla.',
    objetivos: [
      'Valorar frecuencia, profundidad, simetría y trabajo respiratorio.',
      'Identificar los signos de ventilación ineficaz que obligan a asistir.',
      'Diferenciar la respiración agónica de una respiración presente.',
    ],
    secciones: [
      {
        titulo: 'Vía aérea abierta no es ventilación eficaz',
        bloques: [
          { tipo: 'p', texto: 'Una vía aérea permeable garantiza que el aire puede pasar; no garantiza que esté pasando en volumen suficiente. La B comprueba el intercambio: que el tórax se mueva, que entre aire de forma simétrica y que el esfuerzo que hace el paciente sea sostenible.' },
          {
            tipo: 'lista',
            titulo: 'Qué se valora, en este orden',
            items: [
              'Que respire: se mira, se escucha y se siente durante no más de diez segundos.',
              'Frecuencia y profundidad.',
              'Simetría de la expansión torácica.',
              'Entrada de aire por auscultación en ambos hemitórax.',
              'Trabajo respiratorio: tiraje, uso de músculos accesorios, aleteo nasal, posición de trípode.',
              'Coloración de piel y mucosas, y saturación cuando se dispone de pulsioxímetro.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La respiración agónica no es respiración', texto: 'El jadeo aislado, boqueante e irregular que aparece en los primeros minutos del paro cardiaco se confunde con frecuencia con respiración presente. Un paciente que no responde y solo boquea está en paro: se inician compresiones. Dudar equivale a decidir que no.' },
          mnemotecnia('MIRAR, ESCUCHAR Y SENTIR, y no más de diez segundos. Mirar si el tórax se mueve, escuchar si entra aire, sentirlo en la mejilla. Los tres a la vez y con el reloj corriendo: pasar de diez segundos no aclara la duda, solo retrasa las compresiones.'),
          masPreguntado('La pregunta que más se repite no es cómo se cuenta la frecuencia, sino distinguir la respiración agónica de una respiración presente. La regla que se pide de memoria: si no responde y solo boquea, está en paro y se inician compresiones.'),
        ],
      },
      {
        titulo: 'Cuándo hay que asistir la ventilación',
        bloques: [
          { tipo: 'p', texto: 'La ventilación se asiste cuando el paciente no consigue mover suficiente volumen por sí mismo. Los indicadores no son una cifra aislada sino un conjunto: frecuencia muy baja o muy alta con volumen escaso, cianosis, alteración del estado mental, agotamiento tras un periodo de esfuerzo respiratorio intenso o ausencia de esfuerzo.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'El paciente que se «calma» de repente', texto: 'Un paciente con dificultad respiratoria intensa que de pronto parece tranquilizarse y deja de esforzarse rara vez ha mejorado: con frecuencia se está agotando. Es uno de los signos de deterioro más traicioneros y obliga a reevaluar de inmediato.' },
          { tipo: 'p', texto: 'La técnica de ventilación asistida, los dispositivos de oxigenoterapia y sus flujos se estudian en la unidad de manejo de vía aérea de este módulo. Los objetivos de saturación y las indicaciones de oxígeno suplementario dependen del protocolo del servicio y del cuadro clínico: no existe una cifra única aplicable a todos los pacientes.' },
        ],
      },
      {
        titulo: 'Hallazgos que cambian la conducta de inmediato',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Buscar durante la B',
            items: [
              'Ausencia unilateral de ruidos respiratorios.',
              'Heridas soplantes en la pared torácica.',
              'Movimiento paradójico de un segmento de la pared.',
              'Enfisema subcutáneo.',
              'Ingurgitación yugular acompañada de dificultad respiratoria.',
            ],
          },
          { tipo: 'p', texto: 'Cada uno de estos hallazgos tiene su propio tema en el Módulo 5, dentro de trauma de tórax. Aquí interesa reconocerlos durante la evaluación primaria, porque son las alteraciones de la B que exigen intervención antes de continuar con la C.' },
        ],
      },
      erroresFrecuentes([
        ['Contar el jadeo como respiración', 'Es el error con más consecuencias de la lección: el boqueo irregular de los primeros minutos del paro se registra como respiración presente y se retrasan las compresiones. Ante la duda en un paciente que no responde, se trata como paro.'],
        ['Leer la calma súbita como mejoría', 'El paciente que se esforzaba mucho y de pronto deja de esforzarse rara vez ha mejorado: suele estar agotándose. Obliga a reevaluar de inmediato, no a relajarse.'],
        ['Quedarse con la frecuencia', 'Una frecuencia dentro de rango con volumen mínimo no es ventilación eficaz. Frecuencia, profundidad, simetría y trabajo respiratorio se valoran juntos.'],
        ['Buscar una cifra única de saturación', 'Los objetivos de saturación y las indicaciones de oxígeno dependen del cuadro y del protocolo del servicio. No hay un número que valga para todos los pacientes.'],
      ]),
      repasoRapido([
        'Vía aérea abierta no garantiza ventilación eficaz: la A permite el paso, la B comprueba el intercambio.',
        'Se mira, se escucha y se siente durante no más de diez segundos.',
        'Se valora frecuencia, profundidad, simetría, entrada de aire y trabajo respiratorio.',
        'Trabajo respiratorio: tiraje, músculos accesorios, aleteo nasal, posición de trípode.',
        'La respiración agónica no es respiración: si no responde y boquea, está en paro.',
        'Se asiste la ventilación cuando el paciente no mueve volumen suficiente por sí mismo.',
        'Los indicadores van en conjunto: frecuencia extrema con volumen escaso, cianosis, alteración mental, agotamiento o ausencia de esfuerzo.',
        'El paciente que se calma de repente puede estarse agotando.',
        'Hallazgos que exigen intervenir antes de pasar a la C: ausencia unilateral de ruidos, herida soplante, movimiento paradójico, enfisema subcutáneo, ingurgitación yugular con dificultad respiratoria.',
        'No hay un objetivo de saturación único: depende del cuadro y del protocolo.',
      ]),
      preguntasOrales([
        '¿Por qué una vía aérea abierta no basta? ¿Qué comprueba la B que no comprueba la A?',
        'Enumera, en orden, lo que se valora en la B.',
        'Describe la respiración agónica y di qué se hace ante ella.',
        '¿Qué signos indican que hay que asistir la ventilación?',
        'Un paciente con dificultad intensa se tranquiliza de golpe. ¿Qué sospechas?',
        'Nombra los cinco hallazgos de la B que obligan a intervenir antes de seguir.',
        '¿Qué es el trabajo respiratorio y en qué signos se observa?',
        '¿Por qué no se puede dar una cifra única de saturación objetivo?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, AHA_BLS, SEMIOLOGIA] }] },
    ],
    conceptosClave: [
      { termino: 'Ventilación eficaz', definicion: 'Movimiento de aire suficiente y simétrico, con un trabajo respiratorio que el paciente puede sostener.' },
      { termino: 'Respiración agónica', definicion: 'Jadeo irregular y boqueante de los primeros minutos del paro cardiaco; no es respiración y no debe retrasar las compresiones.' },
      { termino: 'Trabajo respiratorio', definicion: 'Esfuerzo que el paciente invierte en respirar: tiraje, músculos accesorios, aleteo nasal, posición de trípode.' },
      { termino: 'Movimiento paradójico', definicion: 'Segmento de la pared torácica que se desplaza en sentido contrario al resto durante el ciclo respiratorio.' },
    ],
    flashcards: [
      { frente: '¿Cuánto tiempo se dedica a comprobar si el paciente respira?', reverso: 'No más de diez segundos: se mira, se escucha y se siente.' },
      { frente: 'Paciente que no responde y solo boquea. ¿Respira?', reverso: 'No. Es respiración agónica: está en paro y se inician compresiones.' },
      { frente: '¿Qué significa que un paciente disneico se «calme» de repente?', reverso: 'Habitualmente que se está agotando, no que haya mejorado; obliga a reevaluar de inmediato.' },
      { frente: 'Nombra tres signos de trabajo respiratorio aumentado.', reverso: 'Tiraje, uso de músculos accesorios y aleteo nasal (también la posición de trípode).' },
      { frente: '¿Existe un objetivo único de saturación para todos los pacientes?', reverso: 'No: depende del cuadro clínico y del protocolo del servicio.' },
    ],
    quiz: [
      {
        pregunta: 'Adulto que no responde y presenta boqueos irregulares aislados. ¿Qué haces?',
        opciones: [
          'Registrarlo como respiración presente y continuar la evaluación.',
          'Considerarlo en paro e iniciar compresiones.',
          'Esperar treinta segundos más para confirmar.',
          'Colocar oxígeno a alto flujo y reevaluar en dos minutos.',
        ],
        correcta: 1,
        explicacion: 'La respiración agónica no es ventilación. Ante la duda se actúa como paro: retrasar las compresiones cuesta más que iniciarlas sin necesidad.',
      },
      {
        pregunta: 'Paciente con 26 respiraciones por minuto, tiraje intenso y saturación baja que de pronto reduce su esfuerzo y se ve tranquilo. ¿Cómo lo interpretas?',
        opciones: [
          'Ha mejorado y puede continuarse la evaluación.',
          'Probablemente se está agotando: hay que reevaluar de inmediato.',
          'El pulsioxímetro estaba mal colocado.',
          'Es el efecto esperado del oxígeno suplementario.',
        ],
        correcta: 1,
        explicacion: 'La disminución brusca del esfuerzo tras un periodo de trabajo respiratorio intenso suele indicar agotamiento, no mejoría.',
      },
      {
        pregunta: 'Durante la B encuentras ausencia unilateral de ruidos respiratorios. ¿Qué implica?',
        opciones: [
          'Es un hallazgo de la evaluación secundaria.',
          'Es una alteración de la B que exige intervención antes de continuar con la C.',
          'Confirma neumotórax a tensión.',
          'Se resuelve aumentando el flujo de oxígeno.',
        ],
        correcta: 1,
        explicacion: 'La evaluación primaria se detiene a resolver lo que encuentra. El hallazgo orienta, pero no confirma por sí solo ningún cuadro concreto.',
      },
      {
        pregunta: '¿Qué diferencia hay entre comprobar la A y comprobar la B?',
        opciones: [
          'Ninguna: son dos nombres del mismo paso.',
          'La A comprueba que el aire pueda pasar; la B, que esté pasando en volumen suficiente.',
          'La A se hace en trauma y la B en patología médica.',
          'La B solo se hace si la A está alterada.',
        ],
        correcta: 1,
        explicacion: 'Una vía aérea permeable no garantiza ventilación eficaz: el paciente puede tener la vía abierta y no mover volumen suficiente.',
      },
    ],
    actividades: null,
    revision: ficha(),
  },

  // ============================================================
  //  Evaluación de la circulación
  // ============================================================
  'm3-ep-circulacion': {
    icono: 'cp-servier-capilares',
    duracion: '15 min',
    resumen: 'La C de la evaluación primaria: encontrar la hemorragia y reconocer la hipoperfusión antes de '
      + 'que la presión arterial se entere.',
    objetivos: [
      'Buscar de forma sistemática las hemorragias externas significativas.',
      'Valorar la perfusión con pulso, piel, estado mental y llenado capilar.',
      'Justificar por qué una presión arterial normal no descarta shock.',
    ],
    secciones: [
      {
        titulo: 'Primero, la hemorragia',
        bloques: [
          { tipo: 'p', texto: 'La hemorragia exanguinante se atiende antes que cualquier otra cosa; por eso la secuencia de trauma antepone la X a la A. Dentro de la C se busca de forma sistemática el resto del sangrado: se recorren cuello, axilas, tórax, abdomen, pelvis, periné, muslos y espalda, y se comprueba la ropa oscura y las superficies bajo el paciente, donde la sangre se acumula sin verse.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La sangre que no se ve', texto: 'El tórax, el abdomen, el retroperitoneo, la pelvis y los huesos largos pueden alojar volúmenes importantes sin sangrado externo. Una hemorragia interna no se controla en la calle: se reconoce, se prioriza el traslado y se avisa al centro receptor.' },
        ],
      },
      {
        titulo: 'Valorar la perfusión',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Los cuatro datos que se obtienen en segundos',
            items: [
              'Pulso: presencia, localización, frecuencia, ritmo y amplitud. La ausencia de pulso radial con pulso central presente sugiere hipoperfusión.',
              'Piel: color, temperatura y humedad. La piel pálida, fría y húmeda es un signo precoz de hipoperfusión.',
              'Estado mental: la ansiedad, la agitación o la confusión pueden ser la primera manifestación de perfusión cerebral insuficiente.',
              'Llenado capilar: dato complementario, más fiable en el niño; el frío ambiental lo altera.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La presión arterial llega tarde', texto: 'Una presión arterial normal no descarta el shock. Los mecanismos compensadores —taquicardia y vasoconstricción— mantienen la cifra durante un tiempo a costa de la perfusión de los tejidos. Cuando la presión cae, la compensación ya falló. Reconocer el shock compensado es el objetivo de esta valoración.' },
          mnemotecnia('PIEL, PULSO Y CABEZA. La piel dice cómo está la perfusión periférica; el pulso, si el corazón está compensando; y el estado mental, si al cerebro le está llegando sangre. Los tres se obtienen sin aparato y en segundos, y los tres se alteran antes que la presión arterial.'),
          masPreguntado('El punto que más se pregunta de toda la C es el mismo que más se falla en la calle: una presión arterial normal NO descarta el shock. Reconocer el shock compensado —taquicardia, piel pálida y fría, ansiedad, con presión todavía normal— es el objetivo de esta valoración.'),
        ],
      },
      {
        titulo: 'Intervenir y reevaluar',
        bloques: [
          { tipo: 'p', texto: 'El control de hemorragias externas comienza por presión directa firme y sostenida sobre el punto de sangrado. Cuando resulta insuficiente en una extremidad y el servicio lo autoriza, se recurre al torniquete; su indicación, colocación y registro se estudian en su propio tema, dentro del Módulo 5.' },
          { tipo: 'p', texto: 'Toda intervención obliga a reevaluar: comprobar si el sangrado cedió, si la perfusión mejoró y si aparecieron signos nuevos. Y obliga también a buscar la causa, porque una hipoperfusión que no responde suele tener un origen que no se ha encontrado todavía.' },
          { tipo: 'p', texto: 'El acceso vascular, la elección de soluciones y los volúmenes de reposición pertenecen a la unidad de vía intravenosa de este módulo y al protocolo del servicio; no se fijan aquí porque dependen del cuadro, de la edad y del alcance autorizado.' },
        ],
      },
      erroresFrecuentes([
        ['Descartar el shock porque la presión es normal', 'La taquicardia y la vasoconstricción sostienen la cifra mientras los tejidos ya no se perfunden. Cuando la presión cae, la compensación ya falló: esperar a ese momento es llegar tarde.'],
        ['Buscar la hemorragia solo donde se ve', 'La ropa oscura, la espalda y la superficie sobre la que está tumbado el paciente acumulan sangre sin que se aprecie. Y el tórax, el abdomen, el retroperitoneo, la pelvis y los huesos largos alojan volúmenes importantes sin sangrado externo.'],
        ['Intervenir y no volver a mirar', 'Toda intervención obliga a reevaluar: si el sangrado cedió, si la perfusión mejoró y si apareció algo nuevo. Una hipoperfusión que no responde suele tener una causa que aún no se ha encontrado.'],
        ['Apoyarse en el llenado capilar del adulto', 'Es un dato complementario y más fiable en el niño; el frío ambiental lo altera. No sustituye al pulso, a la piel ni al estado mental.'],
      ]),
      repasoRapido([
        'La hemorragia exanguinante va antes que la A: por eso la secuencia de trauma antepone la X.',
        'Se recorren cuello, axilas, tórax, abdomen, pelvis, periné, muslos y espalda.',
        'Se comprueban la ropa oscura y la superficie bajo el paciente.',
        'Tórax, abdomen, retroperitoneo, pelvis y huesos largos pueden sangrar sin que se vea.',
        'La hemorragia interna no se controla en la calle: se reconoce, se prioriza el traslado y se prealerta.',
        'Perfusión en segundos: pulso, piel, estado mental y llenado capilar.',
        'Ausencia de pulso radial con pulso central presente sugiere hipoperfusión.',
        'Piel pálida, fría y húmeda es un signo precoz.',
        'La ansiedad o la confusión pueden ser la primera manifestación de mala perfusión cerebral.',
        'Una presión arterial normal no descarta el shock.',
        'El control de hemorragia externa empieza por presión directa firme y sostenida.',
        'Toda intervención se reevalúa, y una hipoperfusión que no cede obliga a buscar la causa.',
      ]),
      preguntasOrales([
        '¿Por qué la X va antes que la A en la secuencia de trauma?',
        'Enumera las regiones que se recorren buscando hemorragia y por qué se mira bajo el paciente.',
        '¿Qué cavidades pueden alojar una hemorragia importante sin sangrado externo?',
        'Di los cuatro datos de perfusión que se obtienen en segundos y qué informa cada uno.',
        '¿Qué significa que haya pulso central pero no radial?',
        'Explica por qué una presión arterial normal no descarta el shock.',
        '¿Qué es el shock compensado y con qué signos se reconoce?',
        '¿Qué se hace después de cada intervención sobre la circulación?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, SEMIOLOGIA] }] },
    ],
    conceptosClave: [
      { termino: 'Hemorragia exanguinante', definicion: 'Sangrado capaz de causar la muerte en minutos; se controla antes que cualquier otro paso de la evaluación.' },
      { termino: 'Shock compensado', definicion: 'Hipoperfusión con presión arterial todavía mantenida por taquicardia y vasoconstricción; es la fase que hay que reconocer.' },
      { termino: 'Piel pálida, fría y húmeda', definicion: 'Signo precoz de vasoconstricción compensadora ante hipoperfusión.' },
      { termino: 'Hemorragia oculta', definicion: 'Sangrado en tórax, abdomen, retroperitoneo, pelvis o huesos largos, sin manifestación externa.' },
    ],
    flashcards: [
      { frente: '¿Por qué la X va antes que la A en trauma?', reverso: 'Porque una hemorragia exanguinante mata en minutos, antes que una vía aérea comprometida.' },
      { frente: '¿Qué sugiere la ausencia de pulso radial con pulso central presente?', reverso: 'Hipoperfusión.' },
      { frente: '¿Una presión arterial normal descarta el shock?', reverso: 'No. La compensación mantiene la cifra mientras la perfusión ya es insuficiente.' },
      { frente: 'Nombra cinco lugares donde la sangre se pierde sin verse.', reverso: 'Tórax, abdomen, retroperitoneo, pelvis y huesos largos.' },
      { frente: '¿Cuál es la primera medida ante una hemorragia externa?', reverso: 'Presión directa firme y sostenida sobre el punto de sangrado.' },
    ],
    quiz: [
      {
        pregunta: 'Traumatizado con TA 118/76, FC 124, piel pálida y fría y ligera agitación. ¿Qué concluyes?',
        opciones: [
          'Está estable porque la presión es normal.',
          'Presenta shock compensado y requiere intervención y traslado sin demora.',
          'La agitación descarta un origen circulatorio.',
          'Debe repetirse la presión antes de tomar cualquier decisión.',
        ],
        correcta: 1,
        explicacion: 'Taquicardia, piel pálida y fría y alteración del estado mental son signos de hipoperfusión que preceden a la caída de la presión.',
      },
      {
        pregunta: 'Durante la C, ¿dónde buscas sangrado además de las heridas visibles?',
        opciones: [
          'Solo en las extremidades, que es donde se controla.',
          'En cuello, axilas, pelvis, periné, espalda y bajo el paciente.',
          'En ningún sitio más: lo demás corresponde a la evaluación secundaria.',
          'Únicamente en el abdomen.',
        ],
        correcta: 1,
        explicacion: 'La sangre se acumula en pliegues, bajo la ropa oscura y bajo el propio paciente; la búsqueda tiene que ser sistemática.',
      },
      {
        pregunta: '¿Qué valor tiene el llenado capilar en el adulto?',
        opciones: [
          'Es el dato más fiable de perfusión.',
          'Es un dato complementario, alterado por el frío ambiental.',
          'No debe explorarse en el adulto.',
          'Sustituye a la toma de pulso.',
        ],
        correcta: 1,
        explicacion: 'Es útil, sobre todo en pediatría, pero por sí solo y con frío ambiental resulta poco fiable en el adulto.',
      },
      {
        pregunta: 'Sospechas hemorragia intraabdominal en un paciente hipotenso. ¿Cuál es la conducta prehospitalaria?',
        opciones: [
          'Controlarla mediante compresión abdominal firme.',
          'Reconocerla, priorizar el traslado y prealertar al centro receptor.',
          'Esperar a que aparezca defensa abdominal para decidir.',
          'Descartarla si el abdomen está blando.',
        ],
        correcta: 1,
        explicacion: 'Una hemorragia interna no se controla en la calle; lo que cambia el pronóstico es reconocerla pronto y acortar el tiempo hasta el tratamiento definitivo.',
      },
    ],
    actividades: null,
    revision: ficha(['Tema que estaba VACÍO en el inventario; es uno de los vacíos de mayor impacto formativo señalados por la auditoría.']),
  },

  // ============================================================
  //  Evaluación neurológica
  // ============================================================
  'm3-ep-neurologica': {
    icono: 'cp-servier-cerebro',
    duracion: '14 min',
    resumen: 'La D de la evaluación primaria: un examen breve que detecta el déficit neurológico y, sobre '
      + 'todo, su cambio en el tiempo.',
    objetivos: [
      'Explorar nivel de conciencia, pupilas y función motora y sensitiva gruesa.',
      'Aplicar la escala de coma de Glasgow por sus tres componentes.',
      'Descartar causas no neurológicas de alteración del estado mental.',
    ],
    secciones: [
      {
        titulo: 'Qué se explora en la D',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'El examen breve',
            items: [
              'Nivel de conciencia: AVDI en la evaluación primaria y escala de coma de Glasgow cuando el cuadro lo requiere.',
              'Pupilas: tamaño, simetría y reactividad a la luz.',
              'Función motora gruesa: movimiento de las cuatro extremidades y simetría de la fuerza.',
              'Sensibilidad gruesa: si percibe el tacto en las cuatro extremidades.',
              'Lenguaje: si articula, si comprende y si responde de forma coherente.',
            ],
          },
          { tipo: 'p', texto: 'La escala de coma de Glasgow puntúa por separado apertura ocular, respuesta verbal y respuesta motora. Se registran siempre los tres componentes además del total: un total de 10 puede corresponder a situaciones clínicas muy distintas, y el componente motor es el que mejor refleja la gravedad.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que importa es el cambio', texto: 'Una exploración neurológica aislada describe un momento. El deterioro entre dos exploraciones —descenso del nivel de conciencia, aparición de asimetría pupilar, pérdida de fuerza— es lo que indica lesión en evolución y modifica la conducta y el destino del paciente.' },
          masPreguntado('Dos exigencias se repiten en todas las preguntas de la D: registrar los TRES componentes de Glasgow además del total —porque un 10 puede ser cualquier cosa y el motor es el que mejor refleja la gravedad— y no atribuir al cerebro lo que todavía no se ha descartado fuera de él.'),
        ],
      },
      {
        titulo: 'Antes de atribuirlo al cerebro',
        bloques: [
          { tipo: 'p', texto: 'La alteración del estado mental tiene causas tratables que no son neurológicas y que se descartan de forma sistemática antes de asumir un origen cerebral: hipoxia, hipoglucemia, hipoperfusión, intoxicación, alteración electrolítica, hipotermia e infección.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La glucemia capilar', texto: 'Comprobar la glucemia en todo paciente con alteración del estado mental es una de las intervenciones con mejor relación entre coste y beneficio de la atención prehospitalaria. Se realiza cuando el equipo está disponible y el procedimiento está dentro del alcance autorizado del prestador.' },
          mnemotecnia('CUATRO H Y TRES I para las causas no neurológicas: Hipoxia, Hipoglucemia, Hipoperfusión e Hipotermia; Intoxicación, Iones (alteración electrolítica) e Infección. Es la lista de esta lección ordenada para que no se caiga ninguna al recitarla en voz alta.'),
        ],
      },
      {
        titulo: 'Pupilas y déficit motor',
        bloques: [
          { tipo: 'p', texto: 'Las pupilas se exploran en penumbra cuando es posible, comparando ambos lados. Se registra si son isocóricas o anisocóricas, su tamaño aproximado y si reaccionan a la luz. Conviene anotar si el paciente usa lentes de contacto, tiene prótesis ocular o antecedente de cirugía ocular, porque alteran la interpretación.' },
          { tipo: 'p', texto: 'La debilidad o la pérdida de sensibilidad en un lado del cuerpo, la incapacidad para mover las extremidades por debajo de un nivel o la asimetría facial son hallazgos que orientan a lesión del sistema nervioso central o medular y modifican tanto la movilización del paciente como el destino del traslado.' },
          { tipo: 'p', texto: 'Los síndromes medulares concretos, el manejo del traumatismo craneoencefálico y las escalas prehospitalarias de accidente cerebrovascular se estudian en sus propios temas, en los Módulos 4 y 5.' },
        ],
      },
      erroresFrecuentes([
        ['Entregar solo el total de Glasgow', 'Un 10 puede corresponder a situaciones clínicas muy distintas según de dónde salgan los puntos. Se registran siempre los tres componentes —ocular, verbal y motor— además del total, y el motor es el que mejor refleja la gravedad.'],
        ['Atribuir al cerebro antes de descartar fuera de él', 'Hipoxia, hipoglucemia, hipoperfusión, intoxicación, alteración electrolítica, hipotermia e infección alteran el estado mental y son tratables. Asumir origen cerebral sin descartarlas retrasa lo que sí tenía solución.'],
        ['Explorar pupilas sin contexto', 'Se comparan ambos lados, en penumbra cuando es posible, y se anota si el paciente usa lentes de contacto, tiene prótesis ocular o antecedente de cirugía ocular: cualquiera de esos datos cambia la interpretación de una anisocoria.'],
        ['Quedarse con una sola exploración', 'Una exploración aislada describe un momento. Lo que indica lesión en evolución y cambia la conducta y el destino es el DETERIORO entre dos exploraciones.'],
      ]),
      repasoRapido([
        'La D explora nivel de conciencia, pupilas, función motora gruesa, sensibilidad gruesa y lenguaje.',
        'AVDI en la primaria; Glasgow cuando el cuadro lo requiere.',
        'Glasgow se registra por sus tres componentes además del total.',
        'El componente motor es el que mejor refleja la gravedad.',
        'Lo que modifica la conducta es el cambio entre dos exploraciones, no el valor aislado.',
        'Causas no neurológicas: cuatro H —hipoxia, hipoglucemia, hipoperfusión, hipotermia— y tres I —intoxicación, iones, infección—.',
        'La glucemia capilar en toda alteración del estado mental, si hay equipo y está en el alcance autorizado.',
        'Pupilas: tamaño, simetría y reactividad, comparando lados y en penumbra.',
        'Anotar lentes de contacto, prótesis ocular o cirugía previa: alteran la lectura.',
        'Debilidad o pérdida sensitiva unilateral, nivel medular y asimetría facial cambian movilización y destino.',
        'Síndromes medulares, traumatismo craneoencefálico y escalas de ictus son otros temas, en los Módulos 4 y 5.',
      ]),
      preguntasOrales([
        'Enumera los cinco apartados del examen breve de la D.',
        '¿Por qué no basta con dar el total de Glasgow?',
        '¿Cuál de los tres componentes refleja mejor la gravedad?',
        'Recita las cuatro H y las tres I de la alteración del estado mental.',
        '¿Por qué la glucemia capilar tiene tan buena relación entre coste y beneficio?',
        '¿Cómo se exploran las pupilas y qué antecedentes hay que anotar?',
        '¿Qué hallazgos orientan a lesión del sistema nervioso central o medular?',
        'Una exploración normal y la siguiente con anisocoria. ¿Qué significa?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, SEMIOLOGIA] }] },
    ],
    conceptosClave: [
      { termino: 'Escala de coma de Glasgow', definicion: 'Escala que puntúa por separado apertura ocular, respuesta verbal y respuesta motora; se registran los tres componentes y el total.' },
      { termino: 'Anisocoria', definicion: 'Asimetría del tamaño pupilar; su aparición durante la atención es un signo de deterioro.' },
      { termino: 'Causas no neurológicas de alteración mental', definicion: 'Hipoxia, hipoglucemia, hipoperfusión, intoxicación, alteración electrolítica, hipotermia e infección.' },
      { termino: 'Déficit motor', definicion: 'Pérdida o asimetría de la fuerza; orienta a lesión del sistema nervioso central o medular.' },
    ],
    flashcards: [
      { frente: '¿Qué se registra de la escala de coma de Glasgow?', reverso: 'Los tres componentes por separado además del total; el motor es el que mejor refleja la gravedad.' },
      { frente: '¿Qué se comprueba en todo paciente con alteración del estado mental?', reverso: 'La glucemia capilar, cuando el equipo está disponible y está dentro del alcance autorizado.' },
      { frente: 'Nombra cuatro causas no neurológicas de alteración del estado mental.', reverso: 'Hipoxia, hipoglucemia, hipoperfusión e intoxicación (también hipotermia, alteración electrolítica e infección).' },
      { frente: '¿Qué dato de la exploración pupilar hay que anotar aparte?', reverso: 'Uso de lentes de contacto, prótesis ocular o cirugía ocular previa, porque alteran la interpretación.' },
      { frente: '¿Qué hace útil una exploración neurológica?', reverso: 'Compararla con la anterior: el cambio es lo que indica lesión en evolución.' },
    ],
    quiz: [
      {
        pregunta: 'Dos pacientes tienen Glasgow total de 10. ¿Por qué se registran los componentes por separado?',
        opciones: [
          'Por exigencia administrativa del registro.',
          'Porque un mismo total puede corresponder a situaciones clínicas muy distintas.',
          'Porque el total no se calcula en el medio prehospitalario.',
          'Porque el componente verbal es el más importante.',
        ],
        correcta: 1,
        explicacion: 'El desglose distingue cuadros diferentes con idéntico total, y el componente motor es el que mejor refleja la gravedad.',
      },
      {
        pregunta: 'Paciente confuso tras una caída. ¿Qué comprobación no debe faltar?',
        opciones: [
          'La temperatura timpánica.',
          'La glucemia capilar, si el equipo está disponible y dentro del alcance.',
          'La auscultación cardiaca completa.',
          'La escala prehospitalaria de accidente cerebrovascular.',
        ],
        correcta: 1,
        explicacion: 'La hipoglucemia es una causa tratable y frecuente de alteración del estado mental; descartarla precede a atribuir el cuadro a la lesión craneal.',
      },
      {
        pregunta: 'Durante el traslado aparece anisocoria que antes no existía. ¿Qué significa?',
        opciones: [
          'Es un hallazgo sin valor si el paciente sigue consciente.',
          'Es un signo de deterioro que obliga a reevaluar y a informar al centro receptor.',
          'Confirma hemorragia intracraneal.',
          'Se debe a la iluminación de la ambulancia.',
        ],
        correcta: 1,
        explicacion: 'La aparición de asimetría pupilar durante la atención indica cambio en evolución; orienta pero no confirma por sí sola ningún diagnóstico.',
      },
      {
        pregunta: '¿Qué incluye la exploración motora gruesa de la evaluación primaria?',
        opciones: [
          'Fuerza por grupos musculares con escala numérica.',
          'Movimiento de las cuatro extremidades y simetría de la fuerza.',
          'Reflejos osteotendinosos.',
          'Marcha y equilibrio.',
        ],
        correcta: 1,
        explicacion: 'La D busca un déficit evidente y comparable en segundos; la exploración detallada por grupos musculares corresponde a otro nivel de valoración.',
      },
    ],
    actividades: null,
    revision: ficha(),
  },

  // ============================================================
  //  Exploración dirigida
  // ============================================================
  'm3-ep-exploracion-dirigida': {
    icono: 'cp-cc0-lupa',
    duracion: '14 min',
    resumen: 'La exploración corta y orientada al problema que se hace dentro de la evaluación primaria, '
      + 'sin convertirla en una revisión de cabeza a pies.',
    objetivos: [
      'Delimitar el alcance de la exploración dirigida frente a la exploración detallada.',
      'Orientar la exploración según el mecanismo de lesión o el motivo de consulta.',
      'Exponer al paciente lo necesario evitando la hipotermia y preservando su intimidad.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué no es',
        bloques: [
          { tipo: 'p', texto: 'La exploración dirigida busca, en la región implicada, los hallazgos que pueden cambiar la conducta inmediata. Es corta, se orienta por el mecanismo o por el motivo de consulta y forma parte de la evaluación primaria; no sustituye a la exploración física detallada, que pertenece a la evaluación secundaria y se realiza cuando el paciente está estabilizado o durante el traslado.' },
          {
            tipo: 'tabla',
            titulo: 'Dos exploraciones distintas',
            headers: ['', 'Dirigida', 'Detallada'],
            filas: [
              ['Cuándo', 'Dentro de la evaluación primaria', 'En la evaluación secundaria'],
              ['Alcance', 'La región implicada y lo que amenaza la vida', 'De cabeza a pies, por sistemas'],
              ['Objetivo', 'Decidir la conducta inmediata', 'Encontrar lesiones no evidentes'],
              ['Duración', 'Breve', 'Completa, sin retrasar el traslado del inestable'],
            ],
          },
        ],
      },
      {
        titulo: 'Cómo se orienta',
        bloques: [
          { tipo: 'p', texto: 'En trauma la orienta el mecanismo: una colisión frontal dirige la atención a cabeza, columna cervical, tórax, abdomen y miembros inferiores; una caída de altura, a calcáneos, pelvis y columna. En patología médica la orienta el motivo de consulta: un dolor torácico dirige la exploración al tórax, al cuello y a los pulsos periféricos.' },
          { tipo: 'p', texto: 'Se emplean las mismas maniobras que en cualquier exploración física —inspección, palpación, percusión y auscultación—, aplicadas solo donde tienen sentido en ese paciente y en ese momento.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La exploración no retrasa lo urgente', texto: 'En un paciente inestable, la exploración dirigida se limita a lo que va a cambiar una decisión ahora. Todo lo demás se hace durante el traslado. Completar una exploración exhaustiva en la escena de un paciente que se está deteriorando es un error de prioridades, no una virtud.' },
          mnemotecnia('IPPA: Inspección, Palpación, Percusión y Auscultación. Son las mismas cuatro maniobras de siempre; lo que cambia en la exploración dirigida no es la técnica, sino DÓNDE se aplica: solo donde el mecanismo o el motivo de consulta le dan sentido.'),
          masPreguntado('Casi todas las preguntas de esta lección piden distinguir la dirigida de la detallada por cuatro ejes —cuándo, alcance, objetivo y duración— y reconocer el error de prioridades: completar una exploración exhaustiva en la escena de un paciente que se está deteriorando.'),
        ],
      },
      {
        titulo: 'Exposición y respeto',
        bloques: [
          { tipo: 'p', texto: 'No se explora lo que no se ve: la ropa impide detectar heridas, deformidades y hemorragias. Pero exponer tiene un coste, y por eso se expone solo lo necesario, durante el menor tiempo posible, protegiendo del frío en cuanto se termina.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se hace bien',
            items: [
              'Explicar qué se va a hacer y por qué, aunque el paciente parezca no entender.',
              'Exponer por regiones y volver a cubrir antes de pasar a la siguiente.',
              'Usar mantas o sábanas y proteger de la vista de terceros.',
              'Cortar la ropa cuando movilizarla suponga riesgo, respetando orificios y desgarros si la escena puede ser legal.',
              'Vigilar activamente la hipotermia: en un paciente traumatizado agrava la hemorragia y empeora el pronóstico.',
            ],
          },
        ],
      },
      erroresFrecuentes([
        ['Convertirla en una revisión de cabeza a pies', 'La dirigida busca, en la región implicada, lo que puede cambiar la conducta AHORA. La revisión completa es la exploración detallada, pertenece a la secundaria y se hace con el paciente estabilizado o durante el traslado.'],
        ['Explorar sobre la ropa', 'No se explora lo que no se ve: la ropa oculta heridas, deformidades y hemorragias. Palpar por encima de la tela da una falsa tranquilidad que después nadie repite.'],
        ['Exponer de más y no volver a cubrir', 'Se expone por regiones, lo necesario y el menor tiempo posible, y se cubre antes de pasar a la siguiente. La hipotermia en un paciente traumatizado agrava la hemorragia y empeora el pronóstico.'],
        ['Cortar la ropa sin pensar en lo que viene después', 'Cuando la escena puede tener consecuencias legales, se respetan orificios y desgarros: la ropa también es información, y cortarla por ellos la destruye.'],
      ]),
      repasoRapido([
        'La dirigida es corta, se orienta por mecanismo o motivo de consulta y pertenece a la evaluación primaria.',
        'La detallada es de cabeza a pies, por sistemas, y pertenece a la secundaria.',
        'En trauma orienta el mecanismo; en patología médica, el motivo de consulta.',
        'Colisión frontal: cabeza, cervical, tórax, abdomen y miembros inferiores.',
        'Caída de altura: calcáneos, pelvis y columna.',
        'Se usan las mismas cuatro maniobras —inspección, palpación, percusión, auscultación— solo donde tienen sentido.',
        'En el paciente inestable se limita a lo que cambia una decisión ahora; el resto, durante el traslado.',
        'No se explora lo que no se ve: hay que exponer.',
        'Se expone por regiones y se vuelve a cubrir antes de seguir.',
        'Se explica lo que se va a hacer aunque el paciente parezca no entender.',
        'Se protege de la vista de terceros y se vigila activamente la hipotermia.',
      ]),
      preguntasOrales([
        'Di cuatro diferencias entre la exploración dirigida y la detallada.',
        '¿Qué orienta la exploración en un paciente de trauma? ¿Y en uno médico?',
        'Una caída de altura. ¿Hacia dónde diriges la exploración y por qué?',
        '¿Qué se hace con la exploración cuando el paciente está inestable?',
        '¿Por qué hay que exponer, y qué precauciones exige hacerlo?',
        '¿Qué consecuencias tiene la hipotermia en un paciente traumatizado?',
        '¿Cuándo se corta la ropa y qué hay que respetar al hacerlo?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, SEMIOLOGIA] }] },
    ],
    conceptosClave: [
      { termino: 'Exploración dirigida', definicion: 'Exploración breve y orientada al problema, dentro de la evaluación primaria, que busca lo que cambia la conducta inmediata.' },
      { termino: 'Exploración detallada', definicion: 'Revisión de cabeza a pies propia de la evaluación secundaria; no retrasa el traslado del paciente inestable.' },
      { termino: 'Exposición', definicion: 'Retirada de la ropa necesaria para explorar, limitada en extensión y tiempo, seguida de protección térmica.' },
      { termino: 'Hipotermia en trauma', definicion: 'Descenso de la temperatura que agrava la hemorragia y empeora el pronóstico; se previene activamente.' },
    ],
    flashcards: [
      { frente: '¿En qué parte de la evaluación se hace la exploración dirigida?', reverso: 'En la evaluación primaria; la detallada pertenece a la secundaria.' },
      { frente: '¿Qué orienta la exploración dirigida en trauma?', reverso: 'El mecanismo de lesión.' },
      { frente: '¿Cuánto se explora en un paciente inestable?', reverso: 'Solo lo que vaya a cambiar una decisión inmediata; el resto se hace durante el traslado.' },
      { frente: '¿Por qué se previene activamente la hipotermia en el traumatizado?', reverso: 'Porque agrava la hemorragia y empeora el pronóstico.' },
      { frente: '¿Cómo se expone a un paciente?', reverso: 'Por regiones, cubriendo antes de pasar a la siguiente, protegiendo del frío y de la vista de terceros.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente inestable tras colisión frontal. ¿Qué alcance tiene tu exploración en la escena?',
        opciones: [
          'Completa, de cabeza a pies, antes de movilizarlo.',
          'Dirigida por el mecanismo y limitada a lo que cambie una decisión inmediata.',
          'Solo la región donde el paciente refiere dolor.',
          'Ninguna: se explora exclusivamente en el hospital.',
        ],
        correcta: 1,
        explicacion: 'En el paciente inestable la exploración exhaustiva en escena retrasa el traslado; lo demás se completa durante el trayecto.',
      },
      {
        pregunta: '¿Qué diferencia principal hay entre exploración dirigida y detallada?',
        opciones: [
          'La dirigida usa palpación y la detallada auscultación.',
          'La dirigida busca lo que cambia la conducta inmediata; la detallada busca lesiones no evidentes.',
          'La detallada solo se hace en pacientes médicos.',
          'La dirigida se hace sin exponer al paciente.',
        ],
        correcta: 1,
        explicacion: 'Se distinguen por objetivo y momento, no por las maniobras: ambas usan inspección, palpación, percusión y auscultación.',
      },
      {
        pregunta: 'Caída de altura sobre los pies. ¿Hacia dónde diriges la exploración?',
        opciones: [
          'Cabeza y cuello exclusivamente.',
          'Calcáneos, pelvis y columna, además de la evaluación primaria completa.',
          'Solo la extremidad dolorosa.',
          'Abdomen y tórax, por ser cavidades.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo transmite la energía en sentido axial y orienta a lesiones de calcáneo, pelvis y columna.',
      },
      {
        pregunta: 'Al exponer a un paciente traumatizado en vía pública, ¿qué es correcto?',
        opciones: [
          'Desvestirlo por completo de una vez para no repetir maniobras.',
          'Exponer por regiones, cubrir antes de pasar a la siguiente y proteger del frío y de terceros.',
          'No exponer nunca en la calle.',
          'Retirar solo la ropa que el paciente autorice, aunque impida ver una hemorragia.',
        ],
        correcta: 1,
        explicacion: 'No explorar impide detectar lesiones, pero exponer de más produce hipotermia y vulnera la intimidad: la exposición se hace por regiones y con protección.',
      },
    ],
    actividades: null,
    revision: ficha(['Tema que estaba VACÍO en el inventario.']),
  },

  // ============================================================
  //  ABCDE (evaluación secundaria)
  // ============================================================
  'm3-es-abcde': {
    icono: 'cp-cc0-paciente',
    duracion: '13 min',
    resumen: 'Qué añade la evaluación secundaria a la primaria y por qué la nemotecnia se repite: no es el '
      + 'mismo examen otra vez, sino el mismo orden aplicado con más profundidad.',
    objetivos: [
      'Distinguir la evaluación primaria de la secundaria por objetivo y momento.',
      'Aplicar la secuencia con la profundidad propia de la evaluación secundaria.',
      'Decidir cuándo la evaluación secundaria se realiza durante el traslado.',
    ],
    secciones: [
      {
        titulo: 'Dos evaluaciones, un mismo orden',
        bloques: [
          { tipo: 'p', texto: 'La evaluación primaria busca y resuelve amenazas vitales: hemorragia exanguinante, vía aérea comprometida, ventilación ineficaz, hipoperfusión, déficit neurológico y exposición con prevención de hipotermia. Termina cuando esas amenazas están identificadas y tratadas dentro del alcance disponible.' },
          { tipo: 'p', texto: 'La evaluación secundaria empieza después y persigue otra cosa: encontrar lo que no amenaza la vida de forma inmediata pero cambia el tratamiento, el destino o el pronóstico. Recorre el mismo orden porque el orden refleja la prioridad fisiológica, no porque haya que repetir el examen.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La secundaria no retrasa al inestable', texto: 'En un paciente inestable la evaluación secundaria se realiza durante el traslado, o no se realiza. Nunca se completa en la escena a costa de retrasar el transporte de alguien que necesita tratamiento definitivo.' },
          mnemotecnia('LA MISMA ESCALERA, DOS VECES, CON DOS PREGUNTAS DISTINTAS. En la primaria cada letra pregunta «¿esto lo mata ahora?»; en la secundaria, «¿esto cambia el tratamiento, el destino o el pronóstico?». El orden se repite porque refleja la prioridad fisiológica, no porque haya que repetir el examen.'),
        ],
      },
      {
        titulo: 'Qué se añade en cada letra',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'De la primaria a la secundaria',
            headers: ['Letra', 'En la primaria', 'Lo que añade la secundaria'],
            filas: [
              ['A', '¿Está permeable?', 'Estabilidad de la vía aérea en el tiempo y necesidad de dispositivo'],
              ['B', '¿Ventila de forma eficaz?', 'Auscultación completa, simetría fina, saturación seriada'],
              ['C', '¿Hay hemorragia e hipoperfusión?', 'Pulsos periféricos y centrales, presión arterial, perfusión distal, reevaluación de apósitos'],
              ['D', 'Nivel de conciencia y déficit evidente', 'Glasgow por componentes, pupilas, motor y sensitivo por regiones'],
              ['E', 'Exposición y prevención de hipotermia', 'Exploración de cabeza a pies y revisión de la espalda'],
            ],
          },
          { tipo: 'p', texto: 'La evaluación secundaria incluye además la historia clínica orientada, que se obtiene con la nemotecnia SAMPLE, y la exploración física detallada. Cada una tiene su propio tema en esta unidad.' },
        ],
      },
      {
        titulo: 'Reevaluación',
        bloques: [
          { tipo: 'p', texto: 'Terminar la evaluación secundaria no cierra la valoración. El paciente se reevalúa de forma periódica y siempre después de cada intervención, de cada movilización y ante cualquier cambio en su estado. Un paciente inestable se reevalúa con más frecuencia que uno estable, y toda reevaluación se registra con su hora.' },
        ],
      },
      erroresFrecuentes([
        ['Completar la secundaria en la escena con un paciente inestable', 'En el inestable la evaluación secundaria se hace durante el traslado, o no se hace. Terminarla en la escena a costa de retrasar el tratamiento definitivo es el error de prioridades más caro de esta unidad.'],
        ['Creer que es el mismo examen otra vez', 'El orden se repite porque refleja la prioridad fisiológica, no porque haya que repetir la valoración. Cada letra pregunta otra cosa: la primaria busca lo que mata ahora, la secundaria lo que cambia tratamiento, destino o pronóstico.'],
        ['Dar la valoración por cerrada al terminar', 'Terminar la secundaria no cierra nada. El paciente se reevalúa periódicamente, después de cada intervención, de cada movilización y ante cualquier cambio.'],
        ['Reevaluar sin registrar la hora', 'Una reevaluación sin hora no permite reconstruir la tendencia, que es justamente lo que el centro receptor necesita saber.'],
      ]),
      repasoRapido([
        'La primaria busca y resuelve amenazas vitales; termina cuando están identificadas y tratadas dentro del alcance disponible.',
        'La secundaria busca lo que no mata ahora pero cambia tratamiento, destino o pronóstico.',
        'El mismo orden en las dos porque refleja la prioridad fisiológica.',
        'A: de «¿está permeable?» a estabilidad en el tiempo y necesidad de dispositivo.',
        'B: de «¿ventila bien?» a auscultación completa, simetría fina y saturación seriada.',
        'C: de hemorragia e hipoperfusión a pulsos, presión arterial, perfusión distal y revisión de apósitos.',
        'D: del nivel de conciencia a Glasgow por componentes, pupilas y examen motor y sensitivo por regiones.',
        'E: de exposición y prevención de hipotermia a la exploración de cabeza a pies y la revisión de la espalda.',
        'La secundaria incluye la historia orientada (SAMPLE) y la exploración física detallada.',
        'En el inestable, la secundaria se hace durante el traslado o no se hace.',
        'Se reevalúa tras cada intervención, cada movilización y cada cambio, y se registra con su hora.',
      ]),
      preguntasOrales([
        '¿Qué busca la evaluación primaria y cuándo se puede dar por terminada?',
        '¿Qué persigue la secundaria que no persigue la primaria?',
        '¿Por qué se repite el mismo orden si no es el mismo examen?',
        'Di qué añade la secundaria en cada una de las cinco letras.',
        '¿Qué dos piezas incluye la secundaria además del recorrido por letras?',
        'Paciente inestable. ¿Dónde y cuándo haces la evaluación secundaria?',
        '¿Cuándo se reevalúa a un paciente y qué se registra de cada reevaluación?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9] }] },
    ],
    conceptosClave: [
      { termino: 'Evaluación primaria', definicion: 'Búsqueda y tratamiento de amenazas vitales siguiendo el orden de prioridad fisiológica.' },
      { termino: 'Evaluación secundaria', definicion: 'Valoración posterior que busca lo que no amenaza la vida de inmediato pero cambia tratamiento, destino o pronóstico.' },
      { termino: 'Reevaluación', definicion: 'Repetición periódica de la valoración, obligada tras cada intervención, movilización o cambio de estado.' },
      { termino: 'Historia orientada', definicion: 'Información clínica esencial obtenida con la nemotecnia SAMPLE dentro de la evaluación secundaria.' },
    ],
    flashcards: [
      { frente: '¿Qué busca la evaluación primaria?', reverso: 'Amenazas vitales, para resolverlas en el orden de prioridad fisiológica.' },
      { frente: '¿Qué busca la evaluación secundaria?', reverso: 'Lo que no mata de inmediato pero cambia el tratamiento, el destino o el pronóstico.' },
      { frente: '¿Dónde se hace la secundaria en un paciente inestable?', reverso: 'Durante el traslado, o no se hace: nunca a costa de retrasar el transporte.' },
      { frente: '¿Cuándo se reevalúa a un paciente?', reverso: 'De forma periódica y siempre tras cada intervención, movilización o cambio de estado.' },
      { frente: '¿Por qué la secundaria repite el orden ABCDE?', reverso: 'Porque el orden refleja la prioridad fisiológica, no porque se repita el mismo examen.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente inestable con hemorragia controlada y vía aérea asegurada. ¿Cuándo haces la evaluación secundaria?',
        opciones: [
          'En la escena, antes de movilizarlo.',
          'Durante el traslado, si las condiciones lo permiten.',
          'Nunca: los inestables no se exploran.',
          'Al llegar al hospital, junto al equipo receptor.',
        ],
        correcta: 1,
        explicacion: 'La secundaria no puede retrasar el transporte de quien necesita tratamiento definitivo; se realiza en camino cuando es posible.',
      },
      {
        pregunta: '¿Qué añade la C de la evaluación secundaria respecto de la primaria?',
        opciones: [
          'La búsqueda inicial de hemorragia exanguinante.',
          'Pulsos periféricos y centrales, presión arterial, perfusión distal y reevaluación de apósitos.',
          'La decisión de aplicar torniquete.',
          'Nada: es idéntica.',
        ],
        correcta: 1,
        explicacion: 'La primaria detecta la amenaza; la secundaria cuantifica y vigila la evolución de la circulación con más detalle.',
      },
      {
        pregunta: 'Tras completar la evaluación secundaria, el paciente permanece estable. ¿Qué procede?',
        opciones: [
          'Cerrar la valoración hasta la entrega.',
          'Reevaluar de forma periódica y tras cada intervención o movilización.',
          'Repetir la evaluación primaria completa cada cinco minutos.',
          'Registrar únicamente la valoración final.',
        ],
        correcta: 1,
        explicacion: 'La valoración no se cierra: la reevaluación periódica es lo que detecta un deterioro que aún no es evidente.',
      },
      {
        pregunta: '¿Por qué la evaluación secundaria recorre el mismo orden que la primaria?',
        opciones: [
          'Por costumbre de la nemotecnia.',
          'Porque el orden refleja la prioridad fisiológica.',
          'Porque así se detectan los errores de la primera valoración.',
          'Porque el registro exige ese formato.',
        ],
        correcta: 1,
        explicacion: 'El orden no es mnemotécnico sino fisiológico: lo que mata antes se atiende antes, también al profundizar.',
      },
    ],
    actividades: null,
    revision: ficha(),
  },

  // ============================================================
  //  SAMPLE
  // ============================================================
  'm3-es-sample': {
    icono: 'cp-servier-libreta',
    duracion: '13 min',
    resumen: 'Seis letras para obtener, en pocos minutos y sin olvidar nada, la historia clínica que el '
      + 'hospital necesitará y que nadie más podrá recoger.',
    objetivos: [
      'Obtener la historia clínica esencial con la nemotecnia SAMPLE.',
      'Identificar fuentes alternativas de información cuando el paciente no puede aportarla.',
      'Registrar la historia sin retrasar la atención de amenazas vitales.',
    ],
    secciones: [
      {
        titulo: 'Las seis letras',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'SAMPLE',
            headers: ['Letra', 'Qué se pregunta', 'Por qué importa'],
            filas: [
              ['S', 'Signos y síntomas', 'Qué siente el paciente y qué se observa; delimita el problema'],
              ['A', 'Alergias', 'Condiciona lo que puede administrarse en el hospital'],
              ['M', 'Medicamentos', 'Anticoagulantes, betabloqueadores, insulina o antiarrítmicos cambian la interpretación del cuadro'],
              ['P', 'Padecimientos previos', 'Antecedentes, cirugías, ingresos y embarazo cuando corresponda'],
              ['L', 'Última ingesta', 'Relevante para anestesia y para cuadros metabólicos'],
              ['E', 'Eventos previos', 'Qué estaba haciendo y qué ocurrió justo antes del cuadro'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La M cambia la lectura del paciente', texto: 'Un paciente anticoagulado con un traumatismo craneal leve tiene un riesgo distinto al de quien no lo está. Un betabloqueador puede impedir la taquicardia compensadora y hacer que un paciente en shock mantenga una frecuencia engañosamente normal. La lista de medicamentos no es un dato administrativo.' },
          masPreguntado('La letra que más se pregunta es la M. Dos ejemplos se repiten: el paciente anticoagulado con un traumatismo craneal aparentemente leve, y el betabloqueado en shock que mantiene una frecuencia engañosamente normal porque no puede taquicardizarse.'),
        ],
      },
      {
        titulo: 'Cuando el paciente no puede contarlo',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'De dónde sale la información',
            items: [
              'Familiares, acompañantes y testigos presenciales.',
              'Envases, recetas y cajas de medicamentos del domicilio.',
              'Identificaciones médicas: pulseras, tarjetas o placas de alerta.',
              'Personal de la residencia o del centro asistencial.',
              'La propia escena: dispositivos de oxígeno, glucómetro, jeringas, alimentos.',
            ],
          },
          { tipo: 'p', texto: 'Cuando la información procede de un tercero se registra quién la aportó. No es lo mismo un antecedente referido por el paciente que uno referido por un vecino, y quien reciba al paciente tiene derecho a saber la diferencia.' },
        ],
      },
      {
        titulo: 'Cuándo se obtiene',
        bloques: [
          { tipo: 'p', texto: 'SAMPLE forma parte de la evaluación secundaria, así que se obtiene después de resolver las amenazas vitales. En un paciente estable puede recogerse con calma; en uno inestable, durante el traslado y en el orden en que la información vaya apareciendo.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Preguntar no puede desplazar a tratar', texto: 'Una historia completa en un paciente que no ha sido estabilizado es tiempo mal invertido. La información se recoge mientras alguien atiende, o después: nunca en lugar de atender.' },
          { tipo: 'p', texto: 'Para caracterizar un síntoma concreto —sobre todo el dolor— suele añadirse una segunda nemotecnia, OPQRST, que explora inicio, factores que lo modifican, calidad, irradiación, intensidad y tiempo de evolución.' },
        ],
      },
      erroresFrecuentes([
        ['Preguntar en lugar de tratar', 'Una historia completa en un paciente que no ha sido estabilizado es tiempo mal invertido. La información se recoge mientras alguien atiende, o después; nunca en lugar de atender.'],
        ['No anotar de dónde salió el dato', 'No es lo mismo un antecedente referido por el paciente que uno referido por un vecino. Quien recibe al paciente tiene derecho a saber la diferencia, y solo la sabe si se registró.'],
        ['Tratar la lista de medicamentos como papeleo', 'Anticoagulantes, betabloqueadores, insulina y antiarrítmicos cambian la interpretación del cuadro y las decisiones del hospital. La M no es un dato administrativo.'],
        ['Rendirse cuando el paciente no puede contarlo', 'Quedan los familiares y testigos, los envases y recetas del domicilio, las identificaciones médicas, el personal del centro y la propia escena. Un paciente inconsciente no es un paciente sin historia.'],
      ]),
      repasoRapido([
        'S: signos y síntomas. Qué siente y qué se observa.',
        'A: alergias. Condiciona lo que puede administrarse.',
        'M: medicamentos. Cambian la interpretación del cuadro.',
        'P: padecimientos previos, cirugías, ingresos y embarazo cuando corresponda.',
        'L: última ingesta. Relevante para anestesia y cuadros metabólicos.',
        'E: eventos previos. Qué hacía y qué ocurrió justo antes.',
        'Un anticoagulado con traumatismo craneal leve no tiene el mismo riesgo que quien no lo está.',
        'Un betabloqueador puede impedir la taquicardia compensadora y ocultar un shock.',
        'Fuentes cuando el paciente no puede hablar: familiares, envases, identificaciones médicas, personal del centro, la escena.',
        'Se registra siempre quién aportó la información.',
        'SAMPLE pertenece a la secundaria: después de resolver las amenazas vitales.',
        'Para caracterizar el dolor se añade OPQRST.',
      ]),
      preguntasOrales([
        'Recita las seis letras de SAMPLE y qué se pregunta en cada una.',
        '¿Por qué la M puede cambiar por completo la lectura de un paciente? Da dos ejemplos.',
        'El paciente está inconsciente y solo. ¿De dónde sacas la historia?',
        '¿Por qué se registra quién aportó cada dato?',
        '¿En qué momento de la valoración se obtiene SAMPLE?',
        'Paciente inestable. ¿Cómo y cuándo recoges la historia?',
        '¿Para qué sirve OPQRST y qué explora cada letra?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, SEMIOLOGIA] }] },
    ],
    conceptosClave: [
      { termino: 'SAMPLE', definicion: 'Nemotecnia de la historia clínica esencial: signos y síntomas, alergias, medicamentos, padecimientos previos, última ingesta y eventos previos.' },
      { termino: 'OPQRST', definicion: 'Nemotecnia complementaria para caracterizar un síntoma: inicio, factores modificadores, calidad, irradiación, intensidad y tiempo.' },
      { termino: 'Fuente de la información', definicion: 'Persona u objeto del que procede un dato de la historia; se registra porque no todos tienen la misma fiabilidad.' },
      { termino: 'Identificación médica', definicion: 'Pulsera, tarjeta o placa que declara un antecedente relevante en pacientes que no pueden comunicarlo.' },
    ],
    flashcards: [
      { frente: '¿Qué significan las seis letras de SAMPLE?', reverso: 'Signos y síntomas, Alergias, Medicamentos, Padecimientos previos, última ingesta (Last) y Eventos previos.' },
      { frente: '¿Por qué importa saber si el paciente toma betabloqueadores?', reverso: 'Porque pueden impedir la taquicardia compensadora y hacer que un paciente en shock mantenga una frecuencia engañosamente normal.' },
      { frente: 'El paciente está inconsciente y solo. ¿De dónde sacas la historia?', reverso: 'De envases y recetas, identificaciones médicas, testigos, personal de la residencia y la propia escena.' },
      { frente: '¿Qué se anota cuando un dato lo aporta un tercero?', reverso: 'Quién lo aportó: la fiabilidad del dato depende de su origen.' },
      { frente: '¿En qué parte de la valoración se obtiene SAMPLE?', reverso: 'En la evaluación secundaria, después de resolver las amenazas vitales.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente inconsciente, solo en su domicilio. ¿Cuál es la mejor fuente inmediata de historia?',
        opciones: [
          'Esperar a que recupere la conciencia.',
          'Envases y recetas del domicilio, identificaciones médicas y testigos.',
          'El expediente del hospital, solicitado por radio.',
          'La exploración física, que sustituye a la historia.',
        ],
        correcta: 1,
        explicacion: 'La escena y los objetos del paciente aportan antecedentes y tratamiento habitual cuando él no puede hacerlo; nada de eso llega al hospital si nadie lo recoge.',
      },
      {
        pregunta: 'Traumatismo craneal leve en paciente que toma anticoagulantes. ¿Qué cambia?',
        opciones: [
          'Nada mientras el Glasgow sea 15.',
          'El riesgo es distinto y debe comunicarse al centro receptor.',
          'Debe suspenderse el anticoagulante en la ambulancia.',
          'Solo importa si hay herida abierta.',
        ],
        correcta: 1,
        explicacion: 'La anticoagulación modifica el riesgo de sangrado intracraneal aunque la presentación inicial sea normal; es un dato que cambia decisiones en el hospital.',
      },
      {
        pregunta: '¿Qué explora la letra E de SAMPLE?',
        opciones: [
          'La exposición del paciente.',
          'Los eventos previos: qué hacía y qué ocurrió justo antes del cuadro.',
          'El estado de conciencia.',
          'La evaluación de la escena.',
        ],
        correcta: 1,
        explicacion: 'La E recoge la secuencia inmediatamente anterior al cuadro, que a menudo explica el mecanismo o el desencadenante.',
      },
      {
        pregunta: 'Paciente inestable al que aún no has controlado una hemorragia. ¿Cuándo obtienes SAMPLE?',
        opciones: [
          'Antes de intervenir, para no olvidar preguntar.',
          'Mientras alguien atiende, o después: nunca en lugar de atender.',
          'Solo si el paciente lo solicita.',
          'Al terminar la entrega en el hospital.',
        ],
        correcta: 1,
        explicacion: 'La historia forma parte de la evaluación secundaria y no puede desplazar el tratamiento de una amenaza vital.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La ___ de SAMPLE recoge alergias, un dato que condiciona lo que podrá administrarse en el hospital.',
          opciones: ['S', 'A', 'M'],
          correcta: 1,
          explicacion: 'La A corresponde a alergias; la S son signos y síntomas y la M, medicamentos.',
        },
      ],
    },
    revision: ficha(['Tema que estaba VACÍO en el inventario; señalado por la auditoría como omisión de alto impacto formativo.']),
  },

  // ============================================================
  //  Exploración física detallada
  // ============================================================
  'm3-es-exploracion-detallada': {
    icono: 'ic-estetoscopio',
    duracion: '16 min',
    resumen: 'La revisión de cabeza a pies de la evaluación secundaria: qué se busca en cada región y por qué '
      + 'el orden importa tanto como el contenido.',
    objetivos: [
      'Ejecutar la exploración de cabeza a pies por regiones y por sistemas.',
      'Reconocer los hallazgos regionales que modifican el destino o el tratamiento.',
      'Registrar los hallazgos de forma que el centro receptor no tenga que repetirla.',
    ],
    secciones: [
      {
        titulo: 'Método',
        bloques: [
          { tipo: 'p', texto: 'La exploración detallada se realiza siempre en el mismo orden, de la cabeza a los pies, porque un orden fijo es lo único que impide olvidar una región. Se emplean inspección, palpación, percusión y auscultación según corresponda, comparando siempre un lado con el otro.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La espalda existe', texto: 'La región dorsal es la que más se olvida, y es donde con más frecuencia aparecen heridas por proyectil, hematomas y deformidades no advertidas. Se explora aprovechando una movilización en bloque, no como una maniobra aparte.' },
          mnemotecnia('PSM en cada extremidad: Pulso, Sensibilidad y Movilidad distales. Y se comprueban DOS veces —antes y después de cualquier alineación, férula o movilización—, porque una férula bien puesta que compromete la circulación es peor que no haber inmovilizado.'),
        ],
      },
      {
        titulo: 'Qué se busca en cada región',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Recorrido',
            headers: ['Región', 'Hallazgos que se buscan'],
            filas: [
              ['Cabeza y cara', 'Heridas, hundimientos, hematomas, salida de sangre o líquido por oídos o nariz, movilidad del macizo facial'],
              ['Ojos y pupilas', 'Tamaño, simetría, reactividad, cuerpos extraños, hemorragia visible'],
              ['Cuello', 'Dolor, deformidad, enfisema subcutáneo, desviación traqueal, ingurgitación yugular, heridas'],
              ['Tórax', 'Simetría de la expansión, heridas, movimiento paradójico, crepitación, ruidos respiratorios y cardiacos'],
              ['Abdomen', 'Dolor, defensa, distensión, equimosis, huellas de cinturón'],
              ['Pelvis', 'Dolor y estabilidad; no se repite la exploración si ya hay dolor o inestabilidad evidente'],
              ['Extremidades', 'Deformidad, herida, crepitación, y pulso, sensibilidad y movilidad distales'],
              ['Espalda', 'Heridas, deformidad y dolor a lo largo de la columna, aprovechando la movilización en bloque'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La pelvis no se explora dos veces', texto: 'Si ya existe dolor o inestabilidad, repetir la maniobra puede desplazar coágulos y reactivar una hemorragia. Se explora una vez, con suavidad, y el hallazgo se comunica para que nadie más lo repita.' },
        ],
      },
      {
        titulo: 'Pulso, sensibilidad y movilidad distales',
        bloques: [
          { tipo: 'p', texto: 'En cada extremidad se comprueban pulso, sensibilidad y movilidad distales, y la comprobación se repite después de cualquier alineación, inmovilización o movilización. Una férula bien colocada que compromete la circulación es peor que no haber inmovilizado.' },
          { tipo: 'p', texto: 'Los hallazgos se registran con su hora y con su lateralidad, y se transmiten en la entrega. Una exploración detallada bien hecha y mal comunicada obliga a repetirla en el hospital, con el paciente pagando el tiempo.' },
        ],
      },
      erroresFrecuentes([
        ['Repetir la exploración de la pelvis', 'Si ya hay dolor o inestabilidad, repetir la maniobra puede desplazar coágulos y reactivar una hemorragia. Se explora una vez, con suavidad, y el hallazgo se comunica para que nadie más lo repita.'],
        ['Olvidar la espalda', 'Es la región que más se olvida y donde con más frecuencia aparecen heridas por proyectil, hematomas y deformidades no advertidas. Se explora aprovechando una movilización en bloque, no como maniobra aparte.'],
        ['No repetir pulso, sensibilidad y movilidad tras inmovilizar', 'Una férula bien colocada que compromete la circulación es peor que no haber inmovilizado. La comprobación distal se repite después de cada alineación, férula o movilización.'],
        ['Explorar bien y comunicar mal', 'Una exploración detallada que no se registra con su hora y su lateralidad obliga a repetirla en el hospital, y el tiempo lo paga el paciente.'],
      ]),
      repasoRapido([
        'Siempre el mismo orden, de la cabeza a los pies: un orden fijo es lo único que impide olvidar una región.',
        'Inspección, palpación, percusión y auscultación, comparando siempre un lado con el otro.',
        'Cabeza y cara: heridas, hundimientos, salida de sangre o líquido por oídos o nariz, movilidad del macizo facial.',
        'Cuello: enfisema subcutáneo, desviación traqueal, ingurgitación yugular.',
        'Tórax: simetría, heridas, movimiento paradójico, crepitación, ruidos respiratorios y cardiacos.',
        'Abdomen: dolor, defensa, distensión, equimosis, huellas de cinturón.',
        'Pelvis: se explora UNA vez, con suavidad, y no se repite si ya hay dolor o inestabilidad.',
        'Extremidades: deformidad, herida, crepitación, y pulso, sensibilidad y movilidad distales.',
        'Espalda: se explora aprovechando la movilización en bloque.',
        'PSM antes y después de cualquier alineación, inmovilización o movilización.',
        'Los hallazgos se registran con hora y lateralidad y se transmiten en la entrega.',
      ]),
      preguntasOrales([
        '¿Por qué la exploración detallada se hace siempre en el mismo orden?',
        'Recorre las regiones y di qué buscas en cada una.',
        '¿Qué se busca en el cuello y por qué es una región crítica?',
        '¿Qué es el signo del cinturón y dónde se busca?',
        '¿Por qué la pelvis no se explora dos veces?',
        '¿Cómo y cuándo se explora la espalda?',
        '¿Qué significa PSM y cuándo se comprueba?',
        '¿Qué pasa si la exploración se hace bien pero no se comunica?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, SEMIOLOGIA] }] },
    ],
    conceptosClave: [
      { termino: 'Exploración de cabeza a pies', definicion: 'Revisión sistemática por regiones, siempre en el mismo orden, propia de la evaluación secundaria.' },
      { termino: 'Movilización en bloque', definicion: 'Giro coordinado que mantiene alineados cabeza, cuello y tronco; permite explorar la espalda sin maniobras adicionales.' },
      { termino: 'Pulso, sensibilidad y movilidad distales', definicion: 'Comprobación obligada en cada extremidad, repetida tras toda alineación, inmovilización o movilización.' },
      { termino: 'Signo del cinturón', definicion: 'Equimosis lineal en la pared abdominal producida por el cinturón de seguridad; obliga a sospechar lesión interna.' },
    ],
    flashcards: [
      { frente: '¿Por qué la exploración detallada sigue siempre el mismo orden?', reverso: 'Porque un orden fijo es lo único que impide olvidar una región.' },
      { frente: '¿Cuándo se explora la espalda?', reverso: 'Aprovechando una movilización en bloque, no como maniobra aparte.' },
      { frente: '¿Por qué no se repite la exploración de pelvis?', reverso: 'Porque puede desplazar coágulos y reactivar una hemorragia.' },
      { frente: '¿Qué se comprueba en cada extremidad y cuándo se repite?', reverso: 'Pulso, sensibilidad y movilidad distales; se repite tras toda alineación, inmovilización o movilización.' },
      { frente: '¿Qué pasa si la exploración se hace bien pero se comunica mal?', reverso: 'Hay que repetirla en el hospital, y el tiempo lo paga el paciente.' },
    ],
    quiz: [
      {
        pregunta: 'Ya comprobaste inestabilidad pélvica en la evaluación primaria. En la exploración detallada, ¿qué haces con la pelvis?',
        opciones: [
          'La exploras de nuevo para confirmar el hallazgo.',
          'No repites la maniobra y comunicas el hallazgo para que nadie más la repita.',
          'La exploras con más fuerza para valorar el grado.',
          'La omites del registro por ser un dato ya conocido.',
        ],
        correcta: 1,
        explicacion: 'Repetir la maniobra puede desplazar coágulos y reactivar el sangrado; el hallazgo se registra y se transmite precisamente para evitarlo.',
      },
      {
        pregunta: 'Después de inmovilizar un antebrazo deformado, ¿qué compruebas?',
        opciones: [
          'Nada más: la férula ya está colocada.',
          'Pulso, sensibilidad y movilidad distales.',
          'La saturación en ese dedo exclusivamente.',
          'La alineación radiológica.',
        ],
        correcta: 1,
        explicacion: 'Una férula que compromete la circulación es peor que no haber inmovilizado; la comprobación distal se repite después de cada maniobra.',
      },
      {
        pregunta: '¿Qué región se olvida con más frecuencia y por qué importa?',
        opciones: [
          'La cara, porque sangra mucho.',
          'La espalda, donde aparecen heridas por proyectil, hematomas y deformidades no advertidas.',
          'Las manos, por su inervación.',
          'El cuello, por llevar collarín.',
        ],
        correcta: 1,
        explicacion: 'La región dorsal solo se ve al movilizar en bloque, y por eso concentra los hallazgos que se pasan por alto.',
      },
      {
        pregunta: 'Encuentras una equimosis lineal transversal en el abdomen de un ocupante de vehículo. ¿Qué implica?',
        opciones: [
          'Es una lesión cutánea sin mayor relevancia.',
          'Es un signo del cinturón: obliga a sospechar lesión interna.',
          'Confirma perforación intestinal.',
          'Descarta lesión de columna lumbar.',
        ],
        correcta: 1,
        explicacion: 'El signo del cinturón indica transferencia de energía a la pared y obliga a sospechar lesión interna, aunque no confirma ninguna en concreto.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la exploración física detallada',
        pasos: [
          'Cabeza y cara',
          'Ojos y pupilas',
          'Cuello',
          'Tórax',
          'Abdomen',
          'Pelvis',
          'Extremidades con pulso, sensibilidad y movilidad distales',
          'Espalda, aprovechando la movilización en bloque',
        ],
      },
    },
    revision: ficha(),
  },
}
