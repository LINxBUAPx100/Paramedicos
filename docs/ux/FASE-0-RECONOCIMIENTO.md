# PTEM — Fase 0: reconocimiento del código

Reconocimiento: 8 de septiembre de 2026. Cierre de verificación: 9 de septiembre de 2026. Alcance: reconocimiento, sin diseño ni cambios funcionales.

## Supuestos, acuerdos y límites

- La fuente de verdad es el árbol de trabajo local, no una descripción histórica ni producción. El dueño confirmó incluir los cambios concurrentes del Botiquín 3D.
- El dueño confirmó incluir la vitrina de carreras y comprobar el acceso del profesor a revisión desde su panel en las siguientes fases. Paramédicos sigue siendo el caso principal.
- Un archivo, una declaración JSX y un componente renderizado son unidades distintas. Los conteos siguientes explicitan cuál utilizan.
- No hay sesiones observadas, entrevistas, datos de academias ni resultados de usabilidad. No se ha medido tráfico, facilidad de lectura, tiempos de tarea ni cumplimiento WCAG.
- No se consultó ni escribió Firebase. La configuración del cliente y las reglas versionadas no demuestran el plan contratado, los permisos efectivamente publicados ni el estado de producción.
- No se modifica material académico ni se emiten dictámenes. La lectura del código editorial aquí solo identifica sus conexiones.
- Se termina en esta fase. La auditoría de flujos, los diseños, los tokens nuevos y el prototipo requieren el siguiente «continúa».

El [inventario completo](FASE-0-INVENTARIO.md) contiene cada declaración de ruta con propósito, los 73 archivos de componentes con exportaciones/importadores, cada tabla y formulario nativo, las familias de clases y los controles por archivo. Se reproduce desde la raíz con `node docs/ux/inventariar-fase-0.mjs`; el script lee fuentes, usa Babel/PostCSS ya instalados y solo sobrescribe ese inventario.

## 1. Stack encontrado

Versiones resueltas del lockfile; no son una recomendación de actualización.

| Pieza | Declaración / versión resuelta | Evidencia |
|---|---|---|
| Aplicación | `guia-de-lin`, 1.0.0; descripción «La Guía de Lin» | [package.json](../../package.json) |
| React / React DOM | `^18.3.1` / 18.3.1 | [package-lock.json](../../package-lock.json) |
| React Router DOM | `^6.26.2` / 6.30.4; HashRouter | [package.json](../../package.json), [main.jsx](../../src/main.jsx) |
| Vite | `^5.4.8` / 5.4.21 | [package-lock.json](../../package-lock.json) |
| Plugin React de Vite | `^4.3.1` / 4.7.0 | [package-lock.json](../../package-lock.json) |
| Firebase cliente | `^12.16.0` / 12.16.0 | [package-lock.json](../../package-lock.json) |
| Utilidades de desarrollo Firebase | `firebase-admin ^14.1.0`, `@firebase/rules-unit-testing ^5.0.1` | [package.json](../../package.json) |
| Tipografías npm | Heebo, Oswald, Fira Sans: 5.3.0 | [package-lock.json](../../package-lock.json) |
| Cascadia Code | WOFF2 locales; cuatro declaraciones font-face, fuera de @fontsource como dependencia | [index.css:35](../../src/index.css), [src/fonts](../../src/fonts) |
| Motor del atlas | Three.js 0.159.0 cargado dinámicamente por URL, fuera de dependencies | [atlasSource.js:1](../../src/features/anatomy3d/atlasSource.js) |
| Entorno local observado | Node v24.13.1; npm 11.8.0 | Salida de `node --version` / `npm --version` |
| Entorno CI | Node 22 y Java 21 | [deploy.yml](../../.github/workflows/deploy.yml) |

No hay librería de componentes ni framework CSS declarados. La aplicación está escrita en JavaScript/JSX. `src/main.jsx` monta StrictMode → HashRouter → AuthProvider → ContenidoProvider → ProgressProvider → TutorialProvider → App. Las páginas de contenido y paneles entran con React.lazy/Suspense; no todo el árbol inicial es diferido ([App.jsx](../../src/App.jsx)).

Vite usa `base: './'` y genera `dist`. El build comprueba forma y presencia de seis variables Firebase. La CSP se inyecta como meta solo en build: las fuentes son del mismo origen; scripts y conexiones tienen excepciones expresas para Auth, App Check opcional y atlas. «CSP cerrada a self» describe correctamente las fuentes, pero no todos los recursos ([vite.config.js](../../vite.config.js)).

El workflow ejecuta tests ante pushes a cualquier rama. El job de build admite `workflow_dispatch` o `main`; por tanto, el patrón de push por sí solo no implica que cada rama publique. Se conserva íntegra la prohibición de commits/push/despliegues de este encargo ([deploy.yml:71](../../.github/workflows/deploy.yml)).

## 2. Mapa de pantallas y shells

Hay **59 declaraciones JSX Route en el árbol actual**, no 59 pantallas diferentes. Una declaración genera seis portadas, cuatro index comparten URL con su shell/agrupador, hay cuatro redirecciones y un comodín. El inventario detalla cada declaración; los parámetros no representan una sola instancia de pantalla.

Las portadas públicas generadas son `/paramedicos`, `/enfermeria`, `/tsu-paramedico`, `/licenciatura-paramedico`, `/proteccion-civil` y `/cursos`. Solo la primera declara estado `abierta`; las otras cinco, `en_preparacion` ([carrerasModelo.js](../../src/lib/carrerasModelo.js)). Todas las rutas siguientes son fragmentos `#/…`.

| Superficie | Propósito actual | Entrada / composición y restricciones |
|---|---|---|
| `/` | Vitrina pública, bienvenida o inicio de estudio | `Inicio` distingue sesión, academia, staff y prueba; [App.jsx](../../src/App.jsx) |
| `/cuenta`, `/terminos-y-condiciones`, `/creditos` | Acceso/cuenta, términos, atribuciones | Públicas. Los términos pendientes interceptan el resto del árbol salvo las exenciones de cuenta/términos; [App.jsx](../../src/App.jsx) |
| `/modulo/:moduloId`, `/tema/:temaId`, `/temario`, `/buscar` | Recorrer estructura, estudiar y localizar temas | RutaProtegida + controles de contenido/visibilidad; [TemaPage.jsx](../../src/pages/TemaPage.jsx) |
| `/tema/:temaId/quiz` y tres alcances de examen | Práctica de tema y evaluación de unidad/módulo/general | Páginas diferentes; banco de exámenes filtra el estado editorial; [bancoExamen.js](../../src/lib/bancoExamen.js) |
| `/flashcards`, `/flashcards/:temaId`, `/logros`, `/progreso` | Repaso, galería/glosario y avance | `ProgresoPage` incluye vista propia y vista staff; [ProgresoPage.jsx](../../src/pages/ProgresoPage.jsx) |
| `/atlas-anatomico`, `/botiquin` | Exploradores visuales | Protegidas; Botiquín incorporado por trabajo concurrente; [App.jsx](../../src/App.jsx), [Layout.jsx](../../src/components/Layout.jsx) |
| `/panel` y ocho secciones | Trabajo de academia | Resumen, recepción, miembros, grupos, invitaciones, accesos, calificaciones, contenido y academia; [panelModelo.js](../../src/lib/panelModelo.js) |
| `/editor`, `/editor/:academiaId`, `/editor/plantilla/:plantillaId` | Estructura y contenido | Una página con contextos diferentes y permisos propios; [EditorPage.jsx](../../src/pages/EditorPage.jsx) |
| `/admin` y seis secciones globales | Administración de plataforma | Academias, usuarios, contenido, facturación, incidencias y logs; [AdminShell.jsx](../../src/components/admin/AdminShell.jsx) |
| `/admin/aca/:academiaId` | Academia dentro de consola global | Lista de programas y cinco secciones de academia: alumnos, accesos, invitaciones, recepción y ajustes; [AcademiaShell.jsx](../../src/components/admin/AcademiaShell.jsx) |
| `/admin/aca/:academiaId/c/:cursoId` | Curso dentro de academia | Resumen, grupos, contenido, revisión y calificaciones; hereda gate superadmin; [App.jsx](../../src/App.jsx) |
| `/admin/academia/:academiaId` | Ficha global de una academia | Conserva `PanelAcademia` integrado, además del árbol anterior; [AcademiaAdminPage.jsx:237](../../src/pages/AcademiaAdminPage.jsx) |
| `/fase/:moduloId`, `/fase/:moduloId/examen`, `/atlas`, `/admin/replicacion`, `*` | Compatibilidad y no encontrado | Redirecciones y NotFound; [App.jsx](../../src/App.jsx) |

El inventario de rutas es exhaustivo; esta tabla agrupa solo para explicar su propósito.

| Shell | Qué aporta | Relación con los demás |
|---|---|---|
| `Layout` | Barra superior, búsqueda, menú lateral, temas/módulos, modo claro/oscuro y pie | Envuelve toda la aplicación, también las consolas; [Layout.jsx](../../src/components/Layout.jsx) |
| `PanelShell` | Gate staff; selector de grupo; datos compartidos en Outlet; navegación filtrada | Usa `.consola-*`; superadmin se redirige a `/admin`; [PanelShell.jsx:115](../../src/components/panel/PanelShell.jsx) |
| `AdminShell` | Gate superadmin; carga global; navegación según academia/curso en URL | Usa también `.consola-*`; alberga AcademiaShell; [AdminShell.jsx](../../src/components/admin/AdminShell.jsx) |
| `AcademiaShell` | Resuelve una academia y curso; aporta contexto y cabecera | Anidado dentro de AdminShell, no una consola independiente del rol global; [AcademiaShell.jsx](../../src/components/admin/AcademiaShell.jsx) |

Son **cuatro componentes shell**, con anidamiento y clases compartidas. No se sostiene que sean cuatro sistemas visuales completamente inconexos. Tampoco que haya que saltar siempre por carruseles: `Layout` ya enlaza temas y tiene búsqueda, y existe `/buscar`. Cuánto cuesta encontrar un tema sigue pendiente de Fase 1.

## 3. Inventario de componentes y variantes

| Carpeta | Archivos | Responsabilidad principal |
|---|---:|---|
| `src/components/` | 39 | Lector, evaluación, acceso, edición docente, galería, navegación, identidad reutilizada y gestión |
| `src/components/panel/` | 18 | 17 JSX y `datosAcademia.js`: grupos, miembros, estadísticas, códigos, solicitudes, horario, visibilidad y shell |
| `src/components/admin/` | 5 | Shells, selección/concesión de programas y baja de academia |
| `src/components/editor/` | 8 | Árbol, paneles de nodo/contenido, selector de activos, vistas previas, activación de copia y confirmación |
| `src/components/marca/` | 3 | LogoPTEM, LogoIcono e IconoEstrella |
| Total | 73 | 72 JSX y un módulo JS; no equivale a 73 componentes exportados |

El anexo lista todos los archivos y exportaciones detectadas. Componentes adicionales viven en `pages`, `context` y `features`; limitar un rediseño a `components` dejaría fuera controles y estados reales.

### Qué se puede contar sin inventar equivalencias visuales

| Familia | Medida comprobada | Interpretación |
|---|---|---|
| Botones nativos | 184 declaraciones en components; 322 en todo src | Un `.map` puede producir cientos de botones; un enlace con aspecto de botón no entra en esta cifra |
| Botón CSS compartido | `.btn` + 12 modificadores: 3 tamaños, 1 forma y 8 tonos | `sm`, `lg`, `mini`; `pildora`; `primario`, `suave`, `fantasma`, `carbon`, `urgencia`, `modulo`, `peligro`, `exito`; [index.css:2557](../../src/index.css) |
| Tablas nativas | 4 declaraciones en components; 10 en todo src | Tres bases usadas: `panel-tabla` (7), `rp-tabla` (2), `c-tabla` (1); variantes gestión, logs, calificaciones y mini; anexo con todas las ubicaciones |
| Formularios nativos | 10 declaraciones en components; 21 en todo src | No cuenta paneles de edición con guardar fuera de un form |
| Campos nativos | 108 input, 54 select, 8 textarea en todo src | Son sitios de declaración, no número de campos por tarea ni instancias renderizadas |
| Tarjetas | Familias por función, sin primitiva Card compartida identificada | `modulo-card`, `buscar-card`, `atlas-card`, `cuenta-card`, `pe-card`, `stat-card`, `tarjeta-inv`, `curso-tarjeta`, entre otras; catálogo completo de clases en el anexo |
| Avisos | Componente editorial dedicado + mensajes locales | `aviso-editorial` con estados revisión/bloqueado/vacío; `cs-alerta`, `cuenta-error`, `panel-vacio`, `editor-aviso`, `revdoc-aviso`, etc.; [AvisoEditorial.jsx](../../src/components/AvisoEditorial.jsx), [index.css](../../src/index.css) |

No hay un número defendible de «tarjetas o avisos visualmente distintos» sin clasificar subelementos, combinaciones de clases, estilos inline, estados y CSS calculado. El anexo entrega las clases concretas y sus ubicaciones; contar cada `*-card-titulo` como otra tarjeta sería inflar el resultado. Esa equivalencia visual se verificará en la auditoría.

### Duplicaciones y divergencias comprobadas en implementación

| Caso | Evidencia | Qué puede afirmarse ahora |
|---|---|---|
| Dos diálogos de confirmación | [ConfirmacionReforzada.jsx:19](../../src/components/ConfirmacionReforzada.jsx), [editor/DialogoConfirmar.jsx:9](../../src/components/editor/DialogoConfirmar.jsx) | Comparten Escape/foco de entrada y retorno; el del editor incorpora manejo de Tab, el Dialogo compartido no muestra ese manejo. Hay divergencia funcional verificable, no solo dos nombres |
| Controles de acción fuera de `.btn` | [RevisionDocente.jsx](../../src/components/RevisionDocente.jsx), [VisorImagen.jsx](../../src/components/VisorImagen.jsx), [Layout.jsx](../../src/components/Layout.jsx) | `.revdoc-btn`, `.visor-btn` y `.menu-btn` resuelven acciones específicas. Su diferencia no prueba por sí sola que sea accidental |
| Tres renderizadores de tabla | [Contenido.jsx:92](../../src/components/Contenido.jsx), [AvanceAlumnos.jsx:89](../../src/components/panel/AvanceAlumnos.jsx), [ReplicacionPage.jsx](../../src/pages/ReplicacionPage.jsx) | Lección, gestión y replicación tienen marcado propio; compartir estilos de panel no implica compartir filtrado/orden/paginación |
| Panel antiguo y panel por secciones coexisten | [AcademiaAdminPage.jsx:237](../../src/pages/AcademiaAdminPage.jsx), [PanelAcademia.jsx](../../src/components/PanelAcademia.jsx), [PanelShell.jsx](../../src/components/panel/PanelShell.jsx) | PanelAcademia sigue importado y usado. No puede tratarse como código muerto por sus comentarios históricos |
| Evaluación repetida en varias páginas | [ExamenPage.jsx](../../src/pages/ExamenPage.jsx), [ExamenModuloPage.jsx](../../src/pages/ExamenModuloPage.jsx), [ExamenUnidadPage.jsx](../../src/pages/ExamenUnidadPage.jsx), [Quiz.jsx](../../src/components/Quiz.jsx) | Existen alcances y controladores distintos. No se propone fusionarlos sin revisar restricciones y estados |
| Estados reutilizados y estados locales | [ContenidoContext.jsx](../../src/context/ContenidoContext.jsx), [RutaProtegida.jsx](../../src/components/RutaProtegida.jsx), [AdminShell.jsx](../../src/components/admin/AdminShell.jsx) | Ya hay CargandoContenido/ErrorContenido y mensajes de gate. AdminShell conserva un mensaje propio que atribuye la carga fallida a reglas; no existe una única presentación de errores |

La posible deuda accidental se concentra en comportamiento repetido con contratos diferentes, no en que una tarjeta de estudio sea distinta de una fila administrativa. No se asignan severidades ni soluciones en Fase 0.

## 4. Sistema de estilos actual

| Medida de `src/index.css` | Resultado y criterio |
|---|---|
| Líneas físicas | 10 493, excluyendo el segmento vacío después del salto final |
| Declaraciones | 9 337 nodos declaration de PostCSS, incluyendo custom properties y font-face |
| Reglas | 2 543 nodos rule, incluidos los de media/keyframes |
| Reglas con `data-tema` en el selector | 23; una regla puede agrupar varios selectores |
| Variables declaradas distintas | 97 en cualquier selector; no todas son tokens globales |

El CSS ya tiene identidad azul/rojo/ámbar, superficies, cinco alias de familia tipográfica para cuatro fuentes, escala de 12 espaciados, nueve tamaños tipográficos, tres duraciones, curvas de transición, radios, sombras y colores semánticos. No parte de cero ([index.css:40](../../src/index.css)).

Modo oscuro: `html[data-tema='oscuro']` redefine variables; también existen overrides por clase. El inventario no mide contraste calculado. Los comentarios «AA» y la existencia de [tokensCss.test.mjs](../../tests/tokensCss.test.mjs) no certifican todas las combinaciones/estados.

La cascada global convive con CSS de funciones: [anatomy3d.css](../../src/features/anatomy3d/anatomy3d.css) y [botiquin3d.css](../../src/features/botiquin3d/botiquin3d.css). `TemaPage` y estadísticas aplican `--modulo-color` inline; la personalización tiene datos y formularios propios ([PersonalizacionAcademia.jsx](../../src/components/PersonalizacionAcademia.jsx)). Esto impide evaluar colores solo contra el tema por defecto.

La base `.btn` ya contempla hover/active/disabled y tamaños; tablas de gestión comparten `.panel-tabla`. Se confirma dispersión de patrones, pero no ausencia total de sistema. No se cambia ningún valor de marca en esta fase.

## 5. Roles, permisos y aislamiento

| Capa | Código y responsabilidad |
|---|---|
| Identidades | [roles.js](../../src/lib/roles.js): alumno, instructor, admin_escuela, superadmin; etiquetas y roles asignables |
| Estado de sesión/acceso | [AuthContext.jsx](../../src/context/AuthContext.jsx), [accesoModelo.js](../../src/lib/accesoModelo.js): perfil, academia, grupo, bloqueo, staff, supremo, capacidades y acceso |
| Plan comercial | [capacidades.js](../../src/lib/capacidades.js): base/pro/curso, excepciones de academia; academias sin plan explícito conservan default pro; no es una lista de roles |
| Grupo activo | [gruposDeUsuario.js](../../src/lib/gruposDeUsuario.js), [PanelShell.jsx](../../src/components/panel/PanelShell.jsx): alumno con grupo propio; profesor elige entre grupos asignados; director filtra academia |
| Programa/curso | [programasModelo.js](../../src/lib/programasModelo.js), [ContenidoContext.jsx](../../src/context/ContenidoContext.jsx): programa permitido por grupo; un grupo puede habilitar varios cursos; elegir curso no otorga permiso |
| Gate general | [RutaProtegida.jsx](../../src/components/RutaProtegida.jsx): carga, sesión/perfil, bloqueo, academia/prueba, programa; no reemplaza todos los gates por rol |
| Consolas | [PanelShell.jsx](../../src/components/panel/PanelShell.jsx), [AdminShell.jsx](../../src/components/admin/AdminShell.jsx): staff y superadmin respectivamente; visibilidad de secciones en [panelModelo.js](../../src/lib/panelModelo.js) |
| Edición granular | [permisosEditor.js](../../src/lib/permisosEditor.js), [EditorPage.jsx](../../src/pages/EditorPage.jsx), [firebase/editor.js](../../src/lib/firebase/editor.js): acciones, campos y cursos autorizados |
| Revisión temporal | [revisionDocente.js](../../src/lib/revisionDocente.js): pase de hasta 120 días; [RevisionDocente.jsx](../../src/components/RevisionDocente.jsx) decide acciones de firma; no equivale a edición/publicación |
| Validación de contenido | [estadoEditorial.js](../../src/lib/estadoEditorial.js), [validacionesModelo.js](../../src/lib/validacionesModelo.js), [firebase/validaciones.js](../../src/lib/firebase/validaciones.js): capa de firmas y estados efectivos; exámenes la consumen |
| Visibilidad | [useVisibilidad.js](../../src/lib/useVisibilidad.js), [TemaPage.jsx](../../src/pages/TemaPage.jsx), [LogrosPage.jsx](../../src/pages/LogrosPage.jsx): grupo, liberación y presentación del contenido |
| Seguridad de servidor | [firestore.rules](../../firestore.rules), [storage.rules](../../storage.rules) y [tests/rules](../../tests/rules): barrera final; no se verificó su versión desplegada |

**Distinción de revisión:** el profesor firma en `TemaPage` mediante `RevisionDocente`. La cola `/admin/aca/:academiaId/c/:cursoId/revision` está bajo AdminShell, que rechaza a quien no sea superadmin. `PanelContenido` enlaza al editor y muestra historial; no monta ColaDictamenes. Esta diferencia de acceso debe entrar en Fase 1, tal como autorizó el dueño. No se concede ningún permiso adicional aquí.

## 6. Formularios y validaciones existentes

El anexo ubica los 21 form con su onSubmit. La tabla siguiente incorpora además controles que guardan fuera de un formulario nativo.

| Trabajo | Campos / presentación actual | Validación y operación |
|---|---|---|
| Registro e ingreso | Nombre condicional, correo, contraseña; HTML email/required/minLength=6 | [Cuenta.jsx](../../src/pages/Cuenta.jsx), [firebase/auth.js](../../src/lib/firebase/auth.js); mensajes en [mensajeError.js](../../src/lib/mensajeError.js) |
| Canjear acceso | Código en Cuenta y Bienvenida, invitación capturada de URL | [codigoInvitacion.js](../../src/lib/codigoInvitacion.js), [firebase/canjear.js](../../src/lib/firebase/canjear.js); validación efectiva al canjear |
| Alta administrativa | Academia: código/nombre/tipo/plan; usuario: nombre/correo/contraseña | [AdminPage.jsx](../../src/pages/AdminPage.jsx): required y contraseña minLength=10; [capacidades.js](../../src/lib/capacidades.js), [firebase/admin.js](../../src/lib/firebase/admin.js) |
| Recepción | Nombre, correo, teléfono, grupo y nota; pago opcional con monto/concepto/método/referencia/nota | [AltaDeRecepcion.jsx](../../src/components/panel/AltaDeRecepcion.jsx): noValidate, errores por campo, `problemasDelAlta`/`problemasDelPago` en [recepcionModelo.js](../../src/lib/recepcionModelo.js); matrícula e invitación por API |
| Grupos y horario | Nombre/programa y controles de horario/miembros | [GruposAcademia.jsx](../../src/components/panel/GruposAcademia.jsx), [HorarioDelGrupo.jsx](../../src/components/panel/HorarioDelGrupo.jsx), [horarioGrupos.js](../../src/lib/horarioGrupos.js); límites y validación antes de persistir |
| Invitaciones y prueba | Rol, grupo, vigencia, usos y nota; opciones por permiso | [InvitacionesRol.jsx](../../src/components/panel/InvitacionesRol.jsx), [CodigosPrueba.jsx](../../src/components/panel/CodigosPrueba.jsx), [invitacionesModelo.js](../../src/lib/invitacionesModelo.js), [invitacionesCentro.js](../../src/lib/invitacionesCentro.js) |
| Miembros | Rol y grupo editables en filas; búsqueda/filtros y operaciones | [GestionMiembros.jsx](../../src/components/panel/GestionMiembros.jsx), [FiltrosUsuarios.jsx](../../src/components/panel/FiltrosUsuarios.jsx), [listaUsuarios.js](../../src/lib/listaUsuarios.js), [firebase/usuarios.js](../../src/lib/firebase/usuarios.js) |
| Calificaciones | Evaluación con título/fecha/descripción y valores en celdas | [Calificaciones.jsx](../../src/pages/panel/Calificaciones.jsx) llama `validarValor` de [calificacionesModelo.js](../../src/lib/calificacionesModelo.js); guardado por API |
| Permisos y pase | Casillas de capacidad/cursos y fecha/nota del pase | [PermisosEditoriales.jsx](../../src/components/PermisosEditoriales.jsx), [PaseRevisor.jsx](../../src/components/PaseRevisor.jsx), [permisosEditor.js](../../src/lib/permisosEditor.js), [revisionDocente.js](../../src/lib/revisionDocente.js) |
| Firma/corrección/reporte | Responsable, fuentes y comentario; obligatoriedad según acción | [RevisionDocente.jsx:233](../../src/components/RevisionDocente.jsx): `validarFirmaValidacion`, `validarDictamen`; [validacionesModelo.js](../../src/lib/validacionesModelo.js) normaliza firma/fecha/fuentes |
| Editor | Título, descripción, bloques, preguntas, actividades y recursos | [PanelNodo.jsx](../../src/components/editor/PanelNodo.jsx), [PanelContenidoTema.jsx](../../src/components/editor/PanelContenidoTema.jsx), [editorModelo.js](../../src/lib/editorModelo.js), [temaContenidoModelo.js](../../src/lib/temaContenidoModelo.js); controles de estructura, límites y permisos por campo |
| Personalización | Lema, colores/textos y bloques de inicio | [PersonalizacionAcademia.jsx](../../src/components/PersonalizacionAcademia.jsx), [homeAcademiaModelo.js](../../src/lib/homeAcademiaModelo.js); límites HTML y capacidad de plan |
| Replicación/plantillas | Nombre/id/descripción/categoría, notas y confirmaciones | [ReplicacionPage.jsx](../../src/pages/ReplicacionPage.jsx), [replicacionModelo.js](../../src/lib/replicacionModelo.js), [plantillasModelo.js](../../src/lib/plantillasModelo.js) |
| Anuncio y ficha de academia | Anuncio global, código y cambios de academia | [AdminPlataforma.jsx](../../src/components/AdminPlataforma.jsx), [AcademiaAdminPage.jsx](../../src/pages/AcademiaAdminPage.jsx); required/maxLength y APIs propias |
| Confirmación destructiva | Texto que debe coincidir con frase | [ConfirmacionReforzada.jsx](../../src/components/ConfirmacionReforzada.jsx), [admin/BajaAcademia.jsx](../../src/components/admin/BajaAcademia.jsx); distinta interacción a confirmación simple del editor |
| Búsqueda | Campo y envío en barra superior | [Layout.jsx](../../src/components/Layout.jsx), [BuscarPage.jsx](../../src/pages/BuscarPage.jsx); navegación a resultados |

No hay un motor único de formularios declarado. Conviven validación HTML, validadores de dominio y errores de Firebase. Las diferencias de contraseña son hechos del código, no una propuesta de política. No se ha comprobado todavía anuncio de errores por lector de pantalla, foco al primer error ni conservación de valores en todos los formularios.

## 7. Acoplamiento de UI y datos

La separación existe, pero **no se respeta como frontera absoluta**.

1. `ContenidoContext` proporciona índice y API de contenido, carga bajo demanda, elección de curso y firmas. El índice inicial evita distribuir los títulos completos; parte de los comentarios de fallback todavía describe un comportamiento anterior. Hay que seguir las asignaciones reales, no esos comentarios ([ContenidoContext.jsx:37](../../src/context/ContenidoContext.jsx)).
2. `TemaPage` combina `useTema`, progreso y visibilidad; además importa catálogos de imágenes/recursos y títulos visibles. El lector no es una vista intercambiable que solo reciba un objeto: decide alcance de examen, vecinos y navegación ([TemaPage.jsx:1](../../src/pages/TemaPage.jsx)).
3. Las consolas cargan datos en shells y los reparten por Outlet. Muchas acciones importan su API dentro del componente, por ejemplo desbloquear módulos en AvanceAlumnos. Hay lógica pura reutilizable, pero también orquestación asíncrona local ([PanelShell.jsx](../../src/components/panel/PanelShell.jsx), [AvanceAlumnos.jsx:52](../../src/components/panel/AvanceAlumnos.jsx)).
4. `src/lib` no es todo lógica pura: `useVisibilidad` y `useGlosario` importan React/contextos; `pintarTemario` usa canvas/DOM; `versionNueva` opera sobre window; `registro` escribe sessionStorage. «Sin Firebase» y «puro» no son equivalentes ([useVisibilidad.js](../../src/lib/useVisibilidad.js), [useGlosario.js](../../src/lib/useGlosario.js), [pintarTemario.js](../../src/lib/pintarTemario.js), [versionNueva.js](../../src/lib/versionNueva.js), [registro.js:32](../../src/lib/registro.js)).

| Escritura directa fuera de `src/lib/firebase` | Evidencia y efecto |
|---|---|
| AuthContext | [AuthContext.jsx:299](../../src/context/AuthContext.jsx): updateDoc en usuarios para promoción de correo supremo; las reglas siguen siendo la autorización real |
| ProgressContext | [ProgressContext.jsx:120](../../src/context/ProgressContext.jsx): setDoc merge en progreso, con debounce e hidratación |
| VisibilidadGrupos | [VisibilidadGrupos.jsx:128](../../src/components/panel/VisibilidadGrupos.jsx): updateDoc del grupo; a partir de línea 194, writeBatch para cambios masivos |

El barrido AST detecta imports directos de `firebase/firestore` fuera de la carpeta API solo en esos tres archivos. También hay lecturas/listeners directos allí. Esto es evidencia suficiente para refutar «única puerta de escritura»; no equivale a una auditoría completa de seguridad de red. No se ejecutaron dichas operaciones.

## 8. Qué creo que hace PTEM y diferencias con el encargo

Según el código, PTEM es una plataforma multiacademia y multicurso de estudio, evaluación y operación escolar. Une un lector de material clínico extenso, progreso/evaluaciones, administración de personas/grupos/accesos y un circuito de edición/firma/copia de temarios. La vitrina pública ya abarca seis carreras, aunque solo Paramédicos declara temario abierto. No es solo un cuestionario ni solamente una plataforma con un plan global.

| Contexto recibido | Lo que confirma o matiza el árbol actual |
|---|---|
| 7 módulos, 56 unidades, 287 nodos | Confirmado por gen:plan. El generador informa 268 lecciones estudiables y 14 nodos de evaluación; no son 287 lecciones homogéneas |
| 88 semanas / 440 horas | Hay campos de semanas/horas en el plan generado; comprobación de suma registrada en la sección de verificación |
| Todas las academias tienen su propia copia | El código distingue bundle, migrando, migrado y error; no presupone que toda academia ya tenga copia propia; [panel/Contenido.jsx](../../src/pages/panel/Contenido.jsx) |
| Un alumno, un grupo que define su programa | Un grupo puede habilitar varios cursos; no debe reducirse programa/grupo a equivalencia uno-a-uno; [ContenidoContext.jsx](../../src/context/ContenidoContext.jsx) |
| Revisión en ruta admin para staff | Firma en tema para quien tiene permiso; la cola citada requiere superadmin. Alcance ampliado por acuerdo del dueño |
| Tres shells sin patrón compartido | Cuatro componentes; Layout global, Admin/Panel comparten clases de consola y Academia está anidado |
| 43 componentes de raíz | 39 archivos de raíz; 73 incluyendo subcarpetas. Algunos archivos exportan varios componentes |
| 4 159 declaraciones CSS | 9 337 con parseo de todas las declaraciones; 10 493 líneas sí coincide |
| Tokens por construir | Ya existen escalas y colores semánticos; la futura fase deberá inventariar adopción y excepciones, no partir de cero |
| lib puro y escritura solo por API | Hay hooks/DOM/storage en lib y tres archivos con escrituras SDK fuera de API |
| Panel debe mostrar riesgo | Ya muestra lista y promedio. `resumenAcademia` define riesgo como media de mejores calificaciones bajo 70, omitiendo alumnos sin intentos; no es una detección general de abandono; [panelModelo.js:101](../../src/lib/panelModelo.js) |
| Botiquín aún no cableado según antecedente AGENTS | Durante esta fase otro trabajo añadió ruta, navegación, página, escena, CSS, catálogo y prueba. Incluido en inventario con autorización, sin atribuir esta implementación a Fase 0 |

Estas diferencias son observaciones del repositorio; no demuestran fallos experimentados por alumnos.

## 9. Supuestos que necesitan validación con personas

No se priorizan apuestas de diseño todavía. Se registran preguntas comprobables para evitar que una lectura de código se convierta en una afirmación sobre usuarios.

| Supuesto no demostrado | Evidencia que motiva comprobarlo | Validación propuesta en menos de una semana |
| Encontrar un tema cuesta demasiados saltos | Carruseles, enlaces de Layout, índice y búsqueda coexisten | Sesiones con alumnos en su teléfono: localizar dos temas concretos; registrar ruta elegida, errores, tiempo y abandonos |
| El aviso impide leer con comodidad | AvisoEditorial entre cabecera y lección en TemaPage | Observar lectura de tema largo en claro/oscuro; pedir explicar su estado editorial y recuperar una sección; no ocultar el aviso para probarlo |
| El profesor no entiende el riesgo en un minuto | Lista actual depende solo de exámenes presentados | Sesiones con profesores sobre un grupo anonimizado de prueba con y sin intentos; medir identificación correcta y tiempo; contrastar qué entienden por riesgo |
| El formulario masivo resulta lento/confuso | Gestión de miembros y calificaciones tienen marcado/controladores propios | Dos tareas de varios alumnos, con errores deliberados de entrada en entorno de prueba; registrar correcciones y pérdida de datos |
| El producto se percibe vendible a otra academia | Vitrina multicarrera y personalización disponible por capacidad | Revisión guiada con directores de otras academias: comprensión de alcance, marca y responsabilidades; registrar objeciones sin convertir opinión en intención de compra |

Son protocolos propuestos, no investigación realizada ni un tamaño de muestra representativo. Reclutamiento y datos anonimizados requieren coordinación con el dueño; no se contactó a nadie.

Antes de Fase 6 habrá que operacionalizar «lectura cómoda», «vendible» y «CSS consolidado». El objetivo de menos de un minuto necesita definir acierto y casos sin examen; WCAG requiere una matriz de pantallas, estados, tamaños, temas y tecnologías de apoyo, no solo un test CSS. Son criterios pendientes, no decisiones de diseño tomadas ahora.

## 10. Verificación y cierre de fase

La ejecución iniciada el 8 de septiembre terminó durante la interrupción de la sesión. Al retomar se recuperaron sus logs locales: las pruebas pasaron y el build había fallado por acceso de esbuild al directorio padre. Se reintentó únicamente el build, con permiso de ejecución ampliado, y se completó el inventario pendiente. No se modificó código para conseguir estos resultados.

| Comando / comprobación | Salida real observada |
|---|---|
| `node --version` / `npm --version` | `v24.13.1` / `11.8.0` |
| `npm run gen:plan` | Exit 0; 7 módulos, 56 unidades, 287 temas; 178 borrador, 104 en_revision, 5 bloqueado_por_decision; 268 lecciones con material estudiable; 14 de 14 nodos de evaluación configurados |
| `npm run gen:nav` | Exit 0; cifras de 7 módulos y 287 temas, sin títulos en el índice público |
| `npm test` | 1214 tests; pass 1214; fail 0; cancelled 0; skipped 0; todo 0; duration_ms 317641.6144 |
| `npm run build`, primer intento | Falló: `Cannot read directory "../..": Acceso denegado` y `Could not resolve ...vite.config.js` |
| `npm run build`, reintento con permiso ampliado | Exit 0; `built in 4.54s`. Aviso de chunks mayores de 500 kB; el mayor listado fue 720.23 kB minificado. No se publica el build |
| `npm run inventario` | Exit 0; 287 temas: COMPLETO 267, ESCASO 1, VACÍO 19; 287 con observaciones editoriales abiertas. COMPLETO es el umbral del script, no aprobación docente |
| `npm run test:rules` | Exit 1: `"firebase" no se reconoce como un comando interno o externo`. Java 21 está disponible, pero falta el CLI Firebase. Suite no ejecutada ni aprobada; no se instalaron dependencias |
| Suma de `planRescate[].totales` con Node | `{"semanas":88,"horas":440}` |
| `node docs/ux/inventariar-fase-0.mjs` | 59 declaraciones Route; 73 archivos de componentes; 322 button, 10 table, 21 form, 108 input, 54 select, 8 textarea; 9337 declaraciones CSS |
| Revisión de enlaces locales de los dos informes con Node | `{"enlacesLocalesRotos":[]}` |

Resumen del runner recuperado (formato real de Node 24):

```text
ℹ tests 1214
ℹ suites 0
ℹ pass 1214
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 317641.6144
```

Los logs de ejecución quedan en `%TEMP%/ptem-ux-fase0-*.log`; los resultados relevantes están transcritos arriba para que el informe no dependa de conservar temporales. Las lecturas exploratorias usaron Get-Content, rg y Git. Una consulta de procesos mediante Get-CimInstance recibió acceso denegado; no afecta estos resultados. Un comando exploratorio con comillas incompatibles terminó con exit 1 y se repitió corregido, sin modificar archivos.

Al retomar, el commit `97c3451` ya contenía los tres entregables de esta fase y el trabajo concurrente de Botiquín. Este agente no ejecutó add, commit, push ni despliegue. El cierre de este informe queda como modificación local sin commitear. La regeneración del inventario no produjo diferencias. No se alteró `.claude/settings.local.json`, que continúa sin seguimiento.

No cambia ninguna pantalla, ruta ni botón por esta fase. Los generadores ejecutados por la verificación reescribieron sus salidas locales sin dejar diferencias de código. El build produjo archivos locales ignorados en dist; no son el entregable. No se hicieron pruebas de navegador, de usabilidad ni certificación de accesibilidad: corresponden a las siguientes fases y no se sustituyen con el resultado de npm test.

No se abre Fase 1 automáticamente. Decisión pendiente: después de revisar estos archivos, ¿autorizas continuar con Fase 1 sobre el alcance confirmado?
