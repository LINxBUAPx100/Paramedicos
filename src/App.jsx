import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

// Rutas de contenido: carga diferida. Su código y los datos pesados del temario
// (data/index.js) salen del bundle inicial y se descargan solo al visitarlas.
const FasePage = lazy(() => import('./pages/FasePage.jsx'))
const TemaPage = lazy(() => import('./pages/TemaPage.jsx'))
const QuizPage = lazy(() => import('./pages/QuizPage.jsx'))
const ExamenPage = lazy(() => import('./pages/ExamenPage.jsx'))
const ExamenFasePage = lazy(() => import('./pages/ExamenFasePage.jsx'))
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage.jsx'))
const ProgresoPage = lazy(() => import('./pages/ProgresoPage.jsx'))
const BuscarPage = lazy(() => import('./pages/BuscarPage.jsx'))
const AtlasPage = lazy(() => import('./pages/AtlasPage.jsx'))
const TemarioPage = lazy(() => import('./pages/TemarioPage.jsx'))
const Cuenta = lazy(() => import('./pages/Cuenta.jsx'))
const PanelPage = lazy(() => import('./pages/PanelPage.jsx'))
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'))
const AcademiaAdminPage = lazy(() => import('./pages/AcademiaAdminPage.jsx'))

function Cargando() {
  return (
    <div className="ruta-cargando" role="status" aria-live="polite">
      <span className="ruta-spinner" aria-hidden="true" />
      <span>Cargando…</span>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <ErrorBoundary routeKey={location.pathname}>
        <Suspense fallback={<Cargando />}>
          <Routes>
            {/* Públicas: landing + cuenta (login/registro/unirse) */}
            <Route path="/" element={<Home />} />
            <Route path="/cuenta" element={<Cuenta />} />

            {/* Contenido: requiere sesión + academia activa (o superadmin) */}
            <Route path="/fase/:faseId" element={<RutaProtegida><FasePage /></RutaProtegida>} />
            <Route path="/fase/:faseId/examen" element={<RutaProtegida><ExamenFasePage /></RutaProtegida>} />
            <Route path="/tema/:temaId" element={<RutaProtegida><TemaPage /></RutaProtegida>} />
            <Route path="/tema/:temaId/quiz" element={<RutaProtegida><QuizPage /></RutaProtegida>} />
            <Route path="/examen" element={<RutaProtegida><ExamenPage /></RutaProtegida>} />
            <Route path="/flashcards" element={<RutaProtegida><FlashcardsPage /></RutaProtegida>} />
            <Route path="/flashcards/:temaId" element={<RutaProtegida><FlashcardsPage /></RutaProtegida>} />
            <Route path="/atlas" element={<RutaProtegida><AtlasPage /></RutaProtegida>} />
            <Route path="/temario" element={<RutaProtegida><TemarioPage /></RutaProtegida>} />
            <Route path="/progreso" element={<RutaProtegida><ProgresoPage /></RutaProtegida>} />
            <Route path="/buscar" element={<RutaProtegida><BuscarPage /></RutaProtegida>} />

            {/* Panel de avance: solo staff (la página valida el rol internamente) */}
            <Route path="/panel" element={<RutaProtegida><PanelPage /></RutaProtegida>} />

            {/* Dashboard del super-admin: todas las academias + roles */}
            <Route path="/admin" element={<RutaProtegida><AdminPage /></RutaProtegida>} />
            <Route path="/admin/academia/:academiaId" element={<RutaProtegida><AcademiaAdminPage /></RutaProtegida>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
