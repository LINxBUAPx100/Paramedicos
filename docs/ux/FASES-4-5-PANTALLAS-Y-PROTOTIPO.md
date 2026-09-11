# Fases 4 y 5 — Pantallas aplicadas y revisión navegable

## Supuestos y alcance

El dueño pidió terminar las fases hasta que el rediseño se viera aplicado. Se toman las pantallas críticas del encargo como selección autorizada: tema, módulo/temario, examen, seguimiento, calificaciones, revisión docente, incorporación y editor. Las seis carreras conservan su disponibilidad real y reciben la adaptación de componentes; no se inventan nuevos temarios.

Hay dos entregables distintos: cambios aplicados a las rutas de la aplicación, y un laboratorio independiente con datos sintéticos y contenido local para revisar la experiencia sin iniciar sesión. El laboratorio no escribe en Firebase ni implica que las simulaciones de formularios ya estén conectadas a producción.

## Abrir y recorrer

Desde la raíz del repositorio:

```powershell
npm run dev:rediseno
```

Abrir `http://127.0.0.1:4175/rediseno.html`. El servidor solo escucha en localhost. Navegación visible: Mi temario, Lección, Práctica, Seguimiento, Calificaciones, Revisión docente, Incorporación, Editor y Componentes. Cambiar modo claro/oscuro no modifica preferencias de la cuenta. Cada vista tiene fragmento navegable y se puede usar Atrás.

`npm run build:rediseno` compila esta entrada con `vite.prototipo.config.js`, sin exigir las variables de Firebase. Genera salida de compilación en `dist/rediseno`, no es el código fuente ni se entrega como sustituto de éste. El build principal puede limpiar dist; si se quiere revisar la compilación del laboratorio, ejecutarla después del build principal.

La aplicación habitual se abre con `npm run dev`; carga el diseño desde `src/main.jsx` y sigue requiriendo la sesión/pertenencia normal para contenido privado. No se añadió un modo que eluda autorización en las rutas reales.

## Pantallas y especificación aplicada

| Pantalla | Ruta real y cambio aplicado | Escritorio | Pantalla chica y estados |
|---|---|---|---|
| Tema | `/tema/:id`: índice de secciones, accesos a quiz/flashcards, contención de lectura, encabezado y aviso | Columna de prosa72ch; título grande; índice desplegable de dos columnas | Índice una columna; prosa16px; aviso completo; sección enfocable. Vacío/bloqueado conservan lógica existente |
| Módulo | `/modulo/:id`: encabezado y filas con jerarquía consistente | Número, título, estado editorial y metadatos comparables | Texto adaptable; filas sin traslación al hover. La navegación curricular sigue igual |
| Examen/quiz | Rutas existentes: nuevo contenedor, selección accesible y banco vacío | Pregunta con mayor jerarquía, opciones separadas, acción al final | Opciones min56px; Comenzar desactivado cuando no hay banco; explicación anunciada |
| Seguimiento | `/panel`: nueva tabla con categorías, búsqueda, orden, paginación y detalle | Consulta 200 alumnos sin renderizar 200 filas simultáneamente | Tabla con scroll interno; detalle dentro de página; regreso con foco al botón que lo abrió |
| Calificaciones | `/panel/calificaciones`: selector de grupo, campos y estados de guardado | Nota visible con Guardando/Guardado/No guardado, reintento local | Números16px; colores semánticos; se mantiene estructura tabular para comparar |
| Revisión | `/panel/revision`: ruta y enlace reales dentro de PanelShell | Búsqueda de temas y filtro editorial; acceso a tema para firma real autorizada | Campos adaptables y tabla con scroll; pase ausente/caducado explicado; no se accede a cola global |
| Incorporación/grupos | `/panel/grupos`: invitación contextual al grupo; `/panel/recepcion`: controles y copia confirmada | Grupo visible, invitación expandible y visibilidad en la misma página | Campos min44px; confirma módulo y conserva excepciones; validadores históricos de recepción se mantienen |
| Editor | `/editor*`: adaptación de cabecera/panel/campos | Árbol y panel originales con controles de lectura consistente | Conserva comportamiento adaptable existente; demo separada solo edita notas locales |
| Vitrinas | Slugs reales de carreras | Encabezados y bloques adaptados sin cambiar oferta | Jerarquía y controles compartidos; no se ofrecen carreras nuevas como temario disponible |

## Estados imperfectos disponibles

El selector de escenarios del laboratorio permite Normal, Vacío, Error, Cargando, Sin permiso y Contenido bloqueado. Error ofrece Reintentar real dentro del laboratorio; carga es deliberadamente controlada, no un spinner que espere una conexión inexistente. Vacío se demuestra en temario, lección, quiz y seguimiento. Los formularios de ejemplo muestran errores nativos al intentar enviar sin campos requeridos.

| Caso del encargo | Fixture y evidencia |
|---|---|
| Grupo de 200 alumnos | Datos sintéticos identificados como tales, correos `example.invalid`; 20 filas por página; sin evidencia y riesgo separados |
| Tema largo:14 secciones y6 tablas | Fixture de volumen con9 secciones originales de `m4-far-nom-034` y5 secciones sin tabla de `m2-afi-cardiovascular`; cada sección indica origen. No se presenta como lección curricular nueva |
| Nombre largo de módulo | La muestra utiliza los nombres reales de `modulos`, incluido Manejo de urgencias médico quirúrgicas; no se abrevia el título académico |
| Estado bloqueado | `AvisoEditorial` real con `bloqueado_por_decision` en un escenario aislado; no se modifica ningún estado persistido |
| Obligatorio vacío | Intentar enviar el alta de prueba enfoca el primer campo inválido; nombre, correo y teléfono requeridos |
| Error de carga | Panel explicativo con Reintentar; vuelve al escenario normal |
| Sin permiso | Motivo y vuelta al contenido; no monta datos del escenario de estudio |

`Contenido` y `Quiz` son los componentes reales reutilizados. El render de laboratorio pasa `enlazarGlosario={false}` para evitar montar el resolutor autenticado; en la aplicación el valor por defecto sigue siendo true. Las preguntas son originales del tema, identificadas como demostración de interacción, sin aval ni resultado guardado. El laboratorio no es un examen oficial ni una cuenta de alumno.

## Cambios funcionales asociados a la auditoría

- B01: los hooks de módulo/general contrastan preguntas con fichas ya resueltas con las validaciones de la academia. Solo pasan fichas validado/publicado; las páginas siguen filtrando visibilidad. Se añade lectura de fichas por módulo, no una lectura por cada tema.
- B02: Quiz no accede a la primera pregunta si el banco está vacío; módulo/general explican disponibilidad y desactivan inicio.
- A03: CeldaNota espera el resultado de guardado; muestra error y reintento local en vez de aparentar éxito.
- A05/M11/M12: seguimiento diferencia categorías y permite investigar el alumno sin ir a Miembros.
- A06: selección y explicación del quiz tienen semántica y foco; la migración de todos los diálogos antiguos sigue pendiente.
- A07: calificaciones usa éxito/peligro semánticos en lugar de verde/rojo decorativos; el botón primario tiene relleno sólido.
- A08: ruta docente nueva sin permisos de superadmin.
- A09: al mostrar módulo se conservan excepciones y se confirma alcance; Mostrar todo del grupo sigue siendo la operación explícita global.
- M13/M14/M15: buscador identificado, copia esperada y orientación dentro de lección.

## QA observada

Revisión realizada en el navegador integrado local; no hubo sesión autenticada ni escrituras en servicios externos.

| Comprobación | Resultado observado |
|---|---|
| Temario a escritorio | Se muestran siete módulos y navegación del laboratorio |
| Seguimiento 200 | Muestra200 alumnos y diez páginas iniciales; filtrar riesgo ofrece la lista correspondiente |
| Detalle | Abrir Daniel · Alumno de prueba002 muestra45% en el módulo con intento y «Sin evidencia» en los demás dentro de la misma página |
| Móvil360px | Lección inspeccionada en oscuro; ancho de documento igual al ancho disponible (345px con scrollbar), sin desbordamiento de página |
| Móvil414px | Ancho disponible399px y scrollWidth399px; consola de la vista local sin errores registrados |
| Quiz | Seleccionar opción produce `aria-pressed=true`; Confirmar muestra explicación en `role=status` |
| Quiz vacío | Muestra «No hay preguntas disponibles», sin excepción |
| Recuperación | Escenario Error muestra explicación; Reintentar restaura la vista normal |
| Obligatorios | Enviar alta vacía deja tres inputs inválidos y foco en un requerido; no aparece confirmación de alta |
| Lectura extensa a1366×768 | DOM con14 secciones y6 tablas; ancho de documento1351px y scrollWidth1351px |

No se declara certificación WCAG2.2AA ni compatibilidad exhaustiva con Safari/Firefox/Edge/Chrome. Falta revisión con lectores de pantalla reales, todas las marcas personalizadas, todas las rutas autenticadas y usuarios docentes/alumnos. Esas comprobaciones se programan en Fase6; los resultados sintéticos no se convierten en investigación con usuarios.
