// ============================================================
//  Roles de la plataforma — nombres y etiquetas
// ------------------------------------------------------------
//  Vivían dentro de `components/PanelAcademia.jsx`, así que la consola del
//  super-admin importaba un componente de 1271 líneas solo para traducir
//  'admin_escuela' → 'Director'. Módulo puro, sin React.
// ============================================================

// `recepcion` (20-09-2026) es el personal de mostrador. NO es «staff» en el
// sentido de las reglas: `esStaffDe()` significa instructor o director, y con
// eso se abre la lectura de `temas`, `cursos` y `dictamenes`. Meter recepción
// ahí le regalaría el temario completo de la academia, que es exactamente lo
// que el plan técnico dejó avisado. Tiene predicado propio —`esRecepcionDe()`
// en firestore.rules— y alcanza a personas, asistencias, pagos, órdenes y
// artículos de SU academia. Nada más.
export const ROLES = ['alumno', 'instructor', 'recepcion', 'admin_escuela', 'superadmin']

// Los roles que un DIRECTOR puede asignar dentro de su academia: nunca puede
// crear otro director ni un super-admin.
export const ROLES_DIRECTOR = ['alumno', 'instructor', 'recepcion']

export const ETIQUETA_ROL = {
  alumno: 'Alumno',
  instructor: 'Profesor',
  recepcion: 'Recepción',
  admin_escuela: 'Director',
  superadmin: 'Super-admin',
}
