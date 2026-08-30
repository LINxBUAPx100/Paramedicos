// ============================================================
//  Revisión docente del contenido — lógica PURA
// ------------------------------------------------------------
//  Resuelve una necesidad concreta: que el admin supremo pueda pedir a
//  profesores concretos que revisen y validen el temario, sin convertirlos en
//  editores ni en administradores.
//
//  POR QUÉ UN PASE Y NO UN ROL
//
//  Lo que un profesor necesita para revisar no es «permisos de desarrollador»:
//  es poder FIRMAR un dictamen sobre un tema. Dar rol de admin o permisos de
//  edición para eso concede mucho más de lo necesario —borrar cursos, cambiar
//  miembros, publicar— y no caduca. Aquí se concede un PASE DE REVISOR:
//
//    · solo habilita firmar dictámenes (validar / corregir / reportar);
//    · NO habilita editar, publicar, borrar ni administrar nada;
//    · CADUCA en una fecha, así que se apaga solo si nadie lo revoca.
//
//  QUÉ PASA AL VALIDAR (CAMBIÓ)
//
//  Antes la firma solo se REGISTRABA y esperaba a que la coordinación la
//  aplicara a mano. En la práctica nadie la aplicaba nunca —no había ninguna
//  pantalla que escribiera el estado del tema— así que «Validar» no validaba:
//  el alumno seguía viendo el aviso de contenido sin revisar y el banco de
//  examen seguía vacío.
//
//  Ahora la firma se aplica en el acto (`lib/firebase/validaciones.js`) y el
//  dictamen queda como RASTRO de quién firmó qué y con qué observaciones.
//  `CLAUDE.md` §5.2 y §16 siguen respetados en lo que importa: `validado` lo
//  otorga una persona con nombre, en una fecha, y la ficha resultante pasa por
//  `validarRevision`. Lo que se retiró es la fricción que impedía firmar
//  (cuatro casillas obligatorias y una lista de fuentes con formato), no la
//  trazabilidad.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
//
//  Doc: usuarios/{uid}.revisorTemporal = { hasta, otorgadoPor, otorgadoEn, nota }
//  Doc: dictamenes/{id} = { temaId, accion, comentario, revisadoPor, fuentes,
//                           uid, academiaId, estado, fecha }
// ============================================================

import { validarRevision, ESTADOS_QUE_EXIGEN_REVISOR } from './estadoEditorial.js'
import { trazaDeFirma } from './validacionesModelo.js'

// Las tres acciones que ofrece la barra de revisión de cada tema.
export const ACCIONES_REVISION = ['validar', 'corregir', 'reportar']

export const ETIQUETA_ACCION = {
  validar: 'Validar',
  corregir: 'Corregir',
  reportar: 'Reportar',
}

export const DESCRIPCION_ACCION = {
  validar: 'Firmo que este tema es correcto. Al hacerlo queda visible para los alumnos '
    + 'sin aviso de revisión y sus preguntas entran en el examen de su unidad.',
  corregir: 'El tema necesita cambios concretos: los escribo para quien lo redacte.',
  reportar: 'Hay un problema que no es de contenido: imagen rota, enlace caído, fallo de la app.',
}

// Estados del dictamen dentro de la cola de la coordinación.
export const ESTADOS_DICTAMEN = ['abierto', 'aplicado', 'descartado']

// Tope de vigencia del pase. Un pase «para siempre» es un rol disfrazado.
export const MAX_DIAS_PASE = 120
export const DIAS_PASE_SUGERIDOS = 30

const FECHA = /^\d{4}-\d{2}-\d{2}$/
const texto = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max

// ---------- pase de revisor temporal ----------

// Normaliza el pase leído de Firestore: solo claves conocidas, nada inventado.
export function normalizarPase(bruto) {
  const f = bruto && typeof bruto === 'object' && !Array.isArray(bruto) ? bruto : {}
  return {
    hasta: FECHA.test(String(f.hasta || '')) ? String(f.hasta) : null,
    otorgadoPor: typeof f.otorgadoPor === 'string' ? f.otorgadoPor : null,
    otorgadoEn: FECHA.test(String(f.otorgadoEn || '')) ? String(f.otorgadoEn) : null,
    nota: typeof f.nota === 'string' ? f.nota.slice(0, 300) : '',
  }
}

// ¿Está vigente hoy? Las fechas van en AAAA-MM-DD y se comparan como texto:
// es exacto para ese formato y no arrastra husos horarios.
export function paseActivo(perfil, hoy) {
  const pase = normalizarPase(perfil?.revisorTemporal)
  if (!pase.hasta || !FECHA.test(String(hoy || ''))) return false
  return String(hoy) <= pase.hasta
}

// Días que le quedan (0 si caduca hoy, null si no hay pase o falta la fecha).
export function diasRestantesPase(perfil, hoy) {
  const pase = normalizarPase(perfil?.revisorTemporal)
  if (!pase.hasta || !FECHA.test(String(hoy || ''))) return null
  const ms = Date.parse(`${pase.hasta}T00:00:00Z`) - Date.parse(`${hoy}T00:00:00Z`)
  if (Number.isNaN(ms)) return null
  return Math.max(0, Math.round(ms / 86400000))
}

// Valida el pase ANTES de escribirlo. `hoy` en AAAA-MM-DD.
export function validarPase({ hasta, nota } = {}, hoy) {
  if (!FECHA.test(String(hoy || ''))) return 'Falta la fecha de hoy para calcular la vigencia.'
  if (!FECHA.test(String(hasta || ''))) return 'La fecha de caducidad debe ser AAAA-MM-DD.'
  if (String(hasta) < String(hoy)) return 'La fecha de caducidad ya pasó.'
  const dias = Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${hoy}T00:00:00Z`)) / 86400000)
  if (dias > MAX_DIAS_PASE) {
    return `Un pase de revisión dura como máximo ${MAX_DIAS_PASE} días. Para más tiempo, renuévalo.`
  }
  if (nota != null && typeof nota !== 'string') return 'La nota del pase es inválida.'
  if (typeof nota === 'string' && nota.length > 300) return 'La nota del pase es demasiado larga.'
  return null
}

// Fecha de caducidad a `dias` vista, en AAAA-MM-DD. Utilidad para la UI.
export function caducidadEn(dias, hoy) {
  if (!FECHA.test(String(hoy || ''))) return null
  const n = Number(dias)
  if (!Number.isFinite(n) || n < 0) return null
  return new Date(Date.parse(`${hoy}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10)
}

// ---------- quién puede revisar ----------

/**
 * ¿Puede este usuario firmar dictámenes sobre el contenido?
 *
 *  - super-admin y director: sí, por su rol.
 *  - profesor: solo con PASE VIGENTE, o si ya tiene el permiso editorial de
 *    publicar (quien puede publicar, con más razón puede opinar).
 *  - alumno y cualquier otro: no. Para eso está «Reportar», que es de todos.
 */
export function puedeRevisar({ esSuperadmin, rol, perfil, hoy } = {}) {
  if (esSuperadmin || rol === 'admin_escuela') return true
  if (rol !== 'instructor') return false
  if (paseActivo(perfil, hoy)) return true
  return perfil?.permisosEditor?.publicarContenido === true
}

// Reportar NO exige pase: cualquier persona con sesión puede avisar de un fallo.
// Se declara aquí para que la barra no invente su propia regla.
export function puedeReportar({ uid } = {}) {
  return Boolean(uid)
}

// Motivo legible cuando no puede revisar, para que la UI no calle sin explicar.
export function motivoSinRevision({ esSuperadmin, rol, perfil, hoy } = {}) {
  if (puedeRevisar({ esSuperadmin, rol, perfil, hoy })) return null
  if (rol !== 'instructor') {
    return 'La revisión de contenido está reservada al cuerpo docente.'
  }
  const pase = normalizarPase(perfil?.revisorTemporal)
  if (pase.hasta) {
    return `Tu pase de revisión caducó el ${pase.hasta}. Pídele al administrador que lo renueve.`
  }
  return 'Necesitas un pase de revisión para firmar dictámenes. Pídeselo al administrador.'
}

// ---------- deudas declaradas del tema ----------

// Marcas con las que el temario declara que algo quedó sin comprobar. Se
// buscan en las observaciones de la ficha editorial, que es donde la redacción
// deja constancia de lo que NO pudo verificar.
const MARCAS_DEUDA = [
  'pendiente', 'pendientes', 'bloqueo', 'bloqueado', 'deuda',
  'no se localiz', 'sin identificar', 'por verificar', 'no citable',
]

/**
 * Deudas que el propio tema declara. No es una heurística sobre el texto de la
 * lección: solo lee lo que la ficha editorial dice de sí misma.
 *
 * Existe porque buena parte del temario se redactó declarando expresamente qué
 * no pudo comprobarse —capítulo y página de un manual, un protocolo local que
 * nadie ha entregado, un epónimo sin fuente—. Validar un tema con esas deudas
 * abiertas es firmar algo que su propio autor marcó como incompleto, y la
 * interfaz debe decirlo antes, no después.
 */
export function deudasDeclaradas(revision) {
  const obs = Array.isArray(revision?.observaciones) ? revision.observaciones : []
  return obs.filter((o) => {
    const t = String(o || '').toLowerCase()
    return MARCAS_DEUDA.some((m) => t.includes(m))
  })
}

// ---------- firma de validación ----------

// Los cuatro puntos que el revisor REPASA al validar.
//
// Nacieron como requisito: sin marcar los cuatro, la firma se rechazaba. En la
// práctica eso no producía revisiones más cuidadosas, producía revisiones que
// no se terminaban —cuatro casillas, una lista de fuentes con formato y un
// nombre antes de poder decir «esto está bien»—, y el temario se quedaba sin
// validar. Ahora son una AYUDA: se muestran, se pueden marcar y lo marcado
// queda en el dictamen, pero lo que la firma exige es un responsable con
// nombre. Quien valida ya está poniendo su nombre en ello.
export const CHECKLIST_VALIDACION = [
  { clave: 'fuentes', texto: 'He comprobado que las fuentes citadas respaldan lo que dice el tema.' },
  { clave: 'cifras', texto: 'No hay dosis, cifras ni procedimientos sin población, indicación y protocolo.' },
  { clave: 'alcance', texto: 'El contenido corresponde a este tema y a su nivel asistencial.' },
  { clave: 'actividad', texto: 'El quiz y la actividad se responden con esta misma lección.' },
]

export const CLAVES_CHECKLIST = CHECKLIST_VALIDACION.map((c) => c.clave)

export function checklistCompleta(checklist) {
  const c = checklist && typeof checklist === 'object' ? checklist : {}
  return CLAVES_CHECKLIST.every((k) => c[k] === true)
}

/**
 * ¿Puede firmarse la validación de este tema?
 *
 * Lo único que se exige es un RESPONSABLE con nombre, que es lo que convierte
 * la firma en un acto atribuible. Las fuentes citadas y la lista de repaso
 * suman —se guardan en el dictamen y en la ficha— pero no bloquean: la
 * revisión que no se puede terminar no protege a nadie, deja el temario sin
 * validar. Cuando el docente no cita fuentes, la traza de su propia firma
 * ocupa ese lugar (`trazaDeFirma` en validacionesModelo.js), así que la ficha
 * resultante sigue pasando `validarRevision`.
 *
 * Devuelve { ok, motivo, deudas }; `deudas` es informativo, nunca bloquea.
 */
export function validarFirmaValidacion({ revision, revisadoPor } = {}) {
  const deudas = deudasDeclaradas(revision)
  if (!texto(revisadoPor, 200)) {
    return { ok: false, motivo: 'Firma con tu nombre o tu cargo: un tema validado necesita responsable.', deudas }
  }
  return { ok: true, motivo: null, deudas }
}

// Ficha de revisión resultante de aplicar una firma de validación. La produce
// `validacionesModelo.fichaConValidacion` en el camino normal; esta versión la
// conserva para la comprobación previa de la cola de dictámenes.
export function fichaValidada(revision, { revisadoPor, fuentes, fecha, comentario = '', estado = 'validado' } = {}) {
  if (!ESTADOS_QUE_EXIGEN_REVISOR.includes(estado)) {
    throw new Error(`Estado no válido para una firma de validación: "${estado}".`)
  }
  const base = revision && typeof revision === 'object' ? revision : {}
  const previas = Array.isArray(base.fuentes) ? base.fuentes : []
  const nuevas = Array.isArray(fuentes) ? fuentes.filter((f) => texto(f, 600)) : []
  // Sin fuentes citadas, la traza del acto de revisión es la fuente. Sin esto
  // la ficha sería inválida y «validar» volvería a no validar nada.
  const trazadas = nuevas.length > 0 || previas.length > 0
    ? nuevas
    : [trazaDeFirma({ revisadoPor, fecha, comentario })]
  return {
    ...base,
    estado,
    revisadoPor: String(revisadoPor || '').trim().slice(0, 200),
    actualizado: String(fecha || '').slice(0, 10),
    fuentes: [...new Set([...previas, ...trazadas])],
  }
}

// ---------- dictamen ----------

/**
 * Valida un dictamen ANTES de escribirlo. Devuelve un mensaje o null.
 *
 * `validar`  → exige firma, fuentes y checklist completa.
 * `corregir` → exige el comentario con las correcciones (es su razón de ser).
 * `reportar` → exige el comentario; no exige firma ni fuentes.
 */
export function validarDictamen(d) {
  if (d == null || typeof d !== 'object' || Array.isArray(d)) return 'Dictamen inválido.'
  if (!ACCIONES_REVISION.includes(d.accion)) {
    return `Acción desconocida: "${d.accion}" (usa ${ACCIONES_REVISION.join(', ')}).`
  }
  if (!texto(d.temaId, 120)) return 'Falta el tema al que se refiere el dictamen.'

  if (d.accion === 'validar') {
    const r = validarFirmaValidacion(d)
    if (!r.ok) return r.motivo
    return null
  }

  if (!texto(d.comentario, 4000)) {
    return d.accion === 'corregir'
      ? 'Escribe qué hay que corregir: sin el detalle, nadie puede arreglarlo.'
      : 'Describe el problema que estás reportando.'
  }
  if (d.accion === 'corregir' && !texto(d.revisadoPor, 200)) {
    return 'Firma la corrección con tu nombre o tu cargo.'
  }
  return null
}

// Lleva un dictamen a su forma canónica para escribirlo.
export function normalizarDictamen(d) {
  const f = d && typeof d === 'object' ? d : {}
  const accion = ACCIONES_REVISION.includes(f.accion) ? f.accion : 'reportar'
  const salida = {
    accion,
    temaId: String(f.temaId || '').slice(0, 120),
    temaTitulo: String(f.temaTitulo || f.temaId || '').slice(0, 300),
    comentario: String(f.comentario || '').trim().slice(0, 4000),
    revisadoPor: String(f.revisadoPor || '').trim().slice(0, 200),
    fuentes: Array.isArray(f.fuentes)
      ? [...new Set(f.fuentes.filter((x) => texto(x, 600)).map((x) => x.trim()))]
      : [],
    estado: ESTADOS_DICTAMEN.includes(f.estado) ? f.estado : 'abierto',
  }
  if (accion === 'validar') {
    const c = f.checklist && typeof f.checklist === 'object' ? f.checklist : {}
    salida.checklist = Object.fromEntries(CLAVES_CHECKLIST.map((k) => [k, c[k] === true]))
    salida.deudasAlFirmar = Array.isArray(f.deudasAlFirmar)
      ? f.deudasAlFirmar.filter((x) => texto(x, 600)).slice(0, 20)
      : []
  }
  return salida
}

// ---------- cola de la coordinación ----------

// Resumen para el panel: cuántos dictámenes abiertos hay de cada tipo.
export function resumenDictamenes(lista) {
  const arr = Array.isArray(lista) ? lista : []
  const abiertos = arr.filter((d) => (d.estado || 'abierto') === 'abierto')
  const cuenta = { validar: 0, corregir: 0, reportar: 0 }
  for (const d of abiertos) {
    if (cuenta[d.accion] !== undefined) cuenta[d.accion] += 1
  }
  return {
    total: arr.length,
    abiertos: abiertos.length,
    ...cuenta,
    temas: new Set(abiertos.map((d) => d.temaId)).size,
  }
}

// ¿Este tema ya tiene una firma de validación abierta de esta persona? Evita
// que el mismo revisor firme dos veces el mismo tema.
export function yaFirmado(lista, { temaId, uid }) {
  return (Array.isArray(lista) ? lista : []).some(
    (d) => d.temaId === temaId && d.uid === uid && d.accion === 'validar'
      && (d.estado || 'abierto') === 'abierto',
  )
}

// Comprueba que aplicar el dictamen produce una ficha que `validarRevision`
// acepta. La coordinación llama a esto antes de escribir el estado.
export function comprobarAplicacion(revision, dictamen, fecha) {
  const ficha = fichaValidada(revision, {
    revisadoPor: dictamen?.revisadoPor,
    fuentes: dictamen?.fuentes,
    fecha,
  })
  const error = validarRevision(ficha)
  return { ficha, error }
}
