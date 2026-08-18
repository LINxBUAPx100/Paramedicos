// ============================================================
//  Título OFICIAL vs título VISIBLE
// ------------------------------------------------------------
//  El PDF de la academia trae erratas de transcripción («ESCENCIAL»,
//  «URGNCIAS», «Wadell», «lefort. 1, ,2 y 3»). La semilla las conserva a
//  propósito: es la transcripción documental y sirve para cotejar contra el
//  papel. Pero enseñarle «Doctrina de Kellie Monroe» a un alumno que después
//  buscará «Monro-Kellie» en cualquier manual es un problema real, no un
//  detalle de estilo.
//
//  Así que se separan dos campos y NINGUNO pisa al otro:
//    · `tituloOficial` — lo impreso, intacto, para trazabilidad.
//    · `tituloVisible` — la grafía académica correcta, para el alumno.
//
//  Solo se corrige ortografía y nomenclatura. Cambiar el ALCANCE de un tema
//  (por ejemplo, decidir que «Osteólisis» del plan es en realidad acceso
//  intraóseo) toca al cuerpo docente: aquí se deja la corrección de nombre y
//  la duda queda registrada en la matriz de decisiones.
// ============================================================

// Unidades (filas del PDF).
export const TITULOS_VISIBLES_UNIDAD = {
  'm2-anat-fisio-esencial': 'ANATOMÍA Y FISIOLOGÍA ESENCIAL',
  'm4-urgencias-gineco-obstetricas': 'URGENCIAS GINECO-OBSTÉTRICAS',
  'm6-soporte-vital-pediatrico': 'SOPORTE VITAL PEDIÁTRICO',
  'm6-trauma-pediatrico': 'TRAUMATISMO EN EL PACIENTE PEDIÁTRICO',
}

// Módulos.
export const TITULOS_VISIBLES_MODULO = {
  'm3-evaluacion-soporte-vital': 'EVALUACIÓN INICIAL Y SOPORTE VITAL',
}

// Temas.
export const TITULOS_VISIBLES_TEMA = {
  'm3-va-cricotirotomia': 'Cricotirotomía con aguja',
  // «Osteólisis» es destrucción de tejido óseo; el procedimiento vascular es
  // la osteoclisis o, en nomenclatura actual, el acceso intraóseo.
  'm3-vi-osteolisis': 'Acceso intraóseo (osteoclisis)',
  'm6-tp-osteolisis': 'Acceso intraóseo en pediatría (osteoclisis)',
  'm5-cin-triada-wadell': 'Tríada de Waddell',
  'm5-tcc-kellie-monroe': 'Doctrina de Monro-Kellie',
  'm5-tcc-cauda-equina': 'Síndrome de cauda equina',
  'm5-tcc-brown-sequard': 'Síndrome de Brown-Séquard',
  'm5-tocc-lefort': 'Fracturas de Le Fort I, II y III',
  'm5-tme-esguinces-luxaciones': 'Esguinces, luxaciones y desgarros: tratamiento',
}

// Qué se le enseña al alumno. El oficial sigue disponible al lado.
export function tituloVisibleDe(tema) {
  return tema?.tituloVisible || tema?.titulo || ''
}
