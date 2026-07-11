import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

// Rutas de contenido: carga diferida. Su código y los datos pesados del temario
// (data/index.js) salen del bundle inicial y se descargan solo al visitarlas.
const FasePage = lazy(() => import('./pages/FasePage.jsx'))
const TemaPage = lazy(() => import('./pages/TemaPage.jsx'))
const QuizPage = lazy(() => import('./pages/QuizPage.jsx'))
const ExamenPage = lazy(() => import('./pages/ExamenPage.jsx'))
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage.jsx'))
const ProgresoPage = lazy(() => import('./pages/ProgresoPage.jsx'))
const BuscarPage = lazy(() => import('./pages/BuscarPage.jsx'))
const AtlasPage = lazy(() => import('./pages/AtlasPage.jsx'))
const TemarioPage = lazy(() => import('./pages/TemarioPage.jsx'))

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
            <Route path="/" element={<Home />} />
            <Route path="/fase/:faseId" element={<FasePage />} />
            <Route path="/tema/:temaId" element={<TemaPage />} />
            <Route path="/tema/:temaId/quiz" element={<QuizPage />} />
            <Route path="/examen" element={<ExamenPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/flashcards/:temaId" element={<FlashcardsPage />} />
            <Route path="/atlas" element={<AtlasPage />} />
            <Route path="/temario" element={<TemarioPage />} />
            <Route path="/progreso" element={<ProgresoPage />} />
            <Route path="/buscar" element={<BuscarPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
