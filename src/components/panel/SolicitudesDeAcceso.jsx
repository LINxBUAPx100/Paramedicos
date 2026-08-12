import { useEffect, useState } from 'react'
import { mensajeError } from '../../lib/panelModelo.js'
import Icon from '../Icon.jsx'

// ============================================================
//  Solicitudes de acceso DESDE FUERA + ficha del directorio (Bloque K)
// ------------------------------------------------------------
//  Dos cosas que van juntas porque son la misma decisión: si la academia se
//  publica en el directorio, empieza a recibir solicitudes; si se retira, deja
//  de recibirlas y vuelve al acceso por código.
// ============================================================

export default function SolicitudesDeAcceso({ academiaId, academiaNombre = '', miUid }) {
  const [ficha, setFicha] = useState(undefined) // undefined = cargando, null = no publicada
  const [solicitudes, setSolicitudes] = useState([])
  const [descripcion, setDescripcion] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    if (!academiaId) return undefined
    let vivo = true
    ;(async () => {
      try {
        const api = await import('../../lib/firebase/directorio.js')
        const [f, s] = await Promise.all([
          api.estaEnDirectorio(academiaId),
          api.solicitudesAccesoDeAcademia(academiaId),
        ])
        if (!vivo) return
        setFicha(f)
        setDescripcion(f?.descripcion || '')
        setSolicitudes(s)
      } catch {
        if (vivo) { setFicha(null); setSolicitudes([]) }
      }
    })()
    return () => { vivo = false }
  }, [academiaId, recarga])

  const correr = async (fn, exito) => {
    setOcupado(true); setError(''); setMsg('')
    try {
      await fn()
      if (exito) setMsg(exito)
      setRecarga((n) => n + 1)
    } catch (err) {
      setError(mensajeError(err, 'No se pudieron gestionar las solicitudes', 'solicitudesAcceso'))
    } finally {
      setOcupado(false)
    }
  }

  const publicar = () =>
    correr(async () => {
      const { publicarEnDirectorio } = await import('../../lib/firebase/directorio.js')
      await publicarEnDirectorio(academiaId, { nombre: academiaNombre || academiaId, descripcion })
    }, 'Tu academia ya aparece en el directorio.')

  const retirar = () => {
    const ok = window.confirm(
      `¿Retirar a ${academiaNombre || academiaId} del directorio?\n\n` +
      'Dejará de recibir solicitudes y volverá a admitir la entrada con el código de academia.'
    )
    if (!ok) return
    correr(async () => {
      const { quitarDelDirectorio } = await import('../../lib/firebase/directorio.js')
      await quitarDelDirectorio(academiaId)
    }, 'Retirada del directorio. Vuelve a valer el código.')
  }

  const resolver = (sol, aceptar) => {
    const motivo = aceptar ? '' : (window.prompt('Motivo (opcional, lo verá quien solicitó):') || '')
    correr(async () => {
      const { resolverSolicitudAcceso } = await import('../../lib/firebase/directorio.js')
      await resolverSolicitudAcceso(sol.id, { aceptar, resueltoPor: miUid, motivo })
    }, aceptar
      ? `${sol.nombre || sol.email} fue aceptado. Entrará la próxima vez que abra la app.`
      : 'Solicitud rechazada.')
  }

  if (ficha === undefined) return null

  const pendientes = solicitudes.filter((s) => s.estado === 'pendiente')

  return (
    <section className="panel-solicitudes-acceso">
      <h2><Icon name="buscar" size={20} /> Directorio y solicitudes</h2>
      <p className="panel-gestion-sub">
        Publicar tu academia en el directorio permite que alguien con cuenta la encuentre y pida
        entrar. <strong>Mientras esté publicada, el código de academia deja de dar acceso
        directo</strong>: toda alta nueva pasa por tu aprobación. Los códigos de GRUPO y los de
        prueba siguen funcionando igual.
      </p>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {msg && <p className="cuenta-ok" role="status">{msg}</p>}

      {ficha ? (
        <div className="psa-ficha">
          <div>
            <span className="bv-estado bv-estado--ok">En el directorio</span>
            <p>{ficha.descripcion || <em>Sin descripción</em>}</p>
          </div>
          <button className="btn btn--sm btn--fantasma" disabled={ocupado} onClick={retirar}>
            Retirar del directorio
          </button>
        </div>
      ) : (
        <div className="psa-publicar">
          <label>
            Descripción pública (opcional)
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Formamos TUM en Puebla desde 2015"
              maxLength={300}
            />
          </label>
          <button className="btn btn--primario" disabled={ocupado} onClick={publicar}>
            Publicar en el directorio
          </button>
        </div>
      )}

      {pendientes.length === 0 ? (
        <p className="panel-vacio">
          {ficha ? 'Sin solicitudes pendientes.' : 'Publícate en el directorio para recibir solicitudes.'}
        </p>
      ) : (
        <ul className="psa-lista">
          {pendientes.map((s) => (
            <li key={s.id} className="psa-item">
              <div>
                <strong>{s.nombre || 'Sin nombre'}</strong>
                <small>{s.email}</small>
                {s.mensaje && <p className="psa-mensaje">«{s.mensaje}»</p>}
              </div>
              <div className="psa-acciones">
                <button className="btn btn--sm btn--exito" disabled={ocupado} onClick={() => resolver(s, true)}>
                  Aceptar
                </button>
                <button className="btn btn--sm btn--fantasma" disabled={ocupado} onClick={() => resolver(s, false)}>
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
