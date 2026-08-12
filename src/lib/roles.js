// ============================================================
//  Roles de la plataforma — nombres y etiquetas
// ------------------------------------------------------------
//  Vivían dentro de `components/PanelAcademia.jsx`, así que la consola del
//  super-admin importaba un componente de 1271 líneas solo para traducir
//  'admin_escuela' → 'Director'. Módulo puro, sin React.
// ============================================================

export const ROLES = ['alumno', 'instructor', 'admin_escuela', 'superadmin']

// Los roles que un DIRECTOR puede asignar dentro de su academia: nunca puede
// crear otro director ni un super-admin.
export const ROLES_DIRECTOR = ['alumno', 'instructor']

export const ETIQUETA_ROL = {
  alumno: 'Alumno',
  instructor: 'Profesor',
  admin_escuela: 'Director',
  superadmin: 'Super-admin',
}
