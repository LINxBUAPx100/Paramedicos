// ============================================================
//  MÓDULO 5 — Unidad «CINEMÁTICA DEL TRAUMA» (lote A)
// ------------------------------------------------------------
//  Los 11 temas de la unidad, en el orden del PDF. Pauta editorial:
//  `docs/archivo/GUIA-REDACCION-M5-LOTE-A.md`.
//
//  IDEA QUE RECORRE LA UNIDAD ENTERA, y que la auditoría exige no perder:
//  el mecanismo AUMENTA O REDUCE LA SOSPECHA y orienta el triaje y el destino.
//  Nunca diagnostica una lesión. Ninguna lección de este archivo dice que un
//  mecanismo «produce» o «significa» una lesión concreta; dice qué hay que
//  buscar y por qué. La distinción no es retórica: convertir mecanismo en
//  diagnóstico es exactamente el error que ACS 2021 pide evitar al usar los
//  criterios de triaje de campo.
//
//  Fuentes asignadas por el registro para `m5-cinematica-trauma`:
//  PHTLS 9.ª ed. como base curricular histórica (cap. 4, pp. 99–144) y
//  ACS Field Triage 2021 / ACS Best Practices como actualización. La copia de
//  PHTLS 10 de la biblioteca declara traducción automática: NO se consulta,
//  no se cita y no fija terminología.
//
//  Sin cifras de umbral, dosis, calibres ni distancias: esta unidad enseña a
//  leer la transferencia de energía, no a medirla en la calle.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

import {
  erroresFrecuentes, repasoRapido, preguntasOrales, mnemotecnia, masPreguntado,
} from './moldeV2.js'

const HOY = '2026-08-17'

const PHTLS_CIN = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), '
    + 'cap. 4, «La cinemática del trauma», pp. 99–144.',
  nota: 'Base curricular histórica declarada por el plan de estudios. El intervalo de páginas '
    + 'corresponde al capítulo verificado en la copia licenciada de la academia; la página exacta de '
    + 'cada afirmación concreta queda PENDIENTE de confirmación docente. No se cita la 10.ª edición: '
    + 'la copia disponible declara traducción automática y no es citable.',
}
const ACS_TRIAJE = {
  nombre: 'American College of Surgeons. National Guideline for the Field Triage of Injured Patients, '
    + 'revisión 2021.',
  url: 'https://www.facs.org/quality-programs/trauma/systems/field-triage-guidelines/',
  nota: 'Actualización rectora del uso del mecanismo: sirve para ESTIMAR RIESGO y decidir destino, '
    + 'nunca para diagnosticar una lesión concreta. PENDIENTE: apartado exacto del documento.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Colección de guías de buenas prácticas del ACS usada como contraste actual del capítulo '
    + 'histórico. PENDIENTE: guía y apartado exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS. Aporta el marco ABCDE y la evaluación inicial del traumatizado. '
    + 'PENDIENTE: módulo y página exactos.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const MECANISMO = 'LÍMITE DE LA UNIDAD: el mecanismo estima riesgo y orienta el triaje y el destino '
  + '(ACS 2021); no diagnostica una lesión concreta. Ninguna lección lo presenta como equivalente de '
  + 'una lesión ni sustituye la exploración y la valoración fisiológica.'
const SIN_CIFRAS = 'No se publican umbrales de velocidad, altura, calibre ni distancia como frontera '
  + 'entre trauma leve y grave: los criterios operativos los fija el protocolo del servicio sobre la '
  + 'guía de triaje vigente.'

const ficha = ({ estado = 'borrador', version, extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: version,
  observaciones: [
    'Redactado desde cero en el lote A del Módulo 5; el tema estaba vacío.',
    MECANISMO,
    SIN_CIFRAS,
    ...extra,
  ],
  fuentes,
})

const VERSION = 'PHTLS 9.ª ed. (2020), cap. 4; ACS Field Triage 2021; ACS Best Practices'
const FUENTES_FICHA = [
  'NAEMT. PHTLS, 9.ª ed., 2020, cap. 4, pp. 99–144.',
  'ACS. Guidelines for the Field Triage of Injured Patients, 2021.',
  'ACS. Trauma Quality Programs, Best Practices Guidelines.',
]

export default {
  // ============================================================
  //  1. Definición de trauma y cinemática
  // ============================================================
  'm5-cin-definicion': {
    icono: 'cp-servier-corredor',
    duracion: '14 min',
    resumen: 'El trauma es una transferencia de energía capaz de lesionar tejidos, y la cinemática es la '
      + 'lectura razonada de cómo ocurrió esa transferencia. Esta lección organiza esa lectura en tres '
      + 'momentos —preevento, evento y posevento— y fija el límite que gobierna toda la unidad: la '
      + 'cinemática sirve para saber qué buscar y con qué prioridad, no para declarar qué se rompió. '
      + 'Mecanismo, fisiología, anatomía y exploración se integran; ninguno de los cuatro sustituye a '
      + 'los demás.',
    objetivos: [
      'Definir el trauma como transferencia de energía y la cinemática como su reconstrucción razonada.',
      'Organizar la información del incidente en preevento, evento y posevento.',
      'Integrar mecanismo, fisiología, anatomía y exploración sin sustituir unos por otros.',
    ],
    secciones: [
      {
        titulo: 'Qué es el trauma y qué es la cinemática',
        bloques: [
          { tipo: 'p', texto: 'La energía no se crea ni se destruye: cambia de forma y se transfiere. Cuando un cuerpo en movimiento se detiene, esa energía tiene que ir a alguna parte, y una parte de ella pasa a los tejidos. Trauma es exactamente eso: la lesión producida por una transferencia de energía que supera lo que el tejido tolera.' },
          { tipo: 'p', texto: 'La **cinemática** es la reconstrucción razonada de cómo se transfirió esa energía. No es adivinar. Es observar la escena, entender qué se movía, contra qué se detuvo y en cuánto tiempo, y traducir esa observación en una lista de lesiones que conviene buscar.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La frase que gobierna toda la unidad', texto: 'El mecanismo AUMENTA O REDUCE la sospecha y ayuda a decidir a dónde se traslada al paciente. No diagnostica. Un mecanismo aparatoso con exploración normal no autoriza a declarar una lesión, y un mecanismo modesto con fisiología alterada no autoriza a descartarla.' },
        ],
      },
      {
        titulo: 'Los tres momentos que hay que leer',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Preevento, evento y posevento',
            headers: ['Momento', 'Qué se pregunta', 'Para qué sirve'],
            filas: [
              ['Preevento', 'Quién era el paciente antes: edad, enfermedades, medicación, consumo de alcohol o drogas, uso de sistemas de retención', 'Explica por qué dos personas en el mismo choque no resultan igual'],
              ['Evento', 'Qué se movía, a qué velocidad aproximada, contra qué se detuvo, en cuánto espacio, qué se deformó', 'Orienta qué regiones y qué órganos conviene explorar primero'],
              ['Posevento', 'Qué ocurrió desde el impacto hasta tu llegada: tiempo transcurrido, atrapamiento, movilización, temperatura ambiente, otros pacientes', 'Explica el estado actual y condiciona el tiempo disponible'],
            ],
          },
          { tipo: 'p', texto: 'Buena parte de esta información solo existe mientras el equipo está en la escena. La posición del vehículo, la deformidad del habitáculo, el cinturón sin abrochar o el casco a diez metros desaparecen del relato en cuanto la ambulancia se va. Recogerla y comunicarla es una aportación que nadie más puede hacer.' },
        ],
      },
      {
        titulo: 'Cuatro fuentes de información, ninguna suficiente sola',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que se integra',
            items: [
              'Mecanismo: qué energía se transfirió y por dónde.',
              'Fisiología: qué está haciendo ahora el paciente —conciencia, respiración, circulación—.',
              'Anatomía: qué región está comprometida y qué hay debajo de ella.',
              'Exploración y su repetición: qué se encuentra, y cómo cambia con el tiempo.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El error clásico en las dos direcciones', texto: 'Un equipo puede quedarse tranquilo porque «el coche apenas está abollado» en un paciente que se está deteriorando, o declarar lesiones que no existen porque «el impacto fue tremendo». Las dos son fallas del mismo tipo: usar el mecanismo como si fuera un diagnóstico en lugar de como una hipótesis que la exploración confirma o descarta.' },
          { tipo: 'p', texto: 'Cuando el mecanismo y la fisiología no coinciden, la fisiología manda para tratar y el mecanismo manda para seguir buscando. Ni uno anula al otro.' },
          mnemotecnia('ANTES, DURANTE Y DESPUÉS. Preevento: quién era el paciente. Evento: qué se movía y contra qué se detuvo. Posevento: qué pasó desde el impacto hasta tu llegada. Si falta uno de los tres, el relato de la escena está incompleto y nadie más va a poder completarlo.'),
          masPreguntado('Lo más preguntado no es la definición de trauma: es el límite. El mecanismo aumenta o reduce la sospecha y ayuda a decidir el destino, pero no diagnostica. Y cuando mecanismo y fisiología no coinciden, la fisiología manda para tratar y el mecanismo manda para seguir buscando.'),
        ],
      },
      erroresFrecuentes([
        ['Tranquilizarse porque el vehículo apenas está abollado', 'Es usar el mecanismo como diagnóstico, solo en la dirección cómoda. Un mecanismo modesto con fisiología alterada no autoriza a descartar nada: la exploración repetida es la que sostiene cualquier afirmación.'],
        ['Declarar lesiones porque el impacto fue tremendo', 'Es la misma falla en la otra dirección. El mecanismo formula una hipótesis; la exploración la confirma o la descarta. Un mecanismo aparatoso con exploración normal no autoriza a declarar una lesión.'],
        ['Dejar la información de la escena en la escena', 'La posición del vehículo, la deformidad del habitáculo o el cinturón sin abrochar desaparecen del relato en cuanto la ambulancia se va. Recogerla y comunicarla es una aportación que nadie más puede hacer.'],
        ['Quedarse solo con el mecanismo', 'Son cuatro fuentes y ninguna basta sola: mecanismo, fisiología, anatomía y exploración repetida. Sustituir unas por otras es de donde salen los dos errores anteriores.'],
      ]),
      repasoRapido([
        'La energía no se crea ni se destruye: cambia de forma y se transfiere.',
        'Trauma es la lesión producida por una transferencia de energía que supera lo que el tejido tolera.',
        'Cinemática es la reconstrucción razonada de cómo se transfirió esa energía; no es adivinar.',
        'La frase que gobierna la unidad: el mecanismo aumenta o reduce la sospecha y orienta el destino, no diagnostica.',
        'Preevento: edad, enfermedades, medicación, consumo y sistemas de retención. Explica por qué dos personas del mismo choque no resultan igual.',
        'Evento: qué se movía, a qué velocidad aproximada, contra qué se detuvo, en cuánto espacio y qué se deformó.',
        'Posevento: tiempo transcurrido, atrapamiento, movilización, temperatura ambiente y otros pacientes.',
        'Buena parte de esa información solo existe mientras el equipo está en la escena.',
        'Las cuatro fuentes que se integran: mecanismo, fisiología, anatomía y exploración con su repetición.',
        'El error clásico va en las dos direcciones: confiarse por un vehículo poco dañado o inventar lesiones por un impacto aparatoso.',
        'Cuando mecanismo y fisiología no coinciden: la fisiología manda para tratar, el mecanismo para seguir buscando.',
      ]),
      preguntasOrales([
        'Define trauma en términos de transferencia de energía.',
        '¿Qué es la cinemática y para qué sirve exactamente?',
        'Enumera los tres momentos que hay que leer y qué se pregunta en cada uno.',
        '¿Por qué el preevento explica que dos ocupantes del mismo choque no resulten igual?',
        '¿Qué información de la escena desaparece si el equipo no la recoge?',
        'Nombra las cuatro fuentes de información que se integran.',
        'Describe el error clásico del mecanismo en sus dos direcciones.',
        'Mecanismo aparatoso y exploración normal. ¿Qué puedes afirmar y qué no?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Trauma', definicion: 'Lesión de los tejidos producida por una transferencia de energía que supera la tolerancia del tejido.' },
      { termino: 'Cinemática del trauma', definicion: 'Reconstrucción razonada de cómo se transfirió la energía en un incidente, para orientar qué lesiones buscar y con qué prioridad.' },
      { termino: 'Preevento', definicion: 'Condiciones del paciente y del entorno antes del incidente: edad, enfermedades, medicación, consumo y sistemas de retención.' },
      { termino: 'Posevento', definicion: 'Todo lo ocurrido entre el impacto y la llegada del equipo: tiempo, atrapamiento, movilización y condiciones ambientales.' },
    ],
    flashcards: [
      { frente: '¿Qué es el trauma en términos de energía?', reverso: 'La lesión producida por una transferencia de energía que supera lo que el tejido tolera.' },
      { frente: '¿Para qué sirve la cinemática y para qué NO sirve?', reverso: 'Sirve para estimar riesgo, orientar la búsqueda y decidir destino; no sirve para diagnosticar una lesión concreta.' },
      { frente: 'Los tres momentos de la lectura del incidente', reverso: 'Preevento, evento y posevento.' },
      { frente: '¿Por qué el preevento explica desenlaces distintos en el mismo choque?', reverso: 'Porque edad, enfermedades, medicación, consumo y uso de retención cambian la tolerancia de cada paciente.' },
      { frente: 'Mecanismo aparatoso con exploración normal: ¿qué se concluye?', reverso: 'Que hay que seguir buscando y reevaluando, no que exista una lesión declarada.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente sale caminando de una colisión con intrusión importante en su costado. ¿Qué papel juega el mecanismo?',
        opciones: [
          'Diagnostica lesión torácica y abdominal.',
          'Eleva la sospecha y puede influir en el destino, pero no declara ninguna lesión.',
          'Se descarta, porque el paciente camina.',
          'Sustituye a la exploración física.',
        ],
        correcta: 1,
        explicacion: 'El mecanismo estima riesgo y orienta el triaje; la exploración repetida es la que confirma o descarta.',
      },
      {
        pregunta: '¿Qué información de la lista pertenece al PREEVENTO?',
        opciones: [
          'La deformidad del volante.',
          'Que el paciente toma un anticoagulante y no llevaba cinturón.',
          'El tiempo de atrapamiento.',
          'La temperatura ambiente durante la extracción.',
        ],
        correcta: 1,
        explicacion: 'El preevento describe cómo llegaba el paciente al incidente: enfermedades, medicación, consumo y uso de sistemas de retención.',
      },
      {
        pregunta: 'La fisiología del paciente y el mecanismo apuntan en direcciones contrarias. ¿Cómo se resuelve?',
        opciones: [
          'Gana siempre el mecanismo.',
          'Gana siempre la fisiología y el mecanismo se descarta.',
          'La fisiología manda para tratar; el mecanismo manda para seguir buscando y reevaluando.',
          'Se espera a la imagen hospitalaria antes de decidir nada.',
        ],
        correcta: 2,
        explicacion: 'No se anulan entre sí: uno dirige la conducta inmediata y el otro mantiene abierta la búsqueda.',
      },
      {
        pregunta: '¿Por qué se insiste en documentar la escena antes de retirarse?',
        opciones: [
          'Por requisito administrativo.',
          'Porque esa información desaparece: nadie más volverá a ver la posición del vehículo, la intrusión o el cinturón sin abrochar.',
          'Porque sustituye la exploración hospitalaria.',
          'Porque permite calcular la energía exacta del impacto.',
        ],
        correcta: 1,
        explicacion: 'Es una aportación que solo puede hacer el primer equipo que llega.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Que el paciente estuviera atrapado cuarenta minutos y fuera movilizado por terceros antes de tu llegada es información del ___.',
          opciones: ['preevento', 'evento', 'posevento'],
          correcta: 2,
          explicacion: 'El posevento abarca todo lo ocurrido entre el impacto y la llegada del equipo, y condiciona tanto el estado actual como el tiempo disponible.',
        },
        {
          texto: 'Que el habitáculo se deformara hacia el asiento del conductor es información del ___.',
          opciones: ['preevento', 'evento', 'posevento'],
          correcta: 1,
          explicacion: 'El evento describe qué se movía, contra qué se detuvo y qué se deformó.',
        },
        {
          texto: 'Frente a un mecanismo llamativo y una exploración normal, la conducta correcta es ___.',
          opciones: [
            'declarar las lesiones probables en el informe',
            'mantener la sospecha, reevaluar y decidir el destino con criterios de triaje',
            'dar de alta en el lugar por exploración normal',
          ],
          correcta: 1,
          explicacion: 'El mecanismo sostiene la vigilancia y la decisión de destino; no sostiene un diagnóstico.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['Define el marco que las diez lecciones siguientes aplican; cualquier cambio aquí obliga a revisar toda la unidad.'],
    }),
  },

  // ============================================================
  //  2. Energía cinética
  // ============================================================
  'm5-cin-energia-cinetica': {
    icono: 'cp-servier-ciclista',
    duracion: '14 min',
    resumen: 'La energía cinética de un cuerpo en movimiento depende de su masa y del cuadrado de su '
      + 'velocidad. De ahí sale la observación más útil de la unidad: duplicar la velocidad multiplica '
      + 'por cuatro la energía disponible, mientras que duplicar la masa solo la duplica. La lección '
      + 'explica además por qué el daño no depende solo de cuánta energía había, sino de en cuánto '
      + 'tiempo y sobre cuánta superficie se disipó. La fórmula sirve para comprender relaciones, no '
      + 'para calcular gravedad en la calle.',
    objetivos: [
      'Explicar la relación entre masa, velocidad y energía cinética.',
      'Justificar por qué la velocidad pesa más que la masa en la transferencia de energía.',
      'Relacionar tiempo de detención y superficie de impacto con la lesión resultante.',
    ],
    secciones: [
      {
        titulo: 'La relación: Ec = ½ m v²',
        bloques: [
          { tipo: 'formula', texto: 'Ec = ½ · m · v²', nota: 'Ec es la energía cinética, m la masa del cuerpo en movimiento y v su velocidad. La velocidad está elevada al cuadrado; la masa no.' },
          { tipo: 'p', texto: 'La consecuencia práctica está en el exponente. Si la masa se duplica y todo lo demás se mantiene, la energía se duplica. Si lo que se duplica es la velocidad, la energía se multiplica por cuatro. Por eso, entre dos incidentes comparables, el aumento de velocidad pesa mucho más que el aumento de peso.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Para qué NO sirve la fórmula', texto: 'No se calcula en la escena. Nadie conoce la velocidad real ni la masa exacta, y aunque las conociera, el número resultante no dice qué órgano se lesionó. La fórmula se enseña para entender una relación, no para producir una cifra ni para clasificar a un paciente.' },
        ],
      },
      {
        titulo: 'Lo que decide cuánto daño hace esa energía',
        bloques: [
          { tipo: 'p', texto: 'Que exista mucha energía no basta: importa cómo se disipa. Dos variables lo gobiernan, y las dos son observables en la escena.' },
          {
            tipo: 'lista',
            titulo: 'Tiempo y distancia de detención',
            items: [
              'Cuanto más larga es la detención —en tiempo y en distancia—, menor es la fuerza que soporta el cuerpo en cada instante.',
              'Los sistemas de retención, las zonas de deformación programada del vehículo y las superficies que ceden alargan esa detención.',
              'Detenerse contra algo rígido e indeformable concentra la misma energía en mucho menos tiempo.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Superficie de impacto',
            items: [
              'La misma energía repartida en una superficie amplia produce menos daño por unidad de tejido.',
              'Concentrada en un punto —un objeto saliente, un borde, un poste—, atraviesa o desgarra en vez de contundir.',
              'Por eso interesa observar contra qué se detuvo el paciente, no solo a qué velocidad iba.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que se anota, entonces', texto: 'Velocidad aproximada referida, tipo de impacto, qué se deformó, uso de cinturón y bolsa de aire, y contra qué superficie se detuvo el cuerpo. Ese conjunto explica la transferencia de energía mejor que cualquier estimación numérica improvisada.' },
          mnemotecnia('LA VELOCIDAD VA AL CUADRADO, LA MASA NO. Duplicar la masa duplica la energía; duplicar la velocidad la multiplica por cuatro. Y lo que decide el daño no es cuánta energía había, sino en cuánto tiempo y sobre cuánta superficie se disipó.'),
          masPreguntado('Se pregunta la relación, no la cuenta: por qué la velocidad pesa más que la masa, y por qué la fórmula NO se calcula en la escena. Nadie conoce la velocidad real ni la masa exacta, y el número resultante no dice qué órgano se lesionó.'),
        ],
      },
      erroresFrecuentes([
        ['Calcular la energía cinética en la escena', 'No se conoce la velocidad real ni la masa exacta, y aunque se conocieran, la cifra no dice qué órgano se lesionó. La fórmula se enseña para entender una relación, no para producir un número ni para clasificar a un paciente.'],
        ['Pesar la masa igual que la velocidad', 'La velocidad está al cuadrado y la masa no. Entre dos incidentes comparables, el aumento de velocidad pesa mucho más que el aumento de peso.'],
        ['Mirar solo cuánta energía había', 'Importa cómo se disipó. Una detención larga en tiempo y distancia reduce la fuerza soportada en cada instante; una detención contra algo rígido e indeformable concentra la misma energía en mucho menos tiempo.'],
        ['Olvidar contra qué se detuvo el cuerpo', 'La misma energía repartida en una superficie amplia contunde; concentrada en un punto —un objeto saliente, un borde, un poste— atraviesa o desgarra. Por eso interesa la superficie de impacto y no solo la velocidad.'],
      ]),
      repasoRapido([
        'La energía cinética depende de la masa y del cuadrado de la velocidad.',
        'Duplicar la masa duplica la energía; duplicar la velocidad la multiplica por cuatro.',
        'La fórmula no se calcula en la escena: sirve para comprender una relación, no para producir una cifra.',
        'Que exista mucha energía no basta: importa cómo se disipa.',
        'Cuanto más larga es la detención, en tiempo y en distancia, menor es la fuerza que soporta el cuerpo en cada instante.',
        'Los sistemas de retención, las zonas de deformación programada y las superficies que ceden alargan la detención.',
        'Detenerse contra algo rígido e indeformable concentra la energía en mucho menos tiempo.',
        'La misma energía en superficie amplia produce menos daño por unidad de tejido.',
        'Concentrada en un punto, atraviesa o desgarra en vez de contundir.',
        'Lo que se anota: velocidad aproximada referida, tipo de impacto, qué se deformó, uso de cinturón y bolsa de aire, y contra qué se detuvo el cuerpo.',
        'Ese conjunto explica la transferencia mejor que cualquier estimación numérica improvisada.',
      ]),
      preguntasOrales([
        'Explica la relación entre masa, velocidad y energía cinética.',
        '¿Por qué la velocidad pesa más que la masa?',
        '¿Para qué NO sirve la fórmula, y por qué?',
        '¿Qué dos variables deciden cuánto daño hace la energía disponible?',
        '¿Qué efecto tiene alargar la detención, y qué elementos la alargan?',
        'Diferencia el daño de una energía repartida del de una energía concentrada.',
        'Enumera lo que se documenta de un impacto para explicar la transferencia de energía.',
        'Dos vehículos con la misma deformidad, uno contra un muro y otro contra unos arbustos. ¿Qué esperas y por qué?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE]),
    ],
    conceptosClave: [
      { termino: 'Energía cinética', definicion: 'Energía asociada a un cuerpo en movimiento; depende de la masa y del cuadrado de la velocidad.' },
      { termino: 'Distancia de detención', definicion: 'Espacio y tiempo en que un cuerpo en movimiento pasa a estar en reposo; cuanto mayor es, menor es la fuerza instantánea.' },
      { termino: 'Superficie de impacto', definicion: 'Área sobre la que se reparte la energía transferida; a menor superficie, mayor concentración de daño.' },
      { termino: 'Sistema de retención', definicion: 'Dispositivo que sujeta al ocupante y alarga su detención dentro del vehículo, como el cinturón de seguridad.' },
    ],
    flashcards: [
      { frente: 'Fórmula de la energía cinética', reverso: 'Ec = ½ · m · v².' },
      { frente: 'Si la velocidad se duplica, ¿qué pasa con la energía?', reverso: 'Se multiplica por cuatro, porque la velocidad está elevada al cuadrado.' },
      { frente: 'Si la masa se duplica, ¿qué pasa con la energía?', reverso: 'Se duplica: la masa no está elevada al cuadrado.' },
      { frente: '¿Por qué una detención más larga lesiona menos?', reverso: 'Porque la misma energía se disipa en más tiempo, y la fuerza instantánea sobre el cuerpo es menor.' },
      { frente: '¿Se calcula la energía cinética en la escena?', reverso: 'No: la fórmula explica una relación, no produce una cifra útil para clasificar al paciente.' },
    ],
    quiz: [
      {
        pregunta: 'Entre un vehículo pesado a baja velocidad y uno ligero al doble de velocidad, ¿qué afirma la relación Ec = ½mv²?',
        opciones: [
          'La masa siempre domina el resultado.',
          'El aumento de velocidad pesa más, porque está elevada al cuadrado.',
          'Ambos transfieren exactamente la misma energía.',
          'La fórmula permite decidir cuál paciente está más grave.',
        ],
        correcta: 1,
        explicacion: 'Duplicar la velocidad cuadruplica la energía; duplicar la masa solo la duplica. Aun así, la fórmula no clasifica pacientes.',
      },
      {
        pregunta: '¿Por qué un cinturón de seguridad reduce la lesión del ocupante?',
        opciones: [
          'Porque reduce la masa del ocupante.',
          'Porque alarga el tiempo y la distancia de detención, con lo que baja la fuerza instantánea sobre el cuerpo.',
          'Porque impide toda transferencia de energía.',
          'Porque concentra la energía en una superficie menor.',
        ],
        correcta: 1,
        explicacion: 'La energía sigue existiendo; lo que cambia es cómo y en cuánto tiempo se disipa.',
      },
      {
        pregunta: 'Dos pacientes reciben una energía similar, uno contra una superficie amplia y otro contra un borde estrecho. ¿Qué diferencia espera encontrarse?',
        opciones: [
          'Ninguna: la energía es la misma.',
          'El del borde estrecho concentra la energía en menos superficie, con más riesgo de desgarro o penetración.',
          'El de la superficie amplia siempre está más grave.',
          'La superficie de impacto no influye.',
        ],
        correcta: 1,
        explicacion: 'La superficie sobre la que se reparte la energía cambia el tipo de daño que produce.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Si dos cuerpos tienen la misma masa y uno viaja al doble de velocidad, su energía cinética será ___ veces mayor.',
          opciones: ['dos', 'cuatro', 'ocho'],
          correcta: 1,
          explicacion: 'La velocidad está elevada al cuadrado: 2² = 4.',
        },
        {
          texto: 'Las zonas de deformación programada de un vehículo reducen la lesión porque ___ la detención del ocupante.',
          opciones: ['acortan', 'alargan', 'no modifican'],
          correcta: 1,
          explicacion: 'Al deformarse, el vehículo consume energía y extiende el tiempo y la distancia en que el ocupante se detiene.',
        },
        {
          texto: 'Ante una colisión, el dato que conviene registrar NO es una cifra de energía calculada, sino ___.',
          opciones: [
            'la marca y el modelo del vehículo',
            'velocidad aproximada, tipo de impacto, deformidades, uso de retención y superficie contra la que se detuvo el cuerpo',
            'el número de testigos presentes',
          ],
          correcta: 1,
          explicacion: 'Ese conjunto describe la transferencia de energía de forma reproducible; una cifra improvisada no.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La fórmula se presenta como relación conceptual; la lección declara expresamente que no se calcula en la escena ni predice un órgano lesionado.'],
    }),
  },

  // ============================================================
  //  3. Energía potencial
  // ============================================================
  'm5-cin-energia-potencial': {
    icono: 'cp-servier-corredor',
    duracion: '13 min',
    resumen: 'La energía potencial gravitatoria es la que un cuerpo acumula por su altura y que se '
      + 'convierte en cinética al caer. Esta lección relaciona altura, masa, superficie de recepción, '
      + 'región corporal del primer contacto y características del paciente, y explica por qué no '
      + 'existe una altura universal que separe el trauma leve del grave. Cuando se usan alturas como '
      + 'criterio, son criterios de TRIAJE atribuibles a la guía de campo, no fronteras diagnósticas.',
    objetivos: [
      'Explicar la energía potencial gravitatoria y su conversión en energía cinética.',
      'Relacionar altura, superficie de recepción y región del primer contacto con el patrón a buscar.',
      'Distinguir un criterio de triaje por altura de una frontera diagnóstica.',
    ],
    secciones: [
      {
        titulo: 'De la altura a la energía',
        bloques: [
          { tipo: 'formula', texto: 'Ep = m · g · h', nota: 'Ep es la energía potencial gravitatoria, m la masa, g la aceleración de la gravedad y h la altura respecto a la superficie de recepción.' },
          { tipo: 'p', texto: 'Mientras el cuerpo está en alto, la energía está almacenada. Al caer se convierte en energía cinética, y al llegar al suelo tiene que disiparse en el cuerpo, en la superficie o en ambos. La altura importa porque determina cuánta energía habrá que disipar.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La altura no es el único dato', texto: 'Dos caídas desde la misma altura pueden terminar de forma muy distinta según sobre qué se cae, cómo se cae y quién cae. La altura es el punto de partida de la lectura, no su conclusión.' },
        ],
      },
      {
        titulo: 'Qué modifica el resultado de una caída',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Variables que se observan y se documentan',
            items: [
              'Altura estimada y desde dónde: hay que decir la referencia, no solo un número.',
              'Superficie de recepción: hormigón, tierra, agua, vegetación, un objeto saliente. Una superficie que cede alarga la detención.',
              'Región corporal del primer contacto: pies, glúteos, costado, espalda, cabeza. Es lo que orienta la búsqueda inicial.',
              'Si hubo objetos interpuestos en la caída, que fraccionan la energía o la concentran.',
              'Características del paciente: edad, fragilidad ósea, enfermedades, medicación anticoagulante, consumo de alcohol o drogas.',
              'Por qué cayó: un desmayo, una convulsión o una arritmia previos cambian por completo la atención.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El primer contacto orienta, no dictamina', texto: 'Caer de pie transmite la carga a lo largo del eje del cuerpo, y por eso conviene explorar también la columna y la pelvis además de los pies y los tobillos. Caer sobre el costado o sobre la espalda dirige la atención a otras regiones. Todo esto acota dónde mirar primero; ninguna de esas trayectorias declara una fractura.' },
        ],
      },
      {
        titulo: 'Alturas y triaje: qué se puede afirmar',
        bloques: [
          { tipo: 'p', texto: 'Las guías de triaje de campo incluyen criterios de altura para decidir a qué centro se traslada a un paciente. Esos criterios existen para no infratriar y para ubicar recursos, y proceden de la guía correspondiente, no de una relación física exacta.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que esta lección no hace', texto: 'No enseña una altura concreta como frontera entre trauma leve y grave. Si tu servicio usa un umbral, procede de la guía de triaje que haya adoptado y del protocolo local; se cita con esa atribución y se aplica como criterio de destino, nunca como diagnóstico de una lesión.' },
          mnemotecnia('ALTURA, SUPERFICIE, PRIMER CONTACTO Y QUIÉN CAE. La altura dice cuánta energía habrá que disipar; la superficie, en cuánto tiempo; el primer contacto, dónde mirar; y el paciente, con qué reserva llega. Falta cualquiera de los cuatro y la lectura de la caída queda coja.'),
          masPreguntado('Dos cosas: que la altura es el punto de partida de la lectura y no su conclusión, y que un umbral de altura es un criterio de TRIAJE atribuible a la guía de campo, nunca una frontera diagnóstica entre trauma leve y grave.'),
        ],
      },
      erroresFrecuentes([
        ['Leer la caída solo por su altura', 'Dos caídas desde la misma altura terminan de forma muy distinta según sobre qué se cae, cómo se cae y quién cae. La altura es el punto de partida, no la conclusión.'],
        ['Convertir un umbral de altura en diagnóstico', 'Los criterios de altura existen para no infratriar y para ubicar recursos. Proceden de la guía de triaje adoptada y del protocolo local, se citan con esa atribución y se aplican como criterio de destino.'],
        ['Dar una altura sin su referencia', 'Decir un número sin decir desde dónde no es un dato. Se declara la altura estimada y la referencia con la que se estimó.'],
        ['No preguntar por qué cayó', 'Un desmayo, una convulsión o una arritmia previos cambian por completo la atención: el traumatismo pasa a ser la consecuencia y no el problema principal.'],
      ]),
      repasoRapido([
        'La energía potencial gravitatoria es la que un cuerpo acumula por su altura.',
        'Al caer se convierte en cinética y al llegar al suelo tiene que disiparse en el cuerpo, en la superficie o en ambos.',
        'La altura importa porque determina cuánta energía habrá que disipar.',
        'La altura no es el único dato: importa sobre qué se cae, cómo se cae y quién cae.',
        'Se documenta la altura estimada y desde dónde: hay que dar la referencia, no solo un número.',
        'La superficie de recepción modifica el resultado: una superficie que cede alarga la detención.',
        'La región del primer contacto —pies, glúteos, costado, espalda, cabeza— orienta la búsqueda inicial.',
        'Caer de pie transmite la carga a lo largo del eje: se explora también columna y pelvis, no solo pies y tobillos.',
        'Los objetos interpuestos en la caída fraccionan la energía o la concentran.',
        'Cuentan las características del paciente: edad, fragilidad ósea, enfermedades, anticoagulación y consumo.',
        'Hay que preguntar por qué cayó: un desmayo, una convulsión o una arritmia previos cambian la atención.',
        'Un umbral de altura es criterio de triaje y destino, atribuible a la guía de campo; nunca una frontera diagnóstica.',
      ]),
      preguntasOrales([
        'Explica la energía potencial gravitatoria y su conversión al caer.',
        '¿Por qué la altura no basta para leer una caída?',
        'Enumera las variables que modifican el resultado de una caída.',
        '¿Qué explora de más en un paciente que cayó de pie, y por qué?',
        '¿Por qué importa saber por qué cayó el paciente?',
        'Diferencia un criterio de triaje por altura de una frontera diagnóstica.',
        'Tu servicio usa un umbral de altura. ¿De dónde procede y cómo se aplica?',
        '¿Qué se documenta de la altura, además del número?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE]),
    ],
    conceptosClave: [
      { termino: 'Energía potencial gravitatoria', definicion: 'Energía almacenada por un cuerpo en función de su masa y de su altura; se convierte en cinética al caer.' },
      { termino: 'Superficie de recepción', definicion: 'Superficie sobre la que cae el cuerpo; su capacidad de ceder modifica el tiempo de detención y el daño resultante.' },
      { termino: 'Región de primer contacto', definicion: 'Parte del cuerpo que recibe primero la energía en una caída; orienta qué regiones explorar primero.' },
      { termino: 'Criterio de triaje', definicion: 'Regla operativa para decidir prioridad y destino del paciente; no equivale a un diagnóstico.' },
    ],
    flashcards: [
      { frente: 'Fórmula de la energía potencial gravitatoria', reverso: 'Ep = m · g · h.' },
      { frente: '¿En qué se convierte la energía potencial durante una caída?', reverso: 'En energía cinética, que debe disiparse en el cuerpo, en la superficie o en ambos.' },
      { frente: '¿Existe una altura universal que separe trauma leve de grave?', reverso: 'No. Hay criterios de triaje atribuibles a una guía, que sirven para decidir destino, no para diagnosticar.' },
      { frente: 'Caída de pie: ¿qué añade a la exploración?', reverso: 'Explorar también columna y pelvis, porque la carga se transmite por el eje del cuerpo.' },
      { frente: '¿Por qué se pregunta POR QUÉ cayó el paciente?', reverso: 'Porque un desmayo, una convulsión o una arritmia previos cambian la atención por completo.' },
    ],
    quiz: [
      {
        pregunta: 'Dos personas caen desde la misma altura, una sobre tierra blanda y otra sobre hormigón. ¿Qué explica la diferencia esperable?',
        opciones: [
          'La masa de cada una.',
          'La superficie de recepción: la que cede alarga la detención y reduce la fuerza instantánea.',
          'Nada: la altura determina el resultado.',
          'La hora del día.',
        ],
        correcta: 1,
        explicacion: 'La energía disponible es similar; lo que cambia es cómo se disipa.',
      },
      {
        pregunta: 'Persona mayor anticoagulada que cae desde su propia altura. ¿Cómo se interpreta?',
        opciones: [
          'Como mecanismo banal, por la escasa altura.',
          'Como caída de riesgo aumentado: fragilidad, medicación y comorbilidad modifican la tolerancia del paciente.',
          'Como lesión craneal confirmada.',
          'Como criterio automático de centro de trauma en cualquier servicio.',
        ],
        correcta: 1,
        explicacion: 'Las características del paciente forman parte del preevento y cambian el resultado de una misma energía. Aun así, no se declara una lesión.',
      },
      {
        pregunta: 'Tu servicio usa una altura determinada como criterio de traslado a centro de trauma. ¿Cómo se enuncia correctamente?',
        opciones: [
          'Como una ley física que separa trauma leve de grave.',
          'Como criterio de triaje procedente de la guía adoptada y del protocolo local, para decidir destino.',
          'Como diagnóstico de lesión medular.',
          'Como dato que sustituye la exploración.',
        ],
        correcta: 1,
        explicacion: 'Los umbrales de altura son reglas operativas de triaje con una fuente atribuible, no fronteras diagnósticas.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Trabajador que cae desde un andamio y aterriza de pie sobre hormigón; se queja solo de dolor en los talones. ¿Qué añade la lectura cinemática a tu exploración?',
          opciones: [
            'Nada: el dolor localizado en los talones delimita la lesión.',
            'Explorar además columna y pelvis, porque la carga axial se transmite por el eje del cuerpo, y reevaluar durante el traslado.',
            'Declarar fractura de columna por el mecanismo y comunicarla como diagnóstico.',
            'Descartar lesión por tratarse de una caída de pie.',
          ],
          correcta: 1,
          explicacion: 'La región de primer contacto orienta dónde mirar; la exploración y su repetición son las que confirman o descartan, y el mecanismo no se comunica como diagnóstico.',
        },
        {
          pregunta: 'Un familiar te dice que el paciente «se desmayó antes de caer del tejado». ¿Cómo cambia eso tu atención?',
          opciones: [
            'No cambia nada: la caída es lo único relevante.',
            'Añade la investigación de la causa del desmayo al manejo del trauma: hay dos problemas que atender, no uno.',
            'Anula el mecanismo traumático.',
            'Permite descartar lesión espinal.',
          ],
          correcta: 1,
          explicacion: 'Preguntar por qué cayó el paciente forma parte del preevento, y una causa médica previa cambia por completo la atención.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['No se publica ninguna altura como frontera entre trauma leve y grave; los umbrales se atribuyen a la guía de triaje adoptada y al protocolo local.'],
    }),
  },

  // ============================================================
  //  4. Trauma abierto o cerrado
  // ============================================================
  'm5-cin-abierto-cerrado': {
    icono: 'cp-smart-esqueleto',
    duracion: '12 min',
    resumen: 'La primera clasificación del trauma distingue si la superficie corporal se mantuvo íntegra '
      + 'o si fue atravesada. Trauma cerrado o contuso transfiere energía sin abrir la pared; abierto o '
      + 'penetrante crea una solución de continuidad y lesiona lo que encuentra a su paso. La lección '
      + 'insiste en dos advertencias simétricas: una herida pequeña no excluye lesión interna, y la '
      + 'ausencia de herida no implica que el paciente esté bien. Muchos incidentes reales son mixtos.',
    objetivos: [
      'Diferenciar trauma cerrado y trauma abierto por integridad de la superficie y forma de transferencia.',
      'Reconocer los mecanismos mixtos y describirlos sin reconstruir trayectos.',
      'Aplicar las dos advertencias que evitan infravalorar cada tipo.',
    ],
    secciones: [
      {
        titulo: 'Dos formas de recibir la energía',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Cerrado o contuso', 'Abierto o penetrante'],
            filas: [
              ['Superficie corporal', 'Íntegra o con lesiones superficiales', 'Atravesada: hay solución de continuidad'],
              ['Cómo transfiere la energía', 'Compresión, desaceleración, cizallamiento, estallido', 'Trayecto a través de los tejidos'],
              ['Ejemplos', 'Colisión, caída, aplastamiento, onda expansiva', 'Arma blanca, proyectil, empalamiento'],
              ['Qué complica el reconocimiento', 'Lesión interna sin señal externa visible', 'La herida visible puede no reflejar el daño profundo'],
            ],
          },
          { tipo: 'p', texto: 'La clasificación no es un juego de etiquetas: cambia lo que se busca. En el cerrado se piensa en órganos comprimidos, desgarrados en sus anclajes o estallados por aumento brusco de presión. En el penetrante se piensa en qué estructuras hay en la profundidad de esa región.' },
        ],
      },
      {
        titulo: 'Las dos advertencias que evitan errores',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Una herida pequeña no excluye lesión interna', texto: 'El tamaño del orificio externo no mide el daño profundo. Una herida discreta puede acompañarse de lesión de vísceras o de vasos, y por eso la conducta se decide por la región comprometida y por la fisiología del paciente, no por el aspecto de la piel.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ausencia de herida no implica baja gravedad', texto: 'En trauma cerrado la pared puede quedar casi intacta mientras el contenido se lesiona. Un abdomen sin marcas y un tórax sin equimosis no descartan hemorragia interna ni contusión pulmonar.' },
        ],
      },
      {
        titulo: 'Mecanismos mixtos y lo que se documenta',
        bloques: [
          { tipo: 'p', texto: 'Muchos incidentes combinan las dos formas. Una explosión contunde por la onda, penetra por los fragmentos y vuelve a contundir al desplazar al paciente. Un atropello contunde y además puede penetrar con material desprendido. Un choque puede terminar con un objeto empalado en un ocupante.' },
          {
            tipo: 'lista',
            titulo: 'Cómo se registra',
            items: [
              'Se describe lo que se ve: número, localización, tamaño aproximado y aspecto de cada herida.',
              'Se describe el mecanismo referido y la posición del paciente cuando ocurrió.',
              'No se etiqueta una herida como «entrada» o «salida» con certeza.',
              'No se reconstruye el trayecto interno sin imagen: se declara la región comprometida y las estructuras que podrían estar en juego.',
              'Se anota la hora de cada hallazgo, para que las exploraciones sucesivas sean comparables.',
            ],
          },
          mnemotecnia('LA PIEL NO ES EL MARCADOR. Herida pequeña no excluye lesión interna; ausencia de herida no implica baja gravedad. Las dos advertencias son simétricas, y entre las dos cubren los dos errores posibles de esta clasificación.'),
          masPreguntado('Las dos advertencias simétricas son la pregunta segura de esta lección, y con ellas la conducta que se deriva: la decisión se toma por la región comprometida y por la fisiología del paciente, no por el aspecto de la piel.'),
        ],
      },
      erroresFrecuentes([
        ['Medir el daño por el tamaño del orificio', 'El tamaño de la herida externa no mide el daño profundo. Una herida discreta puede acompañarse de lesión de vísceras o de vasos.'],
        ['Descartar gravedad porque no hay herida', 'En trauma cerrado la pared puede quedar casi intacta mientras el contenido se lesiona. Un abdomen sin marcas y un tórax sin equimosis no descartan hemorragia interna ni contusión pulmonar.'],
        ['Etiquetar una herida como entrada o salida', 'Es una conclusión que no corresponde al ámbito prehospitalario. Se numeran y se localizan las heridas y se describe su aspecto, sin ponerles esa etiqueta.'],
        ['Reconstruir el trayecto interno sin imagen', 'Se declara la región comprometida y las estructuras que podrían estar en juego. El trayecto lo establecen la imagen y la cirugía, no la inspección.'],
      ]),
      repasoRapido([
        'La primera clasificación distingue si la superficie corporal se mantuvo íntegra o fue atravesada.',
        'Cerrado o contuso: transfiere energía sin abrir la pared, por compresión, desaceleración, cizallamiento o estallido.',
        'Abierto o penetrante: crea una solución de continuidad y lesiona a lo largo de un trayecto.',
        'En el cerrado se piensa en órganos comprimidos, desgarrados en sus anclajes o estallados por aumento brusco de presión.',
        'En el penetrante se piensa en qué estructuras hay en la profundidad de esa región.',
        'Advertencia uno: una herida pequeña no excluye lesión interna.',
        'Advertencia dos: la ausencia de herida no implica baja gravedad.',
        'La conducta se decide por la región comprometida y por la fisiología, no por el aspecto de la piel.',
        'Muchos incidentes son mixtos: la explosión contunde, penetra y vuelve a contundir al desplazar al paciente.',
        'Se describe lo que se ve: número, localización, tamaño aproximado y aspecto de cada herida.',
        'No se etiqueta entrada ni salida y no se reconstruye el trayecto interno sin imagen.',
        'Se anota la hora de cada hallazgo para que las exploraciones sucesivas sean comparables.',
      ]),
      preguntasOrales([
        'Diferencia trauma cerrado y trauma abierto por integridad de la superficie y forma de transferencia.',
        '¿Qué se busca en un trauma cerrado y qué en uno penetrante?',
        'Di las dos advertencias simétricas de esta lección.',
        '¿Por qué el tamaño de la herida no mide el daño?',
        'Pon un ejemplo de mecanismo mixto y explica sus componentes.',
        '¿Qué se registra de una herida y qué no?',
        '¿Por qué se anota la hora de cada hallazgo?',
        'Abdomen sin marcas tras un choque. ¿Qué puedes descartar?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Trauma cerrado o contuso', definicion: 'Aquel en que la energía se transfiere sin atravesar la superficie corporal; lesiona por compresión, desaceleración, cizallamiento o estallido.' },
      { termino: 'Trauma abierto o penetrante', definicion: 'Aquel en que un objeto atraviesa la superficie corporal y crea un trayecto a través de los tejidos.' },
      { termino: 'Mecanismo mixto', definicion: 'Incidente que combina transferencia contusa y penetrante, como una explosión o un atropello con material desprendido.' },
      { termino: 'Solución de continuidad', definicion: 'Interrupción de la integridad de un tejido, en este caso de la superficie corporal.' },
    ],
    flashcards: [
      { frente: '¿Qué separa el trauma cerrado del abierto?', reverso: 'La integridad de la superficie corporal y la forma en que se transfiere la energía.' },
      { frente: '¿Una herida pequeña descarta lesión interna?', reverso: 'No: el tamaño del orificio externo no mide el daño profundo.' },
      { frente: '¿Un abdomen sin marcas descarta hemorragia interna?', reverso: 'No: en trauma cerrado la pared puede quedar casi intacta mientras el contenido se lesiona.' },
      { frente: '¿Se etiquetan las heridas como entrada y salida?', reverso: 'No con certeza: se describen número, localización, tamaño y aspecto.' },
      { frente: 'Ejemplo de mecanismo mixto', reverso: 'Una explosión: contunde por la onda, penetra por los fragmentos y vuelve a contundir al desplazar al paciente.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con una herida punzante de aspecto discreto en el flanco, hipotenso y taquicárdico. ¿Cómo se decide la conducta?',
        opciones: [
          'Por el tamaño de la herida, que es pequeña.',
          'Por la región comprometida y la fisiología del paciente, que indican gravedad pese al aspecto externo.',
          'Por la profundidad medida con una sonda en la herida.',
          'Por el tipo de arma, que se deduce del orificio.',
        ],
        correcta: 1,
        explicacion: 'El aspecto externo no mide el daño profundo; la región y la respuesta fisiológica sí orientan la prioridad.',
      },
      {
        pregunta: '¿Qué mecanismo lesivo corresponde típicamente al trauma cerrado?',
        opciones: [
          'El trayecto de un objeto a través de los tejidos.',
          'La compresión, la desaceleración, el cizallamiento y el estallido por aumento brusco de presión.',
          'La contaminación directa del peritoneo por un objeto.',
          'La fragmentación de un proyectil.',
        ],
        correcta: 1,
        explicacion: 'Son las cuatro formas en que la energía daña sin abrir la pared.',
      },
      {
        pregunta: 'En el informe describes dos heridas en el tórax. ¿Cuál es la redacción correcta?',
        opciones: [
          '«Orificio de entrada anterior y de salida posterior, trayecto de delante hacia atrás».',
          '«Dos heridas: una anterior y otra posterior, con su localización, tamaño aproximado y aspecto; región torácica comprometida».',
          '«Herida superficial sin repercusión».',
          '«Trayecto que atraviesa el pulmón derecho».',
        ],
        correcta: 1,
        explicacion: 'Se describe lo observado; el trayecto interno y la asignación de entrada y salida requieren estudios que el ámbito prehospitalario no realiza.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Una colisión con marca del cinturón y abdomen sin heridas corresponde a trauma ___.',
          opciones: ['abierto', 'cerrado', 'mixto por definición'],
          correcta: 1,
          explicacion: 'La superficie se mantiene íntegra; la energía se transfirió por compresión y desaceleración.',
        },
        {
          texto: 'Ante una herida penetrante, en lugar de reconstruir el trayecto se declara ___.',
          opciones: [
            'el arma probable',
            'la región comprometida y las estructuras que podrían estar en juego',
            'el orificio de entrada y el de salida',
          ],
          correcta: 1,
          explicacion: 'Es lo que se puede sostener sin imagen, y es lo que resulta útil para quien recibe al paciente.',
        },
        {
          texto: 'La explosión es el ejemplo típico de mecanismo ___, porque contunde, penetra y desplaza en el mismo evento.',
          opciones: ['exclusivamente cerrado', 'exclusivamente penetrante', 'mixto'],
          correcta: 2,
          explicacion: 'Combina varias formas de transferencia de energía sobre el mismo paciente.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['La lección prohíbe expresamente etiquetar entrada/salida y reconstruir trayectos sin imagen.'],
    }),
  },

  // ============================================================
  //  5. Cavitación
  // ============================================================
  'm5-cin-cavitacion': {
    icono: 'cp-servier-fibra-muscular',
    duracion: '13 min',
    resumen: 'Cuando un objeto atraviesa un tejido, aparta las partículas de su camino y abre una '
      + 'cavidad. Parte de esa cavidad permanece y parte se cierra tras el paso del objeto: son la '
      + 'cavidad permanente y la temporal. Cuánto daño deja depende de la densidad y de la elasticidad '
      + 'del tejido y de si el objeto se deforma, se fragmenta o se desvía. La lección enseña ese '
      + 'razonamiento y prohíbe deducir calibre, arma o trayectoria a partir de los orificios externos.',
    objetivos: [
      'Distinguir cavidad permanente y cavidad temporal.',
      'Relacionar densidad y elasticidad del tejido con el daño resultante.',
      'Rechazar la inferencia de calibre, arma o trayectoria a partir del aspecto externo.',
    ],
    secciones: [
      {
        titulo: 'Las dos cavidades',
        bloques: [
          { tipo: 'p', texto: 'Un objeto que penetra empuja el tejido hacia los lados. Ese desplazamiento abre un espacio que en parte se mantiene y en parte se recupera.' },
          {
            tipo: 'tabla',
            headers: ['', 'Cavidad permanente', 'Cavidad temporal'],
            filas: [
              ['Qué es', 'El espacio que queda tras el paso del objeto', 'El espacio que se abre y se cierra durante el paso'],
              ['Qué la produce', 'La destrucción directa del tejido en la trayectoria', 'El desplazamiento lateral del tejido por la energía transmitida'],
              ['Qué determina su efecto', 'El tamaño y la forma del objeto', 'La energía transferida y la tolerancia del tejido al estiramiento'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué importa la temporal', texto: 'Aunque se cierre, la cavidad temporal estira los tejidos vecinos. Un tejido poco elástico puede desgarrarse por ese estiramiento aunque el objeto no lo haya tocado. Por eso el daño puede extenderse más allá de la línea del trayecto.' },
        ],
      },
      {
        titulo: 'El tejido decide',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Densidad y elasticidad',
            items: [
              'Los tejidos más elásticos toleran mejor el estiramiento de la cavidad temporal y tienden a recuperarse.',
              'Los tejidos densos y poco elásticos absorben más energía y se desgarran con más facilidad.',
              'El aire de los pulmones, el líquido de las vísceras y la rigidez del hueso responden de forma distinta a la misma energía.',
              'Un mismo objeto puede atravesar dos regiones y dejar daños muy diferentes.',
            ],
          },
          { tipo: 'p', texto: 'A esto se añade el comportamiento del objeto. Un proyectil puede deformarse al impactar, fragmentarse en varios trozos o desviarse al chocar con estructuras rígidas. Cada una de esas cosas cambia el patrón de daño y ninguna es visible desde fuera.' },
        ],
      },
      {
        titulo: 'Lo que no se puede deducir',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Los orificios externos no dicen lo que parece', texto: 'A partir de una herida no se puede afirmar el calibre, el tipo de arma, la distancia del disparo, la trayectoria exacta ni el número de proyectiles. Esa determinación corresponde a la imagen, a la cirugía y, en su caso, al peritaje. Anotar en el informe una deducción de ese tipo introduce un error que después es difícil de retirar.' },
          {
            tipo: 'lista',
            titulo: 'Qué sí aporta el ámbito prehospitalario',
            items: [
              'Número y localización precisa de las heridas, incluidas las de la espalda, axilas, periné y cuero cabelludo.',
              'Aspecto y tamaño aproximado de cada una, sin etiquetarlas.',
              'Posición del paciente y del agresor si consta por relato, declarado como relato.',
              'Regiones comprometidas y estructuras profundas que obligan a mantener alta la sospecha.',
              'Evolución de los signos vitales, que es lo que orienta la urgencia real.',
            ],
          },
          mnemotecnia('LA PERMANENTE QUEDA, LA TEMPORAL ESTIRA. La permanente la produce la destrucción directa en la trayectoria; la temporal, el desplazamiento lateral del tejido. Y aunque se cierre, la temporal puede desgarrar lo que el objeto nunca tocó.'),
          masPreguntado('Se pregunta por qué importa la cavidad temporal si se cierra —porque estira los tejidos vecinos y el daño puede extenderse más allá de la línea del trayecto— y qué NO puede deducirse de los orificios externos.'),
        ],
      },
      erroresFrecuentes([
        ['Pensar que el daño acaba en la línea del trayecto', 'La cavidad temporal estira los tejidos vecinos, y un tejido poco elástico puede desgarrarse por ese estiramiento aunque el objeto no lo haya tocado.'],
        ['Suponer el mismo daño en todas las regiones', 'El tejido decide: los elásticos toleran mejor el estiramiento; los densos y poco elásticos absorben más energía y se desgarran con más facilidad. Un mismo objeto puede atravesar dos regiones y dejar daños muy diferentes.'],
        ['Deducir el arma a partir de la herida', 'De una herida no se puede afirmar calibre, tipo de arma, distancia del disparo, trayectoria exacta ni número de proyectiles. Eso corresponde a la imagen, a la cirugía y, en su caso, al peritaje.'],
        ['Explorar solo lo que se ve de frente', 'Las heridas se cuentan y se localizan también en espalda, axilas, periné y cuero cabelludo. Lo que no se busca ahí no aparece en el informe.'],
      ]),
      repasoRapido([
        'Un objeto que penetra empuja el tejido hacia los lados y abre una cavidad.',
        'Cavidad permanente: el espacio que queda tras el paso del objeto, por destrucción directa del tejido.',
        'Cavidad temporal: el espacio que se abre y se cierra durante el paso, por desplazamiento lateral.',
        'La permanente depende del tamaño y la forma del objeto; la temporal, de la energía transferida y de la tolerancia del tejido al estiramiento.',
        'Aunque se cierre, la temporal estira los tejidos vecinos y puede desgarrar lo que el objeto no tocó.',
        'Los tejidos elásticos toleran mejor el estiramiento; los densos y poco elásticos se desgarran con más facilidad.',
        'El aire del pulmón, el líquido de las vísceras y la rigidez del hueso responden distinto a la misma energía.',
        'El objeto también cambia el patrón: puede deformarse, fragmentarse o desviarse, y nada de eso se ve desde fuera.',
        'De los orificios externos no se deduce calibre, arma, distancia, trayectoria ni número de proyectiles.',
        'Lo que sí aporta el ámbito prehospitalario: número y localización precisa de las heridas, incluidas espalda, axilas, periné y cuero cabelludo.',
        'También aspecto y tamaño aproximado sin etiquetar, regiones comprometidas y evolución de los signos vitales.',
        'Una deducción pericial anotada en el informe introduce un error difícil de retirar después.',
      ]),
      preguntasOrales([
        'Distingue cavidad permanente y cavidad temporal.',
        '¿Por qué importa la temporal si se cierra?',
        'Explica cómo la densidad y la elasticidad del tejido cambian el daño.',
        '¿Qué comportamientos del objeto modifican el patrón de daño?',
        '¿Qué NO se puede deducir de una herida por proyectil?',
        'Enumera lo que sí aporta el ámbito prehospitalario ante una herida penetrante.',
        '¿Dónde se buscan heridas que suelen pasarse por alto?',
        '¿Por qué es grave anotar una deducción pericial en el informe?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE]),
    ],
    conceptosClave: [
      { termino: 'Cavitación', definicion: 'Formación de una cavidad en los tejidos por el desplazamiento que produce un objeto al atravesarlos.' },
      { termino: 'Cavidad permanente', definicion: 'Espacio que queda tras el paso del objeto, por destrucción directa del tejido en su trayectoria.' },
      { termino: 'Cavidad temporal', definicion: 'Espacio que se abre y se cierra durante el paso del objeto por desplazamiento lateral del tejido; puede desgarrar estructuras vecinas.' },
      { termino: 'Elasticidad tisular', definicion: 'Capacidad de un tejido de deformarse y recuperar su forma; determina su tolerancia al estiramiento de la cavidad temporal.' },
    ],
    flashcards: [
      { frente: 'Diferencia entre cavidad permanente y temporal', reverso: 'La permanente queda tras el paso del objeto; la temporal se abre y se cierra durante el paso.' },
      { frente: '¿Por qué la cavidad temporal puede lesionar tejidos que el objeto no tocó?', reverso: 'Porque los estira, y un tejido poco elástico puede desgarrarse con ese estiramiento.' },
      { frente: '¿Qué comportamientos del proyectil cambian el patrón de daño?', reverso: 'Deformarse, fragmentarse y desviarse al chocar con estructuras rígidas.' },
      { frente: '¿Se puede deducir el calibre por el orificio?', reverso: 'No: ni calibre, ni arma, ni distancia, ni trayectoria exacta.' },
      { frente: '¿Dónde se buscan heridas fáciles de pasar por alto?', reverso: 'Espalda, axilas, periné y cuero cabelludo.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con herida por proyectil presenta daño en estructuras alejadas de la línea que unen las dos heridas visibles. ¿Qué lo explica?',
        opciones: [
          'Que hubo dos proyectiles necesariamente.',
          'La cavidad temporal y la posible desviación o fragmentación del proyectil, que extienden el daño más allá del trayecto aparente.',
          'Un error de exploración.',
          'Que el tejido es más elástico de lo normal.',
        ],
        correcta: 1,
        explicacion: 'El estiramiento lateral y el comportamiento del proyectil explican daño fuera de la línea aparente, sin que ello permita afirmar el número de proyectiles.',
      },
      {
        pregunta: '¿Qué tejido tolera peor el estiramiento de la cavidad temporal?',
        opciones: [
          'El más elástico.',
          'El denso y poco elástico, que absorbe más energía y se desgarra con más facilidad.',
          'Todos por igual.',
          'Depende únicamente del tamaño del objeto.',
        ],
        correcta: 1,
        explicacion: 'Densidad y elasticidad determinan cuánta energía absorbe el tejido y cuánto deformación tolera.',
      },
      {
        pregunta: 'En el informe de un paciente con dos heridas torácicas, ¿qué corresponde escribir?',
        opciones: [
          'El calibre estimado y la distancia del disparo.',
          'Número, localización y aspecto de cada herida, región comprometida y evolución de los signos vitales.',
          'La trayectoria interna reconstruida.',
          'El tipo de arma empleada.',
        ],
        correcta: 1,
        explicacion: 'Es lo verificable en la escena; lo demás corresponde a imagen, cirugía y peritaje.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El espacio que se abre y se cierra durante el paso del objeto se llama cavidad ___.',
          opciones: ['permanente', 'temporal', 'residual'],
          correcta: 1,
          explicacion: 'Se cierra tras el paso, pero deja el estiramiento que puede desgarrar tejidos vecinos.',
        },
        {
          texto: 'Un tejido denso y poco elástico se desgarra con ___ facilidad ante la misma cavidad temporal.',
          opciones: ['menor', 'mayor', 'la misma'],
          correcta: 1,
          explicacion: 'Absorbe más energía y tolera peor la deformación.',
        },
        {
          texto: 'A partir de los orificios externos NO puede afirmarse ___.',
          opciones: [
            'el número de heridas visibles',
            'el calibre, el arma, la distancia ni la trayectoria exacta',
            'la localización anatómica de cada herida',
          ],
          correcta: 1,
          explicacion: 'Lo primero y lo tercero se observan; lo segundo requiere imagen, cirugía o peritaje.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['Prohibición explícita de inferir calibre, arma, distancia o trayectoria desde el aspecto externo.'],
    }),
  },

  // ============================================================
  //  6. Impacto por arma blanca y arma de fuego
  // ============================================================
  'm5-cin-arma-blanca-fuego': {
    icono: 'cp-cc0-explosivo',
    duracion: '14 min',
    resumen: 'El objeto cortopunzante lesiona lo que su trayecto encuentra y su energía es la del brazo '
      + 'que lo empuja; el proyectil añade la transferencia balística y su cavitación. La lección '
      + 'contrasta ambos mecanismos y fija tres conductas que no dependen del protocolo: no se explora '
      + 'la herida con instrumentos ni con los dedos, no se retira un objeto empalado y no se etiquetan '
      + 'con certeza entrada y salida. La preservación de indicios se hace sin retrasar la atención.',
    objetivos: [
      'Contrastar la lesión por objeto cortopunzante con la transferencia balística.',
      'Aplicar la conducta correcta ante una herida penetrante y ante un objeto empalado.',
      'Preservar indicios sin retrasar la atención del paciente.',
    ],
    secciones: [
      {
        titulo: 'Dos mecanismos distintos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Arma blanca / cortopunzante', 'Arma de fuego'],
            filas: [
              ['Origen de la energía', 'La fuerza del brazo que la empuja', 'La energía del proyectil en movimiento'],
              ['Daño principal', 'El trayecto del objeto y lo que corta a su paso', 'El trayecto más el efecto de la cavitación'],
              ['Previsibilidad', 'Trayecto relativamente más directo', 'Puede desviarse, deformarse o fragmentarse'],
              ['Lo que hay que valorar', 'Longitud posible del objeto, región y postura en el momento', 'Región comprometida y número de heridas, sin deducir el arma'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La postura del momento importa', texto: 'Un abdomen no está en la misma posición de pie que flexionado, y el diafragma sube y baja con la respiración. Por eso una herida aparentemente torácica puede ser toracoabdominal y al revés. Se registra la postura referida y se mantiene abierta la sospecha en las dos cavidades.' },
        ],
      },
      {
        titulo: 'Tres conductas que no se negocian',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'No explorar la herida', texto: 'No se introducen dedos, pinzas ni sondas para medir profundidad o buscar el trayecto. No aporta información fiable, puede desplazar coágulos y reactivar una hemorragia, y puede añadir daño y contaminación. Lo que se hace es describir lo visible y controlar el sangrado según el procedimiento de la unidad.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No retirar un objeto empalado', texto: 'El objeto puede estar taponando un vaso; retirarlo puede desencadenar una hemorragia que no se podrá controlar en la calle. Se estabiliza en la posición encontrada con apósitos voluminosos, se evita todo movimiento del objeto durante la movilización y se traslada. La única excepción que puede contemplar el protocolo es la que compromete de forma directa la vía aérea o impide maniobras de reanimación; esa decisión pertenece al protocolo local y a la dirección médica, no a esta lección.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'No etiquetar entrada y salida', texto: 'Escribir «entrada» y «salida» en el informe es una conclusión pericial disfrazada de observación. Se numeran y se localizan las heridas, y se describe su aspecto. La determinación corresponde a otros profesionales con otros medios.' },
        ],
      },
      {
        titulo: 'Indicios sin retrasar la atención',
        bloques: [
          { tipo: 'p', texto: 'La escena de una agresión también es una escena de investigación. Eso no cambia la prioridad —la atención del paciente— pero sí permite unos cuidados que cuestan muy poco tiempo.' },
          {
            tipo: 'lista',
            titulo: 'Buenas prácticas compatibles con la asistencia',
            items: [
              'Seguridad primero: no se accede a una escena violenta sin que esté asegurada conforme al procedimiento.',
              'Alterar lo mínimo imprescindible y recordar qué se movió y por qué.',
              'Evitar cortar la ropa justo sobre las heridas cuando sea posible, y conservarla sin sacudirla.',
              'No lavar la piel más allá de lo que exija la atención.',
              'Registrar lo que se encontró y lo que se modificó, con la hora.',
              'Manejar armas u objetos solo conforme al procedimiento del servicio y de la autoridad.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Regla de prioridad', texto: 'Ninguna medida de preservación justifica retrasar el control de una hemorragia, el manejo de la vía aérea o el traslado. Los indicios se cuidan mientras no compitan con la atención; cuando compiten, gana el paciente.' },
          mnemotecnia('NO EXPLORAR, NO RETIRAR, NO ETIQUETAR. No se mete nada en la herida, no se saca el objeto empalado y no se escribe entrada ni salida. Las tres son conductas, no opiniones, y ninguna depende del protocolo.'),
          masPreguntado('Las tres conductas que no se negocian, y la regla de prioridad que las acompaña: los indicios se cuidan mientras no compitan con la atención; cuando compiten, gana el paciente.'),
        ],
      },
      erroresFrecuentes([
        ['Explorar la herida para medir su profundidad', 'No se introducen dedos, pinzas ni sondas. No aporta información fiable, puede desplazar coágulos y reactivar una hemorragia, y puede añadir daño y contaminación.'],
        ['Retirar un objeto empalado', 'Puede estar taponando un vaso, y retirarlo puede desencadenar una hemorragia incontrolable en la calle. Se estabiliza en la posición encontrada con apósitos voluminosos y se traslada; la única excepción posible la define el protocolo local, no esta lección.'],
        ['Escribir entrada y salida en el informe', 'Es una conclusión pericial disfrazada de observación. Se numeran y se localizan las heridas y se describe su aspecto.'],
        ['Olvidar la postura del paciente en el momento', 'El abdomen no está en la misma posición de pie que flexionado, y el diafragma sube y baja con la respiración: una herida aparentemente torácica puede ser toracoabdominal, y al revés.'],
      ]),
      repasoRapido([
        'En el arma blanca la energía es la del brazo que empuja; en el proyectil, la del objeto en movimiento.',
        'El cortopunzante daña por su trayecto; el proyectil suma el trayecto y el efecto de la cavitación.',
        'El trayecto del cortopunzante es relativamente más directo; el proyectil puede desviarse, deformarse o fragmentarse.',
        'En el cortopunzante se valora la longitud posible del objeto, la región y la postura del momento.',
        'En el arma de fuego se valora la región comprometida y el número de heridas, sin deducir el arma.',
        'La postura del momento importa: una herida aparentemente torácica puede ser toracoabdominal.',
        'No se explora la herida con dedos, pinzas ni sondas.',
        'No se retira un objeto empalado: se estabiliza en la posición encontrada y se traslada.',
        'No se etiquetan entrada y salida.',
        'La preservación de indicios es compatible con la asistencia: alterar lo mínimo, conservar la ropa sin sacudirla, registrar lo que se movió y a qué hora.',
        'La seguridad va primero: no se accede a una escena violenta sin que esté asegurada conforme al procedimiento.',
        'Regla de prioridad: ninguna medida de preservación justifica retrasar hemorragia, vía aérea o traslado.',
      ]),
      preguntasOrales([
        'Contrasta la lesión por arma blanca con la transferencia balística.',
        '¿Por qué importa la postura del paciente en el momento de la agresión?',
        'Di las tres conductas que no se negocian ante una herida penetrante.',
        '¿Por qué no se explora una herida para medir su profundidad?',
        '¿Qué haces con un objeto empalado y por qué?',
        '¿Por qué no se etiquetan entrada y salida?',
        'Enumera las buenas prácticas de preservación compatibles con la asistencia.',
        'Preservar indicios y controlar una hemorragia entran en conflicto. ¿Qué gana?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Objeto empalado', definicion: 'Objeto que permanece introducido en el cuerpo; se estabiliza en la posición encontrada y no se retira en la escena.' },
      { termino: 'Transferencia balística', definicion: 'Entrega de energía de un proyectil a los tejidos, que suma el trayecto y el efecto de la cavitación.' },
      { termino: 'Preservación de indicios', definicion: 'Conjunto de cuidados que evitan destruir información de la escena, subordinados siempre a la atención del paciente.' },
      { termino: 'Herida toracoabdominal', definicion: 'Aquella que, por su localización y por el movimiento del diafragma, puede comprometer a la vez el tórax y el abdomen.' },
    ],
    flashcards: [
      { frente: '¿De dónde procede la energía en una herida por arma blanca?', reverso: 'De la fuerza del brazo que empuja el objeto.' },
      { frente: '¿Por qué no se explora una herida penetrante?', reverso: 'No aporta información fiable y puede reactivar la hemorragia, añadir daño y contaminar.' },
      { frente: '¿Qué se hace con un objeto empalado?', reverso: 'Se estabiliza en la posición encontrada con apósitos voluminosos y se traslada; no se retira en la escena.' },
      { frente: '¿Por qué una herida torácica baja puede ser abdominal?', reverso: 'Porque el diafragma sube y baja con la respiración y la postura del momento cambia la relación entre cavidades.' },
      { frente: 'Regla de prioridad entre indicios y paciente', reverso: 'Los indicios se cuidan mientras no compitan con la atención; cuando compiten, gana el paciente.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con un destornillador clavado en el tórax, consciente y con sangrado moderado alrededor. ¿Qué haces?',
        opciones: [
          'Lo retiras y taponas la herida.',
          'Lo estabilizas en la posición encontrada, evitas que se mueva durante la movilización y trasladas.',
          'Lo movilizas suavemente para valorar la profundidad.',
          'Lo retiras solo si el paciente lo pide.',
        ],
        correcta: 1,
        explicacion: 'El objeto puede estar taponando un vaso; retirarlo puede desencadenar una hemorragia incontrolable fuera del quirófano.',
      },
      {
        pregunta: '¿Qué diferencia principal aporta el proyectil frente al objeto cortopunzante?',
        opciones: [
          'Que siempre produce más daño.',
          'Que añade a la lesión del trayecto el efecto de la cavitación, y puede desviarse o fragmentarse.',
          'Que nunca lesiona órganos profundos.',
          'Que permite deducir el arma por la herida.',
        ],
        correcta: 1,
        explicacion: 'La transferencia balística no se limita a la línea del trayecto y su comportamiento no es visible desde fuera.',
      },
      {
        pregunta: 'La policía te pide que dejes la ropa y no toques nada mientras el paciente sangra activamente. ¿Cómo procedes?',
        opciones: [
          'Esperas la autorización antes de intervenir.',
          'Atiendes al paciente: la preservación de indicios no justifica retrasar el control de la hemorragia, y documentas lo que modificaste.',
          'Retiras toda la ropa y la desechas.',
          'Trasladas sin controlar el sangrado para no alterar la escena.',
        ],
        correcta: 1,
        explicacion: 'Los cuidados de la escena son compatibles con la asistencia mientras no compitan con ella; cuando compiten, la atención tiene prioridad.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Herida única por arma blanca en el hemitórax izquierdo bajo. El paciente refiere que estaba sentado e inclinado hacia adelante. ¿Qué mantienes abierto en tu sospecha?',
          opciones: [
            'Solo la lesión torácica: la herida está sobre el tórax.',
            'Tórax y abdomen a la vez, porque la postura y el movimiento del diafragma hacen posible una herida toracoabdominal.',
            'Solo la lesión abdominal.',
            'Ninguna: una herida única no compromete cavidades.',
          ],
          correcta: 1,
          explicacion: 'La lección enseña a registrar la postura referida y a mantener la sospecha en ambas cavidades cuando la localización lo permite.',
        },
        {
          pregunta: 'Vas a redactar el informe de un paciente con dos heridas por proyectil. ¿Qué formulación es correcta según lo enseñado?',
          opciones: [
            '«Orificio de entrada en cara anterior y de salida en cara posterior».',
            '«Dos heridas: una en cara anterior y otra en cara posterior del hemitórax derecho, con su tamaño aproximado y aspecto; región torácica comprometida; signos vitales a las 21:40 y a las 21:55».',
            '«Herida de bala de pequeño calibre a corta distancia».',
            '«Trayecto anteroposterior con lesión pulmonar».',
          ],
          correcta: 1,
          explicacion: 'Se describe lo observable con hora, y se declara la región comprometida; entrada, salida, calibre, distancia y trayecto son conclusiones que la escena no permite sostener.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'La excepción de retirada de objeto empalado por compromiso de vía aérea o reanimación se remite expresamente al protocolo local y a la dirección médica; la lección no la autoriza.',
        'DECISIÓN PENDIENTE: la academia debe entregar su procedimiento de escena violenta y de manejo de indicios para que la lección lo cite de forma concreta.',
      ],
    }),
  },

  // ============================================================
  //  7. Tríada de Waddell
  // ============================================================
  'm5-cin-triada-wadell': {
    icono: 'ic-nino',
    duracion: '12 min',
    resumen: 'El atropello se lee como una secuencia de impactos: el vehículo golpea al peatón, el '
      + 'peatón golpea el vehículo y después golpea el suelo. Esa secuencia, conocida como tríada de '
      + 'Waddell, es una heurística de búsqueda para el paciente pediátrico y no un diagnóstico. La '
      + 'lección explica cómo la estatura del peatón y la altura del frontal del vehículo cambian dónde '
      + 'impacta cada golpe, y registra que el plan de estudios escribe «Wadell» con una sola d.',
    objetivos: [
      'Describir los tres impactos sucesivos del atropello.',
      'Explicar cómo la talla del peatón y la altura del vehículo modifican el patrón.',
      'Usar la secuencia como heurística de búsqueda, nunca como diagnóstico.',
    ],
    secciones: [
      {
        titulo: 'Nota editorial sobre el nombre',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Waddell, con dos des', texto: 'El plan de estudios oficial escribe «Tríada de Wadell». La grafía habitual en la literatura es **Waddell**, y es la que se muestra al alumno para que pueda buscar el término después. El título documental se conserva sin alterar en el campo de trazabilidad del tema.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Sobre la atribución del epónimo', texto: 'El epónimo se conserva porque es el término que emplea el plan y el que el alumno encontrará citado. No se le atribuye a una página concreta de la bibliografía del curso: mientras no se disponga de la referencia original reproducible, esta lección lo presenta como denominación de uso extendido y no como cita respaldada. La deuda queda registrada en la ficha editorial.' },
        ],
      },
      {
        titulo: 'Los tres impactos',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia del atropello',
            items: [
              'Primer impacto — vehículo contra persona: el frontal del vehículo golpea al peatón. Dónde golpea depende de la altura del frontal y de la estatura del peatón.',
              'Segundo impacto — persona contra vehículo: el cuerpo es proyectado sobre el capó, el parabrisas o el lateral, y recibe un segundo golpe.',
              'Tercer impacto — persona contra suelo: el cuerpo cae y golpea el pavimento u otro obstáculo, con posibilidad de arrastre o de atropello por otro vehículo.',
            ],
          },
          { tipo: 'p', texto: 'Cada uno de los tres impactos es un evento distinto, con su propia región de contacto. Ese es el valor real de la secuencia: recuerda que un atropello no produce una lesión, sino una serie de contactos que hay que explorar por separado.' },
        ],
      },
      {
        titulo: 'La talla cambia el patrón',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Peatón adulto', 'Peatón de baja estatura o pediátrico'],
            filas: [
              ['Zona del primer impacto', 'Habitualmente miembros inferiores, según la altura del frontal', 'Puede alcanzar pelvis, abdomen o tórax por la misma altura de frontal'],
              ['Segundo impacto', 'Frecuentemente tronco y cabeza contra capó o parabrisas', 'Puede proyectarse hacia adelante o quedar en la trayectoria del vehículo'],
              ['Consecuencia práctica', 'Explorar de forma dirigida las tres zonas de contacto', 'Ampliar la exploración a regiones más altas del cuerpo desde el primer impacto'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Heurística, no diagnóstico', texto: 'La secuencia dice DÓNDE MIRAR. No permite afirmar que exista fractura, lesión abdominal ni traumatismo craneal. Igual que en el resto de la unidad, el mecanismo eleva la sospecha y orienta el destino; la exploración repetida y la valoración fisiológica son las que sostienen cualquier afirmación.' },
          {
            tipo: 'lista',
            titulo: 'Qué se documenta en un atropello',
            items: [
              'Velocidad aproximada referida y tipo de vehículo, incluido si el frontal es alto.',
              'Punto de impacto sobre el vehículo, si es visible, y estado del parabrisas.',
              'Dónde quedó el paciente respecto al punto de impacto, y si hubo arrastre.',
              'Región corporal de cada contacto según relato y hallazgos.',
              'Estatura aproximada del paciente cuando el patrón depende de ella.',
            ],
          },
          mnemotecnia('VEHÍCULO, VEHÍCULO, SUELO. El vehículo golpea a la persona, la persona golpea el vehículo y la persona golpea el suelo. Tres contactos, tres regiones que se exploran por separado: un atropello no produce una lesión, produce una serie.'),
          masPreguntado('Se pregunta la secuencia y su límite: dice DÓNDE MIRAR y no permite afirmar fractura, lesión abdominal ni traumatismo craneal. Y se pregunta el cambio de patrón por talla: con la misma altura de frontal, en el peatón de baja estatura el primer impacto puede alcanzar pelvis, abdomen o tórax.'),
        ],
      },
      erroresFrecuentes([
        ['Explorar el atropello como un solo golpe', 'Son tres impactos sucesivos, cada uno con su región de contacto. Ese es el valor real de la secuencia: obliga a explorar las tres por separado.'],
        ['Aplicar el patrón del adulto al peatón de baja estatura', 'Con la misma altura de frontal, el primer impacto puede alcanzar pelvis, abdomen o tórax en lugar de los miembros inferiores. La exploración se amplía a regiones más altas desde el primer impacto.'],
        ['Usar la tríada como diagnóstico', 'Es una heurística de búsqueda. Eleva la sospecha y orienta el destino; la exploración repetida y la valoración fisiológica sostienen cualquier afirmación.'],
        ['Escribir el epónimo como una cita respaldada', 'Se conserva porque es el término del plan y el que el alumno encontrará citado, pero no se atribuye a una página concreta de la bibliografía del curso mientras no exista la referencia original reproducible.'],
      ]),
      repasoRapido([
        'El plan escribe «Wadell»; la grafía habitual en la literatura es Waddell, y es la que se muestra al alumno.',
        'Primer impacto: el frontal del vehículo golpea al peatón, y dónde depende de la altura del frontal y de la estatura.',
        'Segundo impacto: el cuerpo es proyectado sobre capó, parabrisas o lateral y recibe un segundo golpe.',
        'Tercer impacto: el cuerpo cae y golpea el pavimento u otro obstáculo, con posible arrastre o atropello por otro vehículo.',
        'Cada impacto es un evento distinto con su propia región de contacto: se exploran por separado.',
        'En el peatón adulto el primer impacto suele alcanzar miembros inferiores, según la altura del frontal.',
        'En el peatón de baja estatura o pediátrico puede alcanzar pelvis, abdomen o tórax.',
        'La secuencia dice dónde mirar; no afirma fractura, lesión abdominal ni traumatismo craneal.',
        'Se documenta velocidad aproximada referida, tipo de vehículo e incluso si el frontal es alto.',
        'También el punto de impacto sobre el vehículo, el estado del parabrisas y dónde quedó el paciente.',
        'Se anota si hubo arrastre y la región corporal de cada contacto según relato y hallazgos.',
        'Se anota la estatura aproximada del paciente cuando el patrón depende de ella.',
      ]),
      preguntasOrales([
        'Describe los tres impactos sucesivos del atropello.',
        '¿Por qué se exploran por separado?',
        'Explica cómo cambia el patrón en un peatón de baja estatura.',
        '¿Qué permite y qué no permite afirmar la tríada?',
        '¿Cómo se escribe el epónimo y qué escribe el plan?',
        '¿Por qué el epónimo no se presenta como cita respaldada?',
        'Enumera lo que se documenta en un atropello.',
        'Parabrisas roto y paciente lejos del punto de impacto. ¿Qué hipótesis abres?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE]),
    ],
    conceptosClave: [
      { termino: 'Tríada de Waddell', definicion: 'Secuencia de tres impactos del atropello —vehículo contra persona, persona contra vehículo y persona contra suelo— usada como heurística de búsqueda, sobre todo en el paciente pediátrico.' },
      { termino: 'Segundo impacto', definicion: 'Golpe del cuerpo proyectado contra el capó, el parabrisas o el lateral del vehículo.' },
      { termino: 'Tercer impacto', definicion: 'Golpe del cuerpo contra el pavimento u otro obstáculo tras ser proyectado, con posible arrastre.' },
      { termino: 'Heurística de búsqueda', definicion: 'Regla práctica que orienta qué explorar; no confirma ni descarta una lesión.' },
    ],
    flashcards: [
      { frente: 'Los tres impactos del atropello', reverso: 'Vehículo contra persona, persona contra vehículo y persona contra suelo.' },
      { frente: '¿Qué grafía se muestra al alumno y cuál conserva el plan?', reverso: 'Se muestra «Waddell»; el plan escribe «Wadell» y esa grafía se conserva solo como título documental.' },
      { frente: '¿Por qué cambia el patrón en un peatón de baja estatura?', reverso: 'Porque la misma altura de frontal impacta en regiones corporales más altas: pelvis, abdomen o tórax.' },
      { frente: '¿La tríada permite afirmar una lesión?', reverso: 'No: dice dónde mirar. La exploración repetida y la fisiología sostienen las afirmaciones.' },
      { frente: 'Dato del vehículo que conviene registrar en un atropello', reverso: 'Si el frontal es alto, el punto de impacto y el estado del parabrisas.' },
    ],
    quiz: [
      {
        pregunta: 'Atropello de un niño por una camioneta de frontal alto. ¿Qué modifica esa combinación?',
        opciones: [
          'Nada: el patrón del atropello es siempre el mismo.',
          'La zona del primer impacto, que puede alcanzar pelvis, abdomen o tórax en vez de los miembros inferiores.',
          'Confirma traumatismo craneal.',
          'Elimina el tercer impacto.',
        ],
        correcta: 1,
        explicacion: 'La relación entre la altura del frontal y la estatura del peatón determina dónde golpea el primer impacto.',
      },
      {
        pregunta: '¿Cuál es el valor práctico de leer el atropello como tres impactos?',
        opciones: [
          'Permite predecir las lesiones exactas.',
          'Recuerda que hay varias regiones de contacto distintas y que cada una debe explorarse.',
          'Sustituye la exploración física.',
          'Determina el destino del paciente por sí solo.',
        ],
        correcta: 1,
        explicacion: 'Es una heurística de búsqueda: evita centrarse en la lesión más visible y olvidar las demás.',
      },
      {
        pregunta: 'En el informe de un atropello, ¿qué anotación es correcta?',
        opciones: [
          '«Tríada de Waddell completa: fractura de fémur, lesión abdominal y traumatismo craneal».',
          '«Atropello por vehículo de frontal alto; contacto en miembro inferior derecho, proyección sobre capó y caída al pavimento; hallazgos y horas de cada exploración».',
          '«Mecanismo compatible con lesión medular».',
          '«Sin lesiones: el paciente camina».',
        ],
        correcta: 1,
        explicacion: 'Se describe la secuencia observada y los hallazgos con su hora; el epónimo no se usa para declarar lesiones.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El impacto en que el cuerpo es proyectado sobre el capó o el parabrisas es el ___.',
          opciones: ['primero', 'segundo', 'tercero'],
          correcta: 1,
          explicacion: 'El primero es el del vehículo contra la persona y el tercero, el de la persona contra el suelo.',
        },
        {
          texto: 'La grafía que se muestra al alumno es ___, aunque el plan de estudios escriba la variante con una sola d.',
          opciones: ['Wadell', 'Waddell', 'Wadel'],
          correcta: 1,
          explicacion: 'Es la forma habitual en la literatura y la que permitirá al alumno encontrar el término.',
        },
        {
          texto: 'Ante un atropello, la secuencia de tres impactos sirve para ___.',
          opciones: [
            'declarar las lesiones probables en la entrega',
            'recordar que hay varias regiones de contacto y explorarlas todas',
            'calcular la velocidad del vehículo',
          ],
          correcta: 1,
          explicacion: 'Su valor es de búsqueda, no diagnóstico ni de cálculo.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'DEUDA BIBLIOGRÁFICA REGISTRADA: no se localizó una referencia original reproducible del epónimo «Waddell». La lección lo presenta como denominación de uso extendido y NO se lo atribuye a PHTLS ni a ninguna página concreta.',
        'La errata documental «Wadell» se conserva en el título oficial y se corrige solo en el título visible.',
      ],
    }),
  },

  // ============================================================
  //  8. Tipos de impacto en desaceleración
  // ============================================================
  'm5-cin-desaceleracion': {
    icono: 'cp-servier-aorta',
    duracion: '13 min',
    resumen: 'Cuando un cuerpo pasa de moverse a detenerse en muy poco tiempo, sus partes no se detienen '
      + 'a la vez. Las estructuras fijas frenan con la pared y las móviles siguen avanzando hasta que su '
      + 'anclaje las retiene. De ahí salen tres fuerzas —compresión, tracción y cizallamiento— que '
      + 'explican por qué la desaceleración lesiona sin abrir la piel. La lección aplica ese '
      + 'razonamiento a los impactos frontal, lateral, posterior y rotacional sin convertir cada patrón '
      + 'en una lesión segura.',
    objetivos: [
      'Explicar compresión, tracción y cizallamiento como efectos de la desaceleración.',
      'Relacionar los puntos de fijación anatómicos con las regiones de riesgo.',
      'Diferenciar los patrones frontal, lateral, posterior y rotacional sin diagnosticar.',
    ],
    secciones: [
      {
        titulo: 'Tres fuerzas, una misma causa',
        bloques: [
          { tipo: 'p', texto: 'En una desaceleración brusca conviven tres movimientos distintos: el del vehículo, que se detiene primero; el del ocupante, que sigue avanzando hasta chocar o hasta que lo retiene el cinturón; y el de los órganos, que siguen moviéndose dentro del cuerpo hasta que sus anclajes los frenan.' },
          {
            tipo: 'tabla',
            headers: ['Fuerza', 'Qué hace', 'Ejemplo de lo que hay que buscar'],
            filas: [
              ['Compresión', 'Aplasta una estructura entre dos superficies', 'Órgano comprimido entre la pared y la columna'],
              ['Tracción', 'Estira una estructura desde su punto de anclaje', 'Estructuras tironeadas en sus fijaciones al seguir avanzando'],
              ['Cizallamiento', 'Desliza dos partes contiguas a velocidades distintas', 'Desgarro en la unión entre una porción fija y otra móvil'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué importan los puntos de fijación', texto: 'Las estructuras que están sujetas en un punto y libres en el resto son las más expuestas al cizallamiento: la aorta tiene zonas fijas y zonas móviles, y el encéfalo se mueve dentro del cráneo con sus propias sujeciones. Ahí es donde la desaceleración concentra su efecto, y por eso son regiones de vigilancia y de traslado, no de diagnóstico prehospitalario.' },
        ],
      },
      {
        titulo: 'Cuatro patrones de impacto',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Patrón', 'Qué ocurre', 'Qué conviene explorar con atención'],
            filas: [
              ['Frontal', 'El ocupante sigue hacia adelante: por encima o por debajo del volante y del tablero', 'Cabeza y cuello, tórax, abdomen, pelvis, rodillas, fémures y caderas'],
              ['Lateral', 'La energía entra por el costado, con poca estructura de protección', 'Costado del impacto: tórax, abdomen, pelvis, hombro y columna cervical por flexión lateral'],
              ['Posterior', 'El vehículo es empujado hacia adelante y el cuerpo queda atrás un instante', 'Columna cervical, sobre todo si el reposacabezas estaba mal ajustado'],
              ['Rotacional', 'El vehículo gira sobre un punto y el ocupante recibe varias direcciones', 'Combinación de los anteriores; exploración completa, sin asumir un solo patrón'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ningún patrón produce una lesión segura', texto: 'Que el impacto haya sido lateral no significa que exista lesión esplénica o hepática, ni que haya fractura pélvica. Significa que esas regiones se exploran con especial atención y que se reevalúan. El vuelco y la eyección se documentan como información de alto riesgo por la energía implicada, y su interpretación se apoya en la guía de triaje de campo.' },
          mnemotecnia('APLASTA, ESTIRA, DESLIZA. Compresión aplasta entre dos superficies; tracción estira desde el anclaje; cizallamiento desliza dos partes contiguas a velocidades distintas. Y donde una estructura está sujeta en un punto y libre en el resto, es donde la desaceleración concentra su efecto.'),
          masPreguntado('Lo más preguntado son los puntos de fijación —por qué las estructuras sujetas en un punto y libres en el resto son las más expuestas al cizallamiento— y que ningún patrón de impacto produce una lesión segura: define dónde explorar con especial atención y reevaluar.'),
        ],
      },
      erroresFrecuentes([
        ['Creer que el cuerpo se detiene de golpe y a la vez', 'No: las estructuras fijas frenan con la pared y las móviles siguen avanzando hasta que su anclaje las retiene. De esa diferencia salen la compresión, la tracción y el cizallamiento.'],
        ['Convertir un patrón de impacto en una lesión', 'Que el impacto haya sido lateral no significa que exista lesión esplénica, hepática ni fractura pélvica: significa que esas regiones se exploran con especial atención y se reevalúan.'],
        ['Dar por bueno un solo patrón en un impacto rotacional', 'El vehículo gira sobre un punto y el ocupante recibe varias direcciones. Corresponde exploración completa, sin asumir un patrón único.'],
        ['Olvidar el impacto posterior y el reposacabezas', 'En el impacto posterior el vehículo es empujado hacia adelante y el cuerpo queda atrás un instante; la columna cervical es la región de atención, sobre todo con el reposacabezas mal ajustado.'],
      ]),
      repasoRapido([
        'En una desaceleración brusca conviven tres movimientos: el del vehículo, el del ocupante y el de los órganos.',
        'Compresión: aplasta una estructura entre dos superficies.',
        'Tracción: estira una estructura desde su punto de anclaje.',
        'Cizallamiento: desliza dos partes contiguas a velocidades distintas, con riesgo de desgarro en la unión.',
        'Las estructuras sujetas en un punto y libres en el resto son las más expuestas al cizallamiento.',
        'Esas regiones son de vigilancia y de traslado, no de diagnóstico prehospitalario.',
        'Frontal: el ocupante sigue hacia adelante, por encima o por debajo del volante y del tablero.',
        'Lateral: la energía entra por el costado, con poca estructura de protección.',
        'Posterior: el cuerpo queda atrás un instante; atención a la columna cervical y al reposacabezas.',
        'Rotacional: varias direcciones a la vez; exploración completa sin asumir un solo patrón.',
        'Ningún patrón produce una lesión segura: define dónde explorar con atención y reevaluar.',
        'Vuelco y eyección se documentan como información de alto riesgo, y se interpretan con la guía de triaje de campo.',
      ]),
      preguntasOrales([
        'Explica compresión, tracción y cizallamiento como efectos de la desaceleración.',
        '¿Por qué el cuerpo no se detiene de golpe y a la vez?',
        '¿Por qué importan los puntos de fijación?',
        'Describe qué ocurre y qué explorarías en un impacto frontal.',
        '¿Qué hace distinto al impacto lateral?',
        '¿Qué región vigilas en un impacto posterior y por qué?',
        '¿Qué exige un impacto rotacional?',
        'Impacto lateral. ¿Qué puedes afirmar sobre el bazo o el hígado?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE]),
    ],
    conceptosClave: [
      { termino: 'Compresión', definicion: 'Aplastamiento de una estructura entre dos superficies durante la transferencia de energía.' },
      { termino: 'Tracción', definicion: 'Estiramiento de una estructura desde su punto de anclaje cuando la parte móvil continúa su movimiento.' },
      { termino: 'Cizallamiento', definicion: 'Deslizamiento de dos partes contiguas a velocidades distintas, con riesgo de desgarro en la unión.' },
      { termino: 'Punto de fijación', definicion: 'Zona donde una estructura está sujeta mientras el resto puede moverse; concentra el efecto de la desaceleración.' },
    ],
    flashcards: [
      { frente: 'Las tres fuerzas de la desaceleración', reverso: 'Compresión, tracción y cizallamiento.' },
      { frente: '¿Por qué los puntos de fijación son zonas de riesgo?', reverso: 'Porque una parte queda sujeta mientras la otra sigue moviéndose, y ahí se concentra el cizallamiento.' },
      { frente: 'Impacto posterior: ¿qué región concentra la atención?', reverso: 'La columna cervical, sobre todo con el reposacabezas mal ajustado.' },
      { frente: 'Impacto lateral: ¿por qué preocupa?', reverso: 'Porque la energía entra por el costado, donde hay poca estructura de protección.' },
      { frente: '¿Qué significa un impacto rotacional para la exploración?', reverso: 'Que combina varias direcciones y obliga a una exploración completa, sin asumir un solo patrón.' },
    ],
    quiz: [
      {
        pregunta: 'En una desaceleración brusca, ¿por qué se lesionan estructuras internas sin que se rompa la piel?',
        opciones: [
          'Porque la piel es más resistente que cualquier órgano.',
          'Porque las partes fijas y las móviles del cuerpo se detienen en momentos distintos, y aparecen compresión, tracción y cizallamiento.',
          'Porque la energía se transforma en calor.',
          'Porque el aire de los pulmones amortigua el impacto.',
        ],
        correcta: 1,
        explicacion: 'La diferencia de velocidad entre estructuras contiguas es la que genera el daño interno.',
      },
      {
        pregunta: 'Colisión lateral con intrusión en el costado del conductor. ¿Qué conclusión es correcta?',
        opciones: [
          'Hay lesión esplénica confirmada si el impacto fue por la izquierda.',
          'Las regiones del costado impactado se exploran con especial atención y se reevalúan, y el mecanismo influye en el destino.',
          'No hay riesgo si no se ve deformidad exterior.',
          'El patrón lateral descarta lesión cervical.',
        ],
        correcta: 1,
        explicacion: 'El patrón orienta la exploración y el triaje; no confirma ninguna lesión concreta.',
      },
      {
        pregunta: '¿Qué fuerza describe el desgarro en la unión entre una porción fija y otra móvil de una misma estructura?',
        opciones: ['Compresión', 'Tracción', 'Cizallamiento', 'Estallido'],
        correcta: 2,
        explicacion: 'El cizallamiento aparece cuando dos partes contiguas se desplazan a velocidades distintas.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Colisión posterior a baja velocidad. El paciente está asintomático y el reposacabezas estaba en su posición más baja. ¿Cómo lo interpretas?',
          opciones: [
            'Como incidente sin relevancia: no hay síntomas.',
            'Como mecanismo que concentra la atención en la columna cervical, con exploración dirigida y reevaluación, sin declarar lesión.',
            'Como lesión cervical confirmada por el mecanismo.',
            'Como criterio automático de traslado a centro de trauma en cualquier servicio.',
          ],
          correcta: 1,
          explicacion: 'El impacto posterior con reposacabezas mal ajustado eleva la sospecha cervical; ni la confirma ni fija por sí solo el destino.',
        },
        {
          pregunta: 'Un vehículo volcó y uno de los ocupantes fue eyectado. ¿Qué papel tiene ese dato en tu informe?',
          opciones: [
            'Es anecdótico y no se registra.',
            'Es información de alto riesgo por la energía implicada, que se documenta y se interpreta con la guía de triaje de campo para decidir prioridad y destino.',
            'Permite declarar politraumatismo grave sin explorar.',
            'Sustituye la valoración fisiológica del paciente.',
          ],
          correcta: 1,
          explicacion: 'Vuelco y eyección se documentan como riesgo elevado; su lectura operativa corresponde a la guía de triaje, no a un diagnóstico.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['Los puntos de fijación de aorta y encéfalo se presentan como regiones de vigilancia; su lesión específica se desarrolla en los temas propios de tórax y de cráneo.'],
    }),
  },

  // ============================================================
  //  9. Tipos de impacto en vehículo automotor
  // ============================================================
  'm5-cin-vehiculo-automotor': {
    icono: 'cp-servier-ciclista',
    duracion: '15 min',
    resumen: 'Una colisión de vehículo no es un choque, sino tres sucesivos: el vehículo contra el '
      + 'objeto, el ocupante contra el interior o contra su sistema de retención, y los órganos contra '
      + 'las paredes del propio cuerpo. La lección desarrolla esa secuencia y revisa la información que '
      + 'la escena aporta —intrusión, cinturón, bolsa de aire, volante, parabrisas, eyección y estado '
      + 'de los demás ocupantes— y la conecta con la decisión de triaje, evitando toda fórmula '
      + 'determinista del tipo «volante deformado igual a lesión X».',
    objetivos: [
      'Describir las tres colisiones sucesivas de un choque de vehículo.',
      'Extraer de la escena la información que modifica la sospecha y el destino.',
      'Rechazar las asociaciones deterministas entre un hallazgo del vehículo y una lesión.',
    ],
    secciones: [
      {
        titulo: 'Las tres colisiones',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Una detrás de otra, en milisegundos',
            items: [
              'Primera — vehículo contra objeto: el vehículo se detiene o se deforma. Es la que se ve al llegar.',
              'Segunda — ocupante contra el interior o contra su retención: el cuerpo sigue avanzando hasta que algo lo detiene.',
              'Tercera — órganos contra las paredes del cuerpo: el contenido sigue moviéndose dentro del continente y se frena contra él o contra sus anclajes.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La tercera colisión no se ve', texto: 'La deformidad del vehículo describe la primera. Las marcas en el interior y en el cuerpo describen la segunda. La tercera no deja huella externa, y es precisamente la que produce las lesiones internas que el ámbito prehospitalario debe sospechar y vigilar.' },
        ],
      },
      {
        titulo: 'Qué información aporta la escena',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Del vehículo',
            items: [
              'Intrusión en el habitáculo y en qué asiento, que es uno de los datos que las guías de triaje consideran.',
              'Deformidad del volante, del tablero y del parabrisas.',
              'Despliegue de bolsas de aire y si el ocupante estaba correctamente sentado.',
              'Rotura del parabrisas «en telaraña», que sugiere contacto de la cabeza y obliga a explorarla con atención.',
              'Posición final del vehículo, vuelco y distancia recorrida tras el impacto.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Del ocupante y del conjunto',
            items: [
              'Uso del cinturón y si estaba bien colocado: sobre la pelvis y cruzando el tórax, no sobre el abdomen ni bajo el brazo.',
              'Marcas visibles en el cuerpo que reproduzcan un elemento del habitáculo.',
              'Eyección total o parcial de cualquier ocupante.',
              'Estado de los demás ocupantes, incluido el fallecimiento de alguno: es información de energía, no una predicción sobre el paciente.',
              'Necesidad y duración de la extracción.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La bolsa de aire no cierra la valoración', texto: 'Un despliegue correcto alarga la detención y reduce la carga, pero no elimina la transferencia de energía ni sustituye al cinturón. Además, la posición del ocupante en el momento del despliegue cambia su efecto. Se documenta que se desplegó y se sigue explorando igual.' },
        ],
      },
      {
        titulo: 'Del hallazgo a la decisión',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Prohibido el determinismo', texto: 'Las formulaciones del tipo «volante deformado → contusión miocárdica» o «parabrisas roto → traumatismo craneal» son incorrectas, porque convierten un hallazgo del vehículo en una lesión del paciente. Lo correcto es: «volante deformado: se explora el tórax con atención y se reevalúa». La diferencia entre las dos formulaciones es la diferencia entre una hipótesis y una invención.' },
          { tipo: 'p', texto: 'Esa información, unida a la fisiología y a la anatomía del paciente, alimenta la decisión de triaje: prioridad, recursos y centro de destino. Los criterios concretos proceden de la guía de triaje de campo adoptada y del protocolo del servicio, que es quien define qué unidad traslada a qué hospital.' },
          mnemotecnia('VEHÍCULO, OCUPANTE, ÓRGANOS. Tres colisiones en milisegundos: el vehículo contra el objeto, el ocupante contra el interior o su retención, y los órganos contra las paredes del propio cuerpo. La primera se ve al llegar, la segunda deja marcas, y la tercera —la que lesiona por dentro— no deja ninguna.'),
          masPreguntado('La tercera colisión y la prohibición del determinismo. «Volante deformado igual a contusión miocárdica» es incorrecto; lo correcto es «volante deformado: se explora el tórax con atención y se reevalúa». La diferencia entre las dos formulaciones es la diferencia entre una hipótesis y una invención.'),
        ],
      },
      erroresFrecuentes([
        ['Traducir un hallazgo del vehículo en una lesión del paciente', '«Parabrisas roto igual a traumatismo craneal» convierte una hipótesis en una invención. La formulación correcta nombra la región que se explora con atención y el compromiso de reevaluar.'],
        ['Quedarse en la colisión que se ve', 'La deformidad del vehículo describe la primera colisión y las marcas describen la segunda. La tercera no deja huella externa y es la que produce las lesiones internas que hay que sospechar y vigilar.'],
        ['Cerrar la valoración porque se desplegó la bolsa de aire', 'Alarga la detención y reduce la carga, pero no elimina la transferencia ni sustituye al cinturón, y su efecto depende de la posición del ocupante al desplegarse. Se documenta y se sigue explorando igual.'],
        ['Interpretar el fallecimiento de otro ocupante como pronóstico', 'Es información de energía del incidente, no una predicción sobre este paciente. Se documenta como tal.'],
      ]),
      repasoRapido([
        'Una colisión son tres colisiones sucesivas, en milisegundos.',
        'Primera: el vehículo contra el objeto; se deforma o se detiene, y es la que se ve al llegar.',
        'Segunda: el ocupante contra el interior o contra su retención.',
        'Tercera: los órganos contra las paredes del cuerpo, frenados contra ellas o contra sus anclajes.',
        'La tercera no deja huella externa, y es la que produce las lesiones internas que hay que vigilar.',
        'Del vehículo: intrusión en el habitáculo y en qué asiento, dato que consideran las guías de triaje.',
        'También deformidad de volante, tablero y parabrisas, y el parabrisas roto en telaraña, que obliga a explorar la cabeza.',
        'También despliegue de bolsas de aire, posición final, vuelco y distancia recorrida tras el impacto.',
        'Del ocupante: uso y colocación del cinturón —sobre la pelvis y cruzando el tórax—, marcas corporales y eyección total o parcial.',
        'También el estado de los demás ocupantes y la necesidad y duración de la extracción.',
        'La bolsa de aire no cierra la valoración y no sustituye al cinturón.',
        'Nada de esto diagnostica: alimenta el triaje —prioridad, recursos y destino— según la guía adoptada y el protocolo del servicio.',
      ]),
      preguntasOrales([
        'Describe las tres colisiones sucesivas de un choque.',
        '¿Cuál de las tres no se ve, y por qué importa?',
        'Enumera lo que aporta el vehículo como información.',
        '¿Qué sugiere un parabrisas roto en telaraña, y qué obliga a hacer?',
        '¿Cómo debe estar colocado un cinturón, y qué se anota si no lo estaba?',
        '¿Qué hace y qué no hace la bolsa de aire?',
        'Formula correctamente el hallazgo «volante deformado».',
        'Un ocupante falleció en el mismo vehículo. ¿Qué significa ese dato?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE, ACS_BEST]),
    ],
    conceptosClave: [
      { termino: 'Tres colisiones', definicion: 'Secuencia de una colisión vehicular: vehículo contra objeto, ocupante contra interior o retención, y órganos contra las paredes del cuerpo.' },
      { termino: 'Intrusión', definicion: 'Penetración de la estructura del vehículo en el habitáculo; dato considerado por las guías de triaje de campo.' },
      { termino: 'Eyección', definicion: 'Salida total o parcial de un ocupante del vehículo durante el incidente; indicador de energía elevada.' },
      { termino: 'Marca de retención', definicion: 'Huella corporal que reproduce un elemento del habitáculo o del cinturón y señala dónde se transfirió la energía.' },
    ],
    flashcards: [
      { frente: 'Las tres colisiones de un choque', reverso: 'Vehículo contra objeto, ocupante contra interior o retención, órganos contra las paredes del cuerpo.' },
      { frente: '¿Cuál de las tres no deja huella externa?', reverso: 'La tercera: la de los órganos dentro del cuerpo.' },
      { frente: '¿Qué sugiere un parabrisas roto en telaraña?', reverso: 'Contacto de la cabeza: obliga a explorarla con atención, sin declarar lesión.' },
      { frente: '¿La bolsa de aire desplegada permite reducir la exploración?', reverso: 'No: reduce la carga pero no elimina la transferencia de energía ni sustituye al cinturón.' },
      { frente: 'Formulación correcta de un hallazgo del vehículo', reverso: '«Volante deformado: se explora el tórax con atención y se reevalúa», nunca «luego hay lesión X».' },
    ],
    quiz: [
      {
        pregunta: 'Encuentras el volante deformado y el paciente refiere dolor torácico leve. ¿Cuál es la formulación correcta?',
        opciones: [
          'Contusión miocárdica por deformidad del volante.',
          'Hallazgo que obliga a explorar el tórax con atención, monitorizar según disponibilidad y protocolo, y reevaluar.',
          'Lesión descartada porque el dolor es leve.',
          'Fractura esternal confirmada.',
        ],
        correcta: 1,
        explicacion: 'El hallazgo del vehículo eleva la sospecha y dirige la exploración; no declara una lesión.',
      },
      {
        pregunta: '¿Por qué se pregunta por el estado de los demás ocupantes?',
        opciones: [
          'Para predecir las lesiones del paciente.',
          'Porque informa sobre la energía implicada en el incidente y forma parte de la valoración de la escena.',
          'Porque determina el orden de traslado sin más criterios.',
          'Porque permite calcular la velocidad exacta.',
        ],
        correcta: 1,
        explicacion: 'Es información de energía, no una predicción sobre el paciente concreto.',
      },
      {
        pregunta: 'Ocupante con el cinturón colocado sobre el abdomen en vez de sobre la pelvis. ¿Qué añade ese dato?',
        opciones: [
          'Nada: llevaba cinturón.',
          'Que la energía se transmitió a las vísceras y a la columna lumbar en vez de al hueso, lo que dirige la exploración a esas regiones.',
          'Que se descarta lesión abdominal.',
          'Que el cinturón no funcionó en absoluto.',
        ],
        correcta: 1,
        explicacion: 'La colocación del cinturón cambia hacia dónde se transfirió la carga; es un dato de búsqueda dirigida.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Llegas a una colisión frontal: intrusión importante en el lado del conductor, parabrisas roto en telaraña, bolsa de aire desplegada y cinturón puesto. El conductor está consciente y orientado. ¿Cómo traduces esa escena?',
          opciones: [
            'Paciente sin riesgo: llevaba cinturón y se desplegó la bolsa de aire.',
            'Escena de energía elevada: se documentan intrusión, parabrisas y retención; se explora con especial atención cabeza, cuello y tórax; se reevalúa y se decide destino con la guía de triaje y el protocolo.',
            'Traumatismo craneal confirmado por el parabrisas.',
            'Se pospone la valoración hasta el hospital porque el paciente está orientado.',
          ],
          correcta: 1,
          explicacion: 'Los hallazgos del vehículo se convierten en exploración dirigida, reevaluación y decisión de destino, no en diagnósticos.',
        },
        {
          pregunta: 'Uno de los ocupantes fue eyectado del vehículo. ¿Qué implica para el paciente que tú atiendes, que iba dentro?',
          opciones: [
            'Que tiene las mismas lesiones que el eyectado.',
            'Que la energía del incidente fue elevada, lo que sostiene una exploración más exhaustiva y pesa en la decisión de destino.',
            'Que no hace falta explorarlo, porque él permaneció dentro.',
            'Que debe trasladarse en último lugar.',
          ],
          correcta: 1,
          explicacion: 'La eyección de un ocupante informa de la energía del conjunto; no transfiere lesiones de un paciente a otro.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: ['Los criterios operativos de intrusión, eyección y fallecimiento de otro ocupante se atribuyen a la guía de triaje adoptada; la lección no publica umbrales propios.'],
    }),
  },

  // ============================================================
  //  10. Lesiones en motocicleta
  // ============================================================
  'm5-cin-motocicleta': {
    icono: 'cp-servier-ciclista',
    duracion: '13 min',
    resumen: 'El motociclista carece de compartimento protector: entre él y el objeto contra el que '
      + 'choca solo hay equipo de protección personal. La lección revisa los patrones de impacto '
      + 'frontal, lateral, la expulsión y el deslizamiento, además de los impactos secundarios contra '
      + 'otros vehículos u obstáculos. Explica que el casco reduce el riesgo pero no descarta lesión '
      + 'craneal ni cervical, y remite su retirada a la necesidad de vía aérea y al entrenamiento y '
      + 'protocolo del servicio.',
    objetivos: [
      'Explicar por qué la ausencia de compartimento protector cambia la lectura del incidente.',
      'Describir los patrones frontal, lateral, de expulsión y de deslizamiento.',
      'Situar correctamente el papel del casco y la decisión sobre su retirada.',
    ],
    secciones: [
      {
        titulo: 'Sin carrocería entre medias',
        bloques: [
          { tipo: 'p', texto: 'En un automóvil, la estructura del vehículo absorbe una parte importante de la energía antes de que llegue al ocupante, y el cinturón y las bolsas de aire alargan su detención. En una motocicleta no existe esa cadena: la energía llega al cuerpo casi íntegra, y lo único que se interpone es el equipo de protección personal.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se observa y se documenta',
            items: [
              'Qué equipo llevaba: casco, chaqueta, guantes, protecciones y calzado, y en qué estado quedaron.',
              'Distancia entre la motocicleta y el paciente, y entre el punto de impacto y su posición final.',
              'Marcas de arrastre en el pavimento, en la ropa y en la piel.',
              'Contra qué objeto se produjo el impacto y si hubo obstáculos posteriores.',
              'Si el casco está dañado, y dónde: es información que orienta la exploración de la cabeza.',
            ],
          },
        ],
      },
      {
        titulo: 'Los patrones',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Patrón', 'Qué ocurre', 'A qué obliga'],
            filas: [
              ['Frontal', 'La motocicleta se detiene y el conductor sigue hacia adelante, con el manillar y el depósito como puntos de contacto', 'Explorar tórax, abdomen, pelvis y miembros inferiores además de cabeza y cuello'],
              ['Lateral', 'La energía entra por un costado y puede atrapar el miembro inferior entre la moto y el objeto', 'Explorar el costado afectado y la extremidad atrapada'],
              ['Expulsión', 'El cuerpo sale despedido y recorre una distancia antes de detenerse', 'Buscar la región de primer contacto con el suelo y explorar el conjunto del cuerpo'],
              ['Deslizamiento', 'El cuerpo se desplaza sobre el pavimento tras la caída', 'Valorar lesiones cutáneas extensas, contaminación de heridas y pérdida de calor'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Los impactos secundarios cuentan', texto: 'Tras la caída, el cuerpo puede golpear otro vehículo, un bordillo, una barrera o el mobiliario urbano, o quedar en la trayectoria de otro vehículo. Ese segundo contacto puede transferir más energía que el primero y con frecuencia se olvida al reconstruir el incidente.' },
        ],
      },
      {
        titulo: 'El casco: lo que hace y lo que no',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Reduce el riesgo, no lo elimina', texto: 'El casco alarga la detención de la cabeza y reparte la carga, y por eso reduce el riesgo de lesión craneal. No descarta traumatismo craneal ni lesión cervical: un paciente con casco intacto puede tener ambas cosas, y un casco dañado indica dónde se transfirió energía, no qué se lesionó.' },
          { tipo: 'p', texto: 'Sobre su retirada, la lección no fija una técnica ni una indicación propia. Lo que sí establece es el marco: el casco se retira cuando resulta necesario para permeabilizar o manejar la vía aérea, para ventilar o para reanimar, y siempre conforme al entrenamiento recibido y al protocolo del servicio, con dos operadores cuando el procedimiento lo requiera y manteniendo la alineación durante toda la maniobra. Si no hay necesidad de vía aérea ni indicación del protocolo, no se retira por rutina.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dato para la entrega', texto: 'Si el casco se retiró, se comunica quién lo hizo, por qué y en qué momento; si no se retiró, también se dice. Quien recibe al paciente necesita saberlo antes de manipular la vía aérea o la columna cervical.' },
          mnemotecnia('SIN CARROCERÍA ENTRE MEDIAS. Lo único que se interpone entre el cuerpo y el objeto es el equipo de protección personal: no hay estructura que absorba, ni cinturón, ni bolsa de aire que alargue la detención. La energía llega al cuerpo casi íntegra.'),
          masPreguntado('El casco: reduce el riesgo de lesión craneal porque alarga la detención y reparte la carga, pero NO descarta traumatismo craneal ni lesión cervical. Y su retirada se decide por necesidad de vía aérea, ventilación o reanimación, conforme al entrenamiento y al protocolo; nunca por rutina.'),
        ],
      },
      erroresFrecuentes([
        ['Descartar lesión craneal o cervical por llevar casco', 'Un paciente con casco intacto puede tener las dos. Un casco dañado indica dónde se transfirió energía, no qué se lesionó.'],
        ['Retirar el casco por rutina', 'Se retira cuando resulta necesario para permeabilizar o manejar la vía aérea, para ventilar o para reanimar, conforme al entrenamiento y al protocolo, manteniendo la alineación. Si no hay esa necesidad ni indicación, no se retira.'],
        ['Olvidar el impacto secundario', 'Tras la caída el cuerpo puede golpear otro vehículo, un bordillo, una barrera o el mobiliario urbano. Ese segundo contacto puede transferir más energía que el primero y con frecuencia se olvida al reconstruir el incidente.'],
        ['No comunicar qué se hizo con el casco', 'Si se retiró, se dice quién, por qué y cuándo; si no se retiró, también. Quien recibe al paciente lo necesita antes de manipular vía aérea o columna cervical.'],
      ]),
      repasoRapido([
        'El motociclista no tiene compartimento protector: solo su equipo de protección personal.',
        'En un automóvil la estructura absorbe energía y el cinturón y las bolsas alargan la detención; aquí esa cadena no existe.',
        'Se documenta qué equipo llevaba —casco, chaqueta, guantes, protecciones, calzado— y en qué estado quedó.',
        'También la distancia entre la moto y el paciente y entre el impacto y su posición final.',
        'También las marcas de arrastre en pavimento, ropa y piel, y contra qué objeto se produjo el impacto.',
        'Frontal: la moto se detiene y el conductor sigue, con manillar y depósito como puntos de contacto.',
        'Lateral: la energía entra por un costado y puede atrapar el miembro inferior entre la moto y el objeto.',
        'Expulsión: el cuerpo sale despedido y recorre una distancia; se busca la región del primer contacto y se explora el conjunto.',
        'Deslizamiento: lesiones cutáneas extensas, contaminación de heridas y pérdida de calor.',
        'Los impactos secundarios cuentan y pueden transferir más energía que el primero.',
        'El casco reduce el riesgo de lesión craneal pero no descarta traumatismo craneal ni lesión cervical.',
        'Si se retiró el casco, se comunica quién, por qué y cuándo; si no, también se dice.',
      ]),
      preguntasOrales([
        'Explica por qué la ausencia de compartimento protector cambia la lectura del incidente.',
        'Describe los patrones frontal y lateral en motocicleta.',
        'Diferencia expulsión de deslizamiento y di qué buscas en cada uno.',
        '¿Por qué se olvidan los impactos secundarios y por qué importan?',
        '¿Qué hace el casco y qué no hace?',
        '¿Cuándo se retira un casco, y con qué condiciones?',
        'Enumera lo que documentas del equipo de protección y de la escena.',
        '¿Qué tiene que saber sobre el casco quien recibe al paciente?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Compartimento protector', definicion: 'Estructura del vehículo que absorbe energía antes de que alcance al ocupante; ausente en la motocicleta.' },
      { termino: 'Expulsión', definicion: 'Salida del cuerpo despedido de la motocicleta, que recorre una distancia antes de detenerse.' },
      { termino: 'Deslizamiento', definicion: 'Desplazamiento del cuerpo sobre el pavimento tras la caída, con lesiones cutáneas extensas y contaminación.' },
      { termino: 'Impacto secundario', definicion: 'Contacto posterior del cuerpo con otro vehículo u obstáculo tras la caída, que puede transferir más energía que el primero.' },
    ],
    flashcards: [
      { frente: '¿Qué falta en la motocicleta respecto al automóvil?', reverso: 'El compartimento protector: la energía llega al cuerpo casi íntegra.' },
      { frente: '¿Qué añade el deslizamiento sobre el pavimento?', reverso: 'Lesiones cutáneas extensas, contaminación de heridas y pérdida de calor.' },
      { frente: '¿El casco descarta lesión craneal o cervical?', reverso: 'No: reduce el riesgo, pero no lo elimina.' },
      { frente: '¿Cuándo se plantea retirar el casco?', reverso: 'Cuando hace falta para manejar la vía aérea, ventilar o reanimar, conforme al entrenamiento y al protocolo del servicio.' },
      { frente: '¿Qué se comunica en la entrega respecto al casco?', reverso: 'Si se retiró o no, quién lo hizo, por qué y cuándo.' },
    ],
    quiz: [
      {
        pregunta: 'Motociclista con casco intacto, consciente, tras impacto lateral y deslizamiento. ¿Qué conclusión es correcta?',
        opciones: [
          'El casco intacto descarta lesión craneal y cervical.',
          'Se explora igualmente cabeza y cuello, y se añade la valoración de lesiones cutáneas extensas y pérdida de calor por el deslizamiento.',
          'El deslizamiento solo produce lesiones superficiales sin importancia.',
          'Se retira el casco de rutina para explorar mejor.',
        ],
        correcta: 1,
        explicacion: 'El casco reduce riesgo sin descartar lesión, y el deslizamiento aporta problemas propios de piel, contaminación y temperatura.',
      },
      {
        pregunta: '¿Por qué se busca activamente el impacto secundario?',
        opciones: [
          'Porque siempre es más leve que el primero.',
          'Porque el contacto posterior contra otro vehículo u obstáculo puede transferir más energía que el impacto inicial y suele olvidarse.',
          'Porque determina el destino por sí solo.',
          'Porque permite calcular la velocidad de la motocicleta.',
        ],
        correcta: 1,
        explicacion: 'Reconstruir solo el primer contacto deja fuera una parte importante de la energía recibida.',
      },
      {
        pregunta: 'El paciente está inconsciente con el casco puesto y no puedes manejar su vía aérea. ¿Cómo procedes?',
        opciones: [
          'Nunca se retira un casco en la escena.',
          'Se plantea la retirada por necesidad de vía aérea, conforme al entrenamiento y al protocolo del servicio, manteniendo la alineación durante la maniobra.',
          'Se retira tirando de él con una sola persona.',
          'Se traslada sin intervenir en la vía aérea.',
        ],
        correcta: 1,
        explicacion: 'La necesidad de vía aérea es el marco que justifica la retirada; la técnica y la autorización pertenecen al entrenamiento y al protocolo.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El patrón en que el cuerpo se desplaza sobre el pavimento tras la caída se llama ___.',
          opciones: ['expulsión', 'deslizamiento', 'impacto frontal'],
          correcta: 1,
          explicacion: 'Añade lesiones cutáneas extensas, contaminación y pérdida de calor.',
        },
        {
          texto: 'Un casco dañado indica ___, no qué estructura se lesionó.',
          opciones: [
            'la marca del casco',
            'dónde se transfirió energía a la cabeza',
            'la velocidad exacta del impacto',
          ],
          correcta: 1,
          explicacion: 'Orienta la exploración de la cabeza; el diagnóstico requiere valoración e imagen.',
        },
        {
          texto: 'Si no hay necesidad de vía aérea ni indicación del protocolo, el casco ___.',
          opciones: ['se retira siempre en la escena', 'no se retira por rutina', 'se corta con tijeras'],
          correcta: 1,
          explicacion: 'La retirada responde a una necesidad concreta, no a una costumbre.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'La lección NO enseña una técnica de retirada de casco ni la autoriza: la remite al entrenamiento recibido y al protocolo del servicio.',
        'DECISIÓN PENDIENTE: la academia debe declarar su procedimiento de retirada de casco y el número de operadores exigido.',
      ],
    }),
  },

  // ============================================================
  //  11. Tipos de impactos en explosiones
  // ============================================================
  'm5-cin-explosiones': {
    icono: 'cp-cc0-explosivo',
    duracion: '15 min',
    resumen: 'Una explosión lesiona por varias vías a la vez, y por eso su clasificación se organiza en '
      + 'categorías: primaria por la onda de presión, secundaria por los fragmentos proyectados, '
      + 'terciaria por el desplazamiento del cuerpo y cuaternaria por todo lo demás —quemaduras, '
      + 'inhalación, aplastamiento y descompensación de enfermedades previas—. La lección explica por '
      + 'qué el espacio cerrado agrava la lesión primaria y sitúa la seguridad de la escena como '
      + 'condición previa a cualquier atención.',
    objetivos: [
      'Clasificar las lesiones por explosión en primarias, secundarias, terciarias y cuaternarias.',
      'Explicar por qué el espacio cerrado agrava la lesión por onda de presión.',
      'Aplicar la prioridad de seguridad de la escena antes de cualquier intervención.',
    ],
    secciones: [
      {
        titulo: 'Cuatro categorías, un mismo paciente',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Categoría', 'Qué la produce', 'Qué conviene buscar'],
            filas: [
              ['Primaria', 'La onda de presión de la explosión', 'Órganos con interfaz aire-líquido: oído, pulmón y víscera hueca'],
              ['Secundaria', 'Fragmentos y objetos proyectados por la explosión', 'Heridas penetrantes múltiples, en cualquier región'],
              ['Terciaria', 'Desplazamiento del propio cuerpo, que golpea contra estructuras', 'Traumatismo cerrado por el impacto de llegada'],
              ['Cuaternaria', 'Todo lo demás: quemaduras, inhalación de humo o gases, aplastamiento por derrumbe, descompensación de enfermedades previas', 'Vía aérea, quemaduras, atrapamiento y antecedentes del paciente'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Un solo paciente puede acumular las cuatro', texto: 'La clasificación no reparte pacientes en grupos: describe mecanismos que coinciden en la misma persona. Encontrar heridas por fragmentos no autoriza a dejar de buscar lesión por onda, quemadura o inhalación.' },
          { tipo: 'p', texto: 'Algunas fuentes añaden una categoría **quinaria** para efectos derivados de contaminantes o aditivos presentes en el dispositivo. La terminología no es uniforme entre publicaciones: se menciona aquí para que el alumno reconozca el término si lo encuentra, declarando que su definición depende de la fuente que se consulte.' },
        ],
      },
      {
        titulo: 'Por qué el espacio cerrado es peor',
        bloques: [
          { tipo: 'p', texto: 'En espacio abierto, la onda de presión se dispersa y pierde intensidad con la distancia. Dentro de una habitación, un vehículo o un autobús, la onda se refleja en las superficies y vuelve a alcanzar al paciente varias veces, con lo que la exposición total aumenta. A eso se suma la acumulación de humo y gases y el riesgo de derrumbe.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La lesión por onda puede no verse al principio', texto: 'La afectación de órganos con interfaz aire-líquido puede manifestarse de forma diferida. Un paciente con pocas lesiones externas tras una explosión en espacio cerrado requiere vigilancia y reevaluación, y esa es una de las razones por las que se traslada aunque parezca estar bien.' },
        ],
      },
      {
        titulo: 'Seguridad antes que asistencia',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Condiciones previas a cualquier atención',
            items: [
              'La escena de una explosión puede tener un segundo dispositivo, estructuras inestables, incendio, electricidad activa o material peligroso.',
              'El acceso se realiza cuando la escena está declarada segura por el recurso competente, conforme al procedimiento del servicio.',
              'Se identifica desde el inicio si hay más pacientes de los que el equipo puede atender, y se solicitan recursos.',
              'La sospecha de material peligroso obliga a seguir el procedimiento de respuesta correspondiente antes del contacto con los pacientes.',
              'El equipo de protección personal se adecua al riesgo identificado, no al habitual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Límite de alcance de esta lección', texto: 'La organización de la respuesta ante múltiples víctimas, el mando del incidente y el triaje masivo pertenecen al Módulo 7, cuyo alcance sigue pendiente de definición por la academia. Aquí solo se enseña a reconocer el mecanismo y a no entrar en una escena insegura.' },
          mnemotecnia('ONDA, FRAGMENTOS, VUELO Y LO DEMÁS. Primaria por la onda de presión, secundaria por los fragmentos proyectados, terciaria por el desplazamiento del propio cuerpo y cuaternaria por todo el resto. No reparte pacientes en grupos: los cuatro mecanismos pueden coincidir en la misma persona.'),
          masPreguntado('Dos cosas: que un solo paciente puede acumular las cuatro categorías, así que encontrar heridas por fragmentos no autoriza a dejar de buscar lesión por onda, quemadura o inhalación; y que en espacio cerrado la onda se refleja y aumenta la exposición total.'),
        ],
      },
      erroresFrecuentes([
        ['Cerrar la búsqueda al encontrar heridas por fragmentos', 'La clasificación describe mecanismos que coinciden en la misma persona. Hay que seguir buscando lesión por onda, quemadura, inhalación y atrapamiento.'],
        ['Dar de alta mental a un paciente con pocas lesiones externas', 'Tras una explosión en espacio cerrado, la afectación de órganos con interfaz aire-líquido puede manifestarse de forma diferida. Requiere vigilancia y reevaluación, y es una de las razones por las que se traslada aunque parezca estar bien.'],
        ['Entrar en la escena antes de que esté asegurada', 'Puede haber un segundo dispositivo, estructuras inestables, incendio, electricidad activa o material peligroso. El acceso se hace cuando el recurso competente la declara segura, conforme al procedimiento.'],
        ['Usar el equipo de protección habitual', 'Se adecua al riesgo identificado, no al de todos los días. Y la sospecha de material peligroso obliga a seguir su procedimiento antes del contacto con los pacientes.'],
      ]),
      repasoRapido([
        'Primaria: la produce la onda de presión; se buscan órganos con interfaz aire-líquido, como oído, pulmón y víscera hueca.',
        'Secundaria: fragmentos y objetos proyectados; heridas penetrantes múltiples en cualquier región.',
        'Terciaria: desplazamiento del propio cuerpo, que golpea contra estructuras; traumatismo cerrado por el impacto de llegada.',
        'Cuaternaria: quemaduras, inhalación de humo o gases, aplastamiento por derrumbe y descompensación de enfermedades previas.',
        'Un solo paciente puede acumular las cuatro: la clasificación describe mecanismos, no grupos de pacientes.',
        'Algunas fuentes añaden una categoría quinaria por contaminantes o aditivos; su definición depende de la fuente que se consulte.',
        'En espacio abierto la onda se dispersa y pierde intensidad con la distancia.',
        'En espacio cerrado se refleja en las superficies y alcanza al paciente varias veces: la exposición total aumenta.',
        'Al espacio cerrado se suman la acumulación de humo y gases y el riesgo de derrumbe.',
        'La lesión por onda puede manifestarse de forma diferida: pocas lesiones externas no cierran el caso.',
        'La escena puede tener segundo dispositivo, estructuras inestables, incendio, electricidad activa o material peligroso.',
        'Mando del incidente, respuesta ante múltiples víctimas y triaje masivo pertenecen al Módulo 7, aún sin alcance definido.',
      ]),
      preguntasOrales([
        'Clasifica las lesiones por explosión y di qué produce cada categoría.',
        '¿Por qué un solo paciente puede acumular las cuatro?',
        'Explica por qué el espacio cerrado agrava la lesión por onda de presión.',
        '¿Qué órganos se buscan en la lesión primaria y por qué esos?',
        '¿Por qué se traslada a un paciente con pocas lesiones externas?',
        'Enumera los riesgos de la escena de una explosión.',
        '¿Cuándo se accede a la escena y con qué protección?',
        '¿Qué parte de la respuesta a una explosión NO enseña esta lección, y por qué?',
      ]),
      F([PHTLS_CIN, ACS_TRIAJE, WHO_BEC]),
    ],
    conceptosClave: [
      { termino: 'Lesión primaria por explosión', definicion: 'Daño producido por la onda de presión, especialmente en órganos con interfaz aire-líquido como oído, pulmón e intestino.' },
      { termino: 'Lesión secundaria por explosión', definicion: 'Daño por fragmentos y objetos proyectados; produce heridas penetrantes múltiples.' },
      { termino: 'Lesión terciaria por explosión', definicion: 'Daño por desplazamiento del cuerpo, que impacta contra estructuras del entorno.' },
      { termino: 'Lesión cuaternaria por explosión', definicion: 'Resto de efectos: quemaduras, inhalación, aplastamiento y descompensación de enfermedades previas.' },
      { termino: 'Onda de presión', definicion: 'Frente de presión generado por la explosión, que se refleja en las superficies de un espacio cerrado y aumenta la exposición.' },
    ],
    flashcards: [
      { frente: 'Las cuatro categorías de lesión por explosión', reverso: 'Primaria por onda, secundaria por fragmentos, terciaria por desplazamiento y cuaternaria por el resto de efectos.' },
      { frente: '¿Qué órganos son más vulnerables a la lesión primaria?', reverso: 'Los que tienen interfaz aire-líquido: oído, pulmón y víscera hueca.' },
      { frente: '¿Por qué es peor una explosión en espacio cerrado?', reverso: 'Porque la onda se refleja en las superficies y alcanza al paciente varias veces, y se acumulan humo y gases.' },
      { frente: '¿Puede un paciente tener las cuatro categorías?', reverso: 'Sí: describen mecanismos que coinciden en la misma persona, no grupos de pacientes.' },
      { frente: '¿Qué condición precede a toda atención en una explosión?', reverso: 'Que la escena esté declarada segura por el recurso competente, conforme al procedimiento.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente de una explosión en un autobús, con heridas por fragmentos en miembros y sin otras lesiones aparentes. ¿Qué conducta corresponde?',
        opciones: [
          'Atender las heridas y dar de alta en el lugar.',
          'Atender las heridas y mantener la vigilancia por posible lesión por onda, que puede manifestarse de forma diferida, más aún en espacio cerrado.',
          'Descartar lesión por onda porque hay heridas visibles.',
          'Esperar a que aparezcan síntomas respiratorios antes de trasladar.',
        ],
        correcta: 1,
        explicacion: 'Las categorías coinciden en el mismo paciente y la lesión primaria puede tardar en manifestarse.',
      },
      {
        pregunta: '¿Qué categoría corresponde a un paciente que fue lanzado contra una pared por la explosión?',
        opciones: ['Primaria', 'Secundaria', 'Terciaria', 'Cuaternaria'],
        correcta: 2,
        explicacion: 'La terciaria es la producida por el desplazamiento del propio cuerpo y su impacto contra el entorno.',
      },
      {
        pregunta: 'Llegas a una explosión en un edificio con estructura visiblemente dañada y humo. ¿Cuál es la conducta correcta?',
        opciones: [
          'Entrar de inmediato: puede haber pacientes atrapados.',
          'No acceder hasta que la escena esté declarada segura por el recurso competente, solicitar recursos y prepararse conforme al procedimiento.',
          'Entrar con el equipo de protección habitual.',
          'Trasladar solo a los pacientes que salgan caminando y retirarse.',
        ],
        correcta: 1,
        explicacion: 'La seguridad de la escena precede a la asistencia; un rescatador lesionado añade un paciente y resta un recurso.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Las heridas penetrantes múltiples por objetos proyectados corresponden a la lesión ___.',
          opciones: ['primaria', 'secundaria', 'terciaria', 'cuaternaria'],
          correcta: 1,
          explicacion: 'La secundaria es la producida por fragmentos y objetos lanzados por la explosión.',
        },
        {
          texto: 'La inhalación de humo y las quemaduras se clasifican como lesión ___.',
          opciones: ['primaria', 'terciaria', 'cuaternaria'],
          correcta: 2,
          explicacion: 'La cuaternaria agrupa el resto de efectos, incluida la descompensación de enfermedades previas.',
        },
        {
          texto: 'La onda de presión daña sobre todo los órganos con interfaz ___.',
          opciones: ['hueso-músculo', 'aire-líquido', 'piel-grasa'],
          correcta: 1,
          explicacion: 'Por eso se vigilan oído, pulmón y víscera hueca.',
        },
        {
          texto: 'La organización del triaje masivo y el mando del incidente pertenecen al Módulo ___, cuyo alcance sigue pendiente de la academia.',
          opciones: ['4', '6', '7'],
          correcta: 2,
          explicacion: 'Esta lección se limita al reconocimiento del mecanismo y a la seguridad de la escena.',
        },
      ],
    },
    revision: ficha({
      version: VERSION,
      fuentes: FUENTES_FICHA,
      extra: [
        'La categoría quinaria se menciona declarando que su definición varía entre fuentes; no se le atribuye una definición única.',
        'No se invade el alcance operativo del Módulo 7, bloqueado por decisión de la academia.',
      ],
    }),
  },
}
