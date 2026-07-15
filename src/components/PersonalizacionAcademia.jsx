import { useState } from 'react'
import { driveSrc } from '../lib/img.js'
import { capacidadesDe } from '../lib/capacidades.js'
import {
  SECCIONES_HOME, seccionesDeHome, alternarSeccion, moverSeccion, esHomeDefault,
} from '../lib/homeModelo.js'
import Icon from './Icon.jsx'

// Personalización del hero de la academia (se muestra en el Home de sus
// miembros): logo, lema y color de acento. Solo el DIRECTOR de la academia y
// el super-admin pueden editarlo (lo imponen las reglas de Firestore).
// Si el plan incluye `paginaInicioConfigurable` (PRO/CURSO), aquí también se
// eligen las SECCIONES del Home y su orden (roadmap F7).
export default function PersonalizacionAcademia({ academia, onGuardado }) {
  const [logo, setLogo] = useState(academia?.logo || '')
  const [lema, setLema] = useState(academia?.lema || '')
  const [colorHero, setColorHero] = useState(academia?.colorHero || '#0c5fc4')
  const [secciones, setSecciones] = useState(() => seccionesDeHome(academia))
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  if (!academia) return null
  // Capacidad de LA ACADEMIA editada (funciona también cuando el super-admin
  // personaliza una academia ajena): nunca `planComercial === '...'` suelto.
  const puedeSecciones = capacidadesDe(academia).paginaInicioConfigurable

  const guardar = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { actualizarAcademia } = await import('../lib/firebase/usuarios.js')
      await actualizarAcademia(academia.id, {
        logo: logo.trim(),
        lema: lema.trim(),
        colorHero,
        // Solo si el plan lo permite (la regla lo exige igualmente). El
        // default se guarda como null: el doc no arrastra un campo redundante.
        ...(puedeSecciones ? { homeSecciones: esHomeDefault(secciones) ? null : secciones } : {}),
      })
      setMsg('Personalización guardada. Tus miembros la verán en su inicio.')
      onGuardado?.()
    } catch (err) {
      setError(
        String(err?.code || '').includes('permission-denied')
          ? 'Sin permisos: publica las reglas actualizadas de firestore.rules en la consola.'
          : 'No se pudo guardar la personalización.'
      )
    } finally {
      setOcupado(false)
    }
  }

  const descripcionDe = Object.fromEntries(SECCIONES_HOME.map((s) => [s.id, s.descripcion]))
  const etiquetaDe = Object.fromEntries(SECCIONES_HOME.map((s) => [s.id, s.etiqueta]))

  return (
    <section className="panel-personalizacion">
      <h2><Icon name="chispa" size={20} /> Personalización de la academia</h2>
      <p className="panel-gestion-sub">
        Logo, lema y color que tus alumnos y profesores ven en su pantalla de inicio.
      </p>

      {/* Vista previa del hero tal como sale en el Home */}
      <div className="aca-hero aca-hero--preview" style={{ '--aca-color': colorHero }}>
        <span className="aca-hero-logo">
          {logo.trim()
            ? <img src={driveSrc(logo, 200)} alt={`Logo de ${academia.nombre}`} />
            : <b>{(academia.nombre || academia.id || '?').charAt(0).toUpperCase()}</b>}
        </span>
        <div className="aca-hero-texto">
          <small>Tu academia</small>
          <strong>{academia.nombre || academia.id}</strong>
          {lema.trim() && <em>{lema.trim()}</em>}
        </div>
      </div>

      <form className="admin-form" onSubmit={guardar}>
        <label>
          Logo (enlace de Drive o URL de imagen)
          <input
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="Pega el enlace de compartir de Drive o una URL"
          />
        </label>
        <label>
          Lema / mensaje de bienvenida
          <input
            type="text"
            value={lema}
            onChange={(e) => setLema(e.target.value)}
            placeholder="Formando a los mejores paramédicos"
            maxLength={90}
          />
        </label>
        <label className="pa-color">
          Color
          <input type="color" value={colorHero || '#0c5fc4'} onChange={(e) => setColorHero(e.target.value)} />
        </label>

        {puedeSecciones && (
          <fieldset className="hs-editor">
            <legend><Icon name="capas" size={16} /> Secciones de la pantalla de inicio</legend>
            <p className="panel-gestion-sub">
              Elige qué secciones ven los miembros de tu academia y en qué orden. La banda de tu
              academia y el selector de grupo de los profesores aparecen siempre.
            </p>
            <ul className="hs-lista">
              {secciones.map((s, i) => (
                <li key={s.id} className={`hs-item ${s.visible ? '' : 'hs-item--oculta'}`}>
                  <label className="hs-check">
                    <input
                      type="checkbox"
                      checked={s.visible}
                      onChange={() => setSecciones((c) => alternarSeccion(c, s.id))}
                    />
                    <span>
                      <strong>{etiquetaDe[s.id] || s.id}</strong>
                      <small>{descripcionDe[s.id] || ''}</small>
                    </span>
                  </label>
                  <span className="hs-orden">
                    <button
                      type="button"
                      className="btn btn-mini btn-secundario"
                      onClick={() => setSecciones((c) => moverSeccion(c, s.id, 'arriba'))}
                      disabled={i === 0}
                      aria-label={`Subir la sección ${etiquetaDe[s.id] || s.id}`}
                    >
                      <Icon name="chevronArriba" size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-mini btn-secundario"
                      onClick={() => setSecciones((c) => moverSeccion(c, s.id, 'abajo'))}
                      disabled={i === secciones.length - 1}
                      aria-label={`Bajar la sección ${etiquetaDe[s.id] || s.id}`}
                    >
                      <Icon name="chevronAbajo" size={14} />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {secciones.every((s) => !s.visible) && (
              <p className="cuenta-aviso" role="alert">
                Todas las secciones están ocultas: tus miembros solo verán la banda de la academia.
              </p>
            )}
          </fieldset>
        )}

        <button className="btn btn-primario" type="submit" disabled={ocupado}>
          {ocupado ? 'Guardando…' : 'Guardar personalización'}
        </button>
        {error && <p className="cuenta-error" role="alert">{error}</p>}
        {msg && <p className="cuenta-ok" role="status">{msg}</p>}
      </form>
    </section>
  )
}
