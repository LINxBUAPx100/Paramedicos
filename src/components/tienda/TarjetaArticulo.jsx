import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useCarrito } from '../../context/CarritoContext.jsx'
import { etiquetaCategoria } from '../../lib/tiendaModelo.js'
import { moneda } from '../../lib/staff/cajaModelo.js'

// ============================================================
//  La tarjeta de un artículo en la rejilla
// ------------------------------------------------------------
//  TODA LA TARJETA ES UN ENLACE a la ficha del producto, y el control de
//  cantidad va ENCIMA con su propio `stopPropagation`. Es lo que hacen las
//  tiendas grandes y no es capricho: en una rejilla, obligar a apuntar al
//  título con el dedo para abrir el detalle es la diferencia entre mirar diez
//  productos y mirar dos.
//
//  DOS ESTADOS DEL BOTÓN, y el segundo es el que importa: en cuanto hay algo
//  en el carrito, el botón se convierte en el control de cantidad. Así se
//  pueden añadir tres sin entrar al producto ni ir al carrito — que es el
//  gesto que más se repite cuando alguien compra material para el semestre.
// ============================================================
export default function TarjetaArticulo({ articulo }) {
  const { cantidadDe, sumar } = useCarrito()
  const enCarrito = cantidadDe(articulo.id)
  const agotado = Number(articulo.existencias) <= 0
  const pocas = !agotado && Number(articulo.existencias) <= 3

  const alPulsar = (e, delta) => {
    e.preventDefault()
    e.stopPropagation()
    sumar(articulo, delta)
  }

  return (
    <li className={`tienda-tarjeta ${agotado ? 'es-agotada' : ''}`}>
      <Link to={`/tienda/articulo/${articulo.id}`} className="tienda-tarjeta-enlace">
        <div className="tienda-img">
          {articulo.imagen
            ? <img src={articulo.imagen} alt="" loading="lazy" />
            : <span className="tienda-sin-img" aria-hidden="true"><Icon name="carpeta" size={30} /></span>}
          {agotado && <span className="tienda-cinta">Agotado</span>}
        </div>

        <div className="tienda-datos">
          <span className="tienda-categoria">{etiquetaCategoria(articulo.categoria)}</span>
          <h3>{articulo.nombre}</h3>
          <p className="tienda-precio">{moneda(articulo.precio)}</p>
          {/* «Quedan 2» es información de compra, no decoración: en una tienda
              de academia el inventario es corto de verdad. */}
          {pocas && <p className="tienda-pocas">¡Quedan {articulo.existencias}!</p>}
          {!agotado && !pocas && <p className="tienda-stock">{articulo.existencias} disponibles</p>}
        </div>
      </Link>

      <div className="tienda-tarjeta-accion">
        {agotado ? (
          <span className="staff-ayuda">Pregunta en recepción cuándo llega</span>
        ) : enCarrito > 0 ? (
          <span className="tienda-cantidad">
            <button type="button" onClick={(e) => alPulsar(e, -1)} aria-label={`Quitar uno de ${articulo.nombre}`}>
              <Icon name="menos" size={16} />
            </button>
            <b aria-live="polite">{enCarrito}</b>
            <button
              type="button"
              onClick={(e) => alPulsar(e, 1)}
              disabled={enCarrito >= articulo.existencias}
              aria-label={`Añadir uno de ${articulo.nombre}`}
            >
              <Icon name="mas" size={16} />
            </button>
          </span>
        ) : (
          <button type="button" className="btn btn--primario btn--sm" onClick={(e) => alPulsar(e, 1)}>
            Agregar
          </button>
        )}
      </div>
    </li>
  )
}
