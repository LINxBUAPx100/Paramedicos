// FASE 7 — Marco Normativo y Operaciones Especiales (México)
// Cubre el Módulo II del temario: legislación mexicana, operaciones especiales,
// triage táctico y bienestar del personal. Contenido a profundidad para estudio.
// Referencia educativa: rige siempre la normativa vigente y tu protocolo local.

export const fase7 = {
  id: 'fase-7',
  numero: 7,
  titulo: 'Marco Normativo y Operaciones Especiales',
  subtitulo: 'Legislación Mexicana, Táctica y Bienestar',
  color: '#0891b2',
  icono: '⚖️',
  descripcion:
    'El paramédico no solo trata pacientes: opera dentro de un marco legal y de sistemas de respuesta. Esta fase cubre la regulación oficial en México (NOM-034, NOM-087, Ley General de Salud, FRAP), el despliegue en incidentes complejos (SCI, TECC, HazMat, aeromedicina) y el cuidado de la salud mental del propio rescatador.',
  temas: [
    // ===================================================================
    // 7.1 — Legislación y Marco Normativo (México)
    // ===================================================================
    {
      id: 'legislacion-marco-normativo-mexico',
      numero: '7.1',
      titulo: 'Legislación y Marco Normativo Mexicano',
      icono: '📜',
      duracion: '50 min',
      resumen:
        'Conocer la NOM-034, la Ley General de Salud y los aspectos médico-legales protege al paciente y al paramédico. El FRAP es tu mejor defensa legal y la NOM-087 norma el manejo de residuos peligrosos en la ambulancia.',
      objetivos: [
        'Describir qué regula la NOM-034-SSA3-2013 y la tipificación de ambulancias.',
        'Diferenciar negligencia, impericia e imprudencia, y el valor del consentimiento.',
        'Justificar el llenado correcto del FRAP y la preservación de indicios.',
        'Clasificar los RPBI según la NOM-087 y su código de colores.',
      ],
      secciones: [
        {
          titulo: 'NOM-034-SSA3-2013: atención médica prehospitalaria',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La NOM-034-SSA3-2013, "Regulación de los servicios de salud. Atención médica prehospitalaria" (publicada en el Diario Oficial de la Federación el 23 de septiembre de 2014), es la norma rectora del servicio prehospitalario en México. Establece criterios mínimos para la atención, el equipamiento y la tipificación de las ambulancias, y el perfil del personal.',
            },
            {
              tipo: 'tabla',
              titulo: 'Tipificación de ambulancias (NOM-034)',
              headers: ['Tipo', 'Capacidad', 'Personal mínimo'],
              filas: [
                ['Ambulancia de traslado', 'Pacientes estables sin riesgo vital', 'Conductor y técnico'],
                ['Urgencias básicas (TUM-B)', 'Soporte vital básico', 'TUM básico'],
                ['Urgencias avanzadas (TUM-A)', 'Soporte vital avanzado (vía aérea, fármacos)', 'TUM avanzado / paramédico'],
                ['Cuidados intensivos', 'Traslado de paciente crítico', 'Personal con competencias críticas'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'El perfil del TUM',
              texto:
                'La norma define al Técnico en Urgencias Médicas (TUM) en sus niveles (básico, intermedio y avanzado) y sus competencias. Actuar fuera de tu nivel de certificación o protocolo es una de las fuentes más comunes de problemas médico-legales.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Tipificación de ambulancias NOM-034',
              caption: 'Tipos de ambulancia según la NOM-034 y su equipamiento.',
              busqueda: 'NOM-034 tipificacion ambulancias Mexico tipos equipamiento',
            },
          ],
        },
        {
          titulo: 'Marco legal: Ley General de Salud',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La Ley General de Salud establece el derecho a la protección de la salud y la obligación de los establecimientos de atender las urgencias. En una urgencia, la atención no puede negarse ni condicionarse a pago previo: negar la atención de una urgencia puede constituir un delito.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Urgencia real',
              texto:
                'Se considera urgencia todo problema que ponga en peligro la vida, un órgano o una función y que requiera atención inmediata. Ante la duda, se actúa como si fuera urgencia. El traslado debe hacerse al hospital con capacidad resolutiva, coordinado por el regulador médico.',
            },
          ],
        },
        {
          titulo: 'Aspectos médico-legales',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Las tres fuentes clásicas de responsabilidad',
              headers: ['Término', 'Definición', 'Ejemplo'],
              filas: [
                ['Negligencia', 'No hacer lo que se debía hacer (omisión)', 'No inmovilizar una columna con mecanismo de riesgo'],
                ['Impericia', 'Falta de pericia, conocimiento o destreza', 'Intentar un procedimiento sin la capacitación'],
                ['Imprudencia', 'Hacer de más o sin precaución (comisión)', 'Conducir la ambulancia de forma temeraria'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Consentimiento, rechazo y abandono',
              texto:
                'Todo paciente competente puede dar o rechazar la atención (consentimiento informado / rechazo informado). En el inconsciente o el menor sin tutor opera el consentimiento implícito (presunto). Una vez iniciada la atención, suspenderla sin transferir a un nivel igual o superior constituye abandono.',
            },
          ],
        },
        {
          titulo: 'El FRAP: tu documento legal',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El Formato de Registro de Atención Prehospitalaria (FRAP) es el documento médico-legal que respalda toda la atención. Documenta la evaluación, los hallazgos, las intervenciones, la evolución y la transferencia. Tiene valor probatorio: es tu defensa principal ante cualquier reclamo.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Lo que no se escribió, no se hizo',
              texto:
                'Registra con letra legible, sin alterar ni borrar (los errores se tachan con una línea y se rubrican), con hora de cada intervención y los datos de quien recibe al paciente. Un FRAP completo protege; uno incompleto o alterado condena.',
            },
          ],
        },
        {
          titulo: 'Indicios y cadena de custodia',
          bloques: [
            {
              tipo: 'p',
              texto:
                'En hechos posiblemente delictivos (violencia, accidentes, muertes), la escena contiene indicios con valor legal. El paramédico prioriza la vida, pero debe alterar lo mínimo indispensable: no mover objetos sin necesidad, conservar la ropa cortada y documentar lo que se modificó al atender.',
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Atiende sin contaminar',
              texto:
                'Si debes cortar ropa, evita hacerlo sobre orificios de bala o arma blanca. Coloca lo retirado en bolsa de papel cuando sea posible. Si hay un fallecido con signos evidentes de muerte y un posible delito, no muevas el cuerpo y da aviso a la autoridad.',
            },
          ],
        },
        {
          titulo: 'NOM-087: manejo de RPBI en la ambulancia',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La NOM-087-SEMARNAT-SSA1-2002 (citada también como NOM-087-ECOL-SSA1-2002) regula la separación, envasado y disposición de los Residuos Peligrosos Biológico-Infecciosos (RPBI). Su correcta clasificación por colores previene contagios y sanciones.',
            },
            {
              tipo: 'tabla',
              titulo: 'Clasificación y código de colores de los RPBI',
              headers: ['Residuo', 'Envase y color'],
              filas: [
                ['Sangre y líquidos', 'Recipiente hermético ROJO'],
                ['Cultivos y cepas de agentes infecciosos', 'Bolsa ROJA'],
                ['Patológicos (tejidos, órganos)', 'Bolsa AMARILLA'],
                ['No anatómicos (gasas, materiales con fluidos)', 'Bolsa ROJA'],
                ['Punzocortantes (agujas, bisturís)', 'Recipiente rígido ROJO'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Los punzocortantes NUNCA a la bolsa',
              texto:
                'Las agujas y objetos punzocortantes van siempre en el contenedor rígido rojo, jamás en una bolsa (perforan y exponen). No se reencapuchan las agujas. Todo envase lleva el símbolo universal de riesgo biológico y la leyenda "RPBI".',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Código de colores RPBI NOM-087',
              caption: 'Clasificación de RPBI por colores (NOM-087): rojo, amarillo y contenedor rígido.',
              busqueda: 'NOM-087 RPBI clasificacion colores bolsa roja amarilla punzocortantes',
            },
          ],
        },
        {
          titulo: 'Coordinación médica: CRUM y 911',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El Centro Regulador de Urgencias Médicas (CRUM) coordina la atención y el traslado, asigna el hospital con capacidad resolutiva y enlaza con la dirección médica. El número único de emergencias 9-1-1 recibe la llamada y despacha el recurso. La comunicación clara y el reporte estructurado al hospital aceleran la atención definitiva.',
            },
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'NOM-034-SSA3-2013 (texto oficial, PDF)', url: 'https://salud.guanajuato.gob.mx/download/Normatividad/Normas/NOM_034_SSA3_2013.pdf' },
                { nombre: 'NOM-087-SEMARNAT-SSA1-2002 (RPBI, resumen y PDF)', url: 'https://www.normasoficiales.mx/nom/nom-087-semarnat-ssa1-2002' },
                { nombre: 'Ley General de Salud (Cámara de Diputados, PDF)', url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf' },
                { nombre: 'Diario Oficial de la Federación (DOF)', url: 'https://www.dof.gob.mx/', nota: 'Publicación oficial de las NOM' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'NOM-034-SSA3-2013', definicion: 'Norma que regula la atención médica prehospitalaria y tipifica las ambulancias en México.' },
        { termino: 'Negligencia/impericia/imprudencia', definicion: 'Omisión / falta de destreza / exceso o falta de precaución; fuentes de responsabilidad.' },
        { termino: 'FRAP', definicion: 'Formato de Registro de Atención Prehospitalaria; documento médico-legal con valor probatorio.' },
        { termino: 'Consentimiento implícito', definicion: 'Se presume en el paciente inconsciente o el menor sin tutor ante una urgencia.' },
        { termino: 'NOM-087', definicion: 'Norma de manejo de RPBI; rojo para sangre/cultivos/no anatómicos/punzocortantes, amarillo para patológicos.' },
        { termino: 'CRUM', definicion: 'Centro Regulador de Urgencias Médicas: coordina traslado y destino.' },
      ],
      flashcards: [
        { frente: '¿Qué regula la NOM-034-SSA3-2013?', reverso: 'La atención médica prehospitalaria y la tipificación de ambulancias en México.' },
        { frente: 'Diferencia entre negligencia e impericia', reverso: 'Negligencia = no hacer lo debido (omisión); impericia = falta de destreza o conocimiento.' },
        { frente: '¿Por qué es vital el FRAP?', reverso: 'Es el documento médico-legal con valor probatorio: "lo que no se escribió, no se hizo".' },
        { frente: '¿En qué envase van los punzocortantes (NOM-087)?', reverso: 'Recipiente rígido rojo, nunca en bolsa; no se reencapuchan agujas.' },
        { frente: 'Color de bolsa para residuos patológicos (tejidos/órganos)', reverso: 'Amarilla.' },
        { frente: '¿Qué hace el CRUM?', reverso: 'Regula y coordina el traslado y asigna el hospital con capacidad resolutiva.' },
      ],
      quiz: [
        {
          pregunta: 'Un paramédico inicia la atención de un paciente y luego lo deja sin transferirlo a personal de igual o mayor nivel. Esto constituye:',
          opciones: ['Consentimiento implícito', 'Abandono', 'Impericia', 'Buena práctica'],
          correcta: 1,
          explicacion: 'Suspender la atención ya iniciada sin transferencia adecuada es abandono, una falta médico-legal.',
        },
        {
          pregunta: 'Según la NOM-087, una aguja usada debe desecharse en:',
          opciones: ['Bolsa roja', 'Bolsa amarilla', 'Recipiente rígido rojo', 'Bolsa negra de basura común'],
          correcta: 2,
          explicacion: 'Los punzocortantes van en contenedor rígido rojo rotulado como RPBI; nunca en bolsa.',
        },
        {
          pregunta: 'Intentar un procedimiento para el cual no se tiene capacitación es un ejemplo de:',
          opciones: ['Negligencia', 'Impericia', 'Imprudencia', 'Consentimiento'],
          correcta: 1,
          explicacion: 'Actuar sin la pericia o el conocimiento necesarios es impericia.',
        },
        {
          pregunta: 'Ante una urgencia que pone en peligro la vida, la Ley General de Salud establece que la atención:',
          opciones: ['Puede condicionarse a pago previo', 'No puede negarse ni condicionarse', 'Solo aplica en hospitales privados', 'Es opcional'],
          correcta: 1,
          explicacion: 'La atención de la urgencia es obligatoria y no puede condicionarse a pago; negarla puede ser delito.',
        },
      ],
    },

    // ===================================================================
    // 7.2 — Operaciones Especiales, Triage Táctico y Bienestar
    // ===================================================================
    {
      id: 'operaciones-especiales-tactica-bienestar',
      numero: '7.2',
      titulo: 'Operaciones Especiales, Táctica y Bienestar',
      icono: '🎯',
      duracion: '50 min',
      resumen:
        'Los incidentes complejos exigen estructura: el Sistema de Comando de Incidentes organiza la respuesta, el TECC adapta la medicina de combate al entorno civil de alta amenaza, el manejo HazMat protege al rescatador y la salud mental sostiene al equipo a largo plazo.',
      objetivos: [
        'Describir la estructura básica del Sistema de Comando de Incidentes (SCI).',
        'Aplicar las fases del TECC y el algoritmo MARCH por zona de amenaza.',
        'Reconocer las zonas de control en un incidente HazMat y las precauciones de traslado infectocontagioso.',
        'Identificar la fisiología del transporte aeromédico y las estrategias de bienestar del personal.',
      ],
      secciones: [
        {
          titulo: 'Sistema de Comando de Incidentes (SCI)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El Sistema de Comando de Incidentes (SCI/ICS) es la estructura estandarizada para organizar la respuesta a cualquier incidente, pequeño o grande. Permite una cadena de mando única, lenguaje común y crecimiento modular según la magnitud. El primer respondiente capacitado en llegar asume el comando hasta ser relevado.',
            },
            {
              tipo: 'lista',
              titulo: 'Las cinco funciones del SCI',
              items: [
                'Comando: dirige el incidente, fija objetivos y seguridad.',
                'Operaciones: ejecuta las acciones tácticas (rescate, atención, extinción).',
                'Planeación: reúne información y elabora el plan de acción del incidente.',
                'Logística: provee recursos, personal, equipo y suministros.',
                'Administración y finanzas: controla costos, contratos y documentación.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Tramo de control',
              texto:
                'Cada responsable debe supervisar idealmente de 3 a 7 personas (tramo de control). Si se excede, la estructura se subdivide. En incidentes con múltiples víctimas, el SCI se integra con el triage (START/JumpSTART) y el Puesto Médico Avanzado.',
            },
          ],
        },
        {
          titulo: 'Medicina Táctica Civil (TECC)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El TECC (Tactical Emergency Casualty Care) adapta los principios militares del TCCC al entorno civil de alta amenaza (tiroteos activos, atentados, disturbios). Organiza la atención en tres fases que corresponden a tres zonas de riesgo.',
            },
            {
              tipo: 'pasos',
              titulo: 'Las tres fases del TECC',
              items: [
                'Amenaza directa (zona caliente): la amenaza sigue activa. Prioridad: neutralizar/evadir la amenaza, mover a la víctima a cubierto y controlar SOLO la hemorragia masiva con torniquete.',
                'Amenaza indirecta (zona templada): amenaza reducida pero presente. Se aplica el algoritmo MARCH de forma rápida.',
                'Evacuación (zona fría): traslado a la atención definitiva, reevaluando intervenciones y previniendo la hipotermia.',
              ],
            },
            {
              tipo: 'tabla',
              titulo: 'Algoritmo MARCH',
              headers: ['Letra', 'Prioridad'],
              filas: [
                ['M — Massive hemorrhage', 'Hemorragia masiva: torniquete, empaquetamiento'],
                ['A — Airway', 'Vía aérea: posición, cánulas, supraglóticos'],
                ['R — Respirations', 'Respiración: descompresión de neumotórax, sello de tórax'],
                ['C — Circulation', 'Circulación: accesos, control de hemorragia, TXA'],
                ['H — Head / Hypothermia', 'TCE y prevención de hipotermia'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'En la zona caliente, solo lo que mata en minutos',
              texto:
                'Bajo amenaza directa NO se hace evaluación completa: la hemorragia exanguinante es la única causa que se trata (torniquete) antes de mover a la víctima a un lugar seguro. La mejor medicina táctica es la superioridad de la fuerza y la cobertura.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Fases del TECC y zonas de amenaza',
              caption: 'Fases del TECC (zona caliente, templada y fría) y el algoritmo MARCH.',
              busqueda: 'TECC phases hot warm cold zone MARCH algorithm diagram',
            },
          ],
        },
        {
          titulo: 'Incidentes HazMat (materiales peligrosos)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'En un incidente con materiales peligrosos, el rescatador puede convertirse en víctima. El principio rector es no entrar sin equipo de protección y sin descontaminación: se trabaja desde una distancia segura, a favor del viento y cuesta arriba del derrame.',
            },
            {
              tipo: 'tabla',
              titulo: 'Zonas de control HazMat',
              headers: ['Zona', 'Color', 'Quién y qué'],
              filas: [
                ['Caliente (exclusión)', 'Roja', 'Solo personal con EPP; contacto con el material'],
                ['Templada (reducción)', 'Amarilla', 'Corredor de descontaminación'],
                ['Fría (apoyo)', 'Verde', 'Triage, atención médica y comando'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Identificar antes de actuar',
              texto:
                'Usa la Guía de Respuesta en Caso de Emergencia (GRE/ERG), las placas de identificación (rombo NFPA 704, número ONU) y binoculares para reconocer el material a distancia. La descontaminación precede a la atención médica avanzada: un paciente contaminado contamina la ambulancia y al equipo.',
            },
          ],
        },
        {
          titulo: 'Traslado de pacientes infectocontagiosos',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'Precauciones esenciales',
              items: [
                'Equipo de protección personal según la vía de transmisión (contacto, gotas, aérea).',
                'Mascarilla al paciente cuando la transmisión es por gotas o aérea; aislar al personal no esencial.',
                'Ventilación de la unidad y desinfección posterior según protocolo.',
                'Notificación al hospital receptor para que prepare el aislamiento antes del arribo.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'La protección del equipo es parte de la atención',
              texto:
                'Un rescatador enfermo es un recurso menos. El uso correcto del EPP, la higiene de manos y la descontaminación de la unidad no son opcionales: son parte del estándar de cuidado.',
            },
          ],
        },
        {
          titulo: 'Aeromedicina de evacuación',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El transporte aeromédico acorta tiempos hacia el centro definitivo, pero impone una fisiología propia: con la altitud baja la presión barométrica y los gases se expanden (ley de Boyle), lo que afecta cavidades cerradas.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'El gas se expande con la altitud',
              texto:
                'Un neumotórax pequeño puede volverse a tensión, el aire del manguito del tubo endotraqueal y de las férulas neumáticas se expande, y el oído y el intestino se distienden. Anticipa: descomprime el neumotórax antes de volar, vigila presiones de manguito y considera la altitud de vuelo.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Seguridad alrededor de la aeronave',
              texto:
                'Aproxímate solo por el frente y a la vista del piloto, nunca por la cola (rotor de cola). En terreno inclinado, acércate por el lado cuesta abajo. Asegura objetos sueltos: el rotor genera viento intenso.',
            },
          ],
        },
        {
          titulo: 'Psicología de emergencias y bienestar',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La exposición repetida al sufrimiento, la muerte y los incidentes críticos desgasta al personal. Reconocer el estrés por incidente crítico y cuidar la salud mental es tan profesional como dominar una técnica.',
            },
            {
              tipo: 'lista',
              titulo: 'Herramientas de cuidado',
              items: [
                'Defusing: conversación breve e informal en las horas siguientes a un evento difícil.',
                'Debriefing: revisión estructurada en grupo, días después, para procesar el incidente.',
                'Reconocer señales de alarma: insomnio, irritabilidad, intrusiones, aislamiento, consumo de sustancias.',
                'Buscar ayuda profesional sin estigma; el burnout y el estrés postraumático son lesiones, no debilidades.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Cuídate para poder cuidar',
              texto:
                'El bienestar del paramédico (sueño, alimentación, red de apoyo, descarga emocional) sostiene la calidad de la atención a lo largo de la carrera. Un sistema que cuida a su gente retiene a sus mejores rescatadores.',
            },
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'C-TECC — Guías de Tactical Emergency Casualty Care', url: 'https://www.c-tecc.org/guidelines' },
                { nombre: 'FEMA — Incident Command System (ICS)', url: 'https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c' },
                { nombre: 'Guía de Respuesta en Caso de Emergencia (GRE/ERG)', url: 'https://www.gob.mx/sct', nota: 'Identificación de materiales peligrosos' },
                { nombre: 'NAEMT — TECC y bienestar del proveedor', url: 'https://www.naemt.org/', nota: 'Cursos de medicina táctica y salud mental' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'SCI', definicion: 'Sistema de Comando de Incidentes: estructura modular con mando único y cinco funciones.' },
        { termino: 'TECC', definicion: 'Medicina táctica civil en tres fases: amenaza directa (caliente), indirecta (templada) y evacuación (fría).' },
        { termino: 'MARCH', definicion: 'Hemorragia masiva, vía Aérea, Respiración, Circulación, cabeza/Hipotermia.' },
        { termino: 'Zonas HazMat', definicion: 'Caliente (roja), templada (amarilla, descontaminación) y fría (verde, atención).' },
        { termino: 'Ley de Boyle en vuelo', definicion: 'Con la altitud el gas se expande: riesgo de neumotórax a tensión y distensión de cavidades.' },
        { termino: 'Defusing/Debriefing', definicion: 'Intervenciones de descarga emocional tras incidentes críticos.' },
      ],
      flashcards: [
        { frente: 'Las cinco funciones del SCI', reverso: 'Comando, Operaciones, Planeación, Logística, y Administración/Finanzas.' },
        { frente: '¿Qué se trata en la zona caliente del TECC?', reverso: 'Solo la hemorragia masiva (torniquete), antes de mover a la víctima a cubierto.' },
        { frente: '¿Qué significa MARCH?', reverso: 'Massive hemorrhage, Airway, Respirations, Circulation, Head/Hypothermia.' },
        { frente: 'Color de la zona de descontaminación HazMat', reverso: 'Amarilla (zona templada).' },
        { frente: '¿Por qué es peligroso volar con un neumotórax?', reverso: 'Con la altitud el gas se expande (Boyle) y puede convertirse en neumotórax a tensión.' },
        { frente: 'Diferencia entre defusing y debriefing', reverso: 'Defusing: charla breve e inmediata; debriefing: revisión estructurada días después.' },
      ],
      quiz: [
        {
          pregunta: 'En la fase de amenaza directa del TECC (zona caliente), la única intervención médica prioritaria es:',
          opciones: ['Intubar', 'Controlar la hemorragia masiva con torniquete', 'Canalizar dos vías', 'Inmovilizar la columna'],
          correcta: 1,
          explicacion: 'Bajo amenaza directa solo se controla la hemorragia exanguinante (torniquete) y se mueve a la víctima a cubierto.',
        },
        {
          pregunta: 'La "R" del algoritmo MARCH corresponde a:',
          opciones: ['Reanimación cardiopulmonar', 'Respiración (neumotórax, sello de tórax)', 'Radio/comunicaciones', 'Retiro de ropa'],
          correcta: 1,
          explicacion: 'R = Respirations: tratar el neumotórax (descompresión) y las heridas torácicas con sello.',
        },
        {
          pregunta: 'En un incidente HazMat, la atención médica avanzada del paciente se realiza:',
          opciones: ['En la zona caliente, de inmediato', 'Tras la descontaminación, en la zona fría', 'Dentro del derrame', 'No se atiende'],
          correcta: 1,
          explicacion: 'Primero se descontamina (zona templada) y luego se atiende en la zona fría; un paciente contaminado contamina al equipo.',
        },
        {
          pregunta: 'Al aproximarse a un helicóptero, lo correcto es:',
          opciones: ['Acercarse por la cola', 'Acercarse por el frente, a la vista del piloto', 'Correr agachado por cualquier lado', 'Esperar a que apaguen el rotor siempre'],
          correcta: 1,
          explicacion: 'Siempre por el frente y a la vista del piloto, nunca por la cola (rotor de cola); en pendiente, por el lado cuesta abajo.',
        },
      ],
    },

    // ===================================================================
    // Llenado del FRAP
    // ===================================================================
    {
      id: 'llenado-frap',
      titulo: 'Llenado del FRAP',
      icono: '📝',
      duracion: '40 min',
      resumen:
        'El FRAP no es papeleo: es el registro médico-legal de todo lo que hiciste y es tu principal defensa. Llenarlo completo, cronológico, legible y sin alteraciones protege al paciente y al paramédico. Se elabora un FRAP por cada paciente atendido.',
      objetivos: [
        'Enumerar las secciones del FRAP y qué información va en cada una.',
        'Registrar la cronología del servicio y los signos vitales seriados con su hora.',
        'Documentar correctamente una negativa de atención (rechazo informado).',
        'Corregir un error en el FRAP sin invalidar su valor probatorio.',
      ],
      secciones: [
        {
          titulo: '¿Qué es el FRAP y cuándo se llena?',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El Formato de Registro de Atención Prehospitalaria (FRAP) es el documento que respalda legalmente toda la atención brindada. Registra quién, cuándo, qué se encontró, qué se hizo y cómo evolucionó el paciente hasta la transferencia. La NOM-034 obliga a documentar la atención: el FRAP se llena durante o inmediatamente después del servicio, mientras la información está fresca.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Un FRAP por cada paciente',
              texto:
                'Cada paciente atendido genera su propio formato, aunque provengan del mismo incidente. En incidentes con múltiples víctimas se usan tarjetas de triage y registros condensados, pero cada persona conserva su identidad y su registro.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Lo que no se escribió, no se hizo',
              texto:
                'El FRAP se llena con letra legible, con tinta, sin espacios en blanco y sin alteraciones. Un procedimiento que se realizó pero no se documentó, ante un juez, no ocurrió. Un FRAP completo protege; uno incompleto o alterado condena.',
            },
          ],
        },
        {
          titulo: 'Las secciones del FRAP',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Qué va en cada parte del formato',
              headers: ['Sección', 'Qué se registra'],
              filas: [
                ['Datos del servicio y cronología', 'Folio, fecha, unidad, tripulación y las horas del servicio (llamada, salida, arribos y disponibilidad).'],
                ['Datos del paciente', 'Nombre, edad, sexo, domicilio y quién lo refiere o acompaña.'],
                ['Causa / motivo', 'Origen clínico o traumático; agente causal y mecanismo de lesión.'],
                ['Evaluación primaria', 'XABCDE y estado de conciencia (AVDI y/o Glasgow).'],
                ['Evaluación secundaria', 'Hallazgos por segmentos y localización de lesiones (esquema corporal).'],
                ['Signos vitales', 'Tomas seriadas, cada una con su hora.'],
                ['Antecedentes (SAMPLE)', 'Signos/síntomas, Alergias, Medicamentos, Padecimientos previos, Última ingesta, Eventos.'],
                ['Tratamiento / manejo', 'Oxígeno, inmovilización, medicamentos (dosis, vía y hora) y procedimientos.'],
                ['Evolución y traslado', 'Cambios en el estado, hospital destino y condición en la entrega.'],
                ['Negativa / entrega-recepción', 'Firma de rechazo informado o de recepción por el hospital.'],
              ],
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Formato FRAP de atención prehospitalaria',
              caption: 'Ejemplo de FRAP con sus secciones: cronología, evaluación, signos vitales y manejo.',
              busqueda: 'formato FRAP registro atencion prehospitalaria Mexico ejemplo',
            },
          ],
        },
        {
          titulo: 'Cronología: la línea del tiempo del servicio',
          bloques: [
            {
              tipo: 'pasos',
              titulo: 'Horas que debes registrar',
              items: [
                'Recepción de la llamada (cuándo se activó el servicio).',
                'Salida de la base o unidad hacia la escena.',
                'Arribo a la escena.',
                'Contacto con el paciente (arribo al paciente).',
                'Salida de la escena hacia el hospital.',
                'Arribo al hospital.',
                'Disponibilidad de la unidad (fin del servicio).',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Signos vitales seriados',
              texto:
                'Registra al menos dos tomas de signos vitales: la inicial y una previa a la entrega. En el paciente inestable, cada 5 minutos; en el estable, cada 15. Cada toma con su hora: la tendencia (si mejora o empeora) tiene más valor clínico y legal que un dato aislado.',
            },
          ],
        },
        {
          titulo: 'SAMPLE y el registro de la evaluación',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'El interrogatorio SAMPLE',
              items: [
                'S — Signos y síntomas que presenta el paciente.',
                'A — Alergias (medicamentos, alimentos, ambientales).',
                'M — Medicamentos que toma (y última dosis).',
                'P — Padecimientos y antecedentes médicos/quirúrgicos.',
                'L — Última ingesta de alimento o líquido (por sus siglas en inglés, "Last meal").',
                'E — Eventos previos: qué estaba haciendo cuando inició el problema.',
              ],
            },
            {
              tipo: 'p',
              texto:
                'Documenta los hallazgos de forma objetiva y describible: "herida de 3 cm en región parietal derecha con sangrado activo" comunica más que "golpe en la cabeza". Anota lo que observas y mides, no interpretaciones ni diagnósticos que no te corresponden.',
            },
          ],
        },
        {
          titulo: 'Errores, correcciones y valor legal',
          bloques: [
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Cómo se corrige un error',
              texto:
                'Nunca borres ni uses corrector. El error se tacha con UNA sola línea que permita seguir leyendo lo escrito, se anota la corrección y se rubrica. Los espacios en blanco se cancelan con una línea para que nadie agregue información después. Cualquier alteración (borrones, tachones ilegibles, hojas rehechas) destruye el valor probatorio del formato.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Objetivo y sin juicios',
              texto:
                'El FRAP es un documento técnico, no un espacio para opiniones sobre el paciente o terceros. Registra hechos, horas y datos medibles. Anotaciones despectivas o subjetivas pueden volverse en tu contra.',
            },
          ],
        },
        {
          titulo: 'Negativa de atención (rechazo informado)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Un paciente adulto, consciente y competente tiene derecho a rechazar la atención o el traslado. Para que la negativa sea válida y te proteja, debe quedar documentada correctamente en el FRAP.',
            },
            {
              tipo: 'pasos',
              titulo: 'Cómo documentar un rechazo',
              items: [
                'Verifica la capacidad: paciente orientado, sin alteración por alcohol, drogas, hipoxia o TCE.',
                'Explica en términos claros los riesgos de no recibir atención, incluida la posibilidad de muerte o daño grave.',
                'Ofrece alternativas (llamar de nuevo, acudir por medios propios) y respóndele sus dudas.',
                'Registra que se informó y que el paciente comprendió; obtén su firma y, de ser posible, la de un testigo.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Si no puede decidir, no hay rechazo válido',
              texto:
                'Un paciente con estado de conciencia alterado, un menor sin tutor o una persona incapaz de comprender los riesgos NO puede rechazar válidamente la atención: opera el consentimiento implícito y se procede a atender.',
            },
          ],
        },
        {
          titulo: 'Entrega-recepción y cierre',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La atención termina con una transferencia formal a personal de igual o mayor nivel. Da un reporte estructurado (motivo, hallazgos, manejo y evolución) y registra en el FRAP el nombre y cargo de quien recibe, el hospital y la hora de entrega, con su firma. Sin esa transferencia documentada, la responsabilidad sigue siendo tuya.',
            },
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'NOM-034-SSA3-2013 (texto oficial, PDF)', url: 'https://salud.guanajuato.gob.mx/download/Normatividad/Normas/NOM_034_SSA3_2013.pdf' },
                { nombre: 'Ley General de Salud (Cámara de Diputados, PDF)', url: 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'FRAP', definicion: 'Formato de Registro de Atención Prehospitalaria; documento médico-legal, uno por paciente.' },
        { termino: 'Cronología del servicio', definicion: 'Horas de llamada, salida, arribos, salida a hospital y disponibilidad de la unidad.' },
        { termino: 'Signos vitales seriados', definicion: 'Varias tomas con su hora (5 min en inestable, 15 en estable) para mostrar la tendencia.' },
        { termino: 'SAMPLE', definicion: 'Signos/síntomas, Alergias, Medicamentos, Padecimientos, Última ingesta, Eventos.' },
        { termino: 'Rechazo informado', definicion: 'Negativa de un paciente competente, tras explicarle los riesgos, con firma suya y de testigo.' },
        { termino: 'Corrección válida', definicion: 'Tachar con una línea legible, anotar la corrección y rubricar; nunca borrar ni usar corrector.' },
      ],
      flashcards: [
        { frente: '¿Cuántos FRAP se llenan por incidente?', reverso: 'Uno por cada paciente atendido, aunque provengan del mismo incidente.' },
        { frente: '¿Cómo se corrige un error en el FRAP?', reverso: 'Se tacha con una sola línea legible, se anota la corrección y se rubrica; nunca se borra ni se usa corrector.' },
        { frente: '¿Qué significa SAMPLE?', reverso: 'Signos/síntomas, Alergias, Medicamentos, Padecimientos previos, Última ingesta y Eventos.' },
        { frente: '¿Cada cuánto se toman signos vitales en un paciente inestable?', reverso: 'Cada 5 minutos (cada 15 si está estable), y cada toma con su hora.' },
        { frente: '¿Qué se requiere para una negativa de atención válida?', reverso: 'Paciente competente, riesgos explicados y comprendidos, y firma del paciente (y testigo si es posible).' },
        { frente: '¿Qué se registra en la entrega-recepción?', reverso: 'Nombre y cargo de quien recibe, hospital, hora de entrega y su firma.' },
      ],
      quiz: [
        {
          pregunta: 'Al cometer un error de escritura en el FRAP, lo correcto es:',
          opciones: [
            'Borrarlo con corrector y escribir encima',
            'Tacharlo con una línea legible, corregir y rubricar',
            'Rehacer toda la hoja',
            'Dejarlo tal cual para no alterar el documento',
          ],
          correcta: 1,
          explicacion: 'El error se tacha con una sola línea que deje leer lo escrito, se corrige y se rubrica; borrar o usar corrector invalida el valor legal.',
        },
        {
          pregunta: 'Para que la negativa de atención de un paciente sea válida, este debe:',
          opciones: [
            'Estar consciente, orientado y competente',
            'Ser menor de edad',
            'Estar bajo efecto de alcohol',
            'Tener el estado de conciencia alterado',
          ],
          correcta: 0,
          explicacion: 'Solo un paciente competente (orientado, sin alteración por sustancias, hipoxia o TCE) puede rechazar válidamente la atención.',
        },
        {
          pregunta: '¿Por qué se registran signos vitales seriados y no una sola toma?',
          opciones: [
            'Por norma de llenar espacios',
            'Para mostrar la tendencia (si mejora o empeora) del paciente',
            'Porque una sola toma es ilegal',
            'Para justificar el tiempo en escena',
          ],
          correcta: 1,
          explicacion: 'La tendencia de los signos vitales tiene más valor clínico y legal que un dato aislado.',
        },
        {
          pregunta: 'Los espacios en blanco del FRAP deben:',
          opciones: [
            'Dejarse por si se necesita agregar algo',
            'Cancelarse con una línea para impedir agregados posteriores',
            'Llenarse con "N/A" a lápiz',
            'Recortarse de la hoja',
          ],
          correcta: 1,
          explicacion: 'Cancelar los espacios en blanco con una línea evita que se añada información después de firmado el formato.',
        },
      ],
    },
  ],
}
