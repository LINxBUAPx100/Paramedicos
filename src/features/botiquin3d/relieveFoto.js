// ============================================================
//  Relieve de una foto — del canal alfa a un sólido con grosor
// ------------------------------------------------------------
//  Un recorte plano se ve como cartón: de canto desaparece y nunca parece un
//  objeto. Aquí se traza el CONTORNO REAL del canal alfa de la foto y se
//  extruye, así que el sólido conserva la silueta de la pieza —el arco de un
//  estetoscopio, el pico de un frasco— en vez de ser una caja con una foto
//  encima.
//
//  Módulo sin React y sin three.js entre sus importaciones: recibe `THREE` como
//  argumento, igual que el resto de la escena, y el trazado es puro sobre un
//  mapa de bits, así que se prueba sin navegador.
// ============================================================

// Trabajar sobre la foto a tamaño completo daría miles de vértices por pieza.
// 160 px de lado mayor conserva la silueta y deja un contorno manejable.
export const MUESTREO_POR_DEFECTO = 160

// Cuánta opacidad cuenta como «aquí hay pieza». Las fotos recortadas traen un
// halo de píxeles semitransparentes que no forma parte del objeto.
export const UMBRAL_ALFA = 0.55

// PRESUPUESTOS. No son una optimización: son lo que impide que una imagen mala
// cuelgue la aplicación.
//
// Costó un cuelgue entero. Con un dibujo de línea —trazos de uno o dos
// píxeles— el borde de la silueta es larguísimo y el polígono sale con miles de
// puntos. Ese polígono entra en ExtrudeGeometry, que se queda triangulando, y
// como todo esto vive en el hilo de la interfaz la pantalla se congela: ni un
// error en consola ni nada que reintentar.
//
// Pasado cualquiera de estos topes no se dibuja el relieve: se devuelve null y
// la pieza se queda como lámina. Una lámina se ve peor que un sólido; una
// pantalla colgada no se ve.
export const MAX_ARISTAS = 60000
export const MAX_PUNTOS_CONTORNO = 400
export const MAX_HUECOS = 10
export const MAX_PUNTOS_HUECO = 120

// ---------- 1. Máscara ----------

// De los datos RGBA a una máscara booleana. Va aparte del trazado para poder
// probar el trazado con máscaras escritas a mano.
export function mascaraDeAlfa(datos, ancho, alto, umbral = UMBRAL_ALFA) {
  const limite = Math.round(umbral * 255)
  const mascara = new Uint8Array(ancho * alto)
  for (let i = 0; i < ancho * alto; i += 1) mascara[i] = datos[i * 4 + 3] >= limite ? 1 : 0
  return mascara
}

// ---------- 2. Regiones ----------

// Componentes conexas por vecindad de 4. Devuelve el mapa de etiquetas y el
// tamaño de cada región, que es lo que decide cuál es la pieza y cuáles son
// motas sueltas del recorte.
function regiones(mascara, ancho, alto, valor) {
  const etiquetas = new Int32Array(ancho * alto).fill(-1)
  const tamanos = []
  const pila = []
  for (let inicio = 0; inicio < mascara.length; inicio += 1) {
    if (mascara[inicio] !== valor || etiquetas[inicio] !== -1) continue
    const etiqueta = tamanos.length
    let cuenta = 0
    pila.push(inicio)
    etiquetas[inicio] = etiqueta
    while (pila.length) {
      const indice = pila.pop()
      cuenta += 1
      const x = indice % ancho
      const y = (indice - x) / ancho
      if (x > 0 && mascara[indice - 1] === valor && etiquetas[indice - 1] === -1) {
        etiquetas[indice - 1] = etiqueta
        pila.push(indice - 1)
      }
      if (x < ancho - 1 && mascara[indice + 1] === valor && etiquetas[indice + 1] === -1) {
        etiquetas[indice + 1] = etiqueta
        pila.push(indice + 1)
      }
      if (y > 0 && mascara[indice - ancho] === valor && etiquetas[indice - ancho] === -1) {
        etiquetas[indice - ancho] = etiqueta
        pila.push(indice - ancho)
      }
      if (y < alto - 1 && mascara[indice + ancho] === valor && etiquetas[indice + ancho] === -1) {
        etiquetas[indice + ancho] = etiqueta
        pila.push(indice + ancho)
      }
    }
    tamanos.push(cuenta)
  }
  return { etiquetas, tamanos }
}

// ---------- 3. Anillos de la frontera ----------
//
//  El primer intento seguía la pared girando según las celdas vecinas, y con
//  siluetas grandes no volvía nunca al punto de partida: se quedaba dando
//  vueltas hasta agotar el tope. Este método no puede hacer eso.
//
//  Se ENUMERAN las aristas de la frontera —el lado de un píxel de la pieza que
//  da al fondo— y luego se enlazan. Cada arista se usa una vez y desaparece,
//  así que el recorrido termina por construcción, y salen todos los anillos de
//  una: el exterior y los agujeros, que se distinguen por el signo de su área.

const CLAVE = 100000

// Anillos de una región, en coordenadas de esquina de píxel. Devuelve null si
// la frontera es tan larga que no vale la pena seguir (un dibujo de línea).
export function anillosDeRegion(pertenece, ancho, alto, maxAristas = MAX_ARISTAS) {
  const dentro = (x, y) => (x < 0 || y < 0 || x >= ancho || y >= alto ? false : pertenece(x, y))

  // Las cuatro aristas se recorren en el mismo sentido alrededor de cada celda
  // (con la Y de la imagen, hacia abajo). Al enlazarlas, los anillos exteriores
  // quedan con área positiva y los agujeros con área negativa.
  const salidas = new Map()
  let aristas = 0
  const anadir = (x1, y1, x2, y2) => {
    const clave = x1 * CLAVE + y1
    const lista = salidas.get(clave)
    if (lista) lista.push([x2, y2])
    else salidas.set(clave, [[x2, y2]])
    aristas += 1
  }
  for (let y = 0; y < alto; y += 1) {
    for (let x = 0; x < ancho; x += 1) {
      if (!dentro(x, y)) continue
      if (!dentro(x, y - 1)) anadir(x, y, x + 1, y)
      if (!dentro(x + 1, y)) anadir(x + 1, y, x + 1, y + 1)
      if (!dentro(x, y + 1)) anadir(x + 1, y + 1, x, y + 1)
      if (!dentro(x - 1, y)) anadir(x, y + 1, x, y)
      if (aristas > maxAristas) return null
    }
  }
  if (!aristas) return []

  const anillos = []
  for (const [claveInicio, destinos] of salidas) {
    while (destinos.length) {
      const inicioX = Math.floor(claveInicio / CLAVE)
      const inicioY = claveInicio - inicioX * CLAVE
      const anillo = [[inicioX, inicioY]]
      let [x, y] = destinos.pop()
      let previoX = inicioX
      let previoY = inicioY
      // Cada paso consume su arista, así que el bucle no puede repetirse más
      // veces que aristas haya.
      for (let paso = 0; paso < aristas + 2; paso += 1) {
        anillo.push([x, y])
        if (x === inicioX && y === inicioY) break
        const lista = salidas.get(x * CLAVE + y)
        if (!lista || !lista.length) break
        let elegido = 0
        if (lista.length > 1) {
          // Vértice donde dos partes de la pieza se tocan en diagonal. Se
          // escoge el giro más cerrado hacia la derecha para no coser dos
          // anillos distintos en un ocho, que el triangulador no sabe rellenar.
          const dx = x - previoX
          const dy = y - previoY
          let mejor = -Infinity
          lista.forEach(([sx, sy], indice) => {
            const ex = sx - x
            const ey = sy - y
            const giro = dx * ey - dy * ex
            const avance = dx * ex + dy * ey
            const puntuacion = giro < 0 ? 2 : giro > 0 ? 0 : 1
            const total = puntuacion * 10 + avance
            if (total > mejor) { mejor = total; elegido = indice }
          })
        }
        const [siguienteX, siguienteY] = lista.splice(elegido, 1)[0]
        previoX = x
        previoY = y
        x = siguienteX
        y = siguienteY
      }
      if (anillo.length >= 4) anillos.push(anillo)
    }
  }
  return anillos
}

// Área con signo (fórmula del cordón de zapato). El signo dice si el anillo es
// el borde exterior de la pieza o uno de sus agujeros.
function areaConSigno(anillo) {
  let suma = 0
  for (let i = 0; i < anillo.length; i += 1) {
    const [x1, y1] = anillo[i]
    const [x2, y2] = anillo[(i + 1) % anillo.length]
    suma += x1 * y2 - x2 * y1
  }
  return suma / 2
}

// ---------- 4. Simplificación ----------

// Douglas-Peucker. Un contorno de rejilla es una escalera de miles de puntos:
// sin esto una sola pieza costaría más vértices que el resto de la escena.
export function simplificar(puntos, tolerancia) {
  if (puntos.length < 3) return puntos
  const marcados = new Uint8Array(puntos.length)
  marcados[0] = 1
  marcados[puntos.length - 1] = 1
  const pila = [[0, puntos.length - 1]]
  while (pila.length) {
    const [inicio, fin] = pila.pop()
    const [ax, ay] = puntos[inicio]
    const [bx, by] = puntos[fin]
    const dx = bx - ax
    const dy = by - ay
    const norma = Math.hypot(dx, dy) || 1
    let peor = -1
    let distanciaPeor = 0
    for (let i = inicio + 1; i < fin; i += 1) {
      const [px, py] = puntos[i]
      const distancia = Math.abs((px - ax) * dy - (py - ay) * dx) / norma
      if (distancia > distanciaPeor) { distanciaPeor = distancia; peor = i }
    }
    if (peor > 0 && distanciaPeor > tolerancia) {
      marcados[peor] = 1
      pila.push([inicio, peor], [peor, fin])
    }
  }
  return puntos.filter((_, i) => marcados[i])
}

// Douglas-Peucker sobre un ANILLO. No se puede aplicar tal cual: el algoritmo
// ancla el primer y el último punto, y en un anillo son el mismo sitio, así que
// la cuerda mide cero, ningún punto se separa de ella y el contorno entero
// colapsa a dos puntos. (Eso dejó al botiquín sin una sola pieza.)
//
// El anillo se corta en dos cadenas por su punto más lejano y se simplifica
// cada una por separado.
export function simplificarAnillo(anillo, tolerancia) {
  const puntos = anillo.slice()
  const [px, py] = puntos[0]
  const ultimo = puntos[puntos.length - 1]
  if (puntos.length > 1 && ultimo[0] === px && ultimo[1] === py) puntos.pop()
  if (puntos.length < 5) return puntos

  let lejano = 1
  let distanciaMayor = -1
  for (let i = 1; i < puntos.length; i += 1) {
    const distancia = Math.hypot(puntos[i][0] - px, puntos[i][1] - py)
    if (distancia > distanciaMayor) { distanciaMayor = distancia; lejano = i }
  }

  const ida = simplificar(puntos.slice(0, lejano + 1), tolerancia)
  const vuelta = simplificar(puntos.slice(lejano).concat([puntos[0]]), tolerancia)
  // Los extremos se repiten en las dos mitades: el punto de corte y el de
  // partida.
  return ida.concat(vuelta.slice(1, -1))
}

// Simplifica subiendo la tolerancia hasta caber en el presupuesto. Un contorno
// de rejilla siempre se puede reducir; lo que no se puede es entregarlo con
// miles de puntos al triangulador.
function simplificarHasta(anillo, maxPuntos, tolerancia) {
  if (!anillo) return null
  let salida = simplificarAnillo(anillo, tolerancia)
  let paso = tolerancia
  for (let intento = 0; intento < 6 && salida.length > maxPuntos; intento += 1) {
    paso *= 2
    salida = simplificarAnillo(anillo, paso)
  }
  return salida.length > maxPuntos ? null : salida
}

// ---------- 5. Silueta completa ----------

// Borde exterior de la pieza mayor más sus huecos internos: el arco de un
// estetoscopio o el ojo de una tijera son agujeros de verdad, y rellenarlos
// delata que la pieza es una calcomanía.
export function siluetaDeMascara(mascara, ancho, alto, opciones = {}) {
  const minimoRelativo = opciones.minimoRelativo ?? 0.004
  // 0.75 px sobre la imagen muestreada: con 1.2 un círculo salía de 24 lados y
  // se notaba el facetado. Si una silueta complicada no cabe en el presupuesto,
  // simplificarHasta sube la tolerancia sola.
  const tolerancia = opciones.tolerancia ?? 0.75
  const maxContorno = opciones.maxPuntosContorno ?? MAX_PUNTOS_CONTORNO

  const piezas = regiones(mascara, ancho, alto, 1)
  if (!piezas.tamanos.length) return null
  let mayor = 0
  for (let i = 1; i < piezas.tamanos.length; i += 1) {
    if (piezas.tamanos[i] > piezas.tamanos[mayor]) mayor = i
  }

  const anillos = anillosDeRegion((x, y) => piezas.etiquetas[y * ancho + x] === mayor, ancho, alto)
  if (!anillos || !anillos.length) return null

  // El exterior es el anillo de mayor área; los de signo contrario son sus
  // agujeros.
  const conArea = anillos.map((anillo) => ({ anillo, area: areaConSigno(anillo) }))
  conArea.sort((a, b) => Math.abs(b.area) - Math.abs(a.area))
  const exterior = conArea[0]
  const contorno = simplificarHasta(exterior.anillo, maxContorno, tolerancia)
  if (!contorno || contorno.length < 3) return null

  const minimo = Math.max(12, minimoRelativo * ancho * alto)
  const huecos = []
  for (const candidato of conArea.slice(1)) {
    if (huecos.length >= MAX_HUECOS) break
    // Mismo signo que el exterior: es otra parte de la pieza, no un agujero.
    if (Math.sign(candidato.area) === Math.sign(exterior.area)) continue
    if (Math.abs(candidato.area) < minimo) continue
    const anillo = simplificarHasta(candidato.anillo, MAX_PUNTOS_HUECO, tolerancia)
    // Un hueco que no cabe en su presupuesto se descarta solo: la pieza sigue
    // siendo válida, simplemente queda ese agujero relleno.
    if (anillo && anillo.length >= 3) huecos.push(anillo)
  }

  return { contorno, huecos, ancho, alto }
}

// ---------- 6. Geometría ----------

// La silueta en píxeles pasa a una geometría de ALTO 1 centrada en el origen:
// la escena la escala después por el tamaño real declarado en centímetros, sin
// tener que saber nada de la foto.
export function geometriaDeSilueta(THREE, silueta, opciones = {}) {
  const { contorno, huecos, ancho, alto } = silueta
  const grosor = Math.max(0.002, opciones.grosor ?? 0.12)

  // La Y se invierte: en la imagen crece hacia abajo y en la escena hacia
  // arriba.
  const aEscena = ([px, py]) => new THREE.Vector2((px - ancho / 2) / alto, (alto / 2 - py) / alto)

  const forma = new THREE.Shape(contorno.map(aEscena))
  for (const hueco of huecos) forma.holes.push(new THREE.Path(hueco.map(aEscena)))

  const geometria = new THREE.ExtrudeGeometry(forma, {
    depth: grosor,
    bevelEnabled: false,
    curveSegments: 1,
  })
  // Centrada en su propio grosor, para que girarla no la desplace.
  geometria.translate(0, 0, -grosor / 2)

  // Las UV que ExtrudeGeometry da a las tapas son las coordenadas XY crudas, no
  // un 0-1: sin normalizarlas, la foto sale desplazada y recortada.
  const posicion = geometria.attributes.position
  const uv = geometria.attributes.uv
  const caja = new THREE.Box3().setFromBufferAttribute(posicion)
  const anchoCaja = caja.max.x - caja.min.x || 1
  const altoCaja = caja.max.y - caja.min.y || 1
  for (let i = 0; i < posicion.count; i += 1) {
    uv.setXY(
      i,
      (posicion.getX(i) - caja.min.x) / anchoCaja,
      (posicion.getY(i) - caja.min.y) / altoCaja,
    )
  }
  uv.needsUpdate = true
  geometria.computeVertexNormals()
  return geometria
}

// Puente con el navegador: la única parte que necesita canvas. Devuelve null
// cuando la foto no da una silueta usable, y quien llama se queda con el plano.
export function relieveDeImagen(THREE, imagen, opciones = {}) {
  const muestreo = opciones.muestreo ?? MUESTREO_POR_DEFECTO
  const anchoNatural = imagen?.naturalWidth || imagen?.width || 0
  const altoNatural = imagen?.naturalHeight || imagen?.height || 0
  if (!anchoNatural || !altoNatural) return null

  const factor = Math.min(1, muestreo / Math.max(anchoNatural, altoNatural))
  const ancho = Math.max(8, Math.round(anchoNatural * factor))
  const alto = Math.max(8, Math.round(altoNatural * factor))

  let datos = null
  try {
    const lienzo = document.createElement('canvas')
    lienzo.width = ancho
    lienzo.height = alto
    const contexto = lienzo.getContext('2d', { willReadFrequently: true })
    if (!contexto) return null
    contexto.drawImage(imagen, 0, 0, ancho, alto)
    datos = contexto.getImageData(0, 0, ancho, alto).data
  } catch {
    // Un lienzo contaminado por una imagen de otro origen no se puede leer. No
    // es un error que contarle al alumno: se cae al plano.
    return null
  }

  const mascara = mascaraDeAlfa(datos, ancho, alto, opciones.umbral ?? UMBRAL_ALFA)
  // Una foto sin transparencia da una máscara llena, y su contorno sería el
  // rectángulo de la imagen: justo lo que no se quiere.
  let opacos = 0
  for (let i = 0; i < mascara.length; i += 1) opacos += mascara[i]
  if (opacos > mascara.length * 0.985) return null

  const silueta = siluetaDeMascara(mascara, ancho, alto, opciones)
  if (!silueta) return null

  // La triangulación de una silueta rara puede fallar o salir vacía. Una
  // geometría sin vértices produce límites infinitos, y de ahí salen UV con NaN
  // que ensucian el búfer de la GPU: mejor no entregar nada.
  let geometria = null
  try {
    geometria = geometriaDeSilueta(THREE, silueta, opciones)
  } catch {
    return null
  }
  const cuenta = geometria?.attributes?.position?.count || 0
  if (!cuenta) {
    geometria?.dispose?.()
    return null
  }
  const array = geometria.attributes.position.array
  for (let i = 0; i < array.length; i += 1) {
    if (!Number.isFinite(array[i])) {
      geometria.dispose?.()
      return null
    }
  }
  return geometria
}
