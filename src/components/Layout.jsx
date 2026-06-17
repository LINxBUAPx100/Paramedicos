import { useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { fases } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Icon from './Icon.jsx'
import LogoPTUM from './marca/LogoPTUM.jsx'
import IconoEstrella from './marca/IconoEstrella.jsx'

// Navegación primaria del header (patrón del diseño PTUM).
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
  const location = useLocation()
  const navigate = useNavigate()

  const esHome = location.pathname === '/'
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

        <Link to="/" className="marca" onClick={cerrar} aria-label="PTUM — inicio">
          <LogoPTUM height={28} className="marca-svg" />
        </Link>

        <nav className="topnav">
          {TOPNAV.map((item) => (
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
            placeholder="Buscador"
            aria-label="Buscar en el temario"
          />
        </form>

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
            {NAV.map((item) => (
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
            <IconoEstrella size={14} /> PTUM · Hecho para que comprendas el porqué.
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
            <span className="marca-logo"><LogoPTUM height={26} className="footer-logo-ptum" /></span>
            <div>
              <strong>PTUM</strong>
              <p>Plataforma de estudio en Atención Prehospitalaria y Cuidados Críticos.</p>
            </div>
          </div>
          <div className="footer-col">
            <h4>Estudio</h4>
            <Link to="/temario">Temario</Link>
            <Link to="/examen">Examen</Link>
            <Link to="/flashcards">FlashCards</Link>
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
            <span>Guías descargables</span>
            <span>Recursos clínicos</span>
          </div>
        </div>
        <div className="footer-pie">
          <span><strong>PTUM</strong>®</span>
          <span>Desarrollado por Riders.Media · 2026 · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  )
}
