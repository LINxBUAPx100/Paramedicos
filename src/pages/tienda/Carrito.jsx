import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import { useTienda } from './TiendaLayout.jsx'
import { useCarrito } from '../../context/CarritoContext.jsx'
import { moneda } from '../../lib/staff/cajaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Carrito — revisar y mandar el pedido a recepción
// ------------------------------------------------------------
//  EL RESUMEN VA PEGADO, como en las dos tiendas que se citaron: en una lista
//  larga, tener que bajar hasta el final para ver el total y el botón es lo
//  que hace abandonar un pedido a medias.
//
//  EL IMPORTE SE LLAMA ORIENTATIVO, Y SE DICE POR QUÉ. No es humildad: el
//  pedido viaja SIN precios a propósito (ver `lib/tiendaModelo.js`), y el que
//  se cobra lo calcula recepción con el catálogo del momento de confirmar.
//  Enseñar un total exacto que después puede cambiar es peor que avisar.
// ============================================================
export default function Carrito() {
  const { academiaId, alumno, recargar } = useTienda()
  const { detalladas, piezas, total, problemas, poner, quitar, vaciar, lineas } = useCarrito()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const navegar = useNavigate()

  const enviar = async () => {
    setEnviando(true)
    setError('')
    try {
      const { crearPedido } = await import('../../lib/firebase/tienda.js')
      await crearPedido({ carrito: lineas, alumno, academiaId })
      vaciar()
      await recargar()
      navegar('/tienda/pedidos?nuevo=1')
    } catch (err) {
      setError(textoDeError(err, 'No se pudo enviar el pedido', 'ordenes'))
    } finally {
      setEnviando(false)
    }
  }

  if (detalladas.length === 0) {
    return (
      <div className="tienda-vacio" role="status">
        <Icon name="carpeta" size={32} />
        <h2>Tu carrito está vacío</h2>
        <p>Lo que vayas agregando desde la tienda aparecerá aquí.</p>
        <Link className="btn btn--primario" to="/tienda">Ver la tienda</Link>
      </div>
    )
  }

  return (
    <div className="tienda-carrito-pagina">
      <nav className="tienda-migas" aria-label="Dónde estás">
        <Link to="/tienda">Tienda</Link>
        <Icon name="chevronDer" size={14} />
        <span>Carrito</span>
      </nav>

      <div className="tienda-carrito-cuerpo">
        <section className="tienda-carrito-lista" aria-label="Artículos de tu pedido">
          <h1>Tu pedido</h1>

          <ul>
            {detalladas.map((l) => (
              <li key={l.articuloId} className="tienda-linea">
                <Link to={`/tienda/articulo/${l.articuloId}`} className="tienda-linea-img">
                  {l.articulo.imagen
                    ? <img src={l.articulo.imagen} alt="" loading="lazy" />
                    : <span className="tienda-sin-img" aria-hidden="true"><Icon name="carpeta" size={22} /></span>}
                </Link>

                <div className="tienda-linea-datos">
                  <Link to={`/tienda/articulo/${l.articuloId}`}><b>{l.articulo.nombre}</b></Link>
                  <span className="staff-ayuda">{moneda(l.articulo.precio)} cada uno</span>
                  {l.cantidad > l.articulo.existencias && (
                    <span className="staff-agotado">
                      Solo quedan {l.articulo.existencias}: ajusta la cantidad.
                    </span>
                  )}
                </div>

                <label className="ui-campo tienda-linea-cantidad">
                  <span className="staff-sr">Cantidad de {l.articulo.nombre}</span>
                  <select
                    value={l.cantidad}
                    onChange={(e) => poner(l.articuloId, e.target.value, l.articulo.existencias)}
                  >
                    {Array.from(
                      { length: Math.max(1, Math.min(10, l.articulo.existencias)) },
                      (_, i) => i + 1
                    ).map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>

                <b className="tienda-linea-subtotal">{moneda(l.subtotal)}</b>

                <button type="button" className="ui-enlace" onClick={() => quitar(l.articuloId)}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <button type="button" className="ui-enlace" onClick={vaciar}>Vaciar el carrito</button>
        </section>

        <aside className="tienda-resumen" aria-label="Resumen del pedido">
          <h2>Resumen</h2>
          <p className="tienda-resumen-linea">
            <span>{piezas} pieza{piezas === 1 ? '' : 's'}</span>
            <b>{moneda(total)}</b>
          </p>
          <p className="staff-ayuda">
            <b>Importe orientativo.</b> El definitivo lo calcula recepción con los precios del
            catálogo al confirmarlo.
          </p>

          {problemas.length > 0 && (
            <ul className="ui-nota-error" role="alert">{problemas.map((p) => <li key={p}>{p}</li>)}</ul>
          )}
          {error && <p className="ui-nota-error" role="alert">{error}</p>}

          <button
            type="button"
            className="btn btn--primario tienda-resumen-enviar"
            onClick={enviar}
            disabled={enviando || problemas.length > 0}
          >
            <Icon name="check" size={18} />
            {enviando ? 'Enviando…' : 'Enviar el pedido a recepción'}
          </button>

          <p className="staff-ayuda">
            No se cobra nada ahora. Recepción lo confirma, te dice el total y lo pagas al
            recogerlo.
          </p>

          <Link className="ui-enlace" to="/tienda">Seguir viendo la tienda</Link>
        </aside>
      </div>
    </div>
  )
}
