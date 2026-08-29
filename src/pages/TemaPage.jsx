import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import {
  useTema, useCargaDeAgregado, CargandoContenido, ErrorContenido,
} from '../context/ContenidoContext.jsx'
import { getRecursos } from '../data/recursosDescarga.js'
import { imagenesDeTema } from '../data/imagenes.js'
import Imagen from '../components/Imagen.jsx'
import MedicalIcon from '../components/MedicalIcon.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'
import Contenido from '../components/Contenido.jsx'
import { ResumenTema, ObjetivosTema, ConceptosTema } from '../components/BloquesTema.jsx'
import Icon from '../components/Icon.jsx'
import Recursos from '../components/Recursos.jsx'
import Actividades from '../components/Actividades.jsx'
import AvisoEditorial, { CuerpoSinContenido } from '../components/AvisoEditorial.jsx'
import FichaEvaluacion from '../components/FichaEvaluacion.jsx'
import RevisionDocente from '../components/RevisionDocente.jsx'
import { estadoEditorialDe, muestraContenido, esNodoDeEvaluacion } from '../lib/estadoEditorial.js'
import { bancoDeExamen, temasEsperandoValidacion } from '../lib/bancoExamen.js'
import { tituloVisibleDe } from '../data/contenido/titulosVisibles.js'
import NotFound from './NotFound.jsx'

export default function TemaPage() {
  const { temaId } = useParams()
  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref') // clave de imagen del Atlas a la que saltar
  const navigate = useNavigate()
  // Contenido de LA ACADEMIA del usuario (resolutor: Firestore o bundle).
  // Se pide SOLO esta lección: antes se bajaba el curso entero para leer una.
  const { tema, api, cargando, error, reintentar } = useTema(temaId)
  const { estado, marcarLeido } = useProgress()
  const { temaVisible } = useVisibilidad()

  // Temas que entran en el examen, cuando ESTE nodo es un examen. Son los
  // únicos que obligan a traer otras lecciones, porque el banco de preguntas
  // sale de ellas; en una lección normal la lista está vacía y no cuesta nada.
  const idsDelAlcance = (tema?.alcanceExamen?.temas || []).join(',')
  const temasCargados = useCargaDeAgregado(
    async (a) => {
      const ids = idsDelAlcance ? idsDelAlcance.split(',') : []
      if (!ids.length) return []
      return (await Promise.all(ids.map((id) => a.getTemaAsync(id)))).filter(Boolean)
    },
    [idsDelAlcance]
  )

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
    // `tema` en deps: el salto al diagrama requiere el DOM de la lección montado.
  }, [temaId, ref, tema])

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (cargando) return <CargandoContenido variante="tema" />
  if (!tema) return <NotFound />
  // Un nodo de EXAMEN anuncia cuántos reactivos tiene, y esa cifra sale de las
  // lecciones de su alcance. Mientras no lleguen diría «0 preguntas», que es
  // falso. Solo espera el examen: una lección normal no tiene alcance y se
  // pinta de inmediato.
  if (tema.alcanceExamen && temasCargados === null) return <CargandoContenido variante="tema" />

  // Tema oculto para el grupo del alumno: aún no disponible.
  if (!temaVisible(tema.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Tema aún no disponible</h1>
        <p>Tu profesor todavía no libera este tema para tu grupo. Vuelve más adelante.</p>
        <Link to={`/modulo/${tema.moduloId}`} className="btn btn--pildora btn--carbon">Volver al módulo</Link>
      </div>
    )
  }

  // Vecinos SIN lecturas: salen del índice, que el shell ya tenía cargado.
  const vecinos = api.getTemaVecinos(temaId)
  const leido = estado.leidos[temaId]
  const recursos = getRecursos(temaId)
  const galeria = imagenesDeTema(temaId)
  // ¿Es el ÚLTIMO tema de su módulo? Al terminarlo, el "Siguiente" lleva
  // directo al EXAMEN del módulo (no al primer tema del módulo que sigue).
  const ultimoDeModulo = !vecinos.siguiente || vecinos.siguiente.moduloId !== tema.moduloId
  // Estado EDITORIAL (de dónde salió el material y quién respondió por él); no
  // confundir con la visibilidad por grupo que se resolvió arriba.
  const estadoEd = estadoEditorialDe(tema)
  const esEvaluacion = esNodoDeEvaluacion(tema)
  const hayContenido = muestraContenido(estadoEd) && !esEvaluacion
  // Temas que entran en este examen. La ficha muestra TODO el alcance —el
  // alumno tiene derecho a saber qué le van a preguntar— pero el banco solo
  // cuenta los temas avalados, que es la regla real del examen.
  const temasDelAlcance = (temasCargados || []).filter((t) => t && temaVisible(t.id))
  const preguntasDisponibles = bancoDeExamen(temasDelAlcance, { temaVisible }).length
  const pendientesDeValidar = temasEsperandoValidacion(temasDelAlcance, { temaVisible }).length

  return (
    <article className="tema-page" style={{ '--modulo-color': tema.moduloColor }}>
      <nav className="migas">
        <Link to="/">Inicio</Link> <span>/</span>{' '}
        <Link to={`/modulo/${tema.moduloId}`}>Modulo {tema.moduloNumero}</Link> <span>/</span>{' '}
        {tema.numero}
      </nav>

      <RevisionDocente tema={tema} />

      <header className="tema-header">
        <span className="tema-header-ico"><MedicalIcon id={tema.icono} size={34} /></span>
        <div className="tema-header-info">
          <span className="tema-header-num">Tema {tema.numero}</span>
          <h1>{tituloVisibleDe(tema)}</h1>
          {tema.tituloVisible && tema.tituloOficial && (
            <p className="tema-header-oficial">
              Título en el plan oficial: «{tema.tituloOficial}»
            </p>
          )}
          <div className="tema-header-meta">
            {tema.duracion && <span><Icon name="reloj" size={15} /> {tema.duracion}</span>}
            <span><Icon name="pregunta" size={15} /> {tema.quiz.length} preguntas</span>
            <span><Icon name="flashcards" size={15} /> {tema.flashcards.length} flashcards</span>
          </div>
        </div>
      </header>

      <AvisoEditorial estado={estadoEd} revision={tema.revision} />
      {!esEvaluacion && <CuerpoSinContenido estado={estadoEd} revision={tema.revision} />}

      {/* Un nodo de examen o de práctica no es una lección: se presenta como lo
          que es, con su alcance y sus reglas. */}
      {esEvaluacion && (
        <FichaEvaluacion
          tema={tema}
          temasDelAlcance={temasDelAlcance}
          preguntasDisponibles={preguntasDisponibles}
          pendientesDeValidar={pendientesDeValidar}
        />
      )}

      <ResumenTema resumen={tema.resumen} />
      <ObjetivosTema objetivos={tema.objetivos} />

      {recursos.length > 0 && (
        <div className="descargas">
          <h3><Icon name="libro" size={17} /> Material descargable de este tema</h3>
          <div className="descargas-grid">
            {recursos.map((r, i) => {
              const href = hrefSeguro(r.url)
              const dentro = (
                <>
                  <span className="descarga-ico"><Icon name="descarga" size={19} /></span>
                  <span className="descarga-txt">Descarga: {r.titulo}</span>
                </>
              )
              return href ? (
                <a key={i} className="descarga-btn" href={href} target="_blank" rel="noopener noreferrer">
                  {dentro}
                </a>
              ) : (
                <span key={i} className="descarga-btn enlace-roto" title="Enlace no válido">
                  {dentro}
                </span>
              )
            })}
          </div>
        </div>
      )}

      <Contenido secciones={tema.secciones} />

      {galeria.length > 0 && (
        <section className="tema-galeria">
          <h2 className="seccion-titulo"><Icon name="atlas" size={20} /> Imágenes de referencia</h2>
          <div className="tema-galeria-grid">
            {galeria.map((img) => (
              <Imagen
                key={img.clave}
                assetId={img.assetId}
                src={img.assetId ? undefined : img.src}
                ratio="4 / 3"
                caption={img.titulo}
                alt={img.alt || img.titulo}
              />
            ))}
          </div>
        </section>
      )}

      <Recursos recursos={tema.recursos} />

      <ConceptosTema conceptos={tema.conceptosClave} />

      <Actividades
        pares={tema.conceptosClave || []}
        ordenar={tema.actividades?.ordenar}
        completar={tema.actividades?.completar || []}
        preguntas={tema.actividades?.preguntas || []}
      />

      {/* Sin material no hay nada que marcar como leído ni que evaluar: ofrecer
          un quiz de cero preguntas es prometer un estudio que no existe. */}
      {hayContenido && (
        <div className="tema-acciones">
          <button
            className={`btn ${leido ? 'btn--exito' : 'btn--suave'}`}
            onClick={() => marcarLeido(temaId, !leido)}
          >
            {leido ? 'Marcado como leído' : 'Marcar como leído'}
          </button>
          {tema.quiz.length > 0 && (
            <Link to={`/tema/${temaId}/quiz`} className="btn btn--primario">
              <Icon name="matraz" size={17} /> Hacer el quiz de este tema
            </Link>
          )}
          {tema.flashcards.length > 0 && (
            <Link to={`/flashcards/${temaId}`} className="btn btn--suave">
              <Icon name="flashcards" size={17} /> Repasar flashcards
            </Link>
          )}
        </div>
      )}

      <nav className="tema-nav">
        {vecinos.anterior ? (
          <button
            className="tema-nav-btn"
            onClick={() => navigate(`/tema/${vecinos.anterior.id}`)}
          >
            <span><Icon name="chevronIzq" size={15} /> Anterior</span>
            <strong>{vecinos.anterior.numero} {vecinos.anterior.titulo}</strong>
          </button>
        ) : (
          <span />
        )}
        {ultimoDeModulo ? (
          <button
            className="tema-nav-btn derecha tema-nav-btn--examen"
            onClick={() => navigate(`/modulo/${tema.moduloId}/examen`)}
          >
            <span>Terminaste el módulo</span>
            <strong>Presentar el examen del Módulo {tema.moduloNumero}</strong>
          </button>
        ) : (
          <button
            className="tema-nav-btn derecha"
            onClick={() => navigate(`/tema/${vecinos.siguiente.id}`)}
          >
            <span>Siguiente <Icon name="chevronDer" size={15} /></span>
            <strong>{vecinos.siguiente.numero} {vecinos.siguiente.titulo}</strong>
          </button>
        )}
      </nav>
    </article>
  )
}

