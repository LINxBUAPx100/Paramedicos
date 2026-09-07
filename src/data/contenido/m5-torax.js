// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE TÓRAX»
// ------------------------------------------------------------
//  Cubre los 10 temas vacíos de la unidad. El plan la desglosa lesión por
//  lesión, así que cada tema es una ficha corta y comparable: qué es, cómo se
//  reconoce, qué hace el TUM.
//
//  Hilo conductor con la unidad anterior: varias de estas lesiones producen
//  shock OBSTRUCTIVO —yugulares ingurgitadas con pulmón comprometido—, que es
//  justo el patrón que separa el fallo de bomba de la hipovolemia.
//
//  ⚠ Terminología: se usa «tórax inestable», no la traducción automática
//  «cofre mayal» que aparece en el PDF de PHTLS 10 de la biblioteca.
//
//  Sin cifras de dosis ni de volumen: dependen del protocolo y del nivel de
//  atención. Lo que se fija es el reconocimiento y la conducta.
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
  'm5-tt-definicion': {
    icono: 'cp-smart-caja-toracica',
    duracion: '12 min',
    resumen: 'Qué es el trauma de tórax, por qué mata y por qué la mayoría de las muertes se evitan con maniobras sencillas.',
    objetivos: [
      'Definir el trauma torácico y su peso en la mortalidad por trauma.',
      'Relacionar la anatomía del tórax con los tres problemas que causa.',
      'Reconocer que pocas lesiones torácicas requieren cirugía inmediata.',
    ],
    secciones: [
      {
        titulo: 'Por qué el tórax es crítico',
        bloques: [
          { tipo: 'p', texto: 'En una caja rígida caben el corazón, los pulmones y los grandes vasos. Cualquier cosa que ocupe espacio ahí —aire, sangre, vísceras— desplaza a lo demás, y lo desplazado deja de funcionar.' },
          {
            tipo: 'lista',
            titulo: 'Los tres problemas que causa',
            items: [
              'Hipoxia: el pulmón no intercambia (contusión, neumotórax, hemotórax).',
              'Hipercapnia: no se ventila bien (dolor, tórax inestable, depresión respiratoria).',
              'Hipoperfusión: hemorragia u obstrucción del retorno venoso (neumotórax a tensión, taponamiento).',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La buena noticia', texto: 'La mayoría de las lesiones torácicas NO requieren cirugía. Se resuelven con oxígeno, ventilación adecuada, control del dolor, descompresión o un drenaje. Lo que mata es no reconocerlas a tiempo, no la falta de quirófano.' },
        ],
      },
      {
        titulo: 'Abierto y cerrado',
        bloques: [
          { tipo: 'p', texto: 'El trauma **cerrado** —choque, caída, aplastamiento— transmite energía sin romper la pared: lesiona por compresión, desaceleración y estallido. El **penetrante** —arma blanca o de fuego— crea un trayecto y lesiona lo que encuentra a su paso.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La mecánica orienta la búsqueda', texto: 'En desaceleración brusca se piensa en disrupción aórtica; en compresión súbita, en asfixia traumática; en herida bajo la línea del pezón, en lesión abdominal además de torácica. Preguntar cómo ocurrió no es curiosidad: acota lo que hay que buscar.' },
          mnemotecnia('HIPOXIA, HIPERCAPNIA, HIPOPERFUSIÓN. El pulmón no intercambia, no se ventila bien o la sangre no circula. Todo el trauma torácico grave acaba en uno de esos tres, y por eso el tórax se valora en la B y en la C antes que en ninguna otra parte.'),
          masPreguntado('La buena noticia y su consecuencia: la mayoría de las lesiones torácicas NO requieren cirugía —se resuelven con oxígeno, ventilación adecuada, control del dolor, descompresión o un drenaje—. Lo que mata es no reconocerlas a tiempo, no la falta de quirófano.'),
        ],
      },
      erroresFrecuentes([
        ['Dar el trauma torácico por quirúrgico', 'La mayoría de las lesiones torácicas se resuelven con oxígeno, ventilación adecuada, control del dolor, descompresión o un drenaje. Lo que mata es no reconocerlas a tiempo.'],
        ['No preguntar cómo ocurrió', 'La mecánica acota lo que hay que buscar: en desaceleración brusca se piensa en disrupción aórtica; en compresión súbita, en asfixia traumática. Preguntar no es curiosidad.'],
        ['Olvidar el abdomen en una herida torácica baja', 'Una herida bajo la línea del pezón obliga a pensar en lesión abdominal además de torácica, porque el diafragma sube y baja con la respiración.'],
        ['Fiarse de la pared íntegra', 'El trauma cerrado transmite energía sin romper la pared: lesiona por compresión, desaceleración y estallido. Que no haya herida no dice nada del contenido.'],
      ]),
      repasoRapido([
        'En una caja rígida caben el corazón, los pulmones y los grandes vasos.',
        'Cualquier cosa que ocupe espacio ahí —aire, sangre, vísceras— desplaza a lo demás, y lo desplazado deja de funcionar.',
        'Hipoxia: el pulmón no intercambia, por contusión, neumotórax o hemotórax.',
        'Hipercapnia: no se ventila bien, por dolor, tórax inestable o depresión respiratoria.',
        'Hipoperfusión: hemorragia u obstrucción del retorno venoso, por neumotórax a tensión o taponamiento.',
        'La mayoría de las lesiones torácicas no requieren cirugía.',
        'Se resuelven con oxígeno, ventilación adecuada, control del dolor, descompresión o un drenaje.',
        'Lo que mata es no reconocerlas a tiempo, no la falta de quirófano.',
        'El trauma cerrado transmite energía sin romper la pared: compresión, desaceleración y estallido.',
        'El penetrante crea un trayecto y lesiona lo que encuentra a su paso.',
        'La mecánica orienta: desaceleración brusca lleva a pensar en disrupción aórtica; compresión súbita, en asfixia traumática.',
        'Una herida bajo la línea del pezón obliga a pensar también en lesión abdominal.',
      ]),
      preguntasOrales([
        'Define el trauma torácico y di por qué el tórax es una región crítica.',
        'Enumera los tres problemas que causa el trauma de tórax.',
        '¿Qué lesiones producen cada uno de esos tres problemas?',
        '¿Por qué se dice que la mayoría de las lesiones torácicas no requieren cirugía?',
        'Entonces, ¿qué es lo que mata en el trauma de tórax?',
        'Diferencia trauma torácico cerrado y penetrante por su forma de lesionar.',
        '¿Qué te sugiere una desaceleración brusca y qué una compresión súbita?',
        'Herida bajo la línea del pezón. ¿Qué añades a la búsqueda?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Trauma torácico', definicion: 'Lesión de la pared o del contenido del tórax por mecanismo cerrado o penetrante.' },
      { termino: 'Hipoxia', definicion: 'Oxígeno insuficiente en los tejidos; vía final común de casi todas las lesiones torácicas graves.' },
      { termino: 'Trauma penetrante', definicion: 'El que crea un trayecto a través de la pared torácica y lesiona las estructuras que atraviesa.' },
    ],
    flashcards: [
      { frente: 'Los tres problemas que causa el trauma torácico', reverso: 'Hipoxia, hipercapnia e hipoperfusión.' },
      { frente: '¿La mayoría del trauma torácico requiere cirugía?', reverso: 'No: se resuelve con oxígeno, ventilación, analgesia, descompresión o drenaje.' },
      { frente: 'Herida por debajo de la línea del pezón: ¿qué añade?', reverso: 'Sospecha de lesión abdominal además de la torácica.' },
    ],
    quiz: [
      {
        pregunta: '¿Cuál es la vía final común por la que el trauma torácico mata?',
        opciones: ['La infección', 'La hipoxia tisular', 'El dolor', 'La fractura costal'],
        correcta: 1,
        explicacion: 'Sea por fallo de intercambio, de ventilación o de perfusión, el resultado es que la célula deja de recibir oxígeno.',
      },
      {
        pregunta: 'Herida por arma blanca a la altura del 5.º espacio intercostal izquierdo. ¿Qué debes considerar además del tórax?',
        opciones: [
          'Nada más: es una herida torácica.',
          'Posible lesión abdominal: el diafragma sube y baja con la respiración.',
          'Solo lesión de costilla.',
          'Lesión cervical.',
        ],
        correcta: 1,
        explicacion: 'En espiración el diafragma asciende y las vísceras abdominales quedan por dentro de la caja torácica: una herida baja puede ser toracoabdominal.',
      },
    ],
    actividades: null,
  },

  'm5-tt-clavicula': {
    icono: 'cp-smart-fractura-clavicula',
    duracion: '10 min',
    resumen: 'Fractura de clavícula: la más frecuente del cinturón escapular, casi siempre benigna, con dos complicaciones que hay que descartar.',
    objetivos: [
      'Reconocer la fractura de clavícula por la clínica.',
      'Descartar compromiso neurovascular y pleural.',
      'Inmovilizar de forma adecuada.',
    ],
    secciones: [
      {
        titulo: 'Reconocimiento',
        bloques: [
          { tipo: 'p', texto: 'Mecanismo típico: caída sobre el hombro o el brazo extendido, o golpe directo. El paciente sostiene el brazo pegado al cuerpo y rechaza moverlo. La deformidad suele ser visible o palpable en el tercio medio, que es donde ocurre la mayoría.' },
          {
            tipo: 'lista',
            titulo: 'Signos',
            items: [
              'Dolor localizado que aumenta al mover el hombro.',
              'Deformidad o escalón palpable sobre la clavícula.',
              'Hombro caído hacia adelante y abajo.',
              'El paciente sujeta el brazo afectado con el sano.',
            ],
          },
        ],
      },
      {
        titulo: 'Lo que hay que descartar',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Debajo de la clavícula pasan cosas importantes', texto: 'Los vasos subclavios y el plexo braquial corren justo por detrás. Comprueba pulso radial, sensibilidad y fuerza de la mano. Y ausculta: una fractura desplazada puede lesionar la pleura y producir neumotórax.' },
          {
            tipo: 'pasos',
            titulo: 'Manejo',
            items: [
              'Valoración neurovascular distal antes de tocar nada.',
              'Cabestrillo, con el brazo apoyado contra el tórax.',
              'Analgesia según protocolo.',
              'Reevaluar pulso y sensibilidad después de inmovilizar.',
            ],
          },
          mnemotecnia('DEBAJO DE LA CLAVÍCULA PASAN COSAS. Los vasos subclavios y el plexo braquial corren justo por detrás, y la pleura está debajo. Pulso radial, sensibilidad, fuerza y auscultación: cuatro comprobaciones que convierten una fractura benigna en una fractura valorada.'),
          masPreguntado('Las dos complicaciones que hay que descartar: el compromiso neurovascular —vasos subclavios y plexo braquial— y el neumotórax por lesión pleural de una fractura desplazada. Y que la valoración neurovascular distal va ANTES de tocar nada, y se repite después de inmovilizar.'),
        ],
      },
      erroresFrecuentes([
        ['Inmovilizar antes de valorar', 'La valoración neurovascular distal va antes de tocar nada, y se repite después de inmovilizar: si no hay un antes, no se puede saber si algo cambió.'],
        ['No auscultar', 'Una fractura desplazada puede lesionar la pleura y producir neumotórax. La auscultación es parte de la valoración de una clavícula, no un extra.'],
        ['Olvidar el plexo braquial', 'Corre justo por detrás de la clavícula, con los vasos subclavios. Se comprueban pulso radial, sensibilidad y fuerza de la mano.'],
        ['Dar la fractura por benigna sin comprobarlo', 'Es casi siempre benigna, y eso es lo que hace que se salten las comprobaciones. «Casi siempre» no es «siempre».'],
      ]),
      repasoRapido([
        'Es la fractura más frecuente del cinturón escapular.',
        'Mecanismo típico: caída sobre el hombro o el brazo extendido, o golpe directo.',
        'La mayoría ocurre en el tercio medio, donde la deformidad suele ser visible o palpable.',
        'Dolor localizado que aumenta al mover el hombro.',
        'Deformidad o escalón palpable sobre la clavícula.',
        'Hombro caído hacia adelante y abajo.',
        'El paciente sujeta el brazo afectado con el sano y rechaza moverlo.',
        'Por detrás de la clavícula corren los vasos subclavios y el plexo braquial.',
        'Se comprueban pulso radial, sensibilidad y fuerza de la mano.',
        'Se ausculta: una fractura desplazada puede lesionar la pleura y producir neumotórax.',
        'Manejo: valoración neurovascular distal antes de tocar, cabestrillo con el brazo apoyado contra el tórax y analgesia según protocolo.',
        'Y reevaluar pulso y sensibilidad después de inmovilizar.',
      ]),
      preguntasOrales([
        'Describe el mecanismo típico y la postura con la que llega el paciente.',
        'Enumera los signos de una fractura de clavícula.',
        '¿Qué estructuras pasan por detrás de la clavícula?',
        '¿Qué compruebas para descartar compromiso neurovascular?',
        '¿Por qué se ausculta en una fractura de clavícula?',
        'Recorre el manejo, en orden.',
        '¿Qué se reevalúa después de inmovilizar, y por qué?',
        '¿En qué tercio ocurre la mayoría?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Fractura de clavícula', definicion: 'Solución de continuidad de la clavícula, casi siempre en el tercio medio, por caída sobre el hombro o el brazo extendido.' },
      { termino: 'Plexo braquial', definicion: 'Conjunto de nervios que inerva el miembro superior; transcurre bajo la clavícula y puede lesionarse en fracturas desplazadas.' },
    ],
    flashcards: [
      { frente: '¿Dónde se fractura más la clavícula?', reverso: 'En el tercio medio.' },
      { frente: '¿Qué se descarta siempre en una fractura de clavícula?', reverso: 'Lesión de vasos subclavios, plexo braquial y neumotórax.' },
      { frente: 'Inmovilización de elección', reverso: 'Cabestrillo con el brazo apoyado contra el tórax.' },
    ],
    quiz: [
      {
        pregunta: 'Ciclista con deformidad en tercio medio de clavícula. Refiere hormigueo en la mano y el pulso radial es débil. ¿Qué significa?',
        opciones: [
          'Es normal por el dolor.',
          'Posible compromiso neurovascular: es prioridad y requiere traslado.',
          'Hay que reducir la fractura en la escena.',
          'Basta con un vendaje en ocho.',
        ],
        correcta: 1,
        explicacion: 'El pulso débil con parestesias sugiere afectación de vasos subclavios o plexo braquial: cambia la prioridad del caso.',
      },
      {
        pregunta: 'Además del daño neurovascular, ¿qué complicación torácica hay que descartar?',
        opciones: ['Taponamiento cardiaco', 'Neumotórax', 'Ruptura diafragmática', 'Quilotórax'],
        correcta: 1,
        explicacion: 'Un extremo óseo desplazado puede perforar la pleura apical.',
      },
    ],
    actividades: null,
  },

  'm5-tt-escapula': {
    icono: 'cp-smart-fractura-hombro',
    duracion: '10 min',
    resumen: 'Fractura de escápula: poco frecuente, pero su presencia avisa de que la energía fue enorme.',
    objetivos: [
      'Reconocer la fractura de escápula.',
      'Interpretarla como marcador de alta energía.',
      'Buscar activamente las lesiones asociadas.',
    ],
    secciones: [
      {
        titulo: 'Por qué importa aunque duela poco',
        bloques: [
          { tipo: 'p', texto: 'La escápula está envuelta en músculo y bien protegida. Romperla exige un impacto considerable, así que la fractura vale sobre todo como aviso: la energía que la partió llegó también a lo que tiene alrededor.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que hay que buscar por debajo', texto: 'Contusión pulmonar, neumotórax, fracturas costales, lesión de columna torácica y, en impactos anteriores, lesión de grandes vasos. La escápula rota es una señal, no el problema principal.' },
          {
            tipo: 'lista',
            titulo: 'Signos',
            items: [
              'Dolor a la palpación sobre la escápula, que aumenta al mover el brazo.',
              'El paciente mantiene el brazo inmóvil pegado al cuerpo.',
              'Equimosis en la región posterior del hombro.',
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
              'Cabestrillo y analgesia según protocolo.',
              'Valoración respiratoria completa: auscultar ambos campos.',
              'Búsqueda dirigida de lesiones asociadas.',
              'Traslado a centro con capacidad para trauma.',
            ],
          },
          mnemotecnia('LA ESCÁPULA ROTA ES UNA SEÑAL, NO EL PROBLEMA. Está envuelta en músculo y bien protegida: romperla exige un impacto considerable, y esa energía llegó también a lo que tiene alrededor.'),
          masPreguntado('Que es un marcador de alta energía y lo que obliga a buscar por debajo: contusión pulmonar, neumotórax, fracturas costales, lesión de columna torácica y, en impactos anteriores, lesión de grandes vasos.'),
        ],
      },
      erroresFrecuentes([
        ['Cerrar el caso con el cabestrillo', 'La escápula rota es un aviso. Lo que hay que buscar está debajo: contusión pulmonar, neumotórax, fracturas costales, lesión de columna torácica y, en impactos anteriores, lesión de grandes vasos.'],
        ['Interpretar el poco dolor como poca gravedad', 'El hueso está protegido por músculo y la fractura puede doler poco. La energía necesaria para partirlo no se reduce por eso.'],
        ['No auscultar los dos campos', 'La valoración respiratoria completa es parte del manejo: es donde aparecen el neumotórax y la contusión que la fractura anuncia.'],
        ['Trasladar a cualquier centro', 'Por lo que la fractura anuncia, corresponde un centro con capacidad para trauma.'],
      ]),
      repasoRapido([
        'Es poco frecuente porque la escápula está envuelta en músculo y bien protegida.',
        'Romperla exige un impacto considerable.',
        'Vale sobre todo como aviso: la energía que la partió llegó también a lo de alrededor.',
        'Signos: dolor a la palpación sobre la escápula que aumenta al mover el brazo.',
        'El paciente mantiene el brazo inmóvil pegado al cuerpo.',
        'Equimosis en la región posterior del hombro.',
        'Debajo hay que buscar contusión pulmonar, neumotórax y fracturas costales.',
        'También lesión de columna torácica y, en impactos anteriores, lesión de grandes vasos.',
        'Manejo: cabestrillo y analgesia según protocolo.',
        'Valoración respiratoria completa, auscultando ambos campos.',
        'Búsqueda dirigida de lesiones asociadas.',
        'Traslado a centro con capacidad para trauma.',
      ]),
      preguntasOrales([
        '¿Por qué la fractura de escápula es poco frecuente?',
        '¿Qué significa que sea un marcador de alta energía?',
        'Enumera los signos.',
        'Nombra las lesiones que hay que buscar por debajo.',
        '¿Por qué se auscultan ambos campos?',
        'Recorre el manejo.',
        '¿A qué centro se traslada, y por qué?',
        'El paciente apenas se queja. ¿Cambia algo?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Marcador de alta energía', definicion: 'Lesión que, por requerir gran fuerza, indica probabilidad elevada de otras lesiones graves asociadas.' },
      { termino: 'Fractura de escápula', definicion: 'Poco frecuente por la protección muscular del hueso; su presencia obliga a buscar lesión torácica y espinal.' },
    ],
    flashcards: [
      { frente: '¿Qué significa encontrar una fractura de escápula?', reverso: 'Que el impacto fue de alta energía: hay que buscar lesiones asociadas.' },
      { frente: 'Lesiones asociadas típicas', reverso: 'Contusión pulmonar, neumotórax, fracturas costales y lesión de columna torácica.' },
    ],
    quiz: [
      {
        pregunta: 'Atropellado con fractura de escápula aislada aparente y buen estado general. ¿Cuál es la conducta correcta?',
        opciones: [
          'Alta en el lugar con cabestrillo.',
          'Inmovilizar, auscultar ambos campos, buscar lesiones asociadas y trasladar.',
          'Reducir la fractura.',
          'Vendaje compresivo del tórax.',
        ],
        correcta: 1,
        explicacion: 'La escápula solo se rompe con mucha energía; el riesgo real está en lo que la acompaña y puede manifestarse más tarde.',
      },
    ],
    actividades: null,
  },

  'm5-tt-esofago': {
    icono: 'cp-smart-esofago',
    duracion: '10 min',
    resumen: 'Lesión esofágica: rara, difícil de sospechar y muy letal si se retrasa el diagnóstico.',
    objetivos: [
      'Identificar los mecanismos que producen lesión esofágica.',
      'Reconocer los signos que deben hacerla sospechar.',
      'Comprender por qué el retraso multiplica la mortalidad.',
    ],
    secciones: [
      {
        titulo: 'Cuándo sospecharla',
        bloques: [
          { tipo: 'p', texto: 'El esófago está profundo, en el mediastino posterior, y por eso rara vez se lesiona en trauma cerrado. La causa habitual es penetrante —herida cervical o torácica— y, en el cerrado, un aumento brusco de presión intraesofágica.' },
          {
            tipo: 'lista',
            titulo: 'Signos que deben alertar',
            items: [
              'Dolor retroesternal o de espalda desproporcionado a lo que se ve.',
              'Disfagia u odinofagia (dolor al tragar).',
              'Enfisema subcutáneo en cuello o tórax: aire donde no debería haberlo.',
              'Trayecto de una herida penetrante que apunte al mediastino.',
              'Fiebre y deterioro progresivo horas después del traumatismo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Por qué es tan grave', texto: 'La ruptura vierte contenido digestivo y saliva al mediastino y produce mediastinitis, una infección de mortalidad muy elevada. La supervivencia depende directamente de lo pronto que se repare, así que la sospecha comunicada en la entrega vale tanto como cualquier maniobra.' },
        ],
      },
      {
        titulo: 'Qué hace el TUM',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'No dar nada por vía oral.',
              'Vía aérea y oxigenación; vigilar el enfisema subcutáneo, que puede progresar.',
              'Documentar el trayecto de la herida y el mecanismo con precisión.',
              'Traslado a centro quirúrgico y prealerta con la sospecha explícita.',
            ],
          },
          mnemotecnia('AIRE DONDE NO DEBERÍA HABERLO. El enfisema subcutáneo en cuello o tórax, con dolor desproporcionado y dolor al tragar, es la combinación que hace sospechar el esófago. Y como el esófago está profundo, la causa habitual es penetrante.'),
          masPreguntado('Por qué el retraso multiplica la mortalidad: la ruptura vierte contenido digestivo y saliva al mediastino y produce mediastinitis. La supervivencia depende de lo pronto que se repare, así que la sospecha comunicada en la entrega vale tanto como cualquier maniobra.'),
        ],
      },
      erroresFrecuentes([
        ['Descartarla porque el trauma fue cerrado', 'El esófago está profundo, en el mediastino posterior, y rara vez se lesiona así; pero un aumento brusco de presión intraesofágica puede hacerlo.'],
        ['Dar algo por vía oral', 'No se da nada por vía oral ante la sospecha: se vierte más contenido al mediastino.'],
        ['No documentar el trayecto de la herida', 'Un trayecto que apunte al mediastino es uno de los datos que sostienen la sospecha, y solo puede recogerlo quien vio la herida.'],
        ['Entregar sin nombrar la sospecha', 'La supervivencia depende de lo pronto que se repare. Una sospecha explícita en la prealerta vale tanto como cualquier maniobra.'],
      ]),
      repasoRapido([
        'Es rara, difícil de sospechar y muy letal si se retrasa el diagnóstico.',
        'El esófago está profundo, en el mediastino posterior.',
        'La causa habitual es penetrante: herida cervical o torácica.',
        'En el trauma cerrado, un aumento brusco de presión intraesofágica.',
        'Alerta el dolor retroesternal o de espalda desproporcionado a lo que se ve.',
        'También la disfagia y la odinofagia, que es el dolor al tragar.',
        'El enfisema subcutáneo en cuello o tórax es aire donde no debería haberlo.',
        'Un trayecto de herida penetrante que apunte al mediastino sostiene la sospecha.',
        'Fiebre y deterioro progresivo horas después del traumatismo también.',
        'La ruptura vierte contenido digestivo y saliva al mediastino: mediastinitis, de mortalidad muy elevada.',
        'Conducta: no dar nada por vía oral; vía aérea y oxigenación; vigilar el enfisema, que puede progresar.',
        'Documentar el trayecto y el mecanismo con precisión, y trasladar a centro quirúrgico con prealerta explícita.',
      ]),
      preguntasOrales([
        '¿Por qué la lesión esofágica es rara en trauma cerrado?',
        'Enumera los signos que deben alertar.',
        '¿Qué es la odinofagia?',
        '¿Qué significa encontrar enfisema subcutáneo?',
        'Explica por qué la lesión esofágica es tan grave.',
        '¿Por qué no se da nada por vía oral?',
        'Recorre lo que hace el equipo prehospitalario.',
        '¿Por qué la sospecha comunicada vale tanto como una maniobra?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Mediastinitis', definicion: 'Infección del mediastino, complicación de la perforación esofágica, con mortalidad muy alta si se retrasa el tratamiento.' },
      { termino: 'Enfisema subcutáneo', definicion: 'Aire atrapado bajo la piel; se palpa como crepitación y señala fuga desde vía aérea o digestiva.' },
      { termino: 'Odinofagia', definicion: 'Dolor al tragar.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el mecanismo más frecuente de lesión esofágica?', reverso: 'Trauma penetrante cervical o torácico.' },
      { frente: '¿Qué complicación la vuelve mortal?', reverso: 'La mediastinitis por vertido de contenido digestivo.' },
      { frente: 'Signo palpable que debe alertar', reverso: 'Enfisema subcutáneo en cuello o tórax.' },
    ],
    quiz: [
      {
        pregunta: 'Herida por arma blanca en región cervical baja. El paciente refiere dolor al tragar y palpas crepitación en el cuello. ¿Qué sospechas?',
        opciones: [
          'Fractura de clavícula.',
          'Lesión de vía aérea o esófago con enfisema subcutáneo.',
          'Hematoma simple.',
          'Contusión muscular.',
        ],
        correcta: 1,
        explicacion: 'La crepitación indica aire en los tejidos: procede de la vía aérea o del tubo digestivo. Ambas posibilidades exigen traslado urgente y prealerta.',
      },
      {
        pregunta: '¿Por qué no se administra nada por vía oral ante sospecha de lesión esofágica?',
        opciones: [
          'Porque produce vómito.',
          'Porque lo ingerido puede pasar al mediastino a través de la perforación.',
          'Porque retrasa la radiografía.',
          'Porque provoca disfagia.',
        ],
        correcta: 1,
        explicacion: 'Cualquier líquido o alimento atraviesa la solución de continuidad y agrava la contaminación mediastínica.',
      },
    ],
    actividades: null,
  },

  'm5-tt-neumotorax-tension': {
    icono: 'cp-servier-neumotorax',
    duracion: '16 min',
    resumen: 'Neumotórax a tensión: la emergencia torácica por excelencia. Se diagnostica clínicamente y se trata en la escena.',
    objetivos: [
      'Explicar el mecanismo de válvula que lo produce.',
      'Reconocerlo sin estudios de imagen.',
      'Actuar con la urgencia que exige, sin esperar confirmación.',
    ],
    secciones: [
      {
        titulo: 'El mecanismo de válvula',
        bloques: [
          { tipo: 'p', texto: 'Una lesión permite que el aire entre al espacio pleural en cada inspiración pero no salga en la espiración. El aire se acumula, la presión sube, el pulmón se colapsa por completo y el mediastino se desplaza al lado sano.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que realmente mata', texto: 'No es la falta de pulmón: es que el desplazamiento acoda las venas cavas y bloquea el retorno venoso al corazón. Por eso produce shock obstructivo con yugulares ingurgitadas, y por eso mata en minutos.' },
        ],
      },
      {
        titulo: 'Reconocimiento clínico',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Signos, del más precoz al más tardío',
            headers: ['Signo', 'Cuándo aparece'],
            filas: [
              ['Disnea creciente y agitación', 'Precoz'],
              ['Taquicardia e hipotensión', 'Precoz-intermedio'],
              ['Ruidos respiratorios ausentes en un hemitórax', 'Intermedio'],
              ['Hipertimpanismo a la percusión', 'Intermedio'],
              ['Ingurgitación yugular', 'Intermedio (puede faltar si hay hipovolemia)'],
              ['Desviación traqueal al lado contrario', 'TARDÍO'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No esperes la desviación traqueal', texto: 'Es un signo tardío y a menudo difícil de apreciar. Si esperas a verla para actuar, llegas tarde. Y la ingurgitación yugular puede NO estar si el paciente además está sangrando.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sospéchalo siempre en el ventilado que se deteriora', texto: 'Un paciente con ventilación a presión positiva que empeora de golpe —cuesta ventilarlo, cae la saturación, cae la presión— tiene un neumotórax a tensión hasta demostrar lo contrario: la presión positiva lo crea y lo agrava.' },
        ],
      },
      {
        titulo: 'Tratamiento',
        bloques: [
          { tipo: 'p', texto: 'El tratamiento es la descompresión, y se hace en la escena. El diagnóstico es clínico: no se traslada a un paciente con neumotórax a tensión para confirmarlo con una radiografía.' },
          { tipo: 'callout', variante: 'dosis', titulo: 'Descompresión con aguja', texto: 'Se realiza con catéter sobre aguja en el hemitórax afectado, en los puntos que marque el protocolo del servicio. La técnica, el calibre, la longitud del catéter y el sitio exacto dependen del protocolo y del nivel de atención: es un procedimiento reglado, no improvisable, y debe practicarse antes de necesitarlo. ALCANCE: estudiarlo no autoriza a realizarlo. Es un procedimiento invasivo cuya ejecución depende de la certificación del prestador, del equipamiento de la unidad y de la dirección médica que respalde la indicación.' },
          {
            tipo: 'lista',
            titulo: 'Además',
            items: [
              'Oxígeno a alto flujo.',
              'Reevaluar inmediatamente: la mejoría suele ser evidente y rápida.',
              'Vigilar recidiva: el catéter puede acodarse u obstruirse.',
              'Traslado urgente: la descompresión es temporal; el tratamiento definitivo es el drenaje torácico.',
            ],
          },
          mnemotecnia('NO ES QUE FALTE PULMÓN, ES QUE SE ACODAN LAS CAVAS. El desplazamiento del mediastino bloquea el retorno venoso al corazón: de ahí el shock obstructivo con yugulares ingurgitadas, y de ahí que mate en minutos.'),
          masPreguntado('Que la desviación traqueal es un signo TARDÍO y esperarla es llegar tarde, que la ingurgitación yugular puede faltar si el paciente además está sangrando, y que el diagnóstico es clínico: no se traslada para confirmarlo con una radiografía.'),
        ],
      },
      erroresFrecuentes([
        ['Esperar la desviación traqueal para actuar', 'Es un signo tardío y a menudo difícil de apreciar. Si se espera a verla, se llega tarde.'],
        ['Descartarlo porque no hay ingurgitación yugular', 'Puede no estar si el paciente además está sangrando. La hipovolemia coexistente borra ese signo.'],
        ['Trasladar para confirmarlo con imagen', 'El diagnóstico es clínico y el tratamiento se hace en la escena. No se traslada a un paciente con neumotórax a tensión para confirmarlo con una radiografía.'],
        ['No sospecharlo en el paciente ventilado que se deteriora', 'Un paciente con ventilación a presión positiva que empeora de golpe —cuesta ventilarlo, cae la saturación, cae la presión— tiene un neumotórax a tensión hasta demostrar lo contrario: la presión positiva lo crea y lo agrava.'],
      ]),
      repasoRapido([
        'Una lesión permite que el aire entre al espacio pleural en cada inspiración pero no salga en la espiración.',
        'El aire se acumula, la presión sube, el pulmón se colapsa por completo y el mediastino se desplaza al lado sano.',
        'Lo que mata es que el desplazamiento acoda las venas cavas y bloquea el retorno venoso.',
        'Produce shock obstructivo con yugulares ingurgitadas, y mata en minutos.',
        'Precoces: disnea creciente y agitación; después taquicardia e hipotensión.',
        'Intermedios: ruidos respiratorios ausentes en un hemitórax, hipertimpanismo e ingurgitación yugular.',
        'La ingurgitación puede faltar si hay hipovolemia.',
        'Tardío: desviación traqueal al lado contrario. No se espera para actuar.',
        'Se sospecha siempre en el paciente ventilado a presión positiva que se deteriora de golpe.',
        'El tratamiento es la descompresión y se hace en la escena; el diagnóstico es clínico.',
        'La técnica, el calibre, la longitud del catéter y el sitio exacto dependen del protocolo y del nivel de atención.',
        'Además: oxígeno a alto flujo, reevaluar de inmediato, vigilar recidiva por acodamiento u obstrucción, y traslado urgente porque el tratamiento definitivo es el drenaje.',
      ]),
      preguntasOrales([
        'Explica el mecanismo de válvula.',
        '¿Por qué el neumotórax a tensión mata en minutos?',
        'Ordena los signos del más precoz al más tardío.',
        '¿Por qué no se espera la desviación traqueal?',
        '¿Cuándo puede faltar la ingurgitación yugular?',
        '¿Por qué no se traslada para confirmarlo con imagen?',
        '¿Qué sospechas en un paciente ventilado que se deteriora de golpe?',
        '¿Qué se vigila después de descomprimir?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Neumotórax a tensión', definicion: 'Acumulación progresiva de aire a presión en el espacio pleural que colapsa el pulmón, desplaza el mediastino y obstruye el retorno venoso.' },
      { termino: 'Shock obstructivo', definicion: 'Hipoperfusión por obstrucción mecánica al llenado o a la eyección cardiaca; el neumotórax a tensión y el taponamiento son sus causas típicas en trauma.' },
      { termino: 'Descompresión con aguja', definicion: 'Punción torácica que convierte el neumotórax a tensión en uno simple, aliviando la obstrucción al retorno venoso.' },
    ],
    flashcards: [
      { frente: '¿Por qué mata el neumotórax a tensión?', reverso: 'Porque obstruye el retorno venoso al corazón, no solo por el pulmón colapsado.' },
      { frente: '¿Cuál es un signo TARDÍO que no se debe esperar?', reverso: 'La desviación traqueal.' },
      { frente: '¿Cómo se diagnostica?', reverso: 'Clínicamente. No se retrasa el tratamiento para hacer una radiografía.' },
      { frente: 'Paciente ventilado que se deteriora bruscamente: ¿qué sospechas?', reverso: 'Neumotórax a tensión: la presión positiva lo provoca y lo agrava.' },
      { frente: '¿La descompresión con aguja es tratamiento definitivo?', reverso: 'No: es temporal. El definitivo es el drenaje torácico.' },
    ],
    quiz: [
      {
        pregunta: 'Trauma torácico cerrado. Disnea intensa, TA 76/48, FC 138, ausencia de ruidos en hemitórax izquierdo, yugulares ingurgitadas. ¿Qué haces?',
        opciones: [
          'Trasladas para radiografía de tórax.',
          'Cargas líquidos y observas.',
          'Sospechas neumotórax a tensión y descomprimes según protocolo.',
          'Colocas al paciente en decúbito lateral izquierdo.',
        ],
        correcta: 2,
        explicacion: 'Es el cuadro completo. El diagnóstico es clínico y el tratamiento no espera al hospital: cada minuto de obstrucción del retorno venoso cuenta.',
      },
      {
        pregunta: 'Un paciente politraumatizado con hemorragia importante tiene neumotórax a tensión. ¿Qué signo puede FALTAR?',
        opciones: [
          'La ausencia de ruidos respiratorios.',
          'La ingurgitación yugular.',
          'La disnea.',
          'La taquicardia.',
        ],
        correcta: 1,
        explicacion: 'Si el paciente está hipovolémico, puede no tener suficiente volumen para ingurgitar las yugulares; su ausencia no descarta el diagnóstico.',
      },
      {
        pregunta: 'Tras descomprimir con aguja, el paciente mejora y luego vuelve a deteriorarse. ¿Qué piensas primero?',
        opciones: [
          'Que el diagnóstico era incorrecto.',
          'Que el catéter se acodó u obstruyó y la tensión se reacumuló.',
          'Que necesita sedación.',
          'Que hay que descomprimir el lado contrario.',
        ],
        correcta: 1,
        explicacion: 'Los catéteres finos se acodan y obstruyen con facilidad; la recidiva obliga a reevaluar y, si procede, repetir la descompresión.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el manejo del neumotórax a tensión',
        pasos: [
          'Reconocer el cuadro clínicamente',
          'Administrar oxígeno a alto flujo',
          'Descomprimir según protocolo del servicio',
          'Reevaluar la respuesta de inmediato',
          'Trasladar con urgencia para drenaje torácico definitivo',
        ],
      },
    },
  },

  'm5-tt-hemoneumotorax': {
    icono: 'cp-servier-neumotorax',
    duracion: '11 min',
    resumen: 'Hemoneumotórax: aire y sangre en el mismo espacio pleural. Suma el problema ventilatorio al hemorrágico.',
    objetivos: [
      'Reconocer la combinación de hemotórax y neumotórax.',
      'Distinguir la percusión mate de la timpánica y lo que implica cada una.',
      'Priorizar según predomine el sangrado o el aire.',
    ],
    secciones: [
      {
        titulo: 'Dos problemas a la vez',
        bloques: [
          { tipo: 'p', texto: 'La misma lesión que deja entrar aire —costilla fracturada, herida penetrante— rompe vasos de la pared o del pulmón. El resultado es aire arriba y sangre abajo, con el pulmón comprimido entre ambos.' },
          {
            tipo: 'tabla',
            titulo: 'Lo que dice la exploración',
            headers: ['Hallazgo', 'Sugiere'],
            filas: [
              ['Percusión timpánica en campos superiores', 'Aire (neumotórax)'],
              ['Percusión mate en campos inferiores', 'Sangre (hemotórax)'],
              ['Ruidos disminuidos o ausentes', 'Ambos'],
              ['Signos de shock hipovolémico', 'Predomina el sangrado'],
              ['Ingurgitación yugular con disnea extrema', 'Componente a tensión'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El tórax como reservorio', texto: 'Un hemitórax puede alojar una cantidad enorme de sangre sin que se vea nada por fuera. Es uno de los cinco lugares donde se esconde una hemorragia, y explica shocks sin herida visible.' },
        ],
      },
      {
        titulo: 'Manejo',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Oxígeno a alto flujo y apoyo ventilatorio si lo precisa.',
              'Si hay componente a tensión, descomprimir según protocolo.',
              'Tratar el shock: control de hemorragia, prevención de hipotermia, fluidoterapia según protocolo.',
              'Si la herida torácica es abierta, manejarla conforme al tema de neumotórax abierto: dejarla expuesta, apósito limpio y seco no oclusivo o sello ventilado, aflojando o retirando si la respiración empeora.',
              'Traslado urgente: necesita drenaje torácico y, si el sangrado es masivo, quirófano.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No demorar por completar procedimientos', texto: 'Un hemotórax masivo se resuelve en quirófano. Todo lo que se haga en la escena es para que llegue vivo, no para estabilizarlo del todo allí.' },
          mnemotecnia('AIRE ARRIBA, SANGRE ABAJO, PULMÓN EN MEDIO. El aire sube y da percusión timpánica en los campos superiores; la sangre baja y da matidez en los inferiores. Y el pulmón queda comprimido entre las dos cosas.'),
          masPreguntado('Cómo se lee la percusión en este cuadro y qué prioriza el manejo: si predomina el sangrado, los signos son de shock hipovolémico; si hay componente a tensión, aparecen ingurgitación yugular y disnea extrema. El manejo prioriza el componente que domine la situación del paciente.'),
        ],
      },
      erroresFrecuentes([
        ['Demorar el traslado para completar procedimientos', 'Un hemotórax masivo se resuelve en quirófano. Todo lo que se hace en la escena es para que el paciente llegue vivo, no para estabilizarlo del todo allí.'],
        ['Atender solo el aire o solo la sangre', 'Son dos problemas simultáneos. El manejo prioriza el que domine la situación, pero el otro sigue existiendo.'],
        ['No pensar en el tórax ante un shock sin herida visible', 'Un hemitórax puede alojar una cantidad enorme de sangre sin que se vea nada por fuera: es uno de los cinco lugares donde se esconde una hemorragia.'],
        ['Ocluir por completo la herida de la pared', 'Si la herida es abierta se maneja conforme al tema de neumotórax abierto: expuesta, apósito limpio y seco no oclusivo o sello ventilado, aflojando o retirando si la respiración empeora.'],
      ]),
      repasoRapido([
        'Es la presencia simultánea de aire y sangre en el mismo espacio pleural.',
        'La misma lesión que deja entrar aire —costilla fracturada, herida penetrante— rompe vasos de la pared o del pulmón.',
        'El resultado es aire arriba y sangre abajo, con el pulmón comprimido entre ambos.',
        'Percusión timpánica en campos superiores: aire.',
        'Percusión mate en campos inferiores: sangre.',
        'Ruidos disminuidos o ausentes: los dos componentes.',
        'Signos de shock hipovolémico: predomina el sangrado.',
        'Ingurgitación yugular con disnea extrema: componente a tensión.',
        'El tórax es un reservorio: explica shocks sin herida visible.',
        'Manejo: oxígeno a alto flujo y apoyo ventilatorio si lo precisa; descompresión según protocolo si hay componente a tensión.',
        'Tratar el shock: control de hemorragia, prevención de hipotermia y fluidoterapia según protocolo.',
        'Traslado urgente: necesita drenaje torácico y, si el sangrado es masivo, quirófano.',
      ]),
      preguntasOrales([
        '¿Qué es un hemoneumotórax y por qué aparecen las dos cosas juntas?',
        'Diferencia la percusión mate de la timpánica y di qué sugiere cada una.',
        '¿Qué te dice un shock hipovolémico en este cuadro?',
        '¿Y una ingurgitación yugular con disnea extrema?',
        'Recorre el manejo.',
        '¿Cómo manejas la herida si es abierta?',
        '¿Por qué no se demora el traslado?',
        '¿Dónde se resuelve un hemotórax masivo?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Hemoneumotórax', definicion: 'Presencia simultánea de aire y sangre en el espacio pleural.' },
      { termino: 'Percusión mate', definicion: 'Sonido apagado a la percusión que indica líquido, en este contexto sangre.' },
      { termino: 'Hemotórax masivo', definicion: 'Acumulación de gran volumen de sangre en el hemitórax; causa shock y requiere cirugía.' },
    ],
    flashcards: [
      { frente: '¿Qué indica una percusión mate en la base del tórax?', reverso: 'Líquido: en trauma, sangre (hemotórax).' },
      { frente: '¿Y timpánica en el vértice?', reverso: 'Aire: neumotórax.' },
      { frente: '¿Por qué el tórax explica shocks sin herida visible?', reverso: 'Porque un hemitórax puede alojar una gran cantidad de sangre.' },
    ],
    quiz: [
      {
        pregunta: 'Herida penetrante en tórax derecho. Ruidos ausentes, percusión mate en la base, TA 84/52, FC 130, piel fría. ¿Qué predomina?',
        opciones: [
          'El componente aéreo: es un neumotórax simple.',
          'El componente hemorrágico: hemotórax con shock hipovolémico.',
          'Un taponamiento cardiaco.',
          'Una contusión pulmonar aislada.',
        ],
        correcta: 1,
        explicacion: 'La matidez indica sangre, y la hipotensión con piel fría señala que el problema dominante es la pérdida de volumen.',
      },
      {
        pregunta: '¿Cuál es el tratamiento definitivo del hemoneumotórax?',
        opciones: [
          'La descompresión con aguja.',
          'El drenaje torácico, y cirugía si el sangrado es masivo.',
          'El apósito de tres lados.',
          'La ventilación con presión positiva.',
        ],
        correcta: 1,
        explicacion: 'La aguja y el apósito son medidas temporales de la escena; el drenaje evacúa aire y sangre y permite reexpandir el pulmón.',
      },
    ],
    actividades: null,
  },

  'm5-tt-quilotorax': {
    icono: 'cp-servier-linfatico',
    duracion: '9 min',
    resumen: 'Quilotórax: linfa en el espacio pleural por lesión del conducto torácico. Raro, de aparición tardía y con repercusión nutricional e inmunitaria.',
    objetivos: [
      'Identificar el mecanismo de lesión del conducto torácico.',
      'Reconocer por qué se manifiesta tarde.',
      'Diferenciarlo del hemotórax.',
    ],
    secciones: [
      {
        titulo: 'Qué es y por qué aparece tarde',
        bloques: [
          { tipo: 'p', texto: 'El conducto torácico recoge la linfa de casi todo el cuerpo y la vierte en el sistema venoso. Si se rompe —por trauma penetrante, cirugía o, con menos frecuencia, por trauma cerrado con hiperextensión de la columna—, la linfa se acumula en la pleura.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La clave del retraso', texto: 'La linfa transporta las grasas absorbidas en el intestino. Con el paciente en ayuno el flujo es escaso, así que el derrame tarda en hacerse evidente: puede pasar más de un día hasta que da síntomas. Casi nunca es un diagnóstico prehospitalario.' },
          { tipo: 'p', texto: 'Cuando se drena, el líquido tiene aspecto lechoso característico, muy distinto de la sangre del hemotórax.' },
        ],
      },
      {
        titulo: 'Repercusión y manejo',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Por qué no es banal',
            items: [
              'Comprime el pulmón: dificultad respiratoria progresiva.',
              'Pierde proteínas y grasas: desnutrición si se prolonga.',
              'Pierde linfocitos: inmunodepresión.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que aporta el prehospitalario', texto: 'Rara vez se detecta en la escena. Lo útil es documentar bien el mecanismo —sobre todo heridas penetrantes torácicas o cervicales bajas— para que quien atienda después tenga el antecedente cuando aparezca un derrame días más tarde.' },
          mnemotecnia('SIN COMER NO HAY QUILO. La linfa transporta las grasas absorbidas en el intestino, así que con el paciente en ayuno el flujo es escaso y el derrame tarda en hacerse evidente. Esa es toda la razón del retraso.'),
          masPreguntado('Por qué se manifiesta tarde y por qué casi nunca es un diagnóstico prehospitalario; y qué sí aporta el equipo: documentar bien el mecanismo, sobre todo heridas penetrantes torácicas o cervicales bajas, para que quien atienda después tenga el antecedente.'),
        ],
      },
      erroresFrecuentes([
        ['Esperar detectarlo en la escena', 'Casi nunca es un diagnóstico prehospitalario: el derrame tarda en hacerse evidente y puede pasar más de un día hasta que da síntomas.'],
        ['No documentar el mecanismo', 'Es lo único que aporta el ámbito prehospitalario a este cuadro: el antecedente de una herida penetrante torácica o cervical baja, para cuando aparezca un derrame días más tarde.'],
        ['Confundirlo con un hemotórax al drenarlo', 'El líquido tiene aspecto lechoso característico, muy distinto de la sangre del hemotórax.'],
        ['Tratarlo como banal por ser tardío', 'Comprime el pulmón, pierde proteínas y grasas y pierde linfocitos: dificultad respiratoria progresiva, desnutrición si se prolonga e inmunodepresión.'],
      ]),
      repasoRapido([
        'Es linfa acumulada en el espacio pleural por lesión del conducto torácico.',
        'El conducto torácico recoge la linfa de casi todo el cuerpo y la vierte en el sistema venoso.',
        'Se rompe por trauma penetrante, por cirugía o, con menos frecuencia, por trauma cerrado con hiperextensión de la columna.',
        'La linfa transporta las grasas absorbidas en el intestino.',
        'Con el paciente en ayuno el flujo es escaso, así que el derrame tarda en hacerse evidente.',
        'Puede pasar más de un día hasta que da síntomas: casi nunca es un diagnóstico prehospitalario.',
        'Al drenarlo, el líquido tiene aspecto lechoso característico, distinto de la sangre.',
        'No es banal: comprime el pulmón y produce dificultad respiratoria progresiva.',
        'Pierde proteínas y grasas, con desnutrición si se prolonga.',
        'Pierde linfocitos, con inmunodepresión.',
        'Lo útil del ámbito prehospitalario es documentar bien el mecanismo.',
        'Sobre todo las heridas penetrantes torácicas o cervicales bajas.',
      ]),
      preguntasOrales([
        '¿Qué es el quilotórax y de qué estructura procede?',
        '¿Qué recoge y dónde vierte el conducto torácico?',
        'Enumera los mecanismos que lo lesionan.',
        'Explica por qué el derrame aparece tarde.',
        '¿Qué aspecto tiene el líquido al drenarlo?',
        '¿Por qué no es un cuadro banal?',
        '¿Qué aporta el ámbito prehospitalario?',
        '¿Por qué importa el antecedente de una herida cervical baja?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Quilotórax', definicion: 'Acumulación de linfa (quilo) en el espacio pleural por lesión del conducto torácico.' },
      { termino: 'Conducto torácico', definicion: 'Vaso linfático principal que drena la linfa de la mayor parte del cuerpo hacia el sistema venoso.' },
    ],
    flashcards: [
      { frente: '¿Qué contiene el derrame en un quilotórax?', reverso: 'Linfa, de aspecto lechoso.' },
      { frente: '¿Por qué se manifiesta tarde?', reverso: 'Porque el flujo linfático depende de la ingesta de grasas: en ayuno es escaso.' },
      { frente: 'Consecuencias de un quilotórax prolongado', reverso: 'Desnutrición e inmunodepresión, además de compresión pulmonar.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con herida penetrante torácica desarrolla derrame pleural lechoso a las 48 horas. ¿Qué es?',
        opciones: ['Hemotórax tardío', 'Quilotórax', 'Empiema', 'Neumotórax'],
        correcta: 1,
        explicacion: 'El aspecto lechoso y la aparición diferida son característicos de la lesión del conducto torácico.',
      },
      {
        pregunta: '¿Cuál es la aportación realista del TUM ante esta lesión?',
        opciones: [
          'Diagnosticarla en la escena.',
          'Drenar el derrame.',
          'Documentar con precisión el mecanismo y el trayecto de la herida.',
          'Administrar dieta sin grasa.',
        ],
        correcta: 2,
        explicacion: 'El diagnóstico es posterior; el antecedente bien registrado es lo que permite sospecharla cuando aparece.',
      },
    ],
    actividades: null,
  },

  'm5-tt-contusion-pulmonar': {
    icono: 'cp-servier-via-intrapulmonar',
    duracion: '13 min',
    resumen: 'Contusión pulmonar: el pulmón golpeado se inflama y deja de intercambiar. Empeora con las horas y con los líquidos.',
    objetivos: [
      'Reconocer la contusión pulmonar y su evolución diferida.',
      'Anticipar el deterioro respiratorio progresivo.',
      'Justificar la prudencia con la fluidoterapia.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre en el pulmón',
        bloques: [
          { tipo: 'p', texto: 'El impacto rompe capilares y alvéolos. La sangre y el líquido inflamatorio ocupan el alvéolo, que deja de intercambiar gases: la sangre pasa por delante de una zona que no oxigena. Eso produce hipoxemia que empeora conforme el edema aumenta.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo peligroso es que evoluciona', texto: 'El paciente puede llegar casi bien y deteriorarse en las horas siguientes. Es la lesión torácica potencialmente letal más frecuente en trauma cerrado, y la que más se subestima en la valoración inicial.' },
          {
            tipo: 'lista',
            titulo: 'Cuándo sospecharla',
            items: [
              'Mecanismo de alta energía: colisión, caída, onda expansiva.',
              'Fracturas costales múltiples o tórax inestable.',
              'Marca del cinturón o del volante en el tórax.',
              'Hipoxemia que no se explica por otra causa.',
              'Estertores o disminución de ruidos en la zona golpeada.',
            ],
          },
        ],
      },
      {
        titulo: 'Manejo prehospitalario',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Oxígeno y vigilancia estrecha de la saturación.',
              'Apoyo ventilatorio si el trabajo respiratorio aumenta.',
              'Analgesia según protocolo: el dolor impide ventilar y empeora la hipoxemia.',
              'Fluidoterapia prudente.',
              'Reevaluación frecuente durante el traslado: aquí es donde se ve el deterioro.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué prudencia con los líquidos', texto: 'El pulmón contundido tiene los capilares dañados y con fuga: el exceso de volumen se va al alvéolo y empeora la oxigenación. Esto no significa negar líquido al paciente en shock hemorrágico —eso lo mataría antes—, sino no cargar volumen sin indicación.' },
          mnemotecnia('LA SANGRE PASA POR DELANTE DE UNA ZONA QUE NO OXIGENA. La sangre y el líquido inflamatorio ocupan el alvéolo y este deja de intercambiar. De ahí la hipoxemia, y de ahí que empeore conforme el edema aumenta.'),
          masPreguntado('Que evoluciona: el paciente puede llegar casi bien y deteriorarse en las horas siguientes. Es la lesión torácica potencialmente letal más frecuente en trauma cerrado y la que más se subestima en la valoración inicial.'),
        ],
      },
      erroresFrecuentes([
        ['Dar el caso por resuelto en la valoración inicial', 'El paciente puede llegar casi bien y deteriorarse en las horas siguientes. Es la lesión torácica potencialmente letal más frecuente en trauma cerrado y la que más se subestima.'],
        ['Cargar volumen sin indicación', 'El pulmón contundido tiene los capilares dañados y con fuga: el exceso de volumen se va al alvéolo y empeora la oxigenación.'],
        ['Negar líquido al paciente en shock hemorrágico', 'La prudencia con los líquidos no es lo mismo que negarlos: a un paciente en shock hemorrágico eso lo mataría antes. Lo que no se hace es cargar volumen sin indicación.'],
        ['Tratar el dolor como accesorio', 'El dolor impide ventilar y empeora la hipoxemia. La analgesia según protocolo es parte del manejo respiratorio.'],
      ]),
      repasoRapido([
        'El impacto rompe capilares y alvéolos.',
        'La sangre y el líquido inflamatorio ocupan el alvéolo, que deja de intercambiar gases.',
        'La sangre pasa por delante de una zona que no oxigena: hipoxemia.',
        'Empeora conforme el edema aumenta.',
        'Es la lesión torácica potencialmente letal más frecuente en trauma cerrado.',
        'Y la que más se subestima en la valoración inicial, porque evoluciona con las horas.',
        'Se sospecha ante mecanismo de alta energía: colisión, caída, onda expansiva.',
        'También ante fracturas costales múltiples o tórax inestable, y ante marca del cinturón o del volante.',
        'Y ante hipoxemia que no se explica por otra causa, o estertores y ruidos disminuidos en la zona golpeada.',
        'Manejo: oxígeno con vigilancia estrecha de la saturación y apoyo ventilatorio si aumenta el trabajo.',
        'Analgesia según protocolo, porque el dolor impide ventilar.',
        'Fluidoterapia prudente y reevaluación frecuente durante el traslado, que es donde se ve el deterioro.',
      ]),
      preguntasOrales([
        'Explica qué le ocurre al alvéolo contundido.',
        '¿Por qué produce hipoxemia?',
        '¿Por qué se dice que es la lesión que más se subestima?',
        'Enumera cuándo hay que sospecharla.',
        '¿Por qué prudencia con los líquidos?',
        '¿Significa eso negar líquido a un paciente en shock hemorrágico?',
        '¿Qué papel tiene la analgesia aquí?',
        '¿Dónde se detecta el deterioro?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Contusión pulmonar', definicion: 'Lesión del parénquima con hemorragia y edema alveolar que altera el intercambio gaseoso; de evolución progresiva.' },
      { termino: 'Hipoxemia', definicion: 'Oxígeno insuficiente en la sangre arterial.' },
      { termino: 'Evolución diferida', definicion: 'Empeoramiento que aparece horas después del traumatismo, no en la valoración inicial.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la lesión torácica potencialmente letal más frecuente en trauma cerrado?', reverso: 'La contusión pulmonar.' },
      { frente: '¿Por qué es traicionera?', reverso: 'Porque evoluciona en horas: el paciente puede llegar casi bien.' },
      { frente: '¿Por qué prudencia con los líquidos?', reverso: 'Porque el capilar dañado tiene fuga y el exceso empeora el edema alveolar.' },
      { frente: '¿Por qué importa la analgesia aquí?', reverso: 'Porque el dolor impide ventilar bien y agrava la hipoxemia.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión frontal con marca del volante en el tórax. Al inicio SatO₂ 96 %; 40 minutos después, 88 % con más trabajo respiratorio. ¿Qué ocurre?',
        opciones: [
          'Se está desarrollando un neumotórax a tensión.',
          'Es la evolución esperable de una contusión pulmonar.',
          'Está hiperventilando por ansiedad.',
          'El sensor está mal colocado.',
        ],
        correcta: 1,
        explicacion: 'El deterioro progresivo de la oxigenación en las horas siguientes a un impacto torácico es el comportamiento típico de la contusión. Aun así, hay que descartar neumotórax reevaluando.',
      },
      {
        pregunta: '¿Cuál es la conducta correcta respecto a los líquidos?',
        opciones: [
          'Carga rápida sistemática para mantener la presión.',
          'Prudencia: administrarlos solo con indicación, porque el exceso empeora el edema.',
          'No administrar líquidos bajo ninguna circunstancia.',
          'Sustituirlos por diuréticos.',
        ],
        correcta: 1,
        explicacion: 'Ni carga sistemática ni negación absoluta: el paciente en shock hemorrágico necesita volumen, pero el exceso injustificado empeora el pulmón.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La contusión pulmonar es traicionera porque su deterioro es ___.',
          opciones: ['inmediato', 'progresivo en horas', 'inexistente'],
          correcta: 1,
          explicacion: 'Por eso la reevaluación durante el traslado es imprescindible.',
        },
      ],
    },
  },

  'm5-tt-asfixia-traumatica': {
    icono: 'cp-servier-capilares',
    duracion: '10 min',
    resumen: 'Asfixia traumática: compresión brusca del tórax que invierte el flujo venoso. Aparatosa de ver, y marcador de un aplastamiento grave.',
    objetivos: [
      'Reconocer el aspecto característico de la asfixia traumática.',
      'Explicar el mecanismo de inversión del flujo venoso.',
      'Interpretarla como señal de lesiones internas asociadas.',
    ],
    secciones: [
      {
        titulo: 'Mecanismo y aspecto',
        bloques: [
          { tipo: 'p', texto: 'Una compresión súbita e intensa del tórax —vuelco de vehículo, derrumbe, atrapamiento bajo una carga— con la glotis cerrada dispara la presión dentro del tórax. La sangre de las venas cavas retrocede hacia la cabeza y el cuello, donde no hay válvulas que lo impidan, y revienta los capilares.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se ve',
            items: [
              'Cara, cuello y parte superior del tórax de color azul-violáceo intenso.',
              'Petequias abundantes en esa zona.',
              'Hemorragia subconjuntival, a veces espectacular.',
              'Edema facial y de párpados.',
              'Límite neto: por debajo del punto de compresión la piel es normal.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El contraste es el signo', texto: 'Ese corte limpio entre la mitad superior amoratada y el resto del cuerpo normal es lo que identifica el cuadro y lo distingue de la cianosis por hipoxia, que es generalizada.' },
        ],
      },
      {
        titulo: 'Lo que importa de verdad',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'El color no es el problema', texto: 'La coloración es llamativa pero suele resolverse sola en días. Lo grave es la energía que hizo falta para producirla: busca contusión pulmonar, fracturas costales, lesión cardiaca, trauma abdominal y lesión de columna. La asfixia traumática es un cartel que dice «aquí hubo aplastamiento».' },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Oxígeno y valoración respiratoria completa.',
              'Restricción del movimiento espinal si el mecanismo lo indica.',
              'Búsqueda dirigida de lesiones asociadas.',
              'Vigilar el estado neurológico: la hipertensión venosa cerebral puede alterarlo.',
              'Traslado a centro de trauma.',
            ],
          },
          mnemotecnia('EL CORTE LIMPIO ES EL SIGNO. Mitad superior amoratada y el resto del cuerpo normal, con un límite neto en el punto de compresión. Eso la distingue de la cianosis por hipoxia, que es generalizada.'),
          masPreguntado('Que el color no es el problema: es llamativo y suele resolverse solo en días. Lo grave es la energía que hizo falta para producirlo, y por eso se buscan contusión pulmonar, fracturas costales, lesión cardiaca, trauma abdominal y lesión de columna.'),
        ],
      },
      erroresFrecuentes([
        ['Tratar el color como el problema', 'La coloración es llamativa pero suele resolverse sola en días. Lo grave es la energía que hizo falta para producirla.'],
        ['Confundirla con cianosis por hipoxia', 'La cianosis por hipoxia es generalizada. Aquí el signo es el corte limpio: por debajo del punto de compresión la piel es normal.'],
        ['Cerrar la búsqueda con el diagnóstico', 'La asfixia traumática es un cartel que dice «aquí hubo aplastamiento». Debajo hay que buscar contusión pulmonar, fracturas costales, lesión cardiaca, trauma abdominal y lesión de columna.'],
        ['No vigilar el estado neurológico', 'La hipertensión venosa cerebral puede alterarlo, y ese cambio es parte de lo que hay que seguir.'],
      ]),
      repasoRapido([
        'Una compresión súbita e intensa del tórax con la glotis cerrada dispara la presión dentro del tórax.',
        'Mecanismos: vuelco de vehículo, derrumbe, atrapamiento bajo una carga.',
        'La sangre de las venas cavas retrocede hacia cabeza y cuello, donde no hay válvulas que lo impidan, y revienta los capilares.',
        'Se ve cara, cuello y parte superior del tórax de color azul-violáceo intenso.',
        'También petequias abundantes en esa zona y hemorragia subconjuntival, a veces espectacular.',
        'Y edema facial y de párpados.',
        'El límite es neto: por debajo del punto de compresión la piel es normal.',
        'Ese contraste es lo que identifica el cuadro y lo distingue de la cianosis por hipoxia, generalizada.',
        'El color suele resolverse solo en días: no es el problema.',
        'Lo grave es la energía que hizo falta: hay que buscar contusión pulmonar, fracturas costales y lesión cardiaca.',
        'También trauma abdominal y lesión de columna.',
        'Manejo: oxígeno y valoración respiratoria completa, restricción del movimiento espinal si el mecanismo lo indica, búsqueda dirigida, vigilancia neurológica y traslado a centro de trauma.',
      ]),
      preguntasOrales([
        'Explica el mecanismo de inversión del flujo venoso.',
        '¿Por qué el reflujo va a cabeza y cuello y no hacia abajo?',
        'Describe lo que se ve.',
        '¿Cuál es el signo que identifica el cuadro?',
        '¿Cómo lo distingues de una cianosis por hipoxia?',
        '¿Por qué el color no es el problema?',
        'Nombra las lesiones que hay que buscar debajo.',
        '¿Por qué se vigila el estado neurológico?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Asfixia traumática', definicion: 'Síndrome por compresión torácica súbita que provoca reflujo venoso hacia cabeza y cuello, con cianosis, petequias y hemorragia subconjuntival.' },
      { termino: 'Hemorragia subconjuntival', definicion: 'Sangrado bajo la conjuntiva; en este contexto refleja el aumento brusco de presión venosa.' },
    ],
    flashcards: [
      { frente: 'Aspecto característico de la asfixia traumática', reverso: 'Cara, cuello y tórax superior violáceos con petequias y hemorragia subconjuntival, y límite neto con la piel normal.' },
      { frente: '¿Qué la distingue de la cianosis por hipoxia?', reverso: 'Que está limitada a la mitad superior, con un corte neto; la cianosis es generalizada.' },
      { frente: '¿Cuál es el verdadero riesgo?', reverso: 'Las lesiones internas asociadas al aplastamiento, no el color.' },
    ],
    quiz: [
      {
        pregunta: 'Trabajador atrapado bajo una carga. Cara y cuello violáceos con petequias y ojos rojos; el resto del cuerpo, normal. ¿Qué es?',
        opciones: [
          'Cianosis central por hipoxia.',
          'Asfixia traumática por compresión torácica.',
          'Reacción alérgica.',
          'Quemadura química.',
        ],
        correcta: 1,
        explicacion: 'La distribución con límite neto por encima del punto de compresión es característica de la inversión del flujo venoso.',
      },
      {
        pregunta: '¿Cuál es la conducta correcta?',
        opciones: [
          'Tranquilizar y dar de alta: el color se resuelve solo.',
          'Buscar activamente lesiones asociadas y trasladar a centro de trauma.',
          'Aplicar frío local en la cara.',
          'Administrar antihistamínicos.',
        ],
        correcta: 1,
        explicacion: 'La coloración cede sola, pero la energía necesaria para producirla implica alta probabilidad de lesión torácica, abdominal o espinal.',
      },
    ],
    actividades: null,
  },

  'm5-tt-ruptura-diafragmatica': {
    icono: 'cp-servier-hernia-hiatal',
    duracion: '11 min',
    resumen: 'Ruptura diafragmática: el abdomen invade el tórax. Difícil de diagnosticar y fácil de empeorar con ventilación a presión positiva.',
    objetivos: [
      'Reconocer los mecanismos y signos de la ruptura diafragmática.',
      'Explicar por qué predomina en el lado izquierdo.',
      'Anticipar el riesgo asociado a la ventilación a presión positiva.',
    ],
    secciones: [
      {
        titulo: 'Mecanismo y lado',
        bloques: [
          { tipo: 'p', texto: 'Un golpe fuerte en el abdomen —cinturón de seguridad, aplastamiento, caída— eleva bruscamente la presión abdominal y desgarra el diafragma. Por el desgarro suben estómago, intestino o bazo al tórax, donde comprimen el pulmón.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Casi siempre izquierda', texto: 'El hígado ocupa y protege casi todo el hemidiafragma derecho; el izquierdo queda mucho más expuesto. Por eso la mayoría de las rupturas son izquierdas, y por eso los ruidos intestinales se buscan en el hemitórax izquierdo.' },
          {
            tipo: 'lista',
            titulo: 'Signos',
            items: [
              'Dificultad respiratoria que no cuadra con lo que se ve.',
              'Ruidos intestinales audibles en el tórax.',
              'Ruidos respiratorios disminuidos en la base.',
              'Dolor abdominal o torácico, a veces referido al hombro.',
              'Abdomen que parece hundido o vacío.',
            ],
          },
        ],
      },
      {
        titulo: 'La trampa de la presión positiva',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuidado al ventilar', texto: 'La ventilación con presión positiva puede empujar más vísceras hacia el tórax a través del desgarro y agravar la compresión pulmonar. No significa no ventilar a quien lo necesita: significa hacerlo con cuidado, vigilar la respuesta y sospechar esta lesión si el paciente empeora al ventilarlo.' },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'Oxígeno; ventilación asistida con precaución si es necesaria.',
              'Posición semisentada si la tolera y no hay contraindicación espinal.',
              'Nada por vía oral.',
              'Traslado a centro quirúrgico; la reparación es quirúrgica.',
              'Comunicar la sospecha en la entrega: es una lesión que pasa desapercibida con facilidad.',
            ],
          },
          mnemotecnia('EL HÍGADO PROTEGE LA DERECHA. Ocupa casi todo el hemidiafragma derecho, así que el izquierdo queda mucho más expuesto: la mayoría de las rupturas son izquierdas, y ahí se buscan los ruidos intestinales en el tórax.'),
          masPreguntado('La trampa de la presión positiva: puede empujar más vísceras al tórax a través del desgarro y agravar la compresión. No significa no ventilar a quien lo necesita, sino hacerlo con cuidado y sospechar esta lesión si el paciente empeora al ventilarlo.'),
        ],
      },
      erroresFrecuentes([
        ['Ventilar sin vigilar la respuesta', 'La presión positiva puede empujar más vísceras hacia el tórax a través del desgarro y agravar la compresión pulmonar. Si el paciente empeora al ventilarlo, se sospecha esta lesión.'],
        ['Buscar los ruidos intestinales en el lado equivocado', 'El hígado protege casi todo el hemidiafragma derecho, así que la mayoría de las rupturas son izquierdas: es en el hemitórax izquierdo donde se auscultan.'],
        ['Dar algo por vía oral', 'No se da nada por vía oral: la reparación es quirúrgica y el estómago puede estar dentro del tórax.'],
        ['No comunicar la sospecha en la entrega', 'Es una lesión que pasa desapercibida con facilidad. Nombrarla en la entrega es la principal aportación del equipo.'],
      ]),
      repasoRapido([
        'Un golpe fuerte en el abdomen eleva bruscamente la presión abdominal y desgarra el diafragma.',
        'Mecanismos: cinturón de seguridad, aplastamiento, caída.',
        'Por el desgarro suben estómago, intestino o bazo al tórax, donde comprimen el pulmón.',
        'El hígado ocupa y protege casi todo el hemidiafragma derecho.',
        'El izquierdo queda mucho más expuesto: la mayoría de las rupturas son izquierdas.',
        'Por eso los ruidos intestinales se buscan en el hemitórax izquierdo.',
        'Signos: dificultad respiratoria que no cuadra con lo que se ve y ruidos intestinales audibles en el tórax.',
        'También ruidos respiratorios disminuidos en la base y dolor abdominal o torácico, a veces referido al hombro.',
        'Y un abdomen que parece hundido o vacío.',
        'La ventilación a presión positiva puede empujar más vísceras al tórax: se hace con cuidado, vigilando la respuesta.',
        'Manejo: oxígeno, ventilación asistida con precaución si es necesaria, posición semisentada si la tolera y no hay contraindicación espinal.',
        'Nada por vía oral, traslado a centro quirúrgico y comunicación de la sospecha en la entrega.',
      ]),
      preguntasOrales([
        'Describe el mecanismo de la ruptura diafragmática.',
        '¿Por qué predomina en el lado izquierdo?',
        '¿Dónde auscultas los ruidos intestinales, y por qué ahí?',
        'Enumera los signos.',
        '¿Qué significa un abdomen que parece hundido?',
        'Explica la trampa de la ventilación a presión positiva.',
        '¿Significa eso no ventilar? Justifícalo.',
        '¿Por qué se insiste en comunicar la sospecha?',
      ]),
      SEC_FUENTES,
    ],
    conceptosClave: [
      { termino: 'Ruptura diafragmática', definicion: 'Desgarro del diafragma que permite el paso de vísceras abdominales al tórax.' },
      { termino: 'Hernia diafragmática traumática', definicion: 'Desplazamiento de vísceras abdominales al tórax a través del desgarro.' },
      { termino: 'Dolor referido al hombro', definicion: 'Dolor percibido en el hombro por irritación diafragmática, al compartir inervación con esa zona.' },
    ],
    flashcards: [
      { frente: '¿Por qué la ruptura diafragmática es más frecuente en el lado izquierdo?', reverso: 'Porque el hígado protege el hemidiafragma derecho.' },
      { frente: 'Signo auscultatorio característico', reverso: 'Ruidos intestinales en el tórax.' },
      { frente: '¿Qué riesgo tiene ventilar con presión positiva?', reverso: 'Puede empujar más vísceras al tórax y agravar la compresión.' },
      { frente: '¿Cuál es el tratamiento definitivo?', reverso: 'Quirúrgico.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión lateral con marca de cinturón en abdomen. Disnea, ruidos respiratorios disminuidos en base izquierda y ruidos intestinales audibles en ese hemitórax. ¿Qué sospechas?',
        opciones: ['Neumotórax simple', 'Ruptura diafragmática izquierda', 'Contusión pulmonar', 'Hemotórax'],
        correcta: 1,
        explicacion: 'Los ruidos intestinales en el tórax son prácticamente diagnósticos del paso de vísceras abdominales a través de un desgarro diafragmático.',
      },
      {
        pregunta: 'Ese paciente necesita apoyo ventilatorio. ¿Qué precaución tomas?',
        opciones: [
          'Ventilar con la máxima presión posible para vencer la resistencia.',
          'No ventilar en ningún caso.',
          'Ventilar con cuidado y vigilar si empeora, porque la presión positiva puede desplazar más vísceras.',
          'Colocarlo en Trendelenburg.',
        ],
        correcta: 2,
        explicacion: 'No se le niega la ventilación que necesita, pero se aplica con precaución y reevaluando: el empeoramiento al ventilar refuerza la sospecha.',
      },
    ],
    actividades: null,
  },
}
