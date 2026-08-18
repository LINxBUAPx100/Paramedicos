// ============================================================
//  Módulo 4 · Urgencias urinarias
// ------------------------------------------------------------
//  Unidad completa (1 semana, 5 horas), en el orden del PDF: infección de vías
//  urinarias, urolitiasis, desequilibrio electrolítico e insuficiencia renal.
//
//  Pauta temática: `docs/GUIA-REDACCION-M4-RESTANTE.md`. Fuentes asignadas por
//  el registro para `m4-urgencias-urinarias`: IDSA cUTI 2025, EAU urolitiasis
//  2026, UKKA hiperpotasemia 2023, NICE NG148 y KDIGO 2024; AMLS y Guyton como
//  apoyo; requiere protocolo local.
//
//  ADVERTENCIA NORMATIVA REGISTRADA: el borrador KDIGO 2027 sobre lesión renal
//  aguda NO es una guía publicada al corte y no se cita como tal en ninguna
//  parte de esta unidad. Para lesión renal aguda se usa NICE NG148 y para
//  enfermedad renal crónica, KDIGO 2024.
//
//  Guyton 13.ª ed. y Bibiano 3.ª ed. se abrieron y se citan con capítulo y
//  página impresa verificados el 17 de agosto de 2026.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const IDSA_CUTI_2025 = {
  nombre: 'IDSA 2025 Guideline Update on Complicated Urinary Tract Infections.',
  url: 'https://www.idsociety.org/practice-guideline/complicated-urinary-tract-infections/',
  nota: 'Guía rectora de la infección urinaria complicada. PENDIENTE: sección exacta de criterios; no '
    + 'se consultó el texto completo al redactar. No sostiene ninguna indicación antimicrobiana de '
    + 'esta unidad, que no propone ninguna.',
}
const EAU_UROLITIASIS_2026 = {
  nombre: 'European Association of Urology. Guidelines on Urolithiasis, 2026.',
  url: 'https://uroweb.org/guidelines/urolithiasis/chapter/guidelines',
  nota: 'Guía rectora de la urolitiasis. PENDIENTE: sección exacta sobre criterios de urgencia y '
    + 'manejo del dolor; no se consultó el texto completo al redactar.',
}
const UKKA_HIPERPOTASEMIA_2023 = {
  nombre: 'UK Kidney Association. Clinical Practice Guideline: Management of Hyperkalaemia in Adults, '
    + '2023.',
  url: 'https://www.ukkidney.org/health-professionals/guidelines/treatment-acute-hyperkalaemia-adults-0',
  nota: 'Guía rectora de la hiperpotasemia del adulto. PENDIENTE: umbrales y algoritmo exactos; no se '
    + 'consultó el texto completo. Esta lección no publica ningún valor ni pauta de corrección.',
}
const NICE_AKI_2024 = {
  nombre: 'NICE NG148. Acute Kidney Injury: Prevention, Detection and Management, actualizada en 2024.',
  url: 'https://www.nice.org.uk/guidance/ng148/chapter/Recommendations',
  nota: 'Guía rectora de la LESIÓN RENAL AGUDA. Su condición registrada advierte que el borrador '
    + 'KDIGO 2027 permanece como borrador al corte y no debe citarse como guía publicada. PENDIENTE: '
    + 'sección exacta; no se consultó el texto completo.',
}
const KDIGO_2024 = {
  nombre: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney '
    + 'Disease.',
  url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
  nota: 'Guía rectora de la ENFERMEDAD RENAL CRÓNICA. PENDIENTE: sección exacta; no se consultó el '
    + 'texto completo al redactar.',
}
const AHA_ALS_2025 = {
  nombre: 'AHA 2025 Adult Advanced Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support',
  nota: 'Se cita únicamente por su apartado de circunstancias especiales de la reanimación, aplicable '
    + 'a la toxicidad vital por alteraciones electrolíticas. PENDIENTE: sección exacta.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Apoyo curricular asignado por el registro. Capítulo y página PENDIENTES. No sostiene ninguna '
    + 'afirmación.',
}

const guyton = (cap, titulo, pagina) => ({
  nombre: `Guyton A. C. y Hall J. E. Compendio de Fisiología Médica, 13.ª ed. Capítulo ${cap}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Fuente de fisiología. Capítulo y página impresa verificados el 17 de agosto de 2026 sobre la '
    + 'copia de la biblioteca de la academia. Sostiene el mecanismo, no la conducta clínica.',
})
const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publica ningún valor de laboratorio, umbral de electrolitos, dosis ni pauta '
  + 'de corrección. Las guías rectoras no se consultaron en su texto y, además, toda corrección '
  + 'depende de mediciones y de un formulario que el ámbito prehospitalario no tiene.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: reconocimiento, gravedad, estabilización, reevaluación y '
  + 'destino. No se trasladan al campo pruebas ni tratamientos hospitalarios y la impresión de campo '
  + 'no se presenta como diagnóstico.'
const CONDICIONES = 'Toda intervención farmacológica o avanzada queda condicionada a guía vigente de '
  + 'la indicación, población, contraindicaciones, Información para Prescribir, equipo disponible y '
  + 'competencia autorizada por el protocolo y la dirección médica.'
const NO_KDIGO_2027 = 'CONTROL NORMATIVO: el borrador KDIGO 2027 sobre lesión renal aguda permanece '
  + 'como BORRADOR al corte y no se cita como guía publicada. Para lesión renal aguda se usa NICE '
  + 'NG148 y para enfermedad renal crónica, KDIGO 2024.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás valores de laboratorio, umbrales de electrolitos ni pautas de '
    + 'corrección. Una cifra clínica solo se publica cuando constan su población, su indicación, la '
    + 'edición de la guía que la sostiene y el protocolo que la autoriza. En esta unidad hay además '
    + 'una razón añadida: corregir un electrolito o aportar volumen exige mediciones repetidas que no '
    + 'existen en una ambulancia. Lo que sí se enseña es reconocer al paciente en riesgo, sostenerlo '
    + 'y decidir la prioridad del traslado.',
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
  //  Infección de vías urinarias
  // ============================================================
  'm4-uri-ivu': {
    icono: '🦠',
    duracion: '18 min',
    resumen: 'Cómo se distinguen los síntomas urinarios bajos de una infección que ha ascendido o se ha '
      + 'complicado, y qué convierte a un paciente con disuria en un traslado prioritario.',
    objetivos: [
      'Distinguir los síntomas urinarios bajos de los datos de infección alta o complicada.',
      'Identificar los grupos de riesgo de infección complicada.',
      'Reconocer la sospecha de sepsis como el cambio que altera la prioridad.',
      'Justificar por qué el antibiótico no es una decisión prehospitalaria.',
    ],
    secciones: [
      {
        titulo: 'Baja, alta y complicada',
        bloques: [
          { tipo: 'p', texto: 'El aparato urinario forma un conducto continuo: los riñones producen la orina, los uréteres la conducen, la vejiga la almacena y la uretra la evacua. Una infección puede quedarse en la parte baja de ese recorrido o ascender hacia el riñón, y esa diferencia de altura es la que separa un cuadro molesto de uno potencialmente grave.' },
          {
            tipo: 'tabla',
            titulo: 'Qué se observa según dónde asiente',
            headers: ['Nivel', 'Qué predomina'],
            filas: [
              ['Baja: vejiga y uretra', 'Ardor al orinar, necesidad frecuente y urgente de hacerlo, molestia suprapúbica, orina turbia o de olor fuerte; el estado general suele conservarse'],
              ['Alta: riñón', 'Fiebre, escalofríos, dolor en el flanco o en la región lumbar, náusea y vómito, con afectación del estado general'],
            ],
          },
          { tipo: 'p', texto: 'Aparte de la altura está la complicación. Se llama complicada a la infección que ocurre en un paciente o en un aparato urinario que la hacen más difícil de resolver y más propensa a evolucionar mal, con independencia de dónde asiente.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones que hacen complicada una infección urinaria',
            items: [
              'Embarazo.',
              'Obstrucción del flujo de orina, incluida la litiasis.',
              'Portadores de sonda vesical u otros dispositivos urinarios.',
              'Enfermedad renal previa o riñón único.',
              'Diabetes y otras causas de inmunosupresión.',
              'Edad avanzada y dependencia funcional.',
              'Infecciones repetidas o instrumentación urológica reciente.',
              'Anomalías anatómicas conocidas del aparato urinario.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No toda disuria es infección', texto: 'El ardor al orinar puede deberse a causas no infecciosas, y en la mujer joven un cuadro genital puede presentarse así. Etiquetar toda disuria como infección urinaria cierra la valoración antes de tiempo. En la calle no se confirma el diagnóstico: se decide la gravedad y el destino.' },
        ],
      },
      {
        titulo: 'Reconocer al paciente que se está complicando',
        bloques: [
          { tipo: 'p', texto: 'La pregunta prehospitalaria no es qué germen tiene el paciente, sino si su infección está produciendo una repercusión general. Esa repercusión se detecta con lo que ya se sabe valorar.' },
          {
            tipo: 'lista',
            titulo: 'Signos que cambian la categoría del cuadro',
            items: [
              'Alteración del estado mental, confusión o desorientación de aparición reciente.',
              'Signos de hipoperfusión: piel fría, pálida o moteada, relleno capilar lento.',
              'Taquicardia mantenida, hipotensión o descenso de la presión durante la atención.',
              'Trabajo respiratorio aumentado o taquipnea marcada.',
              'Fiebre elevada o, al contrario, hipotermia.',
              'Vómitos que impiden mantener la ingesta.',
              'Dolor en el flanco intenso con imposibilidad de orinar.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuando la sospecha pasa a ser de sepsis', texto: 'Si a un foco infeccioso se le añaden signos de disfunción de órganos —sensorio alterado, compromiso respiratorio o hipoperfusión—, la sospecha deja de ser una infección urinaria y pasa a ser una sepsis. Con ella cambia la prioridad: el traslado se vuelve tiempo-dependiente y la prealerta deja de ser opcional. Qué criterios de identificación y qué medidas iniciales aplica el servicio lo declara su protocolo.' },
          { tipo: 'p', texto: 'En el adulto mayor conviene una advertencia. La confusión de aparición reciente puede ser la primera y a veces la única manifestación de una infección urinaria con repercusión, sin fiebre ni síntomas urinarios claros. Atribuirla a la edad retrasa la identificación de un paciente grave.' },
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
              'Protección personal conforme al protocolo del servicio.',
              'Valoración primaria y del estado circulatorio antes de centrarse en el síntoma urinario.',
              'Anamnesis: tiempo de evolución, síntomas urinarios, fiebre, dolor lumbar, vómitos, embarazo posible, sonda o dispositivos, enfermedad renal, diabetes e infecciones previas.',
              'Valoración del estado mental y de la perfusión, con especial atención en el adulto mayor.',
              'Aporte de líquidos y analgesia conforme al protocolo del servicio.',
              'Traslado con prealerta ante signos de repercusión general o sospecha de sepsis.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dos cosas que no se hacen', texto: 'La primera: retrasar el traslado de un paciente con repercusión general para obtener una muestra de orina. La muestra puede tomarse en el hospital y el tiempo perdido no se recupera. La segunda: iniciar un antibiótico en la ambulancia. Su elección depende de la gravedad, del sitio donde se atenderá al paciente, de sus alergias, de su función renal y de los patrones de resistencia locales; es una decisión de la guía de la entidad y del médico responsable, y esta lección no propone ninguno.' },
        ],
      },
      F([IDSA_CUTI_2025, bibiano(97, 'Infecciones del tracto urinario', 869), bibiano(91, 'Sepsis: atención en urgencias', 801), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Infección urinaria baja', definicion: 'La que asienta en vejiga y uretra; predominan ardor, frecuencia y urgencia, con estado general conservado.' },
      { termino: 'Infección urinaria alta', definicion: 'La que asciende al riñón; añade fiebre, escalofríos, dolor en flanco y afectación del estado general.' },
      { termino: 'Infección complicada', definicion: 'La que ocurre en un paciente o en un aparato urinario que la hacen más difícil de resolver y más propensa a evolucionar mal, con independencia de su altura.' },
      { termino: 'Sospecha de sepsis', definicion: 'Foco infeccioso con signos de disfunción de órganos; cambia la prioridad y vuelve el traslado tiempo-dependiente.' },
      { termino: 'Confusión en el adulto mayor', definicion: 'Puede ser la primera y única manifestación de una infección urinaria con repercusión, sin fiebre ni síntomas urinarios claros.' },
    ],
    flashcards: [
      { frente: '¿Qué separa una infección urinaria baja de una alta?', reverso: 'La altura del recorrido: la baja asienta en vejiga y uretra; la alta asciende al riñón y añade fiebre, dolor en flanco y afectación general.' },
      { frente: '¿Qué hace «complicada» a una infección urinaria?', reverso: 'Que ocurra en un paciente o en un aparato urinario que la hacen más difícil de resolver, con independencia de dónde asiente.' },
      { frente: 'Nombra tres situaciones de infección complicada.', reverso: 'Embarazo, obstrucción del flujo y portador de sonda vesical; también enfermedad renal, diabetes, edad avanzada e instrumentación reciente.' },
      { frente: '¿Cuándo la sospecha pasa a ser de sepsis?', reverso: 'Cuando al foco infeccioso se le añaden signos de disfunción de órganos: sensorio alterado, compromiso respiratorio o hipoperfusión.' },
      { frente: '¿Qué significa una confusión reciente en un adulto mayor con infección?', reverso: 'Puede ser la primera y única manifestación de repercusión; atribuirla a la edad retrasa identificar a un paciente grave.' },
      { frente: '¿Se retrasa el traslado para obtener una muestra de orina?', reverso: 'No: la muestra puede tomarse en el hospital y el tiempo perdido no se recupera.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 82 años traída por confusión de un día, sin fiebre ni síntomas urinarios referidos. Está taquicárdica y con piel moteada. ¿Cómo lo valoras?',
        opciones: [
          'Como un deterioro cognitivo propio de la edad.',
          'Como posible infección con repercusión general: en el adulto mayor la confusión puede ser la primera manifestación, y los signos de hipoperfusión abren la sospecha de sepsis.',
          'Como una infección urinaria baja no complicada.',
          'Como un cuadro que puede observarse en domicilio.',
        ],
        correcta: 1,
        explicacion: 'La confusión reciente en el adulto mayor puede ser la única manifestación, y con signos de disfunción de órganos la sospecha pasa a ser de sepsis.',
      },
      {
        pregunta: 'Paciente embarazada con ardor al orinar y febrícula. ¿Qué categoría le corresponde?',
        opciones: [
          'Infección baja no complicada, por los síntomas.',
          'Infección complicada: el embarazo figura entre las situaciones que hacen complicada una infección urinaria con independencia de su altura.',
          'No es infección, por tratarse de una embarazada.',
          'Solo puede clasificarse con urocultivo.',
        ],
        correcta: 1,
        explicacion: 'La complicación no depende de la altura sino del paciente o del aparato urinario en que ocurre.',
      },
      {
        pregunta: 'Un compañero quiere retrasar la salida para obtener una muestra de orina de un paciente hipotenso y confuso. ¿Qué respondes?',
        opciones: [
          'Que es correcto: la muestra orienta el antibiótico.',
          'Que no se retrasa el traslado de un paciente con repercusión general: la muestra puede tomarse en el hospital y el tiempo perdido no se recupera.',
          'Que la muestra debe tomarse siempre antes de trasladar.',
          'Que la muestra sustituye a la valoración de la perfusión.',
        ],
        correcta: 1,
        explicacion: 'Es una de las dos cosas que la lección declara expresamente que no se hacen.',
      },
      {
        pregunta: '¿Por qué el antibiótico no se inicia en la ambulancia?',
        opciones: [
          'Porque los antibióticos están prohibidos en el medio prehospitalario en todo el mundo.',
          'Porque su elección depende de gravedad, sitio de atención, alergias, función renal y patrones de resistencia locales; es decisión de la guía y del médico responsable.',
          'Porque no existen presentaciones inyectables.',
          'Porque la muestra de orina debe obtenerse antes.',
        ],
        correcta: 1,
        explicacion: 'La lección no propone ningún antimicrobiano y declara de quién depende esa decisión.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Caso 1: mujer de 25 años, no embarazada, con ardor y frecuencia urinaria de dos días, afebril, alerta y bien perfundida. Caso 2: varón de 70 años con diabetes, sonda vesical, fiebre y dolor lumbar. Caso 3: mujer de 30 años embarazada con disuria y febrícula. Caso 4: varón de 45 años con disuria de un día, sin antecedentes. ¿Cuál presenta MAYOR riesgo de infección complicada?',
          opciones: [
            'El caso 1.',
            'El caso 2: acumula diabetes, sonda vesical y datos de infección alta con fiebre y dolor lumbar.',
            'El caso 3.',
            'El caso 4.',
          ],
          correcta: 1,
          explicacion: 'Diabetes y portador de sonda figuran entre las situaciones que hacen complicada la infección, y la fiebre con dolor lumbar apunta a infección alta.',
        },
        {
          pregunta: 'De esos cuatro casos, ¿cuál otro entra también en la categoría de complicada aunque sus síntomas sean leves?',
          opciones: [
            'El caso 1.',
            'El caso 3, porque el embarazo hace complicada la infección con independencia de su altura.',
            'El caso 4.',
            'Ninguno más.',
          ],
          correcta: 1,
          explicacion: 'El embarazo figura expresamente entre las situaciones que hacen complicada una infección urinaria.',
        },
        {
          pregunta: 'En el caso 2 el paciente además está confuso y con relleno capilar lento. ¿Qué cambia?',
          opciones: [
            'Nada, sigue siendo una infección complicada.',
            'La sospecha pasa a ser de sepsis y el traslado se vuelve tiempo-dependiente, con prealerta.',
            'Debe obtenerse una muestra de orina antes de salir.',
            'Debe iniciarse un antibiótico en la escena.',
          ],
          correcta: 1,
          explicacion: 'Al foco infeccioso se le añaden signos de disfunción de órganos, y con ellos cambia la prioridad.',
        },
      ],
    },
    revision: ficha({
      version: 'IDSA cUTI 2025 (sección pendiente); Bibiano 3.ª ed., caps. 97 y 91',
      fuentes: [
        'IDSA 2025 Guideline Update on Complicated Urinary Tract Infections (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 97, p. 869 y cap. 91, p. 801.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de la guía IDSA 2025.',
        'No se propone ningún antimicrobiano ni se sitúa su inicio en el ámbito prehospitalario.',
        'DECISIÓN PENDIENTE: la academia debe declarar sus criterios de identificación de sepsis y las '
          + 'medidas iniciales que autoriza su protocolo.',
      ],
    }),
  },

  // ============================================================
  //  Urolitiasis
  // ============================================================
  'm4-uri-urolitiasis': {
    icono: '🪨',
    duracion: '18 min',
    resumen: 'Cómo se reconoce un cólico renal probable y, sobre todo, cómo se detecta al paciente cuyo '
      + 'dolor en el flanco no es un cólico o se ha complicado.',
    objetivos: [
      'Explicar por qué un cálculo produce dolor y por qué ese dolor es de tipo cólico.',
      'Reconocer la presentación característica de la urolitiasis.',
      'Identificar las banderas rojas que convierten el cuadro en prioritario.',
      'Considerar los diagnósticos alternativos peligrosos del dolor en flanco.',
    ],
    secciones: [
      {
        titulo: 'Por qué duele',
        bloques: [
          { tipo: 'p', texto: 'Un cálculo se forma cuando determinadas sustancias de la orina se concentran y cristalizan. Mientras permanece en el riñón puede no dar síntomas; el dolor aparece cuando desciende y obstruye el uréter, que es un conducto estrecho y muscular.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El dolor no lo produce la piedra: lo produce la obstrucción', texto: 'Al bloquearse la salida, la orina se acumula por encima y el uréter se contrae intentando vencer el obstáculo. Esas contracciones explican que el dolor sea de tipo cólico —en oleadas, con periodos de alivio— y que el paciente no encuentre postura, a diferencia del dolor por irritación del peritoneo, en el que el paciente tiende a quedarse quieto.' },
          {
            tipo: 'lista',
            titulo: 'Presentación característica',
            items: [
              'Dolor de inicio brusco en el flanco o en la región lumbar, intenso, en oleadas.',
              'Irradiación descendente hacia el abdomen bajo, la ingle o los genitales, según el nivel donde se encuentre el cálculo.',
              'Inquietud motora: el paciente cambia de postura continuamente buscando alivio.',
              'Náusea y vómito acompañantes, frecuentes por la propia intensidad del dolor.',
              'Síntomas urinarios cuando el cálculo se acerca a la vejiga: urgencia y ardor.',
              'Sangre en la orina, visible o no.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ausencia de sangre en la orina no descarta un cálculo', texto: 'Es un dato que apoya cuando está presente, pero puede faltar. Descartar la urolitiasis porque la orina es clara es un razonamiento frecuente y equivocado, igual que confirmarla solo porque hay sangre, que también aparece en otras causas.' },
        ],
      },
      {
        titulo: 'Lo que puede no ser un cólico',
        bloques: [
          { tipo: 'p', texto: 'El dolor en el flanco tiene otras causas, y algunas comprometen la vida. La tarea prehospitalaria no es confirmar el cálculo —eso exige imagen— sino asegurarse de que no se está pasando por alto una de estas.' },
          {
            tipo: 'tabla',
            titulo: 'Diagnósticos alternativos que conviene considerar',
            headers: ['Cuadro', 'Qué debe hacer pensar en él'],
            filas: [
              ['Aneurisma de aorta abdominal complicado', 'Edad avanzada, factores de riesgo vascular, dolor de espalda o flanco, masa abdominal pulsátil, hipotensión o síncope'],
              ['Embarazo ectópico', 'Mujer en edad fértil con dolor abdominal bajo; el embarazo posible debe preguntarse siempre'],
              ['Abdomen agudo de otra causa', 'Defensa de la pared, dolor al retirar la mano, silencio abdominal'],
              ['Torsión de un anexo o del testículo', 'Dolor de inicio súbito en la región correspondiente, con náusea intensa'],
              ['Infección urinaria alta', 'Fiebre, escalofríos y afectación del estado general acompañando al dolor'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El primer cólico de un paciente mayor merece más atención', texto: 'Un paciente con antecedentes de litiasis que reconoce su dolor de siempre plantea una situación distinta de la de un paciente mayor con un primer episodio. En este segundo caso la posibilidad de un cuadro vascular abdominal debe considerarse expresamente, porque puede presentarse de forma muy parecida.' },
        ],
      },
      {
        titulo: 'Banderas rojas y conducta',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que convierte el cuadro en prioritario',
            items: [
              'Fiebre o signos de repercusión general: sugieren obstrucción con infección, que es una urgencia.',
              'Ausencia de emisión de orina.',
              'Riñón único conocido o trasplantado.',
              'Embarazo.',
              'Dolor o vómito que no ceden pese a las medidas aplicadas.',
              'Signos de hipoperfusión, síncope o masa abdominal pulsátil.',
              'Enfermedad renal previa conocida.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Obstrucción más infección no espera', texto: 'Un cálculo que obstruye y una infección por encima de esa obstrucción forman una combinación que puede deteriorar al paciente con rapidez. Fiebre en un paciente con cólico renal no es un dato menor: es lo que convierte el cuadro en tiempo-dependiente y obliga a prealertar.' },
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria y del estado circulatorio antes de centrarse en el dolor.',
              'Anamnesis: inicio, irradiación, episodios previos, fiebre, diuresis, embarazo posible, riñón único, enfermedad renal.',
              'Exploración abdominal en su orden, buscando defensa, masa pulsátil y asimetría de pulsos.',
              'Posición cómoda; no forzar el decúbito en un paciente que no encuentra postura.',
              'Analgesia y antiemético únicamente conforme al protocolo del servicio, con el producto y la vía autorizados.',
              'Traslado con prealerta ante cualquier bandera roja.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dos ideas que conviene desmontar', texto: 'La primera: forzar la ingesta de líquidos para «ayudar a expulsar la piedra» no es una conducta prehospitalaria, y en un paciente con vómitos o con obstrucción puede empeorar el cuadro. La segunda: la expulsión del cálculo no es un objetivo de la atención en la ambulancia. El objetivo es aliviar dentro de lo autorizado, detectar la complicación y trasladar.' },
        ],
      },
      F([EAU_UROLITIASIS_2026, bibiano(69, 'Cólico renoureteral y uropatía obstructiva', 608), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Urolitiasis', definicion: 'Formación de cálculos por cristalización de sustancias concentradas en la orina; pueden ser asintomáticos hasta que descienden.' },
      { termino: 'Dolor cólico', definicion: 'Dolor en oleadas con periodos de alivio, producido por las contracciones del uréter contra el obstáculo; el paciente no encuentra postura.' },
      { termino: 'Inquietud motora', definicion: 'Rasgo que distingue el cólico del dolor por irritación peritoneal, en el que el paciente tiende a quedarse quieto.' },
      { termino: 'Obstrucción infectada', definicion: 'Combinación de cálculo obstructivo e infección por encima; deteriora con rapidez y convierte el cuadro en tiempo-dependiente.' },
      { termino: 'Diagnóstico alternativo peligroso', definicion: 'Cuadro que se presenta como dolor en flanco y compromete la vida, en especial el aneurisma de aorta abdominal complicado y el embarazo ectópico.' },
    ],
    flashcards: [
      { frente: '¿Qué produce el dolor en la urolitiasis?', reverso: 'La obstrucción, no la piedra: el uréter se contrae intentando vencer el obstáculo y por eso el dolor es cólico.' },
      { frente: '¿Cómo se comporta el paciente con cólico renal?', reverso: 'Con inquietud motora: cambia de postura buscando alivio, a diferencia del dolor peritoneal, en el que tiende a quedarse quieto.' },
      { frente: '¿Descarta un cálculo la ausencia de sangre en la orina?', reverso: 'No: es un dato que apoya cuando está, pero puede faltar.' },
      { frente: '¿Qué significa fiebre en un paciente con cólico renal?', reverso: 'Sugiere obstrucción con infección: convierte el cuadro en tiempo-dependiente y obliga a prealertar.' },
      { frente: '¿Qué debe considerarse ante un primer cólico en un paciente mayor?', reverso: 'La posibilidad de un cuadro vascular abdominal, que puede presentarse de forma muy parecida.' },
      { frente: '¿Es la expulsión del cálculo un objetivo prehospitalario?', reverso: 'No: el objetivo es aliviar dentro de lo autorizado, detectar la complicación y trasladar.' },
    ],
    quiz: [
      {
        pregunta: 'Varón de 72 años con dolor lumbar de inicio brusco, sin antecedentes de litiasis, hipotenso y con masa abdominal pulsátil. ¿Qué priorizas?',
        opciones: [
          'Un cólico renal y analgesia según protocolo.',
          'La sospecha de un cuadro vascular abdominal: es un diagnóstico alternativo peligroso que se presenta de forma parecida, y exige traslado prioritario con prealerta.',
          'Una infección urinaria alta.',
          'Una torsión testicular.',
        ],
        correcta: 1,
        explicacion: 'Edad avanzada, primer episodio, hipotensión y masa pulsátil son exactamente lo que debe hacer pensar en un aneurisma de aorta abdominal complicado.',
      },
      {
        pregunta: 'Un paciente con dolor típico en flanco y orina sin sangre visible. ¿Qué concluyes?',
        opciones: [
          'Que puede descartarse la urolitiasis.',
          'Que la ausencia de sangre no descarta un cálculo: es un dato que apoya cuando está presente, pero puede faltar.',
          'Que se trata con certeza de una infección.',
          'Que debe forzarse la ingesta de líquidos.',
        ],
        correcta: 1,
        explicacion: 'Descartar por orina clara y confirmar solo por hematuria son dos razonamientos igualmente equivocados.',
      },
      {
        pregunta: 'Un compañero propone dar abundante líquido oral para «ayudar a expulsar la piedra». ¿Qué respondes?',
        opciones: [
          'Que es la conducta indicada.',
          'Que forzar la ingesta no es conducta prehospitalaria y puede empeorar el cuadro en un paciente con vómitos u obstrucción.',
          'Que debe hacerse solo si hay fiebre.',
          'Que sustituye a la analgesia.',
        ],
        correcta: 1,
        explicacion: 'Es una de las dos ideas que la lección desmonta expresamente, junto con la de que la expulsión sea un objetivo prehospitalario.',
      },
      {
        pregunta: 'Mujer de 28 años con dolor en flanco y abdomen bajo. ¿Qué pregunta no puede faltar?',
        opciones: [
          'Cuántos litros de agua bebe al día.',
          'La posibilidad de embarazo, porque el embarazo ectópico figura entre los diagnósticos alternativos peligrosos.',
          'Si tiene antecedentes familiares de litiasis.',
          'El color exacto de la orina.',
        ],
        correcta: 1,
        explicacion: 'El embarazo posible debe preguntarse siempre en una mujer en edad fértil con dolor abdominal bajo.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Triage de tres pacientes con dolor en flanco. A: varón de 35 años, antecedentes de litiasis, reconoce su dolor de siempre, afebril, bien perfundido. B: mujer de 40 años con dolor, fiebre alta, escalofríos y sin orinar desde ayer. C: varón de 75 años, primer episodio, pálido y con síncope previo. ¿Quién requiere traslado prioritario por obstrucción probablemente infectada?',
          opciones: [
            'El paciente A.',
            'La paciente B: fiebre y ausencia de emisión de orina son banderas rojas de obstrucción con infección.',
            'El paciente C.',
            'Ninguno de los tres.',
          ],
          correcta: 1,
          explicacion: 'La combinación de obstrucción e infección puede deteriorar con rapidez y es tiempo-dependiente.',
        },
        {
          pregunta: 'En ese mismo triage, ¿qué alternativa debe considerarse expresamente en el paciente C?',
          opciones: [
            'Una infección urinaria baja.',
            'Un cuadro vascular abdominal, por la edad, el primer episodio, la palidez y el síncope.',
            'Una torsión ovárica.',
            'Un cólico biliar.',
          ],
          correcta: 1,
          explicacion: 'El primer cólico de un paciente mayor merece más atención precisamente porque un aneurisma complicado se presenta de forma parecida.',
        },
        {
          pregunta: 'Y el paciente A, ¿qué conducta requiere?',
          opciones: [
            'Traslado prioritario con prealerta.',
            'Valoración completa buscando banderas rojas, alivio dentro de lo autorizado por el protocolo y traslado o derivación conforme al procedimiento del servicio.',
            'Alta en el domicilio con indicación de forzar líquidos.',
            'Observación hasta que expulse el cálculo.',
          ],
          correcta: 1,
          explicacion: 'Sin banderas rojas, el objetivo es aliviar dentro de lo autorizado y decidir el destino conforme al protocolo; la expulsión no es un objetivo prehospitalario.',
        },
      ],
    },
    revision: ficha({
      version: 'EAU Urolithiasis 2026 (sección pendiente); Bibiano 3.ª ed., cap. 69',
      fuentes: [
        'European Association of Urology. Guidelines on Urolithiasis, 2026 (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 69, p. 608.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: falta la sección exacta de la guía EAU 2026 sobre criterios de '
          + 'urgencia y manejo del dolor.',
        'No se propone ningún analgésico ni antiemético concreto: se declaran dependientes del '
          + 'protocolo, del producto autorizado y de la vía.',
        'Se desmontan expresamente la hidratación forzada y la expulsión del cálculo como objetivo '
          + 'prehospitalario.',
      ],
    }),
  },

  // ============================================================
  //  Desequilibrio electrolítico
  // ============================================================
  'm4-uri-desequilibrio-electrolitico': {
    icono: '⚡',
    duracion: '20 min',
    resumen: 'Qué produce en el organismo la alteración de los principales electrolitos, por qué el '
      + 'potasio manda sobre los demás y hasta dónde puede llegar la sospecha sin una medición.',
    objetivos: [
      'Relacionar cada electrolito principal con las manifestaciones de su alteración.',
      'Reconocer las situaciones clínicas que hacen probable un desequilibrio.',
      'Justificar por qué la hiperpotasemia se prioriza sobre las demás alteraciones.',
      'Delimitar el valor y los límites del trazo eléctrico como pista.',
    ],
    secciones: [
      {
        titulo: 'Los electrolitos y lo que su alteración produce',
        bloques: [
          { tipo: 'p', texto: 'En el Módulo 2 quedó establecido qué función sostiene cada electrolito. Aquí interesa la consecuencia: qué se observa cuando esa función se altera. Conviene fijar un principio general antes de la tabla: los electrolitos gobiernan la excitabilidad de las células nerviosas y musculares, de modo que sus alteraciones se manifiestan sobre todo como problemas neurológicos, neuromusculares y cardiacos.' },
          {
            tipo: 'tabla',
            titulo: 'Qué predomina en la alteración de cada uno',
            headers: ['Electrolito', 'Qué predomina cuando se altera', 'Situaciones que lo producen'],
            filas: [
              ['Sodio', 'Manifestaciones neurológicas: confusión, somnolencia, cefalea, convulsión; el descenso rápido es peor tolerado que el lento', 'Pérdidas digestivas, diuréticos, ingesta excesiva de agua, enfermedad renal'],
              ['Potasio', 'Debilidad muscular y, sobre todo, riesgo de arritmia grave', 'Insuficiencia renal, ciertos fármacos, destrucción muscular, pérdidas digestivas'],
              ['Calcio', 'Excitabilidad neuromuscular alterada: calambres, espasmos y hormigueos cuando desciende', 'Enfermedad renal, alteraciones hormonales, transfusiones masivas'],
              ['Magnesio', 'Debilidad, temblor y arritmias; con frecuencia acompaña a otras alteraciones', 'Alcoholismo, desnutrición, pérdidas digestivas, diuréticos'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los síntomas no identifican el electrolito', texto: 'Confusión, debilidad y calambres aparecen en varias alteraciones distintas y también en cuadros que nada tienen que ver con los electrolitos. La sospecha se construye con el contexto —qué enfermedad tiene el paciente, qué toma y qué ha perdido—, no con el síntoma aislado. En la calle no se determina qué electrolito está alterado.' },
        ],
      },
      {
        titulo: 'Por qué el potasio se prioriza',
        bloques: [
          { tipo: 'p', texto: 'De todas las alteraciones electrolíticas, la elevación del potasio es la que puede matar en menos tiempo, y lo hace por una vía concreta: alterando la actividad eléctrica del corazón hasta producir una arritmia grave o un paro.' },
          { tipo: 'p', texto: 'La razón es la misma que se estudió en electrofisiología. El potasio es el ion que predomina dentro de la célula y su distribución sostiene el potencial de reposo de la membrana. Si su concentración fuera de la célula sube, esa diferencia se reduce y la excitabilidad se altera: primero se hace más inestable y después la célula deja de responder con normalidad.' },
          {
            tipo: 'lista',
            titulo: 'Qué pacientes deben hacer pensar en hiperpotasemia',
            items: [
              'Pacientes con insuficiencia renal, y en particular los que están en diálisis.',
              'Pacientes que han faltado a una sesión de diálisis o la han acortado.',
              'Pacientes que toman determinados fármacos que retienen potasio.',
              'Pacientes con destrucción muscular extensa, por aplastamiento, ejercicio extremo o inmovilización prolongada.',
              'Pacientes con quemaduras extensas.',
              'Pacientes con acidosis significativa.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La debilidad puede ser el único aviso', texto: 'La hiperpotasemia puede producir muy pocos síntomas antes de la arritmia. Una debilidad muscular progresiva en un paciente renal, o simplemente el antecedente de una sesión de diálisis perdida, valen más que cualquier síntoma llamativo para elevar la sospecha y la prioridad del traslado.' },
        ],
      },
      {
        titulo: 'El trazo eléctrico como pista, no como prueba',
        bloques: [
          { tipo: 'p', texto: 'Algunas alteraciones electrolíticas producen cambios en el trazo eléctrico, y en un paciente con el contexto adecuado esos cambios elevan la sospecha. Pero el trazo no mide el electrolito.' },
          {
            tipo: 'lista',
            titulo: 'Qué puede y qué no puede hacer el trazo aquí',
            items: [
              'PUEDE apoyar una sospecha ya construida con el contexto del paciente.',
              'PUEDE mostrar un deterioro cuando se repite y se compara con el anterior.',
              'NO PUEDE cuantificar la alteración ni identificar de qué electrolito se trata.',
              'NO PUEDE descartarla: un trazo sin cambios no excluye una alteración importante.',
              'NO SUSTITUYE a la medición, que se hace en el hospital.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Nunca se corrige a ciegas', texto: 'Administrar un electrolito, o administrar algo para bajarlo, sin haberlo medido puede convertir una alteración en la contraria y producir un daño mayor que el que se pretendía evitar. Toda corrección exige medición, guía de la indicación, producto con Información para Prescribir, competencia y protocolo con dirección médica. Esta lección no publica ninguna pauta.' },
          { tipo: 'p', texto: 'Existe un caso particular que sí está contemplado por la guía de reanimación: la sospecha de hiperpotasemia con toxicidad vital o como causa de un paro. Ahí la conducta forma parte de las circunstancias especiales de la reanimación y depende, igualmente, del protocolo del servicio, de su formulario y de la dirección médica.' },
        ],
      },
      {
        titulo: 'Conducta prehospitalaria',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Valoración primaria y del estado circulatorio.',
              'Anamnesis dirigida al contexto: enfermedad renal, diálisis y última sesión, fármacos, vómitos, diarrea, aplastamiento, quemaduras.',
              'Valoración neurológica y de la fuerza muscular, comparando ambos lados.',
              'Monitorización continua conforme al equipo de la unidad y al alcance autorizado, prioritaria cuando se sospeche hiperpotasemia.',
              'Repetir el trazo y compararlo si el cuadro cambia.',
              'Traslado con prealerta transmitiendo el contexto que sostiene la sospecha, no una etiqueta.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué transmitir al hospital', texto: 'Lo útil no es decir «creo que tiene el potasio alto», sino transmitir el contexto: paciente en diálisis que faltó a su sesión, con debilidad progresiva y monitorización en curso. Ese mensaje permite al equipo receptor preparar la medición y las medidas antes de que llegue el paciente, que es exactamente lo que la prealerta debe conseguir.' },
        ],
      },
      F([UKKA_HIPERPOTASEMIA_2023, AHA_ALS_2025, guyton(5, 'Potenciales de membrana y potenciales de acción', 38), bibiano(76, 'Alteraciones del potasio. Hiperpotasemia e hipopotasemia', 667), bibiano(75, 'Alteraciones del sodio', 659)]),
    ],
    conceptosClave: [
      { termino: 'Manifestación de la alteración electrolítica', definicion: 'Predominan los problemas neurológicos, neuromusculares y cardiacos, porque los electrolitos gobiernan la excitabilidad celular.' },
      { termino: 'Hiperpotasemia', definicion: 'Elevación del potasio extracelular; reduce la diferencia que sostiene el potencial de reposo y puede producir arritmia grave o paro.' },
      { termino: 'Contexto que construye la sospecha', definicion: 'Enfermedad renal, diálisis perdida, fármacos que retienen potasio, destrucción muscular, quemaduras y acidosis.' },
      { termino: 'Trazo como pista', definicion: 'Puede apoyar una sospecha y mostrar deterioro al repetirse; no cuantifica, no identifica el electrolito y no descarta.' },
      { termino: 'Corrección a ciegas', definicion: 'Administración de un electrolito o de algo para bajarlo sin medición previa; puede convertir la alteración en la contraria.' },
    ],
    flashcards: [
      { frente: '¿Cómo se manifiestan sobre todo las alteraciones electrolíticas?', reverso: 'Como problemas neurológicos, neuromusculares y cardiacos, porque los electrolitos gobiernan la excitabilidad celular.' },
      { frente: '¿Por qué la hiperpotasemia se prioriza sobre las demás?', reverso: 'Porque puede matar en menos tiempo, alterando la actividad eléctrica del corazón hasta producir arritmia grave o paro.' },
      { frente: '¿Qué relación tiene el potasio con el potencial de reposo?', reverso: 'Predomina dentro de la célula y su distribución lo sostiene; si sube fuera, la diferencia se reduce y la excitabilidad se altera.' },
      { frente: 'Nombra tres pacientes en los que sospechar hiperpotasemia.', reverso: 'El paciente en diálisis que faltó a su sesión, el que toma fármacos que retienen potasio y el que ha sufrido destrucción muscular extensa.' },
      { frente: '¿Descarta una alteración un trazo eléctrico sin cambios?', reverso: 'No: el trazo puede apoyar una sospecha, pero no cuantifica, no identifica el electrolito y no descarta.' },
      { frente: '¿Qué conviene transmitir en la prealerta?', reverso: 'El contexto que sostiene la sospecha —diálisis perdida, debilidad progresiva, monitorización en curso—, no una etiqueta diagnóstica.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente en diálisis que faltó a su última sesión, con debilidad muscular progresiva y sin otros síntomas. ¿Qué prioridad establece?',
        opciones: [
          'Baja: la debilidad aislada es inespecífica.',
          'Alta: el contexto sostiene la sospecha de hiperpotasemia, que puede producir arritmia con pocos síntomas previos; monitorización y traslado con prealerta.',
          'Media: esperar a que aparezcan síntomas cardiacos.',
          'Alta, pero por sospecha de alteración del sodio.',
        ],
        correcta: 1,
        explicacion: 'La debilidad puede ser el único aviso, y el antecedente de una sesión perdida vale más que cualquier síntoma llamativo.',
      },
      {
        pregunta: 'El trazo eléctrico de ese paciente no muestra cambios llamativos. ¿Qué concluyes?',
        opciones: [
          'Que puede descartarse la alteración.',
          'Que un trazo sin cambios no la excluye: el trazo no cuantifica ni descarta, y la sospecha sigue sostenida por el contexto.',
          'Que debe repetirse hasta que aparezcan cambios.',
          'Que el electrolito alterado es el sodio.',
        ],
        correcta: 1,
        explicacion: 'Entre lo que el trazo NO puede hacer figura expresamente descartar la alteración.',
      },
      {
        pregunta: 'Un compañero propone administrar un electrolito porque «seguro está bajo». ¿Qué respondes?',
        opciones: [
          'Que adelante si el paciente tiene síntomas compatibles.',
          'Que corregir sin medición puede convertir la alteración en la contraria; toda corrección exige medición, guía, IPP, competencia y protocolo.',
          'Que solo puede hacerse por vía oral.',
          'Que primero debe obtenerse un trazo eléctrico.',
        ],
        correcta: 1,
        explicacion: 'La corrección a ciegas puede producir un daño mayor que el que se pretendía evitar.',
      },
      {
        pregunta: 'Un paciente presenta confusión y calambres. ¿Permiten esos síntomas identificar qué electrolito está alterado?',
        opciones: [
          'Sí: la confusión indica sodio y los calambres calcio.',
          'No: esos síntomas aparecen en varias alteraciones y también en cuadros ajenos a los electrolitos; la sospecha se construye con el contexto.',
          'Sí, si además hay debilidad.',
          'Solo con un trazo eléctrico.',
        ],
        correcta: 1,
        explicacion: 'Los síntomas no identifican el electrolito; en la calle no se determina cuál está alterado.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente rescatado tras varias horas atrapado con una extremidad comprimida, ahora liberado. ¿Qué alteración electrolítica debe considerarse y por qué?',
          opciones: [
            'Alteración del calcio, por la inmovilización.',
            'Hiperpotasemia, porque la destrucción muscular extensa figura entre las situaciones que la producen.',
            'Alteración del sodio, por la deshidratación.',
            'Ninguna: el atrapamiento no altera electrolitos.',
          ],
          correcta: 1,
          explicacion: 'La destrucción muscular por aplastamiento es una de las situaciones que deben hacer pensar en hiperpotasemia.',
        },
        {
          pregunta: 'En ese paciente, ¿qué monitorización es prioritaria?',
          opciones: [
            'La glucemia capilar seriada.',
            'La monitorización eléctrica continua, conforme al equipo y al alcance autorizados, por el riesgo de arritmia.',
            'La medición de la temperatura timpánica.',
            'La capnografía exclusivamente.',
          ],
          correcta: 1,
          explicacion: 'La monitorización continua se declara prioritaria cuando se sospecha hiperpotasemia, por su riesgo arrítmico.',
        },
        {
          pregunta: '¿Qué se le puede asignar a ese paciente como impresión?',
          opciones: [
            'El diagnóstico de hiperpotasemia.',
            'Una «alteración electrolítica posible» sostenida por el contexto, que se transmite como contexto y no como etiqueta.',
            'Un diagnóstico de insuficiencia renal aguda.',
            'Ningún dato relevante hasta la medición hospitalaria.',
          ],
          correcta: 1,
          explicacion: 'En la calle no se determina qué electrolito está alterado; lo útil es transmitir el contexto que sostiene la sospecha.',
        },
      ],
    },
    revision: ficha({
      version: 'UKKA hiperpotasemia 2023 (umbrales pendientes); AHA ALS 2025 circunstancias especiales; Guyton 13.ª ed., cap. 5; Bibiano 3.ª ed., caps. 75 y 76',
      fuentes: [
        'UK Kidney Association. Management of Hyperkalaemia in Adults, 2023 (umbrales y algoritmo pendientes).',
        'AHA 2025 Adult Advanced Life Support, circunstancias especiales (sección pendiente).',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 5, p. 38.',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 76, p. 667 y cap. 75, p. 659.',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan los umbrales y el algoritmo de la guía UKKA 2023.',
        'No se publica ningún valor de electrolitos ni pauta de corrección, y se declara expresamente '
          + 'por qué la corrección a ciegas es peligrosa.',
        'No se describen los cambios concretos del trazo asociados a cada alteración: se enseña qué '
          + 'puede y qué no puede hacer el trazo, que es lo sustentable sin la guía delante.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué contempla su protocolo ante sospecha de hiperpotasemia con '
          + 'toxicidad vital, con qué formulario y bajo qué dirección médica?',
      ],
    }),
  },

  // ============================================================
  //  Insuficiencia renal
  // ============================================================
  'm4-uri-insuficiencia-renal': {
    icono: '🫘',
    duracion: '20 min',
    resumen: 'Qué distingue una lesión renal aguda de una enfermedad renal crónica, qué complicaciones '
      + 'hacen que un paciente renal llame a una ambulancia y por qué no todos necesitan líquidos.',
    objetivos: [
      'Diferenciar lesión renal aguda de enfermedad renal crónica.',
      'Clasificar las causas de lesión renal aguda en prerrenales, renales y posrenales.',
      'Reconocer las complicaciones urgentes del paciente renal.',
      'Valorar el estado de volumen antes de decidir sobre el aporte de líquidos.',
    ],
    secciones: [
      {
        titulo: 'Aguda y crónica no son lo mismo',
        bloques: [
          { tipo: 'p', texto: 'El riñón, como quedó establecido en el Módulo 2, no es solo un órgano de eliminación: regula el agua, los electrolitos, la acidez y participa en el control de la presión. Cuando su función cae, todo eso se altera a la vez.' },
          {
            tipo: 'tabla',
            titulo: 'Dos situaciones distintas',
            headers: ['', 'Lesión renal aguda', 'Enfermedad renal crónica'],
            filas: [
              ['Curso', 'Deterioro brusco, en horas o días', 'Pérdida progresiva a lo largo de meses o años'],
              ['Reversibilidad', 'Potencialmente reversible si se corrige la causa a tiempo', 'Habitualmente no reversible; el objetivo es frenar la progresión'],
              ['Situación previa', 'El paciente puede no tener enfermedad renal conocida', 'El paciente conoce su enfermedad y suele tener seguimiento'],
              ['Qué importa en la calle', 'Identificar y corregir la causa dentro del alcance', 'Reconocer la complicación aguda que motivó la llamada'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Y pueden coexistir', texto: 'Un paciente con enfermedad renal crónica puede sufrir además un deterioro agudo sobre esa base, y es una situación frecuente: cualquier causa que reduzca el flujo al riñón afecta más a quien ya tenía poca reserva. Reconocer que la situación es «aguda sobre crónica» explica por qué un paciente que llevaba años estable se descompensa en dos días.' },
        ],
      },
      {
        titulo: 'Tres lugares donde puede fallar',
        bloques: [
          { tipo: 'p', texto: 'Las causas de lesión renal aguda se ordenan según dónde está el problema respecto del riñón. Ese marco no sirve para diagnosticar en la calle, pero sí para orientar qué buscar y qué puede corregirse.' },
          {
            tipo: 'tabla',
            titulo: 'El marco de las tres causas',
            headers: ['Categoría', 'Dónde está el problema', 'Ejemplos que se detectan en la escena'],
            filas: [
              ['Prerrenal', 'Antes del riñón: no le llega suficiente sangre', 'Deshidratación, hemorragia, vómitos y diarrea prolongados, shock, insuficiencia cardiaca'],
              ['Renal', 'En el propio riñón', 'Fármacos y sustancias que lo dañan, destrucción muscular extensa, enfermedades del riñón'],
              ['Posrenal', 'Después del riñón: la orina no puede salir', 'Obstrucción por litiasis, crecimiento prostático, sonda obstruida, tumores'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ausencia de orina no es un requisito', texto: 'Es habitual pensar que un fallo renal implica dejar de orinar, y no siempre es así: hay lesión renal aguda con volumen de orina conservado. Usar la diuresis como criterio único lleva a descartar el cuadro en pacientes que sí lo tienen. Lo que se recoge es cuánto ha orinado en comparación con lo habitual, no si orina o no.' },
        ],
      },
      {
        titulo: 'Las complicaciones que traen al paciente',
        bloques: [
          { tipo: 'p', texto: 'Un paciente renal rara vez llama por su función renal: llama por una de sus consecuencias. Reconocer cuál es lo que orienta la atención.' },
          {
            tipo: 'tabla',
            titulo: 'Complicaciones urgentes',
            headers: ['Complicación', 'Cómo se manifiesta'],
            filas: [
              ['Sobrecarga de volumen', 'Disnea, ortopnea, edema creciente, aumento de peso; puede llegar a congestión pulmonar grave'],
              ['Hiperpotasemia', 'Debilidad muscular y riesgo de arritmia; con frecuencia con pocos síntomas previos'],
              ['Acidosis', 'Respiración profunda compensatoria y afectación del estado general'],
              ['Manifestaciones urémicas', 'Náusea, vómito, alteración del estado mental, somnolencia'],
              ['Complicaciones del acceso de diálisis', 'Sangrado, signos de infección o pérdida de función del acceso'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Qué preguntar a un paciente en diálisis',
            items: [
              'Cuándo fue su última sesión y si la completó o la acortó.',
              'Si ha faltado a alguna sesión reciente.',
              'Cuál es su peso seco de referencia y cuánto pesa ahora, si lo sabe.',
              'Qué tipo de acceso tiene y en qué extremidad.',
              'Qué restricciones de líquidos y de dieta sigue.',
              'Si orina algo o nada de forma habitual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El acceso de diálisis no se usa ni se comprime a la ligera', texto: 'La extremidad que porta un acceso de diálisis no se utiliza para tomar la presión arterial ni para puncionar, salvo que el protocolo lo autorice expresamente en una situación concreta. El acceso es el medio de vida del paciente y su pérdida tiene consecuencias graves. Su manipulación exige competencia acreditada y autorización.' },
        ],
      },
      {
        titulo: 'Valorar el volumen antes de decidir',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'La decisión que más se equivoca en este cuadro es la de los líquidos, y se equivoca en las dos direcciones. Un paciente renal deshidratado por vómitos necesita volumen; un paciente en diálisis que faltó a su sesión y está congestivo puede empeorar de forma inmediata si se le administra. La única forma de no fallar es valorar el estado de volumen antes de decidir.' },
          {
            tipo: 'tabla',
            titulo: 'Tres perfiles que exigen conductas distintas',
            headers: ['Perfil', 'Qué se encuentra', 'Por qué no comparten la misma conducta inicial'],
            filas: [
              ['Hipovolemia', 'Mucosas secas, mala perfusión, taquicardia, antecedente de pérdidas', 'La causa es prerrenal y corregir el volumen puede revertirla'],
              ['Congestión', 'Disnea, ortopnea, edema, ingurgitación yugular, sesión de diálisis perdida', 'Aportar volumen agrava directamente la congestión'],
              ['Obstrucción', 'Imposibilidad de orinar, globo vesical, sonda que no drena, dolor suprapúbico', 'El problema es la salida de la orina y el volumen no lo resuelve'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Valoración primaria y del estado circulatorio.',
              'Determinar el perfil de volumen antes que cualquier otra decisión.',
              'Anamnesis del paciente renal: diálisis, acceso, peso seco, diuresis habitual, fármacos, últimas 48 horas.',
              'Buscar activamente las complicaciones urgentes, con prioridad para la sospecha de hiperpotasemia.',
              'Monitorización conforme al equipo y al alcance autorizados.',
              'Aporte de líquidos únicamente conforme al protocolo del servicio y al perfil valorado.',
              'Proteger la extremidad del acceso de diálisis.',
              'Traslado con prealerta, transmitiendo el perfil de volumen y el contexto de diálisis.',
            ],
          },
        ],
      },
      F([NICE_AKI_2024, KDIGO_2024, bibiano(67, 'Fracaso renal agudo', 596), guyton(26, 'El sistema urinario: anatomía funcional y formación de orina en los riñones', 185), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Lesión renal aguda', definicion: 'Deterioro brusco de la función renal en horas o días, potencialmente reversible si se corrige la causa a tiempo.' },
      { termino: 'Enfermedad renal crónica', definicion: 'Pérdida progresiva de función a lo largo de meses o años, habitualmente no reversible.' },
      { termino: 'Aguda sobre crónica', definicion: 'Deterioro agudo sobre una enfermedad renal previa; explica que un paciente estable durante años se descompense en días.' },
      { termino: 'Marco prerrenal, renal y posrenal', definicion: 'Clasificación por la localización del problema respecto del riñón; orienta qué buscar y qué puede corregirse.' },
      { termino: 'Peso seco', definicion: 'Peso de referencia del paciente en diálisis tras una sesión completa; su comparación con el peso actual informa sobre la sobrecarga.' },
      { termino: 'Perfil de volumen', definicion: 'Determinación de si el paciente está hipovolémico, congestivo u obstruido; condiciona la decisión sobre líquidos.' },
    ],
    flashcards: [
      { frente: 'Lesión renal aguda frente a enfermedad renal crónica', reverso: 'La aguda es un deterioro brusco potencialmente reversible; la crónica es una pérdida progresiva habitualmente no reversible.' },
      { frente: '¿Implica siempre el fallo renal dejar de orinar?', reverso: 'No: hay lesión renal aguda con volumen de orina conservado. Se compara la diuresis con la habitual del paciente.' },
      { frente: 'Nombra las tres categorías causales de lesión renal aguda.', reverso: 'Prerrenal (no llega sangre), renal (daño del propio riñón) y posrenal (la orina no puede salir).' },
      { frente: '¿Qué se pregunta siempre a un paciente en diálisis?', reverso: 'Última sesión y si la completó, peso seco, tipo y localización del acceso, restricciones y diuresis habitual.' },
      { frente: '¿Puede usarse la extremidad del acceso de diálisis para tomar la presión?', reverso: 'No, salvo autorización expresa del protocolo: el acceso es el medio de vida del paciente.' },
      { frente: '¿Por qué no todo paciente renal necesita líquidos?', reverso: 'Porque puede estar hipovolémico, congestivo u obstruido, y en los dos últimos perfiles el volumen agrava o no resuelve.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente en diálisis que faltó a su sesión, con disnea, ortopnea y edema creciente. Está hipotenso. ¿Qué conducta es la correcta respecto de los líquidos?',
        opciones: [
          'Administrar volumen por la hipotensión.',
          'No aportar volumen de forma refleja: el perfil es congestivo y aportarlo agrava directamente la congestión; la decisión corresponde al protocolo tras valorar el perfil.',
          'Administrar volumen solo si el edema es unilateral.',
          'Esperar a conocer el resultado de laboratorio.',
        ],
        correcta: 1,
        explicacion: 'La decisión sobre líquidos se equivoca en las dos direcciones; la única forma de no fallar es valorar el estado de volumen antes de decidir.',
      },
      {
        pregunta: 'Un paciente con lesión renal aguda sigue orinando con normalidad. ¿Qué concluyes?',
        opciones: [
          'Que puede descartarse el cuadro.',
          'Que la diuresis conservada no lo excluye: hay lesión renal aguda con volumen de orina conservado.',
          'Que se trata de una causa posrenal.',
          'Que la función renal es normal.',
        ],
        correcta: 1,
        explicacion: 'Usar la diuresis como criterio único lleva a descartar el cuadro en pacientes que sí lo tienen.',
      },
      {
        pregunta: 'Paciente con globo vesical y sonda que no drena, sin orinar desde hace 12 horas. ¿En qué categoría entra?',
        opciones: [
          'Prerrenal, por falta de aporte.',
          'Posrenal: el problema es la salida de la orina, y aportar volumen no lo resuelve.',
          'Renal, por daño del parénquima.',
          'No puede clasificarse sin analítica.',
        ],
        correcta: 1,
        explicacion: 'El marco de las tres causas orienta qué buscar y qué puede corregirse; en el perfil obstructivo el volumen no resuelve el problema.',
      },
      {
        pregunta: 'Vas a tomar la presión arterial a un paciente en diálisis con una fístula en el brazo izquierdo. ¿Qué haces?',
        opciones: [
          'Tomarla en ese brazo, que es el más accesible.',
          'Usar la otra extremidad: la que porta el acceso no se usa para presión ni punción salvo autorización expresa del protocolo.',
          'No tomar la presión en ningún brazo.',
          'Comprimir la fístula durante la medición.',
        ],
        correcta: 1,
        explicacion: 'El acceso es el medio de vida del paciente y su pérdida tiene consecuencias graves.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Perfil A: paciente con vómitos y diarrea de cuatro días, mucosas secas, taquicárdico, mala perfusión. ¿Qué categoría causal sugiere y por qué su conducta inicial difiere?',
          opciones: [
            'Posrenal: hay que resolver la obstrucción.',
            'Prerrenal: no llega suficiente sangre al riñón, y corregir el volumen conforme al protocolo puede revertir el cuadro.',
            'Renal: hay daño directo del parénquima.',
            'Congestivo: debe restringirse el volumen.',
          ],
          correcta: 1,
          explicacion: 'Las pérdidas digestivas prolongadas figuran entre los ejemplos de causa prerrenal detectables en la escena.',
        },
        {
          pregunta: 'Perfil B: paciente en diálisis con sesión perdida, disnea, ingurgitación yugular y aumento de peso. ¿Por qué NO comparte la conducta inicial del perfil A?',
          opciones: [
            'Porque su causa también es prerrenal.',
            'Porque está congestivo: aportar volumen agrava directamente la congestión.',
            'Porque no tiene función renal residual.',
            'Porque su acceso impide cualquier intervención.',
          ],
          correcta: 1,
          explicacion: 'Los tres perfiles exigen conductas distintas, y por eso el estado de volumen se valora antes de decidir.',
        },
        {
          pregunta: 'Perfil C: paciente con crecimiento prostático conocido, dolor suprapúbico e imposibilidad de orinar desde ayer. ¿Qué explica que el volumen no sea la solución?',
          opciones: [
            'Que está deshidratado.',
            'Que el problema está en la salida de la orina: es un perfil obstructivo y el aporte de volumen no lo resuelve.',
            'Que su riñón está dañado de forma irreversible.',
            'Que la diuresis conservada descarta el cuadro.',
          ],
          correcta: 1,
          explicacion: 'En la categoría posrenal el problema es la salida de la orina, y por eso el volumen no lo resuelve.',
        },
      ],
    },
    revision: ficha({
      version: 'NICE NG148 (2024) para lesión renal aguda y KDIGO 2024 para enfermedad renal crónica (secciones pendientes); Bibiano 3.ª ed., cap. 67; Guyton 13.ª ed., cap. 26',
      fuentes: [
        'NICE NG148. Acute Kidney Injury, actualizada en 2024 (sección pendiente).',
        'KDIGO 2024 CKD Guideline (sección pendiente).',
        'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018, cap. 67, p. 596.',
        'Guyton y Hall. Compendio de Fisiología Médica, 13.ª ed., cap. 26, p. 185.',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda declarada: faltan las secciones exactas de NICE NG148 y KDIGO 2024.',
        NO_KDIGO_2027,
        'No se publica ningún criterio numérico de estadificación, diuresis ni creatinina.',
        'Se declara expresamente que la extremidad del acceso de diálisis no se usa para presión ni '
          + 'punción salvo autorización del protocolo.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué política sigue su protocolo con el aporte de líquidos en el '
          + 'paciente renal y con la extremidad portadora de acceso de diálisis?',
      ],
    }),
  },
}
