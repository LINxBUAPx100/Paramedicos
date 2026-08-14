// ============================================================
//  Pruebas del PINTOR del temario
// ------------------------------------------------------------
//  El modulo puro decide y este pinta, pero «pintar» tiene sus propias formas
//  de salir mal: un fondo que no se rellena (PNG transparente), un elemento que
//  no se dibuja, o —la peor— medir con una fuente y pintar con otra, que
//  desplazaria todos los saltos de linea.
//
//  Se prueba con un contexto de canvas FALSO que apunta lo que se le pide. No
//  comprueba pixeles; comprueba que se dan las ordenes correctas.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import { dibujarTemario } from '../src/lib/pintarTemario.js'
import { componerTemario, ESTILOS } from '../src/lib/exportarTemario.js'

function ctxFalso() {
  const registro = { rects: [], textos: [], arcos: [], lineas: [], fuentes: [], transform: null }
  return {
    registro,
    set font(v) { registro.fuentes.push(v); registro._font = v },
    get font() { return registro._font },
    fillStyle: '', strokeStyle: '', lineWidth: 0,
    textAlign: '', textBaseline: '',
    setTransform: (...a) => { registro.transform = a },
    fillRect: (x, y, w, h) => registro.rects.push({ x, y, w, h, color: null }),
    fillText: (texto, x, y) => registro.textos.push({ texto, x, y, fuente: registro._font }),
    beginPath: () => {}, stroke: () => {}, fill: () => {},
    arc: (x, y, r) => registro.arcos.push({ x, y, r }),
    moveTo: (x, y) => registro.lineas.push({ x1: x, y1: y }),
    lineTo: (x, y) => { const l = registro.lineas[registro.lineas.length - 1]; if (l) { l.x2 = x; l.y2 = y } },
  }
}

const medir = (texto, estilo = 'tema') =>
  String(texto).length * (ESTILOS[estilo]?.tamano ?? 14) * 0.55

const FASES = [{
  id: 'f1', numero: 1, titulo: 'Fundamentos', subtitulo: 'Bases', color: '#0c5fc4',
  temas: [{ id: 't1', numero: '1.1', titulo: 'Sistema de urgencias' }],
}]

function pintar(extra = {}) {
  const ctx = ctxFalso()
  const canvas = { getContext: () => ctx, width: 0, height: 0 }
  const comp = componerTemario({ fases: FASES, medir, academia: 'AEP', ...extra })
  dibujarTemario(canvas, comp)
  return { ctx, canvas, comp }
}

test('rellena el fondo: un PNG transparente se ve fatal pegado en cualquier sitio', () => {
  const { ctx, comp } = pintar()
  const fondo = ctx.registro.rects[0]
  assert.ok(fondo, 'debe haber un fillRect de fondo')
  assert.deepEqual([fondo.x, fondo.y, fondo.w, fondo.h], [0, 0, comp.ancho, comp.alto])
})

test('el lienzo se escala para no salir borroso, y la escala se aplica', () => {
  const { ctx, canvas, comp } = pintar()
  assert.ok(canvas.width > comp.ancho, 'el canvas real es mayor que el lienzo logico')
  assert.equal(canvas.width / comp.ancho, canvas.height / comp.alto, 'misma escala en los dos ejes')
  // Sin setTransform, el dibujo saldria en la esquina a tamaño logico.
  assert.ok(ctx.registro.transform, 'debe fijar la transformacion')
  assert.equal(ctx.registro.transform[0], canvas.width / comp.ancho)
})

test('pinta cada elemento que compuso el modulo puro', () => {
  const { ctx, comp } = pintar()
  const textosComp = comp.elementos.filter((e) => e.tipo === 'texto')
  const circulosComp = comp.elementos.filter((e) => e.tipo === 'circulo')
  // Los textos de los circulos tambien salen por fillText, de ahi el >=.
  assert.ok(ctx.registro.textos.length >= textosComp.length)
  assert.equal(ctx.registro.arcos.length, circulosComp.length)
  assert.equal(ctx.registro.lineas.length, comp.elementos.filter((e) => e.tipo === 'linea').length)
  // Y en las coordenadas que dijo el modulo, sin recalcular nada.
  for (const t of textosComp) {
    assert.ok(
      ctx.registro.textos.some((p) => p.texto === t.texto && p.x === t.x && p.y === t.y),
      `falta el texto "${t.texto}" en (${t.x}, ${t.y})`
    )
  }
})

test('mide y pinta con LA MISMA fuente', () => {
  // Si se construyeran por separado, los saltos de linea caerian donde no toca.
  const { ctx } = pintar()
  const delTema = ctx.registro.textos.find((t) => t.texto === 'Sistema de urgencias')
  const e = ESTILOS.tema
  assert.ok(delTema.fuente.includes(`${e.tamano}px`), `fuente inesperada: ${delTema.fuente}`)
  assert.ok(delTema.fuente.startsWith(e.peso), `peso inesperado: ${delTema.fuente}`)
})

test('el numero del circulo se centra y devuelve la alineacion a su sitio', () => {
  const { ctx } = pintar()
  // Si no se restaurara, todo el texto posterior saldria centrado.
  assert.equal(ctx.textAlign, 'left')
  assert.equal(ctx.textBaseline, 'alphabetic')
})

test('un temario vacio tambien produce una imagen valida', () => {
  const { ctx, comp } = pintar({ ocultas: { fases: ['f1'], temas: [] } })
  assert.ok(comp.alto > 0)
  assert.ok(ctx.registro.rects.length > 0, 'con su fondo')
  assert.ok(ctx.registro.textos.some((t) => /no tiene ningún tema visible/.test(t.texto)))
})
