import { NavLink } from 'react-router-dom'

// Barra inferior de cinco pestañas para teléfono (PTEM Pulso). En escritorio
// no se pinta (pulso.css la oculta desde 768 px); ahí manda el menú lateral.
// Layout decide CUÁNDO se ofrece: solo a quien ve contenido y fuera de las
// consolas, el editor y los lienzos 3D, que tienen su propia navegación.
const PESTANAS = [
  { to: '/', label: 'Inicio', end: true, d: 'M3 11 12 3l9 8v10h-6v-6H9v6H3z', relleno: true },
  { to: 'RUTA', label: 'Ruta', d: 'M4 18c4 0 4-12 8-12s4 12 8 12M4 18h.01M20 18h.01' },
  { to: '/flashcards', label: 'Repaso', d: 'M4 6h14v12H4zM8 3h11a2 2 0 0 1 2 2v11' },
  { to: '/buscar', label: 'Buscar', d: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4' },
  { to: '/progreso?vista=mio', label: 'Yo', d: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6' },
]

// `destinoRuta`: el módulo donde va el alumno (Layout lo calcula con el mismo
// criterio que «Reanudar»).
export default function BarraInferior({ destinoRuta = '/' }) {
  return (
    <nav className="pl-tabbar" aria-label="Navegación principal">
      {PESTANAS.map((p) => (
        <NavLink key={p.label} to={p.to === 'RUTA' ? destinoRuta : p.to} end={p.end || p.to === 'RUTA'} className={({ isActive }) => (isActive ? 'es-activa' : '')}>
          <svg viewBox="0 0 24 24" fill={p.relleno ? 'currentColor' : 'none'} stroke={p.relleno ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={p.d} />
          </svg>
          <span>{p.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
