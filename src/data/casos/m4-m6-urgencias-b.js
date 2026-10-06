// ============================================================
//  Casos de los Módulos 4 y 6 · Urgencias (lote B) — BORRADORES
// ------------------------------------------------------------
//  Redactados el 05-10-2026 a petición del usuario. ESTADO `borrador`: el
//  alumno NO los ve hasta que un docente los valide (casosParaElAlumno solo
//  deja pasar `validado` y `publicado`); el personal sí, para revisarlos.
//
//  Regla de redacción, la misma de la pasada v2: cada decisión, consecuencia
//  y cifra sale de la prosa que la lección citada YA enseña y cita. No hay
//  ningún dato clínico que no esté en esa lección. Ninguna lección de este
//  lote publica dosis, concentración ni pauta de fármaco, y los casos tampoco:
//  la medicación se remite al protocolo del servicio y a la dirección médica.
//  Los signos vitales son ILUSTRATIVOS del escenario, no rangos de referencia.
//  Si un docente corrige la lección, el caso se revisa con ella.
//
//  Exploración activa (06-10-2026): el texto de cada nodo solo cuenta lo que
//  se ve de un vistazo. Signos, conciencia y lo que dicen el paciente
//  (`historia`) y los testigos (`testigos`) los obtiene el alumno explorando
//  (src/lib/exploracion.js).
//
//  Lecciones que sostienen cada caso:
//    m4-tox-anafilaxia          src/data/contenido/m4-toxicologicas.js
//    m4-neu-crisis-convulsivas  src/data/contenido/m4-neurologicas.js
//    m6-emp-sx-febril           src/data/contenido/m6-emergencias-pediatricas.js
//    m6-mg-traumatismo          src/data/contenido/m6-geriatria.js
// ============================================================

const WAO_ANAFILAXIA_2020 = {
  nombre: 'World Allergy Organization. Anaphylaxis Guidance 2020.',
  nota: 'Misma fuente que la lección m4-tox-anafilaxia: definición por compromiso de sistemas, '
    + 'anafilaxia sin manifestaciones cutáneas y adrenalina intramuscular como primera línea.',
}
const AHA_TOXICOLOGIA_2025 = {
  nombre: 'AHA 2025 Adult and Pediatric Special Circumstances of Resuscitation: Poisoning and '
    + 'Anaphylaxis.',
  nota: 'Misma fuente que la lección m4-tox-anafilaxia. No sostiene ninguna dosis del caso.',
}
const AES_STATUS_2016 = {
  nombre: 'American Epilepsy Society. Evidence-Based Guideline: Treatment of Convulsive Status '
    + 'Epilepticus in Children and Adults, 2016.',
  nota: 'Misma fuente que la lección m4-neu-crisis-convulsivas: definición operacional del estado '
    + 'convulsivo y principio de tratamiento temprano; dosis y vías dependen del protocolo local.',
}
const WHO_MHGAP_2023 = {
  nombre: 'World Health Organization. mhGAP Guideline for Mental, Neurological and Substance Use '
    + 'Disorders, 3.ª edición, 2023.',
  nota: 'Misma fuente que la lección m4-neu-crisis-convulsivas.',
}
const AHA_PALS_2025 = {
  nombre: 'AHA 2025 Pediatric Advanced Life Support.',
  nota: 'Misma fuente que la lección m6-emp-sx-febril. No sostiene ninguna cifra concreta del caso.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  nota: 'Misma fuente que la lección m6-emp-sx-febril: reconocimiento y estabilización del niño '
    + 'gravemente enfermo.',
}
const ACS_TRIAJE = {
  nombre: 'American College of Surgeons. National Guideline for the Field Triage of Injured Patients, '
    + 'revisión 2021.',
  nota: 'Misma fuente que la lección m6-mg-traumatismo: criterios específicos para el paciente de '
    + 'edad avanzada.',
}
const GEMS_3 = {
  nombre: 'NAEMT. Geriatric Education for Emergency Medical Services (GEMS), 3.ª edición.',
  nota: 'Misma fuente que la lección m6-mg-traumatismo: atención prehospitalaria al paciente '
    + 'geriátrico.',
}

export default [
  // ============================================================
  //  Anafilaxia tras una picadura
  // ============================================================
  {
    id: 'caso-m4-anafilaxia-picadura',
    titulo: 'Una picadura en el parque',
    resumen: 'Un adulto picado por una avispa tiene la voz ronca y no tiene ronchas. Reconocer la anafilaxia sin piel, no retrasar la adrenalina intramuscular y no dar el episodio por cerrado.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    temas: ['m4-tox-anafilaxia'],
    fuentes: [WAO_ANAFILAXIA_2020, AHA_TOXICOLOGIA_2025],
    historia: 'Me picó una avispa hace unos minutos. Siento que se me cierra la garganta, me cuesta tragar y la voz me sale ronca.',
    testigos: 'Íbamos caminando y le picó una avispa. A los pocos minutos empezó a decir que le costaba tragar y se le puso la voz ronca.',
    signos: { avdi: 'A', fc: 118, fr: 26, spo2: 93, ta: '100/64', piel: 'pálida, sin ronchas' },
    // Versiones (src/lib/variacion.js): mismo hombre adulto alérgico, mismo
    // parque y mismas decisiones; cambian quién es, la escena y los testigos.
    variantes: [
      {
        etiqueta: 'Banca del parque',
        historia: 'Hace unos minutos me picó una avispa. Siento la garganta cerrada, me cuesta tragar y la voz me sale ronca.',
        testigos: 'Veníamos caminando y le picó una avispa. A los pocos minutos empezó a decir que le costaba tragar y la voz se le puso ronca.',
        nodos: {
          n1: { texto: 'Te llaman a un parque. En una banca está sentado un hombre de unos treinta y cinco años, con una mano en el cuello; una amiga a su lado te hace señas para que te acerques. Ya no se ven insectos cerca. Con lo que has explorado, ¿por dónde empiezas?' },
          n2_retraso: { texto: 'Pasan unos minutos y siguen sin aparecer ronchas. El paciente se echa hacia atrás contra el respaldo de la banca. Con lo que has explorado, ¿qué haces?' },
          n3: { texto: 'Al lado de la banca hay una mochila. Tu compañero sugiere empezar por un antihistamínico, a ver si con eso alcanza. Con lo que has explorado, ¿qué decides?' },
        },
      },
      {
        etiqueta: 'Partido de fútbol en el parque',
        signos: { fc: 112, fr: 24, spo2: 94, ta: '106/68' },
        historia: 'Estaba jugando y me picó una avispa en el cuello. Ahora me cuesta tragar, siento la garganta apretada y la voz me sale ronca.',
        testigos: 'Estábamos jugando y le picó una avispa. Se salió de la cancha diciendo que le costaba tragar, y ahora casi no se le entiende la voz.',
        nodos: {
          n1: { texto: 'Te llaman a la cancha de fútbol de un parque. Un hombre de unos cincuenta años, con uniforme deportivo, está sentado en el pasto junto a la portería con una mano en el cuello; un compañero de equipo te hace señas. El partido se detuvo y ya no hay insectos alrededor. Con lo que has explorado, ¿por dónde empiezas?' },
          n2: { texto: 'Tu compañero de unidad le mira los brazos y opina que, sin ronchas, no puede ser una alergia grave: seguramente es el cansancio del partido. Con lo que has explorado, ¿cómo lo interpretas?' },
          n2_retraso: { texto: 'Pasan unos minutos. Siguen sin aparecer ronchas. El paciente apoya la espalda en el poste de la portería. Con lo que has explorado, ¿qué haces?' },
          n3: {
            historia: 'Soy alérgico a las picaduras. En mi maleta deportiva traigo el autoinyector que me recetaron.',
            testigos: 'Nos ha contado que es alérgico a las picaduras. El autoinyector que le recetaron lo guarda en su maleta deportiva.',
            texto: 'En la banca de suplentes está su maleta deportiva. Tu compañero de unidad propone darle primero un antihistamínico para ver si con eso basta. Con lo que has explorado, ¿qué decides?',
          },
          n3_peor: { texto: 'Pasan los minutos. El paciente se dobla hacia delante, sentado en el pasto, con las dos manos en el cuello. Con lo que has explorado, ¿qué haces?' },
          n4: { texto: 'Hay que subirlo a la camilla, que quedó en la orilla de la cancha. Quiere quedarse sentado. Con lo que has explorado, ¿cómo lo colocas?' },
          n7: {
            historia: 'Ya me siento bien, ya me sale la voz. Mis compañeros me llevan a mi casa; no hace falta el hospital.',
            texto: 'El paciente se incorpora en la camilla y pide que lo dejes irse a su casa con sus compañeros de equipo. Con lo que has explorado, ¿qué haces?',
          },
        },
      },
      {
        etiqueta: 'Día de campo con su hermana',
        signos: { fc: 124, fr: 28, spo2: 92, ta: '96/60' },
        historia: 'Me picó una avispa en la mano mientras comíamos. Se me está cerrando la garganta, trago con trabajo y la voz me sale ronca.',
        testigos: 'Estábamos comiendo en el pasto y una avispa le picó en la mano. Al ratito empezó con que no podía tragar y le cambió la voz.',
        nodos: {
          n1: { texto: 'Te llaman a la zona de días de campo de un parque. Un joven de unos veintidós años está sentado sobre un mantel, bajo un árbol, con una mano en el cuello; su hermana se levanta y te hace señas. Alrededor hay comida y ya no se ven avispas. Con lo que has explorado, ¿por dónde empiezas?' },
          n2: { texto: 'Tu compañero le mira los brazos y opina que, sin ronchas, no puede ser una alergia grave: seguramente es un susto. Con lo que has explorado, ¿cómo lo interpretas?' },
          n2_retraso: { texto: 'Pasan unos minutos. Las ronchas no aparecen. El joven se recarga contra el tronco del árbol. Con lo que has explorado, ¿qué haces?' },
          n3: {
            historia: 'Soy alérgico a las picaduras. Mi autoinyector está en la mochila, junto a la canasta.',
            testigos: 'Es alérgico a las picaduras desde niño. Trae un autoinyector que le recetaron; está en su mochila.',
            texto: 'Junto a la canasta del día de campo hay una mochila. Tu compañero propone empezar por un antihistamínico y ver si con eso basta. Con lo que has explorado, ¿qué decides?',
          },
          n3_peor: { texto: 'Pasan los minutos. El joven se inclina hacia delante sobre el mantel, con las dos manos en el cuello. Con lo que has explorado, ¿qué haces?' },
          n6: { texto: 'Han pasado unos minutos desde la adrenalina. Su hermana, sentada a tu lado en la unidad, te avisa: él vuelve a llevarse la mano al cuello. Con lo que has explorado, ¿qué haces?' },
          n7: {
            historia: 'Ya estoy mejor, ya me sale la voz. Mi hermana me lleva a la casa; no quiero ir al hospital.',
            texto: 'El joven se sienta en la camilla y pide que su hermana lo lleve a casa. Con lo que has explorado, ¿qué haces?',
          },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Te llaman a un parque. Un hombre de unos treinta y cinco años está sentado en una banca con una mano en el cuello; a su lado, una amiga te hace señas. Ya no hay insectos alrededor. Con lo que has explorado, ¿por dónde empiezas?',
        opciones: [
          { texto: 'Confirmo que la escena es segura y hago la valoración primaria con atención prioritaria a la vía aérea.', va: 'n2', tipo: 'correcta', retro: 'En la anafilaxia la vía aérea recibe atención prioritaria porque puede cerrarse con rapidez. La voz ronca y la sensación de cierre de garganta son manifestaciones de vía aérea.', tema: 'm4-tox-anafilaxia' },
          { signos: { fr: 30, spo2: 90 }, texto: 'Le reviso la piel de todo el cuerpo buscando urticaria antes de decidir nada.', va: 'n2', tipo: 'riesgo', retro: 'La piel está afectada en la mayoría de los casos, pero no en todos. Buscar urticaria antes de valorar la vía aérea retrasa lo prioritario.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n2: {
        signos: { fr: '28, con un ruido agudo al inspirar', spo2: 92 },
        historia: 'La voz se me está apagando… cada vez me cuesta más tragar.',
        texto: 'Tu compañero le mira los brazos y opina que, sin ronchas, no puede ser una alergia grave: seguramente son nervios. Con lo que has explorado, ¿cómo lo interpretas?',
        opciones: [
          { signos: { fc: 122, spo2: 91 }, texto: 'Hay exposición probable y compromiso de la vía aérea: es una anafilaxia hasta que se demuestre lo contrario, tenga o no urticaria.', va: 'n3', tipo: 'correcta', retro: 'Lo que define la anafilaxia es el compromiso de la respiración, de la circulación o de la vía aérea tras una exposición probable, no la erupción. Los casos sin piel suelen ser los más graves y rápidos.', tema: 'm4-tox-anafilaxia' },
          { signos: { fr: 32, spo2: 89, fc: 128, ta: '92/58' }, texto: 'Le doy la razón: espero a ver si aparecen ronchas para confirmarlo.', va: 'n2_retraso', tipo: 'riesgo', retro: 'Exigir manifestaciones cutáneas retrasa el tratamiento precisamente en los pacientes que menos margen tienen.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n2_retraso: {
        signos: { fr: '34, con un ruido agudo y fuerte al inspirar', spo2: 87, fc: 134, ta: '84/50', piel: 'pálida, fría, sin urticaria' },
        historia: 'Me estoy mareando… casi no me pasa el aire.',
        texto: 'Pasan unos minutos. Siguen sin aparecer ronchas. El paciente se recarga en el respaldo de la banca. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Rectifico: es una anafilaxia con compromiso de vía aérea y circulación, y paso a tratarla sin más demora.', va: 'n3', tipo: 'aceptable', retro: 'Es la lectura correcta, pero llega tarde: el retraso en administrar la adrenalina se asocia a peor evolución.', tema: 'm4-tox-anafilaxia' },
          { signos: { avdi: 'V', spo2: 82, ta: '76/44' }, texto: 'Sigo esperando la urticaria; sin ella no me atrevo a tratar.', va: 'fin_mal', tipo: 'riesgo', retro: 'Una anafilaxia puede no tener nunca lesiones en la piel. Esperarlas deja avanzar el compromiso de la vía aérea y de la circulación.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n3: {
        historia: 'Soy alérgico a las picaduras. En la mochila traigo un autoinyector que me recetaron.',
        testigos: 'Es alérgico a las picaduras. Siempre trae en la mochila un autoinyector que le recetaron.',
        texto: 'Junto a la banca hay una mochila. Tu compañero propone darle primero un antihistamínico para ver si con eso basta. Con lo que has explorado, ¿qué decides?',
        opciones: [
          { signos: { fc: 112, fr: 24, spo2: 94, ta: '102/66' }, texto: 'Adrenalina intramuscular ya, sin retrasarla: con su autoinyector o con la de la unidad, según lo que autorice el protocolo del servicio y mi alcance.', va: 'n4', tipo: 'correcta', retro: 'La adrenalina intramuscular temprana es la primera línea y lo que más influye en el desenlace. Qué se hace con el autoinyector del paciente —asistir, administrar o abstenerse— lo fija el protocolo. La dosis sale del protocolo y del producto que se tiene en la mano.', tema: 'm4-tox-anafilaxia' },
          { signos: { fc: 130, fr: 32, spo2: 88, ta: '86/52' }, texto: 'Primero el antihistamínico y un corticoide; si no mejora, la adrenalina.', va: 'n3_peor', tipo: 'riesgo', retro: 'Los antihistamínicos y los corticoides no sustituyen a la adrenalina: actúan sobre otros aspectos y con otro ritmo. El retraso de la adrenalina se asocia a peor evolución.', tema: 'm4-tox-anafilaxia' },
          { signos: { fc: 126, fr: 30, spo2: 90, ta: '90/56' }, texto: 'Primero canalizo una vena y después decido el tratamiento.', va: 'n3_peor', tipo: 'riesgo', retro: 'El acceso vascular forma parte del soporte, pero no va por delante de la adrenalina intramuscular, que no debe retrasarse.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n3_peor: {
        signos: { fc: 136, fr: '34, con un ruido agudo y fuerte al inspirar', spo2: 86, ta: '80/48', piel: 'pálida, fría' },
        historia: 'Me voy a desmayar…',
        texto: 'Pasan los minutos. El paciente se encorva hacia delante con las dos manos en el cuello. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fc: 120, fr: 28, spo2: 91, ta: '94/60' }, texto: 'Adrenalina intramuscular ahora, conforme al producto y al protocolo, y pido apoyo.', va: 'n4', tipo: 'aceptable', retro: 'Es lo indicado, pero se perdieron minutos con un paciente que tenía poco margen. La adrenalina es el único tratamiento que actúa sobre los mecanismos que amenazan la vida.', tema: 'm4-tox-anafilaxia' },
          { signos: { avdi: 'V', spo2: 80, ta: '70/40' }, texto: 'Espero a que haga efecto el antihistamínico.', va: 'fin_mal', tipo: 'riesgo', retro: 'El antihistamínico no actúa sobre los mecanismos que amenazan la vida ni con el ritmo que el cuadro exige.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n4: {
        historia: 'Déjenme sentado, por favor: acostado siento que respiro peor.',
        texto: 'Hay que subirlo a la camilla. Quiere quedarse sentado. Con lo que has explorado, ¿cómo lo colocas?',
        opciones: [
          { signos: { fc: 108, spo2: 94 }, texto: 'En la posición que tolere, y lo movilizo sin cambios bruscos: ni lo acuesto a la fuerza ni lo incorporo de golpe.', va: 'n5', tipo: 'correcta', retro: 'La posición se individualiza. Un paciente con dificultad respiratoria no se acuesta a la fuerza, y en uno hipotenso los cambios bruscos pueden empeorar de golpe el llenado del corazón.', tema: 'm4-tox-anafilaxia' },
          { signos: { avdi: 'V', fc: 128, ta: '78/46', piel: 'pálida, sudorosa' }, texto: 'Le pido que se ponga de pie y camine hasta la ambulancia, que está cerca.', va: 'n5', tipo: 'riesgo', retro: 'Ponerlo de pie de forma brusca puede empeorar el llenado del corazón en un paciente hipotenso por anafilaxia.', tema: 'm4-tox-anafilaxia' },
          { signos: { fr: 32, spo2: 90 }, texto: 'Lo acuesto plano a la fuerza aunque diga que así respira peor.', va: 'n5', tipo: 'riesgo', retro: 'Un paciente con dificultad respiratoria no se acuesta a la fuerza: la posición es la que el paciente tolere.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n5: {
        texto: 'Ya en la unidad. ¿Qué completas del soporte?',
        opciones: [
          { signos: { spo2: 95 }, texto: 'Oxigenación y ventilación conforme al protocolo, acceso vascular y líquidos conforme a mi alcance, y monitorización continua.', va: 'n6', tipo: 'correcta', retro: 'Son las prioridades de soporte que siguen a la adrenalina, todas conforme al alcance y al protocolo, con monitorización continua.', tema: 'm4-tox-anafilaxia' },
          { texto: 'Como ya le di la adrenalina, no hace falta monitorizarlo: lo observo de vez en cuando.', va: 'n6', tipo: 'riesgo', retro: 'La monitorización es continua y la reevaluación también: el cuadro puede no responder o volver a empeorar.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n6: {
        signos: { fc: 124, fr: '28, vuelve el ruido agudo al inspirar', spo2: 91, ta: '88/56' },
        historia: 'Otra vez siento la garganta cerrada.',
        texto: 'Han pasado unos minutos desde la adrenalina. El paciente vuelve a llevarse la mano al cuello. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fc: 100, fr: 20, spo2: 96, ta: '112/72', piel: 'rosada' }, texto: 'Lo comunico a la dirección médica y valoro otra administración de adrenalina intramuscular conforme al protocolo.', va: 'n7', tipo: 'correcta', retro: 'Puede ser necesaria más de una administración si el cuadro no responde. El intervalo depende de la guía, del producto y del protocolo del servicio.', tema: 'm4-tox-anafilaxia' },
          { signos: { fc: 130, fr: 30, spo2: 88, ta: '82/50' }, texto: 'Ahora sí le doy un antihistamínico en lugar de repetir la adrenalina.', va: 'n7', tipo: 'riesgo', retro: 'Los antihistamínicos no sustituyen a la adrenalina en ningún momento del cuadro: actúan sobre otros aspectos y con otro ritmo.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n7: {
        historia: 'Ya me siento mejor, ya me sale la voz. Prefiero que me lleven a mi casa.',
        texto: 'El paciente se incorpora en la camilla y pide que lo lleves a su casa. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fc: 96, spo2: 97 }, texto: 'Le explico que puede volver a empeorar horas después, lo traslado con prealerta y, si se niega, manejo la negativa conforme al procedimiento del servicio.', va: 'n8', tipo: 'correcta', retro: 'La mejoría no cierra el episodio: todos los pacientes con anafilaxia se trasladan y se vigilan aunque parezcan recuperados.', tema: 'm4-tox-anafilaxia' },
          { texto: 'Lo dejo en su casa con la indicación de usar su autoinyector si vuelve a empeorar.', va: 'fin_recaida', tipo: 'riesgo', retro: 'Un paciente que mejora puede presentar un nuevo empeoramiento horas después. Por eso el traslado se hace en todos los casos.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      n8: {
        texto: 'Durante el traslado preparas la entrega. ¿Qué registras?',
        opciones: [
          { texto: 'La hora de cada administración y la respuesta del paciente a cada una, además de la reevaluación continua.', va: 'fin_bien', tipo: 'correcta', retro: 'El registro con hora de cada administración y de la respuesta forma parte de las prioridades del manejo.', tema: 'm4-tox-anafilaxia' },
          { texto: 'Que se le dio adrenalina y mejoró; los horarios no importan si ya está estable.', va: 'fin_bien', tipo: 'aceptable', retro: 'El paciente está a salvo, pero la entrega queda incompleta: se registra la hora de cada administración y de la respuesta.', tema: 'm4-tox-anafilaxia' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Entregas en el hospital a un paciente estable, con la vía aérea conservada y el registro de cada administración. Quedará en vigilancia por si vuelve a empeorar: reconocerla sin ronchas y no retrasar la adrenalina cambió el desenlace.',
      },
      fin_recaida: {
        signos: { avdi: 'V', fc: 132, fr: 32, spo2: 86, ta: '80/48', piel: 'pálida, fría' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Horas después vuelven a llamar desde el mismo domicilio por el mismo paciente: el cuadro ha regresado. La mejoría no había cerrado el episodio.',
      },
      fin_mal: {
        signos: { avdi: 'D', fc: 140, fr: 36, spo2: 78, ta: '64/38', piel: 'grisácea, fría' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'La vía aérea sigue cerrándose y la circulación se desploma. El tratamiento que actúa sobre los mecanismos que amenazan la vida se retrasó esperando una urticaria o un fármaco que no la sustituye.',
      },
    },
  },

  // ============================================================
  //  Crisis convulsiva en el adulto
  // ============================================================
  {
    id: 'caso-m4-convulsion-oficina',
    titulo: 'Convulsiona en la oficina',
    resumen: 'Un adulto sin epilepsia conocida convulsiona frente a ti. Mirar la hora, proteger sin sujetar, reconocer el estado convulsivo y no atribuir toda confusión a lo posictal.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    temas: ['m4-neu-crisis-convulsivas'],
    fuentes: [AES_STATUS_2016, WHO_MHGAP_2023],
    // Durante la fase ictal la lección describe pérdida de la respuesta: I.
    historia: '¿Qué pasó? ¿Por qué estoy en el suelo? No me acuerdo de nada.',
    testigos: 'Estaba trabajando normal en su escritorio y de repente cayó al suelo y empezó a sacudirse. Nunca le había pasado algo así y no sabemos que tenga ninguna enfermedad.',
    signos: { avdi: 'I', fc: 128, fr: 'irregular, entrecortada', spo2: 90, ta: '158/94', glucosa: 104, temp: 36.8, piel: 'sudorosa', neuro: null, movimientos: 'sacudidas rítmicas de brazos y piernas' },
    // Versiones (src/lib/variacion.js): siempre un hombre adulto con camisa y
    // corbata, en un lugar de trabajo con compañeros y una cuchara a mano; las
    // decisiones no cambian.
    variantes: [
      {
        etiqueta: 'Oficina de contabilidad',
        historia: '¿Qué pasó? ¿Qué hago en el piso? No me acuerdo de nada.',
        testigos: 'Estaba en su escritorio trabajando como siempre y de pronto se cayó y empezó a sacudirse. Nunca le había pasado y no sabemos que tenga ninguna enfermedad.',
        nodos: {
          n1: { texto: 'Estás en una oficina de contabilidad recogiendo a otro paciente cuando un hombre de unos cuarenta años se desploma junto a su escritorio. Se pone rígido y empieza a sacudir brazos y piernas, con la cabeza cerca de la esquina de un archivero. ¿Qué haces primero?' },
          n2: { texto: 'Las sacudidas siguen. Un compañero de trabajo se arrodilla a su lado con una cuchara: quiere metérsela en la boca para que no se trague la lengua. Ves sangre en la comisura de la boca. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Junta en la sucursal bancaria',
        signos: { fc: 134, spo2: 89, ta: '166/98' },
        historia: '¿Qué pasó? ¿Por qué estoy en el piso de la sala? No me acuerdo… estábamos en la junta.',
        testigos: 'Estábamos en plena junta y de repente se fue de lado, cayó de la silla y empezó a sacudirse. En los años que llevo trabajando con él nunca le había pasado, y no sé que esté enfermo de nada.',
        nodos: {
          n1: { texto: 'Estás en la sucursal de un banco recogiendo a otro paciente cuando, en la sala de juntas, un hombre de unos cincuenta y cinco años cae de su silla. Se pone rígido y empieza a sacudir brazos y piernas junto a la esquina metálica de la mesa. ¿Qué haces primero?' },
          n2: { texto: 'Las sacudidas no paran. Una compañera de la junta se arrodilla con una cuchara del servicio de café: quiere metérsela en la boca para que no se trague la lengua. Ves sangre en la comisura de la boca. ¿Qué haces?' },
          n4: { texto: 'Las sacudidas por fin cesan y anotas la hora. El paciente queda tendido y flácido sobre la alfombra de la sala de juntas. Con lo que has explorado, ¿qué haces?' },
          n6: { texto: 'Mientras completas la valoración, la gerente de la sucursal te pregunta si entonces es epiléptico. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Centro de atención telefónica',
        signos: { fc: 122, spo2: 91, ta: '150/90' },
        historia: '¿Qué pasó? ¿Por qué estoy en el suelo? Estaba en una llamada… no me acuerdo de nada más.',
        testigos: 'Estaba atendiendo una llamada y de repente se fue al piso y empezó a sacudirse. Que yo sepa nunca le había pasado, y no nos ha dicho que tenga ninguna enfermedad.',
        nodos: {
          n1: { texto: 'Estás en un centro de atención telefónica recogiendo a otro paciente cuando un hombre de unos veintiocho años, con camisa, corbata y la diadema del teléfono puesta, cae de su silla entre dos cubículos. Se pone rígido y empieza a sacudir brazos y piernas; tiene la cabeza junto a la pata metálica de un escritorio. ¿Qué haces primero?' },
          n2: { texto: 'Las sacudidas continúan. El supervisor del turno se arrodilla con una cuchara de la cocineta: quiere metérsela en la boca para que no se trague la lengua. Ves sangre en la comisura de la boca. ¿Qué haces?' },
          n4: { texto: 'Las sacudidas por fin cesan y anotas la hora. El joven queda tendido y flácido entre los cubículos. Con lo que has explorado, ¿qué haces?' },
          n6: { texto: 'Mientras completas la valoración, el supervisor te pregunta si entonces es epiléptico. ¿Qué haces?' },
          n7: { signos: { neuro: 'no mueve el brazo izquierdo; mueve el derecho' } },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Estás en una oficina recogiendo a otro paciente cuando un hombre de unos cuarenta años cae al suelo junto a su escritorio. Se pone rígido y empieza a sacudir brazos y piernas. Tiene la cabeza cerca de la esquina de un mueble. ¿Qué haces primero?',
        opciones: [
          { texto: 'Miro la hora, le protejo la cabeza y retiro los objetos con los que puede golpearse.', va: 'n2', tipo: 'correcta', retro: 'Mirar la hora es la primera maniobra: de ella depende la definición de estado convulsivo. Después se protege la cabeza y se despeja el entorno.', tema: 'm4-neu-crisis-convulsivas' },
          { signos: { fc: 134 }, texto: 'Le sujeto los brazos y las piernas con fuerza para que deje de moverse.', va: 'n2', tipo: 'riesgo', retro: 'Sujetar las extremidades no acorta la crisis y produce lesiones musculares y articulares. Además, nadie miró la hora.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n2: {
        signos: { spo2: 88 },
        texto: 'Las sacudidas continúan. Un compañero de trabajo se arrodilla con una cuchara en la mano: quiere metérsela en la boca para que no se trague la lengua. Ves sangre en la comisura de la boca. ¿Qué haces?',
        opciones: [
          { texto: 'Se lo impido con calma, le pido que me ayude a aflojarle la corbata y el cuello de la camisa si es seguro hacerlo.', va: 'n3', tipo: 'correcta', retro: 'No se introduce nada en la boca: la mordedura ocurre al principio, antes de que nadie llegue, y el objeto produce lesiones dentales, de la vía aérea y del propio reanimador. Aflojar la ropa del cuello sí forma parte de la protección.', tema: 'm4-neu-crisis-convulsivas' },
          { signos: { spo2: 86, fr: 'ruidosa, irregular' }, texto: 'Le ayudo a colocar la cuchara entre los dientes, ya que se está mordiendo.', va: 'n3', tipo: 'riesgo', retro: 'La mordedura ya ocurrió al inicio de la crisis. Meter un objeto no la evita y sí lesiona dientes, vía aérea y a quien lo intenta.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n3: {
        signos: { fc: 136, spo2: 87, ta: '164/98' },
        texto: 'Miras el reloj: han pasado más de cinco minutos desde que empezó y las sacudidas no ceden. Con lo que has explorado, ¿cómo lo categorizas?',
        opciones: [
          { texto: 'Es un estado convulsivo según la definición operacional: dejo de solo observar y escalo conforme al protocolo, pidiendo apoyo y comunicándome con la dirección médica para la medicación.', va: 'n4', tipo: 'correcta', retro: 'La crisis que supera los cinco minutos es un estado convulsivo, y ese es el momento en que la conducta cambia a escalar. El tratamiento temprano importa, pero qué fármaco, a qué dosis y por qué vía lo fijan el protocolo y la dirección médica.', tema: 'm4-neu-crisis-convulsivas' },
          { signos: { fc: 142, spo2: 82, ta: '170/100', piel: 'sudorosa, cianosis en labios' }, texto: 'Es una crisis larga, pero casi todas ceden solas: sigo esperando.', va: 'n3_espera', tipo: 'riesgo', retro: 'La mayoría ceden solas, pero la que se prolonga daña el tejido nervioso y compromete la ventilación y la circulación. Por eso existe un umbral concreto para escalar.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n3_espera: {
        signos: { spo2: 80 },
        texto: 'Han pasado varios minutos más y las sacudidas continúan. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Escalo ahora conforme al protocolo y pido apoyo.', va: 'n4', tipo: 'aceptable', retro: 'Rectificas, pero el umbral de cinco minutos existe precisamente para no llegar a este punto: el tratamiento temprano importa.', tema: 'm4-neu-crisis-convulsivas' },
          { signos: { spo2: 78 }, texto: 'Sigo esperando a que ceda por sí sola.', va: 'fin_mal', tipo: 'riesgo', retro: 'La actividad prolongada daña el tejido nervioso y compromete la ventilación y la circulación.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n4: {
        signos: { avdi: 'I', fc: 118, fr: 'superficial, ruidosa', spo2: 88, ta: '150/90', piel: 'sudorosa', movimientos: 'ninguno: queda flácido' },
        texto: 'Las sacudidas por fin cesan y anotas la hora. El paciente queda tendido y flácido en el suelo. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fr: 18, spo2: 95 }, texto: 'Lo coloco en posición de seguridad conforme al protocolo y compruebo de inmediato la vía aérea, la ventilación y la circulación.', va: 'n5', tipo: 'correcta', retro: 'Cuando los movimientos cesan, se coloca en posición de seguridad y se comprueba la vía aérea y la ventilación: es donde más se compromete el paciente en el periodo posterior.', tema: 'm4-neu-crisis-convulsivas' },
          { signos: { spo2: 84, fr: 'ronquido' }, texto: 'Lo dejo boca arriba y me pongo a preguntar a los compañeros por sus antecedentes.', va: 'n5', tipo: 'riesgo', retro: 'La historia es necesaria, pero después de asegurar la vía aérea y la ventilación, que es donde más se compromete el paciente tras la crisis.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n5: {
        // Posictal: abre los ojos a la voz, contesta confuso y obedece.
        signos: { avdi: 'V', glasgow: 'O3V4M6', fc: 104, ta: '142/88', movimientos: null },
        texto: 'El paciente empieza a moverse. Con lo que has explorado, ¿qué completas?',
        opciones: [
          { texto: 'Glucemia capilar si mi protocolo lo autoriza, temperatura, y exploración buscando lesiones de la caída, incluida la columna cervical.', va: 'n6', tipo: 'correcta', retro: 'Después de la crisis se mide la glucemia si hay equipo y el protocolo lo autoriza, la temperatura, y se buscan lesiones producidas durante la crisis, incluida la columna cervical si hubo caída.', tema: 'm4-neu-crisis-convulsivas' },
          { texto: 'Nada más: es una convulsión típica y el resto lo verán en el hospital.', va: 'n6', tipo: 'riesgo', retro: 'La hipoglucemia y el traumatismo están entre las causas y consecuencias que se buscan en la escena; buscarlas es la aportación principal del equipo prehospitalario.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n6: {
        signos: { fc: 102, ta: '140/86' },
        texto: 'Mientras completas la valoración, uno de sus compañeros te pregunta si entonces es epiléptico. ¿Qué haces?',
        opciones: [
          { texto: 'No lo asumo. Pregunto por crisis previas, medicación, consumo de alcohol o sustancias, traumatismo reciente o infección, para buscar qué la ha provocado.', va: 'n7', tipo: 'correcta', retro: 'Ante una primera crisis la pregunta es qué la ha provocado. El diagnóstico de epilepsia exige un estudio que no se hace en la calle, y etiquetarlo antes desvía la búsqueda de la causa aguda.', tema: 'm4-neu-crisis-convulsivas' },
          { texto: 'Sí, lo registro como epilepsia de nuevo inicio.', va: 'n7', tipo: 'riesgo', retro: 'Una crisis es un síntoma que puede ocurrirle a cualquiera. Etiquetar como epilepsia una primera crisis desvía la búsqueda de la causa aguda.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n7: {
        // Más somnoliento que antes: abre los ojos a la voz, solo palabras sueltas.
        signos: { avdi: 'V', glasgow: 'O3V3M6', fc: 108, ta: '152/94', neuro: 'no mueve el brazo derecho; mueve el izquierdo' },
        texto: 'Ya en la unidad, reevalúas. Ha pasado un buen rato desde que terminó la crisis. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { spo2: 96 }, texto: 'No lo atribuyo a lo posictal: busco otra explicación —traumatismo de la caída, hipoglucemia, intoxicación, infección o ictus—, reevalúo de forma seriada y traslado con prealerta.', va: 'n8', tipo: 'correcta', retro: 'El estado posictal mejora progresivamente. Si la confusión no mejora, empeora o hay un déficit que persiste, hay que buscar otra explicación.', tema: 'm4-neu-crisis-convulsivas' },
          { signos: { avdi: 'D' }, texto: 'Es el periodo posictal, que a veces es largo: lo dejo dormir.', va: 'fin_mal', tipo: 'riesgo', retro: 'Atribuir toda alteración a lo posictal cierra la valoración antes de tiempo. Un deterioro con un déficit que persiste obliga a buscar otra causa.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      n8: {
        texto: 'Llegas al hospital. ¿Qué transmites de la crisis?',
        opciones: [
          { texto: 'Hora de inicio y de fin, que fue presenciada, cómo fue, la mordedura de lengua, que superó los cinco minutos, cómo evolucionó después y el déficit nuevo.', va: 'fin_bien', tipo: 'correcta', retro: 'Es el registro completo de la crisis que pide la lección, y permite al hospital saber que hubo un estado convulsivo y un deterioro posterior.', tema: 'm4-neu-crisis-convulsivas' },
          { texto: 'Que tuvo una convulsión larga y que ahora está confuso.', va: 'fin_bien', tipo: 'aceptable', retro: 'Es cierto pero incompleto: se transmiten las horas de inicio y fin, qué se observó, si recuperó la conciencia y cómo evolucionó.', tema: 'm4-neu-crisis-convulsivas' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'El hospital recibe a un paciente con la vía aérea protegida, un estado convulsivo reconocido a tiempo y un deterioro posterior detectado y comunicado. Con el registro completo, el equipo receptor puede buscar la causa sin perder minutos.',
      },
      fin_mal: {
        signos: { avdi: 'I', fc: 124, fr: 'irregular', spo2: 84, ta: '176/102' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El paciente deja de responder. La crisis prolongada o el deterioro posterior no se trataron como lo que eran, y la valoración se cerró antes de tiempo.',
      },
    },
  },

  // ============================================================
  //  Convulsión asociada a fiebre en un niño
  // ============================================================
  {
    id: 'caso-m6-convulsion-febril',
    titulo: 'Convulsiona en el sofá',
    resumen: 'Una niña de dos años con fiebre convulsiona en casa. Proteger sin sujetar, cronometrar y buscar los signos de alarma que impiden asumir un cuadro simple.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'nino',
    temas: ['m6-emp-sx-febril'],
    fuentes: [AHA_PALS_2025, WHO_BEC],
    // Niña de dos años: no cuenta su historia; la cuentan la madre y la abuela.
    testigos: 'Tiene fiebre desde ayer. Hace como tres minutos empezó a sacudirse de repente, todo el cuerpo.',
    signos: { avdi: 'I', fc: 168, fr: 44, spo2: 92, temp: 39.6, glucosa: 96, piel: 'caliente, enrojecida', movimientos: 'sacudidas de brazos y piernas' },
    // Versiones (src/lib/variacion.js): siempre una niña pequeña en un sofá,
    // con su madre y su abuela, y manchas que la abuela llama piquetes; cambian
    // la edad, la casa, dónde salen las manchas y lo que cuenta la madre.
    variantes: [
      {
        etiqueta: 'Dos años, en el departamento',
        testigos: 'Tiene fiebre desde ayer. Hace unos tres minutos empezó a sacudirse de golpe, todo el cuerpo.',
        nodos: {
          n1: { texto: 'Llegas a un departamento. En el sofá, una niña de dos años sacude brazos y piernas. La madre grita que se le está muriendo y la abuela trata de abrirle la boca con los dedos. ¿Qué haces?' },
          n3: { texto: 'Poco después las sacudidas ceden y anotas la hora. La niña queda quieta sobre el sofá. La madre te pregunta si ya pasó todo. ¿Qué haces?' },
          n5: { texto: 'Al descubrirla para explorarla aparecen unas manchas pequeñas, de color rojo oscuro, en las piernas. La abuela asegura que son piquetes de mosquito. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Veinte meses, manchas en el abdomen',
        signos: { fc: 172, fr: 46, spo2: 91 },
        testigos: 'Desde anoche tiene fiebre. Hace como dos minutos, estando en mis brazos, se puso tiesa y empezó a sacudirse toda; la acosté en el sofá.',
        nodos: {
          n1: { texto: 'Llegas a una casa de una planta. Una niña de unos veinte meses está acostada en el sofá de la sala, sacudiendo brazos y piernas. La madre, de pie, repite que se le muere, y la abuela le mete los dedos en la boca para abrírsela. ¿Qué haces?' },
          n3: { texto: 'Poco después las sacudidas ceden; anotas la hora. La niña queda quieta entre los cojines. La madre te pregunta si ya se terminó. ¿Qué haces?' },
          n5: {
            signos: { piel: 'caliente, manchas pequeñas rojo oscuro en el abdomen' },
            texto: 'Al levantarle la camiseta para explorarla ves unas manchas pequeñas, rojo oscuro, en el abdomen. La abuela dice que son piquetes de mosquito, que anoche había muchos. ¿Qué haces?',
          },
          n7: { texto: 'La madre llora en la cocina y dice que creyó que su hija se le moría. ¿Qué haces mientras se prepara el traslado?' },
        },
      },
      {
        etiqueta: 'Tres años, en casa de la abuela',
        signos: { fc: 164, fr: 40, spo2: 93 },
        testigos: 'La traje a casa de mi mamá porque tiene fiebre desde ayer en la tarde. Hace unos tres minutos, viendo la tele, empezó a sacudirse entera de repente.',
        nodos: {
          n1: { texto: 'Llegas a la casa de la abuela. Una niña de tres años está en el sofá, frente a la televisión, sacudiendo brazos y piernas. Su madre grita que se está muriendo y la abuela intenta abrirle la boca con los dedos. ¿Qué haces?' },
          n3: { texto: 'Poco después las sacudidas ceden y anotas la hora. La niña se queda quieta en el sofá. La madre te pregunta si ya pasó lo peor. ¿Qué haces?' },
          n5: {
            signos: { piel: 'caliente, manchas pequeñas rojo oscuro en los tobillos' },
            texto: 'Al quitarle los calcetines para explorarla ves unas manchas pequeñas, rojo oscuro, en los tobillos. La abuela dice que son piquetes de los mosquitos del patio. ¿Qué haces?',
          },
          n7: { texto: 'La madre llora en el patio y dice que pensó que su hija se moría. ¿Qué haces mientras se prepara el traslado?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Llegas a un departamento. Una niña de dos años está en el sofá sacudiendo brazos y piernas. La madre grita que se está muriendo y la abuela intenta abrirle la boca con los dedos. ¿Qué haces?',
        opciones: [
          { texto: 'Detengo a la abuela con calma, retiro los cojines duros y objetos cercanos, no sujeto a la niña y miro el reloj.', va: 'n2', tipo: 'correcta', retro: 'Durante el episodio se protege de golpes, no se sujeta, no se introduce nada en la boca bajo ninguna circunstancia y se mira el reloj: la duración es el dato clínico más importante.', tema: 'm6-emp-sx-febril' },
          { signos: { fc: 176 }, texto: 'Sujeto a la niña con fuerza para que deje de moverse.', va: 'n2', tipo: 'riesgo', retro: 'No se sujeta al niño ni se intenta detener los movimientos.', tema: 'm6-emp-sx-febril' },
          { signos: { spo2: 88 }, texto: 'Ayudo a la abuela a ponerle algo entre los dientes para que no se muerda.', va: 'n2', tipo: 'riesgo', retro: 'No se introduce nada en la boca bajo ninguna circunstancia.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n2: {
        signos: { spo2: 91 },
        texto: 'Las sacudidas siguen y afectan a todo el cuerpo. ¿Qué haces mientras dura?',
        opciones: [
          { signos: { spo2: 95 }, texto: 'La coloco de lado en cuanto es posible, administro oxígeno conforme al protocolo, preparo el material de vía aérea y observo cómo es la convulsión.', va: 'n3', tipo: 'correcta', retro: 'Colocarla de lado protege la vía aérea. El oxígeno conforme al protocolo y el material preparado forman parte de la actuación, y observar cómo fue —todo el cuerpo o una parte, giro de cabeza u ojos— es información que hará falta.', tema: 'm6-emp-sx-febril' },
          { signos: { spo2: 89, fr: 'ruidosa' }, texto: 'La dejo boca arriba y me concentro en bajarle la fiebre cuanto antes.', va: 'n3', tipo: 'riesgo', retro: 'Durante el episodio lo prioritario es proteger y colocar de lado para proteger la vía aérea. La cifra del termómetro no es el problema.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n3: {
        // Somnolienta tras la crisis: abre los ojos a la voz y solo se queja.
        signos: { avdi: 'V', glasgow: 'O3V2M6', fc: 150, fr: 34, movimientos: 'ninguno: queda quieta' },
        texto: 'Poco después las sacudidas ceden; anotas la hora. La niña queda quieta en el sofá. La madre te pregunta si ya pasó todo. ¿Qué haces?',
        opciones: [
          { texto: 'Valoro vía aérea, ventilación y estado de conciencia, y le explico que la somnolencia es esperable pero tiene que ir mejorando.', va: 'n4', tipo: 'correcta', retro: 'Tras el episodio se valoran la vía aérea, la ventilación y la conciencia. La somnolencia posterior es esperable, pero debe ir mejorando.', tema: 'm6-emp-sx-febril' },
          { texto: 'Le digo que las convulsiones con fiebre son benignas y que puede quedarse en casa.', va: 'n4', tipo: 'riesgo', retro: 'Su pronóstico general es bueno, pero no se asume un cuadro simple sin valorar ni buscar los signos de alarma, y el episodio se traslada.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n4: {
        signos: { fc: 146, movimientos: null },
        texto: 'Llevas glucómetro y tu protocolo autoriza usarlo. ¿Lo usas?',
        opciones: [
          { texto: 'Sí: la hipoglucemia puede producir convulsiones y es tratable.', va: 'n5', tipo: 'correcta', retro: 'Medir la glucemia, si está dentro del alcance, descarta una causa tratable de la convulsión.', tema: 'm6-emp-sx-febril' },
          { texto: 'No hace falta: está claro que la causa es la fiebre.', va: 'n5', tipo: 'aceptable', retro: 'Puede que lo sea, pero la hipoglucemia puede producir convulsiones y es tratable: si está dentro del alcance, se mide.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n5: {
        signos: { piel: 'caliente, manchas pequeñas rojo oscuro en las piernas' },
        texto: 'Al descubrirla para explorarla ves unas manchas pequeñas, rojo oscuro, en las piernas. La abuela dice que son piquetes de mosquito. ¿Qué haces?',
        opciones: [
          { texto: 'Presiono las manchas con un vaso de vidrio transparente para ver si palidecen, y busco rigidez de nuca y los demás signos de alarma.', va: 'n6', tipo: 'correcta', retro: 'Es una comprobación que cuesta segundos y puede cambiar el desenlace. Tras el episodio se buscan los signos de alarma, en especial rigidez de nuca y manchas que no palidecen.', tema: 'm6-emp-sx-febril' },
          { texto: 'Acepto que son piquetes; la niña no parece tan afectada.', va: 'fin_mal', tipo: 'riesgo', retro: 'Las manchas obligan a comprobar si palidecen al presionar, aunque el niño no parezca muy afectado.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n6: {
        signos: { piel: 'caliente, manchas que no palidecen', fc: 156 },
        texto: 'Las manchas no desaparecen bajo el vidrio. ¿Cómo lo manejas?',
        opciones: [
          { texto: 'No lo trato como una convulsión febril simple: considero una infección grave y traslado sin demora con prealerta.', va: 'n7', tipo: 'correcta', retro: 'Las manchas que no palidecen obligan a considerar una infección grave y a trasladar sin demora. Con ellas el cuadro se maneja como una convulsión de causa por determinar.', tema: 'm6-emp-sx-febril' },
          { signos: { fc: 172, piel: 'manchas que no palidecen, moteada' }, texto: 'Espero a que le baje la fiebre para ver cómo queda antes de decidir.', va: 'fin_mal', tipo: 'riesgo', retro: 'Ante manchas que no palidecen el traslado es sin demora. Esperar a que baje la cifra no cambia que sea un signo de alarma.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n7: {
        signos: { fr: 32, temp: 39.4 },
        texto: 'La madre llora en el pasillo y dice que pensó que su hija se moría. ¿Qué haces mientras se prepara el traslado?',
        opciones: [
          { texto: 'Le explico con calma qué ocurrió y qué vamos a hacer, y la llevo con nosotros.', va: 'n8', tipo: 'correcta', retro: 'Acompañar a la familia forma parte de la actuación: suele estar convencida de que su hijo iba a morir.', tema: 'm6-emp-sx-febril' },
          { texto: 'Le pido que se calme y me centro solo en la niña.', va: 'n8', tipo: 'aceptable', retro: 'La niña es la prioridad, pero explicar lo ocurrido con calma a la familia también es parte de la atención.', tema: 'm6-emp-sx-febril' },
        ],
      },
      n8: {
        signos: { fc: 150, spo2: 97 },
        texto: 'Das la prealerta al hospital. ¿Qué describes del episodio?',
        opciones: [
          { texto: 'Hora de inicio, duración, que fue generalizada, el estado posterior y las manchas que no palidecen.', va: 'fin_bien', tipo: 'correcta', retro: 'Se traslada describiendo con precisión hora de inicio, duración, características y estado posterior, y se comunica el signo de alarma.', tema: 'm6-emp-sx-febril' },
          { texto: 'Que convulsionó por la fiebre y que trae 39.6 °C.', va: 'fin_bien', tipo: 'riesgo', retro: 'La cifra no es lo importante, y llamarla convulsión «por la fiebre» oculta que hay un signo de alarma. Se describen hora, duración, características y estado posterior.', tema: 'm6-emp-sx-febril' },
        ],
      },
      fin_bien: {
        signos: { avdi: 'V', fc: 150, fr: 32, spo2: 97 },
        fin: true,
        desenlace: 'favorable',
        texto: 'La niña llega al hospital sin demora, con la vía aérea protegida y un equipo que la espera sabiendo que hay manchas que no palidecen. Comprobarlo costó segundos y cambió el destino del caso.',
      },
      fin_mal: {
        signos: { avdi: 'D', fc: 180, fr: 48, spo2: 92, piel: 'manchas que no palidecen, moteada' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Horas después la niña está mucho peor y las manchas se han extendido. Se asumió una convulsión febril simple sin comprobar el signo de alarma que obligaba a trasladar sin demora.',
      },
    },
  },

  // ============================================================
  //  Caída de una persona mayor
  // ============================================================
  {
    id: 'caso-m6-caida-adulta-mayor',
    titulo: 'Se cayó en el baño',
    resumen: 'Una mujer de 84 años anticoagulada se cae en casa. Bajar el umbral de alarma, explorar todo, adaptar la inmovilización e investigar por qué se cayó.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    temas: ['m6-mg-traumatismo'],
    fuentes: [ACS_TRIAJE, GEMS_3],
    historia: 'Me caí en el baño y ya no me pude levantar. Lo que me duele es la muñeca derecha.',
    testigos: 'La encontré en el suelo del baño; creo que llevaba ahí un par de horas. Mi mamá es hipertensa y siempre anda en 160.',
    signos: { avdi: 'A', fc: 92, fr: 20, spo2: 94, ta: '118/72', temp: 35.6, glucosa: 112, piel: 'fría, herida en la frente' },
    // Versiones (src/lib/variacion.js): siempre una mujer mayor anticoagulada,
    // caída en el baño, con la muñeca derecha y las costillas derechas, que su
    // hijo encuentra. Cambian la edad, el tiempo en el suelo y la cifra
    // habitual; la tensión obtenida sigue siendo baja PARA ELLA.
    variantes: [
      {
        etiqueta: '84 años, la encuentra su hijo',
        historia: 'Me caí en el baño y ya no pude levantarme. Me duele la muñeca derecha.',
        testigos: 'La encontré tirada en el baño; creo que llevaba ahí como dos horas. Mi mamá es hipertensa y siempre anda en 160.',
        nodos: {
          n1: { texto: 'Te llama el hijo de una señora de 84 años: la encontró en el suelo del baño. Ella está sentada en el piso, con una herida en la frente que sangra poco, y se sostiene la muñeca derecha. ¿Por dónde empiezas?' },
          n5: { texto: 'El piso del baño, donde estuvo tendida, está helado. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Doña Carmen, 91 años, toda la madrugada',
        signos: { fc: 94, ta: '112/70', temp: 35.2 },
        historia: 'Me levanté al baño en la madrugada y me fui al suelo. Ya no me pude parar. Lo que me duele es esta muñeca, la derecha.',
        testigos: 'Vine a verla temprano, como cada día, y la hallé en el piso del baño; por la hora a la que se levanta, llevaría unas cuatro horas ahí. Mi mamá es hipertensa: normalmente anda en 150.',
        nodos: {
          n1: { texto: 'Temprano por la mañana te llama el hijo de doña Carmen, de 91 años, que vive sola en un departamento: la encontró en el suelo del baño. Está sentada en el piso, en camisón, con una herida en la frente que sangra poco, y se sujeta la muñeca derecha. ¿Por dónde empiezas?' },
          n4: { historia: 'Ya le dije, joven: lo que me duele es la muñeca. Lo demás está bien.' },
          n5: { signos: { temp: 35.1 }, texto: 'El piso de mosaico del baño, donde pasó la madrugada, está helado. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Doña Rosa, 78 años, una hora en el suelo',
        signos: { fc: 90, ta: '126/78', temp: 35.8 },
        historia: 'Me resbalé al salir de la regadera y no me pude levantar sola. Me duele mucho la muñeca derecha.',
        testigos: 'Oí el golpe desde la cocina, pero la puerta del baño tenía seguro y tardé casi una hora en abrirla. Mi mamá es hipertensa y siempre anda en 170.',
        nodos: {
          n1: { texto: 'Te llama el hijo de doña Rosa, de 78 años: está en el suelo del baño de su casa y él no la pudo levantar. Ella está sentada en el piso, con una toalla encima, una herida en la frente que sangra poco, y se sujeta la muñeca derecha. ¿Por dónde empiezas?' },
          n4: { historia: 'Ya le dije, es la muñeca. Lo demás no me duele.' },
          n5: { signos: { temp: 35.6 }, texto: 'El piso del baño, mojado y frío, es donde estuvo tendida. ¿Qué haces?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Te llama el hijo de una mujer de 84 años: la encontró en el suelo del baño. Está sentada en el suelo, con una herida en la frente que sangra poco, y se sujeta la muñeca derecha. ¿Por dónde empiezas?',
        opciones: [
          { texto: 'Controlo la hemorragia visible y valoro vía aérea y ventilación, como en cualquier traumatizado.', va: 'n2', tipo: 'correcta', retro: 'La secuencia es la habitual: control de la hemorragia visible y valoración de la vía aérea y la ventilación. Lo que cambia es el umbral de alarma.', tema: 'm6-mg-traumatismo' },
          { signos: { fc: 96 }, texto: 'Le inmovilizo la muñeca, que es lo que le duele.', va: 'n2', tipo: 'riesgo', retro: 'La lesión que más duele no es necesariamente la más grave. El manejo empieza por la hemorragia y la vía aérea y la ventilación.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n2: {
        signos: { fr: 22 },
        texto: 'Ya tienes sus primeras cifras. Con lo que has explorado y lo que te han contado, ¿cómo interpretas su tensión arterial?',
        opciones: [
          { texto: 'Interpreto la cifra contra la habitual de la paciente y contando con su medicación: para ella es baja, y bajo mi umbral de alarma.', va: 'n3', tipo: 'correcta', retro: 'Las constantes se interpretan contra las cifras habituales del paciente y contando con su medicación. Una cifra que parece normal puede no serlo para ella.', tema: 'm6-mg-traumatismo' },
          { texto: 'Es una tensión normal: la paciente está estable.', va: 'n3', tipo: 'riesgo', retro: 'En el paciente mayor el umbral de alarma se baja y las constantes se comparan con sus cifras habituales, no con las de un adulto cualquiera.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n3: {
        signos: { fc: 96 },
        texto: 'Revisas su medicación. ¿Qué preguntas de forma explícita?',
        opciones: [
          { texto: 'Si toma anticoagulantes o antiagregantes. El hijo confirma que toma un anticoagulante, y lo anoto en lugar visible del informe.', va: 'n4', tipo: 'correcta', retro: 'Se pregunta de forma explícita por anticoagulantes y antiagregantes y se anota en lugar visible: la hemorragia intracraneal puede crecer despacio en el anticoagulado.', tema: 'm6-mg-traumatismo' },
          { texto: 'No hace falta preguntar: está consciente y orientada, y la herida apenas sangra.', va: 'n4_sin_dato', tipo: 'riesgo', retro: 'La hemorragia intracraneal de crecimiento lento en el anticoagulado es de lo que más se pasa por alto. El dato se pregunta siempre de forma explícita.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n4_sin_dato: {
        signos: { fr: 23 },
        texto: 'Mientras exploras, el hijo deja sobre la mesa una bolsa con las medicinas de su madre. ¿Qué haces?',
        opciones: [
          { texto: 'La reviso con él, pregunto explícitamente por anticoagulantes y lo anoto en lugar visible.', va: 'n4', tipo: 'aceptable', retro: 'Rectificas a tiempo. Ese dato condiciona la vigilancia y el destino, y se comunica de forma explícita.', tema: 'm6-mg-traumatismo' },
          { texto: 'No la reviso; la medicación la verán en el hospital.', va: 'n4', tipo: 'riesgo', retro: 'Si no se pregunta ni se anota, la anticoagulación puede no llegar a quien recibe a la paciente.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n4: {
        signos: { fr: 24, spo2: 92 },
        historia: 'Ya le dije: solo me duele la muñeca, lo demás está bien.',
        texto: 'Sigues con la valoración. Con lo que has explorado, ¿cómo sigues?',
        opciones: [
          { signos: { fr: 22, spo2: 93 }, texto: 'Exploro toda la superficie: encuentro dolor al palpar las costillas del lado derecho, que no había mencionado. Pido analgesia conforme a mi alcance y al protocolo.', va: 'n5', tipo: 'correcta', retro: 'Las lesiones se acumulan y el paciente puede no referir la que le duele menos. Las fracturas costales limitan la ventilación de un paciente sin margen, y el dolor mal controlado la empeora.', tema: 'm6-mg-traumatismo' },
          { signos: { fr: 28, spo2: 89 }, texto: 'Me centro en la muñeca, que es lo que ella refiere.', va: 'n5', tipo: 'riesgo', retro: 'Lo que más se pasa por alto es la lesión que el paciente no refiere porque tiene otra que le duele más. Se encuentra explorando, no deduciendo.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n5: {
        signos: { temp: 35.4 },
        texto: 'El suelo del baño, donde estuvo tendida, está helado. ¿Qué haces?',
        opciones: [
          { signos: { temp: 35.8 }, texto: 'Empiezo ya la prevención activa de la hipotermia y anoto cuánto tiempo estuvo en el suelo.', va: 'n6', tipo: 'correcta', retro: 'La prevención activa de la hipotermia empieza desde el primer minuto, y el tiempo en el suelo es un dato de la entrega.', tema: 'm6-mg-traumatismo' },
          { signos: { temp: 35.0 }, texto: 'Me ocupo del frío cuando estemos en la ambulancia.', va: 'n6', tipo: 'riesgo', retro: 'La prevención de la hipotermia es activa y empieza desde el primer minuto, no al llegar a la unidad.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n6: {
        texto: 'Por el mecanismo decides estabilizar la columna. Tiene la espalda muy encorvada y no puede apoyar la cabeza en plano. ¿Cómo la preparas?',
        opciones: [
          { signos: { fc: 90 }, texto: 'Respeto la curvatura y relleno los huecos, acolcho generosamente, uso estabilización adaptada en vez de un collarín que no ajusta, y la levanto en lugar de arrastrarla.', va: 'n7', tipo: 'correcta', retro: 'Se respeta la cifosis rellenando huecos en lugar de forzar la alineación, se acolcha porque una superficie rígida lesiona la piel frágil en minutos, y se levanta en vez de arrastrar.', tema: 'm6-mg-traumatismo' },
          { signos: { fr: 28, spo2: 90, piel: 'fría, enrojecimiento en zonas de apoyo' }, texto: 'La alineo sobre la tabla rígida sin acolchar, le pongo el collarín estándar y la deslizo a la camilla.', va: 'n7', tipo: 'riesgo', retro: 'Forzar la alineación en una columna rígida, una superficie sin acolchar y arrastrar a la paciente lesionan la piel frágil, y el dispositivo puede limitar la expansión torácica.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n7: {
        texto: 'Antes de salir, tu compañero comenta que es una simple caída en el baño, nada más. ¿Investigas la causa?',
        opciones: [
          { texto: 'Sí: le pregunto si notó algo antes de caer, si perdió el conocimiento, si se mareó al levantarse, si ha tenido caídas recientes y si cambió algo de su medicación; y mido la glucemia si está en mi alcance.', va: 'n8', tipo: 'correcta', retro: 'Investigar la caída forma parte del manejo del trauma: la lesión que se ve puede ser la consecuencia, no el problema.', tema: 'm6-mg-traumatismo' },
          { texto: 'No: lo importante son las lesiones; la causa no es asunto nuestro.', va: 'n8', tipo: 'riesgo', retro: 'Un paciente al que se le trata la lesión y se le devuelve a una casa donde volverá a caerse no ha sido atendido del todo.', tema: 'm6-mg-traumatismo' },
        ],
      },
      n8: {
        signos: { fc: 94 },
        texto: 'Toca decidir el destino y preparar la entrega.',
        opciones: [
          { texto: 'Traslado con umbral bajo a un centro con capacidad de trauma, conforme a la guía de triaje y al protocolo, reevaluando a menudo; en la entrega comunico mecanismo y altura, anticoagulación, cifras habituales frente a las obtenidas, tiempo en el suelo, sospecha sobre la causa y situación previa.', va: 'fin_bien', tipo: 'correcta', retro: 'Es el destino y la entrega que pide la lección: la anticoagulación se comunica de forma explícita y las cifras se presentan frente a las habituales.', tema: 'm6-mg-traumatismo' },
          { signos: { avdi: 'V' }, texto: 'La llevo al centro más cercano y entrego «caída en el baño con fractura de muñeca, estable».', va: 'fin_mal', tipo: 'riesgo', retro: 'El traslado se decide con umbral bajo y la entrega omite lo que más se pasa por alto: la anticoagulación con traumatismo craneal, las costillas y el tiempo en el suelo.', tema: 'm6-mg-traumatismo' },
        ],
      },
      fin_bien: {
        signos: { avdi: 'A', fc: 88, fr: 20, spo2: 95 },
        fin: true,
        desenlace: 'favorable',
        texto: 'La paciente llega a un centro con capacidad de trauma, abrigada, bien acolchada y con un informe que destaca la anticoagulación y la herida en la frente. Allí sabrán vigilar un sangrado que puede crecer despacio y seguir la pista de por qué se cayó.',
      },
      fin_mal: {
        signos: { avdi: 'D', spo2: 91 },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Horas después la paciente está cada vez más somnolienta. Nadie sabía que estaba anticoagulada: la hemorragia intracraneal de crecimiento lento era justo lo que el informe tenía que poner en lugar visible.',
      },
    },
  },
]
