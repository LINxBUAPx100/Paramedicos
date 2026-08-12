# HANDOFF — continuación del trabajo de auditoría y rework

> **Escrito para retomar el trabajo en una sesión nueva sin contexto previo.**
> Última actualización: 2026-08-12 · Rama: `claude/auditoria-endurecimiento`
> · Último commit: `1840ab7` · CI: verde (168 unitarios + 54 de reglas)

---

## 1. Cómo empezar

```bash
git checkout claude/auditoria-endurecimiento
npm ci
npm test        # deben salir 168 pass, 0 fail
npm run build
```

Lee este archivo entero antes de tocar nada. Después, el plan detallado de lo
que queda está en la sección 6.

---

## 2. Qué es este trabajo

Partió de una auditoría completa (UI/UX, arquitectura, seguridad, rendimiento)
del LMS PTEM. De ahí salió un plan por **bloques**, uno por entrega, cada uno
con su commit y su verificación. Van hechos los bloques **A–N**. Quedan **O, P**
y tres bloques nuevos **Q, R, S** pedidos después.

**Regla de trabajo que el usuario espera:** un bloque por respuesta, con
`npm test` y `npm run build` en verde, commit descriptivo y push. Y **decirle
siempre dónde puede VER lo que cambió** (ruta exacta + rol necesario).

---

## 3. Entorno y restricciones (verificadas, no supuestas)

- **Windows + Git Bash.** Hay tanto `Bash` como `PowerShell`; cada uno con su
  sintaxis. `/tmp` existe en Git Bash pero Node lo resuelve como `C:\tmp` — usar
  rutas absolutas del scratchpad para archivos temporales.
- **No hay Java en la máquina** ⇒ el emulador de Firestore **no corre en local**.
  Los tests de reglas se verifican **solo en CI**. Nunca dar por buena una regla
  sin verla pasar en GitHub Actions.
- **El panel del navegador no compone frames** ⇒ `document.visibilityState` es
  `'hidden'`, así que **IntersectionObserver no dispara** y `screenshot` falla.
  No confundir eso con un bug del código (ya pasó una vez).
- **Todo lo que exige sesión no se puede verificar visualmente**: paneles de
  director, consola de super-admin, editor. Hay que decírselo al usuario y
  señalarle qué mirar.
- Git usa el **Administrador de credenciales de Windows**, no el token de `gh`.
  Ya está resuelto: la cuenta autenticada es `LINxBUAPx100`, con permiso de push.

### Comandos útiles

```bash
gh run list --branch claude/auditoria-endurecimiento --limit 3
gh run view <id> --log-failed | sed 's/\x1b\[[0-9;]*m//g' | grep -E "not ok|# (pass|fail)"
npx firebase-tools@15 deploy --only firestore:rules --project ptem-a304f
```

---

## 4. Estado del proyecto en producción

| Cosa | Estado |
|---|---|
| Reglas de Firestore | Desplegadas (incluidos los arreglos del 2026-08-12) |
| Índices | Desplegados, incluido `temas: cursoId + academiaId + estado` |
| **Firebase Storage** | ⚠️ **NUNCA configurado.** `storage.rules` no está desplegado y la subida de archivos por academia no ha funcionado nunca. Activarlo exige plan Blaze. Decisión pendiente del usuario |
| App Check | Código listo, inactivo hasta que exista `VITE_APPCHECK_SITE_KEY` |
| Secrets en GitHub | Configurados (el build falla a propósito sin ellos) |
| API key | Restringida por referente HTTP en Google Cloud |

---

## 5. Bloques ya hechos (A–N)

Resumen de qué cambió y qué NO hay que volver a tocar.

- **A — CI.** `.github/workflows/deploy.yml`: job `test` (unitarios + reglas en
  emulador con Java 21) como puerta previa a `build`/`deploy`. Los tests corren
  en cualquier rama; solo `main` y la rama vieja despliegan.
- **B — Reglas.** `hasOnly` en la auto-edición de `usuarios/{uid}` (cerró que un
  alumno se auto-desbloqueara módulos y un profesor se auto-aprobara códigos) y
  validación de forma en `progreso/{uid}`.
- **C — XSS + CSP.** `src/lib/enlaceSeguro.js` (`hrefSeguro`) filtra **todo**
  href que venga de datos, en 7 sitios. CSP inyectada por plugin de Vite solo en
  el build (`vite.config.js`).
- **D — Config Firebase.** La config sale de `import.meta.env`, no del código. El
  build **falla a propósito** si faltan variables. App Check opcional.
- **E — Procesos.** Capacidades como fuente única en `firestore.rules` **y**
  `storage.rules` (divergían); baja lógica de usuarios; compensación en el alta;
  `cambiarCodigoAcademia` reanudable y que **se niega** si la academia tiene
  contenido; `src/lib/registro.js` para los ~55 `catch` mudos.
- **F — Tokens de diseño.** Escalas `--e-*`, `--t-*`, `--dur-*` y color semántico
  con variante oscura. **Regla: todo padding/margin/gap/font-size/transition sale
  de un token.**
- **G — Botones.** UN primitivo `.btn` con modificadores de jerarquía
  (`--primario --suave --fantasma --carbon --urgencia --fase --peligro --exito`),
  forma (`--pildora`) y tamaño (`--sm --lg`). **No crear clases de botón sueltas.**
- **H — Motion y a11y.** `Reveal` con IntersectionObserver compartido; drawer con
  `inert` + Escape + devolución de foco; esqueletos en `TemaPage`/`FasePage`.
- **I — Rendimiento.** Tipografías auto-alojadas con `@fontsource` (CSP cerrada a
  `'self'`); `chunkSizeWarningLimit` a 500; copy de exámenes como autoevaluación.
- **J — Landing.** `src/pages/Landing.jsx` para quien no tiene sesión, con un
  tema real de muestra cargado en diferido.
- **K — Entrada sin academia.** `src/pages/Bienvenida.jsx` + colección
  `directorio` + `solicitudesAcceso`. **Estar en el directorio desactiva la
  entrada por código** (el id del doc de una academia ES su código).
- **L — Bloque de academia.** `academias/{id}.homeAcademia` con 3 variantes,
  avisos y accesos rápidos de catálogo cerrado. Modelo puro
  `src/lib/homeAcademiaModelo.js`.
- **M — Simetría.** Cableadas `borrarGrupo`, `borrarCodigo`, `historialPermisos`;
  creada `revocarAccesoCodigos`. `ConfirmacionReforzada` extraída a
  `src/components/`.
- **N — Consola super-admin.** `src/components/admin/AdminShell.jsx` con
  navegación lateral y una página por entidad bajo `/admin/*`. Carga los datos
  una vez y los reparte por contexto del Outlet.

### Correcciones a la auditoría original (importante)

Durante la ejecución se demostró que **cuatro afirmaciones del informe eran
falsas**. No repetirlas:

1. `bloquearFase` **sí se usa** — «retroceder módulo» ya existía.
2. `restaurarNodo` **sí se usa** — restaurar archivados ya existía.
3. `.contenido` **ya tenía** transición de ruta (`animation: aparecer` + `key`).
4. `sitemap.xml` **no está muerto** — lista la raíz, que sí es indexable.

Lección: verificar cada función por su **nombre real** antes de declararla muerta.

### Dos bugs de producción que encontró el CI

Merecen recordarse porque marcan el patrón de error de este proyecto:

1. `esSupremo()` leía `request.auth.token.email_verified` con notación de punto.
   Si el token no trae la claim, eso **no devuelve false: lanza un error de
   evaluación**, y un error tumba la expresión entera. Como `esSuper()` empieza
   por ahí, toda regla `esSuper() || <rama legítima>` denegaba. **En reglas,
   leer claims y campos opcionales siempre con `.get(clave, default)`.**
2. En una consulta `list`, Firestore evalúa las reglas contra **los campos que
   filtra la consulta**, no contra el documento. `temasDeCurso()` no filtraba por
   `academiaId` y la regla se apoyaba en él ⇒ el alumno recibía
   `permission-denied` **siempre**, y `ContenidoContext` lo tragaba cayendo al
   bundle: la academia migrada mostraba el temario genérico sin que nadie lo
   supiera.

---

## 6. Lo que queda por hacer

Orden recomendado y acordado: **O → Q → R → S → P**.
(El motivo: S añade una pestaña al panel del director, y O reorganiza ese panel.
Hacer O primero evita tocar `PanelAcademia.jsx` dos veces.)

### Bloque O — Consola del director

Misma operación que el bloque N, sobre `src/components/PanelAcademia.jsx`
(**1271 líneas**, la más grande del repo). Trocear con el mismo `AdminShell` (o
un gemelo) bajo `/panel/*`:

- **Resumen** — alumnos activos, avance medio, alumnos en riesgo (ya lo calcula
  `Estadisticas`), solicitudes pendientes, estado del plan.
- **Miembros** — buscador y filtros; incluye las acciones de conceder/retirar
  del bloque M.
- **Grupos** — crear, renombrar, borrar, y **absorber la visibilidad por grupo
  que hoy vive en `/temario`** (nombre que no dice lo que hace).
- **Accesos** — códigos de academia y grupo, códigos de prueba, solicitudes
  internas y las del directorio (bloque K), todo junto.
- **Contenido** — entrada al editor, estado de cada curso, historial.
- **Mi academia** — personalización del bloque L y ficha del directorio.

El profesor ve el mismo armazón con menos secciones, resueltas por `capacidades`
y `permisosEditor`. Dejar redirección desde `/panel`.

### Bloque Q — Temario con tarjetas expandibles

Rediseño visual de `src/pages/TemarioPage.jsx` según un boceto que dio el
usuario. **Misma funcionalidad y misma lógica de guardado**: solo la disposición.

- Panel **«Espacios»** arriba a la derecha: selector de academia (super-admin),
  selector de grupo y «Ocultar todo», separados del contenido.
- **Baraja de fases en acordeón**: una fase expandida a la vez con sus temas y su
  ojo por tema; las demás colapsadas a los lados. Hoy son 68 filas seguidas.
- No tocar `guardar()`, `toggleFase()`, `toggleTema()`, `toggleTodo()` ni
  `aplicarATodos()`.
- Tarjetas como `<button aria-expanded>`, navegables con flechas; el ojo debe
  decir en texto qué hace (hoy solo tiene icono).

### Bloque R — Exportar el temario a PNG

Nuevo `src/lib/exportarTemario.js`, **módulo puro con tests**, que compone una
**línea de tiempo**: fases en vertical con sus temas numerados, marca PTEM y
nombre de la academia.

- El módulo puro calcula **posiciones y saltos de línea**; el canvas solo pinta
  lo que ese módulo decide. Así la lógica se prueba sin navegador.
- Dibujar en `<canvas>` y descargar PNG. **Sin librerías** (no tocar la CSP).
- Dos variantes: **completa** y **la del grupo** (respetando lo oculto).
- Botón en el panel «Espacios» del bloque Q.

### Bloque S — Libro de calificaciones

El más grande. **Decisiones ya tomadas con el usuario:**

- Se califican **evaluaciones que crea el maestro** (no fases fijas).
- **Separadas** de los `intentos` (exámenes de la app), mostradas lado a lado.
  Motivo: los intentos son repetibles y mezclarlos infla el promedio.
- **El alumno ve las suyas** en «Mi progreso», nunca las de otros.

```
evaluaciones/{id}     { academiaId, grupoId, titulo, descripcion, fecha,
                        ponderacion, escala: 100, creadoPor, creadoEn }
calificaciones/{id}   { evaluacionId, academiaId, grupoId, uid, valor,
                        nota, calificadoPor, calificadoEn }
```

Id determinista `{evaluacionId}__{uid}` (mismo patrón que `solicitudesAcceso`).

Reglas: `evaluaciones` las escribe el staff de esa academia y las leen staff y
alumnos del grupo; `calificaciones` las escribe **solo el staff** y las lee su
dueño o el staff; `valor` entero 0–100 validado en la regla, como ya se hace con
`intentos`. Borrar una evaluación: director/super con confirmación reforzada.

Cálculo en `src/lib/calificacionesModelo.js` **puro y con tests**: promedio
ponderado por alumno, por grupo y por evaluación, más detección de sin calificar.
Nada de aritmética en los componentes.

Interfaz: pestaña **Calificaciones** en el panel del maestro (tabla alumnos ×
evaluaciones, edición en celda, promedios) y bloque propio en «Mi progreso».

### Bloque P — Alta de academia con materias

Asistente de 3 pasos para `NuevaAcademia`: identidad → **materias** (catálogo de
`plantillas` con casillas; `listarPlantillas` está sin usar) → director.
La academia se crea al instante y la clonación corre después como operación
reanudable, reutilizando `clonarPlantillaAAcademia` (también sin usar) y el
patrón de `cambiarCodigoAcademia`.

Esto **desbloquea C6**: una academia recién creada no tiene cursos, así que su
código todavía se puede rotar. Ahí encaja generar códigos con entropía.

---

## 7. Convenciones que hay que respetar

- **Diseño:** todo valor de espaciado/tipografía/motion sale de un token
  (bloque F). Botones: solo `.btn` + modificadores (bloque G). Nada de clases
  sueltas con color o padding propios.
- **Reglas de Firestore:** campos y claims opcionales **siempre** con
  `.get(clave, default)`. Si una regla se apoya en un campo, la consulta del
  cliente **tiene que filtrarlo**.
- **Simetría:** si se puede conceder, se tiene que poder retirar; si se puede
  crear, se tiene que poder borrar o archivar. Acciones destructivas con
  `ConfirmacionReforzada` y rastro en `historial`.
- **Lógica en módulos puros** con tests (`src/lib/*Modelo.js`), no en
  componentes. Normalización **fail-open**: un dato corrupto cae al default,
  nunca deja la pantalla en blanco.
- **URLs de datos** siempre por `hrefSeguro`; imágenes por `driveSrc`.
- Comentarios en español, explicando **el porqué** y no el qué.
- Nunca declarar algo verificado si no se ha ejecutado. Decir explícitamente qué
  quedó sin comprobar.

---

## 8. Deuda conocida y no urgente

- `PanelAcademia.jsx` (1271) y `EditorPage.jsx` (811) siguen siendo monolitos.
  O ataca el primero.
- Quedan ~12 clases de botón ad-hoc. Varias **no deben** convertirse: son
  tarjetas pulsables o controles de icono, no botones.
- Breakpoints: 12 → 7. Bajar a 4 exige mover reglas hasta 80px y revisar
  pantalla por pantalla.
- Los datos del temario son un solo chunk de ~190 kB gz. Dividirlo por fase
  exige volver asíncrona toda la API de contenido (se descartó por riesgo).
- `borrarArchivoAcademia` sigue sin cablear porque **Storage no existe**.
- Avisos del runner: `actions/setup-java@v4` deprecado; acciones de Node 20
  forzadas a Node 24. No rompen nada hoy.
