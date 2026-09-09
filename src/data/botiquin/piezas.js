// ============================================================
//  Mi Botiquín — aspecto físico de cada pieza
// ------------------------------------------------------------
//  ESTE ES EL ARCHIVO QUE SE EDITA PARA CAMBIAR CÓMO SE VE UN ARTÍCULO.
//
//  El catálogo (`catalogoInicial.js`) dice QUÉ es cada artículo: su nombre, su
//  compartimento, cómo se reconoce y cómo se revisa. Eso es contenido docente.
//  Aquí se declara cómo se ve: su foto, su tamaño real, su grosor y cómo se
//  planta en la bandeja. Están separados a propósito, para poder retocar la
//  escena sin tocar una línea de material académico.
//
//  Un artículo que no aparezca aquí se dibuja como hasta ahora, con la forma
//  procedural de su `preset`. Nada se rompe por no estar en esta tabla.
// ============================================================

import { ORIENTACIONES_PIEZA as ORIENTACIONES } from '../../lib/botiquinModelo.js'

// Un objeto de 12 cm ocupa en la bandeja lo que ocupaban todas las piezas antes
// de que existiera esta tabla. Es la referencia: `tamanoCm: 24` sale al doble,
// `tamanoCm: 6` a la mitad. No es una escala física exacta —la bandeja no mide
// 25 cm de verdad—, es la proporción ENTRE piezas, que es lo que el alumno
// necesita para no confundir un frasco de 6 cm con un estetoscopio de 30.
export const CM_DE_REFERENCIA = 12

// Topes de cordura. Sin ellos, un cero en el tamaño hace desaparecer la pieza y
// un 300 se come la bandeja entera y tapa las demás.
export const TAMANO_CM_MINIMO = 1
export const TAMANO_CM_MAXIMO = 90
export const GROSOR_CM_MAXIMO = 30

// Cuánto puede crecer una pieza respecto a la referencia. La bandeja tiene un
// ancho fijo: pasado este punto, una pieza grande deja de leerse como grande y
// empieza a estorbar.
export const FACTOR_MAXIMO = 3.4

// La lista la manda el módulo puro, que es quien la valida.
export { ORIENTACIONES_PIEZA } from '../../lib/botiquinModelo.js'

// ------------------------------------------------------------
//  Qué significa cada campo
// ------------------------------------------------------------
//  imagen       Ruta bajo public/imagenes/. Debe ser PNG, WebP o AVIF CON
//               FONDO TRANSPARENTE: la transparencia es lo que da la silueta.
//               Si falta el archivo, la pieza cae a su forma procedural.
//
//  tamanoCm     Dimensión REAL del lado mayor del objeto, en centímetros.
//               Un estetoscopio recogido mide unos 30; un sobre de algodón, 8.
//
//  grosorCm     Fondo real del objeto. Es lo que le da volumen: con 0 se queda
//               como una lámina plana (y de canto desaparece). Un frasco tiene
//               6, una gasa en sobre 1, un estetoscopio 2.
//
//  orientacion  'sigue'    de pie, girando para mirar siempre a la cámara.
//                          Sirve para lo que se reconoce de frente: un frasco,
//                          una caja con su etiqueta.
//               'fija'     de pie y quieta. Se ve de canto al rodear la escena,
//                          que es correcto para una pieza con volumen propio.
//               'acostada' tendida en la bandeja, como cuando abres el botiquín
//                          y la ves desde arriba. Es lo suyo para el
//                          estetoscopio, las tijeras, un cabestrillo doblado.
//
//  giro         Grados sobre el eje vertical. En 'acostada' gira la pieza dentro
//               del plano de la bandeja; en 'fija' decide hacia dónde mira. Se
//               ignora en 'sigue', porque ahí manda la cámara.
// ------------------------------------------------------------

export const PIEZAS_BOTIQUIN = {
  // CALIBRACIÓN. `medical/smart/ic-estetoscopio.png` es un activo del catálogo
  // sellado, con licencia declarada en docs/INVENTARIO-ACTIVOS-MEDICOS.md.
  // Sustituir por la foto del estetoscopio real de la academia; ver el README
  // de public/imagenes/botiquin/.
  estetoscopio: {
    imagen: 'medical/smart/ic-estetoscopio.png',
    tamanoCm: 30,
    grosorCm: 2,
    orientacion: 'acostada',
    giro: -12,
  },
}

function numeroEnRango(valor, minimo, maximo, respaldo) {
  const numero = Number(valor)
  if (!Number.isFinite(numero)) return respaldo
  return Math.min(maximo, Math.max(minimo, numero))
}

// Lo que la escena consume. Se normaliza aquí, una sola vez, para que ni el
// dibujado ni el validador tengan que repetir los topes.
export function piezaDeArticulo(id) {
  const pieza = PIEZAS_BOTIQUIN[id]
  if (!pieza || !pieza.imagen) return null
  const tamanoCm = numeroEnRango(pieza.tamanoCm, TAMANO_CM_MINIMO, TAMANO_CM_MAXIMO, CM_DE_REFERENCIA)
  const grosorCm = numeroEnRango(pieza.grosorCm, 0, GROSOR_CM_MAXIMO, 0)
  const orientacion = ORIENTACIONES.includes(pieza.orientacion) ? pieza.orientacion : 'sigue'
  return {
    imagen: pieza.imagen,
    tamanoCm,
    grosorCm,
    orientacion,
    giro: numeroEnRango(pieza.giro, -180, 180, 0),
    // Cuánto se agranda respecto a la referencia, ya con el tope aplicado.
    factor: Math.min(FACTOR_MAXIMO, tamanoCm / CM_DE_REFERENCIA),
    // El grosor viaja en proporción al ALTO de la pieza, porque la geometría se
    // construye con alto 1 y se escala después: así 2 cm de grosor sobre 30 cm
    // de alto salen igual de gruesos aquí que a cualquier otro tamaño.
    grosorRelativo: grosorCm > 0 ? grosorCm / tamanoCm : 0,
  }
}
