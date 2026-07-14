# AI-STATE — estado del proyecto para sesiones de IA

> Actualizado: 2026-07-13 · Rama: main (Fases 1-3 commiteadas; Fase 4 sin commit)
> Proyecto Firebase: ptem-a304f

## Qué es

PTEM: LMS multiacademia (Vite + React 18 + HashRouter + Firebase Auth/Firestore
plan Spark + GitHub Pages). Contenido académico hoy hardcodeado en `src/data`
(8 fases · 68 temas). Roadmap en `PLAN-LMS.md` (regla: UNA fase por entrega).

## Estado por fase

- **Fase 1 (planes/capacidades): HECHA.** `src/lib/capacidades.js` = fuente
  única (planComercial base|pro|curso; legacy sin campo ⇒ 'pro').
- **Fase 2 (aislamiento de contenido): HECHA.** Plantillas globales +
  copia por academia (`cursos`/`temas`, ids deterministas con prefijo
  `academiaId__`), clonación idempotente, estados en
  `academias/{id}.contenido.estado` (legacy|migrando|migrado|error), resolutor
  `contenidoDeAcademia()` con fallback a `src/data`, CLI
  `scripts/migrar-contenido.mjs` (dry-run por defecto). Ver
  `docs/MIGRACION-CONTENIDO.md`.
- **Fase 3 (editor estructural): HECHA.** Ver `docs/EDITOR-CONTENIDO.md`.
- **Fase 4 (contenido enriquecido): HECHA** (esta sesión, sin commit):
  - `src/lib/temaContenidoModelo.js` (PURO): bloques, quiz con `peso`
    (aditivo), recursos con `archivos` (aditivo), actividades,
    `calcularCalificacion` ponderada (sin pesos ≡ aciertos/total actual),
    `normalizarContenido`; compat probada contra los 68 temas reales.
  - `src/lib/archivosModelo.js` (PURO): allowlist ext/MIME (sin ejecutables),
    tamaños, `rutaArchivoAcademia`, `validarReferenciasStorage` (nada apunta
    a Storage de otra academia; rutas del cliente jamás se aceptan).
  - `storage.rules` (NUEVO, sin desplegar): `academias/{acaId}/**` — leer =
    miembros; subir/borrar = editores (consulta Firestore); MIME allowlist,
    ≤50 MB; resto cerrado. `firebase.json` con emulador storage :9199.
  - `firestore.rules`: `intentos.create` valida consistencia
    aciertos/total/porcentaje (±1 por redondeo) → resultado no falsificable.
  - `editor.js#guardarContenidoTema` (transacción, versión +1);
    `almacen.js` (subidas validadas); `PanelContenidoTema.jsx` +
    `VistaPreviaTema.jsx` (componentes reales del alumno, sin progreso);
    `Recursos.jsx` render aditivo de descargables.
  - El examen de fase sigue derivado del quiz de los temas: editar quiz =
    editar examen; ponderación lista para el resolutor.
- **Pendiente transversal:** correr `npm run test:rules` (Java +
  `npm i -D firebase-tools`; ahora levanta firestore,storage) ANTES de
  desplegar reglas; desplegar firestore.rules + storage.rules + índices;
  conectar las páginas de estudio del alumno al resolutor (siguen leyendo
  `src/data` directo — resolutor y calificación ponderada ya existen).

## Fase 3 — editor estructural (Curso → Fase → Módulo → Tema)

- **Ruta** `/editor` (staff propio), `/editor/:academiaId` y
  `/editor/plantilla/:plantillaId` (superadmin, modo plantilla con banda
  visual). Entradas: PanelPage (gate por `capacidades.editorContenido` o
  `permisosEditor.editarContenido`) y AcademiaAdminPage (superadmin).
- **3 capas:** `src/lib/editorModelo.js` (operaciones PURAS e inmutables:
  crear/actualizar/reordenar/mover/duplicar/archivar/restaurar/publicar/
  despublicar + `permisoEdicion` + validaciones) →
  `src/lib/firebase/editor.js` (única puerta de escritura; transacción con
  verificación de `version`, sincroniza estructura ⇄ docs de tema, registra
  `historial`; doble backend academia|plantilla) → `firestore.rules`
  (versión estricta +1 para editores no-super, metadatos inmutables
  `academiaId/cursoId/temaId/creadoPor/creadoEn/clonacion/plantillaOrigenId/
  versionOrigen`, catálogo de estados, BASE bloqueado, profesor solo con
  permisos y sus cursos).
- **UI** `src/pages/EditorPage.jsx` + `src/components/editor/`
  (ArbolCurso, PanelNodo, DialogoConfirmar, VistaPrevia). Reordenamiento por
  botones (Subir/Bajar/Inicio/Final/Mover a…) accesible por teclado; guardado
  explícito con indicador `aria-live`; confirmaciones para archivar/
  despublicar/mover/duplicar curso/abandonar cambios; vista previa con la
  misma capa del alumno (`ensamblarFases` solo publicado, sin tocar progreso).
- **Política de archivado:** archivar un padre OCULTA toda su rama al alumno
  (los hijos conservan su estado propio ⇒ restaurar recupera tal cual). Nada
  se elimina permanentemente. Publicar con ancestro archivado: bloqueado.
- **Academias legacy** (no 'migrado'): editor bloqueado con explicación; nunca
  escribe sobre `src/data`.
- **Plan CURSO:** `maxCursos` validado al crear/duplicar (cuenta no archivados).
- **Cambio en Fase 2 requerido:** `contenidoApi.ensamblarFases` ahora filtra
  también módulos no publicados (antes solo fases y temas).
- **Limitación documentada:** doc de tema `publicado` con padre archivado
  sigue siendo legible por id directo por alumnos de la misma academia
  (mitigación futura: cascada de estado).

## Pruebas

- `npm test`: **76 puras OK** (capacidades 12 · contenido 12 · contenidoApi 10
  · editorModelo 22 · temaContenido 20). Sin dependencias nuevas de runtime.
- `npm run test:rules`: Firestore (12, incl. intentos falsificados) +
  Storage (6, aislamiento A/B, roles, allowlist) — **NO ejecutadas** aquí
  (sin Java/emulador); se omiten con motivo, nunca dan falso verde.
- `npm run build`: pasa; el editor es chunk lazy (~23 kB gzip, entrada intacta).
- Verificación en navegador (Fase 4): PanelContenidoTema monta, marca cambios,
  habilita Guardar, muestra ponderaciones y la vista previa renderiza
  quiz/descargables/actividades con Escape para cerrar.

## Invariantes que NO se deben romper

- `src/data` sigue siendo fallback; ids de fases/temas = llaves de progreso.
- Nunca dos academias escriben el mismo doc; plantillas solo-lectura salvo
  superadmin en modo plantilla explícito.
- Cambios de plantilla NO se propagan solos (replicación = Fase 9).
- `plan` (periodicidad) ≠ `planComercial`. Capacidades solo vía
  `capacidadesDe()`/`useAuth().capacidades`.
- Entrada ligera: Firebase y `src/data` solo por import dinámico/lazy.

## Pendiente / manual

1. `npm i -D firebase-tools` + Java → `npm run test:rules` → desplegar reglas.
2. Decidir cuándo sembrar plantilla y clonar academias (CLI con dry-run).
3. Fase 4 sugerida: editor de CONTENIDO del tema (bloques/quiz/flashcards)
   o conexión del resolutor a las páginas del alumno (originalmente F3 del
   roadmap; el editor estructural la adelantó).
4. Sin commit de Fase 3 (pedido explícito).
