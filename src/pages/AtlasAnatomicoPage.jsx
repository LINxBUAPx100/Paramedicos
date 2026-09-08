import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import AnatomyScene from '../features/anatomy3d/AnatomyScene.js'
import {
  DEFAULT_VISIBLE,
  ORGAN_SYSTEMS,
  SYSTEMS,
  explicacionEstructura,
  nombreEstructura,
  normalizarTexto,
  sistemaPorId,
  terminosEstructura,
} from '../features/anatomy3d/anatomyData.js'
import {
  ATLAS_REPOSITORY_URL,
  ATLAS_SOURCE_COMMIT,
  BODYPARTS3D_LICENSE_URL,
  BODYPARTS3D_URL,
  loadAtlas,
  loadThree,
} from '../features/anatomy3d/atlasSource.js'
import '../features/anatomy3d/anatomy3d.css'

const INITIAL_VIEWER = {
  explode: 0,
  visible: DEFAULT_VISIBLE,
  selected: [],
  isolate: false,
  view: 'three-quarter',
  rotate: false,
  reset: 0,
}

const SUGGESTIONS = [
  'heart',
  'brain',
  'trachea',
  'diaphragm',
  'aorta',
  'liver',
  'femur',
  'spinal cord',
]

const VIEW_OPTIONS = [
  { id: 'three-quarter', label: 'Tres cuartos', short: '¾' },
  { id: 'front', label: 'Anterior', short: 'A' },
  { id: 'side', label: 'Lateral', short: 'L' },
  { id: 'back', label: 'Posterior', short: 'P' },
]

const formatNumber = (value) => Number(value || 0).toLocaleString('es-MX')

export default function AtlasAnatomicoPage() {
  const pageRef = useRef(null)
  const searchRef = useRef(null)
  const [THREE, setThree] = useState(null)
  const [atlas, setAtlas] = useState(null)
  const [viewer, setViewer] = useState(INITIAL_VIEWER)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [chosen, setChosen] = useState(null)
  const [panel, setPanel] = useState(null)
  const [about, setAbout] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Atlas anatómico 3D · PTEM'
    return () => { document.title = previousTitle }
  }, [])

  useEffect(() => {
    const abort = new AbortController()
    setThree(null)
    setAtlas(null)
    setProgress(0)
    setError('')
    setChosen(null)
    setViewer({ ...INITIAL_VIEWER, visible: [...DEFAULT_VISIBLE] })

    Promise.all([loadThree(), loadAtlas(abort.signal)])
      .then(([threeModule, atlasData]) => {
        if (abort.signal.aborted) return
        setThree(threeModule)
        setAtlas(atlasData)
      })
      .catch((loadError) => {
        if (abort.signal.aborted || loadError?.name === 'AbortError') return
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'No se pudo iniciar el atlas anatómico.',
        )
      })

    return () => abort.abort()
  }, [reloadKey])

  useEffect(() => {
    const onFullscreen = () => setFullscreen(document.fullscreenElement === pageRef.current)
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => document.removeEventListener('fullscreenchange', onFullscreen)
  }, [])

  const clearSelection = () => {
    setChosen(null)
    setViewer((current) => ({
      ...current,
      selected: [],
      isolate: false,
      reset: current.reset + 1,
    }))
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      const writing = event.target instanceof HTMLInputElement
        || event.target instanceof HTMLTextAreaElement
        || event.target?.isContentEditable

      if (event.key === '/' && !writing) {
        event.preventDefault()
        setPanel('search')
        requestAnimationFrame(() => searchRef.current?.focus())
      }
      if (event.key === 'Escape') {
        if (about) setAbout(false)
        else if (panel) setPanel(null)
        else if (viewer.selected.length) clearSelection()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [about, panel, viewer.selected.length])

  const partById = useMemo(
    () => new Map((atlas?.parts || []).map((part) => [part.id, part])),
    [atlas],
  )
  const conceptById = useMemo(
    () => new Map((atlas?.concepts || []).map((concept) => [concept.id, concept])),
    [atlas],
  )
  const counts = useMemo(() => Object.fromEntries(
    SYSTEMS.map((system) => [
      system.id,
      atlas?.parts.filter((part) => part.system === system.id).length || 0,
    ]),
  ), [atlas])
  const activeSystems = useMemo(
    () => SYSTEMS.filter((system) => counts[system.id] > 0),
    [counts],
  )
  const selectedParts = useMemo(
    () => viewer.selected.map((id) => partById.get(id)).filter(Boolean),
    [viewer.selected, partById],
  )
  const selectedPart = selectedParts[0] || null
  const selectedSystem = selectedPart ? sistemaPorId(selectedPart.system) : null

  const results = useMemo(() => {
    if (!atlas) return []
    const term = normalizarTexto(query)
    if (!term) {
      return SUGGESTIONS
        .map((name) => atlas.concepts.find(
          (concept) => normalizarTexto(concept.name) === normalizarTexto(name),
        ))
        .filter(Boolean)
    }
    return atlas.concepts
      .filter((concept) => terminosEstructura(concept).includes(term))
      .sort((a, b) => nombreEstructura(a.name).length - nombreEstructura(b.name).length)
      .slice(0, 80)
  }, [atlas, query])

  const visibleCount = useMemo(() => {
    if (!atlas) return 0
    const visible = new Set(viewer.visible)
    const selected = new Set(viewer.selected)
    return atlas.parts.filter((part) => (
      viewer.isolate
        ? selected.has(part.id)
        : visible.has(part.system) || selected.has(part.id)
    )).length
  }, [atlas, viewer.visible, viewer.selected, viewer.isolate])

  const chooseConcept = (concept) => {
    setChosen(concept)
    setViewer((current) => ({
      ...current,
      selected: concept.elements,
      isolate: false,
      rotate: false,
    }))
    setPanel(null)
  }

  const choosePart = (id) => {
    const part = partById.get(id)
    if (!part) return
    const concept = conceptById.get(part.conceptId)
    setChosen({
      id: concept?.id || part.conceptId || part.id,
      name: part.name,
      elements: [part.id],
    })
    setViewer((current) => ({
      ...current,
      selected: [part.id],
      isolate: false,
      rotate: false,
    }))
    setPanel(null)
  }

  const setPreset = (ids) => {
    setChosen(null)
    setViewer((current) => ({
      ...current,
      visible: ids,
      selected: [],
      isolate: false,
      rotate: false,
    }))
  }

  const toggleSystem = (id) => {
    setChosen(null)
    setViewer((current) => ({
      ...current,
      visible: current.visible.includes(id)
        ? current.visible.filter((item) => item !== id)
        : [...current.visible, id],
      selected: [],
      isolate: false,
      rotate: false,
    }))
  }

  const resetViewer = () => {
    setChosen(null)
    setQuery('')
    setPanel(null)
    setViewer((current) => ({
      ...INITIAL_VIEWER,
      visible: [...DEFAULT_VISIBLE],
      reset: current.reset + 1,
    }))
  }

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await pageRef.current?.requestFullscreen?.()
    } catch {
      setError('El navegador no permitió abrir el atlas en pantalla completa.')
    }
  }

  const loading = !error && (!THREE || !atlas || progress < 100)
  const sourceName = chosen?.name || selectedPart?.name || ''
  const displayName = nombreEstructura(sourceName)
  const translated = displayName && normalizarTexto(displayName) !== normalizarTexto(sourceName)

  return (
    <div ref={pageRef} className={`atlas3d-page ${fullscreen ? 'is-fullscreen' : ''}`}>
      {THREE && atlas && (
        <AnatomyScene
          THREE={THREE}
          atlas={atlas}
          state={viewer}
          onSelect={choosePart}
          onProgress={(value) => {
            setProgress(value)
            if (value === 100) setError('')
          }}
          onError={setError}
        />
      )}

      <div className="atlas3d-vignette" aria-hidden="true" />

      <header className="atlas3d-identity">
        <span className="atlas3d-eyebrow"><i /> PTEM · ANATOMÍA INTERACTIVA</span>
        <h1>Atlas anatómico <b>3D</b></h1>
        <p>
          {atlas ? formatNumber(atlas.parts.length) : '2,234'} piezas modeladas
          <span>·</span> BodyParts3D
        </p>
      </header>

      <nav className="atlas3d-top-actions" aria-label="Herramientas del atlas">
        <button
          type="button"
          className={panel === 'search' ? 'is-active' : ''}
          onClick={() => {
            setPanel((current) => current === 'search' ? null : 'search')
            requestAnimationFrame(() => searchRef.current?.focus())
          }}
        >
          <Icon name="buscar" size={18} />
          <span>Buscar estructura</span>
          <kbd>/</kbd>
        </button>
        <button
          type="button"
          className="atlas3d-mobile-only"
          aria-label="Abrir sistemas anatómicos"
          onClick={() => setPanel((current) => current === 'systems' ? null : 'systems')}
        >
          <Icon name="capas" size={19} />
        </button>
        <button type="button" aria-label="Información y créditos" onClick={() => setAbout(true)}>
          <Icon name="pregunta" size={18} />
        </button>
        <button
          type="button"
          aria-label={fullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
          onClick={toggleFullscreen}
        >
          <Icon name={fullscreen ? 'cerrar' : 'expandir'} size={18} />
        </button>
      </nav>

      <aside
        className={`atlas3d-systems ${panel === 'systems' ? 'is-open' : ''}`}
        aria-label="Sistemas anatómicos"
      >
        <div className="atlas3d-panel-heading">
          <div>
            <span>Sistemas</span>
            <small>{activeSystems.length} capas disponibles</small>
          </div>
          <button
            type="button"
            className="atlas3d-mobile-only"
            aria-label="Cerrar sistemas"
            onClick={() => setPanel(null)}
          >
            <Icon name="cerrar" size={17} />
          </button>
        </div>

        <div className="atlas3d-presets" aria-label="Vistas rápidas">
          <button
            type="button"
            aria-pressed={DEFAULT_VISIBLE.every((id) => viewer.visible.includes(id))}
            onClick={() => setPreset([...DEFAULT_VISIBLE])}
          >
            Anatomía
          </button>
          <button
            type="button"
            aria-pressed={viewer.visible.length === 1 && viewer.visible[0] === 'skeletal'}
            onClick={() => setPreset(['skeletal'])}
          >
            Esqueleto
          </button>
          <button
            type="button"
            aria-pressed={ORGAN_SYSTEMS.every((id) => viewer.visible.includes(id))
              && viewer.visible.length === ORGAN_SYSTEMS.length}
            onClick={() => setPreset([...ORGAN_SYSTEMS])}
          >
            Órganos
          </button>
        </div>

        <div className="atlas3d-system-list">
          {activeSystems.map((system) => {
            const enabled = viewer.visible.includes(system.id)
            return (
              <div key={system.id} className={enabled ? 'is-enabled' : ''}>
                <button
                  type="button"
                  className="atlas3d-system-name"
                  title={`Mostrar solamente ${system.name.toLowerCase()}`}
                  onClick={() => setPreset([system.id])}
                >
                  <i style={{ background: system.color }} />
                  <span>{system.shortName}</span>
                  <small>{formatNumber(counts[system.id])}</small>
                </button>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  aria-label={`${enabled ? 'Ocultar' : 'Mostrar'} ${system.name.toLowerCase()}`}
                  className="atlas3d-switch"
                  onClick={() => toggleSystem(system.id)}
                >
                  <i />
                </button>
              </div>
            )
          })}
        </div>

        <div className="atlas3d-panel-foot">
          <span>{formatNumber(visibleCount)} piezas visibles</span>
          <button type="button" onClick={() => setPreset([])}>Ocultar todo</button>
        </div>
      </aside>

      {panel === 'search' && (
        <section className="atlas3d-search" aria-label="Buscar anatomía">
          <div className="atlas3d-panel-heading">
            <div>
              <span>Buscar una estructura</span>
              <small>Español, inglés o identificador anatómico</small>
            </div>
            <button type="button" aria-label="Cerrar búsqueda" onClick={() => setPanel(null)}>
              <Icon name="cerrar" size={17} />
            </button>
          </div>
          <label className="atlas3d-search-input">
            <Icon name="buscar" size={18} />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Corazón, tráquea, fémur…"
              aria-label="Buscar estructura anatómica"
            />
          </label>
          <div className="atlas3d-results" role="listbox" aria-label="Resultados anatómicos">
            {results.length > 0 ? results.map((concept) => {
              const translatedName = nombreEstructura(concept.name)
              return (
                <button
                  type="button"
                  key={concept.id}
                  role="option"
                  aria-selected={chosen?.id === concept.id}
                  onClick={() => chooseConcept(concept)}
                >
                  <span>
                    <strong>{translatedName}</strong>
                    {normalizarTexto(translatedName) !== normalizarTexto(concept.name)
                      && <small>{concept.name}</small>}
                  </span>
                  <em>{formatNumber(concept.elements.length)}</em>
                </button>
              )
            }) : (
              <p>No hay estructuras que coincidan con la búsqueda.</p>
            )}
          </div>
          <p className="atlas3d-search-note">
            La interfaz y las estructuras prehospitalarias prioritarias están traducidas. El catálogo conserva la nomenclatura original para mantener trazabilidad.
          </p>
        </section>
      )}

      <nav className="atlas3d-view-controls" aria-label="Orientación de la cámara">
        {VIEW_OPTIONS.map((option) => (
          <button
            type="button"
            key={option.id}
            className={viewer.view === option.id ? 'is-active' : ''}
            aria-pressed={viewer.view === option.id}
            aria-label={`Vista ${option.label.toLowerCase()}`}
            title={`Vista ${option.label.toLowerCase()}`}
            disabled={viewer.explode > 0.8 && option.id !== 'front'}
            onClick={() => setViewer((current) => ({
              ...current,
              view: option.id,
              rotate: false,
              reset: current.reset + 1,
            }))}
          >
            {option.short}
          </button>
        ))}
        <i />
        <button
          type="button"
          className={viewer.rotate ? 'is-active' : ''}
          aria-pressed={viewer.rotate}
          aria-label={viewer.rotate ? 'Pausar rotación' : 'Rotar automáticamente'}
          title="Rotación automática"
          disabled={viewer.explode >= 0.4 || viewer.isolate}
          onClick={() => setViewer((current) => ({ ...current, rotate: !current.rotate }))}
        >
          <Icon name="restaurar" size={17} />
        </button>
        <button type="button" aria-label="Restablecer atlas" title="Restablecer" onClick={resetViewer}>
          <Icon name="restaurar" size={16} />
        </button>
      </nav>

      {selectedPart && chosen && (
        <aside className="atlas3d-details" aria-live="polite">
          <div className="atlas3d-detail-accent" style={{ background: selectedSystem?.color }} />
          <div className="atlas3d-panel-heading">
            <div>
              <small>{selectedSystem?.name || 'Anatomía'}</small>
              <span>{displayName}</span>
            </div>
            <button type="button" aria-label="Cerrar detalle" onClick={clearSelection}>
              <Icon name="cerrar" size={17} />
            </button>
          </div>
          {translated && <p className="atlas3d-source-name">Nombre fuente: {sourceName}</p>}
          <p>{explicacionEstructura(sourceName, selectedPart.system)}</p>
          <dl>
            <div><dt>Referencia</dt><dd>{chosen.id}</dd></div>
            <div><dt>Piezas seleccionadas</dt><dd>{formatNumber(viewer.selected.length)}</dd></div>
          </dl>
          {selectedParts.length > 1 && (
            <div className="atlas3d-members">
              <strong>Estructuras incluidas</strong>
              {selectedParts.slice(0, 8).map((part) => (
                <button type="button" key={part.id} onClick={() => choosePart(part.id)}>
                  {nombreEstructura(part.name)} <Icon name="chevronDer" size={13} />
                </button>
              ))}
              {selectedParts.length > 8 && <small>y {formatNumber(selectedParts.length - 8)} piezas más</small>}
            </div>
          )}
          <div className="atlas3d-detail-actions">
            <button
              type="button"
              className="is-primary"
              onClick={() => setViewer((current) => ({
                ...current,
                isolate: !current.isolate,
                explode: 0,
                rotate: false,
                reset: current.reset + 1,
              }))}
            >
              <Icon name="diana" size={17} />
              {viewer.isolate ? 'Mostrar contexto' : 'Aislar estructura'}
            </button>
            <button type="button" onClick={clearSelection}>Quitar selección</button>
          </div>
        </aside>
      )}

      <div className="atlas3d-caption" aria-live="polite">
        <i />
        <span>
          {viewer.isolate
            ? displayName
            : viewer.explode > 0.95
              ? 'INVENTARIO ANATÓMICO'
              : viewer.explode > 0.05
                ? 'ESTRUCTURAS SEPARADAS'
                : 'REFERENCIA HUMANA ADULTA · MASCULINA'}
        </span>
        <i />
      </div>

      <div className="atlas3d-dock">
        <button
          type="button"
          className="atlas3d-mobile-only"
          onClick={() => setPanel((current) => current === 'systems' ? null : 'systems')}
        >
          <Icon name="capas" size={19} />
          <span>Sistemas</span>
        </button>
        <div className="atlas3d-explode">
          <div>
            <label htmlFor="atlas3d-explode">Separar anatomía</label>
            <output htmlFor="atlas3d-explode">{Math.round(viewer.explode * 100)}%</output>
          </div>
          <input
            id="atlas3d-explode"
            type="range"
            min="0"
            max="100"
            step="1"
            value={Math.round(viewer.explode * 100)}
            onChange={(event) => {
              const value = Number(event.target.value) / 100
              setViewer((current) => ({
                ...current,
                explode: value,
                view: value > 0.8 ? 'front' : current.view,
                isolate: false,
                rotate: false,
              }))
            }}
          />
          <div><small>Ensamblado</small><small>Cada pieza</small></div>
        </div>
        <button type="button" onClick={resetViewer}>
          <Icon name="restaurar" size={18} />
          <span>Restablecer</span>
        </button>
      </div>

      <footer className="atlas3d-help">
        <span>{viewer.explode > 0.8 ? 'Arrastra para desplazar' : 'Arrastra para rotar'} · Pellizca o usa la rueda · Toca para identificar</span>
        <button type="button" onClick={() => setAbout(true)}>Alcance y créditos</button>
      </footer>

      {loading && (
        <div className="atlas3d-loading" role="status" aria-live="polite">
          <Icon name="atlas" size={22} />
          <div>
            <strong>{atlas ? 'Preparando la anatomía' : 'Conectando con el atlas'}</strong>
            <span>
              {atlas
                ? `${progress}% · ${formatNumber(atlas.parts.length)} piezas`
                : 'Cargando motor y catálogo versionado'}
            </span>
            <i><b style={{ width: `${atlas ? progress : 8}%` }} /></i>
          </div>
        </div>
      )}

      {error && (
        <div className="atlas3d-loading is-error" role="alert">
          <Icon name="alerta" size={22} />
          <div>
            <strong>No se pudo abrir el atlas</strong>
            <span>{error}</span>
            <button type="button" onClick={() => setReloadKey((value) => value + 1)}>Intentar de nuevo</button>
          </div>
        </div>
      )}

      {about && (
        <div className="atlas3d-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setAbout(false)
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="atlas3d-about-title">
            <button
              type="button"
              className="atlas3d-modal-close"
              aria-label="Cerrar información"
              onClick={() => setAbout(false)}
            >
              <Icon name="cerrar" size={18} />
            </button>
            <span className="atlas3d-eyebrow">FUENTE, LICENCIA Y ALCANCE</span>
            <h2 id="atlas3d-about-title">Un cuerpo de referencia, explorado por capas.</h2>
            <p>
              El atlas utiliza BodyParts3D 4.0: una referencia anatómica masculina adulta. No representa todas las estructuras, edades, sexos, variaciones o condiciones clínicas.
            </p>
            <p>
              Es una herramienta educativa para relacionar anatomía con el estudio prehospitalario. No sustituye fuentes académicas revisadas, valoración clínica, diagnóstico ni planeación quirúrgica.
            </p>
            <h3>Atribución</h3>
            <p>
              BodyParts3D, © The Database Center for Life Science, bajo licencia CC BY 4.0. Geometría adaptada y optimizada para navegador por el proyecto Human Atlas; interfaz, integración y experiencia PTEM adaptadas por Riders.Media.
            </p>
            <div className="atlas3d-source-links">
              <a href={BODYPARTS3D_URL} target="_blank" rel="noopener noreferrer">BodyParts3D <Icon name="flechaDiagonal" size={13} /></a>
              <a href={BODYPARTS3D_LICENSE_URL} target="_blank" rel="noopener noreferrer">Licencia del conjunto <Icon name="flechaDiagonal" size={13} /></a>
              <a href={`${ATLAS_REPOSITORY_URL}/tree/${ATLAS_SOURCE_COMMIT}`} target="_blank" rel="noopener noreferrer">Código fuente fijado <Icon name="flechaDiagonal" size={13} /></a>
              <Link to="/creditos" onClick={() => setAbout(false)}>Créditos de PTEM <Icon name="chevronDer" size={13} /></Link>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
