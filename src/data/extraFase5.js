// FASE 5 — Temas avanzados de transición a Medicina (La Guía de Lin)
// Contenido de nivel preclínico/clínico redactado a profundidad.

export const extraFase5 = [
  // ============================================================
  // 5.5 — CARDIOLOGÍA CLÍNICA
  // ============================================================
  {
    id: 'cardiologia-clinica',
    numero: '5.5',
    titulo: 'Cardiología Clínica',
    icono: '🫀',
    duracion: '58 min',
    resumen:
      'Razonamiento clínico en insuficiencia cardiaca, valvulopatías, hipertensión y miocardiopatías, integrado con la semiología cardiaca a la cabecera del paciente.',
    objetivos: [
      'Clasificar la insuficiencia cardiaca por fracción de eyección y por gravedad funcional.',
      'Reconocer los soplos de las valvulopatías principales y sus maniobras de auscultación.',
      'Estadificar la hipertensión arterial e identificar urgencia y emergencia hipertensiva.',
      'Diferenciar las miocardiopatías dilatada, hipertrófica y restrictiva.',
      'Aplicar la semiología cardiaca para localizar la disfunción cardiaca.',
    ],
    secciones: [
      {
        titulo: 'Insuficiencia cardiaca',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La insuficiencia cardiaca es un sindrome clinico en el que el corazon no logra bombear sangre suficiente para satisfacer las demandas metabolicas del organismo, o lo hace a expensas de presiones de llenado elevadas. No es un diagnostico unico sino el resultado final de muchas enfermedades cardiacas.',
          },
          {
            tipo: 'tabla',
            titulo: 'Clasificacion por fraccion de eyeccion (FEVI)',
            headers: ['Tipo', 'FEVI', 'Mecanismo dominante'],
            filas: [
              ['IC con FEVI reducida (ICFEr)', 'Menor o igual a 40 por ciento', 'Falla de contractilidad (sistolica)'],
              ['IC con FEVI levemente reducida', '41 a 49 por ciento', 'Zona intermedia'],
              ['IC con FEVI preservada (ICFEp)', 'Mayor o igual a 50 por ciento', 'Falla de relajacion (diastolica)'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Manifestaciones segun el ventriculo que falla',
            items: [
              'Falla izquierda: congestion pulmonar. Disnea de esfuerzo, ortopnea, disnea paroxistica nocturna, estertores crepitantes.',
              'Falla derecha: congestion sistemica. Ingurgitacion yugular, hepatomegalia, ascitis, edema de miembros inferiores.',
              'La causa mas frecuente de falla derecha es la falla izquierda previa.',
              'Tercer ruido (R3 o galope ventricular): marcador de sobrecarga de volumen y mal pronostico.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Clasificacion funcional NYHA',
            headers: ['Clase', 'Limitacion', 'Sintomas'],
            filas: [
              ['I', 'Ninguna', 'Asintomatico con actividad ordinaria'],
              ['II', 'Leve', 'Sintomas con esfuerzo moderado'],
              ['III', 'Marcada', 'Sintomas con esfuerzo minimo'],
              ['IV', 'Total', 'Sintomas en reposo'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Peptidos natriureticos',
            texto:
              'El BNP y el NT-proBNP se elevan cuando el miocardio se distiende por sobrecarga de presion o volumen. Son utiles para confirmar o descartar IC ante una disnea de origen incierto; un valor bajo hace muy improbable la IC como causa.',
          },
          {
            tipo: 'lista',
            titulo: 'Pilares del tratamiento de la ICFEr cronica',
            items: [
              'Inhibidores del sistema renina-angiotensina (IECA, ARA II o el inhibidor de neprilisina sacubitrilo-valsartan).',
              'Betabloqueadores con evidencia (carvedilol, bisoprolol, metoprolol succinato).',
              'Antagonistas de mineralocorticoides (espironolactona, eplerenona).',
              'Inhibidores de SGLT2 (dapagliflozina, empagliflozina), beneficio incluso sin diabetes.',
              'Diureticos de asa para el control de la congestion (mejoran sintomas, no mortalidad).',
            ],
          },
        ],
      },
      {
        titulo: 'Valvulopatias',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Las valvulopatias generan soplos por flujo turbulento. La estenosis dificulta la apertura; la insuficiencia o regurgitacion permite el reflujo por cierre incompetente. Localizar el soplo en el ciclo cardiaco (sistole o diastole) es el primer paso del diagnostico.',
          },
          {
            tipo: 'tabla',
            titulo: 'Soplos principales',
            headers: ['Valvulopatia', 'Momento', 'Caracteristicas'],
            filas: [
              ['Estenosis aortica', 'Sistolica', 'Soplo eyectivo en cresciendo-decresciendo, irradia a carotidas, pulso parvus et tardus'],
              ['Insuficiencia aortica', 'Diastolica', 'Soplo decresciente, pulso amplio (saltarino), presion diferencial aumentada'],
              ['Estenosis mitral', 'Diastolica', 'Retumbo con chasquido de apertura, foco mitral en decubito lateral'],
              ['Insuficiencia mitral', 'Sistolica', 'Soplo holosistolico que irradia a axila'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Triada de la estenosis aortica grave',
            texto:
              'Angina, sincope de esfuerzo y disnea por insuficiencia cardiaca. La aparicion de estos sintomas marca un pronostico reservado y suele indicar reemplazo valvular (quirurgico o percutaneo, TAVI).',
          },
          {
            tipo: 'lista',
            titulo: 'Maniobras que modifican los soplos',
            items: [
              'Aumentar el retorno venoso (cuclillas, elevar piernas) intensifica casi todos los soplos.',
              'Maniobra de Valsalva y bipedestacion disminuyen el retorno: aumentan el soplo de la miocardiopatia hipertrofica y del prolapso mitral.',
              'La inspiracion aumenta los soplos del corazon derecho (regla de Rivero-Carvallo).',
            ],
          },
        ],
      },
      {
        titulo: 'Hipertension arterial',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Categorias de presion arterial',
            headers: ['Categoria', 'Sistolica (mmHg)', 'Diastolica (mmHg)'],
            filas: [
              ['Normal', 'Menor a 120', 'y menor a 80'],
              ['Elevada', '120 a 129', 'y menor a 80'],
              ['Hipertension etapa 1', '130 a 139', 'o 80 a 89'],
              ['Hipertension etapa 2', 'Mayor o igual a 140', 'o mayor o igual a 90'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'Mas del 90 por ciento de los casos son hipertension primaria o esencial, sin causa identificable. Las causas secundarias incluyen enfermedad renovascular, hiperaldosteronismo, feocromocitoma, apnea del sueno y coartacion aortica; se sospechan ante inicio temprano, hipertension resistente o datos clinicos especificos.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Urgencia vs emergencia hipertensiva',
            texto:
              'La emergencia hipertensiva cursa con dano agudo de organo blanco (encefalopatia, edema pulmonar, sindrome coronario, diseccion aortica, eclampsia) y requiere reduccion controlada con farmacos intravenosos. La urgencia es presion muy elevada sin dano agudo de organo y se maneja por via oral evitando descensos bruscos.',
          },
          {
            tipo: 'lista',
            titulo: 'Dano de organo blanco cronico',
            items: [
              'Corazon: hipertrofia ventricular izquierda, insuficiencia cardiaca.',
              'Rinon: nefroesclerosis, enfermedad renal cronica.',
              'Cerebro: enfermedad vascular cerebral, deterioro cognitivo.',
              'Ojo: retinopatia hipertensiva.',
              'Vasos: aterosclerosis acelerada, aneurismas.',
            ],
          },
        ],
      },
      {
        titulo: 'Miocardiopatias',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Tipos de miocardiopatia',
            headers: ['Tipo', 'Fisiopatologia', 'Claves'],
            filas: [
              ['Dilatada', 'Dilatacion y falla sistolica', 'Causa mas comun; idiopatica, alcohol, viral, isquemica'],
              ['Hipertrofica', 'Hipertrofia septal asimetrica, obstruccion al tracto de salida', 'Causa de muerte subita en jovenes y atletas; herencia autosomica dominante'],
              ['Restrictiva', 'Pared rigida, falla diastolica', 'Amiloidosis, hemocromatosis, fibrosis'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Miocardiopatia hipertrofica y ejercicio',
            texto:
              'El soplo aumenta con maniobras que reducen la precarga (Valsalva, bipedestacion) porque el ventriculo mas pequeno acentua la obstruccion. Es una causa relevante de sincope y muerte subita durante el esfuerzo en deportistas jovenes.',
          },
        ],
      },
      {
        titulo: 'Semiologia cardiaca',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'corazon',
          },
          {
            tipo: 'lista',
            titulo: 'Focos de auscultacion',
            items: [
              'Aortico: segundo espacio intercostal derecho, borde paraesternal.',
              'Pulmonar: segundo espacio intercostal izquierdo, borde paraesternal.',
              'Tricuspideo: cuarto a quinto espacio intercostal izquierdo, borde paraesternal.',
              'Mitral o apical: quinto espacio intercostal izquierdo, linea medioclavicular.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Ruidos cardiacos',
            items: [
              'R1: cierre de valvulas auriculoventriculares (mitral y tricuspide); inicio de la sistole.',
              'R2: cierre de valvulas semilunares (aortica y pulmonar); inicio de la diastole.',
              'R3: galope ventricular, llenado rapido; normal en jovenes, patologico en sobrecarga de volumen.',
              'R4: galope auricular, contraccion contra ventriculo rigido; sugiere disfuncion diastolica.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Pulso venoso yugular',
            texto:
              'La estimacion de la presion venosa yugular permite valorar la presion de la auricula derecha a la cabecera del paciente. Su elevacion indica congestion sistemica y es signo cardinal de falla derecha.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'ICFEr', definicion: 'Insuficiencia cardiaca con FEVI reducida (menor o igual a 40 por ciento), de origen sistolico.' },
      { termino: 'BNP', definicion: 'Peptido natriuretico que se eleva con la distension miocardica; util para diagnosticar IC.' },
      { termino: 'Estenosis aortica', definicion: 'Obstruccion a la salida del ventriculo izquierdo; triada de angina, sincope y disnea.' },
      { termino: 'Emergencia hipertensiva', definicion: 'Presion muy elevada con dano agudo de organo blanco; requiere tratamiento intravenoso.' },
      { termino: 'Miocardiopatia hipertrofica', definicion: 'Hipertrofia septal asimetrica; causa de muerte subita en jovenes.' },
      { termino: 'R3', definicion: 'Galope ventricular asociado a sobrecarga de volumen e insuficiencia cardiaca.' },
      { termino: 'NYHA', definicion: 'Clasificacion funcional de la IC segun la limitacion a la actividad fisica.' },
    ],
    flashcards: [
      { frente: 'FEVI que define la ICFEr', reverso: 'Menor o igual a 40 por ciento (falla sistolica).' },
      { frente: 'Triada clinica de la estenosis aortica grave', reverso: 'Angina, sincope de esfuerzo y disnea.' },
      { frente: 'Causa mas frecuente de falla cardiaca derecha', reverso: 'La falla cardiaca izquierda previa.' },
      { frente: 'Que diferencia una emergencia de una urgencia hipertensiva', reverso: 'La emergencia tiene dano agudo de organo blanco.' },
      { frente: 'Miocardiopatia asociada a muerte subita en atletas jovenes', reverso: 'La miocardiopatia hipertrofica.' },
      { frente: 'Que valvulas cierran en R2', reverso: 'Las semilunares: aortica y pulmonar.' },
      { frente: 'Regla de Rivero-Carvallo', reverso: 'Los soplos derechos aumentan con la inspiracion.' },
      { frente: 'Grupo de farmacos que reduce mortalidad en ICFEr ademas de IECA y betabloqueador', reverso: 'Antagonistas de mineralocorticoides e inhibidores de SGLT2.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente presenta soplo sistolico eyectivo que irradia a carotidas y pulso parvus et tardus. El diagnostico mas probable es:',
        opciones: ['Insuficiencia mitral', 'Estenosis aortica', 'Insuficiencia aortica', 'Estenosis mitral'],
        correcta: 1,
        explicacion: 'La estenosis aortica produce un soplo sistolico eyectivo que irradia a carotidas y un pulso de ascenso lento y baja amplitud (parvus et tardus).',
      },
      {
        pregunta: 'Cual de los siguientes farmacos mejora sintomas pero NO reduce la mortalidad en la ICFEr cronica:',
        opciones: ['Carvedilol', 'Espironolactona', 'Furosemida', 'Dapagliflozina'],
        correcta: 2,
        explicacion: 'Los diureticos de asa como la furosemida alivian la congestion y los sintomas, pero no han demostrado reducir la mortalidad; los otros tres si.',
      },
      {
        pregunta: 'Una FEVI de 55 por ciento con sintomas claros de insuficiencia cardiaca corresponde a:',
        opciones: ['ICFEr', 'IC con FEVI levemente reducida', 'ICFEp', 'No es insuficiencia cardiaca'],
        correcta: 2,
        explicacion: 'Una FEVI mayor o igual a 50 por ciento con sintomas de IC define la IC con fraccion de eyeccion preservada, de mecanismo diastolico.',
      },
      {
        pregunta: 'El soplo de la miocardiopatia hipertrofica obstructiva tipicamente:',
        opciones: ['Disminuye con la Valsalva', 'Aumenta con la Valsalva', 'No se modifica con maniobras', 'Solo se ausculta en diastole'],
        correcta: 1,
        explicacion: 'La Valsalva reduce la precarga y el tamano ventricular, lo que acentua la obstruccion al tracto de salida y aumenta el soplo.',
      },
      {
        pregunta: 'Paciente con cifra de 210/130 mmHg, cefalea intensa, confusion y papiledema. La conducta correcta es:',
        opciones: ['Tratamiento oral y alta', 'Reduccion intravenosa controlada por emergencia hipertensiva', 'Observacion sin tratamiento', 'Descenso rapido al rango normal'],
        correcta: 1,
        explicacion: 'Hay encefalopatia hipertensiva (dano agudo de organo blanco), por lo que es una emergencia que requiere farmacos intravenosos con descenso controlado, no brusco.',
      },
      {
        pregunta: 'El tercer ruido cardiaco (R3) en un adulto mayor suele indicar:',
        opciones: ['Disfuncion diastolica aislada', 'Sobrecarga de volumen e insuficiencia cardiaca', 'Estenosis aortica', 'Hallazgo siempre normal'],
        correcta: 1,
        explicacion: 'En el adulto el R3 es un galope ventricular asociado a sobrecarga de volumen e insuficiencia cardiaca, con valor pronostico adverso.',
      },
      {
        pregunta: 'Cual de estos signos es propio de la falla cardiaca DERECHA:',
        opciones: ['Estertores crepitantes', 'Ortopnea', 'Ingurgitacion yugular y edema de miembros', 'Disnea paroxistica nocturna'],
        correcta: 2,
        explicacion: 'La falla derecha produce congestion sistemica: ingurgitacion yugular, hepatomegalia y edema; los demas reflejan congestion pulmonar por falla izquierda.',
      },
    ],
  },

  // ============================================================
  // 5.6 — NEUMOLOGÍA CLÍNICA
  // ============================================================
  {
    id: 'neumologia-clinica',
    numero: '5.6',
    titulo: 'Neumologia Clinica',
    icono: '🫁',
    duracion: '57 min',
    resumen:
      'Diagnostico y manejo de asma, EPOC, neumonia, tromboembolia pulmonar y derrame pleural, con el marco de la insuficiencia respiratoria tipo I y tipo II.',
    objetivos: [
      'Diferenciar el asma de la EPOC por reversibilidad y patron clinico.',
      'Reconocer el patron obstructivo y restrictivo en la espirometria.',
      'Aplicar criterios de gravedad en la neumonia adquirida en la comunidad.',
      'Sospechar tromboembolia pulmonar y conocer su abordaje diagnostico.',
      'Distinguir la insuficiencia respiratoria tipo I de la tipo II por gasometria.',
    ],
    secciones: [
      {
        titulo: 'Insuficiencia respiratoria',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'respiratorio',
          },
          {
            tipo: 'tabla',
            titulo: 'Tipos de insuficiencia respiratoria',
            headers: ['', 'Tipo I (hipoxemica)', 'Tipo II (hipercapnica)'],
            filas: [
              ['PaO2', 'Baja (menor a 60 mmHg)', 'Baja'],
              ['PaCO2', 'Normal o baja', 'Elevada (mayor a 45 mmHg)'],
              ['Mecanismo', 'Alteracion ventilacion-perfusion, cortocircuito', 'Falla de la bomba ventilatoria'],
              ['Ejemplos', 'Neumonia, edema pulmonar, SDRA, TEP', 'EPOC avanzada, depresion del centro respiratorio, fatiga muscular'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'La clave es la PaCO2',
            texto:
              'La insuficiencia respiratoria tipo I es un problema de oxigenacion con PaCO2 normal o baja. La tipo II anade retencion de CO2 (hipercapnia), lo que refleja falla de la ventilacion. Esta distincion guia el uso de ventilacion no invasiva.',
          },
          {
            tipo: 'formula',
            texto: 'Gradiente alveolo-arterial = PAO2 menos PaO2 (PAO2 aproximada = FiO2 por 713 menos PaCO2 entre 0.8)',
            nota: 'Un gradiente A-a normal con hipoxemia sugiere hipoventilacion o baja FiO2; un gradiente elevado sugiere enfermedad del parenquima o cortocircuito.',
          },
        ],
      },
      {
        titulo: 'Asma',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El asma es una enfermedad inflamatoria cronica de la via aerea con hiperreactividad bronquial y obstruccion reversible al flujo. Cursa con episodios de disnea, sibilancias, tos y opresion toracica, frecuentemente nocturnos o desencadenados por alergenos, ejercicio o infecciones.',
          },
          {
            tipo: 'lista',
            titulo: 'Datos de crisis asmatica grave',
            items: [
              'Dificultad para completar frases, uso de musculos accesorios.',
              'Frecuencia respiratoria muy alta o, en fase tardia, silencio auscultatorio (torax silente).',
              'Saturacion baja, agotamiento, alteracion del estado de conciencia.',
              'Una PaCO2 normal o elevada en una crisis grave es signo de alarma de fatiga inminente.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo de la crisis asmatica',
            items: [
              'Oxigeno para mantener saturacion adecuada.',
              'Broncodilatadores beta2 de accion corta inhalados (salbutamol), repetidos o nebulizados.',
              'Anticolinergico inhalado (bromuro de ipratropio) en crisis moderada a grave.',
              'Corticoesteroides sistemicos tempranos para reducir la inflamacion.',
              'Sulfato de magnesio intravenoso en crisis grave que no responde.',
            ],
          },
        ],
      },
      {
        titulo: 'EPOC',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La enfermedad pulmonar obstructiva cronica es una limitacion persistente y poco reversible al flujo aereo, ligada principalmente al tabaquismo. Engloba la bronquitis cronica (tos productiva cronica) y el enfisema (destruccion alveolar).',
          },
          {
            tipo: 'tabla',
            titulo: 'Asma vs EPOC',
            headers: ['Rasgo', 'Asma', 'EPOC'],
            filas: [
              ['Reversibilidad', 'Marcada con broncodilatador', 'Escasa o ausente'],
              ['Edad de inicio', 'Frecuente en jovenes', 'Generalmente mayores de 40'],
              ['Factor principal', 'Atopia, alergenos', 'Tabaquismo'],
              ['Curso', 'Episodico, variable', 'Progresivo y persistente'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Oxigeno en el retenedor de CO2',
            texto:
              'En la EPOC con insuficiencia tipo II se debe titular el oxigeno a una saturacion meta moderada (alrededor de 88 a 92 por ciento). El exceso de oxigeno puede empeorar la hipercapnia; el objetivo es corregir la hipoxemia sin abolir el estimulo respiratorio ni alterar la relacion ventilacion-perfusion.',
          },
          {
            tipo: 'lista',
            titulo: 'Exacerbacion de EPOC',
            items: [
              'Aumento de disnea, volumen o purulencia del esputo.',
              'Broncodilatadores de accion corta y corticoesteroides sistemicos.',
              'Antibiotico si hay datos de infeccion bacteriana (esputo purulento).',
              'Ventilacion no invasiva (BiPAP) si hay acidosis respiratoria por hipercapnia.',
            ],
          },
        ],
      },
      {
        titulo: 'Neumonia y derrame pleural',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La neumonia es la infeccion del parenquima pulmonar. Cursa con fiebre, tos, expectoracion, disnea y dolor pleuritico, con estertores y consolidacion en la exploracion. El neumococo (Streptococcus pneumoniae) es el agente mas frecuente de la neumonia adquirida en la comunidad.',
          },
          {
            tipo: 'lista',
            titulo: 'Escala CURB-65 de gravedad',
            items: [
              'C: confusion.',
              'U: urea elevada.',
              'R: frecuencia respiratoria mayor o igual a 30.',
              'B: presion arterial baja (sistolica menor a 90 o diastolica menor o igual a 60).',
              '65: edad mayor o igual a 65 anos. A mayor puntaje, mayor mortalidad y necesidad de hospitalizacion.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Derrame pleural: criterios de Light (es exudado si cumple uno)',
            headers: ['Cociente', 'Punto de corte'],
            filas: [
              ['Proteinas pleural / serica', 'Mayor a 0.5'],
              ['DHL pleural / serica', 'Mayor a 0.6'],
              ['DHL pleural', 'Mayor a dos tercios del limite superior serico'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Trasudado vs exudado',
            texto:
              'El trasudado refleja desequilibrio de presiones (insuficiencia cardiaca, cirrosis, sindrome nefrotico). El exudado refleja inflamacion o aumento de permeabilidad (infeccion, neoplasia, embolia). Los criterios de Light separan ambos.',
          },
        ],
      },
      {
        titulo: 'Tromboembolia pulmonar',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La tromboembolia pulmonar (TEP) es la oclusion de la arteria pulmonar o sus ramas por un trombo, casi siempre procedente de una trombosis venosa profunda de miembros inferiores. Es una causa de insuficiencia respiratoria tipo I con gradiente A-a elevado.',
          },
          {
            tipo: 'lista',
            titulo: 'Factores de riesgo (triada de Virchow)',
            items: [
              'Estasis: inmovilizacion, viajes prolongados, hospitalizacion.',
              'Lesion endotelial: cirugia, trauma, cateteres.',
              'Hipercoagulabilidad: cancer, embarazo, anticonceptivos, trombofilias.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Abordaje diagnostico',
            items: [
              'Estimar la probabilidad clinica (por ejemplo, escala de Wells).',
              'Probabilidad baja: dimero D; si es negativo, descarta TEP.',
              'Probabilidad alta o dimero D positivo: angiotomografia de torax (estudio confirmatorio).',
              'En el inestable o con falla renal, considerar gammagrafia V/Q o ecocardiograma.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'TEP masiva',
            texto:
              'La TEP con inestabilidad hemodinamica (hipotension o choque) por falla aguda del ventriculo derecho es candidata a trombolisis. El resto se maneja con anticoagulacion. La taquicardia y la hipoxemia con radiografia casi normal deben hacer sospechar TEP.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Insuficiencia respiratoria tipo I', definicion: 'Hipoxemia con PaCO2 normal o baja; problema de oxigenacion.' },
      { termino: 'Insuficiencia respiratoria tipo II', definicion: 'Hipoxemia con hipercapnia; falla de la ventilacion.' },
      { termino: 'Gradiente A-a', definicion: 'Diferencia alveolo-arterial de oxigeno; elevada en enfermedad del parenquima o cortocircuito.' },
      { termino: 'CURB-65', definicion: 'Escala de gravedad de la neumonia adquirida en la comunidad.' },
      { termino: 'Criterios de Light', definicion: 'Diferencian exudado de trasudado en el liquido pleural.' },
      { termino: 'Triada de Virchow', definicion: 'Estasis, lesion endotelial e hipercoagulabilidad; base de la trombosis.' },
      { termino: 'Dimero D', definicion: 'Producto de degradacion de la fibrina; util por su alto valor predictivo negativo en TEP.' },
    ],
    flashcards: [
      { frente: 'Que define a la insuficiencia respiratoria tipo II', reverso: 'Hipoxemia con hipercapnia (PaCO2 mayor a 45 mmHg).' },
      { frente: 'Diferencia clave entre asma y EPOC', reverso: 'El asma es reversible con broncodilatador; la EPOC apenas o nada.' },
      { frente: 'Agente mas frecuente de neumonia adquirida en la comunidad', reverso: 'Streptococcus pneumoniae (neumococo).' },
      { frente: 'Que significa una PaCO2 normal en una crisis asmatica grave', reverso: 'Signo de alarma: fatiga muscular inminente.' },
      { frente: 'Saturacion meta de oxigeno en el retenedor de CO2', reverso: 'Aproximadamente 88 a 92 por ciento.' },
      { frente: 'Estudio confirmatorio de TEP', reverso: 'Angiotomografia de torax.' },
      { frente: 'Para que sirve el dimero D en TEP', reverso: 'Para descartarla por su alto valor predictivo negativo (probabilidad baja).' },
      { frente: 'Origen mas frecuente del trombo en una TEP', reverso: 'Trombosis venosa profunda de miembros inferiores.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con EPOC tiene PaO2 de 52 mmHg y PaCO2 de 58 mmHg. Esto corresponde a:',
        opciones: ['Insuficiencia respiratoria tipo I', 'Insuficiencia respiratoria tipo II', 'Gasometria normal', 'Alcalosis respiratoria'],
        correcta: 1,
        explicacion: 'La combinacion de hipoxemia con hipercapnia (PaCO2 elevada) define la insuficiencia respiratoria tipo II por falla ventilatoria.',
      },
      {
        pregunta: 'En una crisis asmatica grave, una PaCO2 que ha pasado de baja a normal indica:',
        opciones: ['Que la crisis esta cediendo', 'Buena oxigenacion', 'Fatiga muscular y riesgo de paro respiratorio', 'Error de laboratorio'],
        correcta: 2,
        explicacion: 'En la crisis grave inicial la PaCO2 esta baja por hiperventilacion; su normalizacion o ascenso anuncia agotamiento muscular y falla ventilatoria inminente.',
      },
      {
        pregunta: 'Un liquido pleural con cociente de proteinas pleural/serica de 0.7 se clasifica como:',
        opciones: ['Trasudado', 'Exudado', 'Quilotorax', 'Hemotorax'],
        correcta: 1,
        explicacion: 'Por los criterios de Light, un cociente de proteinas mayor a 0.5 cumple criterio de exudado.',
      },
      {
        pregunta: 'Paciente postoperado con disnea subita, taquicardia, hipoxemia y radiografia de torax casi normal. La sospecha principal es:',
        opciones: ['Neumonia', 'Tromboembolia pulmonar', 'EPOC descompensada', 'Asma'],
        correcta: 1,
        explicacion: 'La disnea e hipoxemia subitas con radiografia normal en un paciente con factores de riesgo (cirugia, inmovilidad) son tipicas de TEP.',
      },
      {
        pregunta: 'Cual es la conducta correcta al administrar oxigeno a un retenedor cronico de CO2:',
        opciones: ['Oxigeno al 100 por ciento siempre', 'Titular a saturacion de 88 a 92 por ciento', 'No administrar oxigeno', 'Saturacion meta de 100 por ciento'],
        correcta: 1,
        explicacion: 'Se titula a una saturacion moderada para corregir la hipoxemia sin agravar la hipercapnia ni alterar la relacion ventilacion-perfusion.',
      },
      {
        pregunta: 'Cual de los siguientes es un componente de la escala CURB-65:',
        opciones: ['Saturacion de oxigeno', 'Frecuencia respiratoria mayor o igual a 30', 'Temperatura', 'Leucocitosis'],
        correcta: 1,
        explicacion: 'CURB-65 incluye confusion, urea, frecuencia respiratoria mayor o igual a 30, presion baja y edad mayor o igual a 65 anos.',
      },
      {
        pregunta: 'Una TEP con hipotension sostenida y falla del ventriculo derecho es candidata a:',
        opciones: ['Solo observacion', 'Anticoagulacion oral ambulatoria', 'Trombolisis', 'Diureticos'],
        correcta: 2,
        explicacion: 'La TEP masiva con inestabilidad hemodinamica justifica la trombolisis; la TEP estable se trata con anticoagulacion.',
      },
    ],
  },

  // ============================================================
  // 5.7 — NEFROLOGÍA Y ÁCIDO-BASE AVANZADO
  // ============================================================
  {
    id: 'nefrologia-acidobase',
    numero: '5.7',
    titulo: 'Nefrologia y Trastornos Acido-Base Avanzados',
    icono: '🧪',
    duracion: '60 min',
    resumen:
      'Lesion renal aguda, enfermedad renal cronica y el analisis sistematico de los trastornos acido-base con anion gap, delta gap y reconocimiento de trastornos mixtos.',
    objetivos: [
      'Clasificar la lesion renal aguda en prerrenal, renal e posrenal.',
      'Estadificar la enfermedad renal cronica por filtrado glomerular.',
      'Calcular e interpretar el anion gap y el delta gap.',
      'Determinar la compensacion esperada de cada trastorno acido-base.',
      'Reconocer los trastornos acido-base mixtos.',
    ],
    secciones: [
      {
        titulo: 'Anatomia funcional de la nefrona',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'nefrona',
          },
          {
            tipo: 'p',
            texto:
              'La nefrona es la unidad funcional del rinon. Filtra el plasma en el glomerulo y procesa el ultrafiltrado a lo largo del tubulo, reabsorbiendo agua y solutos y secretando productos de desecho e iones para regular el equilibrio hidroelectrolitico y acido-base.',
          },
          {
            tipo: 'lista',
            titulo: 'Segmentos y funciones',
            items: [
              'Tubulo proximal: reabsorbe la mayor parte de sodio, glucosa, bicarbonato y aminoacidos.',
              'Asa de Henle: crea el gradiente medular; diana de los diureticos de asa.',
              'Tubulo distal: ajuste fino de sodio; diana de las tiazidas.',
              'Tubulo colector: accion de aldosterona y hormona antidiuretica; secrecion de potasio e hidrogeno.',
            ],
          },
        ],
      },
      {
        titulo: 'Lesion renal aguda',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Clasificacion etiologica de la LRA',
            headers: ['Tipo', 'Mecanismo', 'Ejemplos'],
            filas: [
              ['Prerrenal', 'Hipoperfusion renal', 'Deshidratacion, hemorragia, insuficiencia cardiaca, sepsis'],
              ['Renal o intrinseca', 'Dano del parenquima', 'Necrosis tubular aguda, glomerulonefritis, nefritis intersticial'],
              ['Posrenal', 'Obstruccion del flujo', 'Litiasis, hiperplasia prostatica, tumores'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Prerrenal vs necrosis tubular aguda',
            headers: ['Indice', 'Prerrenal', 'Necrosis tubular'],
            filas: [
              ['Fraccion excretada de sodio', 'Menor a 1 por ciento', 'Mayor a 2 por ciento'],
              ['Sodio urinario', 'Bajo', 'Alto'],
              ['Cociente urea/creatinina', 'Elevado (mayor a 20)', 'Normal'],
              ['Sedimento urinario', 'Limpio o cilindros hialinos', 'Cilindros granulosos pardos'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Logica de la fraccion excretada de sodio',
            texto:
              'En la LRA prerrenal el rinon esta sano y retiene avidamente sodio para conservar volumen, por lo que la fraccion excretada es baja. En la necrosis tubular el tubulo esta danado y no puede reabsorber sodio, por lo que lo excreta.',
          },
          {
            tipo: 'lista',
            titulo: 'Indicaciones urgentes de dialisis (regla AEIOU)',
            items: [
              'A: acidosis metabolica grave refractaria.',
              'E: alteraciones electroliticas, sobre todo hiperpotasemia refractaria.',
              'I: intoxicaciones por toxinas dializables.',
              'O: sobrecarga de volumen (overload) refractaria.',
              'U: uremia sintomatica (encefalopatia, pericarditis).',
            ],
          },
        ],
      },
      {
        titulo: 'Enfermedad renal cronica',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Estadios de ERC por filtrado glomerular (mL/min/1.73 m2)',
            headers: ['Estadio', 'FG', 'Descripcion'],
            filas: [
              ['G1', 'Mayor o igual a 90', 'Dano renal con FG normal'],
              ['G2', '60 a 89', 'Descenso leve'],
              ['G3a / G3b', '45 a 59 / 30 a 44', 'Descenso moderado'],
              ['G4', '15 a 29', 'Descenso grave'],
              ['G5', 'Menor a 15', 'Falla renal (terminal)'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Complicaciones de la ERC',
            items: [
              'Anemia por deficit de eritropoyetina.',
              'Enfermedad mineral osea: hiperfosfatemia, hipocalcemia, hiperparatiroidismo secundario.',
              'Acidosis metabolica cronica.',
              'Hiperpotasemia y sobrecarga de volumen.',
              'Riesgo cardiovascular muy elevado.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Causas mas frecuentes de ERC',
            texto:
              'La diabetes mellitus y la hipertension arterial son las dos causas mas frecuentes de enfermedad renal cronica. El control estricto de ambas y el bloqueo del sistema renina-angiotensina enlentecen su progresion.',
          },
        ],
      },
      {
        titulo: 'Trastornos acido-base: abordaje sistematico',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'acidobase',
          },
          {
            tipo: 'pasos',
            titulo: 'Pasos para analizar una gasometria',
            items: [
              'Mirar el pH: acidemia (menor a 7.35) o alcalemia (mayor a 7.45).',
              'Identificar el trastorno primario por PaCO2 y bicarbonato.',
              'Si es acidosis metabolica, calcular el anion gap.',
              'Verificar la compensacion esperada.',
              'Si la compensacion no es la esperada, sospechar trastorno mixto.',
              'Si hay anion gap elevado, calcular el delta gap.',
            ],
          },
          {
            tipo: 'formula',
            texto: 'Anion gap = Na menos (Cl mas HCO3). Normal aproximado: 8 a 12 mEq/L',
            nota: 'Debe corregirse por la albumina: por cada gramo de albumina por debajo de 4 g/dL, sumar 2.5 al anion gap.',
          },
          {
            tipo: 'tabla',
            titulo: 'Causas de acidosis metabolica',
            headers: ['Anion gap elevado', 'Anion gap normal (hipercloremica)'],
            filas: [
              ['Cetoacidosis (diabetica, alcoholica)', 'Diarrea (perdida de bicarbonato)'],
              ['Acidosis lactica', 'Acidosis tubular renal'],
              ['Uremia (falla renal)', 'Inhibidores de anhidrasa carbonica'],
              ['Toxinas (metanol, etilenglicol, salicilatos)', 'Reposicion con solucion salina excesiva'],
            ],
          },
          {
            tipo: 'formula',
            texto: 'Compensacion en acidosis metabolica (formula de Winter): PaCO2 esperada = 1.5 por HCO3 mas 8 (mas o menos 2)',
            nota: 'Si la PaCO2 medida es mayor que la esperada, coexiste acidosis respiratoria; si es menor, coexiste alcalosis respiratoria.',
          },
        ],
      },
      {
        titulo: 'Delta gap y trastornos mixtos',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El delta gap compara cuanto subio el anion gap con cuanto bajo el bicarbonato. Sirve para detectar un segundo trastorno metabolico oculto detras de una acidosis con anion gap elevado.',
          },
          {
            tipo: 'formula',
            texto: 'Delta ratio = (anion gap medido menos 12) entre (24 menos HCO3 medido)',
            nota: 'Menor a 1: acidosis mixta con anion gap elevado y con anion gap normal. Entre 1 y 2: acidosis pura con anion gap elevado. Mayor a 2: coexiste alcalosis metabolica o acidosis respiratoria cronica.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Trastornos mixtos',
            texto:
              'Un trastorno mixto es la coexistencia de dos o mas alteraciones acido-base. Se sospecha cuando la compensacion no se ajusta a lo esperado o cuando el delta gap se sale del rango. Un ejemplo clasico es el paciente con cetoacidosis diabetica (anion gap alto) que tambien vomita (alcalosis metabolica).',
          },
          {
            tipo: 'tabla',
            titulo: 'Resumen de trastornos primarios',
            headers: ['Trastorno', 'pH', 'Alteracion primaria'],
            filas: [
              ['Acidosis metabolica', 'Bajo', 'HCO3 bajo'],
              ['Alcalosis metabolica', 'Alto', 'HCO3 alto'],
              ['Acidosis respiratoria', 'Bajo', 'PaCO2 alta'],
              ['Alcalosis respiratoria', 'Alto', 'PaCO2 baja'],
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'LRA prerrenal', definicion: 'Lesion renal por hipoperfusion con rinon estructuralmente sano; FENa menor a 1 por ciento.' },
      { termino: 'Necrosis tubular aguda', definicion: 'LRA intrinseca por dano tubular; FENa mayor a 2 por ciento y cilindros granulosos.' },
      { termino: 'Anion gap', definicion: 'Na menos (Cl mas HCO3); separa acidosis metabolicas por su causa.' },
      { termino: 'Formula de Winter', definicion: 'Calcula la PaCO2 esperada en la acidosis metabolica para evaluar la compensacion.' },
      { termino: 'Delta gap', definicion: 'Compara el aumento del anion gap con la caida del bicarbonato; detecta trastornos mixtos.' },
      { termino: 'Trastorno mixto', definicion: 'Coexistencia de dos o mas alteraciones acido-base.' },
      { termino: 'AEIOU', definicion: 'Regla de indicaciones urgentes de dialisis.' },
    ],
    flashcards: [
      { frente: 'Formula del anion gap', reverso: 'Na menos (Cl mas HCO3); normal 8 a 12 mEq/L.' },
      { frente: 'FENa en la LRA prerrenal', reverso: 'Menor a 1 por ciento (el rinon retiene sodio).' },
      { frente: 'Formula de Winter', reverso: 'PaCO2 esperada = 1.5 por HCO3 mas 8 (mas o menos 2).' },
      { frente: 'Dos causas mas frecuentes de ERC', reverso: 'Diabetes mellitus e hipertension arterial.' },
      { frente: 'Como se corrige el anion gap por la albumina', reverso: 'Sumar 2.5 por cada g/dL de albumina por debajo de 4.' },
      { frente: 'FG que define la ERC estadio G5 (terminal)', reverso: 'Menor a 15 mL/min/1.73 m2.' },
      { frente: 'Ejemplo de causa de acidosis metabolica con anion gap normal', reverso: 'Diarrea (perdida de bicarbonato) o acidosis tubular renal.' },
      { frente: 'Que significa un delta ratio mayor a 2', reverso: 'Coexiste alcalosis metabolica o acidosis respiratoria cronica.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con sodio 140, cloro 100 y bicarbonato 14 tiene un anion gap de:',
        opciones: ['12', '26', '54', '14'],
        correcta: 1,
        explicacion: 'Anion gap = 140 menos (100 mas 14) = 26, que esta elevado e indica acidosis metabolica con anion gap aumentado.',
      },
      {
        pregunta: 'Una LRA con fraccion excretada de sodio menor a 1 por ciento y cociente urea/creatinina elevado sugiere:',
        opciones: ['Necrosis tubular aguda', 'Causa prerrenal', 'Causa posrenal', 'Glomerulonefritis'],
        correcta: 1,
        explicacion: 'La avida retencion de sodio (FENa baja) con cociente urea/creatinina alto refleja un rinon sano que conserva volumen: patron prerrenal.',
      },
      {
        pregunta: 'En una acidosis metabolica con HCO3 de 12, la formula de Winter predice una PaCO2 esperada de aproximadamente:',
        opciones: ['40 mmHg', '26 mmHg', '50 mmHg', '12 mmHg'],
        correcta: 1,
        explicacion: 'PaCO2 esperada = 1.5 por 12 mas 8 = 26 mmHg. Si la PaCO2 real es muy distinta, hay un trastorno respiratorio agregado.',
      },
      {
        pregunta: 'Cual de estas es causa de acidosis metabolica con anion gap NORMAL:',
        opciones: ['Cetoacidosis diabetica', 'Acidosis lactica', 'Diarrea', 'Intoxicacion por metanol'],
        correcta: 2,
        explicacion: 'La diarrea provoca perdida de bicarbonato y acidosis hipercloremica con anion gap normal; las demas opciones elevan el anion gap.',
      },
      {
        pregunta: 'Cual es una indicacion URGENTE de dialisis segun la regla AEIOU:',
        opciones: ['Creatinina elevada estable', 'Hiperpotasemia refractaria', 'Proteinuria leve', 'Anemia cronica'],
        correcta: 1,
        explicacion: 'La hiperpotasemia refractaria es la E de AEIOU; otras son acidosis grave, intoxicaciones, sobrecarga de volumen y uremia sintomatica.',
      },
      {
        pregunta: 'Un paciente con cetoacidosis diabetica que ademas vomita de forma persistente probablemente tenga:',
        opciones: ['Solo acidosis metabolica', 'Trastorno mixto (acidosis con anion gap mas alcalosis metabolica)', 'Solo alcalosis respiratoria', 'Gasometria normal'],
        correcta: 1,
        explicacion: 'La cetoacidosis aumenta el anion gap mientras el vomito genera alcalosis metabolica; coexisten dos trastornos, lo que el delta gap ayuda a desenmascarar.',
      },
      {
        pregunta: 'En la necrosis tubular aguda, el sedimento urinario tipico muestra:',
        opciones: ['Cilindros hialinos', 'Cilindros granulosos pardos', 'Sedimento limpio', 'Cristales de cistina'],
        correcta: 1,
        explicacion: 'La necrosis tubular aguda se caracteriza por cilindros granulosos pardos (cilindros de celulas tubulares) en el sedimento urinario.',
      },
    ],
  },

  // ============================================================
  // 5.8 — ENDOCRINOLOGÍA CLÍNICA
  // ============================================================
  {
    id: 'endocrinologia-clinica',
    numero: '5.8',
    titulo: 'Endocrinologia Clinica',
    icono: '⚗️',
    duracion: '58 min',
    resumen:
      'Diabetes y sus emergencias (CAD y EHH), enfermedad tiroidea, patologia suprarrenal y la regulacion del eje hipotalamo-hipofisis.',
    objetivos: [
      'Diagnosticar diabetes mellitus y diferenciar tipo 1 de tipo 2.',
      'Distinguir la cetoacidosis diabetica del estado hiperosmolar.',
      'Reconocer hipertiroidismo e hipotiroidismo y sus crisis.',
      'Identificar insuficiencia suprarrenal y sindrome de Cushing.',
      'Explicar la retroalimentacion del eje hipotalamo-hipofisis.',
    ],
    secciones: [
      {
        titulo: 'El eje hipotalamo-hipofisis',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'endocrino',
          },
          {
            tipo: 'p',
            texto:
              'El hipotalamo libera hormonas que regulan la hipofisis, la cual a su vez controla glandulas perifericas como tiroides, suprarrenales y gonadas. La hormona producida en la periferia inhibe los niveles superiores: este es el principio de la retroalimentacion negativa.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Logica de la retroalimentacion',
            texto:
              'En un trastorno primario (de la glandula periferica), la hormona hipofisaria se mueve en direccion opuesta. Ejemplo: en el hipotiroidismo primario la T4 esta baja y la TSH alta. En un trastorno central (hipofisario), ambas van en la misma direccion.',
          },
        ],
      },
      {
        titulo: 'Diabetes mellitus',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Criterios diagnosticos de diabetes',
            headers: ['Prueba', 'Punto de corte'],
            filas: [
              ['Glucosa en ayuno', 'Mayor o igual a 126 mg/dL'],
              ['Glucosa a las 2 h en curva', 'Mayor o igual a 200 mg/dL'],
              ['Hemoglobina glucosilada (HbA1c)', 'Mayor o igual a 6.5 por ciento'],
              ['Glucosa al azar con sintomas', 'Mayor o igual a 200 mg/dL'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Diabetes tipo 1 vs tipo 2',
            headers: ['Rasgo', 'Tipo 1', 'Tipo 2'],
            filas: [
              ['Mecanismo', 'Destruccion autoinmune de celulas beta', 'Resistencia a la insulina'],
              ['Insulina', 'Deficiencia absoluta', 'Relativa, inicialmente alta'],
              ['Edad tipica', 'Ninos y jovenes', 'Adultos (en aumento en jovenes)'],
              ['Tendencia a cetosis', 'Alta (CAD)', 'Baja (mas EHH)'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'La HbA1c refleja el promedio de glucemia de los ultimos dos a tres meses, ya que mide la glucosilacion irreversible de la hemoglobina. La meta de control suele ser menor a 7 por ciento, individualizada segun el paciente.',
          },
        ],
      },
      {
        titulo: 'Emergencias hiperglucemicas',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'CAD vs estado hiperosmolar (EHH)',
            headers: ['Rasgo', 'Cetoacidosis (CAD)', 'Estado hiperosmolar (EHH)'],
            filas: [
              ['Tipo de diabetes', 'Mas tipo 1', 'Mas tipo 2'],
              ['Glucosa', 'Alta (mayor a 250)', 'Muy alta (a menudo mayor a 600)'],
              ['Cetonas / acidosis', 'Si, anion gap elevado', 'Minimas o ausentes'],
              ['Osmolaridad', 'Variable', 'Muy elevada'],
              ['Estado mental', 'Variable', 'Mas deterioro'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo de la cetoacidosis diabetica',
            items: [
              'Reposicion intensa de liquidos intravenosos (la deshidratacion es enorme).',
              'Insulina intravenosa en infusion continua.',
              'Vigilar y reponer potasio: cae al entrar a la celula con la insulina.',
              'Buscar y tratar el desencadenante (infeccion, omision de insulina, evento cardiaco).',
              'No suspender la insulina hasta resolver la cetosis y traslapar a insulina subcutanea.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El potasio en la CAD',
            texto:
              'El potasio serico puede estar normal o alto al ingreso pese a un deficit corporal total. Al iniciar insulina el potasio entra a las celulas y puede caer peligrosamente. Si el potasio inicial es bajo, primero se repone y luego se inicia insulina.',
          },
        ],
      },
      {
        titulo: 'Tiroides',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Hipertiroidismo vs hipotiroidismo',
            headers: ['Rasgo', 'Hipertiroidismo', 'Hipotiroidismo'],
            filas: [
              ['Metabolismo', 'Acelerado', 'Enlentecido'],
              ['Peso', 'Perdida', 'Aumento'],
              ['Termorregulacion', 'Intolerancia al calor', 'Intolerancia al frio'],
              ['Frecuencia cardiaca', 'Taquicardia', 'Bradicardia'],
              ['Causa frecuente', 'Enfermedad de Graves', 'Tiroiditis de Hashimoto'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Crisis tiroideas',
            texto:
              'La tormenta tiroidea es un hipertiroidismo extremo con fiebre, taquicardia, agitacion y falla multiorganica; se trata con betabloqueador, tionamidas, yodo y corticoesteroide. El coma mixedematoso es el hipotiroidismo grave con hipotermia, bradicardia y estupor; ambos son emergencias.',
          },
          {
            tipo: 'lista',
            titulo: 'Interpretacion de la TSH',
            items: [
              'Hipotiroidismo primario: TSH alta, T4 baja.',
              'Hipertiroidismo primario: TSH baja, T4 alta.',
              'La TSH es la prueba de tamizaje mas sensible de la funcion tiroidea.',
            ],
          },
        ],
      },
      {
        titulo: 'Glandula suprarrenal',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Insuficiencia suprarrenal vs Cushing',
            headers: ['Rasgo', 'Insuficiencia (Addison)', 'Exceso (Cushing)'],
            filas: [
              ['Cortisol', 'Bajo', 'Alto'],
              ['Presion arterial', 'Hipotension', 'Hipertension'],
              ['Glucosa', 'Tendencia a hipoglucemia', 'Hiperglucemia'],
              ['Piel', 'Hiperpigmentacion (si es primaria)', 'Estrias, fragilidad, equimosis'],
              ['Electrolitos', 'Hiponatremia, hiperpotasemia', 'Hipopotasemia'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Crisis suprarrenal',
            texto:
              'La insuficiencia suprarrenal aguda cursa con hipotension que no responde a liquidos ni vasopresores, hiponatremia e hiperpotasemia. Es una emergencia que requiere hidrocortisona intravenosa inmediata y reposicion de volumen.',
          },
          {
            tipo: 'p',
            texto:
              'La causa mas frecuente de sindrome de Cushing es la administracion exogena de corticoesteroides. La suspension brusca de esteroides cronicos puede precipitar una crisis suprarrenal por supresion del eje.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'HbA1c', definicion: 'Promedio glucemico de 2 a 3 meses; diagnostico de diabetes con valor mayor o igual a 6.5 por ciento.' },
      { termino: 'Cetoacidosis diabetica', definicion: 'Emergencia con hiperglucemia, cetonas y acidosis con anion gap; mas frecuente en tipo 1.' },
      { termino: 'Estado hiperosmolar', definicion: 'Hiperglucemia extrema con osmolaridad muy alta y sin cetoacidosis significativa; mas en tipo 2.' },
      { termino: 'TSH', definicion: 'Hormona estimulante de la tiroides; prueba mas sensible de la funcion tiroidea.' },
      { termino: 'Tormenta tiroidea', definicion: 'Hipertiroidismo extremo con fiebre, taquicardia y falla organica; emergencia.' },
      { termino: 'Enfermedad de Addison', definicion: 'Insuficiencia suprarrenal primaria con cortisol bajo, hipotension e hiperpigmentacion.' },
      { termino: 'Retroalimentacion negativa', definicion: 'La hormona periferica inhibe a hipotalamo e hipofisis para mantener el equilibrio.' },
    ],
    flashcards: [
      { frente: 'Valor de HbA1c que diagnostica diabetes', reverso: 'Mayor o igual a 6.5 por ciento.' },
      { frente: 'Diferencia clave entre CAD y EHH', reverso: 'La CAD tiene cetoacidosis con anion gap; el EHH no, pero la osmolaridad es muy alta.' },
      { frente: 'Por que el potasio puede caer al tratar la CAD', reverso: 'La insulina mete el potasio a las celulas.' },
      { frente: 'Patron de laboratorio del hipotiroidismo primario', reverso: 'TSH alta y T4 baja.' },
      { frente: 'Causa mas frecuente de hipertiroidismo', reverso: 'Enfermedad de Graves.' },
      { frente: 'Causa mas frecuente de sindrome de Cushing', reverso: 'Administracion exogena de corticoesteroides.' },
      { frente: 'Tratamiento inmediato de la crisis suprarrenal', reverso: 'Hidrocortisona intravenosa y reposicion de volumen.' },
      { frente: 'Como interpretar un trastorno primario por retroalimentacion', reverso: 'La hormona hipofisaria se mueve en direccion opuesta a la periferica.' },
    ],
    quiz: [
      {
        pregunta: 'Una HbA1c de 7.2 por ciento en un paciente sin diagnostico previo indica:',
        opciones: ['Glucemia normal', 'Prediabetes', 'Diabetes mellitus', 'Hipoglucemia'],
        correcta: 2,
        explicacion: 'Una HbA1c mayor o igual a 6.5 por ciento cumple criterio diagnostico de diabetes mellitus.',
      },
      {
        pregunta: 'Un adulto mayor con diabetes tipo 2, glucosa de 850, osmolaridad muy elevada y sin cetonas significativas tiene:',
        opciones: ['Cetoacidosis diabetica', 'Estado hiperosmolar hiperglucemico', 'Hipoglucemia', 'Tormenta tiroidea'],
        correcta: 1,
        explicacion: 'La hiperglucemia extrema con osmolaridad muy alta y ausencia de cetoacidosis define el estado hiperosmolar, tipico del paciente con diabetes tipo 2.',
      },
      {
        pregunta: 'Durante el tratamiento de la CAD, el electrolito que debe vigilarse mas estrechamente por riesgo de caida brusca es:',
        opciones: ['Sodio', 'Calcio', 'Potasio', 'Magnesio'],
        correcta: 2,
        explicacion: 'La insulina desplaza el potasio al interior celular; aunque inicie normal o alto, puede descender peligrosamente y debe reponerse.',
      },
      {
        pregunta: 'Un paciente con TSH elevada y T4 baja tiene:',
        opciones: ['Hipertiroidismo primario', 'Hipotiroidismo primario', 'Hipotiroidismo central', 'Funcion tiroidea normal'],
        correcta: 1,
        explicacion: 'En el hipotiroidismo primario la tiroides falla, la T4 baja y la hipofisis responde elevando la TSH (retroalimentacion).',
      },
      {
        pregunta: 'La causa mas frecuente de sindrome de Cushing es:',
        opciones: ['Adenoma hipofisario', 'Tumor suprarrenal', 'Uso exogeno de corticoesteroides', 'Tumor pulmonar productor de ACTH'],
        correcta: 2,
        explicacion: 'La administracion exogena de corticoesteroides es la causa mas comun de sindrome de Cushing en la practica clinica.',
      },
      {
        pregunta: 'Un paciente con hipotension refractaria a liquidos y vasopresores, hiponatremia e hiperpotasemia probablemente tenga:',
        opciones: ['Crisis tiroidea', 'Crisis suprarrenal', 'Cetoacidosis', 'Coma mixedematoso'],
        correcta: 1,
        explicacion: 'La hipotension refractaria con hiponatremia e hiperpotasemia es tipica de la insuficiencia suprarrenal aguda; requiere hidrocortisona intravenosa.',
      },
      {
        pregunta: 'En un trastorno endocrino PRIMARIO, la relacion entre la hormona periferica y la hipofisaria es:',
        opciones: ['Van en la misma direccion', 'Van en direccion opuesta', 'No se relacionan', 'Ambas siempre bajas'],
        correcta: 1,
        explicacion: 'En un trastorno primario las hormonas van en direccion opuesta por retroalimentacion (ejemplo: T4 baja con TSH alta).',
      },
    ],
  },

  // ============================================================
  // 5.9 — GASTROENTEROLOGÍA Y ABDOMEN AGUDO
  // ============================================================
  {
    id: 'gastroenterologia-abdomen-agudo',
    numero: '5.9',
    titulo: 'Gastroenterologia y Abdomen Agudo',
    icono: '🩻',
    duracion: '56 min',
    resumen:
      'Hemorragia digestiva alta y baja, pancreatitis aguda, apendicitis, obstruccion intestinal e insuficiencia hepatica, con el razonamiento del abdomen agudo.',
    objetivos: [
      'Diferenciar la hemorragia digestiva alta de la baja y priorizar su manejo.',
      'Aplicar criterios diagnosticos y de gravedad de la pancreatitis aguda.',
      'Reconocer el cuadro clinico de la apendicitis aguda.',
      'Distinguir la obstruccion intestinal mecanica del ileo paralitico.',
      'Identificar las complicaciones de la insuficiencia hepatica.',
    ],
    secciones: [
      {
        titulo: 'Anatomia funcional del tubo digestivo',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'digestivo',
          },
          {
            tipo: 'p',
            texto:
              'El angulo de Treitz (union duodenoyeyunal) divide el tubo digestivo en alto y bajo, lo que separa la hemorragia digestiva alta de la baja. Esta distincion guia el abordaje inicial y la endoscopia adecuada.',
          },
        ],
      },
      {
        titulo: 'Hemorragia digestiva',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Alta vs baja',
            headers: ['Rasgo', 'Alta (sobre Treitz)', 'Baja (bajo Treitz)'],
            filas: [
              ['Presentacion', 'Hematemesis, melena', 'Hematoquecia, rectorragia'],
              ['Causas', 'Ulcera peptica, varices, Mallory-Weiss', 'Diverticulos, angiodisplasia, neoplasia, hemorroides'],
              ['Estudio', 'Endoscopia alta', 'Colonoscopia'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo inicial',
            items: [
              'Valorar estado hemodinamico (ABC) y colocar dos accesos venosos de grueso calibre.',
              'Reposicion de volumen y transfusion segun necesidad.',
              'Inhibidor de bomba de protones intravenoso si se sospecha origen ulceroso.',
              'En sospecha de varices: octreotido y antibiotico profilactico.',
              'Endoscopia diagnostica y terapeutica una vez estabilizado.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Melena vs hematoquecia',
            texto:
              'La melena (heces negras y malolientes) sugiere sangrado alto digerido. La hematoquecia (sangre roja por el recto) suele ser baja, pero una hemorragia alta muy abundante y rapida tambien puede manifestarse como hematoquecia.',
          },
        ],
      },
      {
        titulo: 'Pancreatitis aguda',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La pancreatitis aguda es la inflamacion del pancreas por autodigestion enzimatica. Sus dos causas mas frecuentes son la litiasis biliar y el alcohol. Se presenta con dolor epigastrico intenso que irradia a la espalda, nauseas y vomito.',
          },
          {
            tipo: 'lista',
            titulo: 'Diagnostico (dos de tres criterios)',
            items: [
              'Dolor abdominal caracteristico (epigastrico irradiado a la espalda).',
              'Lipasa o amilasa mayor a tres veces el limite superior normal.',
              'Hallazgos de imagen compatibles (tomografia, ultrasonido).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Manejo de la pancreatitis',
            texto:
              'El pilar es la reanimacion con liquidos intravenosos, el control del dolor y el ayuno inicial seguido de reinicio temprano de la via oral segun tolerancia. Los antibioticos no son rutinarios; se reservan para necrosis infectada. La pancreatitis biliar requiere atender la litiasis.',
          },
          {
            tipo: 'lista',
            titulo: 'Datos de gravedad',
            items: [
              'Falla organica persistente.',
              'Necrosis pancreatica.',
              'Hipocalcemia, hemoconcentracion, elevacion marcada de azoados.',
              'Escalas como Ranson o APACHE II ayudan a estimar el pronostico.',
            ],
          },
        ],
      },
      {
        titulo: 'Apendicitis y obstruccion intestinal',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La apendicitis aguda es la urgencia quirurgica abdominal mas frecuente. El dolor suele iniciar periumbilical o epigastrico y migrar a la fosa iliaca derecha (punto de McBurney), con anorexia, nausea y febricula.',
          },
          {
            tipo: 'lista',
            titulo: 'Signos de irritacion peritoneal',
            items: [
              'Signo de Blumberg: dolor de rebote en la fosa iliaca derecha.',
              'Signo de Rovsing: dolor en fosa iliaca derecha al palpar la izquierda.',
              'Signo del psoas y del obturador: dolor con movimientos especificos de la cadera.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Obstruccion mecanica vs ileo paralitico',
            headers: ['Rasgo', 'Obstruccion mecanica', 'Ileo paralitico'],
            filas: [
              ['Ruidos intestinales', 'Aumentados, metalicos (luego ausentes)', 'Disminuidos o ausentes'],
              ['Causas', 'Adherencias, hernias, tumores', 'Cirugia, peritonitis, electrolitos, opioides'],
              ['Imagen', 'Niveles hidroaereos, asas dilatadas con corte', 'Dilatacion difusa sin punto de corte'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Senales de alarma en obstruccion',
            texto:
              'La fiebre, taquicardia, dolor desproporcionado, acidosis o signos peritoneales sugieren estrangulacion o isquemia intestinal, una urgencia quirurgica. La obstruccion no complicada puede manejarse de forma conservadora inicial con sonda y liquidos.',
          },
        ],
      },
      {
        titulo: 'Insuficiencia hepatica',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El higado sintetiza factores de coagulacion y albumina, metaboliza farmacos y depura el amonio. Su falla, aguda o cronica (cirrosis), compromete todas estas funciones y produce complicaciones potencialmente mortales.',
          },
          {
            tipo: 'lista',
            titulo: 'Complicaciones de la cirrosis e hipertension portal',
            items: [
              'Varices esofagicas y riesgo de hemorragia.',
              'Ascitis y peritonitis bacteriana espontanea.',
              'Encefalopatia hepatica por acumulo de amonio.',
              'Sindrome hepatorrenal.',
              'Coagulopatia por deficit de factores y trombocitopenia.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Encefalopatia hepatica',
            texto:
              'La acumulacion de amonio altera el estado mental, con asterixis (temblor de aleteo). Se trata buscando el desencadenante (hemorragia, infeccion, estrenimiento) y con lactulosa para reducir la absorcion de amonio; la rifaximina es coadyuvante.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Angulo de Treitz', definicion: 'Limite anatomico que separa la hemorragia digestiva alta de la baja.' },
      { termino: 'Melena', definicion: 'Heces negras y malolientes por sangre digerida; sugiere hemorragia alta.' },
      { termino: 'Pancreatitis aguda', definicion: 'Inflamacion pancreatica por autodigestion; causas frecuentes: litiasis biliar y alcohol.' },
      { termino: 'Punto de McBurney', definicion: 'Sitio de dolor maximo en la apendicitis, en la fosa iliaca derecha.' },
      { termino: 'Ileo paralitico', definicion: 'Detencion del transito sin obstruccion mecanica; ruidos disminuidos.' },
      { termino: 'Encefalopatia hepatica', definicion: 'Alteracion mental por amonio en la falla hepatica; cursa con asterixis.' },
      { termino: 'Peritonitis bacteriana espontanea', definicion: 'Infeccion del liquido ascitico sin foco quirurgico.' },
    ],
    flashcards: [
      { frente: 'Que estructura separa la hemorragia digestiva alta de la baja', reverso: 'El angulo de Treitz.' },
      { frente: 'Las dos causas mas frecuentes de pancreatitis aguda', reverso: 'Litiasis biliar y alcohol.' },
      { frente: 'Cuantos de los tres criterios se necesitan para diagnosticar pancreatitis', reverso: 'Dos de tres (clinica, enzimas o imagen).' },
      { frente: 'Patron de migracion del dolor en la apendicitis', reverso: 'De periumbilical/epigastrico a la fosa iliaca derecha.' },
      { frente: 'Ruidos intestinales en la obstruccion mecanica temprana', reverso: 'Aumentados y metalicos.' },
      { frente: 'Signo neurologico tipico de la encefalopatia hepatica', reverso: 'Asterixis (temblor de aleteo).' },
      { frente: 'Tratamiento de base de la encefalopatia hepatica', reverso: 'Lactulosa (mas tratar el desencadenante); rifaximina coadyuvante.' },
      { frente: 'Que farmacos se anaden ante sospecha de hemorragia por varices', reverso: 'Octreotido y antibiotico profilactico.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con heces negras y malolientes (melena) tiene mas probablemente un sangrado:',
        opciones: ['Digestivo bajo', 'Digestivo alto', 'Hemorroidal', 'Renal'],
        correcta: 1,
        explicacion: 'La melena resulta de sangre digerida a su paso por el tubo digestivo, lo que orienta a un origen alto (sobre el angulo de Treitz).',
      },
      {
        pregunta: 'Para diagnosticar pancreatitis aguda se requieren:',
        opciones: ['Solo dolor abdominal', 'Dos de tres: clinica, enzimas elevadas o imagen', 'Solo amilasa elevada', 'Tomografia obligatoria siempre'],
        correcta: 1,
        explicacion: 'El diagnostico exige al menos dos de tres criterios: dolor caracteristico, lipasa/amilasa mayor a tres veces el limite, o imagen compatible.',
      },
      {
        pregunta: 'Cual NO es parte del manejo estandar de la pancreatitis aguda no complicada:',
        opciones: ['Reanimacion con liquidos', 'Control del dolor', 'Antibioticos de rutina', 'Reinicio temprano de la via oral segun tolerancia'],
        correcta: 2,
        explicacion: 'Los antibioticos no son rutinarios en la pancreatitis; se reservan para la necrosis infectada documentada.',
      },
      {
        pregunta: 'El dolor que inicia periumbilical y migra a la fosa iliaca derecha con dolor de rebote sugiere:',
        opciones: ['Colecistitis', 'Apendicitis', 'Pancreatitis', 'Diverticulitis'],
        correcta: 1,
        explicacion: 'La migracion del dolor a la fosa iliaca derecha y el signo de rebote (Blumberg) son caracteristicos de la apendicitis aguda.',
      },
      {
        pregunta: 'En la obstruccion intestinal mecanica temprana los ruidos intestinales tipicamente estan:',
        opciones: ['Ausentes desde el inicio', 'Aumentados y metalicos', 'Normales', 'Solo presentes con la tos'],
        correcta: 1,
        explicacion: 'La obstruccion mecanica genera peristalsis de lucha con ruidos aumentados y metalicos; el ileo paralitico, en cambio, los disminuye.',
      },
      {
        pregunta: 'Un paciente cirrotico con confusion y asterixis probablemente tenga:',
        opciones: ['Sindrome hepatorrenal', 'Encefalopatia hepatica', 'Peritonitis bacteriana espontanea', 'Hemorragia por varices'],
        correcta: 1,
        explicacion: 'La alteracion mental con asterixis por acumulo de amonio define la encefalopatia hepatica; se trata con lactulosa y corrigiendo el desencadenante.',
      },
      {
        pregunta: 'Cual de estos datos en una obstruccion intestinal sugiere estrangulacion y urgencia quirurgica:',
        opciones: ['Distension leve', 'Fiebre, taquicardia y signos peritoneales', 'Vomito ocasional', 'Ruidos aumentados'],
        correcta: 1,
        explicacion: 'La fiebre, taquicardia y signos peritoneales sugieren isquemia o estrangulacion, que obligan a cirugia urgente.',
      },
    ],
  },

  // ============================================================
  // 5.10 — HEMATOLOGÍA Y COAGULACIÓN
  // ============================================================
  {
    id: 'hematologia-coagulacion',
    numero: '5.10',
    titulo: 'Hematologia y Coagulacion',
    icono: '🩸',
    duracion: '57 min',
    resumen:
      'Serie roja, blanca y plaquetaria; clasificacion de las anemias; hemostasia primaria y secundaria; cascada de la coagulacion y anticoagulantes.',
    objetivos: [
      'Clasificar las anemias por el volumen corpuscular medio.',
      'Interpretar las alteraciones de la serie blanca y plaquetaria.',
      'Diferenciar la hemostasia primaria de la secundaria.',
      'Relacionar la cascada de la coagulacion con TP/INR y TTPa.',
      'Conocer el mecanismo y la monitorizacion de los anticoagulantes.',
    ],
    secciones: [
      {
        titulo: 'Serie roja y anemias',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La anemia es la disminucion de la masa eritrocitaria o de la hemoglobina. El primer paso para clasificarla es el volumen corpuscular medio (VCM), que separa las anemias en microciticas, normociticas y macrociticas.',
          },
          {
            tipo: 'tabla',
            titulo: 'Clasificacion de la anemia por VCM',
            headers: ['Tipo', 'VCM', 'Causas tipicas'],
            filas: [
              ['Microcitica', 'Bajo (menor a 80)', 'Deficiencia de hierro, talasemia, enfermedad cronica'],
              ['Normocitica', 'Normal (80 a 100)', 'Hemorragia aguda, enfermedad cronica, hemolisis'],
              ['Macrocitica', 'Alto (mayor a 100)', 'Deficiencia de vitamina B12 o folato, alcohol, hipotiroidismo'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Hierro y deposito',
            texto:
              'En la deficiencia de hierro la ferritina (deposito) esta baja, la capacidad de transporte (transferrina) alta y la saturacion baja. En la anemia de la enfermedad cronica la ferritina suele estar normal o alta porque es un reactante de fase aguda.',
          },
          {
            tipo: 'lista',
            titulo: 'Reticulocitos: la respuesta de la medula',
            items: [
              'Reticulocitos altos: la medula responde (hemolisis, hemorragia aguda).',
              'Reticulocitos bajos: produccion insuficiente (deficiencias, falla medular).',
              'Son clave para diferenciar el origen de una anemia normocitica.',
            ],
          },
        ],
      },
      {
        titulo: 'Serie blanca y plaquetas',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Interpretacion de la serie blanca',
            items: [
              'Neutrofilia: infeccion bacteriana, estres, corticoesteroides.',
              'Linfocitosis: infecciones virales.',
              'Eosinofilia: alergias, parasitos, farmacos.',
              'Neutropenia: riesgo de infeccion grave; quimioterapia, farmacos, falla medular.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Alteraciones plaquetarias',
            headers: ['Estado', 'Hallazgo', 'Riesgo'],
            filas: [
              ['Trombocitopenia', 'Plaquetas bajas', 'Sangrado mucocutaneo, petequias'],
              ['Trombocitosis', 'Plaquetas altas', 'Reactiva o por trastorno mieloproliferativo'],
              ['Disfuncion plaquetaria', 'Numero normal, funcion alterada', 'Sangrado pese a conteo normal'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Petequias y sangrado mucoso',
            texto:
              'Las petequias, equimosis y sangrado de mucosas apuntan a un problema de hemostasia primaria (plaquetas o vasos). El sangrado profundo en articulaciones o musculos apunta a hemostasia secundaria (factores de coagulacion).',
          },
        ],
      },
      {
        titulo: 'Hemostasia y cascada de coagulacion',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'coagulacion',
          },
          {
            tipo: 'tabla',
            titulo: 'Hemostasia primaria vs secundaria',
            headers: ['Rasgo', 'Primaria', 'Secundaria'],
            filas: [
              ['Protagonista', 'Plaquetas y endotelio', 'Factores de coagulacion'],
              ['Resultado', 'Tapon plaquetario', 'Malla de fibrina estable'],
              ['Sangrado tipico', 'Mucocutaneo, petequias', 'Profundo, articular, muscular'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Vias de la coagulacion y pruebas',
            items: [
              'Via extrinseca (factor tisular): se mide con el TP/INR.',
              'Via intrinseca (de contacto): se mide con el TTPa.',
              'Via comun: activacion del factor X, trombina y fibrina.',
              'Los factores II, VII, IX y X dependen de la vitamina K.',
            ],
          },
          {
            tipo: 'formula',
            texto: 'Regla nemotecnica: TP mide la via extrinseca; TTPa mide la via intrinseca',
            nota: 'La warfarina prolonga el TP/INR (afecta factores dependientes de vitamina K); la heparina no fraccionada prolonga el TTPa.',
          },
        ],
      },
      {
        titulo: 'Anticoagulantes',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Anticoagulantes principales',
            headers: ['Farmaco', 'Mecanismo', 'Monitorizacion / reversion'],
            filas: [
              ['Heparina no fraccionada', 'Potencia la antitrombina', 'TTPa; reversion con protamina'],
              ['Heparina de bajo peso molecular', 'Inhibe factor Xa', 'Generalmente sin monitorizacion; antiXa si es necesario'],
              ['Warfarina', 'Inhibe sintesis de factores dependientes de vitamina K', 'INR; reversion con vitamina K y plasma o concentrado'],
              ['Anticoagulantes directos (DOAC)', 'Inhiben trombina o factor Xa', 'Sin monitorizacion rutinaria; reversores especificos'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Heparina y warfarina al inicio',
            texto:
              'Al iniciar warfarina puede haber un estado protrombotico transitorio porque caen primero las proteinas C y S (anticoagulantes naturales de vida media corta). Por eso se traslapa con heparina hasta lograr un INR terapeutico.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Trombocitopenia inducida por heparina',
            texto:
              'La trombocitopenia inducida por heparina es una reaccion inmune paradojica que causa trombosis pese a las plaquetas bajas. Obliga a suspender toda la heparina y cambiar a un anticoagulante alternativo.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'VCM', definicion: 'Volumen corpuscular medio; clasifica la anemia en micro, normo y macrocitica.' },
      { termino: 'Ferritina', definicion: 'Refleja los depositos de hierro; baja en deficiencia, alta en inflamacion.' },
      { termino: 'Reticulocitos', definicion: 'Eritrocitos jovenes; su numero indica la respuesta de la medula osea.' },
      { termino: 'Hemostasia primaria', definicion: 'Formacion del tapon plaquetario; su falla da sangrado mucocutaneo.' },
      { termino: 'TP/INR', definicion: 'Mide la via extrinseca; monitoriza la warfarina.' },
      { termino: 'TTPa', definicion: 'Mide la via intrinseca; monitoriza la heparina no fraccionada.' },
      { termino: 'Factores dependientes de vitamina K', definicion: 'II, VII, IX y X; diana de la warfarina.' },
    ],
    flashcards: [
      { frente: 'Que estudio clasifica primero una anemia', reverso: 'El volumen corpuscular medio (VCM).' },
      { frente: 'Patron de hierro en la deficiencia de hierro', reverso: 'Ferritina baja, transferrina alta, saturacion baja.' },
      { frente: 'Que prueba mide la via extrinseca de la coagulacion', reverso: 'El TP/INR.' },
      { frente: 'Que prueba mide la via intrinseca', reverso: 'El TTPa.' },
      { frente: 'Factores dependientes de vitamina K', reverso: 'II, VII, IX y X (mas proteinas C y S).' },
      { frente: 'Tipo de sangrado de la falla de hemostasia primaria', reverso: 'Mucocutaneo: petequias, equimosis y sangrado de mucosas.' },
      { frente: 'Por que se traslapa heparina al iniciar warfarina', reverso: 'Por el estado protrombotico transitorio inicial de la warfarina.' },
      { frente: 'Que es la trombocitopenia inducida por heparina', reverso: 'Reaccion inmune que causa trombosis pese a plaquetas bajas; obliga a suspender heparina.' },
    ],
    quiz: [
      {
        pregunta: 'Una anemia con VCM de 70 fL orienta primero a:',
        opciones: ['Deficiencia de B12', 'Anemia microcitica (deficiencia de hierro o talasemia)', 'Hemolisis aguda', 'Anemia macrocitica'],
        correcta: 1,
        explicacion: 'Un VCM bajo (menor a 80) define la anemia microcitica, cuyas causas tipicas son la deficiencia de hierro y la talasemia.',
      },
      {
        pregunta: 'Cual patron de laboratorio corresponde a deficiencia de hierro:',
        opciones: ['Ferritina alta', 'Ferritina baja con transferrina alta', 'Saturacion de transferrina alta', 'VCM elevado'],
        correcta: 1,
        explicacion: 'En la deficiencia de hierro la ferritina (deposito) esta baja y la capacidad de transporte (transferrina) compensatoriamente alta.',
      },
      {
        pregunta: 'La warfarina prolonga principalmente:',
        opciones: ['El TTPa', 'El TP/INR', 'El tiempo de sangrado', 'El conteo plaquetario'],
        correcta: 1,
        explicacion: 'La warfarina inhibe los factores dependientes de vitamina K y prolonga el TP/INR, que mide la via extrinseca.',
      },
      {
        pregunta: 'Un paciente con petequias, equimosis y sangrado de encias tiene mas probablemente un defecto de:',
        opciones: ['Hemostasia secundaria', 'Hemostasia primaria', 'Via comun', 'Fibrinolisis'],
        correcta: 1,
        explicacion: 'El sangrado mucocutaneo (petequias, equimosis, encias) es propio de un defecto de la hemostasia primaria (plaquetas o vasos).',
      },
      {
        pregunta: 'Cual de estos factores depende de la vitamina K:',
        opciones: ['Factor V', 'Factor VIII', 'Factor IX', 'Factor XII'],
        correcta: 2,
        explicacion: 'Los factores dependientes de vitamina K son II, VII, IX y X; el factor IX es uno de ellos.',
      },
      {
        pregunta: 'La razon para traslapar heparina al iniciar warfarina es:',
        opciones: ['Aumentar el sangrado', 'El estado protrombotico transitorio inicial de la warfarina', 'Acelerar el INR', 'Evitar trombocitopenia'],
        correcta: 1,
        explicacion: 'Al inicio caen primero las proteinas C y S (anticoagulantes naturales), generando un estado protrombotico transitorio que cubre la heparina.',
      },
      {
        pregunta: 'Ante una trombosis nueva con caida de plaquetas en un paciente que recibe heparina, se debe sospechar:',
        opciones: ['Anemia hemolitica', 'Trombocitopenia inducida por heparina', 'Coagulacion intravascular diseminada', 'Deficiencia de vitamina K'],
        correcta: 1,
        explicacion: 'La trombocitopenia inducida por heparina es paradojica: trombosis con plaquetas bajas; obliga a suspender la heparina y usar otro anticoagulante.',
      },
    ],
  },

  // ============================================================
  // 5.11 — FARMACOLOGÍA CLÍNICA AVANZADA
  // ============================================================
  {
    id: 'farmacologia-clinica-avanzada',
    numero: '5.11',
    titulo: 'Farmacologia Clinica Avanzada',
    icono: '💊',
    duracion: '56 min',
    resumen:
      'Antibioticos por clase, anticoagulantes, antihipertensivos, interacciones medicamentosas y el ajuste de dosis en falla renal y hepatica.',
    objetivos: [
      'Clasificar los antibioticos por mecanismo y espectro.',
      'Comparar los grupos de antihipertensivos y sus indicaciones.',
      'Aplicar principios de farmacocinetica al ajuste de dosis.',
      'Reconocer interacciones medicamentosas clinicamente relevantes.',
      'Ajustar farmacos en insuficiencia renal y hepatica.',
    ],
    secciones: [
      {
        titulo: 'Principios de farmacocinetica',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La farmacocinetica describe lo que el cuerpo hace al farmaco: absorcion, distribucion, metabolismo y eliminacion (ADME). La farmacodinamia describe lo que el farmaco hace al cuerpo. Ambas guian la dosificacion segura.',
          },
          {
            tipo: 'lista',
            titulo: 'Conceptos clave',
            items: [
              'Vida media: tiempo en que la concentracion cae a la mitad; determina el intervalo de dosis.',
              'Metabolismo de primer paso: el higado reduce la fraccion del farmaco oral que llega a la circulacion.',
              'Margen terapeutico estrecho: farmacos como warfarina, digoxina y aminoglucosidos requieren vigilancia.',
              'La mayoria de los farmacos se eliminan por via renal o se metabolizan en el higado.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Citocromo P450',
            texto:
              'Muchos farmacos se metabolizan por el sistema CYP450. Los inhibidores (por ejemplo, algunos antifungicos y macrolidos) elevan los niveles de otros farmacos; los inductores (por ejemplo, rifampicina y algunos antiepilepticos) los reducen. Aqui nacen muchas interacciones graves.',
          },
        ],
      },
      {
        titulo: 'Antibioticos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Clases de antibioticos por mecanismo',
            headers: ['Clase', 'Mecanismo', 'Notas'],
            filas: [
              ['Betalactamicos (penicilinas, cefalosporinas, carbapenems)', 'Inhiben la pared celular', 'Alergia cruzada; bactericidas'],
              ['Aminoglucosidos', 'Inhiben la subunidad 30S del ribosoma', 'Nefrotoxicos y ototoxicos; ajuste renal'],
              ['Macrolidos', 'Inhiben la subunidad 50S', 'Inhiben CYP450; prolongan QT'],
              ['Fluoroquinolonas', 'Inhiben la ADN girasa', 'Tendinopatia; prolongan QT'],
              ['Vancomicina', 'Inhibe la pared (glucopeptido)', 'Cubre SARM; vigilar niveles y rinon'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Bactericida vs bacteriostatico',
            texto:
              'Los bactericidas matan a la bacteria (betalactamicos, aminoglucosidos, fluoroquinolonas); los bacteriostaticos detienen su crecimiento y dependen del sistema inmune (macrolidos, tetraciclinas, sulfonamidas). En infecciones graves o pacientes inmunocomprometidos se prefieren los bactericidas.',
          },
          {
            tipo: 'lista',
            titulo: 'Principios de uso racional',
            items: [
              'Empezar empirico segun el foco probable y desescalar con el cultivo.',
              'Cubrir el espectro necesario, ni mas ni menos, para frenar la resistencia.',
              'Considerar penetracion al sitio (orina, hueso, sistema nervioso central).',
              'Ajustar por funcion renal y vigilar toxicidad de los de margen estrecho.',
            ],
          },
        ],
      },
      {
        titulo: 'Antihipertensivos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Grupos de antihipertensivos',
            headers: ['Grupo', 'Mecanismo', 'Indicaciones / cuidados'],
            filas: [
              ['IECA / ARA II', 'Bloquean el sistema renina-angiotensina', 'Protegen rinon en diabetes; vigilar potasio y creatinina'],
              ['Calcioantagonistas', 'Vasodilatacion (dihidropiridinas) o cardiacos', 'Edema con dihidropiridinas'],
              ['Tiazidas', 'Diuretico en tubulo distal', 'Hipopotasemia, hiperuricemia, hiperglucemia'],
              ['Betabloqueadores', 'Reducen gasto y frecuencia', 'Utiles en cardiopatia; cuidado en asma y bloqueos'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'IECA en el embarazo',
            texto:
              'Los IECA y ARA II estan contraindicados en el embarazo por teratogenicidad. La tos seca es un efecto adverso clasico de los IECA; el angioedema, aunque raro, es grave y obliga a suspenderlos.',
          },
          {
            tipo: 'p',
            texto:
              'La eleccion del antihipertensivo se individualiza por comorbilidades: IECA o ARA II en diabetes y enfermedad renal con proteinuria; betabloqueadores tras infarto o en insuficiencia cardiaca; calcioantagonistas y tiazidas como buenas opciones de inicio.',
          },
        ],
      },
      {
        titulo: 'Ajuste renal y hepatico e interacciones',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Ajuste por insuficiencia renal',
            items: [
              'Reducir dosis o ampliar el intervalo de farmacos de eliminacion renal.',
              'Vigilar de cerca aminoglucosidos, vancomicina, algunos DOAC y la metformina.',
              'Evitar nefrotoxicos cuando sea posible (AINE, contraste, aminoglucosidos).',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Ajuste por insuficiencia hepatica',
            items: [
              'Precaucion con farmacos de metabolismo hepatico y alto primer paso.',
              'Vigilar sedantes y opioides por riesgo de encefalopatia.',
              'La coagulopatia hepatica modifica la respuesta a anticoagulantes.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Interacciones de alto riesgo',
            headers: ['Combinacion', 'Riesgo'],
            filas: [
              ['Warfarina mas antibioticos o AINE', 'Sangrado por aumento del INR'],
              ['IECA mas diuretico ahorrador de potasio', 'Hiperpotasemia'],
              ['Macrolido o fluoroquinolona mas otro que prolonga QT', 'Arritmia ventricular'],
              ['AINE mas IECA mas diuretico (triple whammy)', 'Lesion renal aguda'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Triple whammy renal',
            texto:
              'La combinacion de un AINE, un IECA o ARA II y un diuretico puede precipitar lesion renal aguda, sobre todo en el adulto mayor o deshidratado, porque afectan a la vez la perfusion y la autorregulacion glomerular.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Vida media', definicion: 'Tiempo en que la concentracion del farmaco cae a la mitad; define el intervalo de dosis.' },
      { termino: 'Metabolismo de primer paso', definicion: 'Reduccion hepatica de la fraccion oral del farmaco antes de la circulacion.' },
      { termino: 'CYP450', definicion: 'Sistema enzimatico hepatico; sus inhibidores e inductores generan interacciones.' },
      { termino: 'Bactericida', definicion: 'Antibiotico que mata la bacteria; preferido en infecciones graves.' },
      { termino: 'Margen terapeutico estrecho', definicion: 'Farmacos cuya dosis toxica esta cerca de la terapeutica; requieren vigilancia.' },
      { termino: 'Triple whammy', definicion: 'AINE mas IECA/ARA II mas diuretico; precipita lesion renal aguda.' },
      { termino: 'IECA', definicion: 'Inhibidor de la enzima convertidora de angiotensina; protege rinon y contraindicado en embarazo.' },
    ],
    flashcards: [
      { frente: 'Que mide la vida media de un farmaco', reverso: 'El tiempo en que su concentracion cae a la mitad; determina el intervalo.' },
      { frente: 'Mecanismo de los betalactamicos', reverso: 'Inhiben la sintesis de la pared celular bacteriana.' },
      { frente: 'Dos antibioticos que requieren ajuste renal y vigilancia de niveles', reverso: 'Aminoglucosidos y vancomicina.' },
      { frente: 'Efecto adverso clasico de los IECA', reverso: 'Tos seca (y, raro pero grave, angioedema).' },
      { frente: 'Por que es peligroso el triple whammy', reverso: 'AINE mas IECA/ARA II mas diuretico precipita lesion renal aguda.' },
      { frente: 'Que hacen los inhibidores del CYP450 a otros farmacos', reverso: 'Elevan sus niveles al frenar su metabolismo.' },
      { frente: 'Grupo antihipertensivo contraindicado en el embarazo', reverso: 'IECA y ARA II (teratogenicos).' },
      { frente: 'Diferencia entre bactericida y bacteriostatico', reverso: 'El bactericida mata; el bacteriostatico frena el crecimiento y depende del sistema inmune.' },
    ],
    quiz: [
      {
        pregunta: 'Los antibioticos betalactamicos actuan principalmente:',
        opciones: ['Inhibiendo la pared celular', 'Inhibiendo la subunidad 30S', 'Inhibiendo la ADN girasa', 'Inhibiendo el folato'],
        correcta: 0,
        explicacion: 'Penicilinas, cefalosporinas y carbapenems inhiben la sintesis de la pared celular bacteriana, mecanismo bactericida.',
      },
      {
        pregunta: 'Un paciente con tos seca persistente desde que inicio su antihipertensivo probablemente toma:',
        opciones: ['Una tiazida', 'Un calcioantagonista', 'Un IECA', 'Un betabloqueador'],
        correcta: 2,
        explicacion: 'La tos seca es un efecto adverso clasico de los IECA por acumulo de bradicinina; suele resolverse al cambiar a un ARA II.',
      },
      {
        pregunta: 'Cual combinacion conlleva mayor riesgo de lesion renal aguda (triple whammy):',
        opciones: ['IECA mas estatina mas aspirina', 'AINE mas IECA mas diuretico', 'Betabloqueador mas tiazida', 'Calcioantagonista mas IECA'],
        correcta: 1,
        explicacion: 'La triada de AINE, IECA o ARA II y diuretico compromete la perfusion y la autorregulacion glomerular, precipitando lesion renal aguda.',
      },
      {
        pregunta: 'Un inhibidor potente del CYP450 administrado junto con warfarina probablemente:',
        opciones: ['Disminuye el INR', 'Aumenta el INR y el riesgo de sangrado', 'No afecta la warfarina', 'Inactiva la warfarina'],
        correcta: 1,
        explicacion: 'Al inhibir su metabolismo, la concentracion de warfarina sube, prolongando el INR y aumentando el riesgo de hemorragia.',
      },
      {
        pregunta: 'Cual antibiotico requiere ajuste por funcion renal y vigilancia por nefrotoxicidad y ototoxicidad:',
        opciones: ['Azitromicina', 'Gentamicina (aminoglucosido)', 'Amoxicilina', 'Doxiciclina'],
        correcta: 1,
        explicacion: 'Los aminoglucosidos como la gentamicina son nefrotoxicos y ototoxicos y se eliminan por via renal, por lo que requieren ajuste y vigilancia.',
      },
      {
        pregunta: 'En insuficiencia hepatica grave hay que tener especial precaucion con:',
        opciones: ['Antibioticos de eliminacion renal pura', 'Sedantes y opioides por riesgo de encefalopatia', 'Soluciones cristaloides', 'Oxigeno suplementario'],
        correcta: 1,
        explicacion: 'Los sedantes y opioides pueden precipitar o agravar la encefalopatia hepatica y deben usarse con extrema cautela.',
      },
      {
        pregunta: 'Un antibiotico bacteriostatico:',
        opciones: ['Siempre es de eleccion en sepsis grave', 'Detiene el crecimiento y depende del sistema inmune', 'Mata la bacteria directamente', 'No interactua con otros farmacos'],
        correcta: 1,
        explicacion: 'Los bacteriostaticos frenan el crecimiento bacteriano y requieren un sistema inmune competente; en infecciones graves suelen preferirse bactericidas.',
      },
    ],
  },

  // ============================================================
  // 5.12 — OBSTETRICIA Y EMERGENCIAS NEONATALES
  // ============================================================
  {
    id: 'obstetricia-neonatal',
    numero: '5.12',
    titulo: 'Obstetricia y Emergencias Neonatales',
    icono: '🤰',
    duracion: '58 min',
    resumen:
      'Trabajo de parto y sus complicaciones, preeclampsia y eclampsia, hemorragia posparto, reanimacion neonatal y la valoracion de APGAR.',
    objetivos: [
      'Describir las etapas del trabajo de parto y sus complicaciones.',
      'Reconocer y manejar la preeclampsia y la eclampsia.',
      'Identificar las causas de hemorragia posparto y su abordaje.',
      'Aplicar la secuencia de reanimacion neonatal.',
      'Calcular e interpretar la puntuacion de APGAR.',
    ],
    secciones: [
      {
        titulo: 'Trabajo de parto',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Etapas del trabajo de parto',
            headers: ['Etapa', 'Inicio y fin', 'Eventos'],
            filas: [
              ['Primera', 'Inicio de contracciones a dilatacion completa', 'Fase latente y fase activa; borramiento y dilatacion'],
              ['Segunda', 'Dilatacion completa al nacimiento', 'Pujo y expulsion del feto'],
              ['Tercera', 'Nacimiento al alumbramiento placentario', 'Desprendimiento y salida de placenta'],
              ['Cuarta', 'Primeras dos horas posparto', 'Vigilancia de hemorragia y tono uterino'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Complicaciones del parto',
            items: [
              'Distocia: progreso anormal del trabajo de parto.',
              'Sufrimiento fetal: alteraciones de la frecuencia cardiaca fetal.',
              'Prolapso de cordon: emergencia obstetrica.',
              'Distocia de hombros: dificultad para liberar los hombros tras la cabeza.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Prolapso de cordon',
            texto:
              'Cuando el cordon umbilical se desliza por delante de la presentacion fetal, su compresion compromete el flujo al feto. Es una emergencia que requiere elevar la presentacion, posicionar a la madre y proceder a una cesarea urgente.',
          },
        ],
      },
      {
        titulo: 'Preeclampsia y eclampsia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La preeclampsia es un trastorno hipertensivo del embarazo que aparece despues de las 20 semanas, con hipertension y dano de organo (clasicamente proteinuria). La eclampsia es la aparicion de convulsiones en este contexto. Son causas importantes de morbimortalidad materna y fetal.',
          },
          {
            tipo: 'lista',
            titulo: 'Datos de severidad',
            items: [
              'Presion arterial muy elevada (sistolica mayor o igual a 160 o diastolica mayor o igual a 110).',
              'Cefalea intensa, alteraciones visuales, dolor en epigastrio o hipocondrio derecho.',
              'Trombocitopenia, elevacion de enzimas hepaticas, falla renal.',
              'Sindrome HELLP: hemolisis, enzimas hepaticas elevadas y plaquetas bajas.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Sulfato de magnesio',
            texto:
              'El sulfato de magnesio es el farmaco de eleccion para prevenir y tratar las convulsiones de la eclampsia. Su toxicidad se vigila clinicamente (reflejos osteotendinosos, frecuencia respiratoria y diuresis); su antidoto es el gluconato de calcio.',
          },
          {
            tipo: 'p',
            texto:
              'El tratamiento definitivo de la preeclampsia es la finalizacion del embarazo (nacimiento), individualizando el momento segun la gravedad y la edad gestacional. El control de la presion y la prevencion de convulsiones estabilizan a la madre mientras tanto.',
          },
        ],
      },
      {
        titulo: 'Hemorragia posparto',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La hemorragia posparto es una causa principal de muerte materna. La causa mas frecuente es la atonia uterina (el utero no se contrae). Se aborda de forma sistematica con las cuatro T.',
          },
          {
            tipo: 'tabla',
            titulo: 'Las cuatro T de la hemorragia posparto',
            headers: ['Causa', 'Que es'],
            filas: [
              ['Tono', 'Atonia uterina (la mas frecuente)'],
              ['Trauma', 'Desgarros del canal del parto'],
              ['Tejido', 'Retencion de restos placentarios'],
              ['Trombina', 'Trastornos de la coagulacion'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo de la atonia uterina',
            items: [
              'Masaje uterino bimanual.',
              'Uterotonicos: oxitocina de primera linea, luego otros agentes.',
              'Reposicion de volumen y hemoderivados segun necesidad.',
              'Medidas avanzadas si persiste: balon intrauterino, suturas o intervencion quirurgica.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Reconocer la hemorragia oculta',
            texto:
              'La paciente joven compensa bien y puede tener signos vitales casi normales hasta una perdida importante. La taquicardia es a menudo el primer signo; no hay que esperar a la hipotension para actuar.',
          },
        ],
      },
      {
        titulo: 'Reanimacion neonatal y APGAR',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Tras el nacimiento, la mayoria de los recien nacidos solo requieren secado, calor y estimulacion. La transicion clave es lograr una ventilacion eficaz; la causa mas frecuente de compromiso neonatal es la dificultad para iniciar la respiracion.',
          },
          {
            tipo: 'pasos',
            titulo: 'Pasos iniciales de la reanimacion neonatal',
            items: [
              'Proporcionar calor, secar y estimular; despejar la via aerea si es necesario.',
              'Si no respira o la frecuencia cardiaca es menor a 100: ventilacion con presion positiva.',
              'Si la frecuencia cardiaca es menor a 60 pese a ventilacion adecuada: compresiones torabicas.',
              'Si persiste menor a 60: adrenalina y considerar causas reversibles.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Puntuacion de APGAR (cada parametro 0, 1 o 2)',
            headers: ['Parametro', '0', '2'],
            filas: [
              ['Aspecto (color)', 'Cianotico o palido', 'Rosado completo'],
              ['Pulso (frecuencia cardiaca)', 'Ausente', 'Mayor a 100'],
              ['Gesto (irritabilidad refleja)', 'Sin respuesta', 'Llanto, tos o estornudo'],
              ['Actividad (tono muscular)', 'Flacido', 'Movimientos activos'],
              ['Respiracion', 'Ausente', 'Llanto vigoroso'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Como usar el APGAR',
            texto:
              'El APGAR se valora al minuto y a los cinco minutos de vida y describe la transicion del recien nacido. No se usa para decidir si iniciar la reanimacion (esa decision es inmediata segun respiracion y frecuencia cardiaca), sino para evaluar la respuesta.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Preeclampsia', definicion: 'Hipertension con dano de organo despues de las 20 semanas de gestacion.' },
      { termino: 'Eclampsia', definicion: 'Convulsiones en el contexto de preeclampsia.' },
      { termino: 'Sulfato de magnesio', definicion: 'Farmaco de eleccion para prevenir y tratar las convulsiones eclampticas.' },
      { termino: 'Sindrome HELLP', definicion: 'Hemolisis, enzimas hepaticas elevadas y plaquetas bajas; forma grave de preeclampsia.' },
      { termino: 'Atonia uterina', definicion: 'Falta de contraccion del utero; causa mas frecuente de hemorragia posparto.' },
      { termino: 'Cuatro T', definicion: 'Tono, trauma, tejido y trombina; causas de hemorragia posparto.' },
      { termino: 'APGAR', definicion: 'Puntuacion que evalua la transicion del recien nacido al minuto y a los cinco minutos.' },
    ],
    flashcards: [
      { frente: 'Que define a la eclampsia', reverso: 'La aparicion de convulsiones en el contexto de preeclampsia.' },
      { frente: 'Farmaco de eleccion para las convulsiones eclampticas', reverso: 'El sulfato de magnesio.' },
      { frente: 'Antidoto de la toxicidad por sulfato de magnesio', reverso: 'El gluconato de calcio.' },
      { frente: 'Causa mas frecuente de hemorragia posparto', reverso: 'La atonia uterina.' },
      { frente: 'Cuales son las cuatro T de la hemorragia posparto', reverso: 'Tono, trauma, tejido y trombina.' },
      { frente: 'Componentes del APGAR', reverso: 'Aspecto, pulso, gesto, actividad y respiracion.' },
      { frente: 'Paso mas importante de la reanimacion neonatal', reverso: 'Lograr una ventilacion eficaz.' },
      { frente: 'Que significa el sindrome HELLP', reverso: 'Hemolisis, enzimas hepaticas elevadas y plaquetas bajas.' },
    ],
    quiz: [
      {
        pregunta: 'El farmaco de eleccion para prevenir y tratar las convulsiones de la eclampsia es:',
        opciones: ['Diazepam', 'Fenitoina', 'Sulfato de magnesio', 'Levetiracetam'],
        correcta: 2,
        explicacion: 'El sulfato de magnesio es el farmaco de eleccion en la eclampsia; su antidoto, ante toxicidad, es el gluconato de calcio.',
      },
      {
        pregunta: 'La causa mas frecuente de hemorragia posparto es:',
        opciones: ['Trauma del canal', 'Atonia uterina', 'Retencion de tejido', 'Trastorno de coagulacion'],
        correcta: 1,
        explicacion: 'La atonia uterina (el utero no se contrae) es la causa mas frecuente; es la primera T de las cuatro T.',
      },
      {
        pregunta: 'Un recien nacido a los 5 minutos tiene frecuencia cardiaca mayor a 100, llanto vigoroso, movimientos activos, responde a estimulos pero con cianosis distal. Su APGAR aproximado es:',
        opciones: ['10', '9', '5', '3'],
        correcta: 1,
        explicacion: 'Pierde un punto por el color (acrocianosis), obteniendo 2 en los otros cuatro parametros, para un total de 9.',
      },
      {
        pregunta: 'Durante la reanimacion neonatal, las compresiones toracicas se inician cuando la frecuencia cardiaca:',
        opciones: ['Es menor a 100 pese a estimulacion', 'Es menor a 60 pese a ventilacion adecuada', 'Es mayor a 100', 'Es exactamente 80'],
        correcta: 1,
        explicacion: 'Las compresiones se inician si la frecuencia cardiaca permanece menor a 60 pese a una ventilacion con presion positiva adecuada.',
      },
      {
        pregunta: 'El tratamiento definitivo de la preeclampsia es:',
        opciones: ['Reposo absoluto', 'Antihipertensivos de por vida', 'La finalizacion del embarazo (nacimiento)', 'Diureticos'],
        correcta: 2,
        explicacion: 'La preeclampsia se resuelve con el nacimiento; el momento se individualiza segun la gravedad y la edad gestacional.',
      },
      {
        pregunta: 'En una hemorragia posparto en una paciente joven, el primer signo de alarma suele ser:',
        opciones: ['Hipotension marcada', 'Taquicardia', 'Bradicardia', 'Fiebre'],
        correcta: 1,
        explicacion: 'La paciente joven compensa bien; la taquicardia aparece antes que la hipotension, por lo que no hay que esperar a esta ultima.',
      },
      {
        pregunta: 'El sindrome HELLP se caracteriza por:',
        opciones: ['Hipertension, edema y proteinuria leve', 'Hemolisis, enzimas hepaticas elevadas y plaquetas bajas', 'Hiperglucemia y cetosis', 'Hipotension y bradicardia'],
        correcta: 1,
        explicacion: 'HELLP es un acronimo de hemolisis, enzimas hepaticas elevadas y plaquetas bajas; es una forma grave de preeclampsia.',
      },
    ],
  },

  // ============================================================
  // 5.13 — PEDIATRÍA Y CONSIDERACIONES ESPECIALES
  // ============================================================
  {
    id: 'pediatria-especiales',
    numero: '5.13',
    titulo: 'Pediatria y Consideraciones Especiales',
    icono: '🧒',
    duracion: '55 min',
    resumen:
      'Triangulo de evaluacion pediatrica, dosis por peso, manejo de la fiebre y la deshidratacion, y las diferencias anatomofisiologicas del nino.',
    objetivos: [
      'Aplicar el triangulo de evaluacion pediatrica en la valoracion rapida.',
      'Calcular dosis y volumenes por peso en el paciente pediatrico.',
      'Evaluar y clasificar el grado de deshidratacion.',
      'Razonar el abordaje de la fiebre segun la edad.',
      'Reconocer las diferencias anatomofisiologicas que cambian el manejo.',
    ],
    secciones: [
      {
        titulo: 'Triangulo de evaluacion pediatrica',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El triangulo de evaluacion pediatrica es una herramienta de impresion rapida, sin tocar al nino, basada en lo que se ve y se escucha en segundos. Permite decidir la gravedad y la prioridad antes de la exploracion detallada.',
          },
          {
            tipo: 'lista',
            titulo: 'Los tres lados del triangulo',
            items: [
              'Apariencia: tono, interaccion, consolabilidad, mirada y llanto.',
              'Trabajo respiratorio: ruidos anormales, retracciones, aleteo nasal, postura.',
              'Circulacion cutanea: color de la piel (palidez, cianosis, piel marmorea).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Como interpretarlo',
            texto:
              'La apariencia alterada sola sugiere disfuncion sistemica o neurologica; con el trabajo respiratorio orienta a dificultad respiratoria o falla; con la circulacion alterada apunta a choque. Los tres lados alterados indican falla cardiopulmonar.',
          },
        ],
      },
      {
        titulo: 'Diferencias anatomofisiologicas',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Via aerea y respiracion',
            items: [
              'Cabeza grande y occipucio prominente: la posicion neutra alinea la via aerea.',
              'Lengua relativamente grande y via aerea estrecha: mayor riesgo de obstruccion.',
              'Dependen mas del diafragma; se fatigan rapido. La taquipnea es un signo temprano.',
              'Mayor superficie corporal: pierden calor con facilidad.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Circulacion y compensacion',
            items: [
              'Mantienen la presion arterial hasta etapas avanzadas del choque (la hipotension es tardia y ominosa).',
              'La taquicardia y el llenado capilar lento son signos tempranos de hipoperfusion.',
              'El gasto cardiaco depende mucho de la frecuencia cardiaca; la bradicardia es grave.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'La hipotension pediatrica es tardia',
            texto:
              'El nino compensa el choque con vasoconstriccion y taquicardia, manteniendo la presion casi hasta el final. Cuando aparece la hipotension, el choque ya esta descompensado. Hay que reconocer los signos tempranos: taquicardia, piel fria y moteada, llenado capilar prolongado.',
          },
        ],
      },
      {
        titulo: 'Dosis y liquidos por peso',
        bloques: [
          {
            tipo: 'p',
            texto:
              'En pediatria casi todo se calcula por peso (kilogramos). Esto exige un peso confiable y calculo cuidadoso, ya que el margen de error es menor que en el adulto.',
          },
          {
            tipo: 'formula',
            texto: 'Bolo de reanimacion con cristaloide isotonico: 20 mL/kg, reevaluando tras cada bolo',
            nota: 'Se reevalua la respuesta entre bolos; en cardiopatia o sospecha de sobrecarga se usan volumenes menores y mayor cautela.',
          },
          {
            tipo: 'formula',
            texto: 'Mantenimiento (regla 4-2-1): 4 mL/kg/h para los primeros 10 kg, 2 mL/kg/h para los siguientes 10 kg y 1 mL/kg/h por cada kg adicional',
            nota: 'Sirve para estimar el liquido de mantenimiento por hora segun el peso del nino.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Calculo por peso',
            texto:
              'Verificar siempre la dosis en mg/kg y el volumen final, y respetar las dosis maximas que coinciden con las del adulto. Un error de un decimal puede ser critico en un lactante.',
          },
        ],
      },
      {
        titulo: 'Deshidratacion',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Grados de deshidratacion',
            headers: ['Grado', 'Signos clinicos', 'Conducta'],
            filas: [
              ['Leve', 'Mucosas algo secas, sed, sin alteracion hemodinamica', 'Rehidratacion oral'],
              ['Moderada', 'Ojos hundidos, llenado capilar lento, irritabilidad, oliguria', 'Rehidratacion oral o intravenosa segun tolerancia'],
              ['Grave', 'Letargia, signo del pliegue, hipotension, choque', 'Rehidratacion intravenosa con bolos'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Signos utiles en el nino',
            items: [
              'Llenado capilar prolongado.',
              'Ausencia de lagrimas y mucosas secas.',
              'Fontanela hundida en el lactante.',
              'Disminucion del gasto urinario (panales secos).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Rehidratacion oral primero',
            texto:
              'En la deshidratacion leve a moderada, la rehidratacion oral con sales de rehidratacion es eficaz y de eleccion. La via intravenosa se reserva para la deshidratacion grave, el choque o la intolerancia a la via oral.',
          },
        ],
      },
      {
        titulo: 'Fiebre en pediatria',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La fiebre es un motivo de consulta muy frecuente. El abordaje depende de la edad: cuanto menor es el nino, mayor el riesgo de infeccion bacteriana grave y mas cauteloso el manejo.',
          },
          {
            tipo: 'lista',
            titulo: 'Abordaje por edad',
            items: [
              'Lactante muy pequeno (menor de un mes y los primeros meses): mayor riesgo; suele requerir estudios amplios.',
              'Nino mayor con buen estado general: foco clinico identificable y manejo dirigido.',
              'Valorar siempre el estado general por encima de la cifra de temperatura.',
              'Buscar signos de alarma: mal aspecto, exantema petequial, rigidez de nuca, dificultad respiratoria.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El estado general manda',
            texto:
              'Un nino con fiebre alta pero buen aspecto e interactivo suele tener menor riesgo que uno con fiebre menor pero aspecto toxico (letargia, irritabilidad, mala perfusion). La apariencia del triangulo pediatrico orienta mas que el numero del termometro.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Triangulo de evaluacion pediatrica', definicion: 'Impresion rapida basada en apariencia, trabajo respiratorio y circulacion cutanea.' },
      { termino: 'Hipotension tardia', definicion: 'En el nino la presion se mantiene hasta el choque descompensado; su caida es signo ominoso.' },
      { termino: 'Bolo de 20 mL/kg', definicion: 'Volumen de reanimacion con cristaloide isotonico, reevaluado entre bolos.' },
      { termino: 'Regla 4-2-1', definicion: 'Calculo de liquidos de mantenimiento por peso en pediatria.' },
      { termino: 'Signo del pliegue', definicion: 'Persistencia del pliegue cutaneo; signo de deshidratacion grave.' },
      { termino: 'Rehidratacion oral', definicion: 'Tratamiento de eleccion en deshidratacion leve a moderada.' },
      { termino: 'Aspecto toxico', definicion: 'Mal estado general (letargia, mala perfusion) que indica gravedad mas alla de la fiebre.' },
    ],
    flashcards: [
      { frente: 'Cuales son los tres lados del triangulo de evaluacion pediatrica', reverso: 'Apariencia, trabajo respiratorio y circulacion cutanea.' },
      { frente: 'Por que es ominosa la hipotension en el nino', reverso: 'Porque aparece tarde; el nino compensa hasta el choque descompensado.' },
      { frente: 'Volumen del bolo de reanimacion pediatrico estandar', reverso: '20 mL/kg de cristaloide isotonico, reevaluando entre bolos.' },
      { frente: 'En que consiste la regla 4-2-1', reverso: '4 mL/kg/h por los primeros 10 kg, 2 por los siguientes 10 y 1 por cada kg adicional.' },
      { frente: 'Tratamiento de eleccion en deshidratacion leve a moderada', reverso: 'Rehidratacion oral con sales de rehidratacion.' },
      { frente: 'Signo temprano de hipoperfusion en el nino', reverso: 'Taquicardia y llenado capilar prolongado.' },
      { frente: 'Que vale mas: la cifra de fiebre o el estado general', reverso: 'El estado general (el aspecto del nino).' },
      { frente: 'Por que el lactante muy pequeno con fiebre requiere mas cautela', reverso: 'Mayor riesgo de infeccion bacteriana grave.' },
    ],
    quiz: [
      {
        pregunta: 'Los tres componentes del triangulo de evaluacion pediatrica son:',
        opciones: ['Pulso, presion y temperatura', 'Apariencia, trabajo respiratorio y circulacion cutanea', 'Glucosa, oxigeno y peso', 'Frecuencia cardiaca, frecuencia respiratoria y saturacion'],
        correcta: 1,
        explicacion: 'El triangulo se basa en apariencia, trabajo respiratorio y circulacion cutanea, valorados sin tocar al nino.',
      },
      {
        pregunta: 'En el choque pediatrico, la hipotension:',
        opciones: ['Aparece temprano', 'Es un signo tardio y ominoso', 'Nunca ocurre', 'Es el primer signo'],
        correcta: 1,
        explicacion: 'El nino compensa con taquicardia y vasoconstriccion; la hipotension aparece tarde e indica choque ya descompensado.',
      },
      {
        pregunta: 'El bolo estandar de reanimacion con cristaloide en pediatria es de:',
        opciones: ['5 mL/kg', '10 mL/kg', '20 mL/kg', '40 mL/kg'],
        correcta: 2,
        explicacion: 'Se administra un bolo de 20 mL/kg de cristaloide isotonico y se reevalua la respuesta antes de repetir.',
      },
      {
        pregunta: 'Segun la regla 4-2-1, el mantenimiento por hora de un nino de 22 kg es:',
        opciones: ['22 mL/h', '42 mL/h', '62 mL/h', '88 mL/h'],
        correcta: 2,
        explicacion: '40 (primeros 10 kg) mas 20 (siguientes 10 kg) mas 2 (los 2 kg restantes) igual a 62 mL/h.',
      },
      {
        pregunta: 'Para una deshidratacion moderada en un nino que tolera la via oral, lo indicado es:',
        opciones: ['Bolos intravenosos inmediatos', 'Rehidratacion oral con sales de rehidratacion', 'Solo observacion', 'Antibioticos'],
        correcta: 1,
        explicacion: 'La rehidratacion oral es de eleccion en la deshidratacion leve a moderada con tolerancia oral; la via intravenosa se reserva para casos graves.',
      },
      {
        pregunta: 'Cual de estos signos sugiere deshidratacion grave:',
        opciones: ['Sed leve', 'Mucosas ligeramente secas', 'Signo del pliegue persistente y letargia', 'Llanto con lagrimas'],
        correcta: 2,
        explicacion: 'El signo del pliegue persistente, la letargia y la inestabilidad hemodinamica indican deshidratacion grave que requiere via intravenosa.',
      },
      {
        pregunta: 'En la valoracion de la fiebre pediatrica, el factor mas importante para juzgar la gravedad es:',
        opciones: ['La cifra exacta de temperatura', 'El estado general y el aspecto del nino', 'La duracion en dias siempre', 'El color de la fiebre'],
        correcta: 1,
        explicacion: 'El estado general (aspecto, interaccion, perfusion) pesa mas que la cifra del termometro para estimar el riesgo.',
      },
    ],
  },
]
