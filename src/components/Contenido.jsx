// Renderiza los bloques de contenido de un tema según su tipo.
import { useState } from 'react'
import Diagrama from './Diagramas.jsx'

// URL de búsqueda directa en Google Imágenes a partir de un término.
function googleImagesUrl(termino) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(termino || '')}`
}

// Bloque de imagen/ilustración externa (complementa a los diagramas SVG propios).
// - Si `src` trae una URL o ruta local (p. ej. "/img/farmacologia/foo.png") muestra la imagen.
// - Si `src` está vacío (o la imagen falla) muestra un PLACEHOLDER con un botón que
//   busca el término sugerido en Google Imágenes e instrucciones para insertar el archivo.
function BloqueImagen({ bloque }) {
  const [error, setError] = useState(false)
  const tieneSrc = bloque.src && bloque.src.trim().length > 0

  if (!tieneSrc || error) {
    return (
      <figure className="c-imagen c-imagen--placeholder">
        <div className="c-imagen-ph">
          <span className="c-imagen-ph-ico">🖼️</span>
          <strong>Espacio para ilustración</strong>
          {bloque.caption && <p className="c-imagen-ph-desc">{bloque.caption}</p>}
          {bloque.busqueda && (
            <a
              className="c-imagen-ph-btn"
              href={googleImagesUrl(bloque.busqueda)}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔍 Buscar «{bloque.busqueda}» en Google Imágenes
            </a>
          )}
          <code className="c-imagen-ph-hint">
            Pega una URL o coloca el archivo en <b>/public/img/</b> y rellena <b>src</b> de este bloque.
          </code>
        </div>
      </figure>
    )
  }

  return (
    <figure className="c-imagen">
      <img src={bloque.src} alt={bloque.alt || bloque.caption || ''} loading="lazy" onError={() => setError(true)} />
      {(bloque.caption || bloque.fuente) && (
        <figcaption>
          {bloque.caption}
          {bloque.fuente &&
            (bloque.fuenteUrl ? (
              <>
                {' '}
                <a href={bloque.fuenteUrl} target="_blank" rel="noopener noreferrer">
                  Fuente: {bloque.fuente}
                </a>
              </>
            ) : (
              <span className="c-imagen-fuente"> Fuente: {bloque.fuente}</span>
            ))}
        </figcaption>
      )}
    </figure>
  )
}

function Bloque({ bloque }) {
  switch (bloque.tipo) {
    case 'p':
      return <p className="c-parrafo">{bloque.texto}</p>

    case 'diagrama':
      return <Diagrama clave={bloque.clave} titulo={bloque.titulo} descripcion={bloque.descripcion} />

    case 'h3':
      return <h3 className="c-subtitulo">{bloque.texto}</h3>

    case 'lista':
      return (
        <div className="c-lista-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <ul className="c-lista">
            {bloque.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      )

    case 'pasos':
      return (
        <div className="c-lista-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <ol className="c-pasos">
            {bloque.items.map((it, i) => (
              <li key={i}>
                <span className="c-paso-num">{i + 1}</span>
                <span>{it}</span>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'tabla':
      return (
        <div className="c-tabla-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <table className="c-tabla">
            <thead>
              <tr>
                {bloque.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila, i) => (
                <tr key={i}>
                  {fila.map((celda, j) => (
                    <td key={j}>{celda}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout': {
      const iconos = { clave: '💡', clinico: '🩺', alerta: '⚠️', dosis: '💊' }
      return (
        <div className={`c-callout c-callout--${bloque.variante}`}>
          <div className="c-callout-ico">{iconos[bloque.variante] || '📌'}</div>
          <div>
            {bloque.titulo && <strong className="c-callout-titulo">{bloque.titulo}</strong>}
            <p>{bloque.texto}</p>
          </div>
        </div>
      )
    }

    case 'formula':
      return (
        <div className="c-formula">
          <code>{bloque.texto}</code>
          {bloque.nota && <span className="c-formula-nota">{bloque.nota}</span>}
        </div>
      )

    case 'imagen':
      return <BloqueImagen bloque={bloque} />

    case 'fuentes':
      return (
        <div className="c-fuentes">
          <h4 className="c-fuentes-titulo">📚 {bloque.titulo || 'Fuentes y lecturas recomendadas'}</h4>
          <ul className="c-fuentes-lista">
            {bloque.items.map((f, i) => (
              <li key={i}>
                {f.url ? (
                  <a href={f.url} target="_blank" rel="noopener noreferrer">
                    {f.nombre}
                  </a>
                ) : (
                  <span>{f.nombre}</span>
                )}
                {f.nota && <span className="c-fuentes-nota"> — {f.nota}</span>}
              </li>
            ))}
          </ul>
        </div>
      )

    default:
      return null
  }
}

export default function Contenido({ secciones }) {
  return (
    <div className="contenido-tema">
      {secciones.map((sec, i) => (
        <section className="seccion" key={i}>
          <h2 className="seccion-titulo">{sec.titulo}</h2>
          {sec.bloques.map((b, j) => (
            <Bloque bloque={b} key={j} />
          ))}
        </section>
      ))}
    </div>
  )
}
