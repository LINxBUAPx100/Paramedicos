import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useOutletContext, useSearchParams } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { CarritoProvider, useCarrito } from '../../context/CarritoContext.jsx'
import BuscadorTienda from '../../components/tienda/BuscadorTienda.jsx'
import { filtrosDesdeParams, paramsDesdeFiltros } from '../../lib/tiendaVista.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import '../../styles/tienda.css'

// ============================================================
//  La tienda — armazón común de catálogo, producto y carrito
// ------------------------------------------------------------
//  Se pidió que funcione «como Amazon o Mercado Libre». Lo que de esas dos
//  hace falta copiar no es el color, es la MECÁNICA:
//
//   · una barra de búsqueda fija arriba, siempre alcanzable;
//   · el carrito visible con su contador, desde cualquier pantalla;
//   · una dirección por producto, para poder compartirla y para que «atrás»
//     funcione;
//   · los filtros en la URL, para que «atrás» deshaga un filtro en vez de
//     sacarte de la tienda.
//
//  Lo que NO se copia es el aspecto: esto sigue siendo PTEM. Mismos tokens,
//  misma tipografía, mismos botones que el resto de la aplicación.
//
//  ── POR QUÉ EL CATÁLOGO SE CARGA AQUÍ Y NO EN CADA PANTALLA.
//
//  Las tres lo necesitan: el catálogo para pintarlo, la ficha para encontrar
//  su artículo, y el carrito para poner nombre y precio a lo guardado. Con una
//  carga por pantalla, moverse entre ellas volvería a leer la colección entera
//  cada vez —y se paga por lectura—. Se lee una vez y baja por el contexto.
// ============================================================
export default function TiendaLayout() {
  const { academiaId, academia, perfil, user } = useAuth()
  const [catalogo, setCatalogo] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    if (!academiaId) { setCargando(false); return }
    setCargando(true)
    setError('')
    try {
      const { catalogoDeAcademia, misPedidos } = await import('../../lib/firebase/tienda.js')
      const [lista, mios] = await Promise.all([
        catalogoDeAcademia(academiaId),
        misPedidos({ uid: user?.uid, academiaId }).catch(() => []),
      ])
      setCatalogo(lista)
      setPedidos(mios)
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar la tienda', 'articulos'))
    } finally {
      setCargando(false)
    }
  }, [academiaId, user?.uid])

  useEffect(() => { cargar() }, [cargar])

  const alumno = useMemo(
    () => ({ ...(perfil || {}), uid: user?.uid || perfil?.id }),
    [perfil, user?.uid]
  )

  return (
    <CarritoProvider academiaId={academiaId} catalogo={catalogo}>
      <Marco
        academia={academia}
        academiaId={academiaId}
        alumno={alumno}
        catalogo={catalogo}
        pedidos={pedidos}
        cargando={cargando}
        error={error}
        recargar={cargar}
      />
    </CarritoProvider>
  )
}

function Marco({ academia, academiaId, alumno, catalogo, pedidos, cargando, error, recargar }) {
  const { piezas } = useCarrito()
  const [params, setParams] = useSearchParams()
  const filtros = useMemo(() => filtrosDesdeParams(params), [params])

  // Los filtros viven en la URL, no en el estado: es lo que hace que «atrás»
  // deshaga un filtro y que una búsqueda se pueda compartir.
  const cambiarFiltros = useCallback((siguientes) => {
    setParams(paramsDesdeFiltros(siguientes), { replace: false })
  }, [setParams])

  const abiertos = pedidos.filter((p) => p.estado !== 'entregado' && p.estado !== 'cancelado').length

  return (
    <div className="tienda">
      <header className="tienda-barra">
        <Link to="/tienda" className="tienda-marca">
          <Icon name="carpeta" size={20} />
          <span>{academia?.nombre || 'Tienda'}</span>
        </Link>

        <BuscadorTienda
          catalogo={catalogo}
          filtros={filtros}
          onCambiar={cambiarFiltros}
        />

        <nav className="tienda-barra-acciones" aria-label="Tu tienda">
          <NavLink to="/tienda/pedidos" className="tienda-accion">
            <Icon name="archivo" size={18} />
            <span>Mis pedidos</span>
            {abiertos > 0 && <b className="tienda-globo">{abiertos}</b>}
          </NavLink>
          <NavLink to="/tienda/carrito" className="tienda-accion tienda-accion--carrito">
            <Icon name="carpeta" size={18} />
            <span>Carrito</span>
            {piezas > 0 && <b className="tienda-globo">{piezas}</b>}
          </NavLink>
        </nav>
      </header>

      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      <Outlet context={{ academia, academiaId, alumno, catalogo, pedidos, cargando, recargar, filtros, cambiarFiltros }} />
    </div>
  )
}

/** El contexto del armazón, para las tres pantallas de dentro. */
export function useTienda() {
  return useOutletContext()
}
