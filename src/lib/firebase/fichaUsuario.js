// ============================================================
//  La ficha de una persona — leer, guardar y restablecer contraseña
// ------------------------------------------------------------
//  UNA sola puerta para las tres consolas (mostrador, panel del director y
//  consola del super-admin). Quién puede qué lo decide `lib/fichaUsuario.js` y
//  lo impone `firestore.rules`; aquí solo se escribe lo que ya se aprobó.
//
//  NO IMPORTA `lib/firebase/admin.js`, aunque allí ya exista un
//  `enviarResetPassword`: ese módulo arrastra el borrado en cascada de
//  academias, la facturación y el resto de la consola de plataforma, y esta
//  ficha la abre también una recepcionista desde el mostrador. Lo que se
//  necesita es una línea del SDK de Auth; duplicarla cuesta menos que meter
//  la consola entera en el paquete de recepción.
// ============================================================
import { auth, db } from './init.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { registrarSinRomper } from './staff/auditoria.js'
import { cambiosDeFicha, parcheDeFicha, problemasDeFicha } from '../fichaUsuario.js'

/** La ficha fresca de una persona. Se relee tras cada cambio. */
export async function leerFicha(uid) {
  if (!uid) return null
  const snap = await getDoc(doc(db, 'usuarios', uid))
  return snap.exists() ? { uid: snap.id, id: snap.id, ...snap.data() } : null
}

/** Su grupo, para poder enseñar el nombre y no el id. */
export async function leerGrupo(grupoId) {
  if (!grupoId) return null
  const snap = await getDoc(doc(db, 'grupos', grupoId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/**
 * Guarda los cambios Y su rastro, en ese orden.
 *
 * El orden importa, por el mismo criterio que el resto del proyecto: si falla
 * el historial, el dato queda guardado sin rastro —molesto pero recuperable—;
 * al revés quedaría un rastro de un cambio que no ocurrió, que es peor porque
 * se cree.
 *
 * El rastro NO se traga el error: se devuelve `auditado: false` y la ficha lo
 * dice. Una auditoría que falla en silencio es la peor de las tres opciones.
 *
 * @returns {{cambios: Array, auditado: boolean, persona: object}}
 */
export async function guardarFichaUsuario({ persona, valores, permisos, academiaId }) {
  const fallos = problemasDeFicha(valores, permisos)
  if (fallos.length) throw new Error(fallos.join(' '))

  const cambios = cambiosDeFicha(persona, valores, permisos)
  if (!cambios.length) return { cambios: [], auditado: true, persona }

  const parche = parcheDeFicha(persona, valores, permisos)
  const uid = persona?.uid || persona?.id
  if (!uid) throw new Error('Esta persona todavía no tiene cuenta: no hay ficha que editar.')

  await updateDoc(doc(db, 'usuarios', uid), parche)

  const antes = {}
  const despues = {}
  for (const c of cambios) { antes[c.campo] = c.antes; despues[c.campo] = c.despues }

  const auditado = await registrarSinRomper({
    // La academia del RASTRO es la de la persona editada, no la de quien
    // edita: el super-admin no tiene academia, y un historial escrito bajo
    // `null` no lo lee después ningún director.
    academiaId: persona?.academiaId || academiaId || null,
    accion: 'editar-persona',
    coleccion: 'usuarios',
    docId: uid,
    antes: { ...antes, _nombre: String(persona?.nombre || '').trim() },
    despues,
  })

  return { cambios, auditado, persona: { ...persona, ...parche } }
}

/**
 * Manda el correo oficial de Firebase para elegir una contraseña nueva.
 *
 * LO QUE HACE Y LO QUE NO: dispara un correo con un enlace. No cambia ninguna
 * contraseña, no devuelve ninguna, y quien lo pulsa no llega a verla nunca.
 * Esa es toda la gracia — que nadie del personal tenga que conocer la
 * contraseña de otra persona para ayudarla a entrar.
 *
 * `auth/user-not-found` se traduce en vez de propagarse: significa que ese
 * correo no tiene cuenta de Auth (una preinscripción que nunca se activó), y
 * el mensaje crudo de Firebase no lo explica. Con la protección contra
 * enumeración de correos activada, Firebase ni siquiera lo distingue y
 * responde bien: por eso el aviso de la pantalla dice «se envió si esa
 * dirección tiene cuenta» y no «listo, ya le llegó».
 */
export async function enviarResetDeContrasena({ persona, permisos, academiaId }) {
  if (!permisos?.puedeContrasena) {
    throw new Error('Tu cuenta no puede gestionar contraseñas.')
  }
  const email = String(persona?.email || '').trim()
  if (!email) throw new Error('Esa persona no tiene correo registrado.')

  const { sendPasswordResetEmail } = await import('firebase/auth')
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (err) {
    if (err?.code === 'auth/user-not-found') {
      throw new Error('Ese correo no tiene cuenta todavía: la persona no ha activado su acceso. Reenvíale su invitación en vez de restablecer.')
    }
    if (err?.code === 'auth/invalid-email') throw new Error('El correo registrado no es válido. Corrígelo antes de enviar.')
    if (err?.code === 'auth/too-many-requests') throw new Error('Se han pedido demasiados envíos seguidos. Espera unos minutos.')
    throw err
  }

  // El rastro guarda el CORREO y no la contraseña, porque contraseña no hay:
  // lo que queda registrado es que alguien del personal disparó el enlace.
  const auditado = await registrarSinRomper({
    academiaId: persona?.academiaId || academiaId || null,
    accion: 'reset-contrasena',
    coleccion: 'usuarios',
    docId: persona?.uid || persona?.id || null,
    despues: { email, _nombre: String(persona?.nombre || '').trim() },
  })

  return { email, auditado }
}
