# Experiencia de estudio aplicada — 17 de septiembre de 2026

Cambios en la aplicación React que sirve `npm run dev`, sobre las rutas existentes y su navegación. No requiere usar el prototipo `rediseno.html`.

## Comportamiento implementado

- `/buscar`: consulta, módulo y página en la URL; resultados de 20 en 20; filtros y contadores limitados al contenido visible; estado editorial visible en cada resultado; orientación antes de escribir y mensaje cuando no hay coincidencias.
- `/progreso`: indicadores de lectura y quizzes del temario visible; ausencia de quizzes representada con un guion, distinta de una nota de cero; filtro por texto y lectura; detalle paginado. Un fallo del historial de exámenes muestra error y permite reintentar, sin presentarlo como ausencia de exámenes. Para personal docente, el avance propio se abre con `?vista=mio`.
- `/flashcards` y `/flashcards/:temaId`: selector por tema en el repaso global, enlace a la lección, tarjeta con altura flexible y botón nativo operable con Enter o espacio, controles con límites y reinicio explícito. Cambiar el conjunto de tarjetas reinicia la sesión. Reintentar usa la fuente correspondiente al tema o al conjunto global. Un tema inexistente muestra la pantalla de no encontrado.
- Se reutilizan los estilos y componentes de la aplicación. No se agregaron dependencias ni se modificaron contenido académico, permisos o reglas de Firebase.

## Verificación y límites

- Pruebas dirigidas: `node --test tests/listasEstudio.test.mjs tests/redisenoUx.test.mjs tests/limpieza.test.mjs`: 17 aprobadas, 0 fallidas.
- `npm run gen:plan` y `npm run gen:nav`: salida 0; 7 módulos y 287 temas.
- La primera ejecución de `npm test` detectó que la guarda de carga de Flashcards no seguía la forma comprobada por la prueba existente. Se hizo explícita la variable `cargando`, sin modificar esa prueba. La segunda ejecución completa terminó con 1242 aprobadas, 0 fallidas y 0 omitidas (151024.9291 ms).
- Comprobación adicional de la guarda y del modelo: `node --test tests/pantallasBajoDemanda.test.mjs tests/listasEstudio.test.mjs`: 8 aprobadas, 0 fallidas.
- `npm run build`: salida 0, compilación en 3.27 s; advertencia de paquetes mayores de 500 kB.
- `npm run inventario`: salida 0; conserva los pendientes académicos existentes. `git diff --check`: salida 0.
- Se reinició Vite en `http://127.0.0.1:5173/` porque el servidor anterior no estaba escuchando. Tras recargar `/buscar`, la aplicación mostró correctamente «No has iniciado sesión».
- La revisión visual e interactiva de estas pantallas privadas queda pendiente: el navegador disponible no tiene sesión autenticada. Las pruebas automatizadas no sustituyen esa revisión.
- `test:rules` no ejecutado: Firebase CLI no está disponible ni en PATH ni en `node_modules/.bin`. No se tocaron las reglas.
- Trabajo local sin commit ni publicación.

## Continuación: autoevaluación, sin cambios en Home

- En el resultado de los quizzes se puede alternar «Solo errores», ver la respuesta elegida y consultar la explicación. Si no hay errores, el filtro lo indica. El foco pasa al encabezado del resultado al terminar y la barra comunica cuántas preguntas se han confirmado.
- Cambiar de tema reinicia el componente de quiz, evitando conservar la baraja de otra lección. Se mantiene el cálculo de puntuaciones y el registro existente.
- En `/examen`, las cantidades rápidas no exceden el banco disponible. La selección se comunica con `aria-pressed` y el botón de inicio muestra el tamaño efectivo.
- Si falla la lectura del historial, aparece «Historial no disponible» y una acción para reintentar. Ese fallo no se presenta como «Aún no lo presentas».
- Home y su carrusel no se modifican en esta continuación. Los estilos añadidos están acotados al resultado del quiz y a la pantalla de exámenes.
- Verificación de esta continuación: 33 pruebas dirigidas aprobadas; `npm test`: 1242 aprobadas, 0 fallidas, 0 omitidas (147561.3486 ms). `gen:plan`, `gen:nav`, `build` e `inventario`: salida 0; compilación en 3.13 s. La comprobación visual privada sigue pendiente por falta de sesión en el navegador disponible. No se ejecutó `test:rules` por falta de Firebase CLI.
