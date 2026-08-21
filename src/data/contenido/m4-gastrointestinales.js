// ============================================================
//  Módulo 4 · Urgencias gastrointestinales
// ------------------------------------------------------------
//  Unidad completa (3 semanas, 15 horas), en el orden del PDF: exploración
//  abdominal y abdomen agudo, apendicitis, pancreatitis, gastritis y colitis,
//  colelitiasis y colecistitis, deshidratación, oclusión intestinal, sangrado
//  de tubo digestivo, y cirrosis y hepatitis.
//
//  Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json para
//  `m4-urgencias-gastrointestinales`: primarias OMS BEC y AMLS 4; requiere
//  protocolo local; nota expresa: «La academia debe identificar el Manual de
//  Urgencias Jiménez antes de citarlo».
//
//  Esa nota se cumple por omisión: el «Manual de Urgencias Jiménez» NO se cita
//  en ninguna parte de este archivo. La biblioteca de la academia contiene el
//  Manual de urgencias de Bibiano Guillén, que es una obra distinta y así se
//  declara; renombrarlo como «Jiménez» sería fabricar una referencia.
//
//  REPARTO DE AUTORIDAD EN ESTE ARCHIVO
//
//  · La CONDUCTA PREHOSPITALARIA —qué se reconoce, qué se sostiene, qué se
//    vigila, adónde se traslada— se apoya en OMS/CICR Basic Emergency Care,
//    que es público y consultable.
//  · La DEFINICIÓN, la FISIOPATOLOGÍA y la PRESENTACIÓN CLÍNICA se apoyan en
//    Bibiano 3.ª ed., citado con capítulo y página impresa VERIFICADOS sobre
//    la copia de la biblioteca de la academia. Es un manual hospitalario: no
//    sostiene ninguna conducta de campo ni ninguna dosis.
//  · AMLS 4 figura como apoyo curricular asignado, con página pendiente, y no
//    sostiene ninguna afirmación.
//
//  Aquí no hay dosis, concentraciones, velocidades de infusión ni criterios
//  numéricos de gravedad. Las decisiones sobre analgesia, fluidos e ingesta
//  oral quedan expresamente remitidas al protocolo del servicio: son las tres
//  que más varían entre servicios y las que más daño hacen si se memorizan de
//  una lección.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const WHO_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público del que proceden el abordaje ABCDE, el reconocimiento del paciente agudo y el '
    + 'principio de reevaluación tras cada intervención. Gobierna la conducta prehospitalaria de esta '
    + 'unidad.',
}
const WHO_PREHOSPITAL_2026 = {
  nombre: 'World Health Organization. Prehospital emergency care: pocket reference, 2026.',
  url: 'https://www.who.int/publications/b/82620',
  nota: 'Referencia clínica prehospitalaria asignada por el registro académico. PENDIENTE: sección y '
    + 'página exactas; no se consultó el texto completo, de modo que no sostiene por sí sola ninguna '
    + 'afirmación de esta unidad.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Fuente de APOYO curricular asignada por el registro. Capítulo y página PENDIENTES: solo puede '
    + 'precisarlos quien consulte la copia licenciada de la academia. No sostiene ninguna afirmación.',
}
const NOM_034_SOLUCIONES = {
  nombre: 'DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): '
    + 'Apéndice Normativo A.4, soluciones.',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5361072&fecha=23/09/2014',
  nota: 'Texto consultado en el DOF el 16 de agosto de 2026. El numeral A.4.2 incluye electrolitos '
    + 'orales en la dotación mínima de toda ambulancia terrestre. Es una norma de dotación: no enuncia '
    + 'indicación, población, cantidad ni pauta.',
}

// Apoyo secundario HOSPITALARIO. Capítulo y página impresa verificados el 17 de
// agosto de 2026 sobre la copia de la biblioteca de la academia. Fundamenta
// definición, fisiopatología y presentación clínica; NO conducta prehospitalaria.
const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y presentación '
    + 'clínica. No se usa para conducta prehospitalaria ni para dosis. Obra distinta del «Manual de '
    + 'Urgencias Jiménez» que cita el plan y que sigue sin identificar. Capítulo y página impresa '
    + 'verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ninguna dosis, concentración, velocidad de infusión ni criterio '
  + 'numérico de gravedad. La analgesia, los fluidos y la ingesta oral se remiten expresamente al '
  + 'protocolo del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: la lección enseña reconocimiento sindrómico, gravedad, '
  + 'estabilización, reevaluación, comunicación y destino. No traslada al campo pruebas ni '
  + 'tratamientos hospitalarios y no presenta la impresión de campo como diagnóstico.'
const NO_JIMENEZ = 'El «Manual de Urgencias Jiménez» que cita el plan sigue sin identificar y NO se '
  + 'cita en esta unidad. El manual de urgencias de la biblioteca de la academia es el de Bibiano '
  + 'Guillén, obra distinta, y así se declara en cada referencia.'

const BLOQUE_PROTOCOLO = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Las tres decisiones que no se aprenden aquí',
  texto: 'Si se administra analgesia, si se aportan líquidos por vía intravenosa y si se permite la '
    + 'ingesta oral son las tres decisiones que más varían entre servicios en las urgencias '
    + 'abdominales. Dependen del alcance profesional, del formulario, del equipo y de la dirección '
    + 'médica, y esta lección no las resuelve: las remite al protocolo. Lo que sí se enseña es qué '
    + 'observar para que esa decisión se tome con información y qué vigilar después de tomarla.',
}

const ficha = ({ capitulos, extra = [], estado = 'en_revision' }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'OMS/CICR Basic Emergency Care 2018; Bibiano, Manual de urgencias, 3.ª ed., 2018 '
    + `(${capitulos}); AMLS 4.ª ed. como apoyo con página pendiente`,
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    AMBITO,
    SIN_CIFRAS,
    NO_JIMENEZ,
    'Las páginas de Bibiano se verificaron abriendo la copia de la biblioteca de la academia el 17 de '
      + 'agosto de 2026; no se transcribieron tablas ni párrafos extensos.',
    ...extra,
  ],
  fuentes: [
    'WHO/ICRC. Basic Emergency Care, 2018.',
    `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018 (${capitulos}).`,
    'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
    'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
  ],
})

export default {
  // ============================================================
  //  Exploración abdominal y abdomen agudo
  // ============================================================
  'm4-gi-exploracion-abdominal': {
    icono: 'cp-servier-hepatomegalia',
    duracion: '20 min',
    resumen: 'Cómo se explora el abdomen en la calle, por qué su orden es distinto al del tórax y qué '
      + 'signos de alarma convierten un dolor abdominal en un paciente tiempo-dependiente.',
    objetivos: [
      'Ejecutar la exploración abdominal en el orden correcto y justificar ese orden.',
      'Caracterizar un dolor abdominal de forma sistemática.',
      'Identificar los signos de alarma que obligan a priorizar el traslado.',
      'Distinguir el concepto de abdomen agudo de un diagnóstico concreto.',
    ],
    secciones: [
      {
        titulo: 'Qué es un abdomen agudo',
        bloques: [
          { tipo: 'p', texto: 'Se llama abdomen agudo al cuadro de dolor abdominal de instauración reciente que puede requerir una intervención urgente, con frecuencia quirúrgica. No es un diagnóstico: es una categoría de alarma que agrupa causas muy distintas y que sirve para decidir el ritmo de la atención, no el tratamiento.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta prehospitalaria', texto: 'En la calle no se decide qué víscera está enferma, porque eso exige laboratorio e imagen. Se decide otra cosa, y es lo que cambia el desenlace: si este paciente está estable o inestable, si hay signos de alarma y con qué prioridad se traslada.' },
          { tipo: 'p', texto: 'La causa puede estar fuera del abdomen. Un dolor epigástrico puede corresponder a un problema cardiaco, y un dolor abdominal bajo en una mujer en edad fértil obliga a considerar una causa ginecológica u obstétrica. Cerrar la hipótesis en el aparato digestivo por la localización del dolor es uno de los errores más frecuentes del cuadro.' },
        ],
      },
      {
        titulo: 'La exploración, en su orden',
        bloques: [
          { tipo: 'p', texto: 'El abdomen se explora en un orden distinto al del tórax: inspección, auscultación y después palpación. La razón es práctica y no ceremonial. Palpar antes de auscultar modifica los ruidos intestinales, de modo que la información que se obtendría después ya no describe la situación basal del paciente. Además, palpar primero aumenta la defensa y el dolor, y con ello se pierde la colaboración para el resto de la exploración.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia',
            items: [
              'INSPECCIÓN. Actitud del paciente —inmóvil, inquieto, en posición antiálgica—, distensión, cicatrices de cirugías previas, coloración, heridas, hematomas y masas visibles.',
              'AUSCULTACIÓN. Presencia y carácter de los ruidos intestinales: normales, aumentados y de lucha, o ausentes.',
              'PALPACIÓN. Superficial primero y profunda después, empezando SIEMPRE por la zona más alejada del dolor y terminando en la que el paciente señala.',
              'Búsqueda de los signos que orientan hacia un foco: se exploran al final, porque son los que más molestan.',
              'Registro con hora del hallazgo, para poder demostrar después si el cuadro cambió.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Empezar lejos del dolor', texto: 'Si la palpación comienza donde más duele, el paciente contrae la pared de forma voluntaria y el resto de la exploración deja de ser interpretable. Empezar por el cuadrante opuesto y avanzar hacia el dolor conserva la información y la confianza del paciente.' },
          {
            tipo: 'tabla',
            titulo: 'Signos clásicos y hacia dónde orientan',
            headers: ['Signo', 'Cómo se busca', 'Hacia qué orienta'],
            filas: [
              ['Murphy', 'Dolor en el hipocondrio derecho con la inspiración profunda durante la palpación', 'Patología biliar'],
              ['Blumberg', 'Dolor al retirar bruscamente la mano tras presionar la pared', 'Irritación del peritoneo'],
              ['Rovsing', 'Dolor referido a la fosa ilíaca derecha al presionar la izquierda', 'Apendicitis'],
              ['Psoas', 'Dolor al flexionar el muslo contra resistencia', 'Foco retrocecal o retroperitoneal'],
              ['Obturador', 'Dolor al rotar el muslo flexionado', 'Afectación retroperitoneal o pélvica'],
            ],
          },
          { tipo: 'p', texto: 'Ninguno de estos signos confirma una enfermedad. Todos orientan, todos pueden faltar en un paciente que sí tiene la enfermedad y todos pueden aparecer en uno que no la tiene, especialmente en el adulto mayor y en el paciente con alteración del estado de alerta.' },
        ],
      },
      {
        titulo: 'Caracterizar el dolor',
        bloques: [
          { tipo: 'p', texto: 'Una anamnesis del dolor hecha siempre igual produce información comparable entre prestadores y entre momentos. El esquema más difundido en urgencias recorre seis rasgos, recordados con la palabra ALICIA.' },
          {
            tipo: 'lista',
            titulo: 'ALICIA',
            items: [
              'A de Aparición: cuándo empezó y si fue brusco o progresivo.',
              'L de Localización: dónde empezó y dónde está ahora, porque el desplazamiento del dolor es en sí mismo un dato.',
              'I de Intensidad: cuánto duele, con la escala que use el servicio, y cómo ha cambiado.',
              'C de Características: cólico, continuo, opresivo, urente.',
              'I de Irradiación: hacia dónde se propaga.',
              'A de Asociado con: qué lo acompaña, qué lo empeora y qué lo alivia; incluye vómito, fiebre, cambios en las deposiciones y síntomas urinarios o ginecológicos.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El dolor que se mueve', texto: 'Un dolor que empieza difuso alrededor del ombligo o en el epigastrio y horas después se localiza en un punto concreto describe una evolución típica de la irritación peritoneal. Preguntar «¿dónde empezó?» además de «¿dónde le duele?» recoge un dato que se pierde si solo se anota la localización actual.' },
        ],
      },
      {
        titulo: 'Signos de alarma y conducta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que convierte el cuadro en tiempo-dependiente',
            items: [
              'Signos de hipoperfusión: piel fría, pálida o moteada, relleno capilar lento.',
              'Taquicardia mantenida o hipotensión.',
              'Alteración del estado de alerta.',
              'Alteración marcada de la frecuencia respiratoria, en cualquiera de los dos sentidos.',
              'Distensión abdominal importante.',
              'Ruidos intestinales de lucha o, al contrario, ausentes.',
              'Masa abdominal pulsátil, o ausencia o asimetría de pulsos periféricos.',
              'Antecedente traumático, hematomas o heridas en la pared.',
              'Cambio brusco en las características del dolor, o dolor de más de seis horas de evolución.',
            ],
          },
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Conducta prehospitalaria',
            items: [
              'Valoración primaria completa antes de centrarse en el abdomen: el problema puede estar en otra parte.',
              'Posición en que el paciente esté más cómodo, salvo que otra condición lo impida.',
              'Vigilancia de la perfusión y del estado de alerta, además del dolor.',
              'Anamnesis dirigida: antecedentes quirúrgicos, tratamiento habitual, última ingesta y, en mujeres en edad fértil, posibilidad de embarazo.',
              'Decisiones sobre analgesia, líquidos e ingesta oral conforme al protocolo del servicio.',
              'Traslado con prealerta ante signos de alarma; informe centrado en la evolución del dolor y en el estado circulatorio.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La analgesia y el mito de enmascarar', texto: 'Durante años se sostuvo que aliviar el dolor abdominal impedía valorar al paciente. Los esquemas actuales de urgencias incluyen la valoración y el alivio del dolor dentro del soporte inicial. Aun así, si el prestador puede administrar analgesia, con qué producto y en qué situación no lo decide esta lección: lo decide su alcance profesional y el protocolo de su servicio.' },
        ],
      },
      F([WHO_BEC, bibiano(14, 'Dolor abdominal agudo', 136), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Abdomen agudo', definicion: 'Cuadro de dolor abdominal de instauración reciente que puede requerir intervención urgente. Es una categoría de alarma, no un diagnóstico.' },
      { termino: 'Orden de la exploración abdominal', definicion: 'Inspección, auscultación y palpación: se ausculta antes de palpar porque la palpación modifica los ruidos intestinales.' },
      { termino: 'ALICIA', definicion: 'Esquema para caracterizar el dolor: Aparición, Localización, Intensidad, Características, Irradiación y Asociado con.' },
      { termino: 'Signo de Blumberg', definicion: 'Dolor al retirar bruscamente la mano tras presionar la pared abdominal; orienta hacia irritación del peritoneo.' },
      { termino: 'Signos de alarma', definicion: 'Hallazgos que convierten un dolor abdominal en un cuadro tiempo-dependiente, encabezados por la hipoperfusión y la alteración del estado de alerta.' },
      { termino: 'Dolor referido y migratorio', definicion: 'Dolor cuya localización inicial difiere de la actual; el desplazamiento es en sí mismo un dato que se pierde si solo se anota dónde duele ahora.' },
    ],
    flashcards: [
      { frente: '¿Por qué se ausculta el abdomen antes de palparlo?', reverso: 'Porque la palpación modifica los ruidos intestinales, y entonces la auscultación posterior ya no describe la situación basal.' },
      { frente: '¿Por dónde se empieza a palpar?', reverso: 'Por la zona más alejada del dolor, terminando en la que el paciente señala; empezar donde duele hace que contraiga la pared y se pierda la información.' },
      { frente: '¿Qué significa ALICIA?', reverso: 'Aparición, Localización, Intensidad, Características, Irradiación y Asociado con: el esquema para caracterizar un dolor.' },
      { frente: '¿Es el abdomen agudo un diagnóstico?', reverso: 'No: es una categoría de alarma que agrupa causas distintas y sirve para decidir el ritmo de la atención.' },
      { frente: '¿Puede un dolor abdominal tener causa fuera del abdomen?', reverso: 'Sí: un dolor epigástrico puede ser cardiaco y un dolor abdominal bajo en una mujer en edad fértil obliga a considerar causa ginecológica u obstétrica.' },
      { frente: '¿Confirma el signo de Rovsing una apendicitis?', reverso: 'No: orienta. Puede faltar en quien la tiene y aparecer en quien no, sobre todo en el adulto mayor.' },
    ],
    quiz: [
      {
        pregunta: 'Llegas ante un paciente con dolor abdominal. ¿En qué orden exploras el abdomen?',
        opciones: [
          'Inspección, palpación y auscultación.',
          'Inspección, auscultación y palpación, porque la palpación modifica los ruidos intestinales.',
          'Palpación primero, para localizar el dolor cuanto antes.',
          'Auscultación únicamente, porque la palpación no aporta en la calle.',
        ],
        correcta: 1,
        explicacion: 'El abdomen se explora en un orden distinto al del tórax: se ausculta antes de palpar, porque palpar antes modifica los ruidos intestinales y aumenta la defensa del paciente.',
      },
      {
        pregunta: 'El paciente señala la fosa ilíaca derecha como zona de máximo dolor. ¿Dónde empiezas a palpar?',
        opciones: [
          'Justo en la fosa ilíaca derecha, para confirmarlo.',
          'En la zona más alejada del dolor, avanzando hacia ella.',
          'En el epigastrio siempre, sea cual sea el dolor.',
          'No se palpa si el paciente ya localiza el dolor.',
        ],
        correcta: 1,
        explicacion: 'Empezar donde más duele hace que el paciente contraiga la pared de forma voluntaria y el resto de la exploración deja de ser interpretable.',
      },
      {
        pregunta: 'Mujer de 26 años con dolor abdominal bajo de horas de evolución. ¿Qué no puede faltar en tu anamnesis?',
        opciones: [
          'El tipo de dieta de los últimos días.',
          'La posibilidad de embarazo, porque un dolor abdominal bajo en una mujer en edad fértil obliga a considerar causa ginecológica u obstétrica.',
          'El número de deposiciones del mes.',
          'La marca del analgésico que suele tomar.',
        ],
        correcta: 1,
        explicacion: 'Cerrar la hipótesis en el aparato digestivo por la localización del dolor es uno de los errores más frecuentes; la anamnesis dirigida incluye la posibilidad de embarazo.',
      },
      {
        pregunta: 'Un compañero se niega a valorar la analgesia «para no enmascarar el abdomen». ¿Qué respondes?',
        opciones: [
          'Que tiene razón y debe evitarse siempre.',
          'Que los esquemas actuales de urgencias incluyen la valoración y el alivio del dolor en el soporte inicial, aunque si él puede administrarla y con qué producto lo decide su alcance profesional y el protocolo.',
          'Que debe administrarla en todos los casos.',
          'Que la decisión corresponde al propio paciente.',
        ],
        correcta: 1,
        explicacion: 'La idea de que aliviar el dolor impide valorar al paciente quedó superada, pero la administración sigue dependiendo del alcance profesional y del protocolo del servicio.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la exploración abdominal dirigida',
        pasos: [
          'Inspección: actitud, distensión, cicatrices y heridas',
          'Auscultación: presencia y carácter de los ruidos intestinales',
          'Palpación superficial desde la zona más alejada del dolor',
          'Palpación profunda avanzando hacia la zona dolorosa',
          'Búsqueda de los signos que orientan hacia un foco',
          'Registro del hallazgo con la hora',
        ],
      },
    },
    revision: ficha({
      capitulos: 'cap. 14, p. 136',
      extra: [
        'Los signos clásicos y el esquema ALICIA proceden del capítulo 14 de Bibiano, p. 135-136, '
          + 'verificado. La conducta prehospitalaria procede de Basic Emergency Care.',
        'DECISIÓN PENDIENTE: la academia debe declarar si sus alumnos pueden administrar analgesia y '
          + 'líquidos en el dolor abdominal, con qué producto y bajo qué dirección médica.',
      ],
    }),
  },

  // ============================================================
  //  Apendicitis
  // ============================================================
  'm4-gi-apendicitis': {
    icono: 'cp-servier-colon',
    duracion: '16 min',
    resumen: 'Cómo evoluciona una apendicitis, por qué su presentación típica falta en la mitad de los '
      + 'casos y qué debe hacer el prestador con una sospecha que no puede confirmar.',
    objetivos: [
      'Describir el mecanismo por el que se produce una apendicitis aguda.',
      'Reconocer la secuencia clínica típica y sus presentaciones atípicas.',
      'Identificar los signos que sugieren complicación.',
      'Justificar la conducta prehospitalaria ante una sospecha no confirmable.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre en el apéndice',
        bloques: [
          { tipo: 'p', texto: 'La apendicitis aguda es la inflamación del apéndice cecal y la causa más frecuente de abdomen agudo quirúrgico. La explicación más aceptada parte de la obstrucción de la luz del apéndice: al no poder vaciarse, se distiende y la presión en su interior sube. Esa presión compromete primero el drenaje venoso y linfático, lo que agrava la distensión y favorece la proliferación bacteriana; si el proceso continúa, aparecen isquemia, necrosis y finalmente perforación.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué importa esa secuencia en la calle', texto: 'La cadena obstrucción, distensión, isquemia y perforación explica que el tiempo trabaje en contra. No hace al prestador capaz de diagnosticar, pero sí de entender por qué un dolor que lleva horas y cambia de carácter merece traslado y no observación domiciliaria.' },
          { tipo: 'p', texto: 'Su incidencia máxima se sitúa entre la pubertad y la treintena, aunque puede aparecer a cualquier edad. La demora en el diagnóstico se asocia a más apéndices perforados y a mayor morbilidad, y esa demora se produce sobre todo en las presentaciones atípicas.' },
        ],
      },
      {
        titulo: 'La presentación típica y la que no lo es',
        bloques: [
          { tipo: 'p', texto: 'La secuencia clásica se conoce como cronología apendicular, y su rasgo más útil es el orden: primero el dolor, después las náuseas o el vómito, y por último la fiebre. Conviene subrayar un dato que evita errores: esa secuencia completa aparece en menos de la mitad de los casos.' },
          {
            tipo: 'lista',
            titulo: 'Cronología apendicular',
            items: [
              'Dolor abdominal que empieza de forma brusca en el epigastrio o alrededor del ombligo, es persistente y dura unas horas.',
              'Después el dolor se localiza en la fosa ilíaca derecha.',
              'Náuseas, vómito o pérdida del apetito, que aparecen DESPUÉS del dolor.',
              'Fiebre o febrícula, habitualmente no muy elevada, y que aparece en último lugar.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El orden es el dato', texto: 'Que el vómito preceda al dolor apunta en otra dirección; que el dolor preceda al vómito apoya la sospecha. Registrar en qué orden aparecieron los síntomas aporta más que registrar cuáles hay, y es información que se pierde si no se pregunta expresamente.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones en las que la presentación engaña',
            items: [
              'Localizaciones atípicas del apéndice —pélvica, retrocecal o izquierda—, que desplazan el dolor.',
              'Adultos mayores, en quienes los signos pueden ser escasos pese a un cuadro avanzado.',
              'Mujeres gestantes, en quienes el cuadro se confunde con causas obstétricas y ginecológicas.',
              'Consulta muy precoz, cuando el dolor todavía no se ha localizado.',
              'Pacientes con alteración del estado de alerta o con dificultad para comunicar.',
            ],
          },
        ],
      },
      {
        titulo: 'Qué hace el prestador',
        bloques: [
          { tipo: 'p', texto: 'La apendicitis no se confirma ni se descarta en la ambulancia: su confirmación exige valoración clínica repetida, laboratorio e imagen, y su tratamiento es quirúrgico. La aportación del prestador es reconocer un abdomen doloroso con signos de alarma, sostener al paciente, no retrasar el traslado y transmitir la evolución del dolor.' },
          {
            tipo: 'lista',
            titulo: 'Hallazgos que sugieren que el cuadro se ha complicado',
            items: [
              'Dolor que se generaliza a todo el abdomen después de haber estado localizado.',
              'Defensa marcada de la pared o dolor intenso al retirar la mano.',
              'Distensión abdominal con ruidos intestinales ausentes.',
              'Signos de hipoperfusión o alteración del estado de alerta.',
              'Alivio brusco del dolor seguido de empeoramiento del estado general.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El alivio que no tranquiliza', texto: 'Un dolor intenso que cede de golpe y se sigue de un paciente que empeora no describe una mejoría. Es un patrón que debe elevar la preocupación y no bajarla, y que se transmite expresamente en el informe.' },
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria y del estado circulatorio antes de centrarse en el abdomen.',
              'Posición en que el paciente esté más cómodo.',
              'Anamnesis del dolor con su cronología, y hora de la última ingesta.',
              'Decisiones sobre analgesia, líquidos e ingesta oral conforme al protocolo del servicio.',
              'Traslado sin demora, con prealerta ante signos de complicación.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'p', texto: 'Anotar la hora de la última ingesta no es un formalismo: si el paciente requiere cirugía, es un dato que el equipo receptor necesita y que nadie podrá reconstruir después.' },
        ],
      },
      F([WHO_BEC, bibiano(61, 'Apendicitis aguda', 545), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Apendicitis aguda', definicion: 'Inflamación del apéndice cecal y causa más frecuente de abdomen agudo quirúrgico.' },
      { termino: 'Cronología apendicular', definicion: 'Secuencia típica en la que el dolor precede a las náuseas o el vómito y estos a la fiebre; aparece completa en menos de la mitad de los casos.' },
      { termino: 'Dolor migratorio', definicion: 'Dolor que empieza en el epigastrio o alrededor del ombligo y horas después se localiza en la fosa ilíaca derecha.' },
      { termino: 'Presentación atípica', definicion: 'Cuadro en el que la localización del apéndice, la edad avanzada, el embarazo o la consulta precoz desplazan o atenúan los signos.' },
      { termino: 'Signos de complicación', definicion: 'Generalización del dolor, defensa marcada, distensión con silencio abdominal, hipoperfusión o alivio brusco seguido de empeoramiento.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el mecanismo aceptado de la apendicitis?', reverso: 'Obstrucción de la luz del apéndice, distensión y aumento de presión, compromiso del drenaje venoso y linfático, proliferación bacteriana, isquemia y perforación.' },
      { frente: '¿En qué orden aparecen los síntomas de la cronología apendicular?', reverso: 'Primero el dolor, después las náuseas o el vómito y por último la fiebre.' },
      { frente: '¿Con qué frecuencia aparece completa esa secuencia?', reverso: 'En menos de la mitad de los casos, por eso su ausencia no descarta el cuadro.' },
      { frente: '¿Dónde empieza y dónde acaba el dolor típico?', reverso: 'Empieza brusco en el epigastrio o alrededor del ombligo y horas después se localiza en la fosa ilíaca derecha.' },
      { frente: 'El dolor cede de golpe y el paciente empeora. ¿Qué significa?', reverso: 'Es un patrón que sugiere complicación y debe elevar la preocupación, no bajarla; se transmite expresamente en el informe.' },
      { frente: '¿Qué dato horario conviene anotar siempre?', reverso: 'La hora de la última ingesta: si el paciente requiere cirugía, el equipo receptor lo necesita y nadie podrá reconstruirlo después.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente refiere que empezó a vomitar y horas después le empezó a doler el abdomen. ¿Cómo lo interpretas respecto de una apendicitis?',
        opciones: [
          'Confirma la cronología apendicular.',
          'Apunta en otra dirección: en la cronología apendicular el dolor precede a las náuseas y al vómito.',
          'Es irrelevante, porque el orden de los síntomas no aporta.',
          'Descarta cualquier causa quirúrgica.',
        ],
        correcta: 1,
        explicacion: 'Que el vómito preceda al dolor apunta en otra dirección; el orden en que aparecieron los síntomas aporta más que la simple lista de cuáles hay.',
      },
      {
        pregunta: 'Adulto mayor con dolor abdominal de dos días y signos escasos en la exploración. ¿Qué consideras?',
        opciones: [
          'Que la escasez de signos permite descartar un cuadro quirúrgico.',
          'Que en el adulto mayor los signos pueden ser escasos pese a un cuadro avanzado: es una de las presentaciones que engañan.',
          'Que debe observarse en domicilio por su edad.',
          'Que el cuadro es necesariamente de origen urinario.',
        ],
        correcta: 1,
        explicacion: 'Entre las situaciones en las que la presentación engaña figura el adulto mayor, en quien los signos pueden ser escasos pese a un cuadro avanzado.',
      },
      {
        pregunta: '¿Por qué el mecanismo de la apendicitis importa al prestador prehospitalario?',
        opciones: [
          'Porque le permite confirmar el diagnóstico en la escena.',
          'Porque la cadena de obstrucción, distensión, isquemia y perforación explica que el tiempo trabaje en contra y justifica el traslado en vez de la observación domiciliaria.',
          'Porque determina el antibiótico que debe administrar.',
          'Porque indica qué signo explorar primero.',
        ],
        correcta: 1,
        explicacion: 'Entender la secuencia no hace al prestador capaz de diagnosticar, pero sí de justificar por qué un dolor de horas que cambia de carácter merece traslado.',
      },
      {
        pregunta: '¿Qué aporta el prestador ante una sospecha de apendicitis?',
        opciones: [
          'La confirmación del cuadro mediante los signos clásicos.',
          'Reconocer un abdomen doloroso con signos de alarma, sostener al paciente, no retrasar el traslado y transmitir la evolución del dolor.',
          'El inicio del tratamiento definitivo.',
          'La decisión sobre la técnica quirúrgica.',
        ],
        correcta: 1,
        explicacion: 'La apendicitis no se confirma ni se descarta en la ambulancia: su confirmación exige valoración repetida, laboratorio e imagen, y su tratamiento es quirúrgico.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 61, p. 545-548',
      extra: [
        'Mecanismo, cronología apendicular y presentaciones atípicas proceden del capítulo 61 de '
          + 'Bibiano, p. 545-547, verificado. No se transcribe ninguna tabla ni escala.',
        'No se publica ninguna escala de probabilidad clínica: aplicarla exige datos de laboratorio y '
          + 'no cambia la conducta prehospitalaria.',
      ],
    }),
  },

  // ============================================================
  //  Pancreatitis
  // ============================================================
  'm4-gi-pancreatitis': {
    icono: 'cp-servier-pancreas',
    duracion: '16 min',
    resumen: 'Qué es una pancreatitis aguda, por qué su gravedad no se juzga por la intensidad del dolor '
      + 'y qué vigila el prestador durante el traslado.',
    objetivos: [
      'Describir en qué consiste una pancreatitis aguda y sus causas más frecuentes.',
      'Reconocer su presentación clínica característica.',
      'Identificar los signos de gravedad que se detectan en el ámbito prehospitalario.',
      'Ordenar la conducta y los límites del prestador.',
    ],
    secciones: [
      {
        titulo: 'Qué es y por qué se produce',
        bloques: [
          { tipo: 'p', texto: 'La pancreatitis aguda es la inflamación del páncreas por activación de sus propias enzimas dentro de la glándula. En vez de actuar en el intestino, esas enzimas empiezan a digerir el tejido pancreático y el que lo rodea. De ahí que el cuadro pueda ir de una inflamación limitada a una enfermedad con repercusión sobre todo el organismo.' },
          {
            tipo: 'lista',
            titulo: 'Causas más frecuentes',
            items: [
              'Litiasis biliar: un cálculo que obstruye la salida común de la vía biliar y el conducto pancreático.',
              'Consumo de alcohol.',
              'Con menor frecuencia: alteraciones metabólicas, fármacos, traumatismos y procedimientos sobre la vía biliar.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Las dos preguntas que rinden en la anamnesis', texto: 'Preguntar por episodios previos de cólico biliar o litiasis conocida y por el consumo de alcohol cubre las dos causas más frecuentes. Son preguntas breves, el paciente suele responderlas y orientan al equipo receptor.' },
        ],
      },
      {
        titulo: 'Cómo se presenta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Presentación característica',
            items: [
              'Dolor en el epigastrio, intenso y continuo, que se instaura en poco tiempo y no cede.',
              'Irradiación hacia la espalda, descrita a menudo como «en cinturón».',
              'Náuseas y vómitos que no alivian el dolor.',
              'Alivio parcial al inclinarse hacia adelante, y empeoramiento en decúbito supino.',
              'Distensión abdominal y disminución de los ruidos intestinales en los cuadros avanzados.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La intensidad del dolor no mide la gravedad', texto: 'Una pancreatitis muy dolorosa puede ser leve y una menos dolorosa puede ser grave. Lo que mide la gravedad en la calle no es cuánto duele, sino el estado circulatorio, la respiración y el estado de alerta. Es la trampa clásica de este cuadro.' },
          {
            tipo: 'lista',
            titulo: 'Signos de gravedad detectables sin laboratorio',
            items: [
              'Hipoperfusión: piel fría, pálida o moteada, relleno capilar lento.',
              'Taquicardia mantenida o hipotensión.',
              'Dificultad respiratoria, que en este cuadro indica repercusión sistémica.',
              'Alteración del estado de alerta.',
              'Vómitos persistentes con imposibilidad de tolerar líquidos.',
              'Distensión abdominal marcada con silencio abdominal.',
            ],
          },
          { tipo: 'p', texto: 'La pancreatitis pierde líquido hacia el tercer espacio, es decir, hacia zonas del organismo donde el líquido deja de circular aunque siga dentro del cuerpo. Por eso un paciente puede estar deshidratado y mal perfundido sin haber sangrado ni haber vomitado en gran cantidad, y por eso la vigilancia circulatoria es el eje del traslado.' },
        ],
      },
      {
        titulo: 'Conducta y límites',
        bloques: [
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Posición en que el paciente esté más cómodo; muchos prefieren inclinarse hacia adelante.',
              'Vigilancia estrecha de la perfusión, la respiración y el estado de alerta.',
              'Anamnesis dirigida a litiasis biliar previa y consumo de alcohol, con la hora de la última ingesta.',
              'Prevención de la broncoaspiración en el paciente que vomita, conforme a la técnica y al equipo autorizados.',
              'Decisiones sobre analgesia, líquidos e ingesta oral conforme al protocolo del servicio.',
              'Traslado con prealerta ante signos de gravedad; informe centrado en el estado circulatorio y respiratorio.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que se decide en el hospital', texto: 'La confirmación de una pancreatitis exige laboratorio y con frecuencia imagen, y su clasificación de gravedad se apoya en escalas que usan datos analíticos y de evolución. Esta lección no las reproduce y no corresponde aplicarlas en la ambulancia; lo que sí corresponde es reconocer al paciente que está mal perfundido y transmitirlo.' },
        ],
      },
      F([WHO_BEC, bibiano(59, 'Pancreatitis aguda', 531), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Pancreatitis aguda', definicion: 'Inflamación del páncreas por activación de sus propias enzimas dentro de la glándula, que empiezan a digerir el tejido pancreático y el circundante.' },
      { termino: 'Dolor en cinturón', definicion: 'Dolor epigástrico intenso y continuo con irradiación hacia la espalda, característico de este cuadro.' },
      { termino: 'Tercer espacio', definicion: 'Zonas del organismo hacia las que se desplaza líquido que deja de circular aunque siga dentro del cuerpo; explica que el paciente se deshidrate sin sangrar ni vomitar en exceso.' },
      { termino: 'Causas más frecuentes', definicion: 'Litiasis biliar y consumo de alcohol; con menor frecuencia alteraciones metabólicas, fármacos, traumatismos y procedimientos sobre la vía biliar.' },
      { termino: 'Gravedad prehospitalaria', definicion: 'Se juzga por el estado circulatorio, la respiración y el estado de alerta, no por la intensidad del dolor.' },
    ],
    flashcards: [
      { frente: '¿Qué ocurre en una pancreatitis aguda?', reverso: 'Las enzimas del propio páncreas se activan dentro de la glándula y empiezan a digerir el tejido pancreático y el que lo rodea.' },
      { frente: '¿Cuáles son sus dos causas más frecuentes?', reverso: 'La litiasis biliar y el consumo de alcohol.' },
      { frente: '¿Cómo es el dolor característico?', reverso: 'Epigástrico, intenso y continuo, irradiado a la espalda «en cinturón», que mejora al inclinarse hacia adelante y empeora en decúbito.' },
      { frente: '¿Mide la intensidad del dolor la gravedad?', reverso: 'No: la gravedad se juzga por el estado circulatorio, la respiración y el estado de alerta.' },
      { frente: '¿Qué es el tercer espacio y por qué importa aquí?', reverso: 'Zonas donde el líquido deja de circular aunque siga en el cuerpo; explica que el paciente esté mal perfundido sin haber sangrado ni vomitado mucho.' },
      { frente: '¿Qué signo respiratorio preocupa en una pancreatitis?', reverso: 'La dificultad respiratoria: en este cuadro indica repercusión sistémica.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con dolor epigástrico intenso irradiado a la espalda que mejora al inclinarse hacia adelante. Está pálido, frío y taquicárdico, pero refiere que «el dolor ya no es tan fuerte». ¿Cómo valoras la gravedad?',
        opciones: [
          'Ha mejorado, porque el dolor ha disminuido.',
          'Está grave: la gravedad se juzga por el estado circulatorio, la respiración y el estado de alerta, no por la intensidad del dolor.',
          'Es leve, porque conserva la consciencia.',
          'No puede valorarse sin laboratorio.',
        ],
        correcta: 1,
        explicacion: 'Una pancreatitis muy dolorosa puede ser leve y una menos dolorosa puede ser grave; la hipoperfusión es un signo de gravedad detectable sin laboratorio.',
      },
      {
        pregunta: 'El paciente no ha sangrado ni ha vomitado mucho, pero está claramente mal perfundido. ¿Qué lo explica en este cuadro?',
        opciones: [
          'Un error de la valoración inicial.',
          'La pérdida de líquido hacia el tercer espacio, donde deja de circular aunque siga dentro del cuerpo.',
          'La irradiación del dolor a la espalda.',
          'La posición que ha adoptado.',
        ],
        correcta: 1,
        explicacion: 'La pancreatitis pierde líquido hacia el tercer espacio, y por eso la vigilancia circulatoria es el eje del traslado.',
      },
      {
        pregunta: '¿Qué dos preguntas cubren las causas más frecuentes de este cuadro?',
        opciones: [
          'Tipo de dieta y horas de sueño.',
          'Episodios previos de cólico biliar o litiasis conocida, y consumo de alcohol.',
          'Antecedentes quirúrgicos torácicos y tabaquismo.',
          'Alergias y vacunación.',
        ],
        correcta: 1,
        explicacion: 'Litiasis biliar y consumo de alcohol son las dos causas más frecuentes; son preguntas breves que orientan al equipo receptor.',
      },
      {
        pregunta: '¿Debe el prestador aplicar una escala de gravedad de pancreatitis en la ambulancia?',
        opciones: [
          'Sí, es lo que decide el destino.',
          'No: esas escalas se apoyan en datos analíticos y de evolución; lo que corresponde es reconocer al paciente mal perfundido y transmitirlo.',
          'Sí, si el servicio dispone de monitor.',
          'Solo en pacientes con antecedente de litiasis.',
        ],
        correcta: 1,
        explicacion: 'La confirmación exige laboratorio y con frecuencia imagen; la clasificación de gravedad usa datos que no existen en la ambulancia.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 59, p. 531-538',
      extra: [
        'Definición, causas y presentación proceden del capítulo 59 de Bibiano, p. 531-537, verificado. '
          + 'No se reproduce ninguna escala de gravedad ni valor de laboratorio.',
      ],
    }),
  },

  // ============================================================
  //  Gastritis y colitis
  // ============================================================
  'm4-gi-gastritis-colitis': {
    icono: 'cp-servier-ulcera-gastrica',
    duracion: '16 min',
    resumen: 'Qué son la gastritis y las colitis, cómo se distingue un cuadro banal de uno que no lo es y '
      + 'por qué la colitis isquémica merece una mención aparte.',
    objetivos: [
      'Diferenciar gastritis de colitis por su localización y su presentación.',
      'Distinguir las colitis por su mecanismo: infeccioso, inflamatorio crónico e isquémico.',
      'Reconocer los signos que sacan a estos cuadros de la categoría de banales.',
      'Ordenar la conducta prehospitalaria y sus límites.',
    ],
    secciones: [
      {
        titulo: 'Dos localizaciones, dos cuadros',
        bloques: [
          { tipo: 'p', texto: 'La gastritis es la inflamación de la mucosa del estómago. Sus manifestaciones se concentran en la parte alta del abdomen: molestia o dolor en el epigastrio, sensación de ardor, náuseas y, con frecuencia, relación con las comidas. La colitis es la inflamación de la mucosa del colon, y sus manifestaciones son las del tramo bajo: dolor abdominal, cambio en el ritmo intestinal y diarrea, a veces con sangre.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué el plan las agrupa', texto: 'Ambas son inflamaciones de la mucosa digestiva y ambas producen cuadros que la mayoría de las veces no comprometen la vida. Su interés prehospitalario no está en distinguirlas entre sí —eso exige endoscopia—, sino en reconocer cuándo dejan de ser cuadros banales.' },
          { tipo: 'p', texto: 'Ninguna de las dos se confirma en la calle. Un dolor epigástrico atribuido a una gastritis puede ser un síndrome coronario, y una diarrea con sangre atribuida a una colitis infecciosa puede ser un sangrado digestivo. La etiqueta tranquilizadora es, en las dos, el error de más consecuencias.' },
        ],
      },
      {
        titulo: 'Las colitis no son todas iguales',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Tres mecanismos distintos',
            headers: ['Tipo', 'Mecanismo', 'Rasgos que orientan'],
            filas: [
              ['Infecciosa', 'Agente infeccioso en la mucosa del colon', 'Comienzo agudo, más frecuente en jóvenes, a veces con fiebre y antecedente alimentario o de viaje'],
              ['Inflamatoria crónica', 'Enfermedad inflamatoria intestinal, con brotes y remisiones', 'Paciente que ya conoce su enfermedad, con episodios previos y tratamiento habitual'],
              ['Isquémica', 'Reducción del flujo sanguíneo a un segmento del colon', 'Adulto mayor con factores de riesgo vascular; dolor de comienzo brusco seguido de deposición con sangre'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La colitis isquémica es la que cambia la prioridad', texto: 'Un adulto mayor con enfermedad vascular conocida que presenta un dolor abdominal de comienzo brusco seguido a las pocas horas de una deposición con sangre describe un patrón que no debe tratarse como una gastroenteritis. El componente isquémico convierte el cuadro en tiempo-dependiente y obliga a trasladar y a transmitir la sospecha.' },
          { tipo: 'p', texto: 'Existe además un patrón que debe preocupar de forma particular: el dolor abdominal intenso, mal localizado y desproporcionado respecto de lo poco que muestra la exploración, en un paciente con factores de riesgo vascular. Es un cuadro de origen vascular abdominal, no una colitis banal, y su reconocimiento precoz es la única aportación posible desde la calle.' },
        ],
      },
      {
        titulo: 'Cuándo dejan de ser cuadros banales',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos que sacan al paciente de la categoría de leve',
            items: [
              'Signos de hipoperfusión o taquicardia mantenida.',
              'Alteración del estado de alerta.',
              'Sangre en el vómito o en las deposiciones, en cantidad apreciable.',
              'Dolor intenso y desproporcionado respecto de la exploración.',
              'Defensa de la pared abdominal o dolor marcado al retirar la mano.',
              'Vómitos persistentes con imposibilidad de tolerar líquidos.',
              'Fiebre elevada o, al contrario, hipotermia.',
              'Fragilidad previa: edad avanzada, inmunosupresión o enfermedad crónica descompensada.',
            ],
          },
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria y del estado circulatorio antes de centrarse en el síntoma digestivo.',
              'Anamnesis dirigida: tiempo de evolución, características de las deposiciones, tratamiento habitual, antecedente de enfermedad inflamatoria conocida y factores de riesgo vascular.',
              'Protección personal conforme al protocolo cuando se sospeche un cuadro transmisible.',
              'Vigilancia del estado de hidratación en los cuadros con vómitos o diarrea abundantes.',
              'Decisiones sobre analgesia, líquidos e ingesta oral conforme al protocolo del servicio.',
              'Traslado con prealerta ante cualquiera de los signos anteriores.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que no corresponde a la ambulancia', texto: 'El tratamiento específico de estos cuadros —protectores gástricos, antibióticos, corticoides o el manejo de un brote de enfermedad inflamatoria— depende de la confirmación y del ámbito donde se atienda al paciente. Esta lección no propone ninguno.' },
        ],
      },
      F([WHO_BEC, bibiano(63, 'Enfermedad inflamatoria intestinal', 557), bibiano(62, 'Isquemia mesentérica aguda', 551), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Gastritis', definicion: 'Inflamación de la mucosa del estómago; se manifiesta en la parte alta del abdomen con molestia epigástrica, ardor y náuseas.' },
      { termino: 'Colitis', definicion: 'Inflamación de la mucosa del colon; se manifiesta con dolor abdominal, cambio del ritmo intestinal y diarrea, a veces con sangre.' },
      { termino: 'Colitis isquémica', definicion: 'Colitis por reducción del flujo sanguíneo a un segmento del colon; típica del adulto mayor con factores de riesgo vascular y con dolor brusco seguido de deposición con sangre.' },
      { termino: 'Dolor desproporcionado', definicion: 'Dolor intenso y mal localizado que contrasta con lo poco que muestra la exploración; en un paciente con riesgo vascular sugiere un cuadro abdominal de origen vascular.' },
      { termino: 'Etiqueta tranquilizadora', definicion: 'Error de atribuir un cuadro grave a un diagnóstico banal; aquí, llamar gastritis a un dolor epigástrico coronario o colitis a un sangrado digestivo.' },
    ],
    flashcards: [
      { frente: 'Gastritis frente a colitis', reverso: 'La gastritis inflama la mucosa del estómago y se manifiesta arriba; la colitis inflama la mucosa del colon y se manifiesta con diarrea y cambio del ritmo intestinal.' },
      { frente: '¿Qué tres mecanismos distinguen a las colitis?', reverso: 'Infeccioso, inflamatorio crónico e isquémico.' },
      { frente: '¿Qué patrón describe una colitis isquémica?', reverso: 'Adulto mayor con riesgo vascular, dolor abdominal de comienzo brusco y a las pocas horas deposición con sangre.' },
      { frente: '¿Qué significa un dolor desproporcionado a la exploración?', reverso: 'En un paciente con factores de riesgo vascular sugiere un cuadro abdominal de origen vascular, no una colitis banal.' },
      { frente: '¿Cuál es el error de más consecuencias en estos cuadros?', reverso: 'La etiqueta tranquilizadora: llamar gastritis a un dolor epigástrico coronario o colitis a un sangrado digestivo.' },
      { frente: '¿Cuál es el interés prehospitalario de estos cuadros?', reverso: 'No distinguirlos entre sí, que exige endoscopia, sino reconocer cuándo dejan de ser banales.' },
    ],
    quiz: [
      {
        pregunta: 'Hombre de 78 años con enfermedad vascular conocida: dolor abdominal brusco hace tres horas y ahora una deposición con sangre. ¿Cómo lo tratas?',
        opciones: [
          'Como una gastroenteritis, con recomendación de dieta.',
          'Como un patrón de colitis isquémica, que es tiempo-dependiente: se traslada y se transmite la sospecha.',
          'Como una gastritis por su edad.',
          'Como un brote de enfermedad inflamatoria intestinal.',
        ],
        correcta: 1,
        explicacion: 'El adulto mayor con riesgo vascular, dolor de comienzo brusco y deposición con sangre describe una colitis isquémica; el componente isquémico convierte el cuadro en tiempo-dependiente.',
      },
      {
        pregunta: 'Un paciente con factores de riesgo vascular refiere dolor abdominal intensísimo, pero su abdomen apenas muestra hallazgos. ¿Qué te sugiere?',
        opciones: [
          'Que exagera el dolor.',
          'Un dolor desproporcionado respecto de la exploración, que en ese paciente sugiere un cuadro abdominal de origen vascular.',
          'Una gastritis por estrés.',
          'Que la exploración fue mal realizada y debe repetirse antes de trasladar.',
        ],
        correcta: 1,
        explicacion: 'El dolor intenso y mal localizado que contrasta con lo poco que muestra la exploración, en un paciente con riesgo vascular, es un patrón que debe preocupar de forma particular.',
      },
      {
        pregunta: '¿Puede confirmarse una gastritis en la ambulancia?',
        opciones: [
          'Sí, por la localización epigástrica del dolor.',
          'No: no se confirma en la calle, y un dolor epigástrico atribuido a gastritis puede ser un síndrome coronario.',
          'Sí, si el paciente relaciona el dolor con la comida.',
          'Sí, si cede con antiácidos.',
        ],
        correcta: 1,
        explicacion: 'Ninguno de los dos cuadros se confirma en la calle, y la etiqueta tranquilizadora es el error de más consecuencias.',
      },
      {
        pregunta: 'Paciente joven con diarrea de dos días, sin fiebre, bien perfundido y tolerando líquidos. ¿Qué lo sacaría de la categoría de leve?',
        opciones: [
          'Que la diarrea sea acuosa.',
          'La aparición de hipoperfusión, alteración del estado de alerta, sangre apreciable, vómitos que impidan tolerar líquidos o fiebre elevada.',
          'Que dure más de un día.',
          'Que no haya antecedente de viaje.',
        ],
        correcta: 1,
        explicacion: 'Los signos que sacan al paciente de la categoría de leve son los de repercusión sistémica y los de sangrado, no las características aisladas de la deposición.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 62, p. 551-555 y cap. 63, p. 557-566',
      extra: [
        'Los mecanismos de las colitis proceden de los capítulos 62 y 63 de Bibiano, verificados. El '
          + 'apartado de gastritis se limita a la definición y a la presentación por localización: la '
          + 'obra no le dedica un capítulo propio y no se le atribuye contenido que no tenga.',
        'DEUDA MENOR: si la academia desea desarrollar la gastritis más allá de la definición, hace '
          + 'falta una fuente específica de patología gastroduodenal; no se ha usado ninguna prestada.',
      ],
    }),
  },

  // ============================================================
  //  Colelitiasis y colecistitis
  // ============================================================
  'm4-gi-colelitiasis': {
    icono: 'cp-servier-colelitiasis',
    duracion: '16 min',
    resumen: 'Qué distingue un cólico biliar de una colecistitis y de una colangitis, y por qué esa '
      + 'diferencia cambia la prioridad del traslado.',
    objetivos: [
      'Diferenciar colelitiasis, cólico biliar, colecistitis y colangitis.',
      'Reconocer la presentación característica del dolor biliar.',
      'Identificar el cuadro biliar que se comporta como una urgencia tiempo-dependiente.',
      'Ordenar la conducta prehospitalaria y sus límites.',
    ],
    secciones: [
      {
        titulo: 'Cuatro palabras que no significan lo mismo',
        bloques: [
          { tipo: 'p', texto: 'La confusión entre estos términos es habitual y tiene consecuencias, porque cada uno describe una situación con un riesgo distinto.' },
          {
            tipo: 'tabla',
            titulo: 'De la piedra al cuadro grave',
            headers: ['Término', 'Qué describe', 'Riesgo'],
            filas: [
              ['Colelitiasis', 'Presencia de cálculos en la vesícula', 'Puede ser asintomática durante años'],
              ['Cólico biliar', 'Dolor por obstrucción transitoria de la salida de la vesícula', 'Cede al resolverse la obstrucción; sin inflamación mantenida'],
              ['Colecistitis aguda', 'Inflamación de la pared de la vesícula por obstrucción mantenida', 'Cuadro inflamatorio que puede complicarse'],
              ['Colangitis', 'Infección de la vía biliar por obstrucción de su salida', 'El más grave: puede evolucionar a compromiso sistémico'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La diferencia entre las dos primeras y las dos últimas', texto: 'La colelitiasis y el cólico biliar describen un problema mecánico que cede. La colecistitis y la colangitis añaden inflamación o infección mantenidas, y son las que cambian la prioridad. Lo que orienta hacia ellas en la calle no es el dolor, sino su duración y los signos generales que lo acompañan.' },
        ],
      },
      {
        titulo: 'Cómo se presenta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'El dolor biliar',
            items: [
              'Se localiza en el hipocondrio derecho o en el epigastrio.',
              'Puede irradiarse al hombro derecho o a la región escapular derecha.',
              'Suele aparecer después de una comida, especialmente si fue abundante o grasa.',
              'Se acompaña con frecuencia de náuseas y vómitos.',
              'En el cólico biliar es prolongado pero cede; cuando se mantiene durante horas orienta hacia inflamación.',
            ],
          },
          { tipo: 'p', texto: 'Durante la palpación del hipocondrio derecho puede buscarse el signo de Murphy: se pide al paciente que inspire profundamente mientras se palpa esa zona, y es sugestivo si el dolor le interrumpe la inspiración. Como todos los signos abdominales, orienta y no confirma.' },
          {
            tipo: 'lista',
            titulo: 'Datos que sugieren que el cuadro pasó de mecánico a inflamatorio o infeccioso',
            items: [
              'Dolor que se mantiene durante horas en vez de ceder.',
              'Fiebre.',
              'Coloración amarillenta de la piel o de las conjuntivas.',
              'Signos de hipoperfusión o alteración del estado de alerta.',
              'Escalofríos intensos con sensación de gravedad.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La combinación que obliga a prealertar', texto: 'Dolor en el hipocondrio derecho, fiebre y coloración amarillenta describen juntos un cuadro de obstrucción e infección de la vía biliar. Si además hay hipoperfusión o alteración del estado de alerta, el paciente es tiempo-dependiente y así debe transmitirse.' },
        ],
      },
      {
        titulo: 'Conducta y límites',
        bloques: [
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria y del estado circulatorio antes de centrarse en el dolor.',
              'Anamnesis dirigida: episodios previos idénticos, litiasis conocida, cirugías abdominales previas, hora y tipo de la última comida.',
              'Exploración abdominal en su orden, buscando el signo de Murphy al final.',
              'Búsqueda expresa de fiebre y de coloración amarillenta, que son los datos que cambian la categoría del cuadro.',
              'Decisiones sobre analgesia, líquidos e ingesta oral conforme al protocolo del servicio.',
              'Traslado con prealerta ante la combinación de dolor, fiebre e ictericia, o ante cualquier signo de hipoperfusión.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que se decide en el hospital', texto: 'La confirmación de una colecistitis o de una colangitis exige laboratorio e imagen, y el tratamiento puede requerir antibióticos, drenaje de la vía biliar o cirugía. Nada de eso corresponde a la ambulancia, y esta lección no lo describe.' },
        ],
      },
      F([WHO_BEC, bibiano(58, 'Patología biliar aguda', 523), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Colelitiasis', definicion: 'Presencia de cálculos en la vesícula biliar; puede permanecer asintomática durante años.' },
      { termino: 'Cólico biliar', definicion: 'Dolor producido por la obstrucción transitoria de la salida de la vesícula, que cede al resolverse la obstrucción.' },
      { termino: 'Colecistitis aguda', definicion: 'Inflamación de la pared de la vesícula por obstrucción mantenida; el dolor no cede y suele acompañarse de fiebre.' },
      { termino: 'Colangitis', definicion: 'Infección de la vía biliar por obstrucción de su salida; es el cuadro biliar más grave y puede evolucionar a compromiso sistémico.' },
      { termino: 'Signo de Murphy', definicion: 'Dolor que interrumpe la inspiración profunda mientras se palpa el hipocondrio derecho; orienta hacia patología biliar y no la confirma.' },
    ],
    flashcards: [
      { frente: 'Colelitiasis frente a colecistitis', reverso: 'La colelitiasis es la presencia de cálculos, que puede ser asintomática; la colecistitis es la inflamación de la pared vesicular por obstrucción mantenida.' },
      { frente: '¿Qué diferencia un cólico biliar de una colecistitis en la calle?', reverso: 'La duración del dolor y los signos generales: el cólico cede, la colecistitis mantiene el dolor horas y suele añadir fiebre.' },
      { frente: '¿Cómo es el dolor biliar?', reverso: 'En hipocondrio derecho o epigastrio, irradiado al hombro o la escápula derechos, con frecuencia tras una comida abundante o grasa.' },
      { frente: '¿Qué combinación obliga a prealertar?', reverso: 'Dolor en hipocondrio derecho, fiebre y coloración amarillenta; más aún si hay hipoperfusión o alteración del estado de alerta.' },
      { frente: '¿Cuál es el cuadro biliar más grave?', reverso: 'La colangitis: infección de la vía biliar por obstrucción de su salida, que puede evolucionar a compromiso sistémico.' },
      { frente: '¿Confirma el signo de Murphy una colecistitis?', reverso: 'No: orienta hacia patología biliar, como todos los signos abdominales.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con dolor en hipocondrio derecho desde hace ocho horas que no cede, con fiebre y conjuntivas amarillentas. Está taquicárdico y algo confuso. ¿Qué haces?',
        opciones: [
          'Tratarlo como un cólico biliar y recomendar consulta programada.',
          'Reconocer un cuadro de obstrucción e infección de la vía biliar con repercusión general, trasladar con prealerta y transmitir la combinación de hallazgos.',
          'Esperar a que el dolor ceda antes de decidir.',
          'Atribuirlo a una gastritis por la comida reciente.',
        ],
        correcta: 1,
        explicacion: 'Dolor, fiebre e ictericia describen juntos una obstrucción con infección de la vía biliar; con hipoperfusión o alteración del estado de alerta el paciente es tiempo-dependiente.',
      },
      {
        pregunta: '¿Qué separa a la colelitiasis y el cólico biliar de la colecistitis y la colangitis?',
        opciones: [
          'La intensidad del dolor.',
          'Que las dos primeras describen un problema mecánico que cede y las dos últimas añaden inflamación o infección mantenidas.',
          'La edad del paciente.',
          'La localización del dolor.',
        ],
        correcta: 1,
        explicacion: 'Lo que orienta hacia las dos últimas no es el dolor sino su duración y los signos generales que lo acompañan.',
      },
      {
        pregunta: '¿Cómo se busca el signo de Murphy?',
        opciones: [
          'Presionando la fosa ilíaca izquierda.',
          'Pidiendo al paciente que inspire profundamente mientras se palpa el hipocondrio derecho; es sugestivo si el dolor le interrumpe la inspiración.',
          'Retirando bruscamente la mano tras presionar la pared.',
          'Flexionando el muslo contra resistencia.',
        ],
        correcta: 1,
        explicacion: 'Es la maniobra descrita para la patología biliar; se explora al final de la palpación porque es de las que más molestan.',
      },
      {
        pregunta: 'El paciente refiere que le pasa siempre lo mismo tras las comidas grasas y que se le quita en un par de horas. Hoy está afebril y bien perfundido. ¿Qué describe?',
        opciones: [
          'Una colangitis.',
          'Un patrón de cólico biliar: obstrucción transitoria que cede, sin inflamación mantenida.',
          'Una colitis isquémica.',
          'Una pancreatitis grave.',
        ],
        correcta: 1,
        explicacion: 'El cólico biliar es el dolor por obstrucción transitoria de la salida de la vesícula, que cede al resolverse la obstrucción y aparece con frecuencia tras una comida grasa.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 58, p. 523-529',
      extra: [
        'La distinción entre colelitiasis, cólico biliar, colecistitis y colangitis y la presentación '
          + 'del dolor proceden del capítulo 58 de Bibiano, verificado. No se reproducen criterios '
          + 'diagnósticos ni valores de laboratorio.',
      ],
    }),
  },

  // ============================================================
  //  Deshidratación
  // ============================================================
  'm4-gi-deshidratacion': {
    icono: 'cp-servier-agua',
    duracion: '18 min',
    resumen: 'Cómo se reconoce y se gradúa la deshidratación sin laboratorio, qué poblaciones se '
      + 'descompensan antes y qué puede hacerse por vía oral.',
    objetivos: [
      'Explicar cómo se produce una deshidratación y qué la agrava.',
      'Graduar la deshidratación con signos clínicos disponibles en la calle.',
      'Identificar las poblaciones que se descompensan con pérdidas menores.',
      'Delimitar cuándo la rehidratación oral es razonable y cuándo no.',
    ],
    secciones: [
      {
        titulo: 'Qué se pierde y por dónde',
        bloques: [
          { tipo: 'p', texto: 'La deshidratación es el déficit de agua y de electrolitos del organismo, y aparece cuando las pérdidas superan al aporte. En las urgencias digestivas las pérdidas suelen ser evidentes —vómitos y diarrea—, pero conviene recordar las que no se ven: la fiebre, la sudoración abundante, la respiración rápida y las pérdidas hacia el tercer espacio de cuadros como la pancreatitis restan líquido sin que nadie las mida.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El aporte cuenta tanto como la pérdida', texto: 'Un paciente con vómitos moderados que sigue bebiendo puede mantenerse; otro con pérdidas menores que no ha bebido en un día se deshidrata. Preguntar qué y cuánto ha bebido, y cuándo fue la última vez, aporta tanto como contar los episodios de vómito.' },
        ],
      },
      {
        titulo: 'Reconocer y graduar sin laboratorio',
        bloques: [
          { tipo: 'p', texto: 'La deshidratación se gradúa en la calle con signos clínicos, no con cifras. Ningún signo aislado basta: se valoran juntos y se repiten, porque lo que informa es el conjunto y su evolución.' },
          {
            tipo: 'tabla',
            titulo: 'Qué se observa según avanza el déficit',
            headers: ['Qué se valora', 'Déficit leve', 'Déficit moderado', 'Déficit grave'],
            filas: [
              ['Sed y estado general', 'Sed, paciente alerta', 'Sed intensa, inquietud o irritabilidad', 'Somnolencia, dificultad para beber o incapacidad'],
              ['Mucosas', 'Algo secas', 'Secas', 'Muy secas'],
              ['Ojos', 'Normales', 'Hundidos', 'Muy hundidos'],
              ['Piel', 'Recupera de inmediato al pellizcarla', 'Recupera con lentitud', 'Recupera muy lentamente'],
              ['Perfusión', 'Conservada', 'Relleno capilar algo lento, extremidades frescas', 'Piel fría y moteada, relleno capilar lento'],
              ['Pulso y respiración', 'Sin cambios llamativos', 'Pulso rápido', 'Pulso rápido y débil, respiración acelerada'],
              ['Diuresis', 'Algo reducida', 'Reducida, orina concentrada', 'Muy reducida o ausente'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los dos signos que cambian la conducta', texto: 'La alteración del estado de alerta y la incapacidad para beber sacan al paciente de cualquier plan de rehidratación por vía oral y lo convierten en un traslado prioritario. Un paciente somnoliento al que se intenta dar líquidos por la boca corre riesgo de broncoaspiración.' },
          {
            tipo: 'lista',
            titulo: 'Quiénes se descompensan con pérdidas menores',
            items: [
              'Lactantes y niños pequeños, por su mayor proporción de agua corporal y su menor reserva.',
              'Adultos mayores, en quienes la sensación de sed está disminuida y los signos cutáneos son menos fiables.',
              'Personas con enfermedad renal, cardiaca o diabetes.',
              'Personas que toman diuréticos.',
              'Personas con fiebre alta o expuestas a calor extremo.',
              'Personas con dependencia funcional que no pueden beber por sí mismas.',
            ],
          },
          { tipo: 'p', texto: 'En el adulto mayor conviene una advertencia: el pellizco cutáneo pierde fiabilidad porque la piel ya recupera con lentitud por la edad. Se valoran preferentemente el estado de alerta, la perfusión, las mucosas y la diuresis referida.' },
        ],
      },
      {
        titulo: 'Rehidratación oral y sus límites',
        bloques: [
          { tipo: 'p', texto: 'La rehidratación por vía oral con solución de electrolitos es la medida de base en la deshidratación leve o moderada del paciente que puede y quiere beber. No es un remedio menor: resuelve la mayor parte de los cuadros y no requiere ningún procedimiento invasivo.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Los electrolitos orales están en la dotación mínima', texto: 'El numeral A.4.2 de la NOM-034 incluye electrolitos orales entre las soluciones que debe llevar toda ambulancia terrestre, incluida la de traslado. Que existan a bordo responde a «qué debe haber en la unidad»; a quién administrarlos, en qué cantidad y con qué ritmo lo declara el protocolo del servicio, y esta lección no lo publica.' },
          {
            tipo: 'lista',
            titulo: 'Cuándo la vía oral NO es la opción',
            items: [
              'Alteración del estado de alerta o somnolencia.',
              'Incapacidad para beber o para tragar con seguridad.',
              'Vómitos persistentes que impiden retener el líquido.',
              'Signos de hipoperfusión o deshidratación grave.',
              'Sospecha de abdomen agudo que pueda requerir cirugía.',
              'Cualquier situación en que el protocolo del servicio lo desaconseje.',
            ],
          },
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria y del estado circulatorio; graduar la deshidratación con los signos anteriores.',
              'Anamnesis: pérdidas —número y tipo—, aporte, tiempo de evolución, diuresis, fiebre, tratamiento habitual y enfermedades previas.',
              'Rehidratación oral cuando esté indicada y el protocolo lo autorice, en cantidades pequeñas y frecuentes.',
              'Vía intravenosa y aporte de líquidos únicamente conforme al protocolo, al alcance profesional y al equipo disponible.',
              'Control de la temperatura y del entorno, sobre todo en extremos de edad.',
              'Traslado con prealerta ante deshidratación grave, alteración del estado de alerta o hipoperfusión.',
              'Reevaluación continua y registro con hora de lo administrado y tolerado.',
            ],
          },
        ],
      },
      F([WHO_BEC, bibiano(16, 'Diarrea aguda', 146), NOM_034_SOLUCIONES, WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Deshidratación', definicion: 'Déficit de agua y electrolitos que aparece cuando las pérdidas superan al aporte.' },
      { termino: 'Pérdidas no visibles', definicion: 'Las que restan líquido sin poder contarse: fiebre, sudoración, respiración rápida y desplazamiento al tercer espacio.' },
      { termino: 'Graduación clínica', definicion: 'Valoración conjunta de sed, estado de alerta, mucosas, ojos, piel, perfusión, pulso, respiración y diuresis; ningún signo aislado basta.' },
      { termino: 'Rehidratación oral', definicion: 'Aporte de solución de electrolitos por boca; medida de base en la deshidratación leve o moderada del paciente que puede y quiere beber.' },
      { termino: 'Límite de la vía oral', definicion: 'Alteración del estado de alerta, incapacidad para beber, vómitos persistentes, hipoperfusión o sospecha de abdomen quirúrgico.' },
      { termino: 'Poblaciones vulnerables', definicion: 'Lactantes y niños pequeños, adultos mayores, y personas con enfermedad renal, cardiaca, diabetes o tratamiento diurético.' },
    ],
    flashcards: [
      { frente: '¿Cuándo aparece una deshidratación?', reverso: 'Cuando las pérdidas de agua y electrolitos superan al aporte.' },
      { frente: 'Nombra tres pérdidas que no se ven.', reverso: 'La fiebre, la sudoración abundante y la respiración rápida; también el desplazamiento al tercer espacio.' },
      { frente: '¿Qué dos signos sacan al paciente de un plan de rehidratación oral?', reverso: 'La alteración del estado de alerta y la incapacidad para beber; dar líquidos por boca a un paciente somnoliento arriesga broncoaspiración.' },
      { frente: '¿Por qué el pellizco cutáneo es poco fiable en el adulto mayor?', reverso: 'Porque su piel ya recupera con lentitud por la edad; se valoran mejor el estado de alerta, la perfusión, las mucosas y la diuresis.' },
      { frente: '¿Qué dice la NOM-034 sobre los electrolitos orales?', reverso: 'Que en el numeral A.4.2 figuran entre las soluciones de toda ambulancia terrestre. Es dotación: no dice a quién, cuánto ni con qué ritmo.' },
      { frente: '¿Basta un signo aislado para graduar la deshidratación?', reverso: 'No: se valoran juntos y se repiten, porque lo que informa es el conjunto y su evolución.' },
    ],
    quiz: [
      {
        pregunta: 'Niño con diarrea de dos días, somnoliento, con ojos hundidos, piel que recupera muy lentamente y frialdad distal. ¿Cuál es tu conducta?',
        opciones: [
          'Iniciar rehidratación oral abundante de inmediato.',
          'Reconocer un déficit grave: la somnolencia y la hipoperfusión excluyen la vía oral y hacen prioritario el traslado con prealerta.',
          'Recomendar dieta astringente y observación domiciliaria.',
          'Esperar a que tolere líquidos antes de decidir el traslado.',
        ],
        correcta: 1,
        explicacion: 'La alteración del estado de alerta y la incapacidad para beber sacan al paciente de cualquier plan de rehidratación oral y lo convierten en un traslado prioritario.',
      },
      {
        pregunta: 'Adulto mayor con vómitos de un día. Al pellizcar la piel, esta recupera con lentitud. ¿Qué peso le das al signo?',
        opciones: [
          'Decisivo: confirma deshidratación grave.',
          'Limitado: en el adulto mayor la piel ya recupera con lentitud por la edad; se valoran mejor el estado de alerta, la perfusión, las mucosas y la diuresis.',
          'Ninguno: el signo no existe en el adulto.',
          'Decisivo si además hay sed.',
        ],
        correcta: 1,
        explicacion: 'El pellizco cutáneo pierde fiabilidad con la edad, y ningún signo aislado basta para graduar la deshidratación.',
      },
      {
        pregunta: 'Llevas electrolitos orales a bordo porque la NOM-034 los exige en el numeral A.4.2. ¿Qué te autoriza eso?',
        opciones: [
          'A administrarlos a cualquier paciente con diarrea.',
          'Nada por sí solo: la dotación dice qué debe existir en la unidad; a quién administrarlos, en qué cantidad y con qué ritmo lo declara el protocolo del servicio.',
          'A usarlos solo en pacientes pediátricos.',
          'A sustituir con ellos cualquier aporte intravenoso.',
        ],
        correcta: 1,
        explicacion: 'La NOM-034 es una norma de dotación: responde qué debe haber a bordo y no cómo administrarlo.',
      },
      {
        pregunta: 'Un paciente ha vomitado tres veces pero ha seguido bebiendo con normalidad; otro ha vomitado una vez y no bebe nada desde ayer. ¿Qué te dice eso?',
        opciones: [
          'Que el primero está más deshidratado por el número de episodios.',
          'Que el aporte cuenta tanto como la pérdida: preguntar qué, cuánto y cuándo bebió aporta tanto como contar los vómitos.',
          'Que ninguno de los dos requiere valoración.',
          'Que el número de vómitos es el único dato válido.',
        ],
        correcta: 1,
        explicacion: 'Una deshidratación aparece cuando las pérdidas superan al aporte; un paciente con pérdidas menores que no ha bebido en un día puede deshidratarse.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 16, p. 146-147',
      extra: [
        'La graduación clínica se enseña con signos, sin porcentajes de pérdida de peso ni volúmenes: '
          + 'esas cifras dependen de población y de fuente pediátrica específica que esta unidad no '
          + 'tiene asignada.',
        'La deshidratación PEDIÁTRICA en profundidad corresponde al Módulo 6 y a sus fuentes; aquí solo '
          + 'se declara que los lactantes y niños pequeños se descompensan antes.',
        'El dato normativo —electrolitos orales en el numeral A.4.2— se verificó el 16 de agosto de '
          + '2026 contra el texto del DOF.',
        'DECISIÓN PENDIENTE: la academia debe declarar si sus alumnos administran rehidratación oral y '
          + 'con qué pauta, y su política sobre accesos vasculares y aporte de líquidos.',
      ],
    }),
  },

  // ============================================================
  //  Oclusión intestinal
  // ============================================================
  'm4-gi-oclusion-intestinal': {
    icono: 'cp-servier-intestino-delgado',
    duracion: '16 min',
    resumen: 'Qué es una oclusión intestinal, por qué la cirugía abdominal previa es el antecedente que '
      + 'más orienta y qué signos indican que el intestino está sufriendo.',
    objetivos: [
      'Definir la oclusión intestinal y distinguir el origen mecánico del funcional.',
      'Reconocer la tétrada clínica que la caracteriza.',
      'Identificar los signos que sugieren compromiso de la irrigación del asa.',
      'Ordenar la conducta prehospitalaria y sus límites.',
    ],
    secciones: [
      {
        titulo: 'Qué es y de qué tipos',
        bloques: [
          { tipo: 'p', texto: 'Una oclusión intestinal es la detención del tránsito del contenido a lo largo del intestino. El contenido y el gas se acumulan por encima del punto donde se detiene, el asa se distiende y esa distensión es la que produce el dolor, el vómito y la repercusión general.' },
          {
            tipo: 'tabla',
            titulo: 'Dos mecanismos',
            headers: ['Tipo', 'Qué ocurre', 'Ejemplos de causa'],
            filas: [
              ['Mecánica', 'Existe un obstáculo físico que impide el paso', 'Adherencias de cirugías previas, hernias, tumores, cuerpos extraños'],
              ['Funcional', 'No hay obstáculo, pero el intestino deja de moverse', 'Tras una cirugía, en trastornos electrolíticos, por ciertos fármacos o acompañando a otra enfermedad abdominal'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El antecedente que más orienta', texto: 'La cirugía abdominal previa es el dato de la anamnesis que más apunta hacia una oclusión mecánica, porque las adherencias son una causa frecuente. Preguntar expresamente «¿lo han operado alguna vez del abdomen?» y buscar cicatrices durante la inspección es más rentable que cualquier maniobra de palpación.' },
          { tipo: 'p', texto: 'También conviene explorar las regiones inguinales: una hernia que no puede reducirse es una causa de oclusión que se detecta a simple vista y que cambia por completo la orientación del cuadro.' },
        ],
      },
      {
        titulo: 'Cómo se presenta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Los cuatro elementos clásicos',
            items: [
              'Dolor abdominal, característicamente cólico: aparece en oleadas con periodos de alivio entre ellas.',
              'Vómitos, cuyo aspecto orienta al nivel de la oclusión: más precoces y claros cuanto más alta, más tardíos y de aspecto intestinal cuanto más baja.',
              'Distensión abdominal, más marcada cuanto más baja es la oclusión.',
              'Ausencia de emisión de gases y heces.',
            ],
          },
          { tipo: 'p', texto: 'En la auscultación, la fase inicial de una oclusión mecánica suele producir ruidos aumentados y de lucha, porque el intestino intenta vencer el obstáculo. Cuando esos ruidos desaparecen y el abdomen queda silencioso, el cuadro ha avanzado y esa evolución es una mala señal, no una mejoría.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Signos de que el asa está sufriendo', texto: 'El dolor cólico que se vuelve continuo e intenso, la defensa marcada de la pared, la fiebre y los signos de hipoperfusión sugieren que la irrigación del segmento está comprometida. Es la situación que convierte la oclusión en un cuadro tiempo-dependiente y la que debe transmitirse expresamente.' },
          { tipo: 'p', texto: 'Además, la oclusión deshidrata: el paciente pierde líquido dentro de la luz intestinal y lo pierde con los vómitos. Por eso un paciente con oclusión de horas de evolución puede llegar mal perfundido sin ninguna hemorragia.' },
        ],
      },
      {
        titulo: 'Conducta y límites',
        bloques: [
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria y del estado circulatorio antes de centrarse en el abdomen.',
              'Inspección buscando cicatrices de cirugías previas, distensión y hernias visibles.',
              'Auscultación antes de palpar: registrar si los ruidos están aumentados, normales o ausentes.',
              'Anamnesis: cirugías abdominales previas, última emisión de gases y heces, número y aspecto de los vómitos, hora de la última ingesta.',
              'Prevención de la broncoaspiración en el paciente que vomita, conforme a la técnica y al equipo autorizados.',
              'Ingesta oral, líquidos y analgesia conforme al protocolo del servicio.',
              'Traslado con prealerta ante dolor continuo, defensa, fiebre o hipoperfusión.',
              'Reevaluación continua y registro con hora, anotando expresamente si los ruidos cambiaron.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que se decide en el hospital', texto: 'La confirmación de una oclusión, su nivel y la decisión entre tratamiento conservador y cirugía requieren imagen y valoración quirúrgica. La colocación de una sonda para descomprimir el estómago es una intervención que depende del alcance profesional, del equipo y del protocolo, y esta lección no la describe ni la autoriza.' },
        ],
      },
      F([WHO_BEC, bibiano(53, 'Estreñimiento. Obstrucción intestinal', 476), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Oclusión intestinal', definicion: 'Detención del tránsito del contenido a lo largo del intestino, con acumulación y distensión por encima del punto donde se detiene.' },
      { termino: 'Oclusión mecánica', definicion: 'La producida por un obstáculo físico: adherencias de cirugías previas, hernias, tumores o cuerpos extraños.' },
      { termino: 'Oclusión funcional', definicion: 'La que ocurre sin obstáculo porque el intestino deja de moverse, por ejemplo tras una cirugía o en trastornos electrolíticos.' },
      { termino: 'Tétrada clásica', definicion: 'Dolor cólico, vómitos, distensión abdominal y ausencia de emisión de gases y heces.' },
      { termino: 'Silencio abdominal', definicion: 'Desaparición de los ruidos intestinales tras una fase de ruidos de lucha; indica que el cuadro ha avanzado y no que haya mejorado.' },
    ],
    flashcards: [
      { frente: '¿Qué es una oclusión intestinal?', reverso: 'La detención del tránsito intestinal, con acumulación de contenido y gas y distensión del asa por encima del punto donde se detiene.' },
      { frente: 'Mecánica frente a funcional', reverso: 'La mecánica tiene un obstáculo físico; en la funcional no hay obstáculo pero el intestino deja de moverse.' },
      { frente: '¿Cuál es la tétrada clásica?', reverso: 'Dolor cólico, vómitos, distensión abdominal y ausencia de emisión de gases y heces.' },
      { frente: '¿Qué antecedente orienta más hacia una oclusión mecánica?', reverso: 'La cirugía abdominal previa, por las adherencias; se pregunta expresamente y se buscan cicatrices en la inspección.' },
      { frente: 'Los ruidos de lucha desaparecen y el abdomen queda silencioso. ¿Qué significa?', reverso: 'Que el cuadro ha avanzado. Es una mala señal, no una mejoría.' },
      { frente: '¿Por qué puede llegar mal perfundido sin hemorragia?', reverso: 'Porque pierde líquido dentro de la luz intestinal y con los vómitos.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con dolor cólico, vómitos, distensión y sin emitir gases desde ayer. Refiere dos cirugías abdominales previas. ¿Qué sospechas?',
        opciones: [
          'Una gastritis aguda.',
          'Una oclusión intestinal, probablemente mecánica: la cirugía previa es el antecedente que más orienta por las adherencias.',
          'Una colecistitis.',
          'Una deshidratación primaria.',
        ],
        correcta: 1,
        explicacion: 'La tétrada de dolor cólico, vómitos, distensión y ausencia de emisión de gases y heces, con cirugía abdominal previa, orienta hacia una oclusión mecánica.',
      },
      {
        pregunta: 'Al reevaluar, los ruidos de lucha que oías han desaparecido y el abdomen está silencioso. El paciente refiere menos dolor cólico pero está pálido y taquicárdico. ¿Cómo lo interpretas?',
        opciones: [
          'Ha mejorado: los ruidos se han normalizado.',
          'El cuadro ha avanzado; con dolor que se vuelve continuo e hipoperfusión hay que sospechar compromiso de la irrigación del asa y prealertar.',
          'Es el efecto de la posición adoptada.',
          'Indica que la oclusión era funcional y ya se resolvió.',
        ],
        correcta: 1,
        explicacion: 'La desaparición de los ruidos tras una fase de lucha es una mala señal; el dolor continuo con hipoperfusión sugiere que la irrigación del segmento está comprometida.',
      },
      {
        pregunta: 'Durante la inspección encuentras un bulto inguinal doloroso que no se reduce. ¿Qué aporta ese hallazgo?',
        opciones: [
          'Nada relevante para el cuadro abdominal.',
          'Es una causa de oclusión detectable a simple vista que cambia por completo la orientación del cuadro.',
          'Confirma una oclusión funcional.',
          'Indica que el dolor es de pared y no visceral.',
        ],
        correcta: 1,
        explicacion: 'Explorar las regiones inguinales es parte de la valoración: una hernia que no puede reducirse es una causa de oclusión que se detecta en la inspección.',
      },
      {
        pregunta: '¿Puede el prestador colocar una sonda para descomprimir el estómago en este cuadro?',
        opciones: [
          'Sí, siempre que haya distensión.',
          'Depende del alcance profesional, del equipo y del protocolo; esta lección no lo describe ni lo autoriza.',
          'No, en ningún servicio del mundo.',
          'Solo si el paciente ya vomitó.',
        ],
        correcta: 1,
        explicacion: 'Es una intervención dependiente del alcance, del equipo y del protocolo, igual que la decisión entre tratamiento conservador y cirugía corresponde al hospital.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 53, p. 476-481',
      extra: [
        'Mecanismos, tétrada clásica y evolución de los ruidos proceden del capítulo 53 de Bibiano, '
          + 'verificado. No se reproducen criterios radiológicos ni de manejo hospitalario.',
        'La colocación de sonda nasogástrica NO se describe: se declara dependiente del alcance '
          + 'profesional, del equipo y del protocolo.',
      ],
    }),
  },

  // ============================================================
  //  Sangrado de tubo digestivo
  // ============================================================
  'm4-gi-sangrado-tubo': {
    icono: 'cp-servier-ulcera-gastrica',
    duracion: '18 min',
    resumen: 'Cómo se reconoce un sangrado digestivo por su forma de exteriorizarse, cómo se localiza el '
      + 'nivel y por qué la valoración circulatoria manda sobre la cantidad referida.',
    objetivos: [
      'Distinguir el sangrado digestivo alto del bajo por su forma de presentación.',
      'Interpretar hematemesis, melena, hematoquecia y rectorragia.',
      'Valorar la repercusión circulatoria por encima de la cantidad referida.',
      'Ordenar la conducta prehospitalaria y sus límites.',
    ],
    secciones: [
      {
        titulo: 'Alto o bajo: dónde está el límite',
        bloques: [
          { tipo: 'p', texto: 'El aparato digestivo se divide, a efectos de sangrado, en dos territorios separados por un punto anatómico concreto: el ángulo de Treitz, en la unión del duodeno con el yeyuno. El sangrado que se origina por encima de ese punto —esófago, estómago y duodeno— se llama sangrado digestivo alto. El que se origina por debajo se llama sangrado digestivo bajo.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué importa la distinción en la calle', texto: 'No porque el prestador vaya a tratarlos distinto, sino porque la forma en que la sangre se exterioriza permite orientar el nivel, y ese dato ahorra tiempo al equipo receptor. La conducta prehospitalaria, en cambio, es la misma para los dos: valorar la circulación, sostener y trasladar.' },
        ],
      },
      {
        titulo: 'Cómo se exterioriza',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cuatro formas y lo que sugieren',
            headers: ['Forma', 'Qué es', 'Hacia dónde orienta'],
            filas: [
              ['Hematemesis', 'Vómito de sangre, roja o con aspecto de poso de café', 'Sangrado alto'],
              ['Melena', 'Deposición negra, pegajosa y de olor característico', 'Sangrado alto, o bajo si es muy proximal y lento'],
              ['Hematoquecia', 'Sangre roja u oscura mezclada con las heces', 'Sangrado bajo, o alto si es muy abundante y rápido'],
              ['Rectorragia', 'Sangre roja fresca por el ano', 'Sangrado bajo, habitualmente distal'],
            ],
          },
          { tipo: 'p', texto: 'El aspecto de poso de café aparece cuando la sangre ha permanecido en el estómago y ha sido modificada por su contenido ácido; el color negro de la melena procede de la degradación de la sangre a lo largo del tubo digestivo. De ahí que ambas orienten hacia un origen alto: la sangre ha tenido tiempo de transformarse.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Las dos excepciones que hay que conocer', texto: 'Un sangrado alto muy abundante y rápido puede salir por el ano como sangre roja, porque no da tiempo a que se degrade; y una melena puede proceder de un sangrado bajo proximal y lento. Por eso la forma de exteriorización orienta pero no localiza con certeza, y no debe usarse para tranquilizarse.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se pregunta',
            items: [
              'Desde cuándo, cuántos episodios y qué aspecto tenía exactamente.',
              'Si hay vómitos previos intensos antes de la sangre.',
              'Antecedente de enfermedad hepática, de úlcera o de sangrados previos.',
              'Tratamiento con anticoagulantes, antiagregantes o antiinflamatorios.',
              'Consumo de alcohol.',
              'Si ha tomado algo que pueda teñir las heces o el vómito y confundir el cuadro.',
            ],
          },
        ],
      },
      {
        titulo: 'La valoración que manda',
        bloques: [
          { tipo: 'p', texto: 'La cantidad de sangre que el paciente o su familia refieren es una estimación poco fiable: una pequeña cantidad en el suelo o en el inodoro impresiona mucho, y una hemorragia importante puede quedarse dentro del tubo digestivo sin exteriorizarse todavía. Lo que decide la gravedad es la repercusión sobre la circulación.' },
          {
            tipo: 'lista',
            titulo: 'Signos de repercusión circulatoria',
            items: [
              'Piel fría, pálida o moteada, y relleno capilar lento.',
              'Taquicardia mantenida.',
              'Hipotensión, o descenso de la presión durante la atención.',
              'Mareo o pérdida de consciencia al incorporarse.',
              'Alteración del estado de alerta.',
              'Sudoración fría y sensación de gravedad.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El paciente anticoagulado y el paciente hepatópata', texto: 'Dos antecedentes elevan la preocupación de forma inmediata. El paciente en tratamiento anticoagulante sangra más y se detiene peor. El paciente con enfermedad hepática crónica puede sangrar por varices esofágicas, un sangrado alto que puede ser masivo. Ambos datos se preguntan expresamente y se transmiten siempre.' },
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria con atención al estado circulatorio; este cuadro se valora como una hemorragia, no como un síntoma digestivo.',
              'Posición segura, con prevención de la broncoaspiración en el paciente con hematemesis o con estado de alerta alterado.',
              'Oxigenoterapia y accesos vasculares conforme al protocolo del servicio y al alcance profesional.',
              'Anamnesis dirigida a anticoagulación, enfermedad hepática, úlcera previa y consumo de alcohol.',
              'Conservar la información del aspecto de lo expulsado; describirlo en el informe con las palabras del hallazgo.',
              'Traslado sin demora, con prealerta ante cualquier signo de repercusión circulatoria.',
              'Reevaluación continua y registro con hora, incluidos los cambios de la presión y del estado de alerta.',
            ],
          },
        ],
      },
      F([WHO_BEC, bibiano(54, 'Hemorragia digestiva aguda', 485), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Sangrado digestivo alto', definicion: 'El originado por encima del ángulo de Treitz: esófago, estómago y duodeno.' },
      { termino: 'Sangrado digestivo bajo', definicion: 'El originado por debajo del ángulo de Treitz.' },
      { termino: 'Hematemesis', definicion: 'Vómito de sangre, roja o con aspecto de poso de café; orienta hacia un origen alto.' },
      { termino: 'Melena', definicion: 'Deposición negra, pegajosa y de olor característico, producida por la degradación de la sangre a lo largo del tubo digestivo.' },
      { termino: 'Hematoquecia y rectorragia', definicion: 'Sangre mezclada con las heces y sangre roja fresca por el ano; orientan hacia un origen bajo, con excepciones.' },
      { termino: 'Repercusión circulatoria', definicion: 'Lo que decide la gravedad de un sangrado digestivo, por encima de la cantidad de sangre que el paciente refiera.' },
    ],
    flashcards: [
      { frente: '¿Qué punto separa el sangrado digestivo alto del bajo?', reverso: 'El ángulo de Treitz, en la unión del duodeno con el yeyuno.' },
      { frente: '¿Por qué el vómito tiene aspecto de poso de café?', reverso: 'Porque la sangre permaneció en el estómago y fue modificada por su contenido ácido.' },
      { frente: '¿Puede un sangrado alto salir como sangre roja por el ano?', reverso: 'Sí, si es muy abundante y rápido: no da tiempo a que la sangre se degrade.' },
      { frente: '¿Es fiable la cantidad de sangre que refiere el paciente?', reverso: 'No: poca sangre impresiona mucho y una hemorragia importante puede no haberse exteriorizado. Manda la repercusión circulatoria.' },
      { frente: '¿Qué dos antecedentes elevan la preocupación de inmediato?', reverso: 'El tratamiento anticoagulante y la enfermedad hepática crónica, que puede sangrar por varices esofágicas.' },
      { frente: '¿Cómo se valora este cuadro?', reverso: 'Como una hemorragia, no como un síntoma digestivo.' },
    ],
    quiz: [
      {
        pregunta: 'La familia insiste en que «fue muchísima sangre». El paciente está alerta, con piel caliente, bien perfundido y sin taquicardia. ¿Cómo procedes?',
        opciones: [
          'Prealertar como hemorragia masiva por la cantidad referida.',
          'Registrar lo referido, pero graduar la gravedad por la repercusión circulatoria, que ahora es la que manda, y reevaluar.',
          'Descartar el sangrado por la exploración normal.',
          'Dejar al paciente en domicilio con recomendaciones.',
        ],
        correcta: 1,
        explicacion: 'La cantidad referida es una estimación poco fiable; lo que decide la gravedad es la repercusión sobre la circulación, y por eso se reevalúa.',
      },
      {
        pregunta: 'Paciente con enfermedad hepática crónica que vomita sangre roja abundante. ¿Qué te preocupa especialmente?',
        opciones: [
          'Que el vómito manche el interior de la unidad.',
          'Que pueda tratarse de un sangrado por varices esofágicas, un sangrado alto que puede ser masivo, con riesgo añadido de broncoaspiración.',
          'Que la melena aparezca más tarde.',
          'Que se trate de un sangrado bajo distal.',
        ],
        correcta: 1,
        explicacion: 'La enfermedad hepática crónica es uno de los dos antecedentes que elevan la preocupación de forma inmediata, y en la hematemesis debe prevenirse la broncoaspiración.',
      },
      {
        pregunta: 'El paciente presenta sangre roja fresca por el ano. ¿Qué puedes concluir?',
        opciones: [
          'Que el origen es con certeza bajo y distal.',
          'Que orienta hacia un origen bajo, pero un sangrado alto muy abundante y rápido puede presentarse así; la forma orienta y no localiza con certeza.',
          'Que el sangrado es leve por ser rojo.',
          'Que se trata necesariamente de una melena en formación.',
        ],
        correcta: 1,
        explicacion: 'La forma de exteriorización orienta pero no localiza con certeza, y por eso no debe usarse para tranquilizarse.',
      },
      {
        pregunta: '¿Qué antecedente farmacológico se pregunta siempre en este cuadro?',
        opciones: [
          'El uso de antihistamínicos.',
          'El tratamiento con anticoagulantes, antiagregantes o antiinflamatorios.',
          'El uso de suplementos vitamínicos.',
          'La toma de laxantes.',
        ],
        correcta: 1,
        explicacion: 'El paciente en tratamiento anticoagulante sangra más y se detiene peor; es uno de los datos que se preguntan expresamente y se transmiten siempre.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 54, p. 485-490',
      extra: [
        'La división por el ángulo de Treitz y las formas de exteriorización proceden del capítulo 54 '
          + 'de Bibiano, verificado. No se reproducen escalas de riesgo ni criterios endoscópicos.',
        'No se publica ningún umbral numérico de presión, frecuencia o hemoglobina: la gravedad se '
          + 'enseña por signos de repercusión circulatoria.',
        'DECISIÓN PENDIENTE: la academia debe declarar su política de accesos vasculares y aporte de '
          + 'líquidos en la hemorragia digestiva.',
      ],
    }),
  },

  // ============================================================
  //  Cirrosis y hepatitis
  // ============================================================
  'm4-gi-cirrosis-hepatitis': {
    icono: 'cp-servier-cirrosis',
    duracion: '18 min',
    resumen: 'Qué son la hepatitis aguda y la cirrosis, cuáles son las complicaciones que llevan a llamar '
      + 'a una ambulancia y qué protege al prestador y al paciente durante el traslado.',
    objetivos: [
      'Diferenciar la hepatitis aguda de la cirrosis por su curso y su mecanismo.',
      'Reconocer las complicaciones de la cirrosis que motivan una urgencia.',
      'Identificar los signos de fallo hepático grave.',
      'Aplicar las precauciones de protección personal que exige este grupo de pacientes.',
    ],
    secciones: [
      {
        titulo: 'Dos situaciones distintas del mismo órgano',
        bloques: [
          { tipo: 'p', texto: 'La hepatitis aguda es una inflamación del hígado de instauración reciente. Puede deberse a virus, a alcohol, a fármacos o a otras causas, y su curso es limitado en el tiempo: la mayoría se resuelve, aunque una minoría evoluciona a un fallo hepático grave.' },
          { tipo: 'p', texto: 'La cirrosis es el resultado de una lesión mantenida durante años: el tejido hepático normal se sustituye por tejido fibroso, la arquitectura del órgano se desorganiza y la sangre encuentra dificultad para atravesarlo. De esa dificultad —la hipertensión portal— y de la pérdida de función del hígado nacen casi todas sus complicaciones.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Aguda frente a crónica', texto: 'La hepatitis aguda es un episodio; la cirrosis es un estado. El paciente cirrótico no llama a la ambulancia por su cirrosis, sino por una de sus complicaciones, y reconocer cuál es lo que orienta la atención.' },
        ],
      },
      {
        titulo: 'Por qué llama a la ambulancia un paciente cirrótico',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Complicaciones que se presentan como urgencia',
            headers: ['Complicación', 'De dónde nace', 'Cómo se manifiesta'],
            filas: [
              ['Sangrado por varices esofágicas', 'Hipertensión portal', 'Vómito de sangre, con frecuencia abundante, y repercusión circulatoria'],
              ['Ascitis', 'Hipertensión portal y pérdida de función', 'Distensión abdominal progresiva, a veces con dificultad respiratoria'],
              ['Infección del líquido ascítico', 'Ascitis previa', 'Fiebre, dolor abdominal y empeoramiento del estado general'],
              ['Encefalopatía hepática', 'Pérdida de función depuradora del hígado', 'Confusión, somnolencia, inversión del ritmo de sueño y, en casos avanzados, coma'],
              ['Deterioro de la función renal', 'Enfermedad hepática avanzada', 'Disminución de la diuresis y empeoramiento general'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La confusión de un paciente cirrótico', texto: 'Un paciente con cirrosis conocida que llega confuso o somnoliento puede estar en encefalopatía hepática. Ese dato cambia la orientación del cuadro y se transmite expresamente, sin dejar de valorar las demás causas de alteración del estado de alerta, que no desaparecen por tener una enfermedad hepática.' },
          { tipo: 'p', texto: 'Conviene además recordar que el paciente cirrótico sangra con más facilidad, porque el hígado produce factores necesarios para la coagulación. Una hemorragia que en otra persona sería menor puede no detenerse en él.' },
        ],
      },
      {
        titulo: 'Hepatitis aguda: lo que hay que reconocer',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Presentación habitual',
            items: [
              'Malestar general, cansancio y falta de apetito, a veces durante días.',
              'Náuseas y molestia en el hipocondrio derecho.',
              'Coloración amarillenta de la piel y de las conjuntivas.',
              'Orina oscura y, en ocasiones, heces claras.',
              'Fiebre, sobre todo en las de origen infeccioso.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Signos que indican fallo hepático grave',
            items: [
              'Alteración del estado de alerta: confusión, somnolencia o desorientación.',
              'Tendencia al sangrado: hematomas espontáneos, sangrado de encías o por punciones.',
              'Vómitos persistentes con imposibilidad de mantener la ingesta.',
              'Signos de hipoperfusión.',
              'Ictericia intensa y de instauración rápida.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La combinación que define la gravedad', texto: 'Ictericia más alteración del estado de alerta más tendencia al sangrado describe un fallo hepático grave. Cualquiera de los tres aislado puede tener otras explicaciones; los tres juntos en un paciente con hepatitis aguda son un cuadro tiempo-dependiente.' },
        ],
      },
      {
        titulo: 'Conducta, protección y límites',
        bloques: [
          BLOQUE_PROTOCOLO,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Protección personal conforme al protocolo del servicio, con especial cuidado en el manejo de objetos punzocortantes y en el contacto con sangre y fluidos.',
              'Valoración primaria, del estado circulatorio y del estado de alerta.',
              'Anamnesis: enfermedad hepática conocida, episodios previos de sangrado o de confusión, tratamiento habitual, consumo de alcohol y fármacos recientes.',
              'Prevención de la broncoaspiración en el paciente con vómito o con estado de alerta alterado.',
              'Protección frente a caídas y lesiones en el paciente confuso.',
              'Analgesia, líquidos e ingesta oral conforme al protocolo del servicio.',
              'Traslado con prealerta ante sangrado, confusión o signos de hipoperfusión.',
              'Reevaluación continua y registro con hora, anotando la evolución del estado de alerta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Precaución con los fármacos', texto: 'El hígado metaboliza gran parte de los medicamentos. En un paciente con enfermedad hepática avanzada, un fármaco que sería inocuo puede acumularse y agravar el cuadro, y algunos pueden precipitar una encefalopatía. Cualquier administración en este paciente exige el respaldo del protocolo y de la dirección médica, y esta lección no propone ninguna.' },
          { tipo: 'p', texto: 'El estudio de la causa de una hepatitis, el tratamiento de la ascitis y el manejo de la encefalopatía corresponden al ámbito hospitalario y a especialistas. Al prestador le corresponde reconocer la complicación, proteger al paciente durante el traslado y transmitir lo observado.' },
        ],
      },
      F([WHO_BEC, bibiano(56, 'Hepatitis aguda. Insuficiencia hepática aguda grave', 499), bibiano(57, 'Ascitis y encefalopatía hepática', 511), WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Hepatitis aguda', definicion: 'Inflamación del hígado de instauración reciente, por virus, alcohol, fármacos u otras causas; su curso es limitado y la mayoría se resuelve.' },
      { termino: 'Cirrosis', definicion: 'Sustitución del tejido hepático por tejido fibroso tras una lesión mantenida durante años, con desorganización del órgano y dificultad para el paso de la sangre.' },
      { termino: 'Hipertensión portal', definicion: 'Dificultad de la sangre para atravesar el hígado cirrótico; de ella nacen el sangrado por varices y la ascitis.' },
      { termino: 'Encefalopatía hepática', definicion: 'Alteración del estado de alerta por pérdida de la función depuradora del hígado: confusión, somnolencia y, en casos avanzados, coma.' },
      { termino: 'Tendencia al sangrado', definicion: 'Mayor facilidad para sangrar del paciente hepatópata, porque el hígado produce factores necesarios para la coagulación.' },
      { termino: 'Fallo hepático grave', definicion: 'Cuadro definido por la combinación de ictericia, alteración del estado de alerta y tendencia al sangrado.' },
    ],
    flashcards: [
      { frente: 'Hepatitis aguda frente a cirrosis', reverso: 'La hepatitis aguda es un episodio de inflamación reciente; la cirrosis es un estado tras años de lesión, con sustitución del tejido por fibrosis.' },
      { frente: '¿De dónde nacen casi todas las complicaciones de la cirrosis?', reverso: 'De la hipertensión portal y de la pérdida de función del hígado.' },
      { frente: 'Paciente cirrótico que llega confuso. ¿Qué consideras?', reverso: 'Una encefalopatía hepática, sin dejar de valorar las demás causas de alteración del estado de alerta.' },
      { frente: '¿Por qué sangra más el paciente cirrótico?', reverso: 'Porque el hígado produce factores necesarios para la coagulación, y una hemorragia menor puede no detenerse.' },
      { frente: '¿Qué combinación define un fallo hepático grave?', reverso: 'Ictericia más alteración del estado de alerta más tendencia al sangrado.' },
      { frente: '¿Por qué hay precaución con los fármacos en este paciente?', reverso: 'Porque el hígado metaboliza gran parte de ellos: pueden acumularse y algunos precipitar una encefalopatía.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con cirrosis conocida, traído por confusión y somnolencia progresivas desde ayer. ¿Cuál es tu orientación?',
        opciones: [
          'Atribuirlo a la edad y trasladar sin prioridad.',
          'Considerar una encefalopatía hepática, transmitirla expresamente y seguir valorando las demás causas de alteración del estado de alerta.',
          'Descartar causa hepática porque no hay ictericia.',
          'Administrar un sedante para controlar la agitación.',
        ],
        correcta: 1,
        explicacion: 'La encefalopatía hepática nace de la pérdida de función depuradora del hígado; ese dato cambia la orientación, sin que desaparezcan las demás causas posibles.',
      },
      {
        pregunta: 'Un paciente con hepatitis aguda presenta ictericia intensa, está desorientado y le sangran las encías. ¿Cómo lo categorizas?',
        opciones: [
          'Como una hepatitis leve en evolución.',
          'Como un fallo hepático grave: la combinación de ictericia, alteración del estado de alerta y tendencia al sangrado es tiempo-dependiente.',
          'Como una gingivitis coincidente.',
          'Como una deshidratación simple.',
        ],
        correcta: 1,
        explicacion: 'Cualquiera de los tres signos aislado puede tener otra explicación; los tres juntos en un paciente con hepatitis aguda describen un fallo hepático grave.',
      },
      {
        pregunta: '¿Qué precaución específica exige el manejo de estos pacientes al prestador?',
        opciones: [
          'Ninguna distinta de la habitual.',
          'Protección personal conforme al protocolo, con especial cuidado en el manejo de punzocortantes y en el contacto con sangre y fluidos.',
          'Usar exclusivamente material desechable de un solo uso para todo.',
          'Evitar el contacto verbal con el paciente.',
        ],
        correcta: 1,
        explicacion: 'Es la primera medida de la conducta en este grupo de pacientes, junto con la valoración primaria y del estado de alerta.',
      },
      {
        pregunta: 'Por qué se extrema la prudencia con los medicamentos en un paciente con enfermedad hepática avanzada?',
        opciones: [
          'Porque todos los fármacos están contraindicados.',
          'Porque el hígado metaboliza gran parte de ellos: pueden acumularse y algunos precipitar una encefalopatía, de modo que cualquier administración exige respaldo del protocolo y de la dirección médica.',
          'Porque el paciente no puede tragar.',
          'Porque la vía intravenosa está contraindicada en la cirrosis.',
        ],
        correcta: 1,
        explicacion: 'Un fármaco que sería inocuo puede acumularse en este paciente y agravar el cuadro; la lección no propone ninguna administración.',
      },
    ],
    actividades: null,
    revision: ficha({
      capitulos: 'cap. 56, p. 499-510 y cap. 57, p. 511-522',
      extra: [
        'Definiciones, mecanismo de la hipertensión portal y complicaciones proceden de los capítulos '
          + '56 y 57 de Bibiano, verificados. No se reproducen criterios diagnósticos, escalas '
          + 'pronósticas ni valores de laboratorio.',
        'El sangrado por varices esofágicas se nombra como complicación y se remite a la lección de '
          + 'sangrado de tubo digestivo, para no duplicar su desarrollo.',
        'DECISIÓN PENDIENTE: la academia debe declarar sus precauciones de protección personal y su '
          + 'política de administración de fármacos en el paciente hepatópata.',
      ],
    }),
  },
}
