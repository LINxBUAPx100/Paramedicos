// ============================================================
//  Entrenador de farmacología — catálogo de la academia
// ------------------------------------------------------------
//  Transcribe la guía que entregó el dueño del producto el 25-09-2026:
//  «Farmacología prehospitalaria avanzada | México» (10 páginas, revisión
//  25/09/2026). Es la lista con la que se trabaja «de momento»; si la
//  academia entrega otra, se sustituye este archivo y nada más.
//
//  DOSIS Y PRESENTACIONES: la guía de la academia no las trae («No incluye
//  dosis, diluciones ni algoritmos de administración», p. 1). El 25-09-2026
//  el dueño pidió investigarlas y enseñar a calcularlas; viven en dosis.js y
//  dosisUrgencias.js, cada una con su fuente primaria completa, y se
//  adjuntan aquí por id. tests/farmacos.test.mjs rechaza la que no la traiga
//  (PLAN-LMS §23.1 y §27.1).
//
//  FICHAS COMPLEMENTARIAS: clopidogrel, flumazenil y ácido tranexámico no
//  están en la guía de la academia; los pide la guía de estudio del
//  alumnado («Guía Farmacología», 25-09-2026). Su grupo, uso y precaución
//  salen de la fuente primaria de cada uno, no de esa guía.
//
//  `temasRelacionados` solo apunta a lecciones que NOMBRAN el fármaco en su
//  texto; la prueba lo comprueba con `patron`. Un fármaco del formulario
//  ampliado que ninguna lección nombra se queda sin enlace: es verdad, y es
//  mejor que insinuar que una lección lo enseña.
//
//  Todas las fichas nacen en `borrador`. Pasar a `validado` es una firma
//  docente, no una edición de este archivo.
// ============================================================

import { DOSIS, PRESENTACIONES } from './dosis.js'

// Documento que origina el catálogo.
export const ORIGEN_CATALOGO = {
  titulo: 'Farmacología prehospitalaria avanzada | México. Guía de consulta',
  revision: '25/09/2026',
  entregado: '2026-09-25',
  paginas: 10,
  alcance:
    'Grupo farmacológico, finalidad terapéutica y principales precauciones. No constituye una monografía exhaustiva, no incluye dosis, diluciones ni algoritmos de administración y no sustituye protocolos autorizados ni valoración médica.',
}

// Referencias que cita la guía (p. 10), con la numeración original.
export const REFERENCIAS = {
  1: {
    nombre: 'Secretaría de Salud. NOM-034-SSA3-2013, Regulación de los servicios de salud. Atención médica prehospitalaria. DOF, 23/09/2014.',
    nota: 'Numerales 4.1, 5.3, 6.3, 7.1.8 y apéndices normativos A-D.',
    url: 'https://dof.gob.mx/nota_detalle_popup.php?codigo=5361072',
  },
  2: {
    nombre: 'Secretaría de Economía. Catálogo de normas oficiales: NOM-034-SSA3-2013, estado vigente.',
    nota: 'Vigencia de la norma.',
    url: 'https://platiica.economia.gob.mx/normalizacion/nom-034-ssa3-2013/',
  },
  3: {
    nombre: 'Cámara de Diputados. Ley General de Salud, texto con reformas al 15/01/2026.',
    nota: 'Art. 28 Bis (profesiones que prescriben), arts. 226 y 234-256 (control de medicamentos, estupefacientes y psicotrópicos).',
    url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf',
  },
  4: {
    nombre: 'COFEPRIS. Aviso preventivo (actualización) sobre ranitidina.',
    nota: 'No prescribir y mantener la suspensión de comercialización por NDMA.',
    url: 'https://www.gob.mx/cofepris/articulos/aviso-preventivo-actualizacion',
  },
  5: {
    nombre: 'IMSS. Cuadro Básico de Medicamentos. Fichas farmacológicas.',
    nota: 'Reúne secciones de fechas distintas; no prueba la vigencia del inventario de ambulancias.',
    url: 'https://www.imss.gob.mx/sites/all/statics/pdf/cuadros-basicos/CBM.pdf',
  },
  6: {
    nombre: 'IMSS. Sedación, analgesia y relajación muscular en paciente COVID-19.',
    nota: 'Material de cuidados críticos; usado para conceptos farmacológicos, no para extrapolar dosis.',
    url: 'https://educacionensalud.imss.gob.mx/ces_wp/wp-content/uploads/2021/08/5_Sedacion_analgesia_y_relajacion_muscular_en_paciente_COVID-19.pdf',
  },
  7: {
    nombre: 'IMSS. Cuadro básico, Grupo N.º 3: Cardiología.',
    nota: 'Fichas de indicaciones, contraindicaciones e interacciones.',
    url: 'https://www.imss.gob.mx/sites/all/statics/pdf/cuadros-basicos/Grupo-N3-Cardiologia-R.pdf',
  },
  8: {
    nombre: 'American Heart Association. Part 9: Adult Advanced Life Support. Guidelines for CPR and ECC, 2025.',
    nota: 'Una guía extranjera no otorga atribuciones profesionales en México.',
    url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support',
  },
  10: {
    nombre: 'PLAVIX (clopidogrel), información para prescribir. FDA, DailyMed, revisión 30-05-2025.',
    nota: '2.1 Acute Coronary Syndrome.',
    url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de8b0b67-eb25-4684-83b5-7ad785314227',
  },
  11: {
    nombre: 'Flumazenil inyectable, información para prescribir. FDA, DailyMed, 21-06-2024.',
    nota: 'Advertencia en recuadro (convulsiones) y dosificación en sobredosis de benzodiacepinas.',
    url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=436f5616-9626-4b6a-9deb-2986444179d0',
  },
  12: {
    nombre: 'Chauncey JM, Patel P. Tranexamic Acid. StatPearls, actualizado 26-04-2025.',
    nota: 'Mecanismo de acción.',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK532909/',
  },
  13: {
    nombre: 'OMS. Recommendation on tranexamic acid for the treatment of PPH (WHO/RHR/17.21), 2017, según el resumen técnico MCSP/USAID.',
    nota: 'Ventana de 3 horas tras el nacimiento.',
    url: 'https://www.rhsupplies.org/uploads/tx_rhscpublications/TXA_WHO_MCSP_briefer.pdf',
  },
  9: {
    nombre: 'IMSS. Tratamiento general de las intoxicaciones y envenenamientos en niños y adultos. Guía de práctica clínica.',
    nota: 'Antagonistas y manejo toxicológico general.',
    url: 'https://cvoed.imss.gob.mx/wp-content/uploads/2019/07/Gu%C3%ADa-de-Pr%C3%A1ctica-Cl%C3%ADnica_Tratamiento-general-de-las-intoxicaciones-y-envenenamientos-en-ni%C3%B1os-y-adultos.pdf',
  },
}

// Secciones de la guía, en su orden de lectura.
export const SECCIONES = [
  { id: 'base', titulo: 'Soluciones, oxígeno y fármacos básicos', detalle: 'Apéndices A y B de la NOM-034', pagina: 4 },
  { id: 'avanzado', titulo: 'Nivel avanzado', detalle: 'Apéndices C y D de la NOM-034', pagina: 5 },
  { id: 'cardiovascular', titulo: 'Arritmias y soporte hemodinámico', detalle: 'Formulario ampliado', pagina: 6 },
  { id: 'sedacion', titulo: 'Analgesia, sedación y vía aérea', detalle: 'Formulario ampliado', pagina: 7 },
  { id: 'otros', titulo: 'Metabólico, respiratorio, obstétrico y toxicología', detalle: 'Formulario ampliado', pagina: 8 },
  { id: 'complementarios', titulo: 'Complementarios de la guía de estudio', detalle: 'No están en la guía de la academia', pagina: null },
]

// Tipo de unidad → apéndices que acumula (guía p. 2, NOM-034 numeral 5.3).
export const UNIDADES_NOM = [
  { tipo: 'Traslado', apendices: ['A'], alcance: 'Pacientes que no requieren atención de urgencia ni cuidados críticos.' },
  { tipo: 'Urgencias básicas', apendices: ['A', 'B'], alcance: 'Soporte básico de vida.' },
  { tipo: 'Urgencias avanzadas', apendices: ['A', 'B', 'C'], alcance: 'Soporte avanzado de vida.' },
  { tipo: 'Cuidados intensivos', apendices: ['A', 'B', 'C', 'D'], alcance: 'Soporte avanzado y cuidados críticos; la definición normativa se refiere a atención interhospitalaria.' },
]

// Marco jurídico y uso institucional (guía pp. 2, 8 y 9). Paráfrasis breve.
export const MARCO = [
  {
    titulo: 'Qué exige la NOM-034',
    texto: 'La NOM-034-SSA3-2013 figura como vigente. Fija mínimos de atención prehospitalaria, equipo, insumos y formación del personal; no define un inventario máximo universal para una ambulancia. La dotación de medicamentos es acumulativa: cada tipo de unidad suma el apéndice siguiente.',
    fuentes: [1, 2],
  },
  {
    titulo: 'Personal y dirección médica',
    texto: 'En cuidados intensivos, los numerales 6.3.1.1 y 6.3.1.2 piden un operador TAMP, al menos otro TAMP con capacitación acreditada en pacientes críticos y un médico capacitado en atención prehospitalaria y cuidados intensivos. El numeral 7.1.8 exige protocolos escritos avalados y firmados por la autoridad médica o el responsable sanitario.',
    fuentes: [1],
  },
  {
    titulo: 'Prescribir no es lo mismo que administrar',
    texto: 'El artículo 28 Bis de la Ley General de Salud enumera las profesiones facultadas para prescribir y no incluye por su denominación a paramédicos ni a licenciados en emergencias médicas. No se infiere una facultad general de prescripción a partir del título: la administración protocolizada corresponde a competencias acreditadas, indicación y supervisión.',
    fuentes: [3],
  },
  {
    titulo: 'Control sanitario',
    texto: 'La Ley General de Salud establece categorías de suministro y controles para estupefacientes y psicotrópicos (arts. 226 y 234 a 256). Adquisición, resguardo, documentación y suministro deben cumplirse; un protocolo institucional no elimina esas obligaciones.',
    fuentes: [3],
  },
  {
    titulo: 'Poblaciones especiales',
    texto: 'Pediatría, embarazo, personas mayores y pacientes con insuficiencia renal o hepática requieren evaluación específica. Una indicación, concentración o esquema de adulto no se extrapola a niños: los cálculos y límites proceden del protocolo correspondiente.',
    fuentes: [5],
  },
  {
    titulo: 'Lo que el catálogo no significa',
    texto: 'No es un catálogo exhaustivo de cuidados críticos, y estar en el mínimo normativo no convierte a un fármaco en primera elección para todos los cuadros mencionados. El formulario de cada servicio responde a su población, sus traslados, su tiempo de respuesta y sus recursos.',
    fuentes: [1],
  },
]

// Ficha que el servicio debe completar para cada medicamento (guía p. 9).
// Es una propuesta de estructura, no una obligación textual de la NOM.
export const FICHA_INSTITUCIONAL = [
  { campo: 'Identificación', define: 'Nombre genérico, presentación real, concentración, volumen total, vía autorizada y registro sanitario del producto.' },
  { campo: 'Indicación', define: 'Criterios clínicos para iniciar, suspender o escalar el tratamiento; contraindicaciones y alternativas.' },
  { campo: 'Autorización', define: 'Personal competente, protocolo aprobado, indicaciones médicas y mecanismo de consulta al control médico.' },
  { campo: 'Administración', define: 'Dosis, límites, dilución, velocidad, compatibilidades y ajustes por población, según documento institucional vigente.' },
  { campo: 'Vigilancia', define: 'Parámetros iniciales, frecuencia de reevaluación, respuesta esperada y manejo de efectos adversos.' },
  { campo: 'Logística', define: 'Cantidad según demanda, conservación, caducidad, reposición y control de productos sujetos a regulación especial.' },
  { campo: 'Registro', define: 'Paciente, indicación, hora, producto, dosis, vía, responsable, respuesta y eventos adversos.' },
]

// Ruta de estudio que propone la guía para cada fármaco (p. 9).
export const RUTA_ESTUDIO = [
  'Mecanismo de acción', 'Indicaciones', 'Contraindicaciones', 'Efectos adversos',
  'Interacciones', 'Presentación y concentración', 'Cálculo', 'Vía',
  'Monitorización y criterios de reevaluación',
]

function farmaco({
  id, nombre, grupo, seccion, uso, precaucion, pagina, fuentes,
  apendice = null, numeral = null, presentacionNom = null, notas = [],
  temasRelacionados = [], patron = null, sinDosis = null,
}) {
  return {
    id,
    nombre,
    grupo,
    seccion,
    origen: apendice ? 'nom' : 'ampliado',
    apendice,
    numeral,
    presentacionNom,
    uso,
    precaucion,
    notas,
    fuente: { pagina, referencias: fuentes },
    temasRelacionados,
    patron,
    dosis: DOSIS[id] || [],
    presentaciones: PRESENTACIONES[id] || [],
    // Por qué una ficha no tiene dosis, cuando es a propósito.
    sinDosis,
    estadoEditorial: 'borrador',
  }
}

const NOM = 'm4-far-nom-034'

export const FARMACOS = [
  // --- Apéndice A: soluciones y oxígeno ---------------------------------
  farmaco({
    id: 'oxigeno', nombre: 'Oxígeno', grupo: 'Gas medicinal', seccion: 'base',
    apendice: 'A', numeral: 'A.2.11-12', presentacionNom: 'Tanque fijo y portátil (la NOM lo enumera como equipo de suministro).',
    uso: 'Corregir hipoxemia y apoyar la oxigenación.',
    precaucion: 'Titular al objetivo clínico; vigilar la ventilación además de la saturación.',
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: ['m3-va-dispositivos-o2', 'm3-va-tanques-o2'], patron: 'oxígeno',
  }),
  farmaco({
    id: 'cloruro-sodio', nombre: 'Cloruro de sodio 0.9 %', grupo: 'Cristaloide', seccion: 'base',
    apendice: 'A', numeral: 'A.4.1', presentacionNom: 'Solución 0.9 %.',
    uso: 'Reposición de volumen y dilución compatible.',
    precaucion: 'Reevaluar perfusión y congestión; las cargas grandes pueden causar hipercloremia.',
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'cloruro de sodio',
  }),
  farmaco({
    id: 'electrolitos-orales', nombre: 'Electrolitos orales', grupo: 'Solución de rehidratación oral', seccion: 'base',
    apendice: 'A', numeral: 'A.4.2', presentacionNom: 'Rehidratación oral.',
    uso: 'Rehidratación cuando el paciente tolera la vía oral.',
    precaucion: 'No usar con vía aérea no protegida ni como tratamiento único del choque.',
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: [NOM, 'm4-gi-deshidratacion'], patron: 'electrolitos orales|vida suero|suero oral',
  }),
  farmaco({
    id: 'glucosa-5', nombre: 'Glucosa 5 %', grupo: 'Solución glucosada', seccion: 'base',
    apendice: 'A', numeral: 'A.4.3', presentacionNom: 'Solución 5 %.',
    uso: 'Aporte de agua y carbohidrato.',
    precaucion: 'No es líquido de reanimación del choque; vigilar glucemia y sodio.',
    sinDosis: 'No tiene dosis de urgencia a propósito: no es líquido de reanimación del choque. Su volumen y velocidad los fija la indicación médica.',
    notas: ['La glucosa 5 % y la dextrosa 50 % no son productos intercambiables.'],
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'glucosa(, solución)? al 5',
  }),
  farmaco({
    id: 'hartmann', nombre: 'Solución Hartmann', grupo: 'Cristaloide balanceado', seccion: 'base',
    apendice: 'A', numeral: 'A.4.4', presentacionNom: 'Solución. La NOM escribe «Hartman».',
    uso: 'Reposición de líquidos y electrolitos.',
    precaucion: 'Vigilar sobrecarga y compatibilidad con otros productos.',
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'hartman',
  }),
  // --- Apéndice B -------------------------------------------------------
  farmaco({
    id: 'acido-acetilsalicilico', nombre: 'Ácido acetilsalicílico', grupo: 'Antiagregante plaquetario', seccion: 'base',
    apendice: 'B', numeral: 'B.4.1.1', presentacionNom: 'Tabletas.',
    uso: 'Síndrome coronario agudo cuando está indicado.',
    precaucion: 'Valorar alergia y sangrado; no administrarlo automáticamente a todo dolor torácico.',
    pagina: 4, fuentes: [1, 7, 8],
    temasRelacionados: [NOM], patron: 'acetilsalic',
  }),
  farmaco({
    id: 'nitratos', nombre: 'Isosorbida y trinitrato de glicerilo (nitroglicerina)', grupo: 'Nitratos', seccion: 'base',
    apendice: 'B', numeral: 'B.4.1.2 y B.4.1.3', presentacionNom: 'Isosorbida en tabletas; trinitrato de glicerilo en perlas sublinguales.',
    uso: 'Vasodilatación y alivio de la isquemia; nitroglicerina en cuadros seleccionados de congestión.',
    precaucion: 'Controlar la presión; revisar el uso de inhibidores de la PDE-5 y los estados dependientes de precarga.',
    pagina: 4, fuentes: [1, 7, 8],
    temasRelacionados: [NOM], patron: 'isosorbida|trinitrato',
  }),
  farmaco({
    id: 'adrenalina', nombre: 'Adrenalina (epinefrina)', grupo: 'Agonista adrenérgico', seccion: 'base',
    apendice: 'B', numeral: 'B.4.2.1 y B.4.2.3', presentacionNom: 'Inyectable o el sustituto previsto; la NOM la nombra dos veces y es el mismo principio activo.',
    uso: 'Anafilaxia y paro cardiaco, con esquemas distintos.',
    precaucion: 'Confirmar indicación, concentración y vía: los esquemas de anafilaxia y de paro no son intercambiables.',
    pagina: 4, fuentes: [1, 5, 8],
    temasRelacionados: [NOM, 'm4-tox-anafilaxia', 'm5-hs-anafilactico'], patron: 'adrenalina|epinefrina',
  }),
  farmaco({
    id: 'atropina', nombre: 'Atropina', grupo: 'Antimuscarínico', seccion: 'base',
    apendice: 'B', numeral: 'B.4.2.2', presentacionNom: 'Inyectable.',
    uso: 'Bradicardia con compromiso y síndrome colinérgico, según protocolo.',
    precaucion: 'Monitorizar el ritmo. No trata la anafilaxia ni se usa rutinariamente en asistolia.',
    notas: ['La NOM la clasifica bajo «inmunoalérgicas»: es una clasificación editorial, no una indicación terapéutica.'],
    pagina: 4, fuentes: [1, 5, 8],
    temasRelacionados: [NOM], patron: 'atropina',
  }),
  farmaco({
    id: 'dextrosa-50', nombre: 'Dextrosa 50 %', grupo: 'Solución glucosada hipertónica', seccion: 'base',
    apendice: 'B', numeral: 'B.4.3.1', presentacionNom: 'Solución 50 %.',
    uso: 'Corrección de hipoglucemia.',
    precaucion: 'Hipertónica: riesgo por extravasación. En pediatría se requieren concentración y dosis específicas.',
    notas: ['La glucosa 5 % y la dextrosa 50 % no son productos intercambiables.'],
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'dextrosa al 50',
  }),
  farmaco({
    id: 'salbutamol', nombre: 'Salbutamol', grupo: 'Agonista beta-2', seccion: 'base',
    apendice: 'B', numeral: 'B.4.4.1', presentacionNom: 'Aerosol.',
    uso: 'Broncodilatación en broncoespasmo.',
    precaucion: 'Vigilar la respuesta, la frecuencia cardiaca y los efectos metabólicos con el uso intensivo.',
    pagina: 4, fuentes: [1, 5],
    temasRelacionados: [NOM, 'm4-resp-asma', 'm4-resp-epoc', 'm4-resp-insuficiencia'], patron: 'salbutamol',
  }),
  // --- Apéndices C y D --------------------------------------------------
  farmaco({
    id: 'ketorolaco', nombre: 'Ketorolaco', grupo: 'AINE', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.1.1', presentacionNom: 'Inyectable.',
    uso: 'Dolor agudo seleccionado.',
    precaucion: 'Valorar sangrado, úlcera, lesión renal e hipovolemia.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'ketorolaco',
  }),
  farmaco({
    id: 'metamizol', nombre: 'Metamizol', grupo: 'Analgésico-antipirético', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.1.2', presentacionNom: 'Inyectable.',
    uso: 'Dolor y fiebre.',
    precaucion: 'Puede producir hipotensión, hipersensibilidad y alteraciones hematológicas graves.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'metamizol',
  }),
  farmaco({
    id: 'nalbufina', nombre: 'Nalbufina', grupo: 'Opioide mixto', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.1.3', presentacionNom: 'Inyectable.',
    uso: 'Dolor moderado a intenso.',
    precaucion: 'Vigilar la ventilación; puede precipitar abstinencia en la dependencia de agonistas opioides.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'nalbufina',
  }),
  farmaco({
    id: 'midazolam', nombre: 'Midazolam', grupo: 'Benzodiacepina', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.2.1', presentacionNom: 'Inyectable.',
    uso: 'Sedación y control de convulsiones según protocolo.',
    precaucion: 'Depresión respiratoria e hipotensión, potenciadas con opioides; no aporta analgesia.',
    pagina: 5, fuentes: [1, 5, 6],
    temasRelacionados: [NOM], patron: 'midazolam',
  }),
  farmaco({
    id: 'captopril-enalapril', nombre: 'Captopril o enalapril', grupo: 'IECA', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.3.1', presentacionNom: 'Tabletas; la NOM los da como alternativa.',
    uso: 'Hipertensión en escenarios seleccionados.',
    precaucion: 'No tratar una cifra aislada. Riesgos: hipotensión, angioedema e hiperpotasemia; evitar en el embarazo.',
    pagina: 5, fuentes: [1, 7],
    temasRelacionados: [NOM], patron: 'captopril|enalapril',
  }),
  farmaco({
    id: 'hidrocortisona', nombre: 'Hidrocortisona', grupo: 'Corticoide', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.4.1', presentacionNom: 'Inyectable o genérico alterno.',
    uso: 'Insuficiencia suprarrenal y otros cuadros seleccionados.',
    precaucion: 'No sustituye a la adrenalina en la anafilaxia ni ofrece su efecto inmediato.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'hidrocortisona',
  }),
  farmaco({
    id: 'butilhioscina', nombre: 'Butilhioscina', grupo: 'Antiespasmódico', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.5.1', presentacionNom: 'Inyectable.',
    uso: 'Dolor asociado con espasmo visceral seleccionado.',
    precaucion: 'Valorar retención urinaria, glaucoma y taquicardia; no retrasar el diagnóstico de abdomen agudo.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'butilhioscina',
  }),
  farmaco({
    id: 'difenidol', nombre: 'Difenidol', grupo: 'Antiemético', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.5.2', presentacionNom: 'Inyectable.',
    uso: 'Náusea, vómito y vértigo seleccionados.',
    precaucion: 'Valorar sedación, efectos anticolinérgicos y función renal.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'difenidol',
  }),
  farmaco({
    id: 'ranitidina', nombre: 'Ranitidina', grupo: 'Antagonista H2', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.5.3', presentacionNom: 'Inyectable.',
    uso: 'Uso histórico en supresión de ácido.',
    precaucion: 'Referencia documental: atender las disposiciones de COFEPRIS; no incorporarla automáticamente.',
    sinDosis: 'Sin dosis a propósito: COFEPRIS indicó no prescribirla y suspender su comercialización. Ojo: el Compendio 2025 todavía la lista.',
    notas: ['El texto de 2014 la incluye, pero COFEPRIS indicó después no prescribirla y suspender su comercialización por NDMA. Su presencia es documental, no una recomendación de compra o uso.'],
    pagina: 5, fuentes: [1, 4],
    temasRelacionados: [NOM], patron: 'ranitidina',
  }),
  farmaco({
    id: 'hidralazina', nombre: 'Hidralazina', grupo: 'Vasodilatador', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.6.1', presentacionNom: 'Inyectable.',
    uso: 'Hipertensión grave, incluida la obstétrica, según evaluación.',
    precaucion: 'Vigilar presión y frecuencia cardiaca; evitar descensos excesivos de la perfusión.',
    pagina: 5, fuentes: [1, 7],
    temasRelacionados: [NOM], patron: 'hidralazina',
  }),
  farmaco({
    id: 'diazepam', nombre: 'Diazepam', grupo: 'Benzodiacepina', seccion: 'avanzado',
    apendice: 'C', numeral: 'C.3.7.1', presentacionNom: 'Inyectable.',
    uso: 'Crisis convulsivas; otras indicaciones seleccionadas.',
    precaucion: 'Vigilar conciencia y ventilación; no intercambiar presentaciones ni vías sin verificar.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'diazepam',
  }),
  farmaco({
    id: 'haloperidol', nombre: 'Haloperidol', grupo: 'Antipsicótico', seccion: 'avanzado',
    apendice: 'D', numeral: 'D.1.1.1', presentacionNom: 'Inyectable.',
    uso: 'Agitación de origen psiquiátrico en casos seleccionados.',
    precaucion: 'Descartar causas orgánicas; considerar QT, distonía e hipotensión. No sustituye la analgesia.',
    pagina: 5, fuentes: [1, 5],
    temasRelacionados: [NOM], patron: 'haloperidol',
  }),
  // --- Formulario ampliado: cardiovascular ------------------------------
  farmaco({
    id: 'adenosina', nombre: 'Adenosina', grupo: 'Antiarrítmico de acción muy breve', seccion: 'cardiovascular',
    uso: 'Taquicardia supraventricular regular en escenarios apropiados.',
    precaucion: 'Confirmar ritmo y estabilidad; no usar indiscriminadamente en taquicardia irregular o polimórfica. ECG continuo y capacidad de reanimación.',
    pagina: 6, fuentes: [7, 8],
  }),
  farmaco({
    id: 'amiodarona', nombre: 'Amiodarona', grupo: 'Antiarrítmico', seccion: 'cardiovascular',
    uso: 'Arritmias ventriculares; en reanimación, fibrilación ventricular o taquicardia ventricular sin pulso refractarias según algoritmo.',
    precaucion: 'Vigilar hipotensión, bradicardia, QT e interacciones. No sustituye la desfibrilación indicada.',
    pagina: 6, fuentes: [7, 8],
  }),
  farmaco({
    id: 'lidocaina', nombre: 'Lidocaína', grupo: 'Antiarrítmico / anestésico local', seccion: 'cardiovascular',
    uso: 'Alternativa en determinadas arritmias ventriculares; anestesia local con la presentación adecuada.',
    precaucion: 'Distinguir formulación y finalidad. Toxicidad neurológica y cardiovascular con exposición excesiva.',
    pagina: 6, fuentes: [7, 8],
  }),
  farmaco({
    id: 'noradrenalina', nombre: 'Noradrenalina', grupo: 'Vasopresor', seccion: 'cardiovascular',
    uso: 'Soporte de presión y perfusión en estados de choque seleccionados.',
    precaucion: 'Infusión controlada, vigilancia del acceso y evaluación continua de la perfusión; una extravasación puede lesionar tejidos.',
    pagina: 6, fuentes: [7],
  }),
  farmaco({
    id: 'dobutamina', nombre: 'Dobutamina', grupo: 'Inotrópico', seccion: 'cardiovascular',
    uso: 'Soporte del gasto cardiaco cuando hay disfunción de bomba y una indicación médica definida.',
    precaucion: 'Vigilar arritmias, isquemia y presión arterial; puede agravar la hipotensión.',
    pagina: 6, fuentes: [7],
  }),
  farmaco({
    id: 'dopamina', nombre: 'Dopamina', grupo: 'Catecolamina vasoactiva', seccion: 'cardiovascular',
    uso: 'Soporte hemodinámico en circunstancias seleccionadas.',
    precaucion: 'No es intercambiable con noradrenalina ni con dobutamina; puede producir taquiarritmias.',
    pagina: 6, fuentes: [7],
  }),
  farmaco({
    id: 'furosemida', nombre: 'Furosemida', grupo: 'Diurético de asa', seccion: 'cardiovascular',
    uso: 'Congestión con sobrecarga de volumen cuando el diagnóstico lo justifica.',
    precaucion: 'No toda disnea requiere diurético. Vigilar perfusión, función renal y electrolitos; evitar agravar una hipovolemia.',
    pagina: 6, fuentes: [7],
  }),
  // --- Formulario ampliado: analgesia, sedación y vía aérea -------------
  farmaco({
    id: 'fentanilo', nombre: 'Fentanilo', grupo: 'Agonista opioide', seccion: 'sedacion',
    uso: 'Analgesia intensa y componente de analgosedación.',
    precaucion: 'Puede causar depresión respiratoria, hipotensión y rigidez muscular; vigilar la ventilación y el efecto combinado con sedantes.',
    notas: ['Estupefaciente: sujeto a los controles de la Ley General de Salud.'],
    pagina: 7, fuentes: [3, 6],
  }),
  farmaco({
    id: 'ketamina', nombre: 'Ketamina', grupo: 'Anestésico disociativo', seccion: 'sedacion',
    uso: 'Analgesia o inducción anestésica según objetivo y protocolo.',
    precaucion: 'La respiración espontánea no está garantizada. Preparar el manejo de la vía aérea; considerar secreciones y efectos hemodinámicos.',
    pagina: 7, fuentes: [6],
  }),
  farmaco({
    id: 'etomidato', nombre: 'Etomidato', grupo: 'Hipnótico de inducción', seccion: 'sedacion',
    uso: 'Inducción para intubación en pacientes seleccionados.',
    precaucion: 'No proporciona analgesia. Considerar mioclonías y supresión suprarrenal; no equivale a sedación continua.',
    pagina: 7, fuentes: [6],
  }),
  farmaco({
    id: 'propofol', nombre: 'Propofol', grupo: 'Hipnótico intravenoso', seccion: 'sedacion',
    uso: 'Inducción y sedación del paciente que requiere vigilancia avanzada.',
    precaucion: 'Puede producir apnea e hipotensión importante; carece de analgesia y requiere administración controlada.',
    pagina: 7, fuentes: [6],
  }),
  farmaco({
    id: 'dexmedetomidina', nombre: 'Dexmedetomidina', grupo: 'Agonista alfa-2', seccion: 'sedacion',
    uso: 'Sedación de pacientes seleccionados en cuidados críticos.',
    precaucion: 'Bradicardia e hipotensión; no sustituye por sí sola un plan de analgesia ni de inducción rápida.',
    pagina: 7, fuentes: [6],
  }),
  farmaco({
    id: 'rocuronio-vecuronio', nombre: 'Rocuronio / vecuronio', grupo: 'Bloqueadores neuromusculares no despolarizantes', seccion: 'sedacion',
    uso: 'Facilitar la intubación o la ventilación en situaciones autorizadas y con personal competente.',
    precaucion: 'Producen parálisis, NO inconsciencia ni analgesia. Requieren sedación, analgesia y ventilación suficientes durante todo su efecto.',
    pagina: 7, fuentes: [6],
  }),
  // --- Formulario ampliado: metabólico, respiratorio, obstétrico, tox ----
  farmaco({
    id: 'sulfato-magnesio', nombre: 'Sulfato de magnesio', grupo: 'Electrolito', seccion: 'otros',
    uso: 'Prevención y tratamiento de convulsiones eclámpticas; torsades de pointes asociada a QT prolongado.',
    precaucion: 'Vigilar respiración, reflejos y función renal; no se administra rutinariamente en todo paro.',
    pagina: 8, fuentes: [5, 8],
    temasRelacionados: ['m4-resp-asma'], patron: 'sulfato de magnesio',
    notas: ['La lección de asma lo menciona dentro del manejo de la crisis grave; la guía de la academia no lo lista para esa indicación.'],
  }),
  farmaco({
    id: 'gluconato-calcio', nombre: 'Gluconato de calcio', grupo: 'Electrolito', seccion: 'otros',
    uso: 'Hipocalcemia; protección cardiaca en hiperpotasemia con indicación.',
    precaucion: 'No elimina el potasio. Vigilar acceso, ECG y compatibilidades; no confundir con cloruro de calcio.',
    pagina: 8, fuentes: [5, 8],
  }),
  farmaco({
    id: 'bicarbonato-sodio', nombre: 'Bicarbonato de sodio', grupo: 'Alcalinizante', seccion: 'otros',
    uso: 'Situaciones metabólicas o toxicológicas específicas.',
    precaucion: 'No es tratamiento rutinario del paro cardiaco. Valorar ventilación, sodio y equilibrio ácido-base.',
    pagina: 8, fuentes: [5, 8, 9],
  }),
  farmaco({
    id: 'ipratropio', nombre: 'Ipratropio', grupo: 'Antimuscarínico inhalado', seccion: 'otros',
    uso: 'Complemento broncodilatador en la obstrucción de la vía aérea.',
    precaucion: 'No reemplaza el soporte ventilatorio; evitar el contacto ocular con el aerosol.',
    pagina: 8, fuentes: [5],
  }),
  farmaco({
    id: 'oxitocina', nombre: 'Oxitocina', grupo: 'Uterotónico', seccion: 'otros',
    uso: 'Hemorragia posparto por atonía, dentro del manejo obstétrico.',
    precaucion: 'Evaluar la causa del sangrado; vigilar presión y respuesta. Respetar la conservación del producto.',
    pagina: 8, fuentes: [5],
  }),
  farmaco({
    id: 'ondansetron', nombre: 'Ondansetrón', grupo: 'Antagonista 5-HT3', seccion: 'otros',
    uso: 'Control de náuseas y vómito.',
    precaucion: 'Considerar prolongación del QT, electrolitos e interacciones; no resuelve la causa del vómito.',
    pagina: 8, fuentes: [5],
  }),
  farmaco({
    id: 'naloxona', nombre: 'Naloxona', grupo: 'Antagonista opioide', seccion: 'otros',
    uso: 'Depresión respiratoria por opioides.',
    precaucion: 'Apoyar la ventilación. Vigilar abstinencia y recurrencia: el opioide puede durar más que el antagonista.',
    pagina: 8, fuentes: [5, 9],
  }),
  // --- Complementarios de la guía de estudio -----------------------------
  farmaco({
    id: 'clopidogrel', nombre: 'Clopidogrel', grupo: 'Antiagregante plaquetario', seccion: 'complementarios',
    uso: 'Síndrome coronario agudo, con dosis de carga y después dosis diaria.',
    precaucion: 'Sin dosis de carga, su efecto antiplaquetario tarda varios días en establecerse.',
    pagina: null, fuentes: [10],
  }),
  farmaco({
    id: 'flumazenil', nombre: 'Flumazenil', grupo: 'Antagonista de benzodiacepinas', seccion: 'complementarios',
    uso: 'Reversión de la sedación por sobredosis de benzodiacepinas.',
    precaucion: 'Se asocia con convulsiones, sobre todo tras uso crónico de benzodiacepinas o en intoxicación por antidepresivos cíclicos.',
    pagina: null, fuentes: [11],
  }),
  farmaco({
    id: 'acido-tranexamico', nombre: 'Ácido tranexámico', grupo: 'Antifibrinolítico', seccion: 'complementarios',
    uso: 'Hemorragia significativa: estabiliza el coágulo de fibrina al inhibir la activación del plasminógeno.',
    precaucion: 'Tiene ventana de tiempo: en hemorragia posparto no se inicia después de 3 horas del nacimiento.',
    pagina: null, fuentes: [12, 13],
  }),
]
