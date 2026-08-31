// ============================================================
//  Auditoría automática del contenido clínico — lógica PURA
// ------------------------------------------------------------
//  Estos controles NO reubican ni aprueban nada: levantan la mano. El error
//  original del proyecto fue exactamente el contrario —dejar que una medida
//  automática (solapamiento de palabras) decidiera dónde va cada pieza—, así
//  que aquí la máquina solo señala y la decisión sigue siendo humana.
//
//  Cubre cuatro de las diez comprobaciones del mandato:
//    · misma indicación con dosis contradictorias
//    · preguntas cuyo vocabulario central no está en el tema
//    · referencias genéricas sin documento identificable
//    · enlaces que no son http(s)
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================
import { urlSegura, origenImagenValido } from './temaContenidoModelo.js'

// ---------- texto plano de un tema ----------

// Aplana TODO lo que el alumno lee: secciones, conceptos, tarjetas y quiz.
// Si un dato no aparece aquí, para el alumno no existe.
export function textoDeTema(tema, { conQuiz = true } = {}) {
  const partes = [tema?.resumen || '', ...(tema?.objetivos || [])]
  for (const sec of tema?.secciones || []) {
    partes.push(sec.titulo || '')
    for (const b of sec.bloques || []) {
      partes.push(b.texto || '', b.titulo || '', b.nota || '')
      for (const it of b.items || []) {
        partes.push(typeof it === 'string' ? it : [it?.nombre, it?.nota].filter(Boolean).join(' '))
      }
      for (const f of b.filas || []) partes.push((f || []).join(' '))
      partes.push((b.headers || []).join(' '))
    }
  }
  // Concepto y tarjeta se aplanan como UNA unidad, no como dos partes sueltas.
  // Separarlos convertía el término «Osteólisis» en una frase por sí misma,
  // sin su definición al lado, y cualquier control por frase lo leía como si
  // el tema estuviera afirmando el término a secas.
  for (const c of tema?.conceptosClave || []) {
    partes.push([c.termino, c.definicion].filter(Boolean).join(': '))
  }
  for (const f of tema?.flashcards || []) {
    partes.push([f.frente, f.reverso].filter(Boolean).join(' '))
  }
  if (conQuiz) {
    for (const q of tema?.quiz || []) {
      partes.push(q.pregunta || '', ...(q.opciones || []), q.explicacion || '')
    }
  }
  return partes.join(' \n ')
}

export function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// ---------- 1. dosis contradictorias ----------

// Fármacos de alto riesgo en el ámbito prehospitalario: una cifra equivocada
// aquí no es una errata, es una dosis administrada.
export const FARMACOS_VIGILADOS = [
  'atropina', 'adrenalina', 'epinefrina', 'amiodarona', 'lidocaina', 'naloxona',
  'midazolam', 'diazepam', 'manitol', 'acido tranexamico', 'tranexamico',
  'salbutamol', 'nitroglicerina', 'morfina', 'fentanilo', 'ketamina',
  'glucosa', 'dextrosa', 'sulfato de magnesio', 'gluconato de calcio',
]

const UNIDADES = 'mg\\/kg|mcg\\/kg\\/min|mcg\\/kg|mg|mcg|µg|g|ml\\/kg|mL\\/kg|ml|mEq|UI|J'
const CIFRA = new RegExp(`(\\d+(?:[.,]\\d+)?)\\s*(${UNIDADES})\\b`, 'gi')

// Palabras que anclan una cifra a una indicación concreta. Sin una de ellas
// cerca, «1 mg» es una cifra suelta y por tanto insegura.
const ANCLAS_DE_INDICACION = [
  'bradicardia', 'paro', 'asistolia', 'fibrilacion', 'taquicardia', 'anafilaxia',
  'organofosforado', 'intoxicacion', 'convulsion', 'estado epileptico', 'hipoglucemia',
  'dolor', 'analgesia', 'asma', 'broncoespasmo', 'hemorragia', 'quemadura',
  'hipertension intracraneal', 'sedacion', 'opioide', 'protocolo',
]

// Separa el texto en frases. Una cifra y su indicación tienen que convivir en
// la misma frase para poder afirmar que se refieren a lo mismo.
// Los dos puntos NO cierran frase: en español introducen lo que sigue, y
// cortar ahí separaba «Osteólisis:» de su definición y «Atropina:» de su
// dosis, que es justo la pareja que estos controles necesitan ver junta.
export function frases(texto) {
  return String(texto).split(/(?<=[.;!?])\s+|\n+/).filter((f) => f.trim())
}

/**
 * Extrae cada mención de dosis con su contexto.
 * @returns [{ farmaco, cifra, unidad, indicacion, frase, temaId }]
 */
export function extraerDosis(temas) {
  const salida = []
  for (const tema of temas || []) {
    for (const frase of frases(textoDeTema(tema))) {
      const plana = normalizar(frase)
      const farmaco = FARMACOS_VIGILADOS.find((f) => plana.includes(f))
      if (!farmaco) continue
      CIFRA.lastIndex = 0
      let m
      while ((m = CIFRA.exec(frase)) !== null) {
        salida.push({
          temaId: tema.id,
          farmaco,
          cifra: m[1].replace(',', '.'),
          unidad: m[2].toLowerCase(),
          indicacion: ANCLAS_DE_INDICACION.find((a) => plana.includes(a)) || null,
          frase: frase.trim(),
        })
      }
    }
  }
  return salida
}

/**
 * Dos dosis distintas del MISMO fármaco para la MISMA indicación declarada.
 * Las dosis sin indicación se reportan aparte: no son contradicciones, son
 * cifras que no se pueden defender.
 * @returns {{ contradicciones: object[], sinIndicacion: object[] }}
 */
export function contradiccionesDeDosis(temas) {
  const menciones = extraerDosis(temas)
  const sinIndicacion = menciones.filter((m) => !m.indicacion)
  const porClave = new Map()
  for (const m of menciones) {
    if (!m.indicacion) continue
    const clave = `${m.farmaco}|${m.indicacion}|${m.unidad}`
    if (!porClave.has(clave)) porClave.set(clave, new Map())
    const valores = porClave.get(clave)
    if (!valores.has(m.cifra)) valores.set(m.cifra, [])
    valores.get(m.cifra).push(m)
  }
  const contradicciones = []
  for (const [clave, valores] of porClave) {
    if (valores.size < 2) continue
    const [farmaco, indicacion, unidad] = clave.split('|')
    contradicciones.push({
      farmaco,
      indicacion,
      unidad,
      valores: [...valores.keys()].sort(),
      donde: [...new Set([...valores.values()].flat().map((m) => m.temaId))],
    })
  }
  return { contradicciones, sinIndicacion }
}

// ---------- 2. preguntas fuera de tema ----------

// Vocabulario de relleno y de NARRACIÓN. Un caso clínico bien planteado dice
// «un comensal tose y consigue hablar»: «comensal» y «consigue» no tienen por
// qué estar en la lección, y penalizarlos convertiría el control en ruido.
const VACIAS = new Set([
  'para', 'con', 'los', 'las', 'del', 'una', 'uno', 'que', 'por', 'sus', 'sin',
  'este', 'esta', 'como', 'mas', 'muy', 'entre', 'sobre', 'segun', 'cual',
  'cuale', 'cuando', 'donde', 'porque', 'siguiente', 'paciente', 'caso',
  'tipo', 'debe', 'hacer', 'hace', 'siempre', 'nunca', 'todo', 'toda', 'cada',
  'solo', 'antes', 'despue', 'primero', 'mientra', 'aunque', 'correcta',
  'correcto', 'opcion', 'ninguna', 'ninguno', 'amba', 'ambo', 'cual', 'sigue',
  // narración de viñeta clínica
  'llega', 'encuentra', 'acude', 'avisa', 'atiende', 'realiza', 'aplica',
  'decide', 'consigue', 'presenta', 'refiere', 'comienza', 'contigo', 'minuto',
  'segundo', 'hora', 'edad', 'ano', 'varon', 'mujer', 'hombre', 'nino', 'nina',
  'persona', 'victima', 'usuario', 'compan', 'familiar', 'testigo', 'escena',
  'lugar', 'sitio', 'momento', 'entonce', 'ademas', 'tambien', 'porqu',
])

function clave(texto) {
  return [...new Set(
    normalizar(texto)
      .replace(/[^a-z0-9ñ\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length >= 4)
      .map(raizDe)
      .filter((t) => t.length >= 4 && !VACIAS.has(t))
  )]
}

// Lematizador pobre a propósito, el mismo criterio que usa el resto del
// proyecto: basta con que singular y plural colisionen («toser»/«tosiendo» no
// colisionan, y por eso el umbral no puede ser exigente).
function raizDe(p) {
  let r = p
  if (r.length > 6 && (r.endsWith('ando') || r.endsWith('endo'))) r = r.slice(0, -4)
  else if (r.length > 5 && r.endsWith('es')) r = r.slice(0, -2)
  else if (r.length > 4 && r.endsWith('s')) r = r.slice(0, -1)
  if (r.length > 5 && (r.endsWith('ar') || r.endsWith('er') || r.endsWith('ir'))) r = r.slice(0, -2)
  return r
}

/**
 * Una pregunta pertenece a su tema si LA RESPUESTA se puede sostener con el
 * texto de la lección. Es la traducción mecánica del criterio de la auditoría:
 * «su quiz podría contestarse estudiando solo esa página».
 *
 * Se mide sobre la OPCIÓN CORRECTA y la explicación, no sobre el enunciado:
 * el enunciado puede describir una escena y la escena no está en la lección.
 * Y se compara contra el texto SIN el quiz, porque si no cada pregunta se
 * justificaría a sí misma.
 *
 * Es un DETECTOR DE ALERTAS: señala para revisión humana, no reubica nada.
 *
 * @returns [{ temaId, indice, pregunta, cobertura, ausentes }]
 */
export function preguntasFueraDeTema(temas, { umbral = 0.3 } = {}) {
  const fuera = []
  for (const tema of temas || []) {
    const leccion = clave(textoDeTema(tema, { conQuiz: false }))
    if (leccion.length === 0) continue
    const enLeccion = new Set(leccion)
    const preguntas = [...(tema.quiz || []), ...(tema.actividades?.preguntas || [])]
    preguntas.forEach((q, i) => {
      const correctas = (Array.isArray(q.correcta) ? q.correcta : [q.correcta])
        .map((c) => q.opciones?.[c] || '')
      const terminos = clave([...correctas, q.explicacion || ''].join(' '))
      if (terminos.length === 0) return
      const presentes = terminos.filter((t) => enLeccion.has(t))
      const cobertura = presentes.length / terminos.length
      if (cobertura < umbral) {
        fuera.push({
          temaId: tema.id,
          indice: i,
          pregunta: q.pregunta,
          cobertura: Number(cobertura.toFixed(2)),
          ausentes: terminos.filter((t) => !enLeccion.has(t)),
        })
      }
    })
  }
  return fuera
}

// ---------- 3. referencias sin documento identificable ----------

// Portadas institucionales y catálogos: sirven para saber que la obra existe,
// no para respaldar una cifra. Una fuente útil apunta a un documento.
const PORTADAS = [
  /^https?:\/\/(www\.)?naemt\.org\/education\/phtls\/?$/i,
  /^https?:\/\/[^/]+\/?$/i, // dominio pelado, sin ruta
]

// Qué convierte una referencia en localizable. Además de la edición y el año
// —lo que sitúa un manual clínico— se aceptan los localizadores propios de un
// texto normativo: una ley vigente no tiene «edición», tiene artículos, y el
// artículo es exactamente lo que permite comprobar la afirmación. Se admite
// también la fecha de consulta, que es como se cita un texto que puede
// reformarse.
// OJO con el límite de palabra: un `\b` delante de toda la alternancia dejaba
// fuera «13.ª ed.» —el dígito de la ordinal no empieza palabra— mientras
// aceptaba «7.ª ed.». Cada alternativa lleva su propio anclaje.
const PALABRAS_DE_EDICION = new RegExp(
  '(?:\\b(?:20\\d\\d|19\\d\\d)\\b'          // año
  + '|\\bed(?:ici[oó]n)?\\.?\\s*\\d'         // «ed. 3», «edición 3»
  + '|\\d\\s*\\.?\\s*[ªa]\\.?\\s*ed'         // «7.ª ed», «13.ª ed»
  + '|\\b(?:cap[íi]tulo|tabla|algoritmo|anexo|ap[ée]ndice|p[áa]gs?)\\b'
  + '|\\b(?:art[íi]culo|fracci[oó]n|numeral)\\b|\\bart\\.\\s*\\d'
  + '|\\bconsultad[ao]\\b)',
  'i'
)

/**
 * Referencias que no permiten llegar al dato: sin URL utilizable, apuntando a
 * una portada, o sin edición/año/capítulo que las sitúe en el tiempo.
 * @returns [{ temaId, nombre, url, motivo }]
 */
export function fuentesNoTrazables(temas) {
  const malas = []
  for (const tema of temas || []) {
    for (const sec of tema.secciones || []) {
      for (const b of sec.bloques || []) {
        if (b.tipo !== 'fuentes') continue
        for (const it of b.items || []) {
          const url = it?.url || ''
          const nombre = it?.nombre || ''
          let motivo = null
          if (url && !urlSegura(url)) motivo = 'El enlace no es http(s).'
          else if (url && PORTADAS.some((p) => p.test(url))) {
            motivo = 'Apunta a una portada o dominio sin documento concreto.'
          } else if (!PALABRAS_DE_EDICION.test(`${nombre} ${it?.nota || ''}`)) {
            motivo = 'No declara edición, año, capítulo, tabla ni página.'
          }
          if (motivo) malas.push({ temaId: tema.id, nombre, url, motivo })
        }
      }
    }
  }
  return malas
}

// ---------- 4. enlaces inválidos en cualquier bloque ----------

export function enlacesInvalidos(temas) {
  const malos = []
  for (const tema of temas || []) {
    for (const sec of tema.secciones || []) {
      for (const b of sec.bloques || []) {
        // `src` de una imagen admite ADEMÁS una ruta propia del sitio
        // (`imagenes/…`), que es lo que el modelo permite desde siempre en
        // `origenImagenValido`. Este auditor solo miraba http(s), así que
        // marcaba como enlace inválido cualquier imagen servida por el propio
        // repositorio. No saltó antes porque hasta hoy no había ninguna: las
        // primeras son las fotografías de contexto de src/data/fotosTemario.js.
        // Los otros dos campos son enlaces de verdad y siguen exigiendo http(s).
        for (const campo of ['src', 'fuenteUrl', 'url']) {
          if (!b[campo]) continue
          const valido = campo === 'src' ? origenImagenValido(b[campo]) : urlSegura(b[campo])
          if (!valido) malos.push({ temaId: tema.id, campo, valor: b[campo] })
        }
      }
    }
    for (const lista of ['videos', 'fuentes', 'archivos']) {
      for (const r of tema.recursos?.[lista] || []) {
        if (r?.url && !urlSegura(r.url)) malos.push({ temaId: tema.id, campo: lista, valor: r.url })
      }
    }
  }
  return malos
}
