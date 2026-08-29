import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useGlosarioCompleto } from '../lib/useGlosario.js'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { progresoGlosario } from '../lib/glosario.js'

// ============================================================
//  Glosario del temario — el final de Logros
// ------------------------------------------------------------
//  Qué es: todas las palabras que el temario define (los `conceptosClave` de
//  cada lección), en ORDEN DE APARICIÓN, sin repetidos y agrupadas por módulo.
//
//  Por qué se descubre en vez de estar entero desde el primer día: es la misma
//  regla que ya gobierna la galería de arriba. Una palabra pertenece a un tema;
//  mientras el profesor no libere ese tema para el grupo, la palabra aparece
//  pero su definición no. Así el glosario se llena conforme avanzan las clases
//  —que es lo que lo convierte en un logro— y de paso no adelanta contenido que
//  el grupo todavía no ha visto.
//
//  A dónde llega el lector: cada tecnicismo subrayado dentro de una lección
//  enlaza a /logros?t=<slug>, y esta pantalla se desplaza sola hasta esa
//  palabra y la resalta un momento.
// ============================================================
export default function Glosario() {
  const glosario = useGlosarioCompleto()
  const { temaVisible } = useVisibilidad()
  const [params, setParams] = useSearchParams()
  const buscado = params.get('t') || ''
  const [filtro, setFiltro] = useState('')
  const refs = useRef({})

  const progreso = useMemo(
    () => progresoGlosario(glosario, temaVisible),
    [glosario, temaVisible]
  )

  // Llegada desde una lección: desplazarse a la palabra exacta y resaltarla.
  useEffect(() => {
    if (!buscado) return
    const nodo = refs.current[buscado]
    if (!nodo) return
    nodo.scrollIntoView({ behavior: 'smooth', block: 'center' })
    nodo.classList.add('glo-destacada')
    const t = setTimeout(() => nodo.classList.remove('glo-destacada'), 2600)
    return () => clearTimeout(t)
  }, [buscado, glosario])

  const consulta = filtro.trim().toLowerCase()
  const bloques = useMemo(() => {
    if (!consulta) return glosario.porModulo
    return glosario.porModulo
      .map((b) => ({
        ...b,
        entradas: b.entradas.filter((e) => e.termino.toLowerCase().includes(consulta)),
      }))
      .filter((b) => b.entradas.length)
  }, [glosario, consulta])

  if (!glosario.total) return null

  return (
    <section className="glosario" id="glosario" aria-labelledby="glosario-titulo">
      <header className="glo-header">
        <h2 id="glosario-titulo" className="ph-h2">
          <Icon name="libro" size={26} /> Glosario del temario
        </h2>
        <p>
          Cada tecnicismo, norma, abreviatura y nombre propio que el temario define, en el orden en
          que aparece y agrupado por módulo. Las palabras se descubren conforme tu profesor libera
          los temas: lo que todavía está bloqueado enseña la palabra, no su definición.
        </p>
        <div className="glo-progreso">
          <div className="glo-progreso-barra">
            <span style={{ width: `${progreso.pct}%` }} />
          </div>
          <strong>
            {progreso.descubiertas} de {progreso.total} palabras descubiertas
          </strong>
        </div>
        <label className="glo-buscar">
          <Icon name="buscar" size={16} />
          <input
            type="search"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar una palabra del glosario…"
            aria-label="Buscar en el glosario"
          />
        </label>
        {buscado && (
          <button className="glo-limpiar" onClick={() => setParams({}, { replace: true })}>
            Quitar el resaltado
          </button>
        )}
      </header>

      {bloques.length === 0 && (
        <p className="panel-vacio">Ninguna palabra del glosario coincide con «{filtro}».</p>
      )}

      {bloques.map((bloque) => (
        <div className="glo-modulo" key={bloque.moduloId} style={{ '--modulo-color': bloque.moduloColor }}>
          <h3 className="glo-modulo-titulo">
            <span className="glo-modulo-num">Módulo {bloque.moduloNumero}</span>
            {bloque.moduloTitulo}
            <small>{bloque.entradas.length} palabras</small>
          </h3>
          <dl className="glo-lista">
            {bloque.entradas.map((e) => {
              const abierta = temaVisible(e.temaId)
              return (
                <div
                  key={e.slug}
                  id={`glo-${e.slug}`}
                  ref={(n) => { refs.current[e.slug] = n }}
                  className={`glo-entrada${abierta ? '' : ' glo-entrada--bloqueada'}`}
                >
                  <dt>
                    {/* Mismo trazo de marcador que lleva el tecnicismo dentro de
                        la lección: la palabra que se subrayó al leer y la que se
                        viene a repasar tienen que reconocerse como la misma. */}
                    <span className="glo-marca">{e.termino}</span>
                    {!abierta && (
                      <span className="glo-candado" title="Se descubre al liberar su tema">
                        <Icon name="candado" size={14} />
                      </span>
                    )}
                  </dt>
                  <dd>
                    {abierta ? (
                      <>
                        {e.definicion}
                        <Link className="glo-fuente" to={`/tema/${e.temaId}`}>
                          {e.temaNumero ? `${e.temaNumero} · ` : ''}{e.temaTitulo}
                        </Link>
                      </>
                    ) : (
                      <span className="glo-oculta">
                        Se descubre cuando tu profesor libere «{e.temaTitulo}».
                      </span>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      ))}
    </section>
  )
}
