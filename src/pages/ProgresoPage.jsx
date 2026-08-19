import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import MisCalificaciones from '../components/MisCalificaciones.jsx'
import ProgresoStaff from '../components/ProgresoStaff.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function formatoFecha(ts) {
  return new Date(ts).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ============================================================
//  /progreso — dos vistas, no una
// ------------------------------------------------------------
//  Quien da clase entraba directo al avance de sus alumnos y su propio
//  progreso quedaba inalcanzable: el «Ver detalle» de la portada llevaba aquí
//  y le enseñaba la tabla de otros. Pero el staff TAMBIÉN estudia —el
//  super-admin es el primero que recorre el temario para revisarlo—, así que
//  su avance personal existe y hay que poder verlo. Ahora son dos pestañas y
//  la vista viaja en la URL (`?vista=mio`), que es lo que permite enlazar
//  directamente a la propia desde la portada.
// ============================================================
export default function ProgresoPage() {
  const { esStaff } = useAuth()
  const [params, setParams] = useSearchParams()
  const vista = params.get('vista') === 'mio' ? 'mio' : 'alumnos'

  // Quien no da clase solo tiene una vista posible: la suya. Sin pestañas.
  if (!esStaff) return <MiProgreso />

  const VISTAS = [
    { id: 'alumnos', label: 'Avance de mis alumnos' },
    { id: 'mio', label: 'Mi progreso' },
  ]

  return (
    <div className="progreso-page">
      <header className="progreso-header">
        <h1>Progreso</h1>
        <p>El avance de tus alumnos y, en su propia pestaña, el tuyo.</p>
      </header>

      <div className="rp-tabs" role="tablist" aria-label="Vistas de progreso">
        {VISTAS.map((v) => (
          <button
            key={v.id}
            role="tab"
            id={`pg-tab-${v.id}`}
            aria-selected={vista === v.id}
            aria-controls={`pg-panel-${v.id}`}
            className={`rp-tab ${vista === v.id ? 'activa' : ''}`}
            // `replace` para no llenar el historial: alternar pestañas no es
            // navegar, y con push el botón Atrás obligaría a pasar por cada una.
            onClick={() => setParams(v.id === 'mio' ? { vista: 'mio' } : {}, { replace: true })}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div id={`pg-panel-${vista}`} role="tabpanel" aria-labelledby={`pg-tab-${vista}`}>
        {vista === 'mio' ? <MiProgreso conCabecera={false} /> : <ProgresoStaff conCabecera={false} />}
      </div>
    </div>
  )
}

// Avance personal: el de quien mira. Se usa suelto (alumno) y dentro de la
// pestaña «Mi progreso» del staff, de ahí `conCabecera`.
function MiProgreso({ conCabecera = true }) {
  const { user } = useAuth()
  const { contenido, error, reintentar } = useContenido()
  const { estado, reiniciar } = useProgress()

  // Mejor calificación del alumno en el examen de CADA módulo. Vive en Firestore
  // (`intentos`), no en el progreso local, y hasta ahora solo la veía su
  // profesor desde el panel: el alumno no tenía dónde consultar su propia nota.
  const [mejorPorModulo, setMejorPorModulo] = useState({})
  useEffect(() => {
    if (!user?.uid) return undefined
    let vivo = true
    ;(async () => {
      try {
        const { intentosDeAlumno } = await import('../lib/firebase/intentos.js')
        const intentos = await intentosDeAlumno(user.uid)
        if (!vivo) return
        const mejor = {}
        for (const it of intentos) {
          const pct = Number(it?.porcentaje)
          if (!it?.moduloId || !Number.isFinite(pct)) continue
          if (mejor[it.moduloId] === undefined || pct > mejor[it.moduloId]) mejor[it.moduloId] = pct
        }
        setMejorPorModulo(mejor)
      } catch {
        // Silencioso: sin esto el alumno sigue viendo su avance. Un error rojo
        // aquí le preocuparía por algo que no puede resolver.
      }
    })()
    return () => { vivo = false }
  }, [user?.uid])

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!contenido) return <CargandoContenido />
  const { modulos, stats, todosLosTemas } = contenido

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
    <div className={conCabecera ? 'progreso-page' : ''}>
      {conCabecera && (
        <header className="progreso-header">
          <h1>Mi progreso</h1>
          <p>Tu avance se guarda automáticamente en este navegador.</p>
        </header>
      )}

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

      <section className="progreso-modulos">
        <h2 className="seccion-titulo">Avance por módulo</h2>
        {modulos.map((modulo) => {
          const leidos = modulo.temas.filter((t) => estado.leidos[t.id]).length
          const pct = Math.round((leidos / modulo.temas.length) * 100)
          // La nota del examen del módulo: es la calificación que de verdad
          // cuenta de cada materia, y estaba solo en el panel del profesor.
          const nota = mejorPorModulo[modulo.id]
          return (
            <div className="progreso-modulo" key={modulo.id} style={{ '--modulo-color': modulo.color }}>
              <div className="progreso-modulo-cab">
                <span>
                  {modulo.icono} <strong>Modulo {modulo.numero}:</strong> {modulo.titulo}
                </span>
                <span className="pf-derecha">
                  {nota !== undefined && (
                    <b className={`pf-nota ${nota >= 70 ? 'ok' : 'mal'}`} title="Tu mejor calificación en el examen de este módulo">
                      {nota}%
                    </b>
                  )}
                  {leidos}/{modulo.temas.length}
                </span>
              </div>
              <div className="barra-modulo">
                <div className="barra-modulo-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
        {Object.keys(mejorPorModulo).length === 0 && (
          <p className="panel-nota">
            Cuando presentes el examen de un módulo, tu calificación aparecerá aquí al lado de su
            avance.
          </p>
        )}
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

      {/* Las calificaciones que le pone su maestro (Bloque S). Se pinta solo si
          hay alguna: una seccion vacia le haria preguntarse si le falta algo. */}
      <MisCalificaciones />

      <div className="progreso-reinicio">
        <button className="btn btn--peligro" onClick={confirmarReinicio}>
          Reiniciar mi progreso
        </button>
      </div>
    </div>
  )
}
