// ============================================================
//  Errores de Firebase → una frase en español que se pueda actuar
// ------------------------------------------------------------
//  Vivía dentro de Cuenta.jsx y solo cubría los códigos de Auth. Se saca aquí
//  por dos motivos:
//
//   · «Bienvenida» hace los mismos canjes y mostraba `err.message` tal cual, o
//     sea, el texto en inglés del SDK. Quien recibió una invitación y pulsó
//     «Activar código» vio literalmente «Missing or insufficient permissions.»:
//     ni entendible, ni accionable, ni traducible por quien lo lee.
//
//   · Los errores de FIRESTORE (no solo los de Auth) también salen a pantalla,
//     y no tenían traducción ninguna.
//
//  Regla: si no se reconoce el código, se devuelve el mensaje original antes
//  que un texto genérico. Los mensajes propios de la app ya vienen en español y
//  son los más precisos que hay (los lanzan canjear.js, invitaciones.js…).
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

export const GENERICO = 'Ocurrió un error. Intenta de nuevo.'

export function mensajeDeError(e) {
  const c = String(e?.code || '')

  // --- Auth ---
  if (c.includes('invalid-credential') || c.includes('wrong-password')) return 'Correo o contraseña incorrectos.'
  if (c.includes('email-already-in-use')) return 'Ese correo ya está registrado. Inicia sesión.'
  if (c.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.'
  if (c.includes('invalid-email')) return 'El correo no es válido.'
  if (c.includes('popup-closed')) return 'Cerraste la ventana de Google antes de terminar.'
  if (c.includes('requires-recent-login')) return 'Por seguridad, cierra sesión y vuelve a entrar antes de hacer este cambio.'
  if (c.includes('too-many-requests')) return 'Demasiados intentos seguidos. Espera unos minutos y vuelve a probar.'

  // --- Firestore ---
  // 'permission-denied' es el que veía quien intentaba activar su invitación
  // con el perfil incompleto. Ya no debería ocurrir (se repara antes de
  // canjear), pero si ocurre tiene que decir qué hacer.
  if (c.includes('permission-denied')) {
    return 'Tu cuenta no tiene permiso para hacer ese cambio. '
      + 'Cierra sesión, vuelve a entrar e inténtalo otra vez; si sigue igual, '
      + 'envía el diagnóstico desde «Mi cuenta» y avisa a tu academia.'
  }
  if (c.includes('not-found')) return 'Eso ya no existe. Actualiza la página y vuelve a intentarlo.'
  if (c.includes('unavailable') || c.includes('network')) return 'Sin conexión. Revisa tu internet y vuelve a intentarlo.'
  if (c.includes('deadline-exceeded')) return 'La conexión tardó demasiado. Vuelve a intentarlo.'

  // Mensaje propio de la app (ya en español) o, en último caso, el genérico.
  return e?.message || GENERICO
}
