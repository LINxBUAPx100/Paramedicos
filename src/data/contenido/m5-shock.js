// ============================================================
//  MÓDULO 5 — Unidad «HEMORRAGIA Y ESTADO DE SHOCK»
// ------------------------------------------------------------
//  Cubre los 7 temas vacíos de la unidad. Es la unidad más transversal del
//  módulo: lo que se aprende aquí se reutiliza en tórax, abdomen, cráneo y
//  quemaduras, así que se explica el mecanismo y no solo la lista de signos.
//
//  Fuentes: PHTLS (soporte vital de trauma prehospitalario) y los manuales de
//  urgencias de la biblioteca de la academia.
//
//  ⚠ El «PHTLS 10 ESPAÑOL» de la carpeta es una TRADUCCIÓN AUTOMÁTICA con la
//  terminología corrompida («cofre mayal» por tórax inestable, «historia del
//  MUESTREADOR» por SAMPLE). Aquí se usa terminología correcta en español; para
//  citar textualmente hay que acudir a la edición oficial o a la inglesa.
//
//  Criterio sobre cifras: se evitan volúmenes y dosis concretas, que dependen
//  del protocolo del servicio y del nivel de atención. Lo que sí se fija es el
//  reconocimiento clínico, que es lo que le toca decidir al TUM.
// ============================================================

const FUENTE_TRAUMA = {
  tipo: 'fuentes',
  titulo: 'Para ampliar',
  items: [
    {
      nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
      nota: 'Edición declarada por el plan de estudios oficial y base curricular de este módulo. Capítulo y página PENDIENTES: solo puede precisarlos quien consulte la copia licenciada de la academia. No se cita la 10.ª edición porque la copia disponible es una traducción automática no citable.',
    },
    {
      nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid. Circulation, 2024. DOI 10.1161/CIR.0000000000001281.',
      url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
      nota: 'Control de la hemorragia que amenaza la vida en el nivel de primer respondiente: presión directa seguida de torniquete o empaquetamiento.',
    },
  ],
}

export default {
  'm5-hs-definicion': {
    icono: 'cp-servier-eritrocito',
    duracion: '12 min',
    resumen: 'Qué es el shock realmente: no es «presión baja», sino un fallo de la entrega de oxígeno a la célula.',
    objetivos: [
      'Definir el shock en términos de perfusión celular.',
      'Explicar por qué la presión arterial es un indicador tardío.',
      'Relacionar los tres componentes de la perfusión con los tipos de shock.',
    ],
    secciones: [
      {
        titulo: 'La definición que importa',
        bloques: [
          { tipo: 'p', texto: 'Shock es un estado de hipoperfusión: la célula no recibe el oxígeno que necesita para producir energía. Todo lo demás —la palidez, la taquicardia, la caída de la presión— son consecuencias o intentos del cuerpo por compensarlo.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Shock no es igual a hipotensión', texto: 'Un paciente puede estar en shock con la presión normal, y de hecho es lo habitual al principio. Definir el shock por la presión hace que se reconozca tarde, cuando la compensación ya falló.' },
          { tipo: 'p', texto: 'Cuando falta oxígeno, la célula pasa a metabolismo anaerobio: produce muchísima menos energía y genera ácido láctico. Si la situación se prolonga, la bomba de la membrana falla, la célula se hincha y muere. Por eso el shock es una carrera contra el tiempo aunque el paciente todavía hable.' },
        ],
      },
      {
        titulo: 'Los tres componentes de la perfusión',
        bloques: [
          { tipo: 'p', texto: 'Para que la sangre llegue oxigenada a la célula hacen falta tres cosas. Cada tipo de shock es el fallo de una de ellas, y por eso reconocer cuál falla es lo que orienta el manejo.' },
          {
            tipo: 'tabla',
            headers: ['Componente', 'Analogía', 'Si falla…'],
            filas: [
              ['La bomba (corazón)', 'El motor', 'Shock cardiogénico'],
              ['El volumen (sangre)', 'El líquido del circuito', 'Shock hipovolémico'],
              ['El continente (vasos)', 'Las tuberías', 'Shock distributivo: neurogénico, anafiláctico, séptico'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué la analogía sirve en la escena', texto: 'Ante un paciente en shock, preguntarse «¿le falta líquido, falla la bomba o se abrieron las tuberías?» ordena el pensamiento más rápido que recordar una lista de siete tipos.' },
        ],
      },
      {
        titulo: 'Compensación: por qué engaña',
        bloques: [
          { tipo: 'p', texto: 'Ante la pérdida de perfusión el organismo acelera el corazón, cierra los vasos de piel y vísceras, y aumenta la frecuencia respiratoria. Con eso mantiene la presión durante un tiempo, a costa de sacrificar la circulación de la periferia.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los signos precoces son periféricos', texto: 'Piel pálida, fría y sudorosa, relleno capilar lento, taquicardia y ansiedad aparecen ANTES que la hipotensión. Esperar a que baje la presión para llamarlo shock es esperar a que la compensación se agote — y en el paciente joven eso ocurre de golpe.' },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Shock', definicion: 'Estado de hipoperfusión en el que la entrega de oxígeno a la célula es insuficiente para su metabolismo.' },
      { termino: 'Metabolismo anaerobio', definicion: 'Producción de energía sin oxígeno; rinde mucho menos y genera ácido láctico.' },
      { termino: 'Shock compensado', definicion: 'Fase en la que los mecanismos del organismo mantienen la presión arterial pese a la hipoperfusión.' },
      { termino: 'Shock descompensado', definicion: 'Fase en la que la compensación falla y aparece la hipotensión; el deterioro se acelera.' },
    ],
    flashcards: [
      { frente: 'Definición de shock', reverso: 'Hipoperfusión: la célula no recibe el oxígeno que necesita.' },
      { frente: '¿Por qué la presión arterial es un mal indicador precoz?', reverso: 'Porque la compensación la mantiene normal hasta que ya está agotada.' },
      { frente: 'Los tres componentes de la perfusión', reverso: 'Bomba (corazón), volumen (sangre) y continente (vasos).' },
      { frente: 'Signos precoces de shock', reverso: 'Piel pálida, fría y sudorosa, relleno capilar lento, taquicardia y ansiedad.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente tras colisión, consciente y ansioso, piel fría y sudorosa, FC 124, TA 118/76. ¿Cómo lo clasificas?',
        opciones: [
          'No está en shock: la presión es normal.',
          'Shock compensado: la presión se mantiene a costa de la periferia.',
          'Shock descompensado.',
          'Solo tiene una reacción de estrés.',
        ],
        correcta: 1,
        explicacion: 'Taquicardia, piel fría y ansiedad con presión conservada son el retrato del shock compensado. Esperar la hipotensión para actuar es llegar tarde.',
      },
      {
        pregunta: '¿Cuál es la consecuencia celular directa de la hipoperfusión?',
        opciones: [
          'Aumento de la producción de energía.',
          'Paso a metabolismo anaerobio con producción de ácido láctico.',
          'Vasodilatación generalizada inmediata.',
          'Descenso de la frecuencia cardiaca.',
        ],
        correcta: 1,
        explicacion: 'Sin oxígeno la célula produce energía por vía anaerobia, con rendimiento muy bajo y acumulación de lactato.',
      },
      {
        pregunta: 'Un shock por vasodilatación generalizada corresponde al fallo de:',
        opciones: ['La bomba', 'El volumen', 'El continente', 'El intercambio pulmonar'],
        correcta: 2,
        explicacion: 'Es el shock distributivo: el continente se agranda y el volumen, aunque sea normal, deja de ser suficiente.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El shock se define como un estado de ___, no como una cifra de presión arterial.',
          opciones: ['hipotensión', 'hipoperfusión', 'taquicardia'],
          correcta: 1,
          explicacion: 'La hipotensión es un signo tardío; la hipoperfusión es la esencia del cuadro.',
        },
      ],
    },
  },

  'm5-hs-hipovolemico': {
    icono: 'cp-servier-eritrocito',
    duracion: '15 min',
    resumen: 'Shock hipovolémico: el más frecuente en trauma. Cómo se reconoce por etapas y por qué el control de la hemorragia manda sobre todo lo demás.',
    objetivos: [
      'Reconocer las etapas del shock hipovolémico por sus signos clínicos.',
      'Priorizar el control de la hemorragia sobre la reposición de volumen.',
      'Identificar las hemorragias ocultas que no se ven en la escena.',
    ],
    secciones: [
      {
        titulo: 'Progresión clínica',
        bloques: [
          { tipo: 'p', texto: 'La pérdida de sangre se manifiesta en etapas bastante predecibles. No hace falta medir nada: la frecuencia cardiaca, el estado mental y la piel cuentan la historia.' },
          {
            tipo: 'tabla',
            titulo: 'Cómo se ve cada etapa',
            headers: ['', 'Leve', 'Moderada', 'Grave', 'Crítica'],
            filas: [
              ['Frecuencia cardiaca', 'Normal o ligeramente alta', 'Taquicardia', 'Taquicardia marcada', 'Taquicardia extrema o bradicardia final'],
              ['Presión arterial', 'Normal', 'Normal (compensada)', 'Descendida', 'Muy baja o no medible'],
              ['Estado mental', 'Ansiedad leve', 'Ansiedad, inquietud', 'Confusión', 'Letargia, inconsciencia'],
              ['Piel', 'Normal o fría', 'Pálida, fría, sudorosa', 'Pálida, fría, moteada', 'Fría, cianótica'],
              ['Relleno capilar', 'Normal', 'Lento', 'Muy lento', 'Ausente'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El niño y el deportista engañan', texto: 'Compensan tanto que llegan casi normales hasta que se desploman de golpe. En ellos, la taquicardia sostenida sin causa aparente ya es señal suficiente para tratar como shock.' },
        ],
      },
      {
        titulo: 'Lo primero es cerrar la llave',
        bloques: [
          { tipo: 'p', texto: 'De nada sirve reponer líquido si la sangre sigue saliendo. La secuencia es: control de la hemorragia externa, después oxigenación, después el resto. Es la razón de que la X vaya delante del ABCDE en trauma.' },
          {
            tipo: 'pasos',
            titulo: 'En la escena',
            items: [
              'Presión directa firme y sostenida sobre el punto que sangra.',
              'Torniquete si es una extremidad y la presión no controla.',
              'Empaquetamiento en uniones donde no cabe torniquete.',
              'Oxígeno y prevención activa de la hipotermia.',
              'Traslado sin demora: la hemorragia interna solo se resuelve en quirófano.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La tríada letal', texto: 'Hipotermia, acidosis y coagulopatía se alimentan entre sí: el paciente frío coagula peor, sangra más, se acidifica y se enfría todavía más. Mantener al paciente caliente no es confort, es tratamiento.' },
        ],
      },
      {
        titulo: 'Dónde se esconde la sangre',
        bloques: [
          { tipo: 'p', texto: 'Un paciente puede desangrarse sin que se vea una gota. Hay cinco lugares clásicos, y conviene revisarlos mentalmente en todo shock sin sangrado externo evidente.' },
          {
            tipo: 'lista',
            items: [
              'Tórax: un hemitórax puede alojar litros.',
              'Abdomen: bazo e hígado sangran mucho y en silencio.',
              'Retroperitoneo y pelvis: la fractura pélvica sangra masivamente.',
              'Muslos: cada fractura de fémur puede retener más de un litro.',
              'El suelo: lo perdido en la escena antes de llegar.',
            ],
          },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Shock hipovolémico', definicion: 'Hipoperfusión por pérdida de volumen circulante, casi siempre hemorragia en el paciente traumatizado.' },
      { termino: 'Tríada letal', definicion: 'Combinación de hipotermia, acidosis y coagulopatía que se retroalimenta y multiplica la mortalidad en trauma.' },
      { termino: 'Hemorragia oculta', definicion: 'Sangrado interno sin manifestación externa; tórax, abdomen, retroperitoneo, muslos y lo perdido en la escena.' },
    ],
    flashcards: [
      { frente: '¿Qué signo aparece antes: taquicardia o hipotensión?', reverso: 'La taquicardia; la hipotensión es tardía.' },
      { frente: 'Los tres componentes de la tríada letal', reverso: 'Hipotermia, acidosis y coagulopatía.' },
      { frente: 'Cinco lugares donde se esconde una hemorragia', reverso: 'Tórax, abdomen, retroperitoneo/pelvis, muslos y el suelo de la escena.' },
      { frente: '¿Por qué mantener caliente al paciente en shock?', reverso: 'Porque el frío empeora la coagulación y alimenta la tríada letal.' },
      { frente: '¿Por qué el niño engaña en el shock?', reverso: 'Compensa muy bien y se descompensa de golpe: la taquicardia sostenida ya basta para actuar.' },
    ],
    quiz: [
      {
        pregunta: 'Motociclista con fractura cerrada de fémur bilateral, FC 130, piel fría, sin sangrado externo. ¿Qué explica su shock?',
        opciones: [
          'No está en shock si no hay sangrado visible.',
          'Hemorragia oculta en ambos muslos, que pueden retener más de un litro cada uno.',
          'Dolor únicamente.',
          'Shock neurogénico por la caída.',
        ],
        correcta: 1,
        explicacion: 'Las fracturas de fémur sangran de forma importante en el compartimento del muslo, sin salida al exterior.',
      },
      {
        pregunta: 'Hemorragia arterial activa en brazo y paciente hipotenso. ¿Cuál es tu prioridad?',
        opciones: [
          'Canalizar dos vías y pasar líquidos rápido.',
          'Controlar la hemorragia primero; el volumen no repone lo que sigue saliendo.',
          'Administrar oxígeno y esperar.',
          'Tomar signos vitales completos antes de intervenir.',
        ],
        correcta: 1,
        explicacion: 'La X precede al ABCDE: reponer volumen mientras la hemorragia continúa diluye la sangre y empeora la coagulación.',
      },
      {
        pregunta: '¿Por qué la hipotermia agrava el shock hemorrágico?',
        opciones: [
          'Porque aumenta el consumo de oxígeno.',
          'Porque altera la coagulación y favorece que el paciente siga sangrando.',
          'Porque produce vasodilatación.',
          'Porque disminuye la frecuencia cardiaca.',
        ],
        correcta: 1,
        explicacion: 'Las enzimas de la coagulación pierden eficacia con el frío; es un pilar de la tríada letal.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena las prioridades ante un politraumatizado en shock',
        pasos: [
          'Controlar la hemorragia exanguinante',
          'Asegurar la vía aérea',
          'Oxigenar y ventilar',
          'Valorar la circulación y prevenir la hipotermia',
          'Trasladar sin demora al centro adecuado',
        ],
      },
    },
  },

  'm5-hs-cardiogenico': {
    icono: 'cp-servier-corazon-interior',
    duracion: '12 min',
    resumen: 'Shock cardiogénico: falla la bomba. Por qué aquí los líquidos pueden matar y qué causas hay que buscar en trauma.',
    objetivos: [
      'Reconocer el shock cardiogénico y distinguirlo del hipovolémico.',
      'Identificar las causas mecánicas reversibles en el paciente traumatizado.',
      'Justificar por qué la fluidoterapia agresiva está contraindicada.',
    ],
    secciones: [
      {
        titulo: 'La bomba que no bombea',
        bloques: [
          { tipo: 'p', texto: 'El corazón es incapaz de mantener el gasto necesario. El volumen está, los vasos están, pero la sangre no avanza: se acumula por detrás del ventrículo que falla.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La clave diferencial', texto: 'El hipovolémico tiene las venas del cuello colapsadas y los pulmones limpios. El cardiogénico suele tener ingurgitación yugular y estertores: la sangre se está represando. Con la misma taquicardia y la misma piel fría, ese detalle cambia el manejo por completo.' },
        ],
      },
      {
        titulo: 'Causas en trauma',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Mecánicas, y algunas reversibles en la escena',
            items: [
              'Neumotórax a tensión: comprime el corazón y las grandes venas. Es la causa más urgente y se resuelve descomprimiendo.',
              'Taponamiento cardiaco: la sangre en el pericardio impide que el ventrículo se llene.',
              'Contusión miocárdica: el músculo golpeado bombea mal y hace arritmias.',
              'Infarto: puede ser la causa del accidente, no su consecuencia.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Antes de culpar al corazón, descarta el tórax', texto: 'En un traumatizado con shock, ingurgitación yugular y dificultad respiratoria, el neumotórax a tensión debe descartarse primero: es tratable en la escena y mata en minutos.' },
        ],
      },
      {
        titulo: 'Manejo prehospitalario',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Oxígeno y soporte ventilatorio.',
              'Posición semisentada si la tolera y no hay sospecha de lesión espinal.',
              'Descompresión torácica si hay neumotórax a tensión, según protocolo y nivel de atención. Es un procedimiento invasivo: depende además de la certificación del prestador y de la dirección médica, y se estudia en trauma de tórax.',
              'Fluidoterapia MUY prudente: el ventrículo que ya no puede con lo que tiene no mejora recibiendo más.',
              'Traslado prioritario a centro con capacidad resolutiva.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El error que más daño hace', texto: 'Tratar todo shock con carga de líquidos. En el cardiogénico eso empeora el edema pulmonar y puede ser letal. La ingurgitación yugular es la señal de alto.' },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Shock cardiogénico', definicion: 'Hipoperfusión por fallo de la bomba cardiaca, con volumen circulante conservado.' },
      { termino: 'Ingurgitación yugular', definicion: 'Distensión de las venas del cuello por aumento de presión venosa; orienta a fallo de bomba u obstrucción, no a hipovolemia.' },
      { termino: 'Taponamiento cardiaco', definicion: 'Acumulación de sangre en el pericardio que impide el llenado ventricular.' },
    ],
    flashcards: [
      { frente: 'Diferencia clínica entre shock hipovolémico y cardiogénico', reverso: 'El hipovolémico tiene yugulares colapsadas; el cardiogénico, ingurgitadas.' },
      { frente: '¿Por qué no cargar líquidos en el shock cardiogénico?', reverso: 'Porque el ventrículo ya no puede con lo que tiene: empeora el edema pulmonar.' },
      { frente: 'Causa de shock en trauma tratable en la escena', reverso: 'Neumotórax a tensión: se descomprime.' },
      { frente: '¿Qué es el taponamiento cardiaco?', reverso: 'Sangre en el pericardio que impide que el ventrículo se llene.' },
    ],
    quiz: [
      {
        pregunta: 'Traumatizado con TA 78/50, FC 132, yugulares ingurgitadas, ruidos respiratorios ausentes en hemitórax derecho y tráquea desviada. ¿Qué haces?',
        opciones: [
          'Cargas líquidos rápidamente.',
          'Sospechas neumotórax a tensión y actúas para descomprimir según protocolo.',
          'Lo sientas y administras oxígeno.',
          'Buscas hemorragia externa.',
        ],
        correcta: 1,
        explicacion: 'Es el cuadro clásico del neumotórax a tensión: obstruye el retorno venoso. Es reversible en la escena y no espera al hospital.',
      },
      {
        pregunta: '¿Qué hallazgo orienta a fallo de bomba y no a hipovolemia?',
        opciones: [
          'Piel fría y sudorosa.',
          'Taquicardia.',
          'Ingurgitación yugular con estertores pulmonares.',
          'Relleno capilar lento.',
        ],
        correcta: 2,
        explicacion: 'Los tres primeros son comunes a casi todo shock; la congestión retrógrada es lo que distingue al cardiogénico.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Un compañero propone pasar dos cargas rápidas de cristaloide a un paciente con shock, yugulares ingurgitadas y estertores. ¿Qué le dices?',
          opciones: [
            'Que adelante: todo shock mejora con volumen.',
            'Que ese cuadro sugiere fallo de bomba y el volumen puede empeorar el edema pulmonar.',
            'Que primero tome la temperatura.',
            'Que use suero glucosado en vez de cristaloide.',
          ],
          correcta: 1,
          explicacion: 'Distinguir el tipo de shock antes de cargar volumen es justamente lo que evita el error más frecuente y más grave.',
        },
      ],
    },
  },

  'm5-hs-neurogenico': {
    icono: 'cp-smart-medula-espinal',
    duracion: '12 min',
    resumen: 'Shock neurogénico: la lesión medular desconecta el control de los vasos. El único shock que cursa sin taquicardia.',
    objetivos: [
      'Reconocer la tríada del shock neurogénico.',
      'Diferenciarlo del shock medular, que no es lo mismo.',
      'Evitar atribuirlo a la médula sin descartar antes la hemorragia.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'Una lesión de la médula cervical o torácica alta interrumpe las señales simpáticas que mantienen el tono de los vasos. Las arterias se relajan, el continente se agranda y la misma cantidad de sangre deja de llenar el circuito.' },
          {
            tipo: 'tabla',
            titulo: 'La tríada que lo identifica',
            headers: ['Signo', 'Por qué'],
            filas: [
              ['Hipotensión', 'Vasodilatación: el continente se agrandó'],
              ['Bradicardia (o FC normal)', 'Se perdió el estímulo simpático que aceleraría el corazón'],
              ['Piel caliente, seca y rosada', 'Los vasos de la piel están dilatados, no cerrados'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Es el shock que va al revés', texto: 'Todos los demás cursan con taquicardia y piel fría y pálida. Si encuentras hipotensión con bradicardia y piel caliente en un paciente con mecanismo de lesión espinal, estás ante un shock neurogénico.' },
        ],
      },
      {
        titulo: 'Shock neurogénico ≠ shock medular',
        bloques: [
          { tipo: 'p', texto: 'Son dos cosas distintas que se confunden por el nombre. El **shock neurogénico** es un problema circulatorio: hipotensión por pérdida del tono vascular. El **shock medular** es un problema neurológico: pérdida temporal de toda función por debajo de la lesión —fuerza, sensibilidad y reflejos— que puede recuperarse en parte.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Uno se mide con el tensiómetro, el otro con el examen neurológico', texto: 'Un paciente puede tener los dos, uno solo, o ninguno. Confundirlos lleva a informar mal en la entrega hospitalaria.' },
        ],
      },
      {
        titulo: 'La trampa que puede costar la vida',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Nunca asumas neurogénico sin descartar hemorragia', texto: 'Un politraumatizado con lesión medular casi siempre tiene otras lesiones. Atribuir la hipotensión a la médula y dejar de buscar la hemorragia es un error clásico y mortal. Ante la duda, se trata como hipovolémico y se busca el sangrado.' },
          {
            tipo: 'lista',
            titulo: 'Manejo prehospitalario',
            items: [
              'Restricción del movimiento espinal según indicación.',
              'Oxígeno y vigilancia de la ventilación: las lesiones cervicales altas comprometen el diafragma.',
              'Prevención activa de la hipotermia: sin vasoconstricción, el paciente pierde calor muy rápido.',
              'Descartar activamente hemorragia interna.',
              'Traslado a centro con capacidad neuroquirúrgica.',
            ],
          },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Shock neurogénico', definicion: 'Hipotensión por pérdida del tono vascular simpático tras lesión medular cervical o torácica alta.' },
      { termino: 'Shock medular', definicion: 'Pérdida temporal de función motora, sensitiva y refleja por debajo de la lesión; concepto neurológico, no circulatorio.' },
      { termino: 'Shock distributivo', definicion: 'Grupo en el que el continente vascular se agranda: neurogénico, anafiláctico y séptico.' },
    ],
    flashcards: [
      { frente: 'Tríada del shock neurogénico', reverso: 'Hipotensión, bradicardia y piel caliente, seca y rosada.' },
      { frente: '¿Qué shock cursa SIN taquicardia?', reverso: 'El neurogénico: se perdió el estímulo simpático.' },
      { frente: 'Diferencia entre shock neurogénico y medular', reverso: 'El neurogénico es circulatorio (hipotensión); el medular es neurológico (pérdida de función).' },
      { frente: '¿Por qué se enfrían tanto estos pacientes?', reverso: 'Porque sin vasoconstricción periférica pierden calor con rapidez.' },
    ],
    quiz: [
      {
        pregunta: 'Caída de altura. TA 82/48, FC 56, piel caliente y seca, sin movilidad en piernas. ¿Qué sospechas?',
        opciones: [
          'Shock hipovolémico por hemorragia oculta.',
          'Shock neurogénico por lesión medular.',
          'Shock cardiogénico.',
          'Shock séptico.',
        ],
        correcta: 1,
        explicacion: 'La combinación de hipotensión con bradicardia y piel caliente es prácticamente exclusiva del shock neurogénico.',
      },
      {
        pregunta: 'En ese mismo paciente, ¿qué NO debes hacer?',
        opciones: [
          'Restringir el movimiento espinal.',
          'Prevenir la hipotermia.',
          'Dar por explicada la hipotensión y dejar de buscar hemorragia interna.',
          'Vigilar la ventilación.',
        ],
        correcta: 2,
        explicacion: 'Un politraumatizado con lesión medular suele tener otras lesiones; asumir que la médula explica todo es un error mortal.',
      },
      {
        pregunta: '«Shock medular» se refiere a:',
        opciones: [
          'La hipotensión por vasodilatación.',
          'La pérdida temporal de función motora, sensitiva y refleja bajo la lesión.',
          'El sangrado dentro del canal medular.',
          'La bradicardia de origen central.',
        ],
        correcta: 1,
        explicacion: 'Es un concepto neurológico y puede ser parcialmente reversible; no describe el estado circulatorio.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El shock neurogénico cursa con hipotensión, ___ y piel caliente y seca.',
          opciones: ['taquicardia', 'bradicardia', 'fiebre'],
          correcta: 1,
          explicacion: 'La pérdida del estímulo simpático impide la taquicardia compensadora.',
        },
      ],
    },
  },

  'm5-hs-anafilactico': {
    icono: 'cp-servier-anticuerpo',
    duracion: '13 min',
    resumen: 'Shock anafiláctico: reacción alérgica que compromete la vía aérea y la circulación a la vez. El tiempo hasta la adrenalina es lo que decide.',
    objetivos: [
      'Reconocer la anafilaxia por sus criterios clínicos.',
      'Priorizar la adrenalina intramuscular sobre cualquier otra medida.',
      'Anticipar el compromiso de vía aérea y la reacción bifásica.',
    ],
    secciones: [
      {
        titulo: 'Cómo se reconoce',
        bloques: [
          { tipo: 'p', texto: 'La anafilaxia es una reacción alérgica grave y de instauración rápida. Lo característico es que afecta a más de un sistema: piel, respiratorio, circulatorio y digestivo.' },
          {
            tipo: 'tabla',
            headers: ['Sistema', 'Manifestaciones'],
            filas: [
              ['Piel y mucosas', 'Urticaria, prurito, enrojecimiento, angioedema de labios, lengua o párpados'],
              ['Respiratorio', 'Estridor, disfonía, sensación de cierre de garganta, sibilancias, disnea'],
              ['Circulatorio', 'Hipotensión, taquicardia, mareo, síncope'],
              ['Digestivo', 'Náusea, vómito, cólico abdominal'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que mata primero', texto: 'El edema de la vía aérea superior. Disfonía, estridor o sensación de que «se cierra la garganta» son señales de alarma máxima: la vía aérea puede volverse impasable en minutos.' },
        ],
      },
      {
        titulo: 'Adrenalina: el tratamiento, no un adyuvante',
        bloques: [
          { tipo: 'p', texto: 'La adrenalina revierte los tres problemas a la vez: contrae los vasos y sube la presión, relaja el bronquio y reduce el edema. Ningún otro fármaco hace eso, y el retraso en administrarla es el factor que más se asocia a los desenlaces fatales.' },
          { tipo: 'callout', variante: 'dosis', titulo: 'Vía y sitio', texto: 'Intramuscular en la cara anterolateral del muslo. Es la vía y el sitio de elección por absorción; la subcutánea es más lenta y menos fiable. La dosis y la autorización para administrarla dependen del nivel de atención y del protocolo del servicio: consúltalo antes de necesitarlo, no durante.' },
          {
            tipo: 'lista',
            titulo: 'Además de la adrenalina',
            items: [
              'Retirar el desencadenante si es posible (retirar el aguijón, detener la infusión).',
              'Oxígeno a alto flujo.',
              'Posición: tumbado con piernas elevadas si hay hipotensión; sentado si predomina la dificultad respiratoria. Nunca ponerlo de pie de golpe.',
              'Traslado siempre, aunque mejore.',
            ],
          },
        ],
      },
      {
        titulo: 'Por qué se traslada aunque mejore',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Reacción bifásica', texto: 'Entre un pequeño porcentaje de pacientes el cuadro reaparece horas después de haber cedido, sin nueva exposición. Un paciente que mejora con adrenalina y se queda en casa puede recaer sin nadie cerca. El traslado y la observación no son negociables.' },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Anafilaxia', definicion: 'Reacción alérgica grave, de instauración rápida y con afectación de más de un sistema, potencialmente mortal.' },
      { termino: 'Angioedema', definicion: 'Hinchazón de tejidos profundos, especialmente labios, lengua y laringe; su presencia amenaza la vía aérea.' },
      { termino: 'Reacción bifásica', definicion: 'Reaparición de los síntomas horas después de la resolución inicial, sin nueva exposición al alérgeno.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el tratamiento de primera línea de la anafilaxia?', reverso: 'Adrenalina intramuscular en la cara anterolateral del muslo.' },
      { frente: '¿Qué mata primero en la anafilaxia?', reverso: 'El edema de la vía aérea superior.' },
      { frente: '¿Por qué se traslada aunque el paciente mejore?', reverso: 'Por la reacción bifásica: puede reaparecer horas después.' },
      { frente: 'Signos de alarma de vía aérea en anafilaxia', reverso: 'Disfonía, estridor y sensación de cierre de garganta.' },
      { frente: '¿Por qué IM y no subcutánea?', reverso: 'Porque la absorción intramuscular es más rápida y fiable.' },
    ],
    quiz: [
      {
        pregunta: 'Tras una picadura de abeja: urticaria, disfonía, sibilancias y TA 84/50. ¿Cuál es tu prioridad?',
        opciones: [
          'Antihistamínico oral.',
          'Adrenalina intramuscular sin demora, según protocolo.',
          'Salbutamol inhalado y esperar.',
          'Corticoide intravenoso.',
        ],
        correcta: 1,
        explicacion: 'Solo la adrenalina revierte simultáneamente la vasodilatación, el broncoespasmo y el edema. Antihistamínicos y corticoides son coadyuvantes, nunca el primer paso.',
      },
      {
        pregunta: 'El paciente mejora notablemente tras la adrenalina y quiere quedarse en casa. ¿Qué haces?',
        opciones: [
          'Aceptas: el cuadro ya cedió.',
          'Insistes en el traslado por el riesgo de reacción bifásica y documentas la negativa si persiste.',
          'Le dejas otra dosis de adrenalina y te vas.',
          'Le indicas antihistamínico y control en una semana.',
        ],
        correcta: 1,
        explicacion: 'La reacción puede reaparecer horas después sin nueva exposición; la observación hospitalaria es parte del tratamiento.',
      },
      {
        pregunta: 'Paciente anafiláctico hipotenso. ¿Qué posición es la adecuada?',
        opciones: [
          'De pie para facilitar la respiración.',
          'Tumbado con las piernas elevadas, salvo que predomine la dificultad respiratoria.',
          'Sentado siempre.',
          'En decúbito prono.',
        ],
        correcta: 1,
        explicacion: 'Incorporar bruscamente a un anafiláctico hipotenso puede precipitar el colapso; si predomina la disnea, se prioriza la posición que le permita ventilar.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Alumno de 15 años, alérgico a cacahuate, con urticaria y sensación de cierre de garganta tras comer. ¿Qué haces primero?',
          opciones: [
            'Darle agua para que pase el bocado.',
            'Adrenalina intramuscular según protocolo y activar traslado.',
            'Observar 15 minutos para ver si progresa.',
            'Administrar antihistamínico y vigilar.',
          ],
          correcta: 1,
          explicacion: 'La afectación de vía aérea con exposición conocida es anafilaxia hasta demostrar lo contrario. Esperar es lo que convierte un caso tratable en un paro.',
        },
      ],
    },
  },

  'm5-hs-septico': {
    icono: 'cp-servier-neutrofilo',
    duracion: '12 min',
    resumen: 'Shock séptico: la infección desborda al organismo. El menos «traumático» de los shocks, pero el TUM lo encuentra a menudo.',
    objetivos: [
      'Reconocer la sepsis y el shock séptico en el ámbito prehospitalario.',
      'Identificar a la población de riesgo y los focos más frecuentes.',
      'Comprender por qué el tiempo hasta el antibiótico determina el pronóstico.',
    ],
    secciones: [
      {
        titulo: 'De la infección al shock',
        bloques: [
          { tipo: 'p', texto: 'Ante una infección grave, la respuesta del organismo se generaliza: los vasos se dilatan y se vuelven permeables, el líquido escapa del torrente y la perfusión cae. El resultado es un shock distributivo con un componente de hipovolemia relativa.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Cómo se ve en la escena', texto: 'Fiebre o hipotermia, taquicardia, taquipnea, confusión y piel que puede estar caliente y enrojecida al principio (por vasodilatación) y volverse fría y moteada al avanzar.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La hipotermia también es sepsis', texto: 'En ancianos y pacientes debilitados la sepsis puede cursar SIN fiebre, e incluso con temperatura baja. Descartar sepsis porque el paciente no tiene fiebre es un error frecuente.' },
        ],
      },
      {
        titulo: 'A quién le pasa y por dónde entra',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Población de riesgo',
            items: [
              'Adultos mayores y lactantes.',
              'Diabéticos, con insuficiencia renal o hepática.',
              'Pacientes oncológicos o inmunodeprimidos.',
              'Portadores de sondas, catéteres o heridas crónicas.',
              'Postoperados recientes.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Focos más frecuentes',
            items: [
              'Respiratorio: neumonía.',
              'Urinario: sobre todo en ancianos y portadores de sonda.',
              'Abdominal: perforación, colecistitis, apendicitis complicada.',
              'Piel y partes blandas: úlceras por presión, pie diabético.',
            ],
          },
        ],
      },
      {
        titulo: 'Qué aporta el prehospitalario',
        bloques: [
          { tipo: 'p', texto: 'El tratamiento definitivo es hospitalario —antibiótico precoz y control del foco—, pero el reconocimiento temprano y el prealerta cambian el tiempo hasta ese antibiótico, que es de los factores más asociados a la supervivencia.' },
          {
            tipo: 'lista',
            items: [
              'Oxígeno y soporte ventilatorio.',
              'Fluidoterapia según protocolo: aquí sí hay hipovolemia relativa que corregir.',
              'Medir temperatura y glucosa; documentar el foco sospechado.',
              'Notificar la sospecha al hospital antes de llegar.',
              'Traslado sin demora.',
            ],
          },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Sepsis', definicion: 'Disfunción orgánica causada por una respuesta desregulada del organismo a una infección.' },
      { termino: 'Shock séptico', definicion: 'Sepsis con hipotensión que persiste pese a la reposición de volumen; alta mortalidad.' },
      { termino: 'Hipovolemia relativa', definicion: 'Volumen circulante normal que resulta insuficiente porque el continente vascular se dilató y hay fuga capilar.' },
    ],
    flashcards: [
      { frente: '¿Puede haber sepsis sin fiebre?', reverso: 'Sí: en ancianos y debilitados puede cursar con hipotermia.' },
      { frente: 'Focos más frecuentes de sepsis', reverso: 'Respiratorio, urinario, abdominal y piel/partes blandas.' },
      { frente: '¿Qué aporta el prehospitalario en sepsis?', reverso: 'Reconocimiento temprano y prealerta: acortan el tiempo hasta el antibiótico.' },
      { frente: '¿Por qué el shock séptico es distributivo?', reverso: 'Porque hay vasodilatación y fuga capilar: el continente se agranda.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 82 años, portadora de sonda vesical, confusa, FC 118, FR 26, TA 88/54, temperatura 35,4 °C. ¿Qué sospechas?',
        opciones: [
          'Nada infeccioso: no tiene fiebre.',
          'Sepsis probablemente de origen urinario, con hipotermia.',
          'Shock cardiogénico.',
          'Deshidratación simple.',
        ],
        correcta: 1,
        explicacion: 'La hipotermia no descarta sepsis en el anciano: la sugiere. Sonda vesical, confusión, taquicardia y taquipnea completan el cuadro.',
      },
      {
        pregunta: '¿Por qué el reconocimiento prehospitalario de la sepsis importa tanto?',
        opciones: [
          'Porque el TUM puede administrar el antibiótico.',
          'Porque el prealerta acorta el tiempo hasta el antibiótico hospitalario.',
          'Porque permite evitar el traslado.',
          'Porque cambia el tipo de ambulancia.',
        ],
        correcta: 1,
        explicacion: 'La demora del antibiótico es uno de los factores más asociados a la mortalidad; avisar al hospital antes de llegar la reduce.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el shock séptico hay hipovolemia ___: el volumen es normal pero el continente se dilató.',
          opciones: ['absoluta', 'relativa', 'aparente'],
          correcta: 1,
          explicacion: 'A diferencia del hemorrágico, no se ha perdido sangre: se ha agrandado el continente y hay fuga capilar.',
        },
      ],
    },
  },

  'm5-hs-signos-tratamiento': {
    icono: 'cp-servier-capilares',
    duracion: '14 min',
    resumen: 'Síntesis operativa: cómo se reconoce cualquier shock en la escena, cómo se distingue el tipo y qué se hace en los primeros minutos.',
    objetivos: [
      'Aplicar una secuencia única de reconocimiento del shock.',
      'Diferenciar el tipo con tres hallazgos de cabecera.',
      'Ejecutar las medidas comunes a todo shock.',
    ],
    secciones: [
      {
        titulo: 'Reconocer: lo que se mira sin aparatos',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos comunes a casi todo shock',
            items: [
              'Estado mental alterado: ansiedad, inquietud, confusión. Suele ser el primer signo.',
              'Piel: color, temperatura y humedad.',
              'Relleno capilar mayor de 2 segundos.',
              'Pulso rápido y débil (salvo en el neurogénico).',
              'Frecuencia respiratoria aumentada.',
              'Hipotensión: tardía, no esperarla.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El primer monitor es el paciente', texto: 'La ansiedad inexplicable en un traumatizado es hipoperfusión cerebral hasta demostrar lo contrario. Muchas veces precede a cualquier cifra alterada.' },
        ],
      },
      {
        titulo: 'Distinguir el tipo con tres hallazgos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cuadro de bolsillo',
            headers: ['Tipo', 'Frecuencia cardiaca', 'Piel', 'Yugulares'],
            filas: [
              ['Hipovolémico', 'Taquicardia', 'Pálida, fría, sudorosa', 'Colapsadas'],
              ['Cardiogénico / obstructivo', 'Taquicardia', 'Pálida, fría', 'Ingurgitadas'],
              ['Neurogénico', 'Bradicardia o normal', 'Caliente, seca, rosada', 'Normales'],
              ['Anafiláctico', 'Taquicardia', 'Urticaria, angioedema', 'Normales'],
              ['Séptico', 'Taquicardia', 'Caliente al inicio, luego fría y moteada', 'Normales'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cuello y piel, en ese orden', texto: 'Mirar las yugulares separa el fallo de bomba del resto; la temperatura de la piel separa el neurogénico y el séptico inicial de los demás. Con esas dos observaciones se orienta la mayoría de los casos.' },
        ],
      },
      {
        titulo: 'Tratamiento común, en la escena',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Sirve para todos',
            items: [
              'Controlar la hemorragia si la hay: es lo primero.',
              'Asegurar vía aérea y oxigenar.',
              'Posición adecuada al tipo de shock.',
              'Prevenir la hipotermia de forma activa, incluso en clima cálido.',
              'Acceso vascular y fluidoterapia según tipo y protocolo.',
              'Traslado precoz al centro con capacidad resolutiva y prealerta.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que NO se hace', texto: 'Retrasar el traslado para completar procedimientos en la escena cuando la lesión requiere quirófano; cargar volumen sin distinguir el tipo de shock; y dar por explicada la hipotensión por una sola causa sin descartar hemorragia.' },
          FUENTE_TRAUMA,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Relleno capilar', definicion: 'Tiempo de recuperación del color tras presionar el lecho ungueal; más de 2 segundos sugiere hipoperfusión.' },
      { termino: 'Prealerta hospitalaria', definicion: 'Aviso al centro receptor antes de llegar, para que active recursos; acorta tiempos críticos.' },
      { termino: 'Hora dorada', definicion: 'Periodo inicial tras el trauma en que el tratamiento definitivo tiene mayor impacto sobre la supervivencia.' },
    ],
    flashcards: [
      { frente: '¿Cuál suele ser el primer signo de shock?', reverso: 'La alteración del estado mental: ansiedad e inquietud.' },
      { frente: '¿Qué separa el shock cardiogénico del hipovolémico a simple vista?', reverso: 'Las yugulares: ingurgitadas frente a colapsadas.' },
      { frente: 'Medida común a TODO shock que se olvida a menudo', reverso: 'Prevenir activamente la hipotermia.' },
      { frente: '¿Qué shock cursa con piel caliente y seca?', reverso: 'El neurogénico (y el séptico en su fase inicial).' },
    ],
    quiz: [
      {
        pregunta: 'Ordena por aparición: hipotensión, taquicardia, alteración del estado mental.',
        opciones: [
          'Hipotensión → taquicardia → alteración mental.',
          'Alteración mental y taquicardia primero; hipotensión al final.',
          'Taquicardia → hipotensión → alteración mental.',
          'Todos aparecen a la vez.',
        ],
        correcta: 1,
        explicacion: 'La compensación mantiene la presión hasta el final: la ansiedad y la taquicardia son mucho más precoces.',
      },
      {
        pregunta: '¿Qué medida es común a todos los tipos de shock?',
        opciones: [
          'Carga rápida de cristaloides.',
          'Adrenalina intramuscular.',
          'Prevención activa de la hipotermia y oxigenación.',
          'Posición de Trendelenburg.',
        ],
        correcta: 2,
        explicacion: 'Los líquidos y la adrenalina dependen del tipo; oxigenar y evitar que el paciente se enfríe beneficia a todos.',
      },
      {
        pregunta: 'Paciente con shock y yugulares ingurgitadas: ¿qué NO harías?',
        opciones: [
          'Buscar neumotórax a tensión.',
          'Oxigenar.',
          'Cargar líquidos rápido y en volumen.',
          'Trasladar con prealerta.',
        ],
        correcta: 2,
        explicacion: 'La ingurgitación yugular orienta a fallo de bomba u obstrucción; el volumen agresivo puede empeorar el edema pulmonar.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el abordaje del shock en la escena',
        pasos: [
          'Controlar la hemorragia exanguinante',
          'Asegurar vía aérea y oxigenar',
          'Identificar el tipo de shock (piel, pulso, yugulares)',
          'Prevenir la hipotermia',
          'Trasladar con prealerta al centro adecuado',
        ],
      },
    },
  },
}
