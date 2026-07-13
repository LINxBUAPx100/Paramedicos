import { useState } from 'react'
import Icon from './Icon.jsx'

// Construye el enlace de invitación: lleva a /cuenta con el código pre-llenado.
// Se arma desde la URL actual SIN el hash (robusto con base relativa './' y
// HashRouter, en dev y en GitHub Pages).
export function enlaceInvitacion(codigo) {
  const base = window.location.href.split('#')[0]
  return `${base}#/cuenta?c=${encodeURIComponent(codigo)}`
}

// Botón "Compartir" para un código (academia / grupo / prueba). Abre un panel
// con WhatsApp (lo principal), copiar enlace y copiar código. En móvil, si el
// navegador soporta la hoja de compartir nativa, la usa directamente.
export default function CompartirCodigo({ codigo, nombre, contexto = '' }) {
  const [abierto, setAbierto] = useState(false)
  const [copiado, setCopiado] = useState('')

  if (!codigo) return null

  const url = enlaceInvitacion(codigo)
  const quien = nombre ? `«${nombre}»` : 'PTEM'
  const texto =
    `¡Te invito a estudiar en ${quien}${contexto ? ` (${contexto})` : ''}! 📚\n\n` +
    `Abre este enlace y tu código ya viene listo:\n${url}\n\n` +
    `Si te lo pide, el código es: ${codigo}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`

  const copiar = async (qué, valor) => {
    try {
      await navigator.clipboard.writeText(valor)
      setCopiado(qué)
      setTimeout(() => setCopiado(''), 1600)
    } catch { /* sin permisos de portapapeles */ }
  }

  const compartir = async () => {
    // Hoja nativa (móvil): incluye WhatsApp y todo lo demás.
    if (navigator.share) {
      try {
        await navigator.share({ title: `Únete a ${quien}`, text: texto })
        return
      } catch { /* el usuario canceló: cae al panel */ }
    }
    setAbierto((v) => !v)
  }

  return (
    <span className="compartir">
      <button className="pc-compartir" onClick={compartir} title="Compartir el enlace de invitación">
        <Icon name="descarga" size={13} /> Compartir
      </button>
      {abierto && (
        <div className="compartir-pop" role="dialog" aria-label="Opciones para compartir">
          <a className="compartir-wa" href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => setAbierto(false)}>
            <Icon name="chispa" size={14} /> Enviar por WhatsApp
          </a>
          <button onClick={() => copiar('enlace', url)}>
            {copiado === 'enlace' ? '✓ Enlace copiado' : 'Copiar enlace'}
          </button>
          <button onClick={() => copiar('codigo', codigo)}>
            {copiado === 'codigo' ? '✓ Código copiado' : 'Copiar solo el código'}
          </button>
        </div>
      )}
    </span>
  )
}
