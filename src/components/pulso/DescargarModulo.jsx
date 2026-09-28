import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { esEvaluacionPorId } from '../../lib/pulsoModelo.js'

// «Descargar módulo» (PTEM Pulso, entrega 6). Guarda las lecciones del módulo
// que el grupo tiene liberadas para estudiarlas sin red.
//
// La primera vez hay que encender la caché sin conexión de Firestore, que solo
// se puede elegir al arrancar: se marca, se recarga la página con
// ?descargar=1 y la descarga sigue sola. Ver lib/firebase/init.js.
const CLAVE = 'ptem:sin-conexion'

export default function DescargarModulo({ modulo, temas = [], api }) {
  const { user } = useAuth()
  const [params, setParams] = useSearchParams()
  const [estado, setEstado] = useState({ fase: 'cargando', hechos: 0, total: 0, fecha: null })
  const ids = temas.map((t) => t.id).filter((id) => !esEvaluacionPorId(id))

  useEffect(() => {
    let vivo = true
    import('../../lib/descargas.js')
      .then(({ estadoDescargaModulo }) => estadoDescargaModulo(modulo.id))
      .then((f) => { if (vivo) setEstado({ fase: f ? 'hecho' : 'libre', hechos: f?.temas?.length || 0, total: ids.length, fecha: f?.fecha || null }) })
      .catch(() => { if (vivo) setEstado((e) => ({ ...e, fase: 'libre' })) })
    return () => { vivo = false }
  }, [modulo.id, ids.length])

  const descargar = async () => {
    let conCache = false
    try { conCache = localStorage.getItem(CLAVE) === '1' } catch { /* sin almacenamiento */ }
    if (!conCache) {
      try { localStorage.setItem(CLAVE, '1') } catch { setEstado((e) => ({ ...e, fase: 'error' })); return }
      const siguiente = new URLSearchParams(params)
      siguiente.set('descargar', '1')
      setParams(siguiente, { replace: true })
      setTimeout(() => window.location.reload(), 50)
      return
    }
    setEstado({ fase: 'bajando', hechos: 0, total: ids.length, fecha: null })
    try {
      const { descargarModulo } = await import('../../lib/descargas.js')
      const ficha = await descargarModulo(modulo.id, ids, (id) => api.getTemaAsync(id), (hechos, total) => setEstado((e) => ({ ...e, hechos, total })))
      setEstado({ fase: 'hecho', hechos: ficha.temas.length, total: ids.length, fecha: ficha.fecha })
    } catch {
      setEstado((e) => ({ ...e, fase: 'error' }))
    }
  }

  // Vuelta de la recarga: la descarga sigue sola, una vez.
  useEffect(() => {
    if (params.get('descargar') !== '1' || !user || estado.fase !== 'libre') return
    const siguiente = new URLSearchParams(params)
    siguiente.delete('descargar')
    setParams(siguiente, { replace: true })
    descargar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, user, estado.fase])

  const quitar = async () => {
    const { quitarDescargaDeModulo } = await import('../../lib/descargas.js')
    await quitarDescargaDeModulo(modulo.id)
    setEstado({ fase: 'libre', hechos: 0, total: ids.length, fecha: null })
  }

  if (!user || !ids.length) return null
  const fecha = estado.fecha ? new Date(estado.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : ''
  return (
    <div className="pl-descarga" role="status" aria-live="polite">
      {estado.fase === 'bajando' ? (
        <>
          <span className="pl-descarga-barra" aria-hidden="true"><i style={{ width: `${estado.total ? (estado.hechos / estado.total) * 100 : 0}%` }} /></span>
          <span>Descargando {estado.hechos} de {estado.total} lecciones…</span>
        </>
      ) : estado.fase === 'hecho' ? (
        <>
          <span className="pl-descarga-ok">Disponible sin conexión · {estado.hechos} {estado.hechos === 1 ? 'lección' : 'lecciones'} · {fecha}</span>
          <button type="button" className="btn btn--fantasma btn--sm" onClick={descargar}>Actualizar</button>
          <button type="button" className="btn btn--fantasma btn--sm" onClick={quitar}>Quitar</button>
        </>
      ) : (
        <>
          <button type="button" className="btn btn--fantasma btn--sm" onClick={descargar} disabled={estado.fase === 'cargando'}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14" /></svg>
            Descargar módulo
          </button>
          <span className="pl-nota-pie">
            {estado.fase === 'error'
              ? 'No se pudo descargar. Revisa tu conexión e inténtalo otra vez.'
              : `${ids.length} ${ids.length === 1 ? 'lección' : 'lecciones'} para estudiar sin red. Se borran al cerrar sesión.`}
          </span>
        </>
      )}
    </div>
  )
}
