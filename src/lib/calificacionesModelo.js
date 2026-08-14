// ============================================================
//  Libro de calificaciones — lógica PURA
// ------------------------------------------------------------
//  Se califican EVALUACIONES QUE CREA EL MAESTRO (un examen presencial, una
//  práctica, un trabajo), no las fases del temario. Y van SEPARADAS de los
//  `intentos` de la app: un intento es repetible a voluntad, así que mezclarlos
//  en el mismo promedio lo infla y deja de significar nada. Se muestran uno al
//  lado del otro, cada uno con su promedio.
//
//  Sin React y sin Firebase: se prueba con `npm test`. Aquí está TODA la
//  aritmética; los componentes no calculan nada.
//
//  La decisión que gobierna el resto: una evaluación SIN CALIFICAR no vale cero.
//  Un cero es una nota, y darla sola por no haber calificado todavía hunde el
//  promedio de un alumno al día. Las sin calificar se cuentan aparte y se
//  informan; el promedio sale solo de lo calificado.
// ============================================================

export const ESCALA = 100
export const APROBADO = 70

// Id determinista: una nota por alumno y evaluación, sin duplicados posibles
// aunque se pulse dos veces. Mismo patrón que `solicitudesAcceso`.
export function idCalificacion(evaluacionId, uid) {
  if (!evaluacionId || !uid) return null
  return `${evaluacionId}__${uid}`
}

// Valida el valor de una nota ANTES de escribirla. La regla de Firestore impone
// lo mismo en el servidor; esto existe para no ofrecer lo que va a rechazar.
export function validarValor(valor) {
  if (valor === '' || valor === null || valor === undefined) return 'Escribe una calificación.'
  const n = Number(valor)
  if (!Number.isFinite(n)) return 'La calificación debe ser un número.'
  if (!Number.isInteger(n)) return 'La calificación debe ser un número entero.'
  if (n < 0 || n > ESCALA) return `La calificación va de 0 a ${ESCALA}.`
  return ''
}

// Normaliza una evaluación venida de Firestore. FAIL-OPEN: un dato corrupto cae
// a un valor razonable en vez de romper la tabla entera.
export function normalizarEvaluacion(ev) {
  const pond = Number(ev?.ponderacion)
  return {
    id: ev?.id || '',
    titulo: String(ev?.titulo || '').trim() || 'Sin título',
    descripcion: String(ev?.descripcion || ''),
    grupoId: ev?.grupoId || null,
    fecha: ev?.fecha || null,
    // Ponderación 1 por defecto: sin ella, todas pesan igual, que es lo que
    // espera quien no configuró nada.
    ponderacion: Number.isFinite(pond) && pond > 0 ? pond : 1,
    escala: Number(ev?.escala) > 0 ? Number(ev.escala) : ESCALA,
  }
}

// Índice { uid: { evaluacionId: calificacion } } para no recorrer la lista
// entera por cada celda de la tabla.
export function indexarCalificaciones(calificaciones) {
  const porAlumno = {}
  for (const c of calificaciones || []) {
    if (!c?.uid || !c?.evaluacionId) continue
    const suyas = (porAlumno[c.uid] = porAlumno[c.uid] || {})
    suyas[c.evaluacionId] = c
  }
  return porAlumno
}

// Promedio PONDERADO de un alumno sobre lo que tiene calificado.
// Devuelve { promedio, calificadas, pendientes, aprobado } y `promedio` es null
// si no tiene ni una nota (null y no 0: son cosas distintas y se pintan
// distinto).
export function promedioDeAlumno(uid, evaluaciones, indice) {
  const suyas = indice?.[uid] || {}
  let suma = 0
  let peso = 0
  let calificadas = 0
  let pendientes = 0
  for (const ev of evaluaciones || []) {
    const c = suyas[ev.id]
    const valor = Number(c?.valor)
    if (c && Number.isFinite(valor)) {
      suma += valor * ev.ponderacion
      peso += ev.ponderacion
      calificadas += 1
    } else {
      pendientes += 1
    }
  }
  const promedio = peso > 0 ? Math.round(suma / peso) : null
  return { promedio, calificadas, pendientes, aprobado: promedio !== null && promedio >= APROBADO }
}

// Resumen de UNA evaluación entre los alumnos dados.
export function resumenDeEvaluacion(evaluacion, alumnos, indice) {
  const valores = []
  let pendientes = 0
  for (const al of alumnos || []) {
    const valor = Number(indice?.[al.id]?.[evaluacion.id]?.valor)
    if (Number.isFinite(valor)) valores.push(valor)
    else pendientes += 1
  }
  const promedio = valores.length
    ? Math.round(valores.reduce((s, v) => s + v, 0) / valores.length)
    : null
  return {
    promedio,
    calificadas: valores.length,
    pendientes,
    aprobados: valores.filter((v) => v >= APROBADO).length,
  }
}

// Retrato del grupo: lo que mira el maestro de un vistazo.
export function resumenDelGrupo(evaluaciones, alumnos, indice) {
  const filas = (alumnos || []).map((al) => ({
    alumno: al,
    ...promedioDeAlumno(al.id, evaluaciones, indice),
  }))
  const conNota = filas.filter((f) => f.promedio !== null)
  const promedio = conNota.length
    ? Math.round(conNota.reduce((s, f) => s + f.promedio, 0) / conNota.length)
    : null
  return {
    filas,
    promedio,
    // «En riesgo» solo entre quien YA tiene alguna nota: alguien sin calificar
    // no está en riesgo, está sin evaluar, y confundirlos manda al maestro a
    // hablar con el alumno equivocado.
    enRiesgo: conNota.filter((f) => !f.aprobado),
    sinNota: filas.filter((f) => f.promedio === null),
    // Celdas de la tabla que faltan por rellenar, para poder decirlo arriba.
    pendientesTotal: filas.reduce((s, f) => s + f.pendientes, 0),
  }
}

// Lo que ve el ALUMNO en «Mi progreso»: sus notas, nunca las de otros.
export function misCalificaciones(uid, evaluaciones, calificaciones) {
  const indice = indexarCalificaciones(calificaciones)
  const lista = (evaluaciones || []).map((ev) => {
    const c = indice?.[uid]?.[ev.id]
    const valor = Number(c?.valor)
    return {
      evaluacion: ev,
      valor: Number.isFinite(valor) ? valor : null,
      nota: c?.nota || '',
      aprobado: Number.isFinite(valor) && valor >= APROBADO,
    }
  })
  return { lista, ...promedioDeAlumno(uid, evaluaciones, indice) }
}
