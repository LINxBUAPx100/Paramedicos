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
  ojo: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  ojoCerrado: (
    <>
      <path d="M4 4l16 16M10.6 6a9.8 9.8 0 0 1 1.4-.1c6 0 9.5 6.1 9.5 6.1a17.6 17.6 0 0 1-3 3.6M6.4 7.5A16.8 16.8 0 0 0 2.5 12S6 18.1 12 18.1a9.6 9.6 0 0 0 3.4-.6" />
      <path d="M9.9 10a3 3 0 0 0 4.1 4.2" />
    </>
  ),
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
  // Compartir: tres nodos conectados (símbolo estándar).
  compartir: (
    <>
      <circle cx="18" cy="5" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="19" r="2.6" />
      <path d="M8.3 10.8 15.7 6.4M8.3 13.2l7.4 4.4" />
    </>
  ),
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
  alerta: <path d="M12 3.5 21.5 20h-19L12 3.5ZM12 10v4.5M12 17.5h.01" />,
  pildora: <path d="m10.5 20.4-6.9-6.9a4.9 4.9 0 1 1 6.9-6.9l6.9 6.9a4.9 4.9 0 1 1-6.9 6.9ZM8.6 8.6l6.9 6.9" />,
  pin: <path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Zm0-8.3a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />,
  // Estrella de la Vida (asterisco de 6 puntas) — símbolo SUE/paramédico.
  estrella: <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />,
  chevronIzq: <path d="m15 5-7 7 7 7" />,
  chevronDer: <path d="m9 5 7 7-7 7" />,
  usuario: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  candado: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  // Resultados del examen (línea, coherentes con el sistema visual).
  medalla: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 13.8 6.5 21l5.5-3 5.5 3-2-7.2" />
    </>
  ),
  trofeo: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
      <path d="M12 14v3M9 21h6M10 21v-2h4v2" />
    </>
  ),
  tendencia: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  verificado: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.4 12.4 11 15l4.6-5.4" />
    </>
  ),
  herramientas: <path d="M15 6.5A3.5 3.5 0 0 0 10.5 11l-6.2 6.2a1.6 1.6 0 0 0 2.3 2.3L12.9 13.5A3.5 3.5 0 0 0 17.5 9l-2.3 2.3-1.7-.4-.4-1.7L15 6.5Z" />,
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
