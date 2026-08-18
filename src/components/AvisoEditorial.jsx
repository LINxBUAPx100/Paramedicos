import Icon from './Icon.jsx'
import { avisoEditorial, muestraContenido, ETIQUETA_ESTADO } from '../lib/estadoEditorial.js'

// ============================================================
//  Aviso del estado EDITORIAL del tema
// ------------------------------------------------------------
//  Tres situaciones distintas que antes se veían iguales:
//
//   · en revisión → hay texto y se lee, pero nadie lo ha validado todavía.
//   · sin contenido → el tema existe en el plan y aún no se ha redactado.
//   · bloqueado → el plan no define su alcance y la academia debe decidir.
//
//  El aviso va ARRIBA del contenido y no es descartable. Un alumno que
//  memoriza una dosis tiene derecho a saber si alguien respondió por ella.
// ============================================================

const ICONO = { revision: 'alerta', vacio: 'libro', bloqueado: 'candado' }

export default function AvisoEditorial({ estado, revision = null }) {
  const aviso = avisoEditorial(estado, revision)
  if (!aviso) return null

  const observaciones = revision?.observaciones || []

  return (
    <aside
      className={`aviso-editorial aviso-editorial--${aviso.variante}`}
      role={aviso.variante === 'revision' ? 'note' : 'status'}
      aria-label={`Estado del contenido: ${ETIQUETA_ESTADO[estado] || estado}`}
    >
      <span className="aviso-editorial-ico">
        <Icon name={ICONO[aviso.variante] || 'alerta'} size={20} />
      </span>
      <div className="aviso-editorial-cuerpo">
        <strong>{aviso.titulo}</strong>
        <p>{aviso.texto}</p>
        {revision?.versionClinica && (
          <p className="aviso-editorial-meta">
            Corte clínico: {revision.versionClinica}
            {revision.actualizado ? ` · Actualizado ${revision.actualizado}` : ''}
          </p>
        )}
        {observaciones.length > 0 && (
          <ul className="aviso-editorial-obs">
            {observaciones.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        )}
      </div>
    </aside>
  )
}

// Cuerpo alternativo cuando el tema NO enseña material (vacío o bloqueado):
// ocupa el sitio del contenido para que la página no quede muda.
export function CuerpoSinContenido({ estado, revision = null }) {
  if (muestraContenido(estado)) return null
  return (
    <section className="sin-contenido">
      <p>
        {estado === 'bloqueado_por_decision'
          ? 'Cuando la academia defina el alcance de este tema, el material aparecerá aquí.'
          : 'Mientras tanto, puedes continuar con los temas siguientes del módulo.'}
      </p>
      {revision?.pregunta && (
        <p className="sin-contenido-pregunta">
          <strong>Pregunta abierta a la academia:</strong> {revision.pregunta}
        </p>
      )}
    </section>
  )
}
