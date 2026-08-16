// ============================================================
//  Exportar el temario a imagen — composición PURA
// ------------------------------------------------------------
//  Compone una LÍNEA DE TIEMPO del temario: los módulos en vertical sobre un eje,
//  cada una con sus temas numerados, la marca PTEM y el nombre de la academia.
//
//  Aquí se decide TODO: qué entra, dónde va cada cosa, dónde se corta cada
//  línea de texto y cuánto mide el lienzo. El canvas solo pinta la lista de
//  elementos que sale de aquí. Así la parte que puede equivocarse —los cálculos—
//  se prueba con `npm test`, sin navegador.
//
//  El ancho del texto NO se puede calcular sin un motor de fuentes, así que se
//  recibe una función `medir(texto, estilo)`. En la app la implementa
//  `measureText` del canvas; en las pruebas, una regla determinista. Es lo que
//  permite comprobar los saltos de línea sin depender de qué tipografía haya
//  instalada.
//
//  Los ESTILOS viven aquí y los usan las dos partes: si el canvas construyera
//  sus propias fuentes, mediría con una y pintaría con otra, y los saltos de
//  línea saldrían donde no toca. Es el mismo error que ya se pagó teniendo el
//  marcado de un tema escrito dos veces.
// ============================================================

export const ESTILOS = {
  titulo: { tamano: 34, alto: 44, peso: '700', color: '#0b1220' },
  subtitulo: { tamano: 16, alto: 24, peso: '400', color: '#475569' },
  modulo: { tamano: 20, alto: 28, peso: '700', color: '#0b1220' },
  moduloSub: { tamano: 13, alto: 19, peso: '400', color: '#64748b' },
  tema: { tamano: 14, alto: 21, peso: '400', color: '#1e293b' },
  meta: { tamano: 12, alto: 18, peso: '400', color: '#94a3b8' },
  numero: { tamano: 15, alto: 20, peso: '700', color: '#ffffff' },
}

// Medidas del lienzo. Todo en un sitio para poder afinarlo sin buscar números
// sueltos por el código.
export const LIENZO = {
  ancho: 1240,
  margen: 56,
  ejeX: 96, // centro del eje vertical y de los círculos de módulo
  radio: 22,
  sangriaTema: 148, // dónde empieza el texto de un tema
  huecoTrasCabecera: 28,
  huecoEntreModulos: 34,
  huecoTrasModulo: 14,
}

// Corta un texto en líneas que caben en `maxAncho`. Una palabra más larga que el
// ancho disponible se queda sola en su línea (partirla por la mitad se lee
// peor que dejarla salir un poco).
export function envolver(texto, maxAncho, medir, estilo = 'tema') {
  const limpio = String(texto ?? '').trim().replace(/\s+/g, ' ')
  if (!limpio) return []
  const palabras = limpio.split(' ')
  const lineas = []
  let actual = ''
  for (const p of palabras) {
    const tentativa = actual ? `${actual} ${p}` : p
    if (actual && medir(tentativa, estilo) > maxAncho) {
      lineas.push(actual)
      actual = p
    } else {
      actual = tentativa
    }
  }
  if (actual) lineas.push(actual)
  return lineas
}

// Qué módulos y temas entran, según lo que el grupo tenga oculto. `ocultas` es el
// mismo objeto que maneja la visibilidad por grupo ({ módulos, temas }); sin él,
// entra el temario completo.
export function modulosVisibles(modulos, ocultas = null) {
  const modulosOcultos = new Set(ocultas?.modulos || [])
  const temasOcultos = new Set(ocultas?.temas || [])
  return (modulos || [])
    .filter((f) => f && !modulosOcultos.has(f.id))
    .map((f) => ({ ...f, temas: (f.temas || []).filter((t) => !temasOcultos.has(t.id)) }))
    // Un módulo que se queda sin temas visibles no se dibuja: un círculo con un
    // título y nada debajo parece un error de la imagen.
    .filter((f) => f.temas.length > 0)
}

// Compone la imagen. Devuelve { ancho, alto, elementos }, y los elementos ya
// llevan coordenadas absolutas: el canvas no calcula nada.
export function componerTemario({
  modulos = [],
  ocultas = null,
  academia = '',
  grupo = '',
  fecha = '',
  medir,
  lienzo = LIENZO,
} = {}) {
  if (typeof medir !== 'function') {
    throw new Error('componerTemario necesita una función medir(texto, estilo).')
  }
  const L = { ...LIENZO, ...lienzo }
  const visibles = modulosVisibles(modulos, ocultas)
  const elementos = []
  const anchoTema = L.ancho - L.sangriaTema - L.margen
  const anchoModulo = L.ancho - L.ejeX - L.radio - 24 - L.margen

  let y = L.margen

  // --- Cabecera ---
  y += ESTILOS.titulo.alto
  elementos.push({ tipo: 'texto', estilo: 'titulo', x: L.margen, y, texto: 'Temario' })

  const sub = [academia, grupo && `Grupo ${grupo}`].filter(Boolean).join(' · ')
  if (sub) {
    y += ESTILOS.subtitulo.alto
    elementos.push({ tipo: 'texto', estilo: 'subtitulo', x: L.margen, y, texto: sub })
  }
  const totalTemas = visibles.reduce((s, f) => s + f.temas.length, 0)
  y += ESTILOS.subtitulo.alto
  elementos.push({
    tipo: 'texto', estilo: 'subtitulo', x: L.margen, y,
    texto: `${visibles.length} ${visibles.length === 1 ? 'modulo' : 'modulos'} · ${totalTemas} ${totalTemas === 1 ? 'tema' : 'temas'}`,
  })

  y += L.huecoTrasCabecera

  // Nada visible: se dice, en vez de devolver una imagen vacía que parece rota.
  if (visibles.length === 0) {
    y += ESTILOS.modulo.alto
    elementos.push({
      tipo: 'texto', estilo: 'modulo', x: L.margen, y,
      texto: 'Este grupo no tiene ningún tema visible.',
    })
    return { ancho: L.ancho, alto: Math.round(y + L.margen), elementos }
  }

  // --- Eje: se reserva su sitio y se dibuja al final, cuando se sabe dónde
  // acaba. Va PRIMERO en la lista para quedar por debajo de los círculos.
  const indiceEje = elementos.length
  elementos.push({ tipo: 'linea', x1: L.ejeX, y1: 0, x2: L.ejeX, y2: 0 })
  let ejeDesde = null
  let ejeHasta = 0

  visibles.forEach((modulo, i) => {
    if (i > 0) y += L.huecoEntreModulos

    const centro = y + L.radio
    if (ejeDesde === null) ejeDesde = centro
    elementos.push({
      tipo: 'circulo', x: L.ejeX, y: centro, r: L.radio,
      color: modulo.color || '#0c5fc4',
      texto: String(modulo.numero ?? i + 1),
    })

    // Título del módulo, a la derecha del círculo y envuelto si hace falta.
    const xModulo = L.ejeX + L.radio + 24
    const lineasModulo = envolver(modulo.titulo, anchoModulo, medir, 'modulo')
    let yModulo = y + ESTILOS.modulo.tamano
    for (const linea of lineasModulo) {
      elementos.push({ tipo: 'texto', estilo: 'modulo', x: xModulo, y: yModulo, texto: linea })
      yModulo += ESTILOS.modulo.alto
    }
    if (modulo.subtitulo) {
      const lineasSub = envolver(modulo.subtitulo, anchoModulo, medir, 'moduloSub')
      for (const linea of lineasSub) {
        elementos.push({ tipo: 'texto', estilo: 'moduloSub', x: xModulo, y: yModulo, texto: linea })
        yModulo += ESTILOS.moduloSub.alto
      }
    }

    // El bloque del módulo mide lo que ocupe su texto o su círculo, lo que sea
    // más alto: si no, un título de una línea dejaría el círculo desbordando.
    y = Math.max(yModulo, centro + L.radio) + L.huecoTrasModulo

    // --- Temas ---
    for (const tema of modulo.temas) {
      const lineas = envolver(tema.titulo, anchoTema, medir, 'tema')
      const num = String(tema.numero ?? '')
      lineas.forEach((linea, j) => {
        y += ESTILOS.tema.alto
        // El número solo en la PRIMERA línea de cada tema: repetido en las
        // continuaciones se leería como si fueran temas distintos.
        if (j === 0 && num) {
          elementos.push({ tipo: 'texto', estilo: 'meta', x: L.sangriaTema - 44, y, texto: num })
        }
        elementos.push({ tipo: 'texto', estilo: 'tema', x: L.sangriaTema, y, texto: linea })
      })
    }
    ejeHasta = y
  })

  // El eje llega hasta el último tema dibujado.
  elementos[indiceEje] = {
    tipo: 'linea', x1: L.ejeX, y1: ejeDesde ?? 0, x2: L.ejeX, y2: ejeHasta,
  }

  // --- Pie ---
  y += L.huecoTrasCabecera + ESTILOS.meta.alto
  const pie = ['PTEM · Plataforma de estudio en Atención Prehospitalaria', fecha]
    .filter(Boolean).join(' · ')
  elementos.push({ tipo: 'texto', estilo: 'meta', x: L.margen, y, texto: pie })

  return { ancho: L.ancho, alto: Math.round(y + L.margen), elementos }
}

// Nombre del archivo. Sale de aquí para que sea predecible y probable, y para
// que no acabe con caracteres que Windows rechaza en un nombre de fichero.
export function nombreArchivo({ academia = '', grupo = '', fecha = '' } = {}) {
  const trozo = (v) => String(v || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
  const partes = ['temario', trozo(academia), trozo(grupo), trozo(fecha)].filter(Boolean)
  return `${partes.join('-')}.png`
}
