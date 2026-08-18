// ============================================================
//  Biblioteca de referencia de la academia (Google Drive).
// ------------------------------------------------------------
//  Catálogo de las obras que sostienen el contenido del temario. Redactar
//  material clínico sin la fuente delante es cómo se cuelan las dosis
//  equivocadas: este script descarga la obra que se necesite para poder
//  citarla, en vez de escribir de memoria.
//
//  Los archivos NO se versionan en el repo (tienen derechos de autor): se
//  descargan al directorio temporal, se consultan y se descartan.
//
//  Uso:
//    node scripts/biblioteca.mjs                 lista el catálogo
//    node scripts/biblioteca.mjs --bajar=phtls10 descarga una obra
//    node scripts/biblioteca.mjs --buscar=trauma filtra por nombre
//
//  Carpeta origen: «B. (BIBLIOTECA)» compartida por la academia.
// ============================================================
import { existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const CARPETA = '1RFD2pQ20vKK8syU0Y-JbXGBDcrYa7TwV'

// Obras de referencia, con la clave corta que se usa al citarlas en el
// contenido. Solo las que sirven de fuente para el temario: la carpeta tiene
// más material (presentaciones sueltas, apuntes) que no se cita.
export const OBRAS = {
  // --- Trauma ---
  // ⚠ TRADUCCIÓN AUTOMÁTICA, no la edición oficial en español. Cada página
  // lleva el sello «Machine Translated by Google» y la terminología clínica
  // está corrompida: «cofre mayal» por tórax inestable (flail chest),
  // «Historia del MUESTREADOR» por historia SAMPLE, «encuesta primaria» por
  // evaluación primaria. SIRVE para localizar capítulos y seguir la estructura
  // del libro; NO sirve como fuente de terminología ni para citarlo.
  phtls10: {
    id: '1a2Q8tDeEqzHdOizmgg3NSboBW53-eJUR',
    archivo: 'PHTLS 10 ESPAÑOL-1.pdf',
    cita: 'PHTLS 10.ª ed. — TRADUCCIÓN AUTOMÁTICA (no citable)',
    aviso: 'traduccion-automatica',
  },
  phtls9: { id: '1jLzVf0xf3jOZcm7tO3RpiMCbY7tUQWvi', archivo: 'PHTLS 9a.pdf', cita: 'PHTLS 9.ª ed.' },
  etls: { id: '1h6zCC6XXJe_-Jxw0fxpHcBQnJ_1r9hex', archivo: 'ETLS_Evaluacion_y_manejo_del_trauma_ADIE.pdf', cita: 'ETLS — Evaluación y manejo del trauma' },
  traumaEmergency: { id: '1859sTVZyJQwjUoTZcc1b-whW8pm1J81A', archivo: 'MANUAL EMERGENCY TRAUMA CARE.pdf', cita: 'Manual Emergency Trauma Care' },
  abls: { id: '1P_MATKCBCgVXF3UuogDJLLxOGigrgtJw', archivo: 'ABLS.pdf', cita: 'ABLS — Advanced Burn Life Support' },
  // --- Soporte vital ---
  acls2020: { id: '1PabyY6IwbsJEuvWyE3qL_AuvadBaJBH_', archivo: 'ACLS MANUAL 2020.pdf', cita: 'Manual ACLS 2020 (AHA)' },
  pals: { id: '1uOKFCUUEXptPlpycDmITW4yVRYorUi5U', archivo: 'PALS.pdf', cita: 'PALS' },
  nals: { id: '1pOam-xROYavkN0SdqX2fFJyDC6twB-p4', archivo: 'NALS traducido.pdf', cita: 'NALS (traducido)' },
  also: { id: '1AQcCgosznugl-9d0SF0c3wwRfIWbO6xW', archivo: 'Soporte-Vital-Avanzado-en-Obstetricia-ALSO.pdf', cita: 'ALSO — Soporte Vital Avanzado en Obstetricia' },
  // --- Base: anatomía, fisiología, farmacología ---
  guyton: { id: '1l6QsQajrNZ-lCp3dvAtTtK9UUyJdiCsH', archivo: 'Compendio_de_Fisiología_Médica_13°_ed_Arthur_Guyton_John_Hall_2016.pdf', cita: 'Guyton & Hall, Compendio de Fisiología Médica, 13.ª ed.' },
  moore: { id: '1vmSUTPhdNeQp5cX1y9NhpM3Mxyzhjmou', archivo: 'Moore Anatomia con orientacion clinica-7 ED-ÁREA 51.pdf', cita: 'Moore, Anatomía con orientación clínica, 7.ª ed.' },
  katzung: { id: '1m9PurYton1siAwOHFrVaRjMT9f-JxxRK', archivo: 'Farmacologia.Basica.y.Clinica.Katzung.12a.Edicion.pdf', cita: 'Katzung, Farmacología básica y clínica, 12.ª ed.' },
  silbernagl: { id: '1Dnnm2MszjP-xOSPkPhM2AkMPnv4L6cfq', archivo: 'kupdf.net_fisiopatologia-texto-y-atlas-silbernagl-lang.pdf', cita: 'Silbernagl & Lang, Fisiopatología: texto y atlas' },
  fisioResp: { id: '1HaZkra5LrXyOvAqjLTDlr3Mg73drRRfu', archivo: 'Fisiologia Respiratoria. Lo Esencial en la Practica Clinica.pdf', cita: 'Fisiología respiratoria: lo esencial en la práctica clínica, 3.ª ed.' },
  // --- Urgencias y cuidados críticos ---
  zubiran: { id: '1P9pme1tSpMcT8hnMaVVvee6BAuIEn21d', archivo: 'Zubiran Manual de Terapeutica Medica y Procedimientos de Urgencias 7a Ed.pdf', cita: 'INCMNSZ («Zubirán»), Manual de Terapéutica Médica y Procedimientos de Urgencias, 7.ª ed.' },
  bibiano: { id: '1efzjl1xNKP_bUoVSTuqoM0-XGfiB-rPn', archivo: 'Manual-de-urgencias-3ed-Bibiano.pdf', cita: 'Bibiano, Manual de urgencias, 3.ª ed.' },
  villatoro: { id: '1GHrpDI-6s0_CHJ4u1UF6bqGYAQygsom5', archivo: 'Manual de medicina de urgencias - Villatoro.pdf', cita: 'Villatoro Martínez, Manual de medicina de urgencias' },
  washington: { id: '1K2Aui3JCDUL1DbY9TbM6ALEx41BpHmZq', archivo: 'Manual Washington de Cuidados Intensivos 3a ed 2019.pdf', cita: 'Manual Washington de Cuidados Intensivos, 3.ª ed. (2019)' },
  ventilacion: { id: '1OQCAlr13POWuQGg__KcHshlzkVSbvYwZ', archivo: 'VENTILACION MECANICA LIBRO 2020.pdf', cita: 'Ventilación mecánica (2020)' },
  viaAereaDificil: { id: '1hktS1FA9LZmDtm6V-B6Hl_qGGijYKgoE', archivo: 'Manual de Manejo de la Via Aerea Dificil.pdf', cita: 'Manual de manejo de la vía aérea difícil' },
  // --- Prehospitalario y pediatría ---
  tumBasico: { id: '1TcgfxM9x0hnM_M5bZ92NY4ZVVeyW7fJ-', archivo: 'Manual Tum Basico.pdf', cita: 'Manual TUM Básico' },
  formacionParamedico: { id: '1H5pW3bNpjwRl0k3WZrpwf5ksNKA58dc3', archivo: 'Manual-de-Formacion-Profesional-Del-Paramedico.pdf', cita: 'Manual de Formación Profesional del Paramédico' },
  pediatriaPrehosp: { id: '1TVMSKWs3LQybPCWufh27s_HxycR2osle', archivo: 'Educación Pediátrica Prehospitalaria.pdf', cita: 'Educación Pediátrica Prehospitalaria' },
  seup: { id: '17Jrud-mkSuYSxWa_KaxE3CbCovuZKScj', archivo: 'protocolos_seup_2020_final.pdf', cita: 'Protocolos SEUP 2020' },
  // --- México específico ---
  antivenenos: { id: '1CKrkKIprSvqoU2MBX1ZQdL3j3D28-Ei8', archivo: 'Poster_Antivenenos_2021_Mailing.pdf', cita: 'Guía de tratamiento en intoxicaciones por animales ponzoñosos — Silanes (claves CCBMSS)' },
  golpeCalor: { id: '13I9JyKV6I3odm4AgMo5b5VOEJWpPNvUU', archivo: 'Golpe de Calor JRSM.pdf', cita: 'Golpe de calor (JRSM)' },
  traumaEmbarazada: { id: '1QtMP-gPa9ZPkJYXQABdFhKuXq5wUwwrF', archivo: 'Traumatismos en la embarazada.pdf', cita: 'Traumatismos en la embarazada' },
  // --- Apoyo ---
  ritmos: { id: '1Ct4fCwYms73G9s6RGUI1nqkhnIdSBxmE', archivo: 'ritmos-cardiacos.pdf', cita: 'Ritmos cardiacos' },
  semiologia: { id: '15--Re5npdQaQ9ZYOH9hKTWFUlBA2M-jS', archivo: 'SEMIOLOGIA Y FISIOPATOLOGIA CONDE 2015.pdf', cita: 'Conde, Semiología y fisiopatología (2015)' },
  atlasAnatomia: { id: '1136L-8UzIf2QGOrY1cYNpH32un6i1osr', archivo: 'atlas fotografico de anatomia.pdf', cita: 'Atlas fotográfico de anatomía' },
}

const DESTINO = join(tmpdir(), 'ptem-biblioteca')

export function rutaDe(clave) {
  const o = OBRAS[clave]
  if (!o) throw new Error(`No existe la obra "${clave}".`)
  return join(DESTINO, `${clave}.pdf`)
}

// Descarga (si no está ya) y devuelve la ruta local.
export function bajar(clave) {
  const o = OBRAS[clave]
  if (!o) throw new Error(`No existe la obra "${clave}". Usa --lista para verlas.`)
  if (!existsSync(DESTINO)) mkdirSync(DESTINO, { recursive: true })
  const ruta = rutaDe(clave)
  if (existsSync(ruta)) return ruta
  // `confirm=t` salta el aviso de análisis antivirus de los archivos grandes.
  execFileSync('curl', [
    '-sL', '--max-time', '300', '-o', ruta,
    `https://drive.usercontent.google.com/download?id=${o.id}&export=download&confirm=t`,
  ])
  return ruta
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('biblioteca.mjs')) {
  const args = process.argv.slice(2)
  const val = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split('=')[1]
  const clave = val('bajar')
  const busca = val('buscar')

  if (clave) {
    const ruta = bajar(clave)
    console.log(`✓ ${OBRAS[clave].cita}\n  ${ruta}`)
  } else {
    const entradas = Object.entries(OBRAS)
      .filter(([k, o]) => !busca || (k + o.cita).toLowerCase().includes(busca.toLowerCase()))
    console.log(`Biblioteca de referencia — ${entradas.length} obra(s)\n`)
    for (const [k, o] of entradas) console.log(`  ${k.padEnd(22)} ${o.cita}`)
    console.log('\nDescargar:  node scripts/biblioteca.mjs --bajar=CLAVE')
  }
}
