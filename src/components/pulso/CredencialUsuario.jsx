import { Link } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext.jsx'
import { useIndiceContenido } from '../../context/ContenidoContext.jsx'
import { useVisibilidad } from '../../lib/useVisibilidad.js'
import { rachaActual } from '../../lib/logrosModelo.js'
import { nivelDeTema, tarjetasVencidas, esEvaluacionPorId } from '../../lib/pulsoModelo.js'
import { ETIQUETA_ROL } from '../../lib/roles.js'

// La cabecera de «Mi cuenta» como credencial (PTEM Pulso): quién eres, dónde
// estudias y cómo vas, de un vistazo. Los códigos de academia y grupo siguen la
// regla de siempre: solo director y super-admin los ven; los demás, el nombre.
export default function CredencialUsuario({ user, perfil, academia, grupo, puedeVerCodigos }) {
  const { estado } = useProgress()
  const { modulos = [] } = useIndiceContenido()
  const { moduloVisible, temaVisible } = useVisibilidad()
  const nombre = perfil?.nombre || user.displayName || user.email
  const iniciales = String(nombre || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()
  const rol = ETIQUETA_ROL?.[perfil?.rol] || perfil?.rol || 'Sin rol'
  const temas = modulos.filter((m) => moduloVisible(m.id))
    .flatMap((m) => (m.temas || []).filter((t) => temaVisible(t.id) && !esEvaluacionPorId(t.id)))
  const leidos = temas.filter((t) => estado.leidos?.[t.id]).length
  const enPractica = temas.filter((t) => nivelDeTema(t.id, estado, 0) >= 2).length
  const racha = rachaActual(estado.actividad || {})
  const vencidas = tarjetasVencidas(estado.srs || {}).length

  return (
    <section className="pl-credencial" aria-label="Tu credencial">
      <div className="pl-franja" aria-hidden="true" />
      <div className="pl-credencial-cuerpo">
        <span className="pl-credencial-avatar" aria-hidden="true">{iniciales}</span>
        <div className="pl-credencial-datos">
          <span className="pl-rotulo">{rol}</span>
          <h1>{nombre}</h1>
          <span className="pl-credencial-correo">{user.email}</span>
          <div className="pl-insignias">
            {perfil?.academiaId
              ? <span className="pl-insignia">{academia?.nombre || (puedeVerCodigos ? perfil.academiaId : 'Tu academia')}</span>
              : <span className="pl-insignia">Sin academia</span>}
            {perfil?.grupoId && <span className="pl-insignia">{grupo?.nombre || (puedeVerCodigos ? perfil.grupoId : 'Tu grupo')}</span>}
            {perfil?.matricula && <span className="pl-insignia pl-insignia--cifra">Matrícula {perfil.matricula}</span>}
          </div>
        </div>
      </div>
      {temas.length > 0 && (
        <dl className="pl-credencial-signos">
          <div><dt>Racha</dt><dd>{racha} {racha === 1 ? 'día' : 'días'}</dd></div>
          <div><dt>Temas leídos</dt><dd>{leidos}/{temas.length}</dd></div>
          <div><dt>En «Reconoce» o más</dt><dd>{enPractica}</dd></div>
          <div><dt>Tarjetas por repasar</dt><dd>{vencidas}</dd></div>
        </dl>
      )}
      {temas.length > 0 && (
        <div className="pl-credencial-pie">
          <Link to="/progreso?vista=mio">Ver mi progreso completo</Link>
          {vencidas > 0 && <Link to="/flashcards" className="btn btn--turno btn--sm">Repasar {vencidas}</Link>}
        </div>
      )}
    </section>
  )
}

// Preferencias de estudio, juntas en un solo lugar. Todas son del dispositivo.
export function PreferenciasEstudio() {
  const { estado, alternarTema, fijarPreferencia } = useProgress()
  const letra = estado.preferencias?.letra || 0
  const unaMano = Boolean(estado.preferencias?.unaMano)
  let sinConexion = false
  try { sinConexion = localStorage.getItem('ptem:sin-conexion') === '1' } catch { /* sin almacenamiento */ }
  return (
    <section className="pl-ajustes" aria-labelledby="pl-ajustes-titulo">
      <h2 id="pl-ajustes-titulo">Preferencias de estudio</h2>
      <p className="pl-nota-pie">Se guardan en este dispositivo.</p>
      <div className="pl-ajuste">
        <div><b>Tema</b><span>{estado.tema === 'oscuro' ? 'Oscuro' : 'Claro'}</span></div>
        <button type="button" className="pl-interruptor" role="switch" aria-checked={estado.tema === 'oscuro'} aria-label="Tema oscuro" onClick={alternarTema}><i /></button>
      </div>
      <div className="pl-ajuste">
        <div><b>Tamaño de letra en las lecciones</b><span>{['Normal', 'Grande', 'Más grande', 'Máximo'][letra]}</span></div>
        <div className="pl-segmentos" role="radiogroup" aria-label="Tamaño de letra">
          {['A', 'A', 'A', 'A'].map((a, k) => (
            <button type="button" key={k} role="radio" aria-checked={letra === k} aria-label={['Normal', 'Grande', 'Más grande', 'Máximo'][k]} style={{ fontSize: `${0.8 + k * 0.14}rem` }} onClick={() => fijarPreferencia('letra', k)}>{a}</button>
          ))}
        </div>
      </div>
      <div className="pl-ajuste">
        <div><b>Modo una mano</b><span>Letra grande y controles abajo, para la base o la cabina</span></div>
        <button type="button" className="pl-interruptor" role="switch" aria-checked={unaMano} aria-label="Modo una mano" onClick={() => fijarPreferencia('unaMano', !unaMano)}><i /></button>
      </div>
      <div className="pl-ajuste">
        <div>
          <b>Estudio sin conexión</b>
          <span>{sinConexion ? 'Activo en este equipo. Se borra al cerrar sesión.' : 'Se activa al descargar un módulo desde su página.'}</span>
        </div>
        <span className={`pl-insignia ${sinConexion ? 'pl-insignia--ok' : ''}`}>{sinConexion ? 'Activo' : 'Apagado'}</span>
      </div>
    </section>
  )
}
