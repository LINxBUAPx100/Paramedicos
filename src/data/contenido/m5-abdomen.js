// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE ABDOMEN»
// ------------------------------------------------------------
//  Cubre los 8 temas vacíos de la unidad. El plan la desglosa órgano por
//  órgano, así que cada tema es una ficha comparable.
//
//  Hilo con las unidades previas: el abdomen es el segundo gran reservorio de
//  hemorragia oculta después del tórax. Un shock sin sangrado visible se busca
//  aquí antes que en ningún otro sitio.
//
//  Idea que recorre toda la unidad: en trauma abdominal el TUM casi nunca
//  identifica QUÉ órgano se lesionó, y no necesita hacerlo. Lo que decide el
//  pronóstico es reconocer que el abdomen es la fuente del shock y no demorar
//  el traslado a quirófano.
//
//  Sin dosis ni volúmenes: dependen del protocolo y del nivel de atención.
// ============================================================

import {
  erroresFrecuentes, repasoRapido, preguntasOrales, mnemotecnia, masPreguntado,
} from './moldeV2.js'

const FUENTE = {
  tipo: 'fuentes',
  titulo: 'Para ampliar',
  items: [
    {
      nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
      nota: 'Edición declarada por el plan de estudios oficial y base curricular de este módulo. Capítulo y página PENDIENTES: solo puede precisarlos quien consulte la copia licenciada de la academia. No se cita la 10.ª edición porque la copia disponible es una traducción automática no citable.',
    },
  ],
}

// El bloque de arriba iba suelto al final de la última sección clínica de cada
// lección. Aquí pasa a ser su propia sección final, que es la convención del
// resto del temario y lo que permite que las secciones del molde v2 se
// inserten antes de la bibliografía y no después.
const SEC_FUENTES = { titulo: 'Fuentes', bloques: [FUENTE] }

export default {
  'm5-ta-definicion': {
    icono: 'cp-servier-intestino',
    duracion: '12 min',
    resumen: 'Qué es el trauma abdominal y por qué se le llama «la cavidad que miente»: puede alojar una hemorragia mortal sin apenas signos externos.',
    objetivos: [
      'Definir el trauma abdominal y sus mecanismos.',
      'Distinguir el comportamiento de órganos sólidos y huecos.',
      'Reconocer por qué la exploración inicial puede ser engañosa.',
    ],
    secciones: [
      {
        titulo: 'La cavidad que miente',
        bloques: [
          { tipo: 'p', texto: 'El abdomen puede contener litros de sangre sin distenderse de forma llamativa y sin que la pared muestre gran cosa. Un paciente puede tener el abdomen casi normal a la palpación y estar desangrándose por dentro.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La regla que evita muertes', texto: 'En todo paciente con shock sin hemorragia externa que lo explique, el abdomen es sospechoso hasta demostrar lo contrario. No hace falta saber qué órgano es: basta con saber que hay que ir a quirófano.' },
          { tipo: 'p', texto: 'Además, la exploración pierde fiabilidad cuando hay alteración del estado de conciencia, intoxicación, lesión medular o dolor intenso en otra zona que distraiga. En esos casos, un abdomen «normal» no descarta nada.' },
        ],
      },
      {
        titulo: 'Sólidos y huecos: dos comportamientos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Órganos sólidos', 'Órganos huecos'],
            filas: [
              ['Cuáles', 'Hígado, bazo, riñones, páncreas', 'Estómago, intestino, vejiga'],
              ['Al lesionarse', 'Sangran', 'Vierten su contenido'],
              ['Consecuencia', 'Shock hipovolémico', 'Peritonitis e infección'],
              ['Cuándo se manifiesta', 'Pronto: minutos a horas', 'Más tarde: horas'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por eso el tiempo se comporta distinto', texto: 'La lesión de órgano sólido mata rápido por hemorragia; la de órgano hueco mata más tarde por infección. Las dos exigen traslado, pero explican por qué un paciente que parecía bien empeora horas después.' },
          {
            tipo: 'lista',
            titulo: 'Mecanismos',
            items: [
              'Cerrado: compresión (cinturón, volante), desaceleración (los órganos siguen moviéndose y se desgarran en sus anclajes), aplastamiento.',
              'Penetrante: arma blanca —trayecto más predecible— y arma de fuego, que puede lesionar lejos del trayecto aparente.',
            ],
          },
          mnemotecnia('SÓLIDOS SANGRAN, HUECOS VIERTEN. Los sólidos —hígado, bazo, riñones, páncreas— dan shock hipovolémico y matan pronto; los huecos —estómago, intestino, vejiga— dan peritonitis e infección y matan más tarde. Ahí está la razón de que un paciente que parecía bien empeore horas después.'),
          masPreguntado('La regla que evita muertes: en todo paciente con shock sin hemorragia externa que lo explique, el abdomen es sospechoso hasta demostrar lo contrario. No hace falta saber qué órgano es; basta con saber que hay que ir a quirófano.'),
        ],
      },
      erroresFrecuentes([
        ['Fiarse de un abdomen blando', 'El abdomen puede contener litros de sangre sin distenderse de forma llamativa. Un paciente puede tener el abdomen casi normal a la palpación y estar desangrándose por dentro.'],
        ['Explorar sin tener en cuenta qué resta fiabilidad', 'La exploración pierde valor con alteración del estado de conciencia, intoxicación, lesión medular o dolor intenso en otra zona. En esas condiciones, un abdomen «normal» no descarta nada.'],
        ['Querer nombrar el órgano', 'No hace falta saber cuál es para decidir. Lo que decide es que hay una emergencia abdominal y que el destino es un centro quirúrgico.'],
        ['Dar por cerrado el caso de un órgano hueco', 'Su contenido tarda horas en dar clínica. El paciente puede parecer estable en la escena y desarrollar peritonitis después.'],
      ]),
      repasoRapido([
        'El abdomen puede alojar una hemorragia mortal sin apenas signos externos: es la cavidad que miente.',
        'En todo shock sin hemorragia externa que lo explique, el abdomen es sospechoso hasta demostrar lo contrario.',
        'La exploración pierde fiabilidad con alteración de conciencia, intoxicación, lesión medular o dolor distractor.',
        'Órganos sólidos: hígado, bazo, riñones y páncreas. Al lesionarse, sangran.',
        'Órganos huecos: estómago, intestino y vejiga. Al romperse, vierten su contenido.',
        'El sólido da shock hipovolémico; el hueco, peritonitis e infección.',
        'El sólido se manifiesta pronto, en minutos a horas; el hueco, más tarde.',
        'Eso explica por qué un paciente que parecía bien empeora horas después.',
        'Mecanismos cerrados: compresión por cinturón o volante, desaceleración y aplastamiento.',
        'En la desaceleración los órganos siguen moviéndose y se desgarran en sus anclajes.',
        'Penetrante: el arma blanca tiene trayecto más predecible.',
        'El arma de fuego puede lesionar lejos del trayecto aparente.',
      ]),
      preguntasOrales([
        '¿Por qué se llama al abdomen «la cavidad que miente»?',
        'Di la regla que se aplica ante un shock sin hemorragia externa.',
        '¿Qué situaciones restan fiabilidad a la exploración abdominal?',
        'Diferencia el comportamiento de órganos sólidos y huecos.',
        '¿Por qué el tiempo se comporta distinto en unos y en otros?',
        'Enumera los mecanismos cerrados de lesión abdominal.',
        '¿Qué diferencia al arma blanca del arma de fuego aquí?',
        '¿Necesitas saber qué órgano está lesionado para decidir? Justifícalo.',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Órgano sólido', definicion: 'Hígado, bazo, riñón o páncreas; al lesionarse sangran y producen shock hipovolémico.' },
      { termino: 'Órgano hueco', definicion: 'Estómago, intestino o vejiga; al romperse vierten contenido y producen peritonitis.' },
      { termino: 'Peritonitis', definicion: 'Inflamación del peritoneo por contenido digestivo, sangre u orina; cursa con dolor intenso y rigidez.' },
    ],
    flashcards: [
      { frente: '¿Qué hacen los órganos sólidos al lesionarse?', reverso: 'Sangran: producen shock hipovolémico.' },
      { frente: '¿Y los huecos?', reverso: 'Vierten su contenido: producen peritonitis, más tardía.' },
      { frente: 'Shock sin hemorragia externa: ¿dónde buscas?', reverso: 'En el abdomen, entre los reservorios de hemorragia oculta.' },
      { frente: '¿Cuándo pierde fiabilidad la exploración abdominal?', reverso: 'Con alteración de conciencia, intoxicación, lesión medular o dolor distractor.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente en shock tras colisión, sin heridas externas visibles y con abdomen blando. ¿Qué concluyes?',
        opciones: [
          'El abdomen está descartado porque está blando.',
          'El abdomen sigue siendo sospechoso: puede alojar litros sin distenderse.',
          'El shock es de origen neurogénico.',
          'Hay que esperar a que aparezca defensa abdominal.',
        ],
        correcta: 1,
        explicacion: 'Un abdomen blando no descarta hemorragia intraabdominal, sobre todo en las primeras horas.',
      },
      {
        pregunta: '¿Por qué la lesión de un órgano hueco se manifiesta más tarde?',
        opciones: [
          'Porque sangra despacio.',
          'Porque la peritonitis por el contenido vertido tarda horas en desarrollarse.',
          'Porque el dolor se percibe con retraso.',
          'Porque el órgano se sella solo.',
        ],
        correcta: 1,
        explicacion: 'La inflamación peritoneal necesita tiempo; por eso un paciente puede parecer estable al principio.',
      },
    ],
    actividades: null,
  },

  'm5-ta-cuadrantes': {
    icono: 'cp-cc0-lupa',
    duracion: '13 min',
    resumen: 'Cuadrantes y exploración física: cómo se divide el abdomen, qué hay en cada zona y cómo se explora sin hacer daño.',
    objetivos: [
      'Dividir el abdomen en cuadrantes y ubicar sus órganos.',
      'Ejecutar la exploración en el orden correcto.',
      'Reconocer los signos de irritación peritoneal.',
    ],
    secciones: [
      {
        titulo: 'Los cuatro cuadrantes',
        bloques: [
          { tipo: 'p', texto: 'Dos líneas imaginarias que se cruzan en el ombligo dividen el abdomen en cuatro. Saber qué hay debajo de cada uno permite relacionar el punto del golpe o del dolor con el órgano probable.' },
          {
            tipo: 'tabla',
            headers: ['Cuadrante', 'Contiene principalmente'],
            filas: [
              ['Superior derecho', 'Hígado, vesícula, duodeno, ángulo hepático del colon'],
              ['Superior izquierdo', 'Estómago, bazo, páncreas (cola), ángulo esplénico del colon'],
              ['Inferior derecho', 'Ciego, apéndice, ovario y trompa derechos, uréter'],
              ['Inferior izquierdo', 'Colon sigmoide, ovario y trompa izquierdos, uréter'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'No olvides lo que está detrás', texto: 'Riñones, páncreas y grandes vasos son retroperitoneales: quedan por detrás de la cavidad y su sangrado puede no dar signos abdominales claros. Un retroperitoneo sangrante es de los escenarios más traicioneros del trauma.' },
        ],
      },
      {
        titulo: 'Cómo se explora',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'En este orden, y con las manos calientes',
            items: [
              'Inspección: heridas, abrasiones, marca del cinturón, equimosis, distensión, evisceración.',
              'Auscultación, si el entorno lo permite (en la escena rara vez aporta).',
              'Palpación suave, empezando POR EL CUADRANTE MÁS ALEJADO del dolor.',
              'Buscar defensa, rigidez y dolor a la descompresión.',
              'Reevaluar periódicamente: el abdomen cambia con el tiempo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace', texto: 'No se palpa profundamente ni se buscan signos de rebote con brusquedad: duele mucho, no aporta y puede agravar la lesión. Y nunca se explora una sola vez: la exploración seriada es lo que detecta el deterioro.' },
          {
            tipo: 'lista',
            titulo: 'Signos de irritación peritoneal',
            items: [
              'Defensa: el paciente contrae la pared al palpar.',
              'Rigidez: abdomen «en tabla», involuntaria.',
              'Dolor a la descompresión.',
              'El paciente evita moverse y flexiona las piernas.',
            ],
          },
          mnemotecnia('DOS LÍNEAS QUE SE CRUZAN EN EL OMBLIGO. Y una advertencia que no cabe en los cuadrantes: riñones, páncreas y grandes vasos están detrás, en el retroperitoneo, y su sangrado puede no dar signos abdominales claros.'),
          masPreguntado('Por dónde se empieza a palpar —por el cuadrante MÁS ALEJADO del dolor— y qué no se hace: palpación profunda o rebote con brusquedad, y explorar una sola vez. La exploración seriada es lo que detecta el deterioro.'),
        ],
      },
      erroresFrecuentes([
        ['Empezar a palpar donde duele', 'Se empieza por el cuadrante más alejado del dolor: si se empieza por el punto doloroso, el paciente contrae la pared y el resto de la exploración deja de servir.'],
        ['Buscar el rebote con brusquedad', 'Duele mucho, no aporta y puede agravar la lesión.'],
        ['Explorar una sola vez', 'El abdomen cambia con el tiempo. La exploración seriada es lo que detecta el deterioro.'],
        ['Olvidar el retroperitoneo', 'Riñones, páncreas y grandes vasos quedan por detrás de la cavidad, y su sangrado puede no dar signos abdominales claros. Un retroperitoneo sangrante es de los escenarios más traicioneros del trauma.'],
      ]),
      repasoRapido([
        'Dos líneas imaginarias que se cruzan en el ombligo dividen el abdomen en cuatro cuadrantes.',
        'Superior derecho: hígado, vesícula, duodeno y ángulo hepático del colon.',
        'Superior izquierdo: estómago, bazo, cola del páncreas y ángulo esplénico del colon.',
        'Inferior derecho: ciego, apéndice, ovario y trompa derechos, y uréter.',
        'Inferior izquierdo: colon sigmoide, ovario y trompa izquierdos, y uréter.',
        'Riñones, páncreas y grandes vasos son retroperitoneales: quedan detrás y su sangrado puede no dar signos claros.',
        'Exploración: inspección de heridas, abrasiones, marca del cinturón, equimosis, distensión y evisceración.',
        'Auscultación si el entorno lo permite, aunque en la escena rara vez aporta.',
        'Palpación suave empezando por el cuadrante más alejado del dolor.',
        'Buscar defensa, rigidez y dolor a la descompresión, y reevaluar periódicamente.',
        'No se palpa profundamente ni se busca el rebote con brusquedad.',
        'El signo del cinturón es una equimosis lineal que predice lesión intestinal y de columna lumbar.',
      ]),
      preguntasOrales([
        'Divide el abdomen en cuadrantes y di qué contiene cada uno.',
        '¿Qué órganos son retroperitoneales y por qué importa?',
        'Recorre el orden de la exploración abdominal.',
        '¿Por dónde se empieza a palpar, y por qué?',
        'Enumera los signos de irritación peritoneal.',
        '¿Qué no se hace al explorar un abdomen traumático?',
        '¿Por qué nunca se explora una sola vez?',
        '¿Qué predice el signo del cinturón?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Retroperitoneo', definicion: 'Espacio detrás de la cavidad peritoneal donde están riñones, páncreas y grandes vasos; su sangrado puede pasar inadvertido.' },
      { termino: 'Defensa abdominal', definicion: 'Contracción de la musculatura de la pared al palpar; signo de irritación peritoneal.' },
      { termino: 'Signo del cinturón', definicion: 'Equimosis lineal en la pared abdominal por el cinturón de seguridad; predice lesión intestinal y de columna lumbar.' },
    ],
    flashcards: [
      { frente: '¿Dónde empieza la palpación abdominal?', reverso: 'Por el cuadrante más alejado del dolor.' },
      { frente: '¿Qué órganos son retroperitoneales?', reverso: 'Riñones, páncreas y grandes vasos.' },
      { frente: '¿Qué predice el signo del cinturón?', reverso: 'Lesión intestinal y de columna lumbar.' },
      { frente: '¿Por qué se explora el abdomen varias veces?', reverso: 'Porque cambia con el tiempo: la exploración seriada detecta el deterioro.' },
    ],
    quiz: [
      {
        pregunta: 'Traumatismo en cuadrante superior izquierdo. ¿Qué órgano te preocupa más?',
        opciones: ['Hígado', 'Bazo', 'Apéndice', 'Vesícula'],
        correcta: 1,
        explicacion: 'El bazo ocupa el cuadrante superior izquierdo y es el órgano más frecuentemente lesionado en trauma cerrado.',
      },
      {
        pregunta: '¿Por dónde empiezas a palpar un abdomen doloroso en fosa ilíaca derecha?',
        opciones: [
          'Por la fosa ilíaca derecha, para confirmar el dolor.',
          'Por el cuadrante más alejado, dejando la zona dolorosa para el final.',
          'Por el epigastrio siempre.',
          'No se palpa si duele.',
        ],
        correcta: 1,
        explicacion: 'Empezar por la zona dolorosa provoca defensa voluntaria que enmascara el resto de la exploración.',
      },
      {
        pregunta: 'Encuentras una equimosis lineal transversal en el abdomen tras una colisión. ¿Qué implica?',
        opciones: [
          'Solo una contusión superficial.',
          'Signo del cinturón: alta sospecha de lesión intestinal y de columna lumbar.',
          'Lesión hepática segura.',
          'Nada relevante si el abdomen es blando.',
        ],
        correcta: 1,
        explicacion: 'La marca del cinturón se asocia con frecuencia a lesión de víscera hueca y a fractura por flexión-distracción de la columna lumbar.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la exploración abdominal',
        pasos: [
          'Inspección: heridas, marcas, distensión',
          'Auscultación si el entorno lo permite',
          'Palpación suave desde el cuadrante más alejado del dolor',
          'Buscar defensa y rigidez',
          'Reevaluar durante el traslado',
        ],
      },
    },
  },

  'm5-ta-bazo': {
    icono: 'cp-servier-bazo',
    duracion: '11 min',
    resumen: 'Lesión de bazo: el órgano más frecuentemente lesionado en trauma abdominal cerrado, y una causa clásica de shock.',
    objetivos: [
      'Reconocer la lesión esplénica por mecanismo y clínica.',
      'Identificar el signo de Kehr y explicar su origen.',
      'Anticipar la ruptura diferida.',
    ],
    secciones: [
      {
        titulo: 'Por qué el bazo',
        bloques: [
          { tipo: 'p', texto: 'Es un órgano muy vascularizado, de cápsula frágil, situado bajo las costillas inferiores izquierdas. Un golpe en el flanco izquierdo o una fractura de esas costillas basta para romperlo, y cuando lo hace sangra mucho.' },
          {
            tipo: 'lista',
            titulo: 'Cuándo sospecharlo',
            items: [
              'Impacto en flanco o hipocondrio izquierdo.',
              'Fractura de las costillas inferiores izquierdas.',
              'Dolor en cuadrante superior izquierdo.',
              'Shock sin hemorragia externa.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Signo de Kehr', texto: 'Dolor referido al HOMBRO IZQUIERDO por irritación del diafragma. La sangre acumulada bajo el diafragma estimula el nervio frénico, que comparte raíces con la inervación del hombro, y el cerebro localiza mal el origen. En un traumatizado, dolor de hombro izquierdo sin lesión en el hombro es sangre abdominal hasta demostrar lo contrario.' },
        ],
      },
      {
        titulo: 'Ruptura diferida',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Puede sangrar días después', texto: 'Un hematoma contenido por la cápsula puede romperse horas o días más tarde y provocar un shock brusco en alguien que ya se había ido a casa. Por eso todo mecanismo compatible se traslada y se valora, aunque el paciente esté bien en ese momento.' },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Oxígeno y tratamiento del shock.',
              'Prevención activa de la hipotermia.',
              'Nada por vía oral.',
              'Traslado urgente a centro quirúrgico y prealerta.',
              'Reevaluación frecuente: puede deteriorarse en el trayecto.',
            ],
          },
          mnemotecnia('DOLOR DE HOMBRO IZQUIERDO SIN LESIÓN EN EL HOMBRO ES SANGRE ABDOMINAL. Es el signo de Kehr: la sangre bajo el diafragma estimula el nervio frénico, que comparte raíces con la inervación del hombro, y el cerebro localiza mal el origen.'),
          masPreguntado('El signo de Kehr con su explicación, y la ruptura diferida: un hematoma contenido por la cápsula puede romperse horas o días más tarde y provocar un shock brusco en alguien que ya se había ido a casa.'),
        ],
      },
      erroresFrecuentes([
        ['Buscar la lesión en el hombro que duele', 'En un traumatizado, dolor de hombro izquierdo sin lesión en el hombro es sangre abdominal hasta demostrar lo contrario.'],
        ['Dejar marchar al paciente porque está bien', 'Un hematoma contenido por la cápsula puede romperse horas o días más tarde. Todo mecanismo compatible se traslada y se valora.'],
        ['No relacionar las costillas inferiores izquierdas con el bazo', 'El bazo está bajo esas costillas: su fractura basta para romperlo, y cuando lo hace sangra mucho.'],
        ['No reevaluar durante el trayecto', 'Puede deteriorarse en el traslado, y la reevaluación frecuente es lo que lo detecta.'],
      ]),
      repasoRapido([
        'Es el órgano más frecuentemente lesionado en trauma abdominal cerrado.',
        'Es muy vascularizado, de cápsula frágil y situado bajo las costillas inferiores izquierdas.',
        'Un golpe en el flanco izquierdo o una fractura de esas costillas basta para romperlo.',
        'Cuando se rompe, sangra mucho: es una causa clásica de shock.',
        'Se sospecha ante impacto en flanco o hipocondrio izquierdo y ante fractura de costillas inferiores izquierdas.',
        'También ante dolor en cuadrante superior izquierdo y ante shock sin hemorragia externa.',
        'Signo de Kehr: dolor referido al hombro izquierdo por irritación del diafragma.',
        'La sangre bajo el diafragma estimula el nervio frénico, que comparte raíces con la inervación del hombro.',
        'Ruptura diferida: un hematoma contenido por la cápsula puede romperse horas o días más tarde.',
        'Puede provocar un shock brusco en alguien que ya se había ido a casa.',
        'Por eso todo mecanismo compatible se traslada y se valora, aunque el paciente esté bien.',
        'Manejo: oxígeno y tratamiento del shock, prevención activa de la hipotermia, nada por vía oral, traslado urgente con prealerta y reevaluación frecuente.',
      ]),
      preguntasOrales([
        '¿Por qué el bazo se lesiona con tanta frecuencia?',
        'Enumera cuándo hay que sospecharlo.',
        'Di qué es el signo de Kehr y explica su origen.',
        '¿Qué significa un dolor de hombro izquierdo en un traumatizado?',
        'Explica la ruptura diferida.',
        '¿Por qué se traslada a un paciente que está bien?',
        'Recorre el manejo.',
        '¿Qué relación tienen las costillas inferiores izquierdas con este cuadro?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Signo de Kehr', definicion: 'Dolor referido al hombro izquierdo por irritación diafragmática, típicamente por sangre de origen esplénico.' },
      { termino: 'Ruptura diferida', definicion: 'Sangrado que aparece horas o días después del traumatismo, al romperse un hematoma inicialmente contenido.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el órgano más lesionado en trauma abdominal cerrado?', reverso: 'El bazo.' },
      { frente: '¿Qué es el signo de Kehr?', reverso: 'Dolor referido al hombro izquierdo por irritación diafragmática (sangre bajo el diafragma).' },
      { frente: '¿Por qué se traslada aunque esté bien?', reverso: 'Por el riesgo de ruptura diferida horas o días después.' },
      { frente: 'Fractura de costillas inferiores izquierdas: ¿qué órgano?', reverso: 'El bazo.' },
    ],
    quiz: [
      {
        pregunta: 'Caída de bicicleta con golpe en flanco izquierdo. Refiere dolor en el hombro izquierdo pero el hombro es normal. ¿Qué sospechas?',
        opciones: [
          'Luxación de hombro.',
          'Lesión esplénica con signo de Kehr.',
          'Lesión de plexo braquial.',
          'Contractura muscular.',
        ],
        correcta: 1,
        explicacion: 'El dolor referido al hombro izquierdo sin lesión local es característico de irritación diafragmática por sangre esplénica.',
      },
      {
        pregunta: 'El paciente está estable y quiere irse a casa. ¿Qué le explicas?',
        opciones: [
          'Que puede irse: está estable.',
          'Que el bazo puede romperse de forma diferida y necesita valoración hospitalaria.',
          'Que vuelva si le duele más en una semana.',
          'Que se aplique hielo.',
        ],
        correcta: 1,
        explicacion: 'La ruptura diferida es la razón por la que el mecanismo compatible exige traslado, aunque en ese momento el paciente parezca bien.',
      },
    ],
    actividades: null,
  },

  'm5-ta-higado': {
    icono: 'cp-servier-higado',
    duracion: '11 min',
    resumen: 'Lesión hepática: el órgano abdominal más grande y una de las principales fuentes de hemorragia masiva en trauma.',
    objetivos: [
      'Reconocer la lesión hepática por mecanismo y localización.',
      'Relacionar su vascularización con la gravedad del sangrado.',
      'Priorizar el traslado sobre cualquier maniobra en la escena.',
    ],
    secciones: [
      {
        titulo: 'Un órgano grande y lleno de sangre',
        bloques: [
          { tipo: 'p', texto: 'El hígado ocupa casi todo el cuadrante superior derecho y recibe un flujo enorme por la arteria hepática y la vena porta. Es frágil ante golpes y desaceleraciones, y su lesión puede producir una hemorragia masiva en minutos.' },
          {
            tipo: 'lista',
            titulo: 'Cuándo sospecharla',
            items: [
              'Impacto en hipocondrio derecho o parrilla costal inferior derecha.',
              'Fractura de costillas inferiores derechas.',
              'Herida penetrante en esa zona o toracoabdominal derecha.',
              'Shock desproporcionado a lo que se ve.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'También puede dar dolor referido', texto: 'Por el mismo mecanismo frénico que el bazo, la sangre bajo el hemidiafragma derecho puede referir dolor al hombro derecho.' },
        ],
      },
      {
        titulo: 'Qué se puede hacer y qué no',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No hay maniobra que detenga esto en la escena', texto: 'A diferencia de una extremidad, aquí no hay presión directa ni torniquete posible. La hemorragia hepática se resuelve en quirófano o en radiología intervencionista. Cada minuto de demora en la escena es sangre perdida.' },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Oxígeno y tratamiento del shock según protocolo.',
              'Prevención agresiva de la hipotermia: la coagulopatía empeora un sangrado que ya no se puede comprimir.',
              'Traslado inmediato a centro quirúrgico, con prealerta.',
              'Los procedimientos que puedan hacerse en marcha, se hacen en marcha.',
            ],
          },
          mnemotecnia('AQUÍ NO HAY TORNIQUETE. A diferencia de una extremidad, no hay presión directa posible: la hemorragia hepática se resuelve en quirófano o en radiología intervencionista. Cada minuto de demora en la escena es sangre perdida.'),
          masPreguntado('Que no existe maniobra que detenga esto en la escena, y su consecuencia: lo que pueda hacerse en marcha se hace en marcha. Y que también puede referir dolor al hombro derecho, por el mismo mecanismo frénico que el bazo.'),
        ],
      },
      erroresFrecuentes([
        ['Intentar controlar el sangrado en la escena', 'No hay presión directa ni torniquete posible. La hemorragia hepática se resuelve en quirófano o en radiología intervencionista.'],
        ['Completar procedimientos antes de salir', 'Cada minuto de demora es sangre perdida. Los procedimientos que puedan hacerse en marcha, se hacen en marcha.'],
        ['Descuidar la hipotermia', 'La coagulopatía empeora un sangrado que ya no se puede comprimir: la prevención tiene que ser agresiva.'],
        ['No pensar en el hígado ante un dolor de hombro derecho', 'La sangre bajo el hemidiafragma derecho puede referir dolor al hombro derecho, por el mismo mecanismo frénico que el bazo.'],
      ]),
      repasoRapido([
        'El hígado ocupa casi todo el cuadrante superior derecho.',
        'Recibe un flujo enorme por la arteria hepática y la vena porta.',
        'Es frágil ante golpes y desaceleraciones, y su lesión puede producir hemorragia masiva en minutos.',
        'Se sospecha ante impacto en hipocondrio derecho o parrilla costal inferior derecha.',
        'También ante fractura de costillas inferiores derechas.',
        'Y ante herida penetrante en esa zona o toracoabdominal derecha.',
        'Y ante un shock desproporcionado a lo que se ve.',
        'Puede referir dolor al hombro derecho por el mecanismo frénico.',
        'No hay maniobra que detenga esta hemorragia en la escena.',
        'El tratamiento es quirófano o radiología intervencionista.',
        'Manejo: oxígeno, tratamiento del shock según protocolo y prevención agresiva de la hipotermia.',
        'Traslado inmediato a centro quirúrgico con prealerta, y lo que pueda hacerse en marcha se hace en marcha.',
      ]),
      preguntasOrales([
        '¿Por qué el hígado sangra tanto?',
        'Enumera cuándo hay que sospechar lesión hepática.',
        '¿Por qué puede doler el hombro derecho?',
        '¿Qué maniobra detiene esta hemorragia en la escena?',
        'Entonces, ¿qué se hace?',
        '¿Por qué la prevención de la hipotermia es agresiva aquí?',
        '¿Dónde se resuelve el sangrado hepático?',
        '¿Qué significa «lo que pueda hacerse en marcha»?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Lesión hepática', definicion: 'Laceración o estallido del hígado, fuente frecuente de hemorragia masiva en trauma abdominal.' },
      { termino: 'Hemorragia no compresible', definicion: 'Sangrado que no puede controlarse con presión externa; exige control quirúrgico.' },
    ],
    flashcards: [
      { frente: '¿En qué cuadrante está el hígado?', reverso: 'Superior derecho.' },
      { frente: '¿Se puede controlar una hemorragia hepática en la escena?', reverso: 'No: es no compresible. El control es quirúrgico.' },
      { frente: '¿Por qué es crítica la hipotermia aquí?', reverso: 'Porque la coagulopatía empeora un sangrado que no se puede comprimir.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión con impacto en hipocondrio derecho. TA 82/50, FC 134, abdomen doloroso. ¿Cuál es tu prioridad?',
        opciones: [
          'Completar la exploración detallada en la escena.',
          'Traslado inmediato con prealerta a centro quirúrgico, tratando el shock en marcha.',
          'Aplicar presión sobre el hipocondrio derecho.',
          'Esperar refuerzos para una valoración más completa.',
        ],
        correcta: 1,
        explicacion: 'La hemorragia hepática no se controla fuera del quirófano; lo único que mejora el pronóstico es acortar el tiempo hasta él.',
      },
      {
        pregunta: 'Dolor referido al hombro DERECHO en un traumatizado abdominal sugiere:',
        opciones: [
          'Lesión esplénica.',
          'Irritación del hemidiafragma derecho, posiblemente por sangre de origen hepático.',
          'Fractura de clavícula.',
          'Neumotórax izquierdo.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo es el mismo que el signo de Kehr, pero del lado derecho.',
      },
    ],
    actividades: null,
  },

  'm5-ta-estomago': {
    icono: 'cp-servier-estomago',
    duracion: '9 min',
    resumen: 'Lesión gástrica: poco frecuente en trauma cerrado, más habitual en penetrante. Su contenido ácido irrita el peritoneo de inmediato.',
    objetivos: [
      'Identificar los mecanismos de lesión gástrica.',
      'Reconocer la peritonitis química por vertido ácido.',
      'Aplicar la conducta prehospitalaria correcta.',
    ],
    secciones: [
      {
        titulo: 'Cuándo ocurre',
        bloques: [
          { tipo: 'p', texto: 'El estómago está protegido por la parrilla costal y es móvil, así que rara vez se rompe en trauma cerrado; cuando ocurre suele ser por un golpe directo con el estómago lleno, que se comporta como una bolsa a presión. En trauma penetrante epigástrico es bastante más frecuente.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Peritonitis química', texto: 'A diferencia del intestino, cuyo contenido tarda en dar clínica, el jugo gástrico es muy ácido e irrita el peritoneo casi de inmediato. Por eso la lesión gástrica suele doler pronto y con intensidad.' },
          {
            tipo: 'lista',
            titulo: 'Signos',
            items: [
              'Dolor epigástrico intenso y precoz.',
              'Defensa y rigidez de la pared.',
              'Náusea y vómito, a veces con sangre.',
              'En penetrante, herida epigástrica o toracoabdominal.',
            ],
          },
        ],
      },
      {
        titulo: 'Manejo',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Nada por vía oral.',
              'Oxígeno y tratamiento del shock si lo hay.',
              'Posición cómoda; muchos pacientes toleran mejor las rodillas flexionadas.',
              'Traslado a centro quirúrgico con la sospecha comunicada.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Un dato que vale la pena registrar', texto: 'Cuándo comió por última vez. Un estómago lleno cambia la probabilidad de ruptura en trauma cerrado y también el riesgo de broncoaspiración si hay que asegurar la vía aérea.' },
          mnemotecnia('EL JUGO GÁSTRICO NO ESPERA. Es muy ácido e irrita el peritoneo casi de inmediato, a diferencia del contenido intestinal, que tarda horas. Por eso la lesión gástrica duele pronto y con intensidad.'),
          masPreguntado('La peritonitis química y su contraste con el intestino, y el dato que vale la pena registrar: cuándo comió por última vez. Un estómago lleno cambia la probabilidad de ruptura en trauma cerrado y el riesgo de broncoaspiración si hay que asegurar la vía aérea.'),
        ],
      },
      erroresFrecuentes([
        ['Esperar una clínica tardía como en el intestino', 'El jugo gástrico es muy ácido e irrita el peritoneo casi de inmediato. El dolor es precoz e intenso.'],
        ['No preguntar cuándo comió', 'Un estómago lleno se comporta como una bolsa a presión y cambia la probabilidad de ruptura, además del riesgo de broncoaspiración.'],
        ['Dar algo por vía oral', 'Está contraindicado: el paciente puede requerir cirugía.'],
        ['Descartarla porque el trauma fue cerrado', 'Es poco frecuente en cerrado porque el estómago está protegido por la parrilla costal y es móvil, pero un golpe directo con el estómago lleno puede romperlo.'],
      ]),
      repasoRapido([
        'El estómago está protegido por la parrilla costal y es móvil: rara vez se rompe en trauma cerrado.',
        'Cuando ocurre en cerrado suele ser por un golpe directo con el estómago lleno, que se comporta como una bolsa a presión.',
        'En trauma penetrante epigástrico es bastante más frecuente.',
        'El jugo gástrico es muy ácido e irrita el peritoneo casi de inmediato: peritonitis química.',
        'A diferencia del intestino, cuyo contenido tarda en dar clínica.',
        'Por eso la lesión gástrica suele doler pronto y con intensidad.',
        'Signos: dolor epigástrico intenso y precoz.',
        'Defensa y rigidez de la pared.',
        'Náusea y vómito, a veces con sangre.',
        'En penetrante, herida epigástrica o toracoabdominal.',
        'Manejo: nada por vía oral, oxígeno y tratamiento del shock si lo hay, posición cómoda con rodillas flexionadas si la tolera.',
        'Traslado a centro quirúrgico con la sospecha comunicada, y registro de cuándo comió por última vez.',
      ]),
      preguntasOrales([
        '¿Por qué el estómago se rompe poco en trauma cerrado?',
        '¿Cuándo sí ocurre en trauma cerrado?',
        'Explica qué es la peritonitis química.',
        '¿En qué se diferencia del contenido intestinal?',
        'Enumera los signos.',
        'Recorre el manejo.',
        '¿Por qué se registra cuándo comió por última vez?',
        '¿Qué posición suele tolerar mejor el paciente?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Peritonitis química', definicion: 'Irritación del peritoneo por contenido ácido o biliar, de instauración rápida.' },
      { termino: 'Hematemesis', definicion: 'Vómito con sangre.' },
    ],
    flashcards: [
      { frente: '¿Por qué la lesión gástrica duele pronto?', reverso: 'Porque el jugo gástrico es muy ácido e irrita el peritoneo de inmediato.' },
      { frente: '¿Qué factor aumenta el riesgo de ruptura gástrica en trauma cerrado?', reverso: 'Tener el estómago lleno.' },
      { frente: 'Conducta básica ante sospecha de lesión de víscera hueca', reverso: 'Nada por vía oral y traslado a centro quirúrgico.' },
    ],
    quiz: [
      {
        pregunta: 'Herida por arma blanca en epigastrio, dolor intenso, abdomen en tabla. ¿Qué sospechas?',
        opciones: [
          'Contusión de pared.',
          'Perforación de víscera hueca con peritonitis.',
          'Lesión esplénica.',
          'Neumotórax.',
        ],
        correcta: 1,
        explicacion: 'El abdomen en tabla con herida epigástrica indica irritación peritoneal por vertido de contenido.',
      },
      {
        pregunta: '¿Por qué registrar la hora de la última comida?',
        opciones: [
          'Para calcular la glucosa.',
          'Porque el estómago lleno aumenta el riesgo de ruptura y de broncoaspiración.',
          'Para decidir la analgesia.',
          'No tiene relevancia.',
        ],
        correcta: 1,
        explicacion: 'Es un dato que cambia tanto la probabilidad de la lesión como el manejo de la vía aérea.',
      },
    ],
    actividades: null,
  },

  'm5-ta-pancreas': {
    icono: 'cp-servier-pancreas',
    duracion: '10 min',
    resumen: 'Lesión pancreática: retroperitoneal, silenciosa al principio y de diagnóstico difícil. El clásico «manillar en el epigastrio».',
    objetivos: [
      'Reconocer el mecanismo típico de lesión pancreática.',
      'Explicar por qué su localización retroperitoneal retrasa el diagnóstico.',
      'Documentar el mecanismo para orientar la atención posterior.',
    ],
    secciones: [
      {
        titulo: 'El mecanismo clásico',
        bloques: [
          { tipo: 'p', texto: 'El páncreas está aplastado contra la columna vertebral. Un impacto puntual en el epigastrio —el manillar de una bicicleta, el volante, un puñetazo, el borde de un asiento— lo comprime contra el hueso y lo puede partir.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Sospecha en el niño con el manillar', texto: 'Es un mecanismo tan característico que merece la pena recordarlo: niño que cae de la bicicleta y se golpea el epigastrio con el manillar. Puede parecer bien durante horas y tener una lesión pancreática o duodenal.' },
        ],
      },
      {
        titulo: 'Por qué se diagnostica tarde',
        bloques: [
          { tipo: 'p', texto: 'Al ser retroperitoneal, su sangrado y su vertido enzimático quedan por detrás de la cavidad: el peritoneo tarda en irritarse y los signos abdominales aparecen tarde. Las enzimas pancreáticas, además, digieren los tejidos vecinos y provocan un cuadro progresivo.' },
          {
            tipo: 'lista',
            titulo: 'Signos, a menudo escasos al principio',
            items: [
              'Dolor epigástrico que puede irradiar a la espalda, «en cinturón».',
              'Equimosis en epigastrio por el mecanismo.',
              'Náusea y vómito.',
              'Deterioro progresivo en las horas siguientes.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Nada por vía oral.',
              'Tratamiento del shock si aparece; oxígeno.',
              'Documentar el mecanismo con precisión: es la clave del diagnóstico posterior.',
              'Traslado y prealerta, aunque el paciente esté aparentemente bien.',
            ],
          },
          mnemotecnia('APLASTADO CONTRA LA COLUMNA. Un impacto puntual en el epigastrio —manillar, volante, puñetazo, borde de un asiento— comprime el páncreas contra el hueso y lo puede partir. Y como es retroperitoneal, los signos abdominales tardan.'),
          masPreguntado('El mecanismo del manillar en el niño, y por qué se diagnostica tarde: al ser retroperitoneal, su sangrado y su vertido enzimático quedan por detrás de la cavidad y el peritoneo tarda en irritarse. Puede parecer bien durante horas.'),
        ],
      },
      erroresFrecuentes([
        ['Dar el alta mental porque el paciente está bien', 'Puede parecer bien durante horas y tener una lesión pancreática o duodenal. Se traslada y se prealerta aunque esté aparentemente bien.'],
        ['Esperar signos abdominales claros', 'Es retroperitoneal: su sangrado y sus enzimas quedan detrás de la cavidad, y el peritoneo tarda en irritarse.'],
        ['No documentar el mecanismo con precisión', 'Es la clave del diagnóstico posterior: sin el antecedente del golpe epigástrico puntual, nadie va a buscar ahí.'],
        ['Dar algo por vía oral', 'Está contraindicado, como en el resto del trauma abdominal con posible indicación quirúrgica.'],
      ]),
      repasoRapido([
        'El páncreas queda aplastado contra la columna vertebral.',
        'Un impacto puntual en el epigastrio lo comprime contra el hueso y lo puede partir.',
        'Mecanismos típicos: manillar de bicicleta, volante, puñetazo, borde de un asiento.',
        'El mecanismo del niño que cae de la bicicleta y se golpea el epigastrio con el manillar es característico.',
        'Al ser retroperitoneal, su sangrado y su vertido enzimático quedan por detrás de la cavidad.',
        'El peritoneo tarda en irritarse y los signos abdominales aparecen tarde.',
        'Las enzimas pancreáticas digieren los tejidos vecinos y provocan un cuadro progresivo.',
        'Signos, a menudo escasos al principio: dolor epigástrico que puede irradiar a la espalda, en cinturón.',
        'También equimosis en epigastrio por el mecanismo, náusea y vómito.',
        'Y deterioro progresivo en las horas siguientes.',
        'Manejo: nada por vía oral, tratamiento del shock si aparece y oxígeno.',
        'Documentar el mecanismo con precisión, y trasladar y prealertar aunque el paciente esté aparentemente bien.',
      ]),
      preguntasOrales([
        'Describe el mecanismo típico de lesión pancreática.',
        '¿Por qué el páncreas se parte contra la columna?',
        '¿Cuál es el mecanismo que hay que recordar en el niño?',
        'Explica por qué se diagnostica tarde.',
        '¿Qué hacen las enzimas pancreáticas en los tejidos vecinos?',
        'Enumera los signos y di por qué son escasos al principio.',
        '¿Qué es el dolor en cinturón?',
        '¿Por qué es tan importante documentar el mecanismo?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Lesión pancreática', definicion: 'Contusión o sección del páncreas por compresión contra la columna vertebral; de diagnóstico tardío por su situación retroperitoneal.' },
      { termino: 'Dolor en cinturón', definicion: 'Dolor epigástrico que irradia hacia la espalda, característico de la patología pancreática.' },
    ],
    flashcards: [
      { frente: 'Mecanismo clásico de lesión pancreática', reverso: 'Impacto epigástrico puntual (manillar, volante) que comprime el páncreas contra la columna.' },
      { frente: '¿Por qué se diagnostica tarde?', reverso: 'Porque es retroperitoneal: el peritoneo tarda en irritarse.' },
      { frente: '¿Qué aporta el TUM en esta lesión?', reverso: 'Documentar el mecanismo con precisión y trasladar pese a la aparente normalidad.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 9 años que cayó de la bicicleta y se golpeó el epigastrio con el manillar. Ahora está bien. ¿Qué haces?',
        opciones: [
          'Alta en el lugar: está asintomático.',
          'Trasladas y comunicas el mecanismo: sospecha de lesión pancreática o duodenal.',
          'Le das analgesia oral y observas en casa.',
          'Aplicas hielo y control en 48 h.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo es característico y la lesión puede tardar horas en manifestarse; el antecedente bien comunicado es lo que permite buscarla.',
      },
      {
        pregunta: 'La localización retroperitoneal del páncreas implica que:',
        opciones: [
          'Sangra más rápido.',
          'Los signos peritoneales aparecen tarde o son escasos.',
          'Se palpa con facilidad.',
          'No puede lesionarse en trauma cerrado.',
        ],
        correcta: 1,
        explicacion: 'Al estar fuera de la cavidad peritoneal, la irritación del peritoneo es tardía y la exploración inicial puede ser anodina.',
      },
    ],
    actividades: null,
  },

  'm5-ta-intestino': {
    icono: 'cp-servier-intestino',
    duracion: '11 min',
    resumen: 'Lesión intestinal: perforación que vierte contenido séptico. Se manifiesta tarde y es la trampa del paciente que «estaba bien».',
    objetivos: [
      'Reconocer los mecanismos que perforan el intestino.',
      'Asociar el signo del cinturón con lesión intestinal y lumbar.',
      'Explicar por qué la clínica es diferida.',
    ],
    secciones: [
      {
        titulo: 'Cómo se rompe',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Compresión directa contra la columna, típicamente por el cinturón de seguridad mal colocado sobre el abdomen en vez de sobre la pelvis.',
              'Desaceleración: el asa se desgarra en sus puntos de anclaje fijos.',
              'Aumento brusco de presión con el asa llena («asa cerrada»).',
              'Trauma penetrante.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El signo del cinturón', texto: 'Una equimosis lineal transversal en el abdomen predice lesión intestinal y también fractura de columna lumbar por flexión-distracción. Encontrarla obliga a buscar las dos cosas, aunque el paciente esté cómodo.' },
        ],
      },
      {
        titulo: 'Por qué engaña',
        bloques: [
          { tipo: 'p', texto: 'El contenido intestinal es séptico pero no es tan irritante de entrada como el jugo gástrico. La peritonitis tarda horas en instalarse, así que la exploración inicial puede ser casi normal y el paciente puede parecer estable en la escena.' },
          {
            tipo: 'lista',
            titulo: 'Clínica cuando aparece',
            items: [
              'Dolor abdominal creciente y difuso.',
              'Defensa y rigidez progresivas.',
              'Fiebre y taquicardia.',
              'Distensión abdominal.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Nada por vía oral.',
              'Oxígeno; tratar el shock si aparece.',
              'Restricción del movimiento espinal si hay signo del cinturón o dolor lumbar.',
              'Traslado y prealerta con el mecanismo descrito.',
            ],
          },
          mnemotecnia('EL CINTURÓN VA SOBRE LA PELVIS, NO SOBRE EL ABDOMEN. Mal colocado, comprime el intestino contra la columna. Y la equimosis lineal que deja predice dos cosas: lesión intestinal y fractura de columna lumbar por flexión-distracción.'),
          masPreguntado('El signo del cinturón y sus dos predicciones, y por qué la clínica es diferida: el contenido intestinal es séptico pero no tan irritante de entrada como el jugo gástrico, así que la peritonitis tarda horas y la exploración inicial puede ser casi normal.'),
        ],
      },
      erroresFrecuentes([
        ['Descartar lesión porque el abdomen está cómodo', 'La peritonitis tarda horas en instalarse. La exploración inicial puede ser casi normal y el paciente parecer estable en la escena.'],
        ['Ver el signo del cinturón y buscar solo el intestino', 'Predice también fractura de columna lumbar por flexión-distracción. Hay que buscar las dos cosas.'],
        ['No restringir el movimiento espinal con signo del cinturón', 'Si hay signo del cinturón o dolor lumbar, corresponde restricción del movimiento espinal por el riesgo de lesión lumbar asociada.'],
        ['Dar algo por vía oral', 'Está contraindicado: hay perforación posible y probable indicación quirúrgica.'],
      ]),
      repasoRapido([
        'Se rompe por compresión directa contra la columna, típicamente por el cinturón mal colocado sobre el abdomen en vez de sobre la pelvis.',
        'También por desaceleración, que desgarra el asa en sus puntos de anclaje fijos.',
        'También por aumento brusco de presión con el asa llena, el mecanismo de asa cerrada.',
        'Y por trauma penetrante.',
        'El signo del cinturón es una equimosis lineal transversal en el abdomen.',
        'Predice lesión intestinal y también fractura de columna lumbar por flexión-distracción.',
        'Encontrarlo obliga a buscar las dos cosas, aunque el paciente esté cómodo.',
        'El contenido intestinal es séptico pero no tan irritante de entrada como el jugo gástrico.',
        'La peritonitis tarda horas en instalarse: la exploración inicial puede ser casi normal.',
        'Clínica cuando aparece: dolor creciente y difuso, defensa y rigidez progresivas, fiebre, taquicardia y distensión.',
        'Manejo: nada por vía oral, oxígeno y tratar el shock si aparece.',
        'Restricción del movimiento espinal si hay signo del cinturón o dolor lumbar, y traslado con prealerta describiendo el mecanismo.',
      ]),
      preguntasOrales([
        'Enumera los mecanismos que perforan el intestino.',
        '¿Dónde debe ir colocado el cinturón, y qué pasa si va sobre el abdomen?',
        '¿Qué es el signo del cinturón y qué dos cosas predice?',
        'Explica por qué la clínica es diferida.',
        '¿En qué se diferencia del jugo gástrico?',
        'Nombra la clínica cuando aparece.',
        '¿Qué añades al manejo si hay signo del cinturón?',
        'El abdomen está cómodo en la escena. ¿Qué puedes descartar?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Perforación intestinal', definicion: 'Solución de continuidad del intestino que vierte contenido séptico al peritoneo.' },
      { termino: 'Lesión por flexión-distracción', definicion: 'Fractura de columna lumbar asociada al mecanismo del cinturón abdominal.' },
    ],
    flashcards: [
      { frente: '¿Por qué la lesión intestinal se manifiesta tarde?', reverso: 'Porque la peritonitis por contenido intestinal tarda horas en instalarse.' },
      { frente: '¿Qué dos lesiones predice el signo del cinturón?', reverso: 'Lesión intestinal y fractura lumbar por flexión-distracción.' },
      { frente: '¿Dónde debe ir el cinturón para no lesionar el intestino?', reverso: 'Sobre la pelvis, no sobre el abdomen.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión frontal. El paciente está estable y sin dolor importante, pero tiene una equimosis lineal transversal en el abdomen. ¿Qué haces?',
        opciones: [
          'Alta en el lugar: está estable.',
          'Trasladas: el signo del cinturón predice lesión intestinal y lumbar de manifestación tardía.',
          'Solo inmovilizas la columna.',
          'Le das analgesia y observas 30 minutos.',
        ],
        correcta: 1,
        explicacion: 'La clínica es diferida: la ausencia de síntomas en la escena no descarta la lesión, y esa marca es un predictor conocido.',
      },
      {
        pregunta: '¿Qué diferencia la peritonitis por lesión intestinal de la gástrica?',
        opciones: [
          'La intestinal duele antes.',
          'La gástrica es química y precoz; la intestinal es séptica y más tardía.',
          'Ninguna: son iguales.',
          'La intestinal no produce peritonitis.',
        ],
        correcta: 1,
        explicacion: 'La acidez del jugo gástrico irrita de inmediato; el contenido intestinal tarda más pero es séptico.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El cinturón de seguridad debe apoyarse sobre ___, no sobre el abdomen.',
          opciones: ['el tórax', 'la pelvis', 'el ombligo'],
          correcta: 1,
          explicacion: 'Sobre la pelvis la fuerza se transmite al hueso; sobre el abdomen comprime las vísceras contra la columna.',
        },
      ],
    },
  },

  'm5-ta-genitourinaria': {
    icono: 'cp-servier-vejiga',
    duracion: '12 min',
    resumen: 'Lesión genitourinaria: riñón, vejiga y uretra. Incluye la contraindicación prehospitalaria más citada del trauma pélvico.',
    objetivos: [
      'Reconocer las lesiones renal, vesical y uretral por su mecanismo.',
      'Identificar los signos de lesión uretral.',
      'Aplicar la contraindicación del sondaje ante sospecha uretral.',
    ],
    secciones: [
      {
        titulo: 'Riñón',
        bloques: [
          { tipo: 'p', texto: 'Retroperitoneal y protegido por las últimas costillas y la musculatura lumbar. Se lesiona por impacto en flanco o espalda, o por desaceleración que desgarra su pedículo vascular.' },
          {
            tipo: 'lista',
            titulo: 'Signos',
            items: [
              'Dolor en flanco o región lumbar.',
              'Equimosis en el flanco.',
              'Hematuria: sangre en la orina, macroscópica o no.',
              'Fractura de las últimas costillas o de apófisis transversas lumbares.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La hematuria no mide la gravedad', texto: 'Puede haber lesión renal grave sin sangre visible en la orina —una avulsión del pedículo vascular puede cursar sin hematuria— y hematuria llamativa con lesión leve. Se valora el mecanismo, no el color de la orina.' },
        ],
      },
      {
        titulo: 'Vejiga y uretra',
        bloques: [
          { tipo: 'p', texto: 'La vejiga llena se rompe con más facilidad ante un golpe abdominal bajo, y también por espículas óseas en la fractura pélvica. La uretra, sobre todo en el varón, se lesiona en fracturas de pelvis y en caídas a horcajadas.' },
          {
            tipo: 'lista',
            titulo: 'Signos de lesión uretral',
            items: [
              'Sangre en el meato urinario.',
              'Hematoma perineal o escrotal.',
              'Imposibilidad de orinar pese al deseo.',
              'Fractura de pelvis conocida o sospechada.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Contraindicación clásica', texto: 'Ante sangre en el meato urinario u otros signos de lesión uretral, NO se coloca sonda vesical. Una uretra parcialmente desgarrada puede convertirse en una sección completa al forzar la sonda, con secuelas permanentes. Es una decisión que se documenta y se comunica en la entrega.' },
          {
            tipo: 'lista',
            titulo: 'Manejo general',
            items: [
              'Tratar el shock: la fractura pélvica sangra masivamente.',
              'Estabilización pélvica según protocolo si se sospecha fractura.',
              'No sondar ante signos uretrales.',
              'Preservar la intimidad del paciente durante la exploración.',
              'Traslado y prealerta.',
            ],
          },
          mnemotecnia('SANGRE EN EL MEATO, NO SE SONDA. Una uretra parcialmente desgarrada puede convertirse en una sección completa al forzar la sonda, con secuelas permanentes. Es la contraindicación más citada del trauma pélvico.'),
          masPreguntado('La contraindicación del sondaje ante signos uretrales, y que la hematuria no mide la gravedad: puede haber lesión renal grave sin sangre visible —una avulsión del pedículo vascular puede cursar sin hematuria— y hematuria llamativa con lesión leve.'),
        ],
      },
      erroresFrecuentes([
        ['Sondar ante sangre en el meato urinario', 'Una uretra parcialmente desgarrada puede convertirse en una sección completa al forzar la sonda, con secuelas permanentes. La decisión de no sondar se documenta y se comunica.'],
        ['Medir la gravedad renal por el color de la orina', 'Puede haber lesión renal grave sin hematuria visible, y hematuria llamativa con lesión leve. Se valora el mecanismo.'],
        ['Olvidar que la fractura pélvica sangra', 'Sangra masivamente. El tratamiento del shock y la estabilización pélvica según protocolo van por delante de todo lo demás.'],
        ['Explorar sin cuidar la intimidad', 'La preservación de la intimidad del paciente forma parte de la exploración, no es un añadido opcional.'],
      ]),
      repasoRapido([
        'El riñón es retroperitoneal y está protegido por las últimas costillas y la musculatura lumbar.',
        'Se lesiona por impacto en flanco o espalda, o por desaceleración que desgarra su pedículo vascular.',
        'Signos renales: dolor en flanco o región lumbar, equimosis en el flanco y hematuria.',
        'También fractura de las últimas costillas o de apófisis transversas lumbares.',
        'La hematuria no mide la gravedad: puede faltar en una lesión grave y ser llamativa en una leve.',
        'La vejiga llena se rompe con más facilidad ante un golpe abdominal bajo.',
        'También por espículas óseas en la fractura pélvica.',
        'La uretra, sobre todo en el varón, se lesiona en fracturas de pelvis y en caídas a horcajadas.',
        'Signos uretrales: sangre en el meato, hematoma perineal o escrotal e imposibilidad de orinar pese al deseo.',
        'También la fractura de pelvis conocida o sospechada.',
        'Ante signos uretrales NO se coloca sonda vesical.',
        'Manejo: tratar el shock porque la fractura pélvica sangra masivamente, estabilización pélvica según protocolo, no sondar, preservar la intimidad y trasladar con prealerta.',
      ]),
      preguntasOrales([
        '¿Cómo se lesiona el riñón y por qué está relativamente protegido?',
        'Enumera los signos de lesión renal.',
        '¿Mide la hematuria la gravedad? Justifícalo.',
        '¿Cuándo se rompe la vejiga con más facilidad?',
        '¿En qué mecanismos se lesiona la uretra?',
        'Di los signos de lesión uretral.',
        '¿Qué está contraindicado ante esos signos, y por qué?',
        'Recorre el manejo general.',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Hematuria', definicion: 'Presencia de sangre en la orina; su ausencia no descarta lesión renal grave.' },
      { termino: 'Lesión uretral', definicion: 'Desgarro de la uretra, frecuente en fractura de pelvis y caídas a horcajadas; contraindica el sondaje.' },
      { termino: 'Caída a horcajadas', definicion: 'Mecanismo en que el periné impacta contra una superficie estrecha; típico de lesión uretral.' },
    ],
    flashcards: [
      { frente: 'Sangre en el meato urinario: ¿qué NO se hace?', reverso: 'No se coloca sonda vesical: puede completar el desgarro uretral.' },
      { frente: '¿La ausencia de hematuria descarta lesión renal?', reverso: 'No: una avulsión del pedículo vascular puede cursar sin ella.' },
      { frente: '¿Por qué la vejiga llena se rompe más fácil?', reverso: 'Porque asciende del hueco pélvico y queda expuesta al golpe abdominal bajo.' },
      { frente: 'Signos de lesión uretral', reverso: 'Sangre en meato, hematoma perineal o escrotal, imposibilidad de orinar, fractura pélvica.' },
    ],
    quiz: [
      {
        pregunta: 'Fractura de pelvis, sangre en el meato urinario. El médico receptor pide que sondes antes de trasladar. ¿Qué haces?',
        opciones: [
          'Sondas con lubricante abundante y cuidado.',
          'No sondas: explicas que hay signos de lesión uretral y lo documentas.',
          'Sondas con una sonda de menor calibre.',
          'Sondas por vía suprapúbica.',
        ],
        correcta: 1,
        explicacion: 'La sangre en el meato es una contraindicación reconocida: forzar la sonda puede convertir un desgarro parcial en una sección completa. Se comunica y se documenta.',
      },
      {
        pregunta: 'Impacto en flanco derecho con dolor lumbar y equimosis, orina de aspecto normal. ¿Descartas lesión renal?',
        opciones: [
          'Sí: sin hematuria no hay lesión.',
          'No: puede haber lesión grave sin hematuria; el mecanismo manda.',
          'Solo si el paciente puede caminar.',
          'Solo si no hay fractura costal.',
        ],
        correcta: 1,
        explicacion: 'La correlación entre hematuria y gravedad es pobre; se valora el mecanismo y la clínica.',
      },
      {
        pregunta: '¿Por qué la fractura de pelvis es una emergencia hemorrágica?',
        opciones: [
          'Porque duele mucho.',
          'Porque el retroperitoneo pélvico puede alojar un sangrado masivo.',
          'Porque impide caminar.',
          'Porque siempre lesiona la vejiga.',
        ],
        correcta: 1,
        explicacion: 'El plexo venoso pélvico y el hueso esponjoso sangran de forma abundante en un espacio que admite mucho volumen.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Varón que cayó a horcajadas sobre una barra. Refiere dolor perineal y no puede orinar. ¿Qué sospechas y qué evitas?',
          opciones: [
            'Contusión simple; puedes sondar sin problema.',
            'Lesión uretral: evitas el sondaje y trasladas.',
            'Fractura de fémur; inmovilizas.',
            'Retención urinaria funcional; esperas.',
          ],
          correcta: 1,
          explicacion: 'El mecanismo a horcajadas con imposibilidad de orinar es característico de lesión uretral; el sondaje está contraindicado.',
        },
      ],
    },
  },
}
