import { ESTILOS, componerTemario, nombreArchivo } from './exportarTemario.js'

// ============================================================
//  Pintar el temario compuesto en un <canvas> y descargarlo
// ------------------------------------------------------------
//  Esta parte NO decide nada: recibe la lista de elementos que compuso
//  `exportarTemario.js` y los dibuja donde le dicen. Todo lo que se podía
//  equivocar está en el módulo puro, que sí tiene pruebas.
//
//  Sin librerías, a propósito: meter una para exportar imágenes obligaría a
//  abrir la CSP, que se cerró en el bloque C y no vale la pena reabrir por un
//  botón.
// ============================================================

const FUENTE = '"Segoe UI", system-ui, -apple-system, sans-serif'

// La MISMA fuente para medir y para pintar. Si se construyeran por separado,
// se mediría con una y se pintaría con otra, y los saltos de línea caerían
// donde no toca.
function fuenteDe(estilo) {
  const e = ESTILOS[estilo] || ESTILOS.tema
  return `${e.peso} ${e.tamano}px ${FUENTE}`
}

// Escala para que la imagen no salga borrosa en pantallas densas ni pese de más.
const ESCALA = 2

export function dibujarTemario(canvas, composicion) {
  const ctx = canvas.getContext('2d')
  const { ancho, alto, elementos } = composicion

  canvas.width = ancho * ESCALA
  canvas.height = alto * ESCALA
  ctx.setTransform(ESCALA, 0, 0, ESCALA, 0, 0)

  // Fondo blanco explícito: un canvas nace transparente y un PNG transparente
  // se ve fatal pegado en WhatsApp o en un documento, que es donde va a acabar.
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, ancho, alto)

  ctx.textBaseline = 'alphabetic'

  for (const el of elementos) {
    if (el.tipo === 'linea') {
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(el.x1, el.y1)
      ctx.lineTo(el.x2, el.y2)
      ctx.stroke()
      continue
    }
    if (el.tipo === 'circulo') {
      ctx.fillStyle = el.color || '#0c5fc4'
      ctx.beginPath()
      ctx.arc(el.x, el.y, el.r, 0, Math.PI * 2)
      ctx.fill()
      // El número dentro del círculo: centrado en los dos ejes.
      ctx.fillStyle = ESTILOS.numero.color
      ctx.font = fuenteDe('numero')
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(el.texto, el.x, el.y + 1)
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      continue
    }
    const est = ESTILOS[el.estilo] || ESTILOS.tema
    ctx.fillStyle = est.color
    ctx.font = fuenteDe(el.estilo)
    ctx.fillText(el.texto, el.x, el.y)
  }
}

// Compone, pinta y descarga. Devuelve el nombre del archivo generado.
export async function descargarTemarioPNG({ fases, ocultas, academia, grupo }) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Este navegador no permite generar la imagen.')

  // `medir` real: la misma fuente con la que se va a pintar.
  const medir = (texto, estilo) => {
    ctx.font = fuenteDe(estilo)
    return ctx.measureText(texto).width
  }

  const fecha = new Date().toISOString().slice(0, 10)
  const composicion = componerTemario({ fases, ocultas, academia, grupo, fecha, medir })
  dibujarTemario(canvas, composicion)

  const nombre = nombreArchivo({ academia, grupo, fecha })
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('No se pudo generar la imagen.'))), 'image/png')
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Se libera en el siguiente ciclo: revocarla en el mismo puede cancelar la
  // descarga antes de que el navegador la haya empezado.
  setTimeout(() => URL.revokeObjectURL(url), 0)
  return nombre
}
