import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { catalogoBotiquinInicial } from '../data/botiquin/catalogoInicial.js'
import BotiquinScene from '../features/botiquin3d/BotiquinScene.jsx'
import {
  COMPARTIMENTOS_BOTIQUIN,
  etiquetaCantidadArticulo,
  filtrarCatalogoBotiquin,
} from '../lib/botiquinModelo.js'
import { estadosDelCatalogo, resumenDeEstados } from '../lib/botiquinEstados.js'
import '../features/botiquin3d/botiquin3d.css'

const ETIQUETAS_ESTADO = {
  disponible: 'En tu botiquín',
  proximo: 'Próximo a desbloquear',
  bloqueado: 'Bloqueado',
  silueta: 'Pendiente de validación',
}

const ETIQUETAS_CADUCIDAD = {
  no_aplica: 'No aplica fecha de caducidad; revisar integridad y funcionamiento.',
  revisar_fecha: 'Revisar fecha, lote e integridad declarados por el fabricante.',
  esteril_sellado: 'Debe conservar su empaque estéril sellado y su fecha legible.',
  por_definir: 'Criterio de caducidad pendiente de confirmar por la academia.',
}

function numero(valor) {
  return Number(valor || 0).toLocaleString('es-MX')
}

function ItemLista({ articulo, acceso, activo, onChoose }) {
  return (
    <button
      type="button"
      className={`botiquin3d-list-item estado-${acceso?.estado || 'bloqueado'} ${activo ? 'is-active' : ''}`}
      onClick={() => onChoose(articulo)}
      aria-pressed={activo}
    >
      <span className="botiquin3d-list-symbol" aria-hidden="true">
        <Icon name={acceso?.muestraFicha ? 'cruz' : 'candado'} size={17} />
      </span>
      <span>
        <strong>{articulo.nombre}</strong>
        <small>{articulo.presentacion || etiquetaCantidadArticulo(articulo)}</small>
      </span>
      <em>{etiquetaCantidadArticulo(articulo)}</em>
    </button>
  )
}

function ListaBreve({ titulo, items }) {
  if (!items?.length) return null
  return (
    <section className="botiquin3d-detail-section">
      <h3>{titulo}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  )
}

export default function BotiquinPage() {
  const pageRef = useRef(null)
  const dialogRef = useRef(null)
  const searchRef = useRef(null)
  const previousFocusRef = useRef(null)
  const { esStaff, esSuperadmin, academiaId } = useAuth()
  const { estado: progreso } = useProgress()
  const [catalogo] = useState(catalogoBotiquinInicial)
  const [validaciones, setValidaciones] = useState({})
  const [consulta, setConsulta] = useState('')
  const [compartimento, setCompartimento] = useState('todos')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [seleccionadoId, setSeleccionadoId] = useState(null)
  const [autoRotate, setAutoRotate] = useState(false)
  const [resetToken, setResetToken] = useState(0)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [fullscreen, setFullscreen] = useState(false)
  const [reto, setReto] = useState(null)
  const [mensajeReto, setMensajeReto] = useState('')

  const vistaInstructor = Boolean(esStaff || esSuperadmin)

  useEffect(() => {
    const anterior = document.title
    document.title = 'Mi Botiquín 3D · PTEM'
    return () => { document.title = anterior }
  }, [])

  useEffect(() => {
    let activo = true
    if (!academiaId && !esSuperadmin) return undefined
    ;(async () => {
      try {
        const { leerValidaciones } = await import('../lib/firebase/validaciones.js')
        const mapa = await leerValidaciones(academiaId || null)
        if (activo) setValidaciones(mapa)
      } catch {
        if (activo) setValidaciones({})
      }
    })()
    return () => { activo = false }
  }, [academiaId, esSuperadmin])

  useEffect(() => {
    const onFullscreen = () => setFullscreen(document.fullscreenElement === pageRef.current)
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => document.removeEventListener('fullscreenchange', onFullscreen)
  }, [])

  const estados = useMemo(() => estadosDelCatalogo(catalogo, {
    leidos: progreso.leidos || {},
    validaciones,
    vistaInstructor,
  }), [catalogo, progreso.leidos, validaciones, vistaInstructor])

  const resumen = useMemo(() => resumenDeEstados(estados), [estados])
  const filtrados = useMemo(() => filtrarCatalogoBotiquin(catalogo, {
    consulta,
    compartimento,
    estado: filtroEstado,
    estados,
  }), [catalogo, consulta, compartimento, filtroEstado, estados])
  const seleccionado = useMemo(
    () => catalogo.find((item) => item.id === seleccionadoId) || null,
    [catalogo, seleccionadoId],
  )
  const accesoSeleccionado = seleccionado ? estados[seleccionado.id] : null

  const cerrarDetalle = useCallback(() => {
    setSeleccionadoId(null)
    requestAnimationFrame(() => previousFocusRef.current?.focus?.())
  }, [])

  useEffect(() => {
    if (!seleccionado) return undefined
    previousFocusRef.current = document.activeElement
    requestAnimationFrame(() => dialogRef.current?.querySelector('button')?.focus())
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        cerrarDetalle()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focos = [...dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )]
      if (!focos.length) return
      const primero = focos[0]
      const ultimo = focos[focos.length - 1]
      if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault()
        ultimo.focus()
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault()
        primero.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [seleccionado, cerrarDetalle])

  useEffect(() => {
    const onKey = (event) => {
      const escribiendo = event.target instanceof HTMLInputElement
        || event.target instanceof HTMLTextAreaElement
        || event.target?.isContentEditable
      if (event.key === '/' && !escribiendo) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const seleccionar = useCallback((id) => {
    const item = catalogo.find((articulo) => articulo.id === id)
    if (!item) return
    setSeleccionadoId(id)
    if (reto?.objetivoId) {
      if (id === reto.objetivoId) {
        setMensajeReto('Correcto. Localizaste el artículo solicitado.')
        setReto((actual) => actual ? { ...actual, resuelto: true } : null)
      } else {
        setMensajeReto('Ese no es el artículo solicitado. Revisa el compartimento y vuelve a intentarlo.')
      }
    }
  }, [catalogo, reto])

  const elegirDesdeLista = useCallback((item) => {
    if (compartimento !== 'todos' && compartimento !== item.compartimento) {
      setCompartimento(item.compartimento)
    }
    seleccionar(item.id)
  }, [compartimento, seleccionar])

  const iniciarReto = () => {
    const candidatos = catalogo.filter((item) => estados[item.id]?.muestraFicha)
    if (!candidatos.length) {
      setMensajeReto('No hay artículos disponibles para iniciar el reto con este acceso.')
      return
    }
    const previo = reto?.objetivoId
    const opciones = candidatos.filter((item) => item.id !== previo)
    const bolsa = opciones.length ? opciones : candidatos
    const objetivo = bolsa[Math.floor(Math.random() * bolsa.length)]
    setReto({ objetivoId: objetivo.id, nombre: objetivo.nombre, resuelto: false })
    setMensajeReto('Selecciona el artículo directamente dentro del botiquín 3D.')
    setSeleccionadoId(null)
    setCompartimento('todos')
  }

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await pageRef.current?.requestFullscreen?.()
    } catch {
      setError('El navegador no permitió abrir el botiquín en pantalla completa.')
    }
  }

  return (
    <div ref={pageRef} className={`botiquin3d-page ${fullscreen ? 'is-fullscreen' : ''}`}>
      <BotiquinScene
        catalogo={catalogo}
        estados={estados}
        selectedId={seleccionadoId}
        compartimento={compartimento}
        autoRotate={autoRotate}
        resetToken={resetToken}
        onSelect={seleccionar}
        onReady={() => { setReady(true); setError('') }}
        onError={(mensaje) => { setReady(false); setError(mensaje) }}
      />
      <div className="botiquin3d-vignette" aria-hidden="true" />

      <header className="botiquin3d-identity">
        <span className="botiquin3d-eyebrow"><i /> PTEM · INVENTARIO INTERACTIVO</span>
        <h1>Mi Botiquín <b>3D</b></h1>
        <p>{numero(catalogo.length)} artículos <span>·</span> {COMPARTIMENTOS_BOTIQUIN.length} compartimentos</p>
      </header>

      <nav className="botiquin3d-top-actions" aria-label="Herramientas del botiquín">
        <label className="botiquin3d-search">
          <Icon name="buscar" size={17} />
          <input
            ref={searchRef}
            type="search"
            value={consulta}
            onChange={(event) => setConsulta(event.target.value)}
            placeholder="Buscar artículo"
            aria-label="Buscar un artículo del botiquín"
          />
          <kbd>/</kbd>
        </label>
        <button
          type="button"
          className={autoRotate ? 'is-active' : ''}
          aria-pressed={autoRotate}
          title="Rotación automática"
          onClick={() => setAutoRotate((valor) => !valor)}
        >
          <Icon name="restaurar" size={18} />
        </button>
        <button type="button" title="Restablecer cámara" onClick={() => setResetToken((n) => n + 1)}>
          <Icon name="diana" size={18} />
        </button>
        <button type="button" title="Pantalla completa" onClick={toggleFullscreen}>
          <Icon name={fullscreen ? 'cerrar' : 'expandir'} size={18} />
        </button>
      </nav>

      <aside className="botiquin3d-compartments" aria-label="Compartimentos del botiquín">
        <div className="botiquin3d-panel-heading">
          <div><strong>Compartimentos</strong><small>Selecciona una bandeja</small></div>
          <Icon name="capas" size={18} />
        </div>
        <button
          type="button"
          className={compartimento === 'todos' ? 'is-active' : ''}
          onClick={() => setCompartimento('todos')}
        >
          <i style={{ '--color-comp': '#94a3b8' }} />
          <span>Botiquín completo</span>
          <em>{catalogo.length}</em>
        </button>
        {COMPARTIMENTOS_BOTIQUIN.map((comp) => {
          const total = catalogo.filter((item) => item.compartimento === comp.id).length
          return (
            <button
              type="button"
              key={comp.id}
              className={compartimento === comp.id ? 'is-active' : ''}
              onClick={() => setCompartimento(comp.id)}
            >
              <i style={{ '--color-comp': comp.color }} />
              <span>{comp.corto}</span>
              <em>{total}</em>
            </button>
          )
        })}
      </aside>

      <section className="botiquin3d-inventory" aria-label="Inventario del botiquín">
        <div className="botiquin3d-panel-heading">
          <div>
            <strong>Inventario</strong>
            <small>{filtrados.length} de {catalogo.length} artículos</small>
          </div>
          <select
            value={filtroEstado}
            onChange={(event) => setFiltroEstado(event.target.value)}
            aria-label="Filtrar por estado"
          >
            <option value="todos">Todos</option>
            <option value="disponible">Disponibles</option>
            <option value="proximo">Próximos</option>
            <option value="bloqueado">Bloqueados</option>
            <option value="silueta">Por validar</option>
          </select>
        </div>
        <div className="botiquin3d-list">
          {filtrados.length ? filtrados.map((item) => (
            <ItemLista
              key={item.id}
              articulo={item}
              acceso={estados[item.id]}
              activo={seleccionadoId === item.id}
              onChoose={elegirDesdeLista}
            />
          )) : (
            <p className="botiquin3d-empty">No hay artículos que coincidan con los filtros.</p>
          )}
        </div>
      </section>

      <section className={`botiquin3d-challenge ${reto ? 'is-active' : ''}`} aria-live="polite">
        <div>
          <span>Reto de identificación</span>
          <strong>{reto ? `Localiza: ${reto.nombre}` : 'Encuentra un artículo dentro del botiquín'}</strong>
          {mensajeReto && <small className={reto?.resuelto ? 'is-success' : ''}>{mensajeReto}</small>}
        </div>
        <button type="button" onClick={iniciarReto}>
          <Icon name={reto?.resuelto ? 'restaurar' : 'diana'} size={17} />
          {reto ? 'Otro reto' : 'Comenzar'}
        </button>
      </section>

      <div className="botiquin3d-status" aria-live="polite">
        <span><i className="disponible" /> {resumen.disponible} disponibles</span>
        <span><i className="proximo" /> {resumen.proximo} próximos</span>
        <span><i className="bloqueado" /> {resumen.bloqueado + resumen.silueta} restringidos</span>
        {vistaInstructor && <b>Vista de instructor</b>}
      </div>

      {!ready && !error && (
        <div className="botiquin3d-loading" role="status">
          <span className="ruta-spinner" aria-hidden="true" />
          <strong>Preparando el botiquín 3D</strong>
          <small>Construyendo compartimentos y artículos…</small>
        </div>
      )}

      {error && (
        <div className="botiquin3d-error" role="alert">
          <Icon name="alerta" size={22} />
          <div><strong>No se pudo mostrar el botiquín 3D</strong><p>{error}</p></div>
          <button type="button" onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      )}

      {seleccionado && (
        <div className="botiquin3d-detail-layer" onMouseDown={(event) => {
          if (event.target === event.currentTarget) cerrarDetalle()
        }}>
          <article
            ref={dialogRef}
            className="botiquin3d-detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="botiquin-detalle-titulo"
          >
            <header>
              <span className={`botiquin3d-state estado-${accesoSeleccionado?.estado}`}>
                {ETIQUETAS_ESTADO[accesoSeleccionado?.estado] || 'Artículo'}
              </span>
              <button type="button" aria-label="Cerrar ficha" onClick={cerrarDetalle}>
                <Icon name="cerrar" size={19} />
              </button>
              <h2 id="botiquin-detalle-titulo">{seleccionado.nombre}</h2>
              <p>{seleccionado.presentacion || etiquetaCantidadArticulo(seleccionado)}</p>
            </header>

            {!accesoSeleccionado?.muestraFicha ? (
              <div className="botiquin3d-locked-card">
                <Icon name="candado" size={30} />
                <h3>Ficha restringida</h3>
                <p>{accesoSeleccionado?.motivo}</p>
              </div>
            ) : (
              <div className="botiquin3d-detail-content">
                <section className="botiquin3d-quantity-card">
                  <span>Cantidad registrada</span>
                  <strong>{etiquetaCantidadArticulo(seleccionado)}</strong>
                  <small>No representa una dotación normativa mínima.</small>
                </section>
                <section className="botiquin3d-detail-section">
                  <h3>Qué es</h3>
                  <p>{seleccionado.resumen}</p>
                </section>
                {seleccionado.variantes?.length > 0 && (
                  <section className="botiquin3d-detail-section">
                    <h3>Variantes registradas</h3>
                    <div className="botiquin3d-variants">
                      {seleccionado.variantes.map((variante) => (
                        <span key={variante.id}>
                          <strong>{variante.nombre || variante.presentacion || variante.calibre || variante.medida}</strong>
                          <small>{variante.cantidad == null ? 'Cantidad por confirmar' : `${variante.cantidad}`}</small>
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                <ListaBreve titulo="Cómo se reconoce" items={seleccionado.comoSeReconoce} />
                <ListaBreve titulo="Con qué se puede confundir" items={seleccionado.seConfundeCon} />
                <ListaBreve titulo="Revisión antes del turno" items={seleccionado.comoSeRevisa} />
                <ListaBreve titulo="Errores de manejo del material" items={seleccionado.erroresFrecuentes} />
                <section className="botiquin3d-detail-section">
                  <h3>Integridad y caducidad</h3>
                  <p>{ETIQUETAS_CADUCIDAD[seleccionado.caducidad]}</p>
                </section>
                <div className="botiquin3d-safety-note">
                  <Icon name="libro" size={18} />
                  <p><strong>La ficha identifica; la lección enseña.</strong> Este inventario no sustituye la enseñanza supervisada ni contiene una técnica de aplicación.</p>
                </div>
                {accesoSeleccionado?.permiteEnlace && seleccionado.temaId ? (
                  <Link className="botiquin3d-lesson-link" to={`/tema/${seleccionado.temaId}`}>
                    Abrir la lección que enseña su uso <Icon name="flecha" size={17} />
                  </Link>
                ) : seleccionado.temaId ? (
                  <p className="botiquin3d-pending-link">La lección asociada se habilitará aquí cuando cumpla la validación docente requerida.</p>
                ) : (
                  <p className="botiquin3d-pending-link">La academia todavía no ha asociado una lección canónica a este artículo.</p>
                )}
              </div>
            )}
          </article>
        </div>
      )}
    </div>
  )
}
