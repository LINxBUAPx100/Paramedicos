// FASE 5 — Transición a Medicina (Ciencias Preclínicas y Clínicas Básicas)

export const fase5 = {
  id: 'fase-5',
  numero: 5,
  titulo: 'Transición a Medicina',
  subtitulo: 'Ciencias Preclínicas y Clínicas Básicas',
  color: '#8b5cf6',
  icono: '🎓',
  descripcion:
    'Conceptos avanzados que preparan el terreno para la patología médica formal y el razonamiento clínico complejo: fisiopatología celular, inmunología, sepsis, medicina interna e imagen.',
  temas: [
    {
      id: 'fisiopatologia-inmunologia',
      numero: '5.1',
      titulo: 'Fisiopatología Estructural e Inmunología',
      icono: '🛡️',
      duracion: '55 min',
      resumen:
        'Cómo responde la célula al estrés, cómo se inflama y repara el tejido y cómo el sistema inmune defiende y a veces daña al organismo.',
      objetivos: [
        'Diferenciar lesión celular reversible e irreversible, necrosis y apoptosis.',
        'Describir los mediadores de la inflamación y la cascada de la coagulación.',
        'Clasificar la inmunidad innata/adaptativa y las reacciones de hipersensibilidad.',
      ],
      secciones: [
        {
          titulo: 'Respuesta celular al estrés',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Ante una agresión, la célula primero se adapta (hipertrofia, hiperplasia, atrofia, metaplasia). Si el estímulo persiste, sufre lesión reversible (tumefacción, esteatosis) y, superado un umbral, lesión irreversible que termina en muerte celular.',
            },
            {
              tipo: 'tabla',
              headers: ['', 'Necrosis', 'Apoptosis'],
              filas: [
                ['Naturaleza', 'Patológica, no programada', 'Programada, fisiológica o patológica'],
                ['Energía (ATP)', 'No requiere', 'Requiere ATP'],
                ['Membrana', 'Se rompe; libera contenido', 'Se mantiene; cuerpos apoptóticos'],
                ['Inflamación', 'Sí, intensa', 'No (típicamente)'],
              ],
            },
          ],
        },
        {
          titulo: 'Inflamación, reparación y coagulación',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'Mediadores químicos de la inflamación',
              items: [
                'Histamina: vasodilatación y aumento de la permeabilidad (mastocitos).',
                'Prostaglandinas: dolor, fiebre, vasodilatación (diana de los AINE).',
                'Citocinas (TNF-α, IL-1, IL-6): respuesta sistémica, fiebre; centrales en la sepsis.',
                'Sistema del complemento: opsonización, quimiotaxis y lisis (complejo de ataque a la membrana).',
              ],
            },
            {
              tipo: 'p',
              texto:
                'La cascada de la coagulación se describía en dos vías: la intrínseca (contacto, medida por el TTPa) y la extrínseca (factor tisular, medida por el TP/INR), que convergen en la vía común (activación del factor X → trombina → fibrina). El modelo celular moderno integra estas vías sobre la superficie de las plaquetas en fases de iniciación, amplificación y propagación.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Por qué importa',
              texto:
                'Entender qué vía mide cada prueba (extrínseca → TP/INR; intrínseca → TTPa) explica el efecto de anticoagulantes (warfarina afecta el INR; heparina, el TTPa) y la coagulopatía del trauma y la sepsis.',
            },
          ],
        },
        {
          titulo: 'Sistema inmune e hipersensibilidad',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La inmunidad innata es la primera línea, rápida e inespecífica (barreras, neutrófilos, macrófagos, complemento). La adaptativa es específica y con memoria: linfocitos T (celular) y B (humoral, producen anticuerpos).',
            },
            {
              tipo: 'tabla',
              headers: ['Tipo de hipersensibilidad', 'Mecanismo', 'Ejemplo'],
              filas: [
                ['I — Inmediata', 'IgE, mastocitos, histamina', 'Anafilaxia, alergia, asma'],
                ['II — Citotóxica', 'Anticuerpos contra células (IgG/IgM)', 'Reacción transfusional, anemia hemolítica'],
                ['III — Complejos inmunes', 'Depósito de complejos antígeno-anticuerpo', 'Lupus, enfermedad del suero'],
                ['IV — Retardada', 'Linfocitos T (no anticuerpos)', 'Dermatitis de contacto, prueba de tuberculina'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Anafilaxia = hipersensibilidad tipo I',
              texto:
                'La liberación masiva de histamina causa vasodilatación, broncoespasmo y aumento de la permeabilidad (shock distributivo). La adrenalina es el tratamiento de elección por sus efectos alfa (vasoconstricción) y beta (broncodilatación, estabilización del mastocito).',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Apoptosis', definicion: 'Muerte celular programada, dependiente de ATP, sin inflamación.' },
        { termino: 'Necrosis', definicion: 'Muerte celular patológica con ruptura de membrana e inflamación.' },
        { termino: 'Complemento', definicion: 'Sistema de proteínas que opsoniza, atrae leucocitos y lisa patógenos.' },
        { termino: 'Hipersensibilidad I', definicion: 'Reacción mediada por IgE e histamina: anafilaxia y alergias.' },
      ],
      flashcards: [
        { frente: 'Diferencia clave entre necrosis y apoptosis respecto a la inflamación', reverso: 'La necrosis genera inflamación; la apoptosis típicamente no.' },
        { frente: '¿Qué vía de la coagulación mide el TP/INR?', reverso: 'La vía extrínseca (factor tisular).' },
        { frente: 'Tipo de hipersensibilidad de la anafilaxia', reverso: 'Tipo I, mediada por IgE e histamina.' },
        { frente: 'Tres citocinas centrales en la respuesta sistémica/sepsis', reverso: 'TNF-α, IL-1 e IL-6.' },
      ],
      quiz: [
        {
          pregunta: 'La anafilaxia corresponde a una hipersensibilidad de tipo:',
          opciones: ['I (mediada por IgE)', 'II (citotóxica)', 'III (complejos inmunes)', 'IV (retardada)'],
          correcta: 0,
          explicacion: 'Es tipo I: la IgE activa mastocitos que liberan histamina, causando shock distributivo y broncoespasmo.',
        },
        {
          pregunta: '¿Cuál es una característica de la necrosis frente a la apoptosis?',
          opciones: ['No requiere ATP y provoca inflamación', 'Es siempre fisiológica', 'Mantiene íntegra la membrana', 'Forma cuerpos apoptóticos'],
          correcta: 0,
          explicacion: 'La necrosis es pasiva, rompe la membrana y libera contenido celular que desencadena inflamación intensa.',
        },
        {
          pregunta: 'La warfarina prolonga principalmente:',
          opciones: ['El TTPa (vía intrínseca)', 'El TP/INR (vía extrínseca)', 'El tiempo de sangrado plaquetario', 'Ninguna prueba'],
          correcta: 1,
          explicacion: 'La warfarina afecta factores de la vía extrínseca/común medidos por TP/INR; la heparina afecta el TTPa.',
        },
      ],
    },
    {
      id: 'microbiologia-sepsis',
      numero: '5.2',
      titulo: 'Microbiología y Enfermedades Infecciosas (Sepsis)',
      icono: '🦠',
      duracion: '50 min',
      resumen:
        'La tinción de Gram clasifica las bacterias y orienta el tratamiento; la fisiopatología de la sepsis explica cómo una infección se convierte en disfunción multiorgánica.',
      objetivos: [
        'Clasificar bacterias por tinción de Gram y morfología.',
        'Explicar la fisiopatología de la sepsis y el MODS.',
        'Reconocer la coagulopatía intravascular diseminada (CID).',
      ],
      secciones: [
        {
          titulo: 'Bacteriología básica',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La tinción de Gram separa las bacterias según su pared celular: las Gram positivas (gruesa capa de peptidoglicano) se tiñen de violeta; las Gram negativas (pared fina con membrana externa de lipopolisacárido) se tiñen de rosa. La morfología las clasifica en cocos (esféricos) y bacilos (alargados).',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'El LPS de las Gram negativas',
              texto:
                'El lipopolisacárido (endotoxina) de la membrana externa de las Gram negativas es un potente desencadenante de la respuesta inflamatoria sistémica y del shock séptico: activa la liberación masiva de citocinas.',
            },
          ],
        },
        {
          titulo: 'Fisiopatología de la sepsis',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La sepsis es una disfunción orgánica potencialmente mortal causada por una respuesta desregulada del huésped a la infección. No es solo la bacteria: es la reacción inmune descontrolada la que daña los propios órganos.',
            },
            {
              tipo: 'pasos',
              titulo: 'Cascada fisiopatológica',
              items: [
                'El patógeno (o su endotoxina) activa la inmunidad innata y libera citocinas (TNF-α, IL-1, IL-6).',
                'Disfunción endotelial: vasodilatación, aumento de permeabilidad y fuga capilar → hipotensión y edema (shock distributivo).',
                'Coagulopatía: activación de la coagulación con consumo de factores y plaquetas → CID (microtrombos + sangrado).',
                'Hipoperfusión e hipoxia tisular → metabolismo anaerobio, lactato elevado.',
                'Síndrome de disfunción multiorgánica (MODS): fallo progresivo de riñón, pulmón, hígado, etc.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Reconocimiento y "hora dorada" de la sepsis',
              texto:
                'Sospecha sepsis ante infección + signos de disfunción: alteración del estado mental, taquipnea, hipotensión, lactato elevado. El qSOFA (PAS ≤100, FR ≥22, alteración mental) es una herramienta rápida de cribado. El tratamiento precoz —cultivos, antibióticos tempranos, fluidos y vasopresores (norepinefrina) para sostener la PAM— mejora la supervivencia.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Gram positivas/negativas', definicion: 'Clasificación por la pared bacteriana; las negativas tienen LPS (endotoxina).' },
        { termino: 'Sepsis', definicion: 'Disfunción orgánica por respuesta desregulada del huésped a la infección.' },
        { termino: 'CID', definicion: 'Coagulación intravascular diseminada: microtrombos y sangrado por consumo de factores.' },
        { termino: 'MODS', definicion: 'Síndrome de disfunción multiorgánica.' },
      ],
      flashcards: [
        { frente: '¿De qué color se tiñen las bacterias Gram negativas?', reverso: 'Rosa/rojo (pared fina con LPS); las Gram positivas, violeta.' },
        { frente: '¿Qué componente bacteriano dispara fuertemente el shock séptico?', reverso: 'El lipopolisacárido (endotoxina) de las Gram negativas.' },
        { frente: 'Componentes del qSOFA', reverso: 'PAS ≤100 mmHg, FR ≥22 rpm y alteración del estado mental.' },
        { frente: '¿Qué es la CID?', reverso: 'Coagulación intravascular diseminada: trombosis microvascular y sangrado simultáneos.' },
      ],
      quiz: [
        {
          pregunta: 'La sepsis se define fundamentalmente como:',
          opciones: ['Cualquier infección bacteriana', 'Disfunción orgánica por una respuesta desregulada del huésped a la infección', 'Fiebre aislada', 'Presencia de bacterias en sangre sin más'],
          correcta: 1,
          explicacion: 'Lo que define la sepsis es la disfunción orgánica derivada de la respuesta inmune desregulada, no solo la infección.',
        },
        {
          pregunta: 'El componente de las bacterias Gram negativas que desencadena el shock séptico es:',
          opciones: ['El ácido teicoico', 'El lipopolisacárido (endotoxina)', 'La cápsula de las Gram positivas', 'El peptidoglicano grueso'],
          correcta: 1,
          explicacion: 'El LPS de la membrana externa de las Gram negativas activa una liberación masiva de citocinas.',
        },
        {
          pregunta: 'En el shock séptico, el vasopresor de primera elección para sostener la PAM es:',
          opciones: ['Dobutamina', 'Norepinefrina', 'Furosemida', 'Atropina'],
          correcta: 1,
          explicacion: 'Tras la reanimación con fluidos, la norepinefrina es el vasopresor de primera línea en la sepsis.',
        },
      ],
    },
    {
      id: 'medicina-interna',
      numero: '5.3',
      titulo: 'Introducción a la Medicina Interna',
      icono: '🩺',
      duracion: '55 min',
      resumen:
        'Fisiopatología de las urgencias gastroenterológicas, nefrológicas y endocrinológicas que el paramédico avanzado debe reconocer y estabilizar.',
      objetivos: [
        'Reconocer la hemorragia digestiva, la pancreatitis y la insuficiencia hepática.',
        'Clasificar la lesión renal aguda y los trastornos del potasio y sodio.',
        'Manejar la CAD, el EHH y las urgencias endocrinas.',
      ],
      secciones: [
        {
          titulo: 'Gastroenterología',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'Urgencias frecuentes',
              items: [
                'Úlcera péptica: erosión por desequilibrio entre agresión (ácido, H. pylori, AINE) y defensa mucosa; puede sangrar o perforar.',
                'Hemorragia digestiva alta (sobre el ángulo de Treitz): hematemesis, melena; causas como úlcera o várices esofágicas.',
                'Hemorragia digestiva baja: hematoquecia/rectorragia.',
                'Insuficiencia hepática: ictericia, coagulopatía, encefalopatía, ascitis.',
                'Pancreatitis aguda: dolor epigástrico irradiado a la espalda, autodigestión enzimática; litiasis y alcohol son las causas principales.',
              ],
            },
          ],
        },
        {
          titulo: 'Nefrología y electrolitos',
          bloques: [
            {
              tipo: 'tabla',
              headers: ['Lesión renal aguda', 'Mecanismo'],
              filas: [
                ['Prerrenal', 'Hipoperfusión (hipovolemia, shock); riñón estructuralmente sano.'],
                ['Intrínseca (renal)', 'Daño del parénquima (necrosis tubular aguda, nefrotóxicos).'],
                ['Posrenal', 'Obstrucción del flujo urinario (litiasis, próstata).'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Hiperkalemia: amenaza inmediata',
              texto:
                'El potasio elevado altera el potencial de membrana cardíaco: ondas T picudas, ensanchamiento del QRS, ondas sinusoidales y paro. El manejo de emergencia incluye gluconato de calcio (estabiliza la membrana), insulina con glucosa y salbutamol (introducen K⁺ en la célula).',
            },
            {
              tipo: 'p',
              texto:
                'El equilibrio ácido-base avanzado usa el anión gap (Na⁺ − (Cl⁻ + HCO₃⁻)) para clasificar la acidosis metabólica: con anión gap elevado (cetoacidosis, lactato, tóxicos) o normal (pérdidas digestivas, renales). El delta gap evalúa trastornos mixtos.',
            },
          ],
        },
        {
          titulo: 'Endocrinología urgente',
          bloques: [
            {
              tipo: 'tabla',
              headers: ['', 'Cetoacidosis diabética (CAD)', 'Estado Hiperosmolar (EHH)'],
              filas: [
                ['Tipo de diabetes', 'Típicamente tipo 1', 'Típicamente tipo 2'],
                ['Glucemia', 'Alta (>250 mg/dL)', 'Muy alta (>600 mg/dL)'],
                ['Cetonas/acidosis', 'Presentes; acidosis con anión gap', 'Mínimas; sin acidosis significativa'],
                ['Osmolaridad', 'Elevada', 'Muy elevada'],
                ['Clave clínica', 'Respiración de Kussmaul, aliento a frutas', 'Deshidratación severa, alteración neurológica'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Pilares del tratamiento de la CAD',
              texto:
                'Fluidos (la deshidratación es enorme), insulina (detiene la cetogénesis) y reposición de potasio. ¡Cuidado! La insulina introduce K⁺ en la célula y puede precipitar una hipokalemia peligrosa; debe vigilarse y reponerse el potasio.',
            },
            {
              tipo: 'lista',
              titulo: 'Otras urgencias endocrinas',
              items: [
                'Tormenta tiroidea: hipertiroidismo extremo con fiebre, taquiarritmia y agitación.',
                'Insuficiencia suprarrenal aguda (crisis addisoniana): hipotensión refractaria, hiponatremia, hiperkalemia; requiere hidrocortisona.',
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'LRA prerrenal', definicion: 'Lesión renal por hipoperfusión con riñón estructuralmente sano.' },
        { termino: 'Anión gap', definicion: 'Na⁺ − (Cl⁻ + HCO₃⁻); clasifica la acidosis metabólica.' },
        { termino: 'Hiperkalemia', definicion: 'Potasio elevado con riesgo de arritmia letal; tratar con calcio, insulina/glucosa, salbutamol.' },
        { termino: 'CAD vs. EHH', definicion: 'CAD con cetoacidosis (tipo 1); EHH con glucemia y osmolaridad extremas sin acidosis (tipo 2).' },
      ],
      flashcards: [
        { frente: 'Primer fármaco para estabilizar la membrana cardíaca en hiperkalemia', reverso: 'Gluconato de calcio (no baja el K⁺, protege el corazón).' },
        { frente: 'Fórmula del anión gap', reverso: 'Na⁺ − (Cl⁻ + HCO₃⁻).' },
        { frente: 'Diferencia clave entre CAD y EHH', reverso: 'La CAD cursa con cetoacidosis; el EHH con osmolaridad/glucemia extremas sin acidosis significativa.' },
        { frente: 'Patrón respiratorio de la CAD', reverso: 'Respiración de Kussmaul (profunda y rápida) para compensar la acidosis.' },
      ],
      quiz: [
        {
          pregunta: 'Un paciente diabético tipo 1 con glucemia 420, respiración de Kussmaul y aliento a frutas tiene probablemente:',
          opciones: ['Estado hiperosmolar (EHH)', 'Cetoacidosis diabética (CAD)', 'Hipoglucemia', 'Tormenta tiroidea'],
          correcta: 1,
          explicacion: 'La cetoacidosis produce acidosis metabólica con respiración de Kussmaul compensatoria y aliento cetónico (afrutado).',
        },
        {
          pregunta: 'En la hiperkalemia con cambios en el ECG, el primer fármaco que estabiliza la membrana cardíaca es:',
          opciones: ['Insulina', 'Gluconato de calcio', 'Salbutamol', 'Bicarbonato'],
          correcta: 1,
          explicacion: 'El calcio estabiliza el potencial de membrana del miocardio inmediatamente, aunque no reduce el potasio sérico.',
        },
        {
          pregunta: 'Una LRA por hipovolemia/shock, con riñón estructuralmente sano, se clasifica como:',
          opciones: ['Intrínseca', 'Prerrenal', 'Posrenal', 'Obstructiva'],
          correcta: 1,
          explicacion: 'La causa prerrenal es la hipoperfusión; al restaurar la perfusión la función suele recuperarse.',
        },
      ],
    },
    {
      id: 'diagnostico-imagen',
      numero: '5.4',
      titulo: 'Diagnóstico por Imagen (Conceptos Iniciales)',
      icono: '🖥️',
      duracion: '45 min',
      resumen:
        'El POCUS y la lectura sistemática de radiografía y TC llevan el diagnóstico al lado del paciente, acelerando decisiones críticas.',
      objetivos: [
        'Conocer los protocolos POCUS (eFAST, RUSH, BLUE) y su utilidad.',
        'Leer sistemáticamente una radiografía de tórax (ABCDE).',
        'Reconocer estructuras en la TC de cráneo simple.',
      ],
      secciones: [
        {
          titulo: 'POCUS (ecografía a pie de cama)',
          bloques: [
            {
              tipo: 'tabla',
              headers: ['Protocolo', 'Indicación', 'Busca'],
              filas: [
                ['eFAST', 'Trauma', 'Líquido libre abdominal, hemopericardio, neumotórax y hemotórax.'],
                ['RUSH', 'Shock indiferenciado', 'Causa del shock: corazón, volemia (vena cava), aorta, tórax/abdomen.'],
                ['BLUE', 'Dificultad respiratoria', 'Patrones pulmonares: neumotórax, edema, derrame, consolidación.'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Signos ecográficos esenciales',
              texto:
                'El "deslizamiento pleural" (lung sliding) descarta neumotórax en ese punto; su ausencia, con el "punto pulmón", lo sugiere. Las "líneas B" en cohete indican edema/síndrome intersticial. El derrame pericárdico con colapso de cavidades sugiere taponamiento.',
            },
          ],
        },
        {
          titulo: 'Radiografía de tórax (ABCDE)',
          bloques: [
            {
              tipo: 'pasos',
              titulo: 'Lectura sistemática',
              items: [
                'A — Airway: vía aérea/tráquea central, bronquios.',
                'B — Bones: costillas, clavículas, columna (fracturas).',
                'C — Cardiac: silueta cardíaca (índice cardiotorácico).',
                'D — Diaphragm: hemidiafragmas, ángulos costofrénicos, aire bajo el diafragma.',
                'E — Effusion/Fields: derrames y campos pulmonares (infiltrados, neumotórax).',
              ],
            },
          ],
        },
        {
          titulo: 'TC de cráneo simple',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La TC simple es la prueba inicial en el TCE y el ictus. Se evalúa sistemáticamente: Sangre (hiperdensa, blanca: hematomas epidural en lente biconvexa, subdural en semiluna), Cisternas (su borramiento sugiere HIC/herniación), Cerebro (asimetría, desviación de línea media, borramiento de surcos), Ventrículos (tamaño, hidrocefalia) y Hueso (fracturas).',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Epidural vs. subdural',
              texto:
                'Hematoma EPIdural: forma de lente biconvexa, suele ser arterial (arteria meníngea media), con clásico "intervalo lúcido". Hematoma SUBdural: forma de semiluna (cóncava), venoso, frecuente en ancianos y alcohólicos por trauma menor.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'eFAST', definicion: 'Protocolo POCUS de trauma para líquido libre, hemopericardio y neumotórax.' },
        { termino: 'Líneas B', definicion: 'Artefactos ecográficos de edema/síndrome intersticial pulmonar.' },
        { termino: 'ABCDE radiográfico', definicion: 'Airway, Bones, Cardiac, Diaphragm, Effusion/Fields.' },
        { termino: 'Epidural vs. subdural', definicion: 'Lente biconvexa arterial vs. semiluna venosa.' },
      ],
      flashcards: [
        { frente: '¿Qué protocolo POCUS se usa en el trauma?', reverso: 'eFAST (líquido libre, hemopericardio, neumotórax/hemotórax).' },
        { frente: 'Forma del hematoma epidural en la TC', reverso: 'Lente biconvexa (lenticular), típicamente arterial.' },
        { frente: '¿Qué descarta el deslizamiento pleural (lung sliding)?', reverso: 'El neumotórax en ese punto explorado.' },
        { frente: 'Las cinco "S" de la TC de cráneo', reverso: 'Sangre, cisternas, cerebro, ventrículos y hueso (sistemática de lectura).' },
      ],
      quiz: [
        {
          pregunta: 'Un hematoma con forma de lente biconvexa en la TC corresponde a:',
          opciones: ['Hematoma subdural (venoso)', 'Hematoma epidural (arterial)', 'Hemorragia subaracnoidea', 'Infarto isquémico'],
          correcta: 1,
          explicacion: 'El epidural es típicamente arterial (meníngea media) y adopta forma biconvexa/lenticular, con intervalo lúcido clásico.',
        },
        {
          pregunta: 'El protocolo POCUS indicado para un paciente en shock indiferenciado es:',
          opciones: ['eFAST', 'RUSH', 'BLUE', 'ABCDE'],
          correcta: 1,
          explicacion: 'El protocolo RUSH evalúa de forma estructurada las causas del shock (bomba, tanque y tuberías).',
        },
        {
          pregunta: 'La ausencia de deslizamiento pleural junto al "punto pulmón" en ecografía sugiere:',
          opciones: ['Edema pulmonar', 'Neumotórax', 'Derrame pericárdico', 'Consolidación neumónica'],
          correcta: 1,
          explicacion: 'La pérdida del lung sliding con punto pulmón es altamente sugestiva de neumotórax.',
        },
      ],
    },
  ],
}
