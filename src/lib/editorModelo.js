// ============================================================
//  Editor estructural — lógica PURA (Fase 3)
// ------------------------------------------------------------
//  Sin Firebase, sin React. Todas las operaciones del editor sobre la
//  ESTRUCTURA de un curso (módulos → unidades → temas) viven aquí como
//  funciones inmutables: reciben la estructura, devuelven una NUEVA
//  (la original jamás se muta). La capa de datos (firebase/editor.js)
//  las aplica dentro de una transacción con control de versión, y las
//  pruebas de Node las ejercitan sin tocar Firestore.
//
//  Referencia a un nodo (ref):
//    módulo   → { moduloId }
//    unidad → { moduloId, unidadId }
//    tema   → { moduloId, unidadId, temaId }
//
//  Estados CENTRALIZADOS (no inventar variantes por componente):
//  borrador | publicado | archivado. El alumno solo recibe 'publicado'
//  (contenidoApi.ensamblarModulos filtra el resto en módulo, unidad y tema).
//
//  Política de ARCHIVADO (documentada también en docs/EDITOR-CONTENIDO.md):
//  archivar un padre OCULTA toda su rama al alumno (los hijos conservan su
//  estado propio); restaurar el padre recupera la rama tal como estaba.
//  Nada se elimina: el archivado es 100 % lógico y reversible.
// ============================================================
import { clonProfundo } from './contenidoModelo.js'
import { normalizarPermisos } from './permisosEditor.js'
import { validarTipoPrograma } from './programasModelo.js'

export const ESTADOS_NODO = ['borrador', 'publicado', 'archivado']

export const ETIQUETA_ESTADO = {
  borrador: 'Borrador',
  publicado: 'Publicado',
  archivado: 'Archivado',
}

export const LIMITE_TITULO = 120
export const LIMITE_DESCRIPCION = 600

// ---------- validaciones básicas ----------

// Devuelve un mensaje de error o null si el título es válido.
export function validarTitulo(titulo) {
  const t = String(titulo ?? '').trim()
  if (!t) return 'Escribe un título.'
  if (t.length > LIMITE_TITULO) {
    return `El título es demasiado largo (máximo ${LIMITE_TITULO} caracteres).`
  }
  return null
}

export function validarDescripcion(texto) {
  const t = String(texto ?? '')
  if (t.length > LIMITE_DESCRIPCION) {
    return `La descripción es demasiado larga (máximo ${LIMITE_DESCRIPCION} caracteres).`
  }
  return null
}

export function esEstadoValido(estado) {
  return ESTADOS_NODO.includes(estado)
}

// ---------- ids ----------

// Slug estable a partir de un título ("RCP básica" → "rcp-basica").
export function slugDe(texto, maximo = 40) {
  const base = String(texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maximo)
    .replace(/-+$/g, '')
  return base || 'elemento'
}

// Id único dentro de un conjunto existente: slug, slug-2, slug-3…
// OJO: nunca usar '__' (separador reservado de los doc-id de la Fase 2).
export function idUnico(titulo, existentes) {
  const ocupados = existentes instanceof Set ? existentes : new Set(existentes || [])
  const base = slugDe(titulo)
  if (!ocupados.has(base)) return base
  for (let n = 2; ; n++) {
    const candidato = `${base}-${n}`
    if (!ocupados.has(candidato)) return candidato
  }
}

// ---------- localización dentro de la estructura ----------

export function tipoDeRef(ref) {
  if (!ref?.moduloId) return null
  if (ref.temaId) return 'tema'
  if (ref.unidadId) return 'unidad'
  return 'modulo'
}

// Encuentra el nodo (y sus padres e índices) que señala una ref.
// Lanza un error claro si la ref no existe (padre inválido, nodo borrado…).
export function localizar(estructura, ref) {
  const iModulo = (estructura || []).findIndex((f) => f.id === ref?.moduloId)
  if (iModulo < 0) throw new Error(`No existe el módulo "${ref?.moduloId}" en este curso.`)
  const modulo = estructura[iModulo]
  if (!ref.unidadId) return { tipo: 'modulo', modulo, iModulo }
  const iUnidad = (modulo.unidades || []).findIndex((m) => m.id === ref.unidadId)
  if (iUnidad < 0) throw new Error(`No existe la unidad "${ref.unidadId}" en el módulo "${modulo.titulo}".`)
  const unidad = modulo.unidades[iUnidad]
  if (!ref.temaId) return { tipo: 'unidad', modulo, iModulo, unidad, iUnidad }
  const iTema = (unidad.temas || []).findIndex((t) => t.id === ref.temaId)
  if (iTema < 0) throw new Error(`No existe el tema "${ref.temaId}" en la unidad "${unidad.titulo}".`)
  return { tipo: 'tema', modulo, iModulo, unidad, iUnidad, tema: unidad.temas[iTema], iTema }
}

// Todos los ids de tema usados en el curso (los doc-id de tema se derivan
// de ellos, así que deben ser únicos a nivel CURSO, no solo por unidad).
export function idsDeTemas(estructura) {
  const ids = []
  for (const f of estructura || []) {
    for (const m of f.unidades || []) {
      for (const t of m.temas || []) ids.push(t.id)
    }
  }
  return ids
}

// Sanidad de toda la estructura antes de guardar: jerarquía bien formada,
// ids únicos por nivel y estados dentro del catálogo.
export function validarEstructura(estructura) {
  if (!Array.isArray(estructura)) return 'La estructura del curso es inválida.'
  const modulosVistas = new Set()
  const temasVistos = new Set()
  for (const f of estructura) {
    if (!f?.id || typeof f.titulo !== 'string') return 'Hay un módulo sin id o sin título.'
    if (modulosVistas.has(f.id)) return `Id de módulo duplicado: "${f.id}".`
    modulosVistas.add(f.id)
    if (f.estado && !esEstadoValido(f.estado)) return `Estado inválido en el módulo "${f.titulo}".`
    const modVistos = new Set()
    for (const m of f.unidades || []) {
      if (!m?.id || typeof m.titulo !== 'string') return `Hay una unidad sin id o sin título en "${f.titulo}".`
      if (modVistos.has(m.id)) return `Id de unidad duplicado en el módulo "${f.titulo}": "${m.id}".`
      modVistos.add(m.id)
      if (m.estado && !esEstadoValido(m.estado)) return `Estado inválido en la unidad "${m.titulo}".`
      for (const t of m.temas || []) {
        if (!t?.id || typeof t.titulo !== 'string') return `Hay un tema sin id o sin título en "${m.titulo}".`
        if (temasVistos.has(t.id)) return `Id de tema duplicado en el curso: "${t.id}".`
        temasVistos.add(t.id)
        if (t.estado && !esEstadoValido(t.estado)) return `Estado inválido en el tema "${t.titulo}".`
      }
    }
  }
  return null
}

// ---------- creación ----------

export function crearModulo(estructura, { titulo, subtitulo = '', descripcion = '' }) {
  const error = validarTitulo(titulo)
  if (error) throw new Error(error)
  const nueva = clonProfundo(estructura || [])
  const modulo = {
    id: idUnico(titulo, nueva.map((f) => f.id)),
    titulo: titulo.trim(),
    subtitulo,
    descripcion,
    color: '',
    icono: '',
    estado: 'borrador',
    unidades: [],
  }
  nueva.push(modulo)
  return { estructura: nueva, nodo: modulo, ref: { moduloId: modulo.id } }
}

export function crearUnidad(estructura, { moduloId, titulo, descripcion = '' }) {
  const error = validarTitulo(titulo)
  if (error) throw new Error(error)
  const nueva = clonProfundo(estructura || [])
  const { modulo } = localizar(nueva, { moduloId })
  if (modulo.estado === 'archivado') {
    throw new Error('No puedes crear unidades dentro de un módulo archivado. Restáuralo primero.')
  }
  modulo.unidades = modulo.unidades || []
  const unidad = {
    id: idUnico(titulo, modulo.unidades.map((m) => m.id)),
    titulo: titulo.trim(),
    descripcion,
    estado: 'borrador',
    temas: [],
  }
  modulo.unidades.push(unidad)
  return { estructura: nueva, nodo: unidad, ref: { moduloId, unidadId: unidad.id } }
}

// Crea la ENTRADA del tema en la estructura; el doc de contenido lo crea la
// capa de datos (mismo id) dentro de la misma transacción.
export function crearTema(estructura, { moduloId, unidadId, titulo }) {
  const error = validarTitulo(titulo)
  if (error) throw new Error(error)
  const nueva = clonProfundo(estructura || [])
  const { modulo, unidad } = localizar(nueva, { moduloId, unidadId })
  if (modulo.estado === 'archivado' || unidad.estado === 'archivado') {
    throw new Error('No puedes crear temas dentro de un elemento archivado. Restáuralo primero.')
  }
  const tema = {
    id: idUnico(titulo, idsDeTemas(nueva)),
    titulo: titulo.trim(),
    estado: 'borrador',
  }
  unidad.temas = unidad.temas || []
  unidad.temas.push(tema)
  return { estructura: nueva, nodo: tema, ref: { moduloId, unidadId, temaId: tema.id } }
}

// ---------- edición de campos ----------

const CAMPOS_EDITABLES = {
  modulo: ['titulo', 'subtitulo', 'descripcion', 'color', 'icono'],
  unidad: ['titulo', 'descripcion'],
  tema: ['titulo'], // el resumen/las secciones viven en el DOC del tema
}

export function actualizarNodo(estructura, ref, campos) {
  const tipo = tipoDeRef(ref)
  const permitidos = CAMPOS_EDITABLES[tipo] || []
  for (const clave of Object.keys(campos || {})) {
    if (!permitidos.includes(clave)) {
      throw new Error(`El campo "${clave}" no se puede editar en un ${tipo}.`)
    }
  }
  if ('titulo' in campos) {
    const error = validarTitulo(campos.titulo)
    if (error) throw new Error(error)
  }
  if ('descripcion' in campos) {
    const error = validarDescripcion(campos.descripcion)
    if (error) throw new Error(error)
  }
  const nueva = clonProfundo(estructura)
  const loc = localizar(nueva, ref)
  const nodo = loc.tema || loc.unidad || loc.modulo
  for (const [clave, valor] of Object.entries(campos || {})) {
    nodo[clave] = clave === 'titulo' ? valor.trim() : valor
  }
  return { estructura: nueva, nodo }
}

// ---------- reordenamiento (dentro del mismo padre) ----------

function moverEnArray(lista, desde, hasta) {
  const [el] = lista.splice(desde, 1)
  lista.splice(hasta, 0, el)
}

// movimiento: 'arriba' | 'abajo' | 'inicio' | 'fin' | { indice: n }
export function reordenarNodo(estructura, ref, movimiento) {
  const nueva = clonProfundo(estructura)
  const loc = localizar(nueva, ref)
  const lista = loc.tipo === 'modulo' ? nueva
    : loc.tipo === 'unidad' ? loc.modulo.unidades
    : loc.unidad.temas
  const desde = loc.tipo === 'modulo' ? loc.iModulo : loc.tipo === 'unidad' ? loc.iUnidad : loc.iTema
  let hasta
  if (movimiento === 'arriba') hasta = desde - 1
  else if (movimiento === 'abajo') hasta = desde + 1
  else if (movimiento === 'inicio') hasta = 0
  else if (movimiento === 'fin') hasta = lista.length - 1
  else if (movimiento && Number.isInteger(movimiento.indice)) hasta = movimiento.indice
  else throw new Error('Movimiento de orden inválido.')
  if (hasta < 0 || hasta > lista.length - 1) {
    throw new Error('Ese elemento ya está en ese extremo de la lista.')
  }
  if (hasta !== desde) moverEnArray(lista, desde, hasta)
  return { estructura: nueva, cambio: hasta !== desde }
}

// ---------- mover entre padres ----------

// Unidad → otro módulo del MISMO curso; tema → otra unidad del MISMO curso.
export function moverNodo(estructura, ref, destino) {
  const tipo = tipoDeRef(ref)
  const nueva = clonProfundo(estructura)
  if (tipo === 'unidad') {
    const origen = localizar(nueva, ref)
    const { modulo: moduloDestino } = localizar(nueva, { moduloId: destino?.moduloId })
    if (moduloDestino.estado === 'archivado') {
      throw new Error('No puedes mover elementos a un módulo archivado.')
    }
    if (moduloDestino.id === origen.modulo.id) {
      throw new Error('La unidad ya está en esa modulo.')
    }
    if ((moduloDestino.unidades || []).some((m) => m.id === ref.unidadId)) {
      throw new Error('El módulo destino ya tiene una unidad con ese id.')
    }
    const [unidad] = origen.modulo.unidades.splice(origen.iUnidad, 1)
    moduloDestino.unidades = moduloDestino.unidades || []
    moduloDestino.unidades.push(unidad)
    return { estructura: nueva, ref: { moduloId: moduloDestino.id, unidadId: unidad.id } }
  }
  if (tipo === 'tema') {
    const origen = localizar(nueva, ref)
    const { modulo: moduloDestino, unidad: unidadDestino } =
      localizar(nueva, { moduloId: destino?.moduloId, unidadId: destino?.unidadId })
    if (moduloDestino.estado === 'archivado' || unidadDestino.estado === 'archivado') {
      throw new Error('No puedes mover elementos a un destino archivado.')
    }
    if (unidadDestino === origen.unidad) {
      throw new Error('El tema ya está en ese unidad.')
    }
    const [tema] = origen.unidad.temas.splice(origen.iTema, 1)
    unidadDestino.temas = unidadDestino.temas || []
    unidadDestino.temas.push(tema)
    return { estructura: nueva, ref: { moduloId: moduloDestino.id, unidadId: unidadDestino.id, temaId: tema.id } }
  }
  throw new Error('Los módulos no se mueven entre padres: usa el reordenamiento.')
}

// ---------- duplicación ----------

// Duplica un nodo con NUEVOS ids ("Copia de …", estado borrador). Los temas
// duplicados necesitan doc nuevo → se devuelve el mapeo {origenId, nuevoId}
// para que la capa de datos copie el contenido en la misma transacción.
export function duplicarNodo(estructura, ref) {
  const tipo = tipoDeRef(ref)
  const nueva = clonProfundo(estructura)
  const loc = localizar(nueva, ref)
  const temasIds = new Set(idsDeTemas(nueva))
  const mapeoTemas = []

  const duplicarTemaEntrada = (t) => {
    const nuevoId = idUnico(`${t.titulo} copia`, temasIds)
    temasIds.add(nuevoId)
    mapeoTemas.push({ origenId: t.id, nuevoId })
    return { ...clonProfundo(t), id: nuevoId, estado: 'borrador' }
  }

  if (tipo === 'tema') {
    const copia = duplicarTemaEntrada(loc.tema)
    copia.titulo = `Copia de ${loc.tema.titulo}`
    loc.unidad.temas.splice(loc.iTema + 1, 0, copia)
    return {
      estructura: nueva, mapeoTemas,
      ref: { moduloId: ref.moduloId, unidadId: ref.unidadId, temaId: copia.id },
    }
  }
  if (tipo === 'unidad') {
    const copia = clonProfundo(loc.unidad)
    copia.id = idUnico(`${loc.unidad.titulo} copia`, loc.modulo.unidades.map((m) => m.id))
    copia.titulo = `Copia de ${loc.unidad.titulo}`
    copia.estado = 'borrador'
    delete copia.implicito
    copia.temas = (copia.temas || []).map(duplicarTemaEntrada)
    loc.modulo.unidades.splice(loc.iUnidad + 1, 0, copia)
    return { estructura: nueva, mapeoTemas, ref: { moduloId: ref.moduloId, unidadId: copia.id } }
  }
  // módulo
  const copia = clonProfundo(loc.modulo)
  copia.id = idUnico(`${loc.modulo.titulo} copia`, nueva.map((f) => f.id))
  copia.titulo = `Copia de ${loc.modulo.titulo}`
  copia.estado = 'borrador'
  copia.unidades = (copia.unidades || []).map((m) => ({
    ...m,
    temas: (m.temas || []).map(duplicarTemaEntrada),
  }))
  nueva.splice(loc.iModulo + 1, 0, copia)
  return { estructura: nueva, mapeoTemas, ref: { moduloId: copia.id } }
}

// ---------- archivado / restauración / publicación ----------

// Descendientes NO archivados de un nodo (para avisar antes de archivar:
// "esto ocultará N elementos a los alumnos").
export function contarDescendientesActivos(estructura, ref) {
  const loc = localizar(estructura, ref)
  const contarTemas = (m) => (m.temas || []).filter((t) => t.estado !== 'archivado').length
  if (loc.tipo === 'tema') return 0
  if (loc.tipo === 'unidad') return contarTemas(loc.unidad)
  return (loc.modulo.unidades || []).reduce(
    (n, m) => n + (m.estado !== 'archivado' ? 1 + contarTemas(m) : 0), 0
  )
}

function cambiarEstado(estructura, ref, estado) {
  const nueva = clonProfundo(estructura)
  const loc = localizar(nueva, ref)
  const nodo = loc.tema || loc.unidad || loc.modulo
  nodo.estado = estado
  return { estructura: nueva, nodo }
}

// Archivar = ocultarlo (y a toda su rama) del alumno. Los hijos conservan su
// estado propio: al restaurar el padre, la rama vuelve tal como estaba.
export function archivarNodo(estructura, ref) {
  return cambiarEstado(estructura, ref, 'archivado')
}

export function restaurarNodo(estructura, ref) {
  const loc = localizar(estructura, ref)
  const nodo = loc.tema || loc.unidad || loc.modulo
  if (nodo.estado !== 'archivado') throw new Error('Ese elemento no está archivado.')
  return cambiarEstado(estructura, ref, 'borrador')
}

export function despublicarNodo(estructura, ref) {
  const loc = localizar(estructura, ref)
  const nodo = loc.tema || loc.unidad || loc.modulo
  if (nodo.estado !== 'publicado') throw new Error('Ese elemento no está publicado.')
  return cambiarEstado(estructura, ref, 'borrador')
}

// Publicar exige: título válido, nodo no archivado (primero se restaura) y
// NINGÚN ancestro archivado (no se publica un tema cuya modulo/unidad esté
// archivado). `cursoEstado` permite bloquear también con el curso archivado.
export function publicarNodo(estructura, ref, { cursoEstado = 'publicado' } = {}) {
  if (cursoEstado === 'archivado') {
    throw new Error('El curso está archivado: restáuralo antes de publicar contenido.')
  }
  const loc = localizar(estructura, ref)
  const nodo = loc.tema || loc.unidad || loc.modulo
  const error = validarTitulo(nodo.titulo)
  if (error) throw new Error(`No se puede publicar: ${error}`)
  if (nodo.estado === 'archivado') {
    throw new Error('Ese elemento está archivado: restáuralo antes de publicarlo.')
  }
  if (loc.tipo !== 'modulo' && loc.modulo.estado === 'archivado') {
    throw new Error(`El módulo "${loc.modulo.titulo}" está archivado: restáuralo antes de publicar su contenido.`)
  }
  if (loc.tipo === 'tema' && loc.unidad.estado === 'archivado') {
    throw new Error(`La unidad "${loc.unidad.titulo}" está archivada: restáurala antes de publicar sus temas.`)
  }
  return cambiarEstado(estructura, ref, 'publicado')
}

// ---------- cursos (docs completos; la capa de datos solo los escribe) ----------

// Doc de un curso NUEVO creado desde cero en el editor (sin plantilla).
export function nuevoCurso({ academiaId, titulo, descripcion = '', tipoPrograma = 'tum', cursosExistentes = [], uid = null, maxCursos = null }) {
  const error = validarTitulo(titulo)
  if (error) throw new Error(error)
  const errorTipo = validarTipoPrograma(tipoPrograma)
  if (errorTipo) throw new Error(errorTipo)
  const errorDesc = validarDescripcion(descripcion)
  if (errorDesc) throw new Error(errorDesc)
  const activos = cursosExistentes.filter((c) => c.estado !== 'archivado')
  if (maxCursos != null && activos.length >= maxCursos) {
    throw new Error(
      `Tu plan permite ${maxCursos === 1 ? 'un solo curso activo' : `${maxCursos} cursos activos`}. ` +
      'Archiva otro curso para crear uno nuevo.'
    )
  }
  const idsLocales = cursosExistentes.map((c) => (c.id || '').split('__').pop())
  const idLocal = idUnico(titulo, idsLocales)
  const orden = cursosExistentes.reduce((mx, c) => Math.max(mx, c.orden ?? 0), 0) + 1
  return {
    docId: `${academiaId}__${idLocal}`,
    academiaId,
    plantillaId: null,
    titulo: titulo.trim(),
    descripcion,
    tipoDestino: 'basico',
    tipoPrograma,
    estado: 'borrador',
    orden,
    estructura: [],
    version: 1,
    creadoPor: uid,
  }
}

// Duplicado de un curso COMPLETO dentro de la misma academia: copia solo la
// estructura académica (curso + docs de tema); jamás progreso/intentos/
// calificaciones (viven en otras colecciones y no se tocan).
export function duplicadoDeCurso({ curso, temasDocs = [], cursosExistentes = [], uid = null, maxCursos = null }) {
  if (!curso?.id || !curso?.academiaId) throw new Error('Curso de origen inválido.')
  const titulo = `Copia de ${curso.titulo || curso.id}`
  const base = nuevoCurso({
    academiaId: curso.academiaId,
    titulo,
    descripcion: curso.descripcion || '',
    tipoPrograma: curso.tipoPrograma || 'tum',
    cursosExistentes,
    uid,
    maxCursos,
  })
  const nuevoCursoDoc = {
    ...base,
    tipoDestino: curso.tipoDestino || 'basico',
    tipoPrograma: curso.tipoPrograma || 'tum',
    // El duplicado registra su origen y quién lo hizo; nace en borrador.
    duplicadoDe: curso.id,
    estructura: clonProfundo(curso.estructura || []),
  }
  // Los ids internos (modulo/unidad/tema) se CONSERVAN: viven en el namespace
  // del curso nuevo, así que no colisionan y el progreso no se ve afectado
  // (el progreso apunta a los temas del curso original, no al duplicado).
  const temasNuevos = temasDocs.map((t) => {
    const copia = clonProfundo(t)
    delete copia.docId
    return {
      ...copia,
      docId: `${nuevoCursoDoc.docId}__${t.temaId}`,
      academiaId: curso.academiaId,
      cursoId: nuevoCursoDoc.docId,
      estado: t.estado || 'publicado',
    }
  })
  return { curso: nuevoCursoDoc, temas: temasNuevos }
}

// ---------- permisos (fuente única para UI y capa de datos) ----------

// ¿Puede este usuario editar el contenido de la academia objetivo?
// La decisión REAL la imponen las reglas de Firestore; esto evita ofrecer
// herramientas que el servidor rechazaría.
//  - superadmin: siempre (cualquier academia y modo plantilla).
//  - director (admin_escuela): solo SU academia y solo si su plan otorga
//    `editorContenido` (BASE queda fuera; fuente: capacidades.js).
//  - instructor: solo con permisos editoriales explícitos y, si se indica
//    cursoId, solo sobre sus cursos permitidos. La granularidad POR ACCIÓN
//    (crear/publicar/exámenes/actividades/recursos) la resuelve
//    permisoAccionEditor/permisosRequeridosPorContenido en permisosEditor.js;
//    sin permisos concedidos NO hay acceso por defecto.
//  - alumno / sin sesión: nunca.
export function permisoEdicion({ esSuperadmin, rol, academiaIdUsuario, academiaIdObjetivo, capacidades, perfil, cursoId = null }) {
  if (esSuperadmin) return { permitido: true, motivo: null }
  if (!rol || rol === 'alumno') {
    return { permitido: false, motivo: 'Los alumnos no pueden editar el contenido.' }
  }
  if (academiaIdUsuario !== academiaIdObjetivo) {
    return { permitido: false, motivo: 'Solo puedes editar el contenido de tu propia academia.' }
  }
  if (rol === 'admin_escuela') {
    if (!capacidades?.editorContenido) {
      return {
        permitido: false,
        motivo: 'Tu plan actual no incluye el editor de contenido. Contacta al administrador de la plataforma para cambiar de plan.',
      }
    }
    return { permitido: true, motivo: null }
  }
  if (rol === 'instructor') {
    // Fuente única de la granularidad: src/lib/permisosEditor.js (espejo de
    // las reglas). Sin `editarContenido` no hay acceso; con curso indicado,
    // debe estar en cursosPermitidos.
    const permisos = normalizarPermisos(perfil?.permisosEditor)
    if (!permisos.editarContenido) {
      return { permitido: false, motivo: 'No tienes permisos editoriales. Pídelos al director de tu academia.' }
    }
    if (cursoId && !permisos.cursosPermitidos.includes(cursoId)) {
      return { permitido: false, motivo: 'No tienes permiso para editar este curso.' }
    }
    return { permitido: true, motivo: null }
  }
  return { permitido: false, motivo: 'Tu rol no permite editar contenido.' }
}
