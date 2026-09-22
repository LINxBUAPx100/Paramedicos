// ============================================================
//  Recepción · personas — buscar una ficha y editarla con rastro
// ------------------------------------------------------------
//  LA BÚSQUEDA SE HACE EN EL SERVIDOR CUANDO SE PUEDE, y solo entonces.
//
//  Matrícula y correo son consultas exactas: `where` las resuelve leyendo un
//  documento, no la academia entera. El nombre no se puede: Firestore no sabe
//  buscar «contiene», así que ahí SÍ se trae la lista de la academia y se
//  filtra en memoria. Es una lectura por alumno y por eso se hace una sola vez
//  y se guarda en caché durante la sesión de mostrador —ver `cacheMiembros`—:
//  una recepcionista busca veinte veces en una mañana, no una.
//
//  Y una lección que ya costó cara en este proyecto (`temasDeCurso`,
//  `historialDeAcademia`): **el `where` por academia no es un filtro, es lo que
//  hace que la regla se pueda evaluar**. Sin él la consulta entera se deniega,
//  porque Firestore no puede comprobar documento a documento si la regla
//  `list` se cumple.
// ============================================================
import { db } from '../init.js'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { registrarSinRomper } from './auditoria.js'
import { coincide, interpretarClave, ordenarCandidatos } from '../../staff/resolverAlumno.js'
import {
  cambiosDe, entradaDeAuditoria, parcheDeEdicion, parcheSeguro, problemasDeEdicion,
} from '../../staff/edicionPerfil.js'

/**
 * Caché de los miembros de la academia, viva durante la sesión de la pestaña.
 *
 * No es una optimización prematura: sin ella, cada búsqueda por apellido lee
 * todos los alumnos otra vez. Se invalida sola al editar a alguien (abajo) y a
 * mano con `olvidarMiembros`, que es lo que pulsa el botón de recargar.
 */
const cacheMiembros = new Map()

export function olvidarMiembros(academiaId) {
  if (academiaId) cacheMiembros.delete(academiaId)
  else cacheMiembros.clear()
}

async function miembrosDe(academiaId) {
  if (cacheMiembros.has(academiaId)) return cacheMiembros.get(academiaId)
  const snap = await getDocs(query(
    collection(db, 'usuarios'),
    where('academiaId', '==', academiaId),
  ))
  const lista = snap.docs.map((d) => ({ uid: d.id, id: d.id, ...d.data() }))
  cacheMiembros.set(academiaId, lista)
  return lista
}

/**
 * Busca a alguien por lo que se haya tecleado.
 *
 * NUNCA LANZA POR NO ENCONTRAR. «No existe» es un resultado, no un error: es el
 * caso normal cuando llega alguien nuevo, y la pantalla ofrece darlo de alta.
 * Solo se propagan los errores de verdad (permisos, red), que sí hay que ver.
 *
 * @returns {{interpretacion: object, resultados: Array, exacto: object|null}}
 */
export async function buscarAlumno(texto, { academiaId } = {}) {
  const interpretacion = interpretarClave(texto, { academiaId })
  if (interpretacion.tipo === 'vacio' || !academiaId) {
    return { interpretacion, resultados: [], exacto: null }
  }

  // Consulta exacta en el servidor para matrícula y correo.
  if (interpretacion.tipo === 'matricula' || interpretacion.tipo === 'correo') {
    const campo = interpretacion.tipo === 'matricula' ? 'matricula' : 'email'
    const snap = await getDocs(query(
      collection(db, 'usuarios'),
      where('academiaId', '==', academiaId),
      where(campo, '==', interpretacion.consulta),
    ))
    const resultados = snap.docs.map((d) => ({ uid: d.id, id: d.id, ...d.data() }))
    if (resultados.length) {
      return { interpretacion, resultados, exacto: resultados[0] }
    }
    // Sin coincidencia exacta se cae al filtro en memoria: un correo escrito
    // con una mayúscula distinta, o una matrícula de alguien que aún no la
    // tiene guardada, aparecen igualmente en vez de dar «no existe».
  }

  const todos = await miembrosDe(academiaId)
  const resultados = ordenarCandidatos(todos.filter((a) => coincide(a, interpretacion)), interpretacion)
  return {
    interpretacion,
    resultados,
    exacto: resultados.length === 1 ? resultados[0] : null,
  }
}

/**
 * El padrón entero de la academia.
 *
 * Es la MISMA lectura que usa el buscador por nombre, y por eso comparte su
 * caché: abrir la sección de alumnos después de haber buscado a alguien no
 * vuelve a leer la academia entera. `recargar` la salta cuando quien mira
 * quiere datos frescos.
 */
export async function padronDeAcademia(academiaId, { recargar = false } = {}) {
  if (!academiaId) return []
  if (recargar) olvidarMiembros(academiaId)
  return miembrosDe(academiaId)
}

/** La ficha completa y fresca de una persona. Se relee tras cada edición. */
export async function fichaDeAlumno(uid) {
  if (!uid) return null
  const snap = await getDoc(doc(db, 'usuarios', uid))
  return snap.exists() ? { uid: snap.id, id: snap.id, ...snap.data() } : null
}

/** El grupo de esa persona, para saber su nombre, su horario y su generación. */
export async function grupoDeAlumno(grupoId) {
  if (!grupoId) return null
  const snap = await getDoc(doc(db, 'grupos', grupoId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/**
 * Guarda los cambios de la ficha Y su rastro, en ese orden.
 *
 * EL ORDEN IMPORTA, por el mismo criterio que el alta de recepción: si falla el
 * historial, el dato queda guardado sin rastro —molesto pero recuperable—;
 * al revés quedaría un rastro de un cambio que no ocurrió, que es peor porque
 * se cree.
 *
 * El rastro NO se traga el error en silencio: se devuelve `auditado: false` y
 * la pantalla lo dice. Un registro de auditoría que falla sin avisar es la
 * peor de las tres opciones.
 *
 * @returns {{cambios: Array, auditado: boolean, alumno: object}}
 */
export async function guardarFicha({ alumno, valores, academiaId }) {
  const fallos = problemasDeEdicion(valores)
  if (fallos.length) throw new Error(fallos.join(' '))

  const cambios = cambiosDe(alumno, valores)
  if (!cambios.length) return { cambios: [], auditado: true, alumno }

  const parche = parcheDeEdicion(alumno, valores)

  // SI CAMBIA DE GRUPO, CAMBIA SU MATRÍCULA (21-09-2026). Los cinco primeros
  // dígitos son la generación, el mes de inicio y el día de clase de su grupo,
  // y los dos últimos su orden dentro de él, con la tarde a partir del 51. Un
  // alumno movido de grupo con su número viejo lleva una matrícula que afirma
  // algo falso. Va en el MISMO parche porque la regla exige que vayan juntos:
  // reescribir una matrícula sin mover a nadie de sitio es lo que la regla
  // impide. Si su grupo nuevo es de la misma serie y turno, no cambia nada.
  let motivoMatricula = ''
  if (parche.grupoId) {
    const { matriculaAlMoverDeGrupo, parcheDeMatricula } = await import('../matriculas.js')
    const r = await matriculaAlMoverDeGrupo({
      academiaId: academiaId || alumno?.academiaId,
      grupoId: parche.grupoId,
      matriculaActual: alumno?.matricula || '',
    })
    motivoMatricula = r.motivo
    if (r.cambio) Object.assign(parche, parcheDeMatricula(alumno, r.matricula))
  }

  // Cinturón y tirantes: la regla de Firestore acota los campos, y aquí se
  // vuelve a comprobar para no mandar una escritura que se va a denegar y que
  // en pantalla parecería un problema de permisos.
  if (!parcheSeguro(parche)) throw new Error('Hay un campo que recepción no puede modificar.')

  const uid = alumno?.uid || alumno?.id
  if (!uid) throw new Error('Esta persona todavía no tiene cuenta activa: no hay ficha que editar.')

  await updateDoc(doc(db, 'usuarios', uid), parche)
  olvidarMiembros(academiaId)

  const entrada = entradaDeAuditoria({ alumno, cambios, academiaId })
  if (parche.matricula) entrada.despues = { ...entrada.despues, _matricula: parche.matricula }
  const auditado = await registrarSinRomper(entrada)

  return {
    cambios,
    auditado,
    motivoMatricula,
    alumno: { ...alumno, ...parche },
  }
}
