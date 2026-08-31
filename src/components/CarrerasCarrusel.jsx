import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { estiloDeCarrera, rutaDeCarrera } from '../lib/carrerasModelo.js'

// ============================================================
//  Baraja de CARRERAS — la misma que la de módulos
// ------------------------------------------------------------
//  La portada enseñaba las carreras en una rejilla de tarjetas de altura
//  desigual, que se rompía en dos filas descompensadas (4 + 2) y no se parecía
//  a nada más del producto. Se sustituye por la baraja «coverflow» que ya usa
//  el Home para los módulos.
//
//  REUTILIZA LAS CLASES `.deck-*` TAL CUAL, a propósito: el aspecto no se
//  copia, se comparte. El día que alguien retoque la baraja de módulos, ésta
//  cambia con ella en vez de quedarse atrás. Lo único que se le pasa distinto
//  es `--modulo-color`, que es la variable de la que el deck toma su color.
//
//  Diferencias inevitables con la de módulos, y por qué:
//   · No lleva barra de progreso. Una carrera no se «lleva al 40 %»; la barra
//     en cero se leería como un fallo.
//   · El número es la POSICIÓN en el catálogo, no un número oficial: las
//     carreras no van numeradas en ningún plan.
// ============================================================
export default function CarrerasCarrusel({ carreras }) {
  const [activo, setActivo] = useState(0)
  const n = carreras.length
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
        aria-label="Carrera anterior"
      >
        <Icon name="chevronIzq" size={26} />
      </button>

      <div
        className="deck-pista"
        tabIndex={0}
        role="listbox"
        aria-label="Carreras que imparte la academia"
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        {carreras.map((carrera, i) => {
          const offset = i - activo
          const dist = Math.abs(offset)
          const esActivo = offset === 0
          const { color, etiquetaTipo } = estiloDeCarrera(carrera)
          const abierta = carrera.estado === 'abierta'
          return (
            <article
              key={carrera.slug}
              className={`deck-card ${esActivo ? 'is-activo' : ''}`}
              style={{
                '--modulo-color': color,
                '--offset': offset,
                zIndex: esActivo ? 100 : 50 - dist,
                opacity: dist > 3 ? 0 : esActivo ? 1 : Math.max(0.34, 1 - dist * 0.16),
                visibility: dist > 3 ? 'hidden' : 'visible',
                filter: esActivo ? 'none' : dist <= 2 ? 'blur(2.4px)' : 'none',
              }}
              role="option"
              aria-selected={esActivo}
              aria-hidden={!esActivo}
              onClick={() => !esActivo && ir(i)}
            >
              <span className="deck-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="deck-body">
                <h3 className="deck-titulo">{carrera.nombre}</h3>
                <p className="deck-sub">{etiquetaTipo}</p>
                <p className="deck-desc">{carrera.resumen}</p>
                <div className="deck-pie">
                  <span className={`deck-estado ${abierta ? 'is-abierta' : ''}`}>
                    {abierta ? 'Disponible ahora' : 'En preparación'}
                  </span>
                  <Link
                    to={rutaDeCarrera(carrera)}
                    className="deck-boton"
                    aria-label={abierta
                      ? `Ver la carrera de ${carrera.nombre}`
                      : `Conocer más sobre ${carrera.nombre}`}
                    tabIndex={esActivo ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="chevronDer" size={22} />
                  </Link>
                  {/* Hueco a la derecha: mantiene el botón centrado, igual que
                      el contador de la baraja de módulos. Una carrera no tiene
                      cifra que enseñar aquí, así que va vacío en vez de con un
                      dato inventado. */}
                  <span className="deck-hueco" aria-hidden="true" />
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <button
        className="deck-flecha der"
        onClick={() => ir(activo + 1)}
        disabled={activo === n - 1}
        aria-label="Carrera siguiente"
      >
        <Icon name="chevronDer" size={26} />
      </button>

      <div className="deck-puntos" role="tablist" aria-label="Ir a una carrera">
        {carreras.map((c, i) => (
          <button
            key={c.slug}
            className={`deck-punto ${i === activo ? 'on' : ''}`}
            style={{ '--modulo-color': estiloDeCarrera(c).color }}
            onClick={() => ir(i)}
            aria-label={c.nombre}
            aria-selected={i === activo}
          />
        ))}
      </div>
    </div>
  )
}
