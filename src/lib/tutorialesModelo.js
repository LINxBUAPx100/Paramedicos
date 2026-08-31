// ============================================================
//  TUTORIALES de primera vez — catálogo y reglas
// ------------------------------------------------------------
//  Cada pantalla se explica sola la PRIMERA vez que un usuario la abre, y solo
//  esa vez en toda la vida de su cuenta. Después no vuelve a aparecer nunca
//  por su cuenta: quien quiera repetirlo lo pide desde su cuenta.
//
//  DÓNDE NO APARECE, y es deliberado:
//
//   · En las páginas de TEMA (`/tema/...`, su quiz y su examen). Ahí el
//     usuario viene a leer una lección, y un tutorial encima de material
//     clínico interrumpe justo el momento que la plataforma existe para
//     proteger. Lo pidió así el dueño del producto y la regla se comprueba en
//     `tests/tutorialesModelo.test.mjs`.
//   · En las portadas PÚBLICAS (`/`, `/paramedicos`, las vitrinas de carrera,
//     créditos y términos). Quien las ve todavía no está usando la
//     plataforma: está decidiendo si entra. La raíz SÍ lleva tutorial cuando
//     hay sesión, porque entonces ya no es una portada sino el Home.
//
//  UN PASO SIN ANCLA SIGUE SIRVIENDO. `objetivo` es un selector CSS opcional:
//  si el elemento existe, el paso lo ilumina; si no —porque el rol del usuario
//  no lo ve, porque la lista está vacía o porque alguien renombró una clase—,
//  el paso se enseña centrado en vez de romperse. Un tutorial nunca puede
//  dejar una pantalla inutilizable.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// ------------------------------------------------------------
//  Rutas que NUNCA llevan tutorial
// ------------------------------------------------------------
//  Se comprueban antes que nada. Van como prefijos porque las páginas de tema
//  cuelgan de `/tema/:id` con sus subrutas (`/quiz`, `/examen`).
export const RUTAS_SIN_TUTORIAL = ['/tema/']

// Portadas públicas y páginas legales. Se listan exactas, no por prefijo.
export const RUTAS_PUBLICAS = [
  '/paramedicos', '/enfermeria', '/tsu-paramedico', '/licenciatura-paramedico',
  '/proteccion-civil', '/cursos', '/creditos', '/terminos-y-condiciones',
]

// ------------------------------------------------------------
//  El catálogo
// ------------------------------------------------------------
export const TUTORIALES = {
  home: {
    titulo: 'Tu punto de partida',
    pasos: [
      {
        texto: 'Ésta es tu pantalla de inicio. Desde aquí sigues el recorrido de estudio '
          + 'y ves por dónde vas. Te enseño lo básico en tres pasos; solo aparece esta vez.',
      },
      {
        objetivo: '.menu-btn',
        titulo: 'El recorrido completo',
        texto: 'Este botón abre el temario entero: los módulos que tu academia te ha '
          + 'abierto y los temas de cada uno. Es la forma más rápida de saltar a una lección.',
      },
      {
        objetivo: '.topbar-buscar',
        titulo: 'Buscar sin navegar',
        texto: 'Si ya sabes qué necesitas, escríbelo aquí. Busca dentro de las lecciones, '
          + 'no solo en los títulos.',
      },
      {
        objetivo: '.topnav',
        titulo: 'Lo que usarás a diario',
        texto: 'Examen, progreso y logros, siempre a mano. Cada uno tendrá su propia '
          + 'explicación la primera vez que entres.',
      },
    ],
  },

  modulo: {
    titulo: 'Un módulo por dentro',
    pasos: [
      {
        texto: 'Un módulo agrupa las unidades y los temas de una etapa del plan de '
          + 'estudios. Aquí ves de qué trata y qué lo compone.',
      },
      {
        titulo: 'Temas, exámenes y prácticas',
        texto: 'No todo lo que aparece es una lección: un módulo también incluye sus '
          + 'exámenes y sus prácticas. Los exámenes solo toman preguntas de los temas '
          + 'que ya cubriste antes de ese punto.',
      },
      {
        titulo: 'Lo que aún no está',
        texto: 'Si un tema dice «contenido en revisión» o «aún no disponible», es cierto '
          + 'y está dicho a propósito: la plataforma no te enseña material sin firmar '
          + 'como si estuviera aprobado.',
      },
    ],
  },

  progreso: {
    titulo: 'Cómo se mide tu avance',
    pasos: [
      {
        texto: 'Aquí ves cuánto llevas estudiado, módulo por módulo.',
      },
      {
        // El ancla existe para el ALUMNO. El staff ve otra pantalla —con
        // pestañas, y la barra dentro de «Mi progreso»—, así que el paso sale
        // centrado para ellos. Por eso el texto no dice «esta barra»: tenía que
        // leerse igual de bien con foco y sin él.
        objetivo: '.barra-global',
        titulo: 'Tu avance total',
        texto: 'Un porcentaje resume todo el recorrido. Sube cuando terminas de leer un '
          + 'tema y cuando resuelves su repaso.',
      },
      {
        titulo: 'Módulo por módulo',
        texto: 'Debajo se desglosa por módulo, para que veas dónde te falta trabajo en vez '
          + 'de solo un número general.',
      },
    ],
  },

  buscar: {
    titulo: 'Buscar en el temario',
    pasos: [
      {
        texto: 'La búsqueda entra en el texto de las lecciones, no solo en los títulos: '
          + 'si recuerdas una frase o un concepto, con eso basta.',
      },
      {
        titulo: 'Qué te devuelve',
        texto: 'Cada resultado te dice a qué módulo y a qué tema pertenece, para que sepas '
          + 'dónde encaja lo que encontraste antes de abrirlo.',
      },
    ],
  },

  flashcards: {
    titulo: 'Repaso con tarjetas',
    pasos: [
      {
        texto: 'Las tarjetas son para repasar rápido lo que ya leíste. Se muestra una '
          + 'pregunta, la respondes de memoria y luego la giras para comprobar.',
      },
      {
        titulo: 'Sé honesto al girarla',
        texto: 'Contesta antes de girar. Girar primero y decir «me la sabía» es la forma '
          + 'más común de estudiar mucho y aprender poco.',
      },
    ],
  },

  examen: {
    titulo: 'Cómo funcionan los exámenes',
    pasos: [
      {
        texto: 'Un examen toma preguntas de los temas que ya cubriste. Nunca te pregunta '
          + 'algo que no esté enseñado en el material de su alcance.',
      },
      {
        titulo: 'Puedes repetirlo',
        texto: 'Se guardan tus intentos y tu mejor resultado. Repetir un examen sirve, '
          + 'porque las preguntas se barajan.',
      },
      {
        titulo: 'Lo que ve tu maestro',
        texto: 'Tus resultados son visibles para el cuerpo docente de tu academia. Es '
          + 'justo lo que les permite ayudarte a tiempo si algo se te está atorando.',
      },
    ],
  },

  logros: {
    titulo: 'Logros y atlas',
    pasos: [
      {
        texto: 'Aquí se reúne lo que vas desbloqueando conforme avanzas en el recorrido.',
      },
      {
        // UNA tarjeta, no la rejilla. `.atlas-grid` mide casi 39 000 px de alto
        // (medido el 31-08-2026): iluminarla sería iluminar la página entera y
        // el foco perdería todo su sentido. Se apunta a la primera tarjeta, que
        // es la que explica el concepto.
        objetivo: '.atlas-card',
        titulo: 'Se abre estudiando',
        texto: 'Cada pieza se desbloquea al avanzar en los temas que le corresponden. '
          + 'Lo que sigue con candado todavía no lo has alcanzado, y no hay atajo.',
      },
    ],
  },

  cuenta: {
    titulo: 'Tu cuenta',
    pasos: [
      {
        texto: 'Desde aquí gestionas tus datos, tu acceso y tu relación con la academia.',
      },
      {
        titulo: 'Códigos de acceso',
        texto: 'Si tu academia te da un código —de inscripción, de grupo o de prueba—, '
          + 'se canjea en esta pantalla.',
      },
      {
        titulo: 'Repetir un tutorial',
        texto: 'Aquí abajo puedes volver a ver las explicaciones de cualquier pantalla si '
          + 'alguna se te pasó. No vuelven a salir solas.',
      },
    ],
  },

  temario: {
    titulo: 'Visibilidad del temario',
    pasos: [
      {
        texto: 'Esta pantalla es del cuerpo docente. Decide qué partes del plan ve cada '
          + 'grupo y cuándo.',
      },
      {
        titulo: 'Abrir a su ritmo',
        texto: 'Lo que ocultes aquí desaparece del recorrido del alumno, pero no se borra: '
          + 'sigue en el plan y se puede abrir cuando el grupo llegue.',
      },
    ],
  },

  // ---------- Consola de la academia ----------
  'panel-resumen': {
    titulo: 'El panel de tu academia',
    pasos: [
      {
        texto: 'Desde aquí gestionas tu academia: quién entra, en qué grupo está y cómo va.',
      },
      {
        objetivo: '.consola-nav',
        titulo: 'Las secciones',
        texto: 'Cada sección hace una cosa. Te explicaré cada una la primera vez que la abras.',
      },
      {
        titulo: 'Lo que necesita tu atención',
        texto: 'El resumen levanta la mano cuando algo requiere que actúes: solicitudes '
          + 'pendientes, alumnos sin grupo o material esperando revisión.',
      },
    ],
  },

  'panel-miembros': {
    titulo: 'Miembros',
    pasos: [
      {
        texto: 'Todos los que pertenecen a tu academia: alumnos, profesores y dirección.',
      },
      {
        titulo: 'Cambiar rol y grupo',
        texto: 'Desde aquí asignas el grupo de un alumno y el rol de tu personal. Un alumno '
          + 'pertenece a un solo grupo; un profesor puede llevar varios.',
      },
      {
        titulo: 'Suspender un acceso',
        texto: 'Suspender no borra a nadie: le corta el acceso y conserva su historial. '
          + 'Es reversible.',
      },
    ],
  },

  'panel-grupos': {
    titulo: 'Grupos',
    pasos: [
      {
        texto: 'Un grupo es una generación con su propio plan de estudios y su propio ritmo.',
      },
      {
        titulo: 'El grupo decide qué se ve',
        texto: 'El plan de estudios va en el grupo, no en el alumno. Por eso un alumno sin '
          + 'grupo no ve temario: no es un fallo, es que todavía no tiene plan asignado.',
      },
    ],
  },

  'panel-invitaciones': {
    titulo: 'Invitaciones',
    pasos: [
      {
        texto: 'Una invitación da de alta a alguien con un rol concreto, sin que tengas que '
          + 'cambiárselo después a mano.',
      },
      {
        titulo: 'Se usa una sola vez',
        texto: 'Cada invitación se canjea una vez y queda registrada: sabrás quién la usó '
          + 'y cuándo.',
      },
    ],
  },

  'panel-accesos': {
    titulo: 'Códigos de acceso',
    pasos: [
      {
        texto: 'Los códigos son la vía normal de entrada de un alumno: se los das al '
          + 'inscribirse y con eso crean su cuenta.',
      },
      {
        titulo: 'Códigos de prueba',
        texto: 'Un código de prueba caduca solo. Sirve para que alguien conozca la '
          + 'plataforma sin darle acceso permanente.',
      },
    ],
  },

  'panel-calificaciones': {
    titulo: 'Calificaciones',
    pasos: [
      {
        texto: 'Los resultados de tus grupos, por alumno y por evaluación.',
      },
      {
        titulo: 'Para actuar, no para archivar',
        texto: 'Lo útil aquí no es la lista sino quién se está quedando atrás. Esa es la '
          + 'pregunta que esta pantalla existe para responder.',
      },
    ],
  },

  'panel-contenido': {
    titulo: 'Revisión del contenido',
    pasos: [
      {
        texto: 'Aquí el cuerpo docente revisa y firma el material antes de que llegue al '
          + 'alumno como definitivo.',
      },
      {
        titulo: 'Validar es firmar',
        texto: 'Cuando validas un tema, tu nombre queda asociado a él. A partir de esa '
          + 'firma el alumno deja de ver el aviso de «contenido en revisión» y el tema '
          + 'entra en el banco de examen de su unidad.',
      },
      {
        titulo: 'Solo lo firmado se examina',
        texto: 'Un tema en borrador o en revisión no aporta preguntas a ningún examen. '
          + 'Validar es lo que lo hace examinable.',
      },
    ],
  },

  'panel-academia': {
    titulo: 'Mi academia',
    pasos: [
      {
        texto: 'Los datos de tu academia y su personalización: nombre, identidad visual y '
          + 'qué secciones ven tus miembros al entrar.',
      },
    ],
  },

  // ---------- Consola de la plataforma ----------
  'admin-resumen': {
    titulo: 'Consola de la plataforma',
    pasos: [
      {
        texto: 'Esta consola gestiona PTEM entero, no una academia. Lo que cambies aquí '
          + 'puede afectar a todas.',
      },
      {
        objetivo: '.consola-nav',
        titulo: 'Las secciones',
        texto: 'Academias, usuarios, contenido, facturación, incidencias y registro. Cada '
          + 'una se explica sola la primera vez.',
      },
    ],
  },

  'admin-academias': {
    titulo: 'Academias',
    pasos: [
      {
        texto: 'Todas las academias de la plataforma, su plan y su estado.',
      },
      {
        titulo: 'El estado corta el acceso',
        texto: 'Suspender una academia deja a todos sus miembros sin contenido. Es la '
          + 'acción de mayor alcance de la consola.',
      },
    ],
  },

  'admin-usuarios': {
    titulo: 'Usuarios',
    pasos: [
      {
        texto: 'Búsqueda de cualquier usuario de la plataforma, sea de la academia que sea.',
      },
    ],
  },

  'admin-contenido': {
    titulo: 'Contenido y replicación',
    pasos: [
      {
        texto: 'Desde aquí se administran las plantillas de temario y se replican a las '
          + 'academias.',
      },
      {
        titulo: 'Mira de quién es el material',
        texto: 'Cada tema declara su propietario. El material de una academia no se replica '
          + 'a otra: solo el de la plataforma es reutilizable.',
      },
    ],
  },

  'admin-facturacion': {
    titulo: 'Facturación',
    pasos: [
      { texto: 'El estado comercial de cada academia y su plan contratado.' },
    ],
  },

  'admin-incidencias': {
    titulo: 'Incidencias',
    pasos: [
      {
        texto: 'Lo que los usuarios reportan desde la plataforma llega aquí, con el contexto '
          + 'de dónde ocurrió.',
      },
    ],
  },

  'admin-logs': {
    titulo: 'Registro de actividad',
    pasos: [
      {
        texto: 'Las acciones sensibles quedan registradas: quién las hizo y cuándo. Es la '
          + 'traza que permite responder «¿quién cambió esto?».',
      },
    ],
  },

  editor: {
    titulo: 'Editor de contenido',
    pasos: [
      {
        texto: 'Aquí se redacta y se corrige el material que estudian los alumnos.',
      },
      {
        titulo: 'Nada se publica solo',
        texto: 'Lo que guardes queda como borrador. Para que llegue al alumno como material '
          + 'aprobado hace falta la firma de un docente autorizado.',
      },
      {
        titulo: 'Las fuentes no son opcional',
        texto: 'Un tema no puede validarse sin al menos una fuente trazable. Es la barrera '
          + 'que impide que una afirmación clínica llegue sin respaldo.',
      },
    ],
  },
}

// ------------------------------------------------------------
//  De una ruta a su tutorial
// ------------------------------------------------------------

// Se resuelven en ORDEN: la primera que coincide manda. Por eso las rutas más
// específicas van antes que sus prefijos (`/panel/miembros` antes que `/panel`).
const RUTAS = [
  ['/panel/miembros', 'panel-miembros'],
  ['/panel/grupos', 'panel-grupos'],
  ['/panel/invitaciones', 'panel-invitaciones'],
  ['/panel/accesos', 'panel-accesos'],
  ['/panel/calificaciones', 'panel-calificaciones'],
  ['/panel/contenido', 'panel-contenido'],
  ['/panel/academia', 'panel-academia'],
  ['/panel', 'panel-resumen'],
  ['/admin/academias', 'admin-academias'],
  ['/admin/usuarios', 'admin-usuarios'],
  ['/admin/contenido', 'admin-contenido'],
  ['/admin/facturacion', 'admin-facturacion'],
  ['/admin/incidencias', 'admin-incidencias'],
  ['/admin/logs', 'admin-logs'],
  ['/admin', 'admin-resumen'],
  ['/editor', 'editor'],
  ['/modulo/', 'modulo'],
  ['/temario', 'temario'],
  ['/progreso', 'progreso'],
  ['/buscar', 'buscar'],
  ['/flashcards', 'flashcards'],
  ['/examen', 'examen'],
  ['/logros', 'logros'],
  ['/cuenta', 'cuenta'],
]

/**
 * Clave del tutorial que corresponde a una ruta, o null si no lleva.
 *
 * `autenticado` importa solo en la raíz: sin sesión es la portada pública de
 * PTEM (no lleva tutorial); con sesión es el Home (sí lo lleva).
 */
export function claveDeRuta(pathname, { autenticado = false } = {}) {
  const ruta = String(pathname || '')
  if (RUTAS_SIN_TUTORIAL.some((p) => ruta.startsWith(p))) return null
  if (RUTAS_PUBLICAS.includes(ruta)) return null
  if (ruta === '/' || ruta === '') return autenticado ? 'home' : null
  const encontrada = RUTAS.find(([prefijo]) => ruta === prefijo || ruta.startsWith(`${prefijo}/`)
    || (prefijo.endsWith('/') && ruta.startsWith(prefijo)))
  return encontrada ? encontrada[1] : null
}

// Los ÚNICOS que se explican sin haber entrado. «Tu cuenta» es la pantalla
// donde se canjea el código, así que quien llega sin sesión está justamente ahí
// para usarla: explicarla es útil. Todo lo demás exige acceso.
export const TUTORIALES_PUBLICOS = ['cuenta']

export function tutorialDe(clave) {
  return TUTORIALES[clave] || null
}

export function existeTutorial(clave) {
  return Object.prototype.hasOwnProperty.call(TUTORIALES, clave)
}

export const CLAVES_TUTORIAL = Object.keys(TUTORIALES)

/**
 * ¿Debe lanzarse solo el tutorial de esta ruta?
 *
 * Solo si la ruta tiene uno, existe en el catálogo y el usuario no lo ha visto.
 * Una sola función para que la respuesta no se calcule de dos maneras
 * distintas en el componente y en las pruebas.
 */
export function tutorialPendiente(pathname, vistos, opciones = {}) {
  const clave = claveDeRuta(pathname, opciones)
  if (!clave || !existeTutorial(clave)) return null
  // Sin acceso NO se explica una pantalla que no se está viendo. Quien llega a
  // /temario sin sesión ve el muro de «No has iniciado sesión»; lanzarle encima
  // el tutorial de visibilidad del temario es explicarle una herramienta del
  // cuerpo docente y, de paso, contarle qué hay dentro.
  const { puedeAcceder = true } = opciones
  if (!puedeAcceder && !TUTORIALES_PUBLICOS.includes(clave)) return null
  if (vistos && vistos[clave]) return null
  return clave
}

/** Normaliza el mapa leído de Firestore o de localStorage. Nunca lanza. */
export function normalizarVistos(bruto) {
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return {}
  const salida = {}
  for (const [clave, valor] of Object.entries(bruto)) {
    if (existeTutorial(clave) && valor) salida[clave] = true
  }
  return salida
}

/** Cuántos ha visto ya, de los que existen. Lo usa la pantalla de cuenta. */
export function conteoDeVistos(vistos) {
  const limpio = normalizarVistos(vistos)
  return { vistos: Object.keys(limpio).length, total: CLAVES_TUTORIAL.length }
}
