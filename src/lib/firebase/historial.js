// ============================================================
//  Registro de actividad — lectura
// ------------------------------------------------------------
//  La ESCRITURA vive en `contenido.js` (`registrarHistorial`), que es de donde
//  la usa media aplicación. Aquí solo se lee, que es lo que faltaba: la
//  colección se llevaba escribiendo sin que ninguna pantalla la mirara.
//
//  Se ordena por fecha y se limita, SIN filtrar por academia en la consulta: un
//  `where` + `orderBy` sobre campos distintos exigiría un índice compuesto, y el
//  filtro por academia se hace en el cliente sobre las N más recientes. Para el
//  super-admin, que es quien mira esto, la regla se cumple sin filtros porque
//  `esSuper()` no depende del documento.
// ============================================================
import { db } from './init.js'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'

export async function listarHistorial({ limite = 300 } = {}) {
  const q = query(collection(db, 'historial'), orderBy('fecha', 'desc'), limit(limite))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
