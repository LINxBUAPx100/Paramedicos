import { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import {
  agregar, cambiarCantidad, etiquetaEstado, piezasDe, problemasDelCarrito,
  quitar, totalDe,
} from '../../lib/staff/carritoModelo.js'
import { METODOS_PAGO, etiquetaMetodo, fechaCorta, moneda } from '../../lib/staff/cajaModelo.js'
import { claseDeAbono } from '../../lib/staff/adeudosModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Tienda en el mostrador — existencias, cuenta del alumno y entrega
// ------------------------------------------------------------
//  TRES ESTADOS Y NO MÁS: apartado → pagado → entregado. Se pintan en ese
//  orden porque es el orden en que ocurren.
//
//  LO DISPONIBLE NO ES LO QUE HAY EN EL ESTANTE. Es lo que hay menos lo que
//  otras personas ya tienen apartado: un artículo prometido no se puede
//  prometer otra vez. El cálculo está en `carritoModelo.disponibleDe` y aquí
//  solo se enseña.
//
//  EL INVENTARIO SE DESCUENTA AL ENTREGAR, en una transacción que comprueba
//  antes que alcance y que aborta entera si falta una pieza de un artículo.
//  Entregar media orden sería peor que no entregar nada.
//
//  Esta pantalla habla con el PUERTO `lib/firebase/staff/tienda.js`. Cuando
//  exista la tienda virtual completa (trabajo M) se reescribe ese archivo y
//  este componente no cambia.
// ============================================================
export default function PanelTienda() {
  const { alumno, academiaId, miUid, ordenes, cuenta, recargar } = useFicha()
  const [articulos, setArticulos] = useState([])
  const [disponibles, setDisponibles] = useState({})
  const [lineas, setLineas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [ocupado, setOcupado] = useState('')
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  // Id del pedido cuya confirmación falló por inventario, y que se puede
  // confirmar igualmente. Ver `confirmar`.
  const [forzable, setForzable] = useState(null)

  const cargarCatalogo = useCallback(async () => {
    setCargando(true)
    setError('')
    try {
      const { listarArticulos, disponibilidad } = await import('../../lib/firebase/staff/tienda.js')
      const lista = await listarArticulos(academiaId)
      setArticulos(lista)
      setDisponibles(await disponibilidad(academiaId, lista))
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar el catálogo', 'articulos'))
    } finally {
      setCargando(false)
    }
  }, [academiaId])

  useEffect(() => { cargarCatalogo() }, [cargarCatalogo])

  const problemas = useMemo(() => problemasDelCarrito(lineas, disponibles), [lineas, disponibles])
  // El compromiso de pago que dejó cada pedido al confirmarse. Es lo que permite
  // cobrarlo —entero o a plazos— sin cambiar de pestaña.
  const compromisoDe = (ordenId) => cuenta.compromisos.find(
    (c) => c.origen?.id === ordenId && c.estado !== 'cancelado' && c.saldo > 0
  )
  const total = totalDe(lineas)
  const nombreDeArticulo = (id) => articulos.find((a) => a.id === id)?.nombre || id

  const apartar = async () => {
    setOcupado('apartar')
    setError('')
    setAviso('')
    try {
      const { apartar: guardar } = await import('../../lib/firebase/staff/tienda.js')
      const res = await guardar({ lineas, alumno, academiaId, registradoPor: miUid })
      setLineas([])
      setAviso(res.auditado
        ? `Apuntado en su cuenta: ${moneda(total)}. Sigue en inventario hasta que se entregue.`
        : `Apuntado en su cuenta: ${moneda(total)}. No se pudo escribir su línea de auditoría.`)
      await Promise.all([recargar(), cargarCatalogo()])
    } catch (err) {
      setError(textoDeError(err, 'No se pudo apartar', 'ordenes'))
    } finally {
      setOcupado('')
    }
  }

  const accion = async (nombre, fn, ordenId) => {
    setOcupado(`${nombre}:${ordenId}`)
    setError('')
    setAviso('')
    try {
      await fn()
      await Promise.all([recargar(), cargarCatalogo()])
    } catch (err) {
      setError(textoDeError(err, 'No se pudo completar la operación', 'ordenes'))
    } finally {
      setOcupado('')
    }
  }

  // Confirmar un pedido del alumno: `solicitado` → `apartado`. ES AQUÍ donde
  // el pedido recibe precios, y salen del catálogo, nunca de lo que mandó el
  // cliente (ver `lib/tiendaModelo.js`). Si falta inventario para alguna
  // línea, se avisa y se deja decidir: en un mostrador se pacta.
  const confirmar = async (orden, forzar = false) => {
    setOcupado(`confirmar:${orden.id}`)
    setError('')
    setAviso('')
    try {
      const { confirmarPedido } = await import('../../lib/firebase/staff/tienda.js')
      const res = await confirmarPedido({ orden, academiaId, registradoPor: miUid, forzar })
      setAviso(`Pedido confirmado por ${moneda(res.total)}. Ya reserva material y aparece en su cuenta.`)
      setForzable(null)
      await Promise.all([recargar(), cargarCatalogo()])
    } catch (err) {
      setError(textoDeError(err, 'No se pudo confirmar el pedido', 'ordenes'))
      // `confirmable` = falta inventario para alguna línea, pero la operación
      // es legítima. Se deja decidir a quien atiende en vez de negarla: en un
      // mostrador se pacta («te lo aparto y te llega el jueves»), y negarlo sin
      // alternativa obligaría a cancelar el pedido y rehacerlo a mano.
      setForzable(err?.confirmable ? orden.id : null)
    } finally {
      setOcupado('')
    }
  }

  const entregar = (orden) => accion('entregar', async () => {
    const { entregar: hacer } = await import('../../lib/firebase/staff/tienda.js')
    await hacer({ orden, academiaId, registradoPor: miUid })
    setAviso('Entregado y descontado del inventario.')
  }, orden.id)

  const marcarPagada = (orden) => accion('pagar', async () => {
    const { marcarPagada: hacer } = await import('../../lib/firebase/staff/tienda.js')
    await hacer({ ordenId: orden.id, academiaId })
    setAviso('Marcada como pagada. Registra el cobro en Caja si aún no lo hiciste.')
  }, orden.id)

  const cancelar = (orden) => accion('cancelar', async () => {
    const { cancelar: hacer } = await import('../../lib/firebase/staff/tienda.js')
    await hacer({ ordenId: orden.id, academiaId })
    setAviso('Cuenta cancelada. Lo reservado vuelve a estar disponible.')
  }, orden.id)

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-tienda-t">
      <h3 id="staff-tienda-t">Tienda e inventario</h3>

      {cargando && <p className="staff-ayuda" role="status">Cargando catálogo…</p>}

      {!cargando && articulos.length === 0 && (
        <p className="staff-ayuda">
          Esta academia todavía no tiene artículos en su catálogo. Los da de alta la dirección.
        </p>
      )}

      {articulos.length > 0 && (
        <>
          <h4>Existencias</h4>
          <div className="ui-tabla-wrap">
            <table className="ui-tabla">
              <thead>
                <tr><th>Artículo</th><th>Precio</th><th>Disponible</th><th>En estante</th><th /></tr>
              </thead>
              <tbody>
                {articulos.map((a) => {
                  const libre = disponibles[a.id] ?? a.existencias
                  return (
                    <tr key={a.id}>
                      <td>{a.nombre}</td>
                      <td>{moneda(a.precio)}</td>
                      <td className={libre === 0 ? 'staff-agotado' : ''}>{libre}</td>
                      <td>{a.existencias}</td>
                      <td>
                        <button
                          type="button" className="btn btn--sm"
                          disabled={libre === 0}
                          onClick={() => setLineas((l) => agregar(l, a, 1))}
                        >
                          <Icon name="mas" size={14} /> Añadir
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="staff-ayuda">
            «Disponible» descuenta lo que otras personas ya tienen apartado. «En estante» es el
            inventario, que solo baja al entregar.
          </p>
        </>
      )}

      {lineas.length > 0 && (
        <>
          <h4>Por apuntar en su cuenta</h4>
          <ul className="staff-carrito">
            {lineas.map((l) => (
              <li key={l.articuloId}>
                <span className="staff-carrito-nombre">{l.nombre}</span>
                <label className="ui-campo staff-carrito-cantidad">
                  <span className="staff-sr">Cantidad de {l.nombre}</span>
                  <input
                    type="number" min="0" max="999" value={l.cantidad}
                    onChange={(e) => setLineas((ls) => cambiarCantidad(ls, l.articuloId, e.target.value))}
                  />
                </label>
                <span>{moneda(l.precio * l.cantidad)}</span>
                <button type="button" className="ui-enlace" onClick={() => setLineas((ls) => quitar(ls, l.articuloId))}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <p className="staff-total"><span>{piezasDe(lineas)} pieza(s)</span><b>{moneda(total)}</b></p>

          {problemas.length > 0 && (
            <ul className="ui-nota-error" role="alert">{problemas.map((p) => <li key={p}>{p}</li>)}</ul>
          )}

          <button
            type="button" className="btn btn--primario"
            onClick={apartar}
            disabled={ocupado === 'apartar' || problemas.length > 0}
          >
            {ocupado === 'apartar' ? 'Guardando…' : 'Apuntar en su cuenta'}
          </button>
        </>
      )}

      {aviso && <p className="staff-aviso" role="status">{aviso}</p>}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      <h4>Sus cuentas</h4>
      {ordenes.length === 0
        ? <p className="staff-ayuda">No tiene ninguna compra registrada.</p>
        : (
          <ul className="staff-ordenes">
            {ordenes.map((o) => (
              <li key={o.id} className={`staff-orden staff-orden--${o.estado}`}>
                <div>
                  <b>{etiquetaEstado(o.estado)}</b>
                  <span className="staff-ayuda">{fechaCorta(o.creado)}</span>
                </div>
                {/* El nombre puede faltar: un pedido del alumno viaja con
                    `articuloId` y cantidad y nada más. Se resuelve contra el
                    catálogo ya cargado en vez de imprimir un id. */}
                <p>{(o.lineas || []).map((l) => `${l.cantidad}× ${l.nombre || nombreDeArticulo(l.articuloId)}`).join(', ') || '—'}</p>
                {/* Un pedido sin confirmar no vale «$0.00»: no tiene precio
                    todavía. Enseñar un cero ahí hace pensar que es gratis. */}
                <p className="staff-total">
                  <b>{o.estado === 'solicitado' ? 'Sin precio todavía' : moneda(o.total)}</b>
                </p>
                {/* Un pedido del alumno todavía no tiene precios ni reserva
                    nada: lo único que se puede hacer con él es confirmarlo (o
                    cancelarlo). Ofrecer «entregar» aquí prometería material
                    que nadie ha apartado. */}
                {o.estado === 'solicitado' && (
                  <>
                    <p className="staff-ayuda">
                      Lo pidió desde la tienda. Al confirmarlo se le ponen los precios del
                      catálogo de ahora y pasa a reservar material.
                    </p>
                    <div className="staff-orden-acciones">
                      <button type="button" className="btn btn--sm btn--primario" onClick={() => confirmar(o)} disabled={Boolean(ocupado)}>
                        {ocupado === `confirmar:${o.id}` ? 'Confirmando…' : 'Confirmar y poner precios'}
                      </button>
                      {forzable === o.id && (
                        <button type="button" className="btn btn--sm" onClick={() => confirmar(o, true)} disabled={Boolean(ocupado)}>
                          Confirmar de todas formas
                        </button>
                      )}
                      <button type="button" className="ui-enlace" onClick={() => cancelar(o)} disabled={Boolean(ocupado)}>
                        Cancelar
                      </button>
                    </div>
                  </>
                )}

                {/* COBRAR AQUÍ MISMO. Solo si ese pedido dejó un compromiso con
                    saldo: si ya está pagado, enseñar un formulario de cobro
                    invita a cobrar dos veces. */}
                {compromisoDe(o.id) && (
                  <CobroDelPedido
                    compromiso={compromisoDe(o.id)}
                    alumno={alumno}
                    academiaId={academiaId}
                    miUid={miUid}
                    onCobrado={async (res) => {
                      setAviso(res.liquidado
                        ? 'Cobrado y liquidado. Ya solo queda entregarlo.'
                        : 'Abono registrado. El resto sigue pendiente en su cuenta.')
                      // Liquidado = la cuenta del pedido pasa a «pagado», que es
                      // lo que después permite entregarlo sin cobrar otra vez.
                      if (res.liquidado && o.estado === 'apartado') {
                        try {
                          const { marcarPagada: hacer } = await import('../../lib/firebase/staff/tienda.js')
                          await hacer({ ordenId: o.id, academiaId })
                        } catch { /* el dinero ya está registrado; el estado se puede mover a mano */ }
                      }
                      await Promise.all([recargar(), cargarCatalogo()])
                    }}
                  />
                )}

                {o.estado !== 'entregado' && o.estado !== 'cancelado' && o.estado !== 'solicitado' && (
                  <div className="staff-orden-acciones">
                    {o.estado === 'apartado' && (
                      <button type="button" className="btn btn--sm" onClick={() => marcarPagada(o)} disabled={Boolean(ocupado)}>
                        Marcar pagada
                      </button>
                    )}
                    <button type="button" className="btn btn--sm btn--primario" onClick={() => entregar(o)} disabled={Boolean(ocupado)}>
                      {ocupado === `entregar:${o.id}` ? 'Entregando…' : 'Entregar y descontar'}
                    </button>
                    <button type="button" className="ui-enlace" onClick={() => cancelar(o)} disabled={Boolean(ocupado)}>
                      Cancelar
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
    </section>
  )
}

// ============================================================
//  Cobrar el pedido sin salir de la tienda
// ------------------------------------------------------------
//  Se pidió el 21-09-2026: «debería poder procesar pagos desde ahí para no
//  estarse moviendo». Antes había que confirmar el pedido aquí, cambiar a la
//  pestaña de caja, buscar el importe y cobrarlo a mano.
//
//  NO ES UN SEGUNDO CAMINO PARA EL DINERO, y esa es la parte importante: esto
//  llama a la MISMA función `cobrar()` que la caja de la ficha, con el mismo
//  asiento, la misma auditoría y el mismo compromiso detrás. Lo único que
//  cambia es dónde está el botón.
//
//  ACEPTA IMPORTES PARCIALES: el campo viene con lo que falta, pero se puede
//  escribir menos y queda como abono. Es literalmente el caso que se pidió —«te
//  doy $500 de los $3 000»— y por eso el importe no está fijo.
// ============================================================
function CobroDelPedido({ compromiso, alumno, academiaId, miUid, onCobrado }) {
  const [monto, setMonto] = useState(String(compromiso.saldo))
  const [metodo, setMetodo] = useState('efectivo')
  const [confirmando, setConfirmando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const clase = claseDeAbono(compromiso, monto, compromiso.abonos)

  const cobrar = async () => {
    if (clase.tipo === 'invalido') { setError(clase.problema); return }
    if (!confirmando) { setConfirmando(true); return }
    setGuardando(true)
    setError('')
    try {
      const { cobrar: registrar } = await import('../../lib/firebase/staff/caja.js')
      const res = await registrar({
        cobro: {
          monto,
          concepto: compromiso.concepto,
          metodo,
          referencia: '',
          nota: '',
          adeudoId: compromiso.id,
        },
        alumno,
        academiaId,
        registradoPor: miUid,
      })
      setConfirmando(false)
      await onCobrado?.(res)
    } catch (err) {
      setError(textoDeError(err, 'No se pudo registrar el cobro', 'pagos'))
      setConfirmando(false)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="staff-cobro-pedido">
      <p className="staff-ayuda">
        Debe {moneda(compromiso.saldo)} de {moneda(compromiso.total)}. Puedes cobrarlo entero o
        recibir un abono: escribe menos y el resto sigue pendiente.
      </p>
      <div className="ui-herramientas">
        <label className="ui-campo">
          <span>Importe</span>
          <input
            type="number" min="1" step="0.01" inputMode="decimal"
            value={monto}
            onChange={(e) => { setMonto(e.target.value); setConfirmando(false); setError('') }}
          />
        </label>
        <label className="ui-campo">
          <span>Cómo paga</span>
          <select value={metodo} onChange={(e) => { setMetodo(e.target.value); setConfirmando(false) }}>
            {METODOS_PAGO.map((m) => <option key={m.id} value={m.id}>{m.etiqueta}</option>)}
          </select>
        </label>
        <button
          type="button" className="btn btn--sm btn--primario"
          onClick={cobrar}
          disabled={guardando}
        >
          {guardando
            ? 'Registrando…'
            : (confirmando
              ? `Confirmar ${moneda(monto)} en ${etiquetaMetodo(metodo).toLowerCase()}`
              : (clase.tipo === 'liquidacion' ? 'Cobrar y liquidar' : 'Registrar abono'))}
        </button>
      </div>
      {error && <p className="ui-nota-error" role="alert">{error}</p>}
      {confirmando && (
        <p className="staff-aviso" role="status">
          Un cobro registrado no se edita ni se borra. Comprueba el importe y confirma.
        </p>
      )}
    </div>
  )
}
