import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { stats } from '../data/navIndice.js'
import Icon from '../components/Icon.jsx'
import MedicalIcon from '../components/MedicalIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import Contenido from '../components/Contenido.jsx'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'

// ============================================================
//  Landing pública — lo que ve quien NO tiene sesión
// ------------------------------------------------------------
//  Antes, el visitante anónimo veía EXACTAMENTE el mismo Home que un alumno:
//  el carrusel de módulos, el atlas, las flashcards… y cada enlace lo estrellaba
//  contra «Únete a tu academia». Un embudo que termina en un muro.
//
//  Esta página responde a las tres preguntas que trae quien llega de fuera:
//  qué es esto, cómo se ve por dentro, y cómo entro. La tercera tiene tres
//  respuestas distintas según quién seas, y por eso el cierre tiene tres vías.
// ============================================================

// Tema real que se abre como muestra. Cardiovascular es el que mejor enseña la
// promesa del producto —comprender el porqué, no memorizar— a una audiencia de
// urgencias. Si algún día se renombra, el bloque cae con elegancia (ver DemoTema).
// Tema de muestra de la portada. Apuntaba a `cardiovascular-profundo`, un id del
// temario ANTERIOR: desapareció al adoptar el plan oficial de 287 temas y desde
// entonces `getTema` devolvía undefined, el estado pasaba a 'error' y la sección
// entera no se pintaba. Un visitante sin sesión no veía ninguna muestra del
// contenido y nada fallaba de forma visible. Es el mismo asunto —anatomía y
// fisiología cardiovascular— en su id vigente.
const TEMA_DEMO = 'm2-afi-cardiovascular'
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
      'El temario avanza por módulos, de la célula al paciente crítico. Cada academia decide qué módulos abre y cuándo, según el avance real de su grupo.',
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
            {/* Mismo motivo que en Logros: con HashRouter un href="#lp-demo"
                cambia la RUTA y el visitante acaba en un 404 en vez de bajar a
                la muestra. El salto se hace a mano. */}
            <button
              type="button"
              className="btn btn--pildora btn--fantasma btn--lg"
              onClick={() => {
                document.getElementById('lp-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              Ver el contenido por dentro
            </button>
          </div>
          <dl className="lp-cifras">
            {[
              [stats.modulos, 'módulos'],
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
                Sistema cardiovascular — un tema completo del Módulo 2, con sus secciones,
                diagramas y conceptos clave.
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
              <header className="lp-demo-header" style={{ '--modulo-color': tema.moduloColor }}>
                <span className="lp-demo-ico"><MedicalIcon id={tema.icono} size={30} /></span>
                <div>
                  <span className="lp-demo-num">Modulo {tema.moduloNumero} · Tema {tema.numero}</span>
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

// La portada tenía aquí una sección «Un plan según lo que necesites» con las
// tres tarjetas de plan comercial. Se retiró a petición del dueño el 30 de
// agosto de 2026: quien llega a la portada es un alumno con un código, y el
// plan lo contrata la academia, no él. Los planes siguen viviendo en
// `lib/capacidades.js`, que es su fuente de verdad, y se enseñan donde se
// deciden: el panel del director y la consola del super-admin.

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
