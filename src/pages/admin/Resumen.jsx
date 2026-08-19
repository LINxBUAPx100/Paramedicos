import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../components/admin/AdminShell.jsx'
import { planEfectivo, ETIQUETA_PLAN } from '../../lib/capacidades.js'
import { ETIQUETA_ROL } from '../../lib/roles.js'
import Icon from '../../components/Icon.jsx'
import ElegirAcademia from '../../components/admin/ElegirAcademia.jsx'

// ============================================================
//  Consola del super-admin · RESUMEN (Bloque N)
// ------------------------------------------------------------
//  No existía nada parecido: para saber si algo iba mal había que recorrer a
//  ojo una tabla con todas las academias y otra con todos los usuarios de la
//  plataforma. Aquí arriba va lo que EXIGE ACCIÓN, y debajo el retrato general.
//
//  Se calcula todo a partir de los datos que el armazón ya cargó: esta página
//  no lee nada de Firestore por su cuenta.
// ============================================================

const DIA = 24 * 60 * 60 * 1000

export default function AdminResumen() {
  const { academias, usuarios, intentos, porAcademia } = useAdmin()

  const m = useMemo(() => {
    const ahora = Date.now()
    const dias = (a) => {
      const s = a.fechaRenovacion?.seconds
      return s ? Math.ceil((s * 1000 - ahora) / DIA) : null
    }

    const vencidas = academias.filter((a) => { const d = dias(a); return d !== null && d < 0 })
    const porVencer = academias.filter((a) => { const d = dias(a); return d !== null && d >= 0 && d <= 7 })
    const sinFecha = academias.filter((a) => dias(a) === null)
    const suspendidas = academias.filter((a) => a.estado !== 'activo')
    // Academia activa sin un solo intento de examen: o acaba de nacer, o nadie
    // la está usando. En ambos casos conviene saberlo.
    const sinActividad = academias.filter(
      (a) => a.estado === 'activo' && !(porAcademia[a.id]?.intentos > 0)
    )
    const huerfanos = usuarios.filter((u) => !u.academiaId && u.rol !== 'superadmin' && u.estado !== 'eliminado')

    const porRol = {}
    for (const u of usuarios) {
      if (u.estado === 'eliminado') continue
      porRol[u.rol || 'alumno'] = (porRol[u.rol || 'alumno'] || 0) + 1
    }
    const porPlan = {}
    for (const a of academias) {
      const p = planEfectivo(a) || 'base'
      porPlan[p] = (porPlan[p] || 0) + 1
    }

    return { vencidas, porVencer, sinFecha, suspendidas, sinActividad, huerfanos, porRol, porPlan }
  }, [academias, usuarios, porAcademia])

  const alertas = [
    m.vencidas.length && {
      tono: 'mal', icono: 'alerta',
      titulo: `${m.vencidas.length} academia(s) con la renovación vencida`,
      detalle: m.vencidas.map((a) => a.nombre || a.id).join(', '),
      a: '/admin/facturacion', cta: 'Ir a facturación',
    },
    m.porVencer.length && {
      tono: 'aviso', icono: 'reloj',
      titulo: `${m.porVencer.length} academia(s) vencen esta semana`,
      detalle: m.porVencer.map((a) => a.nombre || a.id).join(', '),
      a: '/admin/facturacion', cta: 'Ir a facturación',
    },
    m.suspendidas.length && {
      tono: 'aviso', icono: 'candado',
      titulo: `${m.suspendidas.length} academia(s) suspendida(s)`,
      detalle: 'Sus miembros no pueden entrar al contenido.',
      a: '/admin/academias', cta: 'Ver academias',
    },
    m.sinActividad.length && {
      tono: 'info', icono: 'tendencia',
      titulo: `${m.sinActividad.length} academia(s) activa(s) sin un solo examen`,
      detalle: m.sinActividad.map((a) => a.nombre || a.id).join(', '),
      a: '/admin/academias', cta: 'Ver academias',
    },
    m.huerfanos.length && {
      tono: 'info', icono: 'usuario',
      titulo: `${m.huerfanos.length} usuario(s) sin academia`,
      detalle: 'Tienen cuenta pero no pueden abrir el temario.',
      a: '/admin/usuarios', cta: 'Ver usuarios',
    },
  ].filter(Boolean)

  return (
    <div className="cs-resumen">
      <header className="cs-cabecera">
        <h1>Resumen de la plataforma</h1>
        <p>
          Elige dónde trabajar, atiende lo que pide atención y, bajando, mira el retrato general.
        </p>
      </header>

      {/* Lo PRIMERO es elegir contexto. Antes había que adivinar que para
          administrar una academia se entraba por una tabla de otra sección. */}
      <ElegirAcademia academias={academias} usuarios={usuarios} intentos={intentos} />

      <section aria-label="Avisos">
        {alertas.length === 0 ? (
          <p className="cs-todo-ok">
            <Icon name="check" size={18} /> Nada pide atención: sin vencimientos, sin academias
            suspendidas y sin usuarios sueltos.
          </p>
        ) : (
          <ul className="cs-alertas">
            {alertas.map((al) => (
              <li key={al.titulo} className={`cs-alerta cs-alerta--${al.tono}`}>
                <span className="cs-alerta-ico"><Icon name={al.icono} size={18} /></span>
                <div>
                  <strong>{al.titulo}</strong>
                  {al.detalle && <p>{al.detalle}</p>}
                </div>
                <Link to={al.a} className="btn btn--sm btn--suave">{al.cta}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="cs-kpis" aria-label="Cifras generales">
        <Kpi n={academias.length} etiqueta="academias" pie={`${academias.length - m.suspendidas.length} activas`} />
        <Kpi n={usuarios.length} etiqueta="usuarios" pie={`${m.porRol.alumno || 0} alumnos`} />
        <Kpi n={intentos.length} etiqueta="intentos de examen" pie="en toda la plataforma" />
        <Kpi n={m.sinFecha.length} etiqueta="sin fecha de renovación" pie="no se les puede avisar" />
      </section>

      <div className="cs-dos">
        <section className="cs-tabla-mini">
          <h2>Usuarios por rol</h2>
          <ul>
            {Object.entries(m.porRol).sort((a, b) => b[1] - a[1]).map(([rol, n]) => (
              <li key={rol}><span>{ETIQUETA_ROL[rol] || rol}</span><b>{n}</b></li>
            ))}
          </ul>
        </section>
        <section className="cs-tabla-mini">
          <h2>Academias por plan</h2>
          <ul>
            {Object.entries(m.porPlan).sort((a, b) => b[1] - a[1]).map(([plan, n]) => (
              <li key={plan}><span>{ETIQUETA_PLAN[plan] || plan}</span><b>{n}</b></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

function Kpi({ n, etiqueta, pie }) {
  return (
    <div className="cs-kpi">
      <b>{n}</b>
      <span>{etiqueta}</span>
      {pie && <small>{pie}</small>}
    </div>
  )
}
