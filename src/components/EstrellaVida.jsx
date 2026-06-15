// Estrella de la Vida (símbolo SUE / paramédico): 6 barras redondeadas.
// Versión rellena, más fiel que el icono de trazo. `color` = currentColor.
export default function EstrellaVida({ size = 48, className = '', style }) {
  const barra = { x: 41, y: 4, width: 18, height: 92, rx: 9 }
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <rect {...barra} />
      <rect {...barra} transform="rotate(60 50 50)" />
      <rect {...barra} transform="rotate(120 50 50)" />
    </svg>
  )
}
