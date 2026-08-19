import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import {
  ETIQUETA_ACCION, resumenDictamenes, comprobarAplicacion,
} from '../lib/revisionDocente.js'

// ============================================================
//  Cola de dictámenes — lo que firman los profesores
// ------------------------------------------------------------
//  Sin esta vista el circuito quedaba a medias: los docentes firmarían y nadie
//  vería nada. Aquí el administrador lee cada dictamen y lo resuelve:
//
//    · APLICADO   → se hizo el cambio (o se ascendió el estado del tema).
//    · DESCARTADO → no procede, y hay que decir por qué.
//
//  Lo que esta vista NO hace es ascender el estado editorial por su cuenta. La
//  firma de un docente es la mitad del acto; la otra mitad es aplicar el cambio
//  en el contenido, y eso pasa por el editor y por `validarRevision`. El botón
//  «Comprobar» de cada firma dice, antes de tocar nada, si la ficha resultante
//  sería válida.
// ============================================================

const hoyISO = () => new Date().toISOString().slice(0, 10)

/**
 * @param {object} props
 * @param {string} [props.academiaId] Cola de UNA academia (panel del director).
 * @param {boolean} [props.plataforma] Cola GLOBAL, del super-admin: incluye las
 *   firmas sobre la plantilla, que no pertenecen a ninguna academia y por eso
 *   no salían en ninguna cola.
 * @param {boolean} [props.desplegada] Abre la lista sin tener que hacer clic:
 *   en una pantalla dedicada a revisar, el acordeón cerrado esconde el trabajo.
 */
export default function ColaDictamenes({ academiaId, plataforma = false, desplegada = false }) {
  const { user } = useAuth()
  const [lista, setLista] = useState(null) // null = sin cargar
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [verResueltos, setVerResueltos] = useState(false)

  const cargar = async () => {
    setCargando(true)
    setError('')
    try {
      const api = await import('../lib/firebase/dictamenes.js')
      setLista(plataforma ? await api.dictamenesTodos() : await api.dictamenesDeAcademia(academiaId))
    } catch {
      setLista([])
      setError('No se pudo leer la cola de dictámenes.')
    } finally {
      setCargando(false)
    }
  }

  // Con la lista desplegada de salida nadie pulsa el <summary>, así que la
  // carga no puede depender del `onToggle`.
  useEffect(() => {
    if (desplegada && lista === null && !cargando) cargar()
  }) // eslint-disable-line react-hooks/exhaustive-deps

  const resumen = useMemo(() => resumenDictamenes(lista || []), [lista])
  const visibles = (lista || []).filter((d) => (verResueltos ? true : (d.estado || 'abierto') === 'abierto'))

  return (
    <section className="panel-dictamenes">
      <h2><Icon name="check" size={20} /> Revisión docente del contenido</h2>
      <p className="panel-gestion-sub">
        Lo que los profesores con pase de revisión han firmado sobre cada tema.
        Una firma de validación no cambia el estado del tema por sí sola: la
        aplicas aquí y el cambio pasa por el editor.
      </p>

      <details open={desplegada} onToggle={(e) => { if (e.target.open && lista === null) cargar() }}>
        <summary>
          <Icon name="reloj" size={15} /> Ver cola de dictámenes
          {lista !== null && resumen.abiertos > 0 && (
            <span className="pe-badge">{resumen.abiertos} abierto{resumen.abiertos === 1 ? '' : 's'}</span>
          )}
        </summary>

        {cargando && <p className="panel-vacio">Cargando…</p>}
        {error && <p className="cuenta-error" role="alert">{error}</p>}

        {lista !== null && !cargando && (
          <>
            <div className="dic-resumen">
              <span><strong>{resumen.validar}</strong> validaciones</span>
              <span><strong>{resumen.corregir}</strong> correcciones</span>
              <span><strong>{resumen.temas}</strong> temas con dictamen abierto</span>
              <label className="revdoc-check">
                <input
                  type="checkbox"
                  checked={verResueltos}
                  onChange={(e) => setVerResueltos(e.target.checked)}
                />
                Ver también los ya resueltos
              </label>
            </div>

            {visibles.length === 0 ? (
              <p className="panel-vacio">
                Nada por revisar. Concede un pase de revisión a un profesor para que empiece.
              </p>
            ) : (
              <ul className="dic-lista">
                {visibles.map((d) => (
                  <Dictamen
                    key={d.id}
                    dictamen={d}
                    porUid={user?.uid || null}
                    onResuelto={cargar}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </details>
    </section>
  )
}

function Dictamen({ dictamen, porUid, onResuelto }) {
  const [nota, setNota] = useState('')
  const [estado, setEstado] = useState('')
  const [error, setError] = useState('')
  const [comprobacion, setComprobacion] = useState(null)

  const abierto = (dictamen.estado || 'abierto') === 'abierto'
  const fecha = dictamen.fecha?.seconds
    ? new Date(dictamen.fecha.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
    : ''

  // Comprueba, sin escribir nada, si aplicar esta firma produciría una ficha
  // editorial válida. Evita descubrir el problema después de haber cambiado el
  // estado del tema.
  const comprobar = () => {
    const { error: err } = comprobarAplicacion(
      { estado: 'en_revision', procedencia: 'redactado' },
      dictamen,
      hoyISO(),
    )
    setComprobacion(err ? { ok: false, motivo: err } : { ok: true })
  }

  const resolver = async (nuevo) => {
    setError('')
    if (nuevo === 'descartado' && !nota.trim()) {
      setError('Explica por qué se descarta.')
      return
    }
    setEstado('guardando')
    try {
      const { resolverDictamen } = await import('../lib/firebase/dictamenes.js')
      await resolverDictamen(dictamen.id, nuevo, { nota, porUid })
      onResuelto?.()
    } catch (err) {
      setEstado('')
      setError(err?.message || 'No se pudo resolver el dictamen.')
    }
  }

  return (
    <li className={`dic-item dic-item--${dictamen.accion}${abierto ? '' : ' es-resuelto'}`}>
      <div className="dic-cabecera">
        <span className={`dic-accion dic-accion--${dictamen.accion}`}>
          {ETIQUETA_ACCION[dictamen.accion] || dictamen.accion}
        </span>
        <strong className="dic-tema">{dictamen.temaTitulo || dictamen.temaId}</strong>
        <span className="dic-fecha">{fecha}</span>
        {!abierto && <span className="pe-badge">{dictamen.estado}</span>}
      </div>

      <p className="dic-firma">
        Firma: <strong>{dictamen.revisadoPor || dictamen.nombre || dictamen.email || '—'}</strong>
      </p>

      {dictamen.comentario && <p className="dic-comentario">{dictamen.comentario}</p>}

      {Array.isArray(dictamen.fuentes) && dictamen.fuentes.length > 0 && (
        <ul className="dic-fuentes">
          {dictamen.fuentes.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}

      {Array.isArray(dictamen.deudasAlFirmar) && dictamen.deudasAlFirmar.length > 0 && (
        <p className="dic-deudas">
          <Icon name="alerta" size={14} /> Firmado con {dictamen.deudasAlFirmar.length} deuda
          {dictamen.deudasAlFirmar.length === 1 ? '' : 's'} declarada
          {dictamen.deudasAlFirmar.length === 1 ? '' : 's'} en el tema.
        </p>
      )}

      {dictamen.notaResolucion && <p className="dic-resolucion">Resolución: {dictamen.notaResolucion}</p>}

      {abierto && (
        <div className="dic-acciones">
          {dictamen.accion === 'validar' && (
            <button type="button" className="btn btn--suave btn--mini" onClick={comprobar}>
              Comprobar ficha
            </button>
          )}
          <input
            type="text"
            className="dic-nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            maxLength={1000}
            placeholder="Qué se hizo (obligatorio si se descarta)"
          />
          <button
            type="button"
            className="btn btn--primario btn--mini"
            onClick={() => resolver('aplicado')}
            disabled={estado === 'guardando'}
          >
            Marcar aplicado
          </button>
          <button
            type="button"
            className="btn btn--suave btn--mini"
            onClick={() => resolver('descartado')}
            disabled={estado === 'guardando'}
          >
            Descartar
          </button>
        </div>
      )}

      {comprobacion && (
        <p className={comprobacion.ok ? 'cuenta-ok' : 'cuenta-error'} role="status">
          {comprobacion.ok
            ? 'La ficha resultante sería válida: puedes ascender el tema a Validado en el editor.'
            : `No se puede aplicar todavía: ${comprobacion.motivo}`}
        </p>
      )}
      {error && <p className="cuenta-error" role="alert">{error}</p>}
    </li>
  )
}
