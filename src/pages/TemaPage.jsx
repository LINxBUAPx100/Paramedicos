import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
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
import RitmoRCP from '../components/RitmoRCP.jsx'
import { tieneRitmo } from '../lib/ritmoRCP.js'
import AvisoEditorial, { CuerpoSinContenido } from '../components/AvisoEditorial.jsx'
import FichaEvaluacion from '../components/FichaEvaluacion.jsx'
import RevisionDocente from '../components/RevisionDocente.jsx'
import { estadoEditorialDe, muestraContenido, esNodoDeEvaluacion } from '../lib/estadoEditorial.js'
import { bancoDeExamen, temasEsperandoValidacion } from '../lib/bancoExamen.js'
import { tituloVisibleDe } from '../data/contenido/titulosVisibles.js'
import NotFound from './NotFound.jsx'
import MonitorLeccion from '../components/pulso/MonitorLeccion.jsx'
import PracticaLeccion, { ANCLA_PRACTICA } from '../components/pulso/PracticaLeccion.jsx'
import CierreLeccion from '../components/pulso/CierreLeccion.jsx'
import { ProveedorFarmacosEnLeccion } from '../components/pulso/FarmacosEnTexto.jsx'
import { dominioDeTema, claveTarjeta } from '../lib/pulsoModelo.js'

// El catálogo de fármacos viaja aparte: la lección no lo necesita para pintarse.
const FarmacosDelTema = lazy(() => import('../components/FarmacosDelTema.jsx'))

export default function TemaPage() {
  const { temaId } = useParams()
  const [searchParams] = useSearchParams()
  const ref = searchParams.get('ref') // clave de imagen del Atlas a la que saltar
  const navigate = useNavigate()
  // Contenido de LA ACADEMIA del usuario (resolutor: Firestore o bundle).
  // Se pide SOLO esta lección: antes se bajaba el curso entero para leer una.
  const { tema, api, cargando, error, reintentar } = useTema(temaId)
  const { estado, marcarLeido, registrarAplicada } = useProgress()
  const [cierreAbierto, setCierreAbierto] = useState(false)
  useEffect(() => { setCierreAbierto(false) }, [temaId])
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

  // Tema oculto para el grupo del alumno: aún no disponible.
  //
  // ANTES de mirar si la lección llegó (R03, 25-09-2026): la de un módulo
  // cerrado ya no se descarga —las reglas la niegan y el cliente ni la pide—,
  // así que `tema` llega en null. Comprobarlo después pintaría «no existe»,
  // que es falso; la visibilidad sale del índice y no necesita la lección.
  if (!temaVisible(temaId)) {
    const moduloId = tema?.moduloId || api?.getTemaLigero?.(temaId)?.moduloId
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Tema aún no disponible</h1>
        <p>Tu profesor todavía no libera este tema para tu grupo. Vuelve más adelante.</p>
        <Link to={moduloId ? `/modulo/${moduloId}` : '/temario'} className="btn btn--pildora btn--carbon">Volver al módulo</Link>
      </div>
    )
  }
  if (!tema) return <NotFound />
  // Un nodo de EXAMEN anuncia cuántos reactivos tiene, y esa cifra sale de las
  // lecciones de su alcance. Mientras no lleguen diría «0 preguntas», que es
  // falso. Solo espera el examen: una lección normal no tiene alcance y se
  // pinta de inmediato.
  if (tema.alcanceExamen && temasCargados === null) return <CargandoContenido variante="tema" />

  // Vecinos SIN lecturas: salen del índice, que el shell ya tenía cargado.
  const vecinos = api.getTemaVecinos(temaId)
  const leido = estado.leidos[temaId]
  const recursos = getRecursos(temaId)
  const galeria = imagenesDeTema(temaId)
  // ¿Es el ÚLTIMO tema de su módulo? Al terminarlo, el "Siguiente" lleva
  // directo al EXAMEN del módulo (no al primer tema del módulo que sigue).
  const ultimoDeModulo = !vecinos.siguiente || vecinos.siguiente.moduloId !== tema.moduloId
  // Siguiente parada de la ruta: el tema que sigue en el plan o, al final del
  // módulo, su examen (la misma regla que la navegación de abajo).
  const siguienteParada = ultimoDeModulo
    ? { titulo: `Examen del Módulo ${tema.moduloNumero}`, ruta: `/modulo/${tema.moduloId}/examen` }
    : { titulo: `${vecinos.siguiente.numero} ${vecinos.siguiente.titulo}`, ruta: `/tema/${vecinos.siguiente.id}` }
  // Dominio de ESTUDIO del tema (PTEM Pulso): leído → quiz → actividades →
  // tarjetas consolidadas. No es competencia clínica.
  const nivel = dominioDeTema({
    leido: Boolean(leido),
    quiz: estado.quizzes[temaId],
    aplicada: estado.aplicadas?.[temaId],
    tarjetas: (tema.flashcards || []).map((f) => estado.srs?.[claveTarjeta(temaId, f.frente)]).filter(Boolean),
  })
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
      <RevisionDocente tema={tema} />
      {hayContenido && <>
        <div className="ui-atajos">
          {tema.quiz.length > 0 && (
            // El quiz vive ahora al final de la lección (PTEM Pulso): el atajo
            // baja hasta él en vez de sacar al alumno a otra página.
            <button
              type="button"
              className="btn btn--primario"
              onClick={() => {
                const el = document.getElementById(ANCLA_PRACTICA)
                el?.focus({ preventScroll: true })
                el?.scrollIntoView({ block: 'start', behavior: 'smooth' })
              }}
            >
              Ir a la práctica
            </button>
          )}
          {tema.flashcards.length > 0 && <Link className="btn btn--suave" to={`/flashcards/${temaId}`}>Repasar flashcards</Link>}
        </div>
        {/* El monitor de PTEM Pulso: índice, latidos por sección y posición
            de lectura para «Reanudar». Lleva dentro el índice de siempre. */}
        <MonitorLeccion temaId={temaId} titulo={tituloVisibleDe(tema)} secciones={tema.secciones} nivel={nivel} />
      </>}
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

      {/* Los fármacos que el catálogo liga a esta lección se marcan en el texto. */}
      <ProveedorFarmacosEnLeccion temaId={temaId}>
        <Contenido secciones={tema.secciones} temaId={hayContenido ? temaId : null} />
      </ProveedorFarmacosEnLeccion>

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

      {/* EL RITMO DE COMPRESIONES, solo en los temas donde se practica (ver la
          lista en lib/ritmoRCP.js). Va DESPUÉS del contenido y antes de las
          actividades: primero se lee cómo se hace, después se practica. */}
      {tieneRitmo(temaId) && <RitmoRCP />}

      <Recursos recursos={tema.recursos} />

      <Suspense fallback={null}><FarmacosDelTema temaId={temaId} /></Suspense>

      <ConceptosTema conceptos={tema.conceptosClave} />

      <Actividades
        pares={tema.conceptosClave || []}
        ordenar={tema.actividades?.ordenar}
        completar={tema.actividades?.completar || []}
        preguntas={tema.actividades?.preguntas || []}
        onCompletar={(aciertos, total) => registrarAplicada(temaId, aciertos, total)}
      />

      {/* El quiz del tema, dentro de la lección (PTEM Pulso). */}
      {hayContenido && tema.quiz.length > 0 && <PracticaLeccion tema={tema} />}

      {/* Sin material no hay nada que marcar como leído ni que evaluar: ofrecer
          un quiz de cero preguntas es prometer un estudio que no existe. */}
      {hayContenido && (
        <div className="tema-acciones">
          {/* «Terminar lección» es la misma marca de leído de siempre, más
              la pantalla de cierre con la siguiente parada. Desmarcar sigue
              siendo posible. */}
          {leido ? (
            <button className="btn btn--exito" onClick={() => marcarLeido(temaId, false)}>
              Marcado como leído
            </button>
          ) : (
            <button
              className="btn btn--reanudar pl-sin-icono"
              onClick={() => { marcarLeido(temaId, true); setCierreAbierto(true) }}
            >
              Terminar lección
            </button>
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

      {cierreAbierto && (
        <CierreLeccion
          nivel={nivel}
          preguntas={tema.quiz.length}
          siguiente={siguienteParada}
          onIr={() => { setCierreAbierto(false); navigate(siguienteParada.ruta) }}
          onCerrar={() => setCierreAbierto(false)}
        />
      )}
    </article>
  )
}

