import Icon from '../Icon.jsx'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import { moneda } from '../../lib/staff/cajaModelo.js'
import { horaCorta } from '../../lib/staff/asistenciaModelo.js'
import { etiquetaGeneracion } from '../../lib/staff/reporteModelo.js'
import { CAMPOS_EN_LECTURA } from '../../lib/staff/edicionPerfil.js'
import BotonPersona from '../usuarios/BotonPersona.jsx'

// ============================================================
//  La cabecera de la ficha: quién está delante, en una mirada
// ------------------------------------------------------------
//  Tres datos mandan en un mostrador y son los tres que van en grande: quién
//  es, si ya entró hoy y si debe algo. Todo lo demás está a un clic.
//
//  LOS CAMPOS QUE RECEPCIÓN NO PUEDE CAMBIAR SE ENSEÑAN IGUAL, con la nota de
//  quién los cambia. Esconderlos no los protege: solo hace que se pregunten por
//  teléfono a la dirección.
// ============================================================
export default function FichaAlumno({ onCerrar, onEditar }) {
  const { alumno, grupo, cuenta, asistencia, cargando } = useFicha()
  if (!alumno) return null

  const enLectura = {
    matricula: alumno.matricula || 'Sin emitir',
    rol: alumno.rol === 'alumno' ? 'Alumno' : (alumno.rol || '—'),
    estado: alumno.estado || 'activo',
    academiaId: alumno.academiaId || '—',
  }

  return (
    <header className="staff-ficha">
      <div className="staff-ficha-identidad">
        <p className="ui-antetitulo">{alumno.matricula || 'Sin matrícula'}</p>
        <h2><BotonPersona persona={alumno} titulo="Ver y editar todos sus datos">{alumno.nombre || 'Sin nombre'}</BotonPersona></h2>
        <p className="staff-ficha-sub">
          {grupo?.nombre || alumno.grupoId || 'Sin grupo'}
          {etiquetaGeneracion(grupo?.generacion) ? ` · ${etiquetaGeneracion(grupo.generacion)}` : ''}
        </p>
      </div>

      <div className="staff-ficha-señales">
        <p className={`staff-señal ${asistencia.dentro ? 'staff-señal--si' : ''}`}>
          <Icon name={asistencia.dentro ? 'check' : 'reloj'} size={18} />
          <span>
            <b>{asistencia.dentro ? 'En clase' : 'Sin entrada hoy'}</b>
            {asistencia.dentro
              ? ` · entró ${horaCorta(asistencia.hoy?.inicio)}, le quedan ${asistencia.minutos} min`
              : ` · ${asistencia.total} asistencia(s) registradas`}
          </span>
        </p>
        <p className={`staff-señal ${cuenta.saldo > 0 ? 'staff-señal--deuda' : 'staff-señal--si'}`}>
          <Icon name={cuenta.saldo > 0 ? 'alerta' : 'check'} size={18} />
          <span>
            <b>{cuenta.saldo > 0 ? `Debe ${moneda(cuenta.saldo)}` : 'Sin cargos pendientes'}</b>
            {` · ${moneda(cuenta.pagado)} pagados en total`}
          </span>
        </p>
      </div>

      <dl className="staff-ficha-datos">
        <div><dt>Correo</dt><dd>{alumno.email || '—'}</dd></div>
        <div><dt>Teléfono</dt><dd>{alumno.telefono || '—'}</dd></div>
        {CAMPOS_EN_LECTURA.map((c) => (
          <div key={c.id}>
            <dt>{c.etiqueta}</dt>
            <dd>
              {enLectura[c.id]}
              <span className="staff-ayuda staff-ficha-quien">{c.quien}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="staff-ficha-acciones">
        <button type="button" className="btn btn--sm" onClick={onEditar}>
          <Icon name="editar" size={16} /> Editar ficha
        </button>
        <button type="button" className="btn btn--sm" onClick={onCerrar}>
          <Icon name="cerrar" size={16} /> Cerrar y buscar otra persona
        </button>
        {cargando && <span className="staff-ayuda" role="status">Actualizando…</span>}
      </div>
    </header>
  )
}
