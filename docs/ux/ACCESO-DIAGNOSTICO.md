# Acceso: mensajes y diagnóstico de Auth

La revisión del navegador integrado seguía mostrando una sesión cerrada. Sin el código del intento fallido no se ha confirmado la causa del bloqueo. Esta entrega mejora el acceso real en `/#/cuenta` para que el fallo sea comprensible y permita obtener ese código.

## Cambios

- Mensajes específicos para dominio no autorizado, ventana emergente bloqueada, almacenamiento no disponible, entorno incompatible y método no habilitado.
- El cierre de la ventana de Google ya no se atribuye automáticamente a una acción del usuario.
- El aviso de error ofrece «Datos para soporte» cuando Firebase devuelve un código `auth/...`. Se muestra únicamente ese código, sin serializar credenciales ni objetos de sesión.
- La pantalla presenta un título y contexto para entrar o crear cuenta. Los métodos y permisos de autenticación no cambian.

## Archivos tocados

- `C:/Users/PC/Documents/Paramedicos/src/lib/mensajeError.js` — modificado: traducciones y acciones para errores de acceso.
- `C:/Users/PC/Documents/Paramedicos/src/pages/Cuenta.jsx` — modificado: encabezado y código de error desplegable.
- `C:/Users/PC/Documents/Paramedicos/src/styles/pantallas.css` — modificado: estilos del acceso y diagnóstico.
- `C:/Users/PC/Documents/Paramedicos/tests/accesoDiagnostico.test.mjs` — creado: regresiones de mensajes, distinción de credenciales y conservación de errores desconocidos.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/ACCESO-DIAGNOSTICO.md` — creado: este parte.

## Verificación dirigida

`node --test tests/accesoDiagnostico.test.mjs tests/codigoInvitacion.test.mjs tests/redisenoUx.test.mjs`: 30 pass, 0 fail, 0 skipped.

`git diff --check`: exit 0.

En el navegador real, la ruta `/#/cuenta` muestra «Entra a tu academia». Sin desbordamiento horizontal: 596/596 px en la ventana disponible y 345/345 px en viewport de 360. Se restauró el tamaño de ventana tras comprobarlo.

No se provocaron errores mediante cuentas inventadas ni se enviaron formularios de acceso, restablecimiento o alta. Falta reproducir el fallo con el método y el código exactos del usuario. No se ha demostrado que la autenticación esté reparada. No se modificaron reglas ni se publicó nada.

## Verificación completa

- `npm run gen:plan`: exit 0; 7 módulos, 56 unidades, 287 temas.
- `npm run gen:nav`: exit 0.
- `npm test`: pass 1238, fail 0, skipped 0; 149171.9758 ms.
- `npm run build`: exit 0; 3.44 s; permanece el aviso de chunks mayores de 500 kB.
- `npm run inventario`: exit 0; pendientes por módulo 1, 4, 2, 3, 4, 2, 4.
- `npm run test:rules`: no ejecutado; el intento previo no pudo arrancar por falta de Firebase CLI. No se declara aprobado.

Logs: `%TEMP%/ptem-acceso-{gen-plan,gen-nav,test,build,inventario}.log`. Cambios sin commit. Para continuar el diagnóstico se necesita el código que aparezca en «Datos para soporte» tras el intento fallido.
