import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'

// ============================================================
//  El paso que faltaba antes de poder editar
// ------------------------------------------------------------
//  Una academia que aún usa el contenido estándar no puede editarlo, y hasta
//  ahora eso se resolvía con un cartel: «pide al administrador de la
//  plataforma que active la copia editable de tu academia». Sin botón. El
//  director llegaba al editor —desde un enlace que su propio panel le
//  ofrecía— y se quedaba ahí parado.
//
//  Aquí está la acción. Encender la copia no clona nada ni borra nada: crea un
//  temario propio vacío para empezar a construirlo. Mientras no publique nada,
//  sus alumnos siguen viendo el temario estándar, y eso hay que decirlo en la
//  pantalla: es la pregunta que se hace cualquiera antes de pulsar.
// ============================================================

export default function ActivarCopia({
  academiaNombre,
  puedeActivar,
  esSuperadmin,
  onEmpezarDesdeCero,
}) {
  const [titulo, setTitulo] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')

  const empezar = async (e) => {
    e.preventDefault()
    setOcupado(true)
    setError('')
    try {
      await onEmpezarDesdeCero(titulo.trim() || `Temario de ${academiaNombre}`)
    } catch (err) {
      setError(err?.message || 'No se pudo activar la copia editable.')
      setOcupado(false)
    }
  }

  // Sin permiso (profesor, o director de un plan sin editor): explicar quién
  // puede y por qué, en vez de un callejón sin salida.
  if (!puedeActivar) {
    return (
      <div className="editor-arranque" role="status">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>{academiaNombre} usa el temario estándar</h1>
        <p>
          Su temario todavía no tiene una copia propia, así que no hay nada que editar aquí.
          Quien puede crearla es <strong>el director de la academia</strong> (con un plan que
          incluya el editor de contenido) o el administrador de la plataforma.
        </p>
        <p className="editor-arranque-nota">
          Mientras tanto no se pierde nada: tus alumnos siguen viendo el temario estándar completo.
        </p>
        <Link to="/" className="btn btn--pildora btn--carbon">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="editor-arranque">
      <span className="acceso-ico"><Icon name="herramientas" size={30} /></span>
      <h1>Crea el temario propio de {academiaNombre}</h1>
      <p>
        Ahora mismo esta academia usa el <strong>temario estándar</strong> de la plataforma, que no
        se puede modificar. Para tener contenido propio hay que crear una copia editable: un temario
        de la academia, con sus fases, sus temas y sus materiales.
      </p>

      <p className="editor-arranque-nota">
        <Icon name="check" size={15} /> Tus alumnos <strong>no se quedan sin temario</strong>:
        siguen viendo el estándar hasta que publiques el tuyo. Puedes construirlo con calma.
      </p>

      <form className="editor-arranque-form" onSubmit={empezar}>
        <label>
          ¿Cómo se llama tu temario?
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder={`Temario de ${academiaNombre}`}
            maxLength={80}
            disabled={ocupado}
          />
        </label>
        <button className="btn btn--primario btn--lg" type="submit" disabled={ocupado}>
          {ocupado ? 'Creando…' : 'Empezar mi temario'}
        </button>
      </form>

      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {/* Al super-admin le sirve más partir del temario estándar ya hecho que de
          una hoja en blanco. Esa herramienta ya existe y está probada; lo que
          faltaba era llegar a ella desde aquí. */}
      {esSuperadmin && (
        <p className="editor-arranque-alterna">
          ¿Prefieres partir del temario estándar en vez de una hoja en blanco?{' '}
          <Link to="/admin/contenido">Clona una plantilla a esta academia</Link> y vuelve.
        </p>
      )}
    </div>
  )
}
