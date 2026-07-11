import { Component } from 'react'

// Captura errores de render y fallos al cargar chunks diferidos (React.lazy),
// evitando la pantalla en blanco. Muestra un fallback con opción de reintento.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidUpdate(prevProps) {
    // Al cambiar de ruta, limpia el error para reintentar la nueva página.
    if (this.state.error && prevProps.routeKey !== this.props.routeKey) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      const esChunk = /chunk|dynamically imported|Loading/i.test(this.state.error.message || '')
      return (
        <div className="ruta-error" role="alert">
          <h2>Algo salió mal</h2>
          <p>
            {esChunk
              ? 'No se pudo cargar esta sección (revisa tu conexión).'
              : 'Ocurrió un error al mostrar esta página.'}
          </p>
          <button className="btn-pildora btn-pildora--solido" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
