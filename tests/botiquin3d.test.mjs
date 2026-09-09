import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
  CATEGORIAS_BOTIQUIN,
  COMPARTIMENTOS_BOTIQUIN,
  cantidadTotalArticulo,
  etiquetaCantidadArticulo,
  filtrarCatalogoBotiquin,
  problemasDelCatalogoBotiquin,
  RUTA_IMAGEN_BOTIQUIN,
} from '../src/lib/botiquinModelo.js'
import {
  accesoDeArticulo,
  estadosDelCatalogo,
  resumenDeEstados,
} from '../src/lib/botiquinEstados.js'
import {
  anillosDeRegion,
  simplificarAnillo,
  MAX_HUECOS,
  MAX_PUNTOS_CONTORNO,
  MAX_PUNTOS_HUECO,
  mascaraDeAlfa,
  siluetaDeMascara,
  simplificar,
} from '../src/features/botiquin3d/relieveFoto.js'
import {
  CM_DE_REFERENCIA,
  FACTOR_MAXIMO,
  PIEZAS_BOTIQUIN,
  TAMANO_CM_MAXIMO,
  piezaDeArticulo,
} from '../src/data/botiquin/piezas.js'
import {
  CATALOGO_BOTIQUIN_INICIAL,
  VERSION_CATALOGO_BOTIQUIN,
  catalogoBotiquinInicial,
} from '../src/data/botiquin/catalogoInicial.js'

test('el catálogo inicial es ampliable, válido y conserva las cantidades confirmadas', () => {
  const catalogo = catalogoBotiquinInicial()
  assert.equal(VERSION_CATALOGO_BOTIQUIN, 1)
  assert.ok(catalogo.length >= 35)
  assert.equal(problemasDelCatalogoBotiquin(catalogo).length, 0)
  assert.equal(new Set(catalogo.map((item) => item.id)).size, catalogo.length)
  assert.equal(COMPARTIMENTOS_BOTIQUIN.length, 8)
  assert.ok(CATEGORIAS_BOTIQUIN.includes('familia'))

  const gasas = catalogo.find((item) => item.id === 'gasa-esteril-10x10')
  const vendas = catalogo.find((item) => item.id === 'vendas-elasticas')
  const cateteres = catalogo.find((item) => item.id === 'cateteres-venosos-perifericos')
  assert.equal(cantidadTotalArticulo(gasas), 10)
  assert.equal(cantidadTotalArticulo(vendas), 6)
  assert.equal(etiquetaCantidadArticulo(vendas), '6 rollos')
  assert.equal(cantidadTotalArticulo(cateteres), null)
  assert.equal(etiquetaCantidadArticulo(cateteres), 'Cantidad por confirmar')
})

test('el catálogo no incluye una segunda versión de la enseñanza clínica', () => {
  const prohibidas = new Set(['dosis', 'indicaciones', 'contraindicaciones', 'tecnica', 'procedimiento'])
  for (const articulo of CATALOGO_BOTIQUIN_INICIAL) {
    for (const clave of Object.keys(articulo)) {
      assert.equal(prohibidas.has(clave), false, `${articulo.id} contiene el campo clínico ${clave}`)
    }
    assert.ok(articulo.resumen.length > 10)
    assert.ok(Array.isArray(articulo.comoSeRevisa))
  }
})

test('la búsqueda reconoce alias, calibres y medidas', () => {
  const catalogo = catalogoBotiquinInicial()
  assert.deepEqual(
    filtrarCatalogoBotiquin(catalogo, { consulta: 'ambu' }).map((item) => item.id),
    ['bvm'],
  )
  assert.deepEqual(
    filtrarCatalogoBotiquin(catalogo, { consulta: '14g' }).map((item) => item.id),
    ['cateteres-venosos-perifericos'],
  )
  assert.ok(filtrarCatalogoBotiquin(catalogo, { compartimento: 'viaAerea' }).length >= 4)
})

test('el alumno desbloquea con su progreso y el instructor puede revisar todo', () => {
  const catalogo = catalogoBotiquinInicial()
  const torniquete = catalogo.find((item) => item.id === 'torniquete-control-hemorragia')
  const bloqueado = accesoDeArticulo(torniquete, { leidos: {} })
  assert.equal(bloqueado.desbloqueado, false)

  const sinFirma = accesoDeArticulo(torniquete, {
    leidos: { 'm1-pab-hemorragias': true },
    validaciones: {},
  })
  assert.equal(sinFirma.estado, 'silueta')
  assert.equal(sinFirma.muestraFicha, false)

  const instructor = accesoDeArticulo(torniquete, { vistaInstructor: true })
  assert.equal(instructor.estado, 'disponible')
  assert.equal(instructor.muestraFicha, true)

  const estados = estadosDelCatalogo(catalogo, { vistaInstructor: true })
  const resumen = resumenDeEstados(estados)
  assert.equal(resumen.total, catalogo.length)
  assert.equal(resumen.disponible, catalogo.length)
})

test('ruta, menú y superficie inmersiva quedan cableados', async () => {
  const [app, layout, page] = await Promise.all([
    readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Layout.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/BotiquinPage.jsx', import.meta.url), 'utf8'),
  ])
  assert.match(app, /BotiquinPage/)
  assert.match(app, /path="\/botiquin"/)
  assert.match(layout, /to: '\/botiquin'/)
  assert.match(layout, /Mi Botiquín 3D/)
  assert.match(layout, /startsWith\('\/botiquin'\)/)
  assert.match(page, /La ficha identifica; la lección enseña/)
})

test('los módulos React del botiquín tienen JSX válido', async () => {
  const { transformWithEsbuild } = await import('vite')
  const files = [
    '../src/pages/BotiquinPage.jsx',
    '../src/features/botiquin3d/BotiquinScene.jsx',
  ]
  for (const relativePath of files) {
    const url = new URL(relativePath, import.meta.url)
    const source = await readFile(url, 'utf8')
    await transformWithEsbuild(source, url.pathname, {
      loader: 'jsx',
      jsx: 'automatic',
      target: 'es2022',
    })
  }
})

test('una foto por artículo se sirve desde imagenes/ y el preset queda como respaldo', () => {
  for (const buena of ['botiquin/gasa-esteril.png', 'medical/smart/ic-estetoscopio.png', 'botiquin/ferula.webp']) {
    assert.ok(RUTA_IMAGEN_BOTIQUIN.test(buena), buena)
  }
  // Una ruta que se sale del directorio servido, o que pide un archivo que el
  // navegador no sabe pintar, no puede llegar a la pantalla del alumno.
  for (const mala of ['../.env', '/etc/passwd', 'botiquin/../secreto.png', 'Mayus.png', 'nota.txt', 'http://ajeno/x.png']) {
    assert.equal(RUTA_IMAGEN_BOTIQUIN.test(mala), false, mala)
  }

  const catalogo = catalogoBotiquinInicial()
  const conFoto = catalogo.filter((item) => item.visual?.imagen)
  for (const item of conFoto) {
    assert.ok(RUTA_IMAGEN_BOTIQUIN.test(item.visual.imagen), item.id)
    assert.equal(item.visual.tipo, 'imagen')
    // El respaldo procedural no desaparece: si la foto no carga, el artículo
    // sigue estando en la bandeja.
    assert.ok(item.visual.preset, item.id)
  }

  const invalido = catalogo.map((item, indice) => (indice === 0
    ? { ...item, visual: { ...item.visual, imagen: '../fuera.png' } }
    : item))
  assert.ok(problemasDelCatalogoBotiquin(invalido).some((p) => p.includes('imagen')))
})

test('la escena prefiere la foto y deja la forma procedural debajo', async () => {
  const escena = await readFile(new URL('../src/features/botiquin3d/BotiquinScene.jsx', import.meta.url), 'utf8')
  // BASE_URL y no una ruta absoluta: la app se publica en un subdirectorio.
  assert.match(escena, /BASE_URL/)
  assert.match(escena, /recorteFotografico/)
  // Un bloqueo sobre una foto se pinta como silueta, no como fantasma.
  assert.match(escena, /esFoto/)
})

test('la máscara del canal alfa separa la pieza del halo del recorte', () => {
  // Cuatro píxeles: opaco, semitransparente, casi opaco, vacío.
  const datos = new Uint8ClampedArray([
    0, 0, 0, 255,
    0, 0, 0, 90,
    0, 0, 0, 200,
    0, 0, 0, 0,
  ])
  assert.deepEqual([...mascaraDeAlfa(datos, 4, 1)], [1, 0, 1, 0])
  // Con un umbral alto, el píxel de 200 deja de contar como pieza.
  assert.deepEqual([...mascaraDeAlfa(datos, 4, 1, 0.9)], [1, 0, 0, 0])
})

test('la silueta encuentra el contorno y los huecos de verdad de la pieza', () => {
  // Un anillo: el arco de un estetoscopio o el ojo de una tijera. Rellenar ese
  // agujero es lo que delata que la pieza es una calcomanía.
  const lado = 24
  const mascara = new Uint8Array(lado * lado)
  const centro = (lado - 1) / 2
  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const radio = Math.hypot(x - centro, y - centro)
      mascara[y * lado + x] = radio <= 11 && radio >= 5 ? 1 : 0
    }
  }
  const silueta = siluetaDeMascara(mascara, lado, lado, { minimoRelativo: 0.002 })
  assert.ok(silueta, 'debe encontrar la pieza')
  assert.ok(silueta.contorno.length >= 8)
  assert.equal(silueta.huecos.length, 1)

  // Una máscara vacía no da silueta, y quien dibuja se queda con la lámina.
  assert.equal(siluetaDeMascara(new Uint8Array(lado * lado), lado, lado), null)
})

test('la simplificación deja los vértices y tira la escalera de la rejilla', () => {
  const escalera = []
  for (let i = 0; i <= 20; i += 1) escalera.push([i, i % 2 === 0 ? 0 : 0.4])
  // Con tolerancia amplia, una línea con dientes de 0.4 px es una línea.
  assert.equal(simplificar(escalera, 1).length, 2)
  // Con tolerancia fina, los dientes se conservan.
  assert.ok(simplificar(escalera, 0.1).length > 10)
  // Una esquina real no se pierde nunca.
  const ele = [[0, 0], [5, 0], [10, 0], [10, 5], [10, 10]]
  assert.equal(simplificar(ele, 1).length, 3)
})

test('el tamaño y la orientación de una pieza se declaran en centímetros y con topes', () => {
  const estetoscopio = piezaDeArticulo('estetoscopio')
  assert.ok(estetoscopio)
  assert.equal(estetoscopio.orientacion, 'acostada')
  // 30 cm contra la referencia de 12: dos veces y media el tamaño base.
  assert.equal(estetoscopio.factor, 30 / CM_DE_REFERENCIA)
  // 2 cm de grosor sobre 30 cm de alto, en el espacio normalizado de la
  // geometría, que se construye con alto 1.
  assert.equal(estetoscopio.grosorRelativo, 2 / 30)

  // Un artículo que no está en la tabla se dibuja con su forma procedural.
  assert.equal(piezaDeArticulo('gasa-esteril'), null)
  assert.equal(piezaDeArticulo('no-existe'), null)
})

test('una pieza mal declarada no rompe la escena: se recorta a lo posible', () => {
  const original = PIEZAS_BOTIQUIN.estetoscopio
  try {
    // Un tamaño imposible taparía el resto de la bandeja; un cero haría
    // desaparecer la pieza; una orientación inventada no sabría dibujarse.
    PIEZAS_BOTIQUIN.estetoscopio = {
      imagen: 'botiquin/x.png',
      tamanoCm: 5000,
      grosorCm: -3,
      orientacion: 'boca-abajo',
      giro: 999,
    }
    const pieza = piezaDeArticulo('estetoscopio')
    assert.equal(pieza.tamanoCm, TAMANO_CM_MAXIMO)
    assert.equal(pieza.factor, FACTOR_MAXIMO)
    assert.equal(pieza.grosorCm, 0)
    assert.equal(pieza.grosorRelativo, 0)
    assert.equal(pieza.orientacion, 'sigue')
    assert.equal(pieza.giro, 180)
  } finally {
    PIEZAS_BOTIQUIN.estetoscopio = original
  }
})

test('un dibujo de línea no cuelga la escena: se abandona el relieve', () => {
  // REGRESIÓN. Con trazos de uno o dos píxeles, el contorno recorre las aristas
  // de ida y vuelta y salen decenas de miles de puntos. Ese polígono entraba en
  // ExtrudeGeometry, que se quedaba triangulando en el hilo de la interfaz: la
  // pantalla se congelaba sin un solo error en consola.
  const ancho = 120
  const alto = 120
  const mascara = new Uint8Array(ancho * alto)
  // Una espiral cuadrada de un píxel de grosor: mucho borde, nada de área.
  let x = 2
  let y = 2
  let paso = 0
  const pasos = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  let largo = ancho - 6
  while (largo > 2) {
    const [dx, dy] = pasos[paso % 4]
    for (let i = 0; i < largo; i += 1) {
      if (x >= 0 && y >= 0 && x < ancho && y < alto) mascara[y * ancho + x] = 1
      x += dx
      y += dy
    }
    paso += 1
    if (paso % 2 === 0) largo -= 4
  }

  const arranque = Date.now()
  const silueta = siluetaDeMascara(mascara, ancho, alto)
  // Termina, y termina rápido: eso es la mitad de la prueba.
  assert.ok(Date.now() - arranque < 3000, 'el trazado debe terminar solo')
  // Y si devuelve algo, cabe en el presupuesto del triangulador.
  if (silueta) {
    assert.ok(silueta.contorno.length <= MAX_PUNTOS_CONTORNO)
    for (const hueco of silueta.huecos) assert.ok(hueco.length <= MAX_PUNTOS_HUECO)
    assert.ok(silueta.huecos.length <= MAX_HUECOS)
  }
})

test('una silueta sólida sí produce relieve, con el contorno acotado', () => {
  // El caso bueno: una foto recortada de un objeto macizo. Debe pasar, porque
  // si los presupuestos descartaran también esto, la función no serviría para
  // nada.
  const lado = 96
  const mascara = new Uint8Array(lado * lado)
  const centro = (lado - 1) / 2
  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const dx = (x - centro) / 40
      const dy = (y - centro) / 28
      mascara[y * lado + x] = dx * dx + dy * dy <= 1 ? 1 : 0
    }
  }
  const silueta = siluetaDeMascara(mascara, lado, lado)
  assert.ok(silueta, 'una pieza maciza debe dar silueta')
  assert.ok(silueta.contorno.length >= 8)
  assert.ok(silueta.contorno.length <= MAX_PUNTOS_CONTORNO)
})

test('simplificar un anillo cerrado conserva sus esquinas', () => {
  // REGRESIÓN, y esta es la buena. Douglas-Peucker ancla el primer y el último
  // punto; en un anillo son el mismo sitio, así que la cuerda mide cero,
  // ningún punto se separa de ella y el contorno colapsa a dos puntos. El
  // botiquín se quedó sin una sola pieza fotográfica por esto.
  const anillo = []
  const lado = 20
  for (let i = 0; i < lado; i += 1) anillo.push([i, 0])
  for (let i = 0; i < lado; i += 1) anillo.push([lado, i])
  for (let i = lado; i > 0; i -= 1) anillo.push([i, lado])
  for (let i = lado; i > 0; i -= 1) anillo.push([0, i])
  anillo.push([0, 0]) // cerrado, como sale del trazado

  const simple = simplificarAnillo(anillo, 1)
  // Un cuadrado tiene cuatro esquinas, ni dos ni ochenta.
  assert.ok(simple.length >= 4, `colapsó a ${simple.length} puntos`)
  assert.ok(simple.length <= 6)
  for (const esquina of [[0, 0], [lado, 0], [lado, lado], [0, lado]]) {
    assert.ok(
      simple.some(([x, y]) => x === esquina[0] && y === esquina[1]),
      `falta la esquina ${esquina.join(',')}`,
    )
  }
})

test('los anillos de la frontera se cierran y distinguen pieza de agujero', () => {
  // Cada arista se consume una vez, así que el recorrido termina por
  // construcción: es lo que sustituyó al seguimiento de pared que se quedaba
  // dando vueltas con siluetas grandes.
  const uno = anillosDeRegion((x, y) => x === 1 && y === 1, 3, 3)
  assert.equal(uno.length, 1)
  assert.deepEqual(uno[0][0], uno[0][uno[0].length - 1], 'el anillo debe cerrar')

  // Un marco hueco: dos anillos, el de fuera y el del agujero.
  const marco = anillosDeRegion(
    (x, y) => x >= 1 && x <= 5 && y >= 1 && y <= 5 && !(x >= 2 && x <= 4 && y >= 2 && y <= 4),
    7,
    7,
  )
  assert.equal(marco.length, 2)

  // Sin pieza no hay anillos, y quien dibuja se queda con la lámina.
  assert.deepEqual(anillosDeRegion(() => false, 4, 4), [])
})
