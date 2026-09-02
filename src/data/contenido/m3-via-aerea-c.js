// Piezas de estudio del trabajo A, del molde compartido.
import {
  erroresFrecuentes, repasoRapido, preguntasOrales, mnemotecnia, masPreguntado,
} from './moldeV2.js'

// ============================================================
//  Módulo 3 · Vía aérea — oxigenoterapia e intubación asistida
// ------------------------------------------------------------
//  Tercer y último lote de la unidad, en el orden del PDF: dispositivos de
//  oxigenoterapia, tipos de tanques e intubación de secuencia rápida.
//
//  Los tres tienen un rasgo común que condiciona su redacción: sus cifras
//  concretas —flujos por dispositivo, constantes de duración por cilindro,
//  fármacos y dosis de la secuencia rápida— dependen del equipo real de cada
//  unidad y del protocolo del servicio. Publicar una tabla memorizada que
//  después no coincide con el material de la ambulancia produce errores, así
//  que aquí se enseña el CRITERIO y se remite a la fuente que sí manda: la
//  especificación del equipo y la dirección médica.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

const AHA_BLS = {
  nombre: 'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Ventilación con bolsa-válvula-mascarilla: volumen, frecuencia y riesgo de hiperventilación.',
}
const PHTLS9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición declarada por el plan oficial. Oxigenoterapia y manejo avanzado de la vía aérea en '
    + 'el paciente traumatizado. Capítulo y página PENDIENTES de precisar con el ejemplar de la academia.',
}
const NOM034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención prehospitalaria de las '
    + 'urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Equipamiento e insumos exigidos según el tipo de ambulancia, incluido el sistema de oxígeno.',
}
const VIA_DIFICIL = {
  nombre: 'Manual de manejo de la vía aérea difícil (catálogo de la academia), consultado el 16 de '
    + 'agosto de 2026.',
  nota: 'Preparación, planificación y rescate de la vía aérea. Edición no declarada en el catálogo: '
    + 'pendiente de precisar antes de validar.',
}

const PENDIENTE_EDICION = 'Precisar capítulo y página de PHTLS al revisar con el ejemplar de la '
  + 'academia y confirmar qué edición adopta oficialmente.'

export default {
  // ============================================================
  //  Dispositivos de oxigenoterapia
  // ============================================================
  'm3-va-dispositivos-o2': {
    icono: 'cp-servier-ventilador',
    duracion: '16 min',
    resumen: 'Cómo se administra oxígeno y cómo se ventila cuando el paciente no lo hace por sí mismo: '
      + 'de las puntas nasales a la bolsa-válvula-mascarilla, y la diferencia que separa a unas de otra.',
    objetivos: [
      'Distinguir un dispositivo de aporte de oxígeno de uno de ventilación asistida.',
      'Seleccionar el dispositivo según el esfuerzo respiratorio del paciente.',
      'Aplicar la técnica de ventilación con bolsa-válvula-mascarilla y evitar la hiperventilación.',
    ],
    secciones: [
      {
        titulo: 'Dos familias que se confunden',
        bloques: [
          { tipo: 'p', texto: 'Los dispositivos de oxigenoterapia se dividen en dos grupos que resuelven problemas distintos. Unos aportan oxígeno a un paciente que respira por sí mismo; otros mueven el aire por él. Confundirlos lleva al error más frecuente de la unidad: poner una mascarilla de oxígeno a un paciente que no está ventilando.' },
          {
            tipo: 'tabla',
            titulo: 'Qué resuelve cada familia',
            headers: ['Familia', 'Requiere que el paciente respire', 'Qué corrige'],
            filas: [
              ['Aporte de oxígeno (puntas nasales, mascarillas)', 'Sí', 'Oxigenación insuficiente en quien ventila'],
              ['Ventilación asistida (bolsa-válvula-mascarilla)', 'No', 'Ventilación ausente o ineficaz'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El error que hay que desterrar', texto: 'A un paciente que no ventila, o que ventila de forma claramente insuficiente, no se le resuelve nada con una mascarilla de oxígeno: hay que ventilarlo. El oxígeno solo llega al alvéolo si alguien mueve el aire.' },
          mnemotecnia('¿RESPIRA O NO RESPIRA? Esa pregunta elige la familia entera. Si respira, se le APORTA oxígeno —puntas, mascarilla—; si no respira o lo hace de forma claramente insuficiente, se le MUEVE el aire con bolsa-válvula-mascarilla. El oxígeno solo llega al alvéolo si alguien mueve el aire.'),
        ],
      },
      {
        titulo: 'Puntas nasales y mascarillas',
        bloques: [
          { tipo: 'p', texto: 'Las puntas nasales aportan oxígeno a bajo flujo y son cómodas y bien toleradas, incluso durante el habla o la ingesta. La concentración que consigue el paciente no es fija: depende del flujo, pero también de su patrón respiratorio, porque el aire ambiente que inspira alrededor de las puntas diluye el oxígeno aportado.' },
          { tipo: 'p', texto: 'Las mascarillas cubren boca y nariz y permiten concentraciones superiores. Las que incorporan bolsa reservorio consiguen las más altas, siempre que el reservorio se llene antes de colocarla y no se colapse durante la inspiración: un reservorio que se vacía indica que el flujo es insuficiente para ese paciente.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Los flujos concretos los fija el equipo', texto: 'El rango de flujo de cada dispositivo viene determinado por su diseño y aparece en su especificación. Esta lección no publica una tabla de litros por minuto porque los dispositivos varían y una cifra memorizada de otro modelo puede dejar el reservorio sin llenar o secar la mucosa sin beneficio. Consulta la especificación del material de tu unidad y el protocolo del servicio.' },
          { tipo: 'p', texto: 'La indicación de oxígeno suplementario y el objetivo de saturación no son universales: dependen del cuadro clínico y del protocolo. Administrar oxígeno de forma rutinaria a todo paciente no es una conducta neutra, y el objetivo que adopte la academia debe quedar declarado en su protocolo.' },
        ],
      },
      {
        titulo: 'Bolsa-válvula-mascarilla',
        bloques: [
          { tipo: 'p', texto: 'La bolsa-válvula-mascarilla permite ventilar a un paciente que no lo hace o lo hace de forma insuficiente. Consta de una bolsa autoinflable, una válvula unidireccional y una mascarilla facial, y se conecta a oxígeno con reservorio para alcanzar concentraciones altas.' },
          { tipo: 'p', texto: 'Su dificultad real no está en apretar la bolsa: está en conseguir un sello facial hermético manteniendo la vía aérea abierta. Un sello deficiente hace que el aire escape y la ventilación resulte ineficaz aunque el reanimador esté insuflando.' },
          {
            tipo: 'pasos',
            titulo: 'Técnica',
            items: [
              'Colocar una cánula orofaríngea o nasofaríngea si está indicada, para mantener la vía aérea abierta.',
              'Situarse en la cabecera del paciente.',
              'Aplicar la mascarilla ajustando el puente nasal primero y después el mentón.',
              'Sellar con la técnica de dos manos siempre que haya un segundo reanimador: uno sella y sostiene la mandíbula, otro insufla.',
              'Insuflar de forma lenta y progresiva hasta ver que el tórax se eleva.',
              'Mantener la frecuencia que indique el protocolo y evitar acelerarla.',
              'Reevaluar el sello y la elevación torácica de forma continua.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Hiperventilar hace daño', texto: 'Insuflar demasiado rápido o con volumen excesivo aumenta la presión dentro del tórax, reduce el retorno venoso y favorece la insuflación gástrica, con el vómito y la aspiración que la acompañan. La referencia es la elevación visible del tórax, no la fuerza aplicada a la bolsa.' },
          masPreguntado('Dos cosas se preguntan siempre: la diferencia entre aportar oxígeno y ventilar, y que la referencia de una insuflación correcta es la ELEVACIÓN VISIBLE del tórax, no la fuerza aplicada a la bolsa ni la prisa.'),
          { tipo: 'p', texto: 'La técnica de dos personas es preferible siempre que haya personal disponible: con un solo reanimador es difícil mantener a la vez el sello, la apertura de la vía aérea y una insuflación controlada.' },
        ],
      },
      erroresFrecuentes([
        ['Poner una mascarilla a quien no ventila', 'Es el error más frecuente de la unidad. A un paciente que no ventila, o que ventila de forma claramente insuficiente, una mascarilla de oxígeno no le resuelve nada: hay que ventilarlo.'],
        ['Insuflar deprisa o con volumen excesivo', 'Sube la presión dentro del tórax, reduce el retorno venoso y favorece la insuflación gástrica, con el vómito y la aspiración que la acompañan. La referencia es la elevación visible del tórax.'],
        ['Ignorar que el reservorio se colapsa', 'Un reservorio que se vacía durante la inspiración indica que el flujo es insuficiente para ese paciente. Hay que llenarlo antes de colocar la mascarilla y vigilar que no se colapse.'],
        ['Sellar con una mano habiendo un segundo reanimador', 'Con un solo reanimador es difícil mantener a la vez el sello, la apertura de la vía aérea y una insuflación controlada. La técnica de dos personas es preferible siempre que haya personal.'],
        ['Administrar oxígeno por rutina', 'La indicación y el objetivo de saturación dependen del cuadro y del protocolo. Dar oxígeno a todo paciente no es una conducta neutra.'],
      ]),
      repasoRapido([
        'Dos familias: las que APORTAN oxígeno a quien respira y las que MUEVEN el aire por él.',
        'Las puntas nasales aportan a bajo flujo y son bien toleradas.',
        'La concentración que recibe el paciente no es fija: depende del flujo y de su patrón respiratorio.',
        'Las mascarillas con reservorio consiguen las concentraciones más altas.',
        'El reservorio se llena antes de colocar la mascarilla y no debe colapsarse al inspirar.',
        'Los flujos concretos los fija la especificación del equipo, no una cifra memorizada.',
        'La bolsa-válvula-mascarilla tiene bolsa autoinflable, válvula unidireccional y mascarilla.',
        'Su dificultad no está en apretar: está en el sello facial manteniendo la vía aérea abierta.',
        'Se coloca cánula si está indicada, y se sella ajustando primero el puente nasal.',
        'Se insufla de forma lenta y progresiva hasta ver elevarse el tórax.',
        'Hiperventilar reduce el retorno venoso y favorece la insuflación gástrica.',
        'La técnica de dos personas es preferible siempre que haya personal disponible.',
      ]),
      preguntasOrales([
        'Diferencia las dos familias de dispositivos y di qué corrige cada una.',
        '¿Por qué la concentración que recibe alguien con puntas nasales no es fija?',
        '¿Qué te dice un reservorio que se colapsa al inspirar?',
        '¿Por qué esta lección no te da una tabla de litros por minuto?',
        'Describe la ventilación con bolsa-válvula-mascarilla paso a paso.',
        '¿Dónde está la verdadera dificultad de la técnica?',
        'Explica qué daño hace hiperventilar y cuál es la referencia correcta.',
        '¿Por qué es preferible la técnica de dos personas?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [AHA_BLS, PHTLS9, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Dispositivo de aporte de oxígeno', definicion: 'Dispositivo que enriquece el aire inspirado en un paciente que respira por sí mismo.' },
      { termino: 'Bolsa-válvula-mascarilla', definicion: 'Dispositivo de ventilación asistida formado por bolsa autoinflable, válvula unidireccional y mascarilla.' },
      { termino: 'Bolsa reservorio', definicion: 'Depósito que permite alcanzar concentraciones altas de oxígeno; si se colapsa en la inspiración, el flujo es insuficiente.' },
      { termino: 'Sello facial', definicion: 'Ajuste hermético de la mascarilla; sin él la insuflación escapa y la ventilación resulta ineficaz.' },
      { termino: 'Insuflación gástrica', definicion: 'Entrada de aire al estómago por ventilación demasiado rápida o con volumen excesivo; favorece vómito y aspiración.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue a las dos familias de dispositivos?', reverso: 'Unos aportan oxígeno a quien respira; otros mueven el aire por el paciente que no ventila.' },
      { frente: 'Paciente que no ventila. ¿Basta con mascarilla de oxígeno?', reverso: 'No: hay que ventilarlo. El oxígeno solo llega al alvéolo si alguien mueve el aire.' },
      { frente: '¿Qué indica un reservorio que se colapsa en la inspiración?', reverso: 'Que el flujo es insuficiente para ese paciente.' },
      { frente: '¿Cuál es la dificultad real de la bolsa-válvula-mascarilla?', reverso: 'Conseguir un sello facial hermético manteniendo la vía aérea abierta.' },
      { frente: '¿Cuál es la referencia para el volumen de cada insuflación?', reverso: 'La elevación visible del tórax, no la fuerza aplicada a la bolsa.' },
      { frente: 'Nombra dos consecuencias de hiperventilar.', reverso: 'Reducción del retorno venoso por aumento de presión intratorácica e insuflación gástrica con riesgo de aspiración.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente inconsciente con respiraciones agónicas. Le colocas mascarilla con reservorio. ¿Es correcto?',
        opciones: [
          'Sí, aporta la concentración más alta disponible.',
          'No: no está ventilando, y hay que asistir la ventilación.',
          'Sí, si el reservorio se llena por completo.',
          'Sí, mientras se prepara la intubación.',
        ],
        correcta: 1,
        explicacion: 'Los dispositivos de aporte requieren que el paciente respire. Sin ventilación eficaz el oxígeno no llega al alvéolo por mucho que se enriquezca el aire de la mascarilla.',
      },
      {
        pregunta: 'Durante la ventilación con bolsa, el tórax apenas se eleva y se oye fuga. ¿Cuál es la causa más probable?',
        opciones: [
          'El flujo de oxígeno es bajo.',
          'El sello facial es deficiente.',
          'La bolsa es de tamaño pediátrico.',
          'La válvula unidireccional está invertida.',
        ],
        correcta: 1,
        explicacion: 'La fuga audible y la falta de elevación torácica apuntan al sello; es la dificultad principal de la técnica y mejora con dos reanimadores.',
      },
      {
        pregunta: '¿Por qué es preferible la técnica de dos personas?',
        opciones: [
          'Porque duplica el volumen insuflado.',
          'Porque con un solo reanimador es difícil mantener a la vez sello, apertura de la vía aérea e insuflación controlada.',
          'Porque permite prescindir de la cánula orofaríngea.',
          'Porque acelera la frecuencia ventilatoria.',
        ],
        correcta: 1,
        explicacion: 'Un reanimador sella y sostiene la mandíbula mientras el otro insufla, que son tareas difíciles de ejecutar bien simultáneamente.',
      },
      {
        pregunta: 'Insuflas deprisa y con fuerza «para que llegue más oxígeno». ¿Qué provocas?',
        opciones: [
          'Mejor oxigenación alveolar.',
          'Aumento de presión intratorácica, menor retorno venoso e insuflación gástrica.',
          'Reducción del espacio muerto.',
          'Mejor sello facial.',
        ],
        correcta: 1,
        explicacion: 'La hiperventilación compromete el llenado del corazón derecho y empuja aire al estómago, con riesgo de vómito y aspiración.',
      },
    ],
    actividades: null,
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'AHA 2025 (BLS de adulto); PHTLS 9.ª ed.; NOM-034-SSA3-2013',
      observaciones: [
        'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
        'DECISIÓN PENDIENTE: la academia debe declarar los flujos por dispositivo de su inventario y '
          + 'su objetivo de saturación por cuadro clínico. La lección enseña el criterio y remite a '
          + 'la especificación del equipo en vez de publicar una tabla que puede no coincidir.',
        'No se declara una frecuencia ventilatoria numérica: depende de la edad, del cuadro y del '
          + 'protocolo, y la referencia enseñada es la elevación torácica.',
        PENDIENTE_EDICION,
      ],
      fuentes: [
        'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
        'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
        'NOM-034-SSA3-2013, DOF.',
      ],
    },
  },

  // ============================================================
  //  Tipos de tanques de oxígeno
  // ============================================================
  'm3-va-tanques-o2': {
    icono: 'cp-cc0-gas',
    duracion: '14 min',
    resumen: 'El oxígeno como el recurso agotable que es: qué cilindros existen, cómo se manejan con '
      + 'seguridad y cómo se estima cuánto queda antes de quedarse sin él a mitad de un traslado.',
    objetivos: [
      'Identificar los componentes del sistema de oxígeno de una unidad.',
      'Aplicar las medidas de seguridad en el manejo de cilindros a presión.',
      'Estimar la autonomía disponible antes de iniciar un traslado.',
    ],
    secciones: [
      {
        titulo: 'El sistema, no solo el cilindro',
        bloques: [
          { tipo: 'p', texto: 'El oxígeno de una ambulancia se almacena comprimido en cilindros de acero o de aluminio, a una presión muy superior a la atmosférica. Entre el cilindro y el paciente hay una cadena de elementos, y cada uno puede fallar.' },
          {
            tipo: 'lista',
            titulo: 'Componentes',
            items: [
              'Cilindro, con su válvula y su marcado de contenido y fecha de prueba hidrostática.',
              'Regulador, que reduce la presión de salida a un valor utilizable.',
              'Manómetro, que indica la presión restante en el cilindro.',
              'Flujómetro, que ajusta el flujo administrado al paciente.',
              'Humidificador, cuando el sistema y el protocolo lo contemplan.',
              'Conexión y tubuladura hasta el dispositivo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Presión no es volumen', texto: 'El manómetro indica presión, no litros. La presión restante permite estimar el contenido porque el cilindro tiene un volumen fijo, pero el dato que interesa —cuántos minutos quedan— depende además del flujo que se esté administrando y del tamaño del cilindro.' },
          mnemotecnia('LO QUE MARCA LA AGUJA ES PRESIÓN, LO QUE IMPORTA SON MINUTOS. Y entre una cosa y otra hay tres datos que pone el servicio y no el temario: el factor del cilindro, la presión de reserva y el flujo que se está dando.'),
        ],
      },
      {
        titulo: 'Tipos de cilindro',
        bloques: [
          { tipo: 'p', texto: 'Los cilindros se identifican por una letra que corresponde a su tamaño y, por tanto, a su capacidad. Los de menor tamaño son los portátiles que acompañan a la camilla y al equipo de intervención; los de mayor tamaño son los fijos de la unidad, que alimentan la toma mural durante el traslado.' },
          { tipo: 'p', texto: 'Cada tamaño tiene un factor de conversión propio que relaciona la presión con el volumen disponible. Ese factor es una característica del cilindro y aparece en su documentación técnica: esta lección no publica una tabla de factores porque varían según el estándar del fabricante y del país, y aplicar el factor equivocado produce una estimación falsamente tranquilizadora.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué debe declarar el servicio', texto: 'Cada servicio debe tener por escrito qué cilindros usa, cuál es su factor de conversión y qué presión residual considera reserva mínima. Sin esos tres datos no puede calcularse la autonomía con seguridad.' },
        ],
      },
      {
        titulo: 'Cómo se estima la autonomía',
        bloques: [
          { tipo: 'p', texto: 'La estimación responde a una pregunta concreta: cuántos minutos de oxígeno quedan al flujo que se está usando. Se calcula restando a la presión actual la presión de reserva que el servicio establezca, multiplicando esa diferencia por el factor de conversión del cilindro y dividiendo el resultado entre el flujo administrado.' },
          {
            tipo: 'formula',
            texto: 'Minutos disponibles = (presión actual − presión de reserva) × factor del cilindro ÷ flujo',
            nota: 'El factor del cilindro y la presión de reserva los declara el servicio; el flujo es el que se está administrando en ese momento.',
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La reserva no es opcional', texto: 'Nunca se planifica un traslado contando con vaciar el cilindro. Se reserva un margen para el imprevisto: una demora en el trayecto, un cambio a un dispositivo de mayor flujo o una espera en el hospital. Quedarse sin oxígeno con el paciente conectado es una emergencia evitable.' },
          { tipo: 'p', texto: 'La comprobación se hace ANTES de salir, no en camino: presión del cilindro fijo, presión del portátil, funcionamiento del regulador y existencia de un cilindro de repuesto. Forma parte de la revisión de la unidad al inicio del turno.' },
        ],
      },
      {
        titulo: 'Seguridad',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Reglas del manejo de cilindros',
            items: [
              'Sujetar siempre el cilindro: uno suelto que cae y rompe su válvula se convierte en un proyectil.',
              'No usar grasas, aceites ni lubricantes derivados del petróleo en las conexiones: el oxígeno a presión los hace inflamables.',
              'Mantenerlo alejado de fuentes de calor y de llama; el oxígeno no arde, pero hace que todo lo demás arda mucho más rápido.',
              'Abrir la válvula despacio y comprobar que no hay fugas audibles.',
              'No manipular una válvula dañada ni intentar reparar un regulador.',
              'Comprobar la fecha de prueba hidrostática y retirar de servicio el cilindro caducado.',
              'Almacenar y transportar el cilindro asegurado en su soporte, nunca suelto en el compartimento.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Ambiente enriquecido en oxígeno', texto: 'En un habitáculo cerrado con oxígeno a alto flujo, la concentración ambiental sube. Una chispa en ese entorno tiene consecuencias que no tendría al aire libre. Es una razón práctica para no administrar flujos altos sin indicación.' },
        ],
      },
      erroresFrecuentes([
        ['Leer el manómetro como si marcara litros', 'Marca presión. La presión permite estimar el contenido porque el cilindro tiene volumen fijo, pero los minutos dependen además del flujo administrado y del tamaño del cilindro.'],
        ['Aplicar un factor de conversión de otro cilindro', 'El factor es una característica del cilindro y varía según el estándar del fabricante y del país. Aplicar el equivocado da una estimación falsamente tranquilizadora, que es peor que no calcular nada.'],
        ['Planificar contando con vaciar el cilindro', 'Siempre se reserva margen para el imprevisto: una demora, un cambio a un dispositivo de mayor flujo o una espera en el hospital. Quedarse sin oxígeno con el paciente conectado es una emergencia evitable.'],
        ['Comprobar en camino', 'La revisión se hace ANTES de salir: presión del fijo, presión del portátil, funcionamiento del regulador y existencia de repuesto. Forma parte de la revisión de la unidad al inicio del turno.'],
        ['Usar grasa o aceite en las conexiones', 'El oxígeno a presión hace inflamables los derivados del petróleo. Y un cilindro suelto que cae y rompe su válvula se convierte en un proyectil.'],
      ]),
      repasoRapido([
        'El sistema es una cadena: cilindro, regulador, manómetro, flujómetro, conexión y dispositivo.',
        'El manómetro indica PRESIÓN, no litros.',
        'Los cilindros se identifican por una letra que corresponde a su tamaño.',
        'Cada tamaño tiene su propio factor de conversión, que aparece en su documentación técnica.',
        'El servicio debe declarar por escrito qué cilindros usa, su factor y su presión de reserva.',
        'Minutos disponibles = (presión actual − presión de reserva) × factor del cilindro ÷ flujo.',
        'La reserva no es opcional: nunca se planifica vaciar el cilindro.',
        'La comprobación se hace antes de salir, no en camino.',
        'El cilindro va siempre sujeto en su soporte, nunca suelto.',
        'Nada de grasas ni aceites derivados del petróleo en las conexiones.',
        'El oxígeno no arde, pero hace que todo lo demás arda mucho más rápido.',
        'Se comprueba la fecha de prueba hidrostática y se retira el cilindro caducado.',
      ]),
      preguntasOrales([
        'Enumera los elementos que hay entre el cilindro y el paciente.',
        '¿Qué indica exactamente el manómetro y qué no indica?',
        '¿Por qué no basta la presión para saber cuántos minutos quedan?',
        'Di la fórmula de la autonomía y de dónde sale cada dato.',
        '¿Qué tres datos tiene que declarar el servicio por escrito?',
        '¿Por qué la presión de reserva no es opcional?',
        '¿Cuándo se comprueba el oxígeno de la unidad?',
        'Enumera las medidas de seguridad en el manejo de cilindros.',
        '¿Por qué preocupa un ambiente enriquecido en oxígeno dentro de la ambulancia?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [NOM034, PHTLS9] }] },
    ],
    conceptosClave: [
      { termino: 'Regulador', definicion: 'Elemento que reduce la presión de salida del cilindro a un valor utilizable.' },
      { termino: 'Manómetro', definicion: 'Indicador de la presión restante en el cilindro; no indica litros ni minutos directamente.' },
      { termino: 'Factor de conversión del cilindro', definicion: 'Constante propia de cada tamaño que relaciona presión con volumen disponible; la declara la documentación técnica.' },
      { termino: 'Presión de reserva', definicion: 'Margen de presión que no se planifica consumir, establecido por el servicio.' },
      { termino: 'Prueba hidrostática', definicion: 'Verificación periódica del cilindro cuya fecha determina si sigue apto para el servicio.' },
    ],
    flashcards: [
      { frente: '¿Qué indica el manómetro?', reverso: 'La presión restante en el cilindro, no los litros ni los minutos disponibles.' },
      { frente: '¿De qué depende la autonomía en minutos?', reverso: 'De la presión disponible, del factor de conversión del cilindro y del flujo que se esté administrando.' },
      { frente: '¿Por qué no se usan grasas ni aceites en las conexiones?', reverso: 'Porque el oxígeno a presión los hace inflamables.' },
      { frente: '¿Por qué se sujeta siempre el cilindro?', reverso: 'Porque si cae y se rompe la válvula se convierte en un proyectil.' },
      { frente: '¿Cuándo se comprueba el oxígeno disponible?', reverso: 'Antes de salir, como parte de la revisión de la unidad; nunca en camino.' },
      { frente: '¿Arde el oxígeno?', reverso: 'No arde por sí mismo, pero hace que todo lo demás arda mucho más rápido.' },
    ],
    quiz: [
      {
        pregunta: 'El manómetro del portátil marca una presión intermedia. ¿Qué te dice sobre los minutos disponibles?',
        opciones: [
          'Directamente los minutos que quedan.',
          'Nada por sí solo: hacen falta el factor del cilindro y el flujo administrado.',
          'Los litros exactos disponibles.',
          'Que puede iniciarse cualquier traslado.',
        ],
        correcta: 1,
        explicacion: 'La presión permite estimar el contenido, pero los minutos dependen además del tamaño del cilindro y del flujo que se esté usando.',
      },
      {
        pregunta: 'Una conexión del regulador cuesta enroscar. ¿Qué NO debes hacer?',
        opciones: [
          'Comprobar que las roscas son las correctas.',
          'Aplicar grasa o aceite para facilitar el ajuste.',
          'Revisar si falta una junta.',
          'Retirar el equipo de servicio si está dañado.',
        ],
        correcta: 1,
        explicacion: 'Las grasas y aceites derivados del petróleo se vuelven inflamables en presencia de oxígeno a presión.',
      },
      {
        pregunta: '¿Por qué se establece una presión de reserva?',
        opciones: [
          'Para prolongar la vida útil del cilindro.',
          'Para no planificar un traslado contando con vaciarlo y cubrir imprevistos.',
          'Porque el manómetro pierde precisión a presión baja.',
          'Para cumplir la prueba hidrostática.',
        ],
        correcta: 1,
        explicacion: 'Una demora, un cambio a mayor flujo o una espera en el hospital consumen más de lo previsto; quedarse sin oxígeno con el paciente conectado es evitable.',
      },
      {
        pregunta: 'Un cilindro suelto cae en el compartimento y golpea su válvula. ¿Cuál es el riesgo principal?',
        opciones: [
          'Que se contamine el oxígeno.',
          'Que la rotura de la válvula lo convierta en un proyectil.',
          'Que se pierda la lectura del manómetro.',
          'Que caduque la prueba hidrostática.',
        ],
        correcta: 1,
        explicacion: 'La liberación brusca del gas a presión propulsa el cilindro; por eso se transporta y se almacena siempre asegurado en su soporte.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Los minutos disponibles se obtienen restando la presión de ___ a la presión actual, multiplicando por el factor del cilindro y dividiendo entre el flujo.',
          opciones: ['salida', 'reserva', 'trabajo'],
          correcta: 1,
          explicacion: 'La presión de reserva es el margen que el servicio decide no consumir.',
        },
      ],
    },
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'NOM-034-SSA3-2013; especificaciones técnicas del equipo de cada servicio',
      observaciones: [
        'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
        'DECISIÓN PENDIENTE: la academia debe declarar qué cilindros usan sus unidades, el factor de '
          + 'conversión de cada uno y la presión de reserva que adopta. La fórmula se enseña; las '
          + 'constantes no se publican porque varían por fabricante y estándar.',
        'No se declaran presiones de llenado ni capacidades en litros por la misma razón.',
        PENDIENTE_EDICION,
      ],
      fuentes: [
        'NOM-034-SSA3-2013, DOF.',
        'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
      ],
    },
  },

  // ============================================================
  //  Intubación de secuencia rápida o asistida farmacológicamente
  // ============================================================
  'm3-va-isr': {
    icono: 'dg-secuencia-intubacion',
    duracion: '18 min',
    resumen: 'Qué es la secuencia rápida, por qué su seguridad depende de la preparación y no de los '
      + 'fármacos, y por qué su protocolo farmacológico concreto solo puede darlo la dirección médica.',
    objetivos: [
      'Definir la intubación de secuencia rápida y su diferencia con la intubación sin fármacos.',
      'Enumerar las fases de preparación que determinan su seguridad.',
      'Reconocer las condiciones institucionales que su ejecución exige.',
    ],
    secciones: [
      {
        titulo: 'Qué es y qué la distingue',
        bloques: [
          { tipo: 'p', texto: 'La intubación de secuencia rápida es la administración prácticamente simultánea de un fármaco que induce inconsciencia y de un bloqueador neuromuscular, con el fin de conseguir en poco tiempo condiciones óptimas para la laringoscopia en un paciente que conserva reflejos.' },
          { tipo: 'p', texto: 'Su diferencia con la intubación sin fármacos no es de técnica sino de consecuencias: al paralizar al paciente se elimina su respiración espontánea. Desde ese momento, la ventilación depende íntegramente del equipo. Si la intubación falla y además no se consigue ventilar, no hay marcha atrás posible hasta que el bloqueo revierta.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La decisión que precede a todo', texto: 'Antes de plantear una secuencia rápida hay que responder a una pregunta: si no consigo intubar, ¿puedo ventilar a este paciente? Si la respuesta no es claramente afirmativa, la secuencia rápida no es la opción segura.' },
          masPreguntado('La pregunta que resume el tema entero: si no consigo intubar, ¿puedo VENTILAR a este paciente? Porque el bloqueo neuromuscular elimina la respiración espontánea y no hay marcha atrás hasta que revierta. Lo que se evalúa aquí es esa decisión, no la técnica.'),
        ],
      },
      {
        titulo: 'La seguridad está en la preparación',
        bloques: [
          { tipo: 'p', texto: 'La literatura de vía aérea coincide en que el resultado de una secuencia rápida se decide antes de administrar nada. La preparación se organiza en fases que se completan en orden y se verifican en voz alta.' },
          {
            tipo: 'lista',
            titulo: 'Fases de la preparación',
            items: [
              'Valoración de la vía aérea: buscar los datos que anticipan dificultad para intubar y, sobre todo, dificultad para ventilar.',
              'Preparación del material: aspiración montada, laringoscopio comprobado, tubos de dos calibres, dispositivo supraglótico de rescate accesible y equipo de acceso transtraqueal si el servicio lo autoriza.',
              'Preparación del equipo humano: reparto explícito de funciones y plan de rescate acordado en voz alta antes de empezar.',
              'Preoxigenación: conseguir el mejor margen posible antes de que desaparezca la respiración espontánea.',
              'Optimización del paciente: posición, corrección de lo corregible y anticipación del deterioro hemodinámico.',
              'Administración de los fármacos que el protocolo autorice, en el orden que ese protocolo establezca.',
              'Laringoscopia, confirmación con métodos combinados y fijación.',
              'Cuidados posteriores: sedación de mantenimiento según protocolo, vigilancia continua y reevaluación tras cada movilización.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El rescate se prepara antes, no después', texto: 'El dispositivo supraglótico y el material de acceso transtraqueal se dejan abiertos y al alcance ANTES de administrar el bloqueador. Buscarlos después, con el paciente ya paralizado, es perder el tiempo que precisamente falta.' },
        ],
      },
      {
        titulo: 'Lo que esta lección no puede darte',
        bloques: [
          { tipo: 'p', texto: 'Esta página no enumera fármacos, dosis, concentraciones ni tiempos de inicio y duración. No es una omisión: es la única conducta defendible. La elección del inductor y del bloqueador, sus dosis por peso, sus ajustes según la situación hemodinámica y sus contraindicaciones dependen del protocolo autorizado de cada servicio, del inventario real de la unidad y de la dirección médica que responde por esa indicación.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Una dosis correcta fuera de contexto también es insegura', texto: 'Publicar una cifra tomada de un protocolo ajeno enseña una práctica que después no coincide con el material ni con la autorización del alumno. En este procedimiento, una discordancia así no produce un error académico: produce un paciente paralizado que nadie puede ventilar.' },
          {
            tipo: 'lista',
            titulo: 'Condiciones institucionales que exige el procedimiento',
            items: [
              'Autorización expresa del alcance profesional del prestador.',
              'Protocolo escrito con fármacos, dosis, secuencia y criterios de indicación y contraindicación.',
              'Dirección médica identificable que respalde la indicación.',
              'Equipamiento completo de vía aérea, incluido el material de rescate.',
              'Entrenamiento periódico y registro de la competencia.',
              'Sistema de verificación y de análisis de los casos realizados.',
            ],
          },
          { tipo: 'p', texto: 'Mientras esas condiciones no estén declaradas, el contenido farmacológico de este tema permanece pendiente de la academia. Lo que sí se enseña —qué es la secuencia rápida, qué compromete, cómo se prepara y qué exige— es lo que permite entenderla y reconocer cuándo no debe intentarse.' },
        ],
      },
      erroresFrecuentes([
        ['Plantearla sin poder responder a la pregunta previa', 'Si no consigo intubar, ¿puedo ventilar a este paciente? Si la respuesta no es claramente afirmativa, la secuencia rápida no es la opción segura.'],
        ['Valorar solo la dificultad para intubar', 'Lo que decide la seguridad es sobre todo la dificultad para VENTILAR: es lo único que queda cuando el bloqueo ya eliminó la respiración espontánea.'],
        ['Empezar sin el plan de rescate acordado en voz alta', 'El reparto de funciones y qué se hace si falla se acuerdan ANTES de administrar nada. Improvisarlo con el paciente ya paralizado es improvisarlo en el peor momento.'],
        ['Confundirla con una intubación más', 'La diferencia no es de técnica sino de consecuencias: no hay marcha atrás hasta que el bloqueo revierta.'],
      ]),
      repasoRapido([
        'Es la administración prácticamente simultánea de un inductor y un bloqueador neuromuscular.',
        'Busca condiciones óptimas para la laringoscopia en un paciente que conserva reflejos.',
        'Su diferencia con la intubación sin fármacos es de consecuencias, no de técnica.',
        'Al paralizar se elimina la respiración espontánea: la ventilación pasa a depender del equipo.',
        'Si falla la intubación y además no se consigue ventilar, no hay marcha atrás hasta que revierta el bloqueo.',
        'La pregunta previa: si no consigo intubar, ¿puedo ventilar a este paciente?',
        'El resultado se decide antes de administrar nada.',
        'Valoración de la vía aérea: dificultad para intubar y, sobre todo, para ventilar.',
        'Material: aspiración, laringoscopio, dos calibres de tubo, supraglótico de rescate y acceso transtraqueal si se autoriza.',
        'Equipo humano: funciones repartidas y plan de rescate en voz alta.',
        'Preoxigenación para ganar margen antes de perder la respiración espontánea.',
        'Optimización del paciente: posición, lo corregible y anticipar el deterioro hemodinámico.',
      ]),
      preguntasOrales([
        'Define la intubación de secuencia rápida.',
        '¿En qué se diferencia de una intubación sin fármacos? No hables de técnica.',
        '¿Qué pierde el paciente en el momento en que actúa el bloqueador?',
        '¿Cuál es la pregunta que hay que responder antes de plantearla?',
        'Enumera las fases de preparación.',
        '¿Por qué importa más anticipar la dificultad para ventilar que para intubar?',
        '¿Para qué sirve la preoxigenación en esta secuencia?',
        '¿Por qué el plan de rescate se dice en voz alta y antes de empezar?',
      ]),

      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [VIA_DIFICIL, PHTLS9, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Intubación de secuencia rápida', definicion: 'Administración prácticamente simultánea de un inductor y un bloqueador neuromuscular para obtener condiciones óptimas de laringoscopia en poco tiempo.' },
      { termino: 'Bloqueador neuromuscular', definicion: 'Fármaco que suprime la actividad muscular voluntaria, incluida la respiración espontánea.' },
      { termino: 'Preoxigenación', definicion: 'Fase que busca el mayor margen posible de oxígeno antes de perder la respiración espontánea.' },
      { termino: 'Plan de rescate', definicion: 'Conducta acordada en voz alta antes de administrar fármacos, con el material correspondiente ya accesible.' },
      { termino: 'Dirección médica', definicion: 'Instancia que autoriza y respalda la indicación de los procedimientos que exceden el alcance básico.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue a la secuencia rápida de la intubación sin fármacos?', reverso: 'Que elimina la respiración espontánea: desde ese momento la ventilación depende íntegramente del equipo.' },
      { frente: '¿Cuál es la pregunta previa a plantear una secuencia rápida?', reverso: 'Si no consigo intubar, ¿puedo ventilar a este paciente?' },
      { frente: '¿Cuándo se prepara el material de rescate?', reverso: 'Antes de administrar el bloqueador, abierto y al alcance.' },
      { frente: '¿Por qué esta lección no publica dosis?', reverso: 'Porque dependen del protocolo autorizado, del inventario de la unidad y de la dirección médica; una cifra ajena produce un paciente paralizado que nadie puede ventilar.' },
      { frente: 'Nombra tres condiciones institucionales que exige el procedimiento.', reverso: 'Autorización del alcance profesional, protocolo escrito y dirección médica identificable (además de equipamiento, entrenamiento y verificación).' },
    ],
    quiz: [
      {
        pregunta: '¿Cuál es la consecuencia principal de administrar un bloqueador neuromuscular?',
        opciones: [
          'Mejora la oxigenación de forma inmediata.',
          'Se elimina la respiración espontánea y la ventilación pasa a depender del equipo.',
          'Reduce el riesgo de aspiración a cero.',
          'Permite prescindir de la preoxigenación.',
        ],
        correcta: 1,
        explicacion: 'Al suprimir la actividad muscular desaparece la respiración espontánea; si además no se consigue ventilar, no hay marcha atrás hasta que el bloqueo revierta.',
      },
      {
        pregunta: 'Antes de plantear una secuencia rápida, ¿qué pregunta hay que responder?',
        opciones: [
          '¿Cuál es el calibre del tubo?',
          'Si no consigo intubar, ¿puedo ventilar a este paciente?',
          '¿Cuánto dura el traslado?',
          '¿Hay capnografía disponible?',
        ],
        correcta: 1,
        explicacion: 'La capacidad de ventilar tras un intento fallido es lo que determina si el procedimiento es seguro en ese paciente.',
      },
      {
        pregunta: '¿En qué momento debe estar accesible el dispositivo supraglótico de rescate?',
        opciones: [
          'Tras el primer intento fallido.',
          'Antes de administrar el bloqueador neuromuscular.',
          'Solo si se anticipa vía aérea difícil.',
          'Al llegar al hospital.',
        ],
        correcta: 1,
        explicacion: 'Buscar el material de rescate con el paciente ya paralizado consume exactamente el tiempo que falta.',
      },
      {
        pregunta: '¿Por qué esta lección no incluye una tabla de fármacos y dosis?',
        opciones: [
          'Porque son datos irrelevantes para el alumno.',
          'Porque dependen del protocolo autorizado, del inventario de la unidad y de la dirección médica.',
          'Porque la secuencia rápida no usa fármacos.',
          'Porque las dosis son idénticas en todos los servicios.',
        ],
        correcta: 1,
        explicacion: 'Una cifra tomada de un protocolo ajeno enseña una práctica que no coincide con el material ni con la autorización del alumno.',
      },
    ],
    actividades: null,
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'Preparación y planificación de vía aérea; farmacología pendiente de protocolo',
      observaciones: [
        'Redactado desde cero en la remediación de 2026; el tema estaba vacío. Recibe además el '
          + 'contenido de secuencia rápida que el reparto automático había depositado en «Apertura de '
          + 'vía aérea y control de cervicales», reescrito desde cero.',
        'BLOQUEO PARCIAL DECLARADO: el contenido FARMACOLÓGICO del tema (fármacos, dosis, '
          + 'concentraciones, tiempos, contraindicaciones y secuencia de administración) queda '
          + 'pendiente hasta que la academia entregue su protocolo autorizado y su dirección médica. '
          + 'La lección se enseña sin él y lo declara expresamente.',
        'ALCANCE: el procedimiento no queda autorizado por estudiarlo; la lección enumera las '
          + 'condiciones institucionales que exige y no atribuye competencias.',
        PENDIENTE_EDICION,
      ],
      fuentes: [
        'Manual de manejo de la vía aérea difícil (catálogo de la academia).',
        'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
        'NOM-034-SSA3-2013, DOF.',
      ],
    },
  },
}
