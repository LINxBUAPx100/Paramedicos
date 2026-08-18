// ============================================================
//  Reutilización del corpus antiguo sobre el temario oficial — lógica PURA
// ------------------------------------------------------------
//  El temario ficticio cubría los MISMOS contenidos que el plan oficial, pero
//  agrupados en 68 temas amplios («Soporte Vital Básico y RCP») en vez de los
//  287 granulares del plan («RCP legos en adulto», «Uso del DEA», «OVACE»).
//  Su material —secciones, preguntas, flashcards y conceptos— sigue siendo
//  válido: lo que cambia es dónde cuelga.
//
//  Este módulo reparte cada PIEZA de material al tema oficial que mejor la
//  describe, puntuando el solapamiento de términos. No traduce ni reescribe
//  nada: mueve.
//
//  Por qué IDF y no un contador simple: «sistema» aparece en decenas de temas
//  y no distingue nada; «glasgow» aparece en uno y lo identifica solo. Pesar
//  cada término por lo raro que es evita que las palabras de relleno decidan
//  el destino de una pregunta.
//
//  Módulo PURO (sin Firebase, sin React): se prueba con `npm test`.
// ============================================================

// Palabras sin valor discriminante en un temario médico.
const VACIAS = new Set([
  'para', 'con', 'los', 'las', 'del', 'una', 'uno', 'que', 'por', 'sus', 'sin',
  'the', 'and', 'este', 'esta', 'como', 'mas', 'muy', 'entre', 'sobre', 'segun',
  'cual', 'cuales', 'cuando', 'donde', 'porque', 'siguiente', 'siguientes',
  'paciente', 'pacientes', 'caso', 'casos', 'tipo', 'tipos', 'general',
  'generales', 'manejo', 'evaluacion', 'atencion', 'introduccion', 'definicion',
  'signos', 'sintomas', 'tratamiento', 'primer', 'primera', 'examen', 'practica',
  'total', 'horas', 'semanas', 'aplicacion', 'entrega', 'calificaciones',
  // Añadidas tras detectar una mala ubicación real: un protocolo de
  // reperfusión coronaria acabó dentro de «Evaluación inicial y secundaria»
  // porque compartían la palabra «inicial». Son términos que aparecen en
  // decenas de contextos clínicos distintos y no identifican nada.
  'inicial', 'iniciales', 'secundaria', 'secundario', 'basico', 'basica',
  'avanzado', 'avanzada', 'especial', 'especiales', 'comun', 'comunes',
  'uso', 'toma', 'taller', 'repaso', 'aspectos', 'conceptos', 'clasificacion',
  'exploracion', 'dirigida', 'tecnica', 'tecnicas', 'metodo', 'metodos',
  'complicaciones', 'indicaciones', 'prehospitalario', 'prehospitalaria',
])

export function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Reduce plurales y algunas variantes de género a una raíz común, para que
// «quemaduras» del plan case con «quemadura» del corpus. Es un lematizador
// pobre a propósito: uno bueno exigiría un diccionario, y aquí basta con que
// singular y plural colisionen.
export function raiz(palabra) {
  let p = palabra
  if (p.length > 5 && p.endsWith('es')) p = p.slice(0, -2)
  else if (p.length > 4 && p.endsWith('s')) p = p.slice(0, -1)
  return p
}

// Términos significativos de un texto.
//
// El mínimo es de TRES letras, no cuatro: en medicina prehospitalaria las
// siglas cortas son de las palabras más discriminantes que existen —DEA, SSS,
// TEP, RCP, PIC, IVU— y con un filtro de 4 se perdían justo las que mejor
// identifican un tema.
export function terminos(texto) {
  return normalizar(texto)
    .split(/[^a-z0-9]+/)
    .filter((p) => p.length >= 3 && !VACIAS.has(p))
    .map(raiz)
}

// Sinónimos y siglas: el corpus viejo y el plan oficial no siempre usan la
// misma palabra para lo mismo. Cada clave se EXPANDE a sus equivalentes, de
// modo que «dea» y «desfibrilador» puntúen para el mismo tema.
export const SINONIMOS = {
  dea: ['desfibrilador', 'desfibrilacion', 'automatico'],
  desfibrilador: ['dea', 'desfibrilacion'],
  ovace: ['atragantamiento', 'obstruccion', 'cuerpo', 'extrano', 'heimlich'],
  avdi: ['conciencia', 'alerta', 'respuesta'],
  glasgow: ['coma', 'escala'],
  rcp: ['reanimacion', 'cardiopulmonar', 'compresiones', 'parada', 'paro'],
  svb: ['rcp', 'reanimacion', 'basico'],
  torniquete: ['hemorragia', 'sangrado', 'exanguinante'],
  hemorragias: ['hemorragia', 'sangrado', 'torniquete'],
  quemaduras: ['quemadura', 'termico', 'parkland', 'inhalacion'],
  fracturas: ['fractura', 'inmovilizacion', 'ferula'],
  intubacion: ['endotraqueal', 'laringoscopio', 'tubo'],
  canulas: ['orofaringea', 'nasofaringea', 'canula'],
  oxigenoterapia: ['oxigeno', 'mascarilla', 'puntas', 'nasales'],
  intravenosa: ['venosa', 'canalizacion', 'cateter', 'puncion'],
  cristaloides: ['solucion', 'soluciones', 'fluidoterapia', 'hartmann', 'fisiologico'],
  electrocardiografia: ['electrocardiograma', 'derivaciones', 'ritmo'],
  arritmias: ['arritmia', 'fibrilacion', 'taquicardia', 'bradicardia'],
  farmacologia: ['farmaco', 'farmacos', 'dosis', 'medicamento', 'medicamentos'],
  aminas: ['vasopresores', 'noradrenalina', 'adrenalina', 'dopamina', 'infusion'],
  shock: ['hipovolemico', 'cardiogenico', 'neurogenico', 'septico', 'anafilactico'],
  neumotorax: ['torax', 'toracica', 'pleural', 'tension'],
  abdomen: ['abdominal', 'visceras', 'peritoneo'],
  craneo: ['craneal', 'encefalico', 'tce', 'intracraneal'],
  columna: ['vertebral', 'medular', 'espinal', 'inmovilizacion'],
  pediatria: ['pediatrico', 'pediatrica', 'lactante', 'nino', 'ninos', 'neonatal'],
  geriatria: ['geriatrico', 'geriatrica', 'anciano', 'mayores', 'envejecimiento'],
  obstetricas: ['embarazo', 'parto', 'obstetrica', 'gestante', 'eclampsia'],
  toxicologicas: ['intoxicacion', 'toxindromes', 'antidoto', 'veneno'],
  triage: ['victimas', 'multiples', 'incidente'],
  ambulancias: ['ambulancia', 'operaciones', 'traslado'],
  epidemiologia: ['epidemiologico', 'incidencia', 'prevalencia'],
  celula: ['celular', 'organelos', 'membrana'],
  electrolitos: ['electrolito', 'sodio', 'potasio', 'hidroelectrolitico'],
  metabolismo: ['metabolico', 'glucosa', 'aerobio', 'anaerobio'],
  tegumentario: ['piel', 'dermis', 'epidermis'],
  oseo: ['hueso', 'huesos', 'esqueleto', 'musculoesqueletico'],
  muscular: ['musculo', 'musculos', 'contraccion'],
  cardiovascular: ['corazon', 'cardiaco', 'circulacion', 'vascular'],
  nervioso: ['neurologico', 'neurona', 'encefalo', 'neuroanatomia'],
  digestivo: ['gastrointestinal', 'estomago', 'intestino', 'higado'],
  urinario: ['renal', 'rinon', 'nefrologia', 'diuresis'],
  endocrino: ['hormona', 'hormonal', 'tiroides', 'endocrinologia'],
  respiratorias: ['respiratorio', 'pulmon', 'pulmonar', 'ventilacion', 'neumologia'],
  cardiologicas: ['cardiologia', 'cardiaco', 'coronario', 'infarto'],
  metabolicas: ['diabetes', 'diabetico', 'glucemia', 'cetoacidosis'],
  urinarias: ['renal', 'urinario', 'urolitiasis', 'nefrologia'],
}

// Los sinónimos se declaran en palabra completa, así que se buscan por la
// palabra Y por su raíz, y lo que se añade también se reduce a raíz.
function expandir(lista) {
  const out = new Set(lista)
  for (const t of lista) {
    for (const s of [...(SINONIMOS[t] || []), ...(SINONIMOS[`${t}s`] || [])]) {
      out.add(raiz(normalizar(s)))
    }
  }
  return [...out]
}

/**
 * Construye el índice de destinos: para cada tema oficial, sus términos con
 * peso IDF (log del inverso de en cuántos temas aparece cada término).
 *
 * @param {{id:string, titulo:string, unidadTitulo?:string}[]} temasOficiales
 */
export function indiceDestinos(temasOficiales) {
  const destinos = (temasOficiales || []).map((t) => ({
    id: t.id,
    // El título del tema pesa el doble que el de su unidad: la unidad da
    // contexto («Vía intravenosa») pero el tema es lo que se busca.
    propios: expandir(terminos(t.titulo)),
    contexto: expandir(terminos(t.unidadTitulo || '')),
  }))
  const enCuantos = new Map()
  for (const d of destinos) {
    for (const t of new Set([...d.propios, ...d.contexto])) {
      enCuantos.set(t, (enCuantos.get(t) || 0) + 1)
    }
  }
  const n = Math.max(1, destinos.length)
  const idf = (t) => Math.log(n / (1 + (enCuantos.get(t) || 0))) + 1
  return { destinos, idf }
}

// Texto representativo de una pieza de material, sea del tipo que sea.
export function textoDePieza(pieza, tipo) {
  if (!pieza) return ''
  switch (tipo) {
    case 'quiz':
      return [pieza.pregunta, ...(pieza.opciones || []), pieza.explicacion].filter(Boolean).join(' ')
    case 'flashcard':
      return [pieza.frente, pieza.reverso].filter(Boolean).join(' ')
    case 'concepto':
      return [pieza.termino, pieza.definicion].filter(Boolean).join(' ')
    case 'seccion':
      return [pieza.titulo, ...(pieza.bloques || []).map((b) =>
        [b.texto, b.titulo, ...(b.items || []).map((i) => (typeof i === 'string' ? i : i?.nombre)),
          ...(b.filas || []).flat()].filter(Boolean).join(' ')
      )].filter(Boolean).join(' ')
    default:
      return String(pieza.titulo || '')
  }
}

/**
 * Elige el tema oficial que mejor describe una pieza de material.
 * Devuelve `{ id, puntuacion }` o `null` si ninguno llega al umbral.
 *
 * El umbral existe a propósito: es preferible dejar una pregunta sin ubicar
 * —y que alguien la coloque a mano— que enterrarla en un tema equivocado,
 * donde nadie la buscaría nunca.
 */
export function mejorDestino(texto, indice, { umbral = 2.5, idfUnico = 4 } = {}) {
  const encontrados = new Set(terminos(texto))
  if (!encontrados.size) return null
  let mejor = null
  for (const d of indice.destinos) {
    let p = 0
    let coincidencias = 0
    let idfMaximo = 0
    for (const t of d.propios) {
      if (!encontrados.has(t)) continue
      p += indice.idf(t) * 2
      coincidencias++
      idfMaximo = Math.max(idfMaximo, indice.idf(t))
    }
    for (const t of d.contexto) if (encontrados.has(t)) p += indice.idf(t) * 0.5
    // UNA sola palabra en común no basta para mover contenido clínico, salvo
    // que sea un término prácticamente exclusivo de ese tema (una sigla como
    // XABCDE o AVDI, un epónimo, un fármaco). Sin esta condición, «inicial»
    // metía un protocolo de reperfusión coronaria en un tema de primeros
    // auxilios: dos textos que no comparten nada más que una palabra de
    // relleno no hablan de lo mismo.
    if (coincidencias === 0) continue
    if (coincidencias < 2 && idfMaximo < idfUnico) continue
    if (!mejor || p > mejor.puntuacion) mejor = { id: d.id, puntuacion: p, coincidencias }
  }
  return mejor && mejor.puntuacion >= umbral ? mejor : null
}

/**
 * Reparte todo el material del corpus antiguo entre los temas oficiales.
 *
 * @param {object[]} temasLegado  temas del bundle viejo (con quiz, flashcards…)
 * @param {object[]} temasOficiales  {id, titulo, unidadTitulo}
 * @returns {{contenido: Record<string, object>, sinUbicar: object[], resumen: object}}
 */
export function repartirCorpus(temasLegado, temasOficiales, opciones = {}) {
  const indice = indiceDestinos(temasOficiales)
  // Índice SECUNDARIO por unidad: muchos temas del plan son viñetas cuyo
  // título no dice nada por sí solo —«Definición.», «Signos y síntomas.»,
  // «Objeto empalado.»— y solo significan algo dentro de su unidad. Una pieza
  // que no encuentra tema pero sí unidad se coloca en el primer tema de esa
  // unidad: queda en el sitio correcto del temario aunque haya que afinar
  // luego en qué viñeta exacta.
  const porUnidad = new Map()
  for (const t of temasOficiales || []) {
    if (!t.unidadId) continue
    if (!porUnidad.has(t.unidadId)) {
      porUnidad.set(t.unidadId, { id: t.unidadId, titulo: t.unidadTitulo || '', primero: t.id })
    }
  }
  const indiceUnidades = indiceDestinos(
    [...porUnidad.values()].map((u) => ({ id: u.id, titulo: u.titulo }))
  )
  const primeroDe = (unidadId) => porUnidad.get(unidadId)?.primero || null

  const contenido = {}
  const sinUbicar = []
  const dest = (id) => (contenido[id] ||= {
    secciones: [], conceptosClave: [], flashcards: [], quiz: [],
  })

  const TIPOS = [
    ['secciones', 'seccion'],
    ['conceptosClave', 'concepto'],
    ['flashcards', 'flashcard'],
    ['quiz', 'quiz'],
  ]

  for (const legado of temasLegado || []) {
    // Tercer pase, decidido ANTES de recorrer las piezas: ¿a qué tema oficial
    // corresponde este tema del corpus por su propio TÍTULO?
    //
    // Es lo que rescata las piezas que no se ubican solas. «Electrocardiografía
    // Básica» del corpus viejo corresponde sin ambigüedad a «Electrocardiografía
    // básica.» del plan, pero una pregunta suya sobre «derivaciones precordiales»
    // no comparte ni una palabra con ese título. Sin este respaldo se perdía.
    const respaldo = mejorDestino(legado.titulo || '', indice, opciones)?.id || null

    for (const [campo, tipo] of TIPOS) {
      for (const pieza of legado[campo] || []) {
        const texto = textoDePieza(pieza, tipo)
        let destinoId = mejorDestino(texto, indice, opciones)?.id || null
        let porContexto = false
        if (!destinoId) {
          // Segundo pase: ¿encaja al menos en alguna UNIDAD?
          const u = mejorDestino(texto, indiceUnidades, opciones)
          if (u) {
            destinoId = primeroDe(u.id)
            porContexto = true
          }
        }
        if (!destinoId && respaldo) {
          destinoId = respaldo
          porContexto = true
        }
        if (!destinoId) {
          sinUbicar.push({ tipo, origen: legado.id, texto: texto.slice(0, 90) })
          continue
        }
        // Se sella la procedencia: quien revise el tema sabe que esta pieza
        // viene del temario anterior, de qué tema, y si se ubicó por el título
        // del tema o solo por el de su unidad (lo segundo, más grueso, es lo
        // primero que conviene repasar).
        dest(destinoId)[campo].push({
          ...pieza,
          procedencia: { temaOriginal: legado.id, ...(porContexto ? { porUnidad: true } : {}) },
        })
      }
    }
  }

  const total = (c) => Object.values(contenido).reduce((n, x) => n + x[c].length, 0)
  return {
    contenido,
    sinUbicar,
    resumen: {
      temasConMaterial: Object.keys(contenido).length,
      secciones: total('secciones'),
      conceptos: total('conceptosClave'),
      flashcards: total('flashcards'),
      quiz: total('quiz'),
      sinUbicar: sinUbicar.length,
    },
  }
}
