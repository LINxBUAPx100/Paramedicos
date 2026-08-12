import { useState } from 'react'
import { mensajeError } from '../../lib/panelModelo.js'
import Icon from '../Icon.jsx'
import CompartirCodigo from '../CompartirCodigo.jsx'
import ConfirmacionReforzada from '../ConfirmacionReforzada.jsx'

// ============================================================
//  Grupos internos de la academia — crear, renombrar, activar, borrar
// ------------------------------------------------------------
//  Ya no lleva un enlace a /temario para la visibilidad: eso vive ahora en la
//  misma sección, justo debajo (Bloque O).
// ============================================================

export default function GruposAcademia({ academiaId, academiaNombre = '', grupos, miembros, miUid, onCambio }) {
  const [nombre, setNombre] = useState('')
  const [nuevo, setNuevo] = useState(null) // último código creado
  const [editandoId, setEditandoId] = useState(null)
  const [nombreEdit, setNombreEdit] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')
  const [borrando, setBorrando] = useState(null) // grupo pendiente de confirmar

  const cuentaDe = (gid) => {
    const del = miembros.filter((m) => m.grupoId === gid)
    return {
      alumnos: del.filter((m) => m.rol === 'alumno').length,
      profes: del.filter((m) => m.rol !== 'alumno').length,
    }
  }

  const correr = async (fn) => {
    setOcupado(true)
    setError('')
    try {
      await fn()
      onCambio()
    } catch (err) {
      // Un fallo de validación (nombre vacío, código repetido) trae su propio
      // mensaje; el de reglas sin publicar lo traduce `mensajeError`.
      setError(
        err?.code
          ? mensajeError(err, 'No se pudo completar la operación', 'grupos')
          : err?.message || 'No se pudo completar la operación.'
      )
    } finally {
      setOcupado(false)
    }
  }

  const crear = (e) => {
    e.preventDefault()
    correr(async () => {
      const { crearGrupo } = await import('../../lib/firebase/grupos.js')
      const g = await crearGrupo({ academiaId, nombre, creadoPor: miUid })
      setNuevo(g.id)
      setNombre('')
    })
  }

  const renombrar = (id) => {
    const nom = nombreEdit
    setEditandoId(null)
    correr(async () => {
      const { renombrarGrupo } = await import('../../lib/firebase/grupos.js')
      await renombrarGrupo(id, nom)
    })
  }

  const alternar = (g) =>
    correr(async () => {
      const { alternarGrupo } = await import('../../lib/firebase/grupos.js')
      await alternarGrupo(g.id, g.estado === 'activo' ? 'inactivo' : 'activo')
    })

  const borrar = (g) =>
    correr(async () => {
      const { borrarGrupo } = await import('../../lib/firebase/grupos.js')
      await borrarGrupo(g.id)
      // Queda rastro: borrar un grupo cambia qué ve un puñado de alumnos y
      // conviene poder reconstruir quién lo hizo y cuándo.
      try {
        const { registrarHistorial } = await import('../../lib/firebase/contenido.js')
        await registrarHistorial({
          academiaId, accion: 'borrar-grupo', coleccion: 'grupos', docId: g.id,
          antes: { nombre: g.nombre, estado: g.estado }, despues: null, origen: 'panel',
        })
      } catch { /* la auditoría no debe tumbar la operación principal */ }
      setBorrando(null)
    })

  const copiar = (id) => {
    try { navigator.clipboard.writeText(id) } catch { /* sin permisos */ }
  }

  return (
    <section className="panel-grupos">
      <h2><Icon name="capas" size={20} /> Grupos de la academia</h2>
      <p className="panel-gestion-sub">
        Crea un grupo y comparte su código: profesores y alumnos se unen con él desde
        <strong> Mi cuenta → Únete con tu código</strong>, y sus avances quedan separados por grupo.
      </p>

      {/* Código de la ACADEMIA: unir sin grupo específico. */}
      <div className="pc-academia-codigo">
        <span className="pca-label">Código de tu academia</span>
        <code className="pc-codigo">{academiaId}</code>
        <span className="pc-acciones">
          <button className="pc-copiar" onClick={() => copiar(academiaId)}>Copiar</button>
          <CompartirCodigo codigo={academiaId} nombre={academiaNombre || academiaId} />
        </span>
      </div>

      <form className="pc-form" onSubmit={crear}>
        <label className="pc-nota">
          Nombre del grupo
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="p. ej. Generación 2026-A"
            maxLength={50}
            required
          />
        </label>
        <button className="btn btn--primario" type="submit" disabled={ocupado}>
          {ocupado ? 'Creando…' : '+ Crear grupo'}
        </button>
      </form>

      {nuevo && (
        <p className="pc-nuevo" role="status">
          Grupo creado, código: <code>{nuevo}</code>
          <button className="pc-copiar" onClick={() => copiar(nuevo)}>Copiar</button>
        </p>
      )}
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {grupos.length === 0 ? (
        <p className="panel-vacio">Aún no hay grupos en esta academia.</p>
      ) : (
        <ul className="pc-lista">
          {grupos.map((g) => {
            const c = cuentaDe(g.id)
            const activo = g.estado === 'activo'
            return (
              <li key={g.id} className={`pc-item ${activo ? 'activo' : 'inactivo'}`}>
                {editandoId === g.id ? (
                  <span className="admin-editar-nombre">
                    <input
                      type="text"
                      value={nombreEdit}
                      onChange={(e) => setNombreEdit(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); renombrar(g.id) } }}
                      autoFocus
                    />
                    <button className="pc-copiar" onClick={() => renombrar(g.id)}>Guardar</button>
                    <button className="pc-copiar" onClick={() => setEditandoId(null)}>×</button>
                  </span>
                ) : (
                  <strong className="pg-nombre">{g.nombre}</strong>
                )}
                <code className="pc-codigo">{g.id}</code>
                <span className="pc-detalle">
                  {c.alumnos} alumno{c.alumnos !== 1 ? 's' : ''} · {c.profes} profe{c.profes !== 1 ? 's' : ''}
                </span>
                <span className={`pc-estado ${activo ? 'activo' : 'inactivo'}`}>{activo ? 'activo' : 'inactivo'}</span>
                <span className="pc-acciones">
                  <button className="pc-copiar" onClick={() => copiar(g.id)}>Copiar</button>
                  {activo && (
                    <CompartirCodigo codigo={g.id} nombre={academiaNombre || academiaId} contexto={g.nombre} tipo="grupo" />
                  )}
                  <button
                    className="pc-copiar"
                    onClick={() => { setEditandoId(g.id); setNombreEdit(g.nombre) }}
                  >Renombrar</button>
                  <button className="pc-toggle" onClick={() => alternar(g)}>
                    {activo ? 'Desactivar' : 'Reactivar'}
                  </button>
                  {/* SIMETRÍA (Bloque M): se podían crear grupos y no borrarlos.
                      `borrarGrupo` existía en la capa de datos desde siempre,
                      sin un solo botón que la llamara. */}
                  <button className="pc-toggle pc-borrar" onClick={() => setBorrando(g)}>
                    Borrar
                  </button>
                </span>
              </li>
            )
          })}
        </ul>
      )}

      {borrando && (
        <ConfirmacionReforzada
          titulo={`Borrar el grupo "${borrando.nombre}"`}
          frase="BORRAR GRUPO"
          etiquetaConfirmar="Borrar definitivamente"
          ocupado={ocupado}
          onCerrar={() => setBorrando(null)}
          onConfirmar={() => borrar(borrando)}
          resumen={
            <>
              <p>
                Se elimina el grupo y su código <code>{borrando.id}</code> deja de funcionar para
                siempre.
              </p>
              {cuentaDe(borrando.id).alumnos + cuentaDe(borrando.id).profes > 0 ? (
                <p className="cuenta-error">
                  <strong>
                    {cuentaDe(borrando.id).alumnos} alumno(s) y {cuentaDe(borrando.id).profes} profe(s)
                    están en este grupo.
                  </strong>{' '}
                  No se les borra ni pierden su avance: quedan en la academia <em>sin grupo</em>, y
                  volverán a ver todo el contenido que el grupo les ocultaba. Muévelos antes si no
                  es lo que quieres.
                </p>
              ) : (
                <p>El grupo está vacío, así que no afecta a nadie.</p>
              )}
              <p>Lo que sí se pierde: la configuración de qué contenido veía este grupo.</p>
            </>
          }
        />
      )}
    </section>
  )
}
