// ============================================================
//  Asistencia de mostrador — el check-in que sustituye a la firma en papel
// ------------------------------------------------------------
//  TRES DECISIONES DE DISEÑO, y el motivo de cada una. Las tres vienen del
//  trabajo O3 del plan técnico y se escriben aquí porque es donde se aplican.
//
//  1. «EN CLASE» SE DERIVA, NO SE GUARDA.
//     Un booleano `enClase` exigiría un proceso que lo apague al acabar la
//     jornada, y en plan Spark no hay ni TTL ni cron: alguien se quedaría «en
//     clase» para siempre. Se guarda `inicio` y `expira`, y estar en clase es
//     `expira > ahora`. No cuesta nada y no se puede desincronizar.
//
//  2. UNA ASISTENCIA POR PERSONA Y DÍA, con id determinista.
//     El plan preguntaba qué pasa si alguien hace check-in dos veces el mismo
//     día. La respuesta más barata es que no pueda: el id es
//     `{uid}__{AAAA-MM-DD}`, así que el segundo check-in ESCRIBE ENCIMA del
//     primero en vez de crear un duplicado. Es el mismo patrón que
//     `idCalificacion` en el libro de calificaciones, y por el mismo motivo:
//     un duplicado no se detecta mirando, se detecta cuadrando a fin de mes.
//     Como consecuencia, el segundo pase RENUEVA la vigencia; se avisa en
//     pantalla para que quien lo pulsa sepa que no está apuntando dos veces.
//
//  3. UNA CLASE QUE CRUZA MEDIANOCHE SIGUE VIGENTE.
//     La vigencia la decide `expira`, que es una marca de tiempo absoluta, así
//     que una clase de 22:00 sigue contando a la 01:00. Lo que no cambia es el
//     DÍA al que pertenece el documento: el del inicio. Si se contara por el
//     día en curso, el mismo turno aparecería partido en dos fechas.
//
//  El reloj SIEMPRE entra como argumento: por eso esto se puede probar sin
//  esperar a que sean las ocho de la tarde.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================

// Cuánto dura un pase de entrada. Está aquí y en un solo sitio: el día que la
// academia diga «hasta el fin de la jornada» se cambia este número o se le pasa
// otro a `expiraDe`, y cambia en toda la aplicación.
export const HORAS_VIGENCIA = 8

const MS_HORA = 60 * 60 * 1000

/** Medios por los que se puede registrar una entrada. */
export const MEDIOS = [
  { id: 'manual', etiqueta: 'Mostrador' },
  { id: 'codigo', etiqueta: 'Credencial' },
]

/** Una fecha, venga como sea (Date, Timestamp de Firestore, número o texto). */
export function comoFecha(valor) {
  if (!valor) return null
  if (valor instanceof Date) return Number.isNaN(valor.getTime()) ? null : valor
  // Timestamp de Firestore, sin importar el SDK.
  if (typeof valor?.toDate === 'function') {
    try { return valor.toDate() } catch { return null }
  }
  if (typeof valor?.seconds === 'number') return new Date(valor.seconds * 1000)
  const d = new Date(valor)
  return Number.isNaN(d.getTime()) ? null : d
}

/** `AAAA-MM-DD` en hora LOCAL. La jornada de una academia es local, no UTC. */
export function claveDeDia(fecha) {
  const d = comoFecha(fecha) || new Date(NaN)
  if (Number.isNaN(d.getTime())) return ''
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

/** El id del documento. Determinista: dos pases el mismo día son el mismo. */
export function idAsistencia(uid, fecha) {
  if (!uid) return null
  const dia = claveDeDia(fecha)
  return dia ? `${uid}__${dia}` : null
}

/** Cuándo caduca un pase que empezó a esta hora. */
export function expiraDe(inicio, horas = HORAS_VIGENCIA) {
  const d = comoFecha(inicio)
  if (!d) return null
  return new Date(d.getTime() + horas * MS_HORA)
}

/** ¿Está dentro? Se DERIVA de la marca de tiempo (ver decisión 1 arriba). */
export function enClase(asistencia, ahora = new Date()) {
  const expira = comoFecha(asistencia?.expira)
  const ref = comoFecha(ahora)
  if (!expira || !ref) return false
  return expira.getTime() > ref.getTime()
}

/** Cuánto le queda de vigencia, en minutos. 0 si ya caducó. */
export function minutosRestantes(asistencia, ahora = new Date()) {
  const expira = comoFecha(asistencia?.expira)
  const ref = comoFecha(ahora)
  if (!expira || !ref) return 0
  return Math.max(0, Math.round((expira.getTime() - ref.getTime()) / 60000))
}

/** La asistencia de HOY dentro de una lista, si la hay. */
export function asistenciaDeHoy(lista, ahora = new Date()) {
  const hoy = claveDeDia(ahora)
  return (lista || []).find((a) => claveDeDia(a?.inicio) === hoy) || null
}

/**
 * Qué impide registrar la entrada, dicho en frases.
 *
 * Igual que `problemasDelAlta`: quien está en un mostrador necesita saber QUÉ
 * falta, no que «hay errores».
 */
export function problemasDelCheckin({ alumno, academiaId } = {}) {
  const p = []
  if (!academiaId) p.push('Falta la academia.')
  if (!alumno?.uid && !alumno?.id) p.push('Esta persona todavía no ha activado su cuenta: no se le puede registrar la entrada.')
  if (alumno?.estado && alumno.estado !== 'activo') p.push('Su cuenta no está activa. Habla con la dirección antes de dejarle pasar.')
  return p
}

/**
 * El documento de asistencia, listo para guardar.
 *
 * `inicio` y `expira` se calculan aquí y no con `serverTimestamp()` a
 * propósito: `expira` tiene que ser `inicio + 8 h`, y con dos marcas de
 * servidor independientes no hay forma de garantizar esa relación. La hora del
 * mostrador puede ir un minuto desviada; que la vigencia sea exactamente ocho
 * horas importa más.
 */
export function checkinParaGuardar({ alumno, academiaId, registradoPor, medio = 'manual', ahora = new Date(), horas = HORAS_VIGENCIA }) {
  const inicio = comoFecha(ahora) || new Date()
  return {
    uid: alumno?.uid || alumno?.id || null,
    academiaId,
    grupoId: alumno?.grupoId || null,
    matricula: alumno?.matricula || null,
    nombre: String(alumno?.nombre || '').trim(),
    inicio,
    expira: expiraDe(inicio, horas),
    registradoPor: registradoPor || null,
    medio: MEDIOS.some((m) => m.id === medio) ? medio : 'manual',
  }
}

/**
 * Resumen para la ficha: cuántas entradas lleva, cuándo fue la última y si está
 * dentro ahora mismo.
 */
export function resumenDeAsistencia(lista, ahora = new Date()) {
  const ordenadas = (lista || [])
    .map((a) => ({ ...a, _inicio: comoFecha(a?.inicio) }))
    .filter((a) => a._inicio)
    .sort((a, b) => b._inicio - a._inicio)
  const hoy = asistenciaDeHoy(ordenadas, ahora)
  return {
    total: ordenadas.length,
    ultima: ordenadas[0] || null,
    hoy,
    dentro: enClase(hoy, ahora),
    minutos: minutosRestantes(hoy, ahora),
  }
}

/** Las asistencias agrupadas por día, de la más reciente a la más antigua. */
export function porDia(lista) {
  const mapa = new Map()
  for (const a of lista || []) {
    const dia = claveDeDia(a?.inicio)
    if (!dia) continue
    if (!mapa.has(dia)) mapa.set(dia, { dia, asistencias: [] })
    mapa.get(dia).asistencias.push(a)
  }
  return [...mapa.values()].sort((a, b) => b.dia.localeCompare(a.dia))
}

/** `2026-09-20` → `sábado, 20 de septiembre de 2026`. Para la hoja impresa. */
export function diaLargo(clave) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(clave || ''))
  if (!m) return String(clave || '')
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  return d.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

/** `14:35`. */
export function horaCorta(valor) {
  const d = comoFecha(valor)
  return d ? d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : ''
}
