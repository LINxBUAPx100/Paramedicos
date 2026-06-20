// FASE 2 — TUM-Básico (Abordaje Clínico y Soporte Vital)

export const fase2 = {
  id: 'fase-2',
  numero: 2,
  titulo: 'TUM-Básico',
  subtitulo: 'Abordaje Clínico y Soporte Vital',
  color: '#10b981',
  icono: '🚑',
  descripcion:
    'Transición de la fisiología al manejo de la patología aguda en el entorno extrahospitalario. Aquí se sistematiza la evaluación del paciente y el soporte vital básico con fundamento fisiológico.',
  temas: [
    {
      id: 'evaluacion-integral',
      numero: '2.1',
      titulo: 'Evaluación Integral del Paciente',
      icono: '🔎',
      duracion: '50 min',
      resumen:
        'Una evaluación ordenada y reproducible salva vidas. El XABCDE prioriza las amenazas inmediatas, mientras la cinemática y la semiología orientan el diagnóstico.',
      objetivos: [
        'Aplicar la evaluación primaria XABCDE en orden de prioridad.',
        'Analizar la cinemática del trauma y los patrones de lesión.',
        'Integrar la semiología (inspección, palpación, percusión, auscultación).',
      ],
      secciones: [
        {
          titulo: 'Cinemática del trauma compleja',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El trauma es energía transferida al cuerpo. La energía cinética (Ec = ½ m·v²) explica por qué la velocidad pesa más que la masa: duplicar la velocidad cuadruplica la energía. Predecir el patrón de lesión a partir del mecanismo permite buscar lesiones ocultas antes de que se manifiesten.',
            },
            {
              tipo: 'lista',
              titulo: 'Patrones de transferencia de energía',
              items: [
                'Cavitación: la energía desplaza tejido creando una cavidad temporal (clave en heridas por proyectil de alta velocidad).',
                'Cizallamiento: tejidos de distinta densidad se desaceleran a ritmos diferentes (desgarro de aorta, pedículos renales en caídas y colisiones).',
                'Compresión: aplastamiento directo de órganos (tórax, pelvis).',
                'Balística: la lesión depende de la energía cinética transferida, no solo del calibre; importan velocidad, fragmentación y trayecto.',
              ],
            },
          ],
        },
        {
          titulo: 'Evaluación primaria XABCDE',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Se atienden las amenazas vitales en orden estricto: lo que mata primero se trata primero. No se avanza a la siguiente letra sin controlar la anterior.',
            },
            {
              tipo: 'tabla',
              headers: ['Letra', 'Significado', 'Acción clave'],
              filas: [
                ['X', 'Hemorragia exsanguinante', 'Control inmediato: presión directa, torniquete, empaquetamiento.'],
                ['A', 'Vía aérea con control cervical', 'Permeabilizar y proteger la columna cervical.'],
                ['B', 'Ventilación (Breathing)', 'Evaluar frecuencia, simetría, SpO₂; oxigenar, descomprimir neumotórax a tensión.'],
                ['C', 'Circulación', 'Pulsos, llenado capilar, control de hemorragia, accesos y fluidos.'],
                ['D', 'Déficit neurológico', 'Escala de Glasgow, pupilas, glucemia.'],
                ['E', 'Exposición / control térmico', 'Exponer para hallar lesiones y prevenir la hipotermia.'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'La "X" va primero',
              texto:
                'En trauma con hemorragia masiva, el control del sangrado exsanguinante precede incluso a la vía aérea: un paciente puede desangrarse en minutos. El torniquete colocado a tiempo es una de las intervenciones con mayor impacto en mortalidad.',
            },
          ],
        },
        {
          titulo: 'Semiología médica',
          bloques: [
            {
              tipo: 'pasos',
              titulo: 'Las cuatro maniobras de la exploración física',
              items: [
                'Inspección: color, trabajo respiratorio, deformidades, simetría, heridas.',
                'Palpación: dolor, crepitación, enfisema subcutáneo, pulsos, temperatura.',
                'Percusión: matidez (líquido/sangre, derrame) vs. timpanismo (aire, neumotórax).',
                'Auscultación: ruidos respiratorios y cardíacos.',
              ],
            },
            {
              tipo: 'tabla',
              headers: ['Ruido', 'Tipo', 'Significado típico'],
              filas: [
                ['Estertores (crepitantes)', 'Respiratorio', 'Líquido alveolar: edema pulmonar, neumonía.'],
                ['Sibilancias', 'Respiratorio', 'Broncoconstricción: asma, EPOC, anafilaxia.'],
                ['Estridor', 'Respiratorio', 'Obstrucción de vía aérea alta: emergencia.'],
                ['Roncus', 'Respiratorio', 'Secreciones en vías grandes.'],
                ['S3', 'Cardíaco', 'Sobrecarga de volumen / insuficiencia cardíaca.'],
                ['S4', 'Cardíaco', 'Ventrículo rígido: HTA, isquemia.'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'S1 y S2',
              texto:
                'S1 ("lub") = cierre de las válvulas auriculoventriculares (mitral y tricúspide), inicio de la sístole. S2 ("dub") = cierre de las válvulas semilunares (aórtica y pulmonar), inicio de la diástole. Los soplos reflejan flujo turbulento por estenosis o insuficiencia valvular.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Energía cinética', definicion: 'Ec = ½ m·v²; la velocidad influye al cuadrado en la energía del trauma.' },
        { termino: 'XABCDE', definicion: 'Secuencia de evaluación primaria: hemorragia, vía aérea, ventilación, circulación, déficit, exposición.' },
        { termino: 'Estridor', definicion: 'Ruido de obstrucción de vía aérea superior; emergencia inmediata.' },
        { termino: 'S3', definicion: 'Tercer ruido cardíaco asociado a sobrecarga de volumen / insuficiencia cardíaca.' },
      ],
      flashcards: [
        { frente: '¿Qué representa la "X" en XABCDE y por qué va primero?', reverso: 'Hemorragia exsanguinante; puede matar en minutos, antes que un problema de vía aérea.' },
        { frente: 'Estertores crepitantes indican…', reverso: 'Líquido en los alvéolos: edema pulmonar o neumonía.' },
        { frente: '¿Qué válvulas cierran en S1?', reverso: 'Las auriculoventriculares: mitral y tricúspide.' },
        { frente: 'Percusión timpánica en el tórax sugiere…', reverso: 'Aire atrapado: neumotórax.' },
      ],
      quiz: [
        {
          pregunta: 'En un paciente con amputación traumática y sangrado pulsátil masivo, ¿cuál es la primera prioridad?',
          opciones: ['Asegurar la vía aérea', 'Control del sangrado exsanguinante (torniquete)', 'Canalizar dos vías', 'Inmovilización cervical'],
          correcta: 1,
          explicacion: 'La "X" del XABCDE: la hemorragia exsanguinante se controla primero porque puede causar la muerte en minutos.',
        },
        {
          pregunta: 'Sibilancias difusas en un paciente disneico orientan a:',
          opciones: ['Edema pulmonar exclusivamente', 'Broncoconstricción (asma/EPOC/anafilaxia)', 'Neumotórax', 'Derrame pleural masivo'],
          correcta: 1,
          explicacion: 'Las sibilancias reflejan estrechamiento bronquial; típicas de asma, EPOC y anafilaxia.',
        },
        {
          pregunta: 'Si la velocidad de un vehículo se duplica, la energía cinética transferida en el impacto:',
          opciones: ['Se duplica', 'Se cuadruplica', 'No cambia', 'Se reduce a la mitad'],
          correcta: 1,
          explicacion: 'Ec = ½ m·v²: la velocidad está al cuadrado, así que duplicarla multiplica la energía por cuatro.',
        },
      ],
      recursos: {
        videos: [
          { titulo: 'Evaluación primaria ABCDE del trauma', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=fdD7WsYsXvk' },
          { titulo: 'Valoración primaria y secundaria (PHTLS)', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=vkqyiRMQZtc' },
        ],
        fuentes: [
          { titulo: 'Trauma Assessment', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK555913/' },
          { titulo: 'Trauma Primary Survey', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK430800/' },
        ],
        imagenes: [
          { caption: 'Secuencia de evaluación ABCDE', busqueda: 'evaluacion ABCDE trauma esquema' },
        ],
      },
      actividades: {
        ordenar: {
          titulo: 'evaluación primaria ABCDE',
          pasos: [
            'A — Vía aérea con control cervical.',
            'B — Ventilación y oxigenación.',
            'C — Circulación y control de hemorragias.',
            'D — Déficit neurológico (consciencia y pupilas).',
            'E — Exposición y control de la hipotermia.',
          ],
        },
        completar: [
          { texto: 'En la evaluación primaria, la "C" corresponde a ___ y control de hemorragias.', opciones: ['circulación', 'consciencia', 'columna'], correcta: 0, explicacion: 'C = Circulación: pulsos, perfusión y control del sangrado.' },
          { texto: 'El acrónimo ___ recoge los antecedentes en la evaluación secundaria (síntomas, alergias, medicación…).', opciones: ['SAMPLE', 'AVDI', 'OPQRST'], correcta: 0, explicacion: 'SAMPLE: Síntomas, Alergias, Medicación, Patologías, Última ingesta, Eventos.' },
          { texto: 'La "D" del ABCDE evalúa el ___ neurológico (consciencia y pupilas).', opciones: ['déficit', 'dolor', 'drenaje'], correcta: 0, explicacion: 'D = Disability/Déficit neurológico (AVDI o Glasgow y pupilas).' },
        ],
        preguntas: [
          { pregunta: 'Si en la "A" detectas obstrucción de la vía aérea, ¿qué haces antes de pasar a la "B"?', opciones: ['Resolver la vía aérea primero', 'Continuar con la circulación', 'Exponer al paciente', 'Tomar la presión arterial'], correcta: 0, explicacion: 'El ABCDE se resuelve en orden: no se avanza sin asegurar la vía aérea.' },
          { pregunta: 'La evaluación de la escena, antes de tocar al paciente, busca sobre todo:', opciones: ['La hora exacta', 'La seguridad de la escena y el número de víctimas', 'El nombre del paciente', 'El hospital de destino'], correcta: 1, explicacion: 'Primero la seguridad: escena segura, mecanismo y número de víctimas.' },
        ],
      },
    },
    {
      id: 'oxigenoterapia-via-aerea-basica',
      numero: '2.2',
      titulo: 'Oxigenoterapia y Manejo Básico de Vía Aérea',
      icono: '💨',
      duracion: '45 min',
      resumen:
        'Administrar oxígeno parece simple, pero exige conocer la FiO₂ que entrega cada dispositivo y la física de la ventilación a presión positiva para no dañar al paciente.',
      objetivos: [
        'Seleccionar el dispositivo de oxígeno según la FiO₂ requerida.',
        'Aplicar la física de los gases a la ventilación a presión positiva.',
        'Manejar la vía aérea en trauma maxilofacial con medidas conservadoras.',
      ],
      secciones: [
        {
          titulo: 'Dispositivos y FiO₂',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La fracción inspirada de oxígeno (FiO₂) ambiental es 0.21 (21%). Cada dispositivo aumenta la FiO₂ según el flujo y el diseño. La elección depende de la hipoxemia, el patrón ventilatorio y el riesgo de retención de CO₂.',
            },
            {
              tipo: 'tabla',
              headers: ['Dispositivo', 'Flujo', 'FiO₂ aproximada'],
              filas: [
                ['Puntas nasales', '1-6 L/min', '24-44%'],
                ['Mascarilla simple', '5-10 L/min', '40-60%'],
                ['Mascarilla con reservorio (no recirculante)', '10-15 L/min', '60-95%'],
                ['Mascarilla Venturi', 'según adaptador', '24-50% (precisa)'],
                ['Bolsa-válvula-mascarilla (BVM) con reservorio', '15 L/min', '~100%'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Cuidado en el EPOC',
              texto:
                'En algunos pacientes con EPOC retenedor crónico, una FiO₂ excesiva puede reducir el estímulo ventilatorio y favorecer la hipercapnia. Se titula el O₂ a una SpO₂ objetivo (típicamente 88-92%) en lugar de saturar al 100% sin necesidad.',
            },
          ],
        },
        {
          titulo: 'Física de la ventilación a presión positiva',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La ventilación espontánea es a presión negativa (el diafragma genera vacío). La ventilación con BVM o ventilador es a presión positiva: empuja aire a los pulmones, invirtiendo la mecánica normal. Esto tiene consecuencias hemodinámicas importantes.',
            },
            {
              tipo: 'lista',
              titulo: 'Principios físicos aplicados',
              items: [
                'Ley de Boyle: a temperatura constante, presión y volumen son inversamente proporcionales; al aumentar el volumen torácico baja la presión y entra aire.',
                'La presión positiva aumenta la presión intratorácica, lo que reduce el retorno venoso y puede bajar el gasto cardíaco (peligroso en hipovolemia).',
                'La hiperinsuflación (volúmenes altos o frecuencia excesiva) genera auto-PEEP, distensión gástrica y riesgo de barotrauma.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'No hiperventilar',
              texto:
                'Ventilar demasiado rápido o con demasiado volumen eleva la presión intratorácica, reduce el retorno venoso y empeora la perfusión cerebral y coronaria, especialmente durante la RCP. Ventilaciones lentas, suaves y con el volumen justo para elevar el tórax.',
            },
          ],
        },
        {
          titulo: 'Vía aérea en trauma maxilofacial masivo',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El trauma maxilofacial severo amenaza la vía aérea por sangrado, edema, dientes y fragmentos óseos y pérdida del soporte anatómico. Las medidas conservadoras buscan mantener la permeabilidad mientras se prepara el manejo definitivo.',
            },
            {
              tipo: 'pasos',
              titulo: 'Medidas conservadoras',
              items: [
                'Aspiración continua de sangre y secreciones.',
                'Posición que favorezca el drenaje (si no hay sospecha de lesión espinal que lo impida).',
                'Maniobras manuales (tracción mandibular) evitando movilizar la columna cervical.',
                'Cánulas básicas según tolerancia; la nasofaríngea está contraindicada si se sospecha fractura de base de cráneo.',
                'Anticipar la necesidad de vía aérea quirúrgica si la obstrucción es insalvable.',
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'FiO₂', definicion: 'Fracción inspirada de oxígeno; 0.21 en aire ambiente, ~1.0 con BVM y reservorio.' },
        { termino: 'Mascarilla con reservorio', definicion: 'Entrega 60-95% de O₂ a 10-15 L/min en el paciente que respira.' },
        { termino: 'Presión positiva', definicion: 'Empuja aire a los pulmones; reduce el retorno venoso si es excesiva.' },
        { termino: 'Auto-PEEP', definicion: 'Atrapamiento aéreo por hiperventilación; aumenta presión intratorácica.' },
      ],
      flashcards: [
        { frente: 'FiO₂ aproximada de una mascarilla con reservorio a 15 L/min', reverso: 'Entre 60% y 95% (cercana a 100% con buen sellado).' },
        { frente: '¿Por qué la hiperventilación con BVM es peligrosa?', reverso: 'Aumenta la presión intratorácica, reduce el retorno venoso y la perfusión cerebral/coronaria.' },
        { frente: 'Contraindicación de la cánula nasofaríngea', reverso: 'Sospecha de fractura de base de cráneo.' },
        { frente: 'SpO₂ objetivo orientativa en EPOC retenedor', reverso: '88-92%, titulando el oxígeno.' },
      ],
      quiz: [
        {
          pregunta: 'Para administrar la mayor FiO₂ posible a un paciente que ventila espontáneamente, se usa:',
          opciones: ['Puntas nasales a 4 L/min', 'Mascarilla simple a 6 L/min', 'Mascarilla con reservorio a 15 L/min', 'Venturi al 28%'],
          correcta: 2,
          explicacion: 'La mascarilla con reservorio (no recirculante) a 10-15 L/min entrega 60-95% de O₂.',
        },
        {
          pregunta: 'El principal riesgo hemodinámico de la ventilación a presión positiva excesiva es:',
          opciones: ['Aumento del retorno venoso', 'Disminución del retorno venoso y del gasto cardíaco', 'Bradicardia por vagotonía', 'Hipertensión arterial sostenida'],
          correcta: 1,
          explicacion: 'La presión intratorácica elevada comprime las venas centrales, reduce el retorno venoso y baja el gasto cardíaco.',
        },
        {
          pregunta: 'En sospecha de fractura de base de cráneo está contraindicada:',
          opciones: ['La aspiración', 'La cánula nasofaríngea', 'La oxigenoterapia', 'La tracción mandibular'],
          correcta: 1,
          explicacion: 'La cánula nasofaríngea puede penetrar a través de una fractura de base de cráneo; se evita ante esa sospecha.',
        },
      ],
      recursos: {
        videos: [
          { titulo: 'Aplicación de la bolsa-válvula-mascarilla (BVM)', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=lDoyJ_r0P9w' },
          { titulo: 'Cómo usar correctamente la cánula orofaríngea', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=ziNJT1Q-F6A' },
        ],
        fuentes: [
          { titulo: 'Bag-Valve-Mask Ventilation', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK441924/' },
          { titulo: 'Airway Assessment', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK470477/' },
        ],
        imagenes: [
          { caption: 'Dispositivos de oxigenoterapia y su FiO₂', busqueda: 'dispositivos oxigenoterapia FiO2 mascarilla reservorio puntas nasales' },
        ],
      },
      actividades: {
        ordenar: {
          titulo: 'manejo básico de la vía aérea y ventilación',
          pasos: [
            'Posiciona la vía aérea (frente-mentón, o tracción mandibular si hay trauma).',
            'Aspira secreciones si es necesario.',
            'Coloca una cánula orofaríngea si no hay reflejo nauseoso.',
            'Sella la mascarilla y ventila con la bolsa (BVM) conectada a O₂.',
            'Comprueba la elevación torácica y la SpO₂.',
          ],
        },
        completar: [
          { texto: 'El dispositivo que entrega mayor FiO₂ a un paciente que respira es la mascarilla con ___ .', opciones: ['reservorio', 'Venturi', 'puntas nasales'], correcta: 0, explicacion: 'La mascarilla con reservorio a 10-15 L/min entrega 60-95% de O₂.' },
          { texto: 'La cánula ___ no debe usarse si hay sospecha de fractura de base de cráneo.', opciones: ['nasofaríngea', 'orofaríngea', 'de Guedel'], correcta: 0, explicacion: 'Podría penetrar por la fractura hacia el cráneo.' },
          { texto: 'La cánula orofaríngea solo se coloca si el paciente NO tiene reflejo ___ .', opciones: ['nauseoso', 'corneal', 'rotuliano'], correcta: 0, explicacion: 'Si hay reflejo nauseoso, la cánula orofaríngea provoca vómito/aspiración.' },
        ],
        preguntas: [
          { pregunta: 'El principal riesgo hemodinámico de ventilar con demasiada presión positiva es:', opciones: ['Aumento del retorno venoso', 'Disminución del retorno venoso y del gasto cardíaco', 'Bradicardia vagal', 'Hipertensión sostenida'], correcta: 1, explicacion: 'La presión intratorácica alta comprime las venas centrales y baja el gasto cardíaco.' },
          { pregunta: 'Las puntas nasales a 2-4 L/min entregan una FiO₂ aproximada de:', opciones: ['24-36%', '60-95%', '100%', '15%'], correcta: 0, explicacion: 'Cada litro añade ~4% sobre el 21% ambiental: 2-4 L ≈ 24-36%.' },
        ],
      },
    },
  ],
}
