# Fase 1 — Auditoría UX de PTEM

## Supuestos, alcance y método

Se usa el árbol actual autorizado por el dueño, incluido Botiquín 3D. Paramédicos es el caso principal; se incluyen la vitrina de seis carreras y el acceso del profesor a revisión desde su panel. Se acepta separar «sin evidencia de evaluación» de «promedio menor de 70». Está pendiente decidir si el 70 mostrado por Quiz debe presentarse solo como referencia de práctica donde la academia no ha fijado mínimo.

Esta fase entrega una auditoría, sin implementar correcciones ni avanzar a arquitectura o diseño. La evidencia es lectura de rutas, componentes y lógica; análisis de CSS con PostCSS; render aislado de Quiz y sondas de funciones reales con datos sintéticos. No se abrió una sesión autenticada, no se escribió en Firebase y no hubo pruebas con usuarios. No se midieron tiempos, rendimiento de navegador ni tamaños computados de controles. Las hipótesis de comprensión y usabilidad se distinguen de los defectos reproducidos.

Las rutas siguientes son fragmentos de HashRouter: `/panel` significa `/#/panel`. Los archivos citados son relativos a la raíz del repositorio. El inventario completo sigue en [Fase 0](FASE-0-INVENTARIO.md); los valores y reproducciones están en [mediciones](FASE-1-MEDICIONES.md), generadas por [medir-fase-1.mjs](medir-fase-1.mjs).

### Convención para contar

C = activación de enlace o botón; S = cambio lógico de un select; T = campo de texto que se llena o modifica. Para comparar con ratón, se estima C + 2S + T: abrir y elegir una opción requiere dos clics y enfocar un texto uno. No es una medición de uso ni aplica literalmente a selectores móviles o teclado. No se cuentan lectura, desplazamiento, pulsaciones de escritura ni autenticación; el inicio y las precondiciones son explícitos. `n` es el número real de preguntas presentadas. Seleccionar una respuesta cuenta como C y como campo de respuesta, sin duplicarla en el total.

## 1. Flujos actuales, paso por paso

### 1. Alumno: estudiar y contestar el quiz

Precondición: alumno con acceso al módulo, situado en `/modulo/:id`; tema visible y con contenido y preguntas.

| Paso | Acción actual | Ruta y evidencia | Cuenta |
|---|---|---|---|
| 1 | Abrir el tema en el listado | `/modulo/:id` → `/tema/:id`; `src/pages/ModuloPage.jsx` | 1 C, 1 salto |
| 2 | Leer aviso editorial, introducción y lección; recorrer recursos y actividades | `src/pages/TemaPage.jsx`, `src/components/BloquesTema.jsx`, `src/components/AvisoEditorial.jsx` | 0 C obligatorios; desplazamiento no medido |
| 3 | Opcionalmente marcar el tema como leído | Acciones al final de `TemaPage.jsx` | +1 C opcional |
| 4 | Pulsar «Hacer el quiz de este tema» | `/tema/:id/quiz`; `src/pages/QuizPage.jsx` | 1 C, 1 salto |
| 5 | Elegir respuesta, confirmar y avanzar; en la última, ver resultados | `src/components/Quiz.jsx` | 3 C por pregunta |

Total: 5 etapas, `2 + 3n` activaciones, 2 saltos de ruta, `n` campos de respuesta y 0 textos. El tema real `m2-afi-cardiovascular` contiene cuatro preguntas y ocho secciones en la fuente local: son 14 activaciones, o 15 si se marca leído. No significa que leerlo sea rápido ni que cuatro preguntas sean suficientes académicamente.

El enlace inferior se condiciona a tener preguntas, pero el acceso directo a la ruta de quiz no protege el banco vacío. La lectura y la marca de leído son acciones distintas; no se debe presentar una visita como comprensión. La hipótesis de que las acciones inferiores y el aviso extenso dificultan retomar la lección requiere observación en teléfono.

### 2. Alumno: examen de unidad, módulo o general

| Variante | Secuencia actual y fuentes | Etapas | Activaciones | Campos | Saltos |
|---|---|---:|---|---|---:|
| Módulo | Desde módulo, «Presentar examen de módulo» → introducción → «Comenzar» → elegir/confirmar/avanzar cada pregunta → resultado. `src/pages/ExamenModuloPage.jsx`, `src/components/Quiz.jsx` | 4 | `2 + 3n`; +1 si cierra el diálogo para revisar | `n` respuestas, 0 textos | 1 |
| General | Desde navegación, «Examen» → introducción; opcionalmente elegir cantidad → «Comenzar» → responder → resultado. `src/components/Layout.jsx`, `src/pages/ExamenPage.jsx` | 4, o 5 cambiando cantidad | `2 + 3n`, +1 si cambia cantidad | `n` respuestas; 1 selector de cantidad mediante botones | 1 |
| Unidad | Desde módulo, abrir nodo de examen → «Practicar este examen» → introducción → «Comenzar» → responder → resultado. `TemaPage.jsx`, `src/pages/ExamenUnidadPage.jsx` | 5 | `3 + 3n` | `n` respuestas, 0 textos | 2 |

La cantidad elegida no garantiza que existan tantas preguntas. La unidad vacía tiene mensaje explicativo y vuelta; no debe contarse como un examen completado. La unidad funciona como autoevaluación y no conecta un guardado de intento en `onComplete` como el módulo. En módulo, el resultado aparece antes de terminar el guardado; el fallo se comunica, pero no hay una acción dedicada a reenviar ese resultado. «Otro intento» reinicia la práctica. La semilla conserva el orden de la variante, no las respuestas en curso.

**Contradicción comprobada con el encargo:** `src/lib/bancoExamen.js` filtra estados avalados para unidad; `src/lib/agregadosModelo.js` recoge preguntas sin ese filtro. `src/lib/contenidoApi.js` entrega esos agregados a módulo/general, y `src/lib/validacionesModelo.js` no reemplaza esos dos métodos al aplicar validaciones. Las páginas de módulo/general filtran visibilidad, que no equivale a aval editorial. Un mismo borrador sintético produce 0 preguntas de unidad y 1 en cada agregado de módulo/general. Esto corrige la generalización de Fase 0 de que todos los exámenes ya respetaban el aval. No demuestra qué intentos se han presentado en producción.

### 3. Profesor/director: estado del grupo y riesgo

Precondición: profesor con varios grupos, desde navegación principal; el grupo deseado no está seleccionado.

| Paso | Acción actual | Evidencia | Cuenta |
|---|---|---|---|
| 1 | Abrir «Panel» | `/panel`; `src/components/Layout.jsx` | 1 C, 1 salto |
| 2 | Elegir grupo en «Trabajando con» o filtro de director | `src/components/panel/PanelShell.jsx` | 1 S; 0 si ya corresponde |
| 3 | Leer indicadores y nombres en riesgo | `src/pages/panel/Resumen.jsx` | 0 C |
| 4 | Para investigar a un alumno, abrir «Miembros» | `/panel/miembros` | 1 C, 1 salto |
| 5 | Localizar la fila y abrir el nombre | `src/components/panel/AvanceAlumnos.jsx` | 1 C; búsqueda visual no medida |

Resumen: 3 etapas, C=1/S=1, equivalente convencional a 3 clics; 1 salto y 1 campo de grupo. Investigación: 5 etapas, C=3/S=1, equivalente a 5 clics; 2 saltos. Los nombres en riesgo del resumen son texto, no enlaces a detalle. Con un solo grupo se resta el cambio de select.

**Precisión de alcance:** `/panel/calificaciones` es el libro de evaluaciones docentes, no la tabla de intentos de módulo. Esta última está en Miembros. `src/pages/panel/Calificaciones.jsx` consume el contexto de grupo pero no ofrece allí el selector: cambiarlo puede exigir volver a Resumen/Miembros, elegirlo y regresar, añadiendo dos saltos y un cambio de select.

El modelo omite del cálculo de riesgo a quien no tenga resultados. La sonda de 200 alumnos sintéticos sin intentos devuelve total=200, activos=0, enRiesgo=0 y promedio=null. No demuestra abandono ni reprobación. Se incorpora la decisión del dueño de mostrar ambas categorías separadas. «Activos» cuenta evidencia de examen, no actividad reciente; no debe interpretarse como conexión durante la última semana.

### 4. Staff: Validar, Corregir, Reportar y cola

Precondición: tema visible; para firmar, pase vigente y estado que permita la acción. El permiso de revisión temporal no equivale a editar/publicar contenido.

| Paso | Acción actual | Evidencia | Cuenta |
|---|---|---|---|
| 1 | Abrir tema desde módulo | `/tema/:id`, `TemaPage.jsx` | 1 C, 1 salto |
| 2 | Expandir «Validar», «Corregir» o «Reportar» | `src/components/RevisionDocente.jsx` | 1 C |
| 3a | Validar: revisar firma prellenada, cuatro comprobaciones opcionales, fuentes y observaciones opcionales | Mismo componente | 7 controles; 1 obligatorio, normalmente prellenado |
| 3b | Corregir: firma y observación | Mismo componente | 2 obligatorios; normalmente 1 T porque la firma viene prellenada |
| 3c | Reportar: escribir el problema | Mismo componente | 1 texto obligatorio, 1 T |
| 4 | Enviar formulario | Mismo componente | 1 C |

Cada variante tiene 4 etapas y 3 activaciones desde módulo; validar añade una edición solo si falta la firma, y corregir/reportar añaden al menos 1 T. Desde el tema son 2 activaciones. Las opciones voluntarias suman sus propias interacciones. El código informa si falta pase y restringe estados; esos controles deben conservarse.

La cola está en `/admin/aca/:academiaId/c/:cursoId/revision`, dentro de consola de superadmin (`src/App.jsx`, `src/components/ColaDictamenes.jsx`). No existe una entrada equivalente en Panel para el profesor. No se debe prometer que puede abrir esa ruta con su rol. Desde la cola ya abierta, consultar un tema añade 1 enlace; marcar aplicado requiere 1 botón; descartar requiere nota y botón. El recorrido previo de administración depende de la academia/curso seleccionado y no está incluido en esos conteos.

Validar escribe primero la validación y luego su rastro de dictamen. Si falla el segundo, hay aviso, pero el cierre programado del formulario tras 1,4 segundos puede hacerlo desaparecer. Reportar escribe un reporte, no debe equipararse automáticamente a una entrada en esa cola. No se enviaron firmas ni reportes durante la auditoría.

### 5. Director: invitación y visibilidad

Precondición: director en Panel; grupo ya creado; se quiere una invitación de alumno. Crear un código no equivale a que el destinatario ya haya canjeado el acceso.

| Paso | Acción actual | Ruta/archivo | Cuenta |
|---|---|---|---|
| 1 | Abrir «Invitaciones» | `/panel/invitaciones`; `src/components/panel/InvitacionesRol.jsx` | 1 C, 1 salto |
| 2 | Elegir grupo; revisar rol, vigencia, usos y nota | Mismo componente | 5 controles; 1 S en esta variante, otros conservan valores iniciales |
| 3 | Crear invitación | Mismo componente | 1 C |
| 4 | Abrir «Compartir» y «Copiar enlace» en escritorio | `src/components/CompartirCodigo.jsx` | 2 C; compartir nativo puede variar |
| 5 | Abrir «Grupos» | `/panel/grupos` | 1 C, 1 salto |
| 6 | Elegir grupo en visibilidad | `src/components/panel/VisibilidadGrupos.jsx` | 1 S si no es el seleccionado |
| 7a | Mostrar/ocultar módulo completo | Mismo componente | 1 C, guardado automático |
| 7b | Alternativa: desplegar módulo y mostrar/ocultar tema | Mismo componente | 2 C, guardado automático |

Invitación lista para compartir: 4 etapas, C=4/S=1, equivalente a 6 clics, 1 salto, 5 controles y ningún texto obligatorio en la variante contada. Incluyendo visibilidad de módulo: 7 etapas, C=6/S=2, equivalente a 10 clics y 2 saltos. Para un tema en módulo cerrado: C=7/S=2, equivalente a 11 clics. Se resta S cuando el grupo ya coincide. Envío por un servicio externo y canje por el alumno están fuera del conteo.

«Aplicar a G grupos» agrega botón y confirmación nativa. Mostrar un módulo previamente oculto elimina sus excepciones individuales en `VisibilidadGrupos.jsx`; no es simplemente restaurar la configuración anterior. Es una decisión con consecuencias para lo que queda liberado.

Alternativa de recepción (`/panel/recepcion`, `src/components/panel/AltaDeRecepcion.jsx`): cinco controles de datos, casilla de pago y cinco campos de pago cuando está activada: 11 controles visibles. Cuatro campos base son obligatorios; con pago, tres adicionales, algunos prellenados. Sin pago quedan 6 controles: llenar nombre/correo/teléfono, elegir grupo, desactivar pago, enviar y copiar bienvenida; desde navegación C=4/S=1/T=3, equivalente a 9 clics y 1 salto. La ficha no prueba por sí sola que exista una cuenta autenticada. Los errores se muestran agrupados al final, no junto a cada campo; esta precisión sustituye la descripción demasiado amplia de Fase 0.

## 2. Hallazgos por severidad

Bloqueante = impide completar una variante válida o incumple el contrato explícito de material evaluable. Alto = riesgo de pérdida, interpretación incorrecta o barrera relevante. Medio = fricción o recuperación incompleta. Cosmético = consistencia de presentación sin bloqueo demostrado. La severidad no implica frecuencia medida.

Se usan las [heurísticas de Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/): H1 estado, H2 vocabulario, H3 control, H4 consistencia, H5 prevención, H6 reconocimiento, H7 eficiencia, H8 jerarquía, H9 recuperación y H10 ayuda. Para formularios: identificación, errores asociados, conservación y confirmación de guardado. Para tablas: contexto, localización, comparación y acciones seguras; no se exige selección masiva donde no existe una tarea que la justifique.

| ID / severidad | Problema y evidencia concreta | Principio / consecuencia | Cómo comprobar o validar en menos de una semana |
|---|---|---|---|
| B01 Bloqueante | Agregados de módulo/general incluyen preguntas sin filtro editorial. `agregadosModelo.js`, `contenidoApi.js`, `validacionesModelo.js`, `ExamenModuloPage.jsx`, `ExamenPage.jsx`. Sonda: borrador 0/1/1 según camino. | H4/H5; contradice «solo firmado aporta reactivos». | Reproducción ya disponible; al corregir, probar cada estado y validaciones de academia sin modificar contenido. |
| B02 Bloqueante | `Quiz.jsx` lee `actual.pregunta` con banco vacío; SSR real lanza TypeError. `QuizPage.jsx` y `ExamenModuloPage.jsx` no ofrecen la guarda equivalente a unidad. | H5/H9; acceso directo o módulo sin banco puede romper la práctica. | Abrir esas variantes con fixture vacío en entorno sin Firebase y comprobar recuperación navegable. |
| A03 Alto | `Calificaciones.jsx`, `CeldaNota`: guarda al salir; el texto local permanece si `guardarNota` falla y el error queda global. | H1/H9, formularios; una nota puede parecer guardada sin estarlo. | Simular rechazo y latencia, editar otra celda y verificar pendiente, error y valor confirmado. |
| A04 Alto | `ExamenModuloPage.jsx`: resultado antes de finalizar escritura; fallo sin reenviar resultado; repetir reinicia. | H1/H3/H9; recuperación insuficiente del intento. | Simular desconexión al terminar y recuperación sin responder otra vez. |
| A05 Alto | `Resumen.jsx` y su modelo de resumen omiten alumnos sin intentos del riesgo; sonda 200 sin intentos → riesgo 0. | H1/H2; ausencia de evidencia confundible con ausencia de necesidad de seguimiento. | Decisión aceptada: dos categorías. Validar con profesores qué acción corresponde a cada una. |
| A06 Alto | `ExamenModuloPage.jsx`, diálogo de resultado: declara `aria-modal` pero no gestiona foco, recorrido ni Escape. `Quiz.jsx`: opciones por clase, sin estado seleccionado accesible. | H1/H3 y operación por teclado; semántica incompleta. | Recorrer con teclado y lector de pantalla en fixture; comprobar anuncio de respuesta y devolución del foco. |
| A07 Alto | `index.css:7905`, `.cal-input.ok/.mal`: verde/rojo sobre blanco, 16px; ratios 2,54 y 3,76. | Contraste de texto insuficiente en esos pares del tema claro. | Verificar estilos computados y todos los estados de celda; repetir con oscuro y marca de academia. |
| A08 Alto | `PanelShell.jsx` no enlaza una cola docente; la cola citada está protegida para superadmin en `App.jsx`. | H6/H7; profesor puede firmar un tema, pero no dispone de esa bandeja de trabajo. | Recorrido por rol con fixture de varios grupos y pase vigente/caducado; acordar alcance sin ampliar permisos implícitamente. |
| A09 Alto | `VisibilidadGrupos.jsx`: mostrar módulo borra excepciones de temas de ese módulo. | H3/H5; una reversión aparente puede liberar más temas. | Ocultar tema, ocultar módulo, volver a mostrar módulo y comparar configuración antes/después en prueba pura. |
| A10 Alto | `Quiz.jsx`: respuestas y posición viven en estado local; la semilla del examen no conserva respuestas. | H3/H5; recarga o salida puede perder trabajo en curso. | En navegador aislado, responder, recargar y volver; observar si el usuario puede anticiparlo. |
| M11 Medio | Riesgo en `Resumen.jsx` sin enlace; detalle en `AvanceAlumnos.jsx`; selector de grupo ausente de `Calificaciones.jsx`. | H6/H7; saltos y búsqueda manual para actuar. | Tarea cronometrada de detectar y explicar un caso; meta propuesta <60 s, resultado aún desconocido. |
| M12 Medio | `AvanceAlumnos.jsx` renderiza filas sin búsqueda por nombre ni paginación; búsqueda de `GestionMiembros.jsx` es otro bloque y depende del rol. | Tablas/H7; localizar entre 200 alumnos es una hipótesis de fricción, no un benchmark de lentitud. | Fixture de 200 alumnos, nombres similares y pocos intentos; medir aciertos y búsqueda con profesor. |
| M13 Medio | `AltaDeRecepcion.jsx`: errores al final sin asociación por campo; `BuscarPage.jsx` usa placeholder sin label accesible en su buscador local. | Formularios/H9; identificación y reparación difíciles. | Enviar vacío y recorrer con lector de pantalla; verificar nombre, error y llegada al campo. |
| M14 Medio | `AltaDeRecepcion.jsx`, ficha: anuncia copia sin esperar `clipboard.writeText`; `CompartirCodigo.jsx` sí espera. | H1/H4; confirmación puede ser falsa si el portapapeles rechaza. | Rechazar clipboard en fixture y comprobar el mensaje mostrado. |
| M15 Medio | `TemaPage.jsx`: acciones tras lección/recursos/actividades; `AvisoEditorial.jsx` puede incluir observaciones extensas. | H8/H7; competencia visual y dificultad para retomar son hipótesis. | Leer y retomar tema largo en 360 y 414px con aviso; observar sin ocultar ni resumir texto académico. |
| M16 Medio | `RevisionDocente.jsx`: aviso de fallo del rastro seguido de cierre programado de 1,4 s. | H1/H9; recuperación difícil de advertir. | Fallar solo la segunda escritura en mock; comprobar qué queda visible y qué entiende el revisor. |
| M17 Medio | `ExamenPage.jsx`: fallo al cargar historial termina en array vacío. | H1/H9; «aún no lo presentas» puede representar una carga fallida. | Rechazar lectura con historial existente y distinguir error de vacío. |
| M18 Medio | `InvitacionesRol.jsx` permite seleccionar «sin grupo»; el acceso del alumno depende de pertenencia y plan en `RutaProtegida.jsx`. | H5/H10; riesgo de onboarding incompleto, condicionado al canje y contexto. | Ensayar invitación sin grupo con el modelo de alta; acordar si es caso admitido y cómo se completa. No se afirma bloqueo universal. |
| C19 Cosmético | `index.css`: formularios y tablas usan escalas/paddings/labels distintos; detalle cuantitativo abajo. | H4; identidad y reconocimiento fragmentados. | Comparación visual de los mismos estados y datos, sin asumir que toda diferencia es accidental. |

Los criterios de [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) aplicables incluyen contraste, nombre/rol/valor, teclado, foco y errores. Se mantiene el objetivo del encargo de texto ≥4,5:1 y controles ≥24px; no se han medido todos los targets. La [guía de diálogos modales de WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) orienta la prueba de foco y cierre. Existen reglas globales de foco y movimiento reducido: no se afirma que estén ausentes en todo PTEM. Esta auditoría no certifica conformidad AA.

## 3. Consistencia medida en index.css

| Familia | Declaraciones | Valores distintos | Sin var() |
|---|---:|---:|---:|
| Tamaño tipográfico | 666 | 46 | 36 |
| Familia tipográfica | 195 | 10 | 15 |
| Interlineado | 85 | 28 | 85 |
| Espaciado | 1643 | 200 | 284 |
| Radios | 410 | 34 | 172 |
| Sombras | 68 | 26 | 11 |
| Texto/fondo/borde | 2463 | 363 | 424 |
| Transición/animación | 117 | 83 | 26 |

Son declaraciones del archivo entero, incluidos overrides y media queries; valores distintos son cadenas, no estilos computados equivalentes. Los 363 valores incluyen bordes completos: no son 363 colores. Hay 78 literales hex distintos y 19 condiciones media distintas. Los 83 valores de movimiento no equivalen a 83 duraciones. `0`, `auto`, `none` y otros literales legítimos no constituyen deuda por carecer de token. El conteo completo de Fase 0 es 9.337 declaraciones, no las ~4.159 del encargo inicial.

| Comparación comprobable | Diferencia actual | Implicación a evaluar |
|---|---|---|
| `.pc-form` (línea 862) / `.admin-form` (1444) | Ambos gap 12 y campos 14px; contenedor 12/16 frente a 16/16 y superficies diferentes | Separar diferencia de contexto de variante accidental |
| `.cuenta-form` (2159) / `.rec-form` (10165) | Cuenta: gap12, etiquetas Oswald14, campo padding12. Recepción: gap20, campo min-height44 y padding8/12 | Hay al menos dos ritmos para entrada de datos de persona |
| `.panel-tabla` (596) / `.c-tabla` (3236) / `.rp-tabla` (7131) | Cuerpo14; cabecera12 en panel/replicación frente14 en contenido; celdas8/12 frente12 | Una tabla de lectura académica puede justificar otra densidad; las de trabajo necesitan coherencia funcional |
| `.cal-input` (7905) | Ancho56, número16, verde/rojo semánticos | Densidad útil, pero contraste y estado guardado requieren atención |
| `.aviso-editorial` (2989) / `.contenido` (2501 y overrides) | Aviso max800; contenido llega a1120; observaciones agregan longitud | Candidato de jerarquía, no autorización para esconder el aviso |
| Botón primario (2557 y 2607) | Blanco sobre degradado cuyo extremo claro da3,31:1 y oscuro6,09:1 | Verificar fondo bajo los glifos antes de declarar fallo de todo el botón |

Se conservan las cuatro familias autoalojadas y los colores de marca como base. Esta fase no propone nuevos tokens ni divide CSS: esas decisiones corresponden a Fase 3.

### Tablas y formularios: diferencia funcional

| Superficie | Contexto/filtros | Localización y volumen | Guardado/acciones |
|---|---|---|---|
| Avance de alumnos | Grupo externo del panel | Sin búsqueda propia ni paginación; filas completas | Nombre abre detalle; no acciones masivas |
| Gestión de miembros | Nombre, rol, estado y grupo mediante filtros de usuarios | Otro bloque; no comparte búsqueda con avance; sin paginación | Acciones por miembro según permisos |
| Calificaciones | Grupo heredado, evaluaciones como columnas | Sin búsqueda/orden/paginación propios | Nota al blur; error global; no selección múltiple |
| Recepción | Campos identificados con labels | Sección de pago condicional | Envío explícito; resumen de errores inferior |
| Dictamen docente | Contexto del tema y pase | Firma prellenada; campos según acción | Envío explícito y escrituras sucesivas |

Fuentes: `src/components/panel/AvanceAlumnos.jsx`, `GestionMiembros.jsx`, `FiltrosUsuarios.jsx`, `AltaDeRecepcion.jsx`, `src/pages/panel/Calificaciones.jsx`, `src/components/RevisionDocente.jsx`. Una matriz con 200 alumnos y k evaluaciones genera 200×k controles de nota por estructura de render: es conteo potencial, no evidencia de un problema de rendimiento.

## 4. Alcance adicional y superficies secundarias

La vitrina (`src/components/CarrerasCarrusel.jsx`, `src/pages/CarreraPage.jsx`, rutas de `src/App.jsx`) amplía la oferta a seis carreras; no se debe extrapolar la disponibilidad del temario de Paramédicos a las otras cinco. La hipótesis comercial es que el visitante distingue oferta, disponibilidad y siguiente paso. Validación en una semana: pedir a candidatos que encuentren qué pueden estudiar hoy y explicar su respuesta; registrar confusiones sin inventar conversión. No se presenta la existencia de varias carreras como un defecto.

El editor y la replicación permanecen en el inventario de Fase 0. En esta fase no se probó una sesión de edición, publicación o replicación. `src/components/editor/DialogoConfirmar.jsx` aporta un patrón de foco que debe compararse con los diálogos del examen, no descartarse al unificar. Las tablas `.rp-tabla` entran en la medición visual; no se deducen permisos, acciones masivas ni seguridad de replicación a partir del CSS. Botiquín se conserva como parte de la referencia actual, sin atribuirle hallazgos nuevos no comprobados.

## 5. Prioridad por impacto × esfuerzo

Estimaciones cualitativas de implementación incremental, no métricas medidas ni plazos comprometidos. Impacto considera interrupción, confianza y alcance de la tarea; esfuerzo considera contratos y estados compartidos. Los bloqueantes preceden a cualquier cociente económico.

| Orden | Intervención a considerar | Hallazgos | Impacto | Esfuerzo estimado | Razón de prioridad |
|---:|---|---|---|---|---|
| 1 | Unificar elegibilidad editorial de preguntas | B01 | Muy alto | Medio | Contrato explícito del producto |
| 2 | Guardas de banco vacío y salida útil | B02 | Muy alto | Bajo | Evita una excepción reproducida |
| 3 | Nota e intento con estado confirmado y recuperación | A03/A04/M17 | Alto | Medio | Evita dar por persistido lo que falló |
| 4 | Seguimiento separado de riesgo y falta de evidencia | A05/M11/M12 | Alto | Medio | Acerca el panel a la tarea docente autorizada |
| 5 | Accesibilidad de controles, contraste y diálogos | A06/A07/M13/M14 | Alto | Medio | Barreras compartidas por tareas frecuentes |
| 6 | Preservación o explicación de excepciones de visibilidad | A09 | Alto | Medio | Evita liberaciones inesperadas |
| 7 | Recuperación de práctica en curso | A10 | Alto | Medio/alto | Requiere definir ciclo de vida y versiones del banco |
| 8 | Entrada docente a revisión y rastro legible | A08/M16 | Alto | Medio/alto | Depende de acordar bandeja y permisos; no reutilizar acceso superadmin sin más |
| 9 | Lectura larga y consistencia de componentes | M15/C19 | Medio/alto | Alto, divisible | Frecuencia presumida alta; requiere validar lectura móvil |
| 10 | Alta con contexto de grupo y copia fiable | M18/M14 | Medio | Bajo/medio | Cierra incertidumbre al incorporar alumnos |

### Las cinco apuestas

1. **Evaluaciones confiables.** Elegibilidad, vacío, intento y nota deben sostener la misma promesa. Evidencia B01/B02/A03/A04/A10/M17. Validar con fixtures de estados editoriales, red fallida y reentrada; después, pedir al alumno y profesor que identifiquen qué quedó guardado. No exige cambiar contenido ni criterios de aprobación.
2. **Seguimiento docente accionable.** Distinguir riesgo y ausencia de evidencia, conservar contexto de grupo y conectar explicación con alumno. Evidencia A05/M11/M12. Probar con profesores y un grupo sintético de 200 alumnos; registrar tiempo y exactitud. Menos de un minuto es meta, no resultado obtenido.
3. **Controles compartidos accesibles.** Priorizar selección de respuesta, diálogos, errores de campo, confirmación de copia y contraste. Evidencia A06/A07/M13/M14/C19. Validar teclado y lector de pantalla en claro/oscuro antes de extender el patrón.
4. **Estudio y revisión dentro del contexto del tema.** Mejorar orientación en lectura larga y acceso a trabajo docente sin perder aviso, firma ni límites del pase. Evidencia M15/A08/M16. Probar lectura y revisión con estados borrador, bloqueado y pase caducado; no confundir una mejora de jerarquía con quitar advertencias.
5. **Ingreso y liberación de contenido comprensibles.** Conectar invitación, grupo y visibilidad; explicar disponibilidad en la vitrina. Evidencia A09/M18 y fuentes de carreras. Probar que un director pueda predecir quién accederá a qué después de su acción, antes de escribir datos reales.

## 6. Validación pendiente y criterios de éxito

En una semana se puede preparar un entorno local con fixtures, revisar teclado/contraste en los tamaños objetivo y realizar sesiones breves con alumnos y profesores disponibles. La disponibilidad de participantes no está confirmada. Registrar pasos observados, errores, recuperación y comprensión; no publicar porcentajes ni tiempos hasta medirlos. El chequeo de navegadores Chrome/Edge/Safari/Firefox y móviles no se ha realizado aquí.

Antes de Fase 6 conviene convertir «lectura cómoda» en tareas de localizar y retomar información sin perder el aviso; «vendible» en comprensión de oferta y personalización por parte de academias; «CSS consolidado» en catálogo y mapeo verificables; «AA» en matriz de criterios, tamaños, temas y pruebas manuales. El umbral docente <60 segundos ya es concreto, pero necesita definir el inicio, caso correcto y condición de grupo. Estas son propuestas de medición, no resultados ni objetivos ya aprobados.

## 7. Decisiones y cierre de fase

- Aceptado: seis carreras en alcance, árbol actual como referencia y categorías separadas de riesgo/sin evidencia.
- Pendiente: ¿70 debe ser solo referencia de práctica en unidad mientras la academia no fije mínimo?
- Contradicción B01: ¿se autoriza corregir la elegibilidad de módulo/general y el banco vacío antes de iniciar Fase 2, o se mantienen registrados para la implementación posterior? No se ha corregido código en esta auditoría.
- Pendiente de investigación: no hay resultados de usuarios, rendimiento, sesiones autenticadas ni certificación WCAG.

Se detiene el trabajo al finalizar Fase 1. No se ejecuta Fase 2 sin la indicación del dueño.

## 8. Verificación ejecutada y parte de trabajo

Verificación sobre el árbol actual, 9 de septiembre de 2026. Los conteos históricos de Fase 0 no sustituyen esta ejecución.

| Comando | Resultado observado |
|---|---|
| `node docs/ux/medir-fase-1.mjs` | Exit 0; genera mediciones y registra las reproducciones, incluidos los defectos existentes. No es una suite que declare esos defectos resueltos. |
| `npm run gen:plan` | Exit 0; 268 lecciones con material estudiable, 14 de 14 nodos de evaluación configurados; informa `m1-examen-aplicacion` sin material de estudio. |
| `npm run gen:nav` | Exit 0; índice generado de 7 módulos y 287 temas. |
| `npm test` | Exit 0; tests 1225, pass 1225, fail 0, cancelled 0, skipped 0, todo 0; duration_ms 345741.389. |
| `npm run build` | Exit 0; built in 4.48s. Advierte chunks superiores a 500 kB; el mayor mostrado mide 720,23 kB antes de gzip. |
| `npm run inventario` | Exit 0; pendientes por módulo: 1, 4, 2, 3, 4, 2, 4. No son fallos del comando. |
| `npm run test:rules` | Exit 1: «firebase no se reconoce como un comando interno o externo». El emulador y las pruebas no arrancaron; no están aprobadas. |
| `git diff --check` | Exit 0; avisos de conversión LF/CRLF, sin errores de whitespace. No incluye archivos nuevos sin seguimiento. |

Archivos creados en esta fase:

- `C:\Users\PC\Documents\Paramedicos\docs\ux\FASE-1-AUDITORIA.md`: flujos, hallazgos, prioridad, apuestas y verificación.
- `C:\Users\PC\Documents\Paramedicos\docs\ux\FASE-1-MEDICIONES.md`: mediciones generadas y reproducciones.
- `C:\Users\PC\Documents\Paramedicos\docs\ux\medir-fase-1.mjs`: análisis reproducible local sin Firebase.

Permanece modificado de la intervención anterior `C:\Users\PC\Documents\Paramedicos\docs\ux\FASE-0-RECONOCIMIENTO.md`, con su cierre de verificación. `.claude/settings.local.json` ya estaba sin seguimiento y no se editó. Los generadores no dejan diferencias de contenido en los archivos generados. `git diff --stat` muestra solo el documento seguido de Fase 0 (35 inserciones, 2 eliminaciones); los tres archivos nuevos no aparecen allí hasta agregarse, acción que no se realizó.

No cambia ninguna ruta, pantalla ni botón. No se instalaron dependencias, no se modificaron reglas o contenido académico y no se hizo commit, push ni despliegue. Quedan sin implementar los hallazgos por el límite de esta fase; pendientes las pruebas de navegador, usuarios y reglas por las razones indicadas arriba.
