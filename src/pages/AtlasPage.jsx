import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Imagen from '../components/Imagen.jsx'
import Reveal from '../components/Reveal.jsx'
import { ATLAS_TEMAS } from '../data/imagenes.js'
import { temaPorClaveImagen } from '../data/index.js'

// Galería de imágenes reales (anatomía / fisiología). Cada tarjeta carga su
// imagen desde Google Drive (pega el enlace en src/data/imagenes.js → ATLAS_TEMAS).
export default function AtlasPage() {
  return (
    <div className="atlas-page">
      <header className="atlas-header">
        <h1 className="ph-h2"><Icon name="estrella" size={28} /> Atlas anatómico y fisiológico</h1>
        <p>
          Mapas visuales de los sistemas del cuerpo humano. Úsalos como referencia rápida mientras
          estudias: célula, corazón, circulación, vía aérea, nefrona, sistema nervioso y más.
        </p>
      </header>
      <div className="atlas-grid">
        {ATLAS_TEMAS.map((tema, i) => {
          const temaId = temaPorClaveImagen[tema.clave]
          return (
            <Reveal
              key={tema.clave}
              delay={(i % 3) * 70}
              className={`atlas-card${temaId ? ' atlas-card--link' : ''}`}
            >
              <Imagen
                src={tema.src}
                ratio="4 / 3"
                caption={tema.titulo}
                busqueda={`${tema.titulo} anatomía`}
                alt={tema.titulo}
              />
              <h3 className="atlas-card-titulo">
                {tema.titulo}
                {temaId && <Icon name="chevronDer" size={16} />}
              </h3>
              {/* enlace "estirado" que cubre la tarjeta (sin anidar <a>) */}
              {temaId && (
                <Link
                  className="atlas-card-stretch"
                  to={`/tema/${temaId}?ref=${tema.clave}`}
                  aria-label={`Ver "${tema.titulo}" en su tema`}
                />
              )}
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
