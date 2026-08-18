// ============================================================
//  MÓDULO 1 — segunda tanda: cierra los temas pendientes.
// ------------------------------------------------------------
//  Cubre los 5 temas vacíos y completa los 3 escasos del módulo.
//
//  Marco: AHA 2025 (RCP/OVACE), PHTLS 9 y NOM-034-SSA3-2013. Los datos
//  específicos de México —número único 911, CRUM, antivenenos de producción
//  nacional, aviso al Ministerio Público— se marcan como tales, porque son
//  justo los que un manual estadounidense traducido deja mal.
//
//  Lo que depende de la entidad federativa o del servicio (números locales de
//  toxicología, protocolos de traslado) se dice en el texto en vez de fijarlo.
// ============================================================

// ---------- fuentes de las unidades ----------
//
// Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json:
//   · m1-primeros-auxilios-intermedios → OMS BEC, AHA/AAP PBLS 2025, PHTLS 9,
//     con apoyo de las guías de primeros auxilios AHA/Cruz Roja 2024.
//   · m1-introduccion-smu → OMS 2025, NOM-034 y legislación mexicana vigente.
//
// El registro prohíbe expresamente usar páginas comerciales como autoridad
// clínica. La lección de intoxicaciones citaba la página de un fabricante de
// antivenenos: se retiró y se sustituyó por la fuente oficial mexicana, con la
// advertencia de que es epidemiológica y no un protocolo terapéutico.

const AHA_PRIMEROS_AUXILIOS = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid. '
    + 'Circulation, 2024. DOI 10.1161/CIR.0000000000001281.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Conducta de primeros auxilios en lesiones, exposiciones tóxicas y emergencias ambientales.',
}
const AHA_PBLS_2025 = {
  nombre: 'American Heart Association y American Academy of Pediatrics. Part 6: Pediatric Basic '
    + 'Life Support. 2025 Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular '
    + 'Care. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',
  nota: 'Parámetros de reanimación del lactante y del niño y secuencia de la obstrucción por cuerpo '
    + 'extraño. Fuente pediátrica primaria: no se usa el algoritmo de adulto.',
}
const OMS_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Marco público de evaluación inicial del paciente agudo y del traumatizado.',
}
const PHTLS_9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición nombrada por el plan. Evaluación primaria y secundaria, inmovilización y manejo de '
    + 'lesiones. Capítulo y página PENDIENTES: requieren la copia licenciada de la academia.',
}
const OMS_PREHOSPITALARIA_2025 = {
  nombre: 'World Health Organization. Prehospital emergency care: operational guidance for '
    + 'ambulance systems, 2025.',
  url: 'https://www.who.int/publications/b/79743',
  nota: 'Organización de un sistema de atención prehospitalaria, seguridad y bienestar del personal.',
}
const NOM_034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención médica prehospitalaria de '
    + 'las urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Personal, equipamiento y condiciones exigidas por tipo de ambulancia en México.',
}
const SSA_PONZONAS_2024 = {
  nombre: 'Secretaría de Salud. Manual de Procedimientos Estandarizados para la Vigilancia '
    + 'Epidemiológica de las Intoxicaciones por Animales Ponzoñosos, 2024.',
  url: 'https://epidemiologia.salud.gob.mx/gobmx/salud/documentos/manuales/26_Manual_de_Procedimientos_Ponzona_2024.pdf',
  nota: 'Fuente oficial mexicana para la definición de caso y la notificación. ADVERTENCIA: es un '
    + 'manual de VIGILANCIA EPIDEMIOLÓGICA, no un protocolo terapéutico; no respalda dosis, tiempos '
    + 'de respuesta ni indicaciones de antiveneno.',
}
// CORRECCIÓN 2026-08-17. Aquí se citaba Tortora 15.ª ed. como fuente de la
// terminología anatómica. El plan lo declara en su bibliografía, pero
// `docs/BIBLIOTECA-DRIVE-PTEM.md` estableció que Tortora NO está en la carpeta
// de la academia: la cita no podía haberse comprobado y por tanto no respaldaba
// nada. Se sustituye por la obra que sí se abrió y se verificó —AAOS, capítulo
// 1, «Definiciones anatómicas», p. 19—, que cubre exactamente esta materia:
// posición anatómica, planos, cuadrantes abdominales y términos de movimiento.
const AAOS_DEFINICIONES = {
  nombre: 'American Academy of Orthopaedic Surgeons (Elling B., Elling K. M. y Rothenberg M. A.). '
    + 'Anatomía y fisiología enfocada a la atención prehospitalaria y urgencias médicas, Editorial '
    + 'Millas. Capítulo 1, «Definiciones anatómicas», p. 19.',
  nota: 'Fuente de la terminología anatómica: posición anatómica, planos, cuadrantes abdominales y '
    + 'términos de movimiento y posición. Capítulo y página impresa verificados el 17 de agosto de '
    + '2026 sobre la copia de la biblioteca de la academia. Sustituye a la cita anterior de Tortora, '
    + 'obra que el plan declara pero que NO está en la biblioteca y por tanto no pudo comprobarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const FUENTES_PEDIATRIA_BASICA = F([AHA_PBLS_2025, OMS_BEC])
const FUENTES_TRAUMA_INTERMEDIO = F([PHTLS_9, OMS_BEC, AHA_PRIMEROS_AUXILIOS])
const FUENTES_TOXICOLOGIA_BASICA = F([AHA_PRIMEROS_AUXILIOS, SSA_PONZONAS_2024])
const FUENTES_BIENESTAR = F([OMS_PREHOSPITALARIA_2025, NOM_034])
const FUENTES_TERMINOLOGIA = F([AAOS_DEFINICIONES])

export default {
  // ---------- completa los ESCASOS ----------
  'm1-pai-rcp-pediatrico': {
    icono: '👶',
    duracion: '16 min',
    resumen: 'RCP en lactante y en niño: qué cambia respecto del adulto y por qué la causa del paro obliga a invertir prioridades.',
    objetivos: [
      'Diferenciar las técnicas de compresión en lactante, niño y adulto.',
      'Aplicar la relación compresión-ventilación según haya uno o dos reanimadores.',
      'Explicar por qué la ventilación pesa más en el paro pediátrico.',
    ],
    secciones: [
      {
        titulo: 'Por qué el paro pediátrico es otra cosa',
        bloques: [
          { tipo: 'p', texto: 'En el adulto el paro suele ser súbito y de origen cardiaco: el corazón entra en un ritmo caótico con la sangre todavía oxigenada, y por eso la desfibrilación temprana es lo que salva. En el niño la secuencia habitual es la contraria: primero falla la respiración, la hipoxia progresa y el corazón se detiene al final, ya sin oxígeno disponible.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La consecuencia práctica', texto: 'Si el paro pediátrico es casi siempre hipóxico, la ventilación deja de ser accesoria. En el niño, la RCP solo con las manos es la opción de último recurso —mejor que nada—, no la recomendada como en el adulto lego.' },
        ],
      },
      {
        titulo: 'Técnica por edad',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Compresiones (AHA 2025)',
            headers: ['', 'Lactante (< 1 año)', 'Niño (1 año a pubertad)', 'Adulto'],
            filas: [
              ['Técnica', 'Dos pulgares rodeando el tórax, o el talón de una mano', 'Talón de una mano, o dos si hace falta', 'Dos manos'],
              ['Profundidad', 'Un tercio del diámetro AP (~4 cm)', 'Un tercio del diámetro AP (~5 cm)', '5–6 cm'],
              ['Frecuencia', '100–120/min', '100–120/min', '100–120/min'],
              ['Un reanimador', '30:2', '30:2', '30:2'],
              ['Dos reanimadores', '15:2', '15:2', '30:2'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El tercio, no los centímetros', texto: 'La referencia real en pediatría es «un tercio del diámetro anteroposterior del tórax». Los centímetros son una orientación: un lactante prematuro y uno de once meses no tienen el mismo tórax.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cambio de 2025 en el lactante', texto: 'La guía pediátrica de la AHA y la AAP de 2025 retiró la técnica de DOS DEDOS en el lactante porque no alcanzaba de forma fiable la profundidad necesaria. Las técnicas recomendadas son los dos pulgares rodeando el tórax o el talón de una mano. Si aprendiste la técnica de dos dedos, esa es la parte que hay que actualizar.' },
        ],
      },
      {
        titulo: 'Activación del SMU: quién llama y cuándo',
        bloques: [
          { tipo: 'p', texto: 'Con dos reanimadores, uno llama al 911 y consigue el DEA mientras el otro empieza. Solo, el orden depende de lo que se sospeche.' },
          {
            tipo: 'lista',
            titulo: 'Reanimador solo',
            items: [
              'Colapso presenciado y súbito (sospecha de causa cardiaca): llamar primero y conseguir el DEA, luego reanimar.',
              'Paro no presenciado o de causa probablemente respiratoria (ahogamiento, atragantamiento): dar 2 minutos de RCP y después llamar.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'México: 911', texto: 'El número único nacional de emergencias es el 911. Los CRUM (Centros Reguladores de Urgencias Médicas) coordinan el recurso y el hospital de destino; en muchas entidades el operador puede guiar la RCP por teléfono.' },
        ],
      },
      FUENTES_PEDIATRIA_BASICA,
    ],
    conceptosClave: [
      { termino: 'Paro hipóxico', definicion: 'Paro cardiaco secundario a insuficiencia respiratoria, mecanismo predominante en la edad pediátrica.' },
      { termino: 'Relación compresión-ventilación', definicion: 'Número de compresiones por cada par de ventilaciones: 30:2 con un reanimador y 15:2 con dos en lactante y niño.' },
      { termino: 'Diámetro anteroposterior', definicion: 'Grosor del tórax de adelante hacia atrás; la profundidad pediátrica se define como un tercio de esa medida.' },
    ],
    flashcards: [
      { frente: 'Relación compresión-ventilación en niño con DOS reanimadores', reverso: '15:2 (con un solo reanimador, 30:2).' },
      { frente: 'Profundidad de compresión en lactante', reverso: 'Un tercio del diámetro anteroposterior, unos 4 cm.' },
      { frente: '¿Por qué la ventilación importa más en pediatría?', reverso: 'Porque el paro suele ser hipóxico: primero falla la respiración.' },
      { frente: 'Reanimador solo ante un niño que se ahogó: ¿llama o reanima?', reverso: 'Reanima 2 minutos y después llama: la causa es respiratoria.' },
    ],
    quiz: [
      {
        pregunta: 'Estás solo con un lactante que no responde y no respira tras atragantarse. ¿Qué haces primero?',
        opciones: [
          'Llamar al 911 y esperar indicaciones.',
          'Dar 2 minutos de RCP y después llamar al 911.',
          'Buscar un DEA antes de empezar.',
          'Colocarlo en posición de recuperación.',
        ],
        correcta: 1,
        explicacion: 'El origen es respiratorio: dos minutos de RCP corrigen la hipoxia antes de dejar al niño para ir a pedir ayuda. En el colapso súbito de causa cardiaca el orden sería el inverso.',
      },
      {
        pregunta: 'Dos reanimadores atienden a un niño de 6 años en paro. La relación correcta es:',
        opciones: ['30:2', '15:2', '5:1', 'Solo compresiones'],
        correcta: 1,
        explicacion: 'Con dos reanimadores en lactante y niño la relación baja a 15:2, para aumentar la frecuencia de ventilaciones en un paro de origen habitualmente hipóxico.',
      },
      {
        pregunta: '¿Cuál es la referencia correcta de profundidad en el paciente pediátrico?',
        opciones: [
          'Siempre 5 cm, igual que en el adulto.',
          'La mitad del diámetro anteroposterior del tórax.',
          'Un tercio del diámetro anteroposterior del tórax.',
          'Hasta que se note resistencia.',
        ],
        correcta: 2,
        explicacion: 'Un tercio del diámetro AP se adapta al tamaño real del tórax; los centímetros son solo una orientación aproximada.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En pediatría, con un solo reanimador la relación es 30:2; con dos reanimadores es ___.',
          opciones: ['30:2', '15:2', '10:1'],
          correcta: 1,
          explicacion: 'Dos reanimadores permiten ventilar más a menudo, que es lo que necesita un paro hipóxico.',
        },
      ],
    },
  },

  'm1-pai-ferulas-vendajes': {
    icono: '🩹',
    duracion: '14 min',
    resumen: 'Taller de férulas y vendajes: tipos, técnica y las comprobaciones que evitan convertir una inmovilización en una lesión.',
    objetivos: [
      'Seleccionar el tipo de férula según la lesión.',
      'Aplicar un vendaje con la tensión y la dirección correctas.',
      'Detectar a tiempo un compromiso neurovascular por compresión.',
    ],
    secciones: [
      {
        titulo: 'Tipos de férula',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cuál usar',
            headers: ['Tipo', 'Indicación', 'Nota'],
            filas: [
              ['Rígida (tabla, aluminio)', 'Huesos largos', 'Requiere acolchado en los huecos'],
              ['Moldeable (SAM, vacío)', 'Deformidades y articulaciones', 'Se adapta sin forzar la posición'],
              ['Tracción (Sager, Hare)', 'Fractura cerrada de diáfisis femoral', 'Contraindicada si hay lesión de pelvis, rodilla o tobillo'],
              ['Cabestrillo y vendaje', 'Clavícula, húmero, hombro', 'Inmoviliza contra el propio tórax'],
            ],
          },
        ],
      },
      {
        titulo: 'Vendajes: reglas que evitan daño',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Técnica',
            items: [
              'Comprobar pulso, sensibilidad y movilidad distales ANTES.',
              'Vendar de distal a proximal, para favorecer el retorno venoso.',
              'Superponer cada vuelta un tercio de la anterior.',
              'Dejar los dedos visibles siempre que sea posible.',
              'Volver a comprobar pulso, sensibilidad y movilidad DESPUÉS.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Señales de que aprieta demasiado', texto: 'Dedos fríos, pálidos o azulados, hormigueo, dolor que aumenta en vez de ceder, o relleno capilar lento. Ante cualquiera: aflojar y volver a valorar. Un vendaje demasiado apretado puede hacer más daño que la lesión que sujeta.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La inflamación llega después', texto: 'Un vendaje cómodo al colocarlo puede quedar opresivo veinte minutos más tarde. Por eso la reevaluación durante el traslado no es opcional.' },
        ],
      },
      FUENTES_TRAUMA_INTERMEDIO,
    ],
    conceptosClave: [
      { termino: 'Férula de tracción', definicion: 'Dispositivo que aplica tracción longitudinal en la fractura cerrada de fémur; contraindicado con lesión asociada de pelvis, rodilla o tobillo.' },
      { termino: 'Relleno capilar', definicion: 'Tiempo que tarda el lecho ungueal en recuperar color tras la presión; su retraso sugiere compromiso circulatorio.' },
      { termino: 'Vendaje distal-proximal', definicion: 'Dirección correcta del vendaje, de la parte más lejana hacia el tronco, para no dificultar el retorno venoso.' },
    ],
    flashcards: [
      { frente: '¿En qué dirección se venda?', reverso: 'De distal a proximal, superponiendo un tercio en cada vuelta.' },
      { frente: '¿Cuándo está contraindicada la férula de tracción?', reverso: 'Con lesión de pelvis, rodilla o tobillo asociada.' },
      { frente: 'Signos de vendaje demasiado apretado', reverso: 'Dedos fríos o azulados, hormigueo, dolor creciente, relleno capilar lento.' },
      { frente: '¿Por qué se dejan los dedos visibles?', reverso: 'Para vigilar color, temperatura y relleno capilar sin deshacer el vendaje.' },
    ],
    quiz: [
      {
        pregunta: 'Fractura cerrada de fémur, sin otras lesiones. ¿Qué férula es la indicada?',
        opciones: ['Rígida de aluminio', 'De tracción (Sager o Hare)', 'De vacío para todo el miembro', 'Cabestrillo'],
        correcta: 1,
        explicacion: 'La tracción alinea el foco y reduce el sangrado en el muslo; solo se usa si no hay lesión de pelvis, rodilla ni tobillo.',
      },
      {
        pregunta: 'Veinte minutos después de vendar un antebrazo, el paciente refiere hormigueo y los dedos están fríos. ¿Qué haces?',
        opciones: [
          'Es normal por la inmovilización: continúas el traslado.',
          'Aflojas el vendaje y revalúas pulso, sensibilidad y movilidad.',
          'Aprietas más para estabilizar mejor.',
          'Elevas el brazo y esperas.',
        ],
        correcta: 1,
        explicacion: 'Son signos de compromiso neurovascular por compresión, muy probablemente por la inflamación posterior a la colocación.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la colocación de una férula',
        pasos: [
          'Comprobar pulso, sensibilidad y movilidad distales',
          'Cubrir las heridas si las hay',
          'Elegir la férula y acolchar los huecos',
          'Inmovilizar incluyendo la articulación proximal y la distal',
          'Volver a comprobar pulso, sensibilidad y movilidad',
        ],
      },
    },
  },

  // Reescrito a mano tras detectar que el reparto automático había metido aquí
  // un protocolo de reperfusión coronaria. Es un tema núcleo del módulo: no
  // debe depender de la redistribución.
  'm1-pai-evaluacion-xabcde': {
    icono: '🔤',
    duracion: '16 min',
    resumen: 'XABCDE: la secuencia que ordena la atención al paciente traumatizado, y por qué la X va delante de todo.',
    objetivos: [
      'Ejecutar la evaluación primaria en el orden XABCDE.',
      'Justificar por qué el control de la hemorragia precede a la vía aérea.',
      'Diferenciar la evaluación primaria de la secundaria.',
    ],
    secciones: [
      {
        titulo: 'Por qué existe un orden',
        bloques: [
          { tipo: 'p', texto: 'La secuencia no es una lista de tareas: es un orden de letalidad. Cada letra representa un problema que mata antes que el siguiente, así que resolver la C sin haber resuelto la A es perder el tiempo en algo que no llegará a importar.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Regla de oro', texto: 'No se avanza a la siguiente letra hasta haber resuelto —o al menos controlado— la anterior. Y ante cualquier deterioro, se vuelve a empezar por la X.' },
        ],
      },
      {
        titulo: 'Letra por letra',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Letra', 'Qué se busca', 'Qué se hace'],
            filas: [
              ['X — Hemorragia exanguinante', 'Sangrado masivo visible', 'Presión directa, torniquete, empaquetamiento'],
              ['A — Vía aérea', 'Obstrucción, ruidos, cuerpos extraños', 'Apertura con control cervical, aspiración, cánulas'],
              ['B — Ventilación', 'Frecuencia, simetría, esfuerzo, ruidos', 'Oxígeno, ventilación asistida, descompresión si procede'],
              ['C — Circulación', 'Pulso, piel, relleno capilar, hemorragias no vistas', 'Control de sangrado, accesos, tratamiento del shock'],
              ['D — Déficit neurológico', 'AVDI o Glasgow, pupilas, movilidad', 'Glucemia, prevención de lesión secundaria'],
              ['E — Exposición y entorno', 'Lesiones ocultas bajo la ropa', 'Exponer lo necesario y CUBRIR: prevenir hipotermia'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Por qué la X se antepuso al ABCDE', texto: 'La secuencia clásica empezaba en A. Se antepuso la X porque una hemorragia arterial masiva puede vaciar a un paciente en pocos minutos, antes de que una vía aérea comprometida llegue a matarlo. Es el único problema que se atiende incluso antes de mirar si respira.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La E que se olvida', texto: 'Exponer sirve para encontrar lo que la ropa esconde, pero el paso no termina ahí: hay que volver a cubrir. Un paciente desnudo sobre una camilla se enfría rápido, y la hipotermia empeora la coagulación justo cuando más se necesita.' },
        ],
      },
      {
        titulo: 'Primaria y secundaria',
        bloques: [
          { tipo: 'p', texto: 'La evaluación PRIMARIA es el XABCDE: busca y resuelve lo que mata ya, y dura menos de un minuto en un paciente sin problemas. La SECUNDARIA llega después, solo si el paciente está estable, y es la revisión de la cabeza a los pies buscando todo lo demás.' },
          {
            tipo: 'lista',
            titulo: 'En la secundaria',
            items: [
              'Exploración sistemática de cabeza a pies.',
              'Signos vitales completos.',
              'Historia SAMPLE: síntomas, alergias, medicamentos, patologías previas, última ingesta y eventos previos.',
              'Reevaluación de todo lo hecho en la primaria.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La secundaria nunca retrasa el traslado', texto: 'Si el paciente es crítico, la secundaria se hace en marcha o no se hace. Ningún hallazgo de la exploración detallada justifica quedarse más tiempo en la escena con un paciente inestable.' },
        ],
      },
      FUENTES_TRAUMA_INTERMEDIO,
    ],
    conceptosClave: [
      { termino: 'XABCDE', definicion: 'Secuencia de evaluación primaria en trauma: hemorragia eXanguinante, vía Aérea, ventilación (Breathing), Circulación, Déficit neurológico y Exposición.' },
      { termino: 'Evaluación primaria', definicion: 'Búsqueda y resolución inmediata de lo que amenaza la vida, en orden de letalidad.' },
      { termino: 'Evaluación secundaria', definicion: 'Exploración detallada de cabeza a pies con historia SAMPLE, posterior a la primaria y solo si el paciente lo permite.' },
      { termino: 'Historia SAMPLE', definicion: 'Síntomas, Alergias, Medicamentos, Patologías previas, Última ingesta y Eventos previos.' },
    ],
    flashcards: [
      { frente: '¿Qué representa la X del XABCDE?', reverso: 'Hemorragia exanguinante: se controla antes que la vía aérea.' },
      { frente: '¿Por qué la evaluación es secuencial y no simultánea?', reverso: 'Porque cada letra mata antes que la siguiente: resolver la A no sirve si la X sigue sangrando.' },
      { frente: '¿Cuándo se reinicia el XABCDE desde el principio?', reverso: 'Ante cualquier deterioro del paciente, y tras cada intervención mayor.' },
      { frente: '¿Qué significan las letras de SAMPLE?', reverso: 'Síntomas, Alergias, Medicamentos, Patologías previas, Última ingesta, Eventos previos.' },
      { frente: '¿Qué se hace después de exponer al paciente?', reverso: 'Cubrirlo: la hipotermia empeora la coagulación.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con hemorragia arterial en muslo y respiración ruidosa. ¿Qué atiendes primero?',
        opciones: [
          'La vía aérea: siempre va primero.',
          'La hemorragia: es la X y precede a la A.',
          'Ambas a la vez.',
          'Los signos vitales.',
        ],
        correcta: 1,
        explicacion: 'Una hemorragia arterial masiva puede vaciar al paciente antes de que la vía aérea comprometida lo mate. Por eso la X se antepuso al ABCDE.',
      },
      {
        pregunta: 'Terminas la primaria y el paciente está crítico. ¿Haces la evaluación secundaria en la escena?',
        opciones: [
          'Sí, completa: es parte del protocolo.',
          'No: se hace en marcha o no se hace. El traslado no se retrasa.',
          'Sí, pero solo la cabeza.',
          'Solo si el hospital lo pide.',
        ],
        correcta: 1,
        explicacion: 'En el paciente inestable, cada minuto en la escena resta. La secundaria es importante, pero nunca por delante del traslado.',
      },
      {
        pregunta: 'Durante la D encuentras al paciente confuso. ¿Qué comprobación no debe faltar?',
        opciones: ['La temperatura', 'La glucemia', 'El peso', 'La saturación únicamente'],
        correcta: 1,
        explicacion: 'La hipoglucemia imita y agrava el deterioro neurológico, y es corregible de inmediato.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la evaluación primaria',
        pasos: [
          'X — Controlar la hemorragia exanguinante',
          'A — Vía aérea con control cervical',
          'B — Ventilación y oxigenación',
          'C — Circulación y estado de shock',
          'D — Déficit neurológico',
          'E — Exposición y prevención de la hipotermia',
        ],
      },
      completar: [
        {
          texto: 'Tras exponer al paciente para buscar lesiones, lo siguiente es ___.',
          opciones: ['tomar signos vitales', 'cubrirlo para evitar la hipotermia', 'iniciar el traslado'],
          correcta: 1,
          explicacion: 'La hipotermia forma parte de la tríada letal junto con la acidosis y la coagulopatía.',
        },
      ],
    },
  },

  // ---------- temas VACÍOS ----------
  'm1-pai-ovace-pediatrico': {
    icono: '🧒',
    duracion: '14 min',
    resumen: 'Obstrucción de la vía aérea por cuerpo extraño en lactante y niño: por qué la maniobra cambia con la edad y qué no debe hacerse nunca.',
    objetivos: [
      'Reconocer la obstrucción grave en lactante y en niño.',
      'Ejecutar el ciclo de golpes interescapulares y compresiones en el lactante.',
      'Identificar las causas más frecuentes y prevenirlas.',
    ],
    secciones: [
      {
        titulo: 'Reconocimiento',
        bloques: [
          { tipo: 'p', texto: 'Igual que en el adulto, lo que decide la conducta es si la obstrucción es leve o grave. Un niño que tose con fuerza, llora o habla mueve aire: se le anima a toser y se vigila. Uno que no emite sonido, con tos silenciosa o cianosis progresiva, tiene una obstrucción grave.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Nunca en pediatría', texto: 'No se hacen compresiones abdominales en el lactante menor de un año: su hígado es proporcionalmente grande y poco protegido por la parrilla costal, y el riesgo de lesión hepática es real. Tampoco se hace barrido digital a ciegas a ninguna edad.' },
        ],
      },
      {
        titulo: 'Lactante consciente (menor de 1 año)',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Ciclo de 5 y 5',
            items: [
              'Colocarlo boca abajo sobre el antebrazo, cabeza más baja que el tronco, sujetando la mandíbula sin comprimir el cuello.',
              'Dar 5 golpes interescapulares con el talón de la mano.',
              'Voltearlo boca arriba, sosteniendo la cabeza.',
              'Dar 5 compresiones torácicas en el mismo punto que la RCP, más lentas y profundas.',
              'Repetir el ciclo revisando la boca entre series; retirar el objeto solo si es visible.',
            ],
          },
        ],
      },
      {
        titulo: 'Niño mayor de 1 año y pérdida de conciencia',
        bloques: [
          { tipo: 'p', texto: 'A partir del año de edad la guía pediátrica de 2025 recomienda ciclos de 5 golpes dorsales alternados con 5 compresiones abdominales, repetidos hasta expulsar el objeto o hasta que el niño deje de responder. La fuerza se ajusta al tamaño del niño y el reanimador se arrodilla detrás si hace falta para no levantarlo del suelo.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Las tres situaciones, separadas', texto: 'Lactante menor de un año con obstrucción grave: 5 golpes dorsales + 5 compresiones TORÁCICAS; las compresiones abdominales no están recomendadas a esta edad. Niño mayor de un año con obstrucción grave: 5 golpes dorsales + 5 compresiones ABDOMINALES. En cualquier edad, si pierde la respuesta: iniciar RCP y retirar el objeto solo si es visible. Lo que cambia con la edad es la segunda mitad del ciclo, no la primera.' },
          { tipo: 'p', texto: 'El cambio de 2025 alineó la secuencia del niño con la del lactante añadiendo los golpes dorsales al inicio del ciclo. La propia guía explica que la evidencia pediátrica directa es limitada y que la decisión buscó además simplificar el entrenamiento y el recuerdo del reanimador.' },
          { tipo: 'p', texto: 'Si en cualquier edad el paciente pierde la respuesta, se acompaña al suelo, se activa el sistema de emergencias y se inicia RCP. Antes de cada ventilación se mira la boca y se retira el cuerpo extraño únicamente si se ve y se alcanza; no se hace barrido digital a ciegas a ninguna edad.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Prevención, que es donde se gana', texto: 'Las causas más frecuentes son alimentos redondos (uva entera, cacahuate, salchicha en rodajas, palomitas) y objetos pequeños (canicas, globos desinflados, piezas de juguete). Cortar los alimentos a lo largo y vigilar la comida sentados evita la mayoría de los casos.' },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [
          {
            tipo: 'fuentes',
            items: [
              {
                nombre: 'American Heart Association y American Academy of Pediatrics. Part 6: Pediatric '
                  + 'Basic Life Support. 2025 Guidelines for Cardiopulmonary Resuscitation and Emergency '
                  + 'Cardiovascular Care. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.',
                url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',
                nota: 'Fuente primaria de toda la conducta de esta lección: ciclos de 5 golpes dorsales '
                  + 'con 5 compresiones torácicas en el lactante, ciclos de 5 golpes dorsales con 5 '
                  + 'compresiones abdominales en el niño mayor de un año, y no recomendación de '
                  + 'compresiones abdominales en el lactante.',
              },
              {
                nombre: 'American Academy of Pediatrics. Pediatric life support, resuscitation guideline '
                  + 'updates developed by AAP, AHA. AAP News, 2025.',
                url: 'https://publications.aap.org/aapnews/news/33628/Pediatric-life-support-resuscitation-guideline',
                nota: 'Resumen institucional de los cambios de 2025, incluida la alineación de la '
                  + 'secuencia del niño con la del lactante.',
              },
            ],
          },
          { tipo: 'p', texto: 'Esta lección NO se apoya en el algoritmo de adulto. El plan oficial separa la OVACE del adulto de la pediátrica, y las recomendaciones difieren: la fuente de esta página es la guía pediátrica de 2025 de la AHA y la Academia Americana de Pediatría.' },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Golpes interescapulares', definicion: 'Cinco golpes con el talón de la mano entre las escápulas del lactante, en decúbito prono y con la cabeza más baja que el tronco.' },
      { termino: 'Compresiones torácicas en OVACE', definicion: 'En el lactante sustituyen a las abdominales; se aplican en el punto de la RCP, más lentas y profundas.' },
      { termino: 'Obstrucción grave', definicion: 'Ausencia de tos eficaz, llanto o voz, con dificultad respiratoria progresiva; exige intervención inmediata.' },
    ],
    flashcards: [
      { frente: '¿Por qué no se hacen compresiones abdominales en el lactante?', reverso: 'Por el riesgo de lesión hepática: el hígado es grande y está poco protegido.' },
      { frente: 'Ciclo de la OVACE en el lactante', reverso: '5 golpes interescapulares + 5 compresiones torácicas, repitiendo.' },
      { frente: '¿A partir de qué edad se usan compresiones abdominales?', reverso: 'A partir del año de edad, dentro del ciclo de 5 golpes dorsales + 5 compresiones abdominales.' },
      { frente: 'Si el niño pierde la conciencia, ¿qué se hace?', reverso: 'Al suelo, activar el 911 e iniciar RCP, mirando la boca antes de cada ventilación.' },
    ],
    quiz: [
      {
        pregunta: 'Lactante de 8 meses que se atraganta con un trozo de salchicha: no llora, no tose y se pone cianótico. ¿Qué haces?',
        opciones: [
          'Compresiones abdominales suaves.',
          'Ciclos de 5 golpes interescapulares y 5 compresiones torácicas.',
          'Barrido digital para sacar el trozo.',
          'Lo sientas y esperas a que tosa.',
        ],
        correcta: 1,
        explicacion: 'En el menor de un año la secuencia es 5 y 5. Las compresiones abdominales están contraindicadas y el barrido a ciegas puede impactar el objeto más adentro.',
      },
      {
        pregunta: 'Un niño de 4 años con obstrucción grave sigue consciente. La secuencia indicada es:',
        opciones: [
          'Golpes dorsales únicamente, hasta que expulse el objeto.',
          'Ciclos de 5 golpes dorsales y 5 compresiones abdominales ajustadas a su tamaño.',
          'Ciclos de 5 golpes dorsales y 5 compresiones torácicas, como en el lactante.',
          'Ventilaciones de rescate.',
        ],
        correcta: 1,
        explicacion: 'A partir del año se comprime el abdomen, pero dentro del ciclo: 5 golpes dorsales y 5 compresiones abdominales. Las torácicas se reservan para el lactante y para el adulto en quien no puede rodearse el abdomen.',
      },
      {
        pregunta: '¿Cuál de estas medidas previene mejor el atragantamiento infantil?',
        opciones: [
          'Dar de comer al niño acostado para que trague más despacio.',
          'Cortar las uvas y las salchichas a lo largo y vigilar la comida sentados.',
          'Enseñarle a beber agua mientras come.',
          'Evitar por completo los alimentos sólidos hasta los 3 años.',
        ],
        correcta: 1,
        explicacion: 'Los alimentos redondos del tamaño de la vía aérea son la causa más frecuente; cortarlos longitudinalmente elimina el efecto tapón.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el manejo de la OVACE grave en un lactante consciente',
        pasos: [
          'Confirmar que no tose ni llora',
          'Colocarlo boca abajo sobre el antebrazo, cabeza más baja',
          'Dar 5 golpes interescapulares',
          'Voltearlo boca arriba sosteniendo la cabeza',
          'Dar 5 compresiones torácicas',
          'Revisar la boca y repetir el ciclo',
        ],
      },
    },
  },

  'm1-pai-intoxicaciones': {
    icono: '☠️',
    duracion: '16 min',
    resumen: 'Intoxicaciones en el ámbito prehospitalario: vías de entrada, abordaje inicial y las particularidades de la fauna venenosa de México.',
    objetivos: [
      'Identificar la vía de entrada del tóxico y su implicación en el manejo.',
      'Aplicar las medidas iniciales sin poner en riesgo al equipo.',
      'Reconocer las intoxicaciones más frecuentes en México y su tratamiento específico.',
    ],
    secciones: [
      {
        titulo: 'Vías de entrada y qué cambia cada una',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Vía', 'Ejemplos', 'Prioridad inicial'],
            filas: [
              ['Ingestión', 'Medicamentos, cáusticos, plaguicidas', 'Vía aérea; NO provocar vómito'],
              ['Inhalación', 'Monóxido de carbono, humo, gases', 'Retirar de la fuente; oxígeno'],
              ['Contacto', 'Plaguicidas, cáusticos', 'Descontaminar: retirar ropa y lavar'],
              ['Inyectada', 'Picaduras, mordeduras, drogas', 'Inmovilizar la zona; traslado'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La escena primero, siempre', texto: 'En intoxicación por inhalación o por plaguicidas, el rescatador es la siguiente víctima si entra sin protección. Espacios confinados, olor a solvente o varias personas afectadas a la vez son señal de alto: se requiere equipo especializado.' },
        ],
      },
      {
        titulo: 'Medidas iniciales y errores clásicos',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué NO se hace',
            items: [
              'Provocar el vómito: en cáusticos daña dos veces y en depresores del sistema nervioso favorece la broncoaspiración.',
              'Dar «antídotos caseros»: leche, aceite, clara de huevo o bicarbonato.',
              'Neutralizar un ácido con una base o al revés: la reacción es exotérmica y quema más.',
              'Perder tiempo buscando el antídoto en la escena.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Qué sí',
            items: [
              'Asegurar la escena y usar protección personal.',
              'Retirar al paciente de la fuente y descontaminar si procede.',
              'Valorar y sostener vía aérea, ventilación y circulación.',
              'Recoger envases, etiquetas o restos: identifican el tóxico mejor que cualquier descripción.',
              'Registrar hora, cantidad estimada y vía; trasladar y notificar.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'México: apoyo toxicológico', texto: 'El 911 puede enlazar con el centro toxicológico de la entidad. Varias instituciones operan centros de información toxicológica; conviene tener a mano el número de la región, porque el consejo especializado cambia el manejo en los primeros minutos.' },
        ],
      },
      {
        titulo: 'Fauna venenosa de México',
        bloques: [
          { tipo: 'p', texto: 'México concentra una de las mayores diversidades de alacranes de importancia médica del mundo, y cuenta con antivenenos de producción nacional (faboterápicos) que son el tratamiento específico. El manejo prehospitalario es de soporte y traslado: el antiveneno se administra en la unidad médica.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que le toca al TUM', texto: 'Graduar y trasladar. El faboterápico se administra por vía intravenosa en la unidad médica y su dosificación es decisión médica; lo que cambia el pronóstico desde la ambulancia es reconocer el grado, no retrasar el traslado y avisar al hospital para que tenga el antiveneno listo.' },
          {
            tipo: 'tabla',
            titulo: 'Picadura de alacrán (Centruroides sp.) — graduación clínica',
            headers: ['Grado', 'Signos y síntomas'],
            filas: [
              ['I — Leve', 'Dolor local, parestesias locales y a distancia, prurito nasal y faríngeo'],
              ['II — Moderado', 'Lo del grado I más: sensación de cuerpo extraño en orofaringe, sialorrea, diaforesis, nistagmus, fasciculaciones linguales, disnea, distensión abdominal, priapismo, espasmos musculares'],
              ['III — Severo', 'Lo del grado II más: taquicardia, hipertensión, visión de halos rojos, ceguera transitoria, vómitos, dolor retroesternal, edema agudo pulmonar, insuficiencia respiratoria'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Poblaciones de riesgo en alacranismo', texto: 'Los menores de 5 años son el grupo crítico: se les traslada de inmediato a una unidad de segundo nivel o de mayor capacidad resolutiva. Igual de prioritarios: mayores de 65 años, embarazadas y pacientes con cardiopatía, asma, insuficiencia renal, cirrosis, diabetes o hipertensión, y cualquiera que progrese rápido de grado I a II.' },
          {
            tipo: 'tabla',
            titulo: 'Arañas y serpientes de importancia médica en México',
            headers: ['Agente', 'Cuadro que debes reconocer', 'Prehospitalario'],
            filas: [
              ['Viuda negra (Latrodectus mactans)', 'Dolor en el sitio y en miembros inferiores, abdomen o región lumbar; diaforesis, sialorrea, astenia. Grave: trismus, midriasis o miosis, rigidez generalizada, broncoconstricción', 'Soporte y traslado; el antiveneno se administra en la unidad médica'],
              ['Violinista (Loxosceles sp.)', 'Mordedura casi indolora que puede pasar desapercibida; en las horas siguientes aparece la lesión con halo rojo, zona isquémica y centro necrótico', 'Lavado, traslado; el loxoscelismo sistémico es emergencia'],
              ['Víbora (Crotalus, Bothrops, Agkistrodon, Sistrurus)', 'Huellas de colmillos y dolor; el edema progresivo, las flictenas, el sangrado y la afectación sistémica marcan la gravedad', 'Marcar el borde del edema con la hora; inmovilizar; traslado'],
              ['Coralillo (Micrurus sp.)', 'Poco dolor local pero cuadro neurotóxico: ptosis, oftalmoplejía, visión borrosa, disfagia, voz débil, parálisis flácida y dificultad respiratoria', 'Vigilar la ventilación: puede llevar a paro respiratorio; traslado urgente'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué medir el edema en la mordedura de víbora', texto: 'La graduación del ofidismo se apoya en la extensión del edema y en su progresión. Marcar el borde con pluma y anotar la hora convierte una impresión en un dato objetivo, y es de lo poco que el hospital no puede reconstruir si no se hizo en la escena.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los grados exactos los define el protocolo, no esta página', texto: 'La escala numérica de graduación —cuántos centímetros de edema separan un grado de otro—, la indicación del antiveneno, su dosis y el tiempo de respuesta esperado pertenecen al protocolo terapéutico y a la información para prescribir del producto que use el servicio. Una versión anterior de esta lección tomaba esos datos de la página comercial de un fabricante: se retiraron. Lo que aquí se enseña es el reconocimiento y la conducta prehospitalaria de soporte y traslado.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace con una mordedura o picadura', texto: 'Nada de torniquete, incisiones, succión, hielo directo ni electricidad. Todas esas maniobras aumentan el daño local sin retirar veneno. Se inmoviliza el miembro a la altura del corazón, se retiran anillos y se traslada.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Serpientes', texto: 'En mordedura por víbora de cascabel o nauyaca, marcar con pluma el borde de la inflamación y la hora permite al hospital medir la progresión. Ese dato sencillo orienta la dosis de faboterápico.' },
        ],
      },
      FUENTES_TOXICOLOGIA_BASICA,
    ],
    conceptosClave: [
      { termino: 'Descontaminación', definicion: 'Retirada del tóxico de la superficie corporal —ropa, lavado con agua abundante— antes de cualquier otra maniobra en exposición por contacto.' },
      { termino: 'Faboterápico', definicion: 'Antiveneno de fragmentos de anticuerpo, de producción nacional en México, específico para alacrán, arañas y serpientes.' },
      { termino: 'Toxíndrome', definicion: 'Conjunto de signos que orienta a una familia de tóxicos y permite tratar antes de conocer la sustancia exacta.' },
    ],
    flashcards: [
      { frente: '¿Por qué no se provoca el vómito en una intoxicación?', reverso: 'En cáusticos daña dos veces y en depresores favorece la broncoaspiración.' },
      { frente: 'Picadura de alacrán: ¿torniquete sí o no?', reverso: 'No. Inmovilizar, no comprimir, y trasladar con urgencia.' },
      { frente: '¿Qué se recoge de la escena en una intoxicación?', reverso: 'Envases, etiquetas o restos: identifican el tóxico mejor que cualquier descripción.' },
      { frente: '¿Qué aporta marcar el borde de la inflamación en una mordedura de víbora?', reverso: 'Permite medir la progresión y orienta la dosis de faboterápico.' },
      { frente: 'Varias personas afectadas a la vez en un espacio cerrado: ¿qué sugiere?', reverso: 'Tóxico inhalado: no entrar sin protección, es una escena insegura.' },
    ],
    quiz: [
      {
        pregunta: 'Niño que bebió un limpiador con sosa cáustica hace 10 minutos. Está consciente y llora. ¿Qué haces?',
        opciones: [
          'Provocas el vómito de inmediato.',
          'Le das leche para neutralizar.',
          'No provocas vómito, vigilas la vía aérea, recoges el envase y trasladas.',
          'Le das vinagre para neutralizar la sosa.',
        ],
        correcta: 2,
        explicacion: 'El cáustico quema al bajar y volvería a quemar al subir. Neutralizar con un ácido genera una reacción exotérmica. Lo útil es soporte, el envase y el traslado.',
      },
      {
        pregunta: 'Encuentras a dos trabajadores inconscientes dentro de una cisterna. ¿Cuál es tu primera acción?',
        opciones: [
          'Bajar rápido y sacar al más cercano.',
          'No entrar: activar recurso especializado en espacios confinados y acordonar.',
          'Bajar conteniendo la respiración.',
          'Arrojar una cuerda y pedirles que suban.',
        ],
        correcta: 1,
        explicacion: 'Dos víctimas inconscientes en un espacio confinado es el patrón clásico de atmósfera deficiente o tóxica. Entrar sin equipo autónomo convierte al rescatador en la tercera víctima.',
      },
      {
        pregunta: 'Mordedura de víbora en antebrazo hace 20 minutos, con inflamación progresiva. ¿Qué haces?',
        opciones: [
          'Torniquete por encima de la mordedura.',
          'Incisión y succión del veneno.',
          'Retirar anillos, inmovilizar el brazo, marcar el borde de la inflamación con la hora y trasladar.',
          'Aplicar hielo directo sobre la mordedura.',
        ],
        correcta: 2,
        explicacion: 'Torniquete, incisión, succión y hielo aumentan el daño local sin retirar veneno. Retirar anillos previene isquemia por edema, y marcar el borde documenta la progresión.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente rociado con plaguicida organofosforado en el campo. Llega con sialorrea y miosis. ¿Qué haces antes de subirlo a la ambulancia?',
          opciones: [
            'Subirlo de inmediato con la ropa puesta.',
            'Retirar la ropa contaminada y lavar la piel con agua abundante, con protección personal.',
            'Darle a beber agua para diluir el tóxico.',
            'Provocarle el vómito.',
          ],
          correcta: 1,
          explicacion: 'Sin descontaminar, el tóxico sigue absorbiéndose y contamina la unidad y al equipo. La descontaminación precede al traslado.',
        },
      ],
    },
  },

  'm1-smu-bienestar-tum': {
    icono: '🧘',
    duracion: '13 min',
    resumen: 'El bienestar del TUM como parte del trabajo: riesgos reales del oficio, estrés agudo y acumulado, y prácticas que sostienen una carrera larga.',
    objetivos: [
      'Reconocer los riesgos físicos, biológicos y psicológicos del trabajo prehospitalario.',
      'Distinguir la reacción de estrés agudo del desgaste acumulado.',
      'Aplicar medidas de protección personal y de higiene del sueño y la carga.',
    ],
    secciones: [
      {
        titulo: 'Los riesgos del oficio',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuatro familias',
            items: [
              'Físicos: lesiones de espalda por levantamiento, atropellos en vía pública, caídas.',
              'Biológicos: exposición a sangre y fluidos, patógenos por vía aérea.',
              'Químicos y ambientales: humos, plaguicidas, materiales peligrosos.',
              'Psicosociales: escenas de alto impacto, agresiones, turnos y privación de sueño.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La lesión más frecuente no es la más dramática', texto: 'La espalda es lo que más carreras termina. Levantar con las piernas, acercar la carga al cuerpo, no girar el tronco cargando y pedir ayuda antes de intentarlo solo no es un consejo: es prevención de incapacidad.' },
        ],
      },
      {
        titulo: 'Estrés agudo y desgaste acumulado',
        bloques: [
          { tipo: 'p', texto: 'La reacción de estrés agudo aparece durante o justo después de una escena crítica: taquicardia, visión de túnel, sensación de irrealidad, dificultad para tomar decisiones. Es una respuesta fisiológica esperable y se resuelve en horas o días.' },
          { tipo: 'p', texto: 'El desgaste acumulado es otra cosa: se instala en semanas o meses. Cinismo, distancia con los pacientes, irritabilidad, insomnio, consumo de alcohol para dormir, sensación de que el trabajo no sirve para nada. No se resuelve descansando un día.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Señales que obligan a pedir ayuda', texto: 'Pesadillas o recuerdos intrusivos persistentes, evitar salidas o compañeros, aumento del consumo de alcohol o sustancias, ideas de que no vale la pena seguir. Buscar apoyo profesional en ese punto no es debilidad: es lo mismo que inmovilizar una fractura antes de que desplace.' },
        ],
      },
      {
        titulo: 'Lo que sí sostiene una carrera',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Protección personal sistemática: guantes en todo contacto, protección ocular y respiratoria cuando corresponda.',
              'Esquema de vacunación al día, en particular hepatitis B y toxoide tetánico.',
              'Protocolo claro ante exposición a fluidos: notificar de inmediato, no callarlo.',
              'Sueño protegido entre turnos y alimentación regular durante la jornada.',
              'Hablar del servicio difícil con el equipo, sin convertirlo en anécdota ni en tabú.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'México: NOM-034', texto: 'La NOM-034-SSA3-2013 establece requisitos de personal, equipamiento y condiciones de las ambulancias. Que la unidad cumpla la norma también es una medida de seguridad del propio TUM, no solo del paciente.' },
        ],
      },
      {
        titulo: 'Qué hacer ante una exposición ocupacional',
        bloques: [
          { tipo: 'p', texto: 'Un pinchazo con material usado, una salpicadura en mucosa o el contacto con sangre sobre piel no íntegra son exposiciones ocupacionales y se manejan como una urgencia del propio trabajador. El error habitual no es técnico: es callarlo por vergüenza o por no interrumpir el servicio.' },
          {
            tipo: 'pasos',
            titulo: 'Conducta inmediata',
            items: [
              'Retirar el objeto y suspender la tarea; entregar la atención del paciente a otro miembro del equipo.',
              'Lavar la zona con agua y jabón abundante; si la exposición fue en mucosa, irrigar con agua o solución salina.',
              'No frotar ni exprimir la herida para «sacar» sangre: aumenta el daño local sin reducir el riesgo.',
              'No aplicar sustancias cáusticas ni desinfectantes agresivos sobre la herida.',
              'Notificar de inmediato al responsable del servicio y registrar el hecho por escrito.',
              'Buscar valoración médica sin retrasarlo: la indicación de profilaxis posexposición depende de una ventana de tiempo, y quien la decide es el servicio de salud, no el trabajador.',
              'Documentar, si es posible, la fuente de la exposición conforme al procedimiento del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El tiempo es la variable que sí depende de ti', texto: 'La elección del esquema, sus fármacos y su duración son decisión médica y varían según el caso y el protocolo institucional. Lo único que el trabajador controla es no retrasar la notificación ni la valoración: esa demora es la que puede eliminar la opción de una profilaxis eficaz.' },
          { tipo: 'p', texto: 'Cada servicio debe tener por escrito a quién se notifica, en qué formato y a qué unidad médica se acude. Esta lección no lo fija porque varía entre instituciones: pregúntalo en tu academia antes de necesitarlo.' },
        ],
      },
      FUENTES_BIENESTAR,
    ],
    conceptosClave: [
      { termino: 'Reacción de estrés agudo', definicion: 'Respuesta fisiológica y emocional inmediata a una escena crítica; esperable y autolimitada en horas o días.' },
      { termino: 'Desgaste profesional', definicion: 'Agotamiento acumulado con cinismo y distanciamiento, instalado en semanas o meses; no cede con un descanso puntual.' },
      { termino: 'Exposición ocupacional', definicion: 'Contacto con sangre o fluidos potencialmente infecciosos durante el trabajo; exige notificación y seguimiento inmediatos.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la lesión que más carreras termina en el medio prehospitalario?', reverso: 'La lesión de espalda por levantamiento incorrecto.' },
      { frente: 'Diferencia entre estrés agudo y desgaste acumulado', reverso: 'El agudo aparece en la escena y cede en días; el desgaste se instala en meses y no cede descansando un día.' },
      { frente: '¿Qué vacunas son clave para el TUM?', reverso: 'Hepatitis B y toxoide tetánico, con el esquema completo al día.' },
      { frente: '¿Qué norma mexicana regula la atención prehospitalaria?', reverso: 'La NOM-034-SSA3-2013.' },
    ],
    quiz: [
      {
        pregunta: 'Tras un servicio con un menor fallecido, un compañero está taquicárdico, aturdido y le cuesta decidir. ¿Qué es lo más probable?',
        opciones: [
          'Un trastorno de estrés postraumático ya establecido.',
          'Una reacción de estrés agudo, esperable y autolimitada.',
          'Desgaste profesional acumulado.',
          'Simulación para evitar el siguiente servicio.',
        ],
        correcta: 1,
        explicacion: 'Es la respuesta inmediata a una escena crítica. Lo que corresponde es relevarlo del siguiente servicio si es posible, acompañarlo y vigilar la evolución en los días siguientes.',
      },
      {
        pregunta: 'Te pinchas con una aguja usada durante un traslado. ¿Qué haces?',
        opciones: [
          'Terminas el turno y lo comentas si aparece algún síntoma.',
          'Lavas la zona, notificas de inmediato según el protocolo de exposición y buscas valoración.',
          'Te aprietas el dedo para sacar sangre y sigues.',
          'Lo anotas en la bitácora al final de la semana.',
        ],
        correcta: 1,
        explicacion: 'La profilaxis posexposición depende del tiempo. Callarlo o retrasarlo elimina la ventana en que las medidas son eficaces.',
      },
      {
        pregunta: '¿Cuál de estos es un signo de desgaste acumulado y no de estrés agudo?',
        opciones: [
          'Taquicardia durante la reanimación.',
          'Visión de túnel en la escena.',
          'Cinismo hacia los pacientes e insomnio sostenido durante meses.',
          'Temblor en las manos al terminar el servicio.',
        ],
        correcta: 2,
        explicacion: 'El cinismo y el distanciamiento mantenidos en el tiempo son el rasgo distintivo del desgaste, no de la reacción aguda.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Hay que mover a un paciente de 110 kg de la cama a la camilla y solo están tú y tu compañero. ¿Qué haces?',
          opciones: [
            'Levantarlo entre los dos flexionando la espalda.',
            'Pedir apoyo, usar sábana de traslado o tabla, y levantar con las piernas sin girar el tronco.',
            'Arrastrarlo por los brazos.',
            'Pedirle que haga el esfuerzo él solo.',
          ],
          correcta: 1,
          explicacion: 'La lesión lumbar es la principal causa de incapacidad en el gremio y casi siempre ocurre en traslados evitables como este.',
        },
      ],
    },
  },

  'm1-smu-terminologia': {
    icono: '📖',
    duracion: '12 min',
    resumen: 'Terminología médica: cómo se construye una palabra clínica y por qué descomponerla permite entender términos que nunca se han visto.',
    objetivos: [
      'Descomponer un término médico en raíz, prefijo y sufijo.',
      'Interpretar los prefijos y sufijos más frecuentes en urgencias.',
      'Usar la terminología con precisión al transferir un paciente.',
    ],
    secciones: [
      {
        titulo: 'Cómo se arma una palabra',
        bloques: [
          { tipo: 'p', texto: 'Casi todo término clínico se compone de una raíz que nombra la estructura, un prefijo que la modifica y un sufijo que indica qué le pasa. Aprender las piezas evita memorizar miles de palabras: se deducen.' },
          { tipo: 'formula', texto: 'taqui- (rápido) + card- (corazón) + -ia (estado) = taquicardia', nota: 'Mismo mecanismo: bradi- + -pnea = respiración lenta; hipo- + -glucemia = glucosa baja en sangre.' },
          {
            tipo: 'tabla',
            titulo: 'Prefijos frecuentes',
            headers: ['Prefijo', 'Significa', 'Ejemplo'],
            filas: [
              ['taqui-', 'rápido', 'taquipnea'],
              ['bradi-', 'lento', 'bradicardia'],
              ['hiper-', 'aumentado, por encima', 'hipertensión'],
              ['hipo-', 'disminuido, por debajo', 'hipotermia'],
              ['a- / an-', 'ausencia', 'apnea, anuria'],
              ['dis-', 'dificultad, alteración', 'disnea'],
              ['peri-', 'alrededor', 'pericardio'],
              ['intra-', 'dentro de', 'intraóseo'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Sufijos frecuentes',
            headers: ['Sufijo', 'Significa', 'Ejemplo'],
            filas: [
              ['-itis', 'inflamación', 'pericarditis'],
              ['-algia', 'dolor', 'cefalalgia'],
              ['-emia', 'presencia en sangre', 'hipoglucemia'],
              ['-pnea', 'respiración', 'taquipnea'],
              ['-tomía', 'incisión, corte', 'cricotirotomía'],
              ['-ectomía', 'extirpación', 'apendicectomía'],
              ['-scopia', 'visualización', 'laringoscopia'],
              ['-plejía', 'parálisis', 'hemiplejía'],
            ],
          },
        ],
      },
      {
        titulo: 'Por qué importa en la entrega del paciente',
        bloques: [
          { tipo: 'p', texto: 'La terminología no es adorno: comprime información. Decir «paciente con disnea y taquipnea de 32» transmite en cinco palabras lo que en lenguaje común ocuparía dos frases, y no deja margen a interpretación.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Precisión antes que erudición', texto: 'Usar un término del que no se está seguro es peor que describir el hallazgo con palabras sencillas. Un dato mal nombrado en la entrega puede orientar mal todo el manejo hospitalario.' },
        ],
      },
      FUENTES_TERMINOLOGIA,
    ],
    conceptosClave: [
      { termino: 'Raíz', definicion: 'Parte del término que nombra la estructura u órgano: card- (corazón), neum- (pulmón), nefr- (riñón).' },
      { termino: 'Prefijo', definicion: 'Partícula inicial que modifica la raíz indicando cantidad, posición o ausencia.' },
      { termino: 'Sufijo', definicion: 'Terminación que indica el proceso o estado: -itis, -algia, -emia, -tomía.' },
    ],
    flashcards: [
      { frente: '¿Qué significa el sufijo -itis?', reverso: 'Inflamación (pericarditis: inflamación del pericardio).' },
      { frente: 'Descompón «taquipnea»', reverso: 'taqui- (rápido) + -pnea (respiración) = respiración rápida.' },
      { frente: '¿Qué significa el prefijo dis-?', reverso: 'Dificultad o alteración (disnea: dificultad respiratoria).' },
      { frente: 'Diferencia entre -tomía y -ectomía', reverso: '-tomía es cortar o abrir; -ectomía es extirpar.' },
    ],
    quiz: [
      {
        pregunta: '¿Qué significa «bradipnea»?',
        opciones: ['Respiración rápida', 'Respiración lenta', 'Ausencia de respiración', 'Dificultad respiratoria'],
        correcta: 1,
        explicacion: 'bradi- (lento) + -pnea (respiración). La ausencia sería apnea y la dificultad, disnea.',
      },
      {
        pregunta: 'Un paciente presenta «hipoglucemia». Descompuesto significa:',
        opciones: [
          'Exceso de glucosa en sangre.',
          'Glucosa disminuida en sangre.',
          'Ausencia de glucosa en orina.',
          'Inflamación del páncreas.',
        ],
        correcta: 1,
        explicacion: 'hipo- (disminuido) + gluc- (glucosa) + -emia (en sangre).',
      },
      {
        pregunta: '«Cricotirotomía» indica:',
        opciones: [
          'Extirpación del cartílago cricoides.',
          'Visualización de la laringe.',
          'Incisión a través de la membrana cricotiroidea.',
          'Inflamación de la tiroides.',
        ],
        correcta: 2,
        explicacion: 'El sufijo -tomía es incisión o corte; si fuera extirpación sería -ectomía.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El sufijo ___ indica dolor, como en cefalalgia.',
          opciones: ['-itis', '-algia', '-emia', '-pnea'],
          correcta: 1,
          explicacion: '-algia es dolor; -itis sería inflamación.',
        },
      ],
    },
  },

  // El EXAMEN del Módulo 1 no lleva lección. Antes tenía prosa, dos preguntas
  // sobre el funcionamiento de la plataforma y tarjetas: material que no
  // pertenece al plan de estudios y que además evaluaba el software en vez de
  // los primeros auxilios. Su configuración —alcance, banco, reparto,
  // retroalimentación y pendientes— vive en `evaluaciones.js`, junto a la de
  // los otros diez exámenes del plan.
  'm1-examen-aplicacion': {
    icono: '📝',
  },
}
