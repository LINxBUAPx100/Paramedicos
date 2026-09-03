import Icon from '../Icon.jsx'
import { metaDePrograma } from '../../lib/programasModelo.js'
import {
  estadoDeClase, resumenDeHorario, turnoDe, ETIQUETA_TURNO, gruposParaElegir,
} from '../../lib/horarioGrupos.js'

// ============================================================
//  Elegir academia y elegir grupo, en tarjetas
// ------------------------------------------------------------
//  POR QUÉ TARJETAS Y NO DOS SELECTS. Los dos desplegables que había caben en
//  una línea y por eso parecían suficientes, pero esconden justo lo que hace
//  falta para elegir: qué grupo tiene clase AHORA, de qué generación es, quién
//  lo lleva y a qué hora. Un `<option>` solo puede decir el nombre, así que la
//  decisión se tomaba de memoria — y con varias generaciones abiertas a la vez,
//  de memoria se falla.
//
//  LO QUE ORDENA LA PANTALLA, en este orden:
//
//   1. **La clase de ahora primero.** Es la única pregunta que se hace quien
//      entra un sábado a las nueve, y responderla ahorra todos los clics.
//   2. **Después, la generación.** Es como la academia nombra sus ciclos, y sin
//      separarlas la lista es un montón plano en cuanto hay dos abiertas.
//   3. **Los inactivos, al final y aparte.** Consultar un grupo que terminó es
//      parte del trabajo del director; tropezarse con él buscando el de hoy, no.
//
//  QUIÉN VE QUÉ lo decide `lib/horarioGrupos.js` y no esta pantalla: el
//  profesor solo sus grupos activos, el director y el super-admin todos con los
//  inactivos separados. Aquí solo se pinta.
// ============================================================

// --- Academias ---------------------------------------------------------------

export function TarjetasDeAcademia({ academias, onElegir, elegida = null }) {
  return (
    <ul className="ee-rejilla" role="list">
      {academias.map((a) => {
        const activa = (a.estado || 'activo') === 'activo'
        return (
          <li key={a.id}>
            <button
              type="button"
              className={`ee-tarjeta ${elegida === a.id ? 'es-elegida' : ''} ${activa ? '' : 'es-inactiva'}`}
              onClick={() => onElegir(a.id)}
            >
              <span className="ee-tarjeta-tit">{a.nombre || a.id}</span>
              <span className="ee-tarjeta-cod">{a.id}</span>
              {!activa && <span className="ee-chip ee-chip--apagado">Suspendida</span>}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

// --- Grupos ------------------------------------------------------------------

function TarjetaDeGrupo({ grupo, onElegir, elegido, verCodigo, ahora, nombreDeProfesor }) {
  const clase = estadoDeClase(grupo, ahora)
  const turno = turnoDe(grupo.horario)
  const meta = grupo.tipoPrograma ? metaDePrograma({ tipoPrograma: grupo.tipoPrograma }) : null
  const titular = nombreDeProfesor?.(grupo.profesorTitular)

  return (
    <li>
      <button
        type="button"
        className={`ee-tarjeta ee-grupo estado-${clase.estado} ${elegido === grupo.id ? 'es-elegida' : ''}`}
        onClick={() => onElegir(grupo.id)}
      >
        {/* El distintivo de «en clase» es lo primero que se lee, y por eso va
            arriba y con color propio: es la respuesta a la pregunta con la que
            se entra a esta pantalla. */}
        {clase.estado === 'en-clase' && (
          <span className="ee-ahora"><Icon name="reloj" size={13} /> En clase ahora</span>
        )}

        <span className="ee-tarjeta-tit">{grupo.nombre || grupo.id}</span>

        <span className="ee-tarjeta-linea">
          <Icon name="reloj" size={13} />
          {resumenDeHorario(grupo)}
          {turno && <span className="ee-chip">{ETIQUETA_TURNO[turno]}</span>}
        </span>

        <span className="ee-tarjeta-linea">
          <Icon name="usuario" size={13} />
          {titular || 'Sin maestro asignado'}
        </span>

        <span className="ee-tarjeta-pie">
          {meta && <span className="ee-chip">{meta.etiquetaCorta}</span>}
          {!grupo.programaId && <span className="ee-chip ee-chip--aviso">Sin plan de estudios</span>}
          {verCodigo && <span className="ee-tarjeta-cod">{grupo.id}</span>}
        </span>

        {/* Cuando no está en clase, se dice CUÁNDO. «Hoy a las 16:00» evita
            abrir el grupo para descubrir que la clase es por la tarde.

            Solo para los estados que AÑADEN algo. En «otro día» e «inactivo»
            la etiqueta es el propio horario, que ya está pintado arriba: se
            veía repetido dos veces en la misma tarjeta. */}
        {['hoy-antes', 'hoy-despues', 'no-empieza-aun'].includes(clase.estado) && (
          <span className="ee-tarjeta-nota">{clase.etiqueta}</span>
        )}
        {clase.estado === 'inactivo' && (
          <span className="ee-chip ee-chip--apagado">Grupo desactivado</span>
        )}
      </button>
    </li>
  )
}

function BloqueDeGeneracion({ bloque, ...resto }) {
  return (
    <section className="ee-generacion">
      <h3 className="ee-generacion-tit">{bloque.etiqueta}</h3>
      <ul className="ee-rejilla" role="list">
        {bloque.grupos.map((g) => (
          <TarjetaDeGrupo key={g.id} grupo={g} {...resto} />
        ))}
      </ul>
    </section>
  )
}

export function TarjetasDeGrupo({
  grupos, rol, uid, esSuperadmin = false, onElegir, elegido = null,
  verCodigo = false, nombreDeProfesor = null, ahora = new Date(),
}) {
  const { activos, inactivos, verInactivos, total } = gruposParaElegir({
    grupos, rol, uid, esSuperadmin, fecha: ahora,
  })
  const props = { onElegir, elegido, verCodigo, ahora, nombreDeProfesor }

  if (total === 0) {
    return (
      <p className="panel-vacio">
        {esSuperadmin || rol === 'admin_escuela'
          ? 'Esta academia todavía no tiene grupos.'
          : 'No tienes ningún grupo activo asignado. Pídeselo a la dirección de tu academia.'}
      </p>
    )
  }

  return (
    <div className="ee-grupos">
      {activos.map((b) => <BloqueDeGeneracion key={b.clave} bloque={b} {...props} />)}

      {/* Los inactivos existen, pero después de todo lo demás y dichos como lo
          que son. Solo los ve quien dirige. */}
      {verInactivos && inactivos.length > 0 && (
        <details className="ee-inactivos">
          <summary>
            Grupos inactivos ({inactivos.reduce((n, b) => n + b.grupos.length, 0)})
          </summary>
          {inactivos.map((b) => <BloqueDeGeneracion key={b.clave} bloque={b} {...props} />)}
        </details>
      )}
    </div>
  )
}

// --- Encabezado de paso ------------------------------------------------------

/** La miga de pan del recorrido: academia → grupo → temario. */
export function PasosDeEspacio({ academia, grupo, onVolverAcademia, onVolverGrupo }) {
  return (
    <nav className="ee-pasos" aria-label="Dónde estás">
      {academia && (
        <button type="button" className="ee-paso" onClick={onVolverAcademia} disabled={!onVolverAcademia}>
          <Icon name="capas" size={14} /> {academia}
        </button>
      )}
      {grupo && (
        <>
          <span className="ee-paso-sep" aria-hidden="true">›</span>
          <button type="button" className="ee-paso" onClick={onVolverGrupo} disabled={!onVolverGrupo}>
            <Icon name="usuario" size={14} /> {grupo}
          </button>
        </>
      )}
    </nav>
  )
}
