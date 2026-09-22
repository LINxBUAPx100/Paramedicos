import { useCallback, useEffect, useState } from 'react'
import Icon from '../Icon.jsx'
import { etiquetaEstado } from '../../lib/staff/carritoModelo.js'
import { fechaCorta, moneda } from '../../lib/staff/cajaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import BotonPersona from '../usuarios/BotonPersona.jsx'

// ============================================================
//  Bandeja de tienda — lo que llega sin que nadie lo pida
// ------------------------------------------------------------
//  Un pedido hecho desde el teléfono no tiene a nadie delante del mostrador,
//  así que si solo se pudiera ver buscando a la persona, nadie lo vería nunca:
//  habría que adivinar quién pidió algo. Esta lista existe para que recepción
//  abra la tienda y sepa qué hay pendiente.
//
//  ES UNA LECTURA BAJO DEMANDA, no un `onSnapshot`. El feed en vivo es el
//  trabajo O5 y tiene su propio riesgo anotado en el plan: una pestaña abierta
//  todo el día con un listener mal filtrado se come la cuota. Mientras el
//  volumen sea el de una academia, un botón de actualizar cuesta cero.
//
//  Desde aquí NO se confirma: se abre la ficha de la persona, que es donde
//  está su cuenta entera —lo que debe, lo que ya se le entregó— y donde
//  confirmar tiene contexto. Un botón de confirmar suelto en una lista es la
//  forma más fácil de apartarle material a quien no era.
// ============================================================
export default function BandejaDeTienda({ academiaId, onAbrirFicha }) {
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    if (!academiaId) return
    setCargando(true)
    setError('')
    try {
      const { bandejaDeOrdenes } = await import('../../lib/firebase/staff/tienda.js')
      setOrdenes(await bandejaDeOrdenes(academiaId))
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar la bandeja', 'ordenes'))
    } finally {
      setCargando(false)
    }
  }, [academiaId])

  useEffect(() => { cargar() }, [cargar])

  const abrir = async (orden) => {
    if (!orden?.uid) {
      setError('Ese pedido no dice de quién es, así que no hay ficha que abrir.')
      return
    }
    setError('')
    try {
      const { fichaDeAlumno } = await import('../../lib/firebase/staff/alumnos.js')
      const persona = await fichaDeAlumno(orden.uid)
      // Sin mensaje, pulsar el botón no hacía NADA visible y el pedido parecía
      // inatendible. Pasa si a esa persona la dieron de baja del padrón después
      // de haber pedido.
      if (!persona) {
        setError('No se encontró la ficha de quien hizo este pedido. Puede que ya no esté en el padrón de la academia.')
        return
      }
      onAbrirFicha?.(persona)
    } catch (err) {
      setError(textoDeError(err, 'No se pudo abrir la ficha', 'usuarios'))
    }
  }

  const sinConfirmar = ordenes.filter((o) => o.estado === 'solicitado')
  const enCurso = ordenes.filter((o) => o.estado !== 'solicitado')

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-bandeja-t">
      <div className="ui-herramientas">
        <h3 id="staff-bandeja-t">Pedidos de la tienda</h3>
        <div className="ui-atajos">
          <button type="button" className="btn btn--sm" onClick={cargar}>
            <Icon name="restaurar" size={16} /> Actualizar
          </button>
          {sinConfirmar.length > 0 && (
            <span className="ui-etiqueta ui-etiqueta--riesgo">{sinConfirmar.length} sin confirmar</span>
          )}
        </div>
      </div>

      {cargando && <p className="staff-ayuda" role="status">Cargando…</p>}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      <h4>Sin confirmar</h4>
      {sinConfirmar.length === 0
        ? <p className="staff-ayuda">Nada pendiente. Los pedidos que los alumnos manden desde su tienda aparecen aquí.</p>
        : (
          <ul className="staff-ordenes">
            {sinConfirmar.map((o) => (
              <li key={o.id} className="staff-orden staff-orden--solicitado">
                <div>
                  <b><BotonPersona persona={{ uid: o.uid, nombre: o.nombre, matricula: o.matricula, rol: 'alumno', academiaId: o.academiaId }} /></b>
                  <span className="staff-ayuda">{fechaCorta(o.creado)}</span>
                </div>
                <p>{(o.lineas || []).length} artículo(s) · {o.matricula || 'sin matrícula'}</p>
                <p className="staff-ayuda">
                  Todavía no reserva material ni tiene precio. Ábrelo en su ficha para confirmarlo.
                </p>
                <div className="staff-orden-acciones">
                  <button type="button" className="btn btn--sm btn--primario" onClick={() => abrir(o)}>
                    <Icon name="usuario" size={14} /> Abrir su ficha
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

      <h4>Apartado o pagado, pendiente de entrega</h4>
      {enCurso.length === 0
        ? <p className="staff-ayuda">Nada pendiente de entregar.</p>
        : (
          <ul className="staff-ordenes">
            {enCurso.map((o) => (
              <li key={o.id} className={`staff-orden staff-orden--${o.estado}`}>
                <div>
                  <b><BotonPersona persona={{ uid: o.uid, nombre: o.nombre, matricula: o.matricula, rol: 'alumno', academiaId: o.academiaId }} /></b>
                  <span className="ui-etiqueta">{etiquetaEstado(o.estado)}</span>
                </div>
                <p>{(o.lineas || []).map((l) => `${l.cantidad}× ${l.nombre || l.articuloId}`).join(', ')}</p>
                <p className="staff-total"><b>{moneda(o.total)}</b></p>
                <div className="staff-orden-acciones">
                  <button type="button" className="btn btn--sm" onClick={() => abrir(o)}>
                    <Icon name="usuario" size={14} /> Abrir su ficha
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
    </section>
  )
}
