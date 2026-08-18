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
//  POR QUÉ VALIDAR NO CAMBIA EL ESTADO DE UN CLIC
//
//  `CLAUDE.md` §5.2 y §16 exigen que `validado` y `publicado` los otorgue una
//  persona con nombre y con fuentes trazables, y que el banco de examen solo
//  tome reactivos de temas avalados. Un botón que ascendiera el tema al instante
//  metería contenido en los exámenes con un clic y sin trazabilidad. Por eso el
//  dictamen se REGISTRA firmado y la coordinación lo aplica: dos manos, no una.
//  `validarFirmaValidacion` comprueba, antes de dejar firmar, exactamente lo que
//  `validarRevision` exigirá después al ascender el estado.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
//
//  Doc: usuarios/{uid}.revisorTemporal = { hasta, otorgadoPor, otorgadoEn, nota }
//  Doc: dictamenes/{id} = { temaId, accion, comentario, revisadoPor, fuentes,
//                           uid, academiaId, estado, fecha }
// ============================================================

import { validarRevision, ESTADOS_QUE_EXIGEN_REVISOR } from './estadoEditorial.js'

// Las tres acciones que ofrece la barra de revisión de cada tema.
export const ACCIONES_REVISION = ['validar', 'corregir', 'reportar']

export const ETIQUETA_ACCION = {
  validar: 'Validar',
  corregir: 'Corregir',
  reportar: 'Reportar',
}

export const DESCRIPCION_ACCION = {
  validar: 'Firmo que este tema es correcto y está respaldado por sus fuentes.',
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

// Los cuatro puntos que el revisor confirma al validar. No son decorativos: son
// los controles que el mandato editorial exige tema por tema, y firmarlos
// convierte un clic en un acto defendible.
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
 * ¿Puede firmarse la validación de este tema? Comprueba por adelantado lo mismo
 * que `validarRevision` exigirá al ascender el estado a `validado`, para que el
 * revisor no firme algo que después se rechazará.
 *
 * Devuelve { ok, motivo, deudas }.
 */
export function validarFirmaValidacion({ revision, revisadoPor, fuentes, checklist } = {}) {
  const deudas = deudasDeclaradas(revision)
  if (!texto(revisadoPor, 200)) {
    return { ok: false, motivo: 'Firma con tu nombre o tu cargo: un tema validado necesita responsable.', deudas }
  }
  const lista = Array.isArray(fuentes) ? fuentes.filter((f) => texto(f, 600)) : []
  if (lista.length === 0) {
    return { ok: false, motivo: 'Un tema validado necesita al menos una fuente trazable.', deudas }
  }
  if (!checklistCompleta(checklist)) {
    return { ok: false, motivo: 'Confirma los cuatro puntos de la lista antes de firmar.', deudas }
  }
  return { ok: true, motivo: null, deudas }
}

// Ficha de revisión resultante de aplicar una firma de validación. NO se
// escribe desde la barra del tema: la produce la coordinación al aplicar el
// dictamen, y pasa por `validarRevision` antes de guardarse.
export function fichaValidada(revision, { revisadoPor, fuentes, fecha, estado = 'validado' } = {}) {
  if (!ESTADOS_QUE_EXIGEN_REVISOR.includes(estado)) {
    throw new Error(`Estado no válido para una firma de validación: "${estado}".`)
  }
  const base = revision && typeof revision === 'object' ? revision : {}
  const previas = Array.isArray(base.fuentes) ? base.fuentes : []
  const nuevas = Array.isArray(fuentes) ? fuentes.filter((f) => texto(f, 600)) : []
  return {
    ...base,
    estado,
    revisadoPor: String(revisadoPor || '').trim().slice(0, 200),
    actualizado: String(fecha || '').slice(0, 10),
    fuentes: [...new Set([...previas, ...nuevas])],
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
