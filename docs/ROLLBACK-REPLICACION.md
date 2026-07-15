# Rollback de una replicación (Fase 7)

> Revierte una operación `completada`, `completada_con_advertencias` o
> `fallida` usando sus respaldos. Solo super-admin. Idempotente, reanudable y
> **sin respaldo válido no hay rollback**.

## Qué hace y qué no

- **Restaura** cada documento respaldado (temas y el doc del curso) a su
  snapshot previo a la replicación.
- **Archiva** (nunca borra) los documentos que la replicación **creó**.
- **Conserva** todo documento que cambió DESPUÉS de la replicación: se lista
  como advertencia y solo se restaura con `forzar[docId] = true` explícito.
- **No toca jamás**: progreso, intentos, calificaciones, usuarios, grupos,
  certificados. La restauración incrementa `version` del doc (los editores
  abiertos detectan el conflicto en vez de pisar).

## Cómo detecta "cambió después"

Cada respaldo/creado registra la huella de lo que la replicación **escribió**
(`hashEscrito`; en temas es el propio sello `origen.hash`, en cursos el
`hashCursoEscrito` del progreso). Si la huella actual del doc difiere, alguien
lo editó después → se conserva y se advierte. Sin señal de huella, el doc se
restaura (comportamiento del respaldo clásico).

## Flujo

1. **Vista previa** (`previsualizarRollback` / `npm run replicar -- --rollback
   --operacion=ID`): sin escrituras; lista restaurar / archivar / conservados.
2. **Confirmación reforzada**: frase exacta `REVERTIR N ACADEMIA(S)`.
3. **Ejecución** (`ejecutarRollback` / `--apply`): estado `revirtiendo` (la
   transición por transacción impide dos rollbacks simultáneos) → restaurar en
   lotes ≤20 → archivar creados → estado `revertida` + resumen en el doc de la
   operación + entrada en `historial` por academia.
4. **Reanudación**: restaurar reescribe los mismos doc-id y archivar es un
   update de estado ⇒ re-ejecutar tras un fallo completa lo pendiente sin
   duplicar nada (el estado `revirtiendo`→`fallida` se puede reintentar).

## Auditoría

El doc `replicaciones/{id}` conserva: quién revirtió, cuándo, cuántos docs se
restauraron/archivaron/conservaron; `historial` (append-only) recibe
`rollback-replicacion` por academia. Los respaldos NO se eliminan al revertir
(permiten repetir el rollback o auditar después).

## Comandos

```
# Vista previa (sin escrituras)
npm run replicar -- --rollback --operacion=REP_ID
# Ejecución real (emulador o producción con service account)
npm run replicar -- --rollback --operacion=REP_ID --apply --confirmar="REVERTIR 2 ACADEMIAS"
```

Desde la UI: `/admin/replicacion → Historial y rollback → Rollback…`
(vista previa + frase, operaciones acotadas).

## Límites conocidos

- El rollback restaura CONTENIDO, no relaciones externas: si después de la
  replicación un grupo ocultó/mostró temas nuevos, esa visibilidad queda tal
  cual (no es contenido).
- Un doc creado por la replicación y editado después por la academia se
  conserva ACTIVO (advertencia): archivarlo es decisión manual.
- Sin respaldos (p. ej. operación cancelada antes de aplicar) el rollback se
  niega: no hay nada seguro que restaurar.
