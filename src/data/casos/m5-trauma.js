// ============================================================
//  Casos del Módulo 5 · Trauma y lesiones ambientales — BORRADORES
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
//  Sin dosis ni volúmenes: las lecciones no los fijan y los remiten al
//  protocolo del servicio. La descompresión con aguja aparece solo como la
//  enmarca su lección: procedimiento reglado que depende de certificación,
//  equipamiento y dirección médica. Los signos del monitor son ilustrativos;
//  la temperatura del golpe de calor se muestra como texto porque su lección
//  no publica umbrales y la unidad del caso no lleva termómetro central.
//
//  Exploración activa (06-10-2026): el texto de cada nodo solo cuenta lo que
//  se ve de un vistazo. Signos, conciencia y lo que dicen el paciente
//  (`historia`) y los testigos (`testigos`) los obtiene el alumno explorando
//  (src/lib/exploracion.js).
//
//  Lecciones que sostienen cada caso: src/data/contenido/m5-shock.js,
//  src/data/contenido/m5-torax.js y src/data/contenido/m5-ambientales.js.
// ============================================================

const PHTLS_9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Misma fuente que las lecciones de shock hipovolémico y neumotórax a tensión. Capítulo y '
    + 'página PENDIENTES, igual que en esas lecciones: solo puede precisarlos quien consulte la copia '
    + 'licenciada de la academia.',
}
const AHA_PA_HEMORRAGIA = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid. Circulation, 2024. DOI 10.1161/CIR.0000000000001281.',
  nota: 'Misma fuente que la lección de shock hipovolémico: control de la hemorragia que amenaza la '
    + 'vida con presión directa seguida de torniquete o empaquetamiento.',
}
const AHA_PA_CALOR = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  nota: 'Misma fuente que la lección de golpe de calor. Apartado exacto PENDIENTE, igual que en la lección.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, equipamiento y dirección médica de la academia R.E.S.C.A.T.E.',
  nota: 'Misma fuente local, pendiente de entrega, que cita la lección: fija el método de enfriamiento '
    + 'disponible, los fluidos y el destino.',
}

export default [
  {
    id: 'caso-m5-shock-hemorragico',
    titulo: 'Atropellado en el cruce',
    resumen: 'Un peatón atropellado sangra de un brazo y tiene el muslo deformado. Cerrar la llave, reconocer la etapa del shock y trasladar sin demora.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    temas: ['m5-hs-hipovolemico'],
    fuentes: [PHTLS_9, AHA_PA_HEMORRAGIA],
    historia: 'Me atropelló un coche al cruzar… me duele mucho la pierna izquierda. ¿Me voy a morir?',
    testigos: 'El coche lo golpeó cuando cruzaba y cayó al asfalto. Desde entonces el brazo no ha dejado de sangrarle.',
    signos: { avdi: 'A', fc: 124, fr: 24, spo2: 95, ta: '112/76', piel: 'pálida, fría, sudorosa' },
    // Versiones (src/lib/variacion.js): siempre un peatón adulto atropellado,
    // con un antebrazo que sangra y el muslo contrario deformado; cambian el
    // vehículo, la escena, el lado y quién cuenta lo ocurrido.
    variantes: [
      {
        etiqueta: 'Cruce de avenida',
        historia: 'Un coche me atropelló cuando cruzaba… la pierna izquierda me duele muchísimo. ¿Me voy a morir?',
        testigos: 'El coche lo golpeó mientras cruzaba y cayó al asfalto. El brazo le sangra sin parar desde entonces.',
        nodos: {
          n1: { texto: 'Llegas con tu compañero a un cruce: un automóvil atropelló a un hombre de unos treinta años y la policía ya aseguró la escena. Está tendido en el asfalto; del antebrazo derecho sale sangre a chorro y tiene el muslo izquierdo deformado. ¿Por dónde empiezas?' },
        },
      },
      {
        etiqueta: 'Noche de lluvia, camioneta',
        signos: { fc: 128, ta: '110/74' },
        historia: 'La camioneta no frenó… me duele muchísimo la pierna derecha. ¿Me voy a morir?',
        testigos: 'Iba cruzando por la raya y la camioneta se lo llevó; cayó al pavimento. El brazo le sangra sin parar desde entonces.',
        nodos: {
          n1: { texto: 'Es de noche y llueve. Llegas a un paso peatonal donde una camioneta atropelló a un hombre de unos cuarenta y cinco años; la policía ya cerró el carril. Está tendido en el asfalto mojado; del antebrazo izquierdo sale sangre a chorro y el muslo derecho está deformado. ¿Por dónde empiezas?' },
          n1_retraso: { texto: 'Mientras te ocupas de otra cosa, la sangre del brazo se mezcla con el agua del pavimento y el charco no deja de crecer. El paciente se retuerce en el suelo. ¿Qué haces?' },
          n4: { texto: 'El brazo ya no sangra y no ves más sangre fuera. El muslo derecho está deformado y más abultado que el otro. Con lo que has explorado, ¿qué piensas?' },
          n5: { texto: 'El paciente sigue tendido en el asfalto mojado, con la ropa empapada de lluvia y de sangre. Empieza a temblar. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Entrada del mercado, microbús',
        signos: { fc: 118, ta: '116/78' },
        historia: 'El micro me aventó… la pierna izquierda me duele horrible. ¿Me voy a morir?',
        testigos: 'Venía cargando cajas y el microbús lo golpeó al dar la vuelta; cayó al asfalto. Desde ese momento el brazo no ha dejado de sangrar.',
        nodos: {
          n1: { texto: 'Llegas a la entrada de un mercado donde un microbús atropelló a un joven de unos veinte años. La policía ya desvió el tránsito. Está tendido en el asfalto entre cajas de fruta; del antebrazo derecho sale sangre a chorro y el muslo izquierdo está deformado. ¿Por dónde empiezas?' },
          n1_retraso: { texto: 'Mientras te ocupas de otra cosa, el charco bajo el brazo se extiende entre las cajas. El joven se revuelve sobre el asfalto. ¿Qué haces?' },
          n4: { texto: 'El brazo ya no sangra y no ves más sangre fuera. El muslo izquierdo sigue deformado y se ve más grueso que el otro. Con lo que has explorado, ¿qué piensas?' },
          n5: { texto: 'El joven sigue tendido sobre el asfalto, con la camiseta empapada de sangre. Empieza a temblar. ¿Qué haces?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Llegas con tu compañero a un cruce donde un automóvil atropelló a un hombre de unos treinta años. La escena ya está asegurada por la policía. El paciente está tendido en el asfalto; del antebrazo derecho sale sangre a chorro y el muslo izquierdo está deformado. ¿Por dónde empiezas?',
        opciones: [
          { texto: 'Por la hemorragia: presión directa firme y sostenida sobre el punto que sangra en el antebrazo.', va: 'n2', tipo: 'correcta', retro: 'Primero se cierra la llave. El control de la hemorragia externa va antes que todo lo demás: es la razón de que la X vaya delante del ABCDE en trauma.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 132, ta: '104/70' }, texto: 'Por la vía aérea y la respiración, como en el ABC clásico, y después veo el brazo.', va: 'n1_retraso', tipo: 'riesgo', retro: 'En trauma la X va delante del ABCDE: una hemorragia que sigue saliendo se atiende antes que lo demás.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 134, ta: '102/68' }, texto: 'Canalizo un acceso venoso y empiezo a reponer volumen antes de tocar la herida.', va: 'n1_retraso', tipo: 'riesgo', retro: 'De nada sirve reponer líquido si la sangre sigue saliendo: el volumen no repone lo que se sigue perdiendo, y diluir la sangre empeora la coagulación.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n1_retraso: {
        signos: { piel: 'pálida, fría, moteada' },
        texto: 'Mientras te ocupas de otra cosa, el charco bajo el brazo sigue creciendo. El paciente se revuelve sobre el asfalto. ¿Qué haces?',
        opciones: [
          { texto: 'Lo dejo todo y aplico presión directa sobre el punto que sangra.', va: 'n2', tipo: 'aceptable', retro: 'Rectificas, pero tarde: el control de la hemorragia externa es lo primero y lo perdido en el suelo ya no se recupera.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 146, ta: '80/50', avdi: 'V' }, texto: 'Termino lo que estaba haciendo y después atiendo el brazo.', va: 'fin_mal', tipo: 'riesgo', retro: 'La secuencia es control de la hemorragia externa, después oxigenación, después el resto. Alterarla deja seguir el sangrado.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n2: {
        signos: { fc: 126 },
        texto: 'Mantienes presión firme, pero la sangre sigue brotando entre los apósitos. ¿Qué haces?',
        opciones: [
          { signos: { fc: 120 }, texto: 'Coloco un torniquete en el brazo: es una extremidad y la presión no controla.', va: 'n3', tipo: 'correcta', retro: 'Es la secuencia de la lección: presión directa y, si es una extremidad y la presión no controla, torniquete.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 132, ta: '100/66' }, texto: 'Sigo presionando y espero a que pare sola.', va: 'n3', tipo: 'riesgo', retro: 'Si la presión no controla el sangrado de una extremidad, el siguiente paso es el torniquete. Esperar deja seguir la pérdida.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n3: {
        signos: { piel: 'pálida, fría, sudorosa; relleno capilar lento' },
        texto: 'El sangrado del brazo por fin está controlado. Con lo que has explorado, ¿cómo interpretas su estado?',
        opciones: [
          { texto: 'Shock hipovolémico en etapa moderada: taquicardia con presión aún compensada.', va: 'n4', tipo: 'correcta', retro: 'Taquicardia, presión normal compensada, inquietud, piel pálida fría y sudorosa y relleno lento describen la etapa moderada. La hipotensión es un signo tardío.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 134 }, texto: 'Con la presión normal no está en shock: la taquicardia es por el dolor.', va: 'n4', tipo: 'riesgo', retro: 'La presión es un indicador tardío. No hace falta medir nada: frecuencia cardiaca, estado mental y piel cuentan la historia, y aquí cuentan un shock.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n4: {
        signos: { fc: 132, ta: '106/72' },
        texto: 'El brazo ya no sangra y no ves más sangre fuera. El muslo izquierdo está deformado y aumentado de volumen. Con lo que has explorado, ¿qué piensas?',
        opciones: [
          { texto: 'Pienso en sangrado oculto: el muslo con fractura de fémur puede retener más de un litro. Reviso mentalmente tórax, abdomen, pelvis, muslos y el suelo.', va: 'n5', tipo: 'correcta', retro: 'En todo shock sin sangrado externo evidente se revisan los cinco escondites: tórax, abdomen, retroperitoneo y pelvis, muslos y el suelo de la escena. Una fractura de fémur puede retener más de un litro.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 138 }, texto: 'Como ya no sangra por fuera, la hemorragia está resuelta.', va: 'n5', tipo: 'riesgo', retro: 'Un paciente puede desangrarse sin que se vea una gota. Buscar solo el sangrado que se ve es un error frecuente.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n5: {
        signos: { ta: '104/70' },
        texto: 'El paciente está tendido sobre el asfalto, con la ropa empapada de sangre. Empieza a temblar. ¿Qué haces?',
        opciones: [
          { signos: { spo2: 98, piel: 'pálida, fría' }, texto: 'Doy oxígeno y prevengo activamente la hipotermia: retiro la ropa mojada, lo cubro y lo aíslo del suelo.', va: 'n6', tipo: 'correcta', retro: 'Tras cerrar la llave van el oxígeno y la prevención activa de la hipotermia. El paciente frío coagula peor y sangra más: abrigarlo es tratamiento, no confort.', tema: 'm5-hs-hipovolemico' },
          { signos: { piel: 'fría, moteada' }, texto: 'Lo dejo descubierto para poder reevaluarlo mejor; abrigar es solo comodidad.', va: 'n6', tipo: 'riesgo', retro: 'La tríada letal —hipotermia, acidosis y coagulopatía— se alimenta a sí misma. Tratar la hipotermia como confort es un error frecuente.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n6: {
        texto: 'El sangrado externo está controlado y el muslo sigue deformado. ¿Qué haces ahora?',
        opciones: [
          { signos: { fc: 136 }, texto: 'Traslado sin demora y sigo reevaluando en ruta.', va: 'n7', tipo: 'correcta', retro: 'La hemorragia interna solo se resuelve en quirófano: el traslado sin demora es parte del tratamiento.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 142, ta: '88/58' }, texto: 'Me quedo en la escena hasta completar la reposición de volumen y que la presión mejore.', va: 'n6_demora', tipo: 'riesgo', retro: 'El volumen no cierra lo que sangra por dentro. La hemorragia interna solo se resuelve en quirófano; quedarse en la escena consume ese tiempo.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n6_demora: {
        // Ya no sabe bien dónde está: ojos abiertos, confuso, obedece.
        signos: { avdi: 'A', glasgow: 'O4V4M6', piel: 'pálida, fría, moteada' },
        historia: '¿Dónde estoy? ¿Qué me pasó?',
        texto: 'Pasan los minutos en la escena mientras se repone volumen. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Subo al paciente y salgo de inmediato.', va: 'n7', tipo: 'aceptable', retro: 'Es la decisión correcta, aunque tardía: el sangrado oculto seguía mientras se esperaba en la escena.', tema: 'm5-hs-hipovolemico' },
          { signos: { fc: 150, ta: '70/40', avdi: 'D' }, texto: 'Insisto en reponer volumen antes de moverlo.', va: 'fin_mal', tipo: 'riesgo', retro: 'De nada sirve reponer líquido si la sangre sigue saliendo, y la hemorragia interna solo se resuelve en quirófano.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      n7: {
        // Etapa grave: confuso, no sabe dónde está, pero abre los ojos y obedece.
        signos: { avdi: 'A', glasgow: 'O4V4M6', fc: 140, ta: '90/60', piel: 'pálida, fría, moteada' },
        historia: '¿Dónde estoy? ¿Adónde me llevan?',
        texto: 'Vas en ruta. Reevalúas al paciente. Con lo que has explorado, ¿qué etapa reconoces?',
        opciones: [
          { texto: 'Pasó a la etapa grave: taquicardia marcada, presión descendida, confusión y piel moteada. Mantengo el abrigo y el oxígeno y aviso del cambio al llegar.', va: 'fin_bien', tipo: 'correcta', retro: 'Es la descripción de la etapa grave. Reconocer el cambio de etapa es lo que permite transmitir la urgencia real.', tema: 'm5-hs-hipovolemico' },
          { texto: 'Sigue compensado: la presión todavía se puede medir.', va: 'fin_bien', tipo: 'riesgo', retro: 'Presión descendida y confusión ya no son compensación: son la etapa grave. La crítica es la de presión muy baja o no medible.', tema: 'm5-hs-hipovolemico' },
        ],
      },
      fin_bien: {
        signos: { fc: 136, ta: '92/60' },
        fin: true,
        desenlace: 'favorable',
        texto: 'Llegas al hospital con la hemorragia externa controlada, el paciente oxigenado y abrigado, y la sospecha de sangrado en el muslo transmitida. El tiempo en escena fue el mínimo: la hemorragia interna se resolverá en quirófano.',
      },
      fin_mal: {
        signos: { fc: 152, ta: 'no medible', avdi: 'I', piel: 'fría, cianótica' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El paciente llega a la etapa crítica: presión muy baja o no medible e inconsciencia. Se perdió el tiempo que había que dedicar a cerrar la llave y a trasladar.',
      },
    },
  },

  {
    id: 'caso-m5-neumotorax-tension',
    titulo: 'Le cuesta cada vez más respirar',
    resumen: 'Conductor con trauma torácico cerrado que se deteriora en la escena. Reconocer el neumotórax a tensión sin imagen, actuar según protocolo y vigilar la recidiva.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    temas: ['m5-tt-neumotorax-tension'],
    fuentes: [PHTLS_9],
    historia: 'Me pegué con el volante del lado izquierdo del pecho… me falta el aire, cada vez más.',
    signos: { avdi: 'A', fc: 116, fr: 30, spo2: 91, ta: '108/72', piel: 'pálida', torax: 'hemitórax izquierdo hipertimpánico a la percusión; yugulares no ingurgitadas; tráquea centrada' },
    // Versiones (src/lib/variacion.js): siempre un conductor adulto golpeado
    // contra el volante del lado izquierdo, con una herida en la pierna que
    // sangró antes de llegar (por eso faltan las yugulares ingurgitadas) y un
    // servicio que lo certifica para descomprimir. Cambian el choque y la escena.
    variantes: [
      {
        etiqueta: 'Choque frontal en avenida',
        historia: 'Me di con el volante en el lado izquierdo del pecho… me falta el aire, cada vez más.',
        nodos: {
          n1: { texto: 'Choque frontal en una avenida. El conductor, de unos cuarenta años, está sentado junto a su coche y se le ve agitado; el volante quedó deformado. Tu servicio te tiene certificado para la descompresión con aguja, la unidad lleva el material y la dirección médica respalda el protocolo. ¿Qué haces primero?' },
        },
      },
      {
        etiqueta: 'Camioneta de reparto en carretera',
        signos: { fc: 120, spo2: 90, ta: '104/70' },
        historia: 'Me di contra el volante, aquí, del lado izquierdo del pecho… cada vez me falta más el aire.',
        testigos: 'Yo venía atrás. La camioneta se le fue encima al camión parado y él se bajó solo, sujetándose el pecho.',
        nodos: {
          n1: { texto: 'Una camioneta de reparto se estrelló de frente contra un camión detenido en la carretera. El conductor, de unos cincuenta y cinco años, logró bajar y está sentado en la cuneta, agitado; dentro, el volante quedó deformado. Tu servicio te tiene certificado para la descompresión con aguja, la unidad lleva el material y la dirección médica respalda el protocolo. ¿Qué haces primero?' },
          n2: { texto: 'Sigue agitado en la cuneta. En la pierna tiene una herida por los vidrios que sangró bastante antes de que llegaras. Con lo que has explorado, ¿cómo lo interpretas?' },
          n2_espera: { texto: 'Pasan unos minutos. El conductor está cada vez más inquieto en la cuneta. Con lo que has explorado, ¿qué haces?' },
        },
      },
      {
        etiqueta: 'Taxi contra un poste',
        signos: { fc: 112, fr: 28, spo2: 92, ta: '112/74' },
        historia: 'Me fui contra el volante… me pegué en el lado izquierdo del pecho y me falta el aire, cada vez más.',
        testigos: 'El taxi se subió a la banqueta y pegó contra el poste. El chofer salió por su propio pie, pero ya no se pudo levantar de la banqueta.',
        nodos: {
          n1: { texto: 'Un taxi chocó de frente contra un poste en una calle del centro. El taxista, de unos treinta años, está sentado en la banqueta junto al coche, agitado; el volante está doblado. Tu servicio te tiene certificado para la descompresión con aguja, la unidad lleva el material y la dirección médica respalda el protocolo. ¿Qué haces primero?' },
          n2: { texto: 'El taxista sigue agitado en la banqueta. Tiene una herida en la pierna que sangró bastante antes de que llegaras. Con lo que has explorado, ¿cómo lo interpretas?' },
          n2_espera: { texto: 'Pasan unos minutos. El taxista se agita cada vez más. Con lo que has explorado, ¿qué haces?' },
          n3_error: { texto: 'Pasan los minutos. El taxista deja caer la cabeza hacia el pecho. Con lo que has explorado, ¿qué haces?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Choque frontal. El conductor, de unos cuarenta años, está sentado junto a su coche, agitado; el volante está deformado. Tu servicio te tiene certificado para la descompresión con aguja, la unidad lleva el material y la dirección médica respalda el protocolo. ¿Qué haces primero?',
        opciones: [
          { signos: { spo2: 93 }, texto: 'Oxígeno a alto flujo y exploro el tórax: ruidos respiratorios, percusión y cuello.', va: 'n2', tipo: 'correcta', retro: 'La disnea creciente y la agitación son los signos más precoces. El diagnóstico es clínico: se busca con la exploración, no con imagen.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { spo2: 88, fc: 124 }, texto: 'Lo inmovilizo y lo subo rápido; la exploración la hará el hospital.', va: 'n2', tipo: 'riesgo', retro: 'El neumotórax a tensión se diagnostica clínicamente y se trata en la escena. Sin explorar el tórax no se puede reconocer.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n2: {
        signos: { fc: 132, fr: '34; no se oyen ruidos respiratorios en el hemitórax izquierdo', spo2: 86, ta: '88/58' },
        historia: 'No puedo… no me entra el aire.',
        texto: 'El paciente sigue agitado. En la pierna tiene una herida que sangró bastante antes de que llegaras. Con lo que has explorado, ¿cómo lo interpretas?',
        opciones: [
          { signos: { fc: 136, spo2: 85 }, texto: 'Es un neumotórax a tensión: la ingurgitación puede faltar si está sangrando y la desviación traqueal es tardía.', va: 'n3', tipo: 'correcta', retro: 'Ruidos ausentes, hipertimpanismo, taquicardia e hipotensión bastan. La ingurgitación yugular puede no estar si hay hipovolemia, y la desviación traqueal es un signo tardío que no se espera.', tema: 'm5-tt-neumotorax-tension' },
          { texto: 'Sin yugulares ingurgitadas ni tráquea desviada no puede ser un neumotórax a tensión.', va: 'n2_espera', tipo: 'riesgo', retro: 'Descartarlo por falta de ingurgitación es un error frecuente: la hipovolemia coexistente borra ese signo. Y esperar la desviación traqueal es llegar tarde.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n2_espera: {
        signos: { fc: 146, fr: '38; no se oyen ruidos respiratorios en el hemitórax izquierdo', spo2: 80, ta: '72/44', piel: 'gris, sudorosa', torax: 'hemitórax izquierdo hipertimpánico; tráquea desviada a la derecha' },
        texto: 'Pasan unos minutos. El paciente se agita cada vez más. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Ahora lo reconozco como neumotórax a tensión y actúo de inmediato.', va: 'n3', tipo: 'aceptable', retro: 'El diagnóstico es correcto, pero llega tarde: la desviación traqueal es el signo más tardío, y cada minuto de obstrucción del retorno venoso cuenta.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { avdi: 'D', ta: '60/36' }, texto: 'Lo traslado para que una radiografía lo confirme.', va: 'fin_mal', tipo: 'riesgo', retro: 'No se traslada a un paciente con neumotórax a tensión para confirmarlo con una radiografía: el diagnóstico es clínico y mata en minutos.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n3: {
        texto: 'Tienes el cuadro. ¿Cuál es el tratamiento?',
        opciones: [
          { signos: { fc: 112, fr: 26, spo2: 94, ta: '104/68', piel: 'pálida' }, texto: 'Descompresión con aguja en el hemitórax izquierdo, en el sitio y con el material que marca el protocolo del servicio.', va: 'n4', tipo: 'correcta', retro: 'El tratamiento es la descompresión y se hace en la escena. Técnica, calibre, longitud y sitio los fija el protocolo; y solo la ejecuta quien está certificado, con el equipo de la unidad y el respaldo de la dirección médica, como en este caso.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { fc: 148, spo2: 80, ta: '70/42' }, texto: 'Cargo líquidos y observo cómo responde.', va: 'n3_error', tipo: 'riesgo', retro: 'El problema es mecánico: el desplazamiento del mediastino acoda las cavas y bloquea el retorno venoso. Los líquidos no lo resuelven; la descompresión sí.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { fc: 148, spo2: 80, ta: '70/42' }, texto: 'Lo traslado para que una radiografía confirme el diagnóstico.', va: 'n3_error', tipo: 'riesgo', retro: 'El diagnóstico es clínico y el tratamiento no espera al hospital. No se traslada para confirmar con imagen.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n3_error: {
        signos: { avdi: 'V', piel: 'gris, sudorosa' },
        texto: 'Pasan los minutos. El paciente deja caer la cabeza sobre el pecho. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { avdi: 'A', fc: 118, fr: 28, spo2: 92, ta: '98/64', piel: 'pálida' }, texto: 'Descomprimo según protocolo sin más demora.', va: 'n4', tipo: 'aceptable', retro: 'Rectificas: la descompresión en la escena es el tratamiento. Cada minuto perdido fue de retorno venoso bloqueado.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { avdi: 'I', ta: 'no medible' }, texto: 'Sigo con lo que estaba haciendo.', va: 'fin_mal', tipo: 'riesgo', retro: 'El neumotórax a tensión mata en minutos porque obstruye el retorno venoso al corazón. Sin descompresión no mejora.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n4: {
        historia: 'Ya me entra mejor el aire…',
        texto: 'Has completado la descompresión. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Reevalúo de inmediato, mantengo el oxígeno a alto flujo y vigilo el catéter.', va: 'n5', tipo: 'correcta', retro: 'Tras descomprimir se reevalúa de inmediato —la mejoría suele ser evidente y rápida— y se vigila la recidiva: el catéter puede acodarse u obstruirse.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { spo2: 90 }, texto: 'Ya está resuelto: retiro el oxígeno y dejo de vigilar el tórax.', va: 'n5', tipo: 'riesgo', retro: 'La descompresión es temporal. Se mantiene el oxígeno a alto flujo y se vigila la recidiva por acodamiento u obstrucción del catéter.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n5: {
        signos: { fc: 130, fr: '32; vuelven a faltar los ruidos respiratorios en el hemitórax izquierdo', spo2: 87, ta: '86/56' },
        historia: 'Otra vez me falta el aire…',
        texto: 'Ya en la ambulancia, en ruta. El paciente vuelve a agitarse y se lleva la mano al pecho. Con lo que has explorado, ¿qué piensas?',
        opciones: [
          { signos: { fc: 114, fr: 26, spo2: 93, ta: '100/66' }, texto: 'Pienso que el catéter se acodó u obstruyó y la tensión se reacumuló: reevalúo y, si procede, repito la descompresión según protocolo.', va: 'n6', tipo: 'correcta', retro: 'Los catéteres finos se acodan y obstruyen con facilidad. La recidiva obliga a reevaluar y, si procede, repetir la descompresión.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { fc: 144, spo2: 82, ta: '74/46' }, texto: 'El diagnóstico era incorrecto: no era un neumotórax a tensión.', va: 'n6', tipo: 'riesgo', retro: 'La mejoría tras descomprimir confirmó el cuadro. Deteriorarse después sugiere primero un catéter acodado u obstruido, no un error diagnóstico.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { fc: 144, spo2: 82, ta: '74/46' }, texto: 'Descomprimo el hemitórax derecho.', va: 'n6', tipo: 'riesgo', retro: 'Los hallazgos estaban en el hemitórax izquierdo. Lo primero que se piensa es que el catéter se acodó u obstruyó.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      n6: {
        texto: '¿Cómo planteas el resto del traslado?',
        opciones: [
          { texto: 'Traslado urgente: la descompresión es temporal y el tratamiento definitivo es el drenaje torácico.', va: 'fin_bien', tipo: 'correcta', retro: 'La descompresión con aguja convierte el neumotórax a tensión en uno simple, pero es temporal: el definitivo es el drenaje torácico.', tema: 'm5-tt-neumotorax-tension' },
          { signos: { fc: 140, spo2: 84, ta: '80/50' }, texto: 'Sin prisa: con la aguja colocada el problema está resuelto.', va: 'fin_mal', tipo: 'riesgo', retro: 'La aguja no es tratamiento definitivo y puede volver a acodarse u obstruirse. El traslado es urgente.', tema: 'm5-tt-neumotorax-tension' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Llegas al hospital con el paciente descomprimido, oxigenado y reevaluado de forma continua. Entregas los hallazgos que te llevaron al diagnóstico, la hora de la descompresión y la recidiva que resolviste en ruta. Ahí recibirá el drenaje torácico.',
      },
      fin_mal: {
        signos: { avdi: 'I', fc: 150, spo2: 74, ta: 'no medible', piel: 'gris, cianótica' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El aire siguió acumulándose a presión, el mediastino desplazado bloqueó el retorno venoso y el paciente cayó en shock obstructivo. El diagnóstico era clínico y el tratamiento estaba en la escena.',
      },
    },
  },

  {
    id: 'caso-m5-golpe-de-calor',
    titulo: 'Se puso raro en la obra',
    resumen: 'Un trabajador de la construcción se comporta de forma extraña tras horas al sol. Reconocer el golpe de calor por el estado mental, enfriar primero y trasladar enfriando.',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    temas: ['m5-la-golpe-calor'],
    fuentes: [AHA_PA_CALOR, PROTOCOLO_LOCAL],
    historia: 'Estoy bien, estoy bien… ¿ya terminamos?',
    testigos: 'Lleva horas cargando material al sol. De repente se puso raro: contesta cosas sin sentido y se tambalea.',
    // Alteración del estado mental con ojos abiertos: confuso (V4), obedece.
    signos: { avdi: 'A', glasgow: 'O4V4M6', fc: 138, fr: 28, spo2: 96, ta: '100/62', glucosa: 102, temp: 'sin termómetro central; muy caliente al tacto', piel: 'caliente, empapada en sudor' },
    // Versiones (src/lib/variacion.js): siempre un trabajador adulto de obra,
    // con casco, chaleco y overol, confuso y sudando tras esfuerzo al calor.
    // Cambian la obra, la hora, la edad y lo que dicen él y sus compañeros.
    variantes: [
      {
        etiqueta: 'Mediodía, sacos de cemento',
        historia: 'Estoy bien, estoy bien… ¿ya acabamos?',
        testigos: 'Lleva horas cargando material bajo el sol. De pronto se puso raro: dice cosas sin sentido y se tambalea.',
        nodos: {
          n1: { texto: 'Mediodía en una obra, en plena ola de calor. Un trabajador de unos treinta años, con casco, chaleco y overol, está sentado sobre unos sacos de cemento; sus compañeros te llaman a gritos. Con lo que has explorado, ¿cómo lo interpretas?' },
        },
      },
      {
        etiqueta: 'Azotea, colado de losa',
        signos: { fc: 142, ta: '96/60' },
        historia: 'Ya voy, ya voy… ¿dónde dejé la cubeta?',
        testigos: 'Desde la mañana estamos colando la losa bajo el sol. Hace rato empezó a decir cosas raras y a caminar chueco; casi se va por la orilla.',
        nodos: {
          n1: { texto: 'Primera hora de la tarde, ola de calor. En la azotea de un edificio en obra, donde cuelan una losa, un trabajador de unos cuarenta y cinco años con casco, chaleco y overol está sentado contra un tinaco; sus compañeros te llaman a gritos desde la escalera. Con lo que has explorado, ¿cómo lo interpretas?' },
          n1_error: { texto: 'A la sombra del tinaco, un compañero le acerca una botella de agua, pero el trabajador no la sostiene. ¿Qué haces?' },
          n2: { texto: 'Tu unidad no lleva un termómetro adecuado para medir la temperatura central. El maestro de obra saca unas pastillas para la fiebre y te las ofrece. ¿Qué haces?' },
          n3: { texto: 'Hay que enfriarlo. En la azotea no hay donde sumergirlo de forma segura; subiste agua fría y compresas de la unidad, y el protocolo del servicio autoriza esos métodos. ¿Cómo empiezas?' },
          n4: { texto: 'Sigues enfriándolo, tendido sobre una lona a la sombra del tinaco. Con lo que has explorado, ¿qué haces?' },
          n7: { texto: 'Hay que bajarlo de la azotea y trasladarlo. Subirlo a la camilla obliga a mover el material de enfriamiento. ¿Cómo lo trasladas?' },
        },
      },
      {
        etiqueta: 'Pavimentación de una calle',
        signos: { fc: 134, ta: '104/66' },
        historia: 'No pasa nada, jefe… ya me toca descanso, ¿verdad?',
        testigos: 'Lleva desde temprano tendiendo mezcla al sol. De repente empezó a decir cosas que no tienen sentido y a tambalearse.',
        nodos: {
          n1: { texto: 'Tres de la tarde, ola de calor, en una calle en obra de pavimentación. Un trabajador joven, de unos veinte años, con casco, chaleco y overol, está sentado en la orilla de la banqueta junto a la maquinaria; sus compañeros te llaman a gritos. Con lo que has explorado, ¿cómo lo interpretas?' },
          n1_error: { texto: 'A la sombra de un árbol de la banqueta, un compañero le acerca una botella de agua, pero el trabajador no la sostiene. ¿Qué haces?' },
          n2: { texto: 'Tu unidad no lleva un termómetro adecuado para medir la temperatura central. Un compañero de obra le ofrece unas pastillas para la fiebre. ¿Qué haces?' },
          n4: { texto: 'Sigues enfriándolo, tendido sobre una lona a la sombra de la unidad. Con lo que has explorado, ¿qué haces?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Mediodía en una obra, ola de calor. Un trabajador de unos treinta años, con casco, chaleco y overol, está sentado sobre unos sacos de cemento; sus compañeros te llaman a gritos. Con lo que has explorado, ¿cómo lo interpretas?',
        opciones: [
          { texto: 'Golpe de calor hasta que se demuestre otra cosa: tiene alterado el estado mental tras esfuerzo con calor.', va: 'n2', tipo: 'correcta', retro: 'El dato que decide es la alteración del estado mental en un paciente expuesto a calor o tras un esfuerzo. Que sude no lo descarta: en el golpe de calor por esfuerzo con frecuencia sigue sudando.', tema: 'm5-la-golpe-calor' },
          { signos: { avdi: 'V' }, texto: 'Como suda mucho, es agotamiento por calor: reposo a la sombra y que tome agua.', va: 'n1_error', tipo: 'riesgo', retro: 'La piel seca es un mito peligroso. El agotamiento por calor conserva el estado mental; este paciente lo tiene alterado. Descartarlo porque suda retrasa el enfriamiento.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n1_error: {
        // Abre los ojos a la voz y solo balbucea palabras sueltas.
        signos: { avdi: 'V', glasgow: 'O3V3M6', fc: 146, ta: '92/56' },
        texto: 'A la sombra, un compañero le acerca una botella de agua, pero el trabajador no la sostiene. ¿Qué haces?',
        opciones: [
          { texto: 'Retiro la botella: con la conciencia alterada no se da nada por boca. Lo trato como golpe de calor y empiezo a enfriar.', va: 'n3', tipo: 'aceptable', retro: 'Rectificas: con el estado mental alterado es golpe de calor y no se administra nada por vía oral. El enfriamiento empieza tarde.', tema: 'm5-la-golpe-calor' },
          { signos: { avdi: 'D', fc: 152, ta: '84/50' }, texto: 'Le ayudo a beber y espero a que se recupere con el reposo.', va: 'fin_mal', tipo: 'riesgo', retro: 'No se administra nada por vía oral a un paciente con la conciencia alterada, y el golpe de calor no se resuelve con reposo: el tratamiento es enfriar.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n2: {
        signos: { fc: 140 },
        texto: 'Tu unidad no lleva un termómetro adecuado para medir la temperatura central. Un compañero de obra ofrece unas pastillas para la fiebre. ¿Qué haces?',
        opciones: [
          { texto: 'No espero a medir la temperatura ni doy antitérmicos: empiezo a enfriar ya.', va: 'n3', tipo: 'correcta', retro: 'No se retrasa el enfriamiento para tomar una temperatura sin el termómetro adecuado, y los antitérmicos no sirven: el mecanismo no es el de la fiebre.', tema: 'm5-la-golpe-calor' },
          { signos: { fc: 146, avdi: 'V' }, texto: 'Pido que traigan un termómetro antes de empezar, para confirmar.', va: 'n3', tipo: 'riesgo', retro: 'El criterio es la alteración del estado mental en contexto de calor o esfuerzo. Retrasar el enfriamiento para medir es un error frecuente.', tema: 'm5-la-golpe-calor' },
          { signos: { fc: 146, avdi: 'V' }, texto: 'Acepto las pastillas para bajarle la temperatura.', va: 'n3', tipo: 'riesgo', retro: 'No se administran antitérmicos: el golpe de calor no responde a ellos. Además, con la conciencia alterada no se da nada por boca.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n3: {
        signos: { spo2: 95 },
        texto: 'Hay que enfriarlo. No hay donde sumergirlo de forma segura; en la unidad tienes agua fría y compresas, y el protocolo del servicio autoriza esos métodos. ¿Cómo empiezas?',
        opciones: [
          { signos: { fc: 128, temp: 'sin termómetro central; muy caliente al tacto, algo menos', piel: 'mojada, caliente' }, texto: 'Lo llevo a la sombra, le quito el casco, el chaleco y el overol y aplico agua fría sobre la piel con ventilación.', va: 'n4', tipo: 'correcta', retro: 'Es la secuencia: retirar del ambiente caluroso, quitar la ropa y el equipo que impiden disipar calor e iniciar el enfriamiento con el método autorizado y disponible. La inmersión es la preferente cuando es posible y segura; aquí no lo es.', tema: 'm5-la-golpe-calor' },
          { signos: { fc: 136 }, texto: 'Le pongo compresas frías en zonas de gran circulación, pero le dejo el overol para no desvestirlo en la obra.', va: 'n4', tipo: 'aceptable', retro: 'Las compresas en zonas de gran circulación son uno de los métodos, pero el equipo que impide disipar calor debe retirarse.', tema: 'm5-la-golpe-calor' },
          { signos: { fc: 144 }, texto: 'Le friego el cuerpo con alcohol.', va: 'n4', tipo: 'riesgo', retro: 'No se fricciona con alcohol. El enfriamiento se hace con el método que autorice el protocolo.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n4: {
        // Abre los ojos a la voz fuerte; solo palabras sueltas; ronca a ratos.
        signos: { avdi: 'V', glasgow: 'O3V3M6', fr: '26, con ronquido intermitente' },
        texto: 'Sigues enfriándolo, tendido sobre una lona a la sombra. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fr: 24, spo2: 97 }, texto: 'Me ocupo de la vía aérea, la ventilación y la circulación según mi alcance, y sigo enfriando.', va: 'n5', tipo: 'correcta', retro: 'El paciente con alteración de la conciencia puede no proteger su vía aérea. El soporte se da conforme al alcance, sin interrumpir el enfriamiento.', tema: 'm5-la-golpe-calor' },
          { signos: { spo2: 90 }, texto: 'Me concentro solo en enfriar; la vía aérea ya la verán en el hospital.', va: 'n5', tipo: 'riesgo', retro: 'Con la conciencia alterada el paciente puede no proteger su vía aérea: vía aérea, ventilación y circulación forman parte de la secuencia.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n5: {
        texto: 'Tu compañero pregunta si usa el glucómetro; está dentro de su alcance. ¿Qué le dices?',
        opciones: [
          { texto: 'Sí: la hipoglucemia imita el deterioro neurológico y conviene descartarla.', va: 'n6', tipo: 'correcta', retro: 'Se mide la glucemia si está dentro del alcance porque la hipoglucemia imita el deterioro neurológico. Los accesos y fluidos, según protocolo.', tema: 'm5-la-golpe-calor' },
          { texto: 'No hace falta: está claro que es por el calor.', va: 'n6', tipo: 'aceptable', retro: 'Lo más probable es el golpe de calor, pero la hipoglucemia imita el deterioro neurológico: medirla, si está en el alcance, evita pasarla por alto.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n6: {
        signos: { fc: 120, temp: 'sin termómetro central; menos caliente al tacto', piel: 'mojada, tiritando' },
        texto: 'Con el enfriamiento, el trabajador empieza a tiritar. ¿Qué haces?',
        opciones: [
          { signos: { fc: 116 }, texto: 'Sigo enfriando: la tiritona no es motivo para interrumpir, salvo que el protocolo indique lo contrario.', va: 'n7', tipo: 'correcta', retro: 'No se interrumpe el enfriamiento porque el paciente empiece a tiritar, salvo indicación del protocolo.', tema: 'm5-la-golpe-calor' },
          { signos: { fc: 134, temp: 'sin termómetro central; muy caliente al tacto' }, texto: 'Detengo el enfriamiento y lo abrigo porque ya tiene frío.', va: 'n7', tipo: 'riesgo', retro: 'La tiritona no es motivo para detener el enfriamiento, salvo que el protocolo diga lo contrario. Interrumpirlo devuelve al paciente al riesgo.', tema: 'm5-la-golpe-calor' },
        ],
      },
      n7: {
        texto: 'Hay que trasladarlo. Subirlo a la camilla obliga a mover el material de enfriamiento. ¿Cómo lo trasladas?',
        opciones: [
          { signos: { fc: 112, avdi: 'A', temp: 'sin termómetro central; menos caliente al tacto' }, texto: 'Traslado urgente con prealerta, manteniendo el enfriamiento en ruta y monitorizando por si aparecen convulsiones o arritmias.', va: 'fin_bien', tipo: 'correcta', retro: 'Se traslada enfriando: el enfriamiento no se interrumpe para trasladar. Se monitoriza y se vigilan convulsiones y arritmias, con prealerta.', tema: 'm5-la-golpe-calor' },
          { signos: { fc: 140, avdi: 'D', temp: 'sin termómetro central; muy caliente al tacto' }, texto: 'Suspendo el enfriamiento durante el traslado; lo continuarán en el hospital.', va: 'fin_mal', tipo: 'riesgo', retro: 'El enfriamiento es el tratamiento y su rapidez condiciona el resultado. Interrumpirlo para trasladar es un error frecuente: se traslada enfriando.', tema: 'm5-la-golpe-calor' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'El trabajador llega al hospital enfriándose desde la escena, con la vía aérea vigilada y monitorizado. Entregas cómo empezó, cuándo comenzó el enfriamiento y con qué método.',
      },
      fin_mal: {
        signos: { avdi: 'I', fc: 150, ta: '80/48', temp: 'sin termómetro central; muy caliente al tacto', piel: 'caliente' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El enfriamiento llegó tarde o se interrumpió. En el golpe de calor cada minuto por encima de la temperatura crítica cuenta, y el paciente pierde la respuesta con riesgo vital y de daño de órganos.',
      },
    },
  },
]
