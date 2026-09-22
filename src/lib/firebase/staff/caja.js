// ============================================================
//  Recepción · caja — cobrar en mostrador y leer el historial
// ------------------------------------------------------------
//  UN PAGO NO SE EDITA NI SE BORRA, y la regla de Firestore ya lo impone
//  (`allow update: if false`). El motivo está escrito en `firestore.rules`:
//  editar un asiento destruye la prueba de lo que se apuntó primero y con ella
//  cualquier posibilidad de cuadrar una caja. Una corrección se hace con otro
//  asiento, y borrar solo lo puede el super-admin.
//
//  Por eso aquí no hay `actualizarPago` ni `anularPago`: no es un olvido.
// ============================================================
import { db } from '../init.js'
import {
  addDoc, collection, doc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc, where,
} from 'firebase/firestore'
import { cobroParaGuardar, esConcepto, problemasDelCobro } from '../../staff/cajaModelo.js'
import { registrarSinRomper } from './auditoria.js'

/**
 * Registra un cobro de mostrador.
 *
 * ── EL ABONO A UN COMPROMISO (21-09-2026).
 *
 * `cobro.adeudoId` convierte este cobro en un abono: entra la misma cantidad de
 * dinero que si no lo llevara —en caja no cambia nada, y eso es lo que impide
 * los faltantes—, pero además descuenta de lo que esa persona debía.
 *
 * EL ORDEN IMPORTA Y NO ES NEGOCIABLE: primero se escribe el PAGO, después se
 * apunta en el compromiso. Si falla lo segundo, el dinero está registrado y el
 * saldo de la ficha sigue saliendo bien —se deriva de los pagos, no de la
 * caché—. Al revés quedaría una deuda descontada sin que hubiera entrado un
 * peso, que es exactamente el faltante que esto existe para evitar.
 *
 * @returns {{id: string, auditado: boolean, liquidado: boolean}}
 */
export async function cobrar({ cobro, alumno, academiaId, registradoPor }) {
  const fallos = problemasDelCobro(cobro, { matricula: alumno?.matricula })
  if (fallos.length) throw new Error(fallos.join(' '))

  const datos = cobroParaGuardar(cobro, {
    academiaId,
    matricula: alumno?.matricula,
    uid: alumno?.uid || alumno?.id || null,
    registradoPor,
  })
  // Solo si lo hay: un campo `undefined` rompe la escritura, y uno en `null`
  // obligaría a distinguir «sin compromiso» de «compromiso borrado».
  if (cobro?.adeudoId) datos.adeudoId = String(cobro.adeudoId)
  const ref = await addDoc(collection(db, 'pagos'), { ...datos, creado: serverTimestamp() })

  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'cobrar-mostrador',
    coleccion: 'pagos',
    docId: ref.id,
    despues: {
      monto: datos.monto,
      concepto: datos.concepto,
      metodo: datos.metodo,
      matricula: datos.matricula,
      _nombre: String(alumno?.nombre || '').trim(),
      ...(datos.adeudoId ? { adeudoId: datos.adeudoId } : {}),
    },
  })

  // La caché del compromiso, después del dinero. Ver la cabecera.
  let liquidado = false
  if (datos.adeudoId) {
    try {
      const { apuntarAbono } = await import('./adeudos.js')
      const r = await apuntarAbono({ adeudoId: datos.adeudoId, monto: datos.monto })
      liquidado = r.liquidado
    } catch { /* el pago ya está; la ficha recalcula el saldo desde los pagos */ }
  }

  return { id: ref.id, auditado, liquidado }
}

/**
 * Los pagos de UNA persona.
 *
 * Se busca por matrícula y no por uid a propósito: en este sistema un pago
 * puede registrarse ANTES de que la cuenta exista —el primer pago de un alta
 * de mostrador se apunta mientras la persona todavía es una preinscripción—,
 * así que el uid puede faltar y la matrícula no. Es el mismo criterio con el
 * que `lib/firebase/recepcion.js` escribió el primer pago.
 *
 * POR ESO SE BUSCA TAMBIÉN POR LAS MATRÍCULAS ANTERIORES (21-09-2026). Desde
 * que la matrícula la dicta el grupo, cambiar de grupo la rehace — y un pago es
 * INMUTABLE por regla (`allow update: if false` en /pagos), así que su
 * matrícula no se puede reescribir para que siga el rastro. Si solo se buscara
 * por la de ahora, el dinero cobrado antes del cambio desaparecería de su
 * estado de cuenta y volvería a parecer que debe. El historial lo guarda su
 * perfil en `matriculasAnteriores`.
 *
 * `in` admite hasta 30 valores; quien las haya cambiado más veces que eso tiene
 * un problema que no se arregla aquí.
 */
export async function pagosDe({ matricula, matriculas = null, academiaId, limite = 100 }) {
  const claves = [...new Set(
    (matriculas?.length ? matriculas : [matricula])
      .map((m) => String(m || '').trim())
      .filter(Boolean)
  )].slice(0, 30)
  if (!claves.length || !academiaId) return []
  const base = [
    collection(db, 'pagos'),
    where('academiaId', '==', academiaId),
    claves.length === 1
      ? where('matricula', '==', claves[0])
      : where('matricula', 'in', claves),
  ]
  try {
    const snap = await getDocs(query(...base, orderBy('creado', 'desc'), limit(limite)))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (err) {
    if (err?.code !== 'failed-precondition') throw err
    const snap = await getDocs(query(...base, limit(limite)))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  }
}

/**
 * Corrige el CONCEPTO de un pago ya registrado. Dirección y super-admin.
 *
 * LO QUE NO TOCA, Y ES LA MITAD DEL DISEÑO: el importe, el método, la matrícula
 * y la fecha. Esos son la prueba de lo que se apuntó y con ellos se cuadra la
 * caja; una corrección de dinero se hace con otro asiento, no reescribiendo el
 * primero. La regla lo impone con un `hasOnly`, así que por esta puerta no cabe
 * un importe aunque alguien lo mande.
 *
 * POR QUÉ EXISTE. Teclear «mensualidad» donde era «inscripción» es el error más
 * común del mostrador, y hasta hoy dejaba el corte de caja mal repartido para
 * siempre. No es un dato contable: es la clasificación.
 *
 * Deja DOS rastros: `conceptoCorregidoPor` en el propio asiento —para que se vea
 * al mirarlo— y una línea en `historial`, que es donde se audita todo lo demás.
 */
export async function corregirConcepto({ pago, concepto, academiaId, registradoPor }) {
  if (!pago?.id) throw new Error('Falta el pago que se va a corregir.')
  if (!esConcepto(concepto)) throw new Error('Ese no es un concepto válido.')
  if (concepto === pago.concepto) return { cambiado: false, auditado: true }

  await updateDoc(doc(db, 'pagos', pago.id), {
    concepto,
    conceptoCorregidoPor: registradoPor || null,
    conceptoCorregido: serverTimestamp(),
  })

  const auditado = await registrarSinRomper({
    academiaId: academiaId || pago.academiaId,
    accion: 'corregir-concepto-pago',
    coleccion: 'pagos',
    docId: pago.id,
    antes: { concepto: pago.concepto, _monto: pago.monto, _matricula: pago.matricula || '' },
    despues: { concepto },
  })

  return { cambiado: true, auditado }
}

/**
 * Lo cobrado en la academia desde una fecha. Es el corte de caja.
 *
 * ── POR QUÉ ESTO DEVOLVÍA CERO SIN DECIR NADA (arreglado el 21-09-2026).
 *
 * La consulta cruza una igualdad (`academiaId`) con un RANGO (`creado >=`), y
 * eso en Firestore exige un índice compuesto. Si no está desplegado, la
 * consulta falla con `failed-precondition`… y el `catch` devolvía `[]`. El
 * resultado: un corte de caja que decía «$0.00 · sin cobros en este periodo»
 * con el cajón lleno de dinero, y ni un mensaje que permitiera sospechar que
 * el problema era un índice.
 *
 * **Un corte de caja en blanco por un fallo técnico es peor que un error**: se
 * lee como «hoy no se cobró nada» y con eso se cuadra mal una caja.
 *
 * Ahora hay tres capas y ninguna miente:
 *
 *   1. la consulta buena, con el índice (`firestore.indexes.json` ya lo
 *      declara: hay que desplegarlo con `firebase deploy --only
 *      firestore:indexes`);
 *   2. si falta el índice, se leen los pagos de la academia SIN el rango —una
 *      sola igualdad no necesita índice compuesto— y se filtra por fecha aquí.
 *      Devuelve además `aviso`, que la pantalla enseña: el corte funciona, pero
 *      hay que saber que va por el camino lento y que puede quedarse corto si
 *      la academia pasa del tope;
 *   3. cualquier otro error se propaga, como siempre.
 *
 * @returns {{pagos: Array, aviso: string, completo: boolean}}
 */
export async function cobrosDelDia({ academiaId, desde, limite = 200 }) {
  if (!academiaId) return { pagos: [], aviso: '', completo: true }
  const inicio = desde || new Date(new Date().setHours(0, 0, 0, 0))
  try {
    const snap = await getDocs(query(
      collection(db, 'pagos'),
      where('academiaId', '==', academiaId),
      where('creado', '>=', inicio),
      orderBy('creado', 'desc'),
      limit(limite),
    ))
    return { pagos: snap.docs.map((d) => ({ id: d.id, ...d.data() })), aviso: '', completo: true }
  } catch (err) {
    if (err?.code !== 'failed-precondition') throw err
  }

  // Camino sin índice. El tope es más alto porque aquí se filtra después, y
  // `completo` dice si se llegó a él: un corte recortado tiene que avisarlo en
  // vez de enseñar una suma que parece el total del día y no lo es.
  const tope = Math.max(limite * 5, 1000)
  const snap = await getDocs(query(
    collection(db, 'pagos'),
    where('academiaId', '==', academiaId),
    limit(tope),
  ))
  const todos = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  const pagos = todos.filter((p) => {
    const seg = p?.creado?.seconds
    return typeof seg === 'number' ? seg * 1000 >= inicio.getTime() : true
  })
  return {
    pagos,
    completo: todos.length < tope,
    aviso: todos.length < tope
      ? 'Falta el índice de pagos por fecha: el corte se calculó leyendo la academia entera. Despliega los índices (firebase deploy --only firestore:indexes) para que vuelva a ser una consulta directa.'
      : `Falta el índice de pagos por fecha y esta academia ya tiene más de ${tope} cobros: ESTE CORTE PUEDE ESTAR INCOMPLETO. Despliega los índices (firebase deploy --only firestore:indexes) antes de cuadrar la caja con él.`,
  }
}
