// ============================================================
//  Módulo 4 · Urgencias metabólicas
// ------------------------------------------------------------
//  Unidad completa (1 semana, 5 horas), en el orden del PDF: diabetes mellitus,
//  complicaciones diabéticas y desequilibrio ácido-base.
//
//  Pauta temática: `docs/GUIA-REDACCION-M4-RESTANTE.md`. Fuentes asignadas por
//  el registro para `m4-urgencias-metabolicas`: ADA 2026 y el consenso de
//  crisis hiperglucémicas 2024 como primarias; AMLS y Guyton como apoyo;
//  requiere protocolo local.
//
//  Guyton 13.ª ed. SÍ se abrió: sus capítulos y páginas impresas están
//  verificados el 17 de agosto de 2026 sobre la copia de la biblioteca. Las
//  guías ADA son de acceso restringido y no se consultó su texto, de modo que
//  esta unidad no publica ni un valor de glucemia, ni un umbral, ni una pauta.
//
//  Ácido-base se apoya en Guyton y por eso queda `en_revision`; los dos temas
//  de diabetes dependen de ADA y quedan en `borrador` con la deuda declarada.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const ADA_2026 = {
  nombre: 'American Diabetes Association. Standards of Care in Diabetes, 2026.',
  url: 'https://diabetesjournals.org/care/article/49/Supplement_1/S6/163930/Summary-of-Revisions-Standards-of-Care-in-Diabetes',
  nota: 'Guía rectora de la diabetes y de sus niveles de hipoglucemia. PENDIENTE: sección y tabla '
    + 'exactas; no se consultó el texto completo al redactar y no sostiene ninguna cifra de esta '
    + 'unidad.',
}
const ADA_CRISIS_2024 = {
  nombre: 'ADA/EASD/JBDS/AACE/DTS. Hyperglycemic Crises in Adults With Diabetes: A Consensus Report, '
    + '2024.',
  url: 'https://diabetesjournals.org/care/article/47/8/1257/156808/Hyperglycemic-Crises-in-Adults-With-Diabetes-A',
  nota: 'Documento rector de la cetoacidosis diabética y del estado hiperglucémico hiperosmolar. '
    + 'PENDIENTE: criterios diagnósticos y umbrales exactos; no se consultó el texto completo.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Apoyo curricular asignado por el registro. Capítulo y página PENDIENTES: solo puede '
    + 'precisarlos quien consulte la copia licenciada de la academia. No sostiene ninguna afirmación.',
}

const guyton = (cap, titulo, pagina) => ({
  nombre: `Guyton A. C. y Hall J. E. Compendio de Fisiología Médica, 13.ª ed. Capítulo ${cap}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Fuente de fisiología. Capítulo y página impresa verificados el 17 de agosto de 2026 sobre la '
    + 'copia de la biblioteca de la academia. Sostiene el mecanismo, no la conducta clínica ni dosis.',
})
const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ningún valor de glucemia, umbral diagnóstico, pauta de insulina ni '
  + 'volumen de líquidos. Las guías ADA son de acceso restringido y no se consultó su texto; además, '
  + 'la conducta con glucosa y líquidos depende del formulario y del protocolo del servicio.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocimiento, gravedad, estabilización, reevaluación y '
  + 'destino. No se trasladan al campo pruebas ni tratamientos hospitalarios y la impresión de campo '
  + 'no se presenta como diagnóstico.'
const CONDICIONES = 'Toda intervención farmacológica o avanzada queda condicionada a guía vigente de '
  + 'la indicación, población, contraindicaciones, Información para Prescribir del producto '
  + 'registrado, equipo disponible y competencia autorizada por el protocolo y la dirección médica.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás un valor de glucemia que defina hipoglucemia, ni un umbral de '
    + 'cetoacidosis, ni una pauta de corrección. Una cifra clínica solo se publica cuando constan su '
    + 'población, su indicación, la edición de la guía que la sostiene y el protocolo que la autoriza. '
    + 'Mientras la guía asignada no se haya consultado en su texto y el servicio no entregue su '
    + 'formulario, la cifra se pide al protocolo. Lo que sí se enseña es reconocer el cuadro, '
    + 'distinguir un síndrome de otro y decidir la prioridad del traslado.',
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
    CONDICIONES,
    ...extra,
  ],
  fuentes,
})

export default {
  // ============================================================
  //  Diabetes mellitus
  // ============================================================
  'm4-met-diabetes': {
    icono: '🩸',
    duracion: '20 min',
    resumen: 'Cómo regula el organismo su glucosa, en qué se diferencian funcionalmente los dos tipos de '
      + 'diabetes y qué información necesita recoger el prestador de un paciente diabético.',
    objetivos: [
      'Explicar el papel de la insulina en la regulación de la glucosa.',
      'Diferenciar funcionalmente la diabetes tipo 1 de la tipo 2.',
      'Reconocer las manifestaciones de hiperglucemia mantenida.',
      'Recoger la información de tratamiento y dispositivos que orienta la atención.',
    ],
    secciones: [
      {
        titulo: 'Qué hace la insulina',
        bloques: [
          { tipo: 'p', texto: 'La glucosa es el combustible que la célula usa primero, y su concentración en la sangre se mantiene dentro de un margen mediante hormonas producidas por el páncreas. La insulina es la que permite que la glucosa entre a la mayoría de las células y la que ordena almacenar el excedente; otras hormonas actúan en sentido contrario cuando el nivel baja.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Sin insulina, la glucosa sobra fuera y falta dentro', texto: 'Esa paradoja explica casi todo lo que sigue. Un paciente puede tener la sangre cargada de glucosa y, al mismo tiempo, células que no pueden usarla y que se comportan como si estuvieran en ayuno. De ahí que el organismo empiece a obtener energía por otras vías y aparezcan las consecuencias que se estudian en la lección siguiente.' },
          { tipo: 'p', texto: 'La regulación de la glucosa se estudió en el Módulo 2, en el sistema endocrino, como ejemplo de retroalimentación negativa. Aquí interesa lo que ocurre cuando ese circuito falla y el paciente llama a una ambulancia.' },
        ],
      },
      {
        titulo: 'Dos tipos, dos mecanismos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Diferencia funcional',
            headers: ['', 'Tipo 1', 'Tipo 2'],
            filas: [
              ['Qué falla', 'El páncreas deja de producir insulina', 'La insulina se produce pero el organismo responde peor a ella, y con el tiempo la producción también puede disminuir'],
              ['Inicio habitual', 'Con más frecuencia en edades tempranas, a menudo de forma brusca', 'Con más frecuencia en la edad adulta y de forma gradual'],
              ['Dependencia de insulina', 'Total: sin aporte externo el cuadro se descompensa', 'Variable: puede tratarse con otros medicamentos, con insulina o con ambos'],
              ['Descompensación característica', 'Más propensa a la cetoacidosis', 'Más propensa al estado hiperosmolar, aunque puede presentar cetoacidosis'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ninguna de esas asociaciones es absoluta', texto: 'Hay pacientes con tipo 1 diagnosticados en la edad adulta y pacientes con tipo 2 que desarrollan cetoacidosis. Estas columnas orientan la sospecha; no clasifican al paciente que se tiene delante ni permiten anticipar qué complicación tendrá.' },
          { tipo: 'p', texto: 'Este módulo no enseña el manejo crónico de la diabetes ni el ajuste del tratamiento: pertenece al seguimiento clínico. Lo que aporta es la base para entender por qué se descompensa un paciente y qué información conviene recoger.' },
        ],
      },
      {
        titulo: 'Qué se observa en la hiperglucemia mantenida',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Manifestaciones que el paciente suele referir',
            items: [
              'Orinar mucho y con frecuencia, incluso por la noche: el exceso de glucosa arrastra agua al orinar.',
              'Sed intensa y persistente, consecuencia directa de esa pérdida de agua.',
              'Boca seca y piel con menos elasticidad.',
              'Cansancio y debilidad, porque las células no disponen del combustible que sobra en la sangre.',
              'Pérdida de peso en periodos de descompensación prolongada.',
              'Visión borrosa que fluctúa.',
              'Infecciones repetidas o heridas que tardan en cerrar.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Orinar mucho y tener mucha sed no son dos problemas', texto: 'Son el mismo: la glucosa que se elimina por la orina arrastra agua consigo, y el organismo responde pidiendo líquido. Entender ese encadenamiento explica por qué un paciente hiperglucémico llega deshidratado aunque haya estado bebiendo.' },
        ],
      },
      {
        titulo: 'Qué recoge el prestador',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'lista',
            titulo: 'Historia dirigida',
            items: [
              'Tipo de diabetes, si el paciente lo conoce, y desde cuándo.',
              'Tratamiento habitual: qué toma o se aplica, con qué frecuencia y cuándo fue la última vez.',
              'Si ha omitido dosis, ha cambiado la pauta o se ha quedado sin medicación.',
              'Última ingesta y si ha podido comer y beber con normalidad.',
              'Si hay vómito, diarrea, fiebre o cualquier proceso agudo asociado.',
              'Episodios previos de descompensación y cómo se resolvieron.',
              'Dispositivos que porta y qué información muestran.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Los dispositivos son información y también son un riesgo', texto: 'Cada vez más pacientes portan bombas de infusión de insulina o sensores continuos de glucosa. Identificarlos aporta información valiosa —el propio dispositivo puede mostrar la tendencia reciente—, pero manipularlos, detenerlos o modificar su programación exige conocimiento del equipo y autorización del protocolo. Se identifican, se registran y se transmiten; no se manipulan sin competencia.' },
          { tipo: 'p', texto: 'La glucemia capilar es la medición disponible en el ámbito prehospitalario cuando el equipo existe y el protocolo la autoriza. Es una herramienta útil y tiene límites: puede alterarse por mala técnica, por manos sucias o húmedas, por mala perfusión periférica y en condiciones extremas de temperatura. Una sola cifra tampoco diagnostica diabetes: eso exige criterios que no se aplican en una atención de urgencia.' },
        ],
      },
      F([ADA_2026, guyton(79, 'Insulina, glucagón y diabetes mellitus', 571), bibiano(113, 'Manejo del paciente diabético', 1006), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Insulina', definicion: 'Hormona pancreática que permite la entrada de glucosa a la mayoría de las células y ordena almacenar el excedente.' },
      { termino: 'Glucosa que sobra fuera y falta dentro', definicion: 'Paradoja central de la diabetes: la sangre está cargada de glucosa mientras las células no pueden usarla y se comportan como si estuvieran en ayuno.' },
      { termino: 'Diabetes tipo 1', definicion: 'El páncreas deja de producir insulina; la dependencia del aporte externo es total y es más propensa a la cetoacidosis.' },
      { termino: 'Diabetes tipo 2', definicion: 'El organismo responde peor a la insulina y con el tiempo la producción puede disminuir; es más propensa al estado hiperosmolar.' },
      { termino: 'Poliuria y polidipsia', definicion: 'Orinar mucho y tener mucha sed; no son dos problemas sino uno: la glucosa eliminada arrastra agua y el organismo pide líquido.' },
      { termino: 'Límites de la glucemia capilar', definicion: 'Puede alterarse por técnica, higiene de la piel, mala perfusión periférica y temperatura; una sola cifra no diagnostica diabetes.' },
    ],
    flashcards: [
      { frente: '¿Qué hace la insulina?', reverso: 'Permite que la glucosa entre a la mayoría de las células y ordena almacenar el excedente.' },
      { frente: '¿Por qué un paciente con la sangre llena de glucosa está sin combustible?', reverso: 'Porque sin insulina la glucosa no entra a las células: sobra fuera y falta dentro.' },
      { frente: 'Diferencia funcional entre tipo 1 y tipo 2', reverso: 'En el tipo 1 el páncreas deja de producir insulina; en el tipo 2 el organismo responde peor a ella y con el tiempo la producción también puede disminuir.' },
      { frente: '¿Por qué el paciente hiperglucémico llega deshidratado aunque beba?', reverso: 'Porque la glucosa que se elimina por la orina arrastra agua consigo, y la pérdida supera al aporte.' },
      { frente: '¿Qué se hace con una bomba de insulina o un sensor continuo?', reverso: 'Se identifican, se registran y se transmiten; manipularlos exige conocimiento del equipo y autorización del protocolo.' },
      { frente: '¿Diagnostica diabetes una glucemia capilar de campo?', reverso: 'No: el diagnóstico exige criterios que no se aplican en una atención de urgencia.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente refiere que lleva días orinando mucho y con sed intensa. ¿Cómo se relacionan ambos síntomas?',
        opciones: [
          'Son dos problemas independientes.',
          'Son el mismo: la glucosa eliminada por la orina arrastra agua, y el organismo responde pidiendo líquido.',
          'La sed es psicológica y la poliuria renal.',
          'La sed indica hipoglucemia y la poliuria hiperglucemia.',
        ],
        correcta: 1,
        explicacion: 'Ese encadenamiento explica por qué el paciente hiperglucémico llega deshidratado aunque haya estado bebiendo.',
      },
      {
        pregunta: 'Encuentras un paciente adulto con cetoacidosis. ¿Permite eso concluir que tiene diabetes tipo 1?',
        opciones: [
          'Sí, la cetoacidosis es exclusiva del tipo 1.',
          'No: las asociaciones orientan pero no son absolutas; un paciente con tipo 2 también puede presentarla.',
          'Sí, salvo que sea mayor de 60 años.',
          'No puede saberse sin una glucemia capilar.',
        ],
        correcta: 1,
        explicacion: 'Las columnas comparativas orientan la sospecha; no clasifican al paciente que se tiene delante.',
      },
      {
        pregunta: 'El paciente porta una bomba de infusión de insulina. ¿Qué haces con ella?',
        opciones: [
          'Detenerla de inmediato en cualquier caso.',
          'Identificarla, registrar la información que muestra y transmitirla; manipularla exige conocimiento del equipo y autorización del protocolo.',
          'Aumentar su programación si la glucemia es alta.',
          'Retirarla para facilitar el traslado.',
        ],
        correcta: 1,
        explicacion: 'Los dispositivos son información valiosa y a la vez un riesgo si se manipulan sin competencia.',
      },
      {
        pregunta: 'Obtienes una glucemia capilar en un paciente frío y con mala perfusión periférica. ¿Qué precaución aplica?',
        opciones: [
          'Ninguna: el resultado es siempre fiable.',
          'La mala perfusión periférica figura entre las condiciones que pueden alterar la medición, y el resultado se interpreta con el cuadro clínico.',
          'Debe repetirse siempre en tres dedos distintos.',
          'El resultado solo es válido si el paciente está en ayunas.',
        ],
        correcta: 1,
        explicacion: 'Los límites de la glucemia capilar incluyen técnica, higiene de la piel, perfusión y temperatura.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente A: joven con diabetes conocida desde la infancia que dejó de aplicarse su tratamiento hace dos días. ¿Qué mecanismo explica su descompensación?',
          opciones: [
            'Una respuesta disminuida a la insulina que sí produce.',
            'La ausencia de aporte externo de insulina en un paciente cuyo páncreas ya no la produce.',
            'Un exceso de producción de insulina.',
            'Una alteración renal primaria.',
          ],
          correcta: 1,
          explicacion: 'En el tipo 1 la dependencia del aporte externo es total, y por eso la omisión descompensa el cuadro.',
        },
        {
          pregunta: 'Paciente B: adulto de 68 años con diabetes tipo 2, infección respiratoria de una semana, muy deshidratado y somnoliento. ¿Qué relación tienen sus antecedentes con el cuadro?',
          opciones: [
            'Ninguna: la infección es un hallazgo casual.',
            'Un proceso agudo intercurrente es de los datos que se recogen expresamente, porque puede precipitar una descompensación.',
            'La infección descarta origen metabólico.',
            'La edad excluye la diabetes tipo 2.',
          ],
          correcta: 1,
          explicacion: 'La historia dirigida incluye vómito, diarrea, fiebre o cualquier proceso agudo asociado.',
        },
        {
          pregunta: 'Paciente C: refiere cansancio, visión borrosa fluctuante y heridas que tardan en cerrar. ¿Con qué situación se relacionan esas manifestaciones?',
          opciones: [
            'Con una hipoglucemia mantenida.',
            'Con hiperglucemia mantenida: son manifestaciones que el paciente suele referir en ese contexto.',
            'Con una alteración del equilibrio ácido-base aislada.',
            'Con el uso de un sensor continuo de glucosa.',
          ],
          correcta: 1,
          explicacion: 'Cansancio, visión borrosa fluctuante e infecciones o heridas que tardan figuran entre las manifestaciones de hiperglucemia mantenida.',
        },
      ],
    },
    revision: ficha({
      version: 'ADA Standards of Care 2026 (sección pendiente); Guyton 13.ª ed., cap. 79; Bibiano 3.ª ed., cap. 113',
      fuentes: [
        'ADA. Standards of Care in Diabetes, 2026 (sección pendiente).',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 79, p. 571.',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 113, p. 1006.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: la guía ADA 2026 es de acceso restringido y no se abrió su '
          + 'texto. La lección no publica ningún valor de glucemia ni criterio diagnóstico.',
        'No se enseña manejo crónico ni ajuste de tratamiento: se declara expresamente fuera de '
          + 'alcance por pertenecer al seguimiento clínico.',
        'DECISIÓN PENDIENTE: la academia debe declarar si sus unidades llevan glucómetro, con qué '
          + 'procedimiento, y su política ante pacientes portadores de bomba de insulina o sensor '
          + 'continuo.',
      ],
    }),
  },

  // ============================================================
  //  Complicaciones diabéticas
  // ============================================================
  'm4-met-complicaciones': {
    icono: '⚠️',
    duracion: '22 min',
    resumen: 'Cómo se distinguen en la calle la hipoglucemia, la cetoacidosis y el estado hiperosmolar, y '
      + 'por qué la primera es la que no admite espera.',
    objetivos: [
      'Reconocer la hipoglucemia por sus dos grupos de manifestaciones.',
      'Explicar el mecanismo de la cetoacidosis y del estado hiperosmolar.',
      'Comparar los tres síndromes por inicio, respiración, estado mental y deshidratación.',
      'Identificar el dato que obliga a priorizar el traslado en cada uno.',
    ],
    secciones: [
      {
        titulo: 'Hipoglucemia: la que no espera',
        bloques: [
          { tipo: 'p', texto: 'El sistema nervioso depende de un aporte continuo de glucosa y apenas almacena reservas. Por eso, de las tres complicaciones de esta lección, la hipoglucemia es la que produce daño en menos tiempo y la que se busca primero ante cualquier alteración del estado mental.' },
          {
            tipo: 'tabla',
            titulo: 'Dos grupos de manifestaciones, dos mecanismos',
            headers: ['Grupo', 'Por qué aparece', 'Qué se observa'],
            filas: [
              ['Respuesta autonómica', 'El organismo detecta el descenso y activa mecanismos de alarma', 'Sudoración fría, temblor, palpitaciones, ansiedad, hambre, palidez'],
              ['Neuroglucopenia', 'El sistema nervioso no dispone de combustible', 'Confusión, comportamiento extraño, dificultad para hablar, déficit focal, somnolencia, convulsión, pérdida de la respuesta'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La hipoglucemia imita a casi todo', texto: 'Puede presentarse como una intoxicación, como un ictus con déficit focal, como una crisis convulsiva o como una alteración psiquiátrica. Esa capacidad de imitar es la razón por la que la glucemia se comprueba en toda alteración del estado mental cuando el equipo existe y el protocolo lo autoriza: es una causa frecuente, reversible y que se descarta en un minuto.' },
          { tipo: 'p', texto: 'Conviene además saber que la respuesta autonómica puede faltar. Algunos pacientes con diabetes de larga evolución, o que toman ciertos medicamentos, dejan de percibir las señales de alarma y pasan directamente a las manifestaciones neurológicas. En ellos el primer signo puede ser ya la confusión.' },
        ],
      },
      {
        titulo: 'Cetoacidosis diabética',
        bloques: [
          { tipo: 'p', texto: 'Cuando falta insulina de forma marcada, la glucosa no entra a las células y el organismo, que se comporta como si estuviera en ayuno, empieza a obtener energía degradando grasas. Ese proceso genera unos productos ácidos llamados cuerpos cetónicos, y su acumulación acidifica el medio interno.' },
          {
            tipo: 'lista',
            titulo: 'De ahí salen sus rasgos característicos',
            items: [
              'Deshidratación importante, porque la glucosa elevada arrastra agua al orinar.',
              'Respiración profunda y a veces rápida: el pulmón intenta compensar la acidez eliminando dióxido de carbono, tal como se estudió en el equilibrio ácido-base.',
              'Aliento con olor característico, afrutado, por los cuerpos cetónicos.',
              'Náusea, vómito y dolor abdominal, que pueden llevar a confundir el cuadro con un problema digestivo.',
              'Alteración del estado mental de grado variable.',
              'Instauración relativamente rápida, en horas o pocos días.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El dolor abdominal despista', texto: 'Un paciente joven con dolor abdominal y vómitos puede estar en cetoacidosis, y el cuadro se atribuye a veces a una causa digestiva. La comprobación de la glucemia y la observación del patrón respiratorio son lo que reorienta la sospecha.' },
        ],
      },
      {
        titulo: 'Estado hiperglucémico hiperosmolar',
        bloques: [
          { tipo: 'p', texto: 'Aquí queda suficiente insulina para frenar la producción de cuerpos cetónicos, pero no la bastante para controlar la glucosa. El resultado es una hiperglucemia muy elevada y sostenida durante días, con una pérdida de agua progresiva que llega a ser extrema.' },
          {
            tipo: 'lista',
            titulo: 'Rasgos característicos',
            items: [
              'Instauración lenta: días o incluso semanas.',
              'Deshidratación profunda, habitualmente mayor que en la cetoacidosis.',
              'Alteración neurológica marcada, que puede llegar a la pérdida de la respuesta.',
              'Cetosis escasa o ausente: no suele haber respiración compensatoria ni aliento cetónico.',
              'Con frecuencia hay un desencadenante: infección, imposibilidad de beber, o un paciente que no puede pedir agua por sí mismo.',
              'Más habitual en personas mayores y con diabetes tipo 2.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ninguno de estos rasgos es absoluto', texto: 'Los dos síndromes se solapan y existen presentaciones mixtas. La comparación sirve para orientar la sospecha y para saber qué buscar, no para etiquetar al paciente en la escena. Lo que decide la prioridad no es el nombre del síndrome sino el estado del paciente.' },
        ],
      },
      {
        titulo: 'Comparar, evaluar y decidir',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Tres síndromes, comparados',
            headers: ['', 'Hipoglucemia', 'Cetoacidosis', 'Estado hiperosmolar'],
            filas: [
              ['Instauración', 'Minutos', 'Horas o pocos días', 'Días o semanas'],
              ['Tipo de diabetes más frecuente', 'Cualquiera en tratamiento', 'Con más frecuencia tipo 1', 'Con más frecuencia tipo 2'],
              ['Respiración', 'Sin patrón propio', 'Profunda, compensatoria', 'Sin patrón compensatorio característico'],
              ['Estado mental', 'Alterado, de rápida instauración', 'Alterado, variable', 'Alterado, con frecuencia marcado'],
              ['Deshidratación', 'No característica', 'Importante', 'Profunda'],
              ['Aliento', 'Sin rasgo propio', 'Afrutado', 'Sin rasgo propio'],
            ],
          },
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Evaluación y conducta',
            items: [
              'Valoración primaria: vía aérea, ventilación y circulación antes que el síndrome.',
              'Glucemia capilar en toda alteración del estado mental, si hay equipo y el protocolo lo autoriza.',
              'Valorar el estado de hidratación y la perfusión, además del estado mental.',
              'Buscar el desencadenante: infección, omisión de tratamiento, imposibilidad de beber, isquemia.',
              'Proteger la vía aérea y prevenir la broncoaspiración en el paciente con vómito o con la respuesta alterada.',
              'Corrección de la hipoglucemia y aporte de líquidos únicamente conforme al protocolo del servicio, con el producto y la vía autorizados.',
              'Traslado con prealerta ante alteración del estado mental, deshidratación profunda o signos de hipoperfusión.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace en la ambulancia', texto: 'La insulina y la corrección de las alteraciones de potasio en las crisis hiperglucémicas son decisiones hospitalarias, que dependen de mediciones repetidas que no existen en el ámbito prehospitalario. Administrarlas sin ese control puede producir un daño mayor que el cuadro que se pretende corregir. Esta lección no las describe y solo procederían si existiera un programa local explícito con su protocolo.' },
        ],
      },
      F([ADA_CRISIS_2024, ADA_2026, bibiano(114, 'Hipoglucemia', 1014), bibiano(115, 'Cetoacidosis diabética e hiperglucemia hiperosmolar', 1020), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Respuesta autonómica', definicion: 'Manifestaciones de alarma ante el descenso de glucosa: sudoración fría, temblor, palpitaciones, ansiedad, hambre y palidez.' },
      { termino: 'Neuroglucopenia', definicion: 'Manifestaciones por falta de combustible en el sistema nervioso: confusión, dificultad para hablar, déficit focal, somnolencia, convulsión o pérdida de la respuesta.' },
      { termino: 'Hipoglucemia inadvertida', definicion: 'Situación en que la respuesta autonómica falta y el primer signo es ya la alteración neurológica; ocurre en diabetes de larga evolución o con ciertos medicamentos.' },
      { termino: 'Cuerpos cetónicos', definicion: 'Productos ácidos generados al degradar grasas cuando falta insulina; su acumulación acidifica el medio y explica la respiración compensatoria y el aliento afrutado.' },
      { termino: 'Estado hiperglucémico hiperosmolar', definicion: 'Hiperglucemia muy elevada y sostenida con deshidratación profunda y cetosis escasa, de instauración lenta.' },
      { termino: 'Presentación mixta', definicion: 'Solapamiento entre síndromes que impide etiquetar al paciente en la escena; la prioridad la decide su estado, no el nombre del cuadro.' },
    ],
    flashcards: [
      { frente: '¿Por qué la hipoglucemia es la que no espera?', reverso: 'Porque el sistema nervioso depende de aporte continuo de glucosa y apenas almacena reservas.' },
      { frente: '¿Cuáles son los dos grupos de manifestaciones de la hipoglucemia?', reverso: 'La respuesta autonómica de alarma y la neuroglucopenia por falta de combustible en el sistema nervioso.' },
      { frente: '¿Por qué la respiración es profunda en la cetoacidosis?', reverso: 'Porque el pulmón compensa la acidez eliminando dióxido de carbono.' },
      { frente: '¿Qué distingue al estado hiperosmolar de la cetoacidosis?', reverso: 'Instauración lenta, deshidratación más profunda y cetosis escasa o ausente, sin respiración compensatoria ni aliento cetónico.' },
      { frente: '¿Puede la hipoglucemia parecer un ictus?', reverso: 'Sí: puede producir déficit focal, y también imitar intoxicación, crisis convulsiva o cuadro psiquiátrico.' },
      { frente: '¿Se administra insulina en la ambulancia en una crisis hiperglucémica?', reverso: 'No: depende de mediciones repetidas que no existen en el campo; es decisión hospitalaria salvo programa local explícito.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con déficit focal de aparición brusca y confusión. ¿Qué comprobación no puede omitirse?',
        opciones: [
          'La temperatura corporal.',
          'La glucemia capilar, si hay equipo y el protocolo lo autoriza: la hipoglucemia imita a un ictus y es reversible.',
          'La auscultación pulmonar.',
          'El perímetro abdominal.',
        ],
        correcta: 1,
        explicacion: 'La capacidad de la hipoglucemia de imitar otros cuadros es la razón por la que la glucemia se comprueba en toda alteración del estado mental.',
      },
      {
        pregunta: 'Joven con dolor abdominal, vómitos, respiración profunda y aliento afrutado. ¿Qué sospechas?',
        opciones: [
          'Un cuadro digestivo puro.',
          'Una cetoacidosis: el dolor abdominal despista, y la respiración compensatoria y el aliento reorientan la sospecha.',
          'Un estado hiperosmolar.',
          'Una hipoglucemia inadvertida.',
        ],
        correcta: 1,
        explicacion: 'El dolor abdominal con vómitos en cetoacidosis se atribuye a veces a causa digestiva; la respiración y la glucemia lo reorientan.',
      },
      {
        pregunta: 'Paciente mayor con diabetes tipo 2, deterioro de una semana, deshidratación profunda, muy somnoliento, sin aliento cetónico ni respiración compensatoria. ¿Qué cuadro sugiere?',
        opciones: [
          'Hipoglucemia.',
          'Estado hiperglucémico hiperosmolar, por la instauración lenta, la deshidratación profunda y la cetosis ausente.',
          'Cetoacidosis diabética.',
          'Alcalosis respiratoria.',
        ],
        correcta: 1,
        explicacion: 'Son los rasgos característicos del estado hiperosmolar, aunque ninguno es absoluto y existen presentaciones mixtas.',
      },
      {
        pregunta: 'Un paciente con diabetes de veinte años de evolución pasa directamente a la confusión sin sudoración ni temblor previos. ¿Qué explica esa presentación?',
        opciones: [
          'Que no puede tratarse de hipoglucemia.',
          'Que la respuesta autonómica puede faltar en diabetes de larga evolución o con ciertos medicamentos, y el primer signo es ya la alteración neurológica.',
          'Que se trata necesariamente de un estado hiperosmolar.',
          'Que la glucemia capilar no es fiable en ese paciente.',
        ],
        correcta: 1,
        explicacion: 'Es la hipoglucemia inadvertida: el paciente deja de percibir las señales de alarma.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La confusión, la dificultad para hablar y el déficit focal en una hipoglucemia pertenecen al grupo de manifestaciones por ___.',
          opciones: ['respuesta autonómica', 'neuroglucopenia', 'deshidratación', 'compensación respiratoria'],
          correcta: 1,
          explicacion: 'La respuesta autonómica agrupa sudoración, temblor, palpitaciones, ansiedad, hambre y palidez.',
        },
        {
          texto: 'La respiración profunda de la cetoacidosis es un intento de compensar la acidez eliminando ___.',
          opciones: ['cuerpos cetónicos', 'dióxido de carbono', 'glucosa', 'potasio'],
          correcta: 1,
          explicacion: 'Es el mismo mecanismo respiratorio estudiado en el equilibrio ácido-base.',
        },
        {
          texto: 'El síndrome de instauración más lenta, con deshidratación más profunda y cetosis escasa o ausente, es el ___.',
          opciones: ['hipoglucémico', 'hiperglucémico hiperosmolar', 'cetoacidótico', 'de acidosis respiratoria'],
          correcta: 1,
          explicacion: 'Queda insulina suficiente para frenar la producción de cuerpos cetónicos pero no para controlar la glucosa.',
        },
        {
          texto: 'De los tres síndromes, el que produce daño en menos tiempo y se busca primero ante cualquier alteración del estado mental es la ___.',
          opciones: ['cetoacidosis', 'hipoglucemia', 'hiperosmolaridad', 'acidosis metabólica'],
          correcta: 1,
          explicacion: 'El sistema nervioso depende de aporte continuo de glucosa y apenas almacena reservas.',
        },
      ],
    },
    revision: ficha({
      version: 'ADA/EASD/JBDS/AACE/DTS Hyperglycemic Crises 2024 y ADA 2026 (criterios pendientes); Bibiano 3.ª ed., caps. 114 y 115',
      fuentes: [
        'ADA/EASD/JBDS/AACE/DTS. Hyperglycemic Crises in Adults With Diabetes, 2024 (criterios pendientes).',
        'ADA. Standards of Care in Diabetes, 2026 (niveles de hipoglucemia pendientes).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 114, p. 1014 y cap. 115, p. 1020.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan los niveles de hipoglucemia de ADA y los criterios '
          + 'diagnósticos de las crisis hiperglucémicas, ambos de acceso restringido. La lección no '
          + 'publica ningún valor de glucemia ni umbral.',
        'La comparación entre síndromes se presenta expresamente como orientación y no como '
          + 'clasificación: se declara que los rasgos no son absolutos y que existen presentaciones '
          + 'mixtas.',
        'Insulina y corrección de potasio se declaran hospitalarias y no se describen.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué producto, presentación y vía autoriza su protocolo para '
          + 'corregir una hipoglucemia, y qué política sigue con el aporte de líquidos en las crisis '
          + 'hiperglucémicas?',
      ],
    }),
  },

  // ============================================================
  //  Desequilibrio ácido-base
  // ============================================================
  'm4-met-acido-base': {
    icono: '⚖️',
    duracion: '20 min',
    resumen: 'Cómo se produce cada uno de los cuatro trastornos ácido-base, qué hace el organismo para '
      + 'compensarlos y hasta dónde puede llegar el razonamiento sin una gasometría.',
    objetivos: [
      'Diferenciar el componente respiratorio del metabólico en el equilibrio ácido-base.',
      'Identificar los cuatro trastornos y el cambio primario de cada uno.',
      'Distinguir compensación de corrección.',
      'Reconocer los límites del razonamiento ácido-base sin gasometría ni electrolitos.',
    ],
    secciones: [
      {
        titulo: 'Dos componentes, cuatro trastornos',
        bloques: [
          { tipo: 'p', texto: 'En el Módulo 2 quedó establecido que el organismo mantiene su acidez con tres mecanismos: amortiguadores químicos, pulmón y riñón. Aquí se usa ese marco para ordenar los trastornos que puede encontrarse un prestador.' },
          { tipo: 'p', texto: 'El equilibrio se sostiene sobre dos componentes. El respiratorio depende del dióxido de carbono, que se comporta como ácido y se elimina ventilando. El metabólico depende del bicarbonato, que actúa como base y se regula por vía renal y por consumo. Un trastorno se nombra por el componente que falla primero.' },
          {
            tipo: 'tabla',
            titulo: 'Los cuatro trastornos y su cambio primario',
            headers: ['Trastorno', 'Cambio primario', 'Situación que lo produce'],
            filas: [
              ['Acidosis respiratoria', 'Retención de dióxido de carbono por ventilación insuficiente', 'Depresión respiratoria, obstrucción, agotamiento, enfermedad pulmonar avanzada'],
              ['Alcalosis respiratoria', 'Eliminación excesiva de dióxido de carbono por hiperventilación', 'Ansiedad, dolor, fiebre, hipoxia, algunos tóxicos'],
              ['Acidosis metabólica', 'Acumulación de ácido o pérdida de bicarbonato', 'Hipoperfusión con producción de lactato, cetoacidosis, insuficiencia renal, diarrea intensa, algunos tóxicos'],
              ['Alcalosis metabólica', 'Pérdida de ácido o ganancia de bicarbonato', 'Vómitos abundantes o pérdidas por sonda gástrica, algunos diuréticos'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El nombre indica quién falló, no quién está compensando', texto: 'Una acidosis metabólica con respiración profunda no es un trastorno respiratorio: es un trastorno metabólico con compensación respiratoria. Confundir el cambio primario con la respuesta compensadora es el error conceptual más frecuente de este tema.' },
        ],
      },
      {
        titulo: 'Compensar no es corregir',
        bloques: [
          { tipo: 'p', texto: 'Cuando un componente falla, el otro intenta contrarrestarlo. Esa respuesta se llama compensación y tiene tres características que conviene retener.' },
          {
            tipo: 'lista',
            titulo: 'Cómo funciona la compensación',
            items: [
              'Actúa en sentido contrario al trastorno: si el problema acidifica, la compensación tiende a alcalinizar.',
              'El pulmón compensa a los trastornos metabólicos, y lo hace en minutos.',
              'El riñón compensa a los trastornos respiratorios, y lo hace en horas o días.',
              'La compensación ATENÚA la alteración del pH, pero no lo normaliza ni resuelve la causa.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Compensación agotada es un signo de gravedad', texto: 'Un paciente con acidosis metabólica que respira profundo está compensando; ese esfuerzo consume energía y no puede sostenerse indefinidamente. Si esa respiración disminuye sin que el paciente mejore, no ha mejorado el trastorno: se está agotando la compensación, y eso es un deterioro. Es el mismo patrón de claudicación estudiado en la insuficiencia respiratoria.' },
        ],
      },
      {
        titulo: 'Qué se puede razonar en la calle',
        bloques: [
          { tipo: 'p', texto: 'En el ámbito prehospitalario no hay gasometría ni electrolitos. Lo que sí hay es la capacidad de reconocer situaciones que producen un trastorno previsible y de interpretar un patrón respiratorio dentro de su contexto.' },
          {
            tipo: 'tabla',
            titulo: 'Situación, trastorno esperable y respuesta compensadora',
            headers: ['Situación prehospitalaria', 'Cambio primario esperable', 'Respuesta compensadora general'],
            filas: [
              ['Paciente que ventila de forma insuficiente', 'Acidosis respiratoria', 'Renal, lenta: no se aprecia en el traslado'],
              ['Paciente que hiperventila por ansiedad o dolor', 'Alcalosis respiratoria', 'Renal, lenta: no se aprecia en el traslado'],
              ['Paciente en shock, con hipoperfusión mantenida', 'Acidosis metabólica por lactato', 'Respiratoria, rápida: respiración profunda'],
              ['Paciente con vómitos abundantes y prolongados', 'Alcalosis metabólica', 'Respiratoria, rápida: tendencia a ventilar menos'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La frecuencia respiratoria no diagnostica el trastorno', texto: 'Una respiración rápida puede corresponder a una alcalosis respiratoria primaria por ansiedad o a la compensación de una acidosis metabólica grave. Son situaciones opuestas en gravedad y el patrón respiratorio, por sí solo, no las separa. Lo que orienta es el contexto completo: perfusión, estado mental, antecedentes y evolución.' },
          { tipo: 'p', texto: 'Conviene además dejar dos cosas fuera. La interpretación de una gasometría con sus fórmulas pertenece al ámbito hospitalario y a otro nivel de formación. Y ninguna fórmula de esta materia guarda relación con el cálculo de líquidos en el paciente quemado, que pertenece al Módulo 5: son cálculos distintos, para problemas distintos, y confundirlos ha producido errores documentados.' },
        ],
      },
      F([guyton(31, 'Regulación acidobásica', 230), bibiano(74, 'Alteración del equilibrio ácido-base. Interpretación de la gasometría', 648), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Componente respiratorio', definicion: 'Parte del equilibrio que depende del dióxido de carbono, que se comporta como ácido y se elimina ventilando.' },
      { termino: 'Componente metabólico', definicion: 'Parte del equilibrio que depende del bicarbonato, que actúa como base y se regula por vía renal y por consumo.' },
      { termino: 'Cambio primario', definicion: 'Alteración que inicia el trastorno y le da nombre; no debe confundirse con la respuesta compensadora.' },
      { termino: 'Compensación', definicion: 'Respuesta del componente sano en sentido contrario al trastorno; atenúa la alteración del pH pero no la normaliza ni resuelve la causa.' },
      { termino: 'Compensación agotada', definicion: 'Disminución del esfuerzo compensador sin mejoría del paciente; es un deterioro, no una mejoría.' },
      { termino: 'Límite prehospitalario', definicion: 'Ausencia de gasometría y electrolitos: se razona por situación y contexto, no se diagnostica el trastorno.' },
    ],
    flashcards: [
      { frente: '¿Qué componente regula el pulmón y en cuánto tiempo?', reverso: 'El respiratorio, a través del dióxido de carbono, y compensa los trastornos metabólicos en minutos.' },
      { frente: '¿Qué componente regula el riñón y en cuánto tiempo?', reverso: 'El metabólico, a través del bicarbonato, y compensa los trastornos respiratorios en horas o días.' },
      { frente: 'Un paciente en shock con respiración profunda, ¿qué trastorno tiene?', reverso: 'Acidosis metabólica por lactato con compensación respiratoria; el trastorno primario es metabólico, no respiratorio.' },
      { frente: '¿Normaliza el pH la compensación?', reverso: 'No: lo atenúa, pero no lo normaliza ni resuelve la causa.' },
      { frente: 'La respiración profunda de un paciente en shock disminuye sin que mejore. ¿Qué significa?', reverso: 'Que se está agotando la compensación: es un deterioro, no una mejoría.' },
      { frente: '¿Diagnostica el trastorno la frecuencia respiratoria?', reverso: 'No: una respiración rápida puede ser alcalosis respiratoria primaria o compensación de una acidosis metabólica grave.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con hipoperfusión mantenida que respira de forma profunda y rápida. ¿Cómo se nombra el trastorno?',
        opciones: [
          'Alcalosis respiratoria primaria.',
          'Acidosis metabólica con compensación respiratoria: el trastorno se nombra por el componente que falló primero.',
          'Acidosis respiratoria.',
          'Alcalosis metabólica.',
        ],
        correcta: 1,
        explicacion: 'Confundir el cambio primario con la respuesta compensadora es el error conceptual más frecuente del tema.',
      },
      {
        pregunta: '¿Por qué la compensación renal no se aprecia durante un traslado?',
        opciones: [
          'Porque el riñón no participa en el equilibrio ácido-base.',
          'Porque actúa en horas o días, mientras que la compensación respiratoria actúa en minutos.',
          'Porque solo funciona en pacientes sanos.',
          'Porque requiere gasometría para activarse.',
        ],
        correcta: 1,
        explicacion: 'El pulmón compensa rápido a los trastornos metabólicos y el riñón, lento, a los respiratorios.',
      },
      {
        pregunta: 'Un paciente con vómitos abundantes y prolongados desde hace tres días. ¿Qué cambio primario es esperable?',
        opciones: [
          'Acidosis metabólica por pérdida de bicarbonato.',
          'Alcalosis metabólica por pérdida de ácido.',
          'Acidosis respiratoria.',
          'Alcalosis respiratoria.',
        ],
        correcta: 1,
        explicacion: 'La pérdida de ácido o la ganancia de bicarbonato producen alcalosis metabólica; la diarrea intensa, en cambio, produce acidosis.',
      },
      {
        pregunta: '¿Qué relación guarda esta materia con el cálculo de líquidos del paciente quemado?',
        opciones: [
          'Comparten la misma fórmula.',
          'Ninguna: son cálculos distintos para problemas distintos, y confundirlos ha producido errores documentados.',
          'La fórmula ácido-base sustituye a la de quemados en el adulto.',
          'Ambas se aplican en la misma unidad del plan.',
        ],
        correcta: 1,
        explicacion: 'El cálculo de líquidos del quemado pertenece al Módulo 5 y no tiene relación con el razonamiento ácido-base.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Un paciente que ventila de forma insuficiente retiene dióxido de carbono, lo que produce una ___ respiratoria.',
          opciones: ['alcalosis', 'acidosis', 'compensación', 'hiperoxia'],
          correcta: 1,
          explicacion: 'El dióxido de carbono se comporta como ácido: retenerlo acidifica.',
        },
        {
          texto: 'Ante una acidosis metabólica, la respuesta compensadora general es ___ y actúa en minutos.',
          opciones: ['renal', 'respiratoria', 'hepática', 'hormonal'],
          correcta: 1,
          explicacion: 'El pulmón compensa a los trastornos metabólicos; el riñón compensa a los respiratorios y tarda horas o días.',
        },
        {
          texto: 'Una diarrea intensa y prolongada produce como cambio primario una ___ metabólica.',
          opciones: ['alcalosis', 'acidosis', 'compensación', 'hipoventilación'],
          correcta: 1,
          explicacion: 'Se pierde bicarbonato; los vómitos abundantes, en cambio, producen alcalosis metabólica por pérdida de ácido.',
        },
        {
          texto: 'La compensación atenúa la alteración del pH pero no la ___ ni resuelve la causa.',
          opciones: ['detecta', 'normaliza', 'agrava', 'documenta'],
          correcta: 1,
          explicacion: 'Presentar la compensación como normalización es uno de los errores que la lección advierte.',
        },
      ],
    },
    revision: ficha({
      estado: 'en_revision',
      version: 'Guyton y Hall, 13.ª ed., cap. 31 (verificado); Bibiano 3.ª ed., cap. 74',
      fuentes: [
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 31, p. 230.',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 74, p. 648.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'EN REVISIÓN y no borrador: la fuente central de este tema es Guyton, que SÍ se abrió y se '
          + 'cita con capítulo y página impresa verificados. No depende de ninguna guía restringida.',
        'No se publica ningún valor de pH, presión parcial ni bicarbonato, ni se enseña la '
          + 'interpretación de una gasometría con fórmulas: se declara expresamente hospitalaria.',
        'Se declara expresamente que ninguna fórmula de esta materia se relaciona con el cálculo de '
          + 'líquidos del paciente quemado, que pertenece al Módulo 5.',
      ],
    }),
  },
}
