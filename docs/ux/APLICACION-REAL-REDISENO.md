# Aplicación real del rediseño — 10 de septiembre de 2026

La entrega anterior exageró la integración visual: `rediseno.html` es un laboratorio independiente. Compartir estilos con ese laboratorio no hace que todas sus pantallas existan en la aplicación. Esta corrección aplica cambios adicionales a los componentes que importa la entrada principal, sin cambiar el comando normal de desarrollo.

## Rutas para revisar con npm run dev

- `/#/`, sin sesión: seis carreras en rejilla, todas accesibles, con estado real de disponibilidad. En 360 px hay una columna; en 1366 px, tres. La fotografía de portada se conserva.
- `/#/`, con acceso al curso: sección «Tu recorrido de estudio», módulos autorizados en lista con búsqueda y avance de lectura. Todos enlazan a su módulo real. El director conserva la configuración de secciones del inicio.
- `/#/panel/calificaciones`, con rol autorizado: búsqueda por nombre/correo, filtros de riesgo/sin evidencia/pendientes, orden y páginas de 20 alumnos. Conserva evaluaciones, ponderaciones y guardado existentes. Las mismas mejoras llegan al libro que usa el superadmin. Una nueva edición limpia el mensaje «Guardado» de la edición anterior.
- Las consolas usan el riel de navegación lateral continuo en escritorio; conservan sus destinos y controles de acceso.

## Archivos de esta corrección

- `C:/Users/PC/Documents/Paramedicos/src/components/CarrerasCarrusel.jsx` — modificado: reemplaza la baraja por catálogo visible; mantiene la importación existente.
- `C:/Users/PC/Documents/Paramedicos/src/components/ModulosCarrusel.jsx` — modificado: lista con búsqueda, enlaces y progreso.
- `C:/Users/PC/Documents/Paramedicos/src/pages/Home.jsx` — modificado: título y explicación del recorrido.
- `C:/Users/PC/Documents/Paramedicos/src/pages/panel/Calificaciones.jsx` — modificado: filtros, orden, paginación y estado de guardado.
- `C:/Users/PC/Documents/Paramedicos/src/lib/tablaCalificaciones.js` — creado: búsqueda y clasificación de las filas autorizadas.
- `C:/Users/PC/Documents/Paramedicos/src/styles/pantallas.css` — modificado sobre el archivo nuevo de la entrega anterior: catálogos, libro y navegación de consola responsivos.
- `C:/Users/PC/Documents/Paramedicos/tests/redisenoUx.test.mjs` — modificado sobre el archivo nuevo de la entrega anterior: regresiones de filtros y conexión a la entrada principal.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/ENTREGA-REDISENO.md` — modificado sobre el archivo nuevo de la entrega anterior: corrige el alcance declarado y el comando para revisar.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/APLICACION-REAL-REDISENO.md` — creado: este parte.

## Comprobación visual y límites

Servidor real iniciado con `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`: Vite listo en 318 ms. El primer intento dentro del sandbox falló por acceso a la configuración; el segundo, con permiso ampliado, funcionó.

En el navegador de la aplicación real se comprobaron seis tarjetas y ausencia de desbordamiento horizontal: 345/345 px de ancho visible/contenido en viewport 360, y 1351/1351 px en viewport 1366. Se revisaron modo claro y oscuro. Los cambios aparecieron mediante HMR en la entrada principal.

No había sesión autenticada: el libro real y el inicio del alumno requieren comprobación visual con una cuenta autorizada. No se simularon permisos, no se inició sesión con credenciales inventadas y no se escribió en Firebase. No se puede afirmar conformidad WCAG completa ni migración completa de las pantallas privadas.

La publicación sigue pendiente: el encargo y AGENTS.md prohíben desplegar sin una petición explícita. Todos los cambios permanecen sin commit en el clon local, visibles en GitHub Desktop. Los demás pendientes de la migración continúan en FASE-6-MIGRACION.md.

## Verificación de la corrección inicial

- `npm run gen:plan`: exit 0; 7 módulos, 56 unidades, 287 temas.
- `npm run gen:nav`: exit 0.
- `npm test`: 1235 pruebas; pass 1235, fail 0, skipped 0; 335209.5673 ms.
- `npm run build`: exit 0, 5.38 s. Permanece el aviso de chunks mayores de 500 kB.
- `npm run inventario`: exit 0; pendientes por módulo 1, 4, 2, 3, 4, 2, 4.
- `node --test tests/redisenoUx.test.mjs`: 10 pass, 0 fail.
- `git diff --check`: exit 0; avisos de conversión LF/CRLF, sin errores de diff.
- `npm run test:rules`: no repetido en esta corrección; el intento previo no pudo arrancar porque no está disponible el comando firebase. No se declara aprobado.

Registros de esta corrida: `%TEMP%/ptem-app-real-{gen-plan,gen-nav,test,build,inventario}.log`. La continuación solicitada después de esta corrida debe volver a comprobar sus cambios.
