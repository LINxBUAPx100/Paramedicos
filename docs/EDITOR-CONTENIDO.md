# Editor estructural de contenido (Fase 3)

> Administra la jerarquía **Curso → Fase → Módulo → Tema** de la **copia
> propia** de cada academia (modelo de la Fase 2). Nada de lo que se hace aquí
> toca otra academia, la plantilla global, el contenido legacy de `src/data`,
> ni el progreso/intentos/calificaciones de los alumnos.

## Arquitectura (3 capas)

```
UI (React)                    src/pages/EditorPage.jsx + src/components/editor/*
  └─ operaciones PURAS        src/lib/editorModelo.js      (sin Firebase/React)
       └─ capa de datos       src/lib/firebase/editor.js   (transacciones)
            └─ Firestore Security Rules                    (barrera real)
```

1. **`editorModelo.js` (puro).** Todas las transformaciones de la estructura
   son funciones inmutables: `crearFase/Modulo/Tema`, `actualizarNodo`,
   `reordenarNodo`, `moverNodo`, `duplicarNodo`, `archivarNodo`,
   `restaurarNodo`, `despublicarNodo`, `publicarNodo`, `nuevoCurso`,
   `duplicadoDeCurso`, `permisoEdicion`, validaciones y `validarEstructura`.
   Se prueban con `npm test` sin tocar Firestore.
2. **`firebase/editor.js` (datos).** Única puerta de escritura del editor
   (ningún componente escribe Firestore). `guardarEstructura()` aplica la
   estructura nueva en una **transacción**: verifica `version` (conflicto ⇒
   `ConflictoVersion`, la UI recarga), escribe curso + docs de tema asociados
   (crear/duplicar/editar/sincronizar estado) y registra en `historial`.
   Doble destino con la misma API: academia (`cursos`/`temas`) o **modo
   plantilla** del superadmin (`plantillas`/`plantillasTemas`), con banda
   visual inconfundible en la UI.
3. **Reglas.** El plan (BASE no edita), el rol, la pertenencia, la versión
   estricta +1, la inmutabilidad de `academiaId/cursoId/temaId/creadoPor/
   creadoEn/clonacion/plantillaOrigenId/versionOrigen` y el catálogo de
   estados se imponen en `firestore.rules` — la UI y la capa de datos solo
   evitan ofrecer lo que el servidor rechazaría.

## Decisiones de diseño

- **La estructura vive en 1 doc (curso)** ⇒ crear/renombrar/reordenar/mover/
  archivar = **1 escritura** (más el doc del tema cuando aplica), nunca una
  escritura por elemento. El orden es la posición en el arreglo: estable y
  sin colisiones.
- **Estados centralizados**: `borrador | publicado | archivado`
  (`ESTADOS_NODO` en editorModelo.js). El alumno solo recibe `publicado`
  (filtro en `contenidoApi.ensamblarFases`, ahora también a nivel módulo).
- **Política de archivado** (elegida y aplicada): archivar un padre **oculta
  toda su rama** al alumno; los hijos conservan su estado propio, así que
  restaurar el padre recupera la rama tal como estaba. Nada se elimina nunca
  (no hay eliminación permanente en esta fase). Crear/mover HACIA un elemento
  archivado está bloqueado; publicar con un ancestro archivado, también.
- **Sincronía estructura ⇄ doc de tema**: si una operación cambia el estado
  de un tema en la estructura, la transacción actualiza también el `estado`
  del doc (la consulta del alumno filtra por el estado del doc).
- **Conflictos**: `version` numérica por doc; el editor guarda con la versión
  esperada y las reglas exigen exactamente +1. Ante conflicto se recarga y se
  explica (nunca se pisa en silencio).
- **Guardado**: explícito para textos (borrador local + botón Guardar, sin
  escrituras por tecla); inmediato-transaccional para acciones discretas.
  Indicador con `aria-live` (guardando/guardado/error), protección contra
  doble envío (`ocupado`), rollback optimista si Firestore rechaza, y aviso
  al abandonar cambios sin guardar (diálogo + `beforeunload`).
- **Duplicación**: ids NUEVOS para los temas duplicados ("Copia de …", en
  borrador, con `duplicadoDe` y autor); duplicar un curso copia estructura y
  temas al namespace nuevo dentro de la MISMA academia (ids internos se
  conservan: no colisionan y el progreso del original queda intacto). Nunca
  se copian progreso/intentos/calificaciones (viven en otras colecciones).
- **Permisos** (`permisoEdicion`, espejo de reglas): superadmin siempre;
  director solo su academia y solo con `capacidades.editorContenido`
  (BASE bloqueado también en reglas); profesor solo con
  `permisosEditor.editarContenido` y sus `cursosPermitidos`. La granularidad
  POR ACCIÓN (crear/publicar/exámenes/actividades/recursos) es la **Fase 6**
  (`src/lib/permisosEditor.js`, ver abajo). Alumno: nunca.
- **Academias legacy** (sin `contenido.estado == 'migrado'`): el editor se
  bloquea con una explicación (no existen herramientas que escriban sobre
  `src/data`); el superadmin ve el recordatorio de clonar la plantilla.
- **Plan CURSO**: `maxCursos` de `capacidades.js` se valida al crear/duplicar
  cursos (cuenta cursos no archivados). Sin `plan === 'curso'` disperso.
- **Vista previa**: reconstruye el temario con la MISMA capa que sirve al
  alumno (`ensamblarFases` + `construirApi`, solo publicado), en un diálogo
  marcado como vista previa. No importa módulos de progreso/intentos, así que
  no puede registrar nada.

## Accesibilidad

Teclado completo (botones nativos + alternativa al drag: Subir/Bajar/Al
inicio/Al final/Mover a…), foco visible, labels asociadas, errores con
`aria-describedby`, guardado con `aria-live`, diálogos con `role="dialog"`,
`aria-modal`, trampa de foco, Escape y devolución del foco al disparador;
estados con texto (chips), iconos SVG (`Icon`), `prefers-reduced-motion`,
layout que colapsa a una columna (zoom 200 % / tablet / móvil).

## Limitación conocida (documentada)

Un tema cuyo doc quedó `publicado` pero cuyo padre está archivado no aparece
en NINGUNA vista (la estructura manda), pero su doc seguiría siendo legible
por un alumno de la misma academia que conozca el id exacto. Mitigación
futura (fase de permisos/auditoría): cascada opcional de estado al archivar.

## Pruebas

- Puras: `tests/editorModelo.test.mjs` (22) + `tests/contenidoApi.test.mjs` y
  `tests/contenido.test.mjs` (Fase 2, siguen pasando) — `npm test`.
- Reglas (emulador): `tests/rules/contenido.rules.test.mjs` incluye los casos
  de la Fase 3 (versión estricta, autoría, metadatos protegidos, estados
  inválidos) — `npm run test:rules` (requiere Java + `npm i -D firebase-tools`).

---

# Fase 4 — Contenido enriquecido del tema

- **Panel de contenido** (`PanelContenidoTema.jsx`): al seleccionar un tema,
  debajo del panel estructural aparece el editor de su contenido interno por
  grupos plegables: secciones/bloques, objetivos, conceptos clave,
  flashcards, quiz (con **ponderación** por pregunta), recursos (videos,
  enlaces, imágenes y **archivos descargables**) y actividades
  (ordenar/completar/preguntas). Borrador LOCAL + un único "Guardar
  contenido" → `guardarContenidoTema()` (transacción, versión +1,
  `normalizarContenido` + `validarContenidoTema` + referencias de Storage).
- **Esquemas 1:1 con el alumno**: los mismos que renderizan
  Contenido/Recursos/Actividades/Quiz. Prueba de compatibilidad: el corpus
  completo de src/data valida sin cambios. `peso` y `recursos.archivos` son
  aditivos (sin peso ⇒ 1; el cálculo sin pesos ≡ aciertos/total actual).
- **Exámenes**: el examen de fase se deriva del quiz de sus temas (modelo
  vigente); editar el quiz ES editar el examen. `calcularCalificacion`
  (ponderada) queda en `temaContenidoModelo.js` para conectarla a las
  páginas del alumno junto con el resolutor. La regla de `intentos` ahora
  IMPIDE falsear resultados (consistencia aciertos/total/porcentaje).
- **Storage aislado**: `academias/{acaId}/{archivos|imagenes}/…` con
  `storage.rules` (lectura = miembros; escritura = editores; allowlist de
  MIME, ≤50 MB; resto del bucket cerrado). El cliente valida
  extensión/MIME/tamaño (`archivosModelo.js`), reconstruye la ruta canónica
  (jamás acepta rutas del cliente) y el contenido no puede referenciar
  Storage de otra academia (`validarReferenciasStorage`).
- **Vista previa del tema** (`VistaPreviaTema.jsx`): componentes REALES del
  alumno sin `onComplete` ni módulos de progreso ⇒ no registra progreso,
  intentos ni calificaciones; incluye los cambios sin guardar y se marca
  claramente como vista previa.
- **Pruebas**: 20 puras nuevas (`tests/temaContenido.test.mjs`) + suite de
  Storage (`tests/rules/storage.rules.test.mjs`, 6) + caso de intentos en la
  suite de Firestore. `npm run test:rules` ahora levanta firestore,storage.

---

# Fase 6 — Permisos editoriales granulares del profesor

Matriz CENTRALIZADA de permisos del INSTRUCTOR, única fuente en
`src/lib/permisosEditor.js`, reflejada sin dispersarse en las **cuatro capas**:
interfaz React, capa de acceso a datos, `firestore.rules` y `storage.rules`.
NO agrega funciones académicas: solo gobierna quién puede hacer qué.

- **Matriz** (`usuarios/{uid}.permisosEditor`): 6 booleanos +
  `cursosPermitidos[]` — `editarContenido`, `crearTemas`, `editarActividades`,
  `editarExamenes`, `publicarContenido`, `administrarRecursos`. Sin
  `editarContenido` no hay acceso; sin curso en `cursosPermitidos`, no edita
  ese curso. `normalizarPermisos`/`validarPermisos` descartan claves basura y
  exigen que los cursos existan.
- **Quién concede/retira**: SOLO el director PRO (capacidad
  `permisosEditoriales`) o el super-admin, y solo a **profesores de SU
  academia** — nunca a sí mismo, a otro director o a otra academia.
  UI: `PermisosEditoriales.jsx` (sección del panel del director);
  datos: `asignarPermisosEditor()` (valida forma + cursos y **audita** en
  `historial` con `asignar-permisos`/`revocar-permisos`).
- **Granularidad por ACCIÓN** (`permisoAccionEditor`, capa de datos, espejo de
  reglas): crear/duplicar ⇒ `crearTemas`; publicar/despublicar/archivar/
  restaurar ⇒ `publicarContenido`; editar campos/mover/reordenar ⇒ base.
- **Granularidad por CAMPO del tema** (`permisosRequeridosPorContenido` +
  `camposTemaSegunPermisos` en reglas): cambiar `quiz` ⇒ `editarExamenes`;
  `actividades` ⇒ `editarActividades`; `recursos` ⇒ `administrarRecursos`;
  `estado` ⇒ `publicarContenido`. La comparación es tolerante al vacío para no
  exigir un permiso cuando el profesor no tocó ese campo.
- **UI**: `capacidadesEditor` colapsa el rol (super/director = todo; profesor =
  sus permisos) y oculta lo que no puede: botones "Nuevo…" (ArbolCurso),
  Publicar/Archivar/Duplicar (PanelNodo) y los grupos quiz/recursos/actividades
  (PanelContenidoTema). Ocultar ⇒ el borrador no cambia ese campo ⇒ el guardado
  no lo toca; las reglas lo protegen igual.
- **Storage** (`storage.rules`): un profesor solo sube/reemplaza/borra archivos
  con `editarContenido` **y** `administrarRecursos` (el director con plan y el
  super mantienen su acceso).
- **Anti-escalación** (reglas): un profesor NO puede editar sus propios
  `permisosEditor` (la regla del dueño lo prohíbe con `affectedKeys`); un
  director BASE no concede permisos (plan); nadie escribe cursos/temas de otra
  academia (`esStaffDe` fija la academia, así que un `cursosPermitidos`
  manipulado con cursos ajenos no da acceso).
- **Pruebas**: 12 puras (`tests/permisosEditor.test.mjs`) + casos de emulador
  añadidos a `tests/rules/contenido.rules.test.mjs` (conceder/retirar,
  auto-escalación, campos finos, `crearTemas`) y a
  `tests/rules/storage.rules.test.mjs` (`administrarRecursos`).

## Limitación conocida (Fase 6)

La rejilla por campo del tema (rules) compara el doc guardado con el enviado.
En el **primer** guardado de un tema recién clonado (aún no normalizado) por un
profesor de permisos limitados, un campo podría verse "cambiado" por el mero
re-normalizado y exigir el permiso correspondiente: es *fail-closed* (seguro) y
se resuelve concediendo el permiso o guardando ese tema una vez como director.
