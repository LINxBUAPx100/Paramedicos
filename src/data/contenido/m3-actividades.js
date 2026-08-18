// ============================================================
//  Módulo 3 · Actividades añadidas a lecciones ya redactadas
// ------------------------------------------------------------
//  Las 33 lecciones del Módulo 3 estaban redactadas y en revisión, pero 17 de
//  ellas no tenían actividad. Esa deuda quedó enumerada en
//  `docs/ESTADO-PRODUCCION-ACELERADA.md`.
//
//  Este archivo la resuelve SIN TOCAR nada más. Aporta únicamente el campo
//  `actividades` de cada tema, y el punto de unión de `contenido/index.js`
//  fusiona POR CAMPO: el texto, las secciones, los conceptos, las tarjetas, el
//  quiz, las fuentes y la ficha editorial de cada lección siguen viniendo de su
//  archivo original y no se reescriben ni se degradan.
//
//  CRITERIO DE CADA ACTIVIDAD
//
//  · Se deriva EXCLUSIVAMENTE de lo que su propia lección enseña. Cada opción
//    correcta usa vocabulario que aparece en el texto del tema.
//  · No repite ninguna pregunta del quiz de la lección.
//  · `ordenar` se usa solo donde la lección describe una secuencia real ya
//    enseñada —una técnica paso a paso o un orden de prioridades—, nunca para
//    barajar una lista sin orden propio.
//  · En los temas con BLOQUEO PARCIAL declarado —secuencia rápida, dispositivos
//    de oxigenoterapia, cristaloides, acceso intraóseo, obturador esofágico y
//    tamaños de tubo— la actividad respeta el bloqueo: no introduce dosis,
//    flujos, calibres por edad ni autorización para ejecutar el procedimiento.
//    Donde el tema declara una decisión pendiente de la academia, la actividad
//    evalúa precisamente que el alumno sepa que ese dato lo fija el protocolo.
//
//  Ninguna actividad de este archivo procede de `reutilizado.js`.
// ============================================================

// Atajo: una sola frase de completar, que es el formato dominante aquí porque
// obliga a elegir el término exacto dentro de una relación causal.
const c = (texto, opciones, correcta, explicacion) => ({ texto, opciones, correcta, explicacion })

export default {
  // ---------- Evaluación primaria ----------

  'm3-ep-sss': {
    actividades: {
      completar: [
        c(
          'La ese que pregunta «¿puedo acercarme sin convertirme en la siguiente víctima?» es la de ___.',
          ['Escena', 'Seguridad', 'Situación', 'Signos'], 1,
          'Seguridad responde por el riesgo propio; Escena pregunta qué ocurrió y Situación cuántos pacientes hay y qué se necesita.'
        ),
        c(
          'Determinar cuántos pacientes hay y qué recursos adicionales se requieren corresponde a la ese de ___.',
          ['Seguridad', 'Situación', 'Escena', 'Soporte'], 1,
          'Es la tercera pregunta de la valoración de la escena y la que detecta una situación de múltiples víctimas.'
        ),
        c(
          'La forma en que la energía se transfirió al paciente, que orienta qué lesiones buscar, se llama ___.',
          ['equipo de protección personal', 'mecanismo de lesión', 'valoración de la escena', 'exploración dirigida'], 1,
          'Se recoge dentro de la ese de Escena y es información que solo el primer equipo puede observar.'
        ),
        c(
          'Cuando el número de pacientes supera los recursos inmediatos disponibles se está ante una situación de ___.',
          ['exploración dirigida', 'múltiples víctimas', 'mecanismo de lesión', 'shock compensado'], 1,
          'Detectarlo es una de las razones por las que la ese de Situación se responde antes de tocar al primer paciente.'
        ),
      ],
    },
  },

  'm3-ep-avdi': {
    actividades: {
      completar: [
        c(
          'Un paciente que abre los ojos espontáneamente e interactúa se clasifica en la categoría ___ de AVDI.',
          ['Verbal', 'Alerta', 'Dolor', 'Inconsciente'], 1,
          'Es la primera de las cuatro categorías de la escala.'
        ),
        c(
          'La presión firme y breve en un punto no lesionado, retirada en cuanto aparece respuesta, se llama ___.',
          ['exploración dirigida', 'estímulo doloroso controlado', 'valoración de la escena', 'orientación'], 1,
          'Es la forma correcta de explorar la categoría de Dolor sin causar daño.'
        ),
        c(
          'El conocimiento de persona, lugar y tiempo se llama ___ y se explora y se registra APARTE de la categoría de AVDI.',
          ['alerta', 'orientación', 'déficit motor', 'anisocoria'], 1,
          'Un paciente puede estar alerta y a la vez desorientado: son dos datos distintos y por eso se registran por separado.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Un paciente abre los ojos y responde, pero no sabe en qué mes está ni dónde se encuentra. ¿Cómo lo registras?',
          opciones: [
            'Como categoría Verbal de AVDI, porque no está orientado.',
            'Como Alerta en AVDI y, aparte, la alteración de la orientación.',
            'Como categoría Dolor, hasta comprobar la orientación.',
            'Como Inconsciente, porque la información que da no es fiable.',
          ],
          correcta: 1,
          explicacion: 'Alerta describe que abre los ojos espontáneamente e interactúa; la orientación es un dato distinto que se explora y se registra aparte.',
        },
      ],
    },
  },

  'm3-ep-respiracion': {
    actividades: {
      completar: [
        c(
          'Una respiración lenta, ruidosa e ineficaz que no moviliza volumen útil se llama respiración ___ y exige asistir la ventilación.',
          ['paradójica', 'agónica', 'superficial', 'entrecortada'], 1,
          'No es una respiración que se pueda dejar evolucionar: no produce ventilación eficaz.'
        ),
        c(
          'Que una parte del tórax se hunda cuando el resto se expande describe un movimiento ___.',
          ['agónico', 'paradójico', 'simétrico', 'compensador'], 1,
          'Es un hallazgo que cambia la conducta de inmediato.'
        ),
        c(
          'Tener la vía aérea abierta no garantiza ___ eficaz: son dos comprobaciones distintas y la segunda se hace siempre.',
          ['protección personal', 'ventilación', 'perfusión', 'orientación'], 1,
          'Es la idea que da título a la primera sección de la lección.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Compruebas que la vía aérea está permeable y decides pasar a la circulación sin valorar la ventilación. ¿Qué error cometes?',
          opciones: [
            'Ninguno: una vía aérea abierta implica ventilación eficaz.',
            'Confundir dos comprobaciones distintas: una vía aérea abierta no garantiza que el paciente movilice volumen útil.',
            'Adelantarte a la exploración dirigida.',
            'Omitir la valoración de la escena.',
          ],
          correcta: 1,
          explicacion: 'La lección separa expresamente vía aérea abierta de ventilación eficaz, y por eso la segunda se comprueba siempre.',
        },
      ],
    },
  },

  'm3-ep-circulacion': {
    actividades: {
      ordenar: {
        titulo: 'Ordena las prioridades de la letra C tal como las enseña la lección',
        pasos: [
          'Buscar y controlar la hemorragia exanguinante antes que cualquier otra cosa',
          'Valorar el pulso: presencia, localización, frecuencia, ritmo y amplitud',
          'Valorar la piel: color, temperatura y humedad',
          'Valorar el estado mental como signo de perfusión',
          'Valorar el llenado capilar como dato complementario',
          'Intervenir según el hallazgo y reevaluar el efecto',
        ],
      },
      completar: [
        c(
          'La piel pálida, fría y húmeda es un signo precoz de vasoconstricción ___ ante hipoperfusión.',
          ['patológica', 'compensadora', 'refleja del dolor', 'térmica'], 1,
          'Aparece antes de que la presión arterial descienda.'
        ),
        c(
          'La hipoperfusión con presión arterial todavía mantenida por mecanismos compensadores se llama shock ___.',
          ['descompensado', 'compensado', 'oculto', 'exanguinante'], 1,
          'Reconocerlo en esa fase es el objetivo de valorar la perfusión y no solo la presión.'
        ),
        c(
          'Un sangrado en tórax, abdomen, retroperitoneo, pelvis o huesos largos que no se ve desde fuera es una hemorragia ___.',
          ['exanguinante', 'oculta', 'compensada', 'capilar'], 1,
          'Por eso la ausencia de sangre visible no descarta una pérdida importante.'
        ),
      ],
    },
  },

  'm3-ep-neurologica': {
    actividades: {
      completar: [
        c(
          'La diferencia de tamaño entre ambas pupilas se llama ___.',
          ['midriasis', 'anisocoria', 'déficit motor', 'orientación'], 1,
          'Es uno de los hallazgos que se registran en la letra D.'
        ),
        c(
          'Antes de atribuir al cerebro una alteración del estado mental hay que considerar ___ que la expliquen.',
          ['la edad del paciente', 'causas no neurológicas', 'el mecanismo de lesión', 'la exploración dirigida'], 1,
          'La lección dedica una sección entera a esa comprobación previa.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Encuentras a un paciente confuso y desorientado. ¿Qué te obliga a comprobar la lección antes de atribuirlo a una causa neurológica?',
          opciones: [
            'La escala de coma de Glasgow exclusivamente.',
            'Que existan causas no neurológicas capaces de explicar esa alteración del estado mental.',
            'La simetría de las pupilas antes que cualquier otra cosa.',
            'La presencia de déficit motor en las cuatro extremidades.',
          ],
          correcta: 1,
          explicacion: 'La lección incluye expresamente el paso «antes de atribuirlo al cerebro», que consiste en considerar causas no neurológicas.',
        },
        {
          pregunta: 'Durante la letra D registras anisocoria y un déficit motor de un lado. ¿Qué valor tiene registrar ambos con la hora?',
          opciones: [
            'Ninguno: son hallazgos estáticos.',
            'Permite demostrar después si evolucionaron, que es lo que aporta información al equipo receptor.',
            'Sustituye a la reevaluación posterior.',
            'Permite establecer el diagnóstico en la escena.',
          ],
          correcta: 1,
          explicacion: 'La utilidad de estos hallazgos está en su evolución, y sin la hora no puede demostrarse un cambio.',
        },
      ],
    },
  },

  'm3-ep-exploracion-dirigida': {
    actividades: {
      completar: [
        c(
          'La exploración que busca respuestas a preguntas concretas ya planteadas por la evaluación es la exploración ___.',
          ['detallada', 'dirigida', 'primaria', 'secundaria'], 1,
          'La detallada es sistemática y de cabeza a pies; la dirigida se orienta por lo que ya se sospecha.'
        ),
        c(
          'Exponer al paciente para explorarlo obliga a prevenir la ___, que agrava el pronóstico del paciente traumatizado.',
          ['infección', 'hipotermia', 'deshidratación', 'anisocoria'], 1,
          'Es la razón por la que la exposición se limita a lo necesario y se cubre de inmediato.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Vas a exponer el tórax de una paciente en la vía pública para explorarlo. ¿Qué exige la lección?',
          opciones: [
            'Exponer por completo y de forma prolongada para no perder hallazgos.',
            'Exponer lo necesario, preservar la intimidad y cubrir de inmediato para prevenir la hipotermia.',
            'Posponer la exploración hasta llegar al hospital.',
            'Exponer solo si el paciente lo autoriza por escrito.',
          ],
          correcta: 1,
          explicacion: 'La lección trata la exposición y el respeto como parte de la técnica, junto con la prevención de la hipotermia.',
        },
      ],
    },
  },

  'm3-es-abcde': {
    actividades: {
      completar: [
        c(
          'La búsqueda y el tratamiento de amenazas vitales siguiendo un orden de prioridades es la evaluación ___.',
          ['secundaria', 'primaria', 'dirigida', 'detallada'], 1,
          'La secundaria busca después lo que no amenaza la vida de inmediato.'
        ),
        c(
          'La información clínica esencial que se obtiene con la nemotecnia SAMPLE se llama historia ___.',
          ['completa', 'orientada', 'dirigida', 'secundaria'], 1,
          'Se recoge dentro de la evaluación y no como un trámite posterior.'
        ),
        c(
          'La repetición periódica de la valoración, obligada después de cada intervención, es la ___.',
          ['exploración detallada', 'reevaluación', 'evaluación primaria', 'historia orientada'], 1,
          'Es lo que convierte una intervención aplicada en una intervención comprobada.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Un compañero sostiene que la evaluación secundaria usa un orden distinto al de la primaria. ¿Qué respondes según la lección?',
          opciones: [
            'Que tiene razón: la secundaria invierte el orden.',
            'Que ambas siguen el MISMO orden de letras; lo que cambia es lo que se añade en cada una.',
            'Que la secundaria omite las letras D y E.',
            'Que la primaria no tiene orden establecido.',
          ],
          correcta: 1,
          explicacion: 'La lección se titula «Dos evaluaciones, un mismo orden» y compara letra por letra qué añade la secundaria.',
        },
      ],
    },
  },

  // ---------- Manejo de la vía aérea ----------

  'm3-va-levantamiento-menton': {
    actividades: {
      ordenar: {
        titulo: 'Ordena la técnica del levantamiento del mentón tal como la enseña la lección',
        pasos: [
          'Colocar al paciente en decúbito supino sobre una superficie firme',
          'Situarse a un lado de la cabeza',
          'Apoyar las yemas de los dedos índice y medio bajo la porción ósea del mentón',
          'Elevar el mentón hacia arriba y hacia delante',
          'Mantener la boca ligeramente entreabierta',
          'Comprobar el resultado mirando el tórax, escuchando y sintiendo',
        ],
      },
      completar: [
        c(
          'Los dedos se apoyan bajo la porción ___ del mentón, no sobre los tejidos blandos.',
          ['muscular', 'ósea', 'cartilaginosa', 'submandibular'], 1,
          'Apoyar sobre tejido blando desplaza los dedos y no eleva la mandíbula.'
        ),
        c(
          'La maniobra resuelve la obstrucción producida por la ___ al desplazarse hacia atrás.',
          ['epiglotis', 'lengua', 'úvula', 'tráquea'], 1,
          'Es el problema que esta maniobra viene a corregir.'
        ),
      ],
    },
  },

  'm3-va-menton-inclinacion': {
    actividades: {
      ordenar: {
        titulo: 'Ordena la maniobra frente-mentón según la técnica enseñada',
        pasos: [
          'Confirmar que no hay mecanismo compatible con lesión de columna cervical',
          'Colocar la palma de una mano sobre la frente del paciente',
          'Inclinar la cabeza hacia atrás con presión firme y sostenida',
          'Apoyar los dedos índice y medio de la otra mano bajo la porción ósea del mentón',
          'Elevar el mentón hacia arriba y hacia delante',
          'Mantener la boca ligeramente entreabierta',
          'Comprobar el paso del aire mirando, escuchando y sintiendo',
        ],
      },
      completar: [
        c(
          'El primer paso de la maniobra frente-mentón es confirmar que no hay mecanismo compatible con lesión de ___.',
          ['cráneo', 'columna cervical', 'tórax', 'mandíbula'], 1,
          'Es lo que decide si esta maniobra es la adecuada o si debe elegirse otra.'
        ),
        c(
          'El objetivo de combinar inclinación de la cabeza y elevación del mentón es lograr la ___ de los ejes de la vía aérea.',
          ['oclusión', 'alineación', 'separación', 'lubricación'], 1,
          'Los dos componentes actúan juntos para conseguirla.'
        ),
        c(
          'En el lactante la referencia de la lección es mantener la posición ___, sin la extensión que se aplica al adulto.',
          ['de hiperextensión', 'neutra', 'de flexión marcada', 'lateral'], 1,
          'Es la particularidad por edad que la lección declara expresamente.'
        ),
      ],
    },
  },

  'm3-va-hojas-tubos': {
    actividades: {
      completar: [
        c(
          'La depresión situada entre la base de la lengua y la epiglotis donde se apoya la hoja curva se llama ___.',
          ['glotis', 'valécula', 'hipofaringe', 'carina'], 1,
          'La hoja curva se apoya ahí y levanta la epiglotis de forma indirecta.'
        ),
        c(
          'La hoja ___ levanta la epiglotis directamente, en vez de apoyarse en la valécula.',
          ['curva', 'recta', 'flexible', 'articulada'], 1,
          'Es la diferencia entre las dos formas de levantar la epiglotis que compara la lección.'
        ),
        c(
          'El calibre de un tubo endotraqueal se expresa por su ___.',
          ['longitud total', 'diámetro interno', 'volumen de globo', 'radio de curvatura'], 1,
          'Es la medida con la que se identifica el tubo.'
        ),
        c(
          'Qué referencia de tamaños de hoja y de calibre por edad se utiliza es una decisión que debe declarar ___.',
          ['el fabricante del tubo', 'la academia en su protocolo', 'el propio alumno', 'el equipo receptor'], 1,
          'La lección lo registra como decisión pendiente y no publica una tabla de calibres por edad.'
        ),
      ],
    },
  },

  'm3-va-mascarilla-laringea': {
    actividades: {
      ordenar: {
        titulo: 'Ordena la colocación de una mascarilla laríngea según la técnica enseñada',
        pasos: [
          'Elegir el tamaño según la referencia del fabricante del dispositivo',
          'Comprobar el manguito inflándolo y desinflándolo',
          'Lubricar la cara posterior del dispositivo',
          'Abrir la boca y aspirar si hay contenido visible',
          'Introducirlo siguiendo el paladar duro hacia la hipofaringe',
          'Avanzar hasta notar la resistencia que indica que ha alcanzado su posición',
          'Inflar el manguito según la indicación del fabricante',
          'Confirmar la ventilación y fijar el dispositivo',
        ],
      },
      completar: [
        c(
          'La mascarilla laríngea es un dispositivo ___: se coloca por encima de la glotis y no atraviesa las cuerdas vocales.',
          ['infraglótico', 'supraglótico', 'transtraqueal', 'nasofaríngeo'], 1,
          'Esa posición define lo que puede y lo que no puede ofrecer.'
        ),
        c(
          'Frente a la aspiración, la mascarilla laríngea ofrece una protección ___, no un aislamiento de la vía aérea.',
          ['completa', 'parcial', 'equivalente al tubo endotraqueal', 'nula'], 1,
          'Es la primera de las limitaciones que enumera la lección.'
        ),
        c(
          'Una obstrucción situada por debajo de la glotis ___ con un dispositivo supraglótico.',
          ['se resuelve siempre', 'no se resuelve', 'se resuelve al inflar el manguito', 'se resuelve aspirando'], 1,
          'Es una limitación estructural derivada de dónde se coloca el dispositivo.'
        ),
      ],
    },
  },

  'm3-va-obturador-esofagico': {
    actividades: {
      completar: [
        c(
          'El obturador esofágico se estudia en el plan como dispositivo ___, no como práctica vigente.',
          ['de primera elección', 'en desuso', 'de rescate habitual', 'supraglótico actual'], 1,
          'La lección lo sitúa expresamente como antecedente histórico.'
        ),
        c(
          'Que un dispositivo aparezca en el temario oficial de 2024 significa que forma parte del ___, no que sea el estándar actual.',
          ['protocolo del servicio', 'plan de estudios histórico', 'alcance profesional', 'inventario de la unidad'], 1,
          'El plan fija qué temas existen; las guías vigentes deciden la práctica actual.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Un alumno pregunta si debe aprender a colocar el obturador esofágico para usarlo en la ambulancia. ¿Qué respuesta es coherente con la lección?',
          opciones: [
            'Sí: es el dispositivo indicado cuando falla la bolsa-válvula-mascarilla.',
            'Se estudia como antecedente histórico porque el plan lo nombra; si el servicio lo tiene o no en su inventario y con qué alcance es una decisión que la academia debe confirmar.',
            'No debe estudiarse en absoluto ni mencionarse.',
            'Sí, y sustituye a la mascarilla laríngea en el paciente con reflejo conservado.',
          ],
          correcta: 1,
          explicacion: 'La lección lo presenta como dispositivo en desuso y registra como decisión pendiente si la academia lo conserva solo como antecedente.',
        },
      ],
    },
  },

  'm3-va-dispositivos-o2': {
    actividades: {
      completar: [
        c(
          'Las puntas nasales y las mascarillas pertenecen a la familia de dispositivos de ___ de oxígeno, que exigen que el paciente respire por sí mismo.',
          ['ventilación asistida', 'aporte', 'presión positiva', 'aislamiento'], 1,
          'La otra familia, la de ventilación asistida, corrige que el paciente no movilice volumen suficiente.'
        ),
        c(
          'La bolsa-válvula-mascarilla pertenece a la familia de ___, porque sustituye o apoya el volumen que el paciente no moviliza.',
          ['aporte de oxígeno', 'ventilación asistida', 'monitorización', 'aspiración'], 1,
          'Es la distinción que da título a la primera sección de la lección.'
        ),
        c(
          'Sin un ___ hermético de la mascarilla, la insuflación escapa y la ventilación no es eficaz por mucho oxígeno que se conecte.',
          ['reservorio', 'sello facial', 'manguito', 'filtro'], 1,
          'Por eso la lección indica sellar con la técnica de dos manos cuando hay un segundo prestador.'
        ),
        c(
          'Ventilar demasiado rápido o con volumen excesivo favorece la ___, que es una complicación evitable con la técnica.',
          ['hipotermia', 'insuflación gástrica', 'anisocoria', 'flebitis'], 1,
          'Es la razón por la que se insufla de forma lenta y progresiva hasta ver elevarse el tórax.'
        ),
        c(
          'El flujo que corresponde a cada dispositivo y el objetivo de saturación los declara ___, y esta lección no los publica.',
          ['el fabricante de la bolsa', 'el protocolo del servicio', 'la propia lección', 'el equipo receptor'], 1,
          'Está registrado como decisión pendiente de la academia.'
        ),
      ],
    },
  },

  'm3-va-isr': {
    actividades: {
      completar: [
        c(
          'La oxigenación cuidadosa previa al intento, que amplía el margen antes de que el paciente deje de respirar, se llama ___.',
          ['ventilación asistida', 'preoxigenación', 'reevaluación', 'sellado facial'], 1,
          'Es uno de los elementos de preparación que la lección sí puede enseñar.'
        ),
        c(
          'La alternativa decidida de antemano para el caso de que el intento falle se llama plan de ___.',
          ['contingencia farmacológica', 'rescate', 'traslado', 'sedación'], 1,
          'La lección sostiene que la seguridad de este procedimiento está en la preparación.'
        ),
        c(
          'El contenido farmacológico de este tema —fármacos, dosis, concentraciones y tiempos— está ___ en la lección.',
          ['publicado con detalle', 'bloqueado de forma declarada', 'resumido en una tabla', 'remitido al fabricante'], 1,
          'La lección declara ese bloqueo parcial expresamente y no lo disimula.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Un alumno dice que con esta lección ya puede realizar una intubación de secuencia rápida. ¿Qué falla en esa conclusión?',
          opciones: [
            'Nada: la lección describe el procedimiento completo.',
            'Que la lección enseña la lógica de la preparación pero declara bloqueado su contenido farmacológico, y el procedimiento depende del alcance profesional y de la dirección médica.',
            'Que faltan los tamaños de hoja y de tubo.',
            'Que la preoxigenación la sustituye por completo.',
          ],
          correcta: 1,
          explicacion: 'La lección tiene una sección titulada expresamente «Lo que esta lección no puede darte», y su ficha registra el bloqueo parcial.',
        },
      ],
    },
  },

  // ---------- Vía intravenosa ----------

  'm3-vi-ventajas-desventajas': {
    actividades: {
      completar: [
        c(
          'Que la totalidad de lo administrado llegue a la circulación sin depender de la absorción se llama ___ completa.',
          ['tonicidad', 'biodisponibilidad', 'perfusión', 'osmolaridad'], 1,
          'Es la ventaja principal de la vía intravenosa que enumera la lección.'
        ),
        c(
          'La salida de la solución al tejido que rodea la vena, con el catéter fuera de la luz, es la ___.',
          ['flebitis', 'infiltración', 'trombosis', 'sobrecarga circulatoria'], 1,
          'La lección la enumera entre las desventajas y los riesgos de la vía.'
        ),
        c(
          'La inflamación de la pared de la vena en la que se ha colocado un acceso se llama ___.',
          ['infiltración', 'flebitis', 'extravasación', 'hipotermia'], 1,
          'Es otro de los riesgos que la lección obliga a vigilar.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Al reevaluar un acceso venoso encuentras la zona hinchada, fría y con la infusión enlentecida. Según lo enseñado, ¿qué debes sospechar primero?',
          opciones: [
            'Una sobrecarga circulatoria.',
            'Que la solución está saliendo al tejido que rodea la vena, es decir, una infiltración.',
            'Una respuesta alérgica a la solución.',
            'Que el calibre del catéter es demasiado grande.',
          ],
          correcta: 1,
          explicacion: 'La infiltración es la salida de la solución al tejido perivenoso, y la lección la sitúa entre los riesgos que obligan a reevaluar el acceso.',
        },
      ],
    },
  },

  'm3-vi-cristaloides': {
    actividades: {
      completar: [
        c(
          'Una solución acuosa de electrolitos y moléculas pequeñas que atraviesan libremente la pared del capilar es un ___.',
          ['coloide', 'cristaloide', 'hemoderivado', 'vasopresor'], 1,
          'El coloide, en cambio, tiene partículas de mayor tamaño que permanecen más tiempo en el espacio intravascular.'
        ),
        c(
          'La relación entre la osmolaridad de una solución y la del plasma se llama ___ y determina hacia dónde tiende a moverse el agua.',
          ['viscosidad', 'tonicidad', 'biodisponibilidad', 'presión oncótica'], 1,
          'Es el criterio con el que la lección compara los tres comportamientos.'
        ),
        c(
          'Administrar volumen en exceso o sin indicación puede producir una ___, con deterioro respiratorio.',
          ['infiltración', 'sobrecarga circulatoria', 'flebitis', 'hipotermia'], 1,
          'La lección dedica una sección a que administrar volumen no es inocuo.'
        ),
        c(
          'Si la perfusión no mejora al administrar volumen, la lección indica que insistir con más volumen ___.',
          ['es la conducta correcta', 'requiere reconsiderar la indicación conforme al protocolo', 'siempre está contraindicado', 'depende del calibre del catéter'], 1,
          'Es uno de los puntos de la lista de vigilancia durante la administración.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Durante una infusión aparece dificultad respiratoria y distensión venosa yugular que antes no existía. Según la lista de vigilancia de la lección, ¿qué significa?',
          opciones: [
            'Que la solución está a temperatura ambiente.',
            'Que son signos de alarma que obligan a reevaluar y que apuntan a sobrecarga circulatoria.',
            'Que el acceso se ha infiltrado.',
            'Que la solución elegida era hipotónica.',
          ],
          correcta: 1,
          explicacion: 'La lección enumera expresamente entre lo que hay que vigilar la aparición de dificultad respiratoria, los cambios en la auscultación y la distensión venosa yugular nueva.',
        },
      ],
    },
  },

  'm3-vi-osteolisis': {
    actividades: {
      ordenar: {
        titulo: 'Ordena la secuencia general del acceso intraóseo tal como la enseña la lección',
        pasos: [
          'Identificar el sitio por sus referencias anatómicas',
          'Realizar antisepsia de la zona',
          'Insertar la aguja perpendicular a la superficie ósea',
          'Detener la progresión al notar la pérdida de resistencia',
          'Retirar el estilete y estabilizar la aguja',
          'Confirmar la posición antes de administrar nada',
          'Fijar el dispositivo y registrar sitio, hora y dispositivo',
        ],
      },
      completar: [
        c(
          'El término correcto para este acceso vascular es acceso intraóseo u ___; «osteólisis» es solo la errata del título documental.',
          ['osteotomía', 'osteoclisis', 'osteosíntesis', 'osteopatía'], 1,
          'La lección aclara la errata en su primera sección y muestra el nombre correcto al alumno.'
        ),
        c(
          'La señal de que la aguja ha alcanzado la cavidad medular es la ___.',
          ['aparición de sangre en el estilete', 'pérdida de resistencia', 'desaparición del dolor', 'resistencia creciente'], 1,
          'Al notarla se detiene la progresión.'
        ),
        c(
          'Antes de administrar nada por el acceso hay que ___ la posición.',
          ['fijar', 'confirmar', 'lubricar', 'aspirar por completo'], 1,
          'Administrar sin confirmar expone a la extravasación intraósea.'
        ),
        c(
          'Qué dispositivo intraóseo tiene la unidad, en qué sitios y con qué autorización se usa lo declara ___.',
          ['la propia lección', 'la academia en su protocolo', 'el fabricante únicamente', 'el equipo receptor'], 1,
          'La lección lo registra como decisión pendiente y no autoriza el procedimiento.'
        ),
      ],
    },
  },
}
