# Fase 6 — Migración incremental y criterios de aceptación

## Supuestos y estado

La primera aplicación del rediseño está en el árbol de trabajo y se puede revisar sin commit. El dueño autorizó continuar fases, no publicar ni escribir datos de academia. Este documento distingue lo aplicado del trabajo restante: completar las fases de diseño y prototipo no significa migrar todas las pantallas históricas ni resolver toda la auditoría.

Se mantienen Vite/React/HashRouter, CSS puro, capacidades centralizadas, Firebase Spark, fuentes autoalojadas, marca y contenido académico. No se crea analítica de terceros, Cloud Functions ni backend. Ningún plan de esta página se ejecutó contra Firebase.

## Secuencia por entrega

Los sprints son unidades propuestas de revisión, no fechas ni estimaciones de productividad comprobadas.

| Entrega | Estado y alcance | Criterio de aceptación | Riesgo / dependencia |
|---|---|---|---|
| 1. Base y tareas de mayor uso | Aplicado localmente: tokens/componentes/adaptadores, lector, seguimiento, guardas de examen, revisión docente, nota y grupo | Build y suite; revisar rutas y laboratorio; no pérdida de contenido ni cambios editoriales | La capa histórica todavía puede sobrescribir adaptadores |
| 2. Guardado y recuperación completa | Pendiente: intento de módulo con reenvío idempotente, historial con error diferenciado, protección de salida y rastro de dictamen persistente | Desconectar/reconectar no duplica intentos, no pierde resultado; no repite una firma ya aplicada | Requiere revisar contrato de escritura y pruebas de reglas, no solo CSS |
| 3. Tablas y formularios comunes | Pendiente: migrar Avance/Miembros/Calificaciones/Replicación por familia | Consulta200 alumnos, teclado completo, error asociado a campo, contexto estable, selección masiva solo para acciones definidas | No mezclar permisos docentes con administración; confirmaciones por alcance |
| 4. Navegación y editor completos | Pendiente: contexto compartido en todas las vistas, enlaces directos/restauración, entrada directa al examen de unidad, todos los paneles del editor | Atrás restaura selección/foco; ningún borrador cambia de grupo; enlaces históricos siguen resolviendo | Evitar que URL de grupo se convierta en autorización |
| 5. Retirada de CSS y QA de producto | Pendiente: eliminar selectores migrados, separar base histórica, probar marcas y navegadores | Inventario de consumidores y viejo→nuevo; cero variables huérfanas; matriz AA de pantallas migradas | No cortar el CSS por tamaño alterando orden de media queries o modo oscuro |
| 6. Adopción en academia | Pendiente de revisión y autorización del dueño | Pruebas con alumnos/profesores, decisiones del mínimo de práctica y alcance de dictámenes resueltas; publicación explícita | Ningún cambio editorial avalado por un agente; reglas publicadas manualmente solo si en el futuro se modifican |

## Convivencia de componentes

La nueva capa se carga después de la base histórica y se utiliza tanto en la aplicación como en el laboratorio. Al migrar una familia:

1. Enumerar clases antiguas y todos sus consumidores reales.
2. Aplicar el componente/contrato nuevo en una ruta; conservar URL y permisos.
3. Probar normal/carga/error/vacío/sin permiso, teclado y claro/oscuro.
4. Retirar reglas viejas únicamente cuando ya no tengan consumidores; no borrar tokens aún usados por otras pantallas.
5. Actualizar catálogo y evidencia. La diferencia de líneas CSS debe medirse, no inferirse del número de archivos.

El mapeo concreto está en [Fase3](FASE-3-SISTEMA-DE-DISENO.md). En la continuación del 10 de septiembre se extrajeron los tokens originales a `styles/marca.css`, importado por `index.css`: 105 declaraciones conservaron selector, propiedad y valor. El resto de la base histórica permanece, y la retirada de selectores requiere todavía inventario por familia. Los archivos generados se regeneraron, no se editaron manualmente.

Avance adicional aplicado a las rutas principales: catálogos visibles de carreras y módulos; filtros y paginación del libro de calificaciones y de revisión docente; navegación persistente de estudio en escritorio; búsqueda y filtro de lectura del módulo guardados en URL; índice de lección accesible durante el desplazamiento. Esto completa partes de las entregas 3 y 4, no sus contratos completos de guardado y recuperación.

## Aceptación por tarea

| Trabajo | Criterio de producto | Cómo comprobarlo |
|---|---|---|
| Estudiar | Localizar una sección y retomar lectura conservando aviso y contenido | Tarea observada en360/414px y escritorio; comparar ubicación/foco antes y después; no confundir scroll con lectura |
| Practicar | Nunca montar banco vacío ni evaluar material no avalado en examen | Fixtures por todos los estados; validación efectiva de academia y temas ocultos; banco y UI consistentes |
| Seguimiento | Profesor identifica un alumno y explica su evidencia en<60s desde Panel, sin cambiar de página | Caso predeterminado con200 alumnos, grupo conocido; registrar exactitud y tiempo. Objetivo pendiente de medir |
| Calificar | El profesor distingue nota editada de nota guardada | Rechazar/promediar latencia de escritura en pruebas; comprobar texto de estado y reintento |
| Revisar | Encontrar tema y firmar solo con autorización vigente | Acceso directo por rol; pase caducado durante la sesión; fallo de rastro sin perder verdad de la firma |
| Incorporar | Director puede explicar a qué grupo entra la invitación y qué contenido queda visible | Caso con excepciones por tema; comprobar grupo antes de crear, confirmar módulo y copiar con éxito real |
| Vender a academia | Visitante distingue oferta de carrera de disponibilidad de temario | Sesión con posibles clientes; no inventar tasas de conversión ni temarios inexistentes |

## Medición sin analítica externa

Primero se propone una ficha local de observación: tarea, inicio, fin, éxito, errores y ayuda requerida. No exige instrumentar ni almacenar datos de alumnos. Tiempo, comprensión y primera elección deben medirse con personas, no con clics automatizados.

Los datos operativos ya existentes permiten consultar intentos por módulo, resultados y ausencia de evidencia en el conjunto autorizado. No permiten inferir por sí solos abandono, minutos de lectura ni comprensión. «Sin evidencia» debe conservarse separado de reprobación.

Si posteriormente se autoriza instrumentación en Firestore Spark: definir antes las reglas, retención y presupuesto de lecturas/escrituras; agregar por tarea completada, no por tecla o scroll; usar identificadores técnicos mínimos y no almacenar texto académico consultado, diagnósticos ni contenido de notas. No se crea aquí ninguna colección. La propuesta debe validarse con las reglas y cuotas vigentes antes de implementarla.

| Métrica propuesta | Fuente | Estado |
|---|---|---|
| Tiempo hasta explicar un caso de grupo y porcentaje de respuestas correctas | Sesión observada, cronómetro y rúbrica de tarea | Sin línea base ni resultado; meta<60s |
| Preguntas no avaladas que llegan a exámenes | Pruebas de contrato banco/fichas | Objetivo0, cubierto en pruebas locales del nuevo filtro |
| Intentos que el usuario cree guardados frente a confirmación real | Prueba de desconexión y entrevista corta | Pendiente para recuperación completa de intentos |
| Errores de campo reparados sin ayuda | Formulario con errores predeterminados | Demo validada técnicamente; pendiente sesión humana |
| Selectores/variantes migrados y consumidores restantes | Inventario AST/CSS y búsqueda en repo | Mapeo disponible; retirada del monolito pendiente |
| Criterios AA aprobados por pantalla/tema/navegador | Matriz manual y pruebas automáticas específicas | No hay certificación global |

## Decisiones abiertas

- No se cambió el 70 actual: falta decidir su presentación como referencia de práctica en unidad mientras la academia no fije mínimo.
- Revisión docente abre temas autorizados; una bandeja para gestionar dictámenes ajenos requiere definir alcance y probar reglas antes de ampliar acceso.
- La publicación queda en manos del dueño después de revisar los cambios sin commitear. No se hizo commit, push ni despliegue.

El parte final enumera archivos y resultados reales de verificación en [ENTREGA-REDISENO](ENTREGA-REDISENO.md).
