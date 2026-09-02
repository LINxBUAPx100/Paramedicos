import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceContenido } from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { motivoSinPrograma } from '../lib/programasModelo.js'
import { hayMenuLateral } from '../lib/menuLateral.js'
import { metaRobots } from '../lib/indexable.js'
import { debeSubirAlInicio } from '../lib/saltoEnPagina.js'
import Icon from './Icon.jsx'
import TutorialDeRuta from './TutorialDeRuta.jsx'
import LogoPTEM from './marca/LogoPTEM.jsx'
import LogoIcono from './marca/LogoIcono.jsx'
import IconoEstrella from './marca/IconoEstrella.jsx'

// Navegación primaria del header (patrón del diseño PTEM).
// "Temas" (/temario) es el panel de visibilidad: SOLO staff (soloStaff).
//
// `soloConAcceso` marca lo que NO se le enseña a quien no ha entrado. No es
// cosmética: un enlace a /examen sin sesión termina en «No has iniciado
// sesión», y ofrecerlo es prometer algo que no se puede dar. El recorrido de
// estudio del drawer es peor todavía —enseñaba los 287 títulos del temario a
// cualquier visitante, y también a un alumno con cuenta pero sin grupo—, y eso
// se corta más abajo con `veContenido`.
const TOPNAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/temario', label: 'Temas', soloStaff: true },
  { to: '/examen', label: 'Examen', soloConAcceso: true },
  { to: '/progreso', label: 'Progreso', soloConAcceso: true },
  { to: '/logros', label: 'Logros', soloConAcceso: true },
]

// Navegación completa del drawer (incluye accesos que no caben en el header).
const NAV = [
  { to: '/', icon: 'home', label: 'Inicio', end: true },
  { to: '/temario', icon: 'temario', label: 'Temario (staff)', soloStaff: true },
  { to: '/examen', icon: 'examen', label: 'Examen general', soloConAcceso: true },
  { to: '/flashcards', icon: 'flashcards', label: 'Flashcards', soloConAcceso: true },
  { to: '/logros', icon: 'atlas', label: 'Logros', soloConAcceso: true },
  { to: '/progreso', icon: 'progreso', label: 'Mi progreso', soloConAcceso: true },
  { to: '/buscar', icon: 'buscar', label: 'Buscar', soloConAcceso: true },
]

export default function Layout({ children }) {
  const [abierto, setAbierto] = useState(false)
  const [consulta, setConsulta] = useState('')
  const menuRef = useRef(null)
  const drawerRef = useRef(null)
  const { estado, alternarTema } = useProgress()
  const {
    autenticado, perfil, user, esStaff, esSuperadmin, puedeAcceder, rol, grupo,
  } = useAuth()
  const { modulos } = useIndiceContenido() // índice de LA academia (bundle si legacy)
  const { moduloVisible, temaVisible } = useVisibilidad()
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
  // DOS PUERTAS, las mismas que RutaProtegida, y hacen falta las dos. El menú
  // tiene que obedecer lo mismo que la página: enseñar el enlace y negar el
  // destino no protege nada, y además revela qué hay dentro.
  //
  // `puedeAcceder` responde «¿tiene sesión y su academia está al corriente?».
  // `motivoSinPrograma` responde la otra mitad: «¿tiene un plan de estudios
  // asignado?». Un alumno con cuenta y academia pero SIN GRUPO pasa la primera
  // y falla la segunda — y con solo la primera puesta, el menú le enseñaba los
  // 287 títulos del temario mientras la página le decía «necesitas un código de
  // grupo». Encontrado auditando con un usuario de prueba en ese estado.
  const bloqueoDePrograma = motivoSinPrograma({ rol, esSuperadmin, grupo })
  const veContenido = puedeAcceder && !bloqueoDePrograma
  const conAcceso = (item) => !item.soloConAcceso || veContenido
  const visible = (item) => soloStaff(item) && conAcceso(item)
  const topnav = [...TOPNAV.filter(visible), ...extraTop]
  const navDrawer = [...NAV.filter(visible), ...extraDrawer]

  // Recorrido de estudio filtrado por la visibilidad del grupo del alumno.
  //
  // SIN ACCESO NO HAY RECORRIDO. El índice del temario viaja en el bundle, así
  // que este componente podía pintar los 287 títulos del plan de R.E.S.C.A.T.E.
  // a cualquiera que abriera la web sin cuenta —los títulos SON contenido de la
  // academia, no un menú—. La lista se vacía antes de recorrerla, no se oculta
  // por CSS: lo que no se pinta no se lee en el inspector.
  const modulosVisibles = !veContenido ? [] : modulos
    .filter((f) => moduloVisible(f.id))
    .map((f) => ({ ...f, temas: f.temas.filter((t) => temaVisible(t.id)) }))

  // ¿Vale la pena abrir el cajón? La regla vive en lib/menuLateral.js, con sus
  // pruebas: el caso que hay que blindar —con temario, el botón SIGUE estando—
  // no se puede comprobar abriendo la página sin credenciales.
  const hayMenu = hayMenuLateral({ navDrawer, topnav, modulos: modulosVisibles.length })
  // Estado EFECTIVO. Si el cajón se queda sin contenido con él abierto —cerrar
  // sesión es el caso real—, `abierto` seguiría en true y quedaría el velo
  // oscuro encima de la página sin nada que velar. Derivarlo aquí lo cierra en
  // el mismo render, sin un efecto que persiga al estado.
  const menuAbierto = hayMenu && abierto

  const esHome = location.pathname === '/'
  // Las consolas del super-admin y del director aprovechan todo el ancho: son
  // tablas y rejillas con su propia navegación lateral, no texto para leer.
  const esConsola = location.pathname.startsWith('/admin') || location.pathname.startsWith('/panel')

  // NO INDEXAR lo que no es público. Con una sola página, `robots.txt` apenas
  // decide nada: el rastreador descarga un documento y lo que lee después es lo
  // que el JavaScript haya dejado puesto. Esta etiqueta es lo que de verdad
  // respeta Google, y se recalcula en cada navegación.
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', metaRobots(location.pathname))
  }, [location.pathname])

  // Al cambiar de ruta, arranca arriba (sin animación) — SALVO cuando la ruta
  // trae un destino dentro de la propia página (`?t=` una palabra del glosario,
  // `?ref=` un diagrama). Ahí no se toca: la pantalla se coloca sola.
  //
  // Antes se subía siempre. Como los efectos del hijo corren antes que los del
  // padre, el glosario se desplazaba hasta la palabra y este efecto la devolvía
  // arriba: pulsar un tecnicismo te dejaba en el encabezado de Logros, no en tu
  // palabra. Ver `lib/saltoEnPagina.js`.
  //
  // Se mira el PATHNAME, no la URL entera: una pantalla que cambia sus propios
  // parámetros —el glosario al quitar el resaltado, el buscador al reescribir la
  // consulta— no está navegando a ninguna parte, y subirla al inicio le
  // arrancaría al lector el sitio donde estaba leyendo.
  const rutaAnterior = useRef(location.pathname)
  useEffect(() => {
    const cambioDePantalla = rutaAnterior.current !== location.pathname
    rutaAnterior.current = location.pathname
    if (!cambioDePantalla) return
    if (!debeSubirAlInicio(location)) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.search])

  // Cerrar el drawer devuelve SIEMPRE el foco al botón que lo abrió: sin esto,
  // quien navega con teclado se queda con el foco en un elemento que acaba de
  // salir de pantalla y tiene que tabular desde el principio del documento.
  const cerrar = ({ devolverFoco = false } = {}) => {
    setAbierto(false)
    if (devolverFoco) menuRef.current?.focus()
  }

  // Escape cierra, como cualquier capa superpuesta. No existía.
  useEffect(() => {
    if (!abierto) return undefined
    const alPulsar = (e) => {
      if (e.key === 'Escape') cerrar({ devolverFoco: true })
    }
    document.addEventListener('keydown', alPulsar)
    return () => document.removeEventListener('keydown', alPulsar)
  }, [abierto])

  // Al abrir, el foco entra en el drawer para que el teclado y el lector de
  // pantalla continúen ahí y no en el fondo, que ahora es inerte.
  useEffect(() => {
    if (!abierto) return
    drawerRef.current?.querySelector('a, button')?.focus()
  }, [abierto])
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
        {hayMenu && (
          <button
            ref={menuRef}
            className="menu-btn"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            aria-controls="menu-lateral"
            onClick={() => setAbierto((v) => !v)}
          >
            <span /><span /><span />
          </button>
        )}

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

        {/* Busca DENTRO de las lecciones. Sin acceso no se ofrece: escribir
            aquí llevaría a «No has iniciado sesión», y los resultados serían
            contenido de la academia. */}
        {veContenido && (
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
        )}

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
        {/* `inert` en lugar de aria-hidden. La barra es un DRAWER en todos los
            anchos (index.css: "Sidebar como drawer en TODOS los anchos"), así
            que cerrada está fuera de pantalla. Con aria-hidden el lector no la
            anunciaba pero sus enlaces SEGUÍAN siendo tabulables: el teclado
            entraba en enlaces invisibles y sin voz (WCAG 2.4.3). `inert` quita
            foco y semántica de una vez.
            Ojo con React 18: no conoce `inert`, así que un booleano se
            serializaría como inert="false" — y en HTML un atributo booleano
            cuenta por estar PRESENTE. De ahí '' / undefined. */}
        {hayMenu && (
        <aside
          id="menu-lateral"
          ref={drawerRef}
          className={`sidebar ${menuAbierto ? 'abierto' : ''}`}
          inert={menuAbierto ? undefined : ''}
        >
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

            {/* El rótulo solo si hay algo debajo. Sin acceso la lista queda
                vacía, y un encabezado sobre la nada anuncia que existe un
                temario y que a ti te lo están ocultando. */}
            {modulosVisibles.length > 0 && (
              <div className="nav-titulo">Recorrido de estudio</div>
            )}
            {modulosVisibles.map((modulo) => (
              <div key={modulo.id} className="nav-grupo">
                <NavLink
                  to={`/modulo/${modulo.id}`}
                  className="nav-modulo"
                  style={{ '--modulo-color': modulo.color }}
                  onClick={cerrar}
                >
                  <span className="nav-modulo-num">{String(modulo.numero).padStart(2, '0')}</span>
                  <span>
                    <small>Módulo {modulo.numero}</small>
                    <br />
                    {modulo.titulo}
                  </span>
                </NavLink>
                <div className="nav-subtemas">
                  {modulo.temas.map((tema) => (
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
        )}

        {menuAbierto && <div className="overlay" onClick={cerrar} />}

        <main
          id="contenido-principal"
          tabIndex={-1}
          className={`contenido ${esHome ? 'contenido--full' : ''} ${esConsola ? 'contenido--ancho' : ''}`}
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
          {/* Las dos columnas de estudio son atajos a contenido de la
              academia. Sin acceso no se pintan: un pie lleno de enlaces que
              todos terminan en «inicia sesión» no ayuda a nadie y enseña el
              mapa de lo que hay dentro. */}
          {veContenido && (
            <div className="footer-col">
              <h4>Estudio</h4>
              {/* /temario es el panel de visibilidad, exclusivo del staff. */}
              {esStaff && <Link to="/temario">Temario (staff)</Link>}
              <Link to="/examen">Examen</Link>
              <Link to="/flashcards">Flashcards</Link>
              <Link to="/logros">Logros</Link>
            </div>
          )}
          {veContenido && (
            <div className="footer-col">
              <h4>Avanza</h4>
              <Link to="/progreso">Mi progreso</Link>
              <Link to="/buscar">Buscar</Link>
              <Link to={modulos[0] ? `/modulo/${modulos[0].id}` : '/cuenta'}>Empezar</Link>
            </div>
          )}
          <div className="footer-col">
            <h4>Materiales</h4>
            {esStaff && <Link to="/temario">Guías descargables</Link>}
            {veContenido && <Link to="/logros">Logros y glosario</Link>}
            {/* Las licencias CC BY del material visual del temario obligan a que
                la atribución esté accesible. Este es el enlace estable a ella. */}
            <Link to="/creditos">Créditos del material visual</Link>
            {/* Enlace estable al texto legal: quien lo aceptó al entrar tiene
                que poder releerlo después sin buscarlo. */}
            <Link to="/terminos-y-condiciones">Términos y condiciones</Link>
            <Link to="/cuenta">Mi cuenta</Link>
          </div>
        </div>
        <div className="footer-pie">
          <span><strong>PTEM</strong></span>
          <span>PTEM · desarrollada por Riders.Media · 2026 · Todos los derechos reservados</span>
          <span>
            Ilustraciones médicas de <Link to="/creditos">BioIcons y Servier Medical Art</Link>,
            bajo licencias abiertas.
          </span>
        </div>
      </footer>

      {/* Tutorial de primera vez. Un único punto de montaje para toda la
          aplicación: mira la ruta y decide. Ninguna pantalla sabe que existe. */}
      <TutorialDeRuta />
    </div>
  )
}

// Banner del anuncio global (lo publica el super-admin en /admin). Se muestra a
// todo el que haya iniciado sesión; cada anuncio se puede descartar y no
// reaparece hasta que cambie.
//
// SOLO CON SESIÓN, desde el 02-09-2026. Antes se pedía en toda visita, y eso
// tenía dos costes que no compraban nada: obligaba a descargar el SDK de
// Firebase (~950 kB) en la portada pública —tirando por tierra la sonda de
// `lib/sesionProbable.js`— y gastaba una lectura de Firestore por cada
// visitante anónimo. El anuncio lo escribe el super-admin para quien USA la
// plataforma («el sábado hay mantenimiento»); a quien está mirando la portada
// para saber qué es PTEM no le dice nada.
function AnuncioBanner() {
  const { autenticado } = useAuth()
  const [anuncio, setAnuncio] = useState(null)
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    if (!autenticado) return undefined
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
  }, [autenticado])

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
