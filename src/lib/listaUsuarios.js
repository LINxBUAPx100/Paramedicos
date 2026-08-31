// ============================================================
//  Orden y filtros de las listas de usuarios — PURO
// ------------------------------------------------------------
//  Las listas de personas salían en el orden en que Firestore devolvía los
//  documentos, que no es ninguno. Y cuando parecían ordenadas, no lo estaban
//  del todo: comparar con `<` pone «Ximena» antes que «alexis» (las mayúsculas
//  van antes en Unicode) y «Díaz» después de «Duarte» (la í no es una i para
//  una comparación byte a byte). En una lista de veinte nombres se nota; en una
//  de doscientos, no se encuentra a nadie.
//
//  Se comparan con `Intl.Collator` en español, que resuelve las tres cosas de
//  una vez: ignora mayúsculas, entiende los acentos y ordena los números como
//  números («Grupo 2» antes que «Grupo 10»).
//
//  UNA SOLA IMPLEMENTACIÓN para las dos listas —la de la academia y la de la
//  plataforma—, porque son la misma pregunta hecha dos veces y ya se habían
//  contestado distinto.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================
import { ETIQUETA_ROL, ROLES } from './roles.js'
import { estadoDeCuenta } from './cuentaModelo.js'

// `sensitivity: 'base'` = «a» == «A» == «á». Es lo que espera quien busca en un
// listado: nadie piensa en el acento al escribir el apellido de un alumno.
const COLADOR = new Intl.Collator('es', { sensitivity: 'base', numeric: true })

/** Texto por el que se ordena a una persona. Sin nombre, manda el correo. */
export function claveDeOrden(usuario) {
  const nombre = String(usuario?.nombre || '').trim()
  const email = String(usuario?.email || '').trim()
  // Un nombre que es su propio correo no ordena mejor que el correo.
  if (nombre && nombre.toLowerCase() !== email.toLowerCase()) return nombre
  return email || String(usuario?.id || '')
}

// ------------------------------------------------------------
//  Orden
// ------------------------------------------------------------

export const ORDENES = [
  { id: 'nombre', etiqueta: 'Nombre (A-Z)' },
  { id: 'nombre-desc', etiqueta: 'Nombre (Z-A)' },
  { id: 'rol', etiqueta: 'Rol' },
  { id: 'estado', etiqueta: 'Estado' },
  { id: 'grupo', etiqueta: 'Grupo' },
]

export const ORDEN_DEFECTO = 'nombre'

// Jerarquía descendente para el orden por rol: quien gestiona arriba. No es el
// orden de ROLES (que va de menor a mayor) porque en una lista se busca antes
// al director que al alumno número 118.
const PESO_ROL = { superadmin: 0, admin_escuela: 1, instructor: 2, alumno: 3 }
const PESO_ESTADO = { activo: 0, suspendido: 1, eliminado: 2 }

/**
 * Ordena SIN mutar la lista recibida.
 *
 * Todos los criterios terminan comparando por nombre: sin ese desempate, dos
 * alumnos del mismo grupo salían en el orden que quisiera el navegador y la
 * lista «bailaba» entre recargas.
 */
export function ordenarUsuarios(usuarios, criterio = ORDEN_DEFECTO, { nombreDeGrupo } = {}) {
  const lista = [...(usuarios || [])].filter(Boolean)
  const porNombre = (a, b) => COLADOR.compare(claveDeOrden(a), claveDeOrden(b))

  switch (criterio) {
    case 'nombre-desc':
      return lista.sort((a, b) => porNombre(b, a))
    case 'rol':
      return lista.sort((a, b) =>
        (PESO_ROL[a.rol] ?? 9) - (PESO_ROL[b.rol] ?? 9) || porNombre(a, b))
    case 'estado':
      return lista.sort((a, b) =>
        (PESO_ESTADO[estadoDeCuenta(a)] ?? 9) - (PESO_ESTADO[estadoDeCuenta(b)] ?? 9)
        || porNombre(a, b))
    case 'grupo':
      return lista.sort((a, b) => {
        // Quien no tiene grupo va al final: es la lista de pendientes de
        // asignar, y enterrarla entre los grupos la esconde.
        const ga = a.grupoId ? (nombreDeGrupo?.(a.grupoId) || a.grupoId) : ''
        const gb = b.grupoId ? (nombreDeGrupo?.(b.grupoId) || b.grupoId) : ''
        if (!ga && gb) return 1
        if (ga && !gb) return -1
        return COLADOR.compare(ga, gb) || porNombre(a, b)
      })
    default:
      return lista.sort(porNombre)
  }
}

// ------------------------------------------------------------
//  Filtros
// ------------------------------------------------------------

export const FILTRO_VACIO = { texto: '', rol: '', estado: '', grupoId: '', academiaId: '' }

/** Opciones de ROL para un desplegable, con su etiqueta legible. */
export function opcionesDeRol(usuarios) {
  const presentes = new Set((usuarios || []).map((u) => u?.rol).filter(Boolean))
  return ROLES.filter((r) => presentes.has(r))
    .map((r) => ({ id: r, etiqueta: ETIQUETA_ROL[r] || r }))
}

/** Opciones de ESTADO, solo las que de verdad aparecen en la lista. */
export function opcionesDeEstado(usuarios) {
  const presentes = new Set((usuarios || []).map((u) => estadoDeCuenta(u)))
  return [
    { id: 'activo', etiqueta: 'Activas' },
    { id: 'suspendido', etiqueta: 'Suspendidas' },
    { id: 'eliminado', etiqueta: 'Dadas de baja' },
  ].filter((o) => presentes.has(o.id))
}

/**
 * Filtra por texto libre y por los desplegables. Todos los criterios se
 * ACUMULAN: rol «Profesor» + estado «Activas» devuelve los profesores activos.
 *
 * El texto busca en nombre, correo, academia, rol y grupo, e ignora acentos y
 * mayúsculas por el mismo motivo que el orden.
 */
export function filtrarUsuarios(usuarios, filtro = {}, { nombreDeGrupo } = {}) {
  const { texto = '', rol = '', estado = '', grupoId = '', academiaId = '' } = filtro
  const q = String(texto).trim()

  return (usuarios || []).filter(Boolean).filter((u) => {
    if (rol && u.rol !== rol) return false
    if (estado && estadoDeCuenta(u) !== estado) return false
    if (grupoId === '__sin__') { if (u.grupoId) return false }
    else if (grupoId && u.grupoId !== grupoId) return false
    if (academiaId === '__sin__') { if (u.academiaId) return false }
    else if (academiaId && u.academiaId !== academiaId) return false
    if (!q) return true

    const campos = [
      u.nombre, u.email, u.academiaId, ETIQUETA_ROL[u.rol] || u.rol,
      u.grupoId ? (nombreDeGrupo?.(u.grupoId) || u.grupoId) : '',
    ]
    // `localeCompare` con sensitivity base no sirve para «contiene», así que se
    // quitan los acentos a mano en los dos lados. `NFD` separa la letra de su
    // tilde y el rango ̀-ͯ borra las tildes sueltas.
    const sinTildes = (v) => String(v || '').normalize('NFD')
      .replace(/[̀-ͯ]/g, '').toLowerCase()
    const objetivo = sinTildes(q)
    return campos.some((v) => sinTildes(v).includes(objetivo))
  })
}

/** Filtrar y ordenar de una vez, que es como lo usan siempre las pantallas. */
export function prepararLista(usuarios, filtro, criterio, opciones = {}) {
  return ordenarUsuarios(filtrarUsuarios(usuarios, filtro, opciones), criterio, opciones)
}

/** ¿Hay algún filtro puesto? Lo usa el botón de «limpiar». */
export function hayFiltro(filtro = {}) {
  return Boolean(
    String(filtro.texto || '').trim() || filtro.rol || filtro.estado
    || filtro.grupoId || filtro.academiaId
  )
}
