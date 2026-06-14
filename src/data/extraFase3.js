// FASE 3 — Temas avanzados adicionales (TUM-Intermedio)
// Farmacología, ECG, vía aérea supraglótica, fluidoterapia, monitorización y vías de administración.

export const extraFase3 = [
  {
    id: 'farmacologia-por-sistemas',
    numero: '3.3',
    titulo: 'Farmacología por Sistemas',
    icono: '💊',
    duracion: '55 min',
    resumen:
      'Un fármaco no se memoriza por su nombre sino por su mecanismo. Organizar la farmacología prehospitalaria por sistemas permite anticipar efectos, dosis e interacciones bajo presión.',
    objetivos: [
      'Relacionar el mecanismo de acción de los fármacos clave con su indicación clínica.',
      'Recordar dosis y vías prehospitalarias de los medicamentos de uso frecuente.',
      'Identificar contraindicaciones y efectos adversos relevantes en campo.',
      'Aplicar los seis correctos en la administración de medicamentos.',
    ],
    secciones: [
      {
        titulo: 'Principios farmacológicos esenciales',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La farmacocinética describe lo que el cuerpo le hace al fármaco (absorción, distribución, metabolismo y eliminación), mientras que la farmacodinamia describe lo que el fármaco le hace al cuerpo (interacción con receptores). En urgencias importan dos conceptos: el inicio de acción y la duración del efecto, porque determinan cuándo veremos resultado y cuándo repetir la dosis.',
          },
          {
            tipo: 'lista',
            titulo: 'Conceptos de receptores',
            items: [
              'Agonista: se une al receptor y lo activa, imitando al ligando natural (la adrenalina sobre receptores adrenérgicos).',
              'Antagonista: se une al receptor pero lo bloquea, impidiendo la activación (la naloxona sobre receptores opioides).',
              'Afinidad: fuerza con que el fármaco se une al receptor; la naloxona desplaza al opioide por mayor afinidad.',
              'Efecto techo: dosis a partir de la cual aumentar el fármaco ya no aumenta el efecto deseado.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Los seis correctos',
            texto:
              'Paciente correcto, medicamento correcto, dosis correcta, vía correcta, hora correcta y documentación correcta. Verificar caducidad, color y transparencia de la solución es parte del medicamento correcto.',
          },
        ],
      },
      {
        titulo: 'Sistema cardiovascular',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Los fármacos cardiovasculares modulan la frecuencia, la contractilidad y el tono vascular actuando sobre receptores adrenérgicos, canales iónicos o el sistema nervioso autónomo. Conocer el receptor predice el efecto: alfa-1 vasoconstriñe, beta-1 acelera y contrae el corazón, beta-2 broncodilata y vasodilata.',
          },
          {
            tipo: 'tabla',
            titulo: 'Fármacos cardiovasculares clave',
            headers: ['Fármaco', 'Mecanismo', 'Indicación y dosis prehospitalaria'],
            filas: [
              ['Adrenalina (epinefrina)', 'Agonista alfa y beta', 'Paro: 1 mg IV/IO cada 3-5 min. Anafilaxia: 0.3-0.5 mg IM (0.01 mg/kg en niños).'],
              ['Atropina', 'Antagonista muscarínico (vagolítico)', 'Bradicardia sintomática: 0.5 mg IV cada 3-5 min, máximo 3 mg.'],
              ['Amiodarona', 'Antiarrítmico clase III (bloquea canales de K)', 'FV/TV sin pulso refractaria: 300 mg IV en bolo, segunda dosis de 150 mg.'],
              ['Nitroglicerina', 'Vasodilatador (libera óxido nítrico)', 'Dolor torácico isquémico: 0.4 mg sublingual cada 5 min hasta 3 dosis si TAS mayor de 90.'],
              ['Aspirina', 'Antiagregante (inhibe COX-1)', 'Sospecha de SICA: 160-325 mg masticable.'],
              ['Adenosina', 'Frena el nodo AV', 'TSV: 6 mg IV rápido seguido de bolo de salino; segunda dosis de 12 mg.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Nitroglicerina y disfunción eréctil',
            texto:
              'Nunca administre nitroglicerina si el paciente tomó sildenafil (Viagra) o similares en las últimas 24-48 horas: la combinación produce hipotensión profunda y refractaria. Verifique siempre antes de dar nitratos.',
          },
        ],
      },
      {
        titulo: 'Sistema respiratorio',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El objetivo en la vía aérea reactiva es revertir el broncoespasmo y reducir la inflamación. Los beta-2 agonistas relajan el músculo liso bronquial de forma rápida; los anticolinérgicos lo complementan; los corticoides actúan en horas reduciendo la inflamación de base.',
          },
          {
            tipo: 'tabla',
            titulo: 'Fármacos respiratorios',
            headers: ['Fármaco', 'Clase', 'Dosis prehospitalaria'],
            filas: [
              ['Salbutamol', 'Beta-2 agonista de acción corta', 'Crisis asmática: 2.5-5 mg nebulizado, repetible. Broncodilatación en minutos.'],
              ['Ipratropio', 'Anticolinérgico inhalado', '0.5 mg nebulizado, suele combinarse con salbutamol.'],
              ['Metilprednisolona', 'Corticoide sistémico', '125 mg IV en crisis asmática moderada-grave; inicio lento.'],
              ['Adrenalina IM', 'Agonista alfa y beta', 'Broncoespasmo grave o anafilaxia: 0.3-0.5 mg IM.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Temblor y taquicardia',
            texto:
              'El salbutamol estimula también receptores beta-1 a dosis altas, por lo que el temblor fino, la taquicardia y la hipopotasemia leve son efectos esperables tras nebulizaciones repetidas. No suelen requerir tratamiento.',
          },
        ],
      },
      {
        titulo: 'Sistema neurológico y analgesia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'En el ámbito prehospitalario se controlan convulsiones, dolor, hipoglucemia y sobredosis de opioides. El manejo del dolor es un derecho del paciente y mejora los desenlaces; la analgesia debe titularse vigilando ventilación y presión arterial.',
          },
          {
            tipo: 'tabla',
            titulo: 'Fármacos neurológicos y analgésicos',
            headers: ['Fármaco', 'Uso', 'Dosis prehospitalaria'],
            filas: [
              ['Midazolam', 'Convulsiones / sedación', '10 mg IM o 0.2 mg/kg intranasal; 0.1 mg/kg IV titulado.'],
              ['Diazepam', 'Convulsiones', '5-10 mg IV lento, repetible.'],
              ['Naloxona', 'Reversión de opioides', '0.4-2 mg IV/IM/IO o 2-4 mg intranasal, titulando a la ventilación.'],
              ['Glucosa al 50% (dextrosa)', 'Hipoglucemia', '25 g IV (50 mL al 50%).'],
              ['Glucagón', 'Hipoglucemia sin acceso IV', '1 mg IM/SC.'],
              ['Morfina', 'Dolor moderado-intenso', '2-4 mg IV titulados, vigilando ventilación y TA.'],
              ['Fentanilo', 'Dolor / hemodinamia inestable', '1 mcg/kg IV o 1.5-2 mcg/kg intranasal.'],
              ['Ketamina', 'Analgesia / sedación', 'Analgesia: 0.1-0.3 mg/kg IV. Disociativa: 1-2 mg/kg IV.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Naloxona: titular, no inundar',
            texto:
              'El objetivo de la naloxona es restaurar la ventilación, no despertar por completo al paciente. Una reversión brusca puede precipitar un síndrome de abstinencia agudo con agitación, vómito y edema pulmonar. Administre dosis pequeñas y repita.',
          },
        ],
      },
      {
        titulo: 'Errores y seguridad farmacológica',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Errores frecuentes a evitar',
            items: [
              'Confundir concentraciones de adrenalina: 1 mg/mL (anafilaxia IM) frente a 0.1 mg/mL (paro IV).',
              'No reevaluar la TA antes de repetir nitroglicerina.',
              'Dar la dosis pediátrica como si fuera de adulto: siempre calcular por peso.',
              'Olvidar el bolo de arrastre tras la adenosina, que se inactiva en segundos.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Cálculo de dosis por peso',
            items: [
              'Confirme el peso en kilogramos (estime con cinta de Broselow en niños).',
              'Multiplique la dosis por kg por el peso para obtener la dosis total.',
              'Convierta la dosis total a volumen usando la concentración del vial.',
              'Verifique en voz alta con el compañero antes de administrar.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Agonista', definicion: 'Fármaco que se une a un receptor y lo activa, imitando al ligando natural.' },
      { termino: 'Antagonista', definicion: 'Fármaco que bloquea el receptor sin activarlo, como la naloxona.' },
      { termino: 'Farmacocinética', definicion: 'Lo que el organismo hace con el fármaco: absorción, distribución, metabolismo y eliminación.' },
      { termino: 'Vagolítico', definicion: 'Sustancia que bloquea el efecto del nervio vago, aumentando la frecuencia cardíaca, como la atropina.' },
      { termino: 'Efecto techo', definicion: 'Dosis a partir de la cual aumentar el fármaco no incrementa el efecto deseado.' },
      { termino: 'Titulación', definicion: 'Administrar pequeñas dosis sucesivas hasta lograr el efecto buscado minimizando efectos adversos.' },
    ],
    flashcards: [
      { frente: 'Dosis de adrenalina en paro cardíaco', reverso: '1 mg IV/IO cada 3-5 minutos (concentración 0.1 mg/mL).' },
      { frente: 'Dosis de adrenalina en anafilaxia (adulto)', reverso: '0.3-0.5 mg IM (concentración 1 mg/mL).' },
      { frente: 'Dosis máxima de atropina en bradicardia', reverso: '3 mg en total (0.5 mg cada 3-5 min).' },
      { frente: 'Primera dosis de amiodarona en FV refractaria', reverso: '300 mg IV en bolo.' },
      { frente: 'Por qué la adenosina necesita bolo de arrastre', reverso: 'Tiene vida media de segundos; el bolo la empuja al corazón antes de inactivarse.' },
      { frente: 'Mecanismo de la naloxona', reverso: 'Antagonista de receptores opioides con alta afinidad que los desplaza.' },
      { frente: 'Contraindicación clave de la nitroglicerina', reverso: 'Uso de sildenafil o similares en 24-48 h, e hipotensión (TAS menor de 90).' },
      { frente: 'Dosis de glucosa al 50% en hipoglucemia', reverso: '25 g IV (50 mL de la solución al 50%).' },
      { frente: 'Beta-2 agonista de acción corta y su dosis nebulizada', reverso: 'Salbutamol 2.5-5 mg nebulizado.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con dolor torácico isquémico refiere haber tomado sildenafil esta mañana. ¿Cuál es la conducta correcta respecto a la nitroglicerina?',
        opciones: ['Administrarla a doble dosis', 'No administrarla por riesgo de hipotensión grave', 'Administrarla solo si hay taquicardia', 'Administrarla por vía IV en lugar de sublingual'],
        correcta: 1,
        explicacion: 'Los nitratos combinados con inhibidores de la fosfodiesterasa-5 (sildenafil) potencian la vasodilatación y producen hipotensión profunda y refractaria. Está contraindicada en las 24-48 h posteriores.',
      },
      {
        pregunta: 'La diferencia entre la adrenalina usada en paro y la usada en anafilaxia IM es:',
        opciones: ['Es el mismo vial sin distinción', 'La concentración: 0.1 mg/mL IV en paro y 1 mg/mL IM en anafilaxia', 'La anafilaxia usa la vía IV obligatoria', 'En paro se diluye en glucosa'],
        correcta: 1,
        explicacion: 'Confundir las concentraciones es un error grave. En paro se usa la presentación diluida 0.1 mg/mL por vía IV/IO; en anafilaxia la concentrada 1 mg/mL por vía IM.',
      },
      {
        pregunta: 'Al revertir una sobredosis de opioides con naloxona, el objetivo terapéutico es:',
        opciones: ['Despertar completamente al paciente de inmediato', 'Restaurar una ventilación adecuada titulando la dosis', 'Provocar abstinencia para evitar recaídas', 'Mantener al paciente sedado'],
        correcta: 1,
        explicacion: 'La meta es recuperar la respiración eficaz, no el despertar total. La reversión brusca puede desencadenar abstinencia aguda con agitación, vómito y edema pulmonar.',
      },
      {
        pregunta: 'La atropina actúa en la bradicardia sintomática porque es un:',
        opciones: ['Agonista beta-1', 'Antagonista muscarínico que bloquea el vago', 'Bloqueador de canales de calcio', 'Vasodilatador directo'],
        correcta: 1,
        explicacion: 'La atropina es vagolítica: bloquea los receptores muscarínicos, reduciendo el freno parasimpático sobre el nodo sinusal y aumentando la frecuencia cardíaca.',
      },
      {
        pregunta: 'Tras administrar 6 mg de adenosina IV para una TSV no hay respuesta. ¿Qué pudo fallar con mayor probabilidad?',
        opciones: ['La dosis fue excesiva', 'No se administró el bolo de arrastre rápido', 'Debió darse por vía IM', 'El fármaco actúa en 30 minutos'],
        correcta: 1,
        explicacion: 'La adenosina tiene una vida media de segundos. Sin un bolo de salino que la empuje rápidamente hacia el corazón, se inactiva antes de actuar sobre el nodo AV.',
      },
      {
        pregunta: 'El temblor fino y la taquicardia tras varias nebulizaciones de salbutamol se explican por:',
        opciones: ['Reacción alérgica al fármaco', 'Estimulación beta-1 a dosis altas', 'Hipoglucemia inducida', 'Bloqueo colinérgico'],
        correcta: 1,
        explicacion: 'Aunque el salbutamol es selectivo beta-2, a dosis repetidas estimula también receptores beta-1, produciendo taquicardia y temblor. Son efectos esperables y rara vez requieren tratamiento.',
      },
      {
        pregunta: 'En un niño con convulsión activa sin acceso IV, una opción adecuada es:',
        opciones: ['Esperar a tener vía IV antes de tratar', 'Midazolam intranasal o IM', 'Diazepam oral', 'Adrenalina IM'],
        correcta: 1,
        explicacion: 'El midazolam intranasal (0.2 mg/kg) o IM permite controlar la crisis sin acceso vascular, evitando retrasos peligrosos en una convulsión prolongada.',
      },
    ],
  },
  {
    id: 'ecg-basico',
    numero: '3.4',
    titulo: 'Electrocardiografía Básica',
    icono: '📈',
    duracion: '60 min',
    resumen:
      'El ECG traduce la actividad eléctrica del corazón en ondas. Leerlo de forma sistemática (ritmo, frecuencia, ondas y eje) convierte una línea aparentemente caótica en información clínica precisa.',
    objetivos: [
      'Describir el sistema de conducción y su correlato en las ondas del ECG.',
      'Identificar derivaciones y la zona del corazón que cada una explora.',
      'Calcular la frecuencia cardíaca por varios métodos.',
      'Reconocer el ritmo sinusal normal y estimar el eje eléctrico.',
    ],
    secciones: [
      {
        titulo: 'Del impulso eléctrico a la onda',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El impulso nace en el nodo sinusal (marcapasos natural, 60-100 por minuto), recorre las aurículas, se frena en el nodo AV, baja por el haz de His y se distribuye por las fibras de Purkinje hasta los ventrículos. Cada paso deja una huella eléctrica que el ECG registra.',
          },
          {
            tipo: 'diagrama',
            clave: 'conduccion',
          },
          {
            tipo: 'lista',
            titulo: 'Correlato de cada estructura',
            items: [
              'Nodo sinusal y aurículas: onda P (despolarización auricular).',
              'Nodo AV: pausa fisiológica, corresponde al segmento PR.',
              'Ventrículos: complejo QRS (despolarización ventricular).',
              'Repolarización ventricular: onda T.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Jerarquía de marcapasos',
            texto:
              'Si el nodo sinusal falla, el nodo AV asume el control a 40-60 por minuto, y si este falla, los ventrículos disparan a 20-40 por minuto. A menor sitio, menor frecuencia y menor estabilidad.',
          },
        ],
      },
      {
        titulo: 'Las ondas, segmentos e intervalos',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'ecg',
          },
          {
            tipo: 'tabla',
            titulo: 'Componentes de la onda electrocardiográfica',
            headers: ['Componente', 'Representa', 'Valor normal'],
            filas: [
              ['Onda P', 'Despolarización auricular', 'Menor de 0.12 s, positiva en DII'],
              ['Intervalo PR', 'Tiempo aurícula a ventrículo', '0.12-0.20 s (3-5 cuadros pequeños)'],
              ['Complejo QRS', 'Despolarización ventricular', 'Menor de 0.12 s (menos de 3 cuadros)'],
              ['Segmento ST', 'Inicio de la repolarización', 'Isoeléctrico (en la línea base)'],
              ['Onda T', 'Repolarización ventricular', 'Asimétrica, concordante con el QRS'],
              ['Intervalo QT', 'Despolarización y repolarización total', 'Variable con la frecuencia, suele menor de 0.44 s'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'El papel del ECG corre a 25 mm/s. Cada cuadro pequeño (1 mm) equivale a 0.04 s y cada cuadro grande (5 mm) a 0.20 s. En el eje vertical, 10 mm equivalen a 1 mV de voltaje. Esta cuadrícula es la regla que permite medir tiempos y amplitudes.',
          },
        ],
      },
      {
        titulo: 'Derivaciones y territorios',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Las 12 derivaciones son cámaras que fotografían el corazón desde distintos ángulos. Seis son de los miembros (plano frontal) y seis precordiales (plano horizontal). Agrupar las derivaciones por territorio permite localizar dónde ocurre una isquemia.',
          },
          {
            tipo: 'tabla',
            titulo: 'Territorios coronarios en el ECG',
            headers: ['Cara', 'Derivaciones', 'Arteria habitual'],
            filas: [
              ['Inferior', 'DII, DIII, aVF', 'Coronaria derecha'],
              ['Lateral', 'DI, aVL, V5, V6', 'Circunfleja'],
              ['Septal', 'V1, V2', 'Descendente anterior'],
              ['Anterior', 'V3, V4', 'Descendente anterior'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Imagen en espejo',
            texto:
              'Una lesión en la cara inferior (DII, DIII, aVF) puede mostrar descenso del ST en las derivaciones opuestas (DI, aVL): son cambios recíprocos que refuerzan el diagnóstico de infarto.',
          },
        ],
      },
      {
        titulo: 'Cálculo de la frecuencia cardíaca',
        bloques: [
          {
            tipo: 'formula',
            texto: 'FC = 300 / numero de cuadros grandes entre dos R',
            nota: 'Método rápido para ritmos regulares: cuente los cuadros grandes entre dos complejos QRS y divida 300 entre ese número.',
          },
          {
            tipo: 'lista',
            titulo: 'Secuencia memorística de cuadros grandes',
            items: [
              '1 cuadro grande entre R y R: 300 por minuto.',
              '2 cuadros: 150 por minuto.',
              '3 cuadros: 100 por minuto.',
              '4 cuadros: 75 por minuto.',
              '5 cuadros: 60 por minuto.',
              '6 cuadros: 50 por minuto.',
            ],
          },
          {
            tipo: 'formula',
            texto: 'FC = numero de QRS en 30 cuadros grandes x 10',
            nota: 'Método de los 6 segundos, ideal para ritmos irregulares como la fibrilación auricular: cuente los QRS en una tira de 6 segundos y multiplique por 10.',
          },
        ],
      },
      {
        titulo: 'Ritmo sinusal y eje eléctrico',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Criterios de ritmo sinusal normal',
            items: [
              'Frecuencia entre 60 y 100 por minuto.',
              'Una onda P antes de cada QRS y un QRS después de cada P.',
              'Onda P positiva en DII y negativa en aVR.',
              'Intervalo PR constante y normal (0.12-0.20 s).',
              'Ritmo regular (intervalos R-R uniformes).',
            ],
          },
          {
            tipo: 'p',
            texto:
              'El eje eléctrico es la dirección promedio de la despolarización ventricular. Una estimación rápida usa DI y aVF: si el QRS es positivo en ambas, el eje es normal. La desviación del eje sugiere hipertrofia, bloqueos de rama o patología pulmonar.',
          },
          {
            tipo: 'tabla',
            titulo: 'Estimación rápida del eje',
            headers: ['DI', 'aVF', 'Eje'],
            filas: [
              ['Positivo', 'Positivo', 'Normal'],
              ['Positivo', 'Negativo', 'Desviación izquierda'],
              ['Negativo', 'Positivo', 'Desviación derecha'],
              ['Negativo', 'Negativo', 'Desviación extrema (noroeste)'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El ECG no sustituye al paciente',
            texto:
              'Un ECG normal no descarta un síndrome coronario agudo, y un trazo anormal en un paciente asintomático no siempre es urgencia. Correlacione siempre el ECG con la clínica.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Onda P', definicion: 'Deflexión que representa la despolarización de las aurículas.' },
      { termino: 'Complejo QRS', definicion: 'Conjunto de ondas que representa la despolarización de los ventrículos.' },
      { termino: 'Intervalo PR', definicion: 'Tiempo desde el inicio de la P hasta el inicio del QRS; refleja la conducción aurícula-ventrículo.' },
      { termino: 'Segmento ST', definicion: 'Tramo entre el QRS y la onda T; su elevación o descenso indica isquemia o lesión.' },
      { termino: 'Ritmo sinusal', definicion: 'Ritmo originado en el nodo sinusal con P antes de cada QRS y frecuencia 60-100.' },
      { termino: 'Eje eléctrico', definicion: 'Dirección promedio de la despolarización ventricular en el plano frontal.' },
      { termino: 'Cambios recíprocos', definicion: 'Descenso del ST en derivaciones opuestas a una zona de lesión; refuerzan el diagnóstico.' },
    ],
    flashcards: [
      { frente: 'Qué representa la onda P', reverso: 'La despolarización de las aurículas.' },
      { frente: 'Valor normal del intervalo PR', reverso: '0.12 a 0.20 segundos (3 a 5 cuadros pequeños).' },
      { frente: 'Duración normal del QRS', reverso: 'Menor de 0.12 segundos (menos de 3 cuadros pequeños).' },
      { frente: 'Método de los cuadros grandes para la FC', reverso: 'Dividir 300 entre el número de cuadros grandes entre dos R.' },
      { frente: 'Método de los 6 segundos', reverso: 'Contar los QRS en 6 segundos (30 cuadros grandes) y multiplicar por 10.' },
      { frente: 'Derivaciones de la cara inferior', reverso: 'DII, DIII y aVF (coronaria derecha).' },
      { frente: 'Frecuencia intrínseca del nodo sinusal', reverso: '60 a 100 latidos por minuto.' },
      { frente: 'Eje normal según DI y aVF', reverso: 'QRS positivo en DI y positivo en aVF.' },
      { frente: 'A qué velocidad corre el papel del ECG', reverso: 'A 25 mm/s; cada cuadro pequeño es 0.04 s.' },
    ],
    quiz: [
      {
        pregunta: 'En una tira de ritmo regular hay 4 cuadros grandes entre dos ondas R. La frecuencia cardíaca aproximada es:',
        opciones: ['60 por minuto', '75 por minuto', '100 por minuto', '150 por minuto'],
        correcta: 1,
        explicacion: '300 dividido entre 4 cuadros grandes da 75 por minuto. Es el método rápido para ritmos regulares.',
      },
      {
        pregunta: 'Cuál es el orden correcto del sistema de conducción cardíaca:',
        opciones: ['Nodo AV, nodo sinusal, His, Purkinje', 'Nodo sinusal, nodo AV, haz de His, fibras de Purkinje', 'His, Purkinje, nodo sinusal, nodo AV', 'Purkinje, His, nodo AV, nodo sinusal'],
        correcta: 1,
        explicacion: 'El impulso nace en el nodo sinusal, se frena en el nodo AV, desciende por el haz de His y se distribuye por las fibras de Purkinje.',
      },
      {
        pregunta: 'Un infarto de cara inferior se identifica por cambios en:',
        opciones: ['V1 y V2', 'DI y aVL', 'DII, DIII y aVF', 'V3 y V4'],
        correcta: 2,
        explicacion: 'DII, DIII y aVF exploran la cara inferior, irrigada habitualmente por la coronaria derecha. DI y aVL pueden mostrar cambios recíprocos.',
      },
      {
        pregunta: 'Para calcular la frecuencia en una fibrilación auricular (ritmo irregular) lo más fiable es:',
        opciones: ['Dividir 300 entre los cuadros grandes', 'El método de los 6 segundos', 'Contar las ondas P', 'Medir el intervalo PR'],
        correcta: 1,
        explicacion: 'En ritmos irregulares el método de los cuadros grandes es impreciso; contar los QRS en 6 segundos y multiplicar por 10 promedia las variaciones.',
      },
      {
        pregunta: 'Cuál de los siguientes NO es criterio de ritmo sinusal normal:',
        opciones: ['Una onda P antes de cada QRS', 'Frecuencia entre 60 y 100', 'Onda P positiva en aVR', 'Intervalo PR constante'],
        correcta: 2,
        explicacion: 'En ritmo sinusal la onda P es negativa en aVR y positiva en DII. Una P positiva en aVR sugiere otro origen del ritmo o mala colocación de electrodos.',
      },
      {
        pregunta: 'Un QRS positivo en DI y negativo en aVF indica:',
        opciones: ['Eje normal', 'Desviación del eje a la izquierda', 'Desviación del eje a la derecha', 'Desviación extrema'],
        correcta: 1,
        explicacion: 'DI positivo con aVF negativo corresponde a desviación del eje a la izquierda, asociada a causas como hemibloqueo anterior izquierdo o hipertrofia.',
      },
      {
        pregunta: 'Si el nodo sinusal deja de funcionar, el siguiente marcapasos y su frecuencia esperada son:',
        opciones: ['Los ventrículos a 100 por minuto', 'El nodo AV a 40-60 por minuto', 'Las fibras de Purkinje a 80 por minuto', 'Las aurículas a 120 por minuto'],
        correcta: 1,
        explicacion: 'En la jerarquía de marcapasos, el nodo AV asume el control a 40-60 por minuto. A menor sitio en la jerarquía, menor frecuencia y estabilidad.',
      },
      {
        pregunta: 'Cada cuadro pequeño del papel del ECG, a velocidad estándar, equivale a:',
        opciones: ['0.04 segundos', '0.20 segundos', '1 segundo', '0.5 segundos'],
        correcta: 0,
        explicacion: 'A 25 mm/s, cada cuadro pequeño (1 mm) equivale a 0.04 s y cada cuadro grande (5 mm) a 0.20 s.',
      },
    ],
  },
  {
    id: 'via-aerea-avanzada-supraglotica',
    numero: '3.5',
    titulo: 'Manejo Avanzado de la Vía Aérea: Dispositivos Supraglóticos',
    icono: '🫁',
    duracion: '55 min',
    resumen:
      'Cuando la bolsa-válvula-mascarilla no basta y la intubación no es opción, los dispositivos supraglóticos ofrecen una vía aérea rápida y segura sin necesidad de visualizar las cuerdas vocales.',
    objetivos: [
      'Explicar el fundamento de los dispositivos supraglóticos y sus indicaciones.',
      'Comparar mascarilla laríngea, i-gel y tubo laríngeo.',
      'Describir la técnica de colocación y confirmación.',
      'Reconocer complicaciones y limitaciones de estos dispositivos.',
    ],
    secciones: [
      {
        titulo: 'Por qué supraglótico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Un dispositivo supraglótico (DSG) se asienta por encima de la glotis y sella la entrada de la laringe sin atravesar las cuerdas vocales. Esto permite ventilar a ciegas, con menos formación que la intubación endotraqueal y con tasas de éxito altas al primer intento, algo crítico durante la reanimación.',
          },
          {
            tipo: 'diagrama',
            clave: 'respiratorio',
          },
          {
            tipo: 'lista',
            titulo: 'Indicaciones',
            items: [
              'Paro cardíaco donde se prioriza minimizar interrupciones de las compresiones.',
              'Ventilación con BVM inadecuada o difícil.',
              'Rescate cuando la intubación endotraqueal falla.',
              'Operador sin entrenamiento o autorización para intubar.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Supraglótico vs. endotraqueal',
            texto:
              'El tubo endotraqueal protege mejor la vía aérea de la aspiración porque sella por debajo de la glotis, pero requiere más destreza. El DSG es más rápido y simple, aunque ofrece protección parcial frente a la broncoaspiración.',
          },
        ],
      },
      {
        titulo: 'Tipos de dispositivos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Comparación de dispositivos supraglóticos',
            headers: ['Dispositivo', 'Mecanismo de sello', 'Características'],
            filas: [
              ['Mascarilla laríngea (LMA)', 'Manguito inflable que rodea la entrada laríngea', 'El clásico; requiere inflar el balón con jeringa.'],
              ['i-gel', 'Gel termoplástico que se amolda sin balón', 'Colocación muy rápida, canal gástrico integrado, sin inflado.'],
              ['Tubo laríngeo (King LT)', 'Dos balones: uno esofágico y uno faríngeo', 'Sella esófago e hipofaringe; un solo punto de inflado.'],
              ['LMA de segunda generación', 'Manguito con canal gástrico', 'Permite drenar contenido gástrico y reducir aspiración.'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'Los dispositivos de segunda generación (i-gel y LMA con canal) incorporan un puerto para pasar una sonda gástrica, lo que disminuye el riesgo de regurgitación y aspiración, una ventaja relevante en pacientes con estómago lleno.',
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Elección por tamaño',
            texto:
              'El tamaño se elige por el peso del paciente y viene codificado por color en muchos dispositivos. Un dispositivo demasiado pequeño no sella; uno demasiado grande no se asienta. Tenga a la mano el de tamaño contiguo.',
          },
        ],
      },
      {
        titulo: 'Técnica de colocación',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Inserción de un i-gel',
            items: [
              'Preoxigenar y reunir el material; seleccionar el tamaño por peso.',
              'Lubricar el dorso del dispositivo con gel hidrosoluble.',
              'Posicionar la cabeza en olfateo (salvo trauma); abrir la boca.',
              'Introducir el dispositivo siguiendo el paladar hasta sentir resistencia firme.',
              'Confirmar que la marca de los dientes queda a la altura de los incisivos.',
              'Conectar la BVM y ventilar, verificando la colocación.',
              'Fijar el dispositivo y colocar un mordedor si está disponible.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Confirmación de la colocación',
            items: [
              'Elevación torácica simétrica y bilateral con la ventilación.',
              'Auscultación de ruidos respiratorios en ambos campos y ausencia en epigastrio.',
              'Capnografía con onda cuadrada de ETCO2 (el estándar de oro).',
              'Ausencia de fuga audible alrededor del dispositivo.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'La capnografía manda',
            texto:
              'La presencia de una onda de capnografía sostenida es el mejor indicador de ventilación efectiva. Si no hay ETCO2, asuma mala posición, retire y reinserte; no insista ventilando contra una vía sellada al esófago.',
          },
        ],
      },
      {
        titulo: 'Complicaciones y limitaciones',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Complicaciones posibles',
            items: [
              'Aspiración: protección incompleta frente al contenido gástrico.',
              'Fuga e hipoventilación si el sello es insuficiente o la presión es alta.',
              'Insuflación gástrica con ventilaciones demasiado rápidas o vigorosas.',
              'Lesión de tejidos blandos o laringoespasmo en pacientes con reflejos conservados.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Limitaciones y contraindicaciones',
            items: [
              'Reflejo nauseoso intacto o paciente consciente (no lo tolera).',
              'Obstrucción de la vía aérea por cuerpo extraño o edema laríngeo.',
              'Trauma o quemaduras significativas de la vía aérea superior.',
              'Necesidad de presiones de ventilación muy altas (la fuga aumenta).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Es un puente, no un destino',
            texto:
              'El DSG estabiliza la ventilación en el campo y permite trasladar; en el hospital suele cambiarse por un tubo endotraqueal cuando se requiere protección definitiva de la vía aérea.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Dispositivo supraglótico', definicion: 'Vía aérea que sella la entrada de la laringe sin pasar las cuerdas vocales.' },
      { termino: 'i-gel', definicion: 'DSG de gel termoplástico que se amolda a la laringe sin necesidad de inflar balón.' },
      { termino: 'Tubo laríngeo', definicion: 'Dispositivo con balones esofágico y faríngeo que aíslan la vía aérea.' },
      { termino: 'Canal gástrico', definicion: 'Puerto de los DSG de segunda generación para drenar el estómago y reducir aspiración.' },
      { termino: 'Capnografía', definicion: 'Medición del CO2 espirado; confirma de forma fiable la ventilación efectiva.' },
      { termino: 'Posición de olfateo', definicion: 'Alineación de los ejes de la vía aérea con leve extensión cervical para facilitar la inserción.' },
    ],
    flashcards: [
      { frente: 'Dónde se asienta un dispositivo supraglótico', reverso: 'Por encima de la glotis, sellando la entrada de la laringe sin pasar las cuerdas.' },
      { frente: 'Qué dispositivo NO requiere inflar balón', reverso: 'El i-gel, que se amolda con su gel termoplástico.' },
      { frente: 'Cuántos balones tiene el tubo laríngeo', reverso: 'Dos: uno esofágico y uno faríngeo.' },
      { frente: 'Mejor método para confirmar la ventilación', reverso: 'La capnografía con onda de ETCO2 sostenida.' },
      { frente: 'Ventaja de los DSG de segunda generación', reverso: 'Incluyen canal gástrico que reduce el riesgo de aspiración.' },
      { frente: 'Principal limitación frente al tubo endotraqueal', reverso: 'Protección incompleta contra la broncoaspiración.' },
      { frente: 'Contraindicación por estado de conciencia', reverso: 'Reflejo nauseoso intacto o paciente consciente.' },
    ],
    quiz: [
      {
        pregunta: 'La principal ventaja de un dispositivo supraglótico sobre la intubación endotraqueal durante un paro es:',
        opciones: ['Protege mejor de la aspiración', 'Es más rápido y requiere menos destreza', 'Permite presiones de ventilación más altas', 'No necesita confirmación de la colocación'],
        correcta: 1,
        explicacion: 'El DSG se coloca a ciegas, rápido y con menos entrenamiento, minimizando interrupciones de las compresiones. A cambio, protege menos de la aspiración que el tubo endotraqueal.',
      },
      {
        pregunta: 'Cuál de estos dispositivos se amolda a la laringe SIN necesidad de inflar un balón:',
        opciones: ['Mascarilla laríngea clásica', 'i-gel', 'Tubo laríngeo King LT', 'Tubo endotraqueal'],
        correcta: 1,
        explicacion: 'El i-gel emplea un gel termoplástico que se adapta con el calor corporal a la anatomía laríngea, lo que acelera su colocación.',
      },
      {
        pregunta: 'Tras colocar un DSG no se obtiene onda de capnografía. La conducta correcta es:',
        opciones: ['Aumentar la fuerza de ventilación', 'Asumir buena posición y continuar', 'Sospechar mala posición, retirar y reinsertar', 'Inflar más el balón'],
        correcta: 2,
        explicacion: 'La ausencia de ETCO2 sugiere que el dispositivo no está ventilando los pulmones (posible sellado esofágico). Hay que retirar y reinsertar, no insistir.',
      },
      {
        pregunta: 'La ventaja de un dispositivo supraglótico de segunda generación es:',
        opciones: ['No requiere lubricación', 'Tiene un canal gástrico que reduce la aspiración', 'Pasa las cuerdas vocales', 'Funciona en pacientes conscientes'],
        correcta: 1,
        explicacion: 'Los DSG de segunda generación (i-gel, LMA con canal) incorporan un puerto para sonda gástrica que permite drenar el estómago y disminuye el riesgo de regurgitación.',
      },
      {
        pregunta: 'Una contraindicación para colocar un dispositivo supraglótico es:',
        opciones: ['Paro cardíaco', 'Reflejo nauseoso intacto', 'Ventilación con BVM difícil', 'Fracaso de la intubación'],
        correcta: 1,
        explicacion: 'Un paciente con reflejos conservados no tolerará el dispositivo y puede presentar laringoespasmo o vómito; el DSG se usa en pacientes inconscientes sin reflejo nauseoso.',
      },
      {
        pregunta: 'El tubo laríngeo (King LT) sella la vía aérea mediante:',
        opciones: ['Un solo balón traqueal', 'Dos balones, uno esofágico y uno faríngeo', 'Un gel sin balón', 'Aspiración continua'],
        correcta: 1,
        explicacion: 'El tubo laríngeo posee un balón distal que ocluye el esófago y uno proximal que sella la hipofaringe, dirigiendo el aire hacia la tráquea.',
      },
    ],
  },
  {
    id: 'fluidoterapia-electrolitos',
    numero: '3.6',
    titulo: 'Fluidoterapia y Trastornos Electrolíticos',
    icono: '🧪',
    duracion: '55 min',
    resumen:
      'Los electrolitos gobiernan la excitabilidad de nervios, músculos y corazón. Reconocer sus alteraciones en la clínica y en el ECG permite intervenir antes de que el problema sea letal.',
    objetivos: [
      'Describir las funciones del sodio, potasio, calcio y magnesio.',
      'Reconocer signos clínicos y cambios en el ECG de cada alteración.',
      'Aplicar el manejo prehospitalario inicial de los trastornos críticos.',
      'Comprender los riesgos de la corrección rápida de electrolitos.',
    ],
    secciones: [
      {
        titulo: 'Principios de la fluidoterapia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Los líquidos no solo expanden la volemia: también reponen electrolitos. La elección entre salino fisiológico y soluciones balanceadas como el Ringer lactato influye en el equilibrio del potasio, el cloro y el pH del paciente.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Salino vs. balanceadas',
            texto:
              'Grandes volúmenes de salino 0.9% pueden causar acidosis hiperclorémica por su alto contenido de cloro. Las soluciones balanceadas (Ringer, Plasmalyte) tienen una composición más cercana al plasma y son preferibles en reanimaciones extensas.',
          },
          {
            tipo: 'lista',
            titulo: 'Rangos normales de referencia',
            items: [
              'Sodio: 135-145 mEq/L.',
              'Potasio: 3.5-5.0 mEq/L.',
              'Calcio total: 8.5-10.5 mg/dL.',
              'Magnesio: 1.5-2.5 mg/dL.',
            ],
          },
        ],
      },
      {
        titulo: 'Sodio y agua',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El sodio es el principal determinante de la osmolaridad y, por tanto, del movimiento del agua. Las alteraciones del sodio se manifiestan sobre todo como síntomas neurológicos por los cambios de volumen en las neuronas.',
          },
          {
            tipo: 'tabla',
            titulo: 'Alteraciones del sodio',
            headers: ['Trastorno', 'Manifestaciones', 'Riesgo de la corrección'],
            filas: [
              ['Hiponatremia', 'Confusión, cefalea, convulsiones, edema cerebral', 'Corrección rápida causa mielinolisis pontina.'],
              ['Hipernatremia', 'Sed intensa, letargo, irritabilidad neuromuscular', 'Corrección rápida causa edema cerebral.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Despacio con el sodio',
            texto:
              'El sodio se corrige lento. Bajarlo o subirlo demasiado rápido daña el cerebro: la hiponatremia corregida bruscamente provoca desmielinización (mielinolisis pontina). En campo, el manejo es de soporte y traslado.',
          },
        ],
      },
      {
        titulo: 'Potasio y el corazón',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El potasio es el electrolito más peligroso para el corazón: tanto el exceso como el defecto alteran la excitabilidad y producen arritmias. Por eso su lectura en el ECG es vital en el medio prehospitalario.',
          },
          {
            tipo: 'tabla',
            titulo: 'Potasio: ECG y manejo',
            headers: ['Trastorno', 'ECG', 'Manejo prehospitalario'],
            filas: [
              ['Hiperpotasemia', 'Ondas T picudas, luego QRS ancho y onda sinusoidal', 'Calcio (estabiliza miocardio), salbutamol nebulizado, traslado.'],
              ['Hipopotasemia', 'Ondas T planas, aparición de onda U, descenso del ST', 'Reposición controlada de potasio; vigilar arritmias.'],
            ],
          },
          {
            tipo: 'diagrama',
            clave: 'ecg',
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'El calcio salva en la hiperpotasemia',
            texto:
              'El gluconato o cloruro de calcio no baja el potasio, pero estabiliza la membrana del miocardio en minutos, protegiendo del paro mientras otras medidas redistribuyen el potasio. Es la primera intervención ante ECG amenazante.',
          },
        ],
      },
      {
        titulo: 'Calcio y magnesio',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Calcio: clínica y ECG',
            headers: ['Trastorno', 'Clínica', 'ECG'],
            filas: [
              ['Hipocalcemia', 'Espasmos, tetania, signos de Chvostek y Trousseau', 'QT prolongado.'],
              ['Hipercalcemia', 'Debilidad, confusión, estreñimiento, litiasis', 'QT acortado.'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'El magnesio es cofactor de muchas enzimas y modula los canales de potasio y calcio. Su deficiencia es frecuente y se asocia a arritmias, en particular a la taquicardia ventricular polimorfa conocida como torsades de pointes.',
          },
          {
            tipo: 'tabla',
            titulo: 'Magnesio: clínica y manejo',
            headers: ['Trastorno', 'Manifestaciones', 'Manejo'],
            filas: [
              ['Hipomagnesemia', 'Temblor, arritmias, torsades de pointes', 'Sulfato de magnesio 1-2 g IV.'],
              ['Hipermagnesemia', 'Hiporreflexia, debilidad, hipotensión, depresión respiratoria', 'Suspender aportes; calcio como antagonista.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Magnesio en torsades',
            texto:
              'El sulfato de magnesio 1-2 g IV es el tratamiento de elección de la torsades de pointes, incluso con magnesio sérico normal, porque estabiliza la membrana ventricular.',
          },
        ],
      },
      {
        titulo: 'Integración clínica',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Pistas de alarma en el ECG',
            items: [
              'Ondas T picudas: sospeche hiperpotasemia (insuficiencia renal, aplastamiento muscular).',
              'Onda U y T plana: sospeche hipopotasemia (vómito, diuréticos).',
              'QT prolongado: hipocalcemia o hipomagnesemia; riesgo de torsades.',
              'Onda sinusoidal: hiperpotasemia grave, preludio de paro.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Enfoque del paciente con sospecha electrolítica',
            items: [
              'Indague antecedentes: insuficiencia renal, diálisis, diuréticos, vómito, diarrea.',
              'Monitorice ECG continuo de inmediato.',
              'Trate los cambios amenazantes (calcio en hiperpotasemia, magnesio en torsades).',
              'Evite correcciones bruscas; el ajuste fino es hospitalario.',
              'Traslade vigilando el monitor de forma continua.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Hiperpotasemia', definicion: 'Potasio elevado; produce ondas T picudas y riesgo de paro cardíaco.' },
      { termino: 'Mielinolisis pontina', definicion: 'Daño cerebral por corrección demasiado rápida de la hiponatremia.' },
      { termino: 'Onda U', definicion: 'Deflexión que aparece tras la T, típica de la hipopotasemia.' },
      { termino: 'Torsades de pointes', definicion: 'Taquicardia ventricular polimorfa asociada a QT largo; se trata con magnesio.' },
      { termino: 'Acidosis hiperclorémica', definicion: 'Acidosis por exceso de cloro tras grandes volúmenes de salino 0.9%.' },
      { termino: 'Signo de Trousseau', definicion: 'Espasmo del carpo al inflar el manguito; indica hipocalcemia.' },
    ],
    flashcards: [
      { frente: 'Primer signo en el ECG de la hiperpotasemia', reverso: 'Ondas T picudas (altas y simétricas).' },
      { frente: 'Primer fármaco ante hiperpotasemia con ECG amenazante', reverso: 'Calcio (gluconato o cloruro): estabiliza el miocardio.' },
      { frente: 'Hallazgo del ECG en hipopotasemia', reverso: 'Ondas T planas, aparición de onda U y descenso del ST.' },
      { frente: 'Tratamiento de elección de la torsades de pointes', reverso: 'Sulfato de magnesio 1-2 g IV.' },
      { frente: 'Riesgo de corregir la hiponatremia muy rápido', reverso: 'Mielinolisis pontina (desmielinización).' },
      { frente: 'Efecto del calcio sobre el QT', reverso: 'Hipocalcemia alarga el QT; hipercalcemia lo acorta.' },
      { frente: 'Solución que causa acidosis hiperclorémica en grandes volúmenes', reverso: 'El salino 0.9% por su alto contenido de cloro.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente en diálisis con ondas T altas y picudas tiene probablemente:',
        opciones: ['Hipopotasemia', 'Hiperpotasemia', 'Hipocalcemia', 'Hipernatremia'],
        correcta: 1,
        explicacion: 'Las ondas T picudas son el signo más temprano de hiperpotasemia, frecuente en pacientes renales. La progresión es a QRS ancho y onda sinusoidal previa al paro.',
      },
      {
        pregunta: 'Ante una hiperpotasemia con cambios graves en el ECG, la primera medida es:',
        opciones: ['Furosemida', 'Calcio para estabilizar el miocardio', 'Solución glucosada sola', 'Esperar el laboratorio'],
        correcta: 1,
        explicacion: 'El calcio no reduce el potasio, pero estabiliza la membrana del miocardio en minutos, protegiendo del paro mientras otras medidas redistribuyen el potasio.',
      },
      {
        pregunta: 'La onda U en el ECG sugiere:',
        opciones: ['Hiperpotasemia', 'Hipopotasemia', 'Hipercalcemia', 'Hipernatremia'],
        correcta: 1,
        explicacion: 'La onda U, junto con ondas T planas y descenso del ST, es característica de la hipopotasemia, frecuente por vómito, diarrea o diuréticos.',
      },
      {
        pregunta: 'Una taquicardia ventricular polimorfa tipo torsades de pointes se trata de elección con:',
        opciones: ['Sulfato de magnesio IV', 'Calcio IV', 'Bicarbonato', 'Potasio IV'],
        correcta: 0,
        explicacion: 'El sulfato de magnesio 1-2 g IV estabiliza la membrana ventricular y es el tratamiento de elección de la torsades, incluso con magnesio sérico normal.',
      },
      {
        pregunta: 'Corregir una hiponatremia demasiado rápido puede provocar:',
        opciones: ['Edema cerebral', 'Mielinolisis pontina', 'Hiperpotasemia', 'Acidosis'],
        correcta: 1,
        explicacion: 'La corrección brusca de la hiponatremia produce desmielinización osmótica (mielinolisis pontina). El sodio debe ajustarse lentamente.',
      },
      {
        pregunta: 'Un QT prolongado en el ECG puede deberse a:',
        opciones: ['Hipercalcemia', 'Hipocalcemia o hipomagnesemia', 'Hipernatremia', 'Hiperpotasemia leve'],
        correcta: 1,
        explicacion: 'Tanto la hipocalcemia como la hipomagnesemia alargan el QT y predisponen a torsades de pointes. La hipercalcemia, en cambio, lo acorta.',
      },
      {
        pregunta: 'Una desventaja de infundir grandes volúmenes de salino 0.9% es:',
        opciones: ['Provoca alcalosis', 'Causa acidosis hiperclorémica', 'Eleva el calcio', 'Es hipotónico'],
        correcta: 1,
        explicacion: 'El alto contenido de cloro del salino 0.9% puede generar acidosis hiperclorémica en reanimaciones extensas; las soluciones balanceadas la evitan.',
      },
    ],
  },
  {
    id: 'monitorizacion-paciente',
    numero: '3.7',
    titulo: 'Monitorización del Paciente',
    icono: '🖥️',
    duracion: '50 min',
    resumen:
      'Los monitores extienden los sentidos del paramédico. Saber qué mide cada parámetro, sus limitaciones y cómo integrarlos transforma números aislados en una imagen clínica coherente.',
    objetivos: [
      'Describir el fundamento de cada parámetro monitorizado.',
      'Reconocer las limitaciones y artefactos de cada técnica.',
      'Interpretar la capnografía y la oximetría en distintos escenarios.',
      'Integrar los datos del monitor con la evaluación clínica.',
    ],
    secciones: [
      {
        titulo: 'Filosofía de la monitorización',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Ningún monitor reemplaza la valoración del paciente; lo complementa. Un número anormal en un paciente que se ve bien obliga a descartar artefacto antes de actuar, y un número normal nunca debe tranquilizar frente a un paciente que se deteriora.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Trate al paciente, no al monitor',
            texto:
              'Si la SpO2 marca 85% pero el paciente está rosado, alerta y sin disnea, sospeche un artefacto (mala perfusión, movimiento, esmalte de uñas) antes de inundar de oxígeno o intervenir.',
          },
        ],
      },
      {
        titulo: 'Oximetría de pulso (SpO2)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La oximetría mide el porcentaje de hemoglobina saturada de oxígeno mediante la absorción de dos longitudes de onda de luz. Es rápida y no invasiva, pero tiene puntos ciegos importantes que el paramédico debe conocer.',
          },
          {
            tipo: 'lista',
            titulo: 'Limitaciones de la oximetría',
            items: [
              'Intoxicación por monóxido de carbono: el oxímetro no distingue carboxihemoglobina y marca un valor falsamente normal.',
              'Mala perfusión, hipotermia o vasoconstricción: lectura inestable o ausente.',
              'Movimiento, esmalte de uñas oscuro y luz ambiental intensa: artefactos.',
              'La SpO2 cae tarde tras el inicio de la hipoxia: no es un detector precoz.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El monóxido engaña',
            texto:
              'En una intoxicación por CO, la SpO2 puede mostrar 99% mientras el paciente se asfixia, porque el oxímetro confunde la carboxihemoglobina con oxihemoglobina. Confíe en la clínica y el contexto, no en el número.',
          },
        ],
      },
      {
        titulo: 'Capnografía (ETCO2)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La capnografía mide el CO2 al final de la espiración (ETCO2) y muestra su evolución en una onda. Es uno de los parámetros más informativos en urgencias porque refleja ventilación, perfusión y metabolismo simultáneamente. El valor normal es de 35-45 mmHg.',
          },
          {
            tipo: 'tabla',
            titulo: 'Interpretación de la capnografía',
            headers: ['Hallazgo', 'Significado'],
            filas: [
              ['Onda cuadrada normal de 35-45 mmHg', 'Ventilación y perfusión adecuadas.'],
              ['ETCO2 bajo brusco a cero', 'Tubo desplazado, desconexión u obstrucción total.'],
              ['ETCO2 muy bajo en RCP', 'Compresiones ineficaces o bajo gasto.'],
              ['Aumento súbito de ETCO2 en RCP', 'Posible retorno de la circulación espontánea (RCE).'],
              ['Pendiente ascendente en meseta (aleta de tiburón)', 'Broncoespasmo (asma, EPOC).'],
              ['ETCO2 elevado', 'Hipoventilación o retención de CO2.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Capnografía en RCP',
            texto:
              'Un ETCO2 sostenido por debajo de 10 mmHg durante la reanimación indica compresiones de mala calidad o pronóstico ominoso; un ascenso súbito por encima de 35-40 mmHg sugiere retorno de la circulación espontánea.',
          },
        ],
      },
      {
        titulo: 'ECG continuo, TA y glucometría',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Parámetros complementarios',
            items: [
              'ECG continuo: detecta arritmias en tiempo real; las derivaciones de extremidades dan una visión general del ritmo.',
              'TA no invasiva (oscilometría): fiable en presiones medias; pierde exactitud en hipotensión extrema y arritmias.',
              'Glucometría capilar: descartar hipoglucemia en todo paciente con alteración del estado de conciencia.',
              'Temperatura: clave en hipotermia, golpe de calor y sepsis.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Glucosa en todo deterioro neurológico',
            texto:
              'La hipoglucemia imita ictus, intoxicación y convulsiones. Ningún paciente con alteración del estado mental debe quedar sin glucometría; corregirla es rápido y revierte el cuadro.',
          },
          {
            tipo: 'p',
            texto:
              'La toma de TA no invasiva por oscilometría puede sobrestimar presiones bajas y subestimar las altas; en pacientes inestables conviene confirmar con palpación o repetir la medición y correlacionar con el pulso y la perfusión.',
          },
        ],
      },
      {
        titulo: 'Interpretación integrada',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Lectura integrada del monitor',
            items: [
              'Mire primero al paciente: color, esfuerzo respiratorio, estado mental.',
              'Correlacione cada número con lo que ve; busque artefactos en lo incongruente.',
              'Use la capnografía para evaluar ventilación y la calidad de la RCP.',
              'Una la SpO2 con la frecuencia respiratoria y la auscultación.',
              'Revalúe tras cada intervención: el monitor mide tendencias, no fotos.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Ejemplos de integración',
            headers: ['Escenario', 'Patrón', 'Interpretación'],
            filas: [
              ['Asma grave', 'SpO2 baja + ETCO2 con aleta de tiburón', 'Broncoespasmo con atrapamiento aéreo.'],
              ['Sobredosis de opioides', 'FR baja + ETCO2 alto + SpO2 que cae', 'Hipoventilación; considerar naloxona.'],
              ['Choque', 'TA baja + ETCO2 bajo + taquicardia', 'Hipoperfusión global.'],
              ['Intoxicación por CO', 'SpO2 normal con clínica de hipoxia', 'Lectura falsamente tranquilizadora.'],
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'SpO2', definicion: 'Porcentaje de hemoglobina saturada de oxígeno medido por oximetría de pulso.' },
      { termino: 'Capnografía', definicion: 'Medición continua del CO2 espirado, representado en una onda y como valor ETCO2.' },
      { termino: 'ETCO2', definicion: 'Valor del CO2 al final de la espiración; normal 35-45 mmHg.' },
      { termino: 'Carboxihemoglobina', definicion: 'Hemoglobina unida a monóxido de carbono que falsea al alza la oximetría.' },
      { termino: 'Oscilometría', definicion: 'Método de la TA no invasiva basado en oscilaciones del flujo arterial.' },
      { termino: 'Aleta de tiburón', definicion: 'Onda de capnografía con pendiente ascendente, típica del broncoespasmo.' },
    ],
    flashcards: [
      { frente: 'Qué mide la oximetría de pulso', reverso: 'El porcentaje de hemoglobina saturada de oxígeno (SpO2).' },
      { frente: 'Por qué la SpO2 engaña en intoxicación por CO', reverso: 'No distingue la carboxihemoglobina de la oxihemoglobina y marca valores falsamente normales.' },
      { frente: 'Valor normal de ETCO2', reverso: '35 a 45 mmHg.' },
      { frente: 'Qué indica un ascenso súbito de ETCO2 en RCP', reverso: 'Posible retorno de la circulación espontánea.' },
      { frente: 'Patrón de capnografía en broncoespasmo', reverso: 'Pendiente ascendente en la meseta (aleta de tiburón).' },
      { frente: 'Estudio obligado en toda alteración del estado mental', reverso: 'Glucometría capilar para descartar hipoglucemia.' },
      { frente: 'Limitacion de la TA oscilométrica', reverso: 'Pierde exactitud en hipotensión extrema y arritmias.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente rescatado de un incendio en espacio cerrado presenta SpO2 de 99% pero confusión y cefalea. Lo más probable es:',
        opciones: ['Estado de oxigenación óptimo', 'Intoxicación por monóxido de carbono con oximetría falsamente normal', 'Hiperventilación', 'Crisis de ansiedad'],
        correcta: 1,
        explicacion: 'El oxímetro no distingue la carboxihemoglobina de la oxihemoglobina, por lo que en intoxicación por CO marca valores normales pese a la hipoxia tisular.',
      },
      {
        pregunta: 'Durante una RCP, el ETCO2 sube súbitamente de 12 a 38 mmHg. Esto sugiere:',
        opciones: ['Tubo desplazado', 'Posible retorno de la circulación espontánea', 'Hiperventilación', 'Fallo del capnógrafo'],
        correcta: 1,
        explicacion: 'Un aumento brusco del ETCO2 durante la reanimación refleja la recuperación de la perfusión pulmonar, signo de retorno de la circulación espontánea.',
      },
      {
        pregunta: 'Una onda de capnografía con pendiente ascendente en la meseta (aleta de tiburón) indica:',
        opciones: ['Hiperventilación', 'Broncoespasmo (asma o EPOC)', 'Paro respiratorio', 'Buena ventilación'],
        correcta: 1,
        explicacion: 'La aleta de tiburón refleja la espiración prolongada y obstruida del broncoespasmo; la meseta pierde su forma cuadrada normal.',
      },
      {
        pregunta: 'En todo paciente con alteración del estado mental es obligatorio:',
        opciones: ['Intubar de inmediato', 'Realizar glucometría capilar', 'Administrar naloxona', 'Colocar acceso IO'],
        correcta: 1,
        explicacion: 'La hipoglucemia imita múltiples cuadros neurológicos y es de corrección rápida; la glucometría debe hacerse siempre ante un deterioro del estado mental.',
      },
      {
        pregunta: 'Una limitación importante de la oximetría de pulso es que:',
        opciones: ['Detecta la hipoxia de forma muy precoz', 'Cae tarde respecto al inicio de la hipoxia', 'Mide la ventilación', 'Es invasiva'],
        correcta: 1,
        explicacion: 'La SpO2 desciende cuando la hipoxia ya está establecida; no es un detector precoz. La capnografía y la clínica advierten antes el deterioro ventilatorio.',
      },
      {
        pregunta: 'Un ETCO2 sostenido por debajo de 10 mmHg durante la RCP indica principalmente:',
        opciones: ['Excelente calidad de las compresiones', 'Compresiones ineficaces o muy bajo gasto', 'Retorno de la circulación', 'Hiperventilación'],
        correcta: 1,
        explicacion: 'Un ETCO2 muy bajo durante la reanimación refleja escasa perfusión pulmonar por compresiones de mala calidad y se asocia a peor pronóstico.',
      },
    ],
  },
  {
    id: 'vias-administracion',
    numero: '3.8',
    titulo: 'Vías de Administración de Fármacos',
    icono: '🎯',
    duracion: '50 min',
    resumen:
      'La misma molécula actúa distinto según la puerta de entrada. Elegir la vía correcta equilibra rapidez, biodisponibilidad y viabilidad en cada escenario prehospitalario.',
    objetivos: [
      'Comparar las vías de administración por velocidad de acción y biodisponibilidad.',
      'Seleccionar la vía adecuada según el fármaco y el escenario.',
      'Describir las ventajas y limitaciones de cada vía.',
      'Reconocer ejemplos de fármacos por vía en el ámbito prehospitalario.',
    ],
    secciones: [
      {
        titulo: 'Conceptos que rigen la elección',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La biodisponibilidad es la fracción del fármaco administrado que llega a la circulación sistémica activa. La vía intravenosa tiene, por definición, una biodisponibilidad del 100% porque salta toda barrera de absorción; las demás vías dependen de cuánto se absorbe y se metaboliza antes de actuar.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Efecto de primer paso',
            texto:
              'Los fármacos absorbidos por el tubo digestivo pasan primero por el hígado, que puede inactivar gran parte de la dosis (efecto de primer paso). Las vías sublingual, intranasal y parenteral lo evitan, logrando un inicio más rápido y predecible.',
          },
          {
            tipo: 'lista',
            titulo: 'Factores para elegir la vía',
            items: [
              'Urgencia del efecto deseado.',
              'Estado de conciencia y capacidad de deglutir.',
              'Disponibilidad de acceso vascular.',
              'Propiedades del fármaco (irritante, volumen, liposolubilidad).',
            ],
          },
        ],
      },
      {
        titulo: 'Vías parenterales',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Vías parenterales comparadas',
            headers: ['Vía', 'Inicio', 'Características'],
            filas: [
              ['Intravenosa (IV)', 'Inmediato (segundos a minutos)', 'Biodisponibilidad 100%; vía de elección en urgencias; permite titular.'],
              ['Intraósea (IO)', 'Casi inmediato', 'Equivalente a la IV cuando no hay acceso venoso; misma dosis.'],
              ['Intramuscular (IM)', 'Minutos (5-20)', 'Absorción por flujo muscular; útil en anafilaxia (adrenalina IM).'],
              ['Subcutánea (SC)', 'Lenta y sostenida', 'Para volúmenes pequeños; insulina, algunas heparinas.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'IM en anafilaxia',
            texto:
              'La adrenalina en anafilaxia se administra IM en el muslo (vasto lateral) porque ofrece absorción rápida y fiable con menor riesgo de arritmia que la vía IV, que se reserva para el paro o el choque refractario.',
          },
        ],
      },
      {
        titulo: 'Vías por mucosas y respiratoria',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Vías por mucosa y respiratoria',
            headers: ['Vía', 'Inicio', 'Ejemplos prehospitalarios'],
            filas: [
              ['Sublingual', 'Rápido (1-3 min)', 'Nitroglicerina; evita el primer paso hepático.'],
              ['Intranasal (IN)', 'Rápido (2-5 min)', 'Naloxona, midazolam, fentanilo; sin necesidad de aguja.'],
              ['Nebulizada / inhalada', 'Minutos, efecto local', 'Salbutamol, ipratropio; actúa directo sobre el bronquio.'],
              ['Rectal', 'Variable', 'Diazepam en convulsiones cuando no hay otra vía (sobre todo en niños).'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'La vía intranasal aprovecha la rica vascularización de la mucosa nasal y la cercanía al sistema nervioso central. Para optimizarla se usa un atomizador que dispersa el fármaco y se divide la dosis entre ambas fosas nasales, evitando que escurra.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'La vía sin aguja salva tiempo',
            texto:
              'La vía intranasal permite tratar convulsiones, dolor o sobredosis sin canalizar, lo que es valioso en niños, pacientes agitados o cuando el acceso vascular se retrasa.',
          },
        ],
      },
      {
        titulo: 'Selección por escenario',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Vía según situación',
            headers: ['Escenario', 'Vía preferida', 'Razón'],
            filas: [
              ['Paro cardíaco', 'IV o IO', 'Efecto inmediato; IO si no hay acceso venoso.'],
              ['Anafilaxia', 'Adrenalina IM', 'Rápida, fiable y más segura que la IV.'],
              ['Convulsión sin acceso IV', 'Midazolam IN o IM', 'Controla la crisis sin canalizar.'],
              ['Dolor torácico isquémico', 'Nitroglicerina sublingual', 'Inicio rápido evitando primer paso.'],
              ['Crisis asmática', 'Salbutamol nebulizado', 'Acción local directa en el bronquio.'],
              ['Sobredosis de opioides', 'Naloxona IN o IM/IV', 'IN si no hay acceso; titular a la ventilación.'],
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Razonamiento para elegir la vía',
            items: [
              'Defina la urgencia: si necesita efecto inmediato, busque IV o IO.',
              'Valore el acceso vascular disponible y el estado del paciente.',
              'Considere alternativas sin aguja (IN, IM, nebulizada) si el acceso falla.',
              'Ajuste la dosis a la vía elegida y documente la administración.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'La vía cambia la dosis y la velocidad',
            texto:
              'Una misma dosis no produce el mismo efecto por todas las vías. Confirme siempre la dosis correcta para la vía elegida; por ejemplo, la naloxona intranasal suele requerir una dosis mayor que la IV.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Biodisponibilidad', definicion: 'Fracción del fármaco administrado que alcanza la circulación sistémica activa.' },
      { termino: 'Efecto de primer paso', definicion: 'Metabolismo hepático que inactiva parte del fármaco absorbido por el tubo digestivo.' },
      { termino: 'Vía parenteral', definicion: 'Administración que evita el tubo digestivo: IV, IO, IM y SC.' },
      { termino: 'Vía intranasal', definicion: 'Absorción por la mucosa nasal con un atomizador; rápida y sin aguja.' },
      { termino: 'Atomizador', definicion: 'Dispositivo que dispersa el fármaco en gotas finas para la vía intranasal.' },
      { termino: 'Vía sublingual', definicion: 'Absorción bajo la lengua que evita el primer paso hepático, como la nitroglicerina.' },
    ],
    flashcards: [
      { frente: 'Biodisponibilidad de la vía intravenosa', reverso: '100%, porque salta toda barrera de absorción.' },
      { frente: 'Qué es el efecto de primer paso', reverso: 'El metabolismo hepático que inactiva parte del fármaco absorbido por el intestino.' },
      { frente: 'Vía de elección para la adrenalina en anafilaxia', reverso: 'Intramuscular en el muslo (vasto lateral).' },
      { frente: 'Vía para controlar convulsiones sin acceso IV', reverso: 'Intranasal o intramuscular (midazolam).' },
      { frente: 'Por qué la nitroglicerina se da sublingual', reverso: 'Inicio rápido y evita el efecto de primer paso hepático.' },
      { frente: 'Vía equivalente a la IV cuando no hay acceso venoso', reverso: 'La intraósea (IO), con la misma dosis.' },
      { frente: 'Cómo se optimiza la vía intranasal', reverso: 'Con atomizador y dividiendo la dosis entre ambas fosas nasales.' },
    ],
    quiz: [
      {
        pregunta: 'La vía intravenosa tiene una biodisponibilidad del 100% porque:',
        opciones: ['Se metaboliza en el hígado primero', 'Salta cualquier barrera de absorción y llega directa a la circulación', 'Se absorbe lentamente', 'Depende del flujo muscular'],
        correcta: 1,
        explicacion: 'Al administrarse directamente en el torrente sanguíneo, la totalidad de la dosis queda disponible de inmediato, sin pérdida por absorción ni primer paso.',
      },
      {
        pregunta: 'La adrenalina en anafilaxia se administra preferentemente por vía:',
        opciones: ['Intravenosa rápida', 'Intramuscular en el muslo', 'Subcutánea', 'Oral'],
        correcta: 1,
        explicacion: 'La vía IM en el vasto lateral ofrece absorción rápida y fiable con menor riesgo de arritmia que la IV, reservada para el paro o el choque refractario.',
      },
      {
        pregunta: 'La vía sublingual de la nitroglicerina tiene ventaja porque:',
        opciones: ['Es la más lenta', 'Evita el efecto de primer paso hepático y actúa rápido', 'Requiere aguja', 'Solo sirve para volúmenes grandes'],
        correcta: 1,
        explicacion: 'Bajo la lengua el fármaco se absorbe a la circulación sin pasar por el hígado, logrando un inicio de acción rápido en el dolor isquémico.',
      },
      {
        pregunta: 'En un niño con convulsión activa y sin acceso vascular, una vía eficaz es:',
        opciones: ['Oral', 'Intranasal', 'Subcutánea', 'Esperar el acceso IV'],
        correcta: 1,
        explicacion: 'La vía intranasal del midazolam aprovecha la vascularización de la mucosa nasal para un inicio rápido sin necesidad de aguja, ideal en pediatría.',
      },
      {
        pregunta: 'Cuando no se logra acceso venoso en un paro cardíaco, la vía equivalente es:',
        opciones: ['Subcutánea', 'Intraósea', 'Oral', 'Sublingual'],
        correcta: 1,
        explicacion: 'La vía intraósea ofrece una absorción casi inmediata equivalente a la IV y se usa con las mismas dosis cuando el acceso venoso falla o se retrasa.',
      },
      {
        pregunta: 'Respecto a la dosis, una verdad sobre las vías de administración es:',
        opciones: ['La dosis es igual por todas las vías', 'La vía puede modificar la dosis necesaria, como la naloxona IN frente a la IV', 'La vía no afecta la velocidad de acción', 'La vía oral es la más rápida'],
        correcta: 1,
        explicacion: 'La biodisponibilidad varía con la vía; por eso la naloxona intranasal suele requerir mayor dosis que la IV para lograr el mismo efecto.',
      },
    ],
  },
]
