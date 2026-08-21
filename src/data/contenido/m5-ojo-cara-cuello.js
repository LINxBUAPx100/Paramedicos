// ============================================================
//  MÓDULO 5 — Unidad «TRAUMA DE OJO, CARA Y CUELLO»
// ------------------------------------------------------------
//  Los 9 temas de la unidad, en el orden del PDF. El plan repite dos títulos
//  —«Objeto empalado» y «Exploración»— en la sección ocular y en la cervical:
//  se conservan los títulos documentales y cada lección se escribe para su
//  región, sin duplicar la otra.
//
//  HILO DE LA UNIDAD: en cara y cuello la prioridad casi siempre es la misma y
//  es la A del ABCDE. Sangre, dientes, edema, hematoma y secreciones compiten
//  por el mismo espacio por el que el paciente respira, y el deterioro es
//  progresivo. Lo llamativo —un ojo lesionado, una cara deformada— no es lo
//  primero que se atiende.
//
//  DEUDA BIBLIOGRÁFICA: no se dispone de capítulo y página verificados de
//  PHTLS 9 para esta unidad. La cita declara edición y deja el localizador como
//  PENDIENTE; no se inventa. La copia de PHTLS 10 declara traducción automática
//  y no se consulta ni se cita.
//
//  Nada de este archivo procede de `reutilizado.js`.
// ============================================================

const HOY = '2026-08-17'

const PHTLS = {
  nombre: 'NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4).',
  nota: 'Base curricular histórica declarada por el plan. Capítulo y página PENDIENTES: no se '
    + 'localizaron de forma reproducible en la copia licenciada para esta unidad y no se inventa un '
    + 'localizador. No se cita la 10.ª edición: la copia disponible declara traducción automática.',
}
const ACS_BEST = {
  nombre: 'American College of Surgeons. Trauma Quality Programs, Best Practices Guidelines.',
  url: 'https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/',
  nota: 'Colección de guías de buenas prácticas del ACS usada como contraste actual. PENDIENTE: guía y '
    + 'apartado exactos.',
}
const WHO_BEC = {
  nombre: 'World Health Organization / ICRC. Basic Emergency Care: approach to the acutely ill and '
    + 'injured, 2018.',
  url: 'https://www.who.int/publications/i/item/9789241513081',
  nota: 'Manual público de la OMS: ABCDE, manejo de la vía aérea y evaluación del traumatizado. '
    + 'PENDIENTE: módulo y página exactos.',
}
const AHA_PA_2024 = {
  nombre: '2024 American Heart Association and American Red Cross Guidelines for First Aid.',
  url: 'https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines',
  nota: 'Guía primaria actual para control de hemorragia externa y cuidado de heridas. PENDIENTE: '
    + 'apartado exacto.',
}
const PROTOCOLO_LOCAL = {
  nombre: 'Protocolo, equipamiento y dirección médica de la academia R.E.S.C.A.T.E.',
  nota: 'FUENTE LOCAL OBLIGATORIA Y PENDIENTE DE ENTREGA. Fija el alcance autorizado, el material '
    + 'disponible y el destino. No puede inventarse.',
}

const F = (items) => ({ titulo: 'Fuentes', bloques: [{ tipo: 'fuentes', items }] })

const VIA_AEREA = 'PRIORIDAD DE LA UNIDAD: en cara y cuello la vía aérea es la primera preocupación y '
  + 'el deterioro suele ser progresivo. La lesión más llamativa no es necesariamente la que se atiende '
  + 'primero.'
const AMBITO = 'ÁMBITO PREHOSPITALARIO: se reconoce, se protege, se documenta y se traslada. El '
  + 'diagnóstico y el tratamiento definitivo son hospitalarios; la impresión de campo no se presenta '
  + 'como diagnóstico.'
const PROTOCOLO = 'ALCANCE Y PROTOCOLO: manejo avanzado de la vía aérea, aspiración, analgesia, '
  + 'material de curación y destino dependen del alcance autorizado, del equipamiento y del protocolo '
  + 'del servicio.'

const ficha = ({ estado = 'borrador', extra = [], fuentes }) => ({
  estado,
  procedencia: 'redactado',
  actualizado: HOY,
  versionClinica: 'PHTLS 9.ª ed. (2020), capítulo pendiente; ACS Best Practices; WHO/ICRC BEC 2018',
  observaciones: [
    'Redactado desde cero en el lote B del Módulo 5; el tema estaba vacío.',
    VIA_AEREA,
    AMBITO,
    PROTOCOLO,
    'DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 pendientes de localizar para esta unidad.',
    ...extra,
  ],
  fuentes,
})

const FU = [
  'NAEMT. PHTLS, 9.ª ed., 2020 (capítulo y página pendientes).',
  'ACS. Trauma Quality Programs, Best Practices Guidelines.',
  'WHO/ICRC. Basic Emergency Care, 2018.',
]

export default {
  // ---------- Cara ----------

  'm5-tocc-lefort': {
    icono: 'cp-servier-senos-paranasales',
    duracion: '13 min',
    resumen: 'Le Fort describió tres patrones de fractura del macizo facial según por dónde se separa '
      + 'la cara del cráneo: I afecta al maxilar por encima de los dientes, II tiene forma piramidal e '
      + 'incluye la nariz, y III separa por completo el macizo facial de la base craneal. El ámbito '
      + 'prehospitalario no clasifica el patrón: reconoce que la cara está inestable, protege la vía '
      + 'aérea y traslada, sabiendo que hizo falta mucha energía para producirlo.',
    objetivos: [
      'Describir los tres patrones de Le Fort y el nivel al que separan el macizo facial.',
      'Reconocer la inestabilidad del tercio medio facial y su repercusión sobre la vía aérea.',
      'Aplicar las precauciones que impone la posible fractura de la base craneal.',
    ],
    secciones: [
      {
        titulo: 'Los tres patrones',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['Patrón', 'Por dónde separa', 'Qué se mueve al explorar'],
            filas: [
              ['Le Fort I', 'Trazo horizontal por encima de los dientes superiores', 'El paladar y la arcada dentaria superior, con el resto de la cara fijo'],
              ['Le Fort II', 'Trazo piramidal que incluye la nariz y los huesos que la rodean', 'La nariz y el maxilar como un bloque'],
              ['Le Fort III', 'Separación del macizo facial respecto de la base del cráneo', 'Toda la cara respecto de la frente: disyunción craneofacial'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Lo que el ámbito prehospitalario puede afirmar', texto: 'Que existe movilidad anormal del tercio medio de la cara y dónde se aprecia. Nada más. Los patrones se solapan, pueden ser asimétricos —un lado con un patrón y el otro con otro— y solo la imagen los define. Anotar «Le Fort II» en el informe es una conclusión que la escena no permite sostener.' },
          { tipo: 'callout', variante: 'clinico', titulo: 'Una fractura de Le Fort es un marcador de energía', texto: 'Separar la cara del cráneo exige un impacto considerable. Obliga a buscar traumatismo craneal, lesión cervical y lesiones asociadas, y pesa en la decisión de destino conforme a la guía de triaje y al protocolo.' },
        ],
      },
      {
        titulo: 'Lo que de verdad decide el pronóstico',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'La vía aérea, en este orden',
            items: [
              'Sangre, coágulos, fragmentos dentarios y secreciones ocupan la boca y la faringe: se aspira conforme al alcance y al equipo autorizados.',
              'El edema del tercio medio y de la lengua progresa con los minutos; un paciente que hablaba puede dejar de hacerlo.',
              'Un macizo facial inestable puede desplazarse hacia atrás y estrechar el paso del aire.',
              'Si el paciente está consciente y protege su vía aérea, la posición en que respira mejor puede ser sentado e inclinado hacia delante, siempre que no haya contraindicación por sospecha espinal.',
              'La necesidad de una vía aérea avanzada y quién puede establecerla dependen de la competencia, del equipo y de la dirección médica.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Nada por la nariz', texto: 'Las fracturas del tercio medio pueden comunicar con la base del cráneo. No se introducen sondas ni dispositivos por vía nasal, y si sale líquido claro por nariz u oído no se tapona: se cubre con gasa estéril sin comprimir y se deja drenar.' },
          {
            tipo: 'lista',
            titulo: 'Además',
            items: [
              'Control del sangrado con presión donde sea posible, sin comprometer la vía aérea.',
              'Restricción del movimiento espinal si el mecanismo lo indica.',
              'Recoger los fragmentos dentarios que se encuentren y trasladarlos con el paciente.',
              'Reevaluación frecuente: aquí el deterioro es de minutos, no de horas.',
              'Prealerta al centro receptor describiendo la inestabilidad facial y el estado de la vía aérea.',
            ],
          },
        ],
      },
      F([PHTLS, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Fractura de Le Fort', definicion: 'Patrón de fractura del macizo facial que separa la cara del cráneo a distintos niveles; se describe en tres tipos.' },
      { termino: 'Disyunción craneofacial', definicion: 'Separación completa del macizo facial respecto de la base del cráneo, correspondiente al patrón Le Fort III.' },
      { termino: 'Movilidad anormal del tercio medio', definicion: 'Desplazamiento del maxilar o de la cara al explorarla; hallazgo que el ámbito prehospitalario sí puede describir.' },
    ],
    flashcards: [
      { frente: '¿Qué separa cada patrón de Le Fort?', reverso: 'I, el maxilar por encima de los dientes; II, un bloque piramidal con la nariz; III, toda la cara respecto de la base del cráneo.' },
      { frente: '¿Puede el ámbito prehospitalario clasificar el patrón?', reverso: 'No: se solapan y pueden ser asimétricos; solo la imagen los define.' },
      { frente: '¿Cuál es la primera preocupación en estas fracturas?', reverso: 'La vía aérea: sangre, fragmentos, edema progresivo y desplazamiento del macizo facial.' },
      { frente: '¿Por qué no se usa la vía nasal?', reverso: 'Porque el tercio medio puede comunicar con la base del cráneo.' },
      { frente: '¿Qué significa encontrar una fractura de Le Fort?', reverso: 'Que hubo mucha energía: obliga a buscar traumatismo craneal y cervical y pesa en el destino.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con movilidad anormal de toda la cara respecto de la frente tras un impacto frontal. ¿Qué anotas y qué priorizas?',
        opciones: [
          'Anoto «Le Fort III» y priorizo la reducción de la fractura.',
          'Anoto movilidad anormal del tercio medio y dónde se aprecia, y priorizo la vía aérea con reevaluación frecuente.',
          'Anoto «fractura nasal» y aplico taponamiento.',
          'Priorizo la exploración ocular antes que la vía aérea.',
        ],
        correcta: 1,
        explicacion: 'La clasificación corresponde a la imagen; lo que decide el pronóstico en la escena es la vía aérea.',
      },
      {
        pregunta: 'Sale líquido claro por la nariz de un paciente con fractura del tercio medio facial. ¿Qué haces?',
        opciones: [
          'Taponas la fosa nasal.',
          'Cubres sin comprimir, dejas drenar y evitas la vía nasal para cualquier dispositivo.',
          'Aspiras por vía nasal.',
          'Colocas sonda nasogástrica para descomprimir el estómago.',
        ],
        correcta: 1,
        explicacion: 'Ocluir el drenaje puede aumentar la presión intracraneal y favorecer la infección; la vía nasal puede atravesar la fractura.',
      },
      {
        pregunta: 'El paciente está consciente, protege su vía aérea y respira mejor sentado e inclinado hacia delante. ¿Qué corresponde?',
        opciones: [
          'Acostarlo en decúbito supino en todos los casos.',
          'Permitir esa posición si no hay contraindicación por sospecha espinal, y reevaluar de forma frecuente.',
          'Sedarlo para poder tumbarlo.',
          'Trasladarlo en decúbito prono.',
        ],
        correcta: 1,
        explicacion: 'La posición en que el paciente maneja mejor sus secreciones puede ser la más segura, siempre que no haya contraindicación.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El patrón que separa por completo el macizo facial de la base del cráneo es Le Fort ___.',
          opciones: ['I', 'II', 'III'],
          correcta: 2,
          explicacion: 'Es la llamada disyunción craneofacial.',
        },
        {
          texto: 'En el informe, en lugar del número de patrón se describe la ___ del tercio medio y dónde se aprecia.',
          opciones: ['coloración', 'movilidad anormal', 'sensibilidad'],
          correcta: 1,
          explicacion: 'Es lo observable en la escena y lo útil para quien recibe al paciente.',
        },
        {
          texto: 'Ante una fractura del tercio medio facial, el deterioro de la vía aérea se mide en ___.',
          opciones: ['días', 'minutos', 'semanas'],
          correcta: 1,
          explicacion: 'El edema y el sangrado progresan deprisa: la reevaluación es continua.',
        },
      ],
    },
    revision: ficha({ fuentes: FU, extra: ['La lección prohíbe expresamente clasificar el patrón de Le Fort en el informe prehospitalario.'] }),
  },

  'm5-tocc-facial-signos': {
    icono: 'cp-servier-senos-paranasales',
    duracion: '13 min',
    resumen: 'El trauma facial impresiona y sangra mucho, y por eso desvía la atención con facilidad. '
      + 'Esta lección ordena la valoración: primero la vía aérea y la ventilación, después la '
      + 'hemorragia, después la búsqueda de lesión craneal y cervical, y solo entonces el detalle de '
      + 'la cara. Repasa los signos de fractura de mandíbula, de órbita y de nariz, y explica por qué '
      + 'una cara destrozada rara vez es la lesión que mata.',
    objetivos: [
      'Ordenar la valoración del trauma facial dentro del ABCDE.',
      'Reconocer los signos de fractura mandibular, orbitaria y nasal.',
      'Aplicar el manejo prehospitalario sin dejarse arrastrar por lo llamativo.',
    ],
    secciones: [
      {
        titulo: 'El orden importa',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'Lo llamativo no es lo primero', texto: 'Una cara deformada y ensangrentada capta toda la atención del equipo, y con frecuencia también la del propio paciente. Pero lo que mata en el trauma facial es la obstrucción de la vía aérea, la aspiración de sangre y las lesiones asociadas de cráneo y cuello. La secuencia no se altera: A, B, C y después el detalle.' },
          {
            tipo: 'lista',
            titulo: 'Signos por región',
            items: [
              'Mandíbula: dolor al abrir o cerrar la boca, mordida que no encaja, escalón en la arcada dentaria, dientes móviles o ausentes, saliva con sangre, incapacidad de cerrar la boca.',
              'Órbita: dolor, edema y equimosis periorbitaria, hundimiento del globo, alteración de la visión, visión doble al mirar hacia arriba, sensación de acorchamiento en la mejilla.',
              'Nariz: deformidad, epistaxis, obstrucción del paso del aire; conviene mirar si el tabique está desplazado dentro de la fosa.',
              'Tejidos blandos: heridas, avulsiones y colgajos, que sangran mucho pero rara vez comprometen la vida por sí solos.',
              'Cualquier región: enfisema subcutáneo facial, que indica comunicación con un seno o con la vía aérea.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'La mordida es un buen indicador', texto: 'Preguntar al paciente consciente si su mordida encaja como siempre es una comprobación rápida y sensible. Una mordida que «no cierra igual» sugiere fractura mandibular o del maxilar aunque no se palpe nada.' },
        ],
      },
      {
        titulo: 'Manejo',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Vía aérea: aspiración de sangre y secreciones conforme al alcance y al equipo, retirada de cuerpos extraños accesibles y vigilancia continua del edema.',
              'Permitir la posición en que el paciente maneja mejor sus secreciones si no hay contraindicación espinal.',
              'Control del sangrado con presión directa; en la epistaxis, presión sobre la parte blanda de la nariz conforme al protocolo, sin taponamiento nasal si se sospecha fractura de base.',
              'Cubrir las heridas y recolocar los colgajos sobre su lecho, sin forzar.',
              'Recoger los dientes o fragmentos avulsionados y trasladarlos con el paciente; su conservación se hace conforme al protocolo del servicio.',
              'Restricción del movimiento espinal si el mecanismo lo indica y valoración neurológica seriada.',
              'Analgesia según alcance y protocolo, y prevención de la hipotermia.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Dos advertencias', texto: 'Primera: no se retiran objetos empalados en la cara, aunque estén cerca del ojo o de la boca; se estabilizan en su posición, cuidando que no obstruyan el paso del aire. Segunda: en un paciente con trauma facial e hipotensión no se da la hipotensión por explicada con el sangrado de la cara sin haber buscado otras fuentes, porque el adulto rara vez llega al shock solo por una herida facial.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Maloclusión', definicion: 'Alteración de la forma en que encajan las arcadas dentarias; sugiere fractura mandibular o maxilar.' },
      { termino: 'Equimosis periorbitaria', definicion: 'Hematoma alrededor del ojo; puede deberse a trauma local o a fractura de la base del cráneo, en cuyo caso aparece tarde.' },
      { termino: 'Enfisema subcutáneo facial', definicion: 'Aire bajo la piel de la cara; indica comunicación con un seno paranasal o con la vía aérea.' },
    ],
    flashcards: [
      { frente: '¿Qué mata en el trauma facial?', reverso: 'La obstrucción de la vía aérea, la aspiración de sangre y las lesiones asociadas de cráneo y cuello.' },
      { frente: 'Comprobación rápida de fractura mandibular', reverso: 'Preguntar si la mordida encaja como siempre.' },
      { frente: '¿Se retira un objeto empalado en la cara?', reverso: 'No: se estabiliza en su posición, cuidando que no obstruya el paso del aire.' },
      { frente: '¿Qué indica el enfisema subcutáneo facial?', reverso: 'Comunicación con un seno paranasal o con la vía aérea.' },
      { frente: 'Adulto con trauma facial e hipotensión: ¿qué haces?', reverso: 'Buscar otras fuentes de hemorragia; la herida facial rara vez explica el shock por sí sola.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con la cara muy deformada y sangrante, consciente, con estridor incipiente. ¿Qué atiendes primero?',
        opciones: [
          'La reconstrucción del aspecto facial.',
          'La vía aérea: aspiración según alcance, posición que le permita manejar secreciones y vigilancia del edema.',
          'La equimosis periorbitaria.',
          'La epistaxis con taponamiento nasal.',
        ],
        correcta: 1,
        explicacion: 'El estridor señala estrechamiento de la vía aérea superior, y ese es el problema que decide el pronóstico.',
      },
      {
        pregunta: 'El paciente refiere que su mordida «no cierra igual» tras un golpe en la cara. ¿Qué sugiere?',
        opciones: [
          'Nada relevante.',
          'Fractura mandibular o del maxilar, aunque no se palpe deformidad.',
          'Fractura de la base del cráneo.',
          'Lesión ocular.',
        ],
        correcta: 1,
        explicacion: 'La maloclusión es un indicador sensible y fácil de comprobar en el paciente consciente.',
      },
      {
        pregunta: 'Un diente ha sido avulsionado en el impacto. ¿Qué corresponde?',
        opciones: [
          'Desecharlo.',
          'Recogerlo y trasladarlo con el paciente, conservándolo conforme al protocolo del servicio.',
          'Reimplantarlo en la escena presionándolo en su alvéolo.',
          'Envolverlo en gasa seca y dejarlo en el domicilio.',
        ],
        correcta: 1,
        explicacion: 'La conservación depende del material y del procedimiento del servicio; la reimplantación no se hace en campo.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Trauma facial grave con sangrado abundante. El paciente está hipotenso y taquicárdico. ¿Cómo interpretas la hipotensión?',
          opciones: [
            'La explico con el sangrado facial y cierro la búsqueda.',
            'Busco otras fuentes de hemorragia, porque en el adulto una herida facial rara vez explica el shock por sí sola, sin dejar de controlar el sangrado visible.',
            'La atribuyo a shock neurogénico por el traumatismo craneal.',
            'Espero a que aparezca hemorragia externa mayor.',
          ],
          correcta: 1,
          explicacion: 'La lección advierte expresamente de no dar por explicada la hipotensión con la herida facial en el adulto.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  // ---------- Ojo ----------

  'm5-tocc-ocular-empalado': {
    icono: 'cp-servier-ojo-corte',
    duracion: '11 min',
    resumen: 'Un objeto clavado en el ojo o en la órbita no se retira nunca en la escena: puede estar '
      + 'conteniendo el contenido del globo y sujetando estructuras cuya salida es irreversible. La '
      + 'conducta es estabilizarlo sin apoyarse en el ojo, proteger ambos ojos porque se mueven '
      + 'juntos, evitar todo lo que aumente la presión dentro del globo y trasladar. Es una de las '
      + 'situaciones en que hacer menos protege más.',
    objetivos: [
      'Justificar por qué no se retira un objeto empalado ocular.',
      'Aplicar la protección correcta, incluida la cobertura del ojo no lesionado.',
      'Evitar las maniobras que aumentan la presión intraocular.',
    ],
    secciones: [
      {
        titulo: 'Por qué no se toca',
        bloques: [
          { tipo: 'p', texto: 'El globo ocular es una esfera con contenido a presión. Si algo lo atraviesa y permanece clavado, ese objeto puede estar taponando la abertura. Retirarlo puede permitir la salida del contenido interno, y esa pérdida no se recupera. Además, cualquier presión sobre el globo empuja hacia fuera lo que hay dentro.' },
          { tipo: 'callout', variante: 'alerta', titulo: 'Prohibiciones concretas', texto: 'No se retira el objeto. No se ejerce presión sobre el globo, ni con la mano ni con un apósito. No se intenta reintroducir tejido que haya salido. No se lava el ojo con el objeto clavado. No se administra nada por vía ocular en esta situación.' },
        ],
      },
      {
        titulo: 'Qué se hace',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Protección',
            items: [
              'Tranquilizar al paciente y pedirle que no se frote ni intente mirar alrededor.',
              'Estabilizar el objeto para que no se mueva, apoyando el material alrededor de la órbita y nunca sobre el globo.',
              'Cubrir con un protector rígido que no toque el objeto ni el ojo, si se dispone de él; en su defecto, un apoyo improvisado que cumpla la misma función conforme al protocolo.',
              'Cubrir también el ojo no lesionado: los dos ojos se mueven a la vez, y tapar solo uno no impide el movimiento del otro.',
              'Elevar ligeramente la cabecera si no hay contraindicación espinal.',
              'Evitar que el paciente tosa, haga esfuerzos o vomite en la medida de lo posible: todo eso aumenta la presión dentro del globo.',
              'Traslado con prealerta a un centro con atención oftalmológica, según el protocolo de derivación del servicio.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Tapar los dos ojos tiene un coste', texto: 'Un paciente con ambos ojos cubiertos queda desorientado y asustado. Se le explica lo que se hace antes de hacerlo, se le avisa de cada movimiento y se mantiene contacto verbal constante. Es parte del cuidado, no un detalle amable.' },
          { tipo: 'p', texto: 'La analgesia y el control de la náusea, cuando estén indicados y autorizados, se administran conforme al alcance y al protocolo del servicio: el dolor y el vómito son dos de los factores que elevan la presión intraocular.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Objeto empalado ocular', definicion: 'Cuerpo extraño que permanece clavado en el globo o en la órbita; no se retira en el ámbito prehospitalario.' },
      { termino: 'Presión intraocular', definicion: 'Presión del contenido del globo; aumenta con la presión externa, la tos, el esfuerzo y el vómito.' },
      { termino: 'Movimiento conjugado', definicion: 'Desplazamiento simultáneo de ambos ojos, que obliga a cubrir también el ojo sano para inmovilizar el lesionado.' },
    ],
    flashcards: [
      { frente: '¿Por qué no se retira un objeto clavado en el ojo?', reverso: 'Porque puede estar taponando la abertura, y retirarlo permite la salida irreversible del contenido del globo.' },
      { frente: '¿Por qué se cubre también el ojo sano?', reverso: 'Porque los dos ojos se mueven a la vez y tapar solo uno no inmoviliza el lesionado.' },
      { frente: '¿Se apoya el apósito sobre el globo?', reverso: 'Nunca: el material se apoya alrededor de la órbita.' },
      { frente: 'Tres cosas que aumentan la presión intraocular', reverso: 'La presión externa, la tos o el esfuerzo, y el vómito.' },
      { frente: '¿Se lava el ojo con el objeto clavado?', reverso: 'No.' },
    ],
    quiz: [
      {
        pregunta: 'Trabajador con una esquirla metálica clavada en el ojo derecho. ¿Cuál es la conducta correcta?',
        opciones: [
          'Retirar la esquirla con pinzas y cubrir con gasa.',
          'Estabilizar el objeto sin apoyarse en el globo, cubrir ambos ojos, elevar ligeramente la cabecera y trasladar.',
          'Lavar el ojo con abundante suero para arrastrarla.',
          'Aplicar un apósito compresivo sobre el ojo.',
        ],
        correcta: 1,
        explicacion: 'Retirar, lavar o comprimir pueden provocar la salida del contenido del globo.',
      },
      {
        pregunta: 'El paciente empieza a tener náuseas durante el traslado. ¿Por qué importa?',
        opciones: [
          'No importa en una lesión ocular.',
          'Porque el vómito aumenta la presión dentro del globo; el control de la náusea se hace conforme al alcance y al protocolo.',
          'Porque impide cubrir el ojo sano.',
          'Porque obliga a retirar el objeto.',
        ],
        correcta: 1,
        explicacion: 'Tos, esfuerzo y vómito son factores que elevan la presión intraocular.',
      },
      {
        pregunta: 'Has cubierto ambos ojos y el paciente está angustiado. ¿Qué corresponde?',
        opciones: [
          'Destapar el ojo sano para tranquilizarlo.',
          'Explicarle cada maniobra antes de hacerla y mantener contacto verbal constante durante todo el traslado.',
          'Sedarlo en todos los casos.',
          'Dejar de hablarle para que descanse.',
        ],
        correcta: 1,
        explicacion: 'La lección presenta el acompañamiento verbal como parte del cuidado, no como un detalle amable.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El material de protección se apoya ___ la órbita, nunca sobre el globo.',
          opciones: ['sobre', 'alrededor de', 'dentro de'],
          correcta: 1,
          explicacion: 'Cualquier presión sobre el globo empuja hacia fuera su contenido.',
        },
        {
          texto: 'Se cubre también el ojo no lesionado porque ambos ojos tienen movimiento ___.',
          opciones: ['independiente', 'conjugado', 'involuntario únicamente'],
          correcta: 1,
          explicacion: 'Si el ojo sano se mueve, el lesionado se mueve con él.',
        },
        {
          texto: 'Ante un objeto empalado en el ojo, la conducta correcta es hacer ___ y trasladar.',
          opciones: ['todo lo posible en la escena', 'menos, protegiendo', 'un lavado abundante'],
          correcta: 1,
          explicacion: 'Es una de las situaciones en que intervenir menos protege más.',
        },
      ],
    },
    revision: ficha({ fuentes: FU, extra: ['El plan repite el título «Objeto empalado» en la sección ocular y en la cervical; esta lección desarrolla solo la ocular.'] }),
  },

  'm5-tocc-hemorragia-conjuntival': {
    icono: 'cp-servier-ojo-corte',
    duracion: '11 min',
    resumen: 'Dos hallazgos rojos en el ojo que se confunden con facilidad y no significan lo mismo. '
      + 'La hemorragia subconjuntival es sangre bajo la conjuntiva: aparatosa, indolora y casi siempre '
      + 'banal por sí sola. El hifema es sangre dentro de la cámara anterior, delante del iris, y sí '
      + 'es una lesión ocular seria con riesgo de resangrado y de aumento de la presión intraocular. '
      + 'La lección enseña a distinguirlos y a no tranquilizarse con el primero.',
    objetivos: [
      'Diferenciar hemorragia subconjuntival de hifema por su localización y su significado.',
      'Reconocer el hifema como lesión de riesgo y aplicar sus precauciones.',
      'Interpretar la hemorragia subconjuntival dentro del contexto del traumatismo.',
    ],
    secciones: [
      {
        titulo: 'Dos rojos distintos',
        bloques: [
          {
            tipo: 'tabla',
            headers: ['', 'Hemorragia subconjuntival', 'Hifema'],
            filas: [
              ['Dónde está la sangre', 'Bajo la conjuntiva, sobre la parte blanca del ojo', 'En la cámara anterior, delante del iris'],
              ['Aspecto', 'Mancha roja intensa de bordes definidos sobre la esclerótica', 'Nivel de sangre que se deposita y forma una línea horizontal al estar el paciente incorporado'],
              ['Dolor y visión', 'Habitualmente indolora y sin alteración visual', 'Dolor, visión borrosa y fotofobia frecuentes'],
              ['Significado', 'Por sí sola, banal; importa el contexto que la produjo', 'Lesión ocular seria, con riesgo de resangrado y de aumento de la presión intraocular'],
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'La subconjuntival no siempre es inocente', texto: 'La mancha en sí no tiene importancia, pero el contexto sí. En un traumatizado puede acompañar a una fractura orbitaria, a una lesión del globo o a una asfixia traumática por compresión torácica. Y en un traumatismo craneal, una hemorragia subconjuntival que rodea todo el ojo sin límite posterior visible debe hacer pensar en fractura de la base. Se documenta y se mira lo que hay alrededor.' },
        ],
      },
      {
        titulo: 'El hifema y sus precauciones',
        bloques: [
          { tipo: 'p', texto: 'El hifema se produce por rotura de vasos del iris o del cuerpo ciliar, casi siempre por un impacto contuso directo: una pelota, un puño, un objeto que golpea el ojo. La sangre se deposita por gravedad, así que la línea horizontal solo se aprecia si el paciente lleva un rato incorporado. El riesgo principal aparece en los días siguientes —resangrado y elevación de la presión intraocular—, pero lo que se hace en la escena influye.' },
          {
            tipo: 'lista',
            titulo: 'Conducta',
            items: [
              'Mantener al paciente incorporado, con la cabecera elevada, si no hay contraindicación espinal: favorece que la sangre se deposite y no cubra la pupila.',
              'Proteger el ojo con un protector que no ejerza presión sobre el globo.',
              'Evitar esfuerzos, agacharse, toser y frotarse el ojo.',
              'Control del dolor y de la náusea conforme al alcance y al protocolo.',
              'No administrar nada por vía ocular en el ámbito prehospitalario.',
              'Explorar el resto de la cara y descartar lesiones asociadas.',
              'Traslado con derivación oftalmológica conforme al protocolo del servicio: aunque el paciente vea bien, el riesgo aparece después.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La pregunta que conviene hacer', texto: 'Si el paciente refiere que toma anticoagulantes o tiene un trastorno de la coagulación, el riesgo de resangrado aumenta. Es un dato que cambia la urgencia de la valoración especializada y que hay que comunicar en la entrega.' },
        ],
      },
      F([PHTLS, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Hemorragia subconjuntival', definicion: 'Sangre acumulada bajo la conjuntiva, sobre la esclerótica; aparatosa e indolora, banal por sí sola.' },
      { termino: 'Hifema', definicion: 'Sangre en la cámara anterior del ojo, delante del iris; lesión seria con riesgo de resangrado y de hipertensión ocular.' },
      { termino: 'Cámara anterior', definicion: 'Espacio del ojo situado entre la córnea y el iris.' },
    ],
    flashcards: [
      { frente: '¿Dónde está la sangre en el hifema?', reverso: 'En la cámara anterior, delante del iris, y se deposita formando un nivel horizontal.' },
      { frente: '¿Y en la hemorragia subconjuntival?', reverso: 'Bajo la conjuntiva, sobre la parte blanca del ojo.' },
      { frente: '¿Cuál de las dos es una lesión seria?', reverso: 'El hifema, por el riesgo de resangrado y de aumento de la presión intraocular.' },
      { frente: '¿En qué posición se traslada un hifema?', reverso: 'Incorporado, con la cabecera elevada, si no hay contraindicación espinal.' },
      { frente: '¿Qué antecedente aumenta el riesgo de resangrado?', reverso: 'La anticoagulación o un trastorno de la coagulación.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente golpeado con una pelota en el ojo; refiere dolor y visión borrosa, y observas un nivel de sangre delante del iris. ¿Qué es?',
        opciones: ['Hemorragia subconjuntival', 'Hifema', 'Conjuntivitis', 'Cuerpo extraño corneal'],
        correcta: 1,
        explicacion: 'La sangre en la cámara anterior con dolor y visión borrosa define el hifema.',
      },
      {
        pregunta: 'Mancha roja intensa sobre la parte blanca del ojo, indolora y con visión normal, tras un traumatismo craneal. ¿Qué corresponde?',
        opciones: [
          'Tranquilizar y dar de alta: es banal.',
          'Documentarla y explorar el contexto: puede acompañar a fractura orbitaria, lesión del globo o fractura de la base del cráneo.',
          'Aplicar presión sobre el ojo.',
          'Lavar el ojo con suero abundante.',
        ],
        correcta: 1,
        explicacion: 'La mancha en sí es banal; lo que importa es lo que la acompaña.',
      },
      {
        pregunta: '¿Por qué se traslada al paciente con hifema incorporado?',
        opciones: [
          'Para reducir el dolor.',
          'Para que la sangre se deposite por gravedad y no cubra la pupila.',
          'Para facilitar la exploración pupilar.',
          'Porque impide el vómito.',
        ],
        correcta: 1,
        explicacion: 'La posición favorece el depósito de la sangre en la parte inferior de la cámara anterior.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'La sangre del hifema forma una línea horizontal porque se deposita por ___.',
          opciones: ['presión', 'gravedad', 'coagulación'],
          correcta: 1,
          explicacion: 'Por eso el nivel solo se aprecia si el paciente lleva un rato incorporado.',
        },
        {
          texto: 'La hemorragia subconjuntival es, por sí sola, ___; lo que importa es el contexto que la produjo.',
          opciones: ['una urgencia quirúrgica', 'banal', 'signo de hifema'],
          correcta: 1,
          explicacion: 'Puede acompañar a lesiones importantes, y por eso se documenta y se mira alrededor.',
        },
        {
          texto: 'El riesgo principal del hifema —resangrado y aumento de presión— aparece ___ del traumatismo.',
          opciones: ['en el mismo momento', 'en los días siguientes', 'nunca'],
          correcta: 1,
          explicacion: 'Por eso se deriva a valoración oftalmológica aunque el paciente vea bien en la escena.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-tocc-lesion-muscular-ojo': {
    icono: 'cp-servier-musculos-ojo',
    duracion: '11 min',
    resumen: 'Seis músculos mueven cada ojo, y trabajan de forma coordinada con los del otro para que '
      + 'veamos una sola imagen. Cuando uno se lesiona o queda atrapado en el trazo de una fractura de '
      + 'la órbita, el ojo deja de moverse en esa dirección y el paciente ve doble. El hallazgo más '
      + 'característico es la fractura por estallido del suelo orbitario con atrapamiento del músculo '
      + 'que eleva el ojo, y en el niño puede acompañarse de náusea y bradicardia.',
    objetivos: [
      'Relacionar la musculatura extraocular con el movimiento conjugado y la visión doble.',
      'Reconocer la fractura por estallido de la órbita y el atrapamiento muscular.',
      'Explorar y documentar la motilidad ocular sin causar daño.',
    ],
    secciones: [
      {
        titulo: 'Cómo se mueve el ojo y qué falla',
        bloques: [
          { tipo: 'p', texto: 'Cada globo ocular está movido por seis músculos que lo giran en todas las direcciones. Para que veamos una sola imagen, los dos ojos deben apuntar al mismo punto a la vez. Si un músculo no puede tirar del ojo —porque está contundido, porque su nervio está afectado o porque ha quedado atrapado en una fractura—, ese ojo se queda atrás en una dirección concreta y el cerebro recibe dos imágenes: eso es la diplopía.' },
          { tipo: 'callout', variante: 'clave', titulo: 'La fractura por estallido', texto: 'Un golpe sobre el globo —un puño, una pelota, un codo— transmite la presión al interior de la órbita, y la pared más delgada cede. Habitualmente cede el suelo, y el contenido orbitario se hernia hacia el seno que hay debajo. Si en ese descenso queda atrapado el músculo que eleva el ojo, el paciente no puede mirar hacia arriba con ese ojo y ve doble al intentarlo.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se encuentra',
            items: [
              'Visión doble, sobre todo al mirar en una dirección concreta.',
              'Limitación del movimiento de un ojo respecto del otro.',
              'Hundimiento del globo dentro de la órbita, que puede no ser evidente al principio por el edema.',
              'Acorchamiento de la mejilla, del ala nasal o del labio superior de ese lado.',
              'Dolor al intentar mover el ojo.',
              'Enfisema subcutáneo periorbitario, sobre todo si el paciente se suena la nariz.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'En el niño, un reflejo que asusta', texto: 'El atrapamiento muscular en el paciente pediátrico puede desencadenar un reflejo con náusea, vómito, bradicardia y aspecto de gravedad, con muy pocos signos externos. Una órbita que parece casi normal en un niño con vómitos y bradicardia tras un golpe en el ojo es una situación que exige valoración urgente, no observación.' },
        ],
      },
      {
        titulo: 'Exploración y conducta',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Cómo explorar la motilidad sin hacer daño',
            items: [
              'Pedir al paciente que mire un dedo y lo siga con los ojos, sin mover la cabeza.',
              'Recorrer las direcciones principales despacio y preguntando si en alguna ve doble.',
              'Comparar el movimiento de un ojo con el del otro.',
              'No forzar la apertura de los párpados si hay edema importante ni presionar el globo.',
              'Documentar en qué dirección aparece la limitación o la diplopía, y a qué hora.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Manejo',
            items: [
              'No presionar el ojo ni aplicar apósito compresivo.',
              'Indicar al paciente que NO se suene la nariz: puede empujar aire desde el seno hacia la órbita y aumentar el edema y el enfisema.',
              'Frío local solo si el protocolo lo contempla, y sin apoyar peso sobre el globo.',
              'Analgesia y control de la náusea conforme al alcance y al protocolo.',
              'Traslado con derivación a valoración especializada; el diagnóstico requiere imagen.',
              'En el paciente pediátrico con náusea y bradicardia, comunicar la sospecha de atrapamiento en la prealerta.',
            ],
          },
        ],
      },
      F([PHTLS, ACS_BEST, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Diplopía', definicion: 'Visión doble por pérdida de la alineación entre ambos ojos.' },
      { termino: 'Fractura por estallido orbitario', definicion: 'Fractura de una pared de la órbita —habitualmente el suelo— por transmisión de presión desde el globo, con herniación del contenido.' },
      { termino: 'Atrapamiento muscular', definicion: 'Retención de un músculo extraocular en el trazo de la fractura, que limita el movimiento del ojo en una dirección.' },
      { termino: 'Enoftalmos', definicion: 'Hundimiento del globo ocular dentro de la órbita; puede quedar enmascarado por el edema inicial.' },
    ],
    flashcards: [
      { frente: '¿Por qué aparece visión doble?', reverso: 'Porque un ojo deja de apuntar al mismo punto que el otro y el cerebro recibe dos imágenes.' },
      { frente: '¿Qué pared cede en la fractura por estallido?', reverso: 'Habitualmente el suelo de la órbita, que es la más delgada.' },
      { frente: '¿Qué movimiento se limita con el atrapamiento típico?', reverso: 'Mirar hacia arriba con el ojo afectado.' },
      { frente: '¿Por qué se prohíbe sonarse la nariz?', reverso: 'Porque empuja aire desde el seno hacia la órbita y aumenta el edema y el enfisema.' },
      { frente: 'Niño con náusea y bradicardia tras golpe ocular: ¿qué se piensa?', reverso: 'Atrapamiento muscular con reflejo asociado: exige valoración urgente pese a los pocos signos externos.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente golpeado en el ojo que no puede mirar hacia arriba con ese ojo y ve doble al intentarlo. ¿Qué sospechas?',
        opciones: [
          'Hifema.',
          'Fractura por estallido del suelo orbitario con atrapamiento muscular.',
          'Hemorragia subconjuntival.',
          'Lesión del nervio óptico aislada.',
        ],
        correcta: 1,
        explicacion: 'La limitación selectiva de la mirada hacia arriba con diplopía es el patrón característico.',
      },
      {
        pregunta: 'El paciente quiere sonarse la nariz porque la nota tapada. ¿Qué le indicas?',
        opciones: [
          'Que lo haga con suavidad.',
          'Que no se la suene: puede empujar aire desde el seno hacia la órbita y aumentar el edema y el enfisema.',
          'Que se la suene tapando la fosa contraria.',
          'Que no tiene relación con su lesión.',
        ],
        correcta: 1,
        explicacion: 'Es una indicación concreta y fácil de dar que evita un empeoramiento evitable.',
      },
      {
        pregunta: 'Niño de 8 años con golpe ocular, órbita casi normal, que vomita y está bradicárdico. ¿Cómo procedes?',
        opciones: [
          'Observación domiciliaria: la órbita se ve bien.',
          'Traslado con valoración urgente y prealerta por sospecha de atrapamiento muscular con reflejo asociado.',
          'Aplicar apósito compresivo sobre el ojo.',
          'Atribuirlo a un cuadro digestivo sin relación.',
        ],
        correcta: 1,
        explicacion: 'La lección advierte de que en el niño el cuadro puede ser grave con pocos signos externos.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Cada globo ocular está movido por ___ músculos que lo giran en todas las direcciones.',
          opciones: ['cuatro', 'seis', 'ocho'],
          correcta: 1,
          explicacion: 'Su acción coordinada con el otro ojo es lo que permite ver una sola imagen.',
        },
        {
          texto: 'El hundimiento del globo puede no verse al principio porque queda enmascarado por el ___.',
          opciones: ['hematoma subconjuntival', 'edema', 'enfisema'],
          correcta: 1,
          explicacion: 'Por eso la ausencia de enoftalmos en la escena no descarta la fractura.',
        },
        {
          texto: 'Al explorar la motilidad se documenta en qué ___ aparece la limitación o la diplopía.',
          opciones: ['ojo únicamente', 'dirección de la mirada', 'momento del día'],
          correcta: 1,
          explicacion: 'Es el dato que orienta qué músculo está comprometido y permite comparar después.',
        },
      ],
    },
    revision: ficha({ fuentes: FU }),
  },

  'm5-tocc-ocular-exploracion': {
    icono: 'cp-servier-ojo',
    duracion: '13 min',
    resumen: 'La exploración ocular prehospitalaria se apoya en cinco comprobaciones sencillas: qué ve '
      + 'el paciente, cómo están las pupilas, cómo se mueven los ojos, qué aspecto tiene el globo y '
      + 'qué refiere. Con eso basta para separar lo que puede esperar de lo que no. La lección explica '
      + 'además la única situación ocular en que el tiempo apremia de verdad —la exposición química— y '
      + 'delimita lo que no se hace nunca en la escena.',
    objetivos: [
      'Ejecutar una exploración ocular ordenada y reproducible.',
      'Identificar los hallazgos que exigen derivación urgente.',
      'Aplicar la conducta ante exposición química y las prohibiciones generales.',
    ],
    secciones: [
      {
        titulo: 'Cinco comprobaciones',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'En este orden',
            items: [
              'Agudeza visual aproximada, ojo por ojo, tapando el otro: ¿lee algo, cuenta dedos, ve movimiento, percibe luz o no ve nada? Se anota qué se le pidió y qué respondió.',
              'Pupilas: tamaño, simetría, forma y respuesta a la luz. Una pupila irregular o «en gota» sugiere apertura del globo.',
              'Motilidad: seguir un dedo en las direcciones principales, preguntando por visión doble.',
              'Inspección del globo y de los anexos: heridas, cuerpos extraños visibles, sangre en la cámara anterior, deformidad, herida palpebral, salida de contenido.',
              'Lo que refiere: dolor, fotofobia, sensación de cuerpo extraño, pérdida súbita de visión, destellos o «cortina» en el campo visual.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Hallazgos que no esperan', texto: 'Pérdida brusca de visión, pupila irregular o «en gota», salida de contenido del globo, objeto empalado, sangre en la cámara anterior, sospecha de fractura orbitaria con atrapamiento y cualquier exposición química. Todos ellos se trasladan con derivación especializada conforme al protocolo del servicio.' },
        ],
      },
      {
        titulo: 'La exposición química y las prohibiciones',
        bloques: [
          { tipo: 'callout', variante: 'clave', titulo: 'La única prisa real del ojo', texto: 'Ante una sustancia química en el ojo, la irrigación abundante e inmediata con agua limpia o solución salina es la medida que más cambia el resultado, y empieza antes de averiguar qué producto era. Se irriga desde el ángulo interno hacia fuera, para no arrastrar el producto al otro ojo, y se mantiene durante el traslado si el protocolo lo permite. Los álcalis penetran más que los ácidos, así que un aspecto poco llamativo no autoriza a irrigar menos.' },
          {
            tipo: 'lista',
            titulo: 'Lo que no se hace en la escena',
            items: [
              'No se irriga un ojo con un objeto empalado o con sospecha de apertura del globo.',
              'No se retiran cuerpos extraños incrustados; los superficiales y libres pueden arrastrarse con irrigación conforme al protocolo.',
              'No se aplica apósito compresivo sobre el globo.',
              'No se administra ningún colirio, anestésico ni medicación ocular: no está dentro del alcance de esta lección y su uso lo determina el protocolo.',
              'No se frota el ojo ni se permite que el paciente lo haga.',
              'No se retiran lentes de contacto salvo que el protocolo lo indique y no haya sospecha de lesión abierta.',
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Registrar la visión inicial vale mucho', texto: 'Una anotación como «cuenta dedos a un metro con el ojo derecho; con el izquierdo solo percibe luz, 17:40» permite a quien recibe al paciente saber si mejora o empeora. «Visión disminuida» no permite comparar nada.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Agudeza visual aproximada', definicion: 'Estimación prehospitalaria de la visión ojo por ojo: leer, contar dedos, ver movimiento, percibir luz o no ver.' },
      { termino: 'Pupila en gota', definicion: 'Deformidad pupilar que sugiere apertura del globo ocular.' },
      { termino: 'Irrigación ocular', definicion: 'Lavado abundante del ojo ante exposición química, desde el ángulo interno hacia fuera.' },
    ],
    flashcards: [
      { frente: 'Las cinco comprobaciones de la exploración ocular', reverso: 'Agudeza visual, pupilas, motilidad, inspección del globo y lo que refiere el paciente.' },
      { frente: '¿Qué sugiere una pupila irregular o «en gota»?', reverso: 'Apertura del globo ocular.' },
      { frente: '¿Cuándo empieza la irrigación en una exposición química?', reverso: 'De inmediato, antes de averiguar qué producto era.' },
      { frente: '¿En qué dirección se irriga?', reverso: 'Desde el ángulo interno hacia fuera, para no arrastrar el producto al otro ojo.' },
      { frente: '¿Se irriga un ojo con objeto empalado?', reverso: 'No.' },
      { frente: '¿Cómo se registra la visión?', reverso: 'Describiendo qué se pidió y qué respondió, ojo por ojo y con la hora.' },
    ],
    quiz: [
      {
        pregunta: 'Trabajador con salpicadura de un producto de limpieza en ambos ojos. ¿Cuál es la primera medida?',
        opciones: [
          'Averiguar la composición exacta del producto antes de actuar.',
          'Irrigar de inmediato y de forma abundante con agua limpia o solución salina, desde el ángulo interno hacia fuera.',
          'Cubrir ambos ojos y trasladar sin irrigar.',
          'Aplicar un colirio anestésico.',
        ],
        correcta: 1,
        explicacion: 'La irrigación precoz es la medida que más cambia el resultado, y no espera a identificar el producto.',
      },
      {
        pregunta: 'Encuentras una pupila irregular «en gota» en un paciente con herida ocular. ¿Qué implica?',
        opciones: [
          'Es una variante normal.',
          'Sugiere apertura del globo: no se irriga, no se comprime y se traslada con derivación especializada.',
          'Indica hifema.',
          'Confirma fractura orbitaria.',
        ],
        correcta: 1,
        explicacion: 'La deformidad pupilar es uno de los signos de sospecha de globo abierto.',
      },
      {
        pregunta: '¿Cuál de estas anotaciones sirve para comparar después?',
        opciones: [
          '«Visión disminuida».',
          '«Cuenta dedos a un metro con el ojo derecho; con el izquierdo solo percibe luz, 17:40».',
          '«Ojo afectado».',
          '«Ve mal».',
        ],
        correcta: 1,
        explicacion: 'Solo la descripción concreta con hora permite detectar mejoría o deterioro.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Paciente con exposición química ocular en el que además sospechas apertura del globo por una herida evidente. ¿Cómo resuelves el conflicto entre irrigar y no irrigar?',
          opciones: [
            'Irrigo a presión para arrastrar el producto cuanto antes.',
            'No irrigo un globo con sospecha de apertura: protejo sin comprimir, comunico ambas circunstancias en la prealerta y traslado con derivación especializada urgente conforme al protocolo.',
            'Aplico un apósito compresivo y traslado.',
            'Espero indicaciones antes de hacer nada.',
          ],
          correcta: 1,
          explicacion: 'La lección enumera la sospecha de globo abierto entre las situaciones en que no se irriga, y exige comunicar los hallazgos que condicionan la atención posterior.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['No se autoriza ningún colirio, anestésico ni medicación ocular: su uso depende del protocolo del servicio.'],
    }),
  },

  // ---------- Cuello ----------

  'm5-tocc-cuello-hemorragias': {
    icono: 'cp-smart-arterias-cuello',
    duracion: '13 min',
    resumen: 'El cuello concentra en muy poco espacio vasos de gran calibre, la vía aérea y estructuras '
      + 'nerviosas, y no ofrece un plano óseo contra el que comprimir con comodidad. Por eso su '
      + 'hemorragia se controla con presión directa localizada y nunca con un vendaje que rodee el '
      + 'cuello ni con empaquetamiento. La lección añade dos problemas propios de esta región: el '
      + 'hematoma que comprime la vía aérea y la entrada de aire por una vena abierta.',
    objetivos: [
      'Aplicar el control de la hemorragia cervical con sus limitaciones anatómicas.',
      'Reconocer el hematoma cervical en expansión como problema de vía aérea.',
      'Explicar el riesgo de entrada de aire por una vena cervical abierta.',
    ],
    secciones: [
      {
        titulo: 'Control del sangrado',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Conducta',
            items: [
              'Protección personal: el sangrado cervical salpica y con frecuencia es abundante.',
              'Presión directa localizada sobre el punto que sangra, con apósito y con los dedos o la mano.',
              'Mantener la presión de forma sostenida, sin levantarla para comprobar.',
              'No rodear el cuello con un vendaje circular: comprimiría la vía aérea y, si es bilateral, el retorno venoso del cráneo.',
              'Si hace falta fijar el apósito, hacerlo pasando el vendaje por debajo de la axila del lado contrario, de modo que nunca rodee el cuello.',
              'Vigilancia continua de la vía aérea mientras se controla el sangrado.',
              'Traslado urgente: el control definitivo de una lesión vascular cervical es quirúrgico.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'El cuello no se empaqueta', texto: 'Rellenar una herida cervical con gasa hasta el fondo no está indicado: el material puede desplazarse, comprimir la vía aérea o migrar hacia estructuras profundas. Que la unidad disponga de apósito hemostático no cambia esa limitación. La presión se aplica desde fuera y de forma localizada.' },
        ],
      },
      {
        titulo: 'Dos problemas propios de esta región',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'El hematoma que crece', texto: 'Una lesión vascular puede sangrar hacia dentro sin que salga apenas sangre. El hematoma ocupa espacio en un compartimento estrecho y desplaza la vía aérea. Un cuello que aumenta de volumen, una voz que cambia, un estridor que aparece o una desviación visible de la tráquea son señales de que el problema ya no es solo hemorrágico. Se reevalúa de forma continua y se avisa temprano al centro receptor, porque preparar una vía aérea difícil lleva tiempo.' },
          { tipo: 'p', texto: 'El segundo problema es la entrada de aire. Las venas del cuello pueden tener presión negativa durante la inspiración, de modo que una vena abierta puede aspirar aire hacia la circulación. Por esa razón, ante una herida cervical con sospecha de lesión venosa, algunos protocolos indican cubrirla de forma oclusiva mientras se mantiene la presión, y colocar al paciente en decúbito supino en lugar de sentado. Qué cobertura se usa y en qué situación lo determina el protocolo del servicio; esta lección enseña el riesgo, no impone el material.' },
          {
            tipo: 'lista',
            titulo: 'Lo que se comunica en la entrega',
            items: [
              'Localización y aspecto de la herida, y si el sangrado era pulsátil o continuo, sin deducir el vaso.',
              'Si hay hematoma y si ha crecido desde la primera valoración, con las horas.',
              'Cambios de la voz, estridor o dificultad respiratoria y cuándo aparecieron.',
              'Qué material se aplicó, con qué presión y desde qué hora.',
              'Si hubo pérdida de conciencia o déficit neurológico asociado.',
            ],
          },
        ],
      },
      F([AHA_PA_2024, PHTLS, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Hematoma cervical en expansión', definicion: 'Colección de sangre que crece en el cuello y desplaza o comprime la vía aérea.' },
      { termino: 'Embolia gaseosa venosa', definicion: 'Entrada de aire a la circulación a través de una vena abierta, favorecida por la presión negativa durante la inspiración.' },
      { termino: 'Presión directa localizada', definicion: 'Compresión aplicada sobre el punto sangrante, sin rodear el cuello ni comprometer la vía aérea.' },
    ],
    flashcards: [
      { frente: '¿Se venda el cuello de forma circular?', reverso: 'Nunca: comprimiría la vía aérea y el retorno venoso del cráneo.' },
      { frente: '¿Cómo se fija un apósito cervical?', reverso: 'Pasando el vendaje por debajo de la axila del lado contrario, sin rodear el cuello.' },
      { frente: '¿Se empaqueta una herida del cuello?', reverso: 'No: el material puede desplazarse, comprimir la vía aérea o migrar.' },
      { frente: 'Señales de que el hematoma cervical compromete la vía aérea', reverso: 'Aumento del volumen del cuello, cambio de voz, estridor y desviación traqueal.' },
      { frente: '¿Por qué preocupa una vena cervical abierta?', reverso: 'Por el riesgo de entrada de aire a la circulación durante la inspiración.' },
    ],
    quiz: [
      {
        pregunta: 'Herida sangrante en la cara lateral del cuello. ¿Cuál es la conducta correcta?',
        opciones: [
          'Vendaje circular apretado alrededor del cuello.',
          'Presión directa localizada sostenida, sin rodear el cuello, vigilando la vía aérea y trasladando con urgencia.',
          'Empaquetamiento con gasa hemostática hasta el fondo.',
          'Elevación de la cabecera y observación.',
        ],
        correcta: 1,
        explicacion: 'El cuello no admite vendaje circular ni empaquetamiento; la presión se aplica localizada y desde fuera.',
      },
      {
        pregunta: 'El paciente sangra poco por fuera pero su cuello aumenta de volumen y su voz cambia. ¿Qué ocurre?',
        opciones: [
          'El sangrado se ha detenido y el cuadro mejora.',
          'Un hematoma en expansión está comprometiendo la vía aérea: se reevalúa de forma continua y se avisa temprano al centro receptor.',
          'Es una reacción alérgica al apósito.',
          'Es enfisema subcutáneo sin repercusión.',
        ],
        correcta: 1,
        explicacion: 'El problema deja de ser solo hemorrágico y pasa a ser de vía aérea, que necesita preparación en destino.',
      },
      {
        pregunta: '¿Por qué algunos protocolos indican cubrir de forma oclusiva una herida cervical con sospecha de lesión venosa?',
        opciones: [
          'Para reducir el dolor.',
          'Por el riesgo de que la vena abierta aspire aire hacia la circulación durante la inspiración.',
          'Para permitir el empaquetamiento posterior.',
          'Para evitar la infección exclusivamente.',
        ],
        correcta: 1,
        explicacion: 'El material concreto y la situación los determina el protocolo; el riesgo es el que justifica la medida.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'Un vendaje que rodee el cuello está prohibido porque comprime la vía aérea y el ___ del cráneo.',
          opciones: ['flujo arterial', 'retorno venoso', 'drenaje linfático'],
          correcta: 1,
          explicacion: 'Si es bilateral, dificulta la salida de sangre venosa de la cabeza.',
        },
        {
          texto: 'Un cuello que aumenta de volumen con cambio de voz indica que el problema ya no es solo hemorrágico, sino de ___.',
          opciones: ['perfusión', 'vía aérea', 'temperatura'],
          correcta: 1,
          explicacion: 'Por eso se avisa temprano: preparar una vía aérea difícil lleva tiempo.',
        },
        {
          texto: 'Ante sospecha de lesión venosa cervical, algunos protocolos indican colocar al paciente en decúbito ___ en lugar de sentado.',
          opciones: ['prono', 'supino', 'lateral izquierdo'],
          correcta: 1,
          explicacion: 'Busca reducir el riesgo de que la vena aspire aire; la indicación concreta la fija el protocolo.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['La cobertura oclusiva de la herida cervical se presenta como conducta dependiente del protocolo del servicio, no como regla universal de esta lección.'],
    }),
  },

  'm5-tocc-cuello-exploracion': {
    icono: 'cp-smart-arterias-cuello',
    duracion: '12 min',
    resumen: 'Explorar el cuello de un traumatizado es buscar problemas en tres sistemas a la vez: la '
      + 'vía aérea, los vasos y la columna cervical. La lección organiza esa búsqueda con una regla '
      + 'nemotécnica sencilla y explica por qué el hallazgo más valioso no es lo que se ve en la '
      + 'primera mirada, sino lo que cambia entre valoraciones. También delimita lo que no se hace: '
      + 'sondar heridas, retirar coágulos o explorar trayectos.',
    objetivos: [
      'Ejecutar una exploración cervical ordenada en el paciente traumatizado.',
      'Reconocer los signos de compromiso de vía aérea, vascular y espinal.',
      'Documentar los hallazgos de forma comparable y evitar las maniobras prohibidas.',
    ],
    secciones: [
      {
        titulo: 'Qué se busca',
        bloques: [
          { tipo: 'p', texto: 'La exploración se hace manteniendo la alineación de la columna cervical si el mecanismo lo indica, y aprovechando el momento en que se abre o se ajusta el collarín, con una persona sosteniendo la cabeza. No se retira el collarín solo para mirar.' },
          {
            tipo: 'tabla',
            headers: ['Sistema', 'Qué se busca', 'Qué significa'],
            filas: [
              ['Vía aérea', 'Estridor, disfonía, hemoptisis, enfisema subcutáneo, desviación traqueal', 'Lesión laringotraqueal o compresión: prioridad absoluta'],
              ['Vascular', 'Hemorragia activa, hematoma en expansión, soplo o frémito, pulso asimétrico, déficit neurológico focal', 'Lesión de vaso cervical: traslado urgente'],
              ['Espinal', 'Dolor en la línea media, escalón, deformidad, parestesias, debilidad', 'Posible lesión vertebral o medular: restricción del movimiento'],
              ['Digestivo', 'Dolor al tragar, saliva con sangre, enfisema', 'Posible lesión esofágica: nada por vía oral y prealerta'],
            ],
          },
          { tipo: 'callout', variante: 'clinico', titulo: 'Mirar, palpar, escuchar y preguntar', texto: 'Se inspecciona toda la circunferencia, incluida la nuca; se palpa con suavidad buscando enfisema, escalón y puntos dolorosos; se escucha la voz del paciente al hablar, que es una prueba funcional gratuita; y se pregunta por dolor al tragar, cambio de voz, hormigueo y dificultad para respirar.' },
        ],
      },
      {
        titulo: 'Lo que no se hace y lo que se documenta',
        bloques: [
          { tipo: 'callout', variante: 'alerta', titulo: 'Prohibiciones', texto: 'No se sonda ni se explora el trayecto de una herida cervical con dedos ni instrumentos. No se retiran coágulos adheridos, que pueden estar conteniendo el sangrado. No se retira un objeto empalado. No se palpa con fuerza sobre un hematoma en expansión. Y no se descarta lesión cervical porque el paciente hable y mueva las extremidades.' },
          {
            tipo: 'lista',
            titulo: 'Qué se anota',
            items: [
              'Localización y aspecto de cada herida, sin etiquetar entrada o salida.',
              'Presencia y extensión del enfisema subcutáneo, y si ha crecido.',
              'Estado de la voz y su evolución.',
              'Perímetro o aspecto del cuello si hay hematoma, para poder comparar.',
              'Hallazgos neurológicos de las cuatro extremidades.',
              'La hora de cada valoración: en el cuello, la comparación entre dos exploraciones vale más que cualquier hallazgo aislado.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La paradoja del cuello', texto: 'Un paciente con una lesión cervical grave puede estar hablando con normalidad al llegar el equipo. La lesión ocupa espacio y crece, y el deterioro puede ser brusco. Por eso aquí la vigilancia continua no es una recomendación genérica: es la parte principal del trabajo.' },
        ],
      },
      F([PHTLS, WHO_BEC, ACS_BEST, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Frémito', definicion: 'Vibración palpable sobre un vaso, que puede indicar flujo turbulento por lesión vascular.' },
      { termino: 'Desviación traqueal', definicion: 'Desplazamiento de la tráquea respecto de la línea media; signo tardío y difícil de apreciar.' },
      { termino: 'Exploración comparativa', definicion: 'Repetición documentada de la valoración cuyo valor está en detectar el cambio.' },
    ],
    flashcards: [
      { frente: 'Los tres sistemas que se exploran en el cuello', reverso: 'Vía aérea, vasos y columna cervical; además, la posible lesión esofágica.' },
      { frente: '¿Se retira el collarín para explorar?', reverso: 'No: se aprovecha la apertura o el ajuste, con una persona sosteniendo la cabeza.' },
      { frente: '¿Se retiran los coágulos adheridos de una herida cervical?', reverso: 'No: pueden estar conteniendo el sangrado.' },
      { frente: '¿Qué prueba funcional gratuita se usa siempre?', reverso: 'Escuchar la voz del paciente al hablar.' },
      { frente: '¿Por qué la vigilancia continua es aquí el trabajo principal?', reverso: 'Porque una lesión cervical grave puede empezar con el paciente hablando y deteriorarse de forma brusca.' },
    ],
    quiz: [
      {
        pregunta: 'Herida cervical con sangrado ya cohibido y un coágulo adherido. ¿Qué haces?',
        opciones: [
          'Retiras el coágulo para valorar la profundidad.',
          'No lo retiras: puede estar conteniendo el sangrado; describes lo visible y mantienes la vigilancia.',
          'Sondas el trayecto con una pinza.',
          'Aplicas un vendaje circular para asegurarlo.',
        ],
        correcta: 1,
        explicacion: 'Retirar el coágulo o explorar el trayecto puede reanudar una hemorragia controlada.',
      },
      {
        pregunta: 'El paciente habla con normalidad y mueve las cuatro extremidades tras un traumatismo cervical. ¿Puedes descartar lesión?',
        opciones: [
          'Sí: la función está conservada.',
          'No: una lesión cervical grave puede empezar así y deteriorarse de forma brusca; se mantiene la vigilancia y la restricción si está indicada.',
          'Sí, si además no le duele el cuello.',
          'Solo si el mecanismo fue penetrante.',
        ],
        correcta: 1,
        explicacion: 'La lección lo enuncia como la paradoja del cuello: la normalidad inicial no garantiza nada.',
      },
      {
        pregunta: '¿Cuál de estos hallazgos apunta a lesión vascular cervical?',
        opciones: [
          'Dolor al tragar.',
          'Hematoma en expansión con frémito palpable y déficit neurológico focal.',
          'Estridor aislado.',
          'Dolor en la línea media posterior.',
        ],
        correcta: 1,
        explicacion: 'Los otros tres orientan a lesión esofágica, de vía aérea y espinal respectivamente.',
      },
    ],
    actividades: {
      preguntas: [
        {
          pregunta: 'Primera valoración a las 03:10: cuello sin hematoma, voz normal. Segunda a las 03:25: cuello más voluminoso y voz apagada. ¿Qué haces con esa comparación?',
          opciones: [
            'La anoto sin más, porque el paciente sigue hablando.',
            'La trato como deterioro: refuerzo la vigilancia de la vía aérea, acelero el traslado y comunico la evolución con las dos horas al centro receptor para que prepare una vía aérea difícil.',
            'Retiro el collarín para explorar mejor el cuello.',
            'Aplico un vendaje circular para contener el hematoma.',
          ],
          correcta: 1,
          explicacion: 'La lección establece que la comparación entre dos exploraciones vale más que cualquier hallazgo aislado y que avisar temprano permite preparar el destino.',
        },
      ],
    },
    revision: ficha({ fuentes: FU, extra: ['El plan repite el título «Exploración física» en varias unidades; esta lección desarrolla exclusivamente la exploración cervical.'] }),
  },

  'm5-tocc-cuello-empalado': {
    icono: 'cp-smart-arterias-cuello',
    duracion: '11 min',
    resumen: 'Un objeto empalado en el cuello suma todos los problemas de la región: puede estar '
      + 'taponando un vaso grande, puede desplazar o abrir la vía aérea y puede moverse con cada gesto '
      + 'del paciente. No se retira, no se moviliza y no se explora su trayecto. La conducta consiste '
      + 'en estabilizarlo tal como está, controlar el sangrado alrededor sin comprimir el cuello, '
      + 'proteger la vía aérea y trasladar avisando antes.',
    objetivos: [
      'Justificar por qué no se retira ni se moviliza un objeto empalado cervical.',
      'Estabilizar el objeto y controlar el sangrado sin comprometer la vía aérea.',
      'Preparar el traslado y la entrega de un paciente con esta lesión.',
    ],
    secciones: [
      {
        titulo: 'Por qué no se toca',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Tres razones simultáneas',
            items: [
              'Puede estar taponando un vaso de gran calibre: retirarlo puede desencadenar una hemorragia que no se controla desde fuera en esta región.',
              'Puede estar atravesando o desplazando la vía aérea: moverlo puede convertir una vía aérea comprometida en una vía aérea perdida.',
              'Su trayecto no es deducible desde fuera, y cualquier movimiento puede ampliar la lesión de estructuras profundas.',
            ],
          },
          { tipo: 'callout', variante: 'alerta', titulo: 'Ni siquiera para movilizar al paciente', texto: 'El objeto no se retira para facilitar la colocación del collarín, del sistema de inmovilización o de la camilla. Si estorba, se adapta el material y la técnica al objeto, no al revés. La restricción del movimiento espinal se aplica con las medidas que sean compatibles, y la decisión se documenta.' },
        ],
      },
      {
        titulo: 'Conducta',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'En la escena',
            items: [
              'Seguridad y protección personal; escena asegurada si el mecanismo fue una agresión.',
              'Evaluar de inmediato la vía aérea y la ventilación: es lo que decide la prioridad.',
              'Estabilizar el objeto en la posición encontrada con apósitos voluminosos alrededor, sin apoyarse sobre el cuello ni sobre el propio objeto.',
              'Controlar el sangrado con presión directa localizada alrededor de la herida, nunca con vendaje circular ni empaquetamiento.',
              'Impedir que el paciente hable en exceso, trague con fuerza o gire la cabeza, explicándole por qué.',
              'Posición conforme al protocolo, teniendo en cuenta el riesgo de entrada de aire por una vena abierta.',
              'Traslado urgente a centro quirúrgico con prealerta explícita: el equipo receptor necesita preparar quirófano y vía aérea difícil.',
            ],
          },
          { tipo: 'callout', variante: 'clave', titulo: 'La única excepción no la decide esta lección', texto: 'Si el objeto impide de forma directa ventilar o reanimar al paciente, la conducta pertenece al protocolo del servicio y a la dirección médica, no a esta página. Fuera de ese supuesto, el objeto se estabiliza y viaja con el paciente.' },
          { tipo: 'p', texto: 'Si el objeto es demasiado largo para el traslado, su acortamiento requiere medios y personal adecuados —habitualmente el servicio de rescate— y se hace estabilizando el objeto para que no vibre ni se desplace durante el corte. Esa maniobra se coordina conforme al procedimiento del servicio y nunca se improvisa.' },
        ],
      },
      F([PHTLS, AHA_PA_2024, WHO_BEC, PROTOCOLO_LOCAL]),
    ],
    conceptosClave: [
      { termino: 'Objeto empalado cervical', definicion: 'Cuerpo extraño que permanece clavado en el cuello; no se retira ni se moviliza en el ámbito prehospitalario.' },
      { termino: 'Estabilización en posición encontrada', definicion: 'Fijación del objeto tal como está, con apósitos voluminosos que impiden su movimiento sin comprimir la región.' },
      { termino: 'Vía aérea difícil', definicion: 'Situación en que asegurar la vía aérea resulta previsiblemente complicado y requiere preparación anticipada en destino.' },
    ],
    flashcards: [
      { frente: 'Tres razones para no retirar un objeto empalado cervical', reverso: 'Puede taponar un vaso, puede estar atravesando la vía aérea y su trayecto no es deducible desde fuera.' },
      { frente: '¿Se retira el objeto para colocar el collarín?', reverso: 'No: se adapta el material y la técnica al objeto, y se documenta la decisión.' },
      { frente: '¿Cómo se controla el sangrado alrededor?', reverso: 'Con presión directa localizada, nunca con vendaje circular ni empaquetamiento.' },
      { frente: '¿Qué se pide al paciente?', reverso: 'Que no hable en exceso, no trague con fuerza y no gire la cabeza, explicándole por qué.' },
      { frente: '¿Quién decide si un objeto se acorta para el traslado?', reverso: 'Se coordina con los medios adecuados conforme al procedimiento del servicio; no se improvisa.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente con un cristal clavado en la cara lateral del cuello, consciente y con sangrado moderado alrededor. ¿Qué haces?',
        opciones: [
          'Retiras el cristal y taponas con gasa hemostática.',
          'Estabilizas el objeto en su posición, controlas el sangrado con presión localizada, vigilas la vía aérea y trasladas con prealerta.',
          'Empaquetas la herida alrededor del objeto.',
          'Colocas un vendaje circular para fijar el cristal.',
        ],
        correcta: 1,
        explicacion: 'Retirar, empaquetar o rodear el cuello son tres conductas contraindicadas en esta región.',
      },
      {
        pregunta: 'El objeto dificulta colocar el collarín cervical. ¿Cómo procedes?',
        opciones: [
          'Retiras el objeto para poder inmovilizar correctamente.',
          'Adaptas el material y la técnica de restricción al objeto, aplicas las medidas compatibles y documentas la decisión.',
          'Renuncias a cualquier medida de restricción espinal.',
          'Cortas el objeto con lo que tengas a mano.',
        ],
        correcta: 1,
        explicacion: 'El objeto no se retira para facilitar la inmovilización; se ajusta la técnica.',
      },
      {
        pregunta: '¿Qué información es imprescindible en la prealerta de este paciente?',
        opciones: [
          'El tipo exacto de objeto y su procedencia.',
          'Que hay un objeto empalado cervical, el estado de la vía aérea y del sangrado, y la evolución, para que preparen quirófano y vía aérea difícil.',
          'Solo la hora de llegada prevista.',
          'La identidad del agresor.',
        ],
        correcta: 1,
        explicacion: 'El equipo receptor necesita tiempo para preparar recursos que no se improvisan.',
      },
    ],
    actividades: {
      completar: [
        {
          texto: 'El objeto empalado se estabiliza en la posición ___ con apósitos voluminosos alrededor.',
          opciones: ['más cómoda', 'encontrada', 'de menor sangrado'],
          correcta: 1,
          explicacion: 'Cualquier cambio de posición puede ampliar la lesión profunda.',
        },
        {
          texto: 'Si el objeto impide ventilar o reanimar, la conducta la decide ___.',
          opciones: ['esta lección', 'el protocolo del servicio y la dirección médica', 'el propio paciente'],
          correcta: 1,
          explicacion: 'La lección declara expresamente que esa excepción no le corresponde.',
        },
        {
          texto: 'El acortamiento de un objeto demasiado largo se coordina con los medios adecuados y ___.',
          opciones: ['se improvisa si urge', 'nunca se improvisa', 'lo hace el paciente'],
          correcta: 1,
          explicacion: 'La vibración o el desplazamiento durante el corte pueden ampliar la lesión.',
        },
      ],
    },
    revision: ficha({
      fuentes: FU,
      extra: ['El plan repite el título «Objeto empalado» en la sección ocular y en la cervical; esta lección desarrolla solo la cervical.'],
    }),
  },
}
