// ============================================================
//  Módulo 4 · Farmacología
// ------------------------------------------------------------
//  Unidad completa, en el orden del PDF: generalidades de farmacología,
//  fármacos usados en el SMU según la NOM-034, medicamentos y sus dosis en la
//  urgencia, y manejo de infusiones y aminas.
//
//  Asignación de docs/REGISTRO-FUENTES-ACADEMICAS.json para `m4-farmacologia`:
//  primarias COFEPRIS/IPP y NOM-034; apoyo AMLS 4.ª ed.; requiere protocolo
//  local. Y dos bloqueos declarados: «Vademécum no identificado» y «Dosis e
//  infusiones sin formulario y concentraciones locales».
//
//  Esos dos bloqueos son los que dan forma a este archivo. Aquí NO hay ni una
//  dosis, ni una concentración, ni una receta de infusión. No es cautela
//  decorativa: una dosis solo puede publicarse cuando constan su indicación, su
//  población, su vía, su concentración, la guía clínica vigente que la sostiene
//  y una información para prescribir verificable del producto registrado. La
//  academia todavía no ha entregado su formulario ni las concentraciones que
//  maneja, así que esa combinación no existe.
//
//  Los dos últimos temas llevan BLOQUEO PARCIAL declarado: se enseña el método
//  que permite verificar y administrar con seguridad, y se detiene expresamente
//  la parte que no puede sostenerse. Un número inventado en esta unidad no
//  produce un error académico: produce una administración equivocada.
//
//  La NOM-034 NO es un vademécum. Dice qué debe haber en cada tipo de unidad;
//  no dice cuánto, a quién ni cuándo administrarlo.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-16'

const COFEPRIS_IPP = {
  nombre: 'COFEPRIS. Guía para estructurar y redactar la Información para Prescribir e instructivo, '
    + 'y registro sanitario de medicamentos. Consultada el 16 de agosto de 2026.',
  url: 'https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo',
  nota: 'Fuente regulatoria mexicana de la que proceden composición, concentración, indicaciones '
    + 'aprobadas, vías, contraindicaciones y advertencias de CADA producto registrado. Es la que hay '
    + 'que abrir para el medicamento concreto que lleva la unidad; esta lección no la sustituye.',
}
const NOM_034 = {
  nombre: 'Diario Oficial de la Federación. NOM-034-SSA3-2013, Regulación de los servicios de salud. '
    + 'Atención médica prehospitalaria, publicada el 23 de septiembre de 2014.',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5361072&fecha=23/09/2014',
  nota: 'Establece el equipamiento, los insumos y el personal exigidos según el tipo de ambulancia. '
    + 'Es una norma de DOTACIÓN y de organización del servicio: no es un vademécum y no fija '
    + 'indicaciones ni dosis.',
}
// Cita específica para el tema que el plan titula «Fármacos usados en el SMU
// según la NOM 034»: ahí sí hay que señalar los numerales exactos de los que
// sale cada renglón de la dotación, porque el tema reproduce la lista.
const NOM_034_APENDICES = {
  nombre: 'DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): '
    + 'numerales 4.1.2 a 4.1.5 y Apéndices Normativos A.4, B.4, C.3 y D.1.',
  url: 'https://dof.gob.mx/nota_detalle.php?codigo=5361072&fecha=23/09/2014',
  nota: 'Texto consultado en el DOF el 16 de agosto de 2026. Origen literal de los tipos de ambulancia '
    + 'y de la dotación mínima de medicamentos y soluciones por tipo de unidad que reproduce esta '
    + 'lección. La norma enuncia principio activo y forma farmacéutica; no enuncia indicación, '
    + 'población, dosis, concentración ni vía.',
}
const AMLS_4 = {
  nombre: 'NAEMT. Advanced Medical Life Support (AMLS), 4.ª edición.',
  url: 'https://www.naemt.org/education/medical-education/amls',
  nota: 'Fuente de APOYO asignada por el registro académico para el razonamiento clínico de la '
    + 'urgencia médica. Capítulo y página PENDIENTES: solo puede precisarlos quien consulte la copia '
    + 'licenciada de la academia. No se usa para sostener ninguna dosis.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })
const FUENTES = F([COFEPRIS_IPP, NOM_034, AMLS_4])

const SIN_DOSIS = 'No se publica ninguna dosis, concentración ni velocidad de infusión. Una cifra '
  + 'solo puede publicarse con indicación, población, vía, concentración, guía clínica vigente e IPP '
  + 'verificable del producto registrado que use el servicio; esa combinación todavía no existe '
  + 'porque falta el formulario de la academia.'
const ALCANCE = 'ALCANCE: administrar un medicamento es un acto autorizado, no una habilidad. '
  + 'Depende de la certificación del prestador, del tipo de unidad y de la dirección médica que '
  + 'respalde la indicación.'
const NO_VADEMECUM = 'El plan de estudios cita un «Vademécum farmacología» que no se ha podido '
  + 'identificar por título, autor ni edición. No se cita en ninguna parte de esta unidad hasta que '
  + 'la academia lo identifique o lo sustituya por la IPP y su formulario.'

const ficha = (extra = []) => ({
  estado: 'en_revision',
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'COFEPRIS/IPP vigente; NOM-034-SSA3-2013; AMLS 4.ª ed. como apoyo',
  observaciones: [
    'Redactado desde cero en la remediación de 2026; el tema estaba vacío.',
    ALCANCE,
    SIN_DOSIS,
    NO_VADEMECUM,
    ...extra,
  ],
  fuentes: [
    'COFEPRIS. Información para Prescribir y registro sanitario (consultada 2026-08-16).',
    'NOM-034-SSA3-2013, DOF.',
    'NAEMT. AMLS, 4.ª ed. (apoyo; página pendiente).',
  ],
})

export default {
  // ============================================================
  //  Generalidades de farmacología
  // ============================================================
  'm4-far-generalidades': {
    icono: '💊',
    duracion: '20 min',
    resumen: 'Qué le hace el cuerpo al medicamento y qué le hace el medicamento al cuerpo, y por qué esas '
      + 'dos preguntas explican casi todos los errores de administración.',
    objetivos: [
      'Diferenciar farmacocinética de farmacodinamia.',
      'Relacionar la vía de administración con el inicio y la previsibilidad del efecto.',
      'Interpretar el margen terapéutico y su relación con la toxicidad.',
      'Aplicar la verificación previa a toda administración.',
    ],
    secciones: [
      {
        titulo: 'Las dos preguntas que ordenan la materia',
        bloques: [
          { tipo: 'p', texto: 'Toda la farmacología se organiza alrededor de dos preguntas simétricas. La farmacocinética responde qué le hace el organismo al medicamento: cómo entra, adónde llega, cómo se transforma y cómo sale. La farmacodinamia responde qué le hace el medicamento al organismo: sobre qué actúa y con qué consecuencia.' },
          {
            tipo: 'tabla',
            titulo: 'Farmacocinética: el recorrido',
            headers: ['Proceso', 'Qué ocurre', 'Por qué importa en urgencias'],
            filas: [
              ['Liberación', 'El principio activo queda disponible desde su forma farmacéutica', 'Una forma de liberación prolongada no sirve para un efecto inmediato'],
              ['Absorción', 'Pasa desde el sitio de administración a la circulación', 'La vía intravenosa la OMITE: el fármaco se deposita ya en la sangre, y por eso su efecto es más rápido y previsible que el de las vías que dependen de absorberse'],
              ['Distribución', 'Se reparte desde la sangre hacia los tejidos', 'Depende del gasto cardiaco y del flujo regional: en shock el reparto hacia el sitio de acción puede ser más lento, aunque el fármaco ya esté en la circulación'],
              ['Metabolismo', 'Se transforma, sobre todo en el hígado', 'La enfermedad hepática y las interacciones lo alteran'],
              ['Excreción', 'Se elimina, sobre todo por el riñón', 'La insuficiencia renal prolonga el efecto y favorece la acumulación'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Qué cambia —y qué no— en el paciente hipoperfundido', texto: 'Conviene separar dos cosas que suelen mezclarse. Un fármaco administrado por vía intravenosa periférica NO se queda «en el trayecto»: esa vía omite la absorción y el fármaco entra directamente en la circulación. Lo que la hipoperfusión puede alterar es la fase siguiente, la distribución: con gasto cardiaco bajo y flujo regional reducido, el fármaco tarda más en llegar al tejido donde actúa, de modo que el inicio del efecto puede retrasarse. La conclusión práctica es la misma —corregir la perfusión acompaña al tratamiento en vez de sustituirse por dosis repetidas—, pero el motivo es la demora en la distribución, no una absorción que nunca tuvo que ocurrir.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dónde sí falla la absorción', texto: 'El problema de absorción es real, pero en otras vías: la intramuscular y la subcutánea sí dependen de que el tejido esté perfundido, y en shock pueden no absorberse. Confundir ese fenómeno con la vía intravenosa lleva a repetir dosis intravenosas por una causa equivocada.' },
        ],
      },
      {
        titulo: 'Farmacodinamia y margen terapéutico',
        bloques: [
          { tipo: 'p', texto: 'Los medicamentos actúan uniéndose a estructuras del organismo —habitualmente receptores— y modificando su función. Un agonista la activa; un antagonista impide que otra sustancia la active. Esa distinción explica por qué existen antídotos que no «neutralizan» un tóxico sino que le disputan el sitio donde actúa.' },
          { tipo: 'p', texto: 'La intensidad del efecto no depende de la dosis administrada sino de la concentración que el fármaco alcanza donde actúa. Se llama ventana o margen terapéutico al intervalo de concentraciones comprendido entre la mínima que produce el efecto buscado y aquella a partir de la cual la toxicidad se vuelve probable. Es un intervalo descrito para poblaciones, no un umbral exacto para un paciente concreto: dentro de la ventana el efecto adverso es menos probable, no imposible, y por debajo de ella el efecto puede faltar.' },
          { tipo: 'p', texto: 'Cuando ese intervalo es ancho, un error moderado de cálculo suele quedar dentro y tolerarse; cuando es estrecho, el mismo error puede situar la concentración en zona tóxica. Los fármacos de ventana estrecha son los que exigen verificación por un segundo prestador y vigilancia continua. Conviene no confundir la ventana terapéutica con el índice terapéutico: aquélla es un intervalo de concentraciones, éste una razón entre la exposición tóxica y la eficaz que sirve para comparar fármacos entre sí.' },
          { tipo: 'callout', variante: 'clave', titulo: 'Por qué la misma dosis no da la misma concentración', texto: 'Entre la dosis que se administra y la concentración que se alcanza median el peso, la edad, la función hepática y renal, el estado de la perfusión y los otros fármacos que el paciente lleva encima. Por eso la ventana terapéutica se comprueba observando la respuesta del paciente y no dando por hecho que una dosis dentro del intervalo garantiza un efecto dentro del intervalo.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Efecto adverso no es error', texto: 'Un efecto adverso puede aparecer con la dosis correcta, la vía correcta y el paciente correcto. Reconocerlo, suspender si procede, comunicarlo y registrarlo es parte del trabajo. Ocultarlo por temor a que se interprete como un error impide que el hospital lo tenga en cuenta.' },
          {
            tipo: 'lista',
            titulo: 'Conceptos que se confunden con frecuencia',
            items: [
              'Efecto adverso: respuesta nociva no buscada, aun con uso correcto.',
              'Reacción alérgica: respuesta inmunitaria en un paciente previamente sensibilizado. A diferencia de la toxicidad, no requiere alcanzar una concentración alta: puede desencadenarse con cantidades muy pequeñas, de modo que una dosis reducida no permite descartarla. Eso no significa que la cantidad sea irrelevante en todos los casos —en algunas reacciones influye—, sino que no existe una dosis segura por ser pequeña.',
              'Efecto secundario: consecuencia previsible del mecanismo, no necesariamente nociva.',
              'Interacción: modificación del efecto de un medicamento por otro, por un alimento o por una enfermedad.',
              'Tolerancia: necesidad de más cantidad para el mismo efecto tras uso repetido.',
            ],
          },
        ],
      },
      {
        titulo: 'Vías de administración',
        bloques: [
          { tipo: 'p', texto: 'La vía determina la velocidad de inicio, la previsibilidad del efecto y la posibilidad de detenerlo. No es un detalle logístico: cambiar la vía sin cambiar la indicación puede convertir un tratamiento correcto en uno inútil o peligroso.' },
          {
            tipo: 'tabla',
            titulo: 'Comparación general',
            headers: ['Vía', 'Inicio', 'Previsibilidad', 'Reversibilidad'],
            filas: [
              ['Intravenosa', 'El más rápido', 'La mayor: omite la absorción', 'Puede interrumpirse la administración'],
              ['Intraósea', 'Comparable a la intravenosa', 'Alta', 'Puede interrumpirse'],
              ['Intramuscular', 'Intermedio', 'Depende de la perfusión del músculo', 'No, una vez administrada'],
              ['Subcutánea', 'Lento', 'Muy dependiente de la perfusión', 'No'],
              ['Inhalada', 'Rápido para efecto local en vía aérea', 'Depende de la técnica y del flujo', 'Parcial'],
              ['Sublingual y bucal', 'Rápido', 'Depende de la mucosa y de la saliva', 'Parcial'],
              ['Intranasal', 'Rápido', 'Depende de la mucosa y del dispositivo', 'No'],
              ['Oral', 'Lento', 'La menor: absorción variable', 'No'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'En hipoperfusión, las vías dependientes de absorción fallan', texto: 'La vía intramuscular y la subcutánea dependen de que el músculo o el tejido subcutáneo estén perfundidos. En un paciente en shock esa perfusión está reducida, de modo que el fármaco puede no absorberse y, al restaurarse la circulación, absorberse de golpe. Es una razón por la que las vías se eligen según el estado del paciente y no por comodidad.' },
        ],
      },
      {
        titulo: 'Verificación antes de administrar',
        bloques: [
          { tipo: 'p', texto: 'Los errores de medicación en el medio prehospitalario ocurren con ruido, prisa, mala iluminación y una sola persona preparando. Por eso la verificación no se sustituye por experiencia: se ejecuta siempre igual, y en voz alta cuando hay un segundo prestador.' },
          {
            tipo: 'pasos',
            titulo: 'Comprobación sistemática',
            items: [
              'Paciente correcto: identidad, edad y peso cuando la dosificación depende de él.',
              'Medicamento correcto: leer la etiqueta del envase, no reconocer la ampolleta por su forma o su color.',
              'Indicación correcta: por qué se administra a este paciente y ahora.',
              'Dosis correcta: calculada, verificada y, si el protocolo lo exige, confirmada por un segundo prestador.',
              'Concentración correcta: comprobar la presentación real, porque un mismo medicamento se comercializa en varias.',
              'Vía correcta: la autorizada para esa indicación y ese producto.',
              'Momento y velocidad correctos.',
              'Caducidad e integridad del envase; aspecto de la solución.',
              'Alergias del paciente, comprobadas antes y no después.',
              'Registro inmediato: qué, cuánto, por qué vía, a qué hora y con qué respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La ampolleta no se identifica por su forma', texto: 'Dos medicamentos distintos pueden venir en envases casi idénticos, y un mismo medicamento en concentraciones distintas puede tener la misma presentación. La etiqueta se lee antes de cargar y se vuelve a leer antes de administrar. Es el control que más errores graves evita.' },
          { tipo: 'p', texto: 'Qué medicamentos lleva cada unidad, quién está autorizado a administrarlos y con qué respaldo de dirección médica lo define el protocolo del servicio y la dotación que corresponda al tipo de ambulancia. Esta lección enseña el marco; no autoriza a administrar nada.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Farmacocinética', definicion: 'Estudio de lo que el organismo le hace al medicamento: liberación, absorción, distribución, metabolismo y excreción.' },
      { termino: 'Farmacodinamia', definicion: 'Estudio de lo que el medicamento le hace al organismo: sobre qué actúa y con qué consecuencia.' },
      { termino: 'Ventana o margen terapéutico', definicion: 'Intervalo de concentraciones entre la mínima eficaz y aquella a partir de la cual la toxicidad se vuelve probable. Se describe para poblaciones: dentro de él el efecto adverso es menos probable, no imposible. Cuanto más estrecho, menos error tolera.' },
      { termino: 'Índice terapéutico', definicion: 'Razón entre la exposición asociada a toxicidad y la asociada a eficacia; sirve para comparar fármacos entre sí y no debe confundirse con la ventana terapéutica, que es un intervalo de concentraciones.' },
      { termino: 'Agonista y antagonista', definicion: 'El agonista activa el receptor; el antagonista impide que otra sustancia lo active.' },
      { termino: 'Efecto adverso', definicion: 'Respuesta nociva no buscada que puede aparecer aun con uso correcto; se comunica y se registra.' },
      { termino: 'Reacción alérgica', definicion: 'Respuesta inmunitaria en un paciente sensibilizado que puede desencadenarse con cantidades muy pequeñas; por eso una dosis reducida no permite descartarla.' },
    ],
    flashcards: [
      { frente: 'Farmacocinética frente a farmacodinamia', reverso: 'La cinética es lo que el cuerpo le hace al fármaco; la dinamia, lo que el fármaco le hace al cuerpo.' },
      { frente: '¿Por qué la vía intravenosa es la más previsible?', reverso: 'Porque omite la absorción: el fármaco se deposita directamente en la circulación.' },
      { frente: 'En shock, ¿qué le pasa a un fármaco administrado por vía intravenosa?', reverso: 'Entra igualmente en la circulación —la vía omite la absorción—, pero el bajo gasto cardiaco puede retrasar su distribución al sitio de acción y, con ello, el inicio del efecto.' },
      { frente: '¿Qué ocurre con la vía intramuscular en un paciente en shock?', reverso: 'La perfusión del músculo está reducida, el fármaco puede no absorberse y absorberse de golpe al restaurarse la circulación.' },
      { frente: '¿Qué es una ventana terapéutica estrecha?', reverso: 'Un intervalo pequeño entre la concentración mínima eficaz y la que se asocia a toxicidad; exige verificación por un segundo prestador y vigilancia continua.' },
      { frente: '¿Permite una dosis pequeña descartar una reacción alérgica?', reverso: 'No: es una respuesta inmunitaria en un paciente sensibilizado y puede desencadenarse con cantidades muy pequeñas.' },
      { frente: '¿Cómo se identifica un medicamento antes de cargarlo?', reverso: 'Leyendo la etiqueta, nunca reconociendo la ampolleta por su forma o su color.' },
    ],
    quiz: [
      {
        pregunta: 'Administras un medicamento por vía intramuscular a un paciente en shock y no aparece el efecto esperado. ¿Cuál es la explicación más probable?',
        opciones: [
          'El medicamento estaba caducado.',
          'La perfusión del músculo está reducida y la absorción no se produce con normalidad.',
          'La dosis fue insuficiente y debe repetirse de inmediato.',
          'El margen terapéutico es estrecho.',
        ],
        correcta: 1,
        explicacion: 'Las vías dependientes de absorción fallan en hipoperfusión; repetir dosis puede provocar una absorción brusca al restaurarse la circulación.',
      },
      {
        pregunta: 'Un paciente presenta una reacción tras una dosis mínima de un medicamento. ¿Permite ese dato descartar que se trate de una reacción alérgica?',
        opciones: [
          'Sí: con una dosis pequeña la alergia queda excluida.',
          'No: es una respuesta inmunitaria en un paciente sensibilizado y puede desencadenarse con cantidades muy pequeñas.',
          'Sí, salvo que el fármaco tenga ventana terapéutica estrecha.',
          'Sí, porque por debajo de la concentración mínima eficaz no hay efecto de ningún tipo.',
        ],
        correcta: 1,
        explicacion: 'A diferencia de la toxicidad, la reacción alérgica no exige alcanzar una concentración alta: una dosis reducida no la descarta.',
      },
      {
        pregunta: 'Administras un fármaco por vía intravenosa periférica a un paciente en shock y el efecto tarda más de lo habitual. ¿Cuál es la explicación farmacocinética correcta?',
        opciones: [
          'El fármaco se quedó en el trayecto y no llegó a la circulación.',
          'La vía intravenosa omite la absorción, pero el bajo gasto cardiaco puede retrasar la distribución hacia el sitio de acción.',
          'La vía intravenosa depende de la perfusión del tejido donde se punciona.',
          'La ventana terapéutica se estrecha durante el shock.',
        ],
        correcta: 1,
        explicacion: 'La absorción no interviene en la vía intravenosa: el fármaco entra directo a la sangre. Lo que la hipoperfusión afecta es la fase siguiente, la distribución, y con ella el inicio del efecto.',
      },
      {
        pregunta: '¿Por qué se comprueba la CONCENTRACIÓN además del nombre del medicamento?',
        opciones: [
          'Porque la concentración determina la caducidad.',
          'Porque un mismo medicamento se comercializa en varias presentaciones y la cantidad administrada depende de cuál se tenga.',
          'Porque la concentración indica la vía autorizada.',
          'Porque es un requisito de registro únicamente.',
        ],
        correcta: 1,
        explicacion: 'La misma orden verbal aplicada a dos presentaciones distintas produce cantidades administradas distintas; por eso la presentación real se comprueba en la etiqueta.',
      },
      {
        pregunta: 'Aparece un efecto adverso pese a haber administrado correctamente. ¿Qué haces?',
        opciones: [
          'No registrarlo, porque no hubo error.',
          'Reconocerlo, suspender si procede, comunicarlo y registrarlo.',
          'Repetir la dosis para comprobar la relación.',
          'Administrar el antagonista disponible.',
        ],
        correcta: 1,
        explicacion: 'Un efecto adverso puede aparecer con uso correcto; ocultarlo impide que el hospital lo tenga en cuenta y no protege a nadie.',
      },
      {
        pregunta: '¿Qué determina que puedas administrar un medicamento en tu servicio?',
        opciones: [
          'Haber estudiado esta unidad.',
          'Tu certificación, el tipo de unidad y la dirección médica que respalde la indicación.',
          'Que el medicamento esté disponible en la ambulancia.',
          'Que el paciente lo solicite.',
        ],
        correcta: 1,
        explicacion: 'Administrar es un acto autorizado, no una habilidad: el conocimiento es necesario pero no suficiente.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena el recorrido farmacocinético de un medicamento',
        pasos: ['Liberación', 'Absorción', 'Distribución', 'Metabolismo', 'Excreción'],
      },
    },
    revision: ficha([
      'CORRECCIÓN 2026-08-16: se retiró la afirmación de que un fármaco intravenoso periférico «se '
        + 'queda en el trayecto» durante el shock. La lección ahora distingue absorción —que la vía '
        + 'intravenosa omite— de distribución, que la hipoperfusión sí puede retrasar, y localiza el '
        + 'fallo de absorción donde corresponde: vías intramuscular y subcutánea.',
      'CORRECCIÓN 2026-08-16: la ventana o margen terapéutico se define como intervalo de '
        + 'CONCENTRACIONES de carácter poblacional, no como distancia entre dos dosis, y se distingue '
        + 'del índice terapéutico. Se declara expresamente que dentro de la ventana el efecto adverso '
        + 'es menos probable, no imposible.',
      'CORRECCIÓN 2026-08-16: se eliminó el absoluto «la alergia no depende de la cantidad». Se enseña '
        + 'lo comprobable y clínicamente útil: una dosis pequeña no permite descartar una reacción '
        + 'alérgica.',
    ]),
  },

  // ============================================================
  //  Fármacos usados en el SMU según la NOM-034
  // ============================================================
  'm4-far-nom-034': {
    icono: '📋',
    duracion: '16 min',
    resumen: 'Qué regula realmente la NOM-034 en materia de medicamentos, qué NO regula, y por qué una '
      + 'lista de dotación obligatoria no es un protocolo de tratamiento.',
    objetivos: [
      'Distinguir una norma de dotación de un protocolo terapéutico.',
      'Identificar los cuatro tipos de ambulancia terrestre que define la norma.',
      'Localizar la dotación mínima de medicamentos y soluciones que corresponde a cada tipo de unidad.',
      'Explicar por qué esa lista no autoriza por sí sola ninguna administración.',
    ],
    secciones: [
      {
        titulo: 'Qué es la NOM-034',
        bloques: [
          { tipo: 'p', texto: 'La NOM-034-SSA3-2013 regula la atención médica prehospitalaria de las urgencias médicas en México. Establece criterios mínimos de organización y funcionamiento del servicio: qué tipos de ambulancia existen, con qué personal deben operar y con qué equipamiento e insumos deben contar, entre ellos determinados medicamentos según el tipo de unidad.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que la norma NO es', texto: 'La NOM-034 no es un vademécum. No indica para qué se usa cada medicamento, ni a qué dosis, ni en qué población, ni con qué vía o velocidad. Una lista de dotación responde a «¿qué debe haber a bordo?»; un protocolo terapéutico responde a «¿qué se administra, a quién y cuánto?». Confundirlas es el error central que esta lección viene a corregir.' },
          {
            tipo: 'tabla',
            titulo: 'Dos documentos, dos preguntas',
            headers: ['', 'NOM-034 (norma de dotación)', 'Protocolo del servicio'],
            filas: [
              ['Responde', '¿Qué debe existir a bordo y con qué personal?', '¿Qué se administra, a quién, cuánto y cuándo?'],
              ['Lo emite', 'La autoridad sanitaria federal', 'La dirección médica del servicio'],
              ['Alcance', 'Nacional y obligatorio', 'El del propio servicio'],
              ['Contiene dosis', 'No', 'Sí, con su indicación y su población'],
            ],
          },
        ],
      },
      {
        titulo: 'El tipo de unidad condiciona todo lo demás',
        bloques: [
          { tipo: 'p', texto: 'La norma diferencia tipos de ambulancia según el nivel de atención que prestan, y a cada tipo le corresponde un personal y un equipamiento distintos. Los define en sus numerales 4.1.2 a 4.1.5.' },
          {
            tipo: 'tabla',
            titulo: 'Tipos de ambulancia terrestre según los numerales 4.1.2 a 4.1.5',
            headers: ['Numeral', 'Tipo', 'A qué está destinada según la norma'],
            filas: [
              ['4.1.2', 'De traslado', 'Traslado de pacientes ambulatorios que no requieren atención médica de urgencia ni cuidados críticos'],
              ['4.1.4', 'De urgencias básicas', 'Pacientes que requieren atención médica prehospitalaria mediante soporte básico de vida'],
              ['4.1.3', 'De urgencias avanzadas', 'Pacientes que requieren atención médica prehospitalaria mediante soporte avanzado de vida'],
              ['4.1.5', 'De cuidados intensivos', 'Atención interhospitalaria de pacientes que por su gravedad requieren soporte avanzado de vida y cuidados críticos'],
            ],
          },
          { tipo: 'p', texto: 'De esa clasificación se derivan dos consecuencias que el alumno debe tener claras antes de estudiar cualquier medicamento.' },
          {
            tipo: 'lista',
            titulo: 'Las dos consecuencias',
            items: [
              'Que un medicamento exista en el listado de un tipo de unidad no significa que exista en la tuya: depende del tipo de ambulancia en que operes.',
              'Que un medicamento esté a bordo no significa que tú puedas administrarlo: eso depende de tu certificación y de la dirección médica, no de la disponibilidad del insumo.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Tres condiciones que deben cumplirse a la vez', texto: 'Para que una administración sea legítima tienen que coincidir tres cosas: que el medicamento esté disponible en la unidad, que el prestador esté autorizado para administrarlo y que exista una indicación respaldada por el protocolo y la dirección médica. Si falta una de las tres, no procede.' },
        ],
      },
      {
        titulo: 'La dotación mínima de medicamentos por tipo de ambulancia',
        bloques: [
          { tipo: 'p', texto: 'Los apéndices normativos de la NOM-034 fijan la dotación mínima de cada tipo de unidad terrestre. Se leen de forma ACUMULATIVA: el apéndice B exige cumplir además todo el A, el C exige cumplir A y B, y el D exige cumplir A, B y C. Las ambulancias aéreas (apéndice E) y marítimas (apéndice F) deben cumplir los apéndices A a D según el grado de complejidad y la capacidad resolutiva que les corresponda, más sus requisitos propios.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Cómo leer las listas que siguen', texto: 'La norma enuncia principio activo y forma farmacéutica, y nada más. No dice para qué sirve, ni a quién se administra, ni cuánto, ni por qué vía, ni a qué velocidad. Las listas de abajo se reproducen exactamente con ese alcance: son la respuesta a «¿qué debe existir a bordo?». Ninguna de ellas autoriza una administración ni sustituye al formulario del servicio.' },
          {
            tipo: 'tabla',
            titulo: 'Apéndice A (numeral A.4) — Ambulancia de traslado: soluciones',
            headers: ['Numeral', 'Concepto'],
            filas: [
              ['A.4.1', 'Cloruro de sodio, solución al 0.9 %'],
              ['A.4.2', 'Electrolitos orales'],
              ['A.4.3', 'Glucosa, solución al 5 %'],
              ['A.4.4', 'Solución Hartman'],
            ],
          },
          { tipo: 'p', texto: 'Conviene notar lo que el apéndice A no contiene: la ambulancia de traslado no tiene un apartado de medicamentos, solo de soluciones. Es coherente con el numeral 4.1.2, que la destina a pacientes ambulatorios que no requieren atención de urgencia.' },
          {
            tipo: 'tabla',
            titulo: 'Apéndice B (numeral B.4) — Urgencias básicas: medicamentos y soluciones que se añaden',
            headers: ['Numeral', 'Agrupación de la norma', 'Concepto'],
            filas: [
              ['B.4.1.1', 'Cardiología', 'Ácido acetilsalicílico, tabletas'],
              ['B.4.1.2', 'Cardiología', 'Isosorbida, tabletas'],
              ['B.4.1.3', 'Cardiología', 'Trinitrato de glicerilo, perlas sublinguales'],
              ['B.4.2.1', 'Enfermedades inmunoalérgicas', 'Adrenalina, solución inyectable'],
              ['B.4.2.2', 'Enfermedades inmunoalérgicas', 'Atropina, solución inyectable'],
              ['B.4.2.3', 'Enfermedades inmunoalérgicas', 'Epinefrina, solución inyectable o sustituto tecnológico'],
              ['B.4.3.1', 'Endocrinología', 'Dextrosa al 50 %'],
              ['B.4.4.1', 'Neumología', 'Salbutamol, aerosol'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Dos observaciones sobre el texto del apéndice B', texto: 'Primera: los numerales B.4.2.1 y B.4.2.3 enuncian «adrenalina» y «epinefrina» como conceptos separados, aunque son dos denominaciones del mismo principio activo. Es una particularidad del texto publicado que conviene conocer para no interpretarla como dos fármacos distintos; qué se surte realmente lo resuelve el formulario del servicio. Segunda: la agrupación por especialidad que usa la norma es un encabezado administrativo del listado, no una indicación clínica. Que la atropina figure bajo «enfermedades inmunoalérgicas» no significa que ése sea su uso.' },
          {
            tipo: 'tabla',
            titulo: 'Apéndice C (numeral C.3) — Urgencias avanzadas: medicamentos que se añaden',
            headers: ['Numeral', 'Agrupación de la norma', 'Concepto'],
            filas: [
              ['C.3.1.1', 'Analgesia', 'Ketorolaco, solución inyectable'],
              ['C.3.1.2', 'Analgesia', 'Metamizol, solución inyectable'],
              ['C.3.1.3', 'Analgesia', 'Clorhidrato de nalbufina, solución inyectable'],
              ['C.3.2.1', 'Anestesia', 'Midazolam, solución inyectable'],
              ['C.3.3.1', 'Cardiología', 'Captopril o enalapril, tabletas'],
              ['C.3.4.1', 'Enfermedades inmunoalérgicas', 'Hidrocortisona, solución inyectable o genérico alterno'],
              ['C.3.5.1', 'Gastroenterología', 'Butilhioscina, solución inyectable'],
              ['C.3.5.2', 'Gastroenterología', 'Difenidol, solución inyectable'],
              ['C.3.5.3', 'Gastroenterología', 'Ranitidina, solución inyectable'],
              ['C.3.6.1', 'Gineco-obstetricia', 'Hidralazina, solución inyectable'],
              ['C.3.7.1', 'Neurología', 'Diazepam, solución inyectable'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Apéndice D (numeral D.1) — Cuidados intensivos: medicamento que se añade',
            headers: ['Numeral', 'Agrupación de la norma', 'Concepto'],
            filas: [
              ['D.1.1.1', 'Neurología', 'Haloperidol, solución inyectable'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Un mínimo no es un catálogo de lo que se puede usar', texto: 'La norma fija un piso, no un techo ni una autorización. Que un fármaco no aparezca no significa que esté prohibido para un servicio con dirección médica que lo respalde; que aparezca no significa que el prestador de esa unidad pueda administrarlo. La lista dice qué debe haber, y solo eso.' },
        ],
      },
      {
        titulo: 'Cómo se verifica y qué hacer con lo que no coincide',
        bloques: [
          { tipo: 'p', texto: 'Una lista transcrita de memoria o copiada de una fuente secundaria envejece con la primera modificación de la norma y se sigue enseñando como si estuviera vigente. Por eso la dotación se comprueba siempre contra el texto publicado.' },
          {
            tipo: 'pasos',
            titulo: 'Cómo consultarlo correctamente',
            items: [
              'Abrir el texto de la NOM-034 publicado en el Diario Oficial de la Federación, no un resumen ni una infografía.',
              'Comprobar si hay modificaciones publicadas con posterioridad al texto original del 23 de septiembre de 2014.',
              'Localizar el apéndice que corresponde al tipo de unidad en que se opera, recordando que son acumulativos.',
              'Contrastar ese listado con la dotación real de la ambulancia.',
              'Contrastar la dotación con el formulario y el protocolo del servicio, que son los que dicen qué hacer con cada medicamento.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Estado del texto al 16 de agosto de 2026', texto: 'El texto que se consulta sigue siendo el publicado en el DOF el 23 de septiembre de 2014. Existe un proyecto de modificación inscrito en el programa nacional de normalización, pero un proyecto no es una reforma: mientras no aparezca publicado en el DOF, no cambia nada de lo anterior. Esta comprobación se repite antes de dar por vigente cualquier dato normativo.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Discrepancia entre norma y realidad', texto: 'Si el listado normativo y la dotación real no coinciden, eso es un hallazgo que se reporta al responsable del servicio. No es una autorización para improvisar ni para sustituir un medicamento por otro «equivalente»: la equivalencia farmacológica es una decisión médica.' },
        ],
      },
      {
        titulo: 'Lo que este tema no puede completar todavía',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Información que debe aportar la academia', texto: 'La dotación normativa ya está en esta lección porque procede de un texto público y verificable. Lo que sigue faltando es distinto y solo lo posee la academia: en qué tipos de unidad operan sus alumnos, cuál es la dotación real de esas unidades —que puede diferir del mínimo—, qué presentaciones y concentraciones surte y cuál es el formulario aprobado por su dirección médica con las indicaciones autorizadas. Ese es el paso que convierte una lista de nombres en una práctica segura, y no puede darse aquí.' },
          { tipo: 'p', texto: 'También queda pendiente identificar el «Vademécum farmacología» que el plan de estudios cita en su bibliografía. No consta su título completo, su autor ni su edición, de modo que no se cita en esta unidad. La alternativa que sí es verificable es la información para prescribir de cada producto registrado ante COFEPRIS, que es de donde procede la composición, la concentración y la indicación aprobada.' },
        ],
      },
      F([NOM_034_APENDICES, COFEPRIS_IPP, AMLS_4]),
    ],
    conceptosClave: [
      { termino: 'NOM-034-SSA3-2013', definicion: 'Norma mexicana que regula la atención médica prehospitalaria: tipos de ambulancia, personal, equipamiento e insumos exigidos. Texto publicado en el DOF el 23 de septiembre de 2014.' },
      { termino: 'Norma de dotación', definicion: 'Documento que establece qué debe existir a bordo; no indica para qué, a quién ni cuánto administrar.' },
      { termino: 'Apéndices normativos acumulativos', definicion: 'Estructura de los apéndices A a D de la NOM-034: cada uno exige cumplir además los anteriores, de modo que la dotación de urgencias avanzadas incluye la de traslado y la de urgencias básicas.' },
      { termino: 'Protocolo terapéutico', definicion: 'Documento de la dirección médica del servicio que establece indicaciones, dosis, vías y vigilancia.' },
      { termino: 'Información para Prescribir', definicion: 'Documento regulatorio del producto registrado ante COFEPRIS que contiene composición, concentración, indicaciones, vías y advertencias.' },
      { termino: 'Equivalencia farmacológica', definicion: 'Sustitución de un medicamento por otro; es una decisión médica y no una alternativa disponible para el prestador.' },
    ],
    flashcards: [
      { frente: '¿Qué establece la NOM-034 en materia de medicamentos?', reverso: 'La dotación mínima de medicamentos y soluciones que debe llevar cada tipo de ambulancia, en sus apéndices normativos A (A.4), B (B.4), C (C.3) y D (D.1). Es una norma de dotación.' },
      { frente: '¿Contiene la NOM-034 indicaciones y dosis?', reverso: 'No. Enuncia principio activo y forma farmacéutica; la indicación y la dosis corresponden al protocolo del servicio y a la información para prescribir del producto.' },
      { frente: '¿Qué lleva la ambulancia de traslado según el apéndice A?', reverso: 'Solo soluciones —cloruro de sodio al 0.9 %, electrolitos orales, glucosa al 5 % y solución Hartman—; no tiene apartado de medicamentos.' },
      { frente: '¿Cómo se leen los apéndices A a D?', reverso: 'De forma acumulativa: el B exige además todo el A, el C exige A y B, y el D exige A, B y C.' },
      { frente: '¿Qué tres condiciones deben coincidir para administrar?', reverso: 'Disponibilidad en la unidad, autorización del prestador e indicación respaldada por el protocolo y la dirección médica.' },
      { frente: '¿Está vigente alguna modificación de la NOM-034 al corte de agosto de 2026?', reverso: 'No: el texto que se consulta es el del 23 de septiembre de 2014. Hay un proyecto de modificación inscrito en el programa de normalización, pero un proyecto no es una reforma publicada.' },
      { frente: 'La dotación real no coincide con el listado normativo. ¿Qué haces?', reverso: 'Reportarlo al responsable del servicio; no autoriza a improvisar ni a sustituir un medicamento por otro.' },
      { frente: '¿Por qué no se cita el «Vademécum farmacología» del plan?', reverso: 'Porque no constan su título completo, su autor ni su edición; la alternativa verificable es la IPP de COFEPRIS.' },
    ],
    quiz: [
      {
        pregunta: 'Un medicamento aparece en el apéndice de la NOM-034 para cierto tipo de unidad. ¿Qué se sigue de eso?',
        opciones: [
          'Que puedes administrarlo si sabes la dosis.',
          'Que debe existir a bordo en ese tipo de unidad; nada sobre indicación, dosis ni autorización.',
          'Que la norma aprueba su uso en cualquier paciente.',
          'Que sustituye al protocolo del servicio.',
        ],
        correcta: 1,
        explicacion: 'La NOM-034 es una norma de dotación: responde qué debe haber a bordo, no qué administrar ni cuánto.',
      },
      {
        pregunta: 'El medicamento está en la ambulancia y conoces su dosis habitual, pero tu certificación no lo contempla. ¿Procede administrarlo?',
        opciones: [
          'Sí: está disponible y sabes usarlo.',
          'No: faltan la autorización del prestador y el respaldo de la dirección médica.',
          'Sí, si el paciente da su consentimiento.',
          'Sí, si lo indica la NOM-034.',
        ],
        correcta: 1,
        explicacion: 'Las tres condiciones deben coincidir: disponibilidad, autorización e indicación respaldada. La disponibilidad sola no basta.',
      },
      {
        pregunta: 'Falta en tu unidad un medicamento que el listado normativo exige. ¿Qué haces?',
        opciones: [
          'Sustituirlo por otro de efecto parecido.',
          'Reportarlo al responsable del servicio.',
          'Adquirirlo por cuenta propia.',
          'Omitir el dato del registro para no generar conflicto.',
        ],
        correcta: 1,
        explicacion: 'La discrepancia es un hallazgo que se reporta; la equivalencia farmacológica es una decisión médica y no una alternativa del prestador.',
      },
      {
        pregunta: '¿Dónde está la concentración y la indicación aprobada del medicamento que llevas a bordo?',
        opciones: [
          'En la NOM-034.',
          'En la Información para Prescribir del producto registrado ante COFEPRIS.',
          'En el vademécum citado por el plan de estudios.',
          'En la etiqueta del vehículo.',
        ],
        correcta: 1,
        explicacion: 'La IPP es el documento regulatorio del producto; la NOM-034 regula dotación y el vademécum del plan no está identificado.',
      },
      {
        pregunta: 'Operas en una ambulancia de urgencias avanzadas. ¿Qué dotación mínima de medicamentos y soluciones le exige la NOM-034?',
        opciones: [
          'Únicamente la del apéndice C, que es el que le corresponde.',
          'La de los apéndices A, B y C, porque los apéndices son acumulativos.',
          'La de los apéndices C y D, por su nivel de atención.',
          'La que decida la dirección médica del servicio, sin mínimo normativo.',
        ],
        correcta: 1,
        explicacion: 'El apéndice C exige expresamente cumplir además los apéndices A y B. Una unidad de urgencias avanzadas debe llevar también las soluciones del A y los medicamentos del B.',
      },
      {
        pregunta: 'Un compañero afirma que la atropina está en la NOM-034 «para las reacciones alérgicas», porque el apéndice B la agrupa bajo «enfermedades inmunoalérgicas». ¿Qué falla en ese razonamiento?',
        opciones: [
          'Nada: la agrupación de la norma es su indicación.',
          'Que esos encabezados ordenan administrativamente el listado de dotación y no enuncian indicaciones clínicas.',
          'Que la atropina no aparece en la NOM-034.',
          'Que la indicación correcta está en el apéndice C y no en el B.',
        ],
        correcta: 1,
        explicacion: 'La norma responde qué debe existir a bordo. La indicación de cada fármaco procede de la guía clínica vigente, de la información para prescribir y del protocolo del servicio, no del encabezado de una lista de dotación.',
      },
      {
        pregunta: 'En 2026 alguien te dice que «ya cambió la NOM-034» porque hay una modificación en el programa nacional de normalización. ¿Cómo procedes?',
        opciones: [
          'Aplicar la modificación, porque el programa de normalización la respalda.',
          'Seguir con el texto publicado en el DOF y comprobar ahí si la modificación llegó a publicarse.',
          'Suspender el uso de la dotación hasta que se aclare.',
          'Aplicar el criterio de la unidad vecina.',
        ],
        correcta: 1,
        explicacion: 'Un proyecto inscrito en el programa de normalización no es una reforma vigente. Lo que rige es el texto publicado en el DOF, y esa comprobación se hace en la fuente.',
      },
    ],
    actividades: null,
    revision: ficha([
      'CORRIGE el hallazgo de la auditoría: el tema mezclaba legislación general, CRUM, residuos '
        + 'peligrosos y formato de registro con farmacología. Se redactó desde cero limitado a lo que '
        + 'la norma dice sobre medicamentos y dotación.',
      'CORRECCIÓN 2026-08-16: el tema no cumplía su título curricular porque omitía la dotación. Se '
        + 'verificó el texto vigente en el DOF (publicación del 23 de septiembre de 2014, consultada el '
        + '16 de agosto de 2026) y se reprodujo la dotación mínima de medicamentos y soluciones por '
        + 'tipo de ambulancia con su numeral: A.4 para traslado, B.4 para urgencias básicas, C.3 para '
        + 'urgencias avanzadas y D.1 para cuidados intensivos. Se conserva la ausencia total de '
        + 'indicaciones, dosis, concentraciones y vías: la norma no las contiene.',
      'La lista se presenta sin condicionarla a que se conozca el tipo de unidad de la academia: es '
        + 'información pública y verificable. Lo que sigue dependiendo de la academia es la dotación '
        + 'REAL, las presentaciones y el formulario.',
      'OBSERVACIÓN SOBRE EL TEXTO NORMATIVO, para revisión docente: los numerales B.4.2.1 y B.4.2.3 '
        + 'enuncian «adrenalina» y «epinefrina» como conceptos separados siendo el mismo principio '
        + 'activo. Se declara como particularidad del texto publicado, sin corregirlo ni interpretarlo '
        + 'como dos fármacos.',
      'OBSERVACIÓN: las agrupaciones por especialidad de los apéndices (por ejemplo, la atropina bajo '
        + '«enfermedades inmunoalérgicas») son encabezados administrativos del listado. La lección lo '
        + 'declara expresamente para evitar que se lean como indicaciones clínicas.',
      'ESTADO NORMATIVO VERIFICADO: al 16 de agosto de 2026 no se localizó en el DOF una modificación '
        + 'publicada de la NOM-034-SSA3-2013. El proyecto inscrito en el programa nacional de '
        + 'normalización se presenta como proyecto, nunca como reforma vigente.',
      'DECISIÓN PENDIENTE: la academia debe declarar en qué tipos de unidad operan sus alumnos, la '
        + 'dotación real de esas unidades, sus presentaciones y concentraciones, y su formulario '
        + 'aprobado con las indicaciones autorizadas.',
    ]),
  },

  // ============================================================
  //  Medicamentos y sus dosis en la urgencia
  // ============================================================
  'm4-far-dosis-urgencia': {
    icono: '🧮',
    duracion: '18 min',
    resumen: 'Cómo se verifica una dosis antes de administrarla y por qué este tema no puede publicar una '
      + 'tabla de dosis mientras la academia no entregue su formulario.',
    objetivos: [
      'Enumerar los datos sin los cuales una dosis no puede administrarse.',
      'Verificar una orden de dosificación con una comprobación estructurada.',
      'Reconocer las situaciones que modifican una dosis por población.',
      'Identificar por qué una tabla memorizada de otro servicio es insegura.',
    ],
    secciones: [
      {
        titulo: 'Bloqueo parcial declarado',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Este tema está incompleto a propósito', texto: 'El plan de estudios pide enseñar «medicamentos y sus dosis en la urgencia». Aquí se enseña TODO lo que puede sostenerse sin el formulario de la academia: qué datos hace falta reunir, cómo se verifica una orden y qué modifica una dosis. La TABLA de medicamentos con sus dosis queda BLOQUEADA hasta que la academia entregue su formulario, sus concentraciones y su dirección médica. Publicar cifras tomadas de otro servicio enseñaría a administrar cantidades que no coinciden con las ampolletas de tu ambulancia.' },
        ],
      },
      {
        titulo: 'Los seis datos de una dosis',
        bloques: [
          { tipo: 'p', texto: 'Una cifra aislada —«un miligramo», «diez mililitros»— no es una dosis: es un número. Para convertirse en una dosis administrable necesita seis datos, y si falta uno la administración no puede considerarse verificada.' },
          {
            tipo: 'tabla',
            titulo: 'Qué debe constar y de dónde sale',
            headers: ['Dato', 'Pregunta que responde', 'De dónde procede'],
            filas: [
              ['Indicación', '¿Para qué se administra en este paciente?', 'Guía clínica vigente y protocolo del servicio'],
              ['Población', '¿A quién? Edad, peso, embarazo, insuficiencia orgánica', 'Valoración del paciente y protocolo'],
              ['Vía', '¿Por dónde? Y si esa vía está aprobada para esa indicación', 'IPP del producto y protocolo'],
              ['Concentración', '¿Cuánto principio activo por unidad de volumen?', 'Etiqueta e IPP del producto que se tiene en la mano'],
              ['Cantidad y ritmo', '¿Cuánto y en cuánto tiempo?', 'Protocolo del servicio'],
              ['Respaldo', '¿Quién autoriza esta indicación?', 'Dirección médica y alcance del prestador'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La concentración es el dato que más errores produce', texto: 'La orden se expresa en cantidad de principio activo; lo que se administra se mide en volumen. La conversión entre ambas depende de la concentración de la presentación concreta que se tenga en la mano. Un mismo medicamento en dos presentaciones distintas exige volúmenes distintos para la misma dosis, y ese es el punto donde se producen las administraciones equivocadas más graves.' },
        ],
      },
      {
        titulo: 'Verificación de una orden',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Antes de cargar',
            items: [
              'Repetir la orden en voz alta al emisor y esperar su confirmación.',
              'Comprobar que la indicación corresponde al cuadro del paciente.',
              'Comprobar alergias y contraindicaciones conocidas.',
              'Leer la etiqueta del envase: nombre, concentración, caducidad e integridad.',
              'Calcular el volumen a partir de la concentración real del envase, no de la habitual.',
              'Verificar el cálculo con un segundo prestador cuando el protocolo lo exija o cuando el margen sea estrecho.',
              'Administrar por la vía autorizada y al ritmo indicado.',
              'Registrar de inmediato y vigilar la respuesta y los efectos adversos.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La repetición en voz alta no es una formalidad', texto: 'Repetir la orden al emisor y esperar su confirmación actúa ANTES de cargar, y es lo que detecta una orden mal escuchada en el punto donde se generó el malentendido. No agota los controles de la cadena: la lectura de la etiqueta, el cálculo a partir de la concentración real, la verificación por un segundo prestador y la vigilancia posterior actúan después y detectan errores distintos. Cada uno cubre un fallo que los demás no ven, y por eso se ejecutan todos aunque la orden se haya repetido.' },
        ],
      },
      {
        titulo: 'Qué modifica una dosis',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Situaciones que obligan a ajustar o a reconsiderar',
            items: [
              'Edad pediátrica: la dosificación suele depender del peso, y el peso estimado a ojo es una fuente conocida de error.',
              'Adulto mayor: cambios en la distribución, el metabolismo y la excreción modifican la respuesta.',
              'Embarazo y lactancia: cambia la indicación, no solo la cantidad.',
              'Insuficiencia renal o hepática: prolongan el efecto y favorecen la acumulación.',
              'Obesidad y desnutrición: la relación entre peso corporal y distribución no es lineal.',
              'Tratamiento habitual del paciente: las interacciones modifican el efecto esperado.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'El peso pediátrico no se estima a ojo', texto: 'Cuando la dosificación depende del peso, ese peso debe obtenerse por el método que el servicio haya adoptado —cinta de estimación, referencia del acompañante o báscula cuando exista— y registrarse. Qué método utiliza cada servicio lo declara su protocolo.' },
        ],
      },
      {
        titulo: 'Por qué no vale una tabla memorizada',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Tres razones concretas',
            items: [
              'Las presentaciones cambian: la concentración disponible en un servicio puede no ser la del servicio donde se aprendió la tabla.',
              'Las recomendaciones cambian: una dosis correcta hace unos años puede haber sido sustituida por la guía vigente.',
              'El alcance cambia: un medicamento que otro prestador administra con autorización puede no estar dentro del tuyo.',
            ],
          },
          { tipo: 'p', texto: 'Por eso la competencia que este tema busca no es recordar cifras, sino saber reunirlas y verificarlas: encontrar la indicación en la guía vigente, la concentración en la etiqueta y en la IPP, y la autorización en el protocolo del propio servicio.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Dosis verificada', definicion: 'Cantidad que consta con indicación, población, vía, concentración, cantidad-ritmo y respaldo; sin uno de esos datos no está verificada.' },
      { termino: 'Concentración', definicion: 'Cantidad de principio activo por unidad de volumen de la presentación concreta que se tiene en la mano.' },
      { termino: 'Repetición de la orden', definicion: 'Confirmación en voz alta de lo escuchado ante quien emitió la orden; es el primer control de la cadena y el que actúa sobre el malentendido en su origen, antes de cargar. No sustituye a los controles posteriores.' },
      { termino: 'Cadena de controles', definicion: 'Conjunto de comprobaciones sucesivas —repetición de la orden, lectura de la etiqueta, cálculo desde la concentración real, doble verificación y vigilancia posterior— en la que cada paso detecta un tipo de error que los demás no ven.' },
      { termino: 'Doble verificación', definicion: 'Comprobación del cálculo por un segundo prestador, exigible cuando el protocolo lo indica o el margen terapéutico es estrecho.' },
      { termino: 'Ajuste por población', definicion: 'Modificación de la dosificación o de la indicación por edad, embarazo, insuficiencia orgánica o tratamiento habitual.' },
    ],
    flashcards: [
      { frente: '¿Qué seis datos convierten una cifra en una dosis administrable?', reverso: 'Indicación, población, vía, concentración, cantidad y ritmo, y respaldo de quien autoriza.' },
      { frente: '¿Por qué la concentración es el dato que más errores produce?', reverso: 'Porque la orden va en cantidad de principio activo y lo administrado se mide en volumen; la conversión depende de la presentación concreta.' },
      { frente: '¿Para qué sirve repetir la orden en voz alta?', reverso: 'Para detectar una orden mal escuchada en su origen, antes de cargar. Es el primer eslabón de la cadena, no el único: la etiqueta, el cálculo desde la concentración real, la doble verificación y la vigilancia detectan otros errores.' },
      { frente: 'Nombra tres situaciones que obligan a ajustar una dosis.', reverso: 'Edad pediátrica, embarazo e insuficiencia renal o hepática (también adulto mayor, obesidad y tratamiento habitual).' },
      { frente: '¿Por qué es insegura una tabla de dosis memorizada de otro servicio?', reverso: 'Porque cambian las presentaciones, las recomendaciones vigentes y el alcance autorizado.' },
      { frente: '¿Cuál es la competencia que busca este tema?', reverso: 'Saber reunir y verificar los datos de una dosis, no recordar cifras.' },
    ],
    quiz: [
      {
        pregunta: 'Recibes una orden verbal de administrar cierta cantidad de un medicamento. ¿Cuál es tu primera acción?',
        opciones: [
          'Cargar la ampolleta que reconoces por su forma.',
          'Repetir la orden en voz alta al emisor y esperar su confirmación.',
          'Calcular el volumen con la concentración habitual.',
          'Administrar y registrar después.',
        ],
        correcta: 1,
        explicacion: 'La repetición detecta una orden mal escuchada antes de que se convierta en una dosis administrada; reconocer la ampolleta por su forma es precisamente lo que no debe hacerse.',
      },
      {
        pregunta: 'La presentación disponible tiene una concentración distinta a la que sueles manejar. ¿Qué haces?',
        opciones: [
          'Administrar el volumen habitual.',
          'Recalcular el volumen a partir de la concentración real del envase que tienes en la mano.',
          'Buscar otra ampolleta de la concentración habitual y, si no hay, no administrar.',
          'Duplicar el volumen por precaución.',
        ],
        correcta: 1,
        explicacion: 'La conversión entre cantidad de principio activo y volumen depende de la presentación concreta; usar el volumen habitual con otra concentración es el error más grave de esta unidad.',
      },
      {
        pregunta: '¿Por qué este tema no publica una tabla de medicamentos y dosis?',
        opciones: [
          'Porque las dosis son información reservada.',
          'Porque falta el formulario, las concentraciones y la dirección médica de la academia, y una tabla ajena no coincide con las ampolletas de la unidad.',
          'Porque la NOM-034 lo prohíbe.',
          'Porque el prestador prehospitalario no administra medicamentos.',
        ],
        correcta: 1,
        explicacion: 'El bloqueo es parcial y declarado: se enseña el método de verificación y se detiene la tabla hasta que la academia entregue esos datos.',
      },
      {
        pregunta: 'Paciente pediátrico cuya dosificación depende del peso. ¿Cómo obtienes el peso?',
        opciones: [
          'Estimándolo a ojo por su estatura.',
          'Por el método que el servicio haya adoptado, y se registra.',
          'Preguntando la edad y aplicando la dosis del adulto reducida a la mitad.',
          'Usando el peso medio de su grupo de edad.',
        ],
        correcta: 1,
        explicacion: 'El peso estimado a ojo es una fuente conocida de error; el método lo declara el protocolo del servicio y el dato se registra.',
      },
    ],
    actividades: {
      ordenar: {
        titulo: 'Ordena la verificación previa a administrar',
        pasos: [
          'Repetir la orden en voz alta y confirmar',
          'Comprobar que la indicación corresponde al cuadro',
          'Comprobar alergias y contraindicaciones',
          'Leer la etiqueta: nombre, concentración, caducidad',
          'Calcular el volumen con la concentración real del envase',
          'Verificar el cálculo con un segundo prestador si procede',
          'Administrar por la vía autorizada y al ritmo indicado',
          'Registrar y vigilar la respuesta',
        ],
      },
    },
    revision: ficha([
      'BLOQUEO PARCIAL DECLARADO: la tabla de medicamentos con sus dosis NO se publica. Se enseña el '
        + 'método de verificación, los datos que exige una dosis y lo que la modifica por población.',
      'PREGUNTA CONCRETA PARA LA ACADEMIA: ¿cuál es su formulario aprobado, con qué presentaciones y '
        + 'concentraciones reales, para qué indicaciones, en qué tipos de unidad y con qué dirección '
        + 'médica de respaldo? Con esos datos el tema se completa; sin ellos, no.',
      'CORRECCIÓN 2026-08-16: se retiró el absoluto que presentaba la repetición de la orden en voz '
        + 'alta como el «único» control posible. Se enseña como primer eslabón de una cadena de '
        + 'controles sucesivos, cada uno de los cuales detecta un tipo de error distinto.',
    ]),
  },

  // ============================================================
  //  Manejo de infusiones y aminas
  // ============================================================
  'm4-far-infusiones-aminas': {
    icono: '⏳',
    duracion: '18 min',
    resumen: 'Qué distingue una infusión continua de un bolo, de qué depende la cantidad que realmente '
      + 'recibe el paciente y por qué las recetas de aminas no se memorizan.',
    objetivos: [
      'Diferenciar la administración en bolo de la infusión continua.',
      'Identificar las variables que determinan la cantidad administrada por unidad de tiempo.',
      'Describir la vigilancia que exige una infusión de fármaco vasoactivo.',
      'Explicar por qué una receta de dilución ajena es insegura.',
    ],
    secciones: [
      {
        titulo: 'Bloqueo parcial declarado',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Sin formulario no hay receta', texto: 'Este tema enseña qué es una infusión continua, de qué depende lo que recibe el paciente y qué vigilancia exige. NO publica diluciones, concentraciones estándar, velocidades ni rangos de infusión de ninguna amina. Esas cifras dependen del producto registrado que tenga el servicio, de su presentación real, de la bomba o del equipo con que se administre y del protocolo de su dirección médica. Una receta memorizada de otro servicio, aplicada a otra presentación, produce una dosis distinta de la buscada.' },
          { tipo: 'p', texto: 'Por la misma razón, la práctica de cálculo asociada a esta unidad —el taller de ejercicios de aminas que el plan sitúa a continuación— permanece bloqueada hasta que la academia entregue su formulario, sus concentraciones, su equipo y su protocolo.' },
        ],
      },
      {
        titulo: 'Bolo e infusión continua',
        bloques: [
          { tipo: 'p', texto: 'Un bolo entrega una cantidad determinada en un tiempo corto: el efecto aparece pronto y decae según el fármaco se distribuya y se elimine. Una infusión continua entrega una cantidad por unidad de tiempo de forma sostenida, con el objetivo de mantener un efecto estable mientras dura la administración.' },
          {
            tipo: 'tabla',
            titulo: 'Diferencias que importan en la práctica',
            headers: ['', 'Bolo', 'Infusión continua'],
            filas: [
              ['Qué se ordena', 'Una cantidad', 'Una cantidad por unidad de tiempo'],
              ['Efecto', 'Rápido y decreciente', 'Sostenido mientras se mantenga'],
              ['Ajuste', 'Repitiendo o no la administración', 'Modificando la velocidad'],
              ['Si se interrumpe', 'Ya se administró', 'El efecto decae; en fármacos de vida corta, deprisa'],
              ['Vigilancia', 'Puntual tras la administración', 'Continua mientras dure'],
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'Una infusión interrumpida es un evento clínico', texto: 'Con un fármaco vasoactivo de acción corta, que la línea se acode, se desconecte o se termine la bolsa no es un contratiempo logístico: el efecto desaparece en poco tiempo y el paciente se deteriora. Por eso la línea de una infusión se vigila, se rotula y se protege durante cada movilización.' },
        ],
      },
      {
        titulo: 'De qué depende lo que recibe el paciente',
        bloques: [
          { tipo: 'p', texto: 'La cantidad de fármaco que recibe realmente el paciente por unidad de tiempo no la fija la orden por sí sola: resulta de la relación entre tres variables. Entender esa relación es lo que permite detectar un error antes de que llegue al paciente.' },
          {
            tipo: 'formula',
            texto: 'cantidad administrada por unidad de tiempo = concentración de la mezcla × velocidad de administración',
            nota: 'Y cuando la dosificación depende del peso, esa cantidad se divide además entre el peso del paciente. La concentración de la mezcla la determina el producto y la dilución; la velocidad, el equipo con que se administra.',
          },
          {
            tipo: 'lista',
            titulo: 'Consecuencias directas',
            items: [
              'La misma velocidad con dos concentraciones distintas entrega cantidades distintas.',
              'Cambiar la bolsa por otra preparada con distinta dilución cambia la dosis aunque la velocidad no se toque.',
              'Un cambio de equipo de administración puede cambiar el volumen entregado por unidad de tiempo.',
              'Por eso la mezcla se rotula: qué fármaco, qué cantidad, en qué volumen, quién la preparó y a qué hora.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La bolsa sin rotular no se administra', texto: 'Una mezcla preparada por otra persona y sin rótulo no puede verificarse: no se sabe su concentración y, por tanto, no se sabe qué dosis entrega a una velocidad dada. La conducta segura es no administrarla y preparar una nueva, no suponer que es la habitual.' },
        ],
      },
      {
        titulo: 'Aminas: qué son y qué exigen',
        bloques: [
          { tipo: 'p', texto: 'Con «aminas» el uso clínico habitual designa a los fármacos vasoactivos que se emplean para sostener la presión arterial y el gasto cardiaco cuando la causa del deterioro no se ha corregido o no basta con corregirla. Actúan sobre receptores del sistema cardiovascular y su efecto depende de la cantidad que llega por unidad de tiempo, de modo que se administran casi siempre en infusión continua y titulada.' },
          {
            tipo: 'lista',
            titulo: 'Lo que su uso exige, con independencia de cuál se emplee',
            items: [
              'Un acceso vascular seguro y comprobado, vigilado durante todo el traslado.',
              'Una mezcla preparada con concentración conocida y rotulada.',
              'Un equipo que permita administrar la velocidad indicada de forma estable.',
              'Vigilancia continua de frecuencia cardiaca, presión arterial, perfusión y estado del sitio de infusión.',
              'Una indicación respaldada por la dirección médica y dentro del alcance del prestador.',
              'Registro de la velocidad, de cada cambio y de la respuesta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Vigilar el sitio, no solo el monitor', texto: 'La extravasación de un fármaco vasoactivo puede dañar el tejido donde se acumula. El sitio de infusión se palpa y se mira periódicamente, y no se da por bueno porque el monitor muestre cifras aceptables.' },
          { tipo: 'p', texto: 'Cuáles de estos fármacos existen en la dotación, cuál corresponde a cada situación, con qué dilución se preparan y en qué rango se titulan son datos del formulario y del protocolo del servicio. Esta lección no los enuncia y no los sustituye.' },
        ],
      },
      FUENTES,
    ],
    conceptosClave: [
      { termino: 'Bolo', definicion: 'Administración de una cantidad determinada en un tiempo corto; el efecto aparece pronto y decae.' },
      { termino: 'Infusión continua', definicion: 'Administración de una cantidad por unidad de tiempo de forma sostenida, para mantener un efecto estable.' },
      { termino: 'Titulación', definicion: 'Ajuste de la velocidad de infusión según la respuesta del paciente.' },
      { termino: 'Concentración de la mezcla', definicion: 'Cantidad de fármaco por unidad de volumen de la solución preparada; junto con la velocidad determina la dosis entregada.' },
      { termino: 'Rotulado de la mezcla', definicion: 'Etiqueta con fármaco, cantidad, volumen, responsable y hora; sin ella la mezcla no puede verificarse y no se administra.' },
      { termino: 'Fármaco vasoactivo', definicion: 'Medicamento que actúa sobre el sistema cardiovascular para sostener presión arterial o gasto cardiaco; exige infusión titulada y vigilancia continua.' },
    ],
    flashcards: [
      { frente: '¿Qué se ordena en una infusión continua, frente a un bolo?', reverso: 'Una cantidad por unidad de tiempo, no una cantidad.' },
      { frente: '¿De qué depende la cantidad que recibe el paciente por unidad de tiempo?', reverso: 'De la concentración de la mezcla y de la velocidad de administración; y del peso cuando la dosificación depende de él.' },
      { frente: 'Cambias la bolsa por otra con distinta dilución sin tocar la velocidad. ¿Cambia la dosis?', reverso: 'Sí: la dosis entregada depende también de la concentración.' },
      { frente: '¿Qué haces con una mezcla sin rotular preparada por otra persona?', reverso: 'No administrarla y preparar una nueva: sin rótulo no se conoce su concentración.' },
      { frente: '¿Por qué una infusión interrumpida es un evento clínico?', reverso: 'Porque con un vasoactivo de acción corta el efecto desaparece pronto y el paciente se deteriora.' },
      { frente: '¿Qué se vigila además del monitor durante una infusión de vasoactivo?', reverso: 'El sitio de infusión, por el riesgo de extravasación y daño tisular.' },
    ],
    quiz: [
      {
        pregunta: 'Sustituyes la bolsa de infusión por otra preparada con distinta dilución y mantienes la misma velocidad. ¿Qué ocurre?',
        opciones: [
          'Nada: la velocidad determina la dosis.',
          'Cambia la dosis entregada, porque depende también de la concentración de la mezcla.',
          'Se reduce a la mitad automáticamente.',
          'El efecto se mantiene si el paciente pesa lo mismo.',
        ],
        correcta: 1,
        explicacion: 'La cantidad por unidad de tiempo resulta de concentración por velocidad; cambiar una sin ajustar la otra cambia la dosis.',
      },
      {
        pregunta: 'Recibes a un paciente con una infusión colgada en una bolsa sin rótulo. ¿Qué haces?',
        opciones: [
          'Continuarla a la misma velocidad: es la dilución habitual.',
          'No administrarla y preparar una nueva con concentración conocida y rotulada.',
          'Aumentar la velocidad hasta ver respuesta.',
          'Retirar el acceso vascular.',
        ],
        correcta: 1,
        explicacion: 'Sin rótulo no se conoce la concentración y, por tanto, no puede saberse qué dosis entrega a una velocidad dada; suponer que es la habitual es exactamente el error.',
      },
      {
        pregunta: 'Durante el traslado la línea de una infusión de fármaco vasoactivo se acoda. ¿Cómo lo interpretas?',
        opciones: [
          'Como un contratiempo logístico sin repercusión clínica.',
          'Como un evento clínico: con un vasoactivo de acción corta el efecto decae pronto.',
          'Como una indicación de aumentar la velocidad al restablecerla.',
          'Como un fallo del equipo que se resuelve al llegar al hospital.',
        ],
        correcta: 1,
        explicacion: 'Por eso la línea de una infusión se vigila, se rotula y se protege en cada movilización.',
      },
      {
        pregunta: '¿Por qué este tema no incluye diluciones ni rangos de infusión de aminas?',
        opciones: [
          'Porque son idénticos en todos los servicios.',
          'Porque dependen del producto, su presentación, el equipo y el protocolo del servicio, y una receta ajena entrega una dosis distinta.',
          'Porque las aminas no se usan en el ámbito prehospitalario.',
          'Porque la NOM-034 las prohíbe.',
        ],
        correcta: 1,
        explicacion: 'El bloqueo es parcial y declarado; se enseña la relación entre concentración, velocidad y dosis, y se detiene la receta.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La cantidad administrada por unidad de tiempo resulta de la ___ de la mezcla multiplicada por la velocidad.',
          opciones: ['temperatura', 'concentración', 'osmolaridad'],
          correcta: 1,
          explicacion: 'Por eso cambiar la bolsa por otra con distinta dilución cambia la dosis aunque no se toque la velocidad.',
        },
      ],
    },
    revision: ficha([
      'BLOQUEO PARCIAL DECLARADO: no se publican diluciones, concentraciones estándar, velocidades ni '
        + 'rangos de titulación de ninguna amina. Se enseña la relación entre concentración, velocidad '
        + 'y dosis, y la vigilancia que exige la infusión.',
      'PREGUNTA CONCRETA PARA LA ACADEMIA: ¿qué fármacos vasoactivos existen en su dotación, con qué '
        + 'presentación y concentración, con qué equipo se administran, con qué dilución los prepara '
        + 'su protocolo y en qué rango los titula?',
      'La práctica asociada (`m4-pra-taller-aminas`) permanece BLOQUEADA por la misma razón y no se '
        + 'desbloquea con esta lección.',
    ]),
  },
}
