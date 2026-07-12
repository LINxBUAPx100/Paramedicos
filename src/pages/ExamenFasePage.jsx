import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFase, preguntasDeFase } from '../data/index.js'
import { useAuth } from '../context/AuthContext.jsx'
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

  // Baraja las preguntas de la fase una vez por intento.
  const preguntas = useMemo(
    () => mezclar(preguntasDeFase(faseId)),
    [faseId, intentoKey]
  )

  if (!fase) return <NotFound />

  const onComplete = async (aciertos, total) => {
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
        </>
      )}
    </div>
  )
}
