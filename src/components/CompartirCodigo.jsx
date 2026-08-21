import { useEffect, useRef, useState } from 'react'
import { etiquetaRol } from '../lib/invitacionesModelo.js'
import Icon from './Icon.jsx'
import TarjetaInvitacion from './TarjetaInvitacion.jsx'

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
function construirInvitacion({ tipo, nombreAcademia, nombreGrupo, codigo, url, rol }) {
  // INVITACIÓN POR ROL: lo que la distingue de las demás es que dice COMO QUÉ
  // entra la persona, así que el rol va en la primera línea y no de nota al
  // pie. Quien recibe "te invita como profesor" sabe que el enlace no es el
  // mismo que circula por el grupo de los alumnos.
  if (tipo === 'invitacion') {
    const quien = etiquetaRol(rol).toLowerCase()
    const titulo = `${nombreAcademia} te invita como ${quien}`
    const lineas = [
      `${nombreAcademia} te invita como ${quien}`,
      nombreGrupo ? `\nGrupo: ${nombreGrupo}` : null,
      '',
      'Ingresa aquí:',
      url,
      '',
      `Código de acceso: ${codigo}`,
      '',
      `Al activarlo entrarás como ${quien}. El código ya viene incluido en el enlace.`,
    ]
    return { titulo, texto: lineas.filter((l) => l !== null).join('\n') }
  }

  if (tipo === 'prueba') {
    const titulo = `Acceso de prueba a ${nombreAcademia}`
    const lineas = [
      `Acceso de prueba a ${nombreAcademia}`,
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
      `${nombreAcademia} te ha enviado una invitación`,
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
    `Invitación de ${nombreAcademia}`,
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
export default function CompartirCodigo({ codigo, nombre, contexto = '', tipo = '', rol = '' }) {
  const [abierto, setAbierto] = useState(false)
  const [copiado, setCopiado] = useState('') // 'invitacion' | 'enlace' | 'codigo'
  const popRef = useRef(null)
  const cerrarRef = useRef(null)

  const tipoFinal = deducirTipo({ tipo, contexto })
  const nombreAcademia = nombre || 'PTEM'
  // El grupo es dato secundario en las de grupo y en las de rol (que también
  // pueden llevarlo); en las de academia y prueba no aplica.
  const nombreGrupo = tipoFinal === 'grupo' || tipoFinal === 'invitacion'
    ? (contexto || '').trim()
    : ''

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
    tipo: tipoFinal, nombreAcademia, nombreGrupo, codigo, url, rol,
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
    // Siempre se abre el panel: dentro está la TARJETA, que es lo que se
    // acaba enviando. Antes el botón disparaba la hoja nativa con solo
    // texto y no había forma de llegar a la imagen desde el móvil, que es
    // justo donde se comparte.
    setAbierto((v) => !v)
  }

  // Compartir solo el TEXTO (sin imagen), para quien lo prefiera así.
  const compartirTexto = async () => {
    // El enlace YA va dentro de `texto`, así que NO se pasa también en
    // `url`: WhatsApp lo anexaría al final y saldría dos veces.
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto })
      } catch { /* cancelado: no hacemos nada */ }
      return
    }
    copiar('invitacion', texto)
  }

  const etiquetaTipo = tipoFinal === 'invitacion'
    ? `Rol: ${etiquetaRol(rol)}`
    : tipoFinal === 'prueba' ? 'Prueba' : tipoFinal === 'grupo' ? 'Grupo' : 'Academia'

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
              <span>
                {tipoFinal === 'invitacion'
                  ? `Quien la active entrará como ${etiquetaRol(rol).toLowerCase()}.`
                  : 'Envía el acceso al alumno o copia los datos.'}
              </span>
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
            {tipoFinal === 'invitacion' && (
              <div className="compartir-dato">
                <small>Entra como</small>
                <strong>{etiquetaRol(rol)}</strong>
              </div>
            )}
            {tipoFinal !== 'academia' && (tipoFinal !== 'invitacion' || nombreGrupo) && (
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

          {/* La IMAGEN. Va antes que los botones de texto porque es lo que
              de verdad se envía: en WhatsApp una tarjeta se ve en la vista
              previa y se reenvía entera; un mensaje de texto se pierde. */}
          <TarjetaInvitacion rol={rol} academia={nombreAcademia} codigo={codigo} />

          <div className="compartir-acciones">
            <a
              className="compartir-wa"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chispa" size={15} /> Enviar por WhatsApp
            </a>

            <button className="compartir-completa" onClick={compartirTexto}>
              {copiado === 'invitacion' ? 'Invitación copiada' : 'Compartir solo el texto'}
            </button>

            <div className="compartir-acciones-secundarias">
              <button onClick={() => copiar('enlace', url)}>
                {copiado === 'enlace' ? 'Enlace copiado' : 'Copiar enlace'}
              </button>
              <button onClick={() => copiar('codigo', codigo)}>
                {copiado === 'codigo' ? 'Código copiado' : 'Copiar código'}
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
