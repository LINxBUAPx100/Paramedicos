import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFase, preguntasDeFase } from '../data/index.js'
import { fasesNav } from '../data/navIndice.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'

function mezclar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ExamenFasePage() {
  const { faseId } = useParams()
  const fase = getFase(faseId)
  const { user, perfil, academiaId } = useAuth()

  const [iniciado, setIniciado] = useState(false)
  const [intentoKey, setIntentoKey] = useState(0)
  const [guardado, setGuardado] = useState(null) // { ok, pct } | { ok: false }
  const [fin, setFin] = useState(null) // { pct } → pantalla de felicitaciones

  // Baraja las preguntas de la fase una vez por intento.
  const preguntas = useMemo(
    () => mezclar(preguntasDeFase(faseId)),
    [faseId, intentoKey]
  )

  if (!fase) return <NotFound />

  const onComplete = async (aciertos, total) => {
    const pctLocal = total ? Math.round((aciertos / total) * 100) : 0
    setFin({ pct: pctLocal })
    try {
      const { guardarIntentoFase } = await import('../lib/firebase/intentos.js')
      const pct = await guardarIntentoFase({
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        fase,
        aciertos,
        total,
      })
      setGuardado({ ok: true, pct })
    } catch {
      setGuardado({ ok: false })
    }
  }

  const otroIntento = () => {
    setGuardado(null)
    setFin(null)
    setIntentoKey((k) => k + 1)
  }

  return (
    <div className="examen-page" style={{ '--fase-color': fase.color }}>
      <nav className="migas">
        <Link to={`/fase/${fase.id}`}>Fase {fase.numero}</Link> <span>/</span> Examen de fase
      </nav>

      {!iniciado ? (
        <div className="examen-fase-intro">
          <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
          <h1>Examen de la Fase {fase.numero}</h1>
          <p className="examen-fase-nombre">{fase.titulo}</p>
          <p>
            {preguntas.length} preguntas de los {fase.temas.length} temas de esta fase. Al terminar,
            tu resultado se guarda como intento (fecha, puntaje y % de acierto) para que tú y tu
            maestro puedan seguir tu avance.
          </p>
          <button className="btn btn-primario btn-grande" onClick={() => setIniciado(true)}>
            Comenzar examen ({preguntas.length} preguntas)
          </button>
          <Link to={`/fase/${fase.id}`} className="link-discreto">← Volver a la fase</Link>
        </div>
      ) : (
        <>
          <header className="quiz-page-header">
            <h1>
              <span className="quiz-page-ico"><Icon name="examen" size={24} /></span>
              Examen · Fase {fase.numero}
            </h1>
            <p>{fase.titulo}</p>
          </header>

          {guardado && (
            <div className={`examen-fase-guardado ${guardado.ok ? 'ok' : 'error'}`} role="status">
              {guardado.ok
                ? `✓ Intento guardado (${guardado.pct}%). Tu maestro podrá verlo en tu avance.`
                : '⚠ No se pudo guardar el intento (revisa tu conexión). Tu resultado sigue abajo.'}
            </div>
          )}

          <Quiz
            key={intentoKey}
            preguntas={preguntas}
            titulo={`Fase ${fase.numero}`}
            onComplete={onComplete}
          />

          <div className="quiz-page-pie">
            <button className="btn btn-secundario" onClick={otroIntento}>
              ↻ Otro intento
            </button>
            <Link to={`/fase/${fase.id}`} className="btn btn-secundario">
              ← Volver a la fase
            </Link>
          </div>

          {fin && <ModuloCompletado fase={fase} pct={fin.pct} onCerrar={() => setFin(null)} />}
        </>
      )}
    </div>
  )
}

// ------------------------------------------------------------
//  Pantalla completa de FELICITACIONES al terminar el examen de fase:
//  resume los aprendizajes del módulo y, si la siguiente fase está
//  bloqueada para el alumno, deja SOLICITAR el acceso (el staff la
//  aprueba desde su panel).
// ------------------------------------------------------------
function ModuloCompletado({ fase, pct, onCerrar }) {
  const { user, perfil, rol, academiaId, grupoId } = useAuth()
  const { faseVisible } = useVisibilidad()

  const idx = fasesNav.findIndex((f) => f.id === fase.id)
  const siguiente = idx >= 0 ? fasesNav[idx + 1] || null : null
  // El alumno solo SOLICITA cuando la siguiente fase está oculta para él;
  // si ya la ve (o es staff), se le invita a continuar directamente.
  const bloqueada = Boolean(siguiente) && rol === 'alumno' && !faseVisible(siguiente.id)

  const [envio, setEnvio] = useState(bloqueada ? 'cargando' : 'puede')
  // ¿Ya tiene una solicitud pendiente de esa fase? (no duplicar)
  useEffect(() => {
    if (!bloqueada) return
    let activo = true
    ;(async () => {
      try {
        const { misSolicitudes } = await import('../lib/firebase/solicitudes.js')
        const lista = await misSolicitudes(user.uid)
        const ya = lista.some(
          (s) => s.tipo === 'modulo' && s.faseId === siguiente.id && s.estado === 'pendiente'
        )
        if (activo) setEnvio(ya ? 'pendiente' : 'puede')
      } catch {
        if (activo) setEnvio('puede')
      }
    })()
    return () => { activo = false }
  }, [bloqueada, siguiente?.id, user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  const solicitar = async () => {
    setEnvio('enviando')
    try {
      const { crearSolicitud } = await import('../lib/firebase/solicitudes.js')
      await crearSolicitud({
        tipo: 'modulo',
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        grupoId,
        faseId: siguiente.id,
        faseNumero: siguiente.numero,
        faseTitulo: siguiente.titulo,
      })
      setEnvio('enviada')
    } catch {
      setEnvio('error')
    }
  }

  return (
    <div className="modulo-fin" role="dialog" aria-modal="true" aria-label="Módulo completado">
      <div className="modulo-fin-card" style={{ '--fase-color': fase.color }}>
        <span className="modulo-fin-emoji" aria-hidden="true">🎉</span>
        <h2>¡Felicidades{perfil?.nombre ? `, ${perfil.nombre.split(' ')[0]}` : ''}!</h2>
        <p className="modulo-fin-sub">
          Completaste el examen de la <strong>Fase {fase.numero} · {fase.titulo}</strong> con
          un resultado de <b className={pct >= 70 ? 'ok' : 'mal'}>{pct}%</b>.
        </p>

        <div className="modulo-fin-aprendizajes">
          <h3><Icon name="diana" size={18} /> Aprendizajes de este módulo</h3>
          <ul>
            {fase.temas.map((t) => (
              <li key={t.id}><span>{t.numero}</span> {t.titulo}</li>
            ))}
          </ul>
        </div>

        <div className="modulo-fin-cta">
          {!siguiente ? (
            <p className="modulo-fin-final">
              🏆 Esta era la última fase del temario. ¡Completaste todo el programa!
            </p>
          ) : bloqueada ? (
            <>
              {envio === 'enviada' || envio === 'pendiente' ? (
                <p className="modulo-fin-final" role="status">
                  ✓ {envio === 'enviada' ? 'Solicitud enviada.' : 'Ya tienes una solicitud pendiente.'}{' '}
                  Tu profesor la verá en su panel y te habilitará la
                  Fase {siguiente.numero} · {siguiente.titulo}.
                </p>
              ) : (
                <button
                  className="btn btn-primario btn-grande"
                  onClick={solicitar}
                  disabled={envio === 'enviando' || envio === 'cargando'}
                >
                  {envio === 'enviando' ? 'Enviando…' : 'Solicitar acceso al siguiente módulo'}
                </button>
              )}
              {envio === 'error' && (
                <p className="cuenta-error" role="alert">
                  No se pudo enviar la solicitud (revisa tu conexión e inténtalo de nuevo).
                </p>
              )}
            </>
          ) : (
            <Link to={`/fase/${siguiente.id}`} className="btn btn-primario btn-grande">
              Continuar con la Fase {siguiente.numero} →
            </Link>
          )}
        </div>

        <button className="modulo-fin-cerrar" onClick={onCerrar}>
          Seguir repasando esta fase
        </button>
      </div>
    </div>
  )
}
