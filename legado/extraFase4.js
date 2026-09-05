// FASE 4 — Temas adicionales de Cuidados Críticos (Paramédico)
// La Guía de Lin

export const extraFase4 = [
  {
    id: 'acls-paro-cardiaco',
    numero: '4.4',
    titulo: 'Paro Cardíaco y Algoritmos Avanzados',
    icono: '🫀',
    duracion: '60 min',
    resumen:
      'El soporte vital cardiovascular avanzado organiza la reanimación en torno a la calidad de las compresiones, la identificación del ritmo y la corrección de causas reversibles.',
    objetivos: [
      'Diferenciar los ritmos desfibrilables (FV/TVSP) de los no desfibrilables (AESP/asistolia) y aplicar el algoritmo correcto.',
      'Integrar los fármacos del paro (adrenalina y amiodarona o lidocaína) en los ciclos de RCP.',
      'Reconocer y tratar las causas reversibles (H y T).',
      'Aplicar los criterios de RCP de alta calidad y el papel de la capnografía.',
      'Identificar los signos de retorno de la circulación espontánea (RCE) y los cuidados posparo.',
    ],
    secciones: [
      {
        titulo: 'Principios de la RCP de alta calidad',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La supervivencia en el paro cardíaco depende menos de los fármacos y más de las compresiones de alta calidad ininterrumpidas y de la desfibrilación temprana cuando está indicada. Todo el algoritmo ACLS se construye sobre esta base; cualquier intervención que interrumpa las compresiones debe justificarse y minimizarse.',
          },
          {
            tipo: 'lista',
            titulo: 'Criterios de RCP de alta calidad',
            items: [
              'Frecuencia de 100 a 120 compresiones por minuto.',
              'Profundidad de al menos 5 cm y no más de 6 cm en el adulto.',
              'Permitir el reexpansión torácica completa entre compresiones.',
              'Minimizar las interrupciones: fracción de compresión torácica mayor al 60 por ciento.',
              'Evitar la ventilación excesiva; una vez con vía aérea avanzada, una ventilación cada 6 segundos (10 por minuto).',
              'Rotar al compresor cada 2 minutos para evitar la fatiga.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'La capnografía guía la reanimación',
            texto:
              'Un ETCO2 menor a 10 mmHg durante la RCP sugiere compresiones de mala calidad o muy bajo gasto; busca mejorar la técnica. Un ascenso brusco y sostenido del ETCO2 por arriba de 35 a 40 mmHg suele anunciar el retorno de la circulación espontánea antes incluso de palpar pulso.',
          },
          {
            tipo: 'diagrama',
            clave: 'ecg',
          },
        ],
      },
      {
        titulo: 'Ritmos desfibrilables: FV y TVSP',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La fibrilación ventricular (FV) y la taquicardia ventricular sin pulso (TVSP) responden a la desfibrilación. La energía entregada interrumpe la actividad eléctrica caótica para permitir que el nodo sinusal reasuma el control. Cada minuto de retraso en la desfibrilación reduce la probabilidad de supervivencia entre 7 y 10 por ciento.',
          },
          {
            tipo: 'pasos',
            titulo: 'Algoritmo del ritmo desfibrilable',
            items: [
              'Confirmar FV o TVSP en el monitor y desfibrilar de inmediato (bifásico 120 a 200 J segun fabricante, o 360 J monofásico).',
              'Reanudar RCP de inmediato durante 2 minutos sin verificar pulso.',
              'Establecer acceso IV o IO y vía aérea avanzada sin interrumpir compresiones.',
              'Tras la segunda descarga, administrar adrenalina 1 mg cada 3 a 5 minutos.',
              'Tras la tercera descarga, administrar amiodarona 300 mg en bolo (segunda dosis 150 mg) o lidocaína 1 a 1.5 mg/kg.',
              'Analizar el ritmo cada 2 minutos; desfibrilar si persiste el ritmo desfibrilable.',
              'Buscar y corregir causas reversibles (H y T) en paralelo.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Carga durante las compresiones',
            texto:
              'Cargue el desfibrilador mientras continúan las compresiones y solo deténgalas en el instante exacto de la descarga. Esto reduce la pausa preshock a menos de 5 segundos y mejora la probabilidad de éxito de la desfibrilación.',
          },
        ],
      },
      {
        titulo: 'Ritmos no desfibrilables: AESP y asistolia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La actividad eléctrica sin pulso (AESP) es la presencia de actividad eléctrica organizada en el monitor sin pulso palpable. La asistolia es la ausencia total de actividad eléctrica. Ninguno responde a la desfibrilación; el tratamiento es RCP de alta calidad, adrenalina temprana y la búsqueda agresiva de la causa.',
          },
          {
            tipo: 'pasos',
            titulo: 'Algoritmo del ritmo no desfibrilable',
            items: [
              'Continuar RCP de alta calidad sin interrupciones.',
              'Administrar adrenalina 1 mg lo antes posible y repetir cada 3 a 5 minutos.',
              'Obtener vía aérea avanzada y capnografía.',
              'Analizar el ritmo cada 2 minutos; si aparece ritmo desfibrilable, pasar al algoritmo correspondiente.',
              'Identificar y tratar las causas reversibles (H y T): este es el determinante principal del resultado.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Confirmar la asistolia',
            texto:
              'Antes de etiquetar asistolia verifica el protocolo de la línea plana: comprueba conexiones de electrodos, aumenta la ganancia y confirma en una segunda derivación. Una FV fina puede simular asistolia, y el tratamiento de una y otra es opuesto.',
          },
        ],
      },
      {
        titulo: 'Causas reversibles: las H y las T',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Las cinco H y las cinco T',
            headers: ['Las H', 'Las T'],
            filas: [
              ['Hipovolemia', 'Neumotórax a Tensión'],
              ['Hipoxia', 'Taponamiento cardíaco'],
              ['Hidrogeniones (acidosis)', 'Toxinas (fármacos)'],
              ['Hipo/Hiperpotasemia', 'Trombosis pulmonar (TEP)'],
              ['Hipotermia', 'Trombosis coronaria (IAM)'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Intervenciones dirigidas',
            items: [
              'Hipovolemia: cargas de cristaloide; control de hemorragia y sangre si está disponible.',
              'Hipoxia: oxigenación y ventilación efectivas, confirmar vía aérea.',
              'Hiperpotasemia: gluconato de calcio, bicarbonato e insulina con glucosa.',
              'Neumotórax a tensión: descompresión con aguja seguida de toracostomía.',
              'Taponamiento: pericardiocentesis o toracotomía segun el entorno.',
              'Toxinas: antídotos especificos (bicarbonato en tricíclicos, lípidos en anestésicos locales).',
              'Trombosis pulmonar masiva: considerar fibrinolisis durante la RCP.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'El ultrasonido a pie de cama',
            texto:
              'En manos entrenadas, la ecografía durante las pausas de análisis del ritmo ayuda a distinguir causas reversibles: taponamiento, neumotórax, hipovolemia, dilatación del ventrículo derecho por TEP, y diferencia la AESP verdadera de la pseudo-AESP con contractilidad residual.',
          },
        ],
      },
      {
        titulo: 'RCE y cuidados posparo',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El retorno de la circulación espontánea es el inicio, no el final, del tratamiento. El síndrome posparo combina lesión cerebral, disfunción miocárdica y respuesta inflamatoria sistémica. El cuidado posparo busca optimizar la perfusión y proteger el cerebro.',
          },
          {
            tipo: 'lista',
            titulo: 'Metas inmediatas tras el RCE',
            items: [
              'Oxigenación con SpO2 entre 92 y 98 por ciento; evitar la hiperoxia.',
              'Ventilación para normocapnia (ETCO2 35 a 45 mmHg); evitar la hiperventilación.',
              'Presión arterial sistólica mayor a 90 mmHg o PAM mayor a 65 mmHg con líquidos y vasopresores.',
              'ECG de 12 derivaciones para detectar IAMCEST y activar reperfusión.',
              'Manejo dirigido de la temperatura (control entre 32 y 36 grados) en el paciente comatoso.',
              'Tratar la causa desencadenante y trasladar a centro con capacidad de hemodinamia.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'La hiperoxia daña',
            texto:
              'Tras el RCE, las fracciones de oxígeno excesivas aumentan el estrés oxidativo y empeoran la lesión por reperfusión cerebral. Titule el oxígeno a la pulsioximetría en lugar de mantener el 100 por ciento de forma indefinida.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'FV/TVSP', definicion: 'Ritmos desfibrilables; el tratamiento prioritario es la descarga eléctrica temprana.' },
      { termino: 'AESP', definicion: 'Actividad eléctrica organizada sin pulso; se trata con RCP, adrenalina y corrección de causas.' },
      { termino: 'Fracción de compresión', definicion: 'Porcentaje del tiempo de paro dedicado a compresiones; meta mayor al 60 por ciento.' },
      { termino: 'Adrenalina en paro', definicion: '1 mg IV/IO cada 3 a 5 minutos en cualquier ritmo de paro.' },
      { termino: 'Amiodarona', definicion: 'Antiarrítmico para FV/TVSP refractaria: 300 mg y luego 150 mg.' },
      { termino: 'H y T', definicion: 'Mnemotecnia de las causas reversibles del paro cardíaco.' },
      { termino: 'RCE', definicion: 'Retorno de la circulación espontánea; inicia los cuidados posparo.' },
    ],
    flashcards: [
      { frente: '¿Cuáles son los ritmos desfibrilables?', reverso: 'Fibrilación ventricular (FV) y taquicardia ventricular sin pulso (TVSP).' },
      { frente: 'Dosis de adrenalina en el paro', reverso: '1 mg IV/IO cada 3 a 5 minutos.' },
      { frente: 'Dosis de amiodarona en FV/TVSP refractaria', reverso: '300 mg en bolo, luego 150 mg si persiste.' },
      { frente: '¿Cuándo se administra el primer antiarrítmico?', reverso: 'Tras la tercera descarga (FV/TVSP persistente).' },
      { frente: 'Valor de ETCO2 que sugiere RCE', reverso: 'Ascenso brusco y sostenido por arriba de 35 a 40 mmHg.' },
      { frente: 'ETCO2 menor a 10 mmHg durante RCP indica', reverso: 'Compresiones de mala calidad o muy bajo gasto cardíaco.' },
      { frente: 'Enumera las cinco H', reverso: 'Hipovolemia, hipoxia, hidrogeniones, hipo/hiperpotasemia, hipotermia.' },
      { frente: 'Enumera las cinco T', reverso: 'Neumotórax a tensión, taponamiento, toxinas, trombosis pulmonar, trombosis coronaria.' },
      { frente: 'Meta de SpO2 tras el RCE', reverso: '92 a 98 por ciento; evitar la hiperoxia.' },
    ],
    quiz: [
      {
        pregunta: 'Durante una RCP, el monitor muestra una línea plana. ¿Qué debe hacer antes de declarar asistolia?',
        opciones: ['Desfibrilar de inmediato', 'Verificar electrodos, aumentar la ganancia y confirmar en otra derivación', 'Administrar amiodarona', 'Suspender la reanimación'],
        correcta: 1,
        explicacion: 'Una FV fina puede simular una línea plana. Confirmar el protocolo de asistolia evita no desfibrilar a un ritmo realmente desfibrilable.',
      },
      {
        pregunta: 'En FV refractaria, el primer antiarrítmico y su dosis correcta son:',
        opciones: ['Adrenalina 1 mg', 'Amiodarona 300 mg en bolo', 'Atropina 1 mg', 'Lidocaína 0.5 mg/kg'],
        correcta: 1,
        explicacion: 'Tras la tercera descarga se administra amiodarona 300 mg; la alternativa es lidocaína 1 a 1.5 mg/kg. La adrenalina no es un antiarrítmico.',
      },
      {
        pregunta: 'Un paciente en AESP tiene venas yugulares distendidas y ruidos respiratorios ausentes de un lado. La causa reversible más probable es:',
        opciones: ['Hipovolemia', 'Neumotórax a tensión', 'Hiperpotasemia', 'Hipotermia'],
        correcta: 1,
        explicacion: 'La distensión yugular con hipoventilación unilateral apunta a neumotórax a tensión, que requiere descompresión inmediata con aguja.',
      },
      {
        pregunta: 'Durante la RCP, el ETCO2 sube súbitamente de 12 a 40 mmHg. Esto sugiere:',
        opciones: ['Falla del capnógrafo', 'Retorno de la circulación espontánea', 'Hiperventilación', 'Desconexión del tubo'],
        correcta: 1,
        explicacion: 'Un ascenso brusco y sostenido del ETCO2 refleja la recuperación del gasto cardíaco y suele preceder al pulso palpable.',
      },
      {
        pregunta: 'La intervención que más impacta la supervivencia en FV es:',
        opciones: ['La adrenalina temprana', 'La intubación inmediata', 'La desfibrilación temprana con compresiones de calidad', 'La amiodarona'],
        correcta: 2,
        explicacion: 'Cada minuto de retraso en la desfibrilación reduce la supervivencia 7 a 10 por ciento; las compresiones de calidad mantienen perfusión entre descargas.',
      },
      {
        pregunta: 'Tras el RCE, ¿cuál es el manejo correcto del oxígeno?',
        opciones: ['Mantener FiO2 100 por ciento siempre', 'Titular a SpO2 92 a 98 por ciento para evitar hiperoxia', 'Suspender el oxígeno', 'Hiperventilar para bajar el CO2'],
        correcta: 1,
        explicacion: 'La hiperoxia incrementa el daño por reperfusión; el oxígeno se titula a la pulsioximetría y se mantiene normocapnia.',
      },
      {
        pregunta: 'En un paro no desfibrilable, ¿cuándo se administra la adrenalina?',
        opciones: ['Solo tras la primera descarga', 'Lo antes posible y se repite cada 3 a 5 minutos', 'Únicamente si hay RCE', 'Después de la amiodarona'],
        correcta: 1,
        explicacion: 'En AESP y asistolia la adrenalina temprana se asocia a mejores resultados; se repite cada 3 a 5 minutos durante la RCP.',
      },
    ],
  },
  {
    id: 'arritmias-manejo',
    numero: '4.5',
    titulo: 'Arritmias: Reconocimiento y Manejo',
    icono: '📉',
    duracion: '60 min',
    resumen:
      'El reconocimiento del ritmo y el estado de perfusión determina el manejo: marcapasos y atropina en bradicardias, cardioversión y antiarrítmicos en taquicardias.',
    objetivos: [
      'Definir paciente inestable y aplicar el algoritmo de bradicardia y taquicardia.',
      'Diferenciar taquicardias de complejo estrecho de las de complejo ancho.',
      'Manejar la fibrilación auricular con respuesta ventricular rápida.',
      'Aplicar correctamente la cardioversión sincronizada y la desfibrilación.',
      'Reconocer los bloqueos auriculoventriculares y su manejo.',
    ],
    secciones: [
      {
        titulo: 'Estabilidad e inestabilidad',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El primer paso ante cualquier arritmia no es nombrar el ritmo sino determinar si el paciente está estable o inestable. La inestabilidad indica que la arritmia compromete la perfusión y obliga a un tratamiento eléctrico inmediato.',
          },
          {
            tipo: 'lista',
            titulo: 'Signos de inestabilidad (las cuatro)',
            items: [
              'Hipotensión o signos de shock (piel fría, livideces, alteración del estado mental).',
              'Dolor torácico isquémico de tipo anginoso.',
              'Insuficiencia cardíaca aguda o edema pulmonar.',
              'Alteración aguda del estado de conciencia por bajo gasto.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'El ritmo no manda; el paciente manda',
            texto:
              'Una taquicardia a 150 latidos por minuto en un paciente despierto y normotenso se trata distinto que la misma frecuencia con shock. Trate al paciente que tiene la arritmia, no al número del monitor.',
          },
          {
            tipo: 'diagrama',
            clave: 'conduccion',
          },
        ],
      },
      {
        titulo: 'Bradicardias',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La bradicardia se define por una frecuencia menor a 50 latidos por minuto. Solo requiere tratamiento si es sintomática por bajo gasto. Las causas incluyen disfunción del nodo sinusal, bloqueos auriculoventriculares, isquemia, hiperpotasemia, hipotermia y fármacos como betabloqueadores y calcioantagonistas.',
          },
          {
            tipo: 'pasos',
            titulo: 'Algoritmo de la bradicardia sintomática',
            items: [
              'Asegurar vía aérea, oxígeno si hay hipoxemia y monitorización con acceso IV.',
              'Atropina 1 mg IV en bolo; repetir cada 3 a 5 minutos hasta un máximo de 3 mg.',
              'Si la atropina falla: marcapasos transcutáneo o infusión de adrenalina (2 a 10 mcg/min) o dopamina (5 a 20 mcg/kg/min).',
              'Tratar la causa subyacente (hiperpotasemia, intoxicación, isquemia).',
              'Preparar marcapasos transvenoso o traslado a hemodinamia segun el caso.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Atropina y bloqueo de alto grado',
            texto:
              'En el bloqueo AV de segundo grado Mobitz II y en el bloqueo completo, la atropina suele ser ineficaz porque el problema está por debajo del nodo AV; no demore el marcapasos transcutáneo esperando una respuesta a la atropina.',
          },
          {
            tipo: 'tabla',
            titulo: 'Bloqueos auriculoventriculares',
            headers: ['Tipo', 'Hallazgo en ECG'],
            filas: [
              ['Primer grado', 'PR prolongado constante mayor a 0.20 s.'],
              ['Segundo grado Mobitz I', 'PR se alarga progresivamente hasta una P bloqueada (Wenckebach).'],
              ['Segundo grado Mobitz II', 'P bloqueadas súbitas con PR constante; riesgo de progresión.'],
              ['Tercer grado (completo)', 'Disociación AV total entre P y QRS.'],
            ],
          },
        ],
      },
      {
        titulo: 'Taquicardias de complejo estrecho',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El complejo estrecho (QRS menor a 0.12 s) indica origen supraventricular. Incluye la taquicardia sinusal, la taquicardia supraventricular paroxística (TSVP) por reentrada y la fibrilación o flutter auricular. El ritmo regular o irregular orienta el diagnóstico.',
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo de la TSVP estable y regular',
            items: [
              'Maniobras vagales (Valsalva modificada con elevación de piernas).',
              'Adenosina 6 mg IV en bolo rápido seguido de descarga de solución salina.',
              'Si no revierte, adenosina 12 mg IV; puede repetirse una vez.',
              'Si persiste, considerar betabloqueador o calcioantagonista (diltiazem o verapamilo).',
              'Si en cualquier momento hay inestabilidad: cardioversión sincronizada.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Adenosina: aviso al paciente',
            texto:
              'La adenosina tiene vida media de pocos segundos y produce una breve pausa asistólica con sensación de muerte inminente y rubor. Adviértalo, adminístrela por la vía más proximal posible y con bolo rápido seguido de salina.',
          },
        ],
      },
      {
        titulo: 'Taquicardias de complejo ancho y fibrilación auricular',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La taquicardia de complejo ancho (QRS mayor o igual a 0.12 s) debe tratarse como taquicardia ventricular hasta demostrar lo contrario, sobre todo en pacientes con cardiopatía estructural. Confundirla con una supraventricular con aberrancia y administrar el fármaco equivocado puede ser fatal.',
          },
          {
            tipo: 'pasos',
            titulo: 'TV monomórfica estable',
            items: [
              'Amiodarona 150 mg IV en 10 minutos; puede repetirse.',
              'Alternativas: procainamida o sotalol segun disponibilidad.',
              'Si hay inestabilidad: cardioversión sincronizada inmediata.',
              'Si es polimórfica (torsades): sulfato de magnesio 1 a 2 g IV y corregir QT/electrolitos.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Fibrilación auricular con respuesta rápida',
            items: [
              'Ritmo irregularmente irregular sin ondas P definidas.',
              'Estable: control de frecuencia con diltiazem o betabloqueador.',
              'Inestable: cardioversión sincronizada.',
              'Precaución con la cardioversión si la FA dura más de 48 horas por riesgo de embolia.',
              'El WPW con FA contraindica los bloqueadores del nodo AV; usar cardioversión o procainamida.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Energía de cardioversión sincronizada (bifásico)',
            headers: ['Arritmia', 'Energía inicial'],
            filas: [
              ['TSVP / Flutter auricular', '50 a 100 J'],
              ['Fibrilación auricular', '120 a 200 J'],
              ['TV monomórfica con pulso', '100 J'],
              ['TV polimórfica inestable', 'Tratar como FV: desfibrilación no sincronizada'],
            ],
          },
        ],
      },
      {
        titulo: 'Cardioversión versus desfibrilación',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La cardioversión sincronizada entrega la descarga sobre la onda R para evitar el período vulnerable del ciclo cardíaco; se usa en taquiarritmias con pulso e inestables. La desfibrilación es no sincronizada y se reserva para FV, TVSP y TV polimórfica.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No sincronizar en torsades',
            texto:
              'En la TV polimórfica el equipo no puede identificar de forma fiable la onda R; intentar sincronizar puede impedir la descarga. En la polimórfica inestable se desfibrila como en FV.',
          },
          {
            tipo: 'lista',
            titulo: 'Antes de cardiovertir al paciente consciente',
            items: [
              'Sedoanalgesia si el tiempo lo permite.',
              'Confirmar el modo sincronizado en cada descarga (algunos equipos lo desactivan tras disparar).',
              'Tener listo el carro de paro y el plan de desfibrilación si degenera en FV.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Paciente inestable', definicion: 'Hipotensión, dolor isquémico, insuficiencia cardíaca o alteración de conciencia por la arritmia.' },
      { termino: 'Atropina', definicion: 'Primer fármaco de la bradicardia sintomática: 1 mg cada 3 a 5 min, máximo 3 mg.' },
      { termino: 'Adenosina', definicion: 'Fármaco de la TSVP regular: 6 mg y luego 12 mg en bolo rápido.' },
      { termino: 'Complejo ancho', definicion: 'QRS mayor o igual a 0.12 s; se asume TV hasta probar lo contrario.' },
      { termino: 'Cardioversión sincronizada', definicion: 'Descarga sobre la onda R para taquiarritmias inestables con pulso.' },
      { termino: 'Mobitz II', definicion: 'Bloqueo infranodal con riesgo de progreso; la atropina suele fallar, requiere marcapasos.' },
      { termino: 'Torsades de pointes', definicion: 'TV polimórfica con QT largo; se trata con magnesio.' },
    ],
    flashcards: [
      { frente: 'Dosis de atropina en bradicardia sintomática', reverso: '1 mg IV cada 3 a 5 min, máximo 3 mg.' },
      { frente: 'Primer fármaco en la TSVP regular estable', reverso: 'Adenosina 6 mg en bolo rápido, luego 12 mg si no revierte.' },
      { frente: '¿Por qué la atropina falla en el Mobitz II?', reverso: 'Porque el bloqueo es infranodal; la solución es el marcapasos.' },
      { frente: 'Tratamiento de la torsades de pointes', reverso: 'Sulfato de magnesio 1 a 2 g IV y corregir QT/electrolitos.' },
      { frente: 'Energía de cardioversión en fibrilación auricular', reverso: '120 a 200 J bifásico.' },
      { frente: 'Hallazgo en ECG de la fibrilación auricular', reverso: 'Ritmo irregularmente irregular sin ondas P.' },
      { frente: 'Diferencia entre cardioversión y desfibrilación', reverso: 'La cardioversión es sincronizada sobre la R; la desfibrilación es no sincronizada.' },
      { frente: '¿Qué fármacos se evitan en FA con WPW?', reverso: 'Los bloqueadores del nodo AV; se usa cardioversión o procainamida.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con FC de 38 lpm está confuso e hipotenso. La atropina no responde. El siguiente paso es:',
        opciones: ['Repetir atropina hasta 10 mg', 'Marcapasos transcutáneo o infusión de adrenalina/dopamina', 'Adenosina', 'Cardioversión sincronizada'],
        correcta: 1,
        explicacion: 'En bradicardia inestable refractaria a atropina (máximo 3 mg) se usa marcapasos transcutáneo o cronotrópicos en infusión.',
      },
      {
        pregunta: 'Una taquicardia regular de complejo estrecho a 180 lpm en paciente estable. El manejo inicial es:',
        opciones: ['Cardioversión inmediata', 'Maniobras vagales y luego adenosina', 'Amiodarona 300 mg', 'Atropina'],
        correcta: 1,
        explicacion: 'En la TSVP estable se inicia con maniobras vagales y, si fallan, adenosina 6 mg seguida de 12 mg.',
      },
      {
        pregunta: 'Ante una taquicardia de complejo ancho regular en un paciente con cardiopatía, lo más seguro es asumir:',
        opciones: ['TSVP con aberrancia', 'Taquicardia ventricular', 'Fibrilación auricular', 'Taquicardia sinusal'],
        correcta: 1,
        explicacion: 'Toda taquicardia de complejo ancho se trata como TV hasta demostrar lo contrario, sobre todo con cardiopatía estructural.',
      },
      {
        pregunta: 'En una TV polimórfica inestable (torsades), la descarga eléctrica debe ser:',
        opciones: ['Cardioversión sincronizada a 50 J', 'Desfibrilación no sincronizada', 'Cardioversión sincronizada a 200 J', 'No requiere descarga'],
        correcta: 1,
        explicacion: 'En la polimórfica el equipo no identifica la R de forma fiable; se desfibrila como en FV.',
      },
      {
        pregunta: 'Una FA con respuesta rápida en paciente hipotenso y con dolor torácico se maneja con:',
        opciones: ['Diltiazem IV', 'Cardioversión sincronizada', 'Adenosina', 'Observación'],
        correcta: 1,
        explicacion: 'La inestabilidad obliga a cardioversión sincronizada (120 a 200 J), no a control farmacológico de la frecuencia.',
      },
      {
        pregunta: 'En un paciente con WPW y fibrilación auricular, ¿qué fármaco está contraindicado?',
        opciones: ['Procainamida', 'Diltiazem', 'Magnesio', 'Adrenalina'],
        correcta: 1,
        explicacion: 'Los bloqueadores del nodo AV como el diltiazem pueden favorecer la conducción por la vía accesoria y precipitar FV; se prefiere procainamida o cardioversión.',
      },
      {
        pregunta: 'El bloqueo AV de segundo grado con alargamiento progresivo del PR hasta una P bloqueada se llama:',
        opciones: ['Mobitz II', 'Mobitz I (Wenckebach)', 'Bloqueo completo', 'Bloqueo de primer grado'],
        correcta: 1,
        explicacion: 'El Mobitz I muestra alargamiento progresivo del PR hasta que una P no conduce; suele ser nodal y benigno.',
      },
    ],
  },
  {
    id: 'sica-profundo',
    numero: '4.6',
    titulo: 'Síndromes Coronarios Agudos a Profundidad',
    icono: '💔',
    duracion: '60 min',
    resumen:
      'La rotura de placa desencadena el espectro de los síndromes coronarios agudos; distinguir IAMCEST de SICASEST define la estrategia de reperfusión.',
    objetivos: [
      'Explicar la fisiopatología de la placa vulnerable y la trombosis coronaria.',
      'Diferenciar IAMCEST, IAMSEST y angina inestable por clínica, ECG y biomarcadores.',
      'Localizar el infarto por las derivaciones afectadas y la arteria responsable.',
      'Aplicar el tratamiento inicial y las estrategias de reperfusión.',
      'Reconocer los infartos de alto riesgo: ventrículo derecho y posterior.',
    ],
    secciones: [
      {
        titulo: 'Fisiopatología de la placa',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La aterosclerosis es un proceso inflamatorio crónico. La placa vulnerable no es necesariamente la más estenótica, sino la que tiene un núcleo lipídico grande y una cápsula fibrosa delgada. Su rotura expone material trombogénico que activa plaquetas y la cascada de coagulación, formando un trombo que reduce o interrumpe el flujo.',
          },
          {
            tipo: 'lista',
            titulo: 'Del flujo reducido al infarto',
            items: [
              'Trombo no oclusivo: limita el flujo y causa isquemia subendocárdica (SICASEST).',
              'Trombo oclusivo total y persistente: isquemia transmural (IAMCEST).',
              'La isquemia prolongada provoca necrosis que avanza del subendocardio al epicardio.',
              'El tiempo es músculo: cada minuto de oclusión aumenta el área de necrosis.',
            ],
          },
          {
            tipo: 'diagrama',
            clave: 'corazon',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Tiempo es músculo',
            texto:
              'El miocardio irrigado por una arteria ocluida muere de forma progresiva. La meta de reperfusión en el IAMCEST es restaurar el flujo lo antes posible para salvar miocardio viable y reducir mortalidad y disfunción ventricular.',
          },
        ],
      },
      {
        titulo: 'El espectro de los síndromes coronarios agudos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Diferenciación del SICA',
            headers: ['Entidad', 'ECG', 'Troponina'],
            filas: [
              ['Angina inestable', 'Normal o descenso transitorio del ST/T', 'Negativa'],
              ['IAMSEST', 'Descenso del ST o inversión de T, sin elevación', 'Positiva'],
              ['IAMCEST', 'Elevación del ST en derivaciones contiguas o BRI nuevo', 'Positiva'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Criterios de elevación significativa del ST',
            items: [
              'Mayor o igual a 1 mm en dos derivaciones contiguas de los miembros.',
              'Mayor o igual a 2 mm en hombres (1.5 mm en mujeres) en V2 y V3.',
              'Bloqueo de rama izquierda nuevo o presumiblemente nuevo con clínica sugerente.',
              'Considerar derivaciones derechas (V4R) y posteriores (V7 a V9).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Equivalentes de IAMCEST',
            texto:
              'No todo infarto agudo y peligroso eleva el ST de forma obvia. El patrón de Wellens, el de De Winter y el descenso difuso del ST con elevación en aVR (oclusión de tronco o enfermedad de tres vasos) son señales de alarma que exigen valoración urgente.',
          },
        ],
      },
      {
        titulo: 'Localización del infarto',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cara, derivaciones y arteria responsable',
            headers: ['Cara', 'Derivaciones / Arteria'],
            filas: [
              ['Septal', 'V1 a V2 / Descendente anterior'],
              ['Anterior', 'V3 a V4 / Descendente anterior'],
              ['Lateral', 'I, aVL, V5 a V6 / Circunfleja'],
              ['Inferior', 'II, III, aVF / Coronaria derecha'],
              ['Ventrículo derecho', 'V4R / Coronaria derecha proximal'],
              ['Posterior', 'V7 a V9; espejo en V1 a V3 / Circunfleja o CD'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Infarto inferior: busca el ventrículo derecho',
            texto:
              'Hasta un tercio de los infartos inferiores comprometen el ventrículo derecho. Estos pacientes son precarga dependientes: los nitratos y la morfina pueden provocar hipotensión grave. Coloca V4R y, si hay infarto de VD, trata la hipotensión con cargas de líquido.',
          },
        ],
      },
      {
        titulo: 'Tratamiento inicial y reperfusión',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Manejo inicial del SICA',
            items: [
              'ECG de 12 derivaciones en los primeros 10 minutos del contacto.',
              'Aspirina 162 a 325 mg masticada (salvo alergia).',
              'Nitroglicerina sublingual para el dolor isquémico, vigilando la presión.',
              'Oxígeno solo si SpO2 menor a 90 por ciento.',
              'Analgesia con morfina si el dolor persiste pese a nitratos (con cautela en SICASEST).',
              'Segundo antiagregante y anticoagulación segun protocolo y estrategia.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Estrategias de reperfusión en IAMCEST',
            items: [
              'Angioplastia primaria (ICP) preferida si el tiempo puerta-balón es menor a 90 minutos.',
              'Si la ICP no es accesible a tiempo, fibrinolisis dentro de los primeros 30 minutos de contacto (idealmente antes de 12 h de evolución).',
              'Trasladar siempre a centro con hemodinamia; preavisar para activar el laboratorio.',
              'La fibrinolisis no aplica en el IAMSEST.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Cuidado con la nitroglicerina',
            texto:
              'Evita los nitratos en infarto de ventrículo derecho, hipotensión, y en quienes hayan usado inhibidores de la fosfodiesterasa (sildenafil) en las últimas 24 a 48 horas por riesgo de hipotensión profunda.',
          },
        ],
      },
      {
        titulo: 'Complicaciones agudas',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Complicaciones que matan temprano',
            items: [
              'Arritmias malignas: FV y TV, principal causa de muerte súbita en las primeras horas.',
              'Insuficiencia cardíaca y edema agudo de pulmón por disfunción del ventrículo izquierdo.',
              'Shock cardiogénico por pérdida extensa de masa contráctil.',
              'Complicaciones mecánicas tardías: rotura de pared, comunicación interventricular, insuficiencia mitral aguda.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Monitorización continua',
            texto:
              'Todo paciente con SICA debe permanecer monitorizado con desfibrilador disponible. La FV primaria en las primeras horas es frecuente y reversible con desfibrilación inmediata.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Placa vulnerable', definicion: 'Placa con núcleo lipídico grande y cápsula fina, propensa a romperse.' },
      { termino: 'IAMCEST', definicion: 'Infarto con elevación del ST por oclusión coronaria total; requiere reperfusión urgente.' },
      { termino: 'SICASEST', definicion: 'Síndrome coronario sin elevación del ST (IAMSEST y angina inestable).' },
      { termino: 'Tiempo puerta-balón', definicion: 'Intervalo hasta la angioplastia; meta menor a 90 minutos.' },
      { termino: 'V4R', definicion: 'Derivación derecha para detectar infarto de ventrículo derecho.' },
      { termino: 'Infarto de VD', definicion: 'Precarga dependiente; los nitratos lo descompensan, se trata con líquidos.' },
      { termino: 'Equivalente de IAMCEST', definicion: 'Patrones como De Winter o aVR elevado que indican oclusión grave sin elevación clásica.' },
    ],
    flashcards: [
      { frente: 'Dosis de aspirina en el SICA', reverso: '162 a 325 mg masticada.' },
      { frente: 'Tiempo máximo para ECG tras el contacto', reverso: '10 minutos.' },
      { frente: 'Arteria del infarto inferior', reverso: 'Coronaria derecha (derivaciones II, III, aVF).' },
      { frente: '¿Qué derivación detecta el infarto de ventrículo derecho?', reverso: 'V4R.' },
      { frente: '¿Por qué evitar nitratos en infarto de VD?', reverso: 'Es precarga dependiente; los nitratos causan hipotensión grave.' },
      { frente: 'Tiempo puerta-balón objetivo en IAMCEST', reverso: 'Menor a 90 minutos.' },
      { frente: '¿La fibrinolisis aplica en IAMSEST?', reverso: 'No; solo en IAMCEST.' },
      { frente: 'Causa principal de muerte súbita en las primeras horas del IAM', reverso: 'Fibrilación ventricular.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con infarto inferior se vuelve hipotenso tras una dosis de nitroglicerina. La explicación más probable es:',
        opciones: ['Reacción alérgica', 'Compromiso del ventrículo derecho (precarga dependiente)', 'Sobredosis de aspirina', 'Taponamiento'],
        correcta: 1,
        explicacion: 'El infarto inferior suele afectar el VD, que es precarga dependiente; los nitratos reducen la precarga y causan hipotensión. Se tratan con líquidos.',
      },
      {
        pregunta: 'El hallazgo que define IAMCEST en V2 y V3 de un hombre es:',
        opciones: ['Elevación mayor o igual a 1 mm', 'Elevación mayor o igual a 2 mm', 'Descenso del ST', 'Inversión de T'],
        correcta: 1,
        explicacion: 'En V2 y V3 el umbral es mayor en hombres (2 mm) y de 1.5 mm en mujeres, por la variabilidad normal del punto J.',
      },
      {
        pregunta: 'La estrategia de reperfusión preferida en IAMCEST cuando es accesible a tiempo es:',
        opciones: ['Fibrinolisis', 'Angioplastia primaria con puerta-balón menor a 90 min', 'Solo aspirina', 'Heparina aislada'],
        correcta: 1,
        explicacion: 'La ICP primaria es superior a la fibrinolisis cuando puede realizarse dentro del tiempo objetivo.',
      },
      {
        pregunta: 'Un descenso difuso del ST con elevación en aVR sugiere:',
        opciones: ['Pericarditis benigna', 'Oclusión de tronco coronario o enfermedad de tres vasos', 'Infarto inferior aislado', 'Variante normal'],
        correcta: 1,
        explicacion: 'Es un equivalente de IAMCEST de alto riesgo que indica isquemia extensa y exige valoración urgente.',
      },
      {
        pregunta: 'En el manejo inicial, el oxígeno suplementario está indicado cuando:',
        opciones: ['Siempre, a alto flujo', 'Solo si la SpO2 es menor a 90 por ciento', 'Nunca', 'Solo si hay dolor'],
        correcta: 1,
        explicacion: 'La hiperoxia en el SICA no aporta beneficio y puede ser perjudicial; se reserva para hipoxemia con SpO2 menor a 90 por ciento.',
      },
      {
        pregunta: 'La diferencia clave entre angina inestable e IAMSEST es:',
        opciones: ['La elevación del ST', 'La elevación de troponinas', 'La localización del dolor', 'La edad del paciente'],
        correcta: 1,
        explicacion: 'Ambas carecen de elevación del ST; el IAMSEST presenta troponinas positivas (hay necrosis) y la angina inestable no.',
      },
      {
        pregunta: 'La placa con mayor riesgo de causar un evento agudo es la que tiene:',
        opciones: ['Mayor calcificación', 'Núcleo lipídico grande y cápsula fibrosa delgada', 'Menor contenido lipídico', 'La estenosis más severa'],
        correcta: 1,
        explicacion: 'La placa vulnerable, con cápsula fina y gran núcleo lipídico, es más propensa a romperse aunque no sea la más estenótica.',
      },
    ],
  },
  {
    id: 'shock-avanzado',
    numero: '4.7',
    titulo: 'Shock: Clasificación y Manejo Avanzado',
    icono: '🩸',
    duracion: '60 min',
    resumen:
      'El shock es la incapacidad de la perfusión para satisfacer las demandas metabólicas; identificar su tipo guía el uso de líquidos, vasopresores e inotrópicos.',
    objetivos: [
      'Definir el shock como hipoperfusión y reconocer su fisiopatología celular.',
      'Clasificar los cuatro tipos de shock y sus perfiles hemodinámicos.',
      'Seleccionar el vasopresor o inotrópico apropiado segun el tipo de shock.',
      'Establecer metas de reanimación y monitorización de la perfusión.',
      'Reconocer las trampas del shock obstructivo y distributivo.',
    ],
    secciones: [
      {
        titulo: 'Fisiopatología del shock',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El shock es un estado de hipoperfusión tisular que lleva a hipoxia celular y disfunción orgánica. A nivel celular, la falta de oxígeno fuerza el metabolismo anaerobio, genera ácido láctico y, si persiste, conduce a la muerte celular. La presión arterial puede ser normal en fases tempranas gracias a los mecanismos compensadores.',
          },
          {
            tipo: 'formula',
            texto: 'PAM = Gasto Cardíaco x Resistencia Vascular Sistémica',
            nota: 'El gasto cardíaco depende de frecuencia, precarga, contractilidad y poscarga. Cada tipo de shock altera uno o varios de estos componentes.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'El lactato como marcador',
            texto:
              'El lactato elevado refleja el metabolismo anaerobio por hipoperfusión. Su tendencia descendente (aclaramiento) es uno de los mejores indicadores de que la reanimación funciona, mejor que un solo valor de presión.',
          },
          {
            tipo: 'diagrama',
            clave: 'shock',
          },
        ],
      },
      {
        titulo: 'Los cuatro tipos de shock',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Perfiles hemodinámicos',
            headers: ['Tipo', 'Mecanismo y perfil'],
            filas: [
              ['Hipovolémico', 'Pérdida de volumen; precarga baja, RVS alta, piel fría.'],
              ['Cardiogénico', 'Falla de bomba; gasto bajo, congestión, RVS alta, piel fría.'],
              ['Obstructivo', 'Obstrucción al llenado o eyección; precarga bloqueada.'],
              ['Distributivo', 'Vasodilatación; RVS baja, gasto a menudo alto, piel caliente al inicio.'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Subtipos frecuentes',
            items: [
              'Hipovolémico: hemorrágico (trauma, sangrado digestivo) y no hemorrágico (deshidratación, quemaduras).',
              'Cardiogénico: IAM extenso, arritmias, miocardiopatía, valvulopatía aguda.',
              'Obstructivo: neumotórax a tensión, taponamiento cardíaco, embolia pulmonar masiva.',
              'Distributivo: séptico, anafiláctico y neurogénico.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Caliente o frío',
            texto:
              'El shock distributivo temprano cursa con piel caliente y rosada por vasodilatación, a diferencia de los otros tipos con piel fría y moteada. Esta diferencia clínica orienta rápido el diagnóstico a pie de cama.',
          },
        ],
      },
      {
        titulo: 'Manejo del shock distributivo',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El shock séptico es el prototipo del distributivo. El tratamiento combina control del foco, antibióticos tempranos, reanimación con líquidos y vasopresores cuando la presión no responde al volumen. El shock anafiláctico y el neurogénico tienen particularidades propias.',
          },
          {
            tipo: 'pasos',
            titulo: 'Reanimación del shock séptico',
            items: [
              'Cargas de cristaloide (30 ml/kg) valorando la respuesta y evitando la sobrecarga.',
              'Antibióticos de amplio espectro lo antes posible y toma de cultivos.',
              'Noradrenalina como vasopresor de primera línea si persiste la hipotensión.',
              'Meta de PAM mayor o igual a 65 mmHg y vigilancia del lactato.',
              'Considerar vasopresina o adrenalina como segunda línea.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Anafilaxia y shock neurogénico',
            items: [
              'Anafilaxia: adrenalina IM 0.3 a 0.5 mg en cara anterolateral del muslo, repetible cada 5 a 15 min.',
              'Anafilaxia: líquidos, antihistamínicos y broncodilatadores como adyuvantes.',
              'Neurogénico: pérdida del tono simpático por lesión medular alta; bradicardia con hipotensión.',
              'Neurogénico: líquidos, vasopresores y atropina para la bradicardia.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Adrenalina en anafilaxia es IM, no IV en bolo',
            texto:
              'La vía de elección en la anafilaxia es la intramuscular en el muslo. El bolo IV de adrenalina no diluido se reserva para el paro y puede causar arritmias graves si se usa mal en el paciente con pulso.',
          },
        ],
      },
      {
        titulo: 'Vasopresores e inotrópicos',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Agentes vasoactivos',
            headers: ['Fármaco', 'Acción y uso'],
            filas: [
              ['Noradrenalina', 'Alfa potente, beta leve; vasopresor de primera línea en séptico.'],
              ['Adrenalina', 'Alfa y beta; anafilaxia, séptico refractario, bradicardia.'],
              ['Dopamina', 'Dosis dependiente; segunda línea, más arritmogénica.'],
              ['Dobutamina', 'Inotrópico beta; mejora contractilidad en cardiogénico.'],
              ['Vasopresina', 'Vasoconstrictor no adrenérgico; adyuvante en séptico.'],
              ['Fenilefrina', 'Alfa puro; útil cuando se quiere evitar taquicardia.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Vasopresor versus inotrópico',
            texto:
              'Un vasopresor aumenta la resistencia vascular (la presión) y un inotrópico aumenta la contractilidad (el gasto). El shock distributivo necesita vasopresores; el cardiogénico con presión limítrofe puede requerir un inotrópico como la dobutamina, a veces combinado.',
          },
          {
            tipo: 'lista',
            titulo: 'Reglas de seguridad',
            items: [
              'Los vasopresores idealmente por vía central; por vía periférica solo de forma transitoria y vigilada.',
              'Optimizar la precarga con líquidos antes de iniciar vasopresores en el hipovolémico.',
              'En el cardiogénico, las cargas agresivas de líquido empeoran la congestión.',
              'Titular siempre a metas de perfusión, no solo a un número de presión.',
            ],
          },
        ],
      },
      {
        titulo: 'Metas y monitorización',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Indicadores de perfusión',
            items: [
              'PAM mayor o igual a 65 mmHg en la mayoría de los adultos.',
              'Diuresis mayor a 0.5 ml/kg/h.',
              'Llenado capilar, temperatura distal y estado mental.',
              'Aclaramiento de lactato como guía dinámica.',
              'Saturación venosa central como medida avanzada del balance aporte-demanda.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No persigas un número aislado',
            texto:
              'Una PAM aceptable con piel fría, oliguria y lactato en ascenso indica que la perfusión sigue siendo inadecuada. La reanimación se guía por la perfusión global, no por un solo signo vital.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Shock', definicion: 'Hipoperfusión tisular con hipoxia celular y disfunción orgánica.' },
      { termino: 'Shock distributivo', definicion: 'Vasodilatación con RVS baja; incluye séptico, anafiláctico y neurogénico.' },
      { termino: 'Shock obstructivo', definicion: 'Obstrucción mecánica al flujo: tensión, taponamiento, TEP masivo.' },
      { termino: 'Noradrenalina', definicion: 'Vasopresor de primera línea en el shock séptico.' },
      { termino: 'Dobutamina', definicion: 'Inotrópico que mejora la contractilidad en el shock cardiogénico.' },
      { termino: 'Aclaramiento de lactato', definicion: 'Descenso del lactato; marcador dinámico de reanimación eficaz.' },
      { termino: 'PAM objetivo', definicion: 'Mayor o igual a 65 mmHg como meta inicial de perfusión.' },
    ],
    flashcards: [
      { frente: 'Vasopresor de primera línea en shock séptico', reverso: 'Noradrenalina.' },
      { frente: 'Meta de PAM en la reanimación del shock', reverso: 'Mayor o igual a 65 mmHg.' },
      { frente: 'Vía y dosis de adrenalina en anafilaxia', reverso: 'IM en el muslo, 0.3 a 0.5 mg, repetible cada 5 a 15 min.' },
      { frente: 'Diferencia entre vasopresor e inotrópico', reverso: 'El vasopresor sube la resistencia; el inotrópico sube la contractilidad.' },
      { frente: '¿Por qué el shock distributivo cursa con piel caliente?', reverso: 'Por la vasodilatación periférica que reduce la RVS.' },
      { frente: 'Inotrópico de elección en shock cardiogénico', reverso: 'Dobutamina.' },
      { frente: 'Tipos de shock obstructivo', reverso: 'Neumotórax a tensión, taponamiento cardíaco y TEP masivo.' },
      { frente: 'Marcador dinámico de reanimación eficaz', reverso: 'El aclaramiento (descenso) del lactato.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente febril, hipotenso, con piel caliente y rosada tiene un shock más probablemente:',
        opciones: ['Hipovolémico', 'Distributivo (séptico)', 'Cardiogénico', 'Obstructivo'],
        correcta: 1,
        explicacion: 'La piel caliente por vasodilatación con RVS baja y fiebre orienta a shock distributivo de tipo séptico.',
      },
      {
        pregunta: 'En el shock cardiogénico con congestión pulmonar, la administración agresiva de líquidos:',
        opciones: ['Es el tratamiento de elección', 'Empeora la congestión y el edema pulmonar', 'No tiene efecto', 'Aumenta la contractilidad'],
        correcta: 1,
        explicacion: 'El corazón ya está sobrecargado; más líquido empeora la congestión. Se prefieren inotrópicos como la dobutamina.',
      },
      {
        pregunta: 'La vía correcta de la adrenalina en la anafilaxia con pulso es:',
        opciones: ['IV en bolo no diluido', 'Intramuscular en el muslo', 'Subcutánea', 'Inhalada'],
        correcta: 1,
        explicacion: 'La adrenalina IM en el muslo es la vía de elección; el bolo IV no diluido se reserva para el paro por su riesgo arritmogénico.',
      },
      {
        pregunta: 'El vasopresor de primera línea en el shock séptico es:',
        opciones: ['Dopamina', 'Noradrenalina', 'Dobutamina', 'Fenilefrina'],
        correcta: 1,
        explicacion: 'La noradrenalina es el vasopresor de primera elección por su eficacia y menor perfil arritmogénico que la dopamina.',
      },
      {
        pregunta: 'Un paciente con lesión medular cervical, hipotenso y bradicárdico, presenta un shock:',
        opciones: ['Hipovolémico', 'Neurogénico', 'Cardiogénico', 'Obstructivo'],
        correcta: 1,
        explicacion: 'La pérdida del tono simpático por lesión medular alta causa vasodilatación con bradicardia: shock neurogénico (distributivo).',
      },
      {
        pregunta: 'El mejor indicador dinámico de que la reanimación del shock funciona es:',
        opciones: ['Una sola medición de PAM normal', 'El aclaramiento progresivo del lactato', 'La frecuencia cardíaca aislada', 'El color de la orina'],
        correcta: 1,
        explicacion: 'La tendencia descendente del lactato refleja mejora de la perfusión global, mejor que un valor aislado de presión.',
      },
      {
        pregunta: 'La diferencia funcional entre un vasopresor y un inotrópico es que el inotrópico:',
        opciones: ['Aumenta la resistencia vascular', 'Aumenta la contractilidad miocárdica', 'Disminuye la frecuencia', 'Solo vasodilata'],
        correcta: 1,
        explicacion: 'El inotrópico mejora la fuerza de contracción (gasto), mientras el vasopresor eleva la resistencia (presión).',
      },
    ],
  },
  {
    id: 'emergencias-respiratorias-criticas',
    numero: '4.8',
    titulo: 'Emergencias Respiratorias Críticas',
    icono: '🫁',
    duracion: '60 min',
    resumen:
      'Asma grave, EPOC exacerbado, edema agudo de pulmón y SDRA exigen reconocer el patrón fisiopatológico para elegir entre broncodilatación, VMNI y ventilación protectora.',
    objetivos: [
      'Manejar el estado asmático y reconocer los signos de claudicación respiratoria.',
      'Tratar la exacerbación del EPOC y aplicar la VMNI con criterios.',
      'Diferenciar el edema agudo de pulmón cardiogénico del SDRA.',
      'Aplicar los principios de la ventilación protectora.',
      'Identificar las indicaciones y contraindicaciones de la VMNI.',
    ],
    secciones: [
      {
        titulo: 'Asma grave y estado asmático',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El asma grave es una obstrucción al flujo aéreo por broncoespasmo, inflamación y tapones de moco. El estado asmático es la crisis que no responde al tratamiento inicial y amenaza la vida. El peligro principal es el atrapamiento aéreo, que conduce a la fatiga muscular y al paro.',
          },
          {
            tipo: 'lista',
            titulo: 'Signos de crisis que amenaza la vida',
            items: [
              'Silencio auscultatorio (torax silente): el flujo es tan bajo que no hay sibilancias.',
              'Incapacidad para hablar, uso de músculos accesorios y posición en trípode.',
              'Alteración del estado mental, agotamiento, bradicardia y cianosis.',
              'Un CO2 normal o en ascenso en una crisis grave es señal de fatiga inminente.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Tratamiento del estado asmático',
            items: [
              'Salbutamol nebulizado continuo, asociado a bromuro de ipratropio.',
              'Corticoesteroides sistémicos tempranos (metilprednisolona o prednisona).',
              'Sulfato de magnesio 1 a 2 g IV en la crisis grave.',
              'Adrenalina IM si hay riesgo vital o broncoespasmo refractario.',
              'Considerar VMNI; la intubación es de alto riesgo y se reserva para el agotamiento.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El asmático intubado: hipoventilación permisiva',
            texto:
              'Al ventilar a un asmático intubado hay que dar tiempo espiratorio largo y frecuencias bajas para evitar el auto-PEEP y el barotrauma. Se tolera cierta hipercapnia (hipercapnia permisiva) para no provocar atrapamiento aéreo y neumotórax.',
          },
          {
            tipo: 'diagrama',
            clave: 'respiratorio',
          },
        ],
      },
      {
        titulo: 'EPOC exacerbado',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La exacerbación del EPOC suele desencadenarse por infección y cursa con aumento de la disnea, la tos y la expectoración. Estos pacientes son retenedores de CO2 crónicos; el objetivo de oxigenación es modesto para no abolir el estímulo respiratorio ni empeorar la hipercapnia.',
          },
          {
            tipo: 'lista',
            titulo: 'Manejo del EPOC exacerbado',
            items: [
              'Oxígeno titulado a SpO2 88 a 92 por ciento.',
              'Broncodilatadores: salbutamol e ipratropio nebulizados.',
              'Corticoesteroides sistémicos y antibióticos si hay datos de infección.',
              'VMNI temprana en la insuficiencia respiratoria hipercápnica.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Oxígeno controlado en el EPOC',
            texto:
              'Evita la hiperoxia en el retenedor crónico: el exceso de oxígeno empeora la hipercapnia por alteración de la relación ventilación-perfusión y el efecto Haldane, no solo por el estímulo hipóxico. La meta es 88 a 92 por ciento.',
          },
        ],
      },
      {
        titulo: 'Edema agudo de pulmón cardiogénico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El edema agudo de pulmón cardiogénico se produce por aumento de la presión hidrostática en el capilar pulmonar, casi siempre por falla del ventrículo izquierdo o crisis hipertensiva. El líquido inunda los alveolos y produce hipoxemia grave de instalación rápida.',
          },
          {
            tipo: 'pasos',
            titulo: 'Tratamiento del edema agudo cardiogénico',
            items: [
              'Posición sentada y oxígeno para corregir la hipoxemia.',
              'VMNI (CPAP o BiPAP) temprana: mejora la oxigenación y reduce la precarga y poscarga.',
              'Nitroglicerina para reducir precarga y poscarga si la presión lo permite.',
              'Diuréticos de asa en el paciente con sobrecarga de volumen.',
              'Tratar el desencadenante: crisis hipertensiva, isquemia o arritmia.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'La VMNI cambia el pronóstico',
            texto:
              'En el edema agudo cardiogénico, la presión positiva reduce el retorno venoso, mejora el intercambio gaseoso y disminuye el trabajo respiratorio. A menudo evita la intubación si se aplica pronto.',
          },
        ],
      },
      {
        titulo: 'SDRA y ventilación protectora',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El sindrome de dificultad respiratoria aguda (SDRA) es una lesión pulmonar inflamatoria con edema no cardiogénico por aumento de la permeabilidad capilar. Causa hipoxemia refractaria e infiltrados bilaterales. A diferencia del edema cardiogénico, no hay falla de bomba.',
          },
          {
            tipo: 'lista',
            titulo: 'Principios de la ventilación protectora',
            items: [
              'Volumen corriente bajo: 6 ml/kg de peso corporal ideal.',
              'Limitar la presión meseta a menos de 30 cmH2O.',
              'PEEP adecuada para mantener el reclutamiento alveolar.',
              'Tolerar la hipercapnia permisiva para evitar la lesión inducida por el ventilador.',
              'Posición prona en el SDRA grave dentro del entorno hospitalario.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Volumen bajo salva pulmones',
            texto:
              'La ventilación con volúmenes altos sobredistiende los alveolos sanos y perpetúa la inflamación (volutrauma). El volumen corriente bajo basado en el peso ideal es la intervención que más reduce la mortalidad en el SDRA.',
          },
        ],
      },
      {
        titulo: 'Ventilación mecánica no invasiva (VMNI)',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'CPAP frente a BiPAP',
            headers: ['Modo', 'Uso principal'],
            filas: [
              ['CPAP', 'Presión continua; edema agudo de pulmón, apnea.'],
              ['BiPAP', 'Dos niveles de presión; insuficiencia hipercápnica del EPOC.'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Contraindicaciones de la VMNI',
            items: [
              'Paro respiratorio o necesidad de vía aérea inmediata.',
              'Alteración grave del estado de conciencia o incapacidad para proteger la vía aérea.',
              'Vómito o riesgo alto de broncoaspiración.',
              'Inestabilidad hemodinámica grave o trauma facial.',
              'Falta de colaboración del paciente.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'La VMNI exige reevaluación constante',
            texto:
              'Si tras un breve ensayo de VMNI el paciente no mejora o se deteriora (acidosis que empeora, agotamiento, deterioro del estado mental), no insistas: procede a la intubación. La VMNI nunca debe retrasar una vía aérea definitiva necesaria.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Estado asmático', definicion: 'Crisis asmática que no responde al tratamiento inicial y amenaza la vida.' },
      { termino: 'Torax silente', definicion: 'Ausencia de sibilancias por flujo aéreo críticamente bajo; signo de gravedad extrema.' },
      { termino: 'Hipercapnia permisiva', definicion: 'Tolerar CO2 elevado para evitar barotrauma y atrapamiento aéreo.' },
      { termino: 'VMNI', definicion: 'Soporte ventilatorio sin intubación: CPAP y BiPAP.' },
      { termino: 'SDRA', definicion: 'Edema pulmonar no cardiogénico por aumento de permeabilidad capilar.' },
      { termino: 'Ventilación protectora', definicion: 'Volumen corriente bajo (6 ml/kg ideal) y presión meseta menor a 30 cmH2O.' },
      { termino: 'Meta de SpO2 en EPOC', definicion: '88 a 92 por ciento para evitar la hipercapnia por hiperoxia.' },
    ],
    flashcards: [
      { frente: '¿Qué significa un torax silente en el asma?', reverso: 'Flujo aéreo críticamente bajo; crisis que amenaza la vida.' },
      { frente: 'Dosis de sulfato de magnesio en el asma grave', reverso: '1 a 2 g IV.' },
      { frente: 'Meta de SpO2 en el EPOC exacerbado', reverso: '88 a 92 por ciento.' },
      { frente: 'Modo de VMNI de elección en el edema agudo de pulmón', reverso: 'CPAP (o BiPAP).' },
      { frente: 'Volumen corriente en la ventilación protectora', reverso: '6 ml/kg de peso corporal ideal.' },
      { frente: 'Límite de la presión meseta en SDRA', reverso: 'Menor a 30 cmH2O.' },
      { frente: 'Diferencia entre edema cardiogénico y SDRA', reverso: 'El cardiogénico es por presión hidrostática; el SDRA por permeabilidad capilar.' },
      { frente: 'Contraindicación clave de la VMNI', reverso: 'Paro respiratorio o incapacidad para proteger la vía aérea.' },
    ],
    quiz: [
      {
        pregunta: 'En una crisis asmática grave, la desaparición de las sibilancias indica:',
        opciones: ['Mejoría del paciente', 'Flujo aéreo críticamente bajo (torax silente)', 'Error de auscultación', 'Resolución del broncoespasmo'],
        correcta: 1,
        explicacion: 'El torax silente refleja un flujo tan bajo que no genera sibilancias; es un signo de gravedad extrema y paro inminente.',
      },
      {
        pregunta: 'La meta de SpO2 en un paciente con EPOC exacerbado es:',
        opciones: ['100 por ciento', '88 a 92 por ciento', 'Mayor a 95 por ciento', 'No importa'],
        correcta: 1,
        explicacion: 'La hiperoxia empeora la hipercapnia en el retenedor crónico; se titula el oxígeno a 88 a 92 por ciento.',
      },
      {
        pregunta: 'En el edema agudo de pulmón cardiogénico, la VMNI temprana:',
        opciones: ['Está contraindicada', 'Reduce precarga y poscarga, mejora oxigenación y evita intubaciones', 'Solo sirve en el EPOC', 'Aumenta el retorno venoso'],
        correcta: 1,
        explicacion: 'La presión positiva disminuye el retorno venoso y el trabajo respiratorio, mejorando el intercambio gaseoso y evitando intubaciones.',
      },
      {
        pregunta: 'La intervención que más reduce la mortalidad en el SDRA es:',
        opciones: ['Volumen corriente alto', 'Volumen corriente bajo (6 ml/kg ideal)', 'FiO2 100 por ciento constante', 'Diuréticos'],
        correcta: 1,
        explicacion: 'El volumen corriente bajo evita el volutrauma; es la medida con mayor impacto en la supervivencia del SDRA.',
      },
      {
        pregunta: 'Al ventilar a un asmático intubado se debe:',
        opciones: ['Usar frecuencias altas', 'Dar tiempo espiratorio largo y tolerar hipercapnia', 'Maximizar el volumen corriente', 'Evitar la sedación'],
        correcta: 1,
        explicacion: 'El tiempo espiratorio largo y la hipercapnia permisiva previenen el auto-PEEP, el atrapamiento aéreo y el barotrauma.',
      },
      {
        pregunta: 'Una contraindicación clara de la VMNI es:',
        opciones: ['Edema agudo de pulmón', 'EPOC hipercápnico', 'Paciente obnubilado que no protege la vía aérea', 'Asma moderada'],
        correcta: 2,
        explicacion: 'La incapacidad de proteger la vía aérea conlleva alto riesgo de broncoaspiración; ahí se requiere vía aérea definitiva.',
      },
      {
        pregunta: 'El SDRA se diferencia del edema cardiogénico en que:',
        opciones: ['Hay falla de bomba', 'Es edema no cardiogénico por aumento de permeabilidad capilar', 'Responde a diuréticos como tratamiento principal', 'Cursa con presiones de llenado altas'],
        correcta: 1,
        explicacion: 'El SDRA es una lesión inflamatoria con permeabilidad capilar aumentada, sin falla de bomba ni presiones de llenado elevadas.',
      },
    ],
  },
  {
    id: 'emergencias-neurologicas',
    numero: '4.9',
    titulo: 'Emergencias Neurológicas',
    icono: '🧠',
    duracion: '60 min',
    resumen:
      'El EVC, el estado epiléptico y la hipertensión intracraneal son emergencias tiempo-dependientes donde la actuación prehospitalaria define el desenlace neurológico.',
    objetivos: [
      'Diferenciar el EVC isquémico del hemorrágico y aplicar las escalas prehospitalarias.',
      'Reconocer la ventana terapéutica del EVC isquémico y los criterios de traslado.',
      'Manejar el estado epiléptico de forma escalonada.',
      'Identificar y tratar la hipertensión intracraneal y la herniación.',
      'Aplicar las medidas para prevenir la lesión cerebral secundaria.',
    ],
    secciones: [
      {
        titulo: 'EVC: isquémico frente a hemorrágico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El evento vascular cerebral isquémico (cerca del 85 por ciento) se debe a la oclusión de una arteria cerebral; el hemorrágico (cerca del 15 por ciento) a la rotura de un vaso. Clínicamente pueden ser indistinguibles en el campo, por lo que la tomografía es indispensable antes de cualquier tratamiento de reperfusión.',
          },
          {
            tipo: 'lista',
            titulo: 'Pistas clínicas',
            items: [
              'Hemorrágico: cefalea intensa súbita, vómito y deterioro rápido de la conciencia.',
              'Isquémico: déficit focal de instalación brusca sin cefalea predominante.',
              'La hemorragia subaracnoidea da la peor cefalea de la vida, en trueno.',
              'Ninguna pista es definitiva: solo la imagen distingue ambos.',
            ],
          },
          {
            tipo: 'diagrama',
            clave: 'encefalo',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No bajes la presión a ciegas',
            texto:
              'En el EVC isquémico se tolera presión elevada (hipertensión permisiva) para mantener la perfusión de la penumbra; bajarla bruscamente daña. El manejo de la presión difiere por completo en el hemorrágico, donde sí se controla. Por eso la imagen es prioritaria.',
          },
        ],
      },
      {
        titulo: 'Escalas prehospitalarias',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Escala de Cincinnati',
            headers: ['Componente', 'Hallazgo anormal'],
            filas: [
              ['Asimetría facial', 'Un lado de la cara no se mueve igual al sonreir.'],
              ['Debilidad de brazos', 'Un brazo cae o no se eleva igual que el otro.'],
              ['Lenguaje', 'Habla arrastrada, palabras incorrectas o incapacidad de hablar.'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Conceptos clave del traslado',
            items: [
              'Cualquier componente anormal de Cincinnati sugiere alta probabilidad de EVC.',
              'Las escalas de gran vaso (como RACE o LAMS) ayudan a decidir el centro destino.',
              'Registrar la hora de inicio o de ultima vez visto sano es crítico.',
              'Glucemia capilar obligatoria: la hipoglucemia imita un EVC.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'La hora de inicio manda',
            texto:
              'El tratamiento de reperfusión depende del tiempo de evolución. Determinar con precisión la hora de inicio (o la ultima vez que se vio sano al paciente) es uno de los datos prehospitalarios más valiosos. El tiempo es cerebro.',
          },
        ],
      },
      {
        titulo: 'Ventana terapéutica del EVC isquémico',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Estrategias de reperfusión',
            items: [
              'Trombolisis IV: ventana clásica hasta 4.5 horas en pacientes seleccionados.',
              'Trombectomía mecánica: en oclusión de gran vaso, ventana ampliada hasta 24 h con criterios de imagen.',
              'Preavisar al hospital activa el código ictus y acorta los tiempos.',
              'Trasladar a un centro con capacidad de imagen y, si aplica, trombectomía.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Cuidados prehospitalarios del EVC',
            items: [
              'Mantener SpO2 mayor o igual a 94 por ciento y evitar la hipotensión.',
              'No administrar nada por boca por riesgo de aspiración.',
              'Corregir la hipoglucemia y evitar tanto la hipo como la hiperglucemia.',
              'Documentar el déficit y la hora; traslado rápido con preaviso.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Descarta los imitadores',
            texto:
              'La hipoglucemia, las convulsiones con parálisis de Todd, la migraña con aura y las intoxicaciones imitan al EVC. La glucemia capilar es obligatoria antes de etiquetar cualquier déficit como vascular.',
          },
        ],
      },
      {
        titulo: 'Estado epiléptico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El estado epiléptico se define como una crisis de más de 5 minutos o crisis repetidas sin recuperación de la conciencia entre ellas. Es una emergencia: la actividad prolongada causa lesión neuronal, hipertermia, acidosis y compromiso respiratorio.',
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo escalonado',
            items: [
              'Primera línea: benzodiacepina. Midazolam IM 10 mg, lorazepam IV 0.1 mg/kg o diazepam IV.',
              'Segunda línea si persiste: antiepiléptico IV (levetiracetam, valproato o fenitoína).',
              'Tercera línea (estado refractario): inducción anestésica e intubación.',
              'Buscar y tratar causas: hipoglucemia, hiponatremia, hipoxia, intoxicación, eclampsia.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No subdosificar la benzodiacepina',
            texto:
              'Una causa frecuente de estado epiléptico refractario es la dosis insuficiente de benzodiacepina. Administra la dosis completa adecuada y, si persiste, escala sin demora a la segunda línea. La eclampsia se trata con sulfato de magnesio.',
          },
        ],
      },
      {
        titulo: 'Hipertensión intracraneal y herniación',
        bloques: [
          {
            tipo: 'formula',
            texto: 'PPC = PAM - PIC',
            nota: 'La presión de perfusión cerebral es la diferencia entre la presión arterial media y la presión intracraneal; si la PIC sube o la PAM cae, el cerebro deja de perfundirse.',
          },
          {
            tipo: 'lista',
            titulo: 'Signos de hipertensión intracraneal y herniación',
            items: [
              'Triada de Cushing: hipertensión, bradicardia y respiración irregular (signo tardío).',
              'Deterioro del estado de conciencia y pupila dilatada y fija unilateral.',
              'Postura de descerebración o decorticación.',
              'Vómito en proyectil y cefalea progresiva.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Medidas ante la herniación inminente',
            items: [
              'Elevar la cabecera a 30 grados y mantener la cabeza en línea media.',
              'Asegurar oxigenación y normocapnia; evitar hipoxia e hipotensión.',
              'Salino hipertónico o manitol para reducir la PIC.',
              'Hiperventilación leve y transitoria solo como puente ante signos de herniación.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Prevenir la lesión secundaria',
            texto:
              'El cerebro lesionado es muy sensible a la hipoxia y la hipotensión; cada episodio empeora el pronóstico. La meta prehospitalaria es mantener SpO2 mayor o igual a 94 por ciento, presión adecuada y normocapnia.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'EVC isquémico', definicion: 'Oclusión arterial cerebral; cerca del 85 por ciento de los casos.' },
      { termino: 'EVC hemorrágico', definicion: 'Rotura de un vaso; cefalea súbita y deterioro rápido.' },
      { termino: 'Escala de Cincinnati', definicion: 'Tamizaje de EVC: cara, brazos y lenguaje.' },
      { termino: 'Ultima vez visto sano', definicion: 'Hora que define la ventana de reperfusión cuando se desconoce el inicio.' },
      { termino: 'Estado epiléptico', definicion: 'Crisis mayor a 5 min o repetidas sin recuperar conciencia.' },
      { termino: 'Triada de Cushing', definicion: 'HTA, bradicardia y respiración irregular: HIC y herniación (tardío).' },
      { termino: 'PPC', definicion: 'Presión de perfusión cerebral = PAM menos PIC.' },
    ],
    flashcards: [
      { frente: 'Componentes de la escala de Cincinnati', reverso: 'Asimetría facial, debilidad de brazos y alteración del lenguaje.' },
      { frente: '¿Cuál es el examen obligatorio ante un déficit neurológico?', reverso: 'La glucemia capilar (la hipoglucemia imita un EVC).' },
      { frente: 'Definición de estado epiléptico', reverso: 'Crisis de más de 5 minutos o repetidas sin recuperar conciencia.' },
      { frente: 'Primer fármaco del estado epiléptico', reverso: 'Una benzodiacepina (midazolam IM, lorazepam o diazepam IV).' },
      { frente: 'Fórmula de la presión de perfusión cerebral', reverso: 'PPC = PAM menos PIC.' },
      { frente: 'Componentes de la triada de Cushing', reverso: 'Hipertensión, bradicardia y respiración irregular.' },
      { frente: '¿Por qué no bajar la presión en el EVC isquémico?', reverso: 'La hipertensión permisiva mantiene la perfusión de la penumbra.' },
      { frente: 'Ventana clásica de la trombolisis IV', reverso: 'Hasta 4.5 horas en pacientes seleccionados.' },
    ],
    quiz: [
      {
        pregunta: 'Ante un paciente con hemiparesia súbita, lo primero que debe descartarse es:',
        opciones: ['Un infarto cardíaco', 'La hipoglucemia mediante glucemia capilar', 'Una fractura', 'Una infección'],
        correcta: 1,
        explicacion: 'La hipoglucemia es un imitador clásico de EVC; la glucemia capilar es obligatoria antes de cualquier conducta.',
      },
      {
        pregunta: 'En el EVC isquémico, el manejo de una presión arterial elevada en el campo es:',
        opciones: ['Bajarla agresivamente', 'Tolerar la hipertensión permisiva para perfundir la penumbra', 'Administrar nitroprusiato', 'Indiferente'],
        correcta: 1,
        explicacion: 'Bajar la presión bruscamente reduce la perfusión del tejido en riesgo; se tolera la hipertensión hasta definir el tipo de EVC con imagen.',
      },
      {
        pregunta: 'El estado epiléptico se define como una crisis que dura más de:',
        opciones: ['1 minuto', '5 minutos', '30 minutos', '60 minutos'],
        correcta: 1,
        explicacion: 'La definición operativa actual es crisis de más de 5 minutos o crisis repetidas sin recuperar la conciencia.',
      },
      {
        pregunta: 'El primer escalón farmacológico del estado epiléptico es:',
        opciones: ['Fenitoína', 'Una benzodiacepina', 'Levetiracetam', 'Propofol'],
        correcta: 1,
        explicacion: 'Las benzodiacepinas (midazolam IM, lorazepam o diazepam IV) son la primera línea; la subdosificación causa refractariedad.',
      },
      {
        pregunta: 'La triada de Cushing (HTA, bradicardia, respiración irregular) indica:',
        opciones: ['Shock hipovolémico', 'Hipertensión intracraneal con herniación inminente', 'Sepsis', 'Intoxicación opiácea'],
        correcta: 1,
        explicacion: 'Es un signo tardío de PIC elevada: el cuerpo eleva la PAM para perfundir el cerebro, con bradicardia refleja.',
      },
      {
        pregunta: 'En la sospecha de herniación, la hiperventilación está indicada:',
        opciones: ['De forma sistemática y prolongada', 'Solo leve y transitoria como puente ante signos de herniación', 'Nunca, en ningún caso', 'Para aumentar la PIC'],
        correcta: 1,
        explicacion: 'La hipocapnia vasoconstriñe y puede causar isquemia; solo se usa de forma breve y controlada ante herniación inminente.',
      },
      {
        pregunta: 'El dato prehospitalario más valioso para decidir la reperfusión del EVC es:',
        opciones: ['La presión arterial inicial', 'La hora de inicio o de ultima vez visto sano', 'El antecedente familiar', 'La frecuencia cardíaca'],
        correcta: 1,
        explicacion: 'La ventana terapéutica depende del tiempo de evolución; la hora de inicio determina la elegibilidad para trombolisis o trombectomía.',
      },
    ],
  },
  {
    id: 'trauma-por-sistemas',
    numero: '4.10',
    titulo: 'Trauma por Sistemas',
    icono: '🚑',
    duracion: '60 min',
    resumen:
      'El trauma torácico, abdominal, pélvico y raquimedular tiene patrones letales especificos cuyo reconocimiento temprano permite intervenciones que salvan la vida.',
    objetivos: [
      'Reconocer y manejar las lesiones torácicas inmediatamente mortales.',
      'Evaluar el trauma abdominal y sus signos de hemorragia interna.',
      'Identificar la fractura de pelvis inestable y aplicar la faja pélvica.',
      'Manejar el trauma raquimedular y el shock neurogénico.',
      'Integrar la reanimación de control de daños.',
    ],
    secciones: [
      {
        titulo: 'Trauma torácico letal',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El torax alberga lesiones que matan en minutos. La evaluación primaria busca de forma sistemática las entidades que comprometen la ventilación y la circulación, porque varias se tratan con maniobras simples antes de cualquier imagen.',
          },
          {
            tipo: 'tabla',
            titulo: 'Lesiones torácicas inmediatamente mortales',
            headers: ['Lesión', 'Reconocimiento y manejo'],
            filas: [
              ['Neumotórax a tensión', 'Hipotensión, yugulares distendidas, hipoventilación unilateral; descompresión con aguja y toracostomía.'],
              ['Neumotórax abierto', 'Herida soplante; apósito de tres lados (valvular).'],
              ['Hemotórax masivo', 'Hipoventilación con matidez y shock; toracostomía y reposición.'],
              ['Taponamiento cardíaco', 'Triada de Beck; pericardiocentesis o toracotomía.'],
              ['Torax inestable', 'Segmento costal con movimiento paradójico; analgesia y soporte ventilatorio.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Neumotórax a tensión: diagnóstico clínico',
            texto:
              'El neumotórax a tensión se diagnostica y trata por la clínica, nunca esperando una radiografía. El sitio actual de descompresión con aguja en el adulto es el 5.º espacio intercostal en la línea axilar anterior, alternativa al 2.º espacio en la línea medioclavicular.',
          },
        ],
      },
      {
        titulo: 'Triada de Beck y taponamiento',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Triada de Beck',
            items: [
              'Hipotensión por la compresión del corazón.',
              'Ingurgitación yugular por el aumento de la presión venosa.',
              'Ruidos cardíacos velados por el líquido pericárdico.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Tensión frente a taponamiento',
            texto:
              'Ambos cursan con hipotensión y yugulares distendidas, pero el neumotórax a tensión tiene hipoventilación unilateral y desviación traqueal, mientras el taponamiento conserva ruidos respiratorios y muestra ruidos cardíacos velados. La ecografía resuelve la duda con rapidez.',
          },
        ],
      },
      {
        titulo: 'Trauma abdominal',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El abdomen es un sitio frecuente de hemorragia interna oculta. El bazo y el higado son los órganos más lesionados en el trauma cerrado. Un abdomen aparentemente benigno puede albergar un sangrado masivo, por lo que el mecanismo y la tendencia hemodinámica pesan más que un solo examen.',
          },
          {
            tipo: 'lista',
            titulo: 'Datos de alarma',
            items: [
              'Distensión, dolor y signos de irritación peritoneal.',
              'Shock sin causa externa evidente: sospecha hemorragia abdominal o pélvica.',
              'Equimosis periumbilical (Cullen) o en flancos (Grey Turner): sangrado retroperitoneal.',
              'El eco FAST detecta líquido libre a pie de cama.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'El abdomen que sangra puede no doler al inicio',
            texto:
              'En el politraumatizado con alteración de conciencia o lesiones distractoras, la exploración abdominal pierde sensibilidad. La hipotensión persistente sin foco externo obliga a sospechar sangrado abdominal o pélvico y a trasladar sin demora a cirugía.',
          },
        ],
      },
      {
        titulo: 'Trauma pélvico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La fractura de pelvis inestable puede causar una hemorragia exsanguinante en el espacio retroperitoneal, que no se comprime con facilidad. El anillo pélvico roto aumenta su volumen y permite acumular grandes cantidades de sangre.',
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo de la pelvis inestable',
            items: [
              'No balancear ni explorar repetidamente la pelvis si se sospecha fractura.',
              'Colocar una faja pélvica a la altura de los trocánteres mayores.',
              'La faja reduce el volumen pélvico y favorece el taponamiento del sangrado.',
              'Reanimación de control de daños y traslado a centro de trauma.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Faja a la altura correcta',
            texto:
              'La faja pélvica debe colocarse sobre los trocánteres mayores, no sobre el ombligo. Una faja demasiado alta no cierra el anillo pélvico y resulta ineficaz para controlar el sangrado.',
          },
        ],
      },
      {
        titulo: 'Trauma raquimedular',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La lesión medular puede ser primaria (por el trauma inicial) o secundaria (por hipoxia, hipotensión o movilización inadecuada). La meta prehospitalaria es prevenir la lesión secundaria y reconocer el shock neurogénico.',
          },
          {
            tipo: 'lista',
            titulo: 'Shock neurogénico frente a shock medular',
            items: [
              'Shock neurogénico: hipotensión con bradicardia por pérdida del tono simpático en lesiones altas.',
              'Shock medular: pérdida transitoria de reflejos y función por debajo de la lesión, no es un shock circulatorio.',
              'Manejo del neurogénico: líquidos, vasopresores y atropina para la bradicardia.',
              'Inmovilización selectiva segun criterios clínicos, evitando la restricción innecesaria.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Reanimación de control de daños',
            texto:
              'El paciente con hemorragia grave se beneficia de una estrategia que combine hipotensión permisiva hasta el control quirúrgico, transfusión balanceada de hemoderivados, prevención de la triada letal (hipotermia, acidosis, coagulopatía) y ácido tranexámico dentro de las primeras 3 horas.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Neumotórax a tensión', definicion: 'Aire a presión que colapsa el pulmón y el retorno venoso; descompresión inmediata.' },
      { termino: 'Triada de Beck', definicion: 'Hipotensión, yugulares distendidas y ruidos cardíacos velados del taponamiento.' },
      { termino: 'Eco FAST', definicion: 'Ecografía dirigida que detecta líquido libre en el trauma.' },
      { termino: 'Faja pélvica', definicion: 'Dispositivo sobre los trocánteres que cierra el anillo pélvico y controla sangrado.' },
      { termino: 'Shock neurogénico', definicion: 'Hipotensión con bradicardia por pérdida del tono simpático en lesión medular alta.' },
      { termino: 'Triada letal', definicion: 'Hipotermia, acidosis y coagulopatía que se potencian en el trauma grave.' },
      { termino: 'Control de daños', definicion: 'Estrategia de hipotensión permisiva, transfusión balanceada y TXA temprano.' },
    ],
    flashcards: [
      { frente: 'Componentes de la triada de Beck', reverso: 'Hipotensión, ingurgitación yugular y ruidos cardíacos velados.' },
      { frente: 'Sitio actual de descompresión con aguja en el adulto', reverso: '5.º espacio intercostal, línea axilar anterior.' },
      { frente: '¿Cómo se diagnostica el neumotórax a tensión?', reverso: 'Clínicamente; nunca se espera una radiografía.' },
      { frente: '¿Dónde se coloca la faja pélvica?', reverso: 'Sobre los trocánteres mayores.' },
      { frente: 'Órganos más lesionados en el trauma abdominal cerrado', reverso: 'El bazo y el higado.' },
      { frente: 'Diferencia entre shock neurogénico y medular', reverso: 'El neurogénico es circulatorio (hipotensión con bradicardia); el medular es pérdida de reflejos y función.' },
      { frente: 'Componentes de la triada letal del trauma', reverso: 'Hipotermia, acidosis y coagulopatía.' },
      { frente: 'Ventana del ácido tranexámico en el trauma', reverso: 'Primeras 3 horas tras la lesión.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con trauma torácico, hipotenso, con yugulares distendidas e hipoventilación unilateral con desviación traqueal tiene:',
        opciones: ['Taponamiento cardíaco', 'Neumotórax a tensión', 'Hemotórax simple', 'Contusión pulmonar'],
        correcta: 1,
        explicacion: 'La hipoventilación unilateral con desviación traqueal distingue el neumotórax a tensión del taponamiento, que conserva los ruidos respiratorios.',
      },
      {
        pregunta: 'La faja pélvica en una fractura inestable debe colocarse:',
        opciones: ['Sobre el ombligo', 'Sobre los trocánteres mayores', 'Sobre las costillas', 'Sobre los muslos distales'],
        correcta: 1,
        explicacion: 'A la altura de los trocánteres cierra el anillo pélvico y reduce el volumen para taponar el sangrado; más alto es ineficaz.',
      },
      {
        pregunta: 'El neumotórax a tensión se diagnostica:',
        opciones: ['Con radiografía de torax', 'Clínicamente y se trata de inmediato', 'Con tomografía', 'Con electrocardiograma'],
        correcta: 1,
        explicacion: 'Es un diagnóstico clínico que exige descompresión inmediata; esperar imágenes puede ser mortal.',
      },
      {
        pregunta: 'Un politraumatizado con lesión cervical, hipotenso y bradicárdico presenta:',
        opciones: ['Shock hipovolémico', 'Shock neurogénico', 'Shock cardiogénico', 'Shock séptico'],
        correcta: 1,
        explicacion: 'La pérdida del tono simpático en una lesión medular alta produce hipotensión con bradicardia, característica del shock neurogénico.',
      },
      {
        pregunta: 'El componente de la reanimación de control de daños que debe darse en las primeras 3 horas es:',
        opciones: ['Antibióticos', 'Ácido tranexámico', 'Diuréticos', 'Vasodilatadores'],
        correcta: 1,
        explicacion: 'El TXA reduce la mortalidad por hemorragia si se administra dentro de las primeras 3 horas; después puede ser perjudicial.',
      },
      {
        pregunta: 'En el neumotórax abierto, el manejo prehospitalario inicial es:',
        opciones: ['Sellar la herida por completo de forma hermética', 'Colocar un apósito de tres lados (valvular)', 'No cubrir la herida', 'Aplicar presión directa firme'],
        correcta: 1,
        explicacion: 'El apósito de tres lados permite salir el aire en la espiración y evita que entre en la inspiración, previniendo que se convierta en tensión.',
      },
      {
        pregunta: 'En un trauma cerrado con hipotensión persistente y sin sangrado externo, la sospecha principal es:',
        opciones: ['Deshidratación', 'Hemorragia abdominal o pélvica oculta', 'Reacción vagal', 'Hipoglucemia'],
        correcta: 1,
        explicacion: 'El shock sin foco externo en el trauma cerrado obliga a buscar hemorragia interna, sobre todo abdominal o pélvica.',
      },
    ],
  },
  {
    id: 'quemaduras-inhalacion',
    numero: '4.11',
    titulo: 'Quemaduras y Lesiones por Inhalación',
    icono: '🔥',
    duracion: '60 min',
    resumen:
      'La estimación de la profundidad y la extensión guía la reanimación con líquidos, mientras la lesión por inhalación y las intoxicaciones por CO y cianuro amenazan la vía aérea y la vida.',
    objetivos: [
      'Clasificar las quemaduras por profundidad y estimar su extensión.',
      'Calcular la reanimación de líquidos con la fórmula de Parkland.',
      'Reconocer la lesión por inhalación y asegurar la vía aérea a tiempo.',
      'Identificar y tratar la intoxicación por monóxido de carbono y por cianuro.',
      'Aplicar el manejo prehospitalario integral del quemado grave.',
    ],
    secciones: [
      {
        titulo: 'Profundidad de las quemaduras',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Clasificación por profundidad',
            headers: ['Grado', 'Características'],
            filas: [
              ['Primer grado (superficial)', 'Solo epidermis; eritema doloroso sin ampollas (como el sol).'],
              ['Segundo grado superficial', 'Epidermis y dermis superficial; ampollas, muy doloroso, llenado capilar presente.'],
              ['Segundo grado profundo', 'Dermis profunda; menos doloroso, aspecto moteado o blanquecino.'],
              ['Tercer grado (espesor total)', 'Toda la dermis; piel acartonada, blanca o carbonizada, indolora.'],
              ['Cuarto grado', 'Afecta músculo, tendón o hueso.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'La quemadura indolora es la más grave',
            texto:
              'En la quemadura de espesor total se destruyen las terminaciones nerviosas, por lo que es indolora y de aspecto seco y acartonado. La ausencia de dolor no tranquiliza: indica mayor profundidad y peor pronóstico.',
          },
          {
            tipo: 'diagrama',
            clave: 'piel',
          },
        ],
      },
      {
        titulo: 'Extensión: la regla de los nueves',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La superficie corporal quemada (SCQ) se estima con la regla de los nueves en el adulto. Solo se cuentan las quemaduras de segundo grado o más profundas; las de primer grado no se incluyen en el cálculo de líquidos.',
          },
          {
            tipo: 'tabla',
            titulo: 'Regla de los nueves (adulto)',
            headers: ['Región', 'Porcentaje'],
            filas: [
              ['Cabeza y cuello', '9 por ciento'],
              ['Cada brazo', '9 por ciento'],
              ['Torax y abdomen anterior', '18 por ciento'],
              ['Espalda completa', '18 por ciento'],
              ['Cada pierna', '18 por ciento'],
              ['Periné', '1 por ciento'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'La regla de la palma',
            texto:
              'Para quemaduras irregulares o pequeñas, la palma de la mano del paciente (incluidos los dedos) equivale a cerca del 1 por ciento de su superficie corporal. Es útil para estimar parches dispersos.',
          },
        ],
      },
      {
        titulo: 'Reanimación con líquidos: Parkland',
        bloques: [
          {
            tipo: 'formula',
            texto: 'Parkland: 4 ml x peso (kg) x porcentaje de SCQ',
            nota: 'Es el volumen de cristaloide (Ringer lactato) para las primeras 24 horas. Se administra la mitad en las primeras 8 horas contadas desde el momento de la quemadura, y la otra mitad en las 16 horas siguientes.',
          },
          {
            tipo: 'lista',
            titulo: 'Claves de la reanimación',
            items: [
              'El cristaloide de elección es el Ringer lactato.',
              'Las 8 horas se cuentan desde la hora de la quemadura, no desde la atención.',
              'La fórmula es una estimación inicial: se titula a la diuresis.',
              'Meta de diuresis: 0.5 ml/kg/h en el adulto (mayor en el niño y en quemadura eléctrica).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Titular a la diuresis, no a la fórmula',
            texto:
              'Parkland solo da el punto de partida. La sobrerreanimación causa edema, sindrome compartimental y problemas pulmonares; la subreanimación, shock. La diuresis horaria es la guía real del ajuste.',
          },
        ],
      },
      {
        titulo: 'Lesión por inhalación y vía aérea',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La lesión por inhalación es una de las principales causas de muerte en el quemado. El edema de la vía aérea progresa con rapidez y puede cerrar la vía en minutos a horas; anticiparse es vital, porque intubar tarde es intubar imposible.',
          },
          {
            tipo: 'lista',
            titulo: 'Signos de lesión por inhalación',
            items: [
              'Quemaduras faciales, vibrisas nasales chamuscadas y hollín en boca o nariz.',
              'Esputo carbonáceo, ronquera, estridor o sibilancias.',
              'Antecedente de fuego en espacio cerrado.',
              'Alteración de conciencia en el contexto del incendio.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Asegura la vía aérea de forma temprana',
            texto:
              'Ante signos de lesión por inhalación, asegura la vía aérea antes de que el edema progrese. Esperar a que aparezca el estridor franco puede significar perder la ventana para una intubación segura; el tubo se elige de calibre adecuado para permitir la broncoscopia.',
          },
        ],
      },
      {
        titulo: 'Intoxicación por CO y cianuro',
        bloques: [
          {
            tipo: 'p',
            texto:
              'En los incendios en espacios cerrados coexisten dos tóxicos peligrosos: el monóxido de carbono y el cianuro. Ambos producen hipoxia tisular pese a una oxigenación aparentemente normal, y el cianuro proviene de la combustión de plásticos y materiales sintéticos.',
          },
          {
            tipo: 'tabla',
            titulo: 'Monóxido de carbono frente a cianuro',
            headers: ['Tóxico', 'Mecanismo y tratamiento'],
            filas: [
              ['Monóxido de carbono', 'Se une a la hemoglobina (carboxihemoglobina) e impide transportar O2; tratamiento con O2 al 100 por ciento, considerar cámara hiperbárica.'],
              ['Cianuro', 'Bloquea la cadena respiratoria mitocondrial; tratamiento con hidroxocobalamina.'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El pulsioxímetro engaña en la intoxicación por CO',
            texto:
              'El pulsioxímetro convencional no distingue la carboxihemoglobina de la oxihemoglobina, por lo que puede mostrar una SpO2 falsamente normal pese a una hipoxia grave. Ante sospecha, administra oxígeno al 100 por ciento y usa cooximetría si está disponible.',
          },
          {
            tipo: 'lista',
            titulo: 'Pistas de intoxicación por cianuro',
            items: [
              'Acidosis metabólica profunda con lactato muy elevado.',
              'Deterioro neurológico y colapso cardiovascular sin causa clara.',
              'Víctima de incendio en espacio cerrado con hollín y bajo nivel de conciencia.',
              'La hidroxocobalamina es el antídoto de elección en el ámbito prehospitalario.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Quemadura de espesor total', definicion: 'Destruye toda la dermis; piel acartonada e indolora (tercer grado).' },
      { termino: 'Regla de los nueves', definicion: 'Método para estimar la superficie corporal quemada en el adulto.' },
      { termino: 'Fórmula de Parkland', definicion: '4 ml x kg x porcentaje de SCQ de Ringer lactato en 24 horas.' },
      { termino: 'Meta de diuresis', definicion: '0.5 ml/kg/h en el adulto; guía real de la reanimación del quemado.' },
      { termino: 'Lesión por inhalación', definicion: 'Daño de la vía aérea por humo; obliga a asegurar la vía de forma temprana.' },
      { termino: 'Carboxihemoglobina', definicion: 'Unión del CO a la hemoglobina que impide transportar oxígeno.' },
      { termino: 'Hidroxocobalamina', definicion: 'Antídoto de elección en la intoxicación por cianuro.' },
    ],
    flashcards: [
      { frente: 'Fórmula de Parkland', reverso: '4 ml x peso en kg x porcentaje de SCQ, de Ringer lactato, en 24 horas.' },
      { frente: '¿Cómo se reparte el volumen de Parkland?', reverso: 'La mitad en las primeras 8 horas (desde la quemadura) y la otra mitad en las 16 siguientes.' },
      { frente: 'Meta de diuresis en la reanimación del quemado adulto', reverso: '0.5 ml/kg/h.' },
      { frente: '¿Por qué la quemadura de tercer grado es indolora?', reverso: 'Se destruyen las terminaciones nerviosas de la dermis.' },
      { frente: 'Porcentaje de un brazo en la regla de los nueves', reverso: '9 por ciento.' },
      { frente: 'Antídoto de la intoxicación por cianuro', reverso: 'Hidroxocobalamina.' },
      { frente: 'Tratamiento de la intoxicación por monóxido de carbono', reverso: 'Oxígeno al 100 por ciento; considerar cámara hiperbárica.' },
      { frente: '¿Por qué engaña el pulsioxímetro en la intoxicación por CO?', reverso: 'No distingue la carboxihemoglobina de la oxihemoglobina; muestra SpO2 falsamente normal.' },
    ],
    quiz: [
      {
        pregunta: 'Un adulto de 70 kg con 30 por ciento de SCQ. Segun Parkland, el volumen total en 24 horas es:',
        opciones: ['4200 ml', '8400 ml', '2100 ml', '12600 ml'],
        correcta: 1,
        explicacion: '4 x 70 x 30 = 8400 ml de Ringer lactato; la mitad (4200 ml) en las primeras 8 horas.',
      },
      {
        pregunta: 'En la fórmula de Parkland, las primeras 8 horas se cuentan desde:',
        opciones: ['La llegada al hospital', 'El momento de la quemadura', 'El inicio de la infusión', 'La primera diuresis'],
        correcta: 1,
        explicacion: 'El tiempo se cuenta desde la hora de la quemadura, por lo que el retraso en la atención reduce la ventana de las primeras 8 horas.',
      },
      {
        pregunta: 'Una quemadura de aspecto blanco, seco, acartonado e indoloro corresponde a:',
        opciones: ['Primer grado', 'Segundo grado superficial', 'Tercer grado (espesor total)', 'Quemadura solar'],
        correcta: 2,
        explicacion: 'La quemadura de espesor total destruye las terminaciones nerviosas, por eso es indolora, seca y acartonada.',
      },
      {
        pregunta: 'En la sospecha de lesión por inhalación con quemaduras faciales y esputo carbonáceo, la conducta es:',
        opciones: ['Esperar a que aparezca estridor', 'Asegurar la vía aérea de forma temprana', 'Solo administrar broncodilatadores', 'Diferir el manejo de la vía aérea'],
        correcta: 1,
        explicacion: 'El edema progresa con rapidez; asegurar la vía aérea temprano evita una intubación imposible cuando ya hay obstrucción.',
      },
      {
        pregunta: 'En un rescatado de un incendio en espacio cerrado, el pulsioxímetro marca 98 por ciento pero el paciente está confuso. La causa probable es:',
        opciones: ['Ansiedad', 'Intoxicación por monóxido de carbono', 'Hipoglucemia', 'Deshidratación'],
        correcta: 1,
        explicacion: 'El pulsioxímetro no detecta la carboxihemoglobina y puede mostrar SpO2 normal pese a hipoxia grave por CO.',
      },
      {
        pregunta: 'En una víctima de incendio con acidosis profunda, lactato muy alto y colapso, el antídoto a considerar es:',
        opciones: ['Naloxona', 'Hidroxocobalamina', 'Atropina', 'Flumazenil'],
        correcta: 1,
        explicacion: 'El cuadro sugiere intoxicación por cianuro, que bloquea la respiración mitocondrial; la hidroxocobalamina es el antídoto de elección.',
      },
      {
        pregunta: 'La reanimación con líquidos del quemado se ajusta principalmente segun:',
        opciones: ['El peso solamente', 'La diuresis horaria', 'La presión arterial aislada', 'El dolor del paciente'],
        correcta: 1,
        explicacion: 'Parkland es solo una estimación inicial; la diuresis horaria (meta 0.5 ml/kg/h en adulto) guía el ajuste real para evitar sobre o subreanimación.',
      },
    ],
  },
]
