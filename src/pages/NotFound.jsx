import { Link } from 'react-router-dom'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-ico"><IconoEstrella size={56} /></span>
      <h1>Página no encontrada</h1>
      <p>El contenido que buscas no existe o fue movido.</p>
      <Link to="/" className="btn btn-primario">
        ← Volver al inicio
      </Link>
    </div>
  )
}
