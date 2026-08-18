// ============================================================
//  Módulo 3 · Manejo de vía aérea — repaso, métodos manuales y cánulas
// ------------------------------------------------------------
//  Primer lote de la unidad, en el orden del PDF: el repaso anatómico que la
//  sostiene, los tres métodos manuales y las dos cánulas orofaríngea y
//  nasofaríngea. Los métodos mecánicos avanzados (intubación, hojas y tubos,
//  mascarilla laríngea, obturador), los transtraqueales y la oxigenoterapia
//  van en los siguientes lotes de esta misma unidad.
//
//  Regla de reparto que se respeta en todo el lote: la apertura manual dentro
//  de la evaluación primaria ya tiene su tema en `m3-ep-via-aerea-cervicales`.
//  Aquí se enseña la TÉCNICA de cada maniobra y su elección; allí se enseña
//  cuándo se comprueba la vía aérea y cómo se protege la columna. Ninguna de
//  las dos páginas repite a la otra: se citan.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

const MOORE = {
  nombre: 'Moore KL. Anatomía con orientación clínica, 7.ª ed. Ed. Médica Panamericana.',
  nota: 'Anatomía de las vías respiratorias altas y bajas. Página pendiente de precisar con el '
    + 'ejemplar de la academia.',
}
const GUYTON = {
  nombre: 'Guyton AC, Hall JE. Compendio de Fisiología Médica, 13.ª ed.',
  nota: 'Mecánica ventilatoria, espacio muerto e intercambio gaseoso.',
}
const FISIO_RESP = {
  nombre: 'Fisiología respiratoria: lo esencial en la práctica clínica, 3.ª ed.',
  nota: 'Relación ventilación/perfusión y determinantes de la oxigenación.',
}
const AHA_BLS = {
  nombre: 'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Apertura de la vía aérea en el paciente que no responde y prioridad de la ventilación.',
}
const PHTLS9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición declarada por el plan oficial. Elección de la maniobra ante sospecha de lesión '
    + 'cervical y uso de dispositivos básicos. Capítulo y página PENDIENTES de precisar con el '
    + 'ejemplar de la academia.',
}

const PENDIENTE_EDICION = 'Precisar capítulo y página de PHTLS al revisar con el ejemplar de la '
  + 'academia, y confirmar qué edición adopta oficialmente (el plan declara la 9.ª; la biblioteca '
  + 'contiene una traducción automática de la 10.ª que no es citable).'

const ficha = (extra = [], versionClinica = 'AHA 2025 (BLS de adulto); PHTLS 9.ª ed.') => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica,
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    ...extra,
    PENDIENTE_EDICION,
  ],
  fuentes: [
    'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
    'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
  ],
})

export default {
  // ============================================================
  //  Repaso de anatomía y fisiología pulmonar
  // ============================================================
  'm3-va-repaso-anatomia': {
    icono: '🫁',
    duracion: '18 min',
    resumen: 'El recorrido del aire y el intercambio gaseoso, contados desde lo que después habrá que '
      + 'decidir en la vía aérea: dónde se obstruye, dónde se ventila y por qué respirar más deprisa no '
      + 'siempre significa oxigenar mejor.',
    objetivos: [
      'Describir el recorrido del aire desde las fosas nasales hasta el alvéolo.',
      'Diferenciar vía aérea superior e inferior y sus puntos críticos de obstrucción.',
      'Explicar la diferencia entre ventilación y oxigenación con sus consecuencias prácticas.',
      'Relacionar el espacio muerto con la eficacia de una ventilación rápida y superficial.',
    ],
    secciones: [
      {
        titulo: 'El recorrido del aire',
        bloques: [
          { tipo: 'p', texto: 'El aire entra por las fosas nasales o por la boca, atraviesa la faringe, pasa la laringe y desciende por la tráquea hasta dividirse en los bronquios principales. La faringe se describe en tres porciones: nasofaringe, orofaringe e hipofaringe o laringofaringe. Esa división no es un detalle académico: cada porción es el sitio donde encaja un dispositivo distinto.' },
          {
            tipo: 'tabla',
            titulo: 'Estructuras y su relevancia práctica',
            headers: ['Estructura', 'Qué hace', 'Por qué importa en vía aérea'],
            filas: [
              ['Fosas nasales', 'Calientan, humidifican y filtran el aire', 'Vía de entrada de la cánula nasofaríngea'],
              ['Nasofaringe', 'Continúa la vía nasal por detrás del paladar', 'Extremo distal de la cánula nasofaríngea'],
              ['Orofaringe', 'Espacio detrás de la lengua', 'Donde cae la lengua y donde se aloja la cánula orofaríngea'],
              ['Epiglotis', 'Cubre la laringe al deglutir', 'Referencia para la laringoscopia; su edema obstruye'],
              ['Laringe y cuerdas vocales', 'Punto más estrecho del adulto', 'Paso obligado del tubo endotraqueal'],
              ['Membrana cricotiroidea', 'Zona blanda entre cartílago tiroides y cricoides', 'Sitio del acceso transtraqueal con aguja'],
              ['Tráquea y carina', 'Conduce el aire y se bifurca', 'La intubación demasiado profunda pasa al bronquio derecho'],
              ['Bronquios y bronquiolos', 'Distribuyen el aire', 'Sitio de la obstrucción en asma y EPOC'],
              ['Alvéolos', 'Intercambian gases con el capilar', 'Donde se decide realmente la oxigenación'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El bronquio derecho es más recto', texto: 'El bronquio principal derecho sale de la tráquea con un ángulo más vertical que el izquierdo. Por eso un tubo endotraqueal introducido de más suele alojarse en el derecho y dejar el pulmón izquierdo sin ventilar, y por eso los cuerpos extraños aspirados van con más frecuencia a ese lado.' },
        ],
      },
      {
        titulo: 'Cómo entra y sale el aire',
        bloques: [
          { tipo: 'p', texto: 'La inspiración es un proceso activo: el diafragma desciende y los músculos intercostales externos elevan las costillas, el volumen torácico aumenta y la presión dentro del tórax cae por debajo de la atmosférica, de modo que el aire entra. La espiración en reposo es pasiva y depende de la retracción elástica del pulmón y de la pared.' },
          { tipo: 'p', texto: 'Los pulmones no se adhieren directamente a la pared torácica: entre la pleura visceral y la parietal hay una presión negativa que los mantiene expandidos. Cuando esa presión negativa se pierde —porque entra aire o sangre en el espacio pleural—, el pulmón se colapsa. Es el fundamento de los cuadros que se estudian en trauma de tórax.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La ventilación con presión positiva invierte la mecánica', texto: 'Cuando se ventila con bolsa-mascarilla, el aire ya no entra porque el tórax genere presión negativa: entra empujado. Eso aumenta la presión dentro del tórax y puede reducir el retorno venoso, sobre todo si se ventila demasiado rápido o con volúmenes excesivos.' },
        ],
      },
      {
        titulo: 'Ventilación no es oxigenación',
        bloques: [
          { tipo: 'p', texto: 'Ventilar es mover aire; oxigenar es que el oxígeno llegue a la sangre. Son procesos relacionados pero no idénticos, y separarlos evita errores prácticos frecuentes.' },
          {
            tipo: 'tabla',
            titulo: 'Dos problemas distintos',
            headers: ['', 'Ventilación', 'Oxigenación'],
            filas: [
              ['Qué mide', 'Volumen de aire movilizado por minuto', 'Cantidad de oxígeno que alcanza la sangre'],
              ['Qué la altera', 'Obstrucción, dolor, debilidad, depresión del centro respiratorio', 'Alteración alveolar, del intercambio o de la perfusión'],
              ['Signo típico', 'Frecuencia y profundidad anormales, retención de CO₂', 'Saturación baja, cianosis'],
              ['Qué la corrige', 'Abrir la vía aérea y asistir la ventilación', 'Aumentar el oxígeno inspirado y tratar la causa'],
            ],
          },
          { tipo: 'p', texto: 'Un paciente puede estar ventilando mucho y oxigenando mal —por ejemplo, si el alvéolo está ocupado— y puede estar oxigenando aceptablemente y ventilando de forma insuficiente, acumulando dióxido de carbono. Por eso la valoración respiratoria no se reduce al número del pulsioxímetro.' },
        ],
      },
      {
        titulo: 'Espacio muerto: por qué respirar rápido y poco no sirve',
        bloques: [
          { tipo: 'p', texto: 'En cada inspiración, una parte del aire se queda en las vías de conducción —nariz, faringe, tráquea y bronquios— donde no hay alvéolos y por tanto no hay intercambio. Ese volumen se llama espacio muerto anatómico y se llena en cada respiración, sirva o no.' },
          { tipo: 'p', texto: 'La consecuencia es directa: si el volumen de cada respiración es pequeño, una fracción mayor de ese aire se queda en el espacio muerto y llega menos aire fresco al alvéolo, aunque la frecuencia sea alta. Un patrón rápido y superficial mueve aire y ventila mal. Por eso, ante un paciente taquipneico y superficial, no basta con contar respiraciones: hay que valorar si esas respiraciones sirven.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Aplicación inmediata', texto: 'Al asistir la ventilación, la eficacia depende de conseguir un volumen suficiente en cada insuflación y una frecuencia adecuada, no de insuflar deprisa. Ventilar rápido y con poco volumen reproduce artificialmente el problema que se pretendía corregir.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [MOORE, GUYTON, FISIO_RESP] }] },
    ],
    conceptosClave: [
      { termino: 'Orofaringe', definicion: 'Porción de la faringe situada detrás de la lengua; es donde cae la lengua en el paciente con conciencia deprimida y donde se aloja la cánula orofaríngea.' },
      { termino: 'Membrana cricotiroidea', definicion: 'Zona blanda entre el cartílago tiroides y el cricoides; sitio de referencia del acceso transtraqueal con aguja.' },
      { termino: 'Espacio muerto anatómico', definicion: 'Volumen de aire que queda en las vías de conducción, donde no hay intercambio gaseoso.' },
      { termino: 'Ventilación', definicion: 'Movimiento de aire dentro y fuera del pulmón.' },
      { termino: 'Oxigenación', definicion: 'Paso del oxígeno desde el alvéolo a la sangre.' },
      { termino: 'Presión negativa intrapleural', definicion: 'Presión menor que la atmosférica entre las pleuras, que mantiene el pulmón expandido; al perderse, el pulmón se colapsa.' },
    ],
    flashcards: [
      { frente: '¿Por qué un tubo introducido de más va al bronquio derecho?', reverso: 'Porque el bronquio principal derecho sale con un ángulo más vertical que el izquierdo.' },
      { frente: '¿Qué mantiene expandido el pulmón dentro del tórax?', reverso: 'La presión negativa del espacio pleural entre la pleura visceral y la parietal.' },
      { frente: 'Diferencia entre ventilar y oxigenar', reverso: 'Ventilar es mover aire; oxigenar es que el oxígeno llegue a la sangre.' },
      { frente: '¿Qué es el espacio muerto anatómico?', reverso: 'El aire que queda en las vías de conducción, donde no hay alvéolos ni intercambio.' },
      { frente: '¿Por qué una respiración rápida y superficial ventila mal?', reverso: 'Porque con volúmenes pequeños una fracción mayor del aire se queda en el espacio muerto y llega menos aire fresco al alvéolo.' },
      { frente: '¿Qué efecto hemodinámico puede tener ventilar con presión positiva en exceso?', reverso: 'Aumenta la presión intratorácica y puede reducir el retorno venoso.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente respira 32 veces por minuto con movimientos torácicos muy superficiales. ¿Por qué esto ventila mal?',
        opciones: [
          'Porque la frecuencia alta agota los alvéolos.',
          'Porque con volúmenes pequeños una fracción mayor del aire se queda en el espacio muerto.',
          'Porque el oxígeno no se disuelve a frecuencias altas.',
          'Porque la espiración se vuelve activa.',
        ],
        correcta: 1,
        explicacion: 'El espacio muerto anatómico se llena en cada respiración. Con volúmenes pequeños, la proporción de aire que llega realmente al alvéolo disminuye aunque la frecuencia sea alta.',
      },
      {
        pregunta: '¿Qué estructura es el punto más estrecho de la vía aérea del adulto y paso obligado del tubo endotraqueal?',
        opciones: ['La orofaringe', 'La laringe con las cuerdas vocales', 'La carina', 'El bronquiolo terminal'],
        correcta: 1,
        explicacion: 'En el adulto el paso más estrecho está en la laringe, a la altura de las cuerdas vocales; la carina es la bifurcación traqueal y la orofaringe queda por encima.',
      },
      {
        pregunta: 'Se aspira un cuerpo extraño pequeño que alcanza la vía aérea inferior. ¿A qué lado va con más frecuencia y por qué?',
        opciones: [
          'Al izquierdo, porque el pulmón izquierdo es menor.',
          'Al derecho, porque su bronquio principal sale con un ángulo más vertical.',
          'A ninguno: se detiene siempre en la carina.',
          'Depende únicamente de la posición del paciente.',
        ],
        correcta: 1,
        explicacion: 'La disposición más vertical del bronquio principal derecho explica tanto la intubación selectiva accidental como el destino de los cuerpos extraños aspirados.',
      },
      {
        pregunta: 'Paciente con alvéolos ocupados: mueve buen volumen de aire pero satura mal. ¿Qué problema tiene?',
        opciones: [
          'De ventilación exclusivamente.',
          'De oxigenación: ventila, pero el oxígeno no alcanza la sangre.',
          'De espacio muerto anatómico.',
          'De retracción elástica.',
        ],
        correcta: 1,
        explicacion: 'Ventilación y oxigenación son procesos distintos: aquí el aire se mueve, pero el intercambio en el alvéolo está comprometido.',
      },
      {
        pregunta: 'Al ventilar con bolsa-mascarilla demasiado rápido y con volúmenes excesivos, ¿qué puede ocurrir?',
        opciones: [
          'Mejora el retorno venoso por efecto de bomba.',
          'Aumenta la presión intratorácica y puede reducirse el retorno venoso.',
          'Disminuye el espacio muerto anatómico.',
          'Se invierte la retracción elástica del pulmón.',
        ],
        correcta: 1,
        explicacion: 'La ventilación con presión positiva empuja el aire e incrementa la presión dentro del tórax; en exceso compromete el llenado del corazón derecho.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el recorrido del aire hasta el alvéolo',
        pasos: [
          'Fosas nasales o boca',
          'Faringe',
          'Laringe y cuerdas vocales',
          'Tráquea',
          'Bronquios principales',
          'Bronquiolos',
          'Alvéolos',
        ],
      },
    },
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'Anatomía y fisiología; contenido no sujeto a actualización clínica anual',
      observaciones: [
        'Redactado desde cero. El material heredado que ocupaba este tema procedía de fisiología '
          + 'cardiovascular y anatomía general, no respiratoria.',
        'No incluye terapéutica: los dispositivos y las maniobras tienen sus propios temas en esta '
          + 'misma unidad.',
        'Precisar páginas de Moore, Guyton y el texto de fisiología respiratoria al revisar con los '
          + 'ejemplares de la academia.',
      ],
      fuentes: [
        'Moore KL. Anatomía con orientación clínica, 7.ª ed. (catálogo de la academia).',
        'Guyton AC, Hall JE. Compendio de Fisiología Médica, 13.ª ed. (catálogo de la academia).',
        'Fisiología respiratoria: lo esencial en la práctica clínica, 3.ª ed. (catálogo de la academia).',
      ],
    },
  },

  // ============================================================
  //  Levantamiento del mentón
  // ============================================================
  'm3-va-levantamiento-menton': {
    icono: '🤚',
    duracion: '12 min',
    resumen: 'La maniobra manual más sencilla y la que más veces se ejecuta mal: elevar el mentón para '
      + 'separar la lengua de la pared posterior de la faringe.',
    objetivos: [
      'Ejecutar el levantamiento del mentón con el punto de apoyo correcto.',
      'Explicar por qué la maniobra abre la vía aérea.',
      'Reconocer los errores que la convierten en ineficaz o dañina.',
    ],
    secciones: [
      {
        titulo: 'Qué resuelve',
        bloques: [
          { tipo: 'p', texto: 'En el paciente con el estado de conciencia deprimido, el tono de la musculatura de la lengua y de la faringe disminuye y la lengua se desplaza hacia atrás hasta contactar con la pared posterior de la faringe. La lengua se inserta en la mandíbula, de modo que desplazar la mandíbula hacia delante y hacia arriba arrastra la lengua consigo y despeja el espacio.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Se mueve la mandíbula, no la lengua', texto: 'La maniobra no actúa sobre la lengua directamente. Actúa sobre el hueso donde la lengua está anclada. Entenderlo explica por qué el punto de apoyo tiene que ser óseo.' },
        ],
      },
      {
        titulo: 'Técnica',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Paso a paso',
            items: [
              'Colocar al paciente en decúbito supino sobre una superficie firme, si su situación lo permite.',
              'Situarse a un lado de la cabeza.',
              'Apoyar las yemas de los dedos índice y medio bajo la porción ÓSEA del mentón.',
              'Elevar el mentón hacia arriba y hacia delante, llevando la mandíbula hacia el frente.',
              'Mantener la boca ligeramente entreabierta: cerrarla por completo puede obstruir de nuevo.',
              'Comprobar el resultado mirando el tórax, escuchando y sintiendo el paso del aire.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El error que agrava la obstrucción', texto: 'Apoyar los dedos en los tejidos blandos submandibulares, por dentro del arco de la mandíbula, empuja la base de la lengua hacia atrás y puede cerrar la vía aérea que se pretendía abrir. El apoyo es sobre hueso.' },
          { tipo: 'p', texto: 'La maniobra se realiza con guantes y, en cuanto la situación lo permita, con el resto del equipo de protección personal que corresponda. Si al abrir aparece contenido en la boca, se retira únicamente lo visible y alcanzable; no se hace barrido digital a ciegas.' },
        ],
      },
      {
        titulo: 'Cuándo se elige esta maniobra',
        bloques: [
          { tipo: 'p', texto: 'El levantamiento del mentón, solo o combinado con la inclinación de la cabeza, es la elección en el paciente sin sospecha de lesión de columna cervical. Cuando el mecanismo sugiere lesión cervical, la maniobra de elección es la tracción mandibular, que se estudia en el tema de triple maniobra modificada.' },
          { tipo: 'p', texto: 'La decisión de cuándo comprobar la vía aérea dentro de la secuencia de valoración y cómo se protege la columna mientras se hace corresponde al tema de apertura de vía aérea y control de cervicales, dentro de la evaluación primaria.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Una maniobra manual no es una vía aérea definitiva', texto: 'Mantiene la permeabilidad mientras alguien la sostiene. En cuanto se suelta, la lengua vuelve a caer. Por eso la maniobra se complementa con una cánula cuando está indicada, o con un dispositivo avanzado según el alcance del prestador y el protocolo del servicio.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [AHA_BLS, MOORE] }] },
    ],
    conceptosClave: [
      { termino: 'Levantamiento del mentón', definicion: 'Elevación de la porción ósea del mentón hacia arriba y adelante, que desplaza la mandíbula y con ella la lengua.' },
      { termino: 'Porción ósea del mentón', definicion: 'Punto de apoyo correcto de la maniobra; evita comprimir los tejidos blandos submandibulares.' },
      { termino: 'Obstrucción por la lengua', definicion: 'Contacto de la base de la lengua con la pared posterior de la faringe al disminuir el tono muscular.' },
    ],
    flashcards: [
      { frente: '¿Sobre qué se apoyan los dedos al elevar el mentón?', reverso: 'Sobre la porción ósea del mentón, nunca sobre los tejidos blandos submandibulares.' },
      { frente: '¿Por qué elevar la mandíbula abre la vía aérea?', reverso: 'Porque la lengua se inserta en la mandíbula y se desplaza con ella hacia delante.' },
      { frente: '¿Qué ocurre si se cierra por completo la boca al elevar el mentón?', reverso: 'Puede obstruirse de nuevo la vía aérea; se mantiene ligeramente entreabierta.' },
      { frente: '¿Cuándo NO es esta la maniobra de elección?', reverso: 'Cuando el mecanismo sugiere lesión de columna cervical: entonces se prefiere la tracción mandibular.' },
      { frente: '¿Una maniobra manual asegura la vía aérea?', reverso: 'No: mantiene la permeabilidad solo mientras se sostiene.' },
    ],
    quiz: [
      {
        pregunta: 'Al elevar el mentón, la vía aérea se obstruye más. ¿Cuál es la causa más probable?',
        opciones: [
          'Se elevó demasiado la mandíbula.',
          'Los dedos se apoyaron en los tejidos blandos submandibulares y empujaron la lengua hacia atrás.',
          'La boca quedó demasiado abierta.',
          'La superficie no era firme.',
        ],
        correcta: 1,
        explicacion: 'El apoyo por dentro del arco mandibular comprime la base de la lengua contra la faringe; el punto correcto es el hueso del mentón.',
      },
      {
        pregunta: '¿Por qué el levantamiento del mentón despeja la orofaringe?',
        opciones: [
          'Porque tracciona directamente de la lengua.',
          'Porque desplaza la mandíbula y la lengua, que está insertada en ella, se mueve con ella.',
          'Porque aumenta el tono de la musculatura faríngea.',
          'Porque reduce el espacio muerto anatómico.',
        ],
        correcta: 1,
        explicacion: 'La maniobra actúa sobre el hueso donde la lengua está anclada, no sobre la lengua misma.',
      },
      {
        pregunta: 'Paciente inconsciente por sobredosis, sin trauma. ¿Qué maniobra manual eliges primero?',
        opciones: [
          'Tracción mandibular con estabilización cervical.',
          'Levantamiento del mentón, con o sin inclinación de la cabeza.',
          'Barrido digital seguido de ventilación.',
          'Ninguna hasta disponer de cánula.',
        ],
        correcta: 1,
        explicacion: 'Sin sospecha de lesión cervical no hay motivo para limitar el movimiento del cuello, y el levantamiento del mentón es la maniobra más sencilla y eficaz.',
      },
      {
        pregunta: 'Sostienes la maniobra y el paciente ventila bien. Al soltarla vuelve el ronquido. ¿Qué significa?',
        opciones: [
          'Que la maniobra estaba mal ejecutada.',
          'Que la permeabilidad depende de que alguien la sostenga y hace falta complementarla.',
          'Que el paciente recuperó el tono muscular.',
          'Que hay un cuerpo extraño en la vía aérea inferior.',
        ],
        correcta: 1,
        explicacion: 'Una maniobra manual no es una vía aérea definitiva: al soltarla la lengua vuelve a caer, por lo que se complementa con una cánula o un dispositivo según alcance y protocolo.',
      },
    ],
    actividades: null,
    revision: ficha([
      'La elección de la maniobra según sospecha de lesión cervical se remite a la triple maniobra '
        + 'modificada y al tema de evaluación primaria; esta página enseña la técnica.',
    ]),
  },

  // ============================================================
  //  Triple maniobra modificada (tracción mandibular)
  // ============================================================
  'm3-va-triple-maniobra': {
    icono: '🧑‍🚒',
    duracion: '13 min',
    resumen: 'La maniobra de elección cuando hay sospecha de lesión cervical: abrir la vía aérea '
      + 'desplazando la mandíbula sin extender el cuello.',
    objetivos: [
      'Ejecutar la tracción mandibular desde la cabecera del paciente.',
      'Justificar su elección frente al levantamiento del mentón ante mecanismo de trauma.',
      'Resolver el caso en que la maniobra modificada no consigue abrir la vía aérea.',
    ],
    secciones: [
      {
        titulo: 'De la triple maniobra a la maniobra modificada',
        bloques: [
          { tipo: 'p', texto: 'La llamada triple maniobra combina tres acciones: extensión de la cabeza, elevación del mentón y apertura de la boca. Abre bien la vía aérea, pero exige mover el cuello, algo que no se puede permitir cuando el mecanismo sugiere lesión de columna cervical.' },
          { tipo: 'p', texto: 'La versión modificada conserva el desplazamiento anterior de la mandíbula y la apertura de la boca, y suprime la extensión de la cabeza. Se conoce también como tracción mandibular o subluxación mandibular, y es la maniobra de elección en el paciente traumatizado.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Qué se quita y qué se conserva', texto: 'Se elimina exactamente el componente que moviliza el cuello. Lo que abre la vía aérea —llevar la mandíbula hacia delante— se mantiene íntegro, y por eso la maniobra modificada sigue siendo eficaz.' },
        ],
      },
      {
        titulo: 'Técnica',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Paso a paso',
            items: [
              'Situarse en la cabecera del paciente, alineado con su eje longitudinal.',
              'Apoyar los pulgares sobre los pómulos o sobre el mentón, según el tamaño de la mano.',
              'Colocar los dedos índice y medio de cada mano bajo los ángulos de la mandíbula.',
              'Desplazar la mandíbula hacia delante, como si se buscara adelantarla respecto del maxilar superior.',
              'Abrir ligeramente la boca con los pulgares, sin extender ni rotar la cabeza.',
              'Mantener la cabeza en posición neutra alineada durante toda la maniobra.',
              'Comprobar la entrada de aire y sostener la posición hasta relevo o hasta colocar un dispositivo.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Hacen falta dos manos, y a veces dos personas', texto: 'La tracción mandibular ocupa las dos manos del reanimador. Ventilar con bolsa-mascarilla mientras se sostiene la maniobra requiere, en la práctica, un segundo reanimador: uno mantiene el sello y la mandíbula, el otro insufla.' },
        ],
      },
      {
        titulo: 'Cuando la maniobra modificada no basta',
        bloques: [
          { tipo: 'p', texto: 'Si la tracción mandibular no consigue abrir la vía aérea, no se insiste indefinidamente ni se acepta un paciente sin ventilar por preservar la inmovilidad del cuello. La conducta es emplear la técnica que logre permeabilidad con el menor movimiento posible, manteniendo la estabilización manual y documentando lo realizado.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Jerarquía de riesgos', texto: 'Una vía aérea cerrada produce daño en minutos. El movimiento mínimo y controlado necesario para abrirla es un riesgo menor y aceptado. Lo que no es aceptable es dejar de ventilar a un paciente por no mover el cuello.' },
          { tipo: 'p', texto: 'La estabilización manual de la columna cervical durante toda la maniobra y los criterios de restricción del movimiento espinal se estudian en la evaluación primaria y en el Módulo 5; aquí interesa la ejecución de la maniobra.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, AHA_BLS] }] },
    ],
    conceptosClave: [
      { termino: 'Triple maniobra', definicion: 'Combinación de extensión de la cabeza, elevación del mentón y apertura de la boca.' },
      { termino: 'Triple maniobra modificada', definicion: 'Versión sin extensión de la cabeza: desplazamiento anterior de la mandíbula y apertura de la boca; también llamada tracción mandibular.' },
      { termino: 'Subluxación mandibular', definicion: 'Adelantamiento de la mandíbula respecto del maxilar superior que arrastra la lengua hacia delante.' },
      { termino: 'Posición neutra alineada', definicion: 'Alineación de cabeza, cuello y tronco sin flexión, extensión ni rotación, mantenida durante la maniobra.' },
    ],
    flashcards: [
      { frente: '¿Qué componente suprime la triple maniobra modificada?', reverso: 'La extensión de la cabeza, que es el que moviliza el cuello.' },
      { frente: '¿Desde dónde se ejecuta la tracción mandibular?', reverso: 'Desde la cabecera del paciente, alineado con su eje longitudinal.' },
      { frente: '¿Dónde se colocan los dedos índice y medio?', reverso: 'Bajo los ángulos de la mandíbula, para desplazarla hacia delante.' },
      { frente: '¿Por qué suele hacer falta un segundo reanimador?', reverso: 'Porque la maniobra ocupa las dos manos y no permite insuflar a la vez.' },
      { frente: 'La tracción mandibular no abre la vía aérea. ¿Qué se hace?', reverso: 'Se usa la técnica que logre permeabilidad con el menor movimiento posible, sin dejar al paciente sin ventilar.' },
    ],
    quiz: [
      {
        pregunta: '¿Qué diferencia a la triple maniobra modificada de la triple maniobra clásica?',
        opciones: [
          'Añade la apertura de la boca.',
          'Suprime la extensión de la cabeza.',
          'Sustituye el desplazamiento mandibular por la elevación del mentón.',
          'Se realiza desde un lado en vez de la cabecera.',
        ],
        correcta: 1,
        explicacion: 'La modificación consiste exactamente en retirar el componente que moviliza el cuello, conservando lo que abre la vía aérea.',
      },
      {
        pregunta: 'Motociclista inconsciente con casco retirado y estabilización manual en curso. ¿Qué maniobra usas?',
        opciones: [
          'Triple maniobra clásica, por ser más eficaz.',
          'Triple maniobra modificada, sin extender el cuello.',
          'Levantamiento del mentón con inclinación de la cabeza.',
          'Ninguna hasta colocar collarín.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo es compatible con lesión cervical. Esperar al collarín, además, deja al paciente con la vía aérea comprometida.',
      },
      {
        pregunta: 'Estás solo y necesitas ventilar con bolsa-mascarilla a un paciente traumatizado. ¿Qué dificultad plantea la maniobra?',
        opciones: [
          'Ninguna: se puede sostener con una mano.',
          'Ocupa las dos manos, por lo que ventilar exige un segundo reanimador.',
          'Impide el sello de la mascarilla.',
          'Obliga a extender el cuello para insuflar.',
        ],
        correcta: 1,
        explicacion: 'La tracción mandibular requiere ambas manos; en la práctica uno sostiene mandíbula y sello y otro insufla.',
      },
      {
        pregunta: 'Tras varios intentos, la tracción mandibular no permeabiliza la vía aérea del paciente traumatizado. ¿Qué haces?',
        opciones: [
          'Mantenerla e insistir hasta lograrlo.',
          'Emplear la técnica que logre permeabilidad con el menor movimiento posible.',
          'Suspender el manejo de la vía aérea hasta completar la inmovilización.',
          'Extender el cuello por completo para asegurar la apertura.',
        ],
        correcta: 1,
        explicacion: 'La jerarquía de riesgos es clara: la vía aérea cerrada daña en minutos, y el movimiento mínimo controlado es un riesgo menor y aceptado. Ni insistir sin ventilar ni extender por completo son la conducta correcta.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la triple maniobra modificada',
        pasos: [
          'Situarse en la cabecera, alineado con el eje del paciente',
          'Apoyar los pulgares en pómulos o mentón',
          'Colocar índice y medio bajo los ángulos mandibulares',
          'Desplazar la mandíbula hacia delante sin mover el cuello',
          'Abrir ligeramente la boca con los pulgares',
          'Comprobar la entrada de aire y sostener la posición',
        ],
      },
    },
    revision: ficha([
      'La estabilización cervical y los criterios de restricción de movimiento espinal se remiten a '
        + 'la evaluación primaria y al Módulo 5.',
    ]),
  },

  // ============================================================
  //  Levantamiento del mentón e inclinación de cervicales
  // ============================================================
  'm3-va-menton-inclinacion': {
    icono: '↗️',
    duracion: '12 min',
    resumen: 'La maniobra frente-mentón completa: combinar la inclinación de la cabeza con la elevación '
      + 'del mentón, y saber en qué pacientes está descartada.',
    objetivos: [
      'Ejecutar la maniobra frente-mentón combinando ambos componentes.',
      'Justificar por qué la combinación abre mejor que cada componente aislado.',
      'Identificar los pacientes en los que esta maniobra está descartada.',
    ],
    secciones: [
      {
        titulo: 'Los dos componentes',
        bloques: [
          { tipo: 'p', texto: 'La maniobra frente-mentón suma dos acciones que actúan sobre estructuras distintas. La inclinación de la cabeza hacia atrás, apoyando una mano sobre la frente, alinea los ejes de la vía aérea y aleja la base de la lengua de la pared faríngea. La elevación del mentón, con los dedos de la otra mano sobre su porción ósea, desplaza la mandíbula y con ella la lengua.' },
          { tipo: 'p', texto: 'Cada componente por separado abre parcialmente; combinados producen la apertura más eficaz de las maniobras manuales en el paciente sin sospecha de lesión cervical, y por eso es la técnica recomendada en soporte vital básico para ese perfil de paciente.' },
        ],
      },
      {
        titulo: 'Técnica',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Paso a paso',
            items: [
              'Confirmar que no hay mecanismo compatible con lesión de columna cervical.',
              'Colocar la palma de una mano sobre la frente del paciente.',
              'Inclinar la cabeza hacia atrás con una presión firme y sostenida.',
              'Apoyar los dedos índice y medio de la otra mano bajo la porción ósea del mentón.',
              'Elevar el mentón hacia arriba y hacia delante.',
              'Mantener la boca ligeramente entreabierta.',
              'Comprobar el paso del aire mirando, escuchando y sintiendo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Descartada ante sospecha de lesión cervical', texto: 'Esta maniobra moviliza el cuello por definición. Si el mecanismo sugiere lesión de columna cervical, se sustituye por la triple maniobra modificada, que abre sin extender.' },
        ],
      },
      {
        titulo: 'Particularidades por edad',
        bloques: [
          { tipo: 'p', texto: 'El grado de inclinación no es el mismo a todas las edades. En el lactante, la cabeza es proporcionalmente grande y el occipucio prominente, de modo que al acostarlo boca arriba el cuello queda flexionado y la vía aérea se cierra; en él basta una posición neutra, y una extensión excesiva vuelve a obstruir. En el niño mayor se emplea una extensión intermedia, y en el adulto la extensión es mayor.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Más no es mejor', texto: 'Forzar la extensión en un lactante o en un niño pequeño cierra la vía aérea en lugar de abrirla. La referencia práctica es el resultado: se ajusta la posición hasta que el aire entra, no hasta alcanzar un ángulo determinado.' },
          { tipo: 'p', texto: 'Las particularidades completas de la vía aérea pediátrica y su manejo se estudian en el Módulo 6, dentro de poblaciones especiales.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [AHA_BLS, PHTLS9] }] },
    ],
    conceptosClave: [
      { termino: 'Maniobra frente-mentón', definicion: 'Combinación de inclinación de la cabeza con elevación del mentón; apertura manual de elección sin sospecha de lesión cervical.' },
      { termino: 'Alineación de los ejes de la vía aérea', definicion: 'Efecto de la inclinación de la cabeza que facilita el paso del aire desde la boca hasta la laringe.' },
      { termino: 'Posición neutra en el lactante', definicion: 'Grado de extensión mínimo que la vía aérea del lactante requiere; la extensión excesiva la obstruye.' },
    ],
    flashcards: [
      { frente: '¿Qué dos acciones combina la maniobra frente-mentón?', reverso: 'Inclinación de la cabeza con una mano en la frente y elevación de la porción ósea del mentón con la otra.' },
      { frente: '¿Cuándo está descartada la maniobra frente-mentón?', reverso: 'Ante sospecha de lesión de columna cervical: se usa la triple maniobra modificada.' },
      { frente: '¿Por qué se obstruye la vía aérea del lactante al acostarlo boca arriba?', reverso: 'Porque su occipucio prominente flexiona el cuello.' },
      { frente: '¿Qué grado de extensión necesita el lactante?', reverso: 'Una posición neutra; una extensión excesiva vuelve a obstruir.' },
      { frente: '¿Cuál es la referencia para saber si la posición es correcta?', reverso: 'El resultado: que el aire entre, no un ángulo determinado.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante inconsciente sin trauma. Al inclinar mucho la cabeza deja de entrar aire. ¿Qué haces?',
        opciones: [
          'Aumentar la extensión: no era suficiente.',
          'Reducir la extensión hasta la posición neutra y volver a comprobar.',
          'Cambiar a triple maniobra modificada por sospecha de lesión cervical.',
          'Iniciar compresiones de inmediato.',
        ],
        correcta: 1,
        explicacion: 'En el lactante la extensión excesiva obstruye. La referencia es el resultado: se ajusta hasta que el aire entra.',
      },
      {
        pregunta: '¿Por qué la maniobra frente-mentón abre mejor que la elevación del mentón sola?',
        opciones: [
          'Porque aumenta el volumen corriente.',
          'Porque suma la alineación de los ejes de la vía aérea al desplazamiento de la mandíbula.',
          'Porque comprime los tejidos submandibulares.',
          'Porque reduce el espacio muerto.',
        ],
        correcta: 1,
        explicacion: 'Los dos componentes actúan sobre estructuras distintas y sus efectos se suman.',
      },
      {
        pregunta: 'Paciente hallado inconsciente al pie de una escalera. ¿Usarías la maniobra frente-mentón?',
        opciones: [
          'Sí, porque es la más eficaz.',
          'No: el mecanismo sugiere lesión cervical y corresponde la triple maniobra modificada.',
          'Sí, pero con menor extensión.',
          'Solo si el paciente respira espontáneamente.',
        ],
        correcta: 1,
        explicacion: 'Una caída desde altura es mecanismo compatible con lesión de columna; la apertura debe hacerse sin extender el cuello.',
      },
      {
        pregunta: 'En la maniobra frente-mentón, ¿dónde se apoya la mano que inclina?',
        opciones: [
          'Bajo el occipucio.',
          'Con la palma sobre la frente.',
          'Sobre los ángulos mandibulares.',
          'Sobre el cartílago tiroides.',
        ],
        correcta: 1,
        explicacion: 'La palma sobre la frente aplica la presión firme y sostenida que inclina la cabeza; los ángulos mandibulares corresponden a la tracción mandibular.',
      },
    ],
    actividades: null,
    revision: ficha([
      'Las particularidades pediátricas completas se remiten al Módulo 6; aquí solo se declara el '
        + 'ajuste del grado de extensión por edad.',
    ]),
  },

  // ============================================================
  //  Cánulas orofaríngeas
  // ============================================================
  'm3-va-canulas-orofaringeas': {
    icono: '🔧',
    duracion: '15 min',
    resumen: 'El dispositivo básico que releva a la mano: una cánula rígida que sostiene la lengua '
      + 'separada de la faringe, y que solo tolera el paciente sin reflejo nauseoso.',
    objetivos: [
      'Seleccionar el tamaño de cánula orofaríngea mediante una referencia anatómica.',
      'Aplicar la técnica de inserción y comprobar su efecto.',
      'Reconocer la contraindicación principal y las complicaciones de una colocación incorrecta.',
    ],
    secciones: [
      {
        titulo: 'Qué hace y a quién se le pone',
        bloques: [
          { tipo: 'p', texto: 'La cánula orofaríngea es un dispositivo rígido y curvo que se aloja en la orofaringe y mantiene la base de la lengua separada de la pared posterior de la faringe. Su función es sostener la apertura que consiguió la maniobra manual, de modo que la permeabilidad no dependa de que alguien mantenga la posición.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Solo en el paciente sin reflejo nauseoso', texto: 'Un paciente con reflejo nauseoso conservado no tolera la cánula: puede provocar náusea, vómito y aspiración, y en algunos casos laringoespasmo. Si el paciente reacciona al intentar colocarla, se retira. Que la rechace es información clínica, no una técnica mal hecha.' },
          { tipo: 'p', texto: 'La cánula mantiene la vía aérea abierta, pero no la aísla ni protege del contenido gástrico. Un paciente con cánula orofaríngea puede aspirar, así que la aspiración debe estar preparada y el paciente vigilado.' },
        ],
      },
      {
        titulo: 'Elección del tamaño',
        bloques: [
          { tipo: 'p', texto: 'El tamaño se elige midiendo sobre el propio paciente, no por su edad ni por su complexión aparente. La referencia habitual es la distancia desde la comisura de los labios hasta el ángulo de la mandíbula; también se emplea la distancia desde el centro de los incisivos hasta el ángulo mandibular.' },
          {
            tipo: 'tabla',
            titulo: 'Consecuencia de equivocar el tamaño',
            headers: ['Tamaño', 'Qué ocurre'],
            filas: [
              ['Demasiado corta', 'No alcanza a sostener la lengua y puede empujarla hacia atrás, agravando la obstrucción'],
              ['Demasiado larga', 'Puede alcanzar la entrada de la laringe, estimular el vómito o el laringoespasmo y obstruir'],
              ['Correcta', 'La brida queda apoyada en los labios y la punta sostiene la base de la lengua'],
            ],
          },
        ],
      },
      {
        titulo: 'Técnica de inserción',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Técnica en el adulto',
            items: [
              'Comprobar que el paciente no tiene reflejo nauseoso.',
              'Medir la cánula sobre el paciente y elegir el tamaño.',
              'Abrir la boca y aspirar si hay secreciones o contenido visible.',
              'Introducir la cánula con la concavidad hacia el paladar.',
              'Avanzarla hasta aproximadamente la mitad y girarla 180 grados hasta que la concavidad siga la curva de la lengua.',
              'Completar la inserción hasta que la brida apoye sobre los labios.',
              'Comprobar el paso del aire y mantener la maniobra manual si hace falta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'En el niño no se gira', texto: 'En pediatría la técnica del giro de 180 grados puede lesionar el paladar blando, que es más frágil. En el niño la cánula se introduce siguiendo la curvatura anatómica, ayudándose de un depresor lingual cuando se dispone de él. El manejo pediátrico completo corresponde al Módulo 6.' },
          { tipo: 'p', texto: 'Después de colocarla se reevalúa: si el paciente empieza a rechazarla, si aparecen náuseas o si recupera el reflejo, se retira. La colocación se registra con su hora, igual que cualquier otra intervención.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [AHA_BLS, PHTLS9] }] },
    ],
    conceptosClave: [
      { termino: 'Cánula orofaríngea', definicion: 'Dispositivo rígido y curvo que se aloja en la orofaringe y mantiene la base de la lengua separada de la pared faríngea.' },
      { termino: 'Reflejo nauseoso', definicion: 'Respuesta protectora cuya presencia contraindica la cánula orofaríngea; su ausencia es lo que permite tolerarla.' },
      { termino: 'Brida', definicion: 'Reborde externo de la cánula que apoya sobre los labios y limita su avance.' },
      { termino: 'Medición sobre el paciente', definicion: 'Selección del tamaño por referencia anatómica —comisura labial a ángulo mandibular— y no por edad o complexión.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la contraindicación principal de la cánula orofaríngea?', reverso: 'La presencia de reflejo nauseoso conservado.' },
      { frente: '¿Cómo se elige el tamaño?', reverso: 'Midiendo sobre el paciente: de la comisura de los labios al ángulo de la mandíbula.' },
      { frente: '¿Qué ocurre si la cánula es demasiado corta?', reverso: 'No sostiene la lengua y puede empujarla hacia atrás, agravando la obstrucción.' },
      { frente: '¿Cómo se introduce en el adulto?', reverso: 'Con la concavidad hacia el paladar, girándola 180 grados a medio camino.' },
      { frente: '¿Por qué no se gira en el niño?', reverso: 'Porque puede lesionar el paladar blando; se introduce siguiendo la curvatura anatómica.' },
      { frente: '¿Protege la cánula orofaríngea de la aspiración?', reverso: 'No: mantiene la vía abierta pero no la aísla del contenido gástrico.' },
    ],
    quiz: [
      {
        pregunta: 'Al intentar colocar una cánula orofaríngea el paciente tiene arcadas. ¿Qué haces?',
        opciones: [
          'Insistir con una cánula más pequeña.',
          'Retirarla: conserva el reflejo nauseoso y la cánula está contraindicada.',
          'Sedarlo para tolerarla.',
          'Introducirla más deprisa para superar la arcada.',
        ],
        correcta: 1,
        explicacion: 'El reflejo nauseoso conservado contraindica el dispositivo por riesgo de vómito, aspiración y laringoespasmo; su rechazo es información clínica.',
      },
      {
        pregunta: 'Colocas una cánula demasiado larga. ¿Cuál es el riesgo?',
        opciones: [
          'Que se desplace hacia fuera sola.',
          'Que alcance la entrada de la laringe y provoque vómito, laringoespasmo u obstrucción.',
          'Que sostenga la lengua en exceso.',
          'Que impida la aspiración de secreciones.',
        ],
        correcta: 1,
        explicacion: 'Una cánula excesivamente larga estimula estructuras laríngeas y puede obstruir en vez de permeabilizar.',
      },
      {
        pregunta: 'En un adulto, ¿cómo se introduce la cánula orofaríngea?',
        opciones: [
          'Siguiendo la curvatura de la lengua desde el inicio.',
          'Con la concavidad hacia el paladar, girándola 180 grados a medio camino.',
          'Lateralmente, desde la comisura.',
          'Con la concavidad hacia la lengua y sin girar.',
        ],
        correcta: 1,
        explicacion: 'El giro evita arrastrar la lengua hacia atrás durante la inserción; es la técnica del adulto, no la pediátrica.',
      },
      {
        pregunta: 'Paciente inconsciente, sin reflejo nauseoso, con cánula orofaríngea bien colocada. ¿Qué NO puedes asumir?',
        opciones: [
          'Que la lengua está separada de la pared faríngea.',
          'Que está protegido frente a la aspiración de contenido gástrico.',
          'Que la permeabilidad ya no depende de sostener la maniobra.',
          'Que hay que vigilar si recupera el reflejo.',
        ],
        correcta: 1,
        explicacion: 'La cánula mantiene la vía abierta pero no la aísla: la aspiración debe permanecer preparada y el paciente vigilado.',
      },
      {
        pregunta: '¿Cuál es la referencia anatómica correcta para elegir el tamaño?',
        opciones: [
          'La edad del paciente.',
          'La distancia de la comisura de los labios al ángulo de la mandíbula.',
          'La distancia entre ambos ángulos mandibulares.',
          'El diámetro de la narina.',
        ],
        correcta: 1,
        explicacion: 'El tamaño se mide sobre el propio paciente; la edad y la complexión aparente no predicen la longitud necesaria.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la colocación de una cánula orofaríngea en el adulto',
        pasos: [
          'Comprobar la ausencia de reflejo nauseoso',
          'Medir de la comisura labial al ángulo mandibular',
          'Aspirar secreciones o contenido visible',
          'Introducir con la concavidad hacia el paladar',
          'Girar 180 grados a medio camino',
          'Avanzar hasta que la brida apoye en los labios',
          'Comprobar el paso del aire y registrar la hora',
        ],
      },
    },
    revision: ficha([
      'La técnica pediátrica se nombra para no enseñar el giro a todas las edades, pero su desarrollo '
        + 'corresponde al Módulo 6.',
      'No se declaran tamaños numéricos por edad: la selección se hace midiendo sobre el paciente y '
        + 'el inventario de cada unidad depende del servicio.',
    ]),
  },

  // ============================================================
  //  Cánulas nasofaríngeas
  // ============================================================
  'm3-va-canulas-nasofaringeas': {
    icono: '👃',
    duracion: '15 min',
    resumen: 'La alternativa cuando la boca no es una opción: un tubo blando que llega a la nasofaringe y '
      + 'que un paciente con reflejo nauseoso conservado suele tolerar.',
    objetivos: [
      'Indicar la cánula nasofaríngea en los pacientes en que la orofaríngea no es viable.',
      'Seleccionar el tamaño y aplicar la técnica de inserción atraumática.',
      'Reconocer las situaciones en que su uso exige precaución o se evita.',
    ],
    secciones: [
      {
        titulo: 'Cuándo se elige',
        bloques: [
          { tipo: 'p', texto: 'La cánula nasofaríngea es un tubo blando que se introduce por una fosa nasal y cuyo extremo distal queda en la nasofaringe, por detrás de la lengua. Al no estimular la orofaringe posterior con la misma intensidad que la cánula rígida, suele ser tolerada por pacientes con reflejo nauseoso conservado.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones en que aporta',
            items: [
              'Paciente con estado de conciencia deprimido pero con reflejo nauseoso presente.',
              'Trismo o imposibilidad de abrir la boca.',
              'Traumatismo o lesión oral que impide colocar una cánula orofaríngea.',
              'Convulsiones con mandíbula apretada, cuando el protocolo del servicio lo contempla.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Tampoco aísla la vía aérea', texto: 'Igual que la orofaríngea, mantiene un conducto permeable pero no protege frente a la aspiración. La vigilancia y la aspiración preparada siguen siendo necesarias.' },
        ],
      },
      {
        titulo: 'Tamaño y técnica',
        bloques: [
          { tipo: 'p', texto: 'La longitud se estima midiendo sobre el paciente, desde la punta de la nariz hasta el lóbulo de la oreja o el trago. El diámetro se elige de forma que entre sin forzar; una cánula demasiado gruesa lesiona la mucosa y sangra.' },
          {
            tipo: 'pasos',
            titulo: 'Inserción',
            items: [
              'Medir la longitud sobre el paciente y comprobar que el diámetro entra sin forzar.',
              'Lubricar la cánula con lubricante hidrosoluble.',
              'Elegir la fosa nasal de mayor calibre aparente, habitualmente la derecha.',
              'Introducirla con el bisel orientado hacia el tabique nasal.',
              'Avanzar en dirección perpendicular al plano de la cara, siguiendo el piso de la fosa nasal, nunca hacia arriba.',
              'Si encuentra resistencia, retirar e intentar por la otra fosa; no forzar.',
              'Comprobar el paso del aire y registrar la colocación.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La dirección importa', texto: 'La cánula avanza hacia atrás, siguiendo el piso de la fosa nasal, no hacia arriba. Dirigirla hacia arriba choca contra los cornetes, produce dolor y sangrado y no alcanza la nasofaringe.' },
        ],
      },
      {
        titulo: 'Precauciones',
        bloques: [
          { tipo: 'p', texto: 'La complicación más frecuente es la epistaxis por lesión de la mucosa, favorecida por una técnica brusca, una cánula demasiado gruesa o la ausencia de lubricación. En un paciente con conciencia deprimida, la sangre en la faringe añade un problema de vía aérea al que ya tenía.' },
          { tipo: 'p', texto: 'Ante sospecha de fractura de la base del cráneo —equimosis periorbitaria, equimosis retroauricular, salida de sangre o líquido claro por nariz u oídos— la vía nasal se evita o se emplea únicamente si el protocolo del servicio lo autoriza expresamente, por el riesgo teórico de que el dispositivo tome una trayectoria intracraneal. En esa situación se prefiere la vía oral o el dispositivo que el alcance del prestador permita.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Anticoagulación y alteraciones de la coagulación', texto: 'En un paciente anticoagulado o con trastorno de la coagulación conocido, una epistaxis provocada puede ser difícil de controlar. Conviene valorar si la vía oral resuelve el problema antes de recurrir a la nasal.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [AHA_BLS, PHTLS9] }] },
    ],
    conceptosClave: [
      { termino: 'Cánula nasofaríngea', definicion: 'Tubo blando introducido por una fosa nasal cuyo extremo queda en la nasofaringe, por detrás de la lengua.' },
      { termino: 'Trismo', definicion: 'Imposibilidad de abrir la boca por contractura mandibular; indicación frecuente de la vía nasofaríngea.' },
      { termino: 'Piso de la fosa nasal', definicion: 'Trayecto por el que avanza la cánula, en dirección perpendicular al plano de la cara y no hacia arriba.' },
      { termino: 'Epistaxis', definicion: 'Hemorragia nasal; complicación más frecuente de la inserción, favorecida por técnica brusca o falta de lubricación.' },
      { termino: 'Signos de fractura de base de cráneo', definicion: 'Equimosis periorbitaria o retroauricular y salida de sangre o líquido claro por nariz u oídos; obligan a evitar o restringir la vía nasal.' },
    ],
    flashcards: [
      { frente: '¿Qué ventaja tiene la cánula nasofaríngea sobre la orofaríngea?', reverso: 'Suele ser tolerada por pacientes con reflejo nauseoso conservado.' },
      { frente: '¿Cómo se mide su longitud?', reverso: 'Desde la punta de la nariz hasta el lóbulo de la oreja o el trago del propio paciente.' },
      { frente: '¿En qué dirección se avanza la cánula?', reverso: 'Hacia atrás, siguiendo el piso de la fosa nasal, perpendicular al plano de la cara; nunca hacia arriba.' },
      { frente: '¿Cuál es su complicación más frecuente?', reverso: 'La epistaxis por lesión de la mucosa.' },
      { frente: '¿Qué hallazgos hacen evitar la vía nasal?', reverso: 'Los signos de fractura de base de cráneo: equimosis periorbitaria o retroauricular y salida de sangre o líquido claro por nariz u oídos.' },
      { frente: 'Si encuentras resistencia al introducirla, ¿qué haces?', reverso: 'Retirar e intentar por la otra fosa; nunca forzar.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente somnoliento tras una convulsión, con mandíbula apretada y reflejo nauseoso presente. ¿Qué dispositivo básico consideras?',
        opciones: [
          'Cánula orofaríngea, forzando la apertura bucal.',
          'Cánula nasofaríngea.',
          'Ninguno: esperar a que despierte.',
          'Mascarilla laríngea de inmediato.',
        ],
        correcta: 1,
        explicacion: 'El trismo impide la vía oral y el reflejo conservado contraindica la cánula rígida; la nasofaríngea resuelve ambas limitaciones.',
      },
      {
        pregunta: 'Traumatismo craneal con equimosis retroauricular y salida de líquido claro por la nariz. ¿Usarías cánula nasofaríngea?',
        opciones: [
          'Sí, con lubricante abundante.',
          'No: hay signos de fractura de base de cráneo; se evita o se restringe al protocolo del servicio.',
          'Sí, pero por la fosa contraria.',
          'Sí, siempre que el paciente esté inconsciente.',
        ],
        correcta: 1,
        explicacion: 'Esos hallazgos sugieren fractura de base de cráneo y desaconsejan la vía nasal por el riesgo de trayectoria intracraneal.',
      },
      {
        pregunta: 'Durante la inserción notas resistencia franca en la fosa derecha. ¿Qué haces?',
        opciones: [
          'Aumentar la presión con un movimiento firme.',
          'Retirar e intentar por la fosa izquierda.',
          'Rotar la cánula 180 grados como en la orofaríngea.',
          'Introducirla dirigiéndola hacia arriba.',
        ],
        correcta: 1,
        explicacion: 'Forzar lesiona la mucosa y provoca epistaxis; dirigir hacia arriba choca contra los cornetes y no alcanza la nasofaringe.',
      },
      {
        pregunta: 'Un paciente anticoagulado necesita un dispositivo básico y tolera la apertura bucal. ¿Qué consideración aplica?',
        opciones: [
          'La vía nasal es preferible por ser más cómoda.',
          'Conviene valorar la vía oral primero, porque una epistaxis provocada puede ser difícil de controlar.',
          'La anticoagulación no influye en esta decisión.',
          'Debe usarse cánula nasofaríngea de menor calibre sin lubricar.',
        ],
        correcta: 1,
        explicacion: 'La lesión de la mucosa nasal en un paciente anticoagulado puede generar un sangrado difícil de controlar que añade un problema de vía aérea.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La cánula nasofaríngea se avanza siguiendo el ___ de la fosa nasal, no hacia arriba.',
          opciones: ['techo', 'piso', 'tabique'],
          correcta: 1,
          explicacion: 'Dirigirla hacia arriba choca contra los cornetes, provoca dolor y sangrado y no alcanza la nasofaringe.',
        },
      ],
    },
    revision: ficha([
      'La restricción ante sospecha de fractura de base de cráneo se enuncia como precaución sujeta '
        + 'al protocolo del servicio, no como prohibición absoluta: la evidencia es limitada y la '
        + 'conducta varía entre protocolos.',
      'No se declaran calibres numéricos: el inventario y los tamaños disponibles dependen del '
        + 'servicio y la selección se hace midiendo sobre el paciente.',
    ]),
  },
}
