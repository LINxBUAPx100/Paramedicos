# PTEM

**Plataforma de estudio de Atención Prehospitalaria y Cuidados Críticos**, construida sobre el plan de estudios oficial de la academia **R.E.S.C.A.T.E.** (enfoque México).

No es un cuestionario más: es material para **estudiar a fondo** —fisiología, farmacología y correlación clínica que explican el *porqué* de cada intervención— con el avance de cada alumno a la vista de su maestro. Multiacademia desde el primer día: cada escuela tiene su propio temario, sus grupos y sus permisos.

---

## El temario

**7 módulos · 56 unidades · 287 temas** del plan oficial (88 semanas, 440 horas). De esos 287 nodos, **268 son lecciones con material estudiable**, 14 son nodos de evaluación (12 exámenes y 2 prácticas, que no llevan prosa) y 5 están detenidos esperando una decisión de la academia.

| # | Módulo | Unidades | Temas |
|---|--------|---------:|------:|
| 1 | Propedéutico | 4 | 21 |
| 2 | El cuerpo humano | 7 | 21 |
| 3 | Evaluación inicial y soporte vital | 7 | 35 |
| 4 | Manejo de urgencias médico-quirúrgicas | 13 | 61 |
| 5 | Emergencias traumatológicas | 12 | 102 |
| 6 | Poblaciones especiales | 9 | 43 |
| 7 | Operaciones especiales | 4 | 4 |

En total: **944 preguntas**, **1 428 flashcards** y **1 127 conceptos** del glosario.

### Estado editorial: la pregunta que el tamaño no contesta

Cada tema declara **de dónde salió su material y quién responde por él**. No se deduce de cuántos campos tiene —eso ya se intentó y llamó «completo» a temas armados mezclando tres lecciones distintas—: se declara.

| Estado | Qué significa | Qué ve el alumno |
|---|---|---|
| `vacio` | El plan lo pide, nadie lo ha escrito | «Contenido aún no disponible» |
| `borrador` | Hay material, sin revisar | Aviso de contenido en revisión |
| `en_revision` | Redactado y con fuentes, esperando firma | Aviso de contenido en revisión |
| `validado` / `publicado` | Un docente firmó por él | Sin advertencias |
| `bloqueado_por_decision` | La academia debe definir su alcance | La pregunta abierta, en voz alta |

**Solo `validado` y `publicado` aportan reactivos a los exámenes del plan.** Un borrador puede estudiarse; no puede calificarte.

### Revisión docente

Cada tema lleva tres acciones: **Validar · Corregir · Reportar**.

- **Validar** firma el tema y **lo aplica en el acto**: el alumno deja de ver el aviso de revisión y el tema entra en el banco de examen de su unidad. Solo pide un responsable con nombre —ya viene relleno— y los comentarios del docente. Las fuentes citadas y la lista de repaso suman, pero no bloquean; cuando no se citan fuentes, la traza del propio acto de revisión ocupa su lugar, así que nada asciende sin responsable ni fecha. Se puede **retirar**.
- **Corregir** deja en cola qué hay que cambiar, con firma.
- **Reportar** es de cualquiera con sesión: una imagen rota, un enlace caído.

Quién puede firmar: el director y el super-admin por su rol; un profesor, con un **pase de revisión temporal** que caduca solo (máximo 120 días) y que no concede editar, publicar ni borrar nada.

---

## La plataforma

### Cuentas, academias y grupos
- Roles: `alumno`, `instructor` (profesor), `admin_escuela` (director), `superadmin`.
- Alta por **código de academia/grupo**, con tarjeta de invitación para WhatsApp o enlace.
- Los códigos solo los ven el director y el super-admin; un profesor puede pedirlos y el director aprueba.
- **Un profesor lleva varios grupos**; un alumno pertenece a uno solo, que define su plan de estudios.
- **Visibilidad por grupo**: el staff decide qué módulos y temas ve cada grupo, y lo oculto sale censurado también en Logros.
- **Códigos de prueba** con caducidad, que se apagan solos en la sesión abierta.

### Contenido por academia
- Cada academia recibe una **copia** del temario clonada de una **plantilla versionada**; editarla no toca a las demás.
- **Replicación** de cambios de la plantilla a las academias, con análisis previo, detección de cambios locales y reversión.
- **Permisos editoriales granulares** del profesor: editar contenido, crear temas, editar exámenes, editar actividades, administrar recursos, publicar — uno por uno y por curso.
- **Programas de andamio**: una academia puede impartir varias carreras y certificaciones; el temario que se sirve depende del programa del grupo.

### Estudio y evaluación
- Lecciones con párrafos, listas, pasos, tablas, fórmulas, *callouts*, conceptos clave, flashcards, quiz y **actividades** derivadas de la propia lección.
- **Glosario del temario**: cada tecnicismo subrayado dentro de una lección lleva a su definición, y las palabras se descubren conforme el profesor libera los temas.
- **Logros**: galería de imágenes del temario con la misma regla de descubrimiento.
- Examen general, por módulo y por unidad del plan, con alcance temporal respetado.
- Progreso sincronizado, modo claro/oscuro y diseño responsivo.

### Paneles
- **Director y profesor**: avance por alumno y módulo, promedio, aprobación, dominio, alumnos en riesgo, gestión de miembros y grupos, solicitudes de acceso y cola de dictámenes.
- **Super-admin**: consola global de academias, usuarios, planes, anuncio global, reportes y replicación de contenido.

---

## Tecnologías

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [React Router](https://reactrouter.com/) (`HashRouter`, compatible con GitHub Pages).
- [Firebase](https://firebase.google.com/): Auth + Firestore (plan Spark). El SDK entra por *import* dinámico para no engordar el arranque.
- CSS puro con sistema de diseño y temas por variables. Sin TypeScript.
- Iconografía médica en SVG propios, catalogados con licencia, crédito y hash sellado — **nunca emojis**: los dibuja la fuente del sistema y no se ven igual en dos equipos.

### Cómo está organizado

| Carpeta | Qué hay |
|---|---|
| `src/lib/` | **Lógica pura**, sin React ni Firebase. Es donde vive lo que se prueba |
| `src/lib/firebase/` | Única puerta de escritura a Firestore, con transacciones e historial |
| `src/data/contenido/` | El temario redactado, un archivo por unidad |
| `src/data/planRescate.js` | **Generado.** No se edita a mano |
| `scripts/` | Generadores, inventario, matriz de decisiones y pipeline de activos |
| `tests/` | 800+ pruebas con `node --test`; `tests/rules/` corre contra el emulador |

---

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produce /dist (prebuild regenera plan e índice)
npm run preview
```

Verificación completa de cualquier cambio:

```bash
npm run gen:plan && npm run gen:nav && npm test && npm run build && npm run inventario
```

Las pruebas de **reglas de seguridad** necesitan Java 21 y el emulador:

```bash
npm run test:rules
```

> Una suite que se omite **no** está aprobada. Si el emulador no arranca, dilo; el CI lo comprueba.

### Scripts que conviene conocer

| Comando | Para qué |
|---|---|
| `npm run gen:plan` | Regenera `planRescate.js` desde el contenido redactado |
| `npm run gen:nav` | Regenera el índice de navegación |
| `npm run inventario` | Estado real del temario: qué hay, qué falta, en qué estado |
| `npm run matriz` | Matriz de decisiones por tema para revisión docente |
| `npm run activos:importar` | Pipeline de iconos médicos (requiere `svgo`) |
| `npm run replicar` | Replica una plantilla a las academias (en seco por defecto) |

---

## Firebase

La configuración del cliente está incrustada en `src/lib/firebase/init.js` — es pública por diseño; **la seguridad la dan las reglas** de `firestore.rules` y `storage.rules`. Guía completa de roles, academias, códigos y reglas en **[FIREBASE.md](./FIREBASE.md)**.

> Tras cambiar `firestore.rules` hay que **publicarlas** en la consola de Firebase. Si no, los paneles fallan con *permission-denied* y el síntoma no dice por qué.

Dos invariantes que no se rompen:

1. **Una academia migrada nunca cae al temario del paquete.** Servirle el genérico le enseñaría contenido ajeno creyendo que es el suyo, y en silencio.
2. **El grupo de un alumno es uno solo.** Lleva el programa, que decide qué temario lee.

---

## Despliegue

1. **Settings → Pages → Source: GitHub Actions**.
2. Cada *push* a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica.
3. `HashRouter` y `base: './'`: funciona en cualquier subruta sin configuración extra.

---

## Documentación

| Documento | Qué gobierna |
|---|---|
| **[docs/PLAN-TECNICO-FASES.md](./docs/PLAN-TECNICO-FASES.md)** | El **único calendario**: qué se hace y en qué orden |
| **[PLAN-LMS.md](./PLAN-LMS.md)** | Detalle de arquitectura, modelos de datos y decisiones |
| **[CLAUDE.md](./CLAUDE.md)** | El trabajo **editorial**: cómo se redacta y valida el temario |
| **[FIREBASE.md](./FIREBASE.md)** | Roles, colecciones y reglas |
| **[docs/AUDITORIA-ACADEMICA-PTEM.md](./docs/AUDITORIA-ACADEMICA-PTEM.md)** | Qué se encontró mal en el contenido y por qué |

---

## Una advertencia sobre el contenido clínico

El material se redacta con fuentes citadas —normas mexicanas vigentes, guías de las sociedades responsables del estándar, la edición exacta del manual aprobado— y declara su fecha de corte. Aun así:

**Ninguna dosis, tiempo ni procedimiento de esta plataforma sustituye al protocolo del servicio, a la dirección médica ni al alcance profesional de quien atiende.** Un tema en `borrador` o `en_revision` todavía no lo ha firmado nadie, y la aplicación lo dice en la propia página. La IA prepara contenido candidato; **la academia valida y autoriza**.
