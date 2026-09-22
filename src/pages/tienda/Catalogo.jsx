import { useMemo } from 'react'
import Icon from '../../components/Icon.jsx'
import FiltrosTienda from '../../components/tienda/FiltrosTienda.jsx'
import TarjetaArticulo from '../../components/tienda/TarjetaArticulo.jsx'
import { useTienda } from './TiendaLayout.jsx'
import { aplicar, chips, quitar, sinResultados } from '../../lib/tiendaVista.js'
import { moneda } from '../../lib/staff/cajaModelo.js'

// ============================================================
//  Catálogo — la rejilla, con sus filtros al lado
// ------------------------------------------------------------
//  Es la pantalla que se parece a Mercado Libre: filtros a la izquierda,
//  rejilla a la derecha, pastillas arriba con lo que llevas puesto.
//
//  LAS PASTILLAS NO SON DECORACIÓN. Son la salida del callejón sin salida de
//  toda tienda: cuatro filtros puestos, cero resultados, y ninguna pista de
//  cuál sobra. Con ellas se quita el que estorba de un clic, sin adivinar.
// ============================================================
export default function Catalogo() {
  const { catalogo, cargando, filtros, cambiarFiltros } = useTienda()

  const resultados = useMemo(() => aplicar(catalogo, filtros), [catalogo, filtros])
  const pastillas = chips(filtros, { moneda })
  const vacio = sinResultados(filtros)

  return (
    <div className="tienda-catalogo">
      <FiltrosTienda
        catalogo={catalogo}
        filtros={filtros}
        onCambiar={cambiarFiltros}
        resultados={resultados.length}
      />

      <main className="tienda-resultados">
        {pastillas.length > 0 && (
          <div className="tienda-pastillas" aria-label="Filtros puestos">
            {pastillas.map((c) => (
              <button
                key={c.id}
                type="button"
                className="tienda-pastilla"
                onClick={() => cambiarFiltros(quitar(filtros, c.id))}
              >
                {c.etiqueta}
                <Icon name="cerrar" size={13} />
              </button>
            ))}
          </div>
        )}

        {cargando && (
          // Esqueleto y no un «Cargando…»: la rejilla no salta de tamaño al
          // llegar los datos, que es lo que hace pulsar el artículo de al lado.
          <ul className="tienda-rejilla" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => <li key={i} className="tienda-tarjeta es-esqueleto" />)}
          </ul>
        )}

        {!cargando && resultados.length === 0 && (
          <div className="tienda-vacio" role="status">
            <Icon name="buscar" size={32} />
            <h2>{vacio.titulo}</h2>
            <p>{vacio.texto}</p>
            {vacio.accion && (
              <button
                type="button"
                className="btn btn--primario"
                onClick={() => cambiarFiltros(quitar(filtros, vacio.accion))}
              >
                {vacio.accionEtiqueta}
              </button>
            )}
          </div>
        )}

        {!cargando && resultados.length > 0 && (
          <>
            <p className="tienda-cuenta" role="status">
              {resultados.length} resultado{resultados.length === 1 ? '' : 's'}
            </p>
            <ul className="tienda-rejilla">
              {resultados.map((a) => <TarjetaArticulo key={a.id} articulo={a} />)}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}
