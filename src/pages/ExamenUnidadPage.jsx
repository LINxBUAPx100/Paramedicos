import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  useTema, useCargaDeAgregado, CargandoContenido, ErrorContenido,
} from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { bancoDeExamen, motivoExamenInactivo } from '../lib/bancoExamen.js'
import { seleccionarPreguntas, temasCubiertos } from '../lib/examenModelo.js'
import { nuevaSemilla } from '../lib/azar.js'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'

// ============================================================
//  Examen de UNIDAD del plan (1er examen, parcial, examen final)
// ------------------------------------------------------------
//  El plan oficial coloca exámenes DENTRO de cada módulo, no solo al final:
//  el Módulo 2 tiene uno tras la unidad 1, otro tras la 3 y el final al
//  cerrar. El examen de módulo que ya existía preguntaba el módulo entero, así
//  que un parcial habría evaluado temas que el grupo aún no ha visto.
//
//  Aquí el banco se arma con `tema.alcanceExamen`, que el generador calcula
//  desde la posición de la unidad en el plan. No hay forma de que la pantalla
//  y el temario se desincronicen: si el plan cambia, el alcance se regenera.
//
//  Es una AUTOEVALUACIÓN: no guarda intento en Firestore. La calificación
//  oficial la define la academia, que todavía no ha fijado nota de corte ni
//  número de reactivos (ver los pendientes de la ficha del examen).
// ============================================================

export default function ExamenUnidadPage() {
  const { temaId } = useParams()
  const { tema, cargando, error, reintentar } = useTema(temaId)
  const { temaVisible } = useVisibilidad()
  const [iniciado, setIniciado] = useState(false)
  const [semilla, setSemilla] = useState(() => nuevaSemilla(temaId))

  // Temas del alcance ya resueltos. La regla de qué aporta reactivos vive en
  // src/lib/bancoExamen.js y es una sola: `validado` o `publicado`.
  // Las lecciones del alcance son las únicas otras que hay que traer: de
  // ellas sale el banco de reactivos.
  const idsDelAlcance = (tema?.alcanceExamen?.temas || []).join(',')
  const cargados = useCargaDeAgregado(
    async (a) => {
      const ids = idsDelAlcance ? idsDelAlcance.split(',') : []
      if (!ids.length) return []
      return (await Promise.all(ids.map((id) => a.getTemaAsync(id)))).filter(Boolean)
    },
    [idsDelAlcance]
  )
  const temasDelAlcance = useMemo(() => cargados || [], [cargados])

  const banco = useMemo(
    () => bancoDeExamen(temasDelAlcance, { temaVisible }),
    [temasDelAlcance, temaVisible]
  )
  const inactivo = useMemo(
    () => motivoExamenInactivo(temasDelAlcance, { temaVisible }),
    [temasDelAlcance, temaVisible]
  )

  const preguntas = useMemo(() => seleccionarPreguntas(banco, { semilla }), [banco, semilla])

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (cargando) return <CargandoContenido />
  if (!tema || !tema.alcanceExamen) return <NotFound />
  // Hay que esperar también a las lecciones del alcance, no solo a esta página.
  // Sin esto, el banco está vacío durante un instante y la pantalla anuncia
  // «este examen no tiene reactivos», que es falso y desconcierta al alumno.
  if (cargados === null) return <CargandoContenido />

  const otroIntento = () => setSemilla(nuevaSemilla(`${temaId}-${Date.now()}`))

  return (
    <div className="examen-page" style={{ '--modulo-color': tema.moduloColor }}>
      <nav className="migas">
        <Link to={`/modulo/${tema.moduloId}`}>Modulo {tema.moduloNumero}</Link> <span>/</span>{' '}
        <Link to={`/tema/${tema.id}`}>{tema.titulo}</Link>
      </nav>

      {inactivo ? (
        <div className="examen-modulo-intro">
          <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
          <h1>{tema.evaluacion?.titulo || tema.titulo}</h1>
          <p>{inactivo.texto}</p>
          <Link to={`/tema/${tema.id}`} className="btn btn--suave"><Icon name="chevronIzq" size={15} /> Volver a la ficha del examen</Link>
        </div>
      ) : !iniciado ? (
        <div className="examen-modulo-intro">
          <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
          <h1>{tema.evaluacion?.titulo || tema.titulo}</h1>
          <p>
            {preguntas.length} preguntas escogidas de las {banco.length} disponibles, repartidas
            entre los {temasCubiertos(preguntas)} temas que entran en este examen según el plan.
          </p>
          <p className="examen-nota-autoeval">
            Es una <strong>autoevaluación</strong> para saber qué repasar. La academia todavía no
            ha fijado la calificación mínima ni el número oficial de reactivos.
          </p>
          <button className="btn btn--primario btn--lg" onClick={() => setIniciado(true)}>
            Comenzar ({preguntas.length} preguntas)
          </button>
          <Link to={`/tema/${tema.id}`} className="link-discreto"><Icon name="chevronIzq" size={15} /> Volver a la ficha del examen</Link>
        </div>
      ) : (
        <>
          <header className="quiz-page-header">
            <h1>
              <span className="quiz-page-ico"><Icon name="examen" size={24} /></span>
              {tema.evaluacion?.titulo || tema.titulo}
            </h1>
            <p>Modulo {tema.moduloNumero} · {tema.moduloTitulo}</p>
          </header>

          <Quiz
            key={semilla}
            preguntas={preguntas}
            titulo={tema.evaluacion?.titulo || tema.titulo}
            semilla={semilla}
            onReintentar={otroIntento}
          />

          <div className="quiz-page-pie">
            <button type="button" className="btn btn--suave" onClick={otroIntento}>Otro intento</button>
            <Link to={`/modulo/${tema.moduloId}`} className="btn btn--suave"><Icon name="chevronIzq" size={15} /> Volver al módulo</Link>
          </div>
        </>
      )}
    </div>
  )
}
