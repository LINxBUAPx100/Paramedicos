import { Navigate } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import InvitacionesRol from '../../components/panel/InvitacionesRol.jsx'
import CodigosPrueba from '../../components/panel/CodigosPrueba.jsx'
import AccesoCodigos from '../../components/panel/AccesoCodigos.jsx'
import Icon from '../../components/Icon.jsx'
import { rolesQuePuedeInvitar, puedeCrearCodigoPrueba } from '../../lib/invitacionesCentro.js'

// ============================================================
//  Panel · CENTRO DE INVITACIONES
// ------------------------------------------------------------
//  La academia repartía acceso por cinco puertas y cada una vivía en otra
//  pantalla: el código de la academia y el de cada grupo (en Accesos y en
//  Grupos), la invitación por rol (aquí), el código de prueba (en Accesos) y la
//  solicitud del directorio. Nadie sabía cuál usar, porque ninguna cubría los
//  dos ejes que de verdad importan: A DÓNDE entra alguien (academia, grupo, y
//  con el grupo su programa) y COMO QUÉ entra (alumno, profesor o director;
//  permanente o de prueba).
//
//  Ahora todo lo que se EMITE está aquí, en el mismo orden en que se decide:
//    1. Códigos permanentes  — los de siempre: academia y grupo. No caducan.
//    2. Invitaciones por rol — enlace con rol, grupo, caducidad y tope de usos.
//    3. Códigos de prueba    — acceso temporal sin inscribir a nadie.
//
//  Lo que NO se emite —las solicitudes de dentro y las del directorio— se queda
//  en Accesos: ahí no generas nada, respondes a alguien.
//
//  Quién ve qué lo decide `invitacionesCentro.js` y lo impone firestore.rules:
//  el profesor con el permiso de códigos aprobado invita ALUMNOS y ve solo lo
//  que él emitió; los códigos de prueba y el reparto de roles siguen siendo del
//  director.
// ============================================================
export default function PanelInvitaciones() {
  const {
    academiaId, academiaNombre, grupos, miUid, gestion, quienEmite,
  } = usePanel()

  const rolesPosibles = rolesQuePuedeInvitar(quienEmite || {})
  const puedePrueba = puedeCrearCodigoPrueba(quienEmite || {})

  // Un profesor sin el permiso aprobado no emite nada: la sección ni siquiera
  // aparece en su menú, pero podría teclear la ruta.
  if (!gestion && rolesPosibles.length === 0) return <Navigate to="/panel" replace />

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Invitaciones</h1>
        <p>
          Todo lo que reparte acceso, en un solo sitio. Elige según lo que necesites: un código
          permanente para pegar en el grupo de la clase, una invitación con caducidad para dar de
          alta a alguien concreto, o un acceso de prueba para quien todavía no se ha inscrito.
        </p>
      </header>

      {/* Guía de decisión: es lo que faltaba. La confusión no venía de que
          hubiera varias puertas, sino de que ninguna decía cuándo usarla. */}
      <div className="inv-guia">
        <article>
          <span className="inv-guia-ico"><Icon name="llave" size={18} /></span>
          <div>
            <strong>Código permanente</strong>
            <p>El de la academia o el de un grupo. No caduca ni se agota: sirve para repartirlo en clase.</p>
          </div>
        </article>
        <article>
          <span className="inv-guia-ico"><Icon name="usuario" size={18} /></span>
          <div>
            <strong>Invitación por rol</strong>
            <p>Entra ya como alumno, profesor o director, y al grupo que elijas. Caduca y tiene tope de usos.</p>
          </div>
        </article>
        <article>
          <span className="inv-guia-ico"><Icon name="reloj" size={18} /></span>
          <div>
            <strong>Acceso de prueba</strong>
            <p>Deja entrar unos días sin inscribir a nadie. Para quien quiere ver la plataforma antes de decidir.</p>
          </div>
        </article>
      </div>

      {/* 1. Códigos permanentes. El director los ve siempre; el profesor, solo
          con el permiso aprobado (el propio componente lo resuelve). */}
      <AccesoCodigos academiaId={academiaId} academiaNombre={academiaNombre} grupos={grupos} />

      {/* 2. Invitaciones por rol, acotadas a lo que esta persona puede repartir. */}
      <InvitacionesRol
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        miUid={miUid}
        grupos={grupos}
        quienEmite={quienEmite}
      />

      {/* 3. Códigos de prueba: dan acceso sin inscribir, así que siguen siendo
          decisión de la academia y no del aula. */}
      {puedePrueba && (
        <CodigosPrueba
          academiaId={academiaId}
          academiaNombre={academiaNombre}
          miUid={miUid}
          grupos={grupos}
        />
      )}
    </div>
  )
}
