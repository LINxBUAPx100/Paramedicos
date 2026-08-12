import { useEffect, useState } from 'react'
import { mensajeError } from '../../lib/panelModelo.js'
import Icon from '../Icon.jsx'
import CompartirCodigo from '../CompartirCodigo.jsx'

// ============================================================
//  Códigos de acceso temporal (probar el servicio)
// ------------------------------------------------------------
//  `academias`: solo para el super-admin — lista para elegir a qué academia
//  pertenece el código nuevo (o dejarlo global). `grupos`: grupos ya cargados
//  de la academia fija (panel del director / dashboard de academia).
// ============================================================

export default function CodigosPrueba({ academiaId = null, academiaNombre = '', miUid, academias = null, grupos = null }) {
  const [codigos, setCodigos] = useState(null)
  const [dias, setDias] = useState(7)
  const [nota, setNota] = useState('')
  const [acaSel, setAcaSel] = useState('') // '' = código global (solo super-admin)
  const [grupoSel, setGrupoSel] = useState('') // '' = sin grupo
  const [gruposDeAca, setGruposDeAca] = useState([]) // superadmin: grupos de acaSel
  const [nuevo, setNuevo] = useState(null) // último código creado (para copiarlo)
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')

  const academiaEfectiva = academias ? (acaSel || null) : academiaId
  const gruposDisponibles = academias ? gruposDeAca : grupos || []

  const cargar = async () => {
    try {
      const { listarCodigos } = await import('../../lib/firebase/codigos.js')
      setCodigos(await listarCodigos(academiaId))
    } catch (err) {
      setCodigos([])
      setError(mensajeError(err, 'No se pudieron cargar los códigos'))
    }
  }
  useEffect(() => { cargar() }, [academiaId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Super-admin: al elegir academia, carga sus grupos para poder asignar uno.
  useEffect(() => {
    if (!academias) return
    setGrupoSel('')
    if (!acaSel) { setGruposDeAca([]); return }
    let activo = true
    ;(async () => {
      try {
        const { listarGrupos } = await import('../../lib/firebase/grupos.js')
        const lista = await listarGrupos(acaSel)
        if (activo) setGruposDeAca(lista)
      } catch {
        if (activo) setGruposDeAca([])
      }
    })()
    return () => { activo = false }
  }, [academias, acaSel])

  const crear = async (e) => {
    e.preventDefault()
    setOcupado(true)
    setError('')
    try {
      const { crearCodigo } = await import('../../lib/firebase/codigos.js')
      const grupo = gruposDisponibles.find((g) => g.id === grupoSel) || null
      const c = await crearCodigo({
        creadoPor: miUid,
        academiaId: academiaEfectiva,
        grupoId: grupo?.id || null,
        grupoNombre: grupo?.nombre || '',
        dias: Number(dias),
        nota,
      })
      setNuevo(c.id)
      setNota('')
      await cargar()
    } catch (err) {
      setError(mensajeError(err, 'No se pudo crear el código'))
    } finally {
      setOcupado(false)
    }
  }

  const alternar = async (c) => {
    try {
      const { alternarCodigo } = await import('../../lib/firebase/codigos.js')
      await alternarCodigo(c.id, c.estado === 'activo' ? 'inactivo' : 'activo')
      await cargar()
    } catch (err) {
      setError(mensajeError(err, 'No se pudo cambiar el estado del código'))
    }
  }

  // Un código de prueba es efímero y no arrastra datos de nadie: quien lo
  // canjeó conserva su acceso hasta que venza. Por eso basta un confirm y no
  // la confirmación reforzada que sí piden los grupos.
  const borrar = async (c) => {
    if (!window.confirm(
      `¿Borrar el código ${c.id}?\n\n` +
      'Desaparece de la lista y deja de poder canjearse. Quien ya lo haya usado ' +
      'conserva su acceso hasta que venza.\n\n' +
      'Si solo quieres que deje de servir, usa "Desactivar": conserva el rastro.'
    )) return
    try {
      const { borrarCodigo } = await import('../../lib/firebase/codigos.js')
      await borrarCodigo(c.id)
      await cargar()
    } catch (err) {
      setError(mensajeError(err, 'No se pudo borrar el código'))
    }
  }

  const copiar = (id) => {
    try { navigator.clipboard.writeText(id) } catch { /* sin permisos */ }
  }

  const ahora = Date.now()
  const estadoDe = (c) => {
    if ((c.expira?.seconds || 0) * 1000 <= ahora) return 'expirado'
    return c.estado === 'activo' ? 'activo' : 'inactivo'
  }
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { dateStyle: 'medium' }) : '—'

  return (
    <section className="panel-codigos">
      <h2><Icon name="pildora" size={20} /> Códigos de prueba</h2>
      <p className="panel-gestion-sub">
        Genera códigos de acceso temporal para que alguien pruebe la plataforma sin inscribirse.
        La persona lo activa en <strong>Mi cuenta → Únete con tu código</strong>.
      </p>

      <form className="pc-form" onSubmit={crear}>
        {academias && (
          <label>
            Academia
            <select value={acaSel} onChange={(e) => setAcaSel(e.target.value)}>
              <option value="">— Global (sin academia) —</option>
              {academias.map((a) => (
                <option key={a.id} value={a.id}>{a.id} — {a.nombre}</option>
              ))}
            </select>
          </label>
        )}
        {academiaEfectiva && gruposDisponibles.length > 0 && (
          <label>
            Grupo (se integra al canjear)
            <select value={grupoSel} onChange={(e) => setGrupoSel(e.target.value)}>
              <option value="">— Sin grupo —</option>
              {gruposDisponibles.map((g) => (
                <option key={g.id} value={g.id}>{g.nombre}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          Vigencia
          <select value={dias} onChange={(e) => setDias(e.target.value)}>
            <option value={3}>3 días</option>
            <option value={7}>7 días</option>
            <option value={14}>14 días</option>
            <option value={30}>30 días</option>
          </select>
        </label>
        <label className="pc-nota">
          Nota (opcional)
          <input type="text" value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Para quién es" maxLength={60} />
        </label>
        <button className="btn btn--primario" type="submit" disabled={ocupado}>
          {ocupado ? 'Creando…' : '+ Crear código'}
        </button>
      </form>

      {nuevo && (
        <p className="pc-nuevo" role="status">
          Código creado: <code>{nuevo}</code>
          <button className="pc-copiar" onClick={() => copiar(nuevo)}>Copiar</button>
          <CompartirCodigo codigo={nuevo} nombre={academiaNombre || academiaEfectiva || 'PTEM'} tipo="prueba" />
        </p>
      )}
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {codigos === null ? null : codigos.length === 0 ? (
        <p className="panel-vacio">Aún no has creado códigos de prueba.</p>
      ) : (
        <ul className="pc-lista">
          {codigos.map((c) => {
            const est = estadoDe(c)
            return (
              <li key={c.id} className={`pc-item ${est}`}>
                <code className="pc-codigo">{c.id}</code>
                {academias && (
                  <span className="pc-academia">{c.academiaId || 'global'}</span>
                )}
                {c.grupoId && (
                  <span className="pc-academia pc-grupo">
                    {(gruposDisponibles.find((g) => g.id === c.grupoId)?.nombre) || c.grupoId}
                  </span>
                )}
                <span className="pc-detalle">
                  {c.nota && <strong>{c.nota} · </strong>}
                  expira {fechaTxt(c.expira)}
                </span>
                <span className={`pc-estado ${est}`}>{est}</span>
                <span className="pc-acciones">
                  <button className="pc-copiar" onClick={() => copiar(c.id)}>Copiar</button>
                  {est === 'activo' && (
                    <CompartirCodigo codigo={c.id} nombre={academiaNombre || c.academiaId || 'PTEM'} tipo="prueba" />
                  )}
                  {est !== 'expirado' && (
                    <button className="pc-toggle" onClick={() => alternar(c)}>
                      {est === 'activo' ? 'Desactivar' : 'Reactivar'}
                    </button>
                  )}
                  {/* SIMETRÍA (Bloque M): se creaban códigos y solo se podían
                      desactivar. Los expirados se acumulaban en la lista para
                      siempre, y `borrarCodigo` llevaba ahí sin usar. Desactivar
                      sigue siendo lo recomendable —conserva el rastro—; borrar
                      es para limpiar. */}
                  <button className="pc-toggle pc-borrar" onClick={() => borrar(c)}>
                    Borrar
                  </button>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
