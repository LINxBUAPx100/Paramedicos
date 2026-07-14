import { useEffect, useRef } from 'react'

// Diálogo de confirmación accesible del editor:
//  - role="dialog" + aria-modal, título e ícono descriptivos,
//  - el foco entra al abrirse y se devuelve al disparador al cerrarse,
//  - Escape cancela, el fondo no se opera,
//  - sin confirmaciones dobles: un botón confirma, otro cancela.
export default function DialogoConfirmar({ abierto, titulo, children, confirmar = 'Confirmar', tono = 'normal', onConfirmar, onCancelar }) {
  const refConfirmar = useRef(null)
  const refDialogo = useRef(null)
  const disparador = useRef(null)

  useEffect(() => {
    if (!abierto) return
    disparador.current = document.activeElement
    refConfirmar.current?.focus()
    const alTeclear = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCancelar?.()
      }
      if (e.key === 'Tab') {
        // Trampa de foco mínima: circula entre los controles del diálogo.
        const focos = refDialogo.current?.querySelectorAll('button, [href], input, select, textarea')
        if (!focos?.length) return
        const lista = Array.from(focos)
        const i = lista.indexOf(document.activeElement)
        if (e.shiftKey && (i <= 0)) {
          e.preventDefault()
          lista[lista.length - 1].focus()
        } else if (!e.shiftKey && i === lista.length - 1) {
          e.preventDefault()
          lista[0].focus()
        }
      }
    }
    document.addEventListener('keydown', alTeclear, true)
    return () => {
      document.removeEventListener('keydown', alTeclear, true)
      disparador.current?.focus?.()
    }
  }, [abierto, onCancelar])

  if (!abierto) return null
  return (
    <div className="dialogo-fondo" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancelar?.() }}>
      <div className="dialogo" role="dialog" aria-modal="true" aria-labelledby="dialogo-titulo" ref={refDialogo}>
        <h2 id="dialogo-titulo">{titulo}</h2>
        <div className="dialogo-cuerpo">{children}</div>
        <div className="dialogo-acciones">
          <button type="button" className="btn-pildora" onClick={onCancelar}>Cancelar</button>
          <button
            type="button"
            ref={refConfirmar}
            className={`btn-pildora btn-pildora--solido ${tono === 'peligro' ? 'btn-pildora--peligro' : ''}`}
            onClick={onConfirmar}
          >
            {confirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
