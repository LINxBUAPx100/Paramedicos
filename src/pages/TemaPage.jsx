import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTema, getTemaVecinos } from '../data/index.js'
import { getRecursos } from '../data/recursosDescarga.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Contenido from '../components/Contenido.jsx'
import Icon from '../components/Icon.jsx'
import Recursos from '../components/Recursos.jsx'
import Actividades from '../components/Actividades.jsx'
import NotFound from './NotFound.jsx'

export default function TemaPage() {
  const { temaId } = useParams()
  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref') // clave de imagen del Atlas a la que saltar
  const navigate = useNavigate()
  const tema = getTema(temaId)
  const { estado, marcarLeido } = useProgress()
  const { temaVisible } = useVisibilidad()

  // Al cambiar de tema: si venimos del Atlas (?ref=clave), salta a ese diagrama
  // y lo resalta; si no, sube al inicio.
  useEffect(() => {
    if (ref) {
      const el = document.getElementById(`diag-${ref}`)
      if (el) {
        const saltar = () => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          el.classList.add('c-diagrama--destacado')
          setTimeout(() => el.classList.remove('c-diagrama--destacado'), 2400)
        }
        const t = setTimeout(saltar, 250)
        const img = el.querySelector('img')
        if (img && !img.complete) img.addEventListener('load', saltar, { once: true })
        return () => clearTimeout(t)
      }
    }
    window.scrollTo(0, 0)
  }, [temaId, ref])

  if (!tema) return <NotFound />

  // Tema oculto para el grupo del alumno: aún no disponible.
  if (!temaVisible(tema.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Tema aún no disponible</h1>
        <p>Tu profesor todavía no libera este tema para tu grupo. Vuelve más adelante.</p>
        <Link to={`/fase/${tema.faseId}`} className="btn-pildora btn-pildora--solido">Volver a la fase</Link>
      </div>
    )
  }

  const vecinos = getTemaVecinos(temaId)
  const leido = estado.leidos[temaId]
  const recursos = getRecursos(temaId)
  // ¿Es el ÚLTIMO tema de su fase? Al terminarlo, el "Siguiente" lleva
  // directo al EXAMEN del módulo (no al primer tema de la fase que sigue).
  const ultimoDeFase = !vecinos.siguiente || vecinos.siguiente.faseId !== tema.faseId

  return (
    <article className="tema-page" style={{ '--fase-color': tema.faseColor }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span>{' '}
        <Link to={`/fase/${tema.faseId}`}>Fase {tema.faseNumero}</Link> <span>/</span>{' '}
        {tema.numero}
      </nav>

      <ReportarProblema tema={tema} />

      <header className="tema-header">
        <span className="tema-header-ico">{tema.icono}</span>
        <div className="tema-header-info">
          <span className="tema-header-num">Tema {tema.numero}</span>
          <h1>{tema.titulo}</h1>
          <div className="tema-header-meta">
            <span><Icon name="reloj" size={15} /> {tema.duracion}</span>
            <span><Icon name="pregunta" size={15} /> {tema.quiz.length} preguntas</span>
            <span><Icon name="flashcards" size={15} /> {tema.flashcards.length} flashcards</span>
          </div>
        </div>
      </header>

      <p className="tema-resumen">{tema.resumen}</p>

      {tema.objetivos && (
        <div className="objetivos">
          <h3><Icon name="diana" size={17} /> Al terminar este tema podrás</h3>
          <ul>
            {tema.objetivos.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {recursos.length > 0 && (
        <div className="descargas">
          <h3><Icon name="libro" size={17} /> Material descargable de este tema</h3>
          <div className="descargas-grid">
            {recursos.map((r, i) => (
              <a
                key={i}
                className="descarga-btn"
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="descarga-ico"><Icon name="descarga" size={19} /></span>
                <span className="descarga-txt">Descarga: {r.titulo}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <Contenido secciones={tema.secciones} />

      <Recursos recursos={tema.recursos} />

      {tema.conceptosClave && (
        <section className="conceptos">
          <h2 className="seccion-titulo">Conceptos clave</h2>
          <div className="conceptos-grid">
            {tema.conceptosClave.map((c, i) => (
              <div className="concepto-card" key={i}>
                <strong>{c.termino}</strong>
                <p>{c.definicion}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Actividades
        pares={tema.conceptosClave || []}
        ordenar={tema.actividades?.ordenar}
        completar={tema.actividades?.completar || []}
        preguntas={tema.actividades?.preguntas || []}
      />

      <div className="tema-acciones">
        <button
          className={`btn ${leido ? 'btn-ok' : 'btn-secundario'}`}
          onClick={() => marcarLeido(temaId, !leido)}
        >
          {leido ? '✓ Marcado como leído' : 'Marcar como leído'}
        </button>
        <Link to={`/tema/${temaId}/quiz`} className="btn btn-primario">
          <Icon name="matraz" size={17} /> Hacer el quiz de este tema
        </Link>
        <Link to={`/flashcards/${temaId}`} className="btn btn-secundario">
          <Icon name="flashcards" size={17} /> Repasar flashcards
        </Link>
      </div>

      <nav className="tema-nav">
        {vecinos.anterior ? (
          <button
            className="tema-nav-btn"
            onClick={() => navigate(`/tema/${vecinos.anterior.id}`)}
          >
            <span>← Anterior</span>
            <strong>{vecinos.anterior.numero} {vecinos.anterior.titulo}</strong>
          </button>
        ) : (
          <span />
        )}
        {ultimoDeFase ? (
          <button
            className="tema-nav-btn derecha tema-nav-btn--examen"
            onClick={() => navigate(`/fase/${tema.faseId}/examen`)}
          >
            <span>🎉 Terminaste el módulo</span>
            <strong>Presentar el examen de la Fase {tema.faseNumero}</strong>
          </button>
        ) : (
          <button
            className="tema-nav-btn derecha"
            onClick={() => navigate(`/tema/${vecinos.siguiente.id}`)}
          >
            <span>Siguiente →</span>
            <strong>{vecinos.siguiente.numero} {vecinos.siguiente.titulo}</strong>
          </button>
        )}
      </nav>
    </article>
  )
}

// Botón "Reportar un problema" del tema: guarda el reporte en Firestore para
// que el super-administrador lo revise en su dashboard (/admin → Problemas).
function ReportarProblema({ tema }) {
  const { user, perfil, academiaId } = useAuth()
  const [abierto, setAbierto] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [estado, setEstado] = useState('') // '' | 'enviando' | 'ok' | 'error'

  if (!user) return null // sin sesión no se puede firmar el reporte

  const enviar = async (e) => {
    e.preventDefault()
    setEstado('enviando')
    try {
      const { crearReporte } = await import('../lib/firebase/reportes.js')
      await crearReporte({
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        email: user.email || '',
        academiaId,
        grupoId: perfil?.grupoId || null,
        temaId: tema.id,
        temaTitulo: `${tema.numero} · ${tema.titulo}`,
        mensaje,
      })
      setEstado('ok')
      setMensaje('')
      setTimeout(() => { setAbierto(false); setEstado('') }, 2600)
    } catch {
      setEstado('error')
    }
  }

  return (
    <div className="tema-reporte">
      <button
        className="tema-reporte-btn"
        onClick={() => { setAbierto((v) => !v); setEstado('') }}
        aria-expanded={abierto}
      >
        <Icon name="alerta" size={15} /> Reportar un problema
      </button>
      {abierto && (
        <form className="tema-reporte-form" onSubmit={enviar}>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="¿Qué está mal en este tema? (error de contenido, imagen rota, falta algo…)"
            rows={3}
            maxLength={1000}
            required
          />
          <div className="tema-reporte-acciones">
            <button type="submit" className="btn btn-primario" disabled={estado === 'enviando'}>
              {estado === 'enviando' ? 'Enviando…' : 'Enviar reporte'}
            </button>
            <button type="button" className="btn btn-secundario" onClick={() => setAbierto(false)}>
              Cancelar
            </button>
          </div>
          {estado === 'ok' && <p className="cuenta-ok" role="status">✓ Reporte enviado. Gracias por avisar.</p>}
          {estado === 'error' && <p className="cuenta-error" role="alert">No se pudo enviar (revisa tu conexión).</p>}
        </form>
      )}
    </div>
  )
}
