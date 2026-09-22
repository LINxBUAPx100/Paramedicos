// ============================================================
//  La ficha de una persona — quién puede ver y tocar qué (lógica PURA)
// ------------------------------------------------------------
//  QUÉ RESUELVE. Se pidió que en CUALQUIER sitio donde aparezca una persona se
//  pueda pulsar su nombre y abrir su ficha completa: ver todo, modificarlo y,
//  cuando corresponda, mandarle el correo para restablecer su contraseña.
//
//  Ese «cualquier sitio» es el problema de verdad. Hay una docena larga de
//  listas repartidas entre el panel del director, la consola del super-admin y
//  el mostrador, y cada una decide hoy por su cuenta qué enseña. Si cada una
//  decidiera además qué se puede editar, la respuesta se separaría en doce
//  sitios y bastaría con olvidar uno para que alguien editara lo que no debe.
//
//  Así que la decisión se toma AQUÍ, una vez, y la ficha —que es la misma en
//  todas partes— pregunta. Las reglas de Firestore imponen lo mismo en el
//  servidor: esto no es la barrera, es lo que evita ofrecer lo que se va a
//  denegar.
//
//  ── LOS TRES NIVELES, tal como los fijó el dueño del producto el 20-09-2026:
//
//   · **super-admin** — todo, en cualquier academia. Incluida la contraseña.
//   · **director** — todo lo de SU academia, salvo lo que es de plataforma
//     (la academia a la que pertenece alguien, y reescribir una matrícula ya
//     emitida). Incluida la contraseña.
//   · **recepción** — los datos de contacto de los ALUMNOS de su academia, y
//     **nada relacionado con contraseñas**. Ni el botón, ni la sección, ni la
//     mención: `puedeContrasena` es false y la ficha no pinta ese bloque.
//
//  Un PROFESOR no abre ficha. No es un olvido: no tiene ninguna escritura
//  sobre el perfil de otra persona salvo `modulosDesbloqueados`, que ya tiene
//  su propia pantalla. Darle una ficha sería darle un formulario donde todo
//  está desactivado.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================
import { ESTADOS } from './cuentaModelo.js'
import { ETIQUETA_ROL, ROLES, ROLES_DIRECTOR } from './roles.js'

/**
 * Los campos de la ficha, con el NIVEL que hace falta para tocarlos.
 *
 * `contacto`   — datos personales: los toca hasta recepción.
 * `gestion`    — rol, estado y grupo: son del director para arriba.
 * `plataforma` — academia y matrícula: mueven a alguien de academia o rompen
 *                la numeración. Solo el super-admin.
 */
export const CAMPOS_FICHA = [
  { id: 'nombre', etiqueta: 'Nombre completo', tipo: 'text', nivel: 'contacto', autoComplete: 'name', ayuda: 'Como aparece en listas, constancias y credencial.' },
  { id: 'email', etiqueta: 'Correo electrónico', tipo: 'email', nivel: 'contacto', autoComplete: 'email', ayuda: 'Cambiarlo aquí NO cambia el correo con el que inicia sesión.' },
  { id: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', nivel: 'contacto', autoComplete: 'tel', ayuda: 'De aquí salen los mensajes de WhatsApp. Entre 10 y 15 dígitos.' },
  { id: 'notaRecepcion', etiqueta: 'Nota interna', tipo: 'textarea', nivel: 'contacto', ayuda: 'Visible solo para el personal. Máximo 300 caracteres.' },
  { id: 'grupoId', etiqueta: 'Grupo', tipo: 'grupo', nivel: 'contacto', ayuda: 'Decide su plan de estudios, su horario y su generación.' },
  { id: 'rol', etiqueta: 'Rol', tipo: 'rol', nivel: 'gestion', ayuda: 'Qué puede hacer dentro de la academia.' },
  { id: 'estado', etiqueta: 'Estado de la cuenta', tipo: 'estado', nivel: 'gestion', ayuda: 'Una cuenta suspendida no entra.' },
  { id: 'matricula', etiqueta: 'Matrícula', tipo: 'text', nivel: 'plataforma', ayuda: 'La emite el contador de la academia. Reescribirla a mano rompe la numeración.' },
  { id: 'academiaId', etiqueta: 'Academia', tipo: 'text', nivel: 'plataforma', ayuda: 'Cambiarla es un traslado: arrastra matrícula, grupo e historial.' },
]

const POR_NIVEL = (nivel) => CAMPOS_FICHA.filter((c) => c.nivel === nivel).map((c) => c.id)

export const CAMPOS_CONTACTO = POR_NIVEL('contacto')
export const CAMPOS_GESTION = POR_NIVEL('gestion')
export const CAMPOS_PLATAFORMA = POR_NIVEL('plataforma')

export const ESTADOS_ELEGIBLES = Object.keys(ESTADOS)
export { ETIQUETA_ROL }

/**
 * Qué puede hacer quien mira sobre la persona que está mirando.
 *
 * Devuelve SIEMPRE un objeto con la misma forma, también cuando no puede nada:
 * quien pinta la ficha no tiene que acordarse de comprobar nada antes.
 *
 * @param {object} arg
 * @param {string} arg.rol           el rol de QUIEN MIRA.
 * @param {boolean} arg.esSuperadmin
 * @param {string} arg.miUid         para no dejar que nadie se edite a sí mismo
 *                                   desde aquí (su sitio es «Mi cuenta»).
 * @param {string} arg.miAcademiaId
 * @param {object} arg.objetivo      la persona: { uid, rol, academiaId, … }
 *
 * @returns {{
 *   puedeVer: boolean, campos: string[], puedeContrasena: boolean,
 *   rolesQuePuedeAsignar: string[], motivo: string
 * }}
 */
export function permisosDeFicha({
  rol, esSuperadmin = false, miUid = null, miAcademiaId = null, objetivo = null,
} = {}) {
  const nada = (motivo) => ({
    puedeVer: false, campos: [], puedeContrasena: false, rolesQuePuedeAsignar: [], motivo,
  })

  if (!objetivo) return nada('No hay ninguna persona seleccionada.')
  const suUid = objetivo.uid || objetivo.id || null

  // EL SUPER-ADMIN, primero y sin condiciones de academia: opera la plataforma
  // entera, y las reglas ya se lo permiten (`allow write: if esSuper()`).
  if (esSuperadmin) {
    return {
      puedeVer: true,
      // Sobre sí mismo tampoco: cambiarse el rol desde una ficha es la forma
      // más fácil de quedarse fuera de su propia consola.
      campos: suUid && suUid === miUid
        ? CAMPOS_CONTACTO
        : CAMPOS_FICHA.map((c) => c.id),
      puedeContrasena: true,
      rolesQuePuedeAsignar: ROLES,
      motivo: '',
    }
  }

  const mismaAcademia = Boolean(miAcademiaId) && objetivo.academiaId === miAcademiaId
  if (!mismaAcademia) return nada('Esa persona no pertenece a tu academia.')

  if (rol === 'admin_escuela') {
    // Ni a sí mismo, ni a otro director, ni a un super-admin. Es la misma
    // barrera que ya tenían las reglas: un director no se asciende ni degrada
    // a otro, y quitarse el propio rol lo dejaría fuera de su panel.
    if (suUid && suUid === miUid) {
      return { puedeVer: true, campos: [], puedeContrasena: false, rolesQuePuedeAsignar: [], motivo: 'Para cambiar tus propios datos usa «Mi cuenta».' }
    }
    if (!ROLES_DIRECTOR.includes(objetivo.rol)) {
      return { puedeVer: true, campos: [], puedeContrasena: false, rolesQuePuedeAsignar: [], motivo: 'Solo el super-admin puede modificar a otro director.' }
    }
    return {
      puedeVer: true,
      campos: [...CAMPOS_CONTACTO, ...CAMPOS_GESTION],
      puedeContrasena: true,
      rolesQuePuedeAsignar: ROLES_DIRECTOR,
      motivo: '',
    }
  }

  if (rol === 'recepcion') {
    // SOLO ALUMNOS. Recepción no edita la ficha de un profesor ni la de su
    // director, y no ve absolutamente nada de contraseñas.
    if (objetivo.rol && objetivo.rol !== 'alumno') {
      return { puedeVer: true, campos: [], puedeContrasena: false, rolesQuePuedeAsignar: [], motivo: 'Desde recepción solo se editan fichas de alumnos.' }
    }
    return {
      puedeVer: true,
      campos: CAMPOS_CONTACTO,
      puedeContrasena: false,
      rolesQuePuedeAsignar: [],
      motivo: '',
    }
  }

  return nada('Tu cuenta no puede abrir fichas de otras personas.')
}

/** ¿Este rol puede abrir fichas? Lo usa cada lista para decidir si el nombre
 *  es pulsable. Un nombre que se puede pulsar y no hace nada es peor que uno
 *  que no se puede pulsar. */
export function puedeAbrirFichas({ rol, esSuperadmin = false } = {}) {
  return Boolean(esSuperadmin) || rol === 'admin_escuela' || rol === 'recepcion'
}

/** Los campos de la ficha que este permiso deja editar, ya con su definición. */
export function camposEditables(permisos) {
  const permitidos = new Set(permisos?.campos || [])
  return CAMPOS_FICHA.filter((c) => permitidos.has(c.id))
}

/**
 * Valores iniciales del formulario. Nunca `undefined`: un input que pasa de
 * no controlado a controlado suelta un aviso de React y pierde lo tecleado.
 */
export function valoresDeFicha(persona) {
  return {
    nombre: String(persona?.nombre || ''),
    email: String(persona?.email || ''),
    telefono: String(persona?.telefono || ''),
    notaRecepcion: String(persona?.notaRecepcion || ''),
    grupoId: String(persona?.grupoId || ''),
    rol: String(persona?.rol || 'alumno'),
    estado: String(persona?.estado || 'activo'),
    matricula: String(persona?.matricula || ''),
    academiaId: String(persona?.academiaId || ''),
  }
}

/** Qué cambió, campo a campo, LIMITADO a lo que quien mira puede tocar. */
export function cambiosDeFicha(persona, valores, permisos) {
  const antes = valoresDeFicha(persona)
  const editables = camposEditables(permisos)
  return editables
    .map((c) => ({
      campo: c.id,
      etiqueta: c.etiqueta,
      antes: antes[c.id] ?? '',
      despues: normalizar(c.id, valores?.[c.id]),
    }))
    .filter((c) => String(c.antes) !== String(c.despues))
}

/** El parche para Firestore: solo lo que cambió y solo lo permitido. */
export function parcheDeFicha(persona, valores, permisos) {
  const parche = {}
  for (const c of cambiosDeFicha(persona, valores, permisos)) {
    // `grupoId` y `academiaId` vacíos se guardan como null y no como '': el
    // resto del sistema comprueba `!grupoId`, y una cadena vacía en Firestore
    // es un valor presente que rompe las consultas `where(… == null)`.
    parche[c.campo] = (c.campo === 'grupoId' || c.campo === 'academiaId') && !c.despues
      ? null
      : c.despues
  }
  return parche
}

function normalizar(campo, valor) {
  const v = String(valor ?? '').trim()
  if (campo === 'email') return v.toLowerCase()
  if (campo === 'telefono') return (v.startsWith('+') ? '+' : '') + v.replace(/\D/g, '')
  if (campo === 'matricula') return v.toUpperCase()
  if (campo === 'notaRecepcion') return v.slice(0, 300)
  return v
}

/** Qué impide guardar. Frases, no un booleano. */
export function problemasDeFicha(valores, permisos) {
  const p = []
  const puede = (campo) => (permisos?.campos || []).includes(campo)

  if (puede('nombre') && !String(valores?.nombre || '').trim()) {
    p.push('Escribe el nombre completo.')
  }
  if (puede('email')) {
    const email = String(valores?.email || '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) p.push('El correo no tiene una forma válida.')
  }
  if (puede('telefono')) {
    const tel = normalizar('telefono', valores?.telefono).replace('+', '')
    if (tel && (tel.length < 10 || tel.length > 15)) p.push('El teléfono debe tener entre 10 y 15 dígitos.')
  }
  if (puede('rol') && !ROLES.includes(valores?.rol)) p.push('Ese rol no existe.')
  if (puede('estado') && !ESTADOS_ELEGIBLES.includes(valores?.estado)) p.push('Ese estado no existe.')
  if (puede('matricula')) {
    const m = normalizar('matricula', valores?.matricula)
    if (m && !/^[A-Z]{2}\d{7}$/.test(m)) p.push('La matrícula son dos letras y siete dígitos (RE0000001).')
  }
  return p
}

/**
 * Qué se le puede decir a quien pulsa «restablecer contraseña».
 *
 * NO LO HACE: devuelve si se puede y con qué aviso. Mandar un correo a una
 * persona real es una acción hacia fuera, así que la pantalla la confirma
 * antes, y este módulo se limita a decidir si tiene sentido ofrecerla.
 */
export function estadoDeContrasena(persona, permisos) {
  if (!permisos?.puedeContrasena) return { puede: false, aviso: '' }
  const email = String(persona?.email || '').trim()
  if (!email) {
    return { puede: false, aviso: 'No tiene correo registrado: sin correo no hay a dónde mandar el enlace.' }
  }
  if (!persona?.uid && !persona?.id) {
    return { puede: false, aviso: 'Todavía no ha activado su cuenta, así que no hay contraseña que restablecer. Reenvíale su invitación.' }
  }
  return {
    puede: true,
    email,
    // Se dice lo que hace de verdad, no «se restableció la contraseña»: el
    // correo puede tardar, irse a spam, o no llegar si esa dirección nunca
    // creó una cuenta. Prometer más que eso genera una llamada al día
    // siguiente preguntando cuál es la contraseña nueva.
    aviso: `Se le enviará un correo a ${email} con un enlace para que elija una contraseña nueva. Tú no verás ni elegirás esa contraseña.`,
  }
}
