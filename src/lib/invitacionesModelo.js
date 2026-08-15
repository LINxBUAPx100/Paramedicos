// ============================================================
//  Invitaciones POR ROL — catálogo, código y vigencia (módulo PURO)
// ------------------------------------------------------------
//  Había invitaciones por ACADEMIA (el código es el id de la academia) y por
//  GRUPO (el código es el id del grupo), pero ninguna decía COMO QUÉ entra la
//  persona: todo el mundo aterrizaba como `alumno` y el director tenía que
//  promoverlo a mano en Miembros. Eso obliga a un segundo paso manual justo
//  cuando das de alta a un profesor nuevo, que es cuando más prisa hay.
//
//  Una invitación por rol lleva el rol DENTRO del código: al canjearlo, la
//  persona queda en la academia (y en el grupo, si lo lleva) ya como alumno,
//  profesor o director.
//
//  Este módulo es puro a propósito —sin Firebase—: el catálogo de roles, el
//  formato del código y las reglas de vigencia se prueban con `npm test`, y
//  `lib/firebase/invitaciones.js` solo pone el acceso a datos encima.
//
//  El rol `superadmin` NO está aquí y no lo estará nunca: no es un rol de
//  academia y repartirlo por enlace sería regalar la plataforma entera. Las
//  reglas lo vuelven a comprobar en el servidor (firestore.rules), porque esta
//  lista vive en el cliente y el cliente no decide.
// ============================================================

// Catálogo CERRADO de roles invitables. El `rol` es el valor que se escribe en
// usuarios/{uid}.rol; la `letra` va dentro del código para que se lea de un
// vistazo de quién es la invitación sin abrir el panel.
export const ROLES_INVITACION = [
  {
    rol: 'alumno',
    letra: 'A',
    etiqueta: 'Alumno',
    plural: 'Alumnos',
    descripcion: 'Estudia el temario, hace quizzes y presenta sus exámenes.',
  },
  {
    rol: 'instructor',
    letra: 'P',
    etiqueta: 'Profesor',
    plural: 'Profesores',
    descripcion: 'Ve el avance de sus alumnos, califica y atiende solicitudes.',
  },
  {
    rol: 'admin_escuela',
    letra: 'D',
    etiqueta: 'Director',
    plural: 'Directores',
    descripcion: 'Manda en la academia: miembros, grupos, códigos y contenido.',
  },
]

const PORROL = new Map(ROLES_INVITACION.map((r) => [r.rol, r]))

export function esRolInvitable(rol) {
  return PORROL.has(rol)
}

export function etiquetaRol(rol) {
  return PORROL.get(rol)?.etiqueta || rol || '—'
}

export function letraRol(rol) {
  return PORROL.get(rol)?.letra || 'X'
}

// Cuántos canjes admite por defecto una invitación de ese rol.
//
//  · Director: UNO. Un enlace que reparte la dirección de la academia no puede
//    quedarse abierto: se manda a una persona concreta y se agota con ella.
//  · Profesor y alumno: sin límite (0), que es como funcionan hoy los códigos
//    de academia y de grupo — se pegan en un grupo de WhatsApp y ya.
//
//  Quien crea la invitación puede cambiarlo; esto es solo el valor que sale
//  propuesto en el formulario.
export function maxUsosPorDefecto(rol) {
  return rol === 'admin_escuela' ? 1 : 0
}

// --- Código -----------------------------------------------------------------
// Mismo alfabeto que grupos y códigos de prueba: sin 0/O ni 1/I/L, que son los
// que la gente teclea mal cuando copia un código de una captura de pantalla.
const ABC = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

const abreviar = (txt, n) =>
  String(txt || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, n)

// INV-<ACADEMIA>-<ROL>-<AZAR>, p. ej. INV-AEP-P-K3M9 (profesor de AEP-2026).
// El prefijo INV lo distingue a simple vista de un código de academia
// (AEP-2026), de grupo (GRP-7K3M) o de prueba (AEP-GE-7D4K).
//
// `azar` se inyecta para poder probar el formato sin depender de Math.random.
export function generarCodigoInvitacion({ academiaId, rol, azar = null } = {}) {
  const aleatorio = azar || (() => ABC[Math.floor(Math.random() * ABC.length)])
  const aca = abreviar(String(academiaId || '').split('-')[0], 4) || 'PT'
  const sufijo = Array.from({ length: 4 }, () => aleatorio()).join('')
  return `INV-${aca}-${letraRol(rol)}-${sufijo}`
}

// --- Vigencia ---------------------------------------------------------------
// Milisegundos de un Timestamp de Firestore, de un Date o de un número. La
// lista del panel y el canje miran lo mismo, así que la conversión vive aquí.
function ms(fecha) {
  if (!fecha) return 0
  if (typeof fecha === 'number') return fecha
  if (typeof fecha.toMillis === 'function') return fecha.toMillis()
  if (typeof fecha.seconds === 'number') return fecha.seconds * 1000
  if (fecha instanceof Date) return fecha.getTime()
  return 0
}

// Estado REAL de una invitación, que no es solo su campo `estado`: una
// invitación activa pero vencida (o agotada) no sirve, y la lista tiene que
// decirlo con esas palabras en vez de mostrarla en verde.
export function estadoInvitacion(inv, ahora = Date.now()) {
  if (!inv) return 'inactiva'
  if (inv.estado !== 'activo') return 'inactiva'
  if (ms(inv.expira) <= ahora) return 'expirada'
  const max = Number(inv.maxUsos || 0)
  if (max > 0 && Number(inv.usos || 0) >= max) return 'agotada'
  return 'activa'
}

// Motivo por el que NO se puede canjear, en el idioma del invitado; null si sí.
// Ninguno de estos mensajes dice «no existe una invitación»: esa frase la
// reserva el canje para «este código no es de este tipo», que es lo que hace
// avanzar la cascada de lib/firebase/canjear.js.
export function motivoNoCanjeable(inv, ahora = Date.now()) {
  if (!inv) return 'Esa invitación ya no está disponible.'
  if (!esRolInvitable(inv.rol)) {
    return 'Esa invitación está mal formada (rol desconocido). Pide una nueva.'
  }
  const estado = estadoInvitacion(inv, ahora)
  if (estado === 'inactiva') return 'Esa invitación fue desactivada.'
  if (estado === 'expirada') return 'Esa invitación ya venció. Pide una nueva.'
  if (estado === 'agotada') {
    return 'Esa invitación ya se usó el número de veces permitido. Pide una nueva.'
  }
  return null
}

// Resumen de una línea para la lista del panel y para el texto que se comparte.
export function resumenInvitacion(inv, { nombreGrupo = '' } = {}) {
  const rol = etiquetaRol(inv?.rol)
  return nombreGrupo ? `${rol} · ${nombreGrupo}` : rol
}
