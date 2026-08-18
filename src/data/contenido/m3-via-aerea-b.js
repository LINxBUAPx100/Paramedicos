// ============================================================
//  Módulo 3 · Vía aérea — métodos mecánicos avanzados y transtraqueal
// ------------------------------------------------------------
//  Segundo lote de la unidad, en el orden del PDF: técnica de intubación,
//  hojas y tubos, mascarilla laríngea, obturador esofágico y cricotirotomía
//  con aguja.
//
//  Estos cinco temas son los de mayor riesgo clínico de la unidad y comparten
//  una regla que se repite en cada página porque no es retórica: NINGUNO de
//  estos procedimientos está autorizado por el hecho de haberlo estudiado. El
//  alcance depende de la certificación del prestador, del tipo de unidad
//  —la NOM-034 distingue el equipamiento por tipo de ambulancia— y de la
//  dirección médica del servicio. El plan pide enseñarlos; enseñarlos no es
//  autorizarlos.
//
//  Por eso aquí NO se declaran dosis, ni números de hoja por edad, ni calibres
//  concretos: se enseña el criterio de selección y se remite al inventario y al
//  protocolo del servicio. Inventar una tabla de tamaños que después no
//  coincide con el equipo real es peor que no darla.
// ============================================================

const HOY = '2026-08-16'

const PHTLS9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Edición declarada por el plan oficial. Manejo de vía aérea en el paciente traumatizado y '
    + 'criterios de dispositivo avanzado. Capítulo y página PENDIENTES de precisar con el ejemplar '
    + 'de la academia.',
}
const AHA_BLS = {
  nombre: 'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support',
  nota: 'Prioridad de la oxigenación y de la ventilación eficaz sobre el dispositivo empleado.',
}
const VIA_DIFICIL = {
  nombre: 'Manual de manejo de la vía aérea difícil (catálogo de la academia), consultado el 16 de '
    + 'agosto de 2026.',
  nota: 'Reconocimiento de la vía aérea difícil y secuencia de rescate. La edición no está declarada '
    + 'en el catálogo: pendiente de precisar antes de validar.',
}
const NOM034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención prehospitalaria de las '
    + 'urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Equipamiento y personal exigidos según el tipo de ambulancia; delimita qué material está '
    + 'disponible y quién puede emplearlo.',
}

const ALCANCE = 'ALCANCE: el procedimiento no queda autorizado por estudiarlo. Depende de la '
  + 'certificación del prestador, del tipo de unidad y de la dirección médica; la lección lo declara '
  + 'expresamente y no fija competencias.';
const PENDIENTE_EDICION = 'Precisar capítulo y página de PHTLS al revisar con el ejemplar de la '
  + 'academia y confirmar qué edición adopta oficialmente.'

const ficha = (extra = []) => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'PHTLS 9.ª ed.; AHA 2025 (BLS de adulto); NOM-034-SSA3-2013',
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    ALCANCE,
    ...extra,
    PENDIENTE_EDICION,
  ],
  fuentes: [
    'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
    'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
    'NOM-034-SSA3-2013, DOF.',
  ],
})

export default {
  // ============================================================
  //  Técnica de intubación
  // ============================================================
  'm3-va-tecnica-intubacion': {
    icono: '🔦',
    duracion: '20 min',
    resumen: 'La secuencia de la intubación orotraqueal y, sobre todo, las dos cosas que la vuelven '
      + 'segura: preparar antes de intentar y confirmar después de colocar.',
    objetivos: [
      'Enumerar la preparación previa a un intento de intubación.',
      'Describir la secuencia de la laringoscopia directa y su límite de tiempo.',
      'Confirmar la posición del tubo con más de un método.',
      'Reconocer las complicaciones inmediatas y la conducta ante un intento fallido.',
    ],
    secciones: [
      {
        titulo: 'Qué resuelve y qué cuesta',
        bloques: [
          { tipo: 'p', texto: 'La intubación orotraqueal coloca un tubo en la tráquea, con lo que se obtiene una vía aérea permeable, se permite ventilar con presión positiva de forma controlada y se reduce —sin eliminarlo— el riesgo de aspiración. A cambio, es el procedimiento de vía aérea con más complicaciones inmediatas del ámbito prehospitalario: cada intento produce hipoxia, estimula respuestas hemodinámicas y consume tiempo.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'La intubación no es el objetivo', texto: 'El objetivo es oxigenar y ventilar. Un paciente bien ventilado con bolsa-mascarilla y cánula está mejor atendido que uno con tres intentos de intubación fallidos y desaturación repetida. Si la ventilación con dispositivo básico es eficaz, intubar puede esperar al hospital.' },
          { tipo: 'p', texto: 'Su indicación, quién puede realizarla y en qué unidades se dispone del material dependen del alcance del prestador, del protocolo del servicio y del tipo de ambulancia. Esta lección enseña la técnica; no autoriza a ejecutarla.' },
        ],
      },
      {
        titulo: 'Preparación: lo que decide el resultado',
        bloques: [
          { tipo: 'p', texto: 'La mayor parte de las complicaciones de la intubación prehospitalaria se originan antes del primer intento. Preparar significa dejar el material comprobado y al alcance, oxigenar al paciente y decidir de antemano qué se hará si el intento falla.' },
          {
            tipo: 'lista',
            titulo: 'Comprobaciones previas',
            items: [
              'Aspiración montada, encendida y al alcance de la mano.',
              'Laringoscopio con la luz comprobada y hoja del tipo y tamaño elegidos.',
              'Tubo del calibre previsto y uno de calibre inferior preparado; globo comprobado y jeringa lista.',
              'Guía o estilete si el protocolo lo contempla, sin sobresalir del extremo del tubo.',
              'Bolsa-válvula-mascarilla conectada a oxígeno y funcionando.',
              'Dispositivo de confirmación disponible y fijación del tubo preparada.',
              'Plan de rescate acordado en voz alta: qué se hace si no se consigue.',
              'Oxigenación previa del paciente con el mejor método disponible.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Anticipar la vía aérea difícil', texto: 'Antes de intentar conviene valorar los datos que anticipan dificultad: apertura bucal limitada, cuello corto o inmovilizado, obesidad, sangre o vómito en la vía aérea, trauma facial, edema o antecedente de dificultad previa. Reconocerlo cambia el plan; descubrirlo a mitad del intento, no.' },
        ],
      },
      {
        titulo: 'Secuencia',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Laringoscopia e inserción',
            items: [
              'Colocar la cabeza en la posición que permita el mejor alineamiento posible, respetando la restricción cervical cuando esté indicada.',
              'Sostener el laringoscopio con la mano izquierda e introducir la hoja por la comisura derecha.',
              'Desplazar la lengua hacia la izquierda y avanzar visualizando estructuras.',
              'Traccionar en la dirección del mango, sin apoyarse en los dientes ni hacer palanca.',
              'Identificar la epiglotis y las cuerdas vocales.',
              'Introducir el tubo con la mano derecha viendo cómo pasa entre las cuerdas.',
              'Retirar la guía si se utilizó e inflar el globo con el volumen mínimo que selle.',
              'Confirmar la posición antes de fijar y comenzar la ventilación.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El intento tiene límite', texto: 'Un intento no puede prolongarse mientras el paciente dessatura. Se establece de antemano un límite de tiempo y de saturación acordado con el protocolo del servicio; alcanzado ese límite, se interrumpe, se ventila con bolsa-mascarilla y se replantea. Insistir en el mismo intento es la vía más rápida a una hipoxia grave.' },
          { tipo: 'p', texto: 'La palanca sobre los incisivos superiores es el error técnico más frecuente y el que rompe dientes; la tracción se hace en el eje del mango. La elección del tipo de hoja y del calibre del tubo se trata en el tema siguiente de esta unidad.' },
        ],
      },
      {
        titulo: 'Confirmación y fijación',
        bloques: [
          { tipo: 'p', texto: 'Ningún método aislado confirma con certeza la posición del tubo. La confirmación se hace combinando métodos y se repite después de cada movilización del paciente, porque un tubo bien colocado puede desplazarse al pasar a la camilla o al subir a la unidad.' },
          {
            tipo: 'lista',
            titulo: 'Métodos que se combinan',
            items: [
              'Visualización directa del paso del tubo entre las cuerdas vocales.',
              'Auscultación en epigastrio primero y después en ambos campos pulmonares, comparando lados.',
              'Elevación simétrica del tórax con cada insuflación.',
              'Capnografía continua en forma de onda, cuando el servicio dispone de ella; es el método más fiable de confirmación y de vigilancia continua.',
              'Empañamiento del tubo, que orienta pero no confirma por sí solo.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Ruidos en epigastrio', texto: 'Si al insuflar se auscultan ruidos en epigastrio y no entra aire en el tórax, el tubo está en el esófago: se retira, se ventila con bolsa-mascarilla y se replantea. Una intubación esofágica no reconocida es una causa evitable de muerte.' },
          { tipo: 'p', texto: 'Si la entrada de aire es asimétrica y está disminuida en el hemitórax izquierdo, lo más probable es una intubación selectiva del bronquio derecho: se desinfla el globo, se retira el tubo unos centímetros, se vuelve a inflar y se reevalúa. Después de fijar, se registra la profundidad a la altura de los dientes para poder detectar un desplazamiento posterior.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, AHA_BLS, VIA_DIFICIL, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Intubación orotraqueal', definicion: 'Colocación de un tubo en la tráquea a través de la boca bajo visión laringoscópica.' },
      { termino: 'Preoxigenación', definicion: 'Oxigenación del paciente antes del intento, para disponer de margen mientras dura la laringoscopia.' },
      { termino: 'Intubación selectiva', definicion: 'Progresión excesiva del tubo hasta un bronquio principal, habitualmente el derecho, con ventilación asimétrica.' },
      { termino: 'Capnografía en forma de onda', definicion: 'Método continuo de confirmación y vigilancia de la posición del tubo, cuando el servicio dispone de él.' },
      { termino: 'Plan de rescate', definicion: 'Conducta acordada de antemano para el caso de intento fallido, antes de iniciar la laringoscopia.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el objetivo real del manejo de la vía aérea?', reverso: 'Oxigenar y ventilar; el dispositivo es un medio, no la meta.' },
      { frente: '¿Qué debe estar montado y encendido antes de intentar?', reverso: 'La aspiración, al alcance de la mano.' },
      { frente: '¿Dónde se ausculta primero al confirmar?', reverso: 'En el epigastrio; después en ambos campos pulmonares comparando lados.' },
      { frente: '¿Qué método de confirmación es el más fiable cuando se dispone de él?', reverso: 'La capnografía continua en forma de onda.' },
      { frente: 'Entrada de aire disminuida en el hemitórax izquierdo tras intubar. ¿Qué sospechas?', reverso: 'Intubación selectiva del bronquio derecho: desinflar, retirar unos centímetros, reinflar y reevaluar.' },
      { frente: '¿Cuál es el error técnico que rompe dientes?', reverso: 'Hacer palanca sobre los incisivos superiores en vez de traccionar en el eje del mango.' },
    ],
    quiz: [
      {
        pregunta: 'Llevas 40 segundos de laringoscopia y el paciente está desaturando. ¿Qué haces?',
        opciones: [
          'Continuar: ya casi visualizas las cuerdas.',
          'Interrumpir el intento, ventilar con bolsa-mascarilla y replantear.',
          'Introducir el tubo a ciegas siguiendo la línea media.',
          'Pedir un tubo de mayor calibre.',
        ],
        correcta: 1,
        explicacion: 'El intento tiene un límite acordado de tiempo y saturación. Insistir mientras el paciente desatura es la vía más rápida a una hipoxia grave.',
      },
      {
        pregunta: 'Tras colocar el tubo auscultas ruidos en epigastrio y no entra aire en el tórax. ¿Qué significa?',
        opciones: [
          'Que el globo está poco inflado.',
          'Que el tubo está en el esófago: se retira y se ventila con bolsa-mascarilla.',
          'Que hay una intubación selectiva derecha.',
          'Que hace falta aumentar el volumen de insuflación.',
        ],
        correcta: 1,
        explicacion: 'Es una intubación esofágica y no reconocerla es una causa evitable de muerte; se retira el tubo y se recupera la ventilación con dispositivo básico.',
      },
      {
        pregunta: '¿Por qué se confirma la posición del tubo con más de un método?',
        opciones: [
          'Por exigencia del registro.',
          'Porque ningún método aislado confirma con certeza la posición.',
          'Porque la auscultación es innecesaria si hay capnografía.',
          'Porque el empañamiento del tubo es concluyente.',
        ],
        correcta: 1,
        explicacion: 'Los métodos se combinan y la comprobación se repite tras cada movilización; el empañamiento orienta pero no confirma.',
      },
      {
        pregunta: 'Paciente que se ventila bien con bolsa-mascarilla y cánula orofaríngea, con traslado corto. ¿Qué es correcto?',
        opciones: [
          'Intubar siempre antes de trasladar.',
          'Mantener la ventilación eficaz: intubar puede esperar si el dispositivo básico funciona.',
          'Retirar la cánula para intentar la intubación.',
          'Intubar solo si el paciente tiene reflejo nauseoso.',
        ],
        correcta: 1,
        explicacion: 'El objetivo es oxigenar y ventilar. Una ventilación básica eficaz es preferible a intentos repetidos con desaturación.',
      },
      {
        pregunta: '¿Qué forma parte de la preparación y no del intento?',
        opciones: [
          'La tracción en el eje del mango.',
          'Acordar en voz alta el plan de rescate si el intento falla.',
          'El paso del tubo entre las cuerdas.',
          'El inflado del globo.',
        ],
        correcta: 1,
        explicacion: 'El plan de rescate se decide antes de empezar; descubrir a mitad del intento que no hay plan es lo que convierte una dificultad en una emergencia.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia de un intento de intubación',
        pasos: [
          'Comprobar material y acordar el plan de rescate',
          'Oxigenar al paciente con el mejor método disponible',
          'Introducir la hoja por la comisura derecha desplazando la lengua',
          'Identificar epiglotis y cuerdas vocales',
          'Pasar el tubo bajo visión directa',
          'Inflar el globo con el volumen mínimo que selle',
          'Confirmar con métodos combinados y fijar',
          'Registrar la profundidad a la altura de los dientes',
        ],
      },
    },
    revision: ficha([
      'No se declaran calibres, profundidades en centímetros ni límites de tiempo numéricos: '
        + 'dependen del paciente y del protocolo del servicio, y la lección remite a ellos.',
      'La farmacología de la intubación asistida NO está aquí: tiene su propio tema en esta unidad.',
    ]),
  },

  // ============================================================
  //  Tipos de hojas y tamaños de tubo endotraqueal
  // ============================================================
  'm3-va-hojas-tubos': {
    icono: '📏',
    duracion: '14 min',
    resumen: 'Cómo se elige la hoja del laringoscopio y el calibre del tubo, y por qué la elección se hace '
      + 'sobre el paciente y sobre el inventario real de la unidad, no sobre una tabla memorizada.',
    objetivos: [
      'Diferenciar la hoja curva de la recta por su punto de apoyo y su indicación.',
      'Explicar los criterios que gobiernan la elección del calibre del tubo.',
      'Justificar por qué siempre se prepara un calibre alternativo.',
    ],
    secciones: [
      {
        titulo: 'Dos hojas, dos formas de levantar la epiglotis',
        bloques: [
          { tipo: 'p', texto: 'El laringoscopio no abre la vía aérea: aparta la lengua y levanta la epiglotis para dejar a la vista la entrada de la laringe. Las dos familias de hojas hacen eso de manera distinta.' },
          {
            tipo: 'tabla',
            titulo: 'Hoja curva y hoja recta',
            headers: ['', 'Curva', 'Recta'],
            filas: [
              ['Dónde se apoya la punta', 'En la valécula, delante de la epiglotis', 'Directamente sobre la epiglotis'],
              ['Cómo eleva la epiglotis', 'Indirectamente, traccionando del ligamento de la valécula', 'Directamente, cargándola con la punta'],
              ['Perfil habitual de uso', 'Adulto y adolescente', 'Lactante y niño pequeño, y adultos con epiglotis larga o poco visible'],
              ['Ventaja', 'Menos estímulo directo de la epiglotis', 'Control directo de una epiglotis flexible o grande'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué la recta en el niño pequeño', texto: 'La epiglotis del lactante es proporcionalmente más grande, más flexible y con una angulación distinta, de modo que cargarla directamente con una hoja recta suele dar mejor visión que intentar levantarla desde la valécula. Las particularidades pediátricas completas corresponden al Módulo 6.' },
          { tipo: 'p', texto: 'El número de la hoja indica su longitud. La talla adecuada es la que permite alcanzar la valécula o la epiglotis sin quedarse corta ni introducirse en exceso, y se comprueba sobre el paciente. La disponibilidad de números concretos depende del inventario de cada unidad.' },
        ],
      },
      {
        titulo: 'Elección del tubo',
        bloques: [
          { tipo: 'p', texto: 'El calibre de un tubo endotraqueal se expresa por su diámetro interno en milímetros. Un tubo demasiado grueso lesiona la mucosa, dificulta el paso y puede no atravesar la zona más estrecha; uno demasiado fino aumenta la resistencia al flujo, dificulta la aspiración de secreciones y sella peor.' },
          {
            tipo: 'lista',
            titulo: 'Criterios que gobiernan la elección',
            items: [
              'Edad y tamaño del paciente, con las referencias que el protocolo del servicio adopte.',
              'Estado de la vía aérea: el edema o el trauma pueden obligar a un calibre menor.',
              'Indicación: si se prevé aspirar secreciones espesas, un calibre demasiado fino es una limitación.',
              'Disponibilidad real en la unidad.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Siempre un calibre alternativo preparado', texto: 'Se prepara el tubo previsto y otro de calibre inferior. Descubrir que el tubo no pasa cuando ya se está en laringoscopia obliga a interrumpir el intento; tenerlo listo convierte ese contratiempo en un cambio de segundos.' },
          { tipo: 'p', texto: 'Esta lección no fija una tabla de calibres por edad. Las referencias varían entre fuentes y ediciones, y una tabla memorizada que no coincide con el material de la ambulancia produce errores. La academia debe declarar qué referencia adopta y el prestador debe conocer el inventario de su unidad.' },
        ],
      },
      {
        titulo: 'El globo y la comprobación previa',
        bloques: [
          { tipo: 'p', texto: 'Los tubos con globo sellan la vía aérea y permiten ventilar con presión positiva sin fuga significativa; los tubos sin globo se emplean en determinados grupos de edad según la referencia que adopte el servicio. Antes de cada uso, el globo se comprueba inflándolo y desinflándolo: un globo que no sella descubierto durante el procedimiento obliga a repetir la intubación.' },
          { tipo: 'p', texto: 'Al inflar se emplea el volumen mínimo que consiga sellar. Un globo sobreinflado transmite presión a la mucosa traqueal y puede comprometer su irrigación; su control durante el traslado depende del equipo disponible y del protocolo del servicio.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, VIA_DIFICIL, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Valécula', definicion: 'Espacio entre la base de la lengua y la epiglotis donde se apoya la punta de la hoja curva.' },
      { termino: 'Hoja curva', definicion: 'Hoja que se apoya en la valécula y eleva la epiglotis de forma indirecta; perfil habitual de uso en el adulto.' },
      { termino: 'Hoja recta', definicion: 'Hoja que carga directamente la epiglotis; perfil habitual de uso en el lactante y el niño pequeño.' },
      { termino: 'Diámetro interno', definicion: 'Medida en milímetros que expresa el calibre de un tubo endotraqueal.' },
      { termino: 'Volumen mínimo de sellado', definicion: 'Aire justo necesario para que el globo selle, sin transmitir presión excesiva a la mucosa traqueal.' },
    ],
    flashcards: [
      { frente: '¿Dónde se apoya la punta de la hoja curva?', reverso: 'En la valécula, delante de la epiglotis, que eleva de forma indirecta.' },
      { frente: '¿Y la de la hoja recta?', reverso: 'Directamente sobre la epiglotis, cargándola con la punta.' },
      { frente: '¿Por qué la hoja recta suele preferirse en el lactante?', reverso: 'Porque su epiglotis es proporcionalmente mayor, más flexible y con angulación distinta.' },
      { frente: '¿Qué expresa el calibre de un tubo endotraqueal?', reverso: 'Su diámetro interno en milímetros.' },
      { frente: '¿Qué problema da un tubo demasiado fino?', reverso: 'Aumenta la resistencia al flujo, dificulta aspirar secreciones y sella peor.' },
      { frente: '¿Por qué se prepara siempre un calibre inferior?', reverso: 'Para no tener que interrumpir el intento si el tubo previsto no pasa.' },
    ],
    quiz: [
      {
        pregunta: 'Usas una hoja curva. ¿Dónde apoyas la punta?',
        opciones: [
          'Sobre la epiglotis, cargándola.',
          'En la valécula, delante de la epiglotis.',
          'Sobre las cuerdas vocales.',
          'En la comisura derecha de la boca.',
        ],
        correcta: 1,
        explicacion: 'La hoja curva eleva la epiglotis de forma indirecta desde la valécula; cargarla directamente es la técnica de la hoja recta.',
      },
      {
        pregunta: 'Durante la laringoscopia el tubo previsto no atraviesa la zona más estrecha. ¿Qué evita interrumpir el intento?',
        opciones: [
          'Forzar el paso con la guía.',
          'Tener preparado un tubo de calibre inferior.',
          'Aumentar la tracción del laringoscopio.',
          'Cambiar a hoja recta.',
        ],
        correcta: 1,
        explicacion: 'La preparación de un calibre alternativo convierte el contratiempo en un cambio de segundos en vez de en un intento perdido.',
      },
      {
        pregunta: '¿Qué riesgo tiene sobreinflar el globo?',
        opciones: [
          'Que el tubo se desplace hacia el bronquio derecho.',
          'Que se transmita presión a la mucosa traqueal y se comprometa su irrigación.',
          'Que aumente el espacio muerto.',
          'Que impida auscultar el epigastrio.',
        ],
        correcta: 1,
        explicacion: 'Se infla con el volumen mínimo que selle, precisamente para no comprimir la mucosa traqueal.',
      },
      {
        pregunta: '¿Por qué esta lección no da una tabla de calibres por edad?',
        opciones: [
          'Porque el calibre no depende de la edad.',
          'Porque las referencias varían entre fuentes y una tabla que no coincide con el material real produce errores.',
          'Porque el calibre lo decide el hospital receptor.',
          'Porque todos los tubos son intercambiables.',
        ],
        correcta: 1,
        explicacion: 'La academia debe declarar qué referencia adopta y el prestador debe conocer el inventario de su propia unidad.',
      },
    ],
    actividades: null,
    revision: ficha([
      'DECISIÓN PENDIENTE: la academia debe declarar qué referencia de tamaños de hoja y de calibre '
        + 'de tubo por edad adopta oficialmente. Sin ella no se publica ninguna tabla numérica.',
    ]),
  },

  // ============================================================
  //  Mascarilla laríngea
  // ============================================================
  'm3-va-mascarilla-laringea': {
    icono: '🎭',
    duracion: '14 min',
    resumen: 'Un dispositivo supraglótico que se coloca a ciegas y sella sobre la entrada de la laringe: '
      + 'más rápido que intubar, sin laringoscopia, y con menos protección frente a la aspiración.',
    objetivos: [
      'Explicar dónde se aloja la mascarilla laríngea y cómo consigue el sello.',
      'Situar su lugar entre el dispositivo básico y la intubación.',
      'Aplicar la técnica de inserción y la confirmación posterior.',
      'Reconocer sus limitaciones frente a la aspiración.',
    ],
    secciones: [
      {
        titulo: 'Qué es un dispositivo supraglótico',
        bloques: [
          { tipo: 'p', texto: 'La mascarilla laríngea pertenece a la familia de los dispositivos supraglóticos: se colocan por encima de la glotis, sin atravesar las cuerdas vocales y sin necesidad de visualizarlas. Su extremo distal se aloja en la hipofaringe y su manguito sella alrededor de la entrada de la laringe, de modo que el aire insuflado se dirige a la tráquea.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Su ventaja es que no hace falta ver', texto: 'Al colocarse a ciegas, no requiere laringoscopia ni visión de las cuerdas. Eso la hace más rápida, más fácil de aprender y menos dependiente de la posición de la cabeza, lo que resulta especialmente útil cuando el cuello no puede movilizarse.' },
        ],
      },
      {
        titulo: 'Dónde encaja en la escalera de la vía aérea',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Comparación práctica',
            headers: ['', 'Cánula + bolsa-mascarilla', 'Mascarilla laríngea', 'Tubo endotraqueal'],
            filas: [
              ['Requiere laringoscopia', 'No', 'No', 'Sí'],
              ['Dificultad de la técnica', 'Baja', 'Intermedia', 'Alta'],
              ['Calidad del sello', 'Depende del sello facial', 'Bueno sobre la laringe', 'El mejor'],
              ['Protección frente a aspiración', 'Ninguna', 'Parcial y limitada', 'La mayor, aunque no absoluta'],
              ['Uso habitual', 'Primera medida', 'Rescate o alternativa cuando no se intuba', 'Vía aérea avanzada de referencia'],
            ],
          },
          { tipo: 'p', texto: 'En la práctica prehospitalaria el dispositivo supraglótico ocupa dos posiciones: como plan de rescate cuando la intubación falla o no está disponible, y como alternativa de primera elección cuando el prestador no está autorizado a intubar o las condiciones no lo permiten. Cuál de las dos aplica depende del protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Colocación',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Técnica',
            items: [
              'Elegir el tamaño según la referencia del fabricante del dispositivo disponible en la unidad.',
              'Comprobar el manguito inflándolo y desinflándolo, y dejarlo desinflado según indique el fabricante.',
              'Lubricar la cara posterior del dispositivo con lubricante hidrosoluble.',
              'Abrir la boca y aspirar si hay contenido visible.',
              'Introducirlo siguiendo el paladar duro hacia la hipofaringe, sin forzar.',
              'Avanzar hasta notar la resistencia que indica que ha alcanzado su posición.',
              'Inflar el manguito según la indicación del fabricante y comprobar el sello.',
              'Confirmar la ventilación y fijar el dispositivo.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El tamaño y el inflado los define el fabricante', texto: 'Los dispositivos supraglóticos no son intercambiables entre marcas: el tamaño por peso y el volumen de inflado varían. Se sigue la indicación impresa del dispositivo que hay en la unidad, no una cifra memorizada de otro modelo.' },
          { tipo: 'p', texto: 'La confirmación sigue el mismo principio que en la intubación: elevación torácica simétrica, auscultación comparando ambos campos, ausencia de fuga audible importante y capnografía cuando el servicio dispone de ella. Y se reevalúa tras cada movilización.' },
        ],
      },
      {
        titulo: 'Limitaciones',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que hay que tener presente',
            items: [
              'No aísla la vía aérea: la protección frente a la aspiración es parcial y limitada.',
              'El sello puede perderse si se requieren presiones de ventilación altas.',
              'Un reflejo nauseoso conservado impide su tolerancia, igual que con la cánula orofaríngea.',
              'La obstrucción por debajo de la glotis no se resuelve con un dispositivo supraglótico.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Vómito con dispositivo colocado', texto: 'Si aparece contenido gástrico, la prioridad es proteger la vía aérea: se lateraliza al paciente si su situación lo permite, se aspira y se replantea el dispositivo según el protocolo. Un supraglótico no autoriza a bajar la vigilancia sobre la aspiración.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, VIA_DIFICIL, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Dispositivo supraglótico', definicion: 'Dispositivo que se coloca por encima de la glotis, sin atravesar las cuerdas vocales ni requerir laringoscopia.' },
      { termino: 'Hipofaringe', definicion: 'Porción inferior de la faringe donde se aloja el extremo distal de la mascarilla laríngea.' },
      { termino: 'Manguito de sellado', definicion: 'Estructura inflable que sella alrededor de la entrada de la laringe para dirigir el aire a la tráquea.' },
      { termino: 'Protección parcial', definicion: 'Grado de aislamiento que ofrece un supraglótico frente a la aspiración: menor que la del tubo endotraqueal y nunca completa.' },
    ],
    flashcards: [
      { frente: '¿Dónde se aloja el extremo distal de la mascarilla laríngea?', reverso: 'En la hipofaringe, sellando alrededor de la entrada de la laringe.' },
      { frente: '¿Atraviesa las cuerdas vocales?', reverso: 'No: es un dispositivo supraglótico y se coloca a ciegas.' },
      { frente: '¿Cuál es su principal ventaja técnica?', reverso: 'No requiere laringoscopia ni visualizar las cuerdas, lo que la hace más rápida y menos dependiente de la posición de la cabeza.' },
      { frente: '¿Protege de la aspiración?', reverso: 'Solo de forma parcial y limitada; menos que un tubo endotraqueal.' },
      { frente: '¿De dónde se toman el tamaño y el volumen de inflado?', reverso: 'De la indicación del fabricante del dispositivo disponible en la unidad; no son intercambiables entre marcas.' },
    ],
    quiz: [
      {
        pregunta: '¿Qué caracteriza a un dispositivo supraglótico frente a un tubo endotraqueal?',
        opciones: [
          'Que atraviesa las cuerdas vocales con visión directa.',
          'Que se coloca por encima de la glotis, a ciegas y sin laringoscopia.',
          'Que aísla por completo la vía aérea.',
          'Que solo puede usarse en pacientes despiertos.',
        ],
        correcta: 1,
        explicacion: 'El supraglótico sella sobre la entrada de la laringe sin atravesarla, y por eso no necesita ver las cuerdas.',
      },
      {
        pregunta: 'La intubación falla en un paciente que ventila mal con bolsa-mascarilla. ¿Qué papel tiene la mascarilla laríngea?',
        opciones: [
          'Ninguno: solo se usa en quirófano.',
          'Puede ser el plan de rescate, según el protocolo del servicio.',
          'Sustituye a la aspiración.',
          'Debe colocarse antes de intentar intubar, siempre.',
        ],
        correcta: 1,
        explicacion: 'En el ámbito prehospitalario ocupa el papel de rescate cuando la intubación falla, o de alternativa cuando el prestador no está autorizado a intubar.',
      },
      {
        pregunta: 'Con la mascarilla laríngea colocada aparece contenido gástrico en la boca. ¿Qué haces?',
        opciones: [
          'Nada: el dispositivo protege de la aspiración.',
          'Lateralizar si la situación lo permite, aspirar y replantear el dispositivo según protocolo.',
          'Aumentar el inflado del manguito.',
          'Retirar la aspiración para no estimular más el vómito.',
        ],
        correcta: 1,
        explicacion: 'La protección es parcial y limitada; el dispositivo no autoriza a bajar la vigilancia sobre la aspiración.',
      },
      {
        pregunta: 'Vas a usar un supraglótico de una marca distinta a la habitual. ¿Qué comprobación es imprescindible?',
        opciones: [
          'Aplicar el mismo volumen de inflado que en el modelo anterior.',
          'Seguir la indicación de tamaño y de inflado impresa en ese dispositivo.',
          'Usar el tamaño mayor disponible por seguridad.',
          'Colocarlo sin inflar el manguito.',
        ],
        correcta: 1,
        explicacion: 'Los dispositivos no son intercambiables entre marcas: el tamaño por peso y el volumen de inflado varían.',
      },
    ],
    actividades: null,
    revision: ficha([
      'No se declaran tamaños ni volúmenes de inflado: dependen del fabricante del dispositivo que '
        + 'tenga cada unidad y la lección remite a su indicación impresa.',
      'La academia debe declarar si el supraglótico se enseña como rescate, como alternativa de '
        + 'primera elección o ambas, según el alcance de sus alumnos.',
    ]),
  },

  // ============================================================
  //  Obturador esofágico
  // ============================================================
  'm3-va-obturador-esofagico': {
    icono: '🏛️',
    duracion: '12 min',
    resumen: 'Un dispositivo que el plan de estudios conserva y que hoy se estudia como antecedente '
      + 'histórico: por qué se diseñó, por qué se abandonó y qué ocupó su lugar.',
    objetivos: [
      'Describir el principio de funcionamiento del obturador esofágico.',
      'Explicar las razones por las que dejó de considerarse un dispositivo de referencia.',
      'Situar el dispositivo que ocupó su función en la práctica actual.',
    ],
    secciones: [
      {
        titulo: 'Antes de nada: qué lugar ocupa este tema',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Dispositivo histórico, en desuso', texto: 'El obturador esofágico aparece en el plan de estudios oficial y por eso se estudia, pero NO es un dispositivo estándar de la práctica actual y esta lección no lo enseña como tal. Se presenta como antecedente para entender de dónde viene el manejo supraglótico moderno.' },
          { tipo: 'p', texto: 'Conocerlo tiene un valor real: explica por qué los dispositivos actuales están diseñados como están y qué problemas tuvieron que resolver. También evita que un alumno lo encuentre en un manual antiguo y lo confunda con una opción vigente.' },
        ],
      },
      {
        titulo: 'Cómo funcionaba',
        bloques: [
          { tipo: 'p', texto: 'El obturador esofágico se introducía a ciegas y su extremo distal quedaba alojado en el esófago. Un globo distal se inflaba dentro del esófago para bloquearlo, y una mascarilla facial sellaba la boca y la nariz. El aire insuflado, al no poder descender por el esófago obstruido, se dirigía hacia la laringe y la tráquea.' },
          { tipo: 'p', texto: 'La lógica del diseño era la de su época: conseguir una ventilación mejor que la de la bolsa-mascarilla sola, sin exigir laringoscopia ni el entrenamiento que requiere la intubación, en un momento en que los dispositivos supraglóticos actuales no existían.' },
        ],
      },
      {
        titulo: 'Por qué se abandonó',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Problemas que llevaron a su desuso',
            items: [
              'Dependía por completo de mantener un sello facial correcto: una fuga en la mascarilla anulaba la ventilación.',
              'El inflado del globo dentro del esófago se asoció a lesión de la mucosa y a rotura esofágica.',
              'No aislaba la vía aérea ni evitaba la aspiración de contenido regurgitado por encima del globo.',
              'Su retirada podía acompañarse de vómito abundante, con riesgo de aspiración en el peor momento.',
              'Aparecieron dispositivos supraglóticos que consiguen mejor sello y mejor ventilación sin bloquear el esófago.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que ocupó su lugar', texto: 'La función que buscaba el obturador —ventilar bien sin laringoscopia y sin el entrenamiento de la intubación— la cumplen hoy los dispositivos supraglóticos, que sellan sobre la entrada de la laringe en vez de obstruir el esófago. Esa es la comparación que este tema debe dejar clara.' },
          { tipo: 'p', texto: 'Si un servicio conservara todavía este material, su uso dependería de que el protocolo lo autorizara expresamente. La academia debe declarar si el dispositivo se estudia únicamente como antecedente —que es lo que esta lección asume— o si además existe en alguna de sus unidades.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Obturador esofágico', definicion: 'Dispositivo histórico que bloqueaba el esófago con un globo distal para dirigir el aire insuflado hacia la tráquea.' },
      { termino: 'Sello facial', definicion: 'Ajuste de la mascarilla sobre boca y nariz del que dependía por completo la ventilación con este dispositivo.' },
      { termino: 'Dispositivo en desuso', definicion: 'Material que dejó de considerarse estándar por su perfil de complicaciones o por la aparición de alternativas mejores.' },
    ],
    flashcards: [
      { frente: '¿Cómo dirigía el aire a la tráquea el obturador esofágico?', reverso: 'Bloqueando el esófago con un globo distal, de modo que el aire insuflado no podía descender por él.' },
      { frente: '¿De qué dependía por completo su ventilación?', reverso: 'De mantener un sello facial correcto con la mascarilla.' },
      { frente: 'Nombra dos complicaciones asociadas al dispositivo.', reverso: 'Lesión de la mucosa esofágica y rotura esofágica; también vómito abundante al retirarlo.' },
      { frente: '¿Qué dispositivo ocupó su función?', reverso: 'Los supraglóticos, que sellan sobre la entrada de la laringe en vez de obstruir el esófago.' },
      { frente: '¿Se enseña como estándar actual?', reverso: 'No: se estudia como antecedente histórico porque el plan lo menciona.' },
    ],
    quiz: [
      {
        pregunta: '¿Cuál era el principio de funcionamiento del obturador esofágico?',
        opciones: [
          'Sellar sobre la entrada de la laringe.',
          'Bloquear el esófago con un globo para que el aire insuflado se dirigiera a la tráquea.',
          'Atravesar las cuerdas vocales bajo visión directa.',
          'Aspirar el contenido gástrico de forma continua.',
        ],
        correcta: 1,
        explicacion: 'El globo distal obstruía el esófago; el sello sobre la laringe es el principio de los supraglóticos actuales.',
      },
      {
        pregunta: '¿Por qué este dispositivo no se enseña como estándar actual?',
        opciones: [
          'Porque exige laringoscopia.',
          'Porque su perfil de complicaciones y la aparición de supraglóticos mejores lo dejaron en desuso.',
          'Porque no puede usarse en adultos.',
          'Porque la NOM-034 lo prohíbe expresamente.',
        ],
        correcta: 1,
        explicacion: 'Se abandonó por lesión esofágica, dependencia del sello facial, ausencia de aislamiento y por la llegada de dispositivos supraglóticos.',
      },
      {
        pregunta: 'Un alumno encuentra este dispositivo descrito en un manual antiguo. ¿Qué debe concluir?',
        opciones: [
          'Que sigue siendo una opción vigente si el manual lo describe.',
          'Que es un antecedente histórico y no una alternativa actual.',
          'Que puede sustituir a la intubación en cualquier caso.',
          'Que su uso depende únicamente de la edad del paciente.',
        ],
        correcta: 1,
        explicacion: 'Precisamente para evitar esa confusión el tema se presenta como antecedente: encontrarlo descrito no lo convierte en vigente.',
      },
    ],
    actividades: null,
    revision: {
      estado: 'en_revision',
      procedencia: 'redactado',
      actualizado: HOY,
      versionClinica: 'Contenido histórico; comparación con supraglóticos vigentes (PHTLS 9.ª ed.)',
      observaciones: [
        'Redactado desde cero; el tema estaba vacío.',
        'Cumple el requisito del mandato: el dispositivo se presenta expresamente como histórico y en '
          + 'desuso, no como estándar vigente, conservando la fidelidad al plan que sí lo menciona.',
        'DECISIÓN PENDIENTE: la academia debe confirmar si el dispositivo se estudia solo como '
          + 'antecedente o si existe todavía en alguna de sus unidades.',
        PENDIENTE_EDICION,
      ],
      fuentes: [
        'NAEMT. PHTLS, 9.ª ed. (catálogo de la academia).',
        'NOM-034-SSA3-2013, DOF.',
      ],
    },
  },

  // ============================================================
  //  Cricotirotomía con aguja
  // ============================================================
  'm3-va-cricotirotomia': {
    icono: '⚠️',
    duracion: '16 min',
    resumen: 'El acceso transtraqueal de rescate: qué situación lo justifica, dónde está el punto de '
      + 'punción y por qué es la última opción de la escalera de la vía aérea.',
    objetivos: [
      'Definir la situación clínica que justifica un acceso transtraqueal de rescate.',
      'Localizar la membrana cricotiroidea por referencias anatómicas palpables.',
      'Describir la técnica con aguja y sus complicaciones inmediatas.',
      'Situar el procedimiento dentro del alcance profesional y del protocolo del servicio.',
    ],
    secciones: [
      {
        titulo: 'Cuándo se plantea',
        bloques: [
          { tipo: 'p', texto: 'La cricotirotomía con aguja es un procedimiento de rescate para la situación en que no se puede ventilar al paciente por ningún medio ni asegurar su vía aérea por vía oral o nasal. No es una alternativa a la intubación ni un paso más de la escalera: es lo que se hace cuando la escalera se agotó y el paciente sigue sin oxigenarse.' },
          {
            tipo: 'lista',
            titulo: 'Situaciones en que puede plantearse',
            items: [
              'Obstrucción supraglótica que impide el paso de aire y no se resuelve por otros medios.',
              'Trauma facial masivo que hace impracticable la vía oral y la nasal.',
              'Edema de la vía aérea superior que impide la ventilación.',
              'Fracaso de todas las técnicas disponibles dentro del alcance del prestador.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Alcance profesional', texto: 'Este procedimiento no queda autorizado por haberlo estudiado. Su ejecución depende de la certificación del prestador, del equipamiento de la unidad y de la dirección médica del servicio. Esta lección describe la técnica porque el plan la incluye; la autorización la da la academia y el protocolo, no el temario.' },
        ],
      },
      {
        titulo: 'Referencias anatómicas',
        bloques: [
          { tipo: 'p', texto: 'La membrana cricotiroidea es una zona blanda y superficial situada entre dos estructuras palpables: por arriba el cartílago tiroides, cuya prominencia se identifica con facilidad en el adulto, y por abajo el cartílago cricoides, el único anillo cartilaginoso completo de la vía aérea. Se localiza deslizando el dedo desde la prominencia tiroidea hacia abajo hasta caer en la depresión blanda que precede al cricoides.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué se eligió ese punto', texto: 'Es el lugar donde la vía aérea está más cerca de la piel, con menos estructuras vasculares importantes por delante y con un plano firme por debajo. La anatomía de la región se estudia en el repaso de esta misma unidad.' },
          { tipo: 'p', texto: 'En el niño pequeño las referencias son menos evidentes y la anatomía es más frágil, de modo que las consideraciones pediátricas de este procedimiento corresponden al Módulo 6 y al protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Técnica con aguja',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia general',
            items: [
              'Colocar al paciente en decúbito supino con el cuello en la posición que permita el protocolo.',
              'Identificar y confirmar la membrana cricotiroidea por palpación.',
              'Realizar antisepsia de la zona si el tiempo lo permite.',
              'Estabilizar la laringe con la mano no dominante durante todo el procedimiento.',
              'Puncionar la membrana con el catéter sobre aguja conectado a una jeringa, dirigiendo la punta en sentido caudal.',
              'Aspirar mientras se avanza: la entrada de aire en la jeringa indica que se alcanzó la luz de la vía aérea.',
              'Avanzar el catéter y retirar la aguja, sujetando el catéter en todo momento.',
              'Conectar al sistema de ventilación que el protocolo del servicio establezca.',
              'Comprobar el efecto y vigilar de forma continua.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Es una medida temporal', texto: 'El acceso con aguja permite oxigenar durante un tiempo limitado, pero elimina mal el dióxido de carbono. No sustituye a una vía aérea definitiva y obliga a un traslado sin demora al centro que pueda proporcionarla.' },
          { tipo: 'p', texto: 'El sistema de ventilación conectado al catéter, la presión empleada y los tiempos de insuflación y espiración dependen del equipo disponible y del protocolo del servicio; esta lección no fija cifras porque varían entre equipos y una cifra equivocada aquí produce barotrauma.' },
        ],
      },
      {
        titulo: 'Complicaciones',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Inmediatas',
            items: [
              'Falsa vía: el catéter queda fuera de la luz traqueal y la insuflación produce enfisema subcutáneo.',
              'Acodamiento o desplazamiento del catéter, que interrumpe la oxigenación.',
              'Hemorragia local.',
              'Lesión de la pared posterior de la tráquea o del esófago.',
              'Barotrauma por presión excesiva o por espiración insuficiente.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Vigilancia continua', texto: 'Un catéter de este calibre se desplaza con facilidad. Se sujeta durante todo el procedimiento, se fija y se comprueba tras cada movilización del paciente; el enfisema subcutáneo creciente obliga a reevaluar de inmediato la posición.' },
        ],
      },
      { titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items: [PHTLS9, VIA_DIFICIL, NOM034] }] },
    ],
    conceptosClave: [
      { termino: 'Membrana cricotiroidea', definicion: 'Zona blanda entre el cartílago tiroides y el cricoides, punto de referencia del acceso transtraqueal.' },
      { termino: 'Cartílago cricoides', definicion: 'Único anillo cartilaginoso completo de la vía aérea; límite inferior de la membrana.' },
      { termino: 'Acceso transtraqueal de rescate', definicion: 'Procedimiento indicado cuando no se puede ventilar ni asegurar la vía aérea por vía oral o nasal.' },
      { termino: 'Falsa vía', definicion: 'Situación en que el catéter queda fuera de la luz traqueal; la insuflación produce enfisema subcutáneo.' },
      { termino: 'Medida temporal', definicion: 'Carácter del acceso con aguja: oxigena durante un tiempo limitado y elimina mal el dióxido de carbono.' },
    ],
    flashcards: [
      { frente: '¿Entre qué estructuras se sitúa la membrana cricotiroidea?', reverso: 'Entre el cartílago tiroides por arriba y el cricoides por abajo.' },
      { frente: '¿Cómo se confirma que la aguja alcanzó la vía aérea?', reverso: 'Aspirando mientras se avanza: la entrada de aire en la jeringa lo indica.' },
      { frente: '¿Qué indica un enfisema subcutáneo creciente tras el procedimiento?', reverso: 'Falsa vía: el catéter está fuera de la luz traqueal y hay que reevaluar de inmediato.' },
      { frente: '¿Por qué es una medida temporal?', reverso: 'Porque oxigena un tiempo limitado y elimina mal el dióxido de carbono; no sustituye a una vía aérea definitiva.' },
      { frente: '¿Qué autoriza a realizar este procedimiento?', reverso: 'La certificación del prestador, el equipamiento de la unidad y la dirección médica; no el hecho de haberlo estudiado.' },
    ],
    quiz: [
      {
        pregunta: '¿Cuál es la situación que justifica plantear una cricotirotomía con aguja?',
        opciones: [
          'Cualquier paciente que requiera vía aérea avanzada.',
          'No poder ventilar por ningún medio ni asegurar la vía aérea por vía oral o nasal.',
          'Un intento de intubación fallido.',
          'La ausencia de laringoscopio en la unidad.',
        ],
        correcta: 1,
        explicacion: 'Es un procedimiento de rescate para cuando la escalera de la vía aérea se agotó; un solo intento fallido de intubación no lo justifica por sí mismo.',
      },
      {
        pregunta: '¿Cómo localizas la membrana cricotiroidea?',
        opciones: [
          'Por encima de la prominencia del cartílago tiroides.',
          'Deslizando el dedo desde la prominencia tiroidea hacia abajo, hasta la depresión blanda que precede al cricoides.',
          'A la altura de la horquilla esternal.',
          'En la línea media, dos dedos por debajo del mentón.',
        ],
        correcta: 1,
        explicacion: 'La membrana queda entre el tiroides por arriba y el cricoides por abajo; es donde la vía aérea está más cerca de la piel.',
      },
      {
        pregunta: 'Tras conectar el sistema aparece enfisema subcutáneo progresivo en el cuello. ¿Qué sospechas?',
        opciones: [
          'Barotrauma pulmonar exclusivamente.',
          'Falsa vía: el catéter no está en la luz traqueal.',
          'Una hemorragia local.',
          'Acodamiento del sistema de oxígeno.',
        ],
        correcta: 1,
        explicacion: 'La insuflación fuera de la luz traqueal difunde aire al tejido celular subcutáneo; obliga a reevaluar la posición de inmediato.',
      },
      {
        pregunta: 'Un alumno estudia esta lección y quiere realizar el procedimiento en su servicio. ¿Qué es correcto?',
        opciones: [
          'Puede hacerlo: ya conoce la técnica.',
          'Necesita certificación, equipamiento y autorización de la dirección médica de su servicio.',
          'Puede hacerlo si hay un compañero presente.',
          'Puede hacerlo solo en pacientes adultos.',
        ],
        correcta: 1,
        explicacion: 'Estudiar un procedimiento no autoriza a ejecutarlo: el alcance lo definen la certificación, el equipamiento de la unidad y la dirección médica.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el acceso transtraqueal con aguja',
        pasos: [
          'Identificar y confirmar la membrana cricotiroidea por palpación',
          'Estabilizar la laringe con la mano no dominante',
          'Puncionar dirigiendo la punta en sentido caudal',
          'Aspirar mientras se avanza hasta obtener aire',
          'Avanzar el catéter y retirar la aguja sujetándolo',
          'Conectar al sistema que establezca el protocolo',
          'Comprobar el efecto y vigilar de forma continua',
        ],
      },
    },
    revision: ficha([
      'No se declaran calibres de catéter, presiones ni tiempos de insuflación: dependen del equipo '
        + 'y del protocolo, y una cifra equivocada aquí produce barotrauma.',
      'Las consideraciones pediátricas se remiten al Módulo 6.',
      'DECISIÓN PENDIENTE: la academia debe declarar si este procedimiento está dentro del alcance '
        + 'de sus alumnos y con qué equipamiento cuenta cada tipo de unidad.',
    ]),
  },
}
