import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { rutaImagen } from '../lib/img.js'
import {
  imagenDe, posicionEnPixeles, nombreArchivoTarjeta, POSICION_CODIGO,
} from '../lib/tarjetaInvitacion.js'

// ============================================================
//  Imagen de invitación: TU diseño + el código encima
// ------------------------------------------------------------
//  La página NO compone la tarjeta: carga la imagen que entrega el diseñador
//  (public/imagenes/invitaciones/…) y escribe UNA sola cosa encima, el código,
//  en la posición que fija `POSICION_CODIGO`. Si el archivo no está, se avisa en
//  pantalla en vez de fabricar un fondo: más vale no tener imagen que mandar a
//  WhatsApp una que nadie diseñó.
//
//  CÓMO LLEGA A WHATSAPP, que es lo que condiciona los botones:
//
//   · Móvil (Android/iOS): `navigator.share` con archivos abre el menú del
//     sistema y WhatsApp aparece ahí. Es el camino bueno.
//
//   · Escritorio: NO existe ese menú, y `wa.me` —el enlace de «Enviar por
//     WhatsApp»— solo transporta TEXTO; no hay forma de adjuntar un archivo por
//     URL. Lo que sí funciona en WhatsApp Web es PEGAR: se copia la imagen al
//     portapapeles y se pega en la conversación con Ctrl+V. Por eso el botón
//     principal en escritorio es «Copiar imagen», no «compartir».
//
//   · Y si el navegador no deja escribir imágenes en el portapapeles (Firefox,
//     por ejemplo), queda la descarga para adjuntarla a mano.
// ============================================================
export default function TarjetaInvitacion({ rol = '', academia = '', codigo = '' }) {
  const canvasRef = useRef(null)
  const [estado, setEstado] = useState('cargando') // cargando | listo | sin-imagen
  const [aviso, setAviso] = useState('')

  const archivo = imagenDe(rol)

  const dibujar = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas || !codigo) return
    setEstado('cargando')

    const img = await new Promise((resolver) => {
      const i = new Image()
      i.onload = () => resolver(i)
      i.onerror = () => resolver(null)
      i.src = rutaImagen(archivo)
    })

    if (!img) { setEstado('sin-imagen'); return }

    // El lienzo toma el tamaño REAL de la imagen: se comparte con su calidad
    // original, sin reescalar ni recortar el diseño.
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    // FONDO BLANCO ANTES DE LA IMAGEN. El diseño llega con fondo transparente y
    // su tipografía es negra: si se comparte con la transparencia intacta, un
    // WhatsApp en tema oscuro la compone sobre negro y el texto desaparece.
    // Aplanarla sobre blanco garantiza que se vea igual en cualquier chat.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)

    const p = posicionEnPixeles({ ancho: canvas.width, alto: canvas.height })
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Se encoge hasta caber: un código largo no puede salirse del hueco.
    let tam = p.tam
    do {
      ctx.font = `700 ${tam}px ${p.familia}`
      if (ctx.measureText(codigo).width <= p.maxAncho || tam <= 8) break
      tam -= 2
    } while (true)

    if (p.sombra) {
      // Contorno oscuro: hace legible el código sobre cualquier fondo, que es
      // lo que hace falta cuando el diseño lleva una foto detrás.
      ctx.lineWidth = Math.max(2, Math.round(tam * 0.16))
      ctx.strokeStyle = 'rgba(0,0,0,0.55)'
      ctx.lineJoin = 'round'
      ctx.strokeText(codigo, p.x, p.y)
    }
    ctx.fillStyle = p.color
    ctx.fillText(codigo, p.x, p.y)

    setEstado('listo')
  }, [archivo, codigo])

  useEffect(() => { dibujar() }, [dibujar])

  const comoArchivo = () => new Promise((resolver) => {
    canvasRef.current?.toBlob((blob) => {
      resolver(blob ? { blob, nombre: nombreArchivoTarjeta({ academia, codigo }) } : null)
    }, 'image/png')
  })

  const avisar = (texto) => { setAviso(texto); setTimeout(() => setAviso(''), 2600) }

  const descargar = async () => {
    const f = await comoArchivo()
    if (!f) return
    const url = URL.createObjectURL(f.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = f.nombre
    a.click()
    URL.revokeObjectURL(url)
    avisar('Imagen descargada: adjúntala en WhatsApp.')
  }

  // ESCRITORIO: copiar al portapapeles y pegar con Ctrl+V en WhatsApp Web.
  const copiarImagen = async () => {
    const f = await comoArchivo()
    if (!f) return
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': f.blob })])
      avisar('Imagen copiada. Pégala en WhatsApp con Ctrl+V.')
    } catch {
      // Navegador que no deja escribir imágenes en el portapapeles.
      descargar()
    }
  }

  // MÓVIL: el menú del sistema, con el archivo dentro.
  const compartir = async () => {
    const f = await comoArchivo()
    if (!f) return
    const file = new File([f.blob], f.nombre, { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file] }) } catch { /* cancelado */ }
      return
    }
    copiarImagen()
  }

  if (!codigo) return null

  const puedeCompartirArchivo = typeof navigator !== 'undefined'
    && Boolean(navigator.canShare?.({ files: [new File([new Blob()], 'x.png', { type: 'image/png' })] }))

  return (
    <div className="tarjeta-inv">
      {estado === 'sin-imagen' ? (
        <p className="tarjeta-inv-falta">
          <Icon name="alerta" size={15} /> Falta la imagen de la invitación.
          Deja tu diseño en <code>public/{archivo}</code> y aparecerá aquí con el código encima.
        </p>
      ) : (
        <canvas
          ref={canvasRef}
          className="tarjeta-inv-lienzo"
          aria-label={`Invitación con el código ${codigo}`}
        />
      )}

      {estado === 'listo' && (
        <>
          <div className="tarjeta-inv-acciones">
            {puedeCompartirArchivo ? (
              <button type="button" className="btn btn--sm btn--primario" onClick={compartir}>
                <Icon name="compartir" size={14} /> Enviar imagen
              </button>
            ) : (
              <button type="button" className="btn btn--sm btn--primario" onClick={copiarImagen}>
                <Icon name="copiar" size={14} /> Copiar imagen
              </button>
            )}
            <button type="button" className="btn btn--sm btn--suave" onClick={descargar}>
              <Icon name="bajar" size={14} /> Descargar
            </button>
          </div>
          <p className="tarjeta-inv-nota">
            {puedeCompartirArchivo
              ? 'Se abre el menú de compartir del teléfono, con WhatsApp incluido.'
              : 'En computadora WhatsApp no acepta archivos por enlace: copia la imagen y pégala en el chat con Ctrl+V.'}
          </p>
          <p className="tarjeta-inv-aviso" role="status">{aviso}</p>
        </>
      )}
    </div>
  )
}

// Se reexporta para que quien ajuste el diseño sepa dónde está el único sitio
// que decide la posición del código.
export { POSICION_CODIGO }
