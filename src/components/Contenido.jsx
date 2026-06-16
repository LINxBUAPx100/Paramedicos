// Renderiza los bloques de contenido de un tema según su tipo.
import Imagen from './Imagen.jsx'
import { ATLAS_TEMAS } from '../data/imagenes.js'

// Mapa clave → enlace de imagen del Atlas. Los bloques `diagrama` (antes SVG
// dibujados) reutilizan las mismas imágenes reales del Atlas vía su `clave`.
const ATLAS_SRC = Object.fromEntries(ATLAS_TEMAS.map((t) => [t.clave, t.src]))

function Bloque({ bloque }) {
  switch (bloque.tipo) {
    case 'p':
      return <p className="c-parrafo">{bloque.texto}</p>

    // Antes era un SVG dibujado por la app; ahora es un hueco para imagen real
    // (pega el enlace de Drive en `src`). El título queda como pie y permite buscar referencia.
    case 'diagrama':
      return (
        <div id={bloque.clave ? `diag-${bloque.clave}` : undefined} className="c-diagrama">
          <Imagen
            src={bloque.src || ATLAS_SRC[bloque.clave]}
            alt={bloque.titulo}
            caption={bloque.titulo}
            busqueda={bloque.titulo}
            completa
          />
        </div>
      )

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
      return (
        <Imagen
          src={bloque.src}
          alt={bloque.alt}
          caption={bloque.caption}
          fuente={bloque.fuente}
          fuenteUrl={bloque.fuenteUrl}
          busqueda={bloque.busqueda}
          ratio={bloque.ratio || '16 / 10'}
        />
      )

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
