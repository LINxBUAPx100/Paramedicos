// ============================================================
//  Módulo 4 · Epidemiología y clasificación de enfermedades
// ------------------------------------------------------------
//  Unidad completa (1 semana, 5 horas), en el orden del PDF: conceptos básicos
//  de epidemiología, urgencia y emergencia, y la clasificación de las
//  enfermedades por curso, frecuencia, origen y sistemas.
//
//  Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json para `m4-epidemiologia`:
//  primaria OMS BEC; requiere protocolo local; nota expresa: «Agregar fuente
//  oficial mexicana para cualquier dato epidemiológico cuantitativo».
//
//  Esa nota gobierna todo el archivo. Aquí NO hay una sola cifra
//  epidemiológica: ni tasas, ni porcentajes, ni «las tres primeras causas
//  de…». Una cifra sin fuente y sin fecha envejece mal y se repite durante
//  años; enseñar a leerla es más útil y más honesto que fabricarla.
//
//  Segunda regla del lote: estas clasificaciones son EDUCATIVAS. No son
//  diagnósticos, no son niveles de gravedad y no son prioridades de triage.
//  Se dice expresamente en cada tema porque la confusión entre «urgencia» como
//  categoría legal y «urgencia» como prioridad de atención es uno de los
//  errores conceptuales más extendidos del medio.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

const OMS_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Marco de la atención al paciente agudo del que procede la distinción entre el curso de la '
    + 'enfermedad y la urgencia de la atención.',
}
const REGLAMENTO_LGS = {
  nombre: 'Reglamento de la Ley General de Salud en Materia de Prestación de Servicios de Atención '
    + 'Médica, texto vigente (última reforma publicada en el DOF el 17 de julio de 2018), artículo 72.',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LGS_MPSAM_170718.pdf',
  nota: 'Definición jurídica mexicana de urgencia: todo problema médico-quirúrgico agudo que ponga '
    + 'en peligro la vida, un órgano o una función y que requiera atención inmediata.',
}
// Cita AMPLIADA para el tema de urgencia y emergencia. La versión corta de
// arriba basta cuando solo se usa la definición; en cuanto se habla de a QUIÉN
// obliga la norma hacen falta los artículos que fijan ámbito y sujeto, porque
// el 72 por sí solo no los contiene.
const REGLAMENTO_LGS_AMBITO = {
  nombre: 'Reglamento de la Ley General de Salud en Materia de Prestación de Servicios de Atención '
    + 'Médica, texto vigente (última reforma publicada en el DOF el 17 de julio de 2018): '
    + 'artículos 1o., 7o. fracción III, 71, 72 y 73. Consultado el 16 de agosto de 2026.',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LGS_MPSAM_170718.pdf',
  nota: 'Artículo 1o.: ámbito de aplicación en todo el territorio nacional en materia de prestación '
    + 'de servicios de atención médica. Artículo 7o. fracción III (reformada el 17 de julio de 2018): '
    + 'el establecimiento para la atención médica puede ser fijo o móvil. Artículo 71, dentro del '
    + 'capítulo de servicios de hospitales: obliga a prestar atención inmediata a los establecimientos '
    + 'que brindan atención médica para el internamiento de enfermos, ante la urgencia ocurrida en su '
    + 'cercanía. Artículo 72: definición de urgencia. Artículo 73: obligación del responsable del '
    + 'servicio de urgencias del establecimiento.',
}
const NOM_034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, Regulación de los servicios de salud. '
    + 'Atención médica prehospitalaria, publicada el 23 de septiembre de 2014.',
  url: 'https://www.gob.mx/cms/uploads/attachment/file/512076/NOM-034-SSA3-2013.pdf',
  nota: 'Marco mexicano del servicio prehospitalario y de los tipos de unidad. No contiene datos '
    + 'epidemiológicos ni dosificación.',
}

// La NOM-034 entra en el tema de urgencia por dos numerales concretos, no como
// referencia genérica: el 2 es el que convierte al prestador prehospitalario en
// sujeto obligado —cosa que el artículo 72 NO hace— y el 4.1.7 es el puente
// conceptual entre la definición del reglamento y el ámbito prehospitalario.
const NOM_034_AMBITO = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, Regulación de los servicios de salud. '
    + 'Atención médica prehospitalaria, publicada el 23 de septiembre de 2014: numerales 2 y 4.1.7. '
    + 'Consultada el 16 de agosto de 2026.',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5361072&fecha=23/09/2014',
  nota: 'Numeral 2, campo de aplicación: de observancia obligatoria para todos los prestadores de '
    + 'servicios de atención médica prehospitalaria de los sectores público, social y privado que '
    + 'operan ambulancias. Numeral 4.1.7: definición de atención médica prehospitalaria en términos de '
    + 'peligro para la vida, un órgano o su función.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })
const FUENTES = F([OMS_BEC, REGLAMENTO_LGS, NOM_034])
const FUENTES_URGENCIA = F([REGLAMENTO_LGS_AMBITO, NOM_034_AMBITO, OMS_BEC])

const SIN_CIFRAS = 'No se publica ninguna cifra epidemiológica. El registro académico exige fuente '
  + 'oficial mexicana y fecha para todo dato cuantitativo; la lección enseña a leer e interpretar '
  + 'las medidas en vez de fijar números que envejecen.'
const NO_ES_TRIAGE = 'Se declara expresamente que estas clasificaciones son educativas y NO '
  + 'constituyen diagnóstico, nivel de gravedad ni prioridad de triage.'

const ficha = (extra = []) => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'OMS BEC 2018; Reglamento LGS en Materia de Prestación de Servicios, art. 72; '
    + 'NOM-034-SSA3-2013',
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    SIN_CIFRAS,
    ...extra,
  ],
  fuentes: [
    'WHO/ICRC. Basic Emergency Care, 2018.',
    'Reglamento de la Ley General de Salud en Materia de Prestación de Servicios de Atención Médica, art. 72.',
    'NOM-034-SSA3-2013, DOF.',
  ],
})

export default {
  // ============================================================
  //  Conceptos básicos de epidemiología
  // ============================================================
  'm4-epi-conceptos': {
    icono: '📊',
    duracion: '16 min',
    resumen: 'Qué mide la epidemiología, para qué le sirve a quien atiende urgencias y por qué una cifra '
      + 'sin fuente y sin fecha es peor que ninguna cifra.',
    objetivos: [
      'Definir epidemiología y su objeto de estudio.',
      'Distinguir incidencia, prevalencia, morbilidad, mortalidad y letalidad.',
      'Diferenciar factor de riesgo de causa.',
      'Identificar el papel del prestador prehospitalario como fuente de información epidemiológica.',
    ],
    secciones: [
      {
        titulo: 'Qué estudia y qué no',
        bloques: [
          { tipo: 'p', texto: 'La epidemiología estudia cómo se distribuyen los problemas de salud en las poblaciones y qué factores determinan esa distribución. Su unidad de análisis no es el paciente sino el grupo: no responde a «¿qué tiene esta persona?», sino a «¿qué es frecuente en personas como esta, en este lugar y en este momento?».' },
          { tipo: 'callout', variante: 'clave', titulo: 'Para qué le sirve a quien atiende urgencias', texto: 'No para diagnosticar. Sirve para orientar la sospecha antes de explorar —lo frecuente es frecuente— y para no dejarse llevar por lo llamativo. También sirve para entender por qué el servicio se organiza como se organiza: dónde se ubican las unidades, qué material llevan y qué formación se prioriza salen de datos de población, no de intuiciones.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo frecuente orienta; no decide', texto: 'Que un cuadro sea poco frecuente no lo descarta en el paciente que se tiene delante, y que sea frecuente no lo confirma. La epidemiología ajusta la probabilidad previa; la exploración y la evolución son las que deciden.' },
        ],
      },
      {
        titulo: 'Las medidas y qué responde cada una',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Medidas básicas',
            headers: ['Medida', 'Qué responde', 'Con qué se confunde'],
            filas: [
              ['Incidencia', '¿Cuántos casos NUEVOS aparecen en un periodo?', 'Con la prevalencia'],
              ['Prevalencia', '¿Cuántos casos EXISTEN en un momento dado?', 'Con la incidencia'],
              ['Morbilidad', '¿Cuánta enfermedad hay en la población?', 'Con la mortalidad'],
              ['Mortalidad', '¿Cuántas muertes ocurren en la población?', 'Con la letalidad'],
              ['Letalidad', 'De los que enferman, ¿qué proporción muere?', 'Con la mortalidad'],
            ],
          },
          { tipo: 'p', texto: 'La diferencia entre incidencia y prevalencia se entiende mejor con su comportamiento: una enfermedad de curso corto —que cura o mata pronto— puede tener incidencia alta y prevalencia baja, porque los casos no se acumulan. Una enfermedad crónica que no se cura acumula casos y su prevalencia crece aunque aparezcan pocos casos nuevos.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Mortalidad y letalidad no son lo mismo', texto: 'La mortalidad se calcula sobre toda la población; la letalidad, solo sobre quienes tienen la enfermedad. Un padecimiento raro pero casi siempre mortal tiene letalidad muy alta y mortalidad poblacional baja. Confundirlas produce afirmaciones alarmantes y falsas en las dos direcciones.' },
          { tipo: 'p', texto: 'Toda medida se expresa siempre con tres datos que la hacen interpretable: sobre qué población se calculó, en qué periodo y con qué fuente. Una cifra sin esos tres datos no puede compararse ni actualizarse.' },
        ],
      },
      {
        titulo: 'Factor de riesgo no es causa',
        bloques: [
          { tipo: 'p', texto: 'Un factor de riesgo es una característica o exposición que se asocia a mayor probabilidad de presentar un problema de salud. Asociación no es causalidad: dos hechos pueden aparecer juntos porque uno produce al otro, porque ambos dependen de un tercero o por el modo en que se recogieron los datos.' },
          {
            tipo: 'lista',
            titulo: 'Distinción práctica',
            items: [
              'Factor de riesgo modificable: puede cambiarse con una intervención.',
              'Factor de riesgo no modificable: acompaña a la persona y no se elimina, pero sí orienta.',
              'Determinantes de la salud: condiciones de vida, trabajo, entorno y acceso a servicios que influyen en la distribución de la enfermedad más allá de lo individual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El uso indebido más común', texto: 'Convertir un factor de riesgo en un juicio sobre el paciente. La utilidad de un factor de riesgo es anticipar y prevenir, no explicar la enfermedad de alguien con su conducta ni justificar una atención distinta.' },
        ],
      },
      {
        titulo: 'El prestador prehospitalario como fuente de datos',
        bloques: [
          { tipo: 'p', texto: 'Los sistemas de vigilancia epidemiológica se alimentan de lo que el personal de salud registra. En el ámbito prehospitalario eso significa que el registro de atención no es solo un documento clínico y legal: es también el origen de la información con la que después se describe qué ocurre en una zona.' },
          { tipo: 'p', texto: 'De ahí una consecuencia concreta: un registro incompleto o impreciso no solo perjudica al paciente y al prestador, sino que degrada la información con la que se planifica el servicio. La hora del evento, el mecanismo, la localización y el desenlace inmediato son datos que solo puede aportar quien estuvo ahí.' },
          { tipo: 'callout', variante: 'clave', titulo: 'De dónde salen las cifras en México', texto: 'Los datos epidemiológicos oficiales mexicanos proceden de los sistemas de vigilancia de la Secretaría de Salud y de las fuentes estadísticas nacionales. Cualquier cifra que se enseñe en este curso debe citarse con su fuente oficial y su año, y revisarse cuando esa fuente se actualice. Esta lección no publica ninguna precisamente por eso.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Epidemiología', definicion: 'Estudio de la distribución de los problemas de salud en las poblaciones y de los factores que la determinan.' },
      { termino: 'Incidencia', definicion: 'Número de casos nuevos que aparecen en una población durante un periodo.' },
      { termino: 'Prevalencia', definicion: 'Número de casos existentes en una población en un momento dado.' },
      { termino: 'Letalidad', definicion: 'Proporción de personas que mueren entre las que tienen la enfermedad; se calcula solo sobre los enfermos.' },
      { termino: 'Factor de riesgo', definicion: 'Característica o exposición asociada a mayor probabilidad de un problema de salud; asociación no implica causalidad.' },
      { termino: 'Determinantes de la salud', definicion: 'Condiciones de vida, trabajo, entorno y acceso a servicios que influyen en la distribución de la enfermedad.' },
    ],
    flashcards: [
      { frente: 'Incidencia frente a prevalencia', reverso: 'Incidencia son casos nuevos en un periodo; prevalencia son casos existentes en un momento.' },
      { frente: '¿Por qué una enfermedad crónica acumula prevalencia?', reverso: 'Porque los casos no se resuelven y se suman, aunque aparezcan pocos casos nuevos.' },
      { frente: 'Mortalidad frente a letalidad', reverso: 'La mortalidad se calcula sobre toda la población; la letalidad, solo sobre quienes tienen la enfermedad.' },
      { frente: '¿Qué tres datos hacen interpretable una medida epidemiológica?', reverso: 'Sobre qué población se calculó, en qué periodo y con qué fuente.' },
      { frente: '¿Asociación implica causalidad?', reverso: 'No: pueden aparecer juntos por causalidad, por un tercer factor común o por cómo se recogieron los datos.' },
      { frente: '¿Qué papel tiene el registro prehospitalario en la vigilancia?', reverso: 'Es fuente de datos: hora, mecanismo, localización y desenlace inmediato solo puede aportarlos quien estuvo en la escena.' },
    ],
    quiz: [
      {
        pregunta: 'Una enfermedad de curso corto que cura o mata pronto tiende a tener:',
        opciones: [
          'Prevalencia alta e incidencia baja.',
          'Incidencia alta y prevalencia baja, porque los casos no se acumulan.',
          'Letalidad y mortalidad idénticas.',
          'Prevalencia creciente con el tiempo.',
        ],
        correcta: 1,
        explicacion: 'Los casos no se acumulan porque se resuelven pronto; la acumulación es lo que eleva la prevalencia en las enfermedades crónicas.',
      },
      {
        pregunta: 'Un padecimiento raro pero casi siempre mortal tendrá:',
        opciones: [
          'Mortalidad poblacional alta y letalidad baja.',
          'Letalidad muy alta y mortalidad poblacional baja.',
          'Ambas altas por definición.',
          'Ambas bajas por ser poco frecuente.',
        ],
        correcta: 1,
        explicacion: 'La letalidad se calcula solo sobre los enfermos y por eso es alta; la mortalidad se calcula sobre toda la población y por eso es baja si el padecimiento es raro.',
      },
      {
        pregunta: 'Un paciente presenta un cuadro poco frecuente para su edad. ¿Cómo usas ese dato epidemiológico?',
        opciones: [
          'Para descartar el cuadro.',
          'Para ajustar la sospecha, sin que sustituya a la exploración y la evolución.',
          'Para clasificar su prioridad de atención.',
          'Para asignar un diagnóstico definitivo.',
        ],
        correcta: 1,
        explicacion: 'La frecuencia orienta la probabilidad previa; ni descarta ni confirma, y no es un criterio de prioridad.',
      },
      {
        pregunta: '¿Por qué esta lección no incluye cifras de morbilidad o mortalidad?',
        opciones: [
          'Porque no existen datos en México.',
          'Porque toda cifra exige fuente oficial y año, y una cifra sin ellos envejece y se repite durante años.',
          'Porque son irrelevantes para el prestador prehospitalario.',
          'Porque las publica únicamente la Organización Mundial de la Salud.',
        ],
        correcta: 1,
        explicacion: 'El requisito del expediente académico es fuente oficial mexicana y fecha para todo dato cuantitativo; enseñar a leer la medida es más duradero que fijar el número.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La ___ cuenta casos nuevos en un periodo; la prevalencia cuenta los casos que existen en un momento.',
          opciones: ['letalidad', 'incidencia', 'morbilidad'],
          correcta: 1,
          explicacion: 'Es la distinción que explica por qué las enfermedades crónicas acumulan prevalencia.',
        },
      ],
    },
    revision: ficha([
      'DECISIÓN PENDIENTE: si la academia quiere enseñar cifras concretas —principales causas de '
        + 'atención prehospitalaria en su región, por ejemplo—, debe aportarlas con su fuente oficial '
        + 'mexicana y su año. Sin esa entrega, la lección se mantiene en el nivel conceptual.',
    ]),
  },

  // ============================================================
  //  Urgencia y emergencia
  // ============================================================
  'm4-epi-urgencia-emergencia': {
    icono: '⏱️',
    duracion: '15 min',
    resumen: 'Qué define exactamente el artículo 72 cuando dice «urgencia», qué otras disposiciones —y no '
      + 'ese artículo— fijan el ámbito y el sujeto obligado en el medio prehospitalario, y por qué «emergencia» '
      + 'y «urgencia sentida» no son categorías normativas.',
    objetivos: [
      'Enunciar la definición jurídica mexicana de urgencia y sus cuatro elementos.',
      'Separar la definición de un término, el ámbito de aplicación de la disposición y el sujeto obligado.',
      'Identificar qué disposición hace obligatoria la norma para un prestador prehospitalario.',
      'Justificar por qué «emergencia» y «urgencia sentida» no clasifican prioridades ni generan obligaciones.',
    ],
    secciones: [
      {
        titulo: 'Qué define el artículo 72',
        bloques: [
          { tipo: 'p', texto: 'En México el término tiene una definición jurídica. El Reglamento de la Ley General de Salud en Materia de Prestación de Servicios de Atención Médica establece en su artículo 72 que se entiende por urgencia todo problema médico-quirúrgico agudo que ponga en peligro la vida, un órgano o una función y que requiera atención inmediata.' },
          {
            tipo: 'lista',
            titulo: 'Los cuatro elementos de esa definición',
            items: [
              'Es un problema médico-quirúrgico: abarca tanto la patología médica como la traumática y la que requiere cirugía.',
              'Es AGUDO: se refiere al curso, no a la intensidad del síntoma.',
              'Pone en peligro la vida, un ÓRGANO o una FUNCIÓN: el riesgo no tiene que ser mortal para que sea urgencia.',
              'Requiere atención inmediata.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El elemento que más se olvida', texto: 'La norma no exige riesgo de muerte. Un cuadro que amenaza la pérdida de un órgano o de una función —la visión, una extremidad, la movilidad— es urgencia en sentido jurídico aunque la vida no corra peligro. Es lo que impide despachar como «no urgente» todo lo que no sea un paro.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Una definición no es, por sí sola, una obligación', texto: 'El artículo 72 dice QUÉ es una urgencia. No dice a quién obliga, ni en qué establecimientos, ni qué debe hacer una ambulancia. Atribuirle un deber prehospitalario universal es un error frecuente: ese deber, cuando existe, nace de otras disposiciones que hay que citar por separado.' },
        ],
      },
      {
        titulo: 'Definición, ámbito y sujeto obligado: tres preguntas distintas',
        bloques: [
          { tipo: 'p', texto: 'Leer una disposición sanitaria exige responder tres preguntas que suelen confundirse. Qué significa el término (definición), dónde y sobre qué materia rige la disposición (ámbito de aplicación) y a quién le impone la conducta (sujeto obligado). El artículo 72 solo responde la primera.' },
          {
            tipo: 'tabla',
            titulo: 'Dónde se responde cada pregunta',
            headers: ['Pregunta', 'Disposición que la responde', 'Qué establece'],
            filas: [
              ['¿Qué es una urgencia?', 'Reglamento de la LGS en materia de prestación de servicios, art. 72', 'La definición: problema médico-quirúrgico agudo que pone en peligro la vida, un órgano o una función y requiere atención inmediata'],
              ['¿Dónde rige ese reglamento?', 'Mismo reglamento, art. 1o.', 'Es de aplicación en todo el territorio nacional en materia de prestación de servicios de atención médica'],
              ['¿Un establecimiento puede ser móvil?', 'Mismo reglamento, art. 7o. fracción III', 'El establecimiento para la atención médica puede ser fijo o móvil'],
              ['¿Qué obliga al hospital ante una urgencia cercana?', 'Mismo reglamento, arts. 71 y 73', 'El art. 71 obliga a los establecimientos de internamiento a prestar atención inmediata; el art. 73 fija el deber del responsable del servicio de urgencias del establecimiento'],
              ['¿Qué obliga a un prestador PREHOSPITALARIO?', 'NOM-034-SSA3-2013, numeral 2 (campo de aplicación)', 'La norma es de observancia obligatoria para todos los prestadores de servicios de atención médica prehospitalaria de los sectores público, social y privado que operan ambulancias'],
            ],
          },
          { tipo: 'p', texto: 'La consecuencia práctica es que un servicio prehospitalario no encuentra su marco de deberes en el artículo 72, sino en la NOM-034: es ella la que declara expresamente su campo de aplicación sobre los prestadores de atención médica prehospitalaria de los tres sectores. El artículo 72 aporta el concepto que esa norma y la práctica utilizan.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'El puente entre ambas', texto: 'La NOM-034 define en su numeral 4.1.7 la atención médica prehospitalaria como la otorgada al paciente cuya condición clínica se considera que pone en peligro la vida, un órgano o su función. Reaparece la misma tríada del artículo 72, ahora referida al ámbito prehospitalario y con su propio sujeto obligado.' },
        ],
      },
      {
        titulo: '«Emergencia» y «urgencia sentida»: lenguaje del gremio, no categorías normativas',
        bloques: [
          { tipo: 'p', texto: 'Las dos expresiones circulan a diario en el medio, pero conviene declarar su estatus con exactitud: ni el Reglamento de la Ley General de Salud en materia de prestación de servicios ni la NOM-034 las definen. No son conceptos formales, no tienen criterios verificables y no generan obligación alguna. Se enseñan aquí para que se reconozcan cuando se escuchen, no para usarlas como categorías.' },
          {
            tipo: 'lista',
            titulo: 'Cómo tratarlas',
            items: [
              '«Emergencia»: en el habla profesional en español suele sugerir una amenaza vital inmediata, pero ese matiz no está unificado entre servicios ni entre países y ninguna de las dos disposiciones anteriores lo recoge. En un registro clínico se describe el hallazgo, no se etiqueta con esta palabra.',
              '«Urgencia sentida»: expresión de uso común para nombrar la percepción de gravedad del propio usuario. No tiene definición normativa; el fenómeno que describe —que lo relatado por teléfono y lo encontrado no coincidan— es real y frecuente, y eso es lo que se enseña.',
              'Ninguna de las dos es una categoría de triage: los sistemas de clasificación de pacientes tienen categorías propias, criterios definidos y un método de aplicación que declara el protocolo del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El error que produce esta confusión', texto: 'Usar estas palabras como si fueran niveles de prioridad genera clasificaciones inconsistentes entre compañeros del mismo turno, porque cada uno aplica su propio umbral. La prioridad la fija el sistema de clasificación que declare el protocolo, con sus categorías y sus criterios.' },
        ],
      },
      {
        titulo: 'Lo que el prestador hace con todo esto',
        bloques: [
          { tipo: 'p', texto: 'La persona que llama al servicio evalúa su situación con la información y el miedo que tiene, no con criterios clínicos. Por eso la descripción telefónica y el hallazgo no siempre coinciden: hay cuadros vividos como catastróficos que resultan banales, y cuadros minimizados por el propio paciente que resultan graves.' },
          {
            tipo: 'lista',
            titulo: 'Consecuencias prácticas',
            items: [
              'La discrepancia entre lo que se describió por teléfono y lo que se encuentra es habitual, y no es mala fe.',
              'Un paciente que resta importancia a su cuadro no está descartando nada: la valoración la hace el prestador.',
              'El trato no cambia porque el motivo resulte menos grave de lo anunciado; sí cambia la conducta clínica.',
              'La educación del usuario sobre cuándo llamar es parte del trabajo del sistema, no un reproche al paciente.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que sí decide la conducta', texto: 'No la palabra con la que se pidió ayuda, sino lo que se encuentra al valorar. La evaluación primaria y los hallazgos objetivos son los que determinan la prioridad, el tratamiento y el destino.' },
          { tipo: 'p', texto: 'Qué criterios de despacho utiliza el servicio, qué sistema de clasificación aplica y qué categorías maneja son cuestiones de su protocolo. Esta lección no los define porque varían entre instituciones.' },
        ],
      },
      FUENTES_URGENCIA,
    ],
    conceptosClave: [
      { termino: 'Urgencia (definición normativa)', definicion: 'Problema médico-quirúrgico agudo que pone en peligro la vida, un órgano o una función y requiere atención inmediata, conforme al artículo 72 del Reglamento de la LGS en materia de prestación de servicios. Es una definición: no designa por sí sola a quién obliga.' },
      { termino: 'Ámbito de aplicación', definicion: 'Territorio y materia sobre los que rige una disposición. El del reglamento citado es todo el territorio nacional en materia de prestación de servicios de atención médica (art. 1o.).' },
      { termino: 'Sujeto obligado', definicion: 'Persona o establecimiento a quien la disposición impone la conducta. Para el prestador prehospitalario lo declara el numeral 2 de la NOM-034-SSA3-2013, no el artículo 72.' },
      { termino: 'Atención médica prehospitalaria', definicion: 'Según el numeral 4.1.7 de la NOM-034-SSA3-2013, la otorgada al paciente cuya condición clínica se considera que pone en peligro la vida, un órgano o su función, hasta su entrega en un establecimiento con servicio de urgencias o durante el traslado entre establecimientos.' },
      { termino: '«Emergencia» y «urgencia sentida»', definicion: 'Expresiones del habla profesional sin definición en el reglamento citado ni en la NOM-034. No son conceptos formales ni categorías de triage; se reconocen, no se usan para clasificar.' },
      { termino: 'Prioridad operativa', definicion: 'Orden de atención que fija el sistema de clasificación del servicio; no se deriva de las palabras urgencia o emergencia.' },
    ],
    flashcards: [
      { frente: '¿Cómo define la norma mexicana la urgencia?', reverso: 'Todo problema médico-quirúrgico agudo que ponga en peligro la vida, un órgano o una función y requiera atención inmediata (Reglamento de la LGS, art. 72).' },
      { frente: '¿Exige la definición que haya riesgo de muerte?', reverso: 'No: basta con que se ponga en peligro un órgano o una función.' },
      { frente: '¿Qué significa «agudo» en esa definición?', reverso: 'Se refiere al curso del problema, no a la intensidad del síntoma.' },
      { frente: '¿El artículo 72 obliga a un servicio prehospitalario?', reverso: 'No por sí solo: define el término. Para el prestador prehospitalario el deber lo declara el campo de aplicación de la NOM-034-SSA3-2013 (numeral 2).' },
      { frente: '¿Qué disposición dice que un establecimiento puede ser móvil?', reverso: 'El artículo 7o. fracción III del mismo reglamento: el establecimiento para la atención médica puede ser fijo o móvil.' },
      { frente: '¿Tienen «emergencia» y «urgencia sentida» definición normativa?', reverso: 'No. Ni el reglamento citado ni la NOM-034 las definen; son expresiones del habla profesional y no son categorías de triage.' },
      { frente: '¿Qué determina la conducta clínica?', reverso: 'Lo que se encuentra al valorar, no la palabra con la que se pidió ayuda.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con una lesión ocular que amenaza su visión, sin riesgo vital. Según la definición normativa mexicana, ¿es urgencia?',
        opciones: [
          'No, porque no peligra la vida.',
          'Sí: la definición incluye el peligro para un órgano o una función.',
          'Solo si el servicio lo clasifica como prioritario.',
          'Solo si el paciente lo percibe como urgente.',
        ],
        correcta: 1,
        explicacion: 'El artículo 72 abarca el peligro para la vida, para un órgano o para una función; no exige riesgo de muerte.',
      },
      {
        pregunta: 'Dos compañeros del mismo turno clasifican distinto al mismo paciente usando las palabras «urgencia» y «emergencia». ¿Cuál es el problema de fondo?',
        opciones: [
          'Uno de los dos valoró mal al paciente.',
          'Están usando como categorías de prioridad dos términos que no lo son y cuyo uso no está unificado.',
          'El protocolo del servicio es incorrecto.',
          'Falta información del despacho.',
        ],
        correcta: 1,
        explicacion: 'La clasificación de prioridad la da el sistema que declare el protocolo, con categorías y criterios definidos; estas dos palabras no cumplen esa función y ninguna disposición revisada las define.',
      },
      {
        pregunta: 'Un compañero sostiene que el artículo 72 del Reglamento de la LGS obliga por sí solo a cualquier ambulancia del país a atender toda urgencia. ¿Qué falla en ese razonamiento?',
        opciones: [
          'Nada: el artículo 72 impone esa obligación de forma expresa.',
          'Confunde definir un término con imponer un deber: el artículo 72 define urgencia, y el deber del prestador prehospitalario lo declara el campo de aplicación de la NOM-034.',
          'El artículo 72 fue derogado y ya no define nada.',
          'La obligación solo existe si el paciente percibe su caso como urgente.',
        ],
        correcta: 1,
        explicacion: 'Definición, ámbito de aplicación y sujeto obligado son preguntas distintas. El artículo 72 responde la primera; para el prestador prehospitalario el sujeto obligado lo declara el numeral 2 de la NOM-034-SSA3-2013.',
      },
      {
        pregunta: 'La llamada describe un cuadro catastrófico y encuentras un problema menor. ¿Qué haces?',
        opciones: [
          'Reprochar el uso indebido del servicio.',
          'Valorar igualmente: la urgencia sentida no coincide siempre con el hallazgo, y la conducta la marca lo que encuentras.',
          'Registrar el caso como llamada improcedente sin valorar.',
          'Trasladar de inmediato por lo descrito en la llamada.',
        ],
        correcta: 1,
        explicacion: 'La percepción del usuario se forma con su información y su miedo; la valoración corresponde al prestador y es la que determina la conducta.',
      },
      {
        pregunta: '¿Qué disposición declara que la regulación prehospitalaria es de observancia obligatoria para los prestadores de los sectores público, social y privado?',
        opciones: [
          'El artículo 72 del Reglamento de la LGS en materia de prestación de servicios.',
          'El numeral 2, campo de aplicación, de la NOM-034-SSA3-2013.',
          'El artículo 71 del mismo reglamento, referido a los establecimientos de internamiento.',
          'El protocolo interno de cada servicio de ambulancias.',
        ],
        correcta: 1,
        explicacion: 'El campo de aplicación de la NOM-034 nombra expresamente a los prestadores de atención médica prehospitalaria de los tres sectores. El artículo 72 aporta la definición y el 71 se refiere a establecimientos de internamiento.',
      },
    ],
    actividades: null,
    revision: ficha([
      NO_ES_TRIAGE,
      'DECISIÓN PENDIENTE: la academia debe declarar qué sistema de clasificación y qué criterios de '
        + 'despacho usa su servicio. La lección enseña la distinción conceptual y remite a ellos.',
      'CORRECCIÓN 2026-08-16: la versión anterior atribuía al artículo 72 la obligación de atención. '
        + 'Ahora la lección separa definición (art. 72), ámbito de aplicación (arts. 1o. y 7o. fr. III) y '
        + 'sujeto obligado (arts. 71 y 73 para establecimientos de internamiento; numeral 2 de la '
        + 'NOM-034-SSA3-2013 para el prestador prehospitalario).',
      'CORRECCIÓN 2026-08-16: «emergencia» y «urgencia sentida» dejan de presentarse como conceptos '
        + 'formales. Se declara expresamente que ni el reglamento citado ni la NOM-034 las definen y se '
        + 'enseñan como expresiones del habla profesional sin valor clasificatorio.',
      'Numerales de la NOM-034 verificados contra el texto publicado en el DOF el 23 de septiembre de '
        + '2014: numeral 2 (campo de aplicación) y numeral 4.1.7 (definición de atención médica '
        + 'prehospitalaria).',
      'Artículos 1o., 7o. fracción III, 71, 72 y 73 del Reglamento verificados palabra por palabra el '
        + '17 de agosto de 2026 contra el texto publicado por la Cámara de Diputados (última reforma '
        + 'DOF 17 de julio de 2018). El artículo 71 obliga expresamente a los establecimientos que '
        + 'brindan atención médica PARA EL INTERNAMIENTO DE ENFERMOS, lo que confirma que no alcanza '
        + 'por sí solo al prestador prehospitalario.',
    ]),
  },

  // ============================================================
  //  Clasificación de las enfermedades
  // ============================================================
  'm4-epi-clasificacion': {
    icono: '🗂️',
    duracion: '16 min',
    resumen: 'Los cuatro ejes con que el plan pide clasificar las enfermedades —curso, frecuencia, origen '
      + 'y sistema— y la advertencia que los acompaña: son ejes de estudio, no diagnósticos ni prioridades.',
    objetivos: [
      'Diferenciar enfermedad aguda de enfermedad crónica por su curso.',
      'Clasificar un problema de salud por su frecuencia poblacional.',
      'Clasificar por origen y por sistema afectado.',
      'Explicar por qué estas clasificaciones no determinan gravedad ni prioridad de atención.',
    ],
    secciones: [
      {
        titulo: 'Una advertencia antes de clasificar',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Ejes de estudio, no etiquetas clínicas', texto: 'Las cuatro clasificaciones de este tema ordenan el aprendizaje y permiten hablar con precisión. Ninguna de ellas es un diagnóstico, ninguna mide gravedad y ninguna asigna prioridad de atención. Un cuadro crónico puede matar hoy y uno agudo puede resolverse solo; la gravedad se valora en el paciente, no en la etiqueta.' },
        ],
      },
      {
        titulo: 'Por su curso: aguda o crónica',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'La diferencia es temporal',
            headers: ['', 'Aguda', 'Crónica'],
            filas: [
              ['Instalación', 'Rápida, en horas o días', 'Lenta, en meses o años'],
              ['Duración', 'Limitada en el tiempo', 'Prolongada o permanente'],
              ['Evolución habitual', 'Se resuelve, se complica o pasa a crónica', 'Se controla; con frecuencia no se cura'],
              ['Relación con la gravedad', 'Ninguna: puede ser leve o mortal', 'Ninguna: puede ser leve o mortal'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que sí importa en la ambulancia: la agudización', texto: 'La mayor parte de la atención prehospitalaria en patología médica no ocurre por una enfermedad nueva, sino por la descompensación aguda de una enfermedad crónica que el paciente ya tenía. Reconocer esa situación —un problema crónico que hoy se descompensó— explica el cuadro, orienta los antecedentes que hay que preguntar y anticipa el tratamiento habitual del paciente.' },
          { tipo: 'p', texto: 'Existe además una categoría intermedia, la subaguda, para cuadros que no encajan claramente en ninguno de los dos extremos. No es una tercera enfermedad: es una descripción del tiempo de instalación.' },
        ],
      },
      {
        titulo: 'Por su frecuencia en la población',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cuatro términos que describen distribución, no gravedad',
            headers: ['Término', 'Qué describe'],
            filas: [
              ['Esporádica', 'Casos aislados, sin patrón de agrupación'],
              ['Endémica', 'Presencia habitual y esperable en una zona geográfica'],
              ['Epidémica', 'Aumento de casos por encima de lo esperado en una población y periodo'],
              ['Pandémica', 'Epidemia extendida a varias regiones o países'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Endémico no significa leve', texto: 'Que un padecimiento sea habitual en una zona describe su distribución, no su peligro. Y «epidémico» no describe la gravedad de cada caso, sino que hay más casos de los esperados. Son medidas de población, y por eso dependen del lugar y del periodo con que se comparen.' },
          { tipo: 'p', texto: 'Para el prestador prehospitalario, saber qué es endémico en su zona de operación tiene un valor práctico: cambia la sospecha ante un cuadro compatible y cambia las medidas de protección que conviene anticipar. Qué padecimientos son endémicos en cada región es un dato que debe tomarse de la información epidemiológica oficial vigente, con su año.' },
        ],
      },
      {
        titulo: 'Por su origen y por el sistema afectado',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Clasificación por origen',
            items: [
              'Infecciosa: producida por un agente biológico.',
              'Traumática: producida por transferencia de energía.',
              'Tóxica: producida por una sustancia química o un veneno.',
              'Metabólica y endocrina: por alteración de procesos de regulación interna.',
              'Degenerativa: por deterioro progresivo de una estructura.',
              'Neoplásica: por proliferación celular anómala.',
              'Autoinmunitaria: por respuesta inmunitaria contra estructuras propias.',
              'Congénita: presente desde el nacimiento, sea hereditaria o adquirida durante el desarrollo.',
              'Iatrogénica: derivada de una intervención sanitaria.',
              'Psiquiátrica y del comportamiento.',
            ],
          },
          { tipo: 'p', texto: 'La clasificación por sistemas —respiratorio, cardiovascular, digestivo, nervioso, urinario, endocrino, musculoesquelético, tegumentario y ginecoobstétrico— es la que organiza el resto de este módulo, y por eso conviene tenerla presente: las unidades siguientes recorren precisamente esos sistemas.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Un cuadro puede caer en varias casillas', texto: 'Una neumonía es infecciosa, aguda, del sistema respiratorio y puede ser endémica o epidémica según el contexto. Las clasificaciones no compiten entre sí: son ejes distintos que describen el mismo problema desde ángulos distintos, y por eso se usan juntas.' },
        ],
      },
      {
        titulo: 'Qué aporta esto en la ambulancia',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Uso legítimo de estas clasificaciones',
            items: [
              'Ordenar los antecedentes que se preguntan: un cuadro crónico descompensado dirige la historia hacia su tratamiento habitual y su control.',
              'Anticipar medidas de protección personal cuando el origen probable es infeccioso.',
              'Comunicar con precisión en la entrega: «descompensación aguda de un padecimiento crónico» informa más que «se puso mal».',
              'Situar cada tema del módulo en el sistema al que pertenece.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Uso ilegítimo', texto: 'Deducir gravedad de la etiqueta, asignar prioridad de traslado por la categoría o emitir un diagnóstico apoyándose en una clasificación. La impresión clínica prehospitalaria se construye con la valoración del paciente, y la prioridad la fija el sistema de clasificación que declare el protocolo del servicio.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Enfermedad aguda', definicion: 'La de instalación rápida y duración limitada; el término describe el curso, no la gravedad.' },
      { termino: 'Enfermedad crónica', definicion: 'La de instalación lenta y curso prolongado o permanente; con frecuencia se controla más que se cura.' },
      { termino: 'Agudización', definicion: 'Descompensación aguda de una enfermedad crónica preexistente; motivo frecuente de atención prehospitalaria.' },
      { termino: 'Endémica', definicion: 'De presencia habitual y esperable en una zona geográfica; describe distribución, no gravedad.' },
      { termino: 'Epidémica', definicion: 'Con aumento de casos por encima de lo esperado en una población y un periodo.' },
      { termino: 'Iatrogénica', definicion: 'Enfermedad o daño derivado de una intervención sanitaria.' },
    ],
    flashcards: [
      { frente: '¿Qué distingue a una enfermedad aguda de una crónica?', reverso: 'El curso: instalación rápida y duración limitada frente a instalación lenta y curso prolongado. No la gravedad.' },
      { frente: '¿Qué es una agudización?', reverso: 'La descompensación aguda de una enfermedad crónica preexistente; motivo frecuente de atención prehospitalaria.' },
      { frente: '¿Endémico significa leve?', reverso: 'No: describe que el padecimiento es habitual en una zona, no su peligro.' },
      { frente: '¿Qué describe «epidémica»?', reverso: 'Que hay más casos de los esperados en una población y un periodo, no la gravedad de cada caso.' },
      { frente: '¿Puede un cuadro pertenecer a varias clasificaciones?', reverso: 'Sí: son ejes distintos que describen el mismo problema desde ángulos distintos y se usan juntos.' },
      { frente: '¿Determinan estas clasificaciones la prioridad de atención?', reverso: 'No: la prioridad la fija el sistema de clasificación que declare el protocolo del servicio.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con enfermedad pulmonar crónica que hoy presenta dificultad respiratoria intensa. ¿Cómo lo describes con precisión?',
        opciones: [
          'Como una enfermedad aguda nueva.',
          'Como una agudización: descompensación aguda de un padecimiento crónico preexistente.',
          'Como un cuadro subagudo.',
          'Como una enfermedad endémica.',
        ],
        correcta: 1,
        explicacion: 'Reconocer la agudización explica el cuadro, dirige los antecedentes que se preguntan y anticipa el tratamiento habitual del paciente.',
      },
      {
        pregunta: 'Un compañero afirma que un padecimiento endémico en la zona «no es grave porque es común». ¿Qué error comete?',
        opciones: [
          'Ninguno: endémico implica leve.',
          'Confunde una medida de distribución poblacional con la gravedad del caso.',
          'Confunde endémico con epidémico.',
          'Confunde incidencia con prevalencia.',
        ],
        correcta: 1,
        explicacion: 'Endémico describe que el padecimiento está habitualmente presente en una zona; no dice nada sobre el peligro que supone.',
      },
      {
        pregunta: '¿Para qué SÍ sirve clasificar el origen probable de un cuadro en la ambulancia?',
        opciones: [
          'Para asignar la prioridad de traslado.',
          'Para anticipar medidas de protección personal cuando el origen probable es infeccioso.',
          'Para emitir el diagnóstico definitivo.',
          'Para determinar la gravedad del paciente.',
        ],
        correcta: 1,
        explicacion: 'La clasificación ordena antecedentes, anticipa protección y precisa la comunicación; no fija gravedad, prioridad ni diagnóstico.',
      },
      {
        pregunta: 'Una neumonía en contexto de brote local. ¿Qué clasificaciones le aplican?',
        opciones: [
          'Solo la de origen infeccioso.',
          'Infecciosa por origen, aguda por curso, respiratoria por sistema y epidémica por frecuencia.',
          'Solo la de sistema respiratorio.',
          'Ninguna: es un diagnóstico y no admite clasificación.',
        ],
        correcta: 1,
        explicacion: 'Los ejes no compiten: describen el mismo problema desde ángulos distintos y se usan a la vez.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La distinción entre enfermedad aguda y crónica describe el ___ del padecimiento, no su gravedad.',
          opciones: ['origen', 'curso', 'sistema'],
          correcta: 1,
          explicacion: 'Un cuadro crónico puede matar hoy y uno agudo resolverse solo; la gravedad se valora en el paciente.',
        },
      ],
    },
    revision: ficha([
      NO_ES_TRIAGE,
      'La lista de padecimientos endémicos por región se remite a la información epidemiológica '
        + 'oficial vigente con su año; no se enumera ninguno.',
    ]),
  },
}
