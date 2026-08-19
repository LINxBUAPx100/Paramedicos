// ============================================================
//  ENLACES DE IMÁGENES  ·  PTEM
// ------------------------------------------------------------
//  Pega aquí el enlace de Google Drive de cada imagen.
//  Funciona con:
//    · el enlace completo de "Compartir" de Drive
//      (https://drive.google.com/file/d/XXXXXXXX/view?usp=sharing)
//    · o solo el ID del archivo (XXXXXXXX)
//    · o cualquier URL de imagen (Cloudinary, etc.)
//
//  Importante: en Drive, comparte el archivo como
//  "Cualquier persona con el enlace · Lector" para que cargue en la web.
//
//  Deja '' (vacío) para mostrar el placeholder «enlace de la imagen aquí».
// ============================================================

// --- Home -------------------------------------------------------------------
export const IMG = {
  // El hero se sirve optimizado (WebP/AVIF responsivos) directamente en Home.jsx
  // desde public/hero/ (generado por scripts/optimizar-hero.mjs).
  ponteAprueba: 'https://drive.google.com/file/d/1nFKl_QgYJ998yDPhEsxN4tPCKiMFIaJn/view?usp=drive_web', // enlace de la imagen aquí — examen / checklist con bolígrafo
  atlas: 'https://drive.google.com/file/d/1faEMyolaKa7Ermyog9sO8VaC3lWuHNmz/view?usp=drive_web', // enlace de la imagen aquí — pila de libros / atlas
  flashcards: 'https://drive.google.com/file/d/1Ef50Mau9pkOkz8GA9BUu7dh9KVNYuxJd/view?usp=drive_web', // enlace de la imagen aquí — persona con botiquín
}

// --- LOGROS: galería de imágenes del temario ---------------------------------
//  Cada entrada: { clave, titulo, tema, src }.
//
//  `tema` es OBLIGATORIO y tiene que ser un id del plan vigente: es a donde
//  lleva la tarjeta al pulsarla, y también lo que decide si la imagen está
//  bloqueada para el grupo del alumno. Las siete que lo traían apuntaban al
//  temario ANTERIOR (`cardiovascular-profundo`, `renal-hidroelectrolitico`…),
//  que desapareció al adoptar el plan oficial de 287 temas: la tarjeta parecía
//  un enlace y no llevaba a ninguna parte. Las otras catorce no tenían destino
//  y ni siquiera se podían pulsar.
//
//  `tests/imagenesTemario.test.mjs` comprueba que cada destino exista. Si
//  cambias el id de un tema, esa prueba te avisa antes de que el alumno se
//  encuentre con la tarjeta muerta.
//
//  `src`: mientras dure la migración admite el enlace de Drive; lo que viene es
//  una ruta propia («imagenes/m2/celula.webp», ver docs/PLAN-IMAGENES-PTEM.md).
export const ATLAS_TEMAS = [
  { clave: 'celula', titulo: 'La célula y sus organelos', tema: 'm2-afe-celula', src: 'https://drive.google.com/file/d/15jTVRG0WCzpzEjEZIuRyfCPGTzHKR6o5/view?usp=drive_web' },
  { clave: 'bombanak', titulo: 'Bomba Na⁺/K⁺ ATPasa', tema: 'm2-afe-electrofisiologia', src: 'imagenes/m2/bomba-sodio-potasio.svg' },
  { clave: 'corazon', titulo: 'Anatomía del corazón y arterias coronarias', tema: 'm2-afi-cardiovascular', src: 'https://drive.google.com/file/d/1194V9CclqlF0FsVm90m8W5qBZJc6j11l/view?usp=drive_web' },
  { clave: 'conduccion', titulo: 'Sistema de conducción cardíaca', tema: 'm2-afi-cardiovascular', src: 'imagenes/m2/sistema-conduccion.svg' },
  { clave: 'ecg', titulo: 'Onda electrocardiográfica normal', tema: 'm3-md-ecg-basica', src: 'imagenes/m3/ecg-onda-normal.svg' }, // No se incluyó enlace para este elemento en la lista provista
  { clave: 'circulacion', titulo: 'Circulación mayor y menor', tema: 'm2-afi-cardiovascular', src: 'imagenes/m2/circulacion-mayor-menor.svg' },
  { clave: 'gasto', titulo: 'Determinantes del gasto cardíaco', tema: 'm2-afi-cardiovascular', src: 'imagenes/m2/gasto-cardiaco.svg' },
  { clave: 'respiratorio', titulo: 'Árbol traqueobronquial y pulmones', tema: 'm3-va-repaso-anatomia', src: 'https://drive.google.com/file/d/1-AH17bWBHvTcjNA44AjcyKNCJkdnzoy9/view?usp=drive_web' },
  { clave: 'oxihemoglobina', titulo: 'Curva de disociación de la oxihemoglobina', tema: 'm3-va-repaso-anatomia', src: 'imagenes/m3/curva-oxihemoglobina.svg' },
  { clave: 'nefrona', titulo: 'La nefrona', tema: 'm2-afi-urinario', src: 'https://drive.google.com/file/d/1kaq_bil5MRZucepN7qI_CtuT9UERKWHO/view?usp=drive_web' },
  { clave: 'neurona', titulo: 'Neurona y sinapsis', tema: 'm2-afi-nervioso', src: 'https://drive.google.com/file/d/1-LHRmRaReuaSofSDtP9Ko0wsKLssz_n5/view?usp=drive_web' },
  { clave: 'encefalo', titulo: 'Regiones del encéfalo', tema: 'm2-afi-nervioso', src: 'https://drive.google.com/file/d/1nC3ZY9wuTryFQx7oOLmWnorw5pbxn0M2/view?usp=drive_web' },
  { clave: 'piel', titulo: 'Capas de la piel', tema: 'm2-afe-tegumentario', src: 'https://drive.google.com/file/d/1Z8BVgX9VVNxjbiHF9doYCwZ5EADf1gQJ/view?usp=drive_web' },
  { clave: 'shock', titulo: 'Clasificación del shock', tema: 'm5-hs-definicion-tipos-shock', src: 'imagenes/m5/clasificacion-shock.svg' },
  { clave: 'acidobase', titulo: 'Equilibrio ácido-base', tema: 'm2-afe-acido-base', src: 'imagenes/m2/equilibrio-acido-base.svg' },
  { clave: 'columna', titulo: 'Columna vertebral', tema: 'm2-afi-oseo', src: 'https://drive.google.com/file/d/1Nxq-6rboOCXte-1UmUEVTvqt5HmV6aF_/view?usp=drive_web' },
  { clave: 'endocrino', titulo: 'Glándulas endocrinas', tema: 'm2-ao-endocrino', src: 'https://drive.google.com/file/d/1IlmdCayC7JWmcmNSw7DI9ecLnJCvEnxY/view?usp=drive_web' },
  { clave: 'digestivo', titulo: 'Tracto digestivo', tema: 'm2-afi-digestivo', src: 'https://drive.google.com/file/d/1vO1BwNBSDG_K5jNQWdT2o4e2fFHmrn71/view?usp=drive_web' },
  { clave: 'coagulacion', titulo: 'Cascada de la coagulación', tema: 'm2-ao-hematopoyetico', src: 'https://drive.google.com/file/d/1ImFPJU_FVp3bU_8bw0Cnku_cdNVuQlGd/view?usp=drive_web' },
  { clave: 'receptores', titulo: 'Receptores adrenérgicos y sus efectos', tema: 'm4-far-generalidades', src: 'https://drive.google.com/file/d/1XmLpHhvERSXgdUjUpm4dabOAAnV2n9Xl/view?usp=drive_web' },
  { clave: 'sri', titulo: 'Secuencia Rápida de Intubación', tema: 'm3-va-isr', src: 'https://drive.google.com/file/d/1PMs76U2Tpg6A9Z5B3gw9nP0MrSXqC_a5/view?usp=drive_web' },
]

// --- Imágenes de referencia por tema ----------------------------------------
//  Las claves de este mapa son IDS DEL PLAN VIGENTE. Estaban las del temario
//  anterior ('svb-rcp', 'cardiologia-avanzada', 'fase 5'…), así que la galería
//  «Imágenes de referencia» de cada tema no se pintaba nunca: buscaba temas que
//  ya no existen. `tests/imagenesTemario.test.mjs` lo comprueba ahora.
//
//  Reutiliza las imágenes de la galería (por su `clave`) en los temas donde son
//  pertinentes, para que ningún tema quede sin apoyo visual. Cada tema muestra
//  una pequeña galería "Imágenes de referencia" (TemaPage) que se arma sola.
//  Si añades una imagen NUEVA al Atlas, basta con listar su clave aquí para que
//  aparezca en los temas que quieras. No dupliques las imágenes que un tema ya
//  tiene incrustadas en su contenido (bloques `diagrama`).
export const IMAGENES_POR_TEMA = {
  // Módulo 2 — EL CUERPO HUMANO
  'm2-afe-celula': ['celula'],
  'm2-afe-electrofisiologia': ['bombanak'],
  'm2-afe-acido-base': ['acidobase'],
  'm2-afe-tegumentario': ['piel'],
  'm2-afi-oseo': ['columna'],
  'm2-afi-cardiovascular': ['corazon', 'conduccion', 'circulacion', 'gasto'],
  'm2-afi-nervioso': ['neurona', 'encefalo'],
  'm2-afi-digestivo': ['digestivo'],
  'm2-afi-urinario': ['nefrona'],
  'm2-ao-hematopoyetico': ['coagulacion'],
  'm2-ao-endocrino': ['endocrino'],
  // Módulo 3 — EVALUACIÓN INICIAL Y SOPORTE VITAL
  'm3-va-repaso-anatomia': ['respiratorio', 'oxihemoglobina'],
  'm3-va-tecnica-intubacion': ['respiratorio', 'sri'],
  'm3-va-isr': ['sri', 'respiratorio'],
  'm3-md-ecg-basica': ['ecg', 'conduccion'],
  'm3-md-uso-monitor': ['ecg'],
  'm3-ep-circulacion': ['circulacion', 'gasto'],
  'm3-ep-neurologica': ['encefalo'],
  // Módulo 4 — URGENCIAS MÉDICO QUIRÚRGICAS
  'm4-card-ecg-basica': ['ecg', 'conduccion'],
  'm4-far-generalidades': ['receptores'],
  'm4-far-infusiones-aminas': ['receptores', 'gasto'],
  'm4-met-acido-base': ['acidobase'],
  'm4-uri-insuficiencia-renal': ['nefrona'],
  'm4-resp-insuficiencia': ['respiratorio', 'oxihemoglobina'],
  // Módulo 5 — EMERGENCIAS TRAUMATOLÓGICAS
  'm5-hs-definicion-tipos-shock': ['shock', 'gasto'],
  'm5-hs-fisiopatologia': ['shock', 'circulacion'],
  'm5-hs-control-hemorragias': ['coagulacion'],
  'm5-que-grados': ['piel'],
  'm5-tcc-fracturas-vertebrales': ['columna'],
  'm5-tcc-inmovilizacion-espinal': ['columna'],
}


const ATLAS_POR_CLAVE = Object.fromEntries(ATLAS_TEMAS.map((t) => [t.clave, t]))

// Devuelve las imágenes de referencia de un tema: { clave, titulo, src } de las
// que tengan enlace cargado (las vacías se omiten).
export function imagenesDeTema(temaId) {
  return (IMAGENES_POR_TEMA[temaId] || [])
    .map((clave) => ATLAS_POR_CLAVE[clave])
    .filter((t) => t && (t.src || '').trim())
}
