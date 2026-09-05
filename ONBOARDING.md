# Bienvenido a PTEM

Esta guía es para tu **primer día**. En media hora deberías tener el proyecto
corriendo, saber dónde está cada cosa y —lo más importante— conocer las cuatro
o cinco trampas que este repositorio tiene y que no se ven leyendo el código.

Cuando termines aquí, el mapa completo está en
[`README.md`](./README.md) (qué es el producto) y en
[`docs/PLAN-TECNICO-FASES.md`](./docs/PLAN-TECNICO-FASES.md) (qué se hace y en
qué orden).

---

## 1. Qué es esto, en cuatro frases

PTEM es una **plataforma de estudio de atención prehospitalaria**, construida
sobre el plan de estudios oficial de la academia R.E.S.C.A.T.E.: 7 módulos, 56
unidades, 287 temas. No es un cuestionario: es material para estudiar a fondo,
con el avance de cada alumno a la vista de su maestro.

Es **multiacademia** desde el primer día: cada escuela tiene su propio temario,
sus grupos y sus permisos. Hoy solo se trabaja para R.E.S.C.A.T.E.; la venta a
otras academias es un objetivo a futuro.

Son **dos proyectos que avanzan por separado** y conviene no confundirlos:

| | Qué es | Dónde se gobierna |
|---|---|---|
| **Técnico** | La plataforma: paneles, grupos, exámenes, recepción, cobros | `docs/PLAN-TECNICO-FASES.md` |
| **Editorial** | Redactar y validar las 287 lecciones | `CLAUDE.md` |

El software funciona sin que se escriba una línea de temario nuevo, y el temario
se carga encima cuando está listo. Si te toca uno, no necesitas leer el otro.

---

## 2. Arrancarlo

Necesitas **Node 22 o superior** (el `npm test` usa el *glob* de `node --test`,
que llegó en la 21).

```bash
npm install
cp .env.example .env
```

Rellena en `.env` los dos valores que faltan —`VITE_FIREBASE_API_KEY` y
`VITE_FIREBASE_APP_ID`—; te los pasa el dueño del proyecto desde la consola de
Firebase. El resto ya viene puesto. **El build se detiene si falta alguno**, a
propósito: publicar una app que no puede conectarse es peor que no publicar.

```bash
npm run dev      # http://localhost:5173
```

Para trabajar sin tocar producción, levanta el emulador y siembra usuarios de
prueba:

```bash
npm run emu
npm run seed:usuarios
```

---

## 3. Cómo se verifica cualquier cambio

Esto no es opcional, y es lo que corre el CI en cada rama:

```bash
npm run gen:plan && npm run gen:nav && npm test && npm run build && npm run inventario
```

Las **reglas de seguridad** se prueban aparte porque necesitan Java 21 y el
emulador de Firebase:

```bash
npm run test:rules
```

> Una suite que se omite **no** está aprobada. Si el emulador no arranca, dilo
> en el PR; no la des por buena.

---

## 4. Las trampas que te van a morder

Estas son las que cuestan una tarde si nadie te las cuenta.

### `src/data/planRescate.js` está generado — no lo edites

Son 4,4 MB de temario ensamblado. Se regenera con `npm run gen:plan` desde
`src/data/contenido/*.js` y `scripts/seed/plan-rescate.json`. Editarlo a mano
funciona hasta que alguien regenera y tu cambio desaparece sin dejar rastro.
Lo mismo con `navIndice.js`, `activosLigeros.js` y `demoPortada.js`.

### `legado/` es un archivo, no código

Ahí vive el temario **anterior** y el corpus que se intentó repartir
automáticamente sobre el plan oficial. Nada de eso llega al alumno y nada se
importa desde `src/`. No lo borres —es trazabilidad— y sobre todo **no lo
vuelvas a repartir por similitud de palabras**: eso ya se hizo, y dejó 85 de 202
temas mezclando piezas de tres lecciones distintas, con dosis contradictorias.
Detalle en [`legado/README.md`](./legado/README.md).

### El temario ya no viaja en el JavaScript publicado

Durante meses el sitio publicaba las 287 lecciones y el banco de exámenes
completo: cualquiera descargaba un archivo y se quedaba con todo, sin cuenta.
Eso se cerró, y hay pruebas que **impiden** que vuelva —`fugaDelBundle.test.mjs`
y `pesoDeLaEntrada.test.mjs`—. Si añades un `import` en la ruta de pintado y
alguna falla, no es un falso positivo: acabas de reabrir la fuga.

### `docs/archivo/` no da órdenes

Son documentos cumplidos. Varios son prompts que piden redactar lotes de
lecciones **que ya están escritas**. Se conservan porque explican por qué el
proyecto es como es. Lo vigente está en `docs/`, a secas.

### Nada de emojis en la interfaz

Hay una prueba que lo impide (`sinEmojis.test.mjs`), y no es estética: un emoji
lo dibuja la fuente del sistema, no responde al tema claro/oscuro, un lector de
pantalla lo lee en voz alta en mitad del título, y en el temario había casos
directamente incorrectos. Usa los iconos de `Icon.jsx` o los activos anatómicos.

### El estado editorial de un tema no es su tamaño

Un tema «completo» solo significa que tiene los campos mínimos. Que sea correcto
lo dice su **estado editorial** —`borrador`, `en_revision`, `validado`…— y solo
un docente puede firmarlo. **Únicamente `validado` y `publicado` aportan
preguntas a los exámenes.** Un borrador puede estudiarse; no puede calificarte.

---

## 5. Dónde está cada cosa

| Carpeta | Qué hay |
|---|---|
| `src/lib/` | **Lógica pura**, sin React ni Firebase. Es donde vive lo que se prueba |
| `src/lib/firebase/` | Única puerta de escritura a Firestore, con transacciones e historial |
| `src/pages/`, `src/components/` | La interfaz |
| `src/data/contenido/` | El temario redactado, un archivo por unidad |
| `scripts/` | Generadores, inventario, matriz de decisiones, pipeline de activos |
| `tests/` | 1 100+ pruebas con `node --test`; `tests/rules/` contra el emulador |
| `legado/`, `docs/archivo/` | Archivo. Se lee, no se ejecuta |

La convención que más ayuda a orientarse: **la lógica que se puede probar sin
navegador vive en `src/lib/`**, y la capa de Firebase está aislada en
`src/lib/firebase/`. Si una función necesita `window` o un `useState`, está en el
sitio equivocado.

---

## 6. Cómo se trabaja aquí

- **Ramas.** `main` despliega a producción en cada *push* (GitHub Actions). Abre
  rama para cualquier cosa que no sea trivial.
- **Commits.** En español, en imperativo o descriptivo, con el ámbito delante:
  `feat(O1): la matrícula se emite desde el panel`. Mira `git log` y copia el
  tono: los mensajes de este repo cuentan **qué cambió para el usuario**, no qué
  archivo se tocó.
- **Comentarios.** El código de este proyecto explica *por qué*, no *qué*. Varios
  archivos empiezan con un bloque que cuenta el problema que resolvieron y qué
  pasa si alguien lo deshace. Mantén esa costumbre: es la que evita que se
  repitan los errores caros.
- **Pruebas.** Cuando arregles algo delicado, deja una prueba que **impida** la
  regresión, no una que la mida. Es el patrón de toda la suite.

---

## 7. Qué leer, y en qué orden

1. Esto.
2. [`README.md`](./README.md) — el producto y el temario.
3. [`docs/PLAN-TECNICO-FASES.md`](./docs/PLAN-TECNICO-FASES.md) — el **único**
   calendario. Empieza por «Estado en una tabla».
4. [`FIREBASE.md`](./FIREBASE.md) — roles, colecciones, reglas. Antes de tocar
   cualquier permiso.
5. [`PLAN-LMS.md`](./PLAN-LMS.md) — el detalle de arquitectura. Es largo; se
   consulta, no se lee de corrido.
6. [`CLAUDE.md`](./CLAUDE.md) — **solo si vas a tocar el temario.**

---

## 8. Una advertencia que no es formulismo

Esto es material clínico. **Ninguna dosis, tiempo ni procedimiento de la
plataforma sustituye al protocolo del servicio, a la dirección médica ni al
alcance profesional de quien atiende.**

Si vas a escribir o corregir contenido: no inventes una cifra, una edición, un
capítulo ni una URL. Si no puedes comprobarlo, se deja como pendiente. Un dato
inventado en una app médica es peor que un hueco, porque el hueco se ve.
