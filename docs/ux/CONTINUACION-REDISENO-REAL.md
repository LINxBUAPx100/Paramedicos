# Continuación sobre la aplicación principal

El usuario pidió continuar después de corregir la confusión entre el laboratorio y la aplicación real. Estos cambios se cargan con `npm run dev`, sin abrir `rediseno.html`.

## Cambios visibles

- Navegación: a partir de 1100 px, las rutas de estudio muestran el menú lateral fijo. En móvil continúa como cajón. Las páginas públicas, las consolas, el editor y los lienzos 3D conservan sus propios espacios. El menú sigue recibiendo únicamente los enlaces y temas autorizados; los módulos se despliegan individualmente.
- Módulo: búsqueda por título, número o resumen; filtro de pendientes/leídos y conteo sobre el conjunto visible. Los filtros se guardan en la URL para conservarse al volver. Un fallo al cargar fichas ahora ofrece reintentar, en lugar de parecer un módulo vacío.
- Lección: título y aviso editorial antes de las herramientas de revisión. El índice permanece accesible al desplazarse; al elegir una sección se cierra y mueve el foco al destino, dejando espacio bajo el encabezado.
- Panel: seguimiento primero; estadísticas ampliadas bajo un desplegable. Revisión docente muestra 20 temas por página, conserva consulta y estado editorial en URL, y mantiene la autorización vigente para firmar.
- Editor: árbol con desplazamiento propio en escritorio, selección visible y campos adaptados al sistema compartido. No se cambió el contrato de edición ni se efectuaron escrituras.
- CSS: los tokens originales claro/oscuro viven ahora en `styles/marca.css`, importado por `index.css`. Se compararon 105 declaraciones con la versión anterior mediante PostCSS: mismos selectores, propiedades y valores. Los estilos históricos de las pantallas todavía no se han retirado.

## Archivos tocados en esta continuación

- `C:/Users/PC/Documents/Paramedicos/src/components/Layout.jsx` — modificado: navegación persistente y módulos desplegables con comportamiento móvil y foco.
- `C:/Users/PC/Documents/Paramedicos/src/components/ui/IndiceLeccion.jsx` — modificado: cierra el índice antes de enfocar la sección.
- `C:/Users/PC/Documents/Paramedicos/src/pages/ModuloPage.jsx` — modificado: filtros en URL, conteos y error de fichas.
- `C:/Users/PC/Documents/Paramedicos/src/pages/TemaPage.jsx` — modificado: título y aviso antes de acciones docentes.
- `C:/Users/PC/Documents/Paramedicos/src/pages/panel/Resumen.jsx` — modificado: estadísticas ampliadas desplegables.
- `C:/Users/PC/Documents/Paramedicos/src/pages/panel/Revision.jsx` — modificado: filtros persistentes y paginación.
- `C:/Users/PC/Documents/Paramedicos/src/styles/pantallas.css` — modificado: navegación, índice, listado, resumen y editor reales.
- `C:/Users/PC/Documents/Paramedicos/src/index.css` — modificado: importa los tokens extraídos.
- `C:/Users/PC/Documents/Paramedicos/src/styles/marca.css` — creado: tokens originales de marca y modo oscuro.
- `C:/Users/PC/Documents/Paramedicos/tests/tokensCss.test.mjs` — modificado: comprueba también las importaciones CSS locales.
- `C:/Users/PC/Documents/Paramedicos/tests/redisenoUx.test.mjs` — modificado: incluye la nueva hoja de tokens en la comprobación de variables.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/APLICACION-REAL-REDISENO.md` — modificado: registra los resultados de la corrección inicial.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/FASE-3-SISTEMA-DE-DISENO.md` — modificado: documenta el orden real de importación de tokens.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/FASE-6-MIGRACION.md` — modificado: actualiza lo migrado y lo pendiente.
- `C:/Users/PC/Documents/Paramedicos/docs/ux/CONTINUACION-REDISENO-REAL.md` — creado: este parte.

## Verificación y límites

Comprobación dirigida: `node --test tests/redisenoUx.test.mjs tests/tokensCss.test.mjs tests/menuLateral.test.mjs tests/portadasASangre.test.mjs tests/cifrasDelHero.test.mjs`: 30 pass, 0 fail. Un primer intento de extracción no escribió marca.css; la prueba detectó el archivo ausente. Se corrigió la escritura y volvió a pasar íntegra, sin omitir pruebas.

Las rutas privadas requieren una sesión válida para completar la inspección visual. No se suplanta ningún rol, no se alteran reglas ni contenido académico, y no se ejecutan formularios de escritura. La conformidad AA completa, las pruebas humanas y los contratos pendientes de recuperación continúan sin certificarse.

No se hizo commit, push ni despliegue. No hay una nueva decisión de producto que bloquee estos cambios; la publicación sigue requiriendo petición explícita del dueño.

## Resultado final de esta continuación

- `npm run gen:plan`: exit 0; 7 módulos, 56 unidades, 287 temas.
- `npm run gen:nav`: exit 0.
- `npm test`: 1235 pruebas; pass 1235, fail 0, skipped 0; 332905.4966 ms.
- `npm run build`: exit 0; 4.38 s. Aviso conservado de chunks mayores de 500 kB (SDK de Firebase: 720.23 kB).
- `npm run inventario`: exit 0; pendientes por módulo 1, 4, 2, 3, 4, 2, 4.
- `git diff --check`: exit 0.
- `npm run test:rules`: no ejecutado en esta continuación; el intento previo falló porque no está disponible el comando firebase. No está aprobado.

Logs: `%TEMP%/ptem-continuacion-real-{gen-plan,gen-nav,test,build,inventario}.log`.

En la aplicación real se verificó después de la extracción que `--primario` sigue siendo `#0c5fc4` y el cuerpo carga Fira Sans. La pantalla de acceso no presenta desbordamiento (596/596 px de ancho visible/contenido). Al cerrar la verificación esa pestaña seguía sin sesión, por lo que no se declara inspección visual aprobada de las pantallas privadas. El usuario indicó que iniciaría sesión; no se tocaron sus campos de acceso.
