import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-ico">🩺</span>
      <h1>Página no encontrada</h1>
      <p>El contenido que buscas no existe o fue movido.</p>
      <Link to="/" className="btn btn-primario">
        ← Volver al inicio
      </Link>
    </div>
  )
}
