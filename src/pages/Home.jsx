import { Link } from 'react-router-dom'
import { fases, stats } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Imagen from '../components/Imagen.jsx'
import Contador from '../components/Contador.jsx'
import FasesCarrusel from '../components/FasesCarrusel.jsx'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'
import { IMG } from '../data/imagenes.js'

const STATS = [
  { key: 'fases', label: 'Fases' },
  { key: 'temas', label: 'Temas' },
  { key: 'flashcards', label: 'FlashCards' },
  { key: 'preguntas', label: 'Preguntas' },
]

export default function Home() {
  const { estado } = useProgress()
  const leidos = estado.leidos
  const temasLeidos = Object.values(leidos).filter(Boolean).length
  const progresoGlobal = Math.round((temasLeidos / stats.temas) * 100)

  return (
    <div className="ph">
      {/* ===== HERO ===== */}
      <section className="ph-hero">
        <IconoEstrella size={680} className="ph-hero-marca" />
        <div className="ph-wrap ph-hero-in">
          <div className="ph-hero-foto reveal" style={{ '--d': '120ms' }}>
            <Imagen
              src={IMG.heroParamedico}
              ratio="1 / 1"
              eager
              figura
              alt="Paramédico"
              busqueda="paramédico uniforme rojo botiquín"
            />
          </div>
          <div className="ph-hero-texto">
            <span className="ph-eyebrow reveal" style={{ '--d': '40ms' }}>
            </span>
            <h1 className="ph-wordmark" aria-label="PTUM">
              {['P', 'T', 'U', 'M'].map((l, i) => (
                <span key={i} className="ph-wm-l" style={{ '--i': i }}>
                  {l}
                </span>
              ))}
            </h1>
            <p className="ph-hero-sub reveal" style={{ '--d': '320ms' }}>
              Técnico en Urgencias Médicas. Aprende a <strong>comprender el porqué</strong>, no solo a
              memorizar: teoría, fisiología, farmacología y correlación clínica de verdad.
            </p>
            <div className="ph-hero-cta reveal" style={{ '--d': '420ms' }}>
              <Link to="/fase/fase-1" className="btn-pildora btn-pildora--solido">
                <Icon name="libro" size={18} /> Empezar a estudiar
              </Link>
              <Link to="/examen" className="btn-pildora btn-pildora--urgencia">
                <Icon name="examen" size={18} /> Ponerme a prueba
              </Link>
            </div>
            <div className="ph-stats">
              {STATS.map((s, i) => (
                <div className="ph-stat reveal" key={s.key} style={{ '--d': `${500 + i * 80}ms` }}>
                  <b className="ph-stat-num">
                    <Contador valor={stats[s.key]} />
                  </b>
                  <span className="ph-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Progreso (si ya hay temas leídos) ===== */}
      {temasLeidos > 0 && (
        <div className="ph-wrap">
          <Reveal as="section" className="ph-progreso">
            <div className="ph-progreso-info">
              <strong>Tu progreso</strong>
              <span>
                {temasLeidos} de {stats.temas} temas · {progresoGlobal}%
              </span>
            </div>
            <div className="ph-progreso-barra">
              <span style={{ width: `${progresoGlobal}%` }} />
            </div>
            <Link to="/progreso" className="ph-link">
              Ver detalle <Icon name="chevronDer" size={15} />
            </Link>
          </Reveal>
        </div>
      )}

      {/* ===== FASES (carrusel) ===== */}
      <section className="ph-fases">
        <div className="ph-wrap">
          <Reveal as="h2" className="ph-h2">
            <IconoEstrella size={26} /> Fases
          </Reveal>
          <Reveal as="p" className="ph-h2-sub" delay={70}>
            Siete fases progresivas, del fundamento celular a la farmacología avanzada, el marco
            normativo y las operaciones especiales.
          </Reveal>
        </div>
        <FasesCarrusel fases={fases} leidos={leidos} />
      </section>

      {/* ===== PONTE A PRUEBA ===== */}
      <Reveal as="section" className="ph-banda ph-prueba">
        <div className="ph-wrap ph-banda-in">
          <div className="ph-banda-img">
            <Imagen src={IMG.ponteAprueba} ratio="4 / 3" figura busqueda="examen test checklist bolígrafo" />
          </div>
          <div className="ph-banda-texto">
            <h2 className="ph-titular">
              Ponte <span className="ac">a</span> Prueba
            </h2>
            <p>
              Quiz al final de cada tema y un examen general aleatorio que mezcla las 7 fases, con
              explicación de cada respuesta para que aprendas del error.
            </p>
            <Link to="/examen" className="btn-pildora btn-pildora--urgencia btn-grande-p">
              Iniciar Test <Icon name="chevronDer" size={18} />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ===== CONSULTA EL ATLAS ===== */}
      <Reveal as="section" className="ph-banda ph-atlas">
        <div className="ph-wrap ph-banda-in ph-banda-in--rev">
          <div className="ph-banda-texto">
            <h2 className="ph-titular">
              Consulta nuestro <span className="ac">Atlas</span>
            </h2>
            <p>
              Mapas anatómicos y fisiológicos con imágenes reales: corazón, circulación, vía aérea,
              nefrona, sistema nervioso y más, como referencia rápida mientras estudias.
            </p>
            <Link to="/atlas" className="btn-pildora btn-pildora--oscuro btn-grande-p">
              Consultar <Icon name="chevronDer" size={18} />
            </Link>
          </div>
          <div className="ph-banda-img">
            <Imagen src={IMG.atlas} ratio="4 / 3" figura busqueda="atlas anatomía libros medicina" />
          </div>
        </div>
      </Reveal>

      {/* ===== FLASHCARDS ===== */}
      <Reveal as="section" className="ph-banda ph-flash">
        <div className="ph-wrap ph-banda-in">
          <div className="ph-banda-img">
            <Imagen src={IMG.flashcards} ratio="4 / 3" figura busqueda="estudiante repaso tarjetas botiquín" />
          </div>
          <div className="ph-banda-texto ph-flash-texto">
            <span className="ph-flash-bignum">
              <Contador valor={stats.flashcards} />
            </span>
            <h2 className="ph-titular">
              Flash<span className="ac">Cards</span>
            </h2>
            <p>Repasa con nuestras flashcards por tema o globales para fijar los conceptos de alto rendimiento.</p>
            <span className="ph-flash-cap">tarjetas de repaso de alto rendimiento</span>
            <Link to="/flashcards" className="btn-pildora btn-pildora--solido btn-grande-p">
              Repasar <Icon name="chevronDer" size={18} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
