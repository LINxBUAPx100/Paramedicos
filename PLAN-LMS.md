# PLAN-LMS — Auditoría y planeación: PTEM como LMS multiacademia

> Fecha: 2026-07-14 · Estado: auditoría completa · Fases 1-4 + permisos
> editoriales (roadmap Fase 6) + CABLEADO DEL RESOLUTOR (roadmap Fase 4)
> implementadas (pendiente: correr la suite de reglas con el emulador — ver
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
| `usuarios` | = uid Auth | nombre, email, rol, academiaId, grupoId, estado, esPrueba, pruebaHasta, fasesDesbloqueadas[], puedeVerCodigos | dueño (acotado), director (rol/estado/grupoId/puedeVerCodigos), staff (fasesDesbloqueadas), super | dueño, super, staff de su academia |
| `progreso` | = uid | leidos{}, quizzes{}, examenes[], updatedAt (debounce 800 ms) | dueño | dueño, super |
| `intentos` | auto | uid, academiaId, faseId/numero/titulo, aciertos, total, porcentaje, fecha | alumno (create, inmutable) | dueño, super, staff |
| `grupos` | = código GRP-XXXX | academiaId, nombre, estado, fasesOcultas[], temasOcultos[], creadoPor | director/super; staff solo visibilidad | get: autenticado; list: super/staff |
| `codigos` | = código de prueba | academiaId, grupoId, creadoPor, nota, estado, dias, expira | super/director | get: autenticado; list: super/director |
| `solicitudes` | auto | tipo(modulo\|codigos), uid, academiaId, grupoId, fase*, estado, resueltoPor | dueño (create); staff/director resuelven | dueño, super, staff |
| `reportes` | auto | uid, academiaId, temaId, mensaje, estado | autenticado (create); super | super |
| `configuracion` | anuncio | mensaje, tipo, activo | super | **público** |

## 5. Mapa de reglas de seguridad (resumen)

Helpers: `autenticado, esDueno, miDoc(get propio), esSupremo(correo verificado),
esSuper, academiaActiva, esStaffDe, esAdminDe, canjeValido, grupoValido`.
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
| **7** | Página de inicio por SECCIONES configurables (hero, cursos, progreso, stats, anuncios, convocatorias, capacitadores) | Home + config por academia |
| **8** | Certificados digitales | plantilla + verificación |
| **9** | Replicación con vista previa/conflictos/respaldo/historial | scripts + UI superadmin |
| **10** | Plan CURSO (modo mono-curso) + directorio de capacitadores | capacidades + Home |
| **11** | Auditoría (`historial` append-only) + paginación y contadores de `/admin` + validar campos numéricos de `intentos` | reglas + admin |
| **12** | Tipo MEDICINA: convocatorias e importación de versiones oficiales | modelo por convocatoria |

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
