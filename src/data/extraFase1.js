// FASE 1 (EXTRA) — Temas ampliados de Ciencias Basicas y Fundamentos
// Contenido redactado a profundidad para estudio real (nivel pre-medico/paramedico avanzado).
// Sin apostrofos ni comillas dobles dentro de los textos.

export const extraFase1 = [
  {
    id: 'histologia-tejidos',
    numero: '1.4',
    titulo: 'Histologia y los Cuatro Tejidos Fundamentales',
    icono: '🔬',
    duracion: '50 min',
    resumen:
      'Todos los organos del cuerpo se construyen con cuatro tejidos basicos: epitelial, conectivo, muscular y nervioso. Entender su microestructura explica como cicatriza una herida, por que sangra un organo y como responde el cuerpo al trauma.',
    objetivos: [
      'Clasificar los cuatro tejidos fundamentales y reconocer sus funciones.',
      'Describir los tipos de epitelio y de tejido conectivo con ejemplos clinicos.',
      'Diferenciar los tres tipos de musculo por estructura y control.',
      'Relacionar la histologia con la cicatrizacion y la respuesta al dano.',
    ],
    secciones: [
      {
        titulo: 'Que es la histologia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La histologia estudia los tejidos, es decir, conjuntos de celulas semejantes que junto con su matriz extracelular cumplen una funcion comun. Aunque el cuerpo tiene mas de 200 tipos celulares, todos se agrupan en cuatro tejidos fundamentales que se combinan para formar organos y sistemas.',
          },
          {
            tipo: 'diagrama',
            clave: 'celula',
            titulo: 'La celula como unidad del tejido',
            descripcion: 'Los organelos celulares determinan la especializacion de cada tejido.',
          },
          {
            tipo: 'lista',
            titulo: 'Los cuatro tejidos fundamentales',
            items: [
              'Epitelial: recubre superficies y forma glandulas; protege, absorbe y secreta.',
              'Conectivo: une, sostiene y nutre; incluye sangre, hueso, cartilago y grasa.',
              'Muscular: genera movimiento mediante contraccion.',
              'Nervioso: recibe, procesa y transmite informacion electrica.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Regla de oro',
            texto:
              'Ningun organo esta hecho de un solo tejido. El corazon, por ejemplo, tiene musculo (miocardio), epitelio (endocardio), conectivo (esqueleto fibroso) y nervioso (sistema de conduccion).',
          },
        ],
      },
      {
        titulo: 'Tejido epitelial',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El epitelio se caracteriza por celulas muy juntas con escasa matriz, polaridad (cara apical y basal), avascularidad (se nutre por difusion desde el tejido conectivo subyacente) y alta capacidad de regeneracion. Descansa sobre una membrana basal que lo separa del conectivo.',
          },
          {
            tipo: 'tabla',
            titulo: 'Clasificacion del epitelio por capas y forma',
            headers: ['Tipo', 'Localizacion', 'Funcion'],
            filas: [
              ['Plano simple', 'Alveolos, endotelio vascular', 'Difusion e intercambio rapido'],
              ['Cubico simple', 'Tubulos renales, glandulas', 'Secrecion y absorcion'],
              ['Cilindrico simple', 'Intestino, estomago', 'Absorcion y secrecion de moco'],
              ['Plano estratificado', 'Piel, esofago, boca', 'Proteccion contra abrasion'],
              ['De transicion', 'Vejiga, ureteres', 'Distension sin romperse'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'Las glandulas derivan de epitelio. Las exocrinas vierten su producto por conductos hacia una superficie (sudoriparas, salivales, pancreas exocrino); las endocrinas carecen de conducto y secretan hormonas directamente a la sangre (tiroides, suprarrenales).',
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Correlacion clinica',
            texto:
              'La pared alveolar es epitelio plano simple de pocas micras: por eso el gas difunde rapido, pero tambien por eso el liquido del edema pulmonar bloquea con facilidad el intercambio gaseoso.',
          },
        ],
      },
      {
        titulo: 'Tejido conectivo',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El conectivo se distingue por abundante matriz extracelular formada por fibras (colageno, elastina, reticulina) y sustancia fundamental. Sus celulas estan dispersas. Es el tejido mas variado del cuerpo y va desde la sangre liquida hasta el hueso solido.',
          },
          {
            tipo: 'lista',
            titulo: 'Variedades de tejido conectivo',
            items: [
              'Laxo (areolar): rellena espacios, rodea vasos y nervios; sitio de inflamacion.',
              'Denso: tendones y ligamentos, rico en colageno con gran resistencia a la traccion.',
              'Adiposo: reserva energetica, aislamiento termico y proteccion mecanica.',
              'Cartilago: soporte flexible y avascular (oreja, nariz, superficies articulares).',
              'Oseo: matriz mineralizada con calcio; sosten y reserva mineral.',
              'Sangre: matriz liquida (plasma) con celulas suspendidas; transporte.',
            ],
          },
          {
            tipo: 'p',
            texto:
              'El colageno es la proteina mas abundante del cuerpo y da resistencia a la traccion; la elastina permite el retroceso elastico de arterias y pulmones. La vitamina C es indispensable para sintetizar colageno: su deficiencia (escorbuto) causa mala cicatrizacion y sangrado de encias.',
          },
        ],
      },
      {
        titulo: 'Tejido muscular y nervioso',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Los tres tipos de musculo',
            headers: ['Tipo', 'Control', 'Caracteristicas'],
            filas: [
              ['Esqueletico', 'Voluntario', 'Estriado, multinucleado, contraccion rapida y fatigable'],
              ['Cardiaco', 'Involuntario', 'Estriado, ramificado, discos intercalares, no se fatiga'],
              ['Liso', 'Involuntario', 'No estriado, fusiforme, en visceras y vasos'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'Los discos intercalares del musculo cardiaco contienen uniones comunicantes (gap junctions) que permiten que el impulso electrico viaje de celula a celula, haciendo que el corazon se comporte como un sincitio funcional: todas las fibras se contraen de forma coordinada.',
          },
          {
            tipo: 'p',
            texto:
              'El tejido nervioso esta formado por neuronas (transmiten el impulso) y neuroglia (celulas de soporte mucho mas numerosas que las neuronas). A diferencia del epitelio, las neuronas del sistema nervioso central practicamente no se regeneran, lo que explica la gravedad del dano cerebral y medular.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Regeneracion limitada',
            texto:
              'El musculo cardiaco y las neuronas del SNC tienen capacidad de regeneracion casi nula. Por eso un infarto y un evento cerebral dejan secuelas permanentes: el tejido perdido se sustituye por cicatriz, no por celulas funcionales.',
          },
        ],
      },
      {
        titulo: 'Cicatrizacion y reparacion',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Fases de la cicatrizacion de una herida',
            items: [
              'Hemostasia: vasoconstriccion y coagulo de plaquetas y fibrina (minutos).',
              'Inflamacion: llegan neutrofilos y macrofagos que limpian la herida (1 a 3 dias).',
              'Proliferacion: fibroblastos depositan colageno y se forma tejido de granulacion (dias a semanas).',
              'Remodelacion: el colageno se reorganiza y la cicatriz gana resistencia (semanas a meses).',
            ],
          },
          {
            tipo: 'p',
            texto:
              'Los tejidos con alta tasa de division (epitelio, sangre) se regeneran restaurando la funcion; los de baja division (cardiaco, nervioso) reparan con tejido fibroso. Esta diferencia es la base pronostica del trauma: una abrasion cutanea sana sin secuela, un infarto deja una zona cicatrizal acinetica.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Membrana basal', definicion: 'Capa de soporte que separa el epitelio del tejido conectivo subyacente.' },
      { termino: 'Matriz extracelular', definicion: 'Conjunto de fibras y sustancia fundamental que rodea a las celulas del conectivo.' },
      { termino: 'Sincitio funcional', definicion: 'Conjunto de celulas conectadas electricamente que se comportan como una unidad, como el miocardio.' },
      { termino: 'Discos intercalares', definicion: 'Uniones entre celulas del musculo cardiaco que permiten la conduccion electrica.' },
      { termino: 'Tejido de granulacion', definicion: 'Tejido nuevo, rojo y vascularizado que rellena una herida durante la proliferacion.' },
      { termino: 'Glandula endocrina', definicion: 'Glandula sin conducto que vierte hormonas directamente a la sangre.' },
      { termino: 'Neuroglia', definicion: 'Celulas de soporte del tejido nervioso, mas numerosas que las neuronas.' },
    ],
    flashcards: [
      { frente: 'Cuales son los cuatro tejidos fundamentales?', reverso: 'Epitelial, conectivo, muscular y nervioso.' },
      { frente: 'Que epitelio recubre los alveolos y por que?', reverso: 'Plano simple, porque permite la difusion rapida de gases.' },
      { frente: 'Que tejido es la sangre?', reverso: 'Conectivo, con matriz liquida llamada plasma.' },
      { frente: 'Que estructura permite que el miocardio actue como sincitio?', reverso: 'Los discos intercalares con uniones comunicantes.' },
      { frente: 'Cual es la proteina mas abundante del cuerpo?', reverso: 'El colageno, que da resistencia a la traccion.' },
      { frente: 'Por que el dano del SNC deja secuelas permanentes?', reverso: 'Porque las neuronas del SNC casi no se regeneran y se reemplazan por cicatriz.' },
      { frente: 'Cuales son las fases de la cicatrizacion?', reverso: 'Hemostasia, inflamacion, proliferacion y remodelacion.' },
      { frente: 'Que vitamina es esencial para sintetizar colageno?', reverso: 'La vitamina C; su deficiencia causa escorbuto.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con edema pulmonar agudo presenta hipoxemia severa. A nivel histologico, por que falla el intercambio gaseoso?',
        opciones: [
          'El epitelio alveolar se vuelve estratificado',
          'El liquido aumenta la distancia de difusion a traves del epitelio plano alveolar',
          'Las neuronas alveolares dejan de funcionar',
          'El musculo liso alveolar se contrae en exceso',
        ],
        correcta: 1,
        explicacion: 'El alveolo esta tapizado por epitelio plano simple ultradelgado; el liquido del edema interpone una barrera que aumenta la distancia de difusion del oxigeno, reduciendo el intercambio.',
      },
      {
        pregunta: 'Cual tejido tiene mayor capacidad de regeneracion tras una lesion?',
        opciones: ['Musculo cardiaco', 'Neuronas del SNC', 'Epitelio cutaneo', 'Cartilago articular'],
        correcta: 2,
        explicacion: 'El epitelio tiene alta tasa de division y se regenera restaurando la funcion. Cardiaco, neuronas del SNC y cartilago tienen capacidad regenerativa muy limitada.',
      },
      {
        pregunta: 'La vejiga urinaria necesita distenderse al llenarse. Que epitelio lo permite?',
        opciones: ['Plano simple', 'Cilindrico simple', 'De transicion', 'Cubico estratificado'],
        correcta: 2,
        explicacion: 'El epitelio de transicion (urotelio) cambia su forma para permitir la distension de la vejiga sin perder su integridad.',
      },
      {
        pregunta: 'Que caracteristica del musculo cardiaco lo distingue del esqueletico?',
        opciones: [
          'Es voluntario',
          'No es estriado',
          'Tiene discos intercalares y es ramificado',
          'Es multinucleado y fatigable',
        ],
        correcta: 2,
        explicacion: 'El musculo cardiaco es estriado pero involuntario, ramificado y con discos intercalares que lo conectan electricamente, a diferencia del esqueletico voluntario y multinucleado.',
      },
      {
        pregunta: 'Un paciente desnutrido tiene cicatrizacion muy lenta y sangrado de encias. Cual deficiencia es mas probable?',
        opciones: ['Vitamina A', 'Vitamina C', 'Vitamina K', 'Vitamina D'],
        correcta: 1,
        explicacion: 'La vitamina C es esencial para la sintesis de colageno; su deficiencia (escorbuto) produce mala cicatrizacion y fragilidad capilar con sangrado gingival.',
      },
      {
        pregunta: 'En que fase de la cicatrizacion los fibroblastos depositan colageno y aparece tejido de granulacion?',
        opciones: ['Hemostasia', 'Inflamacion', 'Proliferacion', 'Remodelacion'],
        correcta: 2,
        explicacion: 'Durante la proliferacion los fibroblastos sintetizan colageno y se forma tejido de granulacion vascularizado que rellena la herida.',
      },
      {
        pregunta: 'Por que el tejido conectivo cartilaginoso cicatriza mal?',
        opciones: [
          'Porque es muy vascularizado',
          'Porque es avascular y se nutre por difusion',
          'Porque carece de matriz',
          'Porque tiene demasiadas neuronas',
        ],
        correcta: 1,
        explicacion: 'El cartilago es avascular y se nutre por difusion lenta desde el pericondrio, lo que limita la llegada de celulas reparadoras y enlentece su cicatrizacion.',
      },
    ],
  },
  {
    id: 'sistema-tegumentario',
    numero: '1.5',
    titulo: 'Sistema Tegumentario: la Piel',
    icono: '🧴',
    duracion: '50 min',
    resumen:
      'La piel es el organo mas grande del cuerpo y la primera barrera contra el medio. Domina sus capas, su papel en la termorregulacion y la cicatrizacion para entender quemaduras, hipotermia y heridas.',
    objetivos: [
      'Describir las capas de la piel y sus anexos.',
      'Explicar las funciones de la piel, incluida la termorregulacion.',
      'Aplicar la regla de los nueves y la clasificacion de quemaduras.',
      'Relacionar la fisiologia cutanea con la perdida de calor y de liquidos.',
    ],
    secciones: [
      {
        titulo: 'Estructura de la piel',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'piel',
            titulo: 'Capas de la piel y sus anexos',
          },
          {
            tipo: 'p',
            texto:
              'La piel tiene tres capas: epidermis, dermis e hipodermis (tejido celular subcutaneo). La epidermis es epitelio plano estratificado queratinizado, avascular; la dermis es tejido conectivo con vasos, nervios y anexos; la hipodermis es tejido adiposo que aisla y amortigua.',
          },
          {
            tipo: 'lista',
            titulo: 'Componentes por capa',
            items: [
              'Epidermis: queratinocitos, melanocitos (pigmento), celulas de Langerhans (inmunidad), capa cornea protectora.',
              'Dermis: colageno y elastina, capilares, terminaciones nerviosas, foliculos pilosos, glandulas sudoriparas y sebaceas.',
              'Hipodermis: adipocitos para aislamiento termico, reserva energetica y amortiguacion.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Por que importa la profundidad',
            texto:
              'La epidermis no tiene vasos ni nervios propios; una lesion solo epidermica no sangra ni duele intensamente. Cuando una herida sangra y duele mucho, ha alcanzado la dermis.',
          },
        ],
      },
      {
        titulo: 'Funciones de la piel',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Funciones principales',
            items: [
              'Barrera: protege contra microorganismos, quimicos y radiacion UV.',
              'Termorregulacion: controla la perdida de calor por sudoracion y vasomotricidad.',
              'Sensibilidad: receptores de tacto, presion, temperatura y dolor.',
              'Sintesis: produce vitamina D con la luz solar.',
              'Homeostasis hidrica: evita la perdida excesiva de agua.',
              'Excrecion: elimina agua, sales y urea por el sudor.',
            ],
          },
          {
            tipo: 'p',
            texto:
              'La piel es clave en la inmunidad innata: su superficie acida (manto acido) y la capa cornea impiden la colonizacion bacteriana. Cuando se pierde esta barrera, como en una quemadura extensa, el riesgo de infeccion y de perdida de liquidos se dispara.',
          },
        ],
      },
      {
        titulo: 'Termorregulacion',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El hipotalamo es el termostato corporal. Ante el calor ordena vasodilatacion cutanea y sudoracion para perder calor; ante el frio ordena vasoconstriccion, piloereccion y escalofrios (termogenesis por contraccion muscular) para conservar y producir calor.',
          },
          {
            tipo: 'tabla',
            titulo: 'Mecanismos de transferencia de calor',
            headers: ['Mecanismo', 'Definicion'],
            filas: [
              ['Radiacion', 'Perdida de calor por ondas infrarrojas hacia el ambiente'],
              ['Conduccion', 'Transferencia por contacto directo con un objeto mas frio'],
              ['Conveccion', 'Perdida por movimiento de aire o agua sobre la piel'],
              ['Evaporacion', 'Perdida de calor al evaporarse el sudor'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Hipotermia y vasoconstriccion',
            texto:
              'En hipotermia la sangre se centraliza para proteger los organos vitales, dejando la piel fria y palida. Por eso al recalentar a un paciente hay que hacerlo con cuidado: el retorno de sangre fria periferica al centro puede causar arritmias.',
          },
        ],
      },
      {
        titulo: 'Quemaduras',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Clasificacion de quemaduras por profundidad',
            headers: ['Grado', 'Capa afectada', 'Signos'],
            filas: [
              ['Primer grado (superficial)', 'Solo epidermis', 'Eritema, dolor, sin ampollas'],
              ['Segundo grado (espesor parcial)', 'Epidermis y dermis', 'Ampollas, dolor intenso, humeda'],
              ['Tercer grado (espesor total)', 'Toda la piel', 'Seca, blanca o carbonizada, sin dolor por destruccion nerviosa'],
            ],
          },
          {
            tipo: 'formula',
            texto: 'Regla de los nueves (adulto): cabeza 9 por ciento, cada brazo 9, cada pierna 18, torax anterior 18, espalda 18, genitales 1.',
            nota: 'Estima la superficie corporal quemada para calcular reanimacion con liquidos.',
          },
          {
            tipo: 'p',
            texto:
              'La perdida de la barrera cutanea en quemaduras extensas provoca fuga masiva de plasma y agua, llevando al shock por quemadura. Por eso la reanimacion con liquidos es prioritaria. La regla de los nueves cambia en ninos, donde la cabeza representa mayor proporcion de la superficie corporal.',
          },
        ],
      },
      {
        titulo: 'Cicatrizacion cutanea',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Las heridas superficiales que respetan la dermis cicatrizan sin marca porque el epitelio regenera. Las que destruyen la dermis sanan con cicatriz de colageno. Una cicatrizacion excesiva produce queloides; una insuficiente, dehiscencia de la herida.',
          },
          {
            tipo: 'lista',
            titulo: 'Factores que retrasan la cicatrizacion',
            items: [
              'Mala perfusion e hipoxia tisular.',
              'Infeccion local.',
              'Diabetes y desnutricion.',
              'Edad avanzada y uso de corticoides.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Epidermis', definicion: 'Capa externa de la piel, epitelio plano estratificado queratinizado y avascular.' },
      { termino: 'Dermis', definicion: 'Capa de tejido conectivo con vasos, nervios, foliculos y glandulas.' },
      { termino: 'Hipodermis', definicion: 'Tejido subcutaneo adiposo que aisla y amortigua.' },
      { termino: 'Termorregulacion', definicion: 'Control de la temperatura corporal mediante sudoracion y vasomotricidad.' },
      { termino: 'Regla de los nueves', definicion: 'Metodo para estimar el porcentaje de superficie corporal quemada.' },
      { termino: 'Quemadura de espesor total', definicion: 'Quemadura de tercer grado que destruye toda la piel y las terminaciones nerviosas.' },
      { termino: 'Manto acido', definicion: 'Superficie acida de la piel que inhibe el crecimiento bacteriano.' },
    ],
    flashcards: [
      { frente: 'Cuales son las tres capas de la piel?', reverso: 'Epidermis, dermis e hipodermis.' },
      { frente: 'Por que la epidermis no sangra al lesionarse?', reverso: 'Porque es avascular; no tiene vasos propios.' },
      { frente: 'Que organo es el termostato del cuerpo?', reverso: 'El hipotalamo.' },
      { frente: 'Como pierde calor el cuerpo al evaporar sudor?', reverso: 'Por evaporacion, uno de los cuatro mecanismos de transferencia de calor.' },
      { frente: 'Por que la quemadura de tercer grado no duele?', reverso: 'Porque destruye las terminaciones nerviosas de la dermis.' },
      { frente: 'Que porcentaje asigna la regla de los nueves a cada pierna?', reverso: 'El 18 por ciento.' },
      { frente: 'Que causa el shock por quemadura?', reverso: 'La fuga masiva de plasma y agua por la perdida de la barrera cutanea.' },
      { frente: 'Que vitamina sintetiza la piel?', reverso: 'La vitamina D, con la luz solar.' },
    ],
    quiz: [
      {
        pregunta: 'Una quemadura presenta piel seca, blanquecina y el paciente no refiere dolor en esa zona. Que grado es?',
        opciones: ['Primer grado', 'Segundo grado superficial', 'Segundo grado profundo', 'Tercer grado'],
        correcta: 3,
        explicacion: 'La ausencia de dolor con aspecto seco y blanco indica destruccion total de la dermis y sus nervios, caracteristica de la quemadura de tercer grado o espesor total.',
      },
      {
        pregunta: 'En un adulto con quemaduras en todo el torax anterior y todo un brazo, que porcentaje aproximado de superficie corporal esta afectado?',
        opciones: ['18 por ciento', '27 por ciento', '36 por ciento', '9 por ciento'],
        correcta: 1,
        explicacion: 'Torax anterior 18 por ciento mas un brazo 9 por ciento suman 27 por ciento segun la regla de los nueves.',
      },
      {
        pregunta: 'Por que se debe recalentar con cuidado a un paciente hipotermico?',
        opciones: [
          'Porque la piel se quema con facilidad',
          'Porque el retorno de sangre fria periferica puede causar arritmias',
          'Porque aumenta demasiado rapido la presion arterial',
          'Porque se inhibe la sudoracion',
        ],
        correcta: 1,
        explicacion: 'El recalentamiento brusco devuelve sangre fria y acida de la periferia al corazon, lo que puede desencadenar arritmias potencialmente letales.',
      },
      {
        pregunta: 'Cual mecanismo de perdida de calor predomina cuando un paciente esta mojado y expuesto al viento?',
        opciones: ['Radiacion', 'Conduccion', 'Conveccion y evaporacion', 'Solo conduccion'],
        correcta: 2,
        explicacion: 'El viento aumenta la conveccion y la humedad favorece la evaporacion, una combinacion que acelera la perdida de calor y el riesgo de hipotermia.',
      },
      {
        pregunta: 'Cual es la principal razon por la que las quemaduras extensas causan shock?',
        opciones: [
          'Perdida de sangre por hemorragia arterial',
          'Fuga de plasma y agua por la perdida de la barrera cutanea',
          'Vasoconstriccion generalizada',
          'Aumento de la produccion de vitamina D',
        ],
        correcta: 1,
        explicacion: 'La destruccion de la piel provoca fuga masiva de plasma al intersticio y al exterior, generando hipovolemia y shock por quemadura.',
      },
      {
        pregunta: 'Que celulas de la epidermis participan en la defensa inmunitaria?',
        opciones: ['Queratinocitos', 'Melanocitos', 'Celulas de Langerhans', 'Adipocitos'],
        correcta: 2,
        explicacion: 'Las celulas de Langerhans son celulas presentadoras de antigeno en la epidermis y forman parte de la inmunidad cutanea.',
      },
      {
        pregunta: 'Cual factor NO retrasa la cicatrizacion?',
        opciones: ['Diabetes', 'Buena perfusion tisular', 'Infeccion local', 'Uso de corticoides'],
        correcta: 1,
        explicacion: 'Una buena perfusion aporta oxigeno y nutrientes y favorece la cicatrizacion. Diabetes, infeccion y corticoides la retrasan.',
      },
    ],
  },
  {
    id: 'sistema-musculoesqueletico',
    numero: '1.6',
    titulo: 'Sistema Musculoesqueletico a Profundidad',
    icono: '🦴',
    duracion: '55 min',
    resumen:
      'Huesos, articulaciones y musculos forman el armazon que da forma, protege organos y permite el movimiento. Entender la contraccion muscular y la columna es clave para el trauma y la inmovilizacion.',
    objetivos: [
      'Describir la estructura osea y los tipos de articulaciones.',
      'Explicar el mecanismo de contraccion muscular paso a paso.',
      'Reconocer la anatomia de la columna vertebral y su relevancia en trauma.',
      'Relacionar la fisiologia muscular con la fatiga y el calambre.',
    ],
    secciones: [
      {
        titulo: 'El hueso como tejido vivo',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El hueso es tejido conectivo mineralizado, vivo y en constante remodelacion. Esta formado por matriz organica (colageno) que le da flexibilidad y matriz inorganica (fosfato de calcio) que le da dureza. Contiene osteoblastos (forman hueso), osteoclastos (lo reabsorben) y osteocitos (mantienen la matriz).',
          },
          {
            tipo: 'lista',
            titulo: 'Funciones del esqueleto',
            items: [
              'Sosten y forma del cuerpo.',
              'Proteccion de organos (craneo, costillas, columna).',
              'Movimiento como palancas para los musculos.',
              'Reserva mineral de calcio y fosforo.',
              'Hematopoyesis: la medula osea roja produce celulas sanguineas.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Acceso intraoseo',
            texto:
              'La medula osea esta muy vascularizada y drena a la circulacion central. Por eso el acceso intraoseo permite infundir liquidos y farmacos cuando no se logra una via venosa, especialmente en ninos y en shock.',
          },
        ],
      },
      {
        titulo: 'Articulaciones',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Tipos de articulaciones por movilidad',
            headers: ['Tipo', 'Movilidad', 'Ejemplo'],
            filas: [
              ['Sinartrosis (fibrosa)', 'Inmovil', 'Suturas del craneo'],
              ['Anfiartrosis (cartilaginosa)', 'Semimovil', 'Discos intervertebrales, sinfisis del pubis'],
              ['Diartrosis (sinovial)', 'Movil', 'Rodilla, hombro, codo'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'Las articulaciones sinoviales tienen cartilago articular, capsula, liquido sinovial lubricante y ligamentos estabilizadores. Una luxacion es la perdida de la congruencia articular; un esguince es la lesion de los ligamentos sin perdida de la relacion articular.',
          },
        ],
      },
      {
        titulo: 'El musculo esqueletico y la contraccion',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El musculo esqueletico se compone de fibras con miofibrillas formadas por sarcomeros, la unidad contractil. Cada sarcomero contiene filamentos de actina (delgados) y miosina (gruesos) que se deslizan unos sobre otros para acortar la fibra.',
          },
          {
            tipo: 'pasos',
            titulo: 'Mecanismo de contraccion (teoria del deslizamiento)',
            items: [
              'El impulso nervioso libera acetilcolina en la union neuromuscular.',
              'La despolarizacion viaja por los tubulos T hasta el reticulo sarcoplasmico.',
              'Se libera calcio que se une a la troponina y descubre los sitios de la actina.',
              'Las cabezas de miosina se unen a la actina formando puentes cruzados.',
              'Con energia del ATP, la miosina jala la actina y el sarcomero se acorta.',
              'Cuando cesa el estimulo, el calcio se recaptura y el musculo se relaja.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'El papel del ATP y el calcio',
            texto:
              'Sin ATP la miosina no se suelta de la actina: por eso aparece el rigor mortis tras la muerte, cuando se agota el ATP. El calcio es el interruptor que inicia la contraccion.',
          },
          {
            tipo: 'p',
            texto:
              'La fatiga muscular ocurre cuando se agota el ATP y se acumula acido lactico durante el metabolismo anaerobio. El calambre se asocia a alteraciones de electrolitos y deshidratacion. La contraccion sostenida que no permite la relajacion se llama tetania.',
          },
        ],
      },
      {
        titulo: 'La columna vertebral',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'columna',
            titulo: 'Regiones de la columna vertebral',
          },
          {
            tipo: 'tabla',
            titulo: 'Regiones de la columna',
            headers: ['Region', 'Vertebras', 'Nota'],
            filas: [
              ['Cervical', '7 (C1-C7)', 'Mayor movilidad; protege la medula alta'],
              ['Toracica', '12 (T1-T12)', 'Articula con las costillas'],
              ['Lumbar', '5 (L1-L5)', 'Soporta mayor peso'],
              ['Sacro', '5 fusionadas', 'Forma parte de la pelvis'],
              ['Coccix', '4 fusionadas', 'Vestigial'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Lesion medular cervical',
            texto:
              'Una lesion por arriba de C5 puede comprometer el nervio frenico y paralizar el diafragma, causando paro respiratorio. Por eso en trauma se protege la columna cervical desde el primer momento.',
          },
          {
            tipo: 'p',
            texto:
              'La medula espinal termina alrededor de L1-L2; por debajo continua como la cauda equina. Las vertebras protegen la medula, y los discos intervertebrales actuan como amortiguadores. Una hernia discal comprime raices nerviosas causando dolor irradiado y deficit neurologico.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Sarcomero', definicion: 'Unidad contractil del musculo formada por filamentos de actina y miosina.' },
      { termino: 'Union neuromuscular', definicion: 'Sinapsis entre la motoneurona y la fibra muscular, mediada por acetilcolina.' },
      { termino: 'Osteoclasto', definicion: 'Celula que reabsorbe el hueso durante la remodelacion.' },
      { termino: 'Diartrosis', definicion: 'Articulacion sinovial movil, como la rodilla o el hombro.' },
      { termino: 'Rigor mortis', definicion: 'Rigidez muscular tras la muerte por agotamiento del ATP.' },
      { termino: 'Cauda equina', definicion: 'Conjunto de raices nerviosas que continuan la medula por debajo de L1-L2.' },
      { termino: 'Luxacion', definicion: 'Perdida de la congruencia de una articulacion.' },
    ],
    flashcards: [
      { frente: 'Cual es la unidad contractil del musculo?', reverso: 'El sarcomero.' },
      { frente: 'Que ion inicia la contraccion muscular?', reverso: 'El calcio, al unirse a la troponina.' },
      { frente: 'Por que ocurre el rigor mortis?', reverso: 'Por agotamiento del ATP, que impide que la miosina se suelte de la actina.' },
      { frente: 'Cuantas vertebras cervicales hay?', reverso: 'Siete (C1 a C7).' },
      { frente: 'Que neurotransmisor actua en la union neuromuscular?', reverso: 'La acetilcolina.' },
      { frente: 'Donde termina la medula espinal en el adulto?', reverso: 'Alrededor de L1-L2; debajo continua la cauda equina.' },
      { frente: 'Que da dureza al hueso?', reverso: 'La matriz inorganica de fosfato de calcio.' },
      { frente: 'Por que el acceso intraoseo es eficaz?', reverso: 'Porque la medula osea esta muy vascularizada y drena a la circulacion central.' },
    ],
    quiz: [
      {
        pregunta: 'Una lesion medular completa por encima de C5 pone en riesgo la vida principalmente porque:',
        opciones: [
          'Paraliza los brazos',
          'Compromete el nervio frenico y la respiracion diafragmatica',
          'Causa perdida de la vision',
          'Detiene la digestion',
        ],
        correcta: 1,
        explicacion: 'El nervio frenico (C3-C5) inerva el diafragma; una lesion por encima de C5 puede paralizarlo y provocar paro respiratorio.',
      },
      {
        pregunta: 'Que sucede a nivel molecular para que la miosina se suelte de la actina durante la relajacion?',
        opciones: [
          'Se libera mas calcio',
          'El ATP se une a la cabeza de miosina',
          'Se libera acetilcolina',
          'Se acumula acido lactico',
        ],
        correcta: 1,
        explicacion: 'El ATP se une a la cabeza de miosina y permite que se desprenda de la actina; sin ATP la union persiste, como en el rigor mortis.',
      },
      {
        pregunta: 'Cual de estas es una articulacion sinovial (diartrosis)?',
        opciones: ['Suturas del craneo', 'Disco intervertebral', 'Rodilla', 'Sinfisis del pubis'],
        correcta: 2,
        explicacion: 'La rodilla es una diartrosis movil con cartilago, capsula y liquido sinovial. Las suturas son fibrosas y los discos son cartilaginosos.',
      },
      {
        pregunta: 'Un corredor presenta fatiga y ardor muscular tras un esfuerzo intenso. El mecanismo fisiologico es:',
        opciones: [
          'Exceso de oxigeno en el musculo',
          'Agotamiento del ATP y acumulacion de acido lactico por metabolismo anaerobio',
          'Aumento del calcio extracelular',
          'Liberacion de acetilcolina en exceso',
        ],
        correcta: 1,
        explicacion: 'El esfuerzo intenso supera el aporte de oxigeno; el musculo recurre al metabolismo anaerobio, agotando ATP y acumulando acido lactico, lo que produce fatiga y ardor.',
      },
      {
        pregunta: 'Cual region de la columna soporta el mayor peso corporal?',
        opciones: ['Cervical', 'Toracica', 'Lumbar', 'Coccix'],
        correcta: 2,
        explicacion: 'La region lumbar (L1-L5) soporta la mayor carga mecanica, por eso es asiento frecuente de hernias discales y dolor.',
      },
      {
        pregunta: 'Cual es la diferencia entre esguince y luxacion?',
        opciones: [
          'El esguince es fractura y la luxacion no',
          'El esguince lesiona ligamentos sin perder la relacion articular; la luxacion pierde la congruencia',
          'Son sinonimos',
          'La luxacion solo afecta musculos',
        ],
        correcta: 1,
        explicacion: 'El esguince es lesion ligamentaria sin desplazamiento articular; la luxacion implica perdida de la congruencia de la articulacion.',
      },
      {
        pregunta: 'Que celula osea es responsable de reabsorber hueso durante la remodelacion?',
        opciones: ['Osteoblasto', 'Osteocito', 'Osteoclasto', 'Condrocito'],
        correcta: 2,
        explicacion: 'El osteoclasto reabsorbe la matriz osea, mientras el osteoblasto la forma; el equilibrio entre ambos mantiene la masa osea.',
      },
    ],
  },
  {
    id: 'neuroanatomia-avanzada',
    numero: '1.7',
    titulo: 'Neuroanatomia y Neurofisiologia Avanzada',
    icono: '🧠',
    duracion: '60 min',
    resumen:
      'El sistema nervioso es la red de mando del cuerpo. Comprender el potencial de accion, la sinapsis y la organizacion del SNC, SNP y SNA es la base del manejo neurologico y del paciente critico.',
    objetivos: [
      'Describir la estructura de la neurona y la generacion del potencial de accion.',
      'Explicar la transmision sinaptica y los principales neurotransmisores.',
      'Diferenciar SNC, SNP y los dos brazos del sistema nervioso autonomo.',
      'Reconocer las regiones del encefalo y la funcion de los pares craneales clave.',
    ],
    secciones: [
      {
        titulo: 'La neurona y el potencial de accion',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'neurona',
            titulo: 'Estructura de la neurona',
          },
          {
            tipo: 'p',
            texto:
              'La neurona tiene dendritas que reciben senales, un cuerpo o soma que las integra y un axon que conduce el impulso. Muchos axones estan recubiertos de mielina, un aislante que acelera la conduccion mediante los nodos de Ranvier (conduccion saltatoria).',
          },
          {
            tipo: 'pasos',
            titulo: 'Fases del potencial de accion',
            items: [
              'Reposo: el interior es negativo (alrededor de menos 70 mV) gracias a la bomba sodio-potasio.',
              'Despolarizacion: un estimulo abre canales de sodio; el sodio entra y el interior se vuelve positivo.',
              'Repolarizacion: el potasio sale y restaura la negatividad interna.',
              'Hiperpolarizacion: breve sobrecorreccion antes de volver al reposo.',
              'Periodo refractario: la neurona no responde, lo que asegura la direccion del impulso.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Ley del todo o nada',
            texto:
              'El potencial de accion se dispara solo si el estimulo alcanza el umbral; una vez disparado, su amplitud es siempre la misma. La intensidad del estimulo se codifica por la frecuencia de disparos, no por su tamano.',
          },
        ],
      },
      {
        titulo: 'La sinapsis',
        bloques: [
          {
            tipo: 'p',
            texto:
              'En la sinapsis quimica, el potencial de accion llega al boton terminal, entra calcio y se liberan neurotransmisores que cruzan la hendidura sinaptica para unirse a receptores postsinapticos. La senal puede ser excitatoria o inhibitoria segun el neurotransmisor y el receptor.',
          },
          {
            tipo: 'tabla',
            titulo: 'Neurotransmisores principales',
            headers: ['Neurotransmisor', 'Efecto general', 'Relevancia'],
            filas: [
              ['Acetilcolina', 'Excitatorio en musculo', 'Union neuromuscular y parasimpatico'],
              ['Noradrenalina', 'Excitatorio', 'Respuesta simpatica de lucha o huida'],
              ['Dopamina', 'Modulador', 'Movimiento y recompensa (Parkinson)'],
              ['GABA', 'Inhibitorio', 'Principal freno del SNC'],
              ['Glutamato', 'Excitatorio', 'Principal excitador del SNC'],
              ['Serotonina', 'Modulador', 'Estado de animo y sueno'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Intoxicacion por organofosforados',
            texto:
              'Los organofosforados inhiben la acetilcolinesterasa y la acetilcolina se acumula, causando el sindrome colinergico: salivacion, lagrimeo, miccion, bradicardia y broncorrea. El antidoto es la atropina.',
          },
        ],
      },
      {
        titulo: 'Organizacion del sistema nervioso',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El sistema nervioso se divide en central (SNC: encefalo y medula espinal) y periferico (SNP: nervios craneales y espinales). El SNP a su vez se divide en somatico (voluntario) y autonomo (involuntario).',
          },
          {
            tipo: 'tabla',
            titulo: 'Sistema nervioso autonomo',
            headers: ['Rama', 'Funcion', 'Efectos'],
            filas: [
              ['Simpatico', 'Lucha o huida', 'Taquicardia, midriasis, broncodilatacion, vasoconstriccion'],
              ['Parasimpatico', 'Reposo y digestion', 'Bradicardia, miosis, broncoconstriccion, aumento de la digestion'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'El simpatico usa principalmente noradrenalina (y adrenalina desde la medula suprarrenal); el parasimpatico usa acetilcolina. El conocimiento de estos sistemas explica el efecto de muchos farmacos de emergencia, como la atropina y la adrenalina.',
          },
        ],
      },
      {
        titulo: 'El encefalo',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'encefalo',
            titulo: 'Regiones del encefalo',
          },
          {
            tipo: 'lista',
            titulo: 'Regiones y funciones',
            items: [
              'Cerebro (corteza): pensamiento, movimiento voluntario, sensibilidad, lenguaje.',
              'Cerebelo: coordinacion, equilibrio y tono muscular.',
              'Diencefalo: talamo (releva sensibilidad) e hipotalamo (homeostasis y hormonas).',
              'Tronco encefalico: mesencefalo, protuberancia y bulbo; controla respiracion y latido.',
              'Bulbo raquideo: centro cardiorrespiratorio vital.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Herniacion y triada de Cushing',
            texto:
              'El aumento de la presion intracraneal produce la triada de Cushing: hipertension, bradicardia y respiracion irregular. Es un signo tardio y grave de herniacion cerebral inminente.',
          },
          {
            tipo: 'lista',
            titulo: 'Pares craneales clave en urgencias',
            items: [
              'II Optico: vision; reflejo fotomotor.',
              'III Oculomotor: movimiento ocular y constriccion pupilar; su compresion causa midriasis fija.',
              'VII Facial: expresion facial; util en sospecha de evento cerebral.',
              'X Vago: control parasimpatico del corazon y visceras.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Potencial de accion', definicion: 'Cambio electrico de la neurona que transmite el impulso siguiendo la ley del todo o nada.' },
      { termino: 'Mielina', definicion: 'Aislante del axon que acelera la conduccion mediante los nodos de Ranvier.' },
      { termino: 'Sinapsis', definicion: 'Punto de comunicacion entre neuronas mediado por neurotransmisores.' },
      { termino: 'Simpatico', definicion: 'Rama autonoma de lucha o huida; usa noradrenalina.' },
      { termino: 'Parasimpatico', definicion: 'Rama autonoma de reposo y digestion; usa acetilcolina.' },
      { termino: 'Triada de Cushing', definicion: 'Hipertension, bradicardia y respiracion irregular por hipertension intracraneal.' },
      { termino: 'Bulbo raquideo', definicion: 'Region del tronco que controla la respiracion y el latido cardiaco.' },
    ],
    flashcards: [
      { frente: 'Cual es el potencial de reposo de la neurona?', reverso: 'Alrededor de menos 70 mV.' },
      { frente: 'Que ion entra durante la despolarizacion?', reverso: 'El sodio.' },
      { frente: 'Que acelera la conduccion del axon?', reverso: 'La mielina, mediante conduccion saltatoria por los nodos de Ranvier.' },
      { frente: 'Que neurotransmisor usa el simpatico?', reverso: 'Principalmente la noradrenalina.' },
      { frente: 'Que neurotransmisor usa el parasimpatico?', reverso: 'La acetilcolina.' },
      { frente: 'Que es la triada de Cushing?', reverso: 'Hipertension, bradicardia y respiracion irregular por hipertension intracraneal.' },
      { frente: 'Que region controla la respiracion y el latido?', reverso: 'El bulbo raquideo del tronco encefalico.' },
      { frente: 'Cual es el principal neurotransmisor inhibitorio del SNC?', reverso: 'El GABA.' },
    ],
    quiz: [
      {
        pregunta: 'Por que la mielina aumenta la velocidad de conduccion del impulso?',
        opciones: [
          'Porque genera mas neurotransmisores',
          'Porque permite la conduccion saltatoria entre los nodos de Ranvier',
          'Porque aumenta el calcio intracelular',
          'Porque elimina el periodo refractario',
        ],
        correcta: 1,
        explicacion: 'La mielina aisla el axon y el impulso salta de un nodo de Ranvier al siguiente (conduccion saltatoria), lo que acelera enormemente la transmision.',
      },
      {
        pregunta: 'Un paciente con intoxicacion por organofosforados presenta salivacion, lagrimeo, miosis y bradicardia. El mecanismo es:',
        opciones: [
          'Exceso de noradrenalina',
          'Inhibicion de la acetilcolinesterasa con acumulacion de acetilcolina',
          'Bloqueo de receptores de dopamina',
          'Deficit de GABA',
        ],
        correcta: 1,
        explicacion: 'Los organofosforados inhiben la acetilcolinesterasa; la acetilcolina se acumula y sobreestimula los receptores colinergicos. El antidoto es la atropina.',
      },
      {
        pregunta: 'Cual efecto corresponde a la activacion simpatica?',
        opciones: ['Bradicardia y miosis', 'Broncoconstriccion', 'Taquicardia, midriasis y broncodilatacion', 'Aumento de la digestion'],
        correcta: 2,
        explicacion: 'El simpatico prepara para la lucha o huida: acelera el corazon, dilata pupilas y bronquios y desvia el flujo a los musculos.',
      },
      {
        pregunta: 'La ley del todo o nada significa que:',
        opciones: [
          'El estimulo siempre es maximo',
          'Si se alcanza el umbral, el potencial de accion se dispara con amplitud constante',
          'La neurona nunca se repolariza',
          'La amplitud depende de la intensidad del estimulo',
        ],
        correcta: 1,
        explicacion: 'Una vez alcanzado el umbral, el potencial de accion tiene amplitud fija; la intensidad del estimulo se codifica por la frecuencia de disparo, no por la amplitud.',
      },
      {
        pregunta: 'La compresion del tercer par craneal (oculomotor) por herniacion produce:',
        opciones: ['Miosis bilateral', 'Midriasis fija unilateral', 'Perdida de la audicion', 'Paralisis de la lengua'],
        correcta: 1,
        explicacion: 'El III par lleva fibras parasimpaticas que constrinen la pupila; su compresion las anula y aparece una pupila dilatada y fija, signo de herniacion.',
      },
      {
        pregunta: 'Cual estructura del tronco encefalico es el centro cardiorrespiratorio vital?',
        opciones: ['Cerebelo', 'Talamo', 'Bulbo raquideo', 'Corteza frontal'],
        correcta: 2,
        explicacion: 'El bulbo raquideo aloja los centros que regulan la respiracion y el latido cardiaco; su dano es incompatible con la vida.',
      },
      {
        pregunta: 'Durante el periodo refractario absoluto, la neurona:',
        opciones: [
          'Responde a cualquier estimulo',
          'No puede generar un nuevo potencial de accion, lo que asegura la direccionalidad del impulso',
          'Libera mas calcio',
          'Se hiperpolariza de forma permanente',
        ],
        correcta: 1,
        explicacion: 'En el periodo refractario absoluto los canales de sodio estan inactivados y no puede dispararse otro potencial, garantizando que el impulso viaje en una sola direccion.',
      },
    ],
  },
  {
    id: 'cardiovascular-profundo',
    numero: '1.8',
    titulo: 'Anatomia y Fisiologia Cardiovascular',
    icono: '❤️',
    duracion: '60 min',
    resumen:
      'El corazon es una bomba doble que impulsa la sangre por dos circuitos. Dominar el ciclo cardiaco, la conduccion y el gasto cardiaco es la base para entender el shock, la insuficiencia cardiaca y las arritmias.',
    objetivos: [
      'Describir las camaras, valvulas y arterias coronarias del corazon.',
      'Explicar el ciclo cardiaco y los ruidos cardiacos.',
      'Trazar el sistema de conduccion electrica del corazon.',
      'Calcular y analizar los determinantes del gasto cardiaco.',
    ],
    secciones: [
      {
        titulo: 'Anatomia del corazon',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'corazon',
            titulo: 'Camaras y valvulas del corazon',
          },
          {
            tipo: 'p',
            texto:
              'El corazon tiene cuatro camaras: dos auriculas que reciben sangre y dos ventriculos que la expulsan. El lado derecho maneja sangre desoxigenada hacia los pulmones; el izquierdo, sangre oxigenada hacia el cuerpo. El tabique los separa.',
          },
          {
            tipo: 'tabla',
            titulo: 'Valvulas cardiacas',
            headers: ['Valvula', 'Ubicacion', 'Funcion'],
            filas: [
              ['Tricuspide', 'Auricula derecha a ventriculo derecho', 'Evita reflujo hacia la auricula'],
              ['Pulmonar', 'Ventriculo derecho a arteria pulmonar', 'Salida a los pulmones'],
              ['Mitral', 'Auricula izquierda a ventriculo izquierdo', 'Evita reflujo hacia la auricula'],
              ['Aortica', 'Ventriculo izquierdo a la aorta', 'Salida a la circulacion sistemica'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Coronarias',
            texto:
              'Las arterias coronarias nacen de la raiz aortica y nutren al miocardio durante la diastole. La descendente anterior izquierda irriga gran parte del ventriculo izquierdo; su oclusion causa el infarto mas extenso y peligroso.',
          },
        ],
      },
      {
        titulo: 'La circulacion',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'circulacion',
            titulo: 'Circulacion mayor y menor',
          },
          {
            tipo: 'p',
            texto:
              'Existen dos circuitos: la circulacion menor o pulmonar lleva sangre del ventriculo derecho a los pulmones para oxigenarse y regresa a la auricula izquierda; la circulacion mayor o sistemica lleva sangre oxigenada del ventriculo izquierdo al cuerpo y regresa desoxigenada a la auricula derecha.',
          },
          {
            tipo: 'lista',
            titulo: 'Tipos de vasos',
            items: [
              'Arterias: llevan sangre a presion lejos del corazon; paredes gruesas y elasticas.',
              'Arteriolas: regulan la resistencia y la presion arterial; son la llave del flujo.',
              'Capilares: sitio de intercambio de gases y nutrientes; pared de una celula.',
              'Venas: regresan sangre al corazon a baja presion; tienen valvulas.',
            ],
          },
        ],
      },
      {
        titulo: 'Ciclo cardiaco',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El ciclo cardiaco alterna sistole (contraccion y expulsion) y diastole (relajacion y llenado). Durante la sistole ventricular se cierran las valvulas auriculoventriculares (primer ruido, S1) y se abren las semilunares; durante la diastole se cierran las semilunares (segundo ruido, S2) y se llenan los ventriculos.',
          },
          {
            tipo: 'pasos',
            titulo: 'Secuencia del ciclo',
            items: [
              'Llenado ventricular diastolico, ayudado por la contraccion auricular.',
              'Contraccion isovolumetrica: se cierran las valvulas AV (S1).',
              'Eyeccion: se abren las valvulas semilunares y sale la sangre.',
              'Relajacion isovolumetrica: se cierran las semilunares (S2).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Las coronarias se llenan en diastole',
            texto:
              'El miocardio recibe su sangre durante la diastole, cuando esta relajado. Una taquicardia extrema acorta la diastole y reduce la perfusion coronaria, lo que puede agravar la isquemia.',
          },
        ],
      },
      {
        titulo: 'Conduccion electrica',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'conduccion',
            titulo: 'Sistema de conduccion del corazon',
          },
          {
            tipo: 'pasos',
            titulo: 'Via de conduccion',
            items: [
              'Nodo sinoauricular (marcapasos natural, 60-100 por minuto) inicia el impulso.',
              'Se despolarizan las auriculas y la sangre pasa a los ventriculos.',
              'Nodo auriculoventricular retrasa el impulso para permitir el llenado.',
              'Haz de His y sus ramas conducen el impulso al tabique.',
              'Fibras de Purkinje despolarizan los ventriculos de abajo hacia arriba.',
            ],
          },
          {
            tipo: 'p',
            texto:
              'Si el nodo sinusal falla, un marcapasos subsidiario toma el control a menor frecuencia: el nodo AV (40-60) o las fibras ventriculares (20-40). Esto explica los ritmos de escape en bloqueos cardiacos.',
          },
        ],
      },
      {
        titulo: 'Gasto cardiaco',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'gasto',
            titulo: 'Determinantes del gasto cardiaco',
          },
          {
            tipo: 'formula',
            texto: 'Gasto cardiaco = Frecuencia cardiaca x Volumen sistolico',
            nota: 'El volumen sistolico depende de precarga, contractilidad y poscarga.',
          },
          {
            tipo: 'lista',
            titulo: 'Determinantes del volumen sistolico',
            items: [
              'Precarga: volumen de sangre que llena el ventriculo antes de contraerse (ley de Frank-Starling).',
              'Contractilidad: fuerza intrinseca de la contraccion miocardica.',
              'Poscarga: resistencia que el ventriculo debe vencer para eyectar (presion arterial).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Aplicacion en shock',
            texto:
              'La presion arterial es producto del gasto cardiaco por la resistencia vascular. En el shock hipovolemico cae la precarga; en el cardiogenico falla la contractilidad; en el distributivo cae la resistencia. Identificar el determinante alterado guia el tratamiento.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Gasto cardiaco', definicion: 'Volumen de sangre que el corazon bombea por minuto; frecuencia por volumen sistolico.' },
      { termino: 'Precarga', definicion: 'Volumen de sangre que llena el ventriculo al final de la diastole.' },
      { termino: 'Poscarga', definicion: 'Resistencia que el ventriculo debe vencer para eyectar la sangre.' },
      { termino: 'Nodo sinoauricular', definicion: 'Marcapasos natural del corazon, dispara 60-100 veces por minuto.' },
      { termino: 'Ley de Frank-Starling', definicion: 'A mayor estiramiento del ventriculo por la precarga, mayor fuerza de contraccion.' },
      { termino: 'Sistole', definicion: 'Fase de contraccion y eyeccion de la sangre.' },
      { termino: 'Diastole', definicion: 'Fase de relajacion y llenado; durante ella se perfunden las coronarias.' },
    ],
    flashcards: [
      { frente: 'Cual es la formula del gasto cardiaco?', reverso: 'Gasto cardiaco = frecuencia cardiaca por volumen sistolico.' },
      { frente: 'Cual es el marcapasos natural del corazon?', reverso: 'El nodo sinoauricular (SA).' },
      { frente: 'Cuando se perfunden las coronarias?', reverso: 'Durante la diastole, cuando el miocardio esta relajado.' },
      { frente: 'Que valvula separa la auricula izquierda del ventriculo izquierdo?', reverso: 'La valvula mitral.' },
      { frente: 'Que produce el primer ruido cardiaco (S1)?', reverso: 'El cierre de las valvulas auriculoventriculares (mitral y tricuspide).' },
      { frente: 'Que es la poscarga?', reverso: 'La resistencia que el ventriculo debe vencer para eyectar la sangre.' },
      { frente: 'Que arteria coronaria irriga gran parte del ventriculo izquierdo?', reverso: 'La descendente anterior izquierda.' },
      { frente: 'Que dice la ley de Frank-Starling?', reverso: 'A mayor estiramiento ventricular por la precarga, mayor fuerza de contraccion.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con taquicardia ventricular a 200 por minuto desarrolla isquemia. La razon fisiologica principal es:',
        opciones: [
          'Aumenta la diastole y se llena demasiado el corazon',
          'La diastole se acorta y reduce la perfusion coronaria',
          'Las coronarias se llenan en sistole',
          'Aumenta la precarga en exceso',
        ],
        correcta: 1,
        explicacion: 'Las coronarias se perfunden en diastole; una frecuencia muy alta acorta la diastole y disminuye el flujo coronario, agravando la isquemia.',
      },
      {
        pregunta: 'En un shock hipovolemico, cual determinante del gasto cardiaco cae primero?',
        opciones: ['Contractilidad', 'Poscarga', 'Precarga', 'Frecuencia cardiaca'],
        correcta: 2,
        explicacion: 'La perdida de volumen reduce el retorno venoso y por tanto la precarga, disminuyendo el volumen sistolico y el gasto cardiaco.',
      },
      {
        pregunta: 'Si falla el nodo sinusal, que estructura asume el control y a que frecuencia aproximada?',
        opciones: [
          'El haz de His a 100 por minuto',
          'El nodo AV a 40-60 por minuto',
          'Las auriculas a 120 por minuto',
          'Las coronarias a 80 por minuto',
        ],
        correcta: 1,
        explicacion: 'El nodo AV es el marcapasos subsidiario y dispara a 40-60 por minuto; las fibras ventriculares lo hacen aun mas lento (20-40).',
      },
      {
        pregunta: 'El segundo ruido cardiaco (S2) corresponde a:',
        opciones: [
          'Cierre de valvulas AV',
          'Apertura de valvulas semilunares',
          'Cierre de valvulas semilunares (aortica y pulmonar)',
          'Contraccion auricular',
        ],
        correcta: 2,
        explicacion: 'El S2 se produce por el cierre de las valvulas semilunares al inicio de la diastole; el S1 corresponde al cierre de las valvulas AV.',
      },
      {
        pregunta: 'La presion arterial es el producto de:',
        opciones: [
          'Frecuencia cardiaca por precarga',
          'Gasto cardiaco por resistencia vascular sistemica',
          'Volumen sistolico por poscarga',
          'Contractilidad por precarga',
        ],
        correcta: 1,
        explicacion: 'La presion arterial media es aproximadamente el gasto cardiaco multiplicado por la resistencia vascular sistemica; ambos pueden alterarse en el shock.',
      },
      {
        pregunta: 'Cual es la secuencia correcta del sistema de conduccion?',
        opciones: [
          'Nodo AV, nodo SA, His, Purkinje',
          'Nodo SA, nodo AV, haz de His, fibras de Purkinje',
          'Purkinje, His, nodo AV, nodo SA',
          'Nodo SA, His, nodo AV, Purkinje',
        ],
        correcta: 1,
        explicacion: 'El impulso nace en el nodo SA, se retrasa en el nodo AV, baja por el haz de His y se distribuye por las fibras de Purkinje a los ventriculos.',
      },
      {
        pregunta: 'En el shock cardiogenico el problema principal es:',
        opciones: [
          'Perdida de volumen sanguineo',
          'Vasodilatacion masiva',
          'Falla de la contractilidad miocardica',
          'Aumento excesivo de la precarga',
        ],
        correcta: 2,
        explicacion: 'En el shock cardiogenico el corazon no contrae con fuerza suficiente (falla la contractilidad), por lo que cae el gasto cardiaco a pesar de un volumen adecuado.',
      },
    ],
  },
  {
    id: 'respiratorio-profundo',
    numero: '1.9',
    titulo: 'Anatomia y Fisiologia Respiratoria',
    icono: '🫁',
    duracion: '60 min',
    resumen:
      'La respiracion lleva oxigeno a la sangre y elimina dioxido de carbono. Comprender la mecanica ventilatoria, el intercambio gaseoso y la curva de oxihemoglobina es esencial para manejar la insuficiencia respiratoria.',
    objetivos: [
      'Describir la via aerea superior e inferior y la estructura pulmonar.',
      'Explicar la mecanica de la ventilacion y los volumenes pulmonares.',
      'Detallar el intercambio gaseoso y el transporte de oxigeno.',
      'Interpretar la curva de disociacion de la oxihemoglobina.',
    ],
    secciones: [
      {
        titulo: 'Anatomia respiratoria',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'respiratorio',
            titulo: 'Via aerea y pulmones',
          },
          {
            tipo: 'p',
            texto:
              'La via aerea superior incluye nariz, faringe y laringe; la inferior, traquea, bronquios, bronquiolos y alveolos. La laringe contiene las cuerdas vocales y la epiglotis, que protege la via aerea al deglutir. El arbol bronquial se ramifica hasta los alveolos, donde ocurre el intercambio.',
          },
          {
            tipo: 'lista',
            titulo: 'Funciones de la via aerea',
            items: [
              'Calentar, humidificar y filtrar el aire inspirado.',
              'Conducir el aire hasta los alveolos.',
              'Proteger la via aerea (epiglotis, reflejo tusigeno).',
              'Fonacion mediante las cuerdas vocales.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Surfactante',
            texto:
              'Los neumocitos tipo II producen surfactante, que reduce la tension superficial y evita el colapso alveolar. Su deficiencia en prematuros causa el sindrome de dificultad respiratoria neonatal.',
          },
        ],
      },
      {
        titulo: 'Mecanica de la ventilacion',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La ventilacion es un proceso mecanico gobernado por cambios de presion. En la inspiracion el diafragma desciende y los intercostales externos elevan las costillas, aumentando el volumen toracico y reduciendo la presion, por lo que el aire entra. La espiracion en reposo es pasiva por retroceso elastico.',
          },
          {
            tipo: 'tabla',
            titulo: 'Volumenes pulmonares',
            headers: ['Volumen', 'Definicion', 'Valor aprox.'],
            filas: [
              ['Volumen corriente', 'Aire por respiracion normal', '500 mL'],
              ['Volumen de reserva inspiratorio', 'Aire extra que se puede inhalar', '3000 mL'],
              ['Volumen de reserva espiratorio', 'Aire extra que se puede exhalar', '1100 mL'],
              ['Volumen residual', 'Aire que queda tras espiracion maxima', '1200 mL'],
              ['Espacio muerto', 'Aire que no participa en el intercambio', '150 mL'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'El control de la respiracion reside en el bulbo y la protuberancia. El estimulo principal es el dioxido de carbono (a traves del pH del liquido cefalorraquideo). En el paciente con EPOC cronico el estimulo puede depender mas del oxigeno bajo, por lo que el oxigeno se administra de forma controlada.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Neumotorax a tension',
            texto:
              'El aire atrapado en el espacio pleural colapsa el pulmon y desplaza el mediastino, comprimiendo el corazon y los grandes vasos. Es una urgencia que requiere descompresion inmediata.',
          },
        ],
      },
      {
        titulo: 'Intercambio gaseoso',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El intercambio ocurre por difusion simple en la membrana alveolo-capilar: el oxigeno pasa del alveolo a la sangre y el dioxido de carbono en sentido inverso, siguiendo gradientes de presion parcial. La relacion entre ventilacion y perfusion (V/Q) determina la eficiencia del intercambio.',
          },
          {
            tipo: 'lista',
            titulo: 'Transporte de gases',
            items: [
              'Oxigeno: la mayoria viaja unido a la hemoglobina; una pequena fraccion disuelta en plasma.',
              'Dioxido de carbono: viaja como bicarbonato (la mayoria), unido a hemoglobina y disuelto.',
              'La saturacion de oxigeno (SpO2) refleja el porcentaje de hemoglobina ocupada por oxigeno.',
            ],
          },
        ],
      },
      {
        titulo: 'Curva de oxihemoglobina',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'oxihemoglobina',
            titulo: 'Curva de disociacion de la oxihemoglobina',
          },
          {
            tipo: 'p',
            texto:
              'La curva relaciona la presion parcial de oxigeno con la saturacion de la hemoglobina. Tiene forma de S: en los pulmones (alta presion) la hemoglobina se satura facil, y en los tejidos (baja presion) suelta el oxigeno. Su pendiente pronunciada explica por que una pequena caida de la presion produce gran descarga de oxigeno a los tejidos.',
          },
          {
            tipo: 'tabla',
            titulo: 'Desplazamiento de la curva',
            headers: ['Direccion', 'Causas', 'Efecto'],
            filas: [
              ['A la derecha', 'Acidosis, fiebre, CO2 alto, ejercicio', 'Suelta mas oxigeno a los tejidos'],
              ['A la izquierda', 'Alcalosis, hipotermia, CO2 bajo', 'Retiene mas oxigeno; lo suelta menos'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Efecto Bohr',
            texto:
              'El aumento de CO2 y la acidez desplazan la curva a la derecha, facilitando que la hemoglobina entregue oxigeno justo donde el metabolismo es mas intenso. Es un ajuste elegante a las necesidades del tejido.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Surfactante', definicion: 'Sustancia que reduce la tension superficial y evita el colapso alveolar.' },
      { termino: 'Volumen corriente', definicion: 'Cantidad de aire movilizado en una respiracion normal, unos 500 mL.' },
      { termino: 'Espacio muerto', definicion: 'Aire en vias que no participa en el intercambio gaseoso.' },
      { termino: 'Relacion V/Q', definicion: 'Equilibrio entre ventilacion y perfusion que determina el intercambio gaseoso.' },
      { termino: 'Curva de oxihemoglobina', definicion: 'Relacion sigmoidea entre la presion de oxigeno y la saturacion de la hemoglobina.' },
      { termino: 'Efecto Bohr', definicion: 'Desplazamiento de la curva a la derecha por CO2 y acidez, que libera mas oxigeno.' },
      { termino: 'Neumotorax a tension', definicion: 'Acumulacion de aire pleural que colapsa el pulmon y desplaza el mediastino.' },
    ],
    flashcards: [
      { frente: 'Que celula produce surfactante?', reverso: 'El neumocito tipo II.' },
      { frente: 'Cual es el principal estimulo de la respiracion?', reverso: 'El dioxido de carbono, a traves del pH del liquido cefalorraquideo.' },
      { frente: 'Como se transporta la mayor parte del CO2?', reverso: 'Como bicarbonato en el plasma.' },
      { frente: 'Que desplaza la curva de oxihemoglobina a la derecha?', reverso: 'Acidosis, fiebre, CO2 alto y ejercicio.' },
      { frente: 'Que significa un desplazamiento a la derecha de la curva?', reverso: 'La hemoglobina suelta mas oxigeno a los tejidos.' },
      { frente: 'Cual es el volumen corriente normal?', reverso: 'Aproximadamente 500 mL.' },
      { frente: 'Que estructura protege la via aerea al deglutir?', reverso: 'La epiglotis.' },
      { frente: 'Por que el oxigeno se administra controlado en EPOC?', reverso: 'Porque su estimulo respiratorio puede depender del oxigeno bajo y el exceso puede deprimir la ventilacion.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente febril y acidotico necesita entregar mas oxigeno a sus tejidos. Que ocurre con la curva de oxihemoglobina?',
        opciones: [
          'Se desplaza a la izquierda y retiene oxigeno',
          'Se desplaza a la derecha y libera mas oxigeno',
          'No cambia',
          'Se vuelve lineal',
        ],
        correcta: 1,
        explicacion: 'La fiebre y la acidosis desplazan la curva a la derecha (efecto Bohr), facilitando que la hemoglobina suelte oxigeno donde mas se necesita.',
      },
      {
        pregunta: 'Por que el surfactante es vital para la respiracion?',
        opciones: [
          'Aumenta la tension superficial',
          'Reduce la tension superficial y evita el colapso alveolar',
          'Transporta oxigeno',
          'Filtra el aire',
        ],
        correcta: 1,
        explicacion: 'El surfactante disminuye la tension superficial dentro del alveolo, evitando que colapse en la espiracion; su deficit causa el distres respiratorio neonatal.',
      },
      {
        pregunta: 'Durante la inspiracion en reposo, que ocurre?',
        opciones: [
          'El diafragma se relaja y sube',
          'El diafragma desciende, aumenta el volumen toracico y baja la presion',
          'La presion toracica aumenta y empuja el aire afuera',
          'Solo intervienen los abdominales',
        ],
        correcta: 1,
        explicacion: 'El diafragma desciende y los intercostales externos elevan las costillas; el volumen toracico aumenta, la presion cae y el aire entra.',
      },
      {
        pregunta: 'En la mayoria de las personas sanas, cual es el principal estimulo para respirar?',
        opciones: ['La presion de oxigeno', 'La presion de dioxido de carbono y el pH', 'La glucosa en sangre', 'La temperatura corporal'],
        correcta: 1,
        explicacion: 'Los quimiorreceptores centrales responden sobre todo al CO2 y al pH del liquido cefalorraquideo; el CO2 es el estimulo dominante de la ventilacion.',
      },
      {
        pregunta: 'Un trauma toracico provoca colapso pulmonar, desviacion traqueal e hipotension. El cuadro mas probable es:',
        opciones: ['Asma', 'Neumotorax a tension', 'Edema pulmonar', 'Embolia grasa'],
        correcta: 1,
        explicacion: 'El neumotorax a tension colapsa el pulmon, desvia el mediastino y comprime los grandes vasos, causando hipotension; requiere descompresion inmediata.',
      },
      {
        pregunta: 'La forma sigmoidea de la curva de oxihemoglobina implica que:',
        opciones: [
          'La saturacion cae linealmente con la presion',
          'Pequenas caidas de presion en la zona empinada liberan mucho oxigeno a los tejidos',
          'La hemoglobina nunca suelta oxigeno',
          'El CO2 no afecta la entrega de oxigeno',
        ],
        correcta: 1,
        explicacion: 'La pendiente pronunciada de la curva en presiones bajas permite que pequenas reducciones de presion liberen grandes cantidades de oxigeno a los tejidos.',
      },
      {
        pregunta: 'Cual de los siguientes NO participa en el intercambio gaseoso?',
        opciones: ['Volumen corriente que llega al alveolo', 'Espacio muerto anatomico', 'Membrana alveolo-capilar', 'Capilares pulmonares'],
        correcta: 1,
        explicacion: 'El espacio muerto es el aire que permanece en las vias de conduccion (traquea, bronquios) y no llega al alveolo, por lo que no participa en el intercambio.',
      },
    ],
  },
  {
    id: 'renal-hidroelectrolitico',
    numero: '1.10',
    titulo: 'Fisiologia Renal y Equilibrio Hidroelectrolitico',
    icono: '💧',
    duracion: '55 min',
    resumen:
      'Los rinones filtran la sangre, regulan los liquidos y los electrolitos y controlan la presion arterial. Dominar la nefrona, el SRAA y el manejo del sodio y el potasio es vital en el paciente critico.',
    objetivos: [
      'Describir la estructura de la nefrona y el proceso de formacion de orina.',
      'Explicar el sistema renina-angiotensina-aldosterona.',
      'Analizar la regulacion del sodio, el potasio y el agua.',
      'Relacionar la funcion renal con el equilibrio acido-base y la presion arterial.',
    ],
    secciones: [
      {
        titulo: 'La nefrona',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'nefrona',
            titulo: 'Estructura de la nefrona',
          },
          {
            tipo: 'p',
            texto:
              'La nefrona es la unidad funcional del rinon; cada rinon tiene cerca de un millon. Consta del glomerulo (filtro), la capsula de Bowman, el tubulo proximal, el asa de Henle, el tubulo distal y el tubo colector. La orina se forma por filtracion, reabsorcion y secrecion.',
          },
          {
            tipo: 'pasos',
            titulo: 'Formacion de la orina',
            items: [
              'Filtracion glomerular: la presion empuja agua y solutos pequenos hacia la capsula de Bowman.',
              'Reabsorcion tubular: se recuperan agua, glucosa, sodio y otros solutos utiles hacia la sangre.',
              'Secrecion tubular: se anaden a la orina sustancias como potasio, hidrogeniones y farmacos.',
              'Excrecion: la orina final sale por el tubo colector hacia la pelvis renal.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Tasa de filtracion glomerular',
            texto:
              'La TFG mide cuanta sangre filtran los rinones por minuto y es el mejor indicador de la funcion renal. Depende de la presion de perfusion; en el shock cae la TFG y se produce oliguria, un signo temprano de hipoperfusion.',
          },
        ],
      },
      {
        titulo: 'Funciones del rinon',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Funciones renales',
            items: [
              'Eliminar productos de desecho (urea, creatinina, acidos).',
              'Regular el volumen y la composicion de los liquidos corporales.',
              'Controlar la presion arterial mediante el SRAA.',
              'Mantener el equilibrio acido-base regulando bicarbonato e hidrogeniones.',
              'Producir eritropoyetina (estimula la formacion de globulos rojos) y activar vitamina D.',
            ],
          },
          {
            tipo: 'p',
            texto:
              'El rinon ajusta finamente el agua y los electrolitos. La hormona antidiuretica (ADH), liberada por la hipofisis posterior, aumenta la reabsorcion de agua en el tubo colector cuando el cuerpo necesita conservar liquidos, concentrando la orina.',
          },
        ],
      },
      {
        titulo: 'Sistema renina-angiotensina-aldosterona',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Cascada del SRAA',
            items: [
              'La caida de presion o de sodio estimula al rinon a liberar renina.',
              'La renina convierte el angiotensinogeno en angiotensina I.',
              'La enzima convertidora (ECA) transforma angiotensina I en angiotensina II.',
              'La angiotensina II provoca vasoconstriccion potente y libera aldosterona.',
              'La aldosterona retiene sodio y agua, y elimina potasio, elevando la presion.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Por que importa en farmacologia',
            texto:
              'Los inhibidores de la ECA y los antagonistas de la aldosterona se usan en hipertension e insuficiencia cardiaca porque interrumpen este eje. Vigilar el potasio es clave, pues pueden elevarlo.',
          },
        ],
      },
      {
        titulo: 'Sodio, potasio y agua',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Electrolitos clave',
            headers: ['Electrolito', 'Compartimento', 'Importancia'],
            filas: [
              ['Sodio', 'Principal extracelular', 'Determina el volumen y la osmolaridad'],
              ['Potasio', 'Principal intracelular', 'Excitabilidad cardiaca y neuromuscular'],
              ['Calcio', 'Hueso y plasma', 'Contraccion y coagulacion'],
              ['Bicarbonato', 'Plasma', 'Amortiguador acido-base'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'El sodio gobierna donde esta el agua: la natremia refleja el balance entre sodio y agua. El potasio es critico para el corazon: tanto la hipopotasemia como la hiperpotasemia provocan arritmias potencialmente letales. La hiperpotasemia severa altera el ECG con ondas T picudas y puede causar paro cardiaco.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Potasio y corazon',
            texto:
              'La hiperpotasemia es una de las urgencias metabolicas mas peligrosas. El calcio intravenoso estabiliza la membrana cardiaca mientras se toman medidas para bajar el potasio.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Nefrona', definicion: 'Unidad funcional del rinon donde se filtra la sangre y se forma la orina.' },
      { termino: 'Tasa de filtracion glomerular', definicion: 'Volumen de sangre filtrado por minuto; mejor indicador de funcion renal.' },
      { termino: 'SRAA', definicion: 'Sistema renina-angiotensina-aldosterona que regula presion y volumen.' },
      { termino: 'Aldosterona', definicion: 'Hormona que retiene sodio y agua y elimina potasio.' },
      { termino: 'ADH', definicion: 'Hormona antidiuretica que aumenta la reabsorcion de agua en el tubo colector.' },
      { termino: 'Eritropoyetina', definicion: 'Hormona renal que estimula la produccion de globulos rojos.' },
      { termino: 'Hiperpotasemia', definicion: 'Exceso de potasio que puede causar arritmias y paro cardiaco.' },
    ],
    flashcards: [
      { frente: 'Cual es la unidad funcional del rinon?', reverso: 'La nefrona.' },
      { frente: 'Cuales son los tres procesos de formacion de orina?', reverso: 'Filtracion, reabsorcion y secrecion.' },
      { frente: 'Que hormona retiene sodio y agua y elimina potasio?', reverso: 'La aldosterona.' },
      { frente: 'Que efecto tiene la ADH?', reverso: 'Aumenta la reabsorcion de agua y concentra la orina.' },
      { frente: 'Que enzima convierte la angiotensina I en II?', reverso: 'La enzima convertidora de angiotensina (ECA).' },
      { frente: 'Cual es el principal electrolito intracelular?', reverso: 'El potasio.' },
      { frente: 'Que cambio en el ECG sugiere hiperpotasemia?', reverso: 'Ondas T picudas.' },
      { frente: 'Que hormona renal estimula la formacion de globulos rojos?', reverso: 'La eritropoyetina.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente en shock presenta oliguria (poca orina). Que indica este signo a nivel renal?',
        opciones: [
          'Aumento de la filtracion glomerular',
          'Caida de la presion de perfusion y de la TFG por hipoperfusion',
          'Exceso de ADH bloqueado',
          'Falla de la aldosterona',
        ],
        correcta: 1,
        explicacion: 'La hipoperfusion reduce la presion en el glomerulo y baja la TFG, disminuyendo la produccion de orina; la oliguria es un signo temprano de mala perfusion.',
      },
      {
        pregunta: 'Cual es el efecto neto de la activacion del SRAA?',
        opciones: [
          'Disminuye la presion arterial',
          'Retiene sodio y agua, causa vasoconstriccion y eleva la presion',
          'Elimina sodio y agua',
          'Disminuye el potasio sin afectar la presion',
        ],
        correcta: 1,
        explicacion: 'El SRAA eleva la presion: la angiotensina II contrae los vasos y la aldosterona retiene sodio y agua mientras elimina potasio.',
      },
      {
        pregunta: 'Un paciente con hiperpotasemia severa y ondas T picudas requiere primero:',
        opciones: [
          'Diureticos solamente',
          'Calcio intravenoso para estabilizar la membrana cardiaca',
          'Mas potasio',
          'Restriccion de liquidos',
        ],
        correcta: 1,
        explicacion: 'El calcio intravenoso estabiliza la membrana del miocardio y protege contra arritmias mientras se toman medidas para reducir el potasio serico.',
      },
      {
        pregunta: 'Que hormona permite concentrar la orina al conservar agua?',
        opciones: ['Aldosterona', 'ADH (hormona antidiuretica)', 'Renina', 'Eritropoyetina'],
        correcta: 1,
        explicacion: 'La ADH aumenta la permeabilidad al agua en el tubo colector, reabsorbiendo agua y concentrando la orina cuando el cuerpo necesita conservar liquidos.',
      },
      {
        pregunta: 'Por que el sodio determina el volumen de liquido corporal?',
        opciones: [
          'Porque es el principal cation intracelular',
          'Porque es el principal soluto extracelular y el agua lo sigue por osmosis',
          'Porque no afecta la osmolaridad',
          'Porque se elimina sin agua',
        ],
        correcta: 1,
        explicacion: 'El sodio es el principal determinante de la osmolaridad extracelular; donde va el sodio, el agua lo sigue por osmosis, regulando el volumen.',
      },
      {
        pregunta: 'Un paciente toma un inhibidor de la ECA. Que parametro debe vigilarse de cerca?',
        opciones: ['Sodio bajo', 'Potasio, que puede elevarse', 'Glucosa', 'Calcio bajo'],
        correcta: 1,
        explicacion: 'Al inhibir la ECA disminuye la aldosterona y se retiene potasio, por lo que estos farmacos pueden causar hiperpotasemia y requieren vigilancia.',
      },
      {
        pregunta: 'En que segmento de la nefrona ocurre la mayor reabsorcion de solutos filtrados?',
        opciones: ['Tubo colector', 'Tubulo proximal', 'Capsula de Bowman', 'Asa de Henle ascendente unicamente'],
        correcta: 1,
        explicacion: 'El tubulo proximal reabsorbe la mayor parte del agua, glucosa, sodio y otros solutos del filtrado, recuperandolos hacia la sangre.',
      },
    ],
  },
  {
    id: 'sistema-endocrino',
    numero: '1.11',
    titulo: 'Sistema Endocrino',
    icono: '🧬',
    duracion: '55 min',
    resumen:
      'Las glandulas endocrinas regulan el metabolismo, el crecimiento, el estres y la glucemia mediante hormonas. Comprender los ejes hormonales es clave para entender la diabetes, las crisis tiroideas y el shock.',
    objetivos: [
      'Describir las principales glandulas endocrinas y sus hormonas.',
      'Explicar el eje hipotalamo-hipofisis y la retroalimentacion negativa.',
      'Detallar la regulacion de la glucemia por insulina y glucagon.',
      'Reconocer urgencias endocrinas como la cetoacidosis y la crisis suprarrenal.',
    ],
    secciones: [
      {
        titulo: 'Principios del sistema endocrino',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'endocrino',
            titulo: 'Glandulas endocrinas principales',
          },
          {
            tipo: 'p',
            texto:
              'El sistema endocrino se comunica mediante hormonas, mensajeros quimicos liberados a la sangre que actuan sobre celulas con receptores especificos. A diferencia del sistema nervioso, su accion es mas lenta pero mas prolongada. La retroalimentacion negativa mantiene los niveles hormonales estables.',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Retroalimentacion negativa',
            texto:
              'Cuando una hormona alcanza su nivel objetivo, frena la glandula que la produce, como un termostato. La mayoria de los ejes hormonales funcionan asi para evitar excesos y deficits.',
          },
        ],
      },
      {
        titulo: 'Hipotalamo e hipofisis',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El hipotalamo controla la hipofisis, la glandula maestra. La hipofisis anterior secreta hormonas que regulan otras glandulas (tiroides, suprarrenales, gonadas) ademas de la hormona de crecimiento y la prolactina. La hipofisis posterior libera ADH y oxitocina producidas en el hipotalamo.',
          },
          {
            tipo: 'tabla',
            titulo: 'Hormonas de la hipofisis anterior',
            headers: ['Hormona', 'Glandula diana', 'Efecto'],
            filas: [
              ['TSH', 'Tiroides', 'Estimula hormonas tiroideas'],
              ['ACTH', 'Suprarrenal', 'Estimula cortisol'],
              ['FSH y LH', 'Gonadas', 'Reproduccion'],
              ['GH', 'Tejidos', 'Crecimiento y metabolismo'],
              ['Prolactina', 'Mama', 'Produccion de leche'],
            ],
          },
        ],
      },
      {
        titulo: 'Tiroides y suprarrenales',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La tiroides produce T3 y T4, que regulan el metabolismo basal, y calcitonina, que baja el calcio. El hipertiroidismo acelera el cuerpo (taquicardia, perdida de peso); el hipotiroidismo lo enlentece. Las paratiroides regulan el calcio mediante la hormona paratiroidea.',
          },
          {
            tipo: 'tabla',
            titulo: 'Glandulas suprarrenales',
            headers: ['Zona', 'Hormona', 'Funcion'],
            filas: [
              ['Corteza (glomerular)', 'Aldosterona', 'Retiene sodio y agua'],
              ['Corteza (fascicular)', 'Cortisol', 'Respuesta al estres, glucemia, antiinflamatorio'],
              ['Corteza (reticular)', 'Androgenos', 'Hormonas sexuales'],
              ['Medula', 'Adrenalina y noradrenalina', 'Respuesta de lucha o huida'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Crisis suprarrenal',
            texto:
              'La falta de cortisol (insuficiencia suprarrenal) provoca hipotension que no responde a liquidos ni vasopresores, hipoglucemia y debilidad. Es una urgencia que requiere corticoides intravenosos.',
          },
        ],
      },
      {
        titulo: 'Pancreas y glucemia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El pancreas endocrino regula la glucemia con dos hormonas opuestas: la insulina (celulas beta) baja la glucosa al introducirla en las celulas, y el glucagon (celulas alfa) la sube al liberar glucosa del higado. Su equilibrio mantiene la glucemia estable.',
          },
          {
            tipo: 'lista',
            titulo: 'Acciones de la insulina',
            items: [
              'Permite la entrada de glucosa a las celulas.',
              'Estimula el almacenamiento de glucogeno en el higado.',
              'Inhibe la produccion de cuerpos cetonicos.',
              'Favorece la sintesis de grasa y proteinas.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Cetoacidosis diabetica',
            texto:
              'Sin insulina las celulas no pueden usar glucosa y queman grasa, produciendo cuerpos cetonicos acidos. El resultado es hiperglucemia, acidosis metabolica, deshidratacion y aliento afrutado. El tratamiento incluye liquidos, insulina y correccion de electrolitos.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Hormona', definicion: 'Mensajero quimico liberado a la sangre que actua sobre celulas con receptores especificos.' },
      { termino: 'Retroalimentacion negativa', definicion: 'Mecanismo por el cual una hormona frena su propia produccion al alcanzar su nivel objetivo.' },
      { termino: 'Hipofisis', definicion: 'Glandula maestra que regula otras glandulas bajo el control del hipotalamo.' },
      { termino: 'Cortisol', definicion: 'Hormona suprarrenal del estres que eleva la glucemia y tiene efecto antiinflamatorio.' },
      { termino: 'Insulina', definicion: 'Hormona que baja la glucemia al introducir glucosa en las celulas.' },
      { termino: 'Glucagon', definicion: 'Hormona que eleva la glucemia liberando glucosa del higado.' },
      { termino: 'Cetoacidosis diabetica', definicion: 'Urgencia por falta de insulina con hiperglucemia, cetonas y acidosis.' },
    ],
    flashcards: [
      { frente: 'Cual es la glandula maestra del sistema endocrino?', reverso: 'La hipofisis, controlada por el hipotalamo.' },
      { frente: 'Que hormona baja la glucemia?', reverso: 'La insulina.' },
      { frente: 'Que hormona sube la glucemia?', reverso: 'El glucagon.' },
      { frente: 'Que hormonas produce la tiroides?', reverso: 'T3, T4 (metabolismo) y calcitonina (baja calcio).' },
      { frente: 'Que hormona libera la corteza suprarrenal ante el estres?', reverso: 'El cortisol.' },
      { frente: 'Que produce la medula suprarrenal?', reverso: 'Adrenalina y noradrenalina.' },
      { frente: 'Que caracteriza a la cetoacidosis diabetica?', reverso: 'Hiperglucemia, cetonas, acidosis, deshidratacion y aliento afrutado.' },
      { frente: 'Que es la retroalimentacion negativa?', reverso: 'Una hormona frena su produccion al alcanzar su nivel objetivo, como un termostato.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente diabetico presenta hiperglucemia, respiracion profunda, aliento afrutado y deshidratacion. El diagnostico mas probable es:',
        opciones: ['Hipoglucemia', 'Cetoacidosis diabetica', 'Crisis tiroidea', 'Insuficiencia suprarrenal'],
        correcta: 1,
        explicacion: 'La falta de insulina lleva a quemar grasa y producir cuerpos cetonicos acidos; la hiperglucemia, la acidosis y el aliento afrutado son tipicos de la cetoacidosis diabetica.',
      },
      {
        pregunta: 'Un paciente con hipotension que no responde a liquidos ni vasopresores y tiene antecedente de uso cronico de esteroides. Que sospechar?',
        opciones: ['Shock hipovolemico', 'Crisis suprarrenal por falta de cortisol', 'Hipertiroidismo', 'Hiperglucemia simple'],
        correcta: 1,
        explicacion: 'La supresion del eje por esteroides cronicos puede causar insuficiencia suprarrenal; la falta de cortisol produce hipotension refractaria que mejora con corticoides intravenosos.',
      },
      {
        pregunta: 'Como funciona la retroalimentacion negativa en el eje tiroideo?',
        opciones: [
          'El exceso de hormona tiroidea aumenta la TSH',
          'El exceso de hormona tiroidea frena la TSH',
          'La TSH no depende de la hormona tiroidea',
          'El hipotalamo deja de funcionar',
        ],
        correcta: 1,
        explicacion: 'Cuando las hormonas tiroideas suben, inhiben la liberacion de TSH por la hipofisis, manteniendo el equilibrio mediante retroalimentacion negativa.',
      },
      {
        pregunta: 'Cual hormona y glandula corresponden a la respuesta de lucha o huida inmediata?',
        opciones: [
          'Cortisol de la corteza suprarrenal',
          'Adrenalina de la medula suprarrenal',
          'Insulina del pancreas',
          'TSH de la hipofisis',
        ],
        correcta: 1,
        explicacion: 'La medula suprarrenal libera adrenalina y noradrenalina, que producen la respuesta rapida de lucha o huida; el cortisol actua de forma mas sostenida.',
      },
      {
        pregunta: 'Que efecto NO corresponde a la insulina?',
        opciones: [
          'Introducir glucosa en las celulas',
          'Estimular el almacenamiento de glucogeno',
          'Aumentar la produccion de cuerpos cetonicos',
          'Favorecer la sintesis de grasa',
        ],
        correcta: 2,
        explicacion: 'La insulina inhibe la produccion de cuerpos cetonicos; su ausencia es la que dispara la cetogenesis en la cetoacidosis.',
      },
      {
        pregunta: 'Que hormona de la hipofisis anterior estimula la liberacion de cortisol?',
        opciones: ['TSH', 'ACTH', 'FSH', 'Prolactina'],
        correcta: 1,
        explicacion: 'La ACTH (hormona adrenocorticotropa) actua sobre la corteza suprarrenal para estimular la produccion de cortisol.',
      },
      {
        pregunta: 'Un paciente con taquicardia, perdida de peso, temblor e intolerancia al calor probablemente tiene:',
        opciones: ['Hipotiroidismo', 'Hipertiroidismo', 'Hipoglucemia', 'Insuficiencia suprarrenal'],
        correcta: 1,
        explicacion: 'El exceso de hormona tiroidea acelera el metabolismo: taquicardia, perdida de peso, temblor e intolerancia al calor son tipicos del hipertiroidismo.',
      },
    ],
  },
  {
    id: 'sistema-digestivo',
    numero: '1.12',
    titulo: 'Sistema Digestivo y Metabolismo',
    icono: '🍽️',
    duracion: '55 min',
    resumen:
      'El sistema digestivo descompone los alimentos, absorbe nutrientes y elimina desechos. El higado es el laboratorio metabolico del cuerpo. Comprenderlo ayuda a entender la hemorragia digestiva, la ictericia y el abdomen agudo.',
    objetivos: [
      'Describir el recorrido del tubo digestivo y la funcion de cada organo.',
      'Explicar la digestion y absorcion de carbohidratos, proteinas y grasas.',
      'Detallar las funciones metabolicas del higado.',
      'Relacionar la anatomia digestiva con urgencias abdominales.',
    ],
    secciones: [
      {
        titulo: 'El tubo digestivo',
        bloques: [
          {
            tipo: 'diagrama',
            clave: 'digestivo',
            titulo: 'Organos del sistema digestivo',
          },
          {
            tipo: 'p',
            texto:
              'El tubo digestivo es un conducto que va de la boca al ano: boca, faringe, esofago, estomago, intestino delgado e intestino grueso. Los organos accesorios (glandulas salivales, higado, vesicula biliar y pancreas) aportan secreciones que ayudan a la digestion.',
          },
          {
            tipo: 'tabla',
            titulo: 'Funcion por segmento',
            headers: ['Organo', 'Funcion principal'],
            filas: [
              ['Boca', 'Masticacion y digestion del almidon (amilasa salival)'],
              ['Estomago', 'Digestion de proteinas con acido y pepsina'],
              ['Intestino delgado', 'Principal sitio de digestion y absorcion de nutrientes'],
              ['Intestino grueso', 'Absorcion de agua y formacion de heces'],
              ['Recto y ano', 'Almacenamiento y eliminacion de heces'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Peristalsis',
            texto:
              'El movimiento del alimento se logra por peristalsis, ondas de contraccion del musculo liso. El control es autonomo: el parasimpatico estimula la digestion y el simpatico la frena.',
          },
        ],
      },
      {
        titulo: 'Digestion y absorcion',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Digestion de nutrientes',
            headers: ['Nutriente', 'Enzimas y lugar', 'Producto final'],
            filas: [
              ['Carbohidratos', 'Amilasa (boca y pancreas)', 'Glucosa y monosacaridos'],
              ['Proteinas', 'Pepsina (estomago), proteasas pancreaticas', 'Aminoacidos'],
              ['Grasas', 'Bilis y lipasa pancreatica', 'Acidos grasos y glicerol'],
            ],
          },
          {
            tipo: 'p',
            texto:
              'La absorcion ocurre sobre todo en el intestino delgado, cuya superficie esta amplificada por pliegues, vellosidades y microvellosidades. La bilis emulsiona las grasas para que la lipasa las digiera; sin bilis, las grasas no se absorben bien y aparece esteatorrea.',
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Vesicula biliar',
            texto:
              'La vesicula almacena y concentra la bilis y la libera al comer grasas. Un calculo que obstruye el conducto produce colico biliar y, si bloquea el flujo, ictericia.',
          },
        ],
      },
      {
        titulo: 'El higado, laboratorio metabolico',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Funciones del higado',
            items: [
              'Metabolismo de carbohidratos: almacena y libera glucosa (glucogeno).',
              'Sintesis de proteinas plasmaticas, incluida la albumina y los factores de coagulacion.',
              'Detoxificacion de farmacos, alcohol y amoniaco (que convierte en urea).',
              'Produccion de bilis para digerir grasas.',
              'Almacenamiento de vitaminas y hierro.',
            ],
          },
          {
            tipo: 'p',
            texto:
              'El higado produce la mayoria de los factores de coagulacion; por eso la insuficiencia hepatica grave causa tendencia al sangrado. Tambien convierte el amoniaco toxico en urea; cuando falla, el amoniaco se acumula y produce encefalopatia hepatica.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Higado y coagulacion',
            texto:
              'En el paciente con enfermedad hepatica avanzada el sangrado es dificil de controlar porque faltan factores de coagulacion. La vitamina K, necesaria para varios de ellos, se absorbe con la grasa y depende de la bilis.',
          },
        ],
      },
      {
        titulo: 'Metabolismo energetico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Tras la absorcion, los nutrientes pasan por la vena porta al higado antes de llegar a la circulacion general. El cuerpo usa la glucosa como combustible principal; cuando se agota, recurre a las grasas y, en ayuno prolongado, a las proteinas. La insulina y el glucagon coordinan estos cambios.',
          },
          {
            tipo: 'lista',
            titulo: 'Estados metabolicos',
            items: [
              'Estado alimentado: la insulina almacena glucosa como glucogeno y grasa.',
              'Ayuno temprano: el glucagon libera glucosa del glucogeno hepatico.',
              'Ayuno prolongado: se queman grasas y se forman cuerpos cetonicos.',
              'Inanicion: se degradan proteinas musculares para obtener energia.',
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Peristalsis', definicion: 'Ondas de contraccion del musculo liso que mueven el alimento por el tubo digestivo.' },
      { termino: 'Bilis', definicion: 'Secrecion hepatica que emulsiona las grasas para su digestion.' },
      { termino: 'Vellosidades', definicion: 'Proyecciones del intestino delgado que amplian la superficie de absorcion.' },
      { termino: 'Vena porta', definicion: 'Vena que lleva la sangre con nutrientes del intestino al higado.' },
      { termino: 'Glucogeno', definicion: 'Forma de almacenamiento de glucosa en el higado y el musculo.' },
      { termino: 'Encefalopatia hepatica', definicion: 'Alteracion neurologica por acumulacion de amoniaco cuando falla el higado.' },
      { termino: 'Esteatorrea', definicion: 'Heces grasas por mala absorcion de grasas, a menudo por falta de bilis.' },
    ],
    flashcards: [
      { frente: 'Cual es el principal sitio de absorcion de nutrientes?', reverso: 'El intestino delgado.' },
      { frente: 'Que enzima del estomago digiere proteinas?', reverso: 'La pepsina.' },
      { frente: 'Que funcion tiene la bilis?', reverso: 'Emulsionar las grasas para que la lipasa las digiera.' },
      { frente: 'Que organo produce la mayoria de los factores de coagulacion?', reverso: 'El higado.' },
      { frente: 'Que ocurre cuando el higado no convierte el amoniaco en urea?', reverso: 'Se acumula amoniaco y aparece encefalopatia hepatica.' },
      { frente: 'Por donde llega la sangre con nutrientes al higado?', reverso: 'Por la vena porta.' },
      { frente: 'Que es la peristalsis?', reverso: 'Ondas de contraccion del musculo liso que mueven el alimento.' },
      { frente: 'Que rama autonoma estimula la digestion?', reverso: 'El parasimpatico.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente con cirrosis avanzada sangra con facilidad. La causa principal es:',
        opciones: [
          'Exceso de plaquetas',
          'El higado produce menos factores de coagulacion',
          'Aumento de la bilis',
          'Exceso de vitamina K',
        ],
        correcta: 1,
        explicacion: 'El higado sintetiza la mayoria de los factores de coagulacion; en la insuficiencia hepatica disminuye su produccion y aparece tendencia al sangrado.',
      },
      {
        pregunta: 'Un paciente con obstruccion del conducto biliar presenta ictericia y heces grasas. Por que aparecen las heces grasas?',
        opciones: [
          'Exceso de bilis en el intestino',
          'Falta de bilis para emulsionar las grasas, que no se absorben',
          'Exceso de lipasa pancreatica',
          'Aumento de la peristalsis',
        ],
        correcta: 1,
        explicacion: 'Sin bilis las grasas no se emulsionan ni se absorben bien y se eliminan en las heces (esteatorrea); la obstruccion biliar tambien causa ictericia.',
      },
      {
        pregunta: 'Un paciente con falla hepatica presenta confusion y somnolencia. El mecanismo mas probable es:',
        opciones: [
          'Acumulacion de glucosa',
          'Acumulacion de amoniaco no convertido en urea (encefalopatia hepatica)',
          'Exceso de albumina',
          'Falta de bilis',
        ],
        correcta: 1,
        explicacion: 'El higado convierte el amoniaco toxico en urea; cuando falla, el amoniaco se acumula y altera el cerebro, produciendo encefalopatia hepatica.',
      },
      {
        pregunta: 'En que organo comienza la digestion quimica del almidon?',
        opciones: ['Estomago', 'Boca, con la amilasa salival', 'Intestino grueso', 'Higado'],
        correcta: 1,
        explicacion: 'La amilasa salival inicia la digestion del almidon en la boca; el pancreas aporta mas amilasa en el intestino delgado.',
      },
      {
        pregunta: 'Durante un ayuno prolongado, de donde obtiene energia el cuerpo principalmente?',
        opciones: [
          'Glucosa de la comida',
          'Grasas, formando cuerpos cetonicos',
          'Solo agua',
          'Bilis',
        ],
        correcta: 1,
        explicacion: 'Tras agotar el glucogeno, el cuerpo quema grasas y produce cuerpos cetonicos como combustible alternativo; en inanicion extrema degrada proteinas.',
      },
      {
        pregunta: 'Cual es la funcion principal del intestino grueso?',
        opciones: [
          'Digerir proteinas',
          'Absorber agua y formar heces',
          'Producir bilis',
          'Absorber la mayoria de los nutrientes',
        ],
        correcta: 1,
        explicacion: 'El intestino grueso absorbe agua y electrolitos del material no digerido y compacta las heces; la mayor parte de los nutrientes ya se absorbio en el delgado.',
      },
      {
        pregunta: 'Por que la sangre del intestino pasa primero por el higado?',
        opciones: [
          'Para oxigenarse',
          'Porque la vena porta lleva los nutrientes al higado para su procesamiento',
          'Para filtrarse en el rinon',
          'Para llegar mas rapido al corazon',
        ],
        correcta: 1,
        explicacion: 'La vena porta conduce la sangre rica en nutrientes desde el intestino al higado, que la procesa, almacena y detoxifica antes de enviarla a la circulacion general.',
      },
    ],
  },
]
