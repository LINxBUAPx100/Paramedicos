// ============================================================
//  Programas de estudio — lógica PURA
// ------------------------------------------------------------
//  La academia dejó de impartir una sola carrera. Un PROGRAMA es una carrera,
//  un curso o una certificación completa: es el doc `cursos` de siempre, ahora
//  con un TIPO que dice de qué clase de estudio se trata.
//
//  Jerarquía: Programa → Módulo → Unidad → Tema
//    Programa  doc `cursos`
//    Módulo    "MÓDULO 1: PROPEDÉUTICO" del plan oficial (antes «fase»)
//    Unidad    la fila TEMA del plan; agrupa y lleva semanas/horas oficiales.
//              NO es estudiable: no tiene página, ni quiz, ni progreso.
//    Tema      la viñeta SUBTEMAS del plan. ES la unidad estudiable: URL,
//              quiz, flashcards, progreso e intento de examen.
//
//  El nivel Unidad no es nuevo: ocupa el hueco del `modulos[]` IMPLÍCITO que
//  la migración ya creaba (contenidoModelo.js). Por eso `normalizarEstructura`
//  acepta las dos formas y no hace falta migrar ningún documento.
//
//  Módulo PURO (sin Firebase, sin React): se prueba con `npm test`.
// ============================================================

/**
 * @typedef {'tum'|'enfermeria'|'tsu'|'licenciatura'|'curso'|'certificacion'} TipoPrograma
 * @typedef {'borrador'|'publicado'|'archivado'} EstadoNodo
 * @typedef {'contenido'|'examen'|'practica'} TipoTema
 *
 * @typedef {Object} TemaEstr
 * @property {string} id
 * @property {string} titulo
 * @property {EstadoNodo} estado
 * @property {string|null} [grupo]   Agrupador del plan ("Métodos mecánicos").
 * @property {number|null} [sesion]  Sesión/día dentro de la unidad.
 *
 * @typedef {Object} UnidadEstr
 * @property {string} id
 * @property {string} titulo
 * @property {EstadoNodo} estado
 * @property {TipoTema} [tipo]
 * @property {number} [semanas]
 * @property {number} [horas]
 * @property {boolean} [opcional]
 * @property {string[]} [grupos]
 * @property {boolean} [implicito]  true = envoltorio creado por la migración.
 * @property {TemaEstr[]} temas
 *
 * @typedef {Object} ModuloEstr
 * @property {string} id
 * @property {string} titulo
 * @property {string} subtitulo
 * @property {string} descripcion
 * @property {string} color
 * @property {string} icono
 * @property {EstadoNodo} estado
 * @property {{semanas:number,horas:number}} [totales]
 * @property {UnidadEstr[]} unidades
 */

export const TIPOS_PROGRAMA = [
  'tum', 'enfermeria', 'tsu', 'licenciatura', 'proteccion_civil',
  'curso', 'certificacion',
]

// Metadatos de cada tipo. Añadir un tipo = una entrada aquí y nada más:
// los componentes leen SIEMPRE de este catálogo (mismo patrón que
// capacidades.js). Prohibido escribir `tipoPrograma === 'tum'` por ahí suelto.
export const META_PROGRAMA = {
  tum: {
    id: 'tum',
    etiqueta: 'Técnico en Urgencias Médicas (TUM/TEM)',
    etiquetaCorta: 'TUM/TEM',
    esCarrera: true,
    certificable: true,
    color: '#ef4444',
    icono: 'ambulancia',
  },
  enfermeria: {
    id: 'enfermeria',
    etiqueta: 'Enfermería',
    etiquetaCorta: 'Enfermería',
    esCarrera: true,
    certificable: true,
    color: '#10b981',
    icono: 'corazon',
  },
  tsu: {
    id: 'tsu',
    etiqueta: 'Técnico Superior Universitario',
    etiquetaCorta: 'TSU',
    esCarrera: true,
    certificable: true,
    color: '#0ea5e9',
    icono: 'birrete',
  },
  licenciatura: {
    id: 'licenciatura',
    etiqueta: 'Licenciatura en Paramédicos',
    etiquetaCorta: 'Licenciatura',
    esCarrera: true,
    certificable: true,
    color: '#8b5cf6',
    icono: 'birrete',
  },
  // Protección Civil nació como `licenciatura` en los programas de andamio
  // (Fase 3), que ya avisaba de que tendría tipo propio en cuanto hiciera
  // falta. Hace falta ahora: la portada pública lista las carreras desde este
  // catálogo, y presentarla como «Licenciatura en Paramédicos» sería mentir
  // sobre lo que la academia ofrece.
  proteccion_civil: {
    id: 'proteccion_civil',
    etiqueta: 'Protección Civil',
    etiquetaCorta: 'Protección Civil',
    esCarrera: true,
    certificable: true,
    color: '#f97316',
    icono: 'alerta',
  },
  curso: {
    id: 'curso',
    etiqueta: 'Curso o taller',
    etiquetaCorta: 'Curso',
    esCarrera: false,
    certificable: false,
    color: '#f59e0b',
    icono: 'libro',
  },
  certificacion: {
    id: 'certificacion',
    etiqueta: 'Certificación',
    etiquetaCorta: 'Certificación',
    esCarrera: false,
    certificable: true,
    color: '#db2777',
    icono: 'medalla',
  },
}

// Tipo por defecto de un programa sin campo: los cursos clonados antes de esta
// fase son el temario de paramédico. Nunca devuelve null: un programa sin tipo
// reconocible se comporta como TUM, que es lo que la academia ya tenía.
export const TIPO_PROGRAMA_DEFECTO = 'tum'

export function tipoProgramaDe(programa) {
  const t = programa?.tipoPrograma
  return TIPOS_PROGRAMA.includes(t) ? t : TIPO_PROGRAMA_DEFECTO
}

export function metaDePrograma(programa) {
  return META_PROGRAMA[tipoProgramaDe(programa)]
}

export function etiquetaTipoPrograma(tipo) {
  return META_PROGRAMA[tipo]?.etiqueta || META_PROGRAMA[TIPO_PROGRAMA_DEFECTO].etiqueta
}

// Devuelve un mensaje de error, o null si el tipo es válido.
export function validarTipoPrograma(tipo) {
  if (!TIPOS_PROGRAMA.includes(tipo)) {
    return `Tipo de programa inválido: usa ${TIPOS_PROGRAMA.join(', ')}.`
  }
  return null
}

// ---------- normalización de la estructura ----------

const ESTADOS = ['borrador', 'publicado', 'archivado']
const estadoDe = (n) => (ESTADOS.includes(n?.estado) ? n.estado : 'publicado')

function normalizarTema(t) {
  const out = {
    id: t.id,
    titulo: t.titulo || '',
    estado: estadoDe(t),
    grupo: t.grupo ?? null,
    sesion: t.sesion ?? null,
  }
  if (t.orden != null) out.orden = t.orden
  return out
}

function normalizarUnidad(u) {
  const out = {
    id: u.id,
    titulo: u.titulo || '',
    estado: estadoDe(u),
    temas: (u.temas || []).filter((t) => t?.id).map(normalizarTema),
  }
  if (u.implicito) out.implicito = true
  if (u.tipo) out.tipo = u.tipo
  if (u.numeroOficial != null) out.numeroOficial = u.numeroOficial
  if (Array.isArray(u.sesiones) && u.sesiones.length) out.sesiones = u.sesiones.map((s) => ({ ...s }))
  if (u.semanas != null) out.semanas = u.semanas
  if (u.horas != null) out.horas = u.horas
  if (u.opcional) out.opcional = true
  if (Array.isArray(u.grupos) && u.grupos.length) out.grupos = [...u.grupos]
  return out
}

// Envoltorio para los temas que cuelgan directamente de un módulo (formato aún
// más viejo, o un módulo creado a mano). Mismo id 'principal' que usaba la
// migración, así que un curso migrado y uno normalizado coinciden.
function unidadImplicita(temas) {
  return {
    id: 'principal',
    titulo: 'Contenido',
    implicito: true,
    estado: 'publicado',
    temas: temas.filter((t) => t?.id).map(normalizarTema),
  }
}

/**
 * Estructura de un programa en la forma NUEVA, acepte lo que acepte de entrada.
 *
 * Tres formatos conviven y ninguno exige migrar documentos:
 *   1. `{ unidades: [...] }`  → formato nuevo, se usa tal cual.
 *   2. `{ modulos: [...] }`   → el `modulos[]` implícito de la migración
 *                               (contenidoModelo.js) pasa a `unidades[]`.
 *   3. `{ temas: [...] }`     → temas colgando del módulo: se envuelven en una
 *                               unidad implícita.
 *
 * *Fail-open* deliberado, igual que homeModelo.js: una entrada corrupta
 * devuelve una lista vacía en vez de reventar la página del alumno.
 *
 * @param {any} estructura
 * @returns {ModuloEstr[]}
 */
export function normalizarEstructura(estructura) {
  if (!Array.isArray(estructura)) return []
  return estructura
    .filter((m) => m && m.id)
    .map((m) => {
      const crudas = Array.isArray(m.unidades) ? m.unidades
        : Array.isArray(m.modulos) ? m.modulos
        : null
      const unidades = crudas
        ? crudas.filter((u) => u && u.id).map(normalizarUnidad)
        : Array.isArray(m.temas) && m.temas.length ? [unidadImplicita(m.temas)]
        : []
      const out = {
        id: m.id,
        titulo: m.titulo || '',
        subtitulo: m.subtitulo || '',
        descripcion: m.descripcion || '',
        color: m.color || '',
        icono: m.icono || '',
        estado: estadoDe(m),
        unidades,
      }
      if (m.totales) out.totales = { ...m.totales }
      if (m.encabezadoOficial) out.encabezadoOficial = m.encabezadoOficial
      if (m.numeroOficial != null) out.numeroOficial = m.numeroOficial
      return out
    })
}

// ¿La estructura trae unidades REALES (no solo envoltorios implícitos)?
// Lo consulta la UI para decidir si pinta el nivel intermedio: un temario
// migrado del bundle legacy no tiene unidades que enseñar, y sacar un
// acordeón «Contenido» con un solo hijo sería ruido.
export function tieneUnidadesReales(estructura) {
  return normalizarEstructura(estructura).some(
    (m) => m.unidades.some((u) => !u.implicito)
  )
}

// Conteos de un programa, para paneles y avisos ("7 módulos · 56 unidades ·
// 287 temas"). Cuenta SOLO lo publicado salvo que se pidan los borradores.
export function conteosDePrograma(estructura, { incluirBorradores = false } = {}) {
  const visible = (n) => incluirBorradores || n.estado === 'publicado'
  const modulos = normalizarEstructura(estructura).filter(visible)
  let unidades = 0
  let temas = 0
  let semanas = 0
  let horas = 0
  for (const m of modulos) {
    for (const u of m.unidades.filter(visible)) {
      if (!u.implicito) unidades++
      temas += u.temas.filter(visible).length
      semanas += u.semanas || 0
      horas += u.horas || 0
    }
  }
  return { modulos: modulos.length, unidades, temas, semanas, horas }
}

// ---------- ORDEN DEL MATERIAL ----------
//
//  Todo el material va EN EL ORDEN QUE DICTA EL PLAN. El orden es el de la
//  estructura (módulos → unidades → temas), y dentro de cada tema el de sus
//  propias listas. Igual que en el resto del repo: «id estable + campo orden»,
//  nunca el orden de llegada de Firestore.

// Lista PLANA de los temas en el orden exacto del plan, cada uno con su
// ubicación y su posición global. Es la base de la navegación
// anterior/siguiente y del alcance de los exámenes.
export function temasEnOrden(estructura, { incluirBorradores = false } = {}) {
  const visible = (n) => incluirBorradores || n.estado === 'publicado'
  const salida = []
  for (const m of normalizarEstructura(estructura).filter(visible)) {
    for (const u of m.unidades.filter(visible)) {
      for (const t of u.temas.filter(visible)) {
        salida.push({
          ...t,
          moduloId: m.id,
          moduloTitulo: m.titulo,
          unidadId: u.id,
          unidadTitulo: u.titulo,
          unidadTipo: u.tipo || 'contenido',
          posicion: salida.length + 1,
        })
      }
    }
  }
  return salida
}

export function esUnidadExamen(unidad) {
  return (unidad?.tipo || 'contenido') === 'examen'
}

// ¿Es un examen FINAL (cubre el módulo entero) o un parcial (cubre solo lo
// visto desde el examen anterior)? El plan lo dice en el título: «EXAMEN FINAL
// Y ENTREGA DE CALIFICACIONES» frente a «1er EXAMEN» / «1er PARCIAL».
function esExamenFinal(unidad) {
  return /\bfinal\b/i.test(unidad?.titulo || '')
}

/**
 * Temas que ENTRAN en un examen, según su posición en el plan.
 *
 * Hasta ahora el examen de un módulo se derivaba del quiz de TODOS sus temas.
 * Con el plan oficial eso deja de ser correcto: el Módulo 2 tiene un examen
 * después de la unidad 1, otro después de la 3 y el final al cerrar; el
 * Módulo 4 tiene un parcial a media carrera. Un parcial que preguntara temas
 * que el grupo aún no ha visto sería, sencillamente, un examen mal armado.
 *
 * Regla (la del propio plan, y ajustable por la academia desde el editor):
 *   · examen FINAL   → todos los temas de contenido del módulo.
 *   · examen parcial → los temas desde el examen anterior hasta este.
 * Las unidades de examen y de práctica nunca aportan temas al examen.
 *
 * @returns {{unidadId:string, esFinal:boolean, temas:object[]}|null}
 */
export function alcanceDeExamen(estructura, unidadExamenId, opciones = {}) {
  const modulos = normalizarEstructura(estructura)
  for (const m of modulos) {
    const i = m.unidades.findIndex((u) => u.id === unidadExamenId)
    if (i < 0) continue
    const unidad = m.unidades[i]
    if (!esUnidadExamen(unidad)) return null
    const final = esExamenFinal(unidad)
    // Desde dónde: el final arranca en el módulo; el parcial, justo después
    // del examen anterior.
    let desde = 0
    if (!final) {
      for (let k = i - 1; k >= 0; k--) {
        if (esUnidadExamen(m.unidades[k])) { desde = k + 1; break }
      }
    }
    const enAlcance = m.unidades
      .slice(desde, i)
      .filter((u) => (u.tipo || 'contenido') === 'contenido')
      .map((u) => u.id)
    const temas = temasEnOrden([m], opciones).filter((t) => enAlcance.includes(t.unidadId))
    return { unidadId: unidad.id, moduloId: m.id, esFinal: final, temas }
  }
  return null
}

// Ordena una lista por su campo `orden` conservando la posición de los que no
// lo traen (sort ESTABLE, mismo contrato que src/data/index.js). Ni muta la
// entrada ni pierde elementos.
function porOrden(lista) {
  return [...(lista || [])].sort((a, b) => (a?.orden ?? 1e9) - (b?.orden ?? 1e9))
}

/**
 * Devuelve el tema con TODO su material puesto en orden: secciones y sus
 * bloques, quiz, flashcards, conceptos, recursos (videos, imágenes, fuentes,
 * archivos) y actividades.
 *
 * Existe porque el material de un tema llega de sitios distintos —lo clonado
 * de la plantilla, lo que añade el instructor, lo que sube al Storage— y sin
 * un orden declarado se acaba pintando en el orden en que Firestore lo
 * devuelve, que no es ninguno. El plan dicta la secuencia; esto la aplica.
 */
export function ordenarMaterialTema(tema) {
  if (!tema || typeof tema !== 'object') return tema
  const r = tema.recursos
  return {
    ...tema,
    objetivos: [...(tema.objetivos || [])],
    secciones: porOrden(tema.secciones).map((s) => ({ ...s, bloques: porOrden(s?.bloques) })),
    conceptosClave: porOrden(tema.conceptosClave),
    flashcards: porOrden(tema.flashcards),
    quiz: porOrden(tema.quiz),
    actividades: porOrden(tema.actividades),
    recursos: r && typeof r === 'object'
      ? {
        ...r,
        videos: porOrden(r.videos),
        imagenes: porOrden(r.imagenes),
        fuentes: porOrden(r.fuentes),
        archivos: porOrden(r.archivos),
      }
      : (r ?? null),
  }
}

// ---------- semilla → plantilla ----------

// Contenido VACÍO pero válido de un tema recién sembrado. Tiene la misma forma
// que produce contenidoModelo.contenidoTema, para que el editor y las páginas
// del alumno lo traten como cualquier otro tema desde el primer día.
function temaSembrado(tema, { moduloId, unidadId }) {
  const doc = {
    temaId: tema.id,
    titulo: tema.titulo,
    icono: '',
    duracion: '',
    resumen: '',
    objetivos: [],
    secciones: [],
    conceptosClave: [],
    flashcards: [],
    quiz: [],
    recursos: null,
    actividades: null,
    estado: 'publicado',
    // Ubicación DENORMALIZADA: al abrir /tema/:id no hace falta recorrer la
    // estructura entera para saber de qué módulo y unidad cuelga.
    moduloId,
    unidadId,
    grupo: tema.grupo ?? null,
    sesion: tema.sesion ?? null,
  }
  // Erratas del PDF oficial: se transcriben tal cual y se marcan, nunca se
  // corrigen por cuenta propia (el plan es un documento con derechos
  // reservados y la corrección la decide la academia).
  if (tema.revisar) {
    doc.revisar = true
    doc.notaRevision = tema.notaRevision || ''
  }
  if (tema.generado) doc.generado = true
  return doc
}

/**
 * Convierte UN programa de la semilla (scripts/seed/plan-rescate.json) en los
 * documentos de plantilla global: el doc de plantilla (estructura ligera) y
 * un doc por tema (contenido).
 *
 * No escribe nada: solo mapea. Así la conversión se prueba entera en Node,
 * sin Firestore, igual que el resto de la migración.
 *
 * @param {object} programa entrada de `programas[]` de la semilla
 * @param {{version?:number, temaDocId?:(plantillaId:string,temaId:string)=>string}} opciones
 */
export function plantillaDesdePrograma(programa, { version = 1, temaDocId } = {}) {
  if (!programa?.id) throw new Error('plantillaDesdePrograma: falta el id del programa.')
  const tipo = validarTipoPrograma(programa.tipoPrograma)
  if (tipo) throw new Error(`plantillaDesdePrograma (${programa.id}): ${tipo}`)
  const idDoc = temaDocId || ((p, t) => `${p}__${t}`)

  const estructura = []
  const temas = []
  const vistos = new Set()

  for (const m of programa.modulos || []) {
    const unidades = []
    for (const u of m.unidades || []) {
      const temasEstr = []
      for (const t of u.temas || []) {
        if (!t?.id) continue
        if (vistos.has(t.id)) {
          // Los doc-id de tema se derivan del id, así que un duplicado
          // machacaría contenido en silencio al sembrar.
          throw new Error(`plantillaDesdePrograma (${programa.id}): id de tema duplicado "${t.id}".`)
        }
        vistos.add(t.id)
        temasEstr.push({
          id: t.id,
          titulo: t.titulo,
          estado: 'publicado',
          // `orden` explícito: el material se pinta en el orden del plan, no
          // en el que Firestore devuelva los documentos.
          orden: temasEstr.length + 1,
          grupo: t.grupo ?? null,
          sesion: t.sesion ?? null,
        })
        temas.push({
          docId: idDoc(programa.id, t.id),
          plantillaId: programa.id,
          ...temaSembrado(t, { moduloId: m.id, unidadId: u.id }),
        })
      }
      const unidad = {
        id: u.id,
        titulo: u.titulo,
        estado: 'publicado',
        tipo: u.tipo || 'contenido',
        // null donde el PDF no numera la fila (la PRACTICA del Módulo 4).
        numeroOficial: u.numeroOficial ?? null,
        temas: temasEstr,
      }
      if (u.semanas != null) unidad.semanas = u.semanas
      if (u.horas != null) unidad.horas = u.horas
      if (u.opcional) unidad.opcional = true
      if (Array.isArray(u.grupos) && u.grupos.length) unidad.grupos = [...u.grupos]
      if (Array.isArray(u.sesiones) && u.sesiones.length) unidad.sesiones = u.sesiones.map((s) => ({ ...s }))
      unidades.push(unidad)
    }
    const modulo = {
      id: m.id,
      titulo: m.titulo,
      subtitulo: m.subtitulo || '',
      descripcion: m.descripcion || '',
      color: META_PROGRAMA[programa.tipoPrograma]?.color || '',
      icono: '',
      estado: 'publicado',
      // Encabezado tal como está IMPRESO en el plan oficial, y número de la
      // columna TEMA. Viajan con el contenido para que la academia pueda
      // cotejarlo con su documento sin salir de la plataforma.
      encabezadoOficial: m.encabezadoOficial || '',
      numeroOficial: m.numeroOficial ?? null,
      unidades,
    }
    if (m.totales) modulo.totales = { ...m.totales }
    estructura.push(modulo)
  }

  return {
    plantilla: {
      id: programa.id,
      nombre: programa.titulo,
      // `tipoDestino` es el NIVEL DE PRODUCTO de la academia (basico/avanzado/
      // medicina) y no tiene nada que ver con el tipo de programa: se conserva
      // en 'basico' salvo que la semilla diga otra cosa.
      tipoDestino: programa.tipoDestino || 'basico',
      tipoPrograma: programa.tipoPrograma,
      version,
      estado: 'publicada',
      estructura,
    },
    temas,
  }
}

// ---------- acceso por programa (el «tipo de alumno») ----------

/**
 * Programas a los que da acceso un grupo. El grupo es la ÚNICA fuente de
 * verdad del acceso: sin Cloud Functions (plan Spark) no hay forma de
 * mantener sincronizada una copia en `usuarios`, y un permiso rancio ahí
 * sería un fallo de aislamiento, no una molestia.
 *
 * @param {{programaId?:string, programasExtra?:string[]}|null} grupo
 * @returns {string[]} ids de curso, sin duplicados ni vacíos
 */
export function programasDeGrupo(grupo) {
  if (!grupo) return []
  const ids = [grupo.programaId, ...(Array.isArray(grupo.programasExtra) ? grupo.programasExtra : [])]
  return [...new Set(ids.filter((id) => typeof id === 'string' && id.trim()))]
}

/**
 * ¿Puede esta persona ver este programa?
 *
 * Regla de negocio (decisión del dueño del producto): el contenido está
 * ESTRICTAMENTE aislado por programa. Un alumno de Enfermería no ve el
 * temario de TUM aunque viva en su misma academia.
 *
 *  - staff y superadmin: ven todos los programas de la academia que gestionan
 *    (necesitan poder editarlos y revisar avances).
 *  - alumno CON grupo: solo los programas de su grupo.
 *  - alumno SIN grupo: NADA. No es un caso de borde: se entra a una academia
 *    por código de academia o de prueba y se queda sin grupo, y esas personas
 *    deben canjear un código de grupo antes de estudiar.
 */
export function puedeVerPrograma({ rol, esSuperadmin = false, grupo = null, programaId }) {
  if (!programaId) return false
  if (esSuperadmin) return true
  if (rol === 'instructor' || rol === 'admin_escuela') return true
  return programasDeGrupo(grupo).includes(programaId)
}

// Filtra una lista de programas por lo que esta persona puede ver.
export function programasVisibles(programas, { rol, esSuperadmin = false, grupo = null } = {}) {
  return (programas || []).filter((p) =>
    puedeVerPrograma({ rol, esSuperadmin, grupo, programaId: p?.id })
  )
}

/**
 * Motivo por el que alguien no tiene acceso a contenido, para que la UI diga
 * algo útil en vez de un 403 seco. `null` = sí tiene acceso.
 *
 * Devuelve un objeto y no una cadena porque la ruta protegida necesita el
 * CÓDIGO para decidir a dónde mandar a la persona.
 */
export function motivoSinPrograma({
  rol, esSuperadmin = false, grupo = null, programasDeAcademia = null,
}) {
  if (esSuperadmin || rol === 'instructor' || rol === 'admin_escuela') return null
  if (!grupo) {
    return {
      codigo: 'sin-grupo',
      titulo: 'Necesitas un código de grupo',
      texto: 'El contenido que estudias depende del grupo al que perteneces. '
        + 'Pide a tu academia el código de tu grupo y canjéalo para empezar.',
      destino: '/cuenta',
    }
  }
  if (programasDeGrupo(grupo).length === 0) {
    return {
      codigo: 'grupo-sin-programa',
      titulo: 'Tu grupo aún no tiene programa asignado',
      texto: 'Tu grupo existe pero todavía no está ligado a un plan de estudios. '
        + 'Avísale a tu director o a tu instructor para que lo asigne.',
      destino: '/',
    }
  }
  // OJO CON EL DEFECTO. Esta comprobación afirma que el programa del grupo
  // «no está publicado», y para afirmarlo hay que CONOCER los programas de la
  // academia. Con el defecto anterior (`= []`) se daba por probado justo lo que
  // no se sabía: ningún llamador de la aplicación pasa `programasDeAcademia`
  // —solo las pruebas—, así que la lista era siempre vacía y TODO alumno con
  // grupo recibía «Tu programa todavía no está disponible» en todas las
  // pantallas protegidas. Detectado el 30-08-2026 auditando con un usuario de
  // prueba con grupo asignado.
  //
  // Ahora, sin lista, la comprobación no corre: no se puede demostrar que algo
  // no esté publicado sin mirar. No abre ningún agujero —quién ve qué lo
  // deciden `puedeVerPrograma` sobre cada contenido y las reglas de Firestore—;
  // lo que se retira es un mensaje de diagnóstico que se estaba dando en falso.
  if (programasDeAcademia && programasVisibles(programasDeAcademia, { rol, grupo }).length === 0) {
    return {
      codigo: 'programa-no-publicado',
      titulo: 'Tu programa todavía no está disponible',
      texto: 'El plan de estudios de tu grupo aún no se ha publicado. '
        + 'En cuanto tu academia lo publique aparecerá aquí.',
      destino: '/',
    }
  }
  return null
}

/**
 * Los grupos que cursan UN programa.
 *
 * Un grupo lleva su plan de estudios en `programaId`, y puede cursar alguno más
 * en `programasExtra` (una carrera y una especialización a la vez). Los dos
 * cuentan: si un grupo estudia enfermería como programa extra, sus alumnos ven
 * ese contenido, así que tiene que aparecer al supervisar enfermería.
 *
 * Sin programa se devuelven todos: es la vista de la academia entera, no un
 * descuido. Ésa es la diferencia entre «no he elegido» y «he elegido y no hay».
 */
export function gruposDelPrograma(grupos, programaId = null) {
  const lista = grupos || []
  if (!programaId) return lista
  return lista.filter((g) => {
    if (!g) return false
    if (g.programaId === programaId) return true
    return Array.isArray(g.programasExtra) && g.programasExtra.includes(programaId)
  })
}
