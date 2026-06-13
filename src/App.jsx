import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import FasePage from './pages/FasePage.jsx'
import TemaPage from './pages/TemaPage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import ExamenPage from './pages/ExamenPage.jsx'
import FlashcardsPage from './pages/FlashcardsPage.jsx'
import ProgresoPage from './pages/ProgresoPage.jsx'
import BuscarPage from './pages/BuscarPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fase/:faseId" element={<FasePage />} />
        <Route path="/tema/:temaId" element={<TemaPage />} />
        <Route path="/tema/:temaId/quiz" element={<QuizPage />} />
        <Route path="/examen" element={<ExamenPage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/flashcards/:temaId" element={<FlashcardsPage />} />
        <Route path="/progreso" element={<ProgresoPage />} />
        <Route path="/buscar" element={<BuscarPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
