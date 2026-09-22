// ============================================================
//  Matrículas de alumno — lógica PURA
// ------------------------------------------------------------
//  FORMATO VIGENTE, fijado por el dueño del producto el 21 de septiembre
//  de 2026. Siete dígitos sin separadores, y cada tramo significa algo:
//
//      GG  MM  D  NN        04 · 11 · 1 · 15   →   0411115
//      │   │   │  └── orden de llegada dentro de esa serie
//      │   │   └───── día de clase: 1 sábado · 2 domingo · 3 miércoles
//      │   └───────── mes en que empieza el grupo
//      └───────────── generación
//
//  LA MATRÍCULA LA DICE EL GRUPO, NO LA PERSONA. Los cuatro tramos salen del
//  documento del grupo —su generación, la fecha de inicio de su horario, su
//  día y su hora—, así que dos alumnos del mismo grupo solo se diferencian en
//  los dos últimos dígitos. Ese es el motivo por el que **cambiar de grupo
//  regenera la matrícula**: si no lo hiciera, el número diría que esa persona
//  entró en un grupo en el que ya no está.
//
//  EL TURNO VA EN EL ORDEN, no en un dígito propio:
//
//      matutino    01 … 49
//      vespertino  51 … 99
//
//  El 50 no se emite nunca: es la marca donde empieza la tarde, y por eso el
//  primer alumno del grupo vespertino es el 51. Gastar un número de cien para
//  que se lea de un vistazo si alguien es de mañana o de tarde es barato;
//  tener que abrir su ficha para saberlo, no.
//
//  ── LO QUE SE PERDIÓ Y HAY QUE DECIRLO: EL PREFIJO DE ACADEMIA.
//
//  El formato anterior (`RE0000007`) empezaba con dos letras del código de la
//  academia, así que una matrícula suelta se podía atribuir a su academia y
//  dos academias no podían emitir la misma. El formato nuevo son siete dígitos
//  y nada más: **la matrícula solo es única DENTRO de una academia**. Es
//  sostenible porque en este sistema no hay una sola consulta por matrícula que
//  no filtre además por `academiaId` —pagos, órdenes, búsqueda del mostrador—,
//  pero deja de valerse por sí sola fuera de ese contexto. Si algún día hay que
//  imprimirla en una credencial interacademias, hay que volver aquí.
//
//  El formato viejo se sigue LEYENDO (`esMatriculaHeredada`) porque el padrón
//  actual está lleno de él y el buscador del mostrador tiene que encontrarlo
//  mientras dure la migración. No se emite ninguno nuevo.
//
//  Módulo PURO: no toca Firestore y no reparte números por su cuenta. Quien
//  reserva el siguiente es una transacción (lib/firebase/matriculas.js); aquí
//  solo se decide qué forma tiene, qué significa y cuándo hay que rehacerla.
// ============================================================
import { normalizarHorario, turnoDe } from './horarioGrupos.js'
import { normalizarGeneracion } from './invitacionesCentro.js'

export const DIGITOS = 7

/**
 * Los tres únicos días en que la academia da clase, con el dígito que le toca
 * a cada uno. Cerrado a propósito: un grupo de martes no puede tener matrícula
 * porque el formato no tiene dígito para él, y eso hay que verlo al configurar
 * el grupo, no descubrirlo cuando la matrícula ya está impresa.
 */
export const DIAS_DE_CLASE = [
  { id: 'sabado', digito: 1, etiqueta: 'Sábado' },
  { id: 'domingo', digito: 2, etiqueta: 'Domingo' },
  { id: 'miercoles', digito: 3, etiqueta: 'Miércoles' },
]

const POR_DIA = new Map(DIAS_DE_CLASE.map((d) => [d.id, d]))
const POR_DIGITO = new Map(DIAS_DE_CLASE.map((d) => [d.digito, d]))

/**
 * Dónde empieza y dónde acaba el orden de llegada de cada turno.
 *
 * `desde` es el PRIMERO que se emite, no la marca: el vespertino empieza en 51
 * porque el 50 es la frontera y queda sin repartir.
 */
export const RANGOS_TURNO = {
  matutino: { desde: 1, hasta: 49 },
  vespertino: { desde: 51, hasta: 99 },
}

export const ETIQUETA_TURNO = { matutino: 'matutino', vespertino: 'vespertino' }

// Siete dígitos exactos. Las matrículas nuevas no llevan letras.
const PATRON = /^(\d{2})(\d{2})(\d)(\d{2})$/

// El formato anterior: dos letras de la academia y siete dígitos correlativos.
const PATRON_HEREDADO = /^([A-Z]{2})(\d{7})$/

// --- el formato heredado ----------------------------------------------------

/**
 * Las dos letras que llevaba una matrícula del formato anterior.
 *
 * Sigue aquí porque el buscador del mostrador las completa sola cuando alguien
 * teclea una matrícula vieja incompleta, y porque el padrón está lleno de
 * ellas hasta que termine la migración. NO se usa para emitir nada.
 */
export function prefijoDeAcademia(academiaId) {
  const letras = String(academiaId || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
  return (letras + 'XX').slice(0, 2)
}

/** `('RE', 1)` → `'RE0000001'`. Solo para leer y completar lo ya emitido. */
export function formatearMatriculaHeredada(prefijo, numero) {
  const n = Number(numero)
  if (!Number.isInteger(n) || n < 1) throw new Error('El número de matrícula debe ser un entero positivo.')
  if (n >= 10 ** DIGITOS) throw new Error(`El número de matrícula no cabe en ${DIGITOS} dígitos.`)
  return `${prefijoDeAcademia(prefijo)}${String(n).padStart(DIGITOS, '0')}`
}

/** `'RE0000007'` → `{ prefijo: 'RE', numero: 7 }`. `null` si no tiene esa forma. */
export function partirMatriculaHeredada(matricula) {
  const m = PATRON_HEREDADO.exec(String(matricula || '').trim().toUpperCase())
  return m ? { prefijo: m[1], numero: Number(m[2]) } : null
}

export const esMatriculaHeredada = (m) => partirMatriculaHeredada(m) !== null

// --- la serie del grupo -----------------------------------------------------

/**
 * El mes en que empieza un grupo, 1–12, tomado de la fecha de inicio de su
 * horario. `null` si el grupo todavía no la tiene.
 *
 * Es la fecha del GRUPO y no la del alta de cada alumno: así todos los de un
 * mismo grupo comparten los cuatro primeros dígitos, que es lo que convierte
 * la matrícula en algo legible de un vistazo.
 */
export function mesDeGrupo(grupo) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(grupo?.horario?.fechaInicio || '').trim())
  if (!m) return null
  const mes = Number(m[2])
  return mes >= 1 && mes <= 12 ? mes : null
}

/**
 * El dígito del día de clase de un grupo.
 *
 * Exige UN solo día. Un grupo de sábado y domingo no tiene un dígito que le
 * corresponda —el formato reserva una sola posición—, y elegir uno por él
 * produciría matrículas que dicen algo falso. Se devuelve `null` y quien llama
 * lo explica.
 */
export function diaDeGrupo(grupo) {
  const dias = normalizarHorario(grupo).dias
  if (dias.length !== 1) return null
  return POR_DIA.get(dias[0])?.digito ?? null
}

/** `'matutino' | 'vespertino' | null`, según la hora de inicio del grupo. */
export function turnoDeGrupo(grupo) {
  return turnoDe(normalizarHorario(grupo))
}

/**
 * La SERIE de un grupo: los cinco dígitos que comparten todos sus alumnos, más
 * el turno, que decide en qué centena baja o alta cae el orden.
 *
 * Devuelve SIEMPRE un objeto y nunca lanza. Cuando el grupo no está listo,
 * `problemas` trae frases que se le pueden enseñar a quien está en el
 * mostrador: son cosas que la dirección tiene que arreglar en el grupo, no
 * errores de quien da el alta.
 *
 * @returns {{ok: boolean, serie: string, clave: string, generacion: number|null,
 *   mes: number|null, dia: number|null, turno: string|null, problemas: string[]}}
 */
export function serieDeGrupo(grupo) {
  const problemas = []
  const generacion = normalizarGeneracion(grupo?.generacion)?.numero ?? null
  const mes = mesDeGrupo(grupo)
  const dia = diaDeGrupo(grupo)
  const turno = turnoDeGrupo(grupo)

  if (generacion === null) {
    problemas.push('El grupo no tiene generación. La pone la dirección al crearlo o editarlo.')
  }
  if (mes === null) {
    problemas.push('El grupo no tiene fecha de inicio en su horario: de ahí sale el mes de la matrícula.')
  }
  if (dia === null) {
    const dias = normalizarHorario(grupo).dias
    if (dias.length === 0) {
      problemas.push('El grupo no tiene día de clase configurado.')
    } else if (dias.length > 1) {
      problemas.push('El grupo tiene más de un día de clase y la matrícula solo admite uno: déjale sábado, domingo o miércoles.')
    } else {
      problemas.push('El día de clase del grupo no es sábado, domingo ni miércoles, que son los únicos con dígito de matrícula.')
    }
  }
  if (turno === null) {
    problemas.push('El grupo no tiene hora de inicio: sin ella no se sabe si es de mañana o de tarde.')
  }

  if (problemas.length) {
    return { ok: false, serie: '', clave: '', generacion, mes, dia, turno, problemas }
  }

  const serie = `${dos(generacion)}${dos(mes)}${dia}`
  return {
    ok: true,
    serie,
    clave: `${serie}-${turno === 'vespertino' ? 'v' : 'm'}`,
    generacion, mes, dia, turno,
    problemas: [],
  }
}

const dos = (n) => String(n).padStart(2, '0')

// --- emitir y leer ----------------------------------------------------------

/** El turno al que pertenece un orden de llegada. `null` si es el 50 o no cabe. */
export function turnoDeOrden(orden) {
  const n = Number(orden)
  if (!Number.isInteger(n)) return null
  for (const [turno, rango] of Object.entries(RANGOS_TURNO)) {
    if (n >= rango.desde && n <= rango.hasta) return turno
  }
  return null
}

/**
 * `('04111', 15)` → `'0411115'`.
 *
 * Lanza si el orden no cae en ningún turno: el 50 y el 0 no son matrículas, y
 * dejarlos pasar produciría un número que no se puede volver a interpretar.
 */
export function formatearMatricula(serie, orden) {
  const s = String(serie || '').trim()
  if (!/^\d{5}$/.test(s)) throw new Error('La serie de la matrícula debe tener cinco dígitos.')
  const n = Number(orden)
  if (!turnoDeOrden(n)) {
    throw new Error(`El orden ${orden} no corresponde a ningún turno: mañana va de ${RANGOS_TURNO.matutino.desde} a ${RANGOS_TURNO.matutino.hasta} y tarde de ${RANGOS_TURNO.vespertino.desde} a ${RANGOS_TURNO.vespertino.hasta}.`)
  }
  return `${s}${dos(n)}`
}

/**
 * `'0411115'` → todo lo que la matrícula dice de quien la lleva.
 *
 * `null` si no tiene la forma. Un mes 00 o 13 tampoco se acepta: un número que
 * no se puede interpretar es peor que uno que se rechaza.
 */
export function partirMatricula(matricula) {
  const m = PATRON.exec(String(matricula || '').trim())
  if (!m) return null
  const generacion = Number(m[1])
  const mes = Number(m[2])
  const dia = Number(m[3])
  const orden = Number(m[4])
  const turno = turnoDeOrden(orden)
  if (generacion < 1 || mes < 1 || mes > 12 || !POR_DIGITO.has(dia) || !turno) return null
  return {
    generacion, mes, dia, orden, turno,
    serie: `${m[1]}${m[2]}${m[3]}`,
    diaId: POR_DIGITO.get(dia).id,
  }
}

export const esMatriculaValida = (m) => partirMatricula(m) !== null

/** ¿Vale como matrícula, en el formato que sea? Para pintar y para buscar. */
export const esMatriculaConocida = (m) => esMatriculaValida(m) || esMatriculaHeredada(m)

/** ¿Esta matrícula ya es de esta serie y este turno? Entonces no hay que rehacerla. */
export function perteneceASerie(matricula, { serie, turno }) {
  const p = partirMatricula(matricula)
  return Boolean(p && p.serie === serie && p.turno === turno)
}

/**
 * El orden que sigue dentro de una serie y un turno.
 *
 * Se calcula sobre los órdenes YA USADOS, nunca sobre «cuántos alumnos hay»:
 * dar de baja a alguien no libera su número. Devuelve `null` si la serie se
 * agotó —99 alumnos de tarde en un mismo grupo—, y eso hay que decirlo en vez
 * de dar la vuelta al contador y repetir una matrícula.
 */
export function siguienteOrden(matriculasUsadas, turno) {
  const rango = RANGOS_TURNO[turno]
  if (!rango) return null
  let mayor = rango.desde - 1
  for (const m of matriculasUsadas || []) {
    const p = partirMatricula(m)
    if (p && p.turno === turno && p.orden > mayor) mayor = p.orden
  }
  const siguiente = mayor + 1
  return siguiente <= rango.hasta ? siguiente : null
}

/** Frase para explicar en pantalla lo que dice una matrícula. */
export function explicarMatricula(matricula) {
  const p = partirMatricula(matricula)
  if (!p) {
    return esMatriculaHeredada(matricula)
      ? 'Matrícula del formato anterior. Se rehará cuando se migre su grupo.'
      : 'No tiene una matrícula con forma válida.'
  }
  const dia = POR_DIGITO.get(p.dia)?.etiqueta || '—'
  return `Generación ${p.generacion} · empieza en el mes ${dos(p.mes)} · ${dia} · turno ${p.turno} · ${p.orden}º de su grupo.`
}

/**
 * Qué matrícula le toca a alguien al entrar o cambiarse de grupo, SIN reservar
 * todavía el número.
 *
 * Contesta la única pregunta que se puede contestar sin tocar la base: ¿hay que
 * rehacerla o la que tiene ya es de esta serie? El número, cuando hace falta
 * uno nuevo, lo reparte la transacción del contador.
 *
 * @returns {{accion: 'conservar'|'emitir'|'bloqueado', serie: object, motivo: string}}
 */
export function matriculaAlCambiarDeGrupo({ matricula, grupo }) {
  const serie = serieDeGrupo(grupo)
  if (!serie.ok) {
    return {
      accion: 'bloqueado',
      serie,
      motivo: `No se le puede emitir matrícula todavía: ${serie.problemas.join(' ')}`,
    }
  }
  if (perteneceASerie(matricula, serie)) {
    return { accion: 'conservar', serie, motivo: `Conserva su matrícula ${matricula}: su grupo nuevo es de la misma serie y el mismo turno.` }
  }
  return {
    accion: 'emitir',
    serie,
    motivo: esMatriculaConocida(matricula)
      ? `Cambia de grupo, así que se le rehace la matrícula: la anterior (${matricula}) queda en su historial.`
      : 'Se le emite su primera matrícula con la serie de su grupo.',
  }
}
