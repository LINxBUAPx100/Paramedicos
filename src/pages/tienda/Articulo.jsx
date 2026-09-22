import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import TarjetaArticulo from '../../components/tienda/TarjetaArticulo.jsx'
import { useTienda } from './TiendaLayout.jsx'
import { useCarrito } from '../../context/CarritoContext.jsx'
import { etiquetaCategoria } from '../../lib/tiendaModelo.js'
import { moneda } from '../../lib/staff/cajaModelo.js'

// ============================================================
//  Ficha de producto — la pantalla que faltaba
// ------------------------------------------------------------
//  TIENE DIRECCIÓN PROPIA (`/tienda/articulo/<id>`), y eso es lo que la
//  convierte en una tienda de verdad: se puede mandar por WhatsApp, se puede
//  guardar, y el botón «atrás» devuelve al catálogo con los filtros que
//  estaban puestos —porque los filtros también viven en la URL—.
//
//  DOS BOTONES, como en Amazon y Mercado Libre, y significan cosas distintas:
//
//   · «Agregar al carrito» sigue comprando.
//   · «Pedirlo ahora» va derecho al carrito. Es el atajo de quien entró a por
//     una cosa, que es la mayoría.
//
//  Y ABAJO, MÁS DE SU CATEGORÍA: en un catálogo corto, la pregunta después de
//  ver un uniforme casi siempre es «¿qué más hay de uniformes?».
// ============================================================
export default function Articulo() {
  const { articuloId } = useParams()
  const { catalogo, cargando } = useTienda()
  const { cantidadDe, sumar, poner } = useCarrito()
  const navegar = useNavigate()

  const articulo = useMemo(
    () => catalogo.find((a) => a.id === articuloId) || null,
    [catalogo, articuloId]
  )

  const relacionados = useMemo(() => (
    articulo
      ? catalogo.filter((a) => a.id !== articulo.id && a.categoria === articulo.categoria).slice(0, 4)
      : []
  ), [catalogo, articulo])

  if (cargando) return <p className="staff-ayuda" role="status">Cargando…</p>

  if (!articulo) {
    return (
      <div className="tienda-vacio" role="status">
        <Icon name="alerta" size={32} />
        <h2>Ese artículo ya no está</h2>
        <p>Puede que tu academia lo haya despublicado. Vuelve al catálogo para ver lo que hay.</p>
        <Link className="btn btn--primario" to="/tienda">Ver la tienda</Link>
      </div>
    )
  }

  const enCarrito = cantidadDe(articulo.id)
  const agotado = Number(articulo.existencias) <= 0

  const pedirAhora = () => {
    if (!enCarrito) sumar(articulo, 1)
    navegar('/tienda/carrito')
  }

  return (
    <div className="tienda-ficha">
      <nav className="tienda-migas" aria-label="Dónde estás">
        <Link to="/tienda">Tienda</Link>
        <Icon name="chevronDer" size={14} />
        <Link to={`/tienda?cat=${articulo.categoria}`}>{etiquetaCategoria(articulo.categoria)}</Link>
        <Icon name="chevronDer" size={14} />
        <span>{articulo.nombre}</span>
      </nav>

      <div className="tienda-ficha-cuerpo">
        <div className="tienda-ficha-img">
          {articulo.imagen
            ? <img src={articulo.imagen} alt={articulo.nombre} />
            : <span className="tienda-sin-img" aria-hidden="true"><Icon name="carpeta" size={48} /></span>}
        </div>

        <div className="tienda-ficha-datos">
          <span className="tienda-categoria">{etiquetaCategoria(articulo.categoria)}</span>
          <h1>{articulo.nombre}</h1>
          <p className="tienda-ficha-precio">{moneda(articulo.precio)}</p>

          {agotado
            ? <p className="tienda-ficha-stock staff-agotado">Agotado ahora mismo. Pregunta en recepción cuándo llega.</p>
            : (
              <p className="tienda-ficha-stock">
                <Icon name="check" size={16} />
                {articulo.existencias <= 3
                  ? ` ¡Solo quedan ${articulo.existencias}!`
                  : ` ${articulo.existencias} disponibles`}
              </p>
            )}

          {articulo.descripcion && <p className="tienda-ficha-desc">{articulo.descripcion}</p>}

          {!agotado && (
            <div className="tienda-ficha-compra">
              <label className="ui-campo tienda-ficha-cantidad">
                <span>Cantidad</span>
                <select
                  value={enCarrito || 1}
                  onChange={(e) => poner(articulo.id, e.target.value, articulo.existencias)}
                >
                  {Array.from({ length: Math.min(10, articulo.existencias) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>

              <div className="tienda-ficha-botones">
                <button
                  type="button"
                  className="btn btn--primario"
                  onClick={() => sumar(articulo, 1)}
                  disabled={enCarrito >= articulo.existencias}
                >
                  <Icon name="mas" size={18} />
                  {enCarrito > 0 ? `Añadir otro (llevas ${enCarrito})` : 'Agregar al carrito'}
                </button>
                <button type="button" className="btn" onClick={pedirAhora}>
                  Pedirlo ahora
                </button>
              </div>
            </div>
          )}

          {/* Se dice ANTES de pedir, no después: el pago es en el mostrador y
              prometer un cobro en línea que no existe sería peor que no
              ofrecerlo. Cuando llegue la pasarela, esta nota cambia y la
              mecánica de la tienda no. */}
          {/* El texto va dentro de UN span: el contenedor es `display:flex` y
              sin él cada trozo suelto —y el <strong>— se convertía en un ítem
              de flex por su cuenta, y la frase salía partida y descolocada. */}
          <p className="tienda-ficha-nota">
            <Icon name="alerta" size={15} />
            <span>
              Los precios son los del catálogo de tu academia. El pedido se confirma, se paga y se
              recoge en <strong>recepción</strong>: todavía no hay cobro en línea.
            </span>
          </p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="tienda-relacionados">
          <h2>Más de {etiquetaCategoria(articulo.categoria)}</h2>
          <ul className="tienda-rejilla">
            {relacionados.map((a) => <TarjetaArticulo key={a.id} articulo={a} />)}
          </ul>
        </section>
      )}
    </div>
  )
}
