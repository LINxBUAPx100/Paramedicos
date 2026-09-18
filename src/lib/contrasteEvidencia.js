// ============================================================
//  Contraste del temario contra evidencia externa
// ------------------------------------------------------------
//  «Tiene fuente» no es «está comprobado». La fuente dice de dónde salió una
//  frase; no dice que la frase siga siendo cierta, ni que la cifra corresponda
//  a la población o a la indicación que la lección afirma.
//
//  Este módulo extrae del contenido las afirmaciones que SE PUEDEN comprobar
//  —las que llevan una cifra, un umbral o una secuencia— y las separa por
//  ámbito, porque no todas las resuelve la misma autoridad: una dosis la
//  resuelve una guía clínica, la dotación de una ambulancia la resuelve el
//  DOF y el alcance de un tema lo resuelve la academia. Mezclarlas fue el
//  error que este proyecto ya pagó una vez.
//
//  El consumidor es `scripts/contraste-evidencia.mjs`, que ordena la cola y
//  emite las consultas. Aquí vive la lógica para que sea comprobable por
//  `tests/contrasteEvidencia.test.mjs`.
// ============================================================
import { createHash } from 'node:crypto'
import { frases, normalizar } from './auditoriaClinica.js'

// ---------- 1. de qué texto se extrae ----------

// Solo PROSA que el alumno lee como afirmación del curso. El bloque `fuentes`
// queda fuera a propósito: está lleno de años, ediciones y páginas que son
// ruido puro para esto («PHTLS, 9.ª ed., 2020» no afirma nada clínico).
export function prosaDe(tema) {
  const partes = [tema?.resumen || '']
  for (const sec of tema?.secciones || []) {
    for (const b of sec.bloques || []) {
      if (b.tipo === 'fuentes') continue
      partes.push(b.texto || '', b.titulo || '', b.nota || '')
      for (const it of b.items || []) {
        partes.push(typeof it === 'string' ? it : [it?.nombre, it?.nota].filter(Boolean).join(' '))
      }
      for (const f of b.filas || []) partes.push((f || []).join(' · '))
    }
  }
  for (const c of tema?.conceptosClave || []) {
    partes.push([c.termino, c.definicion].filter(Boolean).join(': '))
  }
  for (const f of tema?.flashcards || []) partes.push([f.frente, f.reverso].filter(Boolean).join(' '))
  // De la pregunta solo interesa la EXPLICACIÓN: es donde el curso afirma.
  for (const q of tema?.quiz || []) partes.push(q.explicacion || '')
  return partes.join(' \n ')
}

// Restos bibliográficos que se cuelan en prosa («verificado el 17 de agosto»).
const BIBLIOGRAFICO = /\b(ed\.|edici[óo]n|cap\.|cap[íi]tulo|p[áa]gs?\.|ISBN|consultad[oa] el|publicad[oa] el|verificad[oa]s? el|traducci[óo]n autom[áa]tica)/i

// ---------- 2. ámbito: quién puede resolver la afirmación ----------

// Ni la mejor búsqueda de literatura clínica dice qué exige una NOM mexicana,
// qué lleva la ambulancia de esta academia o cuántas horas asigna el plan.
// Meter esas frases en la cola de contraste produce ruido y, peor, invita a
// «comprobarlas» contra una autoridad que no manda sobre ellas.
// Sin `\b` de cierre: en «nom-034» el dígito va pegado a otro dígito, y exigir
// ahí un límite de palabra hacía que la NOM más citada del temario se
// clasificara como afirmación clínica y entrara en la cola equivocada.
const NORMATIVO = /\b(nom-\d|norma oficial|dof|ley general|reglamento|art[íi]culo|c[óo]digo (nacional|penal)|cofepris|secretar[íi]a de salud)/i
const LOCAL = /\b(protocolo del servicio|protocolo local|direcci[óo]n m[ée]dica|alcance autorizado|formulario del servicio|seg[úu]n el protocolo|cada servicio)\b/i
const CURRICULAR = /\b(m[óo]dulo \d|unidad \d|semanas?|horas del|plan de estudios|se estudia en el)\b/i

export function ambitoDe(texto) {
  const plana = normalizar(texto)
  if (NORMATIVO.test(plana)) return 'normativo'
  if (LOCAL.test(plana)) return 'local'
  if (CURRICULAR.test(plana)) return 'curricular'
  return 'evidencia'
}

// ---------- 3. riesgo: qué pasa si la cifra está mal ----------

// ALTO = cifra que manda sobre una ACCIÓN. Equivocarla cambia lo que se le
// hace al paciente, así que encabeza la cola.
const ACCION = new RegExp([
  'mg\\/kg', 'ml\\/kg', 'mcg', 'µg', '\\bmg\\b', '\\bml\\b', '\\bmeq\\b', '\\bui\\b',
  'joule', 'julio', 'dosis', 'bolo', 'infusion', 'descarga', 'desfibril',
  'compresion', 'ventilacion', 'insuflacion',
  'torniquete', 'empaquetamiento', 'presion directa',
  'mmhg', 'etco2', 'saturacion', 'oxigeno al', 'fio2',
  'lpm', 'rpm', 'por minuto', 'profundidad', 'golpes dorsales',
  'minutos de', 'primeras horas', 'ventana', 'dentro de los',
].join('|'), 'i')

// MEDIO = cifra que manda sobre una DECISIÓN: clasificar, trasladar, prealertar.
const DECISION = new RegExp([
  'glasgow', 'escala', 'puntaje', 'puntos', 'criterio', 'umbral', 'punto de corte',
  'superficie corporal', 'regla de', 'grados', '\\bscq\\b', 'triage', 'triaje',
  'menor de', 'mayor de', 'a partir de', '%',
].join('|'), 'i')

export function riesgoDe(texto) {
  const plana = normalizar(texto)
  if (ACCION.test(plana)) return 'alto'
  if (DECISION.test(plana)) return 'medio'
  return 'bajo'
}

// Identificador estable: si la frase no cambia, el id no cambia, y un
// veredicto ya emitido sigue apuntando a la misma afirmación. Si la frase se
// corrige, el id cambia y la afirmación vuelve a la cola — que es lo correcto:
// una frase reescrita no hereda la comprobación de la frase anterior.
export const idDe = (texto) => 'af-'
  + createHash('sha1').update(normalizar(texto).replace(/\s+/g, ' ').trim()).digest('hex').slice(0, 10)

/**
 * Extrae las afirmaciones comprobables de una lista de temas.
 * Deduplica por texto: el molde v2 repitió frases entre lecciones y
 * preguntarlas dos veces no comprueba nada dos veces.
 * @returns {Map<string, {id,literal,ambito,riesgo,temas,citaActual}>}
 */
export function afirmacionesDe(temas) {
  const salida = new Map()
  for (const tema of temas || []) {
    const citas = []
    for (const sec of tema?.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b.tipo === 'fuentes') for (const it of b.items || []) citas.push(it?.nombre || '')
      }
    }
    for (const f of frases(prosaDe(tema))) {
      const literal = f.replace(/\s+/g, ' ').trim()
      if (literal.length < 30) continue
      if (!/\d/.test(literal)) continue
      if (BIBLIOGRAFICO.test(literal)) continue
      const id = idDe(literal)
      if (!salida.has(id)) {
        salida.set(id, {
          id,
          literal,
          ambito: ambitoDe(literal),
          riesgo: riesgoDe(literal),
          temas: [],
          citaActual: citas[0] || null,
        })
      }
      const a = salida.get(id)
      if (!a.temas.some((x) => x.id === tema.id)) {
        a.temas.push({ id: tema.id, titulo: tema.titulo || '', modulo: tema.modulo ?? null })
      }
    }
  }
  return salida
}

// ---------- 4. una cifra, una consulta ----------

// El molde v2 dice la misma cifra hasta cinco veces dentro de una lección: en
// la tabla, en la prosa, en el concepto clave, en la tarjeta y en el repaso.
// Son afirmaciones DISTINTAS como texto pero la MISMA afirmación como hecho
// clínico, y preguntarlas por separado gastaría media cola piloto en repetir
// la misma consulta. Se agrupan por lección y por el juego de cifras que
// declaran; el año se descarta porque sitúa la guía, no el hecho.
const ANIO = /^(1[89]|20)\d{2}$/

function huella(a) {
  const cifras = [...new Set(
    (a.literal.match(/\d+(?:[.,]\d+)?/g) || []).filter((n) => !ANIO.test(n))
  )].sort()
  return `${a.temas[0]?.id || '?'}|${cifras.join(',') || '∅'}`
}

const PESO = { alto: 0, medio: 1, bajo: 2 }

/**
 * Agrupa las afirmaciones que dicen el mismo hecho clínico.
 * El representante es el enunciado más completo del grupo, porque es el que
 * mejor se deja contrastar; las demás quedan como `variantes`, que es la
 * lista de sitios a tocar si el veredicto obliga a corregir.
 * @returns [{ id, literal, variantes, riesgo, ambito, temas, citaActual, idsAgrupados }]
 */
export function agrupar(afirmaciones) {
  const grupos = new Map()
  for (const a of afirmaciones.values ? afirmaciones.values() : afirmaciones) {
    const k = huella(a)
    if (!grupos.has(k)) grupos.set(k, [])
    grupos.get(k).push(a)
  }
  const salida = []
  for (const miembros of grupos.values()) {
    const orden = [...miembros].sort((x, y) => y.literal.length - x.literal.length)
    const jefe = orden[0]
    salida.push({
      ...jefe,
      variantes: orden.slice(1).map((m) => m.literal),
      idsAgrupados: orden.map((m) => m.id),
      // El grupo hereda el riesgo MÁS alto de sus miembros: si una de las
      // formulaciones manda sobre una acción, el hecho manda sobre una acción.
      riesgo: orden.map((m) => m.riesgo).sort((x, y) => PESO[x] - PESO[y])[0],
    })
  }
  return salida
}

// ---------- 5. el buscador no es la fuente ----------

// Un motor que SINTETIZA literatura sirve para localizar el documento
// primario; no lo sustituye. Si su dominio aparece en un bloque `fuentes`, el
// alumno estaría estudiando la respuesta de una máquina citada como si fuera
// una guía. `docs/CONTRASTE-EVIDENCIA.md` explica el flujo correcto.
export const BUSCADORES_NO_CITABLES = [
  'openevidence.com', 'openevidence.ai',
  'chat.openai.com', 'chatgpt.com', 'perplexity.ai',
  'gemini.google.com', 'bard.google.com', 'copilot.microsoft.com',
  'claude.ai', 'elicit.com', 'elicit.org', 'consensus.app', 'scispace.com',
]

/**
 * Referencias que citan un buscador de IA en vez del documento primario.
 * @returns [{ temaId, nombre, url, motivo }]
 */
export function fuentesDeBuscador(temas) {
  const malas = []
  for (const tema of temas || []) {
    for (const sec of tema?.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b.tipo !== 'fuentes') continue
        for (const it of b.items || []) {
          const donde = normalizar(`${it?.url || ''} ${it?.nombre || ''} ${it?.nota || ''}`)
          const motor = BUSCADORES_NO_CITABLES.find((d) => donde.includes(d))
            || (/\bopen ?evidence\b/.test(donde) ? 'openevidence' : null)
          if (!motor) continue
          malas.push({
            temaId: tema.id,
            nombre: it?.nombre || '',
            url: it?.url || '',
            motivo: `Cita un buscador que sintetiza literatura (${motor}) en vez del documento primario que ese buscador señala.`,
          })
        }
      }
    }
  }
  return malas
}
