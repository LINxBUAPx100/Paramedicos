import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from './Icon.jsx'

// ============================================================
//  Progreso para quien DA CLASE
// ------------------------------------------------------------
//  Lo primero que ve un profesor al entrar a /progreso no es su avance
//  personal, sino el de sus alumnos: antes se le pintaba la misma pantalla que
//  a un alumno —barra de temas leídos, promedio de sus quizzes, botón de
//  reiniciar su progreso— como si el temario lo estudiara en vez de enseñarlo.
//  Su avance personal SÍ existe, y sí se puede consultar: vive en la segunda
//  pestaña de /progreso (`?vista=mio`), que es adonde apunta «Ver detalle» de
//  la portada.
//
//  Lo que sí necesita es el avance de SUS ALUMNOS. Eso ya existe y está bien
//  hecho en el panel, así que esta pantalla NO lo repite: lo señala. Mantener
//  dos tablas iguales garantiza que una de las dos se quede vieja, y sería la
//  segunda copia de un error que este proyecto ya pagó con la vista previa del
//  editor.
// ============================================================

const DESTINOS = [
  {
    ruta: '/panel',
    icono: 'progreso',
    titulo: 'Avance de tus alumnos',
    texto: 'Quién va por dónde, módulo por módulo, con sus mejores calificaciones y sus intentos. Abre a un alumno para ver su historial y abrirle módulos uno a uno.',
  },
  {
    ruta: '/panel/calificaciones',
    icono: 'examen',
    titulo: 'Calificaciones',
    texto: 'Tus evaluaciones —prácticas, exámenes presenciales— y la nota de cada alumno, con los promedios ponderados del grupo.',
  },
  {
    ruta: '/panel/grupos',
    icono: 'capas',
    titulo: 'Qué ve cada grupo',
    texto: 'Abre o cierra módulos y temas para un grupo entero. Para abrírselas a una sola persona, entra a su ficha desde el avance.',
  },
]

// `conCabecera` es false cuando esto va dentro de la pestaña «Avance de mis
// alumnos» de /progreso: el título y el encabezado los pone ya la pestaña, y
// dos <h1> seguidos rompen el orden de encabezados de la página.
export default function ProgresoStaff({ conCabecera = true }) {
  const { rol, academia, grupo } = useAuth()
  const esDirector = rol === 'admin_escuela' || rol === 'superadmin'

  return (
    <div className={conCabecera ? 'progreso-page' : ''}>
      {conCabecera && (
        <header className="progreso-header">
          <h1>{esDirector ? 'Avance de tu academia' : 'Avance de tus grupos'}</h1>
          <p>
            El avance de quienes estudian contigo.
            {grupo?.nombre && <> Trabajas con <strong>{grupo.nombre}</strong>.</>}
            {academia?.nombre && !grupo?.nombre && <> {academia.nombre}.</>}
          </p>
        </header>
      )}

      <div className="ps-destinos">
        {DESTINOS.map((d) => (
          <Link key={d.ruta} to={d.ruta} className="ps-destino">
            <span className="ps-destino-ico"><Icon name={d.icono} size={22} /></span>
            <span className="ps-destino-texto">
              <strong>{d.titulo}</strong>
              <small>{d.texto}</small>
            </span>
            <Icon name="chevronDer" size={18} />
          </Link>
        ))}
      </div>

      <p className="panel-nota">
        ¿Quieres estudiar el temario tú mismo? Está entero en{' '}
        <Link to="/temario">Temario</Link> y en <Link to="/logros">Logros</Link>: lo ves completo,
        sin restricciones de grupo. Tu propio avance está en la pestaña{' '}
        <Link to="/progreso?vista=mio">Mi progreso</Link>.
      </p>
    </div>
  )
}
