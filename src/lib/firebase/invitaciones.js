// ============================================================
//  Invitaciones POR ROL — colección `invitaciones`
// ------------------------------------------------------------
//  El ID del doc ES el código (INV-AEP-P-K3M9). A diferencia del código de
//  academia y del de grupo —que son el id de la academia o del grupo, uno solo
//  y para todo el mundo—, aquí se pueden emitir tantas como haga falta y cada
//  una lleva un ROL dentro: al canjearla, la persona entra ya como alumno,
//  profesor o director, sin que el director tenga que promoverla después.
//
//  El catálogo de roles y las reglas de vigencia viven en
//  `src/lib/invitacionesModelo.js` (puro y probado); aquí solo va Firestore.
//
//  Quién puede qué lo impone firestore.rules, no este archivo:
//    · crear/desactivar/borrar → super-admin o el DIRECTOR de esa academia,
//    · canjear                 → cualquiera que tenga el código,
//    · rol 'superadmin'        → jamás, por ninguna vía.
// ============================================================
import { db } from './init.js'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where,
  getDocs, serverTimestamp, Timestamp, increment,
} from 'firebase/firestore'
import {
  esRolInvitable, etiquetaRol, generarCodigoInvitacion, maxUsosPorDefecto,
  motivoNoCanjeable,
} from '../invitacionesModelo.js'

// Crea una invitación de la academia para un rol concreto, opcionalmente ligada
// a un GRUPO (al canjearla, la persona queda también integrada en él).
// Devuelve { id, expira, rol, maxUsos }.
export async function crearInvitacion({
  creadoPor, academiaId, rol, grupoId = null, dias = 14, maxUsos = null, nota = '',
}) {
  if (!academiaId) throw new Error('La invitación necesita una academia.')
  if (!esRolInvitable(rol)) throw new Error('Elige para qué rol es la invitación.')
  const tope = maxUsos === null || maxUsos === undefined ? maxUsosPorDefecto(rol) : Number(maxUsos)
  if (!Number.isInteger(tope) || tope < 0) throw new Error('El número de usos no es válido.')

  const expira = Timestamp.fromDate(new Date(Date.now() + dias * 24 * 60 * 60 * 1000))
  // Reintenta si el código generado ya existe (colisión improbable).
  for (let intento = 0; intento < 5; intento++) {
    const id = generarCodigoInvitacion({ academiaId, rol })
    const ref = doc(db, 'invitaciones', id)
    if ((await getDoc(ref)).exists()) continue
    await setDoc(ref, {
      academiaId,
      grupoId: grupoId || null,
      rol,
      creadoPor,
      nota: nota || '',
      estado: 'activo',
      dias,
      usos: 0,
      maxUsos: tope,
      creado: serverTimestamp(),
      expira,
    })
    // Auditoría: repartir el rol de DIRECTOR por enlace es una decisión que hay
    // que poder reconstruir después. Best-effort: no tumba la creación.
    try {
      const { registrarHistorial } = await import('./contenido.js')
      await registrarHistorial({
        academiaId,
        accion: 'crear-invitacion',
        coleccion: 'invitaciones',
        docId: id,
        antes: null,
        despues: { rol, grupoId: grupoId || null, maxUsos: tope, dias },
        origen: 'panel',
      })
    } catch { /* la auditoría no bloquea la operación principal */ }
    return { id, expira, rol, maxUsos: tope }
  }
  throw new Error('No se pudo generar un código único. Intenta de nuevo.')
}

// Invitaciones de una academia, más recientes primero. El filtro por academiaId
// es el que la regla `list` necesita para poder evaluarse: sin él, Firestore
// deniega la consulta entera (misma lección que `listarCodigos`).
/**
 * Invitaciones de una academia. `filtro` acota lo que se pide:
 *
 *   · director/super  → { academiaId }            (todas)
 *   · profesor        → { academiaId, creadoPor } (solo las suyas)
 *
 * El filtro NO es cosmético: las reglas exigen que TODOS los documentos que
 * devuelve la consulta sean legibles, así que un profesor que pidiera la lista
 * entera se llevaría un rechazo completo. `filtroDeInvitaciones`
 * (invitacionesCentro.js) construye el filtro que toca a cada quien.
 */
export async function listarInvitaciones(academiaId, filtro = null) {
  if (!academiaId) return []
  const condiciones = [where('academiaId', '==', academiaId)]
  if (filtro?.creadoPor) {
    // Mismo par que exige la regla: sus invitaciones, y solo las de alumno.
    condiciones.push(where('rol', '==', 'alumno'))
    condiciones.push(where('creadoPor', '==', filtro.creadoPor))
  }
  const q = query(collection(db, 'invitaciones'), ...condiciones)
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.creado?.seconds || 0) - (a.creado?.seconds || 0))
}

export async function alternarInvitacion(id, estado) {
  await updateDoc(doc(db, 'invitaciones', id), { estado })
}

export async function borrarInvitacion(id) {
  await deleteDoc(doc(db, 'invitaciones', id))
}

// Canjea una invitación sobre el perfil del usuario: lo mete en la academia
// (y en el grupo, si la invitación lo lleva) CON EL ROL de la invitación.
//
//  · `invitacionUsada` queda escrito en el perfil porque es lo que las reglas
//    leen para autorizar el cambio de rol: sin ese campo no sabrían con qué
//    invitación se justifica, y el rol es el único campo que el propio usuario
//    no puede tocar por su cuenta.
//  · `esPrueba: false` porque esto es un alta REAL, no un acceso temporal.
//
// Lanza 'No existe una invitación con ese código.' cuando el código no es de
// este tipo: esa frase es la que hace avanzar la cascada de `canjear.js`.
export async function canjearInvitacion(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  const snap = await getDoc(doc(db, 'invitaciones', cod))
  if (!snap.exists()) throw new Error('No existe una invitación con ese código.')
  const inv = snap.data()

  const motivo = motivoNoCanjeable(inv)
  if (motivo) throw new Error(motivo)

  const aca = await getDoc(doc(db, 'academias', inv.academiaId))
  if (!aca.exists() || aca.data().estado !== 'activo') {
    throw new Error('La academia de esa invitación no está activa.')
  }

  let grupo = null
  if (inv.grupoId) {
    const g = await getDoc(doc(db, 'grupos', inv.grupoId))
    if (!g.exists() || g.data().estado !== 'activo' || g.data().academiaId !== inv.academiaId) {
      throw new Error('El grupo de esa invitación ya no está disponible. Pide una nueva.')
    }
    grupo = { id: inv.grupoId, ...g.data() }
  }

  // La ficha que capturó RECEPCIÓN, si esta invitación viene de un alta suya.
  // El perfil no existía cuando se tomaron los datos, así que viajaban dentro
  // de la invitación; aquí es donde aterrizan.
  //
  // Se escriben solo si vienen: una invitación normal —un enlace por rol— no
  // trae ficha, y sobrescribir con vacío borraría el nombre que la persona
  // acababa de poner al registrarse.
  const deRecepcion = {}
  if (inv.matricula) deRecepcion.matricula = inv.matricula
  if (inv.telefono) deRecepcion.telefono = inv.telefono
  if (inv.nombre) deRecepcion.nombre = inv.nombre

  await updateDoc(doc(db, 'usuarios', uid), {
    academiaId: inv.academiaId,
    grupoId: inv.grupoId || null,
    rol: inv.rol,
    esPrueba: false,
    invitacionUsada: cod,
    ...deRecepcion,
  })

  // Contador de usos. Va DESPUÉS del alta y es best-effort: si falla, la
  // persona ya entró y no tiene sentido dejarla fuera por el contador.
  //
  // OJO con lo que este contador garantiza y lo que no: lo escribe el propio
  // invitado desde su navegador, así que quien tenga el código y mala fe puede
  // saltarse el incremento y reutilizarlo. `maxUsos` sirve para que un enlace
  // repartido de buena fe no se quede abierto para siempre; lo que SÍ se
  // sostiene contra un actor hostil es la caducidad y el «Desactivar», que solo
  // el director escribe.
  try {
    await updateDoc(doc(db, 'invitaciones', cod), {
      usos: increment(1),
      ultimoUso: serverTimestamp(),
    })
  } catch { /* el contador no bloquea el alta */ }

  return {
    id: cod,
    ...inv,
    rolEtiqueta: etiquetaRol(inv.rol),
    academia: { id: inv.academiaId, ...aca.data() },
    grupo,
  }
}
