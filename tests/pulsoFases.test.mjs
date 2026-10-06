import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import {
  puntoEnTrazo, trazoEcg, colorDeAvance, dominioDeTema, nivelDeTema, NIVELES_DOMINIO,
  programarTarjeta, etiquetaIntervalo, tarjetasVencidas, sesionDeRepaso, claveTarjeta,
  triageDeHoy, turnoDeHoy, aReanudar,
} from '../src/lib/pulsoModelo.js'
import { validarCaso, casosParaElAlumno, casosParaElPersonal, decidir, resumenRecorrido } from '../src/lib/casosModelo.js'
import { CASOS } from '../src/data/casos/index.js'
import CONTENIDO from '../src/data/contenido/index.js'
import { FOTO_POR_MODULO } from '../src/data/fotosModulo.js'

const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8')

// ---------- Entrega 1: el punto sigue la línea ----------

test('el punto del monitor cae SIEMPRE sobre un vértice o segmento del trazo', () => {
  const n = 6
  const alto = 40
  // Los vértices que dibuja trazoEcg, en coordenadas absolutas.
  const nums = trazoEcg(n, alto).replace(/[ML]/g, ' ').trim().split(/\s+/).map(Number)
  const vertices = []
  for (let i = 0; i < nums.length; i += 2) vertices.push([nums[i], nums[i + 1]])
  for (let p = 0; p <= n; p += 0.037) {
    const { x, y } = puntoEnTrazo(n, p, alto)
    const k = vertices.findIndex((v, i) => i > 0 && v[0] >= x - 1e-9 && vertices[i - 1][0] <= x + 1e-9)
    const [x0, y0] = vertices[k - 1]
    const [x1, y1] = vertices[k]
    const esperado = x1 === x0 ? y0 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0)
    assert.ok(Math.abs(esperado - y) < 0.05, `en p=${p.toFixed(3)} el punto se sale de la línea (${y} ≠ ${esperado})`)
  }
})

test('el color del punto avanza de rojo a verde', () => {
  assert.equal(colorDeAvance(0), 'var(--urgencia)')
  assert.equal(colorDeAvance(0.5), 'var(--alerta)')
  assert.equal(colorDeAvance(0.8), 'var(--primario)')
  assert.equal(colorDeAvance(1), 'var(--exito-solido)')
})

test('la animación del botón Reanudar es lenta', () => {
  const css = leer('src/styles/pulso.css')
  const regla = css.match(/\.btn--reanudar:hover \.pl-latido path \{ animation: pl-traza ([\d.]+)s/)
  assert.ok(regla && Number(regla[1]) >= 2, 'el latido del botón debe durar al menos 2 s')
})

// ---------- Entrega 3: dominio ----------

test('el dominio exige cada nivel anterior', () => {
  const bien = { aciertos: 4, total: 5 }
  const mal = { aciertos: 2, total: 5 }
  assert.equal(dominioDeTema({}), 0)
  assert.equal(dominioDeTema({ leido: true }), 1)
  assert.equal(dominioDeTema({ leido: true, quiz: mal }), 1)
  assert.equal(dominioDeTema({ leido: true, quiz: bien }), 2)
  assert.equal(dominioDeTema({ quiz: bien, aplicada: bien }), 0, 'sin leer no hay nivel')
  assert.equal(dominioDeTema({ leido: true, quiz: bien, aplicada: bien }), 3)
  assert.equal(dominioDeTema({ leido: true, quiz: bien, aplicada: bien, tarjetas: [{ intervalo: 30 }, { intervalo: 5 }] }), 3)
  assert.equal(dominioDeTema({ leido: true, quiz: bien, aplicada: bien, tarjetas: [{ intervalo: 30 }, { intervalo: 22 }] }), 4)
  assert.equal(NIVELES_DOMINIO[4], 'Domina')
})

test('«Domina» exige que TODAS las tarjetas del tema estén consolidadas', () => {
  const base = { leidos: { t: true }, quizzes: { t: { aciertos: 5, total: 5 } }, aplicadas: { t: { aciertos: 3, total: 3 } } }
  const srs = { [claveTarjeta('t', 'a')]: { intervalo: 30 }, [claveTarjeta('t', 'b')]: { intervalo: 40 } }
  assert.equal(nivelDeTema('t', { ...base, srs }, 3), 3, 'faltaba una tarjeta por ver')
  assert.equal(nivelDeTema('t', { ...base, srs }, 2), 4)
})

// ---------- Entrega 4: repaso espaciado ----------

test('«otra vez» vuelve en un minuto y los aciertos alargan el intervalo', () => {
  const ahora = 1_000_000
  const otra = programarTarjeta(null, 0, ahora)
  assert.equal(otra.intervalo, 0)
  assert.equal(otra.vence, ahora + 60_000)
  assert.equal(otra.fallos, 1)
  const bien = programarTarjeta(null, 2, ahora)
  assert.equal(bien.intervalo, 3)
  const bien2 = programarTarjeta(bien, 2, ahora)
  assert.ok(bien2.intervalo > bien.intervalo)
  const facil = programarTarjeta(bien, 3, ahora)
  assert.ok(facil.intervalo > bien2.intervalo, 'fácil debe espaciar más que bien')
  assert.equal(etiquetaIntervalo(null, 0), '1 min')
  assert.equal(etiquetaIntervalo(null, 1), '1 día')
})

test('la sesión pone primero las vencidas y limita las nuevas', () => {
  const ahora = 10_000
  const tarjetas = ['a', 'b', 'c', 'd', 'e'].map((k) => ({ clave: k }))
  const srs = { a: { vence: 9_000 }, b: { vence: 99_999 }, c: { vence: 5_000 } }
  const s = sesionDeRepaso(tarjetas, srs, { ahora, nuevas: 1 })
  assert.deepEqual(s.map((t) => t.clave), ['c', 'a', 'd'])
  assert.deepEqual(tarjetasVencidas(srs, ahora).sort(), ['a', 'c'])
})

test('el triage rojo cuenta tarjetas vencidas solo de temas visibles, y el turno las pone primero', () => {
  const modulos = [{ id: 'm1', numero: 1, temas: [{ id: 'm1-a-x', numero: '1.1', titulo: 'X' }] }]
  const srs = { [claveTarjeta('m1-a-x', 'p')]: { vence: 0 }, [claveTarjeta('m9-oculto', 'p')]: { vence: 0 } }
  const triage = triageDeHoy({ modulos, srs, ahora: 1 })
  assert.equal(triage.reforzar.vencidas, 1)
  const turno = turnoDeHoy({ reanudar: aReanudar({ modulos }), triage })
  assert.equal(turno[0].id, 'repaso')
  assert.equal(turno[1].id, 'leccion')
  assert.ok(turno.length <= 4)
})

// ---------- Entrega 6: modo llamada ----------

// Caso de FORMA, sin contenido clínico: solo prueba el motor.
const CASO = {
  id: 'caso-forma', titulo: 'Caso de prueba', estado: 'validado',
  temas: ['m3-ep-avdi'], fuentes: [{ nombre: 'Fuente de prueba' }], inicio: 'a',
  nodos: {
    a: { texto: 'Nodo A', opciones: [
      { texto: 'Uno', va: 'b', tipo: 'correcta', retro: 'Bien' },
      { texto: 'Dos', va: 'f2', tipo: 'riesgo', retro: 'Mal', tema: 'm3-ep-avdi' },
    ] },
    b: { texto: 'Nodo B', opciones: [
      { texto: 'Tres', va: 'f1', tipo: 'aceptable', retro: 'Pasa', tema: 'm3-ep-avdi' },
      { texto: 'Cuatro', va: 'f1', tipo: 'correcta', retro: 'Bien' },
    ] },
    f1: { texto: 'Fin bueno', fin: true, desenlace: 'favorable' },
    f2: { texto: 'Fin malo', fin: true, desenlace: 'desfavorable' },
  },
}

test('el validador acepta un caso bien formado y señala los defectos', () => {
  assert.deepEqual(validarCaso(CASO), [])
  const roto = { ...CASO, fuentes: [], nodos: { ...CASO.nodos, suelto: { texto: 'x', fin: true, desenlace: 'favorable' } } }
  const errores = validarCaso(roto)
  assert.ok(errores.some((e) => /fuentes/.test(e)))
  assert.ok(errores.some((e) => /no se alcanza/.test(e)))
})

test('al alumno solo llegan casos validados, bien formados y de temas visibles', () => {
  assert.equal(casosParaElAlumno([{ ...CASO, estado: 'borrador' }]).length, 0)
  assert.equal(casosParaElAlumno([{ ...CASO, estado: 'en_revision' }]).length, 0)
  assert.equal(casosParaElAlumno([CASO]).length, 1)
  assert.equal(casosParaElAlumno([CASO], { temaVisible: () => false }).length, 0)
})

test('el motor recorre el caso y resume lo que hay que repasar', () => {
  let r = decidir(CASO, 'a', 0, [], 1500)
  r = decidir(CASO, r.nodoId, 0, r.registro, 2500)
  assert.equal(r.nodoId, 'f1')
  const res = resumenRecorrido(CASO, r.registro, r.nodoId)
  assert.equal(res.desenlace, 'favorable')
  assert.equal(res.correctas, 1)
  assert.equal(res.aceptables, 1)
  assert.equal(res.segundos, 4)
  assert.deepEqual(res.repasar, ['m3-ep-avdi'])
})

// Hasta el 05-10-2026 esta prueba exigía CASOS vacío. Desde entonces hay
// borradores redactados a petición del usuario, y lo que se protege es lo de
// fondo: la IA no aprueba casos (CLAUDE.md §4) y el alumno no ve borradores.
test('ningún caso clínico llega al alumno sin la academia', () => {
  for (const c of CASOS) {
    assert.ok(['borrador', 'en_revision'].includes(c.estado),
      `${c.id}: validar o publicar un caso es decisión de un docente, no de la IA`)
  }
  assert.deepEqual(casosParaElAlumno(CASOS), [], 'un borrador no debe llegar al alumno')
  assert.equal(casosParaElPersonal(CASOS).length, CASOS.length, 'el personal ve todos para revisarlos')
})

test('cada caso está bien formado y se apoya en lecciones reales', () => {
  for (const c of CASOS) {
    assert.deepEqual(validarCaso(c), [], c.id)
    for (const t of c.temas) {
      assert.ok(CONTENIDO[t]?.secciones?.length, `${c.id}: cita ${t}, que no tiene lección`)
    }
    // Cada decisión remite a una lección del propio caso: así el alumno puede
    // repasar justo lo que sostiene esa decisión, y no otra cosa.
    for (const [id, n] of Object.entries(c.nodos)) {
      for (const o of n.opciones || []) {
        assert.ok(o.tema && c.temas.includes(o.tema), `${c.id}/${id}: «${o.texto}» remite a un tema que el caso no cita`)
      }
    }
  }
})

// ---------- Integración y garantías ----------

test('las fotos de los módulos existen en los dos anchos y formatos', () => {
  for (const { nombre } of Object.values(FOTO_POR_MODULO)) {
    for (const w of [480, 800]) {
      for (const ext of ['webp', 'avif']) {
        assert.ok(existsSync(new URL(`../public/imagenes/temario/${nombre}-${w}.${ext}`, import.meta.url)), `falta ${nombre}-${w}.${ext}`)
      }
    }
  }
})

test('la tarjeta del módulo: la flecha reanuda y la tarjeta abre el módulo', () => {
  const baraja = leer('src/components/ModulosCarrusel.jsx')
  assert.match(baraja, /to=\{destinoFlecha\}/)
  assert.match(baraja, /esActivo \? navigate\(`\/modulo\/\$\{modulo\.id\}`\)/)
})

test('los datos locales de Pulso NO se suben a Firestore', () => {
  const ctx = leer('src/context/ProgressContext.jsx')
  const escritura = ctx.slice(ctx.indexOf('fs.setDoc('), ctx.indexOf('{ merge: true }'))
  for (const campo of ['lecturas', 'aplicadas', 'srs', 'repasoRapido', 'oral', 'mochila', 'preferencias']) {
    assert.ok(!new RegExp(`\\b${campo}\\b`).test(escritura), `«${campo}» rompería la regla hasOnly de progreso/{uid}`)
  }
  const reglas = leer('firestore.rules')
  assert.match(reglas, /hasOnly\(\s*\['leidos', 'quizzes', 'examenes', 'actividad', 'racha', 'updatedAt'\]\)/,
    'si la regla cambió, revisa si ya se pueden sincronizar los datos de Pulso')
})

test('la caché sin conexión es opcional y se borra al cerrar sesión', () => {
  const init = leer('src/lib/firebase/init.js')
  assert.match(init, /if \(!conCacheSinConexion\) return getFirestore\(app\)/, 'la caché persistente no puede ser la opción por defecto')
  const auth = leer('src/lib/firebase/auth.js')
  const salir = auth.slice(auth.indexOf('export async function salir'))
  assert.match(salir, /clearIndexedDbPersistence\(db\)/)
  assert.match(salir, /removeItem\(CLAVE_SIN_CONEXION\)/)
  const descargas = leer('src/lib/descargas.js')
  assert.match(descargas, /if \(anterior && anterior !== dueno\) await borrarDescargasDe\(anterior\)/)
  assert.match(leer('public/sw.js'), /req\.mode === 'navigate'[\s\S]*await fetch\(req\)/, 'la navegación debe ir a la red primero')
})

test('el modo oral no inventa respuestas', () => {
  const bloques = leer('src/components/pulso/BloquesPulso.jsx')
  assert.match(bloques, /actual\.respuesta \?/, 'la respuesta solo se enseña si el tema la trae escrita')
})
