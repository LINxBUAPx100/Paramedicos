import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CASOS } from '../data/casos/index.js'
import { casosParaElAlumno, casosParaElPersonal } from '../lib/casosModelo.js'
import ReproductorCaso from '../components/pulso/ReproductorCaso.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'

// Modo llamada (PTEM Pulso, entrega 6): casos que se ramifican. Entra una
// llamada, el alumno decide qué hacer primero y el caso responde a cada
// decisión con su consecuencia. Cada decisión enlaza a la lección que la
// sostiene. Al alumno solo se le ofrecen casos validados por un docente; el
// personal ve también los borradores, marcados, para revisarlos aquí mismo.
export default function CasosPage() {
  const { temaVisible } = useVisibilidad()
  const { esStaff, academiaId } = useAuth()
  // Los escenarios que escribió la academia (panel › Escenarios). El alumno
  // solo puede pedir los avalados: la regla le niega los borradores.
  const [deLaAcademia, setDeLaAcademia] = useState([])
  useEffect(() => {
    if (!academiaId) return undefined
    let activo = true
    ;(async () => {
      try {
        const { listarCasosAcademia } = await import('../lib/firebase/casos.js')
        const lista = await listarCasosAcademia({ academiaId, soloAvalados: !esStaff })
        if (activo) setDeLaAcademia(lista)
      } catch { /* sin red o reglas sin publicar: quedan los de PTEM */ }
    })()
    return () => { activo = false }
  }, [academiaId, esStaff])
  const todos = [...deLaAcademia, ...CASOS]
  const casos = esStaff ? casosParaElPersonal(todos) : casosParaElAlumno(todos, { temaVisible })
  const pendientes = casos.filter((c) => c.avalado === false).length
  // El caso abierto va en la URL (?caso=…): «atrás» vuelve a la lista de
  // casos en vez de salir de Modo llamada, y recargar no lo cierra.
  const [params, setParams] = useSearchParams()
  const activo = params.get('caso')
  const navigate = useNavigate()
  const { state } = useLocation()
  const abrir = (id) => setParams({ caso: id }, { state: { desdeLista: true } })
  // Salir deshace la entrada que abrió el caso; si se llegó con un enlace
  // directo al caso, no hay lista detrás y se reemplaza por ella.
  const salir = () => (state?.desdeLista ? navigate(-1) : setParams({}, { replace: true }))
  const caso = casos.find((c) => c.id === activo) || null

  return (
    <div className="pl-casos">
      <nav className="migas" aria-label="Ubicación"><Link to="/">Inicio</Link><span>/</span>Modo llamada</nav>
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Práctica de decisiones</span>
        <h1>Modo llamada</h1>
        <p>Entra una llamada, eliges qué evaluar y qué hacer, y el caso responde a tus decisiones. Cada decisión te lleva a la lección que la explica.</p>
      </header>
      {esStaff && pendientes > 0 && (
        <p className="pl-casos-aviso" role="note">
          <b>{pendientes === 1 ? 'Un caso está' : `${pendientes} casos están`} sin validar.</b> Solo el personal los ve: los alumnos no los verán hasta que un docente los valide.{' '}
          <Link to="/panel/escenarios">Crear o adaptar escenarios</Link>
        </p>
      )}
      {caso ? (
        <ReproductorCaso key={caso.id} caso={caso} onSalir={salir} />
      ) : casos.length ? (
        <ul className="pl-casos-lista">
          {casos.map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => abrir(c.id)}>
                <b>{c.titulo}</b>
                {/* El resumen dice qué se aprende, y eso adelanta el diagnóstico: el
                    alumno solo ve el título, como un aviso de despacho. */}
                {esStaff && c.resumen && <span>{c.resumen}</span>}
                {c.origen === 'academia' && <span className="pl-casos-estado pl-casos-estado--propio">De tu academia</span>}
                {c.avalado === false && <span className="pl-casos-estado">{c.estado === 'en_revision' ? 'En revisión' : 'Borrador'} · no visible para alumnos</span>}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="ui-estado pl-casos-vacio">
          <div className="pl-franja" aria-hidden="true" />
          <h2>Todavía no hay casos validados</h2>
          <p>Los casos son contenido clínico: los escribe y los valida tu academia, con fuentes, igual que las lecciones. En cuanto un docente apruebe el primero, aparecerá aquí.</p>
          <Link to="/" className="btn btn--fantasma">Volver al tablero</Link>
        </div>
      )}
    </div>
  )
}
