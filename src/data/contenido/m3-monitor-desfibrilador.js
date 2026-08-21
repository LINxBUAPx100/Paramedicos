// ============================================================
//  Módulo 3 · Monitor desfibrilador
// ------------------------------------------------------------
//  Unidad completa, en el orden del PDF: electrocardiografía básica, uso del
//  monitor desfibrilador, arritmias letales y código mega con su práctica.
//  Con este lote se cierra el contenido académico del Módulo 3.
//
//  Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json para
//  `m3-monitor-desfibrilador`: primarias AHA BLS 2025 y AHA ALS 2025; requiere
//  protocolo local; nota expresa: «Añadir manual del fabricante del equipo
//  real».
//
//  Esa nota no es un formalismo. La guía de 2025 dice literalmente que no se ha
//  identificado un ajuste óptimo de energía para la desfibrilación bifásica
//  —fija o creciente— y que la decisión se defiere al FABRICANTE del equipo; si
//  se desconoce el ajuste indicado, la alternativa es usar la dosis máxima del
//  dispositivo. Por eso en este archivo NO aparece ni un solo valor en julios:
//  publicarlo sería inventar una capacidad del equipo que no conocemos.
//
//  Lo mismo con modos, alarmas, ubicación de controles y prestaciones: cada
//  monitor es distinto y una descripción tomada de otro modelo enseña a operar
//  un aparato que no existe en la unidad.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

const AHA_ALS_2025 = {
  nombre: 'American Heart Association. Part 9: Adult Advanced Life Support. 2025 Guidelines for '
    + 'Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation, 2025. '
    + 'DOI 10.1161/CIR.0000000000001376.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support',
  nota: 'Fuente de la que procede la regla de esta unidad: el ajuste de energía se defiere al '
    + 'fabricante del desfibrilador, y ante ajuste desconocido se emplea la dosis máxima del '
    + 'dispositivo. También respalda la prioridad de la desfibrilación temprana en FV/TVsp.',
}
const AHA_BLS_2025 = {
  nombre: 'American Heart Association. Part 7: Adult Basic Life Support. 2025 Guidelines for '
    + 'Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Calidad de las compresiones, minimización de pausas y reanudación inmediata tras la '
    + 'descarga.',
}
const NOM_034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención médica prehospitalaria de '
    + 'las urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Equipamiento y personal exigidos por tipo de ambulancia; determina qué unidades llevan '
    + 'monitor desfibrilador y quién puede operarlo.',
}
// El manual del fabricante es la fuente OBLIGATORIA que falta, y por eso NO
// aparece en el bloque de fuentes: una referencia sin fabricante, modelo ni
// versión no es una fuente, es una deuda, y listarla ahí la haría pasar por
// consultada. Va como aviso visible en el texto y como observación de la ficha
// editorial, que es donde se registran las deudas.
const AVISO_MANUAL = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Falta una fuente obligatoria de esta unidad',
  texto: 'Las energías de desfibrilación y cardioversión, los modos disponibles, las alarmas, la '
    + 'disposición de los controles, los consumibles compatibles y las prestaciones reales del '
    + 'equipo proceden del manual de operación del monitor que utiliza tu servicio. La academia '
    + 'todavía no ha declarado fabricante, modelo y versión, así que ninguno de esos datos aparece '
    + 'en estas páginas. Consúltalos en el equipo real antes de operarlo.',
}

const F = (items) => ({
  titulo: 'Fuentes',
  bloques: [{ tipo: 'fuentes', items }, AVISO_MANUAL],
})
const FUENTES = F([AHA_ALS_2025, AHA_BLS_2025, NOM_034])

const DEUDA_EQUIPO = 'DECISIÓN PENDIENTE (bloquea la validación de toda la unidad): la academia '
  + 'debe declarar fabricante, modelo y versión del monitor desfibrilador de sus unidades y aportar '
  + 'su manual de operación. Sin él no pueden enseñarse energías, modos, alarmas ni la disposición '
  + 'de los controles, y esta lección no los inventa.'
const ALCANCE = 'ALCANCE: monitorizar, desfibrilar, cardiovertir y estimular son actos distintos y '
  + 'con autorizaciones distintas. Estudiarlos no autoriza a realizarlos: el alcance depende de la '
  + 'certificación del prestador, del tipo de unidad conforme a la NOM-034 y de la dirección médica.'

const ficha = (extra = []) => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA 2025 (Part 7 BLS y Part 9 ALS del adulto); NOM-034-SSA3-2013',
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    ALCANCE,
    DEUDA_EQUIPO,
    ...extra,
  ],
  fuentes: [
    'AHA. Part 9: Adult Advanced Life Support. 2025 Guidelines. Circulation, 2025. DOI 10.1161/CIR.0000000000001376.',
    'AHA. Part 7: Adult Basic Life Support. 2025 Guidelines.',
    'NOM-034-SSA3-2013, DOF.',
    'PENDIENTE: manual del fabricante del monitor desfibrilador de la academia.',
  ],
})

export default {
  // ============================================================
  //  Electrocardiografía básica
  // ============================================================
  'm3-md-ecg-basica': {
    icono: 'dg-ecg-onda-normal',
    duracion: '18 min',
    resumen: 'Qué representa el trazo del monitor, cómo se lee de forma ordenada y por qué lo que se '
      + 'interpreta es el paciente y no la pantalla.',
    objetivos: [
      'Relacionar cada onda del trazo con el fenómeno eléctrico que representa.',
      'Aplicar una lectura ordenada del trazo de monitorización.',
      'Distinguir un artefacto de un ritmo real.',
      'Explicar por qué el trazo no informa sobre la eficacia mecánica del corazón.',
    ],
    secciones: [
      {
        titulo: 'Qué muestra el trazo',
        bloques: [
          { tipo: 'p', texto: 'El electrocardiograma registra las diferencias de potencial que genera la despolarización y la repolarización del músculo cardiaco, recogidas desde la superficie del cuerpo. No mide contracción, no mide flujo y no mide presión: mide actividad eléctrica.' },
          {
            tipo: 'tabla',
            titulo: 'Correspondencia entre trazo y fenómeno',
            headers: ['Elemento', 'Qué representa'],
            filas: [
              ['Onda P', 'Despolarización auricular'],
              ['Intervalo PR', 'Tiempo desde el inicio de la despolarización auricular hasta el inicio de la ventricular'],
              ['Complejo QRS', 'Despolarización ventricular'],
              ['Segmento ST', 'Periodo entre el fin de la despolarización y el inicio de la repolarización ventricular'],
              ['Onda T', 'Repolarización ventricular'],
              ['Línea isoeléctrica', 'Ausencia de diferencia de potencial registrable'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La distinción que ordena toda la unidad', texto: 'Un trazo puede verse organizado y el paciente no tener pulso. La actividad eléctrica sin pulso existe precisamente por eso. La consecuencia práctica es absoluta y no admite matiz: la decisión de tratar nace de la exploración del paciente, y el monitor solo aporta el dato eléctrico.' },
        ],
      },
      {
        titulo: 'Cómo se lee un trazo de monitorización',
        bloques: [
          { tipo: 'p', texto: 'La lectura del trazo de monitorización sigue siempre el mismo orden. Un orden fijo evita el error más común del principiante, que es reconocer una imagen de memoria y saltarse la comprobación.' },
          {
            tipo: 'pasos',
            titulo: 'Cinco preguntas, siempre en este orden',
            items: [
              '¿Hay actividad eléctrica, o la línea es isoeléctrica?',
              '¿Cuál es la frecuencia: lenta, normal o rápida?',
              '¿El ritmo es regular o irregular?',
              '¿Hay ondas P y guardan relación constante con los complejos?',
              '¿El complejo QRS es estrecho o ancho?',
            ],
          },
          { tipo: 'p', texto: 'Estas cinco preguntas no producen un diagnóstico electrocardiográfico completo, y no pretenden hacerlo: producen la clasificación operativa que el ámbito prehospitalario necesita para decidir. El diagnóstico fino, con las doce derivaciones y su interpretación, corresponde al Módulo 4.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Calibración antes de medir', texto: 'Toda medición sobre el papel o la pantalla depende de la velocidad de barrido y de la amplitud configuradas en el equipo. La convención estándar es 25 mm por segundo y 10 mm por milivoltio, pero es un ajuste que puede cambiarse: se verifica en el propio monitor antes de medir nada, porque un trazo registrado a otra velocidad da frecuencias falsas.' },
        ],
      },
      {
        titulo: 'Artefactos: lo que parece un ritmo y no lo es',
        bloques: [
          { tipo: 'p', texto: 'En una ambulancia en movimiento, con un paciente que tirita y un equipo que se mueve alrededor, el trazo se contamina con facilidad. Confundir un artefacto con un ritmo lleva a tratar a un paciente que no lo necesita, o a no tratar al que sí.' },
          {
            tipo: 'tabla',
            titulo: 'Origen y corrección',
            headers: ['Artefacto', 'Cómo se reconoce', 'Qué hacer'],
            filas: [
              ['Movimiento del paciente o del vehículo', 'Oscilaciones irregulares sin patrón repetido', 'Detener el vehículo si es posible y repetir la lectura'],
              ['Temblor muscular o escalofrío', 'Trazo tembloroso continuo con línea de base inestable', 'Abrigar al paciente y recolocar electrodos en zonas menos musculosas'],
              ['Electrodo despegado o seco', 'Línea plana en una sola derivación o ruido intenso', 'Comprobar el contacto, limpiar y secar la piel, cambiar el electrodo'],
              ['Interferencia eléctrica', 'Ondulación regular y fina sobre la línea de base', 'Separar cables de fuentes de corriente y comprobar conexiones'],
              ['Compresiones torácicas', 'Deflexiones rítmicas coincidentes con la compresión', 'Interpretar solo durante la pausa de análisis'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La regla que resuelve la duda', texto: 'Ante un trazo que no encaja con lo que se ve en el paciente, se comprueba primero al paciente y después el equipo: contacto de electrodos, cables y derivación seleccionada. Una asistolia en pantalla con un paciente que conversa es un electrodo suelto, no un paro.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Electrocardiograma', definicion: 'Registro de las diferencias de potencial generadas por la despolarización y repolarización del músculo cardiaco.' },
      { termino: 'Complejo QRS', definicion: 'Deflexión que representa la despolarización ventricular; su anchura orienta sobre el origen del impulso.' },
      { termino: 'Línea isoeléctrica', definicion: 'Trazo sin diferencia de potencial registrable.' },
      { termino: 'Artefacto', definicion: 'Deflexión del trazo producida por movimiento, temblor, mal contacto o interferencia, que no corresponde a actividad cardiaca.' },
      { termino: 'Velocidad de barrido', definicion: 'Ajuste del equipo que determina cuánto tiempo representa cada milímetro del trazo; se verifica antes de medir.' },
    ],
    flashcards: [
      { frente: '¿Qué mide el electrocardiograma?', reverso: 'Actividad eléctrica del corazón; no mide contracción, flujo ni presión.' },
      { frente: '¿Qué representa el complejo QRS?', reverso: 'La despolarización ventricular.' },
      { frente: 'Enumera las cinco preguntas de la lectura ordenada.', reverso: '¿Hay actividad?, ¿qué frecuencia?, ¿regular o irregular?, ¿hay P y se relacionan con el QRS?, ¿QRS estrecho o ancho?' },
      { frente: '¿Cuál es la convención estándar de calibración?', reverso: '25 mm por segundo y 10 mm por milivoltio; se verifica en el monitor porque puede cambiarse.' },
      { frente: 'Asistolia en pantalla y paciente que conversa. ¿Qué es?', reverso: 'Un artefacto por electrodo suelto: se comprueba primero al paciente y después el equipo.' },
      { frente: '¿Por qué un trazo organizado no garantiza pulso?', reverso: 'Porque el monitor registra actividad eléctrica y no eficacia mecánica; es lo que ocurre en la actividad eléctrica sin pulso.' },
    ],
    quiz: [
      {
        pregunta: 'El monitor muestra un trazo organizado a frecuencia normal, pero el paciente no responde y no tiene pulso central. ¿Qué concluyes?',
        opciones: [
          'El monitor está mal calibrado.',
          'Hay actividad eléctrica sin eficacia mecánica: la decisión nace del paciente, no de la pantalla.',
          'El paciente tiene circulación adecuada.',
          'Debe repetirse la lectura antes de actuar.',
        ],
        correcta: 1,
        explicacion: 'El electrocardiograma registra actividad eléctrica y no contracción; un trazo organizado sin pulso es exactamente la situación que define la actividad eléctrica sin pulso.',
      },
      {
        pregunta: 'Durante el traslado el trazo se vuelve tembloroso con línea de base inestable y el paciente tirita. ¿Qué haces?',
        opciones: [
          'Interpretarlo como fibrilación.',
          'Abrigar al paciente y recolocar electrodos en zonas menos musculosas.',
          'Aumentar la amplitud del trazo.',
          'Cambiar a otra derivación sin más comprobación.',
        ],
        correcta: 1,
        explicacion: 'Es un artefacto por temblor muscular; se corrige la causa antes de interpretar, no se aumenta la ganancia ni se asume un ritmo.',
      },
      {
        pregunta: '¿Por qué se verifica la velocidad de barrido antes de medir sobre el trazo?',
        opciones: [
          'Porque afecta al color de la pantalla.',
          'Porque un trazo registrado a otra velocidad da frecuencias falsas.',
          'Porque determina la energía de descarga.',
          'Porque cambia la derivación seleccionada.',
        ],
        correcta: 1,
        explicacion: 'La correspondencia entre milímetros y tiempo depende de ese ajuste; medir sin comprobarlo produce cifras erróneas.',
      },
      {
        pregunta: 'En la lectura ordenada, ¿cuál es la primera pregunta?',
        opciones: [
          '¿El QRS es ancho o estrecho?',
          '¿Hay actividad eléctrica o la línea es isoeléctrica?',
          '¿Hay ondas P?',
          '¿El ritmo es regular?',
        ],
        correcta: 1,
        explicacion: 'El orden fijo empieza por comprobar si hay actividad; saltarse ese paso es el error habitual de quien reconoce imágenes de memoria.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la lectura de un trazo de monitorización',
        pasos: [
          'Comprobar si hay actividad eléctrica',
          'Determinar la frecuencia',
          'Valorar la regularidad',
          'Buscar ondas P y su relación con los complejos',
          'Valorar la anchura del QRS',
        ],
      },
    },
    revision: ficha([
      'La interpretación de las doce derivaciones y el diagnóstico electrocardiográfico corresponden '
        + 'al Módulo 4; aquí se enseña solo la lectura operativa del trazo de monitorización.',
      'La convención de 25 mm/s y 10 mm/mV se declara como ajuste estándar verificable en el equipo, '
        + 'no como una capacidad concreta del monitor de la academia.',
    ]),
  },

  // ============================================================
  //  Uso del monitor desfibrilador
  // ============================================================
  'm3-md-uso-monitor': {
    icono: 'cp-smart-holter',
    duracion: '18 min',
    resumen: 'Las tres funciones que un mismo aparato puede cumplir —desfibrilar, cardiovertir y '
      + 'estimular— y por qué confundirlas es el error con más consecuencias de esta unidad.',
    objetivos: [
      'Diferenciar desfibrilación, cardioversión sincronizada y estimulación transcutánea.',
      'Aplicar la secuencia de seguridad previa a cualquier descarga.',
      'Justificar por qué la energía a emplear la determina el fabricante del equipo.',
      'Reconocer las condiciones que exigen preparar la piel antes de colocar los parches.',
    ],
    secciones: [
      {
        titulo: 'Tres funciones, tres indicaciones',
        bloques: [
          { tipo: 'p', texto: 'El monitor desfibrilador reúne funciones que se parecen en la maniobra y no se parecen en nada en su indicación. Distinguirlas no es un matiz académico: aplicar una descarga no sincronizada a un paciente con pulso puede desencadenar un ritmo peor que el que se pretendía tratar.' },
          {
            tipo: 'tabla',
            titulo: 'Qué las separa',
            headers: ['Función', 'Situación en que se plantea', 'Relación con el trazo', 'Estado del paciente'],
            filas: [
              ['Desfibrilación', 'Ritmo desfibrilable en paro: fibrilación ventricular o taquicardia ventricular sin pulso', 'NO sincronizada: la descarga se entrega al pulsar', 'Sin pulso'],
              ['Cardioversión sincronizada', 'Taquiarritmia con pulso e inestabilidad, según protocolo', 'SINCRONIZADA con la onda R del propio paciente', 'Con pulso'],
              ['Estimulación transcutánea', 'Bradicardia sintomática que no responde a las medidas previas, según protocolo', 'El equipo genera el estímulo a la frecuencia programada', 'Con pulso'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Por qué la sincronización importa', texto: 'La cardioversión se sincroniza para que la descarga no coincida con el periodo vulnerable de la repolarización ventricular. Una descarga no sincronizada en un paciente con pulso puede inducir fibrilación ventricular. Comprobar que el equipo está efectivamente en modo sincronizado, y que marca cada complejo, es parte de la maniobra y no un paso opcional.' },
          { tipo: 'p', texto: 'Cuáles de estas tres funciones están dentro del alcance del alumno, en qué unidades hay equipo para realizarlas y bajo qué indicación lo autoriza la dirección médica son cuestiones del protocolo del servicio. Esta lección las describe; no las autoriza.' },
        ],
      },
      {
        titulo: 'La energía la decide el fabricante',
        bloques: [
          { tipo: 'p', texto: 'Las guías de soporte vital avanzado de la American Heart Association de 2025 son explícitas en este punto: no se ha identificado un ajuste óptimo de energía para la desfibrilación bifásica, ni fijo ni creciente, y la decisión se defiere al fabricante del desfibrilador. Cuando el ajuste indicado por el fabricante se desconoce, la alternativa que plantean es emplear la dosis máxima del dispositivo.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Consecuencia para esta lección', texto: 'Por eso aquí no aparece ni un valor en julios. Memorizar una cifra tomada de otro equipo enseña a operar un aparato que no es el de la ambulancia. Lo que hay que saber es dónde está escrito el ajuste correcto: en el manual del monitor que usa tu servicio y en su protocolo.' },
          { tipo: 'p', texto: 'La misma regla se aplica a la cardioversión sincronizada y a la estimulación transcutánea: las energías, las frecuencias de estimulación y la intensidad de captura dependen del equipo y del protocolo, y no se publican en esta página.' },
        ],
      },
      {
        titulo: 'Preparación y seguridad',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Antes de cualquier descarga',
            items: [
              'Confirmar la situación clínica en el paciente, no solo en la pantalla.',
              'Descubrir el tórax y comprobar que la piel está seca.',
              'Retirar parches de medicación transdérmica del área y limpiar la piel.',
              'Comprobar que no hay contacto con superficies mojadas ni metálicas.',
              'Colocar los parches en una de las posiciones aceptadas, respetando la distancia a un dispositivo implantado.',
              'Seleccionar la función correcta y, si es cardioversión, verificar que la sincronización está activa y marca los complejos.',
              'Anunciar en voz alta y comprobar visualmente que nadie toca al paciente ni a la camilla.',
              'Entregar la descarga y reanudar de inmediato lo que corresponda.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La comprobación es visual', texto: 'Avisar en voz alta no basta. Antes de pulsar se recorre al paciente con la mirada, de la cabeza a los pies, incluyendo quien sostiene una bolsa de ventilación o una vía. Decirlo y no mirarlo es el origen de la mayoría de las descargas accidentales a un reanimador.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones que exigen preparar antes',
            items: [
              'Tórax mojado: secar; el agua dispersa la corriente por la superficie y expone al equipo.',
              'Vello abundante: retirar rápidamente el del área de los parches, según lo que permita el equipo disponible.',
              'Parche de medicación transdérmica: retirar y limpiar la piel de la zona.',
              'Marcapasos o desfibrilador implantado: separar el parche del dispositivo, sin colocarlo encima.',
              'Paciente sobre superficie metálica o encharcada: retirarlo o aislarlo antes de descargar.',
            ],
          },
          { tipo: 'p', texto: 'La disposición de los controles, los modos disponibles, las alarmas, los consumibles compatibles y las prestaciones del monitor varían por completo entre modelos. Esta lección no los describe: se aprenden en el equipo real, con su manual delante, y esa formación es responsabilidad del servicio.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Desfibrilación', definicion: 'Descarga no sincronizada indicada ante un ritmo desfibrilable en paro cardiaco.' },
      { termino: 'Cardioversión sincronizada', definicion: 'Descarga sincronizada con la onda R del paciente, planteada ante taquiarritmia con pulso e inestabilidad, conforme al protocolo.' },
      { termino: 'Estimulación transcutánea', definicion: 'Generación de estímulos eléctricos por el equipo a una frecuencia programada, planteada ante bradicardia sintomática conforme al protocolo.' },
      { termino: 'Periodo vulnerable', definicion: 'Fase de la repolarización ventricular en la que una descarga no sincronizada puede inducir fibrilación ventricular.' },
      { termino: 'Ajuste del fabricante', definicion: 'Energía indicada por quien fabricó el desfibrilador; la guía de 2025 defiere a ella la elección y, si se desconoce, plantea usar la dosis máxima del dispositivo.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue a la desfibrilación de la cardioversión?', reverso: 'La desfibrilación no se sincroniza y se aplica sin pulso; la cardioversión se sincroniza con la onda R y se aplica con pulso.' },
      { frente: '¿Por qué se sincroniza la cardioversión?', reverso: 'Para que la descarga no coincida con el periodo vulnerable de la repolarización ventricular e induzca fibrilación.' },
      { frente: '¿Quién determina la energía de desfibrilación?', reverso: 'El fabricante del equipo; si su ajuste se desconoce, la guía de 2025 plantea usar la dosis máxima del dispositivo.' },
      { frente: '¿Qué se hace con un parche de medicación transdérmica en el área?', reverso: 'Retirarlo y limpiar la piel antes de colocar el parche de desfibrilación.' },
      { frente: '¿Cómo se comprueba que nadie toca al paciente?', reverso: 'Visualmente, recorriendo al paciente de la cabeza a los pies; avisar en voz alta no basta.' },
      { frente: '¿Dónde se aprende el manejo concreto del monitor?', reverso: 'En el equipo real, con su manual delante; los modos y controles varían entre modelos.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con taquiarritmia, pulso presente e inestabilidad. Se plantea cardiovertir. ¿Qué verificas antes de pulsar?',
        opciones: [
          'Que la energía sea la máxima del equipo.',
          'Que el modo sincronizado esté activo y marque cada complejo.',
          'Que el paciente esté inconsciente.',
          'Que los parches estén en posición anteroposterior.',
        ],
        correcta: 1,
        explicacion: 'Sin sincronización la descarga puede caer en el periodo vulnerable de la repolarización e inducir fibrilación ventricular en un paciente que tenía pulso.',
      },
      {
        pregunta: 'Buscas en esta lección la energía en julios para desfibrilar. ¿Por qué no está?',
        opciones: [
          'Porque es un dato reservado a médicos.',
          'Porque la guía de 2025 defiere el ajuste al fabricante del equipo, y una cifra de otro modelo enseñaría a operar un aparato que no existe en la unidad.',
          'Porque la energía no influye en el éxito de la descarga.',
          'Porque siempre se usa la mínima disponible.',
        ],
        correcta: 1,
        explicacion: 'No se ha identificado un ajuste óptimo de energía bifásica; la decisión se defiere al fabricante y, si su ajuste se desconoce, se plantea la dosis máxima del dispositivo.',
      },
      {
        pregunta: 'El paciente lleva un dispositivo implantado bajo la clavícula derecha. ¿Qué haces con los parches?',
        opciones: [
          'Colocar un parche justo encima del dispositivo.',
          'Separar el parche del dispositivo, sin colocarlo encima.',
          'No desfibrilar hasta consultar al fabricante del implante.',
          'Retirar el implante antes de descargar.',
        ],
        correcta: 1,
        explicacion: 'El parche se separa del dispositivo implantado; ni se coloca encima ni la presencia del implante contraindica por sí sola la maniobra.',
      },
      {
        pregunta: '¿Cuál de estas tres funciones se aplica a un paciente SIN pulso?',
        opciones: [
          'La cardioversión sincronizada.',
          'La desfibrilación.',
          'La estimulación transcutánea.',
          'Las tres por igual.',
        ],
        correcta: 1,
        explicacion: 'La desfibrilación se indica ante ritmo desfibrilable en paro; cardioversión y estimulación se plantean en pacientes con pulso.',
      },
      {
        pregunta: 'Encuentras al paciente sobre el suelo encharcado de un baño. ¿Qué haces antes de descargar?',
        opciones: [
          'Descargar con más energía para compensar.',
          'Retirarlo del agua o aislarlo, y secar el tórax.',
          'Colocar los parches en posición anteroposterior.',
          'Desconectar la ventilación.',
        ],
        correcta: 1,
        explicacion: 'El agua dispersa la corriente por la superficie del cuerpo y expone a descarga a quien esté en contacto con ella.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia de seguridad previa a una descarga',
        pasos: [
          'Confirmar la situación clínica en el paciente',
          'Descubrir el tórax y comprobar que la piel está seca',
          'Retirar parches transdérmicos y limpiar la piel',
          'Colocar los parches respetando la distancia a un dispositivo implantado',
          'Seleccionar la función y verificar la sincronización si procede',
          'Anunciar y comprobar VISUALMENTE que nadie toca al paciente',
          'Entregar la descarga y reanudar de inmediato',
        ],
      },
    },
    revision: ficha([
      'Se describen las tres funciones sin atribuir competencias: cuáles autoriza el programa y con '
        + 'qué indicación queda remitido al protocolo y a la dirección médica.',
      'No se publican energías, frecuencias de estimulación, intensidades de captura, modos, alarmas '
        + 'ni disposición de controles.',
    ]),
  },

  // ============================================================
  //  Arritmias letales
  // ============================================================
  'm3-md-arritmias-letales': {
    icono: 'ic-desfibrilador',
    duracion: '16 min',
    resumen: 'Los cuatro ritmos del paro cardiaco y la única clasificación que cambia la conducta en el '
      + 'momento: desfibrilable o no desfibrilable.',
    objetivos: [
      'Reconocer en el trazo los cuatro ritmos asociados al paro cardiaco.',
      'Clasificarlos en desfibrilables y no desfibrilables.',
      'Relacionar esa clasificación con la rama correspondiente del algoritmo vigente.',
      'Comprobar un trazo de asistolia antes de aceptarlo.',
    ],
    secciones: [
      {
        titulo: 'La clasificación que decide',
        bloques: [
          { tipo: 'p', texto: 'En el paro cardiaco el trazo no sirve para poner un nombre elegante al ritmo: sirve para responder una sola pregunta operativa, ¿esta descarga va a servir de algo? De esa respuesta salen las dos ramas del algoritmo de soporte vital avanzado, y todo lo demás —compresiones de calidad, vía aérea, búsqueda de causas— es común a las dos.' },
          {
            tipo: 'tabla',
            titulo: 'Los cuatro ritmos del paro',
            headers: ['Ritmo', 'Cómo se ve en el trazo', 'Clasificación'],
            filas: [
              ['Fibrilación ventricular', 'Ondulación caótica, irregular, sin complejos identificables ni línea de base reconocible', 'DESFIBRILABLE'],
              ['Taquicardia ventricular sin pulso', 'Complejos anchos, rápidos y regulares, sin pulso palpable', 'DESFIBRILABLE'],
              ['Asistolia', 'Línea prácticamente isoeléctrica, sin actividad organizada', 'NO desfibrilable'],
              ['Actividad eléctrica sin pulso', 'Cualquier trazo con actividad organizada, sin pulso palpable', 'NO desfibrilable'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El nombre importa menos que la rama', texto: 'En el ámbito prehospitalario y en el momento del paro, distinguir con precisión el tipo exacto de taquicardia de complejo ancho no cambia lo que hay que hacer. Clasificar bien en desfibrilable o no desfibrilable, sí. La clasificación fina de las arritmias corresponde al Módulo 4.' },
        ],
      },
      {
        titulo: 'Cómo se reconoce cada uno',
        bloques: [
          { tipo: 'h3', texto: 'Fibrilación ventricular' },
          { tipo: 'p', texto: 'El miocardio ventricular se despolariza de forma desorganizada y no hay contracción eficaz. El trazo muestra una ondulación continua, irregular en amplitud y en frecuencia, sin complejos reconocibles. Su aspecto puede ir de ondas amplias a ondas cada vez más finas conforme pasa el tiempo, hasta acercarse visualmente a una asistolia.' },

          { tipo: 'h3', texto: 'Taquicardia ventricular sin pulso' },
          { tipo: 'p', texto: 'Complejos anchos, regulares y rápidos que en el trazo pueden parecer un ritmo perfectamente organizado. Lo que la convierte en un ritmo de paro no es su forma sino la ausencia de pulso: la misma imagen con pulso presente es otra situación clínica y se maneja de otra manera.' },

          { tipo: 'h3', texto: 'Asistolia' },
          { tipo: 'p', texto: 'Ausencia de actividad eléctrica organizada. Es el ritmo que más se confunde con un problema técnico, y por eso antes de aceptarlo se comprueba el equipo.' },
          {
            tipo: 'pasos',
            titulo: 'Comprobación antes de aceptar una asistolia',
            items: [
              'Comprobar que los electrodos están bien adheridos y los cables conectados.',
              'Verificar la derivación seleccionada y cambiarla para confirmar.',
              'Comprobar la ganancia o amplitud del trazo.',
              'Confirmar la ausencia de pulso en el paciente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Fibrilación fina', texto: 'Una fibrilación ventricular de ondas muy finas puede parecer una línea plana con la ganancia baja. Comprobar el equipo antes de aceptar una asistolia no es desconfianza: es lo que evita clasificar como no desfibrilable un ritmo que sí lo era.' },

          { tipo: 'h3', texto: 'Actividad eléctrica sin pulso' },
          { tipo: 'p', texto: 'El monitor muestra actividad organizada —puede ser un trazo de aspecto casi normal— y el paciente no tiene pulso. No es un ritmo concreto sino una situación: actividad eléctrica que no se traduce en contracción eficaz. Su manejo se dirige a encontrar y corregir la causa, porque la descarga no aporta nada aquí.' },
        ],
      },
      {
        titulo: 'Qué hace cada rama',
        bloques: [
          { tipo: 'p', texto: 'La guía de soporte vital avanzado de la American Heart Association de 2025 organiza el paro en dos ramas. En la desfibrilable, la desfibrilación es tanto más eficaz cuanto antes se administre tras el inicio del ritmo, y la reanudación inmediata de las compresiones tras la descarga forma parte de la maniobra. En la no desfibrilable no hay descarga que dar, y el esfuerzo se concentra en compresiones de calidad y en la búsqueda sistemática de causas reversibles.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que ambas ramas comparten', texto: 'Compresiones de alta calidad con interrupciones mínimas, ventilación adecuada, análisis del ritmo en los momentos previstos y búsqueda de causas reversibles. Cambiar de rama al reanalizar no reinicia la reanimación: la continúa.' },
          { tipo: 'p', texto: 'Los fármacos que intervienen en cada rama, su momento de administración y su dosis pertenecen al algoritmo completo de soporte vital avanzado y al protocolo del servicio, y se estudian en el Módulo 4. Esta lección no los enumera porque su indicación depende del alcance autorizado del prestador y del formulario de la unidad.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Ritmo desfibrilable', definicion: 'Fibrilación ventricular o taquicardia ventricular sin pulso: los ritmos de paro en que la descarga puede restaurar actividad organizada.' },
      { termino: 'Fibrilación ventricular', definicion: 'Despolarización ventricular desorganizada, con trazo ondulante irregular y sin complejos reconocibles.' },
      { termino: 'Taquicardia ventricular sin pulso', definicion: 'Complejos anchos, regulares y rápidos sin pulso palpable; su forma puede parecer organizada.' },
      { termino: 'Asistolia', definicion: 'Ausencia de actividad eléctrica organizada; se comprueba el equipo antes de aceptarla.' },
      { termino: 'Actividad eléctrica sin pulso', definicion: 'Situación en que hay actividad eléctrica organizada sin contracción eficaz; el manejo se dirige a la causa.' },
      { termino: 'Fibrilación fina', definicion: 'Fibrilación ventricular de ondas de escasa amplitud que puede confundirse con una línea plana.' },
    ],
    flashcards: [
      { frente: '¿Cuáles son los dos ritmos desfibrilables?', reverso: 'Fibrilación ventricular y taquicardia ventricular sin pulso.' },
      { frente: '¿Cuáles son los dos no desfibrilables?', reverso: 'Asistolia y actividad eléctrica sin pulso.' },
      { frente: '¿Qué convierte a una taquicardia ventricular en ritmo de paro?', reverso: 'La ausencia de pulso, no su forma en el trazo.' },
      { frente: '¿Qué se comprueba antes de aceptar una asistolia?', reverso: 'Adherencia de electrodos, conexión de cables, derivación, ganancia y ausencia de pulso en el paciente.' },
      { frente: '¿Por qué importa la fibrilación fina?', reverso: 'Porque con ganancia baja puede parecer una línea plana y hacer clasificar como no desfibrilable un ritmo que sí lo era.' },
      { frente: '¿Qué comparten ambas ramas del algoritmo?', reverso: 'Compresiones de alta calidad con interrupciones mínimas, ventilación adecuada, análisis en los momentos previstos y búsqueda de causas reversibles.' },
    ],
    quiz: [
      {
        pregunta: 'El trazo muestra complejos anchos, regulares y rápidos. Compruebas y no hay pulso. ¿Cómo lo clasificas?',
        opciones: [
          'No desfibrilable, por ser un ritmo organizado.',
          'Desfibrilable: es una taquicardia ventricular sin pulso.',
          'Actividad eléctrica sin pulso.',
          'Artefacto por movimiento.',
        ],
        correcta: 1,
        explicacion: 'La ausencia de pulso con ese trazo define la taquicardia ventricular sin pulso, que pertenece a la rama desfibrilable.',
      },
      {
        pregunta: 'Aparece una línea prácticamente plana. ¿Qué haces antes de aceptarla como asistolia?',
        opciones: [
          'Descargar por si acaso.',
          'Comprobar electrodos, cables, derivación y ganancia, y confirmar la ausencia de pulso.',
          'Cambiar de monitor.',
          'Repetir el análisis a los cinco minutos.',
        ],
        correcta: 1,
        explicacion: 'Una fibrilación de ondas finas puede parecer plana con la ganancia baja; la comprobación evita clasificar mal un ritmo desfibrilable.',
      },
      {
        pregunta: 'Trazo organizado de aspecto casi normal, paciente sin pulso. ¿Qué rama del algoritmo corresponde?',
        opciones: [
          'Desfibrilable, por haber actividad organizada.',
          'No desfibrilable: es actividad eléctrica sin pulso, y el esfuerzo va a la causa.',
          'Ninguna: se suspende la reanimación.',
          'Depende de la frecuencia del trazo.',
        ],
        correcta: 1,
        explicacion: 'La descarga no aporta nada cuando ya hay actividad organizada; el manejo se concentra en compresiones de calidad y en corregir la causa.',
      },
      {
        pregunta: '¿Por qué esta lección no enumera los fármacos de cada rama?',
        opciones: [
          'Porque no existen fármacos en el algoritmo.',
          'Porque su indicación depende del alcance autorizado y del formulario del servicio, y se estudian en el Módulo 4.',
          'Porque los fármacos sustituyen a la desfibrilación.',
          'Porque el monitor los administra automáticamente.',
        ],
        correcta: 1,
        explicacion: 'El reconocimiento operativo del ritmo es el objetivo de este tema; la farmacología del algoritmo pertenece a otro módulo y al protocolo del servicio.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La clasificación que cambia la conducta en el momento del paro es ___ o no desfibrilable.',
          opciones: ['organizado', 'desfibrilable', 'regular'],
          correcta: 1,
          explicacion: 'De esa clasificación salen las dos ramas del algoritmo; el nombre exacto del ritmo importa menos en ese momento.',
        },
      ],
    },
    revision: ficha([
      'Limitado al reconocimiento operativo que pide el plan y a su relación con las dos ramas del '
        + 'algoritmo vigente. La clasificación fina de arritmias y su farmacología corresponden al '
        + 'Módulo 4.',
      'No se enumeran fármacos ni dosis: dependen del alcance autorizado y del formulario del servicio.',
    ]),
  },

  // ============================================================
  //  Código mega y práctica
  // ============================================================
  'm3-md-codigo-mega': {
    icono: 'ic-rcp',
    duracion: '20 min',
    resumen: 'La estación en que todo lo del módulo se ejecuta junto y bajo presión: qué se integra, cómo '
      + 'se reparten las funciones del equipo y con qué criterios se evalúa el desempeño.',
    objetivos: [
      'Describir qué integra el escenario de código mega y qué no añade de nuevo.',
      'Asumir una función definida dentro de un equipo de reanimación.',
      'Aplicar la comunicación de circuito cerrado durante la ejecución.',
      'Reconocer los criterios con los que se evalúa el desempeño y los errores críticos.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué no es',
        bloques: [
          { tipo: 'p', texto: 'El código mega es una estación de integración: un escenario simulado en el que el alumno ejecuta, de forma continua y con el reloj corriendo, lo que ya estudió por separado a lo largo del módulo. No introduce conocimiento nuevo y no es una lección adicional; es el lugar donde se comprueba si lo aprendido se sostiene cuando hay que hacerlo todo a la vez.' },
          {
            tipo: 'lista',
            titulo: 'Qué integra, y dónde se estudió cada pieza',
            items: [
              'Valoración de la escena y evaluación primaria: unidad de evaluación primaria.',
              'Apertura y manejo de la vía aérea con el dispositivo autorizado: unidad de manejo de vía aérea.',
              'Ventilación eficaz y oxigenoterapia: unidad de manejo de vía aérea.',
              'Compresiones de alta calidad con interrupciones mínimas: Módulo 1 y este módulo.',
              'Uso del monitor desfibrilador y clasificación del ritmo: esta misma unidad.',
              'Acceso vascular cuando esté indicado y autorizado: unidad de vía intravenosa.',
              'Registro de tiempos, intervenciones y respuesta: transversal a todo el módulo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No es una autorización', texto: 'Superar la estación acredita desempeño en un escenario simulado. No amplía el alcance profesional del alumno, no autoriza procedimientos que su nivel no contemple y no sustituye la certificación ni la dirección médica que cada acto invasivo requiere.' },
        ],
      },
      {
        titulo: 'El equipo y sus funciones',
        bloques: [
          { tipo: 'p', texto: 'Una reanimación la ejecuta un equipo, y la mayoría de los fallos observados en las estaciones no son fallos de técnica sino de coordinación: dos personas haciendo lo mismo, nadie llevando el tiempo, órdenes que nadie confirmó. Repartir funciones en voz alta antes de empezar es la medida que más rendimiento aporta.' },
          {
            tipo: 'tabla',
            titulo: 'Funciones habituales del equipo',
            headers: ['Función', 'De qué responde'],
            filas: [
              ['Liderazgo', 'Dirige, asigna funciones, mantiene la visión global y toma las decisiones'],
              ['Compresiones', 'Ejecuta compresiones de calidad y se releva en los momentos previstos'],
              ['Vía aérea y ventilación', 'Mantiene la permeabilidad y la ventilación eficaz'],
              ['Monitor y desfibrilación', 'Coloca parches, opera el equipo y comunica el ritmo'],
              ['Acceso y medicación', 'Obtiene el acceso y prepara lo que el protocolo autorice'],
              ['Registro y tiempos', 'Anota horas e intervenciones y avisa de los ciclos'],
            ],
          },
          { tipo: 'p', texto: 'El número de funciones cubiertas depende del personal disponible: con dos reanimadores una persona asume varias, y eso también forma parte de lo que se evalúa. Lo que no puede ocurrir es que una función quede sin dueño sin que nadie lo advierta.' },
        ],
      },
      {
        titulo: 'Comunicación de circuito cerrado',
        bloques: [
          { tipo: 'p', texto: 'Una instrucción solo está dada cuando alguien la ha recibido, la ha confirmado y ha avisado de que la completó. Ese ciclo de tres pasos es lo que se llama comunicación de circuito cerrado, y es la diferencia entre un equipo y varias personas trabajando cerca.' },
          {
            tipo: 'pasos',
            titulo: 'El ciclo',
            items: [
              'Quien dirige se dirige a una persona concreta por su nombre o su función, no al aire.',
              'Da una instrucción clara, unívoca y completa.',
              'Quien la recibe la repite en voz alta para confirmar que la entendió.',
              'La ejecuta.',
              'Avisa en voz alta de que la completó, y del resultado si lo hubo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La instrucción al aire no existe', texto: 'Decir «que alguien tome el monitor» reparte la responsabilidad entre todos, que es lo mismo que no repartirla. Nombrar a la persona y esperar su confirmación cuesta dos segundos y elimina la duplicación y el olvido.' },
        ],
      },
      {
        titulo: 'Cómo se evalúa la estación',
        bloques: [
          { tipo: 'p', texto: 'La estación se observa con lista de cotejo. Los puntos siguientes son los que el desempeño debe demostrar; los marcados como críticos son los que, por sí solos, comprometen el resultado.' },
          {
            tipo: 'tabla',
            titulo: 'Lista de cotejo del desempeño',
            headers: ['Punto observado', 'Carácter'],
            filas: [
              ['Verifica la seguridad de la escena y usa protección personal', 'Crítico'],
              ['Comprueba respuesta y respiración en un tiempo acotado', 'Crítico'],
              ['Activa el recurso y solicita el equipo sin demora', 'Crítico'],
              ['Inicia compresiones de calidad con interrupciones mínimas', 'Crítico'],
              ['Coloca el monitor y clasifica el ritmo correctamente', 'Crítico'],
              ['Comprueba visualmente la seguridad antes de cada descarga', 'Crítico'],
              ['Reanuda las compresiones inmediatamente tras la descarga', 'Crítico'],
              ['Mantiene ventilación eficaz con el dispositivo autorizado', 'Observado'],
              ['Reparte funciones y usa comunicación de circuito cerrado', 'Observado'],
              ['Se releva en los momentos previstos sin pausas largas', 'Observado'],
              ['Busca causas reversibles de forma sistemática', 'Observado'],
              ['Registra tiempos, intervenciones y respuesta', 'Observado'],
              ['Entrega el caso con un informe estructurado', 'Observado'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Errores críticos',
            items: [
              'Iniciar sin comprobar la seguridad de la escena o sin protección personal.',
              'Retrasar el inicio de las compresiones.',
              'Descargar sin comprobar visualmente que nadie toca al paciente.',
              'Clasificar mal el ritmo y aplicar la rama equivocada del algoritmo.',
              'Mantener pausas prolongadas alrededor del análisis o de la descarga.',
              'Ejecutar o simular un procedimiento fuera del alcance autorizado del alumno.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que la academia debe fijar', texto: 'La calificación mínima de aprobación, el número de intentos, el tiempo asignado a la estación y el escenario concreto son decisiones académicas que el plan de estudios no define. Esta lección enumera qué se observa; cuánto se exige lo declara la academia.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Código mega', definicion: 'Estación de integración en la que se ejecuta bajo simulación todo lo estudiado en el módulo, sin introducir contenido nuevo.' },
      { termino: 'Comunicación de circuito cerrado', definicion: 'Ciclo de instrucción dirigida, confirmación en voz alta, ejecución y aviso de haberla completado.' },
      { termino: 'Función sin dueño', definicion: 'Tarea que nadie ha asumido explícitamente; origen frecuente de duplicaciones y omisiones en el equipo.' },
      { termino: 'Error crítico', definicion: 'Fallo que por sí solo compromete el resultado de la estación, con independencia del resto del desempeño.' },
    ],
    flashcards: [
      { frente: '¿Qué aporta el código mega que no aportan las lecciones previas?', reverso: 'La ejecución conjunta y bajo tiempo de lo ya estudiado; no añade conocimiento nuevo.' },
      { frente: '¿Superar la estación amplía el alcance profesional?', reverso: 'No: acredita desempeño simulado y no sustituye certificación ni dirección médica.' },
      { frente: 'Enumera los pasos de la comunicación de circuito cerrado.', reverso: 'Instrucción dirigida a una persona, confirmación repitiéndola, ejecución y aviso de haberla completado.' },
      { frente: '¿Por qué no sirve decir «que alguien tome el monitor»?', reverso: 'Porque reparte la responsabilidad entre todos, que equivale a no repartirla.' },
      { frente: 'Nombra tres errores críticos de la estación.', reverso: 'Iniciar sin comprobar la escena, retrasar las compresiones y descargar sin comprobación visual de seguridad.' },
      { frente: '¿Quién fija la calificación mínima de la estación?', reverso: 'La academia: el plan de estudios no la define.' },
    ],
    quiz: [
      {
        pregunta: 'Durante la estación, quien dirige dice «que alguien ponga el monitor». Nadie lo hace. ¿Cuál fue el fallo?',
        opciones: [
          'Falta de material.',
          'La instrucción no se dirigió a una persona concreta ni se confirmó.',
          'El monitor no estaba encendido.',
          'La función de monitor no existe en el equipo.',
        ],
        correcta: 1,
        explicacion: 'Una instrucción al aire reparte la responsabilidad entre todos; el circuito cerrado exige nombrar a la persona y esperar su confirmación.',
      },
      {
        pregunta: 'Un alumno ejecuta impecablemente todo el escenario, pero pulsa la descarga sin recorrer visualmente al paciente. ¿Cómo se evalúa?',
        opciones: [
          'Aprueba: el resto del desempeño fue correcto.',
          'Es un error crítico y compromete el resultado por sí solo.',
          'Se descuenta un punto observado.',
          'Depende del tiempo total empleado.',
        ],
        correcta: 1,
        explicacion: 'La comprobación visual de seguridad antes de la descarga está clasificada como crítica precisamente porque su omisión puede lesionar a un reanimador.',
      },
      {
        pregunta: 'Un alumno supera el código mega. ¿Qué queda acreditado?',
        opciones: [
          'Que puede realizar cualquier procedimiento del escenario en servicio real.',
          'Su desempeño en un escenario simulado, sin ampliar su alcance profesional.',
          'Su certificación como operador del monitor.',
          'La autorización de la dirección médica.',
        ],
        correcta: 1,
        explicacion: 'La estación evalúa desempeño simulado; el alcance profesional lo definen la certificación, el tipo de unidad y la dirección médica.',
      },
      {
        pregunta: 'El equipo cuenta solo con dos reanimadores. ¿Qué se espera?',
        opciones: [
          'Que se suspenda la estación por falta de personal.',
          'Que una persona asuma varias funciones sin que ninguna quede sin dueño.',
          'Que se omitan las funciones de registro y monitor.',
          'Que se repartan las funciones al azar.',
        ],
        correcta: 1,
        explicacion: 'El número de funciones cubiertas depende del personal; lo que se evalúa es que ninguna quede sin dueño sin que nadie lo advierta.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el ciclo de comunicación de circuito cerrado',
        pasos: [
          'Dirigirse a una persona por su nombre o función',
          'Dar una instrucción clara y completa',
          'Repetirla en voz alta para confirmar',
          'Ejecutarla',
          'Avisar de que se completó y del resultado',
        ],
      },
    },
    revision: ficha([
      'Estructurado como integración y práctica evaluable, con lista de cotejo y errores críticos; '
        + 'no repite contenido de las lecciones previas ni autoriza actos clínicos.',
      'DECISIÓN PENDIENTE: la academia debe fijar la calificación mínima, el número de intentos, el '
        + 'tiempo de la estación y el escenario concreto. El plan de estudios no los define y esta '
        + 'lección no los inventa.',
    ]),
  },
}
