// ============================================================
//  Modo llamada — la exploración activa (06-10-2026)
// ------------------------------------------------------------
//  El alumno no recibe los signos: los OBTIENE. Cada acción de exploración
//  (hablarle, aplicar dolor, mirar pupilas, tomar el pulso…) devuelve un
//  HALLAZGO en palabras y, si mide algo, deja ese valor en el monitor con el
//  momento en que se tomó. El paciente sigue cambiando: una medida vieja
//  puede no ser verdad ya, y el monitor no avisa. Hay que volver a medir.
//
//  El nivel de conciencia NO se muestra nunca: el alumno lo CLASIFICA (AVDI y,
//  en el adulto, Glasgow por componentes) a partir de lo que observó, y se le
//  corrige contra el estado real del paciente en ese momento.
//
//  De dónde sale lo que se enseña aquí:
//    · AVDI: m1-pab-avdi y m3-ep-avdi (qué es cada nivel y cómo se comprueba,
//      presión en el trapecio o el lecho ungueal como estímulo doloroso).
//    · Glasgow: m5-tcc-glasgow (tabla de los tres componentes, se puntúa la
//      MEJOR respuesta, se comunica desglosada) y m3-ep-neurologica.
//    · Pupilas: m3-ep-neurologica (tamaño, simetría, reactividad).
//    · El lego NO busca pulso: m1-pab-rcp-legos-adulto (respuesta y
//      respiración en 10 s como máximo).
//
//  Módulo PURO: se prueba con `npm test`.
// ============================================================

/** Glasgow por defecto cuando el caso no lo fija: el mismo nivel que su AVDI. */
const GLASGOW_POR_AVDI = { A: { o: 4, v: 5, m: 6 }, V: { o: 3, v: 4, m: 6 }, D: { o: 2, v: 2, m: 4 }, I: { o: 1, v: 1, m: 1 } }

export const COMPONENTES_GLASGOW = {
  o: { nombre: 'Apertura ocular', max: 4, niveles: ['Ninguna', 'Al estímulo doloroso', 'A la orden verbal', 'Espontánea'] },
  v: { nombre: 'Respuesta verbal', max: 5, niveles: ['Ninguna', 'Sonidos incomprensibles', 'Palabras inapropiadas', 'Confusa', 'Orientada'] },
  m: { nombre: 'Respuesta motora', max: 6, niveles: ['Ninguna', 'Extensión anormal (descerebración)', 'Flexión anormal (decorticación)', 'Retirada al dolor', 'Localiza el dolor', 'Obedece órdenes'] },
}

/** «O3V4M6» → { o: 3, v: 4, m: 6 }, o null si no es válido. */
export function leerGlasgow(texto) {
  const m = /^O([1-4])V([1-5])M([1-6])$/.exec(String(texto || '').trim().toUpperCase())
  return m ? { o: Number(m[1]), v: Number(m[2]), m: Number(m[3]) } : null
}

/** El Glasgow real del paciente: el que fija el caso o el que corresponde a su AVDI. */
export function glasgowDe(signos = {}) {
  return leerGlasgow(signos.glasgow) || GLASGOW_POR_AVDI[signos.avdi] || null
}

/**
 * ¿Concuerdan el AVDI y el Glasgow que declara el caso? Un caso incoherente
 * enseñaría mal las dos escalas a la vez. Devuelve el error o null.
 */
export function incoherenciaConciencia(signos = {}) {
  if (!signos.glasgow) return null
  const g = leerGlasgow(signos.glasgow)
  if (!g) return `Glasgow «${signos.glasgow}» no tiene la forma O#V#M# (ojos 1-4, verbal 1-5, motor 1-6).`
  const a = signos.avdi
  if (a === 'A' && g.o !== 4) return 'Un paciente Alerta tiene apertura ocular espontánea (O4).'
  if (a === 'V' && g.o !== 3) return 'Quien responde a la voz abre los ojos a la orden verbal (O3).'
  if (a === 'D' && g.o > 2) return 'Quien solo responde al dolor no abre los ojos a la voz (O1-O2).'
  if (a === 'D' && g.o === 1 && g.v === 1 && g.m === 1) return 'Si no hay ninguna respuesta al dolor no es D, es I.'
  if (a === 'I' && (g.o !== 1 || g.v !== 1 || g.m !== 1)) return 'Inconsciente (I) es O1 V1 M1: ningún estímulo obtiene respuesta.'
  return null
}

// ---------- Acciones -------------------------------------------------------
//  revela: las claves del monitor que deja medidas.
//  equipo: la clave que tiene que existir en el caso para que la acción
//          aparezca (no hay oxímetro en un escenario sin oxímetro).
//  soloTum: el lego no la hace (no busca pulso, no cuenta por reloj).
//  texto: la acción solo aparece si el caso escribió ese texto (historia del
//         paciente o relato de los testigos) en algún momento.
//  instrumento: la acción se hace DESDE SU RECUADRO del monitor, imitando el
//         gesto real (07-10-2026). Modos:
//           · 'clic'      — un toque y listo (mirar la piel).
//           · 'espera'    — un toque y el equipo tarda `espera` s en leer
//                           (oxímetro, glucómetro, termómetro, monitor).
//           · 'sostener'  — se mantiene pulsado: antes de `minimo` s no se
//                           obtiene nada; al llegar a `completo` termina solo.
//                           Pulso y respiración dan un resultado PARCIAL entre
//                           los dos (hay/no hay), y el valor contado al final.
//           · 'inflar'    — se mantiene pulsado para inflar el manguito
//                           (`minimo` s) y, al soltar, tarda `espera` s.
export const ACCIONES = [
  { id: 'observar', etiqueta: 'Observarlo sin tocarlo', segundos: 5, revela: ['piel', 'movimientos'] },
  { id: 'piel', etiqueta: 'Mirar la piel', segundos: 0, revela: ['piel'], instrumento: { clave: 'piel', modo: 'clic', ayuda: 'Toca para mirar la piel.' } },
  { id: 'preguntar', etiqueta: 'Preguntarle qué le pasa', segundos: 15, revela: [], texto: 'historia' },
  { id: 'testigos', etiqueta: 'Preguntar a quien estaba con él', segundos: 15, revela: [], texto: 'testigos' },
  { id: 'voz', etiqueta: 'Hablarle fuerte y pedirle que apriete tu mano', segundos: 5, revela: [] },
  { id: 'dolor', etiqueta: 'Estímulo doloroso (presión en el trapecio)', segundos: 5, revela: [] },
  { id: 'respiracion', etiqueta: 'Ver, oír y sentir si respira', segundos: 10, revela: ['fr'], instrumento: { clave: 'fr', modo: 'sostener', minimo: 3, completo: 30, completoLego: 10, ayuda: 'Mantén pulsado mientras miras el tórax: unos segundos dicen si respira; 30 s, cuántas veces.', ayudaLego: 'Mantén pulsado mientras ves, oyes y sientes si respira (no más de 10 s).' } },
  { id: 'pulso', etiqueta: 'Tomar el pulso', segundos: 15, revela: ['fc'], soloTum: true, instrumento: { clave: 'fc', modo: 'sostener', minimo: 5, completo: 60, ayuda: 'Mantén pulsado sobre la arteria: unos 10 s dicen si hay pulso; 1 minuto, la frecuencia.' } },
  { id: 'pupilas', etiqueta: 'Revisar pupilas con la lámpara', segundos: 10, revela: ['pupilas'], soloTum: true, instrumento: { clave: 'pupilas', modo: 'sostener', minimo: 3, completo: 5, ayuda: 'Mantén pulsado para iluminar cada pupila (3 a 5 s).' } },
  // m3-ep-neurologica: función motora gruesa, simetría facial y lenguaje.
  // Solo aparece en los casos que dan este hallazgo.
  { id: 'neuro', etiqueta: 'Explorar cara, fuerza y habla', segundos: 20, revela: ['neuro'], soloTum: true, equipo: 'neuro', instrumento: { clave: 'neuro', modo: 'sostener', minimo: 4, completo: 6, ayuda: 'Mantén pulsado mientras le pides que sonría, levante los brazos y repita una frase.' } },
  // m1-pab-fracturas: pulso, sensibilidad y movilidad distales antes y después
  // de inmovilizar. También la hace el lego (es lo que enseña su lección).
  { id: 'distal', etiqueta: 'Revisar pulso, color y sensibilidad distales', segundos: 15, revela: ['distal'], equipo: 'distal', instrumento: { clave: 'distal', modo: 'sostener', minimo: 3, completo: 5, ayuda: 'Mantén pulsado mientras palpas el pulso y le preguntas si siente y mueve los dedos.' } },
  { id: 'torax', etiqueta: 'Explorar el tórax y el cuello', segundos: 20, revela: ['torax'], soloTum: true, equipo: 'torax', instrumento: { clave: 'torax', modo: 'sostener', minimo: 4, completo: 6, ayuda: 'Mantén pulsado mientras inspeccionas, palpas y percutes el tórax y miras el cuello.' } },
  { id: 'oximetro', etiqueta: 'Colocar el oxímetro', segundos: 15, revela: ['spo2'], equipo: 'spo2', instrumento: { clave: 'spo2', modo: 'espera', espera: 6, ayuda: 'Toca para colocar el oxímetro en el dedo; tarda unos segundos en leer.' } },
  { id: 'ta', etiqueta: 'Tomar la tensión arterial', segundos: 30, revela: ['ta'], equipo: 'ta', instrumento: { clave: 'ta', modo: 'inflar', minimo: 3, espera: 6, ayuda: 'Mantén pulsado para inflar el manguito y suelta para desinflarlo.' } },
  { id: 'glucometro', etiqueta: 'Glucemia capilar', segundos: 30, revela: ['glucosa'], equipo: 'glucosa', instrumento: { clave: 'glucosa', modo: 'espera', espera: 5, ayuda: 'Toca para puncionar el dedo; el glucómetro tarda unos segundos.' } },
  { id: 'monitor', etiqueta: 'Conectar el monitor (ritmo)', segundos: 20, revela: ['ritmo'], equipo: 'ritmo', instrumento: { clave: 'ritmo', modo: 'espera', espera: 4, ayuda: 'Toca para colocar los electrodos; el monitor tarda unos segundos.' } },
  { id: 'termometro', etiqueta: 'Tomar la temperatura', segundos: 20, revela: ['temp'], equipo: 'temp', instrumento: { clave: 'temp', modo: 'espera', espera: 5, ayuda: 'Toca para colocar el termómetro; tarda unos segundos.' } },
]

/** Valores de un signo en todo el caso (inicio, nodos y opciones). */
function valoresEnElCaso(caso, clave) {
  const out = []
  const mira = (s) => { if (s && clave in s) out.push(s[clave]) }
  mira(caso.signos)
  for (const n of Object.values(caso.nodos || {})) {
    mira(n.signos)
    for (const o of n.opciones || []) mira(o.signos)
  }
  return out
}

/**
 * Qué acciones tiene el alumno en este caso. El equipo existe si el caso da
 * algún valor medible de ese signo; el lego no tiene acciones de TUM.
 */
export function accionesDelCaso(caso) {
  const lego = caso?.rol === 'lego'
  const hayTexto = (campo) => Boolean(caso?.[campo]) || Object.values(caso?.nodos || {}).some((n) => n[campo])
  return ACCIONES.filter((a) => {
    if (lego && a.soloTum) return false
    if (a.texto) return hayTexto(a.texto)
    if (!a.equipo) return true
    return valoresEnElCaso(caso, a.equipo).some((v) => v !== null && v !== undefined && v !== '')
  })
}

// ---------- Hallazgos ------------------------------------------------------

const esLactante = (caso) => caso?.paciente === 'lactante'
const esPediatrico = (caso) => caso?.paciente === 'lactante' || caso?.paciente === 'nino'

function textoVerbal(v, caso) {
  if (esLactante(caso)) {
    return v >= 4 ? 'Llora con fuerza.' : v >= 2 ? 'Solo se queja débilmente.' : 'No llora ni emite ningún sonido.'
  }
  return [
    '', 'No emite ningún sonido.', 'Solo emite quejidos, sin palabras.', 'Dice palabras sueltas que no vienen al caso.',
    'Contesta, pero confunde dónde está y qué pasó.', 'Te dice su nombre, dónde está y qué ocurrió.',
  ][v]
}

/**
 * Lo que encuentra el alumno al hacer una acción sobre el paciente tal como
 * está AHORA. Devuelve el texto del hallazgo y los valores medidos.
 */
export function explorar(accionId, signos = {}, caso = {}, relato = {}, { segundos = null } = {}) {
  const g = glasgowDe(signos)
  const medidos = {}
  const accion = ACCIONES.find((a) => a.id === accionId)
  for (const k of accion?.revela || []) if (k in signos) medidos[k] = signos[k]
  const sinPulso = signos.fc === 0 || /sin pulso/i.test(String(signos.fc ?? ''))
  let texto = ''
  switch (accionId) {
    case 'observar':
      texto = [
        g ? (g.o === 4 ? 'Tiene los ojos abiertos.' : 'Tiene los ojos cerrados.') : '',
        signos.movimientos ? `${signos.movimientos[0].toUpperCase()}${signos.movimientos.slice(1)}.`
          : g ? (g.m >= 5 && g.o === 4 ? 'Se mueve por sí mismo.' : g.m === 1 ? 'No hace ningún movimiento.' : '') : '',
        signos.piel ? `Piel: ${signos.piel}.` : '',
      ].filter(Boolean).join(' ')
      break
    case 'voz':
      if (!g) { texto = 'No logras valorar su respuesta.'; break }
      texto = [
        g.o === 4 ? 'Ya tenía los ojos abiertos.' : g.o === 3 ? 'Abre los ojos cuando le hablas fuerte.' : 'No abre los ojos al oír tu voz.',
        textoVerbal(g.v, caso),
        esPediatrico(caso) ? '' : g.m === 6 ? 'Le pides que te apriete la mano y lo hace.' : 'Le pides que te apriete la mano y no lo hace.',
      ].filter(Boolean).join(' ')
      break
    case 'dolor':
      if (!g) { texto = 'No logras valorar su respuesta.'; break }
      texto = [
        g.o >= 3 ? 'Ya respondía antes del estímulo doloroso.' : g.o === 2 ? 'Abre los ojos con la presión.' : 'No abre los ojos ni con la presión.',
        signos.movimientos ? 'Los movimientos no cambian con el estímulo.' : [
          '', 'No hay ningún movimiento.', 'Extiende brazos y piernas de forma rígida.',
          'Flexiona los brazos de forma anormal sobre el pecho.', 'Retira el brazo del estímulo.',
          'Lleva la mano hacia la tuya para apartarla.', 'Lleva la mano hacia la tuya para apartarla.',
        ][g.m],
        g.v >= 2 && g.o <= 2 ? 'Se queja.' : '',
      ].filter(Boolean).join(' ')
      break
    case 'preguntar': {
      // Contesta quien puede: orientado o confuso. Confuso, a medias.
      const historia = relato.historia || ''
      if (esLactante(caso) || !g) texto = 'No puede contarte qué le pasa.'
      else if (g.v === 5) texto = historia ? `Te dice: «${historia}»` : 'No te cuenta nada nuevo.'
      else if (g.v === 4) texto = historia ? `Contesta a medias y se confunde: «${historia}»` : 'Contesta, pero confunde lo que pasó.'
      else texto = g.v === 3 ? 'Dice palabras sueltas: no logras que te cuente qué pasó.' : 'No puede contestarte.'
      break
    }
    case 'piel':
      texto = signos.piel ? `Piel: ${signos.piel}.` : 'No ves nada llamativo en la piel.'
      break
    case 'testigos':
      texto = relato.testigos ? `Te cuentan: «${relato.testigos}»` : 'No hay nadie que pueda contarte qué pasó.'
      break
    case 'respiracion':
      // Por instrumento: lo que da depende de cuánto tiempo se observó.
      if (segundos !== null && caso?.rol !== 'lego' && segundos < 30) {
        const parada = signos.fr === 0 || /no respira/i.test(String(signos.fr ?? ''))
        texto = signos.fr == null ? 'No logras valorar la respiración.'
          : parada ? 'No ves que el tórax se mueva: no respira.'
            : 'Ves que el tórax se mueve: respira. Para contarlas hace falta observar 30 segundos.'
        delete medidos.fr
        if (signos.fr != null) medidos.fr = parada ? 'no respira' : 'respira'
        break
      }
      texto = signos.fr === null || signos.fr === undefined
        ? 'No logras valorar la respiración.'
        : typeof signos.fr === 'number'
          ? (signos.fr === 0 ? 'No respira.' : (caso?.rol === 'lego' ? 'Respira.' : `Cuentas ${signos.fr} respiraciones por minuto.`))
          : `Respiración: ${signos.fr}.`
      // El lego no cuenta por reloj: ve si respira y cómo. El monitor guarda lo que percibió.
      if (caso?.rol === 'lego' && typeof signos.fr === 'number') medidos.fr = signos.fr === 0 ? 'no respira' : 'respira'
      break
    case 'pulso':
      // Por instrumento: unos 10 s dicen si hay pulso; contarlo pide 1 minuto.
      if (segundos !== null && segundos < 60) {
        texto = sinPulso ? 'No encuentras pulso.'
          : signos.fc == null ? 'No logras valorar el pulso.'
            : 'Hay pulso. Para saber la frecuencia hay que contarlo durante 1 minuto.'
        delete medidos.fc
        if (signos.fc != null) medidos.fc = sinPulso ? 'sin pulso' : 'presente'
        break
      }
      texto = sinPulso ? 'No encuentras pulso.'
        : typeof signos.fc === 'number' ? `Pulso de ${signos.fc} latidos por minuto.`
          : signos.fc ? `Pulso: ${signos.fc}.` : 'No logras valorar el pulso.'
      break
    case 'pupilas':
      texto = `Pupilas: ${signos.pupilas || 'iguales; reaccionan a la luz'}.`
      medidos.pupilas = signos.pupilas || 'iguales, reactivas'
      break
    case 'distal': texto = signos.distal ? `Por debajo de la lesión: ${signos.distal}.` : 'No encuentras alteraciones por debajo de la lesión.'; break
    case 'torax': texto = signos.torax ? `Tórax y cuello: ${signos.torax}.` : 'No encuentras alteraciones en el tórax ni en el cuello.'; break
    case 'neuro': texto = signos.neuro ? `Exploración neurológica: ${signos.neuro}.` : 'No encuentras diferencias entre un lado y otro.'; break
    case 'oximetro': texto = signos.spo2 == null ? 'El oxímetro no da lectura.' : `El oxímetro marca ${signos.spo2} %.`; break
    case 'ta': texto = signos.ta == null ? 'No logras tomar la tensión.' : `Tensión arterial: ${signos.ta} mmHg.`; break
    case 'glucometro': texto = signos.glucosa == null ? 'El glucómetro no da lectura.' : `Glucemia capilar: ${signos.glucosa} mg/dL.`; break
    case 'monitor': texto = signos.ritmo ? `Ritmo en el monitor: ${signos.ritmo}.` : 'El monitor no muestra un ritmo interpretable.'; break
    case 'termometro': texto = signos.temp == null ? 'No logras medir la temperatura.' : `Temperatura: ${signos.temp}${typeof signos.temp === 'number' ? ' °C' : ''}.`; break
    default: texto = ''
  }
  return { texto, medidos }
}

// ---------- Clasificar la conciencia ---------------------------------------

/**
 * Corrige la clasificación del alumno contra el estado real del paciente.
 * `respuesta`: { avdi, o, v, m } (los de Glasgow, solo en el adulto).
 * `explorado`: ids de las acciones que ya hizo EN ESTE MOMENTO del caso.
 * `que`: 'avdi', 'glasgow' o 'ambas' (desde el monitor se valora cada escala
 * por separado, tocando su recuadro).
 */
export function calificarConciencia(respuesta = {}, signos = {}, caso = {}, explorado = [], que = 'ambas') {
  const g = glasgowDe(signos)
  const conAvdi = que !== 'glasgow'
  const conGlasgow = que !== 'avdi' && !esPediatrico(caso)
  const hecho = new Set(explorado)
  const avisos = []
  if (!hecho.has('observar')) avisos.push('No lo observaste antes de estimularlo: la apertura ocular espontánea solo se ve sin tocarlo.')
  if (!hecho.has('voz')) avisos.push('No probaste la respuesta a la voz.')
  if (!hecho.has('dolor') && signos.avdi !== 'A' && signos.avdi !== 'V') avisos.push('No aplicaste el estímulo doloroso, y sin él no se distingue D de I.')

  const avdi = conAvdi ? { dado: respuesta.avdi || null, real: signos.avdi || null } : null
  if (avdi) avdi.ok = avdi.dado === avdi.real
  const componentes = {}
  if (conGlasgow && g) {
    for (const k of ['o', 'v', 'm']) {
      const dado = Number(respuesta[k]) || null
      componentes[k] = { dado, real: g[k], ok: dado === g[k], nombre: COMPONENTES_GLASGOW[k].nombre, descripcion: COMPONENTES_GLASGOW[k].niveles[g[k] - 1] }
    }
  }
  const total = conGlasgow && g ? g.o + g.v + g.m : null
  const todoBien = (!avdi || avdi.ok) && Object.values(componentes).every((c) => c.ok)
  return { que, avdi, componentes, total, conGlasgow: conGlasgow && Boolean(g), todoBien, avisos }
}

/** Explicación de un nivel AVDI, con las palabras de la lección. */
export const AVDI_EXPLICA = {
  A: 'Alerta: está despierto y responde espontáneamente.',
  V: 'Verbal: responde solo cuando le hablas.',
  D: 'Dolor: responde solo al estímulo doloroso.',
  I: 'Inconsciente: ningún estímulo obtiene respuesta.',
}
