import { useState } from 'react'
import Icon from '../Icon.jsx'
import { ORDENES, facetas, hayFiltros, limpiar } from '../../lib/tiendaVista.js'
import { moneda } from '../../lib/staff/cajaModelo.js'

// ============================================================
//  La barra de filtros — con el número de resultados al lado
// ------------------------------------------------------------
//  EL NÚMERO ES LA MITAD DEL FILTRO. «Libros (3)» dice de antemano que pulsar
//  ahí lleva a algún sitio; «Libros» a secas obliga a probar. Y los contadores
//  se calculan SIN su propio filtro (ver `lib/tiendaVista.js`): con
//  «Uniformes» puesto, al lado de «Libros» sigue diciendo cuántos libros hay,
//  no cero.
//
//  EN MÓVIL SE PLIEGA. Una barra lateral de filtros fija en una pantalla de
//  teléfono empuja el catálogo fuera de la vista, así que ahí es un
//  desplegable que nace cerrado y dice cuántos filtros llevas puestos.
// ============================================================
export default function FiltrosTienda({ catalogo, filtros, onCambiar, resultados }) {
  const [abierto, setAbierto] = useState(false)
  const f = facetas(catalogo, filtros)
  const activos = hayFiltros(filtros)

  const poner = (parcial) => onCambiar({ ...filtros, ...parcial })

  return (
    <aside className={`tienda-filtros ${abierto ? 'es-abierta' : ''}`} aria-label="Filtros">
      <button
        type="button"
        className="tienda-filtros-tirador btn btn--sm"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
      >
        <Icon name="capas" size={16} />
        Filtros{activos ? ' · activos' : ''}
      </button>

      <div className="tienda-filtros-cuerpo">
        <div className="tienda-filtro">
          <h3>Ordenar por</h3>
          <select
            value={filtros.orden}
            onChange={(e) => poner({ orden: e.target.value })}
            aria-label="Ordenar los resultados"
          >
            {ORDENES.map((o) => <option key={o.id} value={o.id}>{o.etiqueta}</option>)}
          </select>
        </div>

        {f.categorias.length > 0 && (
          <div className="tienda-filtro">
            <h3>Categoría</h3>
            <ul className="tienda-facetas">
              <li>
                <button
                  type="button"
                  className={!filtros.categoria ? 'es-activa' : ''}
                  onClick={() => poner({ categoria: '' })}
                >
                  <span>Todas</span>
                  <b>{f.categorias.reduce((s, c) => s + c.total, 0)}</b>
                </button>
              </li>
              {f.categorias.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={filtros.categoria === c.id ? 'es-activa' : ''}
                    onClick={() => poner({ categoria: filtros.categoria === c.id ? '' : c.id })}
                  >
                    <span>{c.etiqueta}</span>
                    <b>{c.total}</b>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="tienda-filtro">
          <h3>Disponibilidad</h3>
          <label className="tienda-check">
            <input
              type="checkbox"
              checked={Boolean(filtros.soloDisponibles)}
              onChange={() => poner({ soloDisponibles: !filtros.soloDisponibles })}
            />
            <span>Solo lo que hay ahora <b>({f.disponibles})</b></span>
          </label>
          {f.agotados > 0 && (
            <p className="staff-ayuda">{f.agotados} agotado(s) en este momento.</p>
          )}
        </div>

        {f.precioMax > 0 && (
          <div className="tienda-filtro">
            <h3>Precio</h3>
            <label className="ui-campo">
              <span>Hasta {filtros.precioMax ? moneda(Number(filtros.precioMax)) : moneda(f.precioMax)}</span>
              <input
                type="range"
                min={0}
                max={Math.ceil(f.precioMax)}
                step={10}
                value={filtros.precioMax === '' ? Math.ceil(f.precioMax) : filtros.precioMax}
                onChange={(e) => poner({
                  // Al soltarlo en el tope se entiende «sin tope», y así la
                  // URL no arrastra un filtro que no filtra nada.
                  precioMax: Number(e.target.value) >= Math.ceil(f.precioMax) ? '' : e.target.value,
                })}
              />
            </label>
            <p className="staff-ayuda">
              Desde {moneda(f.precioMin)} hasta {moneda(f.precioMax)}.
            </p>
          </div>
        )}

        {activos && (
          <button type="button" className="ui-enlace" onClick={() => onCambiar(limpiar(filtros))}>
            Quitar todos los filtros
          </button>
        )}

        <p className="staff-ayuda tienda-filtros-cuenta" role="status">
          {resultados} resultado{resultados === 1 ? '' : 's'}
        </p>
      </div>
    </aside>
  )
}
