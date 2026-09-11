# Fase 3 — Sistema de diseño aplicado

## Supuestos y dirección

El dueño autorizó continuar las fases hasta ver el rediseño aplicado. Se conserva la identidad PTEM y se adopta una presentación editorial para estudio y operativa para el trabajo docente: títulos fuertes, lectura contenida, filas comparables, cifras monoespaciadas y avisos explícitos. No hay dependencias nuevas, fuentes remotas ni imágenes generadas.

Esta entrega implementa una capa incremental compartida por la aplicación y el laboratorio. El CSS anterior sigue cargándose: no se afirma que sus 10.493 líneas hayan desaparecido ni que todas las variantes históricas estén migradas. La retirada por familias queda secuenciada en Fase 6.

## Fuentes reales y orden de cascada

1. `src/index.css`: fuentes autoalojadas y base histórica. Importa `src/styles/marca.css`, que contiene los tokens originales de marca y su variante oscura; 105 declaraciones se conservaron idénticas al extraerlas.
2. `src/styles/tokens.css`: contrato semántico del rediseño.
3. `src/styles/componentes.css`: controles, panel, tabla, campos, estado, índice y detalle.
4. `src/styles/pantallas.css`: adaptadores de las clases que ya utilizan tema, módulo, quiz, panel, editor y vitrinas.

`src/main.jsx` importa estas cuatro capas en ese orden. `src/prototipo/main.jsx` usa exactamente las mismas capas y añade únicamente el armazón de revisión. No se emplea `!important` en los nuevos archivos. La mayor especificidad heredada puede seguir prevaleciendo en superficies no migradas; la revisión visual y las pruebas por ruta son necesarias antes de eliminar reglas antiguas.

## Tokens y uso

| Familia | Contrato implementado | Uso |
|---|---|---|
| Marca | `--primario`, `--primario-claro`, `--primario-oscuro` existentes | El botón primario pasa a relleno sólido; no cambia el azul oficial |
| Superficies | `--ui-papel: var(--bg-2)`, `--ui-lienzo: var(--bg)` | Paneles y fondo heredan el tema actual |
| Texto | `--ui-tinta`, `--ui-secundario`, `--ui-foco` | Remiten a texto, texto secundario y enlace del tema |
| Semántica | `--exito`, `--peligro`, `--aviso` existentes | Notas y avisos; se sustituye verde/rojo decorativo en celdas de calificación |
| Tipografía | Heebo para títulos, Oswald para contexto, Fira Sans para lectura, Cascadia Code para cifras | Se conservan archivos autoalojados y escala `--t-*` |
| Lectura | `--ui-lectura: 72ch`, `--ui-interlineado: 1.75` | Columna de prosa; las tablas conservan su contenido |
| Espaciado | `--e-4` a `--e-40` según la escala existente | Separación y padding de componentes nuevos |
| Radios | `--ui-radio: 8px`, `--ui-radio-panel: 12px` | Controles y contenedores; reemplazo gradual de curvas accidentales |
| Sombras | `--ui-sombra` con variante oscura | Relieve moderado para panel/lector; tablas y filas sin sombras decorativas |
| Interacción | `--ui-control: 44px`, `--ui-duracion: 160ms` | Altura de control y transición; tamaño compacto 32px; reducción de movimiento respetada |

Las escalas de marca ya existentes no se duplican con otra paleta. En modo oscuro los alias toman los valores de `html[data-tema='oscuro']`; la sombra sí tiene definición específica. Cambiar una marca de academia todavía exige verificar contraste de sus valores personalizados: este trabajo no certifica colores arbitrarios.

## Biblioteca: anatomía, variantes y estados

| Pieza | Anatomía y variantes implementadas | Estado y comportamiento |
|---|---|---|
| Botón `.btn` | Label; icono opcional del catálogo; primario, suave y compacto existentes | Normal/hover/foco/disabled. Foco de 3px; no traslado al hover. Durante guardado se desactiva cuando lo gobierna el componente |
| Panel `.ui-panel` | Título, descripción, contenido y acciones | Papel semántico, borde y radio común; no sustituye un estado de error por vacío |
| Campo `.ui-campo` | Label visible y control; input/select/textarea | Campo normal/foco/required nativo en laboratorio; producción conserva validadores propios |
| Tabla `.ui-tabla` | Caption, encabezados, filas y contenedor de scroll | Filas hover/focus-within, lectura con teclado, ancho mínimo 580px para no triturar columnas en móvil |
| Tabla de seguimiento | Resumen, búsqueda, categoría, orden, tabla, paginación y detalle | Vacío real, sin coincidencias, categorías separadas; 20 filas por página; detalle cierra devolviendo foco |
| Etiqueta `.ui-etiqueta` | Texto explícito y borde | Normal/riesgo; el significado no depende solo del color |
| Estado `.ui-estado` | Título o explicación y acción contextual | Error, vacío, carga o sin permiso según quien lo monta; ejemplos navegables en laboratorio |
| Índice de lección | `details`/`summary`, lista ordenada y botones | Colapsado/expandido; un botón enfoca la sección y desplaza sin animación. Dos columnas en escritorio, una en móvil |
| Quiz | Contador, pregunta, opciones, feedback, acciones y resultado | Banco vacío protegido; selección con `aria-pressed`; feedback `role=status`; foco en nueva pregunta |
| Celda de nota | Campo, valor local, estado textual y reintento | Guardando/deshabilitada, Guardado, No guardado; fallo con `aria-invalid` y reintento sin cambiar el valor escrito |
| Aviso editorial existente | Estado, explicación, corte clínico y observaciones completas | No descartable. Se conserva texto y lógica; nuevo contenedor y ancho |
| Notificación de copia | Texto compartible y confirmación | Recepción espera `clipboard.writeText`; no afirma copia cuando la promesa falla |
| Confirmación de visibilidad | Grupo, módulo, operación y conservación de excepciones | Confirmación nativa antes de alternar módulo; las operaciones masivas conservan sus controles existentes |

Normal/hover/activo/foco no requieren pantallas duplicadas: son estados del mismo control. Error/carga/vacío/solo lectura dependen del trabajo; no se añade una selección masiva a una tabla de seguimiento sin una acción autorizada que ejecutar.

### Patrones compuestos y límite de la migración

| Patrón solicitado | Realización actual | Qué todavía requiere migración |
|---|---|---|
| Tabla de datos | `SeguimientoAlumnos.jsx` + `seguimientoModelo.js`; búsqueda, orden, filtros, paginación, resumen y detalle | Selección múltiple/acciones masivas específicas y reutilización completa en todas las tablas históricas |
| Formulario largo | Capa de campos y controles aplicada a recepción/administración; muestra navegable con required | Asociar todos los errores históricos a campos, confirmación de salida pendiente y unificar validación |
| Buscador | Nombre accesible, resultados anunciados y estilos en `BuscarPage.jsx` | Restauración completa de filtros/consulta entre rutas |
| Maestro-detalle | Editor real conserva árbol y panel, con adaptador de estilo; demo de lectura/notas | Migrar todos los paneles internos del editor al contrato común |
| Notificaciones y confirmaciones | Celda de nota con feedback local, copia esperada, confirmación de visibilidad | Sustituir todos los diálogos antiguos y temporizadores de avisos con un componente común |
| Aviso editorial | Componente existente compartido; contenido conservado | Ninguna eliminación de advertencias autorizada |
| Lector | `Contenido` conserva párrafo, lista, pasos, tabla, fórmula, callout, imágenes y fuentes; índice real añadido | Comportamiento completo de glosario/recursos se conserva en aplicación; laboratorio desactiva solo enlaces al glosario para no montar proveedores |

## Mapeo de migración

| Componente/clase nueva | Fuente o clase anterior | Estrategia |
|---|---|---|
| `IndiceLeccion` + `.ui-indice` | No había índice local en TemaPage | Se añade antes de la lección sin modificar sus secciones |
| `SeguimientoAlumnos` + `.ui-tabla` | `AvanceAlumnos`, `.panel-tabla`, riesgo de Estadisticas | Nueva consulta en Resumen; gestión de habilitaciones sigue en Miembros |
| `.ui-campo` | `.pc-form`, `.admin-form`, `.rec-form`, `.cuenta-form` | Nuevos componentes usan el contrato; adaptadores actualizan controles antiguos sin renombrar todos sus campos |
| `.ui-panel` | `.pe-card`, contenedores de formulario | Convivencia por pantalla; evitar un reemplazo global indiscriminado |
| `.ui-estado` | `.panel-vacio`, errores y avisos dispersos | Banco vacío y laboratorio ya lo usan; migrar estados restantes por tarea |
| `.ui-nota-estado` | Error global de `Calificaciones` | Añade evidencia de guardado en la propia celda |
| `--ui-radio` / `--ui-radio-panel` | `--radio`, `--radio-sm`, variantes locales | Adaptadores; mantener los tokens antiguos mientras existan consumidores |
| `.tema-page .contenido-tema` | Columna de contenido sin ancho de lectura propio | Contención a72ch y mayor ritmo de prosa |
| Adaptadores de `.editor-panel`, `.vt-bloque` | Editor y vitrinas existentes | Cambio visual acotado, conserva navegación y permisos |

## División del monolito sin romper cascada

La capa nueva ya está dividida por responsabilidad. El monolito histórico se mantiene como base temporal, porque mover reglas con media queries y overrides oscuros alteraría su orden relativo. La retirada prevista es: identificar selectores sustituidos de una familia, probar sus consumidores, retirar exclusivamente esas reglas y actualizar el inventario. No basta con cortar cada mil líneas ni duplicar todas las reglas en varios archivos.

Las pruebas comprueban que los tokens de la nueva capa tienen definición; no afirman por sí solas que cada combinación visual cumpla AA. La matriz de verificación y las limitaciones reales están en [Fases 4–5](FASES-4-5-PANTALLAS-Y-PROTOTIPO.md).
