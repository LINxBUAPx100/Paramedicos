// ============================================================
//  MATERIAL DE CLASE de un tema: PDF y presentaciones para VER, no para bajar
// ------------------------------------------------------------
//  Distinto de `recursos.archivos`, que ya existía y seguirá existiendo: aquél
//  es un adjunto DESCARGABLE a propósito —una guía, un formato en blanco— y por
//  eso exige `url` y `path`. Esto es lo contrario: el material que la academia
//  quiere mostrar sin repartir.
//
//  LO PRIMERO, PORQUE CONDICIONA TODO LO DEMÁS:
//
//  **No existe forma de mostrar un PDF en un navegador y evitar que se guarde.**
//  Si el navegador lo pinta, los bytes están en la máquina del alumno: la
//  pestaña de red los tiene. Desactivar el botón derecho no protege nada, y
//  creer que sí es peor que no protegerlo, porque se reparte material sensible
//  confiando en un candado que no cierra.
//
//  Lo que SÍ se puede hacer, y es lo que hace este módulo posible:
//
//   · SERVIR SOLO A QUIEN TOCA. El enlace no es público: se resuelve para un
//     alumno con sesión, de esa academia y de ese programa.
//   · MARCAR CADA COPIA. La marca de agua con el nombre y la matrícula no
//     impide copiar: hace IDENTIFICABLE a quien copió. Es el único control con
//     efecto disuasorio real, y por eso es obligatorio en el material propio.
//   · DEJAR RASTRO de quién abrió qué y cuándo.
//
//  DOS ORÍGENES, y la diferencia es de dinero además de control:
//
//   · `enlace`  — vive fuera (Drive, OneDrive, YouTube). Cuesta CERO en
//     transferencia. A cambio, quien tenga el enlace lo abre: el control es de
//     quien comparte el documento, no de PTEM. Sirve para material que no
//     importa que circule.
//   · `archivo` — vive en el almacenamiento de la academia. Se sirve con enlace
//     firmado de vida corta y marca de agua. Cuesta transferencia, y por eso
//     este módulo obliga a declararlo (ver `costoEstimado`).
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

/** Orígenes admitidos. Uno barato y sin control; otro con control y con costo. */
export const ORIGENES = ['enlace', 'archivo']

/**
 * Formatos que la plataforma sabe MOSTRAR sin obligar a descargar.
 *
 * PowerPoint no está: el navegador no lo pinta, así que un `.pptx` solo se
 * puede ofrecer para bajar —y eso es `recursos.archivos`, no esto—. Para
 * mostrarlo hay que exportarlo a PDF primero, y el editor lo dice.
 */
export const FORMATOS = {
  pdf: { etiqueta: 'PDF', extensiones: ['pdf'], mime: 'application/pdf', visible: true },
  presentacion: {
    etiqueta: 'Presentación',
    extensiones: ['pptx', 'ppt', 'odp', 'key'],
    mime: null,
    visible: false,
  },
}

/** Tope por archivo. Por encima, la transferencia deja de ser despreciable. */
export const MAX_MB = 25

export function formatoDeNombre(nombre) {
  const ext = String(nombre || '').split('.').pop().toLowerCase()
  for (const [id, f] of Object.entries(FORMATOS)) {
    if (f.extensiones.includes(ext)) return id
  }
  return null
}

/**
 * ¿Se puede MOSTRAR sin descargar?
 *
 * Solo el PDF. Una presentación tiene que exportarse a PDF; si no, lo único
 * honesto que se puede ofrecer es un enlace de descarga, y entonces no es
 * material protegido.
 */
export function seMuestraEnPantalla(formato) {
  return Boolean(FORMATOS[formato]?.visible)
}

/**
 * Texto de la marca de agua para un alumno.
 *
 * Lleva matrícula y fecha además del nombre: dos personas pueden llamarse
 * igual, y la fecha acota cuándo se sacó la copia. Sin datos del alumno NO se
 * devuelve una marca genérica —eso daría una falsa sensación de control—: se
 * devuelve null y el visor se niega a pintar.
 */
export function marcaDeAgua({ nombre, matricula, fecha } = {}) {
  const quien = String(nombre || '').trim()
  if (!quien) return null
  const partes = [quien]
  if (matricula) partes.push(String(matricula).trim())
  if (fecha) partes.push(String(fecha).slice(0, 10))
  return partes.join(' · ')
}

/**
 * Normaliza una entrada de material. Devuelve `{ material, error }`.
 *
 * No adivina: si falta algo que decide si se puede proteger —el origen, el
 * formato, la ruta— se rechaza con un motivo entendible en vez de guardar una
 * ficha a medias que fallará el día que un alumno la abra.
 */
export function normalizarMaterial(entrada) {
  const m = entrada || {}
  const titulo = String(m.titulo || '').trim()
  if (!titulo) return { material: null, error: 'El material necesita un título.' }
  if (titulo.length > 200) return { material: null, error: 'El título del material es demasiado largo.' }

  const origen = ORIGENES.includes(m.origen) ? m.origen : null
  if (!origen) return { material: null, error: `Origen desconocido: usa ${ORIGENES.join(' o ')}.` }

  if (origen === 'enlace') {
    const url = String(m.url || '').trim()
    if (!/^https:\/\//i.test(url)) {
      return { material: null, error: 'El enlace tiene que empezar por https.' }
    }
    return {
      material: {
        titulo, origen: 'enlace', url,
        formato: m.formato || formatoDeNombre(url) || 'pdf',
        // Un enlace externo NO se puede marcar ni firmar: lo sirve otro. Se
        // guarda dicho, para que la interfaz pueda advertirlo y nadie crea que
        // este material está protegido.
        protegido: false,
      },
      error: null,
    }
  }

  const path = String(m.path || '').trim()
  if (!path) return { material: null, error: 'El archivo no tiene ruta de almacenamiento.' }
  const formato = m.formato || formatoDeNombre(path)
  if (!formato) return { material: null, error: 'Formato no admitido. Admite PDF o presentación.' }
  const mb = Number(m.mb) || 0
  if (mb > MAX_MB) return { material: null, error: `El archivo pesa ${mb} MB; el tope son ${MAX_MB} MB.` }

  return {
    material: {
      titulo, origen: 'archivo', path, formato, mb,
      // Un archivo propio SÍ se sirve firmado y marcado. Que se muestre en
      // pantalla depende del formato: un .pptx solo se puede ofrecer para bajar.
      protegido: true,
      enPantalla: seMuestraEnPantalla(formato),
    },
    error: null,
  }
}

/** Valida una lista entera. Devuelve el primer problema, o null. */
export function validarMaterial(lista) {
  if (lista == null) return null
  if (!Array.isArray(lista)) return 'El material del tema es inválido.'
  if (lista.length > 10) return 'Un tema admite como máximo 10 materiales.'
  for (const m of lista) {
    const { error } = normalizarMaterial(m)
    if (error) return error
  }
  return null
}

/**
 * Transferencia mensual estimada de los archivos PROPIOS de una lista.
 *
 * Existe para que el costo se vea antes de subir, no en el recibo. Los enlaces
 * externos no cuentan: los sirve otro, y ése es justamente su atractivo.
 *
 * @param {Array} lista materiales
 * @param {number} alumnos cuántos lo abrirán
 * @param {number} veces cuántas veces al mes cada uno
 */
export function costoEstimado(lista, alumnos = 0, veces = 2) {
  const propios = (lista || []).filter((m) => m?.origen === 'archivo')
  const mb = propios.reduce((t, m) => t + (Number(m.mb) || 0), 0)
  const gb = (mb * alumnos * veces) / 1024
  // $0.12 USD por GB de transferencia, a $18.50 por dólar.
  const pesos = gb * 0.12 * 18.5
  return {
    archivos: propios.length,
    mbPorAlumno: Math.round(mb * veces * 10) / 10,
    gbMensual: Math.round(gb * 100) / 100,
    pesosMensual: Math.round(pesos * 100) / 100,
  }
}
