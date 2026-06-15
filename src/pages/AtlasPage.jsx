import Icon from '../components/Icon.jsx'
import Imagen from '../components/Imagen.jsx'
import Reveal from '../components/Reveal.jsx'
import { ATLAS_TEMAS } from '../data/imagenes.js'

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
        {ATLAS_TEMAS.map((tema, i) => (
          <Reveal key={tema.clave} delay={(i % 3) * 70} className="atlas-card">
            <Imagen
              src={tema.src}
              ratio="4 / 3"
              caption={tema.titulo}
              busqueda={`${tema.titulo} anatomía`}
              alt={tema.titulo}
            />
            <h3 className="atlas-card-titulo">{tema.titulo}</h3>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
