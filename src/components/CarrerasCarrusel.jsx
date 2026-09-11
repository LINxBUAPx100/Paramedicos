import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { estiloDeCarrera, rutaDeCarrera } from '../lib/carrerasModelo.js'

// Conserva el punto de importación; el catálogo ahora permite comparar todas
// las carreras sin ocultar enlaces detrás de una tarjeta activa.
export default function CarrerasCarrusel({ carreras }) {
  return (
    <div className="ui-carreras" role="list" aria-label="Carreras que imparte la academia">
      {carreras.map((carrera, i) => {
        const { color, etiquetaTipo } = estiloDeCarrera(carrera)
        const abierta = carrera.estado === 'abierta'
        return (
          <article key={carrera.slug} role="listitem" className={`ui-carrera ${abierta ? 'ui-carrera--abierta' : ''}`} style={{ '--carrera-color': color }}>
            <div className="ui-carrera-meta"><span className="ui-antetitulo">{etiquetaTipo}</span><span className="ui-carrera-num">{String(i + 1).padStart(2, '0')}</span></div>
            <h3>{carrera.nombre}</h3>
            <p>{carrera.resumen}</p>
            <span className="ui-etiqueta">{abierta ? 'Disponible ahora' : 'En preparación'}</span>
            <Link to={rutaDeCarrera(carrera)} className="ui-carrera-enlace" aria-label={abierta ? `Ver la carrera de ${carrera.nombre}` : `Conocer más sobre ${carrera.nombre}`}>
              {abierta ? 'Explorar el programa' : 'Conocer la carrera'} <Icon name="chevronDer" size={18} />
            </Link>
          </article>
        )
      })}
    </div>
  )
}
