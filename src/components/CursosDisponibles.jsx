import { useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { useCursos } from '../context/ContenidoContext.jsx'
import { hayVariosCursos } from '../lib/cursosDelUsuario.js'

// ============================================================
//  Sección «Tus cursos» del Home
// ------------------------------------------------------------
//  El Home nació cuando la plataforma solo impartía paramédico, y se notaba:
//  hablaba de un único temario porque no había otro. En cuanto una academia
//  imparte enfermería —o un grupo cursa su carrera más una especialización—
//  hay que poder ver los dos y decidir cuál se estudia.
//
//  Esta sección NO se pinta cuando hay un solo curso. No es una comprobación
//  defensiva: una pantalla que pide elegir entre una única opción es ruido, y
//  el Home de quien solo cursa paramédico tiene que seguir siendo el de hoy.
//
//  Elegir curso cambia el contenido que resuelve toda la aplicación (temario,
//  exámenes, flashcards, Logros), por eso vive en el contexto de contenido y no
//  en el estado de esta pantalla.
// ============================================================
export default function CursosDisponibles() {
  const { cursos, cursoId, elegirCurso } = useCursos()
  const navigate = useNavigate()

  if (!hayVariosCursos(cursos)) return null

  const abrir = (curso) => {
    if (!curso.listo) return
    if (curso.id !== cursoId) elegirCurso(curso.id)
    navigate('/temario')
  }

  return (
    <div className="ph-wrap">
      <Reveal as="section" className="cursos" aria-labelledby="cursos-titulo">
        <header className="cursos-cab">
          <h2 id="cursos-titulo" className="ph-h2">Tus cursos</h2>
          <p>
            Tu academia imparte {cursos.length} programas y tú tienes acceso a todos ellos. Elige
            cuál estudias ahora: el temario, los exámenes y tus logros cambian con él.
          </p>
        </header>

        <ul className="cursos-lista">
          {cursos.map((curso) => (
            <li key={curso.id}>
              <article
                className={`curso-tarjeta${curso.activo ? ' curso-tarjeta--activa' : ''}${curso.listo ? '' : ' curso-tarjeta--pendiente'}`}
                style={{ '--curso-color': curso.color }}
              >
                <span className="curso-ico"><Icon name={curso.icono} size={24} /></span>
                <div className="curso-datos">
                  <h3>{curso.titulo}</h3>
                  <p className="curso-tipo">{curso.etiqueta}</p>
                  <p className="curso-conteos">
                    {curso.conteos.modulos} módulos · {curso.conteos.temas} temas
                  </p>
                </div>

                {curso.activo && (
                  <span className="curso-marca"><Icon name="check" size={14} /> Estudiando ahora</span>
                )}

                {curso.listo ? (
                  <button
                    type="button"
                    className={`btn btn--sm ${curso.activo ? 'btn--suave' : 'btn--primario'}`}
                    onClick={() => abrir(curso)}
                  >
                    {curso.activo ? 'Ir al temario' : 'Estudiar este'}
                  </button>
                ) : (
                  // Un curso a medio clonar tiene huecos: dejar entrar sería
                  // enseñar un temario incompleto como si fuera el definitivo.
                  <span className="curso-pendiente">
                    <Icon name="reloj" size={14} /> Preparándose
                  </span>
                )}
              </article>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
