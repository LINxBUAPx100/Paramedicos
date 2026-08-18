// ============================================================
//  Módulo 5 · Actividades añadidas a lecciones ya redactadas
// ------------------------------------------------------------
//  De las 33 lecciones redactadas del Módulo 5, diecisiete no tenían
//  actividad. Esa deuda quedó enumerada en `docs/ESTADO-PRODUCCION-ACELERADA.md`
//  y en `docs/RELEVO-CLAUDE-2026-08-17.md`.
//
//  Este archivo la resuelve SIN TOCAR nada más. Aporta únicamente el campo
//  `actividades` de cada tema, y el punto de unión de `contenido/index.js`
//  fusiona POR CAMPO: el texto, las secciones, los conceptos, las tarjetas, el
//  quiz, las fuentes y la ficha editorial de cada lección siguen viniendo de su
//  archivo original —`m5-torax.js`, `m5-abdomen.js`, `m5-craneo-columna.js`— y
//  no se reescriben ni se degradan.
//
//  CRITERIO DE CADA ACTIVIDAD
//
//  · Se deriva EXCLUSIVAMENTE de lo que su propia lección enseña. Cada opción
//    correcta usa vocabulario que aparece en el texto del tema.
//  · No repite ninguna pregunta del quiz de la lección.
//  · `ordenar` se usa solo donde la lección ya describe una secuencia real
//    —un bloque de `pasos` o una lista de prioridades—, nunca para barajar una
//    enumeración que no tiene orden propio.
//  · No aparece ninguna dosis, volumen, calibre, umbral de tensión ni sitio de
//    punción: todo el Módulo 5 los remite al protocolo del servicio, y una
//    actividad no puede fijar lo que la lección deja abierto.
//  · Donde la lección declara que un dato lo fija el protocolo, la actividad
//    evalúa precisamente eso.
//
//  Ninguna actividad de este archivo procede de `reutilizado.js`.
// ============================================================

// Atajo: una frase de completar. Es el formato dominante aquí porque obliga a
// elegir el término exacto dentro de una relación causal ya enseñada.
const c = (texto, opciones, correcta, explicacion) => ({ texto, opciones, correcta, explicacion })

export default {
  // ---------- Trauma de tórax ----------

  'm5-tt-definicion': {
    actividades: {
      completar: [
        c(
          'Cuando el pulmón deja de intercambiar gases porque el alvéolo está ocupado, el problema que produce el trauma torácico es la ___.',
          ['hipercapnia', 'hipoxia', 'hipoperfusión', 'hipotermia'], 1,
          'Los tres problemas del tórax se reparten así: fallo de intercambio (hipoxia), fallo de ventilación (hipercapnia) y fallo de retorno o de volumen (hipoperfusión).'
        ),
        c(
          'Un tórax inestable o un dolor que impide respirar hondo comprometen sobre todo la ventilación, y por eso producen ___.',
          ['hipercapnia', 'peritonitis', 'hipoperfusión', 'hemorragia externa'], 0,
          'Lo que falla no es el alvéolo sino el fuelle: el aire no se renueva y el dióxido de carbono se acumula.'
        ),
        c(
          'Ante una desaceleración brusca, la mecánica del accidente obliga a pensar en ___.',
          ['asfixia traumática', 'disrupción aórtica', 'fractura de clavícula', 'quilotórax'], 1,
          'La lección usa la mecánica para acotar la búsqueda: desaceleración apunta a la aorta; compresión súbita, a la asfixia traumática.'
        ),
        c(
          'La mayoría de las lesiones torácicas NO se resuelven en quirófano, sino con oxígeno, ventilación adecuada, control del dolor, descompresión o ___.',
          ['un drenaje', 'una toracotomía', 'una laparotomía', 'antibióticos'], 0,
          'Lo que mata en el tórax es no reconocer la lesión a tiempo, no la falta de quirófano.'
        ),
      ],
    },
  },

  'm5-tt-clavicula': {
    actividades: {
      ordenar: {
        titulo: 'Ordena el manejo de una fractura de clavícula',
        pasos: [
          'Valorar pulso, sensibilidad y fuerza distales ANTES de tocar nada',
          'Colocar el cabestrillo con el brazo apoyado contra el tórax',
          'Administrar analgesia según protocolo',
          'Reevaluar pulso y sensibilidad después de inmovilizar',
        ],
      },
      completar: [
        c(
          'Auscultar ambos campos en una fractura de clavícula desplazada busca descartar un ___.',
          ['hemotórax masivo', 'neumotórax', 'taponamiento cardiaco', 'quilotórax'], 1,
          'Un extremo óseo desplazado puede perforar la pleura apical, que queda justo por debajo.'
        ),
      ],
    },
  },

  'm5-tt-escapula': {
    actividades: {
      completar: [
        c(
          'Como la escápula está envuelta en músculo y bien protegida, romperla exige mucha energía: por eso la fractura vale sobre todo como ___.',
          ['el problema principal a tratar', 'un marcador de alta energía', 'un criterio de alta en el lugar', 'una lesión sin repercusión'], 1,
          'La escápula rota es una señal de lo que pasó alrededor, no la lesión que decide el pronóstico.'
        ),
        c(
          'Encontrar una fractura de escápula obliga a auscultar ambos campos porque debajo puede haber contusión pulmonar o ___.',
          ['neumotórax', 'peritonitis', 'lesión uretral', 'mediastinitis'], 0,
          'Junto con las fracturas costales y la lesión de columna torácica, es una de las lesiones asociadas que la lección manda buscar.'
        ),
        c(
          'Ante un impacto anterior con fractura de escápula, la lección añade a la búsqueda la lesión de ___.',
          ['grandes vasos', 'vejiga', 'páncreas', 'conducto torácico'], 0,
          'Es la lesión asociada que la lección reserva específicamente para los impactos anteriores.'
        ),
      ],
    },
  },

  'm5-tt-esofago': {
    actividades: {
      completar: [
        c(
          'El esófago está profundo, en el mediastino posterior; por eso su lesión es rara en trauma cerrado y la causa habitual es ___.',
          ['la compresión torácica', 'el trauma penetrante', 'la desaceleración', 'la fractura costal'], 1,
          'En el trauma cerrado hace falta un aumento brusco de la presión dentro del esófago para romperlo.'
        ),
        c(
          'Palpar crepitación en el cuello de un traumatizado indica ___ donde no debería haberlo.',
          ['líquido', 'aire', 'hueso', 'contenido gástrico'], 1,
          'Es el enfisema subcutáneo, y señala una fuga desde la vía aérea o desde el tubo digestivo.'
        ),
        c(
          'Lo que vuelve mortal a la perforación esofágica es la ___ producida por el vertido de saliva y contenido digestivo al mediastino.',
          ['mediastinitis', 'peritonitis química', 'hipoxia', 'coagulopatía'], 0,
          'Su mortalidad depende directamente de lo pronto que se repare la perforación.'
        ),
        c(
          'Como el pronóstico depende del tiempo hasta la reparación, la aportación del TUM que más pesa es documentar el trayecto de la herida y ___.',
          ['esperar a que aparezca la fiebre', 'prealertar al centro quirúrgico con la sospecha explícita', 'administrar líquidos por vía oral', 'taponar el enfisema'], 1,
          'La lección lo dice sin rodeos: la sospecha comunicada en la entrega vale tanto como cualquier maniobra.'
        ),
      ],
    },
  },

  'm5-tt-hemoneumotorax': {
    actividades: {
      completar: [
        c(
          'Percusión MATE en los campos inferiores de un hemitórax traumatizado sugiere ___.',
          ['aire', 'sangre', 'vísceras abdominales', 'linfa'], 1,
          'El sonido apagado indica líquido; en trauma, sangre. El aire, en cambio, suena timpánico y se acumula arriba.'
        ),
        c(
          'Percusión TIMPÁNICA en los campos superiores del mismo hemitórax sugiere ___.',
          ['sangre', 'aire', 'consolidación', 'derrame lechoso'], 1,
          'Aire arriba y sangre abajo, con el pulmón comprimido entre ambos: es la combinación que define el hemoneumotórax.'
        ),
        c(
          'Ingurgitación yugular con disnea extrema en este cuadro señala que existe un componente ___.',
          ['a tensión', 'infeccioso', 'hipovolémico puro', 'neurogénico'], 0,
          'Es el hallazgo que obliga a descomprimir según protocolo antes de seguir con el resto del manejo.'
        ),
        c(
          'Que un hemitórax pueda alojar una cantidad enorme de sangre sin que se vea nada por fuera explica los cuadros de ___.',
          ['shock sin herida visible', 'peritonitis precoz', 'enfisema subcutáneo', 'dolor referido al hombro'], 0,
          'El tórax es uno de los lugares donde se esconde una hemorragia, y por eso se busca ahí ante un shock inexplicado.'
        ),
      ],
    },
  },

  'm5-tt-quilotorax': {
    actividades: {
      completar: [
        c(
          'El quilotórax se produce al romperse el ___, que recoge la linfa de casi todo el cuerpo y la vierte en el sistema venoso.',
          ['conducto torácico', 'esófago', 'diafragma', 'pedículo pulmonar'], 0,
          'Se rompe por trauma penetrante, por cirugía y, con menos frecuencia, por trauma cerrado con hiperextensión de la columna.'
        ),
        c(
          'El derrame tarda en hacerse evidente porque el flujo linfático depende de ___.',
          ['la posición del paciente', 'la ingesta de grasas', 'la presión arterial', 'la temperatura ambiente'], 1,
          'Con el paciente en ayuno el flujo es escaso: pueden pasar más de un día hasta que el derrame dé síntomas.'
        ),
        c(
          'Además de comprimir el pulmón, un quilotórax prolongado provoca desnutrición y ___ por la pérdida de linfocitos.',
          ['hipertermia', 'inmunodepresión', 'coagulopatía', 'hipertensión'], 1,
          'Por eso la lección insiste en que no es un derrame banal, aunque casi nunca se diagnostique en la escena.'
        ),
        c(
          'Como el diagnóstico es posterior, lo que realmente aporta el prehospitalario en esta lesión es ___.',
          ['drenar el derrame', 'documentar el mecanismo y el trayecto de la herida', 'indicar una dieta sin grasa', 'repetir la auscultación cada cinco minutos'], 1,
          'Ese antecedente bien registrado es lo que permite sospecharla cuando el derrame aparece días más tarde.'
        ),
      ],
    },
  },

  'm5-tt-asfixia-traumatica': {
    actividades: {
      completar: [
        c(
          'La sangre retrocede hacia la cabeza y el cuello porque en ese territorio venoso no hay ___ que lo impidan.',
          ['músculos', 'válvulas', 'capilares', 'ganglios'], 1,
          'Por eso la presión torácica súbita se transmite hacia arriba y revienta los capilares de esa zona.'
        ),
        c(
          'Lo que distingue la asfixia traumática de la cianosis por hipoxia es que la coloración tiene un ___.',
          ['tono más oscuro', 'límite neto por encima del punto de compresión', 'inicio más lento', 'predominio en las manos'], 1,
          'La cianosis por hipoxia es generalizada; aquí la mitad superior está amoratada y el resto del cuerpo, normal.'
        ),
        c(
          'El color llamativo suele resolverse solo en días; lo que de verdad decide el pronóstico es ___.',
          ['la extensión de las petequias', 'la energía que hizo falta para producirlo y las lesiones internas asociadas', 'la hemorragia subconjuntival', 'el edema de párpados'], 1,
          'La asfixia traumática es un cartel que avisa de aplastamiento: obliga a buscar contusión pulmonar, fracturas costales, lesión cardiaca, trauma abdominal y lesión de columna.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Rescatas a un operario que estuvo atrapado bajo una carga. Presenta el cuadro completo de asfixia traumática y, durante el traslado, se muestra progresivamente más somnoliento y desorientado. ¿Cómo interpretas ese cambio?',
          opciones: [
            'Es un efecto esperable del color de la piel y no requiere nada.',
            'Es un dato a vigilar: la lección advierte que la hipertensión venosa cerebral puede alterar el estado neurológico, y además obliga a reevaluar buscando lesiones asociadas.',
            'Confirma que la coloración va a tardar más en desaparecer.',
            'Descarta la lesión de columna, porque el problema es venoso.',
          ],
          correcta: 1,
          explicacion: 'Vigilar el estado neurológico forma parte del manejo que enseña la lección, y un deterioro nunca se da por explicado: obliga a volver sobre las lesiones que acompañan al aplastamiento.',
        },
      ],
    },
  },

  'm5-tt-ruptura-diafragmatica': {
    actividades: {
      completar: [
        c(
          'La mayoría de las rupturas diafragmáticas son izquierdas porque el ___ ocupa y protege casi todo el hemidiafragma derecho.',
          ['bazo', 'hígado', 'estómago', 'páncreas'], 1,
          'Por eso los ruidos intestinales se buscan en el hemitórax izquierdo.'
        ),
        c(
          'El hallazgo auscultatorio característico es la presencia de ruidos ___ en el tórax.',
          ['bronquiales', 'intestinales', 'cardiacos apagados', 'de fricción'], 1,
          'Indica que las vísceras abdominales han pasado al tórax a través del desgarro.'
        ),
        c(
          'Si un paciente con este mecanismo empeora justo al iniciar la ventilación con presión positiva, ese empeoramiento ___ la sospecha de ruptura diafragmática.',
          ['descarta', 'refuerza', 'no modifica', 'sustituye'], 1,
          'La presión positiva puede empujar más vísceras hacia el tórax; no se le niega la ventilación al que la necesita, pero se aplica con cuidado y reevaluando.'
        ),
        c(
          'Como la reparación es quirúrgica y la lesión pasa desapercibida con facilidad, el manejo incluye nada por vía oral, traslado a centro quirúrgico y ___.',
          ['comunicar la sospecha en la entrega', 'esperar a que aparezcan los ruidos intestinales', 'colocar al paciente en decúbito prono', 'repetir la percusión cada minuto'], 0,
          'Que quien recibe conozca la sospecha es lo que evita que la lesión se pase por alto.'
        ),
      ],
    },
  },

  // ---------- Trauma de abdomen ----------

  'm5-ta-definicion': {
    actividades: {
      completar: [
        c(
          'Hígado, bazo, riñones y páncreas son órganos ___: al lesionarse sangran y producen shock hipovolémico.',
          ['huecos', 'sólidos', 'retroperitoneales por definición', 'torácicos'], 1,
          'Es la primera de las dos formas de comportarse que separa la lección.'
        ),
        c(
          'Estómago, intestino y vejiga son órganos ___: al romperse vierten su contenido y producen peritonitis.',
          ['sólidos', 'huecos', 'sin repercusión', 'no explorables'], 1,
          'Por eso su clínica aparece más tarde: la peritonitis necesita horas para instalarse.'
        ),
        c(
          'La lesión de órgano sólido mata pronto por hemorragia; la de órgano hueco mata más tarde por ___.',
          ['infección', 'obstrucción', 'edema', 'hipotermia'], 0,
          'Las dos exigen traslado, pero explican por qué un paciente que parecía bien empeora horas después.'
        ),
        c(
          'La exploración abdominal pierde fiabilidad cuando hay alteración de la conciencia, intoxicación, lesión medular o ___.',
          ['fractura de clavícula', 'dolor intenso en otra zona que distraiga', 'hipertensión previa', 'edad avanzada'], 1,
          'En esos casos un abdomen «normal» no descarta nada.'
        ),
      ],
    },
  },

  'm5-ta-estomago': {
    actividades: {
      completar: [
        c(
          'El estómago rara vez se rompe en trauma cerrado porque está protegido por la parrilla costal y además es ___.',
          ['rígido', 'móvil', 'retroperitoneal', 'muy pequeño'], 1,
          'Cuando sí se rompe suele ser por un golpe directo con el estómago lleno, que se comporta como una bolsa a presión.'
        ),
        c(
          'El dolor aparece pronto y con intensidad porque el jugo gástrico es muy ácido y produce una peritonitis ___.',
          ['séptica', 'química', 'tardía', 'localizada al flanco'], 1,
          'Es la diferencia con el contenido intestinal, que tarda más en dar clínica.'
        ),
        c(
          'Registrar la hora de la última comida importa porque el estómago lleno cambia la probabilidad de ruptura y también el riesgo de ___.',
          ['hemorragia externa', 'broncoaspiración', 'hipotermia', 'lesión esplénica'], 1,
          'Es un dato que altera tanto la sospecha de la lesión como el manejo de la vía aérea.'
        ),
        c(
          'Ante la sospecha de lesión de víscera hueca, la conducta básica es traslado a centro quirúrgico y ___.',
          ['dar líquidos claros', 'nada por vía oral', 'inducir el vómito', 'administrar antiácidos'], 1,
          'Cualquier ingesta agrava el vertido a la cavidad.'
        ),
      ],
    },
  },

  'm5-ta-pancreas': {
    actividades: {
      completar: [
        c(
          'El páncreas se lesiona porque un impacto puntual en el epigastrio lo comprime contra ___.',
          ['la parrilla costal', 'la columna vertebral', 'el diafragma', 'el hígado'], 1,
          'El manillar de una bicicleta, el volante o el borde de un asiento producen exactamente ese aplastamiento.'
        ),
        c(
          'El dolor epigástrico que irradia hacia la espalda y que la lección llama «en cinturón» es característico de la patología ___.',
          ['esplénica', 'pancreática', 'vesical', 'uretral'], 1,
          'Aparece junto a la equimosis epigástrica, la náusea y el vómito.'
        ),
        c(
          'Las enzimas pancreáticas ___ los tejidos vecinos, y por eso el cuadro es progresivo en las horas siguientes.',
          ['protegen', 'digieren', 'coagulan', 'enfrían'], 1,
          'Ese comportamiento explica el deterioro diferido de un paciente que parecía bien en la escena.'
        ),
        c(
          'Ante un niño que se golpeó el epigastrio con el manillar y ahora está bien, lo que la lección exige del TUM es documentar el mecanismo con precisión, trasladar y ___.',
          ['darle analgesia oral', 'prealertar aunque esté aparentemente bien', 'citarlo a las 48 horas', 'aplicar hielo local'], 1,
          'El mecanismo bien comunicado es lo que permite buscar después una lesión que tarda horas en manifestarse.'
        ),
      ],
    },
  },

  'm5-ta-bazo': {
    actividades: {
      completar: [
        c(
          'El signo de Kehr consiste en dolor referido al hombro ___ por irritación del diafragma.',
          ['derecho', 'izquierdo', 'de ambos lados', 'contrario al golpe'], 1,
          'La sangre acumulada bajo el diafragma estimula el nervio frénico, que comparte raíces con la inervación del hombro.'
        ),
        c(
          'El nervio que transmite esa irritación diafragmática y hace que el cerebro localice mal el origen del dolor es el ___.',
          ['radial', 'frénico', 'vago', 'ciático'], 1,
          'Por eso, en un traumatizado, un hombro izquierdo doloroso sin lesión en el hombro es sangre abdominal hasta demostrar lo contrario.'
        ),
        c(
          'La fractura de las costillas inferiores ___ obliga a pensar en lesión esplénica.',
          ['derechas', 'izquierdas', 'flotantes de ambos lados', 'superiores'], 1,
          'El bazo se sitúa justo bajo esas costillas, y su cápsula es frágil.'
        ),
        c(
          'La ruptura diferida ocurre cuando un hematoma inicialmente contenido por la ___ se rompe horas o días después.',
          ['cápsula', 'pleura', 'pared abdominal', 'vena porta'], 0,
          'Es la razón por la que todo mecanismo compatible se traslada y se valora, aunque el paciente esté bien en ese momento.'
        ),
      ],
    },
  },

  'm5-ta-higado': {
    actividades: {
      completar: [
        c(
          'La hemorragia hepática se describe como no ___: no existe presión directa ni torniquete que la detenga.',
          ['visible', 'compresible', 'grave', 'venosa'], 1,
          'Su control se consigue en quirófano o en radiología intervencionista, no en la escena.'
        ),
        c(
          'La prevención agresiva de la hipotermia importa aquí porque la ___ empeora un sangrado que ya no se puede comprimir.',
          ['taquicardia', 'coagulopatía', 'hipoxia', 'acidosis respiratoria'], 1,
          'Si el paciente pierde la capacidad de coagular, se pierde también la única contención que le queda al sangrado.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Tienes en la escena a un paciente con impacto en hipocondrio derecho, hipotenso y taquicárdico. Tu compañero propone terminar allí una exploración detallada y varias maniobras antes de salir. ¿Qué decides, según lo que enseña la lección?',
          opciones: [
            'Aceptar: cuanto más completa sea la valoración en la escena, mejor llega el paciente.',
            'Salir ya hacia el centro quirúrgico con prealerta y hacer en marcha todo lo que pueda hacerse en marcha.',
            'Aplicar presión firme sobre el hipocondrio derecho hasta que ceda el sangrado.',
            'Esperar refuerzos antes de iniciar el traslado.',
          ],
          correcta: 1,
          explicacion: 'La lección lo formula como regla de tiempo: cada minuto de demora en la escena es sangre perdida, y los procedimientos que puedan hacerse en marcha se hacen en marcha.',
        },
      ],
    },
  },

  // ---------- Trauma de cráneo y columna ----------

  'm5-tcc-lesiones-difusas': {
    actividades: {
      completar: [
        c(
          'El hematoma epidural y la contusión son ejemplos de lesión ___, porque ocupan un sitio y pueden requerir cirugía.',
          ['difusa', 'focal', 'secundaria', 'axonal'], 1,
          'La lesión difusa, en cambio, afecta al tejido de forma extendida y no deja una masa que evacuar.'
        ),
        c(
          'La concusión y la lesión axonal difusa se agrupan como lesiones difusas, y su tratamiento es de ___.',
          ['evacuación quirúrgica', 'soporte', 'observación domiciliaria', 'compresión'], 1,
          'Al no haber colección que retirar, todo el esfuerzo va contra la lesión secundaria.'
        ),
        c(
          'Que la concusión curse sin pérdida de conciencia ___ el diagnóstico.',
          ['descarta', 'no descarta', 'confirma', 'retrasa hasta las 24 horas'], 1,
          'Puede haber o no desmayo: la ausencia de pérdida de conciencia no significa que no haya alteración de la función cerebral.'
        ),
        c(
          'El mecanismo de la lesión axonal difusa es una desaceleración brusca con componente ___ que estira y rompe los axones.',
          ['compresivo', 'rotacional', 'penetrante', 'térmico'], 1,
          'Las distintas capas del encéfalo se mueven a velocidades diferentes y la conexión entre neuronas se rompe.'
        ),
      ],
      preguntas: [
        {
          pregunta: 'Atendiste a un joven con una concusión: consciente, orientado y con cefalea leve. Media hora después, durante el traslado, ha vomitado dos veces, la cefalea va a más y está cada vez más somnoliento. ¿Qué obliga a hacer ese cambio?',
          opciones: [
            'Nada distinto: son síntomas esperables de toda concusión.',
            'Reevaluar buscando una lesión con efecto de masa, porque esos son los signos que marcan el límite de «solo una concusión».',
            'Concluir que se trata de una lesión axonal difusa y suspender la vigilancia.',
            'Esperar a que aparezca una pupila desigual antes de modificar nada.',
          ],
          correcta: 1,
          explicacion: 'Vómito repetido, cefalea creciente y somnolencia progresiva figuran entre los signos que la lección enumera para dejar de considerarlo una concusión simple; esperar a la anisocoria sería esperar a un signo más tardío.',
        },
      ],
    },
  },

  'm5-tcc-medular-posterior': {
    actividades: {
      completar: [
        c(
          'Por los cordones posteriores viajan la propiocepción, la sensibilidad vibratoria y el ___.',
          ['dolor', 'tacto fino', 'control motor', 'reflejo pupilar'], 1,
          'La fuerza, el dolor y la temperatura se conservan, que es lo que hace fácil pasar por alto el síndrome.'
        ),
        c(
          'En el síndrome medular ___ se pierden el motor, el dolor y la temperatura, y se conserva la propiocepción.',
          ['posterior', 'anterior', 'de Brown-Séquard', 'de cauda equina'], 1,
          'Es el patrón inverso al posterior: lo que va por delante de la médula se pierde en el anterior.'
        ),
        c(
          'El síndrome de Brown-Séquard corresponde a ___ y mezcla ambos patrones de forma cruzada.',
          ['la médula entera seccionada', 'media médula', 'solo los cordones posteriores', 'solo la parte anterior'], 1,
          'Pierde motor y propiocepción del mismo lado, y dolor y temperatura del contrario.'
        ),
        c(
          'El paciente con síndrome posterior camina mirándose los pies y empeora en la oscuridad porque compensa con ___ lo que ya no percibe.',
          ['el oído', 'la vista', 'el tacto de las manos', 'la fuerza'], 1,
          'Al cerrar los ojos pierde el sustituto y el déficit se hace evidente.'
        ),
      ],
    },
  },

  'm5-tcc-exploracion-fisica': {
    actividades: {
      ordenar: {
        titulo: 'Ordena la exploración de columna sin movilizar al paciente',
        pasos: [
          'Preguntar por dolor en el cuello o la espalda antes de tocar',
          'Palpar la línea media del occipucio al sacro buscando dolor, escalón o deformidad',
          'Valorar la fuerza en las cuatro extremidades y compararlas',
          'Valorar la sensibilidad en un punto de cada extremidad, y por niveles si hay déficit',
          'Preguntar por hormigueo, quemazón o sensación de descarga eléctrica',
          'Documentar la hora y repetir la exploración',
        ],
      },
      completar: [
        c(
          'Una respiración solo abdominal en un traumatizado sugiere lesión ___ con afectación de los músculos intercostales.',
          ['lumbar', 'cervical', 'del diafragma', 'de la pared torácica'], 1,
          'Es uno de los signos de lesión medular que la lección manda buscar durante la exploración.'
        ),
        c(
          'La exploración no justifica por sí sola sentar ni girar a nadie: se hace en la posición encontrada o durante una movilización ___ ya necesaria por otro motivo.',
          ['en bloque', 'con tabla larga', 'asistida por el propio paciente', 'en sedestación'], 0,
          'Explorar nunca es razón suficiente para mover una columna sospechosa.'
        ),
      ],
    },
  },

  'm5-tcc-signos-tratamiento-columna': {
    actividades: {
      ordenar: {
        titulo: 'Ordena las prioridades del manejo espinal prehospitalario',
        pasos: [
          'Aplicar la restricción del movimiento espinal manteniendo la alineación neutra',
          'Asegurar la vía aérea con maniobras que no extiendan el cuello y vigilar la ventilación',
          'Movilizar siempre en bloque, con el número de personas necesario',
          'Descartar hemorragia antes de atribuir la hipotensión al shock neurogénico',
          'Prevenir activamente la hipotermia',
          'Documentar y repetir la exploración neurológica, y trasladar a centro con capacidad neuroquirúrgica',
        ],
      },
      completar: [
        c(
          'Una caída desde la propia altura basta para fracturar vértebras cervicales en el paciente mayor porque su columna es rígida y ___.',
          ['flexible', 'osteoporótica', 'más corta', 'más móvil'], 1,
          'Por eso en el anciano el umbral de sospecha debe ser mucho más bajo que en el joven.'
        ),
        c(
          'El uso sistemático de corticoides en la lesión medular aguda ___ de rutina en la actualidad.',
          ['sigue recomendándose', 'no se recomienda', 'se reserva para el anciano', 'se decide por la altura de la lesión'], 1,
          'La lección lo usa como ejemplo de por qué el temario se revisa contra la edición vigente de la bibliografía y no contra lo que se enseñaba antes.'
        ),
        c(
          'La lesión medular hace que el paciente se enfríe muy rápido por la falta de ___, y por eso la prevención de la hipotermia es activa.',
          ['sudoración', 'vasoconstricción', 'movimiento muscular voluntario', 'aporte calórico'], 1,
          'Es una de las prioridades del manejo, no un cuidado accesorio.'
        ),
      ],
    },
  },
}
