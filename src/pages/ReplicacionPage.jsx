import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from '../components/Icon.jsx'
import { ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo } from '../lib/capacidades.js'
import { ETIQUETA_ESTADO_PLANTILLA } from '../lib/plantillasModelo.js'
import {
  ESTRATEGIAS, ESTRATEGIA_DEFAULT, ETIQUETA_ESTRATEGIA, DESCRIPCION_ESTRATEGIA,
  fraseConfirmacion, requiereConfirmacionReforzada,
} from '../lib/replicacionModelo.js'

// ============================================================
//  /admin/replicacion — SOLO SUPER-ADMIN (Fase 7)
// ------------------------------------------------------------
//  Plantillas globales (crear, versionar, publicar, archivar), clonación/
//  replicación con DRY-RUN OBLIGATORIO, estrategia de conflictos (default
//  conservar_local), respaldo previo, aplicación acotada y rollback.
//  La barrera real son las reglas (esSuper); esta página además exige el rol.
//  Las operaciones masivas se ejecutan con scripts/replicar-contenido.mjs.
// ============================================================

const ETIQUETA_ESTADO_OP = {
  borrador: 'Borrador', analizando: 'Analizando…', lista: 'Lista (dry-run OK)',
  esperando_confirmacion: 'Esperando confirmación', aplicando: 'Aplicando…',
  completada: 'Completada', completada_con_advertencias: 'Completada con advertencias',
  fallida: 'Fallida', revirtiendo: 'Revirtiendo…', revertida: 'Revertida', cancelada: 'Cancelada',
}

const ETIQUETA_CLASE = {
  nuevo: 'Nuevo', sin_cambios: 'Sin cambios', modificado_en_origen: 'Actualizado en el origen',
  modificado_local: 'Modificado por la academia', conflicto: 'Conflicto',
  solo_local: 'Creado por la academia', archivado_local: 'Archivado por la academia',
}

export default function ReplicacionPage() {
  const { cargando, esSuperadmin } = useAuth()
  const [pestana, setPestana] = useState('plantillas') // plantillas | replicar | historial
  const [api, setApi] = useState(null) // módulo firebase/replicacion.js (lazy)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!esSuperadmin) return
    let activo = true
    import('../lib/firebase/replicacion.js')
      .then((m) => { if (activo) setApi(m) })
      .catch(() => { if (activo) setError('No se pudo cargar el módulo de replicación.') })
    return () => { activo = false }
  }, [esSuperadmin])

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }
  if (!esSuperadmin) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Solo super-administradores</h1>
        <p>Las plantillas globales y la replicación de contenido son exclusivas del administrador de la plataforma.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  const pestanas = [
    { id: 'plantillas', label: 'Plantillas' },
    { id: 'replicar', label: 'Clonar y replicar' },
    { id: 'historial', label: 'Historial y rollback' },
  ]

  return (
    <div className="rp-page">
      <nav className="migas">
        <Link to="/admin">Dashboard</Link> <span>/</span> Plantillas y replicación
      </nav>
      <header className="rp-header">
        <h1><Icon name="capas" size={26} /> Plantillas y replicación</h1>
        <p className="rp-contexto" aria-live="polite">
          Zona GLOBAL de la plataforma: lo que hagas aquí puede afectar a varias academias.
          Cada academia conserva su copia independiente; nada se propaga automáticamente.
        </p>
      </header>

      <div className="rp-tabs" role="tablist" aria-label="Secciones de replicación">
        {pestanas.map((p) => (
          <button
            key={p.id}
            role="tab"
            id={`rp-tab-${p.id}`}
            aria-selected={pestana === p.id}
            aria-controls={`rp-panel-${p.id}`}
            className={`rp-tab ${pestana === p.id ? 'activa' : ''}`}
            onClick={() => setPestana(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {!api ? (
        <div className="ruta-cargando" role="status">
          <span className="ruta-spinner" aria-hidden="true" /> <span>Conectando…</span>
        </div>
      ) : (
        <div id={`rp-panel-${pestana}`} role="tabpanel" aria-labelledby={`rp-tab-${pestana}`}>
          {pestana === 'plantillas' && <SeccionPlantillas api={api} />}
          {pestana === 'replicar' && <SeccionReplicar api={api} />}
          {pestana === 'historial' && <SeccionHistorial api={api} />}
        </div>
      )}
    </div>
  )
}

// ------------------------------------------------------------
//  Diálogo accesible con confirmación reforzada por FRASE.
// ------------------------------------------------------------
function Dialogo({ titulo, onCerrar, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', onKey)
    ref.current?.querySelector('input, textarea, select, button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onCerrar])
  return (
    <div className="rp-dialogo-fondo" onClick={(e) => { if (e.target === e.currentTarget) onCerrar() }}>
      <div className="rp-dialogo" role="dialog" aria-modal="true" aria-label={titulo} ref={ref}>
        <div className="rp-dialogo-cab">
          <h2>{titulo}</h2>
          <button className="rp-cerrar" onClick={onCerrar} aria-label="Cerrar diálogo">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ConfirmacionReforzada({ titulo, resumen, frase, onConfirmar, onCerrar, ocupado }) {
  const [texto, setTexto] = useState('')
  const coincide = texto.trim().toUpperCase() === frase
  return (
    <Dialogo titulo={titulo} onCerrar={onCerrar}>
      <div className="rp-confirmacion">
        {resumen}
        <p>
          Para continuar, escribe exactamente la frase: <strong><code>{frase}</code></strong>
        </p>
        <label>
          Frase de confirmación
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
        </label>
        <div className="rp-dialogo-botones">
          <button className="btn btn-peligro" disabled={!coincide || ocupado} onClick={() => onConfirmar(texto.trim().toUpperCase())}>
            {ocupado ? 'Ejecutando…' : 'Confirmar y ejecutar'}
          </button>
          <button className="btn btn-secundario" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
        </div>
      </div>
    </Dialogo>
  )
}

// ------------------------------------------------------------
//  PESTAÑA 1 · Plantillas globales
// ------------------------------------------------------------
function SeccionPlantillas({ api }) {
  const [plantillas, setPlantillas] = useState(null)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [dialogo, setDialogo] = useState(null) // {tipo, plantilla?}
  const [versiones, setVersiones] = useState(null) // {plantilla, lista, uso}

  const recargar = useCallback(async () => {
    try {
      setPlantillas(await api.listarPlantillasAdmin())
    } catch {
      setError('No se pudieron cargar las plantillas (¿reglas publicadas?).')
    }
  }, [api])
  useEffect(() => { recargar() }, [recargar])

  const ejecutar = async (fn, exito) => {
    setOcupado(true)
    setError('')
    setAviso('')
    try {
      await fn()
      setAviso(exito)
      setDialogo(null)
      await recargar()
    } catch (e) {
      setError(String(e?.message || e))
    } finally {
      setOcupado(false)
    }
  }

  const verVersiones = async (p) => {
    setError('')
    try {
      const [lista, uso] = await Promise.all([
        api.listarVersiones(p.id),
        api.academiasQueUsanPlantilla(p.id, { limite: 50 }),
      ])
      setVersiones({ plantilla: p, lista, uso: uso.cursos })
    } catch (e) {
      setError(String(e?.message || e))
    }
  }

  if (!plantillas) {
    return <div className="ruta-cargando" role="status"><span className="ruta-spinner" aria-hidden="true" /> <span>Cargando plantillas…</span></div>
  }

  return (
    <section aria-label="Plantillas globales">
      <div className="rp-acciones-cab">
        <button className="btn btn-primario" onClick={() => setDialogo({ tipo: 'nueva' })}>
          <Icon name="mas" size={15} /> Nueva plantilla
        </button>
        <button className="btn btn-secundario" onClick={() => setDialogo({ tipo: 'desde-curso' })}>
          <Icon name="copiar" size={15} /> Desde un curso de academia
        </button>
      </div>
      {aviso && <p className="cuenta-ok" role="status">{aviso}</p>}
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {plantillas.length === 0 ? (
        <p className="rp-vacio">
          No hay plantillas todavía. Siembra la oficial con <code>npm run migrar -- --seed</code> o crea una aquí.
        </p>
      ) : (
        <div className="rp-tabla-scroll">
          <table className="rp-tabla">
            <thead>
              <tr>
                <th scope="col">Plantilla</th>
                <th scope="col">Estado</th>
                <th scope="col">Versión</th>
                <th scope="col">Contenido</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {plantillas.map((p) => (
                <tr key={p.id}>
                  <th scope="row">
                    <strong>{p.nombre || p.id}</strong>
                    <small className="rp-sub">{p.id} · {ETIQUETA_TIPO[p.tipoDestino] || p.tipoDestino}</small>
                  </th>
                  <td><span className={`rp-chip rp-chip--${p.estado || 'borrador'}`}>{ETIQUETA_ESTADO_PLANTILLA[p.estado] || p.estado}</span></td>
                  <td>v{p.version ?? 1}</td>
                  <td>{p.conteos ? `${p.conteos.fases} fases · ${p.conteos.temas} temas` : '—'}</td>
                  <td className="rp-celda-acciones">
                    {p.estado === 'borrador' && (
                      <>
                        <Link className="btn btn-mini btn-secundario" to={`/editor/plantilla/${p.id}`}>
                          <Icon name="editar" size={13} /> Editar contenido
                        </Link>
                        <button className="btn btn-mini btn-primario" disabled={ocupado} onClick={() => setDialogo({ tipo: 'publicar', plantilla: p })}>
                          <Icon name="verificado" size={13} /> Publicar v{p.version ?? 1}
                        </button>
                      </>
                    )}
                    {p.estado === 'publicada' && (
                      <button
                        className="btn btn-mini btn-secundario"
                        disabled={ocupado}
                        onClick={() => ejecutar(() => api.abrirSiguienteVersion(p.id), `Se abrió el borrador v${(p.version ?? 1) + 1} de "${p.nombre}".`)}
                      >
                        <Icon name="mas" size={13} /> Abrir v{(p.version ?? 1) + 1}
                      </button>
                    )}
                    <button className="btn btn-mini btn-secundario" onClick={() => verVersiones(p)}>
                      <Icon name="reloj" size={13} /> Versiones
                    </button>
                    <button className="btn btn-mini btn-secundario" disabled={ocupado} onClick={() => setDialogo({ tipo: 'duplicar', plantilla: p })}>
                      <Icon name="copiar" size={13} /> Duplicar
                    </button>
                    {p.estado !== 'archivada' ? (
                      <button
                        className="btn btn-mini btn-secundario"
                        disabled={ocupado}
                        onClick={() => setDialogo({ tipo: 'archivar', plantilla: p })}
                      >
                        <Icon name="archivo" size={13} /> Archivar
                      </button>
                    ) : (
                      <button
                        className="btn btn-mini btn-secundario"
                        disabled={ocupado}
                        onClick={() => ejecutar(
                          () => api.cambiarEstadoPlantilla(p.id, p.publicadaEn ? 'publicada' : 'borrador'),
                          `Plantilla "${p.nombre}" restaurada.`
                        )}
                      >
                        <Icon name="restaurar" size={13} /> Restaurar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {dialogo?.tipo === 'nueva' && (
        <FormPlantilla
          titulo="Nueva plantilla (borrador)"
          ocupado={ocupado}
          onCerrar={() => setDialogo(null)}
          onGuardar={(datos) => ejecutar(() => api.crearPlantillaVacia(datos), 'Plantilla creada en borrador. Edita su contenido y publícala.')}
        />
      )}
      {dialogo?.tipo === 'desde-curso' && (
        <FormPlantilla
          titulo="Plantilla desde un curso de academia"
          conCursoId
          ocupado={ocupado}
          onCerrar={() => setDialogo(null)}
          onGuardar={({ cursoId, ...meta }) =>
            ejecutar(() => api.crearPlantillaDesdeCursoAcademia({ cursoId, meta }), 'Plantilla creada desde el curso (borrador). Revísala y publícala.')}
        />
      )}
      {dialogo?.tipo === 'publicar' && (
        <FormPublicar
          plantilla={dialogo.plantilla}
          ocupado={ocupado}
          onCerrar={() => setDialogo(null)}
          onPublicar={(notas) =>
            ejecutar(() => api.publicarVersionPlantilla(dialogo.plantilla.id, { notas }),
              `Versión v${dialogo.plantilla.version ?? 1} publicada (inmutable).`)}
        />
      )}
      {dialogo?.tipo === 'duplicar' && (
        <FormNombre
          titulo={`Duplicar "${dialogo.plantilla.nombre}"`}
          etiqueta="Nombre de la copia"
          valorInicial={`${dialogo.plantilla.nombre} (copia)`}
          ocupado={ocupado}
          onCerrar={() => setDialogo(null)}
          onGuardar={(nombre) =>
            ejecutar(() => api.duplicarPlantilla(dialogo.plantilla.id, nombre), 'Plantilla duplicada como borrador independiente.')}
        />
      )}
      {dialogo?.tipo === 'archivar' && (
        <ConfirmacionReforzada
          titulo={`Archivar "${dialogo.plantilla.nombre}"`}
          frase="ARCHIVAR PLANTILLA"
          ocupado={ocupado}
          onCerrar={() => setDialogo(null)}
          resumen={
            <p>
              La plantilla dejará de ofrecerse para clonar o replicar. Las academias que ya la
              usan CONSERVAN su copia intacta. Es reversible (Restaurar).
            </p>
          }
          onConfirmar={() =>
            ejecutar(() => api.cambiarEstadoPlantilla(dialogo.plantilla.id, 'archivada'), 'Plantilla archivada.')}
        />
      )}
      {versiones && (
        <Dialogo titulo={`Versiones de "${versiones.plantilla.nombre}"`} onCerrar={() => setVersiones(null)}>
          {versiones.lista.length === 0 ? (
            <p>Sin versiones publicadas todavía (el borrador de trabajo no cuenta).</p>
          ) : (
            <ul className="rp-lista-versiones">
              {versiones.lista.map((v) => (
                <li key={v.docId}>
                  <strong>v{v.version}</strong> · {v.conteos?.temas ?? '—'} temas · hash <code>{String(v.hash || '').slice(0, 12)}…</code>
                  {v.notas && <em> — {v.notas}</em>}
                  {v.cambios && (
                    <small className="rp-sub">
                      +{v.cambios.agregados.length} · −{v.cambios.quitados.length} · ~{v.cambios.modificados.length} frente a v{v.version - 1}
                    </small>
                  )}
                </li>
              ))}
            </ul>
          )}
          <h3>Academias que la usan como origen</h3>
          {versiones.uso.length === 0 ? (
            <p>Ninguna academia ha recibido esta plantilla.</p>
          ) : (
            <ul className="rp-lista-versiones">
              {versiones.uso.map((c) => (
                <li key={c.id}>
                  <strong>{c.academiaId}</strong> · recibió v{c.versionOrigen ?? '—'}
                  {c.replicacion?.id && <small className="rp-sub"> (última replicación: {c.replicacion.id})</small>}
                </li>
              ))}
            </ul>
          )}
        </Dialogo>
      )}
    </section>
  )
}

function FormPlantilla({ titulo, conCursoId = false, ocupado, onCerrar, onGuardar }) {
  const [datos, setDatos] = useState({ nombre: '', descripcion: '', categoria: '', tipoDestino: 'basico', cursoId: '' })
  const pon = (k) => (e) => setDatos((d) => ({ ...d, [k]: e.target.value }))
  return (
    <Dialogo titulo={titulo} onCerrar={onCerrar}>
      <form
        className="rp-form"
        onSubmit={(e) => { e.preventDefault(); onGuardar(conCursoId ? datos : { ...datos, cursoId: undefined }) }}
      >
        {conCursoId && (
          <label>
            Id del curso origen (academiaId__plantillaId)
            <input type="text" value={datos.cursoId} onChange={pon('cursoId')} required placeholder="AEP-2026__paramedico-tum" />
          </label>
        )}
        <label>
          Nombre
          <input type="text" value={datos.nombre} onChange={pon('nombre')} required maxLength={120} />
        </label>
        <label>
          Descripción
          <textarea value={datos.descripcion} onChange={pon('descripcion')} rows={2} maxLength={600} />
        </label>
        <label>
          Categoría
          <input type="text" value={datos.categoria} onChange={pon('categoria')} maxLength={60} placeholder="p. ej. Programa completo, Capacitación" />
        </label>
        <label>
          Tipo de academia destino
          <select value={datos.tipoDestino} onChange={pon('tipoDestino')}>
            {Object.entries(ETIQUETA_TIPO).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
        </label>
        <div className="rp-dialogo-botones">
          <button type="submit" className="btn btn-primario" disabled={ocupado}>{ocupado ? 'Guardando…' : 'Crear borrador'}</button>
          <button type="button" className="btn btn-secundario" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
        </div>
      </form>
    </Dialogo>
  )
}

function FormPublicar({ plantilla, ocupado, onCerrar, onPublicar }) {
  const [notas, setNotas] = useState('')
  return (
    <Dialogo titulo={`Publicar "${plantilla.nombre}" v${plantilla.version ?? 1}`} onCerrar={onCerrar}>
      <form className="rp-form" onSubmit={(e) => { e.preventDefault(); onPublicar(notas) }}>
        <p>
          Publicar crea un snapshot INMUTABLE de la versión v{plantilla.version ?? 1}: será el
          origen exacto de clonaciones y replicaciones. Para cambiarla después tendrás que abrir
          la versión v{(plantilla.version ?? 1) + 1}.
        </p>
        <label>
          Notas de la versión (qué cambió)
          <textarea value={notas} onChange={(e) => setNotas(e.target.value)} rows={3} maxLength={1000} />
        </label>
        <div className="rp-dialogo-botones">
          <button type="submit" className="btn btn-primario" disabled={ocupado}>{ocupado ? 'Publicando…' : 'Publicar versión'}</button>
          <button type="button" className="btn btn-secundario" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
        </div>
      </form>
    </Dialogo>
  )
}

function FormNombre({ titulo, etiqueta, valorInicial = '', ocupado, onCerrar, onGuardar }) {
  const [valor, setValor] = useState(valorInicial)
  return (
    <Dialogo titulo={titulo} onCerrar={onCerrar}>
      <form className="rp-form" onSubmit={(e) => { e.preventDefault(); onGuardar(valor) }}>
        <label>
          {etiqueta}
          <input type="text" value={valor} onChange={(e) => setValor(e.target.value)} required maxLength={120} />
        </label>
        <div className="rp-dialogo-botones">
          <button type="submit" className="btn btn-primario" disabled={ocupado}>{ocupado ? 'Guardando…' : 'Aceptar'}</button>
          <button type="button" className="btn btn-secundario" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
        </div>
      </form>
    </Dialogo>
  )
}

// ------------------------------------------------------------
//  PESTAÑA 2 · Clonar y replicar (wizard con dry-run obligatorio)
// ------------------------------------------------------------
function SeccionReplicar({ api }) {
  const [plantillas, setPlantillas] = useState([])
  const [versiones, setVersiones] = useState([])
  const [academias, setAcademias] = useState([])
  const [cursorAca, setCursorAca] = useState(null)
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  // Selección del wizard.
  const [plantillaId, setPlantillaId] = useState('')
  const [version, setVersion] = useState('')
  const [destinos, setDestinos] = useState([])
  const [estrategia, setEstrategia] = useState(ESTRATEGIA_DEFAULT)
  const [filtro, setFiltro] = useState({ plan: '', tipo: '', estado: '' })
  const [selecciones, setSelecciones] = useState({}) // temaId → accion (seleccion_manual)

  // Operación en curso.
  const [op, setOp] = useState(null) // { id }
  const [analisis, setAnalisis] = useState(null)
  const [confirmando, setConfirmando] = useState(false)
  const [progreso, setProgreso] = useState('')
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    let activo = true
    api.listarPlantillasAdmin()
      .then((ps) => { if (activo) setPlantillas(ps.filter((p) => p.estado !== 'archivada')) })
      .catch(() => setError('No se pudieron cargar las plantillas.'))
    return () => { activo = false }
  }, [api])

  useEffect(() => {
    if (!plantillaId) { setVersiones([]); return }
    let activo = true
    api.listarVersiones(plantillaId)
      .then((vs) => {
        if (!activo) return
        setVersiones(vs)
        setVersion(vs[0] ? String(vs[0].version) : '')
      })
      .catch(() => setError('No se pudieron cargar las versiones.'))
    return () => { activo = false }
  }, [api, plantillaId])

  const cargarAcademias = useCallback(async (cursor = null) => {
    try {
      const r = await api.listarAcademiasPagina({ limite: 25, cursor })
      setAcademias((prev) => (cursor ? [...prev, ...r.academias] : r.academias))
      setCursorAca(r.cursor)
    } catch {
      setError('No se pudieron cargar las academias.')
    }
  }, [api])
  useEffect(() => { cargarAcademias() }, [cargarAcademias])

  const academiasFiltradas = useMemo(() => academias.filter((a) => {
    if (filtro.plan && planEfectivo(a) !== filtro.plan) return false
    if (filtro.tipo && (a.tipo || 'basico') !== filtro.tipo) return false
    if (filtro.estado && (a.estado || '') !== filtro.estado) return false
    return true
  }), [academias, filtro])

  const alternarDestino = (id) => {
    setDestinos((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
    setAnalisis(null) // cualquier cambio invalida el dry-run
    setOp(null)
  }

  const analizar = async () => {
    setOcupado(true)
    setError('')
    setAnalisis(null)
    setResultado(null)
    setProgreso('Analizando (dry-run, sin escrituras de contenido)…')
    try {
      const creada = op || await api.crearReplicacion({
        plantillaId, version: Number(version), destinos, estrategia,
      })
      setOp(creada)
      const r = await api.analizarReplicacion(creada.id)
      setAnalisis(r)
      setProgreso('')
    } catch (e) {
      setError(String(e?.message || e))
      setProgreso('')
      setOp(null)
    } finally {
      setOcupado(false)
    }
  }

  const pendientesDecision = useMemo(() => {
    if (!analisis || estrategia !== 'seleccion_manual') return []
    return Object.entries(analisis.analisis).flatMap(([aca, a]) =>
      (a.atencion || [])
        .filter((e) => e.clase === 'conflicto' && !selecciones[e.temaId])
        .map((e) => ({ ...e, academiaId: aca }))
    )
  }, [analisis, estrategia, selecciones])

  const aplicar = async (frase) => {
    setOcupado(true)
    setError('')
    try {
      await api.confirmarReplicacion(op.id, { frase, selecciones })
      setConfirmando(false)
      setProgreso('Respaldando y aplicando…')
      const r = await api.aplicarReplicacion(op.id, {
        onProgreso: ({ academiaId, lote, lotes: total }) =>
          setProgreso(`Aplicando en ${academiaId}: lote ${lote}/${total}…`),
      })
      setResultado(r)
      setProgreso('')
    } catch (e) {
      setError(String(e?.message || e))
      setProgreso('')
    } finally {
      setOcupado(false)
    }
  }

  const numAcademias = destinos.length
  const frase = fraseConfirmacion({ tipo: 'replicacion', estrategia, numAcademias })
  const listaParaAnalizar = plantillaId && version && numAcademias > 0

  return (
    <section aria-label="Clonar y replicar contenido">
      <ol className="rp-pasos">
        <li>
          <h2>1 · Origen</h2>
          <div className="rp-form rp-form--fila">
            <label>
              Plantilla
              <select value={plantillaId} onChange={(e) => { setPlantillaId(e.target.value); setAnalisis(null); setOp(null) }}>
                <option value="">— Elige una plantilla —</option>
                {plantillas.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre || p.id} ({ETIQUETA_ESTADO_PLANTILLA[p.estado]})</option>
                ))}
              </select>
            </label>
            <label>
              Versión publicada
              <select value={version} onChange={(e) => { setVersion(e.target.value); setAnalisis(null); setOp(null) }} disabled={!versiones.length}>
                {versiones.length === 0 && <option value="">Sin versiones publicadas</option>}
                {versiones.map((v) => (
                  <option key={v.version} value={v.version}>v{v.version} · {v.conteos?.temas ?? '?'} temas</option>
                ))}
              </select>
            </label>
          </div>
          {plantillaId && versiones.length === 0 && (
            <p className="cuenta-aviso">Esta plantilla no tiene versiones publicadas: publícala primero (pestaña Plantillas). El borrador de trabajo nunca se replica.</p>
          )}
        </li>

        <li>
          <h2>2 · Academias destino ({numAcademias} seleccionada{numAcademias === 1 ? '' : 's'}, máx. {api.MAX_DESTINOS_CLIENTE} desde el navegador)</h2>
          <div className="rp-form rp-form--fila" role="group" aria-label="Filtros de academias">
            <label>Plan
              <select value={filtro.plan} onChange={(e) => setFiltro((f) => ({ ...f, plan: e.target.value }))}>
                <option value="">Todos</option>
                {Object.entries(ETIQUETA_PLAN).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
            </label>
            <label>Tipo
              <select value={filtro.tipo} onChange={(e) => setFiltro((f) => ({ ...f, tipo: e.target.value }))}>
                <option value="">Todos</option>
                {Object.entries(ETIQUETA_TIPO).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
              </select>
            </label>
            <label>Estado
              <select value={filtro.estado} onChange={(e) => setFiltro((f) => ({ ...f, estado: e.target.value }))}>
                <option value="">Todos</option>
                <option value="activo">Activo</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </label>
          </div>
          <ul className="rp-lista-academias">
            {academiasFiltradas.map((a) => (
              <li key={a.id}>
                <label className="rp-check">
                  <input
                    type="checkbox"
                    checked={destinos.includes(a.id)}
                    onChange={() => alternarDestino(a.id)}
                  />
                  <span>
                    <strong>{a.id}</strong> · {a.nombre}
                    <small className="rp-sub">
                      {ETIQUETA_PLAN[planEfectivo(a)]} · {ETIQUETA_TIPO[a.tipo || 'basico']} · {a.estado}
                      {a.contenido?.estado === 'migrado' ? ' · contenido propio' : ' · legacy (clonará)'}
                    </small>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {cursorAca && (
            <button className="btn btn-secundario btn-mini" onClick={() => cargarAcademias(cursorAca)}>
              Cargar más academias
            </button>
          )}
        </li>

        <li>
          <h2>3 · Estrategia para conflictos</h2>
          <div className="rp-estrategias" role="radiogroup" aria-label="Estrategia de conflictos">
            {ESTRATEGIAS.map((e) => (
              <label key={e} className={`rp-estrategia ${estrategia === e ? 'activa' : ''}`}>
                <input
                  type="radio"
                  name="estrategia"
                  value={e}
                  checked={estrategia === e}
                  onChange={() => { setEstrategia(e); setAnalisis(null); setOp(null) }}
                />
                <span>
                  <strong>{ETIQUETA_ESTRATEGIA[e]}{e === ESTRATEGIA_DEFAULT ? ' (predeterminada)' : ''}</strong>
                  <small>{DESCRIPCION_ESTRATEGIA[e]}</small>
                </span>
              </label>
            ))}
          </div>
        </li>

        <li>
          <h2>4 · Análisis (dry-run obligatorio)</h2>
          <button className="btn btn-primario" onClick={analizar} disabled={!listaParaAnalizar || ocupado}>
            {ocupado && !confirmando ? 'Trabajando…' : 'Analizar sin escribir nada'}
          </button>
          <p aria-live="polite" className="rp-progreso">{progreso}</p>
          {error && <p className="cuenta-error" role="alert">{error}</p>}

          {analisis && (
            <div className="rp-analisis">
              <p>
                <strong>{numAcademias}</strong> academia(s) · <strong>{analisis.totalEscrituras}</strong> escrituras estimadas ·{' '}
                <strong>{analisis.totalConflictos}</strong> conflicto(s)
                {analisis.bloqueada && <strong className="rp-bloqueada"> · BLOQUEADA por incompatibilidades</strong>}
              </p>
              {analisis.advertencias.map((a, i) => <p key={i} className="cuenta-aviso">{a}</p>)}
              {Object.entries(analisis.analisis).map(([aca, a]) => (
                <details key={aca} className="rp-detalle-academia">
                  <summary>
                    <strong>{aca}</strong> — {a.existeCurso ? 'replicación' : 'clonación completa'} ·{' '}
                    {Object.entries(a.resumen).filter(([, n]) => n > 0).map(([c, n]) => `${ETIQUETA_CLASE[c] || c}: ${n}`).join(' · ') || 'sin elementos'}
                  </summary>
                  {a.incompatibilidades.map((i, ix) => (
                    <p key={ix} className={i.advertencia ? 'cuenta-aviso' : 'cuenta-error'}>{i.detalle}</p>
                  ))}
                  {(a.atencion || []).length > 0 && (
                    <div className="rp-tabla-scroll">
                      <table className="rp-tabla rp-tabla--mini">
                        <thead>
                          <tr>
                            <th scope="col">Elemento</th><th scope="col">Ubicación</th><th scope="col">Situación</th>
                            <th scope="col">Modificó</th><th scope="col">Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {a.atencion.map((e) => (
                            <tr key={e.temaId}>
                              <th scope="row">{e.titulo}</th>
                              <td>{e.ruta || '—'}</td>
                              <td>{ETIQUETA_CLASE[e.clase] || e.clase}</td>
                              <td>{e.modificadoLocalPor || '—'}</td>
                              <td>
                                {estrategia === 'seleccion_manual' && e.clase === 'conflicto' ? (
                                  <select
                                    aria-label={`Decisión para ${e.titulo}`}
                                    value={selecciones[e.temaId] || ''}
                                    onChange={(ev) => setSelecciones((s) => ({ ...s, [e.temaId]: ev.target.value }))}
                                  >
                                    <option value="">— Decidir —</option>
                                    <option value="conservar">Conservar lo local</option>
                                    <option value="actualizar">Reemplazar con el origen</option>
                                    <option value="duplicar">Duplicar como nuevo</option>
                                  </select>
                                ) : (
                                  e.accion
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </details>
              ))}
            </div>
          )}
        </li>

        <li>
          <h2>5 · Confirmar y aplicar</h2>
          {pendientesDecision.length > 0 && (
            <p className="cuenta-aviso">Faltan {pendientesDecision.length} conflicto(s) por decidir (selección manual).</p>
          )}
          <button
            className="btn btn-peligro"
            disabled={!analisis || analisis.bloqueada || ocupado || pendientesDecision.length > 0 || Boolean(resultado)}
            onClick={() => setConfirmando(true)}
          >
            Aplicar a {numAcademias} academia(s)…
          </button>
          {resultado && (
            <p className="cuenta-ok" role="status">
              Operación {ETIQUETA_ESTADO_OP[resultado.estado] || resultado.estado}.{' '}
              {resultado.advertencias.length > 0 && `Advertencias: ${resultado.advertencias.join(' · ')}`}
              {' '}Consulta el detalle en «Historial y rollback».
            </p>
          )}
        </li>
      </ol>

      {confirmando && (
        <ConfirmacionReforzada
          titulo="Confirmación reforzada"
          frase={frase}
          ocupado={ocupado}
          onCerrar={() => setConfirmando(false)}
          onConfirmar={aplicar}
          resumen={
            <>
              <p>
                Vas a aplicar <strong>{ETIQUETA_ESTRATEGIA[estrategia]}</strong> desde{' '}
                <strong>{plantillaId} v{version}</strong> a <strong>{numAcademias}</strong> academia(s):{' '}
                {destinos.join(', ')} · ~{analisis?.totalEscrituras ?? '?'} escrituras.
              </p>
              <p>
                Antes de escribir se crea un RESPALDO de todo lo que se modifica; si el respaldo
                falla, no se aplica nada. {estrategia === 'reemplazar_con_origen' && (
                  <strong>Esta estrategia SOBRESCRIBE cambios locales (quedan en el respaldo).</strong>
                )}
              </p>
            </>
          }
        />
      )}
    </section>
  )
}

// ------------------------------------------------------------
//  PESTAÑA 3 · Historial, reanudación y rollback
// ------------------------------------------------------------
function SeccionHistorial({ api }) {
  const [ops, setOps] = useState(null)
  const [cursor, setCursor] = useState(null)
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [progreso, setProgreso] = useState('')
  const [rollback, setRollback] = useState(null) // { op, plan }

  const recargar = useCallback(async (c = null) => {
    try {
      const r = await api.listarReplicaciones({ limite: 20, cursor: c })
      setOps((prev) => (c && prev ? [...prev, ...r.operaciones] : r.operaciones))
      setCursor(r.cursor)
    } catch {
      setError('No se pudo cargar el historial (¿índice de replicaciones creado?).')
    }
  }, [api])
  useEffect(() => { recargar() }, [recargar])

  const reanudar = async (op) => {
    setOcupado(true)
    setError('')
    try {
      setProgreso(`Reanudando ${op.id}…`)
      await api.aplicarReplicacion(op.id, {
        reanudar: true,
        onProgreso: ({ academiaId, lote, lotes: total }) => setProgreso(`${academiaId}: lote ${lote}/${total}…`),
      })
      setProgreso('')
      await recargar()
    } catch (e) {
      setError(String(e?.message || e))
      setProgreso('')
    } finally {
      setOcupado(false)
    }
  }

  const prepararRollback = async (op) => {
    setOcupado(true)
    setError('')
    try {
      const plan = await api.previsualizarRollback(op.id)
      setRollback({ op, plan })
    } catch (e) {
      setError(String(e?.message || e))
    } finally {
      setOcupado(false)
    }
  }

  const ejecutarRollback = async (frase) => {
    setOcupado(true)
    setError('')
    try {
      setProgreso('Revirtiendo desde el respaldo…')
      await api.ejecutarRollback(rollback.op.id, {
        frase,
        onProgreso: ({ hechos, total }) => setProgreso(`Revirtiendo ${hechos}/${total}…`),
      })
      setRollback(null)
      setProgreso('')
      await recargar()
    } catch (e) {
      setError(String(e?.message || e))
      setProgreso('')
    } finally {
      setOcupado(false)
    }
  }

  const fecha = (ts) => (ts?.seconds ? new Date(ts.seconds * 1000).toLocaleString('es-MX') : '—')

  if (!ops) {
    return <div className="ruta-cargando" role="status"><span className="ruta-spinner" aria-hidden="true" /> <span>Cargando historial…</span></div>
  }

  return (
    <section aria-label="Historial de replicaciones">
      <p aria-live="polite" className="rp-progreso">{progreso}</p>
      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {ops.length === 0 ? (
        <p className="rp-vacio">Sin operaciones registradas todavía.</p>
      ) : (
        <div className="rp-tabla-scroll">
          <table className="rp-tabla">
            <thead>
              <tr>
                <th scope="col">Operación</th>
                <th scope="col">Origen</th>
                <th scope="col">Destinos</th>
                <th scope="col">Estrategia</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ops.map((op) => (
                <tr key={op.id}>
                  <th scope="row">
                    <code>{op.id.slice(0, 8)}…</code>
                    <small className="rp-sub">{fecha(op.creadoEn)} · {op.creadoPor}</small>
                  </th>
                  <td>{op.plantillaId} v{op.version}</td>
                  <td>{(op.destinos || []).join(', ')}</td>
                  <td>{ETIQUETA_ESTRATEGIA[op.estrategia] || op.estrategia}</td>
                  <td><span className={`rp-chip rp-chip--op-${op.estado}`}>{ETIQUETA_ESTADO_OP[op.estado] || op.estado}</span></td>
                  <td className="rp-celda-acciones">
                    {op.estado === 'fallida' && (
                      <button className="btn btn-mini btn-secundario" disabled={ocupado} onClick={() => reanudar(op)}>
                        <Icon name="restaurar" size={13} /> Reanudar
                      </button>
                    )}
                    {['completada', 'completada_con_advertencias', 'fallida'].includes(op.estado) && (
                      <button className="btn btn-mini btn-secundario" disabled={ocupado} onClick={() => prepararRollback(op)}>
                        <Icon name="flechaIzq" size={13} /> Rollback…
                      </button>
                    )}
                    {['borrador', 'lista', 'esperando_confirmacion'].includes(op.estado) && (
                      <button className="btn btn-mini btn-secundario" disabled={ocupado} onClick={async () => { await api.cancelarReplicacion(op.id).catch((e) => setError(String(e?.message || e))); recargar() }}>
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cursor && (
        <button className="btn btn-secundario btn-mini" onClick={() => recargar(cursor)}>Cargar más</button>
      )}

      {rollback && (
        <ConfirmacionReforzada
          titulo={`Rollback de ${rollback.op.id.slice(0, 8)}…`}
          frase={fraseConfirmacion({ tipo: 'rollback', numAcademias: (rollback.op.destinos || []).length })}
          ocupado={ocupado}
          onCerrar={() => setRollback(null)}
          onConfirmar={ejecutarRollback}
          resumen={
            <>
              <p>
                Se restaurarán <strong>{rollback.plan.restaurar.length}</strong> documento(s) desde el
                respaldo y se archivarán <strong>{rollback.plan.archivar.length}</strong> creado(s) por la
                replicación. El progreso, los intentos y las calificaciones no se tocan.
              </p>
              {rollback.plan.advertencias.length > 0 && (
                <ul className="rp-lista-versiones">
                  {rollback.plan.advertencias.map((a, i) => (
                    <li key={i} className="cuenta-aviso">{a.docId}: {a.motivo}</li>
                  ))}
                </ul>
              )}
            </>
          }
        />
      )}
    </section>
  )
}
