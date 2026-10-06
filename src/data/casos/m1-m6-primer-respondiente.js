// ============================================================
//  Casos del primer respondiente · Módulos 1 y 6 — BORRADORES
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
//  Los signos son ILUSTRATIVOS y, como el primer respondiente no lleva
//  monitor, se limitan a lo que puede observar: estado de alerta, cómo
//  respira y el aspecto de la piel. Lo que no puede medir va en null.
//
//  Lecciones que sostienen cada caso:
//    m1-pab-quemaduras, m1-pab-fracturas → src/data/contenido/m1-propedeutico.js
//    m6-svp-ovace                        → src/data/contenido/m6-soporte-vital.js
// ============================================================

const AHA_PRIMEROS_AUXILIOS = {
  nombre: 'Hewett Brumberg EK, Douma MJ, Alibertis K, et al. 2024 American Heart Association and '
    + 'American Red Cross Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.',
  nota: 'PMID 39540278. Misma fuente que las lecciones de quemaduras y fracturas del Módulo 1: '
    + 'conducta del primer respondiente.',
}
const OMS_BEC = {
  nombre: 'World Health Organization e International Committee of the Red Cross. Basic Emergency '
    + 'Care: approach to the acutely ill and injured, 2018.',
  nota: 'Misma fuente que la lección de quemaduras: marco de evaluación y conducta en el primer '
    + 'contacto con el paciente agudo.',
}
const PHTLS_9 = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.',
  nota: 'Misma fuente que la lección de fracturas. Capítulo y página PENDIENTES, igual que en la '
    + 'lección.',
}
const AHA_PBLS_2025 = {
  nombre: 'AHA/AAP 2025 Pediatric Basic Life Support.',
  nota: 'Misma fuente que la lección de OVACE pediátrica: obstrucción por cuerpo extraño en el '
    + 'lactante y el niño. Apartado y algoritmo exactos PENDIENTES, igual que en la lección.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  nota: 'Misma fuente que la lección de OVACE pediátrica: manejo de la vía aérea en el paciente '
    + 'pediátrico.',
}

const Q = 'm1-pab-quemaduras'
const FX = 'm1-pab-fracturas'
const OV = 'm6-svp-ovace'

export default [
  // ----------------------------------------------------------
  {
    id: 'caso-m1-quemadura-en-la-cocina',
    titulo: 'Se le prende la manga en la cocina',
    resumen: 'Un adulto se quema el brazo y la cara al incendiarse su manga junto a la estufa. Detener, enfriar, cubrir, abrigar y vigilar la vía aérea.',
    estado: 'borrador',
    temas: [Q],
    fuentes: [AHA_PRIMEROS_AUXILIOS, OMS_BEC],
    rol: 'lego',
    paciente: 'adulto',
    signos: { avdi: 'A', fc: null, fr: 'rápida, por el dolor', spo2: null, ta: null, piel: 'brazo en llamas' },
    historia: '¡Me quemo! ¡Se me prendió la manga!',
    testigos: 'Estaba cocinando y la manga tocó el quemador. Ya llamé a emergencias.',
    // Versiones: otro hombre adulto, otra cocina, otros testigos. Siempre la
    // manga junto a la estufa, el grifo a mano y la cara alcanzada.
    variantes: [
      {
        etiqueta: 'Tu vecino en su cocina',
        historia: '¡Me quemo! ¡Se me prendió la manga!',
        testigos: 'La manga le tocó la lumbre mientras cocinaba. Ya estoy llamando a emergencias.',
        nodos: {
          n1: { texto: 'Estás de visita en casa de tu vecino. Mientras cocina, la manga de su camisa roza el quemador encendido y se prende. Grita y sacude el brazo. Su esposa ya está marcando al número de emergencias. ¿Qué haces primero?' },
        },
      },
      {
        etiqueta: 'Tu abuelo calentando tortillas',
        historia: '¡Ay, me quemo! ¡La manga, la manga!',
        testigos: 'Mi papá estaba calentando las tortillas en el comal y se le prendió el suéter. Ya pedí la ambulancia.',
        nodos: {
          n1: { texto: 'Comes en casa de tu abuelo, de setenta y dos años. Mientras calienta tortillas en el comal, la manga de su suéter toca la flama de la estufa y se prende. Grita y agita el brazo. Tu tía ya está llamando al número de emergencias. ¿Qué haces primero?' },
          n1_tarde: { texto: 'Cuando vuelves, la manga sigue ardiendo y el fuego ha avanzado por el brazo. Tu abuelo sigue gritando junto a la estufa. ¿Qué haces?' },
          n4: {
            texto: 'Con el brazo ya enfriado, miras la lesión: en el antebrazo hay ampollas con la base rosada y húmeda; en el codo, una zona blanca y seca. Tu abuelo quiere comentarte algo sobre la herida. Con lo que has explorado, ¿qué le dices?',
            historia: 'El antebrazo me arde horrible. Pero lo del codo ni lo siento: eso no ha de ser nada, ¿verdad?',
          },
          n7: { testigos: 'Mi papá no habla así. Hace un ratito tenía su voz de siempre.' },
          n8: {
            texto: 'Mientras esperan la ambulancia, notas que tiene el suéter mojado por el enfriamiento. Con lo que has explorado, ¿qué haces?',
            historia: 'Ay, tengo mucho frío.',
          },
        },
      },
      {
        etiqueta: 'Tu compañero de departamento',
        historia: '¡Quítamelo, quítamelo! ¡Se me prendió!',
        testigos: 'Estaba haciendo quesadillas, se estiró por encima de la lumbre y se le prendió la sudadera. Ya marqué a emergencias.',
        nodos: {
          n1: { texto: 'Compartes departamento con un amigo de veintitrés años. Mientras hace quesadillas, se estira por encima de la estufa y la manga de su sudadera se prende con el quemador. Grita y agita el brazo. Otro compañero de piso ya marca al número de emergencias. ¿Qué haces primero?' },
          n1_tarde: { texto: 'Cuando vuelves, la manga sigue ardiendo y el fuego ha avanzado por el brazo. Tu amigo sigue gritando junto a la estufa. ¿Qué haces?' },
          n2: { texto: 'Las llamas están apagadas. Lleva un reloj y un anillo en esa mano. Parte de la manga quemada de la sudadera está pegada a la piel del antebrazo; el resto cuelga suelta. ¿Qué retiras?' },
          n4: {
            texto: 'Con el brazo ya enfriado, miras la lesión: en el antebrazo hay ampollas con la base rosada y húmeda; en el codo, una zona blanca y seca. Tu amigo quiere comentarte algo sobre la herida. Con lo que has explorado, ¿qué le dices?',
            historia: 'El antebrazo me arde un montón. Lo del codo ni lo siento, así que eso está bien, ¿no?',
          },
          n7: { testigos: 'Hace un momento hablaba normal. Ahora suena rarísimo, como ronco.' },
          n8: { texto: 'Mientras esperan la ambulancia, notas que tiene la sudadera mojada por el enfriamiento. Con lo que has explorado, ¿qué haces?' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Estás de visita en casa de tu vecino. Mientras cocina, la manga de su camisa toca el quemador y se prende. Grita y agita el brazo. Su esposa ya marca al número de emergencias. ¿Qué haces primero?',
        opciones: [
          { signos: { piel: 'antebrazo enrojecido con ampollas' }, texto: 'Apago las llamas y lo aparto de la estufa.', va: 'n2', tipo: 'correcta', retro: 'La primera medida es detener el proceso: apagar y retirar de la fuente. Mientras el calor siga actuando, la lesión sigue avanzando.', tema: Q },
          { signos: { piel: 'quemadura más extensa, zonas blancas' }, texto: 'Corro al baño a buscar una pomada para quemaduras.', va: 'n1_tarde', tipo: 'riesgo', retro: 'Lo primero es detener el proceso. Además, las pomadas y los remedios caseros están contraindicados en la atención inicial.', tema: Q },
        ],
      },
      n1_tarde: {
        texto: 'Cuando vuelves, la manga sigue ardiendo y el fuego ha avanzado por el brazo. Él sigue gritando junto a la estufa. ¿Qué haces?',
        opciones: [
          { texto: 'Dejo la pomada, apago las llamas y lo aparto de la estufa.', va: 'n2', tipo: 'aceptable', retro: 'Rectificas, pero el proceso siguió actuando más tiempo del necesario. Detenerlo es siempre el primer paso.', tema: Q },
          { texto: 'Le pongo la pomada sobre el brazo para calmarle el dolor.', va: 'n2', tipo: 'riesgo', retro: 'Las pomadas están contraindicadas y no detienen la lesión. El primer paso es apagar y retirar de la fuente.', tema: Q },
        ],
      },
      n2: {
        texto: 'Las llamas están apagadas. Lleva un reloj y un anillo en esa mano. Parte de la manga quemada está pegada a la piel del antebrazo; el resto cuelga suelta. ¿Qué retiras?',
        historia: 'Me arde muchísimo el brazo.',
        opciones: [
          { signos: { fr: 'rápida' }, texto: 'Le quito el reloj, el anillo y la tela suelta, y dejo en su sitio la que está pegada a la piel.', va: 'n3', tipo: 'correcta', retro: 'Se quita la ropa no adherida y las joyas; la ropa adherida a la piel no se retira.', tema: Q },
          { signos: { piel: 'antebrazo en carne viva donde estaba la tela' }, texto: 'Le arranco toda la manga, también lo que está pegado, para ver bien la herida.', va: 'n3', tipo: 'riesgo', retro: 'Retirar la ropa adherida a la piel está contraindicado. Solo se quita la ropa no adherida y las joyas.', tema: Q },
          { texto: 'No le quito nada para no lastimarlo más.', va: 'n3', tipo: 'riesgo', retro: 'Detener el proceso incluye quitar la ropa no adherida y las joyas de la zona; lo único que se deja es la ropa pegada a la piel.', tema: Q },
        ],
      },
      n3: {
        texto: 'Ahora hay que enfriar la quemadura. En la cocina tienes el grifo, el congelador con hielo y un tubo de pasta de dientes en el baño.',
        opciones: [
          { signos: { fr: 'algo más tranquila' }, texto: 'Pongo el brazo bajo el agua del grifo, a temperatura ambiente, durante unos minutos.', va: 'n4', tipo: 'correcta', retro: 'Es la medida que enseña la lección: enfriar con agua a temperatura ambiente durante unos minutos.', tema: Q },
          { signos: { piel: 'tiritando, quemadura más pálida' }, texto: 'Le pongo hielo directamente sobre el brazo para que se enfríe más rápido.', va: 'n3_hielo', tipo: 'riesgo', retro: 'El hielo o el agua helada están contraindicados: profundizan la lesión y provocan hipotermia.', tema: Q },
          { signos: { piel: 'brazo cubierto de pasta blanca' }, texto: 'Le unto pasta de dientes, que dicen que refresca.', va: 'n3_casero', tipo: 'riesgo', retro: 'La pasta de dientes y los remedios caseros están contraindicados: interfieren con la valoración y la curación posteriores.', tema: Q },
        ],
      },
      n3_hielo: {
        texto: 'Lleva un rato con el hielo sobre el brazo. Con lo que has explorado, ¿qué haces?',
        historia: 'Ya casi no me duele… pero tengo mucho frío.',
        opciones: [
          { signos: { piel: 'tibio, quemadura enrojecida' }, texto: 'Retiro el hielo, enfrío con agua a temperatura ambiente y lo cubro con una manta.', va: 'n4', tipo: 'aceptable', retro: 'Corriges a tiempo: el hielo profundiza la lesión y provoca hipotermia. Se enfría con agua a temperatura ambiente y se cubre al paciente.', tema: Q },
          { signos: { piel: 'tiritando, quemadura blanca' }, texto: 'Sigo con el hielo: el dolor le ha bajado.', va: 'fin_hielo', tipo: 'riesgo', retro: 'Que deje de doler no es buena señal. El hielo profundiza la lesión y provoca hipotermia.', tema: Q },
        ],
      },
      n3_casero: {
        texto: 'La pasta forma una capa blanca sobre el brazo. Ya no puedes ver bien el aspecto de la quemadura. ¿Qué haces?',
        opciones: [
          { texto: 'La retiro con agua a temperatura ambiente y sigo enfriando unos minutos.', va: 'n4', tipo: 'aceptable', retro: 'Recuperas la medida correcta. Los remedios caseros interfieren con la valoración posterior; se enfría con agua a temperatura ambiente.', tema: Q },
          { texto: 'La dejo puesta y paso a vendar.', va: 'n4', tipo: 'riesgo', retro: 'Las pastas y los remedios caseros están contraindicados y la lesión no se ha enfriado como enseña la lección.', tema: Q },
        ],
      },
      n4: {
        signos: { piel: 'ampollas de base rosada; codo blanco y seco' },
        texto: 'Con el brazo ya enfriado, miras la lesión: en el antebrazo hay ampollas con la base rosada y húmeda; en el codo, una zona blanca y seca. Tu vecino quiere comentarte algo sobre la herida. Con lo que has explorado, ¿qué le dices?',
        historia: 'El antebrazo me duele muchísimo. Lo del codo, en cambio, no me duele nada: al menos eso no es grave, ¿verdad?',
        opciones: [
          { texto: 'Le explico que no es buena señal: que no duela indica que la quemadura es más profunda.', va: 'n5', tipo: 'correcta', retro: 'La ausencia de dolor indica destrucción de las terminaciones nerviosas, es decir, mayor profundidad. Nunca es un signo tranquilizador.', tema: Q },
          { texto: 'Le doy la razón: lo que no duele es lo menos grave.', va: 'n5', tipo: 'riesgo', retro: 'Es al revés: la zona blanca, seca e indolora corresponde a una quemadura de tercer grado. La falta de dolor indica mayor profundidad.', tema: Q },
        ],
      },
      n5: {
        signos: { piel: 'ampollas tensas en el antebrazo; codo blanco y seco' },
        texto: 'Las ampollas del antebrazo están tensas. Tienes un botiquín con apósitos limpios y una aguja. ¿Qué haces?',
        opciones: [
          { signos: { piel: 'quemadura cubierta con apósito' }, texto: 'Dejo las ampollas intactas y cubro la quemadura con un apósito limpio y seco.', va: 'n6', tipo: 'correcta', retro: 'Romper las ampollas está contraindicado. La quemadura se cubre con apósito limpio y seco.', tema: Q },
          { signos: { piel: 'ampollas rotas, base rosada al descubierto' }, texto: 'Pincho las ampollas para que drenen y luego cubro.', va: 'n6', tipo: 'riesgo', retro: 'Romper las ampollas está contraindicado: interfiere con la valoración y la curación posteriores.', tema: Q },
        ],
      },
      n6: {
        texto: 'La operadora pregunta qué tanto del cuerpo está quemado. La quemadura ocupa solo parte del brazo, de forma irregular.',
        opciones: [
          { texto: 'Calculo cuántas veces cabe la palma de SU mano, con los dedos, sobre la zona quemada: cada una es cerca del 1 %.', va: 'n7', tipo: 'correcta', retro: 'Para superficies irregulares o pequeñas se usa la regla de la palma: la palma del paciente, con los dedos, equivale aproximadamente al 1 % de su superficie corporal.', tema: Q },
          { texto: 'Lo mido con mi propia palma, que es la que tengo a mano.', va: 'n7', tipo: 'aceptable', retro: 'La regla de la palma usa la mano del PACIENTE, porque es la que guarda proporción con su superficie corporal.', tema: Q },
          { texto: 'Digo que es todo el brazo, un 18 %.', va: 'n7', tipo: 'riesgo', retro: 'En la regla de los nueves cada extremidad superior vale 9 % en el adulto; el 18 % corresponde a cada extremidad inferior. Para una zona parcial e irregular, la regla de la palma es más útil.', tema: Q },
        ],
      },
      n7: {
        signos: { fr: 'rápida', piel: 'vello de la nariz chamuscado, quemadura en la mejilla' },
        texto: 'Con el brazo ya atendido, lo miras de frente por primera vez desde que se apagaron las llamas: le llegaron a la cara. Con lo que has explorado, ¿qué haces?',
        historia: 'También me arde la cara… (te lo dice con la voz ronca, distinta de la suya)',
        testigos: 'Hace un momento hablaba normal; ahora le noto la voz rara.',
        opciones: [
          { texto: 'Lo tomo como sospecha de lesión de la vía aérea: no me aparto de él, vigilo su respiración y su voz, y lo comunico a emergencias.', va: 'n8', tipo: 'correcta', retro: 'Quemadura facial, vibrisas chamuscadas y disfonía obligan a vigilar la vía aérea: el edema puede cerrarla en minutos.', tema: Q },
          { signos: { fr: 'rápida, con ruido al inspirar' }, texto: 'La ronquera es por los gritos. Me centro en el brazo, que es lo que se ve peor.', va: 'n7_ignorada', tipo: 'riesgo', retro: 'La disfonía junto con quemadura facial y vibrisas chamuscadas hace sospechar lesión por inhalación. La vía aérea puede cerrarse antes de que la piel quemada dé problemas.', tema: Q },
        ],
      },
      n7_ignorada: {
        signos: { fr: 'muy rápida, ruidosa' },
        texto: 'Pasan unos minutos mientras sigues atendiendo el brazo. Con lo que has explorado, ¿qué haces?',
        historia: 'Casi no… me sale… la voz… (apenas en un susurro)',
        testigos: 'Cada vez le cuesta más hablar.',
        opciones: [
          { texto: 'Me quedo junto a él vigilando la respiración y aviso a emergencias de este cambio.', va: 'n8', tipo: 'aceptable', retro: 'Lo reconoces tarde. Los hallazgos estaban desde antes y obligaban a vigilar la vía aérea, porque el edema puede cerrarla en minutos.', tema: Q },
          { texto: 'Sigo vendando el brazo: ya llegará la ambulancia.', va: 'fin_via_aerea', tipo: 'riesgo', retro: 'La sospecha de inhalación obliga a vigilar la vía aérea. Atender solo la piel deja sin vigilancia lo que puede cerrarse en minutos.', tema: Q },
        ],
      },
      n8: {
        signos: { piel: 'tirita un poco' },
        texto: 'Mientras esperan la ambulancia, notas que tiene la camisa mojada por el enfriamiento. Con lo que has explorado, ¿qué haces?',
        historia: 'Tengo frío.',
        opciones: [
          { signos: { piel: 'abrigado, deja de tiritar' }, texto: 'Lo cubro entero con una manta seca, no solo la quemadura.', va: 'fin_bien', tipo: 'correcta', retro: 'Prevenir la hipotermia forma parte de las medidas iniciales: se cubre al paciente, no solo la quemadura.', tema: Q },
          { texto: 'Solo me aseguro de que el apósito del brazo quede bien puesto.', va: 'fin_bien', tipo: 'aceptable', retro: 'Cubrir la quemadura es necesario, pero no basta: hay que prevenir la hipotermia cubriendo al paciente entero.', tema: Q },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Llega la unidad. Entregas a un paciente con el proceso detenido, la quemadura enfriada con agua a temperatura ambiente y cubierta con apósito limpio y seco, abrigado, y con la sospecha de lesión de la vía aérea comunicada desde el primer momento.',
      },
      fin_hielo: {
        signos: { avdi: 'A', piel: 'tiritando, quemadura blanca' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Cuando llega la unidad, el paciente tirita y la quemadura se ve más profunda. El hielo profundizó la lesión y provocó hipotermia, justo lo que la atención inicial busca evitar.',
      },
      fin_via_aerea: {
        signos: { avdi: 'V', fr: 'muy rápida, con ruido al inspirar', piel: 'pálida' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Cuando llega la unidad, el paciente está muy comprometido. Los signos de lesión por inhalación estaban presentes desde el principio y la vía aérea quedó sin vigilar.',
      },
    },
  },

  // ----------------------------------------------------------
  {
    id: 'caso-m1-caida-de-la-escalera',
    titulo: 'Cae de la escalera en el patio',
    resumen: 'Un adulto cae de una escalera y tiene una fractura abierta de pierna. Cubrir sin reintroducir, valorar lo distal e inmovilizar las articulaciones vecinas.',
    estado: 'borrador',
    temas: [FX],
    fuentes: [AHA_PRIMEROS_AUXILIOS, PHTLS_9],
    // La clave «piel» describe aquí el pie de la pierna lesionada: es lo que
    // el primer respondiente vigila antes y después de inmovilizar.
    rol: 'lego',
    paciente: 'adulto',
    signos: { avdi: 'A', fc: null, fr: 'rápida, por el dolor', spo2: null, ta: null, distal: 'pulso presente en el pie; tibio y rosado; siente y mueve los dedos' },
    historia: 'Me caí de la escalera… la pierna derecha me duele muchísimo.',
    testigos: 'Estaba podando el árbol y se cayó de la escalera. Ya llamé a emergencias.',
    // Versiones: otro hombre adulto y otra tarea en el patio. Siempre fractura
    // abierta de la espinilla con lo distal conservado al principio.
    variantes: [
      {
        etiqueta: 'Tu cuñado podando el árbol',
        testigos: 'Estaba podando el árbol, se movió la escalera y se cayó. Ya llamé a emergencias.',
        nodos: {
          n1: { texto: 'Tu cuñado se cae de la escalera mientras poda el árbol del patio. Está sentado en el pasto, sujetándose la pierna derecha. La espinilla está angulada y por una herida asoma un fragmento de hueso; sangra. Un familiar ya llamó a emergencias. ¿Qué haces con la herida?' },
        },
      },
      {
        etiqueta: 'Tu papá pintando la barda',
        historia: 'Se me fue la escalera… la pierna izquierda, ay, no la puedo ni ver.',
        testigos: 'Estaba pintando la barda, se le resbaló la escalera en el piso mojado y se cayó. Ya hablé a emergencias.',
        nodos: {
          n1: { texto: 'Tu papá, de sesenta y tres años, se cae de la escalera mientras pinta la barda del patio. Está sentado junto a la cubeta de pintura, sujetándose la pierna izquierda. La espinilla está angulada y por una herida asoma un fragmento de hueso; sangra. Tu hermana ya llamó a emergencias. ¿Qué haces con la herida?' },
          n5: {
            texto: 'Mientras esperan la ambulancia, tu papá mira la pierna inmovilizada, hace una mueca y te llama para pedirte algo. Con lo que has explorado, ¿qué haces?',
            historia: 'Ándale, enderézamela, que me da cosa verla torcida. Los dedos sí los siento y los muevo bien.',
          },
        },
      },
      {
        etiqueta: 'Tu vecino limpiando la canaleta',
        historia: 'Me caí de la escalera… la pierna derecha me duele horrible.',
        testigos: 'Estaba limpiando la canaleta del techo, la escalera se ladeó y se vino abajo. Ya llamé a la ambulancia.',
        nodos: {
          n1: { texto: 'Tu vecino, de veintiocho años, se cae de la escalera mientras limpia la canaleta del techo. Está sentado en el piso del patio, junto a la manguera, sujetándose la pierna derecha. La espinilla está angulada y por una herida asoma un fragmento de hueso; sangra. Su novia ya llamó a emergencias. ¿Qué haces con la herida?' },
          n5: {
            texto: 'Mientras esperan la ambulancia, tu vecino mira la pierna inmovilizada, hace una mueca y te llama para pedirte algo. Con lo que has explorado, ¿qué haces?',
            historia: 'Oye, enderézamela tantito, ¿sí? Me da cosa verla chueca. Los dedos sí los siento y los muevo bien.',
          },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Tu cuñado cae de la escalera mientras poda un árbol. Está sentado en el suelo, sujetándose la pierna derecha. La espinilla está angulada y por una herida asoma un fragmento de hueso; sangra. Un familiar ya llamó a emergencias. ¿Qué haces con la herida?',
        opciones: [
          { signos: { fr: 'rápida' }, texto: 'No toco el hueso: cubro la herida con un apósito estéril del botiquín.', va: 'n2', tipo: 'correcta', retro: 'En la fractura abierta el foco comunica con el exterior y hay riesgo de infección: se cubre con apósito estéril y no se intenta reintroducir el hueso.', tema: FX },
          { signos: { fr: 'muy rápida, por el dolor' }, texto: 'Empujo el hueso hacia dentro para poder vendar la pierna.', va: 'n1_reintro', tipo: 'riesgo', retro: 'Nunca se empuja hacia dentro un hueso expuesto: reintroducirlo arrastra contaminación al interior.', tema: FX },
          { signos: { fr: 'muy rápida, por el dolor' }, texto: 'Lavo el hueso con la manguera a presión para limpiarlo.', va: 'n2', tipo: 'riesgo', retro: 'La conducta ante la fractura abierta es cubrir con apósito estéril, inmovilizar en la posición encontrada y trasladar; lavar el hueso a presión no forma parte de ella.', tema: FX },
        ],
      },
      n1_reintro: {
        texto: 'Al presionar, grita de dolor y el fragmento desaparece bajo la piel. La herida sigue sangrando. ¿Qué haces?',
        opciones: [
          { texto: 'No lo vuelvo a tocar: cubro la herida con apósito estéril y aviso de lo que hice a quien lo reciba.', va: 'n2', tipo: 'aceptable', retro: 'Vuelves a la conducta correcta, pero el hueso ya arrastró contaminación al interior. El hueso expuesto se cubre, no se reintroduce.', tema: FX },
          { texto: 'Aprovecho y le enderezo la pierna para dejarla recta.', va: 'n2_alineada', tipo: 'riesgo', retro: 'Como primer respondiente no se alinea ni se reduce una fractura, salvo extremidad sin pulso y con autorización del protocolo.', tema: FX },
        ],
      },
      n2_alineada: {
        signos: { fr: 'muy rápida, por el dolor', distal: 'pulso débil en el pie; pálido; hormigueo en los dedos' },
        texto: 'Grita al mover la pierna. Nunca revisaste el pie antes de moverla. Con lo que has explorado, ¿qué haces?',
        historia: '¡Ay! Siento raro el pie…',
        opciones: [
          { texto: 'Dejo la pierna quieta, cubro la herida y compruebo pulso, sensibilidad y movilidad del pie.', va: 'n2', tipo: 'aceptable', retro: 'Lo correcto era comprobar lo distal antes de cualquier maniobra. Sin esa comparación no sabes si el pie ya estaba así o lo causó el movimiento.', tema: FX },
          { texto: 'Lo dejo así y busco con qué entablillar.', va: 'n3', tipo: 'riesgo', retro: 'Se comprueban pulso, sensibilidad y movilidad distales antes de inmovilizar. Saltarse ese paso deja sin referencia para después.', tema: FX },
        ],
      },
      n2: {
        texto: 'La herida está cubierta. Antes de inmovilizar, ¿qué haces?',
        opciones: [
          { texto: 'Compruebo el pulso en el pie, si siente cuando le toco los dedos y si puede moverlos.', va: 'n3', tipo: 'correcta', retro: 'Se comprueban pulso, sensibilidad y movilidad distales ANTES de inmovilizar, para poder compararlos después.', tema: FX },
          { signos: { fr: 'muy rápida, por el dolor' }, texto: 'Muevo un poco la pierna para sentir si cruje y confirmar la fractura.', va: 'n2_crepita', tipo: 'riesgo', retro: 'La crepitación no se busca a propósito: provocarla causa dolor y puede aumentar la lesión de partes blandas, sin cambiar la conducta.', tema: FX },
        ],
      },
      n2_crepita: {
        texto: 'Al moverla, se nota un crujido y se queja todavía más. Ya sabías que estaba fracturada. ¿Qué haces?',
        opciones: [
          { texto: 'Dejo de moverla y compruebo pulso, sensibilidad y movilidad del pie.', va: 'n3', tipo: 'aceptable', retro: 'La deformidad y el hueso visible ya indicaban la fractura; buscar crepitación solo añadió dolor. Ahora sí haces la valoración distal previa.', tema: FX },
          { texto: 'Paso directamente a entablillar.', va: 'n3', tipo: 'riesgo', retro: 'Falta la comprobación de pulso, sensibilidad y movilidad distales antes de inmovilizar.', tema: FX },
        ],
      },
      n3: {
        signos: { distal: 'pulso presente en el pie; tibio; siente y mueve los dedos' },
        texto: 'Tienes tablas acolchadas del botiquín, vendas y toallas. Con lo que has explorado del pie, ¿cómo inmovilizas?',
        historia: 'Sí, siento cuando me tocas los dedos, y los puedo mover.',
        opciones: [
          { signos: { fr: 'algo más tranquila' }, texto: 'Coloco la férula de modo que abarque la rodilla y el tobillo, acolcho los huecos con toallas y la sujeto sin mover el foco.', va: 'n4', tipo: 'correcta', retro: 'Se inmoviliza incluyendo la articulación proximal y la distal, porque son ellas las que transmiten el movimiento al hueso, y se acolchan los huecos para evitar puntos de presión.', tema: FX },
          { signos: { fr: 'muy rápida, por el dolor' }, texto: 'Pongo una tabla corta solo sobre la zona de la herida.', va: 'n3_corta', tipo: 'riesgo', retro: 'Sujetar el foco sin las articulaciones vecinas no inmoviliza: la rodilla y el tobillo siguen transmitiendo el movimiento al hueso lesionado.', tema: FX },
          { texto: 'Vendo la férula muy apretada y sin acolchar, para que no se mueva nada.', va: 'n3_apretada', tipo: 'riesgo', retro: 'Hay que acolchar los huecos para evitar puntos de presión, y la propia inmovilización puede comprometer lo que estaba indemne.', tema: FX },
        ],
      },
      n3_corta: {
        texto: 'Cada vez que mueve el pie, la tabla se desplaza y él se queja del foco de fractura. ¿Qué haces?',
        opciones: [
          { texto: 'Rehago la inmovilización para que abarque la rodilla y el tobillo, acolchando los huecos.', va: 'n4', tipo: 'aceptable', retro: 'Ahora sí: la inmovilización debe incluir la articulación proximal y la distal al foco.', tema: FX },
          { texto: 'Le pido que no mueva el pie y lo dejo así.', va: 'n4', tipo: 'riesgo', retro: 'Una inmovilización que deja libres las articulaciones vecinas no cumple su función, por mucho que el paciente intente no moverse.', tema: FX },
        ],
      },
      n3_apretada: {
        signos: { distal: 'no encuentras pulso en el pie; frío y pálido; hormigueo, apenas mueve los dedos' },
        texto: 'Terminas de vendar la férula. Con lo que has explorado, ¿qué haces?',
        historia: 'Siento hormigueo en los dedos del pie.',
        opciones: [
          { signos: { distal: 'pulso presente en el pie; tibio; siente y mueve los dedos' }, texto: 'Aflojo el vendaje, acolcho los huecos y vuelvo a comprobar pulso, sensibilidad y movilidad.', va: 'n5', tipo: 'aceptable', retro: 'La comparación con la valoración previa te permitió detectarlo: la inmovilización comprometió lo que estaba indemne. Se corrige y se vuelve a comprobar.', tema: FX },
          { texto: 'Lo dejo así: es normal que una fractura se vea así.', va: 'fin_compromiso', tipo: 'riesgo', retro: 'Antes de inmovilizar el pie estaba tibio y con pulso. Si después ya no, lo comprometió la inmovilización y hay que corregirla.', tema: FX },
        ],
      },
      n4: {
        texto: 'La pierna ya está inmovilizada. ¿Qué haces ahora?',
        opciones: [
          { texto: 'Vuelvo a comprobar pulso, sensibilidad y movilidad del pie y lo comparo con lo de antes.', va: 'n5', tipo: 'correcta', retro: 'Se repite la valoración neurovascular distal DESPUÉS de inmovilizar: sin la comparación no se sabe si la férula comprometió algo.', tema: FX },
          { texto: 'Ya está bien sujeta; no hace falta revisar nada más.', va: 'n4_sin_revisar', tipo: 'riesgo', retro: 'Omitir la comprobación posterior impide saber si la inmovilización comprometió la circulación o la inervación.', tema: FX },
        ],
      },
      n4_sin_revisar: {
        signos: { distal: 'no encuentras pulso en el pie; frío y pálido; hormigueo, apenas mueve los dedos' },
        texto: 'Pasa un rato mientras esperan la ambulancia. Con lo que has explorado, ¿qué haces?',
        historia: 'Siento hormigueo en los dedos del pie… ¿es normal?',
        opciones: [
          { signos: { distal: 'pulso presente en el pie; tibio; siente y mueve los dedos' }, texto: 'Reviso la férula, aflojo lo que comprime y vuelvo a comprobar pulso, sensibilidad y movilidad.', va: 'n5', tipo: 'aceptable', retro: 'Lo detectas tarde. La comprobación inmediatamente después de inmovilizar es la que lo habría revelado a tiempo.', tema: FX },
          { texto: 'Espero a la ambulancia sin tocar nada.', va: 'fin_compromiso', tipo: 'riesgo', retro: 'Un cambio en pulso, sensibilidad o movilidad tras inmovilizar indica que la férula puede estar comprometiendo la extremidad.', tema: FX },
        ],
      },
      n5: {
        signos: { fr: 'algo más tranquila', distal: 'pulso presente en el pie; tibio; siente y mueve los dedos' },
        texto: 'Mientras esperan la ambulancia, tu cuñado mira la pierna inmovilizada, hace una mueca y te llama para pedirte algo. Con lo que has explorado, ¿qué haces?',
        historia: 'Ándale, enderézame la pierna, que me duele verla chueca. Los dedos sí los siento y los muevo bien.',
        opciones: [
          { texto: 'Le explico que no se la voy a enderezar: queda inmovilizada como está hasta que llegue la ambulancia.', va: 'fin_bien', tipo: 'correcta', retro: 'Como primer respondiente no se alinea ni se reduce una fractura; la excepción es una extremidad sin pulso con autorización del protocolo, y lo que encontraste en este pie no lo justifica.', tema: FX },
          { signos: { fr: 'muy rápida, por el dolor', distal: 'pulso débil en el pie; pálido; hormigueo en los dedos' }, texto: 'Le hago caso y se la enderezo con cuidado.', va: 'fin_alineada', tipo: 'riesgo', retro: 'No se alinea ni se reduce una fractura como primer respondiente, salvo extremidad sin pulso y con autorización del protocolo.', tema: FX },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Llega la unidad. Entregas una fractura abierta cubierta con apósito estéril, inmovilizada en la posición encontrada incluyendo rodilla y tobillo, con la circulación, la sensibilidad y la movilidad distales comprobadas antes y después.',
      },
      fin_compromiso: {
        signos: { distal: 'no encuentras pulso en el pie; frío y pálido; hormigueo, apenas mueve los dedos' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Cuando llega la unidad, la circulación del pie sigue comprometida. La inmovilización comprometió lo que antes estaba indemne y nadie la corrigió.',
      },
      fin_alineada: {
        signos: { distal: 'pulso débil en el pie; pálido; hormigueo en los dedos' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Al mover la fractura el dolor se dispara y la circulación del pie se compromete. La circulación distal estaba conservada, así que no había ninguna razón para alinearla, y la inmovilización que estaba bien hecha se perdió.',
      },
    },
  },

  // ----------------------------------------------------------
  {
    id: 'caso-m6-lactante-se-atraganta',
    titulo: 'Se atraganta en la silla alta',
    resumen: 'Un lactante de 8 meses se atraganta comiendo. Esperar mientras tose, intervenir cuando la obstrucción es grave y no comprimirle el abdomen.',
    estado: 'borrador',
    temas: [OV],
    fuentes: [AHA_PBLS_2025, WHO_BEC],
    rol: 'lego',
    paciente: 'lactante',
    // Sin monitor: lo que se ve y se oye. El lactante responde llorando; cuando
    // la obstrucción es grave deja de emitir sonido (Glasgow V1 solo para que
    // el motor responda «no llora ni emite sonido»: al lactante no se le pide
    // Glasgow). No puede contar nada y está a solas con quien lo cuida: sin
    // historia ni testigos.
    signos: { avdi: 'A', fc: null, fr: 'tos fuerte, llanto', spo2: null, ta: null, piel: 'enrojecida' },
    // Versiones: otro lactante (siempre menor de un año, varón como en las
    // opciones), otro alimento en trozo y otra persona a cargo, siempre a solas.
    variantes: [
      {
        etiqueta: 'Tu sobrino de 8 meses con fruta',
        nodos: {
          n1: { texto: 'Cuidas a tu sobrino de 8 meses mientras come trocitos de fruta en su silla alta. De repente, con un trozo a medio masticar, se agita en la silla. Con lo que has explorado, ¿qué haces?' },
        },
      },
      {
        etiqueta: 'Tu hijo de 10 meses con galleta',
        nodos: {
          n1: { texto: 'Le das de comer a tu hijo de 10 meses en su silla alta: trozos de galleta que agarra con la mano. De pronto, con un trozo en la boca, se agita y se echa hacia delante. Con lo que has explorado, ¿qué haces?' },
          n6: { texto: 'Tras otro ciclo, el trozo de galleta sale a la parte delantera de la boca y lo ves con claridad. Con lo que has explorado, ¿qué haces?' },
          n_inconsciente: { texto: 'Tu hijo queda flácido en tus brazos. Con lo que has explorado, ¿qué haces?' },
          n_rcp2: { texto: 'Continúas la secuencia. La siguiente vez que abres la vía aérea, ves con claridad el trozo de galleta en la parte delantera de la boca.' },
        },
      },
      {
        etiqueta: 'Tu hermanito de 7 meses con zanahoria',
        nodos: {
          n1: { texto: 'Te quedaste a cargo de tu hermanito de 7 meses mientras tu mamá fue a la tienda. Come trocitos de zanahoria cocida en su silla alta y, de pronto, con un trozo a medio comer, se agita en la silla. Con lo que has explorado, ¿qué haces?' },
          n6: { texto: 'Tras otro ciclo, el trozo de zanahoria sale a la parte delantera de la boca y lo ves con claridad. Con lo que has explorado, ¿qué haces?' },
          n_inconsciente: { texto: 'Tu hermanito queda flácido en tus brazos. Con lo que has explorado, ¿qué haces?' },
          n_rcp2: { texto: 'Continúas la secuencia. La siguiente vez que abres la vía aérea, ves con claridad el trozo de zanahoria en la parte delantera de la boca.' },
        },
      },
    ],
    inicio: 'n1',
    nodos: {
      n1: {
        texto: 'Cuidas a tu sobrino de 8 meses mientras come trocitos de fruta en su silla alta. De pronto, con un trozo a medio comer, se agita en la silla. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'No intervengo: me quedo a su lado, lo animo y lo vigilo sin apartarme, listo para actuar si empeora.', va: 'n2', tipo: 'correcta', retro: 'Tos eficaz y capacidad de llorar indican obstrucción leve. Mientras tosa con eficacia, la tos es más efectiva que cualquier maniobra.', tema: OV },
          { signos: { fr: 'tos débil, sin sonido', piel: 'violácea', glasgow: 'O4V1M6' }, texto: 'Lo saco de la silla y le doy golpes en la espalda de inmediato.', va: 'n1_empeora', tipo: 'riesgo', retro: 'Con tos eficaz no se golpea la espalda: intervenir sobre una obstrucción leve puede desplazar el cuerpo extraño y convertirla en grave.', tema: OV },
          { signos: { fr: 'tos débil, sin sonido', piel: 'violácea', glasgow: 'O4V1M6' }, texto: 'Le meto el dedo en la boca para sacar el trozo.', va: 'n1_empeora', tipo: 'riesgo', retro: 'No se busca a ciegas: el barrido puede empujar el cuerpo extraño más adentro y transformar una obstrucción parcial en completa.', tema: OV },
        ],
      },
      n1_empeora: {
        texto: 'Tras lo que hiciste, lo tienes delante con la boca abierta. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Ahora es una obstrucción grave: intervengo de inmediato.', va: 'n3', tipo: 'aceptable', retro: 'La obstrucción pasó de leve a grave, quizá por la maniobra anterior. Con obstrucción grave hay que intervenir de inmediato.', tema: OV },
          { texto: 'Espero a que vuelva a toser solo.', va: 'n2_espera', tipo: 'riesgo', retro: 'Tos silenciosa o ausente y no poder emitir sonido son signos de obstrucción grave: requiere intervención inmediata.', tema: OV },
        ],
      },
      n2: {
        signos: { fr: 'tos débil, sin sonido', piel: 'violácea', glasgow: 'O4V1M6' },
        texto: 'Pasan unos segundos sin que te apartes de su lado. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'La obstrucción se volvió grave: intervengo de inmediato.', va: 'n3', tipo: 'correcta', retro: 'Tos débil o silenciosa y no poder emitir sonido definen la obstrucción grave, y en ella se interviene de inmediato.', tema: OV },
          { texto: 'Sigo esperando: todavía hace algún intento de toser.', va: 'n2_espera', tipo: 'riesgo', retro: 'La regla de no intervenir vale mientras la tos es eficaz. Una tos débil y silenciosa ya es obstrucción grave.', tema: OV },
        ],
      },
      n2_espera: {
        signos: { fr: 'sin entrada de aire', piel: 'cianótica' },
        texto: 'Pasan unos segundos más. Empieza a aflojarse en tus brazos. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Intervengo ya con las maniobras.', va: 'n3', tipo: 'aceptable', retro: 'Llega tarde, pero es la conducta: la obstrucción grave exige intervenir de inmediato.', tema: OV },
          { signos: { avdi: 'I', fr: 'no respira', piel: 'cianótica, flácido' }, texto: 'Llamo a alguien para preguntar qué hacer y espero.', va: 'n_inconsciente', tipo: 'riesgo', retro: 'Con obstrucción grave se interviene de inmediato; esperar permite que la falta de aire progrese hasta la pérdida de respuesta.', tema: OV },
        ],
      },
      n3: {
        signos: { fr: 'sin entrada de aire' },
        texto: 'Vas a intervenir. Lo tienes en brazos. ¿Cómo lo atiendes?',
        opciones: [
          { signos: { fr: 'intentos de tos' }, texto: 'Lo sostengo boca abajo con la cabeza más baja que el tronco, apoyando cabeza y mandíbula sin apretar el cuello, y le doy una serie de golpes entre los omóplatos con el talón de la mano.', va: 'n4', tipo: 'correcta', retro: 'Es la posición y la primera serie del algoritmo del lactante que responde: cabeza más baja que el tronco, sin comprimir los tejidos blandos del cuello, y golpes dorsales con el talón de la mano.', tema: OV },
          { texto: 'Lo abrazo por detrás y le hago compresiones en el abdomen, como a un adulto.', va: 'n3_abdominal', tipo: 'riesgo', retro: 'Al lactante NO se le aplican compresiones abdominales: su hígado y su bazo están menos cubiertos por la parrilla costal y pueden lesionarse.', tema: OV },
        ],
      },
      n3_abdominal: {
        signos: { fr: 'sin entrada de aire', piel: 'cianótica' },
        texto: 'El trozo no sale. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { fr: 'intentos de tos' }, texto: 'Cambio de técnica: cabeza más baja que el tronco, golpes dorsales y después compresiones torácicas.', va: 'n4', tipo: 'aceptable', retro: 'Corriges: en el lactante se combinan golpes dorsales y compresiones torácicas. Como se aplicaron compresiones abdominales, habrá que comunicarlo en la entrega.', tema: OV },
          { signos: { avdi: 'I', fr: 'no respira', piel: 'cianótica, flácido' }, texto: 'Sigo con las compresiones abdominales, más fuerte.', va: 'n_inconsciente', tipo: 'riesgo', retro: 'Las compresiones abdominales pueden lesionar el hígado y el bazo del lactante y no son su maniobra. Se usan golpes dorsales y compresiones torácicas.', tema: OV },
        ],
      },
      n4: {
        texto: 'Terminaste la serie de golpes dorsales. El trozo no ha salido. ¿Qué sigue?',
        opciones: [
          { texto: 'Lo giro con cuidado, sin soltarle la cabeza, y le doy una serie de compresiones torácicas en el mismo punto que en la reanimación.', va: 'n5', tipo: 'correcta', retro: 'Tras los golpes dorsales, en el lactante se aplica una serie de compresiones torácicas en el mismo punto que las de la reanimación, manteniendo el apoyo de la cabeza.', tema: OV },
          { texto: 'Sigo solo con golpes en la espalda, sin girarlo.', va: 'n5', tipo: 'aceptable', retro: 'La secuencia alterna series de golpes dorsales y de compresiones torácicas; quedarse solo en los golpes omite la mitad del ciclo.', tema: OV },
        ],
      },
      n5: {
        signos: { fr: 'tos débil, sin sonido' },
        texto: 'Antes de repetir el ciclo miras su boca. No ves nada con claridad: solo saliva.',
        opciones: [
          { texto: 'No meto el dedo: sigo alternando series de golpes dorsales y compresiones torácicas, mirando la boca entre ciclos.', va: 'n6', tipo: 'correcta', retro: 'Solo se retira lo que se ve con claridad y puede extraerse con seguridad. Se continúa alternando las series y comprobando la boca entre ciclos.', tema: OV },
          { signos: { avdi: 'I', fr: 'no respira', piel: 'cianótica, flácido' }, texto: 'Meto el dedo hasta el fondo para buscar el trozo.', va: 'n_inconsciente', tipo: 'riesgo', retro: 'El barrido a ciegas puede empujar el cuerpo extraño más adentro y transformar una obstrucción parcial en completa.', tema: OV },
        ],
      },
      n6: {
        signos: { fr: 'llanto fuerte', piel: 'rosada', glasgow: 'O4V5M6' },
        texto: 'Tras otro ciclo, el trozo de fruta sale a la parte delantera de la boca y lo ves con claridad. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { texto: 'Retiro el trozo, que veo y puedo sacar con seguridad, y pido que lo valoren aunque parezca recuperado.', va: 'fin_bien', tipo: 'correcta', retro: 'Todo paciente que sufrió una obstrucción grave debe ser valorado aunque parezca recuperado: puede quedar material residual o haberse producido una lesión durante las maniobras.', tema: OV },
          { texto: 'Retiro el trozo y, como ya llora y está rosado, no hace falta que nadie lo vea.', va: 'fin_sin_valorar', tipo: 'riesgo', retro: 'Parecer recuperado no basta: puede quedar material residual o una lesión por las maniobras. Se valora siempre.', tema: OV },
        ],
      },
      n_inconsciente: {
        texto: 'El bebé queda flácido en tus brazos. Con lo que has explorado, ¿qué haces?',
        opciones: [
          { signos: { piel: 'cianótica, flácido, sobre superficie firme' }, texto: 'Grito pidiendo ayuda y que llamen a emergencias, lo coloco sobre una superficie firme e inicio la secuencia de reanimación que aprendí.', va: 'n_rcp', tipo: 'correcta', retro: 'La pérdida de respuesta es la tercera situación del algoritmo: pedir ayuda y activar el sistema, superficie firme e iniciar la reanimación conforme a la guía vigente y al protocolo.', tema: OV },
          { texto: 'Sigo dándole golpes en la espalda sosteniéndolo en brazos.', va: 'fin_mal', tipo: 'riesgo', retro: 'Cuando pierde la respuesta la conducta cambia por completo: superficie firme y secuencia de reanimación, no más golpes dorsales en brazos.', tema: OV },
        ],
      },
      n_rcp: {
        texto: 'Al abrir la vía aérea para ventilar, miras la boca y no ves nada. Das la ventilación y el tórax no se eleva.',
        opciones: [
          { signos: { piel: 'cianótica' }, texto: 'Recoloco la cabeza y vuelvo a intentar la ventilación.', va: 'n_rcp2', tipo: 'correcta', retro: 'Si el tórax no se eleva, se recoloca la cabeza y se vuelve a intentar.', tema: OV },
          { texto: 'Busco el objeto con el dedo en el fondo de la garganta.', va: 'fin_mal', tipo: 'riesgo', retro: 'No se busca a ciegas: solo se retira lo que se ve. El barrido puede empujar el objeto más adentro.', tema: OV },
        ],
      },
      n_rcp2: {
        texto: 'Continúas la secuencia. La siguiente vez que abres la vía aérea, ves con claridad el trozo de fruta en la parte delantera de la boca.',
        opciones: [
          { signos: { fr: 'respira con esfuerzo', piel: 'pálida' }, texto: 'Lo retiro, porque lo veo y puedo sacarlo con seguridad, y sigo la secuencia hasta que llegue el equipo.', va: 'fin_relevo', tipo: 'correcta', retro: 'Cada vez que se abre la vía aérea se mira la boca y se retira el objeto solo si se ve. Se continúa hasta la resolución o el relevo por un equipo con mayor alcance.', tema: OV },
          { texto: 'No lo toco y sigo con la secuencia tal cual.', va: 'fin_mal', tipo: 'riesgo', retro: 'Lo que se ve con claridad y puede extraerse con seguridad se retira: es precisamente para eso que se mira la boca al abrir la vía aérea.', tema: OV },
        ],
      },
      fin_bien: {
        fin: true,
        desenlace: 'favorable',
        texto: 'La obstrucción se resolvió con golpes dorsales y compresiones torácicas, sin barrido a ciegas, y el bebé será valorado aunque parezca recuperado. Si en algún momento se aplicaron compresiones abdominales, se comunica de forma explícita en la entrega.',
      },
      fin_relevo: {
        fin: true,
        desenlace: 'favorable',
        texto: 'Llega el equipo y releva la atención. Entregas lo ocurrido: obstrucción grave que progresó a pérdida de respuesta, reanimación iniciada y objeto retirado al verse en la boca. Será valorado por el riesgo de material residual o de lesión por las maniobras.',
      },
      fin_sin_valorar: {
        fin: true,
        desenlace: 'desfavorable',
        texto: 'El bebé no recibe valoración. Puede quedar material residual en la vía aérea o una lesión por las maniobras, y nadie lo comprobará.',
      },
      fin_mal: {
        signos: { avdi: 'I', fr: 'no respira', piel: 'cianótica' },
        fin: true,
        desenlace: 'desfavorable',
        texto: 'Cuando llega la ayuda, la obstrucción sigue sin resolverse. La conducta de la pérdida de respuesta —superficie firme, reanimación y mirar la boca sin buscar a ciegas— no se aplicó.',
      },
    },
  },
]
