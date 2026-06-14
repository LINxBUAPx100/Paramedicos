import { Link } from 'react-router-dom'
import { fases, stats } from '../data/index.js'
import { useProgress } from '../context/ProgressContext.jsx'

export default function Home() {
  const { estado } = useProgress()
  const temasLeidos = Object.values(estado.leidos).filter(Boolean).length
  const progresoGlobal = Math.round((temasLeidos / stats.temas) * 100)

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-contenido">
          <h1 className="hero-titulo">
            La Guía de <span className="acento">Lin</span>
          </h1>
          <p className="hero-sub">
            Atención Prehospitalaria, Cuidados Críticos y Transición a Medicina.
            Una guía exigente y completa diseñada para que no solo memorices,
            sino que <strong>comprendas el porqué</strong> fisiológico, bioquímico
            y anatómico de cada intervención.
          </p>
          <div className="hero-acciones">
            <Link to="/fase/fase-1" className="btn btn-primario btn-grande">
              📚 Empezar a estudiar
            </Link>
            <Link to="/examen" className="btn btn-secundario btn-grande">
              📝 Ponerme a prueba
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-num">{stats.fases}</div>
            <div className="stat-label">Fases</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats.temas}</div>
            <div className="stat-label">Temas a fondo</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats.preguntas}</div>
            <div className="stat-label">Preguntas</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats.flashcards}</div>
            <div className="stat-label">Flashcards</div>
          </div>
        </div>
      </section>

      {temasLeidos > 0 && (
        <section className="home-progreso">
          <div className="home-progreso-info">
            <strong>Tu progreso</strong>
            <span>
              {temasLeidos} de {stats.temas} temas completados
            </span>
          </div>
          <div className="barra-global">
            <div className="barra-global-fill" style={{ width: `${progresoGlobal}%` }}>
              {progresoGlobal > 8 && `${progresoGlobal}%`}
            </div>
          </div>
          <Link to="/progreso" className="link-discreto">
            Ver detalle →
          </Link>
        </section>
      )}

      <section className="fases-grid">
        <h2 className="seccion-titulo-centro">Recorrido de estudio</h2>
        <p className="seccion-desc-centro">
          Seis fases progresivas, del fundamento celular a la farmacología avanzada de cuidados críticos.
        </p>
        <div className="grid-fases">
          {fases.map((fase) => {
            const leidosFase = fase.temas.filter((t) => estado.leidos[t.id]).length
            return (
              <Link
                to={`/fase/${fase.id}`}
                key={fase.id}
                className="fase-card"
                style={{ '--fase-color': fase.color }}
              >
                <div className="fase-card-top">
                  <span className="fase-card-ico">{fase.icono}</span>
                  <span className="fase-card-num">Fase {fase.numero}</span>
                </div>
                <h3 className="fase-card-titulo">{fase.titulo}</h3>
                <p className="fase-card-sub">{fase.subtitulo}</p>
                <p className="fase-card-desc">{fase.descripcion}</p>
                <div className="fase-card-pie">
                  <span className="fase-card-temas">{fase.temas.length} temas</span>
                  <span className="fase-card-prog">
                    {leidosFase}/{fase.temas.length} ✓
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="modos">
        <h2 className="seccion-titulo-centro">Cómo aprenderás</h2>
        <div className="grid-modos">
          <div className="modo-card">
            <span className="modo-ico">📖</span>
            <h3>Estudia a profundidad</h3>
            <p>
              Cada tema redactado con teoría, tablas, fórmulas y correlación clínica.
              No es un cuestionario: es material para entender de verdad.
            </p>
          </div>
          <div className="modo-card">
            <span className="modo-ico">🎴</span>
            <h3>Repasa con flashcards</h3>
            <p>
              Tarjetas de repaso activo por tema o globales para fijar los conceptos
              de alto rendimiento.
            </p>
            <Link to="/flashcards" className="link-discreto">
              Ir a flashcards →
            </Link>
          </div>
          <div className="modo-card">
            <span className="modo-ico">🧪</span>
            <h3>Ponte a prueba</h3>
            <p>
              Quiz al final de cada tema y un examen general aleatorio con
              explicación de cada respuesta.
            </p>
            <Link to="/examen" className="link-discreto">
              Hacer examen →
            </Link>
          </div>
          <div className="modo-card">
            <span className="modo-ico">🗺️</span>
            <h3>Atlas visual</h3>
            <p>
              Mapas anatómicos y fisiológicos del cuerpo humano: corazón, circulación,
              vía aérea, nefrona, sistema nervioso y más.
            </p>
            <Link to="/atlas" className="link-discreto">
              Ver el atlas →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
