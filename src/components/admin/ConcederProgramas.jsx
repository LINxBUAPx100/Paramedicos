import { useState } from 'react'
import Icon from '../Icon.jsx'
import { TIPOS_CREABLES, tiposQuePuedeCrear, META_PROGRAMA } from '../../lib/programasModelo.js'

// ============================================================
//  Conceder a una academia qué programas puede crear — SOLO super-admin
// ------------------------------------------------------------
//  Decisión del dueño del producto el 31-08-2026:
//
//  «R.E.S.C.A.T.E. hizo un gran trabajo con su contenido, y a menos que yo lo
//   crea pertinente nadie debería poder entrar a lo que es de R.E.S.C.A.T.E.»
//
//  Por omisión una academia NO crea programas: recibe lo que se le clone. Aquí
//  se le abre, tipo por tipo, lo que se considere. La concesión es una lista y
//  no un interruptor porque abrir «cursos y certificaciones» no es lo mismo que
//  abrir carreras completas.
//
//  TUM NO APARECE, y no es un olvido: es el programa insignia de R.E.S.C.A.T.E.
//  Que otra academia se cree el suyo llamándolo igual confundiría dos cosas
//  distintas, y clonar el de R.E.S.C.A.T.E. es una operación del super-admin.
//  El servidor lo rechaza aunque alguien escriba 'tum' a mano en la base de
//  datos (ver firestore.rules → academiaCreaPrograma).
// ============================================================

export default function ConcederProgramas({ academia, onGuardado }) {
  const concedidos = tiposQuePuedeCrear(academia)
  const [seleccion, setSeleccion] = useState(concedidos)
  const [estado, setEstado] = useState({ tipo: 'inactivo', mensaje: '' })

  const cambiado = seleccion.length !== concedidos.length
    || seleccion.some((t) => !concedidos.includes(t))

  const alternar = (tipo) => {
    setSeleccion((prev) => (prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]))
    setEstado({ tipo: 'inactivo', mensaje: '' })
  }

  const guardar = async () => {
    setEstado({ tipo: 'guardando', mensaje: 'Guardando…' })
    try {
      const { concederProgramasPropios } = await import('../../lib/firebase/admin.js')
      const guardados = await concederProgramasPropios(academia.id, seleccion)
      setSeleccion(guardados)
      setEstado({
        tipo: 'ok',
        mensaje: guardados.length
          ? `Concedido: ${guardados.map((t) => META_PROGRAMA[t]?.etiquetaCorta || t).join(', ')}`
          : 'Sin programas propios: esta academia solo recibe lo que le clones.',
      })
      onGuardado?.()
    } catch (err) {
      setEstado({ tipo: 'error', mensaje: err?.message || 'No se pudo guardar.' })
    }
  }

  return (
    <section className="conceder">
      <h2><Icon name="llave" size={20} /> Programas que puede crear</h2>
      <p className="panel-gestion-sub">
        Por omisión una academia no crea programas: solo recibe los que le clones.
        Marca los tipos que quieras abrirle.
      </p>

      <ul className="conceder-lista">
        {TIPOS_CREABLES.map((tipo) => {
          const meta = META_PROGRAMA[tipo] || {}
          const marcado = seleccion.includes(tipo)
          return (
            <li key={tipo} style={{ '--curso-color': meta.color }}>
              <label className={`conceder-opcion ${marcado ? 'is-marcado' : ''}`}>
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternar(tipo)}
                  disabled={estado.tipo === 'guardando'}
                />
                <span className="conceder-ico"><Icon name={meta.icono || 'capas'} size={18} /></span>
                <span className="conceder-texto">{meta.etiqueta || tipo}</span>
              </label>
            </li>
          )
        })}
      </ul>

      <div className="conceder-pie">
        <button
          type="button"
          className="btn btn--pildora btn--carbon"
          onClick={guardar}
          disabled={!cambiado || estado.tipo === 'guardando'}
        >
          {estado.tipo === 'guardando' ? 'Guardando…' : 'Guardar concesión'}
        </button>
        {estado.mensaje && (
          <p className={estado.tipo === 'error' ? 'cuenta-error' : 'conceder-ok'} role="status">
            {estado.mensaje}
          </p>
        )}
      </div>

      <p className="panel-nota">
        El <strong>Programa Paramédico (TUM)</strong> no se concede por aquí: es el de
        R.E.S.C.A.T.E. y se entrega clonándolo desde <em>Plantillas y replicación</em>,
        cuando lo decidas.
      </p>
    </section>
  )
}
