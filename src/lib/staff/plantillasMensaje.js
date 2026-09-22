// ============================================================
//  Mensajes de recepción — plantillas con los datos ya dentro (lógica PURA)
// ------------------------------------------------------------
//  POR QUÉ EL TEXTO VIVE AQUÍ Y NO EN EL BOTÓN. Es el mismo motivo que ya
//  llevó `textoDeBienvenida` a `lib/recepcionModelo.js`: el día que estos
//  mensajes los mande una API en vez de una persona (trabajo O4b, con Blaze),
//  el texto tiene que ser EL MISMO. Si vive dentro de un componente, ese día se
//  escribe otra versión y las dos se separan.
//
//  LO QUE UNA PLANTILLA NO HACE: prometer lo que no hay. Si falta un dato —no
//  hay saldo, no hay pedido— `componer` lo dice y no manda el mensaje con un
//  hueco. Un «Tu adeudo es de undefined» llega al teléfono de un alumno real.
//
//  Las plantillas se tutean y van sin emojis: es un mensaje de la academia, no
//  de una marca. Y llevan siempre el nombre de la academia porque quien lo
//  recibe tiene varios números guardados y ninguno es este.
// ============================================================
import { enlaceWhatsApp, normalizarTelefono, textoDeBienvenida } from '../recepcionModelo.js'
import { moneda } from './cajaModelo.js'

export { enlaceWhatsApp, normalizarTelefono }

/** El nombre de pila. Un mensaje que empieza por los cuatro apellidos no lo lee nadie. */
const pila = (nombre) => String(nombre || '').trim().split(/\s+/)[0] || ''

/**
 * Las plantillas.
 *
 * `requiere` enumera los datos SIN LOS CUALES el mensaje no se puede componer.
 * `texto(d)` recibe los datos ya preparados por `datosDeMensaje`.
 */
export const PLANTILLAS = [
  {
    id: 'recordatorio-pago',
    etiqueta: 'Recordatorio de pago',
    requiere: ['nombre', 'academia', 'saldo'],
    texto: (d) => [
      `${pila(d.nombre)}, te escribimos de ${d.academia}.`,
      `Tienes un saldo pendiente de ${moneda(d.saldo)}.`,
      'Puedes liquidarlo en recepción en tu próxima clase. Si ya lo pagaste, avísanos para revisarlo.',
    ].join(' '),
  },
  {
    id: 'confirmacion-asistencia',
    etiqueta: 'Confirmación de asistencia',
    requiere: ['nombre', 'academia', 'fecha'],
    texto: (d) => [
      `${pila(d.nombre)}, quedó registrada tu asistencia en ${d.academia} el ${d.fecha}.`,
      d.matricula ? `Matrícula ${d.matricula}.` : '',
      'Cualquier aclaración, con recepción.',
    ].filter(Boolean).join(' '),
  },
  {
    id: 'compra-confirmada',
    etiqueta: 'Compra confirmada',
    requiere: ['nombre', 'academia', 'articulos', 'total'],
    texto: (d) => [
      `${pila(d.nombre)}, confirmamos tu compra en ${d.academia}:`,
      d.articulos,
      `Total: ${moneda(d.total)}.`,
      'Te avisamos en cuanto esté lista para recoger.',
    ].join('\n'),
  },
  {
    id: 'recoleccion-lista',
    etiqueta: 'Recolección lista',
    requiere: ['nombre', 'academia', 'articulos'],
    texto: (d) => [
      `${pila(d.nombre)}, ya puedes pasar por tu pedido a recepción de ${d.academia}:`,
      d.articulos,
      d.saldo > 0 ? `Queda un saldo de ${moneda(d.saldo)} por cubrir al recogerlo.` : 'Está pagado: solo pasa a recogerlo.',
    ].join('\n'),
  },
  {
    id: 'bienvenida',
    etiqueta: 'Bienvenida y acceso',
    requiere: ['nombre', 'academia', 'enlace'],
    // Se DELEGA en el texto que ya existía para el alta de mostrador. Escribir
    // otro aquí crearía dos bienvenidas distintas según por qué botón se pase.
    texto: (d) => textoDeBienvenida({
      nombre: d.nombre,
      academiaNombre: d.academia,
      enlace: d.enlace,
      matricula: d.matricula,
    }),
  },
]

export const plantillaPorId = (id) => PLANTILLAS.find((p) => p.id === id) || null

/**
 * Los datos que las plantillas saben leer, sacados de lo que la ficha ya tiene.
 *
 * Todo opcional: lo que falte lo detecta `componer` y lo dice con nombre.
 */
export function datosDeMensaje({ alumno, academia, saldo, orden, enlace, ahora = new Date() } = {}) {
  const lineas = orden?.lineas || []
  return {
    nombre: alumno?.nombre || '',
    matricula: alumno?.matricula || '',
    telefono: alumno?.telefono || '',
    academia: academia?.nombre || academia?.id || '',
    saldo: Number.isFinite(Number(saldo)) ? Number(saldo) : null,
    total: orden ? (Number(orden.total) || 0) : null,
    articulos: lineas.length
      ? lineas.map((l) => `· ${l.cantidad} × ${l.nombre}`).join('\n')
      : '',
    fecha: ahora instanceof Date
      ? ahora.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
      : '',
    enlace: enlace || '',
  }
}

/** Nombre legible de cada dato, para poder decir QUÉ falta. */
const NOMBRE_DATO = {
  nombre: 'el nombre del alumno',
  academia: 'el nombre de la academia',
  saldo: 'un saldo calculado',
  fecha: 'la fecha',
  articulos: 'un pedido con artículos',
  total: 'el total del pedido',
  enlace: 'el enlace de acceso',
  matricula: 'la matrícula',
}

/**
 * Compone el mensaje.
 *
 * @returns {{texto: string, faltan: string[], enlace: string}}
 *   `faltan` vacío significa que se puede mandar. Si trae algo, `texto` viene
 *   vacío: no se ofrece un mensaje a medias.
 */
export function componer(plantillaId, datos, { telefono } = {}) {
  const plantilla = plantillaPorId(plantillaId)
  if (!plantilla) return { texto: '', faltan: ['una plantilla válida'], enlace: '' }

  const faltan = plantilla.requiere
    .filter((clave) => {
      const v = datos?.[clave]
      if (clave === 'saldo' || clave === 'total') return !Number.isFinite(Number(v))
      return !String(v || '').trim()
    })
    .map((clave) => NOMBRE_DATO[clave] || clave)

  if (faltan.length) return { texto: '', faltan, enlace: '' }

  const texto = plantilla.texto(datos)
  const destino = normalizarTelefono(telefono || datos?.telefono)
  return {
    texto,
    faltan: [],
    // Sin teléfono el mensaje SIGUE sirviendo: se copia y se manda por donde
    // sea. Por eso el enlace vacío no es un error.
    enlace: destino ? enlaceWhatsApp(destino, texto) : '',
  }
}
