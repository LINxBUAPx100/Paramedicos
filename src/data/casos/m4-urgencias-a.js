// ============================================================
//  Casos del Módulo 4 · Urgencias médicas (lote A) — BORRADORES
// ------------------------------------------------------------
//  Redactados el 05-10-2026 a petición del usuario. ESTADO `borrador`: el
//  alumno NO los ve hasta que un docente los valide (casosParaElAlumno solo
//  deja pasar `validado` y `publicado`); el personal sí, para revisarlos.
//
//  Regla de redacción, la misma de la pasada v2: cada decisión, consecuencia
//  y cifra sale de la prosa que la lección citada YA enseña y cita. No hay
//  ningún dato clínico que no esté en esa lección. Si un docente corrige la
//  lección, el caso se revisa con ella.
//
//  Las dosis del Módulo 4 están bloqueadas a propósito (CLAUDE.md §9.1): los
//  casos no nombran dosis, concentración ni pauta; donde la lección remite al
//  protocolo del servicio y a la dirección médica, el caso hace lo mismo. Los
//  signos del monitor son ILUSTRATIVOS: ninguna lección del lote publica
//  umbrales de saturación, de presión ni de glucemia, y el caso tampoco.
//
//  EXPLORACIÓN ACTIVA (06-10-2026): los textos de los nodos solo describen la
//  escena a simple vista. Signos, respuesta, habla y lo que cuentan paciente y
//  testigos se obtienen explorando (src/lib/exploracion.js): `historia` y
//  `testigos` a nivel de caso o de nodo, y `signos` que evolucionan con cada
//  decisión. La FR va como texto donde la lección necesita que se oiga cómo
//  respira (sibilancias, tórax silencioso, gorgoteo).
//
//  Lecciones que sostienen cada caso:
//    m4-resp-asma          → src/data/contenido/m4-respiratorias.js
//    m4-card-sca           → src/data/contenido/m4-cardiologicas.js
//    m4-neu-evc            → src/data/contenido/m4-neurologicas.js
//    m4-met-complicaciones → src/data/contenido/m4-metabolicas.js
// ============================================================

const GINA_2026 = {
  nombre: 'Global Initiative for Asthma. GINA 2026 Global Strategy for Asthma Management and '
    + 'Prevention.',
  nota: 'Misma fuente que la lección de crisis asmática: reconocimiento de gravedad y prioridades. '
    + 'Capítulo y tabla exactos pendientes, como en la lección; no sostiene ninguna cifra.',
}
const NOM_034_DOTACION = {
  nombre: 'DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): '
    + 'Apéndices Normativos A.4, B.4, C.3 y D.1.',
  nota: 'Misma fuente que la lección de crisis asmática: salbutamol en aerosol en la dotación del '
    + 'numeral B.4.4.1. Es una norma de dotación: no enuncia indicación, población, dosis ni vía.',
}
const AHA_ACS_2025 = {
  nombre: '2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute '
    + 'Coronary Syndromes.',
  nota: 'Misma fuente que la lección de síndrome coronario agudo. Sección y tabla exactas pendientes, '
    + 'como en la lección; no sostiene ninguna cifra.',
}
const AHA_STROKE_2026 = {
  nombre: 'AHA/ASA 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke.',
  nota: 'Misma fuente que la lección de ictus. Sección, ventanas de tiempo y objetivos de presión '
    + 'pendientes, como en la lección; el caso no publica ninguna ventana ni escala concreta.',
}
const AHA_ICH_2022 = {
  nombre: 'AHA/ASA 2022 Guideline for the Management of Patients With Spontaneous Intracerebral '
    + 'Hemorrhage.',
  nota: 'Misma fuente que la lección de ictus: se cita porque el ictus hemorrágico no se distingue '
    + 'del isquémico sin imagen.',
}
const ADA_2026 = {
  nombre: 'American Diabetes Association. Standards of Care in Diabetes, 2026.',
  nota: 'Misma fuente que la lección de complicaciones de la diabetes. Sección y tabla de niveles de '
    + 'hipoglucemia pendientes, como en la lección; el caso no publica ningún umbral.',
}
const BIBIANO_HIPOGLUCEMIA = {
  nombre: 'Bibiano Guillén C. y cols. Manual de urgencias, 3.ª ed., 2018. Capítulo 114, '
    + '«Hipoglucemia», p. 1014.',
  nota: 'Misma fuente que la lección de complicaciones de la diabetes. Apoyo hospitalario para la '
    + 'presentación clínica; no se usa para conducta prehospitalaria ni para dosis.',
}

export default [
  // ----------------------------------------------------------
  //  Crisis asmática del adulto
  // ----------------------------------------------------------
  {
    id: 'caso-m4-crisis-asmatica',
    titulo: 'No puede terminar la frase',
    resumen: 'Una mujer con asma empeora en una casa con humo. Reconocer la gravedad por el habla, el alerta y el esfuerzo, y no por las sibilancias.',
    estado: 'borrador',
    temas: ['m4-resp-asma'],
    fuentes: [GINA_2026, NOM_034_DOTACION],
    rol: 'tum',
    paciente: 'adulto',
    signos: { avdi: 'A', fc: 118, fr: '30/min, sibilancias audibles', spo2: 91, ta: '134/84', ritmo: 'taquicardia sinusal', piel: 'sudorosa' },
    historia: 'Me… ahogo… El humo… Llevo… días… peor…',
    testigos: 'Es mi hermana, tiene asma. Lleva días usando el inhalador más de lo normal, y hoy, con el humo de la basura, se puso peor.',
    // VERSIONES (lib/variacion.js). Las opciones nombran el humo, el
    // antecedente de intubación y a una paciente: las tres versiones los
    // conservan. Cambian quién la acompaña, de dónde sale el humo y la escena.
    variantes: [
      {
        etiqueta: 'Su hermana, humo de basura',
        historia: 'Me… ahogo… Ese humo… Ya llevo… días… mal…',
        testigos: 'Es mi hermana, tiene asma. Desde hace días usa el inhalador mucho más de lo normal, y hoy, con el humo de la basura que queman en el patio, empeoró.',
        nodos: {
          n1: { texto: 'Te despachan a una casa porque una mujer se ahoga. Al entrar huele a humo: en el patio están quemando basura. Una mujer de unos treinta y cinco años está sentada al borde de la cama, inclinada hacia adelante y con las manos sobre las rodillas. Sostiene su inhalador, y su hermana está junto a ella. ¿Qué haces primero?' },
        },
      },
      {
        etiqueta: 'Su compañera de cuarto, humo de leña',
        signos: { fc: 124, fr: '32/min, sibilancias audibles', spo2: 90, ta: '128/80' },
        historia: 'No… aguanto… El humo… Toda la semana… así…',
        testigos: 'Es mi compañera de cuarto, tiene asma. Toda la semana ha usado el inhalador a cada rato, y hoy la vecina prendió el fogón de leña y el humo se metió al cuarto.',
        nodos: {
          n1: { texto: 'Te despachan a una vecindad: una estudiante avisa que su compañera de cuarto se ahoga. El pasillo está lleno de humo de leña que sale del fogón de la vecina. Una mujer de unos veinticuatro años está sentada en una silla junto a la ventana, inclinada hacia adelante, con los antebrazos apoyados en el respaldo de otra silla. Tiene el inhalador en la mano y su compañera está a su lado. ¿Qué haces primero?' },
          n3: { texto: 'Su compañera de cuarto sigue a tu lado, pendiente de lo que haces. ¿Qué más preguntas antes de seguir?' },
          n4: { testigos: 'Esta semana usa el inhalador más que nunca. Y me contó que el año pasado la intubaron en terapia intensiva por el asma.' },
        },
      },
      {
        etiqueta: 'Su hijo, incendio de pastizal',
        signos: { fc: 112, fr: '28/min, sibilancias audibles', spo2: 92, ta: '142/88' },
        historia: 'Me… ahogo… Con este humo… Ya venía… mal…',
        testigos: 'Es mi mamá, tiene asma desde joven. Desde hace días usaba el inhalador a cada rato, y con el humo del incendio se puso peor.',
        nodos: {
          n1: { texto: 'Te despachan a una casa en las afueras: un joven llamó porque su madre se ahoga. Hay humo en el aire; arde un pastizal a unas calles y el viento lo empuja hacia las casas. Una mujer de unos cincuenta años está sentada en una silla del comedor, inclinada hacia adelante, con los antebrazos sobre la mesa. Tiene el inhalador junto a ella y su hijo no se le despega. ¿Qué haces primero?' },
          n3: { texto: 'Su hijo sigue a tu lado, pendiente de lo que haces. ¿Qué más preguntas antes de seguir?' },
          n4: { testigos: 'Usa el inhalador mucho más de lo normal. Y el año pasado estuvo intubada en terapia intensiva por el asma.' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Te despachan a una casa: quien llamó dice que una mujer se ahoga. Al entrar notas olor a humo: en el patio queman basura. Una mujer de unos treinta y cinco años está sentada en el borde de la cama, inclinada hacia adelante, con las manos apoyadas en las rodillas. Tiene su inhalador en la mano y su hermana está a su lado. ¿Qué haces primero?',
        opciones: [
          { signos: { fr: '28/min, sibilancias audibles' }, texto: 'Compruebo que la escena es segura y la saco del ambiente con humo, sin obligarla a caminar más de lo necesario.', va: 'n2', tipo: 'correcta', retro: 'La primera prioridad es retirar al paciente del desencadenante cuando es identificable y puede hacerse con seguridad. El humo es uno de los desencadenantes que la lección enumera.', tema: 'm4-resp-asma' },
          { signos: { fr: '32/min, sibilancias audibles', spo2: 89 }, texto: 'Empiezo la valoración ahí mismo, en la habitación; ya la sacaremos al subir a la ambulancia.', va: 'n2', tipo: 'aceptable', retro: 'La valoración es necesaria, pero mientras siga expuesta al humo el desencadenante sigue actuando. Retirarla de él, con seguridad, es la primera prioridad.', tema: 'm4-resp-asma' },
          { signos: { fr: '34/min, sibilancias audibles', spo2: 88, fc: 126 }, texto: 'La acuesto en la camilla para monitorizarla con comodidad antes de moverla.', va: 'n2_decubito', tipo: 'riesgo', retro: 'No se fuerza el decúbito: se permite la posición en la que respira mejor. No tolerar acostarse es, además, un signo de crisis grave.', tema: 'm4-resp-asma' },
        ],
      },
      n2_decubito: {
        texto: 'En cuanto la acuestas se incorpora angustiada y empuja la camilla con los brazos para sentarse. Con lo que has explorado, ¿qué haces?',
        historia: 'No… puedo… así… acostada…',
        opciones: [
          { signos: { fr: '30/min, sibilancias audibles', spo2: 90, fc: 120 }, texto: 'La dejo sentada e inclinada como ella prefiera y la retiro del humo.', va: 'n2', tipo: 'aceptable', retro: 'Rectificas: se permite la posición en la que respira mejor. Que no tolere el decúbito ya te informa de la gravedad.', tema: 'm4-resp-asma' },
          { signos: { fr: '36/min, sibilancias audibles', spo2: 86, fc: 132, avdi: 'A', glasgow: 'O4V4M6' }, texto: 'Le pido que se calme y la sujeto acostada para colocar los electrodos.', va: 'n4_agitada', tipo: 'riesgo', retro: 'Forzar el decúbito empeora el trabajo respiratorio. Estos pacientes se sientan inclinados hacia adelante porque así respiran mejor.', tema: 'm4-resp-asma' },
        ],
      },
      n2: {
        texto: 'Ya fuera del humo, sentada e inclinada hacia adelante como ella quiere. Usa los músculos del cuello y se le hunden los espacios entre las costillas con cada inspiración. Con lo que has explorado, ¿qué gravedad le atribuyes?',
        opciones: [
          { signos: { fc: 120 }, texto: 'Habla con palabras sueltas, usa músculos accesorios con tiraje y no tolera acostarse: es una crisis grave.', va: 'n3', tipo: 'correcta', retro: 'La gravedad se juzga por la capacidad de hablar, el estado de alerta y el trabajo respiratorio. Palabras sueltas, tiraje y no tolerar el decúbito apuntan a una crisis grave.', tema: 'm4-resp-asma' },
          { signos: { fc: 124, spo2: 89 }, texto: 'Se oyen bien las sibilancias, así que mueve aire: es una crisis leve.', va: 'n3', tipo: 'riesgo', retro: 'Juzgar la gravedad por la intensidad de las sibilancias es la trampa clásica del cuadro. Lo que cuenta es el habla, el alerta y el esfuerzo.', tema: 'm4-resp-asma' },
        ],
      },
      n3: {
        texto: 'La hermana sigue a tu lado, pendiente de lo que haces. ¿Qué más preguntas antes de seguir?',
        opciones: [
          { signos: { spo2: 90, fc: 122 }, texto: 'Si alguna vez la intubaron o estuvo en cuidados intensivos por asma, y si ha ido a urgencias en el último año.', va: 'n4', tipo: 'correcta', retro: 'El antecedente de soporte ventilatorio o de ingreso en cuidados intensivos cambia el nivel de alerta desde el primer minuto. Es una pregunta breve y la familia suele responderla con precisión.', tema: 'm4-resp-asma' },
          { signos: { spo2: 89, fc: 124 }, texto: 'Nada más por ahora: la historia la completará el hospital.', va: 'n4', tipo: 'aceptable', retro: 'La historia previa forma parte de la valoración: separa a los pacientes que toleran una crisis de los que no. El uso creciente del inhalador de rescate ya era una señal de alarma.', tema: 'm4-resp-asma' },
        ],
      },
      n4: {
        texto: 'Tu unidad es de urgencias básicas y lleva salbutamol en aerosol. Con lo que has explorado y lo que te han contado, ¿qué haces con el tratamiento?',
        testigos: 'Lleva días usando el inhalador más de lo normal. Y el año pasado estuvo intubada en terapia intensiva por el asma.',
        opciones: [
          { signos: { spo2: 93, fr: '28/min, sibilancias audibles' }, texto: 'Inicio oxígeno según el protocolo, titulado a la respuesta, y el broncodilatador inhalado solo con el producto, el dispositivo y la pauta que autoriza mi protocolo; reviso cómo usa su propio inhalador.', va: 'n5', tipo: 'correcta', retro: 'Son las prioridades de la lección: oxígeno según protocolo y titulado, broncodilatador cuando el protocolo lo indique con producto, dispositivo y técnica autorizados, y comprobar la técnica del inhalador propio.', tema: 'm4-resp-asma' },
          { signos: { spo2: 92, fc: 128 }, texto: 'Como la NOM-034 obliga a llevar salbutamol, se lo administro con la pauta que recuerdo de otro curso.', va: 'n5', tipo: 'riesgo', retro: 'Que el fármaco esté a bordo responde a qué debe haber en la unidad, no a quién, cuánto ni cómo darlo. Eso lo dan la guía vigente, la Información para Prescribir y el protocolo con su dirección médica.', tema: 'm4-resp-asma' },
        ],
      },
      n4_agitada: {
        texto: 'Forcejea en la camilla y se arranca los electrodos. Tu compañero propone sedarla para que deje de pelear y poder trabajar. Con lo que has explorado, ¿qué haces?',
        historia: '¡Suélteme!… ¡No… respiro!…',
        opciones: [
          { signos: { fr: '32/min, sibilancias audibles', spo2: 88, avdi: 'A', glasgow: 'O4V5M6' }, texto: 'No: la dejo sentarse como quiera, la retiro del humo y entiendo la agitación como un signo de gravedad.', va: 'n3', tipo: 'aceptable', retro: 'La agitación es un signo de hipoxia y de gravedad. No se seda para calmarla; se corrige lo que la empeora y se sigue valorando.', tema: 'm4-resp-asma' },
          { signos: { avdi: 'V', glasgow: 'O3V3M5', fr: '12/min, lenta y superficial', spo2: 80, fc: 138, piel: 'cianótica' }, texto: 'Estoy de acuerdo: que la seden para poder monitorizarla.', va: 'n_sedada', tipo: 'riesgo', retro: 'Sedar a un paciente con crisis asmática suprime un signo de hipoxia sin resolver la causa y puede precipitar el fallo respiratorio.', tema: 'm4-resp-asma' },
        ],
      },
      n_sedada: {
        texto: 'Tras la sedación deja de pelear y se queda quieta en la camilla. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { spo2: 84, fr: 'asistida' }, texto: 'Reconozco que la ventilación es insuficiente: doy soporte ventilatorio conforme a mi alcance y equipo, y salgo con prealerta.', va: 'fin_mal', tipo: 'aceptable', retro: 'Ante una ventilación insuficiente procede el soporte ventilatorio conforme al alcance y al equipo autorizados, con traslado y prealerta. Llega tarde: el fallo respiratorio se precipitó.', tema: 'm4-resp-asma' },
          { signos: { spo2: 74, fr: '6/min, superficial', fc: 50 }, texto: 'La veo tranquila: la traslado sin prisa vigilando de vez en cuando.', va: 'fin_mal', tipo: 'riesgo', retro: 'La disminución del esfuerzo respiratorio sin mejoría y la alteración del alerta definen una crisis potencialmente mortal, no una mejoría.', tema: 'm4-resp-asma' },
        ],
      },
      n5: {
        signos: { glasgow: 'O4V4M6' },
        texto: 'Ya en la ambulancia, la paciente está cada vez más inquieta, se quita la mascarilla y no para de moverse. Tu compañero propone sedarla para que coopere. Con lo que has explorado, ¿qué haces?',
        historia: '¡Quíteme… esto!… Me… ahogo…',
        opciones: [
          { signos: { fr: '24/min, sibilancias débiles', spo2: 88, fc: 130 }, texto: 'No se seda: la agitación es un signo de hipoxia. La tranquilizo, reevalúo el habla, el alerta y el esfuerzo, y vigilo de cerca.', va: 'n6', tipo: 'correcta', retro: 'La agitación figura entre los signos de gravedad; suprimirla puede precipitar el fallo respiratorio. Lo que procede es reevaluar tras cada intervención.', tema: 'm4-resp-asma' },
          { signos: { avdi: 'V', glasgow: 'O3V3M5', fr: '12/min, lenta y superficial', spo2: 80, fc: 136, piel: 'cianótica' }, texto: 'De acuerdo, que la seden; así se adaptará mejor a la mascarilla.', va: 'n_sedada', tipo: 'riesgo', retro: 'Sedar a un paciente asmático agitado elimina el signo sin resolver la causa y puede precipitar el fallo respiratorio.', tema: 'm4-resp-asma' },
        ],
      },
      n6: {
        signos: { avdi: 'V', glasgow: 'O3V2M6', fr: '14/min, superficial; casi no se oyen sibilancias', spo2: 86, fc: 132, piel: 'pálida, sudorosa' },
        texto: 'A los pocos minutos deja de moverse y se queda quieta, recostada contra el respaldo. Tu compañero te dice que la ve más tranquila y que debe de estar mejorando. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fr: 'asistida', spo2: 90 }, texto: 'No es mejoría: es un tórax silencioso con somnolencia, una crisis potencialmente mortal. Doy soporte ventilatorio conforme a mi alcance y equipo y aviso al hospital.', va: 'n7', tipo: 'correcta', retro: 'Que las sibilancias disminuyan en un paciente que empeora indica que apenas se moviliza aire. Junto con la somnolencia y la incapacidad para hablar, describe una crisis potencialmente mortal.', tema: 'm4-resp-asma' },
          { signos: { fr: '8/min, superficial, sin sibilancias', spo2: 76, fc: 54, piel: 'cianótica' }, texto: 'Tiene razón: espacio la vigilancia y la dejo descansar.', va: 'fin_mal', tipo: 'riesgo', retro: 'El tórax silencioso es el hallazgo que más se malinterpreta de la unidad: no indica mejoría, sino que apenas entra aire.', tema: 'm4-resp-asma' },
        ],
      },
      n7: {
        texto: 'El hospital contesta la prealerta. ¿Qué transmites y qué dejas registrado?',
        opciones: [
          { texto: 'Crisis potencialmente mortal con tórax silencioso y somnolencia, antecedente de intubación, lo administrado con su hora y la respuesta; todo queda anotado con hora.', va: 'fin_bien', tipo: 'correcta', retro: 'El traslado con prealerta ante cualquier signo de crisis potencialmente mortal y el registro con hora de los hallazgos, de lo administrado y de la respuesta cierran las prioridades de la lección.', tema: 'm4-resp-asma' },
          { texto: '«Paciente asmática, ya no tiene sibilancias»; el resto lo cuento al llegar.', va: 'fin_bien', tipo: 'aceptable', retro: 'Llegas, pero la prealerta transmite una idea equivocada: sin sibilancias suena a mejoría. Lo que el hospital necesita saber es que hay un tórax silencioso con somnolencia y antecedente de riesgo vital.', tema: 'm4-resp-asma' },
        ],
      },
      fin_bien: {
        signos: { spo2: 91, fc: 124 },
        fin: true,
        desenlace: 'favorable',
        texto: 'El equipo hospitalario la recibe preparado. Reconociste la gravedad por el habla, el alerta y el esfuerzo, no por las sibilancias; no sedaste la agitación y diste soporte ventilatorio cuando la ventilación dejó de bastar.',
      },
      fin_mal: {
        signos: { avdi: 'I', fr: 4, spo2: 68, fc: 44, piel: 'cianótica' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'La paciente llega en fallo respiratorio. La agitación se suprimió o el tórax silencioso se tomó por mejoría, y los signos de crisis potencialmente mortal no cambiaron la conducta a tiempo.',
      },
    },
  },

  // ----------------------------------------------------------
  //  Síndrome coronario agudo con presentación no clásica
  // ----------------------------------------------------------
  {
    id: 'caso-m4-sindrome-coronario',
    titulo: 'Le falta el aire y no le duele el pecho',
    resumen: 'Una mujer mayor con disnea, náusea y sudoración. Sospechar el síndrome coronario sin estereotipos, registrar pronto, tener el desfibrilador cerca y prealertar.',
    estado: 'borrador',
    temas: ['m4-card-sca'],
    fuentes: [AHA_ACS_2025],
    rol: 'tum',
    paciente: 'adulto',
    signos: { avdi: 'A', fc: 98, fr: 22, spo2: 96, ta: '146/90', ritmo: 'sinusal', piel: 'pálida, sudorosa' },
    historia: 'Desde hace un rato me falta el aire y tengo náusea. Estoy empapada en sudor. ¿Dolor de pecho? Solo una molestia, nada importante.',
    testigos: 'Yo creo que son nervios, se pone así. Empezó hace rato.',
    // VERSIONES. Las opciones fijan a una mujer de 68 años acompañada por su
    // hija: eso no cambia. Cambian la escena, el traslado y la hora de inicio.
    variantes: [
      {
        etiqueta: 'En el sillón de la sala',
        historia: 'Hace un rato que me falta el aire y tengo náusea. Estoy toda sudada. ¿Dolor de pecho? Una molestia nada más, no es nada.',
        testigos: 'Yo pienso que son los nervios, a veces se pone así. Ya lleva rato.',
        nodos: {
          n1: { texto: 'Te despachan a una casa por malestar general. Te abre su hija. En la sala, una mujer de 68 años está sentada en el sillón, con una mano sobre el abdomen. ¿Cómo lo enfocas?' },
        },
      },
      {
        etiqueta: 'Tendiendo ropa en la azotea',
        signos: { fc: 104, spo2: 95, ta: '152/92' },
        historia: 'Desde que subí con la ropa me falta el aire y tengo ganas de vomitar. Estoy sudando frío. ¿Dolor de pecho? Una molestia, nada importante.',
        testigos: 'Yo creo que se cansó de subir con la ropa, se pone así. Empezó hace rato.',
        nodos: {
          n1: { texto: 'Te despachan a una casa por malestar general. Su hija te recibe y te sube a la azotea: una mujer de 68 años está sentada en un banco junto a los tendederos, con una cubeta de ropa mojada a los pies y una mano apoyada en el abdomen. ¿Cómo lo enfocas?' },
          n2: { texto: 'Tienes el monitor-desfibrilador a tu lado, sobre el piso de la azotea. Con lo que has explorado, ¿qué haces ahora con el monitor?' },
          n3: { testigos: '¿Ve? Es muscular, de cargar las cubetas. Yo le dije que era cansancio.' },
          n6: { texto: 'Hay que llevarla a la ambulancia, que está en la calle, dos pisos abajo por una escalera angosta. La paciente apoya las manos en el banco para levantarse. ¿Cómo la movilizas, y dónde va el desfibrilador?', historia: 'Yo bajo sola, no se preocupe.' },
          n7: { testigos: 'Empezó hace rato… Si lo pienso bien, fue al subir la segunda cubeta, como a las diez y media.' },
        },
      },
      {
        etiqueta: 'En su puesto del mercado',
        signos: { fc: 96, spo2: 97, ta: '140/88' },
        historia: 'Desde la mañana me falta el aire y tengo náusea. Estoy empapada. ¿Dolor de pecho? Solo una molestia, nada importante.',
        testigos: 'Yo creo que es el cansancio, se pone así. Empezó hace rato.',
        nodos: {
          n1: { texto: 'Te despachan a un mercado municipal por malestar general. La hija, que atiende con ella un puesto de fruta, te hace señas. Una mujer de 68 años está sentada en una caja de madera detrás del mostrador, con una mano apoyada en el abdomen. Algunos clientes se detienen a mirar. ¿Cómo lo enfocas?' },
          n2: { texto: 'Tienes el monitor-desfibrilador a tu lado, en el pasillo del mercado. Con lo que has explorado, ¿qué haces ahora con el monitor?' },
          n3: { testigos: '¿Ve? Es muscular, de cargar cajas. Yo le dije que era cansancio.' },
          n6: { texto: 'Hay que llevarla a la ambulancia, que quedó en la entrada del mercado, al final del pasillo. La paciente se apoya en el mostrador para levantarse. ¿Cómo la movilizas, y dónde va el desfibrilador?', historia: 'Yo llego caminando, no se preocupe.' },
          n7: { testigos: 'Empezó hace rato… Ahora que lo pienso, fue mientras descargábamos las cajas, como a las siete y diez.' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Te despachan a una casa por malestar general. Su hija te abre la puerta. Una mujer de 68 años está sentada en el sillón de la sala, con una mano apoyada en el abdomen. ¿Cómo lo enfocas?',
        opciones: [
          { signos: { fc: 100 }, texto: 'Lo considero dentro del espectro coronario: la disnea, la náusea y la sudoración también lo presentan. Empiezo por la valoración primaria y la perfusión.', va: 'n2', tipo: 'correcta', retro: 'La ausencia de la presentación clásica no reduce la sospecha. La valoración primaria —vía aérea, ventilación y circulación— va antes de centrarse en el síntoma.', tema: 'm4-card-sca' },
          { signos: { fc: 104 }, texto: 'Sin dolor torácico típico no parece del corazón; probablemente es ansiedad o algo digestivo.', va: 'n1_retraso', tipo: 'riesgo', retro: 'Es el problema del estereotipo: lleva a no considerar el cuadro en quien no encaja en la imagen esperada. Disnea, náusea y sudoración dominantes también corresponden a este cuadro.', tema: 'm4-card-sca' },
        ],
      },
      n1_retraso: {
        signos: { fc: 108, ta: '138/86', piel: 'pálida, fría, sudorosa' },
        texto: 'Le sugieres que se calme y respire despacio. La paciente te sujeta del brazo, inquieta. Con lo que has explorado, ¿qué haces?',
        historia: 'Nunca me había sentido así. Siento que algo grave me está pasando.',
        opciones: [
          { texto: 'Reconsidero: esa sensación de gravedad también pertenece al cuadro. Hago la valoración primaria y busco el registro eléctrico.', va: 'n2', tipo: 'aceptable', retro: 'La sensación de gravedad referida por el paciente es una de las presentaciones del síndrome coronario. Rectificas, aunque con minutos perdidos en un cuadro que se organiza alrededor del reloj.', tema: 'm4-card-sca' },
          { texto: 'Insisto en que respire despacio y espero a ver si se le pasa antes de decidir el traslado.', va: 'fin_mal', tipo: 'riesgo', retro: 'El músculo sin flujo se pierde progresivamente mientras la obstrucción persiste. Esperar a que se pase es perder el tiempo que la lección dice que no se recupera.', tema: 'm4-card-sca' },
        ],
      },
      n2: {
        texto: 'Tienes el monitor-desfibrilador a tu lado, en el suelo de la sala. Con lo que has explorado, ¿qué haces ahora con el monitor?',
        opciones: [
          { signos: { ritmo: 'sinusal; registro de 12 derivaciones sin alteraciones evidentes', fc: 102 }, texto: 'Obtengo el registro de doce derivaciones lo antes posible conforme al protocolo, la dejo monitorizada y con el desfibrilador junto a ella.', va: 'n3', tipo: 'correcta', retro: 'El registro eléctrico temprano y la monitorización continua con desfibrilador disponible son pasos de la evaluación. El registro temprano es, con la prealerta, la aportación decisiva.', tema: 'm4-card-sca' },
          { signos: { ritmo: 'sinusal (monitor de 3 derivaciones)', fc: 104 }, texto: 'Le pongo el monitor de tres derivaciones; el electrocardiograma completo se lo harán en el hospital.', va: 'n3', tipo: 'riesgo', retro: 'La lección pide el registro de doce derivaciones lo antes posible: es lo que, junto con la prealerta, cambia el desenlace.', tema: 'm4-card-sca' },
        ],
      },
      n3: {
        texto: 'Al palparle el tórax, la paciente hace un gesto de molestia. La hija se acerca a mirar. Con lo que has explorado, ¿qué haces?',
        historia: 'Me molesta un poco cuando me aprieta ahí.',
        testigos: '¿Ve? Es muscular. Yo le dije que eran nervios.',
        opciones: [
          { signos: { fc: 100 }, texto: 'Ninguna de las dos cosas descarta un síndrome coronario: mantengo la sospecha y repito el registro conforme al protocolo.', va: 'n4', tipo: 'correcta', retro: 'Descartar el cuadro porque el dolor se reproduce a la palpación o porque el primer registro es normal es uno de los tres razonamientos que la lección señala como dañinos.', tema: 'm4-card-sca' },
          { texto: 'Con el registro normal y el dolor a la palpación, lo descarto y la dejo en casa con recomendaciones.', va: 'fin_mal', tipo: 'riesgo', retro: 'Ni el registro normal ni la reproducción a la palpación excluyen un síndrome coronario. Descartarlo así es un razonamiento que hace daño.', tema: 'm4-card-sca' },
        ],
      },
      n4: {
        texto: 'Tu compañero saca la mascarilla y se dispone a ponerle oxígeno, porque a todo dolor torácico se le pone. Con lo que has explorado, ¿qué decides?',
        opciones: [
          { signos: { fc: 98 }, texto: 'Oxígeno solo si existe indicación conforme al protocolo; reviso si la hay en lugar de ponerlo de rutina.', va: 'n5', tipo: 'correcta', retro: 'En este cuadro el oxígeno se administra únicamente ante indicación conforme al protocolo, no de forma sistemática.', tema: 'm4-card-sca' },
          { signos: { spo2: 99 }, texto: 'Se lo pongo por si acaso: daño no le hará.', va: 'n5', tipo: 'riesgo', retro: 'Administrar oxígeno de rutina es uno de los tres razonamientos que hacen daño: solo se administra ante indicación.', tema: 'm4-card-sca' },
        ],
      },
      n5: {
        texto: 'Tu compañero propone darle la secuencia de siempre de medicamentos para el dolor torácico, sin preguntar nada más. ¿Qué haces?',
        opciones: [
          { texto: 'Pregunto alergias, antecedentes de sangrado, tratamiento habitual y si tomó algo antes de llamar. Cualquier medicamento, solo según la guía de la indicación, la Información para Prescribir y el protocolo del servicio.', va: 'n6', tipo: 'correcta', retro: 'Aplicar una secuencia memorizada como si fuera universal hace daño: cada componente tiene indicación y contraindicaciones. Alergias y antecedentes de sangrado condicionan las decisiones posteriores.', tema: 'm4-card-sca' },
          { texto: 'Le doy la secuencia completa; en el dolor torácico siempre se usa la misma.', va: 'n6', tipo: 'riesgo', retro: 'No hay secuencia universal: no todos los componentes proceden en todos los pacientes. La medicación se rige por la guía, la Información para Prescribir y el protocolo.', tema: 'm4-card-sca' },
        ],
      },
      n6: {
        signos: { fc: 104, ta: '138/86' },
        texto: 'Hay que llevarla a la ambulancia, que está a media cuadra. La paciente apoya las manos en los brazos del sillón para levantarse. ¿Cómo la movilizas, y dónde va el desfibrilador?',
        historia: 'Yo puedo caminar, no se preocupe.',
        opciones: [
          { signos: { fc: 100, ta: '140/88' }, texto: 'La llevo en camilla o silla, sin que haga esfuerzo, con el monitor puesto y el desfibrilador junto a ella todo el trayecto.', va: 'n7', tipo: 'correcta', retro: 'Se busca reposo y se evita el esfuerzo del propio paciente al movilizarlo. El desfibrilador se mantiene junto a ella aunque hable, porque la ventana de riesgo arrítmico está abierta.', tema: 'm4-card-sca' },
          { signos: { fc: 116, ta: '128/80', piel: 'pálida, fría, sudorosa' }, texto: 'La dejo caminar despacio; como está hablando y estable, guardo el desfibrilador en la unidad.', va: 'n7_sin_desfib', tipo: 'riesgo', retro: 'Hacerla caminar es un esfuerzo que la lección pide evitar. Y el desfibrilador no se aleja de un paciente que habla: la arritmia temida puede aparecer sin aviso.', tema: 'm4-card-sca' },
        ],
      },
      n7_sin_desfib: {
        signos: { fc: 122, ritmo: 'extrasístoles frecuentes' },
        texto: 'Al subir a la ambulancia, la paciente se tambalea y se sujeta de la puerta. El desfibrilador quedó guardado en el compartimento trasero. Con lo que has explorado, ¿qué haces?',
        historia: 'Me estoy mareando…',
        opciones: [
          { signos: { fc: 110 }, texto: 'Lo saco de inmediato, lo coloco junto a ella y la acuesto en reposo.', va: 'n7', tipo: 'aceptable', retro: 'Rectificas a tiempo. La ventana de riesgo estaba abierta desde el principio: por eso el equipo se acerca aunque el paciente esté consciente y estable.', tema: 'm4-card-sca' },
          { signos: { avdi: 'I', fc: 'sin pulso', ritmo: 'arritmia grave', piel: 'gris' }, texto: 'Espero a ver si el ritmo se normaliza antes de mover el equipo.', va: 'fin_mal', tipo: 'riesgo', retro: 'La complicación más temida de las primeras horas es una arritmia que aparece sin aviso; el desfibrilador debía estar ya junto a la paciente.', tema: 'm4-card-sca' },
        ],
      },
      n7: {
        texto: 'Ya en camino, preparas la prealerta. La hija viaja contigo en la cabina. ¿Qué transmites?',
        testigos: 'Empezó hace rato… Si lo pienso bien, fue justo al terminar de comer, a las tres y cuarto.',
        opciones: [
          { signos: { fc: 96 }, texto: 'Preciso la hora exacta de inicio con la hija, transmito la sospecha de síndrome coronario con presentación no clásica, el registro conforme al procedimiento local y cómo evolucionó la perfusión.', va: 'n8', tipo: 'correcta', retro: 'La hora exacta de inicio y la trayectoria durante el traslado son información que el hospital no podrá reconstruir. La prealerta y la transmisión del registro siguen el procedimiento local.', tema: 'm4-card-sca' },
          { signos: { fc: 102 }, texto: '«Mujer de 68 años con disnea desde hace rato»; los detalles los doy al llegar.', va: 'n8', tipo: 'aceptable', retro: 'Prealertas, pero sin la hora exacta de inicio ni la sospecha del cuadro. En un cuadro que se organiza alrededor del reloj, esa cronología es la aportación insustituible del equipo.', tema: 'm4-card-sca' },
        ],
      },
      n8: {
        texto: '¿A qué hospital la llevas?',
        opciones: [
          { texto: 'Al que indiquen el protocolo del servicio y la regulación médica según la capacidad resolutiva disponible.', va: 'fin_bien', tipo: 'correcta', retro: 'El destino, la prealerta y sus criterios los determinan el protocolo, la regulación médica y la capacidad resolutiva disponible. Las decisiones de reperfusión pertenecen al hospital.', tema: 'm4-card-sca' },
          { texto: 'Al que a mí me parece mejor, sin consultar a la regulación.', va: 'fin_bien', tipo: 'aceptable', retro: 'Llegas a un hospital, pero el destino no lo fija el criterio personal: lo fijan el protocolo, la regulación médica y la capacidad resolutiva disponible.', tema: 'm4-card-sca' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Entregas a una paciente monitorizada, con el desfibrilador al lado, la hora de inicio precisa y el registro transmitido. No te dejaste llevar por el estereotipo ni por un primer registro normal: reconociste, registraste, sostuviste y avisaste.',
      },
      fin_mal: {
        signos: { avdi: 'I', fc: 'sin pulso', ritmo: 'arritmia grave', piel: 'gris' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'La sospecha se abandonó o el equipo se alejó de la paciente, y el tiempo corrió en contra: el músculo sin flujo se pierde mientras la obstrucción persiste, y la arritmia temida de las primeras horas puede aparecer sin aviso.',
      },
    },
  },

  // ----------------------------------------------------------
  //  Ictus
  // ----------------------------------------------------------
  {
    id: 'caso-m4-ictus-en-casa',
    titulo: 'No ha tocado el desayuno',
    resumen: 'Un hombre mayor con déficit focal de aparición brusca. Establecer la última vez visto normal, descartar la hipoglucemia, no etiquetar el tipo y prenotificar.',
    estado: 'borrador',
    temas: ['m4-neu-evc'],
    fuentes: [AHA_STROKE_2026, AHA_ICH_2022],
    rol: 'tum',
    paciente: 'adulto',
    // Disartria y alguna dificultad para encontrar las palabras: contesta, pero
    // a medias (V4). El déficit motor derecho no baja la M: obedece con el
    // lado sano, y se puntúa la mejor respuesta.
    signos: { avdi: 'A', glasgow: 'O4V4M6', fc: 88, fr: 18, spo2: 96, ta: '188/102', glucosa: 134, ritmo: 'sinusal', piel: 'normal', neuro: 'comisura de la boca desviada; el brazo derecho cae al levantar ambos; habla arrastrada'  },
    historia: 'Es… taba… desa… yunando… y el bra… zo… no me… hace caso…',
    testigos: 'Lo vi normal a las 07:30, cuando salí a comprar pan. Volví a las 09:10 y lo encontré así. Es diabético, toma pastillas para el azúcar.',
    // VERSIONES. Las opciones fijan a la esposa como testigo, las 07:30 como
    // última vez visto normal y las 09:10 como hallazgo, y la retro necesita
    // un diabético con pastillas: eso se conserva. Cambian la edad, la escena,
    // por qué salió la esposa y el lado del déficit.
    variantes: [
      {
        etiqueta: 'Desayunando en el departamento',
        historia: 'Es… taba… desayu… nando… y el bra… zo… no me… responde…',
        testigos: 'A las 07:30 estaba normal; salí a comprar pan. Regresé a las 09:10 y lo encontré así. Es diabético, toma pastillas para el azúcar.',
        nodos: {
          n1: { texto: 'Te despachan a un departamento a las 09:40. Un hombre de 71 años está sentado a la mesa con el desayuno a medio comer. Está quieto y no ha tocado la taza. Su esposa está de pie junto a él. ¿Por dónde empiezas?' },
        },
      },
      {
        etiqueta: 'En el patio, déficit izquierdo',
        signos: { glasgow: 'O4V5M6', fc: 82, ta: '184/100', glucosa: 121, neuro: 'comisura de la boca desviada; el brazo izquierdo cae al levantar ambos; habla arrastrada' },
        historia: 'Me… cues… ta… hablar… El brazo… no… me… responde…',
        testigos: 'Lo vi normal a las 07:30, cuando me fui a misa. Regresé a las 09:10 y estaba así. Es diabético, toma pastillas para el azúcar.',
        nodos: {
          n1: { texto: 'Te despachan a una casa a las 09:40. Un hombre de 79 años está sentado en un sillón del patio, con un plato de fruta intacto en las piernas y la cuchara en el suelo. Su esposa está de pie a su lado. ¿Por dónde empiezas?' },
          n6_dano: { testigos: '¡Se está quedando dormido! Y ya no mueve nada el brazo izquierdo.' },
        },
      },
      {
        etiqueta: 'Encima de la tienda familiar',
        signos: { fc: 92, ta: '182/98', glucosa: 118 },
        historia: 'Iba… a… desa… yunar… y la ma… no… se me… cayó…',
        testigos: 'Lo vi normal a las 07:30, cuando bajé a abrir la tienda. Subí a las 09:10 a llevarle café y lo encontré así. Es diabético, toma pastillas para el azúcar.',
        nodos: {
          n1: { texto: 'Te despachan a una vivienda encima de una tienda de abarrotes a las 09:40. Un hombre de 64 años está sentado en un banco de la cocina, con el pan y el café servidos sin tocar. Su esposa, con el delantal de la tienda puesto, está de pie a su lado. ¿Por dónde empiezas?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Te despachan a un departamento a las 09:40. Un hombre de 71 años está sentado a la mesa, frente al desayuno a medio comer. Está quieto y no ha tocado la taza. Su esposa está de pie a su lado. ¿Por dónde empiezas?',
        opciones: [
          { signos: { fc: 86 }, texto: 'Valoración primaria: vía aérea, ventilación y circulación, atento a si su alerta compromete la protección de la vía aérea.', va: 'n2', tipo: 'correcta', retro: 'La conducta empieza por la valoración primaria, con atención a la protección de la vía aérea si el estado de alerta está alterado.', tema: 'm4-neu-evc' },
          { signos: { fc: 90, ta: '192/104' }, texto: 'Le pido que sonría y levante los brazos, y saco ya una conclusión sobre el tipo de ictus.', va: 'n2', tipo: 'riesgo', retro: 'Explorar el déficit es útil, pero va después de la valoración primaria. Y ninguna exploración permite saber en la calle si un ictus es isquémico o hemorrágico.', tema: 'm4-neu-evc' },
        ],
      },
      n2: {
        texto: 'Con lo que has explorado y lo que te han contado, ¿qué hora registras como última vez visto normal?',
        opciones: [
          { signos: { ta: '190/102' }, texto: 'Las 07:30, con el nombre y el teléfono de la esposa como quien aporta el dato.', va: 'n3', tipo: 'correcta', retro: 'Se registra la última vez que el paciente fue visto normal, como hora concreta y con el contacto de quien la aporta. Es el dato con el que se aplicará el criterio de destino.', tema: 'm4-neu-evc' },
          { signos: { ta: '190/104' }, texto: 'Las 09:10, cuando lo encontraron así.', va: 'n3', tipo: 'riesgo', retro: 'La hora en que se descubre el déficit no es la última vez visto normal. Se busca la última referencia concreta de normalidad: aquí, las 07:30.', tema: 'm4-neu-evc' },
        ],
      },
      n3: {
        texto: 'Tu compañero acerca la camilla. Antes de seguir con el ictus, ¿qué haces?',
        opciones: [
          { signos: { fc: 88 }, texto: 'Mido la glucemia capilar, con el equipo y la autorización del protocolo.', va: 'n4', tipo: 'correcta', retro: 'De todos los imitadores, la hipoglucemia es el que se descarta más rápido y el que más se lamenta cuando se omite. Se mide en toda sospecha de ictus.', tema: 'm4-neu-evc' },
          { signos: { fc: 90 }, texto: 'No hace falta: el cuadro es claramente un ictus.', va: 'n3_sin_glucosa', tipo: 'riesgo', retro: 'Descartar los imitadores no retrasa la ruta: forma parte de ella. Diabetes y tratamiento hipoglucemiante son justo lo que sugiere una hipoglucemia.', tema: 'm4-neu-evc' },
        ],
      },
      n3_sin_glucosa: {
        texto: 'Al subirlo a la camilla, tu compañero te pregunta cuánto tenía de glucosa. ¿Qué haces?',
        opciones: [
          { signos: { ta: '192/102' }, texto: 'Rectifico y la mido ahora.', va: 'n4', tipo: 'aceptable', retro: 'La glucemia se mide en toda sospecha de ictus. Hoy no era una hipoglucemia, pero eso solo se sabe midiendo.', tema: 'm4-neu-evc' },
          { signos: { ta: '194/104' }, texto: 'Le digo que no la medí y seguimos.', va: 'n4', tipo: 'riesgo', retro: 'La hipoglucemia puede producir un déficit focal y es reversible. Omitirla es el error que más se lamenta.', tema: 'm4-neu-evc' },
        ],
      },
      n4: {
        texto: 'Con la escala que usa tu servicio y tu exploración neurológica en la mano, tu compañero anota en el registro que es un ictus isquémico porque no tiene dolor de cabeza. ¿Qué haces?',
        opciones: [
          { texto: 'Lo corrijo a «ictus posible», con la descripción lateralizada del déficit: la escala estandariza y activa la ruta, pero no distingue el tipo.', va: 'n5', tipo: 'correcta', retro: 'Isquémico y hemorrágico producen el mismo tipo de déficit y ninguna escala los separa sin imagen. La cefalea aparece más en el hemorrágico pero no lo distingue.', tema: 'm4-neu-evc' },
          { texto: 'Lo dejo así: sin cefalea, es isquémico.', va: 'n5', tipo: 'riesgo', retro: 'Llamar «isquémico» a un ictus antes de la imagen es un error con consecuencias: los tratamientos de uno están contraindicados en el otro.', tema: 'm4-neu-evc' },
        ],
      },
      n5: {
        signos: { ta: '196/106' },
        texto: 'La esposa no se separa de ti y te mira preocupada mientras trabajas. Con lo que has explorado, ¿qué haces con la presión arterial?',
        testigos: '¿No le debería bajar la presión? Me da miedo que la tenga tan alta.',
        opciones: [
          { signos: { fc: 86 }, texto: 'La registro y no intento corregirla salvo indicación del protocolo; le explico que puede estar ayudando a mantener el flujo en la zona afectada.', va: 'n6', tipo: 'correcta', retro: 'La elevación de la presión puede ser un mecanismo de mantenimiento del flujo en la zona afectada. Se registra sin intentar corregirla salvo indicación del protocolo.', tema: 'm4-neu-evc' },
          { signos: { ta: '132/78', avdi: 'V', glasgow: 'O3V3M6' }, texto: 'Le doy algo para bajarla, para proteger el cerebro.', va: 'n6_dano', tipo: 'riesgo', retro: 'Bajar la presión de forma intensiva sin indicación es una de las tres conductas que hacen daño: reducirla sin criterio puede ampliar el daño.', tema: 'm4-neu-evc' },
        ],
      },
      n6_dano: {
        texto: 'Unos minutos después, la esposa te toca el brazo, alarmada, y señala a su marido, que ha dejado caer la cabeza hacia un lado. Con lo que has explorado, ¿qué haces?',
        testigos: '¡Se está quedando dormido! Y ya no mueve nada el brazo derecho.',
        opciones: [
          { signos: { spo2: 94 }, texto: 'Registro el cambio con su hora, vigilo la vía aérea por la alteración del alerta y salgo de inmediato con prenotificación.', va: 'n8', tipo: 'aceptable', retro: 'La reevaluación seriada registra cada cambio con su hora, y la alteración del alerta obliga a atender la protección de la vía aérea. El daño de la decisión previa ya está hecho.', tema: 'm4-neu-evc' },
          { texto: 'Sigo con la exploración completa para documentar bien el empeoramiento antes de salir.', va: 'fin_mal', tipo: 'riesgo', retro: 'Retrasar la salida para una exploración extensa es una de las conductas que hacen daño: el tiempo perdido es tejido perdido.', tema: 'm4-neu-evc' },
        ],
      },
      n6: {
        texto: 'La esposa saca de un cajón la caja de medicamentos de su marido y se acerca con una aspirina y un vaso de agua. ¿Qué haces?',
        testigos: '¿Le doy una aspirina? Es buena para el corazón y la circulación.',
        opciones: [
          { signos: { ta: '194/104' }, texto: 'Le pido que no le dé nada. Reviso la caja y anoto su tratamiento habitual, sobre todo si toma anticoagulantes o antiagregantes.', va: 'n7', tipo: 'correcta', retro: 'No se administran antiagregantes ni anticoagulantes en campo sin protocolo: si el ictus es hemorrágico, se agrava. Su tratamiento habitual, en especial esos fármacos, es un dato que se recoge.', tema: 'm4-neu-evc' },
          { signos: { avdi: 'V', glasgow: 'O3V3M6' }, texto: 'Le digo que sí, que puede ayudar.', va: 'n7', tipo: 'riesgo', retro: 'En la calle no puede saberse si el ictus es hemorrágico. Un antiagregante sin protocolo, en ese caso, lo agrava.', tema: 'm4-neu-evc' },
        ],
      },
      n7: {
        texto: 'Te falta completar una exploración neurológica más detallada. ¿Sales ya o la terminas aquí?',
        opciones: [
          { signos: { ta: '192/102' }, texto: 'Salgo ya y completo la exploración en camino.', va: 'n8', tipo: 'correcta', retro: 'Se evitan los retrasos: la exploración se completa en camino cuando es posible. El tiempo perdido es tejido perdido.', tema: 'm4-neu-evc' },
          { signos: { avdi: 'V', glasgow: 'O3V3M6' }, texto: 'La termino aquí con calma, para entregar un informe completo.', va: 'n8', tipo: 'riesgo', retro: 'Retrasar la salida para completar una exploración extensa figura entre las tres conductas que hacen daño.', tema: 'm4-neu-evc' },
        ],
      },
      n8: {
        texto: 'En la ambulancia toca decidir el destino y avisar. ¿Cómo lo haces?',
        opciones: [
          { texto: 'Aplico el criterio de destino que fija el protocolo de mi servicio con la hora de última vez visto normal que establecí, y prenotifico al centro receptor según el procedimiento local.', va: 'fin_bien', tipo: 'correcta', retro: 'El destino lo fija la organización territorial del servicio y su protocolo; la decisión del prestador es aplicar ese criterio con la hora que él mismo estableció. La prenotificación permite preparar la atención antes de la llegada.', tema: 'm4-neu-evc' },
          { texto: 'Lo llevo al hospital más cercano sin avisar: lo importante es llegar rápido.', va: 'fin_bien', tipo: 'aceptable', retro: 'Llegar pronto importa, pero el destino no es siempre el más cercano: existen centros con capacidades distintas y el criterio lo fija el protocolo. Sin prenotificación, el hospital no puede prepararse.', tema: 'm4-neu-evc' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Entregas a un paciente con «ictus posible», la hora de última vez visto normal con el contacto de su esposa, la glucemia, la descripción lateralizada del déficit, su tratamiento habitual y la presión registrada sin corregir. Reevaluaste en camino y anotaste cada cambio con su hora.',
      },
      fin_mal: {
        signos: { avdi: 'D', fr: 'irregular', spo2: 90 },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El paciente se deteriora en la escena. La presión se bajó sin indicación y la salida se retrasó para completar una exploración: el tejido nervioso privado de flujo se pierde progresivamente, y ese tiempo no se recupera.',
      },
    },
  },

  // ----------------------------------------------------------
  //  Hipoglucemia que imita una intoxicación
  // ----------------------------------------------------------
  {
    id: 'caso-m4-hipoglucemia-oficina',
    titulo: '«Está borracho», dicen en la oficina',
    resumen: 'Un hombre con diabetes de larga evolución, confuso y sin sudoración. Sospechar la hipoglucemia aunque falten los signos de alarma, medir la glucemia y proteger la vía aérea.',
    estado: 'borrador',
    temas: ['m4-met-complicaciones'],
    fuentes: [ADA_2026, BIBIANO_HIPOGLUCEMIA],
    rol: 'tum',
    paciente: 'adulto',
    signos: { avdi: 'V', fc: 96, fr: 18, spo2: 97, ta: '132/80', glucosa: 38, ritmo: 'sinusal', piel: 'normal, seca', neuro: 'el brazo derecho responde peor que el izquierdo' },
    historia: '¿Dón… de estoy?… Estoy bien… déjenme…',
    testigos: 'Seguro tomó en la comida; ya llamamos a seguridad. Aunque… es diabético desde hace veinte años.',
    // VERSIONES. Las opciones fijan a un hombre con diabetes de larga
    // evolución, la llamada a seguridad, el refresco y la silla: se conservan.
    // Cambian la edad, el lugar de trabajo, la hora, el lado del déficit y lo
    // bajo de la glucosa (siempre una hipoglucemia clara).
    variantes: [
      {
        etiqueta: 'Oficina, media tarde',
        historia: '¿Dón… de… estoy?… Estoy bien… déjenme…',
        testigos: 'Seguro se tomó unas copas en la comida; ya llamamos a seguridad. Aunque… tiene diabetes desde hace veinte años.',
        nodos: {
          n1: { texto: 'Te despachan a una oficina a media tarde. Un hombre de 58 años está desplomado en su silla, frente al escritorio, con la cabeza caída hacia adelante. Lo rodean varios compañeros de trabajo. No hueles alcohol ni ves botellas o vasos. ¿Cómo empiezas?' },
        },
      },
      {
        etiqueta: 'Centro de atención telefónica, media mañana',
        signos: { fc: 92, glucosa: 42, neuro: 'el brazo izquierdo responde peor que el derecho' },
        historia: '¿Qué… hora… es?… Estoy bien… déjenme…',
        testigos: 'Yo digo que viene crudo de anoche; ya avisamos a seguridad. Aunque… la supervisora dice que es diabético desde hace muchos años.',
        nodos: {
          n1: { texto: 'Te despachan a un centro de atención telefónica a media mañana. Un hombre de 46 años está desplomado en la silla de su cubículo, con la diadema todavía puesta y la cabeza apoyada sobre el teclado. Sus compañeros se asoman por encima de las mamparas. No hueles alcohol y no ves botellas ni vasos. ¿Cómo empiezas?' },
          n1_espera: { texto: 'Pasan unos minutos. El paciente se ha ido resbalando en la silla y ya no levanta la cabeza del teclado. Con lo que has explorado, ¿qué haces?' },
          n2_glucemia: { signos: { glucosa: 40 } },
          n4: { texto: 'A los pocos minutos se endereza en la silla, se quita la diadema y mira a su alrededor. Hace ademán de levantarse. ¿Qué haces?', historia: '¿Qué pasó? Ya estoy bien. Tengo llamadas pendientes.' },
        },
      },
      {
        etiqueta: 'Despacho contable, primera hora',
        signos: { fc: 88, ta: '138/84', glucosa: 34 },
        historia: 'Déjen… me… ya… se me… pasa…',
        testigos: 'Seguro llegó tomado de anoche; ya llamamos a seguridad. Aunque… una vez nos contó que tiene diabetes desde hace años.',
        nodos: {
          n1: { texto: 'Te despachan a un despacho contable a primera hora de la mañana. Un hombre de 63 años está recargado de lado en su silla, con el hombro contra el archivero y una taza de café sin tocar sobre el escritorio. Dos compañeras y el jefe lo miran desde la puerta. No hueles alcohol y no ves botellas ni vasos. ¿Cómo empiezas?' },
          n2_glucemia: { signos: { glucosa: 33 } },
          n3: { texto: 'Una compañera llega de la cocineta con un refresco abierto y se inclina para dárselo a beber. Con lo que has explorado, ¿qué haces?' },
          n4: { historia: '¿Qué pasó? Ya estoy bien. Tengo que entregar unos balances.' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Te despachan a una oficina a media tarde. Un hombre de 58 años está desplomado en su silla, frente a su escritorio, con la cabeza caída hacia adelante. Varios compañeros de trabajo lo rodean. No hueles alcohol y no ves botellas ni vasos. ¿Cómo empiezas?',
        opciones: [
          { signos: { fc: 98 }, texto: 'Valoración primaria —vía aérea, ventilación y circulación— y, con una alteración del estado mental en un diabético, la hipoglucemia es lo primero que busco.', va: 'n2', tipo: 'correcta', retro: 'La valoración primaria va antes que el síndrome. Y de las complicaciones de la diabetes, la hipoglucemia es la que produce daño en menos tiempo y la que se busca primero ante cualquier alteración del estado mental.', tema: 'm4-met-complicaciones' },
          { signos: { fc: 100, glucosa: 36 }, texto: 'Lo trato como una intoxicación y espero a que llegue seguridad para moverlo.', va: 'n1_espera', tipo: 'riesgo', retro: 'La hipoglucemia puede presentarse como una intoxicación. Esa capacidad de imitar es la razón para comprobar la glucemia en toda alteración del estado mental.', tema: 'm4-met-complicaciones' },
        ],
      },
      n1_espera: {
        signos: { avdi: 'D', fc: 104 },
        texto: 'Pasan unos minutos. El paciente se ha escurrido un poco más en la silla y ya no levanta la cabeza. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { glucosa: 34 }, texto: 'Dejo de esperar: valoración primaria y glucemia capilar ya.', va: 'n3', tipo: 'aceptable', retro: 'Rectificas. La hipoglucemia es la complicación que produce daño en menos tiempo: el sistema nervioso depende de un aporte continuo de glucosa y apenas almacena reservas.', tema: 'm4-met-complicaciones' },
          { signos: { avdi: 'I', fc: 118, ritmo: 'taquicardia sinusal' }, texto: 'Sigo esperando a seguridad; si está tomado, se le pasará.', va: 'fin_mal', tipo: 'riesgo', retro: 'La hipoglucemia es una causa frecuente, reversible y que se descarta en un minuto. Etiquetarla de intoxicación y esperar deja avanzar la neuroglucopenia.', tema: 'm4-met-complicaciones' },
        ],
      },
      n2: {
        texto: 'Tu compañero lo mira y opina que no está sudando ni tiembla, así que no le parece una bajada de azúcar. ¿Qué le respondes?',
        opciones: [
          { texto: 'Que la respuesta autonómica puede faltar en diabetes de larga evolución: el primer signo puede ser ya la confusión. Mido la glucemia.', va: 'n2_glucemia', tipo: 'correcta', retro: 'Es la hipoglucemia inadvertida: algunos pacientes con diabetes de larga evolución, o con ciertos medicamentos, dejan de percibir las señales de alarma y pasan directamente a las manifestaciones neurológicas.', tema: 'm4-met-complicaciones' },
          { texto: 'Que tiene razón: sin sudoración ni temblor, descarto la hipoglucemia y busco otra causa.', va: 'n1_espera', tipo: 'riesgo', retro: 'Esperar siempre los signos autonómicos es un error frecuente: pueden faltar, y entonces la confusión es el primer signo.', tema: 'm4-met-complicaciones' },
        ],
      },
      n2_glucemia: {
        signos: { glucosa: 36 },
        texto: 'Mientras lo acomodas en la silla, tu compañero sugiere tratarlo como un ictus. Con lo que has medido, ¿qué piensas?',
        opciones: [
          { texto: 'La hipoglucemia puede producir un déficit focal; con la glucemia baja, es la causa reversible que se atiende primero.', va: 'n3', tipo: 'correcta', retro: 'La hipoglucemia imita a casi todo, también a un ictus con déficit focal. La neuroglucopenia incluye confusión, dificultad para hablar y déficit focal.', tema: 'm4-met-complicaciones' },
          { signos: { avdi: 'D' }, texto: 'Ignoro la glucemia y activo la ruta de ictus: el déficit focal manda.', va: 'n3', tipo: 'riesgo', retro: 'El déficit focal también es una manifestación de neuroglucopenia. Con la glucemia medida y baja, ignorarla es dejar sin atender la causa reversible.', tema: 'm4-met-complicaciones' },
        ],
      },
      n3: {
        signos: { fc: 102 },
        texto: 'Una compañera de trabajo llega con un refresco abierto y se inclina para dárselo a beber. Con lo que has explorado, ¿qué haces?',
        testigos: 'Traje un refresco: si es el azúcar, que se lo tome y ya.',
        opciones: [
          { signos: { glucosa: 92, avdi: 'V', neuro: 'mueve igual ambos lados' }, texto: 'No le doy nada por boca con la respuesta alterada. Corrijo la hipoglucemia conforme al protocolo del servicio, con el producto y la vía que autoriza.', va: 'n4', tipo: 'correcta', retro: 'La corrección de la hipoglucemia se hace únicamente conforme al protocolo, con el producto y la vía autorizados. En el paciente con la respuesta alterada se protege la vía aérea y se previene la broncoaspiración.', tema: 'm4-met-complicaciones' },
          { signos: { spo2: 90, fr: '24/min, con gorgoteo' }, texto: 'Le inclino la cabeza y le doy el refresco a sorbos.', va: 'n3_aspira', tipo: 'riesgo', retro: 'Con la respuesta alterada la prioridad es proteger la vía aérea y prevenir la broncoaspiración. La corrección se hace con el producto y la vía que autoriza el protocolo.', tema: 'm4-met-complicaciones' },
          { signos: { avdi: 'D', glucosa: 30 }, texto: 'No hago nada todavía; que lo corrijan en el hospital.', va: 'n3_convulsion', tipo: 'riesgo', retro: 'La hipoglucemia es la que no espera: produce daño en menos tiempo que las otras complicaciones. Su corrección forma parte de la conducta prehospitalaria conforme al protocolo.', tema: 'm4-met-complicaciones' },
        ],
      },
      n3_aspira: {
        texto: 'Tose, se atraganta y vomita parte del líquido sobre la camisa. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { spo2: 93, fr: 22, glucosa: 88, avdi: 'V', neuro: 'mueve igual ambos lados' }, texto: 'Lo coloco para proteger la vía aérea y prevenir la broncoaspiración, y después corrijo la glucemia conforme al protocolo con la vía autorizada.', va: 'n4', tipo: 'aceptable', retro: 'Proteger la vía aérea y prevenir la broncoaspiración es un paso explícito en el paciente con vómito o con la respuesta alterada. La corrección, conforme al protocolo.', tema: 'm4-met-complicaciones' },
          { signos: { spo2: 84, fr: 30, avdi: 'D' }, texto: 'Le doy otro poco para que le suba antes.', va: 'fin_mal', tipo: 'riesgo', retro: 'Con vómito y respuesta alterada, insistir por boca agrava el riesgo de broncoaspiración que la lección pide prevenir.', tema: 'm4-met-complicaciones' },
        ],
      },
      n3_convulsion: {
        signos: { avdi: 'I', fc: 124, spo2: 88 },
        texto: 'Mientras preparas el traslado, el paciente empieza a convulsionar en la silla. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { glucosa: 86, avdi: 'V', spo2: 93, neuro: 'mueve igual ambos lados' }, texto: 'Protejo la vía aérea y corrijo la hipoglucemia de inmediato conforme al protocolo, con el producto y la vía autorizados.', va: 'n4', tipo: 'aceptable', retro: 'La convulsión y la pérdida de la respuesta son manifestaciones de neuroglucopenia. La corrección llega tarde, pero llega: es la causa reversible.', tema: 'm4-met-complicaciones' },
          { texto: 'Sigo sin corregir la glucosa y salgo hacia el hospital.', va: 'fin_mal', tipo: 'riesgo', retro: 'La hipoglucemia no admite espera: el sistema nervioso no dispone de combustible, y el daño avanza mientras dura.', tema: 'm4-met-complicaciones' },
        ],
      },
      n4: {
        signos: { avdi: 'A', fc: 90, glucosa: 104, neuro: 'mueve igual ambos lados' },
        texto: 'A los pocos minutos se endereza en la silla y mira a su alrededor. Hace ademán de levantarse. ¿Qué haces?',
        historia: '¿Qué pasó? Ya estoy bien. Quiero volver a trabajar.',
        opciones: [
          { signos: { glucosa: 106, fc: 88, neuro: 'mueve igual ambos lados' }, texto: 'Lo reevalúo de forma continua, registro con hora la glucemia y la respuesta, y busco el desencadenante: omisión de tratamiento, infección, imposibilidad de beber o isquemia.', va: 'n5', tipo: 'correcta', retro: 'La lección pide reevaluación continua y registro con hora, y buscar el desencadenante: infección, omisión de tratamiento, imposibilidad de beber o isquemia.', tema: 'm4-met-complicaciones' },
          { signos: { glucosa: 100, neuro: 'mueve igual ambos lados' }, texto: 'Como ya habla bien, doy el caso por resuelto y me retiro sin registrar más.', va: 'n5', tipo: 'riesgo', retro: 'La mejoría no cierra la atención: la reevaluación es continua, con registro y hora, y el desencadenante sigue sin conocerse.', tema: 'm4-met-complicaciones' },
        ],
      },
      n5: {
        texto: 'El paciente tuvo una alteración del estado mental con déficit focal hace unos minutos. ¿Cómo cierras la atención?',
        opciones: [
          { texto: 'Traslado con prealerta por la alteración del estado mental que presentó, con la glucemia inicial y tras la corrección registradas con su hora.', va: 'fin_bien', tipo: 'correcta', retro: 'La alteración del estado mental es un criterio de traslado con prealerta. El registro con hora de lo encontrado, lo hecho y la respuesta permite al hospital continuar.', tema: 'm4-met-complicaciones' },
          { texto: 'Lo traslado, pero sin avisar al hospital: ya está despierto.', va: 'fin_bien', tipo: 'aceptable', retro: 'El traslado es correcto, pero la alteración del estado mental que presentó justifica la prealerta: el hospital necesita saber qué encontró y qué se corrigió.', tema: 'm4-met-complicaciones' },
        ],
      },
      fin_bien: {
        signos: { avdi: 'A', glucosa: 108, neuro: 'mueve igual ambos lados' },
        fin: true,
        desenlace: 'favorable',
        texto: 'Entregas a un paciente alerta, con la glucemia inicial y la posterior registradas con hora. No te dejaste llevar por la etiqueta de «borracho» ni por la ausencia de sudoración: mediste, corregiste conforme al protocolo y protegiste la vía aérea.',
      },
      fin_mal: {
        signos: { avdi: 'I', spo2: 82, fr: 30, fc: 128, piel: 'pálida' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El paciente llega sin respuesta. La hipoglucemia se confundió con otra cosa o no se corrigió a tiempo, o se le dio algo por boca con la respuesta alterada: la causa más reversible de la unidad se convirtió en un daño.',
      },
    },
  },
]
