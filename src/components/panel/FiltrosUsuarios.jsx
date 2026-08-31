import { ORDENES, opcionesDeRol, opcionesDeEstado, hayFiltro } from '../../lib/listaUsuarios.js'

// ============================================================
//  Barra de filtros de una lista de personas
// ------------------------------------------------------------
//  La comparten la tabla de miembros de una academia y la de usuarios de toda
//  la plataforma, porque son la misma pregunta hecha dos veces.
//
//  LOS DESPLEGABLES SOLO OFRECEN LO QUE HAY. Si en la lista no hay ningún
//  profesor, no aparece «Profesor»: un filtro que siempre devuelve cero
//  resultados no es una opción, es una trampa. Por eso las opciones se calculan
//  desde la propia lista (`opcionesDeRol` / `opcionesDeEstado`).
//
//  El contador de resultados va aquí y no en la tabla porque es la respuesta a
//  lo que se acaba de escribir: sin él, filtrar hasta cero se ve igual que una
//  lista que no cargó.
// ============================================================
export default function FiltrosUsuarios({
  usuarios, filtro, onFiltro, orden, onOrden, grupos = null, total, mostrados,
}) {
  const roles = opcionesDeRol(usuarios)
  const estados = opcionesDeEstado(usuarios)
  const cambiar = (campo) => (e) => onFiltro({ ...filtro, [campo]: e.target.value })

  return (
    <div className="fu">
      <div className="fu-fila">
        <input
          type="search"
          className="admin-buscar fu-buscar"
          placeholder="Buscar por nombre, correo, rol o grupo…"
          value={filtro.texto}
          onChange={cambiar('texto')}
          aria-label="Buscar personas"
        />

        {roles.length > 1 && (
          <label className="fu-campo">
            <span>Rol</span>
            <select className="panel-rol-select" value={filtro.rol} onChange={cambiar('rol')}>
              <option value="">Todos</option>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.etiqueta}</option>)}
            </select>
          </label>
        )}

        {estados.length > 1 && (
          <label className="fu-campo">
            <span>Estado</span>
            <select className="panel-rol-select" value={filtro.estado} onChange={cambiar('estado')}>
              <option value="">Todos</option>
              {estados.map((e) => <option key={e.id} value={e.id}>{e.etiqueta}</option>)}
            </select>
          </label>
        )}

        {grupos && grupos.length > 0 && (
          <label className="fu-campo">
            <span>Grupo</span>
            <select className="panel-rol-select" value={filtro.grupoId} onChange={cambiar('grupoId')}>
              <option value="">Todos</option>
              <option value="__sin__">Sin grupo</option>
              {grupos.map((g) => <option key={g.id} value={g.id}>{g.nombre}</option>)}
            </select>
          </label>
        )}

        <label className="fu-campo">
          <span>Ordenar por</span>
          <select className="panel-rol-select" value={orden} onChange={(e) => onOrden(e.target.value)}>
            {ORDENES.map((o) => <option key={o.id} value={o.id}>{o.etiqueta}</option>)}
          </select>
        </label>
      </div>

      <div className="fu-pie">
        <span className="fu-cuenta">
          {mostrados === total
            ? `${total} ${total === 1 ? 'persona' : 'personas'}`
            : `${mostrados} de ${total}`}
        </span>
        {hayFiltro(filtro) && (
          <button
            type="button"
            className="fu-limpiar"
            onClick={() => onFiltro({ texto: '', rol: '', estado: '', grupoId: '', academiaId: '' })}
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
