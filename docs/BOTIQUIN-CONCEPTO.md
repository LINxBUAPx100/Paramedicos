# Mi Botiquín — concepto listo para construir

> **Qué es este documento.** El trabajo **B** llevaba desde el 31 de agosto de
> 2026 con la dirección visual decidida y bloqueado por una frase: «no se
> inventa el catálogo; sin la lista de la academia esto no empieza». Este
> documento levanta ese bloqueo por el único camino honesto: **el catálogo no se
> inventa, se DERIVA del temario**, que ya nombra el material y ya lo cita. La
> academia no recibe una hoja en blanco, recibe una propuesta que corregir.
>
> Escrito el 7 de septiembre de 2026, después de cerrar el trabajo A.
> Sustituye a `PLAN-LMS.md` §26.1 en lo que se dice más abajo, y desarrolla
> `docs/PLAN-TECNICO-FASES.md` §«Trabajo B».

---

## 1. La regla que gobierna todo lo demás

Un botiquín no lleva objetos decorativos. Lleva torniquetes, cánulas, sellos de
tórax y hemostáticos, y **la técnica de un dispositivo que detiene una hemorragia
no se aprende en un modal gamificado.** En este proyecto los procedimientos
tienen molde obligatorio (`CLAUDE.md` §7) y fuentes con documento, edición y
página. Un alumno que aprende a poner un torniquete en la pantalla del
inventario en vez de en la lección revisada es exactamente el fallo que toda la
remediación existe para evitar.

De ahí la partición, que es la decisión estructural de este trabajo:

| La ficha del botiquín SÍ lleva | La ficha del botiquín NO lleva |
|---|---|
| Qué es y cómo se reconoce | La técnica de aplicación |
| Con qué se confunde | Indicaciones y contraindicaciones clínicas |
| Cómo se revisa antes del turno | Dosis, calibres, presiones, tiempos |
| Errores frecuentes de manejo del insumo | Criterios de decisión sobre el paciente |
| Si caduca y cómo se comprueba | Nada que exija molde de procedimiento |
| **Un enlace a la lección que lo enseña** | |

**La ficha identifica; la lección enseña.** Es el §10 de `CLAUDE.md` aplicado:
una fuente canónica y un enlace. Sale ganando el producto además, porque el
botiquín deja de ser una pantalla suelta y se convierte en una puerta de entrada
al temario: 40-80 artículos, cada uno un enlace a su lección.

---

## 2. Dónde vive el catálogo: la contradicción, resuelta

Los dos documentos del plan se contradicen, y hay que decirlo antes de escribir
código:

- `PLAN-LMS.md` §26.1: «El catálogo es **contenido curado en el repositorio**,
  no datos de Firestore» → `src/data/botiquin/catalogo.js`.
- `docs/PLAN-TECNICO-FASES.md` §B.1: «**En Firestore, por academia. Nunca en
  `src/data/`**», porque meterlo compilado en la aplicación reabre el agujero
  que P2 cerró.

Los dos tienen razón en su mitad, y **la contradicción es falsa**: el temario ya
resuelve exactamente este problema y nadie tuvo que elegir. El temario se **cura
en el repositorio** (`src/data/contenido/*.js`), se **genera** a un artefacto
(`src/data/planRescate.js`), se **siembra** en Firestore por academia
(`scripts/migrar-contenido.mjs`) y **no es alcanzable desde la aplicación** —lo
comprueban `fugaDelBundle.test.mjs` y `pesoDeLaEntrada.test.mjs`—. El alumno lo
recibe de Firestore, tema a tema.

**El botiquín usa el mismo camino, sin inventar uno nuevo:**

```
src/data/botiquin/catalogo.js      ← se cura aquí, con revisión en el repositorio
        │  scripts/gen-botiquin.mjs
        ▼
src/data/botiquin/generado.js      ← artefacto, NO alcanzable desde la app
        │  scripts/migrar-contenido.mjs (o su gemelo)
        ▼
Firestore  academias/{id}/botiquin/catalogo   ← 1 documento, 1 lectura
        │  reglas de P3: pertenece a la academia + su programa
        ▼
/botiquin
```

Con esto se cumplen las dos exigencias a la vez: **curado y revisado en el
repositorio** (§26.1) y **servido desde Firestore, no descargable sin cuenta**
(B.1). Cada academia puede además editar su copia sin tocar el código, que es lo
que B.1 quería de fondo.

Lo que **no** cambia de B.1 y sigue siendo obligatorio:

- **Un solo documento con el arreglo de artículos**, no uno por artículo. Con
  40-80 piezas, un documento por pieza son 40-80 lecturas cada vez que alguien
  abre `/botiquin`: el mismo error que dejó el temario costando 288 lecturas por
  carga (**P10**).
- Las fichas largas, si algún día no caben en 1 MB, se parten aparte y se cargan
  **al abrir el modal**, no al pintar la rejilla.
- Su bloque en `firestore.rules` y su suite en `tests/rules/`, como todo lo demás.

---

## 3. El modelo, unificado

Los dos documentos daban campos distintos. Esta es la unión, con el nombre de
cada campo ya decidido para que no se renombre a mitad de la construcción:

```js
{
  id: 'torniquete',                 // llave estable. La comparten B, M (tienda) y N (inventario)
  nombre: 'Torniquete de aplicación rápida',
  compartimento: 'circulacion',     // catálogo CERRADO, ver §4
  categoria: 'dispositivo',         // dispositivo | insumo | medicamento | equipo | proteccion

  // ── Lo que la ficha muestra. Derivado de la lección canónica, no redactado aparte.
  resumen: '…',                     // una o dos frases: qué es
  comoSeReconoce: ['…'],
  seConfundeCon: ['…'],
  comoSeRevisa: ['…'],              // checklist de turno
  erroresFrecuentes: ['…'],         // de manejo del insumo, no de decisión clínica
  caducidad: 'no_aplica' | 'revisar_fecha' | 'esteril_sellado',

  // ── El enlace, que es la mitad del valor de la pantalla
  temaId: 'm5-hs-torniquete',       // la lección que enseña la TÉCNICA
  temaIdBasico: 'm1-pab-hemorragias', // opcional: la versión de primeros auxilios. Ver §5

  // ── Desbloqueo. Se DERIVA, no se guarda por alumno
  desbloqueaCon: { moduloId: 'm1', temaId: 'm1-pab-hemorragias' },

  // ── Dotación normativa. Opcional y con fuente, o ausente
  dotacion: null,                   // ver §6: hoy es null para casi todo, y por una razón

  // ── Imagen. Clave de activo, nunca una URL suelta
  imagen: null,                     // null ⇒ la interfaz pinta la silueta del compartimento

  // ── Comercial. Lo usa M, lo ignora B
  comercial: null,                  // { sku, precio, existencias } | null

  fuentes: [ … ],
  estadoEditorial: 'borrador',
}
```

Tres notas sobre el modelo:

- **`resumen` y las listas de la ficha se derivan de la lección canónica.** No se
  redactan en el catálogo como texto libre: eso crearía una segunda versión del
  contenido que se desincroniza y no pasa por revisión docente. Igual que en la
  pasada del molde v2, **el texto sale de la prosa que la lección ya tiene y ya
  cita**.
- **`dotacion` no es un adorno.** Si lleva una cifra, lleva su fuente con
  documento, edición, año y tabla. Sin fuente comprobable va a `null`.
- **`comercial` vive en el mismo artículo, no en una lista paralela.** Ya estaba
  decidido en el trabajo M y se confirma: un catálogo, dos usos. Dos listas
  paralelas se desincronizan el primer mes.

---

## 4. Compartimentos: catálogo cerrado

Ocho, y agrupan la pantalla porque así se parece a un botiquín real y no a un
índice del temario:

`viaAerea` · `circulacion` · `inmovilizacion` · `curacion` · `medicamentos` ·
`monitoreo` · `proteccion` · `otros`

---

## 5. El catálogo candidato, derivado del temario

Esto es lo que levanta el bloqueo. Se recorrieron las 268 lecciones con material
buscando el equipo que ya nombran, y para cada pieza se identificó **la lección
canónica: la que más veces lo nombra, que es la que lo enseña.** La academia no
tiene que escribir esta lista; tiene que corregirla.

### Vía aérea

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| Cánula orofaríngea | `m3-va-canulas-orofaringeas` — Cánulas orofaríngeas | M3 |
| Cánula nasofaríngea | `m3-va-canulas-nasofaringeas` — Cánulas nasofaríngeas | M3 |
| Mascarilla laríngea | `m3-va-mascarilla-laringea` — Mascarilla laríngea | M3 |
| Tubo endotraqueal | `m3-va-hojas-tubos` — Tipos de hojas y tamaños de tubo | M3 |
| Laringoscopio y hojas | `m3-va-hojas-tubos` / `m3-va-tecnica-intubacion` | M3 |
| Bolsa-válvula-mascarilla | `m3-va-dispositivos-o2` — Dispositivos de oxigenoterapia | M3 |
| Puntas nasales | `m3-va-dispositivos-o2` | M3 |
| Equipo de cricotirotomía con aguja | `m3-va-cricotirotomia` — Cricotirotomía con aguja | M3 |
| Capnógrafo | `m3-va-tecnica-intubacion` | M3 |
| Equipo de aspiración | **sin lección canónica** — ver §7 | — |

### Circulación y hemorragias

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| Torniquete | `m5-hs-torniquete` — Uso del torniquete | **M1** (`m1-pab-hemorragias`) |
| Gasa o agente hemostático | `m5-hs-control-hemorragias` — Control de hemorragias | M5 |
| Catéter intravenoso | `m3-vi-canalizacion` — Técnica de canalización | M3 |
| Equipo de venoclisis | `m3-vi-canalizacion` | M3 |
| Soluciones cristaloides | `m3-vi-cristaloides` — Soluciones cristaloides | M3 |
| Dispositivo de acceso intraóseo | `m3-vi-osteolisis` — Osteólisis *(errata documental; ver `CLAUDE.md` §5.3)* | M3 |

### Inmovilización

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| Collarín cervical | `m5-tcc-inmovilizacion-espinal` | **M3** (`m3-ep-via-aerea-cervicales`) |
| Tabla espinal rígida | `m5-tcc-inmovilizacion-espinal` — Inmovilización espinal e indicaciones de tabla rígida | M5 |
| Férula rígida | `m1-pai-ferulas-vendajes` — Taller de férulas y vendajes | M1 |
| Férula moldeable | `m1-pai-ferulas-vendajes` | M1 |
| Férula de tracción (Sager, Hare) | `m5-tme-ferulas-sager-hare` — Férulas Sager y Hare | M5 |
| Cabestrillo | `m1-pai-ferulas-vendajes` | M1 |
| Vendas de rollo y elásticas | `m1-pai-ferulas-vendajes` | M1 |

### Curación

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| Gasas estériles y compresas | `m1-pab-botiquin` — Botiquín ideal | M1 |
| Apósito adhesivo | `m1-pab-botiquin` | M1 |
| Apósito oclusivo / sello de tórax | `m5-tt-neumotorax-abierto` — Neumotórax abierto | M5 |
| Apósito para quemadura | `m5-que-curacion` — Curación de quemaduras | M5 |
| Antiséptico | `m5-que-curacion` / `m1-pab-botiquin` | M1 |
| Solución salina para irrigación | `m1-pab-botiquin` | M1 |

### Monitoreo

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| DEA | `m1-pab-dea` — Uso del DEA | M1 |
| Monitor desfibrilador | `m3-md-uso-monitor` — Uso del monitor desfibrilador | M3 |
| Electrodos de ECG | `m3-md-ecg-basica` — Electrocardiografía básica | M3 |
| Pulsioxímetro | `m1-pai-signos-vitales` — Toma de signos vitales | M1 |
| Estetoscopio | `m1-pai-signos-vitales` | M1 |
| Baumanómetro y brazaletes | `m1-pai-signos-vitales` | M1 |
| Termómetro | `m1-pai-signos-vitales` | M1 |
| Glucómetro | `m3-es-sample` — SAMPLE | M3 |

### Protección personal

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| Guantes de nitrilo | `m1-pab-botiquin` / `m3-ep-sss` — SSS | M1 |
| Protección ocular | `m1-smu-bienestar-tum` — Bienestar del TUM | M1 |
| Protección respiratoria | `m1-smu-bienestar-tum` | M1 |

### Otros

| Artículo | Lección canónica | Módulo que desbloquea |
|---|---|---|
| Mascarilla de barrera con válvula unidireccional | `m1-pab-botiquin` | M1 |
| Tijera de trauma | `m1-pab-botiquin` | M1 |
| Manta térmica | `m1-pab-botiquin` | M1 |
| Linterna | `m1-pab-botiquin` | M1 |

**Medicamentos** no se listan aquí a propósito: los da la NOM-034 y los publica
ya `m4-far-nom-034`. Ver §6.

### La decisión que hace falta tomar sobre el desbloqueo

Tres artículos se enseñan **dos veces** a distinta profundidad, y eso no es un
defecto del temario: es su diseño. El torniquete aparece en `m1-pab-hemorragias`
a nivel de primeros auxilios y en `m5-hs-torniquete` con su técnica; el collarín
en `m3-ep-via-aerea-cervicales` y en `m5-tcc-inmovilizacion-espinal`.

Propuesta, que es la que respeta a la vez la motivación y la seguridad:

> **Desbloquea con la lección más temprana; enlaza a la más profunda.** El
> artículo entra al botiquín en cuanto el alumno estudia la primera —para eso
> existe la recompensa— y su enlace «cómo se aplica» apunta siempre a la lección
> que lleva el molde de procedimiento completo. Cuando existan las dos, la ficha
> muestra los dos enlaces, marcados por nivel.

---

## 6. El armazón normativo, y el hueco que hay que declarar

La NOM-034-SSA3-2013 es la respuesta a «¿qué debe haber a bordo?», y sus
apéndices **se leen de forma acumulativa**: el B exige cumplir además todo el A,
el C exige A y B, el D exige A, B y C. Eso encaja con el botiquín mejor de lo que
parece, porque el tipo de unidad ordena el catálogo en capas naturales:

| Numeral | Tipo de ambulancia | Capa del catálogo |
|---|---|---|
| 4.1.2 | De traslado | A |
| 4.1.4 | De urgencias básicas | A + B |
| 4.1.3 | De urgencias avanzadas | A + B + C |
| 4.1.5 | De cuidados intensivos | A + B + C + D |

**El hueco, dicho sin adornos.** `m4-far-nom-034` publica los apéndices de
**medicamentos y soluciones** con su numeral, transcritos del DOF. Los apéndices
de **equipo e instrumental** —que son justamente los que llenan siete de los
ocho compartimentos del botiquín— **no están transcritos en ninguna lección**. Se
comprobó recorriendo las 268: ninguna los contiene.

Consecuencia práctica, y es la única partida editorial nueva que este trabajo
genera:

- Hasta que alguien transcriba esos apéndices del texto vigente del DOF, el
  campo `dotacion` va a **`null` en todo artículo que no sea medicamento**. Un
  `cantidadMinima: 2` sin numeral que lo respalde es exactamente la cifra sin
  fuente que `CLAUDE.md` §9.1 prohíbe.
- La pantalla **no debe tener un hueco visible** esperando ese dato. Se construye
  para que la columna de dotación aparezca solo cuando el artículo la trae.
- Transcribirlos es una tarea acotada y con fuente única: el DOF. No es reabrir
  la pasada de calidad, es contenido nuevo con una fuente identificada. Puede
  hacerse en cualquier momento y **no bloquea la construcción de B**.

---

## 7. La puerta de validación: qué pasa hoy, con 0 temas validados

B.3 dejó escrita la regla: **ningún artículo cuyo uso sea un procedimiento
invasivo se publica en el botiquín antes de que su lección esté `validado` o
`publicado`**, con prueba automática, igual que los bancos de examen.

Hoy hay **0 temas validados o publicados**. Aplicada tal cual, esa regla deja el
botiquín vacío el día del estreno, y una pantalla vacía no es un producto. La
salida no es relajar la regla: es separar lo que la regla protege de lo que no.

| Grupo | Qué se publica hoy | Por qué |
|---|---|---|
| **Identificación pura** — gasas, guantes, manta térmica, tijera, linterna, antiséptico, mascarilla de barrera, estetoscopio, termómetro | **Ficha completa** | Reconocer una gasa no es un procedimiento. No hay técnica invasiva que se pueda aprender mal |
| **Dispositivo con técnica** — férulas, collarín, tabla, vendas, DEA, monitor, pulsioxímetro, baumanómetro, glucómetro | **Ficha, sin enlace activo** | La ficha identifica y dice «la técnica está en tal lección, pendiente de validación docente». El enlace se enciende cuando la lección se firma |
| **Procedimiento invasivo** — cánulas, mascarilla laríngea, tubo, laringoscopio, catéter IV, intraóseo, cricotirotomía, torniquete, hemostático, sello de tórax | **Silueta y nombre. Nada más** | Es lo que la regla de B.3 protege, y se respeta entera |

Esto convierte la validación docente en algo **visible y deseable** dentro del
producto: cada tema que un maestro firma enciende artículos en el botiquín de sus
alumnos. Es el mejor argumento que va a tener la academia para ponerse a validar.

El artículo «equipo de aspiración» queda **sin lección canónica** —el temario
menciona la aspiración treinta veces pero ninguna lección enseña el equipo—. No
se publica y se registra como pregunta para la academia, no se rellena.

---

## 8. Los tres estados: cero lecturas y cero escrituras nuevas

Se derivan en el cliente de lo que la aplicación **ya carga**. El botiquín no
inventa una segunda noción de progreso.

| Estado | Cuándo | De dónde sale |
|---|---|---|
| **En tu botiquín** | El módulo de `desbloqueaCon` está visible y su tema leído | `progreso/{uid}.leidos`, ya cargado |
| **Próximo a desbloquear** | Pertenece al siguiente módulo visible | `avanceAlumno.js` |
| **Bloqueado** | Silueta y el nombre del módulo que lo abre. Nunca la ficha | ídem |

La visibilidad de módulos ya la resuelve `src/lib/avanceAlumno.js`
(`modulosOcultos` del grupo + `modulosDesbloqueados` del alumno). Ver qué falta
es parte de la motivación; leer la ficha antes de tiempo, no.

**Coste total en Firestore: 1 lectura del catálogo.** El progreso ya estaba
cargado. Es la función más barata del plan y por eso se puede hacer en Spark.

---

## 9. La pantalla

Dirección fijada por el dueño el 31-08-2026: **inventario de videojuego.**
Botiquín abierto en el centro, artículos flotando dentro, y al pulsar uno se
oscurece el fondo y sale su ficha. Ruta `/botiquin`, dentro de `RutaProtegida`,
con gate de capacidad.

- **Contenedor:** botiquín abierto, artículos colocados por compartimento. Dentro
  de cada compartimento, los desbloqueados primero.
- **Micro-interacciones:** flotación leve; al pasar el cursor, escala ~10 %.
- **Modal:** oscurece el fondo, imagen grande, «qué es», «cómo se revisa» y el
  enlace a la lección.
- **Sin librería de animación nueva.** El proyecto usa CSS con variables y ya
  tiene sus transiciones. El momento de desbloqueo se marca con la misma
  gramática visual de `/logros`.

Tres reglas que este repositorio ya exige y **no son negociables**:

| Regla | Por qué |
|---|---|
| `prefers-reduced-motion` apaga la flotación | Ya se respeta en `Reveal`. Una rejilla entera de objetos flotando es de lo peor para quien tiene sensibilidad al movimiento |
| El modal atrapa el foco, cierra con Escape y lo devuelve al abrirlo | El patrón está resuelto en el cajón de `Layout.jsx` (`inert` + Escape + foco de vuelta). Se reutiliza, no se reinventa |
| Ni un pictograma Unicode | `sinEmojis.test.mjs` los rechaza. Los iconos salen de `Icon.jsx` |

**No se construye para Next.js.** La nota de la que salió esta dirección daba por
hecha la migración (**G**), y G está sin comprometer: «reevaluar tras A». Se
construye en Vite + React, como todo lo demás.

---

## 10. Imágenes

Estilo fijado por el dueño: **ilustración 3D estilo caricatura, colores vivos,
luz suave, fondo transparente**, consistente entre artículos. Se genera con el
mismo esqueleto de instrucción para los 40-80, porque la consistencia es lo que
hace que parezcan del mismo juego y no un collage.

La raya con la decisión del 30 de agosto de usar fotografías con licencia:

> **La caricatura es para el inventario. La foto real es para enseñar el
> dispositivo.** Una caricatura de torniquete con el molinete mal dibujado en la
> lección enseña una forma equivocada; en la rejilla del botiquín, donde solo hay
> que reconocerlo y pulsarlo, no enseña nada malo. **Si un artículo solo puede
> tener una imagen, gana la real.**

Proceso, sin excepciones (`PLAN-LMS.md` §33.6 y el incidente que lo motivó):

1. Generar con el esqueleto común; recortar el fondo a PNG transparente.
2. Entra por el **pipeline de activos médicos**: licencia, crédito, saneado y
   hash sellado. **No se copian a mano en `public/`.**
3. Optimizar con `scripts/optimizar-imagenes.mjs`, que recorta el margen
   transparente y saca AVIF/WebP a varios anchos. Un icono de inventario se ve a
   ~160 px: pedir 2000 es tirar peso.
4. Se sirven **estáticas con el sitio**, no desde Firebase Storage. En Spark,
   Storage tiene tope de descarga diaria y cuenta para el salto a Blaze; como
   activos estáticos cuestan cero.

**Mientras no exista imagen, silueta por compartimento. Añadir una imagen no
toca código**: es una clave de activo en el catálogo.

**Coste.** Generar 40-80 ilustraciones tiene precio según la herramienta, y el
recorte de fondo también si se automatiza. Es **la única partida de este trabajo
que cuesta dinero**. Se hace por lotes, empezando por un compartimento, y se ve
el resultado antes de pagar el resto.

---

## 11. Lo que hace falta de la academia

Reducido a lo que de verdad no se puede derivar. Todo lo demás ya está propuesto
arriba:

1. **Corregir el catálogo candidato del §5**: qué sobra, qué falta, cómo se
   llama cada cosa en su unidad. Es corregir una lista, no escribirla.
2. **El tipo de unidad de la academia** (4.1.2 / 4.1.4 / 4.1.3 / 4.1.5). Sin
   esto no se puede decir qué capa del catálogo le corresponde.
3. **Confirmar la regla de desbloqueo** del §5: temprano desbloquea, profundo
   enlaza.
4. **Decidir sobre «equipo de aspiración»**: qué lleva su unidad y a qué lección
   debería enlazar, porque hoy ninguna lo enseña.
5. Las fotografías, cuando las tenga.

## 12. Orden de construcción propuesto

Lo relevante: **los tres primeros pasos no dependen de nada de la lista de
arriba.** Se puede empezar hoy.

| Paso | Qué | Depende de |
|---|---|---|
| **B.0** | El modelo y su validador (`botiquinModelo.js`, al estilo de `temaContenidoModelo.js`), el catálogo semilla con el candidato del §5, el generador y su prueba de «generado al día» | — |
| **B.1** | Las reglas de `firestore.rules` y su suite en `tests/rules/`, más la siembra por academia | B.0 |
| **B.2** | La derivación de los tres estados sobre `avanceAlumno.js`, con pruebas. Sin interfaz todavía | B.0 |
| **B.3** | La pantalla `/botiquin`: rejilla por compartimento, modal accesible, siluetas, la puerta de validación del §7 | B.2 |
| **B.4** | Las imágenes, por lotes y por compartimento | presupuesto del dueño |
| **B.5** | La transcripción de los apéndices de equipo de la NOM-034 y el llenado de `dotacion` | el texto vigente del DOF |

---

## 13. Lo que este documento decide, en una línea cada uno

- La ficha **identifica**; la lección **enseña**. Un enlace entre las dos.
- El catálogo se **cura en el repositorio y se sirve desde Firestore**: la
  contradicción entre §26.1 y B.1 era falsa, el temario ya hacía las dos cosas.
- **Un documento, una lectura.** Nunca un documento por artículo.
- El catálogo candidato **se derivó del temario**: 44 artículos, 43 con su lección
  canónica ya identificada.
- Los apéndices de **equipo** de la NOM-034 **no están transcritos**: `dotacion`
  va a `null` y se declara, no se rellena.
- Con 0 temas validados, el botiquín estrena **en tres grupos**: ficha completa,
  ficha sin enlace, y silueta. Validar temas **enciende artículos**.
- Cero lecturas nuevas de progreso. **1 lectura** en total.
- Se construye en **Vite + React**. No se espera a G.
