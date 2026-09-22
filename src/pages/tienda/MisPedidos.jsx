import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import { useTienda } from './TiendaLayout.jsx'
import { ESTADOS_ORDEN, etiquetaEstado } from '../../lib/staff/carritoModelo.js'
import { fechaCorta, moneda } from '../../lib/staff/cajaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Mis pedidos — en qué va cada uno
// ------------------------------------------------------------
//  LA LÍNEA DE ESTADOS es lo que se copia de las tiendas grandes, y es lo que
//  quita el noventa por ciento de las preguntas en el mostrador: quien ve
//  «Pedido → Apartado → Pagado → Entregado» con su punto encendido no necesita
//  preguntar en qué va.
//
//  Un pedido SIN CONFIRMAR se dice tal cual, con lo que eso significa: todavía
//  no reserva material ni tiene precio. Esconderlo haría creer que ya está
//  apartado, y esa confusión acaba en alguien viniendo a recoger algo que
//  nadie le guardó.
// ============================================================
const PASOS = ESTADOS_ORDEN.filter((e) => e.id !== 'cancelado')

export default function MisPedidos() {
  const { pedidos, catalogo, cargando, recargar } = useTienda()
  const [params] = useSearchParams()
  const [error, setError] = useState('')
  const [cancelando, setCancelando] = useState('')

  const nombreDe = (id) => catalogo.find((a) => a.id === id)?.nombre || 'Artículo'

  const cancelar = async (pedido) => {
    setCancelando(pedido.id)
    setError('')
    try {
      const { cancelarMiPedido } = await import('../../lib/firebase/tienda.js')
      await cancelarMiPedido(pedido.id)
      await recargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cancelar el pedido', 'ordenes'))
    } finally {
      setCancelando('')
    }
  }

  return (
    <div className="tienda-pedidos">
      <nav className="tienda-migas" aria-label="Dónde estás">
        <Link to="/tienda">Tienda</Link>
        <Icon name="chevronDer" size={14} />
        <span>Mis pedidos</span>
      </nav>

      <h1>Mis pedidos</h1>

      {params.get('nuevo') === '1' && (
        <p className="staff-aviso" role="status">
          Pedido enviado. Pásate por recepción para confirmarlo, pagarlo y recogerlo.
        </p>
      )}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}
      {cargando && <p className="staff-ayuda" role="status">Cargando…</p>}

      {!cargando && pedidos.length === 0 && (
        <div className="tienda-vacio" role="status">
          <Icon name="archivo" size={32} />
          <h2>Todavía no has pedido nada</h2>
          <p>Cuando mandes un pedido desde la tienda, aquí podrás seguir en qué va.</p>
          <Link className="btn btn--primario" to="/tienda">Ver la tienda</Link>
        </div>
      )}

      <ul className="tienda-lista-pedidos">
        {pedidos.map((o) => {
          const cancelado = o.estado === 'cancelado'
          const paso = PASOS.findIndex((p) => p.id === o.estado)
          return (
            <li key={o.id} className={`tienda-pedido ${cancelado ? 'es-cancelado' : ''}`}>
              <header>
                <div>
                  <b>{etiquetaEstado(o.estado)}</b>
                  <span className="staff-ayuda">{fechaCorta(o.creado)}</span>
                </div>
                {o.estado !== 'solicitado' && <b className="tienda-pedido-total">{moneda(o.total)}</b>}
              </header>

              {!cancelado && (
                <ol className="tienda-pasos" aria-label="En qué va el pedido">
                  {PASOS.map((p, i) => (
                    <li key={p.id} className={i <= paso ? 'es-hecho' : ''}>
                      <span className="tienda-paso-punto" aria-hidden="true" />
                      <span>{p.etiqueta}</span>
                    </li>
                  ))}
                </ol>
              )}

              <ul className="tienda-pedido-lineas">
                {(o.lineas || []).map((l, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={`${o.id}-${i}`}>
                    {l.cantidad} × {l.nombre || nombreDe(l.articuloId)}
                    {l.precio ? <span className="staff-ayuda"> · {moneda(l.precio)}</span> : null}
                  </li>
                ))}
              </ul>

              {o.estado === 'solicitado' && (
                <>
                  <p className="staff-ayuda">
                    Sin confirmar todavía: no reserva material ni tiene precio hasta que recepción
                    lo revise.
                  </p>
                  <button
                    type="button"
                    className="ui-enlace"
                    onClick={() => cancelar(o)}
                    disabled={cancelando === o.id}
                  >
                    {cancelando === o.id ? 'Cancelando…' : 'Cancelar este pedido'}
                  </button>
                </>
              )}

              {o.estado === 'apartado' && (
                <p className="staff-ayuda">Te lo estamos guardando. Pásate por recepción a pagarlo.</p>
              )}
              {o.estado === 'pagado' && (
                <p className="staff-ayuda">Pagado. Pásate por recepción a recogerlo.</p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
