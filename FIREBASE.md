# Firebase — guía rápida de PTEM

Proyecto: **ptem-a304f** · La app usa Firebase Auth (email/Google) + Firestore.
La config del cliente está incrustada en `src/lib/firebase/init.js` (es pública
por diseño; la seguridad la dan las Security Rules).

## ⚠️ Paso pendiente: publicar las reglas actualizadas

Los **exámenes de fase** guardan cada intento en la colección `intentos`; el
**panel del maestro/director** lee alumnos e intentos de su academia; y el
**dashboard del super-admin** (`/admin`) lee TODO y cambia roles. Todo eso
necesita las reglas de [`firestore.rules`](./firestore.rules) publicadas:

1. [Consola de Firebase](https://console.firebase.google.com/project/ptem-a304f/firestore/rules)
   → Firestore Database → pestaña **Reglas**.
2. Borra lo que haya y pega **todo** el contenido de `firestore.rules`.
3. **Publicar**.

Mientras no se publiquen: el examen funciona pero muestra
"⚠ No se pudo guardar el intento", los paneles no cargan datos y los cambios
de rol fallan.

## Admin supremo (por correo)

`mihayolo228@gmail.com` es el **admin supremo**: las reglas
(`esSupremo()` en `firestore.rules`) y la app (`src/lib/firebase/supremos.js`)
lo reconocen por su correo de inicio de sesión, sin tocar la consola. En su
primer acceso la app promueve sola su perfil a `rol: superadmin`. Para añadir
otro supremo, agrega el correo en **ambos** archivos y vuelve a publicar las
reglas. ⚠️ El repo es público: ese correo queda visible en GitHub.

## Roles y jerarquía

| Rol | Cómo se asigna | Qué puede |
|---|---|---|
| `alumno` | Automático al registrarse | Estudiar (si su academia está activa) |
| `instructor` (profesor) | El director o un super-admin, desde su dashboard | Ver el Panel de avance de su academia |
| `admin_escuela` (director) | Un super-admin, desde `/admin` | Panel de su academia + nombrar profesores (alumno↔instructor) + suspender miembros |
| `superadmin` | El supremo entra solo; otros se nombran desde `/admin` | Todo: `/admin` con todas las academias, cualquier rol, suspender academias, bypass de pagos |

Para que un maestro vea a un alumno, ambos deben tener el mismo `academiaId`.

## Dashboards

- **/admin** (super-admin): todas las academias con sus números, gestión global
  de usuarios y roles, y entrada al dashboard individual de cada academia
  (`/admin/academia/CODIGO`), donde además puede suspender/reactivar la academia.
- **/panel** (director): avance de sus alumnos + gestión de miembros
  (nombrar/quitar profesores, suspender cuentas).
- **/panel** (profesor/instructor): avance de sus alumnos, solo lectura.
- Los alumnos ven su mejor puntuación por fase en la página **Examen**.

## Crear una academia

Firestore → colección `academias` → nuevo documento cuyo **ID es el código**
(p. ej. `AEP-2026`) con campos *(string)*: `nombre`, `tipo`
(`basico`|`avanzado`|`medicina`), `plan`, `estado` (`activo`|`suspendido`),
`fechaRenovacion`.

- `estado: activo` → sus miembros acceden al contenido.
- `estado: suspendido` → sus miembros ven "Tu academia no está al corriente".

## Al publicar en GitHub Pages

Authentication → Settings → **Authorized domains** → añadir
`linxbuapx100.github.io` (necesario solo para el login con Google en producción).

## Usuarios de prueba (borrables)

- `test-ptem-01@example.com` (alumno con academia AEP-2026)
- `test-ptem-nogate@example.com` (alumno sin academia)

Se borran en Authentication → Users y su doc en `usuarios`.
