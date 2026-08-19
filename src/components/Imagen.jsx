import { useState } from 'react'
import Icon from './Icon.jsx'
import VisorImagen from './VisorImagen.jsx'
import { driveSrc, driveSrcSet } from '../lib/img.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'

function googleImagesUrl(termino) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(termino || '')}`
}

export default function Imagen({
  src,
  alt = '',
  caption,
  fuente,
  fuenteUrl,
  busqueda,
  ratio = '16 / 10',
  sizes = '(max-width: 760px) 100vw, 720px',
  ancho = 1200,
  eager = false,
  className = '',
  rounded = true,
  figura = false,
  // Imagen ENTERA, a su proporción natural y sin recorte. Los diagramas del
  // temario ya la pedían —`Contenido.jsx` pinta `<Imagen … completa />`— pero
  // el componente no la recibía: la propiedad se descartaba en silencio y la
  // imagen salía metida a la fuerza en una caja 16/10 con `object-fit: cover`,
  // o sea, recortada. Los estilos `.imagen--completa` llevaban escritos desde
  // el principio; lo que faltaba era esta línea.
  completa = false,
  // Toda imagen se puede abrir en el visor a pantalla completa: en la tarjeta,
  // un esquema con texto es ilegible. Se apaga (`zoom={false}`) donde ampliar no
  // significa nada —el logo de una academia, las ilustraciones decorativas del
  // Home— o donde abriría una puerta falsa (las tarjetas bloqueadas de Logros).
  zoom = true,
  // JUEGO RESPONSIVO PROPIO: la misma imagen en varios anchos y en dos formatos,
  // servida por este sitio (`scripts/optimizar-imagenes.mjs` los genera y
  // `lib/imagenLocal.js` arma estas dos cadenas). Cuando llegan, el componente
  // pinta un <picture> con AVIF primero y WebP de reserva, y NO toca `src` con
  // driveSrc: aquí no hay nada que reescribir, los archivos ya son los buenos.
  srcSet: srcSetPropio,
  srcSetAvif,
}) {
  const [error, setError] = useState(false)
  const [cargada, setCargada] = useState(false)
  const [abierta, setAbierta] = useState(false)
  // La URL que el navegador ACABÓ usando para esta miniatura. Con `srcset` no
  // tiene por qué ser la de `src`: el navegador elige según el ancho de la
  // tarjeta y la pantalla. El visor necesita ESA, y no una reconstruida, para
  // reutilizar la imagen que ya está en la caché (ver VisorImagen.jsx).
  const [srcCargada, setSrcCargada] = useState('')
  const tieneSrc = src && String(src).trim().length > 0

  const forma = completa
    ? 'imagen--completa'
    : figura ? 'imagen--figura' : rounded ? 'imagen--round' : ''
  const clases = `imagen ${forma} ${className}`.trim()
  // Con la imagen completa NO se fuerza proporción: la marca su propio alto.
  const proporcion = completa ? undefined : ratio
  // `fuenteUrl` la escribe un editor en el contenido: nunca va directa a un href.
  const urlFuente = hrefSeguro(fuenteUrl)

  if (!tieneSrc || error) {
    return (
      <figure className={`${clases} imagen--ph`} style={{ aspectRatio: proporcion }}>
        <div className="imagen-ph-in">
          <span className="imagen-ph-ico"><Icon name="estrella" size={26} /></span>
          <strong>Imagen no disponible por el momento</strong>
          {caption && <p className="imagen-ph-cap">{caption}</p>}
          {busqueda && (
            <a
              className="imagen-ph-btn"
              href={googleImagesUrl(busqueda)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="buscar" size={15} /> Buscar referencia
            </a>
          )}
        </div>
      </figure>
    )
  }

  const ampliable = zoom
  // El clic en el pie (que puede llevar el enlace de la fuente) no abre el visor.
  const alPulsar = (e) => {
    if (e.target.closest('a, button')) return
    setAbierta(true)
  }

  // Un juego propio ya trae sus URLs hechas; lo demás pasa por driveSrc, que
  // resuelve Drive, el proxy de imágenes externas o la ruta propia.
  const propio = Boolean(srcSetPropio || srcSetAvif)
  const elImg = (
    <img
      src={propio ? src : driveSrc(src, ancho)}
      srcSet={propio ? srcSetPropio : driveSrcSet(src)}
      sizes={sizes}
      alt={alt || caption || ''}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : 'auto'}
      decoding="async"
      onLoad={(e) => {
        setCargada(true)
        setSrcCargada(e.currentTarget.currentSrc || e.currentTarget.src || '')
      }}
      onError={() => setError(true)}
    />
  )
  // AVIF primero (pesa la mitad que WebP a igual calidad) y WebP de reserva. El
  // <picture> solo aparece si de verdad hay un AVIF: envolver por costumbre
  // añadiría un nodo que no hace nada.
  const elMedio = srcSetAvif ? (
    <picture>
      <source type="image/avif" srcSet={srcSetAvif} sizes={sizes} />
      {elImg}
    </picture>
  ) : elImg

  const laFigura = (
    <figure
      className={`${clases} ${cargada ? 'is-cargada' : ''} ${ampliable ? 'imagen--ampliable' : ''}`.trim()}
      style={{ aspectRatio: proporcion }}
      onClick={ampliable ? alPulsar : undefined}
    >
      {ampliable && (
        <button
          type="button"
          className="imagen-lupa"
          onClick={() => setAbierta(true)}
          aria-label={caption ? `Ampliar la imagen: ${caption}` : 'Ampliar la imagen'}
          title="Ampliar la imagen"
        >
          <Icon name="expandir" size={17} />
        </button>
      )}
      {elMedio}
      {(caption || fuente) && (
        <figcaption>
          {caption}
          {fuente &&
            (urlFuente ? (
              <>
                {' '}
                <a href={urlFuente} target="_blank" rel="noopener noreferrer">
                  Fuente: {fuente}
                </a>
              </>
            ) : (
              <span className="imagen-fuente"> Fuente: {fuente}</span>
            ))}
        </figcaption>
      )}
    </figure>
  )

  // El visor va FUERA de la <figure>, como hermano. Aunque el portal pinte en
  // document.body, los eventos de React viajan por el ÁRBOL DE REACT, no por el
  // DOM: mientras el visor estuvo dentro de la figura, cada clic en su fondo
  // subía al onClick de la figura, que lo volvía a abrir en el mismo evento
  // (cerrar y abrir a la vez = no cerrar nunca). Fuera, el clic en el fondo solo
  // cierra. En el DOM no añade nada: un fragmento no pinta envoltorio.
  if (!ampliable) return laFigura
  return (
    <>
      {laFigura}
      {abierta && (
        <VisorImagen
          src={src}
          alt={alt}
          caption={caption}
          fuente={fuente}
          // La imagen que ESTA miniatura ya tiene cargada: el visor la reutiliza
          // tal cual (cero peticiones nuevas) y solo pide una más nítida si se
          // amplía. `ancho` queda como respaldo si aún no había cargado.
          srcCargada={srcCargada}
          anchoPagina={ancho}
          onCerrar={() => setAbierta(false)}
        />
      )}
    </>
  )
}
