import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ContenidoProvider } from './context/ContenidoContext.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { vigilarVersionNueva, versionCargadaBien } from './lib/versionNueva.js'
import './index.css'

// Antes de montar: si un trozo de la aplicación no se puede traer porque se
// publicó una versión nueva mientras esta pestaña estaba abierta, se recarga
// (una sola vez) en vez de dejar el error en rojo en pantalla.
vigilarVersionNueva()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ContenidoProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </ContenidoProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)

// Montó: la recarga de emergencia vuelve a estar disponible para la próxima vez.
versionCargadaBien()
