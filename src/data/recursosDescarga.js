// Recursos descargables (libros, manuales, flashcards, protocolos) por tema.
// Centralizado aquí para no tocar cada archivo de datos.
// Los enlaces apuntan a Google Drive (vista/descarga).

const D = (id) => `https://drive.google.com/file/d/${id}/view`

export const recursosPorTema = {
  // Farmacología
  'bases-farmacologicas-receptores': [
    { titulo: 'Farmacología básica (apuntes y guías)', emoji: '💊', url: D('1F2l2kcniEN-d7FZ8J52mVw_-jHQRU4lm') },
  ],
  'farmacologia-toxicologia': [
    { titulo: 'Apuntes de Farmacología (clasificación y formas farmacéuticas)', emoji: '📝', url: D('1KkeODRIOfNIdMgC7KmqlQ49LvEmspq9D') },
  ],
  'farmacologia-por-sistemas': [
    { titulo: 'Flashcards de Farmacología', emoji: '🎴', url: D('1LNYFF0VL1p-sAFb2FYEX_elcNhTxNAAm') },
  ],
  'farmacologia-cardiovascular-avanzada': [
    { titulo: 'Flashcards de Farmacología Cardiovascular (V2)', emoji: '🫀', url: D('1LSYeZ17HJieGf52lLtihrOcYAjfeC50z') },
  ],

  // Cardiología y reanimación
  'acls-paro-cardiaco': [
    { titulo: 'ACLS — Soporte Vital Cardiovascular Avanzado (AHA)', emoji: '🫀', url: D('1cXiMqQzQAimEMBfASzmJIx-7RZW8uKNc') },
  ],
  'ecg-basico': [
    { titulo: 'Ritmos cardíacos (resumen de ECG)', emoji: '📈', url: D('1Ct4fCwYms73G9s6RGUI1nqkhnIdSBxmE') },
  ],
  'sica-profundo': [
    { titulo: 'Infarto Agudo al Miocardio (manejo en México)', emoji: '🫀', url: D('1uvaEMosFmScFeFKxPNHeoqa_pxEXR0o_') },
  ],

  // Vía aérea / respiratorio
  'oxigenoterapia-via-aerea-basica': [
    { titulo: 'Referencia de Bolsillo — Atención Respiratoria', emoji: '🫁', url: D('1Njs0QkelXhNZV-YJGAdhiApJ747g6QZj') },
  ],

  // Evaluación / soporte vital / trauma
  'evaluacion-integral': [
    { titulo: 'Manual TUM Básico (9.ª edición)', emoji: '🚑', url: D('1TcgfxM9x0hnM_M5bZ92NY4ZVVeyW7fJ-') },
  ],
  'urgencias-medicas-comunes': [
    { titulo: 'Medicina de Urgencias — Déjà Review (Q&A)', emoji: '🚨', url: D('1e3QaZl_nnTPw8T9TTUHW1tpJ9DIOS2T0') },
  ],
  'phtls-trauma': [
    { titulo: 'Emergency Trauma Care (manejo ABCDE)', emoji: '🩹', url: D('1859sTVZyJQwjUoTZcc1b-whW8pm1J81A') },
  ],
  'shock-avanzado': [
    { titulo: 'Manual Washington de Cuidados Intensivos (3.ª ed.)', emoji: '📘', url: D('1K2Aui3JCDUL1DbY9TbM6ALEx41BpHmZq') },
  ],
  'emergencias-ambientales': [
    { titulo: 'Golpe de Calor (urgencias por hipertermia)', emoji: '🌡️', url: D('13I9JyKV6I3odm4AgMo5b5VOEJWpPNvUU') },
  ],
  'fluidoterapia-electrolitos': [
    { titulo: 'Deshidratación (causas, signos y tratamiento)', emoji: '💧', url: D('1pjawRJotZlaRky47FlhHl54-pASs7g4p') },
  ],

  // Gastrointestinal y abdomen agudo
  'sistema-digestivo': [
    { titulo: 'Sistema Gastrointestinal (anatomía y función)', emoji: '🩻', url: D('1zGwv8mjccRgZI84-i5uXgwYuVhcg4TpT') },
  ],
  'gastroenterologia-abdomen-agudo': [
    { titulo: 'Abdomen Agudo (definición y tipos de dolor)', emoji: '😣', url: D('1ENeoADhMDUHGTH1vXlhcp2W4S2tnLReX') },
    { titulo: 'Técnicas de exploración abdominal', emoji: '✋', url: D('1n6Z5pxUh87oG0-pDZ3BVJwUg7iC0bwZ0') },
    { titulo: 'Sangrado de tubo digestivo', emoji: '🩸', url: D('1DAjTqhQVATXWFyHtB2hEEIUnQKN_Xtvz') },
    { titulo: 'Gastritis e infección por H. pylori', emoji: '🦠', url: D('1fY6ss91QhLFdf4IpqDwya6w-Ew7bUWKA') },
    { titulo: 'Colitis (tipos y tratamiento)', emoji: '🌡️', url: D('1wKK72DNOArR8QkwLyDHaqliMFjLeb9j9') },
    { titulo: 'Colelitiasis y Colecistitis', emoji: '🟡', url: D('1GCids-ksANjsi3flYQnDx6DERlrKKIwc') },
    { titulo: 'Seminario de Hepatitis', emoji: '🟠', url: D('1CT7Zwt34O4qYrLCNtkiO_wM7L0rmUZpi') },
    { titulo: 'Oclusión intestinal', emoji: '🌀', url: D('1-1ZqDMPkBx2JEZq10NC1jlZH6uNcMjSE') },
  ],

  // Infectología
  'microbiologia-sepsis': [
    { titulo: 'Manual de Vacunas de Latinoamérica (SLIPE 2021)', emoji: '💉', url: D('1KFotUBDcA7KFt3OvxDN334OGuJk32wuw') },
  ],

  // Obstetricia y pediatría
  'obstetricia-neonatal': [
    { titulo: 'Soporte Vital Avanzado en Obstetricia (ALSO)', emoji: '🤰', url: D('1AQcCgosznugl-9d0SF0c3wwRfIWbO6xW') },
    { titulo: 'Algoritmo de reanimación en sala de partos', emoji: '👶', url: D('12ZCibE3H4ycnPKZ-jdShKNSjgAV5QqCs') },
  ],
  'pediatria-especiales': [
    { titulo: 'PALS — Soporte Vital Avanzado Pediátrico (AHA)', emoji: '🧒', url: D('1uOKFCUUEXptPlpycDmITW4yVRYorUi5U') },
    { titulo: 'Protocolos de Urgencias de Pediatría (SEUP)', emoji: '🚸', url: D('17Jrud-mkSuYSxWa_KaxE3CbCovuZKScj') },
  ],

  // Operaciones especiales
  'operaciones-especiales-tactica-bienestar': [
    { titulo: 'Plan Familiar de Protección Civil (CENAPRED)', emoji: '🏠', url: D('1OPHNF2YcNL7sSTzk7yT9004bZy49rLUK') },
  ],
}

// Recursos generales de estudio (no atados a un tema clínico): se muestran en el Temario.
export const recursosGenerales = [
  { titulo: 'Entrenando la memoria para estudiar con éxito (J. Hancock)', emoji: '🧠', url: D('1d5ptVKsDPCGSOFx0VfwdsQ-aQbwCdKtv') },
]

export function getRecursos(temaId) {
  return recursosPorTema[temaId] || []
}
