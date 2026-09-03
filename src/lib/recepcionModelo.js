// ============================================================
//  Recepción — alta de alumno y primer pago (lógica PURA)
// ------------------------------------------------------------
//  QUÉ ES UN ALTA DE RECEPCIÓN, y por qué no es «crear un usuario».
//
//  Lo pedido: que recepción dé de alta a alguien de principio a fin —ficha,
//  teléfono, correo, grupo, matrícula y primer pago— y le mande el enlace de la
//  plataforma con su cuenta ya lista.
//
//  Crear la CUENTA de Firebase Auth desde el navegador tiene un efecto que
//  nadie quiere: deja la sesión iniciada como esa persona, o sea que echa a la
//  recepcionista de la suya en cada alta. Hacerlo bien exige el SDK de
//  administración dentro de una Cloud Function, y eso es plan Blaze.
//
//  Así que un alta de recepción es una **PREINSCRIPCIÓN**: todos los datos
//  quedan guardados y reservados —incluida la matrícula, que ya no se puede
//  repetir— dentro de una invitación personal de un solo uso. La persona abre
//  su enlace, elige su contraseña, y su perfil nace COMPLETO. Cuando llegue
//  Blaze, lo único que cambia es que la cuenta se crea antes y el enlace lleva
//  contraseña temporal; esta pantalla y estos datos no cambian.
//
//  LO QUE RECEPCIÓN NO ESCRIBE NUNCA:
//
//   · **Las dos letras de la matrícula.** Trabaja para una academia, así que su
//     prefijo es contexto, no una decisión de cada alta (ver lib/matriculas.js).
//   · **La academia.** La suya, y no hay otra que elegir.
//
//  Módulo PURO: valida y da forma. No escribe en Firestore ni reserva números.
// ============================================================

// Métodos de cobro que una recepción maneja en mostrador. La pasarela es otro
// trabajo (L) y traerá los suyos.
export const METODOS_PAGO = [
  { id: 'efectivo', etiqueta: 'Efectivo' },
  { id: 'transferencia', etiqueta: 'Transferencia' },
  { id: 'tarjeta', etiqueta: 'Tarjeta' },
  { id: 'deposito', etiqueta: 'Depósito' },
]

export const CONCEPTOS_PAGO = [
  { id: 'inscripcion', etiqueta: 'Inscripción' },
  { id: 'mensualidad', etiqueta: 'Mensualidad' },
  { id: 'material', etiqueta: 'Material' },
  { id: 'otro', etiqueta: 'Otro' },
]

const esMetodo = (m) => METODOS_PAGO.some((x) => x.id === m)
const esConcepto = (c) => CONCEPTOS_PAGO.some((x) => x.id === c)

/**
 * Teléfono normalizado a solo dígitos, conservando un `+` inicial.
 *
 * Se guarda limpio porque de aquí sale el mensaje de bienvenida: una API de
 * mensajería no acepta «(222) 225-6586». Y no se inventa lada de país: un
 * número al que no se sabe llamar es mejor que uno al que se llama mal.
 */
export function normalizarTelefono(valor) {
  const bruto = String(valor || '').trim()
  const mas = bruto.startsWith('+') ? '+' : ''
  return mas + bruto.replace(/\D/g, '')
}

export function telefonoValido(valor) {
  const n = normalizarTelefono(valor).replace('+', '')
  return n.length >= 10 && n.length <= 15
}

export function correoValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(valor || '').trim())
}

/**
 * Qué le falta a un alta para poder guardarse.
 *
 * Devuelve una lista de frases, no un booleano: quien está en un mostrador con
 * alguien delante necesita saber QUÉ falta, no que «hay errores».
 *
 * El teléfono y el correo son obligatorios a propósito: son las dos vías por
 * las que le llega su enlace. Un alta sin ninguna de las dos es una persona a
 * la que no se le puede dar la bienvenida.
 */
export function problemasDelAlta(alta) {
  const p = []
  if (!String(alta?.nombre || '').trim()) p.push('Escribe el nombre completo.')
  if (!correoValido(alta?.email)) p.push('El correo no tiene una forma válida.')
  if (!telefonoValido(alta?.telefono)) p.push('El teléfono debe tener entre 10 y 15 dígitos.')
  // El grupo decide el plan de estudios: sin él, entra y no ve contenido. Es el
  // mismo agujero que se cerró en las altas por directorio el 02-09-2026.
  if (!String(alta?.grupoId || '').trim()) p.push('Elige el grupo al que entra.')
  return p
}

/** Qué le falta a un pago. Un alta sin pago es válida; un pago a medias, no. */
export function problemasDelPago(pago) {
  if (!pago || pago.sinPago) return []
  const p = []
  const monto = Number(pago.monto)
  if (!Number.isFinite(monto) || monto <= 0) p.push('El importe debe ser mayor que cero.')
  // Cien mil no es un tope caprichoso: es el orden de magnitud de una
  // inscripción, y un dedo de más en el teclado se detecta aquí y no en el
  // corte de caja.
  else if (monto > 100000) p.push('El importe parece equivocado: revisa las cifras.')
  if (!esConcepto(pago.concepto)) p.push('Elige el concepto del pago.')
  if (!esMetodo(pago.metodo)) p.push('Elige cómo se pagó.')
  return p
}

/**
 * El documento de preinscripción, listo para guardar.
 *
 * `matricula` y `academiaId` llegan de fuera: los pone quien tiene el contexto,
 * no el formulario.
 */
export function altaParaGuardar(alta, { academiaId, matricula, creadoPor }) {
  return {
    academiaId,
    matricula,
    nombre: String(alta.nombre || '').trim(),
    email: String(alta.email || '').trim().toLowerCase(),
    telefono: normalizarTelefono(alta.telefono),
    grupoId: String(alta.grupoId || '').trim() || null,
    nota: String(alta.nota || '').trim().slice(0, 300),
    creadoPor: creadoPor || null,
  }
}

/** El documento de pago, listo para guardar. */
export function pagoParaGuardar(pago, { academiaId, matricula, registradoPor }) {
  return {
    academiaId,
    matricula,
    monto: Math.round(Number(pago.monto) * 100) / 100,
    concepto: pago.concepto,
    metodo: pago.metodo,
    referencia: String(pago.referencia || '').trim().slice(0, 60),
    nota: String(pago.nota || '').trim().slice(0, 300),
    registradoPor: registradoPor || null,
  }
}

/**
 * El mensaje de bienvenida, ya escrito.
 *
 * Se prepara aquí y no en el componente porque el día que lo mande una API en
 * vez de una persona, el texto tiene que ser el mismo. Y no promete lo que no
 * hay: el enlace lleva a crear la contraseña, no trae una contraseña dentro.
 */
export function textoDeBienvenida({ nombre, academiaNombre, enlace, matricula }) {
  const nom = String(nombre || '').trim().split(/\s+/)[0] || 'Hola'
  return [
    `${nom}, te damos la bienvenida a ${academiaNombre || 'la academia'}.`,
    matricula ? `Tu matrícula es ${matricula}.` : '',
    'Entra con este enlace para crear tu contraseña y empezar:',
    enlace,
  ].filter(Boolean).join('\n')
}

/** `https://wa.me/…` con el mensaje dentro, para el botón de bienvenida. */
export function enlaceWhatsApp(telefono, mensaje) {
  const n = normalizarTelefono(telefono).replace('+', '')
  if (!n) return ''
  return `https://wa.me/${n}?text=${encodeURIComponent(mensaje)}`
}
