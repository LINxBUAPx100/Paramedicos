// ============================================================
//  MedicalIcon — icono médico servido por el propio sitio
// ------------------------------------------------------------
//  Sustituye a los emojis que hacían de icono de tema y de módulo. Un emoji
//  parecía gratis y costaba cuatro cosas:
//
//   · lo dibuja la FUENTE DEL SISTEMA, así que el mismo tema se veía distinto
//     en Windows, en Android y en iOS, y a veces no se veía;
//   · no responde al tema claro/oscuro ni al color del módulo;
//   · un lector de pantalla lo lee («cara con mascarilla médica») en medio del
//     título del tema, que no es lo que el alumno necesita oír;
//   · y en varios casos representaba el órgano equivocado: 🫀 en un tema de
//     hígado, 🦵 en uno de cadera.
//
//  Aquí el icono es un archivo del repositorio, con autor y licencia
//  registrados en el catálogo. Decisiones que conviene no deshacer:
//
//   · SE CARGA COMO <img>, no en línea. Doscientos SVG en línea inflarían el
//     bundle; como imagen, el navegador los cachea y los comparte con la figura
//     grande del mismo tema, que suele ser el mismo archivo.
//   · `loading="lazy"` y `width`/`height` explícitos: en una lista de veinte
//     temas, los iconos que no se ven no se descargan y la lista no salta.
//   · DECORATIVO POR OMISIÓN. Junto al título del tema el icono no aporta
//     información nueva, así que va con `aria-hidden`. Solo cuando el icono es
//     lo único que comunica algo se le pasa `etiqueta` y entonces sí recibe rol
//     de imagen y texto alternativo.
//   · SIN COLOR FORZADO. Estas ilustraciones traen sus propios colores y
//     recolorearlas daría un riñón verde. `color` solo se aplica al respaldo
//     vectorial, que sí es de trazo.
// ============================================================
import { useState } from 'react'
import Icon from './Icon.jsx'
import { activo, srcDeActivo } from '../lib/activosMedicos.js'

export default function MedicalIcon({
  id,
  size = 22,
  // Texto alternativo. Si se omite, el icono es decorativo: `aria-hidden`.
  etiqueta,
  className = '',
  // Icono de `Icon.jsx` que se pinta si el activo no existe o el archivo falla.
  // Nunca un emoji: es la razón de ser de este componente.
  respaldo = 'estrella',
  eager = false,
  style,
}) {
  const [error, setError] = useState(false)
  const a = activo(id)
  const src = srcDeActivo(id)

  if (!a || !src || error) {
    return (
      <span
        className={`micono micono--respaldo ${className}`.trim()}
        style={{ width: size, height: size, ...style }}
        {...(etiqueta ? { role: 'img', 'aria-label': etiqueta } : { 'aria-hidden': 'true' })}
      >
        <Icon name={respaldo} size={size} />
      </span>
    )
  }

  const alt = etiqueta || a.accesibilidad?.alt || a.title
  return (
    <img
      className={`micono ${className}`.trim()}
      src={src}
      width={size}
      height={size}
      style={style}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      onError={() => setError(true)}
      {...(etiqueta
        ? { alt, role: 'img' }
        // Decorativo: `alt=""` y `aria-hidden` a la vez, porque hay lectores
        // que anuncian «imagen» ante un alt vacío si no está lo segundo.
        : { alt: '', 'aria-hidden': 'true' })}
    />
  )
}
