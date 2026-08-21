// ============================================================
//  Licencias de los activos médicos — registro único
// ------------------------------------------------------------
//  Un activo abierto NO es «gratis y ya»: cada archivo llega con su propio
//  autor y su propia licencia, y eso decide qué obligación tiene PTEM al
//  publicarlo. El error que este archivo impide es el que se comete siempre:
//  tomar la licencia del REPOSITORIO (BioIcons se publica bajo MIT) y
//  aplicarla a los 2 830 dibujos que aloja, que son de terceros y llevan
//  licencias distintas —CC0, MIT, CC BY 3.0, CC BY 4.0, CC BY-SA—.
//
//  Por eso aquí no hay un enum de dos valores: hay un registro con la
//  obligación real de cada licencia. `attributionRequired` y `shareAlike` son
//  lo que la interfaz consulta para decidir si una figura tiene que mostrar
//  crédito visible y si arrastra una obligación vírica que hay que declarar.
//
//  Fuente de los identificadores: SPDX (https://spdx.org/licenses/).
// ============================================================

export const LICENCIAS = {
  'CC0-1.0': {
    id: 'CC0-1.0',
    name: 'CC0 1.0 Universal (dedicación al dominio público)',
    url: 'https://creativecommons.org/publicdomain/zero/1.0/',
    attributionRequired: false,
    shareAlike: false,
  },
  MIT: {
    id: 'MIT',
    name: 'Licencia MIT',
    url: 'https://opensource.org/license/mit',
    // MIT no es «atribución» en el sentido de Creative Commons, pero obliga a
    // conservar el aviso de copyright y la licencia. A efectos de la página de
    // créditos la obligación es la misma: el aviso tiene que verse.
    attributionRequired: true,
    shareAlike: false,
    avisoObligatorio: true,
  },
  'BSD-3-Clause': {
    id: 'BSD-3-Clause',
    name: 'Licencia BSD de 3 cláusulas',
    url: 'https://opensource.org/license/bsd-3-clause',
    attributionRequired: true,
    shareAlike: false,
    avisoObligatorio: true,
  },
  'CC-BY-3.0': {
    id: 'CC-BY-3.0',
    name: 'Creative Commons Atribución 3.0 Unported',
    url: 'https://creativecommons.org/licenses/by/3.0/',
    attributionRequired: true,
    shareAlike: false,
  },
  'CC-BY-4.0': {
    id: 'CC-BY-4.0',
    name: 'Creative Commons Atribución 4.0 Internacional',
    url: 'https://creativecommons.org/licenses/by/4.0/',
    attributionRequired: true,
    shareAlike: false,
  },
  'CC-BY-SA-3.0': {
    id: 'CC-BY-SA-3.0',
    name: 'Creative Commons Atribución-CompartirIgual 3.0 Unported',
    url: 'https://creativecommons.org/licenses/by-sa/3.0/',
    attributionRequired: true,
    shareAlike: true,
  },
  'CC-BY-SA-4.0': {
    id: 'CC-BY-SA-4.0',
    name: 'Creative Commons Atribución-CompartirIgual 4.0 Internacional',
    url: 'https://creativecommons.org/licenses/by-sa/4.0/',
    attributionRequired: true,
    shareAlike: true,
  },
  // Obra propia de PTEM: rótulos, ejes, curvas y textos redactados para la
  // guía. Se declara para que una composición no parezca atribuida por
  // completo a un tercero cuando la mitad del dibujo la puso la academia.
  'PTEM-Propia': {
    id: 'PTEM-Propia',
    name: 'Obra propia de PTEM (rótulos y esquema)',
    url: '',
    attributionRequired: false,
    shareAlike: false,
    propia: true,
  },
}

// Preferencia declarada en la política: CC0 → MIT → CC BY → CC BY-SA. Se usa
// para ordenar candidatos y para avisar cuando se acepta una obligación mayor
// de la necesaria.
export const PREFERENCIA = ['CC0-1.0', 'PTEM-Propia', 'MIT', 'BSD-3-Clause', 'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0']

// Carpeta del repositorio de BioIcons → identificador SPDX. La ruta real del
// archivo es la ÚNICA fuente fiable de su licencia:
//   static/icons/<licencia>/<categoría>/<autor>/<archivo>.svg
export const CARPETA_A_LICENCIA = {
  'cc-0': 'CC0-1.0',
  mit: 'MIT',
  bsd: 'BSD-3-Clause',
  'cc-by-3.0': 'CC-BY-3.0',
  'cc-by-4.0': 'CC-BY-4.0',
  'cc-by-sa-3.0': 'CC-BY-SA-3.0',
  'cc-by-sa-4.0': 'CC-BY-SA-4.0',
}

export function licenciaDe(id) {
  return LICENCIAS[id] || null
}

// ¿La licencia está admitida por la política de PTEM? Se rechaza cualquier
// cosa que no esté en el registro: una licencia desconocida no es «probablemente
// abierta», es una licencia sin comprobar.
export function licenciaAdmitida(id) {
  return Object.prototype.hasOwnProperty.call(LICENCIAS, id)
}

export function exigeAtribucion(id) {
  return Boolean(LICENCIAS[id]?.attributionRequired)
}

export function exigeCompartirIgual(id) {
  return Boolean(LICENCIAS[id]?.shareAlike)
}

// Cadena de crédito COPIABLE. Es la que se ofrece en el panel «Créditos» para
// que quien reutilice la figura no tenga que redactarla.
//
// No incluye ninguna fórmula que sugiera respaldo: se nombra al autor, al
// proveedor y a la licencia, y nada más. Un «con el apoyo de Servier» sería
// falso y, además, contrario a la propia licencia.
export function textoAtribucion({ title, creador, creadorUrl, proveedor, licenciaId, cambios = [] }) {
  const lic = LICENCIAS[licenciaId]
  const partes = []
  if (title) partes.push(`«${title}»`)
  if (creador) partes.push(`de ${creador}${creadorUrl ? ` (${creadorUrl})` : ''}`)
  if (proveedor) partes.push(`vía ${proveedor}`)
  if (lic) partes.push(lic.url ? `bajo ${lic.id} (${lic.url})` : `bajo ${lic.name}`)
  let s = partes.join(', ')
  if (cambios.length) s += `. Adaptado por PTEM: ${cambios.join('; ')}`
  return `${s}.`
}

export const NOMBRE_PROVEEDOR = {
  bioicons: 'BioIcons',
  servier_smart: 'Servier Medical Art (SMART)',
  ptem: 'PTEM',
}

export const URL_PROVEEDOR = {
  bioicons: 'https://bioicons.com/',
  servier_smart: 'https://smart.servier.com/',
  ptem: '',
}
