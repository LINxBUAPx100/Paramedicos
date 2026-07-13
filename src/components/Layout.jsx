import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { fasesNav as fases } from '../data/navIndice.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Icon from './Icon.jsx'
import LogoPTEM from './marca/LogoPTEM.jsx'
import LogoIcono from './marca/LogoIcono.jsx'
import IconoEstrella from './marca/IconoEstrella.jsx'

// Navegación primaria del header (patrón del diseño PTEM).
// "Temas" (/temario) es el panel de visibilidad: SOLO staff (soloStaff).
const TOPNAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/temario', label: 'Temas', soloStaff: true },
  { to: '/examen', label: 'Examen' },
  { to: '/progreso', label: 'Progreso' },
  { to: '/atlas', label: 'Atlas' },
]

// Navegación completa del drawer (incluye accesos que no caben en el header).
const NAV = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/temario', icon: 'temario', label: 'Temario (staff)', soloStaff: true },
  { to: '/examen', icon: 'examen', label: 'Examen general' },
  { to: '/flashcards', icon: 'flashcards', label: 'Flashcards' },
  { to: '/atlas', icon: 'atlas', label: 'Atlas' },
  { to: '/progreso', icon: 'progreso', label: 'Mi progreso' },
  { to: '/buscar', icon: 'buscar', label: 'Buscar' },
]

export default function Layout({ children }) {
  const [abierto, setAbierto] = useState(false)
  const [consulta, setConsulta] = useState('')
  const { estado, alternarTema } = useProgress()
  const { autenticado, perfil, user, esStaff, esSuperadmin } = useAuth()
  const { faseVisible, temaVisible } = useVisibilidad()
  const location = useLocation()
  const navigate = useNavigate()

  // El personal ve su Panel; el super-admin ve su Dashboard general.
  const extraTop = esSuperadmin
    ? [{ to: '/admin', label: 'Dashboard' }]
    : esStaff ? [{ to: '/panel', label: 'Panel' }] : []
  const extraDrawer = esSuperadmin
    ? [{ to: '/admin', icon: 'capas', label: 'Dashboard general' }]
    : esStaff ? [{ to: '/panel', icon: 'progreso', label: 'Panel de avance' }] : []
  const soloStaff = (item) => !item.soloStaff || esStaff
  const topnav = [...TOPNAV.filter(soloStaff), ...extraTop]
  const navDrawer = [...NAV.filter(soloStaff), ...extraDrawer]

  // Recorrido de estudio filtrado por la visibilidad del grupo del alumno.
  const fasesVisibles = fases
    .filter((f) => faseVisible(f.id))
    .map((f) => ({ ...f, temas: f.temas.filter((t) => temaVisible(t.id)) }))

  const esHome = location.pathname === '/'

  // Al cambiar de ruta, arranca arriba (sin animación). Las páginas con saltos
  // propios (p. ej. TemaPage con ?ref=) se reposicionan después por su cuenta.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const cerrar = () => setAbierto(false)
  const buscar = (e) => {
    e.preventDefault()
    const q = consulta.trim()
    navigate(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar')
    cerrar()
  }

  return (
    <div className="app">
      {/* La app usa HashRouter: un href="#…" cambiaría la RUTA, así que el
          salto se hace enfocando el <main> directamente. */}
      <a
        href="#contenido-principal"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          const main = document.getElementById('contenido-principal')
          if (main) {
            main.focus()
            main.scrollIntoView()
          }
        }}
      >
        Saltar al contenido principal
      </a>
      <AnuncioBanner />
      <header className="topbar">
        <button
          className="menu-btn"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <Link to="/" className="marca" onClick={cerrar} aria-label="PTEM — inicio">
          <LogoPTEM height={28} className="marca-svg" />
        </Link>

        <nav className="topnav">
          {topnav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="topnav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form className="topbar-buscar" onSubmit={buscar} role="search">
          <Icon name="buscar" size={17} />
          <input
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Buscar…"
            aria-label="Buscar en el temario"
          />
        </form>

        <NavLink
          to="/cuenta"
          className="icon-link cuenta-link"
          title={autenticado ? 'Mi cuenta' : 'Entrar'}
          aria-label="Mi cuenta"
        >
          {autenticado ? (
            <span className="cuenta-inicial">
              {(perfil?.nombre || user?.email || '?').charAt(0).toUpperCase()}
            </span>
          ) : (
            <Icon name="usuario" size={19} />
          )}
        </NavLink>

        <button
          className="icon-link tema-btn"
          onClick={alternarTema}
          title="Cambiar tema"
          aria-label="Cambiar tema claro/oscuro"
        >
          <Icon name={estado.tema === 'oscuro' ? 'sol' : 'luna'} size={19} />
        </button>
      </header>

      <div className="cuerpo">
        <aside className={`sidebar ${abierto ? 'abierto' : ''}`} aria-hidden={!abierto}>
          <nav className="nav">
            {navDrawer.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="nav-item"
                onClick={cerrar}
              >
                <span className="nav-ico"><Icon name={item.icon} size={19} /></span>
                {item.label}
              </NavLink>
            ))}

            <div className="nav-titulo">Recorrido de estudio</div>
            {fasesVisibles.map((fase) => (
              <div key={fase.id} className="nav-grupo">
                <NavLink
                  to={`/fase/${fase.id}`}
                  className="nav-fase"
                  style={{ '--fase-color': fase.color }}
                  onClick={cerrar}
                >
                  <span className="nav-fase-num">{String(fase.numero).padStart(2, '0')}</span>
                  <span>
                    <small>Fase {fase.numero}</small>
                    <br />
                    {fase.titulo}
                  </span>
                </NavLink>
                <div className="nav-subtemas">
                  {fase.temas.map((tema) => (
                    <NavLink
                      key={tema.id}
                      to={`/tema/${tema.id}`}
                      className="nav-subtema"
                      onClick={cerrar}
                    >
                      <span className="nav-num">{tema.numero}</span>
                      {tema.titulo}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="sidebar-pie">
            <IconoEstrella size={14} /> PTEM · Hecho para que comprendas el porqué.
          </div>
        </aside>

        {abierto && <div className="overlay" onClick={cerrar} />}

        <main
          id="contenido-principal"
          tabIndex={-1}
          className={`contenido ${esHome ? 'contenido--full' : ''}`}
          key={location.pathname}
        >
          {children}
        </main>
      </div>

      <footer className="app-footer">
        <div className="footer-in">
          <div className="footer-col footer-marca">
            <span className="marca-logo"><LogoIcono size={26} /></span>
            <div>
              <strong>PTEM</strong>
              <p>Plataforma de estudio en Atención Prehospitalaria y Cuidados Críticos.</p>
            </div>
          </div>
          <div className="footer-col">
            <h4>Estudio</h4>
            {/* /temario es el panel de visibilidad, exclusivo del staff. */}
            {esStaff && <Link to="/temario">Temario (staff)</Link>}
            <Link to="/examen">Examen</Link>
            <Link to="/flashcards">Flashcards</Link>
            <Link to="/atlas">Atlas</Link>
          </div>
          <div className="footer-col">
            <h4>Avanza</h4>
            <Link to="/progreso">Mi progreso</Link>
            <Link to="/buscar">Buscar</Link>
            {/* Sin sesión, "Empezar" lleva a crear la cuenta (no a un candado). */}
            <Link to={autenticado ? '/fase/fase-1' : '/cuenta'}>Empezar</Link>
          </div>
          <div className="footer-col">
            <h4>Materiales</h4>
            {esStaff && <Link to="/temario">Guías descargables</Link>}
            <Link to="/atlas">Atlas de imágenes</Link>
            <Link to="/cuenta">Mi cuenta</Link>
          </div>
        </div>
        <div className="footer-pie">
          <span><strong>PTEM</strong></span>
          <span>Desarrollado por Riders.Media · 2026 · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  )
}

// Banner del anuncio global (lo publica el super-admin en /admin). Se muestra
// a todos; cada anuncio se puede descartar y no reaparece hasta que cambie.
function AnuncioBanner() {
  const [anuncio, setAnuncio] = useState(null)
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    let vivo = true
    ;(async () => {
      const { obtenerAnuncio } = await import('../lib/firebase/plataforma.js')
      const a = await obtenerAnuncio()
      if (!vivo || !a || !a.activo || !a.mensaje) return
      const clave = `ptem-anuncio-${a.actualizado?.seconds || 0}`
      let visto = false
      try { visto = localStorage.getItem(clave) === '1' } catch { /* nada */ }
      if (!visto) setAnuncio({ ...a, clave })
    })()
    return () => { vivo = false }
  }, [])

  if (!anuncio || cerrado) return null

  const descartar = () => {
    try { localStorage.setItem(anuncio.clave, '1') } catch { /* nada */ }
    setCerrado(true)
  }

  return (
    <div className={`anuncio-banner ${anuncio.tipo === 'alerta' ? 'alerta' : 'info'}`} role="status">
      <Icon name={anuncio.tipo === 'alerta' ? 'alerta' : 'chispa'} size={17} />
      <span className="anuncio-banner-txt">{anuncio.mensaje}</span>
      <button className="anuncio-banner-cerrar" onClick={descartar} aria-label="Cerrar anuncio">×</button>
    </div>
  )
}
