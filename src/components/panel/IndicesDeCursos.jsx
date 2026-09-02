// ============================================================
//  Estado de los índices de un curso, y el botón que los arregla
// ------------------------------------------------------------
//  POR QUÉ ESTO EXISTE. El 31 de agosto de 2026 se descubrió que el temario de
//  R.E.S.C.A.T.E. llevaba desde su migración sin índices. No estaba roto —el
//  buscador, el glosario y los exámenes funcionan igual— y por eso nadie lo
//  notó: el único síntoma era que cada carga costaba 288 lecturas de Firestore
//  en vez de 3, y la cuota gratuita da para unas 173 cargas al día.
//
//  El texto no dice «faltan los agregados»: eso no le dice nada a nadie. Dice
//  cuántas cargas al día aguanta hoy, que es lo que hace actuar.
//
//  POR QUÉ ESTÁ AQUÍ Y NO EN EL PANEL DEL DIRECTOR, que es donde nació.
//
//  Porque el super-admin no podía pulsarlo. Las reglas de Firestore SÍ le
//  dejan —`esSuper()` está en el `allow create` y en el `allow update` de
//  `agregados`— pero la única pantalla que ofrecía el botón era el panel del
//  director, y el super-admin no entra ahí: opera cada academia desde
//  `/admin/academia/:id`, cuya pestaña de Contenido ni siquiera enseñaba el
//  estado de los índices.
//
//  El resultado era el peor de los dos mundos: el dueño de la plataforma, que
//  puede hacerlo en el servidor, tenía que pedirle a un director que entrara a
//  pulsar un botón. Una capacidad que existe en las reglas y no existe en la
//  interfaz es una capacidad que no existe.
//
//  REGLA GENERAL que este componente hace cumplir: el super-admin puede hacer
//  todo lo que puede hacer un director. Si una acción de academia solo vive en
//  el panel del director, falta ofrecerla también en la consola.
// ============================================================
import { useEffect, useState } from 'react'
import Icon from '../Icon.jsx'
import { registrar } from '../../lib/registro.js'
import { resumenDeIndices, temasDeEstructura } from '../../lib/estadoAgregados.js'

/**
 * Cursos de una academia con el sello de sus índices.
 *
 * `sellos[cursoId]`: `undefined` = todavía sin consultar, `null` = consultado y
 * no existe (que es justo el caso que hay que enseñar).
 */
export function useCursosConSello(academiaId) {
  const [cursos, setCursos] = useState(null)
  const [sellos, setSellos] = useState({})

  useEffect(() => {
    if (!academiaId) return undefined
    let vivo = true
    setCursos(null)
    setSellos({})
    ;(async () => {
      const api = await import('../../lib/firebase/contenido.js')
      // Sin `soloPublicados`: aquí interesan también los borradores.
      const lista = await api.cursosDeAcademia(academiaId, { soloPublicados: false })
        .catch((err) => { registrar('panel:cursos', err); return [] })
      if (!vivo) return
      setCursos(lista)
      // El sello vive en la colección `agregados`, no en el curso, así que hay
      // que pedirlo aparte: una lectura por curso, y son dos o tres.
      const { selloDeAgregados } = await import('../../lib/firebase/agregados.js')
      for (const c of lista) {
        const s = await selloDeAgregados(c.id).catch(() => null)
        if (vivo) setSellos((prev) => ({ ...prev, [c.id]: s || null }))
      }
    })()
    return () => { vivo = false }
  }, [academiaId])

  return { cursos, sellos }
}

export function CursoConIndices({ curso, academiaId, sello }) {
  const [trabajando, setTrabajando] = useState(false)
  const [resultado, setResultado] = useState(null)
  // Mientras el sello no se haya consultado no se pinta nada del estado: decir
  // «sin índices» antes de haber mirado sería mentir.
  const consultado = sello !== undefined
  const temas = temasDeEstructura(curso.estructura)
  const r = consultado ? resumenDeIndices({ sello, temas }) : null

  const generar = async () => {
    setTrabajando(true)
    setResultado(null)
    try {
      const api = await import('../../lib/firebase/contenido.js')
      await api.regenerarAgregados(academiaId, curso.id)
      setResultado({ ok: true, texto: 'Índices generados. Recarga para verlo reflejado.' })
    } catch (err) {
      registrar('panel:regenerar-agregados', err)
      // El motivo importa: casi siempre será un permiso, y quien lo pulsa tiene
      // que poder distinguirlo de un fallo pasajero.
      setResultado({ ok: false, texto: `No se pudieron generar: ${err?.message || 'error desconocido'}` })
    } finally {
      setTrabajando(false)
    }
  }

  const modulos = Array.isArray(curso.estructura)
    ? curso.estructura.length
    : curso.estructura?.modulos?.length ?? 0

  return (
    <li className={`pc-item ${curso.estado === 'publicado' ? 'activo' : 'inactivo'}`}>
      <strong className="pg-nombre">{curso.titulo || curso.id}</strong>
      <span className="pc-detalle">
        {modulos} módulo(s)
        {temas ? ` · ${temas} temas` : ''}
        {curso.version ? ` · versión ${curso.version}` : ''}
      </span>
      <span className={`pc-estado ${curso.estado === 'publicado' ? 'activo' : 'inactivo'}`}>
        {curso.estado || 'borrador'}
      </span>

      {r && (
        <div className={`pc-indices ${r.grave ? 'is-grave' : ''}`}>
          <p className="pc-indices-tit">
            <Icon name={r.grave ? 'alerta' : 'verificado'} size={16} /> {r.titulo}
          </p>
          <p className="pc-indices-txt">{r.detalle}</p>
          <p className="pc-indices-cifra">
            Hoy cada carga del temario cuesta <strong>{r.lecturasPorCarga}</strong> lectura(s):
            caben unas <strong>{r.cargasAlDia.toLocaleString('es-MX')}</strong> al día
            antes de agotar la cuota gratuita.
          </p>
          <button className="btn btn--pildora" onClick={generar} disabled={trabajando}>
            {trabajando ? 'Generando…' : r.accion}
          </button>
          {resultado && (
            <p className={resultado.ok ? 'pc-indices-ok' : 'pc-indices-mal'} role="status">
              {resultado.texto}
            </p>
          )}
        </div>
      )}
    </li>
  )
}
