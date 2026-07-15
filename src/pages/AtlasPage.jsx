import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Imagen from '../components/Imagen.jsx'
import Reveal from '../components/Reveal.jsx'
import { ATLAS_TEMAS } from '../data/imagenes.js'
import { useContenido, CargandoContenido, ErrorContenido } from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'

// Galería de imágenes reales (anatomía / fisiología). Cada tarjeta carga su
// imagen desde Google Drive (pega el enlace en src/data/imagenes.js → ATLAS_TEMAS).
// Lo que el grupo del alumno aún no puede explorar sale en GRIS y censurado,
// como los logros bloqueados de un videojuego.
export default function AtlasPage() {
  const { contenido, error, reintentar } = useContenido()
  const { temaVisible } = useVisibilidad()

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!contenido) return <CargandoContenido />
  const { temaPorClaveImagen } = contenido

  return (
    <div className="atlas-page">
      <header className="atlas-header">
        <h1 className="ph-h2"><Icon name="estrella" size={28} /> Atlas anatómico y fisiológico</h1>
        <p>
          Mapas visuales de los sistemas del cuerpo humano. Úsalos como referencia rápida mientras
          estudias: célula, corazón, circulación, vía aérea, nefrona, sistema nervioso y más.
        </p>
      </header>
      <div className="atlas-grid">
        {ATLAS_TEMAS.filter((t) => (t.src || '').trim()).map((tema, i) => {
          // El tema al que salta la tarjeta: 1º un `tema` explícito de la
          // entrada, 2º el primer bloque de contenido que use esa `clave`.
          const temaId = tema.tema || temaPorClaveImagen[tema.clave]
          const bloqueada = Boolean(temaId) && !temaVisible(temaId)

          if (bloqueada) {
            return (
              <Reveal
                key={tema.clave}
                delay={(i % 3) * 70}
                className="atlas-card atlas-card--bloqueada"
              >
                <div className="atlas-card-censura">
                  <Imagen
                    src={tema.src}
                    ratio="4 / 3"
                    busqueda={`${tema.titulo} anatomía`}
                    alt=""
                  />
                  <span className="atlas-card-candado" aria-hidden="true">
                    <Icon name="candado" size={28} />
                  </span>
                </div>
                <h3 className="atlas-card-titulo">
                  Por desbloquear
                </h3>
                <p className="atlas-card-bloqueo-txt">Tu profesor aún no libera este contenido.</p>
              </Reveal>
            )
          }

          return (
            <Reveal
              key={tema.clave}
              delay={(i % 3) * 70}
              className={`atlas-card${temaId ? ' atlas-card--link' : ''}`}
            >
              <Imagen
                src={tema.src}
                ratio="4 / 3"
                caption={tema.titulo}
                busqueda={`${tema.titulo} anatomía`}
                alt={tema.titulo}
              />
              <h3 className="atlas-card-titulo">
                {tema.titulo}
                {temaId && <Icon name="chevronDer" size={16} />}
              </h3>
              {/* enlace "estirado" que cubre la tarjeta (sin anidar <a>) */}
              {temaId && (
                <Link
                  className="atlas-card-stretch"
                  to={`/tema/${temaId}?ref=${tema.clave}`}
                  aria-label={`Ver "${tema.titulo}" en su tema`}
                />
              )}
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
