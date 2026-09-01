import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceContenido, useCursos } from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { motivoSinPrograma } from '../lib/programasModelo.js'
import { idsVisiblesDeHome } from '../lib/homeModelo.js'
import { gruposDelPanel } from '../lib/gruposDeUsuario.js'
import { identidadDelHome } from '../lib/cursosDelUsuario.js'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Imagen from '../components/Imagen.jsx'
import Contador from '../components/Contador.jsx'
import ModulosCarrusel from '../components/ModulosCarrusel.jsx'
import BloqueAcademia from '../components/BloqueAcademia.jsx'
import CursosDisponibles from '../components/CursosDisponibles.jsx'
import IconoEstrella from '../components/marca/IconoEstrella.jsx'
import { IMG } from '../data/imagenes.js'
import marcoUrl from '../assets/marco-paramedico.svg'
import marcoFrenteUrl from '../assets/marco-paramedico - copia.svg'

const STATS = [
  { key: 'modulos', label: 'Módulos' },
  { key: 'temas', label: 'Temas' },
  { key: 'flashcards', label: 'Flashcards' },
  { key: 'preguntas', label: 'Preguntas' },
]

// Hero optimizado: MISMA imagen del paramédico, servida en WebP/AVIF responsivos
// (generadas por scripts/optimizar-imagenes.mjs → public/hero/). Idéntica a la vista;
// solo cambia el peso (~3.4 MB → ~40-150 KB según dispositivo).
const HERO_ANCHOS = [480, 800, 1200, 1600, 2000]
const heroSet = (ext) =>
  HERO_ANCHOS.map((w) => `${import.meta.env.BASE_URL}hero/paramedico-${w}.${ext} ${w}w`).join(', ')
const HERO_AVIF = heroSet('avif')
const HERO_WEBP = heroSet('webp')
const HERO_SIZES = '(max-width: 880px) 90vw, 850px'

// ============================================================
//  Home por SECCIONES configurables (roadmap F7): el director PRO/CURSO
//  decide qué secciones ven los miembros de su academia y en qué orden
//  (academias/{id}.homeSecciones; catálogo en src/lib/homeModelo.js).
//  Sin configuración (visitantes, academias legacy o BASE) el Home es
//  EXACTAMENTE el de siempre. La banda de la academia y el selector de
//  grupo del profesor no son configurables: identidad y función.
// ============================================================
export default function Home() {
  const { estado } = useProgress()
  const { academia, rol, grupo, esSuperadmin } = useAuth()
  // Índice de LA academia del usuario (bundle para visitantes/legacy).
  const { modulos, stats } = useIndiceContenido()
  const { moduloVisible } = useVisibilidad()
  const leidos = estado.leidos
  const temasLeidos = Object.values(leidos).filter(Boolean).length
  const progresoGlobal = Math.round((temasLeidos / stats.temas) * 100)
  // El carrusel solo muestra los módulos liberadas para el grupo del alumno.
  const modulosVisibles = modulos.filter((f) => moduloVisible(f.id))

  // SIN PLAN DE ESTUDIOS NO HAY TEMARIO QUE ENSEÑAR, tampoco aquí.
  //
  // `/` no pasa por RutaProtegida —es la raíz—, así que un alumno con cuenta y
  // academia pero SIN GRUPO llegaba a este Home y veía el carrusel con los
  // siete módulos: títulos, subtítulos, descripciones y su número de temas. La
  // página que sí está protegida le decía «necesitas un código de grupo»
  // mientras el Home le enseñaba el índice del curso. Encontrado auditando con
  // un usuario de prueba en ese estado.
  const bloqueo = motivoSinPrograma({ rol, esSuperadmin, grupo })
  if (bloqueo) return <SinPrograma bloqueo={bloqueo} />

  const secciones = idsVisiblesDeHome(academia)
  const SECCION = {
    hero: <SeccionHero stats={stats} primerModulo={modulosVisibles[0] || null} />,
    progreso: temasLeidos > 0 ? (
      <SeccionProgreso temasLeidos={temasLeidos} total={stats.temas} pct={progresoGlobal} />
    ) : null,
    cursos: <CursosDisponibles />,
    modulos: <SeccionModulos modulos={modulosVisibles} leidos={leidos} />,
    prueba: <SeccionPrueba />,
    atlas: <SeccionAtlas />,
    flashcards: <SeccionFlashcards flashcards={stats.flashcards} />,
    // La academia es UNA SECCIÓN MÁS: se puede ocultar y mover como las otras.
    // Antes iba clavada detrás de la portada, fuera del catálogo, y por eso se
    // leía como un aviso pegado al Home en vez de como una parte del Home.
    academia: <BloqueAcademia />,
  }

  // El selector de grupo del profesor SÍ sigue fijo: es una herramienta para
  // trabajar, no presencia de marca. Si el director pudiera ocultarlo, sus
  // profesores se quedarían sin poder cambiar de grupo.
  return (
    <div className="ph">
      {!secciones.includes('hero') && <SelectorGrupoProfesor />}
      {secciones.map((id) => (
        <Fragment key={id}>
          {SECCION[id] || null}
          {id === 'hero' && <SelectorGrupoProfesor />}
        </Fragment>
      ))}
    </div>
  )
}

// Alumno con cuenta y academia, pero sin grupo (o con un grupo sin plan). No
// se le enseña NADA del temario —ni el carrusel, ni las cifras, ni el atlas—:
// se le dice qué le falta y dónde conseguirlo. Es el mismo texto que usa
// RutaProtegida, para que la explicación no cambie según por dónde llegue.
function SinPrograma({ bloqueo }) {
  return (
    <div className="acceso-restringido" role="status">
      <span className="acceso-ico"><Icon name="candado" size={30} /></span>
      <h1>{bloqueo.titulo}</h1>
      <p>{bloqueo.texto}</p>
      <Link to={bloqueo.destino} className="btn btn--pildora btn--carbon">
        {bloqueo.codigo === 'sin-grupo' ? 'Ingresar mi código de grupo' : 'Ir a mi cuenta'}
      </Link>
    </div>
  )
}

// ===== HERO (portada PTEM) =====
// `primerModulo` sale del ÍNDICE, no de un id escrito a mano: el temario se va
// a reemplazar por el oficial de R.E.S.C.A.T.E. y cada academia puede tener el
// suyo, así que ningún id de contenido debe vivir incrustado en el código.
function SeccionHero({ stats, primerModulo }) {
  // EL HOME HABLA DEL CURSO QUE ESTA PERSONA ESTUDIA, no del catálogo.
  //
  // Antes enumeraba: «2 programas en una sola plataforma: TUM/TEM, Enfermería».
  // Eso es la voz de la academia. Quien cursa enfermería abre su plataforma y
  // tiene que ver Enfermería, no un catálogo donde lo suyo es una entrada más.
  // El color del programa tiñe el acento del encabezado, así que cambiar de
  // curso se nota sin necesidad de leer el subtítulo. Ver `identidadDelHome`.
  const { cursos, cursoId } = useCursos()
  const identidad = identidadDelHome(cursos, cursoId)
  const sub = identidad.subtitulo
  return (
    <section
      className="ph-hero"
      style={identidad.color ? { '--curso-color': identidad.color } : undefined}
    >
      <IconoEstrella size={680} className="ph-hero-marca" />
      <div className="ph-wrap ph-hero-in">
        <div className="ph-hero-foto reveal" style={{ '--d': '120ms' }}>
          <div className="ph-marco">
            {/* SÁNDWICH: marco original (atrás) */}
            <img className="ph-marco-svg ph-marco-svg--atras" src={marcoUrl} alt="" aria-hidden="true" />
            {/* paramédico (en medio): recortado al cuadro, cabeza sale por arriba */}
            <div className="ph-marco-foto">
              <picture>
                <source type="image/avif" srcSet={HERO_AVIF} sizes={HERO_SIZES} />
                <source type="image/webp" srcSet={HERO_WEBP} sizes={HERO_SIZES} />
                {/* La prioridad la pide ahora el propio <img>. El preload del
                    index.html se lo llevó la portada general: es una sola
                    etiqueta para todas las rutas y `/` es la que recibe las
                    visitas (ver el comentario del <head>). React sí pasa
                    `fetchpriority` al DOM —comprobado— así que esta imagen
                    sigue descargándose en prioridad alta; lo que pierde es el
                    adelanto del analizador de cabecera. */}
                <img
                  src={`${import.meta.env.BASE_URL}hero/paramedico-800.webp`}
                  alt="Paramédico de PTEM con uniforme y estetoscopio"
                  width="2000"
                  height="2000"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            </div>
            {/* copia del marco (al frente): enmarca y tapa cualquier mancha */}
            <img className="ph-marco-svg ph-marco-svg--frente" src={marcoFrenteUrl} alt="" aria-hidden="true" />
          </div>
        </div>
        <div className="ph-hero-texto">
          <h1 className="ph-wordmark" aria-label="PTEM">
            {['P', 'T', 'E', 'M'].map((l, i) => (
              <span key={i} className="ph-wm-l" style={{ '--i': i }}>
                {l}
              </span>
            ))}
          </h1>
          <p className="ph-hero-sub reveal" style={{ '--d': '320ms' }}>
            {sub} Aprende a <strong>comprender el porqué</strong>, no solo a
            memorizar: teoría, fisiología, farmacología y correlación clínica de verdad.
          </p>
          <div className="ph-hero-cta reveal" style={{ '--d': '420ms' }}>
            <Link to={primerModulo ? `/modulo/${primerModulo.id}` : '/temario'} className="btn btn--pildora btn--carbon">
              <Icon name="libro" size={18} /> Empezar a estudiar
            </Link>
            <Link to="/examen" className="btn btn--pildora btn--urgencia">
              <Icon name="examen" size={18} /> Ponerme a prueba
            </Link>
          </div>
          <div className="ph-stats">
            {STATS.map((s, i) => (
              <div className="ph-stat reveal" key={s.key} style={{ '--d': `${500 + i * 80}ms` }}>
                <b className="ph-stat-num">
                  <Contador valor={stats[s.key]} />
                </b>
                <span className="ph-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== Progreso (si ya hay temas leídos) =====
function SeccionProgreso({ temasLeidos, total, pct }) {
  return (
    <div className="ph-wrap">
      <Reveal as="section" className="ph-progreso">
        <div className="ph-progreso-info">
          <strong>Tu progreso</strong>
          <span>
            {temasLeidos} de {total} temas · {pct}%
          </span>
        </div>
        <div className="ph-progreso-barra">
          <span style={{ width: `${pct}%` }} />
        </div>
        {/* A la vista PERSONAL: quien da clase (y el super-admin) tiene además
            la de sus alumnos, y sin este parámetro «Ver detalle» le abría esa
            en vez de la barra que acaba de leer aquí. */}
        <Link to="/progreso?vista=mio" className="ph-link">
          Ver detalle <Icon name="chevronDer" size={15} />
        </Link>
      </Reveal>
    </div>
  )
}

// ===== MODULOS (carrusel) =====
function SeccionModulos({ modulos, leidos }) {
  return (
    <section className="ph-modulos">
      <div className="ph-wrap">
        <Reveal as="h2" className="ph-h2">
          <IconoEstrella size={26} /> Modulos
        </Reveal>
        <Reveal as="p" className="ph-h2-sub" delay={70}>
          Modulos progresivas, del fundamento celular a la farmacología avanzada, las poblaciones
          especiales y el marco normativo.
        </Reveal>
      </div>
      <ModulosCarrusel modulos={modulos} leidos={leidos} />
    </section>
  )
}

// ===== PONTE A PRUEBA =====
function SeccionPrueba() {
  return (
    <Reveal as="section" className="ph-banda ph-prueba">
      <div className="ph-wrap ph-banda-in ph-banda-in--prueba">
        <div className="ph-banda-img ph-banda-img--sangra-izq">
          <Imagen {...IMG.ponteAprueba} figura zoom={false} alt="Hojas de examen con las respuestas marcadas y un bolígrafo" />
        </div>
        <div className="ph-banda-texto ph-banda-texto--der">
          {/* Dos líneas fijas, como el diseño: «Ponte a» arriba con la inicial
              de acento grande, y «Prueba» debajo. En móvil el titular vuelve a
              fluir solo (el CSS deshace el corte). */}
          <h2 className="ph-titular ph-titular--xl">
            <span className="ph-tl">Ponte <span className="ac ph-ac--xl">a</span></span>
            <span className="ph-tl">Prueba</span>
          </h2>
          <p>
            Quiz al final de cada tema y un examen general aleatorio que mezcla las 7 modulos, con
            explicación de cada respuesta para que aprendas del error.
          </p>
          <Link to="/examen" className="btn btn--pildora btn--urgencia btn--lg">
            Iniciar Test <Icon name="chevronDer" size={18} />
          </Link>
        </div>
      </div>
    </Reveal>
  )
}

// ===== LOGROS =====
// Antes «Consulta nuestro Atlas». Cambió con la pantalla: lo que se ofrece no
// es una referencia abierta, es material que se va destapando.
function SeccionAtlas() {
  return (
    <Reveal as="section" className="ph-banda ph-atlas">
      <div className="ph-wrap ph-banda-in ph-banda-in--rev ph-banda-in--logros">
        <div className="ph-banda-texto">
          {/* Titular en ESCALERA (cada línea más pequeña que la anterior), que es
              la composición del diseño para esta banda. */}
          <h2 className="ph-titular ph-titular--escalera">
            <span className="ph-tl ph-tl--a">Descubre</span>
            <span className="ph-tl ph-tl--b">tus</span>
            <span className="ph-tl ph-tl--c"><span className="ac">Logros</span></span>
          </h2>
          <p>
            Las imágenes del temario y el glosario con cada palabra que hay que dominar. Se
            desbloquean conforme avanzas: lo que tu profesor libera, lo descubres.
          </p>
          <Link to="/logros" className="btn btn--pildora btn--fantasma btn--lg">
            Ver mis logros <Icon name="chevronDer" size={18} />
          </Link>
        </div>
        {/* La pila de libros es VERTICAL (1333×2000): en una caja 4/3 salía
            diminuta, limitada por el alto. Con 3/4 ocupa lo que el diseño le da,
            y sale por el borde derecho de la banda. */}
        <div className="ph-banda-img ph-banda-img--sangra-der">
          <Imagen {...IMG.atlas} figura zoom={false} alt="Pila de libros de estudio" />
        </div>
      </div>
    </Reveal>
  )
}

// ===== FLASHCARDS =====
function SeccionFlashcards({ flashcards }) {
  return (
    <Reveal as="section" className="ph-banda ph-flash">
      {/* Composición distinta a las otras dos bandas, como en el diseño: el
          titular cruza el ancho COMPLETO arriba, y debajo la figura (que entra
          por abajo a la izquierda, recortada por el borde) y el texto. */}
      <div className="ph-wrap ph-flash-in">
        <h2 className="ph-titular ph-flash-titulo">
          Flash<span className="ac">Cards</span>
        </h2>
        <div className="ph-banda-img ph-flash-img">
          <Imagen {...IMG.flashcards} figura zoom={false} alt="Persona señalando un botiquín de primeros auxilios" />
        </div>
        <div className="ph-banda-texto ph-flash-texto">
          <span className="ph-flash-bignum">
            <Contador valor={flashcards} />
          </span>
          <p>Repasa con nuestras flashcards por tema o globales para fijar los conceptos de alto rendimiento.</p>
          <Link to="/flashcards" className="btn btn--pildora btn--carbon btn--lg">
            Repasar <Icon name="chevronDer" size={18} />
          </Link>
        </div>
      </div>
    </Reveal>
  )
}

// La sección de la academia vive en components/BloqueAcademia.jsx, que el
// director y el super-admin configuran (variante, mensaje, avisos y accesos).
// Sin configurar enseña logo, nombre y lema, como la banda de siempre.

// ============================================================
//  Panel de bienvenida del PROFESOR: con qué grupo trabaja hoy
// ------------------------------------------------------------
//  ANTES esto escribía `perfil.grupoId` para "recordar" la elección, y no
//  funcionaba: firestore.rules prohíbe expresamente que alguien salte de un
//  grupo a otro dentro de su academia por cuenta propia —el grupo lleva el
//  plan de estudios—, así que a un profesor que ya tuviera grupo la escritura
//  se le denegaba y solo veía «No se pudo cambiar de grupo». Además ofrecía
//  TODOS los grupos de la academia, incluidos los que no son suyos.
//
//  Ahora la elección es local (ver AuthContext): no escribe nada, es
//  instantánea y no puede ser denegada. Y solo ofrece los grupos que su
//  director le asignó: cambiar de vista no es lo mismo que tener acceso.
//
//  Se quitó «Todos los grupos» a propósito. Una maestra trabaja con UN grupo a
//  la vez —es lo que pidió el producto y lo que necesita la clase en vivo—, y
//  un estado «todos» obligaría a decidir a qué grupo se le pone una
//  calificación, que es exactamente el error que no se puede permitir.
// ============================================================
function SelectorGrupoProfesor() {
  const { rol, perfil, academiaId, grupo, grupoId, grupos, elegirGrupo } = useAuth()
  const [deLaAcademia, setDeLaAcademia] = useState(null) // null = cargando

  useEffect(() => {
    if (rol !== 'instructor' || !academiaId) { setDeLaAcademia([]); return undefined }
    let activo = true
    ;(async () => {
      try {
        const { listarGrupos } = await import('../lib/firebase/grupos.js')
        const lista = await listarGrupos(academiaId)
        if (activo) setDeLaAcademia(lista.filter((g) => g.estado === 'activo'))
      } catch {
        if (activo) setDeLaAcademia([])
      }
    })()
    return () => { activo = false }
  }, [rol, academiaId])

  // Esta sección es exclusiva de los profesores.
  if (rol !== 'instructor') return null

  const nombre = (perfil?.nombre || '').split(' ')[0]
  // Sus grupos, con nombre, y sin los que ya no existen: un id que quedó en el
  // perfil tras borrar un grupo no debe ofrecerse como opción.
  const mios = gruposDelPanel({ rol, perfil, gruposDeAcademia: deLaAcademia || [] })

  return (
    <div className="ph-wrap">
      <section className="prof-panel" aria-label="Selección de grupo">
        <div className="prof-panel-cab">
          <span className="prof-panel-ico"><Icon name="usuario" size={22} /></span>
          <div>
            <h2>Hola{nombre ? `, ${nombre}` : ''}</h2>
            <p>
              {mios.length > 1
                ? 'Elige el grupo con el que vas a trabajar. Enfoca tu panel de avance, tus reportes y la visibilidad de contenido.'
                : 'Este es el grupo con el que trabajas. Enfoca tu panel de avance, tus reportes y la visibilidad de contenido.'}
            </p>
          </div>
        </div>

        {deLaAcademia === null ? (
          <p className="prof-panel-vacio">Cargando tus grupos…</p>
        ) : mios.length === 0 ? (
          <p className="prof-panel-vacio">
            Todavía no tienes ningún grupo asignado. Pide al director de tu
            academia que te asigne los grupos que vas a impartir.
          </p>
        ) : (
          <>
            <div className="prof-grupos" role="group" aria-label="Tus grupos">
              {mios.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`prof-grupo-chip ${grupoId === g.id ? 'activo' : ''}`}
                  aria-pressed={grupoId === g.id}
                  onClick={() => elegirGrupo(g.id)}
                >
                  {g.nombre}
                  {grupoId === g.id && (
                    <span className="prof-grupo-check" aria-hidden="true"><Icon name="check" size={14} /></span>
                  )}
                </button>
              ))}
            </div>

            <div className="prof-panel-pie">
              <span className="prof-panel-actual">
                Trabajando con: <strong>{grupo?.nombre || mios.find((g) => g.id === grupoId)?.nombre || '—'}</strong>
              </span>
              <Link to="/panel" className="btn btn--pildora btn--carbon">
                <Icon name="progreso" size={16} /> Ir a mi panel
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
