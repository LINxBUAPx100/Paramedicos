import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resumenExamen } from '../src/lib/pulsoModelo.js'
import { semaforoDeModulo, atenderPrimero } from '../src/lib/seguimientoModelo.js'

const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8')

// ---------- Examen ----------

test('el resumen del examen cuenta aciertos, sin responder y temas a repasar', () => {
  const preguntas = [
    { correcta: [1], temaId: 'a', temaTitulo: 'A' },
    { correcta: [0, 2], temaId: 'a', temaTitulo: 'A' },
    { correcta: [3], temaId: 'b', temaTitulo: 'B' },
    { correcta: [0], temaId: 'c', temaTitulo: 'C' },
  ]
  const r = resumenExamen(preguntas, { 0: 1, 1: 2, 2: 0 })
  assert.equal(r.aciertos, 2, 'cualquiera de las correctas vale')
  assert.equal(r.sinResponder, 1)
  assert.deepEqual(r.porTema.map((t) => t.temaId), ['b', 'c'], 'solo temas con error, peor primero')
})

test('las tres pantallas de examen usan el modo examen y conservan su registro', () => {
  for (const pagina of ['ExamenModuloPage', 'ExamenPage', 'ExamenUnidadPage']) {
    const src = leer(`src/pages/${pagina}.jsx`)
    assert.match(src, /<ExamenPulso/, `${pagina} debe usar el modo examen`)
    assert.doesNotMatch(src, /<Quiz\b/, `${pagina} volvió al quiz de práctica`)
  }
  assert.match(leer('src/pages/ExamenModuloPage.jsx'), /guardarIntentoModulo/, 'el intento de módulo se sigue guardando')
  assert.match(leer('src/pages/ExamenPage.jsx'), /registrarExamen\(aciertos, total\)/)
})

test('el examen no corrige antes de entregar y avisa una sola vez', () => {
  const src = leer('src/components/pulso/ExamenPulso.jsx')
  assert.match(src, /if \(!avisado\.current\) \{ avisado\.current = true; onComplete/, 'onComplete debe llamarse una sola vez')
  assert.match(src, /beforeunload/, 'salir a medias debe pedir confirmación')
  assert.match(src, /role="alertdialog"/, 'entregar se confirma en la pantalla')
  // Durante la respuesta no se pinta ninguna explicación.
  const respondiendo = src.slice(src.indexOf('return (\n    <div className="pl-examen">'))
  assert.doesNotMatch(respondiendo, /explicacion/, 'no se enseñan explicaciones antes de entregar')
})

// ---------- Progreso ----------

test('reiniciar el progreso se confirma dentro de la pantalla', () => {
  const src = leer('src/pages/ProgresoPage.jsx')
  assert.doesNotMatch(src, /window\.confirm/, 'window.confirm no aparece en todos los visores')
  assert.match(src, /<SignosDeEstudio modulos=\{modulos\}/, 'el mapa usa solo los módulos visibles')
})

// ---------- Panel del profesor ----------

const ALUMNOS = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]
const NOTAS = { a: { m1: { mejor: 90 } }, b: { m1: { mejor: 40 } }, c: { m2: { mejor: 20 } } }

test('el semáforo separa «sin intento» de «por debajo»', () => {
  assert.deepEqual(semaforoDeModulo(ALUMNOS, NOTAS, 'm1'), { aprobados: 1, bajo: 1, sinIntento: 2, total: 4 })
})

test('atender primero: riesgo de menor a mayor, luego sin evidencia', () => {
  assert.deepEqual(atenderPrimero(ALUMNOS, NOTAS).map((f) => f.alumno.id), ['c', 'b', 'd'])
  assert.equal(atenderPrimero(ALUMNOS, NOTAS, 1).length, 1)
})

// ---------- Mi cuenta ----------

test('la credencial respeta la regla de códigos y la cuenta sigue encendiendo Firebase', () => {
  const credencial = leer('src/components/pulso/CredencialUsuario.jsx')
  assert.match(credencial, /puedeVerCodigos \? perfil\.academiaId : 'Tu academia'/)
  assert.match(credencial, /puedeVerCodigos \? perfil\.grupoId : 'Tu grupo'/)
  const cuenta = leer('src/pages/Cuenta.jsx')
  assert.match(cuenta, /encender\(\)/)
  for (const pieza of ['<EditarMisDatos', '<RepetirTutoriales', '<EnviarDiagnostico', 'onClick={salir}', 'canjearCualquierCodigo']) {
    assert.ok(cuenta.includes(pieza), `Mi cuenta perdió ${pieza}`)
  }
})

// ---------- Ficha de fármaco ----------

test('la ficha de fármaco conserva todo su contenido clínico y sus avisos', () => {
  const src = readFileSync(new URL('../src/pages/FarmacosPage.jsx', import.meta.url), 'utf8')
  const ficha = src.slice(src.indexOf('function Ficha({ f })'), src.indexOf('Volver al catálogo'))
  for (const pieza of [
    '<AvisoEditorial estado={f.estadoEditorial} />', '<Aviso />', 'f.dosis.map((d)', 'd.fuente.documento',
    'd.fuente.edicion', 'f.presentaciones', 'numeral {f.numeral}', '<Referencias ids={f.fuente.referencias} />',
    'Las precauciones son selectivas', 'no es una dosis para un paciente', 'AVISO_SIN_DOSIS',
  ]) {
    assert.ok(ficha.includes(pieza), `la ficha perdió «${pieza}»`)
  }
  // Las lecciones siguen filtradas por la visibilidad del grupo.
  assert.match(ficha, /temaVisible\(t\)/)
})

// ---------- Actividad «Ordena» ----------

test('mover un paso recorre a los demás en vez de intercambiar', async () => {
  const { moverA } = await import('../src/lib/pulsoModelo.js')
  assert.deepEqual(moverA([0, 1, 2, 3, 4], 4, 0), [4, 0, 1, 2, 3])
  assert.deepEqual(moverA([0, 1, 2, 3, 4], 0, 2), [1, 2, 0, 3, 4])
  const igual = [0, 1, 2]
  assert.equal(moverA(igual, 1, 1), igual)
  assert.equal(moverA(igual, 0, 9), igual, 'un destino fuera de rango no cambia nada')
})

test('ordenar se puede arrastrar, se anima y sigue teniendo flechas', () => {
  const src = readFileSync(new URL('../src/components/pulso/OrdenarArrastrable.jsx', import.meta.url), 'utf8')
  assert.match(src, /onPointerDown/, 'falta el arrastre')
  assert.match(src, /useLayoutEffect/, 'falta la animación FLIP')
  assert.match(src, /aria-label=\{`Subir/, 'las flechas son la vía de teclado')
  assert.match(src, /aria-live="polite"/, 'cada movimiento se anuncia')
  assert.match(src, /e\.pointerType !== 'mouse' && !e\.target\.closest\('\.ordenar-asa'\)/, 'con el dedo solo desde el asa, para no bloquear el desplazamiento')
})

// ---------- Tarjetas del recorrido ----------

test('las URL que genera la foto de cada módulo apuntan a archivos que existen', async () => {
  const { existsSync } = await import('node:fs')
  const { fotoDeModulo, FOTO_POR_MODULO } = await import('../src/data/fotosModulo.js')
  for (const prefijo of Object.keys(FOTO_POR_MODULO)) {
    const f = fotoDeModulo(`${prefijo}-cualquiera`)
    const urls = [f.src, ...f.srcSet.split(', ').map((x) => x.split(' ')[0]), ...f.srcSetAvif.split(', ').map((x) => x.split(' ')[0])]
    for (const u of urls) {
      const ruta = new URL(`../public/${u.replace(/^\//, '')}`, import.meta.url)
      assert.ok(existsSync(ruta), `la tarjeta pediría ${u}, que no existe`)
    }
  }
  assert.equal(fotoDeModulo('mod-prueba'), null, 'un módulo sin foto usa el degradado')
})

test('la tarjeta centra la flecha y no enseña imágenes rotas', () => {
  const css = readFileSync(new URL('../src/styles/pulso.css', import.meta.url), 'utf8')
  assert.match(css, /\.deck-card \.deck-pie \{ display: grid; grid-template-columns: 1fr auto 1fr;/)
  assert.match(css, /\.deck-pista:focus-visible \{ outline: none; \}/)
  assert.match(css, /\.deck-pista\[data-teclado\]:focus-visible \.deck-card\.is-activo/, 'el foco solo se dibuja al usar el teclado')
  const baraja = readFileSync(new URL('../src/components/ModulosCarrusel.jsx', import.meta.url), 'utf8')
  assert.match(baraja, /onError=/)
})

// ---------- Optimización ----------

test('el dominio agrupa las tarjetas por tema una sola vez', async () => {
  const { srsPorTema, claveTarjeta } = await import('../src/lib/pulsoModelo.js')
  const srs = { [claveTarjeta('m1-a#b', 'x')]: { intervalo: 1 }, [claveTarjeta('m2', 'y')]: { intervalo: 2 } }
  const m = srsPorTema(srs)
  assert.equal(srsPorTema(srs), m, 'la segunda consulta sale de la memoria')
  assert.equal(m.get('m1-a#b').length, 1, 'el tema se corta en el ÚLTIMO #')
  assert.equal(m.get('m2')[0].intervalo, 2)
})

test('el progreso local se guarda agrupado y sin perder lo último al salir', () => {
  const ctx = readFileSync(new URL('../src/context/ProgressContext.jsx', import.meta.url), 'utf8')
  assert.match(ctx, /setTimeout\(escribirLocal, 300\)/)
  assert.match(ctx, /addEventListener\('pagehide', escribirLocal\)/)
  assert.doesNotMatch(ctx, /^import .*descargas\.js/m, 'las descargas no deben viajar en el paquete principal')
})

test('en la baraja todo lo que no está al frente va difuminado', () => {
  const baraja = readFileSync(new URL('../src/components/ModulosCarrusel.jsx', import.meta.url), 'utf8')
  assert.match(baraja, /filter: esActivo \? 'none' : `blur\(\$\{Math\.min\(8, 3\.5 \+ dist \* 1\.5\)\}px\)/)
})
