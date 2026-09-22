import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import {
  CATEGORIAS, articuloParaEditar, articuloVacio, etiquetaCategoria,
  problemasDelArticulo,
} from '../../lib/tiendaModelo.js'
import { STORAGE_ACTIVO } from '../../lib/archivosModelo.js'
import { moneda } from '../../lib/staff/cajaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import '../../styles/tienda.css'

// ============================================================
//  Catálogo de la tienda — lo publica la dirección
// ------------------------------------------------------------
//  ES UN COMPONENTE Y NO UNA PÁGINA porque lo montan las dos consolas: el
//  director desde su panel y el super-admin desde la academia que esté mirando.
//  Eso no es un extra, es lo que exige `tests/paridadSuperAdmin.test.mjs`: una
//  capacidad que existe en el servidor y no existe en una de las dos
//  interfaces es una capacidad que, en la práctica, no existe.
//
//  DOS DECISIONES QUE SE VEN EN PANTALLA:
//
//  1. **Despublicar, no borrar.** Quitar un artículo del catálogo se hace
//     apagándolo: sigue existiendo, así que las compras que ya lo incluyen
//     conservan su nombre. Un historial de compras con huecos no sirve para
//     reclamar nada. Borrar de verdad está, pero aparte y avisado.
//  2. **La imagen es un ENLACE.** Firebase Storage exige plan Blaze y en esta
//     instalación está apagado, así que un botón de subida se rompería al
//     pulsarlo. Es el mismo camino por el que se sirve todo el material de la
//     plataforma. El día que haya bucket, el botón aparece solo: el código de
//     subida ya existe y solo mira `STORAGE_ACTIVO`.
// ============================================================
export default function EditorCatalogo({ academiaId, academiaNombre = '', miUid }) {
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [editando, setEditando] = useState(null) // null | id | '__nuevo__'
  const [form, setForm] = useState(articuloVacio)
  const [guardando, setGuardando] = useState(false)
  const [intentado, setIntentado] = useState(false)
  const primerCampo = useRef(null)

  const cargar = useCallback(async () => {
    if (!academiaId) return
    setCargando(true)
    setError('')
    try {
      const { catalogoDeAcademia } = await import('../../lib/firebase/tienda.js')
      setArticulos(await catalogoDeAcademia(academiaId, { incluirInactivos: true }))
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar el catálogo', 'articulos'))
    } finally {
      setCargando(false)
    }
  }, [academiaId])

  useEffect(() => { cargar() }, [cargar])

  const problemas = useMemo(() => problemasDelArticulo(form), [form])
  const campo = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const abrirNuevo = () => {
    setEditando('__nuevo__')
    setForm(articuloVacio())
    setIntentado(false)
    setAviso('')
    setTimeout(() => primerCampo.current?.focus(), 0)
  }

  const abrirEdicion = (a) => {
    setEditando(a.id)
    setForm(articuloParaEditar(a))
    setIntentado(false)
    setAviso('')
    setTimeout(() => primerCampo.current?.focus(), 0)
  }

  const cerrar = () => { setEditando(null); setIntentado(false) }

  const guardar = async (e) => {
    e.preventDefault()
    setIntentado(true)
    setError('')
    if (problemas.length) return
    setGuardando(true)
    try {
      const { guardarArticulo } = await import('../../lib/firebase/tienda.js')
      await guardarArticulo({
        articulo: form,
        articuloId: editando === '__nuevo__' ? null : editando,
        academiaId,
        creadoPor: miUid,
      })
      setAviso(editando === '__nuevo__' ? 'Artículo publicado.' : 'Cambios guardados.')
      cerrar()
      await cargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo guardar el artículo', 'articulos'))
    } finally {
      setGuardando(false)
    }
  }

  const alternarPublicado = async (a) => {
    setError('')
    try {
      const { despublicarArticulo } = await import('../../lib/firebase/tienda.js')
      await despublicarArticulo(a.id, !a.activo)
      await cargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cambiar la publicación', 'articulos'))
    }
  }

  const borrar = async (a) => {
    setError('')
    try {
      const { borrarArticulo } = await import('../../lib/firebase/tienda.js')
      await borrarArticulo(a.id)
      setAviso(`«${a.nombre}» se borró del catálogo.`)
      await cargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo borrar el artículo', 'articulos'))
    }
  }

  const publicados = articulos.filter((a) => a.activo).length

  return (
    <div className="tienda-editor">
      <div className="ui-herramientas">
        <p className="staff-ayuda">
          {publicados} publicado(s) de {articulos.length}. Lo publicado es lo que ven los alumnos
          de {academiaNombre || 'la academia'} en su tienda.
        </p>
        <div className="ui-atajos">
          <button type="button" className="btn btn--sm" onClick={cargar}>
            <Icon name="restaurar" size={16} /> Actualizar
          </button>
          <button type="button" className="btn btn--primario" onClick={abrirNuevo}>
            <Icon name="mas" size={18} /> Nuevo artículo
          </button>
        </div>
      </div>

      {error && <p className="ui-nota-error" role="alert">{error}</p>}
      {aviso && <p className="staff-aviso" role="status">{aviso}</p>}
      {cargando && <p className="staff-ayuda" role="status">Cargando el catálogo…</p>}

      {editando && (
        <form className="ui-panel tienda-form" onSubmit={guardar}>
          <h4>{editando === '__nuevo__' ? 'Nuevo artículo' : 'Editar artículo'}</h4>

          <div className="ui-herramientas">
            <label className="ui-campo">
              <span>Nombre</span>
              <input ref={primerCampo} type="text" value={form.nombre} onChange={campo('nombre')} maxLength={80} />
            </label>
            <label className="ui-campo">
              <span>Categoría</span>
              <select value={form.categoria} onChange={campo('categoria')}>
                {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.etiqueta}</option>)}
              </select>
            </label>
            <label className="ui-campo">
              <span>Precio</span>
              <input type="number" min="0" step="0.01" inputMode="decimal" value={form.precio} onChange={campo('precio')} />
            </label>
            <label className="ui-campo">
              <span>Existencias</span>
              <input type="number" min="0" step="1" inputMode="numeric" value={form.existencias} onChange={campo('existencias')} />
            </label>
          </div>

          <label className="ui-campo">
            <span>Descripción <em>(opcional)</em></span>
            <textarea value={form.descripcion} onChange={campo('descripcion')} rows={3} maxLength={500} />
          </label>

          <label className="ui-campo">
            <span>Imagen <em>(enlace https, opcional)</em></span>
            <input type="url" value={form.imagen} onChange={campo('imagen')} placeholder="https://…" />
            <em className="staff-ayuda">
              {STORAGE_ACTIVO
                ? 'También puedes subirla desde el editor de contenido y pegar aquí su enlace.'
                : 'La subida de archivos no está activa en esta instalación: pega el enlace de la imagen (Drive, tu web…). Sin imagen, el artículo sale con un marcador.'}
            </em>
          </label>

          {form.imagen && (
            <div className="tienda-previa-img">
              <img src={form.imagen} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <span className="staff-ayuda">Así se verá. Si no aparece nada, el enlace no sirve.</span>
            </div>
          )}

          <label className="tienda-check">
            <input type="checkbox" checked={form.activo} onChange={() => setForm((f) => ({ ...f, activo: !f.activo }))} />
            <span>Publicado: los alumnos lo ven en su tienda</span>
          </label>

          {intentado && problemas.length > 0 && (
            <ul className="ui-nota-error" role="alert">{problemas.map((p) => <li key={p}>{p}</li>)}</ul>
          )}

          <div className="ui-atajos">
            <button type="submit" className="btn btn--primario" disabled={guardando}>
              <Icon name="check" size={18} /> {guardando ? 'Guardando…' : 'Guardar'}
            </button>
            <button type="button" className="btn btn--sm" onClick={cerrar} disabled={guardando}>Cancelar</button>
          </div>
        </form>
      )}

      {!cargando && articulos.length === 0 && (
        <p className="staff-ayuda">
          El catálogo está vacío. Publica el primer artículo con «Nuevo artículo»: los alumnos
          lo verán en su tienda y recepción podrá apartarlo y entregarlo.
        </p>
      )}

      <ul className="tienda-rejilla tienda-rejilla--admin">
        {articulos.map((a) => (
          <li key={a.id} className={`tienda-tarjeta ${a.activo ? '' : 'es-apagada'}`}>
            <div className="tienda-img">
              {a.imagen
                ? <img src={a.imagen} alt="" loading="lazy" />
                : <span className="tienda-sin-img" aria-hidden="true"><Icon name="carpeta" size={28} /></span>}
            </div>
            <div className="tienda-datos">
              <b>{a.nombre}</b>
              <span className="staff-ayuda">{etiquetaCategoria(a.categoria)}</span>
              {a.descripcion && <p className="tienda-desc">{a.descripcion}</p>}
              <p className="tienda-precio">{moneda(a.precio)}</p>
              <p className={a.existencias === 0 ? 'staff-agotado' : 'staff-ayuda'}>
                {a.existencias === 0 ? 'Agotado' : `${a.existencias} en inventario`}
              </p>
              {!a.activo && <span className="ui-etiqueta">Sin publicar</span>}
            </div>
            <div className="tienda-acciones">
              <button type="button" className="btn btn--sm" onClick={() => abrirEdicion(a)}>
                <Icon name="editar" size={14} /> Editar
              </button>
              <button type="button" className="btn btn--sm" onClick={() => alternarPublicado(a)}>
                <Icon name={a.activo ? 'ojoCerrado' : 'ojo'} size={14} />
                {a.activo ? ' Despublicar' : ' Publicar'}
              </button>
              <BotonBorrar articulo={a} onBorrar={borrar} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Borrar pide confirmación en el propio botón.
 *
 * No es ceremonia: borrar un artículo se lleva por delante el nombre que
 * aparece en las compras que ya lo incluyen. Casi siempre lo correcto es
 * despublicar, y por eso el botón de borrar es el más discreto de los tres.
 */
function BotonBorrar({ articulo, onBorrar }) {
  const [confirmando, setConfirmando] = useState(false)
  if (!confirmando) {
    return (
      <button type="button" className="ui-enlace" onClick={() => setConfirmando(true)}>
        Borrar
      </button>
    )
  }
  return (
    <span className="tienda-confirma">
      <span className="staff-ayuda">¿Borrar del todo?</span>
      <button type="button" className="ui-enlace" onClick={() => onBorrar(articulo)}>Sí, borrar</button>
      <button type="button" className="ui-enlace" onClick={() => setConfirmando(false)}>No</button>
    </span>
  )
}
