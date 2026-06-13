import { Link } from 'react-router-dom'
import { fases, stats, todosLosTemas } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'

function formatoFecha(ts) {
  return new Date(ts).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ProgresoPage() {
  const { estado, reiniciar } = useProgress()

  const temasLeidos = Object.values(estado.leidos).filter(Boolean).length
  const progresoGlobal = Math.round((temasLeidos / stats.temas) * 100)
  const quizzesHechos = Object.keys(estado.quizzes).length
  const promedioQuiz =
    quizzesHechos > 0
      ? Math.round(
          (Object.values(estado.quizzes).reduce(
            (acc, q) => acc + q.aciertos / q.total,
            0
          ) /
            quizzesHechos) *
            100
        )
      : 0

  function confirmarReinicio() {
    if (window.confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      reiniciar()
    }
  }

  return (
    <div className="progreso-page">
      <header className="progreso-header">
        <h1>📊 Mi progreso</h1>
        <p>Tu avance se guarda automáticamente en este navegador.</p>
      </header>

      <div className="progreso-resumen">
        <div className="resumen-card">
          <div className="resumen-num">{progresoGlobal}%</div>
          <div className="resumen-label">Temario completado</div>
          <div className="barra-global">
            <div className="barra-global-fill" style={{ width: `${progresoGlobal}%` }} />
          </div>
        </div>
        <div className="resumen-card">
          <div className="resumen-num">{temasLeidos}/{stats.temas}</div>
          <div className="resumen-label">Temas leídos</div>
        </div>
        <div className="resumen-card">
          <div className="resumen-num">{quizzesHechos}</div>
          <div className="resumen-label">Quizzes realizados</div>
        </div>
        <div className="resumen-card">
          <div className="resumen-num">{promedioQuiz}%</div>
          <div className="resumen-label">Promedio en quizzes</div>
        </div>
      </div>

      <section className="progreso-fases">
        <h2 className="seccion-titulo">Avance por fase</h2>
        {fases.map((fase) => {
          const leidos = fase.temas.filter((t) => estado.leidos[t.id]).length
          const pct = Math.round((leidos / fase.temas.length) * 100)
          return (
            <div className="progreso-fase" key={fase.id} style={{ '--fase-color': fase.color }}>
              <div className="progreso-fase-cab">
                <span>
                  {fase.icono} <strong>Fase {fase.numero}:</strong> {fase.titulo}
                </span>
                <span>{leidos}/{fase.temas.length}</span>
              </div>
              <div className="barra-fase">
                <div className="barra-fase-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </section>

      <section className="progreso-temas">
        <h2 className="seccion-titulo">Detalle por tema</h2>
        <div className="progreso-tabla">
          {todosLosTemas.map((tema) => {
            const leido = estado.leidos[tema.id]
            const quiz = estado.quizzes[tema.id]
            return (
              <Link to={`/tema/${tema.id}`} key={tema.id} className="progreso-tema-fila">
                <span className="progreso-tema-num">{tema.numero}</span>
                <span className="progreso-tema-titulo">{tema.titulo}</span>
                <span className={`chip ${leido ? 'chip-ok' : 'chip-pendiente'}`}>
                  {leido ? '✓ Leído' : 'Pendiente'}
                </span>
                <span className="progreso-tema-quiz">
                  {quiz ? `${Math.round((quiz.aciertos / quiz.total) * 100)}%` : '—'}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {estado.examenes.length > 0 && (
        <section className="progreso-examenes">
          <h2 className="seccion-titulo">Historial de exámenes generales</h2>
          <div className="examenes-lista">
            {estado.examenes.map((ex, i) => {
              const pct = Math.round((ex.aciertos / ex.total) * 100)
              return (
                <div key={i} className="examen-fila">
                  <span className={`examen-pct ${pct >= 70 ? 'ok' : 'mal'}`}>{pct}%</span>
                  <span>{ex.aciertos}/{ex.total} correctas</span>
                  <span className="examen-fecha">{formatoFecha(ex.fecha)}</span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <div className="progreso-reinicio">
        <button className="btn btn-peligro" onClick={confirmarReinicio}>
          🗑️ Reiniciar mi progreso
        </button>
      </div>
    </div>
  )
}
