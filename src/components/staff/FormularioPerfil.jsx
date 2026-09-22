import { useEffect, useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import {
  CAMPOS_EDITABLES, CAMPOS_EN_LECTURA, cambiosDe, problemasDeEdicion, valoresIniciales,
} from '../../lib/staff/edicionPerfil.js'
import { etiquetaGeneracion } from '../../lib/staff/reporteModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Editar la ficha — con lo que cambia a la vista antes de guardarlo
// ------------------------------------------------------------
//  EL FORMULARIO SE PINTA DESDE `CAMPOS_EDITABLES`, no a mano. Añadir un campo
//  editable es una línea en ese módulo (y su línea en `firestore.rules`), nunca
//  un `<input>` suelto aquí: un campo que existe en la pantalla y no en la
//  regla se deniega en el servidor y parece un problema de permisos.
//
//  ANTES DE GUARDAR SE ENSEÑA QUÉ CAMBIA, campo a campo, con el valor viejo y
//  el nuevo. Es lo mismo que se va a escribir en la auditoría, así que quien
//  pulsa ve exactamente lo que va a quedar registrado a su nombre.
//
//  LOS CUATRO CAMPOS QUE RECEPCIÓN NO TOCA salen listados abajo con quién los
//  cambia. La decisión y su porqué están en `lib/staff/edicionPerfil.js`.
// ============================================================
export default function FormularioPerfil({ grupos = [], onListo }) {
  const { alumno, grupo, academiaId, recargar } = useFicha()
  const [valores, setValores] = useState(() => valoresIniciales(alumno))
  const [intentado, setIntentado] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')

  // Al cambiar de persona, el formulario se rellena con la nueva. Sin esto,
  // abrir la ficha de otro alumno enseñaría los datos del anterior.
  useEffect(() => { setValores(valoresIniciales(alumno)); setIntentado(false) }, [alumno])

  const problemas = useMemo(() => problemasDeEdicion(valores), [valores])
  const cambios = useMemo(() => cambiosDe(alumno, valores), [alumno, valores])

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
      const { guardarFicha } = await import('../../lib/firebase/staff/alumnos.js')
      const res = await guardarFicha({ alumno, valores, academiaId })
      const base = res.auditado
        ? `Guardado. Quedó registrado a tu nombre: ${res.cambios.length} cambio(s).`
        : 'Guardado, pero NO se pudo escribir la línea de auditoría. Avísalo a la dirección.'
      // Si cambió de grupo, lo que hay que decirle en voz alta es qué pasó con
      // su matrícula: es el dato que lleva en la credencial y por el que se le
      // busca en el mostrador.
      setAviso(res.motivoMatricula ? `${base} ${res.motivoMatricula}` : base)
      await recargar()
      onListo?.()
    } catch (err) {
      setError(textoDeError(err, 'No se pudieron guardar los cambios', 'usuarios'))
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-perfil-t">
      <h3 id="staff-perfil-t">Editar ficha</h3>

      <form onSubmit={guardar} className="staff-form">
        {CAMPOS_EDITABLES.map((c) => (
          <label className="ui-campo" key={c.id}>
            <span>{c.etiqueta}</span>
            {c.tipo === 'grupo' ? (
              <select value={valores[c.id]} onChange={campo(c.id)}>
                <option value="">— Sin grupo —</option>
                {grupos.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nombre || g.id}
                    {etiquetaGeneracion(g.generacion) ? ` · ${etiquetaGeneracion(g.generacion)}` : ''}
                  </option>
                ))}
              </select>
            ) : c.tipo === 'textarea' ? (
              <textarea value={valores[c.id]} onChange={campo(c.id)} rows={3} maxLength={300} />
            ) : (
              <input
                type={c.tipo}
                value={valores[c.id]}
                onChange={campo(c.id)}
                autoComplete={c.autoComplete || 'off'}
              />
            )}
            <em className="staff-ayuda">{c.ayuda}</em>
          </label>
        ))}

        {intentado && problemas.length > 0 && (
          <ul className="ui-nota-error" role="alert">{problemas.map((p) => <li key={p}>{p}</li>)}</ul>
        )}

        {cambios.length > 0 && (
          <div className="staff-cambios" aria-live="polite">
            <h4>Esto es lo que va a cambiar</h4>
            <ul>
              {cambios.map((c) => (
                <li key={c.campo}>
                  <b>{c.etiqueta}:</b> «{c.antes || '—'}» → «{c.despues || '—'}»
                </li>
              ))}
            </ul>
            <p className="staff-ayuda">
              Se guardará también quién lo hizo y cuándo, en el registro de actividad de la academia.
            </p>
          </div>
        )}

        <div className="ui-atajos">
          <button type="submit" className="btn btn--primario" disabled={guardando || cambios.length === 0}>
            <Icon name="check" size={18} />
            {guardando ? 'Guardando…' : `Guardar ${cambios.length || ''} cambio(s)`.trim()}
          </button>
          <button
            type="button" className="btn btn--sm"
            onClick={() => { setValores(valoresIniciales(alumno)); setIntentado(false); setAviso('') }}
            disabled={guardando || cambios.length === 0}
          >
            Descartar
          </button>
        </div>
      </form>

      {aviso && <p className="staff-aviso" role="status">{aviso}</p>}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      <h4>Lo que no se cambia desde recepción</h4>
      <dl className="staff-vetados">
        {CAMPOS_EN_LECTURA.map((c) => (
          <div key={c.id}>
            <dt>{c.etiqueta}</dt>
            <dd>{c.quien}</dd>
          </div>
        ))}
        <div>
          <dt>Generación</dt>
          <dd>
            Es del grupo, no de la persona
            {grupo?.generacion ? ` (hoy: ${etiquetaGeneracion(grupo.generacion)})` : ''}.
            Para cambiarla, muévelo de grupo arriba.
          </dd>
        </div>
      </dl>
    </section>
  )
}
