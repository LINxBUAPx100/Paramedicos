import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { sugerencias } from '../../lib/tiendaVista.js'

// ============================================================
//  El buscador de la tienda, con sugerencias
// ------------------------------------------------------------
//  LAS SUGERENCIAS SON NOMBRES DE ARTÍCULOS REALES, no un historial. En un
//  catálogo de cincuenta piezas, adivinar lo que EXISTE vale mucho más que
//  recordar lo que se buscó ayer: quien escribe «pla» quiere ver «Playera
//  institucional» y pulsarla, no leer sus búsquedas anteriores.
//
//  Y se calculan en memoria sobre el catálogo que ya está cargado: ni una
//  lectura más, ni un servicio de búsqueda que haya que pagar. A la escala de
//  una academia eso es de sobra, y el día que no lo sea se cambia
//  `lib/tiendaVista.js` sin tocar esta pantalla.
//
//  EL TECLADO FUNCIONA: flechas para moverse, Enter para abrir, Escape para
//  cerrar. Una lista de sugerencias que solo responde al ratón estorba más de
//  lo que ayuda a quien escribe rápido.
// ============================================================
export default function BuscadorTienda({ catalogo = [], filtros, onCambiar }) {
  const [texto, setTexto] = useState(filtros?.texto || '')
  const [abierto, setAbierto] = useState(false)
  const [activa, setActiva] = useState(-1)
  const caja = useRef(null)
  const navegar = useNavigate()

  // Si el filtro cambia desde fuera —al pulsar «atrás», o al quitar la
  // pastilla de búsqueda— el campo tiene que seguirlo.
  useEffect(() => { setTexto(filtros?.texto || '') }, [filtros?.texto])

  useEffect(() => {
    const fuera = (e) => { if (caja.current && !caja.current.contains(e.target)) setAbierto(false) }
    document.addEventListener('mousedown', fuera)
    return () => document.removeEventListener('mousedown', fuera)
  }, [])

  const lista = abierto ? sugerencias(catalogo, texto) : []

  const buscar = (e) => {
    e?.preventDefault()
    setAbierto(false)
    setActiva(-1)
    onCambiar?.({ ...filtros, texto })
    navegar({ pathname: '/tienda', search: new URLSearchParams(
      Object.entries({ q: texto }).filter(([, v]) => v)
    ).toString() })
  }

  const abrirArticulo = (id) => {
    setAbierto(false)
    setActiva(-1)
    navegar(`/tienda/articulo/${id}`)
  }

  const teclas = (e) => {
    if (!lista.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiva((i) => Math.min(lista.length - 1, i + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiva((i) => Math.max(-1, i - 1)) }
    if (e.key === 'Escape') { setAbierto(false); setActiva(-1) }
    if (e.key === 'Enter' && activa >= 0) { e.preventDefault(); abrirArticulo(lista[activa].id) }
  }

  return (
    <div className="tienda-buscador" ref={caja}>
      <form onSubmit={buscar} role="search">
        <Icon name="buscar" size={18} />
        <input
          type="search"
          value={texto}
          onChange={(e) => { setTexto(e.target.value); setAbierto(true); setActiva(-1) }}
          onFocus={() => setAbierto(true)}
          onKeyDown={teclas}
          placeholder="Buscar uniformes, libros, material…"
          aria-label="Buscar en la tienda"
          aria-expanded={lista.length > 0}
          autoComplete="off"
        />
        {texto && (
          <button
            type="button"
            className="tienda-buscador-limpiar"
            onClick={() => { setTexto(''); onCambiar?.({ ...filtros, texto: '' }) }}
            aria-label="Borrar la búsqueda"
          >
            <Icon name="cerrar" size={16} />
          </button>
        )}
        <button type="submit" className="btn btn--primario tienda-buscador-enviar">Buscar</button>
      </form>

      {lista.length > 0 && (
        <ul className="tienda-sugerencias" role="listbox">
          {lista.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={i === activa ? 'es-activa' : ''}
                onMouseEnter={() => setActiva(i)}
                onClick={() => abrirArticulo(s.id)}
                role="option"
                aria-selected={i === activa}
              >
                <Icon name="buscar" size={14} />
                <span>{s.nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
