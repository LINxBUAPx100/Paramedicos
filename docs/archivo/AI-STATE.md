# AI-STATE — estado del proyecto para sesiones de IA

> Actualizado: 2026-07-15 · Rama: main (Fases 1-6 commiteadas en 0b6f9ae;
> Fase 7 sin commit) · Proyecto Firebase: ptem-a304f (plan Spark)

## Qué es

PTEM: LMS multiacademia (Vite + React 18 + HashRouter + Firebase Auth/Firestore/
Storage + GitHub Pages). Contenido oficial en `src/data` (8 fases · 68 temas)
como fallback; cada academia migrada opera su COPIA en Firestore. Roadmap en
`PLAN-LMS.md` (regla: UNA fase por entrega). El usuario renumera fases en sus
prompts: su "Fase 7" = replicación (roadmap F9).

## Estado por fase (todas verificadas con `npm test` + build)

- **F1 planes/capacidades**: `src/lib/capacidades.js` única fuente
  (planComercial base|pro|curso; legacy ⇒ 'pro'; avanzado ⇒ pro).
- **F2 aislamiento**: plantillas globales + copia por academia
  (`cursos/temas`, ids `academiaId__plantillaId[__temaId]`), clonación
  idempotente, resolutor `contenidoDeAcademia()` con fallback al bundle,
  CLI `scripts/migrar-contenido.mjs`. Ver docs/MIGRACION-CONTENIDO.md.
- **F3 editor estructural**: `/editor` (3 capas: editorModelo → firebase/editor
  → reglas con versión estricta +1). Ver docs/EDITOR-CONTENIDO.md.
- **F4 contenido enriquecido**: temaContenidoModelo + archivosModelo +
  storage.rules (`academias/{id}/**`) + PanelContenidoTema; `intentos.create`
  valida consistencia del resultado.
- **F6 permisos editoriales**: matriz permisosEditor (6 permisos +
  cursosPermitidos) validada en UI/datos/reglas/Storage.
- **Cableado del resolutor (roadmap F4)**: `ContenidoContext`
  (`useContenido` completo bajo demanda + `useIndiceContenido` ligero, 1
  lectura del curso; `useIndiceAcademia` para superadmin). Las 9 páginas de
  estudio ya no importan src/data. Entrada ~82 KB gzip.
- **F7 replicación (SIN commit)**: ver abajo.
- **Roadmap F7 home configurable (SIN commit)**: `src/lib/homeModelo.js`
  (catálogo hero/progreso/fases/prueba/atlas/flashcards; normalización
  fail-open; default = Home actual, verificado en navegador);
  `academias/{id}.homeSecciones` editable por director PRO/CURSO desde
  PersonalizacionAcademia (capacidad `paginaInicioConfigurable`); regla:
  allowlist del director + `homeSecciones` (lista|null). Banda de academia y
  selector de grupo NO configurables. 8 pruebas puras + caso de reglas.

## Fase 7 — plantillas versionadas + clonación/replicación + rollback

- **Modelos PUROS**: `src/lib/plantillasModelo.js` (estados borrador|publicada|
  archivada; publicada INMUTABLE ⇒ `prepararNuevaVersion`; `snapshotDeVersion`
  con hash/conteos; `plantillaDesdeCurso` BLOQUEA referencias privadas de
  Storage) y `src/lib/replicacionModelo.js` (huella FNV-1a doble sobre JSON
  estable; clasificación nuevo/sin_cambios/modificado_en_origen/
  modificado_local/conflicto/solo_local/archivado_local; estrategias
  conservar_local(DEFAULT)/reemplazar_con_origen/duplicar_como_nuevo/
  seleccion_manual; `planParaAcademia` idempotente con lotes ≤20 y respaldos;
  `planDeRollback` conserva lo editado después salvo `forzar`; máquina de
  estados sin doble ejecución; `fraseConfirmacion`).
- **Sello de origen**: cada tema clonado/replicado lleva
  `origen{plantillaId, version, hash, replicacionId}` (clonación cliente +
  script lo escriben; reglas lo hacen INMUTABLE para editores). Clones sin
  sello ⇒ divergencia = conflicto (conservador).
- **Capa de datos** `src/lib/firebase/replicacion.js` (solo super):
  plantillas CRUD/duplicar/desde-curso/publicar versión (snapshot a
  `plantillasVersiones(+Temas)` con `versionId` de un solo campo — sin índice
  compuesto)/archivar/restaurar/`academiasQueUsanPlantilla`/`versionEstaEnUso`;
  operaciones `replicaciones/{id}`: crear → analizar (dry-run OBLIGATORIO,
  guarda huella del destino) → confirmar (frase) → aplicar (respaldo
  determinista `bk-<rep>__<col>__<doc>` que NUNCA se sobrescribe; verificación
  de huella del destino; progreso/loteConfirmado reanudable; clonación marca
  academia 'migrado') → rollback (previsualizar + ejecutar). Límite navegador:
  `MAX_DESTINOS_CLIENTE = 5`.
- **Backend seguro** (Spark, sin Functions): `scripts/replicar-contenido.mjs`
  (`npm run replicar`, firebase-admin, dry-run por defecto, `--apply`,
  `--confirmar="FRASE"`, `--reanudar`, `--rollback`). Variante Cloud Functions
  (Blaze) documentada, NO implementada ni necesaria.
- **Reglas** firestore.rules: `plantillasVersiones(+Temas)` solo super con
  `update: false` (inmutables); `replicaciones` solo super; plantilla publicada
  no cambia `estructura` ni para super; `origen`/`replicacion` añadidos a los
  metadatos intocables de cursos/temas. NO desplegadas.
- **Editor**: guardarEstructura/guardarContenidoTema rechazan plantilla
  'publicada' (abre versión siguiente desde /admin/replicacion).
- **UI** `/admin/replicacion` (ReplicacionPage, lazy, solo super; acceso desde
  AdminPage): pestañas Plantillas (crear/desde curso/duplicar/publicar/
  archivar/versiones+uso) · Clonar y replicar (wizard 5 pasos, filtros y
  paginación de academias, estrategia default conservar_local, dry-run
  obligatorio, tabla de atención con decisiones por conflicto, confirmación
  reforzada por frase) · Historial y rollback (reanudar, cancelar, rollback con
  vista previa). Estilos `rp-*` en index.css (responsive, reduced-motion).
- **Docs**: docs/REPLICACION-CONTENIDO.md y docs/ROLLBACK-REPLICACION.md
  (arquitectura, estados, costos, comandos, procedimiento de producción).

## Pruebas

- `npm test`: **138 puras** (93 previas + replicacion 25 + plantillas 10 +
  homeModelo 8 + 2 reubicadas) — TODAS pasan.
- `npm run test:rules`: suite ampliada con F7 (versiones inmutables, plantilla
  publicada, replicaciones/respaldos privados, sello origen intocable) — NO
  ejecutada aquí (sin Java/emulador); nunca da falso verde, se omite con motivo.
- `npm run build`: pasa; ReplicacionPage es chunk lazy; entrada intacta.

## Invariantes que NO se deben romper

- Nunca dos academias escriben el mismo doc; plantillas solo-lectura para
  academias; NADA se propaga automáticamente (replicación siempre manual con
  dry-run + respaldo + frase).
- `conservar_local` es el default; `solo_local` y `archivado_local` no se tocan
  con ninguna estrategia automática.
- Versiones publicadas: inmutables; no borrar las usadas (`versionEstaEnUso`).
- Respaldo obligatorio antes de sobrescribir; sin respaldo completo no se
  escribe; los respaldos no se depuran automáticamente.
- `COLECCIONES_PERMITIDAS` de replicación: cursos/temas/replicaciones/
  respaldos/historial — progreso/intentos/calificaciones JAMÁS.
- `plan` (periodicidad) ≠ `planComercial`; capacidades solo vía
  `capacidadesDe()`; sello `origen` inmutable para editores.
- Entrada ligera: Firebase y src/data solo por import dinámico/lazy.

## Pendiente / manual

1. Java + `npm i -D firebase-tools` → `npm run test:rules` → desplegar
   firestore.rules + storage.rules (obligatorio ANTES de usar F7 en prod).
2. Sembrar plantilla oficial (`npm run migrar -- --seed --apply`) y publicar
   su versión v1 desde /admin/replicacion (el snapshot habilita replicar).
3. Replicación y home configurable SIN commit (pedido explícito).
4. Siguiente fase sugerida: certificados (roadmap F8) o auditoría+paginación
   de /admin + validación de intentos (roadmap F11, ataca riesgo de cuota).
