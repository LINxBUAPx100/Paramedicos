// ============================================================
//  Matrículas de alumno — lógica PURA
// ------------------------------------------------------------
//  LAS REGLAS, tal como las fijó el dueño del producto el 2 de septiembre
//  de 2026:
//
//   · La matrícula es **individual por academia**: dos academias pueden tener
//     su alumno número 1 y ninguna se pisa con la otra.
//   · Empieza con **las dos primeras letras de la academia**, y eso es un dato
//     interno: sirve para saber de dónde salió una matrícula al verla suelta.
//   · **Recepción nunca escribe esas dos letras.** Una recepcionista trabaja
//     para una academia, así que su prefijo no es una decisión que tomar en
//     cada alta: es contexto. Pedírselo solo crea la ocasión de equivocarse.
//   · Al **trasladar** a alguien de academia cambian sus dos letras. Y si en la
//     academia de destino ese número ya está ocupado, **cambia la matrícula
//     entera**, no solo el prefijo: dos personas con el mismo número en la
//     misma academia es exactamente lo que la matrícula existe para impedir.
//
//  DE DÓNDE SALEN LAS DOS LETRAS, y por qué importa la respuesta.
//
//  Del CÓDIGO de la academia, no de su nombre. El código es inmutable —es el
//  id del documento— y el nombre no: si el prefijo saliera del nombre, cambiar
//  «R.E.S.C.A.T.E.» por «Academia RESCATE» convertiría en mentira las
//  matrículas ya impresas en credenciales. Un identificador no puede depender
//  de un rótulo editable.
//
//  Módulo PURO: no toca Firestore ni genera números por su cuenta. Quien
//  reserva el número siguiente es una transacción (lib/firebase/matriculas.js);
//  aquí solo se decide qué forma tiene y qué pasa al trasladar.
// ============================================================

// Siete dígitos: sobra para cualquier academia y cabe en una credencial.
export const DIGITOS = 7
export const LARGO_PREFIJO = 2

// Formato completo: dos letras y siete dígitos, sin separador. `RE0000001`.
const PATRON = new RegExp(`^([A-Z]{${LARGO_PREFIJO}})(\\d{${DIGITOS}})$`)

/**
 * Las dos letras de una academia, a partir de su código.
 *
 * Se quitan acentos y todo lo que no sea letra: `R.E.S.C.A.T.E.` y `RES-2026`
 * dan los mismos «RE», que es lo que se espera al verlo escrito.
 *
 * Si el código tuviera menos de dos letras —algo como `1-2`— se rellena con X.
 * Es feo a propósito: una matrícula `XX0000001` se ve rara y se pregunta, que
 * es mejor que un prefijo inventado que parezca correcto.
 */
export function prefijoDeAcademia(academiaId) {
  const letras = String(academiaId || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
  return (letras + 'XX').slice(0, LARGO_PREFIJO)
}

/** `('RE', 1)` → `'RE0000001'`. */
export function formatearMatricula(prefijo, numero) {
  const n = Number(numero)
  if (!Number.isInteger(n) || n < 1) throw new Error('El número de matrícula debe ser un entero positivo.')
  if (n >= 10 ** DIGITOS) throw new Error(`El número de matrícula no cabe en ${DIGITOS} dígitos.`)
  return `${prefijoDeAcademia(prefijo)}${String(n).padStart(DIGITOS, '0')}`
}

/** `'RE0000001'` → `{ prefijo: 'RE', numero: 1 }`. `null` si no tiene la forma. */
export function partirMatricula(matricula) {
  const m = PATRON.exec(String(matricula || '').trim().toUpperCase())
  return m ? { prefijo: m[1], numero: Number(m[2]) } : null
}

export const esMatriculaValida = (m) => partirMatricula(m) !== null

/**
 * El número que sigue en una academia.
 *
 * Se calcula sobre los números YA USADOS y no sobre «cuántos alumnos hay»:
 * dar de baja a alguien no puede liberar su matrícula para otro. Una matrícula
 * reutilizada convierte el historial de dos personas en el de una.
 */
export function siguienteNumero(matriculasUsadas) {
  let mayor = 0
  for (const m of matriculasUsadas || []) {
    const p = partirMatricula(m)
    if (p && p.numero > mayor) mayor = p.numero
  }
  return mayor + 1
}

/** ¿Este número ya está tomado en esta academia? */
export function numeroOcupado(numero, matriculasUsadas) {
  return (matriculasUsadas || []).some((m) => partirMatricula(m)?.numero === numero)
}

/**
 * Qué matrícula le toca a alguien que se traslada de academia.
 *
 * Devuelve también el MOTIVO, porque quien hace el traslado tiene que poder
 * explicárselo al alumno: no es lo mismo «te cambiaron las dos letras» que «te
 * cambió la matrícula entera porque tu número ya estaba ocupado allí».
 *
 * @param {object} arg
 * @param {string} arg.matricula la actual (puede faltar: hay alumnos sin ella).
 * @param {string} arg.academiaDestino código de la academia a la que va.
 * @param {string[]} arg.usadasEnDestino matrículas ya emitidas allí.
 * @returns {{matricula: string, motivo: string, numero: number}}
 *   motivo: 'sin-cambio' · 'prefijo' · 'numero-ocupado' · 'nueva'
 */
export function matriculaAlTrasladar({ matricula, academiaDestino, usadasEnDestino = [] }) {
  const prefijo = prefijoDeAcademia(academiaDestino)
  const actual = partirMatricula(matricula)

  // SU PROPIA MATRÍCULA NO CUENTA COMO OCUPADA.
  //
  // Lo cazó una prueba: al «trasladar» a alguien a la academia en la que ya
  // está, su matrícula aparece en la lista de usadas del destino —porque es
  // suya— y se leía como una colisión, así que se le cambiaba el número sin
  // ningún motivo. Filtrarla es seguro también entre academias: dos personas
  // no pueden compartir prefijo y número en la misma academia, que es
  // justamente lo que este módulo garantiza.
  const propia = String(matricula || '').trim().toUpperCase()
  const usadas = (usadasEnDestino || []).filter(
    (m) => String(m || '').trim().toUpperCase() !== propia
  )

  // Sin matrícula previa —o con una ilegible— se emite una nueva y ya está.
  if (!actual) {
    const numero = siguienteNumero(usadas)
    return { matricula: formatearMatricula(prefijo, numero), numero, motivo: 'nueva' }
  }

  // El número está libre allí: conserva su número y solo cambian las letras.
  // Conservarlo es deliberado: es el dato que el alumno se sabe de memoria.
  if (!numeroOcupado(actual.numero, usadas)) {
    return {
      matricula: formatearMatricula(prefijo, actual.numero),
      numero: actual.numero,
      motivo: actual.prefijo === prefijo ? 'sin-cambio' : 'prefijo',
    }
  }

  // Ocupado: cambia la matrícula ENTERA. No se busca el hueco más bajo libre
  // sino el siguiente al mayor, por el mismo motivo que en `siguienteNumero`:
  // un número que quedó libre porque alguien se fue no se reparte otra vez.
  const numero = siguienteNumero(usadas)
  return { matricula: formatearMatricula(prefijo, numero), numero, motivo: 'numero-ocupado' }
}

/** Frase para la persona que hace el traslado. */
export function explicarTraslado(resultado, matriculaAnterior) {
  switch (resultado?.motivo) {
    case 'sin-cambio':
      return `Conserva su matrícula ${resultado.matricula}.`
    case 'prefijo':
      return `Su matrícula pasa de ${matriculaAnterior} a ${resultado.matricula}: cambian las dos letras de la academia, conserva su número.`
    case 'numero-ocupado':
      return `Su matrícula pasa de ${matriculaAnterior} a ${resultado.matricula}: el número ${partirMatricula(matriculaAnterior)?.numero} ya estaba ocupado en la academia de destino.`
    default:
      return `Se le emite la matrícula ${resultado?.matricula}.`
  }
}
