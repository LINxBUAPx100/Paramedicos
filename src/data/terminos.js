// ============================================================
//  Términos y condiciones de uso — texto oficial
// ------------------------------------------------------------
//  Vive como DATOS y no como JSX por tres razones:
//
//   1. la misma versión se pinta en la página pública y en la pantalla de
//      aceptación, y dos copias del mismo texto legal acaban divergiendo;
//   2. `VERSION` es lo que se guarda en el perfil de quien acepta. Al cambiar
//      el texto se sube la versión y la plataforma vuelve a pedir la
//      aceptación: sin eso, alguien quedaría vinculado a un texto que ya no
//      es el que aceptó;
//   3. se puede comprobar con `npm test` que el texto existe, que no promete
//      cosas que el software no hace y que la versión es una fecha.
//
//  QUÉ SE ADAPTÓ DEL BORRADOR ENTREGADO (30 de agosto de 2026)
//
//  Un contrato no puede afirmar como hecho algo que el sistema no hace. Se
//  corrigieron tres afirmaciones y se añadió lo que faltaba:
//
//   · «El sistema monitorea direcciones IP y conexiones simultáneas» — la
//     plataforma NO hace eso: no registra direcciones IP ni cuenta sesiones
//     abiertas, y no hay código que lo haga. Declararlo sería falso y además
//     comprometería a un tratamiento de datos que nadie ha implantado. La
//     prohibición de compartir credenciales se conserva; la vigilancia, no.
//   · «El sistema está programado para suspender automáticamente el acceso a
//     quien presente atrasos» — hoy la suspensión automática existe solo para
//     los códigos de acceso temporal, que caducan sin intervención. La
//     suspensión por cuotas la ejecuta la academia. Se redacta como lo que es.
//   · «ligado a la matrícula del alumno» — la matrícula todavía no existe en
//     la plataforma; el acceso va ligado a la cuenta personal. Se deja escrito
//     de forma que siga siendo cierto cuando la matrícula se implante.
//   · Se añadió el apartado de DATOS PERSONALES, que el borrador no traía y
//     que la plataforma sí necesita: guarda nombre, correo, avance y
//     resultados. Un aviso de privacidad completo conforme a la LFPDPPP es un
//     documento aparte y debe redactarlo un abogado.
//
//  Este archivo NO es asesoría legal. El texto lo debe revisar y aprobar la
//  Academia RESCATE antes de exigir su aceptación a nadie.
// ============================================================

// Versión del texto, en AAAA-MM-DD. Es lo que se guarda en el perfil al
// aceptar. CAMBIARLA OBLIGA A TODOS A ACEPTAR DE NUEVO: hazlo cuando cambie el
// fondo del acuerdo, no cuando corrijas una coma.
export const VERSION_TERMINOS = '2026-08-30'

export const TITULO_TERMINOS = 'Términos y condiciones de uso'
export const JURISDICCION = 'Puebla, Puebla, México'

export const TERMINOS = [
  {
    n: 1,
    titulo: 'Aceptación de los términos',
    parrafos: [
      'El acceso y uso de la plataforma educativa PTEM / T-Tem (en adelante, «la Plataforma»), '
        + 'operada para la Academia RESCATE, constituye la aceptación expresa y sin reservas de '
        + 'los presentes términos y condiciones por parte del usuario (en adelante, «el Alumno» '
        + 'o «el Usuario»).',
      'Si no está de acuerdo con estos términos, deberá abstenerse de utilizar la Plataforma.',
    ],
  },
  {
    n: 2,
    titulo: 'Titularidad y propiedad intelectual',
    parrafos: [
      'La Plataforma y todo su contenido están protegidos por las leyes de derechos de autor y '
        + 'propiedad industrial aplicables en los Estados Unidos Mexicanos y por los tratados '
        + 'internacionales de los que México es parte. La titularidad se divide así:',
    ],
    puntos: [
      {
        titulo: 'Propiedad del software',
        texto: 'Todo el código fuente, el código objeto, el diseño de interfaz, la arquitectura '
          + 'de bases de datos, los algoritmos y la estructura de funcionamiento de la Plataforma '
          + 'son propiedad intelectual exclusiva e intransferible del desarrollador '
          + 'Mihael Alejandro Tejeda Soto.',
      },
      {
        titulo: 'Propiedad del contenido académico',
        texto: 'Los planes de estudio, textos, glosarios, simuladores, recursos multimedia, '
          + 'reactivos de evaluación, manuales de capacitación paramédica y transmisiones en '
          + 'vivo son propiedad intelectual exclusiva de la Academia RESCATE.',
      },
      {
        titulo: 'Material de terceros',
        texto: 'Parte del material gráfico procede de terceros y se usa bajo su licencia, con el '
          + 'crédito y las condiciones que cada una exige. Esa titularidad no se transfiere y se '
          + 'documenta en la propia Plataforma.',
      },
    ],
  },
  {
    n: 3,
    titulo: 'Licencia de uso y prohibiciones',
    parrafos: [
      'El Usuario recibe una licencia de uso personal, temporal, revocable y no exclusiva. '
        + 'Queda estrictamente prohibido lo siguiente, y su incumplimiento es causal de '
        + 'suspensión inmediata del servicio y de las acciones legales que correspondan:',
    ],
    puntos: [
      {
        titulo: 'Reproducción',
        texto: 'Copiar, descargar, grabar —incluida la grabación o captura de pantalla—, '
          + 'fotografiar o reproducir por cualquier medio el contenido de las clases, los '
          + 'simuladores o el material didáctico.',
      },
      {
        titulo: 'Distribución y comercialización',
        texto: 'Vender, revender, licenciar, alquilar, distribuir o lucrar directa o '
          + 'indirectamente con cualquier elemento de la Plataforma.',
      },
      {
        titulo: 'Ingeniería inversa',
        texto: 'Descompilar, alterar, extraer el código fuente o vulnerar los sistemas de '
          + 'seguridad, las reglas de acceso o los medios de pago de la Plataforma.',
      },
      {
        titulo: 'Uso compartido de credenciales',
        texto: 'El acceso es estrictamente individual y va ligado a la cuenta personal del '
          + 'Usuario —y, cuando la Academia la asigne, a su matrícula—. Compartir el usuario o '
          + 'la contraseña con terceros está prohibido y es causal de suspensión.',
      },
    ],
  },
  {
    n: 4,
    titulo: 'Acceso, asistencia y pagos',
    puntos: [
      {
        titulo: 'Condición financiera',
        texto: 'El derecho de acceso a la Plataforma y a sus actividades en vivo está '
          + 'condicionado al cumplimiento puntual de las cuotas que establezca la Academia. La '
          + 'Academia puede suspender el acceso de quien presente atrasos. Los códigos de acceso '
          + 'temporal caducan de forma automática en la fecha con la que se emitieron.',
      },
      {
        titulo: 'Vigencia del plan de la Academia',
        texto: 'El acceso de los alumnos depende además de que el plan contratado por su '
          + 'Academia esté vigente. Si la Academia queda suspendida, sus alumnos pierden el '
          + 'acceso al contenido mientras dure esa situación.',
      },
      {
        titulo: 'Registro de asistencia',
        texto: 'La participación en simuladores y la calificación de actividades en vivo '
          + 'requieren que el Alumno tenga registrada su asistencia a la sesión correspondiente. '
          + 'Ese registro lo gestiona el personal de la Academia.',
      },
      {
        titulo: 'Visibilidad del contenido',
        texto: 'La Academia decide qué módulos y temas se liberan a cada grupo y en qué momento. '
          + 'Que un contenido exista en el plan de estudios no implica que esté disponible desde '
          + 'el primer día.',
      },
    ],
  },
  {
    n: 5,
    titulo: 'Datos personales',
    parrafos: [
      'Para prestar el servicio, la Plataforma trata los siguientes datos del Usuario: nombre, '
        + 'correo electrónico, academia y grupo al que pertenece, avance de estudio, resultados '
        + 'de exámenes y actividades, y el registro de las acciones que realiza dentro de la '
        + 'Plataforma.',
      'Esos datos son visibles para el personal docente y directivo de su propia Academia, con '
        + 'la finalidad de dar seguimiento académico, y para la administración de la Plataforma '
        + 'con fines de soporte. No se venden ni se ceden a terceros con fines comerciales.',
      'El Usuario puede ejercer sus derechos de acceso, rectificación, cancelación y oposición a '
        + 'través de la Academia RESCATE. El aviso de privacidad integral, en los términos de la '
        + 'Ley Federal de Protección de Datos Personales en Posesión de los Particulares, se '
        + 'pone a disposición del Usuario por ese mismo conducto.',
    ],
  },
  {
    n: 6,
    titulo: 'Limitación de responsabilidad y descargo médico',
    parrafos: [
      'La Plataforma proporciona herramientas de simulación y estudio para la atención '
        + 'prehospitalaria y de emergencias médicas. Su contenido es estrictamente académico.',
      'Ninguna dosis, tiempo, cifra ni procedimiento publicado en la Plataforma sustituye al '
        + 'protocolo del servicio en el que el Usuario labore, a su dirección médica ni a su '
        + 'alcance profesional. El contenido que aún no ha sido validado por el cuerpo docente se '
        + 'identifica como tal dentro de la propia Plataforma, y debe estudiarse como apoyo y no '
        + 'como referencia definitiva.',
      'Ni el desarrollador del software ni la Academia RESCATE se hacen responsables de la '
        + 'aplicación práctica, clínica o táctica que el Usuario haga de los conocimientos '
        + 'adquiridos en situaciones reales. El Usuario asume la responsabilidad de sus actos en '
        + 'el campo.',
    ],
  },
  {
    n: 7,
    titulo: 'Consecuencias por incumplimiento',
    parrafos: [
      'La Academia RESCATE y la administración de la Plataforma se reservan el derecho de '
        + 'suspender o cancelar la cuenta de cualquier Usuario que incumpla estos términos, sin '
        + 'derecho a reembolso.',
      'Los titulares de la propiedad intelectual se reservan el derecho de ejercer las acciones '
        + 'civiles, penales o administrativas que correspondan por daños y perjuicios, incluidas '
        + 'las infracciones a la Ley Federal del Derecho de Autor.',
    ],
  },
  {
    n: 8,
    titulo: 'Modificaciones',
    parrafos: [
      'La Academia se reserva el derecho de modificar estos términos y condiciones. Los cambios '
        + 'se notifican dentro de la propia Plataforma y, cuando afecten al fondo del acuerdo, se '
        + 'solicita de nuevo la aceptación del Usuario antes de continuar usándola.',
    ],
  },
  {
    n: 9,
    titulo: 'Jurisdicción',
    parrafos: [
      `Para la interpretación y el cumplimiento de estos términos, las partes se someten a las `
        + `leyes aplicables en los Estados Unidos Mexicanos y a los tribunales competentes de `
        + `${JURISDICCION}, renunciando a cualquier otro fuero que pudiera corresponderles.`,
    ],
  },
]
