import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// El buscador conserva el conjunto autorizado que entrega el padre.
export default function ModulosCarrusel({ modulos, leidos = {} }) {
  const [consulta, setConsulta] = useState('')
  const normalizar = (texto) => String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const visibles = modulos.filter((m) => normalizar(`${m.titulo} ${m.subtitulo}`).includes(normalizar(consulta)))
  return (
    <>
      <div className="ui-modulos ph-wrap">
        <label className="ui-campo">Encontrar un módulo
          <input type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} placeholder="Nombre o especialidad" />
        </label>
        <p className="ui-modulos-conteo" role="status">{visibles.length} de {modulos.length} módulos</p>
        {visibles.length === 0 && <p className="ui-estado">{modulos.length ? 'No hay módulos que coincidan. Prueba con otro nombre.' : 'Todavía no hay módulos disponibles para tu grupo.'}</p>}
      </div>
      {/* Al cambiar los resultados, la baraja vuelve a su primera tarjeta. */}
      {visibles.length > 0 && <BarajaModulos key={visibles.map((m) => m.id).join('|')} modulos={visibles} leidos={leidos} />}
    </>
  )
}

// Baraja "coverflow" de módulos: tarjetas a tamaño completo, apiladas en
// horizontal como naipes sobre una mesa. La tarjeta activa salta al frente,
// grande y enfocada; las demás se desenfocan y atenúan a los lados.
// Navega con chevrons ‹ ›, puntos, click en una tarjeta lateral, swipe y teclado.
function BarajaModulos({ modulos, leidos = {} }) {
  const [activo, setActivo] = useState(0)
  const n = modulos.length
  const ptrX = useRef(null)

  const ir = (i) => setActivo(Math.max(0, Math.min(n - 1, i)))

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(activo + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); ir(activo - 1) }
  }
  const onDown = (e) => { ptrX.current = e.clientX }
  const onUp = (e) => {
    if (ptrX.current == null) return
    const dx = e.clientX - ptrX.current
    ptrX.current = null
    if (dx > 45) ir(activo - 1)
    else if (dx < -45) ir(activo + 1)
  }

  return (
    <div className="deck">
      <button
        className="deck-flecha izq"
        onClick={() => ir(activo - 1)}
        disabled={activo === 0}
        aria-label="Módulo anterior"
      >
        <Icon name="chevronIzq" size={26} />
      </button>

      <div
        className="deck-pista"
        tabIndex={0}
        role="listbox"
        aria-label="Módulos de estudio"
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        {modulos.map((modulo, i) => {
          const offset = i - activo
          const dist = Math.abs(offset)
          const esActivo = offset === 0
          const num = String(modulo.numero).padStart(2, '0')
          const total = modulo.temas.length
          const leidosModulo = modulo.temas.filter((t) => leidos[t.id]).length
          const pct = total ? Math.round((leidosModulo / total) * 100) : 0
          return (
            <article
              key={modulo.id}
              className={`deck-card ${esActivo ? 'is-activo' : ''}`}
              style={{
                '--modulo-color': modulo.color,
                '--offset': offset,
                // La activa SIEMPRE al frente; las traseras detrás, en escalera.
                zIndex: esActivo ? 100 : 50 - dist,
                // Solo desenfocamos las tarjetas cercanas; las lejanas se ocultan
                // (barato para GPU → fluido también en móviles de gama baja).
                opacity: dist > 3 ? 0 : esActivo ? 1 : Math.max(0.34, 1 - dist * 0.16),
                visibility: dist > 3 ? 'hidden' : 'visible',
                filter: esActivo ? 'none' : dist <= 2 ? 'blur(2.4px)' : 'none',
              }}
              role="option"
              aria-selected={esActivo}
              aria-hidden={!esActivo}
              onClick={() => !esActivo && ir(i)}
            >
              <span className="deck-num">{num}</span>
              <div className="deck-body">
                <h3 className="deck-titulo">{modulo.titulo}</h3>
                <p className="deck-sub">{modulo.subtitulo}</p>
                <p className="deck-desc">{modulo.descripcion}</p>
                <div className="deck-pie">
                  <span className="deck-temas">{total} temas</span>
                  <Link
                    to={`/modulo/${modulo.id}`}
                    className="deck-boton"
                    aria-label={`Entrar al módulo ${modulo.numero}`}
                    tabIndex={esActivo ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="chevronDer" size={22} />
                  </Link>
                  <span className="deck-prog">{leidosModulo}/{total}</span>
                </div>
                <div className="deck-barra"><span style={{ width: `${pct}%` }} /></div>
              </div>
            </article>
          )
        })}
      </div>

      <button
        className="deck-flecha der"
        onClick={() => ir(activo + 1)}
        disabled={activo === n - 1}
        aria-label="Módulo siguiente"
      >
        <Icon name="chevronDer" size={26} />
      </button>

      <div className="deck-puntos" role="tablist" aria-label="Ir a modulo">
        {modulos.map((f, i) => (
          <button
            key={f.id}
            className={`deck-punto ${i === activo ? 'on' : ''}`}
            style={{ '--modulo-color': f.color }}
            onClick={() => ir(i)}
            aria-label={`Módulo ${f.numero}: ${f.titulo}`}
            aria-selected={i === activo}
          />
        ))}
      </div>
    </div>
  )
}
