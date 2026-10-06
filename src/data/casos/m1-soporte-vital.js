// ============================================================
//  Casos del Módulo 1 · Primeros auxilios básicos — BORRADORES
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
//  Lecciones que sostienen cada caso: src/data/contenido/m1-propedeutico.js.
// ============================================================

const AHA_BLS_2025 = {
  nombre: 'Kleinman ME, Buick JE, Huber N, et al. Part 7: Adult Basic Life Support: 2025 American '
    + 'Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular '
    + 'Care. Circulation. 2025;152(16_suppl_2):S448-S478.',
  nota: 'PMID 41122888. Misma fuente que las lecciones del caso: secuencia de RCP, parámetros de '
    + 'compresión, uso del DEA y OVACE en el adulto.',
}
const AHA_PRIMEROS_AUXILIOS = {
  nombre: 'Hewett Brumberg EK, Douma MJ, Alibertis K, et al. 2024 American Heart Association and '
    + 'American Red Cross Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.',
  nota: 'PMID 39540278. Misma fuente que la lección de hemorragias: presión directa, '
    + 'empaquetamiento y torniquete en el primer respondiente.',
}

export default [
  {
    id: 'caso-m1-paro-en-la-calle',
    titulo: 'Se desploma en la parada del autobús',
    resumen: 'Un hombre adulto cae de repente frente a ti. Reconocer el paro, activar el SMU, comprimir y usar el DEA.',
    estado: 'borrador',
    temas: ['m1-pab-avdi', 'm1-pab-rcp-legos-adulto', 'm1-pab-dea'],
    fuentes: [AHA_BLS_2025],
    rol: 'lego',
    paciente: 'adulto',
    // Lo que percibe un reanimador lego: sin monitor ni pulso. El ritmo lo
    // analiza el DEA y lo anuncia por voz (texto del nodo), no un monitor.
    signos: { avdi: 'I', fc: 'sin pulso', fr: 'boqueo', spo2: null, ta: null, ritmo: null, piel: 'pálida, sudorosa' },
    // Inconsciente: no puede contar nada (el motor lo dice). Solo el testigo.
    testigos: 'Estaba aquí esperando el autobús conmigo. Se llevó la mano al pecho y se cayó de golpe.',
    // Versiones de la misma escena (lib/variacion.js): cambian quién cae, quién
    // ayuda y cómo se ve la parada. Las opciones y su porqué no cambian.
    variantes: [
      {
        etiqueta: 'Hombre de unos cincuenta, mañana tranquila',
        testigos: 'Estaba esperando el autobús a mi lado. De repente se agarró el pecho y se fue al suelo.',
        nodos: {
          n1: { texto: 'Esperas el autobús a primera hora. Un hombre de unos cincuenta años, de pie a tu lado, se lleva la mano al pecho y se desploma. La calle está tranquila y no pasan coches cerca. Hay otra persona esperando con ustedes. ¿Qué haces primero?' },
        },
      },
      {
        etiqueta: 'Señor de setenta frente al mercado',
        signos: { piel: 'gris, sudorosa' },
        testigos: 'Venía cargando sus bolsas del mercado, se sentó en la banca y de pronto se fue de lado. Ni dijo nada.',
        nodos: {
          n1: { texto: 'Esperas el autobús junto a la entrada del mercado. Un señor de unos setenta años, con dos bolsas de mandado, se lleva la mano al pecho y cae de la banca al suelo. La calle está cerrada al tránsito y los puestos quedan a unos metros. Una vendedora de jugos se acerca contigo. ¿Qué haces primero?' },
          n2: { texto: 'Estás junto a él. Está tendido en el suelo entre las bolsas del mandado, y la vendedora está de pie a tu lado. Con lo que has explorado, ¿cómo lo interpretas?' },
          n3_retraso: {
            texto: 'Pasa un minuto. Sigue tendido entre las bolsas y la vendedora te pregunta qué hacer. Con lo que has explorado, ¿qué haces?',
            testigos: 'Antes hacía como si roncara, fuerte, y ahora casi ya no lo hace. ¿Qué hacemos, oiga?',
          },
          n3: { texto: 'La vendedora está a tu lado. ¿Qué le pides?' },
          n5: { texto: 'Llega el DEA: un guardia del mercado lo trae de la entrada y la vendedora lo abre y lo enciende. El señor lleva la camisa abotonada bajo un suéter. ¿Qué haces?' },
          n8: { texto: 'Llevas unos dos minutos comprimiendo y la vendedora te dice que está lista para ayudar. Tú todavía no te sientes cansado.' },
        },
      },
      {
        etiqueta: 'Hombre de treinta y cinco, de noche',
        testigos: 'Venía trotando, se paró aquí a esperar el camión, se agarró el pecho y se cayó de espaldas.',
        nodos: {
          n1: { texto: 'Es de noche y esperas el último autobús bajo el alumbrado de la parada. Un hombre de unos treinta y cinco años, en ropa deportiva, se lleva la mano al pecho y cae de espaldas sobre la banqueta. No pasa ningún coche. Una estudiante espera también el autobús. ¿Qué haces primero?' },
          n2: { texto: 'Estás junto a él. Está tendido bajo la luz de la parada, con la estudiante de pie a tu lado. Con lo que has explorado, ¿cómo lo interpretas?' },
          n3_retraso: {
            texto: 'Pasa un minuto. Sigue tendido bajo la luz de la parada y la estudiante te pregunta qué hacer. Con lo que has explorado, ¿qué haces?',
            testigos: 'Hace rato hacía como ronquidos, muy raros, y ya casi no los hace. ¿Qué hacemos?',
          },
          n3: { texto: 'La estudiante está a tu lado con el celular en la mano. ¿Qué le pides?' },
          n5: { texto: 'Llega el DEA: la estudiante lo trae de la farmacia de la esquina, lo abre y lo enciende. El hombre lleva puesta su camisa deportiva. ¿Qué haces?' },
          n8: { texto: 'Llevas unos dos minutos comprimiendo y la estudiante, que ya vio cómo lo haces, está lista para ayudar. Tú todavía no te sientes cansado.' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Esperas el autobús. Un hombre de unos cincuenta años se lleva la mano al pecho y cae al suelo. La calle está tranquila y no hay tránsito cerca. Hay otra persona esperando contigo. ¿Qué haces primero?',
        opciones: [
          { texto: 'Compruebo que la escena es segura y me acerco a ver si responde.', va: 'n2', tipo: 'correcta', retro: 'La secuencia del reanimador empieza por la seguridad de la escena y sigue con la comprobación de respuesta y respiración.', tema: 'm1-pab-rcp-legos-adulto' },
          { signos: { fr: 'boqueo espaciado' }, texto: 'Le busco el pulso en el cuello durante medio minuto para estar seguro.', va: 'n2', tipo: 'riesgo', retro: 'La comprobación no debe superar los diez segundos. Buscar certeza retrasa las compresiones, y ante la duda se asume paro.', tema: 'm1-pab-rcp-legos-adulto' },
          { signos: { fr: 'boqueo espaciado' }, texto: 'Lo pongo de lado en posición de recuperación y espero a ver si mejora.', va: 'n2', tipo: 'riesgo', retro: 'Antes de colocarlo hay que saber si responde y si respira. Si está en paro, esperar es perder los minutos que más cambian el pronóstico.', tema: 'm1-pab-rcp-legos-adulto' },
        ],
      },
      n2: {
        texto: 'Estás junto a él. Está tendido en la banqueta, con la otra persona de pie a tu lado. Con lo que has explorado, ¿cómo lo interpretas?',
        opciones: [
          { texto: 'No responde y solo boquea: es un paro cardiaco.', va: 'n3', tipo: 'correcta', retro: 'Exacto. El paro se reconoce con dos hallazgos: no responde y no respira o solo boquea. La respiración agónica es un signo de paro, no una respiración.', tema: 'm1-pab-rcp-legos-adulto' },
          { texto: 'Está respirando, así que no es un paro: lo vigilo.', va: 'n3_retraso', tipo: 'riesgo', retro: 'Las bocanadas aisladas, ruidosas e irregulares no son respiración: son un signo de paro. Interpretarlas mal es una de las causas más frecuentes de retraso en iniciar la RCP.', tema: 'm1-pab-rcp-legos-adulto' },
        ],
      },
      n3_retraso: {
        signos: { fr: 'boqueo muy espaciado', piel: 'gris' },
        texto: 'Pasa un minuto. Sigue tendido en la banqueta y la otra persona te pregunta qué hacer. Con lo que has explorado, ¿qué haces?',
        testigos: 'Hace un rato hacía unos ruidos raros, como ronquidos, y cada vez los hace menos. ¿Qué hacemos?',
        opciones: [
          { texto: 'Asumo paro: le pido que llame al número de emergencias y traiga un DEA, y empiezo a comprimir.', va: 'n4', tipo: 'aceptable', retro: 'Es la conducta correcta, aunque llega tarde: cada minuto de retraso cuesta supervivencia. Ante la duda se asume paro y se comprime.', tema: 'm1-pab-rcp-legos-adulto' },
          { signos: { fr: 0, piel: 'cianótica' }, texto: 'Sigo esperando a que llegue alguien que sepa más.', va: 'fin_sin_rcp', tipo: 'riesgo', retro: 'El daño de comprimir a quien no lo necesitaba es mucho menor que el de no comprimir a quien sí.', tema: 'm1-pab-rcp-legos-adulto' },
        ],
      },
      n3: {
        signos: { fr: 'boqueo espaciado' },
        texto: 'Tienes a una persona al lado. ¿Qué le pides?',
        opciones: [
          { signos: { fr: 'boqueo muy espaciado' }, texto: 'Que llame al número de emergencias, que no cuelgue, y que busque un DEA mientras yo comprimo.', va: 'n4', tipo: 'correcta', retro: 'El DEA se busca al mismo tiempo que se activa el SMU y no después, porque la probabilidad de éxito de la descarga cae con cada minuto. Y no se cuelga: el operador puede guiar la RCP.', tema: 'm1-pab-dea' },
          { texto: 'Que se quede conmigo; llamaremos cuando termine de reanimarlo.', va: 'n4_tarde', tipo: 'riesgo', retro: 'Activar el SMU y conseguir el DEA cuanto antes es lo que más cambia el pronóstico en el adulto con paro presenciado.', tema: 'm1-pab-avdi' },
        ],
      },
      n4_tarde: {
        signos: { fr: 0 },
        texto: 'Llevas un par de minutos comprimiendo solo. Nadie sabe que hay un paro aquí y no hay DEA en camino.',
        opciones: [
          { texto: 'Le pido ahora que llame y busque un DEA, sin dejar de comprimir.', va: 'n4', tipo: 'aceptable', retro: 'Rectificas, pero se perdieron minutos: la caída de la supervivencia por minuto de retraso es lo que hace crítica la desfibrilación temprana.', tema: 'm1-pab-dea' },
          { texto: 'Sigo comprimiendo sin pedir ayuda.', va: 'fin_sin_dea', tipo: 'riesgo', retro: 'Sin activación del SMU no llega ni el recurso ni el DEA, y conseguir el DEA cuanto antes es lo que más cambia el pronóstico.', tema: 'm1-pab-dea' },
        ],
      },
      n4: {
        texto: 'Te arrodillas junto a él para comprimir. Nunca te enseñaron a ventilar. ¿Cómo lo haces?',
        opciones: [
          { signos: { piel: 'pálida' }, texto: 'Solo compresiones, continuas: en la mitad inferior del esternón, a 100–120 por minuto, al menos 5 cm y dejando que el tórax se reexpanda.', va: 'n5', tipo: 'correcta', retro: 'Es RCP de alta calidad solo con las manos, la indicada para un lego sin entrenamiento en ventilación.', tema: 'm1-pab-rcp-legos-adulto' },
          { signos: { piel: 'gris' }, texto: 'Intento darle ventilaciones boca a boca entre series de compresiones, aunque no sé bien cómo.', va: 'n5', tipo: 'riesgo', retro: 'Un lego sin entrenamiento en ventilación debe hacer solo compresiones: los intentos mal ejecutados interrumpen la RCP y bajan la fracción de compresión.', tema: 'm1-pab-rcp-legos-adulto' },
          { signos: { piel: 'gris' }, texto: 'Comprimo rápido y me quedo apoyado sobre el pecho para no perder fuerza.', va: 'n5', tipo: 'riesgo', retro: 'Quedarse apoyado impide la reexpansión completa: el corazón no se llena y la siguiente compresión mueve mucha menos sangre. Es el parámetro que más se descuida.', tema: 'm1-pab-rcp-legos-adulto' },
        ],
      },
      n5: {
        signos: { fr: 0 },
        texto: 'Llega el DEA. La otra persona lo abre y lo enciende. El hombre tiene la camisa puesta. ¿Qué haces?',
        opciones: [
          { texto: 'Descubro el tórax, lo seco y coloco los parches: uno bajo la clavícula derecha y otro en la línea axilar media izquierda.', va: 'n6', tipo: 'correcta', retro: 'Es la posición anterolateral. Se seca el tórax antes de pegar los parches, y lo que importa es que la corriente atraviese el corazón.', tema: 'm1-pab-dea' },
          { signos: { piel: 'gris' }, texto: 'Pego los parches encima de la camisa para no perder tiempo.', va: 'n6', tipo: 'riesgo', retro: 'Los parches van sobre la piel descubierta y seca. El paso es descubrir y secar el tórax antes de colocarlos.', tema: 'm1-pab-dea' },
        ],
      },
      n6: {
        sinCambio: 'Sigue en paro: para un reanimador lego no cambia nada visible mientras el DEA analiza y descarga.',
        texto: 'El equipo dice: «Analizando ritmo. No toque al paciente». Después: «Descarga indicada».',
        opciones: [
          { texto: 'Miro de arriba abajo del paciente diciendo «yo fuera, tú fuera, todos fuera», compruebo que nadie lo toca y pulso.', va: 'n7', tipo: 'correcta', retro: 'La comprobación es visual, no auditiva: no basta con avisar.', tema: 'm1-pab-dea' },
          { texto: 'Aviso en voz alta «¡todos fuera!» y pulso de inmediato, sin mirar.', va: 'n7', tipo: 'riesgo', retro: 'El aviso solo no basta: hay que mirar de arriba abajo del paciente y comprobar que nadie lo toca antes de descargar.', tema: 'm1-pab-dea' },
        ],
      },
      n7: {
        sinCambio: 'Sigue en paro: para un reanimador lego no cambia nada visible mientras el DEA analiza y descarga.',
        texto: 'La descarga se ha administrado. ¿Qué haces ahora?',
        opciones: [
          { signos: { piel: 'pálida' }, texto: 'Reanudo las compresiones de inmediato, sin comprobar pulso, y sigo las instrucciones del equipo.', va: 'n8', tipo: 'correcta', retro: 'Tras la descarga se comprime en el acto. Buscar pulso justo después es una pausa larga y poco informativa.', tema: 'm1-pab-dea' },
          { signos: { piel: 'gris' }, texto: 'Le busco el pulso para ver si la descarga funcionó.', va: 'n8', tipo: 'riesgo', retro: 'El corazón rara vez recupera una circulación eficaz justo en ese instante: la pausa para buscar pulso cuesta perfusión.', tema: 'm1-pab-dea' },
        ],
      },
      n8: {
        texto: 'Llevas unos dos minutos comprimiendo y notas que la otra persona está lista para ayudar. Tú todavía no te sientes cansado.',
        opciones: [
          { texto: 'Anuncio el relevo, ella se coloca mientras sigo comprimiendo y cambiamos en menos de 5 segundos.', va: 'fin_bien', tipo: 'correcta', retro: 'La calidad cae a los uno o dos minutos, antes de sentir cansancio: el relevo se hace por reloj, no por sensación.', tema: 'm1-pab-rcp-legos-adulto' },
          { texto: 'Sigo yo hasta que me canse; todavía tengo fuerza.', va: 'fin_bien', tipo: 'aceptable', retro: 'Las compresiones continúan, pero su calidad cae de forma medible antes de que el reanimador note el cansancio. Relevar cada dos minutos aproximadamente mantiene la calidad.', tema: 'm1-pab-rcp-legos-adulto' },
        ],
      },
      fin_bien: {
        signos: { piel: 'pálida' },
        fin: true,
        desenlace: 'favorable',
        texto: 'Llega la unidad del SMU y recibe a un paciente con RCP continua de calidad y desfibrilación temprana: los eslabones que más cambian el pronóstico en el paro presenciado. Entregas lo que ocurrió y a qué hora.',
      },
      fin_sin_rcp: {
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Cuando llega ayuda han pasado varios minutos sin compresiones ni DEA. Las bocanadas agónicas se tomaron por un signo de vida y el paro no se trató.',
      },
      fin_sin_dea: {
        signos: { piel: 'gris' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Las compresiones mantuvieron algo de perfusión, pero sin SMU activado nunca llegó un DEA. En el adulto con paro presenciado el ritmo suele ser desfibrilable, y esa descarga temprana no se dio.',
      },
    },
  },

  {
    id: 'caso-m1-atragantamiento-restaurante',
    titulo: 'Se atraganta en la comida',
    resumen: 'Una mujer adulta se atraganta en una mesa cercana. Distinguir obstrucción leve de grave y aplicar el ciclo de la AHA 2025.',
    estado: 'borrador',
    temas: ['m1-pab-ovace-adultos'],
    rol: 'lego',
    paciente: 'adulto',
    // Sin oxímetro ni baumanómetro: lo que oye y ve un lego. Cuando deja de
    // poder hablar se fija Glasgow V1 (despierta, obedece, sin voz).
    signos: { avdi: 'A', fc: 104, fr: 'tose con fuerza; entra aire', piel: 'cara enrojecida' },
    historia: 'Se me fue… un bocado… (tose con fuerza entre palabra y palabra)',
    testigos: 'Estábamos comiendo y de pronto se paró. Se le fue un bocado.',
    fuentes: [
      AHA_BLS_2025,
      {
        nombre: 'American Heart Association. Adult Foreign-Body Airway Obstruction Algorithm, 2025.',
        nota: 'Mismo algoritmo que cita la lección: ciclo de 5 golpes dorsales y 5 compresiones abdominales, y sustitución por compresiones torácicas.',
      },
    ],
    // Versiones: otra mujer, otro lugar, otros testigos. El embarazo avanzado
    // se descubre en n4 en todas, porque la decisión de ese momento depende de él.
    variantes: [
      {
        etiqueta: 'Mujer de cuarenta en un restaurante',
        historia: 'Se me fue… un pedazo… (tose con fuerza entre palabra y palabra)',
        testigos: 'Estábamos comiendo y de repente se quedó así. Se le fue un bocado.',
        nodos: {
          n1: { texto: 'Comes en un restaurante. En la mesa de al lado, una mujer de unos cuarenta años se levanta de golpe tras un bocado y se lleva la mano a la boca. Su acompañante se pone de pie, asustado. Con lo que has explorado, ¿qué haces?' },
        },
      },
      {
        etiqueta: 'Compañera de trabajo en el comedor',
        signos: { fc: 110 },
        historia: 'Es… la tortilla… (tose fuerte, con los ojos llenos de lágrimas)',
        testigos: 'Se estaba riendo con la boca llena y se le fue. ¡Está tosiendo mucho!',
        nodos: {
          n1: { texto: 'En el comedor de tu oficina, una compañera de unos treinta años se levanta de la silla a media comida y se lleva la mano a la boca. Otra compañera de la mesa se queda paralizada con el tenedor en la mano. Con lo que has explorado, ¿qué haces?' },
          n2: { texto: 'Pasan unos segundos. Sigue de pie junto a la mesa del comedor y te mira con angustia. Con lo que has explorado, ¿cómo confirmas lo que pasa?' },
          n3: { texto: 'Asiente con la cabeza. Le dices que vas a ayudarla y pides a tu otra compañera que llame al número de emergencias. ¿Qué maniobra aplicas?' },
          n4: { texto: 'El bocado no sale. Al colocarte para seguir te das cuenta de que tu compañera está en embarazo avanzado. ¿Cómo sigues?' },
          n5: { texto: 'Tras varios ciclos, tu compañera se afloja y empieza a desplomarse en tus brazos. ¿Qué haces?' },
          fin_mal: { texto: 'La obstrucción grave no se trató a tiempo. Sin aire, tu compañera pierde la respuesta sin que nadie inicie las maniobras que podían desplazar el objeto.' },
        },
      },
      {
        etiqueta: 'Mujer joven en una fonda del mercado',
        signos: { fc: 98 },
        historia: 'Se me atoró… la carne… (tose con fuerza entre palabra y palabra)',
        testigos: 'Iba comiendo rápido porque ya se tenía que ir, y de pronto se atragantó.',
        nodos: {
          n1: { texto: 'Desayunas en una fonda del mercado. En la barra, una mujer joven se baja del banco de golpe tras un bocado de carne y se lleva la mano a la boca. La cocinera sale de detrás del mostrador. Con lo que has explorado, ¿qué haces?' },
          n2: { texto: 'Pasan unos segundos. Sigue de pie junto a la barra y te mira con angustia. Con lo que has explorado, ¿cómo confirmas lo que pasa?' },
          n3: { texto: 'Asiente con la cabeza. Le avisas de que vas a ayudarla y le pides a la cocinera que llame al número de emergencias. ¿Qué maniobra aplicas?' },
          n4: { texto: 'El bocado no sale. Al pegarte a ella te fijas en que, bajo el suéter holgado, está en embarazo avanzado. ¿Cómo sigues?' },
          n5: { texto: 'Tras varios ciclos, la joven se afloja y empieza a desplomarse en tus brazos. ¿Qué haces?' },
          n6: { texto: 'Mientras compruebas la boca antes de seguir, ves el trozo de carne al fondo de la boca, a tu alcance.' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'En un restaurante, una mujer de unos cuarenta años se pone de pie de golpe tras un bocado y se lleva la mano a la boca. Su acompañante se levanta asustado. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Me acerco, la animo a seguir tosiendo y me quedo vigilándola.', va: 'n2', tipo: 'correcta', retro: 'Tos fuerte y capacidad de hablar indican obstrucción leve. La tos eficaz es la mejor maniobra que existe: no hay que interferir.', tema: 'm1-pab-ovace-adultos' },
          { signos: { fr: 'tos débil y silenciosa; casi no entra aire', piel: 'violácea', glasgow: 'O4V1M6' }, texto: 'Le doy golpes en la espalda de inmediato para ayudarla a sacarlo.', va: 'n1_empeora', tipo: 'riesgo', retro: 'Es el error clásico: golpear la espalda de quien tose con fuerza puede desplazar el objeto y convertir una obstrucción leve en grave.', tema: 'm1-pab-ovace-adultos' },
          { texto: 'Le ofrezco agua para que baje el bocado.', va: 'n2', tipo: 'riesgo', retro: 'La lección no incluye dar líquidos: en la obstrucción leve la conducta es animar a toser y vigilar.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      n1_empeora: {
        texto: 'Tras los golpes, se lleva las manos al cuello y te mira con angustia. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Ahora sí intervengo: le pregunto si se está ahogando y me preparo para la maniobra.', va: 'n3', tipo: 'aceptable', retro: 'La obstrucción pasó de leve a grave, quizá por los golpes que recibió mientras tosía con fuerza. Ahora sí hay que intervenir de inmediato.', tema: 'm1-pab-ovace-adultos' },
          { texto: 'Espero a que vuelva a toser por sí sola.', va: 'fin_mal', tipo: 'riesgo', retro: 'Quien no puede toser ni hablar tiene una obstrucción grave: requiere intervención inmediata.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      n2: {
        signos: { fc: 118, fr: 'tos débil y silenciosa; casi no entra aire', piel: 'violácea', glasgow: 'O4V1M6' },
        texto: 'Pasan unos segundos. Sigue de pie junto a la mesa y te mira con angustia. Con lo que has explorado, ¿cómo confirmas lo que pasa?',
        opciones: [
          { texto: 'Le pregunto directamente: «¿Te estás ahogando?».', va: 'n3', tipo: 'correcta', retro: 'La pregunta directa resuelve la duda: quien no puede contestar tiene una obstrucción grave. No todos hacen el signo universal de las manos en el cuello.', tema: 'm1-pab-ovace-adultos' },
          { signos: { piel: 'cianótica' }, texto: 'Espero a que se lleve las manos al cuello para estar seguro.', va: 'n3', tipo: 'riesgo', retro: 'El signo universal es útil, pero muchos pacientes no lo hacen. Esperarlo retrasa la intervención.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      n3: {
        signos: { fc: 124, fr: 'no entra aire' },
        texto: 'Asiente con la cabeza. Le avisas de que vas a ayudarla y pides a alguien que llame al número de emergencias. ¿Qué maniobra aplicas?',
        opciones: [
          { signos: { piel: 'labios morados' }, texto: 'Me coloco a un lado y ligeramente detrás, la inclino hacia delante y le doy 5 golpes dorsales entre las escápulas, uno a uno.', va: 'n4', tipo: 'correcta', retro: 'Es el inicio del ciclo de la AHA 2025: los golpes dorsales abren el ciclo, comprobando el efecto tras cada golpe.', tema: 'm1-pab-ovace-adultos' },
          { signos: { piel: 'labios morados' }, texto: 'Le aplico compresiones abdominales seguidas hasta que lo expulse.', va: 'n4', tipo: 'aceptable', retro: 'Era la enseñanza anterior. El algoritmo vigente combina dos maniobras en ciclos: 5 golpes dorsales seguidos de 5 compresiones abdominales.', tema: 'm1-pab-ovace-adultos' },
          { signos: { piel: 'cianótica' }, texto: 'Le abro la boca y busco el bocado con el dedo.', va: 'n4', tipo: 'riesgo', retro: 'El barrido digital a ciegas está proscrito: empuja el objeto más adentro y puede lesionar la vía aérea.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      n4: {
        texto: 'El bocado no sale. Te fijas en que la mujer está en embarazo avanzado. ¿Cómo sigues?',
        opciones: [
          { signos: { fc: 128 }, texto: 'Cambio las compresiones abdominales por compresiones torácicas sobre la mitad inferior del esternón, y mantengo los golpes dorsales en el ciclo.', va: 'n5', tipo: 'correcta', retro: 'En embarazo avanzado, o si no se puede rodear el abdomen, las abdominales se sustituyen por torácicas. Los golpes dorsales se mantienen igual.', tema: 'm1-pab-ovace-adultos' },
          { signos: { fc: 132, piel: 'cianótica' }, texto: 'Hago compresiones abdominales como en cualquier adulto.', va: 'n5', tipo: 'riesgo', retro: 'En embarazo avanzado no se comprime el abdomen: se usan compresiones torácicas.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      n5: {
        signos: { avdi: 'I', fc: 52, fr: 0, piel: 'cianótica' },
        texto: 'Tras varios ciclos, la mujer se afloja y empieza a desplomarse en tus brazos. ¿Qué haces?',
        opciones: [
          { signos: { fc: 70 }, texto: 'La acompaño al suelo con cuidado, confirmo que se activó el SMU e inicio compresiones torácicas.', va: 'n6', tipo: 'correcta', retro: 'Al perder la respuesta deja de manejarse como OVACE y pasa a manejarse como un paro. Las compresiones generan presión en la vía aérea y pueden desplazar el objeto.', tema: 'm1-pab-ovace-adultos' },
          { texto: 'La pongo en posición de recuperación y espero a la ambulancia.', va: 'fin_mal', tipo: 'riesgo', retro: 'Si se desploma, se acompaña al suelo, se activa el SMU si no se ha hecho y se inician compresiones.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      n6: {
        texto: 'Mientras compruebas la boca antes de seguir, ves el trozo de comida al fondo de la boca, a tu alcance.',
        opciones: [
          { texto: 'Lo retiro, porque es visible y alcanzable.', va: 'fin_bien', tipo: 'correcta', retro: 'Antes de cada ventilación se mira la boca y el cuerpo extraño se retira solo si es visible y alcanzable.', tema: 'm1-pab-ovace-adultos' },
          { texto: 'Lo retiro y además hago un barrido con el dedo por si queda algo más.', va: 'fin_bien', tipo: 'riesgo', retro: 'El barrido a ciegas está proscrito. Lo visible y alcanzable se retira; lo demás no se busca con el dedo.', tema: 'm1-pab-ovace-adultos' },
        ],
      },
      fin_bien: {
        signos: { avdi: 'D', fc: 96, fr: 'respira de nuevo', piel: 'pálida' },
        fin: true,
        desenlace: 'favorable',
        texto: 'La vía aérea queda despejada y la unidad del SMU llega a un paciente con la obstrucción resuelta y las compresiones bien iniciadas. Entregas cómo empezó, qué maniobras aplicaste y cuándo perdió la respuesta.',
      },
      fin_mal: {
        signos: { avdi: 'I', fc: 40, fr: 0, piel: 'cianótica' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'La obstrucción grave no se trató a tiempo. Sin aire, la paciente pierde la respuesta sin que nadie inicie las maniobras que podían desplazar el objeto.',
      },
    },
  },

  {
    id: 'caso-m1-hemorragia-pierna',
    titulo: 'Un corte profundo en el muslo',
    resumen: 'Un trabajador se corta con una herramienta. Exponer, comprimir y decidir cuándo pasar al torniquete.',
    estado: 'borrador',
    temas: ['m1-pab-hemorragias'],
    rol: 'lego',
    paciente: 'adulto',
    // Sin oxímetro ni baumanómetro. La FC es la verdad del caso aunque el lego
    // no la mida; lo que él percibe cambia en la piel, la respiración y la
    // respuesta.
    signos: { avdi: 'A', fc: 118, fr: 'rápida', piel: 'pálida, fría' },
    historia: 'Me corté con la sierra en el muslo… me estoy mareando.',
    testigos: 'Se le fue la sierra y se cortó la pierna. Ya la desenchufé.',
    fuentes: [AHA_PRIMEROS_AUXILIOS],
    // Versiones: otro taller, otra herramienta, otra persona y otra gravedad de
    // partida. Siempre muslo y siempre sangrado que la presión no controla.
    variantes: [
      {
        etiqueta: 'Carpintero con la sierra eléctrica',
        historia: 'Se me fue la sierra… en el muslo… me estoy mareando.',
        testigos: 'Se le resbaló la sierra y se cortó la pierna. Ya la desconecté.',
        nodos: {
          n1: { texto: 'En una carpintería, un trabajador de unos treinta años se hace un corte profundo en el muslo con una sierra eléctrica. El pantalón se empapa de sangre roja brillante que sale a chorros. Su compañero ya desconectó la sierra. ¿Qué haces?' },
        },
      },
      {
        etiqueta: 'Soldadora con la esmeriladora',
        signos: { fc: 126, fr: 'muy rápida', piel: 'pálida, sudorosa' },
        historia: 'El disco… se me fue al muslo… me estoy mareando mucho.',
        testigos: 'La esmeriladora brincó y le cortó la pierna. Ya le quité la corriente.',
        nodos: {
          n1: { texto: 'En un taller de herrería, una soldadora de unos cuarenta y cinco años se hace un corte profundo en el muslo con el disco de una esmeriladora. El pantalón del overol se empapa de sangre roja brillante que sale a chorros. Su ayudante ya cortó la corriente. ¿Qué haces?' },
          n2: { texto: 'La herida está bajo el pantalón del overol, empapado. ¿Cómo empiezas?' },
          n5: {
            texto: 'El sangrado se detiene. La soldadora se queja a gritos y se lleva las manos al torniquete. Con lo que has explorado, ¿qué haces?',
            historia: '¡Me duele horrible! Quítamelo, aunque sea un poquito.',
          },
          fin_bien: { texto: 'La unidad del SMU recibe a la paciente con la hemorragia controlada y un torniquete visible con su hora de colocación. Entregas qué ocurrió, qué intentaste primero y a qué hora pusiste el torniquete.' },
        },
      },
      {
        etiqueta: 'Compañero en el taller de la escuela',
        signos: { fc: 112, piel: 'pálida' },
        historia: 'Me corté con la sierra… en la pierna… creo que me voy a desmayar.',
        testigos: 'Estaba cortando una tabla y se le fue la sierra a la pierna. Ya bajé el interruptor.',
        nodos: {
          n1: { texto: 'En el taller de tu escuela técnica, un compañero de diecinueve años se hace un corte profundo en el muslo con la sierra circular de banco. El pantalón se empapa de sangre roja brillante que sale a chorros. El profesor ya bajó el interruptor general. ¿Qué haces?' },
          n4: { texto: 'Pese a la presión firme, la sangre sigue saliendo a chorro. El profesor trae el botiquín del taller y dentro hay un torniquete. ¿Qué haces?' },
          n5: {
            texto: 'El sangrado se detiene. Tu compañero se queja a gritos y se lleva las manos al torniquete. Con lo que has explorado, ¿qué haces?',
            historia: '¡Me está apretando horrible! Aflójalo tantito, porfa.',
          },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'En un taller, un trabajador se hace un corte profundo en el muslo con una sierra eléctrica. El pantalón se empapa de sangre roja brillante que sale a chorros. La sierra ya está desenchufada. ¿Qué haces?',
        opciones: [
          { texto: 'Pido que llamen al número de emergencias y atiendo primero el sangrado: es lo que mata más rápido.', va: 'n2', tipo: 'correcta', retro: 'La hemorragia exanguinante va antes que la vía aérea: es la razón de la X que antecede al ABCDE en el trauma.', tema: 'm1-pab-hemorragias' },
          { signos: { fc: 128, piel: 'pálida, sudorosa' }, texto: 'Le reviso primero la vía aérea y la respiración, como manda el ABC.', va: 'n2', tipo: 'riesgo', retro: 'Un sangrado arterial puede exanguinar en minutos. Por eso el control de la hemorragia masiva va primero.', tema: 'm1-pab-hemorragias' },
        ],
      },
      n2: {
        texto: 'La herida está bajo el pantalón empapado. ¿Cómo empiezas?',
        opciones: [
          { signos: { fc: 114 }, texto: 'Corto o retiro la tela para exponer la herida y aplico presión firme con gasa y el talón de la mano sobre el punto exacto que sangra.', va: 'n3', tipo: 'correcta', retro: 'No se puede comprimir lo que no se ve. La presión directa es la primera medida y resuelve la mayoría de las hemorragias externas.', tema: 'm1-pab-hemorragias' },
          { signos: { fc: 126, piel: 'pálida, sudorosa' }, texto: 'Aprieto por encima del pantalón, donde veo más sangre.', va: 'n3', tipo: 'aceptable', retro: 'Comprimir es lo correcto, pero sin exponer la herida la presión puede no caer sobre el punto que sangra.', tema: 'm1-pab-hemorragias' },
        ],
      },
      n3: {
        texto: 'Al cabo de un momento la gasa se empapa por completo. ¿Qué haces?',
        opciones: [
          { texto: 'Añado más gasa encima sin retirar la primera y mantengo la presión.', va: 'n4', tipo: 'correcta', retro: 'Lo que se empapa se refuerza encima, nunca se retira: cada comprobación rompe el coágulo que se estaba formando.', tema: 'm1-pab-hemorragias' },
          { signos: { fc: 132, fr: 'muy rápida', avdi: 'V' }, texto: 'Retiro la gasa para ver si sigue sangrando y pongo una limpia.', va: 'n4', tipo: 'riesgo', retro: 'Levantar el apósito rompe el coágulo que se estaba formando. Se añade encima sin retirar el anterior.', tema: 'm1-pab-hemorragias' },
        ],
      },
      n4: {
        signos: { fc: 130, piel: 'pálida, sudorosa' },
        texto: 'Pese a la presión firme, la sangre sigue saliendo a chorro. Hay un torniquete en el botiquín del taller. ¿Qué haces?',
        opciones: [
          { signos: { fc: 116, fr: 'rápida', avdi: 'A' }, texto: 'Coloco el torniquete proximal a la herida, sobre el muslo y no sobre la rodilla, siguiendo las instrucciones del dispositivo, y aprieto hasta que el sangrado se detenga.', va: 'n5', tipo: 'correcta', retro: 'En una extremidad con sangrado que la presión directa no controla, el torniquete es la medida de elección. Va sobre un segmento con un solo hueso y se aprieta hasta que el sangrado cese.', tema: 'm1-pab-hemorragias' },
          { signos: { fc: 136, fr: 'muy rápida', avdi: 'V' }, texto: 'Lo coloco justo sobre la rodilla, que es más fácil de rodear.', va: 'n5', tipo: 'riesgo', retro: 'El torniquete no va sobre una articulación: va proximal a la herida, sobre un segmento con un solo hueso.', tema: 'm1-pab-hemorragias' },
          { signos: { fc: 142, fr: 'muy rápida', avdi: 'D', piel: 'gris, fría' }, texto: 'Elevo la pierna y sigo esperando a que pare.', va: 'fin_mal', tipo: 'riesgo', retro: 'Si la presión directa no controla un sangrado de extremidad, la medida es el torniquete; esperar deja seguir una hemorragia que puede exanguinar en minutos.', tema: 'm1-pab-hemorragias' },
        ],
      },
      n5: {
        texto: 'El sangrado se detiene. El trabajador se queja a gritos y se lleva las manos al torniquete. Con lo que has explorado, ¿qué haces?',
        historia: '¡Me duele muchísimo! Aflójamelo, por favor.',
        opciones: [
          { signos: { fc: 112, piel: 'pálida' }, texto: 'Lo mantengo, le explico que el dolor es esperable, anoto la hora de colocación a la vista y lo dejo sin cubrir.', va: 'fin_bien', tipo: 'correcta', retro: 'Un torniquete bien puesto duele, y eso no es un fallo. No se afloja ni se retira en el ámbito prehospitalario; la hora va visible y el torniquete, a la vista del equipo.', tema: 'm1-pab-hemorragias' },
          { signos: { fc: 140, fr: 'muy rápida', avdi: 'V', piel: 'pálida, sudorosa' }, texto: 'Lo aflojo un poco para que esté más cómodo.', va: 'fin_mal', tipo: 'riesgo', retro: 'Aflojarlo reanuda la hemorragia y desperdicia el tiempo que ya estuvo puesto.', tema: 'm1-pab-hemorragias' },
          { texto: 'Lo tapo con una manta para que no lo vea y se tranquilice.', va: 'fin_bien', tipo: 'aceptable', retro: 'Mantenerlo es correcto, pero no se cubre: debe quedar a la vista de todo el equipo, con la hora de colocación anotada.', tema: 'm1-pab-hemorragias' },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'La unidad del SMU recibe a un paciente con la hemorragia controlada y un torniquete visible con su hora de colocación. Entregas qué ocurrió, qué intentaste primero y a qué hora pusiste el torniquete.',
      },
      fin_mal: {
        signos: { fc: 146, fr: 'muy rápida', avdi: 'D', piel: 'gris, fría' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El sangrado arterial sigue sin control. Una hemorragia así puede exanguinar en minutos, y la medida que la detenía no se aplicó o se deshizo.',
      },
    },
  },
]
