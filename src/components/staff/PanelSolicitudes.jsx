import { useCallback, useEffect, useState } from 'react'
import Icon from '../Icon.jsx'
import { fechaCorta } from '../../lib/staff/cajaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import BotonPersona from '../usuarios/BotonPersona.jsx'

// ============================================================
//  Solicitudes — consulta, no resolución
// ------------------------------------------------------------
//  En el mostrador la pregunta es «¿ya me aceptaron?», y poder contestarla sin
//  ir a buscar al director es media gestión resuelta. Decidir quién entra y con
//  qué permisos es otra cosa y sigue siendo del director: aquí no hay ni un
//  botón que escriba, y en las reglas `esRecepcionDe` aparece en el `allow
//  read` de las dos colecciones y en ningún `allow update`.
//
//  Se dice en la pantalla, además de cumplirse en el servidor. Recepción tiene
//  que poder explicarle a quien pregunta POR QUÉ no puede resolverlo ella.
// ============================================================
const ESTADOS = {
  pendiente: { etiqueta: 'Pendiente', clase: 'staff-pendiente' },
  aceptada: { etiqueta: 'Aceptada', clase: 'staff-ok' },
  aprobada: { etiqueta: 'Aprobada', clase: 'staff-ok' },
  rechazada: { etiqueta: 'Rechazada', clase: 'staff-no' },
}
const leerEstado = (e) => ESTADOS[e || 'pendiente'] || { etiqueta: e, clase: '' }

export default function PanelSolicitudes({ academiaId }) {
  const [datos, setDatos] = useState({ acceso: [], internas: [], pendientes: 0, errores: [] })
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    if (!academiaId) return
    setCargando(true)
    setError('')
    try {
      const { solicitudesDeRecepcion } = await import('../../lib/firebase/staff/solicitudes.js')
      setDatos(await solicitudesDeRecepcion({ academiaId }))
    } catch (err) {
      setError(textoDeError(err, 'No se pudieron cargar las solicitudes', 'solicitudes'))
    } finally {
      setCargando(false)
    }
  }, [academiaId])

  useEffect(() => { cargar() }, [cargar])

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-solicitudes-t">
      <h3 id="staff-solicitudes-t">Solicitudes</h3>

      <p className="staff-ayuda">
        Consulta. Quien las acepta o las rechaza es la dirección; desde el mostrador se informa
        en qué van.
      </p>

      <div className="ui-atajos">
        <button type="button" className="btn btn--sm" onClick={cargar}>
          <Icon name="restaurar" size={16} /> Actualizar
        </button>
        {datos.pendientes > 0 && (
          <span className="ui-etiqueta">{datos.pendientes} pendiente(s)</span>
        )}
      </div>

      {cargando && <p className="staff-ayuda" role="status">Cargando…</p>}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}
      {/* Una lectura denegada NO se enseña como «no hay nada»: es exactamente
          la confusión que hace perder una tarde. */}
      {datos.errores.map((e) => <p key={e} className="ui-nota-error" role="alert">{e}</p>)}

      <h4>Piden entrar a la academia</h4>
      {datos.acceso.length === 0
        ? <p className="staff-ayuda">Ninguna.</p>
        : (
          <ul className="staff-lista-agenda">
            {datos.acceso.map((s) => (
              <li key={s.id}>
                <b><BotonPersona persona={{ uid: s.uid, nombre: s.nombre, email: s.email }}>{s.nombre || s.email || s.uid}</BotonPersona></b>
                <span className={leerEstado(s.estado).clase}>{leerEstado(s.estado).etiqueta}</span>
                <span className="staff-ayuda">{fechaCorta(s.fecha)}</span>
                {s.mensaje && <span className="staff-ayuda">«{s.mensaje}»</span>}
              </li>
            ))}
          </ul>
        )}

      <h4>Piden algo dentro de la academia</h4>
      {datos.internas.length === 0
        ? <p className="staff-ayuda">Ninguna.</p>
        : (
          <ul className="staff-lista-agenda">
            {datos.internas.map((s) => (
              <li key={s.id}>
                <b><BotonPersona persona={{ uid: s.uid, nombre: s.nombre }}>{s.nombre || s.uid}</BotonPersona></b>
                <span className={leerEstado(s.estado).clase}>{leerEstado(s.estado).etiqueta}</span>
                <span className="staff-ayuda">
                  {s.tipo === 'codigos' ? 'Acceso a códigos' : `Módulo ${s.moduloId || ''}`.trim()}
                  {' · '}
                  {fechaCorta(s.fecha)}
                </span>
              </li>
            ))}
          </ul>
        )}
    </section>
  )
}
