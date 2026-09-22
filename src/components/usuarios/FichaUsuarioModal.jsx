import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import {
  CAMPOS_FICHA, ESTADOS_ELEGIBLES, ETIQUETA_ROL, cambiosDeFicha, camposEditables,
  estadoDeContrasena, permisosDeFicha, problemasDeFicha, valoresDeFicha,
} from '../../lib/fichaUsuario.js'
import { ESTADOS } from '../../lib/cuentaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import './ficha.css'

// ============================================================
//  La ficha de una persona — la MISMA en las tres consolas
// ------------------------------------------------------------
//  Se abre desde cualquier sitio donde aparezca alguien (ver
//  `context/FichaUsuarioContext.jsx`) y enseña lo mismo siempre. Lo que cambia
//  es qué se puede TOCAR, y eso no lo decide esta pantalla: lo decide
//  `lib/fichaUsuario.js` y lo impone `firestore.rules`.
//
//  TRES DECISIONES QUE SE VEN:
//
//  1. **Lo que no se puede editar se ENSEÑA igual, en lectura, con quién lo
//     cambia.** Esconder un dato no lo protege: hace que se pregunte por
//     teléfono a la dirección.
//  2. **Antes de guardar se lista qué cambia**, campo a campo, con el valor
//     viejo y el nuevo. Es exactamente lo que se va a escribir en la
//     auditoría, así que quien pulsa ve lo que va a quedar registrado a su
//     nombre.
//  3. **La contraseña NO aparece para recepción.** Ni el bloque, ni el botón,
//     ni la mención. `puedeContrasena` es false y este componente no pinta esa
//     sección — no es un botón desactivado, es que no existe.
//
//  Y el correo de restablecimiento se CONFIRMA antes de mandarse: sale hacia
//  el buzón de una persona real.
// ============================================================
export default function FichaUsuarioModal({ persona: inicial, onCerrar }) {
  const { rol, esSuperadmin, user, academiaId } = useAuth()

  const [persona, setPersona] = useState(inicial)
  const [grupo, setGrupo] = useState(null)
  const [grupos, setGrupos] = useState([])
  const [valores, setValores] = useState(() => valoresDeFicha(inicial))
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [intentado, setIntentado] = useState(false)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [confirmandoReset, setConfirmandoReset] = useState(false)
  const [enviandoReset, setEnviandoReset] = useState(false)

  const dialogo = useRef(null)
  const primerCampo = useRef(null)

  const permisos = useMemo(
    () => permisosDeFicha({
      rol, esSuperadmin, miUid: user?.uid, miAcademiaId: academiaId, objetivo: persona,
    }),
    [rol, esSuperadmin, user?.uid, academiaId, persona]
  )

  // Se relee SIEMPRE al abrir, aunque quien abrió ya trajera la persona: la
  // fila de una tabla puede llevar minutos en pantalla, y editar sobre datos
  // viejos es cómo se pisan los cambios de otra persona sin enterarse.
  const cargar = useCallback(async () => {
    const uid = inicial?.uid || inicial?.id
    if (!uid) { setCargando(false); return }
    setCargando(true)
    setError('')
    try {
      const { leerFicha, leerGrupo } = await import('../../lib/firebase/fichaUsuario.js')
      const fresca = await leerFicha(uid)
      if (fresca) {
        setPersona(fresca)
        setValores(valoresDeFicha(fresca))
        setGrupo(await leerGrupo(fresca.grupoId).catch(() => null))
      }
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar la ficha', 'usuarios'))
    } finally {
      setCargando(false)
    }
  }, [inicial?.uid, inicial?.id])

  useEffect(() => { cargar() }, [cargar])

  // Los grupos de SU academia, para el selector. Se piden solo si quien mira
  // puede cambiarlo: una lectura que no va a servir para nada no se paga.
  useEffect(() => {
    const suAcademia = persona?.academiaId
    if (!suAcademia || !permisos.campos.includes('grupoId')) return undefined
    let vivo = true
    ;(async () => {
      try {
        const { listarGrupos } = await import('../../lib/firebase/grupos.js')
        const lista = await listarGrupos(suAcademia)
        if (vivo) setGrupos(lista)
      } catch { /* sin permiso de listar: el selector se queda con su grupo actual */ }
    })()
    return () => { vivo = false }
  }, [persona?.academiaId, permisos.campos])

  // Cerrar con Escape y devolver el foco. Un modal del que solo se sale con el
  // ratón es un modal que atrapa a quien trabaja con teclado, y aquí se
  // trabaja con teclado: es la pantalla de un mostrador.
  useEffect(() => {
    const alPulsar = (e) => { if (e.key === 'Escape') onCerrar?.() }
    document.addEventListener('keydown', alPulsar)
    primerCampo.current?.focus()
    return () => document.removeEventListener('keydown', alPulsar)
  }, [onCerrar])

  const editables = camposEditables(permisos)
  const idsEditables = new Set(editables.map((c) => c.id))
  const problemas = useMemo(() => problemasDeFicha(valores, permisos), [valores, permisos])
  const cambios = useMemo(() => cambiosDeFicha(persona, valores, permisos), [persona, valores, permisos])
  const contrasena = estadoDeContrasena(persona, permisos)

  const campo = (id) => (e) => setValores((v) => ({ ...v, [id]: e.target.value }))

  const guardar = async (e) => {
    e.preventDefault()
    setIntentado(true)
    setError('')
    setAviso('')
    if (problemas.length) return
    if (!cambios.length) { setAviso('No hay nada que cambiar.'); return }
    setGuardando(true)
    try {
      const { guardarFichaUsuario } = await import('../../lib/firebase/fichaUsuario.js')
      const res = await guardarFichaUsuario({ persona, valores, permisos, academiaId })
      setAviso(res.auditado
        ? `Guardado. Quedó registrado a tu nombre: ${res.cambios.length} cambio(s).`
        : 'Guardado, pero NO se pudo escribir la línea de auditoría. Avísalo a la dirección.')
      setIntentado(false)
      await cargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudieron guardar los cambios', 'usuarios'))
    } finally {
      setGuardando(false)
    }
  }

  const enviarReset = async () => {
    setEnviandoReset(true)
    setError('')
    setAviso('')
    try {
      const { enviarResetDeContrasena } = await import('../../lib/firebase/fichaUsuario.js')
      const res = await enviarResetDeContrasena({ persona, permisos, academiaId })
      setAviso(`Correo enviado a ${res.email} si esa dirección tiene cuenta. La persona elige su contraseña desde el enlace; tú no la verás.`)
      setConfirmandoReset(false)
    } catch (err) {
      setError(textoDeError(err, 'No se pudo enviar el correo', 'usuarios'))
      setConfirmandoReset(false)
    } finally {
      setEnviandoReset(false)
    }
  }

  const nombreDeGrupo = (id) => (
    grupos.find((g) => g.id === id)?.nombre || grupo?.nombre || id || 'Sin grupo'
  )

  return (
    <div
      className="ficha-velo"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onCerrar?.() }}
    >
      <div
        className="ficha-caja"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ficha-titulo"
        ref={dialogo}
      >
        <header className="ficha-cabecera">
          <div>
            <p className="ui-antetitulo">{persona?.matricula || ETIQUETA_ROL[persona?.rol] || 'Persona'}</p>
            <h2 id="ficha-titulo">{persona?.nombre || 'Sin nombre'}</h2>
            <p className="ficha-sub">
              {ETIQUETA_ROL[persona?.rol] || persona?.rol || '—'}
              {' · '}
              {ESTADOS[persona?.estado || 'activo']?.etiqueta || persona?.estado}
              {persona?.grupoId ? ` · ${nombreDeGrupo(persona.grupoId)}` : ''}
            </p>
          </div>
          <button type="button" className="ficha-cerrar" onClick={onCerrar} aria-label="Cerrar la ficha">
            <Icon name="cerrar" size={20} />
          </button>
        </header>

        {cargando && <p className="staff-ayuda" role="status">Cargando la ficha…</p>}
        {error && <p className="ui-nota-error" role="alert">{error}</p>}
        {aviso && <p className="staff-aviso" role="status">{aviso}</p>}

        {permisos.motivo && (
          <p className="ficha-motivo">
            <Icon name="candado" size={16} /> {permisos.motivo}
          </p>
        )}

        <form onSubmit={guardar} className="ficha-form">
          {CAMPOS_FICHA.map((c, i) => {
            const puede = idsEditables.has(c.id)
            const valor = valores[c.id]

            if (!puede) {
              return (
                <div className="ui-campo ficha-lectura" key={c.id}>
                  <span>{c.etiqueta}</span>
                  <p>
                    {c.id === 'grupoId'
                      ? (valor ? nombreDeGrupo(valor) : '—')
                      : c.id === 'rol' ? (ETIQUETA_ROL[valor] || valor || '—')
                        : c.id === 'estado' ? (ESTADOS[valor]?.etiqueta || valor || '—')
                          : (valor || '—')}
                  </p>
                  <em className="staff-ayuda">{c.ayuda}</em>
                </div>
              )
            }

            const refDelPrimero = i === 0 ? primerCampo : undefined
            return (
              <label className="ui-campo" key={c.id}>
                <span>{c.etiqueta}</span>
                {c.tipo === 'grupo' ? (
                  <select value={valor} onChange={campo(c.id)}>
                    <option value="">— Sin grupo —</option>
                    {/* Su grupo actual va siempre, aunque la lista no se haya
                        podido cargar: si no, guardar lo dejaría sin grupo sin
                        que nadie lo pidiera. */}
                    {valor && !grupos.some((g) => g.id === valor) && (
                      <option value={valor}>{nombreDeGrupo(valor)}</option>
                    )}
                    {grupos.map((g) => (
                      <option key={g.id} value={g.id}>{g.nombre || g.id}</option>
                    ))}
                  </select>
                ) : c.tipo === 'rol' ? (
                  <select value={valor} onChange={campo(c.id)}>
                    {permisos.rolesQuePuedeAsignar.map((r) => (
                      <option key={r} value={r}>{ETIQUETA_ROL[r] || r}</option>
                    ))}
                  </select>
                ) : c.tipo === 'estado' ? (
                  <select value={valor} onChange={campo(c.id)}>
                    {ESTADOS_ELEGIBLES.map((e) => (
                      <option key={e} value={e}>{ESTADOS[e]?.etiqueta || e}</option>
                    ))}
                  </select>
                ) : c.tipo === 'textarea' ? (
                  <textarea value={valor} onChange={campo(c.id)} rows={3} maxLength={300} />
                ) : (
                  <input
                    ref={refDelPrimero}
                    type={c.tipo}
                    value={valor}
                    onChange={campo(c.id)}
                    autoComplete={c.autoComplete || 'off'}
                  />
                )}
                <em className="staff-ayuda">{c.ayuda}</em>
              </label>
            )
          })}

          {intentado && problemas.length > 0 && (
            <ul className="ui-nota-error" role="alert">{problemas.map((p) => <li key={p}>{p}</li>)}</ul>
          )}

          {cambios.length > 0 && (
            <div className="ficha-cambios" aria-live="polite">
              <h3>Esto es lo que va a cambiar</h3>
              <ul>
                {cambios.map((c) => (
                  <li key={c.campo}><b>{c.etiqueta}:</b> «{c.antes || '—'}» → «{c.despues || '—'}»</li>
                ))}
              </ul>
              <p className="staff-ayuda">
                Se guardará también quién lo hizo y cuándo, en el registro de actividad.
              </p>
            </div>
          )}

          {editables.length > 0 && (
            <div className="ui-atajos">
              <button type="submit" className="btn btn--primario" disabled={guardando || cambios.length === 0}>
                <Icon name="check" size={18} /> {guardando ? 'Guardando…' : 'Guardar cambios'}
              </button>
              <button
                type="button" className="btn btn--sm"
                onClick={() => { setValores(valoresDeFicha(persona)); setIntentado(false) }}
                disabled={guardando || cambios.length === 0}
              >
                Descartar
              </button>
            </div>
          )}
        </form>

        {/* LA CONTRASEÑA. Este bloque NO EXISTE para recepción: no está
            desactivado, no se pinta. Ver `permisosDeFicha`. */}
        {permisos.puedeContrasena && (
          <section className="ficha-contrasena">
            <h3>Contraseña</h3>
            {!contrasena.puede ? (
              <p className="staff-ayuda">{contrasena.aviso}</p>
            ) : !confirmandoReset ? (
              <>
                <p className="staff-ayuda">
                  Nadie del personal puede ver ni elegir la contraseña de otra persona. Lo que se
                  manda es un enlace para que la elija ella.
                </p>
                <button type="button" className="btn btn--sm" onClick={() => setConfirmandoReset(true)}>
                  <Icon name="llave" size={16} /> Enviar correo para restablecer
                </button>
              </>
            ) : (
              <>
                <p className="ficha-confirmar">{contrasena.aviso}</p>
                <div className="ui-atajos">
                  <button type="button" className="btn btn--primario btn--sm" onClick={enviarReset} disabled={enviandoReset}>
                    {enviandoReset ? 'Enviando…' : 'Sí, enviar el correo'}
                  </button>
                  <button type="button" className="btn btn--sm" onClick={() => setConfirmandoReset(false)} disabled={enviandoReset}>
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

