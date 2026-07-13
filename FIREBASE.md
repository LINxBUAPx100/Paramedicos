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

## Grupos internos de una academia

El **director** (o un super-admin) crea grupos desde su dashboard: cada grupo
recibe un código `GRP-XXXX`. Profesores y alumnos entran con ese código en
**Mi cuenta → Únete con tu código** (los une al grupo Y a la academia). El
panel filtra el avance por grupo; un profesor con grupo asignado ve SOLO su
grupo. Renombrar/desactivar grupos: solo director y super-admin. En la tabla
de miembros se puede mover a cualquier miembro de grupo con un selector.

## Visibilidad de contenido por grupo (sección "Temas")

**/temario ahora es SOLO para staff** (profesor, director, super-admin): es el
panel donde se controla qué contenido ve cada grupo. Muestra el 100% del
temario real (8 fases · 68 temas) con: botón **"Ocultar todo / Mostrar
todo"**, un **ojo por módulo** (oculta la fase completa) y un **ojo por
tema**. El staff elige el grupo (el super-admin también la academia); el
profesor con grupo propio lo ve preseleccionado. Se guarda en
`grupos/{cod}.fasesOcultas / .temasOcultos` (los profesores solo pueden tocar
esos dos campos; renombrar/desactivar el grupo sigue siendo del director).

Para el **alumno con grupo**: lo oculto desaparece del menú lateral, del
carrusel del Home y de las listas de fase; si entra por URL directa ve
"Aún no disponible"; y en el **Atlas** las tarjetas bloqueadas salen en gris,
borrosas y con candado (como logros por desbloquear). Alumnos sin grupo y el
staff ven todo.

## Privacidad de los códigos (academia y grupos)

Los **códigos** de academia y de grupo solo los ven el **director** y el
**super-admin**. Alumnos y profesores ven el *nombre* de su academia/grupo
(Mi cuenta, hero del Home, panel), nunca el código. Un **profesor** que
necesite compartirlos tiene en su /panel el botón **"Solicitar ver los
códigos"**: crea una solicitud que el director aprueba desde su dashboard
(pone `puedeVerCodigos: true` en el perfil del profesor) y entonces el
profesor ve una lista de códigos en solo lectura.

## Fin de módulo y solicitudes de siguiente módulo

Al **terminar el examen de una fase**, el alumno ve una pantalla completa de
felicitaciones con el resumen de aprendizajes (los temas del módulo) y, si la
siguiente fase está oculta para su grupo, un botón **"Solicitar acceso al
siguiente módulo"**. Las solicitudes van a la colección `solicitudes` y el
staff (profesor, director o super-admin) las atiende en su panel, sección
**"Solicitudes pendientes"**: aceptar una por una, **"Aceptar todas"** o
rechazar. Aceptar añade la fase a `usuarios/{uid}.fasesDesbloqueadas`, que
**anula lo oculto del grupo solo para ese alumno**. Además, en la tabla de
avance cada alumno tiene un botón **"Habilitar F#"** para abrirle el
siguiente módulo sin esperar solicitud. Las solicitudes de códigos de los
profesores solo puede aprobarlas el director o el super-admin.

⚠️ Ambas funciones requieren **volver a publicar `firestore.rules`**
(colección `solicitudes` + campo `fasesDesbloqueadas` en `usuarios`).

## Reportes de problemas

Cada tema tiene un botón **"Reportar un problema"** (arriba a la izquierda).
Los reportes van a la colección `reportes` y el super-admin los gestiona en
**/admin → Problemas reportados** (contador de abiertos, marcar resuelto,
reabrir, eliminar). Solo el super-admin puede leerlos.

## Hero personalizado por academia

Cada academia tiene `logo` (enlace de Drive o URL), `lema` y `colorHero`. Sus
miembros ven un hero propio en el **Home** (logo + nombre + lema + color +
su grupo). Lo editan SOLO el director (sección "Personalización" en /panel)
y el super-admin (en /admin/academia/CODIGO); las reglas impiden al director
tocar otros campos (estado, plan…). Al crear una academia en /admin ya se
piden logo, lema y color.

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
