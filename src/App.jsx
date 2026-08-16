import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import Bienvenida from './pages/Bienvenida.jsx'
import NotFound from './pages/NotFound.jsx'
import { useAuth } from './context/AuthContext.jsx'

// Rutas de contenido: carga diferida. Su código y los datos pesados del temario
// (data/index.js) salen del bundle inicial y se descargan solo al visitarlas.
const ModuloPage = lazy(() => import('./pages/ModuloPage.jsx'))
const TemaPage = lazy(() => import('./pages/TemaPage.jsx'))
const QuizPage = lazy(() => import('./pages/QuizPage.jsx'))
const ExamenPage = lazy(() => import('./pages/ExamenPage.jsx'))
const ExamenModuloPage = lazy(() => import('./pages/ExamenModuloPage.jsx'))
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage.jsx'))
const ProgresoPage = lazy(() => import('./pages/ProgresoPage.jsx'))
const BuscarPage = lazy(() => import('./pages/BuscarPage.jsx'))
const AtlasPage = lazy(() => import('./pages/AtlasPage.jsx'))
const TemarioPage = lazy(() => import('./pages/TemarioPage.jsx'))
const Cuenta = lazy(() => import('./pages/Cuenta.jsx'))
const PanelShell = lazy(() => import('./components/panel/PanelShell.jsx'))
const PanelResumen = lazy(() => import('./pages/panel/Resumen.jsx'))
const PanelMiembros = lazy(() => import('./pages/panel/Miembros.jsx'))
const PanelGrupos = lazy(() => import('./pages/panel/Grupos.jsx'))
const PanelInvitaciones = lazy(() => import('./pages/panel/Invitaciones.jsx'))
const PanelAccesos = lazy(() => import('./pages/panel/Accesos.jsx'))
const PanelCalificaciones = lazy(() => import('./pages/panel/Calificaciones.jsx'))
const PanelContenido = lazy(() => import('./pages/panel/Contenido.jsx'))
const PanelMiAcademia = lazy(() => import('./pages/panel/MiAcademia.jsx'))
const AdminShell = lazy(() => import('./components/admin/AdminShell.jsx'))
const AdminPage = lazy(() => import('./pages/AdminPage.jsx'))
const AdminResumen = lazy(() => import('./pages/admin/Resumen.jsx'))
const AdminFacturacion = lazy(() => import('./pages/admin/Facturacion.jsx'))
const AdminIncidencias = lazy(() => import('./pages/admin/Incidencias.jsx'))
const AdminLogs = lazy(() => import('./pages/admin/Logs.jsx'))
const AcademiaAdminPage = lazy(() => import('./pages/AcademiaAdminPage.jsx'))
const EditorPage = lazy(() => import('./pages/EditorPage.jsx'))
const ReplicacionPage = lazy(() => import('./pages/ReplicacionPage.jsx'))

function Cargando() {
  return (
    <div className="ruta-cargando" role="status" aria-live="polite">
      <span className="ruta-spinner" aria-hidden="true" />
      <span>Cargando…</span>
    </div>
  )
}

// La raíz sirve a TRES personas distintas, y hasta ahora les daba la misma
// pantalla a las tres:
//   sin sesión           → Landing    (qué es PTEM, muestra, cómo entrar)
//   con sesión sin academia → Bienvenida (código o directorio)
//   con academia         → Home       (el recorrido de estudio)
//
// Mientras se resuelve la sesión NO se pinta ninguna: enseñar la portada
// comercial a un alumno que ya tiene cuenta, y quitársela medio segundo
// después, es peor que un instante de esqueleto. Los rastreadores ejecutan JS
// y esperan a que la app se asiente, así que la landing sigue siendo indexable.
//
// El super-admin y el staff sin academia van a Home: su sitio es el panel, no
// una pantalla que les pide un código de alumno.
function Inicio() {
  const { autenticado, cargando, accesoCargando, academiaId, esStaff, enPrueba } = useAuth()
  if (cargando || accesoCargando) return <Cargando />
  if (!autenticado) return <Landing />
  if (!academiaId && !esStaff && !enPrueba) return <Bienvenida />
  return <Home />
}

// Redirección de las URLs ANTERIORES al renombrado Fase→Módulo.
// `/fase/:id` y `/fase/:id/examen` fueron durante meses la identidad pública
// del contenido: hay enlaces compartidos por alumnos y guardados en marcadores.
// `replace` evita dejar la URL vieja en el historial del navegador (con
// HashRouter, volver atrás a una ruta muerta es especialmente confuso).
function RedirigirModulo({ examen = false }) {
  const { moduloId } = useParams()
  return <Navigate to={`/modulo/${moduloId}${examen ? '/examen' : ''}`} replace />
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <ErrorBoundary routeKey={location.pathname}>
        <Suspense fallback={<Cargando />}>
          <Routes>
            {/* Públicas: inicio (landing o home según sesión) + cuenta */}
            <Route path="/" element={<Inicio />} />
            <Route path="/cuenta" element={<Cuenta />} />

            {/* Contenido: requiere sesión + academia activa (o superadmin) */}
            <Route path="/modulo/:moduloId" element={<RutaProtegida><ModuloPage /></RutaProtegida>} />
            <Route path="/modulo/:moduloId/examen" element={<RutaProtegida><ExamenModuloPage /></RutaProtegida>} />

            {/* Compatibilidad: enlaces antiguos /fase/* → /modulo/* */}
            <Route path="/fase/:moduloId" element={<RedirigirModulo />} />
            <Route path="/fase/:moduloId/examen" element={<RedirigirModulo examen />} />
            <Route path="/tema/:temaId" element={<RutaProtegida><TemaPage /></RutaProtegida>} />
            <Route path="/tema/:temaId/quiz" element={<RutaProtegida><QuizPage /></RutaProtegida>} />
            <Route path="/examen" element={<RutaProtegida><ExamenPage /></RutaProtegida>} />
            <Route path="/flashcards" element={<RutaProtegida><FlashcardsPage /></RutaProtegida>} />
            <Route path="/flashcards/:temaId" element={<RutaProtegida><FlashcardsPage /></RutaProtegida>} />
            <Route path="/atlas" element={<RutaProtegida><AtlasPage /></RutaProtegida>} />
            <Route path="/temario" element={<RutaProtegida><TemarioPage /></RutaProtegida>} />
            <Route path="/progreso" element={<RutaProtegida><ProgresoPage /></RutaProtegida>} />
            <Route path="/buscar" element={<RutaProtegida><BuscarPage /></RutaProtegida>} />

            {/* Consola del director (Bloque O): mismo patrón que /admin. Antes
                era UNA página que apilaba avance, solicitudes, grupos, miembros,
                permisos y códigos en una sola columna, y «qué ve cada grupo»
                estaba escondido en /temario. El armazón valida el rol, carga los
                datos de la academia una vez y los reparte por contexto. */}
            <Route path="/panel" element={<RutaProtegida><PanelShell /></RutaProtegida>}>
              <Route index element={<PanelResumen />} />
              <Route path="miembros" element={<PanelMiembros />} />
              <Route path="grupos" element={<PanelGrupos />} />
              <Route path="invitaciones" element={<PanelInvitaciones />} />
              <Route path="accesos" element={<PanelAccesos />} />
              <Route path="calificaciones" element={<PanelCalificaciones />} />
              <Route path="contenido" element={<PanelContenido />} />
              <Route path="academia" element={<PanelMiAcademia />} />
            </Route>

            {/* Editor estructural de contenido: director PRO / profesor
                autorizado (su academia); superadmin en cualquiera o en modo
                plantilla. La página valida permisos, la capa de datos también
                y las reglas de Firestore son la barrera final. */}
            <Route path="/editor" element={<RutaProtegida><EditorPage /></RutaProtegida>} />
            <Route path="/editor/plantilla/:plantillaId" element={<RutaProtegida><EditorPage /></RutaProtegida>} />
            <Route path="/editor/:academiaId" element={<RutaProtegida><EditorPage /></RutaProtegida>} />

            {/* Consola del super-admin (Bloque N): un armazón con navegación
                propia y una página por entidad. Antes era UNA página de 736
                líneas con todo apilado, más /admin/replicacion suelta por su
                cuenta. El armazón carga academias/usuarios/intentos una sola
                vez y los reparte por contexto. */}
            <Route path="/admin" element={<RutaProtegida><AdminShell /></RutaProtegida>}>
              <Route index element={<AdminResumen />} />
              <Route path="academias" element={<AdminPage seccion="academias" />} />
              <Route path="usuarios" element={<AdminPage seccion="usuarios" />} />
              <Route path="contenido" element={<ReplicacionPage />} />
              <Route path="facturacion" element={<AdminFacturacion />} />
              <Route path="incidencias" element={<AdminIncidencias />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="academia/:academiaId" element={<AcademiaAdminPage />} />
              {/* La ruta vieja seguía enlazada desde fuera y en marcadores. */}
              <Route path="replicacion" element={<Navigate to="/admin/contenido" replace />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
