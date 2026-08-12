import { useEffect, useRef, useState } from 'react'

// ============================================================
//  Diálogo de confirmación REFORZADA (por frase)
// ------------------------------------------------------------
//  Para acciones destructivas que no se pueden deshacer. Un window.confirm()
//  se acepta por reflejo; escribir una frase obliga a leer.
//
//  Vivía dentro de ReplicacionPage. Al aplicar la simetría del Bloque M —todo
//  lo que se puede crear se tiene que poder borrar— aparecen varios sitios que
//  necesitan lo mismo, así que se extrae para que TODAS las acciones
//  destructivas se sientan igual y nadie improvise la suya.
//
//  Accesible: role=dialog + aria-modal, Escape cierra, el foco entra al abrir
//  y vuelve a donde estaba al cerrar.
// ============================================================
export function Dialogo({ titulo, onCerrar, children }) {
  const ref = useRef(null)
  const focoPrevio = useRef(null)

  useEffect(() => {
    focoPrevio.current = document.activeElement
    const onKey = (e) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', onKey)
    ref.current?.querySelector('input, textarea, select, button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      // Devolver el foco a quien abrió el diálogo: sin esto, quien navega con
      // teclado queda al principio del documento.
      focoPrevio.current?.focus?.()
    }
  }, [onCerrar])

  return (
    <div className="rp-dialogo-fondo" onClick={(e) => { if (e.target === e.currentTarget) onCerrar() }}>
      <div className="rp-dialogo" role="dialog" aria-modal="true" aria-label={titulo} ref={ref}>
        <div className="rp-dialogo-cab">
          <h2>{titulo}</h2>
          <button className="rp-cerrar" onClick={onCerrar} aria-label="Cerrar diálogo">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function ConfirmacionReforzada({
  titulo, resumen, frase, onConfirmar, onCerrar, ocupado,
  etiquetaConfirmar = 'Confirmar y ejecutar',
}) {
  const [texto, setTexto] = useState('')
  const coincide = texto.trim().toUpperCase() === String(frase).toUpperCase()
  return (
    <Dialogo titulo={titulo} onCerrar={onCerrar}>
      <div className="rp-confirmacion">
        {resumen}
        <p>
          Para continuar, escribe exactamente la frase: <strong><code>{frase}</code></strong>
        </p>
        <label>
          Frase de confirmación
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
        </label>
        <div className="rp-dialogo-botones">
          <button
            className="btn btn--peligro"
            disabled={!coincide || ocupado}
            onClick={() => onConfirmar(texto.trim().toUpperCase())}
          >
            {ocupado ? 'Ejecutando…' : etiquetaConfirmar}
          </button>
          <button className="btn btn--suave" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
        </div>
      </div>
    </Dialogo>
  )
}
