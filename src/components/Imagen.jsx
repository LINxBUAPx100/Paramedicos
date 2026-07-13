import { useState } from 'react'
import Icon from './Icon.jsx'
import { driveSrc, driveSrcSet } from '../lib/img.js'

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
}) {
  const [error, setError] = useState(false)
  const [cargada, setCargada] = useState(false)
  const tieneSrc = src && String(src).trim().length > 0

  const forma = figura ? 'imagen--figura' : rounded ? 'imagen--round' : ''
  const clases = `imagen ${forma} ${className}`.trim()

  if (!tieneSrc || error) {
    return (
      <figure className={`${clases} imagen--ph`} style={{ aspectRatio: ratio }}>
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
    <figure className={`${clases} ${cargada ? 'is-cargada' : ''}`} style={{ aspectRatio: ratio }}>
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
            (fuenteUrl ? (
              <>
                {' '}
                <a href={fuenteUrl} target="_blank" rel="noopener noreferrer">
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
