import { useEffect } from 'react'
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
  // Barra superior transparente SOLO aquí. La foto del hero llega hasta arriba
  // y una barra opaca encima la cortaría en seco. Se marca el <body> en vez de
  // tocar Layout: así ninguna otra pantalla hereda el cambio, y al salir de la
  // portada la barra vuelve sola a como estaba.
  useEffect(() => {
    document.body.dataset.portada = '1'
    return () => { delete document.body.dataset.portada }
  }, [])

  return (
    <div className="lp">
      <PortadaHero />
      <CarrerasPTEM />
      <CapacidadesPTEM />
      <ComoSeVive />
      <CierrePTEM />
    </div>
  )
}

// ---------- Hero ----------
//
//  Portada a sangre: la fotografía ocupa el ancho completo y el titular va
//  encima. Sigue la referencia que dio el dueño del producto el 31-08-2026.
//
//  TRES DECISIONES QUE NO SON DECORATIVAS:
//
//   · La imagen se sirve en AVIF y WebP a cinco anchos (public/portada/), no
//     como un JPG de 2,8 MB. Es el elemento más grande de la página y el
//     primero que se descarga: a 800 px pesa 31 kB.
//   · Lleva `fetchpriority="high"` y NO `loading="lazy"`. Es el LCP de la
//     portada; diferirlo retrasaría justo lo que mide el navegador.
//   · El velo oscuro no es un efecto: sin él, el titular blanco cae sobre las
//     zonas claras de la foto —las pantallas del fondo— y deja de leerse.
const ANCHOS_FONDO = [800, 1200, 1600, 2000, 2560]
const fondoSet = (ext) => ANCHOS_FONDO
  .map((w) => `${import.meta.env.BASE_URL}portada/portada-fondo-${w}.${ext} ${w}w`)
  .join(', ')

const ANCHOS_MOCHILA = [240, 480, 720]
const mochilaSet = (ext) => ANCHOS_MOCHILA
  .map((w) => `${import.meta.env.BASE_URL}portada/mochila-${w}.${ext} ${w}w`)
  .join(', ')

function PortadaHero() {
  return (
    <header className="pf">
      <picture className="pf-fondo">
        <source type="image/avif" srcSet={fondoSet('avif')} sizes="100vw" />
        <source type="image/webp" srcSet={fondoSet('webp')} sizes="100vw" />
        <img
          src={`${import.meta.env.BASE_URL}portada/portada-fondo-1600.webp`}
          alt="Personal de urgencias médicas trabajando en una central de coordinación, con una ambulancia al fondo"
          width="3168"
          height="1344"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div className="pf-velo" aria-hidden="true" />

      <div className="pf-titular">
        <h1 className="pf-h1">
          <span className="pf-h1-a">Plataforma</span>
          <span className="pf-h1-b">
            {/* «Dedicada» va translúcida y «para» sólida, como en la referencia:
                el contraste dentro de la misma línea es lo que le da el ritmo. */}
            <span className="pf-fantasma">Dedicada</span> para
          </span>
          <span className="pf-h1-c">USTED</span>
        </h1>

        <Link to="/cuenta" className="pf-cta">
          Usar código <Icon name="flechaDiagonal" size={20} />
        </Link>
      </div>

      <div className="pf-banda">
        <div className="pf-banda-izq">
          {/* Dos líneas, y cada una entera: con un simple <br /> el navegador
              seguía partiendo «Enfocada al estudio» en cuatro trozos cuando la
              columna se estrechaba, y el lema dejaba de leerse como una frase.
              Cada línea va en su propio span que no se parte; lo que cede es el
              tamaño de letra, no la frase. */}
          <div className="pf-banda-texto">
            <p className="pf-lema">
              <span>Enfocada al estudio</span>
              <span>de la <strong>SALUD</strong></span>
            </p>
            <Link to="/terminos-y-condiciones" className="pf-legal">
              Términos y condiciones
            </Link>
          </div>
          <picture className="pf-mochila">
            <source type="image/avif" srcSet={mochilaSet('avif')} sizes="150px" />
            <source type="image/webp" srcSet={mochilaSet('webp')} sizes="150px" />
            <img
              src={`${import.meta.env.BASE_URL}portada/mochila-480.webp`}
              alt=""
              width="435"
              height="535"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        <div className="pf-banda-der">
          <IconoEstrella size={72} className="pf-banda-estrella" />
          <p>
            PTEM reúne el temario, las evaluaciones y el avance de cada alumno en un solo
            sitio. Lo usan academias de formación en urgencias médicas para dar clase con
            material propio, revisado y firmado por su cuerpo docente.
          </p>
        </div>

        <BandaAlianza />
      </div>
    </header>
  )
}

// ---------- Tercer panel de la banda: quién hace qué ----------
//
//  En un monitor ancho la banda se quedaba en dos bloques y sobraba casi medio
//  metro de azul vacío a la derecha. Este panel lo ocupa contando lo único que
//  la portada no decía todavía: que PTEM es de dos casas y cuál pone qué.
//
//  SOLO EN PANTALLA GRANDE, y no por capricho: por debajo de 1500 px la
//  columna del medio bajaría de unos 55 caracteres por línea y el párrafo que
//  explica qué es PTEM —que es el mensaje principal— quedaría troceado. Antes
//  que apretar los tres, desaparece el tercero. Va con `display: none`, así que
//  tampoco lo lee un lector de pantalla en móvil: sería el mismo contenido que
//  la sección «PTEM y R.E.S.C.A.T.E.» de más abajo, repetido.
//
//  LO QUE NO DICE, a propósito: que el cuerpo docente «ya firmó» el temario.
//  Hoy los profesores están validando y ninguna lección está publicada como
//  definitiva. Se describe el reparto de papeles, que sí es cierto hoy.
function BandaAlianza() {
  return (
    <aside className="pf-banda-alianza" aria-label="Quién está detrás de PTEM">
      <span className="pf-al-tit">Dos casas, un producto</span>

      <div className="pf-al-fila">
        <Icon name="verificado" size={18} />
        <p>
          <strong>Academia R.E.S.C.A.T.E.</strong> pone el plan de estudios oficial, el
          cuerpo docente que revisa y firma el contenido, y la formación presencial.
        </p>
      </div>

      <div className="pf-al-fila">
        <Icon name="capas" size={18} />
        <p>
          <strong>Riders.media</strong> desarrolla y mantiene PTEM: la plataforma, el
          temario en línea, las evaluaciones y el panel del maestro.
        </p>
      </div>

      <a
        href="https://rescate.pro"
        target="_blank"
        rel="noopener noreferrer"
        className="pf-al-enlace"
      >
        rescate.pro <Icon name="compartir" size={13} />
      </a>
    </aside>
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

// ---------- Cómo se vive PTEM ----------
//
//  Sustituye al bloque «PTEM y R.E.S.C.A.T.E.», que era un párrafo suelto en
//  medio de mucho blanco. La alianza no se pierde: pasa a la entradilla y al
//  enlace del final, que es donde de verdad se lee.
//
//  ESTAS VOCES NO SON TESTIMONIOS. No son reseñas que alguien haya dado, y por
//  eso no llevan nombre, foto, estrellas ni generación. Describen CÓMO SE USA
//  la plataforma, y su pie lo dice en voz alta («Así estudia…», «Así prepara…»).
//  La diferencia no es cosmética: una reseña inventada con nombre y apellido en
//  la página que capta alumnos es publicidad falsa, y el desprestigio se lo
//  come la academia, no el software.
//
//  El día que haya testimonios reales —con permiso de quien los firma— se
//  cambia este arreglo y ya: el pie pasa a ser la persona y el componente no se
//  entera. Por eso los datos viven aquí arriba y no incrustados en el JSX.
const VOCES = [
  {
    cita: 'Dejé de memorizar para empezar a entender. Cuando comprendes la razón '
      + 'detrás de un procedimiento, el conocimiento se queda para siempre.',
    pie: 'Así estudia un alumno en su primer módulo',
    tono: 'var(--primario)',
  },
  {
    cita: 'Llego a clase sabiendo exactamente quién leyó y en qué temas hay dudas. '
      + 'Mi clase se enfoca en resolver problemas reales, no en suposiciones.',
    pie: 'Así prepara su clase un docente',
    tono: 'var(--cian)',
  },
  {
    cita: 'Todo el contenido está respaldado. Reviso cada lección, verifico las '
      + 'fuentes y la firmo antes de que llegue a los alumnos.',
    pie: 'Así se valida una lección',
    tono: 'var(--verde)',
  },
  {
    cita: 'El temario se abre cuando el grupo está listo. Llevamos un ritmo '
      + 'constante para que nadie se atrase ni se adelante sin dominar las bases.',
    pie: 'Así abre el temario la academia',
    tono: 'var(--alerta)',
  },
]

function ComoSeVive() {
  return (
    <section className="pt-voces" aria-labelledby="pt-voces-t">
      {/* El hilo que serpentea detrás de las voces. Es la pieza que hace que
          esto se lea como algo dibujado y no como cuatro tarjetas alineadas:
          las voces cuelgan de él a alturas distintas. Decorativo puro, así que
          va oculto al lector de pantalla. En pantalla estrecha desaparece —con
          una sola columna no serpentea nada, solo mancha. */}
      <svg className="pt-hilo" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 0 C 18 16, 82 32, 50 50 S 18 84, 50 100" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="lp-wrap pt-voces-in">
        <div className="pt-voces-cab">
          <span className="lp-etiqueta">Alianza</span>
          <h2 id="pt-voces-t">Cómo se vive PTEM</h2>
          <p>
            El contenido académico que vive aquí es el plan de estudios oficial de{' '}
            <strong>R.E.S.C.A.T.E.</strong>, y le pertenece. La academia pone el programa,
            el cuerpo docente que lo valida y la formación presencial que ninguna pantalla
            sustituye; PTEM pone el sitio donde todo eso se estudia, se evalúa y se sigue.
            Así se reparte el día a día:
          </p>
        </div>

        <ul className="pt-voces-lista">
          {VOCES.map((v, i) => (
            <Reveal
              as="li"
              key={v.pie}
              className="pt-voz"
              delay={i * 90}
              style={{ '--tono': v.tono }}
            >
              {/* Las comillas angulares van en el texto, no en un ::before
                  decorativo: así se copian con la frase y el lector de pantalla
                  las anuncia como lo que son, una cita. */}
              <p className="pt-voz-cita">«{v.cita}»</p>
              <p className="pt-voz-pie">{v.pie}</p>
            </Reveal>
          ))}
        </ul>

        <a
          href="https://rescate.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="pt-voces-enlace"
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
