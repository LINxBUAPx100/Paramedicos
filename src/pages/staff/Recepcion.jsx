import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon.jsx'
import StaffShell from '../../components/staff/StaffShell.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

// ============================================================
//  /recepcion — el HOME del personal de mostrador
// ------------------------------------------------------------
//  Es una pantalla distinta, no una sección del panel del director, y eso es
//  deliberado: quien atiende un mostrador no navega por un menú de nueve
//  secciones, entra y teclea una matrícula.
//
//  QUIÉN ENTRA, y por qué estos tres:
//
//   · `recepcion`      — su pantalla. No tiene ninguna otra.
//   · `admin_escuela`  — el director cubre el mostrador cuando hace falta, y
//                        las reglas ya le permitían todo lo que se hace aquí.
//   · `superadmin`     — paridad de consola: es lo que exige
//                        `tests/paridadSuperAdmin.test.mjs` para cualquier
//                        pantalla de academia.
//
//  UN PROFESOR NO ENTRA. No es un descuido: cobrar y editar fichas no es su
//  trabajo, y las reglas de `pagos` tampoco se lo permiten.
//
//  LA PUERTA SE COMPRUEBA AQUÍ ADEMÁS DE EN LAS REGLAS. La ruta se puede
//  teclear, así que esconder el enlace no es una protección; la protección real
//  está en `firestore.rules` (`esRecepcionDe`), y esto es para que quien no
//  deba estar vea una explicación en vez de una pantalla rota.
// ============================================================
const ROLES_CON_ACCESO = ['recepcion', 'admin_escuela', 'superadmin']

export default function RecepcionPage() {
  const { autenticado, cargando, rol, academiaId, academia, user, esSuperadmin, encender } = useAuth()

  // Detrás de esta puerta está todo lo que depende de quién eres, así que aquí
  // se enciende Firebase sin esperar a la sonda de sesión. Mismo criterio que
  // `RutaProtegida`.
  useEffect(() => { encender() }, [encender])

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status" aria-live="polite">
        <span className="ruta-spinner" aria-hidden="true" />
        <span>Cargando…</span>
      </div>
    )
  }

  if (!autenticado) return <Puerta titulo="No has iniciado sesión" texto="Entra con la cuenta que te dio tu academia." />

  if (!ROLES_CON_ACCESO.includes(rol) && !esSuperadmin) {
    return (
      <Puerta
        titulo="Esta pantalla es de recepción"
        texto="Tu cuenta no tiene el rol de recepción. Si crees que debería tenerlo, pídeselo a la dirección de tu academia."
      />
    )
  }

  if (!academiaId && !esSuperadmin) {
    return (
      <Puerta
        titulo="Tu cuenta no está en ninguna academia"
        texto="Recepción trabaja siempre dentro de una academia. Pide a la dirección que te asigne la tuya."
      />
    )
  }

  return (
    <div className="staff-pagina">
      <header className="ui-cabecera staff-cabecera">
        <p className="ui-antetitulo">Recepción</p>
        <h1>{academia?.nombre || academiaId}</h1>
        <p>
          Busca a la persona, regístrale la entrada, cóbrale, entrégale su material y mándale su
          mensaje. Sin papel.
        </p>
      </header>

      <StaffShell
        academiaId={academiaId}
        academia={academia}
        miUid={user?.uid || null}
        // Corregir el concepto de un pago YA REGISTRADO es de dirección, no de
        // mostrador: quien se equivoca al teclearlo no se corrige a sí mismo
        // sin que nadie lo vea. El director y el super-admin cubren este
        // mostrador y entran por esta misma ruta, así que aquí sí lo tienen.
        puedeCorregirPagos={rol === 'admin_escuela' || esSuperadmin}
      />
    </div>
  )
}

function Puerta({ titulo, texto }) {
  return (
    <div className="ui-estado staff-puerta">
      <Icon name="candado" size={28} />
      <h2>{titulo}</h2>
      <p>{texto}</p>
      <Link className="btn btn--primario" to="/cuenta">Ir a mi cuenta</Link>
    </div>
  )
}
