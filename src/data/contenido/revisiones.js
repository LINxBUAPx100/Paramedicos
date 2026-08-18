// ============================================================
//  Fichas EDITORIALES de los temas redactados antes de la remediación
// ------------------------------------------------------------
//  Los 50 temas que ya estaban escritos a mano son, de lejos, el mejor
//  material del proyecto: se redactaron tema a tema y no salen de ninguna
//  redistribución automática. Pero «escrito a mano» tampoco es «validado»:
//  la auditoría encontró que 33 de sus 38 referencias apuntan a la MISMA
//  portada de PHTLS, sin capítulo ni página, y que varias afirmaciones
//  necesitan comprobarse contra la edición vigente.
//
//  Así que nacen en `borrador`, con la observación concreta que hay que
//  resolver antes de que un docente pueda firmarlos. Los temas que ya se
//  reescribieron en esta remediación, con cita específica, pasan a
//  `en_revision`: redactados y trazables, esperando validación docente.
//
//  Los archivos de contenido nuevos declaran su ficha INLINE, junto al tema.
//  Este archivo cubre lo anterior, que era demasiado voluminoso para tocarlo
//  entrada por entrada sin arriesgar el material.
// ============================================================

const HOY = '2026-08-16'

// Motivo repetido: referencia bibliográfica sin documento identificable.
const FUENTE_GENERICA = 'Las referencias apuntan a la portada de PHTLS sin capítulo, '
  + 'edición ni página. Deben sustituirse por citas específicas antes de validar.'

const REVISAR_ABSOLUTOS = 'Revisar expresiones absolutas y alcance profesional: qué queda '
  + 'dentro del nivel del alumno y qué depende del protocolo del servicio.'

function borrador(observaciones, extra = {}) {
  return {
    estado: 'borrador',
    procedencia: 'redactado',
    actualizado: HOY,
    observaciones,
    ...extra,
  }
}

// ---------- Módulo 1: auditoría de los 14 borradores (2026-08-16) ----------
//
// Los catorce temas redactados a mano del Módulo 1 se auditaron uno a uno
// contra la asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json. No se
// reescribieron: se les añadió el bloque de fuentes que les faltaba y se
// corrigió únicamente lo que la auditoría encontró. Con fuentes trazables y
// sin hallazgos abiertos pasan de `borrador` a `en_revision`.
//
// Deuda que TODOS conservan: PHTLS 9 se cita por edición, sin capítulo ni
// página, porque solo puede precisarlas quien consulte la copia licenciada de
// la academia.
//
// ACTUALIZADO 2026-08-17: Tortora 15.ª ed. sale de esta nota. No es una deuda de
// página pendiente de consultar, sino una obra que la biblioteca de la academia
// NO contiene (`docs/BIBLIOTECA-DRIVE-PTEM.md`). Tratarla como «pendiente de
// precisar» sugería que la copia existía. Donde se usaba se sustituyó por AAOS,
// que sí se abrió y se cita con capítulo y página verificados.

const DEUDA_PAGINA = 'PHTLS 9.ª ed. se cita por edición. Capítulo y página quedan PENDIENTES: solo '
  + 'puede precisarlos quien consulte la copia licenciada de la academia. No se simula haberlas '
  + 'consultado.'

const AUDITADO = 'Auditado en la revisión del Módulo 1 (16 de agosto de 2026): se añadieron las '
  + 'fuentes asignadas por el registro académico y se corrigió únicamente lo encontrado.'

function enRevisionM1(fuentes, observaciones = [], versionClinica) {
  return {
    estado: 'en_revision',
    procedencia: 'redactado',
    actualizado: HOY,
    versionClinica,
    observaciones: [AUDITADO, ...observaciones, DEUDA_PAGINA],
    fuentes,
  }
}

const FUENTES_PA = [
  '2024 AHA and American Red Cross Guidelines for First Aid. Circulation, 2024. DOI 10.1161/CIR.0000000000001281.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
]
const FUENTES_SV = [
  'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  '2024 AHA and American Red Cross Guidelines for First Aid. Circulation, 2024.',
]
const FUENTES_TR = [
  '2024 AHA and American Red Cross Guidelines for First Aid. Circulation, 2024.',
  'NAEMT. PHTLS, 9.ª ed. (edición declarada por el plan).',
]

const M1_AUDITADOS = {
  'm1-pab-introduccion': enRevisionM1(
    ['WHO/ICRC. Basic Emergency Care, 2018.', 'NOM-034-SSA3-2013, DOF.', ...FUENTES_PA.slice(0, 1)],
    ['Sin hallazgos clínicos. Se declara la asignación de fuentes de la unidad.'],
    'AHA/Cruz Roja 2024; OMS BEC 2018; NOM-034-SSA3-2013',
  ),
  'm1-pab-avdi': enRevisionM1(FUENTES_SV,
    ['Sin hallazgos clínicos.'], 'AHA 2025 (BLS de adulto)'),
  'm1-pab-rcp-legos-adulto': enRevisionM1(FUENTES_SV,
    ['Parámetros de compresión cotejados con AHA 2025; la auditoría anterior ya los daba por '
      + 'alineados y no se modificaron.'], 'AHA 2025 (BLS de adulto)'),
  'm1-pab-dea': enRevisionM1(FUENTES_SV,
    ['CORREGIDO: se retiraron dos absolutos («lo único que sirve», «lo único que sostiene la '
      + 'perfusión») que la primera auditoría había pedido eliminar y que seguían en la lección '
      + 'porque la prueba de regresión comparaba con acentos contra texto normalizado sin ellos. '
      + 'La prueba también se corrigió.'], 'AHA 2025 (BLS de adulto)'),
  'm1-pab-hemorragias': enRevisionM1(FUENTES_TR,
    ['CORREGIDO: se eliminó el umbral de «3 minutos de presión directa» antes del torniquete, que '
      + 'ninguna fuente sostiene. La guía AHA/Cruz Roja 2024 indica presión directa seguida de '
      + 'torniquete o empaquetamiento cuando la localización lo permite, sin fijar un tiempo.',
      'CORREGIDO: la colocación del torniquete deja de expresarse como «5–7 cm» y pasa a criterio '
      + 'anatómico, remitiendo a las instrucciones del dispositivo de cada servicio.'],
    'AHA/Cruz Roja 2024 (primeros auxilios)'),
  'm1-pab-fracturas': enRevisionM1(FUENTES_TR, ['Sin hallazgos clínicos.'],
    'AHA/Cruz Roja 2024; PHTLS 9.ª ed.'),
  'm1-pab-quemaduras': enRevisionM1(FUENTES_PA,
    ['La regla de los nueves y la regla de la palma se conservan como métodos de estimación; no se '
      + 'presentan como cálculo de reposición de líquidos, que corresponde al Módulo 5.'],
    'AHA/Cruz Roja 2024 (primeros auxilios)'),
  'm1-pab-botiquin': enRevisionM1(FUENTES_PA, ['Sin hallazgos clínicos.'],
    'AHA/Cruz Roja 2024 (primeros auxilios)'),
  'm1-pai-rcp-pediatrico': enRevisionM1(
    ['AHA/AAP. Part 6: Pediatric Basic Life Support. 2025 Guidelines. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.',
      'WHO/ICRC. Basic Emergency Care, 2018.'],
    ['CORREGIDO: la tabla enseñaba la técnica de DOS DEDOS en el lactante. La guía pediátrica de '
      + '2025 la retiró por no alcanzar de forma fiable la profundidad necesaria; se sustituyó por '
      + 'dos pulgares rodeando el tórax o el talón de una mano, y se añadió el aviso del cambio.',
      'La fuente pasa de la guía de adulto a la pediátrica primaria.'],
    'AHA/AAP 2025, Part 6: Pediatric Basic Life Support'),
  'm1-pai-ferulas-vendajes': enRevisionM1(FUENTES_TR, ['Sin hallazgos clínicos.'],
    'PHTLS 9.ª ed.; AHA/Cruz Roja 2024'),
  'm1-pai-evaluacion-xabcde': enRevisionM1(
    ['NAEMT. PHTLS, 9.ª ed.', 'WHO/ICRC. Basic Emergency Care, 2018.',
      '2024 AHA and American Red Cross Guidelines for First Aid. Circulation, 2024.'],
    ['Sin hallazgos clínicos. La distinción primaria/secundaria coincide con la del Módulo 3.'],
    'PHTLS 9.ª ed.; OMS BEC 2018'),
  'm1-pai-intoxicaciones': enRevisionM1(
    ['2024 AHA and American Red Cross Guidelines for First Aid. Circulation, 2024.',
      'Secretaría de Salud. Manual de Procedimientos Estandarizados para la Vigilancia '
      + 'Epidemiológica de las Intoxicaciones por Animales Ponzoñosos, 2024.'],
    ['CORREGIDO: la lección citaba como fuente de la graduación la página comercial de un '
      + 'fabricante de antivenenos. El registro académico prohíbe usar páginas comerciales como '
      + 'autoridad clínica; la referencia se retiró.',
      'CORREGIDO: se eliminaron las afirmaciones dependientes de producto —tiempo de remisión tras '
      + 'el antiveneno y graduación del ofidismo por centímetros de edema— y se sustituyeron por el '
      + 'reconocimiento clínico y la conducta de soporte y traslado.',
      'DECISIÓN PENDIENTE: la academia debe declarar qué protocolo de antivenenos y qué escala de '
      + 'graduación adopta, y el centro toxicológico de referencia de su entidad. El manual de la '
      + 'Secretaría de Salud es epidemiológico y no sustituye ese protocolo.'],
    'AHA/Cruz Roja 2024; SSA 2024 (vigilancia epidemiológica)'),
  'm1-smu-bienestar-tum': enRevisionM1(
    ['WHO. Prehospital emergency care: operational guidance for ambulance systems, 2025.',
      'NOM-034-SSA3-2013, DOF.'],
    ['Sin hallazgos clínicos. La conducta ante exposición ocupacional se mantiene remitida al '
      + 'procedimiento del servicio.'],
    'OMS 2025 (guía operativa); NOM-034-SSA3-2013'),
  'm1-smu-terminologia': enRevisionM1(
    ['AAOS (Elling, Elling y Rothenberg). Anatomía y fisiología prehospitalaria, cap. 1, p. 19.'],
    ['CORRECCIÓN 2026-08-17: la traza citaba Tortora 15.ª ed. como fuente de la terminología. El '
      + 'plan la declara en su bibliografía, pero la biblioteca de la academia NO la contiene, de '
      + 'modo que la cita nunca pudo comprobarse. Se sustituyó por el capítulo 1 de AAOS, '
      + '«Definiciones anatómicas», p. 19, abierto y verificado, que cubre posición anatómica, '
      + 'planos, cuadrantes y términos de movimiento.',
      'La deuda de capítulo desaparece: la nueva fuente se cita con capítulo y página impresa.'],
    'AAOS Anatomía y fisiología prehospitalaria, cap. 1 (verificado 2026-08-17)'),
}

// Temas del Módulo 5 redactados a mano, con bloque de fuentes genérico.
const M5_FUENTE_GENERICA = [
  'm5-hs-definicion', 'm5-hs-hipovolemico', 'm5-hs-cardiogenico', 'm5-hs-neurogenico',
  'm5-hs-anafilactico', 'm5-hs-septico', 'm5-hs-signos-tratamiento',
  'm5-tt-definicion', 'm5-tt-clavicula', 'm5-tt-escapula', 'm5-tt-esofago',
  'm5-tt-neumotorax-tension', 'm5-tt-hemoneumotorax', 'm5-tt-quilotorax',
  'm5-tt-contusion-pulmonar', 'm5-tt-asfixia-traumatica', 'm5-tt-ruptura-diafragmatica',
  'm5-ta-definicion', 'm5-ta-cuadrantes', 'm5-ta-bazo', 'm5-ta-higado', 'm5-ta-estomago',
  'm5-ta-pancreas', 'm5-ta-intestino', 'm5-ta-genitourinaria',
  'm5-tcc-lesiones-difusas', 'm5-tcc-signos-sintomas', 'm5-tcc-tratamiento',
  'm5-tcc-medular-posterior', 'm5-tcc-brown-sequard', 'm5-tcc-exploracion-fisica',
  'm5-tcc-signos-tratamiento-columna', 'm5-tcc-inmovilizacion-espinal',
]

const REVISIONES_DECLARADAS = { ...M1_AUDITADOS }

// ---------- Módulo 5: auditoría de los 33 borradores (2026-08-16) ----------
//
// Se auditaron los 33 uno a uno antes de redactar ninguna lección nueva de
// trauma, porque ya son material VISIBLE para el alumno. Comprobaciones
// realizadas: correspondencia con el título oficial, precisión de las fuentes,
// separación entre tratamiento prehospitalario y hospitalario, alcance de los
// procedimientos invasivos, cifras y escalas, coherencia entre lección,
// tarjetas y quiz, y ausencia de mezclas del corpus heredado.
//
// RESULTADO GLOBAL: el contenido es correcto y está bien delimitado al ámbito
// prehospitalario —dice expresamente qué se resuelve en quirófano, remite al
// protocolo y no arrastra piezas del temario anterior—. Los 33 comparten UN
// defecto sistemático: su única referencia era la portada de PHTLS en NAEMT,
// sin edición, capítulo ni página. Esa cita se sustituyó por PHTLS 9.ª ed. con
// la deuda de página declarada, y en la unidad de hemorragia y shock se añadió
// la guía de primeros auxilios AHA/Cruz Roja 2024, que sí está verificada.
//
// DECISIÓN SOBRE EL ESTADO: los 33 SIGUEN EN `borrador`. La regla del
// expediente de fuentes es explícita —«no eleves el tema por encima de
// borrador si la deuda afecta una afirmación clínica central»— y aquí la
// afecta: la página de PHTLS respalda cifras, escalas y conductas de estas
// lecciones. Promoverlos ahora sería declarar consultada una fuente que no se
// ha abierto.

const AUDITADO_M5 = 'Auditado en la revisión del Módulo 5 (16 de agosto de 2026): título, ámbito '
  + 'prehospitalario, alcance de procedimientos, cifras y coherencia interna comprobados.'
const DEUDA_PHTLS = 'PERMANECE EN BORRADOR por deuda de fuente: PHTLS 9.ª ed. se cita por edición, '
  + 'sin capítulo ni página, y esa referencia respalda afirmaciones clínicas centrales. Solo puede '
  + 'precisarla quien consulte la copia licenciada de la academia.'
const DEUDA_COMPLEMENTARIA = 'Pendiente de incorporar, por quien tenga acceso: guías de mejores '
  + 'prácticas del American College of Surgeons y, donde corresponda, Brain Trauma Foundation '
  + '(cráneo) y American Burn Association (quemaduras). No se citan todavía porque no se han '
  + 'consultado y el expediente prohíbe presentarlas como leídas.'

// Decisión editorial por tema. Sin observación específica ⇒ CONSERVAR: el
// contenido resiste la auditoría y solo arrastra la deuda de página común.
const M5_DECISIONES = {
  'm5-hs-cardiogenico': 'CORREGIR/pendiente: la descompresión torácica se menciona «según protocolo '
    + 'y nivel de atención»; debe añadir además el alcance del prestador, como ya se hizo en '
    + 'm5-tt-neumotorax-tension.',
  'm5-tt-neumotorax-tension': 'CORREGIDO: la descompresión con aguja ya remitía al protocolo y al '
    + 'nivel de atención; se añadió que estudiarla no autoriza a realizarla y que depende de la '
    + 'certificación del prestador, del equipamiento y de la dirección médica.',
  'm5-ta-genitourinaria': 'CONSERVAR: la contraindicación del sondaje ante sospecha de lesión '
    + 'uretral está correctamente enunciada y justificada.',
  'm5-tcc-signos-sintomas': 'CONSERVAR: la tendencia del Glasgow se enseña como dato que informa '
    + 'más que una cifra aislada, que es el criterio correcto.',
  'm5-tcc-inmovilizacion-espinal': 'CONSERVAR con revisión pendiente: los criterios de restricción '
    + 'de movimiento espinal deben cotejarse con la guía de la que los tome la academia.',
}

for (const id of M5_FUENTE_GENERICA) {
  const especifica = M5_DECISIONES[id]
  REVISIONES_DECLARADAS[id] = borrador(
    [
      AUDITADO_M5,
      'CORREGIDO: se sustituyó la referencia genérica a la portada de PHTLS por la cita de la '
        + 'edición declarada por el plan, con la deuda de página explícita.',
      ...(especifica ? [especifica] : ['CONSERVAR: sin hallazgos propios; arrastra solo la deuda común de página.']),
      DEUDA_PHTLS,
      DEUDA_COMPLEMENTARIA,
      REVISAR_ABSOLUTOS,
    ],
    { fuentes: ['NAEMT. PHTLS, 9.ª ed. (edición declarada por el plan; página pendiente).'] },
  )
}

// ---------- temas ya reescritos en esta remediación ----------

REVISIONES_DECLARADAS['m1-pab-ovace-adultos'] = {
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA 2025 (Adult BLS y algoritmo de OVACE del adulto)',
  observaciones: [
    'Sustituye la enseñanza previa de compresiones abdominales aisladas por el ciclo de 5 golpes '
      + 'dorsales y 5 compresiones abdominales.',
  ],
  fuentes: [
    'American Heart Association. Adult Foreign-Body Airway Obstruction Algorithm, 2025.',
    'American Heart Association. 2025 Guidelines: Adult Basic Life Support.',
  ],
}

REVISIONES_DECLARADAS['m1-pai-ovace-pediatrico'] = {
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'AHA/AAP 2025, Part 6: Pediatric Basic Life Support',
  observaciones: [
    'Segunda auditoría: la conducta era correcta pero se respaldaba con el algoritmo de ADULTO. '
      + 'Las referencias se sustituyeron por la guía pediátrica primaria de la AHA y la AAP.',
    'La lección distingue expresamente lactante (5 golpes dorsales + 5 compresiones torácicas), '
      + 'niño mayor de un año (5 golpes dorsales + 5 compresiones abdominales) y pérdida de respuesta.',
    'Confirmar con la academia qué edición de PALS adopta para el resto de la unidad pediátrica.',
  ],
  fuentes: [
    'American Heart Association y American Academy of Pediatrics. Part 6: Pediatric Basic Life '
      + 'Support. 2025 Guidelines for CPR and ECC. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.',
    'American Academy of Pediatrics. Pediatric life support, resuscitation guideline updates '
      + 'developed by AAP, AHA. AAP News, 2025.',
  ],
}

// `m1-pai-intoxicaciones` ya no lleva ficha de borrador: se auditó con los
// otros trece temas del módulo y su entrada está en M1_AUDITADOS, arriba.

// El nodo de examen del Módulo 1 (`m1-examen-aplicacion`) NO lleva ficha aquí:
// es una evaluación y su configuración —con su propia ficha— vive en
// evaluaciones.js, junto a la de los otros diez exámenes del plan.

export default REVISIONES_DECLARADAS
