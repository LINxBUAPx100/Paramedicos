// ============================================================
//  Genera la MUESTRA de la portada de paramédicos
// ------------------------------------------------------------
//  La portada pública enseña dos secciones de una lección real para que quien
//  llega pueda juzgar la profundidad del contenido antes de pedir una cuenta.
//  Eso está bien y se conserva. Lo que no estaba bien es cómo se conseguía:
//  `Landing.jsx` hacía `import('../data/index.js')`, y eso arrastra el temario
//  ENTERO —4,3 MB, los 287 temas con sus quiz y sus respuestas— al archivo
//  publicado. Un import dinámico no saca el código de la aplicación: lo mueve a
//  otro archivo que se sirve igual de abierto.
//
//  Este script extrae SOLO lo que la muestra pinta y lo escribe en un módulo
//  de unos pocos kilobytes. Se regenera con el resto (`npm run gen:demo`), así
//  que no se queda desincronizado del temario.
//
//  QUÉ SE PUBLICA, y es deliberado: las dos primeras secciones de una lección,
//  su título y su resumen. NI el quiz, NI las flashcards, NI las secciones
//  restantes. La portada dice cuántas quedan; no las enseña.
// ============================================================
import { writeFileSync } from 'node:fs'
import { getTema } from '../src/data/index.js'

// Mismo id que usaba Landing.jsx. Si algún día se renombra, este script falla
// en voz alta en vez de generar una muestra vacía.
const TEMA_DEMO = 'm2-afi-cardiovascular'
const SECCIONES = 2

const tema = getTema(TEMA_DEMO)
if (!tema) {
  console.error(`✗ No existe el tema de muestra "${TEMA_DEMO}".`)
  console.error('  Elige otro id en scripts/gen-demo-portada.mjs y vuelve a generar.')
  process.exit(1)
}

const total = (tema.secciones || []).length
const muestra = {
  id: tema.id,
  titulo: tema.titulo,
  resumen: tema.resumen,
  icono: tema.icono || '',
  numero: tema.numero,
  moduloNumero: tema.moduloNumero,
  moduloColor: tema.moduloColor,
  // Las dos primeras, tal cual. El componente las pinta con el mismo
  // renderizador que una lección de verdad.
  secciones: (tema.secciones || []).slice(0, SECCIONES),
  // Cuántas quedan fuera, para poder decirlo sin enseñarlas.
  seccionesRestantes: Math.max(0, total - SECCIONES),
}

const cabecera = `// ARCHIVO GENERADO por scripts/gen-demo-portada.mjs — NO editar a mano.
//
// Muestra pública de la portada de paramédicos: DOS secciones de una lección
// real, su título y su resumen. Nada más. Existe para que la portada no tenga
// que importar el temario completo (4,3 MB) solo para enseñar un fragmento.
//
// Se regenera con: npm run gen:demo
`

writeFileSync(
  new URL('../src/data/demoPortada.js', import.meta.url),
  `${cabecera}export const demoPortada = ${JSON.stringify(muestra, null, 2)}\n`
)

const bytes = JSON.stringify(muestra).length
console.log(`demoPortada.js generado → "${tema.titulo}"`)
console.log(`  ${SECCIONES} secciones de ${total} · ${(bytes / 1024).toFixed(1)} kB`)
console.log('  sin quiz, sin flashcards, sin el resto de secciones')
