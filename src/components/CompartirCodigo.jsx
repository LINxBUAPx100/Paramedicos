import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

// Construye el enlace de invitación: lleva a /cuenta con el código pre-llenado.
// Se arma desde la URL actual SIN el hash (robusto con base relativa './' y
// HashRouter, en dev y en GitHub Pages).
export function enlaceInvitacion(codigo) {
  const base = window.location.href.split('#')[0]
  return `${base}#/cuenta?c=${encodeURIComponent(codigo)}`
}

// Deduce el tipo de invitación cuando no se pasa explícitamente, para no romper
// llamadas antiguas: contexto "acceso de prueba" → prueba; con contexto → grupo.
function deducirTipo({ tipo, contexto }) {
  if (tipo) return tipo
  const c = (contexto || '').trim().toLowerCase()
  if (!c) return 'academia'
  if (c.includes('prueba')) return 'prueba'
  return 'grupo'
}

// Arma el título y el texto de la invitación según el tipo. El texto es la
// versión compacta (ideal para WhatsApp): academia como institución principal,
// grupo como dato secundario, enlace, código y una nota de ayuda.
function construirInvitacion({ tipo, nombreAcademia, nombreGrupo, codigo, url }) {
  if (tipo === 'prueba') {
    const titulo = `Acceso de prueba a ${nombreAcademia}`
    const lineas = [
      `🧪 Acceso de prueba a ${nombreAcademia}`,
      '',
      'Usa este enlace para conocer la plataforma:',
      url,
      '',
      `Código de acceso: ${codigo}`,
      '',
      'Este acceso puede tener una duración o disponibilidad limitada.',
    ]
    return { titulo, texto: lineas.join('\n') }
  }

  if (tipo === 'grupo') {
    const titulo = `${nombreAcademia} te ha enviado una invitación`
    const lineas = [
      `🎓 ${nombreAcademia} te ha enviado una invitación`,
      nombreGrupo ? `\nGrupo: ${nombreGrupo}` : null,
      '',
      'Ingresa aquí:',
      url,
      '',
      `Código de acceso: ${codigo}`,
      '',
      'El código ya viene incluido en el enlace.',
    ]
    return { titulo, texto: lineas.filter((l) => l !== null).join('\n') }
  }

  // Academia
  const titulo = `Invitación de ${nombreAcademia}`
  const lineas = [
    `🎓 Invitación de ${nombreAcademia}`,
    '',
    'Has sido invitado a ingresar a su plataforma educativa.',
    '',
    'Accede aquí:',
    url,
    '',
    `Código de acceso: ${codigo}`,
    '',
    'El código ya viene incluido en el enlace.',
  ]
  return { titulo, texto: lineas.join('\n') }
}

// Botón "Compartir" para un código (academia / grupo / prueba). En móvil usa la
// hoja de compartir nativa (`navigator.share`); si no está disponible, o en
// escritorio, abre una tarjeta con vista previa + WhatsApp + copiar.
export default function CompartirCodigo({ codigo, nombre, contexto = '', tipo = '' }) {
  const [abierto, setAbierto] = useState(false)
  const [copiado, setCopiado] = useState('') // 'invitacion' | 'enlace' | 'codigo'
  const popRef = useRef(null)
  const cerrarRef = useRef(null)

  const tipoFinal = deducirTipo({ tipo, contexto })
  const nombreAcademia = nombre || 'PTEM'
  const nombreGrupo = tipoFinal === 'grupo' ? (contexto || '').trim() : ''

  // Cerrar con Escape, con clic fuera, y enfocar el botón de cerrar al abrir.
  useEffect(() => {
    if (!abierto) return
    cerrarRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') setAbierto(false) }
    const onClick = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('keydown', onKey)
    // En el siguiente tick para no capturar el mismo clic que abre el panel.
    const t = setTimeout(() => document.addEventListener('mousedown', onClick), 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      clearTimeout(t)
    }
  }, [abierto])

  if (!codigo) return null

  const url = enlaceInvitacion(codigo)
  const { titulo, texto } = construirInvitacion({
    tipo: tipoFinal, nombreAcademia, nombreGrupo, codigo, url,
  })
  const waUrl = `https://wa.me/?text=${encodeURIComponent(texto)}`

  const copiar = async (tipoContenido, valor) => {
    try {
      await navigator.clipboard.writeText(valor)
      setCopiado(tipoContenido)
      setTimeout(() => setCopiado(''), 1800)
    } catch { /* sin permisos de portapapeles */ }
  }

  const compartir = async () => {
    // Hoja nativa (móvil): el enlace va en `url` aparte para que las apps lo
    // reconozcan mejor. Si el usuario cancela, NO abrimos el panel.
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url })
      } catch { /* cancelado o error: no hacemos nada */ }
      return
    }
    setAbierto((v) => !v)
  }

  const etiquetaTipo = tipoFinal === 'prueba' ? 'Prueba' : tipoFinal === 'grupo' ? 'Grupo' : 'Academia'

  return (
    <span className="compartir">
      <button
        className="pc-compartir"
        onClick={compartir}
        aria-haspopup="dialog"
        aria-expanded={abierto}
        title="Compartir el enlace de invitación"
      >
        <Icon name="compartir" size={13} /> Compartir
      </button>

      {abierto && (
        <div
          className="compartir-pop"
          role="dialog"
          aria-modal="true"
          aria-label="Compartir invitación"
          ref={popRef}
        >
          <div className="compartir-encabezado">
            <div>
              <strong>Compartir invitación</strong>
              <span>Envía el acceso al alumno o copia los datos.</span>
            </div>
            <button
              type="button"
              className="compartir-cerrar"
              aria-label="Cerrar"
              onClick={() => setAbierto(false)}
              ref={cerrarRef}
            >
              ×
            </button>
          </div>

          <div className="compartir-vista-previa">
            <span className="compartir-academia">{nombreAcademia}</span>
            {tipoFinal !== 'academia' && (
              <div className="compartir-dato">
                <small>{tipoFinal === 'prueba' ? 'Tipo de acceso' : 'Grupo'}</small>
                <strong>{tipoFinal === 'prueba' ? 'Acceso de prueba' : nombreGrupo}</strong>
              </div>
            )}
            <div className="compartir-codigo">
              <small>Código de acceso</small>
              <strong>{codigo}</strong>
            </div>
          </div>

          <div className="compartir-acciones">
            <a
              className="compartir-wa"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chispa" size={15} /> Enviar por WhatsApp
            </a>

            <button className="compartir-completa" onClick={() => copiar('invitacion', texto)}>
              {copiado === 'invitacion' ? '✓ Invitación copiada' : 'Copiar invitación completa'}
            </button>

            <div className="compartir-acciones-secundarias">
              <button onClick={() => copiar('enlace', url)}>
                {copiado === 'enlace' ? '✓ Enlace' : 'Copiar enlace'}
              </button>
              <button onClick={() => copiar('codigo', codigo)}>
                {copiado === 'codigo' ? '✓ Código' : 'Copiar código'}
              </button>
            </div>
          </div>

          <p className="compartir-sr" aria-live="polite">
            {copiado && `${copiado === 'invitacion' ? 'Invitación' : copiado === 'enlace' ? 'Enlace' : 'Código'} copiado al portapapeles.`}
          </p>
          <span className="sr-only">Invitación de tipo {etiquetaTipo}.</span>
        </div>
      )}
    </span>
  )
}
