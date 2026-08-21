// ============================================================
//  Módulo 4 · Urgencias toxicológicas
// ------------------------------------------------------------
//  Unidad completa (1 semana, 5 horas), en el orden del PDF: toxíndromes e
//  intoxicación por medicamentos, síndrome de abstinencia, picadura de alacrán
//  y mordedura de araña, serpientes y abejas, y reacciones anafilácticas.
//
//  Pauta temática: `docs/GUIA-REDACCION-M4-RESTANTE.md`. Fuentes asignadas por
//  el registro para `m4-urgencias-toxicologicas`: AHA 2025 circunstancias
//  especiales (intoxicación y anafilaxia), WHO alcohol/mhGAP, WAO anafilaxia
//  2020, SSA ponzoñosos 2024, COFEPRIS/IPP y AHA primeros auxilios 2024; AMLS
//  como apoyo; requiere protocolo local y centro toxicológico.
//
//  ADVERTENCIA REGISTRADA: el manual de la Secretaría de Salud sobre animales
//  ponzoñosos es una fuente de VIGILANCIA EPIDEMIOLÓGICA. Sirve para describir
//  el problema en México, no para derivar dosis ni pautas de antiveneno.
//
//  Ninguna lección publica dosis, concentraciones ni pautas de antídoto o de
//  antiveneno: dependen de la Información para Prescribir del producto
//  registrado, de la disponibilidad real, de la dirección médica y del
//  protocolo del servicio.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const AHA_TOXICOLOGIA_2025 = {
  nombre: 'AHA 2025 Adult and Pediatric Special Circumstances of Resuscitation: Poisoning and '
    + 'Anaphylaxis.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-and-pediatric-special-circumstances-of-resuscitation',
  nota: 'Guía rectora de la reanimación en circunstancias especiales por intoxicación y anafilaxia. '
    + 'PENDIENTE: sección y algoritmo exactos; no se consultó el texto completo al redactar y no '
    + 'sostiene ninguna dosis de esta unidad.',
}
const WAO_ANAFILAXIA_2020 = {
  nombre: 'World Allergy Organization. Anaphylaxis Guidance 2020.',
  url: 'https://www.worldallergyorganizationjournal.org/article/S1939-4551(20)30375-6/fulltext',
  nota: 'Guía rectora del reconocimiento y tratamiento de la ANAFILAXIA. PENDIENTE: sección exacta de '
    + 'criterios y de dosificación por población; no se consultó el texto completo al redactar.',
}
const WHO_ALCOHOL_2023 = {
  nombre: 'World Health Organization. mhGAP Evidence Centre: Management of Alcohol Withdrawal.',
  url: 'https://www.who.int/teams/mental-health-and-substance-use/treatment-care/mental-health-gap-action-programme/evidence-centre/alcohol-use-disorders',
  nota: 'Referencia de la OMS sobre el manejo de la abstinencia alcohólica. PENDIENTE: sección exacta; '
    + 'no se consultó el texto completo al redactar.',
}
const WHO_MHGAP_2023 = {
  nombre: 'World Health Organization. mhGAP Guideline for Mental, Neurological and Substance Use '
    + 'Disorders, 3.ª edición, 2023.',
  url: 'https://www.who.int/publications/i/item/9789240084278',
  nota: 'Guía de la OMS sobre trastornos por consumo de sustancias. PENDIENTE: sección exacta; no se '
    + 'consultó el texto completo al redactar.',
}
const SSA_PONZONAS_2024 = {
  nombre: 'Secretaría de Salud. Manual de Procedimientos Estandarizados para la Vigilancia '
    + 'Epidemiológica de Intoxicaciones por Animales Ponzoñosos, 2024.',
  url: 'https://epidemiologia.salud.gob.mx/gobmx/salud/documentos/manuales/26_Manual_de_Procedimientos_Ponzona_2024.pdf',
  nota: 'ADVERTENCIA REGISTRADA: es una fuente de VIGILANCIA EPIDEMIOLÓGICA mexicana. Describe el '
    + 'problema, su distribución y su notificación; NO sustituye el protocolo terapéutico ni la '
    + 'Información para Prescribir del antiveneno, y de él no se derivan dosis ni pautas.',
}
const AHA_FIRST_AID_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía de primeros auxilios usada aquí para las medidas iniciales que NO deben aplicarse ante '
    + 'una mordedura o picadura. PENDIENTE: sección exacta; no se consultó el texto completo.',
}
const COFEPRIS_IPP = {
  nombre: 'COFEPRIS. Guía para estructurar y redactar la Información para Prescribir e instructivo, '
    + 'y registro sanitario de medicamentos. Consultada el 16 de agosto de 2026.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de composición, concentración, indicaciones aprobadas, vías y '
    + 'contraindicaciones de cada producto registrado, incluidos antídotos y antivenenos.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Apoyo curricular asignado por el registro. Capítulo y página PENDIENTES. No sostiene ninguna '
    + 'afirmación.',
}

const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ninguna dosis, concentración, pauta de antídoto ni de antiveneno. '
  + 'Dependen de la Información para Prescribir del producto registrado, de la disponibilidad real, '
  + 'de la dirección médica y del protocolo del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: seguridad, reconocimiento, soporte, reevaluación y destino. '
  + 'No se trasladan al campo pruebas ni tratamientos hospitalarios y la impresión de campo no se '
  + 'presenta como diagnóstico.'
const SEGURIDAD = 'La seguridad de la escena precede a toda intervención en esta unidad: hay riesgo '
  + 'de exposición del propio prestador a sustancias, a gases y a animales.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás dosis, concentraciones ni pautas de antídoto o de antiveneno. Una cifra '
    + 'solo se publica cuando constan su población, su indicación, su vía, la Información para '
    + 'Prescribir del producto registrado y el protocolo que la autoriza. En toxicología hay además '
    + 'una razón añadida: el producto disponible varía entre servicios y su presentación cambia la '
    + 'cantidad administrada. Lo que sí se enseña es la seguridad, el reconocimiento del patrón, el '
    + 'soporte y la consulta temprana.',
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
    SEGURIDAD,
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Toxíndromes e intoxicación por medicamentos
  // ============================================================
  'm4-tox-toxindromes': {
    icono: 'cp-cc0-toxico',
    duracion: '22 min',
    resumen: 'Cómo se usan los patrones de signos para orientar la atención de un paciente intoxicado '
      + 'cuando no se sabe qué tomó, y qué se hace mientras tanto.',
    objetivos: [
      'Priorizar la seguridad de la escena y la protección personal ante una exposición.',
      'Recoger la información que orienta: sustancia, cantidad, vía, tiempo y coexposiciones.',
      'Reconocer los patrones de signos que agrupan a los principales toxíndromes.',
      'Aplicar las medidas de soporte comunes y consultar de forma temprana.',
    ],
    secciones: [
      {
        titulo: 'Primero la escena',
        bloques: [
          { tipo: 'p', texto: 'En toxicología la primera víctima potencial es el equipo que llega. Una sustancia que ha afectado a una persona puede afectar a quien entra a atenderla, y algunas exposiciones no se perciben por el olfato ni por la vista.' },
          {
            tipo: 'lista',
            titulo: 'Qué se valora antes de entrar',
            items: [
              'Si hay más de una persona afectada en el mismo lugar, lo que sugiere una exposición ambiental.',
              'Si el espacio es cerrado o mal ventilado.',
              'Si hay olores intensos, humos, nieblas o recipientes derramados.',
              'Si hay señalización de material peligroso o el contexto es laboral o industrial.',
              'Qué protección personal se necesita y si es suficiente la que se lleva.',
              'Si hace falta activar un recurso especializado conforme al protocolo antes de acercarse.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Varias víctimas en el mismo sitio es una señal de alarma', texto: 'Cuando dos o más personas presentan síntomas en un mismo espacio, la hipótesis principal deja de ser una enfermedad individual y pasa a ser una exposición ambiental. En esa situación la conducta correcta puede ser no entrar hasta que la escena sea segura, y hacerlo es una decisión clínica, no una falta de valor.' },
          { tipo: 'p', texto: 'La descontaminación, cuando procede, se realiza conforme al protocolo del servicio y con el equipo adecuado. Retirar la ropa contaminada elimina una parte importante de la exposición, pero cómo, dónde y con qué protección se hace lo establece el procedimiento local.' },
        ],
      },
      {
        titulo: 'La información que orienta',
        bloques: [
          { tipo: 'p', texto: 'La historia vale más que la exploración en este cuadro, y buena parte de ella está en la escena y desaparece si nadie la recoge.' },
          {
            tipo: 'lista',
            titulo: 'Qué preguntar y qué buscar',
            items: [
              'Qué sustancia: nombre, presentación y concentración si consta en el envase.',
              'Cuánta cantidad, o cuánta falta del envase.',
              'Por qué vía: ingerida, inhalada, en contacto con la piel, inyectada.',
              'Cuándo ocurrió: la hora exacta, o la última vez que se vio bien al paciente.',
              'Si hubo más de una sustancia, incluido el alcohol.',
              'Si fue accidental o intencionada; se pregunta con cuidado y sin juicio, porque cambia el riesgo y el seguimiento.',
              'Antecedentes, tratamiento habitual y acceso a medicación de otras personas.',
              'Llevar los envases, blísteres o etiquetas al hospital, o fotografiarlos si no pueden moverse.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Los envases son parte del paciente', texto: 'Un blíster vacío, un frasco o una etiqueta permiten identificar el producto y su concentración con una precisión que ninguna exploración alcanza. Recogerlos y trasladarlos, o fotografiarlos, es una de las aportaciones más útiles y más baratas del ámbito prehospitalario.' },
        ],
      },
      {
        titulo: 'Los patrones',
        bloques: [
          { tipo: 'p', texto: 'Cuando no se sabe qué tomó el paciente, ciertos grupos de signos aparecen juntos con suficiente frecuencia como para orientar la sospecha. Se llaman toxíndromes, y su valor es de reconocimiento: agrupan, no identifican.' },
          {
            tipo: 'tabla',
            titulo: 'Patrones de reconocimiento',
            headers: ['Patrón', 'Qué predomina'],
            filas: [
              ['Opioide', 'Disminución del nivel de conciencia, respiración lenta y superficial, pupilas pequeñas'],
              ['Simpaticomimético', 'Agitación, taquicardia, hipertensión, pupilas dilatadas, piel sudorosa, temperatura elevada'],
              ['Anticolinérgico', 'Confusión y agitación, taquicardia, pupilas dilatadas, piel seca y caliente, retención urinaria, disminución del peristaltismo'],
              ['Colinérgico', 'Secreciones abundantes por todas las vías, pupilas pequeñas, bradicardia, vómito y diarrea, debilidad muscular'],
              ['Sedante-hipnótico', 'Disminución del nivel de conciencia con respiración menos comprometida que en el opioide'],
              ['Serotoninérgico', 'Agitación, temblor, rigidez, aumento de reflejos y temperatura elevada, con antecedente de varios fármacos'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dos patrones que se confunden y una diferencia útil', texto: 'El anticolinérgico y el simpaticomimético comparten agitación, taquicardia y pupilas dilatadas. La diferencia más práctica está en la piel: seca y caliente en el anticolinérgico, sudorosa en el simpaticomimético. Aun así, la distinción no cambia el soporte inicial, que es el mismo, y por eso no conviene detenerse en clasificar antes de sostener al paciente.' },
          { tipo: 'p', texto: 'Conviene además declarar el límite: los patrones se mezclan cuando hay varias sustancias, se distorsionan por el tiempo transcurrido y pueden faltar por completo. Reconocer un patrón es una hipótesis útil; no es una identificación del tóxico ni una indicación de antídoto.' },
        ],
      },
      {
        titulo: 'Qué se hace y qué no',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Soporte común a cualquier intoxicación',
            items: [
              'Seguridad de la escena y protección personal.',
              'Valoración primaria: vía aérea, ventilación y circulación, con atención a la protección de la vía aérea si el nivel de conciencia está alterado.',
              'Glucemia capilar si hay equipo y el protocolo lo autoriza.',
              'Temperatura, en ambos extremos: varios patrones la alteran.',
              'Exploración dirigida: pupilas, piel, peristaltismo, estado mental.',
              'Monitorización conforme al equipo de la unidad y al alcance autorizado.',
              'Consulta temprana con el centro toxicológico o con la dirección médica conforme al protocolo.',
              'Traslado con los envases o sus fotografías, prealerta y registro con hora.',
              'Reevaluación continua: la situación puede cambiar mucho durante el traslado.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Tres cosas que no se hacen', texto: 'No se provoca el vómito: no reduce de forma útil la absorción y aumenta el riesgo de broncoaspiración. No existe ningún «antídoto universal»: la idea es falsa y peligrosa. Y no se administra un antídoto por sospecha de patrón sin indicación respaldada, Información para Prescribir del producto, competencia y protocolo, porque varios antídotos tienen efectos graves si se usan en el paciente equivocado.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La consulta temprana cambia el resultado', texto: 'Los centros de información toxicológica orientan sobre riesgo, evolución esperable y necesidad de medidas específicas, y hacerlo pronto es mucho más útil que hacerlo al llegar. Qué centro, con qué número y en qué momento se consulta lo declara el protocolo del servicio; la academia debe entregar ese dato.' },
        ],
      },
      F([AHA_TOXICOLOGIA_2025, COFEPRIS_IPP, bibiano(153, 'Atención inicial en las intoxicaciones', 1334), bibiano(154, 'Intoxicaciones por fármacos', 1343), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Exposición ambiental', definicion: 'Situación sugerida por varias personas afectadas en un mismo espacio; obliga a asegurar la escena antes de entrar.' },
      { termino: 'Toxíndrome', definicion: 'Agrupación de signos que aparece con suficiente frecuencia como para orientar la sospecha; agrupa pero no identifica el tóxico.' },
      { termino: 'Patrón opioide', definicion: 'Disminución del nivel de conciencia, respiración lenta y superficial y pupilas pequeñas.' },
      { termino: 'Diferencia anticolinérgico–simpaticomimético', definicion: 'La piel: seca y caliente en el anticolinérgico, sudorosa en el simpaticomimético; la distinción no cambia el soporte inicial.' },
      { termino: 'Envases como información', definicion: 'Blísteres, frascos y etiquetas identifican producto y concentración con precisión que ninguna exploración alcanza; se trasladan o se fotografían.' },
      { termino: 'Consulta toxicológica temprana', definicion: 'Contacto con el centro de información conforme al protocolo; orienta sobre riesgo y evolución y es más útil cuanto antes se hace.' },
    ],
    flashcards: [
      { frente: '¿Qué sugiere que varias personas tengan síntomas en el mismo espacio?', reverso: 'Una exposición ambiental; la conducta correcta puede ser no entrar hasta que la escena sea segura.' },
      { frente: '¿Qué es un toxíndrome y cuál es su límite?', reverso: 'Una agrupación de signos que orienta la sospecha; agrupa pero no identifica el tóxico, se mezcla con varias sustancias y puede faltar.' },
      { frente: 'Describe el patrón opioide.', reverso: 'Disminución del nivel de conciencia, respiración lenta y superficial y pupilas pequeñas.' },
      { frente: '¿Qué diferencia práctica separa el anticolinérgico del simpaticomimético?', reverso: 'La piel: seca y caliente frente a sudorosa. Aun así el soporte inicial es el mismo.' },
      { frente: '¿Se provoca el vómito en una intoxicación?', reverso: 'No: no reduce de forma útil la absorción y aumenta el riesgo de broncoaspiración.' },
      { frente: '¿Existe un antídoto universal?', reverso: 'No: la idea es falsa y peligrosa.' },
    ],
    quiz: [
      {
        pregunta: 'Llegas a un taller donde tres trabajadores presentan mareo y dificultad respiratoria. ¿Qué haces primero?',
        opciones: [
          'Entrar y atender al más grave.',
          'Considerar una exposición ambiental y no entrar hasta que la escena sea segura, activando el recurso que corresponda según el protocolo.',
          'Ventilar el local abriendo las ventanas y entrar.',
          'Iniciar la atención con mascarilla quirúrgica.',
        ],
        correcta: 1,
        explicacion: 'Varias víctimas en el mismo sitio cambia la hipótesis principal; no entrar es una decisión clínica, no una falta de valor.',
      },
      {
        pregunta: 'Paciente somnoliento con respiración lenta y superficial y pupilas pequeñas. ¿Qué patrón reconoces y qué significa?',
        opciones: [
          'Anticolinérgico; identifica la sustancia.',
          'Opioide; orienta la sospecha pero no identifica el tóxico ni indica por sí solo un antídoto.',
          'Simpaticomimético; obliga a enfriar al paciente.',
          'Serotoninérgico; exige administrar el antídoto de inmediato.',
        ],
        correcta: 1,
        explicacion: 'Los toxíndromes agrupan, no identifican; y el antídoto exige indicación respaldada, IPP, competencia y protocolo.',
      },
      {
        pregunta: 'Un familiar pregunta si debe provocar el vómito al paciente que ingirió pastillas hace una hora. ¿Qué respondes?',
        opciones: [
          'Que sí, cuanto antes mejor.',
          'Que no: no reduce de forma útil la absorción y aumenta el riesgo de broncoaspiración.',
          'Que solo si el paciente está consciente.',
          'Que lo haga con agua salada.',
        ],
        correcta: 1,
        explicacion: 'Es una de las tres cosas que expresamente no se hacen en esta unidad.',
      },
      {
        pregunta: 'Encuentras blísteres vacíos junto al paciente. ¿Qué haces con ellos?',
        opciones: [
          'Desecharlos para despejar la escena.',
          'Llevarlos al hospital o fotografiarlos: identifican producto y concentración con una precisión que ninguna exploración alcanza.',
          'Anotar solo el color de las pastillas.',
          'Dejarlos para las autoridades y no mencionarlos.',
        ],
        correcta: 1,
        explicacion: 'Recoger los envases es una de las aportaciones más útiles y más baratas del ámbito prehospitalario.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Conjunto A: agitación, taquicardia, pupilas dilatadas, piel SECA y caliente, retención urinaria. ¿Qué patrón sugiere?',
          opciones: [
            'Simpaticomimético.',
            'Anticolinérgico: la piel seca y caliente y la retención urinaria lo separan del simpaticomimético.',
            'Opioide.',
            'Colinérgico.',
          ],
          correcta: 1,
          explicacion: 'La diferencia práctica entre ambos patrones está en la piel, y el anticolinérgico añade retención urinaria y menor peristaltismo.',
        },
        {
          pregunta: 'Conjunto B: secreciones abundantes por todas las vías, pupilas pequeñas, bradicardia, vómito y diarrea. ¿Qué patrón sugiere y qué medida de soporte es prioritaria?',
          opciones: [
            'Sedante-hipnótico; prioridad a la glucemia.',
            'Colinérgico; prioridad a la vía aérea y a la aspiración de secreciones conforme al alcance y al equipo autorizados.',
            'Serotoninérgico; prioridad al control térmico.',
            'Opioide; prioridad a la descontaminación cutánea.',
          ],
          correcta: 1,
          explicacion: 'Las secreciones abundantes con pupilas pequeñas y bradicardia definen el patrón colinérgico, y comprometen la vía aérea.',
        },
        {
          pregunta: 'En cualquiera de esos dos casos no sabes qué sustancia fue. ¿Qué declaras y qué haces?',
          opciones: [
            'Declaras el tóxico identificado y administras su antídoto.',
            'Declaras la incertidumbre, aplicas el soporte común, consultas de forma temprana al centro toxicológico y trasladas con los envases o sus fotografías.',
            'Esperas en la escena hasta identificar la sustancia.',
            'Provocas el vómito para reducir la absorción.',
          ],
          correcta: 1,
          explicacion: 'Reconocer un patrón es una hipótesis útil, no una identificación; el soporte común y la consulta temprana son lo que cambia el resultado.',
        },
      ],
    },
    revision: ficha({
      version: 'AHA 2025 circunstancias especiales (sección pendiente); Bibiano 3.ª ed., caps. 153 y 154; COFEPRIS/IPP',
      fuentes: [
        'AHA 2025 Special Circumstances of Resuscitation: Poisoning (sección pendiente).',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 153, p. 1334 y cap. 154, p. 1343.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de la guía AHA 2025 de circunstancias '
          + 'especiales.',
        'No se nombra ningún antídoto concreto ni se publica ninguna dosis; se declara expresamente que '
          + 'no existe un antídoto universal y que varios antídotos tienen efectos graves en el '
          + 'paciente equivocado.',
        'DECISIÓN PENDIENTE: la academia debe declarar con qué centro de información toxicológica '
          + 'trabaja, su número y en qué momento del proceso indica su protocolo consultarlo; y qué '
          + 'antídotos incluye su formulario.',
      ],
    }),
  },

  // ============================================================
  //  Síndrome de abstinencia
  // ============================================================
  'm4-tox-abstinencia': {
    icono: 'cp-servier-alcohol',
    duracion: '18 min',
    resumen: 'Qué ocurre cuando el organismo adaptado a una sustancia deja de recibirla, por qué la '
      + 'abstinencia de alcohol y sedantes puede matar y qué otras causas hay que descartar antes.',
    objetivos: [
      'Explicar el mecanismo general de la abstinencia.',
      'Diferenciar el perfil de riesgo de la abstinencia de alcohol y sedantes del de opioides.',
      'Reconocer los signos de abstinencia grave.',
      'Descartar las causas médicas coexistentes que imitan o agravan el cuadro.',
    ],
    secciones: [
      {
        titulo: 'Adaptación y retirada',
        bloques: [
          { tipo: 'p', texto: 'Cuando una sustancia se consume de forma repetida, el organismo se adapta a su presencia y ajusta su funcionamiento contando con ella. Si esa sustancia desaparece de golpe, ese ajuste queda descompensado y aparecen manifestaciones que, con frecuencia, van en dirección contraria a los efectos de la sustancia.' },
          { tipo: 'callout', variante: 'clave', titulo: 'De ahí se deduce el cuadro', texto: 'Si una sustancia deprime el sistema nervioso, su retirada produce hiperexcitabilidad: temblor, agitación, aumento de la actividad autonómica y riesgo de convulsión. Entender esa lógica evita memorizar listas y explica por qué las abstinencias de depresores son las peligrosas.' },
          {
            tipo: 'tabla',
            titulo: 'Dos perfiles de riesgo distintos',
            headers: ['', 'Alcohol y sedantes', 'Opioides'],
            filas: [
              ['Qué produce la retirada', 'Hiperexcitabilidad del sistema nervioso', 'Un cuadro con gran malestar y activación autonómica'],
              ['Riesgo vital', 'SÍ: convulsiones y un estado confusional grave con inestabilidad', 'Habitualmente no por sí misma, aunque el malestar es intenso'],
              ['Manifestaciones', 'Temblor, sudoración, ansiedad, náusea, alucinaciones, convulsión, confusión, fiebre e inestabilidad', 'Ansiedad, dolores, calambres, náusea, vómito, diarrea, lagrimeo, rinorrea, bostezos, piloerección, pupilas dilatadas'],
              ['Cronología', 'Variable según la sustancia y el patrón de consumo; puede aparecer horas o días después', 'Variable según la sustancia; las de acción corta empiezan antes'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La abstinencia de depresores es una urgencia médica', texto: 'Es el punto que más se subestima. Un paciente que lleva días sin beber y llega tembloroso, sudoroso y confuso puede evolucionar a un cuadro con convulsiones e inestabilidad que compromete la vida. Tratarlo como un problema de conducta o como una intoxicación es un error grave, y su manejo requiere ámbito hospitalario.' },
        ],
      },
      {
        titulo: 'Reconocer la gravedad',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos que indican abstinencia grave',
            items: [
              'Confusión, desorientación o alteración del nivel de conciencia.',
              'Alucinaciones, con frecuencia visuales.',
              'Agitación intensa que impide la colaboración.',
              'Temblor marcado y generalizado.',
              'Convulsión, presenciada o referida.',
              'Fiebre.',
              'Taquicardia mantenida, hipertensión y sudoración profusa.',
              'Vómito persistente con imposibilidad de mantener la ingesta.',
              'Deshidratación evidente.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Qué preguntar',
            items: [
              'Qué sustancia consume, cuánta y con qué frecuencia.',
              'Cuándo fue la última vez que consumió: es el dato que sitúa el cuadro.',
              'Si ha tenido abstinencias previas y cómo evolucionaron, incluidas convulsiones.',
              'Si consume además otras sustancias, incluida medicación sedante.',
              'Si ha comido y bebido en los últimos días.',
              'Enfermedades conocidas, en particular hepáticas.',
              'Si ha sufrido una caída o un golpe recientes.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La última vez que consumió sitúa todo el cuadro', texto: 'Sin ese dato es difícil distinguir una intoxicación en curso de una abstinencia que empieza, y ambas se manejan de forma distinta. Es una pregunta breve que ordena la valoración, y conviene hacerla pronto.' },
        ],
      },
      {
        titulo: 'Lo que hay que descartar',
        bloques: [
          { tipo: 'p', texto: 'Este es el punto donde se cometen los errores con consecuencias. Un paciente con antecedente de consumo que llega confuso o agitado recibe con frecuencia una etiqueta que cierra la valoración, y bajo esa etiqueta pueden esconderse cuadros graves y tratables.' },
          {
            tipo: 'tabla',
            titulo: 'Qué buscar antes de asumir abstinencia',
            headers: ['Cuadro', 'Por qué se busca'],
            filas: [
              ['Hipoglucemia', 'Frecuente en este perfil de paciente y reversible en minutos; se descarta midiendo'],
              ['Traumatismo craneal', 'Las caídas son frecuentes y el sangrado intracraneal puede presentarse como confusión; el antecedente puede no recordarse'],
              ['Infección', 'Una neumonía o una infección del sistema nervioso pueden presentarse como confusión y fiebre'],
              ['Alteración de electrolitos', 'La desnutrición y los vómitos las favorecen'],
              ['Coingesta o intoxicación en curso', 'Puede coexistir con la abstinencia de otra sustancia'],
              ['Enfermedad hepática descompensada', 'Puede producir alteración del estado mental por sí sola'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La etiqueta que más daño hace', texto: 'Registrar «paciente alcohólico agitado» y detener ahí la valoración. La confusión de este paciente puede ser hipoglucemia, un sangrado intracraneal tras una caída que nadie presenció, o una infección. La conducta correcta es la contraria: en un paciente con consumo crónico, cualquier alteración del estado mental obliga a buscar más, no menos.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Seguridad: la agitación puede comprometer al equipo; se sigue el procedimiento del servicio.',
              'Valoración primaria y del estado de conciencia.',
              'Glucemia capilar si hay equipo y el protocolo lo autoriza.',
              'Temperatura y búsqueda de foco infeccioso.',
              'Exploración buscando lesiones y signos de traumatismo craneal.',
              'Ambiente tranquilo, con poca luz y poco ruido; hablar de forma calmada y orientar al paciente.',
              'Prevención de lesiones por caída y por agitación, sin sujeción salvo lo que el protocolo autorice.',
              'Hidratación y medicación únicamente conforme al protocolo del servicio.',
              'Traslado con prealerta ante signos de abstinencia grave.',
              'Reevaluación continua, con atención a la aparición de convulsiones.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace aquí', texto: 'No se enseña ninguna pauta de desintoxicación: es un tratamiento programado y no una intervención de urgencia. No se administra ningún sedante ni ninguna vitamina sin indicación respaldada, producto con Información para Prescribir, competencia y protocolo. Y no se deja a un paciente con abstinencia grave sin traslado por considerarlo un problema de conducta.' },
        ],
      },
      F([WHO_ALCOHOL_2023, WHO_MHGAP_2023, bibiano(151, 'Síndrome de abstinencia alcohólica', 1324), bibiano(150, 'Intoxicación etílica aguda', 1318)]),
    ],
    conceptosClave: [
      { termino: 'Adaptación y retirada', definicion: 'El organismo ajusta su funcionamiento contando con la sustancia; al desaparecer, el ajuste queda descompensado y aparecen manifestaciones opuestas a sus efectos.' },
      { termino: 'Abstinencia de depresores', definicion: 'Retirada de alcohol o sedantes: produce hiperexcitabilidad con riesgo de convulsión y de un estado confusional grave que compromete la vida.' },
      { termino: 'Abstinencia de opioides', definicion: 'Cuadro de gran malestar y activación autonómica que habitualmente no compromete la vida por sí misma.' },
      { termino: 'Última vez que consumió', definicion: 'Dato que sitúa el cuadro y permite distinguir una intoxicación en curso de una abstinencia que empieza.' },
      { termino: 'Etiqueta que cierra la valoración', definicion: 'Error de registrar al paciente como «agitado por consumo» y detener la búsqueda; bajo esa etiqueta se ocultan hipoglucemia, traumatismo craneal e infección.' },
    ],
    flashcards: [
      { frente: '¿Por qué la retirada de un depresor produce hiperexcitabilidad?', reverso: 'Porque el organismo se había adaptado a su presencia; al desaparecer, el ajuste queda descompensado en dirección contraria.' },
      { frente: '¿Qué abstinencia puede comprometer la vida?', reverso: 'La de alcohol y sedantes, por convulsiones y un estado confusional grave con inestabilidad.' },
      { frente: '¿Cuál es el dato que sitúa el cuadro?', reverso: 'La última vez que consumió; distingue una intoxicación en curso de una abstinencia que empieza.' },
      { frente: 'Nombra tres causas que hay que descartar antes de asumir abstinencia.', reverso: 'Hipoglucemia, traumatismo craneal e infección; también electrolitos, coingesta y enfermedad hepática descompensada.' },
      { frente: '¿Cuál es la etiqueta que más daño hace?', reverso: '«Paciente alcohólico agitado» como conclusión: cierra la valoración y oculta cuadros graves y tratables.' },
      { frente: '¿Se enseña aquí alguna pauta de desintoxicación?', reverso: 'No: es un tratamiento programado, no una intervención de urgencia.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con consumo crónico de alcohol, sin beber desde hace dos días, tembloroso, sudoroso, confuso y con fiebre. ¿Cómo lo categorizas?',
        opciones: [
          'Como un problema de conducta que no requiere traslado.',
          'Como una posible abstinencia grave, que es una urgencia médica con riesgo de convulsiones e inestabilidad y requiere ámbito hospitalario.',
          'Como una intoxicación etílica en curso.',
          'Como un cuadro psiquiátrico primario.',
        ],
        correcta: 1,
        explicacion: 'La abstinencia de depresores es el punto que más se subestima y puede comprometer la vida.',
      },
      {
        pregunta: 'Ese mismo paciente está confuso. ¿Qué obliga a hacer antes de atribuirlo a la abstinencia?',
        opciones: [
          'Nada: el antecedente lo explica.',
          'Buscar hipoglucemia, traumatismo craneal, infección y otras causas: en un paciente con consumo crónico, cualquier alteración del estado mental obliga a buscar más, no menos.',
          'Esperar a que se le pase con el tiempo.',
          'Administrar un sedante para poder explorarlo.',
        ],
        correcta: 1,
        explicacion: 'La etiqueta que cierra la valoración es el error de más consecuencias en este cuadro.',
      },
      {
        pregunta: '¿Qué diferencia el perfil de riesgo de la abstinencia de opioides?',
        opciones: [
          'Que es más peligrosa que la de alcohol.',
          'Que produce gran malestar y activación autonómica pero habitualmente no compromete la vida por sí misma.',
          'Que no produce ningún síntoma.',
          'Que siempre cursa con convulsiones.',
        ],
        correcta: 1,
        explicacion: 'Los dos perfiles se distinguen precisamente por su riesgo vital.',
      },
      {
        pregunta: 'Un compañero propone iniciar una pauta de desintoxicación en la ambulancia. ¿Qué respondes?',
        opciones: [
          'Que es lo indicado para prevenir la convulsión.',
          'Que la desintoxicación es un tratamiento programado y no una intervención de urgencia; cualquier medicación exige indicación respaldada, IPP, competencia y protocolo.',
          'Que puede hacerse si el paciente lo pide.',
          'Que solo procede en la abstinencia de opioides.',
        ],
        correcta: 1,
        explicacion: 'Es una de las cosas que la lección declara expresamente que no se hacen.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso 1: paciente con aliento etílico, somnoliento, que responde con dificultad, sin temblor ni sudoración, y que bebió hace dos horas. ¿Qué es?',
          opciones: [
            'Una abstinencia grave.',
            'Una intoxicación en curso: la última vez que consumió es reciente y predomina la depresión, no la hiperexcitabilidad.',
            'Una emergencia médica coexistente descartada.',
            'Un cuadro de abstinencia de opioides.',
          ],
          correcta: 1,
          explicacion: 'El dato de la última vez que consumió es el que distingue una intoxicación en curso de una abstinencia que empieza.',
        },
        {
          pregunta: 'Caso 2: mismo paciente, tres días después, sin beber, con temblor marcado, sudoración, alucinaciones y fiebre. ¿Qué es y qué prioridad tiene?',
          opciones: [
            'Una intoxicación; prioridad baja.',
            'Una abstinencia grave; prioridad alta, con traslado y prealerta por riesgo de convulsiones e inestabilidad.',
            'Un cuadro psiquiátrico; derivación ambulatoria.',
            'Una hipoglucemia confirmada.',
          ],
          correcta: 1,
          explicacion: 'Alucinaciones, temblor marcado y fiebre figuran entre los signos de abstinencia grave.',
        },
        {
          pregunta: 'Caso 3: mismo perfil de paciente, confuso, con una herida en el cuero cabelludo que nadie sabe cuándo se hizo. ¿Qué añade eso?',
          opciones: [
            'Nada relevante: la confusión ya está explicada.',
            'Obliga a considerar un traumatismo craneal con sangrado intracraneal, que se presenta como confusión y cuyo antecedente puede no recordarse.',
            'Confirma la abstinencia grave.',
            'Indica administrar sedación para explorar la herida.',
          ],
          correcta: 1,
          explicacion: 'Las caídas son frecuentes en este perfil y el sangrado intracraneal es uno de los cuadros que la etiqueta oculta.',
        },
      ],
    },
    revision: ficha({
      version: 'WHO mhGAP alcohol y mhGAP 2023 (secciones pendientes); Bibiano 3.ª ed., caps. 150 y 151',
      fuentes: [
        'WHO mhGAP Evidence Centre: Management of Alcohol Withdrawal (sección pendiente).',
        'WHO mhGAP Guideline, 3.ª ed., 2023 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 151, p. 1324 y cap. 150, p. 1318.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de las referencias de la OMS.',
        'No se publica ninguna escala de gravedad de la abstinencia ni pauta farmacológica; se declara '
          + 'expresamente que la desintoxicación es un tratamiento programado, no de urgencia.',
        'La sujeción física se menciona únicamente remitida a lo que el protocolo autorice, sin '
          + 'describir técnica alguna.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué autoriza su protocolo ante un paciente agitado por '
          + 'abstinencia, y qué política de sujeción y de sedación tiene su servicio?',
      ],
    }),
  },

  // ============================================================
  //  Picadura de alacrán y mordedura de araña, serpientes y abejas
  // ============================================================
  'm4-tox-picaduras': {
    icono: 'cp-dbcls-abeja',
    duracion: '20 min',
    resumen: 'Qué se hace y sobre todo qué no se hace ante una mordedura o picadura, y cómo se reconoce '
      + 'la progresión que convierte una lesión local en un cuadro sistémico.',
    objetivos: [
      'Priorizar la seguridad sin intentar capturar al animal.',
      'Recoger los datos que orientan: hora, sitio y progresión.',
      'Distinguir manifestaciones locales de sistémicas y sus categorías generales.',
      'Corregir las medidas populares que agravan el daño o retrasan la atención.',
    ],
    secciones: [
      {
        titulo: 'Seguridad y datos iniciales',
        bloques: [
          { tipo: 'p', texto: 'La primera regla es que nadie más resulte afectado. La segunda es que el animal no es el objetivo de la atención: el paciente lo es.' },
          {
            tipo: 'lista',
            titulo: 'Qué se hace y qué no en la escena',
            items: [
              'Alejar al paciente del lugar donde ocurrió, si es seguro hacerlo.',
              'NO intentar capturar ni matar al animal: es la causa más frecuente de una segunda víctima.',
              'Si el animal ya está muerto o contenido y puede transportarse con seguridad, hacerlo conforme al protocolo; si no, describirlo o fotografiarlo a distancia.',
              'Anotar la hora exacta de la mordedura o picadura: es el dato que permite valorar la progresión.',
              'Anotar el sitio anatómico exacto.',
              'Retirar anillos, pulseras, relojes y cualquier objeto que comprima la extremidad, antes de que la hinchazón lo impida.',
              'Mantener la extremidad en reposo y en la posición que indique el protocolo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Retirar los anillos es una medida sencilla que evita un problema serio', texto: 'La hinchazón de una extremidad afectada puede progresar en poco tiempo, y un anillo que al principio se quita con facilidad puede convertirse en un torniquete involuntario que compromete la irrigación del dedo. Es una de las intervenciones más rentables de esta lección.' },
        ],
      },
      {
        titulo: 'Local y sistémico',
        bloques: [
          { tipo: 'p', texto: 'Las manifestaciones se ordenan en dos planos, y lo que decide la gravedad es el segundo. Marcar y vigilar la progresión local es útil precisamente porque anticipa el paso de uno a otro.' },
          {
            tipo: 'tabla',
            titulo: 'Los dos planos',
            headers: ['Plano', 'Qué se observa'],
            filas: [
              ['Local', 'Dolor, enrojecimiento, hinchazón, marcas de la lesión, hormigueo o adormecimiento en la zona; su progresión se marca y se vigila'],
              ['Sistémico', 'Manifestaciones generales que indican que el efecto ha superado la zona: son las que deciden la gravedad y la prioridad'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Categorías generales de efecto sistémico',
            headers: ['Categoría', 'Qué predomina'],
            filas: [
              ['Neurotóxica', 'Alteraciones de la sensibilidad y del movimiento, debilidad, dificultad para hablar o tragar, alteración de la visión, compromiso de la respiración'],
              ['Hemotóxica', 'Alteración de la coagulación y del tejido: sangrado por encías o por punciones, hematomas, daño local extenso'],
              ['Autonómica', 'Sudoración, salivación, lagrimeo, vómito, alteraciones de la frecuencia cardiaca y de la presión, agitación'],
              ['Alérgica', 'Reacción sistémica que puede llegar a anafilaxia, sobre todo tras picaduras de himenópteros'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La picadura de abeja puede matar por dos vías distintas', texto: 'Una es la cantidad de veneno, en casos de picaduras múltiples. La otra, mucho más frecuente y más rápida, es la reacción alérgica: una sola picadura puede desencadenar una anafilaxia en una persona sensibilizada, y esa es una urgencia que se aborda en la lección siguiente. Ante cualquier picadura de himenóptero se vigila activamente esa posibilidad.' },
          { tipo: 'p', texto: 'Conviene además saber que en el paciente pediátrico las manifestaciones sistémicas pueden aparecer antes y con menos veneno, por su menor masa corporal. Esa es una razón para elevar la vigilancia y no para calcular nada.' },
        ],
      },
      {
        titulo: 'Lo que NO se hace',
        bloques: [
          { tipo: 'p', texto: 'Este es el contenido más importante de la lección, porque las medidas populares están muy extendidas, se aplican con buena intención y agravan el daño o retrasan la atención que sí sirve.' },
          {
            tipo: 'tabla',
            titulo: 'Medida popular y por qué no se hace',
            headers: ['Lo que se suele hacer', 'Por qué no'],
            filas: [
              ['Hacer una incisión sobre la lesión', 'Añade una herida, aumenta el sangrado y el riesgo de infección, y no retira veneno de forma útil'],
              ['Succionar con la boca o con un dispositivo', 'No retira una cantidad significativa y expone a quien succiona'],
              ['Colocar un torniquete', 'Compromete la irrigación de la extremidad y puede añadir daño isquémico al del veneno'],
              ['Aplicar hielo directamente sobre la piel', 'Añade lesión por frío sobre un tejido ya dañado'],
              ['Aplicar descargas eléctricas', 'No tiene fundamento y produce lesiones adicionales'],
              ['Dar alcohol o remedios por vía oral', 'No aporta y puede dificultar la valoración posterior'],
              ['Retrasar el traslado para observar', 'Es el error que más tiempo cuesta cuando el cuadro progresa'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El daño de estas medidas es doble', texto: 'Añaden una lesión que antes no existía y, sobre todo, consumen el tiempo que el paciente necesitaba para llegar a donde sí puede tratarse. En la mayoría de estos cuadros el tratamiento eficaz es hospitalario, de modo que cualquier minuto invertido en un remedio local es un minuto restado al traslado.' },
        ],
      },
      {
        titulo: 'Conducta y límites',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Seguridad de la escena; no capturar al animal.',
              'Valoración primaria, con atención a la vía aérea y a la aparición de una reacción alérgica.',
              'Retirar objetos que compriman la extremidad.',
              'Inmovilizar la extremidad en reposo, en la posición que indique el protocolo.',
              'Registrar hora y sitio, y marcar el borde de la hinchazón si el protocolo lo contempla, anotando la hora de cada marca.',
              'Buscar activamente manifestaciones sistémicas y repetir esa búsqueda.',
              'Consulta temprana con el centro toxicológico o la dirección médica conforme al protocolo.',
              'Traslado sin demora, con prealerta que indique el animal si se conoce, la hora y la progresión.',
              'Reevaluación continua.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El antiveneno no se decide aquí', texto: 'La indicación de un antiveneno depende del tipo de animal, del cuadro del paciente, de la disponibilidad real del producto, de su Información para Prescribir y de la dirección médica. Además, su administración exige vigilancia por la posibilidad de reacciones. Esta lección no publica ningún producto, dosis ni pauta, y su ausencia no significa que el tratamiento no exista: significa que la decisión corresponde a quien tiene el producto, el protocolo y la competencia.' },
          { tipo: 'p', texto: 'Una precisión sobre las fuentes. El manual mexicano de vigilancia epidemiológica de intoxicaciones por animales ponzoñosos describe el problema, su distribución geográfica y su notificación, y es útil para entender el contexto nacional. No es un protocolo terapéutico y de él no se derivan dosis: eso corresponde a la Información para Prescribir del antiveneno y al protocolo del servicio.' },
        ],
      },
      F([SSA_PONZONAS_2024, AHA_FIRST_AID_2024, COFEPRIS_IPP, bibiano(156, 'Intoxicación por agentes naturales', 1363)]),
    ],
    conceptosClave: [
      { termino: 'No capturar al animal', definicion: 'Regla de seguridad: intentar capturarlo o matarlo es la causa más frecuente de una segunda víctima.' },
      { termino: 'Hora y sitio', definicion: 'Datos que permiten valorar la progresión del cuadro; se registran de inmediato.' },
      { termino: 'Progresión local', definicion: 'Avance de la hinchazón y del dolor que se marca y se vigila porque anticipa el paso a manifestaciones sistémicas.' },
      { termino: 'Categorías de efecto sistémico', definicion: 'Neurotóxica, hemotóxica, autonómica y alérgica; son las que deciden la gravedad y la prioridad.' },
      { termino: 'Doble riesgo del himenóptero', definicion: 'Puede dañar por cantidad de veneno en picaduras múltiples y, más frecuentemente, por reacción alérgica con una sola picadura.' },
      { termino: 'Daño doble de las medidas populares', definicion: 'Añaden una lesión que no existía y consumen el tiempo que el paciente necesitaba para llegar al tratamiento eficaz.' },
    ],
    flashcards: [
      { frente: '¿Se intenta capturar al animal?', reverso: 'No: es la causa más frecuente de una segunda víctima. Si está muerto o contenido y puede transportarse con seguridad, se hace según el protocolo; si no, se describe o fotografía a distancia.' },
      { frente: '¿Por qué se retiran anillos y pulseras de inmediato?', reverso: 'Porque la hinchazón progresa y pueden convertirse en un torniquete involuntario que compromete la irrigación.' },
      { frente: 'Nombra las cuatro categorías de efecto sistémico.', reverso: 'Neurotóxica, hemotóxica, autonómica y alérgica.' },
      { frente: '¿Por qué no se hace incisión ni succión?', reverso: 'Porque no retiran veneno de forma útil, añaden herida y riesgo de infección, y la succión expone a quien la realiza.' },
      { frente: '¿Por qué no se coloca un torniquete?', reverso: 'Porque compromete la irrigación de la extremidad y puede añadir daño isquémico al del veneno.' },
      { frente: '¿Sirve el manual de vigilancia epidemiológica para dosificar antiveneno?', reverso: 'No: describe el problema y su notificación; las dosis proceden de la Información para Prescribir del producto y del protocolo.' },
    ],
    quiz: [
      {
        pregunta: 'Un familiar ha hecho una incisión y está succionando la herida de una mordedura. ¿Qué haces?',
        opciones: [
          'Continuar la succión con un dispositivo específico.',
          'Detenerlo: no retira una cantidad significativa de veneno, añade herida y riesgo de infección, y expone a quien succiona.',
          'Aplicar un torniquete por encima de la herida.',
          'Aplicar hielo directamente sobre la zona.',
        ],
        correcta: 1,
        explicacion: 'Incisión, succión, torniquete e hielo directo figuran entre las medidas que la lección prohíbe expresamente.',
      },
      {
        pregunta: 'Paciente picado por una abeja hace diez minutos que empieza con dificultad respiratoria y sensación de hinchazón en la garganta. ¿Qué priorizas?',
        opciones: [
          'Marcar el borde de la hinchazón local.',
          'La posibilidad de una reacción alérgica sistémica, que es la vía más frecuente y rápida por la que una picadura de himenóptero compromete la vida.',
          'Retirar el aguijón antes que nada.',
          'Aplicar frío en el sitio de la picadura.',
        ],
        correcta: 1,
        explicacion: 'Una sola picadura puede desencadenar anafilaxia en una persona sensibilizada; se vigila activamente esa posibilidad.',
      },
      {
        pregunta: '¿Para qué sirve anotar la hora exacta de la mordedura?',
        opciones: [
          'Para calcular la dosis de antiveneno.',
          'Para valorar la progresión del cuadro, que es lo que anticipa el paso de manifestaciones locales a sistémicas.',
          'Para determinar la especie del animal.',
          'Para decidir si se aplica torniquete.',
        ],
        correcta: 1,
        explicacion: 'La hora y el sitio son los datos que permiten valorar la progresión; la dosis no se deriva de ellos.',
      },
      {
        pregunta: 'Un compañero propone esperar media hora en el domicilio para ver si el cuadro progresa. ¿Qué respondes?',
        opciones: [
          'Que es razonable para evitar traslados innecesarios.',
          'Que retrasar el traslado es el error que más tiempo cuesta cuando el cuadro progresa, y que el tratamiento eficaz es hospitalario.',
          'Que espere solo si no hay hinchazón.',
          'Que aproveche para aplicar hielo mientras tanto.',
        ],
        correcta: 1,
        explicacion: 'Cualquier minuto invertido en observar o en un remedio local es un minuto restado al traslado.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Un vecino te dice lo que ya hizo: «le corté la piel, se la chupé, le puse un torniquete y hielo, y le di un trago de alcohol». ¿Cuál de esas medidas compromete de forma más directa la irrigación de la extremidad?',
          opciones: [
            'La incisión.',
            'El torniquete: compromete la irrigación y puede añadir daño isquémico al del veneno.',
            'El hielo.',
            'El alcohol.',
          ],
          correcta: 1,
          explicacion: 'Cada medida tiene su propio daño; el torniquete es el que actúa directamente sobre la irrigación.',
        },
        {
          pregunta: 'De esa misma lista, ¿cuál expone a una segunda persona?',
          opciones: [
            'El hielo.',
            'La succión con la boca, que expone a quien succiona.',
            'El torniquete.',
            'La incisión.',
          ],
          correcta: 1,
          explicacion: 'La succión no retira una cantidad significativa de veneno y sí expone a quien la realiza.',
        },
        {
          pregunta: 'Además del daño concreto de cada medida, ¿cuál es el perjuicio común a todas ellas?',
          opciones: [
            'Que dificultan identificar al animal.',
            'Que consumen el tiempo que el paciente necesitaba para llegar al tratamiento eficaz, que es hospitalario.',
            'Que impiden marcar la hinchazón.',
            'Que aumentan el dolor.',
          ],
          correcta: 1,
          explicacion: 'El daño de estas medidas es doble: añaden una lesión y restan tiempo al traslado.',
        },
      ],
    },
    revision: ficha({
      version: 'SSA manual de vigilancia 2024 (contexto, no terapéutica); AHA/Cruz Roja primeros auxilios 2024 (sección pendiente); Bibiano 3.ª ed., cap. 156',
      fuentes: [
        'Secretaría de Salud. Manual de Vigilancia Epidemiológica de Intoxicaciones por Animales Ponzoñosos, 2024 (contexto y notificación).',
        '2024 AHA and American Red Cross Guidelines for First Aid (sección pendiente).',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 156, p. 1363.',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de la guía de primeros auxilios 2024.',
        'CONFORME A LA ADVERTENCIA REGISTRADA: el manual de la Secretaría de Salud se usa para el '
          + 'contexto epidemiológico mexicano y la notificación, NUNCA para derivar dosis ni pautas de '
          + 'antiveneno.',
        'CONTROL: la lección prohíbe expresamente incisión, succión, torniquete, hielo directo, '
          + 'descargas y retraso del traslado.',
        'No se nombra ninguna especie concreta ni se publica ningún producto, dosis o pauta de '
          + 'antiveneno.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué antivenenos hay disponibles en su región, con qué '
          + 'procedimiento de acceso, y con qué centro toxicológico trabaja su servicio?',
      ],
    }),
  },

  // ============================================================
  //  Reacciones anafilácticas
  // ============================================================
  'm4-tox-anafilaxia': {
    icono: 'cp-servier-anticuerpo',
    duracion: '20 min',
    resumen: 'Cómo se reconoce una anafilaxia —incluso cuando no hay ninguna lesión en la piel— y por qué '
      + 'la adrenalina intramuscular es la primera línea que nada sustituye.',
    objetivos: [
      'Definir la anafilaxia por el compromiso de sistemas y no por la presencia de urticaria.',
      'Reconocer el cuadro con y sin manifestaciones cutáneas.',
      'Justificar por qué la adrenalina intramuscular es la primera línea.',
      'Ordenar las prioridades de soporte y la vigilancia posterior.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué la define',
        bloques: [
          { tipo: 'p', texto: 'La anafilaxia es una reacción alérgica sistémica de instauración rápida que puede comprometer la vida. Lo que la define no es la intensidad de la erupción cutánea, sino el compromiso de la respiración, de la circulación o de la vía aérea tras una exposición probable.' },
          {
            tipo: 'tabla',
            titulo: 'Qué se afecta y cómo se manifiesta',
            headers: ['Sistema', 'Manifestaciones'],
            filas: [
              ['Vía aérea', 'Sensación de cierre de garganta, dificultad para tragar, voz apagada o ronca, estridor, hinchazón de labios, lengua o úvula'],
              ['Respiración', 'Disnea, sibilancias, tos persistente, opresión torácica, hipoxia'],
              ['Circulación', 'Hipotensión, taquicardia, mareo, síncope, palidez y frialdad'],
              ['Piel y mucosas', 'Urticaria, enrojecimiento generalizado, picor, hinchazón; están presentes en la mayoría de los casos, PERO NO EN TODOS'],
              ['Digestivo', 'Dolor abdominal de tipo cólico, náusea, vómito, diarrea'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La anafilaxia puede ocurrir SIN lesiones en la piel', texto: 'Es el punto más importante de esta lección. Una parte de los casos —y con frecuencia los más graves y de progresión más rápida— cursa sin urticaria ni enrojecimiento. Exigir manifestaciones cutáneas para reconocer una anafilaxia retrasa el tratamiento en precisamente los pacientes que menos margen tienen. Un paciente con exposición probable y compromiso respiratorio o circulatorio tiene una anafilaxia hasta que se demuestre lo contrario, tenga o no urticaria.' },
          { tipo: 'p', texto: 'Los desencadenantes más frecuentes son alimentos, picaduras de himenópteros y medicamentos, pero la exposición puede no identificarse. La ausencia de un desencadenante claro no descarta el cuadro, del mismo modo que su presencia no lo confirma.' },
        ],
      },
      {
        titulo: 'La adrenalina intramuscular es la primera línea',
        bloques: [
          { tipo: 'p', texto: 'De todo el manejo de la anafilaxia, hay un elemento que las guías sitúan por delante de cualquier otro: la administración temprana de adrenalina por vía intramuscular. Es el único tratamiento que actúa sobre los mecanismos que amenazan la vida en este cuadro.' },
          {
            tipo: 'lista',
            titulo: 'Qué puede afirmarse sobre ella sin publicar una cifra',
            items: [
              'Es la primera línea y su administración temprana es lo que más influye en el desenlace.',
              'La vía recomendada en el tratamiento inicial es la intramuscular.',
              'El retraso en administrarla se asocia a peor evolución.',
              'Los antihistamínicos y los corticoides NO la sustituyen: actúan sobre otros aspectos y con otro ritmo.',
              'Puede ser necesaria más de una administración si el cuadro no responde.',
              'La dosis, la concentración del producto, el sitio y el intervalo entre administraciones dependen de la guía vigente, de la Información para Prescribir del producto registrado, de la población del paciente y del protocolo del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Por qué esta lección no publica la dosis', texto: 'La adrenalina se comercializa en más de una concentración, y aplicar la cifra de una presentación a otra produce un error de magnitud grave. Además, la dosis depende de la población y el alcance para administrarla depende del protocolo. Publicar aquí un número, sin conocer el producto real que lleva la unidad, sería exactamente el tipo de error que esta unidad del temario existe para evitar. La cifra se toma del protocolo del servicio y de la información del producto que se tiene en la mano.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El autoinyector del propio paciente', texto: 'Muchos pacientes con alergia conocida portan un dispositivo autoinyector prescrito para ellos. Identificarlo es parte de la valoración, y qué hace el prestador con él —asistir al paciente a usarlo, administrarlo o abstenerse— lo determina el protocolo del servicio y el alcance profesional. Esta lección no lo autoriza ni lo prohíbe: lo remite.' },
        ],
      },
      {
        titulo: 'Soporte y vigilancia',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Prioridades',
            items: [
              'Retirar el desencadenante si es posible y seguro.',
              'Valoración primaria con atención prioritaria a la vía aérea: puede cerrarse con rapidez.',
              'Adrenalina intramuscular conforme a la guía, al producto y al protocolo del servicio, sin retrasarla.',
              'Posición individualizada: la que el paciente tolere. Un paciente con dificultad respiratoria no se acuesta a la fuerza; uno hipotenso no se sienta bruscamente.',
              'Oxigenación y ventilación conforme al protocolo.',
              'Acceso vascular y aporte de líquidos conforme al alcance y al protocolo.',
              'Monitorización continua.',
              'Traslado con prealerta en todos los casos, incluso si el paciente mejora.',
              'Reevaluación continua y registro con hora de cada administración y de la respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuidado con los cambios bruscos de posición', texto: 'En un paciente hipotenso por anafilaxia, incorporarlo o ponerlo de pie de forma brusca puede empeorar de golpe el llenado del corazón. La posición se individualiza y los cambios se hacen con cuidado, sobre todo al movilizar para el traslado.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La mejoría no cierra el episodio', texto: 'Un paciente que mejora tras el tratamiento puede presentar un nuevo empeoramiento horas después. Por eso todos los pacientes con anafilaxia se trasladan y se vigilan, aunque parezcan recuperados, y por eso la negativa a ser trasladado en este cuadro debe manejarse con especial cuidado conforme al procedimiento del servicio.' },
        ],
      },
      F([WAO_ANAFILAXIA_2020, AHA_TOXICOLOGIA_2025, AHA_FIRST_AID_2024, COFEPRIS_IPP, bibiano(163, 'Anafilaxia', 1424)]),
    ],
    conceptosClave: [
      { termino: 'Anafilaxia', definicion: 'Reacción alérgica sistémica de instauración rápida que compromete la vía aérea, la respiración o la circulación tras una exposición probable.' },
      { termino: 'Anafilaxia sin urticaria', definicion: 'Forma que cursa sin manifestaciones cutáneas; con frecuencia entre las más graves, exigir urticaria para reconocerla retrasa el tratamiento.' },
      { termino: 'Adrenalina intramuscular', definicion: 'Primera línea del tratamiento; el único fármaco que actúa sobre los mecanismos que amenazan la vida, y su retraso se asocia a peor evolución.' },
      { termino: 'Antihistamínicos y corticoides', definicion: 'Tratamientos que NO sustituyen a la adrenalina: actúan sobre otros aspectos y con otro ritmo.' },
      { termino: 'Posición individualizada', definicion: 'La que el paciente tolere; los cambios bruscos pueden empeorar el llenado cardiaco en el paciente hipotenso.' },
      { termino: 'Recurrencia', definicion: 'Posibilidad de un nuevo empeoramiento horas después de la mejoría; obliga a trasladar y vigilar aunque el paciente parezca recuperado.' },
    ],
    flashcards: [
      { frente: '¿Qué define una anafilaxia?', reverso: 'El compromiso de la vía aérea, la respiración o la circulación tras una exposición probable, no la intensidad de la erupción.' },
      { frente: '¿Puede haber anafilaxia sin lesiones en la piel?', reverso: 'Sí, y con frecuencia son los casos más graves y de progresión más rápida.' },
      { frente: '¿Cuál es la primera línea del tratamiento?', reverso: 'La adrenalina por vía intramuscular, administrada de forma temprana.' },
      { frente: '¿Sustituyen los antihistamínicos o los corticoides a la adrenalina?', reverso: 'No: actúan sobre otros aspectos y con otro ritmo.' },
      { frente: '¿Por qué esta lección no publica la dosis de adrenalina?', reverso: 'Porque se comercializa en más de una concentración, la dosis depende de la población y el alcance depende del protocolo; la cifra se toma del protocolo y del producto real.' },
      { frente: '¿Se traslada a un paciente que ha mejorado?', reverso: 'Sí: puede presentar un nuevo empeoramiento horas después, por lo que todos se trasladan y se vigilan.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con disnea, sibilancias e hipotensión minutos después de comer, sin ninguna lesión en la piel. ¿Qué consideras?',
        opciones: [
          'Que no puede ser anafilaxia por la ausencia de urticaria.',
          'Que tiene una anafilaxia hasta que se demuestre lo contrario: puede cursar sin manifestaciones cutáneas, y esos casos suelen ser los más graves.',
          'Que se trata de una crisis asmática aislada.',
          'Que debe esperarse la aparición de urticaria para tratar.',
        ],
        correcta: 1,
        explicacion: 'Exigir manifestaciones cutáneas retrasa el tratamiento precisamente en los pacientes con menos margen.',
      },
      {
        pregunta: 'Un compañero propone administrar primero un antihistamínico y esperar. ¿Qué respondes?',
        opciones: [
          'Que es correcto como primer escalón.',
          'Que no sustituye a la adrenalina: actúa sobre otros aspectos y con otro ritmo, y el retraso de la adrenalina se asocia a peor evolución.',
          'Que debe administrarse junto con un corticoide en lugar de adrenalina.',
          'Que solo procede si hay urticaria.',
        ],
        correcta: 1,
        explicacion: 'La adrenalina intramuscular temprana es la primera línea y nada la sustituye.',
      },
      {
        pregunta: 'El paciente está hipotenso y quiere sentarse para el traslado. ¿Qué precaución aplicas?',
        opciones: [
          'Sentarlo rápidamente para movilizarlo antes.',
          'Individualizar la posición y evitar los cambios bruscos, porque incorporarlo de golpe puede empeorar el llenado del corazón.',
          'Acostarlo a la fuerza aunque tenga disnea.',
          'Ponerlo de pie para comprobar la tolerancia.',
        ],
        correcta: 1,
        explicacion: 'La posición se individualiza y los cambios se hacen con cuidado, sobre todo al movilizar para el traslado.',
      },
      {
        pregunta: 'Tras el tratamiento el paciente mejora mucho y quiere quedarse en su domicilio. ¿Qué haces?',
        opciones: [
          'Aceptar, ya que se ha recuperado.',
          'Explicar que puede presentar un nuevo empeoramiento horas después, trasladar y vigilar, y manejar la negativa conforme al procedimiento del servicio.',
          'Dejarlo con indicación de repetir el autoinyector si empeora.',
          'Registrar el alta sin más.',
        ],
        correcta: 1,
        explicacion: 'La mejoría no cierra el episodio: todos los pacientes con anafilaxia se trasladan y se vigilan.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso A: paciente con urticaria generalizada y picor intenso, sin disnea, sin hipotensión y con vía aérea normal. Caso B: paciente sin lesiones cutáneas, con estridor y voz ronca tras una picadura. ¿Cuál cumple criterios de anafilaxia?',
          opciones: [
            'El caso A, por la extensión de la urticaria.',
            'El caso B: hay compromiso de la vía aérea tras exposición probable, y la anafilaxia se define por el compromiso de sistemas, no por la piel.',
            'Ambos por igual.',
            'Ninguno sin conocer el desencadenante exacto.',
          ],
          correcta: 1,
          explicacion: 'Lo que define el cuadro es el compromiso de vía aérea, respiración o circulación tras una exposición probable.',
        },
        {
          pregunta: 'En el caso B, ordena las dos primeras prioridades.',
          opciones: [
            'Administrar un antihistamínico y después valorar la vía aérea.',
            'Valoración de la vía aérea, que puede cerrarse con rapidez, y adrenalina intramuscular sin retrasarla conforme al producto y al protocolo.',
            'Obtener un acceso vascular y después administrar corticoides.',
            'Trasladar primero y tratar en el hospital.',
          ],
          correcta: 1,
          explicacion: 'La vía aérea tiene atención prioritaria y la adrenalina intramuscular temprana es la primera línea.',
        },
        {
          pregunta: '¿Qué dato NO puedes tomar de esta lección para administrar la adrenalina?',
          opciones: [
            'Que la vía inicial recomendada es la intramuscular.',
            'La dosis y la concentración, que dependen del producto real de la unidad, de la población y del protocolo.',
            'Que su retraso se asocia a peor evolución.',
            'Que los antihistamínicos no la sustituyen.',
          ],
          correcta: 1,
          explicacion: 'La adrenalina se comercializa en más de una concentración y aplicar la cifra de una presentación a otra produce un error grave.',
        },
      ],
    },
    revision: ficha({
      version: 'WAO Anaphylaxis Guidance 2020 y AHA 2025 circunstancias especiales (secciones pendientes); Bibiano 3.ª ed., cap. 163',
      fuentes: [
        'World Allergy Organization. Anaphylaxis Guidance 2020 (criterios y dosificación pendientes).',
        'AHA 2025 Special Circumstances of Resuscitation: Anaphylaxis (sección pendiente).',
        '2024 AHA and American Red Cross Guidelines for First Aid (sección pendiente).',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 163, p. 1424.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan los criterios diagnósticos y la dosificación por '
          + 'población de la guía WAO 2020 y de AHA 2025.',
        'CONTROL: la lección declara expresamente que la anafilaxia puede ocurrir SIN lesiones '
          + 'cutáneas y que exigirlas retrasa el tratamiento en los pacientes más graves.',
        'CONTROL: se afirma que la adrenalina intramuscular es la primera línea y que antihistamínicos '
          + 'y corticoides no la sustituyen, SIN publicar dosis, concentración, sitio ni intervalo, y '
          + 'explicando por qué (más de una concentración comercializada).',
        'El uso del autoinyector propio del paciente se remite expresamente al protocolo y al alcance '
          + 'profesional, sin autorizarlo ni prohibirlo.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué presentación y concentración de adrenalina lleva cada tipo de '
          + 'unidad, qué dosis autoriza su protocolo por población, y qué política tiene sobre el '
          + 'autoinyector del paciente?',
      ],
    }),
  },
}
