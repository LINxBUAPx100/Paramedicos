import { Link } from 'react-router-dom'
import { fases, stats } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Icon from '../components/Icon.jsx'

const STAT_ITEMS = [
  { key: 'fases', icon: 'capas', label: 'Fases' },
  { key: 'temas', icon: 'libro', label: 'Temas a fondo' },
  { key: 'preguntas', icon: 'pregunta', label: 'Preguntas' },
  { key: 'flashcards', icon: 'flashcards', label: 'Flashcards' },
]

const MODOS = [
  { icon: 'libro', titulo: 'Estudia a profundidad', texto: 'Cada tema con teoría, tablas, fórmulas y correlación clínica. No es un cuestionario: es material para entender de verdad.' },
  { icon: 'flashcards', titulo: 'Repasa con flashcards', texto: 'Tarjetas de repaso activo por tema o globales para fijar los conceptos de alto rendimiento.', link: { to: '/flashcards', label: 'Ir a flashcards' } },
  { icon: 'matraz', titulo: 'Ponte a prueba', texto: 'Quiz al final de cada tema y un examen general aleatorio con explicación de cada respuesta.', link: { to: '/examen', label: 'Hacer examen' } },
  { icon: 'atlas', titulo: 'Atlas visual', texto: 'Mapas anatómicos y fisiológicos: corazón, circulación, vía aérea, nefrona, sistema nervioso y más.', link: { to: '/atlas', label: 'Ver el atlas' } },
]

export default function Home() {
  const { estado } = useProgress()
  const temasLeidos = Object.values(estado.leidos).filter(Boolean).length
  const progresoGlobal = Math.round((temasLeidos / stats.temas) * 100)

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
        </div>
        <div className="hero-contenido reveal">
          <h1 className="hero-titulo">
            La Guía de <span className="acento">Lin</span>
          </h1>
          <p className="hero-sub">
            Atención Prehospitalaria, Cuidados Críticos y Transición a Medicina.
            Una guía exigente diseñada para que no solo memorices, sino que{' '}
            <strong>comprendas el porqué</strong> fisiológico de cada intervención.
          </p>
          <div className="hero-acciones">
            <Link to="/fase/fase-1" className="btn btn-primario btn-grande">
              <Icon name="libro" size={20} /> Empezar a estudiar
            </Link>
            <Link to="/examen" className="btn btn-secundario btn-grande">
              <Icon name="matraz" size={20} /> Ponerme a prueba
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          {STAT_ITEMS.map((s, i) => (
            <div className="stat-card reveal-pop" key={s.key} style={{ '--d': `${120 + i * 70}ms` }}>
              <span className="stat-ico"><Icon name={s.icon} size={22} /></span>
              <div className="stat-num">{stats[s.key]}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {temasLeidos > 0 && (
        <section className="home-progreso reveal">
          <div className="home-progreso-info">
            <strong>Tu progreso</strong>
            <span>{temasLeidos} de {stats.temas} temas completados</span>
          </div>
          <div className="barra-global">
            <div className="barra-global-fill" style={{ width: `${progresoGlobal}%` }}>
              {progresoGlobal > 8 && `${progresoGlobal}%`}
            </div>
          </div>
          <Link to="/progreso" className="link-discreto">Ver detalle →</Link>
        </section>
      )}

      <section className="fases-grid">
        <h2 className="seccion-titulo-centro">Recorrido de estudio</h2>
        <p className="seccion-desc-centro">
          Siete fases progresivas, del fundamento celular a la farmacología avanzada, el marco normativo y las operaciones especiales.
        </p>
        <div className="grid-fases">
          {fases.map((fase, i) => {
            const leidosFase = fase.temas.filter((t) => estado.leidos[t.id]).length
            const num = String(fase.numero).padStart(2, '0')
            return (
              <Link
                to={`/fase/${fase.id}`}
                key={fase.id}
                className="fase-card reveal"
                style={{ '--fase-color': fase.color, '--d': `${i * 60}ms` }}
              >
                <div className="fase-card-top">
                  <span className="fase-card-num">{num}</span>
                  <span className="fase-card-flecha"><Icon name="flecha" size={18} /></span>
                </div>
                <h3 className="fase-card-titulo">{fase.titulo}</h3>
                <p className="fase-card-sub">{fase.subtitulo}</p>
                <p className="fase-card-desc">{fase.descripcion}</p>
                <div className="fase-card-pie">
                  <span className="fase-card-temas">{fase.temas.length} temas</span>
                  <span className="fase-card-prog">{leidosFase}/{fase.temas.length}</span>
                </div>
                <div className="fase-card-barra">
                  <span style={{ width: `${(leidosFase / fase.temas.length) * 100}%` }} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="modos">
        <h2 className="seccion-titulo-centro">Cómo aprenderás</h2>
        <div className="grid-modos">
          {MODOS.map((m) => (
            <div className="modo-card" key={m.titulo}>
              <span className="modo-ico"><Icon name={m.icon} size={24} /></span>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
              {m.link && (
                <Link to={m.link.to} className="link-discreto">{m.link.label} →</Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
