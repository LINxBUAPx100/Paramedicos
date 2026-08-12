import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import PersonalizacionAcademia from '../../components/PersonalizacionAcademia.jsx'
import { DESCRIPCION_PLAN, ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo } from '../../lib/capacidades.js'
import Icon from '../../components/Icon.jsx'

// ============================================================
//  Panel del director · MI ACADEMIA (Bloque O)
// ------------------------------------------------------------
//  Su identidad y su presencia: qué plan tiene y cómo se ve en el inicio de sus
//  miembros (Bloque L). La ficha del DIRECTORIO se queda en «Accesos», junto a
//  las solicitudes que genera: publicarse y atender a quien pide entrar son la
//  misma decisión, y partirlas en dos pantallas obligaría a montar el mismo
//  componente dos veces.
// ============================================================

export default function PanelMiAcademia() {
  const { capacidades } = useAuth()
  const { academia, academiaId } = usePanel()
  const plan = planEfectivo(academia)

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Mi academia</h1>
        <p>Tu plan y cómo se ve tu academia en el inicio de sus miembros.</p>
      </header>

      <section className="cs-tabla-mini">
        <h2>Plan y tipo</h2>
        <ul>
          <li><span>Código</span><b>{academiaId}</b></li>
          <li><span>Tipo</span><b>{ETIQUETA_TIPO[academia?.tipo] || academia?.tipo || '—'}</b></li>
          <li><span>Plan</span><b>{ETIQUETA_PLAN[plan] || '—'}</b></li>
        </ul>
        {plan && <p className="panel-gestion-sub">{DESCRIPCION_PLAN[plan]}</p>}
      </section>

      {capacidades?.personalizacionVisual ? (
        <PersonalizacionAcademia academia={academia} />
      ) : (
        <section className="panel-gestion">
          <h2><Icon name="chispa" size={20} /> Personalización</h2>
          <p className="panel-gestion-sub">
            Tu plan actual no incluye la personalización del inicio (logo, lema, portada y accesos
            rápidos). Los planes Pro y Curso sí la traen.
          </p>
        </section>
      )}

      <p className="panel-nota">
        La ficha del directorio y las solicitudes de entrada están en{' '}
        <Link to="/panel/accesos">Accesos</Link>.
      </p>
    </div>
  )
}
