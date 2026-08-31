import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import NotFound from './NotFound.jsx'
import {
  carreraPorSlug, estiloDeCarrera, contactoDeCarrera, carrerasAbiertas,
  rutaDeCarrera,
} from '../lib/carrerasModelo.js'

// ============================================================
//  Vitrina de una carrera — la misma página para todas
// ------------------------------------------------------------
//  Cinco carreras, una sola página. El contenido sale del catálogo
//  (`lib/carrerasModelo.js`), así que añadir una carrera nueva no crea un
//  archivo: crea una entrada.
//
//  ES UNA VITRINA, NO UN TEMARIO. Dice qué es la profesión y en qué punto está
//  su material dentro de PTEM. No enumera módulos, no promete horas y no
//  inventa un plan de estudios: eso lo define la academia, y mientras no lo
//  haya definido, la página lo dice con todas sus letras. La prueba
//  `carrerasModelo.test.mjs` impide que se cuele una promesa curricular.
//
//  Un slug desconocido cae en NotFound. La ruta se genera desde el catálogo,
//  así que en la práctica no ocurre; está por si alguien enlaza a mano.
// ============================================================

export default function CarreraPage({ slug }) {
  const carrera = carreraPorSlug(slug)
  if (!carrera) return <NotFound />

  const { color, icono, etiquetaTipo } = estiloDeCarrera(carrera)

  return (
    <div className="lp vt" style={{ '--carrera-color': color }}>
      <header className="vt-portada">
        <div className="lp-wrap vt-portada-in">
          <span className="vt-tipo">
            <Icon name={icono} size={16} /> {etiquetaTipo}
          </span>
          <h1>{carrera.titular}</h1>
          <p className="lp-lede">{carrera.resumen}</p>
          <EstadoDeCarrera carrera={carrera} />
        </div>
      </header>

      <section className="vt-cuerpo" aria-labelledby="vt-que-es">
        <div className="lp-wrap vt-cuerpo-in">
          <Reveal as="article" className="vt-bloque">
            <h2 id="vt-que-es">Qué hace un profesional de {carrera.nombreCorto}</h2>
            <p>{carrera.queEs}</p>
          </Reveal>

          <Reveal as="article" className="vt-bloque" delay={90}>
            <h2>En qué punto está</h2>
            <ul className="vt-puntos">
              {carrera.puntos.map((p) => (
                <li key={p}>
                  <Icon name="check" size={16} aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CierreCarrera carrera={carrera} />
    </div>
  )
}

// ---------- El estado, dicho sin rodeos ----------
// Es lo primero que necesita saber quien llega: ¿puedo estudiar esto hoy?
function EstadoDeCarrera({ carrera }) {
  if (carrera.estado === 'abierta') {
    return (
      <div className="vt-acciones">
        <Link to="/cuenta" className="btn btn--pildora btn--carbon btn--lg">
          Entrar con mi código <Icon name="flecha" size={17} />
        </Link>
      </div>
    )
  }
  return (
    <div className="vt-aviso" role="note">
      <span className="vt-aviso-ico"><Icon name="reloj" size={20} /></span>
      <div>
        <strong>Todavía no está en la plataforma.</strong>
        <p>
          La academia imparte esta formación, pero su temario aún no se ha cargado en
          PTEM. No hay fecha comprometida: cuando la haya, esta página lo dirá.
        </p>
      </div>
    </div>
  )
}

// ---------- Cierre ----------
function CierreCarrera({ carrera }) {
  // A quien le interesa una carrera que aún no está, se le ofrece la que sí
  // está: es lo único que puede estudiar hoy, y decirlo es más útil que dejarlo
  // en una página sin salida.
  const abiertas = carrerasAbiertas().filter((c) => c.slug !== carrera.slug)
  return (
    <section className="lp-cierre" aria-label="Siguiente paso">
      <div className="lp-wrap lp-cierre-grid">
        <article className="lp-via">
          <span className="lp-via-ico"><Icon name="chispa" size={20} /></span>
          <h3>Preguntar por esta carrera</h3>
          <p>
            {carrera.estado === 'abierta'
              ? 'Resuelve tus dudas de inscripción con la academia.'
              : 'Pregunta a la academia cuándo abre y cómo apartar tu lugar.'}
          </p>
          <a
            href={contactoDeCarrera(carrera)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--pildora btn--carbon"
          >
            Hablar por WhatsApp
          </a>
        </article>

        {abiertas.map((c) => (
          <article className="lp-via" key={c.slug}>
            <span className="lp-via-ico"><Icon name="libro" size={20} /></span>
            <h3>Lo que sí puedes estudiar hoy</h3>
            <p>{c.nombre} está completa en la plataforma.</p>
            <Link to={rutaDeCarrera(c)} className="btn btn--pildora btn--fantasma">
              Ver {c.nombreCorto}
            </Link>
          </article>
        ))}

        <article className="lp-via">
          <span className="lp-via-ico"><Icon name="home" size={20} /></span>
          <h3>Ver todas las carreras</h3>
          <p>Qué más imparte la academia y qué hay disponible en PTEM.</p>
          <Link to="/" className="btn btn--pildora btn--fantasma">Ir al inicio</Link>
        </article>
      </div>
    </section>
  )
}
