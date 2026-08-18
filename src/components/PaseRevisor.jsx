import { useState } from 'react'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import {
  normalizarPase, paseActivo, diasRestantesPase, validarPase, caducidadEn,
  DIAS_PASE_SUGERIDOS, MAX_DIAS_PASE,
} from '../lib/revisionDocente.js'

// ============================================================
//  Pase de revisión docente — botón del administrador
// ------------------------------------------------------------
//  El caso de uso: pedirle a profesores concretos que revisen y validen el
//  temario. Lo que necesitan para eso es firmar dictámenes, no editar.
//
//  Por eso este panel NO concede rol de administrador ni permisos de edición:
//  concede un pase con fecha de caducidad que habilita los tres botones de cada
//  tema —Validar, Corregir, Reportar— y nada más. Si nadie lo revoca, se apaga
//  solo el día que vence.
//
//  Los permisos de EDICIÓN siguen viviendo en la matriz de arriba
//  (`PermisosEditoriales`) y se conceden aparte, a conciencia.
// ============================================================

const hoyISO = () => new Date().toISOString().slice(0, 10)

export default function PaseRevisor({ profesor, onCambio }) {
  const { user } = useAuth()
  const [abierto, setAbierto] = useState(false)
  const [dias, setDias] = useState(DIAS_PASE_SUGERIDOS)
  const [nota, setNota] = useState('')
  const [estado, setEstado] = useState('') // '' | 'guardando' | 'ok'
  const [error, setError] = useState('')

  const hoy = hoyISO()
  const pase = normalizarPase(profesor?.revisorTemporal)
  const activo = paseActivo(profesor, hoy)
  const restantes = diasRestantesPase(profesor, hoy)

  const conceder = async (e) => {
    e.preventDefault()
    setError('')
    const hasta = caducidadEn(dias, hoy)
    const problema = validarPase({ hasta, nota }, hoy)
    if (problema) { setError(problema); return }

    setEstado('guardando')
    try {
      const { otorgarPaseRevisor } = await import('../lib/firebase/usuarios.js')
      await otorgarPaseRevisor(profesor.id, { hasta, nota }, { hoy, porUid: user?.uid || null })
      setEstado('ok')
      setNota('')
      setTimeout(() => { setAbierto(false); setEstado(''); onCambio?.() }, 1200)
    } catch (err) {
      setEstado('')
      setError(err?.message || 'No se pudo conceder el pase.')
    }
  }

  const revocar = async () => {
    setError('')
    setEstado('guardando')
    try {
      const { revocarPaseRevisor } = await import('../lib/firebase/usuarios.js')
      await revocarPaseRevisor(profesor.id, { porUid: user?.uid || null })
      setEstado('')
      onCambio?.()
    } catch (err) {
      setEstado('')
      setError(err?.message || 'No se pudo revocar el pase.')
    }
  }

  return (
    <div className="pe-pase">
      <div className="pe-pase-fila">
        <span className={`pe-pase-estado${activo ? ' es-activo' : ''}`}>
          <Icon name={activo ? 'check' : 'candado'} size={14} />
          {activo
            ? `Pase de revisión vigente${restantes === 0 ? ' · caduca hoy' : ` · ${restantes} día${restantes === 1 ? '' : 's'}`}`
            : pase.hasta
              ? `Pase caducado el ${pase.hasta}`
              : 'Sin pase de revisión'}
        </span>
        <div className="pe-pase-acciones">
          <button type="button" className="btn btn--suave btn--mini" onClick={() => setAbierto((v) => !v)}>
            {activo ? 'Renovar' : 'Dar pase de revisión'}
          </button>
          {activo && (
            <button
              type="button"
              className="btn btn--suave btn--mini"
              onClick={revocar}
              disabled={estado === 'guardando'}
            >
              Revocar
            </button>
          )}
        </div>
      </div>

      {activo && pase.nota && <p className="pe-pase-nota">«{pase.nota}»</p>}

      {abierto && (
        <form className="pe-pase-form" onSubmit={conceder}>
          <p className="pe-pase-explica">
            El pase habilita los botones <strong>Validar</strong>, <strong>Corregir</strong> y{' '}
            <strong>Reportar</strong> en todos los temas. No permite editar, publicar ni borrar
            nada, y caduca solo.
          </p>
          <label className="revdoc-campo">
            <span>Vigencia</span>
            <select value={dias} onChange={(e) => setDias(Number(e.target.value))}>
              <option value={7}>7 días</option>
              <option value={15}>15 días</option>
              <option value={30}>30 días</option>
              <option value={60}>60 días</option>
              <option value={MAX_DIAS_PASE}>{MAX_DIAS_PASE} días (máximo)</option>
            </select>
          </label>
          <label className="revdoc-campo">
            <span>Qué le pides que revise (opcional)</span>
            <input
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              maxLength={300}
              placeholder="Módulo 5: trauma de tórax y quemaduras"
            />
          </label>
          <p className="pe-pase-caduca">
            Caduca el <strong>{caducidadEn(dias, hoy)}</strong>.
          </p>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {estado === 'ok' && <p className="cuenta-ok" role="status">Pase concedido.</p>}
          <div className="revdoc-acciones">
            <button type="submit" className="btn btn--primario btn--mini" disabled={estado === 'guardando'}>
              {estado === 'guardando' ? 'Guardando…' : 'Conceder'}
            </button>
            <button type="button" className="btn btn--suave btn--mini" onClick={() => setAbierto(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
