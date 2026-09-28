// ============================================================
//  PTEM Pulso — lógica pura del tablero de turno y del monitor de lección.
// ------------------------------------------------------------
//  Sin React ni Firebase: todo sale del índice ligero (que ya está en memoria)
//  y del progreso del alumno. Así se prueba con node --test y el tablero no
//  cuesta ninguna lectura de Firestore.
//
//  Tres metáforas, cada una con UNA tarea (ver docs/ux/PULSO.md):
//    · el TRAZO del monitor  → cuánto llevas de una lección;
//    · la etiqueta de TRIAGE → qué conviene estudiar hoy;
//    · la RUTA               → dónde vas dentro del módulo.
// ============================================================

// Referencia de práctica que ya usa el Quiz («el objetivo de esta
// autoevaluación es 70 % o más»). NO es el mínimo aprobatorio de la academia:
// ese sigue siendo una decisión abierta. Se reutiliza para no inventar otro.
export const REFERENCIA_QUIZ = 0.7

// Los 14 nodos de evaluación del plan (12 exámenes y 2 prácticas) se reconocen
// por su id. El índice ligero no trae el tipo, y cargar cada tema para saberlo
// costaría una lectura por tema. tests/pulsoModelo.test.mjs compara este
// patrón con el tipo real de la semilla oficial: si el plan cambia, la prueba
// avisa.
const PATRON_EVALUACION = /-(examen|parcial|practica|pra)-/

export function esEvaluacionPorId(temaId) {
  return PATRON_EVALUACION.test(String(temaId || ''))
}

// ---------- Trazo de monitor ----------

/**
 * Trazado SVG de un electrocardiograma con `latidos` complejos repartidos en
 * `ancho`. Cada complejo es una sección de la lección.
 */
export function trazoEcg(latidos, alto = 44, ancho = 800) {
  const n = Math.max(1, Math.floor(latidos) || 1)
  const w = ancho / n
  const b = alto * 0.62
  const p = (x, y) => `${+x.toFixed(2)} ${+y.toFixed(2)}`
  let d = `M${p(0, b)}`
  for (let i = 0; i < n; i++) {
    const x = i * w
    d += ` L${p(x + w * 0.30, b)} L${p(x + w * 0.36, b - alto * 0.16)} L${p(x + w * 0.42, b)}`
    d += ` L${p(x + w * 0.48, b + alto * 0.14)} L${p(x + w * 0.54, alto * 0.04)} L${p(x + w * 0.60, alto * 0.96)}`
    d += ` L${p(x + w * 0.66, b)} L${p(x + w * 0.78, b)} L${p(x + w * 0.86, b - alto * 0.12)}`
    d += ` L${p(x + w * 0.94, b)} L${p(x + w, b)}`
  }
  return d
}

// ---------- Posición de lectura ----------

// Cuántas lecciones recuerda el dispositivo. Es una comodidad para reanudar,
// no un historial: se recortan las más viejas.
export const LECTURAS_GUARDADAS = 40

/**
 * Registra que el alumno está en la sección `seccion` (0-based) de `temaId`.
 * `vistas` acumula las secciones que ya pasaron por pantalla. Devuelve el
 * nuevo mapa de lecturas, o el mismo objeto si nada cambió (para no provocar
 * renders ni escrituras inútiles).
 */
export function anotarLectura(lecturas = {}, temaId, seccion, total, ahora = Date.now()) {
  if (!temaId || !Number.isInteger(seccion) || !Number.isInteger(total) || total < 1) return lecturas
  const s = Math.max(0, Math.min(total - 1, seccion))
  const previa = lecturas[temaId]
  const vistas = new Set(previa?.total === total ? previa.vistas || [] : [])
  const antes = vistas.size
  vistas.add(s)
  if (previa && previa.seccion === s && previa.total === total && vistas.size === antes) return lecturas
  const siguiente = {
    ...lecturas,
    [temaId]: { seccion: s, total, vistas: [...vistas].sort((a, b) => a - b), fecha: ahora },
  }
  const ids = Object.keys(siguiente)
  if (ids.length <= LECTURAS_GUARDADAS) return siguiente
  ids.sort((a, b) => (siguiente[b].fecha || 0) - (siguiente[a].fecha || 0))
  return Object.fromEntries(ids.slice(0, LECTURAS_GUARDADAS).map((id) => [id, siguiente[id]]))
}

// ---------- Tablero ----------

function temasEstudiables(modulos = [], { bloqueados = {} } = {}) {
  const out = []
  for (const m of modulos) {
    for (const t of m.temas || []) {
      if (esEvaluacionPorId(t.id) || t.cerrado) continue
      if (bloqueados[t.id] === 'bloqueado_por_decision') continue
      out.push({ ...t, moduloId: m.id, moduloNumero: m.numero, moduloTitulo: m.titulo, moduloColor: m.color || '' })
    }
  }
  return out
}

/**
 * Lo que va en la tarjeta «Reanudar». Prioridad:
 *  1. la lección más reciente que dejó a medias (y que sigue visible);
 *  2. si no hay, el primer tema sin leer en orden de plan.
 * `modo` distingue el texto del botón: 'reanudar' | 'empezar' | 'terminado'.
 */
export function aReanudar({ modulos = [], leidos = {}, lecturas = {}, bloqueados = {} }) {
  const temas = temasEstudiables(modulos, { bloqueados })
  const porId = new Map(temas.map((t) => [t.id, t]))
  const aMedias = Object.entries(lecturas)
    .filter(([id, l]) => porId.has(id) && !leidos[id] && l && l.total > 0)
    .sort((a, b) => (b[1].fecha || 0) - (a[1].fecha || 0))
  if (aMedias.length) {
    const [id, l] = aMedias[0]
    return { modo: 'reanudar', tema: porId.get(id), lectura: l }
  }
  const pendiente = temas.find((t) => !leidos[t.id])
  if (pendiente) return { modo: 'empezar', tema: pendiente, lectura: lecturas[pendiente.id] || null }
  return { modo: 'terminado', tema: null, lectura: null }
}

/**
 * Triage de hoy con los datos que YA existen. No hay todavía repaso espaciado
 * (entrega 4), así que las tres etiquetas se definen con lo que se sabe:
 *  · rojo     — temas cuyo mejor quiz quedó bajo la referencia de práctica;
 *  · amarillo — temas sin leer del módulo en curso;
 *  · verde    — temas leídos con su quiz en la referencia o por encima.
 */
export function triageDeHoy({ modulos = [], leidos = {}, quizzes = {}, moduloEnCurso = null, bloqueados = {}, srs = {}, ahora = Date.now(), claveExtra = () => false }) {
  const temas = temasEstudiables(modulos, { bloqueados })
  const ratio = (q) => (q && q.total > 0 ? q.aciertos / q.total : null)
  const reforzar = temas.filter((t) => {
    const r = ratio(quizzes[t.id])
    return r !== null && r < REFERENCIA_QUIZ
  })
  const moduloId = moduloEnCurso || temas.find((t) => !leidos[t.id])?.moduloId || null
  const pendientes = temas.filter((t) => t.moduloId === moduloId && !leidos[t.id])
  const listos = temas.filter((t) => {
    const r = ratio(quizzes[t.id])
    return leidos[t.id] && r !== null && r >= REFERENCIA_QUIZ
  })
  const modulo = modulos.find((m) => m.id === moduloId) || null
  // Solo cuentan tarjetas de temas que el grupo tiene visibles.
  const visibles = new Set(temas.map((t) => t.id))
  // `claveExtra` admite tarjetas que no son de lecciones (las del entrenador
  // de farmacología, cuando el plan lo incluye).
  const vencidas = tarjetasVencidas(srs, ahora).filter((k) => visibles.has(k.split('#')[0]) || claveExtra(k)).length
  return {
    reforzar: { total: reforzar.length, primero: reforzar[0] || null, vencidas },
    pendientes: { total: pendientes.length, primero: pendientes[0] || null, modulo },
    listos: { total: listos.length },
  }
}

/**
 * Índice de la sección cuyo contenido incluye el bloque «Lo que más se
 * pregunta» del molde v2. Es un aviso `callout` con ese título dentro de una
 * sección de contenido. -1 si la lección no lo tiene.
 */
export function seccionLoQueMasSePregunta(secciones = []) {
  const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
  return secciones.findIndex((s) =>
    norm(s.titulo) === 'lo que mas se pregunta' ||
    (s.bloques || []).some((b) => b?.tipo === 'callout' && norm(b.titulo).startsWith('lo que mas se pregunta')))
}

/**
 * Punto del trazo para un avance continuo `progreso` (0 … latidos). Devuelve
 * coordenadas del viewBox, interpolando sobre los MISMOS vértices que dibuja
 * `trazoEcg`, así que el punto nunca se sale de la línea.
 */
export function puntoEnTrazo(latidos, progreso, alto = 44, ancho = 800) {
  const n = Math.max(1, Math.floor(latidos) || 1)
  const p = Math.max(0, Math.min(n, Number(progreso) || 0))
  const w = ancho / n
  const x = p * w
  const i = Math.min(n - 1, Math.floor(p))
  const b = alto * 0.62
  const f = [
    [0, b], [0.30, b], [0.36, b - alto * 0.16], [0.42, b], [0.48, b + alto * 0.14],
    [0.54, alto * 0.04], [0.60, alto * 0.96], [0.66, b], [0.78, b], [0.86, b - alto * 0.12],
    [0.94, b], [1, b],
  ]
  const local = (x - i * w) / w
  for (let k = 1; k < f.length; k++) {
    if (local <= f[k][0]) {
      const [x0, y0] = f[k - 1]
      const [x1, y1] = f[k]
      const t = x1 === x0 ? 0 : (local - x0) / (x1 - x0)
      return { x, y: y0 + (y1 - y0) * t }
    }
  }
  return { x, y: b }
}

/** Color del punto según el avance: del rojo del inicio al verde del final. */
export function colorDeAvance(fraccion) {
  const f = Math.max(0, Math.min(1, Number(fraccion) || 0))
  if (f < 0.34) return 'var(--urgencia)'
  if (f < 0.67) return 'var(--alerta)'
  if (f < 1) return 'var(--primario)'
  return 'var(--exito-solido)'
}

// ---------- Dominio por tema ----------

export const NIVELES_DOMINIO = ['Sin empezar', 'Expuesto', 'Reconoce', 'Aplica', 'Domina']

/**
 * Nivel de dominio de ESTUDIO (no competencia clínica):
 *  1 Expuesto  — marcó la lección como leída;
 *  2 Reconoce  — su mejor quiz alcanza la referencia;
 *  3 Aplica    — resolvió las actividades con la referencia al primer intento;
 *  4 Domina    — sus tarjetas se aciertan en repasos separados (intervalo ≥ 21 días).
 * Cada nivel exige el anterior.
 */
export function dominioDeTema({ leido = false, quiz = null, aplicada = null, tarjetas = [] } = {}) {
  const ok = (r) => r && r.total > 0 && r.aciertos / r.total >= REFERENCIA_QUIZ
  let nivel = 0
  if (leido) nivel = 1
  if (nivel === 1 && ok(quiz)) nivel = 2
  if (nivel === 2 && ok(aplicada)) nivel = 3
  if (nivel === 3 && tarjetas.length > 0 && tarjetas.every((t) => (t?.intervalo || 0) >= 21)) nivel = 4
  return nivel
}

// ---------- Repaso espaciado (SM-2 simplificado) ----------

const DIA = 24 * 60 * 60 * 1000

/** Clave estable de una tarjeta: tema + huella de su frente. */
export function claveTarjeta(temaId, frente) {
  let h = 0
  const s = String(frente || '')
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return `${temaId}#${(h >>> 0).toString(36)}`
}

/**
 * Próximo estado de una tarjeta tras calificarla.
 * calificacion: 0 otra vez · 1 difícil · 2 bien · 3 fácil.
 * `intervalo` en días; «otra vez» vuelve en 1 minuto dentro de la sesión.
 */
export function programarTarjeta(previo = null, calificacion, ahora = Date.now()) {
  const c = Math.max(0, Math.min(3, Math.floor(calificacion)))
  const facilidad0 = previo?.facilidad ?? 2.5
  const intervalo0 = previo?.intervalo ?? 0
  const facilidad = Math.max(1.3, Math.min(3, facilidad0 + [-0.3, -0.15, 0, 0.15][c]))
  let intervalo
  if (c === 0) intervalo = 0
  else if (intervalo0 === 0) intervalo = [0, 1, 3, 8][c]
  else intervalo = Math.max(1, Math.round(intervalo0 * [0, 1.2, facilidad, facilidad * 1.3][c]))
  const vence = c === 0 ? ahora + 60 * 1000 : ahora + intervalo * DIA
  return {
    intervalo, facilidad: +facilidad.toFixed(2), vence,
    repeticiones: (previo?.repeticiones || 0) + 1,
    fallos: (previo?.fallos || 0) + (c === 0 ? 1 : 0),
  }
}

/** Texto del botón: cuándo volvería la tarjeta con cada calificación. */
export function etiquetaIntervalo(previo, calificacion) {
  const { intervalo } = programarTarjeta(previo, calificacion, 0)
  if (intervalo === 0) return '1 min'
  return intervalo === 1 ? '1 día' : `${intervalo} días`
}

/** Claves de tarjetas ya vistas que vencieron. Las nuevas no cuentan. */
export function tarjetasVencidas(srs = {}, ahora = Date.now()) {
  return Object.entries(srs).filter(([, t]) => t && t.vence <= ahora).map(([k]) => k)
}

/**
 * Sesión de repaso: primero las vencidas, luego hasta `nuevas` nunca vistas.
 * `tarjetas` = [{ clave, ... }].
 */
export function sesionDeRepaso(tarjetas = [], srs = {}, { ahora = Date.now(), nuevas = 10 } = {}) {
  const vencidas = tarjetas.filter((t) => srs[t.clave] && srs[t.clave].vence <= ahora)
    .sort((a, b) => srs[a.clave].vence - srs[b.clave].vence)
  const sinVer = tarjetas.filter((t) => !srs[t.clave]).slice(0, Math.max(0, nuevas))
  return [...vencidas, ...sinVer]
}

/**
 * Nivel de dominio de un tema a partir del progreso, sin cargar la lección.
 * Para «Domina» se compara cuántas tarjetas del tema están consolidadas con
 * cuántas tiene (`nFlashcards`, que ya viene en la ficha del módulo).
 */
// Tarjetas del repaso agrupadas por tema. Se calcula UNA vez por objeto `srs`
// (WeakMap): sin esto, pintar el mapa de dominio recorría las ~3 000 tarjetas
// por cada uno de los 287 temas en cada render.
const _srsPorTema = new WeakMap()
export function srsPorTema(srs = {}) {
  if (!srs || typeof srs !== 'object') return new Map()
  let m = _srsPorTema.get(srs)
  if (m) return m
  m = new Map()
  for (const [k, v] of Object.entries(srs)) {
    const t = k.slice(0, k.lastIndexOf('#'))
    if (!m.has(t)) m.set(t, [])
    m.get(t).push(v)
  }
  _srsPorTema.set(srs, m)
  return m
}

export function nivelDeTema(temaId, estado = {}, nFlashcards = 0) {
  const tarjetas = srsPorTema(estado.srs || {}).get(temaId) || []
  const completas = nFlashcards > 0 && tarjetas.length >= nFlashcards
  return dominioDeTema({
    leido: Boolean(estado.leidos?.[temaId]),
    quiz: estado.quizzes?.[temaId],
    aplicada: estado.aplicadas?.[temaId],
    tarjetas: completas ? tarjetas : [],
  })
}

/**
 * El turno de hoy: las pocas tareas concretas que conviene hacer ahora, en
 * orden. Nunca más de cuatro: un turno largo no se empieza.
 */
export function turnoDeHoy({ reanudar = null, triage = null, quizzes = {} } = {}) {
  const tareas = []
  const vencidas = triage?.reforzar?.vencidas || 0
  if (vencidas > 0) {
    tareas.push({ id: 'repaso', texto: `Repasar ${vencidas} ${vencidas === 1 ? 'tarjeta vencida' : 'tarjetas vencidas'}`, a: '/flashcards' })
  }
  if (reanudar?.tema && reanudar.modo !== 'terminado') {
    const s = reanudar.modo === 'reanudar' ? reanudar.lectura.seccion : 0
    tareas.push({
      id: 'leccion',
      texto: `${reanudar.modo === 'reanudar' ? 'Terminar' : 'Empezar'} ${reanudar.tema.titulo}`,
      a: `/tema/${reanudar.tema.id}${s > 0 ? `?seccion=${s}` : ''}`,
    })
  }
  const reforzar = triage?.reforzar?.primero
  if (reforzar) tareas.push({ id: 'quiz', texto: `Reforzar el quiz de ${reforzar.titulo}`, a: `/tema/${reforzar.id}/quiz` })
  return tareas.slice(0, 4)
}

// ---------- Examen ----------

/**
 * Resultado de un examen entregado. `preguntas` ya barajadas (correcta como
 * arreglo) y `respuestas` = { índice: opción elegida }. `porTema` va de peor a
 * mejor, solo con los temas que tuvieron algún error: es la lista de repaso.
 */
export function resumenExamen(preguntas = [], respuestas = {}) {
  let aciertos = 0
  const temas = new Map()
  preguntas.forEach((p, k) => {
    const elegida = respuestas[k]
    const correctas = Array.isArray(p.correcta) ? p.correcta : [p.correcta]
    const ok = elegida !== undefined && correctas.includes(elegida)
    if (ok) aciertos += 1
    if (!p.temaId) return
    const t = temas.get(p.temaId) || { temaId: p.temaId, temaTitulo: p.temaTitulo || '', aciertos: 0, total: 0 }
    t.total += 1
    if (ok) t.aciertos += 1
    temas.set(p.temaId, t)
  })
  const porTema = [...temas.values()].filter((t) => t.aciertos < t.total)
    .sort((a, b) => a.aciertos / a.total - b.aciertos / b.total)
  return { aciertos, total: preguntas.length, sinResponder: preguntas.length - Object.keys(respuestas).length, porTema }
}

/** Mueve el elemento de la posición `desde` a `hasta`, recorriendo los demás. */
export function moverA(lista = [], desde, hasta) {
  if (desde === hasta || desde < 0 || hasta < 0 || desde >= lista.length || hasta >= lista.length) return lista
  const n = [...lista]
  const [x] = n.splice(desde, 1)
  n.splice(hasta, 0, x)
  return n
}
