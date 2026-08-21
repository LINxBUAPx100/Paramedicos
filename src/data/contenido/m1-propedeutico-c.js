// ============================================================
//  Módulo 1 · Propedéutico — temas reconstruidos en la remediación
// ------------------------------------------------------------
//  Los cuatro temas de este archivo estaban ocupados por piezas del temario
//  anterior repartidas automáticamente. El caso más claro era «Posiciones,
//  líneas anatómicas y cuadrantes», que había acumulado electrocardiografía,
//  inmovilización espinal, norepinefrina, estado epiléptico, descompresión
//  torácica, oxitocina y el formato FRAP: diez temas de origen dentro de una
//  lección de terminología anatómica.
//
//  Se redactan desde cero, con el alcance que el PDF oficial le da a cada uno
//  y sin arrastrar nada de lo anterior.
//
//  Ficha editorial INLINE (`revision`): el generador la separa del contenido y
//  la cuelga del nodo. Ninguno nace validado — eso lo firma un docente.
// ============================================================

const HOY = '2026-08-16'

// Obras del catálogo de la academia (`npm run biblioteca`). Se cita la EDICIÓN
// que la academia tiene, que es la que el alumno puede abrir; la página exacta
// queda como pendiente declarado en vez de inventarse.
const MOORE = {
  nombre: 'Moore KL. Anatomía con orientación clínica, 7.ª ed. Ed. Médica Panamericana.',
  nota: 'Capítulo introductorio: posición anatómica, planos, términos de relación y regiones. '
    + 'Página exacta pendiente de precisar con el ejemplar de la academia.',
}
const PHTLS9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición declarada por el plan de estudios oficial. Capítulo de trauma de tejidos '
    + 'blandos y hemorragia; página PENDIENTE de precisar con la copia licenciada de la academia.',
}
const SEMIOLOGIA = {
  nombre: 'Conde C. Semiología y fisiopatología, 2015.',
  nota: 'Técnica de exploración y rangos de referencia de los signos vitales en el adulto.',
}
// El catálogo de la academia incluye un «Manual de Formación Profesional del
// Paramédico» que cubre buena parte de este módulo, pero SIN edición ni año
// declarados. No se cita: una referencia que no puede situarse en el tiempo no
// respalda un dato clínico. Queda pedido en las observaciones de cada tema para
// que la academia declare la edición y entonces pueda citarse.
const NOM034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, regulación de los servicios de '
    + 'salud. Atención prehospitalaria de las urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Define tipos de ambulancia, personal y equipamiento mínimo; es la norma mexicana que '
    + 'enmarca el alcance del servicio.',
}

// ---- marco jurídico del tema médico-legal ----
// Cada instrumento se cita por su nombre completo, su publicación y el punto
// concreto que respalda. No se atribuyen numerales que no se hayan comprobado.
const LGS = {
  nombre: 'Cámara de Diputados del H. Congreso de la Unión. Ley General de Salud, artículo 51 Bis 2.',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf',
  nota: 'Derecho de la persona usuaria a otorgar o no su consentimiento y a decidir libremente '
    + 'sobre la atención; regla aplicable en urgencia o incapacidad y obligación de dejar constancia.',
}
const NOM004 = {
  nombre: 'Diario Oficial de la Federación. NOM-004-SSA3-2012, Del expediente clínico (publicada '
    + 'el 15 de octubre de 2012).',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5272787&fecha=15%2F10%2F2012',
  nota: 'Criterios obligatorios de elaboración, integración, manejo, conservación, propiedad y '
    + 'confidencialidad del expediente clínico, para personal de salud de los sectores público, '
    + 'social y privado.',
}
const LFPDPPP = {
  nombre: 'Cámara de Diputados del H. Congreso de la Unión. Ley Federal de Protección de Datos '
    + 'Personales en Posesión de los Particulares, texto vigente (consultado el 16 de agosto de 2026).',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf',
  nota: 'Definición de dato personal sensible —incluye el estado de salud— y excepción de '
    + 'consentimiento para asistencia sanitaria cuando la persona titular no está en condiciones de '
    + 'otorgarlo y quien trata el dato está sujeto al secreto profesional. Artículo pendiente de '
    + 'precisar: la afirmación se toma del texto publicado, sin atribuirle un numeral no comprobado.',
}
const CNPP = {
  nombre: 'Cámara de Diputados del H. Congreso de la Unión. Código Nacional de Procedimientos '
    + 'Penales, artículo 227.',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/CNPP.pdf',
  nota: 'Define la cadena de custodia y establece que su aplicación corresponde a quienes, en '
    + 'cumplimiento de las funciones propias de su cargo o actividad, tengan contacto con indicios, '
    + 'evidencias, objetos, instrumentos o productos del hecho delictivo.',
}

export default {
  // ============================================================
  //  Toma de signos vitales
  // ============================================================
  'm1-pai-signos-vitales': {
    icono: 'ic-tension-arterial',
    duracion: '18 min',
    resumen: 'Cómo se toman los signos vitales en el ámbito prehospitalario y, sobre todo, cómo se '
      + 'interpretan: una cifra aislada no dice casi nada; la tendencia entre dos tomas lo dice casi todo.',
    objetivos: [
      'Enumerar los signos vitales que deben registrarse en toda atención prehospitalaria.',
      'Aplicar la técnica de toma de cada signo evitando los errores que falsean la cifra.',
      'Interpretar los valores en conjunto y como tendencia, no de forma aislada.',
      'Documentar cada toma con su hora para poder demostrar la evolución del paciente.',
    ],
    secciones: [
      {
        titulo: 'Qué se toma y para qué',
        bloques: [
          { tipo: 'p', texto: 'Los signos vitales son las mediciones objetivas que reflejan el funcionamiento de los sistemas que mantienen la vida. En atención prehospitalaria cumplen tres funciones distintas: detectar una alteración que no es evidente a simple vista, cuantificar la gravedad de la que ya se ve y comprobar si lo que se hizo sirvió de algo.' },
          {
            tipo: 'lista',
            titulo: 'Conjunto mínimo en toda atención',
            items: [
              'Frecuencia respiratoria, con calidad y trabajo respiratorio.',
              'Frecuencia cardiaca, con ritmo y amplitud del pulso.',
              'Presión arterial.',
              'Saturación de oxígeno por pulsioximetría, cuando se dispone del equipo.',
              'Temperatura.',
              'Estado de conciencia y pupilas.',
              'Color, temperatura y humedad de la piel, y llenado capilar.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Una toma no es una tendencia', texto: 'Un solo registro describe un instante. La información que cambia decisiones aparece al comparar dos tomas separadas en el tiempo: una frecuencia cardiaca de 110 lpm significa una cosa si antes era 95 y otra muy distinta si antes era 130.' },
        ],
      },
      {
        titulo: 'Técnica de cada signo',
        bloques: [
          { tipo: 'h3', texto: 'Frecuencia respiratoria' },
          { tipo: 'p', texto: 'Se cuenta observando el ascenso del tórax durante un minuto completo, o durante 30 segundos multiplicando por dos cuando la respiración es regular. Se cuenta sin avisar al paciente: quien se sabe observado modifica su patrón respiratorio de forma involuntaria. Una maniobra habitual es mantener los dedos sobre el pulso radial mientras en realidad se cuentan las respiraciones.' },
          { tipo: 'p', texto: 'Además del número se registra la calidad: profundidad, simetría, uso de músculos accesorios, tiraje, aleteo nasal y ruidos audibles sin estetoscopio. Un paciente con 18 respiraciones por minuto pero con tiraje intercostal marcado no tiene una respiración normal.' },

          { tipo: 'h3', texto: 'Frecuencia cardiaca' },
          { tipo: 'p', texto: 'Se palpa el pulso radial con los pulpejos de los dedos índice y medio —nunca con el pulgar, que tiene pulso propio y puede confundirse con el del paciente—. Si el pulso radial no se palpa, se busca el carotídeo, comprimiendo un solo lado y sin masajear. Se registran frecuencia, ritmo (regular o irregular) y amplitud (lleno, débil, filiforme).' },

          { tipo: 'h3', texto: 'Presión arterial' },
          { tipo: 'p', texto: 'El brazalete debe abarcar aproximadamente el 80 % de la circunferencia del brazo y cubrir dos tercios de su longitud; un brazalete pequeño sobrestima la presión y uno grande la subestima. Se coloca sobre el brazo desnudo, con el borde inferior unos dos centímetros por encima del pliegue del codo y el brazo a la altura del corazón.' },
          { tipo: 'p', texto: 'Con estetoscopio se identifica la aparición de los ruidos de Korotkoff como presión sistólica y su desaparición como diastólica. Cuando el ruido ambiental lo impide —una vía rápida, un helicóptero, un incendio—, se emplea el método palpatorio: se obtiene solo la sistólica y se registra expresamente como «TA sistólica palpada», porque no es lo mismo que una cifra auscultada.' },

          { tipo: 'h3', texto: 'Pulsioximetría' },
          { tipo: 'p', texto: 'Mide el porcentaje de hemoglobina saturada de oxígeno. Su utilidad depende de que haya flujo pulsátil en el sitio de medición, así que la hipoperfusión, la hipotermia, el temblor, el esmalte de uñas oscuro y la luz ambiental intensa producen lecturas falsas o ausentes.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que el pulsioxímetro no ve', texto: 'En la intoxicación por monóxido de carbono la carboxihemoglobina se lee como si fuera oxihemoglobina y el aparato puede marcar una saturación alta con un paciente gravemente hipóxico. En un rescate de incendio, una cifra normal no descarta intoxicación.' },

          { tipo: 'h3', texto: 'Temperatura, piel y llenado capilar' },
          { tipo: 'p', texto: 'La temperatura se toma con el método disponible, registrando cuál se usó, porque las vías axilar, timpánica y oral no son intercambiables. La piel se valora por color, temperatura y humedad. El llenado capilar se comprueba presionando el lecho ungueal hasta que palidezca y soltando; es un dato complementario, útil en el niño y poco fiable por sí solo en el adulto, sobre todo con frío ambiental.' },

          { tipo: 'h3', texto: 'Conciencia y pupilas' },
          { tipo: 'p', texto: 'El estado de conciencia se valora con la escala que use el servicio, habitualmente AVDI en la evaluación primaria. Las pupilas se exploran en cuanto a tamaño, simetría y reactividad a la luz, anotando si el paciente usa lentes de contacto o si hay antecedente de cirugía ocular, que alteran la interpretación.' },
        ],
      },
      {
        titulo: 'Errores que falsean la cifra',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Los más frecuentes',
            items: [
              'Avisar al paciente de que se le va a contar la respiración.',
              'Tomar el pulso con el pulgar.',
              'Medir la presión sobre la ropa o con un brazalete de tamaño inadecuado.',
              'Tomar la presión en un brazo con fístula, lesión, hemorragia o del lado de una mastectomía.',
              'Dar por buena una saturación en un paciente frío, en shock o con temblor.',
              'Registrar la cifra sin la hora, lo que hace imposible reconstruir la tendencia.',
              'Sustituir la exploración por el monitor: el aparato mide, la persona interpreta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La presión arterial llega tarde', texto: 'La hipotensión es un signo tardío de hipoperfusión. Un adulto joven puede mantener cifras normales mientras compensa una hemorragia importante; la taquicardia, la piel fría y húmeda y la ansiedad aparecen antes. Esperar a que la presión caiga para reconocer el shock es esperar demasiado.' },
        ],
      },
      {
        titulo: 'Registro',
        bloques: [
          { tipo: 'p', texto: 'Cada toma se anota con la hora en el registro de atención prehospitalaria. Se documenta también el método empleado cuando puede cambiar la interpretación —presión palpada, temperatura axilar, saturación con oxígeno suplementario— y el momento de cada intervención, para que la relación entre lo que se hizo y lo que cambió quede demostrada y no dependa de la memoria de nadie.' },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [{ tipo: 'fuentes', items: [SEMIOLOGIA, NOM034] }],
      },
    ],
    conceptosClave: [
      { termino: 'Signo vital', definicion: 'Medición objetiva del funcionamiento de un sistema vital, útil para detectar, cuantificar y reevaluar.' },
      { termino: 'Tendencia', definicion: 'Comparación entre dos o más tomas separadas en el tiempo; es lo que revela si el paciente mejora o empeora.' },
      { termino: 'Presión sistólica palpada', definicion: 'Cifra obtenida por palpación del pulso al desinflar el brazalete, sin estetoscopio; se registra como tal porque no equivale a una toma auscultada.' },
      { termino: 'Llenado capilar', definicion: 'Tiempo que tarda el lecho ungueal en recuperar color tras la presión; dato complementario de perfusión, más fiable en el niño que en el adulto.' },
      { termino: 'Pulso filiforme', definicion: 'Pulso de amplitud muy disminuida, difícil de palpar; sugiere volumen de eyección bajo.' },
    ],
    flashcards: [
      { frente: '¿Por qué no se avisa al paciente antes de contar su frecuencia respiratoria?', reverso: 'Porque quien se sabe observado modifica su patrón respiratorio de forma involuntaria.' },
      { frente: '¿Por qué no se toma el pulso con el pulgar?', reverso: 'Porque el pulgar tiene pulso propio y puede confundirse con el del paciente.' },
      { frente: '¿Qué proporción del brazo debe abarcar el brazalete?', reverso: 'Alrededor del 80 % de la circunferencia y dos tercios de la longitud del brazo.' },
      { frente: 'Rescate de incendio con saturación de 98 %: ¿queda descartada la hipoxia?', reverso: 'No. La carboxihemoglobina se lee como oxihemoglobina y la cifra puede ser falsamente tranquilizadora.' },
      { frente: '¿Por qué la presión arterial no sirve para detectar el shock temprano?', reverso: 'Porque la hipotensión es un signo tardío: la compensación mantiene la cifra mientras ya hay hipoperfusión.' },
      { frente: '¿Qué dato hace inútil una toma de signos vitales?', reverso: 'Que se registre sin la hora: sin hora no hay tendencia.' },
    ],
    quiz: [
      {
        pregunta: 'Cuentas la frecuencia respiratoria manteniendo los dedos en el pulso radial. ¿Por qué?',
        opciones: [
          'Para ahorrar tiempo tomando los dos signos a la vez.',
          'Para que el paciente no note que se le cuenta la respiración y no modifique su patrón.',
          'Porque la frecuencia respiratoria se calcula a partir del pulso.',
          'Porque así se detecta mejor el tiraje intercostal.',
        ],
        correcta: 1,
        explicacion: 'Saberse observado modifica el patrón respiratorio de forma involuntaria; la maniobra mantiene la observación disimulada.',
      },
      {
        pregunta: 'Paciente con 18 respiraciones por minuto, tiraje intercostal y aleteo nasal. ¿Cómo se registra?',
        opciones: [
          'Frecuencia respiratoria normal, sin más.',
          'Frecuencia dentro de rango, pero con trabajo respiratorio aumentado.',
          'Frecuencia respiratoria elevada.',
          'No se registra hasta tener el pulsioxímetro.',
        ],
        correcta: 1,
        explicacion: 'El número por sí solo no describe la respiración: la calidad y el trabajo respiratorio forman parte del signo y aquí están claramente alterados.',
      },
      {
        pregunta: 'En una vía rápida con ruido no consigues auscultar la presión. ¿Qué haces?',
        opciones: [
          'Anotas la cifra que estimes por el aspecto del paciente.',
          'Obtienes la sistólica por palpación y la registras como presión sistólica palpada.',
          'Omites la presión arterial del registro.',
          'Repites la auscultación hasta lograrla, aunque retrase el traslado.',
        ],
        correcta: 1,
        explicacion: 'El método palpatorio da solo la sistólica y debe declararse como tal, porque no equivale a una toma auscultada; estimar o callar la cifra falsea el registro.',
      },
      {
        pregunta: 'Adulto joven tras colisión: TA 120/80, FC 118, piel fría y húmeda, ansioso. ¿Qué interpretas?',
        opciones: [
          'Está estable: la presión arterial es normal.',
          'Hay signos de hipoperfusión con presión aún compensada.',
          'La taquicardia se explica solo por el susto y no requiere reevaluación.',
          'Debe esperarse a que la presión baje para actuar.',
        ],
        correcta: 1,
        explicacion: 'La hipotensión es tardía. Taquicardia, piel fría y húmeda y ansiedad son signos de hipoperfusión que aparecen mientras la presión todavía se mantiene.',
      },
      {
        pregunta: '¿Cuál de estos registros permite demostrar la evolución del paciente?',
        opciones: [
          'Una toma completa al llegar al hospital.',
          'Tomas seriadas con su hora y el método utilizado.',
          'La primera toma, que es la que refleja el estado real.',
          'El promedio de todas las tomas del traslado.',
        ],
        correcta: 1,
        explicacion: 'La tendencia solo existe si cada toma lleva hora; sin ella no puede relacionarse un cambio con una intervención.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la toma de presión arterial con estetoscopio',
        pasos: [
          'Elegir un brazo sin fístula, lesión ni hemorragia',
          'Seleccionar un brazalete del tamaño adecuado al brazo',
          'Colocarlo sobre el brazo desnudo, dos centímetros por encima del pliegue del codo',
          'Situar el brazo a la altura del corazón',
          'Insuflar y desinflar lentamente auscultando la arteria braquial',
          'Registrar la cifra con la hora y el método empleado',
        ],
      },
      completar: [
        {
          texto: 'El llenado capilar es un dato ___ de perfusión: por sí solo no basta para decidir en el adulto.',
          opciones: ['definitivo', 'complementario', 'irrelevante'],
          correcta: 1,
          explicacion: 'Es útil, sobre todo en pediatría, pero el frío ambiental y otras variables lo hacen poco fiable de forma aislada en el adulto.',
        },
      ],
    },
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'Técnica de exploración; sin cifras de corte diagnóstico',
      observaciones: [
        'Redactado desde cero: el tema estaba ocupado por piezas del temario anterior.',
        'No se fijan rangos de normalidad como umbrales de decisión; la academia debe declarar qué '
          + 'tabla de referencia adopta por grupo de edad y qué criterios de alerta usa su protocolo.',
        'Precisar la página de cada obra del catálogo cuando se revise con el ejemplar delante.',
      ],
      fuentes: [
        'Conde C. Semiología y fisiopatología, 2015 (catálogo de la academia).',
        'PENDIENTE: la academia debe declarar la edición y el año de su Manual de Formación Profesional del Paramédico para poder citarlo.',
        'NOM-034-SSA3-2013, DOF.',
      ],
    },
  },

  // ============================================================
  //  Heridas especiales
  // ============================================================
  'm1-pai-heridas-especiales': {
    icono: 'cp-servier-piel',
    duracion: '18 min',
    resumen: 'Evisceración, herida por arma de fuego y amputación: tres lesiones cuyo manejo básico se '
      + 'equivoca con frecuencia por reflejos bienintencionados que empeoran el pronóstico.',
    objetivos: [
      'Aplicar el manejo inicial de una evisceración sin reintroducir el contenido abdominal.',
      'Describir las heridas por proyectil sin atribuirles el papel de orificio de entrada o de salida.',
      'Conservar un segmento amputado en condiciones que permitan valorar el reimplante.',
      'Reconocer que en las tres lesiones la prioridad sigue siendo la evaluación primaria.',
    ],
    secciones: [
      {
        titulo: 'Antes de la herida, el paciente',
        bloques: [
          { tipo: 'p', texto: 'Las tres lesiones de este tema son visualmente impactantes, y ese es precisamente su riesgo formativo: atraen la atención y desplazan la evaluación primaria. Una evisceración impresiona más que una vía aérea comprometida, y la vía aérea mata antes. El orden no cambia: seguridad de la escena, hemorragia exanguinante, vía aérea, ventilación, circulación, déficit neurológico y exposición.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La lesión llamativa distrae', texto: 'La lesión que acapara la mirada rara vez es la que está matando al paciente. Terminar la evaluación primaria antes de dedicarse a la herida es lo que evita perder a alguien por una causa que sí se podía tratar.' },
        ],
      },
      {
        titulo: 'Evisceración',
        bloques: [
          { tipo: 'p', texto: 'La evisceración es la salida de vísceras abdominales a través de una solución de continuidad de la pared. El tejido expuesto pierde calor y humedad con rapidez, y manipularlo añade contaminación y lesión.' },
          {
            tipo: 'pasos',
            titulo: 'Manejo prehospitalario',
            items: [
              'No reintroducir el contenido expuesto en la cavidad abdominal.',
              'Retirar únicamente la ropa que impida el acceso, sin arrastrar el tejido.',
              'Cubrir con apósitos estériles humedecidos con solución salina y, sobre ellos, una capa oclusiva que conserve la humedad y el calor.',
              'Colocar al paciente en decúbito supino con las rodillas flexionadas si el resto de sus lesiones lo permite, para reducir la tensión de la pared.',
              'Prevenir la hipotermia y trasladar sin demora al centro con capacidad quirúrgica.',
              'Reevaluar el apósito durante el traslado: si se seca, deja de proteger.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué no se reintroduce', texto: 'Devolver las vísceras a la cavidad arrastra contaminación al peritoneo, puede lesionar el intestino y no aporta ningún beneficio: la reparación es quirúrgica y se hará en quirófano de todos modos.' },
        ],
      },
      {
        titulo: 'Herida por arma de fuego',
        bloques: [
          { tipo: 'p', texto: 'El daño de un proyectil no se limita al trayecto visible. La energía transmitida a los tejidos produce una cavidad temporal que puede lesionar estructuras alejadas del recorrido aparente, y el proyectil puede desviarse al chocar con hueso. Por eso el aspecto externo de la herida predice muy mal la lesión interna.' },
          {
            tipo: 'lista',
            titulo: 'Conducta en la escena',
            items: [
              'Confirmar que la escena es segura; una escena con arma de fuego no lo es hasta que la autoridad lo declara.',
              'Contar y registrar todas las heridas, incluidas espalda, axilas, periné y cuero cabelludo.',
              'Describir cada herida por su localización, tamaño y aspecto, sin clasificarla como entrada o salida.',
              'Controlar la hemorragia externa con presión directa y los medios autorizados.',
              'Trasladar precozmente: la lesión de un proyectil se resuelve en quirófano, no en la ambulancia.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No se dice «entrada» ni «salida»', texto: 'Determinar cuál orificio es de entrada corresponde al perito forense y depende de hallazgos que no se pueden valorar en la calle. Una descripción equivocada en el registro puede pesar en un proceso legal. Lo correcto es describir la herida y su ubicación.' },
          { tipo: 'p', texto: 'La escena de una lesión por arma de fuego es también una escena legal. La ropa se retira cortando por fuera de los orificios y se conserva; lo que se retire del paciente se entrega según el procedimiento del servicio. El detalle de la preservación de indicios se estudia en Aspectos médico-legales.' },
        ],
      },
      {
        titulo: 'Amputación',
        bloques: [
          { tipo: 'p', texto: 'En una amputación traumática la prioridad es el paciente, no el segmento. La hemorragia se controla primero con presión directa; si resulta insuficiente y el servicio lo autoriza, se recurre al torniquete según el procedimiento estudiado en el tema de hemorragias.' },
          {
            tipo: 'pasos',
            titulo: 'Conservación del segmento amputado',
            items: [
              'Retirar la suciedad gruesa sin frotar ni cepillar el tejido.',
              'Envolverlo en gasa estéril ligeramente humedecida con solución salina.',
              'Introducirlo en una bolsa limpia y cerrada, identificada con el nombre del paciente y la hora.',
              'Colocar esa bolsa sobre hielo dentro de otro recipiente, de modo que el segmento se enfríe sin tocar el hielo ni el agua.',
              'Trasladarlo junto con el paciente al mismo hospital.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ni congelar ni sumergir', texto: 'El contacto directo con hielo congela el tejido y lo inutiliza para el reimplante; sumergirlo en agua o en solución lo macera. El objetivo es enfriar, no congelar.' },
          { tipo: 'p', texto: 'En una amputación incompleta, el segmento que conserva unión de tejidos se alinea con suavidad, se cubre y se inmoviliza junto con la extremidad, evitando torsiones que comprometan el pedículo que aún lo irriga. No se completa la amputación en el medio prehospitalario.' },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [{ tipo: 'fuentes', items: [PHTLS9] }],
      },
    ],
    conceptosClave: [
      { termino: 'Evisceración', definicion: 'Salida de vísceras abdominales a través de una solución de continuidad de la pared; no se reintroducen en el medio prehospitalario.' },
      { termino: 'Apósito húmedo-oclusivo', definicion: 'Cobertura de gasa estéril humedecida con solución salina y una capa oclusiva encima, que conserva calor y humedad del tejido expuesto.' },
      { termino: 'Cavidad temporal', definicion: 'Desplazamiento tisular producido por la energía de un proyectil, que puede lesionar estructuras alejadas del trayecto visible.' },
      { termino: 'Amputación incompleta', definicion: 'Segmento parcialmente desprendido que conserva unión de tejidos; se alinea e inmoviliza sin completar la separación.' },
      { termino: 'Enfriamiento sin congelación', definicion: 'Conservación del segmento amputado en frío indirecto, sin contacto con hielo ni inmersión, para preservar la viabilidad del tejido.' },
    ],
    flashcards: [
      { frente: '¿Se reintroduce el contenido de una evisceración?', reverso: 'No. Se cubre con gasa estéril húmeda y una capa oclusiva; la reparación es quirúrgica.' },
      { frente: '¿Cómo se coloca al paciente eviscerado si sus otras lesiones lo permiten?', reverso: 'Decúbito supino con las rodillas flexionadas, para reducir la tensión de la pared abdominal.' },
      { frente: '¿Por qué no se describe una herida por proyectil como «de entrada»?', reverso: 'Porque esa determinación es pericial y una descripción equivocada puede pesar en un proceso legal.' },
      { frente: '¿Qué se registra de cada herida por arma de fuego?', reverso: 'Localización, tamaño y aspecto, contando todas las heridas incluidas espalda, axilas, periné y cuero cabelludo.' },
      { frente: '¿Cómo se conserva un segmento amputado?', reverso: 'Gasa estéril húmeda, bolsa cerrada e identificada, y esa bolsa sobre hielo sin contacto directo ni inmersión.' },
      { frente: '¿Qué prioridad tiene la lesión llamativa?', reverso: 'La que le toque: primero se completa la evaluación primaria, porque la herida impactante rara vez es la que mata.' },
    ],
    quiz: [
      {
        pregunta: 'Encuentras una evisceración abdominal. ¿Cuál es el manejo correcto?',
        opciones: [
          'Reintroducir las vísceras con guantes estériles y vendar.',
          'Cubrir con gasa estéril humedecida en solución salina y una capa oclusiva encima.',
          'Cubrir con gasa seca y comprimir para contener el contenido.',
          'Aplicar hielo local sobre el tejido expuesto.',
        ],
        correcta: 1,
        explicacion: 'Reintroducir arrastra contaminación al peritoneo y puede lesionar el intestino; la gasa seca se adhiere y el frío directo daña el tejido. El objetivo es conservar humedad y calor.',
      },
      {
        pregunta: 'En el registro de un paciente con dos heridas por proyectil, lo correcto es anotar:',
        opciones: [
          'Un orificio de entrada anterior y uno de salida posterior.',
          'Dos heridas descritas por localización, tamaño y aspecto.',
          'Solo la herida de mayor tamaño, que es la relevante.',
          'El calibre probable del arma según el diámetro del orificio.',
        ],
        correcta: 1,
        explicacion: 'Clasificar entrada y salida o inferir el calibre corresponde al perito forense; el prestador describe lo que observa y cuenta todas las heridas.',
      },
      {
        pregunta: 'Amputación completa de antebrazo. El segmento debe:',
        opciones: [
          'Sumergirse en solución salina fría hasta llegar al hospital.',
          'Envolverse en gasa húmeda, meterse en bolsa cerrada e ir sobre hielo sin contacto directo.',
          'Colocarse directamente sobre hielo para enfriarlo cuanto antes.',
          'Dejarse en la escena para que lo recoja la autoridad.',
        ],
        correcta: 1,
        explicacion: 'La inmersión macera el tejido y el contacto directo con hielo lo congela; ambas cosas comprometen el reimplante. Se enfría de forma indirecta y viaja con el paciente.',
      },
      {
        pregunta: 'Paciente con evisceración y respiración ruidosa y superficial. ¿Qué atiendes primero?',
        opciones: [
          'La evisceración, por el riesgo de contaminación.',
          'La vía aérea y la ventilación, dentro de la evaluación primaria.',
          'La toma completa de signos vitales.',
          'La documentación de la escena.',
        ],
        correcta: 1,
        explicacion: 'La lesión llamativa desplaza la atención, pero la secuencia no cambia: se resuelven primero las amenazas vitales de la evaluación primaria.',
      },
      {
        pregunta: 'Amputación incompleta de pie que conserva unión de tejidos. ¿Qué haces?',
        opciones: [
          'Completar la separación para poder conservar el segmento en frío.',
          'Alinear con suavidad, cubrir e inmovilizar junto con la extremidad.',
          'Aplicar torniquete de entrada aunque no haya hemorragia activa.',
          'Traccionar el segmento para recolocarlo en su posición exacta.',
        ],
        correcta: 1,
        explicacion: 'El pedículo que aún une el segmento puede estar irrigándolo. No se completa la amputación ni se manipula con tracción; se protege y se inmoviliza el conjunto.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El segmento amputado se enfría de forma ___: nunca en contacto directo con el hielo.',
          opciones: ['inmediata', 'indirecta', 'progresiva'],
          correcta: 1,
          explicacion: 'El contacto directo congela el tejido y lo inutiliza para el reimplante.',
        },
      ],
    },
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'PHTLS 9.ª ed. (edición declarada por el plan oficial)',
      observaciones: [
        'Redactado desde cero: el tema estaba formado por piezas de cinco temas del temario anterior.',
        'No se incluyen dosis ni procedimientos invasivos: el uso del torniquete se remite a su propio '
          + 'tema y al protocolo del servicio.',
        'La academia debe confirmar su procedimiento de entrega de ropa e indicios y su hospital de '
          + 'referencia para reimplantes.',
        'La biblioteca contiene PHTLS 10.ª ed., pero solo como traducción automática no citable; '
          + 'conviene que la academia decida qué edición adopta oficialmente.',
      ],
      fuentes: [
        'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
        'PENDIENTE: la academia debe declarar la edición y el año de su Manual de Formación Profesional del Paramédico para poder citarlo.',
      ],
    },
  },

  // ============================================================
  //  Aspectos médico-legales
  // ============================================================
  'm1-smu-medico-legales': {
    icono: 'cp-servier-balanza-desequilibrada',
    duracion: '18 min',
    resumen: 'Consentimiento, negativa, confidencialidad, documentación y preservación de indicios: el marco '
      + 'que convierte una atención correcta en una atención además defendible.',
    objetivos: [
      'Distinguir el consentimiento informado, la autorización por representante y la negativa de atención.',
      'Aplicar el deber de confidencialidad en la escena, en el traslado y fuera del servicio.',
      'Documentar la atención de forma que resista una revisión posterior.',
      'Preservar los indicios en una escena que además es escena legal.',
    ],
    secciones: [
      {
        titulo: 'Consentimiento',
        bloques: [
          { tipo: 'p', texto: 'La Ley General de Salud reconoce en su artículo 51 Bis 2 el derecho de la persona usuaria a otorgar o no su consentimiento respecto de tratamientos o procedimientos y a decidir libremente sobre la atención que recibe. El consentimiento informado es, por tanto, la aceptación expresa de la atención por un paciente con capacidad de decidir, después de que se le explique en lenguaje comprensible qué se le va a hacer, para qué y qué riesgos tiene.' },
          { tipo: 'p', texto: 'El mismo artículo resuelve el caso de la urgencia: cuando la persona se encuentra en estado de incapacidad transitoria o permanente, la autorización la otorga el familiar que la acompañe o su representante legal; si eso no es posible, el prestador de servicios de salud procede de inmediato a preservar la vida y la salud de la persona, dejando constancia en el expediente clínico.' },
          {
            tipo: 'lista',
            titulo: 'Formas de consentimiento',
            items: [
              'Informado o expreso: el paciente capaz acepta tras recibir la información.',
              'Por representante: lo otorga el familiar que acompaña o el representante legal cuando la persona está en incapacidad transitoria o permanente, o cuando es menor de edad.',
              'Actuación en urgencia sin autorización previa: cuando no es posible obtenerla, se procede a preservar la vida y la salud y se deja constancia escrita de por qué no se obtuvo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La constancia forma parte de la regla', texto: 'La ley no autoriza a actuar sin consentimiento y olvidarlo: exige dejar constancia. En atención prehospitalaria eso significa registrar por escrito la condición del paciente, la ausencia de familiar o representante y la razón por la que se procedió.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Capacidad, no docilidad', texto: 'Capacidad para decidir significa comprender la situación, las alternativas y las consecuencias de rechazar. Que un paciente esté asustado, molesto o en desacuerdo no lo vuelve incapaz; que esté intoxicado, hipóxico, hipoglucémico o con alteración del estado mental sí compromete su capacidad y obliga a documentarlo.' },
        ],
      },
      {
        titulo: 'Negativa de atención y de traslado',
        bloques: [
          { tipo: 'p', texto: 'Un paciente capaz puede rechazar la valoración, el tratamiento o el traslado, incluso cuando la decisión parezca desacertada. La negativa no cierra la actuación: la convierte en un procedimiento que hay que hacer bien.' },
          {
            tipo: 'pasos',
            titulo: 'Cómo se maneja una negativa',
            items: [
              'Valorar y documentar la capacidad de decisión del paciente.',
              'Descartar causas tratables de alteración mental antes de aceptar la negativa.',
              'Explicar en lenguaje llano el riesgo concreto de no aceptar la atención, incluida la posibilidad de deterioro o muerte.',
              'Ofrecer alternativas: valoración parcial, permanecer con él, avisar a un familiar, volver a llamar.',
              'Registrar la negativa con la firma del paciente y, cuando sea posible, de un testigo.',
              'Dejar por escrito qué se explicó y qué respondió el paciente, con sus propias palabras.',
              'Informar de que puede llamar de nuevo en cualquier momento sin ningún inconveniente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Abandono', texto: 'En la práctica prehospitalaria se llama abandono a retirarse de un paciente que requiere atención sin transferirlo a alguien de igual o mayor capacidad. Una negativa correctamente valorada y documentada no es abandono; irse sin más, sí. La consecuencia jurídica concreta —responsabilidad administrativa, civil o penal— depende de la legislación aplicable en la entidad y del régimen laboral del prestador, y esta lección no la determina.' },
        ],
      },
      {
        titulo: 'Confidencialidad',
        bloques: [
          { tipo: 'p', texto: 'La información del paciente —su identidad, su padecimiento, sus antecedentes, lo que dijo y lo que se encontró— pertenece al paciente. La Ley Federal de Protección de Datos Personales en Posesión de los Particulares clasifica el estado de salud como dato personal sensible, es decir, aquel cuya utilización indebida puede dar origen a discriminación o conllevar un riesgo grave para la persona.' },
          { tipo: 'p', texto: 'Esa misma ley prevé que no se requiere consentimiento para tratar datos personales cuando se trata de asistencia sanitaria o de la gestión de servicios sanitarios mientras la persona titular no está en condiciones de otorgarlo, siempre que quien trata el dato esté sujeto al secreto profesional o a una obligación equivalente. Es exactamente la situación de una atención de urgencia: la excepción permite atender y registrar, no permite divulgar.' },
          { tipo: 'p', texto: 'La NOM-004-SSA3-2012, del expediente clínico, establece criterios obligatorios de manejo, conservación y confidencialidad para el personal de salud de los sectores público, social y privado. La información se comparte con quien participa en la atención y con la autoridad competente en los supuestos que la ley establece; fuera de eso, no se comparte.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones cotidianas que la vulneran',
            items: [
              'Comentar el caso en la sala de espera, en el pasillo o delante de terceros.',
              'Fotografiar o grabar al paciente, la escena o el registro con el teléfono personal.',
              'Publicar cualquier dato en redes sociales, aunque se omita el nombre: la escena, la fecha y la lesión pueden identificar a la persona.',
              'Dejar el registro de atención a la vista o abandonarlo en la unidad.',
              'Informar por teléfono a quien dice ser familiar sin poder verificarlo.',
            ],
          },
        ],
      },
      {
        titulo: 'Documentación',
        bloques: [
          { tipo: 'p', texto: 'El registro de atención prehospitalaria es el único testimonio duradero de lo que ocurrió. Se redacta de forma objetiva: hallazgos, horas, intervenciones y respuesta del paciente. Las opiniones, los juicios sobre la conducta del paciente y las conclusiones que exigen estudios que no se hicieron no tienen lugar en él.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos normas distintas', texto: 'La NOM-004-SSA3-2012 regula el expediente clínico y fija los criterios de integración, conservación y confidencialidad del personal de salud. La atención prehospitalaria y su registro se enmarcan además en la NOM-034-SSA3-2013. Los principios documentales de la NOM-004 —objetividad, identificación de quien escribe, conservación— orientan la práctica prehospitalaria, pero el formato concreto y su cadena de resguardo los define el servicio: pregúntalos en tu academia en vez de suponerlos.' },
          {
            tipo: 'lista',
            titulo: 'Criterios de un registro defendible',
            items: [
              'Lo que no está escrito, a efectos de revisión, no se hizo.',
              'Se anota la hora de cada hallazgo y de cada intervención.',
              'Las declaraciones relevantes se transcriben entre comillas, tal como las dijo el paciente.',
              'No se altera un registro ya cerrado: los errores se corrigen mediante nota aclaratoria fechada y firmada.',
              'Se describe lo observado, no lo supuesto.',
            ],
          },
        ],
      },
      {
        titulo: 'La escena que además es escena legal',
        bloques: [
          { tipo: 'p', texto: 'En hechos posiblemente delictivos —violencia, arma de fuego, arma blanca, agresión sexual, muerte no esperada—, la escena contiene indicios que pueden decidir un proceso judicial. La atención del paciente conserva la prioridad absoluta, pero puede realizarse alterando el entorno lo menos posible.' },
          { tipo: 'p', texto: 'El Código Nacional de Procedimientos Penales define en su artículo 227 la cadena de custodia como el sistema de control y registro que se aplica al indicio, evidencia, objeto, instrumento o producto del hecho delictivo, desde su localización, descubrimiento o aportación hasta que la autoridad competente ordene su conclusión. El mismo artículo establece que aplicarla corresponde a quienes, en cumplimiento de las funciones propias de su cargo o actividad, tengan contacto con esos elementos.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué significa eso para quien atiende', texto: 'El prestador prehospitalario no sustituye a la autoridad ni asume su función pericial, pero si en el curso de la atención entra en contacto con un indicio —ropa, un objeto retirado del paciente, una superficie—, queda dentro del régimen de cadena de custodia por el solo hecho de ese contacto. Por eso lo que se toca, se registra, y lo que se entrega, se documenta.' },
          {
            tipo: 'lista',
            titulo: 'Medidas compatibles con la atención',
            items: [
              'Entrar y salir por la misma ruta y tocar únicamente lo necesario.',
              'No mover objetos que no estorben la atención; si hay que moverlos, registrar su posición original.',
              'Cortar la ropa por fuera de los orificios y desgarros, sin atravesarlos.',
              'Conservar la ropa retirada y entregarla conforme al procedimiento del servicio, sin sacudirla.',
              'No limpiar manos, cara ni superficies del paciente salvo que la atención lo exija.',
              'Documentar quién estaba presente y a quién se entregó cada cosa.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Dónde vive este contenido', texto: 'La preservación de indicios pertenece a este tema y no a cinemática del trauma: allí se estudia cómo se produce la lesión; aquí, qué obligaciones legales genera la escena.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que esta lección NO puede decidir', texto: 'Ante quién se reporta cada hecho, qué formato de registro se usa, cómo se entregan las pertenencias y qué notificaciones son obligatorias son cuestiones que dependen de la entidad federativa, de la fiscalía competente y del procedimiento de tu servicio. Esta lección no las enuncia como obligación nacional universal porque no lo son: consulta el procedimiento escrito de tu academia antes de actuar.' },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [{ tipo: 'fuentes', items: [LGS, NOM004, LFPDPPP, CNPP, NOM034] }],
      },
    ],
    conceptosClave: [
      { termino: 'Consentimiento informado', definicion: 'Aceptación expresa de la atención por un paciente capaz, tras explicársele en lenguaje comprensible qué se hará, para qué y con qué riesgos.' },
      { termino: 'Actuación en urgencia sin autorización previa', definicion: 'Conducta prevista por la Ley General de Salud cuando la persona está incapacitada y no hay familiar acompañante ni representante legal: se procede a preservar la vida y la salud, dejando constancia.' },
      { termino: 'Dato personal sensible', definicion: 'Aquel cuya utilización indebida puede originar discriminación o un riesgo grave; el estado de salud lo es conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.' },
      { termino: 'Cadena de custodia', definicion: 'Sistema de control y registro que se aplica al indicio desde su localización hasta que la autoridad competente ordena su conclusión, según el artículo 227 del Código Nacional de Procedimientos Penales.' },
      { termino: 'Capacidad de decisión', definicion: 'Aptitud para comprender la situación, las alternativas y las consecuencias de rechazar la atención; no se pierde por estar en desacuerdo.' },
      { termino: 'Abandono', definicion: 'Retirarse de un paciente que requiere atención sin transferirlo a alguien de igual o mayor capacidad.' },
      { termino: 'Nota aclaratoria', definicion: 'Corrección fechada y firmada que se añade a un registro cerrado; sustituye a la alteración del documento original.' },
    ],
    flashcards: [
      { frente: 'Persona incapacitada, sin familiar acompañante ni representante. ¿Qué dice la Ley General de Salud?', reverso: 'Que se procede de inmediato a preservar la vida y la salud, dejando constancia (artículo 51 Bis 2).' },
      { frente: '¿Qué tipo de dato personal es el estado de salud?', reverso: 'Sensible, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.' },
      { frente: '¿A quién corresponde aplicar la cadena de custodia?', reverso: 'A quienes, en cumplimiento de las funciones propias de su cargo o actividad, tengan contacto con los indicios (CNPP, artículo 227).' },
      { frente: 'Un paciente molesto rechaza el traslado. ¿Eso lo vuelve incapaz?', reverso: 'No. El desacuerdo no anula la capacidad; sí la comprometen la intoxicación, la hipoxia, la hipoglucemia o la alteración del estado mental.' },
      { frente: '¿Qué convierte una retirada en abandono?', reverso: 'Dejar a un paciente que necesita atención sin transferirlo a alguien de igual o mayor capacidad.' },
      { frente: '¿Cómo se corrige un error en un registro ya cerrado?', reverso: 'Con una nota aclaratoria fechada y firmada; el documento original no se altera.' },
      { frente: '¿Por dónde se corta la ropa en una escena posiblemente delictiva?', reverso: 'Por fuera de los orificios y desgarros, sin atravesarlos, y la ropa se conserva.' },
      { frente: '¿Por qué publicar un caso sin el nombre sigue siendo una falta?', reverso: 'Porque la escena, la fecha y la lesión pueden identificar a la persona igual que el nombre.' },
    ],
    quiz: [
      {
        pregunta: 'Adulto consciente, orientado, sin alteración del estado mental, rechaza el traslado tras una caída. ¿Qué procede?',
        opciones: [
          'Trasladarlo igualmente, porque su decisión es desacertada.',
          'Explicar el riesgo concreto, ofrecer alternativas y documentar la negativa con firma y testigo.',
          'Retirarse de inmediato: la negativa cierra la actuación.',
          'Pedir a un familiar que firme por él.',
        ],
        correcta: 1,
        explicacion: 'Un paciente capaz puede rechazar la atención. Lo que exige la ley no es convencerlo, sino valorar su capacidad, informarle del riesgo, ofrecer alternativas y dejar constancia.',
      },
      {
        pregunta: 'Paciente con hipoglucemia y desorientación que se niega a ser atendido. ¿Cómo se interpreta esa negativa?',
        opciones: [
          'Es válida: toda persona puede rechazar la atención.',
          'Su capacidad de decisión está comprometida por una causa tratable, y debe documentarse así.',
          'Debe pedirse autorización a la autoridad antes de tocarlo.',
          'Se acepta la negativa si firma el formato.',
        ],
        correcta: 1,
        explicacion: 'La alteración del estado mental por una causa tratable compromete la capacidad. Descartar y corregir esas causas es previo a aceptar cualquier negativa.',
      },
      {
        pregunta: 'Durante un traslado tomas una fotografía de la lesión «solo para estudiarla». ¿Es aceptable?',
        opciones: [
          'Sí, mientras no se vea la cara del paciente.',
          'No: la información del paciente es suya y no se registra en dispositivos personales.',
          'Sí, si se borra al terminar el turno.',
          'Sí, siempre que no se publique.',
        ],
        correcta: 1,
        explicacion: 'La confidencialidad protege toda la información del paciente, no solo su rostro o su nombre; el registro en un dispositivo personal la pone fuera de control del servicio.',
      },
      {
        pregunta: 'Al revisar tu registro adviertes que anotaste mal una hora. ¿Qué haces?',
        opciones: [
          'Borras el dato y escribes el correcto.',
          'Añades una nota aclaratoria fechada y firmada, sin alterar el original.',
          'Rehaces el registro completo con los datos correctos.',
          'Lo dejas: cambiar un registro está prohibido.',
        ],
        correcta: 1,
        explicacion: 'El documento original no se altera ni se sustituye; la corrección se hace visible mediante una nota aclaratoria que deja rastro de quién y cuándo la hizo.',
      },
      {
        pregunta: 'En una escena con arma de fuego, ¿qué medida es compatible con atender al paciente?',
        opciones: [
          'Recoger el arma y guardarla en la unidad para mayor seguridad.',
          'Entrar y salir por la misma ruta y mover solo lo que estorbe la atención, registrando su posición.',
          'Limpiar las manos del paciente antes de la exploración.',
          'Esperar a la autoridad antes de iniciar cualquier valoración.',
        ],
        correcta: 1,
        explicacion: 'La atención mantiene la prioridad, pero puede realizarse alterando el entorno lo mínimo. Manipular el arma o limpiar al paciente destruye indicios sin beneficio clínico.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Un menor de edad requiere atención y no hay ningún adulto responsable presente. Hay amenaza vital. ¿Qué procede según la Ley General de Salud?',
          opciones: [
            'Esperar necesariamente al representante legal antes de tocar al paciente.',
            'Proceder de inmediato a preservar la vida y la salud, dejando constancia.',
            'Obtener la firma de un vecino como testigo autorizante.',
            'Solicitar la autorización del despachador.',
          ],
          correcta: 1,
          explicacion: 'El artículo 51 Bis 2 prevé que, cuando no es posible obtener la autorización del familiar acompañante ni del representante legal, el prestador procede de inmediato a preservar la vida y la salud, dejando constancia de ello.',
        },
      ],
    },
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'LGS art. 51 Bis 2; NOM-004-SSA3-2012; LFPDPPP; CNPP art. 227; NOM-034-SSA3-2013',
      observaciones: [
        'Redactado desde cero: el tema quedó vacío al retirar el material heredado.',
        'Recibe el contenido de preservación de indicios que estaba mal ubicado en «Cinemática de arma '
          + 'blanca y arma de fuego» (Módulo 5).',
        'Segunda auditoría: la fundamentación descansaba solo en la NOM-034. Se sustituyó por el '
          + 'instrumento aplicable a cada afirmación —consentimiento y urgencia, expediente clínico, '
          + 'datos sensibles y cadena de custodia— y se recortaron las afirmaciones que no podían '
          + 'demostrarse.',
        'AFIRMACIONES DELIBERADAMENTE ACOTADAS: la consecuencia jurídica del abandono, la autoridad '
          + 'ante la que se reporta y las obligaciones de notificación NO se enuncian como regla '
          + 'nacional porque dependen de la entidad federativa y del servicio.',
        'BLOQUEO PARCIAL: la academia debe declarar su formato de registro prehospitalario, su '
          + 'procedimiento de entrega de pertenencias e indicios y la autoridad competente en su '
          + 'entidad. El tema se enseña sin esos datos, pero no puede validarse sin ellos.',
        'No se citan numerales de la NOM-004 ni de la LFPDPPP: se cita el instrumento y el criterio '
          + 'que sí pudo comprobarse en la publicación oficial.',
      ],
      fuentes: [
        'Ley General de Salud, artículo 51 Bis 2 (Cámara de Diputados).',
        'NOM-004-SSA3-2012, Del expediente clínico, DOF 15/10/2012.',
        'Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
        'Código Nacional de Procedimientos Penales, artículo 227.',
        'NOM-034-SSA3-2013, DOF.',
      ],
    },
  },

  // ============================================================
  //  Posiciones, líneas anatómicas y cuadrantes
  // ============================================================
  'm1-smu-posiciones-lineas': {
    icono: 'cp-cc0-paciente',
    duracion: '15 min',
    resumen: 'El lenguaje con el que se describe una localización en el cuerpo. Sin él, «una herida arriba '
      + 'del lado izquierdo» puede significar cinco cosas distintas para cinco personas.',
    objetivos: [
      'Describir la posición anatómica de referencia y explicar por qué existe.',
      'Emplear correctamente los términos de relación y los planos corporales.',
      'Ubicar un hallazgo abdominal por cuadrantes y por líneas de referencia.',
      'Sustituir las descripciones coloquiales por localizaciones anatómicas precisas.',
    ],
    secciones: [
      {
        titulo: 'La posición anatómica: por qué hace falta un punto de partida',
        bloques: [
          { tipo: 'p', texto: 'Toda descripción anatómica se hace desde una misma posición convenida: persona de pie, con la cabeza y la mirada al frente, los miembros superiores a los lados del cuerpo, las palmas de las manos hacia delante y los pies dirigidos al frente. Los términos se aplican siempre respecto de esa posición, independientemente de cómo se encuentre el paciente en la realidad.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Derecha e izquierda son las del paciente', texto: 'La lateralidad se nombra desde el punto de vista del paciente, no del observador. Una herida en «el lado derecho» está a la izquierda de quien la mira de frente. Confundirlo es una de las causas más frecuentes de error en un informe de entrega.' },
        ],
      },
      {
        titulo: 'Términos de relación',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Los que se usan a diario',
            headers: ['Término', 'Significado', 'Ejemplo'],
            filas: [
              ['Superior / inferior', 'Más cerca de la cabeza / de los pies', 'La clavícula es superior a la costilla'],
              ['Anterior / posterior', 'Hacia el frente / hacia la espalda', 'El esternón es anterior al corazón'],
              ['Medial / lateral', 'Más cerca / más lejos de la línea media', 'El dedo meñique es medial al pulgar'],
              ['Proximal / distal', 'Más cerca / más lejos de la raíz del miembro', 'La rodilla es proximal al tobillo'],
              ['Superficial / profundo', 'Más cerca / más lejos de la superficie', 'La piel es superficial al músculo'],
            ],
          },
          { tipo: 'p', texto: 'Proximal y distal se reservan para los miembros, donde existe una raíz de referencia. Para el tronco se emplean superior e inferior. Decir que el ombligo es «distal» al esternón es incorrecto: es inferior.' },
        ],
      },
      {
        titulo: 'Planos y líneas de referencia',
        bloques: [
          { tipo: 'p', texto: 'Los planos son cortes imaginarios que permiten describir la dirección de una lesión o el nivel de una exploración.' },
          {
            tipo: 'lista',
            titulo: 'Los tres planos',
            items: [
              'Sagital: divide el cuerpo en derecha e izquierda. El que pasa exactamente por la línea media se llama sagital medio.',
              'Frontal o coronal: divide el cuerpo en una parte anterior y una posterior.',
              'Transversal u horizontal: divide el cuerpo en una parte superior y una inferior.',
            ],
          },
          { tipo: 'p', texto: 'Sobre la superficie del tórax se usan además líneas verticales de referencia que permiten situar un hallazgo con precisión: la línea medioesternal, las líneas medioclaviculares —trazadas desde el punto medio de cada clavícula—, las líneas axilares anterior, media y posterior, y las líneas escapulares en la espalda. Describir un orificio «en la línea axilar media, a la altura del quinto espacio intercostal derecho» comunica una localización exacta; describirlo «en el costado» no comunica casi nada.' },
        ],
      },
      {
        titulo: 'Cuadrantes y regiones abdominales',
        bloques: [
          { tipo: 'p', texto: 'El abdomen se divide en cuatro cuadrantes trazando una línea vertical y otra horizontal que se cruzan en el ombligo: superior derecho, superior izquierdo, inferior derecho e inferior izquierdo. Es la división de uso habitual en la exploración prehospitalaria porque es rápida y no admite ambigüedad.' },
          {
            tipo: 'tabla',
            titulo: 'Referencia de contenido por cuadrante',
            headers: ['Cuadrante', 'Estructuras principales'],
            filas: [
              ['Superior derecho', 'Hígado, vesícula biliar, porción del duodeno, ángulo hepático del colon'],
              ['Superior izquierdo', 'Estómago, bazo, cola del páncreas, ángulo esplénico del colon'],
              ['Inferior derecho', 'Ciego y apéndice, uréter derecho, ovario derecho'],
              ['Inferior izquierdo', 'Colon sigmoides, uréter izquierdo, ovario izquierdo'],
            ],
          },
          { tipo: 'p', texto: 'Existe también una división más fina en nueve regiones —epigastrio, hipocondrios, mesogastrio, flancos, hipogastrio y fosas ilíacas— que se emplea sobre todo en el ámbito clínico y en la descripción del dolor abdominal.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'El cuadrante no es un diagnóstico', texto: 'Saber qué órganos hay bajo un cuadrante orienta la sospecha, no la confirma. El dolor visceral se refiere mal y una lesión de bazo puede doler en el hombro izquierdo. El cuadrante localiza el hallazgo; la impresión clínica se construye con todo lo demás.' },
        ],
      },
      {
        titulo: 'Cómo se registra en la práctica',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Del lenguaje coloquial al anatómico',
            headers: ['Descripción imprecisa', 'Descripción utilizable'],
            filas: [
              ['«Herida arriba del lado izquierdo»', '«Herida en el cuadrante superior izquierdo, a 3 cm del reborde costal»'],
              ['«Le duele la panza»', '«Dolor en fosa ilíaca derecha, con defensa a la palpación»'],
              ['«Golpe en el costado»', '«Contusión en línea axilar media derecha, a la altura del séptimo espacio intercostal»'],
              ['«Fractura del brazo, cerca de la mano»', '«Deformidad en antebrazo derecho, tercio distal»'],
            ],
          },
          { tipo: 'p', texto: 'La precisión no es una formalidad académica: el hospital que recibe al paciente decide con lo que se le comunica, y una localización ambigua obliga a repetir la exploración y retrasa la atención.' },
        ],
      },
      {
        titulo: 'Fuentes',
        bloques: [{ tipo: 'fuentes', items: [MOORE, SEMIOLOGIA] }],
      },
    ],
    conceptosClave: [
      { termino: 'Posición anatómica', definicion: 'Posición de referencia convenida —de pie, mirada al frente, palmas hacia delante— desde la que se aplican todos los términos, sea cual sea la postura real del paciente.' },
      { termino: 'Plano sagital', definicion: 'Corte imaginario que divide el cuerpo en derecha e izquierda; el que pasa por la línea media es el sagital medio.' },
      { termino: 'Proximal / distal', definicion: 'Términos reservados a los miembros: más cerca o más lejos de la raíz del miembro.' },
      { termino: 'Línea medioclavicular', definicion: 'Línea vertical trazada desde el punto medio de la clavícula; sirve para situar hallazgos torácicos con precisión.' },
      { termino: 'Cuadrantes abdominales', definicion: 'División del abdomen en cuatro sectores por dos líneas que se cruzan en el ombligo; es la referencia habitual en la exploración prehospitalaria.' },
    ],
    flashcards: [
      { frente: '¿Desde qué punto de vista se nombra la derecha y la izquierda?', reverso: 'Desde el del paciente, nunca desde el del observador.' },
      { frente: '¿Qué plano divide el cuerpo en anterior y posterior?', reverso: 'El plano frontal o coronal.' },
      { frente: '¿Es correcto decir que el ombligo es distal al esternón?', reverso: 'No. Proximal y distal se reservan para los miembros; en el tronco se dice inferior.' },
      { frente: '¿Qué órganos se sitúan bajo el cuadrante superior izquierdo?', reverso: 'Estómago, bazo, cola del páncreas y ángulo esplénico del colon.' },
      { frente: '¿Dónde se traza la línea medioclavicular?', reverso: 'Verticalmente desde el punto medio de la clavícula.' },
      { frente: '¿Qué aporta describir «línea axilar media, quinto espacio intercostal» frente a «en el costado»?', reverso: 'Una localización exacta que el hospital puede usar sin repetir la exploración.' },
    ],
    quiz: [
      {
        pregunta: 'Describes una herida «en el lado derecho del tórax». ¿A qué lado te refieres?',
        opciones: [
          'Al que queda a tu derecha mientras exploras.',
          'Al lado derecho del paciente.',
          'Depende de si el paciente está boca arriba o boca abajo.',
          'Al lado derecho según la posición en que se encontró.',
        ],
        correcta: 1,
        explicacion: 'La lateralidad se nombra siempre desde el paciente y desde la posición anatómica de referencia, sea cual sea su postura real.',
      },
      {
        pregunta: '¿Cuál de estas descripciones usa correctamente los términos de relación?',
        opciones: [
          'El ombligo es distal al esternón.',
          'La rodilla es proximal al tobillo.',
          'La piel es profunda al músculo.',
          'El meñique es lateral al pulgar.',
        ],
        correcta: 1,
        explicacion: 'Proximal y distal se aplican a los miembros y la rodilla está más cerca de la raíz que el tobillo. Las otras tres invierten el sentido del término o lo aplican al tronco.',
      },
      {
        pregunta: 'Un paciente con dolor en el cuadrante superior derecho. ¿Qué estructuras hay debajo?',
        opciones: [
          'Estómago y bazo.',
          'Hígado y vesícula biliar.',
          'Colon sigmoides y uréter izquierdo.',
          'Ciego y apéndice.',
        ],
        correcta: 1,
        explicacion: 'El cuadrante superior derecho aloja hígado, vesícula biliar, parte del duodeno y el ángulo hepático del colon.',
      },
      {
        pregunta: '¿Qué plano divide el cuerpo en una porción superior y otra inferior?',
        opciones: ['Sagital', 'Frontal', 'Transversal', 'Sagital medio'],
        correcta: 2,
        explicacion: 'El plano transversal u horizontal separa superior de inferior; el sagital separa derecha e izquierda y el frontal, anterior de posterior.',
      },
      {
        pregunta: 'Un paciente presenta dolor en el cuadrante superior izquierdo tras un golpe. ¿Qué conclusión es correcta?',
        opciones: [
          'Hay lesión de bazo confirmada.',
          'La localización orienta la sospecha, pero no confirma qué órgano está lesionado.',
          'Puede descartarse lesión abdominal si el dolor no es intenso.',
          'El dolor referido al hombro excluiría el origen abdominal.',
        ],
        correcta: 1,
        explicacion: 'El cuadrante sitúa el hallazgo y orienta; el dolor visceral se refiere mal y la impresión clínica se construye con el resto de la valoración.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Los términos proximal y distal se reservan para los ___; en el tronco se usan superior e inferior.',
          opciones: ['órganos', 'miembros', 'planos'],
          correcta: 1,
          explicacion: 'Proximal y distal necesitan una raíz de referencia, que solo existe en los miembros.',
        },
      ],
      preguntas: [
        {
          pregunta: 'Reformula «golpe en el costado» en lenguaje anatómico utilizable.',
          opciones: [
            '«Contusión lateral derecha».',
            '«Contusión en línea axilar media derecha, a la altura del séptimo espacio intercostal».',
            '«Golpe en las costillas».',
            '«Traumatismo torácico».',
          ],
          correcta: 1,
          explicacion: 'Solo esa descripción combina línea de referencia y nivel, que es lo que permite al hospital localizar el hallazgo sin repetir la exploración.',
        },
      ],
    },
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'Terminología anatómica; contenido no sujeto a actualización clínica anual',
      observaciones: [
        'Reescritura completa. El tema acumulaba piezas de diez temas del temario anterior: '
          + 'electrocardiografía, inmovilización espinal, norepinefrina, estado epiléptico, '
          + 'descompresión torácica, oxitocina y el formato FRAP. Todo ello se retiró.',
        'La referencia de contenido por cuadrante es orientativa y así se declara en el texto.',
        'Precisar la página de Moore cuando se revise con el ejemplar de la academia.',
      ],
      fuentes: [
        'Moore KL. Anatomía con orientación clínica, 7.ª ed. (catálogo de la academia).',
        'Conde C. Semiología y fisiopatología, 2015 (catálogo de la academia).',
      ],
    },
  },
}
