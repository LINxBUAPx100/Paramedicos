import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { useAdmin } from './AdminShell.jsx'
import { ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo } from '../../lib/capacidades.js'
import { rutaDeAcademia } from '../../lib/adminModelo.js'

// ============================================================
//  Armazón de UNA academia dentro de la consola (/admin/aca/:academiaId)
// ------------------------------------------------------------
//  Antes, administrar una academia era una sola página que apilaba once
//  bloques —estadísticas, solicitudes, avance, grupos, visibilidad, miembros,
//  permisos, dictámenes, invitaciones, códigos y personalización— en un scroll
//  interminable, mientras el riel de la izquierda seguía hablando de la
//  plataforma. Ahora cada uno de esos bloques es una sección con su ruta, y el
//  riel entero pasa a ser el de esta academia (ver lib/adminModelo.js).
//
//  Este armazón resuelve la academia por su id y la reparte por el contexto del
//  Outlet, junto a las personas y los intentos que AdminShell ya cargó: cambiar
//  de sección no vuelve a leer Firestore.
// ============================================================
export function useAcademiaAdmin() {
  return useOutletContext()
}

export default function AcademiaShell() {
  // El PROGRAMA que se supervisa viene de la RUTA, no de un estado: así el
  // enlace se puede compartir, sobrevive a la recarga, y las pantallas de un
  // programa no pueden acabar enseñando datos de otro.
  const { academiaId, cursoId = null } = useParams()
  const { academias, usuarios, intentos, refrescar, miUid, cargandoDatos } = useAdmin()
  const [academia, setAcademia] = useState(undefined) // undefined = buscando; null = no existe

  // Primero se busca entre las que la consola ya tiene; solo si no está (enlace
  // directo a una academia recién creada) se pide su documento.
  useEffect(() => {
    const enMemoria = academias.find((a) => a.id === academiaId)
    if (enMemoria) { setAcademia(enMemoria); return undefined }
    if (cargandoDatos) return undefined
    let vivo = true
    ;(async () => {
      try {
        const { obtenerAcademia } = await import('../../lib/firebase/usuarios.js')
        const doc = await obtenerAcademia(academiaId)
        if (vivo) setAcademia(doc || null)
      } catch {
        if (vivo) setAcademia(null)
      }
    })()
    return () => { vivo = false }
  }, [academiaId, academias, cargandoDatos])

  const suyos = useMemo(
    () => usuarios.filter((u) => u.academiaId === academiaId),
    [usuarios, academiaId]
  )

  const contexto = useMemo(
    () => ({
      academiaId,
      // El PROGRAMA que se supervisa, o null en la pantalla de programas. Las
      // secciones que son de un plan de estudios —resumen, grupos, contenido,
      // revisión— lo usan para no enseñar datos de otro.
      cursoId,
      academia,
      academiaNombre: academia?.nombre || academiaId,
      // Personas de ESTA academia, incluidas las dadas de baja: cada sección
      // decide si las enseña (la lista de alumnos las oculta salvo que se pidan).
      usuarios: suyos,
      intentos: intentos.filter((i) => i.academiaId === academiaId),
      miUid,
      refrescar,
    }),
    [academiaId, cursoId, academia, suyos, intentos, miUid, refrescar]
  )

  if (academia === undefined) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Abriendo la academia…</span>
      </div>
    )
  }

  if (academia === null) {
    return (
      <div className="cs-seccion">
        <div className="acceso-restringido" role="alert">
          <span className="acceso-ico"><Icon name="alerta" size={30} /></span>
          <h1>No existe la academia «{academiaId}»</h1>
          <p>Puede que se haya dado de baja o que el código esté mal escrito.</p>
          <Link to="/admin/academias" className="btn btn--pildora btn--carbon">Ver las academias</Link>
        </div>
      </div>
    )
  }

  const plan = planEfectivo(academia)

  return (
    <div className="aca-admin">
      {/* Cabecera de contexto: en una consola con dos contextos, lo primero que
          hay que poder responder es «¿dónde estoy?» sin leer la URL. */}
      <header className="aca-admin-cab">
        <div className="aca-admin-id">
          <span className="aca-admin-etiqueta">Academia</span>
          <h1>{academia.nombre || academia.id}</h1>
          <p>
            <code>{academia.id}</code>
            <span className={`pc-estado ${academia.estado === 'activo' ? 'activo' : 'expirado'}`}>
              {academia.estado || 'activo'}
            </span>
            <span className="aca-admin-plan">
              {ETIQUETA_PLAN[plan] || plan} · {ETIQUETA_TIPO[academia.tipo] || academia.tipo}
            </span>
          </p>
        </div>
        <Link className="btn btn--sm btn--suave" to="/admin">
          <Icon name="chevronIzq" size={14} /> Toda la plataforma
        </Link>
      </header>

      <Outlet context={contexto} />

      <p className="aca-admin-pie">
        ¿Buscabas otra cosa de esta academia? Está en el menú de la izquierda: alumnos, grupos,
        invitaciones, contenido, revisión docente y{' '}
        <Link to={rutaDeAcademia(academiaId, 'ajustes')}>ajustes</Link>.
      </p>
    </div>
  )
}
