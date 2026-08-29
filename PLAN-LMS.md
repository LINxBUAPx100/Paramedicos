# PLAN-LMS — Auditoría y planeación: PTEM como LMS multiacademia

> **EL CALENDARIO YA NO VIVE AQUÍ.** Desde el 29 de agosto de 2026 la hoja de
> ruta única es **`docs/PLAN-TECNICO-FASES.md`**: existía un segundo plan de 7
> fases técnicas (con las 3 primeras ya construidas) que este documento
> desconocía, y los dos se pisaban en la clase en vivo, en el peso del bundle y
> en los certificados. Este archivo conserva el **detalle** —arquitectura,
> modelos de datos, reglas, decisiones y su porqué—; el orden de trabajo se
> consulta allí.
>
> Correspondencias tras la unificación: la **Fase 13** de aquí es el trabajo
> **A**; la **14**, el **B**; la **15**, el **D**; la **16 quedó absorbida** por
> el trabajo **C** (clase en vivo), que ya tenía un modelo de datos mejor
> decidido —se descartan `sesionesEscena` y `recorridos`—; y la **Fase 8**
> (certificados) quedó absorbida por el trabajo **H** (certificados con QR).
>
> **AMPLIACIÓN VIGENTE: 2026-08-29 — ver §21-§33 al final del documento.**
> Incluye el diagnóstico del incidente que dejó la web sin actualizarse (§33):
> el push de imágenes optimizadas sí subió, lo que falló fue CI, y como el
> despliegue depende del test, la web se congeló sin avisar.
> Ahí están el estado real medido del temario (que corrige `CLAUDE.md` §0), las
> dieciséis decisiones del dueño del producto y las Fases 13-16: calidad
> editorial v2, Mi Botiquín, entrenador de farmacología y simulador de escenas.
>
> Fecha: 2026-07-15 · Estado: auditoría completa · Fases 1-4 + permisos
> editoriales (roadmap Fase 6) + CABLEADO DEL RESOLUTOR (roadmap Fase 4) +
> REPLICACIÓN (roadmap Fase 9, pedida como "Fase 7") implementadas
> (pendiente: correr la suite de reglas con el emulador — ver
> docs/MIGRACION-CONTENIDO.md). La Fase 3 entregada es el EDITOR ESTRUCTURAL
> (se adelantó respecto del roadmap original).
> Regla de trabajo: **una fase por entrega**; nada se implementa fuera de la fase activa.

---

## 1. Auditoría de la arquitectura actual

**Stack:** Vite 5 + React 18 + React Router 6 (HashRouter, base relativa) + Firebase 12
(Auth + Firestore, plan **Spark**, sin Cloud Functions) + GitHub Pages + CSS puro con
variables y temas. El SDK de Firebase se carga con **import dinámico** (AuthContext /
ProgressContext) para mantener la entrada en ~76 KB gzip. No hay TypeScript ni pruebas.

**Forma general:** SPA con shell (`Layout`) + páginas lazy. El contenido académico
(8 fases · 68 temas · 374 preguntas · 457 flashcards) vive **hardcodeado en
`src/data/` (~892 KB)** y viaja en chunks del bundle; Firestore solo guarda lo
operativo (usuarios, academias, grupos, progreso, intentos, solicitudes, códigos,
reportes, configuración). La multiacademia actual es **operativa, no de contenido**:
todas las academias ven el MISMO temario, filtrado por visibilidad de grupo.

**Fortalezas a preservar:**
- Import dinámico de Firebase y páginas lazy (rendimiento medido y documentado).
- Modelo "id estable + campo `orden`" en los datos, elegido explícitamente para
  que la migración a Firestore sea directa (`src/data/registro.js`, README de data).
- `navIndice.js` **generado** (script `gen:nav`): índice ligero para el shell sin
  cargar contenido pesado — el mismo patrón sirve para el índice por academia.
- Reglas de Firestore ya orientadas a aislamiento (`esAdminDe`, `esStaffDe`,
  `affectedKeys().hasOnly`), endurecidas en la auditoría de seguridad previa.
- Un solo componente por rol compartido (`PanelAcademia` con prop `gestion`).

## 2. Mapa de rutas (App.jsx)

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Home | Pública |
| `/cuenta` | Cuenta | Pública (login/registro/códigos) |
| `/fase/:faseId`, `/fase/:faseId/examen` | FasePage, ExamenFasePage | RutaProtegida |
| `/tema/:temaId`, `/tema/:temaId/quiz` | TemaPage, QuizPage | RutaProtegida |
| `/examen`, `/flashcards(/:temaId)`, `/atlas`, `/progreso`, `/buscar` | páginas de estudio | RutaProtegida |
| `/temario` | TemarioPage (visibilidad por grupo) | RutaProtegida + valida staff dentro |
| `/panel` | PanelPage (director/profesor) | RutaProtegida + valida staff dentro |
| `/admin`, `/admin/academia/:id` | AdminPage, AcademiaAdminPage | RutaProtegida + valida superadmin dentro |

`RutaProtegida` solo valida "puede acceder al contenido" (sesión + academia activa /
prueba vigente); la distinción de rol la hace cada página. Las URLs `/fase/:id` y
`/tema/:id` son la identidad pública del contenido → **deben sobrevivir la migración**.

## 3. Mapa de componentes

- **Shell:** Layout (nav lateral desde `fasesNav` + `useVisibilidad`), RutaProtegida,
  ErrorBoundary, Icon, marca/*.
- **Contenido:** Contenido (render de bloques por `tipo`: p/lista/tabla/callout/
  diagrama/imagen), Recursos, Actividades, Quiz, Imagen, FasesCarrusel, Reveal, Contador.
- **Paneles:** PanelAcademia (compartido director/superadmin vía prop `gestion`;
  exporta ETIQUETA_ROL y CodigosPrueba), PersonalizacionAcademia (compartido),
  AdminPlataforma (FacturacionAcademias + AnuncioGlobal, solo superadmin),
  CompartirCodigo.
- **Páginas:** ver mapa de rutas; TemarioPage es a la vez temario y herramienta de
  visibilidad del staff.

## 4. Mapa de colecciones Firestore (actuales)

| Colección | Doc ID | Campos clave | Escribe | Lee |
|---|---|---|---|---|
| `academias` | = código (AEP-2026) | nombre, tipo(basico\|avanzado\|medicina), plan(texto: periodicidad), estado, logo, lema, colorHero, fechaRenovacion, creado | super; director solo logo/lema/colorHero | get: autenticado; list: super |
| `usuarios` | = uid Auth | nombre, email, rol, academiaId, grupoId, estado, esPrueba, pruebaHasta, invitacionUsada, fasesDesbloqueadas[], puedeVerCodigos | dueño (acotado; `rol` solo respaldado por una invitación válida), director (rol/estado/grupoId/puedeVerCodigos), staff (fasesDesbloqueadas), super | dueño, super, staff de su academia |
| `progreso` | = uid | leidos{}, quizzes{}, examenes[], updatedAt (debounce 800 ms) | dueño | dueño, super |
| `intentos` | auto | uid, academiaId, faseId/numero/titulo, aciertos, total, porcentaje, **semilla**, fecha | alumno (create, inmutable) | dueño, super, staff |
| `grupos` | = código GRP-XXXX | academiaId, nombre, estado, fasesOcultas[], temasOcultos[], creadoPor | director/super; staff solo visibilidad | get: autenticado; list: super/staff |
| `codigos` | = código de prueba | academiaId, grupoId, creadoPor, nota, estado, dias, expira | super/director | get: autenticado; list: super/director |
| `invitaciones` | = código INV-ACA-R-XXXX | academiaId, grupoId, **rol**(alumno\|instructor\|admin_escuela), creadoPor, nota, estado, dias, usos, maxUsos, expira, ultimoUso | super/director (crear, estado/nota/maxUsos); el invitado solo `usos+1` | get: autenticado; list: super/director/profesor con puedeVerCodigos |
| `solicitudes` | auto | tipo(modulo\|codigos), uid, academiaId, grupoId, fase*, estado, resueltoPor | dueño (create); staff/director resuelven | dueño, super, staff |
| `reportes` | auto | uid, academiaId, temaId, mensaje, estado | autenticado (create); super | super |
| `configuracion` | anuncio | mensaje, tipo, activo | super | **público** |

## 5. Mapa de reglas de seguridad (resumen)

Helpers: `autenticado, esDueno, miDoc(get propio), esSupremo(correo verificado),
esSuper, academiaActiva, esStaffDe, esAdminDe, canjeValido, grupoValido,
invitacionValida`.

**Cómo se entra a una academia (cuatro vías, ninguna más).** Las tres primeras
meten a la persona SIEMPRE como `alumno`; la cuarta es la única que decide el rol:

1. **Código de academia** (= el id del doc) → solo si NO está en el directorio.
2. **Código de grupo** (= el id del doc) → entra al grupo y a su academia.
3. **Solicitud aceptada** desde el directorio público.
4. **Invitación por rol** (`invitaciones/INV-ACA-R-XXXX`) → academia + grupo
   opcional + **rol**: alumno, profesor o director. Vale incluso si la academia
   está en el directorio (no hay código que adivinar: hay un enlace que el
   director emitió a propósito).

`invitacionValida()` es la ÚNICA puerta por la que el propio usuario puede
cambiar su `rol`, y lo valida entero en el servidor: invitación existente,
activa, vigente, no agotada, rol idéntico al del documento, rol dentro del
catálogo cerrado (`superadmin` jamás), y academia/grupo iguales a los de la
invitación. El contador `usos` lo escribe el invitado, así que `maxUsos` acota
enlaces repartidos de buena fe; contra un actor hostil lo que sostiene es la
caducidad y el «Desactivar», que solo escribe el director.

Ya endurecidas (2026-07-13): sin `list` de academias para no-super, director acotado
con `affectedKeys`, supremo con `email_verified`. Tabla completa por colección en el
informe de la sección 4 (get/list/create/update/delete espejo de la columna
"escribe/lee").

## 6. Contenido hardcodeado (el corazón de la migración)

- `src/data/faseN.js` + `extraFaseN.js` (~750 KB de temario), fusionados por
  `registro.js` → `index.js` (ordena, renumera; caso especial: fase sintética
  `fase-poblaciones` extraída de extraFase5).
- Esquema: **Fase**{id,titulo,subtitulo,color,icono,descripcion,temas[]} →
  **Tema**{id,titulo,icono,duracion,resumen,objetivos[],secciones[{titulo,bloques[]}],
  conceptosClave[],flashcards[],quiz[],recursos,actividades,orden} →
  **Bloque** discriminado por `tipo` (p, lista, tabla, callout, diagrama, imagen).
- Derivados de `index.js` que cualquier reemplazo debe replicar: `fases,
  todosLosTemas, getFase, getTema, getTemaVecinos, preguntasDeFase, todasLasPreguntas,
  todasLasFlashcards, temaPorClaveImagen, stats, buscar`.
- Índice ligero `navIndice.js` (GENERADO) → `fasesNav`, `stats`; lo consumen Layout,
  Home, useVisibilidad, TemarioPage, ExamenPage, ExamenFasePage, PanelAcademia.
- Consumidores de contenido pesado: TemaPage, QuizPage, FasePage, ExamenPage,
  ExamenFasePage, FlashcardsPage, ProgresoPage, BuscarPage, AtlasPage.
- Otros: `imagenes.js` (ATLAS_TEMAS + IMG + imagenesDeTema), `recursosDescarga.js`,
  `temarioOficial.js` (**sin importadores: huérfano**, verificar antes de borrar).

## 7. Riesgos técnicos

1. **Aislamiento de contenido = clonar ~70 docs por academia**; sin transacciones de
   cliente largas ni Functions, una clonación interrumpida deja estado parcial →
   necesita idempotencia y marca `clonacionCompleta`.
2. **`/admin` lee colecciones completas** (`usuarios` + `intentos` sin límite): a
   50 academias × 200 alumnos ≈ 10 000+ docs por apertura; puede agotar la cuota
   Spark (50k lecturas/día). Mitigar con paginación/contadores (fase propia).
3. **Reglas sin validar campos numéricos**: `intentos.create` no valida
   `porcentaje/aciertos/total` → un alumno puede inyectar un 100 % falso.
4. **`configuracion` es legible públicamente entera** (`allow read: if true`).
5. **Búsqueda (`buscar`) y examen general recorren TODO el contenido en memoria**:
   al mover el temario a Firestore hay que decidir índice local (descarga 1 vez +
   caché) o búsqueda por índice pregenerado.
6. **Progreso keyed por `temaId` global** (`progreso/{uid}.leidos[temaId]`): si dos
   academias tienen temas distintos con el mismo id no hay conflicto real (el alumno
   pertenece a UNA academia), pero al cambiar de academia el progreso viejo apunta a
   temas que quizá no existan — definir política (conservar, no mostrar).
7. **Sin Cloud Functions**: clonación/replicación/auditoría corren en el navegador
   del superadmin: hay que tolerar cierres a mitad y reintentos.
8. **HashRouter**: cualquier ancla `href="#…"` rompe la ruta (bug ya corregido en el
   skip-link); el editor no debe usar anclas de fragmento.

## 8. Inconsistencias actuales

- `estado` de academia: `'suspendida'` (AcademiaAdminPage.jsx:76) vs `'suspendido'`
  (AdminPlataforma.jsx:47). Funciona porque todo compara contra `'activo'`, pero hay
  que normalizar al tocar esos flujos.
- El campo **`plan` es periodicidad de facturación** (texto libre "anual"), no plan
  comercial; el nivel de producto real es `tipo`. La Fase 1 introduce
  `planComercial` para no romper facturación.
- `tema.numero` y `fase.numero` escritos a mano se ignoran (los recalcula index.js).
- `temarioOficial.js` sin importadores.
- `eliminarUsuario` deja el registro de Auth huérfano (limitación Spark, documentada).

## 9. Propuesta de modelo de datos (fases 2+)

Principio: **esquema actual de `src/data` copiado a Firestore, por academia**, con un
doc de ESTRUCTURA por curso (barato de leer/reordenar) y un doc por TEMA (contenido).

```
plantillas/{plantillaId}                 ← catálogo GLOBAL (solo superadmin)
  { nombre, tipoDestino, version, estado, estructura:[FaseEstr], actualizado }
plantillasTemas/{plantillaId__temaId}
  { plantillaId, temaId, version, ...contenido del tema (esquema actual) }

cursos/{cursoId}                          ← POR ACADEMIA (top-level + academiaId,
  { academiaId, titulo, estado(borrador|publicado|archivado),   como el resto del repo)
    orden, origen:{plantillaId, version}, estructura:[FaseEstr], actualizado, actualizadoPor }
temas/{cursoId__temaId}
  { academiaId, cursoId, temaId, estado, version, autor, actualizado,
    titulo, resumen, objetivos, secciones, conceptosClave, flashcards, quiz,
    recursos, actividades }               ← ~13 KB promedio, máx observado ~40 KB ≪ 1 MB

FaseEstr = { id, titulo, subtitulo, color, icono, estado,
             modulos:[{ id, titulo, temas:[{ id, titulo, estado }] }] }

historial/{id}   ← auditoría append-only
  { academiaId, usuario, rol, accion, coleccion, docId, antes, despues, fecha, origen }
```

Por qué así:
- **La estructura entera del curso = 1 lectura** (sidebar/carrusel/temario) y
  **reordenar/mover = 1 escritura** (requisito de rendimiento del proyecto).
- Tema = 1 doc = 1 lectura al abrir `/tema/:id` (URLs actuales sobreviven:
  el resolutor busca el tema en la estructura del curso de la academia).
- Colecciones top-level con `academiaId` = mismas reglas y helpers que ya existen
  (`esAdminDe(resource.data.academiaId)`), sin collectionGroup.
- Jerarquía Curso→Fase→Módulo→Tema: el contenido actual migra como 1 curso
  ("Paramédico TUM") cuyas fases contienen 1 módulo implícito cada una; el editor
  PRO puede añadir módulos reales después.
- Storage (recursos binarios, fase de recursos): `academias/{acaId}/…` con reglas de
  Storage por prefijo — mismo aislamiento.

## 10. Matriz de permisos (objetivo)

| Acción | Alumno | Profesor | Prof.+permisos | Director BASE | Director PRO | Superadmin |
|---|---|---|---|---|---|---|
| Leer contenido publicado de SU academia | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ (todas) |
| Progreso/actividades/exámenes propios | ✔ | — | — | — | — | — |
| Ver avance de alumnos | — | ✔ (su grupo) | ✔ | ✔ | ✔ | ✔ |
| Usuarios/grupos/suspender | — | — | — | ✔ | ✔ | ✔ |
| Visibilidad por grupo | — | ✔ | ✔ | ✔ | ✔ | ✔ |
| Editar contenido académico | — | — | ✔ solo cursos y acciones concedidas | — | ✔ | ✔ |
| Publicar/archivar | — | — | ✔ si `publicarContenido` | — | ✔ | ✔ |
| Personalización visual / página de inicio | — | — | — | — (según plan) | ✔ | ✔ |
| Conceder permisos editoriales | — | — | — | — | ✔ | ✔ |
| Plantillas / clonar / replicar / planes / tipos | — | — | — | — | — | ✔ |

Permisos granulares del profesor (doc `usuarios`): `permisosEditor:{ editarContenido,
crearTemas, editarActividades, editarExamenes, publicarContenido,
administrarRecursos, cursosPermitidos:[] }` — los escribe solo el director PRO o el
superadmin; se validan en reglas (campo por campo, patrón `affectedKeys` ya usado).

## 11. Matriz de planes y capacidades

Fuente única: `src/lib/capacidades.js` (Fase 1). Nada de `plan === 'PRO'` disperso.

| Capacidad | BASE | PRO | CURSO |
|---|---|---|---|
| Contenido/funciones actuales (cursos, exámenes, grupos, paneles, analítica) | ✔ | ✔ | ✔ (1 curso) |
| `editorContenido` | — | ✔ | ✔ (su único curso) |
| `personalizacionVisual` | — | ✔ | ✔ |
| `paginaInicioConfigurable` | — | ✔ | ✔ (enfocada) |
| `certificados` | — | ✔ | ✔ (opcional) |
| `historialCambios` | — | ✔ | — |
| `permisosEditoriales` | — | ✔ | — |
| `directorioCapacitadores` | — | — | ✔ (si la academia lo activa) |
| `exportaciones` | — | ✔ | — |
| `multiCurso` / `maxCursos` | ✔ / catálogo fijo | ✔ / ∞ | — / 1 |
| `plantillas` (recibir clonaciones) | ✔ | ✔ | ✔ |

Tipos: `basico` (plantilla oficial básica), `avanzado` (**exige PRO**, contenido
completo + avanzado), `medicina` (organización por convocatoria/institución/examen/
año/fuente; el temario se IMPORTA de versiones oficiales, nunca se inventa).
Excepciones por academia: mapa opcional `academias/{id}.capacidades` (solo
superadmin) que sobreescribe capacidades individuales (p. ej. grandfathering).

## 12. Estrategia de aislamiento

1. Todo doc de contenido lleva `academiaId`; las reglas exigen
   `esAdminDe/esStaffDe(resource.data.academiaId)` para escribir y pertenencia (o
   publicación) para leer. **Nunca dos academias escriben el mismo doc**: las
   plantillas son de solo lectura para academias; cada academia opera su copia.
2. Lectura de alumnos: `estado == 'publicado'` + `academiaId == miDoc().academiaId`.
3. Storage por prefijo `academias/{acaId}/` (cuando lleguen recursos binarios).
4. Pruebas negativas obligatorias (emulador): director de A no lee/escribe cursos de
   B; alumno de A no lee temas de B ni borradores de A; profesor sin permiso no
   escribe aunque conozca el docId.

## 13-15. Plantillas, clonación y replicación

- **Plantillas** (`plantillas` + `plantillasTemas`): las administra solo el
  superadmin. La v1 se GENERA desde `src/data` con un script (`scripts/
  gen-plantilla.mjs` → JSON) y se sube una vez; `src/data` queda como fuente de la
  plantilla oficial hasta completar la migración.
- **Clonación (alta de academia):** el superadmin elige plantilla → se copian
  estructura + temas a `cursos/temas` de la academia (writeBatch en lotes ≤400,
  ~70 escrituras). Idempotente: cada doc destino usa id determinista
  (`cursoId__temaId`); reanudar = re-ejecutar. Al final se marca
  `cursos/{id}.clonacion = {plantillaId, version, completa:true}`.
- **Replicación (actualización manual):** jamás automática. Flujo: (1) **vista
  previa** — se comparan `version` de plantilla vs `origen.version` del curso y el
  flag `modificadoPorAcademia` de cada tema (se marca en cada escritura del editor);
  (2) **detección de conflictos** — tema modificado por la academia + cambiado en la
  plantilla = conflicto listado, default "conservar el de la academia";
  (3) **respaldo** — los temas que se van a sobrescribir se copian a
  `respaldos/{acaId}__{temaId}__{ts}` antes de escribir; (4) **registro** en
  `historial`. Sin sobrescrituras silenciosas: los conflictos requieren decisión
  explícita por elemento.

## 16. Plan de migración (datos existentes)

- Fase 1 no migra nada: `planComercial` ausente ⇒ se interpreta como legacy
  (**pro**, conserva todo lo que hoy tienen); el superadmin fija el plan real de
  cada academia desde Facturación cuando quiera.
- Contenido: el resolutor de contenido (fase 3 del roadmap) intenta Firestore
  (`cursos` de la academia) y **cae al bundle `src/data`** si la academia no tiene
  cursos clonados ⇒ ninguna academia pierde acceso durante la transición.
- Progreso/intentos/calificaciones: **no se tocan** (keyed por uid/temaId/faseId,
  que se preservan en la clonación de la plantilla oficial).

## 17. Plan de reversión

- Fase 1: quitar el gate de UI y la cláusula de plan en la regla de personalización;
  el campo `planComercial` extra es inerte. Sin pérdida de datos.
- Contenido: mientras exista el fallback al bundle, revertir = desactivar el
  resolutor (flag) y la app vuelve al comportamiento actual.
- Replicación: restaurar desde `respaldos` (cada sobrescritura tiene copia previa).
- Reglas: cada fase guarda su `firestore.rules` anterior en git (ya versionado).

## 18. Plan de pruebas

- **Unitarias (sin Firebase):** módulos puros (`capacidades.js`, resolutor,
  diff de replicación) con `node --test` (`npm test`), ya que el proyecto no tenía
  pruebas. Sin dependencias nuevas.
- **Reglas:** Firebase Emulator + `@firebase/rules-unit-testing` (requiere Java);
  suite de pruebas NEGATIVAS por rol (sección 12.4). Se añade en la Fase 2, que es
  cuando las reglas de contenido existen.
- **Manuales por fase:** criterios de aceptación por fase, con cuentas test-* por
  rol (rotar sus contraseñas — están comprometidas).

## 19. Impacto estimado en costos Firebase (Spark: 50k lecturas, 20k escrituras/día)

| Operación | Costo aproximado |
|---|---|
| Abrir la app (alumno) | 3 listeners de doc + 1 get progreso ≈ 4-6 lecturas |
| Abrir un tema (Firestore) | 1 lectura (doc tema) + estructura cacheada |
| Estructura del curso | 1 lectura por sesión (doc curso), cacheable en memoria |
| Clonar academia | ~70 lecturas + ~70 escrituras (una vez por academia) |
| Replicar plantilla | lecturas = temas comparados; escrituras = solo aceptados + respaldos |
| Examen general / búsqueda | descarga de temas del curso 1 vez + caché (68 lecturas peor caso) → considerar doc índice pregenerado |
| `/admin` actual (riesgo) | usuarios+intentos completos SIN límite — pendiente paginación/contadores (fase propia) |

Duplicación de datos: la única copia deliberada es plantilla→academia (razón:
aislamiento no negociable, documentada aquí). No se duplica nada más.

## 20. Roadmap por fases

| Fase | Contenido | Toca |
|---|---|---|
| **1 (esta)** | `planComercial` + tipos + capacidades centralizadas + gates iniciales | capacidades.js, AuthContext, AdminPage, AdminPlataforma, AcademiaAdminPage, PanelPage, admin.js, plataforma.js, firestore.rules, tests |
| **2** | Aislamiento de contenido: colecciones `plantillas/cursos/temas`, script gen-plantilla desde src/data, clonación batched, reglas + pruebas cruzadas A/B con emulador | modelo de datos, scripts, firestore.rules |
| **3 (hecha)** | Editor de ESTRUCTURA (curso/fase/módulo/tema: crear, mover, ordenar, duplicar, archivar, publicar; sin eliminación destructiva) — adelantada | UI editor + reglas |
| **4 (hecha)** | Cableado del resolutor a las páginas de estudio (Firestore por academia con fallback al bundle, ya construido en F2) + caché; conserva URLs `/fase/:id`, `/tema/:id` | index.js "virtual", páginas de estudio |
| **5** | Editor de TEMAS (bloques, quiz, flashcards, actividades) + borradores/vista previa | UI editor |
| **6** | Permisos editoriales granulares del profesor | usuarios, reglas |
| **7 (hecha)** | Página de inicio por SECCIONES configurables (hero, cursos, progreso, stats, anuncios, convocatorias, capacitadores) | Home + config por academia |
| **8** | Certificados digitales | plantilla + verificación |
| **9 (hecha, pedida como "Fase 7")** | Replicación con vista previa/conflictos/respaldo/historial + plantillas versionadas | scripts + UI superadmin |
| **10** | Plan CURSO (modo mono-curso) + directorio de capacitadores | capacidades + Home |
| **11** | Auditoría (`historial` append-only) + paginación y contadores de `/admin` + validar campos numéricos de `intentos` | reglas + admin |
| **12** | Tipo MEDICINA: convocatorias e importación de versiones oficiales | modelo por convocatoria |
| **13-16** | **Ampliación del 2026-08-29** (calidad editorial v2 + carga por tema · Mi Botiquín · entrenador de farmacología · simulador de escenas). Se ANTEPONEN a las fases 5, 8, 10, 11 y 12 por decisión del dueño — ver §21-§32 | generador de contenido, páginas nuevas, `capacidades.js`, reglas |

Cada fase de implementación incluirá: problema que resuelve, archivos y colecciones
afectados, riesgos, pruebas y reversión (formato de esta planeación).

---

# FASE 1 — Planes, tipos y sistema centralizado de capacidades

## Cambios enumerados (antes de tocar código)

1. **Nuevo módulo puro `src/lib/capacidades.js`** — única fuente de verdad:
   `PLANES` (base|pro|curso), `TIPOS` (basico|avanzado|medicina), etiquetas,
   `planEfectivo(academia)`, `capacidadesDe(academia)` (con overrides
   `academia.capacidades`), `validarPlanTipo(plan, tipo)`.
2. **Nuevo campo `academias.planComercial`** (`base|pro|curso`). El campo `plan`
   existente NO se toca (es periodicidad de facturación; se re-etiqueta en la UI).
3. **AuthContext** expone `planComercial` y `capacidades` de la academia del usuario.
4. **Alta de academia** (AdminPage → NuevaAcademia + admin.js `crearAcademia`):
   select de plan comercial, validación tipo avanzado ⇒ PRO.
5. **Facturación** (AdminPlataforma + plataforma.js): columna/edición de plan
   comercial (select) y de tipo, separadas de la periodicidad; misma validación.
6. **AcademiaAdminPage**: cabecera muestra plan/tipo con etiquetas legibles.
7. **Primer gate real por capacidad**: `PersonalizacionAcademia` solo se muestra al
   director si `capacidades.personalizacionVisual` (superadmin la ve siempre), y la
   REGLA de Firestore que permite al director editar logo/lema/colorHero exige plan
   efectivo pro|curso (seguridad de servidor, no solo UI).
8. **Pruebas** `tests/capacidades.test.mjs` con `node --test` + script `npm test`.

## Riesgos

- **Academias existentes sin `planComercial`**: si el default fuera `base` perderían
  la personalización que HOY tienen (rompería compatibilidad). Mitigación: legacy ⇒
  plan efectivo **pro** (en capacidades.js Y en la regla con `get('planComercial',
  'pro')`); el superadmin asigna el plan real después desde Facturación.
- **Regla de personalización**: si la cláusula de plan quedara mal, bloquearía a
  directores legítimos → cubierta por el default 'pro' y probada en emulador cuando
  llegue la suite de reglas (Fase 2); mientras, la UI muestra el error de permisos.
- **Dispersión de condiciones**: mitigada por lint manual (grep) — ningún
  `planComercial ===` fuera de capacidades.js y los selects de admin.

## Valores predeterminados para academias existentes

- `planComercial` ausente → **plan efectivo 'pro'** (conservan todo). Sin escrituras
  de migración (cero costo, cero riesgo); el doc se completa cuando el superadmin
  edita el plan en Facturación.
- `tipo` ausente → se sigue tratando como 'basico' (comportamiento actual).
- `tipo === 'avanzado'` → plan efectivo forzado a 'pro' (requisito del producto).

## Criterios de aceptación

1. `npm test` pasa (derivación de planes, overrides, validación avanzado⇒pro).
2. `npm run build` pasa; ningún `planComercial ===` fuera de capacidades.js/admin UI.
3. Crear academia tipo avanzado con plan base es imposible (el select lo fuerza y
   `crearAcademia` lo rechaza).
4. Academia sin campo `planComercial`: su director sigue viendo y guardando la
   personalización (verificable hoy).
5. Academia con `planComercial: 'base'`: su director NO ve el editor de
   personalización y una escritura manual a Firestore es rechazada por las reglas
   (pendiente de verificación en emulador; la regla queda publicada con la fase).
6. El superadmin ve y edita plan/tipo desde Facturación con etiquetas claras.

## Decisiones pendientes (para el dueño del producto)

- ¿El plan CURSO tiene editor de contenido sobre su único curso? (Asumido: sí,
  limitado a 1 curso; ajustable en capacidades.js sin tocar componentes.)
- Precio/nombres comerciales de los planes (solo etiquetas).
- Si `historialCambios` aplica también a CURSO (asumido: no).

---

# FASE 2 — Aislamiento de contenido por academia y plantillas

Alcance: **modelo de datos, migración, reglas, scripts de clonación, pruebas y
protección cruzada**. NO se construye la interfaz visual del editor (eso es Fase 4-5);
las operaciones se entregan como funciones de librería + pruebas.

## Modelo de datos implementado

Colecciones **top-level** (mismo patrón que el resto del repo: doc con `academiaId`,
reglas con `esAdminDe(resource.data.academiaId)`, sin collectionGroup):

```
plantillas/{plantillaId}                      GLOBAL · solo super-admin escribe
  { id, nombre, tipoDestino(basico|avanzado|medicina), version, estado,
    estructura:[FaseEstr], actualizado }
plantillasTemas/{plantillaId__temaId}         GLOBAL
  { plantillaId, temaId, ...contenido del tema, estado }

cursos/{academiaId__plantillaId}              POR ACADEMIA
  { academiaId, plantillaId, titulo, tipoDestino, estado(borrador|publicado|archivado),
    orden, plantillaOrigenId, versionOrigen, estructura:[FaseEstr],
    clonacion:{plantillaId,version,completa,fecha}, actualizado, actualizadoPor }
temas/{academiaId__plantillaId__temaId}       POR ACADEMIA
  { academiaId, cursoId, temaId, version, autor, estado, actualizado,
    titulo, resumen, objetivos, secciones, conceptosClave, flashcards, quiz,
    recursos, actividades }

historial/{auto}     append-only  { academiaId, usuario, rol, accion, coleccion,
                                     docId, antes, despues, fecha, origen }
respaldos/{auto}     solo super  (usado por la replicación en Fase 9)

FaseEstr = { id, titulo, subtitulo, descripcion, color, icono, estado,
             modulos:[{ id, titulo, implicito?, temas:[{ id, titulo, estado }] }] }

academias/{id}.contenido = { estado(legacy|migrando|migrado|error),
                             plantillaId, version, actualizado, detalle? }
  ← estado de MIGRACIÓN de la academia; solo lo escribe el super-admin
    (el director sigue acotado a logo/lema/colorHero por affectedKeys).
```

Decisiones clave:
- **IDs deterministas** (`contenidoModelo.js`): `cursoId = ${academiaId}__${plantillaId}`,
  tema doc = `${cursoId}__${temaId}`. Esto hace la **clonación idempotente** (reejecutar
  = reescribir los mismos docs, nunca duplica) y **garantiza aislamiento por namespace**:
  ningún doc de la academia A puede colisionar con uno de B.
- **Jerarquía Curso→Fase→Módulo→Tema** desde ya: cada fase migra con **un módulo
  implícito** (`principal`), para que el editor (Fase 4) no exija re-migrar. El resolutor
  (Fase 3) aplanará los módulos implícitos y conservará las URLs `/fase/:id`, `/tema/:id`.
- **Estructura ligera en el doc del curso** (solo ids/títulos/estado) = leer el temario
  o reordenar = **1 lectura / 1 escritura**. El contenido pesado vive 1 doc por tema.
- Las **plantillas son de solo lectura** para las academias; cada academia opera SU copia.
  Nunca dos academias escriben el mismo doc (requisito no negociable).

## Cambios enumerados (archivos)

Nuevos:
- `src/lib/contenidoModelo.js` — módulo PURO (sin Firebase/React): ids deterministas,
  `clonProfundo()`, `lotes()`, `estructuraDesdeFases()`, `contenidoTema()`,
  `plantillaDesdeData()`, `cursoDesdePlantilla()`, `docsClonadosParaAcademia()`.
- `src/lib/contenidoApi.js` — módulo PURO de la capa de acceso: estados de migración
  (`estadoContenido`, `academiaMigrada`), `ensamblarFases()` (borradores/faltantes) y
  `construirApi()` (reconstruye la MISMA interfaz que `src/data/index.js`).
- `src/lib/firebase/plantillas.js` — `importarPlantillaOficial()` (seed del catálogo
  global desde `src/data`), `listarPlantillas`, `obtenerPlantilla`, `temasDePlantilla`.
- `src/lib/firebase/contenido.js` — `clonarPlantillaAAcademia()` (idempotente, batched,
  estados migrando→migrado|error, marca `clonacion.completa`), `verificarClonacion()`,
  `cursosDeAcademia`, `obtenerCurso`, `temaDeCurso`, `temasDeCurso`, `estructuraDeCurso`,
  `registrarHistorial()` y el RESOLUTOR `contenidoDeAcademia()` (única puerta al
  contenido: Firestore si 'migrado', si no fallback al bundle; caché por academia).
- `scripts/gen-plantilla.mjs` — genera/inspecciona la plantilla oficial desde `src/data`.
- `scripts/migrar-contenido.mjs` — CLI de migración: DRY-RUN por defecto, `--apply`,
  `--seed`, `--academia=ID`, `--verificar`, `--produccion`; muestra el proyecto objetivo,
  detecta parciales y reanuda; usa `firebase-admin` (devDependency, fuera del bundle).
- `firebase.json`, `firestore.indexes.json` — config de emulador/deploy + índices
  compuestos `cursos(academiaId,estado)` y `temas(cursoId,estado)`.
- `tests/contenido.test.mjs` — pruebas PURAS (Node): integridad de migración,
  determinismo/aislamiento de ids, chunking.
- `tests/contenidoApi.test.mjs` — pruebas PURAS: estados de migración, equivalencia de la
  API reconstruida vs `src/data`, borradores/faltantes, independencia real de las copias
  (mutar A no toca la plantilla ni a B).
- `tests/rules/contenido.rules.test.mjs` — suite del emulador (aislamiento cruzado A/B);
  **lista para correr** con Java + emulador (`npm run test:rules`); sin emulador se
  OMITE con el motivo (no ejecutable en este entorno).
- `docs/MIGRACION-CONTENIDO.md` — procedimiento de migración, verificación y rollback.

Modificados:
- `firestore.rules` — helpers `perteneceA`, `academiaEditaContenido`,
  `profesorPuedeEditar`; reglas de las 6 colecciones nuevas (`plantillas`,
  `plantillasTemas`, `cursos`, `temas`, `historial`, `respaldos`).
- `package.json` — scripts `gen:plantilla`, `migrar`, `test:rules`; devDependencies
  `firebase-admin` y `@firebase/rules-unit-testing`; `test` ya cubre las puras.

## Migración

- **No migra datos de alumnos** (usuarios/progreso/intentos/calificaciones intactos):
  la clonación reutiliza los mismos `temaId`/`faseId`, que son las llaves del progreso.
- **Seed** (`importarPlantillaOficial`, una vez, por el super-admin): copia el temario de
  `src/data` a `plantillas/paramedico-tum` + `plantillasTemas/*` (68 temas). Reproducible
  y verificable en Node con `gen:plantilla`.
- **Clonación por academia** (`clonarPlantillaAAcademia`): al dar de alta una academia o
  manualmente; copia estructura + temas al namespace de la academia. Los cambios globales
  **no se propagan solos** (la replicación con vista previa/respaldo es Fase 9).
- **Fallback**: mientras una academia no tenga curso clonado, el resolutor (Fase 3) sirve
  el bundle `src/data` → ninguna academia pierde acceso durante la transición.

## Riesgos

1. **Clonación interrumpida** (sin transacción larga en Spark) → estado parcial.
   Mitigado por ids deterministas (reejecutar completa) + flag `clonacion.completa`.
2. **Fuga de borradores al alumno** si una lista trae temas no publicados. Mitigado:
   la regla exige `estado=='publicado'` por doc para el alumno; la lectura publicada usa
   el índice `temas(cursoId,estado)` o gets por id desde la estructura.
3. **Coste de `get()` en reglas** para el plan de la academia: solo se evalúa en escritura
   del director (no en lecturas de alumno) → impacto acotado.
4. **Tamaño de doc de tema** < 1 MB de Firestore: la prueba asegura el máximo < 900 KB.
5. **No pude ejecutar la suite de reglas** (sin Java/emulador aquí): queda lista y
   documentada; el usuario la corre antes de publicar.

## Valores predeterminados

- Academias existentes: **sin cambios** hasta que el super-admin siembre la plantilla y
  clone (opt-in). Sin curso clonado ⇒ fallback al bundle (comportamiento actual).
- `estado` de curso/tema recién clonado = `publicado` (el temario oficial ya es público);
  el editor futuro creará en `borrador`.
- `academiaEditaContenido` en reglas = plan `pro|curso` (base no edita); legacy sin
  `planComercial` ⇒ `pro` (espejo de capacidades.js). El super-admin siempre puede.

## Criterios de aceptación

1. `npm test` pasa, incluidas las pruebas de Fase 2: la plantilla generada tiene
   exactamente `stats.temas` (68) temas y `stats.fases` (8) fases; todos los doc-id de
   tema son únicos y con prefijo de la plantilla; ningún campo derivado (faseId/numero)
   se filtra al contenido; tamaño de tema < 900 KB.
2. Determinismo/aislamiento: `cursoIdDe('A','p') ≠ cursoIdDe('B','p')`; clonar la misma
   plantilla a A y a B produce conjuntos de doc-id **disjuntos** (prueba automatizada).
3. `node scripts/gen-plantilla.mjs` produce la plantilla oficial sin error.
4. `npm run build` pasa (las libs nuevas no engordan la entrada: son import dinámico).
5. Reglas (verificación del usuario con emulador, suite provista): un director/alumno de
   A no lee ni escribe `cursos`/`temas` de B; un alumno no lee borradores de su propia
   academia; un director BASE no puede crear/editar cursos; el super-admin sí en cualquiera.

## Decisiones pendientes (Fase 2)

- ¿La clonación al **alta de academia** es automática (elegir plantilla en el alta) o
  siempre manual? Implementado como función; el disparador de UI se decide al conectar
  la Fase 3/alta (no es editor). Asumido: manual desde /admin por ahora.
- Nombre e id de la plantilla oficial (`paramedico-tum`): ajustable en una constante.
- ¿Una academia podrá tener **varios** cursos de la misma plantilla? Hoy el id
  determinista asume uno por (academia, plantilla); multi-curso libre llega en Fase 4.

---

# FASE 3 — Editor estructural de contenido (implementada)

Alcance entregado: administración de la jerarquía Curso→Fase→Módulo→Tema sobre
la COPIA de la academia (modelo Fase 2), con permisos, estados, versiones,
duplicación, archivado lógico, vista previa y reglas. SIN editor enriquecido
del contenido interno de temas (Fase 5), sin permisos granulares completos
(fase de permisos editoriales) y sin replicación.

Arquitectura y decisiones: **docs/EDITOR-CONTENIDO.md** (fuente de verdad).

## Archivos

Nuevos:
- `src/lib/editorModelo.js` — operaciones PURAS de estructura + permisos + cursos.
- `src/lib/firebase/editor.js` — capa de datos transaccional (versión optimista,
  `ConflictoVersion`, historial, doble destino academia/plantilla).
- `src/pages/EditorPage.jsx` — rutas `/editor`, `/editor/:academiaId` (super),
  `/editor/plantilla/:plantillaId` (super, banda de advertencia).
- `src/components/editor/` — `ArbolCurso`, `PanelNodo`, `DialogoConfirmar`,
  `VistaPrevia`.
- `tests/editorModelo.test.mjs` (22 pruebas puras).
- `docs/EDITOR-CONTENIDO.md`.

Modificados:
- `src/lib/contenidoApi.js` — `ensamblarFases` ahora filtra también MÓDULOS no
  publicados (la rama archivada no llega al alumno).
- `firestore.rules` — `edicionContenidoValida()` (versión estrictamente +1,
  metadatos `academiaId/cursoId/temaId/plantilla*/clonacion/creadoPor/creadoEn`
  intocables, estados del catálogo) y `creacionContenidoValida()` (firma
  `creadoPor == uid`, versión 1) para editores no-super en `cursos` y `temas`.
- `tests/rules/contenido.rules.test.mjs` — casos de versión/autoría/metadatos.
- `src/App.jsx`, `src/pages/PanelPage.jsx`, `src/pages/AcademiaAdminPage.jsx`,
  `src/components/Icon.jsx`, `src/index.css` — rutas, accesos e iconos/estilos.

## Riesgos y reversión

- Reglas de Fase 3 NO desplegadas ni verificadas en emulador (sin Java aquí);
  la suite está lista (`npm run test:rules`). Desplegar reglas ANTES de usar el
  editor en producción (sin ellas, las escrituras del editor fallarían para
  directores por las reglas actuales… que es el comportamiento seguro).
- Reversión: el editor es aditivo. Quitar las 3 rutas de App.jsx y los dos
  accesos (PanelPage/AcademiaAdminPage) lo desactiva por completo; los datos
  escritos son compatibles con el modelo Fase 2 (campos extra inertes).
- La academia legacy sigue intacta: el editor se bloquea si
  `academias/{id}.contenido.estado != 'migrado'`.

## Criterios de aceptación (estado)

- Director PRO: crear/editar/ordenar/mover/duplicar/archivar/restaurar/
  publicar/despublicar cursos, fases, módulos y temas, con teclado — ✔ (UI +
  datos + reglas; reglas pendientes de emulador).
- Director BASE / alumno / profesor sin permisos: bloqueados en UI, capa de
  datos y reglas — ✔ (pruebas puras + suite de reglas lista).
- A no toca a B; plantilla intacta salvo modo plantilla explícito — ✔.
- Legacy funciona; progreso/intentos/calificaciones sin tocar; src/data
  intacto — ✔. `npm test` (56) y `npm run build` — ✔.

---

# FASE 4 — Contenido enriquecido, actividades, recursos y exámenes (implementada)

Alcance: edición del CONTENIDO interno del tema (bloques de texto, imágenes,
videos, enlaces, archivos descargables, actividades, quiz/exámenes con
ponderaciones), Storage aislado por academia y endurecimiento de intentos.
Mismos esquemas que renderizan los componentes del alumno ⇒ compatibilidad
total (probada contra los 68 temas reales).

## Archivos

Nuevos:
- `src/lib/temaContenidoModelo.js` — PURO: catálogo de bloques (p, h3, lista,
  pasos, tabla, callout, formula, imagen, diagrama, fuentes), validaciones de
  quiz (correcta índice|arreglo, `peso` NUEVO aditivo), recursos (`archivos`
  NUEVO aditivo), actividades (ordenar/completar/preguntas), URLs solo
  http(s), `calcularCalificacion` PONDERADA (sin pesos ≡ cálculo actual),
  `normalizarContenido`, duplicación independiente, tope de doc < 900 KB.
- `src/lib/archivosModelo.js` — PURO: allowlist de extensiones/MIME (pdf,
  png, jpg, webp, gif, mp3, mp4, webm — NUNCA ejecutables), tamaños por
  categoría (8-50 MB), `nombreSeguro`, `rutaArchivoAcademia`
  (academias/{id}/{archivos|imagenes}/…), `rutaEsDeAcademia` (sin '..'),
  `rutaDesdeUrlStorage` y `validarReferenciasStorage` (el contenido no puede
  referenciar Storage de otra academia).
- `storage.rules` — NUEVO: todo bajo `academias/{acaId}/**`; leer = miembros
  de esa academia o super; subir/borrar = editores (consulta Firestore para
  rol/plan/permisosEditor); allowlist de contentType y ≤ 50 MB; el resto del
  bucket cerrado. NO desplegadas.
- `src/lib/firebase/almacen.js` — subida validada (ruta canónica, nunca la
  del cliente) con progreso; borrado acotado al prefijo propio.
- `src/components/editor/PanelContenidoTema.jsx` — editor por grupos
  plegables: secciones/bloques (crear, editar, reordenar, duplicar, quitar),
  objetivos, conceptos, flashcards, quiz con ponderaciones, recursos con
  subida de archivos/imágenes, actividades. Borrador local + Guardar único.
- `src/components/editor/VistaPreviaTema.jsx` — vista previa del tema con los
  componentes REALES del alumno (Contenido/Recursos/Actividades/Quiz sin
  onComplete y sin módulos de progreso ⇒ imposible registrar nada).
- `tests/temaContenido.test.mjs` — 20 pruebas puras (incluye compatibilidad
  del corpus completo y equivalencia de calificación sin pesos).
- `tests/rules/storage.rules.test.mjs` — 6 pruebas de emulador (aislamiento
  A/B, roles, allowlist, carpetas, borrado).

Modificados:
- `firestore.rules` — `intentos.create` valida total>0(≤500), 0≤aciertos≤total,
  0≤porcentaje≤100 y consistencia con redondeo ±1 ⇒ el resultado de un examen
  no se falsea desde el cliente (update/delete ya eran solo super).
- `src/lib/firebase/editor.js` — `guardarContenidoTema()` transaccional
  (versión +1, valida contenido y referencias de Storage, historial).
- `src/pages/EditorPage.jsx` — monta el panel de contenido al seleccionar un
  tema; dirty-tracking por panel; guardado con conflicto→recarga del doc.
- `src/components/Recursos.jsx` — render ADITIVO de `recursos.archivos`
  ("Material descargable"); los temas sin ese campo no cambian.
- `firebase.json` (storage + emulador :9199), `package.json`
  (`test:rules` = firestore,storage), `src/index.css` (estilos ct-*),
  `tests/rules/contenido.rules.test.mjs` (caso intentos).

## Decisiones

- El EXAMEN de fase sigue derivándose del quiz de sus temas (modelo actual):
  editar preguntas/ponderaciones del quiz ES editar el examen. La relación
  tema→actividades→examen se conserva (conceptosClave alimenta "unir";
  quiz alimenta examen). `calcularCalificacion` queda lista para las páginas
  del alumno cuando se conecten al resolutor (fase de conexión).
- `peso` y `archivos` son ADITIVOS: ningún dato existente cambia; sin peso ⇒
  1; el cálculo sin pesos reproduce exactamente aciertos/total actual.
- Sin subida de archivos en modo plantilla (los archivos pertenecen a una
  academia); las plantillas usan URLs.
- Storage NO confía en rutas del cliente: la ruta se reconstruye
  (`rutaArchivoAcademia`) y las reglas exigen el prefijo de la academia.

## Riesgos y pendientes

- Reglas (Firestore + Storage) escritas y probadas en suite, NO ejecutadas
  aquí (sin Java): correr `npm run test:rules` antes de desplegar.
- El límite fino por categoría (8/15/20/50 MB) es del cliente; la regla
  impone 50 MB duro para todo (documentado).
- Doc de tema publicado bajo padre archivado: limitación conocida de F3.

## Criterios de aceptación (verificados)

- 76 pruebas puras pasan (20 nuevas), build pasa, el editor de contenido
  monta y opera (verificado en navegador: grupos, dirty, ponderaciones,
  vista previa con quiz/descargables/actividades, Escape).
- Los 68 temas reales validan sin cambios; intentos legítimos pasan la regla
  nueva y los inflados no (suite de emulador lista).

---

# FASE 4 DEL ROADMAP — Conexión del resolutor a las páginas de estudio (implementada)

> Nota de numeración: es la **Fase 4 del roadmap** (sección 20), entregada
> después de la Fase 6 porque el editor y los permisos se adelantaron. Con
> esta entrega la app COMPLETA sirve el contenido por academia.

Alcance: los componentes dejan de importar `src/data` directamente; TODO el
contenido académico de la UI pasa por el resolutor de la Fase 2
(`contenidoDeAcademia`: Firestore si la academia está `migrado`, bundle legacy
si no, con fallback automático). Las URLs `/fase/:id` y `/tema/:id` no cambian.
NO agrega funciones nuevas de producto ni toca reglas de seguridad (no hay
lecturas nuevas que no estuvieran ya permitidas).

## Arquitectura

Dos niveles de consumo, ambos por `src/context/ContenidoContext.jsx` (nuevo):

1. **Índice ligero** (`useIndiceContenido` / `useIndiceAcademia(id)`): misma
   forma que `src/data/navIndice.js`. Arranca con el bundle (0 lecturas) y, si
   la academia del usuario está `migrado`, se sustituye por SU estructura
   (**1 lectura**: el doc del curso, vía `indiceDeAcademia`). Lo consume el
   shell: Layout, Home, useVisibilidad, TemarioPage y PanelAcademia (estos dos
   con `useIndiceAcademia`, porque el superadmin gestiona academias ajenas).
2. **Contenido completo** (`useContenido`): la API entera de
   `src/data/index.js` reconstruida por el resolutor. Se carga **bajo demanda**
   (solo al entrar a una página de estudio): el visitante anónimo y el alumno
   legacy no pagan lecturas de Firestore; el alumno migrado descarga los temas
   de su curso UNA vez por sesión (caché en memoria del resolutor). Páginas
   cableadas: TemaPage, QuizPage, FasePage, ExamenPage, ExamenFasePage,
   FlashcardsPage, ProgresoPage, BuscarPage, AtlasPage.

La numeración y el filtrado de publicados son idénticos en ambos niveles
(`indiceDesdeEstructura` ≡ `ensamblarFases`+`construirApi`, probado): nav y
contenido no pueden desalinearse. Si el contenido completo de una academia
migrada termina cayendo a legacy (clonación parcial, permisos), el índice del
shell vuelve al bundle en el mismo acto (consistencia de fuente).

## Archivos

Nuevos:
- `src/context/ContenidoContext.jsx` — provider + `useContenido`,
  `useIndiceContenido`, `useIndiceAcademia`, `CargandoContenido`,
  `ErrorContenido` (reintento). Reset automático al cambiar la fuente
  (login/logout, cambio de academia, fin de clonación en vivo).
- `tests/indiceContenido.test.mjs` — 5 pruebas puras (equivalencia con
  navIndice.js generado, filtrado/renumeración, consistencia API↔estructura,
  entradas vacías).

Modificados:
- `src/lib/contenidoApi.js` — `indiceDesdeEstructura`, `indiceDesdeFases`
  (puros).
- `src/lib/firebase/contenido.js` — `indiceDeAcademia` (+ caché propia),
  `indicePorAcademiaId` (superadmin), el API de Firestore adjunta su `indice`,
  `limpiarCacheContenido` limpia ambas cachés.
- `src/lib/firebase/editor.js` — reordenar cursos también invalida la caché
  (el resolutor sirve el primer curso publicado).
- `src/main.jsx` — monta `ContenidoProvider` (dentro de Auth, fuera de
  Progress).
- Shell: `src/components/Layout.jsx`, `src/pages/Home.jsx`,
  `src/lib/useVisibilidad.js` (mapa tema→fase derivado del índice),
  `src/pages/TemarioPage.jsx`, `src/components/PanelAcademia.jsx`
  (fases de la academia GESTIONADA — su avance/visibilidad se alinean con el
  contenido que ven sus alumnos).
- Páginas de estudio (9): sustituyen `import ... from '../data/index.js'` por
  `useContenido()` + estado de carga; FlashcardsPage con puerta de montaje
  (su mazo se baraja al montar).

## Costos y rendimiento

- Entrada del bundle: 80.2 → 82.0 KB gzip (+1.8: contexto + helpers puros).
  El chunk de datos (641 KB) sigue fuera y solo lo descargan legacy/anónimos
  al entrar a una página de estudio (igual que antes).
- Alumno de academia migrada: 1 lectura (índice) al abrir la app + descarga
  del curso completo (~70 lecturas) UNA vez por sesión al entrar a estudiar.
  Documentado en §19; el doc índice pregenerado sigue como optimización futura.
- Home/landing para anónimos: 0 lecturas (bundle), sin cambios.

## Riesgos y reversión

- La caché es EN MEMORIA: un refresh vuelve a leer (~70 lecturas por sesión
  de alumno migrado). Aceptado en §19; optimizable con persistencia después.
- Stats del hero (preguntas/flashcards) para academia migrada salen del bundle
  hasta que se carga el contenido completo (la estructura sola no las conoce);
  se corrigen solas al cargar. Cosmético.
- Los materiales legacy (`recursosDescarga.js`, atlas `imagenes.js`) siguen
  keyed por temaId global: temas clonados los conservan; temas nuevos de una
  academia no los tienen (sus recursos van por `recursos.archivos`, Fase 4-doc).
- Reversión: quitar `ContenidoProvider` de main.jsx y restaurar los imports
  directos de `src/data` en las páginas (los módulos de datos no cambiaron).
  Ninguna academia legacy cambia de comportamiento mientras no se marque
  `migrado`.

## Criterios de aceptación (estado)

- `npm test`: 93 pruebas (+5) — ✔. `npm run build` — ✔ (+1.8 KB gzip entrada).
- Home anónima renderiza con el índice del bundle y consola limpia; ruta de
  tema sin sesión redirige a /cuenta — ✔ (verificado en navegador).
- Academia legacy: mismas lecturas y mismo contenido que antes (resolutor →
  bundle) — ✔ (equivalencia probada en pruebas puras de F2 + F4).
- Academia migrada: nav, temario, panel y páginas de estudio sirven SU copia,
  incluida la verificación manual con una academia clonada — pendiente de
  verificación del usuario en producción/emulador (requiere datos clonados).

---

# FASE 6 — Permisos editoriales granulares del profesor (implementada)

> Nota de numeración: es la **Fase 6 del roadmap** (sección 20). Las entregas
> previas se rotularon FASE 1-4 en este documento porque el editor estructural
> se adelantó; el contenido enriquecido (roadmap Fase 5) se entregó como FASE 4.

Alcance: matriz CENTRALIZADA de permisos del profesor, validada en las cuatro
capas, con auditoría. NO agrega funciones académicas: solo gobierna quién puede
qué. No toca personalización, certificados ni replicación.

## Modelo

`usuarios/{uid}.permisosEditor = { editarContenido, crearTemas,
editarActividades, editarExamenes, publicarContenido, administrarRecursos,
cursosPermitidos:[cursoId] }`. Fuente única: **`src/lib/capacidades.js`** para
la capacidad de PLAN (`permisosEditoriales`, solo PRO) y
**`src/lib/permisosEditor.js`** para la matriz por profesor (normalización,
validación, capacidades por rol, permiso por acción y por campo). Sin
`editarContenido` no hay acceso; los cursos ajenos quedan fuera por `esStaffDe`.

## Cambios (archivos)

Nuevos:
- `src/lib/permisosEditor.js` — módulo PURO: matriz, `normalizarPermisos`,
  `validarPermisos`, `capacidadesEditor`, `permisoDeAccion`/`permisoAccionEditor`,
  `permisosRequeridosPorContenido` (tolerante al vacío).
- `src/components/PermisosEditoriales.jsx` — panel del director (por profesor:
  6 permisos + cursos; conceder/retirar).
- `tests/permisosEditor.test.mjs` — 12 pruebas puras.

Modificados:
- `src/lib/editorModelo.js` — `permisoEdicion` usa `normalizarPermisos`.
- `src/lib/firebase/usuarios.js` — `asignarPermisosEditor` (valida + audita en
  `historial`) e `historialPermisos`.
- `src/lib/firebase/editor.js` — `exigirPermiso(…, accion)` (permiso fino por
  acción) + rejilla por campo en `guardarContenidoTema` (transacción).
- `src/pages/EditorPage.jsx`, `PanelNodo.jsx`, `ArbolCurso.jsx`,
  `PanelContenidoTema.jsx` — ocultan/deshabilitan lo que el profesor no puede
  (crear, publicar/archivar, duplicar, grupos quiz/recursos/actividades).
- `src/components/PanelAcademia.jsx`, `src/index.css` — monta la sección de
  permisos (director PRO / super) + estilos.
- `firestore.rules` — `academiaPlanEfectivo`/`academiaOtorgaPermisos`,
  `profesorPuedeEditar` con permisos finos, `camposTemaSegunPermisos`,
  `cursoSegunPermisos`, regla del director para `permisosEditor`, y el DUEÑO ya
  no puede tocar su propio `permisosEditor` (anti-escalación).
- `storage.rules` — subir/borrar exige `administrarRecursos` al profesor.
- `tests/rules/contenido.rules.test.mjs`, `tests/rules/storage.rules.test.mjs`
  — casos de escalación y de permisos finos.

## Validación en 4 capas

1. **React**: `capacidadesEditor` oculta controles sin permiso.
2. **Datos**: `permisoEdicion` + `permisoAccionEditor` + diff por campo.
3. **Firestore Rules**: `profesorPuedeEditar` + `camposTemaSegunPermisos` +
   regla del director + dueño protegido.
4. **Storage Rules**: `administrarRecursos` para archivos.

## Escalaciones probadas (todas se niegan)

Profesor editando sus propios permisos; profesor en otro curso; profesor en
otra academia; director BASE concediendo permisos; alumno escribiendo
contenido; petición manual (las reglas son la barrera). Auditoría: cada
asignación/revocación queda en `historial` (append-only).

## Riesgos y reversión

- Reglas (Firestore + Storage) escritas y con suite lista; NO ejecutadas aquí
  (sin Java/emulador). Desplegarlas ANTES de usar la gestión de permisos.
- *Fail-closed* documentado: el primer guardado de un tema clonado no
  normalizado por un profesor limitado puede exigir un permiso por el
  re-normalizado (seguro; se resuelve concediendo el permiso o guardando una
  vez como director).
- Reversión: aditiva. Quitar la sección de PanelAcademia y la regla del
  director desactiva la gestión; `permisosEditor` ausente ⇒ profesor sin acceso
  (comportamiento previo).

## Criterios de aceptación (estado)

- `npm test` (88, +12) y `npm run build` — ✔.
- Director PRO concede/retira por profesor y curso; BASE no ve la sección — ✔
  (UI + datos + reglas; reglas pendientes de emulador).
- Profesor limitado no crea/publica/edita exámenes/recursos que no tiene, ni
  edita sus propios permisos, ni toca otra academia — ✔ (puro + suite de reglas).

---

# FASE 7 (pedida) = ROADMAP FASE 9 — Plantillas versionadas, clonación y replicación (implementada)

> Nota de numeración: el dueño del producto la pidió como "Fase 7"; en el
> roadmap original (sección 20) es la Fase 9. Documentación operativa completa:
> **docs/REPLICACION-CONTENIDO.md** y **docs/ROLLBACK-REPLICACION.md**.

Alcance: sistema EXCLUSIVO del super-admin para administrar plantillas
globales versionadas e inmutables, clonarlas y replicarlas a varias academias
con dry-run obligatorio, detección de cambios locales, estrategias de
conflicto (default conservar_local), respaldo previo verificado, aplicación
idempotente/reanudable acotada, rollback y auditoría. SIN propagación
automática; copias siempre independientes; progreso/intentos/calificaciones
estructuralmente intocables.

## Archivos

Nuevos:
- `src/lib/plantillasModelo.js` (PURO) — estados borrador|publicada|archivada,
  publicada INMUTABLE (`prepararNuevaVersion`), `snapshotDeVersion` (hash +
  conteos + `versionId` de un solo campo — sin índices compuestos),
  `cambiosEntreVersiones`, `plantillaDesdeCurso` (limpia rastros de la academia
  y BLOQUEA referencias privadas de Storage).
- `src/lib/replicacionModelo.js` (PURO) — huella determinista (FNV-1a doble
  sobre JSON estable), clasificación de cambios (7 clases), 4 estrategias,
  `planParaAcademia` (lotes ≤20, respaldos, sello de origen, clonación si el
  curso no existe), `verificarRespaldo`, `planDeRollback` (conserva lo editado
  después salvo `forzar`), máquina de estados (aplicando NO re-entra),
  `fraseConfirmacion`, `COLECCIONES_PERMITIDAS`.
- `src/lib/firebase/replicacion.js` — capa de datos del super-admin (plantillas
  + versiones + operaciones; MAX_DESTINOS_CLIENTE=5 desde el navegador).
- `scripts/replicar-contenido.mjs` (`npm run replicar`) — backend seguro con
  firebase-admin para replicaciones masivas y rollback (dry-run por defecto,
  `--apply`, `--confirmar="FRASE"`, `--reanudar`, `--rollback`).
- `src/pages/ReplicacionPage.jsx` — `/admin/replicacion` (lazy): pestañas
  Plantillas · Clonar y replicar (wizard con dry-run) · Historial y rollback;
  accesible (teclado, aria-live, diálogos con Escape, confirmación por frase).
- `tests/replicacion.test.mjs` (25) y `tests/plantillas.test.mjs` (10).
- `docs/REPLICACION-CONTENIDO.md`, `docs/ROLLBACK-REPLICACION.md`.

Modificados:
- `firestore.rules` — `plantillasVersiones(+Temas)` solo super e INMUTABLES
  (`update: false`); `replicaciones` solo super; la `estructura` de una
  plantilla publicada no se toca ni siendo super; `origen`/`replicacion`
  añadidos a los metadatos intocables de cursos/temas. SIN desplegar.
- `src/lib/firebase/contenido.js` y `scripts/migrar-contenido.mjs` — la
  clonación sella cada tema con `origen{plantillaId, version, hash}`.
- `src/lib/firebase/editor.js` — el editor rechaza plantillas publicadas.
- `src/App.jsx`, `src/pages/AdminPage.jsx`, `src/index.css` (estilos rp-*),
  `package.json` (script `replicar`),
  `tests/rules/contenido.rules.test.mjs` (4 casos F7).

## Colecciones nuevas

`plantillasVersiones/{plantillaId__vN}`, `plantillasVersionesTemas/{…__temaId}`
(snapshots inmutables), `replicaciones/{id}` (operación/auditoría),
`respaldos/{bk-<rep>__<col>__<doc>}` (id determinista: reanudar no pisa el
snapshot original; ya existía la colección con reglas solo-super).

## Detección de cambios locales (sin depender de updatedAt)

Sello `origen.hash` = huella del contenido tal como la academia lo recibió,
inmutable para editores. hashLocal≠sello ⇒ modificado local; hashOrigen≠sello
⇒ cambió la plantilla; ambos ⇒ conflicto. Clones previos al sello: cualquier
divergencia = conflicto (conservador). `solo_local` (creado por la academia) y
`archivado_local` no se tocan con ninguna estrategia automática.

## Riesgos y decisiones

- Sin Cloud Functions (Spark): lo masivo va por script privado con service
  account (patrón ya existente); la UI aplica ≤5 destinos. Variante Functions
  (Blaze) documentada sin desplegar.
- Reglas escritas y con suite lista; NO ejecutadas aquí (sin Java) ni
  desplegadas. Desplegar ANTES de usar la fase en producción.
- Respaldos sin depuración automática (retención manual documentada).
- Reversión de la fase: aditiva — quitar la ruta/acceso y las colecciones
  nuevas quedan inertes; el sello `origen` en temas es inofensivo.

## Criterios de aceptación (estado)

- Plantillas versionadas e inmutables; clonación/replicación multi-academia
  con dry-run OBLIGATORIO, conservar_local por defecto, respaldo verificado,
  idempotencia/reanudación, rollback con detección de cambios posteriores,
  bloqueo de no autorizados y auditoría — ✔ (modelo puro probado + reglas +
  UI; reglas y flujo E2E pendientes de emulador/producción).
- `npm test` (130) y `npm run build` — ✔. Nada se ejecutó sobre producción.

---

# FASE 7 DEL ROADMAP — Página de inicio por secciones configurables (implementada)

Alcance: el director con plan que incluye `paginaInicioConfigurable`
(PRO/CURSO — fuente única `capacidades.js`, primer consumidor real de esa
capacidad) decide qué secciones del Home ven los miembros de SU academia y en
qué orden. Sin configuración (visitantes, academias legacy o BASE) el Home es
EXACTAMENTE el de siempre — verificado en navegador. No incluye anuncios,
convocatorias ni capacitadores: esas secciones llegan con sus fases (F10/F12)
y se suman al catálogo con una entrada + un render.

## Modelo

`academias/{id}.homeSecciones = [{ id, visible }]` (orden = orden de render;
`null`/ausente = default). Catálogo en **`src/lib/homeModelo.js`** (PURO):
`hero` (portada PTEM), `progreso`, `fases` (carrusel), `prueba`, `atlas`,
`flashcards`. Normalización *fail-open*: ids desconocidos/duplicados se
descartan, `visible` solo oculta con `false` explícito, y las secciones que
falten se AÑADEN visibles al final (una sección nueva del catálogo aparece
sola en configuraciones viejas; un dato corrupto jamás deja el Home vacío).
La banda de la academia (logo/lema) y el selector de grupo del profesor NO son
configurables (identidad y función): van tras la portada o, si el director la
ocultó, encabezan la página.

## Archivos

- Nuevo `src/lib/homeModelo.js` + `tests/homeModelo.test.mjs` (8 pruebas).
- `src/pages/Home.jsx` — secciones extraídas a componentes y renderizadas en
  el orden configurado (`idsVisiblesDeHome(academia)`); markup idéntico.
- `src/components/PersonalizacionAcademia.jsx` — editor de secciones
  (checkbox + subir/bajar accesibles) gateado por
  `capacidadesDe(academia).paginaInicioConfigurable`; el default se guarda
  como `null` (el doc no arrastra campo redundante).
- `firestore.rules` — la allowlist del director suma `homeSecciones`
  (lista o null; mismo gate de plan pro|curso ya existente). SIN desplegar.
- `tests/rules/contenido.rules.test.mjs` — caso: director PRO configura la
  suya, BASE no, ajena no, y no abre la puerta a otros campos del doc.
- `src/index.css` — estilos `hs-*`.

## Riesgos y reversión

- Regla sin verificar en emulador (sin Java aquí; caso listo en la suite).
- Fail-open deliberado: la corrupción del campo restaura el default en lugar
  de romper la página pública.
- Reversión: aditiva — restaurar Home.jsx/PersonalizacionAcademia y quitar el
  campo de la allowlist; `homeSecciones` guardado queda inerte.

## Criterios de aceptación (estado)

- Sin configuración, el Home renderiza IGUAL (verificado en navegador:
  hero → fases → prueba → atlas → flashcards, consola limpia) — ✔.
- Director PRO/CURSO oculta y reordena secciones; BASE no ve el editor y la
  regla lo rechaza; el alumno de la academia ve el orden configurado — ✔
  (modelo puro + UI + regla; regla pendiente de emulador).
- `npm test` (138, +8) y `npm run build` (entrada 82.9 KB gzip) — ✔.

---
---

# AMPLIACIÓN 2026-08-29 — Calidad editorial y tres funciones nuevas

> Fecha: 29 de agosto de 2026 · Estado: **planeación aprobada, nada implementado**
> · Origen: petición del dueño del producto (cuatro puntos) + dieciséis
> decisiones tomadas en la sesión de preguntas de ese día.
> Prompts de trabajo: `docs/PROMPTS-AUTORIA-PTEM.md`.
> Sigue vigente la regla del documento: **una fase por entrega**.

## 21. Qué se pidió

Cuatro añadidos al plan vigente:

1. Mejorar la calidad de la información **respetando el formato actual**.
2. Un **entrenador de farmacología** para paramédicos.
3. Un **simulador de escenas** con dos usos: repaso individual y actividad de
   clase creada por la maestra.
4. Un **simulador de botiquín**: qué equipo debe tener el alumno, qué es cada
   pieza y para qué sirve.

Y, como condición de entrega, que la replaneación se escriba aquí.

## 22. Estado real verificado (corrige `CLAUDE.md` §0)

Antes de planear nada se corrió `npm run inventario`. **El mandato de
`CLAUDE.md` §0 está gravemente desactualizado** y cualquier sesión que lo tome
como línea base repetirá trabajo ya hecho:

| Métrica | `CLAUDE.md` §0 (17 ago) | Real (29 ago, medido) |
|---|---:|---:|
| Lecciones con material estudiable | 161 | **268** de 273 |
| Temas vacíos | 107 | **19** |
| Completos / escasos | — | 267 / 1 |
| Borrador | 71 | **178** |
| En revisión | 104 | 104 |
| Bloqueados por decisión | 5 | 5 |
| Pruebas unitarias | 499 | 57 archivos de prueba |

Lo que de verdad falta por redactar son **8 lecciones** (4 patologías, 1
procedimiento, 3 prácticas), más **12 nodos de examen** que no llevan prosa
sino cableado de `alcanceDeExamen`, y los **4 temas de Módulo 7** que siguen
bloqueados por falta de alcance oficial. Reparto: M1 1 · M2 4 · M3 2 · M4 3 ·
M5 4 · M6 2 · M7 4.

**Consecuencia para la planeación:** «contenido primero» ya no significa llenar
huecos. Significa **la pasada de calidad sobre 268 lecciones existentes**, que
es exactamente lo que pidió el dueño («se tomará la estructura actual de cada
tema y se colocará una mejor información»).

**Acción pendiente de autorización:** actualizar `CLAUDE.md` §0 y §3 con estas
cifras. No se tocó ese archivo porque es el mandato y su edición corresponde al
dueño del producto.

## 23. Decisiones del dueño del producto (2026-08-29)

Estas dieciséis decisiones gobiernan todo lo que sigue. Están escritas para que
una sesión futura no vuelva a abrirlas.

| # | Decisión | Consecuencia |
|---|---|---|
| 1 | **Contenido curado, no IA en vivo.** Los prompts son de autoría y se ejecutan fuera de la aplicación. | No hace falta backend ni salir del plan Spark. Ningún texto llega al alumno sin pasar por revisión. |
| 2 | **Las dosis se enseñan con guías internacionales citadas.** | Levanta el bloqueo de farmacología. Ver §23.1: es la única decisión que contradice el mandato vigente. |
| 3 | **Simulador de clase semi-síncrono:** la maestra abre y cierra; dentro, cada alumno resuelve a su ritmo. | Tolera mala conexión y cuesta pocas lecturas. |
| 4 | **Botiquín = catálogo normativo + desbloqueo por progreso.** El dueño entregará la lista de artículos y el mapa de qué desbloquea cada módulo. | El catálogo se escribe como dato, no como código. |
| 5 | **Enriquecer lo existente respetando la estructura actual**, no reescribirla. | El molde v2 usa las secciones que ya tiene cada lección. |
| 6 | **Sin campos nuevos en el esquema del tema.** | Mnemotecnias, errores y repaso se expresan con `tabla`, `callout`, `pasos` y `lista`. Cero migración. |
| 7 | **Escenas de tres orígenes:** lote curado + editor para la maestra + generadas desde el temario, **3 variantes por módulo**. | El modelo de escena lleva campo `origen` y las tres rutas convergen en el mismo esquema. |
| 8 | **Contenido antes que funciones.** | Fase 13 completa antes de empezar la 14. |
| 9 | **Enriquecer fuerte + carga por tema.** | Obliga a partir `planRescate.js` antes de enriquecer nada (§25.2). |
| 10 | **En el simulador solo califica la maestra.** | El sistema muestra el recorrido y el resumen de errores; no propone nota. |
| 11 | **Las escenas son árboles con finales distintos.** | Encarece la redacción; se acota con límites duros (§28.1). |
| 12 | **Botiquín con fotografías reales**, silueta mientras no lleguen. | La ficha nunca se ve rota por falta de imagen. |
| 13 | **Entrenador con ficha propia por fármaco y enlace bidireccional** con los temas del Módulo 4. | El enlace se deriva del catálogo; no se edita ni un tema para conseguirlo. |
| 14 | **El catálogo de fármacos lo entrega el dueño.** | No se elige lista por cuenta propia. |
| 15 | **Las tres funciones son de plan Pro.** | Tres capacidades nuevas en `capacidades.js`. Ver §23.2. |
| 16 | La replaneación se escribe en este documento. | Este bloque. |

### 23.1 Sobre la decisión 2 — autorización expresa para enseñar dosis

Hay que dejarlo por escrito porque **contradice el mandato vigente**. Hoy
`CLAUDE.md` §6 y §11 mantienen `m4-far-dosis-urgencia` y
`m4-far-infusiones-aminas` en `bloqueado_por_decision` hasta que la academia
entregue formulario, presentaciones, concentraciones, equipo y protocolo local.
El dueño del producto, al que se le planteó el conflicto, decidió enseñar las
dosis citando la guía vigente. Esa es su decisión y así se implementa, con
cuatro condiciones que la hacen defendible:

1. **Ninguna dosis sin fuente completa**: documento, edición, año y capítulo,
   tabla, algoritmo o página. Una prueba automática rechaza la ficha que no la
   traiga (§29).
2. **Aviso visible en toda ficha**: la cifra procede de la guía citada, no del
   cuadro básico de su unidad; presentación, concentración, equipo y alcance
   profesional dependen del protocolo del servicio.
3. **Lo que dependa de la unidad sigue sin cifra**: donde la respuesta cambie
   con la presentación o el equipo disponible, se escribe «según protocolo del
   servicio».
4. **El bloqueo se levanta condicionado, no borrado**: los dos temas pasan a
   `borrador` solo cuando cumplan 1 a 3, y siguen sin poder llegar a
   `validado` sin firma docente, como cualquier otro tema.

`CLAUDE.md` §6 y §11 deben actualizarse para reflejar esta autorización; no se
hizo aquí por la misma razón que en §22.

### 23.2 Sobre la decisión 15 — qué pasa con la academia del dueño

Las tres funciones se otorgan solo al plan `pro`. Conviene saber que **eso no
deja fuera a la academia actual**: `capacidadesDe()` interpreta una academia
sin campo `planComercial` como plan efectivo `pro` (Fase 1, mitigación de
compatibilidad). Las academias creadas antes de la Fase 1 las tendrán sin
tocar nada. Una academia creada después con `planComercial: 'base'` no.

## 24. Los cuatro prompts, adaptados

Los prompts de ejemplo no eran usables tal cual: están en primera persona,
asumen una IA que responde en vivo dentro de la aplicación, uno de ellos pide
arquitectura Next.js + TypeScript + Tailwind + Framer Motion (el proyecto es
Vite + React 18 + CSS puro, sin TypeScript), y su volumen fijo multiplicaría
por tres o cuatro un temario que ya pesa 4.26 MB.

Su versión adaptada vive en **`docs/PROMPTS-AUTORIA-PTEM.md`**: prompt A
(lección), B (ficha de fármaco), C (escena) y D (artículo del botiquín). La
mitad de ingeniería del prompt de botiquín no se convirtió en prompt: está
resuelta en §26 con el stack real.

---

# FASE 13 — Calidad editorial v2 y carga de contenido por tema

Cierra el punto 1 de la petición. **Es la fase más larga y va primero**
(decisión 8).

## 25.1 El molde v2, con los bloques que ya existen

Ninguna lección cambia de forma: se le añaden piezas dentro de las secciones
que ya tiene. El contrato mínimo de `CLAUDE.md` §8 sigue siendo el suelo; esto
es el techo al que se sube.

| Pieza pedagógica pedida | Cómo se representa hoy, sin tocar el esquema |
|---|---|
| Progresión de lo simple a lo avanzado | orden de `secciones` |
| Anatomía → fisiología → patología → clínica | moldes por tipo de tema (`CLAUDE.md` §7) |
| Términos complejos en lenguaje accesible | `conceptosClave` + glosario ya existente (`TextoGlosario`) |
| Tabla comparativa | bloque `tabla` |
| Diagrama de flujo / algoritmo | bloque `pasos` (o `diagrama` con activo del catálogo) |
| Mnemotecnia | `callout` variante `clave`, título «Regla mnemotécnica» |
| Alto rendimiento | `callout` variante `clave`, título «Lo que más se pregunta» |
| Errores frecuentes de estudio | sección propia con `callout` variante `alerta` |
| Resumen de una página | sección «Repaso rápido» (`lista` o `tabla`) |
| Datos imprescindibles antes del examen | viñetas dentro de «Repaso rápido», máximo 12 |
| Preguntas de evaluación oral | sección «Preguntas de repaso oral», bloque `lista` |
| Banco de preguntas | `quiz` (4-6) + `actividades.preguntas` |
| Fuentes | bloque `fuentes`, ya obligatorio |

**Topes por lección** (para que la mejora no se pague en rendimiento): ~35 KB
por tema, máximo 2 tablas, 3 mnemotecnias, 12 viñetas de repaso, 10 preguntas
orales, 6 preguntas de quiz, 10 flashcards.

## 25.2 El problema de peso, y por qué se resuelve ANTES de enriquecer

Medido hoy: `src/data/planRescate.js` pesa **4.26 MB** y `src/data/contenido/`
**4.0 MB**. `planRescate.js` es un solo archivo generado que contiene los 287
temas enteros. No está en el bundle de entrada —`src/lib/firebase/contenido.js`
lo carga con `import()` dinámico— pero sí es **un único trozo de 4.26 MB que se
descarga completo la primera vez que un alumno abre cualquier tema** en una
academia que no tenga copia en Firestore. Aplicarle el molde v2 lo llevaría a
12-16 MB. Eso no se puede entregar a un alumno con datos móviles.

Por eso la fase empieza por la infraestructura:

1. **Partir el generador.** `scripts/gen-plan-rescate.mjs` deja de emitir un
   archivo y emite:
   - `src/data/planRescate.js` — solo **estructura y metadatos** (módulos,
     unidades, ids, títulos oficial y visible, icono, duración, resumen,
     estado editorial, orden). Debe quedar en el orden de las decenas de KB.
   - `src/data/planRescate/m1.js … m7.js` — el contenido pesado (secciones,
     conceptos, flashcards, quiz, actividades), un archivo por módulo.
   - `src/data/indiceBusqueda.js` — índice ligero pregenerado, para que
     `BuscarPage` no necesite el corpus entero en memoria.
   - `src/data/bancoPreguntas/mN.js` — preguntas por módulo, para que los
     exámenes no arrastren la prosa.
2. **`src/data/index.js`** conserva su API síncrona para todo lo estructural y
   gana `getTemaCompleto(temaId)` asíncrono, que resuelve al módulo y hace
   `import()` de su archivo. La forma ya encaja: `ContenidoContext` distingue
   desde la Fase 4 entre índice ligero y contenido completo bajo demanda.
3. **Consumidores a ajustar:** `TemaPage`, `QuizPage`, `FlashcardsPage`,
   `ExamenPage`, `ExamenModuloPage`, `ExamenUnidadPage`, `BuscarPage`,
   `ProgresoPage`, `Landing.jsx` (usa `getTema` en import dinámico) y
   `src/lib/firebase/contenido.js` (rama `legacy`).
4. **Guardarraíl:** prueba nueva que falla si un archivo de módulo supera el
   tope acordado, y `generadoAlDia.test.mjs` extendido a los archivos nuevos.

Solo cuando esto pase `npm test` y `npm run build` empieza el enriquecimiento.

## 25.3 Orden de trabajo editorial

1. **Lote 0 — cerrar lo que falta**: las 8 lecciones pendientes (4 patologías,
   1 procedimiento, 3 prácticas) y el cableado de `alcanceDeExamen` de los 12
   nodos de examen. M7 sigue bloqueado.
2. **Lotes por módulo**, uno por entrega, con el prompt A: M3 y M5 primero (vía
   aérea, soporte vital, trauma: el material de más riesgo y el que alimenta
   las escenas), luego M4, M6, M2, M1.
3. Cada lote conserva el estado editorial que tenga el tema. **Nada sube a
   `validado`** sin docente.
4. Cada lote termina con `npm run gen:plan`, `npm run gen:nav`, `npm test`,
   `npm run build` y `npm run inventario`, y con el reporte de qué cambió.

---

# FASE 14 — Mi Botiquín

Cierra el punto 4. Es la función más barata y la que menos depende del temario:
la lista la entrega el dueño.

## 26.1 Modelo de datos

El catálogo es **contenido curado en el repositorio**, no datos de Firestore:
es el mismo para todas las academias y así viaja con las mismas garantías de
revisión que el temario.

```js
// src/data/botiquin/catalogo.js
{
  id: 'torniquete-cat',
  nombre: 'Torniquete de aplicación rápida',
  compartimento: 'circulatorio',   // catálogo cerrado, ver abajo
  categoria: 'dispositivo',        // dispositivo|insumo|medicamento|equipo|proteccion
  dotacion: {                      // lo que la norma exija, si aplica
    tipoUnidad: ['sva', 'svb'],
    cantidadMinima: 2,
    fuente: { documento, edicion, anio, tabla },
  },
  paraQueSirve: '…',
  cuandoSeUsa: ['…'],
  cuandoNo: ['…'],
  comoSeRevisa: ['…'],             // checklist de turno
  erroresFrecuentes: ['…'],
  seConfundeCon: ['…'],
  caducidad: 'no_aplica' | 'revisar_fecha' | 'esteril_sellado',
  temaId: 'm5-hem-torniquete',     // la lección que lo enseña
  desbloqueaCon: { moduloId: 'm5', temaId: 'm5-hem-torniquete' },
  foto: null,                      // null ⇒ la interfaz pinta la silueta
  fuentes: [ … ],
  estadoEditorial: 'borrador',
}
```

**Compartimentos** (catálogo cerrado, agrupan la pantalla): vía aérea ·
circulatorio y hemorragias · inmovilización · curación · medicamentos ·
monitoreo · protección personal · otros.

## 26.2 Lógica de desbloqueo

Tres estados por artículo, **derivados en el cliente, sin una sola lectura ni
escritura nueva en Firestore**:

- **«En tu botiquín»** — el alumno ya tiene visible el módulo de
  `desbloqueaCon` y leído su tema (`progreso/{uid}.leidos`, ya cargado).
- **«Próximo a desbloquear»** — pertenece al siguiente módulo visible.
- **«Bloqueado»** — se muestra la silueta y el nombre del módulo que lo abre,
  nunca la ficha. Ver qué falta es parte de la motivación; leer la ficha
  antes de tiempo, no.

La visibilidad de módulos ya la resuelve `src/lib/avanceAlumno.js`
(`modulosOcultos` del grupo + `modulosDesbloqueados` del alumno). El botiquín
se limita a leer ese estado: **no inventa una segunda noción de progreso.**

## 26.3 Interfaz

- Ruta nueva `/botiquin`, dentro de `RutaProtegida`, con gate de capacidad.
- La pantalla se agrupa por compartimento, no por módulo: así se parece al
  botiquín real. Dentro de cada compartimento, los artículos desbloqueados
  primero.
- Al tocar un artículo desbloqueado se abre su ficha completa, con enlace a la
  lección que lo enseña. Al tocar uno bloqueado, solo el nombre del módulo que
  lo abre.
- **Sin librería de animación nueva.** El proyecto usa CSS puro con variables
  y ya tiene sus transiciones; el momento de desbloqueo se marca con la misma
  gramática visual de `/logros`, no con una dependencia añadida.
- Fotografías en `public/imagenes/botiquin/{id}.webp`, con su crédito en el
  mismo sistema que el catálogo de activos médicos (`/creditos`). Mientras no
  exista foto, silueta por compartimento. **Añadir una foto no toca código.**

## 26.4 Lo que hace falta del dueño

1. La lista de artículos del botiquín, por compartimento.
2. Qué módulo desbloquea cada uno.
3. El tipo de unidad de la academia (para la columna de dotación normativa).
4. Las fotografías, cuando las tenga.

---

# FASE 15 — Entrenador de farmacología

Cierra el punto 2. **No arranca hasta tener el catálogo de fármacos del dueño**
(decisión 14).

## 27.1 Modelo de datos

```js
// src/data/farmacos/catalogo.js
{
  id: 'adrenalina',
  nombre: 'Adrenalina (epinefrina)',
  familia: 'simpaticomimetico',
  presentaciones: [{ concentracion: '1 mg/mL', envase: 'ampolleta 1 mL' }],
  mecanismo: '…',
  indicaciones: ['…'],
  contraindicaciones: { absolutas: ['…'], relativas: ['…'] },
  vias: ['IV', 'IO', 'IM', 'IN'],
  dosis: [{
    indicacion, poblacion, via, dosis, maximo, frecuencia,
    fuente: { documento, edicion, anio, capitulo, pagina, url },  // OBLIGATORIA
  }],
  adversos: ['…'],
  interacciones: ['…'],
  farmacocinetica: { inicio, pico, duracion },
  comparaCon: ['amiodarona'],
  mnemotecnia: '…',
  altoRendimiento: ['…'],
  temasRelacionados: ['m4-far-…'],   // enlace bidireccional
  preguntas: [ … ],                  // 8-12, esquema de quiz existente
  escenarios: [ … ],                 // 5-8 decisiones clínicas breves
  repaso: ['…'],                     // hoja de una pantalla
  estadoEditorial: 'borrador',
}
```

**Regla dura, consecuencia directa de la decisión 2:** una entrada de `dosis`
sin `fuente` completa **no compila** — la prueba de §29 falla. No es una
recomendación de estilo, es el guardarraíl que hace defendible enseñar dosis.

## 27.2 El enlace bidireccional, sin tocar el esquema del tema

De la ficha al tema, con `temasRelacionados`. Del tema a la ficha, **derivando
el índice inverso** (`temaId → fármacos`) en tiempo de generación: `TemaPage`
pinta una tira «Fármacos de este tema» al pie. Ninguna lección se edita para
conseguirlo, y por tanto no se rompe ninguna regla de `CLAUDE.md` §8.

## 27.3 Modos de estudio

Reutilizan piezas que ya existen, no se construyen desde cero:

- **Ficha** — la referencia completa.
- **Tarjetas** — sobre `src/lib/baraja.js`, el mismo motor de `/flashcards`.
- **Dosis relámpago** — contrarreloj sobre las entradas de `dosis`, con la
  fuente visible en la corrección. Cada respuesta muestra el aviso de
  protocolo local.
- **Casos** — los `escenarios` de la ficha, con el componente `Quiz` actual.

Ruta `/farmacos` y `/farmacos/:id`, en `RutaProtegida`, con gate de capacidad.

## 27.4 Aviso permanente

Toda pantalla que muestre una cifra lleva el aviso de §23.1 punto 2. No es un
banner descartable: es parte de la ficha.

---

# FASE 16 — Simulador de escenas

Cierra el punto 3. Va al final porque es la que más depende de que el temario
esté enriquecido: una escena solo puede exigir lo que sus temas ya enseñan y
citan.

## 28.1 Modelo de la escena

```js
// src/data/escenas/mN-*.js
{
  id: 'esc-m5-motociclista',
  titulo: 'Motociclista contra poste, avenida principal',
  moduloId: 'm5',
  temasRequeridos: ['m5-cin-…', 'm5-hem-…'],
  nivel: 'intermedio',
  origen: 'curado' | 'academia' | 'generado',
  estadoEditorial: 'borrador',
  despacho: { hora, ubicacion, texto },
  paciente: { edad, sexo, motivo },
  nodos: {
    inicio: {
      texto: '…',
      assetId: null,
      signos: { fc, fr, ta, spo2, glasgow, temp },   // visibles si el alumno evalúa
      opciones: [{
        texto: '…',
        juicio: 'correcta' | 'aceptable' | 'incorrecta',
        critica: false,          // true = error que compromete al paciente
        retro: 'Por qué sí o por qué no…',
        siguiente: 'nodo-2',
      }],
    },
  },
  finales: {
    'fin-optimo': { texto, veredicto: 'optimo' | 'aceptable' | 'deficiente' },
  },
  fuentes: [ … ],
}
```

**Límites duros** (decisión 11 elegida sabiendo que es la más cara de las tres):
máximo 12 nodos, 3 opciones por nodo, 4 finales y 6 decisiones de profundidad.
Sin esos topes, un árbol con finales distintos se vuelve inescribible y, peor,
irrevisable por un docente.

**Los tres orígenes** (decisión 7) comparten esquema:

- `curado` — lote inicial redactado a mano con el prompt C, anclado a temas ya
  escritos. Arranque previsto: 8 a 10 escenas.
- `generado` — **3 variantes por módulo** producidas por script desde los
  quizzes y actividades existentes (21 en total). Nacen más superficiales
  (≤6 nodos, 2 finales) y **nacen `borrador`**.
- `academia` — creadas por la maestra con el editor de escenas, guardadas en
  Firestore bajo su `academiaId`.

**Regla de uso por estado**, calcada de la que ya gobierna los bancos de
examen: una escena `borrador` sirve para práctica individual si la maestra la
asigna; **una escena solo puede usarse en un evento de clase calificable si
está `validado` o `publicado`**. Una escena generada por script no llega a un
alumno calificado sin que un docente la haya leído.

## 28.2 Uso 1 — repaso individual

El alumno entra a `/simulador`, ve las escenas de los módulos que ya tiene
visibles (mismo criterio de `avanceAlumno.js` que el botiquín) más las que se
le hayan asignado, y resuelve cuando quiera. El resultado se guarda en
`progreso/{uid}.escenas{}` con el mismo debounce de 800 ms que ya usa
`ProgressContext`: **una escritura por escena terminada**, no una por decisión.

## 28.3 Uso 2 — evento de clase

Se monta sobre el libro de calificaciones que **ya existe** (`evaluaciones` +
`calificaciones`, `src/lib/calificacionesModelo.js`, reglas en
`firestore.rules`). No se inventa un segundo mecanismo de notas.

Dos colecciones nuevas:

```
sesionesEscena/{id}
  { academiaId, grupoId, escenaId, escenaTitulo, creadoPor,
    estado: 'abierta' | 'cerrada' | 'cancelada',
    abiertaEn, cerradaEn, evaluacionId | null }

recorridos/{sesionId__uid}          ← id determinista: un recorrido por alumno
  { academiaId, sesionId, uid, nombre,
    ruta: ['inicio', 'nodo-2', …], decisiones: [{ nodoId, opcion, juicio, critica }],
    finalId, veredicto, criticosFallados, aciertos,
    iniciado, terminado, estado: 'en_curso' | 'terminado' | 'sin_efecto' }
```

**Flujo, semi-síncrono (decisión 3):**

1. La maestra elige una escena y un grupo, y **abre** la sesión.
2. Los alumnos del grupo la ven aparecer y entran. Cada uno resuelve a su
   ritmo. Un listener sobre el doc de la sesión (1 lectura + los cambios de
   estado) les cierra la pantalla cuando ella termina.
3. Ella ve el avance en vivo: quién va por dónde, quién terminó, qué errores
   críticos han caído.
4. Tres botones, y solo ella los tiene:
   - **Terminar** → `estado: 'cerrada'`. Los recorridos en curso se congelan
     tal como estén.
   - **Calificar** → crea la `evaluacion` (con su ponderación) y abre la
     tabla de notas del grupo. **El sistema le muestra el recorrido y el
     resumen de cada alumno, pero no propone nota**: la escribe ella
     (decisión 10). Al guardar, entra al libro de calificaciones existente.
   - **Cancelar sin efecto** → `estado: 'cancelada'`, los recorridos se marcan
     `sin_efecto`, no se crea ninguna evaluación y **nada de eso aparece en el
     expediente del alumno ni en su promedio**.

**Reglas de Firestore** (mismos helpers que ya existen):

- `sesionesEscena`: crear y actualizar, `esStaffDe(academiaId)`; borrar, solo
  director o super. Leer: staff de la academia y alumnos que pertenecen a ella.
- `recorridos`: crear y actualizar, **solo el dueño**, y solo si la sesión está
  abierta —`get()` del doc de sesión dentro de la regla, como ya se hace con
  `canjeValido`—; `academiaId`, `sesionId` y `uid` inmutables tras la creación.
  Leer: el dueño y el staff de la academia. Un alumno jamás lee el recorrido
  de otro.
- El staff **no** escribe `recorridos`: si pudiera, la nota dejaría de ser
  trazable al trabajo del alumno.

## 28.4 Limitación honesta

Las escenas curadas y generadas viajan en el bundle, así que un alumno decidido
puede leer las respuestas correctas en el código. Es exactamente la misma
exposición que tienen hoy los quizzes y no se resuelve sin mover el contenido
al servidor. Se documenta, no se disimula; lo que sostiene la evaluación de
clase es que **la nota la pone la maestra viendo el recorrido**, no el marcador
automático. Las escenas creadas por la academia viven en Firestore y no tienen
este problema.

---

# 29. Modelo consolidado, pruebas, costo y reversión

## 29.1 Capacidades nuevas (`src/lib/capacidades.js`)

Tres líneas por plan, y nada más (decisión 15):

| Capacidad | base | pro | curso |
|---|---|---|---|
| `botiquinVirtual` | — | ✔ | — |
| `entrenadorFarmacologia` | — | ✔ | — |
| `simuladorEscenas` | — | ✔ | — |

Academias sin `planComercial` = plan efectivo `pro` ⇒ las reciben (§23.2).

## 29.2 Pruebas nuevas (todas con `node --test`, sin dependencias añadidas)

| Archivo | Qué impide |
|---|---|
| `tests/pesoContenido.test.mjs` | Que un archivo de módulo supere su tope tras el enriquecimiento. |
| `tests/calidadEditorial.test.mjs` | Lección del molde v2 sin sección de fuentes, sin repaso o con una cifra sin cita. |
| `tests/botiquin.test.mjs` | Artículo con compartimento inválido, `temaId` inexistente o `desbloqueaCon` a un módulo que no existe. |
| `tests/farmacos.test.mjs` | **Una dosis sin fuente completa** (edición, año y capítulo o página). Guardarraíl de §23.1. |
| `tests/escenas.test.mjs` | Nodo huérfano, ciclo infinito, camino sin final, opción sin retroalimentación, límites excedidos. |
| `tests/escenaEstado.test.mjs` | Que una escena que no está `validado`/`publicado` alimente un evento calificable. |
| `tests/rules/escenas.rules.test.mjs` | Alumno que escribe el recorrido de otro; alumno que escribe con la sesión cerrada; staff que escribe recorridos; academia que lee sesiones ajenas. |

`generadoAlDia.test.mjs` se extiende a los archivos generados nuevos.

## 29.3 Costo en Firebase Spark (50k lecturas / 20k escrituras al día)

| Operación | Lecturas | Escrituras |
|---|---:|---:|
| Abrir `/botiquin` | 0 (derivado del progreso ya cargado) | 0 |
| Abrir `/farmacos` o una ficha | 0 (catálogo en el bundle) | 0 |
| Escena de repaso individual | 0 | 1 (progreso, con debounce) |
| Sesión de clase, grupo de 30 | ~300 (listener de la maestra + doc de sesión) | ~90 |
| Calificar ese grupo | 30 | 31 |

El recorrido se escribe **al terminar**, más un latido cada tres decisiones
para que la maestra vea avance: por eso 90 escrituras y no 300. Da margen para
decenas de sesiones diarias sin acercarse al tope.

## 29.4 Riesgos

1. **El enriquecimiento degrada el rendimiento** si se hace antes de partir el
   generador. Mitigación: §25.2 es requisito previo, con prueba de peso.
2. **La decisión de dosis expone a la academia** si una cifra queda sin cita.
   Mitigación: `tests/farmacos.test.mjs` y el aviso permanente. Es el riesgo
   que el dueño aceptó a sabiendas.
3. **Las escenas generadas por script serán de calidad despareja.** Mitigación:
   nacen `borrador` y no pueden calificar.
4. **El árbol con finales distintos multiplica el trabajo de redacción.**
   Mitigación: los límites de §28.1; si un lote se atasca, se entregan menos
   escenas mejor hechas, nunca más escenas peores.
5. **Las fotos del botiquín pueden no llegar.** Mitigación: la silueta es el
   estado por defecto, no un error.
6. **Reglas sin verificar en emulador** (no hay Java en la máquina del dueño):
   los casos se escriben y se verifican en CI, como el resto.

## 29.5 Reversión

Las cuatro fases son **aditivas**. Fase 13: el generador vuelve a emitir un
archivo único (una bandera en el script) y las lecciones enriquecidas siguen
siendo válidas en el esquema actual. Fases 14-16: quitar la ruta y la
capacidad; los catálogos quedan inertes en el repositorio. Solo el simulador
crea colecciones nuevas, y borrarlas no toca ni progreso, ni intentos, ni el
libro de calificaciones.

## 30. Roadmap actualizado

> **Superado el 29-08-2026.** Esta tabla se conserva como registro de lo que se
> planeó ese día. El calendario vigente, ya unificado con las 7 fases técnicas
> y con lo terminado tachado, está en `docs/PLAN-TECNICO-FASES.md`.

| Fase | Contenido | Estado |
|---|---|---|
| 5 | Editor de TEMAS (bloques, quiz, flashcards, actividades) | pendiente |
| 8 | Certificados digitales | pendiente |
| 10 | Plan CURSO + directorio de capacitadores | pendiente |
| 11 | Auditoría, paginación de `/admin`, validación de `intentos` | pendiente |
| 12 | Tipo MEDICINA | pendiente |
| **13** | **Calidad editorial v2 + carga por tema** | **siguiente** |
| **14** | **Mi Botiquín** | planeada |
| **15** | **Entrenador de farmacología** | planeada, bloqueada por el catálogo del dueño |
| **16** | **Simulador de escenas** (repaso + evento de clase) | planeada |

Las fases 13 a 16 se anteponen a las 5, 8, 10, 11 y 12 por decisión del dueño.
La 13 es requisito de la 16: una escena no puede exigir lo que su tema no
enseña todavía.

## 31. Lo que hace falta del dueño para empezar

| Para | Hace falta |
|---|---|
| Fase 13 | Nada. Puede empezar ya. |
| Fase 14 | Lista de artículos por compartimento · qué módulo desbloquea cada uno · tipo de unidad de la academia · fotografías (después). |
| Fase 15 | Catálogo de fármacos que enseña la academia · presentaciones y concentraciones que maneja · protocolo local si existe. |
| Fase 16 | Nada para empezar; sí decidir si el editor de escenas para la maestra entra en la misma entrega o en una posterior. |

## 32. Decisiones que siguen abiertas

1. ¿Se autoriza actualizar `CLAUDE.md` §0, §3, §6 y §11 con las cifras reales
   y con la autorización de dosis? Mientras no se haga, cada sesión nueva
   parte de una línea base falsa.
2. ¿El editor de escenas de la maestra entra en la Fase 16 o en una 17?
3. ¿El botiquín incluye el modo «revisión de turno» (recorrer el botiquín
   marcando lo caducado y lo que falta) o se queda en fichas?
4. ¿La maestra puede asignar escenas concretas a alumnos concretos, o solo a
   grupos completos?
5. ¿El resultado de una escena de repaso individual cuenta para `/logros`?
6. ¿Qué pasa con el recorrido de un alumno que no termina antes de que la
   maestra cierre: se califica lo hecho o se marca sin efecto?
7. ¿Las tres funciones nuevas aparecen en el menú lateral del alumno o detrás
   de una sección «Práctica»?


---

# 33. Incidente del 29 de agosto de 2026 — por qué la web dejó de actualizarse

Este bloque documenta un fallo real que costó horas de despliegue y que la
persona que lo provocó no pudo diagnosticar. Se escribe aquí porque su causa
afecta directamente a las Fases 13 y 14.

## 33.1 Qué pasó

El commit `92ba65a` («d») pasó los 180 SVG de `public/imagenes/medical` por un
optimizador externo (SVGO) y los subió a `main`. **El push funcionó**: el
commit quedó en `main`. Lo que falló fue **CI**, y como el workflow encadena
`test → build → deploy`, un test en rojo **bloquea el despliegue entero**. La
web se quedó congelada en la versión anterior sin ningún mensaje visible que
explicara por qué. Vivido desde fuera, parece que «el push falló».

| Ejecución | Commit | Rama | Resultado |
|---|---|---|---|
| 123 | `8f1dd9e` | main | verde (707/707) |
| 126 | `92ba65a` | main | **rojo** — el commit del incidente |
| 127 | `56266a5` | rama de planeación | rojo — heredado del anterior, causa idéntica |

## 33.2 La causa

`src/data/activosMedicos.js` es un catálogo **generado** que registra, entre
otras cosas, el `sha256` de cada archivo servido, y
`tests/activosMedicos.test.mjs` compara ese hash contra el archivo real. Al
optimizar las imágenes sin regenerar el catálogo, los 180 hashes dejaron de
coincidir.

**El test no sobraba: hizo exactamente su trabajo.** Existe para impedir que
una imagen cambie sin que cambie su procedencia, que es lo que sostiene la
página de créditos y el cumplimiento de las licencias CC BY. Lo que faltaba no
era permisividad, era que el optimizado fuera parte del pipeline.

Comprobado sobre los archivos del incidente: las imágenes estaban **bien**.
Conservan `<title>`, `<desc>` y el bloque `@media (prefers-color-scheme: dark)`
—los 23 SVG con tema oscuro siguen siendo 23— y los 180 pasan el validador de
seguridad `svgSeguro.mjs`. El ahorro real fue de 2.8 MB (15 %).

## 33.3 Qué se hizo

1. **`scripts/lib/minificarSvg.mjs`** — el minificado pasa a ser parte del
   pipeline, con una configuración de SVGO deliberadamente conservadora:
   se desactivan `cleanupIds` (las composiciones embeben varios activos en un
   mismo documento y renombrar ids rompería sus `url(#…)`), `removeDesc` (es
   el texto accesible en español) e `inlineStyles` (23 archivos definen ahí su
   paleta clara y su media query de tema oscuro). Medido sobre los originales
   sin optimizar: **19.7 % de ahorro, mejor que el 15 % del incidente**, con
   cero archivos inseguros y sin tocar los bloques `<style>`.
2. **`scripts/importar-activos-medicos.mjs`** — se minifica en los tres puntos
   donde nace un archivo servido (BioIcons, Servier y composiciones), siempre
   **antes** de validar y de calcular el hash: lo que se comprueba y lo que se
   sella es el archivo final. Si falta `svgo`, el importador **aborta** en vez
   de producir bytes distintos a los del catálogo.
3. **`scripts/resellar-activos.mjs`** (`npm run activos:resellar`) — recalcula
   `sha256` y `dimensions` desde los archivos que ya están en `public/`, sin
   red y sin tocar ninguna imagen, autoría, licencia ni procedencia. Rechaza
   cualquier archivo que no pase el saneado estricto: resellar es declarar
   «este archivo es el bueno», y eso no se puede decir de un SVG con script.

Con eso, `npm test` vuelve a **707/707** conservando los 2.8 MB de ahorro. Se
retiró además `public/Sin título-1.png` (1.7 MB, sin ninguna referencia en el
código, que se publicaba al sitio).

## 33.4 Por qué hizo falta el resellado, y qué queda pendiente de verificar

Lo correcto habría sido regenerar el catálogo con `npm run activos:importar`.
**Se intentó y no se pudo**: `smart.servier.com` no es alcanzable desde este
entorno (el proxy responde 403), y el importador, al no poder leer esas fichas,
deja fuera del catálogo los **48 activos de Servier**. El remedio habría sido
peor que la avería, así que se restauraron los archivos y se resolvió con el
resellado.

**Queda por hacer, en una máquina con acceso a `smart.servier.com`:** ejecutar
`npm i --no-save svgo && npm run activos:importar` una vez, para confirmar que
el pipeline reproduce byte a byte lo que hay en `public/` y para dejar poblada
`.cache/activos`. Hasta entonces, la prueba «el catálogo de activos se puede
regenerar sin red desde la caché» **se omite** por falta de caché —lo dice en
voz alta al ejecutarse, no pasa en falso— y la reproducibilidad completa del
pipeline está implementada pero **no verificada**. No debe darse por buena
hasta que esa ejecución salga limpia.

## 33.5 Reglas que quedan de este incidente

1. **Un artefacto generado y su fuente se commitean juntos.** Cambiar imágenes
   sin regenerar el catálogo, o contenido sin correr `npm run gen:plan`, deja
   el repositorio incoherente y rojo.
2. **Rojo en CI = la web no se actualiza.** No es un aviso cosmético: `deploy`
   depende de `build` y `build` depende de `test`. Antes de suponer que un push
   falló, hay que mirar la pestaña Actions.
3. **Ningún paso manual sobre archivos que se sirven.** Si una transformación
   merece aplicarse, merece estar en el pipeline, donde es reproducible y su
   resultado queda sellado.

## 33.6 Efecto sobre las fases planeadas

- **Fase 13 (peso del contenido).** El presupuesto mejora: las imágenes pesan
  19.7 % menos y el PNG suelto ya no se publica. No cambia el diagnóstico de
  fondo —`planRescate.js` son 4.26 MB en un solo trozo y hay que partirlo antes
  de enriquecer— pero sí deja algo de margen.
- **Fase 14 (fotos del botiquín).** Es la consecuencia más concreta. Las
  fotografías del equipo **no se copian a mano dentro de `public/`**: entran
  por el mismo pipeline, con su licencia y su crédito declarados, su saneado y
  su hash sellado en el catálogo. Cuando lleguen tus fotos, se añaden a
  `scripts/activos/seleccion.json` como activos propios de la academia y se
  importan. Añadir una foto sigue sin tocar código, pero sí toca el catálogo, y
  ese es justamente el punto: una imagen sin procedencia registrada no llega al
  sitio.
- **Fases 15 y 16.** Sin efecto directo. La regla 1 de §33.5 aplica a sus
  catálogos de fármacos y escenas igual que a cualquier otro dato generado.
