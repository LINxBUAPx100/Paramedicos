import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Imagen from '../components/Imagen.jsx'
import Reveal from '../components/Reveal.jsx'
import { ATLAS_TEMAS } from '../data/imagenes.js'
import { galeriaDesdeAgregado } from '../lib/agregadosModelo.js'
import Glosario from '../components/Glosario.jsx'
import {
  useApiContenido, useCargaDeAgregado, CargandoContenido, ErrorContenido,
} from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'

// ============================================================
//  LOGROS  ·  lo que el alumno va descubriendo del temario
// ------------------------------------------------------------
//  Antes se llamaba «Atlas» y era solo la galería de imágenes. El nombre
//  cambió porque lo que define a esta pantalla no es el tipo de material,
//  sino cómo se consigue: nada está abierto de entrada. Lo que el grupo aún
//  no puede explorar sale en gris y censurado, y se destapa conforme el
//  profesor libera los temas.
//
//  La galería NO es una lista escrita a mano: se arma con las imágenes que
//  hay dentro de las lecciones del contenido servido (más las sueltas del
//  catálogo). Así, una imagen que un editor añade a un tema aparece aquí sola,
//  con ese tema como destino y con su misma regla de bloqueo.
//
//  Dos partes:
//    1. la GALERÍA de imágenes del temario;
//    2. el GLOSARIO, al final: todas las palabras que el temario define, en
//       orden de aparición y agrupadas por módulo, que se descubren con la
//       misma regla.
// ============================================================
export default function LogrosPage() {
  const { api, error, reintentar } = useApiContenido()
  const { temaVisible } = useVisibilidad()
  // La galería y el mapa clave→tema vienen precalculados: antes esta pantalla
  // recorría los 287 temas completos para armarlos.
  const imagenes = useCargaDeAgregado((a) => a.imagenesAsync(), [])
  const temaPorClaveImagen = useCargaDeAgregado((a) => a.atlasAsync(), [])

  const galeria = useMemo(
    () => (imagenes ? galeriaDesdeAgregado(imagenes, ATLAS_TEMAS) : []),
    [imagenes],
  )

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (!api || !imagenes || !temaPorClaveImagen) return <CargandoContenido />
  // Solo se comprueba que el tema EXISTA para decidir si la tarjeta enlaza:
  // basta la ficha del índice, sin leer la lección.
  const getTema = (id) => api.getTemaLigero(id)

  return (
    <div className="atlas-page">
      <header className="atlas-header">
        <h1 className="ph-h2"><Icon name="estrella" size={28} /> Logros</h1>
        <p>
          Lo que vas descubriendo del temario: las imágenes de los sistemas del cuerpo y, al final,
          el glosario con cada palabra que el temario define. Lo que tu profesor todavía no libera
          aparece bloqueado.
        </p>
        {/* La app usa HashRouter, así que un href="#glosario" NO baja a la
            sección: el router lee ese fragmento como una RUTA y se lleva la
            página por delante. El salto se hace a mano, igual que el «Saltar al
            contenido principal» de Layout. */}
        <button
          type="button"
          className="logros-ir-glosario"
          onClick={() => {
            document.getElementById('glosario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          <Icon name="libro" size={16} /> Ir al glosario
        </button>
      </header>
      <div className="atlas-grid">
        {galeria.map((tema, i) => {
          // El tema al que salta la tarjeta: 1º el que trae la entrada (el de
          // la lección donde está la imagen), 2º el primer bloque de contenido
          // que use esa `clave`.
          //
          // Y se comprueba que ESE TEMA EXISTA en el temario servido. Antes no:
          // las entradas apuntaban a ids del temario anterior, la tarjeta
          // pintaba su flecha como si fuera un enlace y al pulsarla no pasaba
          // nada. Si el destino no existe, la tarjeta se enseña sin flecha y sin
          // enlace: mejor una imagen que no promete nada que un enlace muerto.
          const destino = tema.tema || temaPorClaveImagen[tema.clave]
          const temaId = destino && getTema(destino) ? destino : null
          const bloqueada = Boolean(temaId) && !temaVisible(temaId)

          if (bloqueada) {
            return (
              <Reveal
                key={tema.src}
                delay={(i % 3) * 70}
                className="atlas-card atlas-card--bloqueada"
              >
                <div className="atlas-card-censura">
                  {/* Sin lupa: la censura es visual (desenfoque), así que abrir
                      el visor sería la vuelta a la esquina para ver la imagen
                      que el profesor todavía no libera. */}
                  <Imagen
                    assetId={tema.assetId}
                    src={tema.assetId ? undefined : tema.src}
                    ratio="4 / 3"
                    alt=""
                    caption={null}
                    zoom={false}
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
              key={tema.src}
              delay={(i % 3) * 70}
              className={`atlas-card${temaId ? ' atlas-card--link' : ''}`}
            >
              {/* La tarjeta pasa el `assetId`: con él la figura llega con su
                  texto alternativo escrito a mano, su descripción ampliada y su
                  panel «Créditos», que es lo que exigen las licencias CC BY del
                  material. `src` queda solo para lo que aún no esté catalogado
                  (una imagen que un editor pegue en una lección). */}
              <Imagen
                assetId={tema.assetId}
                src={tema.assetId ? undefined : tema.src}
                ratio="4 / 3"
                caption={tema.titulo}
                alt={tema.alt || tema.titulo}
              />
              <h3 className="atlas-card-titulo">
                {tema.titulo}
                {temaId && <Icon name="chevronDer" size={16} />}
              </h3>
              {/* enlace "estirado" que cubre la tarjeta (sin anidar <a>) */}
              {temaId && (
                <Link
                  className="atlas-card-stretch"
                  to={tema.ancla ? `/tema/${temaId}?ref=${tema.ancla}` : `/tema/${temaId}`}
                  aria-label={`Ver "${tema.titulo}" en su tema`}
                />
              )}
            </Reveal>
          )
        })}
      </div>

      <Glosario />
    </div>
  )
}
