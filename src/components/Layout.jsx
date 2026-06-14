import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { fases } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function Layout({ children }) {
  const [abierto, setAbierto] = useState(false)
  const { estado, alternarTema } = useProgress()
  const location = useLocation()

  // Cierra el menú móvil al navegar.
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
          <span className="marca-logo">✚</span>
          <span className="marca-texto">
            La Guía de <strong>Lin</strong>
          </span>
        </Link>
        <div className="topbar-acciones">
          <Link to="/buscar" className="icon-link" title="Buscar" onClick={cerrar}>
            🔍
          </Link>
          <button
            className="icon-link"
            onClick={alternarTema}
            title="Cambiar tema"
            aria-label="Cambiar tema claro/oscuro"
          >
            {estado.tema === 'oscuro' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="cuerpo">
        <aside className={`sidebar ${abierto ? 'abierto' : ''}`}>
          <nav className="nav">
            <NavLink to="/" end className="nav-item" onClick={cerrar}>
              <span className="nav-ico">🏠</span> Inicio
            </NavLink>
            <NavLink to="/examen" className="nav-item" onClick={cerrar}>
              <span className="nav-ico">📝</span> Examen general
            </NavLink>
            <NavLink to="/flashcards" className="nav-item" onClick={cerrar}>
              <span className="nav-ico">🎴</span> Flashcards
            </NavLink>
            <NavLink to="/atlas" className="nav-item" onClick={cerrar}>
              <span className="nav-ico">🗺️</span> Atlas anatómico
            </NavLink>
            <NavLink to="/temario" className="nav-item" onClick={cerrar}>
              <span className="nav-ico">📋</span> Temario oficial
            </NavLink>
            <NavLink to="/progreso" className="nav-item" onClick={cerrar}>
              <span className="nav-ico">📊</span> Mi progreso
            </NavLink>
            <NavLink to="/buscar" className="nav-item" onClick={cerrar}>
              <span className="nav-ico">🔍</span> Buscar
            </NavLink>

            <div className="nav-titulo">Temario</div>
            {fases.map((fase) => (
              <div key={fase.id} className="nav-grupo">
                <NavLink
                  to={`/fase/${fase.id}`}
                  className="nav-fase"
                  style={{ '--fase-color': fase.color }}
                  onClick={cerrar}
                >
                  <span className="nav-fase-ico">{fase.icono}</span>
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
            Hecho con dedicación para tu estudio. 🩺
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
