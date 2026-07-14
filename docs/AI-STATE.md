# AI-STATE — estado del proyecto para sesiones de IA

> Actualizado: 2026-07-13 · Rama: main (Fases 1-2 commiteadas; Fase 3 sin commit)
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
- **Fase 3 (editor estructural): HECHA** (esta sesión, sin commit). Ver
  `docs/EDITOR-CONTENIDO.md` → decisiones de arquitectura.
- **Pendiente transversal:** correr `npm run test:rules` con Java +
  `npm i -D firebase-tools` ANTES de desplegar `firestore.rules`; desplegar
  reglas + índices; conectar las páginas de estudio del alumno al resolutor
  (siguen leyendo `src/data` directo — el resolutor existe y está probado).

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

- `npm test`: **56 puras OK** (capacidades 12 · contenido 12 · contenidoApi 10
  · editorModelo 22). Sin dependencias nuevas de runtime.
- `npm run test:rules`: suite ampliada con casos Fase 3 (versión +1 estricta,
  autoría, metadatos protegidos, estados inválidos) — **NO ejecutada** aquí
  (sin Java/emulador); se omite con motivo, nunca da falso verde.
- `npm run build`: pasa; el editor es chunk lazy (no engorda la entrada).

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
