# Refactor: Programas, Módulos y temario oficial R.E.S.C.A.T.E.

> Estado: **ENTREGAS A, B, C y D IMPLEMENTADAS** (§8-§12). Falta la E (contenido).
> Decisiones del dueño del producto tomadas el 2026-08-15 (§0).
> Semilla del temario: `scripts/seed/plan-rescate.json` (extraída del PDF oficial).
> Contexto previo: `PLAN-LMS.md` §9, §12, §20 y `docs/EDITOR-CONTENIDO.md`.

---

## 0. Decisiones tomadas

| # | Pregunta | Decisión |
|---|---|---|
| 1 | Unidad estudiable | **La viñeta del PDF.** 287 temas repartidos entre los módulos. El costo de Firestore no es una restricción: no habrá más academias por ahora, y las futuras traerán su propio contenido. |
| 2 | Alumno sin grupo | **No ve contenido.** Cualquier intento de entrar a contenido lo lleva a la pantalla de introducir código para unirse a un grupo. |
| 3 | Tipado | **JSDoc en módulo puro**, no TypeScript (razones en §2). |
| 4 | Primera entrega | **Renombrado Fase → Módulo**, sabiendo que el catálogo de contenido se ampliará con otros planes de estudio dentro de la MISMA academia (no es contenido para otras academias). |

Consecuencia directa de la decisión 1: la fila TEMA del PDF (*Evaluación
primaria*, *Manejo de vía aérea*…) **no puede desaparecer**. 287 temas planos
bajo 7 módulos son ~41 por módulo en el sidebar — innavegable, y la prioridad
declarada es la experiencia de usuario. Esa fila pasa a ser un nivel intermedio
real, la **Unidad**, que ocupa exactamente el hueco del `modulos[]` implícito que
ya existe hoy (`contenidoModelo.js:70`). **No se añade profundidad**: se renombran
los niveles y se llena el que estaba vacío.

---

## 1. Nueva jerarquía

```
Programa            (= doc `cursos` de hoy)
  └─ Módulo         (= "MÓDULO 1: PROPEDÉUTICO"; antes "Fase")          7
       └─ Unidad    (= fila TEMA del PDF; agrupa y lleva semanas/horas) 56
            └─ Tema (= viñeta SUBTEMAS; ESTUDIABLE: URL, quiz,         287
                       flashcards, progreso, intento de examen)
```

| Hoy (`FaseEstr`) | Propuesto | Nota |
|---|---|---|
| `Fase` | **`Modulo`** | Renombrado. Mismo nivel, mismos campos. |
| `Modulo` (implícito `principal`) | **`Unidad`** | Deja de ser implícito y pasa a ser un nivel real con contenido propio. |
| `Tema` | **`Tema`** | Sigue siendo la unidad con página y progreso; ahora hay 287 en vez de 68. |

La Unidad **no es estudiable**: no tiene página, ni quiz, ni progreso. Agrupa
temas y transporta los datos oficiales de carga (`semanas`, `horas`,
`sesiones[]`). En el sidebar es un encabezado plegable.

### Granularidad por día

Cada tema lleva `sesion:number|null` y cada unidad `sesiones:[{n,semanas,horas}]`.
Donde el PDF parte una unidad en varias filas con sus propias semanas/horas
(Farmacología, Gineco-obstétricas) el campo ya viene poblado; en el resto queda
`null` para que lo asigne el instructor desde el editor. El PDF no publica esa
asignación, así que **no se inventa**.

### AVDI y Escala de Glasgow

Quedan resueltos como pediste, en temas y módulos distintos:

- `m3-ep-avdi` → Módulo 3 › *Evaluación primaria* › **AVDI**
- `m5-tcc-glasgow` → Módulo 5 › *Trauma de cráneo y columna* › **Escala de coma de Glasgow**

---

## 2. Tipos (JSDoc, no TypeScript)

Decisión 3. El repo es JS puro (`PLAN-LMS.md` §1) con 138 pruebas y una entrada
de 82.9 KB gzip medida y documentada. TypeScript no aporta nada en runtime:
añadiría build, tocaría los 138 tests y pondría en riesgo un presupuesto de
bundle que ya está ajustado. JSDoc da el mismo autocompletado en el editor con
cero costo, y la verificación real la siguen dando las pruebas puras — que es el
patrón que ya usan `capacidades.js`, `homeModelo.js`, `editorModelo.js` y
`permisosEditor.js`.

Los tipos viven como JSDoc en **`src/lib/programasModelo.js`** (módulo puro nuevo).
Se transcriben aquí en sintaxis TS solo por legibilidad:

```ts
// ─── Catálogo de programas ────────────────────────────────────────────────
type TipoPrograma =
  | 'tum'            // TUM / TEM
  | 'enfermeria'
  | 'tsu'
  | 'licenciatura'
  | 'curso'          // talleres, actualizaciones, temas específicos
  | 'certificacion'

interface MetaTipoPrograma {
  id: TipoPrograma
  etiqueta: string           // "Técnico en Urgencias Médicas (TUM/TEM)"
  etiquetaCorta: string      // "TUM/TEM"
  esCarrera: boolean         // tum, enfermeria, tsu, licenciatura → true
  certificable: boolean
  color: string
  icono: string
}

// ─── Estructura ligera del programa (doc `cursos`, 1 lectura) ─────────────
type EstadoNodo = 'borrador' | 'publicado' | 'archivado'
type TipoTema   = 'contenido' | 'examen' | 'practica'

interface ProgramaDoc {
  academiaId: string
  plantillaId: string
  titulo: string
  tipoPrograma: TipoPrograma                        // ← NUEVO
  tipoDestino: 'basico' | 'avanzado' | 'medicina'   // ya existe
  estado: EstadoNodo
  orden: number
  estructura: ModuloEstr[]                          // ← antes FaseEstr[]
}

interface ModuloEstr {              // ← ex-FaseEstr
  id: string                        // 'm1-propedeutico'
  titulo: string
  subtitulo: string
  descripcion: string
  color: string
  icono: string
  estado: EstadoNodo
  totales?: { semanas: number; horas: number }      // ← NUEVO
  unidades: UnidadEstr[]            // ← ex `modulos[]`, ya no implícito
}

interface UnidadEstr {              // ← ex Modulo implícito · fila TEMA del PDF
  id: string
  titulo: string
  estado: EstadoNodo
  tipo: TipoTema                    // ← NUEVO
  semanas?: number
  horas?: number
  opcional?: boolean                // ← NUEVO (M2 "ANATOMÍA OPCIONAL")
  sesiones?: { n: number; semanas: number; horas: number }[]   // ← NUEVO
  grupos?: string[]                 // ← NUEVO ("Métodos mecánicos", "Columna"…)
  temas: TemaEstr[]
}

interface TemaEstr {                // metadatos dentro de la estructura
  id: string
  titulo: string
  estado: EstadoNodo
  grupo?: string | null             // ← NUEVO
  sesion?: number | null            // ← NUEVO
}

// ─── Contenido del tema (doc `temas`, 1 lectura al abrir) ─────────────────
interface TemaDoc {
  academiaId: string
  cursoId: string                   // = programaId
  temaId: string
  moduloId: string                  // ← NUEVO, denormalizado
  unidadId: string                  // ← NUEVO, denormalizado
  grupo: string | null              // ← NUEVO
  sesion: number | null             // ← NUEVO
  // …campos actuales sin cambios: titulo, resumen, objetivos, secciones,
  //    conceptosClave, flashcards, quiz, recursos, actividades, estado, version…
}
```

`moduloId` y `unidadId` van denormalizados en el doc del tema para no tener que
recorrer la estructura completa al abrir `/tema/:id`. La estructura sigue siendo
la fuente de verdad del **orden**; estos campos solo responden "¿de quién cuelgo?".

---

## 3. Cambios exactos en el esquema de Firestore

### 3.1 `cursos/{academiaId__plantillaId}` — el "Programa"

| Campo | Acción | Valor |
|---|---|---|
| `tipoPrograma` | **NUEVO** | `tum \| enfermeria \| tsu \| licenciatura \| curso \| certificacion`. Ausente ⇒ `'tum'`. |
| `estructura[]` | **CAMBIA FORMA** | `ModuloEstr[]`; `modulos[]` → `unidades[]`. |
| `estructura[].totales` | **NUEVO** | `{semanas, horas}` |
| `estructura[].unidades[].tipo/semanas/horas/opcional/sesiones/grupos` | **NUEVOS** | del PDF |
| resto (`plantillaId`, `estado`, `orden`, `clonacion`, `origen`, `versionOrigen`) | sin cambio | — |

**Retrocompatibilidad de `estructura`**: una sola función pura
`normalizarEstructura()` acepta ambos formatos — si un nodo trae `modulos[]` se
lee como `unidades[]`; si trae `unidades[]` se usa directo. Sin migración forzada
de datos. Es el mismo patrón *fail-open* de `homeModelo.js`.

### 3.2 `temas/{academiaId__plantillaId__temaId}`

| Campo | Acción |
|---|---|
| `moduloId`, `unidadId`, `grupo`, `sesion` | **NUEVOS**, aditivos |
| resto | sin cambio |

Aditivos ⇒ los 68 temas legacy siguen validando sin tocarlos.

### 3.3 `grupos/{GRP-XXXX}` — el control de acceso

| Campo | Acción | Detalle |
|---|---|---|
| `programaId` | **NUEVO** | `cursoId` del programa. **Es la definición del "tipo de alumno".** |
| `tipoPrograma` | **NUEVO, denormalizado** | copia de `cursos.tipoPrograma`; permite filtrar listas de grupos sin leer cursos. |
| `programasExtra[]` | **NUEVO, opcional** | otros `cursoId` accesibles (ej.: las 2 especializaciones obligatorias del TUM). |
| `fasesOcultas[]` → `modulosOcultos[]` | **RENOMBRADO** | §4 |
| `temasOcultos[]` | sin cambio | — |

Un grupo pertenece a **un** programa (+ extras explícitos); un alumno pertenece a
un grupo. El acceso queda definido sin campos nuevos en `usuarios`.

### 3.4 Alumno sin grupo (decisión 2)

`useVisibilidad.js:26` hoy hace lo contrario: sin grupo, ve todo. Nuevo
comportamiento:

- **Sin grupo ⇒ sin programa ⇒ sin contenido.** Ni módulos, ni temas, ni examen,
  ni flashcards, ni atlas, ni búsqueda.
- `RutaProtegida` gana una condición: sesión válida **y** grupo con programa. Si
  falta el grupo, redirige a la pantalla de canje de código (`/cuenta`) con un
  mensaje explícito ("Necesitas un código de grupo para acceder al contenido"),
  no a un 403 seco.
- Las reglas de Firestore lo imponen también en servidor: sin `grupoId` no hay
  lectura de `cursos` ni `temas`.

**Consecuencia que hay que aceptar a propósito:** hoy se puede entrar a una
academia por código de academia (vía 1 de `PLAN-LMS.md` §5) o por código de
prueba y quedar **sin grupo**. Esas personas dejarán de ver contenido hasta que
un director les asigne grupo o canjeen un código de grupo. Es exactamente lo que
pediste; lo dejo señalado porque afecta a las cuentas de prueba existentes.

### 3.5 `usuarios/{uid}`

| Campo | Acción |
|---|---|
| `fasesDesbloqueadas[]` → `modulosDesbloqueados[]` | **RENOMBRADO** (§4) |
| `permisosEditor.cursosPermitidos[]` | sin cambio (ya es por curso = por programa) |

Sin campo de programa en el usuario: se deriva del grupo, para que no haya dos
fuentes de verdad que se desincronicen (sin Cloud Functions en Spark, un permiso
rancio sería un fallo de aislamiento).

### 3.6 `intentos`, `solicitudes`

| Colección | Campo | Acción |
|---|---|---|
| `intentos` | `faseId/faseNumero/faseTitulo` → `moduloId/moduloNumero/moduloTitulo` | **RENOMBRADO**. Los docs viejos son inmutables (`update:false`), así que los lectores deben aceptar ambos: `d.moduloId ?? d.faseId`. |
| `intentos` | `programaId` | **NUEVO**, para segmentar analítica por programa |
| `solicitudes` | `tipo:'modulo'` | ya se llamaba así; ahora por fin coincide con la realidad. **No se toca.** |

### 3.7 Reglas de Firestore — aislamiento por programa

```js
function miGrupo() {
  return get(/databases/$(database)/documents/grupos/$(miDoc().grupoId)).data;
}
function programasDeMiGrupo() {
  return [miGrupo().programaId].concat(miGrupo().get('programasExtra', []));
}
function alumnoTieneGrupo() {
  return miDoc().get('grupoId', null) != null;
}
function alumnoPuedeLeerCurso(curso) {
  return alumnoTieneGrupo()
      && curso.academiaId == miDoc().academiaId
      && curso.estado == 'publicado'
      && programasDeMiGrupo().hasAny([curso.__name__ ...]);
}
```

- Firestore **cachea los `get()` dentro de una misma petición**: listar los temas
  de un programa cuesta `miDoc()` + `miGrupo()` una sola vez, no N.
- Deliberadamente **no** se denormaliza `programasPermitidos[]` en `usuarios`
  (§3.5).
- El staff (`esStaffDe`) y el superadmin **no** se filtran por programa.
- Índice compuesto nuevo: `cursos(academiaId, tipoPrograma, estado)`.

---

## 4. Mapa del renombrado Fase → Módulo → Unidad

**Doble renombrado, en este orden** (si solo se hiciera el primero quedaría
`Modulo.modulos[]`):

1. `Modulo` (implícito) → `Unidad` — 92 ocurrencias de `modulos` en 21 archivos.
2. `Fase` → `Modulo` — 1156 ocurrencias de `fase` en 91 archivos.

No es un buscar-y-reemplazar ciego. Colisiones detectadas que **no** deben tocarse:

- `src/data/fase5.js`, `fase6.js` y otros contienen "fase" dentro de **texto
  médico** ("fase de shock").
- `archivosModelo.js`, `baraja.js`, `enlaceSeguro.js`, `capacidades.js` dicen
  "módulo PURO" en comentarios: ahí `módulo` no es el nivel jerárquico.
- `solicitudes.tipo === 'modulo'` ya significa el nivel superior: **se conserva**.
- `src/index.css`: 214 clases `.fase-*` (renombrado cosmético, riesgo nulo pero
  volumen alto).

**URLs** (identidad pública, `PLAN-LMS.md` §2):

| Hoy | Propuesto |
|---|---|
| `/fase/:faseId` | `/modulo/:moduloId` |
| `/fase/:faseId/examen` | `/modulo/:moduloId/examen` |
| `/tema/:temaId` | **sin cambio** |

Con **redirección** de `/fase/*` → `/modulo/*` durante al menos un ciclo: hay
enlaces compartidos por alumnos y el `HashRouter` no perdona (`PLAN-LMS.md` §7.8).

**Renombrados de código:**

| Categoría | Elementos |
|---|---|
| Páginas | `FasePage` → `ModuloPage`, `ExamenFasePage` → `ExamenModuloPage` |
| Componentes | `FasesCarrusel` → `ModulosCarrusel`, `FasesDeAlumno` → `ModulosDeAlumno` |
| Datos puros | `estructuraDesdeFases` → `estructuraDesdeModulos`, `ensamblarFases` → `ensamblarModulos`, `indiceDesdeFases` → `indiceDesdeModulos`, `FaseEstr` → `ModuloEstr` |
| Índice/nav | `fasesNav` → `modulosNav`, `stats.fases` → `stats.modulos` |
| API del resolutor | `fases` → `modulos`, `getFase` → `getModulo`, `preguntasDeFase` → `preguntasDeModulo` |
| Hook | `faseVisible` → `moduloVisible` |
| Campos | `fasesOcultas` → `modulosOcultos`, `fasesDesbloqueadas` → `modulosDesbloqueados` |

**Datos ya escritos en producción.** `grupos.fasesOcultas` y
`usuarios.fasesDesbloqueadas` contienen ids (`fase-1`, `fase-poblaciones`) que
**no existen** en el temario nuevo: renombrar el campo no basta. La clonación del
programa nuevo **reinicia** `modulosOcultos: []` y deja el campo viejo intacto e
inerte (reversible, cero pérdida de datos).

---

## 5. Semilla del temario oficial

`scripts/seed/plan-rescate.json` — 16 programas:

- **`tum-rescate`** (`tipoPrograma:'tum'`): **7 módulos · 56 unidades · 287 temas**,
  88 semanas y 440 horas. Los totales cuadran con los que declara el propio PDF.
  De los 287 temas, **270 salen literalmente de las viñetas del PDF** y **17 son
  generados** (`generado:true`): unidades que el PDF no desglosa — exámenes,
  prácticas y los 4 temas del Módulo 7 — a las que se les crea un tema homónimo
  para que ninguna quede huérfana.
- **15 especializaciones** (módulos 8–22 del PDF) como programas
  `tipoPrograma:'curso'` con `modulos: []`: el PDF no publica su temario.
  ACLS y PHTLS 9 llevan `candidatoCertificacion:true`.

**Fidelidad.** Títulos **verbatim**, con tildes y erratas incluidas. Donde la
grafía es dudosa el nodo lleva `revisar:true` + `notaRevision` con la corrección
propuesta, **sin aplicarla** — 12 casos: `ESCENCIAL`, `Osteólisis` (×2),
`Wadell`, `Kellie Monroe`, `causa equina`, `Brown sequard`, `lefort`,
`desagarres`, `TRAUATISMO`, `URGNCIAS`, `ACENSO`.

**Un solo descuadre aritmético en todo el plan:** Módulo 4 › *Urgencias del
sistema nervioso* declara 2 semanas y **5** horas; el total del módulo que da el
propio PDF (23 sem / 115 h) solo cuadra con **10**. Marcado, no corregido.

El JSON **no** trae contenido pedagógico (secciones, quiz, flashcards): es el
esqueleto oficial. Poblarlo es trabajo del editor.

### Cómo se convierte en documentos

```
plan-rescate.json
  → programaDesdeSemilla()          (nuevo, puro, en programasModelo.js)
  → plantillas/{programaId} + plantillasTemas/{…}      (seed global, super-admin)
  → clonarPlantillaAAcademia()      (ya existe: idempotente, batched)
  → cursos/{acaId__programaId} + temas/{…}
```

Encaja en la tubería existente sin inventar nada. El script
(`scripts/seed-programas.mjs`, dry-run por defecto, `--apply`) sigue el patrón de
`scripts/migrar-contenido.mjs`.

---

## 6. Orden de entrega (una fase por respuesta)

| # | Entrega | Estado |
|---|---|---|
| **A** | `programasModelo.js`: catálogo de los 6 tipos + `normalizarEstructura` (acepta formato viejo y nuevo) + pruebas puras | ✔ **IMPLEMENTADA** (§9) |
| **B** | **Renombrado Fase→Módulo y Modulo→Unidad**, redirección de URLs, compatibilidad con los datos ya escritos | ✔ **IMPLEMENTADA** (§8) |
| **C** | `tipoPrograma` + `programaId` en grupos + alumno sin grupo + reglas de aislamiento + suite de emulador | ✔ **IMPLEMENTADA** (§10) |
| **D** | Seed del temario oficial + clonación a la academia RESCATE | ✔ **IMPLEMENTADA** (§11) |
| **E** | Contenido de los 287 temas (editor) | operativo — no es código |

---

## 8. ENTREGA B — Renombrado (implementada)

Renombrado DOBLE aplicado con un codemod de listas curadas + repaso manual:
**87 archivos** en el pase mecánico, más las correcciones que se describen abajo.

### Compatibilidad con datos ya escritos — `src/lib/compatNombres.js` (nuevo)

Lo más importante de la entrega. Tres campos ya existen en Firestore con el
nombre viejo, y leerlos solo por el nombre nuevo habría fallado **en silencio**:

| Documento | Campo viejo | Campo nuevo | Consecuencia si no se traduce |
|---|---|---|---|
| `grupos/{id}` | `fasesOcultas` | `modulosOcultos` | el grupo empieza a MOSTRAR los módulos que tenía ocultos |
| `usuarios/{uid}` | `fasesDesbloqueadas` | `modulosDesbloqueados` | el alumno pierde los módulos que su profesor le habilitó |
| `intentos/{id}` | `faseId/faseNumero/faseTitulo` | `moduloId/…` | los intentos guardados pierden a qué módulo pertenecían |

La traducción se hace UNA vez, en el punto de lectura de cada colección
(`firebase/grupos.js`, `firebase/intentos.js`, `AuthContext`), y el resto de la
app solo conoce los nombres nuevos. Gana siempre el nombre nuevo si está
presente; el viejo **no se borra** (revertir no pierde datos). `intentos` es
inmutable por regla, así que su traducción es permanente, no transitoria.
Cubierto por `tests/compatNombres.test.mjs` (9 pruebas).

### URLs

`/fase/:id` y `/fase/:id/examen` redirigen con `replace` a `/modulo/…`
(`RedirigirModulo` en `App.jsx`). Verificado en navegador:
`#/fase/fase-1` → `#/modulo/fase-1`. `/tema/:id` no cambia.

### El bundle legacy NO se renombró (deliberado)

`src/data/{fase,extraFase}N.js`, `registro.js`, `imagenes.js` y
`recursosDescarga.js` conservan la nomenclatura vieja: son el temario ficticio
que el oficial va a reemplazar, y contienen la palabra «fase» dentro de **texto
médico** («fase de shock»). La traducción se hace en el único punto de entrada,
`src/data/index.js` (`{ fase } → modulo`). Los ids de contenido (`fase-1`,
`fase-poblaciones`) son **identidad estable** de URL y progreso: no se tocan.

### Trampas encontradas y resueltas

1. **`src/data/navIndice.js` es GENERADO**: el codemod le cambió los ids de
   datos y el texto de las descripciones. Se revirtió y se regeneró con
   `npm run gen:nav`.
2. **Ids de contenido incrustados en el código**: `Home.jsx` y `Layout.jsx`
   enlazaban a `/fase/fase-1`, que el codemod convirtió en `/modulo/modulo-1`
   (id inexistente). Ahora el primer módulo se deriva del ÍNDICE — más robusto
   de cara al temario oficial.
3. **`solicitudes.tipo == 'modulo'`**: valor PERSISTIDO que ya significaba el
   nivel superior. El codemod lo convirtió a `'unidad'` en `firestore.rules`
   mientras el cliente seguía escribiendo `'modulo'` → un profesor no habría
   podido aprobar solicitudes. Revertido y documentado en la propia regla.
4. **Género gramatical**: «fase» es femenino y «módulo» masculino («una fase» →
   «un módulo»); «módulo» era masculino y «unidad» es femenino. El pase
   mecánico dejó «una modulo» y «un unidad» por todo el código.
5. **Prefijo de semilla de examen**: pasó de `fase-N-…` a `modulo-N-…`. Las
   semillas guardadas siguen reproduciendo su examen (se usa el valor
   almacenado, no uno regenerado). La prueba que exigía que TODA la semilla
   fuera dictable se acotó al cuerpo aleatorio: el prefijo es el id del módulo y
   puede traer cualquier letra (`fase-poblaciones` ya la habría hecho fallar).
6. **`Fase N` del ROADMAP vs del temario**: los comentarios que citan fases del
   proyecto («lógica PURA (Fase 3)») se protegieron; se revisaron uno a uno los
   ~30 restantes y se corrigieron los 5 que sí hablaban del temario.
7. **`panelModelo.porModulo` y `avanceAlumno`** ya usaban «módulo» con el
   significado nuevo: se excluyeron del primer pase para no convertirlos a
   «unidad».

### Verificación

- `npm test`: **321 pruebas, 0 fallos** (9 nuevas de compatibilidad).
- `npm run build`: correcto.
- Navegador: landing sin errores de consola, textos con «Módulos» y tildes
  correctas, redirección `/fase/*` → `/modulo/*` comprobada.
- Residuos de «fase» fuera del bundle legacy: 38, **todos intencionales**
  (ruta de redirección, frontera de `src/data/index.js`, capa de compatibilidad
  y sus pruebas).

### Reversión

`git checkout` de la rama. Los datos NO se tocaron: no hubo ninguna escritura de
migración, y los campos viejos siguen intactos en Firestore. Las reglas nuevas
**no están desplegadas**.

---

## 7. Riesgos

1. **El doble renombrado es amplio y con colisiones reales** (§4). El peligro no
   es el volumen sino dejar mezclados `fasesOcultas` y `modulosOcultos` entre
   reglas y cliente → un alumno vería contenido oculto. Mitigación: lectores que
   aceptan ambos nombres durante la transición + `grep` de verificación en los
   criterios de aceptación + los 138 tests existentes como red.
2. **Alumno sin grupo pierde el acceso** (§3.4): afecta a cuentas de prueba y
   altas por código de academia ya existentes. Decidido a propósito.
3. **Reglas nuevas sin verificar en emulador** — pendiente que ya arrastran F2,
   F3, F4, F6 y F7. La entrega C **no debería** desplegarse sin correr
   `npm run test:rules` con Java: es la primera vez que una regla mal puesta
   filtra contenido entre programas, no solo entre academias.
4. **Los 68 temas legacy no mapean a los 287 oficiales.** El fallback
   (`contenidoDeAcademia`) seguirá sirviendo el temario ficticio mientras la
   academia no esté migrada. Convivencia intencional.
5. **287 temas sin contenido** hasta que se editen: el temario se verá completo en
   el índice y vacío al abrir. Hace falta un estado visual "sin contenido aún"
   antes de publicar — y es mucho más visible con 287 que con 68.

---

## 9. ENTREGA A — Modelo puro de programas (implementada)

**`src/lib/programasModelo.js`** (nuevo, PURO) + `tests/programasModelo.test.mjs`
(14 pruebas). Fuente única de todo lo que tiene que ver con programas —
prohibido escribir `tipoPrograma === 'tum'` suelto por los componentes, igual
que con `capacidades.js`.

- `TIPOS_PROGRAMA` / `META_PROGRAMA`: los 6 tipos con etiqueta, color, icono,
  `esCarrera` y `certificable`. Añadir un tipo = una entrada y nada más.
- `tipoProgramaDe()`: un curso sin campo se comporta como **TUM** — es lo que
  las academias ya tenían clonado, así que nada cambia sin tocar datos.
- `normalizarEstructura()`: acepta los **tres** formatos (`unidades[]` nuevo,
  `modulos[]` implícito de la migración, y `temas[]` colgando del módulo) y
  devuelve siempre la forma nueva. *Fail-open*: una estructura corrupta da una
  lista vacía en vez de reventar la página del alumno.
- `programasDeGrupo()`, `puedeVerPrograma()`, `programasVisibles()`,
  `motivoSinPrograma()`: el aislamiento por programa, en un solo sitio.
- Tipos en **JSDoc** (decisión 3), no TypeScript.

## 10. ENTREGA C — Aislamiento por programa (implementada)

### Modelo
`cursos.tipoPrograma` (heredado de la plantilla; ausente ⇒ `tum`) y
`grupos.{programaId, tipoPrograma, programasExtra[]}`. **El grupo es la única
fuente del acceso**: nada se denormaliza en `usuarios` porque sin Cloud
Functions un permiso rancio ahí no sería una molestia, sería una fuga.

### Cuatro capas, como el resto del proyecto
1. **React** — `RutaProtegida` gana una segunda puerta: si `motivoSinPrograma`
   devuelve algo, en vez de contenido se muestra el motivo con su salida
   («Necesitas un código de grupo» → `/cuenta`), no un 403 seco.
2. **Datos** — el resolutor (`contenidoDeAcademia`, `indiceDeAcademia`) recibe
   el `acceso` de quien pide y filtra los cursos con `programasVisibles`.
3. **Firestore Rules** — `miGrupo()`, `misProgramas()`, `cursoEnMiPrograma()` y
   `alumnoLeeCurso()`. Las lecturas de `cursos` y `temas` exigen ahora
   academia + publicado + **programa del grupo**. El `programaId` del grupo solo
   lo escribe el director (el profesor sigue acotado a la visibilidad).
4. **UI** — selector de plan de estudios por grupo en `GruposAcademia`, con
   aviso en ámbar cuando un grupo no tiene programa (sus alumnos no verían nada).

### La caché tenía que cambiar de clave
El resolutor cacheaba por `academiaId`. Con el aislamiento eso sería un fallo
grave: **dos personas de la misma academia en grupos distintos reciben
contenido distinto**, y el primero en cargar habría dejado su temario en caché
para el resto. Ahora la clave es `academiaId||alcance` y
`limpiarCacheContenido()` borra **por prefijo** todas las entradas de la
academia.

### Suite del emulador (9 casos nuevos)
`tests/rules/contenido.rules.test.mjs` monta ahora **dos programas en la misma
academia** (TUM y Enfermería) y cuatro perfiles de alumno. Los casos negativos:
alumno de TUM no lee el curso ni los temas de Enfermería de su propia academia
(y la simétrica), alumno **sin grupo** no lee nada, `programasExtra` sí da
acceso, el staff no se filtra, el aislamiento por academia sigue en pie, un
profesor no cambia el `programaId` de un grupo y un alumno no se auto-asigna
otro plan ni se cambia de grupo.

> ⚠ **Sin ejecutar aquí**: la suite necesita Java + emulador. `npm run test:rules`
> antes de desplegar. Es la primera vez que una regla mal puesta filtra contenido
> **entre programas**, no solo entre academias.

## 11. ENTREGA D — Siembra del temario oficial (implementada)

- `plantillaDesdePrograma()` en `programasModelo.js` (PURO): convierte un
  programa de la semilla en `plantillas/{id}` + `plantillasTemas/{id__temaId}`.
  Rechaza tipos inválidos e ids de tema duplicados (un duplicado machacaría
  contenido en silencio al sembrar).
- `scripts/seed-programas.mjs` (`npm run seed:programas`): dry-run por defecto,
  `--apply`, `--programa=ID`, `--verificar`, `--produccion`. Idempotente por
  doc-id determinista. Mismo patrón que `migrar-contenido.mjs`.
- `tests/semillaRescate.test.mjs` (14 pruebas) valida la **fidelidad** contra
  los totales que declara el propio PDF: 7 módulos, 56 unidades, 287 temas
  (270 literales + 17 generados), 88 semanas, 440 horas, ids únicos, AVDI y
  Glasgow en módulos distintos, erratas transcritas y marcadas, y la sesión
  poblada solo donde el documento la declara.

Plan verificado en local: **303 documentos** (16 plantillas + 287 temas).

Siguiente paso operativo (requiere credenciales, no se ejecutó):
```bash
node scripts/seed-programas.mjs --apply --produccion
node scripts/migrar-contenido.mjs --academia=CODIGO --plantilla=tum-rescate --apply
```

## 12. Estado final y lo que queda por corregir

`npm test`: **353 pruebas, 0 fallos**. `npm run build`: correcto.
Navegador: consola limpia, landing correcta, redirección `/fase/*` verificada.

Pendientes conocidos, para la pasada de correcciones:

1. **Reglas sin ejecutar** (Firestore + Storage): necesitan Java. Es el pendiente
   más importante y el único que bloquea el despliegue.
2. **Home no está tras `RutaProtegida`**: un alumno sin grupo que entre a `/`
   sigue viendo el carrusel del bundle legacy. No puede abrir nada (la ruta de
   módulo lo bloquea), pero conviene ocultarle el carrusel para no prometer un
   contenido que no tiene.
3. **Multi-programa**: el resolutor sirve `cursos[0]` del alcance. Un grupo con
   `programasExtra` accede a sus especializaciones por reglas, pero la UI
   todavía enseña un solo programa: falta el selector de programa activo.
4. **Los 287 temas están vacíos**: el temario se ve completo en el índice y sin
   contenido al abrir. Hace falta un estado visual «sin contenido aún» antes de
   publicar, y después el trabajo editorial (entrega E).
5. **`tipoDestino` vs `tipoPrograma`** conviven en `cursos` y significan cosas
   distintas (nivel de producto vs clase de estudio). Documentado, pero es una
   fuente de confusión que convendría unificar más adelante.

---

## 13. Auditoría de FIDELIDAD al documento impreso

Requisito del dueño del producto: **todo debe decir exactamente lo que dice el
plan** — nombres de módulos, de unidades y de temas, y el orden entre ellos.
La auditoría contra el PDF encontró tres desviaciones, todas corregidas.

### 13.1 Un título estaba «corregido» en vez de transcrito

El encabezado impreso del Módulo 3 es:

> `MODULO 3: EVALUACIÓN INCIAL Y SOPORTE VITAL.`

—sin tilde en «MODULO» y con «INCIAL» por «INICIAL». La semilla guardaba el
título ya corregido (`EVALUACIÓN INICIAL…`) mientras la nota decía otra cosa.
**Restituido al original** y marcado con `revisar: true`.

Era el único caso, pero es exactamente el error que no puede repetirse, así que
hay una prueba que lo impide: *«ningún título de módulo viene corregido respecto
al encabezado»* comprueba que `titulo` y `subtitulo` aparecen **literales**
dentro de `encabezadoOficial`.

### 13.2 Faltaba el encabezado literal

Cada módulo lleva ahora `encabezadoOficial`: la línea completa tal como está
impresa, incluidos el punto y coma del Módulo 2 y las tildes que faltan en el 3
y el 6. `titulo`/`subtitulo` son esa misma cadena partida para poder mostrarla,
nunca una reescritura.

### 13.3 La numeración no era la del PDF

La columna TEMA del Módulo 4 numera `1, 2, —, 3, 4…`: la fila **PRACTICA no
lleva número**. La semilla renumeraba correlativo (1…13), desplazando todo lo
que viene después. Ahora cada unidad lleva `numeroOficial`, que es **null**
donde el documento no numera. El orden sigue siendo el del array; el número es
lo que la academia lee en su papel.

## 14. Orden de TODO el material

El material se sirve en el orden que dicta el plan, en tres niveles:

1. **Estructura** — `temasEnOrden()` recorre módulos → unidades → temas en la
   secuencia del documento y numera la posición global. Los 287 temas salen en
   el orden impreso, de «Introducción.» (Módulo 1) al Módulo 7.
2. **Dentro del tema** — `ordenarMaterialTema()` ordena secciones y sus bloques,
   quiz, flashcards, conceptos, actividades y los recursos (**videos,
   imágenes, fuentes y archivos**) por su campo `orden`, con *sort estable*: lo
   que no lo trae conserva su posición. Sin esto, el material se pintaba en el
   orden en que Firestore devolviera los documentos, que no es ninguno.
3. **Exámenes** — `alcanceDeExamen()` resuelve qué entra en cada examen **según
   su posición en el plan**:
   - examen **final** → todos los temas de contenido del módulo;
   - examen **parcial** → solo desde el examen anterior hasta él.

   Hasta ahora el examen se derivaba del quiz de *todos* los temas del módulo.
   Con el plan oficial eso deja de ser correcto: el Módulo 2 examina tres veces
   (tras la unidad 1, tras la 3 y al cerrar) y el Módulo 4 tiene un parcial a
   media carrera. Un parcial que preguntara temas que el grupo todavía no ha
   visto sería, sencillamente, un examen mal armado. Las unidades de examen y de
   práctica nunca aportan temas.

   > **Pendiente de cableado**: el modelo y sus pruebas están; falta que
   > `ExamenModuloPage` lo consuma en vez de tomar el módulo entero. Es la
   > primera tarea de la pasada de correcciones.

`npm test`: **365 pruebas, 0 fallos**. `npm run build`: correcto.
