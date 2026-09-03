// ============================================================
//  Horario de los grupos — lógica PURA
// ------------------------------------------------------------
//  QUÉ PROBLEMA RESUELVE. Las academias no dan clase de lunes a viernes a la
//  misma hora: unos grupos son de miércoles, otros de sábado y domingo, y cada
//  uno tiene su turno. Sin esa información, una lista de grupos es un montón
//  plano y quien entra tiene que acordarse de cuál es el suyo hoy.
//
//  Con ella se puede hacer lo único que de verdad ahorra clics: **enseñar
//  primero el grupo que tiene clase AHORA**.
//
//  DECISIONES QUE ESTE MÓDULO TOMA, dichas para que se puedan discutir:
//
//   · **El turno se deriva, no se guarda.** Un grupo que empieza antes de las
//     12:00 es matutino y el resto vespertino. Guardarlo como campo aparte
//     crearía dos verdades que se contradicen en cuanto alguien cambie la hora
//     y olvide el turno. Si la academia necesita un corte distinto, se cambia
//     aquí y cambia en todas partes.
//   · **La generación también ordena, no solo etiqueta.** Ya existía en el
//     documento del grupo como `{numero, anio}`; aquí se usa para agrupar y se
//     ordena de la más reciente a la más antigua, que es el orden en que se
//     buscan.
//   · **Nada de esto decide acceso.** El horario organiza la pantalla; quién
//     puede ver qué lo siguen decidiendo el rol, `programaId` y las reglas.
//     Un grupo fuera de horario no se oculta: se ordena más abajo.
//
//  TODO ES PURO: no toca Firestore, no lee el reloj por su cuenta —la fecha se
//  pasa siempre como argumento— y por eso se puede probar sin red y sin
//  esperar a que sea miércoles.
// ============================================================

// Días de la semana, en el orden en que se leen y con el índice de
// `Date.getDay()` (0 = domingo) para poder cruzarlos con una fecha real.
export const DIAS = [
  { id: 'lunes', indice: 1, etiqueta: 'Lunes', corta: 'L' },
  { id: 'martes', indice: 2, etiqueta: 'Martes', corta: 'M' },
  { id: 'miercoles', indice: 3, etiqueta: 'Miércoles', corta: 'X' },
  { id: 'jueves', indice: 4, etiqueta: 'Jueves', corta: 'J' },
  { id: 'viernes', indice: 5, etiqueta: 'Viernes', corta: 'V' },
  { id: 'sabado', indice: 6, etiqueta: 'Sábado', corta: 'S' },
  { id: 'domingo', indice: 0, etiqueta: 'Domingo', corta: 'D' },
]

const POR_ID = new Map(DIAS.map((d) => [d.id, d]))
const POR_INDICE = new Map(DIAS.map((d) => [d.indice, d]))

// El corte entre turnos. Está aquí y en un solo sitio a propósito.
export const HORA_CORTE_TURNO = '12:00'

// --- horas ------------------------------------------------------------------

// 'HH:MM' → minutos desde medianoche. `null` si no es una hora válida: se
// prefiere no saber la hora a inventarse una.
export function minutosDeHora(hhmm) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || '').trim())
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (h > 23 || min > 59) return null
  return h * 60 + min
}

export function horaDeMinutos(minutos) {
  if (typeof minutos !== 'number' || minutos < 0 || minutos > 24 * 60) return ''
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/**
 * Horario normalizado de un grupo, tolerante a lo que haya en el documento.
 *
 * Un grupo sin horario NO es un error: es un grupo al que todavía no se lo han
 * puesto, y la pantalla tiene que poder decirlo en vez de romperse.
 */
export function normalizarHorario(grupo) {
  const h = grupo?.horario || {}
  const inicio = minutosDeHora(h.inicio) === null ? '' : String(h.inicio).trim()
  const fin = minutosDeHora(h.fin) === null ? '' : String(h.fin).trim()
  const dias = (Array.isArray(h.dias) ? h.dias : [])
    .map((d) => String(d).trim().toLowerCase())
    .filter((d) => POR_ID.has(d))
  // Sin duplicados y en el orden de la semana, no en el que se pulsaron.
  const unicos = DIAS.filter((d) => dias.includes(d.id)).map((d) => d.id)
  return {
    inicio,
    fin,
    dias: unicos,
    fechaInicio: /^\d{4}-\d{2}-\d{2}$/.test(String(h.fechaInicio || '')) ? h.fechaInicio : '',
    completo: Boolean(inicio && fin && unicos.length > 0),
  }
}

export function turnoDe(horario) {
  const inicio = minutosDeHora(horario?.inicio)
  if (inicio === null) return null
  return inicio < minutosDeHora(HORA_CORTE_TURNO) ? 'matutino' : 'vespertino'
}

export const ETIQUETA_TURNO = { matutino: 'Matutino', vespertino: 'Vespertino' }

/** «Miércoles · 08:00-14:00» — lo que se pinta en la tarjeta. */
export function resumenDeHorario(grupo) {
  const h = normalizarHorario(grupo)
  if (!h.completo) return 'Sin horario configurado'
  const dias = h.dias.map((d) => POR_ID.get(d).etiqueta).join(', ')
  return `${dias} · ${h.inicio}-${h.fin}`
}

// --- ¿tiene clase ahora? ----------------------------------------------------

/**
 * Estado del grupo respecto de un momento concreto.
 *
 * La fecha se PASA, nunca se lee del reloj aquí dentro: es lo que permite
 * probar un sábado a las nueve sin esperar al sábado.
 *
 * @returns {{estado: string, etiqueta: string, orden: number}}
 *   'en-clase' · 'hoy-antes' · 'hoy-despues' · 'otro-dia' · 'sin-horario' ·
 *   'no-empieza-aun'
 */
export function estadoDeClase(grupo, fecha = new Date()) {
  const h = normalizarHorario(grupo)
  if (!h.completo) return { estado: 'sin-horario', etiqueta: 'Sin horario', orden: 5 }

  // Un grupo cuyo curso todavía no ha empezado no puede estar «en clase»,
  // aunque hoy caiga en uno de sus días.
  if (h.fechaInicio && fechaISO(fecha) < h.fechaInicio) {
    return { estado: 'no-empieza-aun', etiqueta: `Empieza el ${h.fechaInicio}`, orden: 4 }
  }

  const hoy = POR_INDICE.get(fecha.getDay())
  if (!hoy || !h.dias.includes(hoy.id)) {
    return { estado: 'otro-dia', etiqueta: resumenDeHorario(grupo), orden: 3 }
  }

  const ahora = fecha.getHours() * 60 + fecha.getMinutes()
  const inicio = minutosDeHora(h.inicio)
  const fin = minutosDeHora(h.fin)
  if (ahora < inicio) return { estado: 'hoy-antes', etiqueta: `Hoy a las ${h.inicio}`, orden: 1 }
  if (ahora > fin) return { estado: 'hoy-despues', etiqueta: `Hoy terminó a las ${h.fin}`, orden: 2 }
  return { estado: 'en-clase', etiqueta: `En clase ahora · hasta las ${h.fin}`, orden: 0 }
}

export const enClaseAhora = (grupo, fecha = new Date()) =>
  estadoDeClase(grupo, fecha).estado === 'en-clase'

// Fecha local en formato ISO corto. `toISOString()` no vale: pasa a UTC y en
// México adelanta el día a partir de las 18:00.
export function fechaISO(fecha = new Date()) {
  const y = fecha.getFullYear()
  const m = String(fecha.getMonth() + 1).padStart(2, '0')
  const d = String(fecha.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Ordena los grupos poniendo delante los que tienen clase ahora.
 *
 * Es el orden que hace que la pantalla sirva: quien entra un sábado por la
 * mañana encuentra arriba el grupo al que le está dando clase.
 */
export function ordenarPorClase(grupos, fecha = new Date()) {
  return [...(grupos || [])]
    .map((g) => ({ g, e: estadoDeClase(g, fecha) }))
    .sort((a, b) => a.e.orden - b.e.orden
      || String(a.g.nombre || '').localeCompare(String(b.g.nombre || ''), 'es'))
    .map(({ g }) => g)
}

// --- generaciones -----------------------------------------------------------

export function etiquetaDeGeneracion(generacion) {
  const numero = generacion?.numero
  const anio = generacion?.anio
  if (!numero && !anio) return 'Sin generación'
  if (numero && anio) return `Generación ${numero} · ${anio}`
  return numero ? `Generación ${numero}` : `Generación ${anio}`
}

/**
 * Agrupa por generación, de la más reciente a la más antigua.
 *
 * «Sin generación» va SIEMPRE al final, no por orden alfabético: son los grupos
 * a los que les falta el dato, y enterrarlos entre los demás es la forma de que
 * nadie los complete nunca.
 */
export function agruparPorGeneracion(grupos, fecha = new Date()) {
  const mapa = new Map()
  for (const g of grupos || []) {
    const clave = `${g.generacion?.anio || 0}|${g.generacion?.numero || 0}`
    if (!mapa.has(clave)) {
      mapa.set(clave, { clave, generacion: g.generacion || null, etiqueta: etiquetaDeGeneracion(g.generacion), grupos: [] })
    }
    mapa.get(clave).grupos.push(g)
  }
  return [...mapa.values()]
    .map((x) => ({ ...x, grupos: ordenarPorClase(x.grupos, fecha) }))
    .sort((a, b) => {
      const sinA = !a.generacion?.anio && !a.generacion?.numero
      const sinB = !b.generacion?.anio && !b.generacion?.numero
      if (sinA !== sinB) return sinA ? 1 : -1
      return (b.generacion?.anio || 0) - (a.generacion?.anio || 0)
        || (b.generacion?.numero || 0) - (a.generacion?.numero || 0)
    })
}

// --- qué ve cada rol --------------------------------------------------------

export const esActivo = (g) => (g?.estado || 'activo') === 'activo'

/**
 * Los grupos que se le ofrecen a alguien, ya separados como los va a leer.
 *
 * · Profesor: SOLO los activos, y solo los suyos. Un profesor no elige entre
 *   grupos que no lleva, y un grupo desactivado no es una opción: si aparece,
 *   entra por error y no entiende por qué no puede hacer nada.
 * · Director y super-admin: todos, pero en dos bloques separados. Necesitan
 *   ver los inactivos —consultar calificaciones de un grupo que terminó es
 *   parte del trabajo— y a la vez no tropezar con ellos al buscar el de hoy.
 *
 * @returns {{activos: Array, inactivos: Array, verInactivos: boolean}}
 *   `activos` e `inactivos` vienen agrupados por generación.
 */
export function gruposParaElegir({ grupos, rol, uid, esSuperadmin = false, fecha = new Date() }) {
  const todos = grupos || []
  const mando = esSuperadmin || rol === 'admin_escuela'

  const suyos = mando
    ? todos
    : todos.filter((g) => sonSuyos(g, uid))

  const activos = suyos.filter(esActivo)
  const inactivos = mando ? suyos.filter((g) => !esActivo(g)) : []

  return {
    activos: agruparPorGeneracion(activos, fecha),
    inactivos: agruparPorGeneracion(inactivos, fecha),
    verInactivos: mando,
    total: activos.length + inactivos.length,
  }
}

/**
 * ¿Este grupo es de este profesor?
 *
 * Se mira el titular Y la lista del propio usuario, y ninguna de las dos manda
 * sobre la otra: `profesorTitular` dice quién responde del grupo, y `grupoIds`
 * del usuario dice con cuáles trabaja —un profesor puede cubrir a otro sin ser
 * su titular—. Exigir las dos dejaría fuera al suplente; exigir solo una
 * dejaría fuera al titular recién asignado.
 */
export function sonSuyos(grupo, uid, grupoIdsDelUsuario = null) {
  if (!uid) return false
  if (grupo?.profesorTitular === uid) return true
  if (Array.isArray(grupoIdsDelUsuario)) return grupoIdsDelUsuario.includes(grupo?.id)
  return Array.isArray(grupo?.profesores) && grupo.profesores.includes(uid)
}

// --- choques de horario -----------------------------------------------------

/**
 * Grupos del MISMO profesor que se solapan en día y hora.
 *
 * «Un maestro no da clase a dos grupos a la misma hora» es una regla del mundo
 * real, y por eso aquí no se impide: se DETECTA. Bloquear el guardado obligaría
 * a deshacer una asignación para poder arreglar la otra, y las academias
 * reorganizan horarios a media semana. Lo que hace falta es que quien lo esté
 * configurando lo vea.
 */
export function choquesDeHorario(grupos) {
  const activos = (grupos || []).filter((g) => esActivo(g) && normalizarHorario(g).completo && g.profesorTitular)
  const choques = []
  for (let i = 0; i < activos.length; i += 1) {
    for (let j = i + 1; j < activos.length; j += 1) {
      const a = activos[i]
      const b = activos[j]
      if (a.profesorTitular !== b.profesorTitular) continue
      const dias = diasCompartidos(a, b)
      if (dias.length && seSolapan(a, b)) {
        choques.push({ profesor: a.profesorTitular, grupos: [a, b], dias })
      }
    }
  }
  return choques
}

function diasCompartidos(a, b) {
  const da = normalizarHorario(a).dias
  const db = new Set(normalizarHorario(b).dias)
  return da.filter((d) => db.has(d))
}

function seSolapan(a, b) {
  const ha = normalizarHorario(a)
  const hb = normalizarHorario(b)
  // Se tocan por el borde (uno termina cuando el otro empieza) y eso NO es un
  // choque: es un turno seguido de otro, que pasa constantemente.
  return minutosDeHora(ha.inicio) < minutosDeHora(hb.fin)
    && minutosDeHora(hb.inicio) < minutosDeHora(ha.fin)
}

// --- validación para el formulario ------------------------------------------

/**
 * Qué está mal en un horario, en palabras que se puedan enseñar.
 *
 * Devuelve una lista vacía cuando se puede guardar. El horario INCOMPLETO no es
 * un error: un grupo puede existir antes de que se decida su horario, y obligar
 * a rellenarlo para poder crearlo pondría fechas inventadas en la base de datos.
 */
export function problemasDeHorario(horario) {
  const problemas = []
  const inicio = minutosDeHora(horario?.inicio)
  const fin = minutosDeHora(horario?.fin)
  const dias = Array.isArray(horario?.dias) ? horario.dias : []

  if (horario?.inicio && inicio === null) problemas.push('La hora de inicio no tiene el formato HH:MM.')
  if (horario?.fin && fin === null) problemas.push('La hora de fin no tiene el formato HH:MM.')
  if (inicio !== null && fin !== null && fin <= inicio) {
    problemas.push('La clase no puede terminar antes de empezar.')
  }
  if ((inicio !== null || fin !== null) && dias.length === 0) {
    problemas.push('Elige al menos un día de clase.')
  }
  if (dias.length > 0 && (inicio === null || fin === null)) {
    problemas.push('Pon la hora de inicio y la de fin.')
  }
  if (horario?.fechaInicio && !/^\d{4}-\d{2}-\d{2}$/.test(horario.fechaInicio)) {
    problemas.push('La fecha de inicio no tiene el formato AAAA-MM-DD.')
  }
  return problemas
}
