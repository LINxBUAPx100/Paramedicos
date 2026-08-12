import { useState } from 'react'
import { capacidadesDe } from '../lib/capacidades.js'
import {
  SECCIONES_HOME, seccionesDeHome, alternarSeccion, moverSeccion, esHomeDefault,
} from '../lib/homeModelo.js'
import {
  VARIANTES, ETIQUETA_VARIANTE, DESCRIPCION_VARIANTE, DESTINOS,
  MAX_AVISOS, MAX_ACCESOS, homeAcademiaDe, normalizarHomeAcademia,
  esHomeAcademiaDefault, alternarAcceso, agregarAviso, editarAviso, quitarAviso,
} from '../lib/homeAcademiaModelo.js'
import BloqueAcademia from './BloqueAcademia.jsx'
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
  const [bloque, setBloque] = useState(() => homeAcademiaDe(academia))
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
        // Igual que homeSecciones: si equivale al default se guarda null y el
        // doc no arrastra un campo redundante.
        homeAcademia: esHomeAcademiaDefault(bloque) ? null : normalizarHomeAcademia(bloque),
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

  // Academia "de mentira" que alimenta la vista previa: los datos guardados con
  // lo que se está editando encima.
  const academiaPrevia = {
    ...academia,
    logo: logo.trim(),
    lema: lema.trim(),
    colorHero,
    homeAcademia: bloque,
  }
  const cambiar = (campos) => setBloque((b) => ({ ...b, ...campos }))

  return (
    <section className="panel-personalizacion">
      <h2><Icon name="chispa" size={20} /> Personalización de la academia</h2>
      <p className="panel-gestion-sub">
        Logo, lema y color que tus alumnos y profesores ven en su pantalla de inicio.
      </p>

      {/* Vista previa EN VIVO: el mismo componente que pinta el Home, con los
          valores que se están editando. Si cambia el bloque, cambia la previa
          sola — no hay una copia que mantener sincronizada a mano. */}
      <div className="pa-previa">
        <span className="pa-previa-etiqueta">Así lo verán tus miembros</span>
        <BloqueAcademia previa academia={academiaPrevia} />
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

        {/* --- Bloque de la academia en el Home (Bloque L) --- */}
        <fieldset className="hs-editor">
          <legend><Icon name="capas" size={16} /> Tu bloque en la pantalla de inicio</legend>

          <div className="ba-variantes">
            {VARIANTES.map((v) => (
              <label key={v} className={`ba-variante ${bloque.variante === v ? 'on' : ''}`}>
                <input
                  type="radio"
                  name="variante-bloque"
                  value={v}
                  checked={bloque.variante === v}
                  onChange={() => cambiar({ variante: v })}
                />
                <span>
                  <strong>{ETIQUETA_VARIANTE[v]}</strong>
                  <small>{DESCRIPCION_VARIANTE[v]}</small>
                </span>
              </label>
            ))}
          </div>

          <label>
            Título (vacío = el nombre de tu academia)
            <input
              type="text"
              value={bloque.titulo}
              onChange={(e) => cambiar({ titulo: e.target.value })}
              placeholder={academia.nombre || academia.id}
              maxLength={80}
            />
          </label>
          <label>
            Mensaje (vacío = tu lema)
            <input
              type="text"
              value={bloque.mensaje}
              onChange={(e) => cambiar({ mensaje: e.target.value })}
              placeholder={lema || 'Formando a los mejores paramédicos'}
              maxLength={200}
            />
          </label>

          {bloque.variante === 'hero' && (
            <label>
              Imagen de fondo (enlace de Drive o URL)
              <input
                type="text"
                value={bloque.imagenFondo}
                onChange={(e) => cambiar({ imagenFondo: e.target.value })}
                placeholder="Pega el enlace de compartir de Drive o una URL"
              />
            </label>
          )}

          <label className="ba-check">
            <input
              type="checkbox"
              checked={bloque.mostrarGrupo}
              onChange={(e) => cambiar({ mostrarGrupo: e.target.checked })}
            />
            <span>Mostrar el grupo del alumno junto al nombre de la academia</span>
          </label>

          {bloque.variante === 'tarjetas' && (
            <div className="ba-accesos">
              <p className="panel-gestion-sub">
                Accesos rápidos ({bloque.accesos.length}/{MAX_ACCESOS}). Elige las secciones que
                quieras destacar para tus alumnos.
              </p>
              <div className="ba-destinos">
                {DESTINOS.map((d) => {
                  const puesto = bloque.accesos.some((a) => a.ruta === d.ruta)
                  const lleno = !puesto && bloque.accesos.length >= MAX_ACCESOS
                  return (
                    <button
                      key={d.ruta}
                      type="button"
                      className={`btn btn--sm ${puesto ? 'btn--primario' : 'btn--suave'}`}
                      disabled={lleno}
                      onClick={() => setBloque((b) => alternarAcceso(b, d.ruta))}
                    >
                      <Icon name={d.icono} size={14} /> {d.etiqueta}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="ba-avisos">
            <p className="panel-gestion-sub">
              Avisos ({bloque.avisos.length}/{MAX_AVISOS}). Aparecen dentro de tu bloque; útiles
              para fechas de examen, cambios de horario o material nuevo.
            </p>
            {bloque.avisos.map((a, i) => (
              <div key={i} className="ba-aviso">
                <input
                  type="text"
                  value={a.titulo || ''}
                  onChange={(e) => setBloque((b) => editarAviso(b, i, { titulo: e.target.value }))}
                  placeholder="Título"
                  maxLength={80}
                  aria-label={`Título del aviso ${i + 1}`}
                />
                <input
                  type="text"
                  value={a.texto || ''}
                  onChange={(e) => setBloque((b) => editarAviso(b, i, { texto: e.target.value }))}
                  placeholder="Detalle"
                  maxLength={240}
                  aria-label={`Texto del aviso ${i + 1}`}
                />
                <input
                  type="text"
                  value={a.url || ''}
                  onChange={(e) => setBloque((b) => editarAviso(b, i, { url: e.target.value }))}
                  placeholder="Enlace (opcional, https://…)"
                  aria-label={`Enlace del aviso ${i + 1}`}
                />
                <button
                  type="button"
                  className="btn btn--sm btn--fantasma"
                  onClick={() => setBloque((b) => quitarAviso(b, i))}
                  aria-label={`Quitar el aviso ${i + 1}`}
                >
                  <Icon name="basura" size={14} />
                </button>
              </div>
            ))}
            {bloque.avisos.length < MAX_AVISOS && (
              <button
                type="button"
                className="btn btn--sm btn--suave"
                onClick={() => setBloque((b) => agregarAviso(b))}
              >
                <Icon name="mas" size={14} /> Añadir aviso
              </button>
            )}
          </div>
        </fieldset>

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
                      className="btn btn--sm btn--suave"
                      onClick={() => setSecciones((c) => moverSeccion(c, s.id, 'arriba'))}
                      disabled={i === 0}
                      aria-label={`Subir la sección ${etiquetaDe[s.id] || s.id}`}
                    >
                      <Icon name="chevronArriba" size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn--sm btn--suave"
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

        <button className="btn btn--primario" type="submit" disabled={ocupado}>
          {ocupado ? 'Guardando…' : 'Guardar personalización'}
        </button>
        {error && <p className="cuenta-error" role="alert">{error}</p>}
        {msg && <p className="cuenta-ok" role="status">{msg}</p>}
      </form>
    </section>
  )
}
