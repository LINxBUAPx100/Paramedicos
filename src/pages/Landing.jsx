import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { stats } from '../data/navIndice.js'
import { PLANES, ETIQUETA_PLAN, DESCRIPCION_PLAN } from '../lib/capacidades.js'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Contenido from '../components/Contenido.jsx'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'

// ============================================================
//  Landing pública — lo que ve quien NO tiene sesión
// ------------------------------------------------------------
//  Antes, el visitante anónimo veía EXACTAMENTE el mismo Home que un alumno:
//  el carrusel de fases, el atlas, las flashcards… y cada enlace lo estrellaba
//  contra «Únete a tu academia». Un embudo que termina en un muro.
//
//  Esta página responde a las tres preguntas que trae quien llega de fuera:
//  qué es esto, cómo se ve por dentro, y cómo entro. La tercera tiene tres
//  respuestas distintas según quién seas, y por eso el cierre tiene tres vías.
// ============================================================

// Tema real que se abre como muestra. Cardiovascular es el que mejor enseña la
// promesa del producto —comprender el porqué, no memorizar— a una audiencia de
// urgencias. Si algún día se renombra, el bloque cae con elegancia (ver DemoTema).
const TEMA_DEMO = 'cardiovascular-profundo'
// Secciones que se muestran antes de pedir cuenta. Suficiente para juzgar la
// profundidad del contenido; no tanto como para regalar el temario.
const SECCIONES_MUESTRA = 2

const HERO_ANCHOS = [480, 800, 1200, 1600]
const heroSet = (ext) =>
  HERO_ANCHOS.map((w) => `${import.meta.env.BASE_URL}hero/paramedico-${w}.${ext} ${w}w`).join(', ')

const PILARES = [
  {
    icono: 'matraz',
    titulo: 'El porqué, no el qué',
    texto:
      'Cada tema parte de la fisiología: por qué el cuerpo responde así y por qué el manejo es ese. Memorizar dosis sirve para un examen; entender el mecanismo sirve en la ambulancia.',
  },
  {
    icono: 'capas',
    titulo: 'Un recorrido, no un archivero',
    texto:
      'El temario avanza por fases, de la célula al paciente crítico. Cada academia decide qué módulos abre y cuándo, según el avance real de su grupo.',
  },
  {
    icono: 'progreso',
    titulo: 'El maestro ve el avance',
    texto:
      'Quién ha leído qué, resultados por tema y alumnos que se están quedando atrás. Sin hojas de cálculo y sin preguntar uno por uno.',
  },
]

export default function Landing() {
  return (
    <div className="lp">
      <PortadaLanding />
      <PilaresLanding />
      <DemoTema />
      <PlanesLanding />
      <CierreLanding />
    </div>
  )
}

// ---------- Portada ----------
function PortadaLanding() {
  return (
    <header className="lp-portada">
      <IconoEstrella size={620} className="lp-marca-fondo" aria-hidden="true" />
      <div className="lp-wrap lp-portada-in">
        <div className="lp-portada-texto">
          <span className="lp-kicker">
            <IconoEstrella size={16} aria-hidden="true" /> Plataforma para academias de TUM
          </span>
          <h1>
            Forma paramédicos que <em>entienden</em> lo que hacen
          </h1>
          <p className="lp-lede">
            PTEM es la plataforma de estudio de Atención Prehospitalaria y Cuidados Críticos que usa
            tu academia. Teoría, fisiología, farmacología y correlación clínica, en un recorrido
            ordenado y con el avance de cada alumno a la vista de su maestro.
          </p>
          <div className="lp-portada-acciones">
            <Link to="/cuenta" className="btn btn--pildora btn--carbon btn--lg">
              Entrar a mi academia <Icon name="flecha" size={17} />
            </Link>
            <a href="#lp-demo" className="btn btn--pildora btn--fantasma btn--lg">
              Ver el contenido por dentro
            </a>
          </div>
          <dl className="lp-cifras">
            {[
              [stats.fases, 'fases'],
              [stats.temas, 'temas'],
              [stats.preguntas, 'preguntas'],
              [stats.flashcards, 'flashcards'],
            ].map(([n, etiqueta]) => (
              <div key={etiqueta}>
                <dt>{n}</dt>
                <dd>{etiqueta}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lp-portada-foto">
          <picture>
            <source type="image/avif" srcSet={heroSet('avif')} sizes="(max-width: 900px) 80vw, 440px" />
            <source type="image/webp" srcSet={heroSet('webp')} sizes="(max-width: 900px) 80vw, 440px" />
            <img
              src={`${import.meta.env.BASE_URL}hero/paramedico-800.webp`}
              alt="Paramédico de PTEM con uniforme y estetoscopio"
              width="2000"
              height="2000"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </header>
  )
}

// ---------- Pilares ----------
function PilaresLanding() {
  return (
    <section className="lp-wrap lp-pilares" aria-label="Qué ofrece PTEM">
      {PILARES.map((p, i) => (
        <Reveal as="article" key={p.titulo} className="lp-pilar" delay={i * 90}>
          <span className="lp-pilar-ico"><Icon name={p.icono} size={22} /></span>
          <h2>{p.titulo}</h2>
          <p>{p.texto}</p>
        </Reveal>
      ))}
    </section>
  )
}

// ---------- Muestra de un tema real ----------
// El contenido completo del temario es el chunk MÁS PESADO de la app (~190 kB
// gz). Cargarlo en una página de marketing sería absurdo, así que se trae solo
// cuando esta sección entra en pantalla. Quien no baje hasta aquí no lo paga.
function DemoTema() {
  const ref = useRef(null)
  const [tema, setTema] = useState(null)
  const [estado, setEstado] = useState('espera') // espera | cargando | listo | error

  const cargar = async () => {
    if (estado === 'cargando' || estado === 'listo') return
    setEstado('cargando')
    try {
      const { getTema } = await import('../data/index.js')
      const t = getTema(TEMA_DEMO)
      // Si el tema se renombró, la landing no se rompe: la sección no se pinta.
      if (!t) { setEstado('error'); return }
      setTema(t)
      setEstado('listo')
    } catch {
      setEstado('error')
    }
  }

  // El observador solo ADELANTA la carga. El estado inicial es un botón real,
  // no un esqueleto: si el observador no llegara a dispararse (documento
  // oculto, navegador sin soporte, pestaña en segundo plano), el visitante ve
  // algo con lo que puede actuar en vez de un esqueleto atascado para siempre.
  useEffect(() => {
    const el = ref.current
    if (!el || estado !== 'espera' || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entradas) => { if (entradas.some((e) => e.isIntersecting)) { io.disconnect(); cargar() } },
      { rootMargin: '200px' } // se adelanta para que llegue cargado al leerlo
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado])

  if (estado === 'error') return null

  const secciones = (tema?.secciones || []).slice(0, SECCIONES_MUESTRA)
  const restantes = Math.max(0, (tema?.secciones?.length || 0) - SECCIONES_MUESTRA)

  return (
    <section className="lp-demo" id="lp-demo" ref={ref} aria-label="Muestra del contenido">
      <div className="lp-wrap">
        <div className="lp-demo-cabecera">
          <span className="lp-etiqueta">Tema de muestra · abierto</span>
          <h2>Así se estudia en PTEM</h2>
          <p>
            Este es un tema real del temario, tal cual lo ve un alumno. Sin recortes de marketing:
            la profundidad que ves aquí es la que hay en los {stats.temas} temas.
          </p>
        </div>

        <article className="lp-demo-tema">
          {estado === 'espera' ? (
            <div className="lp-demo-espera">
              <p>
                Anatomía y Fisiología Cardiovascular — un tema completo de la Fase 1, con sus
                secciones, diagramas y conceptos clave.
              </p>
              <button type="button" className="btn btn--pildora btn--carbon" onClick={cargar}>
                Ver el tema de muestra <Icon name="flecha" size={16} />
              </button>
            </div>
          ) : estado === 'cargando' ? (
            <div className="esqueleto" role="status" aria-busy="true">
              <span className="sr-only">Cargando el tema de muestra…</span>
              <span className="esq-linea esq-linea--titulo" aria-hidden="true" />
              <span className="esq-linea" aria-hidden="true" />
              <span className="esq-linea" aria-hidden="true" />
              <span className="esq-linea esq-linea--media" aria-hidden="true" />
              <span className="esq-bloque" aria-hidden="true" />
            </div>
          ) : (
            <>
              <header className="lp-demo-header" style={{ '--fase-color': tema.faseColor }}>
                <span className="lp-demo-ico">{tema.icono}</span>
                <div>
                  <span className="lp-demo-num">Fase {tema.faseNumero} · Tema {tema.numero}</span>
                  <h3>{tema.titulo}</h3>
                </div>
              </header>
              <p className="lp-demo-resumen">{tema.resumen}</p>
              <Contenido secciones={secciones} />
              {restantes > 0 && (
                <div className="lp-demo-corte">
                  <p>
                    <strong>Quedan {restantes} secciones de este tema</strong>, más sus conceptos
                    clave, flashcards y preguntas de repaso.
                  </p>
                  <Link to="/cuenta" className="btn btn--pildora btn--carbon">
                    Entrar con mi código <Icon name="flecha" size={16} />
                  </Link>
                </div>
              )}
            </>
          )}
        </article>
      </div>
    </section>
  )
}

// ---------- Planes ----------
// Los textos salen de capacidades.js, que ya es la fuente de verdad de qué
// incluye cada plan. Duplicarlos aquí garantizaría que algún día mientan.
function PlanesLanding() {
  return (
    <section className="lp-wrap lp-planes" aria-label="Planes para academias">
      <div className="lp-demo-cabecera">
        <span className="lp-etiqueta">Para academias</span>
        <h2>Un plan según lo que necesites</h2>
      </div>
      <div className="lp-planes-grid">
        {PLANES.map((p, i) => (
          <Reveal as="article" key={p} className={`lp-plan ${p === 'pro' ? 'lp-plan--destacado' : ''}`} delay={i * 90}>
            {p === 'pro' && <span className="lp-plan-cinta">El más completo</span>}
            <h3>{ETIQUETA_PLAN[p]}</h3>
            <p>{DESCRIPCION_PLAN[p]}</p>
          </Reveal>
        ))}
      </div>
      <p className="lp-planes-pie">
        ¿No sabes cuál te toca? Tu academia ya lo tiene contratado: pídele tu código de acceso.
      </p>
    </section>
  )
}

// ---------- Cierre: tres vías, porque llegan tres personas distintas ----------
function CierreLanding() {
  return (
    <section className="lp-cierre" aria-label="Cómo entrar">
      <div className="lp-wrap lp-cierre-grid">
        <article className="lp-via">
          <span className="lp-via-ico"><Icon name="usuario" size={20} /></span>
          <h3>Ya tengo cuenta</h3>
          <p>Entra y sigue donde lo dejaste.</p>
          <Link to="/cuenta" className="btn btn--pildora btn--carbon">Iniciar sesión</Link>
        </article>
        <article className="lp-via">
          <span className="lp-via-ico"><Icon name="pildora" size={20} /></span>
          <h3>Tengo un código</h3>
          <p>Tu academia te dio un código al inscribirte. Con él creas tu cuenta y entras.</p>
          <Link to="/cuenta" className="btn btn--pildora btn--fantasma">Usar mi código</Link>
        </article>
        <article className="lp-via">
          <span className="lp-via-ico"><Icon name="temario" size={20} /></span>
          <h3>Soy una academia</h3>
          <p>Quiero PTEM para mis alumnos y llevar su avance desde un solo panel.</p>
          {/* WhatsApp de Riders.Media con el mensaje ya escrito: quien llega
              aquí quiere preguntar, no redactar. `wa.me` necesita el número sin
              espacios ni signos, con lada de país. */}
          <a
            href="https://wa.me/522202256586?text=Hola%2C%20quiero%20PTEM%20para%20mi%20academia."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--pildora btn--fantasma"
          >
            <Icon name="chispa" size={16} /> Hablar por WhatsApp
          </a>
        </article>
      </div>
    </section>
  )
}
