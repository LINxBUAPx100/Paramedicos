// ============================================================
//  Recepción · solicitudes — SOLO LECTURA, y con su porqué
// ------------------------------------------------------------
//  Hay DOS colecciones de solicitudes en este sistema y no son lo mismo:
//
//   · `solicitudesAcceso` — alguien de fuera pide entrar a la academia desde
//     el directorio público. Aceptarla es una decisión de ADMISIÓN.
//   · `solicitudes` — alguien de dentro pide algo a su academia (que le
//     habiliten un módulo, que le abran los códigos).
//
//  Recepción las CONSULTA y no las resuelve. En el mostrador la pregunta es
//  «¿ya me aceptaron?», y poder contestarla sin ir a buscar al director es
//  media gestión resuelta; decidir quién entra y con qué permisos es otra cosa,
//  y sigue siendo del director. Por eso aquí no hay ni un `update`, y en las
//  reglas `esRecepcionDe` aparece en el `allow read` de las dos colecciones y
//  en ningún `allow update`.
//
//  Cada lectura va por su lado con su propio `catch`: que una academia sin
//  directorio público no tenga `solicitudesAcceso` no puede dejar en blanco
//  las solicitudes internas.
// ============================================================
import { db } from '../init.js'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'

const segundos = (t) => (typeof t?.seconds === 'number' ? t.seconds : 0)

async function leer(coleccion, academiaId, tope) {
  const snap = await getDocs(query(
    collection(db, coleccion),
    where('academiaId', '==', academiaId),
    limit(tope),
  ))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => segundos(b.fecha) - segundos(a.fecha))
}

/**
 * Las dos listas, ya separadas en pendientes y resueltas.
 *
 * @returns {{acceso: Array, internas: Array, pendientes: number, errores: string[]}}
 *   `errores` NO se traga: si una de las dos lecturas se deniega, la pantalla
 *   lo dice en vez de enseñar una lista vacía como si no hubiera nada.
 */
export async function solicitudesDeRecepcion({ academiaId, limite = 100 }) {
  if (!academiaId) return { acceso: [], internas: [], pendientes: 0, errores: [] }
  const errores = []

  const acceso = await leer('solicitudesAcceso', academiaId, limite).catch((err) => {
    errores.push(err?.code === 'permission-denied'
      ? 'No se pueden leer las solicitudes de ingreso: publica las reglas actualizadas.'
      : 'No se pudieron cargar las solicitudes de ingreso.')
    return []
  })

  const internas = await leer('solicitudes', academiaId, limite).catch((err) => {
    errores.push(err?.code === 'permission-denied'
      ? 'No se pueden leer las solicitudes internas: publica las reglas actualizadas.'
      : 'No se pudieron cargar las solicitudes internas.')
    return []
  })

  const pendiente = (s) => (s?.estado || 'pendiente') === 'pendiente'
  return {
    acceso,
    internas,
    pendientes: acceso.filter(pendiente).length + internas.filter(pendiente).length,
    errores,
  }
}
