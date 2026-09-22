import Icon from '../Icon.jsx'
import { useFichaUsuario } from '../../context/FichaUsuarioContext.jsx'
import './persona.css'

// ============================================================
//  El nombre de una persona, pulsable — LA PIEZA DEL «100 %»
// ------------------------------------------------------------
//  Se pidió que en TODOS los sitios donde aparece una persona se pueda abrir
//  su ficha. Eso no se consigue acordándose de poner un `onClick` en quince
//  tablas: se consigue teniendo UNA pieza que pinta nombres de personas, y
//  usándola en todas. `tests/fichaUsuario.test.mjs` recorre los archivos y
//  comprueba que ninguno se quedó fuera.
//
//  Por eso este componente no recibe un `onClick`. Recibe a la persona, y él
//  decide si esa persona, para quien está mirando, es abrible.
//
//  ── DOS FORMAS, y la segunda existe por un motivo concreto:
//
//   · `nombre` (la normal) — el nombre se convierte en el botón.
//   · `icono` — un botón pequeño AL LADO del nombre. Se usa donde el nombre
//     YA es un botón que hace otra cosa: en el avance y en el seguimiento, el
//     nombre despliega el historial del alumno. Robarle ese gesto rompería una
//     pantalla que ya funciona, y poner dos acciones en el mismo texto es
//     imposible. Así que ahí el nombre sigue desplegando y la ficha tiene su
//     propio tirador.
//
//  ── CUANDO NO SE SABE A QUIÉN SE MIRA, SE ES OPTIMISTA.
//
//  Hay sitios —el registro de actividad, los choques de horario— donde lo
//  único que hay es un uid: ni el rol ni la academia de esa persona. Sin esos
//  dos datos no se puede decidir aquí si quien mira podrá tocarla.
//
//  La alternativa mala sería no ofrecer el enlace. Se hace lo contrario: se
//  ofrece, y la ficha —que relee a la persona al abrirse— decide con los datos
//  de verdad y explica el motivo si no puede. Equivocarse ofreciendo de más un
//  enlace que después dice «esa persona no es de tu academia» cuesta un clic;
//  equivocarse de menos esconde a alguien para siempre.
// ============================================================
export default function BotonPersona({
  persona,
  children,
  className = '',
  titulo = 'Ver y editar su ficha',
  variante = 'nombre',
  como: Como = 'span',
}) {
  const { abrir, habilitado, permisosSobre } = useFichaUsuario()
  const texto = children ?? (persona?.nombre || persona?.email || persona?.matricula || 'Sin nombre')
  const uid = persona?.uid || persona?.id

  // ¿Se sabe lo suficiente para decidir aquí? Hace falta el rol Y la academia:
  // con uno solo, `permisosDeFicha` contestaría con datos a medias.
  const seSabeQuienEs = Boolean(persona?.rol) && persona?.academiaId !== undefined
  const permisos = seSabeQuienEs ? permisosSobre(persona) : null
  const pulsable = Boolean(habilitado && uid && (permisos ? permisos.puedeVer : true))

  if (!pulsable) {
    return variante === 'icono' ? null : <Como className={className}>{texto}</Como>
  }

  // `stopPropagation` porque esto vive dentro de `<summary>` y de filas que ya
  // tienen su propio click: sin él, abrir la ficha desplegaría además el
  // acordeón que la contiene.
  const alPulsar = (e) => {
    e.stopPropagation()
    e.preventDefault()
    abrir(persona)
  }

  if (variante === 'icono') {
    return (
      <button
        type="button"
        className={`persona-icono ${className}`.trim()}
        onClick={alPulsar}
        title={titulo}
        aria-label={`Ver la ficha de ${persona?.nombre || persona?.email || 'esta persona'}`}
      >
        <Icon name="usuario" size={15} />
      </button>
    )
  }

  return (
    <button type="button" className={`persona-enlace ${className}`.trim()} onClick={alPulsar} title={titulo}>
      {texto}
    </button>
  )
}
