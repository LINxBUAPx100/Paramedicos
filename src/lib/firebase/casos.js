// Escenarios del Modo llamada creados por la academia, en `casos/{id}`.
// Ver su regla en firestore.rules: el personal de la academia los crea y los
// edita; el alumno solo puede LEER los validados o publicados.
import { db } from './init.js'
import {
  collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where,
} from 'firebase/firestore'

const AVALADOS = ['validado', 'publicado']

/**
 * Escenarios de una academia. El alumno pide `soloAvalados`: la regla no le
 * deja leer borradores, y una consulta que pudiera devolverlos se rechazaría
 * entera.
 */
export async function listarCasosAcademia({ academiaId, soloAvalados = false }) {
  if (!academiaId) return []
  const filtros = [where('academiaId', '==', academiaId)]
  if (soloAvalados) filtros.push(where('estado', 'in', AVALADOS))
  const snap = await getDocs(query(collection(db, 'casos'), ...filtros))
  return snap.docs.map((d) => ({ ...d.data(), id: d.id, origen: 'academia' }))
}

/**
 * Guarda un escenario ya normalizado (lib/casosEditor.normalizarCaso).
 * `revision` solo acompaña a un caso avalado: quién lo validó y por qué.
 */
export async function guardarCaso({ caso, academiaId, autorUid, revision = null }) {
  const avalado = AVALADOS.includes(caso.estado)
  const datos = {
    academiaId,
    autorUid,
    titulo: caso.titulo,
    resumen: caso.resumen || '',
    estado: caso.estado,
    // Exploración activa: quién atiende, a quién, y lo que cuentan.
    rol: caso.rol || 'tum',
    paciente: caso.paciente || 'adulto',
    historia: caso.historia || '',
    testigos: caso.testigos || '',
    temas: caso.temas,
    fuentes: caso.fuentes,
    signos: caso.signos || null,
    inicio: caso.inicio,
    nodos: caso.nodos,
    revision: avalado ? revision : null,
    actualizado: serverTimestamp(),
  }
  await setDoc(doc(db, 'casos', caso.id), datos)
  return caso.id
}

export async function borrarCaso(id) {
  await deleteDoc(doc(db, 'casos', id))
}
