import Icon from './Icon.jsx'
import Imagen from './Imagen.jsx'

// Sección de recursos de un tema: videos, fuentes, imágenes y descargables.
// `recursos = { videos: [{titulo,url,canal}], fuentes: [{titulo,url,tipo}],
//               imagenes: [{src?,busqueda,caption}],
//               archivos: [{titulo,url,tipo,tamano}] }`  ← Fase 4 (aditivo)
export default function Recursos({ recursos }) {
  if (!recursos) return null
  const { videos = [], fuentes = [], imagenes = [], archivos = [] } = recursos
  if (videos.length === 0 && fuentes.length === 0 && imagenes.length === 0 && archivos.length === 0) return null

  return (
    <section className="recursos-tema">
      {videos.length > 0 && (
        <div className="rec-bloque">
          <h3 className="rec-titulo"><Icon name="flecha" size={16} /> Videos recomendados</h3>
          <div className="rec-videos">
            {videos.map((v, i) => (
              <a key={i} className="rec-video" href={v.url} target="_blank" rel="noopener noreferrer">
                <span className="rec-video-play"><Icon name="flecha" size={18} /></span>
                <span className="rec-video-info">
                  <strong>{v.titulo}</strong>
                  {v.canal && <span className="rec-video-canal">{v.canal}</span>}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {imagenes.length > 0 && (
        <div className="rec-bloque">
          <h3 className="rec-titulo"><Icon name="atlas" size={16} /> Imágenes del tema</h3>
          <div className="rec-imagenes">
            {imagenes.map((img, i) => (
              <Imagen
                key={i}
                src={img.src}
                completa
                caption={img.caption}
                busqueda={img.busqueda || img.caption}
                alt={img.caption}
              />
            ))}
          </div>
        </div>
      )}

      {archivos.length > 0 && (
        <div className="rec-bloque">
          <h3 className="rec-titulo"><Icon name="descarga" size={16} /> Material descargable</h3>
          <ul className="rec-fuentes">
            {archivos.map((a, i) => (
              <li key={i}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" download>
                  <Icon name="descarga" size={15} /> {a.titulo}
                  {a.tamano > 0 && (
                    <span className="rec-fuente-tipo">{(a.tamano / 1024 / 1024).toFixed(1)} MB</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fuentes.length > 0 && (
        <div className="rec-bloque">
          <h3 className="rec-titulo"><Icon name="libro" size={16} /> Fuentes y lecturas</h3>
          <ul className="rec-fuentes">
            {fuentes.map((f, i) => (
              <li key={i}>
                <a href={f.url} target="_blank" rel="noopener noreferrer">
                  <Icon name="libro" size={15} /> {f.titulo}
                  {f.tipo && <span className="rec-fuente-tipo">{f.tipo}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
