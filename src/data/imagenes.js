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

// --- Atlas: temas anatómicos/fisiológicos (imágenes reales) -------------------
//  Cada entrada: { clave, titulo, src }. Pega el enlace en `src`.
export const ATLAS_TEMAS = [
  { clave: 'celula', titulo: 'La célula y sus organelos', tema: 'biologia-celular-bioquimica', src: 'https://drive.google.com/file/d/15jTVRG0WCzpzEjEZIuRyfCPGTzHKR6o5/view?usp=drive_web' },
  { clave: 'bombanak', titulo: 'Bomba Na⁺/K⁺ ATPasa', tema: 'biologia-celular-bioquimica', src: 'https://drive.google.com/file/d/1ldgqS4m75dvmzObcLXROtj0WFtaOl2AK/view?usp=drive_web' },
  { clave: 'corazon', titulo: 'Anatomía del corazón y arterias coronarias', tema: 'cardiovascular-profundo', src: 'https://drive.google.com/file/d/1194V9CclqlF0FsVm90m8W5qBZJc6j11l/view?usp=drive_web' },
  { clave: 'conduccion', titulo: 'Sistema de conducción cardíaca', src: 'https://drive.google.com/file/d/1NsDwbzOGkkG-pdRovFV-WwAux6ggETuv/view?usp=drive_web' },
  { clave: 'ecg', titulo: 'Onda electrocardiográfica normal', src: 'https://drive.google.com/file/d/1fUVt1yDYfeC0Nxmov5XTBRYGNwKn363P/view?usp=sharing' }, // No se incluyó enlace para este elemento en la lista provista
  { clave: 'circulacion', titulo: 'Circulación mayor y menor', src: 'https://drive.google.com/file/d/1AIaQNvcm_V-YTOIJ7qSXC8hoE21KnrHe/view?usp=drive_web' },
  { clave: 'gasto', titulo: 'Determinantes del gasto cardíaco', tema: 'cardiovascular-profundo', src: 'https://drive.google.com/file/d/1aly-zWBxO_o0XM80YbkdiPeu4SBYK-wy/view?usp=drive_web' },
  { clave: 'respiratorio', titulo: 'Árbol traqueobronquial y pulmones', tema: 'respiratorio-profundo', src: 'https://drive.google.com/file/d/1-AH17bWBHvTcjNA44AjcyKNCJkdnzoy9/view?usp=drive_web' },
  { clave: 'oxihemoglobina', titulo: 'Curva de disociación de la oxihemoglobina', tema: 'respiratorio-profundo', src: 'https://drive.google.com/file/d/1eFzMAFGE8eQZ4agXywn_YOuYo08LQPOX/view?usp=drive_web' },
  { clave: 'nefrona', titulo: 'La nefrona', tema: 'renal-hidroelectrolitico', src: 'https://drive.google.com/file/d/1kaq_bil5MRZucepN7qI_CtuT9UERKWHO/view?usp=drive_web' },
  { clave: 'neurona', titulo: 'Neurona y sinapsis', src: 'https://drive.google.com/file/d/1-LHRmRaReuaSofSDtP9Ko0wsKLssz_n5/view?usp=drive_web' },
  { clave: 'encefalo', titulo: 'Regiones del encéfalo', src: 'https://drive.google.com/file/d/1nC3ZY9wuTryFQx7oOLmWnorw5pbxn0M2/view?usp=drive_web' },
  { clave: 'piel', titulo: 'Capas de la piel', src: 'https://drive.google.com/file/d/1Z8BVgX9VVNxjbiHF9doYCwZ5EADf1gQJ/view?usp=drive_web' },
  { clave: 'shock', titulo: 'Clasificación del shock', src: 'https://drive.google.com/file/d/1JHMy5eLBAWRiOYBR8XOO0vlbwg5gS2Vx/view?usp=drive_web' },
  { clave: 'acidobase', titulo: 'Equilibrio ácido-base', src: 'https://drive.google.com/file/d/1mcwSDQhfAct9YMpjcPpMXi3Tq7bgxTlR/view?usp=drive_web' },
  { clave: 'columna', titulo: 'Columna vertebral', src: 'https://drive.google.com/file/d/1Nxq-6rboOCXte-1UmUEVTvqt5HmV6aF_/view?usp=drive_web' },
  { clave: 'endocrino', titulo: 'Glándulas endocrinas', src: 'https://drive.google.com/file/d/1IlmdCayC7JWmcmNSw7DI9ecLnJCvEnxY/view?usp=drive_web' },
  { clave: 'digestivo', titulo: 'Tracto digestivo', src: 'https://drive.google.com/file/d/1vO1BwNBSDG_K5jNQWdT2o4e2fFHmrn71/view?usp=drive_web' },
  { clave: 'coagulacion', titulo: 'Cascada de la coagulación', src: 'https://drive.google.com/file/d/1ImFPJU_FVp3bU_8bw0Cnku_cdNVuQlGd/view?usp=drive_web' },
  { clave: 'receptores', titulo: 'Receptores adrenérgicos y sus efectos', src: 'https://drive.google.com/file/d/1XmLpHhvERSXgdUjUpm4dabOAAnV2n9Xl/view?usp=drive_web' },
  { clave: 'sri', titulo: 'Secuencia Rápida de Intubación', src: 'https://drive.google.com/file/d/1PMs76U2Tpg6A9Z5B3gw9nP0MrSXqC_a5/view?usp=drive_web' },
]

// --- Imágenes de referencia por tema ----------------------------------------
//  Reutiliza las imágenes del Atlas (por su `clave`) en los temas donde son
//  pertinentes, para que ningún tema quede sin apoyo visual. Cada tema muestra
//  una pequeña galería "Imágenes de referencia" (TemaPage) que se arma sola.
//  Si añades una imagen NUEVA al Atlas, basta con listar su clave aquí para que
//  aparezca en los temas que quieras. No dupliques las imágenes que un tema ya
//  tiene incrustadas en su contenido (bloques `diagrama`).
export const IMAGENES_POR_TEMA = {
  // Fase 2 — TUM Básico
  'oxigenoterapia-via-aerea-basica': ['respiratorio', 'oxihemoglobina'],
  'svb-rcp': ['corazon', 'conduccion'],
  'signos-vitales': ['oxihemoglobina', 'corazon'],
  'evaluacion-neurologica-avdi-glasgow': ['encefalo', 'neurona'],
  // Fase 3 — TUM Intermedio
  'farmacologia-toxicologia': ['receptores'],
  'farmacologia-por-sistemas': ['receptores', 'corazon'],
  'via-aerea-avanzada-supraglotica': ['respiratorio', 'sri'],
  'fluidoterapia-electrolitos': ['nefrona', 'acidobase'],
  'monitorizacion-paciente': ['ecg', 'oxihemoglobina'],
  'vias-administracion': ['receptores'],
  // Fase 4 — Avanzado y Cuidados Críticos
  'via-aerea-definitiva': ['respiratorio', 'sri'],
  'cardiologia-avanzada': ['conduccion', 'ecg', 'corazon'],
  'soporte-trauma-critico': ['coagulacion', 'columna'],
  'acls-paro-cardiaco': ['ecg', 'conduccion'],
  'arritmias-manejo': ['ecg', 'conduccion'],
  'sica-profundo': ['corazon', 'circulacion', 'ecg'],
  'shock-avanzado': ['gasto', 'receptores'],
  'emergencias-respiratorias-criticas': ['respiratorio', 'oxihemoglobina'],
  'trauma-por-sistemas': ['columna', 'coagulacion'],
  // Fase 5 — Transición a Medicina
  'fisiopatologia-inmunologia': ['celula'],
  'microbiologia-sepsis': ['celula', 'shock'],
  'cardiologia-clinica': ['ecg', 'conduccion', 'circulacion'],
  'neumologia-clinica': ['oxihemoglobina'],
  'farmacologia-clinica-avanzada': ['receptores'],
  // Fase 6 — Farmacología Avanzada
  'soporte-hemodinamico-vasopresores': ['receptores', 'gasto', 'corazon'],
  'farmacologia-cardiovascular-avanzada': ['corazon', 'ecg', 'conduccion', 'receptores'],
  'farmacologia-neurocritica-pic': ['encefalo', 'neurona'],
  'farmacologia-respiratoria-avanzada': ['respiratorio', 'receptores'],
  'analgesia-mayor-anestesia-disociativa': ['neurona', 'receptores'],
  'antidotos-emergencias-toxicologicas': ['receptores'],
}

const ATLAS_POR_CLAVE = Object.fromEntries(ATLAS_TEMAS.map((t) => [t.clave, t]))

// Devuelve las imágenes de referencia de un tema: { clave, titulo, src } de las
// que tengan enlace cargado (las vacías se omiten).
export function imagenesDeTema(temaId) {
  return (IMAGENES_POR_TEMA[temaId] || [])
    .map((clave) => ATLAS_POR_CLAVE[clave])
    .filter((t) => t && (t.src || '').trim())
}
