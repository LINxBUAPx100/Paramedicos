# Firebase — guía rápida de PTEM

Proyecto: **ptem-a304f** · La app usa Firebase Auth (email/Google) + Firestore.
La config del cliente está incrustada en `src/lib/firebase/init.js` (es pública
por diseño; la seguridad la dan las Security Rules).

## ⚠️ Paso pendiente: publicar las reglas actualizadas

Los **exámenes de fase** guardan cada intento en la colección `intentos`, y el
**panel del maestro** lee alumnos e intentos de su academia. Ambas cosas
necesitan las reglas de [`firestore.rules`](./firestore.rules) publicadas:

1. [Consola de Firebase](https://console.firebase.google.com/project/ptem-a304f/firestore/rules)
   → Firestore Database → pestaña **Reglas**.
2. Borra lo que haya y pega **todo** el contenido de `firestore.rules`.
3. **Publicar**.

Mientras no se publiquen: el examen funciona pero muestra
"⚠ No se pudo guardar el intento", y el panel del maestro no carga datos.

## Roles

| Rol | Cómo se asigna | Qué puede |
|---|---|---|
| `alumno` | Automático al registrarse | Estudiar (si su academia está activa) |
| `instructor` | Consola → `usuarios/{uid}` → `rol` | Ver el Panel de avance de su academia |
| `admin_escuela` | Consola (por ahora) | Igual que instructor (panel de gestión: próxima fase) |
| `superadmin` | Consola, una sola vez | Todo: bypass de pagos, panel de cualquier academia |

Para que un maestro vea a un alumno, ambos deben tener el mismo `academiaId`.

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
