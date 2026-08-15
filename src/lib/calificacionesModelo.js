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
    // Fecha de ENTREGA (la del alumno), distinta de `fecha` (cuando se creo).
    fechaEntrega: ev?.fechaEntrega || null,
    // Material o instrucciones. La escribe una persona, asi que quien la pinte
    // debe pasarla por hrefSeguro: nunca va directa a un href.
    enlace: String(ev?.enlace || ''),
    // Ponderación 1 por defecto: sin ella, todas pesan igual, que es lo que
    // espera quien no configuró nada.
    ponderacion: Number.isFinite(pond) && pond > 0 ? pond : 1,
    escala: Number(ev?.escala) > 0 ? Number(ev.escala) : ESCALA,
  }
}

// Estado de UNA actividad para UN alumno. El maestro crea la actividad para
// todo el grupo y la califica uno por uno, así que cada alumno la ve en un
// momento distinto de su vida: por entregar, vencida sin nota, o ya calificada.
//
// `ahora` entra por parámetro para que «vence mañana» sea comprobable sin
// depender del reloj de la máquina.
export function estadoDeActividad(evaluacion, calificacion, ahora = Date.now()) {
  const valor = Number(calificacion?.valor)
  if (Number.isFinite(valor)) {
    return { estado: 'calificada', valor, dias: null, aprobado: valor >= APROBADO }
  }
  const seg = evaluacion?.fechaEntrega?.seconds
  if (!seg) return { estado: 'sin-fecha', valor: null, dias: null, aprobado: false }
  const dias = Math.ceil((seg * 1000 - ahora) / 86400000)
  // Vencida = pasó la fecha y sigue sin nota. No se dice «vencida» de algo ya
  // calificado: entregar tarde y que te califiquen es un final normal.
  return { estado: dias < 0 ? 'vencida' : 'pendiente', valor: null, dias, aprobado: false }
}

// Cómo se lee el plazo. Aquí y no en el componente para poder probarlo: es lo
// que el alumno mira para decidir qué hace hoy.
export function textoDePlazo(estado) {
  if (estado.estado === 'calificada') return ''
  if (estado.estado === 'sin-fecha') return 'Sin fecha de entrega'
  const d = estado.dias
  if (d < 0) return d === -1 ? 'Venció ayer' : `Venció hace ${Math.abs(d)} días`
  if (d === 0) return 'Vence hoy'
  if (d === 1) return 'Vence mañana'
  return `Vence en ${d} días`
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

// Retrato POR GRUPOS, que es lo que mira quien dirige: el maestro necesita ver
// a sus alumnos uno por uno, y el director necesita comparar grupos y saber
// dónde mirar. Son dos preguntas distintas y por eso son dos funciones.
//
// Cada grupo se evalúa con LAS EVALUACIONES QUE LE APLICAN: las suyas más las
// de toda la academia. Meterle las de otro grupo le inventaría pendientes que
// no le corresponden.
export function resumenPorGrupos(evaluaciones, alumnos, indice, grupos) {
  const filas = (grupos || []).map((g) => {
    const suyos = (alumnos || []).filter((a) => a?.grupoId === g.id)
    const suyas = (evaluaciones || []).filter((e) => !e.grupoId || e.grupoId === g.id)
    const r = resumenDelGrupo(suyas, suyos, indice)
    return {
      grupo: g,
      alumnos: suyos.length,
      evaluaciones: suyas.length,
      promedio: r.promedio,
      enRiesgo: r.enRiesgo.length,
      sinNota: r.sinNota.length,
      pendientes: r.pendientesTotal,
    }
  })
  // Sin grupo no es un caso raro: alguien recién inscrito todavía no lo tiene, y
  // si no aparece aquí desaparece de la vista del director sin avisar.
  const sueltos = (alumnos || []).filter((a) => !a?.grupoId)
  if (sueltos.length > 0) {
    const globales = (evaluaciones || []).filter((e) => !e.grupoId)
    const r = resumenDelGrupo(globales, sueltos, indice)
    filas.push({
      grupo: { id: '', nombre: 'Sin grupo' },
      alumnos: sueltos.length,
      evaluaciones: globales.length,
      promedio: r.promedio,
      enRiesgo: r.enRiesgo.length,
      sinNota: r.sinNota.length,
      pendientes: r.pendientesTotal,
    })
  }
  return filas
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
