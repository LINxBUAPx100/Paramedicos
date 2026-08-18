// ============================================================
//  Módulo 3 · Vía intravenosa e intraósea
// ------------------------------------------------------------
//  Unidad completa, en el orden del PDF: ventajas y desventajas, sitios de
//  punción, soluciones cristaloides, técnica de canalización y el tema que el
//  plan titula «Osteólisis» y que en realidad es el acceso intraóseo.
//
//  Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json para
//  `m3-via-intravenosa`: primarias OMS BEC y COFEPRIS/IPP; requiere NOM-034 y
//  protocolo local. La nota del registro es explícita: «Mostrar acceso
//  intraóseo/osteoclisis; conservar osteólisis solo como errata documental».
//
//  Regla que gobierna todo el archivo: NINGUNA cifra de calibre, volumen,
//  velocidad de infusión o composición de solución se publica aquí. No es
//  prudencia excesiva —es que esas cifras dependen del producto registrado que
//  usa el servicio, de su información para prescribir y del protocolo médico
//  que autoriza la indicación. Una tabla tomada de otro servicio enseña una
//  práctica que después no coincide con el material de la ambulancia.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

const OMS_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de atención inicial: indicación del acceso vascular dentro de la evaluación '
    + 'y manejo del paciente agudo y del traumatizado.',
}
const COFEPRIS_IPP = {
  nombre: 'COFEPRIS. Guía para estructurar y redactar la Información para Prescribir, y visor de '
    + 'registros sanitarios de medicamentos. Consultada el 16 de agosto de 2026.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de la que procede la composición, la indicación y las '
    + 'advertencias de cada solución o medicamento registrado. Es la que debe consultarse para el '
    + 'producto concreto que use el servicio; esta lección no la sustituye.',
}
const NOM_034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, atención médica prehospitalaria de '
    + 'las urgencias médicas.',
  url: 'https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si',
  nota: 'Equipamiento, insumos y personal exigidos por tipo de ambulancia; delimita qué material '
    + 'existe y quién puede emplearlo. No es un vademécum y no fija dosis.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })
const FUENTES = F([OMS_BEC, COFEPRIS_IPP, NOM_034])

const ALCANCE = 'ALCANCE: el acceso vascular es un procedimiento invasivo. Estudiarlo no autoriza a '
  + 'realizarlo: depende de la certificación del prestador, del tipo de unidad y de la dirección '
  + 'médica del servicio.'
const SIN_CIFRAS = 'No se publican calibres, volúmenes, velocidades de infusión ni composiciones: '
  + 'proceden de la información para prescribir del producto registrado que use el servicio y de su '
  + 'protocolo. La lección enseña el criterio y remite a esas fuentes.'

const ficha = (extra = []) => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'OMS BEC 2018; COFEPRIS/IPP vigente; NOM-034-SSA3-2013',
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    ALCANCE,
    SIN_CIFRAS,
    ...extra,
  ],
  fuentes: [
    'WHO/ICRC. Basic Emergency Care, 2018.',
    'COFEPRIS. Información para Prescribir y registros sanitarios (consultada 2026-08-16).',
    'NOM-034-SSA3-2013, DOF.',
  ],
})

export default {
  // ============================================================
  //  Terapia intravenosa: ventajas y desventajas
  // ============================================================
  'm3-vi-ventajas-desventajas': {
    icono: '💧',
    duracion: '15 min',
    resumen: 'Qué gana y qué arriesga un paciente cuando se le canaliza una vena, y por qué la pregunta '
      + 'correcta no es «¿puedo?» sino «¿qué va a cambiar si lo hago?».',
    objetivos: [
      'Enunciar las indicaciones que justifican un acceso vascular prehospitalario.',
      'Contrastar las ventajas de la vía intravenosa con sus riesgos y sus costes.',
      'Decidir cuándo el acceso no debe retrasar el traslado.',
    ],
    secciones: [
      {
        titulo: 'Qué resuelve la vía intravenosa',
        bloques: [
          { tipo: 'p', texto: 'Canalizar una vena crea una comunicación directa con el compartimento intravascular. Eso permite tres cosas que ninguna otra vía consigue con la misma rapidez y previsibilidad: administrar líquidos, administrar medicamentos con inicio de acción rápido y disponer de un acceso ya establecido para cuando el paciente se deteriore.' },
          {
            tipo: 'lista',
            titulo: 'Indicaciones habituales en el ámbito prehospitalario',
            items: [
              'Necesidad prevista o actual de reposición de volumen.',
              'Necesidad de administrar un medicamento cuya vía autorizada es la intravenosa.',
              'Paciente con riesgo razonable de deterioro durante el traslado, en quien conseguir el acceso después sería más difícil.',
              'Traslado prolongado en el que se anticipa que hará falta.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La indicación la da el plan de tratamiento', texto: 'Un acceso vascular que no va a usarse ni previsiblemente va a necesitarse no aporta nada al paciente y sí le añade riesgo. La pregunta antes de puncionar no es si se sabe hacer, sino qué va a cambiar en el manejo.' },
        ],
      },
      {
        titulo: 'Ventajas',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Lo que aporta frente a otras vías',
            items: [
              'Biodisponibilidad completa: lo administrado llega íntegro a la circulación, sin depender de la absorción.',
              'Inicio de acción rápido y más previsible que por vía oral, intramuscular o subcutánea.',
              'Posibilidad de administrar volumen de forma controlada.',
              'Acceso reutilizable durante todo el episodio, sin repetir punciones.',
              'Permite retirar la administración si aparece un efecto adverso, algo imposible con una dosis ya absorbida por otra vía.',
            ],
          },
        ],
      },
      {
        titulo: 'Desventajas y riesgos',
        bloques: [
          { tipo: 'p', texto: 'Toda vía intravenosa rompe la barrera cutánea y crea una puerta de entrada. Los riesgos no son teóricos y aparecen tanto por la punción como por lo que se administra a través de ella.' },
          {
            tipo: 'tabla',
            titulo: 'Riesgos por origen',
            headers: ['Origen', 'Complicaciones'],
            filas: [
              ['Del procedimiento', 'Dolor, hematoma, punción arterial, lesión nerviosa, fallo del intento'],
              ['Del catéter', 'Infiltración, extravasación, flebitis, obstrucción, desplazamiento'],
              ['Infeccioso', 'Infección local y bacteriemia por contaminación durante la inserción o el manejo'],
              ['De lo administrado', 'Sobrecarga de volumen, reacción al fármaco, error de administración'],
              ['Para el prestador', 'Punción accidental con material contaminado'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El coste que no se ve: el tiempo', texto: 'En un paciente que necesita cirugía o un tratamiento que solo existe en el hospital, cada minuto invertido en la escena intentando un acceso es un minuto restado del tratamiento definitivo. En esos casos el acceso se intenta en camino, no antes de salir.' },
          { tipo: 'p', texto: 'La decisión de canalizar en la escena o durante el traslado, el número de intentos aceptable y las soluciones y medicamentos autorizados dependen del protocolo del servicio y del alcance del prestador. Esta lección no los fija.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Acceso vascular', definicion: 'Comunicación establecida con el compartimento intravascular para administrar líquidos o medicamentos.' },
      { termino: 'Biodisponibilidad completa', definicion: 'Propiedad de la vía intravenosa por la que lo administrado llega íntegro a la circulación sin depender de la absorción.' },
      { termino: 'Infiltración', definicion: 'Salida de la solución administrada al tejido circundante por desplazamiento del catéter fuera de la luz venosa.' },
      { termino: 'Extravasación', definicion: 'Infiltración de una sustancia capaz de dañar el tejido en el que se acumula.' },
      { termino: 'Flebitis', definicion: 'Inflamación de la vena canalizada, con dolor, eritema y cordón palpable en su trayecto.' },
    ],
    flashcards: [
      { frente: '¿Qué tres cosas permite un acceso vascular?', reverso: 'Administrar líquidos, administrar medicamentos de inicio rápido y disponer de acceso antes de que el paciente se deteriore.' },
      { frente: '¿Cuál es la pregunta previa a puncionar?', reverso: 'Qué va a cambiar en el manejo si lo hago, no si sé hacerlo.' },
      { frente: 'Diferencia entre infiltración y extravasación', reverso: 'La infiltración es la salida de la solución al tejido; la extravasación es esa salida cuando la sustancia daña el tejido.' },
      { frente: '¿Qué ventaja tiene la vía intravenosa sobre una dosis ya absorbida por otra vía?', reverso: 'Que la administración puede interrumpirse si aparece un efecto adverso.' },
      { frente: 'Paciente que necesita cirugía urgente. ¿Dónde se intenta el acceso?', reverso: 'En camino, no antes de salir: el tiempo en escena se resta del tratamiento definitivo.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con herida penetrante abdominal e hipotensión, a ocho minutos del hospital. ¿Cuándo intentas el acceso?',
        opciones: [
          'Antes de moverlo, hasta conseguirlo.',
          'Durante el traslado: el tiempo en escena se resta del tratamiento definitivo.',
          'Al llegar al hospital, nunca antes.',
          'Solo si el paciente lo autoriza por escrito.',
        ],
        correcta: 1,
        explicacion: 'En un paciente que necesita quirófano, cada minuto en la escena intentando un acceso resta del tratamiento que solo existe en el hospital; el intento se hace en camino.',
      },
      {
        pregunta: '¿Qué justifica canalizar a un paciente estable con traslado prolongado?',
        opciones: [
          'Que el prestador esté autorizado a hacerlo.',
          'Que se anticipe razonablemente la necesidad de usarlo durante el trayecto.',
          'Que el equipo esté disponible en la unidad.',
          'Que el protocolo lo permita en cualquier paciente.',
        ],
        correcta: 1,
        explicacion: 'La indicación nace del plan de tratamiento previsible. Poder hacerlo y tener el material no son indicaciones.',
      },
      {
        pregunta: 'Aparece edema frío y doloroso alrededor del sitio de punción mientras pasa la solución. ¿Qué ocurre?',
        opciones: [
          'Flebitis.',
          'Infiltración: el catéter está fuera de la luz venosa.',
          'Punción arterial.',
          'Reacción al medicamento.',
        ],
        correcta: 1,
        explicacion: 'La solución se acumula en el tejido circundante; si la sustancia además daña ese tejido, se denomina extravasación.',
      },
      {
        pregunta: '¿Cuál de estos riesgos afecta al prestador y no al paciente?',
        opciones: [
          'La sobrecarga de volumen.',
          'La punción accidental con material contaminado.',
          'La flebitis.',
          'La obstrucción del catéter.',
        ],
        correcta: 1,
        explicacion: 'Es el riesgo ocupacional propio del procedimiento; los demás son complicaciones del paciente.',
      },
    ],
    actividades: null,
    revision: ficha(),
  },

  // ============================================================
  //  Sitios de punción
  // ============================================================
  'm3-vi-sitios-puncion': {
    icono: '🎯',
    duracion: '15 min',
    resumen: 'Dónde se busca una vena en el paciente prehospitalario, en qué orden y qué sitios se evitan '
      + 'aunque la vena se vea bien.',
    objetivos: [
      'Enumerar los sitios de punción periférica habituales y su orden de preferencia.',
      'Justificar por qué se comienza por la porción distal del miembro.',
      'Identificar los sitios que deben evitarse y el motivo de cada exclusión.',
    ],
    secciones: [
      {
        titulo: 'Criterio de elección',
        bloques: [
          { tipo: 'p', texto: 'La elección del sitio no es una preferencia personal: responde a tres preguntas encadenadas. Qué se va a administrar y con qué rapidez, en qué condición está el paciente y qué venas conserva utilizables para el resto del episodio.' },
          {
            tipo: 'lista',
            titulo: 'Lo que hace bueno a un sitio',
            items: [
              'Vena palpable, con trayecto recto y suficiente longitud.',
              'Piel íntegra, sin lesión, quemadura ni infección local.',
              'Zona que no cruce una articulación, para que el movimiento no acode ni desplace el catéter.',
              'Accesible sin interferir con las maniobras que el paciente va a necesitar.',
              'Miembro sin compromiso circulatorio ni lesión proximal.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'De distal a proximal', texto: 'Se empieza por la parte más lejana del miembro y se asciende. La razón es práctica: si un intento distal falla, quedan sitios proximales disponibles; si se empieza por el proximal y falla, todo lo distal queda inutilizado, porque la solución se escaparía por la punción anterior.' },
        ],
      },
      {
        titulo: 'Sitios periféricos habituales',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Ventajas e inconvenientes',
            headers: ['Sitio', 'A favor', 'En contra'],
            filas: [
              ['Dorso de la mano', 'Accesible, permite conservar sitios proximales', 'Venas de menor calibre; molesto y móvil'],
              ['Antebrazo', 'Trayecto recto, buena fijación, cómodo para el paciente', 'Puede requerir más búsqueda'],
              ['Fosa antecubital', 'Venas de mayor calibre, alta tasa de éxito', 'Cruza una articulación: se acoda con la flexión y compromete sitios distales'],
              ['Dorso del pie', 'Alternativa cuando los miembros superiores no son utilizables', 'Mayor incomodidad y limitación de la movilidad; evitar en diabetes o vasculopatía según protocolo'],
              ['Yugular externa', 'Visible y de buen calibre en paciente grave', 'Requiere autorización expresa del protocolo y del alcance; incompatible con collarín'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La fosa antecubital no es la primera opción por defecto', texto: 'Es tentadora porque suele conseguirse al primer intento, pero cruza el codo: al flexionar el brazo la infusión se detiene, y una vez puncionada quedan inutilizadas las venas distales de ese miembro. Se reserva para cuando la situación clínica justifica priorizar el éxito inmediato.' },
        ],
      },
      {
        titulo: 'Sitios que se evitan',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Y por qué',
            items: [
              'Miembro con fístula arteriovenosa para diálisis: comprometerla puede costarle al paciente su acceso de diálisis.',
              'Miembro del lado de una mastectomía con disección axilar, o con linfedema.',
              'Miembro con fractura, lesión por aplastamiento o quemadura extensa proximal al sitio.',
              'Zona con infección, celulitis o lesión cutánea.',
              'Vena ya puncionada sin éxito en ese mismo trayecto, por debajo del punto fallido.',
              'Miembro parético o con alteración sensitiva, si existe alternativa, porque el paciente no advertirá una complicación.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Preguntar antes de puncionar', texto: 'Fístula, mastectomía y linfedema no siempre son visibles. Una pregunta directa al paciente consciente —«¿tiene fístula, le operaron de algún ganglio, hay algún brazo que le digan que no le pinchen?»— evita una complicación que después no tiene arreglo.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Progresión distal-proximal', definicion: 'Regla de elección que empieza por la parte más lejana del miembro para conservar sitios proximales tras un fallo.' },
      { termino: 'Fosa antecubital', definicion: 'Zona de flexión del codo, de venas amplias pero que cruza una articulación y compromete los sitios distales del miembro.' },
      { termino: 'Fístula arteriovenosa', definicion: 'Acceso vascular quirúrgico para diálisis; el miembro que la porta se excluye de la punción.' },
      { termino: 'Sitio comprometido', definicion: 'Zona con lesión, infección, alteración circulatoria o linfática que la excluye como lugar de punción.' },
    ],
    flashcards: [
      { frente: '¿Por qué se empieza por la vena más distal?', reverso: 'Porque si falla quedan sitios proximales; al revés, un fallo proximal inutiliza todo lo distal.' },
      { frente: '¿Qué inconveniente tiene la fosa antecubital?', reverso: 'Cruza el codo: se acoda con la flexión y compromete las venas distales del miembro.' },
      { frente: 'Nombra tres miembros que se excluyen de la punción.', reverso: 'El que porta fístula de diálisis, el del lado de una mastectomía con disección axilar o linfedema, y el que tiene fractura o quemadura proximal.' },
      { frente: '¿Qué se pregunta al paciente consciente antes de puncionar?', reverso: 'Si tiene fístula, si lo operaron de ganglios y si hay algún brazo en el que le hayan dicho que no le pinchen.' },
      { frente: '¿Qué caracteriza a un buen sitio de punción?', reverso: 'Vena palpable de trayecto recto, piel íntegra, fuera de una articulación y en un miembro sin compromiso.' },
    ],
    quiz: [
      {
        pregunta: 'Fallas un intento en la fosa antecubital derecha. ¿Qué sitio queda comprometido?',
        opciones: [
          'Ninguno: se puede puncionar cualquier vena.',
          'Las venas distales de ese mismo miembro, por debajo del punto fallido.',
          'Solo el miembro contralateral.',
          'El dorso del pie del mismo lado.',
        ],
        correcta: 1,
        explicacion: 'La solución administrada por debajo escaparía por la punción anterior; por eso la progresión correcta es de distal a proximal.',
      },
      {
        pregunta: 'Paciente en hemodiálisis con fístula en el brazo izquierdo. ¿Dónde NO puncionas?',
        opciones: [
          'En el brazo derecho.',
          'En el brazo izquierdo, el de la fístula.',
          'En el dorso de la mano derecha.',
          'En el antebrazo derecho.',
        ],
        correcta: 1,
        explicacion: 'Comprometer la fístula puede costarle al paciente su acceso de diálisis; el miembro que la porta se excluye.',
      },
      {
        pregunta: '¿Por qué se evita puncionar en un miembro parético si hay alternativa?',
        opciones: [
          'Porque la vena está trombosada.',
          'Porque el paciente no advertirá una complicación por su alteración sensitiva.',
          'Porque la piel es más gruesa.',
          'Porque el catéter no se fija bien.',
        ],
        correcta: 1,
        explicacion: 'La pérdida de sensibilidad retrasa la detección de una infiltración o de una extravasación.',
      },
      {
        pregunta: 'Buscas un sitio en un paciente estable con traslado largo. ¿Cuál eliges primero?',
        opciones: [
          'Fosa antecubital, por su calibre.',
          'Dorso de la mano o antebrazo, empezando por lo distal.',
          'Yugular externa, por comodidad.',
          'Dorso del pie, para dejar libres los brazos.',
        ],
        correcta: 1,
        explicacion: 'En un paciente estable se conserva la progresión distal-proximal; la fosa antecubital se reserva para cuando la situación clínica justifica priorizar el éxito inmediato.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La búsqueda de un sitio de punción progresa de ___ a proximal, para conservar venas utilizables tras un fallo.',
          opciones: ['medial', 'distal', 'superficial'],
          correcta: 1,
          explicacion: 'Empezar por lo proximal inutiliza todo lo que queda por debajo si el intento falla.',
        },
      ],
    },
    revision: ficha([
      'La yugular externa se nombra como sitio existente y se declara sujeta a autorización expresa; '
        + 'no se enseña su técnica, que excede el alcance de esta unidad.',
    ]),
  },

  // ============================================================
  //  Soluciones cristaloides
  // ============================================================
  'm3-vi-cristaloides': {
    icono: '🧪',
    duracion: '16 min',
    resumen: 'Qué es un cristaloide, en qué se distingue de un coloide y por qué la tonicidad de la '
      + 'solución decide adónde va el líquido que se administra.',
    objetivos: [
      'Definir cristaloide y diferenciarlo de coloide.',
      'Relacionar la tonicidad de una solución con su distribución en los compartimentos.',
      'Reconocer las consecuencias clínicas de administrar volumen sin indicación.',
    ],
    secciones: [
      {
        titulo: 'Qué es un cristaloide',
        bloques: [
          { tipo: 'p', texto: 'Un cristaloide es una solución acuosa de electrolitos y, en algunos casos, de otras moléculas pequeñas capaces de atravesar libremente la membrana capilar. Un coloide, en cambio, contiene partículas de mayor tamaño que permanecen más tiempo en el espacio intravascular. En el ámbito prehospitalario mexicano las soluciones de uso habitual son cristaloides, y su disponibilidad concreta depende del equipamiento de la unidad conforme a la NOM-034 y al protocolo del servicio.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Lo que decide el destino del líquido', texto: 'Al administrar una solución, la proporción que permanece en el espacio intravascular y la que pasa al intersticio o a la célula dependen de su tonicidad respecto del plasma. Esa es la propiedad que hay que entender: no el nombre comercial de la bolsa.' },
        ],
      },
      {
        titulo: 'Tonicidad y distribución',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Tres comportamientos distintos',
            headers: ['Tipo', 'Relación con el plasma', 'Hacia dónde tiende el agua'],
            filas: [
              ['Isotónica', 'Osmolaridad similar a la del plasma', 'Permanece en el espacio extracelular; expande el volumen circulante y el intersticio'],
              ['Hipotónica', 'Osmolaridad menor que la del plasma', 'Entra a la célula; poca expansión del volumen circulante'],
              ['Hipertónica', 'Osmolaridad mayor que la del plasma', 'Atrae agua desde la célula hacia el espacio extracelular'],
            ],
          },
          { tipo: 'p', texto: 'De ahí se sigue una consecuencia directa: para expandir el volumen circulante de un paciente hipoperfundido interesa una solución isotónica, porque una hipotónica se redistribuiría hacia el interior de la célula y aportaría poco al problema que se quiere corregir.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Composición e indicación: de la IPP, no de esta página', texto: 'La composición exacta de cada solución —qué electrolitos lleva y en qué cantidad—, su osmolaridad, sus indicaciones aprobadas y sus advertencias están en la información para prescribir del producto registrado ante COFEPRIS que use tu servicio. Esta lección enseña a razonar sobre tonicidad; los números de cada bolsa se leen en su etiqueta y en su IPP.' },
        ],
      },
      {
        titulo: 'Administrar volumen no es inocuo',
        bloques: [
          { tipo: 'p', texto: 'La reposición de volumen tiene efectos indeseables cuando se administra sin indicación o en exceso. Los tres más relevantes en el ámbito prehospitalario son la sobrecarga circulatoria, la dilución de los componentes de la sangre y el enfriamiento del paciente.' },
          {
            tipo: 'lista',
            titulo: 'Qué vigilar durante la administración',
            items: [
              'Aparición o empeoramiento de dificultad respiratoria.',
              'Cambios en la auscultación pulmonar.',
              'Distensión venosa yugular que antes no existía.',
              'Temperatura del paciente: una solución a temperatura ambiente enfría, y en el traumatizado la hipotermia agrava la hemorragia.',
              'Respuesta clínica: si la perfusión no mejora, insistir con más volumen rara vez es la respuesta correcta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El volumen no sustituye al control de la hemorragia', texto: 'En un paciente que sangra, administrar líquido sin controlar el origen del sangrado diluye y enfría sin corregir la causa. La secuencia es controlar la hemorragia y trasladar; el volumen acompaña, no reemplaza.' },
          { tipo: 'p', texto: 'Qué solución, qué volumen, a qué velocidad y con qué objetivo son decisiones del protocolo médico del servicio, y varían según el cuadro, la edad y el alcance del prestador. Esta lección no las fija.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Cristaloide', definicion: 'Solución acuosa de electrolitos y moléculas pequeñas que atraviesan libremente la membrana capilar.' },
      { termino: 'Coloide', definicion: 'Solución con partículas de mayor tamaño que permanecen más tiempo en el espacio intravascular.' },
      { termino: 'Tonicidad', definicion: 'Relación entre la osmolaridad de una solución y la del plasma; determina hacia dónde se desplaza el agua.' },
      { termino: 'Solución isotónica', definicion: 'La de osmolaridad similar a la del plasma; permanece en el espacio extracelular y expande el volumen circulante.' },
      { termino: 'Sobrecarga circulatoria', definicion: 'Consecuencia de administrar volumen en exceso o sin indicación, con deterioro respiratorio.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue a un cristaloide de un coloide?', reverso: 'El cristaloide lleva electrolitos y moléculas pequeñas que cruzan el capilar; el coloide, partículas mayores que permanecen más en el espacio intravascular.' },
      { frente: '¿Qué propiedad decide adónde va el líquido administrado?', reverso: 'La tonicidad de la solución respecto del plasma.' },
      { frente: '¿Qué hace una solución hipotónica?', reverso: 'El agua tiende a entrar a la célula, con poca expansión del volumen circulante.' },
      { frente: '¿Dónde se consulta la composición exacta de una solución?', reverso: 'En la información para prescribir del producto registrado ante COFEPRIS que use el servicio.' },
      { frente: '¿Por qué el volumen no sustituye al control de la hemorragia?', reverso: 'Porque diluye y enfría sin corregir la causa del sangrado.' },
      { frente: 'Nombra tres efectos indeseables de administrar volumen en exceso.', reverso: 'Sobrecarga circulatoria, dilución de los componentes de la sangre y enfriamiento del paciente.' },
    ],
    quiz: [
      {
        pregunta: 'Quieres expandir el volumen circulante de un paciente hipoperfundido. ¿Qué tipo de solución interesa?',
        opciones: [
          'Hipotónica, porque hidrata la célula.',
          'Isotónica, porque permanece en el espacio extracelular.',
          'Hipertónica, porque deshidrata el intersticio.',
          'Cualquiera: la tonicidad no influye.',
        ],
        correcta: 1,
        explicacion: 'Una hipotónica se redistribuiría al interior de la célula y aportaría poco al volumen circulante, que es el problema a corregir.',
      },
      {
        pregunta: 'Durante la administración aparece dificultad respiratoria y distensión yugular nueva. ¿Qué sospechas?',
        opciones: [
          'Infiltración del catéter.',
          'Sobrecarga circulatoria.',
          'Reacción alérgica a la solución.',
          'Hipotermia por la solución fría.',
        ],
        correcta: 1,
        explicacion: 'Son los signos de exceso de volumen; obligan a reevaluar la indicación y el ritmo de administración.',
      },
      {
        pregunta: '¿Dónde está la composición y la osmolaridad exactas de la solución que llevas en la unidad?',
        opciones: [
          'En cualquier manual de farmacología general.',
          'En la información para prescribir del producto registrado que usa tu servicio.',
          'En la NOM-034.',
          'En la etiqueta del equipo de venoclisis.',
        ],
        correcta: 1,
        explicacion: 'La IPP del producto registrado ante COFEPRIS es la fuente de composición, indicaciones y advertencias; la NOM-034 regula equipamiento, no dosis.',
      },
      {
        pregunta: 'Traumatizado que sangra activamente por una herida en muslo. ¿Qué es correcto?',
        opciones: [
          'Administrar volumen abundante antes de controlar el sangrado.',
          'Controlar la hemorragia y trasladar; el volumen acompaña, no reemplaza.',
          'Esperar a que la presión caiga para iniciar la administración.',
          'Administrar solución hipotónica para hidratar la célula.',
        ],
        correcta: 1,
        explicacion: 'Administrar líquido sin controlar el origen diluye y enfría sin corregir la causa; en el traumatizado la hipotermia además agrava la hemorragia.',
      },
    ],
    actividades: null,
    revision: ficha([
      'DECISIÓN PENDIENTE: la academia debe declarar qué soluciones lleva cada tipo de unidad, con '
        + 'qué presentación y con qué objetivos de reposición por cuadro. Sin esa lista, la lección '
        + 'no puede pasar de razonar sobre tonicidad a indicar una solución concreta.',
    ]),
  },

  // ============================================================
  //  Técnica de canalización
  // ============================================================
  'm3-vi-canalizacion': {
    icono: '🩹',
    duracion: '18 min',
    resumen: 'La secuencia completa de una venoclisis periférica, desde la preparación aséptica hasta la '
      + 'vigilancia posterior, y los errores que convierten un acceso en una complicación.',
    objetivos: [
      'Preparar el material y el sitio con técnica aséptica.',
      'Ejecutar la punción y comprobar la permeabilidad del catéter.',
      'Fijar, registrar y vigilar el acceso durante el traslado.',
      'Reconocer y resolver las complicaciones inmediatas más frecuentes.',
    ],
    secciones: [
      {
        titulo: 'Preparación',
        bloques: [
          { tipo: 'p', texto: 'La preparación decide el resultado igual que en cualquier otro procedimiento invasivo. Se explica al paciente qué se le va a hacer y para qué, se obtiene su consentimiento cuando está en condiciones de darlo y se dispone todo el material antes de tocar la piel.' },
          {
            tipo: 'lista',
            titulo: 'Antes de puncionar',
            items: [
              'Higiene de manos y colocación de guantes.',
              'Material completo y al alcance: catéter y uno de repuesto, equipo purgado, solución, apósito de fijación, contenedor rígido para punzocortantes y gasas.',
              'Torniquete o compresor preparado.',
              'Antisepsia de la zona con el producto que use el servicio, respetando su tiempo de secado.',
              'Iluminación suficiente y una posición estable para el brazo del paciente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El contenedor, antes que la aguja', texto: 'El contenedor rígido de punzocortantes se coloca al alcance ANTES de puncionar. La mayoría de los pinchazos accidentales ocurren cuando alguien busca dónde depositar la aguja con ella todavía en la mano.' },
        ],
      },
      {
        titulo: 'Técnica',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia',
            items: [
              'Colocar el compresor proximal al sitio elegido, sin ocluir el pulso arterial.',
              'Seleccionar la vena por palpación, no solo por su aspecto.',
              'Realizar la antisepsia y dejar secar sin volver a palpar la zona preparada.',
              'Traccionar la piel distalmente para fijar la vena.',
              'Puncionar con el bisel hacia arriba y con un ángulo bajo respecto de la piel.',
              'Comprobar el retorno de sangre en la cámara del catéter.',
              'Disminuir el ángulo y avanzar unos milímetros más antes de deslizar la cánula.',
              'Deslizar la cánula sobre la aguja y retirar la aguja depositándola de inmediato en el contenedor.',
              'Retirar el compresor, comprimir por encima del extremo de la cánula y conectar el equipo.',
              'Comprobar la permeabilidad: la solución debe pasar sin resistencia y sin producir edema.',
              'Fijar con apósito, dejando visible el sitio de inserción.',
              'Registrar sitio, calibre utilizado, hora e incidencias.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Por qué avanzar unos milímetros tras el retorno', texto: 'El retorno de sangre indica que la punta de la AGUJA entró en la vena, no necesariamente la cánula, que empieza algo más atrás. Deslizar la cánula en ese momento la deja fuera del vaso y produce una infiltración inmediata.' },
          { tipo: 'p', texto: 'El número de intentos aceptable antes de cambiar de estrategia y la elección del calibre corresponden al protocolo del servicio y al material disponible en la unidad. Insistir indefinidamente en un paciente que necesita traslado no es perseverancia: es tiempo perdido.' },
        ],
      },
      {
        titulo: 'Complicaciones inmediatas',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Reconocer y resolver',
            headers: ['Situación', 'Cómo se reconoce', 'Conducta'],
            filas: [
              ['Infiltración', 'Edema, frialdad y dolor en la zona; la solución deja de pasar bien', 'Suspender, retirar el catéter, comprimir y elevar el miembro; canalizar en otro sitio'],
              ['Punción arterial', 'Sangre roja brillante y pulsátil', 'Retirar y comprimir de forma sostenida; vigilar el miembro'],
              ['Hematoma', 'Tumefacción azulada que aparece durante o tras la punción', 'Retirar si el catéter no es funcional, comprimir y registrar'],
              ['Fallo del intento', 'No hay retorno de sangre o la cánula no avanza', 'No reintroducir la aguja dentro de la cánula; retirar el conjunto y usar material nuevo'],
              ['Punción accidental del prestador', 'Contacto con la aguja usada', 'Aplicar el protocolo de exposición ocupacional del servicio sin demora'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Nunca reintroducir la aguja en la cánula', texto: 'Volver a introducir la aguja dentro de una cánula ya avanzada puede seccionarla y liberar un fragmento en la circulación. Si el intento falla, se retira el conjunto completo y se usa material nuevo.' },
          { tipo: 'p', texto: 'Durante el traslado el acceso se reevalúa: que siga permeable, que el apósito no se haya desprendido y que no aparezca edema. Cada movilización del paciente es un momento en que un catéter puede desplazarse.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Técnica aséptica', definicion: 'Conjunto de medidas que reducen la contaminación durante un procedimiento invasivo: higiene de manos, guantes, antisepsia y respeto de la zona preparada.' },
      { termino: 'Retorno de sangre', definicion: 'Aparición de sangre en la cámara del catéter, que indica que la punta de la aguja alcanzó la luz venosa.' },
      { termino: 'Permeabilidad', definicion: 'Paso de la solución sin resistencia y sin producir edema; confirma que la cánula está dentro del vaso.' },
      { termino: 'Embolia de catéter', definicion: 'Liberación a la circulación de un fragmento de cánula seccionado al reintroducir la aguja; se evita retirando el conjunto completo.' },
    ],
    flashcards: [
      { frente: '¿Qué se coloca al alcance antes de puncionar?', reverso: 'El contenedor rígido de punzocortantes.' },
      { frente: '¿Por qué se avanza unos milímetros tras ver el retorno de sangre?', reverso: 'Porque el retorno indica que entró la aguja, no necesariamente la cánula, que empieza algo más atrás.' },
      { frente: '¿Qué nunca se hace ante un intento fallido?', reverso: 'Reintroducir la aguja dentro de la cánula ya avanzada: puede seccionarla.' },
      { frente: '¿Cómo se reconoce una infiltración?', reverso: 'Edema, frialdad y dolor en la zona, con la solución pasando mal.' },
      { frente: '¿Cómo se distingue una punción arterial?', reverso: 'Sangre roja brillante y pulsátil.' },
      { frente: '¿Qué se registra tras canalizar?', reverso: 'Sitio, calibre utilizado, hora e incidencias.' },
    ],
    quiz: [
      {
        pregunta: 'Ves retorno de sangre y deslizas la cánula de inmediato. Aparece edema. ¿Qué pasó?',
        opciones: [
          'La vena era demasiado frágil.',
          'La cánula quedó fuera del vaso: el retorno indicaba solo que la aguja había entrado.',
          'El compresor estaba demasiado apretado.',
          'La solución era hipotónica.',
        ],
        correcta: 1,
        explicacion: 'La cánula empieza algo más atrás que la punta de la aguja; por eso se avanza unos milímetros antes de deslizarla.',
      },
      {
        pregunta: 'El intento falla y la cánula no avanza. ¿Qué haces?',
        opciones: [
          'Reintroducir la aguja para reorientar la cánula.',
          'Retirar el conjunto completo y usar material nuevo.',
          'Empujar con más fuerza.',
          'Conectar el equipo y comprobar si pasa.',
        ],
        correcta: 1,
        explicacion: 'Reintroducir la aguja puede seccionar la cánula y liberar un fragmento en la circulación.',
      },
      {
        pregunta: 'Obtienes sangre roja brillante y pulsátil. ¿Qué ocurrió y qué haces?',
        opciones: [
          'Es una vena de buen calibre: continúas.',
          'Es una punción arterial: retiras y comprimes de forma sostenida.',
          'Es un hematoma: elevas el miembro.',
          'Es infiltración: cambias de sitio sin comprimir.',
        ],
        correcta: 1,
        explicacion: 'El carácter pulsátil y el color identifican la punción arterial, que exige compresión sostenida y vigilancia del miembro.',
      },
      {
        pregunta: '¿Por qué el contenedor de punzocortantes se prepara antes de la punción?',
        opciones: [
          'Para cumplir la norma de residuos.',
          'Porque la mayoría de los pinchazos accidentales ocurren al buscar dónde depositar la aguja ya usada.',
          'Porque agiliza el registro.',
          'Porque mantiene la asepsia del campo.',
        ],
        correcta: 1,
        explicacion: 'Es una medida de seguridad del prestador: la aguja usada debe ir al contenedor sin trayectos intermedios.',
      },
      {
        pregunta: 'Tras movilizar al paciente a la camilla, ¿qué compruebas del acceso?',
        opciones: [
          'Nada: ya estaba fijado.',
          'Permeabilidad, fijación del apósito y ausencia de edema.',
          'Solo la velocidad de goteo.',
          'El calibre del catéter.',
        ],
        correcta: 1,
        explicacion: 'Cada movilización es un momento en que el catéter puede desplazarse; el acceso se reevalúa después de cada una.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la canalización de una vena periférica',
        pasos: [
          'Preparar material, guantes y contenedor de punzocortantes',
          'Colocar el compresor proximal al sitio elegido',
          'Seleccionar la vena por palpación',
          'Realizar antisepsia y dejar secar',
          'Puncionar con el bisel hacia arriba y ángulo bajo',
          'Comprobar el retorno de sangre y avanzar unos milímetros',
          'Deslizar la cánula y depositar la aguja en el contenedor',
          'Retirar el compresor, conectar y comprobar permeabilidad',
          'Fijar dejando visible el sitio y registrar',
        ],
      },
    },
    revision: ficha([
      'La lección incluye la práctica que el título del plan menciona; la evaluación de la destreza '
        + 'corresponde a la práctica del módulo y requiere lista de cotejo y supervisión.',
      'No se declaran calibres por indicación ni número máximo de intentos: dependen del material de '
        + 'la unidad y del protocolo del servicio.',
    ]),
  },

  // ============================================================
  //  Acceso intraóseo (el plan lo titula «Osteólisis»)
  // ============================================================
  'm3-vi-osteolisis': {
    icono: '🦴',
    duracion: '16 min',
    resumen: 'El acceso a la circulación a través de la cavidad medular del hueso: cuándo sustituye a la '
      + 'vía intravenosa, dónde se coloca y por qué el término del plan es una errata.',
    objetivos: [
      'Explicar el fundamento del acceso intraóseo y su equivalencia funcional con la vía venosa.',
      'Identificar sus indicaciones y sus contraindicaciones.',
      'Describir la técnica general, la confirmación y las complicaciones.',
      'Distinguir el término correcto del que aparece en el plan de estudios.',
    ],
    secciones: [
      {
        titulo: 'Una errata que conviene aclarar primero',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Osteólisis no es este procedimiento', texto: 'El plan de estudios oficial titula este tema «Osteólisis», y ese título es una errata documental: osteólisis significa destrucción o resorción del tejido óseo y no designa ningún acceso vascular. El término correcto para este procedimiento es OSTEOCLISIS o, en la nomenclatura de uso actual, ACCESO INTRAÓSEO. La errata se conserva como título documental por fidelidad al plan; lo que se enseña y lo que se evalúa es el acceso intraóseo.' },
        ],
      },
      {
        titulo: 'Por qué funciona',
        bloques: [
          { tipo: 'p', texto: 'La cavidad medular de los huesos largos contiene una red de vasos que drena a la circulación venosa central y que no se colapsa cuando el resto del sistema venoso periférico lo hace. Al introducir una aguja en esa cavidad se obtiene una vía de administración funcionalmente equivalente a una vena periférica: acepta líquidos y medicamentos, y lo administrado alcanza la circulación en un tiempo comparable.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La ventaja aparece justo cuando la vena desaparece', texto: 'En el paciente con hipoperfusión grave, las venas periféricas se colapsan y son precisamente las más difíciles de canalizar. La cavidad medular está sostenida por el hueso y no se colapsa, así que el acceso intraóseo mantiene su tasa de éxito en el paciente en que la vía intravenosa la pierde.' },
        ],
      },
      {
        titulo: 'Indicaciones, contraindicaciones y sitios',
        bloques: [
          { tipo: 'p', texto: 'La indicación general es la necesidad urgente de acceso vascular cuando la vía intravenosa no se consigue con rapidez o no es viable. Cuándo exactamente se da ese umbral —cuántos intentos, cuántos segundos— lo define el protocolo del servicio.' },
          {
            tipo: 'lista',
            titulo: 'Contraindicaciones',
            items: [
              'Fractura del hueso elegido o del hueso proximal a él.',
              'Intento previo de acceso intraóseo en ese mismo hueso, aunque haya fallado.',
              'Infección, quemadura o lesión de la piel en el sitio de inserción.',
              'Prótesis o material de osteosíntesis en la zona.',
              'Enfermedad ósea conocida que comprometa la resistencia del hueso, según valoración y protocolo.',
            ],
          },
          { tipo: 'p', texto: 'Los sitios de inserción habituales son la tibia proximal, la tibia distal y el húmero proximal, con referencias anatómicas propias de cada uno. Cuáles están autorizados, con qué dispositivo y en qué grupo de edad depende del equipo que tenga la unidad y del protocolo: los dispositivos disponibles no son intercambiables y cada uno indica sus sitios y su técnica en sus instrucciones.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un solo intento por hueso', texto: 'Si un intento falla, ese hueso queda inutilizado: la perforación previa deja escapar por ella lo que se administre después. El siguiente intento se hace en otro hueso, nunca en el mismo.' },
        ],
      },
      {
        titulo: 'Técnica, confirmación y complicaciones',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia general',
            items: [
              'Identificar el sitio por sus referencias anatómicas y comprobar que no hay contraindicación.',
              'Realizar antisepsia de la zona.',
              'Insertar la aguja perpendicular a la superficie ósea, con el dispositivo y la técnica que indique el fabricante.',
              'Detener la progresión al notar la pérdida de resistencia que indica la entrada en la cavidad medular.',
              'Retirar el estilete y estabilizar la aguja.',
              'Confirmar la posición antes de administrar nada.',
              'Fijar el dispositivo y registrar sitio, hora y dispositivo empleado.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Cómo se confirma',
            items: [
              'La aguja se sostiene sola, firme en el hueso.',
              'Se obtiene aspirado de contenido medular, aunque su ausencia no descarta una posición correcta.',
              'La solución pasa sin resistencia y sin producir tumefacción en el tejido blando circundante.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La complicación que hay que vigilar', texto: 'La extravasación al tejido blando es la complicación más frecuente y puede pasar desapercibida bajo la ropa. Se detecta palpando la zona alrededor del sitio: una tumefacción creciente obliga a suspender de inmediato, porque el líquido acumulado en un compartimento cerrado puede comprometer la circulación del miembro.' },
          {
            tipo: 'lista',
            titulo: 'Otras complicaciones',
            items: [
              'Dolor intenso durante la administración en el paciente consciente; su manejo depende del protocolo.',
              'Infección local u osteomielitis.',
              'Fractura del hueso durante la inserción.',
              'Desplazamiento del dispositivo con la movilización.',
            ],
          },
          { tipo: 'p', texto: 'El acceso intraóseo es una medida para la urgencia y no está pensado para permanecer indefinidamente: el tiempo máximo de permanencia lo establece el fabricante del dispositivo y el protocolo del centro receptor.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Acceso intraóseo', definicion: 'Vía de administración establecida en la cavidad medular de un hueso largo, funcionalmente equivalente a una vena periférica.' },
      { termino: 'Osteoclisis', definicion: 'Denominación correcta del procedimiento en el plan; el término «osteólisis» que aparece en el documento es una errata.' },
      { termino: 'Osteólisis', definicion: 'Destrucción o resorción del tejido óseo; no designa ningún acceso vascular.' },
      { termino: 'Pérdida de resistencia', definicion: 'Sensación que indica que la aguja atravesó la cortical y alcanzó la cavidad medular.' },
      { termino: 'Extravasación intraósea', definicion: 'Acumulación de la solución en el tejido blando circundante; complicación más frecuente y con riesgo de compromiso circulatorio.' },
    ],
    flashcards: [
      { frente: '¿Por qué el acceso intraóseo funciona cuando la vena periférica no?', reverso: 'Porque la cavidad medular está sostenida por el hueso y no se colapsa con la hipoperfusión.' },
      { frente: '¿Cuál es el término correcto y cuál el del plan?', reverso: 'El correcto es osteoclisis o acceso intraóseo; el plan lo titula «osteólisis», que es una errata y significa destrucción de tejido óseo.' },
      { frente: '¿Cuántos intentos se hacen en un mismo hueso?', reverso: 'Uno. Si falla, la perforación previa deja escapar lo que se administre; el siguiente intento va en otro hueso.' },
      { frente: 'Nombra tres contraindicaciones.', reverso: 'Fractura del hueso elegido, intento previo en ese hueso e infección o quemadura de la piel del sitio.' },
      { frente: '¿Cómo se confirma la posición?', reverso: 'La aguja se sostiene sola, puede obtenerse aspirado medular y la solución pasa sin resistencia ni tumefacción.' },
      { frente: '¿Cuál es la complicación más frecuente y cómo se detecta?', reverso: 'La extravasación al tejido blando; se detecta palpando la zona en busca de tumefacción creciente.' },
    ],
    quiz: [
      {
        pregunta: 'El plan de estudios usa como título el término «Osteólisis» para este tema. ¿Qué debes concluir?',
        opciones: [
          'Que el procedimiento consiste en resorber tejido óseo.',
          'Que es una errata: el procedimiento es la osteoclisis o acceso intraóseo.',
          'Que se trata de una técnica distinta del acceso intraóseo.',
          'Que el término correcto depende del país.',
        ],
        correcta: 1,
        explicacion: 'Osteólisis designa destrucción del tejido óseo y no un acceso vascular; el título documental se conserva por fidelidad al plan, pero lo que se enseña es el acceso intraóseo.',
      },
      {
        pregunta: 'Un intento en la tibia proximal derecha falla. ¿Dónde haces el siguiente?',
        opciones: [
          'En el mismo sitio, con una aguja nueva.',
          'En otro hueso: la perforación previa deja escapar lo que se administre.',
          'Unos centímetros más arriba, en la misma tibia.',
          'En una vena periférica del mismo miembro.',
        ],
        correcta: 1,
        explicacion: 'Un hueso puncionado sin éxito queda inutilizado para ese episodio; el siguiente intento se hace en un hueso distinto.',
      },
      {
        pregunta: 'Durante la administración notas tumefacción creciente alrededor del sitio. ¿Qué haces?',
        opciones: [
          'Aumentar la presión de infusión.',
          'Suspender de inmediato: es una extravasación al tejido blando.',
          'Retirar el estilete.',
          'Cambiar la solución por una isotónica.',
        ],
        correcta: 1,
        explicacion: 'El líquido acumulado en un compartimento cerrado puede comprometer la circulación del miembro; es la complicación más frecuente del procedimiento.',
      },
      {
        pregunta: '¿Cuál de estas situaciones contraindica el acceso intraóseo en ese hueso?',
        opciones: [
          'Hipoperfusión grave.',
          'Fractura del propio hueso o del hueso proximal a él.',
          'Paciente inconsciente.',
          'Traslado prolongado.',
        ],
        correcta: 1,
        explicacion: 'La hipoperfusión grave es más bien su indicación; la fractura del hueso elegido lo excluye porque lo administrado escaparía por el foco.',
      },
      {
        pregunta: 'La aspiración de contenido medular no obtiene nada, pero la aguja se sostiene sola y la solución pasa sin resistencia ni tumefacción. ¿Qué concluyes?',
        opciones: [
          'Que la posición es incorrecta y hay que retirar.',
          'Que la posición puede ser correcta: la ausencia de aspirado no la descarta.',
          'Que hay extravasación.',
          'Que el dispositivo está roto.',
        ],
        correcta: 1,
        explicacion: 'La confirmación se apoya en varios signos; la ausencia de aspirado por sí sola no descarta una posición correcta.',
      },
    ],
    actividades: null,
    revision: ficha([
      'Cumple la nota del registro académico: el tema se muestra como acceso intraóseo/osteoclisis y '
        + '«osteólisis» se conserva únicamente como errata documental del plan.',
      'No se declaran sitios autorizados por edad, calibres de aguja ni tiempos máximos de '
        + 'permanencia: los define el fabricante del dispositivo y el protocolo del servicio.',
      'DECISIÓN PENDIENTE: la academia debe declarar qué dispositivo intraóseo tienen sus unidades, '
        + 'en qué sitios y grupos de edad lo autoriza y qué analgesia contempla su protocolo para el '
        + 'paciente consciente.',
    ]),
  },
}
