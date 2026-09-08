# AGENTS.md — cómo se trabaja en este repositorio

Este archivo es **obligatorio** para cualquier agente de IA que trabaje aquí
(Codex/ChatGPT, Claude, Copilot o cualquier otro). Léelo completo antes de
tocar un archivo. Manda sobre cualquier costumbre del agente.

El trabajo **editorial** (redactar y validar el temario) se rige además por
`CLAUDE.md`. El calendario técnico está en `docs/PLAN-TECNICO-FASES.md`.

---

## 1. La regla que no se rompe: el dueño ve el cambio ANTES del commit

El dueño del repositorio revisa el trabajo en **GitHub Desktop**, y GitHub
Desktop solo muestra lo que está **sin commitear en el árbol de trabajo**. Si
commiteas, empujas o mergeas por tu cuenta, el cambio se vuelve invisible para
él: no hay nada que revisar y ya está hecho.

Por lo tanto:

1. **Deja tu trabajo sin commitear.** Edita los archivos y ahí los dejas. No
   `git add`, no `git commit`, no `git push`, no `git merge`, no PR, no
   `gh pr create`, no despliegue. Nada de eso, salvo que el dueño lo pida
   **en ese mensaje y con esas palabras**.
2. **Una autorización vale una vez.** «Haz commit de esto» autoriza ese
   commit, no los siguientes. Un «sí» de hace tres tareas no autoriza nada hoy.
3. **`main` no se toca nunca.** Si te autorizan a commitear, primero rama:
   `git switch -c feat/<lo-que-sea>`. Mergear a `main` **despliega a
   producción** (`.github/workflows/deploy.yml` corre en `push: '**'`), así que
   un merge sin autorización publica software que nadie revisó.
4. **No limpies el árbol del dueño.** Prohibido `git reset --hard`,
   `git checkout -- .`, `git clean`, `git stash` y `git restore` sobre trabajo
   que no escribiste tú en esta sesión. Si algo estorba, dilo; no lo borres.
5. **No reescribas historia** (`rebase`, `commit --amend`, `push --force`).

Si trabajas en un entorno en la nube y no en el clon local del dueño, dilo
explícitamente al terminar y explica **cómo bajar el cambio para revisarlo**
(nombre de la rama, o el diff), porque en ese caso GitHub Desktop no lo verá
solo.

---

## 2. Al terminar, entrega un parte de trabajo

Cierra **toda** intervención con esto, en texto plano y sin adornos:

* **Archivos tocados**, uno por línea, con la ruta real y qué le hiciste
  (creado / modificado / borrado). Sin resumir en «varios archivos».
* **Qué cambia para el usuario**: qué ruta, qué pantalla, qué botón. Si no
  cambia nada visible todavía, dilo así.
* **Comandos que corriste y su salida real** (ver §4). Si no corriste uno, di
  que no lo corriste. Nunca reportes como aprobada una prueba que no viste pasar.
* **Lo que dejaste sin hacer** y por qué.
* **Las decisiones que necesitan al dueño**, como preguntas concretas.

Un `git status --short` y un `git diff --stat` al final ayudan más que un
párrafo de prosa.

---

## 3. Una función existe cuando está cableada, no cuando está escrita

Nada de entregas que se anuncian y no se pueden abrir. Antes de decir que algo
está entregado, comprueba las cinco cosas:

1. Hay **ruta** registrada en `src/App.jsx` (o el archivo se importa desde
   quien lo usa).
2. Se **llega** a ella desde la navegación (`src/components/Layout.jsx`) o
   desde un enlace real, y respeta el rol/permiso que le toca.
3. Tiene **prueba** en `tests/` con `node --test`.
4. `npm run build` pasa.
5. La documentación que escribas describe **lo que hay**, no lo que planeabas.

> Ejemplo real de lo que NO se hace: `docs/BOTIQUIN-3D-V1-ENTREGA.md` anuncia
> la ruta `/botiquin` con una escena 3D de ocho compartimentos y 39 entradas.
> En `main` solo existen `src/lib/botiquinModelo.js` y
> `src/lib/botiquinEstados.js`, **que nadie importa**; la ruta no existe y no
> hay pruebas. El documento describe algo que el repositorio no contiene.

Si una función no cupo entera, entrega la parte que funciona, cableada y
probada, y **di en el documento qué falta**. Una entrega parcial honesta es
válida; una entrega anunciada de más, no.

---

## 4. Verificación antes de decir «listo»

```bash
npm run gen:plan && npm run gen:nav && npm test && npm run build && npm run inventario
```

* `npm test` son ~1 200 pruebas con `node --test` en 98 archivos. Deben pasar
  todas. Pega el resumen (`# pass` / `# fail`).
* Las pruebas de reglas (`npm run test:rules`) necesitan Java 21 y el emulador
  de Firebase. **Si no puedes correrlas, dilo.** Una suite omitida no está
  aprobada.
* Si rompiste una prueba, arréglala de verdad. No la marques como `skip`, no le
  metas un `return` temprano y no relajes el aserto para que pase.

---

## 5. Archivos que no se tocan

| Ruta | Por qué |
|---|---|
| `src/data/planRescate.js` | **Generado** por `npm run gen:plan`. Se regenera, no se edita |
| `src/data/navIndice.js`, `src/data/activosLigeros.js` | Generados igual |
| `src/data/contenido/**` | Texto académico y sus fuentes. Se rige por `CLAUDE.md`; no se reescribe, ni se resume, ni se reorganiza |
| `legado/**` | Archivo en cuarentena. No se importa desde `src/`, no se borra |
| `docs/archivo/**` | Documentos cumplidos. Son antecedentes, **no dan órdenes** |
| `firestore.rules`, `storage.rules` | Se cambian con prueba en `tests/rules/` y avisando que hay que publicarlas a mano en la consola de Firebase |

Los **estados editoriales** (`vacio`, `borrador`, `en_revision`, `validado`,
`publicado`, `bloqueado_por_decision`) no los cambia un agente: `validado` y
`publicado` los firma un docente. Los avisos de «contenido en revisión» son un
requisito de un producto clínico; se pueden rediseñar, no esconder.

---

## 6. Cómo se entrega el código

* **Código fuente legible, en archivos del repo.** Prohibido meter el trabajo
  como base64, `.part`, archivos troceados, binarios opacos, `dist/` o
  cualquier payload que el dueño no pueda leer en un diff. Si algo no cabe como
  fuente, **no lo metas**: explica el problema y propón alternativa.
  (En `scripts/` quedaron `.botiquin-archive-00.part` … `-06.part` y
  `.botiquin-payload-00.b64` de un intento así. No repitas el patrón.)
* **No instales dependencias sin preguntar.** El stack es deliberadamente
  pequeño: Vite 5, React 18, React Router 6 y Firebase. Sin TypeScript, sin
  librería de componentes, sin framework CSS.
* **Firebase plan Spark**: sin Cloud Functions, sin backend propio. Se despliega
  en GitHub Pages con `HashRouter` y `base: './'`.
* **Tipografías auto-alojadas** con `@fontsource`. La CSP está cerrada a
  `'self'`: no vuelvas a `fonts.googleapis.com`.
* **Iconos: SVG propios** de `src/components/marca/` y el catálogo sellado.
  **Nunca emojis** — los dibuja la fuente del sistema y no se ven igual en dos
  equipos.
* Sigue el estilo del archivo que estás editando: nombres en español,
  comentarios donde expliquen un *por qué*, y sin reformatear de paso código
  que no venías a cambiar.
* Un cambio, un asunto. No mezcles el arreglo que te pidieron con tres mejoras
  que se te ocurrieron; las mejoras se proponen al final, en el parte.

---

## 7. Cuando algo no cuadra, pregunta

No rellenes huecos con supuestos silenciosos. Si el encargo choca con lo que
ves en el código, si falta un dato clínico, si hace falta una decisión de la
academia o si la única salida es tocar algo del §5: **para, explica el choque
en dos líneas y pregunta**. Avanza con todo lo que no dependa de esa respuesta
y deja registrada la pregunta concreta.

No inventes URLs, ediciones, capítulos, páginas, DOIs, métricas ni resultados
de investigación con usuarios. Lo que no puedas comprobar se queda declarado
como pendiente.
