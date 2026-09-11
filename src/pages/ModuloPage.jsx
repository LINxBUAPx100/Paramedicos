import { useParams, Link, useSearchParams } from 'react-router-dom'
import {
  useApiContenido, useFichasDeModulo, CargandoContenido, ErrorContenido,
} from '../context/ContenidoContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import NotFound from './NotFound.jsx'
import Icon from '../components/Icon.jsx'
import MedicalIcon from '../components/MedicalIcon.jsx'
import { estadoEditorialDeFicha, estaAvalado, ETIQUETA_ESTADO } from '../lib/estadoEditorial.js'
import { tituloVisibleDe } from '../data/contenido/titulosVisibles.js'

export default function ModuloPage() {
  const { moduloId } = useParams()
  const [parametros, setParametros] = useSearchParams()
  const consulta = parametros.get('q') || ''
  const lectura = parametros.get('lectura') || 'todos'
  const cambiarFiltro = (clave, valor) => {
    const siguientes = new URLSearchParams(parametros)
    if (valor && valor !== 'todos') siguientes.set(clave, valor)
    else siguientes.delete(clave)
    setParametros(siguientes, { replace: true })
  }
  // El módulo sale del índice (sin lecturas); sus lecciones, de UNA ficha.
  const { api, error, reintentar } = useApiContenido()
  const modulo = api?.getModulo(moduloId)
  const { fichas, cargando, error: errorFichas, reintentar: reintentarFichas } = useFichasDeModulo(moduloId)
  const { estado } = useProgress()
  const { moduloVisible, temaVisible } = useVisibilidad()

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (errorFichas) return <ErrorContenido onReintentar={reintentarFichas} />
  if (cargando) return <CargandoContenido variante="modulo" />
  if (!modulo) return <NotFound />

  // Módulo oculta para el grupo del alumno: aún no disponible.
  if (!moduloVisible(modulo.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Módulo aún no disponible</h1>
        <p>Tu profesor todavía no libera este módulo para tu grupo. Vuelve más adelante.</p>
        <Link to="/" className="btn btn--pildora btn--carbon">Volver al inicio</Link>
      </div>
    )
  }

  const temas = fichas.filter((t) => temaVisible(t.id))
  const normalizar = (texto) => String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
  const resultados = temas.filter((t) => normalizar(`${t.numero} ${tituloVisibleDe(t)} ${t.resumen || ''}`).includes(normalizar(consulta.trim()))
    && (lectura === 'todos' || (lectura === 'leidos' ? Boolean(estado.leidos[t.id]) : !estado.leidos[t.id])))
  const leidos = temas.filter((t) => estado.leidos[t.id]).length

  return (
    <div className="modulo-page" style={{ '--modulo-color': modulo.color }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span> Modulo {modulo.numero}
      </nav>

      <header className="modulo-header">
        <span className="modulo-header-ico"><MedicalIcon id={modulo.icono} size={34} /></span>
        <div>
          <span className="modulo-header-num">Modulo {modulo.numero}</span>
          <h1>{modulo.tituloVisible || modulo.titulo}</h1>
          <p className="modulo-header-sub">{modulo.subtitulo}</p>
        </div>
      </header>

      <p className="modulo-desc">{modulo.descripcion}</p>

      <section className="ui-modulo-indice" aria-label="Encontrar un tema del módulo">
        <div className="ui-herramientas">
          <label className="ui-campo">Buscar en este módulo
            <input type="search" value={consulta} onChange={(e) => cambiarFiltro('q', e.target.value)} placeholder="Título, número o concepto" />
          </label>
          <label className="ui-campo">Lectura
            <select value={lectura} onChange={(e) => cambiarFiltro('lectura', e.target.value)}>
              <option value="todos">Todos los temas</option><option value="pendientes">Pendientes de leer</option><option value="leidos">Ya leídos</option>
            </select>
          </label>
        </div>
        <p role="status">{resultados.length} de {temas.length} temas · {leidos} leídos</p>
      </section>

      <div className="temas-lista">
        {resultados.map((tema) => {
          const leido = estado.leidos[tema.id]
          const quiz = estado.quizzes[tema.id]
          // El listado dice el estado editorial ANTES de entrar: abrir cinco
          // temas seguidos para descubrir que están vacíos es peor que verlo.
          const estadoEd = estadoEditorialDeFicha(tema)
          return (
            <Link to={`/tema/${tema.id}`} key={tema.id} className="tema-fila">
              <span className="tema-fila-ico"><MedicalIcon id={tema.icono} size={26} /></span>
              <div className="tema-fila-info">
                <div className="tema-fila-titulo">
                  <span className="tema-fila-num">{tema.numero}</span>
                  {tituloVisibleDe(tema)}
                  {!estaAvalado(estadoEd) && (
                    <span className={`chip chip-editorial chip-editorial--${estadoEd}`}>
                      {ETIQUETA_ESTADO[estadoEd]}
                    </span>
                  )}
                  {leido && <span className="chip chip-ok"><Icon name="check" size={13} /> Leído</span>}
                  {quiz && (
                    <span className="chip chip-quiz">
                      Quiz: {Math.round((quiz.aciertos / quiz.total) * 100)}%
                    </span>
                  )}
                </div>
                <p className="tema-fila-resumen">{tema.resumen}</p>
                <div className="tema-fila-meta">
                  {tema.duracion && <span><Icon name="reloj" size={14} /> {tema.duracion}</span>}
                  <span><Icon name="pregunta" size={14} /> {tema.nQuiz} preguntas</span>
                  <span><Icon name="flashcards" size={14} /> {tema.nFlashcards} flashcards</span>
                </div>
              </div>
              <span className="tema-fila-flecha" aria-hidden="true"><Icon name="chevronDer" size={18} /></span>
            </Link>
          )
        })}
      </div>
      {resultados.length === 0 && <p className="ui-estado">{temas.length ? 'No hay temas que coincidan con estos filtros.' : 'Tu profesor todavía no ha liberado temas de este módulo.'}</p>}

      <section className="modulo-examen-cta">
        <div className="modulo-examen-txt">
          <h2><Icon name="examen" size={22} /> Examen del Módulo {modulo.numero}</h2>
          <p>Pon a prueba todo lo visto en este módulo. Tu resultado se guarda como intento para seguir tu avance.</p>
        </div>
        <Link to={`/modulo/${modulo.id}/examen`} className="btn btn--primario btn--lg">
          Presentar examen de módulo
        </Link>
      </section>
    </div>
  )
}
