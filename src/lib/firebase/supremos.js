// ============================================================
//  Admin(es) supremo(s) de la plataforma
// ------------------------------------------------------------
//  Reconocidos por su correo de Firebase Auth. Debe coincidir con la
//  lista de `esSupremo()` en firestore.rules: las reglas son las que
//  dan el poder real; esta lista solo enciende la UI y dispara la
//  auto-promoción del doc de usuario a rol 'superadmin'.
// ============================================================
export const CORREOS_SUPREMOS = ['mihayolo228@gmail.com']

export function esCorreoSupremo(email) {
  return Boolean(email) && CORREOS_SUPREMOS.includes(String(email).toLowerCase())
}
