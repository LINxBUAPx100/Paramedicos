import { lazy, Suspense, useEffect, useState } from 'react'
import Icon from '../Icon.jsx'
import BuscadorAlumno from './BuscadorAlumno.jsx'
import FichaAlumno from './FichaAlumno.jsx'
import PanelAsistencia from './PanelAsistencia.jsx'
import PanelAgenda from './PanelAgenda.jsx'
import PanelCaja from './PanelCaja.jsx'
import PanelTienda from './PanelTienda.jsx'
import PanelMensajes from './PanelMensajes.jsx'
import { FichaStaffProvider, useFicha } from '../../context/FichaStaffContext.jsx'
import { textoDeError } from '../../lib/staff/avisos.js'
import '../../styles/staff.css'

// Lo que no se usa en cada atención se descarga al abrirlo.
const FormularioPerfil = lazy(() => import('./FormularioPerfil.jsx'))
const ArmadorDeReporte = lazy(() => import('./ArmadorDeReporte.jsx'))
const PanelPadron = lazy(() => import('./PanelPadron.jsx'))
const PanelCorte = lazy(() => import('./PanelCorte.jsx'))
const PanelSolicitudes = lazy(() => import('./PanelSolicitudes.jsx'))
const BandejaDeTienda = lazy(() => import('./BandejaDeTienda.jsx'))
// El alta de mostrador YA EXISTE (trabajo O4a, 05-09-2026) y se reutiliza tal
// cual. Reserva la matrícula con una transacción sobre el contador de la SERIE
// del grupo: RECEPCIÓN NO LA ELIGE NI LA TECLEA, y el formulario ni siquiera
// tiene ese campo. Escribir otro alta aquí duplicaría esa numeración, que es
// exactamente lo que no puede duplicarse.
const AltaDeRecepcion = lazy(() => import('../panel/AltaDeRecepcion.jsx'))

// ============================================================
//  El armazón de recepción — ESTE es el archivo del rediseño
// ------------------------------------------------------------
//  Cuando llegue el rediseño profundo del sistema, lo que se reescribe es este
//  archivo y `styles/staff.css`. Nada más. Los paneles reciben todo por el
//  contexto de la ficha y no saben de rutas, de pestañas ni de Firestore; la
//  aritmética vive en `lib/staff/*` y se prueba sin navegador.
//
//  DOS NIVELES DE NAVEGACIÓN, y la distinción importa:
//
//   · Las SECCIONES (mostrador, alta, alumnos, caja, solicitudes, tienda) son
//     el trabajo de recepción. Están siempre.
//   · Las PESTAÑAS de la ficha (asistencia, clase, caja, tienda, mensaje,
//     editar, imprimir) solo existen mientras hay alguien en el mostrador.
//
//  Mezclarlas obligaría a decidir qué enseñar cuando no hay nadie atendido, y
//  la respuesta siempre sería «casi nada».
//
//  RESPONSIVO DE VERDAD, porque se opera de pie y a veces en tableta: una sola
//  columna por debajo de 900 px, y objetivos táctiles de 44 px.
// ============================================================

const SECCIONES = [
  { id: 'mostrador', etiqueta: 'Mostrador', icono: 'buscar' },
  { id: 'alta', etiqueta: 'Dar de alta', icono: 'mas' },
  { id: 'alumnos', etiqueta: 'Alumnos', icono: 'usuario' },
  { id: 'caja', etiqueta: 'Corte de caja', icono: 'pildora' },
  { id: 'solicitudes', etiqueta: 'Solicitudes', icono: 'pregunta' },
  { id: 'tienda', etiqueta: 'Tienda', icono: 'carpeta' },
]

const PESTANAS = [
  { id: 'asistencia', etiqueta: 'Asistencia', icono: 'check' },
  { id: 'clase', etiqueta: 'Clase', icono: 'temario' },
  { id: 'caja', etiqueta: 'Cobrar', icono: 'pildora' },
  { id: 'tienda', etiqueta: 'Tienda', icono: 'carpeta' },
  { id: 'mensajes', etiqueta: 'Mensaje', icono: 'compartir' },
  { id: 'ficha', etiqueta: 'Editar ficha', icono: 'editar' },
  { id: 'reporte', etiqueta: 'Imprimir', icono: 'descarga' },
]

// `puedeCorregirPagos` lo decide QUIEN MONTA la pantalla, no ella: es la
// dirección y el super-admin, y esta misma pantalla la usa también recepción.
// Se pasa hacia abajo por el contexto en vez de leer el rol aquí porque el
// armazón no sabe de sesiones — ver la cabecera de FichaStaffContext.
export default function StaffShell({ academiaId, academia, miUid, puedeCorregirPagos = false }) {
  return (
    <FichaStaffProvider
      academiaId={academiaId} academia={academia} miUid={miUid}
      puedeCorregirPagos={puedeCorregirPagos}
    >
      <Mostrador academiaId={academiaId} academia={academia} miUid={miUid} />
    </FichaStaffProvider>
  )
}

function Mostrador({ academiaId, academia, miUid }) {
  const { alumno, seleccionar, limpiar, error } = useFicha()
  const [seccion, setSeccion] = useState('mostrador')
  const [pestana, setPestana] = useState('asistencia')
  const [grupos, setGrupos] = useState([])
  const [errorGrupos, setErrorGrupos] = useState('')

  // Los grupos se leen UNA vez: se usan en el selector de la ficha, en el alta,
  // en el filtro del padrón y para poner nombre al grupo del alumno.
  useEffect(() => {
    if (!academiaId) return undefined
    let vivo = true
    ;(async () => {
      try {
        const { listarGrupos } = await import('../../lib/firebase/grupos.js')
        const lista = await listarGrupos(academiaId)
        if (vivo) setGrupos(lista)
      } catch (err) {
        if (vivo) setErrorGrupos(textoDeError(err, 'No se pudieron cargar los grupos', 'grupos'))
      }
    })()
    return () => { vivo = false }
  }, [academiaId])

  const nombreGrupo = (id) => grupos.find((g) => g.id === id)?.nombre || id

  // Al cambiar de persona se vuelve a la pestaña de asistencia: es lo primero
  // que se hace con quien acaba de llegar.
  useEffect(() => { if (alumno) setPestana('asistencia') }, [alumno?.uid, alumno?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Abrir a alguien desde otra sección. `destino` importa: desde el padrón se
  // va al mostrador —es donde está todo lo suyo—, pero desde la bandeja de
  // tienda se QUEDA en tienda, porque lo que se iba a hacer es confirmarle el
  // pedido y mandarlo a otra pantalla obligaría a volver.
  const abrirFicha = (persona, destino = 'mostrador') => {
    if (!persona) return
    seleccionar(persona)
    setSeccion(destino)
  }

  return (
    <div className="staff-mostrador">
      <nav className="staff-secciones" aria-label="Secciones de recepción">
        {SECCIONES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`staff-pestana ${seccion === s.id ? 'es-activa' : ''}`}
            onClick={() => setSeccion(s.id)}
            aria-current={seccion === s.id ? 'true' : undefined}
          >
            <Icon name={s.icono} size={18} />
            <span>{s.etiqueta}</span>
          </button>
        ))}
      </nav>

      {errorGrupos && <p className="ui-nota-error">{errorGrupos}</p>}

      <Suspense fallback={<p role="status">Cargando…</p>}>
        {seccion === 'alta' && (
          <section className="ui-panel staff-panel">
            <h3>Dar de alta</h3>
            <p className="staff-ayuda">
              <b>La matrícula se genera sola.</b> Sale de la <b>serie del grupo</b> que elijas
              —generación, mes de inicio, día de clase y turno— más su orden de llegada, que
              reserva un contador al guardar: no se teclea, no se repite y no se puede elegir. Al
              terminar verás su número y el enlace personal con el que entra.
            </p>
            <AltaDeRecepcion
              academiaId={academiaId}
              academiaNombre={academia?.nombre || academiaId}
              grupos={grupos}
              miUid={miUid}
              nombreGrupo={nombreGrupo}
            />
          </section>
        )}

        {seccion === 'alumnos' && (
          <PanelPadron
            academiaId={academiaId}
            academia={academia}
            grupos={grupos}
            onAbrirFicha={abrirFicha}
            onAlta={() => setSeccion('alta')}
          />
        )}

        {seccion === 'caja' && <PanelCorte academiaId={academiaId} academia={academia} />}
        {seccion === 'solicitudes' && <PanelSolicitudes academiaId={academiaId} />}

        {seccion === 'tienda' && (
          <>
            {/* La bandeja va SIEMPRE, con o sin persona atendida: un pedido
                hecho desde el teléfono no tiene a nadie delante, así que si
                solo se viera buscando a su autor, nadie lo vería nunca. */}
            <BandejaDeTienda academiaId={academiaId} onAbrirFicha={(p) => abrirFicha(p, 'tienda')} />
            {alumno
              ? <PanelTienda />
              : (
                <p className="staff-ayuda">
                  Para apartar o entregar material hace falta saber a quién. Abre la ficha de
                  alguien desde la bandeja, o búscalo en el mostrador.
                </p>
              )}
          </>
        )}

        {seccion === 'mostrador' && !alumno && (
          <div className="staff-mostrador--vacio">
            <BuscadorAlumno
              academiaId={academiaId}
              onElegir={seleccionar}
              onAlta={() => setSeccion('alta')}
            />
            <p className="staff-ayuda staff-pie">
              Busca por matrícula, nombre, correo o teléfono. Si la persona no existe todavía,
              podrás darla de alta sin salir de aquí.
            </p>
          </div>
        )}

        {seccion === 'mostrador' && alumno && (
          <>
            <FichaAlumno onCerrar={limpiar} onEditar={() => setPestana('ficha')} />

            {error && <p className="ui-nota-error" role="alert">{error}</p>}

            <nav className="staff-pestanas" aria-label="Acciones sobre esta persona">
              {PESTANAS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`staff-pestana ${pestana === p.id ? 'es-activa' : ''}`}
                  onClick={() => setPestana(p.id)}
                  aria-current={pestana === p.id ? 'true' : undefined}
                >
                  <Icon name={p.icono} size={18} />
                  <span>{p.etiqueta}</span>
                </button>
              ))}
            </nav>

            {pestana === 'asistencia' && <PanelAsistencia />}
            {pestana === 'clase' && <PanelAgenda />}
            {pestana === 'caja' && <PanelCaja />}
            {pestana === 'tienda' && <PanelTienda />}
            {pestana === 'mensajes' && <PanelMensajes />}
            {pestana === 'ficha' && <FormularioPerfil grupos={grupos} />}
            {pestana === 'reporte' && <ArmadorDeReporte />}
          </>
        )}
      </Suspense>
    </div>
  )
}
