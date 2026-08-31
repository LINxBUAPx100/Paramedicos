// Renderiza los bloques de contenido de un tema según su tipo.
import Imagen from './Imagen.jsx'
import Icon from './Icon.jsx'
import TextoGlosario from './TextoGlosario.jsx'
import { ATLAS_TEMAS } from '../data/imagenes.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'
import { juegoResponsivo } from '../lib/imagenLocal.js'
import { ANCHOS as ANCHOS_FOTO, CARPETA as CARPETA_FOTO } from '../data/fotosTemario.js'

// «imagenes/temario/<nombre>-<ancho>.webp» → el juego responsivo de esa foto.
// Devuelve null para cualquier otra ruta, que es la mayoría.
const RUTA_FOTO = new RegExp(`^imagenes/${CARPETA_FOTO}/(.+)-\\d+\\.webp$`)
function juegoDeFotoTemario(src) {
  const m = typeof src === 'string' && src.match(RUTA_FOTO)
  if (!m) return null
  return juegoResponsivo(m[1], {
    carpeta: `imagenes/${CARPETA_FOTO}`,
    anchos: ANCHOS_FOTO,
    // La lección se lee en una columna de ~740 px; en móvil ocupa casi todo.
    sizes: '(max-width: 880px) 92vw, 740px',
  })
}

// Mapa clave → enlace de imagen del Atlas. Los bloques `diagrama` (antes SVG
// dibujados) reutilizan las mismas imágenes reales del Atlas vía su `clave`.
const ATLAS_SRC = Object.fromEntries(ATLAS_TEMAS.map((t) => [t.clave, t.src]))

// `T` enlaza al glosario cada tecnicismo del texto (TextoGlosario). Sin estado
// compartido entre bloques: el resultado de un bloque no depende de cuáles se
// hayan pintado antes.
function Bloque({ bloque }) {
  const T = (texto) => <TextoGlosario texto={texto} />
  switch (bloque.tipo) {
    case 'p':
      return <p className="c-parrafo">{T(bloque.texto)}</p>

    // Diagrama del temario. La forma preferente es `assetId`: con él la figura
    // llega con su texto alternativo escrito a mano, su descripción ampliada y
    // su panel de créditos, que es lo que exigen las licencias CC BY del
    // material. `clave` sigue resolviendo contra el Atlas (donde la clave ES el
    // assetId) y `src` sigue admitiendo una imagen suelta que no esté catalogada.
    case 'diagrama': {
      const idActivo = bloque.assetId || (ATLAS_SRC[bloque.clave] ? bloque.clave : '')
      return (
        <div id={bloque.clave ? `diag-${bloque.clave}` : undefined} className="c-diagrama">
          <Imagen
            assetId={idActivo || undefined}
            src={idActivo ? undefined : bloque.src}
            alt={bloque.titulo}
            caption={bloque.titulo}
            busqueda={idActivo ? undefined : bloque.titulo}
            completa
          />
        </div>
      )
    }

    case 'h3':
      return <h3 className="c-subtitulo">{bloque.texto}</h3>

    case 'lista':
      return (
        <div className="c-lista-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <ul className="c-lista">
            {bloque.items.map((it, i) => (
              <li key={i}>{T(it)}</li>
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
                <span>{T(it)}</span>
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
      const iconos = { clave: 'chispa', clinico: 'cruz', alerta: 'alerta', dosis: 'pildora' }
      return (
        <div className={`c-callout c-callout--${bloque.variante}`}>
          <div className="c-callout-ico"><Icon name={iconos[bloque.variante] || 'pin'} size={20} /></div>
          <div>
            {bloque.titulo && <strong className="c-callout-titulo">{bloque.titulo}</strong>}
            <p>{T(bloque.texto)}</p>
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

    case 'imagen': {
      // Juego responsivo DERIVADO de la propia ruta, sin campo nuevo.
      //
      // Las fotografías de contexto (src/data/fotosTemario.js) se sirven en
      // AVIF y WebP a varios anchos, y para aprovecharlo `Imagen` necesita
      // `srcSet`. Se podría haber añadido un campo al bloque, pero el modelo
      // de contenido prohíbe campos nuevos hasta implementarlos en editor,
      // API, Firestore, reglas y pruebas — y aquí no hace falta: la ruta ya
      // trae el nombre y el ancho («imagenes/temario/rcp-dea-maniqui-800.webp»),
      // así que el juego se reconstruye de ella.
      //
      // Solo se aplica a esa carpeta. Una imagen suelta de otro sitio sigue
      // sirviéndose tal cual, que es lo que se espera de ella.
      const foto = !bloque.assetId && juegoDeFotoTemario(bloque.src)
      return (
        <Imagen
          assetId={bloque.assetId || undefined}
          src={bloque.assetId ? undefined : (foto ? foto.src : bloque.src)}
          srcSet={foto ? foto.srcSet : undefined}
          srcSetAvif={foto ? foto.srcSetAvif : undefined}
          alt={bloque.alt}
          caption={bloque.caption}
          fuente={bloque.fuente}
          fuenteUrl={bloque.fuenteUrl}
          busqueda={bloque.busqueda}
          ratio={bloque.ratio || '16 / 10'}
        />
      )
    }

    case 'fuentes':
      return (
        <div className="c-fuentes">
          <h4 className="c-fuentes-titulo">{bloque.titulo || 'Fuentes y lecturas recomendadas'}</h4>
          <ul className="c-fuentes-lista">
            {bloque.items.map((f, i) => (
              <li key={i}>
                {hrefSeguro(f.url) ? (
                  <a href={hrefSeguro(f.url)} target="_blank" rel="noopener noreferrer">
                    {f.nombre}
                  </a>
                ) : (
                  // Sin url, o con una que no es http(s): texto, nunca un href.
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
