import { useState } from 'react'
import Icon from './Icon.jsx'
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
}) {
  const [error, setError] = useState(false)
  const [cargada, setCargada] = useState(false)
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

  return (
    <figure className={`${clases} ${cargada ? 'is-cargada' : ''}`} style={{ aspectRatio: proporcion }}>
      <img
        src={driveSrc(src, ancho)}
        srcSet={driveSrcSet(src)}
        sizes={sizes}
        alt={alt || caption || ''}
        loading={eager ? 'eager' : 'lazy'}
        fetchpriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setCargada(true)}
        onError={() => setError(true)}
      />
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
}
