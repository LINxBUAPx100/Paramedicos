// FASE 1 — Ciencias Básicas y Fundamentos (Nivel Pre-Médico)
// Contenido redactado a profundidad para estudio, no solo cuestionario.

export const fase1 = {
  id: 'fase-1',
  numero: 1,
  titulo: 'Ciencias Básicas y Fundamentos',
  subtitulo: 'Nivel Pre-Médico',
  color: '#0ea5e9',
  icono: '🧬',
  descripcion:
    'Antes de tocar a un paciente es imperativo dominar el funcionamiento normal del cuerpo humano a nivel celular y sistémico. Esta fase construye los cimientos bioquímicos, anatómicos y fisiológicos sobre los que descansa toda la práctica clínica.',
  temas: [
    {
      id: 'biologia-celular-bioquimica',
      numero: '1.1',
      titulo: 'Biología Celular y Bioquímica Médica',
      icono: '🔬',
      duracion: '50 min',
      resumen:
        'La célula es la unidad funcional de la vida. Comprender cómo produce energía, mantiene su medio interno y regula el paso de sustancias es la base para entender el shock, el edema y todas las alteraciones metabólicas.',
      objetivos: [
        'Describir los organelos y su función en la homeostasis celular.',
        'Diferenciar los mecanismos de transporte membranal y su costo energético.',
        'Explicar la producción de ATP por vía aerobia y anaerobia.',
        'Aplicar la ecuación de Henderson-Hasselbalch al equilibrio ácido-base.',
      ],
      secciones: [
        {
          titulo: 'Estructura celular',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La célula eucariota está delimitada por la membrana plasmática, una bicapa lipídica con proteínas integrales y periféricas que controla selectivamente el intercambio con el medio. En su interior, el citoplasma alberga organelos especializados suspendidos en el citosol y sostenidos por el citoesqueleto.',
            },
            {
              tipo: 'diagrama',
              clave: 'celula',
              titulo: 'La célula y sus organelos',
              descripcion: 'Núcleo, mitocondria, retículo, Golgi y lisosomas: cada organelo cumple una función clave en la homeostasis.',
            },
            {
              tipo: 'lista',
              titulo: 'Organelos y su relevancia clínica',
              items: [
                'Núcleo: contiene el ADN; dirige la síntesis proteica. La lesión nuclear irreversible marca el punto de no retorno de la muerte celular.',
                'Mitocondria: "central energética", produce ATP por fosforilación oxidativa. Su disfunción (hipoxia, cianuro) precipita el metabolismo anaerobio.',
                'Retículo endoplásmico rugoso: síntesis de proteínas de exportación (ribosomas adheridos). El liso sintetiza lípidos y detoxifica fármacos.',
                'Aparato de Golgi: empaqueta y modifica proteínas; forma vesículas de secreción.',
                'Lisosomas: digestión intracelular con enzimas hidrolíticas; su ruptura libera enzimas que autodigieren la célula (autólisis en la necrosis).',
                'Peroxisomas: degradan ácidos grasos y peróxido de hidrógeno.',
              ],
            },
            {
              tipo: 'p',
              texto:
                'El citoesqueleto (microfilamentos de actina, filamentos intermedios y microtúbulos) da forma, permite el movimiento y el transporte intracelular. La matriz extracelular —colágeno, elastina, proteoglicanos— provee soporte estructural y modula la señalización; su integridad es clave en la cicatrización y en la respuesta al trauma.',
            },
          ],
        },
        {
          titulo: 'Transporte membranal',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El paso de sustancias a través de la membrana puede ser pasivo (sin gasto de ATP, a favor del gradiente) o activo (con gasto de energía, contra el gradiente). Distinguirlos explica por qué ciertas soluciones expanden o deshidratan la célula.',
            },
            {
              tipo: 'tabla',
              headers: ['Mecanismo', 'Energía', 'Ejemplo'],
              filas: [
                ['Difusión simple', 'No (pasivo)', 'O₂ y CO₂ a través de la bicapa'],
                ['Difusión facilitada', 'No (pasivo)', 'Glucosa por GLUT, canales iónicos'],
                ['Ósmosis', 'No (pasivo)', 'Agua a través de acuaporinas'],
                ['Transporte activo primario', 'Sí (ATP directo)', 'Bomba Na⁺/K⁺ ATPasa'],
                ['Transporte activo secundario', 'Sí (gradiente iónico)', 'Cotransporte Na⁺/glucosa (SGLT)'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'La bomba Na⁺/K⁺ ATPasa',
              texto:
                'Expulsa 3 Na⁺ e introduce 2 K⁺ por cada ATP, manteniendo el gradiente electroquímico, el potencial de membrana en reposo (≈ −70 mV) y el volumen celular. Cuando falla el ATP (isquemia), entra Na⁺ y agua → tumefacción celular, el primer signo de lesión.',
            },
            {
              tipo: 'diagrama',
              clave: 'bombanak',
              titulo: 'Bomba Na⁺/K⁺ ATPasa',
              descripcion: 'Con cada ATP la bomba expulsa 3 Na⁺ e introduce 2 K⁺: sostiene el potencial de reposo y el volumen de la célula.',
            },
          ],
        },
        {
          titulo: 'Bioenergética y metabolismo',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La oxidación completa de una molécula de glucosa rinde ~30-32 ATP en condiciones aerobias. El proceso ocurre en tres etapas encadenadas:',
            },
            {
              tipo: 'pasos',
              items: [
                'Glucólisis (citosol): glucosa → 2 piruvato, con ganancia neta de 2 ATP y 2 NADH. No requiere oxígeno.',
                'Ciclo de Krebs (matriz mitocondrial): el acetil-CoA se oxida liberando CO₂ y generando NADH y FADH₂.',
                'Cadena de transporte de electrones y fosforilación oxidativa (membrana mitocondrial interna): NADH y FADH₂ ceden electrones, se bombea H⁺ y la ATP sintasa produce la mayor parte del ATP usando O₂ como aceptor final.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Metabolismo anaerobio y lactato — la clave del shock',
              texto:
                'Sin O₂, el piruvato se convierte en lactato para regenerar NAD⁺ y permitir que la glucólisis continúe, pero con un rendimiento mísero de 2 ATP. La acumulación de lactato (>2 mmol/L, y de forma crítica >4) es un marcador de hipoperfusión tisular: indica que las células están "respirando" sin oxígeno. Por eso el lactato sérico es uno de los mejores indicadores de severidad y respuesta a la reanimación en el shock.',
            },
          ],
        },
        {
          titulo: 'Equilibrio ácido-base bioquímico',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El pH sanguíneo se mantiene estrecho (7.35-7.45) gracias a sistemas amortiguadores (tampones), la ventilación pulmonar y la regulación renal. El principal tampón extracelular es el sistema bicarbonato/ácido carbónico.',
            },
            {
              tipo: 'formula',
              texto: 'pH = 6.1 + log ( [HCO₃⁻] / (0.03 × pCO₂) )',
              nota: 'Ecuación de Henderson-Hasselbalch aplicada al sistema bicarbonato.',
            },
            {
              tipo: 'lista',
              titulo: 'Sistemas tampón principales',
              items: [
                'Bicarbonato (HCO₃⁻): el más importante en el líquido extracelular; regulado por pulmón (CO₂) y riñón (HCO₃⁻).',
                'Fosfato: relevante en el líquido intracelular y la orina.',
                'Proteínas (incluida la hemoglobina): amortiguan dentro de las células y la sangre.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Lectura rápida',
              texto:
                'Si baja el HCO₃⁻ (se consume amortiguando ácidos, como el lactato) → acidosis metabólica. El cuerpo compensa hiperventilando para "soplar" CO₂. Entender esto conecta directamente la bioquímica con la capnografía y la ventilación.',
            },
          ],
        },
        {
          titulo: 'Lesión y muerte celular',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Cuando cae el aporte de oxígeno, la lesión celular empieza siendo REVERSIBLE: se detiene la bomba Na⁺/K⁺, la célula se tumefacta y acumula lactato. Si la isquemia persiste, la lesión se vuelve IRREVERSIBLE: entra calcio de forma masiva, se activan enzimas (fosfolipasas y proteasas) y la membrana se rompe. Reconocer esta ventana es la base del "tiempo es músculo" y "tiempo es cerebro".',
            },
            {
              tipo: 'tabla',
              titulo: 'Apoptosis vs. necrosis',
              headers: ['Rasgo', 'Apoptosis', 'Necrosis'],
              filas: [
                ['Energía (ATP)', 'Requiere ATP (programada)', 'Ocurre sin ATP'],
                ['Membrana', 'Se mantiene íntegra', 'Se rompe y libera contenido'],
                ['Inflamación', 'Ausente', 'Marcada'],
                ['Patrón', 'Células aisladas', 'Grupos de células contiguas'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Ventana terapéutica',
              texto:
                'En el IAM y el ictus el objetivo es revertir la isquemia ANTES de que la lesión sea irreversible: reperfundir el miocardio o el tejido cerebral a tiempo limita la zona de necrosis. Por eso cada minuto cuenta en el prehospitalario.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Lesión por reperfusión',
              texto:
                'Al restaurar el flujo, el oxígeno que regresa genera radicales libres que pueden dañar aún más la célula (lesión por reperfusión). Por eso la reperfusión debe ser oportuna y controlada.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Bomba Na⁺/K⁺ ATPasa', definicion: 'Transporte activo que saca 3 Na⁺ y mete 2 K⁺ por ATP; sostiene el potencial de reposo y el volumen celular.' },
        { termino: 'Fosforilación oxidativa', definicion: 'Producción mayoritaria de ATP en la mitocondria usando O₂ como aceptor final de electrones.' },
        { termino: 'Lactato', definicion: 'Producto del metabolismo anaerobio; marcador de hipoperfusión tisular y severidad del shock.' },
        { termino: 'Henderson-Hasselbalch', definicion: 'Relación entre pH, bicarbonato y pCO₂ que rige el equilibrio ácido-base.' },
        { termino: 'Lesión irreversible', definicion: 'Entrada masiva de calcio y rotura de membrana tras isquemia prolongada; ya no hay recuperación celular.' },
        { termino: 'Lesión por reperfusión', definicion: 'Daño adicional por radicales libres al restaurar el flujo de oxígeno a un tejido isquémico.' },
      ],
      flashcards: [
        { frente: '¿Cuántos ATP rinde la glucólisis anaerobia vs. la oxidación aerobia completa de la glucosa?', reverso: '2 ATP (anaerobia) vs. ~30-32 ATP (aerobia).' },
        { frente: '¿Qué iones mueve la bomba Na⁺/K⁺ ATPasa y en qué proporción?', reverso: 'Saca 3 Na⁺, mete 2 K⁺ por cada ATP.' },
        { frente: '¿Por qué el lactato indica gravedad en el shock?', reverso: 'Refleja metabolismo anaerobio por hipoperfusión: las células carecen de O₂ suficiente.' },
        { frente: 'Principal tampón del líquido extracelular', reverso: 'Sistema bicarbonato/ácido carbónico (HCO₃⁻/H₂CO₃).' },
      ],
      quiz: [
        {
          pregunta: 'Durante isquemia profunda, ¿cuál es la primera consecuencia del fallo de la bomba Na⁺/K⁺ ATPasa?',
          opciones: ['Salida masiva de potasio sin consecuencias', 'Entrada de Na⁺ y agua con tumefacción celular', 'Aumento de la producción de ATP', 'Alcalosis intracelular'],
          correcta: 1,
          explicacion: 'Sin ATP la bomba se detiene, el Na⁺ entra siguiendo su gradiente y arrastra agua, produciendo tumefacción (edema) celular, signo precoz de lesión.',
        },
        {
          pregunta: 'Un paciente en shock presenta lactato de 6 mmol/L. ¿Qué refleja principalmente?',
          opciones: ['Buena oxigenación tisular', 'Hipoperfusión y metabolismo anaerobio', 'Alcalosis respiratoria pura', 'Exceso de bicarbonato'],
          correcta: 1,
          explicacion: 'El lactato elevado indica que los tejidos generan energía sin oxígeno suficiente (anaerobio), marcador de hipoperfusión y gravedad.',
        },
        {
          pregunta: '¿Dónde ocurre la fosforilación oxidativa?',
          opciones: ['Citosol', 'Membrana mitocondrial interna', 'Núcleo', 'Aparato de Golgi'],
          correcta: 1,
          explicacion: 'La cadena de transporte de electrones y la ATP sintasa se ubican en la membrana mitocondrial interna.',
        },
        {
          pregunta: 'El cotransporte Na⁺/glucosa (SGLT) es un ejemplo de:',
          opciones: ['Difusión simple', 'Transporte activo secundario', 'Ósmosis', 'Transporte activo primario'],
          correcta: 1,
          explicacion: 'Usa el gradiente de Na⁺ (creado por la bomba ATPasa) para mover glucosa contra su gradiente: transporte activo secundario.',
        },
      ],
      recursos: {
        videos: [
          { titulo: 'Bomba sodio-potasio (ATPasa) explicada', canal: 'Universitat Politècnica de València', url: 'https://www.youtube.com/watch?v=rjYlmKgrHbU' },
          { titulo: 'Glucólisis: pasos y destino del piruvato (fermentación)', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=PNSi9UJwGII' },
          { titulo: 'Metabolismo del lactato (enfoque urgencias / FOAMed)', canal: 'ChileEM', url: 'https://www.youtube.com/watch?v=j2ySc_53VTs' },
        ],
        fuentes: [
          { titulo: 'Physiology, Sodium-Potassium Pump', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK537088/' },
          { titulo: 'Physiology, Active Transport', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK547718/' },
          { titulo: 'Electrolytes', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK541123/' },
        ],
        imagenes: [
          { src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Scheme_sodium-potassium_pump-en-2.svg', caption: 'Esquema de la bomba Na⁺/K⁺ ATPasa (Wikimedia Commons, CC)', busqueda: 'bomba sodio potasio ATPasa esquema' },
          { src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Glycolysis_Simple_Diagram.jpg', caption: 'Vía simplificada de la glucólisis (Wikimedia Commons, CC)', busqueda: 'glucólisis esquema glucosa piruvato lactato' },
        ],
      },
      actividades: {
        ordenar: {
          titulo: 'fallo de la bomba Na⁺/K⁺ en isquemia',
          pasos: [
            'Cae el aporte de O₂ y se agotan las reservas de ATP.',
            'La bomba Na⁺/K⁺ ATPasa se detiene por falta de ATP.',
            'El Na⁺ entra a la célula siguiendo su gradiente.',
            'El agua sigue al Na⁺ y la célula se tumefacta (edema celular).',
            'El metabolismo se vuelve anaerobio y se acumula lactato.',
          ],
        },
        completar: [
          {
            texto: 'El metabolismo anaerobio produce ___ , un marcador de hipoperfusión tisular y gravedad del shock.',
            opciones: ['lactato', 'piruvato', 'glucógeno'],
            correcta: 0,
            explicacion: 'El piruvato se reduce a lactato cuando falta oxígeno; por eso el lactato sube en la hipoperfusión.',
          },
          {
            texto: 'La bomba Na⁺/K⁺ ATPasa saca ___ iones de sodio e introduce 2 de potasio por cada ATP.',
            opciones: ['3', '2', '1'],
            correcta: 0,
            explicacion: 'Saca 3 Na⁺ y mete 2 K⁺: al extraer una carga positiva neta, es electrogénica.',
          },
          {
            texto: 'El principal sistema tampón del líquido extracelular es el de ___ .',
            opciones: ['bicarbonato', 'fosfato', 'amoníaco'],
            correcta: 0,
            explicacion: 'El par HCO₃⁻/H₂CO₃ es el amortiguador extracelular más importante y se regula por vía respiratoria y renal.',
          },
        ],
        preguntas: [
          {
            pregunta: 'La bomba Na⁺/K⁺ saca 3 cargas positivas e introduce solo 2. ¿Qué propiedad le da esto?',
            opciones: ['Es eléctricamente neutra', 'Es electrogénica (contribuye al potencial de membrana)', 'Funciona sin ATP', 'Solo actúa en neuronas'],
            correcta: 1,
            explicacion: 'Al extraer una carga positiva neta por ciclo, la bomba es electrogénica: ayuda a mantener el interior celular negativo (potencial de reposo).',
          },
          {
            pregunta: 'Un paciente acumula ácidos y su HCO₃⁻ desciende. ¿Qué trastorno y compensación esperas?',
            opciones: ['Alcalosis metabólica con hipoventilación', 'Acidosis metabólica con hiperventilación compensatoria', 'Alcalosis respiratoria pura', 'Ningún cambio'],
            correcta: 1,
            explicacion: 'El bicarbonato se consume amortiguando ácidos → acidosis metabólica. El cuerpo compensa hiperventilando para "soplar" CO₂ y subir el pH.',
          },
          {
            pregunta: '¿Por qué la oxidación aerobia completa de la glucosa es tan superior a la glucólisis anaerobia?',
            opciones: ['Rinde ~30-32 ATP frente a 2 ATP', 'No necesita oxígeno', 'Ocurre en el núcleo', 'Produce lactato como energía'],
            correcta: 0,
            explicacion: 'La fosforilación oxidativa en la mitocondria rinde ~30-32 ATP por glucosa, frente a solo 2 ATP de la vía anaerobia: por eso la hipoxia compromete tan rápido a la célula.',
          },
        ],
      },
    },
    {
      id: 'anatomia-sistematica',
      numero: '1.2',
      titulo: 'Anatomía Humana Sistemática y Topográfica',
      icono: '🦴',
      duracion: '55 min',
      resumen:
        'Conocer reparos óseos, trayectos vasculares y la organización del sistema nervioso permite localizar accesos, interpretar lesiones y anticipar complicaciones.',
      objetivos: [
        'Identificar reparos óseos críticos para accesos intravasculares e intraóseos.',
        'Describir la organización del sistema nervioso central, periférico y autónomo.',
        'Reconocer la anatomía cardiovascular y del árbol traqueobronquial.',
      ],
      secciones: [
        {
          titulo: 'Planos, ejes y osteología',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La posición anatómica de referencia (de pie, palmas al frente) define los planos sagital, coronal (frontal) y transversal (axial), y los términos de relación: proximal/distal, medial/lateral, superior/inferior, anterior/posterior. Este lenguaje es imprescindible para comunicar lesiones y procedimientos sin ambigüedad.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Reparos óseos para accesos',
              texto:
                'Tuberosidad tibial: referencia para el acceso intraóseo en tibia proximal (1-2 cm medial y por debajo). Cabeza/tuberosidad mayor del húmero: sitio de IO humeral. Cresta ilíaca, acromion y maléolos son referencias palpables constantes incluso en pacientes con mala perfusión.',
            },
          ],
        },
        {
          titulo: 'Neuroanatomía',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'Sistema Nervioso Central (SNC)',
              items: [
                'Encéfalo: cerebro (hemisferios y corteza), responsable de funciones superiores y motricidad voluntaria.',
                'Diencéfalo: tálamo (relevo sensitivo) e hipotálamo (homeostasis, eje endocrino, temperatura).',
                'Tallo cerebral: mesencéfalo, protuberancia y bulbo raquídeo; aloja centros vitales (respiratorio y cardiovascular) y el origen de la mayoría de los pares craneales.',
                'Cerebelo: coordinación, equilibrio y tono.',
                'Médula espinal: vía de conducción y centro de reflejos.',
              ],
            },
            {
              tipo: 'p',
              texto:
                'El Sistema Nervioso Periférico incluye los 12 pares craneales y los nervios espinales. El Sistema Nervioso Autónomo se divide en simpático ("lucha o huida": taquicardia, midriasis, broncodilatación, vasoconstricción) y parasimpático ("reposo y digestión": bradicardia, miosis, aumento del peristaltismo). Su equilibrio explica la respuesta hemodinámica al estrés y al shock neurogénico.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Pares craneales de alto rendimiento',
              texto:
                'III (oculomotor): la dilatación pupilar fija unilateral sugiere herniación por hipertensión intracraneal. X (vago): principal eje parasimpático cardíaco. VII (facial) y XII (hipogloso) se evalúan en el ictus.',
            },
          ],
        },
        {
          titulo: 'Anatomía cardiovascular y respiratoria',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La circulación mayor (sistémica) lleva sangre oxigenada del ventrículo izquierdo al cuerpo; la menor (pulmonar) lleva sangre desoxigenada del ventrículo derecho a los pulmones. Las arterias coronarias nacen de la raíz aórtica: la coronaria izquierda se divide en descendente anterior (cara anterior y septo) y circunfleja (cara lateral); la coronaria derecha irriga el ventrículo derecho y, en la mayoría, la cara inferior y el nodo AV.',
            },
            {
              tipo: 'diagrama',
              clave: 'corazon',
              titulo: 'Anatomía del corazón y arterias coronarias',
              descripcion: 'Descendente anterior, circunfleja y coronaria derecha: saber qué cara irriga cada una predice la arteria ocluida en el IAM.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Correlación coronaria-ECG',
              texto:
                'Saber qué arteria irriga cada cara permite predecir la arteria ocluida en un IAMCEST: cara inferior (II, III, aVF) → coronaria derecha; cara anterior (V1-V4) → descendente anterior; lateral (I, aVL, V5-V6) → circunfleja.',
            },
            {
              tipo: 'p',
              texto:
                'El árbol traqueobronquial parte de la tráquea, que se bifurca en la carina hacia los bronquios principales. El bronquio derecho es más vertical, corto y ancho: por eso los cuerpos extraños y la intubación selectiva tienden a alojarse a la derecha. Los pulmones se dividen en lóbulos (3 derecho, 2 izquierdo) y segmentos. Las pleuras (visceral y parietal) crean un espacio virtual cuya integridad mantiene la presión negativa necesaria para la ventilación.',
            },
            {
              tipo: 'diagrama',
              clave: 'respiratorio',
              titulo: 'Árbol traqueobronquial y pulmones',
              descripcion: 'Tráquea, carina y bronquios principales; el derecho es más vertical, corto y ancho.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Tuberosidad tibial', definicion: 'Reparo para el acceso intraóseo en tibia proximal.' },
        { termino: 'Carina', definicion: 'Bifurcación de la tráquea en los bronquios principales.' },
        { termino: 'Descendente anterior', definicion: 'Arteria que irriga la cara anterior y el septo; su oclusión da IAM anterior.' },
        { termino: 'SN simpático vs. parasimpático', definicion: 'Lucha/huida vs. reposo/digestión; gobiernan la respuesta hemodinámica.' },
      ],
      flashcards: [
        { frente: '¿Qué arteria coronaria suele irrigar la cara inferior del corazón?', reverso: 'La coronaria derecha (derivaciones II, III, aVF).' },
        { frente: '¿Por qué la intubación selectiva tiende al lado derecho?', reverso: 'El bronquio principal derecho es más vertical, corto y ancho.' },
        { frente: 'Reparo anatómico para IO tibial', reverso: 'Tuberosidad tibial: 1-2 cm medial e inferior a ella.' },
        { frente: 'Pupila dilatada fija unilateral en TCE sugiere…', reverso: 'Herniación con compresión del III par (oculomotor).' },
      ],
      quiz: [
        {
          pregunta: 'Un IAMCEST con elevación del ST en II, III y aVF localiza la lesión en la cara:',
          opciones: ['Anterior', 'Lateral', 'Inferior', 'Posterior'],
          correcta: 2,
          explicacion: 'II, III y aVF corresponden a la cara inferior, irrigada habitualmente por la coronaria derecha.',
        },
        {
          pregunta: 'El acceso intraóseo en tibia proximal se referencia respecto a:',
          opciones: ['El maléolo lateral', 'La tuberosidad tibial', 'La cabeza del peroné únicamente', 'La rótula superior'],
          correcta: 1,
          explicacion: 'Se inserta 1-2 cm medial e inferior a la tuberosidad tibial, en la cara plana de la tibia.',
        },
        {
          pregunta: 'La activación simpática produce:',
          opciones: ['Bradicardia y miosis', 'Taquicardia, midriasis y broncodilatación', 'Aumento del peristaltismo', 'Vasodilatación generalizada'],
          correcta: 1,
          explicacion: 'El simpático prepara para "lucha o huida": taquicardia, midriasis, broncodilatación y vasoconstricción.',
        },
      ],
      recursos: {
        videos: [
          { titulo: 'Correlación arteria coronaria y ECG (descendente anterior)', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=xC7Rp4hHUbY' },
        ],
        fuentes: [
          { titulo: 'Anatomy, Thorax, Heart Coronary Arteries', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK534790/' },
          { titulo: 'Physiology, Coronary Circulation', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK482413/' },
        ],
        imagenes: [
          { src: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Coronary_arteries.svg', caption: 'Arterias coronarias (Wikimedia Commons, P. J. Lynch, CC BY)', busqueda: 'arterias coronarias anatomía esquema' },
        ],
      },
      actividades: {
        ordenar: {
          titulo: 'acceso intraóseo en tibia proximal',
          pasos: [
            'Identifica la tuberosidad tibial.',
            'Localiza el sitio 1-2 cm medial e inferior a ella (cara plana de la tibia).',
            'Inserta la aguja intraósea perpendicular al hueso.',
            'Atraviesa la cortical hasta notar la pérdida de resistencia.',
            'Confirma la posición (aspira/infunde sin extravasación) y fija el dispositivo.',
          ],
        },
        completar: [
          {
            texto: 'La elevación del ST en II, III y aVF indica un infarto de cara ___ , irrigada habitualmente por la coronaria derecha.',
            opciones: ['inferior', 'anterior', 'lateral'],
            correcta: 0,
            explicacion: 'II, III y aVF son las derivaciones de la cara inferior.',
          },
          {
            texto: 'El bronquio principal ___ es más vertical, corto y ancho; por eso la intubación selectiva y los cuerpos extraños tienden a ese lado.',
            opciones: ['derecho', 'izquierdo'],
            correcta: 0,
            explicacion: 'La anatomía del bronquio derecho favorece la intubación selectiva y la aspiración hacia la derecha.',
          },
          {
            texto: 'La arteria descendente anterior irriga la cara ___ y el septo del corazón.',
            opciones: ['anterior', 'inferior', 'posterior'],
            correcta: 0,
            explicacion: 'Su oclusión produce el IAM de cara anterior (V1-V4).',
          },
        ],
        preguntas: [
          {
            pregunta: '¿Qué par craneal, al comprimirse por herniación, produce una pupila dilatada fija unilateral?',
            opciones: ['III (oculomotor)', 'VII (facial)', 'X (vago)', 'XII (hipogloso)'],
            correcta: 0,
            explicacion: 'La herniación uncal comprime el III par (oculomotor), dando midriasis fija ipsilateral: signo de alarma en el TCE.',
          },
          {
            pregunta: 'La activación del sistema nervioso parasimpático produce predominantemente:',
            opciones: ['Taquicardia y midriasis', 'Bradicardia, miosis y aumento del peristaltismo', 'Broncodilatación', 'Vasoconstricción generalizada'],
            correcta: 1,
            explicacion: 'El parasimpático es "reposo y digestión": bradicardia, miosis y mayor actividad digestiva.',
          },
        ],
      },
    },
    {
      id: 'fisiologia-medica',
      numero: '1.3',
      titulo: 'Fisiología Médica (Enfoque Guyton/Ganong)',
      icono: '❤️',
      duracion: '60 min',
      resumen:
        'La fisiología explica el "porqué" de cada signo vital. Dominar el gasto cardíaco, la mecánica ventilatoria y la regulación renal es la llave para razonar el shock y la insuficiencia respiratoria.',
      objetivos: [
        'Descomponer el gasto cardíaco en sus determinantes.',
        'Interpretar la curva de disociación de la oxihemoglobina (Bohr/Haldane).',
        'Explicar el sistema renina-angiotensina-aldosterona y su papel en la volemia.',
      ],
      secciones: [
        {
          titulo: 'Fisiología cardiovascular',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El potencial de acción cardíaco difiere entre las células marcapasos (nodo sinusal y AV, con despolarización espontánea dependiente de canales de calcio) y el músculo contráctil (con una meseta prolongada por entrada de Ca²⁺ que sostiene la contracción y previene la tetania).',
            },
            {
              tipo: 'formula',
              texto: 'Gasto cardíaco (GC) = Frecuencia cardíaca × Volumen sistólico',
              nota: 'Y la Presión Arterial Media ≈ GC × Resistencia Vascular Sistémica.',
            },
            {
              tipo: 'lista',
              titulo: 'Determinantes del volumen sistólico',
              items: [
                'Precarga: volumen telediastólico (estiramiento de la fibra). A mayor retorno venoso, mayor contracción (ley de Frank-Starling), hasta un límite.',
                'Poscarga: resistencia contra la que el ventrículo eyecta (presión aórtica, RVS).',
                'Inotropismo (contractilidad): fuerza intrínseca de contracción, aumentada por el simpático y fármacos como la dobutamina.',
              ],
            },
            {
              tipo: 'diagrama',
              clave: 'gasto',
              titulo: 'Determinantes del gasto cardíaco',
              descripcion: 'Precarga, poscarga e inotropismo: cada tipo de shock ataca uno distinto y el tratamiento se dirige al alterado.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Razonamiento del shock',
              texto:
                'Cada tipo de shock ataca un determinante distinto: el hipovolémico baja la precarga; el cardiogénico baja el inotropismo; el distributivo (séptico/neurogénico/anafiláctico) baja la RVS (poscarga y tono). El tratamiento se dirige al determinante alterado: volumen, inotrópicos o vasopresores.',
            },
          ],
        },
        {
          titulo: 'Fisiología respiratoria',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La ventilación depende de la distensibilidad (compliance: facilidad para inflarse) y la resistencia de las vías aéreas. La difusión de gases sigue la Ley de Fick: es proporcional a la superficie y al gradiente de presión, e inversamente proporcional al grosor de la membrana alveolocapilar (engrosada en el edema y la fibrosis).',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Curva de disociación de la oxihemoglobina',
              texto:
                'Su forma sigmoidea explica que la SpO₂ se mantenga alta hasta una pO₂ ~60 mmHg, y luego caiga bruscamente. Se desplaza a la DERECHA (suelta O₂ a los tejidos) con acidosis, hipercapnia, fiebre y aumento de 2,3-DPG (efecto Bohr). Se desplaza a la IZQUIERDA (retiene O₂) con alcalosis, hipotermia e hipocapnia. El efecto Haldane describe cómo la desoxihemoglobina transporta mejor el CO₂.',
            },
            {
              tipo: 'diagrama',
              clave: 'oxihemoglobina',
              titulo: 'Curva de disociación de la oxihemoglobina',
              descripcion: 'La forma sigmoidea y sus desplazamientos (efecto Bohr) explican cuándo la hemoglobina cede o retiene O₂.',
            },
          ],
        },
        {
          titulo: 'Fisiología renal',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El riñón filtra el plasma en el glomérulo (la tasa de filtración glomerular, TFG, es el mejor índice de función renal) y luego reabsorbe selectivamente agua y solutos en los túbulos. Regula la volemia, los electrolitos y el equilibrio ácido-base reabsorbiendo o excretando bicarbonato y H⁺.',
            },
            {
              tipo: 'diagrama',
              clave: 'nefrona',
              titulo: 'La nefrona',
              descripcion: 'Glomérulo y túbulos: filtración, reabsorción y secreción que regulan volemia, electrolitos y pH.',
            },
            {
              tipo: 'pasos',
              titulo: 'Sistema Renina-Angiotensina-Aldosterona (SRAA)',
              items: [
                'La caída de la presión de perfusión renal estimula la liberación de renina (aparato yuxtaglomerular).',
                'La renina convierte angiotensinógeno en angiotensina I.',
                'La ECA (pulmonar) convierte angiotensina I en angiotensina II, un potente vasoconstrictor que eleva la RVS.',
                'La angiotensina II estimula la aldosterona, que retiene Na⁺ y agua, y la ADH, expandiendo la volemia.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Por qué importa en prehospitalario',
              texto:
                'El SRAA es el mecanismo compensatorio de fondo en la hipovolemia: explica la taquicardia, la vasoconstricción (palidez, llenado capilar lento) y la oliguria del paciente en shock antes de que caiga la presión. Reconocer estos signos permite tratar el shock "compensado" antes de la descompensación.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Frank-Starling', definicion: 'A mayor precarga (estiramiento), mayor fuerza de contracción, hasta un límite.' },
        { termino: 'Efecto Bohr', definicion: 'Acidosis/CO₂/fiebre desplazan la curva de O₂ a la derecha, liberando O₂ a los tejidos.' },
        { termino: 'TFG', definicion: 'Tasa de filtración glomerular: mejor índice de función renal.' },
        { termino: 'SRAA', definicion: 'Eje hormonal que retiene sodio y agua y vasoconstriñe para sostener la presión.' },
      ],
      flashcards: [
        { frente: 'Fórmula del gasto cardíaco', reverso: 'GC = Frecuencia cardíaca × Volumen sistólico.' },
        { frente: '¿Hacia dónde desplaza la acidosis la curva de oxihemoglobina y qué implica?', reverso: 'A la derecha: la hemoglobina suelta más O₂ a los tejidos (efecto Bohr).' },
        { frente: 'Tres determinantes del volumen sistólico', reverso: 'Precarga, poscarga e inotropismo (contractilidad).' },
        { frente: '¿Qué enzima y dónde convierte angiotensina I en II?', reverso: 'La ECA, principalmente en el pulmón.' },
      ],
      quiz: [
        {
          pregunta: 'En el shock cardiogénico, el determinante del gasto cardíaco primariamente afectado es:',
          opciones: ['La precarga', 'La poscarga', 'El inotropismo (contractilidad)', 'La frecuencia exclusivamente'],
          correcta: 2,
          explicacion: 'El corazón pierde fuerza de contracción; de ahí el uso de inotrópicos como la dobutamina.',
        },
        {
          pregunta: 'La fiebre, la acidosis y la hipercapnia desplazan la curva de disociación de la oxihemoglobina:',
          opciones: ['A la izquierda, reteniendo O₂', 'A la derecha, cediendo más O₂ a los tejidos', 'No la modifican', 'La hacen lineal'],
          correcta: 1,
          explicacion: 'Es el efecto Bohr: condiciones de demanda tisular elevada hacen que la hemoglobina libere O₂ más fácilmente.',
        },
        {
          pregunta: '¿Cuál es el estímulo inicial de la liberación de renina?',
          opciones: ['Hipertensión arterial', 'Caída de la presión de perfusión renal', 'Alcalosis', 'Hiperkalemia aislada'],
          correcta: 1,
          explicacion: 'La hipoperfusión renal (como en la hipovolemia) activa el SRAA para retener sodio y agua y vasoconstreñir.',
        },
      ],
      recursos: {
        videos: [
          { titulo: 'Gasto cardíaco — explicación fácil (fisiología)', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=bgczI-aptCU' },
          { titulo: 'Precarga, poscarga y contractilidad', canal: 'YouTube', url: 'https://www.youtube.com/watch?v=3udMgloGofE' },
        ],
        fuentes: [
          { titulo: 'Physiology, Cardiac Output', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK470455/' },
          { titulo: 'Physiology, Stroke Volume', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBK547686/' },
        ],
        imagenes: [
          { src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Oxygen-Haemoglobin_dissociation_curves.svg', caption: 'Curva de disociación de la oxihemoglobina (Wikimedia Commons, CC)', busqueda: 'curva disociación oxihemoglobina efecto Bohr' },
        ],
      },
      actividades: {
        ordenar: {
          titulo: 'sistema renina-angiotensina-aldosterona (SRAA)',
          pasos: [
            'Cae la presión de perfusión renal y se libera renina.',
            'La renina convierte el angiotensinógeno en angiotensina I.',
            'La ECA (en el pulmón) convierte la angiotensina I en angiotensina II.',
            'La angiotensina II produce vasoconstricción y eleva la RVS.',
            'La angiotensina II estimula aldosterona y ADH → retención de Na⁺ y agua.',
          ],
        },
        completar: [
          {
            texto: 'El gasto cardíaco es igual a la frecuencia cardíaca multiplicada por el ___ .',
            opciones: ['volumen sistólico', 'volumen residual', 'retorno venoso'],
            correcta: 0,
            explicacion: 'GC = FC × Volumen sistólico.',
          },
          {
            texto: 'La acidosis, la fiebre y la hipercapnia desplazan la curva de oxihemoglobina hacia la ___ (efecto Bohr).',
            opciones: ['derecha', 'izquierda'],
            correcta: 0,
            explicacion: 'A la derecha = la hemoglobina cede más O₂ a los tejidos que lo necesitan.',
          },
          {
            texto: 'En el shock cardiogénico el determinante del gasto cardíaco primariamente afectado es el ___ .',
            opciones: ['inotropismo', 'la precarga', 'la poscarga'],
            correcta: 0,
            explicacion: 'Cae la contractilidad; por eso se usan inotrópicos como la dobutamina.',
          },
        ],
        preguntas: [
          {
            pregunta: 'Según la ley de Frank-Starling, al aumentar la precarga (hasta un límite):',
            opciones: ['Disminuye la fuerza de contracción', 'Aumenta la fuerza de contracción', 'No cambia nada', 'El corazón se detiene'],
            correcta: 1,
            explicacion: 'Mayor estiramiento de la fibra (precarga) → mayor fuerza de contracción, hasta un punto óptimo.',
          },
          {
            pregunta: '¿Dónde se convierte mayoritariamente la angiotensina I en angiotensina II?',
            opciones: ['En el riñón', 'En el pulmón (por la ECA)', 'En el hígado', 'En el bazo'],
            correcta: 1,
            explicacion: 'La enzima convertidora de angiotensina (ECA) actúa sobre todo en el endotelio pulmonar.',
          },
        ],
      },
    },
  ],
}
