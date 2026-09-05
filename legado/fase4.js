// FASE 4 — TUM-Avanzado y Cuidados Críticos (Paramédico)

export const fase4 = {
  id: 'fase-4',
  numero: 4,
  titulo: 'TUM-Avanzado y Cuidados Críticos',
  subtitulo: 'Paramédico',
  color: '#ef4444',
  icono: '🫀',
  descripcion:
    'El nivel paramédico maneja la vía aérea definitiva, la cardiología avanzada con terapia eléctrica y el soporte crítico de trauma. Cada intervención exige precisión y comprensión profunda de la fisiología subyacente.',
  temas: [
    {
      id: 'via-aerea-definitiva',
      numero: '4.1',
      titulo: 'Vía Aérea Definitiva y Ventilación Mecánica',
      icono: '🫁',
      duracion: '65 min',
      resumen:
        'La intubación de secuencia rápida, la cricotiroidotomía de rescate, la capnografía y la ventilación mecánica protectora son el núcleo del manejo avanzado de la vía aérea.',
      objetivos: [
        'Ejecutar las fases de la intubación de secuencia rápida (RSI) y diferenciar la DSI.',
        'Identificar la vía aérea difícil anatómica (LEMON) y fisiológica (HOP).',
        'Interpretar la onda capnográfica y sus fases.',
        'Programar parámetros básicos de ventilación mecánica protectora.',
      ],
      secciones: [
        {
          titulo: 'Intubación de Secuencia Rápida (RSI) y Retardada (DSI)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La RSI consiste en administrar de forma casi simultánea un inductor y un bloqueador neuromuscular para crear condiciones óptimas de intubación minimizando el riesgo de broncoaspiración. La DSI (secuencia retardada) usa primero un agente disociativo como la ketamina para permitir la preoxigenación en el paciente agitado, retrasando la parálisis.',
            },
            {
              tipo: 'pasos',
              titulo: 'Las "P" de la RSI',
              items: [
                'Preparación: equipo, monitorización, plan de rescate, fármacos calculados.',
                'Preoxigenación: lavado de nitrógeno con O₂ al 100% durante 3 min para crear reserva en la CRF y prolongar la apnea segura.',
                'Pretratamiento / optimización fisiológica: corregir hipotensión e hipoxemia antes de inducir.',
                'Parálisis con inducción: inductor (ketamina, etomidato) + bloqueador (succinilcolina o rocuronio).',
                'Posicionamiento: "ramping" (alinear conducto auditivo con la horquilla esternal), maniobra de Sellick opcional.',
                'Prueba de colocación: visualización, capnografía, auscultación.',
                'Postintubación: sedoanalgesia, fijación, ventilación protectora.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Preoxigenación = "lavado de nitrógeno"',
              texto:
                'El aire alveolar es ~78% nitrógeno. Respirar O₂ al 100% reemplaza ese nitrógeno por oxígeno en la capacidad residual funcional, creando un reservorio que permite varios minutos de apnea sin desaturar. Es el paso que más tiempo seguro otorga durante la intubación.',
            },
          ],
        },
        {
          titulo: 'Vía aérea difícil: LEMON y HOP',
          bloques: [
            {
              tipo: 'tabla',
              headers: ['LEMON (anatómicamente difícil)', 'Significado'],
              filas: [
                ['L — Look', 'Inspección externa: trauma, obesidad, cuello corto, barba.'],
                ['E — Evaluate 3-3-2', 'Apertura bucal 3 dedos, mentón-hioides 3, hioides-cartílago tiroides 2.'],
                ['M — Mallampati', 'Visibilidad de estructuras orofaríngeas (clases I-IV).'],
                ['O — Obstruction/Obesity', 'Masas, edema, epiglotitis, obesidad.'],
                ['N — Neck mobility', 'Movilidad cervical (limitada en collarín o artritis).'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'HOP — la vía aérea fisiológicamente difícil',
              texto:
                'Aunque la anatomía sea fácil, el paciente puede deteriorarse al intubar por su fisiología: Hipotensión (la inducción y la presión positiva colapsan el gasto cardíaco → "intubación que mata"), Oxigenación límite (desatura en segundos), pH/acidosis (la apnea elimina la compensación respiratoria). Hay que optimizar HOP ANTES de inducir.',
            },
          ],
        },
        {
          titulo: 'Cricotiroidotomía quirúrgica',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Es la vía aérea de rescate cuando "no se puede intubar, no se puede oxigenar" (CICO). Se accede a la tráquea a través de la membrana cricotiroidea, palpable entre el cartílago tiroides (manzana de Adán) y el cricoides.',
            },
            {
              tipo: 'pasos',
              titulo: 'Técnica bisturí-dedo-bougie',
              items: [
                'Identificar y estabilizar la laringe; localizar la membrana cricotiroidea.',
                'Incisión vertical en piel, luego horizontal en la membrana con el bisturí.',
                'Introducir el dedo para mantener el trayecto (palpación).',
                'Pasar el bougie hacia la tráquea y deslizar el tubo sobre él.',
                'Confirmar con capnografía y ventilar.',
              ],
            },
          ],
        },
        {
          titulo: 'Capnografía (ETCO₂)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La capnografía mide el CO₂ espirado y es el estándar de oro para confirmar la colocación traqueal del tubo y monitorizar ventilación y perfusión. La onda normal tiene cuatro fases.',
            },
            {
              tipo: 'lista',
              titulo: 'Fases de la onda capnográfica',
              items: [
                'Fase I: línea base inspiratoria, sin CO₂ (espacio muerto).',
                'Fase II: ascenso rápido (vaciado del espacio muerto + alveolar).',
                'Fase III: meseta alveolar; su final es el ETCO₂.',
                'Fase IV: descenso inspiratorio al entrar aire fresco.',
                'Ángulo alfa (entre II y III) y ángulo beta (entre III y IV) reflejan la mecánica.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Lecturas clave del ETCO₂',
              texto:
                'Patrón "aleta de tiburón" (ascenso lento, ángulo alfa aumentado) = broncoespasmo (asma/EPOC). En RCP: ETCO₂ refleja el gasto cardíaco generado por las compresiones; un ascenso súbito a >35-40 mmHg sugiere retorno de circulación espontánea (ROSC); valores persistentemente <10 mmHg indican compresiones inefectivas o mal pronóstico. Una caída brusca puede indicar embolia pulmonar o desplazamiento del tubo.',
            },
          ],
        },
        {
          titulo: 'Ventilación mecánica básica',
          bloques: [
            {
              tipo: 'tabla',
              headers: ['Modo', 'Característica'],
              filas: [
                ['AC/VC (asistida-controlada por volumen)', 'Entrega un volumen fijo en cada respiración (propias o del ventilador).'],
                ['SIMV', 'Sincroniza respiraciones mandatorias con el esfuerzo del paciente; permite respiraciones espontáneas.'],
                ['CPAP', 'Presión positiva continua; el paciente respira espontáneamente (edema agudo de pulmón).'],
                ['BiPAP', 'Dos niveles de presión (inspiratorio y espiratorio); apoya la ventilación (EPOC, hipercapnia).'],
              ],
            },
            {
              tipo: 'lista',
              titulo: 'Parámetros de protección pulmonar',
              items: [
                'Volumen tidal: 6-8 mL/kg de peso corporal IDEAL (no real) para evitar volutrauma.',
                'PEEP: presión positiva al final de la espiración; recluta alvéolos y mejora la oxigenación.',
                'FiO₂: titular a la SpO₂ objetivo evitando hiperoxia innecesaria.',
                'Frecuencia respiratoria: ajustada al ETCO₂/pH objetivo.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Peso IDEAL, no real',
              texto:
                'El volumen tidal se calcula sobre el peso corporal ideal (basado en talla y sexo), porque el tamaño del pulmón depende de la estatura, no de la obesidad. Usar el peso real sobredistiende los pulmones y causa lesión.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Preoxigenación', definicion: 'Lavado de nitrógeno con O₂ 100% que crea reserva para la apnea de la intubación.' },
        { termino: 'LEMON', definicion: 'Nemotecnia de vía aérea anatómicamente difícil.' },
        { termino: 'HOP', definicion: 'Vía aérea fisiológicamente difícil: Hipotensión, Oxigenación, pH.' },
        { termino: 'ETCO₂ en RCP', definicion: 'Refleja el gasto cardíaco; subida súbita sugiere ROSC.' },
        { termino: 'Volumen tidal protector', definicion: '6-8 mL/kg de peso IDEAL para evitar volutrauma.' },
      ],
      flashcards: [
        { frente: '¿Qué significa "lavado de nitrógeno" en la preoxigenación?', reverso: 'Reemplazar el N₂ alveolar por O₂ al 100% para crear reserva y prolongar la apnea segura.' },
        { frente: '¿Qué evalúa la "HOP" antes de intubar?', reverso: 'La dificultad FISIOLÓGICA: Hipotensión, Oxigenación, pH/acidosis.' },
        { frente: 'Patrón capnográfico en "aleta de tiburón" indica…', reverso: 'Broncoespasmo (asma/EPOC), por ángulo alfa aumentado.' },
        { frente: '¿Sobre qué peso se calcula el volumen tidal?', reverso: 'Peso corporal IDEAL (no el real), 6-8 mL/kg.' },
        { frente: 'Membrana de la cricotiroidotomía: ¿entre qué cartílagos?', reverso: 'Entre el cartílago tiroides y el cricoides.' },
      ],
      quiz: [
        {
          pregunta: 'Durante una RCP, el ETCO₂ sube súbitamente de 12 a 40 mmHg. Esto sugiere:',
          opciones: ['Hiperventilación', 'Retorno de la circulación espontánea (ROSC)', 'Desplazamiento del tubo', 'Embolia pulmonar'],
          correcta: 1,
          explicacion: 'El ascenso brusco del ETCO₂ refleja el restablecimiento del gasto cardíaco: signo de ROSC.',
        },
        {
          pregunta: 'La "H" de la regla HOP en vía aérea fisiológicamente difícil se refiere a:',
          opciones: ['Hipertermia', 'Hipotensión', 'Hemorragia', 'Hipoglucemia'],
          correcta: 1,
          explicacion: 'HOP = Hipotensión, Oxigenación, pH. La hipotensión puede provocar colapso hemodinámico al inducir.',
        },
        {
          pregunta: 'El volumen tidal protector en ventilación mecánica es:',
          opciones: ['10-12 mL/kg de peso real', '6-8 mL/kg de peso ideal', '15 mL/kg de peso ideal', '4 mL/kg de peso real'],
          correcta: 1,
          explicacion: 'Para evitar volutrauma se usan 6-8 mL/kg calculados sobre el peso corporal ideal.',
        },
        {
          pregunta: 'La vía aérea quirúrgica de rescate en situación "no intubable, no oxigenable" es:',
          opciones: ['Cánula orofaríngea', 'Cricotiroidotomía', 'Mascarilla laríngea', 'Intubación nasotraqueal'],
          correcta: 1,
          explicacion: 'Ante CICO, la cricotiroidotomía a través de la membrana cricotiroidea es la vía de rescate definitiva.',
        },
      ],
    },
    {
      id: 'cardiologia-avanzada',
      numero: '4.2',
      titulo: 'Cardiología Avanzada, Electrofisiología y Terapia Eléctrica',
      icono: '⚡',
      duracion: '70 min',
      resumen:
        'Leer un ECG de 12 derivaciones, reconocer un IAMCEST y sus equivalentes, y dominar la farmacología de reanimación distinguen al paramédico avanzado.',
      objetivos: [
        'Interpretar el eje eléctrico y los bloqueos de rama en el ECG.',
        'Reconocer el IAMCEST y sus equivalentes (Wellens, De Winter, Sgarbossa).',
        'Aplicar la farmacología de reanimación con dosis críticas.',
      ],
      secciones: [
        {
          titulo: 'ECG de 12, 15 y 18 derivaciones',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El ECG de 12 derivaciones observa el corazón desde planos frontal (derivaciones de los miembros) y horizontal (precordiales). Las derivaciones derechas (V3R-V6R, ECG de 15) detectan el infarto de ventrículo derecho, y las posteriores (V7-V9, ECG de 18) el infarto posterior, que de otro modo pasan desapercibidos.',
            },
            {
              tipo: 'lista',
              titulo: 'Lectura sistemática',
              items: [
                'Ritmo y frecuencia.',
                'Eje eléctrico: dirección media de la despolarización (normal entre −30° y +90°).',
                'Intervalos: PR, QRS, QT.',
                'Bloqueos de rama: QRS ancho (>120 ms). BRD ("orejas de conejo" rsR\' en V1); BRI (QRS ancho con morfología en V6).',
                'Hipertrofias, isquemia (T), lesión (ST) y necrosis (Q).',
              ],
            },
          ],
        },
        {
          titulo: 'Síndromes coronarios agudos (SICA)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El IAMCEST (infarto con elevación del ST) traduce oclusión completa de una coronaria y exige reperfusión urgente. La elevación significativa del ST en derivaciones contiguas, con imagen especular (descenso recíproco), localiza la cara afectada.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Infarto de ventrículo derecho',
              texto:
                'Sospéchalo ante un IAM inferior (II, III, aVF) con hipotensión. Se confirma con elevación del ST en V4R. Es PRECARGA-dependiente: los nitratos y otros vasodilatadores pueden causar colapso. El manejo prioriza el aporte de volumen.',
            },
            {
              tipo: 'tabla',
              headers: ['Equivalente de STEMI', 'Hallazgo'],
              filas: [
                ['Síndrome de Wellens', 'T bifásicas o profundamente invertidas en V2-V3: estenosis crítica de la descendente anterior.'],
                ['Ondas T de De Winter', 'Descenso del ST con T altas y picudas en precordiales: oclusión proximal de la DA.'],
                ['Criterios de Sgarbossa', 'Permiten diagnosticar IAM en presencia de BRI o marcapasos (concordancia del ST).'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'No descartar IAM por un BRI',
              texto:
                'Un bloqueo de rama izquierda oculta los cambios isquémicos habituales. Los criterios de Sgarbossa (elevación concordante del ST ≥1 mm, descenso concordante en V1-V3, o elevación discordante excesiva) rescatan el diagnóstico en pacientes que de otro modo no recibirían reperfusión.',
            },
          ],
        },
        {
          titulo: 'Farmacología de reanimación',
          bloques: [
            {
              tipo: 'tabla',
              headers: ['Clase / Fármaco', 'Mecanismo', 'Dosis y uso prehospitalario'],
              filas: [
                ['Vasopresor — Norepinefrina', 'Agonista alfa-1 > beta-1; aumenta la RVS', 'Infusión 0.05-1 mcg/kg/min. Shock séptico, cardiogénico, neurogénico.'],
                ['Inotrópico — Dobutamina', 'Agonista beta-1/beta-2; aumenta la contractilidad', 'Infusión 2-20 mcg/kg/min. Falla cardíaca descompensada.'],
                ['Antiarrítmico III — Amiodarona', 'Bloqueo de canales de K⁺; prolonga el potencial de acción', 'Paro: 300 mg IV en bolo. TV estable: 150 mg IV en 10 min.'],
                ['Inductor — Ketamina', 'Antagonista NMDA; disociativo, mantiene reflejos', '1-2 mg/kg IV (inducción RSI); 0.1-0.3 mg/kg (analgesia).'],
                ['BNM despolarizante — Succinilcolina', 'Despolariza la placa motora', '1.5-2 mg/kg IV. Inicio y duración cortos.'],
                ['BNM no despolarizante — Rocuronio', 'Bloquea el receptor de acetilcolina', '1-1.2 mg/kg IV. Duración más prolongada.'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Norepinefrina: el vasopresor de primera línea',
              texto:
                'Su predominio alfa-1 produce vasoconstricción potente elevando la RVS, con un efecto beta-1 modesto que sostiene la frecuencia. Es de elección en la mayoría de los shocks que requieren vasopresor, especialmente el séptico.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'IAMCEST', definicion: 'Infarto con elevación del ST: oclusión coronaria completa que requiere reperfusión urgente.' },
        { termino: 'V4R', definicion: 'Derivación derecha clave para diagnosticar infarto de ventrículo derecho.' },
        { termino: 'Sgarbossa', definicion: 'Criterios para diagnosticar IAM en presencia de BRI o marcapasos.' },
        { termino: 'Norepinefrina', definicion: 'Vasopresor alfa-1 predominante; primera línea en la mayoría de shocks.' },
        { termino: 'Amiodarona', definicion: 'Antiarrítmico clase III; 300 mg en paro, 150 mg en TV estable.' },
      ],
      flashcards: [
        { frente: 'Dosis de amiodarona en paro cardíaco', reverso: '300 mg IV en bolo (segunda dosis de 150 mg si persiste).' },
        { frente: '¿Por qué los nitratos son peligrosos en el IAM de ventrículo derecho?', reverso: 'El VD es precarga-dependiente; la venodilatación reduce el llenado y causa hipotensión/colapso.' },
        { frente: 'Mecanismo de la norepinefrina', reverso: 'Agonista alfa-1 > beta-1: vasoconstricción que eleva la RVS.' },
        { frente: 'Hallazgo del síndrome de Wellens', reverso: 'T bifásicas o profundamente invertidas en V2-V3: estenosis crítica de la DA.' },
        { frente: 'Dosis de inducción de ketamina en RSI', reverso: '1-2 mg/kg IV.' },
      ],
      quiz: [
        {
          pregunta: 'Paciente con IAM inferior e hipotensión. Antes de dar nitratos debes:',
          opciones: ['Administrarlos de inmediato', 'Descartar infarto de ventrículo derecho (V4R) por ser precarga-dependiente', 'Duplicar la dosis', 'Dar un bolo de furosemida'],
          correcta: 1,
          explicacion: 'El IAM de VD depende de la precarga; los nitratos pueden precipitar colapso. Hay que buscar elevación en V4R y priorizar volumen.',
        },
        {
          pregunta: 'La dosis de amiodarona en el paro cardíaco por FV/TV sin pulso es:',
          opciones: ['150 mg en bolo', '300 mg IV en bolo', '1 mg/kg/min', '50 mg en 10 min'],
          correcta: 1,
          explicacion: 'En paro se administran 300 mg IV en bolo; puede repetirse una dosis de 150 mg.',
        },
        {
          pregunta: 'Los criterios de Sgarbossa sirven para:',
          opciones: ['Calcular el eje eléctrico', 'Diagnosticar IAM en presencia de bloqueo de rama izquierda', 'Medir el QT', 'Identificar hipertrofia auricular'],
          correcta: 1,
          explicacion: 'El BRI enmascara la isquemia; los criterios de Sgarbossa permiten reconocer el IAM pese al bloqueo.',
        },
        {
          pregunta: 'El vasopresor de primera línea en el shock séptico es:',
          opciones: ['Dobutamina', 'Norepinefrina', 'Amiodarona', 'Succinilcolina'],
          correcta: 1,
          explicacion: 'La norepinefrina (alfa-1 predominante) eleva la RVS y es de elección en el shock séptico.',
        },
      ],
    },
    {
      id: 'soporte-trauma-critico',
      numero: '4.3',
      titulo: 'Soporte Avanzado de Trauma y Cuidados Críticos',
      icono: '🩹',
      duracion: '60 min',
      resumen:
        'El shock hemorrágico, los procedimientos torácicos de emergencia y el trauma craneoencefálico grave requieren decisiones rápidas basadas en fisiología de daños.',
      objetivos: [
        'Aplicar la reanimación de control de daños en el shock hemorrágico.',
        'Indicar y describir los procedimientos torácicos de emergencia.',
        'Manejar el TCE grave según la doctrina de Monro-Kellie.',
      ],
      secciones: [
        {
          titulo: 'Manejo del shock hemorrágico',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La reanimación de control de daños busca evitar la "tríada letal": hipotermia, acidosis y coagulopatía, que se retroalimentan. Prioriza hemoderivados (sangre entera, concentrados de eritrocitos y plasma en proporciones equilibradas) sobre los cristaloides, que diluyen los factores de coagulación.',
            },
            {
              tipo: 'lista',
              titulo: 'Pilares',
              items: [
                'Reanimación hipotensiva: mantener una presión "permisiva" (p. ej., PAS ~80-90 mmHg o pulso radial presente) hasta el control quirúrgico, para no "reventar el coágulo".',
                'Hemoderivados precoces: sangre entera o plasma; minimizar cristaloides.',
                'Ácido Tranexámico (TXA): antifibrinolítico; reduce la mortalidad por hemorragia si se administra dentro de las 3 primeras horas.',
                'Control de la hemorragia: torniquetes, agentes hemostáticos, empaquetamiento, faja pélvica.',
                'Prevención de la hipotermia: mantas, fluidos tibios.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'TXA: la ventana importa',
              texto:
                'El ácido tranexámico estabiliza el coágulo inhibiendo la fibrinólisis. Administrado dentro de las primeras 3 horas del trauma reduce la mortalidad; después de ese tiempo puede ser perjudicial. El tiempo es un factor decisivo.',
            },
          ],
        },
        {
          titulo: 'Procedimientos torácicos',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El neumotórax a tensión es una emergencia clínica (no radiológica): el aire atrapado colapsa el pulmón, desplaza el mediastino y comprime las grandes venas, reduciendo el retorno venoso. Se manifiesta con disnea, hipotensión, ingurgitación yugular, ausencia de ruidos y desviación traqueal tardía.',
            },
            {
              tipo: 'tabla',
              headers: ['Procedimiento', 'Sitio / nota'],
              filas: [
                ['Descompresión con aguja', '5.º espacio intercostal, línea axilar anterior (preferido en adultos), o 2.º espacio medioclavicular como alternativa.'],
                ['Toracostomía con dedo (finger thoracostomy)', 'Incisión y disección digital en el 5.º EIC; más fiable que la aguja en tórax grueso.'],
                ['Pericardiocentesis ecoguiada', 'Evacuación del taponamiento cardíaco guiada por POCUS.'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Por qué cambió el sitio de la aguja',
              texto:
                'El 5.º espacio intercostal en la línea axilar anterior tiene menos masa muscular y grasa que el clásico 2.º espacio medioclavicular en muchos adultos, aumentando la probabilidad de alcanzar la cavidad pleural con la aguja.',
            },
          ],
        },
        {
          titulo: 'Trauma craneoencefálico grave',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La doctrina de Monro-Kellie establece que el cráneo es un compartimento rígido con tres componentes: cerebro, sangre y líquido cefalorraquídeo. Si uno aumenta (p. ej., un hematoma), otro debe disminuir; agotada la compensación, la presión intracraneal (PIC) se dispara.',
            },
            {
              tipo: 'formula',
              texto: 'PPC = PAM − PIC',
              nota: 'Presión de Perfusión Cerebral = Presión Arterial Media − Presión Intracraneal. Si la PIC sube o la PAM baja, el cerebro se isquemiza.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Tríada de Cushing',
              texto:
                'Hipertensión (PAS elevada), bradicardia y respiración irregular: es un signo TARDÍO de hipertensión intracraneal y herniación inminente. Refleja el intento desesperado del cuerpo por mantener la perfusión cerebral.',
            },
            {
              tipo: 'lista',
              titulo: 'Prevención de la lesión secundaria',
              items: [
                'Evitar la HIPOXIA (mantener SpO₂ ≥ 94%) y la HIPOTENSIÓN (cada episodio empeora el pronóstico).',
                'Normocapnia: la hiperventilación sistemática es perjudicial (vasoconstricción cerebral); reservar la hiperventilación controlada y transitoria solo para signos de herniación.',
                'Cabecera a 30°, normotermia, control de convulsiones y manejo del dolor.',
                'Salino hipertónico para la hipertensión intracraneal.',
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Tríada letal', definicion: 'Hipotermia, acidosis y coagulopatía que se potencian en el trauma grave.' },
        { termino: 'Reanimación hipotensiva', definicion: 'Presión permisiva hasta el control quirúrgico para no desprender el coágulo.' },
        { termino: 'TXA', definicion: 'Antifibrinolítico que reduce mortalidad si se da dentro de las 3 h del trauma.' },
        { termino: 'Monro-Kellie', definicion: 'El cráneo rígido contiene cerebro, sangre y LCR en equilibrio de presión.' },
        { termino: 'Tríada de Cushing', definicion: 'HTA, bradicardia y respiración irregular: herniación inminente (signo tardío).' },
      ],
      flashcards: [
        { frente: '¿Cuál es la "tríada letal" del trauma?', reverso: 'Hipotermia, acidosis y coagulopatía.' },
        { frente: 'Ventana terapéutica del ácido tranexámico', reverso: 'Primeras 3 horas tras el trauma; después puede ser perjudicial.' },
        { frente: 'Sitio preferido actual para descompresión con aguja en adultos', reverso: '5.º espacio intercostal, línea axilar anterior.' },
        { frente: 'Componentes de la tríada de Cushing', reverso: 'Hipertensión, bradicardia y respiración irregular (HIC tardía).' },
        { frente: 'Fórmula de la presión de perfusión cerebral', reverso: 'PPC = PAM − PIC.' },
      ],
      quiz: [
        {
          pregunta: 'La tríada de Cushing (HTA, bradicardia, respiración irregular) indica:',
          opciones: ['Shock hipovolémico', 'Hipertensión intracraneal con herniación inminente', 'Sepsis temprana', 'Intoxicación opiácea'],
          correcta: 1,
          explicacion: 'Es un signo tardío de PIC elevada; el cuerpo eleva la PAM para perfundir el cerebro, con bradicardia refleja.',
        },
        {
          pregunta: 'En el shock hemorrágico, la reanimación hipotensiva busca:',
          opciones: ['Normalizar la presión rápidamente con cristaloides', 'Mantener una presión permisiva para no desprender el coágulo hasta el control quirúrgico', 'Elevar la PAS sobre 140 mmHg', 'Evitar todo aporte de líquidos'],
          correcta: 1,
          explicacion: 'Subir bruscamente la presión puede "reventar el coágulo" y aumentar el sangrado; se tolera una presión más baja hasta el control definitivo.',
        },
        {
          pregunta: 'Según Monro-Kellie, ¿qué ocurre al crecer un hematoma intracraneal?',
          opciones: ['El cráneo se expande', 'Disminuyen LCR y sangre para compensar, hasta que la PIC se dispara', 'No hay cambios de presión', 'Aumenta el LCR'],
          correcta: 1,
          explicacion: 'En un cráneo rígido, el aumento de un componente desplaza a los otros; agotada la compensación, la PIC sube de forma abrupta.',
        },
        {
          pregunta: 'En el TCE grave, la hiperventilación sistemática es:',
          opciones: ['Recomendada siempre', 'Perjudicial porque vasoconstriñe y reduce el flujo cerebral; solo transitoria ante herniación', 'Indiferente', 'Útil para subir la PIC'],
          correcta: 1,
          explicacion: 'La hipocapnia vasoconstriñe y puede causar isquemia; se mantiene normocapnia, reservando la hiperventilación breve solo para signos de herniación.',
        },
      ],
    },
  ],
}
