# AI-STATE — estado del proyecto para sesiones de IA

> Actualizado: 2026-07-13 · Rama: main (cambios sin commit) · Proyecto Firebase: ptem-a304f

## Qué es

PTEM: LMS multiacademia (Vite + React 18 + HashRouter + Firebase Auth/Firestore
plan Spark + GitHub Pages). Contenido académico hoy hardcodeado en `src/data`
(8 fases · 68 temas · 374 preguntas · 457 flashcards). Roadmap de 12 fases en
`PLAN-LMS.md` (regla: UNA fase por entrega).

## Estado por fase

- **Fase 1 (planes/capacidades): HECHA.** `src/lib/capacidades.js` (fuente única,
  planComercial base|pro|curso; legacy sin campo ⇒ 'pro'), gates en AuthContext /
  AdminPage / AdminPlataforma / AcademiaAdminPage / PanelPage, regla de
  personalización por plan, `tests/capacidades.test.mjs`.
- **Fase 2 (aislamiento de contenido): HECHA** (esta sesión), salvo la
  verificación de reglas con emulador (sin Java en el entorno). Ver
  `docs/MIGRACION-CONTENIDO.md`.
- **Fase 3 siguiente:** conectar el resolutor a las páginas de estudio
  (los componentes aún importan `src/data` directo; el resolutor ya existe).

## Fase 2 — qué se construyó

- **Modelo puro** `src/lib/contenidoModelo.js`: ids deterministas
  (`{academiaId}__{plantillaId}[__{temaId}]` ⇒ clonación idempotente y
  namespaces disjuntos), `clonProfundo` (copias sin referencias compartidas),
  `plantillaDesdeData`, `cursoDesdePlantilla` (registra `plantillaOrigenId` +
  `versionOrigen`), `docsClonadosParaAcademia`, `lotes`.
- **Capa de acceso pura** `src/lib/contenidoApi.js`: estados de migración
  (`academias/{id}.contenido.estado`: legacy|migrando|migrado|error; basura ⇒
  legacy), `ensamblarFases` (estructura + docs → fases; excluye borradores;
  reporta faltantes), `construirApi` (misma interfaz que `src/data/index.js`).
- **Cliente Firebase** `src/lib/firebase/plantillas.js` (seed del catálogo
  global) y `src/lib/firebase/contenido.js`: `clonarPlantillaAAcademia`
  (batched, idempotente, migrando→migrado|error), `verificarClonacion`,
  lecturas por academia y el **resolutor** `contenidoDeAcademia()` — única
  puerta al contenido: Firestore si 'migrado', fallback a `src/data` en
  cualquier otro caso o error; caché por academiaId sin mezcla entre academias.
  Nada de esto lo importa aún la UI (Fase 3) ⇒ no engorda el bundle.
- **Scripts**: `npm run gen:plantilla` (inspección JSON), `npm run migrar` =
  `scripts/migrar-contenido.mjs` (CLI con firebase-admin: dry-run por defecto,
  `--apply`, `--seed`, `--academia=ID`, `--verificar`, `--produccion`; muestra
  proyecto objetivo, detecta parciales, reanuda, resumen final).
- **Reglas** (`firestore.rules`, NO desplegadas): `plantillas`/`plantillasTemas`
  solo super; `cursos`/`temas` por academia (lectura alumno = publicado + su
  academia; edición = director con plan pro|curso, o instructor con
  `permisosEditor.editarContenido` y el curso en `cursosPermitidos`;
  `academiaId`/`cursoId`/`temaId` inmutables ⇒ no hay apropiación);
  `historial` append-only firmado; `respaldos` solo super.
- **Índices** `firestore.indexes.json`: cursos(academiaId,estado),
  temas(cursoId,estado). `firebase.json` con emulador Firestore :8080.
- **Pruebas**: `npm test` = 34 puras OK (integridad 8/68, ids, tamaños <900 KB,
  equivalencia API reconstruida vs src/data, independencia real de copias,
  estados). `npm run test:rules` = 10 pruebas de aislamiento cruzado A/B
  **listas pero NO ejecutadas** (requieren Java + firebase-tools; sin emulador
  se omiten con motivo).

## Invariantes que NO se deben romper

- `src/data` sigue siendo el fallback; no se borra hasta terminar la migración.
- ids de fases/temas = llaves de progreso/intentos: se conservan tal cual.
- Nunca dos academias escriben el mismo doc; plantillas de solo lectura.
- Los cambios de plantilla NO se propagan solos (replicación = Fase 9).
- `plan` (periodicidad de facturación) ≠ `planComercial` (base|pro|curso).
- Import dinámico de Firebase (entrada ~76 KB gzip): no importar Firebase ni
  `src/data` de forma estática en el shell.

## Pendiente / manual

1. Correr `npm run test:rules` con Java + `npm i -D firebase-tools` ANTES de
   desplegar `firestore.rules`.
2. Desplegar reglas + índices (`firebase deploy --only firestore`) — no hecho.
3. Seed y clonaciones en producción: decisión del dueño (dry-run primero).
4. No se hizo commit (pedido explícito).
