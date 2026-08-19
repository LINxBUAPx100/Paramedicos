import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { registrar } from '../lib/registro.js'
import { codigoInvitacionActual, limpiarCodigoInvitacion } from '../lib/codigoInvitacion.js'
import { mensajeDeError } from '../lib/mensajeError.js'
import Icon from '../components/Icon.jsx'

// ============================================================
//  Bienvenida — con cuenta, todavía sin academia
// ------------------------------------------------------------
//  Este estado existía en los datos pero NO en el producto: quien se
//  registraba sin código veía el Home completo (carrusel de módulos, atlas,
//  flashcards) y cada enlace lo mandaba a «Únete a tu academia», una pantalla
//  que le decía lo que le faltaba sin darle forma de conseguirlo.
//
//  Aquí tiene las dos vías reales y el estado de lo que ya pidió.
// ============================================================

const ETIQUETA_ESTADO = {
  pendiente: { texto: 'En espera de respuesta', tono: 'espera' },
  aceptada: { texto: 'Aceptada', tono: 'ok' },
  rechazada: { texto: 'No aceptada', tono: 'no' },
}

export default function Bienvenida() {
  const { user, perfil } = useAuth()
  // Prellenado con el código del enlace de invitación. Esta pantalla es donde
  // aterriza cualquiera con cuenta y sin academia, así que era justo la que
  // dejaba el campo vacío y obligaba a copiar el código a mano.
  const [codigo, setCodigo] = useState(codigoInvitacionActual)
  // Qué código traía el enlace (para explicarle de dónde salió lo que ve
  // escrito). No se recalcula: si lo corrige a mano, el aviso sigue contando la
  // verdad de cómo llegó.
  const [deEnlace] = useState(codigoInvitacionActual)
  const [ocupado, setOcupado] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  const [directorio, setDirectorio] = useState(null) // null = cargando
  const [solicitudes, setSolicitudes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [recargar, setRecargar] = useState(0)

  useEffect(() => {
    if (!user) return undefined
    let vivo = true
    ;(async () => {
      try {
        const api = await import('../lib/firebase/directorio.js')
        const [dir, mias] = await Promise.all([
          api.listarDirectorio(),
          api.misSolicitudesAcceso(user.uid),
        ])
        if (!vivo) return
        setDirectorio(dir)
        setSolicitudes(mias)
      } catch (err) {
        if (!vivo) return
        // El directorio es opcional: si falla, la vía del código sigue viva.
        registrar('directorio:cargar', err, { uid: user.uid })
        setDirectorio([])
      }
    })()
    return () => { vivo = false }
  }, [user, recargar])

  const porAcademia = useMemo(
    () => Object.fromEntries(solicitudes.map((s) => [s.academiaId, s])),
    [solicitudes]
  )

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    const lista = directorio || []
    if (!q) return lista
    return lista.filter(
      (a) => a.nombre?.toLowerCase().includes(q) || a.descripcion?.toLowerCase().includes(q)
    )
  }, [directorio, busqueda])

  const correr = async (fn, exito) => {
    setMsg(''); setError(''); setOcupado(true)
    try {
      await fn()
      if (exito) setMsg(exito)
      setRecargar((n) => n + 1)
    } catch (err) {
      // Traducido: aquí se mostraba el texto del SDK en inglés («Missing or
      // insufficient permissions.»), que no dice a nadie qué hacer.
      setError(mensajeDeError(err))
    } finally {
      setOcupado(false)
    }
  }

  const usarCodigo = (e) => {
    e.preventDefault()
    correr(async () => {
      const { canjearCualquierCodigo } = await import('../lib/firebase/canjear.js')
      const r = await canjearCualquierCodigo(user.uid, codigo)
      setCodigo('')
      limpiarCodigoInvitacion() // ya se usó: que no vuelva a proponerse
      setMsg(r.mensaje)
    })
  }

  const solicitar = (aca) =>
    correr(async () => {
      const { crearSolicitudAcceso } = await import('../lib/firebase/directorio.js')
      await crearSolicitudAcceso({
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        email: user.email || '',
        academiaId: aca.academiaId,
      })
    }, `Solicitud enviada a ${aca.nombre}. Te avisaremos cuando respondan.`)

  const cancelar = (sol) =>
    correr(async () => {
      const { cancelarSolicitudAcceso } = await import('../lib/firebase/directorio.js')
      await cancelarSolicitudAcceso(sol.id)
    }, 'Solicitud retirada.')

  // Último paso del alta por aprobación, que ejecuta el propio interesado.
  const entrar = (sol) =>
    correr(async () => {
      const { aplicarSolicitudAceptada } = await import('../lib/firebase/directorio.js')
      await aplicarSolicitudAceptada(user.uid, sol.academiaId)
    }, '¡Listo! Ya tienes acceso al contenido de tu academia.')

  const aceptadas = solicitudes.filter((s) => s.estado === 'aceptada')

  return (
    <div className="bv">
      <header className="bv-cabecera">
        <span className="bv-ico"><Icon name="usuario" size={26} /></span>
        <div>
          <h1>Ya casi{perfil?.nombre ? `, ${perfil.nombre.split(' ')[0]}` : ''}</h1>
          <p>
            Tu cuenta está creada. Solo falta vincularla con tu academia para abrir el temario.
          </p>
        </div>
      </header>

      {aceptadas.length > 0 && (
        <section className="bv-aceptadas" role="status">
          {aceptadas.map((s) => (
            <div key={s.id} className="bv-aceptada">
              <span className="bv-aceptada-ico"><Icon name="check" size={20} /></span>
              <div>
                <strong>Te aceptaron en {nombreDe(directorio, s.academiaId)}</strong>
                <p>Pulsa para terminar de entrar.</p>
              </div>
              <button className="btn btn--pildora btn--carbon" disabled={ocupado} onClick={() => entrar(s)}>
                Entrar
              </button>
            </div>
          ))}
        </section>
      )}

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {msg && <p className="cuenta-ok" role="status">{msg}</p>}

      <div className="bv-vias">
        {/* --- Vía 1: código --- */}
        <section className="bv-via">
          <h2><Icon name="pildora" size={18} /> Tengo un código</h2>
          <p className="bv-ayuda">
            Es el código que te dio tu academia al inscribirte. Sirve el de la academia, el de
            tu grupo, una invitación personal (empieza por <code>INV-</code>) o uno de prueba
            temporal.
          </p>
          {deEnlace && (
            <p className="cuenta-invitacion-nota" role="status">
              Te invitaron con el código <code>{deEnlace}</code>: ya está escrito abajo.
              Pulsa «Activar» (o corrígelo si te dieron otro).
            </p>
          )}
          <form className="bv-form" onSubmit={usarCodigo}>
            <label className="sr-only" htmlFor="bv-codigo">Código de acceso</label>
            <input
              id="bv-codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="AEP-2026"
              autoComplete="off"
              spellCheck="false"
            />
            <button className="btn btn--primario" type="submit" disabled={ocupado || !codigo.trim()}>
              {ocupado ? 'Comprobando…' : 'Activar'}
            </button>
          </form>
          <p className="bv-nota">
            ¿No lo tienes? Pídeselo a tu instructor o a la administración de tu escuela.
          </p>
        </section>

        {/* --- Vía 2: directorio --- */}
        <section className="bv-via">
          <h2><Icon name="buscar" size={18} /> Buscar mi academia</h2>
          <p className="bv-ayuda">
            Estas academias aceptan solicitudes desde aquí. Envía la tuya y su director decide.
          </p>

          {directorio === null ? (
            <div className="esqueleto" role="status" aria-busy="true">
              <span className="sr-only">Cargando el directorio…</span>
              <span className="esq-linea" aria-hidden="true" />
              <span className="esq-linea esq-linea--media" aria-hidden="true" />
            </div>
          ) : directorio.length === 0 ? (
            <p className="bv-vacio">
              Por ahora ninguna academia acepta solicitudes por aquí. Usa tu código.
            </p>
          ) : (
            <>
              <input
                type="search"
                className="bv-buscar"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre…"
                aria-label="Buscar academia por nombre"
              />
              <ul className="bv-lista">
                {visibles.map((a) => {
                  const sol = porAcademia[a.academiaId]
                  const estado = sol ? ETIQUETA_ESTADO[sol.estado] : null
                  return (
                    <li key={a.academiaId} className="bv-aca">
                      <div className="bv-aca-info">
                        <strong>{a.nombre}</strong>
                        {a.descripcion && <p>{a.descripcion}</p>}
                        {sol && (
                          <span className={`bv-estado bv-estado--${estado.tono}`}>
                            {estado.texto}
                            {sol.estado === 'rechazada' && sol.motivo ? ` · ${sol.motivo}` : ''}
                          </span>
                        )}
                      </div>
                      {!sol && (
                        <button
                          className="btn btn--sm btn--suave"
                          disabled={ocupado}
                          onClick={() => solicitar(a)}
                        >
                          Solicitar acceso
                        </button>
                      )}
                      {sol?.estado === 'pendiente' && (
                        <button
                          className="btn btn--sm btn--fantasma"
                          disabled={ocupado}
                          onClick={() => cancelar(sol)}
                        >
                          Retirar
                        </button>
                      )}
                      {sol?.estado === 'rechazada' && (
                        <button
                          className="btn btn--sm btn--fantasma"
                          disabled={ocupado}
                          onClick={() => cancelar(sol)}
                          title="Puedes volver a solicitarlo después de retirarla"
                        >
                          Descartar
                        </button>
                      )}
                    </li>
                  )
                })}
                {visibles.length === 0 && (
                  <li className="bv-vacio">Ninguna academia coincide con «{busqueda}».</li>
                )}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

function nombreDe(directorio, academiaId) {
  return (directorio || []).find((a) => a.academiaId === academiaId)?.nombre || academiaId
}
