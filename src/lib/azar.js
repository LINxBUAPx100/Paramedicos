// ============================================================
//  Azar REPRODUCIBLE — un examen que no cambia al refrescar
// ------------------------------------------------------------
//  Hasta ahora todo el barajado salía de `Math.random()` en el momento de
//  pintar. Eso tiene dos consecuencias que se notan justo cuando el examen
//  empieza a contar:
//
//   1. Refrescar la página rebaraja TODO. Con el examen completo daba igual
//      —salían las mismas preguntas en otro orden—, pero en cuanto el examen
//      es un SUBCONJUNTO del banco, refrescar es tirar los dados otra vez:
//      se puede repetir hasta que salga el set fácil. A eso se le llama
//      «reroll» y convierte el examen en una lotería con reintentos.
//   2. No hay forma de reconstruir qué vio el alumno. Si reclama una nota,
//      su examen ya no existe en ninguna parte.
//
//  Con una SEMILLA guardada junto al intento, las dos cosas se arreglan de
//  golpe: la misma semilla produce siempre el mismo examen (refrescar no
//  cambia nada) y basta guardar una cadena corta para poder regenerarlo
//  entero cuando haga falta.
//
//  `Math.random()` no sirve para esto porque no se puede sembrar. mulberry32
//  sí: 32 bits de estado, una línea, y una distribución más que suficiente
//  para barajar preguntas. NO es criptográfico y no pretende serlo — la
//  semilla viaja al cliente de todos modos.
// ============================================================

// Cadena → entero de 32 bits (FNV-1a). La semilla es legible («f1-a3k9-7») para
// que se pueda copiar de un intento y reproducir el examen a mano.
export function semillaANumero(semilla) {
  let h = 0x811c9dc5
  const s = String(semilla ?? '')
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  // >>> 0 para quedarnos en el rango sin signo: Math.imul devuelve con signo y
  // un estado negativo rompe la progresión del generador.
  return h >>> 0
}

// Generador sembrado (mulberry32). Devuelve una función rng() → [0, 1).
export function generador(semilla) {
  let a = semillaANumero(semilla)
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Fisher–Yates con rng inyectado. Copia: nunca muta la entrada.
export function barajarCon(rng, arr) {
  const a = [...(arr || [])]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Los primeros `n` de una baraja: elegir k de N sin repetición.
export function elegirCon(rng, arr, n) {
  const lista = arr || []
  if (n >= lista.length) return barajarCon(rng, lista)
  return barajarCon(rng, lista).slice(0, Math.max(0, n))
}

// Alfabeto sin caracteres confusos (0/O, 1/I/L), el mismo que usan los códigos
// de academia, grupo e invitación: una semilla se dicta y se teclea a mano.
const ABC = 'abcdefghjkmnpqrstuvwxyz23456789'

// Semilla nueva para un intento. Lleva prefijo (p. ej. el módulo) para que al
// leerla en el panel se sepa de qué examen era sin cruzar datos.
//
// `aleatorio` se inyecta en las pruebas; en la app es Math.random, que aquí SÍ
// es lo correcto: lo que no puede ser aleatorio es la baraja DADA la semilla,
// no la semilla misma.
export function nuevaSemilla(prefijo = '', aleatorio = Math.random) {
  const cuerpo = Array.from({ length: 8 }, () => ABC[Math.floor(aleatorio() * ABC.length)]).join('')
  return prefijo ? `${prefijo}-${cuerpo}` : cuerpo
}
