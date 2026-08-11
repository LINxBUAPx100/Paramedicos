import { Link } from 'react-router-dom'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-ico"><IconoEstrella size={56} /></span>
      <h1>Página no encontrada</h1>
      <p>El contenido que buscas no existe o fue movido.</p>
      {/* Mismo botón que ErrorBoundary y RutaProtegida: las tres son la misma
          clase de pantalla (callejón sin salida con una vía de escape) y hasta
          ahora cada una usaba un lenguaje visual distinto. */}
      <Link to="/" className="btn btn--pildora btn--carbon">
        ← Volver al inicio
      </Link>
    </div>
  )
}
