import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { TextoTerminos } from '../pages/TerminosPage.jsx'
import { TITULO_TERMINOS, VERSION_TERMINOS } from '../data/terminos.js'

// ============================================================
//  Aceptación de los términos — la puerta del primer inicio de sesión
// ------------------------------------------------------------
//  Se cruza una vez por versión del texto. Al cambiar la versión, vuelve a
//  aparecer: quedar vinculado a un contrato que se modificó después de
//  aceptarlo no es aceptar nada.
//
//  Tres decisiones que no son estéticas:
//
//   · El texto COMPLETO está aquí dentro, en un panel con su propio
//     desplazamiento. Un enlace de «lee los términos» que te saca de la
//     pantalla y te obliga a volver es la forma más segura de que nadie los
//     lea; y aun así el enlace existe, para quien quiera la página entera o
//     imprimirla.
//   · La casilla nace VACÍA y el botón está deshabilitado hasta marcarla. Una
//     casilla premarcada no es consentimiento.
//   · Se puede CERRAR SESIÓN desde aquí. Quien no acepta tiene que poder
//     marcharse; si la única salida fuera aceptar, no sería una elección.
// ============================================================
export default function AceptarTerminos() {
  const { user, perfil, salir } = useAuth()
  const [marcada, setMarcada] = useState(false)
  const [estado, setEstado] = useState('') // '' | 'guardando' | 'error'
  const [error, setError] = useState('')

  const aceptar = async () => {
    if (!marcada) return
    setEstado('guardando')
    setError('')
    try {
      const { aceptarTerminos } = await import('../lib/firebase/auth.js')
      await aceptarTerminos(VERSION_TERMINOS)
      // No hace falta releer nada: el perfil llega por `onSnapshot`, así que en
      // cuanto Firestore confirma la escritura, la puerta se abre sola.
    } catch (err) {
      setEstado('error')
      setError(
        String(err?.code || '').includes('permission-denied')
          ? 'No se pudo guardar tu aceptación: publica las reglas actualizadas de firestore.rules.'
          : err?.message || 'No se pudo guardar tu aceptación. Revisa tu conexión.'
      )
    }
  }

  return (
    <div className="terminos-puerta" role="dialog" aria-labelledby="terminos-titulo" aria-modal="true">
      <div className="terminos-panel">
        <header className="terminos-panel-cab">
          <span className="terminos-eyebrow">Antes de entrar</span>
          <h1 id="terminos-titulo">{TITULO_TERMINOS}</h1>
          <p>
            {perfil?.nombre || user?.displayName
              ? `${perfil?.nombre || user.displayName}, para`
              : 'Para'}{' '}
            usar PTEM necesitas leer y aceptar estos términos. Se te volverán a mostrar solo si
            cambian.
          </p>
        </header>

        <div className="terminos-scroll" tabIndex={0} aria-label="Texto de los términos y condiciones">
          <TextoTerminos />
        </div>

        <div className="terminos-acciones">
          <label className="terminos-check">
            <input
              type="checkbox"
              checked={marcada}
              onChange={(e) => setMarcada(e.target.checked)}
              disabled={estado === 'guardando'}
            />
            <span>
              He leído y acepto los términos y condiciones de uso de la plataforma PTEM / T-Tem
              (versión {VERSION_TERMINOS}).
            </span>
          </label>

          {error && <p className="cuenta-error" role="alert">{error}</p>}

          <div className="terminos-botones">
            <button
              type="button"
              className="btn btn--pildora btn--carbon"
              onClick={aceptar}
              disabled={!marcada || estado === 'guardando'}
            >
              {estado === 'guardando' ? 'Guardando…' : 'Aceptar y entrar'}
            </button>
            <Link to="/terminos-y-condiciones" className="link-discreto" target="_blank" rel="noopener">
              Abrir en una página aparte
            </Link>
            <button type="button" className="terminos-salir" onClick={salir}>
              <Icon name="usuario" size={14} /> No acepto, cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
