# Fase 0 — Inventario estático reproducible

Generado con `node docs/ux/inventariar-fase-0.mjs`. Cuenta declaraciones de código, no elementos renderizados ni personas. Los enlaces abren el archivo; el sufijo indica la línea observada. No determina equivalencia visual ni accesibilidad.

## Conteos

| Medida | Resultado |
|---|---|
| Líneas físicas index.css (sin contar el segmento vacío final) | 10493 |
| Declaraciones CSS (PostCSS; incluye custom properties y @font-face) | 9337 |
| Reglas CSS / reglas con data-tema | 2543 / 23 |
| Custom properties distintas declaradas, en cualquier selector | 97 |
| Archivos components (incluye datosAcademia.js) | 73 |
| Controles declarados en components | {"button":184,"table":4,"form":10,"input":67,"select":33,"textarea":6} |
| Controles declarados en todo src | {"button":322,"table":10,"form":21,"input":108,"select":54,"textarea":8} |
| Pruebas raíz / reglas | 99 / 12 |

## Rutas declaradas

59 declaraciones JSX Route. La entrada /{c.slug} se expande en seis rutas desde carrerasModelo.js; index y shell no son pantallas adicionales. Todas usan #/ en el navegador.

| Ruta | Tipo | Componente / gate | Propósito | Evidencia |
|---|---|---|---|---|
| / | elemento | Inicio | Portada pública, bienvenida sin academia o inicio con acceso, según sesión | [src/App.jsx:153](../../src/App.jsx) |
| /cuenta | elemento | Cuenta | Registro, inicio de sesión, código de acceso y gestión de cuenta | [src/App.jsx:154](../../src/App.jsx) |
| /{c.slug} | elemento | Landing → CarreraPage | Portada de Paramédicos; CarreraPage presenta las otras cinco carreras en preparación | [src/App.jsx:162](../../src/App.jsx) |
| /terminos-y-condiciones | elemento | TerminosPage | Consultar términos y condiciones | [src/App.jsx:172](../../src/App.jsx) |
| /modulo/:moduloId | elemento | RutaProtegida → ModuloPage | Índice del módulo y acceso a sus temas | [src/App.jsx:175](../../src/App.jsx) |
| /modulo/:moduloId/examen | elemento | RutaProtegida → ExamenModuloPage | Rendir examen del módulo | [src/App.jsx:176](../../src/App.jsx) |
| /fase/:moduloId | elemento | RedirigirModulo | Compatibilidad: /fase redirige a /modulo, conservando id y examen | [src/App.jsx:179](../../src/App.jsx) |
| /fase/:moduloId/examen | elemento | RedirigirModulo | Compatibilidad: /fase redirige a /modulo, conservando id y examen | [src/App.jsx:180](../../src/App.jsx) |
| /tema/:temaId | elemento | RutaProtegida → TemaPage | Estudiar una lección o consultar un nodo de evaluación; revisión docente según permiso | [src/App.jsx:181](../../src/App.jsx) |
| /tema/:temaId/quiz | elemento | RutaProtegida → QuizPage | Contestar el quiz del tema | [src/App.jsx:182](../../src/App.jsx) |
| /tema/:temaId/examen | elemento | RutaProtegida → ExamenUnidadPage | Rendir evaluación del alcance de la unidad | [src/App.jsx:185](../../src/App.jsx) |
| /examen | elemento | RutaProtegida → ExamenPage | Rendir examen general | [src/App.jsx:186](../../src/App.jsx) |
| /flashcards | elemento | RutaProtegida → FlashcardsPage | Repasar tarjetas globales o de un tema | [src/App.jsx:187](../../src/App.jsx) |
| /flashcards/:temaId | elemento | RutaProtegida → FlashcardsPage | Repasar tarjetas globales o de un tema | [src/App.jsx:188](../../src/App.jsx) |
| /logros | elemento | RutaProtegida → LogrosPage | Galería del temario, medallero y glosario según visibilidad | [src/App.jsx:189](../../src/App.jsx) |
| /atlas-anatomico | elemento | RutaProtegida → AtlasAnatomicoPage | Explorar anatomía 3D | [src/App.jsx:190](../../src/App.jsx) |
| /botiquin | elemento | RutaProtegida → BotiquinPage | Explorar el botiquín 3D (trabajo concurrente, incluido por autorización del dueño) | [src/App.jsx:191](../../src/App.jsx) |
| /creditos | elemento | CreditosPage | Consultar atribuciones de los activos visuales sin iniciar sesión | [src/App.jsx:192](../../src/App.jsx) |
| /atlas | elemento | Navigate | Redirección de compatibilidad: atlas → logros; admin/replicacion → admin/contenido | [src/App.jsx:196](../../src/App.jsx) |
| /temario | elemento | RutaProtegida → TemarioPage | Consultar estructura del temario | [src/App.jsx:197](../../src/App.jsx) |
| /progreso | elemento | RutaProtegida → ProgresoPage | Ver avance propio y vista staff según rol | [src/App.jsx:198](../../src/App.jsx) |
| /buscar | elemento | RutaProtegida → BuscarPage | Buscar temas | [src/App.jsx:199](../../src/App.jsx) |
| /panel | elemento | RutaProtegida → PanelShell | Shell de la academia; puerta staff, contexto y navegación | [src/App.jsx:206](../../src/App.jsx) |
| /panel | index | PanelResumen | Estadísticas y alumnos en riesgo | [src/App.jsx:207](../../src/App.jsx) |
| /panel/recepcion | elemento | PanelRecepcion | Alta de mostrador, matrícula, invitación y pago | [src/App.jsx:208](../../src/App.jsx) |
| /panel/miembros | elemento | PanelMiembros | Consultar y gestionar miembros según permiso | [src/App.jsx:209](../../src/App.jsx) |
| /panel/grupos | elemento | PanelGrupos | Gestionar grupos y visibilidad | [src/App.jsx:210](../../src/App.jsx) |
| /panel/invitaciones | elemento | PanelInvitaciones | Centro de invitaciones | [src/App.jsx:211](../../src/App.jsx) |
| /panel/accesos | elemento | PanelAccesos | Códigos y solicitudes de acceso | [src/App.jsx:212](../../src/App.jsx) |
| /panel/calificaciones | elemento | PanelCalificaciones | Avance de exámenes y evaluaciones/calificaciones de grupo | [src/App.jsx:213](../../src/App.jsx) |
| /panel/contenido | elemento | PanelContenido | Estado de cursos, historial y entrada al editor | [src/App.jsx:214](../../src/App.jsx) |
| /panel/academia | elemento | PanelMiAcademia | Ajustes y personalización de academia | [src/App.jsx:215](../../src/App.jsx) |
| /editor | elemento | RutaProtegida → EditorPage | Editor estructural y de contenido; contexto propio, academia o plantilla | [src/App.jsx:222](../../src/App.jsx) |
| /editor/plantilla/:plantillaId | elemento | RutaProtegida → EditorPage | Editor estructural y de contenido; contexto propio, academia o plantilla | [src/App.jsx:223](../../src/App.jsx) |
| /editor/:academiaId | elemento | RutaProtegida → EditorPage | Editor estructural y de contenido; contexto propio, academia o plantilla | [src/App.jsx:224](../../src/App.jsx) |
| /admin | elemento | RutaProtegida → AdminShell | Shell global; puerta superadmin y contexto de plataforma | [src/App.jsx:231](../../src/App.jsx) |
| /admin | index | AdminResumen | Resumen global | [src/App.jsx:232](../../src/App.jsx) |
| /admin/academias | elemento | AdminPage | Academias o usuarios, según prop seccion | [src/App.jsx:233](../../src/App.jsx) |
| /admin/usuarios | elemento | AdminPage | Academias o usuarios, según prop seccion | [src/App.jsx:234](../../src/App.jsx) |
| /admin/contenido | elemento | ReplicacionPage | Plantillas, copias de temario y dictámenes globales | [src/App.jsx:235](../../src/App.jsx) |
| /admin/facturacion | elemento | AdminFacturacion | Planes, facturación y anuncio global | [src/App.jsx:236](../../src/App.jsx) |
| /admin/incidencias | elemento | AdminIncidencias | Incidencias de plataforma | [src/App.jsx:237](../../src/App.jsx) |
| /admin/logs | elemento | AdminLogs | Historial de operaciones | [src/App.jsx:238](../../src/App.jsx) |
| /admin/aca/:academiaId | elemento | AcademiaShell | Contexto de una academia dentro de la consola global | [src/App.jsx:250](../../src/App.jsx) |
| /admin/aca/:academiaId | index | AcaProgramas | Elegir y administrar programas de academia | [src/App.jsx:251](../../src/App.jsx) |
| /admin/aca/:academiaId/alumnos | elemento | AcaAlumnos | Personas de academia | [src/App.jsx:252](../../src/App.jsx) |
| /admin/aca/:academiaId/accesos | elemento | AcaAccesos | Códigos y solicitudes de academia | [src/App.jsx:253](../../src/App.jsx) |
| /admin/aca/:academiaId/invitaciones | elemento | AcaInvitaciones | Invitaciones de academia | [src/App.jsx:254](../../src/App.jsx) |
| /admin/aca/:academiaId/recepcion | elemento | AcaRecepcion | Recepción de academia | [src/App.jsx:255](../../src/App.jsx) |
| /admin/aca/:academiaId/ajustes | elemento | AcaAjustes | Ajustes y personalización de academia | [src/App.jsx:256](../../src/App.jsx) |
| /admin/aca/:academiaId/c/:cursoId | agrupador | — | Agrupar el contexto del curso; sin pantalla propia | [src/App.jsx:257](../../src/App.jsx) |
| /admin/aca/:academiaId/c/:cursoId | index | AcaResumen | Resumen del curso elegido | [src/App.jsx:258](../../src/App.jsx) |
| /admin/aca/:academiaId/c/:cursoId/grupos | elemento | AcaGrupos | Grupos del curso | [src/App.jsx:259](../../src/App.jsx) |
| /admin/aca/:academiaId/c/:cursoId/contenido | elemento | AcaContenido | Contenido del curso | [src/App.jsx:260](../../src/App.jsx) |
| /admin/aca/:academiaId/c/:cursoId/revision | elemento | AcaRevision | Cola de dictámenes del curso, bajo superadmin | [src/App.jsx:261](../../src/App.jsx) |
| /admin/aca/:academiaId/c/:cursoId/calificaciones | elemento | AcaCalificaciones | Calificaciones del curso | [src/App.jsx:262](../../src/App.jsx) |
| /admin/academia/:academiaId | elemento | AcademiaAdminPage | Ficha global de academia y panel de gestión integrado | [src/App.jsx:267](../../src/App.jsx) |
| /admin/replicacion | elemento | Navigate | Redirección de compatibilidad: atlas → logros; admin/replicacion → admin/contenido | [src/App.jsx:269](../../src/App.jsx) |
| * | elemento | NotFound | Ruta no encontrada | [src/App.jsx:272](../../src/App.jsx) |

## Todos los archivos de componentes

B/T/F = declaraciones button/table/form. Los importadores son referencias estáticas directas encontradas en src, no garantía de que una rama condicional se ejecute.

| Archivo | Exportaciones con nombre detectado | B/T/F | Importadores directos |
|---|---|---|---|
| [src/components/AceptarTerminos.jsx](../../src/components/AceptarTerminos.jsx) | AceptarTerminos | 2/0/0 | src/App.jsx |
| [src/components/Actividades.jsx](../../src/components/Actividades.jsx) | Actividades | 7/0/0 | src/components/editor/VistaPreviaTema.jsx, src/pages/TemaPage.jsx |
| [src/components/AdminPlataforma.jsx](../../src/components/AdminPlataforma.jsx) | FacturacionAcademias, AnuncioGlobal | 6/1/1 | src/pages/admin/Facturacion.jsx |
| [src/components/AvisoEditorial.jsx](../../src/components/AvisoEditorial.jsx) | AvisoEditorial, CuerpoSinContenido | 0/0/0 | src/pages/TemaPage.jsx |
| [src/components/BloqueAcademia.jsx](../../src/components/BloqueAcademia.jsx) | BloqueAcademia | 0/0/0 | src/components/PersonalizacionAcademia.jsx, src/pages/Home.jsx |
| [src/components/BloquesTema.jsx](../../src/components/BloquesTema.jsx) | ResumenTema, ObjetivosTema, ConceptosTema | 0/0/0 | src/components/editor/VistaPreviaTema.jsx, src/pages/TemaPage.jsx |
| [src/components/CarrerasCarrusel.jsx](../../src/components/CarrerasCarrusel.jsx) | CarrerasCarrusel | 3/0/0 | src/pages/PortadaPTEM.jsx |
| [src/components/ColaDictamenes.jsx](../../src/components/ColaDictamenes.jsx) | ColaDictamenes | 3/0/0 | src/components/PanelAcademia.jsx, src/pages/ReplicacionPage.jsx, src/pages/admin/academia/Revision.jsx |
| [src/components/CompartirCodigo.jsx](../../src/components/CompartirCodigo.jsx) | enlaceInvitacion, CompartirCodigo | 5/0/0 | src/components/panel/AccesoCodigos.jsx, src/components/panel/AltaDeRecepcion.jsx, src/components/panel/CodigosPrueba.jsx, src/components/panel/GruposAcademia.jsx, src/components/panel/InvitacionesRol.jsx |
| [src/components/ConfirmacionReforzada.jsx](../../src/components/ConfirmacionReforzada.jsx) | Dialogo, ConfirmacionReforzada | 3/0/0 | src/components/panel/GruposAcademia.jsx, src/pages/ReplicacionPage.jsx, src/pages/panel/Calificaciones.jsx |
| [src/components/Contador.jsx](../../src/components/Contador.jsx) | Contador | 0/0/0 | src/pages/Home.jsx |
| [src/components/Contenido.jsx](../../src/components/Contenido.jsx) | Contenido | 0/1/0 | src/components/editor/VistaPreviaTema.jsx, src/pages/Landing.jsx, src/pages/TemaPage.jsx |
| [src/components/CreditosActivo.jsx](../../src/components/CreditosActivo.jsx) | CreditosActivo | 2/0/0 | src/components/Imagen.jsx |
| [src/components/CursosDisponibles.jsx](../../src/components/CursosDisponibles.jsx) | CursosDisponibles | 1/0/0 | src/pages/Home.jsx |
| [src/components/ErrorBoundary.jsx](../../src/components/ErrorBoundary.jsx) | ErrorBoundary | 1/0/0 | src/App.jsx |
| [src/components/FichaEvaluacion.jsx](../../src/components/FichaEvaluacion.jsx) | FichaEvaluacion | 0/0/0 | src/pages/TemaPage.jsx |
| [src/components/Glosario.jsx](../../src/components/Glosario.jsx) | Glosario | 1/0/0 | src/pages/LogrosPage.jsx |
| [src/components/Icon.jsx](../../src/components/Icon.jsx) | Icon | 0/0/0 | src/components/AceptarTerminos.jsx, src/components/Actividades.jsx, src/components/AdminPlataforma.jsx, src/components/AvisoEditorial.jsx, src/components/BloqueAcademia.jsx, src/components/BloquesTema.jsx, src/components/CarrerasCarrusel.jsx, src/components/ColaDictamenes.jsx, src/components/CompartirCodigo.jsx, src/components/ConfirmacionReforzada.jsx, src/components/Contenido.jsx, src/components/CreditosActivo.jsx, src/components/CursosDisponibles.jsx, src/components/FichaEvaluacion.jsx, src/components/Glosario.jsx, src/components/Imagen.jsx, src/components/Layout.jsx, src/components/Medallero.jsx, src/components/MedicalIcon.jsx, src/components/MisCalificaciones.jsx, src/components/ModulosCarrusel.jsx, src/components/PanelAcademia.jsx, src/components/PaseRevisor.jsx, src/components/PermisosEditoriales.jsx, src/components/PersonalizacionAcademia.jsx, src/components/ProgresoStaff.jsx, src/components/Quiz.jsx, src/components/Recursos.jsx, src/components/RevisionDocente.jsx, src/components/RutaProtegida.jsx, src/components/TarjetaInvitacion.jsx, src/components/Tutorial.jsx, src/components/VisorImagen.jsx, src/components/admin/AcademiaShell.jsx, src/components/admin/AdminShell.jsx, src/components/admin/BajaAcademia.jsx, src/components/admin/ConcederProgramas.jsx, src/components/admin/ElegirAcademia.jsx, src/components/editor/ActivarCopia.jsx, src/components/editor/ArbolCurso.jsx, src/components/editor/PanelContenidoTema.jsx, src/components/editor/PanelNodo.jsx, src/components/editor/VistaPrevia.jsx, src/components/editor/VistaPreviaTema.jsx, src/components/panel/AccesoCodigos.jsx, src/components/panel/AltaDeRecepcion.jsx, src/components/panel/CodigosPrueba.jsx, src/components/panel/ElegirEspacio.jsx, src/components/panel/GestionMiembros.jsx, src/components/panel/GruposAcademia.jsx, src/components/panel/HorarioDelGrupo.jsx, src/components/panel/IndicesDeCursos.jsx, src/components/panel/InvitacionesRol.jsx, src/components/panel/ModulosDeAlumno.jsx, src/components/panel/PanelShell.jsx, src/components/panel/SolicitudesDeAcceso.jsx, src/components/panel/SolicitudesInternas.jsx, src/components/panel/VisibilidadGrupos.jsx, src/pages/AcademiaAdminPage.jsx, src/pages/AdminPage.jsx, src/pages/AtlasAnatomicoPage.jsx, src/pages/Bienvenida.jsx, src/pages/BotiquinPage.jsx, src/pages/BuscarPage.jsx, src/pages/CarreraPage.jsx, src/pages/CreditosPage.jsx, src/pages/Cuenta.jsx, src/pages/EditorPage.jsx, src/pages/ExamenModuloPage.jsx, src/pages/ExamenPage.jsx, src/pages/ExamenUnidadPage.jsx, src/pages/FlashcardsPage.jsx, src/pages/Home.jsx, src/pages/Landing.jsx, src/pages/LogrosPage.jsx, src/pages/ModuloPage.jsx, src/pages/NotFound.jsx, src/pages/PortadaPTEM.jsx, src/pages/ProgresoPage.jsx, src/pages/QuizPage.jsx, src/pages/ReplicacionPage.jsx, src/pages/TemaPage.jsx, src/pages/TemarioPage.jsx, src/pages/TerminosPage.jsx, src/pages/admin/Logs.jsx, src/pages/admin/Resumen.jsx, src/pages/admin/academia/Contenido.jsx, src/pages/admin/academia/Programas.jsx, src/pages/panel/Calificaciones.jsx, src/pages/panel/Contenido.jsx, src/pages/panel/Grupos.jsx, src/pages/panel/Invitaciones.jsx, src/pages/panel/MiAcademia.jsx, src/pages/panel/Resumen.jsx |
| [src/components/Imagen.jsx](../../src/components/Imagen.jsx) | Imagen | 1/0/0 | src/components/Contenido.jsx, src/components/Recursos.jsx, src/pages/Home.jsx, src/pages/LogrosPage.jsx, src/pages/TemaPage.jsx |
| [src/components/Layout.jsx](../../src/components/Layout.jsx) | Layout | 3/0/1 | src/App.jsx |
| [src/components/Medallero.jsx](../../src/components/Medallero.jsx) | Medallero | 0/0/0 | src/pages/LogrosPage.jsx |
| [src/components/MedicalIcon.jsx](../../src/components/MedicalIcon.jsx) | MedicalIcon | 0/0/0 | src/components/editor/SelectorActivo.jsx, src/pages/BuscarPage.jsx, src/pages/CreditosPage.jsx, src/pages/Landing.jsx, src/pages/ModuloPage.jsx, src/pages/ProgresoPage.jsx, src/pages/TemaPage.jsx |
| [src/components/MisCalificaciones.jsx](../../src/components/MisCalificaciones.jsx) | MisCalificaciones | 0/0/0 | src/pages/ProgresoPage.jsx |
| [src/components/ModulosCarrusel.jsx](../../src/components/ModulosCarrusel.jsx) | ModulosCarrusel | 3/0/0 | src/pages/Home.jsx |
| [src/components/PanelAcademia.jsx](../../src/components/PanelAcademia.jsx) | PanelAcademia | 0/0/0 | src/pages/AcademiaAdminPage.jsx |
| [src/components/PaseRevisor.jsx](../../src/components/PaseRevisor.jsx) | PaseRevisor | 4/0/1 | src/components/PermisosEditoriales.jsx |
| [src/components/PermisosEditoriales.jsx](../../src/components/PermisosEditoriales.jsx) | PermisosEditoriales | 2/0/0 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Alumnos.jsx, src/pages/panel/Miembros.jsx |
| [src/components/PersonalizacionAcademia.jsx](../../src/components/PersonalizacionAcademia.jsx) | PersonalizacionAcademia | 6/0/1 | src/pages/AcademiaAdminPage.jsx, src/pages/admin/academia/Ajustes.jsx, src/pages/panel/MiAcademia.jsx |
| [src/components/ProgresoStaff.jsx](../../src/components/ProgresoStaff.jsx) | ProgresoStaff | 0/0/0 | src/pages/ProgresoPage.jsx |
| [src/components/Quiz.jsx](../../src/components/Quiz.jsx) | Quiz | 4/0/0 | src/components/editor/VistaPreviaTema.jsx, src/pages/ExamenModuloPage.jsx, src/pages/ExamenPage.jsx, src/pages/ExamenUnidadPage.jsx, src/pages/QuizPage.jsx |
| [src/components/Recursos.jsx](../../src/components/Recursos.jsx) | Recursos | 0/0/0 | src/components/editor/VistaPreviaTema.jsx, src/pages/TemaPage.jsx |
| [src/components/Reveal.jsx](../../src/components/Reveal.jsx) | Reveal | 0/0/0 | src/components/CursosDisponibles.jsx, src/pages/CarreraPage.jsx, src/pages/Home.jsx, src/pages/Landing.jsx, src/pages/LogrosPage.jsx, src/pages/PortadaPTEM.jsx |
| [src/components/RevisionDocente.jsx](../../src/components/RevisionDocente.jsx) | RevisionDocente | 4/0/1 | src/pages/TemaPage.jsx |
| [src/components/RutaProtegida.jsx](../../src/components/RutaProtegida.jsx) | RutaProtegida | 0/0/0 | src/App.jsx |
| [src/components/TarjetaInvitacion.jsx](../../src/components/TarjetaInvitacion.jsx) | TarjetaInvitacion | 3/0/0 | src/components/CompartirCodigo.jsx |
| [src/components/TextoGlosario.jsx](../../src/components/TextoGlosario.jsx) | TextoGlosario | 0/0/0 | src/components/Contenido.jsx |
| [src/components/Tutorial.jsx](../../src/components/Tutorial.jsx) | Tutorial | 4/0/0 | src/components/TutorialDeRuta.jsx |
| [src/components/TutorialDeRuta.jsx](../../src/components/TutorialDeRuta.jsx) | TutorialDeRuta | 0/0/0 | src/components/Layout.jsx |
| [src/components/VisorImagen.jsx](../../src/components/VisorImagen.jsx) | VisorImagen | 5/0/0 | src/components/Imagen.jsx |
| [src/components/admin/AcademiaShell.jsx](../../src/components/admin/AcademiaShell.jsx) | useAcademiaAdmin, AcademiaShell | 0/0/0 | src/App.jsx, src/pages/admin/academia/Accesos.jsx, src/pages/admin/academia/Ajustes.jsx, src/pages/admin/academia/Alumnos.jsx, src/pages/admin/academia/Calificaciones.jsx, src/pages/admin/academia/Contenido.jsx, src/pages/admin/academia/Grupos.jsx, src/pages/admin/academia/Invitaciones.jsx, src/pages/admin/academia/Recepcion.jsx, src/pages/admin/academia/Resumen.jsx, src/pages/admin/academia/Revision.jsx |
| [src/components/admin/AdminShell.jsx](../../src/components/admin/AdminShell.jsx) | useAdmin, AdminShell | 0/0/0 | src/App.jsx, src/components/admin/AcademiaShell.jsx, src/pages/AdminPage.jsx, src/pages/admin/Facturacion.jsx, src/pages/admin/Logs.jsx, src/pages/admin/Resumen.jsx |
| [src/components/admin/BajaAcademia.jsx](../../src/components/admin/BajaAcademia.jsx) | BajaAcademia | 7/0/0 | src/pages/AcademiaAdminPage.jsx |
| [src/components/admin/ConcederProgramas.jsx](../../src/components/admin/ConcederProgramas.jsx) | ConcederProgramas | 1/0/0 | src/pages/admin/academia/Ajustes.jsx |
| [src/components/admin/ElegirAcademia.jsx](../../src/components/admin/ElegirAcademia.jsx) | ElegirAcademia | 0/0/0 | src/pages/admin/Resumen.jsx |
| [src/components/editor/ActivarCopia.jsx](../../src/components/editor/ActivarCopia.jsx) | ActivarCopia | 1/0/1 | src/pages/EditorPage.jsx |
| [src/components/editor/ArbolCurso.jsx](../../src/components/editor/ArbolCurso.jsx) | ChipEstado, ArbolCurso | 8/0/0 | src/components/editor/PanelNodo.jsx, src/pages/EditorPage.jsx |
| [src/components/editor/DialogoConfirmar.jsx](../../src/components/editor/DialogoConfirmar.jsx) | DialogoConfirmar | 2/0/0 | src/pages/EditorPage.jsx |
| [src/components/editor/PanelContenidoTema.jsx](../../src/components/editor/PanelContenidoTema.jsx) | PanelContenidoTema | 11/0/0 | src/pages/EditorPage.jsx |
| [src/components/editor/PanelNodo.jsx](../../src/components/editor/PanelNodo.jsx) | PanelNodo | 12/0/0 | src/pages/EditorPage.jsx |
| [src/components/editor/SelectorActivo.jsx](../../src/components/editor/SelectorActivo.jsx) | SelectorActivo | 3/0/0 | src/components/editor/PanelContenidoTema.jsx |
| [src/components/editor/VistaPrevia.jsx](../../src/components/editor/VistaPrevia.jsx) | VistaPrevia | 1/0/0 | src/pages/EditorPage.jsx |
| [src/components/editor/VistaPreviaTema.jsx](../../src/components/editor/VistaPreviaTema.jsx) | VistaPreviaTema | 1/0/0 | src/components/editor/PanelContenidoTema.jsx |
| [src/components/marca/IconoEstrella.jsx](../../src/components/marca/IconoEstrella.jsx) | IconoEstrella | 0/0/0 | src/components/Layout.jsx, src/pages/Home.jsx, src/pages/Landing.jsx, src/pages/NotFound.jsx, src/pages/PortadaPTEM.jsx |
| [src/components/marca/LogoIcono.jsx](../../src/components/marca/LogoIcono.jsx) | LogoIcono | 0/0/0 | src/components/Layout.jsx |
| [src/components/marca/LogoPTEM.jsx](../../src/components/marca/LogoPTEM.jsx) | LogoPTEM | 0/0/0 | src/components/Layout.jsx |
| [src/components/panel/AccesoCodigos.jsx](../../src/components/panel/AccesoCodigos.jsx) | AccesoCodigos | 3/0/0 | src/pages/admin/academia/Invitaciones.jsx, src/pages/panel/Invitaciones.jsx |
| [src/components/panel/AltaDeRecepcion.jsx](../../src/components/panel/AltaDeRecepcion.jsx) | AltaDeRecepcion | 4/0/1 | src/pages/admin/academia/Recepcion.jsx, src/pages/panel/Recepcion.jsx |
| [src/components/panel/AvanceAlumnos.jsx](../../src/components/panel/AvanceAlumnos.jsx) | AvanceAlumnos, DetalleAlumno | 4/1/0 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Alumnos.jsx, src/pages/panel/Miembros.jsx |
| [src/components/panel/CodigosPrueba.jsx](../../src/components/panel/CodigosPrueba.jsx) | CodigosPrueba | 5/0/1 | src/components/PanelAcademia.jsx, src/pages/admin/Facturacion.jsx, src/pages/admin/academia/Invitaciones.jsx, src/pages/panel/Invitaciones.jsx |
| [src/components/panel/ElegirEspacio.jsx](../../src/components/panel/ElegirEspacio.jsx) | TarjetasDeAcademia, TarjetasDeGrupo, PasosDeEspacio | 4/0/0 | src/pages/TemarioPage.jsx |
| [src/components/panel/Estadisticas.jsx](../../src/components/panel/Estadisticas.jsx) | Estadisticas | 0/0/0 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Resumen.jsx, src/pages/panel/Resumen.jsx |
| [src/components/panel/FiltrosUsuarios.jsx](../../src/components/panel/FiltrosUsuarios.jsx) | FiltrosUsuarios | 1/0/0 | src/components/panel/GestionMiembros.jsx, src/pages/AdminPage.jsx |
| [src/components/panel/GestionMiembros.jsx](../../src/components/panel/GestionMiembros.jsx) | GestionMiembros | 7/1/0 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Alumnos.jsx, src/pages/panel/Miembros.jsx |
| [src/components/panel/GruposAcademia.jsx](../../src/components/panel/GruposAcademia.jsx) | GruposAcademia | 11/0/1 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Grupos.jsx, src/pages/panel/Grupos.jsx |
| [src/components/panel/HorarioDelGrupo.jsx](../../src/components/panel/HorarioDelGrupo.jsx) | HorarioDelGrupo | 2/0/0 | src/components/panel/GruposAcademia.jsx |
| [src/components/panel/IndicesDeCursos.jsx](../../src/components/panel/IndicesDeCursos.jsx) | useCursosConSello, CursoConIndices | 1/0/0 | src/pages/admin/academia/Contenido.jsx, src/pages/panel/Contenido.jsx |
| [src/components/panel/InvitacionesRol.jsx](../../src/components/panel/InvitacionesRol.jsx) | InvitacionesRol | 5/0/1 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Invitaciones.jsx, src/pages/panel/Invitaciones.jsx |
| [src/components/panel/ModulosDeAlumno.jsx](../../src/components/panel/ModulosDeAlumno.jsx) | ModulosDeAlumno | 2/0/0 | src/components/panel/AvanceAlumnos.jsx |
| [src/components/panel/PanelShell.jsx](../../src/components/panel/PanelShell.jsx) | usePanel, PanelShell, FiltroGrupo | 0/0/0 | src/App.jsx, src/pages/panel/Accesos.jsx, src/pages/panel/Calificaciones.jsx, src/pages/panel/Contenido.jsx, src/pages/panel/Grupos.jsx, src/pages/panel/Invitaciones.jsx, src/pages/panel/MiAcademia.jsx, src/pages/panel/Miembros.jsx, src/pages/panel/Recepcion.jsx, src/pages/panel/Resumen.jsx |
| [src/components/panel/SolicitudesDeAcceso.jsx](../../src/components/panel/SolicitudesDeAcceso.jsx) | SolicitudesDeAcceso | 4/0/0 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Accesos.jsx, src/pages/admin/academia/Resumen.jsx, src/pages/panel/Accesos.jsx |
| [src/components/panel/SolicitudesInternas.jsx](../../src/components/panel/SolicitudesInternas.jsx) | SolicitudesInternas | 3/0/0 | src/components/PanelAcademia.jsx, src/pages/admin/academia/Accesos.jsx, src/pages/admin/academia/Resumen.jsx, src/pages/panel/Accesos.jsx |
| [src/components/panel/VisibilidadGrupos.jsx](../../src/components/panel/VisibilidadGrupos.jsx) | VisibilidadGrupos | 8/0/0 | src/components/PanelAcademia.jsx, src/pages/TemarioPage.jsx, src/pages/admin/academia/Contenido.jsx, src/pages/panel/Grupos.jsx |
| [src/components/panel/datosAcademia.js](../../src/components/panel/datosAcademia.js) | useDatosAcademia | 0/0/0 | src/components/PanelAcademia.jsx, src/components/panel/PanelShell.jsx, src/pages/admin/academia/Accesos.jsx, src/pages/admin/academia/Alumnos.jsx, src/pages/admin/academia/Calificaciones.jsx, src/pages/admin/academia/Contenido.jsx, src/pages/admin/academia/Grupos.jsx, src/pages/admin/academia/Invitaciones.jsx, src/pages/admin/academia/Recepcion.jsx, src/pages/admin/academia/Resumen.jsx |

## Tablas nativas (todo src)

| Archivo | Clase |
|---|---|
| [src/components/AdminPlataforma.jsx:100](../../src/components/AdminPlataforma.jsx) | "panel-tabla panel-tabla--gestion" |
| [src/components/Contenido.jsx:92](../../src/components/Contenido.jsx) | "c-tabla" |
| [src/components/panel/AvanceAlumnos.jsx:89](../../src/components/panel/AvanceAlumnos.jsx) | "panel-tabla" |
| [src/components/panel/GestionMiembros.jsx:228](../../src/components/panel/GestionMiembros.jsx) | "panel-tabla panel-tabla--gestion" |
| [src/pages/AdminPage.jsx:163](../../src/pages/AdminPage.jsx) | "panel-tabla panel-tabla--gestion" |
| [src/pages/ReplicacionPage.jsx:858](../../src/pages/ReplicacionPage.jsx) | "rp-tabla rp-tabla--mini" |
| [src/pages/ReplicacionPage.jsx:1038](../../src/pages/ReplicacionPage.jsx) | "rp-tabla" |
| [src/pages/admin/Logs.jsx:136](../../src/pages/admin/Logs.jsx) | "panel-tabla logs-tabla" |
| [src/pages/panel/Calificaciones.jsx:210](../../src/pages/panel/Calificaciones.jsx) | "panel-tabla" |
| [src/pages/panel/Calificaciones.jsx:320](../../src/pages/panel/Calificaciones.jsx) | "panel-tabla cal-tabla" |

## Formularios nativos (todo src)

No incluye grupos de controles guardados mediante botones fuera de un form. El inventario de controles siguiente sí los incluye.

| Archivo | Clase | onSubmit |
|---|---|---|
| [src/components/AdminPlataforma.jsx:298](../../src/components/AdminPlataforma.jsx) | "admin-form" | {guardar} |
| [src/components/Layout.jsx:246](../../src/components/Layout.jsx) | "topbar-buscar" | {buscar} |
| [src/components/PaseRevisor.jsx:104](../../src/components/PaseRevisor.jsx) | "pe-pase-form" | {conceder} |
| [src/components/PersonalizacionAcademia.jsx:92](../../src/components/PersonalizacionAcademia.jsx) | "admin-form" | {guardar} |
| [src/components/RevisionDocente.jsx:314](../../src/components/RevisionDocente.jsx) | {`revdoc-form revdoc-form--${accion}`} | {enviar} |
| [src/components/editor/ActivarCopia.jsx:77](../../src/components/editor/ActivarCopia.jsx) | "editor-arranque-form" | {empezar} |
| [src/components/panel/AltaDeRecepcion.jsx:128](../../src/components/panel/AltaDeRecepcion.jsx) | "rec-form" | {enviar} |
| [src/components/panel/CodigosPrueba.jsx:137](../../src/components/panel/CodigosPrueba.jsx) | "pc-form" | {crear} |
| [src/components/panel/GruposAcademia.jsx:204](../../src/components/panel/GruposAcademia.jsx) | "pc-form" | {crear} |
| [src/components/panel/InvitacionesRol.jsx:156](../../src/components/panel/InvitacionesRol.jsx) | "pc-form" | {crear} |
| [src/pages/AcademiaAdminPage.jsx:214](../../src/pages/AcademiaAdminPage.jsx) | "admin-form admin-form--codigo" | {cambiarCodigo} |
| [src/pages/AdminPage.jsx:553](../../src/pages/AdminPage.jsx) | "admin-form" | {crear} |
| [src/pages/AdminPage.jsx:657](../../src/pages/AdminPage.jsx) | "admin-form" | {crear} |
| [src/pages/Bienvenida.jsx:180](../../src/pages/Bienvenida.jsx) | "bv-form" | {usarCodigo} |
| [src/pages/Cuenta.jsx:188](../../src/pages/Cuenta.jsx) | "cuenta-form" | {enviar} |
| [src/pages/Cuenta.jsx:314](../../src/pages/Cuenta.jsx) | "cuenta-unir" | {unir} |
| [src/pages/EditorPage.jsx:882](../../src/pages/EditorPage.jsx) | "dialogo-cuerpo" | {(e) => { e.preventDefault(); confirmarCrear() }} |
| [src/pages/ReplicacionPage.jsx:513](../../src/pages/ReplicacionPage.jsx) | "rp-form" | {(e) => { e.preventDefault(); onGuardar(conCursoId ? datos : { ...datos, cursoId: undefined }) }} |
| [src/pages/ReplicacionPage.jsx:565](../../src/pages/ReplicacionPage.jsx) | "rp-form" | {(e) => { e.preventDefault(); onPublicar(notas) }} |
| [src/pages/ReplicacionPage.jsx:588](../../src/pages/ReplicacionPage.jsx) | "rp-form" | {(e) => { e.preventDefault(); onGuardar(valor) }} |
| [src/pages/panel/Calificaciones.jsx:255](../../src/pages/panel/Calificaciones.jsx) | "admin-form cal-form" | {crear} |

## Familias CSS por nombre

Clasificación léxica; incluye subelementos y modificadores. NO es un conteo de diseños distintos o duplicados accidentales.

| Clase | Primera regla |
|---|---|
| aca-aviso | [src/index.css:7713](../../src/index.css) |
| aca-avisos | [src/index.css:7712](../../src/index.css) |
| admin-academia-card | [src/index.css:1239](../../src/index.css) |
| admin-problemas-badge | [src/index.css:1982](../../src/index.css) |
| alerta | [src/index.css:1741](../../src/index.css) |
| atlas-card | [src/index.css:4121](../../src/index.css) |
| atlas-card--bloqueada | [src/index.css:1905](../../src/index.css) |
| atlas-card--link | [src/index.css:4134](../../src/index.css) |
| atlas-card-bloqueo-txt | [src/index.css:1931](../../src/index.css) |
| atlas-card-candado | [src/index.css:1921](../../src/index.css) |
| atlas-card-censura | [src/index.css:1906](../../src/index.css) |
| atlas-card-stretch | [src/index.css:4136](../../src/index.css) |
| atlas-card-titulo | [src/index.css:1930](../../src/index.css) |
| aviso-editorial | [src/index.css:2989](../../src/index.css) |
| aviso-editorial--bloqueado | [src/index.css:3004](../../src/index.css) |
| aviso-editorial--revision | [src/index.css:3000](../../src/index.css) |
| aviso-editorial--vacio | [src/index.css:3022](../../src/index.css) |
| aviso-editorial-cuerpo | [src/index.css:3026](../../src/index.css) |
| aviso-editorial-ico | [src/index.css:3008](../../src/index.css) |
| aviso-editorial-meta | [src/index.css:3029](../../src/index.css) |
| aviso-editorial-obs | [src/index.css:3030](../../src/index.css) |
| ba-aviso | [src/index.css:7766](../../src/index.css) |
| ba-avisos | [src/index.css:7764](../../src/index.css) |
| btn | [src/index.css:484](../../src/index.css) |
| btn--carbon | [src/index.css:2621](../../src/index.css) |
| btn--exito | [src/index.css:2639](../../src/index.css) |
| btn--fantasma | [src/index.css:2619](../../src/index.css) |
| btn--lg | [src/index.css:2582](../../src/index.css) |
| btn--mini | [src/index.css:2588](../../src/index.css) |
| btn--modulo | [src/index.css:2629](../../src/index.css) |
| btn--peligro | [src/index.css:2637](../../src/index.css) |
| btn--pildora | [src/index.css:2596](../../src/index.css) |
| btn--primario | [src/index.css:2607](../../src/index.css) |
| btn--sm | [src/index.css:2581](../../src/index.css) |
| btn--suave | [src/index.css:2613](../../src/index.css) |
| btn--urgencia | [src/index.css:2623](../../src/index.css) |
| buscar-card | [src/index.css:4729](../../src/index.css) |
| buscar-card-modulo | [src/index.css:4741](../../src/index.css) |
| buscar-card-resumen | [src/index.css:4737](../../src/index.css) |
| buscar-card-titulo | [src/index.css:4736](../../src/index.css) |
| c-callout--alerta | [src/index.css:3269](../../src/index.css) |
| c-imagen-ph-btn | [src/index.css:3348](../../src/index.css) |
| c-tabla | [src/index.css:3236](../../src/index.css) |
| c-tabla-wrap | [src/index.css:3235](../../src/index.css) |
| concepto-card | [src/index.css:4166](../../src/index.css) |
| creditos-aviso | [src/index.css:8557](../../src/index.css) |
| creditos-btn | [src/index.css:8523](../../src/index.css) |
| creditos-copiar-btn | [src/index.css:8572](../../src/index.css) |
| creditos-page-aviso | [src/index.css:8597](../../src/index.css) |
| creditos-tabla | [src/index.css:8665](../../src/index.css) |
| creditos-tabla-autor | [src/index.css:8677](../../src/index.css) |
| creditos-tabla-cambios | [src/index.css:8677](../../src/index.css) |
| creditos-tabla-ico | [src/index.css:8675](../../src/index.css) |
| creditos-tabla-id | [src/index.css:8681](../../src/index.css) |
| creditos-tabla-txt | [src/index.css:8676](../../src/index.css) |
| creditos-tabla-usos | [src/index.css:8677](../../src/index.css) |
| cs-aca-aviso | [src/index.css:5669](../../src/index.css) |
| cs-alerta | [src/index.css:7842](../../src/index.css) |
| cs-alerta--aviso | [src/index.css:7852](../../src/index.css) |
| cs-alerta--info | [src/index.css:7854](../../src/index.css) |
| cs-alerta--mal | [src/index.css:7850](../../src/index.css) |
| cs-alerta-ico | [src/index.css:7851](../../src/index.css) |
| cs-alertas | [src/index.css:7841](../../src/index.css) |
| cs-tabla-mini | [src/index.css:7873](../../src/index.css) |
| ct-boton | [src/index.css:6888](../../src/index.css) |
| ct-boton--peligro | [src/index.css:6905](../../src/index.css) |
| cuenta-aviso | [src/index.css:1756](../../src/index.css) |
| cuenta-badge | [src/index.css:2215](../../src/index.css) |
| cuenta-badge--ok | [src/index.css:2224](../../src/index.css) |
| cuenta-card | [src/index.css:2131](../../src/index.css) |
| curso-tarjeta | [src/index.css:5548](../../src/index.css) |
| curso-tarjeta--activa | [src/index.css:5560](../../src/index.css) |
| curso-tarjeta--pendiente | [src/index.css:5564](../../src/index.css) |
| deck-boton | [src/index.css:6141](../../src/index.css) |
| deck-card | [src/index.css:5742](../../src/index.css) |
| descarga-btn | [src/index.css:3497](../../src/index.css) |
| editor-aviso | [src/index.css:6686](../../src/index.css) |
| ee-chip--aviso | [src/index.css:10027](../../src/index.css) |
| ee-tarjeta | [src/index.css:9993](../../src/index.css) |
| ee-tarjeta-cod | [src/index.css:10015](../../src/index.css) |
| ee-tarjeta-linea | [src/index.css:10016](../../src/index.css) |
| ee-tarjeta-nota | [src/index.css:10018](../../src/index.css) |
| ee-tarjeta-pie | [src/index.css:10017](../../src/index.css) |
| ee-tarjeta-tit | [src/index.css:10014](../../src/index.css) |
| esq-tarjeta | [src/index.css:357](../../src/index.css) |
| examen-modulo-aviso | [src/index.css:257](../../src/index.css) |
| fact-plan-badge | [src/index.css:1685](../../src/index.css) |
| fact-plan-badge--curso | [src/index.css:1698](../../src/index.css) |
| fact-plan-badge--pro | [src/index.css:1697](../../src/index.css) |
| flashcard | [src/index.css:4587](../../src/index.css) |
| flashcard-cara | [src/index.css:4601](../../src/index.css) |
| flashcard-etiqueta | [src/index.css:4622](../../src/index.css) |
| flashcard-frente | [src/index.css:4616](../../src/index.css) |
| flashcard-inner | [src/index.css:4593](../../src/index.css) |
| flashcard-pista | [src/index.css:4634](../../src/index.css) |
| flashcard-reverso | [src/index.css:4617](../../src/index.css) |
| flashcard-tema | [src/index.css:4635](../../src/index.css) |
| flashcards-barra | [src/index.css:4579](../../src/index.css) |
| flashcards-contador | [src/index.css:4585](../../src/index.css) |
| flashcards-header | [src/index.css:4576](../../src/index.css) |
| flashcards-nav | [src/index.css:4644](../../src/index.css) |
| hero-badge | [src/index.css:2680](../../src/index.css) |
| imagen-ph-btn | [src/index.css:5128](../../src/index.css) |
| logs-accion--aviso | [src/index.css:7951](../../src/index.css) |
| mdl-card | [src/index.css:10419](../../src/index.css) |
| mdl-card--ok | [src/index.css:10441](../../src/index.css) |
| mdl-card-cuerpo | [src/index.css:10428](../../src/index.css) |
| mdl-card-ico | [src/index.css:10431](../../src/index.css) |
| mdl-card-ok-txt | [src/index.css:10446](../../src/index.css) |
| menu-btn | [src/index.css:2300](../../src/index.css) |
| modo-card | [src/index.css:2901](../../src/index.css) |
| modulo-card | [src/index.css:2805](../../src/index.css) |
| modulo-card-barra | [src/index.css:2880](../../src/index.css) |
| modulo-card-desc | [src/index.css:2871](../../src/index.css) |
| modulo-card-flecha | [src/index.css:2856](../../src/index.css) |
| modulo-card-num | [src/index.css:2848](../../src/index.css) |
| modulo-card-pie | [src/index.css:2872](../../src/index.css) |
| modulo-card-prog | [src/index.css:2879](../../src/index.css) |
| modulo-card-sub | [src/index.css:2870](../../src/index.css) |
| modulo-card-titulo | [src/index.css:233](../../src/index.css) |
| modulo-card-top | [src/index.css:2842](../../src/index.css) |
| modulo-fin-aviso | [src/index.css:5996](../../src/index.css) |
| modulo-fin-aviso-btns | [src/index.css:6005](../../src/index.css) |
| modulo-fin-card | [src/index.css:5841](../../src/index.css) |
| panel-estado-btn | [src/index.css:755](../../src/index.css) |
| panel-grupo-aviso | [src/index.css:1522](../../src/index.css) |
| panel-grupos-aviso | [src/index.css:8832](../../src/index.css) |
| panel-habilitar-btn | [src/index.css:6122](../../src/index.css) |
| panel-modulos-botones | [src/index.css:6100](../../src/index.css) |
| panel-retroceder-btn | [src/index.css:6105](../../src/index.css) |
| panel-tabla | [src/index.css:596](../../src/index.css) |
| panel-tabla--gestion | [src/index.css:697](../../src/index.css) |
| panel-tabla-wrap | [src/index.css:595](../../src/index.css) |
| pe-badge | [src/index.css:6980](../../src/index.css) |
| pe-card | [src/index.css:799](../../src/index.css) |
| pe-card--riesgo | [src/index.css:839](../../src/index.css) |
| pe-card-sub | [src/index.css:806](../../src/index.css) |
| pg-programa-aviso | [src/index.css:1511](../../src/index.css) |
| progreso-tabla | [src/index.css:4674](../../src/index.css) |
| ps-badge | [src/index.css:6043](../../src/index.css) |
| resumen-card | [src/index.css:4658](../../src/index.css) |
| revdoc-aviso | [src/index.css:8298](../../src/index.css) |
| revdoc-botones | [src/index.css:8173](../../src/index.css) |
| revdoc-btn | [src/index.css:8174](../../src/index.css) |
| revdoc-btn--corregir | [src/index.css:8192](../../src/index.css) |
| revdoc-btn--reportar | [src/index.css:8194](../../src/index.css) |
| revdoc-btn--validar | [src/index.css:8190](../../src/index.css) |
| rp-dialogo-botones | [src/index.css:7254](../../src/index.css) |
| rp-tabla | [src/index.css:7131](../../src/index.css) |
| rp-tabla--mini | [src/index.css:7139](../../src/index.css) |
| rp-tabla-scroll | [src/index.css:7130](../../src/index.css) |
| stat-card | [src/index.css:2718](../../src/index.css) |
| tarjeta-inv | [src/index.css:5613](../../src/index.css) |
| tarjeta-inv-acciones | [src/index.css:5619](../../src/index.css) |
| tarjeta-inv-aviso | [src/index.css:5629](../../src/index.css) |
| tarjeta-inv-falta | [src/index.css:5623](../../src/index.css) |
| tarjeta-inv-lienzo | [src/index.css:5614](../../src/index.css) |
| tarjeta-inv-nota | [src/index.css:5633](../../src/index.css) |
| tema-btn | [src/index.css:4879](../../src/index.css) |
| tema-nav-btn | [src/index.css:4325](../../src/index.css) |
| tema-nav-btn--examen | [src/index.css:6019](../../src/index.css) |
| tema-reporte-btn | [src/index.css:1935](../../src/index.css) |
| temario-badge | [src/index.css:3396](../../src/index.css) |
| terminos-botones | [src/index.css:8974](../../src/index.css) |
| visor-botones | [src/index.css:5207](../../src/index.css) |
| visor-btn | [src/index.css:5208](../../src/index.css) |
| visor-btn--cerrar | [src/index.css:5224](../../src/index.css) |
| vt-aviso | [src/index.css:9231](../../src/index.css) |
| vt-aviso-ico | [src/index.css:9240](../../src/index.css) |

## Controles por archivo

| Archivo | button | input | select | textarea | form | table |
|---|---|---|---|---|---|---|
| [src/components/AceptarTerminos.jsx](../../src/components/AceptarTerminos.jsx) | 2 | 1 | 0 | 0 | 0 | 0 |
| [src/components/Actividades.jsx](../../src/components/Actividades.jsx) | 7 | 0 | 0 | 0 | 0 | 0 |
| [src/components/AdminPlataforma.jsx](../../src/components/AdminPlataforma.jsx) | 6 | 6 | 3 | 0 | 1 | 1 |
| [src/components/CarrerasCarrusel.jsx](../../src/components/CarrerasCarrusel.jsx) | 3 | 0 | 0 | 0 | 0 | 0 |
| [src/components/ColaDictamenes.jsx](../../src/components/ColaDictamenes.jsx) | 3 | 2 | 0 | 0 | 0 | 0 |
| [src/components/CompartirCodigo.jsx](../../src/components/CompartirCodigo.jsx) | 5 | 0 | 0 | 0 | 0 | 0 |
| [src/components/ConfirmacionReforzada.jsx](../../src/components/ConfirmacionReforzada.jsx) | 3 | 1 | 0 | 0 | 0 | 0 |
| [src/components/Contenido.jsx](../../src/components/Contenido.jsx) | 0 | 0 | 0 | 0 | 0 | 1 |
| [src/components/CreditosActivo.jsx](../../src/components/CreditosActivo.jsx) | 2 | 0 | 0 | 0 | 0 | 0 |
| [src/components/CursosDisponibles.jsx](../../src/components/CursosDisponibles.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/components/ErrorBoundary.jsx](../../src/components/ErrorBoundary.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/components/Glosario.jsx](../../src/components/Glosario.jsx) | 1 | 1 | 0 | 0 | 0 | 0 |
| [src/components/Imagen.jsx](../../src/components/Imagen.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/components/Layout.jsx](../../src/components/Layout.jsx) | 3 | 1 | 0 | 0 | 1 | 0 |
| [src/components/ModulosCarrusel.jsx](../../src/components/ModulosCarrusel.jsx) | 3 | 0 | 0 | 0 | 0 | 0 |
| [src/components/PanelAcademia.jsx](../../src/components/PanelAcademia.jsx) | 0 | 0 | 2 | 0 | 0 | 0 |
| [src/components/PaseRevisor.jsx](../../src/components/PaseRevisor.jsx) | 4 | 1 | 1 | 0 | 1 | 0 |
| [src/components/PermisosEditoriales.jsx](../../src/components/PermisosEditoriales.jsx) | 2 | 2 | 0 | 0 | 0 | 0 |
| [src/components/PersonalizacionAcademia.jsx](../../src/components/PersonalizacionAcademia.jsx) | 6 | 12 | 0 | 0 | 1 | 0 |
| [src/components/Quiz.jsx](../../src/components/Quiz.jsx) | 4 | 0 | 0 | 0 | 0 | 0 |
| [src/components/RevisionDocente.jsx](../../src/components/RevisionDocente.jsx) | 4 | 2 | 0 | 2 | 1 | 0 |
| [src/components/TarjetaInvitacion.jsx](../../src/components/TarjetaInvitacion.jsx) | 3 | 0 | 0 | 0 | 0 | 0 |
| [src/components/Tutorial.jsx](../../src/components/Tutorial.jsx) | 4 | 0 | 0 | 0 | 0 | 0 |
| [src/components/VisorImagen.jsx](../../src/components/VisorImagen.jsx) | 5 | 0 | 0 | 0 | 0 | 0 |
| [src/components/admin/BajaAcademia.jsx](../../src/components/admin/BajaAcademia.jsx) | 7 | 2 | 1 | 0 | 0 | 0 |
| [src/components/admin/ConcederProgramas.jsx](../../src/components/admin/ConcederProgramas.jsx) | 1 | 1 | 0 | 0 | 0 | 0 |
| [src/components/editor/ActivarCopia.jsx](../../src/components/editor/ActivarCopia.jsx) | 1 | 1 | 0 | 0 | 1 | 0 |
| [src/components/editor/ArbolCurso.jsx](../../src/components/editor/ArbolCurso.jsx) | 8 | 0 | 0 | 0 | 0 | 0 |
| [src/components/editor/DialogoConfirmar.jsx](../../src/components/editor/DialogoConfirmar.jsx) | 2 | 0 | 0 | 0 | 0 | 0 |
| [src/components/editor/PanelContenidoTema.jsx](../../src/components/editor/PanelContenidoTema.jsx) | 11 | 11 | 2 | 3 | 0 | 0 |
| [src/components/editor/PanelNodo.jsx](../../src/components/editor/PanelNodo.jsx) | 12 | 1 | 1 | 1 | 0 | 0 |
| [src/components/editor/SelectorActivo.jsx](../../src/components/editor/SelectorActivo.jsx) | 3 | 1 | 0 | 0 | 0 | 0 |
| [src/components/editor/VistaPrevia.jsx](../../src/components/editor/VistaPrevia.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/components/editor/VistaPreviaTema.jsx](../../src/components/editor/VistaPreviaTema.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/components/panel/AccesoCodigos.jsx](../../src/components/panel/AccesoCodigos.jsx) | 3 | 0 | 0 | 0 | 0 | 0 |
| [src/components/panel/AltaDeRecepcion.jsx](../../src/components/panel/AltaDeRecepcion.jsx) | 4 | 7 | 3 | 0 | 1 | 0 |
| [src/components/panel/AvanceAlumnos.jsx](../../src/components/panel/AvanceAlumnos.jsx) | 4 | 0 | 0 | 0 | 0 | 1 |
| [src/components/panel/CodigosPrueba.jsx](../../src/components/panel/CodigosPrueba.jsx) | 5 | 1 | 3 | 0 | 1 | 0 |
| [src/components/panel/ElegirEspacio.jsx](../../src/components/panel/ElegirEspacio.jsx) | 4 | 0 | 0 | 0 | 0 | 0 |
| [src/components/panel/FiltrosUsuarios.jsx](../../src/components/panel/FiltrosUsuarios.jsx) | 1 | 1 | 4 | 0 | 0 | 0 |
| [src/components/panel/GestionMiembros.jsx](../../src/components/panel/GestionMiembros.jsx) | 7 | 2 | 2 | 0 | 0 | 1 |
| [src/components/panel/GruposAcademia.jsx](../../src/components/panel/GruposAcademia.jsx) | 11 | 4 | 2 | 0 | 1 | 0 |
| [src/components/panel/HorarioDelGrupo.jsx](../../src/components/panel/HorarioDelGrupo.jsx) | 2 | 4 | 1 | 0 | 0 | 0 |
| [src/components/panel/IndicesDeCursos.jsx](../../src/components/panel/IndicesDeCursos.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/components/panel/InvitacionesRol.jsx](../../src/components/panel/InvitacionesRol.jsx) | 5 | 1 | 4 | 0 | 1 | 0 |
| [src/components/panel/ModulosDeAlumno.jsx](../../src/components/panel/ModulosDeAlumno.jsx) | 2 | 0 | 0 | 0 | 0 | 0 |
| [src/components/panel/PanelShell.jsx](../../src/components/panel/PanelShell.jsx) | 0 | 0 | 2 | 0 | 0 | 0 |
| [src/components/panel/SolicitudesDeAcceso.jsx](../../src/components/panel/SolicitudesDeAcceso.jsx) | 4 | 1 | 1 | 0 | 0 | 0 |
| [src/components/panel/SolicitudesInternas.jsx](../../src/components/panel/SolicitudesInternas.jsx) | 3 | 0 | 0 | 0 | 0 | 0 |
| [src/components/panel/VisibilidadGrupos.jsx](../../src/components/panel/VisibilidadGrupos.jsx) | 8 | 0 | 1 | 0 | 0 | 0 |
| [src/context/ContenidoContext.jsx](../../src/context/ContenidoContext.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/AcademiaAdminPage.jsx](../../src/pages/AcademiaAdminPage.jsx) | 4 | 1 | 0 | 0 | 1 | 0 |
| [src/pages/AdminPage.jsx](../../src/pages/AdminPage.jsx) | 16 | 11 | 7 | 0 | 2 | 1 |
| [src/pages/AtlasAnatomicoPage.jsx](../../src/pages/AtlasAnatomicoPage.jsx) | 25 | 2 | 0 | 0 | 0 | 0 |
| [src/pages/Bienvenida.jsx](../../src/pages/Bienvenida.jsx) | 5 | 2 | 0 | 0 | 1 | 0 |
| [src/pages/BotiquinPage.jsx](../../src/pages/BotiquinPage.jsx) | 9 | 1 | 1 | 0 | 0 | 0 |
| [src/pages/BuscarPage.jsx](../../src/pages/BuscarPage.jsx) | 0 | 1 | 0 | 0 | 0 | 0 |
| [src/pages/CreditosPage.jsx](../../src/pages/CreditosPage.jsx) | 0 | 1 | 0 | 0 | 0 | 0 |
| [src/pages/Cuenta.jsx](../../src/pages/Cuenta.jsx) | 15 | 7 | 0 | 0 | 2 | 0 |
| [src/pages/EditorPage.jsx](../../src/pages/EditorPage.jsx) | 8 | 1 | 1 | 0 | 1 | 0 |
| [src/pages/ExamenModuloPage.jsx](../../src/pages/ExamenModuloPage.jsx) | 6 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/ExamenPage.jsx](../../src/pages/ExamenPage.jsx) | 4 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/ExamenUnidadPage.jsx](../../src/pages/ExamenUnidadPage.jsx) | 2 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/FlashcardsPage.jsx](../../src/pages/FlashcardsPage.jsx) | 4 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/Home.jsx](../../src/pages/Home.jsx) | 2 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/Landing.jsx](../../src/pages/Landing.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/LogrosPage.jsx](../../src/pages/LogrosPage.jsx) | 1 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/ProgresoPage.jsx](../../src/pages/ProgresoPage.jsx) | 2 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/ReplicacionPage.jsx](../../src/pages/ReplicacionPage.jsx) | 24 | 6 | 8 | 2 | 3 | 2 |
| [src/pages/TemaPage.jsx](../../src/pages/TemaPage.jsx) | 4 | 0 | 0 | 0 | 0 | 0 |
| [src/pages/admin/Logs.jsx](../../src/pages/admin/Logs.jsx) | 1 | 1 | 2 | 0 | 0 | 1 |
| [src/pages/admin/academia/Alumnos.jsx](../../src/pages/admin/academia/Alumnos.jsx) | 0 | 0 | 1 | 0 | 0 | 0 |
| [src/pages/admin/academia/Calificaciones.jsx](../../src/pages/admin/academia/Calificaciones.jsx) | 0 | 0 | 1 | 0 | 0 | 0 |
| [src/pages/panel/Calificaciones.jsx](../../src/pages/panel/Calificaciones.jsx) | 4 | 7 | 0 | 0 | 1 | 2 |

## Imports directos del SDK fuera de lib/firebase

| Archivo | Import |
|---|---|
| [src/components/panel/VisibilidadGrupos.jsx](../../src/components/panel/VisibilidadGrupos.jsx) | firebase/firestore |
| [src/components/panel/VisibilidadGrupos.jsx](../../src/components/panel/VisibilidadGrupos.jsx) | firebase/firestore |
| [src/context/AuthContext.jsx](../../src/context/AuthContext.jsx) | firebase/firestore |
| [src/context/AuthContext.jsx](../../src/context/AuthContext.jsx) | firebase/firestore |
| [src/context/AuthContext.jsx](../../src/context/AuthContext.jsx) | firebase/firestore |
| [src/context/AuthContext.jsx](../../src/context/AuthContext.jsx) | firebase/firestore |
| [src/context/ProgressContext.jsx](../../src/context/ProgressContext.jsx) | firebase/firestore |
| [src/context/ProgressContext.jsx](../../src/context/ProgressContext.jsx) | firebase/firestore |
