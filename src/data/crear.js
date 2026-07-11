// ============================================================
//  Helpers opcionales para definir temas/fases con menos ruido.
//  Rellenan los campos que suelen ir vacíos, para que un tema nuevo
//  solo necesite lo esencial. Tus campos SIEMPRE sobrescriben los defaults.
// ============================================================

// Un tema con todos los campos opcionales ya inicializados.
// Requeridos en la práctica: id (estable), titulo. `numero` se calcula solo.
export const crearTema = (tema) => ({
  objetivos: [],
  secciones: [],
  conceptosClave: [],
  flashcards: [],
  quiz: [],
  recursos: null,
  actividades: null,
  ...tema,
})

// Una fase con defaults sensatos. Requeridos: id (estable), titulo, temas.
// `numero` se calcula solo desde el orden en registro.js.
export const crearFase = (fase) => ({
  subtitulo: '',
  descripcion: '',
  color: '#0c5fc4',
  temas: [],
  ...fase,
})
