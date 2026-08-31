import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'
import CarrerasCarrusel from '../components/CarrerasCarrusel.jsx'
import { carrerasPublicas, enlaceWhatsapp } from '../lib/carrerasModelo.js'

// ============================================================
//  Portada general de PTEM — la raíz para quien llega de fuera
// ------------------------------------------------------------
//  Hasta el 30 de agosto de 2026 la raíz era la portada de PARAMÉDICOS: quien
//  entraba a PTEM veía «Forma paramédicos que entienden lo que hacen» y las
//  cifras del temario de R.E.S.C.A.T.E. Eso dejó de ser cierto en cuanto la
//  academia declaró seis carreras.
//
//  Ahora la raíz responde qué es PTEM y a dónde va cada quien; la portada de
//  paramédicos conserva su contenido íntegro en `/paramedicos`, que es la
//  dirección que se comparte de ahora en adelante.
//
//  LO QUE ESTA PÁGINA NO HACE: prometer temario de las carreras que no lo
//  tienen. Las tarjetas leen su estado del catálogo y una carrera en
//  preparación lo dice en su propia tarjeta. Ver `lib/carrerasModelo.js`.
// ============================================================

const CAPACIDADES = [
  {
    icono: 'libro',
    titulo: 'Estudiar con el porqué delante',
    texto:
      'Cada tema parte de la fisiología: por qué el cuerpo responde así y por qué '
      + 'el manejo es ese. Con quiz, flashcards y exámenes por unidad.',
  },
  {
    icono: 'progreso',
    titulo: 'Ver el avance de cada grupo',
    texto:
      'El maestro sabe quién ha leído qué, cómo salió en cada tema y quién se '
      + 'está quedando atrás. Sin hojas de cálculo y sin preguntar uno por uno.',
  },
  {
    icono: 'verificado',
    titulo: 'Publicar solo lo que un docente firmó',
    texto:
      'Ninguna lección llega al alumno como definitiva hasta que un docente la '
      + 'valida con su nombre y sus fuentes. Lo que está en revisión, lo dice.',
  },
  {
    icono: 'capas',
    titulo: 'Abrir el temario a su ritmo',
    texto:
      'La academia decide qué módulos abre y cuándo, según el avance real del '
      + 'grupo. El plan no se le adelanta a nadie.',
  },
]

export default function PortadaPTEM() {
  return (
    <div className="lp">
      <PortadaHero />
      <CarrerasPTEM />
      <CapacidadesPTEM />
      <AliadoRescate />
      <CierrePTEM />
    </div>
  )
}

// ---------- Hero ----------
function PortadaHero() {
  return (
    <header className="lp-portada pt-portada">
      <IconoEstrella size={620} className="lp-marca-fondo" aria-hidden="true" />
      <div className="lp-wrap pt-portada-in">
        <span className="lp-kicker">Plataforma de Estudio · Urgencias Médicas</span>
        <h1>
          La plataforma donde tu academia <em>enseña</em> y tú estudias
        </h1>
        <p className="lp-lede pt-lede">
          PTEM reúne el temario, las evaluaciones y el avance de cada alumno en un solo
          sitio. Lo usan academias de formación en urgencias médicas para dar clase con
          material propio, revisado y firmado por su cuerpo docente.
        </p>
        <div className="lp-portada-acciones">
          <Link to="/paramedicos" className="btn btn--pildora btn--carbon btn--lg">
            Ver la carrera de paramédicos <Icon name="flecha" size={17} />
          </Link>
          <Link to="/cuenta" className="btn btn--pildora btn--fantasma btn--lg">
            Entrar con mi código
          </Link>
        </div>
      </div>
    </header>
  )
}

// ---------- Carreras ----------
function CarrerasPTEM() {
  const carreras = carrerasPublicas()
  return (
    <section className="pt-seccion" aria-labelledby="pt-carreras">
      <div className="lp-wrap">
        <div className="pt-cabecera">
          <h2 id="pt-carreras">Las carreras que se imparten</h2>
          <p>
            Cada carrera tiene su propia página. La de paramédicos ya está completa en la
            plataforma; el resto está en preparación y su tarjeta lo dice.
          </p>
        </div>
        <CarrerasCarrusel carreras={carreras} />
      </div>
    </section>
  )
}

// ---------- Qué se puede hacer ----------
function CapacidadesPTEM() {
  return (
    <section className="pt-seccion pt-seccion--alt" aria-labelledby="pt-capacidades">
      <div className="lp-wrap">
        <div className="pt-cabecera">
          <h2 id="pt-capacidades">Qué se puede hacer aquí</h2>
        </div>
        <div className="pt-capacidades">
          {CAPACIDADES.map((c, i) => (
            <Reveal as="article" key={c.titulo} className="lp-pilar" delay={i * 70}>
              <span className="lp-pilar-ico"><Icon name={c.icono} size={22} /></span>
              <h3>{c.titulo}</h3>
              <p>{c.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Alianza ----------
function AliadoRescate() {
  return (
    <section className="pt-aliado" aria-labelledby="pt-aliado-t">
      <div className="lp-wrap pt-aliado-in">
        <span className="lp-etiqueta">Alianza</span>
        <h2 id="pt-aliado-t">PTEM y R.E.S.C.A.T.E.</h2>
        <p>
          El contenido académico que hoy vive en PTEM es el plan de estudios oficial de
          <strong> R.E.S.C.A.T.E.</strong>, y le pertenece. PTEM pone la plataforma: el
          temario, las evaluaciones, el control de grupos y el panel del maestro. La
          academia pone el programa, el cuerpo docente que lo valida y la formación
          presencial que ninguna pantalla sustituye.
        </p>
        <a
          href="https://rescate.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--pildora btn--fantasma"
        >
          Conocer R.E.S.C.A.T.E. <Icon name="compartir" size={15} />
        </a>
      </div>
    </section>
  )
}

// ---------- Cierre ----------
function CierrePTEM() {
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
          <a
            href={enlaceWhatsapp('Hola, quiero PTEM para mi academia.')}
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
