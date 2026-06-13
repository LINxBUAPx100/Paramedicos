import { diagramas } from '../components/Diagramas.jsx'
import Diagrama from '../components/Diagramas.jsx'

// Galería con todos los mapas anatómicos y fisiológicos.
export default function AtlasPage() {
  const claves = Object.keys(diagramas)
  return (
    <div className="atlas-page">
      <header className="atlas-header">
        <h1>🗺️ Atlas anatómico y fisiológico</h1>
        <p>
          Mapas visuales de los sistemas del cuerpo humano. Úsalos como referencia rápida
          mientras estudias cada tema: célula, corazón, circulación, vía aérea, nefrona,
          sistema nervioso y más.
        </p>
      </header>
      <div className="atlas-grid">
        {claves.map((clave) => (
          <div className="atlas-card" key={clave}>
            <Diagrama clave={clave} />
          </div>
        ))}
      </div>
    </div>
  )
}
