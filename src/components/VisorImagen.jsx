import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'
import { driveSrc, esImagenPropia } from '../lib/img.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'

// ============================================================
//  Visor de imagen a pantalla completa (la lupa del temario)
// ------------------------------------------------------------
//  Las «Imágenes de referencia» y los diagramas de cada lección se pintaban
//  dentro de una tarjeta de ~380 px y con recorte 4/3: los esquemas con texto
//  (sistema de conducción cardíaca, determinantes del gasto cardíaco…) salían
//  ilegibles y además cortados. Una imagen que no se puede leer no enseña
//  nada, así que CUALQUIER imagen del sitio se puede abrir aquí.
//
//  Decisiones:
//   · Ampliar de verdad, sin parpadeo: primero se pinta EL MISMO archivo que
//     ya cargó la miniatura de la página (está en la caché del navegador, así
//     que aparece al instante) y después se cambia por la versión nítida, ya
//     precargada en segundo plano. Estrenar una URL propia al abrir el visor
//     era justo lo que se veía como «las imágenes se rompen»: un <img> vacío
//     mide 0 de alto y, ampliado, deja una franja blanca sin diagrama.
//   · El zoom escala el ANCHO del <img> y deja desbordar el lienzo, en vez de
//     usar `transform`. Así el paneo es el scroll nativo del contenedor:
//     funciona con el dedo, con la rueda y con el teclado sin código propio, y
//     el arrastre con ratón solo mueve `scrollLeft/scrollTop`.
//   · Al cambiar de nivel se conserva el punto que se estaba mirando; si no,
//     cada clic en «+» salta a la esquina superior izquierda.
//
//  Accesible: role=dialog + aria-modal, Escape cierra, el foco entra al abrir
//  y vuelve a donde estaba, y la página de detrás no hace scroll mientras está
//  abierto.
// ============================================================

// Niveles de ampliación. 1 = «ajustada a la pantalla».
const NIVELES = [1, 1.5, 2, 3, 4]
const MAXIMO = NIVELES[NIVELES.length - 1]

// Ancho al que se pide la versión NÍTIDA. Es el mayor que reparte
// `driveSrcSet`, no uno inventado: así vuelve a ser una URL del mismo juego que
// la página ya usa (con 2400 px se pedía un archivo distinto para nada).
const ANCHO_NITIDO = 1600

export default function VisorImagen({
  src, alt = '', caption, fuente, onCerrar,
  // URL EXACTA que la miniatura de la página acabó cargando (su `currentSrc`).
  // Es la única que se sabe con certeza que funciona y que está en la caché del
  // navegador. Ver la nota larga de más abajo: reconstruirla «igual» no vale.
  srcCargada = '',
  // Ancho con el que la miniatura PIDIÓ la imagen. Solo se usa de respaldo, si
  // el visor se abre antes de que la miniatura haya terminado de cargar.
  anchoPagina = 1200,
}) {
  const [zoom, setZoom] = useState(1)
  const lienzo = useRef(null)
  const dialogo = useRef(null)
  const focoPrevio = useRef(null)
  // Punto que se está mirando (0–1 sobre la imagen) para no perderlo al ampliar.
  const centro = useRef({ x: 0.5, y: 0.5 })
  const arrastre = useRef(null)

  const ampliada = zoom > 1

  // --- QUÉ ARCHIVO SE PINTA -----------------------------------------------
  //  REGLA DE ORO: el visor empieza con el archivo EXACTO que la página ya
  //  tiene cargado (`srcCargada` = el `currentSrc` de la miniatura). No una URL
  //  «equivalente»: la misma cadena. Así no hay ni una petición de red nueva
  //  para enseñar la imagen — si la miniatura se ve, el visor se ve.
  //
  //  Por qué es una regla y no una optimización: la primera versión pedía un
  //  ancho propio (2400 px) y la segunda uno «de la misma familia» (1200 px).
  //  Las dos fallaron con las imágenes de Google Drive, que era justo lo que se
  //  veía: la miniatura perfecta en la página y «No pudimos cargar esta imagen»
  //  al abrirla. Con `srcset`, el navegador pudo haber elegido el ancho de 800
  //  para la tarjeta, así que 1200 era un archivo que NUNCA se había pedido; y
  //  lh3 (el CDN de Drive) no garantiza responder a cualquier ancho ni a dos
  //  peticiones seguidas del mismo archivo.
  //
  //  La versión nítida se pide SOLO al ampliar de verdad (al pasar de 100 %),
  //  que es cuando los píxeles extra importan, y se cambia únicamente si esa
  //  precarga sale bien. Si falla, se queda la que ya funcionaba: ampliar nunca
  //  puede empeorar lo que ya se estaba viendo.
  const respaldo = useMemo(() => driveSrc(src, anchoPagina), [src, anchoPagina])
  const inmediata = srcCargada || respaldo
  const nitida = useMemo(() => driveSrc(src, ANCHO_NITIDO), [src])
  const [mostrada, setMostrada] = useState(inmediata)
  const [roto, setRoto] = useState(false)
  // Cuenta de reintentos manuales: se añade a la URL para que el navegador no
  // devuelva el fallo cacheado (un 429 de Drive se cachea igual que un acierto).
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    setMostrada(inmediata)
    setRoto(false)
  }, [inmediata])

  // Mejora de nitidez, una sola vez y solo si se amplía.
  const mejorada = useRef(false)
  useEffect(() => {
    if (!ampliada || mejorada.current) return undefined
    if (!nitida || nitida === inmediata) return undefined
    // Una imagen PROPIA no tiene variantes de tamaño: el archivo de
    // `public/imagenes/` es el único que hay, así que no hay nada que mejorar y
    // pedirlo otra vez solo gastaría una petición.
    if (esImagenPropia(src)) return undefined
    mejorada.current = true
    const previa = new Image()
    previa.onload = () => setMostrada(nitida)
    previa.src = nitida
    return () => { previa.onload = null }
  }, [ampliada, nitida, inmediata, src])

  // Si la que traía la página tampoco carga (se abrió el visor antes de que
  // terminara, o el enlace cayó), se prueba el respaldo y luego se avisa.
  const alFallar = () => {
    if (mostrada !== respaldo && respaldo) setMostrada(respaldo)
    else setRoto(true)
  }

  // El enlace externo se filtra como cualquier href de contenido; la ruta
  // propia («imagenes/…») la construye rutaImagen, así que ya es de la casa.
  const urlAbrir = esImagenPropia(src) ? nitida : hrefSeguro(nitida)

  const cambiarZoom = useCallback((nuevo) => {
    const el = lienzo.current
    if (el && el.scrollWidth > 0 && el.scrollHeight > 0) {
      centro.current = {
        x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
        y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
      }
    }
    setZoom(Math.min(MAXIMO, Math.max(1, nuevo)))
  }, [])

  const saltar = useCallback((paso) => {
    setZoom((actual) => {
      const i = NIVELES.indexOf(actual)
      const desde = i === -1 ? 0 : i
      const destino = NIVELES[Math.min(NIVELES.length - 1, Math.max(0, desde + paso))]
      if (destino === actual) return actual
      const el = lienzo.current
      if (el && el.scrollWidth > 0 && el.scrollHeight > 0) {
        centro.current = {
          x: (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth,
          y: (el.scrollTop + el.clientHeight / 2) / el.scrollHeight,
        }
      }
      return destino
    })
  }, [])

  // Recolocar el scroll tras cada cambio de nivel, ya con el tamaño nuevo medido.
  useLayoutEffect(() => {
    const el = lienzo.current
    if (!el) return
    const { x, y } = centro.current
    el.scrollLeft = x * el.scrollWidth - el.clientWidth / 2
    el.scrollTop = y * el.scrollHeight - el.clientHeight / 2
  }, [zoom])

  // Teclado, foco y bloqueo del scroll de la página de detrás.
  useEffect(() => {
    focoPrevio.current = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onCerrar(); return }
      if (e.key === '+' || e.key === '=') { e.preventDefault(); saltar(1) }
      if (e.key === '-' || e.key === '_') { e.preventDefault(); saltar(-1) }
      if (e.key === '0') { e.preventDefault(); cambiarZoom(1) }
    }
    document.addEventListener('keydown', onKey)
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // El foco entra por el botón de CERRAR, no por el primero que haya: a 100 %
    // «Reducir» está deshabilitado, y un botón deshabilitado no acepta el foco,
    // así que quien llegaba con el teclado se quedaba fuera del diálogo.
    dialogo.current?.querySelector('.visor-btn--cerrar')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflowPrevio
      // Devolver el foco a la imagen que abrió el visor: sin esto, quien navega
      // con teclado queda al principio del documento.
      focoPrevio.current?.focus?.()
    }
  }, [onCerrar, saltar, cambiarZoom])

  // Arrastrar para desplazarse cuando la imagen no cabe (ratón y lápiz; el dedo
  // usa el scroll táctil nativo del lienzo).
  const alBajar = (e) => {
    if (!ampliada || e.pointerType === 'touch') return
    const el = lienzo.current
    if (!el) return
    arrastre.current = { x: e.clientX, y: e.clientY, sx: el.scrollLeft, sy: el.scrollTop }
    el.setPointerCapture?.(e.pointerId)
  }
  const alMover = (e) => {
    const a = arrastre.current
    const el = lienzo.current
    if (!a || !el) return
    el.scrollLeft = a.sx - (e.clientX - a.x)
    el.scrollTop = a.sy - (e.clientY - a.y)
  }
  const alSoltar = () => { arrastre.current = null }

  return createPortal(
    <div
      className="visor-fondo"
      onClick={(e) => { if (e.target === e.currentTarget) onCerrar() }}
    >
      <div
        className="visor"
        role="dialog"
        aria-modal="true"
        aria-label={caption ? `Imagen ampliada: ${caption}` : 'Imagen ampliada'}
        ref={dialogo}
      >
        <div className="visor-barra">
          <p className="visor-titulo">{caption || alt}</p>
          <div className="visor-botones">
            <button
              type="button"
              className="visor-btn"
              onClick={() => saltar(-1)}
              disabled={!ampliada}
              aria-label="Reducir"
              title="Reducir (tecla −)"
            >
              <Icon name="menos" size={18} />
            </button>
            <span className="visor-nivel" aria-live="polite">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="visor-btn"
              onClick={() => saltar(1)}
              disabled={zoom === MAXIMO}
              aria-label="Ampliar"
              title="Ampliar (tecla +)"
            >
              <Icon name="mas" size={18} />
            </button>
            <button
              type="button"
              className="visor-btn visor-btn--txt"
              onClick={() => cambiarZoom(1)}
              disabled={!ampliada}
              title="Ver la imagen completa en la pantalla (tecla 0)"
            >
              Ajustar
            </button>
            {urlAbrir && (
              <a
                className="visor-btn visor-btn--txt"
                href={urlAbrir}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir el archivo original en otra pestaña"
              >
                Abrir original
              </a>
            )}
            <button
              type="button"
              className="visor-btn visor-btn--cerrar"
              onClick={onCerrar}
              aria-label="Cerrar la imagen ampliada"
              title="Cerrar (Esc)"
            >
              <Icon name="cerrar" size={18} />
            </button>
          </div>
        </div>

        <div
          className={`visor-lienzo${ampliada ? ' is-ampliada' : ''}`}
          ref={lienzo}
          onPointerDown={alBajar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
          onPointerCancel={alSoltar}
          onDoubleClick={() => cambiarZoom(ampliada ? 1 : 2)}
          onWheel={(e) => {
            // Solo con Ctrl/⌘: sin modificador la rueda tiene que desplazar la
            // imagen ampliada, que es lo que espera cualquiera.
            if (!e.ctrlKey && !e.metaKey) return
            e.preventDefault()
            saltar(e.deltaY < 0 ? 1 : -1)
          }}
        >
          {roto ? (
            <div className="visor-roto" role="status">
              <Icon name="alerta" size={26} />
              <strong>No pudimos cargar esta imagen</strong>
              <p>
                El archivo no respondió. Vuelve a intentarlo; si el problema sigue,
                ábrela con «Abrir original» o avisa a tu academia para que revise el enlace.
              </p>
              <button
                type="button"
                className="visor-btn"
                onClick={() => { setRoto(false); setMostrada(`${inmediata}${inmediata.includes('?') ? '&' : '?'}r=${intento + 1}`); setIntento((n) => n + 1) }}
              >
                <Icon name="restaurar" size={16} /> Volver a intentar
              </button>
            </div>
          ) : (
            <img
              src={mostrada}
              alt={alt || caption || ''}
              draggable="false"
              onError={alFallar}
              style={ampliada ? { width: `${zoom * 100}%` } : undefined}
            />
          )}
        </div>

        <p className="visor-pie">
          {fuente && <span className="visor-fuente">Fuente: {fuente}</span>}
          <span className="visor-ayuda">
            Doble clic o «+» para ampliar · arrastra para moverte · Esc para cerrar
          </span>
        </p>
      </div>
    </div>,
    document.body,
  )
}
