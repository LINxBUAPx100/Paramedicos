// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE ABDOMEN» (lote A)
// ------------------------------------------------------------
//  El único tema que faltaba de la unidad: `m5-ta-abdomen-agudo`. Los ocho
//  restantes ya estaban redactados y NO se tocan.
//
//  PRECISIÓN DE ALCANCE, indicada por `docs/GUIA-REDACCION-M5-LOTE-A.md`:
//  en esta unidad «abdomen agudo» significa la EMERGENCIA ABDOMINAL DE ORIGEN
//  TRAUMÁTICO con irritación peritoneal o sangrado, no un repaso de patología
//  médica. La apendicitis, la pancreatitis médica, la colelitiasis y la
//  oclusión intestinal tienen sus propios temas en el Módulo 4 y no se
//  reproducen aquí.
//
//  Fuentes asignadas por el registro para `m5-trauma-abdomen`: PHTLS 9.ª ed.
//  (cap. 11, desde p. 377) y ACS Best Practices como primarias, con WHO/ICRC
//  BEC de apoyo. La copia de PHTLS 10 declara traducción automática: no se
//  consulta ni se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS_ABDOMEN = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), '
    + 'cap. 11, «Trauma abdominal», desde p. 377.',
  nota: 'Base curricular histórica declarada por el plan de estudios. El capítulo y su página de inicio '
    + 'están verificados en la copia licenciada; la página exacta de cada afirmación concreta queda '
    + 'PENDIENTE de confirmación docente. No se cita la 10.ª edición: la copia disponible declara '
    + 'traducción automática y no es citable.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Colección de guías de buenas prácticas del ACS usada como contraste actual. PENDIENTE: guía y '
    + 'apartado exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE, reconocimiento del shock y exploración seriada del '
    + 'traumatizado. PENDIENTE: módulo y página exactos.',
}

export default {
  'm5-ta-abdomen-agudo': {
    icono: 'cp-servier-peristalsis',
    duracion: '15 min',
    resumen: 'En esta unidad, abdomen agudo designa la emergencia abdominal de origen traumático: un '
      + 'abdomen que duele, se defiende o se distiende porque hay sangre o contenido vertido dentro. '
      + 'El problema práctico es que esos signos pueden ser tardíos, escasos o faltar por completo, y '
      + 'que la exploración pierde fiabilidad justo en los pacientes más graves. La conducta combina '
      + 'lectura del mecanismo, exploraciones seriadas y vigilancia del shock, sin nombrar el órgano '
      + 'lesionado en el campo.',
    objetivos: [
      'Delimitar el abdomen agudo traumático frente a la patología médica abdominal.',
      'Reconocer los signos de irritación peritoneal y sus limitaciones en la escena.',
      'Integrar mecanismo, exploración seriada y signos de shock en la decisión de traslado.',
    ],
    secciones: [
      {
        titulo: 'Qué significa aquí «abdomen agudo»',
        bloques: [
          { tipo: 'p', texto: 'La expresión se usa en medicina para un cuadro abdominal de instauración rápida que puede requerir cirugía. En esta unidad de trauma se refiere a la situación en que un traumatismo ha producido sangre libre, contenido digestivo, orina o bilis dentro de la cavidad, con irritación del peritoneo, pérdida de volumen o ambas cosas.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que NO es este tema', texto: 'No es un repaso de apendicitis, pancreatitis médica, colelitiasis u oclusión intestinal: esas entidades tienen sus propios temas en las urgencias gastrointestinales del Módulo 4. Aquí el origen es traumático, y la pregunta que se responde no es «qué enfermedad tiene», sino «¿hay una emergencia abdominal que exige quirófano?».' },
          {
            tipo: 'lista',
            titulo: 'Dos formas de producirlo',
            items: [
              'Sangre libre por lesión de órgano sólido o de vasos: domina la pérdida de volumen y el shock.',
              'Contenido vertido por lesión de víscera hueca: domina la irritación peritoneal, y suele instaurarse más tarde.',
            ],
          },
        ],
      },
      {
        titulo: 'Los signos y por qué engañan',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos de irritación peritoneal',
            items: [
              'Dolor abdominal difuso o localizado, que aumenta con el movimiento.',
              'Defensa: contracción de la pared al palpar.',
              'Rigidez involuntaria, el llamado abdomen «en tabla».',
              'Dolor a la descompresión.',
              'El paciente evita moverse, permanece quieto y flexiona las piernas.',
              'Distensión abdominal, que es un signo tardío y poco sensible.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Pueden aparecer tarde o no aparecer', texto: 'La peritonitis por contenido intestinal necesita horas para instalarse; la sangre libre puede irritar poco al principio. Además, la exploración deja de ser fiable cuando hay alteración del estado de conciencia, intoxicación, lesión medular o una lesión muy dolorosa que distraiga. Un abdomen «normal» en esas condiciones no descarta nada, y es precisamente en esos pacientes donde el mecanismo pesa más.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'La señal que no depende de la palpación', texto: 'Un paciente traumatizado con signos de shock y sin hemorragia externa que lo explique tiene un abdomen sospechoso, aunque la pared esté blanda y no duela. La respuesta fisiológica informa cuando la exploración calla.' },
        ],
      },
      {
        titulo: 'Cómo se explora y qué se hace',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Exploración seriada',
            items: [
              'Inspección: heridas, marcas del mecanismo, equimosis, distensión, evisceración.',
              'Palpación suave, empezando por el cuadrante más alejado del dolor.',
              'Registro de lo encontrado con la hora, para poder comparar.',
              'Repetición de la exploración durante el traslado: el abdomen cambia, y el cambio es el dato.',
              'Reevaluación paralela de conciencia, piel, pulso, relleno capilar y presión.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Tres cosas que no se hacen', texto: 'No se repite una palpación profunda y agresiva: duele mucho, no aporta y puede agravar la lesión. No se administra nada por vía oral, porque el paciente puede requerir cirugía y por el riesgo de broncoaspiración. Y no se afirma qué órgano está lesionado: el ámbito prehospitalario no lo puede saber, y tampoco necesita saberlo para decidir.' },
          {
            tipo: 'lista',
            titulo: 'Conducta general',
            items: [
              'Oxígeno y tratamiento del shock conforme al alcance autorizado y al protocolo del servicio.',
              'Prevención activa de la hipotermia: el sangrado abdominal no se puede comprimir.',
              'Cobertura de la evisceración con apósito húmedo y estéril según protocolo, sin reintroducir las vísceras.',
              'Manejo de un objeto empalado en su posición, sin retirarlo.',
              'Analgesia según alcance y protocolo; controlar el dolor no impide que el hospital explore después.',
              'Traslado a centro con capacidad quirúrgica y prealerta con el mecanismo y la evolución.',
            ],
          },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [{ tipo: 'fuentes', items: [PHTLS_ABDOMEN, ACS_BEST, WHO_BEC] }],
      },
    ],
    conceptosClave: [
      { termino: 'Abdomen agudo traumático', definicion: 'Emergencia abdominal por sangre o contenido vertido en la cavidad tras un traumatismo, con irritación peritoneal, pérdida de volumen o ambas.' },
      { termino: 'Irritación peritoneal', definicion: 'Respuesta inflamatoria del peritoneo que produce dolor, defensa, rigidez y dolor a la descompresión.' },
      { termino: 'Exploración seriada', definicion: 'Repetición documentada de la exploración a lo largo del tiempo, cuyo valor está en detectar el cambio.' },
      { termino: 'Dolor distractor', definicion: 'Lesión tan dolorosa que impide al paciente percibir o referir el dolor abdominal, restando fiabilidad a la exploración.' },
    ],
    flashcards: [
      { frente: '¿Qué significa «abdomen agudo» en esta unidad?', reverso: 'La emergencia abdominal de origen traumático con sangre o contenido vertido en la cavidad, no la patología médica abdominal.' },
      { frente: 'Cuatro signos de irritación peritoneal', reverso: 'Dolor, defensa, rigidez involuntaria y dolor a la descompresión.' },
      { frente: '¿Cuándo deja de ser fiable la exploración abdominal?', reverso: 'Con alteración de la conciencia, intoxicación, lesión medular o dolor distractor.' },
      { frente: 'Shock sin hemorragia externa y abdomen blando: ¿qué se concluye?', reverso: 'Que el abdomen sigue siendo sospechoso: la fisiología informa cuando la exploración calla.' },
      { frente: '¿Se afirma en campo qué órgano está lesionado?', reverso: 'No: no se puede saber sin imagen, y no hace falta para decidir el traslado.' },
      { frente: '¿Qué se hace con una evisceración?', reverso: 'Se cubre con apósito húmedo y estéril según protocolo, sin reintroducir las vísceras.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión con marca del cinturón en el abdomen. El paciente está consciente, con dolor leve y abdomen blando. ¿Qué corresponde?',
        opciones: [
          'Alta en el lugar: la exploración es normal.',
          'Traslado con exploración seriada documentada: los signos peritoneales pueden aparecer horas después y el mecanismo sostiene la sospecha.',
          'Palpación profunda repetida hasta provocar defensa.',
          'Administrar líquidos por vía oral para valorar la tolerancia.',
        ],
        correcta: 1,
        explicacion: 'La clínica puede ser diferida; el valor de la exploración está en repetirla y compararla.',
      },
      {
        pregunta: 'Paciente intoxicado con trauma abdominal cerrado y exploración abdominal aparentemente normal. ¿Qué peso tiene esa exploración?',
        opciones: [
          'Descarta lesión abdominal.',
          'Poco: la intoxicación resta fiabilidad, y en ese contexto el mecanismo y la respuesta fisiológica pesan más.',
          'Confirma que el dolor es simulado.',
          'Permite retrasar el traslado.',
        ],
        correcta: 1,
        explicacion: 'La lección enumera la intoxicación entre las situaciones que invalidan la exploración como prueba de exclusión.',
      },
      {
        pregunta: '¿Cuál de estas conductas es correcta en el abdomen agudo traumático?',
        opciones: [
          'Repetir la palpación profunda para confirmar la defensa.',
          'Nada por vía oral, tratamiento del shock según protocolo, prevención de la hipotermia y traslado a centro quirúrgico.',
          'Reintroducir las vísceras eviscerada antes de cubrir.',
          'Retirar un objeto empalado para facilitar el traslado.',
        ],
        correcta: 1,
        explicacion: 'Las otras tres opciones están expresamente desaconsejadas en la lección.',
      },
      {
        pregunta: '¿Por qué la prevención de la hipotermia es relevante en este cuadro?',
        opciones: [
          'Por confort del paciente.',
          'Porque el sangrado abdominal no se puede comprimir y un paciente frío coagula peor.',
          'Porque acelera la aparición de la defensa.',
          'Porque sustituye a la analgesia.',
        ],
        correcta: 1,
        explicacion: 'La coagulación es la única contención que le queda a una hemorragia no compresible antes del quirófano.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Atiendes a un paciente con trauma abdominal cerrado. A las 20:10 el abdomen está blando y a las 20:25 aparece defensa y el paciente evita moverse. ¿Qué representa esa comparación?',
          opciones: [
            'Un error de exploración en la primera valoración.',
            'Un cambio detectado por la exploración seriada, que es el dato de mayor valor: se documenta con la hora, se comunica y refuerza la prioridad de traslado.',
            'Una mejoría del cuadro.',
            'Una indicación de administrar líquidos por vía oral.',
          ],
          correcta: 1,
          explicacion: 'La lección insiste en que el abdomen cambia con el tiempo y en que el cambio, registrado con su hora, es el hallazgo que orienta.',
        },
        {
          pregunta: 'En la entrega hospitalaria, ¿cuál de estas formulaciones se ajusta a lo que el ámbito prehospitalario puede sostener?',
          opciones: [
            '«Rotura esplénica con hemoperitoneo».',
            '«Trauma abdominal cerrado por cinturón; abdomen blando a las 20:10 y con defensa a las 20:25; piel fría, taquicardia y presión en descenso; sin hemorragia externa».',
            '«Abdomen agudo médico, probable apendicitis».',
            '«Sin lesión abdominal: el paciente caminaba».',
          ],
          correcta: 1,
          explicacion: 'Se describe el mecanismo, los hallazgos con su hora y la respuesta fisiológica; nombrar el órgano lesionado excede lo que la escena permite afirmar.',
        },
      ],
    },
    revision: {
      estado: 'borrador',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'PHTLS 9.ª ed. (2020), cap. 11; ACS Best Practices; WHO/ICRC BEC 2018',
      observaciones: [
        'Redactado desde cero en el lote A del Módulo 5; el tema estaba vacío.',
        'PRECISIÓN DE ALCANCE: «abdomen agudo» se trata como emergencia abdominal TRAUMÁTICA. La patología médica abdominal permanece en sus temas del Módulo 4 y no se duplica aquí.',
        'ÁMBITO PREHOSPITALARIO: no se afirma qué órgano está lesionado; el diagnóstico es hospitalario y depende de imagen.',
        'ALCANCE Y PROTOCOLO: oxígeno, accesos, fluidos, hemoderivados, analgesia, apósitos y destino dependen del alcance autorizado y del protocolo del servicio.',
        'Prohibiciones explícitas recogidas en la lección: palpación profunda repetida, vía oral y reintroducción de vísceras evisceradas.',
      ],
      fuentes: [
        'NAEMT. PHTLS, 9.ª ed., 2020, cap. 11, desde p. 377.',
        'ACS. Trauma Quality Programs, Best Practices Guidelines.',
        'WHO/ICRC. Basic Emergency Care, 2018.',
      ],
    },
  },
}
