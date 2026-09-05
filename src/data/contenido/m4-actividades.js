// ============================================================
//  Módulo 4 · Actividades añadidas a lecciones ya redactadas
// ------------------------------------------------------------
//  Dieciséis lecciones del Módulo 4 estaban redactadas y sin actividad. Esa
//  deuda quedó enumerada en `docs/archivo/ESTADO-PRODUCCION-ACELERADA.md`.
//
//  Este archivo la resuelve SIN TOCAR nada más. Aporta únicamente el campo
//  `actividades` de cada tema, y el punto de unión de `contenido/index.js`
//  fusiona POR CAMPO: texto, secciones, conceptos, tarjetas, quiz, fuentes y
//  ficha editorial siguen viniendo de su archivo original.
//
//  Mismo criterio que `m3-actividades.js`:
//
//  · Cada actividad se deriva EXCLUSIVAMENTE de lo que su lección enseña.
//  · Ninguna repite una pregunta del quiz de su tema.
//  · No se pide un diagnóstico definitivo, ni una dosis, ni una saturación
//    objetivo, ni ningún dato que la lección haya declarado bloqueado.
//  · En los temas con bloqueo declarado, la actividad evalúa precisamente que
//    el alumno sepa que ese dato lo fija el protocolo.
//
//  Ninguna actividad de este archivo procede de `reutilizado.js`.
// ============================================================

const c = (texto, opciones, correcta, explicacion) => ({ texto, opciones, correcta, explicacion })

export default {
  // ---------- Epidemiología y farmacología ----------

  'm4-epi-urgencia-emergencia': {
    actividades: {
      completar: [
        c(
          'El artículo 72 responde a la pregunta «¿qué es una urgencia?». La pregunta «¿a quién obliga en el medio prehospitalario?» la responde el ___ de la NOM-034.',
          ['apéndice normativo B', 'numeral 2, campo de aplicación', 'numeral 4.1.7', 'artículo 71'],
          1,
          'Definición, ámbito de aplicación y sujeto obligado son tres preguntas distintas que responden disposiciones distintas.'
        ),
        c(
          'La obligación del artículo 71 alcanza a los establecimientos que brindan atención médica para el ___ de enfermos, no al prestador prehospitalario.',
          ['traslado', 'internamiento', 'diagnóstico', 'registro'],
          1,
          'Es lo que confirma que ese artículo no alcanza por sí solo a una ambulancia.'
        ),
        c(
          'Que un cuadro ponga en peligro un órgano o una función, sin riesgo de muerte, ___ la definición normativa de urgencia.',
          ['queda fuera de', 'cumple', 'contradice', 'sustituye'],
          1,
          'La norma no exige riesgo vital: basta el peligro para la vida, un órgano o una función.'
        ),
        c(
          'Las expresiones «emergencia» y «urgencia sentida» son lenguaje del gremio ___ definición en el reglamento citado ni en la NOM-034.',
          ['con', 'sin', 'con doble', 'con nueva'],
          1,
          'Por eso no son conceptos formales ni categorías de triage.'
        ),
      ],
    },
  },

  'm4-far-nom-034': {
    actividades: {
      preguntas: [
        {
          pregunta: 'Operas en una ambulancia de urgencias BÁSICAS. Según los apéndices normativos, ¿qué dotación mínima de medicamentos y soluciones le corresponde?',
          opciones: [
            'Solo la del apéndice B.',
            'La de los apéndices A y B, porque los apéndices son acumulativos.',
            'La de los apéndices A, B y C.',
            'Ninguna: solo las unidades avanzadas llevan medicamentos.',
          ],
          correcta: 1,
          explicacion: 'El apéndice B exige cumplir además todo el apéndice A, que aporta las soluciones.',
        },
        {
          pregunta: 'Encuentras en tu unidad un medicamento que el apéndice correspondiente exige. ¿Qué te autoriza esa presencia?',
          opciones: [
            'A administrarlo cuando lo consideres indicado.',
            'Nada por sí sola: disponibilidad no equivale a autorización; hacen falta además indicación respaldada, competencia y protocolo con dirección médica.',
            'A administrarlo con la dosis del envase.',
            'A administrarlo solo en traslados interhospitalarios.',
          ],
          correcta: 1,
          explicacion: 'La NOM-034 responde qué debe existir a bordo, no qué se administra, a quién ni cuánto.',
        },
        {
          pregunta: 'Un compañero afirma que la NOM-034 «ya cambió» porque hay una modificación en el programa nacional de normalización. ¿Qué haces?',
          opciones: [
            'Aplicar la modificación de inmediato.',
            'Seguir con el texto publicado en el DOF y comprobar allí si esa modificación llegó a publicarse: un proyecto no es una reforma.',
            'Suspender el uso de la dotación hasta aclararlo.',
            'Consultar con la unidad vecina qué criterio siguen.',
          ],
          correcta: 1,
          explicacion: 'Lo que rige es el texto publicado, y esa comprobación se hace en la fuente.',
        },
      ],
    },
  },

  // ---------- Urgencias respiratorias ----------

  'm4-resp-insuficiencia': {
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente con dificultad respiratoria intensa que, tras veinte minutos, deja de luchar, respira más despacio y se vuelve somnoliento. ¿Cómo clasificas ese cambio?',
          opciones: [
            'Mejoría que permite espaciar la vigilancia.',
            'Claudicación: el esfuerzo disminuye sin que el paciente mejore, y obliga a intensificar el soporte.',
            'Fallo aislado de la oxigenación.',
            'Respuesta esperada a la posición adoptada.',
          ],
          correcta: 1,
          explicacion: 'La disminución del esfuerzo sin mejoría clínica es uno de los signos de claudicación que enseña la lección.',
        },
        {
          pregunta: 'Otro paciente está somnoliento, confuso y con respiración superficial, sin angustia ni taquipnea. ¿Qué tipo de fallo predomina?',
          opciones: [
            'El de la oxigenación.',
            'El de la ventilación: no se moviliza el volumen necesario para eliminar dióxido de carbono.',
            'Ninguno: son signos neurológicos puros.',
            'Un fallo circulatorio aislado.',
          ],
          correcta: 1,
          explicacion: 'Somnolencia, confusión y respiración superficial o lenta son la presentación habitual del fallo de la ventilación.',
        },
        {
          pregunta: 'Al construir la prealerta de cualquiera de esos pacientes, ¿qué formulación es preferible?',
          opciones: [
            '«Insuficiencia respiratoria grave».',
            '«Habla en palabras sueltas, usa músculos accesorios y está somnoliento»: la descripción sobrevive a un cambio de hipótesis.',
            '«Paciente que va a necesitar ventilación».',
            '«Saturación baja».',
          ],
          correcta: 1,
          explicacion: 'La lección enseña a describir en vez de etiquetar, porque la etiqueta puede arrastrar al equipo receptor hacia una entidad equivocada.',
        },
      ],
    },
  },

  'm4-resp-epoc': {
    actividades: {
      completar: [
        c(
          'La gravedad de una exacerbación no se mide por la intensidad de la queja sino por cuánto se ha alejado el paciente de su ___.',
          ['edad', 'estado basal', 'peso', 'tratamiento previo'],
          1,
          'Un paciente con EPOC avanzada puede tener a diario hallazgos que en otra persona serían alarmantes.'
        ),
        c(
          'En la EPOC el oxígeno se administra de forma ___: con objetivo declarado y titulado a la respuesta, no al máximo por si acaso.',
          ['libre', 'controlada', 'intermitente', 'preventiva'],
          1,
          'La oxigenoterapia controlada no es la ausencia de oxígeno: es oxígeno con un objetivo más conservador y vigilancia del estado de alerta.'
        ),
        c(
          'Que el salbutamol figure en el numeral B.4.4.1 de la NOM-034 significa que debe existir a bordo; la indicación y la cantidad proceden de la guía vigente, la IPP y el ___.',
          ['manual del fabricante del vehículo', 'protocolo del servicio', 'criterio del prestador', 'envase del producto'],
          1,
          'Disponibilidad no equivale a autorización.'
        ),
        c(
          'Dejar sin tratar una hipoxemia grave en un paciente con EPOC por temor a la retención de dióxido de carbono es ___.',
          ['la conducta correcta', 'peligroso', 'indiferente', 'lo que indica la guía'],
          1,
          'Lo que corresponde es oxigenoterapia controlada con objetivo declarado y vigilancia.'
        ),
      ],
    },
  },

  'm4-resp-edema-pulmon': {
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente con disnea súbita, crepitantes bilaterales, alerta, con piel caliente y buen relleno capilar. ¿Cómo describes su situación?',
          opciones: [
            'Congestivo y mal perfundido.',
            'Congestivo con perfusión conservada: la combinación que se transmite es congestión más estado de perfusión.',
            'En bajo gasto sin congestión.',
            'Sin datos de origen cardiogénico.',
          ],
          correcta: 1,
          explicacion: 'La lección enseña que la combinación que cambia la recepción es congestión más estado de perfusión.',
        },
        {
          pregunta: 'Mismo paciente, minutos después: frío, moteado y con el sensorio alterado. ¿Qué ha cambiado?',
          opciones: [
            'Nada relevante: sigue congestivo.',
            'Ahora es congestión CON hipoperfusión, que identifica a un enfermo mucho más grave y debe transmitirse en la prealerta.',
            'Ha pasado a un cuadro no cardiogénico.',
            'Ha mejorado su congestión.',
          ],
          correcta: 1,
          explicacion: 'Reconocer esa combinación y transmitirla es una de las aportaciones más útiles del prestador.',
        },
        {
          pregunta: 'Un compañero propone acostar al paciente para explorarlo mejor. ¿Qué respondes?',
          opciones: [
            'Que adelante, mejora el acceso.',
            'Que el decúbito aumenta el retorno venoso hacia un corazón que no puede manejarlo y puede empeorarlo de forma inmediata.',
            'Que lo acueste solo durante el traslado.',
            'Que lo siente completamente erguido y con las piernas elevadas.',
          ],
          correcta: 1,
          explicacion: 'Por eso estos pacientes se sientan de forma espontánea y no se les fuerza el decúbito.',
        },
      ],
    },
  },

  'm4-resp-neumotorax-espontaneo': {
    actividades: {
      completar: [
        c(
          'El neumotórax espontáneo que ocurre sobre un pulmón ya enfermo se llama ___ y tolera mucho peor el mismo volumen de aire.',
          ['primario', 'secundario', 'traumático', 'a tensión'],
          1,
          'La distinción importa por la reserva pulmonar del paciente, no por el origen del aire.'
        ),
        c(
          'La desviación de la tráquea es un signo ___: su presencia apoya la sospecha, pero su ausencia no descarta nada.',
          ['precoz', 'tardío', 'constante', 'exclusivo del primario'],
          1,
          'Esperar a que aparezca retrasa el reconocimiento del cuadro a tensión.'
        ),
        c(
          'Cuando el aire acumulado a presión desplaza el mediastino y compromete el retorno venoso, el problema deja de ser respiratorio y pasa a ser ___.',
          ['infeccioso', 'circulatorio', 'neurológico', 'metabólico'],
          1,
          'Por eso es un cuadro tiempo-dependiente.'
        ),
        c(
          'La descompresión torácica no se describe en la lección porque depende del alcance profesional, del material y del ___.',
          ['tamaño del neumotórax', 'protocolo con dirección médica', 'tipo de paciente', 'hospital receptor'],
          1,
          'Al prestador le corresponde reconocer, sostener, trasladar y prealertar.'
        ),
      ],
    },
  },

  'm4-resp-tep': {
    actividades: {
      preguntas: [
        {
          pregunta: 'Mujer operada de rodilla hace una semana con disnea súbita y auscultación sin hallazgos. ¿Cómo interpretas la auscultación normal?',
          opciones: [
            'Reduce la sospecha de forma importante.',
            'No la reduce: la zona afectada ventila sin perfundirse, por lo que la exploración puede ser poco llamativa.',
            'Confirma un origen ansioso.',
            'Descarta un cuadro pulmonar.',
          ],
          correcta: 1,
          explicacion: 'En este cuadro una exploración sin hallazgos no permite bajar el nivel de vigilancia.',
        },
        {
          pregunta: 'La misma paciente presenta un síncope y queda mal perfundida. ¿Qué significa según el criterio aplicable desde la calle?',
          opciones: [
            'Que la sospecha era equivocada.',
            'Que la inestabilidad hemodinámica la sitúa en el grupo de mayor riesgo y mortalidad precoz, y obliga a prealertar.',
            'Que el cuadro ha dejado de ser urgente.',
            'Que debe esperarse a que se recupere para trasladar.',
          ],
          correcta: 1,
          explicacion: 'Es el criterio de estratificación que sí puede aplicarse en el ámbito prehospitalario.',
        },
        {
          pregunta: '¿Cuál es la aportación decisiva del prestador en este cuadro?',
          opciones: [
            'Confirmar el diagnóstico con la exploración.',
            'Transmitir la sospecha junto con los factores de riesgo que la sustentan, porque eso orienta la recepción hospitalaria.',
            'Iniciar anticoagulación en la escena.',
            'Descartar el cuadro si la auscultación es normal.',
          ],
          correcta: 1,
          explicacion: 'El diagnóstico exige estudios que no existen en el ámbito prehospitalario.',
        },
      ],
    },
  },

  'm4-resp-neumonia-bronquitis': {
    actividades: {
      completar: [
        c(
          'La bronquitis aguda inflama la mucosa ___ y suele conservar el estado general; la neumonía infecta el parénquima y ocupa los alveolos.',
          ['alveolar', 'bronquial', 'pleural', 'traqueal'],
          1,
          'Es la diferencia de localización que ordena la comparación entre ambos cuadros.'
        ),
        c(
          'En la calle no se decide cuál de los dos cuadros es: se decide cuán ___ está el paciente y adónde va.',
          ['contagioso', 'grave', 'febril', 'sintomático'],
          1,
          'La confirmación exige estudios que no viajan en la ambulancia.'
        ),
        c(
          'Cuando a un foco infeccioso se le añaden signos de disfunción de órganos, la sospecha pasa a ser de ___ y el traslado se vuelve tiempo-dependiente.',
          ['neumonía atípica', 'sepsis', 'bronquitis complicada', 'insuficiencia respiratoria crónica'],
          1,
          'Sensorio alterado, compromiso respiratorio o hipoperfusión son esos signos.'
        ),
        c(
          'En un cuadro infeccioso respiratorio, además de la fiebre alta, también es signo de gravedad la ___.',
          ['sudoración', 'hipotermia', 'tos productiva', 'expectoración clara'],
          1,
          'Figura expresamente entre los signos de gravedad que enumera la lección.'
        ),
      ],
    },
  },

  // ---------- Urgencias gastrointestinales ----------

  'm4-gi-apendicitis': {
    actividades: {
      completar: [
        c(
          'En la cronología apendicular el dolor precede a las náuseas y al vómito, y la fiebre aparece en ___ lugar.',
          ['primer', 'último', 'segundo', 'ningún'],
          1,
          'El orden en que aparecieron los síntomas aporta más que la lista de cuáles hay.'
        ),
        c(
          'La secuencia clásica completa aparece en ___ de los casos, por lo que su ausencia no descarta el cuadro.',
          ['casi todos', 'menos de la mitad', 'todos los pacientes jóvenes', 'solo los complicados'],
          1,
          'Por eso las presentaciones atípicas retrasan el diagnóstico.'
        ),
        c(
          'Un dolor intenso que cede de golpe y se sigue de un paciente que empeora debe ___ la preocupación.',
          ['reducir', 'elevar', 'no modificar', 'posponer'],
          1,
          'Es un patrón que sugiere complicación y se transmite expresamente en el informe.'
        ),
      ],
    },
  },

  'm4-gi-pancreatitis': {
    actividades: {
      completar: [
        c(
          'En la pancreatitis, la gravedad se juzga por el estado circulatorio, la respiración y el estado de alerta, no por la ___ del dolor.',
          ['localización', 'intensidad', 'duración', 'irradiación'],
          1,
          'Una pancreatitis muy dolorosa puede ser leve y una menos dolorosa puede ser grave.'
        ),
        c(
          'Un paciente con pancreatitis puede estar mal perfundido sin haber sangrado ni vomitado mucho porque pierde líquido hacia el ___.',
          ['tubo digestivo', 'tercer espacio', 'espacio pleural', 'sistema linfático'],
          1,
          'Ese líquido deja de circular aunque siga dentro del cuerpo.'
        ),
        c(
          'Las dos preguntas de la anamnesis que cubren las causas más frecuentes son el antecedente de litiasis biliar y el consumo de ___.',
          ['tabaco', 'alcohol', 'café', 'antiinflamatorios'],
          1,
          'Son preguntas breves que orientan al equipo receptor.'
        ),
      ],
    },
  },

  'm4-gi-gastritis-colitis': {
    actividades: {
      preguntas: [
        {
          pregunta: 'Hombre de 76 años con enfermedad vascular conocida: dolor abdominal brusco hace tres horas y ahora una deposición con sangre. ¿Qué patrón describe?',
          opciones: [
            'Una gastroenteritis infecciosa.',
            'Una colitis isquémica: adulto mayor con riesgo vascular, dolor brusco y deposición con sangre a las pocas horas.',
            'Un brote de enfermedad inflamatoria intestinal.',
            'Una gastritis por antiinflamatorios.',
          ],
          correcta: 1,
          explicacion: 'El componente isquémico convierte el cuadro en tiempo-dependiente.',
        },
        {
          pregunta: 'Otro paciente con riesgo vascular refiere dolor abdominal intensísimo y su abdomen apenas muestra hallazgos. ¿Qué sugiere ese contraste?',
          opciones: [
            'Que exagera el dolor.',
            'Un dolor desproporcionado respecto de la exploración, que en ese paciente sugiere un cuadro abdominal de origen vascular.',
            'Una gastritis por estrés.',
            'Una colitis infecciosa en fase inicial.',
          ],
          correcta: 1,
          explicacion: 'Es un patrón que debe preocupar de forma particular y no una discordancia sin valor.',
        },
        {
          pregunta: 'Un tercer paciente joven tiene diarrea de dos días, sin fiebre, bien perfundido y tolerando líquidos. ¿Qué lo sacaría de la categoría de leve?',
          opciones: [
            'Que la diarrea sea acuosa.',
            'La aparición de hipoperfusión, alteración del estado de alerta, sangre apreciable o vómitos que impidan tolerar líquidos.',
            'Que dure más de un día.',
            'Que no tenga antecedente de viaje.',
          ],
          correcta: 1,
          explicacion: 'Los signos que sacan al paciente de la categoría de leve son los de repercusión sistémica y los de sangrado.',
        },
      ],
    },
  },

  'm4-gi-colelitiasis': {
    actividades: {
      completar: [
        c(
          'La colelitiasis y el cólico biliar describen un problema mecánico que cede; la colecistitis y la colangitis añaden ___ mantenidas.',
          ['obstrucción', 'inflamación o infección', 'litiasis', 'irradiación'],
          1,
          'Esa diferencia es la que cambia la prioridad del traslado.'
        ),
        c(
          'La combinación de dolor en hipocondrio derecho, fiebre y coloración amarillenta describe una obstrucción con ___ de la vía biliar.',
          ['litiasis', 'infección', 'inflamación local', 'perforación'],
          1,
          'Si además hay hipoperfusión o alteración del estado de alerta, el paciente es tiempo-dependiente.'
        ),
        c(
          'El signo de Murphy se busca pidiendo al paciente que ___ profundamente mientras se palpa el hipocondrio derecho.',
          ['espire', 'inspire', 'tosa', 'contraiga el abdomen'],
          1,
          'Es sugestivo si el dolor le interrumpe la inspiración, y orienta sin confirmar.'
        ),
      ],
    },
  },

  'm4-gi-deshidratacion': {
    actividades: {
      preguntas: [
        {
          pregunta: 'Niño con diarrea de dos días, somnoliento, con ojos hundidos y frialdad distal. ¿Por qué queda excluida la rehidratación oral?',
          opciones: [
            'Porque la diarrea impide absorber.',
            'Porque la alteración del estado de alerta y la incapacidad para beber sacan al paciente de cualquier plan oral, con riesgo de broncoaspiración.',
            'Porque los electrolitos orales no están en la dotación.',
            'Porque es menor de edad.',
          ],
          correcta: 1,
          explicacion: 'Son los dos signos que la lección señala como límite de la vía oral.',
        },
        {
          pregunta: 'Adulto mayor con vómitos de un día: al pellizcar la piel, esta recupera con lentitud. ¿Qué peso le das?',
          opciones: [
            'Decisivo: confirma déficit grave.',
            'Limitado: en el adulto mayor la piel ya recupera con lentitud por la edad; informan mejor el estado de alerta, la perfusión, las mucosas y la diuresis.',
            'Ninguno: el signo no existe en el adulto.',
            'Decisivo solo si además hay sed.',
          ],
          correcta: 1,
          explicacion: 'Ningún signo aislado basta para graduar la deshidratación.',
        },
        {
          pregunta: 'Un paciente ha vomitado tres veces pero sigue bebiendo; otro ha vomitado una vez y no bebe desde ayer. ¿Qué te dice esa comparación?',
          opciones: [
            'Que el primero está más deshidratado por el número de episodios.',
            'Que el aporte cuenta tanto como la pérdida: preguntar qué, cuánto y cuándo bebió aporta tanto como contar los vómitos.',
            'Que ninguno requiere valoración.',
            'Que solo el número de vómitos es válido.',
          ],
          correcta: 1,
          explicacion: 'La deshidratación aparece cuando las pérdidas superan al aporte.',
        },
      ],
    },
  },

  'm4-gi-oclusion-intestinal': {
    actividades: {
      completar: [
        c(
          'El antecedente que más orienta hacia una oclusión mecánica es la ___ abdominal previa, por las adherencias.',
          ['infección', 'cirugía', 'radiografía', 'endoscopia'],
          1,
          'Se pregunta expresamente y se buscan cicatrices durante la inspección.'
        ),
        c(
          'Que los ruidos de lucha desaparezcan y el abdomen quede silencioso indica que el cuadro ha ___.',
          ['mejorado', 'avanzado', 'cedido', 'cambiado de causa'],
          1,
          'Es una mala señal, no una mejoría.'
        ),
        c(
          'Un paciente con oclusión puede llegar mal perfundido sin haber sangrado porque pierde líquido dentro de la ___ intestinal y con los vómitos.',
          ['pared', 'luz', 'serosa', 'mucosa'],
          1,
          'Por eso la vigilancia circulatoria forma parte del traslado.'
        ),
      ],
    },
  },

  'm4-gi-sangrado-tubo': {
    actividades: {
      preguntas: [
        {
          pregunta: 'La familia insiste en que «fue muchísima sangre», pero el paciente está alerta, con piel caliente y sin taquicardia. ¿Cómo procedes?',
          opciones: [
            'Prealertar como hemorragia masiva por la cantidad referida.',
            'Registrar lo referido y graduar la gravedad por la repercusión circulatoria, reevaluando: la cantidad referida es poco fiable.',
            'Descartar el sangrado por la exploración normal.',
            'Dejar al paciente en domicilio con recomendaciones.',
          ],
          correcta: 1,
          explicacion: 'Poca sangre impresiona mucho y una hemorragia importante puede no haberse exteriorizado.',
        },
        {
          pregunta: 'Paciente con enfermedad hepática crónica que vomita sangre roja abundante. ¿Qué dos cosas te preocupan especialmente?',
          opciones: [
            'La limpieza de la unidad y el olor.',
            'Un posible sangrado por varices esofágicas, que puede ser masivo, y el riesgo de broncoaspiración.',
            'La aparición tardía de melena y la fiebre.',
            'El origen bajo del sangrado y la diarrea.',
          ],
          correcta: 1,
          explicacion: 'La enfermedad hepática es uno de los dos antecedentes que elevan la preocupación de inmediato.',
        },
        {
          pregunta: 'El paciente expulsa sangre roja fresca por el ano. ¿Qué puedes concluir sobre el nivel del sangrado?',
          opciones: [
            'Que el origen es con certeza bajo y distal.',
            'Que orienta hacia un origen bajo, pero un sangrado alto muy abundante y rápido puede presentarse así.',
            'Que el sangrado es leve por ser rojo.',
            'Que se trata de una melena en formación.',
          ],
          correcta: 1,
          explicacion: 'La forma de exteriorización orienta pero no localiza con certeza.',
        },
      ],
    },
  },

  'm4-gi-cirrosis-hepatitis': {
    actividades: {
      completar: [
        c(
          'De la hipertensión portal y de la pérdida de función del hígado nacen casi todas las ___ de la cirrosis.',
          ['causas', 'complicaciones', 'contraindicaciones', 'exploraciones'],
          1,
          'El paciente cirrótico no llama por su cirrosis, sino por una de ellas.'
        ),
        c(
          'Un paciente con cirrosis que llega confuso o somnoliento puede estar en ___ hepática, sin dejar de valorar las demás causas de alteración del estado de alerta.',
          ['insuficiencia', 'encefalopatía', 'ascitis', 'ictericia'],
          1,
          'Ese dato cambia la orientación del cuadro y se transmite expresamente.'
        ),
        c(
          'El paciente cirrótico sangra con más facilidad porque el hígado produce ___ necesarios para la coagulación.',
          ['electrolitos', 'factores', 'anticuerpos', 'enzimas digestivas'],
          1,
          'Una hemorragia que en otra persona sería menor puede no detenerse en él.'
        ),
        c(
          'La combinación de ictericia, alteración del estado de alerta y tendencia al sangrado describe un ___ hepático grave.',
          ['cólico', 'fallo', 'brote', 'cuadro obstructivo'],
          1,
          'Cualquiera de los tres aislado puede tener otra explicación; los tres juntos son tiempo-dependientes.'
        ),
      ],
    },
  },
}
