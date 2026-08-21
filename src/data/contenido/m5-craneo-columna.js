// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE CRÁNEO Y COLUMNA»
// ------------------------------------------------------------
//  Cubre los 8 temas vacíos de la unidad.
//
//  Es la unidad donde el prehospitalario más cambia el pronóstico, porque la
//  lesión primaria ya ocurrió y es irreversible: todo lo que se hace aquí va
//  contra la lesión SECUNDARIA, que sí es evitable.
//
//  Cambio de práctica importante: la inmovilización espinal sistemática con
//  tabla rígida fue sustituida por la RESTRICCIÓN SELECTIVA del movimiento
//  espinal, y la tabla larga pasó a ser una herramienta de EXTRACCIÓN, no de
//  transporte. Se explica el porqué, no solo la regla.
//
//  Umbrales de tensión y saturación: se citan como objetivos generales y se
//  remite al protocolo del servicio, que es donde están las cifras exigibles.
// ============================================================

const FUENTE = {
  tipo: 'fuentes',
  titulo: 'Para ampliar',
  items: [
    {
      nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
      nota: 'Edición declarada por el plan de estudios oficial y base curricular de este módulo. Capítulo y página PENDIENTES: solo puede precisarlos quien consulte la copia licenciada de la academia. No se cita la 10.ª edición porque la copia disponible es una traducción automática no citable.',
    },
  ],
}

export default {
  'm5-tcc-lesiones-difusas': {
    icono: 'cp-servier-cerebro',
    duracion: '12 min',
    resumen: 'Lesiones difusas: el daño no está en un punto sino repartido por todo el encéfalo. Desde la concusión hasta la lesión axonal difusa.',
    objetivos: [
      'Diferenciar lesión difusa de lesión focal.',
      'Reconocer la concusión y sus signos de alarma.',
      'Explicar el mecanismo de la lesión axonal difusa.',
    ],
    secciones: [
      {
        titulo: 'Difusa frente a focal',
        bloques: [
          { tipo: 'p', texto: 'Una lesión focal se localiza: un hematoma que ocupa un sitio y comprime. Una difusa afecta al tejido de forma extendida, sin una masa que evacuar, y por eso su tratamiento es de soporte y no quirúrgico.' },
          {
            tipo: 'tabla',
            headers: ['', 'Difusa', 'Focal'],
            filas: [
              ['Ejemplos', 'Concusión, lesión axonal difusa', 'Hematoma epidural, subdural, contusión'],
              ['Mecanismo', 'Aceleración-desaceleración, rotación', 'Impacto directo, laceración vascular'],
              ['Imagen', 'Puede ser normal al principio', 'Suele verse la colección'],
              ['Tratamiento', 'Soporte: evitar la lesión secundaria', 'Puede requerir cirugía'],
            ],
          },
        ],
      },
      {
        titulo: 'Concusión',
        bloques: [
          { tipo: 'p', texto: 'Alteración transitoria de la función cerebral tras un golpe, sin daño estructural visible. Puede haber o no pérdida de conciencia: la ausencia de desmayo no descarta nada.' },
          {
            tipo: 'lista',
            titulo: 'Manifestaciones',
            items: [
              'Confusión, desorientación, lentitud para responder.',
              'Amnesia de lo ocurrido justo antes o después del golpe.',
              'Cefalea, mareo, náusea.',
              'Visión borrosa, fotofobia, acúfenos.',
              'Irritabilidad o comportamiento inusual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cuándo deja de ser «solo una concusión»', texto: 'Vómito repetido, cefalea que va a más, somnolencia creciente, convulsión, pupilas desiguales, debilidad de un lado o confusión que empeora. Cualquiera de estos obliga a reevaluar buscando una lesión con efecto de masa.' },
        ],
      },
      {
        titulo: 'Lesión axonal difusa',
        bloques: [
          { tipo: 'p', texto: 'Es la forma grave. En una desaceleración brusca con componente rotacional, las distintas capas del encéfalo se mueven a velocidades diferentes y los axones —las prolongaciones que conectan neuronas— se estiran y se rompen.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La paradoja de la imagen', texto: 'El paciente puede estar profundamente inconsciente y tener una tomografía inicial casi normal, porque el daño está en la conexión entre neuronas y no en una colección de sangre. Un estudio normal no tranquiliza si el estado neurológico no cuadra.' },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Lesión difusa', definicion: 'Daño encefálico extendido, sin masa localizada; incluye la concusión y la lesión axonal difusa.' },
      { termino: 'Concusión', definicion: 'Alteración transitoria de la función cerebral tras un traumatismo, con o sin pérdida de conciencia.' },
      { termino: 'Lesión axonal difusa', definicion: 'Ruptura de axones por fuerzas de aceleración-desaceleración rotacional; cursa con deterioro grave y estudio de imagen inicialmente poco expresivo.' },
    ],
    flashcards: [
      { frente: '¿La concusión exige pérdida de conciencia?', reverso: 'No: puede cursar sin desmayo.' },
      { frente: 'Signos de alarma tras una concusión', reverso: 'Vómito repetido, cefalea creciente, somnolencia, convulsión, pupilas desiguales, focalidad.' },
      { frente: '¿Por qué la lesión axonal difusa puede tener tomografía normal?', reverso: 'Porque el daño está en los axones, no en una colección de sangre.' },
      { frente: 'Mecanismo de la lesión axonal difusa', reverso: 'Aceleración-desaceleración con rotación: los axones se estiran y se rompen.' },
    ],
    quiz: [
      {
        pregunta: 'Joven tras colisión: consciente, orientado, sin recordar el impacto y con cefalea. ¿Qué es lo más probable?',
        opciones: ['Hematoma epidural', 'Concusión con amnesia postraumática', 'Lesión axonal difusa', 'Fractura de base de cráneo'],
        correcta: 1,
        explicacion: 'La amnesia del evento con exploración por lo demás normal es característica de la concusión. Aun así requiere vigilancia por si progresa.',
      },
      {
        pregunta: 'Paciente inconsciente tras choque de alta velocidad, con tomografía inicial casi normal. ¿Qué sospechas?',
        opciones: [
          'Que la tomografía descarta lesión cerebral.',
          'Lesión axonal difusa.',
          'Simulación.',
          'Intoxicación exclusivamente.',
        ],
        correcta: 1,
        explicacion: 'La disociación entre estado neurológico grave e imagen poco expresiva es el sello de la lesión axonal difusa.',
      },
    ],
    actividades: null,
  },

  'm5-tcc-signos-sintomas': {
    icono: 'cp-servier-ojo',
    duracion: '14 min',
    resumen: 'Signos y síntomas del traumatismo craneoencefálico: qué se vigila, en qué orden y cuáles anuncian herniación.',
    objetivos: [
      'Estructurar la valoración neurológica del paciente con TCE.',
      'Reconocer los signos de hipertensión intracraneal y herniación.',
      'Identificar los signos de fractura de base de cráneo.',
    ],
    secciones: [
      {
        titulo: 'Lo que se vigila',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'En este orden',
            items: [
              'Nivel de conciencia: AVDI primero, escala de coma de Glasgow después.',
              'Pupilas: tamaño, simetría y reactividad a la luz.',
              'Función motora: fuerza y simetría en las cuatro extremidades.',
              'Constantes: la tensión y la saturación son parte de la valoración neurológica.',
              'Tendencia: repetir y comparar.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El dato más valioso no es una cifra, es un cambio', texto: 'Un Glasgow de 13 que baja a 10 en quince minutos informa muchísimo más que un 10 aislado. La valoración neurológica se hace repetida y se documenta con la hora.' },
        ],
      },
      {
        titulo: 'Hipertensión intracraneal y herniación',
        bloques: [
          { tipo: 'p', texto: 'El cráneo es una caja cerrada. Si algo ocupa espacio —sangre, edema—, la presión sube. Al principio se compensa desplazando líquido cefalorraquídeo y sangre venosa; cuando esa reserva se agota, la presión se dispara y el encéfalo empieza a desplazarse.' },
          {
            tipo: 'tabla',
            titulo: 'Tríada de Cushing — respuesta a la hipertensión intracraneal',
            headers: ['Componente', 'Dirección'],
            filas: [
              ['Tensión arterial', 'AUMENTA (el organismo intenta perfundir el cerebro)'],
              ['Frecuencia cardiaca', 'DISMINUYE (bradicardia refleja)'],
              ['Patrón respiratorio', 'Irregular'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La tríada es un signo TARDÍO', texto: 'Cuando aparece, la herniación está en curso. No es un signo de vigilancia: es una alarma. Y ojo con el patrón: hipertensión con bradicardia es lo contrario del shock hipovolémico, en el que la presión cae y el pulso sube.' },
          {
            tipo: 'lista',
            titulo: 'Otros signos de herniación',
            items: [
              'Pupila dilatada y arreactiva, habitualmente del lado de la lesión.',
              'Deterioro rápido del nivel de conciencia.',
              'Postura de decorticación (flexión) o descerebración (extensión).',
              'Hemiparesia, habitualmente del lado contrario a la lesión.',
            ],
          },
        ],
      },
      {
        titulo: 'Fractura de base de cráneo',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos característicos',
            items: [
              'Equimosis periorbitaria bilateral («ojos de mapache»).',
              'Equimosis retroauricular (signo de Battle), que tarda horas en aparecer.',
              'Salida de líquido claro o sanguinolento por nariz u oído.',
              'Sangre detrás del tímpano.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No taponar la salida de líquido', texto: 'Si sale líquido cefalorraquídeo por oído o nariz, no se obstruye: se cubre con gasa estéril sin comprimir y se deja drenar. Taponarlo aumenta la presión intracraneal y favorece la infección. Y por la misma razón se evita la vía nasal para sondas o dispositivos.' },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Tríada de Cushing', definicion: 'Hipertensión, bradicardia y respiración irregular; respuesta tardía a la hipertensión intracraneal.' },
      { termino: 'Herniación', definicion: 'Desplazamiento del tejido encefálico por aumento de presión, con compresión de estructuras vitales.' },
      { termino: 'Signo de Battle', definicion: 'Equimosis retroauricular indicativa de fractura de base de cráneo; aparece horas después.' },
      { termino: 'Otorrea/rinorrea de LCR', definicion: 'Salida de líquido cefalorraquídeo por oído o nariz; señala solución de continuidad de la base craneal.' },
    ],
    flashcards: [
      { frente: 'Componentes de la tríada de Cushing', reverso: 'Hipertensión, bradicardia y respiración irregular.' },
      { frente: '¿Es la tríada de Cushing un signo precoz?', reverso: 'No: es tardío e indica herniación en curso.' },
      { frente: 'Salida de LCR por el oído: ¿se tapona?', reverso: 'No. Gasa estéril sin comprimir, dejando drenar.' },
      { frente: '¿Qué diferencia el patrón de Cushing del shock hipovolémico?', reverso: 'Cushing: presión alta y pulso bajo. Shock: presión baja y pulso alto.' },
      { frente: '¿Qué dato neurológico vale más que cualquier cifra aislada?', reverso: 'La tendencia: el cambio entre valoraciones sucesivas.' },
    ],
    quiz: [
      {
        pregunta: 'TCE con TA 190/100, FC 48 y respiración irregular. ¿Qué significa?',
        opciones: [
          'Shock hipovolémico.',
          'Tríada de Cushing: hipertensión intracraneal con herniación en curso.',
          'Crisis hipertensiva simple.',
          'Reacción vagal.',
        ],
        correcta: 1,
        explicacion: 'Es la respuesta del organismo para mantener la perfusión cerebral frente a una presión intracraneal muy elevada. Es tardía y grave.',
      },
      {
        pregunta: 'Sale líquido claro por la nariz de un paciente con TCE. ¿Qué haces?',
        opciones: [
          'Taponas la fosa nasal con gasa.',
          'Cubres sin comprimir y dejas drenar; evitas la vía nasal para dispositivos.',
          'Aspiras la fosa nasal.',
          'Colocas sonda nasogástrica.',
        ],
        correcta: 1,
        explicacion: 'Taponar aumenta la presión intracraneal y favorece la infección; la vía nasal está contraindicada por el riesgo de atravesar la fractura.',
      },
      {
        pregunta: 'Glasgow 14 al llegar, 11 diez minutos después. ¿Qué haces?',
        opciones: [
          'Sigues observando: 11 aún es aceptable.',
          'Reconoces un deterioro y actúas: reevalúas, comunicas y aceleras el traslado.',
          'Esperas a que baje de 8.',
          'Repites la escala en media hora.',
        ],
        correcta: 1,
        explicacion: 'La tendencia descendente es un dato de alarma por sí misma, independientemente del valor absoluto.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En la tríada de Cushing la tensión arterial ___ y la frecuencia cardiaca ___.',
          opciones: ['baja / sube', 'sube / baja', 'sube / sube'],
          correcta: 1,
          explicacion: 'Es el patrón inverso al del shock hipovolémico, y por eso confundirlos lleva a tratamientos opuestos.',
        },
      ],
    },
  },

  'm5-tcc-tratamiento': {
    icono: 'ic-ambulancia',
    duracion: '15 min',
    resumen: 'Tratamiento prehospitalario del TCE: la lesión primaria ya ocurrió. Todo lo que se hace aquí es contra la secundaria.',
    objetivos: [
      'Distinguir lesión primaria de secundaria.',
      'Aplicar las medidas que previenen el daño secundario.',
      'Reconocer cuándo la hiperventilación está indicada y cuándo daña.',
    ],
    secciones: [
      {
        titulo: 'Primaria y secundaria',
        bloques: [
          { tipo: 'p', texto: 'La lesión **primaria** es el daño del impacto: ocurrió antes de que llegaras y no se puede deshacer. La **secundaria** es el daño que se añade después —por falta de oxígeno, por falta de presión de perfusión, por edema— y es la que el prehospitalario puede evitar.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Las dos que más daño hacen', texto: 'La hipoxia y la hipotensión son los dos agresores secundarios mejor documentados en el traumatismo craneal: cada episodio empeora el pronóstico de forma marcada. Evitarlos es, literalmente, el tratamiento.' },
        ],
      },
      {
        titulo: 'Qué se hace',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Prioridades',
            items: [
              'Vía aérea permeable, con control cervical si el mecanismo lo indica.',
              'Oxigenación: evitar la desaturación, sin caer en la hiperoxia innecesaria.',
              'Ventilación normal: ni poca ni excesiva.',
              'Mantener la presión arterial dentro de los objetivos del protocolo: la hipotensión es especialmente lesiva aquí.',
              'Cabecera elevada unos 30° si no hay contraindicación, para favorecer el drenaje venoso.',
              'Glucemia: la hipoglucemia imita y agrava el deterioro neurológico.',
              'Prevenir la hipotermia y controlar convulsiones y dolor según protocolo.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cabeza en posición neutra', texto: 'Un collarín demasiado apretado o la cabeza girada comprimen las yugulares y dificultan el drenaje venoso del cerebro: sube la presión intracraneal por un detalle mecánico evitable.' },
        ],
      },
      {
        titulo: 'Hiperventilación: la excepción, no la regla',
        bloques: [
          { tipo: 'p', texto: 'Hiperventilar baja el dióxido de carbono, lo que contrae los vasos cerebrales y reduce la presión intracraneal. Pero esa misma vasoconstricción reduce el flujo sanguíneo cerebral, y en un cerebro ya isquémico eso añade daño.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Solo ante signos de herniación', texto: 'La hiperventilación de rutina en el TCE está proscrita. Se reserva, de forma transitoria y controlada, para signos de herniación —pupila dilatada arreactiva, deterioro brusco, postura anómala— y siempre según el protocolo del servicio, que define la frecuencia objetivo.' },
          {
            tipo: 'lista',
            titulo: 'Errores frecuentes',
            items: [
              'Ventilar demasiado rápido «porque está grave».',
              'Dejar pasar una hipotensión por atender solo la cabeza.',
              'No medir la glucemia en un paciente confuso.',
              'Collarín apretado o cabeza girada durante el traslado.',
            ],
          },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Lesión primaria', definicion: 'Daño producido por el impacto mismo; irreversible y no modificable por el tratamiento.' },
      { termino: 'Lesión secundaria', definicion: 'Daño añadido tras el impacto por hipoxia, hipotensión, edema o hipoglucemia; es evitable.' },
      { termino: 'Presión de perfusión cerebral', definicion: 'Diferencia entre la presión arterial media y la presión intracraneal; determina el flujo sanguíneo al encéfalo.' },
    ],
    flashcards: [
      { frente: '¿Cuáles son los dos agresores secundarios principales del TCE?', reverso: 'La hipoxia y la hipotensión.' },
      { frente: '¿Está indicada la hiperventilación de rutina?', reverso: 'No: solo ante signos de herniación, transitoria y según protocolo.' },
      { frente: '¿Por qué elevar la cabecera 30°?', reverso: 'Para favorecer el drenaje venoso y reducir la presión intracraneal.' },
      { frente: '¿Por qué medir la glucemia en un TCE?', reverso: 'Porque la hipoglucemia imita y agrava el deterioro neurológico.' },
      { frente: '¿Cómo puede un collarín subir la presión intracraneal?', reverso: 'Si aprieta demasiado, comprime las yugulares y dificulta el drenaje venoso.' },
    ],
    quiz: [
      {
        pregunta: '¿Cuál de estas medidas mejora más el pronóstico de un TCE grave?',
        opciones: [
          'Hiperventilar sistemáticamente.',
          'Evitar la hipoxia y la hipotensión.',
          'Administrar diuréticos en la escena.',
          'Aplicar hielo en la cabeza.',
        ],
        correcta: 1,
        explicacion: 'La lesión primaria no se puede deshacer; evitar los agresores secundarios es lo único que cambia el desenlace desde la ambulancia.',
      },
      {
        pregunta: 'Paciente con TCE que desarrolla pupila derecha dilatada arreactiva y postura en extensión. ¿Qué contempla el protocolo?',
        opciones: [
          'Hiperventilación sostenida durante todo el traslado.',
          'Hiperventilación transitoria y controlada según protocolo, por signos de herniación.',
          'Ventilación lenta y superficial.',
          'No modificar la ventilación en ningún caso.',
        ],
        correcta: 1,
        explicacion: 'Es la única situación en que se acepta, y de forma transitoria: mantenida, la vasoconstricción añade isquemia.',
      },
      {
        pregunta: 'TCE grave con TA 84/50. ¿Qué prioridad tiene la hipotensión?',
        opciones: [
          'Secundaria: lo importante es la cabeza.',
          'Máxima: la hipotensión es uno de los factores que más empeora el pronóstico neurológico.',
          'Ninguna si el Glasgow es alto.',
          'Solo importa si hay hemorragia externa.',
        ],
        correcta: 1,
        explicacion: 'Sin presión no hay perfusión cerebral; corregirla es tratar la cabeza.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena las prioridades en el TCE grave',
        pasos: [
          'Vía aérea permeable con control cervical',
          'Oxigenación adecuada, evitando la desaturación',
          'Ventilación normal (sin hiperventilar de rutina)',
          'Mantener la presión arterial en objetivos',
          'Cabecera elevada, cabeza neutra y traslado a centro con neurocirugía',
        ],
      },
    },
  },

  'm5-tcc-medular-posterior': {
    icono: 'cp-smart-medula-espinal',
    duracion: '10 min',
    resumen: 'Síndrome medular posterior: se pierde la posición y la vibración, se conserva la fuerza. Raro y fácil de pasar por alto.',
    objetivos: [
      'Describir qué funciones transporta la parte posterior de la médula.',
      'Reconocer el cuadro clínico característico.',
      'Diferenciarlo de los síndromes anterior y de Brown-Séquard.',
    ],
    secciones: [
      {
        titulo: 'Qué se pierde',
        bloques: [
          { tipo: 'p', texto: 'Por los cordones posteriores viajan la propiocepción —saber dónde están las partes del cuerpo sin mirarlas—, la sensibilidad vibratoria y el tacto fino. Si se lesionan, el paciente conserva fuerza, dolor y temperatura, pero pierde la noción de la posición de sus miembros.' },
          {
            tipo: 'tabla',
            headers: ['Función', 'Estado'],
            filas: [
              ['Fuerza muscular', 'Conservada'],
              ['Dolor y temperatura', 'Conservados'],
              ['Propiocepción y vibración', 'PERDIDAS'],
              ['Tacto fino', 'Alterado'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Cómo se manifiesta', texto: 'El paciente camina mirándose los pies y empeora mucho al cerrar los ojos o en la oscuridad, porque compensa con la vista lo que ya no siente. Como la fuerza está intacta, es fácil darlo por normal si no se explora la sensibilidad.' },
        ],
      },
      {
        titulo: 'Comparado con los otros',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Los tres síndromes medulares incompletos',
            headers: ['Síndrome', 'Motor', 'Dolor/temperatura', 'Propiocepción'],
            filas: [
              ['Anterior', 'Perdido', 'Perdidos', 'Conservada'],
              ['Posterior', 'Conservado', 'Conservados', 'PERDIDA'],
              ['Brown-Séquard', 'Perdido del mismo lado', 'Perdidos del lado contrario', 'Perdida del mismo lado'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La regla que los ordena', texto: 'Lo que va por delante de la médula (motor, dolor y temperatura) se pierde en el anterior; lo que va por detrás (posición y vibración) se pierde en el posterior. Brown-Séquard es media médula: mezcla ambos, cruzados.' },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Síndrome medular posterior', definicion: 'Lesión de los cordones posteriores con pérdida de propiocepción, vibración y tacto fino, conservando fuerza, dolor y temperatura.' },
      { termino: 'Propiocepción', definicion: 'Percepción de la posición del propio cuerpo sin necesidad de verlo.' },
    ],
    flashcards: [
      { frente: '¿Qué se pierde en el síndrome medular posterior?', reverso: 'Propiocepción, vibración y tacto fino.' },
      { frente: '¿Qué se conserva?', reverso: 'La fuerza, el dolor y la temperatura.' },
      { frente: '¿Por qué empeora en la oscuridad?', reverso: 'Porque el paciente compensa con la vista la posición que ya no percibe.' },
    ],
    quiz: [
      {
        pregunta: 'Tras un traumatismo cervical, el paciente mueve bien las extremidades y siente el pinchazo, pero no sabe si le mueves el dedo del pie con los ojos cerrados. ¿Qué síndrome es?',
        opciones: ['Anterior', 'Posterior', 'Brown-Séquard', 'Sección completa'],
        correcta: 1,
        explicacion: 'Fuerza y dolor conservados con pérdida de propiocepción definen el síndrome posterior.',
      },
      {
        pregunta: '¿Por qué puede pasar desapercibido este síndrome?',
        opciones: [
          'Porque el paciente no puede hablar.',
          'Porque la fuerza está conservada y una exploración que solo valore movilidad parece normal.',
          'Porque no produce síntomas.',
          'Porque solo aparece días después.',
        ],
        correcta: 1,
        explicacion: 'Si no se explora la sensibilidad profunda, el paciente parece neurológicamente intacto.',
      },
    ],
    actividades: null,
  },

  'm5-tcc-brown-sequard': {
    icono: 'cp-smart-medula-espinal',
    duracion: '11 min',
    resumen: 'Síndrome de Brown-Séquard: media médula lesionada. Parálisis de un lado y pérdida de dolor del otro — el cuadro cruzado.',
    objetivos: [
      'Explicar por qué el déficit es cruzado.',
      'Reconocer el cuadro clínico.',
      'Relacionarlo con el mecanismo penetrante típico.',
    ],
    secciones: [
      {
        titulo: 'Por qué el déficit se cruza',
        bloques: [
          { tipo: 'p', texto: 'La clave está en dónde cruza cada vía. Las fibras del dolor y la temperatura cruzan al lado contrario **nada más entrar en la médula**, así que suben por el lado opuesto al que las recibió. Las fibras motoras y las de propiocepción cruzan mucho más arriba, ya en el tronco encefálico, así que dentro de la médula viajan por su propio lado.' },
          { tipo: 'callout', variante: 'clave', titulo: 'El resultado', texto: 'Al cortar media médula se pierde la fuerza y la propiocepción DEL MISMO LADO de la lesión, y el dolor y la temperatura DEL LADO CONTRARIO. Por eso el paciente no siente el pinchazo en la pierna que sí puede mover, y mueve mal la pierna en la que sí siente.' },
          {
            tipo: 'tabla',
            headers: ['Función', 'Lado de la lesión', 'Lado contrario'],
            filas: [
              ['Fuerza motora', 'PERDIDA', 'Conservada'],
              ['Propiocepción y vibración', 'PERDIDAS', 'Conservadas'],
              ['Dolor y temperatura', 'Conservados', 'PERDIDOS'],
            ],
          },
        ],
      },
      {
        titulo: 'Mecanismo y pronóstico',
        bloques: [
          { tipo: 'p', texto: 'Lo produce típicamente un traumatismo penetrante —arma blanca o de fuego— que secciona un lado de la médula, aunque también puede darse por fractura-luxación unilateral o compresión lateral.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'De los que mejor pronóstico tienen', texto: 'Dentro de los síndromes medulares incompletos, Brown-Séquard es el que más recuperación funcional suele alcanzar. Eso hace todavía más valioso lo que se haga bien en la escena: hay función que preservar.' },
          {
            tipo: 'lista',
            titulo: 'Manejo prehospitalario',
            items: [
              'Restricción del movimiento espinal.',
              'Documentar el déficit por lado y por función: es la referencia con la que se medirá la evolución.',
              'Vigilar shock neurogénico si la lesión es cervical o torácica alta.',
              'Traslado a centro con capacidad neuroquirúrgica.',
            ],
          },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Síndrome de Brown-Séquard', definicion: 'Hemisección medular con pérdida motora y propioceptiva ipsilateral y pérdida de dolor y temperatura contralateral.' },
      { termino: 'Ipsilateral', definicion: 'Del mismo lado que la lesión.' },
      { termino: 'Contralateral', definicion: 'Del lado opuesto a la lesión.' },
    ],
    flashcards: [
      { frente: 'En Brown-Séquard, ¿qué se pierde del mismo lado de la lesión?', reverso: 'La fuerza motora y la propiocepción.' },
      { frente: '¿Y del lado contrario?', reverso: 'El dolor y la temperatura.' },
      { frente: '¿Por qué se cruza el déficit?', reverso: 'Porque las fibras de dolor y temperatura cruzan al entrar en la médula; las motoras cruzan mucho más arriba.' },
      { frente: 'Mecanismo típico', reverso: 'Traumatismo penetrante que secciona un lado de la médula.' },
    ],
    quiz: [
      {
        pregunta: 'Herida por arma blanca en espalda. No mueve la pierna derecha pero sí siente el pinchazo en ella; mueve la izquierda pero no percibe el pinchazo. ¿Qué es?',
        opciones: ['Síndrome medular anterior', 'Síndrome de Brown-Séquard', 'Síndrome medular posterior', 'Sección medular completa'],
        correcta: 1,
        explicacion: 'Déficit motor de un lado con pérdida de dolor del contrario es el patrón cruzado característico de la hemisección medular.',
      },
      {
        pregunta: '¿Por qué importa documentar el déficit lado por lado en la escena?',
        opciones: [
          'Por trámite administrativo.',
          'Porque es la referencia con la que se medirá la evolución y este síndrome suele recuperar función.',
          'Porque decide el tipo de ambulancia.',
          'No es necesario documentarlo.',
        ],
        correcta: 1,
        explicacion: 'Sin una exploración inicial registrada no se puede saber después si el paciente mejoró o empeoró.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'En Brown-Séquard se pierde la fuerza del lado ___ y el dolor del lado ___.',
          opciones: ['contrario / mismo', 'mismo / contrario', 'mismo / mismo'],
          correcta: 1,
          explicacion: 'Motor ipsilateral, dolor y temperatura contralaterales.',
        },
      ],
    },
  },

  'm5-tcc-exploracion-fisica': {
    icono: 'cp-servier-mano',
    duracion: '13 min',
    resumen: 'Exploración física de la columna: cómo se valora sin mover al paciente y qué se documenta.',
    objetivos: [
      'Ejecutar la exploración de columna sin movilizar al paciente.',
      'Valorar función motora y sensitiva por niveles.',
      'Documentar hallazgos de forma comparable.',
    ],
    secciones: [
      {
        titulo: 'Explorar sin mover',
        bloques: [
          { tipo: 'p', texto: 'Toda la valoración se hace en la posición en que se encuentra al paciente, o durante una movilización en bloque necesaria por otro motivo. La exploración no justifica por sí sola sentar o girar a nadie.' },
          {
            tipo: 'pasos',
            titulo: 'Secuencia',
            items: [
              'Preguntar por dolor en el cuello o la espalda antes de tocar.',
              'Palpar la línea media desde el occipucio hasta el sacro buscando dolor, escalón o deformidad.',
              'Valorar fuerza en las cuatro extremidades y compararlas.',
              'Valorar sensibilidad en un punto de cada extremidad, y por niveles si hay déficit.',
              'Preguntar por hormigueo, quemazón o sensación de descarga eléctrica.',
              'Documentar la hora y repetir la exploración.',
            ],
          },
        ],
      },
      {
        titulo: 'Qué buscar',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Signos de lesión medular',
            items: [
              'Debilidad o parálisis en una o más extremidades.',
              'Pérdida o alteración de la sensibilidad, con un nivel a partir del cual cambia.',
              'Parestesias: hormigueo o quemazón.',
              'Priapismo en el varón.',
              'Pérdida del control de esfínteres.',
              'Respiración solo abdominal, que sugiere lesión cervical con afectación de los músculos intercostales.',
              'Hipotensión con bradicardia y piel caliente: shock neurogénico.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El paciente que no puede colaborar', texto: 'Con alteración de conciencia, intoxicación o dolor distractor importante, la exploración no es fiable: no descarta nada. En esos casos se asume lesión espinal por mecanismo y se aplica restricción del movimiento.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Documenta lo que encuentras, no lo que concluyes', texto: '«Mueve dedos de ambos pies, no eleva pierna derecha, no percibe pinchazo desde el ombligo hacia abajo, hora 14:32» vale mucho más que «déficit neurológico». Lo primero se puede comparar; lo segundo, no.' },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Nivel sensitivo', definicion: 'Altura corporal a partir de la cual cambia la sensibilidad; orienta el segmento medular afectado.' },
      { termino: 'Dolor distractor', definicion: 'Lesión tan dolorosa que impide al paciente percibir o referir el dolor espinal, restando fiabilidad a la exploración.' },
      { termino: 'Priapismo', definicion: 'Erección persistente e involuntaria; en trauma puede indicar lesión medular.' },
    ],
    flashcards: [
      { frente: '¿Se sienta al paciente para explorarle la espalda?', reverso: 'No: se explora en la posición encontrada o durante una movilización en bloque ya necesaria.' },
      { frente: '¿Qué sugiere una respiración solo abdominal en trauma?', reverso: 'Lesión cervical con afectación de los músculos intercostales.' },
      { frente: '¿Cuándo NO es fiable la exploración espinal?', reverso: 'Con alteración de conciencia, intoxicación o dolor distractor.' },
      { frente: '¿Cómo se documenta un hallazgo neurológico?', reverso: 'Describiendo lo observado con la hora, no la conclusión.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con fractura de fémur muy dolorosa niega dolor cervical. ¿Puedes descartar lesión espinal?',
        opciones: [
          'Sí: no le duele el cuello.',
          'No: el dolor distractor resta fiabilidad a la exploración.',
          'Sí, si mueve las cuatro extremidades.',
          'Solo si el mecanismo fue de baja energía.',
        ],
        correcta: 1,
        explicacion: 'Una lesión muy dolorosa puede enmascarar el dolor espinal; la exploración deja de ser fiable para descartar.',
      },
      {
        pregunta: '¿Cuál de estas anotaciones es más útil para quien reciba al paciente?',
        opciones: [
          '«Paciente con déficit neurológico».',
          '«No eleva pierna izquierda, mueve la derecha; no percibe pinchazo desde ombligo hacia abajo. 14:32».',
          '«Posible lesión medular».',
          '«Neurológico alterado, ver evolución».',
        ],
        correcta: 1,
        explicacion: 'Solo la descripción concreta con hora permite comparar y detectar mejoría o deterioro.',
      },
    ],
    actividades: null,
  },

  'm5-tcc-signos-tratamiento-columna': {
    icono: 'ic-collarin',
    duracion: '12 min',
    resumen: 'Signos y tratamiento prehospitalario del traumatismo espinal: qué se sospecha por mecanismo y qué se hace con ello.',
    objetivos: [
      'Identificar los mecanismos de alto riesgo de lesión espinal.',
      'Reconocer los signos que obligan a asumir lesión.',
      'Aplicar el manejo prehospitalario, incluido el shock neurogénico.',
    ],
    secciones: [
      {
        titulo: 'Sospechar por mecanismo',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Mecanismos de alto riesgo',
            items: [
              'Caída desde una altura superior a la del propio paciente.',
              'Zambullida en agua poco profunda.',
              'Colisión a alta velocidad, vuelco o eyección del vehículo.',
              'Atropello.',
              'Trauma penetrante en la proximidad de la columna.',
              'Cualquier traumatismo en paciente con osteoporosis o artritis avanzada, incluso de baja energía.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El anciano rompe las reglas', texto: 'En una columna rígida y osteoporótica, una caída desde su propia altura puede fracturar vértebras cervicales. En el paciente mayor el umbral de sospecha debe ser mucho más bajo.' },
        ],
      },
      {
        titulo: 'Manejo',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Prioridades',
            items: [
              'Restricción del movimiento espinal cuando esté indicada, manteniendo alineación neutra.',
              'Vía aérea con maniobras que no extiendan el cuello; vigilar la ventilación en lesiones cervicales.',
              'Movilización siempre en bloque, con el número de personas necesario.',
              'Buscar y tratar el shock neurogénico: hipotensión con bradicardia y piel caliente.',
              'Prevención activa de la hipotermia: sin vasoconstricción el paciente se enfría muy rápido.',
              'Exploración neurológica documentada y repetida.',
              'Traslado a centro con capacidad neuroquirúrgica.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'No des la hipotensión por explicada', texto: 'En un politraumatizado con lesión medular, atribuir la hipotensión al shock neurogénico y dejar de buscar hemorragia es un error clásico y mortal. Primero se descarta el sangrado.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Sobre los corticoides', texto: 'El uso sistemático de corticoides en la lesión medular aguda fue práctica habitual durante años y hoy no se recomienda de rutina. Es un buen ejemplo de por qué el temario debe revisarse contra la edición vigente de la bibliografía y no contra lo que se enseñaba antes.' },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Movilización en bloque', definicion: 'Técnica coordinada que mueve cabeza, tronco y pelvis como una unidad, sin rotación ni flexión.' },
      { termino: 'Alineación neutra', definicion: 'Posición en la que la cabeza y el tronco mantienen su eje natural, sin flexión, extensión ni rotación.' },
    ],
    flashcards: [
      { frente: 'Mecanismos de alto riesgo espinal', reverso: 'Caída de altura, zambullida, alta velocidad, vuelco, eyección, atropello, penetrante próximo a la columna.' },
      { frente: '¿Por qué el anciano tiene umbral de sospecha más bajo?', reverso: 'Porque una columna rígida y osteoporótica se fractura con caídas de baja energía.' },
      { frente: 'Hipotensión en lesión medular: ¿qué haces primero?', reverso: 'Descartar hemorragia antes de atribuirla al shock neurogénico.' },
      { frente: '¿Se usan corticoides de rutina en lesión medular aguda?', reverso: 'No: dejó de recomendarse de forma sistemática.' },
    ],
    quiz: [
      {
        pregunta: 'Mujer de 84 años que cayó desde su propia altura y refiere dolor cervical. ¿Qué haces?',
        opciones: [
          'Descartas lesión espinal: el mecanismo es de baja energía.',
          'Aplicas restricción del movimiento espinal: en el anciano el umbral es más bajo.',
          'La sientas para explorarla mejor.',
          'La trasladas sin más precauciones.',
        ],
        correcta: 1,
        explicacion: 'Una columna osteoporótica y rígida puede fracturarse con mecanismos que en un joven serían banales.',
      },
      {
        pregunta: 'Politraumatizado con lesión medular cervical y TA 80/48. ¿Cuál es tu conducta?',
        opciones: [
          'Asumir shock neurogénico y no buscar más.',
          'Descartar activamente hemorragia y tratar el shock mientras se investiga.',
          'Administrar corticoides.',
          'Sentar al paciente.',
        ],
        correcta: 1,
        explicacion: 'La hemorragia es la causa más frecuente y más letal de hipotensión en trauma; el shock neurogénico es un diagnóstico de exclusión en este contexto.',
      },
    ],
    actividades: null,
  },

  'm5-tcc-inmovilizacion-espinal': {
    icono: 'ic-collarin',
    duracion: '16 min',
    resumen: 'Restricción del movimiento espinal: por qué la tabla rígida dejó de ser el estándar de transporte y cómo se decide hoy.',
    objetivos: [
      'Explicar el cambio de inmovilización sistemática a restricción selectiva.',
      'Aplicar criterios para decidir cuándo está indicada.',
      'Reconocer la tabla larga como herramienta de extracción, no de transporte.',
    ],
    secciones: [
      {
        titulo: 'Qué cambió y por qué',
        bloques: [
          { tipo: 'p', texto: 'Durante décadas todo paciente de trauma viajaba atado a una tabla rígida. La práctica se revisó al comprobar que la tabla causa daño propio y que el beneficio no estaba demostrado en la mayoría de los pacientes.' },
          {
            tipo: 'lista',
            titulo: 'Problemas documentados de la tabla larga',
            items: [
              'Úlceras por presión en minutos, sobre todo en occipucio, escápulas y sacro.',
              'Dolor que puede confundirse con lesión y llevar a estudios innecesarios.',
              'Compromiso respiratorio por restricción de la caja torácica.',
              'Riesgo de broncoaspiración en el paciente que vomita atado en decúbito supino.',
              'Aumento de la presión intracraneal por el collarín mal ajustado.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'El concepto nuevo', texto: 'Se pasó de «inmovilizar» a **restringir el movimiento espinal**: mantener la alineación neutra y limitar el movimiento con el conjunto de medidas adecuado —collarín, camilla de cuchara, colchón de vacío, sujeciones y las propias instrucciones al paciente—, no necesariamente con una tabla.' },
        ],
      },
      {
        titulo: 'Cuándo está indicada',
        bloques: [
          { tipo: 'p', texto: 'La decisión se toma combinando mecanismo y exploración. Los criterios exactos los fija el protocolo del servicio, pero los elementos que casi siempre aparecen son estos.' },
          {
            tipo: 'lista',
            titulo: 'Indican restricción',
            items: [
              'Alteración del estado de conciencia o intoxicación.',
              'Dolor o hipersensibilidad en la línea media de la columna.',
              'Déficit neurológico focal, parestesias o debilidad.',
              'Deformidad anatómica de la columna.',
              'Dolor distractor que impida una valoración fiable.',
              'Mecanismo de alto riesgo, en especial en el paciente mayor.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El paciente que camina', texto: 'Un paciente despierto, orientado, sin dolor en la línea media, sin déficit y sin dolor distractor, puede no necesitar restricción aunque el choque fuera aparatoso. Aplicar el criterio y documentarlo es mejor práctica que atar por costumbre.' },
        ],
      },
      {
        titulo: 'La tabla larga hoy',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Herramienta de extracción, no de transporte', texto: 'La tabla larga sirve para sacar y mover a un paciente. Una vez en la camilla, lo indicado es retirarla y trasladar sobre la superficie acolchada, con la alineación mantenida por otros medios. Dejarla puesta durante todo el traslado es lo que produce las lesiones por presión.' },
          {
            tipo: 'lista',
            titulo: 'Detalles que marcan la diferencia',
            items: [
              'Collarín de la talla correcta: uno grande extiende el cuello y uno pequeño lo flexiona.',
              'No apretar el collarín hasta comprimir las yugulares: sube la presión intracraneal.',
              'Acolchar los huecos, sobre todo el occipucio en el adulto.',
              'En el niño, el occipucio es proporcionalmente grande: hay que acolchar bajo los hombros para no flexionar el cuello.',
              'Si el paciente vomita, girar todo el conjunto en bloque.',
            ],
          },
          FUENTE,
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Restricción del movimiento espinal', definicion: 'Conjunto de medidas para mantener la alineación neutra y limitar el movimiento, sustituto del concepto de inmovilización sistemática con tabla.' },
      { termino: 'Tabla larga', definicion: 'Dispositivo rígido de extracción y movilización; no está indicado como superficie de transporte prolongado.' },
      { termino: 'Restricción selectiva', definicion: 'Aplicación de la restricción solo a los pacientes que cumplen criterios de riesgo, en vez de a todos.' },
    ],
    flashcards: [
      { frente: '¿Cuál es hoy la función de la tabla larga?', reverso: 'Extracción y movilización; no es superficie de transporte.' },
      { frente: 'Tres daños documentados de la tabla rígida', reverso: 'Úlceras por presión, dolor que confunde y compromiso respiratorio.' },
      { frente: 'Criterios que indican restricción del movimiento', reverso: 'Conciencia alterada, dolor en línea media, déficit neurológico, deformidad, dolor distractor, mecanismo de alto riesgo.' },
      { frente: '¿Dónde se acolcha en el niño y por qué?', reverso: 'Bajo los hombros: su occipucio grande flexionaría el cuello.' },
      { frente: '¿Por qué un collarín demasiado apretado es peligroso?', reverso: 'Comprime las yugulares y aumenta la presión intracraneal.' },
    ],
    quiz: [
      {
        pregunta: 'Colisión aparatosa. Paciente despierto, orientado, sin dolor cervical ni en línea media, sin déficit y sin otras lesiones dolorosas. ¿Qué corresponde?',
        opciones: [
          'Tabla rígida y collarín siempre: el mecanismo fue de alta energía.',
          'Valorar con criterios: puede no requerir restricción, y se documenta la decisión.',
          'Collarín pero sin más valoración.',
          'Trasladarlo sentado sin explorar.',
        ],
        correcta: 1,
        explicacion: 'La restricción es selectiva: se aplica a quien cumple criterios. Atar por costumbre añade riesgo sin beneficio demostrado.',
      },
      {
        pregunta: 'Ya trasladaste al paciente desde el suelo con tabla larga hasta la camilla. ¿Qué haces con la tabla?',
        opciones: [
          'La dejas puesta durante todo el traslado.',
          'La retiras y mantienes la alineación por otros medios sobre la superficie acolchada.',
          'La cambias por otra tabla más blanda.',
          'La dejas y añades más sujeciones.',
        ],
        correcta: 1,
        explicacion: 'Cumplida su función de extracción, mantenerla solo añade dolor y riesgo de úlceras por presión.',
      },
      {
        pregunta: 'Al inmovilizar a un niño pequeño en posición supina, ¿qué precaución tomas?',
        opciones: [
          'Acolchar bajo la cabeza como en el adulto.',
          'Acolchar bajo los hombros, porque su occipucio grande flexionaría el cuello.',
          'No usar collarín nunca.',
          'Elevar las piernas.',
        ],
        correcta: 1,
        explicacion: 'La proporción craneal del niño hace que apoyarlo plano le flexione el cuello; el acolchado escapular restablece la neutralidad.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la decisión sobre restricción del movimiento espinal',
        pasos: [
          'Valorar el mecanismo de lesión',
          'Comprobar estado de conciencia e intoxicación',
          'Explorar dolor en la línea media y déficit neurológico',
          'Descartar dolor distractor que reste fiabilidad',
          'Aplicar restricción si cumple criterios y documentar la decisión',
        ],
      },
    },
  },
}
