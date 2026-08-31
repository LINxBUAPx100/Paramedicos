import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import { registrar } from '../../lib/registro.js'
import { resumenDeIndices, temasDeEstructura } from '../../lib/estadoAgregados.js'
import Icon from '../../components/Icon.jsx'

// ============================================================
//  Panel del director · CONTENIDO (Bloque O)
// ------------------------------------------------------------
//  La entrada al editor era un botón en la cabecera del panel, sin nada que
//  dijera en qué estado está el contenido de la academia ni qué se ha tocado
//  últimamente. El historial ya se escribía desde la Fase 6: lo que faltaba
//  era enseñarlo (mismo caso que `historialPermisos` en el Bloque M).
// ============================================================

// ---------- Un curso, con el estado de sus índices ----------
//
//  POR QUÉ ESTO EXISTE. El 31 de agosto de 2026 se descubrió que el temario de
//  R.E.S.C.A.T.E. llevaba desde su migración sin índices. No estaba roto —el
//  buscador, el glosario y los exámenes funcionan igual— y por eso nadie lo
//  notó: el único síntoma era que cada carga costaba 288 lecturas de Firestore
//  en vez de 3, y la cuota gratuita da para unas 173 cargas al día.
//
//  El fallo original está en la clonación, que se traga el error en un
//  `console.warn`. Pero aunque eso se arregle, hacía falta una forma de
//  REPARARLO sin credenciales de administrador, porque la alternativa era una
//  clave de service account y ésas son justo las que no conviene repartir.
//  Con este botón lo arregla el director desde su propia sesión.
//
//  El texto no dice «faltan los agregados»: eso no le dice nada a nadie. Dice
//  cuántas cargas al día aguanta hoy, que es lo que hace actuar.
function CursoDelPanel({ curso, academiaId, sello }) {
  const [trabajando, setTrabajando] = useState(false)
  const [resultado, setResultado] = useState(null)
  // `undefined` = el sello aún no se ha consultado. Mientras tanto no se pinta
  // nada del estado: decir «sin índices» antes de haber mirado sería mentir.
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
      // El motivo importa: casi siempre será un permiso, y el director tiene
      // que poder distinguirlo de un fallo pasajero.
      setResultado({ ok: false, texto: `No se pudieron generar: ${err?.message || 'error desconocido'}` })
    } finally {
      setTrabajando(false)
    }
  }

  return (
    <li className={`pc-item ${curso.estado === 'publicado' ? 'activo' : 'inactivo'}`}>
      <strong className="pg-nombre">{curso.titulo || curso.id}</strong>
      <span className="pc-detalle">
        {(Array.isArray(curso.estructura) ? curso.estructura.length : curso.estructura?.modulos?.length ?? 0)} módulo(s)
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

const ETIQUETA_ACCION = {
  'crear-nodo': 'creó',
  'editar-nodo': 'editó',
  'archivar-nodo': 'archivó',
  'restaurar-nodo': 'restauró',
  'mover-nodo': 'movió',
  'borrar-grupo': 'borró un grupo',
  'asignar-permisos': 'concedió permisos',
  'revocar-permisos': 'retiró permisos',
}

export default function PanelContenido() {
  const { academiaId, academia, miembros } = usePanel()
  const [cursos, setCursos] = useState(null)
  // Sello de índices por curso: `undefined` = todavía sin consultar,
  // `null` = consultado y no existe (que es el caso que hay que enseñar).
  const [sellos, setSellos] = useState({})
  const [historial, setHistorial] = useState(null) // null = cargando; [] = vacío
  const [sinHistorial, setSinHistorial] = useState(false)

  useEffect(() => {
    if (!academiaId) return undefined
    let vivo = true
    ;(async () => {
      const api = await import('../../lib/firebase/contenido.js')
      // Sin `soloPublicados`: al director le interesa ver también los borradores.
      const lista = await api.cursosDeAcademia(academiaId, { soloPublicados: false })
        .catch((err) => { registrar('panel:cursos', err); return [] })
      if (vivo) setCursos(lista)

      // El sello vive en la colección `agregados`, no en el curso, así que hay
      // que pedirlo aparte: una lectura por curso, y son dos o tres.
      const { selloDeAgregados } = await import('../../lib/firebase/agregados.js')
      for (const c of lista) {
        const s = await selloDeAgregados(c.id).catch(() => null)
        if (vivo) setSellos((prev) => ({ ...prev, [c.id]: s || null }))
      }
      try {
        const h = await api.historialDeAcademia(academiaId)
        if (vivo) setHistorial(h)
      } catch (err) {
        registrar('panel:historial', err)
        // El historial solo lo lee el DIRECTOR (lo impone la regla). Un profesor
        // con permisos de edición llega aquí y no debe ver un error rojo.
        if (vivo) { setHistorial([]); setSinHistorial(true) }
      }
    })()
    return () => { vivo = false }
  }, [academiaId])

  const nombreDe = (uid) => {
    const m = miembros.find((x) => x.id === uid)
    return m?.nombre || m?.email || uid || 'alguien'
  }
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

  const estadoContenido = academia?.contenido?.estado || 'bundle'

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Contenido</h1>
        <p>El temario de tu academia: en qué estado está, quién lo edita y qué se ha tocado.</p>
      </header>

      <section className="panel-contenido-estado">
        <h2><Icon name="capas" size={20} /> Estado del temario</h2>
        <p className="panel-gestion-sub">
          {estadoContenido === 'migrado'
            ? 'Tu academia tiene su PROPIA copia del temario: lo que edites aquí solo lo ven tus alumnos.'
            : estadoContenido === 'migrando'
              ? 'Se está copiando el temario a tu academia. Espera a que termine antes de editar.'
              : estadoContenido === 'error'
                ? 'La copia del temario quedó a medias. Avisa al administrador de la plataforma.'
                : 'Tu academia usa el temario general de la plataforma. Para tener el tuyo propio, pídeselo al administrador.'}
        </p>

        <Link to="/editor" className="btn btn--pildora">
          <Icon name="herramientas" size={16} /> Abrir el editor de contenido
        </Link>

        {cursos === null ? null : cursos.length === 0 ? (
          <p className="panel-vacio">Aún no hay cursos propios en esta academia.</p>
        ) : (
          <ul className="pc-lista">
            {cursos.map((c) => (
              <CursoDelPanel key={c.id} curso={c} academiaId={academiaId} sello={sellos[c.id]} />
            ))}
          </ul>
        )}
      </section>

      <section className="panel-historial">
        <h2><Icon name="reloj" size={20} /> Últimos cambios</h2>
        {sinHistorial ? (
          <p className="panel-gestion-sub">El historial de cambios lo consulta el director de la academia.</p>
        ) : historial === null ? (
          <p className="panel-gestion-sub">Cargando el historial…</p>
        ) : historial.length === 0 ? (
          <p className="panel-vacio">Todavía no se ha registrado ningún cambio.</p>
        ) : (
          <ul className="pe-historial-lista">
            {historial.map((h) => (
              <li key={h.id}>
                <strong>{nombreDe(h.usuario)}</strong>{' '}
                {ETIQUETA_ACCION[h.accion] || h.accion}{' '}
                <span className="peh-detalle">{h.coleccion}/{h.docId}</span>
                <small> · {fechaTxt(h.fecha)}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
