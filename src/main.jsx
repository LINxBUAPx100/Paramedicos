import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ContenidoProvider } from './context/ContenidoContext.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import './index.css'

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
