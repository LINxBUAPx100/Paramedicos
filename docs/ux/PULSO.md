# PTEM Pulso — integración en la aplicación

Propuesta aprobada por el dueño el 27-09-2026. Identidad propia que cruza la emoción de Netflix (reanudar, siguiente tema), la utilidad de Amazon (buscar con departamentos, mochila) y el dominio de Khan Academy (niveles por tema, ruta del módulo), contada con tres objetos del oficio:

| Metáfora | Tarea única | Pieza |
|---|---|---|
| Trazo del monitor | Cuánto llevas de una lección | `components/ui/TrazoMonitor.jsx` |
| Etiqueta de triage | Qué conviene estudiar hoy | `components/pulso/TableroTurno.jsx` |
| Ruta de traslado | Dónde vas en el módulo | `components/pulso/RutaModulo.jsx` |

Colores por intención, todos de `styles/marca.css`: azul (`--primario`) estudia, ámbar (`--alerta`) agrega, rojo (`--urgencia`) compromete. Estilos en `src/styles/pulso.css`, con prefijo `pl-`.

## Entregas 1 a 6 — estado

| Entrega | Qué quedó en la aplicación |
|---|---|
| 1 · Identidad | Franja azul y ámbar; botones `btn--reanudar` (latido lento de 2,2 s), `btn--turno`, `btn--atajo`; trazo con punto que recorre la línea según el avance continuo y cambia de color (rojo → ámbar → azul → verde). |
| 2 · Tablero y ruta | Tablero de turno en la sección configurable `progreso`: Reanudar, triage (repasar hoy, pendientes del módulo, listos), turno de hoy y Mi mochila. Tarjetas del recorrido con foto del módulo, «donde ibas», barra de avance; la flecha reanuda y la tarjeta abre el módulo. Ruta del módulo con una parada por tema rellenada por dominio. |
| 3 · Lección | Monitor fijo con latidos, atajo a «Lo que más se pregunta», dominio, tamaño de letra, modo una mano y mochila. Siglas como fichas. Avisos por color. «Errores frecuentes» como tarjetas. «Repaso rápido» como autoevaluación. Modo oral de una pregunta a la vez con autoevaluación. Práctica (quiz) dentro de la lección. «Terminar lección» abre el cierre con nivel alcanzado y siguiente parada con cuenta atrás de 8 s que se detiene con cualquier interacción. Fuentes con deuda marcadas. |
| 4 · Repaso | «Repaso de hoy» con repetición espaciada (SM-2 simplificado) en `/flashcards`; el repaso libre de siempre sigue en la otra pestaña. Las tarjetas vencidas alimentan el triage rojo y el turno. Niveles de dominio: Expuesto, Reconoce, Aplica, Domina. |
| 5 · Buscar y teléfono | Barra con departamentos (todo, temas, conceptos, fármacos), coincidencias resaltadas, búsquedas recientes del dispositivo. Pestañas inferiores en teléfono (Inicio, Ruta, Repaso, Buscar, Yo). |
| 6 · Oficio | Modo una mano. Descargar módulo para estudiar sin red. Modo llamada (`/casos`): motor, formato, validador y reproductor; **sin casos**, porque son contenido clínico de la academia. |

## Otras pantallas (27-09-2026, segunda tanda)

| Pantalla | Qué cambió |
|---|---|
| Examen (módulo, general y unidad) | `components/pulso/ExamenPulso.jsx` sustituye al quiz de práctica: sin corrección inmediata, se puede cambiar de respuesta, mapa de preguntas, «revisar después», teclas 1-4 / flechas / M, reloj, modo sin distracciones (oculta menú, pestañas y pie), aviso al salir a medias, confirmación en pantalla al entregar con cuántas faltan, y resultado con «qué repasar primero» por tema y revisión de cada respuesta. Mismas props y misma semilla: el guardado del intento no cambia. |
| Mi progreso | Banda «signos vitales»: racha con calendario de 12 semanas, mapa de dominio de todos los módulos (un cuadro por tema) y «te conviene repasar». Reiniciar se confirma dentro de la pantalla. Lo de antes sigue debajo. |
| Panel del profesor | Triage del grupo (en riesgo, sin evidencia, van bien) como filtros de la tabla; «atender primero» con los cinco alumnos que más lo necesitan; semáforo por módulo (aprueban / por debajo / sin intento). «Sin intento» nunca se cuenta como reprobación. |
| Mi cuenta | Credencial con iniciales, rol legible, academia, grupo, matrícula y cuatro signos (racha, leídos, en «Reconoce» o más, tarjetas por repasar). Preferencias de estudio juntas: tema, tamaño de letra, modo una mano y estado del estudio sin conexión. Datos de acceso plegables. Unirse con código, tutoriales, diagnóstico y cerrar sesión se conservan. |

| Ficha de fármaco | Página de producto: cabecera con grupo, origen (NOM-034 o ampliado), uso y cuatro datos (presentación, unidades, lecciones, dosis verificadas); recuadro de acciones (ir a la lección, practicar casos, tarjetas) con la precaución clave; anclas fijas a cada sección; «del mismo grupo» al final. Todo el contenido clínico y los avisos son los mismos de antes (prueba en `tests/pulsoPantallas.test.mjs`). |
| Actividad «Ordena» | Arrastre con ratón (todo el paso) o dedo (desde el asa ⋮⋮), orden en vivo al cruzar la mitad del vecino y animación FLIP de cada cambio de lugar. Las flechas se conservan y cada movimiento se anuncia. |

## Entrenador de farmacología (entregas 1 a 3)

Prototipo: claude.ai/artifact/V1LjAwUwq69CZzQHbCzhHj. Lógica en `src/lib/rutaFarmacos.js`; pruebas en `tests/rutaFarmacos.test.mjs`.

1. **Ruta.** `/farmacos` abre en «Tu ruta» (`components/farmacos/RutaFarmacologia.jsx`): cuatro etapas con avance real (Conocer = fármacos con tarjetas bien calificadas; Clasificar = aciertos del relámpago; Calcular = habilidades dominadas; Aplicar = casos dominados), botón «Continuar», mapa de dominio de los 46 fármacos por sección, ficha rápida, triage y errores. Los ocho modos siguen, agrupados por etapa. Nivel por fármaco: Conoce → Clasifica → Aplica; las habilidades de cálculo son generales y cuentan en la etapa, no por fármaco.
2. **Pulso.** Las tarjetas del entrenador usan el repaso espaciado (`components/pulso/SesionEspaciada.jsx`, compartido con flashcards), entran al «Repaso de hoy» global y cuentan en el triage del inicio, solo con el entrenador en el plan. En las lecciones, los fármacos que el catálogo liga a cada tema se marcan en el texto (su `patron`) y abren un globo con la ficha corta; el catálogo se carga bajo demanda.
3. **Errores.** Casos y «Aprende a calcular» guardan el tipo de error que ya reconocía `diagnosticar()`; la ruta muestra el más frecuente y abre la habilidad que lo entrena (`?habilidad=`). Se guardan en el navegador, como el dominio del entrenador.

4. **Práctica.** Las opciones falsas de las preguntas salen primero de la misma sección del catálogo (`preguntasDe`). Comparador de dos fichas (`?modo=comparar&a=&b=`), enlazado desde cada ficha. Relámpago con tres variantes (apéndice, unidad mínima que lo lleva, grupo) y mejor marca por variante; apéndice y unidad cuentan para «Clasifica», grupo no. Teclado numérico propio en pantallas táctiles; la unidad del paso sigue fija porque la respuesta se califica en ella.

**Pendiente:** la vista del profesor con los errores del grupo necesita sincronizar estos datos (misma decisión de reglas que el resto de Pulso).

## Optimización (27-09-2026)

- El dominio de estudio agrupa las tarjetas del repaso por tema una sola vez (`srsPorTema`, WeakMap). Antes el mapa recorría todas las tarjetas por cada tema en cada render.
- El progreso local se guarda agrupado (como mucho cada 300 ms) y se fuerza al ocultar o cerrar la pestaña.
- El almacén de descargas ya no viaja en el paquete principal; cerrar sesión lo borra de forma explícita.
- El trazo del monitor se memoiza; solo el punto se recalcula cuadro a cuadro.
- Fotos de las tarjetas: la del frente se pide al momento, las de atrás en diferido, con tamaño declarado; si una no llega, se oculta.
- Medido: la caché persistente de Firestore no añade peso (el código ya viene en el SDK). Paquete principal: 504 kB.

## Decisiones y por qué

- **Nada nuevo se sincroniza todavía.** La regla de `progreso/{uid}` usa `hasOnly`; mandar un campo nuevo sin desplegarla rechaza el documento ENTERO y el progreso deja de sincronizarse en silencio. Lecturas, dominio de actividades, repaso espaciado, repaso rápido, oral, mochila y preferencias viven en el dispositivo y se vacían si entra otra cuenta. Una prueba (`tests/pulsoFases.test.mjs`) vigila que no se cuelen en la escritura.
- **Caché sin conexión opcional.** Estudiar sin red necesita perfil, academia e índice, no solo las lecciones. La caché persistente de Firestore se enciende SOLO al descargar un módulo (marca `ptem:sin-conexion`) y se borra al cerrar sesión (`salir` en `lib/firebase/auth.js`). El service worker (`public/sw.js`) solo se registra tras una descarga, va a la red primero en la navegación y no toca Firebase.
- **El monitor no marca «leído».** Pasar por pantalla no demuestra lectura. «Terminar lección» es la marca de siempre.
- **La racha cuenta seis acciones de estudio**: leer, quiz, examen, actividades, tarjeta del repaso espaciado y modo oral. Mochila, repaso rápido, letra y posición de lectura no cuentan (`tests/logrosModelo.test.mjs`).
- **El 70 % es la referencia de práctica del Quiz**, no la calificación mínima de la academia; el tablero y la práctica lo dicen.
- **El modo oral no inventa respuestas.** «Mostrar respuesta» solo aparece si el tema trae `{ pregunta, respuesta }`. Hoy el temario trae solo preguntas.
- **Casos clínicos: cero.** `src/data/casos/index.js` está vacío a propósito; solo llegan al alumno casos `validado` o `publicado`, bien formados y de temas visibles.
- Los nodos de evaluación se reconocen por id (`-examen-`, `-parcial-`, `-practica-`, `-pra-`); una prueba lo compara con la semilla oficial.

## Pendiente que depende del dueño o de la academia

1. **Sincronizar entre dispositivos.** Añadir a `progreso/{uid}` una clave `pulso` con topes, probar con `npm run test:rules`, DESPLEGAR la regla y solo entonces mandar el campo.
2. **Respuestas del modo oral** (≈ 2 139 preguntas): campo nuevo en modelo, editor, Firestore y pruebas, y respuestas extraídas de cada lección. Es trabajo editorial que reabre la pasada de calidad.
3. **Pausas intercaladas**: decidir a qué sección va cada actividad de completar.
4. **Casos del modo llamada**: redacción y validación docente; editor de casos.
5. **Ficha de fármaco** tipo producto (presentaciones, NOM-034, lecciones donde aparece), sin fijar dosis.

## Verificación local

Emulador con `scripts/seed-usuarios-prueba.mjs` y la configuración `dev-emu` de `.claude/launch.json` (puerto 5174, sin tocar `.env`). Para ver una lección completa, se cargó en el emulador la lección real de AVDI sobre `tema-uno` de la academia PRUEBA (solo emulador).
