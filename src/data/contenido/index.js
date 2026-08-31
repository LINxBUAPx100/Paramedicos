// ============================================================
//  Material de los temas del plan oficial — punto de unión
// ------------------------------------------------------------
//  ANTES este archivo hacía `{ ...reutilizado }` y encima ponía lo redactado a
//  mano. Con eso, el corpus del temario ANTERIOR —repartido sobre los 287
//  temas oficiales por coincidencia de palabras— llegaba al alumno como si
//  fuera contenido del curso. La auditoría midió el daño: 85 de los 202 temas
//  poblados mezclaban piezas de tres o más temas de origen, con dosis
//  contradictorias y bloques de fuentes que no respaldan la página donde
//  estaban.
//
//  Ahora la jerarquía es otra y solo tiene un escalón:
//
//    · PUBLICABLE  → únicamente los archivos redactados y declarados.
//    · LEGADO      → `reutilizado.js` sigue en el repo y se exporta APARTE,
//                    como fuente de borradores para quien reescriba un tema.
//                    No entra en el objeto que consume el generador.
//
//  El precio es visible y buscado: la cobertura cae de 202 temas «con algo» a
//  los que de verdad se redactaron. Un tema sin material dice «Contenido aún
//  no disponible», que es cierto, en vez de enseñar una mezcla que parece una
//  lección.
// ============================================================
import legado from './reutilizado.js'
import m1 from './m1-propedeutico.js'
import m1b from './m1-propedeutico-b.js'
import m1c from './m1-propedeutico-c.js'
import m3eval from './m3-evaluacion.js'
import m3va from './m3-via-aerea.js'
import m3vab from './m3-via-aerea-b.js'
import m3vac from './m3-via-aerea-c.js'
import m3vi from './m3-via-intravenosa.js'
import m3md from './m3-monitor-desfibrilador.js'
import m3act from './m3-actividades.js'
import m2e from './m2-esencial.js'
import m2i from './m2-intermedia.js'
import m2o from './m2-opcional.js'
import m4epi from './m4-epidemiologia.js'
import m4far from './m4-farmacologia.js'
import m4resp from './m4-respiratorias.js'
import m4gi from './m4-gastrointestinales.js'
import m4card from './m4-cardiologicas.js'
import m4met from './m4-metabolicas.js'
import m4uri from './m4-urinarias.js'
import m4neu from './m4-neurologicas.js'
import m4gynA from './m4-gineco-a.js'
import m4gynB from './m4-gineco-b.js'
import m4tox from './m4-toxicologicas.js'
import m4act from './m4-actividades.js'
import m5shock from './m5-shock.js'
import m5torax from './m5-torax.js'
import m5abdomen from './m5-abdomen.js'
import m5cc from './m5-craneo-columna.js'
import m5act from './m5-actividades.js'
// Lote A del Módulo 5: 33 lecciones nuevas (cinemática, hemorragia y shock,
// tórax, abdomen agudo y cabeza). Ver `docs/GUIA-REDACCION-M5-LOTE-A.md`.
import m5cin from './m5-cinematica.js'
import m5hs from './m5-hemorragia-shock.js'
import m5tb from './m5-torax-b.js'
import m5ab from './m5-abdomen-b.js'
import m5cb from './m5-craneo-b.js'
// Lote B del Módulo 5: las 33 lecciones que cierran el módulo en cobertura.
import m5cc2 from './m5-craneo-c.js'
import m5occ from './m5-ojo-cara-cuello.js'
import m5me from './m5-musculoesqueletico.js'
import m5amb from './m5-ambientales.js'
import m5que from './m5-quemaduras.js'
// Módulo 6 completo: pediatría (26 lecciones) y geriatría (13 lecciones).
import m6pi from './m6-pediatria-intro.js'
import m6sv from './m6-soporte-vital.js'
import m6ep from './m6-emergencias-pediatricas.js'
import m6tp from './m6-trauma-pediatrico.js'
import m6ge from './m6-geriatria.js'
import bloqueos from './bloqueos.js'
import evaluaciones from './evaluaciones.js'
import REVISIONES_DECLARADAS from './revisiones.js'
import { aplicarFotos } from '../fotosTemario.js'

// Módulos con material redactado a mano. Añadir uno = una línea aquí.
const REDACTADO = [m1, m1b, m1c, m3eval, m3va, m3vab, m3vac, m3vi, m3md, m3act, m2e, m2i, m2o, m4epi, m4far, m4resp, m4gi, m4card, m4met, m4uri, m4neu, m4gynA, m4gynB, m4tox, m4act, m5shock, m5torax, m5abdomen, m5cc, m5act, m5cin, m5hs, m5tb, m5ab, m5cb, m5cc2, m5occ, m5me, m5amb, m5que, m6pi, m6sv, m6ep, m6tp, m6ge]

// Temas SIN material a propósito: el plan no da alcance suficiente y la
// academia tiene que decidir. Traen ficha de revisión, no contenido.
const DECLARADOS = [bloqueos, evaluaciones]

// Claves que NO son material del tema: viajan al nodo, no al contenido
// editable (`validarContenidoTema` rechaza campos que no conoce).
const META = ['revision', 'evaluacion']

function separar(material) {
  const contenido = {}
  for (const [k, v] of Object.entries(material || {})) {
    if (!META.includes(k)) contenido[k] = v
  }
  return {
    contenido,
    revision: material?.revision ?? null,
    evaluacion: material?.evaluacion ?? null,
  }
}

const contenido = {}
// Las fichas del material anterior viven en revisiones.js (eran demasiados
// temas para tocarlos uno a uno); las de los archivos nuevos van INLINE junto
// al tema y tienen prioridad sobre aquéllas.
const REVISIONES = { ...REVISIONES_DECLARADAS }
const EVALUACIONES = {}

for (const modulo of [...REDACTADO, ...DECLARADOS]) {
  for (const [temaId, material] of Object.entries(modulo)) {
    const { contenido: c, revision, evaluacion } = separar(material)
    // Fusión POR CAMPO entre archivos redactados: permite partir un módulo en
    // varios ficheros sin que el segundo borre lo del primero.
    contenido[temaId] = { ...(contenido[temaId] || {}), ...c }
    if (revision) REVISIONES[temaId] = revision
    if (evaluacion) EVALUACIONES[temaId] = evaluacion
  }
}

// FOTOGRAFÍAS DE CONTEXTO. Se inyectan aquí, en un solo sitio, en vez de
// editar los veinte archivos de prosa escritos a mano: cambiar o retirar una
// foto es tocar `src/data/fotosTemario.js` y nada más, y la prosa que un
// docente revisó no se toca para colocar una imagen.
//
// `omitidas` no se ignora: si una foto apunta a un tema que no existe o que ya
// trae imagen, `tests/fotosTemario.test.mjs` lo convierte en fallo. Una foto
// mal dirigida que desaparece en silencio es peor que ninguna foto.
const { contenido: conFotos, omitidas: FOTOS_OMITIDAS } = aplicarFotos(contenido)
export { FOTOS_OMITIDAS }

export default conFotos

// Ficha editorial por tema (estado, procedencia, fecha, versión clínica,
// revisor, observaciones y traza de fuentes). Lo consume el generador.
export { REVISIONES }

// Configuración de los nodos de EXAMEN y de PRÁCTICA (reactivos, ponderación,
// aprobación, lista de cotejo). No es material de estudio: es la regla de la
// evaluación, y por eso viaja aparte del contenido editable.
export { EVALUACIONES }

// Ids de los temas con material redactado a mano.
//
// DEDUPLICADO a propósito. La fusión por campo permite que un mismo tema reciba
// material de varios archivos —`m3-actividades.js` aporta solo el campo
// `actividades` a lecciones que ya estaban redactadas en otro fichero—, así que
// un id puede aparecer más de una vez en `REDACTADO`. Sigue siendo UN tema: sin
// el `Set`, esta lista contaba 17 lecciones de más y descuadraba la métrica de
// cobertura frente al número real de lecciones con material.
export const TEMAS_REDACTADOS = [...new Set(REDACTADO.flatMap((m) => Object.keys(m)))]

// Ids de los temas detenidos a la espera de la academia. Se derivan de la
// ficha y no del archivo donde viven: un bloqueo puede aparecer en cualquiera.
export const TEMAS_BLOQUEADOS = Object.entries(REVISIONES)
  .filter(([, r]) => r.estado === 'bloqueado_por_decision')
  .map(([id]) => id)

// Ids de los nodos de evaluación configurados (exámenes y prácticas).
export const TEMAS_EVALUACION = Object.keys(EVALUACIONES)

// ---------- legado, archivado ----------

// El corpus del temario anterior redistribuido automáticamente. NO se publica.
// Se conserva y se exporta para dos usos legítimos:
//   1. servir de borrador a quien reescriba un tema desde cero;
//   2. permitir que una prueba compruebe que nada de aquí llegó al alumno.
export const BORRADORES_LEGADO = legado

// ¿Este tema tiene material heredado sin aprobar esperando revisión? Lo usan
// el inventario y el panel docente para priorizar, nunca la vista del alumno.
export function tieneBorradorLegado(temaId) {
  return Object.prototype.hasOwnProperty.call(legado, temaId)
}
