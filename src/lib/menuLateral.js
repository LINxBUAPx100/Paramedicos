// ============================================================
//  ¿Hay algo que abrir en el cajón lateral?
// ------------------------------------------------------------
//  En la portada sin sesión, el botón de hamburguesa abría un panel con UN
//  enlace —«Inicio»— que ya estaba en la barra de arriba, y nada más: el
//  recorrido de estudio se vacía cuando el visitante no tiene acceso (ver
//  `veContenido` en Layout.jsx). Un control que no lleva a ninguna parte es
//  peor que no tener el control.
//
//  LA REGLA NO ES «¿HAY SESIÓN?». Es «¿ofrece el cajón algo que la barra de
//  arriba no enseñe ya?». La diferencia importa el día que alguien añada un
//  enlace de cajón para visitantes: con esta regla el botón reaparece solo,
//  sin que nadie tenga que acordarse de venir aquí.
//
//  Vive fuera del componente para poder probarla sin montar React: el caso que
//  hay que blindar —con temario, el botón SIGUE estando— es justo el que no se
//  puede comprobar abriendo la página sin credenciales.
// ============================================================

/**
 * @param {object} args
 * @param {Array<{to: string}>} args.navDrawer  enlaces del cajón, ya filtrados por permisos
 * @param {Array<{to: string}>} args.topnav     enlaces de la barra superior, ya filtrados
 * @param {number} args.modulos                 cuántos módulos del temario son visibles
 * @returns {boolean} si merece la pena enseñar el botón y montar el cajón
 */
export function hayMenuLateral({ navDrawer = [], topnav = [], modulos = 0 } = {}) {
  // El recorrido de estudio solo vive en el cajón: si hay un módulo visible,
  // ya hay motivo, sin mirar los enlaces.
  if (modulos > 0) return true
  const enLaBarra = new Set(topnav.map((i) => i.to))
  return navDrawer.some((i) => !enLaBarra.has(i.to))
}
