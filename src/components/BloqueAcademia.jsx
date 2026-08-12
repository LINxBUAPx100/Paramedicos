import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { homeAcademiaDe } from '../lib/homeAcademiaModelo.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'
import { driveSrc } from '../lib/img.js'
import Icon from './Icon.jsx'

// ============================================================
//  Bloque de la academia en el Home (Bloque L)
// ------------------------------------------------------------
//  Sustituye a la banda fija de antes (logo + nombre + lema y poco más). La
//  academia es quien paga y su presencia en la app era un renglón; ahora el
//  director elige variante, mensaje, avisos y accesos rápidos.
//
//  Lo pinta `configuracion` ya NORMALIZADA (homeAcademiaModelo), así que aquí
//  no hay defensas contra datos raros: eso ya está resuelto y probado antes de
//  llegar. Lo único que sigue filtrándose aquí es la url de los avisos, porque
//  la escribe una persona y acaba en un href.
//
//  `academia` se puede pasar por props para la VISTA PREVIA del editor; si no,
//  se toma la del usuario.
// ============================================================
export default function BloqueAcademia({ academia: academiaProp = null, previa = false }) {
  const { perfil, academia: academiaUsuario, grupo } = useAuth()
  const academia = academiaProp || academiaUsuario
  if (!academia) return null
  // En la app real solo se pinta a quien pertenece a la academia; en la vista
  // previa del editor se pinta siempre.
  if (!previa && !perfil?.academiaId) return null

  const cfg = homeAcademiaDe(academia)
  const nombreUsuario = previa ? '' : (perfil?.nombre || '').split(' ')[0]
  const estilo = { '--aca-color': cfg.colorAcento || 'var(--primario)' }

  const logo = cfg.logo
    ? <img src={driveSrc(cfg.logo, 200)} alt={`Logo de ${cfg.titulo}`} loading="lazy" />
    : <b>{(cfg.titulo || '?').charAt(0).toUpperCase()}</b>

  const chipGrupo = cfg.mostrarGrupo && grupo?.nombre && !previa
    ? <span className="aca-grupo">Grupo {grupo.nombre}</span>
    : null

  return (
    <div className={previa ? '' : 'ph-wrap'}>
      <section
        className={`aca-bloque aca-bloque--${cfg.variante}`}
        style={estilo}
        aria-label={`Tu academia: ${cfg.titulo}`}
      >
        {cfg.variante === 'hero' && cfg.imagenFondo && (
          <img
            className="aca-fondo"
            src={driveSrc(cfg.imagenFondo, 1600)}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        )}

        <div className="aca-cabecera">
          <span className="aca-logo">{logo}</span>
          <div className="aca-texto">
            <small>{nombreUsuario ? `Bienvenido, ${nombreUsuario} · ` : ''}Tu academia</small>
            <strong>{cfg.titulo}</strong>
            {cfg.mensaje && <em>{cfg.mensaje}</em>}
          </div>
          {chipGrupo}
        </div>

        {cfg.avisos.length > 0 && (
          <ul className="aca-avisos">
            {cfg.avisos.map((a, i) => {
              // La url la escribe una persona: nunca va directa a un href.
              const href = hrefSeguro(a.url)
              const dentro = (
                <>
                  {a.titulo && <strong>{a.titulo}</strong>}
                  {a.texto && <span>{a.texto}</span>}
                </>
              )
              return (
                <li key={i} className="aca-aviso">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {dentro} <Icon name="flecha" size={13} />
                    </a>
                  ) : (
                    <div>{dentro}</div>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        {cfg.variante === 'tarjetas' && cfg.accesos.length > 0 && (
          <nav className="aca-accesos" aria-label="Accesos de tu academia">
            {cfg.accesos.map((a) => (
              // `ruta` viene de un catálogo cerrado (homeAcademiaModelo), así
              // que no puede ser una url arbitraria.
              <Link key={a.ruta} to={a.ruta} className="aca-acceso">
                <Icon name={a.icono} size={18} />
                {a.etiqueta}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </div>
  )
}
