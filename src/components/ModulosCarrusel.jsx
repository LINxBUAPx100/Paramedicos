import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { aReanudar } from '../lib/pulsoModelo.js'
import { estadosEditoriales } from '../data/navIndice.js'
import { fotoDeModulo } from '../data/fotosModulo.js'

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
  const navigate = useNavigate()
  // PTEM Pulso: cada tarjeta recuerda dónde te quedaste en SU módulo. La
  // flecha central te lleva ahí; la tarjeta entera, al módulo completo.
  const { estado } = useProgress()
  const lecturas = estado.lecturas || {}
  const n = modulos.length
  const ptrX = useRef(null)

  const ir = (i) => setActivo(Math.max(0, Math.min(n - 1, i)))

  // El marco de foco solo se enseña cuando se navega con el teclado: un clic
  // también enfoca la pista y dejaba un recuadro azul alrededor de la tarjeta.
  const [conTeclado, setConTeclado] = useState(false)
  const onKey = (e) => {
    setConTeclado(true)
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(activo + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); ir(activo - 1) }
  }
  const onDown = (e) => { ptrX.current = e.clientX; setConTeclado(false) }
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
        data-teclado={conTeclado ? 'si' : undefined}
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
          const donde = aReanudar({ modulos: [modulo], leidos, lecturas, bloqueados: estadosEditoriales })
          const seccion = donde.modo === 'reanudar' ? donde.lectura.seccion : 0
          const destinoFlecha = donde.tema
            ? `/tema/${donde.tema.id}${seccion > 0 ? `?seccion=${seccion}` : ''}`
            : `/modulo/${modulo.id}`
          const textoFlecha = donde.modo === 'reanudar'
            ? `Seguir en ${donde.tema.titulo}`
            : donde.modo === 'empezar' ? `Empezar con ${donde.tema.titulo}` : `Repasar el módulo ${modulo.numero}`
          const foto = fotoDeModulo(modulo.id)
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
                // Todo lo que no está al frente, bien difuminado: más cuanto
                // más lejos. Las de más de 3 lugares ya están ocultas arriba.
                filter: esActivo ? 'none' : `blur(${Math.min(8, 3.5 + dist * 1.5)}px) saturate(0.85)`,
              }}
              role="option"
              aria-selected={esActivo}
              aria-hidden={!esActivo}
              // La tarjeta al frente abre el MÓDULO completo; una de atrás
              // primero viene al frente.
              onClick={() => (esActivo ? navigate(`/modulo/${modulo.id}`) : ir(i))}
            >
              <div className="deck-foto" aria-hidden="true">
                {foto && (
                  <picture>
                    <source type="image/avif" srcSet={foto.srcSetAvif} sizes={foto.sizes} />
                    <source type="image/webp" srcSet={foto.srcSet} sizes={foto.sizes} />
                    {/* La del frente se pide ya; las de atrás, cuando hagan falta.
                        Si una foto no llega, se oculta: nunca el icono de imagen rota. */}
                    <img
                      src={foto.src}
                      alt=""
                      width="800"
                      height="300"
                      loading={dist <= 1 ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={(e) => { e.currentTarget.closest('picture').style.display = 'none' }}
                    />
                  </picture>
                )}
                <span className="deck-num">{num}</span>
              </div>
              <div className="deck-body">
                <h3 className="deck-titulo">
                  {/* Enlace real para teclado y lectores: la tarjeta entera es
                      solo un atajo para el ratón y el dedo. */}
                  <Link to={`/modulo/${modulo.id}`} tabIndex={esActivo ? 0 : -1} onClick={(e) => e.stopPropagation()}>
                    {modulo.titulo}
                  </Link>
                </h3>
                <p className="deck-sub">{modulo.subtitulo}</p>
                {donde.modo === 'reanudar' ? (
                  <p className="deck-donde">
                    <span className="deck-donde-et">Donde ibas</span>
                    {donde.tema.titulo} · sección {seccion + 1} de {donde.lectura.total}
                  </p>
                ) : (
                  <p className="deck-desc">{modulo.descripcion}</p>
                )}
                {/* Al pasar el cursor, la tarjeta del frente se expande y
                    muestra lo que no cabe: el resto del módulo y a dónde lleva
                    la flecha. */}
                <div className="deck-extra" aria-hidden={!esActivo}>
                  {donde.modo === 'reanudar' && modulo.descripcion && <p>{modulo.descripcion}</p>}
                  <p className="deck-extra-dato">
                    <span>{pct}% leído</span>
                    <span>{total - leidosModulo} {total - leidosModulo === 1 ? 'tema pendiente' : 'temas pendientes'}</span>
                  </p>
                  {donde.tema && <p className="deck-extra-flecha">La flecha te lleva a <b>{donde.tema.titulo}</b></p>}
                </div>
                <div className="deck-pie">
                  <span className="deck-temas">{total} temas</span>
                  <Link
                    to={destinoFlecha}
                    className="deck-boton"
                    aria-label={textoFlecha}
                    title={textoFlecha}
                    tabIndex={esActivo ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="chevronDer" size={22} />
                  </Link>
                  <span className="deck-prog">{leidosModulo}/{total}</span>
                </div>
                <div className="deck-barra" role="progressbar" aria-label={`Avance del módulo ${modulo.numero}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                  <span style={{ width: `${pct}%` }} />
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
