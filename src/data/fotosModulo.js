// Fotografía de portada de cada módulo del plan oficial, para las tarjetas del
// recorrido de estudio (PTEM Pulso). Reutiliza las fotos de contexto ya
// optimizadas en public/imagenes/temario (480 y 800 px, AVIF y WebP): no añade
// ningún archivo.
//
// Se busca por el PREFIJO del id del módulo (m1-…, m2-…) porque el id completo
// puede cambiar entre academias que replican el plan. Un módulo sin foto usa el
// degradado de su color, que es lo que ya tenían las tarjetas.
import { juegoResponsivo } from '../lib/imagenLocal.js'

export const FOTO_POR_MODULO = {
  m1: { nombre: 'rcp-dea-maniqui', alt: 'Práctica de RCP con desfibrilador en un maniquí' },
  m2: { nombre: 'anatomia-torso-esqueleto', alt: 'Modelo anatómico de torso y esqueleto' },
  m3: { nombre: 'bvm-oxigeno-maniqui', alt: 'Ventilación con bolsa-válvula-mascarilla y oxígeno en un maniquí' },
  m4: { nombre: 'monitor-desfibrilador-electrodos', alt: 'Monitor desfibrilador con electrodos colocados' },
  m5: { nombre: 'collarin-camilla-traslado', alt: 'Paciente con collarín cervical en camilla durante un traslado' },
  m6: { nombre: 'pediatria-ambulancia', alt: 'Atención pediátrica dentro de una ambulancia' },
  m7: { nombre: 'rescate-vehicular-extricacion', alt: 'Rescate vehicular y extricación' },
}

export function fotoDeModulo(moduloId) {
  const prefijo = String(moduloId || '').match(/^(m\d+)-/)?.[1]
  const foto = prefijo && FOTO_POR_MODULO[prefijo]
  if (!foto) return null
  return {
    alt: foto.alt,
    // La carpeta es la misma que usa Contenido para las fotos del temario:
    // `imagenes/temario` dentro de public/.
    ...juegoResponsivo(foto.nombre, { carpeta: 'imagenes/temario', anchos: [480, 800], sizes: '(max-width: 640px) 88vw, 420px' }),
  }
}
