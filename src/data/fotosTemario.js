// ============================================================
//  FOTOGRAFÍAS DE CONTEXTO DEL TEMARIO
// ------------------------------------------------------------
//  El 31 de agosto de 2026 el dueño del producto aportó una carpeta de
//  fotografías de escenas de formación paramédica —prácticas de RCP, aula de
//  anatomía, rescate vehicular, triage— para meterlas en las lecciones.
//
//  QUÉ SON Y QUÉ NO SON, porque de eso depende dónde se pueden poner:
//
//  Son fotografías de CONTEXTO: gente practicando. No son diagramas y no
//  enseñan ninguna estructura concreta. Eso las hace seguras —una foto de un
//  aula no puede equivocarse de anatomía— pero también acota su uso: **no
//  sustituyen a una figura que explique algo**, así que ninguna lleva pie que
//  afirme un dato clínico. El pie describe la escena y nada más.
//
//  Son ADEMÁS generadas con IA, y eso pesa en dos sitios:
//   · Se colocan por lo que la escena SUGIERE (una práctica de RCP en una
//     lección de RCP), nunca por un detalle técnico que habría que verificar.
//     Si hiciera falta enseñar el detalle, hace falta una figura real.
//   · Van declaradas como generadas en `credito`, para que nadie las tome
//     dentro de diez meses por una fotografía documental de la academia.
//
//  POR QUÉ VIVEN AQUÍ Y NO DENTRO DE CADA LECCIÓN. Se inyectan al ensamblar
//  el contenido (`src/data/contenido/index.js`), en un solo sitio, en vez de
//  editar veinte archivos de prosa escritos a mano. Tres razones:
//   · cambiar una foto —o quitarlas todas— es tocar este arreglo y nada más;
//   · la prosa revisada por un docente no se toca para colocar una imagen;
//   · se puede probar de un vistazo que ninguna cae en un tema que no existe.
//
//  Los archivos se generan con `npm run optimizar:fotos` desde
//  `scripts/img-src/temario/`. Ver `posicion` abajo para dónde se inserta.
// ============================================================

/** Carpeta bajo `public/imagenes/` donde viven los archivos optimizados. */
export const CARPETA = 'temario'

/** Anchos generados. Los declara también el script que los produce. */
export const ANCHOS = [480, 800, 1200]

/**
 * Una entrada por fotografía.
 *
 *  · `clave`  — nombre del archivo sin ancho ni extensión.
 *  · `temaId` — dónde se inserta. Tiene que existir Y tener contenido.
 *  · `alt`    — texto alternativo. Describe la ESCENA, no enseña.
 *  · `caption`— pie visible. Misma regla: describe, no afirma.
 *
 * Ninguna entrada apunta a un examen, a una práctica ni a un tema vacío: una
 * lección que solo tuviera una foto no sería una lección.
 */
export const FOTOS = [
  // ---- Módulo 1 · Propedéutico ----
  {
    clave: 'aula-clase-teorica',
    temaId: 'm1-pab-introduccion',
    alt: 'Instructor frente a un grupo de alumnos en un aula de formación en urgencias médicas.',
    caption: 'Formación en primeros auxilios: la teoría precede a la práctica supervisada.',
  },
  {
    clave: 'rcp-dea-maniqui',
    temaId: 'm1-pab-rcp-legos-adulto',
    alt: 'Dos personas practican reanimación cardiopulmonar sobre un maniquí con un desfibrilador externo automático colocado.',
    caption: 'Práctica de RCP con DEA sobre maniquí, con un instructor supervisando.',
  },
  {
    clave: 'botiquin-abierto',
    temaId: 'm1-pab-botiquin',
    alt: 'Mochila de urgencias médicas abierta, con sus compartimentos desplegados y el material ordenado por secciones.',
    caption: 'Mochila de urgencias abierta. El orden por compartimentos es lo que permite encontrar algo bajo presión.',
  },
  {
    clave: 'signos-vitales-ambulancia',
    temaId: 'm1-pai-signos-vitales',
    alt: 'Paramédica toma la presión arterial a una paciente sentada, con el brazalete colocado y un estetoscopio.',
    caption: 'Toma de signos vitales. La cifra vale lo que valga la técnica con que se obtuvo.',
  },
  {
    clave: 'equipo-turno-ambulancia',
    temaId: 'm1-smu-bienestar-tum',
    alt: 'Cuatro tripulantes de ambulancia conversan junto a la unidad abierta, uno de ellos con una tableta.',
    caption: 'El relevo y la revisión de la unidad son parte del turno, no un trámite.',
  },

  // ---- Módulo 2 · Cuerpo humano ----
  {
    clave: 'aula-modelos-celula',
    temaId: 'm2-afe-celula',
    alt: 'Alumnos observan modelos anatómicos de una célula junto a un torso desmontable en un aula.',
    caption: 'Modelos de célula en el aula de anatomía.',
  },
  {
    clave: 'anatomia-torso-esqueleto',
    temaId: 'm2-afi-oseo',
    alt: 'Instructor señala un torso anatómico desmontable junto a un esqueleto articulado y un atlas abierto.',
    caption: 'Torso desmontable y esqueleto articulado: el material con el que se estudia la anatomía.',
  },
  {
    clave: 'microscopio-atlas',
    temaId: 'm2-afi-digestivo',
    alt: 'Alumna observa por un microscopio junto a modelos anatómicos de órganos y un atlas abierto.',
    caption: 'Estudio de órganos con modelos y atlas.',
  },

  // ---- Módulo 3 · Evaluación y soporte vital ----
  {
    clave: 'control-cervical-camilla',
    temaId: 'm3-ep-via-aerea-cervicales',
    alt: 'Dos paramédicos colocan un collarín cervical a un paciente inmovilizado sobre una camilla.',
    caption: 'Control cervical manual y collarín durante la evaluación primaria.',
  },
  {
    clave: 'evaluacion-domicilio',
    temaId: 'm3-es-sample',
    alt: 'Dos paramédicos entrevistan y evalúan a una paciente sentada en la cama de su domicilio.',
    caption: 'La entrevista al paciente es parte de la evaluación, no un trámite previo.',
  },
  {
    clave: 'bvm-oxigeno-maniqui',
    temaId: 'm3-va-dispositivos-o2',
    alt: 'Dos paramédicos ventilan con bolsa-válvula-mascarilla a un maniquí, junto a un tanque de oxígeno y una bandeja con dispositivos de vía aérea.',
    caption: 'Ventilación con bolsa-válvula-mascarilla y material de vía aérea preparado.',
  },
  {
    clave: 'material-esteril-canalizacion',
    temaId: 'm3-vi-canalizacion',
    alt: 'Personal prepara material estéril sobre una bandeja junto a un paciente en camilla.',
    caption: 'Preparación del material antes del procedimiento.',
  },
  {
    clave: 'monitor-desfibrilador-electrodos',
    temaId: 'm3-md-uso-monitor',
    alt: 'Equipo coloca electrodos a un paciente conectado a un monitor desfibrilador mientras otra persona ventila.',
    caption: 'Monitorización durante la reanimación.',
  },

  // ---- Módulo 4 · Urgencias médico-quirúrgicas ----
  {
    clave: 'interior-ambulancia',
    temaId: 'm4-far-nom-034',
    alt: 'Interior de una ambulancia vista desde las puertas traseras, con la camilla, el equipo fijado y los compartimentos.',
    caption: 'Interior de una unidad. La dotación depende del tipo de ambulancia.',
  },
  {
    clave: 'oxigenoterapia-paciente-sentado',
    temaId: 'm4-resp-insuficiencia',
    alt: 'Paciente sentado con mascarilla de oxígeno conectada a un tanque, mientras dos paramédicos lo evalúan y le colocan un oxímetro.',
    caption: 'Paciente con dificultad respiratoria: la posición sentada es parte del manejo.',
  },
  {
    clave: 'ecg-doce-derivaciones',
    temaId: 'm4-card-ecg-basica',
    alt: 'Paramédica coloca los electrodos de un electrocardiograma de doce derivaciones a un paciente en la ambulancia.',
    caption: 'Colocación de un ECG de doce derivaciones a bordo.',
  },

  // ---- Módulo 5 · Trauma ----
  {
    clave: 'estabilizacion-vehicular',
    temaId: 'm5-cin-vehiculo-automotor',
    alt: 'Bomberos estabilizan con calzos de madera un vehículo accidentado antes de trabajar sobre él.',
    caption: 'Estabilización del vehículo: primero la escena, después el paciente.',
  },
  {
    clave: 'torniquete-extremidad',
    temaId: 'm5-hs-torniquete',
    alt: 'Paramédica coloca un torniquete en el muslo de un paciente mientras su compañero registra la hora.',
    caption: 'Colocación de torniquete. La hora de aplicación se registra siempre.',
  },
  {
    clave: 'collarin-camilla-traslado',
    temaId: 'm5-tcc-signos-tratamiento-columna',
    alt: 'Paciente con collarín cervical asegurado con correas sobre una camilla, atendido por dos paramédicos.',
    caption: 'Paciente asegurado para el traslado con sospecha de lesión de columna.',
  },
  {
    clave: 'tabla-espinal-correas',
    temaId: 'm5-tcc-inmovilizacion-espinal',
    alt: 'Tres paramédicos aseguran a un paciente sobre una tabla espinal con correas de colores e inmovilizadores de cabeza.',
    caption: 'Inmovilización sobre tabla espinal con correas e inmovilizadores laterales.',
  },
  {
    clave: 'ferula-extremidad-inferior',
    temaId: 'm5-tme-ferulas-sager-hare',
    alt: 'Dos paramédicos colocan una férula rígida en la pierna de un paciente tendido en el suelo.',
    caption: 'Ferulización de una extremidad inferior.',
  },
  {
    clave: 'manta-termica-exterior',
    temaId: 'm5-la-hipotermia',
    alt: 'Paciente envuelto en una manta térmica en un puesto de atención montado a la intemperie.',
    caption: 'Aislamiento térmico del paciente en atención prehospitalaria a la intemperie.',
  },

  // ---- Módulo 6 · Poblaciones especiales ----
  {
    clave: 'aula-pediatria-triangulo',
    temaId: 'm6-ip-triangulo',
    alt: 'Instructora explica el triángulo de evaluación pediátrica en una pantalla, junto a un maniquí de lactante en una cuna.',
    caption: 'Clase sobre el triángulo de evaluación pediátrica con maniquí de lactante.',
  },
  {
    clave: 'pediatria-ambulancia',
    temaId: 'm6-ip-xabcde',
    alt: 'Dos paramédicos evalúan a un maniquí pediátrico con oxígeno en el interior de una ambulancia.',
    caption: 'Evaluación de un paciente pediátrico a bordo.',
  },
]

/**
 * Fotografías que se recibieron pero NO se colocaron, y por qué.
 *
 * Se declaran para que no se pierdan ni haya que volver a mirarlas una por
 * una: las cuatro son material del Módulo 7, cuyos cuatro temas siguen sin
 * desarrollo (`CLAUDE.md` §11 lo mantiene bloqueado a la espera de que la
 * academia defina su alcance). Meter una foto en una lección vacía crearía una
 * lección que es solo una foto.
 */
export const RESERVADAS = [
  { clave: 'rescate-vehicular-extricacion', motivo: 'm7-acceso-extraccion-unico está sin desarrollo' },
  { clave: 'traslado-monitorizado', motivo: 'm7-operaciones-ambulancias-unico está sin desarrollo' },
  { clave: 'rescate-cuerdas-camilla', motivo: 'm7-operaciones-especiales-unico está bloqueado por decisión' },
  { clave: 'triage-multiples-victimas', motivo: 'm7-triage-unico está sin desarrollo' },
]

/** Crédito común. Se pinta como fuente del bloque. */
export const CREDITO = 'Imagen generada con IA para PTEM · escena ilustrativa'

/**
 * Bloque de contenido para una foto, con la forma que valida
 * `temaContenidoModelo.js`.
 *
 * El `src` apunta al ancho intermedio; `Contenido.jsx` deriva de esa ruta el
 * juego responsivo completo (ver el comentario de su `case 'imagen'`).
 */
export function bloqueDeFoto(foto) {
  return {
    tipo: 'imagen',
    src: `imagenes/${CARPETA}/${foto.clave}-800.webp`,
    alt: foto.alt,
    caption: foto.caption,
    fuente: CREDITO,
    ratio: '16 / 10',
  }
}

/**
 * Inserta cada foto al final de la PRIMERA sección de su tema.
 *
 * Al final y no al principio: la primera sección suele abrir con la definición,
 * y una foto entre el título y la definición empuja fuera de pantalla lo único
 * que el alumno vino a leer.
 *
 * No muta nada: devuelve un contenido nuevo. Si el tema no existe, no tiene
 * secciones o ya trae una imagen, se omite y se informa — así una foto mal
 * dirigida no desaparece en silencio.
 */
export function aplicarFotos(contenido, fotos = FOTOS) {
  const salida = { ...contenido }
  const omitidas = []
  for (const foto of fotos) {
    const tema = salida[foto.temaId]
    if (!tema || !Array.isArray(tema.secciones) || tema.secciones.length === 0) {
      omitidas.push({ ...foto, motivo: 'el tema no existe o no tiene secciones' })
      continue
    }
    const yaTiene = tema.secciones.some((s) => (s.bloques || []).some((b) => b.tipo === 'imagen'))
    if (yaTiene) {
      omitidas.push({ ...foto, motivo: 'el tema ya tiene una imagen' })
      continue
    }
    const secciones = tema.secciones.map((s, i) =>
      i === 0 ? { ...s, bloques: [...(s.bloques || []), bloqueDeFoto(foto)] } : s
    )
    salida[foto.temaId] = { ...tema, secciones }
  }
  return { contenido: salida, omitidas }
}
