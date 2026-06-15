import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Baraja "coverflow" de fases: tarjetas a tamaño completo, apiladas en
// horizontal como naipes sobre una mesa. La tarjeta activa salta al frente,
// grande y enfocada; las demás se desenfocan y atenúan a los lados.
// Navega con chevrons ‹ ›, puntos, click en una tarjeta lateral, swipe y teclado.
export default function FasesCarrusel({ fases, leidos = {} }) {
  const [activo, setActivo] = useState(0)
  const n = fases.length
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
        aria-label="Fase anterior"
      >
        <Icon name="chevronIzq" size={26} />
      </button>

      <div
        className="deck-pista"
        tabIndex={0}
        role="listbox"
        aria-label="Fases de estudio"
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        {fases.map((fase, i) => {
          const offset = i - activo
          const dist = Math.abs(offset)
          const esActivo = offset === 0
          const num = String(fase.numero).padStart(2, '0')
          const total = fase.temas.length
          const leidosFase = fase.temas.filter((t) => leidos[t.id]).length
          const pct = total ? Math.round((leidosFase / total) * 100) : 0
          return (
            <article
              key={fase.id}
              className={`deck-card ${esActivo ? 'is-activo' : ''}`}
              style={{
                '--fase-color': fase.color,
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
                <h3 className="deck-titulo">{fase.titulo}</h3>
                <p className="deck-sub">{fase.subtitulo}</p>
                <p className="deck-desc">{fase.descripcion}</p>
                <div className="deck-pie">
                  <span className="deck-temas">{total} temas</span>
                  <Link
                    to={`/fase/${fase.id}`}
                    className="deck-boton"
                    aria-label={`Entrar a la fase ${fase.numero}`}
                    tabIndex={esActivo ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="chevronDer" size={22} />
                  </Link>
                  <span className="deck-prog">{leidosFase}/{total}</span>
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
        aria-label="Fase siguiente"
      >
        <Icon name="chevronDer" size={26} />
      </button>

      <div className="deck-puntos" role="tablist" aria-label="Ir a fase">
        {fases.map((f, i) => (
          <button
            key={f.id}
            className={`deck-punto ${i === activo ? 'on' : ''}`}
            style={{ '--fase-color': f.color }}
            onClick={() => ir(i)}
            aria-label={`Fase ${f.numero}: ${f.titulo}`}
            aria-selected={i === activo}
          />
        ))}
      </div>
    </div>
  )
}
