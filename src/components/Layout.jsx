import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { fases } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Icon from './Icon.jsx'

const NAV = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/examen', icon: 'examen', label: 'Examen general' },
  { to: '/flashcards', icon: 'flashcards', label: 'Flashcards' },
  { to: '/atlas', icon: 'atlas', label: 'Atlas anatómico' },
  { to: '/temario', icon: 'temario', label: 'Temario oficial' },
  { to: '/progreso', icon: 'progreso', label: 'Mi progreso' },
  { to: '/buscar', icon: 'buscar', label: 'Buscar' },
]

export default function Layout({ children }) {
  const [abierto, setAbierto] = useState(false)
  const { estado, alternarTema } = useProgress()
  const location = useLocation()

  const cerrar = () => setAbierto(false)

  return (
    <div className="app">
      <header className="topbar">
        <button
          className="menu-btn"
          aria-label="Abrir menú"
          onClick={() => setAbierto((v) => !v)}
        >
          <span /><span /><span />
        </button>
        <Link to="/" className="marca" onClick={cerrar}>
          <span className="marca-logo"><Icon name="cruz" size={20} /></span>
          <span className="marca-texto">
            La Guía de <strong>Lin</strong>
          </span>
        </Link>
        <div className="topbar-acciones">
          <Link to="/buscar" className="icon-link" title="Buscar" aria-label="Buscar" onClick={cerrar}>
            <Icon name="buscar" size={19} />
          </Link>
          <button
            className="icon-link"
            onClick={alternarTema}
            title="Cambiar tema"
            aria-label="Cambiar tema claro/oscuro"
          >
            <Icon name={estado.tema === 'oscuro' ? 'sol' : 'luna'} size={19} />
          </button>
        </div>
      </header>

      <div className="cuerpo">
        <aside className={`sidebar ${abierto ? 'abierto' : ''}`}>
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

            <div className="nav-titulo">Temario</div>
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
            Hecho con dedicación para tu estudio.
          </div>
        </aside>

        {abierto && <div className="overlay" onClick={cerrar} />}

        <main className="contenido" key={location.pathname}>
          {children}
        </main>
      </div>
    </div>
  )
}
