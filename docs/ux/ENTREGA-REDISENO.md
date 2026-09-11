# Rediseño PTEM — entrega local

## Qué se puede revisar

La aplicación carga una migración parcial desde `src/main.jsx`. La capa compartida no equivale a trasladar todas las pantallas del prototipo: siguen existiendo estructuras anteriores. Hay navegación real a `/panel/revision`, seguimiento dentro de `/panel`, invitación contextual en Grupos y correcciones de banco vacío, elegibilidad y feedback de nota. No se publicó nada.

La aplicación real se abre con `npm run dev`, en la URL que imprime Vite (por defecto `http://localhost:5173/`). El 10 de septiembre se trasladaron además el catálogo visible de seis carreras, la lista buscable de módulos y los filtros, orden y paginación del libro real de calificaciones. Ver [corrección y comprobación de la entrada principal](APLICACION-REAL-REDISENO.md). Los cambios se actualizan por HMR; no hay que abrir `rediseno.html` para verlos.

La vista independiente se abre con `npm run dev:rediseno` en `http://127.0.0.1:4175/rediseno.html`. Sirve para revisar sin sesión ni escrituras en Firebase; formularios y notas de esa vista son simulaciones explícitas. El prototipo no sustituye las rutas autenticadas.

Documentación:

- [Sistema de diseño](FASE-3-SISTEMA-DE-DISENO.md).
- [Pantallas, prototipo y QA](FASES-4-5-PANTALLAS-Y-PROTOTIPO.md).
- [Plan de migración y pendientes](FASE-6-MIGRACION.md).

## Archivos tocados en esta implementación

Cada línea identifica el archivo real y la operación. Los documentos de Fases0–2 y la configuración local de Claude ya estaban en el árbol y se conservaron.

- C:\Users\PC\Documents\Paramedicos\package.json — modificado: comandos de desarrollo y build del laboratorio.
- C:\Users\PC\Documents\Paramedicos\rediseno.html — creado: entrada HTML independiente.
- C:\Users\PC\Documents\Paramedicos\vite.prototipo.config.js — creado: compilación del laboratorio sin configuración Firebase.
- C:\Users\PC\Documents\Paramedicos\src\main.jsx — modificado: carga de las tres capas de diseño después de la base.
- C:\Users\PC\Documents\Paramedicos\src\App.jsx — modificado: ruta protegida de revisión docente dentro del panel.
- C:\Users\PC\Documents\Paramedicos\src\styles\tokens.css — creado: tokens semánticos de la nueva capa.
- C:\Users\PC\Documents\Paramedicos\src\styles\componentes.css — creado: controles, tablas, campos, estados, etiquetas e índice.
- C:\Users\PC\Documents\Paramedicos\src\styles\pantallas.css — creado: adaptadores para las pantallas existentes.
- C:\Users\PC\Documents\Paramedicos\src\components\ui\IndiceLeccion.jsx — creado: navegación y foco entre secciones de la lección.
- C:\Users\PC\Documents\Paramedicos\src\components\Contenido.jsx — modificado: destinos enfocados por índice; opción de glosario desactivado solo para el laboratorio.
- C:\Users\PC\Documents\Paramedicos\src\components\Quiz.jsx — modificado: banco vacío, selección accesible, anuncio y foco de pregunta.
- C:\Users\PC\Documents\Paramedicos\src\components\panel\SeguimientoAlumnos.jsx — creado: resumen, filtros, búsqueda, orden, paginación y detalle.
- C:\Users\PC\Documents\Paramedicos\src\components\panel\PanelShell.jsx — modificado: entrada de navegación a Revisión docente.
- C:\Users\PC\Documents\Paramedicos\src\components\panel\AltaDeRecepcion.jsx — modificado: esperar confirmación real del portapapeles.
- C:\Users\PC\Documents\Paramedicos\src\components\panel\InvitacionesRol.jsx — modificado: grupo inicial validado contra los grupos disponibles.
- C:\Users\PC\Documents\Paramedicos\src\components\panel\VisibilidadGrupos.jsx — modificado: confirmar cambio de módulo conservando excepciones de temas.
- C:\Users\PC\Documents\Paramedicos\src\context\ContenidoContext.jsx — modificado: contrastar banco agregado con fichas avaladas en exámenes de módulo/general.
- C:\Users\PC\Documents\Paramedicos\src\lib\bancoExamen.js — modificado: filtro puro de preguntas por fichas avaladas.
- C:\Users\PC\Documents\Paramedicos\src\lib\seguimientoModelo.js — creado: cálculo de categorías y consulta de alumnos sin convertir ausencias en ceros.
- C:\Users\PC\Documents\Paramedicos\src\lib\visibilidadEdicion.js — creado: alternancia pura de módulo que conserva excepciones.
- C:\Users\PC\Documents\Paramedicos\src\pages\TemaPage.jsx — modificado: índice y accesos de práctica junto a la lección.
- C:\Users\PC\Documents\Paramedicos\src\pages\BuscarPage.jsx — modificado: nombre accesible y anuncio de resultados.
- C:\Users\PC\Documents\Paramedicos\src\pages\ExamenModuloPage.jsx — modificado: estado sin preguntas y comienzo desactivado.
- C:\Users\PC\Documents\Paramedicos\src\pages\ExamenPage.jsx — modificado: estado sin banco y cantidad disponible al comenzar.
- C:\Users\PC\Documents\Paramedicos\src\pages\panel\Resumen.jsx — modificado: seguimiento dentro de la página del panel.
- C:\Users\PC\Documents\Paramedicos\src\pages\panel\Revision.jsx — creado: índice de temas visibles, búsqueda, estado editorial y motivo de falta de pase.
- C:\Users\PC\Documents\Paramedicos\src\pages\panel\Calificaciones.jsx — modificado: selector de grupo y estados de guardado por celda.
- C:\Users\PC\Documents\Paramedicos\src\pages\panel\Grupos.jsx — modificado: selector de grupo de trabajo e invitación contextual junto a visibilidad.
- C:\Users\PC\Documents\Paramedicos\src\prototipo\main.jsx — creado: nueve vistas navegables y escenarios de revisión sin proveedores autenticados.
- C:\Users\PC\Documents\Paramedicos\src\prototipo\datos.js — creado: alumnos sintéticos y referencias a contenido original para las muestras.
- C:\Users\PC\Documents\Paramedicos\src\prototipo\prototipo.css — creado: armazón adaptable del laboratorio.
- C:\Users\PC\Documents\Paramedicos\tests\redisenoUx.test.mjs — creado: casos de evidencia, elegibilidad, alcance, tokens y conservación de excepciones.
- C:\Users\PC\Documents\Paramedicos\tests\limpieza.test.mjs — modificado: reconocer entradas reales cargadas por scripts module desde HTML, comprobando que existan.
- C:\Users\PC\Documents\Paramedicos\tests\paridadSuperAdmin.test.mjs — modificado: mapear Revisión a la ruta administrativa ya existente, sin excluirla del control.
- C:\Users\PC\Documents\Paramedicos\docs\ux\FASE-3-SISTEMA-DE-DISENO.md — creado: contrato, biblioteca, estados y mapeo de migración.
- C:\Users\PC\Documents\Paramedicos\docs\ux\FASES-4-5-PANTALLAS-Y-PROTOTIPO.md — creado: pantallas aplicadas, funcionamiento y evidencia de QA.
- C:\Users\PC\Documents\Paramedicos\docs\ux\FASE-6-MIGRACION.md — creado: secuencia restante, criterios de aceptación y medición propuesta.
- C:\Users\PC\Documents\Paramedicos\docs\ux\ENTREGA-REDISENO.md — creado: este parte y resultados de verificación.

Los generadores escribieron sus salidas habituales, sin cambios de contenido en el diff final. No se editó texto en `src/data/contenido/**`, estados editoriales, reglas de Firebase ni archivos de legado. No se instalaron dependencias.

## Qué queda pendiente

La aplicación del diseño es incremental. Continúan pendientes la retirada del monolito CSS, migración completa de todas las tablas/formularios y diálogos, reenvío idempotente de intentos, protección de salida, restauración completa de navegación y algunas propuestas de arquitectura de Fase2. La Fase6 los enumera: no se anuncian como entregados.

No se probaron sesiones autenticadas contra Firebase, todas las marcas personalizadas ni lectores de pantalla reales. La revisión local móvil/escritorio no constituye certificación WCAG2.2AA. Las reglas no se ejecutan sin Firebase CLI disponible; no se instalaron herramientas sin autorización.

Decisiones que conserva el dueño: ¿70 se presenta solo como referencia de práctica en unidad mientras no exista mínimo académico? ¿Se necesita una bandeja docente de dictámenes además del índice de temas autorizado? Se conserva el comportamiento académico actual mientras no se decida.

Todo queda sin commit, sin staging, sin push y sin despliegue, en el clon local que revisa GitHub Desktop.

## Comandos y salida real de la verificación final

| Comando | Resultado |
|---|---|
| `npm run gen:plan` | Exit0;7 módulos,56 unidades,287 temas;268 lecciones con material estudiable;14/14 nodos de evaluación configurados |
| `npm run gen:nav` | Exit0; índice de7 módulos y287 temas |
| `npm test` | Exit0; tests1233, pass1233, fail0, cancelled0, skipped0, todo0; duration_ms332235.3777 |
| `npm run build` | Exit0; built in6.32s; advertencia de chunks>500kB; mayor mostrado720,23kB |
| `npm run inventario` | Exit0; pendientes por módulo1,4,2,3,4,2,4; no cambió el inventario editorial |
| `npm run build:rediseno` | Exit0; compilación final en2.00s; JS principal del laboratorio4348,23kB antes de gzip955,93kB, por incluir contenido local para revisión; no se añade al arranque de la aplicación |
| `npm run test:rules` | Exit1: `firebase` no se reconoce como comando. No arrancaron los emuladores ni la suite de reglas |
| `node --test tests/limpieza.test.mjs tests/paridadSuperAdmin.test.mjs tests/redisenoUx.test.mjs` |17 pruebas aprobadas,0 fallidas después de corregir la integración |
| Comprobación de fixture de volumen con Node |14 secciones y6 tablas |
| Comprobación de enlaces Markdown con Node |4 documentos con enlaces locales válidos |
| `git diff --check` | Exit0; avisos LF/CRLF, sin errores de whitespace en archivos seguidos |
| `git status --short` y `git diff --stat` | Cambios sin staging. Diff de archivos seguidos:21 archivos,140 inserciones,45 eliminaciones; incluye el documento de Fase0 previo y no cuenta archivos nuevos sin seguimiento |

Durante la implementación se vieron fallos y se corrigieron antes de la ejecución final: un fixture de validación incompleto en la prueba nueva, y dos controles de integración que no reconocían la entrada HTML ni la equivalencia de la ruta docente. No se suprimió ni se marcó skip ninguna prueba. La prueba de código muerto ahora lee scripts module de las entradas HTML y exige que existan; la paridad comprueba la ruta administrativa real.

Los builds y el servidor local se ejecutaron con el permiso ampliado necesario para que esbuild pudiera leer su configuración. No se alteró el sandbox ni se instalaron dependencias. El servidor de revisión permanece en `127.0.0.1:4175`; al detenerlo, se puede reabrir con el comando documentado.
