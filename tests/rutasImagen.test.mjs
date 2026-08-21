// ============================================================
//  Rutas de imagen del contenido: locales sí, traversal no
// ------------------------------------------------------------
//  El validador del editor solo aceptaba `http(s)://…`, y la arquitectura de
//  imágenes de este proyecto exige lo contrario: el contenido guarda una RUTA
//  RELATIVA («imagenes/medical/…») y `lib/img.js` decide en un único punto de
//  dónde se sirve. Resultado: un editor no podía guardar una imagen del propio
//  sitio, precisamente la forma que la arquitectura considera correcta.
//
//  Al abrir la puerta a las rutas relativas hay que cerrarla a lo demás, y eso
//  es lo que se prueba aquí. Una ruta de imagen que se pueda escribir desde el
//  editor termina en un `src` que el navegador pide contra el propio origen: si
//  se admitiera `../`, un editor podría hacer que el sitio sirviera cualquier
//  archivo del despliegue como si fuera una figura del temario.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  rutaImagenSegura, origenImagenValido, urlSegura, idActivoValido, validarBloque,
} from '../src/lib/temaContenidoModelo.js'
import { ACTIVOS_MEDICOS } from '../src/data/activosMedicos.js'

const BARRA_INV = String.fromCharCode(92) // '\' sin pelearse con el escapado

test('se aceptan las rutas de los directorios de imágenes del proyecto', () => {
  const buenas = [
    'imagenes/medical/bioicons/cp-servier-rinon.svg',
    'imagenes/medical/smart/ic-ambulancia.png',
    'imagenes/medical/composiciones/dg-nefrona.svg',
    'imagenes/m2/celula.webp',
    'imagenes/archivo/m2/gasto-cardiaco.svg',
    'home/logros-800.avif',
    'hero/paramedico-1200.webp',
  ]
  for (const r of buenas) assert.ok(rutaImagenSegura(r), `debería aceptarse: ${r}`)
})

test('se rechaza cualquier intento de salir del directorio de imágenes', () => {
  const malas = [
    '../secreto.svg',
    '../../etc/passwd.png',
    'imagenes/medical/../../../index.html.png',
    'imagenes/medical/%2e%2e/%2e%2e/x.svg',
    'imagenes/medical/%2E%2E/x.png',
    `imagenes${BARRA_INV}medical${BARRA_INV}x.svg`,
    `imagenes/medical/..${BARRA_INV}x.svg`,
  ]
  for (const r of malas) assert.equal(rutaImagenSegura(r), false, `debería rechazarse: ${r}`)
})

test('se rechaza lo que no es una ruta relativa de imagen', () => {
  const malas = [
    '/imagenes/medical/x.svg', // absoluta: se rompe bajo el BASE_URL de Pages
    '//evil.example/x.svg', // URL sin esquema
    'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=.svg',
    'javascript:alert(1)//x.svg',
    'file:///c:/x.png',
    'imagenes/medical/x.html', // no es una imagen
    'imagenes/medical/x.svg.exe',
    'otro-directorio/x.svg', // fuera de los autorizados
    'imagenes/x.svg', // sin subdirectorio de módulo
    '',
    null,
    undefined,
  ]
  for (const r of malas) assert.equal(rutaImagenSegura(r), false, `debería rechazarse: ${JSON.stringify(r)}`)
})

test('el origen de una imagen admite http(s) y ruta propia, y nada más', () => {
  assert.ok(origenImagenValido('https://ejemplo.org/a.png'))
  assert.ok(origenImagenValido('http://ejemplo.org/a.png'))
  assert.ok(origenImagenValido('imagenes/medical/bioicons/cp-servier-ojo.svg'))
  assert.ok(!origenImagenValido('javascript:alert(1)'))
  assert.ok(!origenImagenValido('../x.svg'))
  assert.ok(!origenImagenValido(''))
  // `urlSegura` no cambia: sigue siendo solo http(s).
  assert.ok(!urlSegura('imagenes/medical/x.svg'))
})

test('el bloque `imagen` acepta una ruta propia y sigue rechazando lo peligroso', () => {
  assert.equal(validarBloque({ tipo: 'imagen', src: 'imagenes/medical/bioicons/cp-servier-ojo.svg' }), null)
  assert.equal(validarBloque({ tipo: 'imagen', src: 'https://ejemplo.org/a.png' }), null)
  assert.match(validarBloque({ tipo: 'imagen', src: '../x.svg' }) || '', /ruta del propio sitio/)
  assert.match(validarBloque({ tipo: 'imagen', src: 'javascript:alert(1)' }) || '', /ruta del propio sitio/)
  // El hueco sin imagen (pie o término de búsqueda) sigue siendo válido: es el
  // patrón que usa el temario para señalar «falta conseguir esta figura».
  assert.equal(validarBloque({ tipo: 'imagen', caption: 'Nefrona' }), null)
})

test('el bloque `imagen` acepta un assetId del catálogo', () => {
  const alguno = ACTIVOS_MEDICOS[0].id
  assert.equal(validarBloque({ tipo: 'imagen', assetId: alguno }), null)
  assert.equal(validarBloque({ tipo: 'diagrama', assetId: alguno }), null)
  // Con assetId no hace falta ni src ni pie: el catálogo aporta ruta y alt.
  assert.equal(validarBloque({ tipo: 'imagen', assetId: alguno, src: '' }), null)
  // Y una forma inválida se rechaza antes de llegar al catálogo.
  assert.match(validarBloque({ tipo: 'imagen', assetId: '../x' }) || '', /forma válida/)
  assert.match(validarBloque({ tipo: 'imagen', assetId: 'MAYUSCULAS' }) || '', /forma válida/)
})

test('idActivoValido solo admite la forma del identificador', () => {
  assert.ok(idActivoValido('cp-servier-rinon'))
  assert.ok(idActivoValido('dg-nefrona'))
  assert.ok(!idActivoValido('CP-Servier'))
  assert.ok(!idActivoValido('cp servier'))
  assert.ok(!idActivoValido('../etc'))
  assert.ok(!idActivoValido('ab'))
  assert.ok(!idActivoValido(''))
})

test('ninguna ruta del catálogo real cae fuera de lo permitido', () => {
  // Cierra el círculo: lo que el pipeline generó tiene que pasar el mismo
  // filtro que se le exige a un editor humano.
  const mal = ACTIVOS_MEDICOS.filter((a) => !rutaImagenSegura(a.filePath)).map((a) => `${a.id} → ${a.filePath}`)
  assert.deepEqual(mal, [], `Rutas del catálogo que el validador rechazaría:\n  ${mal.join('\n  ')}`)
})
