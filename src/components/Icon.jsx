// Set de iconos SVG (estilo Lucide, trazo 1.75, currentColor).
// Reemplaza a los emojis estructurales para una estética consistente y theme-aware.

const paths = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />,
  examen: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M8.5 11l2 2 4-4M8.5 17h7" />
    </>
  ),
  flashcards: (
    <>
      <rect x="3" y="7" width="13" height="12" rx="2" />
      <path d="M8 7V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1" />
    </>
  ),
  atlas: (
    <>
      <path d="m9 4-6 2.5v13L9 17l6 2 6-2.5v-13L15 6 9 4Z" />
      <path d="M9 4v13M15 6v13" />
    </>
  ),
  temario: <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />,
  progreso: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  buscar: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  libro: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 0 2 2h13" />,
  capas: <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" />,
  pregunta: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01" />
    </>
  ),
  matraz: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 14h9" />,
  diana: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  chispa: <path d="M12 3l1.8 4.9L19 9.7l-4.6 2.3L12 17l-2.4-5L5 9.7l5.2-1.8L12 3Z" />,
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
  flechaIzq: <path d="M19 12H5M11 6l-6 6 6 6" />,
  descarga: <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />,
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" />
    </>
  ),
  luna: <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z" />,
  cruz: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" />,
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  check: <path d="M5 12.5 10 17.5 19.5 7" />,
}

export default function Icon({ name, size = 22, className = '', strokeWidth = 1.75, style }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {d}
    </svg>
  )
}
