// ============================================================
//  Fundamentos de farmacología — hechos citados y preguntas
// ------------------------------------------------------------
//  Cubre los temas que pide la guía de estudio de los alumnos
//  («Guía Farmacología», entregada el 25-09-2026) y que el temario no
//  desarrolla: definiciones legales, farmacocinética, vías, ángulos de
//  inyección, NOM-022 y tonicidad de soluciones.
//
//  Cada hecho se leyó en su fuente durante la investigación del
//  25-09-2026. Quedaron FUERA por no tener fuente citable: la «L» de LADME
//  (la fuente respalda ADME), el rango de 15-30° del catéter periférico (la
//  fuente dice «menos de 45°»), el nombre químico/IUPAC y la clasificación
//  paliativo/curativo/sustitutivo.
//
//  Las preguntas SOLO preguntan hechos de esta lista: cada una apunta a su
//  hecho con `hecho` y la prueba lo comprueba.
// ============================================================

const LGS = {
  documento: 'Ley General de Salud',
  edicion: 'Texto vigente, últimas reformas DOF 15-01-2026',
  url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf',
}
const NOM022 = {
  documento: 'NOM-022-SSA3-2012, terapia de infusión',
  edicion: 'DOF 18-09-2012',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5268977&fecha=18/09/2012',
}
const sp = (autores, titulo, id, actualizado) => ({
  documento: `${autores}. ${titulo}. StatPearls`,
  edicion: `NCBI Bookshelf, actualizado ${actualizado}`,
  url: `https://www.ncbi.nlm.nih.gov/books/${id}/`,
})
const PK = sp('Grogan S, Preuss CV', 'Pharmacokinetics', 'NBK557744', '30-07-2023')
const BIO = sp('Price G, Patel DA', 'Drug Bioavailability', 'NBK557852', '30-07-2023')
const PRIMER = sp('Herman TF, Santos C', 'First-Pass Effect', 'NBK551679', '03-11-2023')
const VIAS = sp('Del Pozo E, Patel P, Das JM', 'Medication Routes of Administration', 'NBK568677', '14-09-2026')
const VACUNAS = sp('Clark EM, Pippin MM', 'Safe and Effective Administration of Vaccines and Epinephrine Autoinjection', 'NBK567772', '17-08-2023')
const PPD = sp('Pahal P, Pollard EJ, Sharma S', 'PPD Skin Test', 'NBK556037', '23-04-2023')
const PERIF = sp('Beecham GB, Agarwal A, Tackling G', 'Peripheral Line Placement', 'NBK539795', '13-12-2025')
const CRIST = sp('Rout P, Patel P, Davis D', 'Crystalloid Solutions in Intravenous Fluid Therapy', 'NBK500033', '28-09-2025')
const TXA = sp('Chauncey JM, Patel P', 'Tranexamic Acid', 'NBK532909', '26-04-2025')
const NALOX = sp('Theriot J, Sabir S, Azadfard M', 'Opioid Antagonists', 'NBK537079', '31-01-2026')
const FLUMA = sp('Sharbaf Shoar N, Bistas KG, Patel P, Saadabadi A', 'Flumazenil', 'NBK470180', '29-02-2024')
const NTG = {
  documento: 'Nitroglycerin Tablets USP 0.4 mg, etiqueta FDA (DailyMed)',
  edicion: 'Revisión 10/2010',
  url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=85b8863e-b8e0-46f4-94a4-7c8e2c66da3f',
}
const MESH = { documento: 'MeSH (NLM), descriptor «Pharmacology»', edicion: 'D010600', url: 'https://meshb.nlm.nih.gov/record/ui?ui=D010600' }

const h = (id, texto, fuente, seccion) => ({ id, texto, fuente: { ...fuente, seccion } })

export const TEMAS_FUNDAMENTOS = [
  {
    id: 'definiciones',
    titulo: 'Fármaco, medicamento y sus nombres',
    hechos: [
      h('medicamento', 'Medicamento (LGS): sustancia o mezcla, natural o sintética, con efecto terapéutico, preventivo o rehabilitatorio, que se presenta en forma farmacéutica.', LGS, 'art. 221, fracc. I'),
      h('farmaco', 'Fármaco (LGS): sustancia con actividad farmacológica que NO se presenta en forma farmacéutica y puede emplearse como medicamento o como ingrediente de uno.', LGS, 'art. 221, fracc. II'),
      h('farmacologia', 'Farmacología: estudio del origen, la naturaleza, las propiedades y las acciones de los fármacos y de sus efectos en los organismos vivos.', MESH, 'Scope Note'),
      h('nombres', 'En México un medicamento se identifica por su denominación genérica y su denominación distintiva (comercial). La genérica es obligatoria, y la distintiva no puede aludir a su composición ni a su acción terapéutica.', LGS, 'art. 225'),
    ],
  },
  {
    id: 'farmacocinetica',
    titulo: 'Farmacocinética y farmacodinamia',
    hechos: [
      h('pk-pd', 'Farmacocinética: lo que el organismo le hace al fármaco durante toda la exposición. Farmacodinamia: el efecto del fármaco sobre el organismo.', PK, 'Introduction'),
      h('adme', 'La farmacocinética examina cuatro procesos: absorción, distribución, metabolismo y excreción (ADME).', PK, 'Introduction'),
      h('higado', 'La mayor parte del metabolismo de los fármacos ocurre en el hígado, en reacciones de fase I (CYP450) y fase II.', PK, 'Fundamentals – Metabolism'),
      h('rinon', 'Los riñones son la vía de excreción más frecuente; algunos fármacos se eliminan por pulmón, piel o tubo digestivo.', PK, 'Fundamentals – Excretion'),
      h('vida-media', 'Vida media: tiempo en que la concentración sérica del fármaco disminuye 50 %.', PK, 'Fundamentals – Half-life'),
      h('estado-estable', 'El estado estable se alcanza tras 4 a 5 vidas medias de tratamiento.', PK, 'Fundamentals – Half-life'),
      h('biodisponibilidad', 'Biodisponibilidad: fracción y velocidad con que la dosis llega a la circulación sistémica. Por vía IV es, por definición, 100 %.', BIO, 'Definition/Introduction'),
      h('primer-paso', 'Efecto de primer paso: metabolismo del fármaco, típicamente en el hígado, antes de llegar a la circulación sistémica; reduce la concentración activa.', PRIMER, 'Definition/Introduction'),
    ],
  },
  {
    id: 'vias',
    titulo: 'Vías de administración',
    hechos: [
      h('enterales', 'Las vías enterales usan el tubo digestivo: oral, sublingual, bucal y rectal. La sublingual y la bucal evitan el efecto de primer paso.', VIAS, 'Enteral Routes'),
      h('parenterales', 'Las vías parenterales no pasan por el tubo digestivo: incluyen la inyección intravenosa, intramuscular y subcutánea.', VIAS, 'Parenteral Routes'),
      h('ntg-sl', 'La nitroglicerina sublingual (tableta de 0.4 mg) empieza a actuar en aproximadamente 1 a 3 minutos.', NTG, 'Clinical Pharmacology'),
      h('angulo-im', 'Inyección intramuscular: a 90° sobre el vientre de un músculo grande.', VACUNAS, 'Technique or Treatment'),
      h('angulo-sc', 'Inyección subcutánea: aguja a 45° sobre el pliegue de piel.', VACUNAS, 'Technique or Treatment'),
      h('angulo-id', 'Inyección intradérmica (prueba de PPD): aguja a 5-15°, con el bisel visible bajo la piel.', PPD, 'Procedures'),
      h('angulo-iv', 'Catéter venoso periférico: la aguja entra con un ángulo bajo, menor de 45°, hasta ver el reflujo de sangre en la cámara.', PERIF, 'Technique or Treatment'),
    ],
  },
  {
    id: 'nom022',
    titulo: 'NOM-022: terapia de infusión',
    hechos: [
      h('nom-objetivo', 'La NOM-022-SSA3-2012 fija criterios para instalar, mantener, vigilar y retirar accesos venosos periféricos y centrales.', NOM022, 'numeral 1'),
      h('nom-campo', 'Es obligatoria para los establecimientos de atención médica y el personal de salud del Sistema Nacional de Salud que realicen terapia de infusión intravenosa.', NOM022, 'numeral 2'),
      h('nom-manos', 'Higiene de manos con agua y jabón antiséptico, o con solución alcohólica, antes y después de manipular el catéter y las vías de infusión.', NOM022, 'numeral 6.7.1.2'),
      h('nom-rotulo', 'El envase de la solución se rotula con paciente, cama, fecha, solución, hora de inicio y de término, frecuencia y nombre completo de quien la instaló.', NOM022, 'numeral 6.2.2'),
      h('nom-equipo', 'El equipo de infusión se cambia cada 24 h con soluciones hipertónicas (dextrosa 10 %, 50 %, NPT) y cada 72 h con soluciones isotónicas o hipotónicas.', NOM022, 'numeral 6.3.8'),
      h('nom-registro', 'Se registra fecha, hora, tipo y calibre del catéter, sitio de punción, número de intentos, incidentes y nombre de quien lo instaló.', NOM022, 'numeral 7.3'),
    ],
  },
  {
    id: 'soluciones',
    titulo: 'Soluciones: isotónicas, hipotónicas e hipertónicas',
    hechos: [
      h('ss09', 'El NaCl 0.9 % (308 mOsm/L) y el Hartmann/Ringer lactato (273 mOsm/L) son soluciones isotónicas.', CRIST, 'Mechanism of Action'),
      h('ss045', 'El NaCl 0.45 % es hipotónico (154 mOsm/L).', CRIST, 'Mechanism of Action'),
      h('d5', 'La dextrosa 5 % mide 252 mOsm/L en el envase, pero la glucosa se metaboliza rápido y en el organismo actúa como líquido muy hipotónico.', CRIST, 'Mechanism of Action'),
      h('ss3', 'El NaCl 3 % es hipertónico (≈1026 mOsm/L): saca agua del espacio intracelular.', CRIST, 'Mechanism of Action'),
      h('d50', 'La NOM-022 clasifica como hipertónicas la dextrosa al 10 % y al 50 % y la nutrición parenteral total.', NOM022, 'numeral 6.3.8'),
    ],
  },
  {
    id: 'antidotos',
    titulo: 'Tranexámico, naloxona y flumazenil',
    hechos: [
      h('txa', 'El ácido tranexámico es un análogo sintético de la lisina: inhibe de forma competitiva la activación del plasminógeno, estabiliza el coágulo de fibrina y reduce el sangrado.', TXA, 'Mechanism of Action'),
      h('naloxona', 'La naloxona es un antagonista competitivo del receptor opioide μ: desplaza al opioide sin activar el receptor.', NALOX, 'Mechanism of Action'),
      h('naloxona-vm', 'La vida media de la naloxona es de 30 a 90 minutos, más corta que la de muchos opioides: tras revertir, se vigila por el riesgo de que la depresión respiratoria regrese.', NALOX, 'Mechanism of Action / Monitoring'),
      h('flumazenil', 'El flumazenil es un antagonista competitivo del sitio de las benzodiacepinas en el receptor GABA-A.', FLUMA, 'Mechanism of Action'),
      h('flumazenil-riesgo', 'Revertir benzodiacepinas con flumazenil se asocia con convulsiones, sobre todo tras uso prolongado de benzodiacepinas o en intoxicación grave por antidepresivos tricíclicos.', FLUMA, 'Adverse Effects'),
    ],
  },
]

const HECHOS = Object.fromEntries(TEMAS_FUNDAMENTOS.flatMap((t) => t.hechos.map((x) => [x.id, { ...x, tema: t.id }])))

function q(hecho, pregunta, correcta, distractores, explicacion) {
  const x = HECHOS[hecho]
  if (!x) throw new Error(`Pregunta sobre un hecho inexistente: ${hecho}`)
  return {
    id: `fund-${hecho}`,
    tema: x.tema,
    hecho,
    pregunta,
    opciones: [correcta, ...distractores],
    correcta: 0,
    explicacion: `${explicacion} Fuente: ${x.fuente.documento}, ${x.fuente.seccion}.`,
  }
}

export const PREGUNTAS_FUNDAMENTOS = [
  q('medicamento', 'Según la Ley General de Salud, ¿qué distingue a un medicamento?',
    'Tiene efecto terapéutico, preventivo o rehabilitatorio y se presenta en forma farmacéutica',
    ['Es cualquier sustancia que produce efectos tóxicos e irreversibles', 'Es la sustancia activa pura, sin forma farmacéutica', 'Es solo el producto de patente, nunca el genérico'],
    'La forma farmacéutica es lo que convierte la sustancia en medicamento.'),
  q('farmaco', 'Según la Ley General de Salud, un fármaco es…',
    'La sustancia con actividad farmacológica que no se presenta en forma farmacéutica',
    ['El producto terminado en tabletas o ampolletas', 'Cualquier sustancia tóxica exógena', 'El nombre comercial de un medicamento'],
    'El fármaco puede usarse como medicamento o como ingrediente de uno.'),
  q('farmacologia', '¿Cuál es la definición de farmacología?',
    'El estudio de los fármacos, sus propiedades y acciones, y sus efectos en los organismos vivos',
    ['La ciencia que calcula la caducidad de los fármacos', 'El estudio exclusivo de los efectos adversos de plantas medicinales', 'La técnica de preparar diluciones'],
    'Es una ciencia amplia: origen, naturaleza, propiedades y acciones de los fármacos.'),
  q('nombres', 'En México, ¿qué denominación del medicamento es obligatoria?',
    'La genérica',
    ['La distintiva (comercial)', 'La química', 'Ninguna: basta la marca'],
    'La LGS exige la denominación genérica; la distintiva no puede aludir a su composición ni a su acción.'),
  q('pk-pd', '¿Qué estudia la farmacocinética?',
    'Lo que el organismo le hace al fármaco',
    ['Lo que el fármaco le hace al organismo', 'Solo los efectos adversos', 'La fabricación del medicamento'],
    'Lo que el fármaco le hace al organismo es la farmacodinamia.'),
  q('adme', '¿Qué procesos examina la farmacocinética?',
    'Absorción, distribución, metabolismo y excreción',
    ['Administración, dilución, mezcla y eliminación', 'Absorción, disolución, movimiento y excreción', 'Solo absorción y excreción'],
    'Son los cuatro procesos ADME.'),
  q('higado', '¿Qué órgano realiza la mayor parte del metabolismo de los fármacos?',
    'Hígado', ['Riñones', 'Pulmones', 'Estómago'],
    'El hígado metaboliza en fases I y II; el riñón es sobre todo vía de excreción.'),
  q('rinon', '¿Cuál es la vía de excreción más frecuente de los fármacos?',
    'Renal', ['Pulmonar', 'Cutánea', 'Salival'],
    'Algunos fármacos se eliminan por pulmón, piel o tubo digestivo, pero lo más frecuente es el riñón.'),
  q('vida-media', '¿Qué es la vida media de un fármaco?',
    'El tiempo en que su concentración en plasma disminuye 50 %',
    ['El periodo durante el que dura su efecto', 'El momento de su efecto máximo', 'La mitad de su fecha de caducidad'],
    'Es una medida de eliminación, no de duración del efecto.'),
  q('estado-estable', '¿Tras cuántas vidas medias se alcanza el estado estable?',
    '4 a 5', ['1', '2', '10 a 12'],
    'Tras 4-5 vidas medias el aporte y la eliminación se equilibran.'),
  q('biodisponibilidad', '¿Cuál es la biodisponibilidad de un fármaco administrado por vía IV?',
    '100 %', ['50 %', 'Depende del hígado', '25 %'],
    'Por vía IV la dosis entra directo a la circulación sistémica.'),
  q('primer-paso', '¿Qué es el efecto de primer paso?',
    'El metabolismo del fármaco, típicamente hepático, antes de llegar a la circulación sistémica',
    ['El primer efecto adverso de una dosis', 'La primera dosis de carga', 'El paso del fármaco a la placenta'],
    'Reduce la concentración activa; afecta sobre todo a la vía oral.'),
  q('enterales', '¿Qué vía enteral evita el efecto de primer paso?',
    'Sublingual', ['Oral deglutida', 'Por sonda nasogástrica', 'Ninguna vía enteral lo evita'],
    'La sublingual y la bucal absorben el fármaco sin pasar primero por el hígado.'),
  q('parenterales', '¿Qué es la vía parenteral?',
    'La que no utiliza el tubo digestivo',
    ['La que utiliza el tubo digestivo', 'La que utiliza solo el tracto respiratorio', 'La vía oral de liberación prolongada'],
    'Intravenosa, intramuscular y subcutánea son parenterales.'),
  q('ntg-sl', '¿En cuánto tiempo empieza a actuar la nitroglicerina sublingual?',
    'Aproximadamente 1 a 3 minutos', ['10 a 20 minutos', '30 a 60 minutos', 'Más de una hora'],
    'La vía sublingual es rápida.'),
  q('angulo-im', '¿Con qué ángulo se aplica una inyección intramuscular?',
    '90°', ['45°', '15°', '5°'], 'Perpendicular, sobre el vientre de un músculo grande.'),
  q('angulo-sc', '¿Con qué ángulo se aplica una inyección subcutánea?',
    '45°', ['90° sin pliegue', '5-15°', '180°'], 'A 45° sobre el pliegue de piel.'),
  q('angulo-id', '¿Con qué ángulo se aplica una inyección intradérmica?',
    '5-15°', ['45°', '90°', '60°'], 'Casi paralela a la piel, con el bisel visible.'),
  q('angulo-iv', '¿Cómo se introduce la aguja de un catéter venoso periférico?',
    'Con un ángulo bajo, menor de 45°, hasta ver reflujo', ['A 90°', 'A 45° exactos siempre', 'Paralela a la piel y sin buscar reflujo'],
    'El reflujo en la cámara indica que la punta está en la vena.'),
  q('nom-objetivo', '¿Qué regula la NOM-022-SSA3-2012?',
    'La instalación, mantenimiento, vigilancia y retiro de accesos venosos',
    ['La dotación de ambulancias', 'El expediente clínico', 'La prescripción de estupefacientes'],
    'Es la norma de terapia de infusión intravenosa.'),
  q('nom-equipo', 'Según la NOM-022, ¿cada cuánto se cambia el equipo que infunde dextrosa al 50 %?',
    'Cada 24 horas', ['Cada 72 horas', 'Cada 7 días', 'Solo si se obstruye'],
    'Hipertónicas: cada 24 h. Isotónicas e hipotónicas: cada 72 h.'),
  q('nom-rotulo', 'Según la NOM-022, ¿qué debe llevar el rótulo de la solución?',
    'Paciente, fecha, solución, horas de inicio y término, frecuencia y quién la instaló',
    ['Solo el nombre de la solución', 'Solo el nombre comercial', 'La firma del médico y nada más'],
    'La trazabilidad empieza en la etiqueta del envase.'),
  q('nom-registro', 'Según la NOM-022, ¿qué se registra al instalar un catéter?',
    'Fecha, hora, tipo y calibre, sitio, número de intentos, incidentes y quién lo instaló',
    ['Solo el calibre', 'Solo la hora', 'Nada si fue al primer intento'],
    'El número de intentos y los incidentes también se registran.'),
  q('ss09', '¿Cuál de estas soluciones es isotónica?',
    'Cloruro de sodio 0.9 %', ['Cloruro de sodio 0.45 %', 'Cloruro de sodio 3 %', 'Dextrosa 50 %'],
    'El NaCl 0.9 % mide 308 mOsm/L; el Hartmann también es isotónico.'),
  q('ss045', '¿Cómo se clasifica el cloruro de sodio 0.45 %?',
    'Hipotónico', ['Isotónico', 'Hipertónico', 'Coloide'], 'Mide 154 mOsm/L.'),
  q('d5', '¿Cómo se comporta la dextrosa 5 % dentro del organismo?',
    'Como líquido muy hipotónico, porque la glucosa se metaboliza',
    ['Como líquido de reanimación isotónico', 'Como solución hipertónica', 'Como coloide'],
    'Por eso no sirve para reanimar un choque.'),
  q('ss3', '¿Qué efecto tiene una solución hipertónica como el NaCl 3 %?',
    'Saca agua del espacio intracelular', ['Mete agua a las células', 'No mueve agua', 'Solo aporta glucosa'],
    'Su osmolaridad (≈1026 mOsm/L) atrae agua hacia el espacio extracelular.'),
  q('d50', 'Según la NOM-022, ¿cómo se clasifica la dextrosa al 50 %?',
    'Hipertónica', ['Isotónica', 'Hipotónica', 'Coloide'], 'Igual que la dextrosa al 10 % y la NPT.'),
  q('txa', '¿Qué es el ácido tranexámico?',
    'Un antifibrinolítico, análogo de la lisina, que estabiliza el coágulo',
    ['Un anticoagulante', 'Un vasopresor', 'Un antídoto de opioides'],
    'Inhibe la activación del plasminógeno.'),
  q('naloxona', '¿Para qué sirve la naloxona?',
    'Revertir el efecto de los opioides: los desplaza del receptor μ',
    ['Revertir benzodiacepinas', 'Tratar la hipoglucemia', 'Sedar al paciente agitado'],
    'Es un antagonista competitivo de los receptores opioides.'),
  q('naloxona-vm', '¿Por qué se vigila al paciente después de revertir un opioide con naloxona?',
    'Porque la naloxona dura menos que muchos opioides y la depresión respiratoria puede regresar',
    ['Porque la naloxona produce hipoglucemia', 'Porque la naloxona dura más que cualquier opioide', 'No hace falta vigilarlo'],
    'Su vida media es de 30 a 90 minutos.'),
  q('flumazenil-riesgo', '¿Qué riesgo tiene revertir benzodiacepinas con flumazenil?',
    'Convulsiones, sobre todo tras uso prolongado o con tricíclicos',
    ['Hipoglucemia', 'Hipertermia maligna', 'Ninguno'],
    'Por eso no se usa de rutina en toda intoxicación.'),
]
