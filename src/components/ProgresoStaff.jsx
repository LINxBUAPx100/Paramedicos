import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from './Icon.jsx'

// ============================================================
//  «Mi progreso» para quien DA CLASE
// ------------------------------------------------------------
//  Un profesor no tiene progreso personal: no estudia el temario, lo enseña.
//  Aun así se le pintaba la misma pantalla que a un alumno —barra de temas
//  leídos, promedio de sus quizzes, botón de reiniciar su progreso—, que para
//  él no significa nada y encima le ofrece borrar algo que no usa.
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
    texto: 'Quién va por dónde, fase por fase, con sus mejores calificaciones y sus intentos. Abre a un alumno para ver su historial y abrirle fases una a una.',
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
    texto: 'Abre o cierra fases y temas para un grupo entero. Para abrírselas a una sola persona, entra a su ficha desde el avance.',
  },
]

export default function ProgresoStaff() {
  const { rol, academia, grupo } = useAuth()
  const esDirector = rol === 'admin_escuela' || rol === 'superadmin'

  return (
    <div className="progreso-page">
      <header className="progreso-header">
        <h1>{esDirector ? 'Avance de tu academia' : 'Avance de tus grupos'}</h1>
        <p>
          Aquí no hay progreso personal: el temario lo enseñas, no lo estudias.
          {grupo?.nombre && <> Trabajas con <strong>{grupo.nombre}</strong>.</>}
          {academia?.nombre && !grupo?.nombre && <> {academia.nombre}.</>}
        </p>
      </header>

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
        <Link to="/temario">Temario</Link> y en el <Link to="/atlas">Atlas</Link>: lo ves completo,
        sin restricciones de grupo.
      </p>
    </div>
  )
}
