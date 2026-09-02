// ============================================================
//  Molde v2 — las piezas de estudio del trabajo A
// ------------------------------------------------------------
//  QUÉ ES. El contrato mínimo de `CLAUDE.md` §8 es el suelo de una lección;
//  esto es el techo al que se sube en la pasada de calidad: errores frecuentes,
//  resumen de una página, preguntas para responder en voz alta, mnemotecnias y
//  el aviso de qué se pregunta más.
//
//  LA REGLA QUE HACE SEGURA LA PASADA, y por eso está escrita aquí y no en un
//  comentario suelto de cada archivo: **no se añade un solo dato clínico
//  nuevo.** Todo lo que sale de estos helpers se DERIVA de la prosa que la
//  lección ya tiene y ya cita. Un «repaso rápido» es un sitio comodísimo para
//  colar una dosis sin fuente, y este temario no puede permitírselo.
//
//  POR QUÉ HELPERS Y NO TEXTO A MANO EN CADA LECCIÓN. Porque son decenas de
//  lecciones y la forma tiene que ser la misma en todas: un repaso que en una
//  página es lista y en otra tabla obliga al alumno a reaprender dónde mirar.
//  Y porque así el archivo de contenido se sigue pudiendo leer de un vistazo.
//
//  TOPES, tomados de `PLAN-LMS.md` §25.1 y comprobados en
//  `tests/loteM3Evaluacion.test.mjs`: 12 viñetas de repaso, 10 preguntas
//  orales, 3 mnemotecnias y ~35 kB por lección.
// ============================================================

// Sección de errores. Van como callout y no como lista porque cada uno tiene
// que poder leerse suelto: son lo que el alumno repasa la noche de antes.
export const erroresFrecuentes = (errores) => ({
  titulo: 'Errores frecuentes',
  bloques: errores.map(([titulo, texto]) => ({ tipo: 'callout', variante: 'alerta', titulo, texto })),
})

// Resumen de una página. Pasadas las 12 viñetas deja de ser un repaso y vuelve
// a ser la lección.
export const repasoRapido = (items) => ({
  titulo: 'Repaso rápido',
  bloques: [{ tipo: 'lista', titulo: 'Lo que hay que llevarse de esta lección', items }],
})

// Evaluación oral. Se responden hablando, que es como se evalúa en la práctica
// y como se detecta que algo se memorizó sin entenderse.
export const preguntasOrales = (items) => ({
  titulo: 'Preguntas de repaso oral',
  bloques: [
    { tipo: 'p', texto: 'Para responder en voz alta y sin mirar la lección. Si una respuesta no sale con sus propias palabras, es la que hay que volver a leer.' },
    { tipo: 'lista', items },
  ],
})

export const mnemotecnia = (texto) => ({ tipo: 'callout', variante: 'clave', titulo: 'Regla mnemotécnica', texto })
export const masPreguntado = (texto) => ({ tipo: 'callout', variante: 'clave', titulo: 'Lo que más se pregunta', texto })
