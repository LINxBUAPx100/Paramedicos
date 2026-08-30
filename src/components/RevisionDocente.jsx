import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useValidaciones } from '../context/ContenidoContext.jsx'
import {
  ACCIONES_REVISION, ETIQUETA_ACCION, DESCRIPCION_ACCION, CHECKLIST_VALIDACION,
  puedeRevisar, puedeReportar, motivoSinRevision, paseActivo, diasRestantesPase,
  deudasDeclaradas, validarFirmaValidacion, validarDictamen, yaFirmado,
} from '../lib/revisionDocente.js'
import { sePuedeValidar } from '../lib/validacionesModelo.js'
import { estadoEditorialDe, ETIQUETA_ESTADO, estaAvalado } from '../lib/estadoEditorial.js'
import { registrar } from '../lib/registro.js'

// ============================================================
//  Barra de revisión docente — los tres botones de cada tema
// ------------------------------------------------------------
//  Validar · Corregir · Reportar, en todos los temas y en todos los nodos de
//  evaluación. Quién ve qué:
//
//    · Validar y Corregir: solo con pase de revisión vigente, o por rol
//      (super-admin, director) o por permiso editorial de publicar.
//    · Reportar: cualquiera con sesión. Un alumno que ve una imagen rota debe
//      poder decirlo, y esa vía ya existía en la app.
//
//  VALIDAR SÍ CAMBIA EL ESTADO. Antes no: firmaba un dictamen y esperaba a que
//  la coordinación lo aplicara, cosa que ninguna pantalla sabía hacer. El
//  resultado era que «Validar» no validaba. Ahora la firma se aplica en el acto
//  —el alumno deja de ver el aviso de contenido sin revisar y el tema entra en
//  el banco de examen— y el dictamen queda como rastro de quién firmó qué.
//  Corregir y Reportar siguen siendo avisos: no tocan el estado.
// ============================================================

const hoyISO = () => new Date().toISOString().slice(0, 10)

/**
 * Traduce el fallo de una firma a algo que se pueda accionar.
 *
 * Firestore contesta «Missing or insufficient permissions», que no le dice al
 * docente ni qué le falta ni a quién pedírselo. Los dos casos reales tienen
 * causa concreta: firmar sobre la plantilla global sin ser super-admin, y
 * firmar sin pertenecer a ninguna academia.
 */
function mensajeDeFallo(err, { esValidar, academiaId } = {}) {
  const bruto = err?.message || ''
  if (esValidar && /permission|insufficient|PERMISSION_DENIED/i.test(bruto)) {
    return academiaId
      ? 'Tu cuenta no tiene permiso para validar el temario de esta academia. '
        + 'Pídele al director que te conceda el pase de revisión.'
      : 'Tu cuenta no está asignada a ninguna academia, así que esta firma iría al '
        + 'temario de la plataforma y eso solo lo puede hacer el super-admin.'
  }
  return bruto || 'No se pudo enviar (revisa tu conexión).'
}

export default function RevisionDocente({ tema }) {
  const { user, perfil, rol, esSuperadmin, academiaId } = useAuth()
  const { validaciones, refrescarValidaciones } = useValidaciones()
  const [abierto, setAbierto] = useState(null) // 'validar' | 'corregir' | 'reportar' | null
  const [dictamenes, setDictamenes] = useState([])
  const [retirando, setRetirando] = useState('')
  const hoy = hoyISO()

  const puedeFirmar = puedeRevisar({ esSuperadmin, rol, perfil, hoy })
  const puedeAvisar = puedeReportar({ uid: user?.uid })
  const estadoEd = estadoEditorialDe(tema)
  const deudas = useMemo(() => deudasDeclaradas(tema?.revision), [tema])

  // Dictámenes previos de este tema: sirven para no firmar dos veces y para que
  // el revisor vea si alguien ya opinó. Si la lectura falla (reglas, red), la
  // barra sigue funcionando: no es un dato crítico.
  useEffect(() => {
    if (!user || !puedeFirmar || !tema?.id) return
    let activo = true
    ;(async () => {
      try {
        const { dictamenesDeTema } = await import('../lib/firebase/dictamenes.js')
        const lista = await dictamenesDeTema(tema.id, { academiaId })
        if (activo) setDictamenes(lista)
      } catch { /* la barra no depende de esto */ }
    })()
    return () => { activo = false }
  }, [tema?.id, user, puedeFirmar, academiaId])

  if (!user) return null

  const firmado = yaFirmado(dictamenes, { temaId: tema.id, uid: user.uid })
  const abiertos = dictamenes.filter((d) => (d.estado || 'abierto') === 'abierto')
  // Firma vigente sobre ESTE tema (la capa de validaciones, no el dictamen):
  // es lo que permite retirarla si se firmó por error.
  const validacion = validaciones?.[tema.id] || null

  // Retirar devuelve el tema a su estado propio y lo saca del banco de examen.
  // Existe porque una firma que no se puede deshacer obliga a acertar a la
  // primera, y validar 287 temas a mano no perdona errores.
  const retirar = async () => {
    setRetirando('yendo')
    try {
      const { retirarValidacionTema } = await import('../lib/firebase/validaciones.js')
      await retirarValidacionTema({ academiaId, temaId: tema.id })
      await refrescarValidaciones()
      setRetirando('')
    } catch (err) {
      setRetirando(err?.message || 'No se pudo retirar la validación.')
    }
  }

  return (
    <section className="revdoc" aria-label="Revisión del contenido">
      <div className="revdoc-cabecera">
        <span className={`revdoc-estado revdoc-estado--${estadoEd}`}>
          {ETIQUETA_ESTADO[estadoEd] || estadoEd}
        </span>
        {puedeFirmar && <PaseVigente perfil={perfil} rol={rol} hoy={hoy} />}
        {abiertos.length > 0 && puedeFirmar && (
          <span className="revdoc-cola">
            {abiertos.length} dictamen{abiertos.length === 1 ? '' : 'es'} en cola
          </span>
        )}
      </div>

      <div className="revdoc-botones">
        {ACCIONES_REVISION.map((accion) => {
          const soloDocente = accion !== 'reportar'
          const habilitado = soloDocente ? puedeFirmar : puedeAvisar
          if (soloDocente && !puedeFirmar) return null
          // Un tema vacío o detenido por la academia no se valida: no hay
          // material que avalar, y firmarlo solo lo colaría en los exámenes.
          if (accion === 'validar' && !sePuedeValidar(estadoEd)) return null
          // «Ya validado por ti» depende de que la firma SIGA puesta, no de que
          // exista un dictamen antiguo: si no, retirar una validación dejaba el
          // botón bloqueado para siempre y el tema no se podía volver a firmar.
          const yaHecho = accion === 'validar' && Boolean(validacion)
            && (validacion.uid === user.uid || firmado)
          return (
            <button
              key={accion}
              type="button"
              className={`revdoc-btn revdoc-btn--${accion}${abierto === accion ? ' es-activo' : ''}`}
              onClick={() => setAbierto((v) => (v === accion ? null : accion))}
              disabled={!habilitado || yaHecho}
              aria-expanded={abierto === accion}
              title={yaHecho ? 'Ya firmaste la validación de este tema' : DESCRIPCION_ACCION[accion]}
            >
              <Icon name={accion === 'validar' ? 'check' : accion === 'corregir' ? 'editar' : 'alerta'} size={15} />
              {yaHecho ? 'Validado por ti' : ETIQUETA_ACCION[accion]}
            </button>
          )
        })}
      </div>

      {puedeFirmar && validacion && (
        <p className="revdoc-nota revdoc-nota--firmado">
          <Icon name="check" size={14} /> Validado por {validacion.revisadoPor} el {validacion.fecha}.
          <button
            type="button"
            className="revdoc-retirar"
            onClick={retirar}
            disabled={retirando === 'yendo'}
          >
            {retirando === 'yendo' ? 'Retirando…' : 'Retirar validación'}
          </button>
        </p>
      )}
      {retirando && retirando !== 'yendo' && (
        <p className="cuenta-error" role="alert">{retirando}</p>
      )}

      {!puedeFirmar && rol === 'instructor' && (
        <p className="revdoc-nota">{motivoSinRevision({ esSuperadmin, rol, perfil, hoy })}</p>
      )}

      {abierto && (
        <FormularioDictamen
          accion={abierto}
          tema={tema}
          deudas={deudas}
          estadoEd={estadoEd}
          onCerrar={() => setAbierto(null)}
          onEnviado={(nuevo) => { setDictamenes((l) => [nuevo, ...l]); setAbierto(null) }}
        />
      )}
    </section>
  )
}

// Distintivo del pase: que el profesor vea cuánto le queda sin tener que
// preguntar, y que el super-admin vea que está revisando con pase y no por rol.
function PaseVigente({ perfil, rol, hoy }) {
  if (rol !== 'instructor' || !paseActivo(perfil, hoy)) return null
  const dias = diasRestantesPase(perfil, hoy)
  return (
    <span className={`revdoc-pase${dias != null && dias <= 3 ? ' revdoc-pase--caduca' : ''}`}>
      <Icon name="candado" size={13} /> Pase de revisión
      {dias != null && (dias === 0 ? ' · caduca hoy' : ` · ${dias} día${dias === 1 ? '' : 's'}`)}
    </span>
  )
}

function FormularioDictamen({ accion, tema, deudas, estadoEd, onCerrar, onEnviado }) {
  const { user, perfil, academiaId } = useAuth()
  const { refrescarValidaciones } = useValidaciones()
  const [comentario, setComentario] = useState('')
  const [revisadoPor, setRevisadoPor] = useState(perfil?.nombre || user?.displayName || '')
  const [fuentes, setFuentes] = useState('')
  const [checklist, setChecklist] = useState({})
  const [estado, setEstado] = useState('') // '' | 'enviando' | 'ok' | 'error'
  const [error, setError] = useState('')
  // Aviso de algo secundario que no salió, cuando lo principal SÍ salió.
  const [aviso, setAviso] = useState('')

  const esValidar = accion === 'validar'
  const listaFuentes = fuentes.split('\n').map((f) => f.trim()).filter(Boolean)

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setAviso('')

    if (esValidar) {
      const r = validarFirmaValidacion({ revision: tema.revision, revisadoPor })
      if (!r.ok) { setError(r.motivo); return }
    }

    const bruto = {
      accion,
      temaId: tema.id,
      temaTitulo: `${tema.numero} · ${tema.titulo}`,
      comentario,
      revisadoPor,
      fuentes: listaFuentes,
      checklist: esValidar ? checklist : null,
      deudasAlFirmar: esValidar ? deudas : [],
    }
    const problema = validarDictamen(bruto)
    if (problema) { setError(problema); return }

    setEstado('enviando')
    const hoy = hoyISO()
    try {
      const firma = {
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        email: user.email || '',
        academiaId,
        grupoId: perfil?.grupoId || null,
      }
      if (accion === 'reportar') {
        // Reportar reutiliza la colección `reportes`, que ya existía y que el
        // super-admin lee en su dashboard de Problemas. Cambiarla de sitio
        // habría dejado los reportes fuera de la vista que ya se consulta.
        const { crearReporte } = await import('../lib/firebase/reportes.js')
        await crearReporte({
          ...firma,
          temaId: tema.id,
          temaTitulo: bruto.temaTitulo,
          mensaje: comentario,
        })
      } else {
        // ORDEN IMPORTANTE. Validar APLICA primero y deja el rastro después:
        // si la escritura del estado falla (reglas, red), el docente lo ve en
        // el acto y no se queda un dictamen firmado prometiendo un cambio que
        // no ocurrió. El dictamen es la auditoría, no el efecto.
        if (esValidar) {
          const { validarTema } = await import('../lib/firebase/validaciones.js')
          const validacion = await validarTema({
            academiaId,
            temaId: tema.id,
            revisadoPor,
            comentario,
            fuentes: listaFuentes,
            fecha: hoy,
            uid: user.uid,
            nombre: firma.nombre,
          })
          await refrescarValidaciones({ [tema.id]: validacion })
          // El rastro NO puede tumbar la validación que ya se aplicó. Si esta
          // escritura falla, el tema está validado igualmente y decir «no se
          // pudo enviar» sería mentir: el docente reintentaría creyendo que su
          // firma no surtió efecto. Se avisa de lo que falta, no de lo hecho.
          try {
            const { crearDictamen } = await import('../lib/firebase/dictamenes.js')
            await crearDictamen({ ...bruto, ...firma, aplicadoAlFirmar: true })
          } catch (errRastro) {
            registrar('revision:dictamen', errRastro, { temaId: tema.id })
            setAviso('El tema quedó validado, pero no se pudo dejar el registro en la cola de revisión.')
          }
        } else {
          const { crearDictamen } = await import('../lib/firebase/dictamenes.js')
          await crearDictamen({ ...bruto, ...firma, aplicadoAlFirmar: false })
        }
      }
      setEstado('ok')
      setTimeout(() => onEnviado({ ...bruto, uid: user.uid, estado: 'abierto' }), 1400)
    } catch (err) {
      setEstado('error')
      setError(mensajeDeFallo(err, { esValidar, academiaId, rol: perfil?.rol }))
    }
  }

  return (
    <form className={`revdoc-form revdoc-form--${accion}`} onSubmit={enviar}>
      <p className="revdoc-form-intro">{DESCRIPCION_ACCION[accion]}</p>

      {esValidar && estaAvalado(estadoEd) && (
        <p className="revdoc-aviso" role="status">
          Este tema ya figura como {ETIQUETA_ESTADO[estadoEd].toLowerCase()}. Tu firma se suma como
          revisión adicional.
        </p>
      )}

      {esValidar && deudas.length > 0 && (
        <div className="revdoc-deudas" role="note">
          <p>
            <Icon name="alerta" size={15} /> Este tema declara {deudas.length} deuda
            {deudas.length === 1 ? '' : 's'} sin resolver:
          </p>
          <ul>{deudas.map((d, i) => <li key={i}>{d}</li>)}</ul>
          <p className="revdoc-deudas-pie">
            Puedes validarlo de todas formas: quedan anotadas en tu firma.
          </p>
        </div>
      )}

      {esValidar && (
        <fieldset className="revdoc-checklist">
          <legend>Repaso sugerido (opcional)</legend>
          {CHECKLIST_VALIDACION.map((c) => (
            <label key={c.clave} className="revdoc-check">
              <input
                type="checkbox"
                checked={checklist[c.clave] === true}
                onChange={(e) => setChecklist((v) => ({ ...v, [c.clave]: e.target.checked }))}
              />
              {c.texto}
            </label>
          ))}
        </fieldset>
      )}

      {accion !== 'reportar' && (
        <label className="revdoc-campo">
          <span>Firma (nombre o cargo)</span>
          <input
            type="text"
            value={revisadoPor}
            onChange={(e) => setRevisadoPor(e.target.value)}
            maxLength={200}
            placeholder="Dra. Ana Ruiz, coordinadora académica"
            required
          />
        </label>
      )}

      {esValidar && (
        <label className="revdoc-campo">
          <span>Fuentes con las que lo comprobaste (opcional, una por línea)</span>
          <textarea
            value={fuentes}
            onChange={(e) => setFuentes(e.target.value)}
            rows={3}
            maxLength={2000}
            placeholder={'NAEMT. PHTLS, 9.ª ed., 2020, cap. 4, p. 112.\nProtocolo interno RESCATE, v3, p. 8.'}
          />
        </label>
      )}

      <label className="revdoc-campo">
        <span>
          {accion === 'corregir'
            ? 'Qué hay que corregir, con el detalle necesario'
            : accion === 'reportar'
              ? 'Qué problema encontraste'
              : 'Observaciones para la coordinación (opcional)'}
        </span>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={accion === 'corregir' ? 6 : 3}
          maxLength={4000}
          placeholder={accion === 'corregir'
            ? 'Sección, párrafo o pregunta afectada, qué está mal, qué debe decir y con qué fuente.'
            : accion === 'reportar'
              ? 'Imagen rota, enlace caído, la página no carga…'
              : 'Cualquier matiz que la coordinación deba conocer.'}
          required={accion !== 'validar'}
        />
      </label>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {aviso && <p className="revdoc-aviso" role="status">{aviso}</p>}
      {estado === 'ok' && (
        <p className="cuenta-ok" role="status">
          {esValidar
            ? 'Tema validado. Ya se muestra a los alumnos sin aviso de revisión y entra en el banco de examen.'
            : 'Enviado. Gracias.'}
        </p>
      )}

      <div className="revdoc-acciones">
        <button type="submit" className="btn btn--primario" disabled={estado === 'enviando' || estado === 'ok'}>
          {estado === 'enviando' ? 'Enviando…' : esValidar ? 'Firmar validación' : `Enviar ${ETIQUETA_ACCION[accion].toLowerCase()}`}
        </button>
        <button type="button" className="btn btn--suave" onClick={onCerrar}>Cancelar</button>
      </div>
    </form>
  )
}
