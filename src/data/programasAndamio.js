// ============================================================
//  Programas de ANDAMIO — Enfermería, TSU, Licenciatura, Protección Civil
// ------------------------------------------------------------
//  QUÉ SON Y QUÉ NO SON
//
//  La academia obtuvo el RVOE y va a impartir carreras nuevas. La arquitectura
//  ya las admite —`TIPOS_PROGRAMA` contempla enfermería, TSU y licenciatura
//  desde antes—, pero eso no se había ejercitado nunca: ningún programa que no
//  fuera TUM había existido de verdad.
//
//  Esto son DOS LECCIONES POR PROGRAMA para comprobar de punta a punta que un
//  programa nuevo funciona: que aparece en el temario, que se abre, que tiene
//  quiz, que guarda progreso y que entra en el aislamiento por grupo. Nada más.
//
//  EL TEXTO ES LOREM IPSUM A PROPÓSITO.
//
//  Podría haber escrito prosa que pareciera médica y se leyera mejor. Sería la
//  peor decisión posible de este archivo: un andamio que parece contenido
//  clínico acaba, tarde o temprano, delante de un alumno o dentro de un examen.
//  El latín no engaña a nadie ni un segundo.
//
//  GARANTÍAS QUE LO MANTIENEN FUERA DEL ALCANCE DE UN ALUMNO
//
//   1. Cada tema nace en `borrador`. La regla `alumnoLeeCurso` exige
//      'publicado', así que Firestore lo deniega aunque todo lo demás fallara.
//   2. Cada tema lleva `esAndamio: true`, y hay pruebas que impiden que un id
//      de andamio se cuele en el temario del alumno o en un banco de examen.
//   3. Sus ids llevan el prefijo `andamio-`: no pueden chocar con ninguno de
//      los 287 temas oficiales de PTEM ni confundirse al leer un registro.
//   4. No tocan `src/data/contenido/` ni el plan oficial. Este archivo NO se
//      importa desde `src/data/index.js`: solo lo lee el script de siembra.
//
//  CUÁNDO SE BORRA: el día que llegue el temario de verdad de cada carrera.
// ============================================================

// Marca única de todo lo que sale de este archivo. Las pruebas la usan para
// distinguir el andamio del contenido real sin listar ids a mano.
export const PREFIJO_ANDAMIO = 'andamio-'

// Bloques de relleno. Se reparten entre las dos lecciones de cada programa para
// que el andamio ejercite los tipos de bloque que la aplicación sabe pintar
// —párrafo, lista, callout, tabla y pasos— y no solo el más simple.
const P1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
const P2 = 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.'
const P3 = 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'

// Construye las dos lecciones de un programa. Son iguales en forma para todos
// los programas a propósito: lo que se prueba es la plomería, no el contenido,
// y una diferencia entre ellas solo añadiría sitios donde equivocarse.
function leccionesDeAndamio(clave, etiqueta) {
  const id = (n) => `${PREFIJO_ANDAMIO}${clave}-t${n}`
  return [
    {
      id: id(1),
      titulo: `${etiqueta} — lección de prueba 1`,
      icono: 'libro',
      duracion: '10 min',
      estado: 'borrador',
      esAndamio: true,
      resumen: 'Lección de relleno para comprobar que este programa funciona. No es contenido académico.',
      objetivos: [
        'Comprobar que la lección se abre y se pinta con el formato de siempre.',
        'Comprobar que el progreso de lectura se guarda para este programa.',
      ],
      secciones: [
        {
          titulo: 'Lorem ipsum',
          bloques: [
            { tipo: 'p', texto: P1 },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Contenido de prueba',
              texto: `Esta lección es un andamio técnico del programa de ${etiqueta}. Su texto no tiene ningún valor académico y se sustituirá por el temario real.`,
            },
            { tipo: 'lista', items: ['Lorem ipsum dolor', 'Consectetur adipiscing', 'Sed do eiusmod tempor'] },
          ],
        },
        {
          titulo: 'Dolor sit amet',
          bloques: [
            { tipo: 'p', texto: P2 },
            {
              tipo: 'tabla',
              cabeceras: ['Lorem', 'Ipsum'],
              filas: [['Dolor', 'Sit amet'], ['Consectetur', 'Adipiscing']],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Lorem ipsum', definicion: 'Texto de relleno usado para comprobar la maquetación.' },
        { termino: 'Andamio', definicion: 'Estructura provisional que sostiene una obra mientras se construye.' },
      ],
      flashcards: [
        { frente: '¿Qué es esta lección?', reverso: 'Un andamio de prueba, sin valor académico.' },
        { frente: '¿Cuándo desaparece?', reverso: 'Cuando llegue el temario real de este programa.' },
      ],
      quiz: [
        {
          pregunta: '¿Qué es esta lección?',
          opciones: [
            'Contenido académico validado.',
            'Una lección de prueba para comprobar que el programa funciona.',
            'Un examen parcial.',
            'Una práctica evaluable.',
          ],
          correcta: 1,
          explicacion: 'Es un andamio técnico: existe para comprobar la plomería del programa, no para estudiarse.',
        },
        {
          pregunta: '¿Qué estado editorial tiene?',
          opciones: ['Publicado', 'Validado', 'Borrador', 'Archivado'],
          correcta: 2,
          explicacion: 'Nace en borrador para que ningún alumno pueda alcanzarla.',
        },
      ],
      actividades: null,
    },
    {
      id: id(2),
      titulo: `${etiqueta} — lección de prueba 2`,
      icono: 'libro',
      duracion: '10 min',
      estado: 'borrador',
      esAndamio: true,
      resumen: 'Segunda lección de relleno: comprueba la navegación entre temas del mismo programa.',
      objetivos: [
        'Comprobar que «anterior» y «siguiente» enlazan dentro del programa.',
        'Comprobar que el quiz registra un intento.',
      ],
      secciones: [
        {
          titulo: 'Sed ut perspiciatis',
          bloques: [
            { tipo: 'p', texto: P3 },
            {
              tipo: 'pasos',
              items: [
                'Lorem ipsum dolor sit amet.',
                'Consectetur adipiscing elit.',
                'Sed do eiusmod tempor incididunt.',
              ],
            },
          ],
        },
        {
          titulo: 'Unde omnis iste',
          bloques: [
            { tipo: 'p', texto: P1 },
            {
              tipo: 'callout',
              variante: 'nota',
              titulo: 'Recordatorio',
              texto: 'Si estás leyendo esto como alumno, avisa: no deberías poder verlo.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Relleno', definicion: 'Material provisional que ocupa el sitio del definitivo.' },
      ],
      flashcards: [
        { frente: '¿Para qué sirve esta lección?', reverso: 'Para comprobar la navegación entre temas.' },
      ],
      quiz: [
        {
          pregunta: '¿Qué comprueba esta segunda lección?',
          opciones: [
            'La navegación entre temas del programa.',
            'La dosificación de fármacos.',
            'El alcance de un examen final.',
            'La emisión de certificados.',
          ],
          correcta: 0,
          explicacion: 'Existe para verificar que «anterior» y «siguiente» funcionan dentro de un programa nuevo.',
        },
      ],
      actividades: null,
    },
  ]
}

// Un programa de andamio completo, con la MISMA forma que espera
// `plantillaDesdeData` (módulos + temas aplanados), que es la que ya usa el
// temario oficial: así el programa nuevo recorre exactamente el mismo camino y
// la prueba significa algo.
function programaDeAndamio({ id, clave, tipoPrograma, titulo, etiqueta, color }) {
  const temas = leccionesDeAndamio(clave, etiqueta)
  const moduloId = `${PREFIJO_ANDAMIO}${clave}-m1`
  const modulo = {
    id: moduloId,
    titulo: `${etiqueta} — módulo de prueba`,
    subtitulo: 'Andamio técnico, sin contenido académico',
    descripcion: 'Módulo de relleno para comprobar que este programa funciona de punta a punta.',
    color,
    icono: 'libro',
    temas,
  }
  return {
    id,
    tipoPrograma,
    titulo,
    esAndamio: true,
    modulos: [modulo],
    // Aplanado con los datos de módulo que la API añade, igual que
    // `todosLosTemas` en src/data/index.js.
    todosLosTemas: temas.map((t) => ({
      ...t,
      moduloId,
      moduloNumero: 1,
      moduloTitulo: modulo.titulo,
      moduloColor: color,
    })),
  }
}

/**
 * Los cuatro programas que la academia va a impartir, como andamio.
 *
 * Protección Civil ya tiene tipo propio (`proteccion_civil`, añadido el 30 de
 * agosto de 2026). Ésta es la línea que el comentario anterior anunciaba que
 * cambiaría: la portada pública lista las carreras desde META_PROGRAMA, y
 * anunciarla como «Licenciatura en Paramédicos» habría sido incorrecto.
 */
export const PROGRAMAS_ANDAMIO = [
  programaDeAndamio({
    id: 'andamio-enfermeria',
    clave: 'enf',
    tipoPrograma: 'enfermeria',
    titulo: 'Enfermería (andamio de prueba)',
    etiqueta: 'Enfermería',
    color: '#10b981',
  }),
  programaDeAndamio({
    id: 'andamio-tsu',
    clave: 'tsu',
    tipoPrograma: 'tsu',
    titulo: 'Técnico Superior Universitario (andamio de prueba)',
    etiqueta: 'TSU',
    color: '#0ea5e9',
  }),
  programaDeAndamio({
    id: 'andamio-licenciatura',
    clave: 'lic',
    tipoPrograma: 'licenciatura',
    titulo: 'Licenciatura en Paramédicos (andamio de prueba)',
    etiqueta: 'Licenciatura en Paramédicos',
    color: '#8b5cf6',
  }),
  programaDeAndamio({
    id: 'andamio-proteccion-civil',
    clave: 'pc',
    tipoPrograma: 'proteccion_civil',
    titulo: 'Protección Civil (andamio de prueba)',
    etiqueta: 'Protección Civil',
    color: '#f59e0b',
  }),
]

// ¿Este id pertenece al andamio? Lo usan las pruebas y cualquier control que
// necesite distinguirlo del contenido real sin mantener una lista a mano.
export function esDeAndamio(id) {
  return typeof id === 'string' && id.startsWith(PREFIJO_ANDAMIO)
}
