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

- **/admin** (super-admin): todas las academias con sus números, **crear
  academias**, **crear usuarios** (con contraseña temporal, rol y academia),
  gestión global de usuarios (rol, nombre, suspender, **eliminar**, enviarles
  el correo de restablecimiento de contraseña), códigos de prueba globales, y
  entrada al dashboard individual de cada academia (`/admin/academia/CODIGO`),
  donde además puede suspender/reactivar la academia.
- **/panel** (director): estadísticas + avance de sus alumnos, gestión de
  miembros (nombrar/quitar profesores, suspender cuentas) y códigos de prueba
  de su academia.
- **/panel** (profesor/instructor): estadísticas y avance, solo lectura.
- Todos los paneles incluyen: promedio general, % de aprobación, alumnos
  activos, intentos de la semana, dominio por fase (barras), actividad
  reciente y alumnos en riesgo (<70% de promedio).
- Los alumnos ven su mejor puntuación por fase en la página **Examen**.

## Códigos de prueba (acceso temporal)

El super-admin y los directores pueden generar códigos `PRUEBA-XXXX`
(3/7/14/30 días) desde su dashboard. Quien lo reciba lo activa en
**Mi cuenta → Únete con tu código**: obtiene acceso al contenido hasta la
fecha de expiración, sin pertenecer a una academia. Las reglas impiden
inventarse la fecha (se copia del código) y los códigos pueden desactivarse.

## Límites sin servidor (plan Spark, importante)

- **Crear usuarios desde /admin** funciona con una sesión secundaria: la
  cuenta se crea con contraseña temporal y NO cierra tu sesión.
- **La contraseña de otro usuario no se puede cambiar directamente**: se le
  envía el correo oficial de restablecimiento (botón 🔑 en /admin, o
  "¿Olvidaste tu contraseña?" en el login).
- **El correo de inicio de sesión de otro usuario no se puede cambiar**: cada
  quien lo cambia en Mi cuenta → Editar mis datos (llega un enlace de
  verificación al correo nuevo).
- **Eliminar usuario** borra su perfil y su progreso (los intentos se
  conservan). Su registro de Auth se elimina del todo en la consola →
  Authentication → Users. Si vuelve a entrar sin eso, renace como alumno sin
  academia.

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
