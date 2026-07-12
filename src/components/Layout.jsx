import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { fasesNav as fases } from '../data/navIndice.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from './Icon.jsx'
import LogoPTEM from './marca/LogoPTEM.jsx'
import LogoIcono from './marca/LogoIcono.jsx'
import IconoEstrella from './marca/IconoEstrella.jsx'

// Navegación primaria del header (patrón del diseño PTEM).
const TOPNAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/temario', label: 'Temas' },
  { to: '/examen', label: 'Examen' },
  { to: '/progreso', label: 'Progreso' },
  { to: '/atlas', label: 'Atlas' },
]

// Navegación completa del drawer (incluye accesos que no caben en el header).
const NAV = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/temario', icon: 'temario', label: 'Temario oficial' },
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
  const { autenticado, perfil, user, esStaff } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // El personal (instructor/admin/superadmin) ve además el Panel de avance.
  const topnav = esStaff ? [...TOPNAV, { to: '/panel', label: 'Panel' }] : TOPNAV
  const navDrawer = esStaff ? [...NAV, { to: '/panel', icon: 'progreso', label: 'Panel de avance' }] : NAV

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
            {fases.map((fase) => (
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

        <main className={`contenido ${esHome ? 'contenido--full' : ''}`} key={location.pathname}>
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
            <Link to="/temario">Temario</Link>
            <Link to="/examen">Examen</Link>
            <Link to="/flashcards">Flashcards</Link>
            <Link to="/atlas">Atlas</Link>
          </div>
          <div className="footer-col">
            <h4>Avanza</h4>
            <Link to="/progreso">Mi progreso</Link>
            <Link to="/buscar">Buscar</Link>
            <Link to="/fase/fase-1">Empezar</Link>
          </div>
          <div className="footer-col">
            <h4>Materiales</h4>
            <Link to="/temario">Guías descargables</Link>
            <Link to="/atlas">Atlas de imágenes</Link>
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
