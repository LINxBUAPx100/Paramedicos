import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useApiContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import MisCalificaciones from '../components/MisCalificaciones.jsx'
import ProgresoStaff from '../components/ProgresoStaff.jsx'
import MedicalIcon from '../components/MedicalIcon.jsx'
import Icon from '../components/Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { filtrarTemasEstudio, paginarLista, resumenLectura } from '../lib/listasEstudio.js'
import Paginacion from '../components/ui/Paginacion.jsx'

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
  const { api, error, reintentar } = useApiContenido()
  const { estado, reiniciar } = useProgress()
  const { temaVisible, moduloVisible } = useVisibilidad()
  const [params, setParams] = useSearchParams()
  const consulta = params.get('q') || ''
  const lectura = params.get('lectura') || 'todos'
  const [recarga, setRecarga] = useState(0)
  const cambiarFiltro = (clave, valor) => {
    const siguientes = new URLSearchParams(params)
    if (valor && valor !== 'todos') siguientes.set(clave, valor)
    else siguientes.delete(clave)
    if (clave !== 'pagina') siguientes.delete('pagina')
    setParams(siguientes, { replace: true })
  }

  // Mejor calificación del alumno en el examen de CADA módulo. Vive en Firestore
  // (`intentos`), no en el progreso local, y hasta ahora solo la veía su
  // profesor desde el panel: el alumno no tenía dónde consultar su propia nota.
  const [historial, setHistorial] = useState({ uid: null, estado: 'cargando', mejores: {} })
  useEffect(() => {
    if (!user?.uid) return undefined
    let vivo = true
    setHistorial({ uid: user.uid, estado: 'cargando', mejores: {} })
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
        setHistorial({ uid: user.uid, estado: 'listo', mejores: mejor })
      } catch {
        if (vivo) setHistorial({ uid: user.uid, estado: 'error', mejores: {} })
      }
    })()
    return () => { vivo = false }
  }, [user?.uid, recarga])

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!api) return <CargandoContenido />
  // Módulos, contadores y lista de temas salen del índice: cero lecturas.
  const modulos = api.modulos.filter((m) => moduloVisible(m.id)).map((m) => ({ ...m, temas: m.temas.filter((t) => temaVisible(t.id)) }))
  const todosLosTemas = filtrarTemasEstudio(api.todosLosTemasLigeros, { temaVisible })
  const resumen = resumenLectura(todosLosTemas, estado)
  const detalle = paginarLista(filtrarTemasEstudio(todosLosTemas, { consulta, lectura, leidos: estado.leidos }), params.get('pagina') || 1)
  const mejorPorModulo = historial.uid === user?.uid ? historial.mejores : {}
  const estadoHistorial = historial.uid === user?.uid ? historial.estado : 'cargando'

  const temasLeidos = resumen.leidos
  const progresoGlobal = resumen.porcentaje
  const quizzesHechos = resumen.quizzes
  const promedioQuiz = resumen.promedio

  function confirmarReinicio() {
    if (window.confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
      reiniciar()
    }
  }

  return (
    <div className={conCabecera ? 'progreso-page' : ''}>
      {conCabecera && (
        <header className="ui-cabecera">
          <span className="ui-antetitulo">Tu recorrido</span>
          <h1>Mi progreso</h1>
          <p>Lectura y práctica del temario disponible para tu grupo. Leer un tema y aprobar un examen son avances distintos.</p>
        </header>
      )}

      <div className="progreso-resumen">
        <div className="resumen-card">
          <div className="resumen-num">{progresoGlobal}%</div>
          <div className="resumen-label">Avance de lectura</div>
          <div className="barra-global">
            <div className="barra-global-fill" style={{ width: `${progresoGlobal}%` }} />
          </div>
        </div>
        <div className="resumen-card">
          <div className="resumen-num">{temasLeidos}/{resumen.total}</div>
          <div className="resumen-label">Temas leídos</div>
        </div>
        <div className="resumen-card">
          <div className="resumen-num">{quizzesHechos}</div>
          <div className="resumen-label">Quizzes realizados</div>
        </div>
        <div className="resumen-card">
          <div className="resumen-num">{promedioQuiz === null ? '—' : `${promedioQuiz}%`}</div>
          <div className="resumen-label">Promedio en quizzes</div>
        </div>
      </div>

      <section className="progreso-modulos">
        <h2 className="seccion-titulo">Avance por módulo</h2>
        {modulos.map((modulo) => {
          const leidos = modulo.temas.filter((t) => estado.leidos[t.id]).length
          const pct = modulo.temas.length ? Math.round((leidos / modulo.temas.length) * 100) : 0
          // La nota del examen del módulo: es la calificación que de verdad
          // cuenta de cada materia, y estaba solo en el panel del profesor.
          const nota = mejorPorModulo[modulo.id]
          return (
            <div className="progreso-modulo" key={modulo.id} style={{ '--modulo-color': modulo.color }}>
              <div className="progreso-modulo-cab">
                <span>
                  <MedicalIcon id={modulo.icono} size={20} /> <Link to={`/modulo/${modulo.id}`}><strong>Módulo {modulo.numero}:</strong> {modulo.titulo}</Link>
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
        {estadoHistorial === 'cargando' && <p role="status">Cargando resultados de exámenes…</p>}
        {estadoHistorial === 'error' && <div className="ui-estado" role="alert"><p>No se pudieron cargar tus resultados de exámenes. Tu avance de lectura sigue disponible.</p><button className="btn btn--suave" onClick={() => setRecarga((n) => n + 1)}>Reintentar resultados</button></div>}
        {estadoHistorial === 'listo' && Object.keys(mejorPorModulo).length === 0 && (
          <p className="panel-nota">
            Cuando presentes el examen de un módulo, tu calificación aparecerá aquí al lado de su
            avance.
          </p>
        )}
      </section>

      <section className="progreso-temas">
        <h2 className="seccion-titulo">Detalle por tema</h2>
        <div className="ui-herramientas">
          <label className="ui-campo">Buscar tema<input type="search" value={consulta} onChange={(e) => cambiarFiltro('q', e.target.value)} /></label>
          <label className="ui-campo">Lectura<select value={lectura} onChange={(e) => cambiarFiltro('lectura', e.target.value)}><option value="todos">Todos los temas</option><option value="pendientes">Pendientes de leer</option><option value="leidos">Ya leídos</option></select></label>
        </div>
        <p role="status">{detalle.total} temas</p>
        <div className="progreso-tabla">
          {detalle.filas.map((tema) => {
            const leido = estado.leidos[tema.id]
            const quiz = estado.quizzes[tema.id]
            return (
              <Link to={`/tema/${tema.id}`} key={tema.id} className="progreso-tema-fila">
                <span className="progreso-tema-num">{tema.numero}</span>
                <span className="progreso-tema-titulo">{tema.titulo}</span>
                <span className={`chip ${leido ? 'chip-ok' : 'chip-pendiente'}`}>
                  {leido ? <><Icon name="check" size={13} /> Leído</> : 'Pendiente'}
                </span>
                <span className="progreso-tema-quiz">
                  {quiz?.total > 0 ? `${Math.round((quiz.aciertos / quiz.total) * 100)}%` : 'Sin quiz'}
                </span>
              </Link>
            )
          })}
        </div>
        {!detalle.total && <p className="ui-estado">No hay temas que coincidan con estos filtros.</p>}
        <Paginacion datos={detalle} onCambiar={(p) => cambiarFiltro('pagina', String(p))} etiqueta="Páginas de mi progreso" />
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
