import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { estadoDeCuenta } from '../lib/staff/cajaModelo.js'
import { cargosDeOrdenes } from '../lib/staff/carritoModelo.js'
import { resumenDeAsistencia } from '../lib/staff/asistenciaModelo.js'

// ============================================================
//  LA FICHA DEL MOSTRADOR — un solo dueño del estado
// ------------------------------------------------------------
//  TODO el entorno de recepción gira alrededor de UNA pregunta: quién está
//  ahora mismo delante del mostrador. Ese dato lo tiene este contexto, y solo
//  este contexto.
//
//  POR QUÉ ASÍ, y no cada panel leyendo lo suyo. Si el panel de caja pidiera
//  sus pagos, el de asistencia las suyas y el de tienda sus órdenes, buscar a
//  una persona dispararía cuatro cargas descoordinadas, cada panel tendría su
//  propio «cargando» y su propio error, y cobrar algo no refrescaría el saldo
//  que enseña el de al lado. Con un dueño único, una búsqueda es UNA carga y
//  un cobro es UN refresco que ven todos.
//
//  Y ES LA PIEZA QUE HACE BARATO EL REDISEÑO QUE VIENE. Los paneles reciben
//  datos por este contexto y no saben de rutas, de Firestore ni de en qué
//  pestaña están pintados. Rediseñar la pantalla es reescribir el armazón y el
//  CSS; esto y la capa pura no se tocan.
//
//  EL SDK DE FIREBASE ENTRA POR IMPORT DINÁMICO, igual que en el resto de la
//  aplicación: la pantalla puede pintarse y enfocar el buscador antes de que
//  llegue, que es lo que se nota en un mostrador.
// ============================================================

const FichaStaffContext = createContext(null)

const VACIO = {
  pagos: [], asistencias: [], ordenes: [], adeudos: [],
  agenda: { todas: [], pasadas: [], proximas: [] },
}

export function FichaStaffProvider({ academiaId, academia, miUid, puedeCorregirPagos = false, children }) {
  const [alumno, setAlumno] = useState(null)
  const [grupo, setGrupo] = useState(null)
  const [datos, setDatos] = useState(VACIO)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  // Contador de peticiones. Sin él, una búsqueda lenta puede aterrizar DESPUÉS
  // de otra más reciente y dejar en pantalla la ficha de la persona anterior,
  // con la de la actual ya seleccionada. En un mostrador eso significa cobrarle
  // a quien no era.
  const turno = useRef(0)

  const cargarDatos = useCallback(async (persona) => {
    if (!persona || !academiaId) { setDatos(VACIO); return }
    const mio = (turno.current += 1)
    setCargando(true)
    setError('')
    try {
      const [
        { pagosDe }, { asistenciasDe }, { ordenesDe }, { agendaDelAlumno },
        { grupoDeAlumno }, { matriculasDe }, { adeudosDe },
      ] = await Promise.all([
        import('../lib/firebase/staff/caja.js'),
        import('../lib/firebase/staff/asistencias.js'),
        import('../lib/firebase/staff/tienda.js'),
        import('../lib/firebase/staff/agenda.js'),
        import('../lib/firebase/staff/alumnos.js'),
        import('../lib/firebase/matriculas.js'),
        import('../lib/firebase/staff/adeudos.js'),
      ])
      const uid = persona.uid || persona.id
      const [pagos, asistencias, ordenes, agenda, suGrupo, adeudos] = await Promise.all([
        // Con TODAS sus matrículas: cambiar de grupo la rehace y los pagos son
        // inmutables, así que los de antes del cambio solo se encuentran por la
        // matrícula que tenían entonces.
        pagosDe({ matriculas: matriculasDe(persona), academiaId }).catch(() => []),
        asistenciasDe({ uid, academiaId }).catch(() => []),
        // Con uid Y matrícula: el uid encuentra los pedidos de quien todavía
        // no tiene matrícula, y la matrícula, las órdenes viejas sin uid.
        ordenesDe({ uid, matriculas: matriculasDe(persona), academiaId }).catch(() => []),
        agendaDelAlumno({ academiaId, grupoId: persona.grupoId }).catch(() => VACIO.agenda),
        grupoDeAlumno(persona.grupoId).catch(() => null),
        adeudosDe({ uid, matriculas: matriculasDe(persona), academiaId }).catch(() => []),
      ])
      if (mio !== turno.current) return // llegó tarde: manda la búsqueda nueva
      setDatos({ pagos, asistencias, ordenes, agenda, adeudos })
      setGrupo(suGrupo)

      // SU MATRÍCULA SE EMITE SOLA AL ABRIRLE LA FICHA (21-09-2026).
      //
      // Quien entró por código de grupo, por invitación o por una solicitud
      // aceptada llega aquí sin matrícula: nadie del personal le asignó el
      // grupo, y sin Cloud Functions no hay nada del lado del servidor que
      // pueda emitírsela en ese momento. La primera vez que alguien del
      // mostrador la atiende, la recibe — sin pulsar nada, que es lo que se
      // pidió.
      //
      // Va DESPUÉS de pintar los datos y sin bloquear: la ficha ya está en
      // pantalla y esto es un añadido. Si falla, se reintenta la próxima vez.
      if (suGrupo && !String(persona.matricula || '').trim()) {
        try {
          const { asegurarMatriculas } = await import('../lib/firebase/matriculas.js')
          const r = await asegurarMatriculas({
            alumnos: [{ ...persona, uid, academiaId }],
            grupos: [suGrupo],
            academiaId,
          })
          // Solo si de verdad se emitió: releer la ficha para que la cabecera
          // enseñe el número. Sin esa condición, un grupo mal configurado
          // provocaría una recarga en cada apertura.
          if (r.emitidas.length && mio === turno.current) {
            const { fichaDeAlumno } = await import('../lib/firebase/staff/alumnos.js')
            const fresca = await fichaDeAlumno(uid)
            if (fresca && mio === turno.current) setAlumno(fresca)
          }
        } catch { /* la ficha ya está en pantalla; la matrícula espera */ }
      }
    } catch (err) {
      if (mio !== turno.current) return
      // Los apartados fallan por separado (cada uno con su `.catch`), así que
      // llegar aquí significa que falló algo transversal: permisos o red.
      setError(err?.message || 'No se pudieron cargar los datos de esta persona.')
    } finally {
      if (mio === turno.current) setCargando(false)
    }
  }, [academiaId])

  const seleccionar = useCallback((persona) => {
    setAlumno(persona || null)
    setGrupo(null)
    setDatos(VACIO)
    if (persona) cargarDatos(persona)
  }, [cargarDatos])

  const limpiar = useCallback(() => {
    turno.current += 1
    setAlumno(null)
    setGrupo(null)
    setDatos(VACIO)
    setError('')
    setCargando(false)
  }, [])

  /**
   * Vuelve a leer la ficha Y sus datos desde la base.
   *
   * Se llama después de cada acción que escribe —cobrar, apartar, entregar,
   * editar— y por eso relee también el documento del usuario: una edición de
   * perfil tiene que verse en la cabecera sin que nadie recargue la página.
   */
  const recargar = useCallback(async () => {
    if (!alumno) return
    try {
      const { fichaDeAlumno } = await import('../lib/firebase/staff/alumnos.js')
      const fresca = await fichaDeAlumno(alumno.uid || alumno.id)
      if (fresca) setAlumno(fresca)
      await cargarDatos(fresca || alumno)
    } catch {
      await cargarDatos(alumno)
    }
  }, [alumno, cargarDatos])

  // El estado de cuenta se DERIVA; no se guarda. Guardarlo significaría tener
  // que acordarse de recalcularlo tras cada cobro, y olvidarlo una vez deja un
  // saldo mentiroso en pantalla.
  const cuenta = useMemo(
    () => estadoDeCuenta({
      pagos: datos.pagos,
      cargos: cargosDeOrdenes(datos.ordenes),
      adeudos: datos.adeudos,
    }),
    [datos.pagos, datos.ordenes, datos.adeudos]
  )

  // Igual con la asistencia: «está en clase» sale de la hora de caducidad, no
  // de ninguna bandera. Ver `lib/staff/asistenciaModelo.js`.
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    // Un minuto basta: lo que se mira es «le quedan 40 min», no los segundos.
    const id = setInterval(() => setAhora(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  const asistencia = useMemo(
    () => resumenDeAsistencia(datos.asistencias, ahora),
    [datos.asistencias, ahora]
  )

  const valor = useMemo(() => ({
    academiaId, academia, miUid, puedeCorregirPagos,
    alumno, grupo,
    ...datos,
    cuenta, asistencia, ahora,
    cargando, error,
    seleccionar, limpiar, recargar,
  }), [
    academiaId, academia, miUid, puedeCorregirPagos, alumno, grupo, datos, cuenta, asistencia, ahora,
    cargando, error, seleccionar, limpiar, recargar,
  ])

  return <FichaStaffContext.Provider value={valor}>{children}</FichaStaffContext.Provider>
}

export function useFicha() {
  const ctx = useContext(FichaStaffContext)
  if (!ctx) throw new Error('useFicha debe usarse dentro de FichaStaffProvider')
  return ctx
}
