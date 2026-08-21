// ============================================================
//  MÓDULO 6 — Unidad «SOPORTE VITAL PEDIÁTRICO»
// ------------------------------------------------------------
//  Los 2 temas de la unidad: RCP neonatal y pediátrico, y OVACE.
//
//  CONTROL OBLIGATORIO (CLAUDE.md §0.2): la OVACE pediátrica se respalda con la
//  guía PEDIÁTRICA —AHA/AAP 2025 Pediatric Basic Life Support— y distingue las
//  tres situaciones del algoritmo: lactante, niño y pérdida de respuesta.
//
//  BLOQUEO DE REFERENCIA (registro de fuentes): el plan cita «NALS» sin
//  identificar organización, título, edición ni ISBN. No se cita esa referencia.
//  La reanimación del recién nacido se apoya en AHA/AAP 2025 Neonatal
//  Resuscitation.
//
//  LÍMITE NUMÉRICO: no se publican frecuencias, profundidades, relaciones
//  compresión-ventilación ni dosis. Son parámetros que fija la guía vigente y
//  que el temario ya desarrolla en las lecciones de reanimación del Módulo 1 y
//  del Módulo 3; repetirlos aquí con otra cifra crearía una contradicción. Esta
//  lección enseña QUÉ CAMBIA en el recién nacido y en el niño, y remite los
//  valores a la guía adoptada y al protocolo del servicio.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const AHA_PBLS_2025 = {
  nombre: 'AHA/AAP 2025 Pediatric Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support',
  nota: 'Guía primaria actual del soporte vital básico pediátrico y de la obstrucción de la vía aérea '
    + 'por cuerpo extraño en lactante y niño. PENDIENTE: apartado y algoritmo exactos.',
}
const AHA_PALS_2025 = {
  nombre: 'AHA 2025 Pediatric Advanced Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support',
  nota: 'Guía primaria actual del soporte vital avanzado pediátrico. PENDIENTE: apartado y algoritmo '
    + 'exactos; no sostiene ninguna cifra concreta de esta lección.',
}
const AHA_NEONATAL_2025 = {
  nombre: 'AHA/AAP 2025 Neonatal Resuscitation.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation',
  nota: 'Guía primaria actual de la reanimación del recién nacido. Sustituye a cualquier referencia no '
    + 'identificada del plan. PENDIENTE: apartado y algoritmo exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: manejo de la vía aérea y de la parada en el paciente pediátrico. '
    + 'PENDIENTE: módulo y página exactos.',
}
const NALS_BLOQUEADO = {
  nombre: 'NALS, referencia citada por el plan de estudios.',
  nota: 'REFERENCIA NO RESUELTA Y NO CITABLE: el plan la nombra sin declarar organización, título, '
    + 'edición ni ISBN. Hasta que la academia la identifique, la reanimación neonatal se apoya en '
    + 'AHA/AAP 2025.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, equipamiento pediátrico y dirección médica de la academia R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija el alcance autorizado, el material '
    + 'disponible por edad y el destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const SIN_CIFRAS = 'No se publican frecuencias, profundidades, relaciones compresión-ventilación ni '
  + 'dosis: los fija la guía vigente y el protocolo del servicio, y el temario los desarrolla en las '
  + 'lecciones de reanimación de los Módulos 1 y 3.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: dispositivos, medicación, desfibrilación y destino dependen '
  + 'del alcance autorizado, del equipamiento y del protocolo del servicio.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA/AAP PBLS 2025; AHA PALS 2025; AHA/AAP Neonatal 2025',
  observaciones: [
    'Redactado desde cero en el lote de Módulo 6; el tema estaba vacío.',
    SIN_CIFRAS,
    PROTOCOLO,
    'REFERENCIA NO CITABLE: «NALS» permanece sin identificar y no se usa como fuente.',
    ...extra,
  ],
  fuentes,
})

export default {
  'm6-svp-rcp-neonatal': {
    icono: 'ic-rcp',
    duracion: '16 min',
    resumen: 'La reanimación del recién nacido y la del niño comparten el objetivo pero no el punto de '
      + 'partida. En el recién nacido el problema es casi siempre la transición respiratoria al nacer, '
      + 'de modo que la ventilación eficaz es la intervención que resuelve la mayoría de los casos. En '
      + 'el niño mayor, el paro suele ser el final de un deterioro respiratorio o circulatorio. La '
      + 'lección explica qué cambia en cada caso y por qué el calor y la ventilación mandan.',
    objetivos: [
      'Explicar por qué la ventilación es la intervención central en el recién nacido.',
      'Enumerar los pasos iniciales de la atención al recién nacido y su orden.',
      'Diferenciar el enfoque de la reanimación neonatal del de la pediátrica.',
    ],
    secciones: [
      {
        titulo: 'El recién nacido: una transición, no una enfermedad',
        bloques: [
          { tipo: 'p', texto: 'Al nacer, el pulmón lleno de líquido tiene que llenarse de aire, y la circulación tiene que reorganizarse para que la sangre pase por él. Casi todos los recién nacidos hacen esa transición solos. Cuando no la hacen, el problema es respiratorio: por eso en el recién nacido la ventilación eficaz resuelve la mayor parte de las situaciones, y no las compresiones ni la medicación.' },
          {
            tipo: 'lista',
            titulo: 'Los pasos iniciales, en orden',
            items: [
              'Calor: secar, retirar los paños húmedos y mantener la temperatura. Es la primera intervención y una de las que más peso tiene.',
              'Posición de la vía aérea: cabeza en posición neutra, evitando flexión e hiperextensión.',
              'Despejar la vía aérea solo si hay obstrucción evidente; la aspiración sistemática no está indicada.',
              'Estimulación suave: secar con energía moderada y frotar la espalda o las plantas.',
              'Valorar respiración y frecuencia cardiaca, que son los dos parámetros que guían la decisión.',
              'Si no respira o la frecuencia cardiaca es insuficiente: iniciar ventilación con presión positiva conforme a la guía y al protocolo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La ventilación eficaz es la clave, y "eficaz" significa que el tórax se mueve', texto: 'Si tras iniciar la ventilación el recién nacido no mejora, lo primero que se revisa no es la medicación: es la propia ventilación. Sellado de la mascarilla, posición de la cabeza, permeabilidad de la vía aérea y presión suficiente para que el tórax se eleve. La mayoría de los fracasos de la reanimación neonatal son fracasos de la ventilación.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'El frío es un enemigo real, no un detalle', texto: 'El recién nacido pierde calor con una rapidez extraordinaria por su superficie corporal relativa, su piel húmeda y su escasa grasa. La hipotermia empeora la transición, favorece la hipoglucemia y aumenta el consumo de oxígeno. Secar, cubrir —incluida la cabeza— y calentar el entorno es una intervención de reanimación, no una atención de confort.' },
        ],
      },
      {
        titulo: 'El niño: el final de un deterioro',
        bloques: [
          { tipo: 'p', texto: 'Fuera del periodo neonatal, el paro pediátrico casi nunca es súbito. Suele ser la consecuencia de una insuficiencia respiratoria o de un shock que progresaron sin corregirse, de modo que cuando llega el paro el organismo lleva tiempo hipóxico. Esa diferencia explica dos cosas: que la prioridad esté en reconocer y tratar antes, y que la oxigenación y la ventilación tengan un papel central también durante la reanimación.' },
          {
            tipo: 'tabla',
            headers: ['', 'Recién nacido', 'Niño'],
            filas: [
              ['Problema de base', 'Transición respiratoria al nacer', 'Deterioro respiratorio o circulatorio previo'],
              ['Intervención que más resuelve', 'Ventilación eficaz', 'Reconocimiento precoz y corrección de la causa'],
              ['Papel del calor', 'Intervención de primera línea', 'Importante, sobre todo en el lactante'],
              ['Origen cardiaco primario', 'Excepcional', 'Poco frecuente, pero existe'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dónde están las cifras', texto: 'Frecuencias, profundidad de compresión, relación compresión-ventilación, energía de desfibrilación y medicación pertenecen a la guía vigente y al protocolo del servicio, y el temario los desarrolla en las lecciones de reanimación de los Módulos 1 y 3. Esta lección no los repite para no crear una versión distinta de la misma pauta: lo que aquí se enseña es qué cambia en el recién nacido y en el niño, y por qué.' },
          {
            tipo: 'lista',
            titulo: 'Lo que siempre depende del equipo',
            items: [
              'Reconocer el deterioro antes del paro: es la intervención con más impacto de todo el módulo.',
              'Ventilar bien, comprobando que el tórax se mueve.',
              'Mantener el calor, sobre todo en el recién nacido y en el lactante.',
              'Medir la glucemia si está dentro del alcance: la hipoglucemia es frecuente y tratable.',
              'Buscar y corregir la causa, no solo aplicar el algoritmo.',
              'Acompañar a la familia y permitir su presencia conforme al procedimiento del servicio.',
            ],
          },
        ],
      },
      F([AHA_NEONATAL_2025, AHA_PBLS_2025, AHA_PALS_2025, NALS_BLOQUEADO, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Transición neonatal', definicion: 'Paso del pulmón lleno de líquido al pulmón ventilado y reorganización de la circulación tras el nacimiento.' },
      { termino: 'Ventilación eficaz', definicion: 'Aquella que consigue elevar el tórax; su verificación es el primer paso cuando el recién nacido no mejora.' },
      { termino: 'Paro de origen hipóxico', definicion: 'Parada cardiaca consecutiva a un deterioro respiratorio o circulatorio previo; patrón habitual fuera del periodo neonatal.' },
      { termino: 'Termorregulación neonatal', definicion: 'Mantenimiento de la temperatura del recién nacido; intervención de primera línea, no un cuidado accesorio.' },
    ],
    flashcards: [
      { frente: '¿Cuál es la intervención que resuelve la mayoría de las reanimaciones neonatales?', reverso: 'La ventilación eficaz.' },
      { frente: '¿Qué significa ventilación eficaz?', reverso: 'Que el tórax se mueve; si no mejora, se revisa sellado, posición, permeabilidad y presión.' },
      { frente: '¿Cuál es el primer paso de la atención al recién nacido?', reverso: 'El calor: secar, retirar paños húmedos y mantener la temperatura.' },
      { frente: '¿Está indicada la aspiración sistemática del recién nacido?', reverso: 'No: solo si hay obstrucción evidente.' },
      { frente: '¿Cuál es el origen habitual del paro fuera del periodo neonatal?', reverso: 'Un deterioro respiratorio o circulatorio previo, no un evento cardiaco súbito.' },
      { frente: '¿Dónde están las cifras de frecuencia, profundidad y relación?', reverso: 'En la guía vigente, en el protocolo del servicio y en las lecciones de reanimación de los Módulos 1 y 3.' },
    ],
    quiz: [
      {
        pregunta: 'Recién nacido que no respira tras el nacimiento. ¿Cuál es la intervención central?',
        opciones: [
          'Iniciar compresiones torácicas de inmediato.',
          'Los pasos iniciales —calor, posición, estimulación— y, si no responde, la ventilación con presión positiva eficaz.',
          'Administrar medicación como primera medida.',
          'Aspirar de forma sistemática antes de nada.',
        ],
        correcta: 1,
        explicacion: 'El problema del recién nacido es la transición respiratoria: la ventilación resuelve la mayoría de los casos.',
      },
      {
        pregunta: 'Has iniciado la ventilación de un recién nacido y no mejora. ¿Qué revisas primero?',
        opciones: [
          'La necesidad de medicación.',
          'La propia ventilación: sellado de la mascarilla, posición de la cabeza, permeabilidad de la vía aérea y si el tórax se eleva.',
          'La glucemia exclusivamente.',
          'El tiempo transcurrido desde el nacimiento.',
        ],
        correcta: 1,
        explicacion: 'La mayoría de los fracasos de la reanimación neonatal son fracasos de la ventilación.',
      },
      {
        pregunta: '¿Por qué el calor se considera una intervención de reanimación en el recién nacido?',
        opciones: [
          'Por confort del paciente.',
          'Porque la hipotermia empeora la transición, favorece la hipoglucemia y aumenta el consumo de oxígeno.',
          'Porque sustituye a la ventilación.',
          'Porque acelera la frecuencia cardiaca.',
        ],
        correcta: 1,
        explicacion: 'El recién nacido pierde calor con extraordinaria rapidez y eso tiene consecuencias fisiológicas directas.',
      },
      {
        pregunta: 'Buscas en esta lección la relación compresión-ventilación y no aparece. ¿Por qué?',
        opciones: [
          'Porque no existe.',
          'Porque la fija la guía vigente y el protocolo, y el temario la desarrolla en las lecciones de reanimación de los Módulos 1 y 3; repetirla aquí crearía una versión distinta de la misma pauta.',
          'Porque no se aplica en pediatría.',
          'Porque depende del peso exacto del paciente.',
        ],
        correcta: 1,
        explicacion: 'Evitar dos versiones de la misma cifra en el temario es un control editorial explícito.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena los pasos iniciales de la atención al recién nacido',
        pasos: [
          'Secar, retirar los paños húmedos y mantener el calor',
          'Colocar la cabeza en posición neutra',
          'Despejar la vía aérea solo si hay obstrucción evidente',
          'Estimular con suavidad frotando la espalda o las plantas',
          'Valorar la respiración y la frecuencia cardiaca',
          'Iniciar ventilación con presión positiva si no respira o la frecuencia es insuficiente',
        ],
      },
      completar: [
        {
          texto: 'En el recién nacido, la mayoría de los fracasos de la reanimación son fracasos de la ___.',
          opciones: ['medicación', 'ventilación', 'desfibrilación'],
          correcta: 1,
          explicacion: 'Por eso es lo primero que se revisa cuando el paciente no mejora.',
        },
      ],
    },
    revision: ficha({
      fuentes: [
        'AHA/AAP 2025 Neonatal Resuscitation.',
        'AHA/AAP 2025 Pediatric Basic Life Support.',
        'AHA 2025 Pediatric Advanced Life Support.',
        'NALS: referencia del plan NO identificada y no citada.',
        'Protocolo local (pendiente de entrega).',
      ],
      extra: [
        'La lección no publica parámetros numéricos de reanimación para no generar una segunda versión de las cifras que ya desarrollan los Módulos 1 y 3.',
        'DECISIÓN PENDIENTE: la academia debe identificar la referencia «NALS» o retirarla de la bibliografía del plan.',
      ],
    }),
  },

  'm6-svp-ovace': {
    icono: 'ic-nino',
    duracion: '15 min',
    resumen: 'La obstrucción de la vía aérea por cuerpo extraño es una de las pocas urgencias en que '
      + 'una maniobra inmediata puede resolverlo todo. El algoritmo pediátrico distingue tres '
      + 'situaciones: el lactante, el niño que sigue respondiendo y el paciente que pierde la '
      + 'respuesta. La diferencia más importante es que al lactante no se le aplican compresiones '
      + 'abdominales, y la regla que gobierna todo el tema es no intervenir mientras la obstrucción '
      + 'sea leve y el paciente tosa con eficacia.',
    objetivos: [
      'Distinguir la obstrucción leve de la grave y actuar en consecuencia.',
      'Aplicar la secuencia correcta en el lactante y en el niño que responden.',
      'Reconocer el paso a la pérdida de respuesta y su conducta.',
    ],
    secciones: [
      {
        titulo: 'Primero: leve o grave',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Obstrucción leve', 'Obstrucción grave'],
            filas: [
              ['Tos', 'Eficaz, fuerte y ruidosa', 'Débil, silenciosa o ausente'],
              ['Voz o llanto', 'Puede hablar o llorar', 'No puede emitir sonido'],
              ['Respiración', 'Entra aire, aunque con dificultad', 'No entra aire o entra con estridor'],
              ['Conducta', 'NO intervenir: animar a toser y vigilar de cerca', 'Intervenir de inmediato con las maniobras'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La regla que evita hacer daño', texto: 'Mientras el paciente tosa con eficacia, la tos es más efectiva que cualquier maniobra: no se golpea la espalda, no se comprime y no se intenta extraer nada a ciegas. Intervenir sobre una obstrucción leve puede desplazar el cuerpo extraño y convertirla en grave. Se anima a toser, se vigila sin apartarse y se está preparado para actuar si el cuadro empeora.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Nunca a ciegas', texto: 'No se introduce el dedo en la boca para buscar el objeto. Solo se retira lo que se ve con claridad y se puede extraer con seguridad. El barrido a ciegas puede empujar el cuerpo extraño más adentro y transformar una obstrucción parcial en completa.' },
        ],
      },
      {
        titulo: 'Las tres situaciones del algoritmo',
        bloques: [
          {
            tipo: 'pasos',
            titulo: '1. Lactante que responde, con obstrucción grave',
            items: [
              'Sostener al lactante con la cabeza más baja que el tronco, apoyando la cabeza y la mandíbula sin comprimir los tejidos blandos del cuello.',
              'Aplicar una serie de GOLPES DORSALES entre los omóplatos, con el talón de la mano.',
              'Girarlo con cuidado, manteniendo el apoyo de la cabeza, y aplicar una serie de COMPRESIONES TORÁCICAS en el mismo punto que las compresiones de la reanimación.',
              'Alternar ambas series y comprobar la boca entre ciclos, retirando solo lo que se vea con claridad.',
              'Continuar hasta que el objeto salga o el lactante deje de responder.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Al lactante NO se le aplican compresiones abdominales', texto: 'Es la diferencia más importante del tema. Su hígado y su bazo están menos cubiertos por la parrilla costal y quedan expuestos: las compresiones abdominales pueden lesionarlos. En el lactante se combinan golpes dorsales y compresiones torácicas, nunca abdominales.' },
          {
            tipo: 'pasos',
            titulo: '2. Niño que responde, con obstrucción grave',
            items: [
              'Colocarse detrás o al lado del niño, adaptando la postura a su altura.',
              'Aplicar una serie de GOLPES DORSALES entre los omóplatos.',
              'Aplicar una serie de COMPRESIONES ABDOMINALES.',
              'Alternar ambas series y comprobar la boca entre ciclos, retirando solo lo que se vea.',
              'Continuar hasta que el objeto salga o el niño deje de responder.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: '3. Pérdida de respuesta',
            items: [
              'Pedir ayuda y activar el sistema de emergencias si no se ha hecho ya.',
              'Colocar al paciente sobre una superficie firme.',
              'Iniciar la secuencia de reanimación conforme a la guía vigente y al protocolo.',
              'Cada vez que se abra la vía aérea para ventilar, mirar la boca y retirar el objeto solo si se ve.',
              'Comprobar que el tórax se eleva; si no lo hace, recolocar la cabeza y volver a intentarlo.',
              'Continuar hasta la resolución o hasta el relevo por un equipo con mayor alcance.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Después de resolverla', texto: 'Todo paciente que ha sufrido una obstrucción grave debe ser valorado, aunque parezca recuperado por completo: puede quedar material residual en la vía aérea o haberse producido una lesión durante las maniobras. Si se aplicaron compresiones abdominales, se comunica de forma explícita en la entrega.' },
        ],
      },
      F([AHA_PBLS_2025, AHA_PALS_2025, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Obstrucción leve', definicion: 'Aquella en que el paciente tose con eficacia y puede emitir sonido; no se interviene con maniobras.' },
      { termino: 'Obstrucción grave', definicion: 'Aquella en que la tos es débil o ausente y el paciente no puede emitir sonido ni ventilar adecuadamente.' },
      { termino: 'Golpes dorsales', definicion: 'Impactos con el talón de la mano entre los omóplatos, primera serie de maniobras tanto en el lactante como en el niño.' },
      { termino: 'Compresiones torácicas en el lactante', definicion: 'Maniobra que sustituye a las compresiones abdominales en el lactante con obstrucción grave.' },
      { termino: 'Barrido a ciegas', definicion: 'Búsqueda del cuerpo extraño con el dedo sin verlo; está proscrita porque puede empujarlo más adentro.' },
    ],
    flashcards: [
      { frente: '¿Qué se hace ante una obstrucción leve?', reverso: 'No intervenir: animar a toser y vigilar de cerca, porque la tos es más eficaz que cualquier maniobra.' },
      { frente: '¿Qué maniobras se combinan en el lactante?', reverso: 'Golpes dorsales y compresiones torácicas.' },
      { frente: '¿Por qué no se aplican compresiones abdominales al lactante?', reverso: 'Porque su hígado y su bazo están menos cubiertos por la parrilla costal y pueden lesionarse.' },
      { frente: '¿Qué maniobras se combinan en el niño?', reverso: 'Golpes dorsales y compresiones abdominales.' },
      { frente: '¿Se busca el objeto con el dedo?', reverso: 'Nunca a ciegas: solo se retira lo que se ve con claridad y puede extraerse con seguridad.' },
      { frente: '¿Qué se hace si el paciente deja de responder?', reverso: 'Activar el sistema, iniciar la secuencia de reanimación y mirar la boca cada vez que se abra la vía aérea.' },
    ],
    quiz: [
      {
        pregunta: 'Niño de 5 años que se atraganta comiendo, tose con fuerza y puede hablar. ¿Qué haces?',
        opciones: [
          'Golpes dorsales de inmediato.',
          'No intervenir con maniobras: animarle a toser y vigilar de cerca, preparado para actuar si empeora.',
          'Compresiones abdominales.',
          'Barrido digital de la boca.',
        ],
        correcta: 1,
        explicacion: 'Con tos eficaz, intervenir puede desplazar el cuerpo extraño y convertir la obstrucción en grave.',
      },
      {
        pregunta: 'Lactante de 8 meses con obstrucción grave: no emite sonido y la tos es inaudible. ¿Qué maniobras aplicas?',
        opciones: [
          'Golpes dorsales y compresiones abdominales.',
          'Golpes dorsales y compresiones torácicas, alternando series y comprobando la boca entre ciclos.',
          'Solo compresiones abdominales.',
          'Barrido digital y después ventilación.',
        ],
        correcta: 1,
        explicacion: 'Al lactante no se le aplican compresiones abdominales por el riesgo de lesión hepática y esplénica.',
      },
      {
        pregunta: 'Durante las maniobras, el niño deja de responder. ¿Qué corresponde?',
        opciones: [
          'Continuar con golpes dorsales de pie.',
          'Colocarlo sobre una superficie firme, activar el sistema, iniciar la secuencia de reanimación y mirar la boca cada vez que se abra la vía aérea.',
          'Realizar un barrido digital a ciegas.',
          'Esperar a que recupere la respuesta.',
        ],
        correcta: 1,
        explicacion: 'La pérdida de respuesta es la tercera situación del algoritmo y cambia por completo la conducta.',
      },
      {
        pregunta: 'Has resuelto la obstrucción y el niño parece recuperado. ¿Qué corresponde?',
        opciones: [
          'Alta en el lugar: el objeto ha salido.',
          'Valoración de todo paciente que ha sufrido una obstrucción grave, y comunicar de forma explícita si se aplicaron compresiones abdominales.',
          'Observación domiciliaria sin valoración.',
          'Repetir las maniobras de forma preventiva.',
        ],
        correcta: 1,
        explicacion: 'Puede quedar material residual o haberse producido lesión durante las maniobras.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Mientras el paciente tosa con eficacia, la ___ es más efectiva que cualquier maniobra.',
          opciones: ['ventilación', 'tos', 'compresión'],
          correcta: 1,
          explicacion: 'Intervenir sobre una obstrucción leve puede convertirla en grave.',
        },
        {
          texto: 'En el lactante, las compresiones abdominales se sustituyen por compresiones ___.',
          opciones: ['torácicas', 'pélvicas', 'cervicales'],
          correcta: 0,
          explicacion: 'Se aplican en el mismo punto que las compresiones de la reanimación.',
        },
        {
          texto: 'El objeto solo se retira si ___; el barrido a ciegas está proscrito.',
          opciones: ['el paciente lo pide', 'se ve con claridad', 'ha pasado un minuto'],
          correcta: 1,
          explicacion: 'Buscar sin ver puede empujarlo más adentro y completar la obstrucción.',
        },
      ],
    },
    revision: ficha({
      fuentes: [
        'AHA/AAP 2025 Pediatric Basic Life Support (guía pediátrica rectora de este tema).',
        'AHA 2025 Pediatric Advanced Life Support.',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'Protocolo local (pendiente de entrega).',
      ],
      extra: [
        'CONTROL APLICADO: la lección se respalda con la guía PEDIÁTRICA y distingue expresamente las tres situaciones del algoritmo —lactante, niño y pérdida de respuesta—, y declara que al lactante no se le aplican compresiones abdominales.',
        'No se publica el número de golpes ni de compresiones por serie: lo fija la guía vigente y el protocolo, y el temario lo desarrolla en las lecciones de OVACE del Módulo 1.',
      ],
    }),
  },
}
