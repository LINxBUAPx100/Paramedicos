// ============================================================
//  Alta de recepción — la escritura, en el orden que la hace segura
// ------------------------------------------------------------
//  Un alta de recepción toca tres cosas: reserva una matrícula, crea la
//  invitación personal que la persona usará para entrar, y registra el primer
//  pago si lo hubo. No es una transacción única —viven en colecciones
//  distintas— así que el ORDEN importa, y está elegido para que un fallo a
//  medias deje siempre el lado inofensivo:
//
//   1. **La matrícula.** Es lo único irreversible: el contador sube y ese
//      número ya no se reparte. Si falla, no se ha creado nada.
//   2. **La invitación.** Si falla aquí, se ha gastado un número de matrícula y
//      nada más. Un hueco en la numeración no rompe nada; una invitación sin
//      matrícula sí dejaría a alguien entrando sin número.
//   3. **El pago.** Va al final porque es lo único que se puede rehacer a mano
//      sin consecuencias: si falla, la persona está dada de alta y el cobro se
//      vuelve a registrar. Al revés —cobro registrado y alta perdida— habría
//      dinero apuntado a nadie.
//
//  QUIÉN PUEDE. Hoy, el director y el super-admin: son los que las reglas ya
//  dejan crear invitaciones y mover el contador. El rol `recepcion` es un
//  trabajo aparte y tiene su propia advertencia en el plan —meterlo dentro de
//  `esStaffDe()` le regalaría el temario completo—, así que esta pantalla
//  funciona desde el primer día con quien ya tiene permiso.
// ============================================================
import { db } from './init.js'
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { reservarMatricula } from './matriculas.js'
import { altaParaGuardar, pagoParaGuardar, problemasDelAlta, problemasDelPago } from '../recepcionModelo.js'
import { generarCodigoInvitacion } from '../invitacionesModelo.js'

const DIAS_VIGENCIA = 30

/**
 * Da de alta a alguien desde recepción.
 *
 * @returns {{matricula: string, codigo: string, alta: object}}
 *   `codigo` es el de la invitación personal: con él se arma el enlace de
 *   bienvenida.
 */
export async function altaDeRecepcion({ alta, pago = null, academiaId, creadoPor }) {
  if (!academiaId) throw new Error('Falta la academia.')

  // Se valida ANTES de reservar nada: un número de matrícula gastado por un
  // formulario incompleto es un hueco en la numeración que ya no se recupera.
  const fallos = [...problemasDelAlta(alta), ...problemasDelPago(pago)]
  if (fallos.length) throw new Error(fallos.join(' '))

  // 1. La matrícula. Irreversible, así que va primero y sola.
  const matricula = await reservarMatricula(academiaId)
  const datos = altaParaGuardar(alta, { academiaId, matricula, creadoPor })

  // 2. La invitación personal: un solo uso, con la ficha dentro. Al canjearla,
  //    el perfil nace con su nombre, su teléfono, su grupo y su matrícula.
  const codigo = await crearInvitacionDeAlta({ datos, creadoPor })

  // 3. El pago, si lo hubo.
  if (pago && !pago.sinPago) {
    await addDoc(collection(db, 'pagos'), {
      ...pagoParaGuardar(pago, { academiaId, matricula, registradoPor: creadoPor }),
      creado: serverTimestamp(),
    })
  }

  return { matricula, codigo, alta: datos }
}

async function crearInvitacionDeAlta({ datos, creadoPor }) {
  const expira = new Date(Date.now() + DIAS_VIGENCIA * 24 * 60 * 60 * 1000)
  for (let intento = 0; intento < 5; intento += 1) {
    const codigo = generarCodigoInvitacion({ academiaId: datos.academiaId, rol: 'alumno' })
    const ref = doc(db, 'invitaciones', codigo)
    // `setDoc` sin comprobar existencia previa sería sobrescribir la invitación
    // de otra persona si el código coincidiera. Se comprueba, y si choca se
    // genera otro: la colisión es improbable, pisar un alta ajena no es
    // aceptable ni siendo improbable.
    const { getDoc } = await import('firebase/firestore')
    if ((await getDoc(ref)).exists()) continue
    await setDoc(ref, {
      academiaId: datos.academiaId,
      grupoId: datos.grupoId,
      rol: 'alumno',
      creadoPor,
      // Un alta es de UNA persona: la invitación se agota con ella. Un enlace
      // reutilizable repartiría la misma matrícula a quien lo recibiera.
      maxUsos: 1,
      usos: 0,
      estado: 'activo',
      dias: DIAS_VIGENCIA,
      // La ficha que capturó recepción. Viaja aquí porque el perfil todavía no
      // existe: se copia sobre él en cuanto la persona entra.
      matricula: datos.matricula,
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono,
      nota: datos.nota,
      origen: 'recepcion',
      creado: serverTimestamp(),
      expira,
    })
    return codigo
  }
  throw new Error('No se pudo generar un código único. Intenta de nuevo.')
}

/** Los pagos de una academia, del más reciente al más antiguo. */
export async function pagosDeAcademia(academiaId, { limite = 50 } = {}) {
  if (!academiaId) return []
  const { getDocs, query, where, orderBy, limit } = await import('firebase/firestore')
  const snap = await getDocs(query(
    collection(db, 'pagos'),
    where('academiaId', '==', academiaId),
    orderBy('creado', 'desc'),
    limit(limite),
  ))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
