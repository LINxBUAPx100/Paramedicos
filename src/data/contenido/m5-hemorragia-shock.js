// ============================================================
//  MÓDULO 5 — Unidad «HEMORRAGIA Y SHOCK» (lote A)
// ------------------------------------------------------------
//  Los 5 temas que faltaban de la unidad: tipos de hemorragia, control de
//  hemorragias, uso del torniquete, definición y tipos de shock, y
//  fisiopatología del shock. Los otros 7 temas de la unidad ya estaban
//  redactados y no se tocan.
//
//  Pauta editorial: `docs/GUIA-REDACCION-M5-LOTE-A.md`.
//
//  DOS LÍMITES QUE LA AUDITORÍA EXIGE Y QUE ESTE ARCHIVO RESPETA:
//
//  1. TORNIQUETE. No se enseña aflojamiento periódico ni un tiempo máximo
//     universal. Tampoco anchos, presiones ni distancias en centímetros: el
//     dispositivo y su colocación dependen del modelo comercial disponible y
//     del protocolo del servicio.
//  2. CLASES DE SHOCK HEMORRÁGICO. No se publican los porcentajes de pérdida
//     de volumen de las clases I–IV: la cifra concreta depende de la edición y
//     no se dispone de un localizador actual verificable. Se enseña la
//     TENDENCIA fisiológica, que es lo que se observa realmente en la calle.
//
//  Fuentes asignadas por el registro para `m5-hemorragia-shock`: PHTLS 9.ª ed.
//  (cap. 3, pp. 47–98) y AHA/Cruz Roja Americana Primeros Auxilios 2024 como
//  primarias; ACS Best Practices y WHO/ICRC BEC como actualización; requiere
//  protocolo local. La copia de PHTLS 10 declara traducción automática: no se
//  consulta ni se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS_SHOCK = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), '
    + 'cap. 3, «Shock: fisiopatología de la vida y la muerte», pp. 47–98.',
  nota: 'Base curricular histórica declarada por el plan de estudios. El intervalo de páginas '
    + 'corresponde al capítulo verificado en la copia licenciada; la página exacta de cada afirmación '
    + 'concreta queda PENDIENTE de confirmación docente. No se cita la 10.ª edición: la copia '
    + 'disponible declara traducción automática y no es citable.',
}
const AHA_PRIMEROS_AUXILIOS_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía primaria actual para control de hemorragia externa y uso de torniquete. PENDIENTE: '
    + 'apartado exacto dentro de la guía.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: marco ABCDE, reconocimiento del shock y evaluación inicial del '
    + 'traumatizado. PENDIENTE: módulo y página exactos.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Colección de guías de buenas prácticas del ACS usada como contraste actual. PENDIENTE: guía y '
    + 'apartado exactos.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const PROTOCOLO = 'ALCANCE Y PROTOCOLO: oxígeno, accesos vasculares, fluidos, hemoderivados, '
  + 'analgesia, apósitos hemostáticos, empaquetamiento de heridas y destino dependen del alcance '
  + 'autorizado del prestador, del equipamiento de la unidad y del protocolo del servicio. La lección '
  + 'enseña el reconocimiento y la secuencia, no autoriza el procedimiento.'
const SIN_CIFRAS = 'No se publican volúmenes, porcentajes de pérdida, presiones objetivo, tiempos '
  + 'máximos ni medidas de dispositivo: dependen del formulario, del equipo real y del protocolo local.'

const ficha = ({ estado = 'borrador', version, extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en el lote A del Módulo 5; el tema estaba vacío.',
    PROTOCOLO,
    SIN_CIFRAS,
    ...extra,
  ],
  fuentes,
})

const VERSION = 'PHTLS 9.ª ed. (2020), cap. 3; AHA/ARC Primeros Auxilios 2024; WHO/ICRC BEC 2018'
const FUENTES_FICHA = [
  'NAEMT. PHTLS, 9.ª ed., 2020, cap. 3, pp. 47–98.',
  'AHA / American Red Cross. Guidelines for First Aid, 2024.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
  'ACS. Trauma Quality Programs, Best Practices Guidelines.',
]

export default {
  // ============================================================
  //  1. Tipos de hemorragias
  // ============================================================
  'm5-hs-tipos-hemorragias': {
    icono: 'cp-servier-eritrocito',
    duracion: '14 min',
    resumen: 'Las hemorragias se clasifican por dónde se acumula la sangre —externa, interna y de '
      + 'unión— y por si pueden o no comprimirse desde fuera. Esa segunda distinción es la que decide '
      + 'la conducta: lo compresible se controla en la escena, lo no compresible se controla en el '
      + 'quirófano y lo que hace el equipo es acortar el tiempo hasta él. La lección enseña además a '
      + 'buscar los sitios donde la sangre se esconde sin verse por fuera.',
    objetivos: [
      'Clasificar la hemorragia por localización y por posibilidad de compresión.',
      'Reconocer los sitios de sangrado oculto en el paciente traumatizado.',
      'Valorar la gravedad por flujo, acumulación y respuesta fisiológica, no por el color de la sangre.',
    ],
    secciones: [
      {
        titulo: 'Tres localizaciones',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Tipo', 'Dónde está la sangre', 'Qué implica'],
            filas: [
              ['Externa', 'Sale al exterior por una herida', 'Se ve y, con frecuencia, se puede comprimir'],
              ['Interna', 'Se acumula dentro de una cavidad o de un compartimento', 'No se ve; se sospecha por mecanismo y por fisiología'],
              ['De unión', 'En la unión del tronco con una extremidad o con el cuello: ingle, axila, región glútea, cuello', 'Difícil de comprimir y fuera del alcance de un torniquete de extremidad'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La distinción que gobierna la conducta', texto: 'Compresible significa que existe una superficie ósea o una estructura contra la que apretar. No compresible significa que no la hay: el sangrado abdominal, torácico o retroperitoneal no se detiene desde fuera. Reconocer que un paciente sangra donde no se puede comprimir cambia por completo la prioridad, porque lo que decide su desenlace pasa a ser el tiempo hasta el control quirúrgico.' },
        ],
      },
      {
        titulo: 'Dónde se esconde la sangre',
        bloques: [
          { tipo: 'p', texto: 'Un paciente puede estar perdiendo un volumen importante sin que se vea nada por fuera. Ante un shock sin hemorragia externa que lo explique, se buscan de forma sistemática los reservorios internos.' },
          {
            tipo: 'lista',
            titulo: 'Sitios de sangrado oculto',
            items: [
              'Tórax: un hemitórax admite un volumen considerable de sangre.',
              'Abdomen: la cavidad puede alojar una hemorragia importante con la pared casi normal.',
              'Retroperitoneo y pelvis: la fractura pélvica sangra de forma abundante en un espacio que admite mucho volumen.',
              'Huesos largos, sobre todo el fémur, donde el sangrado se acumula en el muslo.',
              'El suelo y el entorno: la sangre perdida antes de tu llegada, en la ropa, en el asiento o en el pavimento, también cuenta y con frecuencia se olvida.',
            ],
          },
        ],
      },
      {
        titulo: 'Cómo se valora la gravedad',
        bloques: [
          { tipo: 'p', texto: 'Es habitual describir el sangrado como pulsátil, en flujo continuo o en sábana, según su aspecto. La descripción es útil para comunicar lo que se ve, pero no es una medida fiable de gravedad ni del vaso implicado: la posición del paciente, la coagulación, la presión arterial y el tiempo transcurrido cambian el aspecto de un mismo sangrado.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El color de la sangre no clasifica al paciente', texto: 'Enseñar que el color rojo brillante identifica una hemorragia arterial y el rojo oscuro una venosa lleva a decisiones equivocadas: hay sangrados venosos masivos y sangrados arteriales que se contienen solos. Lo que se valora es el flujo activo, cuánto se ha acumulado, la región comprometida y —sobre todo— cómo responde el paciente.' },
          {
            tipo: 'lista',
            titulo: 'Lo que sí orienta',
            items: [
              'Si el sangrado es activo en este momento o ya se ha contenido.',
              'Cuánta sangre se ha acumulado, incluida la perdida antes de tu llegada.',
              'La región y el mecanismo: dónde puede estar acumulándose lo que no se ve.',
              'La tendencia de conciencia, piel, pulso periférico, relleno capilar y presión.',
              'Si el sangrado responde o no a las medidas aplicadas.',
            ],
          },
        ],
      },
      F([PHTLS_SHOCK, AHA_PRIMEROS_AUXILIOS_2024, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Hemorragia compresible', definicion: 'Aquella que puede controlarse aplicando presión desde el exterior, habitualmente contra una superficie ósea.' },
      { termino: 'Hemorragia no compresible', definicion: 'Aquella que no puede detenerse con presión externa, como la torácica, la abdominal o la retroperitoneal; su control es quirúrgico.' },
      { termino: 'Hemorragia de unión', definicion: 'La localizada en la unión del tronco con una extremidad o con el cuello —ingle, axila, región glútea, cuello—, difícil de comprimir y fuera del alcance de un torniquete de extremidad.' },
      { termino: 'Sangrado oculto', definicion: 'Pérdida de sangre acumulada en tórax, abdomen, retroperitoneo, pelvis o muslo, sin manifestación externa visible.' },
    ],
    flashcards: [
      { frente: 'Las tres localizaciones de la hemorragia', reverso: 'Externa, interna y de unión.' },
      { frente: '¿Qué significa que una hemorragia no sea compresible?', reverso: 'Que no puede detenerse con presión externa: su control es quirúrgico y lo que cuenta es el tiempo hasta el quirófano.' },
      { frente: 'Sitios de sangrado oculto en trauma', reverso: 'Tórax, abdomen, retroperitoneo y pelvis, huesos largos —sobre todo fémur— y lo perdido en la escena.' },
      { frente: '¿El color de la sangre mide la gravedad?', reverso: 'No: se valora flujo activo, acumulación, región comprometida y respuesta fisiológica.' },
      { frente: '¿Por qué la hemorragia de unión es un problema aparte?', reverso: 'Porque es difícil de comprimir y queda fuera del alcance de un torniquete de extremidad.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente en shock tras una colisión, sin hemorragia externa visible. ¿Qué haces con esa información?',
        opciones: [
          'Descartas hemorragia porque no se ve sangre.',
          'Buscas de forma sistemática los sitios de sangrado oculto: tórax, abdomen, retroperitoneo y pelvis, y huesos largos.',
          'Concluyes que el shock es neurogénico.',
          'Esperas a que aparezca sangrado externo.',
        ],
        correcta: 1,
        explicacion: 'La hemorragia interna no se ve: se sospecha por mecanismo, por región y por la respuesta fisiológica del paciente.',
      },
      {
        pregunta: 'Una herida sangra con flujo continuo y de color oscuro. ¿Qué se puede afirmar?',
        opciones: [
          'Que es venosa y por tanto poco grave.',
          'Que se describe el aspecto, pero la gravedad se valora por flujo activo, acumulación, región y respuesta del paciente.',
          'Que es arterial por definición.',
          'Que no necesita control.',
        ],
        correcta: 1,
        explicacion: 'El aspecto sirve para comunicar lo observado; no clasifica ni la gravedad ni el vaso implicado.',
      },
      {
        pregunta: 'Herida sangrante en la ingle, en la unión del muslo con el tronco. ¿Qué categoría es y qué añade?',
        opciones: [
          'Externa de extremidad: se resuelve con torniquete convencional.',
          'Hemorragia de unión: difícil de comprimir y fuera del alcance de un torniquete de extremidad, lo que la convierte en un problema de tiempo hasta el control quirúrgico.',
          'Interna: no se ve.',
          'Compresible sin dificultad.',
        ],
        correcta: 1,
        explicacion: 'La localización de unión es precisamente la que no cubre un torniquete de extremidad.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Una hemorragia intraabdominal por lesión de órgano sólido es, por definición, ___.',
          opciones: ['compresible', 'no compresible', 'de unión'],
          correcta: 1,
          explicacion: 'No existe superficie contra la que comprimirla desde fuera: su control es quirúrgico.',
        },
        {
          texto: 'La sangre acumulada en el muslo tras una fractura de ___ es uno de los sitios clásicos de sangrado oculto.',
          opciones: ['húmero', 'fémur', 'clavícula'],
          correcta: 1,
          explicacion: 'El compartimento del muslo admite un volumen considerable sin manifestación externa.',
        },
        {
          texto: 'Al valorar la gravedad de un sangrado, el dato que NO debe usarse como medida es ___.',
          opciones: [
            'la cantidad acumulada en la escena',
            'el color de la sangre',
            'la tendencia del pulso periférico y del relleno capilar',
          ],
          correcta: 1,
          explicacion: 'El color describe, no mide; los otros dos sí orientan la conducta.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La lección declara expresamente que el color del sangrado no clasifica gravedad ni vaso, corrigiendo una enseñanza tradicional.'],
    }),
  },

  // ============================================================
  //  2. Control de hemorragias
  // ============================================================
  'm5-hs-control-hemorragias': {
    icono: 'cp-cc0-guantes',
    duracion: '16 min',
    resumen: 'El control de una hemorragia externa sigue una secuencia con un orden que importa: '
      + 'seguridad y protección personal, exposición de la herida, presión manual directa y, si el '
      + 'sangrado no cede, empaquetamiento de la herida o torniquete cuando la localización lo '
      + 'permite. Cada paso se reevalúa. La lección delimita además dónde NO se empaqueta y recuerda '
      + 'que la hemorragia interna no tiene «control externo»: exige reconocimiento y traslado.',
    objetivos: [
      'Ejecutar la secuencia de control de hemorragia externa en el orden correcto.',
      'Identificar dónde no debe empaquetarse una herida.',
      'Distinguir el manejo de la hemorragia externa del de la interna.',
    ],
    secciones: [
      {
        titulo: 'La secuencia',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'En este orden, reevaluando en cada paso',
            items: [
              'Seguridad de la escena y equipo de protección personal: guantes siempre, y protección ocular y facial cuando haya salpicadura previsible.',
              'Exponer la herida: se aparta o se corta la ropa. No se puede controlar lo que no se ve, y la ropa oscura oculta un sangrado importante.',
              'Presión manual directa sobre el punto que sangra, firme y sostenida, con la mano y un apósito. La presión se mantiene sin levantarla para «comprobar».',
              'Si la herida es profunda y la localización lo permite, empaquetarla: rellenarla con gasa —hemostática si está disponible y autorizada— llegando hasta el fondo, y volver a comprimir.',
              'Vendaje compresivo una vez controlado el sangrado, para mantener la presión sin sustituir lo anterior.',
              'Torniquete si el sangrado de una extremidad es potencialmente mortal o no se controla con lo anterior, conforme al protocolo y con el dispositivo disponible.',
              'Reevaluar: la herida vuelve a comprobarse durante el traslado, porque un sangrado controlado puede reaparecer.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La presión directa sigue siendo la primera medida', texto: 'Es la maniobra que más sangrados resuelve, no necesita material especial y puede aplicarse de inmediato. Su fallo más frecuente no es de indicación, sino de ejecución: presión insuficiente, mal localizada o interrumpida cada pocos segundos para mirar.' },
        ],
      },
      {
        titulo: 'Empaquetamiento: dónde sí y dónde no',
        bloques: [
          { tipo: 'p', texto: 'Empaquetar consiste en rellenar la cavidad de la herida con gasa hasta el fondo y comprimir sobre ella, para llevar la presión al punto que sangra. Sirve en heridas profundas de extremidades y en las de unión, que son las que un torniquete no alcanza.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dónde no se empaqueta', texto: 'No se empaquetan heridas del tórax, del abdomen ni del cuello. En el tórax y en el abdomen, la cavidad no tiene fondo que permita hacer presión útil y el material puede desplazarse hacia dentro; en el cuello, el material puede comprimir la vía aérea o desplazarse. Tampoco se empaqueta a ciegas una herida cuyo fondo no se identifica. Que el apósito hemostático esté disponible en la unidad no cambia esa limitación.' },
          { tipo: 'p', texto: 'El uso de apósitos hemostáticos, su tipo y su tiempo de compresión dependen del producto que tenga la unidad y del protocolo del servicio. La lección no fija ninguno de esos parámetros.' },
        ],
      },
      {
        titulo: 'Lo que no se controla desde fuera',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'La hemorragia interna no tiene control externo', texto: 'Ninguna maniobra de la escena detiene un sangrado torácico, abdominal o retroperitoneal. Lo que corresponde es reconocerlo, evitar que empeore y acortar el tiempo hasta el control definitivo: prealerta, traslado sin demoras evitables y los procedimientos que puedan hacerse en marcha.' },
          {
            tipo: 'lista',
            titulo: 'Medidas de apoyo, siempre según protocolo',
            items: [
              'Prevención activa de la hipotermia: un paciente frío coagula peor, y esa pérdida agrava un sangrado que no se puede comprimir.',
              'Manipulación cuidadosa: movilizar en bloque y evitar movimientos que puedan desplazar coágulos ya formados.',
              'Oxígeno, accesos y fluidos conforme al alcance autorizado y al protocolo del servicio.',
              'Estabilización pélvica según protocolo cuando se sospecha fractura de pelvis.',
              'Prealerta al centro receptor con el mecanismo, los hallazgos y la evolución.',
            ],
          },
        ],
      },
      F([AHA_PRIMEROS_AUXILIOS_2024, PHTLS_SHOCK, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Presión directa', definicion: 'Compresión firme y sostenida sobre el punto sangrante; primera medida del control de la hemorragia externa.' },
      { termino: 'Empaquetamiento de herida', definicion: 'Relleno de una herida profunda con gasa hasta el fondo, seguido de compresión, para llevar la presión al punto que sangra.' },
      { termino: 'Apósito hemostático', definicion: 'Gasa impregnada de un agente que favorece la coagulación; su tipo, indicación y tiempo de compresión dependen del producto y del protocolo.' },
      { termino: 'Vendaje compresivo', definicion: 'Vendaje que mantiene la presión una vez controlado el sangrado; complementa la presión directa y no la sustituye.' },
    ],
    flashcards: [
      { frente: 'Primera medida ante una hemorragia externa', reverso: 'Presión manual directa firme y sostenida sobre el punto sangrante, tras exponer la herida.' },
      { frente: '¿Por qué falla con frecuencia la presión directa?', reverso: 'Por ejecución: presión insuficiente, mal localizada o interrumpida para comprobar.' },
      { frente: '¿Dónde NO se empaqueta una herida?', reverso: 'En tórax, abdomen y cuello, y nunca a ciegas en una herida cuyo fondo no se identifica.' },
      { frente: '¿Qué hace el vendaje compresivo?', reverso: 'Mantiene la presión una vez controlado el sangrado; no sustituye la presión directa.' },
      { frente: '¿Cómo se «controla» una hemorragia interna?', reverso: 'No se controla desde fuera: se reconoce, se evita empeorarla y se acorta el tiempo hasta el control definitivo.' },
    ],
    quiz: [
      {
        pregunta: 'Herida profunda en el muslo con sangrado abundante que no cede con presión directa. ¿Cuál es el siguiente paso de la secuencia?',
        opciones: [
          'Elevar la extremidad y esperar.',
          'Empaquetar la herida hasta el fondo y volver a comprimir; si aun así no cede, torniquete conforme al protocolo.',
          'Aplicar frío local.',
          'Retirar la presión para valorar mejor.',
        ],
        correcta: 1,
        explicacion: 'El empaquetamiento lleva la presión al punto sangrante en una herida profunda de extremidad; el torniquete es el paso siguiente si no basta.',
      },
      {
        pregunta: 'Herida sangrante en el cuello. ¿Qué está indicado según la lección?',
        opciones: [
          'Empaquetarla con gasa hemostática hasta el fondo.',
          'No empaquetarla: se aplica presión controlada sin comprometer la vía aérea y se traslada.',
          'Aplicar un torniquete cervical.',
          'Vendaje circular apretado alrededor del cuello.',
        ],
        correcta: 1,
        explicacion: 'El cuello no se empaqueta: el material puede comprimir la vía aérea o desplazarse.',
      },
      {
        pregunta: 'Paciente con sangrado externo controlado y sospecha de hemorragia abdominal. ¿Qué determina el pronóstico?',
        opciones: [
          'Repetir el vendaje compresivo cada cinco minutos.',
          'Acortar el tiempo hasta el control definitivo: prealerta, traslado sin demoras evitables, prevención de la hipotermia y lo que pueda hacerse en marcha.',
          'Aplicar presión sobre el abdomen.',
          'Esperar en la escena a que se estabilice.',
        ],
        correcta: 1,
        explicacion: 'Un sangrado no compresible se resuelve en quirófano; en la escena solo se puede ganar tiempo y evitar que empeore.',
      },
      {
        pregunta: '¿Por qué se insiste en la prevención de la hipotermia en un paciente que sangra?',
        opciones: [
          'Por confort del paciente.',
          'Porque un paciente frío coagula peor, y esa pérdida agrava un sangrado que puede no ser compresible.',
          'Porque reduce el dolor.',
          'Porque acelera el relleno capilar.',
        ],
        correcta: 1,
        explicacion: 'La coagulación se deteriora con el descenso de temperatura, y en trauma eso empeora directamente la hemorragia.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia de control de una hemorragia externa de extremidad',
        pasos: [
          'Asegurar la escena y colocarse el equipo de protección personal',
          'Exponer la herida apartando o cortando la ropa',
          'Aplicar presión manual directa firme y sostenida',
          'Empaquetar la herida profunda hasta el fondo y volver a comprimir',
          'Colocar vendaje compresivo una vez controlado el sangrado',
          'Aplicar torniquete conforme al protocolo si el sangrado sigue sin controlarse',
          'Reevaluar la herida durante el traslado',
        ],
      },
      completar: [
        {
          texto: 'La presión directa se mantiene sin levantarla para comprobar, porque interrumpirla ___.',
          opciones: [
            'mejora la valoración de la herida',
            'permite que el sangrado se reanude y es una de las causas frecuentes de su fallo',
            'reduce el dolor del paciente',
          ],
          correcta: 1,
          explicacion: 'El fallo más habitual de la presión directa es de ejecución, no de indicación.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'No se publica tiempo de compresión de apósito hemostático ni tipo de producto: dependen del material real de la unidad y del protocolo.',
        'Prohibición explícita de empaquetar tórax, abdomen y cuello, y de empaquetar a ciegas.',
      ],
    }),
  },

  // ============================================================
  //  3. Uso del torniquete
  // ============================================================
  'm5-hs-torniquete': {
    icono: 'cp-servier-arteria',
    duracion: '15 min',
    resumen: 'El torniquete está indicado ante una hemorragia de extremidad potencialmente mortal o que '
      + 'no se controla con las medidas previas. Se prefiere un dispositivo comercial, se aprieta hasta '
      + 'que el sangrado se detiene, se registra la hora de colocación y se reevalúa. Esta lección '
      + 'retira dos enseñanzas tradicionales que hoy no se sostienen: aflojarlo periódicamente y '
      + 'manejar un tiempo máximo universal. Tampoco se usa en la mordedura de serpiente.',
    objetivos: [
      'Indicar el torniquete en el supuesto correcto y dentro de la secuencia de control.',
      'Aplicar los principios de colocación, registro y reevaluación.',
      'Rechazar el aflojamiento periódico, el tiempo máximo universal y el uso en mordedura de serpiente.',
    ],
    secciones: [
      {
        titulo: 'Cuándo se indica',
        bloques: [
          { tipo: 'p', texto: 'El torniquete no es la primera medida ni la última: es el paso que sigue cuando el sangrado de una extremidad es potencialmente mortal desde el primer momento, o cuando la presión directa y el empaquetamiento no lo han controlado. En un escenario con varias víctimas, con acceso difícil o con riesgo activo, puede aplicarse antes por razones operativas conforme al protocolo del servicio.' },
          {
            tipo: 'lista',
            titulo: 'Principios de colocación',
            items: [
              'Se prefiere un dispositivo comercial diseñado para ese uso; los improvisados son menos fiables y con frecuencia no alcanzan la presión necesaria.',
              'Se coloca sobre la extremidad, proximal a la herida, siguiendo las instrucciones del dispositivo que tenga la unidad y el protocolo del servicio.',
              'Se aprieta hasta que el sangrado se detiene. Ese es el criterio de éxito, no una cifra de presión.',
              'Se registra la hora de colocación de forma visible y en el informe.',
              'Se deja a la vista: nunca se cubre con una manta o un vendaje que impida verlo.',
              'Si el sangrado persiste, la colocación de un segundo dispositivo depende del diseño del torniquete y del protocolo del servicio.',
              'Se reevalúa la extremidad y el sangrado durante todo el traslado.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Duele, y eso no es un fallo', texto: 'Un torniquete correctamente apretado es doloroso. El dolor no es motivo para aflojarlo. La analgesia, si procede, se administra conforme al alcance autorizado y al protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Lo que esta lección retira',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No se afloja periódicamente', texto: 'El aflojamiento periódico —soltarlo a intervalos regulares «para que circule la sangre»— fue una enseñanza tradicional y hoy no se recomienda: reanuda la hemorragia que se había controlado y agrava la pérdida acumulada. Una vez colocado por una indicación correcta, el torniquete permanece; su retirada o su conversión es una decisión clínica que corresponde al ámbito y al protocolo que la autoricen, no una rutina de tiempo.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se enseña un tiempo máximo universal', texto: 'No existe una cifra única de minutos u horas aplicable a todo paciente y a toda circunstancia. Lo que sí es cierto y sí se enseña es que el tiempo importa, que por eso se registra la hora de colocación y que se comunica en la entrega. Si tu servicio maneja un límite operativo, procede de su protocolo y se cita como tal.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se usa en mordedura de serpiente', texto: 'El torniquete no forma parte del manejo de la mordedura de serpiente. Su uso en ese contexto puede añadir daño local sin beneficio demostrado. El manejo de esa exposición pertenece a la unidad de toxicología y al protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Lo que se comunica en la entrega',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Que hay un torniquete colocado y en qué extremidad: parece obvio y se olvida.',
              'La hora exacta de colocación.',
              'Quién lo colocó y por qué indicación.',
              'Si se colocó un segundo dispositivo y cuándo.',
              'Cómo respondió el sangrado y si hubo que reapretarlo.',
              'El estado de la extremidad en la última reevaluación.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Un torniquete oculto es un riesgo evitable', texto: 'Cubrirlo con una manta o dejarlo sin registrar hace que quien recibe al paciente pueda no verlo durante un tiempo. Dejarlo a la vista y anunciarlo en la entrega cuesta segundos y evita ese problema.' },
        ],
      },
      F([AHA_PRIMEROS_AUXILIOS_2024, PHTLS_SHOCK, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Torniquete', definicion: 'Dispositivo que comprime circunferencialmente una extremidad para detener una hemorragia potencialmente mortal o no controlada por otras medidas.' },
      { termino: 'Torniquete comercial', definicion: 'Dispositivo diseñado y fabricado para ese uso; preferible al improvisado, que suele no alcanzar la presión necesaria.' },
      { termino: 'Criterio de éxito', definicion: 'En el torniquete, la detención del sangrado; no se define por una cifra de presión aplicada.' },
      { termino: 'Hora de colocación', definicion: 'Momento exacto en que se colocó el torniquete; se registra de forma visible y se comunica en la entrega.' },
    ],
    flashcards: [
      { frente: 'Indicación del torniquete', reverso: 'Hemorragia de extremidad potencialmente mortal o no controlada con presión directa y empaquetamiento.' },
      { frente: '¿Se afloja el torniquete cada cierto tiempo?', reverso: 'No: reanuda la hemorragia controlada y agrava la pérdida acumulada.' },
      { frente: '¿Cuál es el tiempo máximo de un torniquete?', reverso: 'No existe una cifra universal: se registra la hora, se comunica y cualquier límite operativo procede del protocolo del servicio.' },
      { frente: '¿Cuánto se aprieta un torniquete?', reverso: 'Hasta que el sangrado se detiene; ese es el criterio, no una cifra de presión.' },
      { frente: '¿Se usa torniquete en mordedura de serpiente?', reverso: 'No: puede añadir daño local sin beneficio demostrado.' },
      { frente: '¿Por qué no se cubre el torniquete?', reverso: 'Porque quien recibe al paciente debe verlo de inmediato; un torniquete oculto es un riesgo evitable.' },
    ],
    quiz: [
      {
        pregunta: 'Amputación traumática de antebrazo con sangrado masivo en una escena con riesgo activo. ¿Qué corresponde?',
        opciones: [
          'Presión directa durante diez minutos antes de plantear otra medida.',
          'Torniquete de extremidad conforme al protocolo, apretando hasta detener el sangrado y registrando la hora.',
          'Elevación de la extremidad y vendaje.',
          'Esperar a que la escena sea totalmente segura sin intervenir.',
        ],
        correcta: 1,
        explicacion: 'La hemorragia de extremidad potencialmente mortal es la indicación del torniquete, y el contexto operativo puede adelantarlo dentro de la secuencia.',
      },
      {
        pregunta: 'Han pasado cuarenta minutos desde que colocaste el torniquete y el traslado se prolonga. ¿Qué haces?',
        opciones: [
          'Lo aflojas unos segundos para que circule la sangre.',
          'Lo mantienes, reevalúas el sangrado y la extremidad, y comunicas la hora exacta de colocación en la entrega.',
          'Lo retiras y colocas un vendaje compresivo.',
          'Lo cubres para que el paciente no lo vea.',
        ],
        correcta: 1,
        explicacion: 'El aflojamiento periódico no se recomienda; lo que se hace es mantener, reevaluar, registrar y comunicar.',
      },
      {
        pregunta: 'Un compañero pregunta cuál es el tiempo máximo que puede permanecer un torniquete. ¿Qué respondes según la lección?',
        opciones: [
          'Que existe una cifra universal aplicable a cualquier paciente.',
          'Que no hay una cifra universal: el tiempo importa, por eso se registra la hora y se comunica, y cualquier límite operativo procede del protocolo del servicio.',
          'Que puede permanecer indefinidamente sin consecuencias.',
          'Que se retira siempre antes de llegar al hospital.',
        ],
        correcta: 1,
        explicacion: 'La lección enseña el registro y la comunicación del tiempo, no un umbral inventado.',
      },
      {
        pregunta: 'Paciente con mordedura de serpiente en la pierna. ¿Está indicado el torniquete?',
        opciones: [
          'Sí, para retrasar la absorción.',
          'No: no forma parte del manejo de esa exposición y puede añadir daño local.',
          'Sí, si el dolor es intenso.',
          'Solo si hay sangrado activo por la mordedura, apretando hasta ocluir.',
        ],
        correcta: 1,
        explicacion: 'El manejo de la mordedura de serpiente pertenece a otra unidad y al protocolo del servicio; el torniquete no es parte de él.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Colocaste un torniquete y el sangrado disminuyó pero no se detuvo del todo. ¿Cuál es la conducta correcta según lo enseñado?',
          opciones: [
            'Aflojar y volver a colocarlo más distal a la herida.',
            'Apretar más hasta detener el sangrado y, si aun así persiste, valorar un segundo dispositivo conforme al diseño del torniquete y al protocolo del servicio.',
            'Retirarlo y volver a la presión directa.',
            'Dejarlo así y trasladar sin más medidas.',
          ],
          correcta: 1,
          explicacion: 'El criterio de éxito es la detención del sangrado; el segundo dispositivo depende del diseño y del protocolo, no de una regla fija.',
        },
        {
          pregunta: 'Vas a entregar al paciente en el hospital. ¿Qué información sobre el torniquete debe salir de tu boca sin que te la pregunten?',
          opciones: [
            'Solo que sangraba mucho.',
            'Que hay un torniquete colocado, en qué extremidad, a qué hora exacta, por qué indicación, si hubo un segundo dispositivo y cómo respondió el sangrado.',
            'El modelo comercial del dispositivo únicamente.',
            'Nada: es visible en la extremidad.',
          ],
          correcta: 1,
          explicacion: 'La lección enumera exactamente esos puntos y advierte de que un torniquete no anunciado o cubierto puede pasar desapercibido un tiempo.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'CONTROL DE REGRESIÓN: la lección declara expresamente que NO se afloja periódicamente y que NO existe un tiempo máximo universal; ambas eran enseñanzas tradicionales del temario anterior.',
        'No se publican anchos, presiones, distancias en centímetros respecto a la herida ni modelo de dispositivo: dependen del equipo real de la unidad y del protocolo.',
        'DECISIÓN PENDIENTE: la academia debe declarar qué torniquete comercial usa el servicio y si su protocolo fija un límite operativo de tiempo.',
      ],
    }),
  },

  // ============================================================
  //  4. Definición y tipos de shock
  // ============================================================
  'm5-hs-definicion-tipos-shock': {
    icono: 'cp-servier-capilares',
    duracion: '15 min',
    resumen: 'Shock es la incapacidad de entregar o de utilizar oxígeno suficiente en la célula. No es '
      + 'una cifra de presión arterial: un paciente puede estar en shock con la presión todavía normal '
      + 'y otro puede tener la presión baja sin estarlo. La lección clasifica los cuatro grandes tipos '
      + '—hipovolémico, distributivo, cardiogénico y obstructivo— por el fallo que los origina, y '
      + 'mantiene el foco en el paciente traumatizado sin repetir las urgencias médicas del Módulo 4.',
    objetivos: [
      'Definir el shock en términos de perfusión y de entrega de oxígeno a la célula.',
      'Clasificar los cuatro tipos de shock por su fallo fisiológico y su ejemplo traumático.',
      'Rechazar la equivalencia entre shock e hipotensión.',
    ],
    secciones: [
      {
        titulo: 'Qué es el shock',
        bloques: [
          { tipo: 'p', texto: 'La célula necesita oxígeno de forma continua para producir energía. El sistema circulatorio existe para llevárselo. Cuando ese suministro se vuelve insuficiente —porque no hay bastante sangre, porque el corazón no la impulsa, porque el continente se ha dilatado o porque algo obstruye el circuito—, la célula pasa a un metabolismo de emergencia y empieza a deteriorarse. Eso es el shock.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Shock no es sinónimo de hipotensión', texto: 'La presión arterial es un dato de la perfusión, no su definición. Un paciente joven puede mantener la presión durante un tiempo a costa de taquicardia y vasoconstricción, y estar ya en shock. Esperar a que la presión caiga para reconocerlo equivale a reconocerlo tarde.' },
          {
            tipo: 'lista',
            titulo: 'Los tres elementos que hacen falta',
            items: [
              'Un volumen suficiente que circule: la sangre.',
              'Una bomba que lo impulse: el corazón.',
              'Un continente con el calibre adecuado: los vasos.',
            ],
          },
          { tipo: 'p', texto: 'Cada tipo de shock corresponde al fallo de uno de esos elementos, o a un obstáculo mecánico que impide que el conjunto funcione.' },
        ],
      },
      {
        titulo: 'Los cuatro tipos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Tipo', 'Qué falla', 'Ejemplo en trauma'],
            filas: [
              ['Hipovolémico / hemorrágico', 'Falta volumen circulante', 'Hemorragia interna o externa por lesión de órgano sólido, fractura de pelvis o de fémur'],
              ['Distributivo', 'El continente se dilata y el volumen deja de estar bien repartido', 'Shock neurogénico por lesión medular; también el anafiláctico y el séptico, desarrollados en sus propios temas'],
              ['Cardiogénico', 'La bomba no impulsa lo suficiente', 'Lesión cardiaca contusa que compromete la función del corazón'],
              ['Obstructivo', 'Un obstáculo mecánico impide el llenado o la eyección', 'Neumotórax a tensión y taponamiento cardiaco'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'En el paciente traumatizado, la hemorragia primero', texto: 'Cualquier paciente de trauma en shock se considera hemorrágico hasta que se demuestre otra cosa, porque es la causa más frecuente y la que peor tolera el retraso. Atribuir la hipotensión a otra causa sin haber descartado el sangrado es un error clásico y evitable, y aparece de nuevo en el tema de lesión medular.' },
          { tipo: 'p', texto: 'Los tipos pueden coexistir. Un paciente con lesión medular cervical puede tener a la vez un componente distributivo y una hemorragia abdominal, y en ese caso los dos problemas se atienden, no se elige uno.' },
        ],
      },
      F([PHTLS_SHOCK, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Shock', definicion: 'Estado en que la entrega o la utilización de oxígeno en la célula resulta insuficiente para mantener su metabolismo.' },
      { termino: 'Shock hipovolémico', definicion: 'El producido por falta de volumen circulante; en trauma, casi siempre hemorrágico.' },
      { termino: 'Shock distributivo', definicion: 'El producido por dilatación del continente vascular, con volumen mal repartido; incluye el neurogénico, el anafiláctico y el séptico.' },
      { termino: 'Shock obstructivo', definicion: 'El producido por un obstáculo mecánico al llenado o a la eyección cardiaca, como el neumotórax a tensión o el taponamiento.' },
      { termino: 'Shock cardiogénico', definicion: 'El producido por fallo de la bomba cardiaca para impulsar un volumen suficiente.' },
    ],
    flashcards: [
      { frente: 'Definición de shock', reverso: 'Entrega o utilización de oxígeno insuficiente en la célula para mantener su metabolismo.' },
      { frente: '¿Shock equivale a hipotensión?', reverso: 'No: puede haber shock con presión aún normal, y presión baja sin shock.' },
      { frente: 'Los tres elementos del sistema circulatorio', reverso: 'Volumen que circula, bomba que lo impulsa y continente con el calibre adecuado.' },
      { frente: 'Tipo de shock del neumotórax a tensión', reverso: 'Obstructivo: un obstáculo mecánico impide el llenado cardiaco.' },
      { frente: 'En un traumatizado en shock, ¿cuál es la causa a descartar primero?', reverso: 'La hemorragia: es la más frecuente y la que peor tolera el retraso.' },
    ],
    quiz: [
      {
        pregunta: 'Joven con trauma abdominal, consciente, frecuencia cardiaca elevada, piel fría y presión arterial todavía dentro de lo normal. ¿Cómo se interpreta?',
        opciones: [
          'No está en shock porque la presión es normal.',
          'Puede estar en shock: la compensación mantiene la presión un tiempo a costa de taquicardia y vasoconstricción.',
          'Está en shock cardiogénico.',
          'Debe esperarse a que la presión caiga para actuar.',
        ],
        correcta: 1,
        explicacion: 'La presión es un dato tardío; conciencia, piel y pulso se alteran antes.',
      },
      {
        pregunta: 'Paciente con lesión medular cervical, hipotenso y con la piel caliente. ¿Qué conducta corresponde?',
        opciones: [
          'Asumir shock distributivo neurogénico y no buscar más.',
          'Considerar el componente distributivo y descartar activamente hemorragia, porque en trauma es la causa más frecuente de hipotensión.',
          'Asumir shock cardiogénico.',
          'Asumir shock obstructivo.',
        ],
        correcta: 1,
        explicacion: 'Los tipos pueden coexistir y la hemorragia no se da por descartada sin buscarla.',
      },
      {
        pregunta: '¿Qué tipo de shock corresponde al taponamiento cardiaco?',
        opciones: ['Hipovolémico', 'Distributivo', 'Cardiogénico', 'Obstructivo'],
        correcta: 3,
        explicacion: 'La presión dentro del pericardio impide el llenado del corazón: es un obstáculo mecánico.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Una hemorragia por fractura de pelvis produce un shock ___.',
          opciones: ['distributivo', 'hipovolémico', 'obstructivo'],
          correcta: 1,
          explicacion: 'Falta volumen circulante; es la forma más frecuente de shock en trauma.',
        },
        {
          texto: 'En el shock ___ el problema no es la cantidad de sangre, sino que el continente se ha dilatado y el volumen deja de estar bien repartido.',
          opciones: ['cardiogénico', 'distributivo', 'obstructivo'],
          correcta: 1,
          explicacion: 'Es el mecanismo del neurogénico, del anafiláctico y del séptico.',
        },
        {
          texto: 'Que dos tipos de shock coexistan en el mismo paciente obliga a ___.',
          opciones: [
            'elegir el más probable y tratar solo ese',
            'atender ambos problemas, sin dar por explicada la hipotensión con una sola causa',
            'esperar al hospital para decidir',
          ],
          correcta: 1,
          explicacion: 'Dar la hipotensión por explicada con una sola causa es el error que la lección advierte de forma expresa.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'La lección mantiene el foco traumático; anafiláctico y séptico se nombran para completar la clasificación y se remiten a sus propios temas ya redactados de la unidad.',
        'No se publican porcentajes de pérdida de volumen ni cifras de presión objetivo.',
      ],
    }),
  },

  // ============================================================
  //  5. Fisiopatología del estado de shock
  // ============================================================
  'm5-hs-fisiopatologia': {
    icono: 'cp-servier-capilares',
    duracion: '17 min',
    resumen: 'Esta lección explica la cadena que va de la pérdida de volumen al daño celular: cae la '
      + 'precarga, cae el gasto cardiaco, cae la entrega de oxígeno y la célula pasa al metabolismo '
      + 'anaerobio, con acidosis. El organismo compensa con taquicardia y vasoconstricción, y esa '
      + 'compensación es la que produce los signos que se observan antes de que la presión caiga. '
      + 'Cierra con la tríada de hipotermia, acidosis y coagulopatía, que se retroalimenta.',
    objetivos: [
      'Encadenar precarga, gasto cardiaco y entrega de oxígeno con el daño celular.',
      'Interpretar los signos de compensación simpática como hallazgos precoces.',
      'Explicar la tríada de hipotermia, acidosis y coagulopatía y su prevención prehospitalaria.',
    ],
    secciones: [
      {
        titulo: 'La cadena, paso a paso',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'De la pérdida de volumen al daño celular',
            items: [
              'Se pierde volumen: menos sangre vuelve al corazón, es decir, cae la precarga.',
              'Con menos llenado, cada latido expulsa menos sangre y el gasto cardiaco disminuye.',
              'Al bajar el gasto, baja la cantidad de oxígeno que llega a los tejidos por unidad de tiempo.',
              'La célula, sin oxígeno suficiente, cambia a metabolismo anaerobio: produce mucha menos energía y genera ácido.',
              'El ácido acumulado produce acidosis, que deteriora la función de la propia célula, del músculo cardiaco y de la coagulación.',
              'Si la situación se mantiene, el daño celular se hace irreversible aunque después se restablezca la perfusión.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué el tiempo pesa tanto', texto: 'La secuencia avanza sola mientras no se corrige la causa. Por eso, en el shock hemorrágico, lo que cambia el desenlace es detener la hemorragia y acortar el tiempo hasta el control definitivo; todo lo demás sostiene al paciente mientras eso ocurre.' },
        ],
      },
      {
        titulo: 'La compensación explica los signos',
        bloques: [
          { tipo: 'p', texto: 'El organismo no espera pasivamente. El sistema nervioso simpático aumenta la frecuencia y la fuerza del corazón y contrae los vasos de la piel, del músculo y del territorio esplácnico para redirigir sangre al corazón y al encéfalo. Esa respuesta es la que produce casi todos los hallazgos precoces.' },
          {
            tipo: 'tabla',
            headers: ['Qué se observa', 'Qué lo produce', 'Cuándo aparece'],
            filas: [
              ['Ansiedad, inquietud, confusión', 'Perfusión cerebral en descenso', 'Precoz y con frecuencia el primero'],
              ['Piel pálida, fría y sudorosa', 'Vasoconstricción cutánea', 'Precoz'],
              ['Taquicardia', 'Respuesta simpática para mantener el gasto', 'Precoz'],
              ['Pulso periférico débil o ausente con central presente', 'Redistribución del flujo hacia el centro', 'Intermedio'],
              ['Relleno capilar enlentecido', 'Perfusión periférica reducida', 'Intermedio'],
              ['Taquipnea', 'Compensación de la acidosis y de la menor entrega de oxígeno', 'Intermedio'],
              ['Descenso de la presión arterial', 'Agotamiento de la compensación', 'TARDÍO'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La presión normal no tranquiliza; la tendencia informa', texto: 'Una sola toma dice poco. Lo que orienta es cómo evolucionan conciencia, piel, pulso, relleno capilar y presión entre valoraciones sucesivas, cada una con su hora. Además, hay pacientes que compensan peor o de forma distinta: personas mayores, pacientes con tratamiento que limita la taquicardia, embarazadas, niños y pacientes con lesión medular.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre las clases de shock hemorrágico', texto: 'La bibliografía clásica divide la hemorragia en cuatro clases según el porcentaje de volumen perdido. Esta lección no publica esos porcentajes porque la cifra depende de la edición y no se dispone de un localizador actual verificable, y porque en la calle nadie mide el volumen perdido. Lo que sí se enseña es la progresión de los signos, que es lo que realmente se observa.' },
        ],
      },
      {
        titulo: 'La tríada que se retroalimenta',
        bloques: [
          { tipo: 'p', texto: 'Hipotermia, acidosis y coagulopatía se agravan mutuamente. El paciente frío coagula peor; si coagula peor, sangra más; si sangra más, empeora la perfusión y aumenta la acidosis; y la acidosis, a su vez, deteriora la coagulación y la función cardiaca. Una vez instalado, el círculo es difícil de romper.' },
          {
            tipo: 'lista',
            titulo: 'Qué puede hacer el ámbito prehospitalario',
            items: [
              'Detener la hemorragia externa que sea controlable.',
              'Prevenir la hipotermia de forma activa: retirar la ropa mojada, cubrir al paciente, cerrar puertas y controlar la temperatura del habitáculo. Es una de las pocas medidas gratuitas que modifican el resultado.',
              'Manipular con cuidado para no desplazar coágulos ya formados.',
              'Oxígeno, accesos, fluidos y hemoderivados conforme al alcance autorizado y al protocolo del servicio.',
              'Acortar el tiempo hasta el control definitivo y prealertar al centro receptor.',
              'Reevaluar y documentar con la hora, para que la tendencia sea visible.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La hipotermia no es solo un problema de invierno', texto: 'Un paciente traumatizado se enfría dentro de una ambulancia templada: está expuesto, inmóvil, con la piel vasoconstreñida y a veces mojado. Cubrirlo desde el principio cuesta segundos y actúa sobre uno de los tres vértices de la tríada.' },
        ],
      },
      F([PHTLS_SHOCK, WHO_BEC, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Precarga', definicion: 'Volumen de sangre que retorna al corazón y lo llena antes de la contracción; disminuye al perder volumen circulante.' },
      { termino: 'Gasto cardiaco', definicion: 'Volumen de sangre que el corazón expulsa por unidad de tiempo; depende del llenado y de la frecuencia y fuerza de contracción.' },
      { termino: 'Metabolismo anaerobio', definicion: 'Producción de energía sin oxígeno suficiente; rinde mucho menos y genera ácido.' },
      { termino: 'Compensación simpática', definicion: 'Respuesta que aumenta frecuencia y fuerza cardiaca y contrae los vasos periféricos para redirigir sangre a corazón y encéfalo.' },
      { termino: 'Tríada letal del trauma', definicion: 'Conjunto de hipotermia, acidosis y coagulopatía, que se agravan mutuamente y perpetúan la hemorragia.' },
    ],
    flashcards: [
      { frente: '¿Qué le ocurre a la precarga al perder volumen?', reverso: 'Disminuye: vuelve menos sangre al corazón y cada latido expulsa menos.' },
      { frente: '¿Qué produce el metabolismo anaerobio?', reverso: 'Mucha menos energía y ácido, que conduce a acidosis.' },
      { frente: 'Signo precoz del shock que suele aparecer primero', reverso: 'La alteración del estado mental: ansiedad, inquietud o confusión.' },
      { frente: '¿Cuándo cae la presión arterial en el shock?', reverso: 'Tarde: cuando se agota la compensación.' },
      { frente: 'Los tres vértices de la tríada letal', reverso: 'Hipotermia, acidosis y coagulopatía.' },
      { frente: '¿Qué pacientes compensan de forma distinta?', reverso: 'Personas mayores, pacientes con tratamiento que limita la taquicardia, embarazadas, niños y pacientes con lesión medular.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente traumatizado inquieto y ansioso, con piel fría y pálida y pulso radial débil, con presión aún normal. ¿Qué está ocurriendo?',
        opciones: [
          'Una reacción emocional al accidente, sin repercusión.',
          'Compensación en curso: los signos de vasoconstricción y de perfusión cerebral reducida preceden a la caída de la presión.',
          'Shock descartado por la presión normal.',
          'Hipotermia aislada.',
        ],
        correcta: 1,
        explicacion: 'La respuesta simpática produce esos hallazgos antes de que la presión ceda; interpretarlos como ansiedad retrasa el reconocimiento.',
      },
      {
        pregunta: '¿Por qué la acidosis empeora el shock además de ser su consecuencia?',
        opciones: [
          'Porque aumenta el volumen circulante.',
          'Porque deteriora la función celular, la del músculo cardiaco y la coagulación, con lo que la hemorragia y la hipoperfusión se agravan.',
          'Porque produce vasoconstricción excesiva.',
          'Porque eleva la temperatura corporal.',
        ],
        correcta: 1,
        explicacion: 'Es uno de los vértices de la tríada: cada elemento agrava a los otros dos.',
      },
      {
        pregunta: 'La ambulancia está templada y el traslado durará veinte minutos. ¿Qué corresponde hacer respecto a la temperatura del paciente traumatizado?',
        opciones: [
          'Nada: el habitáculo está templado.',
          'Prevenir activamente la hipotermia: retirar ropa mojada, cubrirlo y controlar la temperatura del habitáculo, porque el paciente expuesto y vasoconstreñido se enfría igualmente.',
          'Aplicar calor local sobre las heridas.',
          'Descubrirlo para vigilar mejor las lesiones.',
        ],
        correcta: 1,
        explicacion: 'Es una medida de bajo coste que actúa directamente sobre uno de los vértices de la tríada.',
      },
      {
        pregunta: 'Tomas la presión una sola vez y es normal. ¿Qué conclusión es correcta?',
        opciones: [
          'El paciente no está en shock.',
          'Una sola toma dice poco: lo que orienta es la tendencia de conciencia, piel, pulso, relleno capilar y presión entre valoraciones sucesivas con su hora.',
          'Puede suspenderse la vigilancia.',
          'La presión es el único parámetro fiable.',
        ],
        correcta: 1,
        explicacion: 'El valor aislado es poco informativo; la evolución documentada es la que permite detectar el deterioro.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la cadena fisiopatológica del shock hemorrágico',
        pasos: [
          'Pérdida de volumen circulante',
          'Descenso de la precarga: llega menos sangre al corazón',
          'Descenso del gasto cardiaco',
          'Descenso de la entrega de oxígeno a los tejidos',
          'Metabolismo anaerobio celular con producción de ácido',
          'Acidosis que deteriora célula, músculo cardiaco y coagulación',
        ],
      },
      completar: [
        {
          texto: 'La piel pálida, fría y sudorosa se explica por la ___ cutánea de la respuesta simpática.',
          opciones: ['vasodilatación', 'vasoconstricción', 'hipertermia'],
          correcta: 1,
          explicacion: 'El organismo cierra el territorio cutáneo para redirigir sangre al corazón y al encéfalo.',
        },
        {
          texto: 'En la tríada letal, un paciente frío ___ peor, lo que perpetúa la hemorragia.',
          opciones: ['ventila', 'coagula', 'percibe el dolor'],
          correcta: 1,
          explicacion: 'De ahí que la prevención activa de la hipotermia sea una medida con efecto directo sobre el sangrado.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'DEUDA DECLARADA: no se publican los porcentajes de pérdida de volumen de las clases I–IV de shock hemorrágico por falta de un localizador actual verificable; se enseña la progresión de signos en su lugar.',
        'No se publican cifras de presión objetivo ni volúmenes de fluidos: dependen del protocolo del servicio.',
      ],
    }),
  },
}
