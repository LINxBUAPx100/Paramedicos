// ============================================================
//  Recepción — interpretar lo que se teclea en el buscador (lógica PURA)
// ------------------------------------------------------------
//  ESTE MÓDULO ES UNA COSTURA, y conviene decir de qué.
//
//  El dueño del producto avisó de que la lógica de matrículas va a cambiar a
//  fondo. Si el buscador supiera qué es una matrícula —dos letras y siete
//  dígitos— ese cambio obligaría a tocar el buscador, la ficha, el reporte y
//  las pruebas de los tres. Así que el buscador NO lo sabe: pregunta aquí, y
//  aquí se pregunta a un ADAPTADOR que se puede sustituir entero.
//
//  El día que la matrícula cambie de forma se escribe otro adaptador y se pasa
//  como argumento. Nada más de la pantalla de recepción se entera.
//
//  QUÉ RESUELVE, dicho en concreto. En un mostrador nadie teclea `RE0000001`:
//  teclea `1`, o `0000001`, o el apellido, o el correo si lo tiene a mano. La
//  recepcionista no debería tener que acordarse de las dos letras de su propia
//  academia —ya lo decidió `lib/matriculas.js`: su prefijo es contexto, no una
//  decisión de cada búsqueda—. Aquí se completa sola.
//
//  Y un escáner USB de códigos ES UN TECLADO: escribe y pulsa Enter. Si el
//  buscador entiende lo que llega por teclado, el escáner funciona el día que
//  se compre, sin driver y sin integración (trabajo O6).
//
//  Módulo PURO: sin React, sin Firebase, sin reloj propio.
// ============================================================
import {
  esMatriculaConocida, esMatriculaValida, formatearMatriculaHeredada, prefijoDeAcademia,
} from '../matriculas.js'

/**
 * El adaptador de matrícula VIGENTE.
 *
 * Tres funciones y nada más. Quien cambie el formato de matrícula escribe otro
 * objeto con estas tres y lo pasa a `interpretarClave`.
 *
 *  · `parece(texto)`    ¿esto tiene pinta de ser una matrícula, aunque venga
 *                       incompleta? Es deliberadamente generoso: prefiere
 *                       intentar una búsqueda de más a exigir el formato exacto.
 *  · `completar(texto, academiaId)`  lo tecleado, llevado a su forma canónica.
 *                       `null` si no se puede.
 *  · `esValida(texto)`  la forma canónica, ya completa.
 */
export const adaptadorMatricula = {
  // Solo dígitos (`15`, `0411115`) o dos letras y dígitos (`RE1`, `RE0000001`,
  // el formato anterior). Un nombre nunca cae aquí; un correo tampoco.
  parece: (texto) => /^[A-Za-z]{0,2}\s*\d{1,7}$/.test(String(texto || '').trim()),

  completar: (texto, academiaId) => {
    const limpio = String(texto || '').trim().toUpperCase().replace(/\s+/g, '')
    const m = /^([A-Z]{0,2})(\d{1,7})$/.exec(limpio)
    if (!m) return null
    const [, letras, digitos] = m

    // FORMATO VIGENTE: siete dígitos que significan algo (generación, mes, día,
    // orden). NO SE COMPLETAN CON CEROS A LA IZQUIERDA: rellenar «15» hasta
    // «0000015» ya no produce la matrícula de nadie, produce un número con otra
    // generación y otro mes. Quien teclea menos de siete dígitos está buscando
    // por un trozo, y eso lo resuelve `interpretarClave` con una búsqueda
    // parcial, no inventando el resto.
    if (!letras && esMatriculaValida(digitos)) return digitos
    if (!letras) return null

    // FORMATO ANTERIOR (`RE0000001`): se sigue completando mientras queden
    // matrículas viejas en el padrón. Aquí sí tiene sentido rellenar con ceros
    // porque el número era correlativo y no codificaba nada.
    const numero = Number(digitos)
    if (!Number.isInteger(numero) || numero < 1) return null
    const prefijo = letras.length === 2 ? letras : prefijoDeAcademia(academiaId)
    if (prefijo.length < 2) return null
    try { return formatearMatriculaHeredada(prefijo, numero) } catch { return null }
  },

  // Vale cualquiera de los dos formatos: durante la migración conviven.
  esValida: esMatriculaConocida,
}

/** ¿Tiene forma de correo? Misma prueba que usa el alta de recepción. */
const pareceCorreo = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(t || '').trim())

/**
 * ¿Tiene forma de teléfono? Diez dígitos o más, con separadores o sin ellos.
 *
 * El primer carácter admite `(` además de `+` y un dígito: en México se dicta
 * y se escribe «(222) 225-6586» constantemente, y una prueba cazó que así
 * empezado se clasificaba como si fuera un nombre.
 */
const pareceTelefono = (t) => {
  const bruto = String(t || '').trim()
  if (!/^[+(\d][\d\s()+-]*$/.test(bruto)) return false
  return bruto.replace(/\D/g, '').length >= 10
}

/**
 * Qué se acaba de teclear, y con qué hay que buscarlo.
 *
 * Devuelve SIEMPRE un objeto, nunca lanza: un buscador que revienta con lo que
 * le escriben es un buscador roto, y aquí hay alguien esperando en el mostrador.
 *
 * @returns {{tipo: string, consulta: string, original: string, aviso: string}}
 *   tipo: 'vacio' | 'matricula' | 'correo' | 'telefono' | 'nombre'
 *   consulta: el valor YA normalizado con el que se va a buscar.
 *   aviso: frase para la persona cuando se ha completado algo por ella
 *          («se buscó RE0000001»), o '' si no hubo nada que avisar.
 */
export function interpretarClave(texto, { academiaId = '', adaptador = adaptadorMatricula } = {}) {
  const original = String(texto || '').trim()
  if (!original) return { tipo: 'vacio', consulta: '', original, aviso: '' }

  // El orden importa: la matrícula primero porque es lo que más se teclea y lo
  // único que se puede completar. Un correo nunca pasa `parece()`.
  if (adaptador.parece(original)) {
    const completa = adaptador.completar(original, academiaId)
    if (completa && adaptador.esValida(completa)) {
      return {
        tipo: 'matricula',
        consulta: completa,
        original,
        aviso: completa === original.toUpperCase() ? '' : `Se buscó la matrícula ${completa}.`,
      }
    }
  }

  // Dígitos sueltos que no llegan a una matrícula completa: quien está en el
  // mostrador teclea «15» porque es lo que le dictan. Antes eso se completaba
  // con ceros y daba la matrícula de otra persona; ahora se busca por el trozo
  // —en memoria, sobre el padrón ya traído— y se enseñan las coincidencias.
  if (/^\d{1,6}$/.test(original)) {
    return { tipo: 'matricula-parcial', consulta: original, original, aviso: `Se buscó por las matrículas que contienen ${original}.` }
  }

  if (pareceCorreo(original)) {
    return { tipo: 'correo', consulta: original.toLowerCase(), original, aviso: '' }
  }

  if (pareceTelefono(original)) {
    // Solo dígitos: es como lo guarda el alta de recepción.
    return { tipo: 'telefono', consulta: original.replace(/\D/g, ''), original, aviso: '' }
  }

  return { tipo: 'nombre', consulta: normalizarTexto(original), original, aviso: '' }
}

/**
 * Texto comparable: sin acentos, sin mayúsculas, sin espacios de más.
 *
 * Buscar «Martinez» y no encontrar a «Martínez» es el fallo más aburrido y más
 * frecuente de un buscador en español.
 */
export function normalizarTexto(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * ¿Este alumno responde a esta búsqueda?
 *
 * Se aplica SOBRE LA LISTA YA TRAÍDA, no sustituye a la consulta de Firestore:
 * la matrícula y el correo se buscan en el servidor (son exactos e indexables);
 * el nombre se filtra aquí porque Firestore no sabe buscar «contiene».
 */
export function coincide(alumno, interpretacion) {
  if (!alumno || !interpretacion || interpretacion.tipo === 'vacio') return false
  const { tipo, consulta } = interpretacion
  if (tipo === 'matricula') return String(alumno.matricula || '').toUpperCase() === consulta
  if (tipo === 'matricula-parcial') return String(alumno.matricula || '').includes(consulta)
  if (tipo === 'correo') return String(alumno.email || '').toLowerCase() === consulta
  if (tipo === 'telefono') {
    const suyo = String(alumno.telefono || '').replace(/\D/g, '')
    return Boolean(suyo) && suyo.endsWith(consulta)
  }
  // Nombre: todas las palabras tecleadas, en cualquier orden. Quien escribe
  // «ana perez» espera encontrar a «Pérez Solís, Ana María».
  const nombre = normalizarTexto(alumno.nombre)
  return consulta.split(' ').filter(Boolean).every((palabra) => nombre.includes(palabra))
}

/**
 * Los candidatos, ordenados por lo útil que es cada uno.
 *
 * Primero quien coincide exacto, después el resto por nombre. Sin esto, una
 * búsqueda por apellido devuelve el orden en que Firestore quiso.
 */
export function ordenarCandidatos(alumnos, interpretacion) {
  const lista = (alumnos || []).filter(Boolean)
  const exacto = (a) => (
    interpretacion?.tipo === 'matricula' || interpretacion?.tipo === 'correo'
      || interpretacion?.tipo === 'matricula-parcial'
      ? (coincide(a, interpretacion) ? 0 : 1)
      : 1
  )
  return lista.slice().sort((a, b) => (
    exacto(a) - exacto(b)
    || normalizarTexto(a.nombre).localeCompare(normalizarTexto(b.nombre), 'es')
  ))
}

/**
 * Qué enseñarle a quien buscó y no encontró.
 *
 * NO es un error: es el caso normal del primer día de inscripciones, y por eso
 * devuelve también `ofreceAlta`. Una pantalla que solo dice «no existe» obliga
 * a salir a otra para dar de alta, y eso en un mostrador se paga en minutos.
 */
export function sinResultados(interpretacion) {
  const t = interpretacion?.tipo
  if (t === 'vacio' || !t) return { titulo: '', texto: '', ofreceAlta: false }
  if (t === 'matricula') {
    return {
      titulo: `Ninguna persona con la matrícula ${interpretacion.consulta}`,
      texto: 'Puede que aún no esté dada de alta, o que la matrícula sea de otra academia.',
      ofreceAlta: true,
    }
  }
  if (t === 'matricula-parcial') {
    return {
      titulo: `Ninguna matrícula contiene «${interpretacion.consulta}»`,
      texto: 'Prueba con la matrícula completa (son siete dígitos), con su apellido o con su correo.',
      ofreceAlta: true,
    }
  }
  if (t === 'correo' || t === 'telefono') {
    return {
      titulo: `Nadie registrado con ese ${t === 'correo' ? 'correo' : 'teléfono'}`,
      texto: 'Comprueba el dato, o da de alta a la persona si es nueva.',
      ofreceAlta: true,
    }
  }
  return {
    titulo: 'Ningún alumno se llama así',
    texto: 'Prueba con un apellido, con su matrícula o con su correo.',
    ofreceAlta: true,
  }
}
