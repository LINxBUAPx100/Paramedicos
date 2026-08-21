// ============================================================
//  Módulo 4 · Urgencias respiratorias
// ------------------------------------------------------------
//  Unidad completa (3 semanas, 15 horas), en el orden del PDF: exploración de
//  tórax dirigida, síndrome de insuficiencia respiratoria, EPOC agudizado,
//  edema agudo de pulmón, neumotórax espontáneo, TEP, neumonía y bronquitis, y
//  asma.
//
//  Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json para
//  `m4-urgencias-respiratorias`, con su nota expresa: «GINA para asma; GOLD
//  para EPOC; AHA/ACC/HFSA para edema pulmonar cardiogénico; BTS para
//  neumotórax espontáneo; ESC para TEP; ATS/IDSA para neumonía adulta. WHO
//  2026/BEC gobiernan evaluación y estabilización prehospitalaria. No usar una
//  guía de una entidad para otra.»
//
//  Esa última frase gobierna el archivo. Cada tema cita la guía de SU entidad y
//  ninguna presta autoridad a otra. AMLS 4 aparece solo como apoyo curricular
//  con página PENDIENTE y no sostiene ninguna afirmación clínica.
//
//  DOS REGLAS QUE EXPLICAN LO QUE ESTE ARCHIVO NO DICE
//
//  1. No hay ni un objetivo numérico de saturación, ni una frecuencia, ni una
//     dosis, ni una concentración. No es cautela decorativa: las guías
//     asignadas son documentos de acceso restringido o de descarga registrada,
//     y al corte de esta redacción no se pudo abrir su texto para citar la
//     tabla, el algoritmo o la página exactos. Publicar una cifra recordada
//     equivale a inventarla. Cada tema declara la deuda concreta que falta
//     resolver y enseña el principio que sí se sostiene sin ella.
//  2. El ámbito es prehospitalario. Se enseña reconocimiento sindrómico,
//     gravedad, estabilización, reevaluación, comunicación y destino. No se
//     traslada a la ambulancia una prueba ni un tratamiento hospitalario, y la
//     impresión de campo nunca se llama diagnóstico.
//
//  Por esa deuda bibliográfica los seis temas de entidad concreta quedan en
//  `borrador`. Los dos temas de método —exploración dirigida e insuficiencia
//  respiratoria— se sostienen con OMS/CICR Basic Emergency Care, que es
//  público y consultable, y quedan en `en_revision`.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

// ---------- fuentes de evaluación y estabilización (gobiernan toda la unidad) ----------

const WHO_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público del que procede el abordaje ABCDE, la valoración sistemática de la '
    + 'respiración y el principio de reevaluación tras cada intervención.',
}
const WHO_PREHOSPITAL_2026 = {
  nombre: 'World Health Organization. Prehospital emergency care: pocket reference, 2026.',
  url: 'https://www.who.int/publications/b/82620',
  nota: 'Referencia clínica prehospitalaria asignada por el registro académico para evaluación y '
    + 'estabilización. PENDIENTE: sección y página exactas; no se ha consultado el texto completo, de '
    + 'modo que no sostiene por sí sola ninguna cifra de esta unidad.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Fuente de APOYO curricular asignada por el registro para el razonamiento de la urgencia '
    + 'médica. Capítulo y página PENDIENTES: solo puede precisarlos quien consulte la copia licenciada '
    + 'de la academia. No sostiene ninguna afirmación clínica de esta unidad.',
}

// ---------- guías por entidad ----------

const GINA_2026 = {
  nombre: 'Global Initiative for Asthma. GINA 2026 Global Strategy for Asthma Management and '
    + 'Prevention.',
  url: 'https://ginasthma.org/reports/',
  nota: 'Guía rectora del ASMA y solo del asma. PENDIENTE: capítulo y tabla exactos de la valoración '
    + 'de gravedad de la exacerbación y del tratamiento inicial; el informe requiere descarga '
    + 'registrada y no se consultó su texto al redactar.',
}
const GOLD_2026 = {
  nombre: 'Global Initiative for Chronic Obstructive Lung Disease. GOLD 2026 Report and Pocket Guide.',
  url: 'https://goldcopd.org/2026-gold-report-and-pocket-guide/',
  nota: 'Guía rectora de la EPOC y de su exacerbación, y solo de ellas. PENDIENTE: sección y cifra '
    + 'exactas del objetivo de oxigenación controlada y de los criterios de gravedad; el informe '
    + 'requiere descarga registrada y no se consultó su texto al redactar.',
}
const AHA_HF_2022 = {
  nombre: '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure.',
  url: 'https://professional.heart.org/en/guidelines-statements/2022-ahaacchfsa-guideline-for-the-management-of-heart-failure-a-report-of-thecir0000000000001063',
  nota: 'Guía rectora del edema pulmonar de origen CARDIOGÉNICO. PENDIENTE: sección exacta sobre '
    + 'insuficiencia cardiaca aguda descompensada; no se consultó el texto completo al redactar.',
}
const BTS_PLEURAL_2023 = {
  nombre: 'British Thoracic Society Guideline for Pleural Disease, 2023.',
  url: 'https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/',
  nota: 'Guía rectora del NEUMOTÓRAX ESPONTÁNEO. PENDIENTE: sección exacta sobre selección de manejo '
    + 'conservador frente a intervención; no se consultó el texto completo al redactar.',
}
const ESC_TEP_2019 = {
  nombre: '2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism, '
    + 'developed in collaboration with the ERS.',
  url: 'https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-pulmonary-embolism/',
  nota: 'Guía rectora de la TROMBOEMBOLIA PULMONAR. Continúa publicada en el catálogo oficial de la '
    + 'ESC al corte de agosto de 2026. PENDIENTE: sección exacta de estratificación de riesgo; no se '
    + 'consultó el texto completo al redactar.',
}
const ATS_IDSA_CAP_2019 = {
  nombre: 'ATS/IDSA Clinical Practice Guideline: Diagnosis and Treatment of Adults with '
    + 'Community-acquired Pneumonia, 2019.',
  url: 'https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults',
  nota: 'Guía rectora de la NEUMONÍA ADQUIRIDA EN LA COMUNIDAD del adulto. PENDIENTE: sección exacta '
    + 'de criterios de gravedad y de sitio de atención; no se consultó el texto completo al redactar.',
}

// ---------- fuentes mexicanas y de producto ----------

const NOM_034_DOTACION = {
  nombre: 'DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): '
    + 'Apéndices Normativos A.4, B.4, C.3 y D.1.',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5361072&fecha=23/09/2014',
  nota: 'Texto consultado en el DOF el 16 de agosto de 2026. Fija la dotación mínima por tipo de '
    + 'ambulancia —entre ella, salbutamol en aerosol en el numeral B.4.4.1—. Es una norma de dotación: '
    + 'no enuncia indicación, población, dosis ni vía.',
}
const COFEPRIS_IPP = {
  nombre: 'COFEPRIS. Guía para estructurar y redactar la Información para Prescribir e instructivo, '
    + 'y registro sanitario de medicamentos. Consultada el 16 de agosto de 2026.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de la composición, la concentración, las indicaciones aprobadas, '
    + 'las vías y las contraindicaciones de CADA producto registrado que lleve la unidad.',
}

// Apoyo secundario HOSPITALARIO. Se cita con capítulo y página impresa
// verificados el 17 de agosto de 2026 sobre la copia de la biblioteca de la
// academia. Sostiene definición, fisiopatología y presentación clínica; NO
// sostiene conducta prehospitalaria, que gobiernan OMS/BEC y el protocolo.
const bibiano = (capitulo, titulo, pagina) => ({
  nombre: `Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo ${capitulo}, `
    + `«${titulo}», p. ${pagina}.`,
  nota: 'Apoyo secundario de ámbito HOSPITALARIO: fundamenta definición, fisiopatología y '
    + 'presentación clínica. No se usa para conducta prehospitalaria ni para dosis. Capítulo y página '
    + 'impresa verificados el 17 de agosto de 2026 sobre la copia de la biblioteca de la academia.',
})

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

// ---------- textos que se repiten porque la regla se repite ----------

const SIN_CIFRAS = 'No se publica ningún objetivo de saturación, frecuencia, dosis, concentración ni '
  + 'velocidad. Las guías asignadas son de descarga registrada o de acceso restringido y no se '
  + 'consultó su texto al redactar; publicar una cifra recordada equivale a inventarla.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: la lección enseña reconocimiento sindrómico, gravedad, '
  + 'estabilización, reevaluación, comunicación y destino. No traslada al campo pruebas ni '
  + 'tratamientos hospitalarios y no presenta la impresión de campo como diagnóstico.'
const CONDICIONES = 'TODA intervención farmacológica o avanzada de esta lección queda condicionada a '
  + 'seis requisitos simultáneos: guía vigente de la indicación, población, contraindicaciones, '
  + 'Información para Prescribir del producto registrado, equipo disponible y competencia autorizada '
  + 'por el protocolo y la dirección médica del servicio.'

const BLOQUE_CIFRAS = {
  tipo: 'callout',
  variante: 'alerta',
  titulo: 'Por qué esta lección no trae números',
  texto: 'Aquí no encontrarás un objetivo de saturación, una frecuencia de corte ni una dosis. No es '
    + 'un olvido. Una cifra clínica solo se publica cuando constan su población, su indicación, su vía, '
    + 'la edición de la guía que la sostiene y el protocolo que la autoriza; mientras la guía asignada '
    + 'no se haya consultado en su texto, la cifra se pide al protocolo del servicio y no se memoriza '
    + 'de una lección. Lo que sí se enseña —y es lo que decide la conducta en la calle— es reconocer la '
    + 'gravedad, sostener al paciente, reevaluar y elegir el destino.',
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
  //  Exploración de tórax dirigida
  // ============================================================
  'm4-resp-exploracion-torax': {
    icono: 'ic-estetoscopio',
    duracion: '18 min',
    resumen: 'Cómo se explora el tórax en la calle para responder preguntas concretas de la evaluación, '
      + 'qué aporta cada maniobra y qué no puede concluirse con ella.',
    objetivos: [
      'Diferenciar una exploración dirigida de una exploración completa.',
      'Ejecutar en orden las cuatro maniobras de la exploración torácica.',
      'Interpretar los hallazgos como hipótesis sindrómicas y no como diagnóstico.',
      'Reconocer las limitaciones del entorno prehospitalario sobre cada maniobra.',
    ],
    secciones: [
      {
        titulo: 'Qué significa «dirigida»',
        bloques: [
          { tipo: 'p', texto: 'Una exploración dirigida no es una exploración incompleta: es la que se hace para responder preguntas concretas que la evaluación ya planteó. En el abordaje sistemático del paciente agudo, la letra que corresponde a la respiración pregunta si el paciente ventila de forma adecuada y si algo está impidiéndolo ahora. La exploración de tórax existe para contestar eso, y termina cuando lo ha contestado.' },
          {
            tipo: 'lista',
            titulo: 'Las preguntas que se van a contestar',
            items: [
              '¿Entra y sale aire de ambos hemitórax?',
              '¿El esfuerzo que hace el paciente para respirar es normal, está aumentado o está agotándose?',
              '¿Hay algún hallazgo que sugiera una causa que deba resolverse de inmediato?',
              '¿Ha cambiado algo desde la exploración anterior?',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La cuarta pregunta es la que más se olvida', texto: 'Una exploración de tórax aislada vale poco; una serie de exploraciones vale mucho. El dato clínicamente útil no suele ser el hallazgo, sino su cambio: un murmullo que disminuye, un esfuerzo que sube o un paciente que deja de quejarse porque se está agotando.' },
        ],
      },
      {
        titulo: 'Las cuatro maniobras, en orden',
        bloques: [
          { tipo: 'p', texto: 'El orden clásico —inspección, palpación, percusión y auscultación— no es una convención académica: cada maniobra prepara la siguiente y altera lo menos posible al paciente. Se realiza con el tórax expuesto en la medida que el entorno, la privacidad y la temperatura lo permitan, y comparando siempre un lado con el otro.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia',
            items: [
              'INSPECCIÓN. Postura que adopta el paciente, si puede hablar y en frases de qué longitud, coloración, uso de músculos accesorios, tiraje, simetría de la expansión, deformidades, heridas, cicatrices, distensión venosa del cuello y presencia de dispositivos ya colocados.',
              'PALPACIÓN. Simetría de la expansión con ambas manos, puntos dolorosos, crepitación de la pared —el enfisema subcutáneo se percibe como una crepitación fina bajo la piel—, inestabilidad de la parrilla costal y posición de la tráquea en el hueco supraesternal.',
              'PERCUSIÓN. Comparación de la resonancia entre hemitórax equivalentes. Una zona más resonante de lo esperado sugiere aire donde no debería haberlo; una zona mate sugiere líquido o consolidación.',
              'AUSCULTACIÓN. Comparación campo por campo y lado por lado: presencia y simetría del murmullo, ruidos agregados y en qué fase del ciclo aparecen.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Comparar es la maniobra', texto: 'Casi toda la información útil de esta exploración es comparativa: un lado contra el otro, y este momento contra el anterior. Auscultar un solo campo pulmonar rara vez aporta algo; auscultar los dos y encontrar una diferencia cambia la conducta.' },
        ],
      },
      {
        titulo: 'Qué sugiere cada hallazgo',
        bloques: [
          { tipo: 'p', texto: 'Lo que sigue son asociaciones que orientan la sospecha. Ninguna de ellas confirma una entidad: en el ámbito prehospitalario se construye una impresión de campo que dirige el tratamiento de soporte y la elección del destino, y la confirmación exige estudios que no viajan en la ambulancia.' },
          {
            tipo: 'tabla',
            titulo: 'Hallazgo e hipótesis que abre',
            headers: ['Hallazgo', 'Qué sugiere', 'Qué NO permite concluir'],
            filas: [
              ['Murmullo disminuido o ausente en un hemitórax', 'Aire o líquido en el espacio pleural, obstrucción bronquial o consolidación extensa', 'Cuál de esas causas es; el hallazgo es común a varias'],
              ['Sibilancias', 'Estrechamiento de la vía aérea inferior de cualquier origen', 'Que se trate de asma: no toda sibilancia es asma'],
              ['Estertores o crepitantes', 'Ocupación alveolar por líquido o exudado', 'Si el líquido es de origen cardiaco, infeccioso o de otra causa'],
              ['Estridor', 'Obstrucción de la vía aérea superior, no de la inferior', 'Que la causa sea pulmonar; el problema está por encima del tórax'],
              ['Hiperresonancia con murmullo disminuido de ese lado', 'Aire en el espacio pleural', 'La magnitud ni si está comprometiendo la circulación'],
              ['Enfisema subcutáneo', 'Fuga de aire desde la vía aérea o el pulmón hacia los tejidos', 'El punto de la fuga ni su gravedad'],
              ['Expansión asimétrica', 'Compromiso mecánico o doloroso de ese hemitórax', 'La causa; puede ser pleural, parenquimatosa o de la pared'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El hallazgo que no espera a la exploración completa', texto: 'Un paciente con dificultad respiratoria grave, murmullo ausente e hiperresonancia en un hemitórax, con deterioro circulatorio, describe un cuadro que compromete la vida y cuya conducta se decide de inmediato conforme al protocolo del servicio, sin terminar antes una exploración ordenada. Reconocerlo es prioritario; qué hacer con él y quién está autorizado a hacerlo lo determinan el alcance profesional y la dirección médica.' },
        ],
      },
      {
        titulo: 'Lo que el entorno le hace a la exploración',
        bloques: [
          { tipo: 'p', texto: 'Las cuatro maniobras se describieron para un consultorio silencioso. La calle y la ambulancia en marcha degradan unas más que otras, y saber cuáles evita conclusiones falsas.' },
          {
            tipo: 'tabla',
            titulo: 'Fiabilidad según el entorno',
            headers: ['Maniobra', 'Cómo la afecta el entorno', 'Consecuencia práctica'],
            filas: [
              ['Inspección', 'Poco afectada; solo requiere luz y exponer el tórax', 'Es la que más rinde en el peor entorno'],
              ['Palpación', 'Poco afectada; el movimiento del vehículo estorba', 'Se prefiere hacerla antes de iniciar el traslado'],
              ['Percusión', 'Muy afectada por el ruido ambiental', 'Un resultado dudoso no se fuerza: se repite en mejores condiciones'],
              ['Auscultación', 'Muy afectada por ruido de motor, sirena y vibración', 'Se ausculta antes de subir al paciente siempre que la urgencia lo permita, y se repite en cada parada'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Errores frecuentes',
            items: [
              'Auscultar sobre la ropa: introduce ruidos que se confunden con hallazgos.',
              'Auscultar un solo punto por hemitórax y concluir simetría.',
              'Dar por buena una exploración normal como si excluyera un problema; una exploración normal describe este momento, no el siguiente.',
              'Explorar y no registrar el hallazgo con la hora: sin hora no se puede demostrar un cambio.',
              'Sustituir la exploración por el número de un dispositivo. Los monitores aportan datos, pero no dicen si el murmullo es simétrico.',
              'Retrasar una intervención que el cuadro exige para completar una secuencia ordenada.',
            ],
          },
          { tipo: 'p', texto: 'Qué se registra, con qué formato y en qué momento del traslado lo define el procedimiento documental del servicio. La regla que no cambia es que un hallazgo sin hora no permite demostrar una evolución.' },
        ],
      },
      F([WHO_BEC, WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Exploración dirigida', definicion: 'La que se realiza para responder preguntas concretas planteadas por la evaluación sistemática, y termina cuando las ha contestado.' },
      { termino: 'Impresión de campo', definicion: 'Hipótesis sindrómica construida con lo observable en la escena; orienta el tratamiento de soporte y el destino, y no equivale a un diagnóstico.' },
      { termino: 'Exploración comparativa', definicion: 'Método central de la exploración torácica: comparar un hemitórax con el otro y el momento actual con el anterior.' },
      { termino: 'Enfisema subcutáneo', definicion: 'Crepitación fina bajo la piel producida por aire que ha escapado desde la vía aérea o el pulmón hacia los tejidos.' },
      { termino: 'Estridor frente a sibilancia', definicion: 'El estridor indica obstrucción de la vía aérea superior; la sibilancia, estrechamiento de la vía aérea inferior.' },
      { termino: 'Reevaluación', definicion: 'Repetición de la exploración para detectar el cambio, que suele ser más informativo que el hallazgo aislado.' },
    ],
    flashcards: [
      { frente: '¿Cuál es el orden de la exploración torácica?', reverso: 'Inspección, palpación, percusión y auscultación, comparando siempre un lado con el otro.' },
      { frente: '¿Qué maniobra rinde más en el peor entorno?', reverso: 'La inspección: solo requiere luz y exponer el tórax, y apenas la degrada el ruido.' },
      { frente: '¿Por qué se ausculta antes de subir al paciente cuando se puede?', reverso: 'Porque el ruido del motor, la sirena y la vibración degradan mucho la auscultación.' },
      { frente: 'Murmullo ausente e hiperresonancia en un hemitórax. ¿Qué sugiere?', reverso: 'Aire en el espacio pleural. No permite concluir su magnitud ni si compromete la circulación.' },
      { frente: '¿Toda sibilancia es asma?', reverso: 'No: la sibilancia indica estrechamiento de la vía aérea inferior de cualquier origen.' },
      { frente: '¿Qué le falta a un hallazgo registrado sin hora?', reverso: 'La posibilidad de demostrar un cambio, que es el dato que suele decidir la conducta.' },
    ],
    quiz: [
      {
        pregunta: 'Auscultas un solo punto en cada hemitórax, encuentras murmullo y concluyes que la ventilación es simétrica. ¿Qué falla?',
        opciones: [
          'Nada: un punto por lado basta si hay murmullo.',
          'La auscultación se compara campo por campo y lado por lado; un punto por hemitórax no permite concluir simetría.',
          'Debió percutirse antes de auscultar cada campo.',
          'Faltó auscultar sobre la ropa para reducir el ruido.',
        ],
        correcta: 1,
        explicacion: 'La información de esta exploración es comparativa: se ausculta campo por campo y lado por lado. Además, auscultar sobre la ropa introduce ruidos que se confunden con hallazgos.',
      },
      {
        pregunta: 'Encuentras estridor en un paciente con dificultad respiratoria. ¿Qué orienta ese hallazgo?',
        opciones: [
          'Una obstrucción de la vía aérea superior, por encima del tórax.',
          'Un estrechamiento de la vía aérea inferior.',
          'Ocupación alveolar por líquido.',
          'Aire en el espacio pleural.',
        ],
        correcta: 0,
        explicacion: 'El estridor indica obstrucción de la vía aérea superior; la sibilancia corresponde al estrechamiento de la vía aérea inferior y los crepitantes a la ocupación alveolar.',
      },
      {
        pregunta: 'Durante el traslado la percusión te da un resultado dudoso por el ruido del vehículo. ¿Cómo procedes?',
        opciones: [
          'Registrarlo como mate, que es lo más seguro.',
          'No forzar la conclusión y repetir la maniobra en mejores condiciones, apoyándote mientras en inspección y palpación.',
          'Descartar la percusión del expediente por poco fiable.',
          'Sustituirla por el dato del monitor.',
        ],
        correcta: 1,
        explicacion: 'La percusión y la auscultación son las maniobras que más degrada el ruido. Un resultado dudoso no se fuerza; la inspección y la palpación son las que menos se afectan.',
      },
      {
        pregunta: 'Una exploración de tórax normal al llegar, ¿qué permite afirmar?',
        opciones: [
          'Que el paciente no tiene un problema respiratorio.',
          'Que en ese momento no se encontraron los hallazgos buscados; describe ese momento y no el siguiente, por lo que se reevalúa.',
          'Que puede omitirse la reevaluación durante el traslado.',
          'Que la impresión de campo equivale a un diagnóstico de exclusión.',
        ],
        correcta: 1,
        explicacion: 'Una exploración aislada vale poco frente a una serie: el dato útil suele ser el cambio. Además, en el ámbito prehospitalario se construye una impresión de campo, no un diagnóstico.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la exploración torácica dirigida',
        pasos: [
          'Inspección: postura, habla, coloración, esfuerzo y simetría',
          'Palpación: expansión, dolor, crepitación de la pared y tráquea',
          'Percusión: comparar resonancia entre hemitórax',
          'Auscultación: campo por campo y lado por lado',
          'Registrar el hallazgo con la hora',
          'Reevaluar y comparar con la exploración anterior',
        ],
      },
    },
    revision: ficha({
      estado: 'en_revision',
      version: 'OMS/CICR Basic Emergency Care 2018; OMS Prehospital emergency care pocket reference 2026 (página pendiente)',
      fuentes: [
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'Tema de MÉTODO: se sostiene con Basic Emergency Care, que es público y consultable, y por eso '
          + 'queda en revisión y no en borrador.',
        'No se enuncia ninguna maniobra invasiva. La conducta ante el cuadro de aire pleural con '
          + 'deterioro circulatorio se remite expresamente al alcance profesional y a la dirección '
          + 'médica.',
        'DEUDA: precisar sección y página de la referencia prehospitalaria de la OMS 2026 y el capítulo '
          + 'de AMLS 4 que la academia tenga licenciado.',
      ],
    }),
  },

  // ============================================================
  //  Síndrome de insuficiencia respiratoria
  // ============================================================
  'm4-resp-insuficiencia': {
    icono: 'cp-servier-via-intrapulmonar',
    duracion: '20 min',
    resumen: 'Cómo se reconoce que la respiración de un paciente ha dejado de ser suficiente, qué signos '
      + 'anuncian que va a claudicar y qué sostiene el prestador mientras traslada.',
    objetivos: [
      'Distinguir dificultad respiratoria de insuficiencia respiratoria.',
      'Diferenciar el fallo de la oxigenación del fallo de la ventilación.',
      'Identificar los signos de claudicación inminente.',
      'Ordenar las prioridades de estabilización y de reevaluación durante el traslado.',
    ],
    secciones: [
      {
        titulo: 'Un síndrome, no una enfermedad',
        bloques: [
          { tipo: 'p', texto: 'La insuficiencia respiratoria es una situación funcional: el aparato respiratorio ha dejado de mantener el intercambio de gases que el organismo necesita. Es la vía final común de causas muy distintas —de la vía aérea, del pulmón, de la pleura, de la pared torácica, de la circulación, del sistema nervioso o de un tóxico—, y por eso reconocerla no dice todavía por qué ocurre.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué esta distinción ordena el trabajo', texto: 'En la calle el orden es reconocer primero que la respiración es insuficiente y sostenerla, y después buscar la causa. Invertirlo —dedicar la escena a averiguar la entidad antes de sostener al paciente— es un error de secuencia con consecuencias reales.' },
          {
            tipo: 'tabla',
            titulo: 'Dos formas de fallar que se reconocen distinto',
            headers: ['Qué falla', 'Qué significa', 'Cómo se manifiesta con más frecuencia'],
            filas: [
              ['La oxigenación', 'La sangre no se oxigena adecuadamente al pasar por el pulmón', 'Paciente angustiado, taquipneico, con esfuerzo evidente y alteración de la coloración'],
              ['La ventilación', 'No se moviliza el volumen de aire necesario para eliminar dióxido de carbono', 'Somnolencia, confusión, cefalea, respiración superficial o lenta, esfuerzo que disminuye sin que el paciente mejore'],
            ],
          },
          { tipo: 'p', texto: 'Ambas formas coexisten con frecuencia y una puede evolucionar a la otra: un paciente que lleva horas respirando con esfuerzo máximo termina agotándose, y entonces el problema de oxigenación se acompaña de un problema de ventilación. Esa transición es el momento clínico más peligroso del cuadro.' },
        ],
      },
      {
        titulo: 'Reconocimiento: qué se mira',
        bloques: [
          { tipo: 'p', texto: 'El reconocimiento se apoya en lo que se ve y se oye antes que en lo que marca un dispositivo. Un monitor aporta datos; el estado del paciente aporta la trayectoria.' },
          {
            tipo: 'lista',
            titulo: 'Signos de trabajo respiratorio aumentado',
            items: [
              'Postura: el paciente se sienta, se inclina hacia adelante y se apoya en los brazos, y resiste que lo acuesten.',
              'Habla entrecortada: cuántas palabras seguidas puede decir antes de tener que respirar.',
              'Uso de músculos accesorios del cuello y de la cintura escapular.',
              'Tiraje intercostal, supraesternal o supraclavicular; en el paciente pediátrico, aleteo nasal y quejido.',
              'Respiración rápida y superficial, o prolongación evidente de la espiración.',
              'Incapacidad para tolerar el decúbito.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Signos de que el paciente está claudicando',
            items: [
              'Alteración del estado de alerta: agitación primero, somnolencia después.',
              'Disminución del esfuerzo respiratorio sin mejoría clínica: el paciente no mejora, se está agotando.',
              'Respiración lenta o irregular en un paciente que antes estaba taquipneico.',
              'Ruidos respiratorios que disminuyen hasta casi desaparecer pese a que el cuadro empeora.',
              'Frialdad, palidez o moteado de la piel, que añaden compromiso circulatorio al respiratorio.',
              'Incapacidad para hablar, silencio en un paciente que antes se quejaba.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El paciente que «se ha calmado»', texto: 'Un paciente con dificultad respiratoria grave que de pronto parece tranquilo, deja de luchar y se vuelve somnoliento rara vez ha mejorado: con mucha frecuencia se está agotando. Interpretar esa calma como mejoría y espaciar la vigilancia es uno de los errores más graves de este cuadro.' },
        ],
      },
      {
        titulo: 'Qué sostiene el prestador',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Prioridades, en orden',
            items: [
              'Seguridad de la escena y protección personal antes de acercarse.',
              'Vía aérea: comprobar que está permeable y mantenerla; retirar lo que la obstruya según el alcance y el equipo autorizados.',
              'Posición: permitir la que el paciente adopte espontáneamente si mejora su trabajo respiratorio, salvo que otra condición lo impida.',
              'Oxígeno: administrarlo cuando el protocolo del servicio lo indique, con el dispositivo autorizado y titulándolo a la respuesta del paciente. El objetivo numérico procede de la guía de la entidad y del protocolo, no de esta lección.',
              'Ventilación asistida: si la ventilación espontánea no es suficiente, apoyarla con el dispositivo y la técnica que autorice el protocolo, vigilando que sea eficaz y no excesiva.',
              'Buscar causas que cambien la conducta de inmediato y tratarlas conforme al protocolo.',
              'Traslado sin demora y prealerta al hospital cuando el cuadro lo justifique.',
              'Reevaluación continua y registro con hora de cada cambio y de cada intervención.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Reevaluar es una intervención, no un trámite', texto: 'Después de cada acción se comprueba si el paciente mejoró, siguió igual o empeoró. La cadencia de reevaluación en un paciente inestable la fija el protocolo del servicio; el principio que no cambia es que una intervención sin comprobación de su efecto no está terminada.' },
          { tipo: 'p', texto: 'Qué dispositivos de oxigenación y de ventilación lleva la unidad, quién está autorizado a usarlos y con qué respaldo de dirección médica lo determinan el tipo de ambulancia y el protocolo. La dotación mínima por tipo de unidad está en los apéndices normativos de la NOM-034; la indicación nunca sale de ahí.' },
        ],
      },
      {
        titulo: 'Comunicación y destino',
        bloques: [
          { tipo: 'p', texto: 'La información que se transmite al hospital determina lo que estará listo cuando el paciente llegue. Un informe de un paciente con insuficiencia respiratoria se organiza mejor por la trayectoria que por la lista de hallazgos.' },
          {
            tipo: 'lista',
            titulo: 'Qué debe contener el informe',
            items: [
              'Edad, motivo de llamada y tiempo de evolución del cuadro.',
              'Cómo estaba el paciente al llegar y cómo está ahora: la dirección del cambio.',
              'Trabajo respiratorio y estado de alerta, descritos, no etiquetados.',
              'Hallazgos torácicos relevantes, incluida la simetría del murmullo.',
              'Qué se administró o se aplicó, a qué hora y con qué respuesta.',
              'Antecedentes y tratamiento habitual referidos por el paciente o su acompañante.',
              'Tiempo estimado de llegada y necesidad prevista al ingreso.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Describir en vez de etiquetar', texto: '«Habla en palabras sueltas, usa músculos accesorios y está somnoliento» transmite más y compromete menos que «insuficiencia respiratoria grave». La descripción sobrevive a un cambio de hipótesis; la etiqueta puede arrastrar al equipo receptor hacia una entidad equivocada.' },
          { tipo: 'p', texto: 'A qué establecimiento se traslada y con qué prealerta lo determinan el protocolo del servicio, la regulación médica y la capacidad resolutiva disponible. Esta lección no asigna destinos.' },
        ],
      },
      F([WHO_BEC, WHO_PREHOSPITAL_2026, bibiano(46, 'Insuficiencia respiratoria aguda', 418), NOM_034_DOTACION, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Insuficiencia respiratoria', definicion: 'Situación funcional en la que el aparato respiratorio deja de mantener el intercambio de gases necesario; es la vía final común de causas muy distintas.' },
      { termino: 'Fallo de la oxigenación', definicion: 'La sangre no se oxigena adecuadamente al pasar por el pulmón; suele manifestarse con angustia, taquipnea y esfuerzo evidente.' },
      { termino: 'Fallo de la ventilación', definicion: 'No se moviliza el volumen de aire necesario para eliminar dióxido de carbono; suele manifestarse con somnolencia, confusión y respiración superficial o lenta.' },
      { termino: 'Claudicación respiratoria', definicion: 'Agotamiento del esfuerzo tras un periodo de trabajo respiratorio máximo; se reconoce porque el esfuerzo disminuye sin que el paciente mejore.' },
      { termino: 'Trabajo respiratorio', definicion: 'Esfuerzo que el paciente invierte en respirar, valorado por postura, longitud de las frases, músculos accesorios y tiraje.' },
      { termino: 'Titulación a la respuesta', definicion: 'Ajuste de una intervención según el efecto que produce en el paciente, comprobado en cada reevaluación.' },
    ],
    flashcards: [
      { frente: '¿Es la insuficiencia respiratoria un diagnóstico?', reverso: 'No: es un síndrome, la vía final común de causas muy distintas. Reconocerlo no dice todavía por qué ocurre.' },
      { frente: '¿Cuál es el orden de trabajo en la calle?', reverso: 'Reconocer que la respiración es insuficiente y sostenerla; después buscar la causa.' },
      { frente: '¿Cómo se manifiesta con más frecuencia el fallo de la ventilación?', reverso: 'Con somnolencia, confusión, cefalea y respiración superficial o lenta.' },
      { frente: 'Un paciente con dificultad grave se calma y se vuelve somnoliento. ¿Qué significa?', reverso: 'Con mucha frecuencia que está claudicando, no que haya mejorado. Es el momento de intensificar la vigilancia, no de espaciarla.' },
      { frente: '¿De dónde sale el objetivo numérico de la oxigenoterapia?', reverso: 'De la guía de la entidad y del protocolo del servicio; no se memoriza de una lección.' },
      { frente: '¿Por qué se describe en vez de etiquetar en el informe?', reverso: 'Porque la descripción sobrevive a un cambio de hipótesis y la etiqueta puede arrastrar al equipo receptor hacia una entidad equivocada.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente que llevaba veinte minutos con esfuerzo respiratorio máximo deja de luchar, respira más despacio y se vuelve somnoliento. ¿Cómo lo interpretas?',
        opciones: [
          'Ha mejorado y puede espaciarse la vigilancia.',
          'Está claudicando: el esfuerzo disminuye sin que el paciente mejore, y eso exige intensificar la vigilancia y el soporte.',
          'Es el efecto esperado de la posición que adoptó.',
          'Indica que el problema era de origen circulatorio y no respiratorio.',
        ],
        correcta: 1,
        explicacion: 'La disminución del esfuerzo sin mejoría clínica, con somnolencia y respiración lenta en un paciente antes taquipneico, es un signo de claudicación, no de mejoría.',
      },
      {
        pregunta: '¿Qué distingue el fallo de la ventilación del fallo de la oxigenación?',
        opciones: [
          'El fallo de la ventilación es siempre más leve.',
          'En el fallo de la ventilación no se moviliza el volumen necesario para eliminar dióxido de carbono, y predominan somnolencia, confusión y respiración superficial o lenta.',
          'El fallo de la oxigenación no produce alteración de la coloración.',
          'Nunca coexisten en el mismo paciente.',
        ],
        correcta: 1,
        explicacion: 'Son dos formas de fallar que se reconocen distinto, coexisten con frecuencia y una puede evolucionar a la otra cuando el paciente se agota.',
      },
      {
        pregunta: 'El paciente se sienta inclinado hacia adelante y resiste que lo acuesten. ¿Qué haces?',
        opciones: [
          'Acostarlo para facilitar la exploración.',
          'Permitir la posición que adopta espontáneamente si mejora su trabajo respiratorio, salvo que otra condición lo impida.',
          'Acostarlo para poder administrar oxígeno.',
          'Sujetarlo para evitar que se agite.',
        ],
        correcta: 1,
        explicacion: 'Entre las prioridades de estabilización figura permitir la posición que el paciente adopta si mejora su trabajo respiratorio; forzar el decúbito puede empeorarlo.',
      },
      {
        pregunta: '¿Cuándo termina una intervención de soporte respiratorio?',
        opciones: [
          'Cuando se ha aplicado correctamente.',
          'Cuando se ha comprobado su efecto en la reevaluación y se ha registrado con la hora.',
          'Cuando el paciente llega al hospital.',
          'Cuando el protocolo la autoriza.',
        ],
        correcta: 1,
        explicacion: 'Reevaluar es una intervención y no un trámite: una acción sin comprobación de su efecto no está terminada, y el registro con hora es lo que permite demostrar el cambio.',
      },
    ],
    actividades: null,
    revision: ficha({
      estado: 'en_revision',
      version: 'OMS/CICR Basic Emergency Care 2018; OMS Prehospital emergency care pocket reference 2026 (página pendiente); NOM-034-SSA3-2013 para dotación',
      fuentes: [
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NOM-034-SSA3-2013, DOF (apéndices normativos, dotación).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'Tema de MÉTODO: se sostiene con Basic Emergency Care, público y consultable, y por eso queda '
          + 'en revisión y no en borrador.',
        'La oxigenoterapia se enseña como principio y se remite el objetivo numérico a la guía de la '
          + 'entidad y al protocolo. Ninguna cifra se publica aquí.',
        'La ventilación asistida se menciona condicionada a dispositivo, técnica y autorización del '
          + 'protocolo; no se describe ninguna técnica invasiva.',
        'DEUDA: precisar sección y página de la referencia prehospitalaria de la OMS 2026.',
      ],
    }),
  },

  // ============================================================
  //  EPOC agudizado
  // ============================================================
  'm4-resp-epoc': {
    icono: 'cp-servier-enfisema',
    duracion: '20 min',
    resumen: 'Qué es una exacerbación de EPOC, cómo se reconoce su gravedad en la calle y por qué la '
      + 'oxigenoterapia de estos pacientes se administra de forma controlada.',
    objetivos: [
      'Describir qué es la EPOC y qué define una exacerbación.',
      'Reconocer los signos de exacerbación grave en el ámbito prehospitalario.',
      'Justificar por qué la oxigenoterapia en la EPOC se titula de forma controlada.',
      'Ordenar las prioridades prehospitalarias y los límites del alcance profesional.',
    ],
    secciones: [
      {
        titulo: 'La enfermedad y su exacerbación',
        bloques: [
          { tipo: 'p', texto: 'La enfermedad pulmonar obstructiva crónica es una enfermedad respiratoria crónica que cursa con limitación persistente del flujo aéreo y síntomas respiratorios mantenidos. El paciente convive con ella durante años y suele conocer su patrón habitual: cuánto camina antes de detenerse, cuánta expectoración produce y de qué color.' },
          { tipo: 'p', texto: 'Una exacerbación es el empeoramiento agudo de esos síntomas respecto del estado basal del propio paciente, con intensidad suficiente para requerir un cambio de tratamiento. La definición se apoya en el estado basal, y esa es la razón por la que la información del paciente y de su acompañante vale tanto como la exploración.' },
          {
            tipo: 'lista',
            titulo: 'Qué se pregunta para situar la exacerbación',
            items: [
              'Cómo respira habitualmente y qué es lo que ha cambiado.',
              'Desde cuándo lleva peor y si el empeoramiento fue progresivo o brusco.',
              'Si ha aumentado la expectoración y si ha cambiado su aspecto.',
              'Qué tratamiento inhalado usa, si lo ha usado hoy y cuántas veces.',
              'Si usa oxígeno domiciliario y a qué flujo lo tiene indicado.',
              'Si ha tenido ingresos previos por lo mismo y si alguna vez requirió soporte ventilatorio.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El oxígeno domiciliario es un dato clínico', texto: 'Que el paciente use oxígeno en casa indica una enfermedad avanzada y aporta una referencia de su situación basal. El flujo que tiene indicado en domicilio es información que se recoge y se transmite; qué flujo se administra durante la atención lo decide el protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Reconocer la gravedad',
        bloques: [
          { tipo: 'p', texto: 'La gravedad no se mide por la intensidad con que el paciente se queja, sino por cuánto se ha alejado de su estado basal y por los signos de claudicación. Un paciente con EPOC avanzada puede tener a diario hallazgos que en otra persona serían alarmantes; lo que importa es el cambio.' },
          {
            tipo: 'lista',
            titulo: 'Signos que indican gravedad',
            items: [
              'Incapacidad para completar frases o para hablar.',
              'Uso intenso de músculos accesorios y tiraje.',
              'Alteración del estado de alerta: agitación, confusión o somnolencia.',
              'Disminución del esfuerzo respiratorio sin mejoría clínica.',
              'Ruidos respiratorios que disminuyen hasta casi desaparecer mientras el cuadro empeora.',
              'Signos de compromiso circulatorio asociados.',
              'Falta de respuesta al tratamiento inhalado que el paciente ya usó en casa.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La somnolencia en un paciente con EPOC', texto: 'La confusión o la somnolencia en un paciente con EPOC exacerbada obligan a extremar la vigilancia: pueden traducir que la ventilación se ha vuelto insuficiente. No se interpretan como cansancio ni como mejoría de la agitación previa.' },
          { tipo: 'p', texto: 'Conviene además no cerrar la hipótesis: un paciente con EPOC puede estar exacerbado, pero también puede tener otra causa de disnea añadida. La exploración torácica dirigida se hace igual, y una asimetría del murmullo o unos crepitantes no se atribuyen automáticamente a su enfermedad de base.' },
        ],
      },
      {
        titulo: 'La oxigenoterapia controlada',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'Este es el punto donde la EPOC se comporta de forma distinta al resto de las urgencias respiratorias, y donde más daño hace generalizar. En un grupo de estos pacientes, administrar oxígeno sin control puede empeorar la retención de dióxido de carbono y deteriorar el estado de alerta. Por eso la guía rectora de la EPOC recomienda una oxigenoterapia CONTROLADA: no la ausencia de oxígeno, sino oxígeno titulado a un objetivo más conservador que el de otras urgencias, comprobando la respuesta.' },
          {
            tipo: 'lista',
            titulo: 'Lo que sí puede afirmarse sin la cifra',
            items: [
              'La hipoxemia grave no se deja sin tratar por temor a la retención de dióxido de carbono: no tratarla es peligroso.',
              'El oxígeno se administra con un objetivo declarado y se titula a la respuesta, no «al máximo por si acaso».',
              'El objetivo de saturación de la EPOC es más conservador que el habitual de otras urgencias respiratorias.',
              'Un paciente con EPOC al que se le administra oxígeno requiere vigilancia estrecha del estado de alerta.',
              'El objetivo exacto, el dispositivo y el flujo los declara el protocolo del servicio apoyado en la guía vigente.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Deuda declarada de esta lección', texto: 'El objetivo numérico de saturación de la oxigenoterapia controlada en la exacerbación de EPOC procede de la guía GOLD vigente. Al redactar esta lección no se pudo consultar el texto del informe, que requiere descarga registrada, de modo que la cifra NO se publica aquí. Antes de que la academia valide este tema debe incorporarla desde la guía, con su sección, y confirmarla con su protocolo. Hasta entonces, la cifra se pide al protocolo del servicio.' },
        ],
      },
      {
        titulo: 'Prioridades prehospitalarias y límites',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Permitir la posición en que el paciente respira mejor.',
              'Oxigenoterapia controlada según el protocolo del servicio, titulada a la respuesta y con vigilancia del estado de alerta.',
              'Broncodilatador inhalado cuando el protocolo lo indique, con el producto, el dispositivo y la técnica autorizados.',
              'Reevaluación continua, con atención especial a la aparición de somnolencia o de disminución del esfuerzo.',
              'Soporte ventilatorio si la ventilación se vuelve insuficiente, conforme al alcance y al equipo autorizados.',
              'Traslado con prealerta cuando haya signos de gravedad, e informe centrado en el cambio respecto del estado basal.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre el broncodilatador', texto: 'La NOM-034 incluye salbutamol en aerosol en la dotación mínima de la ambulancia de urgencias básicas, en su numeral B.4.4.1. Que un fármaco figure en la dotación responde a «qué debe existir a bordo» y no a «qué se administra, a quién y cuánto»: la indicación, la población, la dosis, el número de disparos o la técnica de nebulización proceden de la guía vigente de la indicación, de la Información para Prescribir del producto registrado y del protocolo del servicio. Esta lección no publica ninguno de esos datos.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se decide en la ambulancia', texto: 'La ventilación no invasiva, los corticoides sistémicos y los antibióticos forman parte del manejo de la exacerbación en el ámbito donde estén indicados y autorizados. Si el servicio no cuenta con el equipo, la competencia y el protocolo que los respalden, no son opciones prehospitalarias, y esta lección no las describe como tales.' },
        ],
      },
      F([GOLD_2026, WHO_BEC, WHO_PREHOSPITAL_2026, bibiano(47, 'Agudización de la enfermedad pulmonar obstructiva crónica', 425), NOM_034_DOTACION, COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'EPOC', definicion: 'Enfermedad respiratoria crónica con limitación persistente del flujo aéreo y síntomas respiratorios mantenidos.' },
      { termino: 'Exacerbación', definicion: 'Empeoramiento agudo de los síntomas respecto del estado basal del propio paciente, con intensidad suficiente para requerir un cambio de tratamiento.' },
      { termino: 'Estado basal', definicion: 'Situación respiratoria habitual del paciente, referencia obligada para juzgar si una exacerbación es grave.' },
      { termino: 'Oxigenoterapia controlada', definicion: 'Administración de oxígeno con un objetivo declarado más conservador que el de otras urgencias respiratorias, titulada a la respuesta y con vigilancia del estado de alerta.' },
      { termino: 'Oxígeno domiciliario', definicion: 'Uso crónico de oxígeno en casa; indica enfermedad avanzada y aporta una referencia del estado basal que se recoge y se transmite.' },
    ],
    flashcards: [
      { frente: '¿Qué define una exacerbación de EPOC?', reverso: 'El empeoramiento agudo de los síntomas respecto del estado basal del propio paciente, con intensidad suficiente para requerir un cambio de tratamiento.' },
      { frente: '¿Por qué la oxigenoterapia en la EPOC es controlada?', reverso: 'Porque en un grupo de estos pacientes el oxígeno sin control puede empeorar la retención de dióxido de carbono y deteriorar el estado de alerta.' },
      { frente: '¿Se deja sin tratar la hipoxemia grave en un paciente con EPOC?', reverso: 'No: no tratarla es peligroso. Se administra oxígeno con objetivo declarado, titulado a la respuesta y con vigilancia estrecha.' },
      { frente: '¿De dónde sale el objetivo numérico de saturación en la EPOC?', reverso: 'De la guía GOLD vigente y del protocolo del servicio. Esta lección declara la deuda y no publica la cifra.' },
      { frente: '¿Qué significa que la NOM-034 incluya salbutamol en el numeral B.4.4.1?', reverso: 'Que debe existir a bordo en la ambulancia de urgencias básicas. No indica para qué, a quién ni cuánto: eso procede de la guía, la IPP y el protocolo.' },
      { frente: 'Paciente con EPOC y crepitantes asimétricos. ¿Se atribuyen a su enfermedad de base?', reverso: 'No automáticamente: un paciente con EPOC puede tener otra causa de disnea añadida, y la exploración dirigida se hace igual.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con EPOC exacerbada recibe oxígeno y a los minutos se vuelve confuso y somnoliento. ¿Cómo lo interpretas?',
        opciones: [
          'Como el efecto esperado del alivio de la disnea.',
          'Como un signo que obliga a extremar la vigilancia, porque puede traducir que la ventilación se ha vuelto insuficiente, y a revisar la titulación según el protocolo.',
          'Como una reacción alérgica al oxígeno.',
          'Como indicación de aumentar el flujo hasta que despierte.',
        ],
        correcta: 1,
        explicacion: 'La confusión o la somnolencia en la EPOC exacerbada pueden traducir ventilación insuficiente. El oxígeno se titula con un objetivo declarado y con vigilancia del estado de alerta; no se interpreta como mejoría.',
      },
      {
        pregunta: 'Por temor a la retención de dióxido de carbono, un compañero propone no administrar oxígeno a un paciente con EPOC e hipoxemia grave. ¿Qué respondes?',
        opciones: [
          'Que tiene razón: en la EPOC el oxígeno está contraindicado.',
          'Que no tratar la hipoxemia grave es peligroso; lo que corresponde es oxigenoterapia controlada, con objetivo declarado y titulada a la respuesta.',
          'Que debe administrarse al máximo flujo disponible.',
          'Que la decisión depende de si el paciente usa oxígeno domiciliario.',
        ],
        correcta: 1,
        explicacion: 'La oxigenoterapia controlada no es la ausencia de oxígeno: es oxígeno con un objetivo más conservador, titulado y vigilado. Dejar sin tratar una hipoxemia grave es peligroso.',
      },
      {
        pregunta: 'Encuentras salbutamol en aerosol a bordo porque la NOM-034 lo exige. ¿Qué te autoriza eso?',
        opciones: [
          'A administrarlo a cualquier paciente con sibilancias.',
          'Nada por sí solo: la dotación dice qué debe existir a bordo; la indicación, la población y la cantidad proceden de la guía vigente, de la Información para Prescribir y del protocolo.',
          'A administrarlo con la dosis que indique el propio envase.',
          'A administrarlo solo si el paciente usa oxígeno domiciliario.',
        ],
        correcta: 1,
        explicacion: 'La NOM-034 es una norma de dotación: responde qué debe haber a bordo. Administrar exige además guía de la indicación, IPP del producto, equipo, competencia y protocolo.',
      },
      {
        pregunta: '¿Cómo se juzga la gravedad de una exacerbación en la calle?',
        opciones: [
          'Por la intensidad con que el paciente se queja.',
          'Por cuánto se ha alejado de su estado basal y por los signos de claudicación.',
          'Por el número de ingresos previos exclusivamente.',
          'Por la presencia de sibilancias.',
        ],
        correcta: 1,
        explicacion: 'Un paciente con EPOC avanzada puede tener a diario hallazgos que en otra persona serían alarmantes: lo que importa es el cambio respecto de su situación habitual y los signos de que está claudicando.',
      },
    ],
    actividades: null,
    revision: ficha({
      version: 'GOLD 2026 (sección pendiente); OMS/CICR Basic Emergency Care 2018; NOM-034-SSA3-2013; IPP COFEPRIS',
      fuentes: [
        'GOLD 2026 Report and Pocket Guide (sección pendiente).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NOM-034-SSA3-2013, DOF, numeral B.4.4.1 (dotación).',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: falta el objetivo numérico de saturación de la '
          + 'oxigenoterapia controlada y los criterios de gravedad de GOLD 2026, con su sección. El '
          + 'informe requiere descarga registrada y no se consultó al redactar.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué objetivo de saturación, dispositivo y flujo fija su protocolo '
          + 'para la exacerbación de EPOC, y qué broncodilatador surte con qué presentación?',
        'La ventilación no invasiva, los corticoides sistémicos y los antibióticos se declaran fuera '
          + 'del alcance prehospitalario mientras no consten equipo, competencia y protocolo.',
        'El único dato normativo mexicano que se afirma —salbutamol en aerosol en el numeral B.4.4.1— '
          + 'se verificó el 16 de agosto de 2026 contra el texto del DOF.',
      ],
    }),
  },

  // ============================================================
  //  Edema agudo de pulmón
  // ============================================================
  'm4-resp-edema-pulmon': {
    icono: 'cp-servier-edema-pulmonar',
    duracion: '20 min',
    resumen: 'Cómo se reconoce el edema agudo de pulmón de origen cardiogénico, qué lo distingue de otras '
      + 'causas de ocupación alveolar y qué puede hacerse por el paciente durante el traslado.',
    objetivos: [
      'Explicar el mecanismo del edema pulmonar cardiogénico.',
      'Reconocer su presentación y sus signos de gravedad en el ámbito prehospitalario.',
      'Diferenciarlo de otras causas de dificultad respiratoria con crepitantes.',
      'Identificar qué intervenciones dependen del protocolo y no se deciden en la ambulancia.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre en el pulmón',
        bloques: [
          { tipo: 'p', texto: 'En el edema agudo de pulmón de origen cardiogénico el corazón izquierdo no logra manejar la sangre que le llega. La presión se transmite hacia atrás, hacia la circulación pulmonar, y el líquido pasa del capilar al intersticio y después al alveolo. El alveolo ocupado por líquido no intercambia gases, y el paciente percibe una sensación de ahogo que empeora al acostarse.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué empeora al acostarse', texto: 'En decúbito aumenta el retorno venoso hacia un corazón que ya no puede manejarlo, y la congestión pulmonar se agrava. Por eso estos pacientes se sientan de forma espontánea, y por eso obligarlos a tumbarse para explorarlos o para trasladarlos puede empeorarlos de forma inmediata.' },
          { tipo: 'p', texto: 'Conviene distinguir el origen. El mecanismo descrito es el cardiogénico, y es el que gobierna esta lección conforme a la fuente asignada. Existen otras causas de ocupación alveolar por líquido en las que el problema no es la presión de retorno sino la permeabilidad del capilar; su manejo es distinto y no se deduce de esta lección.' },
        ],
      },
      {
        titulo: 'Reconocimiento',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Presentación habitual',
            items: [
              'Disnea de instauración rápida que empeora en decúbito y obliga a incorporarse.',
              'Angustia intensa y sensación de ahogo.',
              'Trabajo respiratorio evidente, con uso de músculos accesorios.',
              'Crepitantes en la auscultación, característicamente en ambos hemitórax.',
              'Expectoración espumosa, a veces rosada, en los cuadros avanzados.',
              'Piel fría y sudorosa.',
              'Con frecuencia, antecedentes cardiacos conocidos, tratamiento diurético o episodios previos similares.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Signos de gravedad',
            items: [
              'Incapacidad para hablar en frases.',
              'Alteración del estado de alerta.',
              'Disminución del esfuerzo respiratorio sin mejoría.',
              'Signos de hipoperfusión: piel fría y moteada, relleno capilar lento, alteración del sensorio.',
              'Dolor torácico asociado, que abre la posibilidad de un síndrome coronario como desencadenante.',
              'Arritmia percibida o detectada durante la atención.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Congestión con hipoperfusión', texto: 'Un paciente congestivo que además está mal perfundido —frío, moteado, con el sensorio alterado— es un enfermo mucho más grave que el que solo está congestivo, y su manejo cambia. Reconocer esa combinación y transmitirla en la prealerta es una de las aportaciones más útiles del prestador.' },
          { tipo: 'p', texto: 'La distinción entre un edema pulmonar cardiogénico y otras causas de dificultad respiratoria con crepitantes no siempre puede hacerse en la calle, y a veces coexisten. Cuando la impresión de campo no es clara, se sostiene al paciente, se registra lo observado y se traslada; forzar una etiqueta y tratar en consecuencia es más peligroso que reconocer la incertidumbre.' },
        ],
      },
      {
        titulo: 'Qué se hace y qué no se decide aquí',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Conducta prehospitalaria',
            items: [
              'Permitir e incluso favorecer la posición incorporada; no acostar al paciente para explorarlo si eso lo empeora.',
              'Oxigenoterapia según el protocolo del servicio, titulada a la respuesta.',
              'Vigilancia de la perfusión además de la respiración: este cuadro puede evolucionar a compromiso circulatorio.',
              'Monitorización conforme al equipo de la unidad y al alcance autorizado.',
              'Prudencia con la administración de líquidos: en un paciente congestivo, aportar volumen sin indicación puede agravarlo. Cualquier decisión sobre fluidos corresponde al protocolo y a la dirección médica.',
              'Traslado sin demora, con prealerta cuando haya signos de gravedad.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Intervenciones que esta lección no autoriza', texto: 'El tratamiento del edema pulmonar cardiogénico incluye medidas —nitratos, diuréticos, ventilación con presión positiva no invasiva— que en el ámbito prehospitalario dependen por completo de que existan la indicación respaldada por la guía vigente, la Información para Prescribir del producto registrado, el equipo a bordo, la competencia acreditada del prestador y el protocolo con dirección médica. Esta lección no publica su indicación, su dosis, su presión ni su técnica, y su ausencia no debe leerse como que estén contraindicadas: se leen como que su decisión no se toma con una lección.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué transmitir en la prealerta', texto: 'La combinación que cambia la recepción es congestión más estado de perfusión: si el paciente está congestivo y bien perfundido, o congestivo y mal perfundido. Añadir el tiempo de evolución, la respuesta a lo aplicado y si hay dolor torácico o arritmia completa un informe útil.' },
        ],
      },
      F([AHA_HF_2022, WHO_BEC, WHO_PREHOSPITAL_2026, COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Edema pulmonar cardiogénico', definicion: 'Ocupación alveolar por líquido secundaria a que el corazón izquierdo no maneja la sangre que le llega y la presión se transmite hacia la circulación pulmonar.' },
      { termino: 'Ortopnea', definicion: 'Disnea que aparece o empeora en decúbito y obliga al paciente a incorporarse, por el aumento del retorno venoso hacia un corazón que no puede manejarlo.' },
      { termino: 'Congestión con hipoperfusión', definicion: 'Combinación de sobrecarga de líquido y mala perfusión periférica; identifica a un paciente mucho más grave y cambia el manejo.' },
      { termino: 'Edema pulmonar no cardiogénico', definicion: 'Ocupación alveolar por aumento de la permeabilidad del capilar y no por presión de retorno; su manejo es distinto y no se deduce de esta lección.' },
      { termino: 'Prudencia con los fluidos', definicion: 'Principio prehospitalario de este cuadro: aportar volumen sin indicación a un paciente congestivo puede agravarlo, y la decisión corresponde al protocolo.' },
    ],
    flashcards: [
      { frente: '¿Por qué empeora el edema pulmonar cardiogénico al acostarse?', reverso: 'Porque en decúbito aumenta el retorno venoso hacia un corazón que ya no puede manejarlo y la congestión pulmonar se agrava.' },
      { frente: '¿Qué combinación identifica a un paciente mucho más grave?', reverso: 'Congestión más hipoperfusión: frío, moteado y con el sensorio alterado, además de congestivo.' },
      { frente: '¿Qué precaución rige con los líquidos en este cuadro?', reverso: 'Aportar volumen sin indicación puede agravar a un paciente congestivo; la decisión corresponde al protocolo y a la dirección médica.' },
      { frente: '¿Todo crepitante bilateral es edema cardiogénico?', reverso: 'No: hay otras causas de ocupación alveolar, la distinción no siempre puede hacerse en la calle y a veces coexisten.' },
      { frente: '¿Qué se hace cuando la impresión de campo no es clara?', reverso: 'Sostener al paciente, registrar lo observado y trasladar. Forzar una etiqueta y tratar en consecuencia es más peligroso.' },
      { frente: '¿Qué se transmite en la prealerta de este cuadro?', reverso: 'Congestión y estado de perfusión, tiempo de evolución, respuesta a lo aplicado y si hay dolor torácico o arritmia.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con disnea súbita, crepitantes bilaterales y expectoración espumosa se niega a acostarse. ¿Qué haces?',
        opciones: [
          'Acostarlo para explorar mejor el tórax.',
          'Respetar y favorecer la posición incorporada, porque el decúbito aumenta el retorno venoso y agrava la congestión.',
          'Acostarlo únicamente durante el traslado.',
          'Sujetarlo para controlar la angustia.',
        ],
        correcta: 1,
        explicacion: 'En decúbito aumenta el retorno venoso hacia un corazón que no puede manejarlo. Obligar a tumbarse a estos pacientes puede empeorarlos de forma inmediata.',
      },
      {
        pregunta: 'El paciente está congestivo y además frío, moteado y con el sensorio alterado. ¿Qué significa?',
        opciones: [
          'Que el cuadro es leve porque ha dejado de agitarse.',
          'Que a la congestión se añade hipoperfusión, lo que identifica a un enfermo mucho más grave y debe transmitirse en la prealerta.',
          'Que se trata con seguridad de un edema no cardiogénico.',
          'Que debe administrarse volumen para mejorar la perfusión.',
        ],
        correcta: 1,
        explicacion: 'Congestión con hipoperfusión es la combinación que cambia el manejo y la recepción. Además, aportar volumen sin indicación a un paciente congestivo puede agravarlo.',
      },
      {
        pregunta: 'Un compañero propone administrar un nitrato porque «así se trata el edema agudo de pulmón». ¿Qué respondes?',
        opciones: [
          'Que adelante, porque es el tratamiento clásico.',
          'Que esa decisión exige indicación respaldada por la guía vigente, Información para Prescribir del producto, equipo, competencia acreditada y protocolo con dirección médica; no se toma con una lección.',
          'Que está contraindicado en todos los casos.',
          'Que solo procede si el paciente tiene antecedentes cardiacos.',
        ],
        correcta: 1,
        explicacion: 'La ausencia de esas medidas en la lección no significa que estén contraindicadas: significa que su decisión depende de requisitos que la lección no puede sustituir.',
      },
      {
        pregunta: 'No logras distinguir en la calle si los crepitantes son de origen cardiogénico o de otra causa. ¿Cómo procedes?',
        opciones: [
          'Elegir la hipótesis más probable y tratar en consecuencia.',
          'Sostener al paciente, registrar lo observado y trasladar, reconociendo la incertidumbre.',
          'Registrar el caso como diagnóstico indeterminado y suspender la reevaluación.',
          'Aplicar el tratamiento de ambas hipótesis a la vez.',
        ],
        correcta: 1,
        explicacion: 'La distinción no siempre puede hacerse en la calle y a veces las causas coexisten. Forzar una etiqueta y tratar en consecuencia es más peligroso que reconocer la incertidumbre.',
      },
    ],
    actividades: null,
    revision: ficha({
      version: 'AHA/ACC/HFSA 2022 (sección pendiente); OMS/CICR Basic Emergency Care 2018; IPP COFEPRIS',
      fuentes: [
        '2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure (sección pendiente).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: falta la sección exacta de la guía AHA/ACC/HFSA '
          + '2022 sobre insuficiencia cardiaca aguda descompensada.',
        'La lección se limita al edema pulmonar CARDIOGÉNICO, conforme a la asignación del registro. '
          + 'El no cardiogénico se nombra para distinguirlo y se declara expresamente fuera de alcance.',
        'Nitratos, diuréticos y ventilación no invasiva se declaran condicionados y no se describen: '
          + 'no se publica indicación, dosis, presión ni técnica.',
        'PREGUNTA PARA LA ACADEMIA: ¿autoriza su protocolo alguna de esas medidas en el ámbito '
          + 'prehospitalario, con qué producto, presentación, equipo y competencia?',
      ],
    }),
  },

  // ============================================================
  //  Neumotórax espontáneo
  // ============================================================
  'm4-resp-neumotorax-espontaneo': {
    icono: 'cp-servier-neumotorax',
    duracion: '18 min',
    resumen: 'Qué es un neumotórax espontáneo, cómo se sospecha en la calle y cómo se reconoce la forma '
      + 'que compromete la vida y no admite espera.',
    objetivos: [
      'Definir el neumotórax espontáneo y distinguir su forma primaria de la secundaria.',
      'Diferenciarlo del neumotórax de origen traumático.',
      'Reconocer los signos del neumotórax a tensión como cuadro tiempo-dependiente.',
      'Delimitar qué corresponde al prestador y qué a la decisión hospitalaria.',
    ],
    secciones: [
      {
        titulo: 'Qué es y de qué tipos',
        bloques: [
          { tipo: 'p', texto: 'Un neumotórax es la presencia de aire en el espacio pleural, entre el pulmón y la pared torácica. Ese aire ocupa un espacio que normalmente no existe y hace que el pulmón se colapse en mayor o menor grado, con lo que la superficie disponible para el intercambio de gases disminuye.' },
          { tipo: 'p', texto: 'Se llama espontáneo al que aparece sin un traumatismo que lo explique. Se distinguen dos situaciones: el primario, que ocurre en personas sin enfermedad pulmonar conocida —clásicamente jóvenes, altos y delgados, con más frecuencia en varones y con relación con el tabaquismo—, y el secundario, que ocurre sobre un pulmón ya enfermo, por ejemplo en un paciente con EPOC. La distinción importa porque un mismo volumen de aire tolera mucho peor un pulmón previamente dañado.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Espontáneo no significa leve', texto: 'La palabra describe el origen, no la gravedad. Un neumotórax espontáneo secundario en un paciente con reserva pulmonar reducida puede producir un cuadro grave con un volumen de aire que en otra persona apenas daría síntomas.' },
          { tipo: 'p', texto: 'El neumotórax de origen traumático comparte el mecanismo físico pero pertenece al bloque de emergencias traumatológicas del plan, con su propia valoración y sus propias fuentes. Esta lección se ocupa del espontáneo, y no traslada a él conclusiones del trauma ni al revés.' },
        ],
      },
      {
        titulo: 'Cómo se sospecha',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Presentación habitual',
            items: [
              'Dolor torácico de comienzo súbito, con frecuencia de características pleuríticas: aumenta con la inspiración profunda y con la tos.',
              'Disnea de aparición brusca, de intensidad variable.',
              'Aparición en reposo o durante una actividad cotidiana, sin traumatismo que lo explique.',
              'En la exploración: murmullo disminuido o ausente en el hemitórax afectado.',
              'En la exploración: hiperresonancia a la percusión de ese lado, cuando el entorno permite percutir.',
              'Expansión torácica asimétrica.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La exploración orienta pero no confirma', texto: 'Un murmullo disminuido con hiperresonancia en un hemitórax es sugestivo, pero la confirmación de un neumotórax y la medición de su tamaño requieren estudios de imagen que no viajan en la ambulancia. En la calle se construye una sospecha, se sostiene al paciente y se traslada.' },
          { tipo: 'p', texto: 'La sospecha aumenta cuando el cuadro aparece en el perfil descrito o en un paciente con enfermedad pulmonar conocida, y cuando existen episodios previos: el neumotórax espontáneo puede repetirse, y muchos pacientes reconocen la sensación.' },
        ],
      },
      {
        titulo: 'La forma que no espera',
        bloques: [
          { tipo: 'p', texto: 'Cuando el aire entra en el espacio pleural y no puede salir, se acumula a presión creciente. El pulmón se colapsa, las estructuras del mediastino se desplazan y el retorno venoso al corazón se compromete. Esa situación deja de ser un problema respiratorio para convertirse en un problema circulatorio, y es tiempo-dependiente.' },
          {
            tipo: 'lista',
            titulo: 'Signos que hacen sospecharla',
            items: [
              'Dificultad respiratoria intensa y de empeoramiento rápido.',
              'Murmullo ausente e hiperresonancia en un hemitórax.',
              'Signos de compromiso circulatorio: piel fría, mala perfusión, deterioro del estado de alerta.',
              'Distensión de las venas del cuello, que puede faltar si además hay hipovolemia.',
              'Desviación de la tráquea hacia el lado contrario, que es un signo tardío y cuya ausencia no descarta nada.',
              'Deterioro progresivo pese al soporte que se está aplicando.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Reconocer no es lo mismo que intervenir', texto: 'La descompresión torácica es un procedimiento invasivo. Que un prestador esté autorizado a realizarla, con qué material, en qué sitio anatómico y bajo qué respaldo de dirección médica depende del alcance profesional del programa y del protocolo del servicio, y esta lección NO lo describe ni lo autoriza. Lo que sí corresponde a todo prestador es reconocer el cuadro, sostener al paciente, pedir apoyo conforme al protocolo, trasladar sin demora y prealertar. Un reconocimiento correcto comunicado a tiempo cambia el desenlace aunque la intervención la haga otro.' },
        ],
      },
      {
        titulo: 'Conducta prehospitalaria y límites',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué hace el prestador',
            items: [
              'Permitir la posición en que el paciente respira mejor.',
              'Oxigenoterapia según el protocolo del servicio, titulada a la respuesta.',
              'Exploración torácica comparativa y repetida: el dato decisivo suele ser el cambio.',
              'Vigilancia del estado circulatorio además del respiratorio.',
              'Traslado sin demora y prealerta cuando haya sospecha de la forma a tensión o deterioro progresivo.',
              'Registro con hora de los hallazgos, de su evolución y de lo aplicado.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Lo que se decide en el hospital', texto: 'Si un neumotórax espontáneo se maneja de forma conservadora o requiere una intervención para evacuar el aire es una decisión hospitalaria que depende del tamaño, de los síntomas, de la reserva pulmonar del paciente y de la evolución. La guía rectora de la enfermedad pleural establece los criterios; esta lección no los reproduce y no corresponde tomarlos en la ambulancia.' },
        ],
      },
      F([BTS_PLEURAL_2023, WHO_BEC, WHO_PREHOSPITAL_2026, bibiano(52, 'Neumotórax y neumomediastino', 463), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Neumotórax', definicion: 'Presencia de aire en el espacio pleural, que colapsa el pulmón en mayor o menor grado y reduce la superficie disponible para el intercambio de gases.' },
      { termino: 'Neumotórax espontáneo primario', definicion: 'El que aparece sin traumatismo en personas sin enfermedad pulmonar conocida; clásicamente jóvenes, altos y delgados, con relación con el tabaquismo.' },
      { termino: 'Neumotórax espontáneo secundario', definicion: 'El que aparece sin traumatismo sobre un pulmón ya enfermo; un mismo volumen de aire produce un cuadro más grave por la menor reserva pulmonar.' },
      { termino: 'Neumotórax a tensión', definicion: 'Acumulación de aire a presión creciente que colapsa el pulmón, desplaza el mediastino y compromete el retorno venoso; deja de ser un problema respiratorio para ser circulatorio.' },
      { termino: 'Signo tardío', definicion: 'Hallazgo que aparece cuando el cuadro ya está avanzado, como la desviación traqueal: su presencia apoya, su ausencia no descarta.' },
    ],
    flashcards: [
      { frente: '¿Qué significa que un neumotórax sea espontáneo?', reverso: 'Que aparece sin un traumatismo que lo explique. La palabra describe el origen, no la gravedad.' },
      { frente: 'Primario frente a secundario', reverso: 'El primario ocurre sobre un pulmón sano; el secundario, sobre un pulmón ya enfermo, y por eso tolera mucho peor el mismo volumen de aire.' },
      { frente: '¿Qué hallazgos de exploración lo sugieren?', reverso: 'Murmullo disminuido o ausente e hiperresonancia en el hemitórax afectado, con expansión asimétrica.' },
      { frente: '¿Por qué el neumotórax a tensión es tiempo-dependiente?', reverso: 'Porque el aire a presión creciente desplaza el mediastino y compromete el retorno venoso: pasa a ser un problema circulatorio.' },
      { frente: '¿Descarta la ausencia de desviación traqueal un neumotórax a tensión?', reverso: 'No: es un signo tardío. Su presencia apoya la sospecha, su ausencia no descarta nada.' },
      { frente: '¿Describe esta lección la descompresión torácica?', reverso: 'No. Es un procedimiento invasivo cuyo alcance, material y respaldo dependen del programa y del protocolo. Al prestador le corresponde reconocer, sostener, trasladar y prealertar.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente joven, alto y delgado con dolor torácico súbito que aumenta al inspirar y disnea, sin traumatismo. Auscultas murmullo disminuido en un hemitórax. ¿Qué es lo correcto?',
        opciones: [
          'Confirmar un neumotórax espontáneo primario y registrarlo como diagnóstico.',
          'Sospechar un neumotórax espontáneo, sostener al paciente y trasladar: la confirmación y el tamaño requieren imagen que no viaja en la ambulancia.',
          'Descartarlo por la ausencia de traumatismo.',
          'Esperar a la desviación traqueal para actuar.',
        ],
        correcta: 1,
        explicacion: 'La exploración orienta pero no confirma. En la calle se construye una sospecha; además, la desviación traqueal es un signo tardío que no debe esperarse.',
      },
      {
        pregunta: 'Un paciente con EPOC presenta un neumotórax espontáneo. ¿Por qué preocupa más que en una persona sana?',
        opciones: [
          'Porque el aire pleural se reabsorbe peor en el fumador.',
          'Porque se trata de un neumotórax secundario y un mismo volumen de aire lo tolera mucho peor un pulmón con reserva reducida.',
          'Porque el neumotórax secundario siempre evoluciona a tensión.',
          'Porque en la EPOC no puede auscultarse.',
        ],
        correcta: 1,
        explicacion: 'La distinción entre primario y secundario importa precisamente porque un pulmón previamente dañado tolera mucho peor el mismo volumen de aire.',
      },
      {
        pregunta: 'Sospechas un neumotórax a tensión y no estás autorizado a descomprimir. ¿Qué haces?',
        opciones: [
          'Realizar el procedimiento igualmente, porque el cuadro compromete la vida.',
          'Reconocer el cuadro, sostener al paciente, pedir apoyo conforme al protocolo, trasladar sin demora y prealertar.',
          'Esperar en la escena a que se confirme el diagnóstico.',
          'Registrar la sospecha y continuar la exploración secundaria completa antes de trasladar.',
        ],
        correcta: 1,
        explicacion: 'La descompresión torácica es un procedimiento invasivo cuyo alcance depende del programa y del protocolo. Un reconocimiento correcto comunicado a tiempo cambia el desenlace aunque la intervención la haga otro.',
      },
      {
        pregunta: '¿Quién decide si un neumotórax espontáneo se maneja de forma conservadora o se evacúa el aire?',
        opciones: [
          'El prestador, según el tamaño que estime en la exploración.',
          'El ámbito hospitalario, según el tamaño, los síntomas, la reserva pulmonar y la evolución, con los criterios de la guía de enfermedad pleural.',
          'El centro regulador, en la llamada.',
          'Se decide siempre por la presencia de dolor pleurítico.',
        ],
        correcta: 1,
        explicacion: 'Es una decisión hospitalaria basada en criterios que esta lección no reproduce y que no corresponde tomar en la ambulancia.',
      },
    ],
    actividades: null,
    revision: ficha({
      version: 'BTS Guideline for Pleural Disease 2023 (sección pendiente); OMS/CICR Basic Emergency Care 2018',
      fuentes: [
        'British Thoracic Society Guideline for Pleural Disease, 2023 (sección pendiente).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: falta la sección exacta de la guía BTS 2023 sobre '
          + 'selección entre manejo conservador e intervención, que la lección remite al hospital sin '
          + 'reproducir.',
        'El neumotórax TRAUMÁTICO se declara expresamente fuera de este tema: pertenece al Módulo 5 y '
          + 'tiene sus propias fuentes. No se trasladan conclusiones en ninguna dirección.',
        'La descompresión torácica NO se describe ni se autoriza. Se declara dependiente del alcance '
          + 'profesional, del material, del protocolo y de la dirección médica.',
        'PREGUNTA PARA LA ACADEMIA: ¿está la descompresión torácica dentro del alcance de sus alumnos, '
          + 'con qué material, en qué unidades y con qué respaldo de dirección médica?',
      ],
    }),
  },

  // ============================================================
  //  Tromboembolia pulmonar
  // ============================================================
  'm4-resp-tep': {
    icono: 'cp-servier-tep',
    duracion: '18 min',
    resumen: 'Por qué la tromboembolia pulmonar es difícil de reconocer en la calle, qué debe hacer '
      + 'sospecharla y qué distingue al paciente de alto riesgo.',
    objetivos: [
      'Explicar el mecanismo de la tromboembolia pulmonar.',
      'Identificar los factores de riesgo que elevan la sospecha.',
      'Reconocer los signos de inestabilidad que definen al paciente de mayor riesgo.',
      'Delimitar qué puede y qué no puede hacerse en el ámbito prehospitalario.',
    ],
    secciones: [
      {
        titulo: 'Qué ocurre',
        bloques: [
          { tipo: 'p', texto: 'En la tromboembolia pulmonar un trombo formado habitualmente en el sistema venoso profundo de las extremidades inferiores se desprende, viaja por la circulación venosa y se enclava en la arteria pulmonar o en alguna de sus ramas. La zona de pulmón que depende de esa rama sigue ventilándose pero deja de recibir sangre, de modo que ventila sin perfundirse.' },
          { tipo: 'p', texto: 'La repercusión depende de cuánto lecho vascular quede obstruido y de la reserva cardiopulmonar previa del paciente. Cuando la obstrucción es extensa, el ventrículo derecho tiene que bombear contra una resistencia que no puede vencer, se dilata y falla; de ahí que un cuadro que empieza como respiratorio termine manifestándose como circulatorio.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Un pulmón que ventila y no perfunde', texto: 'Esa es la particularidad que explica la presentación. El paciente puede tener una exploración torácica poco llamativa —a veces prácticamente normal— y estar sin embargo gravemente comprometido. Es lo contrario de lo que sugiere la intuición, y es la razón por la que este cuadro se pasa por alto.' },
        ],
      },
      {
        titulo: 'Por qué se pasa por alto',
        bloques: [
          { tipo: 'p', texto: 'La tromboembolia pulmonar no tiene una presentación propia. Sus manifestaciones son inespecíficas y se solapan con las de otros cuadros respiratorios y cardiacos, y ninguna combinación de signos permite confirmarla ni excluirla en la calle. Por eso el reconocimiento prehospitalario no se apoya en un cuadro típico, sino en mantener la sospecha ante una presentación que no encaja del todo.' },
          {
            tipo: 'lista',
            titulo: 'Manifestaciones que pueden aparecer',
            items: [
              'Disnea de comienzo súbito, con frecuencia sin ortopnea.',
              'Dolor torácico, a menudo de características pleuríticas.',
              'Taquipnea y taquicardia.',
              'Síncope o presíncope, que en este cuadro es un dato de alarma.',
              'Tos, y en ocasiones expectoración hemoptoica.',
              'Angustia y sensación de gravedad desproporcionadas para lo que muestra la exploración.',
              'Signos en una extremidad inferior: dolor, aumento de volumen o asimetría respecto de la contraria.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Factores de riesgo que elevan la sospecha',
            items: [
              'Inmovilización prolongada, encamamiento o viaje largo reciente.',
              'Cirugía o traumatismo recientes, sobre todo de extremidad inferior o pelvis.',
              'Antecedente de trombosis venosa o de embolia pulmonar previas.',
              'Cáncer activo o en tratamiento.',
              'Embarazo y puerperio.',
              'Uso de anticonceptivos hormonales o de terapia hormonal.',
              'Enfermedad que obligue a permanecer en cama de forma prolongada.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La pregunta que rinde', texto: 'Ante una disnea súbita sin causa evidente, preguntar de forma dirigida por inmovilización, cirugía reciente, cáncer, embarazo o episodios previos cambia la sospecha más que cualquier maniobra de exploración. Es información que el paciente rara vez ofrece por su cuenta.' },
        ],
      },
      {
        titulo: 'El paciente de alto riesgo',
        bloques: [
          { tipo: 'p', texto: 'La guía rectora de esta entidad estratifica el riesgo, y el criterio que puede aplicarse desde la calle es el más simple y el más importante: la presencia de inestabilidad hemodinámica identifica al grupo de mayor riesgo y de mayor mortalidad precoz. Un paciente con sospecha de tromboembolia pulmonar que además está hipotenso, mal perfundido o ha presentado un síncope es un enfermo tiempo-dependiente.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se vigila y se transmite',
            items: [
              'Estado de perfusión: color, temperatura, relleno capilar y estado de alerta.',
              'Presión arterial y su tendencia durante la atención, más que un valor aislado.',
              'Aparición o repetición de síncope.',
              'Deterioro progresivo pese al soporte aplicado.',
              'Hallazgos de la exploración torácica, incluso cuando sea poco llamativa: también eso es información.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La exploración normal no tranquiliza', texto: 'En este cuadro, una auscultación sin hallazgos no reduce la sospecha ni permite bajar el nivel de vigilancia. Es la situación en la que el prestador debe resistir la tentación de dar de baja la gravedad porque «no se oye nada».' },
        ],
      },
      {
        titulo: 'Qué corresponde a la ambulancia',
        bloques: [
          BLOQUE_CIFRAS,
          { tipo: 'p', texto: 'El diagnóstico de tromboembolia pulmonar exige estudios que no existen en el ámbito prehospitalario. En la calle no se confirma ni se descarta: se sospecha, se sostiene y se traslada, y la aportación decisiva del prestador es transmitir la sospecha junto con los factores de riesgo que la sustentan, porque eso orienta la recepción hospitalaria.' },
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Posición en que el paciente respira mejor.',
              'Oxigenoterapia según el protocolo del servicio, titulada a la respuesta.',
              'Monitorización y vigilancia estrecha de la perfusión, conforme al equipo y al alcance autorizados.',
              'Recogida dirigida de los factores de riesgo; se anotan y se transmiten.',
              'Traslado sin demora, con prealerta si hay inestabilidad, síncope o deterioro progresivo.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se decide aquí', texto: 'La anticoagulación y el tratamiento de reperfusión son decisiones hospitalarias que dependen de la confirmación, de la estratificación de riesgo y del balance de sangrado de cada paciente. Esta lección no las describe ni las sitúa en el ámbito prehospitalario.' },
        ],
      },
      F([ESC_TEP_2019, WHO_BEC, WHO_PREHOSPITAL_2026, bibiano(49, 'Enfermedad tromboembólica venosa', 439), AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Tromboembolia pulmonar', definicion: 'Enclavamiento en la arteria pulmonar o sus ramas de un trombo procedente habitualmente del sistema venoso profundo de las extremidades inferiores.' },
      { termino: 'Ventilación sin perfusión', definicion: 'Situación de la zona pulmonar afectada, que sigue ventilándose pero deja de recibir sangre; explica que la exploración torácica pueda ser poco llamativa.' },
      { termino: 'Presentación inespecífica', definicion: 'Rasgo central de esta entidad: sus manifestaciones se solapan con otras y ninguna combinación permite confirmarla ni excluirla en la calle.' },
      { termino: 'Inestabilidad hemodinámica', definicion: 'Criterio aplicable desde la calle que identifica al grupo de mayor riesgo y mortalidad precoz en la sospecha de tromboembolia pulmonar.' },
      { termino: 'Factores de riesgo tromboembólico', definicion: 'Inmovilización, cirugía o traumatismo recientes, antecedente trombótico, cáncer activo, embarazo y puerperio, y terapia hormonal, entre otros.' },
    ],
    flashcards: [
      { frente: '¿Qué le ocurre a la zona pulmonar afectada?', reverso: 'Sigue ventilándose pero deja de recibir sangre: ventila sin perfundirse.' },
      { frente: '¿Por qué se pasa por alto este cuadro?', reverso: 'Porque no tiene presentación propia: sus manifestaciones son inespecíficas y ninguna combinación lo confirma ni lo excluye en la calle.' },
      { frente: '¿Qué criterio de riesgo puede aplicarse desde la calle?', reverso: 'La inestabilidad hemodinámica, que identifica al grupo de mayor riesgo y de mayor mortalidad precoz.' },
      { frente: '¿Tranquiliza una auscultación sin hallazgos?', reverso: 'No: en este cuadro no reduce la sospecha ni permite bajar el nivel de vigilancia.' },
      { frente: 'Nombra tres factores de riesgo tromboembólico.', reverso: 'Inmovilización prolongada, cirugía o traumatismo recientes y cáncer activo; también embarazo y puerperio, terapia hormonal y antecedente trombótico.' },
      { frente: '¿Cuál es la aportación decisiva del prestador?', reverso: 'Transmitir la sospecha junto con los factores de riesgo que la sustentan, porque eso orienta la recepción hospitalaria.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer con disnea súbita y dolor pleurítico, operada de rodilla hace diez días. La auscultación no muestra hallazgos. ¿Qué concluyes?',
        opciones: [
          'Que puede descartarse un origen pulmonar grave por la auscultación normal.',
          'Que la exploración normal no reduce la sospecha y que la cirugía reciente es un factor de riesgo que la eleva; se sospecha, se sostiene y se traslada.',
          'Que se trata de dolor de origen musculoesquelético.',
          'Que debe confirmarse el diagnóstico antes de trasladar.',
        ],
        correcta: 1,
        explicacion: 'La zona afectada ventila sin perfundirse, por lo que la exploración puede ser poco llamativa. La cirugía reciente figura entre los factores de riesgo, y la confirmación exige estudios que no existen en la ambulancia.',
      },
      {
        pregunta: 'Un paciente con sospecha de tromboembolia pulmonar presenta un síncope y está mal perfundido. ¿Qué significa?',
        opciones: [
          'Que la sospecha era equivocada y el cuadro es neurológico.',
          'Que la inestabilidad hemodinámica lo sitúa en el grupo de mayor riesgo y mortalidad precoz, y obliga a prealertar.',
          'Que debe esperarse a que se recupere antes de trasladar.',
          'Que el cuadro ha dejado de ser tiempo-dependiente.',
        ],
        correcta: 1,
        explicacion: 'El criterio aplicable desde la calle es la inestabilidad hemodinámica, y el síncope es un dato de alarma en este cuadro.',
      },
      {
        pregunta: 'Ante una disnea súbita sin causa evidente, ¿qué maniobra rinde más para orientar la sospecha?',
        opciones: [
          'Percutir cuidadosamente ambos hemitórax.',
          'Preguntar de forma dirigida por inmovilización, cirugía reciente, cáncer, embarazo o episodios previos.',
          'Repetir la auscultación hasta encontrar un hallazgo.',
          'Medir la expansión torácica con precisión.',
        ],
        correcta: 1,
        explicacion: 'Los factores de riesgo cambian la sospecha más que cualquier maniobra, y es información que el paciente rara vez ofrece por su cuenta.',
      },
      {
        pregunta: '¿Qué papel tiene la anticoagulación en el manejo prehospitalario de este cuadro?',
        opciones: [
          'Es la primera medida que debe aplicarse en la escena.',
          'Ninguno en esta lección: es una decisión hospitalaria que depende de la confirmación, de la estratificación de riesgo y del balance de sangrado.',
          'Se aplica solo si el paciente está estable.',
          'Sustituye a la oxigenoterapia cuando hay inestabilidad.',
        ],
        correcta: 1,
        explicacion: 'La anticoagulación y el tratamiento de reperfusión son decisiones hospitalarias; la lección no las sitúa en el ámbito prehospitalario.',
      },
    ],
    actividades: null,
    revision: ficha({
      version: 'ESC 2019 Acute Pulmonary Embolism (sección pendiente); OMS/CICR Basic Emergency Care 2018',
      fuentes: [
        '2019 ESC Guidelines for acute pulmonary embolism (sección pendiente).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: falta la sección exacta de estratificación de '
          + 'riesgo de la guía ESC 2019. La lección usa solo el criterio de inestabilidad '
          + 'hemodinámica, que es el aplicable desde la calle, y no reproduce escalas ni puntuaciones.',
        'No se publica ninguna escala de probabilidad clínica ni de gravedad: aplicarlas exige el texto '
          + 'de la guía y no cambia la conducta prehospitalaria.',
        'Anticoagulación y reperfusión se declaran decisiones hospitalarias y no se describen.',
        'VERIFICAR ANTES DE VALIDAR: que la guía ESC 2019 siga siendo la vigente para esta entidad en '
          + 'el catálogo oficial de la ESC, conforme a la condición registrada en el registro académico.',
      ],
    }),
  },

  // ============================================================
  //  Neumonía y bronquitis
  // ============================================================
  'm4-resp-neumonia-bronquitis': {
    icono: 'cp-servier-bronquitis-cronica',
    duracion: '18 min',
    resumen: 'Qué distingue una neumonía de una bronquitis aguda, cómo se reconoce al paciente que está '
      + 'grave y por qué el antibiótico no es una decisión prehospitalaria.',
    objetivos: [
      'Diferenciar conceptualmente neumonía y bronquitis aguda.',
      'Reconocer los signos prehospitalarios que indican gravedad.',
      'Identificar la sospecha de sepsis como el cambio que altera la prioridad.',
      'Justificar por qué el tratamiento antimicrobiano no se decide en la ambulancia.',
    ],
    secciones: [
      {
        titulo: 'Dos cuadros que se confunden',
        bloques: [
          { tipo: 'p', texto: 'La bronquitis aguda es la inflamación de la mucosa bronquial. El síntoma que domina es la tos, con o sin expectoración, y el paciente conserva habitualmente un estado general aceptable. La neumonía es una infección del parénquima pulmonar: los alveolos se ocupan y esa zona deja de intercambiar gases, de modo que al cuadro infeccioso se le añade un componente respiratorio.' },
          {
            tipo: 'tabla',
            titulo: 'Lo que orienta hacia uno u otro',
            headers: ['', 'Bronquitis aguda', 'Neumonía'],
            filas: [
              ['Dónde asienta', 'Mucosa bronquial', 'Parénquima pulmonar, con ocupación alveolar'],
              ['Síntoma dominante', 'Tos', 'Tos con afectación del estado general'],
              ['Estado general', 'Habitualmente conservado', 'Con frecuencia comprometido'],
              ['Auscultación', 'Puede ser normal o con roncus difusos', 'Puede haber crepitantes o disminución localizada del murmullo'],
              ['Repercusión respiratoria', 'Escasa por sí sola', 'Puede llegar a insuficiencia respiratoria'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Esta distinción no se cierra en la calle', texto: 'Los hallazgos anteriores orientan, pero la confirmación de una neumonía exige estudios de imagen y valoración que no viajan en la ambulancia. En el ámbito prehospitalario no se decide si el paciente «tiene neumonía o bronquitis»: se decide cuán grave está y adónde va. Etiquetar de bronquitis a un paciente grave para tranquilizarse es un error con consecuencias.' },
        ],
      },
      {
        titulo: 'Reconocer al paciente grave',
        bloques: [
          { tipo: 'p', texto: 'La pregunta útil en la calle no es cuál de los dos cuadros es, sino si este paciente está lo bastante grave como para que el tiempo importe. La respuesta se construye con la exploración y con el estado general, no con el nombre de la enfermedad.' },
          {
            tipo: 'lista',
            titulo: 'Signos de gravedad',
            items: [
              'Alteración del estado de alerta, confusión o desorientación de aparición reciente.',
              'Trabajo respiratorio aumentado, incapacidad para completar frases o taquipnea marcada.',
              'Signos de hipoperfusión: piel fría, moteada, relleno capilar lento.',
              'Hipotensión o tendencia descendente de la presión arterial durante la atención.',
              'Temperatura muy elevada o, al contrario, hipotermia, que en un cuadro infeccioso es un dato de alarma.',
              'Incapacidad para mantener la ingesta o para mantenerse en pie.',
              'Fragilidad previa: edad avanzada, enfermedad pulmonar crónica, inmunosupresión o vivir solo sin quien vigile.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La confusión de aparición reciente', texto: 'En un paciente con un cuadro infeccioso respiratorio, y especialmente en el adulto mayor, la confusión de aparición reciente es un signo de gravedad y no un rasgo de la edad. Atribuirla a la edad y no al cuadro retrasa la identificación de un paciente grave.' },
          { tipo: 'p', texto: 'Cuando a un foco infeccioso se añaden signos de disfunción de órganos —alteración del sensorio, compromiso respiratorio o hipoperfusión—, la sospecha pasa a ser de sepsis, y con ella cambia la prioridad: el traslado se vuelve tiempo-dependiente y la prealerta deja de ser opcional. Qué criterios de identificación y qué paquete de medidas aplica el servicio lo declara su protocolo.' },
        ],
      },
      {
        titulo: 'Conducta prehospitalaria',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Qué se hace',
            items: [
              'Protección personal conforme al protocolo del servicio: se trata de cuadros potencialmente transmisibles.',
              'Posición en que el paciente respira mejor.',
              'Oxigenoterapia según el protocolo, titulada a la respuesta.',
              'Valoración y vigilancia de la perfusión y del estado de alerta, no solo de la respiración.',
              'Recogida de antecedentes, tratamiento habitual, tiempo de evolución y situación funcional previa.',
              'Traslado con prealerta cuando haya signos de gravedad o sospecha de sepsis.',
              'Reevaluación continua y registro con hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El antibiótico no se decide aquí', texto: 'La elección de un antimicrobiano depende de la confirmación del cuadro, de la gravedad, del sitio donde se atenderá al paciente, de sus alergias, de su función renal y de patrones locales de resistencia. Es una decisión de la guía de la entidad y del médico responsable, no del ámbito prehospitalario, y esta lección no propone ninguno. Iniciar un antibiótico en la calle sin ese marco no adelanta el tratamiento: dificulta el estudio posterior.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Qué decide el destino', texto: 'A dónde se traslada a un paciente con un cuadro infeccioso respiratorio depende de su gravedad, de su fragilidad previa y de la capacidad resolutiva disponible, con los criterios que fijen la guía de la entidad y el protocolo del servicio. Esta lección no asigna destinos ni reproduce escalas de decisión.' },
        ],
      },
      F([ATS_IDSA_CAP_2019, WHO_BEC, WHO_PREHOSPITAL_2026, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Bronquitis aguda', definicion: 'Inflamación de la mucosa bronquial en la que domina la tos y el estado general suele conservarse.' },
      { termino: 'Neumonía', definicion: 'Infección del parénquima pulmonar con ocupación alveolar, que añade un componente respiratorio al cuadro infeccioso.' },
      { termino: 'Sospecha de sepsis', definicion: 'Foco infeccioso acompañado de signos de disfunción de órganos: alteración del sensorio, compromiso respiratorio o hipoperfusión. Cambia la prioridad del traslado.' },
      { termino: 'Confusión de aparición reciente', definicion: 'Signo de gravedad en un cuadro infeccioso respiratorio, especialmente en el adulto mayor; no es un rasgo atribuible a la edad.' },
      { termino: 'Fragilidad previa', definicion: 'Conjunto de condiciones —edad avanzada, enfermedad crónica, inmunosupresión, aislamiento— que agravan el pronóstico del mismo cuadro.' },
    ],
    flashcards: [
      { frente: 'Neumonía frente a bronquitis aguda', reverso: 'La bronquitis asienta en la mucosa bronquial y domina la tos; la neumonía es una infección del parénquima con ocupación alveolar y añade componente respiratorio.' },
      { frente: '¿Se decide en la calle cuál de los dos cuadros es?', reverso: 'No: la confirmación exige estudios que no viajan en la ambulancia. Lo que se decide es cuán grave está el paciente y adónde va.' },
      { frente: '¿Qué significa la confusión de aparición reciente en un adulto mayor con fiebre?', reverso: 'Es un signo de gravedad del cuadro, no un rasgo de la edad. Atribuirla a la edad retrasa identificar a un paciente grave.' },
      { frente: '¿Cuándo la sospecha pasa a ser de sepsis?', reverso: 'Cuando a un foco infeccioso se añaden signos de disfunción de órganos: sensorio alterado, compromiso respiratorio o hipoperfusión.' },
      { frente: '¿Por qué no se inicia un antibiótico en la ambulancia?', reverso: 'Porque su elección depende de confirmación, gravedad, alergias, función renal, sitio de atención y resistencias locales; hacerlo sin ese marco dificulta el estudio posterior.' },
      { frente: '¿Qué dato de temperatura es de alarma además de la fiebre alta?', reverso: 'La hipotermia: en un cuadro infeccioso es un signo de gravedad.' },
    ],
    quiz: [
      {
        pregunta: 'Adulto mayor con tos y fiebre desde hace tres días que hoy está confuso. Su familia lo atribuye a la edad. ¿Cómo lo valoras?',
        opciones: [
          'Como un rasgo esperable de la edad, sin repercusión en la prioridad.',
          'Como un signo de gravedad del cuadro infeccioso, que además abre la sospecha de sepsis si se acompaña de compromiso respiratorio o hipoperfusión.',
          'Como un dato que solo importa si hay antecedente neurológico.',
          'Como indicación de iniciar antibiótico en la escena.',
        ],
        correcta: 1,
        explicacion: 'La confusión de aparición reciente es un signo de gravedad, no un rasgo de la edad. Con signos de disfunción de órganos la sospecha pasa a ser de sepsis y el traslado se vuelve tiempo-dependiente.',
      },
      {
        pregunta: 'No puedes determinar si el paciente tiene neumonía o bronquitis aguda. ¿Qué decides en la calle?',
        opciones: [
          'La etiqueta más probable, para orientar al hospital.',
          'Cuán grave está el paciente y adónde va; la confirmación exige estudios que no viajan en la ambulancia.',
          'Esperar la evolución en el domicilio antes de trasladar.',
          'Registrar el caso como cuadro respiratorio inespecífico y omitir la valoración de gravedad.',
        ],
        correcta: 1,
        explicacion: 'En el ámbito prehospitalario no se decide la entidad sino la gravedad y el destino. Etiquetar de bronquitis a un paciente grave es un error con consecuencias.',
      },
      {
        pregunta: 'Un compañero propone administrar un antibiótico en la escena para «ganar tiempo». ¿Qué respondes?',
        opciones: [
          'Que es correcto si el cuadro es claramente neumónico.',
          'Que la elección depende de confirmación, gravedad, alergias, función renal, sitio de atención y resistencias locales, y que hacerlo sin ese marco dificulta el estudio posterior.',
          'Que solo procede si hay fiebre elevada.',
          'Que puede hacerse si el paciente ya tomaba antibiótico en casa.',
        ],
        correcta: 1,
        explicacion: 'El tratamiento antimicrobiano es una decisión de la guía de la entidad y del médico responsable, no del ámbito prehospitalario.',
      },
      {
        pregunta: 'Además de la fiebre alta, ¿qué dato térmico debe alarmarte en un cuadro infeccioso respiratorio?',
        opciones: [
          'La temperatura normal.',
          'La hipotermia, que en un cuadro infeccioso figura entre los signos de gravedad.',
          'La diferencia entre temperatura axilar y timpánica.',
          'La ausencia de sudoración.',
        ],
        correcta: 1,
        explicacion: 'Entre los signos de gravedad figura la temperatura muy elevada o, al contrario, la hipotermia, que en un cuadro infeccioso es un dato de alarma.',
      },
    ],
    actividades: null,
    revision: ficha({
      version: 'ATS/IDSA 2019 CAP en adultos (sección pendiente); OMS/CICR Basic Emergency Care 2018',
      fuentes: [
        'ATS/IDSA Clinical Practice Guideline: Community-acquired Pneumonia in Adults, 2019 (sección pendiente).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: faltan los criterios de gravedad y de sitio de '
          + 'atención de la guía ATS/IDSA 2019, con su sección. La lección no reproduce ninguna escala.',
        'La guía asignada cubre la neumonía adquirida en la comunidad del ADULTO. La neumonía '
          + 'pediátrica y la asociada a cuidados sanitarios quedan fuera y no se deducen de aquí.',
        'No se propone ningún antimicrobiano ni se sitúa su inicio en el ámbito prehospitalario.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué criterios de identificación de sepsis y qué paquete de '
          + 'medidas iniciales declara su protocolo, y qué destino asigna según gravedad?',
      ],
    }),
  },

  // ============================================================
  //  Asma
  // ============================================================
  'm4-resp-asma': {
    icono: 'cp-servier-bronquio-inflamado',
    duracion: '20 min',
    resumen: 'Qué es una crisis asmática, qué signos la identifican como potencialmente mortal y qué '
      + 'sostiene el prestador mientras traslada.',
    objetivos: [
      'Describir la limitación variable del flujo aéreo que caracteriza al asma.',
      'Reconocer los signos de crisis grave y de crisis potencialmente mortal.',
      'Ordenar las prioridades prehospitalarias de la crisis asmática.',
      'Delimitar qué exige el tratamiento farmacológico antes de administrarse.',
    ],
    secciones: [
      {
        titulo: 'La enfermedad y la crisis',
        bloques: [
          { tipo: 'p', texto: 'El asma es una enfermedad respiratoria crónica caracterizada por inflamación de la vía aérea y por una limitación del flujo aéreo que es VARIABLE: empeora y mejora, espontáneamente o con tratamiento. Esa variabilidad es lo que la distingue de otras obstrucciones y lo que explica que un mismo paciente pueda estar asintomático un día y en riesgo vital al siguiente.' },
          { tipo: 'p', texto: 'Una crisis o exacerbación es un empeoramiento agudo de los síntomas y de la limitación del flujo aéreo respecto del estado habitual del paciente. Suele haber un desencadenante identificable —una infección respiratoria, un alérgeno, ejercicio, aire frío, humo, un fármaco— y con frecuencia el paciente ya intentó tratarse antes de llamar.' },
          {
            tipo: 'lista',
            titulo: 'Antecedentes que anuncian una crisis peligrosa',
            items: [
              'Ingreso previo en cuidados intensivos o necesidad previa de soporte ventilatorio por asma.',
              'Visitas recientes a urgencias o ingresos en el último año.',
              'Uso creciente del inhalador de rescate en los días previos.',
              'Mal cumplimiento del tratamiento de control o ausencia de seguimiento.',
              'Crisis de instauración muy rápida en episodios anteriores.',
              'Antecedente de alergia alimentaria, que se ha asociado a crisis graves.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La historia previa forma parte de la valoración', texto: 'Preguntar si alguna vez estuvo intubado o ingresado en cuidados intensivos por asma cambia el nivel de alerta desde el primer minuto. Es una pregunta breve, el paciente o su familia suelen responderla con precisión, y separa a los pacientes que toleran una crisis de los que no.' },
        ],
      },
      {
        titulo: 'Reconocer la gravedad',
        bloques: [
          { tipo: 'p', texto: 'La gravedad de una crisis se juzga por el trabajo respiratorio, por el estado de alerta y por la capacidad de hablar, no por la intensidad de las sibilancias. Esta última es la trampa clásica del cuadro.' },
          {
            tipo: 'tabla',
            titulo: 'Qué observar y hacia dónde apunta',
            headers: ['Qué se observa', 'Crisis que responde', 'Crisis grave o que empeora'],
            filas: [
              ['Habla', 'Frases completas', 'Palabras sueltas o incapacidad para hablar'],
              ['Postura', 'Puede permanecer acostado', 'Se sienta inclinado hacia adelante y no tolera el decúbito'],
              ['Estado de alerta', 'Conservado', 'Agitación, y después somnolencia o confusión'],
              ['Músculos accesorios', 'Uso escaso', 'Uso intenso, con tiraje'],
              ['Auscultación', 'Sibilancias audibles', 'Sibilancias que disminuyen o tórax silencioso'],
              ['Respuesta al inhalador propio', 'Mejora', 'No mejora o mejora poco y por poco tiempo'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El tórax silencioso', texto: 'Que las sibilancias disminuyan o desaparezcan en un paciente que empeora NO indica mejoría: indica que apenas se moviliza aire. Un tórax silencioso, junto con la incapacidad para hablar, la somnolencia o la disminución del esfuerzo respiratorio, describe una crisis potencialmente mortal. Es el hallazgo que más se malinterpreta de toda la unidad.' },
          {
            tipo: 'lista',
            titulo: 'Signos que definen una crisis potencialmente mortal',
            items: [
              'Tórax silencioso.',
              'Incapacidad para hablar.',
              'Alteración del estado de alerta: agitación, confusión o somnolencia.',
              'Disminución del esfuerzo respiratorio sin mejoría clínica.',
              'Signos de compromiso circulatorio.',
              'Agotamiento evidente del paciente.',
            ],
          },
        ],
      },
      {
        titulo: 'Conducta prehospitalaria',
        bloques: [
          BLOQUE_CIFRAS,
          {
            tipo: 'pasos',
            titulo: 'Prioridades',
            items: [
              'Retirar al paciente del desencadenante cuando sea identificable y sea posible hacerlo con seguridad.',
              'Permitir la posición en que respira mejor; no forzar el decúbito.',
              'Oxigenoterapia según el protocolo del servicio, titulada a la respuesta.',
              'Broncodilatador inhalado cuando el protocolo lo indique, con el producto, el dispositivo y la técnica autorizados; comprobar la técnica del propio paciente si está usando su inhalador.',
              'Reevaluación tras cada intervención, con atención especial al habla, al estado de alerta y al esfuerzo respiratorio.',
              'Soporte ventilatorio si la ventilación se vuelve insuficiente, conforme al alcance y al equipo autorizados.',
              'Traslado con prealerta ante cualquier signo de crisis potencialmente mortal.',
              'Registro con hora de los hallazgos, de lo administrado y de la respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Sobre el broncodilatador', texto: 'La NOM-034 incluye salbutamol en aerosol en la dotación mínima de la ambulancia de urgencias básicas, numeral B.4.4.1. Que exista a bordo no dice a quién administrarlo, cuánto, con qué dispositivo ni cada cuánto: la indicación procede de la guía vigente del asma, la presentación y las contraindicaciones de la Información para Prescribir del producto registrado, y la autorización del protocolo del servicio y su dirección médica. Esta lección no publica ninguno de esos datos.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que no se hace', texto: 'No se seda a un paciente con una crisis asmática para calmar su agitación: la agitación es un signo de hipoxia y de gravedad, y suprimirla puede precipitar el fallo respiratorio. Corticoides sistémicos, sulfato de magnesio y ventilación no invasiva forman parte del manejo donde estén indicados y autorizados; en el ámbito prehospitalario dependen de equipo, competencia y protocolo, y esta lección no los describe.' },
        ],
      },
      F([GINA_2026, WHO_BEC, WHO_PREHOSPITAL_2026, bibiano(48, 'Crisis asmática', 432), NOM_034_DOTACION, COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'Asma', definicion: 'Enfermedad respiratoria crónica con inflamación de la vía aérea y limitación VARIABLE del flujo aéreo, que empeora y mejora espontáneamente o con tratamiento.' },
      { termino: 'Crisis o exacerbación asmática', definicion: 'Empeoramiento agudo de los síntomas y de la limitación del flujo aéreo respecto del estado habitual del paciente, con frecuencia con un desencadenante identificable.' },
      { termino: 'Tórax silencioso', definicion: 'Disminución o desaparición de las sibilancias en un paciente que empeora; indica que apenas se moviliza aire y define una crisis potencialmente mortal.' },
      { termino: 'Crisis potencialmente mortal', definicion: 'La que cursa con tórax silencioso, incapacidad para hablar, alteración del estado de alerta, disminución del esfuerzo sin mejoría, compromiso circulatorio o agotamiento.' },
      { termino: 'Antecedente de riesgo vital', definicion: 'Ingreso previo en cuidados intensivos o necesidad previa de soporte ventilatorio por asma; eleva el nivel de alerta desde el primer minuto.' },
    ],
    flashcards: [
      { frente: '¿Qué caracteriza la limitación del flujo aéreo en el asma?', reverso: 'Que es VARIABLE: empeora y mejora, espontáneamente o con tratamiento.' },
      { frente: '¿Por qué se pregunta si el paciente estuvo intubado alguna vez por asma?', reverso: 'Porque el antecedente de riesgo vital previo cambia el nivel de alerta desde el primer minuto y separa a los pacientes que toleran una crisis de los que no.' },
      { frente: '¿Qué indica que las sibilancias disminuyan en un paciente que empeora?', reverso: 'Que apenas se moviliza aire: es un tórax silencioso y describe una crisis potencialmente mortal, no una mejoría.' },
      { frente: '¿Cómo se juzga la gravedad de una crisis?', reverso: 'Por el trabajo respiratorio, el estado de alerta y la capacidad de hablar; no por la intensidad de las sibilancias.' },
      { frente: '¿Se seda a un paciente asmático agitado?', reverso: 'No: la agitación es un signo de hipoxia y de gravedad, y suprimirla puede precipitar el fallo respiratorio.' },
      { frente: '¿Qué hace falta antes de administrar un broncodilatador?', reverso: 'Indicación de la guía vigente del asma, datos de la Información para Prescribir del producto, dispositivo, competencia y autorización del protocolo. La dotación de la NOM-034 no basta.' },
    ],
    quiz: [
      {
        pregunta: 'Durante el traslado, las sibilancias de un paciente asmático disminuyen mientras aumenta su somnolencia. ¿Qué está ocurriendo?',
        opciones: [
          'La crisis está cediendo y puede espaciarse la vigilancia.',
          'Es un tórax silencioso: apenas se moviliza aire, y junto con la somnolencia describe una crisis potencialmente mortal.',
          'El broncodilatador está haciendo efecto.',
          'Se ha resuelto el componente inflamatorio.',
        ],
        correcta: 1,
        explicacion: 'Que las sibilancias disminuyan en un paciente que empeora no indica mejoría sino escasa movilización de aire. Con alteración del estado de alerta, la crisis es potencialmente mortal.',
      },
      {
        pregunta: 'Un paciente con crisis asmática está muy agitado. Un compañero propone sedarlo. ¿Qué respondes?',
        opciones: [
          'Que es adecuado para reducir el consumo de oxígeno.',
          'Que no: la agitación es un signo de hipoxia y de gravedad, y suprimirla puede precipitar el fallo respiratorio.',
          'Que puede hacerse si el paciente ya usó su inhalador.',
          'Que depende de la intensidad de las sibilancias.',
        ],
        correcta: 1,
        explicacion: 'La agitación figura entre los signos que anuncian gravedad; sedar al paciente elimina el signo sin resolver la causa y puede precipitar el fallo respiratorio.',
      },
      {
        pregunta: '¿Qué antecedente eleva más el nivel de alerta ante una crisis asmática?',
        opciones: [
          'Haber tenido asma desde la infancia.',
          'Un ingreso previo en cuidados intensivos o la necesidad previa de soporte ventilatorio por asma.',
          'Tener sibilancias audibles a distancia.',
          'Haber usado el inhalador esta mañana.',
        ],
        correcta: 1,
        explicacion: 'Entre los antecedentes que anuncian una crisis peligrosa, el riesgo vital previo es el que más separa a los pacientes que toleran una crisis de los que no.',
      },
      {
        pregunta: 'Llevas salbutamol a bordo porque la NOM-034 lo exige en el numeral B.4.4.1. ¿Qué necesitas además para administrarlo?',
        opciones: [
          'Nada más: la dotación normativa lo autoriza.',
          'Indicación de la guía vigente del asma, datos de la Información para Prescribir del producto, dispositivo, competencia y autorización del protocolo con dirección médica.',
          'Únicamente el consentimiento del paciente.',
          'Únicamente comprobar que el paciente ya lo usa en casa.',
        ],
        correcta: 1,
        explicacion: 'Que un fármaco exista a bordo responde a qué debe haber en la unidad. Administrarlo exige indicación, IPP, equipo, competencia y protocolo.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la valoración de gravedad de una crisis asmática',
        pasos: [
          'Observar la postura y si tolera el decúbito',
          'Comprobar cuántas palabras seguidas puede decir',
          'Valorar el estado de alerta',
          'Buscar uso de músculos accesorios y tiraje',
          'Auscultar y comparar ambos hemitórax',
          'Preguntar por antecedente de ingreso en cuidados intensivos por asma',
        ],
      },
    },
    revision: ficha({
      version: 'GINA 2026 (capítulo pendiente); OMS/CICR Basic Emergency Care 2018; NOM-034-SSA3-2013; IPP COFEPRIS',
      fuentes: [
        'GINA 2026 Global Strategy for Asthma Management and Prevention (capítulo pendiente).',
        'WHO/ICRC. Basic Emergency Care, 2018.',
        'WHO. Prehospital emergency care: pocket reference, 2026 (sección pendiente).',
        'NOM-034-SSA3-2013, DOF, numeral B.4.4.1 (dotación).',
        'COFEPRIS. Información para Prescribir (consultada 2026-08-16).',
        'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
      ],
      extra: [
        'BORRADOR por deuda bibliográfica declarada: faltan el capítulo y la tabla exactos de GINA 2026 '
          + 'sobre valoración de gravedad de la exacerbación y tratamiento inicial. El informe requiere '
          + 'descarga registrada y no se consultó al redactar.',
        'No se publica objetivo de saturación, número de disparos, dosis ni pauta de nebulización. La '
          + 'lección enseña reconocimiento de gravedad y prioridades, que es lo sustentable sin la '
          + 'tabla de la guía.',
        'Corticoides sistémicos, sulfato de magnesio y ventilación no invasiva se declaran '
          + 'condicionados a equipo, competencia y protocolo, y no se describen.',
        'PREGUNTA PARA LA ACADEMIA: ¿qué broncodilatador, presentación y dispositivo surte su servicio, '
          + 'y qué pauta autoriza su dirección médica para la crisis asmática?',
        'El único dato normativo mexicano que se afirma —salbutamol en aerosol en el numeral B.4.4.1— '
          + 'se verificó el 16 de agosto de 2026 contra el texto del DOF.',
      ],
    }),
  },
}
