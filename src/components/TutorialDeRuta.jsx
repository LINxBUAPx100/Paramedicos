import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTutoriales } from '../context/TutorialContext.jsx'
import { tutorialDe } from '../lib/tutorialesModelo.js'

// El tutorial solo se descarga cuando de verdad va a salir, que para la
// inmensa mayoría de las cargas es nunca: cada pantalla lo enseña una vez en
// toda la vida de la cuenta.
const Tutorial = lazy(() => import('./Tutorial.jsx'))

// ============================================================
//  El disparador — un solo punto de montaje para toda la app
// ------------------------------------------------------------
//  Vive en el Layout y mira la ruta. Así ninguna de las veinte pantallas tiene
//  que saber que existen los tutoriales: se añade una entrada al catálogo
//  (`lib/tutorialesModelo.js`) y esa pantalla ya lo tiene.
//
//  ESPERA MEDIO SEGUNDO ANTES DE APARECER, a propósito. Lanzarlo en el mismo
//  fotograma que la pantalla mide el foco sobre elementos que todavía se están
//  colocando, y el agujero del velo sale desplazado. Ese respiro también deja
//  ver la pantalla un instante antes de taparla, que es lo que hace que el
//  tutorial se lea como una ayuda y no como un obstáculo.
// ============================================================
const ESPERA_MS = 550

export default function TutorialDeRuta() {
  const { pathname } = useLocation()
  const { puedeAcceder } = useAuth()
  const { pendienteDe, marcar } = useTutoriales()
  const [activo, setActivo] = useState(null)

  // Sin acceso, la pantalla que se está viendo es el muro de «No has iniciado
  // sesión», no la pantalla real. Explicar ahí una herramienta del cuerpo
  // docente sería contarle a un desconocido qué hay dentro.
  const clave = pendienteDe(pathname, { puedeAcceder })

  useEffect(() => {
    if (!clave) { setActivo(null); return undefined }
    const t = setTimeout(() => setActivo(clave), ESPERA_MS)
    return () => clearTimeout(t)
  }, [clave])

  if (!activo) return null
  const tutorial = tutorialDe(activo)
  if (!tutorial) return null

  return (
    <Suspense fallback={null}>
      <Tutorial
        tutorial={tutorial}
        onCerrar={() => {
          // Se marca SIEMPRE al cerrar, se haya terminado o no. Ver la
          // cabecera de Tutorial.jsx.
          marcar(activo)
          setActivo(null)
        }}
      />
    </Suspense>
  )
}
