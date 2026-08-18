// ============================================================
//  MÓDULO 1: PROPEDÉUTICO (PRIMEROS AUXILIOS BASICOS E INTERMEDIOS)
// ------------------------------------------------------------
//  Material de los 21 temas del módulo. La ESTRUCTURA (títulos, orden) vive en
//  scripts/seed/plan-rescate.json; aquí solo el contenido.
//
//  Nivel: es el módulo de entrada, antes de anatomía. El alumno todavía no ha
//  visto fisiología, así que se explica el QUÉ y el CÓMO con el porqué
//  justo — el porqué profundo llega en los módulos 2 y 3.
//
//  Cifras: AHA 2025 (RCP/DEA/OVACE) y PHTLS 9. El plan declara «ACLS 2020» en
//  su bibliografía, pero la AHA publicó en 2025 una revisión de las guías de
//  RCP y ACE: se usa la vigente y se señala aquí para que la academia actualice
//  su bibliografía. Marco legal mexicano: NOM-034-SSA3-2013 (atención médica
//  prehospitalaria), de observancia obligatoria.
//
//  Donde algo depende del protocolo local, del servicio o de la entidad
//  federativa, se dice en el texto en vez de fijar un número que parezca
//  universal.
// ============================================================

// ---------- fuentes de la unidad ----------
//
// Asignación tomada de docs/REGISTRO-FUENTES-ACADEMICAS.json para la unidad
// `m1-primeros-auxilios-basicos`: primarias AHA/Cruz Roja 2024 (primeros
// auxilios) y AHA 2025 (soporte vital básico del adulto); apoyo OMS BEC y
// PHTLS 9.ª ed.
//
// La distinción importa y por eso se cita por separado: lo que hace un
// reanimador lego ante una hemorragia o una quemadura lo gobierna la guía de
// PRIMEROS AUXILIOS; lo que se hace ante un paro lo gobierna la de SOPORTE
// VITAL. Antes este archivo no declaraba ninguna de las dos.

const AHA_PRIMEROS_AUXILIOS = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid. '
    + 'Circulation, 2024. DOI 10.1161/CIR.0000000000001281.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Primera actualización completa de las recomendaciones de primeros auxilios desde 2010. '
    + 'Respalda la conducta de este módulo en hemorragia, heridas, quemaduras y lesiones '
    + 'ambientales en el nivel de primer respondiente.',
}
const AHA_BLS_2025 = {
  nombre: 'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Parámetros de compresión, secuencia de RCP, uso del DEA y conducta ante la ausencia de '
    + 'respuesta en el adulto.',
}
const OMS_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de atención inicial; marco de evaluación y de conducta en el primer '
    + 'contacto con el paciente agudo.',
}
const PHTLS_9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición nombrada por el plan de estudios. Evaluación y manejo inicial del traumatizado. '
    + 'Capítulo y página PENDIENTES: solo puede precisarlos quien consulte la copia licenciada de '
    + 'la academia.',
}
const NOM_034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención médica prehospitalaria de '
    + 'las urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Marco mexicano del servicio: personal, equipamiento y condiciones por tipo de ambulancia. '
    + 'No es un vademécum ni fija dosis.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const FUENTES_PRIMEROS_AUXILIOS = F([AHA_PRIMEROS_AUXILIOS, OMS_BEC])
const FUENTES_SOPORTE_VITAL = F([AHA_BLS_2025, AHA_PRIMEROS_AUXILIOS])
const FUENTES_TRAUMA_BASICO = F([AHA_PRIMEROS_AUXILIOS, PHTLS_9])
const FUENTES_ORGANIZACION = F([OMS_BEC, NOM_034, AHA_PRIMEROS_AUXILIOS])

export default {
  // ---------- 1. PRIMEROS AUXILIOS BÁSICOS ----------
  'm1-pab-introduccion': {
    icono: '🚑',
    duracion: '12 min',
    resumen: 'Qué son los primeros auxilios, hasta dónde llegan y por qué el primer respondiente cambia el pronóstico de una emergencia.',
    objetivos: [
      'Definir primeros auxilios y delimitar su alcance.',
      'Identificar los objetivos de la atención inicial en orden de prioridad.',
      'Reconocer los eslabones de la cadena de supervivencia.',
    ],
    secciones: [
      {
        titulo: '¿Qué son los primeros auxilios?',
        bloques: [
          { tipo: 'p', texto: 'Son los cuidados inmediatos, limitados y temporales que se prestan a una persona enferma o lesionada antes de que llegue la atención profesional. Tres palabras cargan todo el peso: inmediatos (empiezan donde ocurre el hecho), limitados (hasta donde llega la formación de quien atiende) y temporales (no sustituyen la atención médica, la anticipan).' },
          { tipo: 'p', texto: 'La diferencia entre primeros auxilios y atención prehospitalaria no es de intención sino de capacidad: el primer respondiente hace lo que puede con lo que tiene; el TUM llega con formación, equipo y un sistema detrás.' },
          {
            tipo: 'lista',
            titulo: 'Objetivos, en este orden',
            items: [
              'Conservar la vida — lo que mata en minutos se atiende primero.',
              'Evitar que las lesiones empeoren — no causar daño adicional.',
              'Aliviar el dolor y el sufrimiento, incluido el emocional.',
              'Facilitar el traslado y la continuidad de la atención.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El orden no es decorativo', texto: 'Si el orden se invierte se pierde tiempo en lo cómodo en lugar de lo urgente. Una fractura evidente y aparatosa atrae la mirada; una vía aérea comprometida, no. La primera espera; la segunda, no.' },
        ],
      },
      {
        titulo: 'La cadena de supervivencia',
        bloques: [
          { tipo: 'p', texto: 'La supervivencia en una emergencia grave no depende de un solo acto heroico, sino de una secuencia de eslabones que solo funciona completa. Si un eslabón falla, los demás pierden eficacia.' },
          {
            tipo: 'pasos',
            titulo: 'Eslabones en el paro cardiaco extrahospitalario',
            items: [
              'Reconocimiento inmediato y activación del SMU.',
              'RCP precoz con énfasis en las compresiones.',
              'Desfibrilación rápida.',
              'Soporte vital avanzado y cuidados posparo.',
              'Recuperación y rehabilitación.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dónde se pierde la cadena', texto: 'Los dos primeros eslabones dependen de un lego, no de un profesional. Por eso la formación de la población cambia estadísticas de supervivencia más que casi cualquier tecnología a bordo de la ambulancia.' },
        ],
      },
      {
        titulo: 'Seguridad antes que heroísmo',
        bloques: [
          { tipo: 'p', texto: 'Un respondiente lesionado convierte a una víctima en dos y resta un par de manos. La evaluación de la escena precede siempre al contacto con el paciente.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Regla que no se negocia', texto: 'Si la escena no es segura, no se entra. Se asegura primero o se espera al recurso que pueda asegurarla. Ninguna víctima justifica un rescatador muerto.' },
        ],
      },
      FUENTES_ORGANIZACION,
    ],
    conceptosClave: [
      { termino: 'Primer respondiente', definicion: 'Persona que, con o sin formación sanitaria, presta la atención inicial en el lugar del hecho antes de la llegada del SMU.' },
      { termino: 'Cadena de supervivencia', definicion: 'Secuencia de acciones eslabonadas que, aplicadas en orden y sin demora, elevan la probabilidad de sobrevivir a un paro cardiaco.' },
      { termino: 'Alcance de la práctica', definicion: 'Conjunto de acciones que una persona está autorizada y capacitada para realizar según su nivel de formación y la normativa vigente.' },
    ],
    flashcards: [
      { frente: '¿Cuáles son los tres rasgos que definen los primeros auxilios?', reverso: 'Inmediatos, limitados y temporales.' },
      { frente: 'Primer objetivo de los primeros auxilios', reverso: 'Conservar la vida: atender primero lo que mata en minutos.' },
      { frente: '¿Qué se evalúa antes de tocar al paciente?', reverso: 'La seguridad de la escena.' },
      { frente: '¿Qué dos eslabones de la cadena de supervivencia dependen de un lego?', reverso: 'El reconocimiento con activación del SMU y la RCP precoz.' },
    ],
    quiz: [
      {
        pregunta: 'Llegas primero a un choque. Hay derrame de combustible y una persona atrapada que pide ayuda. ¿Qué haces?',
        opciones: [
          'Entras de inmediato: el tiempo es vida.',
          'Aseguras la escena o esperas al recurso que pueda hacerlo, y mientras activas el SMU.',
          'Sacas a la persona arrastrándola lo más rápido posible.',
          'Buscas un extintor y entras mientras alguien lo sostiene.',
        ],
        correcta: 1,
        explicacion: 'La seguridad de la escena precede al contacto con el paciente. Con combustible derramado el riesgo de incendio convierte al rescatador en la segunda víctima; activar el SMU es lo útil que sí puedes hacer de inmediato.',
      },
      {
        pregunta: 'Los primeros auxilios se describen como "temporales" porque:',
        opciones: [
          'Solo pueden aplicarse durante unos minutos.',
          'Caducan si el paciente no mejora.',
          'No sustituyen la atención médica: la anticipan y la preparan.',
          'Solo son válidos hasta que llega otro lego con más formación.',
        ],
        correcta: 2,
        explicacion: 'Temporal significa que su función es sostener al paciente hasta la atención definitiva, no reemplazarla.',
      },
      {
        pregunta: 'Ante un paciente con una fractura abierta de antebrazo muy llamativa y respiración ruidosa y dificultosa, ¿qué atiendes primero?',
        opciones: [
          'La fractura: el sangrado visible es la prioridad.',
          'La vía aérea y la respiración.',
          'Ambas a la vez para no perder tiempo.',
          'Inmovilizas el brazo y luego reevalúas.',
        ],
        correcta: 1,
        explicacion: 'Conservar la vida va primero. Un problema de vía aérea mata en minutos; una fractura, por aparatosa que se vea, espera.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena los eslabones de la cadena de supervivencia',
        pasos: [
          'Reconocer la emergencia y activar el SMU',
          'Iniciar RCP de alta calidad',
          'Desfibrilar lo antes posible',
          'Soporte vital avanzado y cuidados posparo',
          'Recuperación y rehabilitación',
        ],
      },
      completar: [
        {
          texto: 'Si la escena no es segura, ___ y se asegura primero o se espera al recurso adecuado.',
          opciones: ['se entra con precaución', 'no se entra', 'se entra de dos en dos'],
          correcta: 1,
          explicacion: 'No hay versión matizada de esta regla: un respondiente lesionado suma una víctima y resta ayuda.',
        },
      ],
    },
  },

  'm1-pab-avdi': {
    icono: '🧠',
    duracion: '12 min',
    resumen: 'AVDI: la valoración rápida del estado de conciencia y el momento exacto en que se activa el Sistema Médico de Urgencias.',
    objetivos: [
      'Aplicar la escala AVDI para clasificar el estado de conciencia.',
      'Reconocer qué nivel de AVDI implica riesgo de vía aérea.',
      'Activar el SMU comunicando la información útil y en orden.',
    ],
    secciones: [
      {
        titulo: 'Qué mide AVDI',
        bloques: [
          { tipo: 'p', texto: 'AVDI es una valoración de cuatro escalones que responde a una sola pregunta: ¿cuánto estímulo hace falta para que este paciente responda? Se aplica en segundos y se repite tantas veces como haga falta, porque su valor está en la tendencia.' },
          {
            tipo: 'tabla',
            titulo: 'Los cuatro niveles',
            headers: ['Nivel', 'Significa', 'Cómo se comprueba'],
            filas: [
              ['A — Alerta', 'Está despierto y responde espontáneamente', 'Habla, mira, se mueve sin que lo estimules'],
              ['V — Verbal', 'Responde solo cuando le hablas', 'Le llamas en voz alta y abre los ojos o contesta'],
              ['D — Dolor', 'Responde solo al estímulo doloroso', 'Presión firme en el trapecio o el lecho ungueal'],
              ['I — Inconsciente', 'No responde a nada', 'Ningún estímulo obtiene respuesta'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La letra sola no vale', texto: 'Un paciente "en V" que hace diez minutos estaba "en A" es una urgencia mayor que uno que lleva media hora en V. Lo que informa es el cambio, no la foto.' },
        ],
      },
      {
        titulo: 'AVDI y la vía aérea',
        bloques: [
          { tipo: 'p', texto: 'La utilidad práctica de AVDI es que predice quién no puede proteger su propia vía aérea. Quien solo responde al dolor o no responde ha perdido, total o parcialmente, los reflejos que impiden que la lengua obstruya o que el contenido gástrico pase a la vía respiratoria.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Umbral de alarma', texto: 'A partir de D (responde solo al dolor) hay que asumir que la vía aérea está en riesgo: preparar aspiración, posición y apoyo ventilatorio.' },
        ],
      },
      {
        titulo: 'El descenso de nivel es un signo temprano',
        bloques: [
          { tipo: 'p', texto: 'Un paciente que baja de escalón —de Alerta a Verbal, de Verbal a Dolor— se está deteriorando, y ese descenso suele aparecer antes que cualquier otro signo medible. Es de los pocos hallazgos que un primer respondiente puede detectar sin equipo alguno, y por eso AVDI se reevalúa de forma periódica y no una sola vez.' },
          {
            tipo: 'pasos',
            titulo: 'Qué hacer ante un descenso de nivel',
            items: [
              'Reevaluar de inmediato la vía aérea, la ventilación y la perfusión.',
              'Buscar causas corregibles al alcance del primer respondiente, como una vía aérea comprometida por la posición.',
              'Avisar al recurso que viene en camino o al equipo receptor: el dato cambia su preparación.',
              'Anotar la hora de cada valoración, porque sin hora no hay tendencia.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Comunicar el cambio, no solo el estado', texto: 'Decir «está en Verbal» informa menos que decir «llegó Alerta y en cinco minutos pasó a Verbal». Lo primero describe; lo segundo anticipa.' },
        ],
      },
      {
        titulo: 'Activación del SMU',
        bloques: [
          { tipo: 'p', texto: 'Activar el SMU es pedir el recurso correcto al sitio correcto con la información correcta. Una llamada bien hecha ahorra minutos que ningún tratamiento posterior recupera.' },
          {
            tipo: 'pasos',
            titulo: 'Qué decir, en este orden',
            items: [
              'Ubicación exacta: calle, número, referencias, punto de acceso.',
              'Qué ocurrió y cuántas personas están afectadas.',
              'Estado aparente: consciente o no, respira o no, sangrado evidente.',
              'Riesgos en la escena: fuego, combustible, electricidad, tránsito.',
              'Tu nombre y un número de contacto.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'No cuelgues primero', texto: 'El operador puede guiarte mientras llega la unidad —RCP telefónica incluida— y necesita poder volver a llamarte si no encuentra el acceso.' },
        ],
      },
      FUENTES_SOPORTE_VITAL,
    ],
    conceptosClave: [
      { termino: 'AVDI', definicion: 'Escala rápida de conciencia en cuatro niveles: Alerta, respuesta Verbal, respuesta al Dolor e Inconsciente.' },
      { termino: 'Estímulo doloroso central', definicion: 'Estímulo aplicado en tronco o cuello (presión en trapecio) que valora respuesta cerebral, no solo reflejo medular.' },
      { termino: 'Activación del SMU', definicion: 'Llamada al número de emergencias que pone en marcha el recurso prehospitalario, con la información mínima para localizar y dimensionar el incidente.' },
    ],
    flashcards: [
      { frente: '¿Qué significan las letras de AVDI?', reverso: 'Alerta, Verbal, Dolor, Inconsciente.' },
      { frente: '¿A partir de qué nivel de AVDI se asume vía aérea en riesgo?', reverso: 'A partir de D: responde solo al dolor.' },
      { frente: '¿Qué dato se da primero al activar el SMU?', reverso: 'La ubicación exacta, con referencias y punto de acceso.' },
      { frente: '¿Por qué AVDI se repite?', reverso: 'Porque lo que informa es la tendencia: pasar de A a V es deterioro.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente abre los ojos únicamente cuando le gritas su nombre. ¿Cómo lo clasificas?',
        opciones: ['A — Alerta', 'V — Verbal', 'D — Dolor', 'I — Inconsciente'],
        correcta: 1,
        explicacion: 'Responde a estímulo verbal, no de forma espontánea: es V.',
      },
      {
        pregunta: '¿Cuál es la implicación práctica más importante de que un paciente esté en "D" o en "I"?',
        opciones: [
          'Que necesita oxígeno a alto flujo de inmediato.',
          'Que probablemente no puede proteger su vía aérea.',
          'Que hay que trasladarlo en posición de recuperación siempre.',
          'Que tiene traumatismo craneoencefálico.',
        ],
        correcta: 1,
        explicacion: 'La pérdida de reflejos protectores es lo que convierte a AVDI en una herramienta de vía aérea, no solo de neurología.',
      },
      {
        pregunta: 'Estás solo con un adulto que no responde y no respira normalmente. ¿Qué haces primero?',
        opciones: [
          'Inicias RCP y activas el SMU cuando llegue alguien.',
          'Activas el SMU (o pides a alguien que lo haga) y consigues un DEA, luego inicias RCP.',
          'Buscas pulso durante un minuto completo.',
          'Lo colocas en posición de recuperación y llamas.',
        ],
        correcta: 1,
        explicacion: 'En el adulto con paro presenciado el ritmo suele ser desfibrilable: activar el SMU y conseguir el DEA cuanto antes es lo que más cambia el pronóstico.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Al llegar, el paciente conversa contigo. Cinco minutos después solo responde si le hablas fuerte. ¿Qué significa?',
          opciones: [
            'Está mejorando porque sigue respondiendo.',
            'Pasó de A a V: está deteriorándose y hay que reevaluar y avisar.',
            'Es normal por el estrés de la situación.',
            'Hay que esperar otros cinco minutos para confirmar.',
          ],
          correcta: 1,
          explicacion: 'La tendencia descendente en AVDI es un signo de alarma temprano y debe comunicarse al SMU.',
        },
      ],
    },
  },

  'm1-pab-rcp-legos-adulto': {
    icono: '❤️',
    duracion: '18 min',
    resumen: 'RCP de alta calidad en el adulto para un reanimador lego: cómo se reconoce el paro, cómo se comprime y por qué la calidad importa más que la técnica elegante.',
    objetivos: [
      'Reconocer un paro cardiaco en menos de diez segundos.',
      'Ejecutar compresiones con profundidad, frecuencia y reexpansión correctas.',
      'Minimizar las interrupciones durante la reanimación.',
    ],
    secciones: [
      {
        titulo: 'Reconocer el paro',
        bloques: [
          { tipo: 'p', texto: 'El paro cardiaco se reconoce con dos hallazgos: la persona no responde y no respira o solo boquea. La respiración agónica —bocanadas aisladas, ruidosas, irregulares— NO es respiración: es un signo de paro y confunde a quien no la conoce.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Diez segundos, no más', texto: 'La comprobación no debe superar los 10 segundos. Ante la duda, se asume paro y se comprime: el daño de comprimir a quien no lo necesitaba es mucho menor que el de no comprimir a quien sí.' },
        ],
      },
      {
        titulo: 'Compresiones de alta calidad',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Parámetros en el adulto (AHA 2025)',
            headers: ['Parámetro', 'Objetivo'],
            filas: [
              ['Frecuencia', '100–120 compresiones por minuto'],
              ['Profundidad', 'Al menos 5 cm, sin superar 6 cm'],
              ['Reexpansión', 'Completa entre compresiones: no apoyarse en el tórax'],
              ['Interrupciones', 'Menores de 10 segundos'],
              ['Punto de compresión', 'Mitad inferior del esternón'],
            ],
          },
          { tipo: 'p', texto: 'La reexpansión completa es el parámetro que más se descuida. Si el reanimador se queda apoyado sobre el tórax, el corazón no vuelve a llenarse y la siguiente compresión mueve mucha menos sangre, por perfecta que sea la profundidad.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Solo con las manos', texto: 'Un reanimador lego sin entrenamiento en ventilación debe hacer RCP únicamente con compresiones, continuas y sin pausas. Es preferible a una RCP interrumpida por intentos de ventilación mal ejecutados.' },
        ],
      },
      {
        titulo: 'Fatiga y relevos',
        bloques: [
          { tipo: 'p', texto: 'La calidad de las compresiones cae de forma medible al cabo de uno o dos minutos, mucho antes de que el reanimador se sienta cansado. Por eso el relevo se hace por reloj, no por sensación.' },
          {
            tipo: 'pasos',
            titulo: 'Relevo eficiente',
            items: [
              'Cambiar de reanimador cada 2 minutos aproximadamente.',
              'Anunciar el cambio antes de que ocurra.',
              'Colocarse en posición mientras el otro sigue comprimiendo.',
              'Realizar el cambio en menos de 5 segundos.',
            ],
          },
        ],
      },
      FUENTES_SOPORTE_VITAL,
    ],
    conceptosClave: [
      { termino: 'Respiración agónica', definicion: 'Bocanadas irregulares y ruidosas que aparecen en los primeros minutos del paro; no es ventilación eficaz y no debe interpretarse como respiración normal.' },
      { termino: 'Fracción de compresión torácica', definicion: 'Proporción del tiempo de reanimación en que efectivamente se comprime; cuanto mayor, mejor el pronóstico.' },
      { termino: 'RCP solo con las manos', definicion: 'Reanimación con compresiones continuas y sin ventilaciones, recomendada para el reanimador lego no entrenado en ventilación.' },
    ],
    flashcards: [
      { frente: 'Frecuencia de compresión en el adulto', reverso: '100–120 por minuto.' },
      { frente: 'Profundidad de compresión en el adulto', reverso: 'Al menos 5 cm, sin pasar de 6 cm.' },
      { frente: '¿Qué es la respiración agónica?', reverso: 'Bocanadas irregulares propias del paro; NO es respiración eficaz.' },
      { frente: '¿Cada cuánto se releva al reanimador?', reverso: 'Cada 2 minutos aproximadamente, en menos de 5 segundos.' },
      { frente: '¿Cuánto puede durar la comprobación de si hay paro?', reverso: 'Un máximo de 10 segundos.' },
    ],
    quiz: [
      {
        pregunta: 'Un hombre se desploma. No responde y emite bocanadas ruidosas cada varios segundos. ¿Qué haces?',
        opciones: [
          'Esperas: está respirando.',
          'Lo pones en posición de recuperación.',
          'Asumes paro cardiaco, activas el SMU e inicias compresiones.',
          'Buscas pulso carotídeo durante 30 segundos.',
        ],
        correcta: 2,
        explicacion: 'La respiración agónica es un signo de paro, no de respiración. Interpretarla mal es una de las causas más frecuentes de retraso en iniciar la RCP.',
      },
      {
        pregunta: '¿Cuál de estos errores reduce más la sangre que se mueve con cada compresión?',
        opciones: [
          'Comprimir a 118 por minuto en lugar de a 110.',
          'Quedarse apoyado sobre el tórax e impedir la reexpansión completa.',
          'Comprimir 5,5 cm en lugar de 5 cm.',
          'Cambiar de reanimador cada 2 minutos.',
        ],
        correcta: 1,
        explicacion: 'Sin reexpansión completa el corazón no se llena, y una compresión sobre un ventrículo vacío expulsa poco volumen aunque tenga la profundidad correcta.',
      },
      {
        pregunta: 'Eres un lego sin entrenamiento en ventilación y estás solo ante un adulto en paro. Lo correcto es:',
        opciones: [
          'Alternar 30 compresiones y 2 ventilaciones aunque no sepas ventilar.',
          'Hacer solo compresiones, continuas y sin pausas.',
          'No intervenir hasta que llegue personal capacitado.',
          'Dar únicamente ventilaciones.',
        ],
        correcta: 1,
        explicacion: 'La RCP solo con las manos mantiene la fracción de compresión alta y evita pausas largas por intentos de ventilación ineficaces.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia del reanimador lego ante un adulto que se desploma',
        pasos: [
          'Comprobar que la escena es segura',
          'Comprobar respuesta y respiración (máximo 10 segundos)',
          'Activar el SMU y pedir un DEA',
          'Iniciar compresiones de alta calidad',
          'Usar el DEA en cuanto esté disponible',
        ],
      },
      completar: [
        {
          texto: 'En el adulto se comprime a una frecuencia de ___ por minuto.',
          opciones: ['60–80', '80–100', '100–120', '120–140'],
          correcta: 2,
          explicacion: 'Por debajo de 100 el gasto es insuficiente; por encima de 120 no da tiempo a que el corazón se llene.',
        },
      ],
    },
  },

  'm1-pab-dea': {
    icono: '⚡',
    duracion: '14 min',
    resumen: 'El desfibrilador externo automático: qué hace, cuándo se usa y por qué cada minuto de retraso cuesta supervivencia.',
    objetivos: [
      'Operar un DEA siguiendo su secuencia estándar.',
      'Colocar los parches correctamente en adulto y en situaciones especiales.',
      'Integrar el DEA en la RCP sin generar pausas innecesarias.',
    ],
    secciones: [
      {
        titulo: 'Qué hace y qué no hace un DEA',
        bloques: [
          { tipo: 'p', texto: 'El DEA analiza el ritmo cardiaco y decide si una descarga puede ayudar. No "arranca" un corazón parado: lo que hace es detener una actividad eléctrica caótica —fibrilación ventricular o taquicardia ventricular sin pulso— para que el marcapasos natural pueda retomar el control.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por eso la asistolia no se desfibrila', texto: 'Si no hay actividad eléctrica que reorganizar, no hay nada que la descarga pueda corregir. El DEA lo detecta y dirá "descarga no indicada": la conducta entonces es reanudar de inmediato las compresiones, que son lo que mantiene la perfusión mientras se buscan y corrigen las causas.' },
          { tipo: 'p', texto: 'La probabilidad de éxito cae de forma sostenida con cada minuto que pasa desde el colapso. Esa caída es la razón de que el DEA se busque al mismo tiempo que se activa el SMU y no después.' },
        ],
      },
      {
        titulo: 'Secuencia de uso',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Cinco pasos',
            items: [
              'Encender el equipo y seguir sus instrucciones de voz.',
              'Descubrir el tórax, secarlo si está mojado y colocar los parches.',
              'Apartarse durante el análisis: nadie toca al paciente.',
              'Si indica descarga, verificar visualmente que nadie toca y pulsar.',
              'Reanudar compresiones de inmediato, sin comprobar pulso.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Reanudar sin pausa', texto: 'Tras la descarga se vuelve a comprimir en el acto. Buscar pulso justo después es una pausa larga y poco informativa: el corazón rara vez recupera circulación eficaz en ese instante.' },
        ],
      },
      {
        titulo: 'Colocación y situaciones especiales',
        bloques: [
          { tipo: 'p', texto: 'Hay dos posiciones aceptadas. La anterolateral —un parche bajo la clavícula derecha y el otro en la línea axilar media izquierda— es la más usada. La anteroposterior —uno en el pecho y otro en la espalda— es igual de válida. Lo que importa es que la corriente atraviese el corazón.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Actualización 2025', texto: 'Las guías de la AHA de 2025 equiparan explícitamente ambas posiciones y precisan que en el adulto los electrodos deben superar los 8 cm de diámetro. También dejan de hablar de «ventilaciones de rescate»: ahora se dice simplemente «ventilaciones».' },
          {
            tipo: 'lista',
            titulo: 'Qué hacer si…',
            items: [
              'Tórax mojado: secar antes de pegar los parches.',
              'Vello abundante: rasurar rápidamente la zona si el equipo lo trae, o arrancar el parche y usar uno nuevo.',
              'Parche de medicación en el tórax: retirarlo y limpiar la piel.',
              'Marcapasos o desfibrilador implantado: colocar el parche a un través de dedo de distancia del dispositivo.',
              'Paciente sobre superficie metálica o mojada: moverla o aislarla antes de descargar.',
            ],
          },
          { tipo: 'p', texto: 'La razón de retirar a la persona del agua y de secarle el tórax es doble: el agua dispersa la corriente por la superficie del cuerpo, de modo que llega menos al corazón, y pone en riesgo de descarga a cualquier reanimador que esté en contacto con ese charco. Retirarla del agua y secar el tórax es un paso previo obligado, no una recomendación de comodidad.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Antes de cada descarga', texto: 'Mirar de arriba abajo del paciente y decirlo en voz alta: "yo fuera, tú fuera, todos fuera". La comprobación es visual, no auditiva: no basta con avisar.' },
        ],
      },
      FUENTES_SOPORTE_VITAL,
    ],
    conceptosClave: [
      { termino: 'DEA', definicion: 'Desfibrilador externo automático: equipo que analiza el ritmo y administra, si procede, una descarga para revertir un ritmo desfibrilable.' },
      { termino: 'Ritmo desfibrilable', definicion: 'Fibrilación ventricular o taquicardia ventricular sin pulso: los dos ritmos en que la descarga puede restaurar una actividad organizada.' },
      { termino: 'Posición anterolateral', definicion: 'Colocación estándar de los parches: infraclavicular derecha y línea axilar media izquierda, de modo que la corriente atraviese el corazón.' },
    ],
    flashcards: [
      { frente: '¿Qué hace realmente la descarga del DEA?', reverso: 'Detiene la actividad eléctrica caótica para que el marcapasos natural retome el control.' },
      { frente: '¿Qué se hace inmediatamente después de una descarga?', reverso: 'Reanudar compresiones, sin comprobar pulso.' },
      { frente: '¿Dónde se colocan los parches en posición estándar?', reverso: 'Infraclavicular derecho y línea axilar media izquierda.' },
      { frente: 'Paciente con marcapasos implantado: ¿dónde va el parche?', reverso: 'A un través de dedo del dispositivo, sin colocarlo encima.' },
    ],
    quiz: [
      {
        pregunta: 'El DEA anuncia "descarga no indicada" en un paciente que no responde y no respira. ¿Qué haces?',
        opciones: [
          'Apagas el equipo: no hace falta.',
          'Reanudas compresiones de inmediato y dejas los parches puestos.',
          'Esperas dos minutos sin tocar al paciente para que reanalice.',
          'Repites el análisis hasta que indique descarga.',
        ],
        correcta: 1,
        explicacion: '"Descarga no indicada" no significa "no hay paro": significa que el ritmo no es desfibrilable. Las compresiones son las que mantienen la perfusión, y el DEA volverá a analizar solo.',
      },
      {
        pregunta: 'Encuentras a la víctima tumbada en un charco. Antes de descargar debes:',
        opciones: [
          'Descargar igual: el agua no conduce lo suficiente.',
          'Moverla a una superficie seca o aislarla, y secar el tórax.',
          'Bajar la energía del equipo.',
          'Colocar los parches en la espalda.',
        ],
        correcta: 1,
        explicacion: 'El agua dispersa la corriente y pone en riesgo a los reanimadores; secar el tórax y retirar al paciente del charco son pasos previos obligados.',
      },
      {
        pregunta: '¿Por qué se busca el DEA al mismo tiempo que se activa el SMU y no después?',
        opciones: [
          'Porque el protocolo exige hacerlo simultáneamente.',
          'Porque la probabilidad de éxito de la desfibrilación cae con cada minuto transcurrido.',
          'Porque el DEA sustituye a las compresiones.',
          'Porque el SMU no acude si no hay un DEA en el lugar.',
        ],
        correcta: 1,
        explicacion: 'La caída de la supervivencia por minuto de retraso es lo que convierte la desfibrilación temprana en un eslabón crítico de la cadena.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el uso del DEA',
        pasos: [
          'Encender el equipo',
          'Descubrir y secar el tórax',
          'Colocar los parches en posición anterolateral',
          'Apartarse durante el análisis del ritmo',
          'Comprobar visualmente que nadie toca y descargar si está indicado',
          'Reanudar compresiones inmediatamente',
        ],
      },
    },
  },

  'm1-pab-ovace-adultos': {
    icono: '🫁',
    duracion: '14 min',
    resumen: 'Obstrucción de la vía aérea por cuerpo extraño en el adulto: cómo distinguir la obstrucción leve de la grave y qué hacer en cada caso.',
    objetivos: [
      'Diferenciar obstrucción leve de obstrucción grave.',
      'Aplicar el ciclo de 5 golpes dorsales y 5 compresiones abdominales en el adulto consciente.',
      'Seleccionar compresiones torácicas cuando las abdominales no son aplicables.',
      'Reconocer el momento en que la OVACE se convierte en paro.',
    ],
    secciones: [
      {
        titulo: 'Leve o grave: la pregunta que decide todo',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cómo distinguirlas',
            headers: ['', 'Leve', 'Grave'],
            filas: [
              ['Tos', 'Eficaz, fuerte', 'Débil o ausente'],
              ['Habla', 'Puede hablar', 'No puede hablar ni emitir sonido'],
              ['Respiración', 'Entra aire, aunque con esfuerzo', 'No entra aire o hay estridor'],
              ['Qué hacer', 'Animar a toser. NO golpear la espalda.', 'Intervenir de inmediato'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El error clásico', texto: 'Golpear la espalda de alguien que tose con fuerza puede desplazar el objeto y convertir una obstrucción leve en una grave. Si tose eficazmente, la mejor maniobra es no interferir.' },
          { tipo: 'p', texto: 'El signo universal de atragantamiento —las manos rodeando el cuello— es útil, pero muchos pacientes no lo hacen. La pregunta directa "¿te estás ahogando?" resuelve la duda: quien no puede contestar tiene una obstrucción grave.' },
        ],
      },
      {
        titulo: 'Adulto consciente con obstrucción grave',
        bloques: [
          { tipo: 'p', texto: 'El algoritmo de la American Heart Association de 2025 para obstrucción por cuerpo extraño en el adulto combina dos maniobras en ciclos, no una sola repetida. Los golpes dorsales generan un aumento brusco de presión en la vía aérea que puede movilizar el objeto; las compresiones abdominales elevan el diafragma y producen una espiración forzada. Se alternan porque ninguna de las dos resuelve todos los casos.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia AHA 2025',
            items: [
              'Confirmar la obstrucción grave, avisar de que vas a ayudar y activar el sistema de emergencias.',
              'Colocarse a un lado y ligeramente detrás; inclinar el tronco de la persona hacia delante.',
              'Aplicar 5 golpes dorsales con el talón de la mano, entre las escápulas, uno a uno y comprobando el efecto tras cada golpe.',
              'Si no se resuelve, colocarse detrás, rodear la cintura y situar el puño por encima del ombligo y por debajo del apéndice xifoides.',
              'Aplicar 5 compresiones abdominales hacia dentro y hacia arriba.',
              'Repetir los ciclos de 5 y 5 hasta expulsar el objeto o hasta que la persona pierda la respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cambio respecto a lo que quizá aprendiste', texto: 'La enseñanza anterior aplicaba compresiones abdominales repetidas sin el ciclo inicial de golpes dorsales. El algoritmo vigente de la AHA (2025) indica 5 golpes en la espalda seguidos de 5 compresiones abdominales, y así se evalúa en este curso.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cuándo NO se comprime el abdomen', texto: 'En embarazo avanzado y cuando no es posible rodear el abdomen, las compresiones abdominales se sustituyen por compresiones torácicas sobre la mitad inferior del esternón. Los golpes dorsales se mantienen igual.' },
        ],
      },
      {
        titulo: 'Cuando pierde la conciencia',
        bloques: [
          { tipo: 'p', texto: 'Si el paciente se desploma, la situación deja de ser una OVACE y pasa a manejarse como un paro: se acompaña al suelo con cuidado, se activa el SMU si no se ha hecho y se inician compresiones.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué comprimir ayuda aquí', texto: 'Las compresiones torácicas generan presión en la vía aérea y pueden desplazar el objeto. Antes de cada ventilación se mira la boca y se retira el cuerpo extraño solo si es visible y alcanzable.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Nunca a ciegas', texto: 'El barrido digital a ciegas está proscrito: empuja el objeto más adentro y puede lesionar la vía aérea.' },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [
          {
            tipo: 'fuentes',
            items: [
              {
                nombre: 'American Heart Association. Adult Foreign-Body Airway Obstruction Algorithm, 2025.',
                url: 'https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-BLS-Adult-FBAO-250630.pdf?sc_lang=es',
                nota: 'Algoritmo del que se toma el ciclo de 5 golpes dorsales y 5 compresiones abdominales, y la sustitución por compresiones torácicas.',
              },
              {
                nombre: 'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
                url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
                nota: 'Conducta ante la pérdida de respuesta durante la OVACE y retirada del cuerpo extraño solo si es visible.',
              },
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'OVACE', definicion: 'Obstrucción de la Vía Aérea por Cuerpo Extraño.' },
      { termino: 'Obstrucción grave', definicion: 'La víctima no puede hablar, toser eficazmente ni respirar; requiere intervención inmediata.' },
      { termino: 'Golpe dorsal', definicion: 'Impacto con el talón de la mano entre las escápulas, con el tronco inclinado hacia delante; abre el ciclo de la OVACE grave.' },
      { termino: 'Compresión abdominal', definicion: 'Maniobra de empuje hacia dentro y hacia arriba por encima del ombligo, destinada a expulsar el cuerpo extraño.' },
    ],
    flashcards: [
      { frente: 'Obstrucción leve: ¿qué se hace?', reverso: 'Animar a toser y no interferir. No golpear la espalda.' },
      { frente: 'Adulto consciente con obstrucción grave: ¿cuál es el ciclo (AHA 2025)?', reverso: '5 golpes dorsales seguidos de 5 compresiones abdominales, repitiendo hasta resolver o hasta que pierda la respuesta.' },
      { frente: '¿Dónde se sitúa el puño en la compresión abdominal?', reverso: 'Por encima del ombligo y por debajo del apéndice xifoides.' },
      { frente: 'El paciente atragantado pierde la conciencia. ¿Qué haces?', reverso: 'Lo acompañas al suelo, activas el SMU e inicias compresiones.' },
      { frente: '¿Por qué está proscrito el barrido digital a ciegas?', reverso: 'Porque empuja el objeto más adentro y puede lesionar la vía aérea.' },
      { frente: 'Embarazo avanzado con OVACE grave: ¿dónde se comprime?', reverso: 'En el tórax, sobre la mitad inferior del esternón; los golpes dorsales no cambian.' },
    ],
    quiz: [
      {
        pregunta: 'Un comensal tose con fuerza y consigue decir "me atraganté". ¿Qué haces?',
        opciones: [
          'Cinco golpes en la espalda de inmediato.',
          'Compresiones abdominales.',
          'Lo animas a seguir tosiendo y te quedas vigilando.',
          'Le das agua para ayudar a bajar el bocado.',
        ],
        correcta: 2,
        explicacion: 'Tose y habla: la obstrucción es leve y la tos es más eficaz que cualquier maniobra. Intervenir puede empeorarla.',
      },
      {
        pregunta: 'Una mujer se lleva las manos al cuello, no emite sonido y su tos es inaudible. Según el algoritmo AHA 2025, ¿qué haces?',
        opciones: [
          'La animas a toser más fuerte.',
          'Ciclos de 5 golpes dorsales seguidos de 5 compresiones abdominales.',
          'Le abres la boca y haces un barrido con el dedo.',
          'Compresiones abdominales continuas sin golpes dorsales.',
        ],
        correcta: 1,
        explicacion: 'Es una obstrucción grave. El algoritmo vigente alterna 5 golpes en la espalda con 5 compresiones abdominales; el barrido a ciegas está contraindicado y las compresiones aisladas ya no son la secuencia recomendada.',
      },
      {
        pregunta: 'Una paciente con embarazo de 36 semanas presenta obstrucción grave y está consciente. ¿Qué modificas?',
        opciones: [
          'Nada: la secuencia es idéntica.',
          'Sustituyes las compresiones abdominales por compresiones torácicas y mantienes los golpes dorsales.',
          'Solo aplicas golpes dorsales, sin compresiones.',
          'Inicias RCP de inmediato aunque responda.',
        ],
        correcta: 1,
        explicacion: 'El útero grávido impide comprimir el abdomen con seguridad y eficacia; las compresiones se llevan a la mitad inferior del esternón. Los golpes dorsales se mantienen y no se inicia RCP mientras la persona responda.',
      },
      {
        pregunta: 'Durante la RCP de un paciente que se atragantó, antes de ventilar debes:',
        opciones: [
          'Hacer un barrido digital sistemático.',
          'Mirar la boca y retirar el objeto solo si es visible y alcanzable.',
          'Aspirar siempre con sonda rígida.',
          'Girar al paciente de lado y golpear la espalda.',
        ],
        correcta: 1,
        explicacion: 'Se retira solo lo que se ve y se puede coger; el barrido a ciegas puede impactar más el objeto.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Si la víctima tose con fuerza y puede hablar, la obstrucción es ___ y lo correcto es animarla a toser.',
          opciones: ['grave', 'leve', 'completa'],
          correcta: 1,
          explicacion: 'La tos eficaz genera presiones muy superiores a cualquier maniobra externa.',
        },
      ],
      preguntas: [
        {
          pregunta: 'Estás solo y la persona atragantada pierde el conocimiento. ¿Cuál es tu siguiente acción?',
          opciones: [
            'Seguir con compresiones abdominales en el suelo.',
            'Acompañarla al suelo, activar el SMU e iniciar compresiones torácicas.',
            'Ponerla en posición de recuperación.',
            'Intentar ventilaciones de rescate primero.',
          ],
          correcta: 1,
          explicacion: 'Al perder la conciencia se maneja como paro cardiaco; las compresiones torácicas además pueden movilizar el objeto.',
        },
      ],
    },
  },

  'm1-pab-hemorragias': {
    icono: '🩸',
    duracion: '16 min',
    resumen: 'Control de hemorragias externas: presión directa, empaquetamiento y torniquete, en el orden y con los criterios que salvan vidas.',
    objetivos: [
      'Clasificar una hemorragia por su origen y su gravedad.',
      'Aplicar presión directa de forma eficaz.',
      'Identificar cuándo está indicado el torniquete y colocarlo correctamente.',
    ],
    secciones: [
      {
        titulo: 'Tipos de hemorragia',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Por origen',
            headers: ['Tipo', 'Aspecto', 'Riesgo'],
            filas: [
              ['Arterial', 'Rojo brillante, sale a chorro pulsátil', 'Alto: puede exanguinar en minutos'],
              ['Venosa', 'Rojo oscuro, flujo continuo', 'Moderado a alto según el calibre'],
              ['Capilar', 'En sábana, superficial', 'Bajo, suele autolimitarse'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La hemorragia exanguinante va antes que la vía aérea', texto: 'Es la razón de la X que antecede al ABCDE en el abordaje del trauma: un sangrado masivo mata más rápido que casi cualquier otra cosa, así que se controla primero.' },
        ],
      },
      {
        titulo: 'Presión directa',
        bloques: [
          { tipo: 'p', texto: 'Es la primera medida y resuelve la mayoría de las hemorragias externas. Se aplica con gasa o el material más limpio disponible, firme, sobre el punto exacto que sangra y sin levantar para mirar: cada comprobación rompe el coágulo que se estaba formando.' },
          {
            tipo: 'pasos',
            titulo: 'Cómo se hace bien',
            items: [
              'Exponer la herida: no se puede comprimir lo que no se ve.',
              'Aplicar presión firme y sostenida con el talón de la mano.',
              'Si el apósito se empapa, añadir encima sin retirar el anterior.',
              'Mantener la presión sin interrupciones hasta el relevo.',
            ],
          },
        ],
      },
      {
        titulo: 'Empaquetamiento y torniquete',
        bloques: [
          { tipo: 'p', texto: 'La secuencia que recomiendan las guías de primeros auxilios de la AHA y la Cruz Roja de 2024 ante una hemorragia que amenaza la vida es aplicar presión directa y, a continuación, un torniquete o el empaquetamiento de la herida cuando su localización lo permita. No se define un tiempo fijo de presión antes de recurrir al torniquete: el criterio es que la presión directa no esté controlando el sangrado.' },
          { tipo: 'p', texto: 'En heridas profundas de zonas donde no se puede aplicar torniquete —ingle, axila, cuello— se introduce gasa dentro del trayecto hasta llenarlo y se comprime desde dentro. En extremidades con sangrado que la presión directa no controla, el torniquete es la medida de elección.' },
          {
            tipo: 'lista',
            titulo: 'Torniquete: reglas de uso',
            items: [
              'Colocar proximal a la herida, sobre un segmento con un solo hueso y no sobre una articulación; la referencia habitual es unos centímetros por encima del borde de la herida, y cada dispositivo indica en sus instrucciones su propia colocación.',
              'Apretar hasta que el sangrado se detenga: si no cesa, duele en vano.',
              'Anotar la hora de colocación de forma visible.',
              'No cubrirlo: debe quedar a la vista de todo el equipo.',
              'No aflojarlo ni retirarlo en el ámbito prehospitalario.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El torniquete duele, y eso no es un fallo', texto: 'Un torniquete bien puesto es doloroso. El error frecuente es aflojarlo por la queja del paciente: eso reanuda la hemorragia y desperdicia el tiempo que ya estuvo puesto.' },
        ],
      },
      FUENTES_TRAUMA_BASICO,
    ],
    conceptosClave: [
      { termino: 'Hemorragia exanguinante', definicion: 'Sangrado de volumen y velocidad tales que puede causar la muerte en minutos; tiene prioridad sobre la vía aérea.' },
      { termino: 'Empaquetamiento', definicion: 'Relleno de una herida profunda con gasa hasta ocupar el trayecto, para comprimir el vaso desde el interior.' },
      { termino: 'Torniquete', definicion: 'Dispositivo circunferencial que ocluye el flujo arterial de una extremidad para detener una hemorragia que la presión directa no controla.' },
    ],
    flashcards: [
      { frente: '¿Cómo se distingue una hemorragia arterial?', reverso: 'Sangre roja brillante que sale a chorro pulsátil.' },
      { frente: 'El apósito se empapa. ¿Qué haces?', reverso: 'Añades otro encima sin retirar el primero.' },
      { frente: '¿Dónde se coloca el torniquete?', reverso: 'Proximal a la herida, sobre un segmento de un solo hueso y no sobre una articulación; cada dispositivo indica su colocación en sus instrucciones.' },
      { frente: '¿Qué secuencia recomiendan las guías de primeros auxilios de 2024 ante hemorragia que amenaza la vida?', reverso: 'Presión directa y, a continuación, torniquete o empaquetamiento de la herida cuando su localización lo permita.' },
      { frente: '¿Qué se anota siempre al poner un torniquete?', reverso: 'La hora de colocación, de forma visible.' },
      { frente: '¿Por qué la X va antes que la A en el trauma?', reverso: 'Porque una hemorragia exanguinante mata más rápido que la obstrucción de la vía aérea.' },
    ],
    quiz: [
      {
        pregunta: 'Herida en muslo con sangrado abundante y pulsátil que no se controla con presión directa firme y sostenida. ¿Qué haces?',
        opciones: [
          'Retiras el apósito para ver si sigue sangrando.',
          'Colocas un torniquete por encima de la herida y anotas la hora.',
          'Elevas la extremidad y esperas.',
          'Aplicas hielo sobre la zona.',
          'Haces un torniquete sobre la rodilla.',
        ],
        correcta: 1,
        explicacion: 'En extremidad con hemorragia no controlada por presión directa, el torniquete es la medida de elección; se coloca proximal a la herida y nunca sobre una articulación.',
      },
      {
        pregunta: 'El paciente con torniquete grita de dolor y pide que se lo aflojes. ¿Qué haces?',
        opciones: [
          'Lo aflojas un poco para calmarlo.',
          'Lo mantienes y tratas el dolor según protocolo, informando al equipo.',
          'Lo retiras y vuelves a la presión directa.',
          'Lo cubres con una manta para que no lo vea.',
        ],
        correcta: 1,
        explicacion: 'Aflojarlo reanuda la hemorragia. El torniquete prehospitalario no se afloja ni se retira, y tampoco se cubre: debe permanecer visible.',
      },
      {
        pregunta: 'Herida profunda en la ingle con sangrado importante. La zona no permite torniquete. ¿Cuál es la maniobra indicada?',
        opciones: [
          'Presión con el puño sobre el abdomen.',
          'Empaquetar la herida con gasa y comprimir sobre el relleno.',
          'Vendaje compresivo circular sobre la pelvis.',
          'Elevar ambas piernas.',
        ],
        correcta: 1,
        explicacion: 'En las uniones anatómicas donde el torniquete no es aplicable, el empaquetamiento con compresión sostenida es la técnica de elección.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el control de una hemorragia externa en extremidad',
        pasos: [
          'Exponer la herida',
          'Aplicar presión directa firme y sostenida',
          'Añadir apósitos encima si se empapa, sin retirar los previos',
          'Si no cede, colocar torniquete proximal a la herida',
          'Anotar la hora y dejar el torniquete visible',
        ],
      },
    },
  },

  'm1-pab-fracturas': {
    icono: '🦴',
    duracion: '14 min',
    resumen: 'Reconocimiento e inmovilización básica de fracturas: qué se busca, qué se inmoviliza y qué nunca se hace.',
    objetivos: [
      'Reconocer los signos de una fractura.',
      'Diferenciar fractura cerrada de abierta y sus implicaciones.',
      'Inmovilizar respetando la regla de la articulación proximal y distal.',
    ],
    secciones: [
      {
        titulo: 'Reconocer una fractura',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos y síntomas',
            items: [
              'Dolor localizado que aumenta con el movimiento o la palpación.',
              'Deformidad o angulación anormal del segmento.',
              'Inflamación y hematoma en la zona.',
              'Impotencia funcional: no puede o no quiere moverlo.',
              'Crepitación (no debe buscarse a propósito).',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Cerrada frente a abierta', texto: 'En la fractura abierta el foco comunica con el exterior. Cambia el pronóstico por el riesgo de infección y suele acompañarse de más sangrado: se cubre con apósito estéril y no se intenta reintroducir el hueso.' },
        ],
      },
      {
        titulo: 'Inmovilización',
        bloques: [
          { tipo: 'p', texto: 'Inmovilizar no es solo sujetar: es impedir el movimiento de las articulaciones situadas por encima y por debajo del foco, porque son ellas las que transmiten el movimiento al hueso lesionado.' },
          {
            tipo: 'pasos',
            titulo: 'Antes y después, siempre',
            items: [
              'Comprobar pulso, sensibilidad y movilidad distales ANTES de inmovilizar.',
              'Cubrir las heridas si las hay.',
              'Inmovilizar incluyendo la articulación proximal y la distal.',
              'Acolchar los huecos para evitar puntos de presión.',
              'Volver a comprobar pulso, sensibilidad y movilidad DESPUÉS.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace', texto: 'No se intenta alinear ni reducir una fractura como primer respondiente, salvo que la extremidad esté sin pulso y el protocolo lo autorice. Y nunca se empuja hacia dentro un hueso expuesto.' },
        ],
      },
      FUENTES_TRAUMA_BASICO,
    ],
    conceptosClave: [
      { termino: 'Fractura abierta', definicion: 'Aquella en la que el foco de fractura comunica con el exterior a través de una herida; alto riesgo de infección.' },
      { termino: 'Impotencia funcional', definicion: 'Incapacidad o rechazo a movilizar el segmento lesionado, uno de los signos más constantes de fractura.' },
      { termino: 'Valoración neurovascular distal', definicion: 'Comprobación de pulso, sensibilidad y movilidad por debajo de la lesión, antes y después de inmovilizar.' },
    ],
    flashcards: [
      { frente: '¿Qué se comprueba antes y después de inmovilizar?', reverso: 'Pulso, sensibilidad y movilidad distales.' },
      { frente: '¿Qué articulaciones se incluyen al inmovilizar?', reverso: 'La proximal y la distal al foco de fractura.' },
      { frente: 'Hueso expuesto: ¿se reintroduce?', reverso: 'No. Se cubre con apósito estéril y se inmoviliza tal como está.' },
      { frente: '¿Por qué no se busca la crepitación?', reverso: 'Porque provocarla causa dolor y puede aumentar la lesión de partes blandas.' },
    ],
    quiz: [
      {
        pregunta: 'Fractura de antebrazo con deformidad evidente. ¿Qué compruebas antes de inmovilizar?',
        opciones: [
          'La fuerza de prensión contra resistencia.',
          'Pulso radial, sensibilidad y movilidad de los dedos.',
          'La crepitación al movilizar el foco.',
          'La temperatura axilar.',
        ],
        correcta: 1,
        explicacion: 'La valoración neurovascular distal antes y después detecta si la inmovilización comprometió la circulación o la inervación.',
      },
      {
        pregunta: 'Fractura abierta de tibia con fragmento óseo visible. ¿Cuál es la conducta correcta?',
        opciones: [
          'Empujar el hueso dentro y vendar.',
          'Cubrir con apósito estéril, inmovilizar como está y trasladar.',
          'Lavar el hueso con agua a presión.',
          'Aplicar torniquete de rutina.',
        ],
        correcta: 1,
        explicacion: 'Reintroducir el fragmento arrastra contaminación al interior. Se cubre, se inmoviliza en la posición encontrada y se traslada.',
      },
      {
        pregunta: 'Una férula colocada correctamente debe inmovilizar:',
        opciones: [
          'Solo el punto exacto de la fractura.',
          'La articulación proximal y la distal al foco.',
          'Toda la extremidad hasta el tronco siempre.',
          'Únicamente la articulación distal.',
        ],
        correcta: 1,
        explicacion: 'Las articulaciones vecinas transmiten movimiento al hueso lesionado; si quedan libres, la inmovilización no cumple su función.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Antes y después de inmovilizar se comprueban ___ distales.',
          opciones: ['pulso, sensibilidad y movilidad', 'temperatura y color', 'fuerza y reflejos'],
          correcta: 0,
          explicacion: 'Es la valoración neurovascular distal: detecta compromiso circulatorio o nervioso causado por la propia férula.',
        },
      ],
    },
  },

  'm1-pab-quemaduras': {
    icono: '🔥',
    duracion: '15 min',
    resumen: 'Atención inicial de las quemaduras: detener la lesión, valorar profundidad y extensión, y evitar los errores que agravan.',
    objetivos: [
      'Clasificar una quemadura por su profundidad.',
      'Estimar la extensión con la regla de los nueves.',
      'Aplicar las medidas iniciales y evitar las prácticas contraindicadas.',
    ],
    secciones: [
      {
        titulo: 'Profundidad',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Clasificación',
            headers: ['Grado', 'Afecta', 'Aspecto', 'Dolor'],
            filas: [
              ['Primero', 'Epidermis', 'Eritema, sin ampollas', 'Doloroso'],
              ['Segundo superficial', 'Dermis superficial', 'Ampollas, base rosada y húmeda', 'Muy doloroso'],
              ['Segundo profundo', 'Dermis profunda', 'Base pálida o moteada', 'Menos doloroso'],
              ['Tercero', 'Todo el espesor', 'Blanca, marrón o carbonizada, seca', 'Indoloro en el centro'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Que no duela es mala señal', texto: 'La ausencia de dolor en una quemadura indica destrucción de las terminaciones nerviosas, es decir, mayor profundidad. Nunca es un signo tranquilizador.' },
        ],
      },
      {
        titulo: 'Extensión: regla de los nueves',
        bloques: [
          { tipo: 'p', texto: 'En el adulto la superficie corporal se reparte en múltiplos de nueve: cabeza y cuello 9 %, cada extremidad superior 9 %, cara anterior del tronco 18 %, cara posterior 18 %, cada extremidad inferior 18 % y periné 1 %.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La regla de la palma', texto: 'Para superficies irregulares o pequeñas, la palma de la mano del PACIENTE (incluidos los dedos) equivale aproximadamente al 1 % de su superficie corporal.' },
        ],
      },
      {
        titulo: 'Qué hacer y qué no',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Medidas iniciales',
            items: [
              'Detener el proceso: apagar, retirar de la fuente, quitar ropa no adherida y joyas.',
              'Enfriar con agua a temperatura ambiente durante unos minutos.',
              'Cubrir con apósito limpio y seco.',
              'Prevenir la hipotermia: cubrir al paciente, no solo la quemadura.',
              'Valorar vía aérea si hay sospecha de inhalación.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Contraindicado',
            items: [
              'Hielo o agua helada: profundiza la lesión y provoca hipotermia.',
              'Romper las ampollas.',
              'Pomadas, pasta de dientes, aceite o remedios caseros.',
              'Retirar la ropa adherida a la piel.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Sospecha de vía aérea', texto: 'Quemadura facial, vibrisas nasales chamuscadas, esputo carbonáceo, disfonía o incendio en espacio cerrado obligan a vigilar la vía aérea: el edema puede cerrarla en minutos.' },
        ],
      },
      FUENTES_PRIMEROS_AUXILIOS,
    ],
    conceptosClave: [
      { termino: 'Regla de los nueves', definicion: 'Método de estimación rápida de la superficie corporal quemada repartiendo el cuerpo del adulto en múltiplos de 9 %.' },
      { termino: 'Regla de la palma', definicion: 'La palma del paciente con los dedos equivale a cerca del 1 % de su superficie corporal.' },
      { termino: 'Lesión por inhalación', definicion: 'Daño de la vía aérea por humo o gases calientes; puede producir edema y obstrucción progresiva.' },
    ],
    flashcards: [
      { frente: 'Quemadura que no duele en el centro: ¿qué indica?', reverso: 'Mayor profundidad: destrucción de terminaciones nerviosas.' },
      { frente: '¿Cuánto representa cada extremidad inferior en la regla de los nueves?', reverso: '18 % en el adulto.' },
      { frente: '¿Por qué no se usa hielo?', reverso: 'Profundiza la lesión por vasoconstricción y provoca hipotermia.' },
      { frente: 'Signos de sospecha de lesión por inhalación', reverso: 'Quemadura facial, vibrisas chamuscadas, esputo carbonáceo, disfonía, incendio en espacio cerrado.' },
      { frente: '¿Cuánto vale la palma del paciente?', reverso: 'Aproximadamente el 1 % de su superficie corporal.' },
    ],
    quiz: [
      {
        pregunta: 'Quemadura con ampollas, base rosada y muy dolorosa. ¿Qué profundidad tiene?',
        opciones: ['Primer grado', 'Segundo grado superficial', 'Segundo grado profundo', 'Tercer grado'],
        correcta: 1,
        explicacion: 'Las ampollas con base rosada, húmeda y muy dolorosa son características del segundo grado superficial.',
      },
      {
        pregunta: 'Rescatado de un incendio en un sótano. Tiene hollín en la boca, la voz ronca y las cejas chamuscadas. ¿Qué te preocupa más?',
        opciones: [
          'La extensión de las quemaduras cutáneas.',
          'La vía aérea: el edema puede obstruirla en minutos.',
          'La hipotermia por el enfriamiento.',
          'La contaminación de las heridas.',
        ],
        correcta: 1,
        explicacion: 'La tríada de espacio cerrado, hollín y disfonía apunta a lesión por inhalación: la vía aérea puede cerrarse antes de que las quemaduras cutáneas den problemas.',
      },
      {
        pregunta: '¿Cuál de estas medidas está contraindicada?',
        opciones: [
          'Cubrir con apósito limpio y seco.',
          'Enfriar con agua a temperatura ambiente unos minutos.',
          'Aplicar hielo directamente sobre la quemadura.',
          'Retirar anillos y pulseras de la zona.',
        ],
        correcta: 2,
        explicacion: 'El hielo profundiza la lesión y favorece la hipotermia; el enfriamiento se hace con agua a temperatura ambiente.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En el adulto, la cara anterior del tronco representa el ___ de la superficie corporal.',
          opciones: ['9 %', '18 %', '27 %', '36 %'],
          correcta: 1,
          explicacion: 'Tronco anterior 18 % y posterior 18 %, en la regla de los nueves.',
        },
      ],
    },
  },

  'm1-pab-botiquin': {
    icono: '🧰',
    duracion: '10 min',
    resumen: 'Qué debe contener un botiquín útil, cómo se organiza y por qué revisarlo es parte de tenerlo.',
    objetivos: [
      'Enumerar el contenido básico de un botiquín de primeros auxilios.',
      'Organizarlo por prioridad de uso.',
      'Establecer una rutina de revisión y reposición.',
    ],
    secciones: [
      {
        titulo: 'Contenido básico',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Control de hemorragias y heridas',
            items: [
              'Gasas estériles de varios tamaños y compresas.',
              'Vendas de rollo y vendas elásticas.',
              'Apósitos adhesivos.',
              'Cinta adhesiva microporosa.',
              'Torniquete comercial.',
              'Guantes de nitrilo (varias tallas).',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Vía aérea, protección y utilería',
            items: [
              'Mascarilla de barrera con válvula unidireccional para ventilación.',
              'Tijera de trauma.',
              'Manta térmica.',
              'Solución salina para irrigación.',
              'Antiséptico.',
              'Linterna y libreta con lápiz.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Guantes: la pieza que nunca falta', texto: 'La protección personal es lo primero que se coge y lo primero que se agota. Un botiquín sin guantes es un botiquín que no se puede usar con seguridad.' },
        ],
      },
      {
        titulo: 'Organización y mantenimiento',
        bloques: [
          { tipo: 'p', texto: 'El botiquín se organiza por prioridad: lo que se necesita en los primeros segundos —guantes, torniquete, apósitos— va arriba y accesible. Buscar un torniquete bajo tres capas de material es perder el tiempo que justifica tenerlo.' },
          {
            tipo: 'pasos',
            titulo: 'Rutina de revisión',
            items: [
              'Revisar caducidades de forma periódica y programada.',
              'Reponer lo consumido inmediatamente después de cada uso.',
              'Comprobar la integridad de los envases estériles.',
              'Mantener una lista del contenido dentro del propio botiquín.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Medicamentos', texto: 'Un botiquín de primeros auxilios no es un dispensario. La administración de medicamentos depende del alcance de la práctica y de la normativa aplicable, no de lo que quepa en la caja.' },
        ],
      },
      FUENTES_PRIMEROS_AUXILIOS,
    ],
    conceptosClave: [
      { termino: 'Barrera unidireccional', definicion: 'Dispositivo que permite ventilar a un paciente evitando el contacto directo y el retorno de secreciones.' },
      { termino: 'Reposición inmediata', definicion: 'Práctica de reponer el material consumido justo después del uso, para que el botiquín esté siempre completo.' },
    ],
    flashcards: [
      { frente: '¿Qué material se coloca en la zona más accesible del botiquín?', reverso: 'Guantes, torniquete y apósitos: lo de los primeros segundos.' },
      { frente: '¿Para qué sirve la mascarilla de barrera?', reverso: 'Para ventilar evitando contacto directo y retorno de secreciones.' },
      { frente: '¿Cuándo se repone el material usado?', reverso: 'Inmediatamente después del uso.' },
    ],
    quiz: [
      {
        pregunta: '¿Cuál de estos elementos es imprescindible en cualquier botiquín de primeros auxilios?',
        opciones: [
          'Antibióticos de amplio espectro.',
          'Guantes de nitrilo.',
          'Suturas y porta-agujas.',
          'Un tensiómetro automático.',
        ],
        correcta: 1,
        explicacion: 'La protección personal es la base: sin guantes no se puede intervenir con seguridad. Los medicamentos y el material invasivo dependen del alcance de la práctica.',
      },
      {
        pregunta: 'El criterio principal para organizar el contenido del botiquín es:',
        opciones: [
          'Por orden alfabético.',
          'Por prioridad de uso: lo urgente, accesible.',
          'Por tamaño de los envases.',
          'Por fecha de caducidad.',
        ],
        correcta: 1,
        explicacion: 'El tiempo que se pierde buscando material urgente anula la ventaja de haberlo llevado.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Usaste el torniquete y dos paquetes de gasas en un incidente. ¿Cuándo repones?',
          opciones: [
            'En la próxima revisión programada.',
            'Inmediatamente después del servicio.',
            'Cuando vuelva a hacer falta.',
            'Al final del mes.',
          ],
          correcta: 1,
          explicacion: 'Un botiquín incompleto falla justo en la siguiente emergencia, que puede ser la misma jornada.',
        },
      ],
    },
  },
}
