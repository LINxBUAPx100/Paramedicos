// ============================================================
//  Matrículas de alumno
// ------------------------------------------------------------
//  Las reglas que fijó el dueño del producto el 2 de septiembre de 2026:
//  individuales por academia, con las dos primeras letras de la academia como
//  dato interno, recepción no las escribe nunca, y al trasladar a alguien
//  cambian las letras —y la matrícula entera si el número ya está ocupado allí—.
//
//  LO QUE ESTAS PRUEBAS PROTEGEN, por orden de gravedad:
//
//   1. Que NUNCA se emitan dos matrículas iguales en la misma academia. Es lo
//      único que la matrícula existe para garantizar; si falla, el historial de
//      dos personas se convierte en el de una.
//   2. Que un número liberado NO se reparta otra vez. Dar de baja a alguien no
//      puede hacer que su matrícula acabe en otro expediente.
//   3. Que el prefijo salga de algo INMUTABLE. Si dependiera del nombre de la
//      academia, renombrarla convertiría en mentira las credenciales impresas.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DIGITOS, prefijoDeAcademia, formatearMatricula, partirMatricula, esMatriculaValida,
  siguienteNumero, numeroOcupado, matriculaAlTrasladar, explicarTraslado,
} from '../src/lib/matriculas.js'

// ---------- el prefijo ----------

test('las dos letras salen del código, ignorando puntos y guiones', () => {
  assert.equal(prefijoDeAcademia('RES-2026'), 'RE')
  assert.equal(prefijoDeAcademia('R.E.S.C.A.T.E.'), 'RE')
  assert.equal(prefijoDeAcademia('enfermeria-2027'), 'EN')
})

test('los acentos no cuentan como otra letra', () => {
  assert.equal(prefijoDeAcademia('Ángeles'), 'AN')
  assert.equal(prefijoDeAcademia('Óscar-1'), 'OS')
})

test('un código casi sin letras da un prefijo que se nota', () => {
  // `XX` es feo a propósito: se ve raro y se pregunta, que es mejor que un
  // prefijo inventado con aspecto de correcto.
  assert.equal(prefijoDeAcademia('1-2'), 'XX')
  assert.equal(prefijoDeAcademia('A-1'), 'AX')
  assert.equal(prefijoDeAcademia(''), 'XX')
  assert.equal(prefijoDeAcademia(null), 'XX')
})

// ---------- forma ----------

test('la matrícula son dos letras y siete dígitos', () => {
  assert.equal(formatearMatricula('RES-2026', 1), 'RE0000001')
  assert.equal(formatearMatricula('RES-2026', 1234567), 'RE1234567')
  assert.deepEqual(partirMatricula('RE0000042'), { prefijo: 'RE', numero: 42 })
  assert.equal(esMatriculaValida('RE0000042'), true)
})

test('lo que no tiene la forma no se acepta como matrícula', () => {
  for (const malo of ['', null, 'RE42', '0000042', 'R00000042', 'RE00000042', 'RE-000042', 'rex000042']) {
    assert.equal(esMatriculaValida(malo), false, `«${malo}» no es una matrícula`)
  }
  // Minúsculas sí, porque es la misma matrícula escrita a mano.
  assert.deepEqual(partirMatricula('re0000042'), { prefijo: 'RE', numero: 42 })
})

test('no se emite el cero ni un número que no quepa', () => {
  assert.throws(() => formatearMatricula('RE', 0), /entero positivo/)
  assert.throws(() => formatearMatricula('RE', -3), /entero positivo/)
  assert.throws(() => formatearMatricula('RE', 10 ** DIGITOS), /dígitos/)
})

// ---------- el siguiente número ----------

test('el siguiente es uno más que el mayor emitido', () => {
  assert.equal(siguienteNumero([]), 1)
  assert.equal(siguienteNumero(['RE0000001', 'RE0000002']), 3)
})

test('UN NÚMERO LIBERADO NO SE REPARTE OTRA VEZ', () => {
  // Se fue el 2. El siguiente sigue siendo el 4, no el 2: reutilizarlo metería
  // el historial de quien se fue en el expediente de quien llega.
  assert.equal(siguienteNumero(['RE0000001', 'RE0000003']), 4)
})

test('cuenta por número, no por prefijo: la academia ya la eligió quien pregunta', () => {
  // Si en la lista quedara una matrícula de otra academia —un traslado a medio
  // hacer— el número sigue estando tomado en ESTA lista, y eso es lo que
  // importa para no duplicar.
  assert.equal(siguienteNumero(['XX0000009']), 10)
  assert.equal(numeroOcupado(9, ['XX0000009']), true)
  assert.equal(numeroOcupado(9, ['RE0000008']), false)
})

test('las matrículas ilegibles no rompen el cálculo', () => {
  assert.equal(siguienteNumero(['RE0000005', null, '', 'basura', 'RE-7']), 6)
})

// ---------- traslados ----------

test('TRASLADO: cambian las dos letras y conserva su número', () => {
  const r = matriculaAlTrasladar({
    matricula: 'RE0000042', academiaDestino: 'ENF-2027', usadasEnDestino: ['EN0000001'],
  })
  assert.equal(r.matricula, 'EN0000042')
  assert.equal(r.motivo, 'prefijo')
  // Conservar el número es deliberado: es el dato que el alumno se sabe.
  assert.equal(r.numero, 42)
})

test('TRASLADO CON NÚMERO OCUPADO: cambia la matrícula ENTERA', () => {
  // El caso que la regla existe para cubrir. Dos personas con el mismo número
  // en la misma academia es exactamente lo que no puede pasar.
  const r = matriculaAlTrasladar({
    matricula: 'RE0000042', academiaDestino: 'ENF-2027',
    usadasEnDestino: ['EN0000042', 'EN0000043'],
  })
  assert.equal(r.motivo, 'numero-ocupado')
  assert.equal(r.matricula, 'EN0000044')
  assert.notEqual(partirMatricula(r.matricula).numero, 42)
})

test('trasladar dentro de la misma academia no cambia nada', () => {
  const r = matriculaAlTrasladar({
    matricula: 'RE0000042', academiaDestino: 'RES-2026', usadasEnDestino: ['RE0000042'],
  })
  // Su propia matrícula está en la lista de usadas, y aun así conserva la suya:
  // el número está ocupado POR ÉL. (Quien llama pasa la lista de la academia
  // de destino; si es la suya, la suya está dentro.)
  assert.equal(r.matricula, 'RE0000042')
  assert.equal(r.motivo, 'sin-cambio')
})

test('quien no tenía matrícula recibe una nueva', () => {
  for (const sin of [null, '', 'basura']) {
    const r = matriculaAlTrasladar({ matricula: sin, academiaDestino: 'RES-2026', usadasEnDestino: ['RE0000007'] })
    assert.equal(r.matricula, 'RE0000008')
    assert.equal(r.motivo, 'nueva')
  }
})

test('un traslado NUNCA produce una matrícula que ya existe allí', () => {
  // La propiedad que de verdad importa, comprobada sobre muchos casos en vez
  // de sobre uno elegido a mano.
  const usadas = []
  for (let i = 1; i <= 50; i += 1) usadas.push(formatearMatricula('EN', i))
  for (let n = 1; n <= 60; n += 1) {
    const r = matriculaAlTrasladar({
      matricula: formatearMatricula('RE', n), academiaDestino: 'ENF-2027', usadasEnDestino: usadas,
    })
    assert.equal(usadas.includes(r.matricula), false,
      `el traslado del ${n} produjo ${r.matricula}, que ya estaba emitida`)
  }
})

test('el motivo se explica en palabras que se le puedan decir al alumno', () => {
  const prefijo = matriculaAlTrasladar({ matricula: 'RE0000042', academiaDestino: 'ENF-2027', usadasEnDestino: [] })
  assert.match(explicarTraslado(prefijo, 'RE0000042'), /conserva su número/i)

  const ocupado = matriculaAlTrasladar({
    matricula: 'RE0000042', academiaDestino: 'ENF-2027', usadasEnDestino: ['EN0000042'],
  })
  assert.match(explicarTraslado(ocupado, 'RE0000042'), /ya estaba ocupado/i)
})

// ---------- el cableado con Firestore ----------

import { readFileSync } from 'node:fs'
const CAPA = readFileSync(new URL('../src/lib/firebase/matriculas.js', import.meta.url), 'utf8')
const REGLAS = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')

test('el número se reserva en una TRANSACCIÓN, no contando alumnos', () => {
  // Contar alumnos tiene dos fallos: cuesta una lectura por alumno y reutiliza
  // el número de quien se dio de baja.
  assert.match(CAPA, /runTransaction/, 'la reserva dejó de ser transaccional')
  assert.match(CAPA, /ultimaMatricula: siguiente/, 'el contador dejó de avanzar')
})

test('LA REGLA IMPIDE QUE EL CONTADOR BAJE', () => {
  // Es lo único que evita que un cliente manipulado rebobine el contador y
  // haga que la siguiente alta repita una matrícula ya emitida.
  const bloque = REGLAS.slice(REGLAS.indexOf('match /contadores/'))
  const hasta = bloque.slice(0, bloque.indexOf('}\n\n'))
  assert.match(hasta, /ultimaMatricula > resource\.data\.ultimaMatricula/,
    'el contador puede retroceder, y con él repetirse una matrícula')
  assert.match(hasta, /allow delete: if false/,
    'borrar el contador reiniciaría la numeración de una academia')
})

test('el traslado solo conserva el número si está POR ENCIMA del contador', () => {
  // Dentro de una transacción no se puede consultar la lista de matrículas del
  // destino, así que se conserva el número solo cuando es seguro. Cambiar un
  // número de más no rompe nada; repetirlo, sí.
  assert.match(CAPA, /actual\.numero > ultimo/,
    'el traslado dejó de comprobar el contador del destino antes de conservar el número')
})

test('el DIRECTOR puede emitir una matrícula, nunca reescribirla', () => {
  // Reescribir una ya emitida sería la forma de darle a dos personas el mismo
  // número desde la interfaz, sin pasar por el contador. Cambiarla solo ocurre
  // en un traslado, y los traslados son del super-admin.
  const bloque = REGLAS.slice(REGLAS.indexOf("hasOnly(['rol', 'estado', 'grupoId'"))
  const trozo = bloque.slice(0, 1400)
  assert.match(trozo, /'matricula'\]/, 'el director no puede emitir matrícula')
  assert.match(trozo, /resource\.data\.get\('matricula', ''\) == ''/,
    'el director puede reescribir una matrícula ya emitida')
  // Y la FORMA se comprueba en la regla: una regla que confía en que el
  // cliente formatee bien no comprueba nada.
  assert.match(trozo, /matches\('\^\[A-Z\]\{2\}\[0-9\]\{7\}\$'\)/,
    'la regla dejó de exigir la forma de la matrícula')
})

test('la pantalla ofrece emitirla solo a los alumnos que no la tienen', () => {
  const GESTION = readFileSync(new URL('../src/components/panel/GestionMiembros.jsx', import.meta.url), 'utf8')
  assert.match(GESTION, /emitirMatricula/, 'desapareció el botón de emitir')
  assert.match(GESTION, /m\.rol !== 'alumno'/,
    'la matrícula se ofrece a quien no es alumno: es el número de expediente de quien cursa')
  assert.match(GESTION, /esMatriculaValida\(m\.matricula\)/,
    'la columna dejó de distinguir una matrícula válida de un campo con basura')
})
